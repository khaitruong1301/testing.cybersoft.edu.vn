// ============================================================================
// SYNC QUESTIONS — nạp câu hỏi TĂNG DẦN (incremental), KHÔNG seed lại từ đầu.
//
// Ý tưởng: mỗi câu hỏi có id TẤT ĐỊNH = hash nội dung (category + kind + prompt +
// options + answer). Nhờ vậy:
//   - Câu đã có trong DB  -> id trùng  -> BỎ QUA (không ghi gì).
//   - Câu mới thêm        -> id mới    -> CHÈN.
//   - Câu bị sửa nội dung -> id đổi    -> chèn bản mới, dọn bản cũ.
//   - Câu gỡ khỏi nguồn   -> dọn (trừ khi SYNC_PRUNE=0).
//
// Toàn bộ thay đổi nằm trong MỘT transaction -> người dùng không thấy bảng rỗng,
// không downtime. Chạy lại nhiều lần vẫn cho cùng kết quả (idempotent).
//
// KHÔNG đụng: .env, schema.prisma, web.config, node_modules, .next, bài viết,
//             học viên, mã truy cập, lịch sử làm bài.
//
// Dùng:
//   node prisma/sync_questions.mjs            # chèn mới + dọn câu đã gỡ
//   SYNC_PRUNE=0 node prisma/sync_questions.mjs   # CHỈ chèn thêm, không xoá gì
//   SYNC_DRY=1 node prisma/sync_questions.mjs     # chỉ xem sẽ đổi gì, không ghi
// ============================================================================
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

import { IV_CATEGORIES, MCQ, ESSAY, SCENARIO } from "./interview.mjs";
import { MCQ2, ESSAY2, SCENARIO2 } from "./interview2.mjs";
import { DATA as IV3A } from "./interview3_a.mjs";
import { DATA as IV3B } from "./interview3_b.mjs";
import { DATA as IV4 } from "./interview4.mjs";
import { DATA as IV5 } from "./interview5.mjs";
import { DATA as IV6 } from "./interview6.mjs";
import { DATA as IV7 } from "./interview7.mjs";
import { DATA as IV8 } from "./interview8.mjs";
import { DATA as IV9 } from "./interview9.mjs";
import { DATA as IV10 } from "./interview10.mjs";
import { DATA as IV11 } from "./interview11.mjs";
import { DATA as IV12 } from "./interview12.mjs";
import { DATA as IV13 } from "./interview13.mjs";
import { ISTQB_LEVELS, ISTQB_MCQ } from "./istqb.mjs";

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
// MẶC ĐỊNH ADDITIVE-ONLY: chỉ chèn câu mới, KHÔNG xoá gì.
// Prune (dọn câu không còn trong nguồn) phải bật RÕ RÀNG: SYNC_PRUNE=1.
const PRUNE = process.env.SYNC_PRUNE === "1";
const DRY = process.env.SYNC_DRY === "1";

// id tất định cho CÂU MỚI (chỉ để đặt khóa chính, KHÔNG dùng để so trùng).
const makeId = (categorySlug, kind, prompt, options, answer) =>
  "q_" + crypto.createHash("sha256")
    .update([categorySlug, kind, J(prompt), options, String(answer)].join("|"))
    .digest("hex")
    .slice(0, 40);

// ----------------------------------------------------------------------------
// SO TRÙNG THEO NỘI DUNG (content-aware) — an toàn cho Postgres.
// Dữ liệu production (di trú từ SQLite) mang id cuid, KHÔNG phải hash nội dung.
// Vì thế so theo id sẽ hiểu nhầm mọi câu là "mới" -> nhân đôi (PRUNE=0) hoặc
// xoá sạch rồi dựng lại (PRUNE=1). Ta so theo KHÓA NỘI DUNG:
//   category-slug | kind | prompt.vi đã chuẩn hoá
// -> câu đã có (dù id cuid) vẫn nhận ra được -> chỉ chèn câu THỰC SỰ mới.
const norm = (s) => String(s == null ? "" : s)
  .normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
// Lấy prompt.vi từ object {vi,en,ja} hoặc từ chuỗi JSON đã lưu trong DB.
const promptVi = (p) => {
  if (p && typeof p === "object") return p.vi ?? "";
  try { return (JSON.parse(p) || {}).vi ?? ""; } catch { return ""; }
};
const contentKey = (slug, kind, promptObjOrJson) =>
  `${slug}|${kind}|${norm(promptVi(promptObjOrJson))}`;

async function main() {
  console.log(`Sync questions (incremental)${DRY ? " [DRY RUN]" : ""}${PRUNE ? "" : " [chỉ thêm, không xoá]"}...`);

  try {
    await prisma.$executeRawUnsafe("PRAGMA journal_mode=WAL;");
    await prisma.$executeRawUnsafe("PRAGMA busy_timeout=15000;");
  } catch { /* không phải SQLite -> bỏ qua */ }

  // --- 1) Bảo đảm category tồn tại (upsert theo slug, giữ nguyên id cũ) ---
  const catId = {};
  let order = 0;
  for (const c of IV_CATEGORIES) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        tab: "INTERVIEW", slug: c.slug, title: J(c.title), icon: "🎤", order: order++,
        description: J({ vi: "Ngân hàng câu hỏi phỏng vấn thực tế VN & quốc tế, tự chấm.",
          en: "Real VN & global interview question bank, auto-graded.", ja: "国内外の面接問題集、自動採点。" }),
      },
    });
    catId[c.slug] = cat.id;
  }
  for (const lv of ISTQB_LEVELS) {
    const cat = await prisma.category.upsert({
      where: { slug: lv.slug },
      update: {},
      create: {
        tab: "ISTQB", slug: lv.slug, title: J(lv.title), icon: lv.icon, order: order++,
        description: J({ vi: "Luyện thi chứng chỉ ISTQB theo cấp độ, hệ thống tự chấm.",
          en: "ISTQB certification practice by level, auto-graded.", ja: "レベル別ISTQB対策、自動採点。" }),
      },
    });
    catId[lv.slug] = cat.id;
  }

  // --- 2) Dựng toàn bộ hàng mong muốn từ nguồn (kèm id tất định) ---
  const rows = [];
  const addIV = (kind, item) => {
    const slug = item.cat;
    if (!catId[slug]) { console.warn(`  ! bỏ qua: không có category ${slug}`); return; }
    const options = kind === "MCQ" ? J(item.options) : "[]";
    const answer = kind === "MCQ" ? String(item.answer) : J(item.keywords || []);
    rows.push({
      id: makeId(slug, kind, item.q, options, answer),
      key: contentKey(slug, kind, item.q),
      categoryId: catId[slug], kind, prompt: J(item.q), options, answer,
      explanation: J(item.exp), difficulty: 1,
    });
  };
  for (const m of [...MCQ, ...MCQ2, ...IV3A, ...IV3B, ...IV4, ...IV5, ...IV6, ...IV7, ...IV8, ...IV9, ...IV10, ...IV11, ...IV12, ...IV13]) addIV("MCQ", m);
  for (const e of [...ESSAY, ...ESSAY2]) addIV("ESSAY", e);
  for (const s of [...SCENARIO, ...SCENARIO2]) addIV("SCENARIO", s);
  for (const q of ISTQB_MCQ) {
    const slug = q.lvl;
    if (!catId[slug]) { console.warn(`  ! bỏ qua: không có level ${slug}`); continue; }
    const options = J(q.options);
    rows.push({
      id: makeId(slug, "MCQ", q.q, options, String(q.answer)),
      key: contentKey(slug, "MCQ", q.q),
      categoryId: catId[slug], kind: "MCQ", prompt: J(q.q), options,
      answer: String(q.answer), explanation: J(q.exp), difficulty: 1,
    });
  }

  // Chống trùng NỘI DUNG trong chính nguồn (2 câu cùng category+kind+prompt.vi).
  const seen = new Set();
  const wanted = [];
  let dupes = 0;
  for (const r of rows) {
    if (seen.has(r.key)) { dupes++; continue; }
    seen.add(r.key); wanted.push(r);
  }
  if (dupes) console.log(`  (bỏ ${dupes} câu trùng nội dung trong nguồn)`);

  // --- 3) So sánh với DB THEO NỘI DUNG (không theo id) ---
  //   idToSlug: đổi ngược categoryId -> slug để dựng khóa nội dung cho hàng DB.
  const idToSlug = Object.fromEntries(Object.entries(catId).map(([slug, id]) => [id, slug]));
  const managedCatIds = Object.values(catId);
  const existing = await prisma.interviewQuestion.findMany({
    where: { categoryId: { in: managedCatIds } },
    select: { id: true, categoryId: true, kind: true, prompt: true },
  });
  const existingKeys = new Set(
    existing.map((e) => contentKey(idToSlug[e.categoryId] || "?", e.kind, e.prompt))
  );

  // Chỉ chèn câu có KHÓA NỘI DUNG chưa tồn tại trong DB. KHÔNG bao giờ đụng câu cũ.
  const toInsert = wanted.filter((r) => !existingKeys.has(r.key));

  // PRUNE (mặc định TẮT): chỉ liệt kê câu trong DB không còn trong nguồn — KHÔNG xoá,
  // trừ khi bật rõ SYNC_PRUNE=1. Ngay cả khi bật, prune theo nội dung để không xoá nhầm.
  const wantedKeys = new Set(wanted.map((r) => r.key));
  const toDelete = existing.filter((e) => !wantedKeys.has(contentKey(idToSlug[e.categoryId] || "?", e.kind, e.prompt))).map((e) => e.id);

  console.log(`  Nguồn: ${wanted.length} câu | DB đang có: ${existing.length}`);
  console.log(`  -> CHÈN MỚI (nội dung chưa có): ${toInsert.length}`);
  console.log(`  -> GIỮ NGUYÊN (đã có, khớp nội dung): ${wanted.length - toInsert.length}`);
  console.log(`  -> Trong DB nhưng không có trong nguồn: ${toDelete.length}${PRUNE ? " -> SẼ DỌN (SYNC_PRUNE=1)" : " (GIỮ LẠI — additive-only)"}`);

  // Cache mỗi hàng insert bỏ trường phụ `key` trước khi ghi.
  const stripKey = ({ key, ...data }) => data;

  if (DRY) { console.log("DRY RUN — không ghi gì."); return; }
  if (!toInsert.length && (!PRUNE || !toDelete.length)) {
    console.log("✓ Không có gì thay đổi.");
    return;
  }

  // --- 4) Áp dụng trong MỘT transaction (nguyên tử, không downtime) ---
  const ops = [];
  if (PRUNE && toDelete.length) {
    ops.push(prisma.interviewQuestion.deleteMany({ where: { id: { in: toDelete } } }));
  }
  for (const data of toInsert) ops.push(prisma.interviewQuestion.create({ data: stripKey(data) }));
  await prisma.$transaction(ops);

  // --- 5) Báo cáo sau khi ghi ---
  const after = await prisma.category.findMany({
    where: { id: { in: managedCatIds } },
    select: { slug: true, tab: true, _count: { select: { questions: true } } },
    orderBy: { order: "asc" },
  });
  console.log("✓ Xong. Số câu theo danh mục:");
  for (const c of after) console.log(`    [${c.tab}] ${c.slug}: ${c._count.questions}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
