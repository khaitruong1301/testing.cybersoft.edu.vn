// verify-newbie.mjs — CỔNG CHẤT LƯỢNG bài NGƯỜI MỚI + SEO.
// Chạy: node verify-newbie.mjs <path-to-doc-module.mjs>
// Kiểm: block hợp lệ · 3 ngôn ngữ · ja≠en · 8–16 chương · ≥5 hình · hands-on (STEP/code) ·
//       ≥2 tình huống · đúng 1 chương trắc nghiệm 4–5 câu (mỗi câu có giải thích) ·
//       SEO: seo hợp lệ, metaTitle ≤60, ≥3 FAQ, ≥1 CTA, ≥2 internal link, JSON-LD Article+FAQPage+Course.
import { pathToFileURL } from "node:url";

const VALID = new Set(["p", "h", "ul", "code", "note", "tip", "warn", "img", "scenario", "qa"]);
const hasJP = (s) => /[぀-ヿ㐀-䶿一-龯ｦ-ﾟ]/.test(s || "");
const MIN_CH = 8, MAX_CH = 16, MIN_WORDS = 900;
const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const isMcqQ = (q) => /\n\s*A\./.test(q || "") && /\n\s*B\./.test(q || "");
const isMcqA = (a) => /(✅\s*)?(đáp án|answer|正解)/i.test(norm(a) ? a : a || "") || /✅/.test(a || "");

function txt(b) {
  if (b.t === "ul") return (b.items || []).join(" ");
  if (b.t === "scenario") return (b.title || "") + " " + (b.text || "");
  if (b.t === "qa") return (b.q || "") + " " + (b.a || "");
  if (b.t === "img") return b.cap || "";
  if (b.t === "code") return null;
  return b.text || "";
}

const file = process.argv[2];
if (!file) { console.error("Usage: node verify-newbie.mjs <doc-module.mjs>"); process.exit(2); }
const mod = await import(pathToFileURL(file).href);
const docs = Object.values(mod).flat().filter((d) => d && d.pages && d.title);
if (!docs.length) { console.error("No docs found"); process.exit(2); }

let errors = [];
const covers = [];
for (const d of docs) {
  const id = d.slug || d.title.vi;
  covers.push(d.cover);
  if (!d.cover || !String(d.cover).trim().startsWith("<svg")) errors.push(`${id}: cover không phải SVG`);
  const kinds = (d.tags || []).filter((t) => t.g === "kind");
  if (kinds.length !== 1) errors.push(`${id}: cần đúng 1 tag kind`);
  const hasBeginnerTag = (d.tags || []).some((t) => t.k === "beginner");
  if (!hasBeginnerTag) errors.push(`${id}: nên có tag 'beginner'`);
  for (const l of ["vi", "en", "ja"]) {
    if (!d.title?.[l]) errors.push(`${id}: thiếu title.${l}`);
    if (!d.summary?.[l]) errors.push(`${id}: thiếu summary.${l}`);
  }
  if (!hasJP(d.title.ja)) errors.push(`${id}: title.ja chưa phải tiếng Nhật`);
  if (d.pages.length < MIN_CH || d.pages.length > MAX_CH)
    errors.push(`${id}: ${d.pages.length} chương (cần ${MIN_CH}–${MAX_CH})`);

  let words = 0, nImg = 0, nCode = 0, nStep = 0, nScen = 0, nTldr = 0, nCta = 0, nInternal = 0;
  let quizChapters = 0, firstPara = "";
  const headingsText = d.pages.map((p) => norm(p.heading?.vi)).join(" ");
  for (const p of d.pages) {
    for (const l of ["vi", "en", "ja"]) if (!p.heading?.[l]) errors.push(`${id}: page thiếu heading.${l}`);
    const en = p.blocks.en, ja = p.blocks.ja, vi = p.blocks.vi;
    if (!(Array.isArray(en) && Array.isArray(ja) && Array.isArray(vi))) { errors.push(`${id}: blocks không đủ 3 ngôn ngữ`); continue; }
    if (en.length !== ja.length || en.length !== vi.length) errors.push(`${id}: số block lệch giữa ngôn ngữ`);
    let mcqInChapter = 0;
    for (let i = 0; i < vi.length; i++) {
      const b = vi[i];
      if (!VALID.has(b.t)) errors.push(`${id}: block type lạ "${b.t}"`);
      if (b.t === "img") nImg++;
      if (b.t === "code") nCode++;
      if (b.t === "scenario") nScen++;
      if (b.t === "p") { const tx = b.text || ""; words += tx.trim().split(/\s+/).filter(Boolean).length; if (!firstPara) firstPara = tx; if (/▶\s*Bước|▶\s*Step|▶\s*ステップ/.test(tx)) nStep++; if (/xem thêm|see also|\/tai-lieu\//i.test(norm(tx)) || /\/tai-lieu\//.test(tx)) nInternal++; }
      const t = norm(txt(b));
      if (b.t === "note" && t.includes("tl;dr")) nTldr++;
      if (b.t === "note" && (t.includes("cybersoft") || t.includes("🎓"))) nCta++;
      if (b.t === "qa" && isMcqQ(b.q)) { mcqInChapter++; if (!isMcqA(b.a)) errors.push(`${id}: 1 câu trắc nghiệm thiếu đáp án/giải thích`); }
      const jt = txt(ja[i]); const et = txt(en[i]);
      if (jt !== null && !hasJP(jt)) errors.push(`${id}: block ja thiếu tiếng Nhật`);
      if (jt !== null && et !== null && String(jt) === String(et)) errors.push(`${id}: block ja trùng en`);
    }
    if (mcqInChapter > 0) {
      quizChapters++;
      if (mcqInChapter < 4 || mcqInChapter > 5) errors.push(`${id}: chương trắc nghiệm có ${mcqInChapter} câu (cần 4–5)`);
    }
  }

  // ── Cổng NGƯỜI MỚI ──
  if (words < MIN_WORDS) errors.push(`${id}: ~${words} từ vi (< ${MIN_WORDS})`);
  if (nImg < 5) errors.push(`${id}: chỉ ${nImg} hình (< 5) — người mới cần nhiều hình`);
  if (nStep + nCode < 4) errors.push(`${id}: hands-on yếu (STEP+code = ${nStep + nCode} < 4)`);
  if (nScen < 2) errors.push(`${id}: chỉ ${nScen} tình huống (< 2)`);
  if (quizChapters !== 1) errors.push(`${id}: cần ĐÚNG 1 chương trắc nghiệm (đang ${quizChapters})`);

  // ── Cổng SEO ──
  const s = d.seo;
  if (!s) errors.push(`${id}: THIẾU object seo (buildSeo)`);
  else {
    const kw = norm(s.primaryKeyword);
    const tLen = (s.metaTitle?.vi || "").trim().length;
    if (tLen === 0 || tLen > 60) errors.push(`${id}: metaTitle.vi ${tLen} ký tự (cần 1–60)`);
    if (kw && !norm(s.metaTitle?.vi).includes(kw)) errors.push(`${id}: metaTitle không chứa keyword`);
    const dLen = (s.metaDescription?.vi || "").trim().length;
    if (dLen < 120 || dLen > 170) errors.push(`${id}: metaDescription.vi ${dLen} ký tự (khuyến nghị 140–160)`);
    if (!/^[a-z0-9-]+$/.test(d.slug || "")) errors.push(`${id}: slug phải không dấu`);
    if (kw && !norm(firstPara + " " + s.metaDescription?.vi + " " + d.summary?.vi).includes(kw))
      errors.push(`${id}: keyword không xuất hiện ở mở đầu/summary`);
    const types = (s.jsonLd || []).map((x) => x["@type"]);
    for (const need of ["TechArticle", "FAQPage", "Course"])
      if (!types.includes(need)) errors.push(`${id}: JSON-LD thiếu @type ${need}`);
    if ((s.faqs || []).length < 3) errors.push(`${id}: chỉ ${(s.faqs || []).length} FAQ (< 3)`);
    if ((s.courses || []).length < 1) errors.push(`${id}: thiếu course (CTA/Course schema)`);
  }
  if (nTldr < 1) errors.push(`${id}: thiếu TL;DR`);
  if (nCta < 1) errors.push(`${id}: thiếu CTA khóa học`);
  if (nInternal < 2) errors.push(`${id}: chỉ ${nInternal} internal link (< 2)`);

  console.log(`• ${id}: ${d.pages.length} chương · ~${words} từ · img ${nImg} · step+code ${nStep + nCode} · tình huống ${nScen} · quiz ${quizChapters} · FAQ ${(s?.faqs || []).length} · CTA ${nCta} · internal ${nInternal}`);
}
const uniq = new Set(covers);
if (uniq.size !== covers.length) errors.push(`Thumbnail trùng (${uniq.size}/${covers.length})`);

if (errors.length) { console.log("\n❌ CHƯA ĐẠT (Người mới + SEO):"); errors.forEach((e) => console.log("  -", e)); process.exit(1); }
console.log("\n✅ ĐẠT chuẩn Testing_SEO_NguoiMoi (foundation · practice-first · quiz · SEO).");
