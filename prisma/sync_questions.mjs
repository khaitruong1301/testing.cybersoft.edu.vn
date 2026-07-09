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
import { ISTQB_LEVELS, ISTQB_MCQ } from "./istqb.mjs";

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
const PRUNE = process.env.SYNC_PRUNE !== "0";
const DRY = process.env.SYNC_DRY === "1";

// id tất định: đổi 1 ký tự trong câu hỏi -> id khác -> coi như câu mới.
const makeId = (categorySlug, kind, prompt, options, answer) =>
  "q_" + crypto.createHash("sha256")
    .update([categorySlug, kind, J(prompt), options, String(answer)].join("|"))
    .digest("hex")
    .slice(0, 40);

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
      categoryId: catId[slug], kind, prompt: J(item.q), options, answer,
      explanation: J(item.exp), difficulty: 1,
    });
  };
  for (const m of [...MCQ, ...MCQ2, ...IV3A, ...IV3B, ...IV4, ...IV5]) addIV("MCQ", m);
  for (const e of [...ESSAY, ...ESSAY2]) addIV("ESSAY", e);
  for (const s of [...SCENARIO, ...SCENARIO2]) addIV("SCENARIO", s);
  for (const q of ISTQB_MCQ) {
    const slug = q.lvl;
    if (!catId[slug]) { console.warn(`  ! bỏ qua: không có level ${slug}`); continue; }
    const options = J(q.options);
    rows.push({
      id: makeId(slug, "MCQ", q.q, options, String(q.answer)),
      categoryId: catId[slug], kind: "MCQ", prompt: J(q.q), options,
      answer: String(q.answer), explanation: J(q.exp), difficulty: 1,
    });
  }

  // Chống trùng id trong chính nguồn (2 câu y hệt nhau).
  const seen = new Set();
  const wanted = [];
  let dupes = 0;
  for (const r of rows) {
    if (seen.has(r.id)) { dupes++; continue; }
    seen.add(r.id); wanted.push(r);
  }
  if (dupes) console.log(`  (bỏ ${dupes} câu trùng lặp y hệt trong nguồn)`);

  // --- 3) So sánh với DB: chỉ lấy id, rất nhẹ ---
  const managedCatIds = Object.values(catId);
  const existing = await prisma.interviewQuestion.findMany({
    where: { categoryId: { in: managedCatIds } },
    select: { id: true },
  });
  const existingIds = new Set(existing.map((e) => e.id));

  const toInsert = wanted.filter((r) => !existingIds.has(r.id));
  const wantedIds = new Set(wanted.map((r) => r.id));
  const toDelete = existing.filter((e) => !wantedIds.has(e.id)).map((e) => e.id);

  console.log(`  Nguồn: ${wanted.length} câu | DB đang có: ${existing.length}`);
  console.log(`  -> CHÈN MỚI: ${toInsert.length}`);
  console.log(`  -> DỌN (không còn trong nguồn): ${PRUNE ? toDelete.length : 0}${PRUNE ? "" : ` (bỏ qua ${toDelete.length})`}`);
  console.log(`  -> GIỮ NGUYÊN: ${wanted.length - toInsert.length}`);

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
  for (const data of toInsert) ops.push(prisma.interviewQuestion.create({ data }));
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
