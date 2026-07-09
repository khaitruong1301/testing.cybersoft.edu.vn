import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { buildPages } from "./content.mjs";
import { motif, classifyMotif, makeThumb } from "./thumbnail.mjs";
import { DOC_CATEGORIES } from "./topics.mjs";
import { CV_CATEGORY } from "./cv.mjs";
import { IV_CATEGORIES, MCQ, ESSAY, SCENARIO } from "./interview.mjs";
import { MCQ2, ESSAY2, SCENARIO2 } from "./interview2.mjs";
import { DATA as IV3A } from "./interview3_a.mjs";
import { DATA as IV3B } from "./interview3_b.mjs";
import { NEW_CATEGORIES, MORE_TOPICS } from "./topics2.mjs";
import { ISTQB_LEVELS, ISTQB_MCQ } from "./istqb.mjs";
import { PREMIUM_DOCS } from "./doc_premium.mjs";
import { PLAYWRIGHT_PRO_DOCS } from "./doc_playwright_pro.mjs";
import { FLAGSHIP_DOCS } from "./doc_flagship.mjs";
import { AI_DOCS_01 } from "./doc_ai_01.mjs";
import { AI_DOCS_02 } from "./doc_ai_02.mjs";
import { AI_DOCS_03 } from "./doc_ai_03.mjs";
import { AI_DOCS_04 } from "./doc_ai_04.mjs";
import { AI_DOCS_05 } from "./doc_ai_05.mjs";
import { AI_DOCS_06 } from "./doc_ai_06.mjs";
import { AI_DOCS_07 } from "./doc_ai_07.mjs";
import { AI_DOCS_08 } from "./doc_ai_08.mjs";
import { AI_DOCS_09 } from "./doc_ai_09.mjs";
import { AI_DOCS_10 } from "./doc_ai_10.mjs";
import { INTERVIEW_SCENARIO_CATEGORY, INTERVIEW_SCENARIO_DOCS } from "./doc_interview_scenarios.mjs";
import { PWLATEST_01 } from "./doc_pwlatest_01.mjs";
import { PWLATEST_02 } from "./doc_pwlatest_02.mjs";
import { PWLATEST_03 } from "./doc_pwlatest_03.mjs";
import { PWLATEST_04 } from "./doc_pwlatest_04.mjs";
import { PWLATEST_05 } from "./doc_pwlatest_05.mjs";
import { PWLATEST_06 } from "./doc_pwlatest_06.mjs";
import { PWLATEST_07 } from "./doc_pwlatest_07.mjs";
import { PWLATEST_08 } from "./doc_pwlatest_08.mjs";
import { PWLATEST_09 } from "./doc_pwlatest_09.mjs";
import { PWLATEST_10 } from "./doc_pwlatest_10.mjs";
const PWLATEST_DOCS = [
  ...PWLATEST_01, ...PWLATEST_02, ...PWLATEST_03, ...PWLATEST_04, ...PWLATEST_05,
  ...PWLATEST_06, ...PWLATEST_07, ...PWLATEST_08, ...PWLATEST_09, ...PWLATEST_10,
];
import { THUCCHIEN_01_DOCS } from "./doc_thucchien_01.mjs";
import { THUCCHIEN_02_DOCS } from "./doc_thucchien_02.mjs";
import { THUCCHIEN_03_DOCS } from "./doc_thucchien_03.mjs";
import { THUCCHIEN_04_DOCS } from "./doc_thucchien_04.mjs";
import { THUCCHIEN_04B_DOCS } from "./doc_thucchien_04b.mjs";
import { THUCCHIEN_05_DOCS } from "./doc_thucchien_05.mjs";
import { THUCCHIEN_05B_DOCS } from "./doc_thucchien_05b.mjs";
import { DOCS as AT_SELENIUM } from "./doc_at_selenium.mjs";
import { DOCS as AT_CYPRESS } from "./doc_at_cypress.mjs";
import { DOCS as AT_APPIUM } from "./doc_at_appium.mjs";
import { DOCS as AT_POSTMAN } from "./doc_at_postman.mjs";
import { DOCS as AT_K6 } from "./doc_at_k6.mjs";
import { DOCS as AT_JMETER } from "./doc_at_jmeter.mjs";
import { DOCS as AT_GRAPHQL } from "./doc_at_graphql.mjs";
import { DOCS as AT_PACT } from "./doc_at_pact.mjs";
import { AIAGENT_01 } from "./doc_aiagent_01.mjs";
import { AIAGENT_02 } from "./doc_aiagent_02.mjs";
import { AIAGENT_03 } from "./doc_aiagent_03.mjs";
import { AIAGENT_04 } from "./doc_aiagent_04.mjs";
import { AIAGENT_05 } from "./doc_aiagent_05.mjs";
import { AIAGENT_06 } from "./doc_aiagent_06.mjs";
import { AIAGENT_07 } from "./doc_aiagent_07.mjs";
import { AIAGENT_08 } from "./doc_aiagent_08.mjs";
import { AIAGENT_09 } from "./doc_aiagent_09.mjs";
import { AIAGENT_10 } from "./doc_aiagent_10.mjs";
import { AIAGENT_11 } from "./doc_aiagent_11.mjs";
import { BEGINNER_MANUAL_DOCS } from "./doc_beginner_manual.mjs";
import { BEGINNER_MANUAL_ENT_DOCS } from "./doc_beginner_manual_enterprise.mjs";
import { MANUAL_STATE_01 } from "./doc_manual_state_transition.mjs";

// 21 bài "AI Agent trong Testing" mới (chuẩn Testing_BaiViet, SEO/GEO) — thay 5 bài định dạng cũ.
const AIAGENT_DOCS = [
  ...AIAGENT_01, ...AIAGENT_02, ...AIAGENT_03, ...AIAGENT_04, ...AIAGENT_05,
  ...AIAGENT_06, ...AIAGENT_07, ...AIAGENT_08, ...AIAGENT_09, ...AIAGENT_10,
  ...AIAGENT_11,
];

// 20 bài "Công cụ Automation Testing" mới, gộp vào danh mục automation-tools.
const AUTOMATION_TOOL_DOCS = [
  ...AT_SELENIUM, ...AT_CYPRESS, ...AT_APPIUM, ...AT_POSTMAN,
  ...AT_K6, ...AT_JMETER, ...AT_GRAPHQL, ...AT_PACT,
];

// 20 bài "Thực chiến doanh nghiệp" mới, gộp cùng danh mục enterprise-realworld.
const THUCCHIEN_NEW_DOCS = [
  ...THUCCHIEN_01_DOCS, ...THUCCHIEN_02_DOCS, ...THUCCHIEN_03_DOCS,
  ...THUCCHIEN_04_DOCS, ...THUCCHIEN_04B_DOCS, ...THUCCHIEN_05_DOCS, ...THUCCHIEN_05B_DOCS,
];

// 20 bài "AI trong Testing mới nhất" (premium, song ngữ Việt/Anh/Nhật) — thay bài định dạng cũ.
const AI_DOCS = [
  ...AI_DOCS_01, ...AI_DOCS_02, ...AI_DOCS_03, ...AI_DOCS_04, ...AI_DOCS_05,
  ...AI_DOCS_06, ...AI_DOCS_07, ...AI_DOCS_08, ...AI_DOCS_09, ...AI_DOCS_10,
];

const ALL_MCQ = [...MCQ, ...MCQ2, ...IV3A, ...IV3B];
const ALL_ESSAY = [...ESSAY, ...ESSAY2];
const ALL_SCENARIO = [...SCENARIO, ...SCENARIO2];

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ---- Compliance gate (chuẩn Testing_BaiViet) --------------------------------
// Bài ĐẠT chuẩn = ≥12 chương (mục lục), tiêu đề/mô tả 3 ngôn ngữ, và tiếng NHẬT
// dịch THẬT (có ký tự Nhật, khác tiếng Anh) ở mọi block chữ. Bài KHÔNG đạt sẽ bị
// gắn cờ compliant=false và không hiển thị ở mục Tài liệu.
const MIN_CHAPTERS = 12;
const hasJP = (s) => /[぀-ゟ゠-ヿ㐀-䶿一-鿿ｦ-ﾟ]/.test(String(s || ""));
function blockText(b) {
  if (!b) return "";
  if (b.t === "ul") return (b.items || []).join(" ");
  if (b.t === "qa") return (b.q || "") + " " + (b.a || "");
  if (b.t === "scenario") return (b.title || "") + " " + (b.text || "");
  if (b.t === "img") return b.cap || "";
  if (b.t === "code") return null; // code không cần dịch
  return b.text || "";
}
function isCompliant(art) {
  const tri = (o) => o && o.vi && o.en && o.ja;
  if (!tri(art.title) || !tri(art.summary)) return false;
  if (!hasJP(art.title.ja)) return false;
  const pages = art.pages; // chỉ bài dựng bằng buildDoc mới có {heading,blocks}
  if (!Array.isArray(pages) || pages.length < MIN_CHAPTERS) return false;
  for (const p of pages) {
    const h = p.heading;
    if (!h || !h.vi || !h.en || !h.ja || !hasJP(h.ja)) return false; // mục lục 3 ngôn ngữ
    const b = p.blocks;
    if (!b || !Array.isArray(b.vi) || !Array.isArray(b.en) || !Array.isArray(b.ja)) return false;
    if (b.vi.length !== b.en.length || b.vi.length !== b.ja.length) return false;
    for (let i = 0; i < b.ja.length; i++) {
      const jt = blockText(b.ja[i]);
      const et = blockText(b.en[i]);
      if (jt === null) continue;
      if (!hasJP(jt)) return false;            // block tiếng Nhật phải có ký tự Nhật
      if (String(jt) === String(et)) return false; // không được trùng tiếng Anh (chưa dịch)
    }
  }
  return true;
}
let _okCount = 0, _badCount = 0;

// ---- Ảnh đại diện: VISUALIZE keyword + công nghệ + level + nội dung ------------
// Thẻ cover kiểu "khoá học": màu nền theo CÔNG NGHỆ (mỗi tech một tông), icon lớn
// đại diện CHỦ ĐỀ/NỘI DUNG (từ keyword), huy hiệu LEVEL, và nhãn công nghệ.
function _h(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function hslHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return "#" + to(f(0)) + to(f(8)) + to(f(4));
}
// Màu nền theo chủ đề/công nghệ (hue) — mỗi tech một tông nhận diện.
const TOPIC_HUE = {
  ai: 271, browser: 212, network: 198, component: 286, trace: 190, flaky: 6,
  parallel: 236, chart: 150, api: 28, cli: 158, security: 350, device: 205,
  database: 222, qa: 156, building: 222, automation: 250, playwright: 150, default: 214,
};
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
  // Ưu tiên: TECH · DOMAIN (công nghệ + ngành) → else tech/domain/topic/type
  let kw = techN && domN ? `${techN} · ${domN}` : (techN || domN || TOPIC_NAME[topicKey] || (type && (type.en || type.k)) || "TESTING");
  return String(kw).toUpperCase().slice(0, 24);
}
function composeCover(art) {
  const tags = Array.isArray(art.tags) ? art.tags : [];
  const kindK = (tags.find((t) => t && t.g === "kind") || {}).k || "congnghe";
  const topic = classifyMotif(coverText(art), kindK);
  const seed = _h(JSON.stringify(art.title || "") + "|v3");
  const base = TOPIC_HUE[topic] ?? 214;
  const hue = ((base + ((seed % 26) - 13)) % 360 + 360) % 360;
  const hue2 = (hue + 26) % 360;
  const c0 = hslHex(hue, 60, 14 + (seed % 5));
  const c1 = hslHex(hue2, 66, 30 + ((seed >> 3) % 10));
  const glow = hslHex(hue2, 82, 62), ac = hslHex((hue + 172) % 360, 88, 72);
  const c2 = hslHex((hue + 150) % 360, 80, 56); // đốm màu bổ trợ (aurora)
  const u = "v" + seed.toString(36);
  const b1 = _h(JSON.stringify(art.title) + "b1"), b2 = _h(JSON.stringify(art.title) + "b2");
  const b3 = _h(JSON.stringify(art.title) + "b3");
  const kw = keywordLabel(art, topic);
  // Vị trí đốm aurora + xoay nhẹ -> mỗi bài một bố cục "vẽ tay" khác nhau
  const ax = 18 + (b1 % 40), ay = 14 + ((b1 >> 6) % 30);
  const bx = 96 + (b2 % 46), by = 44 + ((b2 >> 6) % 40);
  const cx3 = 60 + (b3 % 60), cy3 = 60 + ((b3 >> 6) % 30);
  const rot = (seed % 14) - 7;
  return `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<defs>
<linearGradient id="${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>
<radialGradient id="${u}s" cx="0.4" cy="0.36" r="0.62"><stop offset="0" stop-color="${glow}" stop-opacity="0.32"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
<linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></linearGradient>
<linearGradient id="${u}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0.03"/></linearGradient>
<pattern id="${u}d" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.9" fill="#fff" opacity="0.05"/></pattern>
<filter id="${u}b" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="11"/></filter>
</defs>
<rect width="160" height="100" fill="url(#${u})"/>
<g filter="url(#${u}b)" opacity="0.9">
  <circle cx="${ax}" cy="${ay}" r="${30 + (b1 % 14)}" fill="${glow}" opacity="0.55"/>
  <circle cx="${bx}" cy="${by}" r="${28 + (b2 % 16)}" fill="${c2}" opacity="0.5"/>
  <circle cx="${cx3}" cy="${cy3}" r="${22 + (b3 % 12)}" fill="${ac}" opacity="0.28"/>
</g>
<rect width="160" height="100" fill="url(#${u}d)"/>
<rect width="160" height="100" fill="url(#${u}s)"/>
<g transform="translate(80 46) rotate(${rot})">
  <rect x="-38" y="-30" width="76" height="60" rx="12" fill="url(#${u}p)" stroke="#fff" stroke-opacity="0.22" stroke-width="0.8"/>
  <g transform="scale(1.02) translate(-80 -50)">${motif(topic, ac)}</g>
</g>
<rect width="160" height="100" fill="url(#${u}g)"/>
<rect x="14" y="83.5" width="15" height="3" rx="1.5" fill="${ac}"/>
<text x="14" y="93" font-size="10.5" font-weight="800" letter-spacing="0.2" fill="#fff" textLength="${Math.min(132, kw.length * 6.1)}" lengthAdjust="spacingAndGlyphs">${kw}</text>
</svg>`;
}
function coverFromContent(_pages, art) {
  // Dùng engine thumbnail v2 (nền ngành + biểu tượng đa biến thể + chip công nghệ).
  const tags = Array.isArray(art.tags) ? art.tags : [];
  const kindK = (tags.find((t) => t && t.g === "kind") || {}).k || "congnghe";
  const domainK = (tags.find((t) => t && t.g === "domain") || {}).k || "default";
  const topic = classifyMotif(coverText(art), kindK);   // chọn biểu tượng từ TOÀN VĂN (chuẩn hơn)
  const label = keywordLabel(art, topic);               // nhãn hiển thị: TECH · DOMAIN
  const id = stableSlug(art);                           // id ổn định/riêng từng bài → icon & cảnh khác nhau
  return makeThumb({ id, domain: domainK, kind: kindK, label, motifKey: topic });
}

// ---- Cập nhật KHÔNG PHÁ dữ liệu: mọi bài/danh mục có "slug" ổn định để upsert ----
const SEEN_ART = new Set(); // slug bài đã seed lần này -> để dọn bài đã gỡ
const SEEN_CAT = new Set(); // slug danh mục đã seed lần này
function _slugify(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function stableSlug(art) {
  const t = art.title || {};
  const base = _slugify(t.en || t.vi || "article") || "article";
  const h = (_h(JSON.stringify(t)) >>> 0).toString(36).slice(0, 6);
  return `${base}-${h}`; // ổn định theo tiêu đề -> ID bài giữ nguyên qua các lần cập nhật
}
// Bọc category.create -> upsert theo slug (giữ id danh mục, không xóa bài con)
async function catCreate(arg) {
  const data = arg.data;
  SEEN_CAT.add(data.slug);
  return prisma.category.upsert({ where: { slug: data.slug }, update: data, create: data });
}

async function createArticle(categoryId, order, art) {
  const pages = art.pages || buildPages(art);
  const compliant = isCompliant(art);
  if (compliant) _okCount++; else _badCount++;
  const slug = art.slug ? _slugify(art.slug) : stableSlug(art);
  SEEN_ART.add(slug);
  const content = {
    categoryId,
    order,
    title: J(art.title),
    summary: J(art.summary),
    cover: coverFromContent(pages, art) || art.cover || "📘", // hình đại diện dựng từ nội dung
    tags: J(art.tags || []),
    level: art.level || "advanced", // mặc định: Thực chiến nâng cao
    compliant, // cờ chuẩn Testing_BaiViet
    body: J(art.summary),
  };
  const article = await prisma.article.upsert({
    where: { slug },
    update: content, // GIỮ NGUYÊN viewCount/readCount/upvotes + bookmark/vote/đọc của học viên
    create: { ...content, slug, viewCount: rand(120, 1800), readCount: rand(30, 500) },
  });
  // Đồng bộ các trang của CHÍNH bài này (trang không chứa dữ liệu người dùng -> thay mới an toàn)
  await prisma.articlePage.deleteMany({ where: { articleId: article.id } });
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    await prisma.articlePage.create({
      data: {
        articleId: article.id,
        order: i + 1,
        kind: "text",
        content: J(p.blocks),
        caption: J(p.heading),
      },
    });
  }
  return article;
}

async function main() {
  // AN TOÀN CHO SERVER: mặc định KHÔNG xóa gì (chỉ thêm/cập nhật). Muốn dọn bài/danh mục
  // đã gỡ khỏi nguồn thì chạy có cờ:  SEED_PRUNE=1 npm run db:seed
  const PRUNE = process.env.SEED_PRUNE === "1";
  console.log(`Seeding CyberSoft Tester (upsert, non-destructive)${PRUNE ? " + PRUNE bật (sẽ xóa bài đã gỡ)" : ""}...`);

  // SQLite: bật WAL để người dùng vẫn ĐỌC được trong lúc seed đang GHI (không bị
  // "database is locked" -> không còn 502 ở /istqb, /interview khi seed chạy).
  // Bỏ qua êm nếu DB không phải SQLite (vd Postgres).
  try {
    await prisma.$executeRawUnsafe("PRAGMA journal_mode=WAL;");
    await prisma.$executeRawUnsafe("PRAGMA busy_timeout=15000;");
    console.log("  SQLite: journal_mode=WAL, busy_timeout=15000");
  } catch {
    console.log("  (bỏ qua PRAGMA — DB không phải SQLite)");
  }

  // ---- Admin ----
  const email = process.env.ADMIN_EMAIL || "admin@cybersoft.edu.vn";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: bcrypt.hashSync(password, 10), name: "CyberSoft Admin" },
  });

  // ---- Settings ----
  const settings = {
    access_days_old: "0", access_days_unregistered: "7",
    extend_days_old: "0", extend_days_unregistered: "90",
    quiz_mcq_count: "30", quiz_essay_count: "5",
    mock_question_count: "40", mock_duration_min: "45",
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  // ---- Cập nhật nội dung KHÔNG PHÁ dữ liệu người dùng ----
  // Bài viết & danh mục dùng upsert theo slug (giữ id -> bookmark/lượt đọc/vote còn nguyên).
  // Bài/danh mục đã gỡ khỏi nguồn sẽ được dọn ở cuối (prune). Câu hỏi phỏng vấn/ISTQB
  // không gắn dữ liệu người dùng nên tạo lại toàn bộ cho gọn.
  // Câu hỏi phỏng vấn/ISTQB KHÔNG gắn dữ liệu người dùng (Attempt lưu câu hỏi trong payload
  // riêng), nên tạo lại từ nguồn cho đồng bộ — không mất lịch sử làm bài của học viên.
  //
  // LƯU Ý: TRƯỚC ĐÂY ở đây có `interviewQuestion.deleteMany()`. Nó đã được CHUYỂN xuống
  // sát chỗ chèn lại và gói trong MỘT transaction (xem "INTERVIEW + ISTQB questions").
  // Lý do: xoá ở đây khiến bảng câu hỏi RỖNG suốt toàn bộ thời gian seed bài viết
  // (hàng phút) -> /istqb và /interview lỗi. Giờ việc thay câu hỏi là nguyên tử.
  if (PRUNE) {
    // Chỉ khi yêu cầu: dọn bài cũ CHƯA có slug (di trú từ trước khi thêm cột slug).
    await prisma.article.deleteMany({ where: { slug: null } });
  }

  // ---- DOCS categories ----
  // ĐÃ BỎ toàn bộ bài định dạng CŨ (buildPages, song ngữ Việt/Anh). Chỉ giữ các danh mục
  // có bài chuẩn MỚI (premium, song ngữ Việt/Anh/Nhật). Các danh mục chỉ còn bài cũ
  // (manual-testing, automation-testing, claude-testing, automation-thinking, performance-api)
  // sẽ không được tạo nữa.
  // Danh mục hiển thị (theo yêu cầu):
  //  - Bổ sung lại: manual-testing, performance-api
  //  - Gộp AI trong Testing + AI Agent -> ai-in-testing (đổi tên "AI/AI-Agent trong Testing")
  //  - Đổi tên automation-tools -> "Automation Testing"; bỏ ai-integration (Tích hợp AI)
  const DOCS_KEEP = new Set(["manual-testing", "performance-api", "playwright-tools", "ai-in-testing"]);
  const CAT_TITLE_OVERRIDE = {
    "ai-in-testing": { vi: "AI/AI-Agent trong Testing", en: "AI & AI-Agents in Testing", ja: "AI/AIエージェントによるテスト" },
    "automation-tools": { vi: "Automation Testing", en: "Automation Testing", ja: "自動化テスト" },
  };
  const docCatMap = {};
  let catOrder = 0;
  for (const cat of DOC_CATEGORIES) {
    if (!DOCS_KEEP.has(cat.slug)) continue; // danh mục chỉ có bài cũ -> bỏ hẳn
    const category = await catCreate({
      data: {
        tab: "DOCS", slug: cat.slug, title: J(CAT_TITLE_OVERRIDE[cat.slug] || cat.title), icon: cat.icon, order: catOrder++,
        description: J({ vi: "Bộ tài liệu thực chiến: khái niệm, luồng xử lý, ví dụ đi làm và kết hợp AI.",
          en: "Practical resources: concepts, workflows, on-the-job examples and AI integration.",
          ja: "実践資料：概念・手順・実務例・AI連携。" }),
      },
    });
    docCatMap[cat.slug] = category.id;
    // KHÔNG seed bài định dạng cũ — chỉ dùng bài chuẩn mới ở các khối bên dưới.
    console.log(`  DOCS ${cat.slug}: category ready (new-format only)`);
  }

  // ---- MANUAL TESTING: bài NGƯỜI MỚI + NÂNG CAO (practice-first · quiz · SEO · level tăng dần) ----
  // Gồm 5 bài nền tảng + 5 bài thực hành doanh nghiệp + 5 bài trung cấp (kỹ thuật thiết kế ca & tích hợp).
  if (docCatMap["manual-testing"]) {
    const MANUAL_ALL = [...BEGINNER_MANUAL_DOCS, ...BEGINNER_MANUAL_ENT_DOCS, ...MANUAL_STATE_01];
    let mo = 1;
    for (const doc of MANUAL_ALL) {
      await createArticle(docCatMap["manual-testing"], mo++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags,
        level: doc.level, seo: doc.seo, pages: doc.pages,
      });
    }
    console.log(`  MANUAL TESTING docs: ${MANUAL_ALL.length} (nền tảng ${BEGINNER_MANUAL_DOCS.length} + doanh nghiệp ${BEGINNER_MANUAL_ENT_DOCS.length} + trung cấp ${MANUAL_STATE_01.length})`);
  }

  // ---- Playwright PRO: 10 bài focused theo chuẩn mới (thay cho bài cơ bản) ----
  if (docCatMap["playwright-tools"]) {
    let po = 1;
    for (const doc of PLAYWRIGHT_PRO_DOCS) {
      await createArticle(docCatMap["playwright-tools"], po++, {
        title: doc.title,
        summary: doc.summary,
        cover: doc.cover,
        tags: doc.tags,
        pages: doc.pages,
      });
    }
    console.log(`  PLAYWRIGHT PRO docs: ${PLAYWRIGHT_PRO_DOCS.length} focused articles`);

    // ---- Playwright & công cụ mới nhất: 20 bài (Agents/MCP/CT/trace/perf/interview...) ----
    let pln = 200;
    for (const doc of PWLATEST_DOCS) {
      await createArticle(docCatMap["playwright-tools"], pln++, {
        title: doc.title,
        summary: doc.summary,
        cover: doc.cover,
        tags: doc.tags,
        pages: doc.pages,
      });
    }
    console.log(`  PLAYWRIGHT LATEST docs: ${PWLATEST_DOCS.length} articles`);
  }

  // ---- AI / AI-Agent trong Testing: GỘP cả AI_DOCS + AIAGENT_DOCS vào 1 danh mục ai-in-testing ----
  if (docCatMap["ai-in-testing"]) {
    let aio = 1;
    for (const doc of AI_DOCS) {
      await createArticle(docCatMap["ai-in-testing"], aio++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags, pages: doc.pages,
      });
    }
    let aaCount = 0;
    for (const doc of AIAGENT_DOCS) {
      await createArticle(docCatMap["ai-in-testing"], 100 + aaCount++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags, pages: doc.pages,
      });
    }
    console.log(`  AI/AI-Agent docs -> ai-in-testing: ${AI_DOCS.length} + ${aaCount} = ${AI_DOCS.length + aaCount} articles`);
  }

  // ---- NEW DOCS categories (automation tools, AI integration...) ----
  // Bỏ bài định dạng cũ trong các danh mục này — chỉ giữ khung danh mục để chứa bài chuẩn mới
  // (AUTOMATION_TOOL_DOCS / PREMIUM_DOCS ở các khối bên dưới).
  for (const cat of NEW_CATEGORIES) {
    if (cat.slug === "ai-integration") continue; // BỎ danh mục "Tích hợp AI vào Testing"
    const category = await catCreate({
      data: {
        tab: "DOCS", slug: cat.slug, title: J(CAT_TITLE_OVERRIDE[cat.slug] || cat.title), icon: cat.icon, order: catOrder++,
        description: J({ vi: "Bộ tài liệu thực chiến: khái niệm, luồng xử lý, ví dụ đi làm và kết hợp AI.",
          en: "Practical resources: concepts, workflows, on-the-job examples and AI integration.",
          ja: "実践資料：概念・手順・実務例・AI連携。" }),
      },
    });
    docCatMap[cat.slug] = category.id;
    console.log(`  DOCS ${cat.slug}: category ready (new-format only)`);
  }

  // ---- AUTOMATION TOOLS: 20 bài sâu (Selenium/Cypress/Appium/Postman/k6/JMeter/GraphQL/PACT) ----
  {
    let ato = 20;
    let atCount = 0;
    for (const doc of AUTOMATION_TOOL_DOCS) {
      const catId = docCatMap[doc.categorySlug];
      if (!catId) { console.warn(`  ! AUTOMATION skip: no category ${doc.categorySlug} (${doc.slug})`); continue; }
      await createArticle(catId, ato++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags, pages: doc.pages,
      });
      atCount++;
    }
    console.log(`  AUTOMATION TOOL docs -> automation-tools: ${atCount}`);
  }

  // ---- PREMIUM docs (new authoring standard: big, multi-domain, own thumbnail) ----
  for (const doc of PREMIUM_DOCS) {
    const catId = docCatMap[doc.categorySlug];
    if (!catId) { console.warn(`  ! PREMIUM skip: no category ${doc.categorySlug}`); continue; }
    await createArticle(catId, 100, {
      title: doc.title,
      summary: doc.summary,
      cover: doc.cover, // full inline SVG → distinctive per-doc thumbnail
      tags: doc.tags,
      pages: doc.pages,
    });
    console.log(`  PREMIUM doc -> ${doc.categorySlug}: ${doc.slug}`);
  }

  // ---- FLAGSHIP category: Thực chiến Doanh nghiệp (bài sâu, đa domain) ----
  const ENTERPRISE_DOCS = [...FLAGSHIP_DOCS, ...THUCCHIEN_NEW_DOCS];
  if (ENTERPRISE_DOCS.length) {
    const flagCat = await catCreate({
      data: {
        tab: "DOCS", slug: "enterprise-realworld", order: catOrder++, icon: "🏢",
        title: J({ vi: "Thực chiến Doanh nghiệp", en: "Enterprise Real-World", ja: "実戦・企業事例" }),
        description: J({
          vi: "Bài sâu giải bài toán thật ở doanh nghiệp/tập đoàn trên các domain lớn: tài chính, ngân hàng, bảo hiểm, y tế, TMĐT, CRM, ERP. Mỗi bài có mục lục, mô tả nghiệp vụ bài bản, chiến lược, code, và góc phỏng vấn.",
          en: "Deep articles solving real enterprise problems across large domains: finance, banking, insurance, healthcare, e-commerce, CRM, ERP. Each has a table of contents, thorough business description, strategy, code, and an interview angle.",
          ja: "金融・銀行・保険・医療・EC・CRM・ERP など大規模ドメインの実戦事例。目次・業務記述・戦略・コード・面接観点を含む。",
        }),
      },
    });
    docCatMap["enterprise-realworld"] = flagCat.id;
    let fo = 1;
    for (const doc of ENTERPRISE_DOCS) {
      await createArticle(flagCat.id, fo++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags, pages: doc.pages,
      });
    }
    console.log(`  ENTERPRISE docs: ${ENTERPRISE_DOCS.length} (flagship ${FLAGSHIP_DOCS.length} + thucchien mới ${THUCCHIEN_NEW_DOCS.length})`);
  }

  // ---- INTERVIEW SCENARIOS category: Tình huống phỏng vấn chuyên sâu (chuẩn Testing_BaiViet) ----
  if (INTERVIEW_SCENARIO_DOCS.length) {
    const ivCat = await catCreate({
      data: {
        tab: "DOCS", slug: INTERVIEW_SCENARIO_CATEGORY.slug, order: catOrder++,
        icon: INTERVIEW_SCENARIO_CATEGORY.icon,
        title: J(INTERVIEW_SCENARIO_CATEGORY.title),
        description: J(INTERVIEW_SCENARIO_CATEGORY.description),
      },
    });
    docCatMap["interview-scenarios"] = ivCat.id;
    let io = 1;
    for (const doc of INTERVIEW_SCENARIO_DOCS) {
      await createArticle(ivCat.id, io++, {
        title: doc.title, summary: doc.summary, cover: doc.cover, tags: doc.tags, pages: doc.pages,
      });
    }
    console.log(`  INTERVIEW SCENARIOS: ${INTERVIEW_SCENARIO_DOCS.length}`);
  }

  // ---- CV category ----
  const cvCat = await catCreate({
    data: {
      tab: "CV", slug: CV_CATEGORY.slug, title: J(CV_CATEGORY.title), icon: CV_CATEGORY.icon, order: 0,
      description: J({ vi: "Hướng dẫn làm CV vượt ATS và CV mẫu gây ấn tượng nhà tuyển dụng.",
        en: "Guides to beat ATS and sample CVs that impress recruiters.", ja: "ATS突破ガイドとサンプル履歴書。" }),
    },
  });
  let cvo = 0;
  for (const topic of CV_CATEGORY.topics) await createArticle(cvCat.id, cvo++, { ...topic, cover: "📄" });
  for (const sample of CV_CATEGORY.samples) await createArticle(cvCat.id, cvo++, { ...sample, cover: "🧾" });
  console.log(`  CV ${CV_CATEGORY.slug}: ${CV_CATEGORY.topics.length + CV_CATEGORY.samples.length} articles`);

  // ---- INTERVIEW categories + questions ----
  const catMap = {};
  let ivOrder = 0;
  for (const c of IV_CATEGORIES) {
    const cat = await catCreate({
      data: { tab: "INTERVIEW", slug: c.slug, title: J(c.title), icon: "🎤", order: ivOrder++,
        description: J({ vi: "Ngân hàng câu hỏi phỏng vấn thực tế VN & quốc tế, tự chấm.",
          en: "Real VN & global interview question bank, auto-graded.", ja: "国内外の面接問題集、自動採点。" }) },
    });
    catMap[c.slug] = cat.id;
  }
  // ---- ISTQB tab: 3 levels (tạo category TRƯỚC, để chèn câu hỏi 1 lần duy nhất) ----
  const lvlMap = {};
  let lvlOrder = 0;
  for (const lv of ISTQB_LEVELS) {
    const cat = await catCreate({
      data: { tab: "ISTQB", slug: lv.slug, title: J(lv.title), icon: lv.icon, order: lvlOrder++,
        description: J({ vi: "Luyện thi chứng chỉ ISTQB theo cấp độ, hệ thống tự chấm.",
          en: "ISTQB certification practice by level, auto-graded.", ja: "レベル別ISTQB対策、自動採点。" }) },
    });
    lvlMap[lv.slug] = cat.id;
  }

  // ---- INTERVIEW + ISTQB questions: THAY THẾ NGUYÊN TỬ ----
  // Dựng sẵn toàn bộ hàng trong RAM, rồi xoá + chèn lại trong MỘT transaction.
  // Nhờ vậy bảng câu hỏi không bao giờ rỗng với người đang dùng site (không downtime).
  const rowIV = (kind, item) => ({
    categoryId: catMap[item.cat] || Object.values(catMap)[0],
    kind,
    prompt: J(item.q),
    options: kind === "MCQ" ? J(item.options) : "[]",
    answer: kind === "MCQ" ? String(item.answer) : J(item.keywords || []),
    explanation: J(item.exp),
    difficulty: rand(1, 3),
  });
  const rowISTQB = (q) => ({
    categoryId: lvlMap[q.lvl] || Object.values(lvlMap)[0],
    kind: "MCQ", prompt: J(q.q), options: J(q.options),
    answer: String(q.answer), explanation: J(q.exp), difficulty: rand(1, 3),
  });

  const questionRows = [
    ...ALL_MCQ.map((m) => rowIV("MCQ", m)),
    ...ALL_ESSAY.map((e) => rowIV("ESSAY", e)),
    ...ALL_SCENARIO.map((s) => rowIV("SCENARIO", s)),
    ...ISTQB_MCQ.map(rowISTQB),
  ];

  await prisma.$transaction([
    prisma.interviewQuestion.deleteMany(),
    ...questionRows.map((data) => prisma.interviewQuestion.create({ data })),
  ]);

  console.log(`  INTERVIEW: ${ALL_MCQ.length} MCQ, ${ALL_ESSAY.length} essay, ${ALL_SCENARIO.length} scenario`);
  console.log(`  ISTQB: ${ISTQB_LEVELS.length} levels, ${ISTQB_MCQ.length} questions`);
  console.log(`  -> Thay thế nguyên tử ${questionRows.length} câu hỏi (1 transaction, không downtime)`);

  // ---- Dọn nội dung đã gỡ — CHỈ chạy khi SEED_PRUNE=1 (tường minh yêu cầu) ----
  // KHÔNG đụng tới student/session/accessCode/bookmark trong mọi trường hợp.
  if (PRUNE) {
    const pruned = await prisma.article.deleteMany({ where: { slug: { notIn: Array.from(SEEN_ART) } } });
    await prisma.category.deleteMany({ where: { slug: { notIn: Array.from(SEEN_CAT) } } });
    console.log(`  Prune: gỡ ${pruned.count} bài không còn trong nguồn`);
  } else {
    console.log("  Prune: BỎ QUA (mặc định giữ nguyên mọi bài trên server). Dùng SEED_PRUNE=1 nếu muốn dọn.");
  }

  // ---- Demo codes + student (upsert -> chạy lại nhiều lần không lỗi, không xóa ai) ----
  const demoOld = await prisma.accessCode.upsert({
    where: { code: "AB2K7M" }, update: {},
    create: { code: "AB2K7M", name: "Nguyễn Văn A", email: "hocvien@demo.vn", phone: "0900000001", type: "OLD", batch: "DEMO" },
  });
  await prisma.accessCode.upsert({
    where: { code: "QP9XR4" }, update: {},
    create: { code: "QP9XR4", name: "Trần Thị B", email: "moi@demo.vn", phone: "0900000002", type: "UNREGISTERED", batch: "DEMO" },
  });
  await prisma.student.upsert({
    where: { codeId: demoOld.id }, update: {},
    create: { name: demoOld.name, email: demoOld.email, phone: demoOld.phone, type: "OLD", registered: true, codeId: demoOld.id },
  });

  const totalArticles = await prisma.article.count();
  const totalQ = await prisma.interviewQuestion.count();
  console.log(`\nSeed complete. Articles: ${totalArticles} | Interview Q: ${totalQ}`);
  console.log(`Testing_BaiViet compliance: ✅ ĐẠT ${_okCount} · ❌ KHÔNG ĐẠT ${_badCount} (bài không đạt bị ẩn ở mục Tài liệu)`);
  console.log("Admin:", email, "/", password);
  console.log("Demo OLD -> hocvien@demo.vn | 0900000001 | AB2K7M");
  console.log("Demo NEW -> moi@demo.vn | 0900000002 | QP9XR4");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
