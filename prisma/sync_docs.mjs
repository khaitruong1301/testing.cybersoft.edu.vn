// ============================================================================
// SYNC DOCS — nạp BÀI VIẾT tăng dần (incremental), KHÔNG seed lại từ đầu.
//
// Song sinh với sync_questions.mjs, nhưng cho bảng Article/ArticlePage.
//
// Khác biệt cốt lõi so với câu hỏi: Article.id được BOOKMARK / VOTE / COMMENT /
// VIEW tham chiếu (onDelete: Cascade). Nên KHÔNG dùng id tất định theo hash —
// khoá ổn định là `slug` (unique). Bài đã có -> update tại chỗ, GIỮ NGUYÊN id,
// viewCount, readCount, upvotes và mọi dữ liệu học viên.
//
// Cơ chế:
//   - Bài chưa có (slug mới)      -> CHÈN (article + pages, 1 nested create).
//   - Bài đã có, nội dung y hệt   -> BỎ QUA, không ghi một dòng nào.
//   - Bài đã có, nội dung đổi     -> UPDATE tại chỗ + thay pages (nested).
//   - Bài gỡ khỏi nguồn           -> chỉ dọn khi SYNC_PRUNE=1 (mặc định KHÔNG).
//
// Mọi thay đổi nằm trong MỘT transaction -> không downtime, chạy lại idempotent.
//
// KHÔNG đụng: .env, schema.prisma, web.config, node_modules, .next,
//             câu hỏi phỏng vấn/ISTQB, học viên, mã truy cập, lịch sử làm bài.
//
// Dùng:
//   node prisma/sync_docs.mjs               # chèn bài mới + cập nhật bài đổi
//   SYNC_DRY=1   node prisma/sync_docs.mjs  # xem trước, KHÔNG ghi gì
//   SYNC_PRUNE=1 node prisma/sync_docs.mjs  # dọn bài đã gỡ khỏi nguồn (NGUY HIỂM:
//                                           # cascade xoá bookmark/vote/comment)
// ============================================================================
import { PrismaClient } from "@prisma/client";
import { classifyMotif, makeThumb } from "./thumbnail.mjs";
import { DOC_CATEGORIES } from "./topics.mjs";

// ---- Nguồn bài viết. Thêm danh mục mới thì thêm một mục vào SOURCES. --------
// startOrder phải KHỚP với seed.mjs để hai đường ghi ra cùng `order`.
import { BEGINNER_MANUAL_DOCS } from "./doc_beginner_manual.mjs";
import { BEGINNER_MANUAL_ENT_DOCS } from "./doc_beginner_manual_enterprise.mjs";
import { MANUAL_ADV_01 } from "./doc_manual_advanced_01.mjs";
import { MANUAL_STATE_01 } from "./doc_manual_state_transition.mjs";
import { MANUAL_BEGINNER_DEFECT_01 } from "./doc_manual_beginner_defect_lifecycle.mjs";
import { MANUAL_BEGINNER_SEVPRI_01 } from "./doc_manual_beginner_severity_priority.mjs";
import { MANUAL_BEGINNER_NEGATIVE_01 } from "./doc_manual_beginner_negative_testing.mjs";
import { MB_TEST_DATA_01 } from "./doc_mb_test_data.mjs";
import { MB_YEUCAU_01 } from "./doc_mb_phan_tich_yeu_cau.mjs";
import { MB_DANGNHAP_01 } from "./doc_mb_dang_nhap.mjs";
import { MB_TIMKIEM_01 } from "./doc_mb_tim_kiem.mjs";
import { MB_TESTREPORT_01 } from "./doc_mb_test_report.mjs";
import { MB_GIOHANG_01 } from "./doc_mb_gio_hang.mjs";
import { MB_UPLOAD_01 } from "./doc_mb_upload_file.mjs";
import { MB_THONGBAO_01 } from "./doc_mb_thong_bao.mjs";
import { MB_EMAILOTP_01 } from "./doc_mb_email_otp.mjs";
import { MB_PHANTRANG_01 } from "./doc_mb_phan_trang.mjs";
import { MB_DANGONNGU_01 } from "./doc_mb_da_ngon_ngu.mjs";
import { MB_PHANQUYEN_01 } from "./doc_mb_phan_quyen.mjs";
import { MB_RESETPW_01 } from "./doc_mb_dat_lai_mat_khau.mjs";
import { MB_SMOKESANITY_01 } from "./doc_mb_smoke_sanity.mjs";
import { MB_JIRA_01 } from "./doc_mb_jira.mjs";
import { MB_USABILITY_01 } from "./doc_mb_usability.mjs";
import { MB_A11Y_01 } from "./doc_mb_accessibility.mjs";
// --- Manual / Nâng cao (advanced) ---
import { MA_ERRORGUESS_01 } from "./doc_ma_error_guessing.mjs";
import { MA_RISKBASED_01 } from "./doc_ma_risk_based.mjs";

const SOURCES = [
  {
    categorySlug: "manual-testing",
    startOrder: 1, // seed.mjs: `let mo = 1`
    docs: [...BEGINNER_MANUAL_DOCS, ...BEGINNER_MANUAL_ENT_DOCS, ...MANUAL_BEGINNER_DEFECT_01, ...MANUAL_BEGINNER_SEVPRI_01, ...MANUAL_BEGINNER_NEGATIVE_01, ...MB_TEST_DATA_01, ...MB_YEUCAU_01, ...MB_DANGNHAP_01, ...MB_TIMKIEM_01, ...MB_TESTREPORT_01, ...MB_GIOHANG_01, ...MB_UPLOAD_01, ...MB_THONGBAO_01, ...MB_EMAILOTP_01, ...MB_PHANTRANG_01, ...MB_DANGONNGU_01, ...MB_PHANQUYEN_01, ...MB_RESETPW_01, ...MB_SMOKESANITY_01, ...MB_JIRA_01, ...MB_USABILITY_01, ...MB_A11Y_01, ...MA_ERRORGUESS_01, ...MA_RISKBASED_01, ...MANUAL_ADV_01, ...MANUAL_STATE_01],
  },
];

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
const DRY = process.env.SYNC_DRY === "1";
const PRUNE = process.env.SYNC_PRUNE === "1"; // mặc định TẮT (an toàn)
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── Các helper SAO CHÉP NGUYÊN VĂN từ seed.mjs để cover/slug/compliant khớp ───
// (nếu seed.mjs đổi các hàm này, phải đồng bộ lại ở đây — có test parity ở cuối repo)
const hasJP = (s) => /[぀-ゟ゠-ヿ㐀-䶿一-鿿ｦ-ﾟ]/.test(String(s || ""));
function blockText(b) {
  if (!b) return "";
  if (b.t === "ul") return (b.items || []).join(" ");
  if (b.t === "qa") return (b.q || "") + " " + (b.a || "");
  if (b.t === "scenario") return (b.title || "") + " " + (b.text || "");
  if (b.t === "img") return b.cap || "";
  if (b.t === "code") return null;
  return b.text || "";
}
const MIN_CHAPTERS = 12;
function isCompliant(art) {
  const tri = (o) => o && o.vi && o.en && o.ja;
  if (!tri(art.title) || !tri(art.summary)) return false;
  if (!hasJP(art.title.ja)) return false;
  const pages = art.pages;
  if (!Array.isArray(pages) || pages.length < MIN_CHAPTERS) return false;
  for (const p of pages) {
    const h = p.heading;
    if (!h || !h.vi || !h.en || !h.ja || !hasJP(h.ja)) return false;
    const b = p.blocks;
    if (!b || !Array.isArray(b.vi) || !Array.isArray(b.en) || !Array.isArray(b.ja)) return false;
    if (b.vi.length !== b.en.length || b.vi.length !== b.ja.length) return false;
    for (let i = 0; i < b.ja.length; i++) {
      const jt = blockText(b.ja[i]);
      const et = blockText(b.en[i]);
      if (jt === null) continue;
      if (!hasJP(jt)) return false;
      if (String(jt) === String(et)) return false;
    }
  }
  return true;
}
function _h(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function coverText(art) {
  const tags = Array.isArray(art.tags) ? art.tags : [];
  return " " + ((art.title && (art.title.en || art.title.vi)) || "") + " " + tags.map((t) => t && (t.en || t.k)).join(" ") + " ";
}
const TOPIC_NAME = {
  ai: "AI TESTING", browser: "CROSS-BROWSER", network: "NETWORK", component: "COMPONENT",
  trace: "TRACE / DEBUG", flaky: "ANTI-FLAKY", parallel: "PARALLEL / CI", chart: "PERFORMANCE",
  api: "API TESTING", cli: "CLI / CODEGEN", security: "SECURITY", device: "MOBILE / DEVICE",
  database: "DATA / STORAGE", qa: "INTERVIEW", building: "ENTERPRISE", automation: "AUTOMATION",
  playwright: "PLAYWRIGHT", gear: "TESTING", default: "TESTING",
};
function keywordLabel(art, topicKey) {
  const tags = Array.isArray(art.tags) ? art.tags : [];
  const tech = tags.find((t) => t && t.g === "tech");
  const domain = tags.find((t) => t && t.g === "domain");
  const type = tags.find((t) => t && t.g === "type");
  const techN = tech && (tech.en || tech.k);
  const domN = domain && (domain.en || domain.k);
  let kw = techN && domN ? `${techN} · ${domN}` : (techN || domN || TOPIC_NAME[topicKey] || (type && (type.en || type.k)) || "TESTING");
  return String(kw).toUpperCase().slice(0, 24);
}
function _slugify(s) {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function stableSlug(art) {
  const t = art.title || {};
  const base = _slugify(t.en || t.vi || "article") || "article";
  const h = (_h(JSON.stringify(t)) >>> 0).toString(36).slice(0, 6);
  return `${base}-${h}`;
}
function coverFromContent(_pages, art) {
  const tags = Array.isArray(art.tags) ? art.tags : [];
  const kindK = (tags.find((t) => t && t.g === "kind") || {}).k || "congnghe";
  const domainK = (tags.find((t) => t && t.g === "domain") || {}).k || "default";
  const topic = classifyMotif(coverText(art), kindK);
  const label = keywordLabel(art, topic);
  const id = stableSlug(art);
  return makeThumb({ id, domain: domainK, kind: kindK, label, motifKey: topic });
}
// ─────────────────────────────────────────────────────────────────────────────

const pagesOf = (art) =>
  (art.pages || []).map((p, i) => ({
    order: i + 1, kind: "text", content: J(p.blocks), caption: J(p.heading),
  }));

const samePages = (a, b) =>
  a.length === b.length &&
  a.every((p, i) => p.order === b[i].order && p.kind === b[i].kind &&
    p.content === b[i].content && p.caption === b[i].caption);

async function main() {
  console.log(`Sync docs (incremental)${DRY ? " [DRY RUN]" : ""}${PRUNE ? " [PRUNE BẬT]" : " [chỉ thêm/sửa, không xoá]"}...`);

  try {
    await prisma.$executeRawUnsafe("PRAGMA journal_mode=WAL;");
    await prisma.$executeRawUnsafe("PRAGMA busy_timeout=15000;");
  } catch { /* không phải SQLite -> bỏ qua */ }

  const catMeta = Object.fromEntries((DOC_CATEGORIES || []).map((c) => [c.slug, c]));
  const ops = [];
  let nInsert = 0, nUpdate = 0, nSame = 0, nPrune = 0;
  const managedCatIds = [];

  for (const src of SOURCES) {
    // --- 1) Danh mục: upsert theo slug, KHÔNG clobber tiêu đề đang có ---
    const meta = catMeta[src.categorySlug] || {};
    const cat = await prisma.category.upsert({
      where: { slug: src.categorySlug },
      update: {},
      create: {
        tab: "DOCS", slug: src.categorySlug, order: 0,
        icon: meta.icon || "📘",
        title: J(meta.title || { vi: src.categorySlug, en: src.categorySlug, ja: src.categorySlug }),
        description: J({ vi: "Bộ tài liệu thực chiến.", en: "Practical resources.", ja: "実践資料。" }),
      },
    });
    managedCatIds.push(cat.id);

    const wantedSlugs = new Set();
    let order = src.startOrder;

    for (const art of src.docs) {
      const slug = art.slug ? _slugify(art.slug) : stableSlug(art);
      wantedSlugs.add(slug);
      const pages = art.pages || [];
      const compliant = isCompliant(art);
      const content = {
        categoryId: cat.id,
        order: order++,
        title: J(art.title),
        summary: J(art.summary),
        cover: coverFromContent(pages, art) || art.cover || "📘",
        tags: J(art.tags || []),
        level: art.level || "advanced",
        compliant,
        body: J(art.summary),
      };
      const wantPages = pagesOf(art);

      const cur = await prisma.article.findUnique({
        where: { slug },
        include: { pages: { orderBy: { order: "asc" }, select: { order: true, kind: true, content: true, caption: true } } },
      });

      if (!cur) {
        nInsert++;
        ops.push(prisma.article.create({
          data: {
            ...content, slug,
            viewCount: rand(120, 1800), readCount: rand(30, 500),
            pages: { create: wantPages },
          },
        }));
        continue;
      }

      const unchanged =
        cur.categoryId === content.categoryId && cur.order === content.order &&
        cur.title === content.title && cur.summary === content.summary &&
        cur.body === content.body && cur.cover === content.cover &&
        cur.tags === content.tags && cur.level === content.level &&
        cur.compliant === content.compliant &&
        samePages(wantPages, cur.pages);

      if (unchanged) { nSame++; continue; }

      nUpdate++;
      ops.push(prisma.article.update({
        where: { slug },
        // GIỮ NGUYÊN id/viewCount/readCount/upvotes -> bookmark, vote, comment còn nguyên
        data: { ...content, pages: { deleteMany: {}, create: wantPages } },
      }));
    }

    // --- 2) Dọn bài đã gỡ khỏi nguồn (mặc định KHÔNG chạy) ---
    if (PRUNE) {
      const stale = await prisma.article.findMany({
        where: { categoryId: cat.id, slug: { notIn: Array.from(wantedSlugs) } },
        select: { id: true, slug: true },
      });
      if (stale.length) {
        console.warn(`  ⚠️  PRUNE sẽ xoá ${stale.length} bài ở "${src.categorySlug}" (cascade xoá bookmark/vote/comment):`);
        stale.forEach((s) => console.warn(`       - ${s.slug}`));
        nPrune += stale.length;
        ops.push(prisma.article.deleteMany({ where: { id: { in: stale.map((s) => s.id) } } }));
      }
    }
  }

  console.log(`  -> CHÈN MỚI: ${nInsert}`);
  console.log(`  -> CẬP NHẬT (nội dung đổi): ${nUpdate}`);
  console.log(`  -> GIỮ NGUYÊN (không ghi): ${nSame}`);
  console.log(`  -> DỌN: ${nPrune}${PRUNE ? "" : " (PRUNE tắt)"}`);

  if (DRY) { console.log("DRY RUN — không ghi gì."); return; }
  if (!ops.length) { console.log("✓ Không có gì thay đổi."); return; }

  // --- 3) Áp dụng trong MỘT transaction (nguyên tử, không downtime) ---
  await prisma.$transaction(ops);

  // --- 4) Báo cáo ---
  const after = await prisma.category.findMany({
    where: { id: { in: managedCatIds } },
    select: { slug: true, _count: { select: { articles: true } } },
  });
  console.log("✓ Xong. Số bài theo danh mục:");
  for (const c of after) console.log(`    [DOCS] ${c.slug}: ${c._count.articles}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
