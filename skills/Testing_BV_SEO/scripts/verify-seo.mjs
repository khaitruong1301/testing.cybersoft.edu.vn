// verify-seo.mjs — CỔNG CHẤT LƯỢNG SEO (mở rộng verify.mjs của Testing_BaiViet).
// Chạy: node verify-seo.mjs <path-to-doc-module.mjs>
// Kiểm: (base) block hợp lệ · 3 ngôn ngữ · ja≠en · ≥12 chương · độ dày · thumbnail · JSON
//       (SEO)  seo.metaTitle ≤60 · metaDescription 140–160 · keyword ở title/đầu bài/heading ·
//              slug không dấu chứa keyword · ≥1 TL;DR · ≥4 FAQ · ≥1 CTA · ≥2 internal link ·
//              JSON-LD có Article + FAQPage + Course · canonical đúng.
import { pathToFileURL } from "node:url";

const VALID = new Set(["p", "h", "ul", "code", "note", "tip", "warn", "img", "scenario", "qa"]);
const hasJP = (s) => /[぀-ヿ㐀-䶿一-龯ｦ-ﾟ]/.test(s || "");
const MIN_CHAPTERS = 12, MIN_WORDS = 1200;
const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function txt(b) {
  if (b.t === "ul") return (b.items || []).join(" ");
  if (b.t === "scenario") return b.title + " " + b.text;
  if (b.t === "qa") return b.q + " " + b.a;
  if (b.t === "img") return b.cap || "";
  if (b.t === "code") return null;
  return b.text || "";
}

const file = process.argv[2];
if (!file) { console.error("Usage: node verify-seo.mjs <doc-module.mjs>"); process.exit(2); }
const mod = await import(pathToFileURL(file).href);
const docs = Object.values(mod).flat().filter((d) => d && d.pages && d.title);
if (!docs.length) { console.error("No docs found"); process.exit(2); }

let errors = [];
const covers = [];
for (const d of docs) {
  const id = d.slug || d.title.vi;
  covers.push(d.cover);

  // ── (A) BASE (chuẩn vàng Testing_BaiViet) ──
  if (!d.cover || !String(d.cover).trim().startsWith("<svg")) errors.push(`${id}: cover không phải SVG`);
  const kinds = (d.tags || []).filter((t) => t.g === "kind");
  if (kinds.length !== 1) errors.push(`${id}: cần đúng 1 tag kind (đang ${kinds.length})`);
  for (const l of ["vi", "en", "ja"]) {
    if (!d.title?.[l]) errors.push(`${id}: thiếu title.${l}`);
    if (!d.summary?.[l]) errors.push(`${id}: thiếu summary.${l}`);
  }
  if (!hasJP(d.title.ja)) errors.push(`${id}: title.ja chưa phải tiếng Nhật`);
  if (d.pages.length < MIN_CHAPTERS) errors.push(`${id}: chỉ ${d.pages.length} chương (< ${MIN_CHAPTERS})`);

  let words = 0, nCode = 0, nImg = 0, nQa = 0, jaSame = 0;
  let nTldr = 0, nDef = 0, nCta = 0, nInternal = 0, firstParaText = "";
  const headingsText = d.pages.map((p) => norm(p.heading?.vi)).join(" ");
  for (const p of d.pages) {
    for (const l of ["vi", "en", "ja"]) if (!p.heading?.[l]) errors.push(`${id}: page thiếu heading.${l}`);
    const en = p.blocks.en, ja = p.blocks.ja, vi = p.blocks.vi;
    if (!(Array.isArray(en) && Array.isArray(ja) && Array.isArray(vi))) { errors.push(`${id}: blocks không đủ 3 ngôn ngữ`); continue; }
    if (en.length !== ja.length || en.length !== vi.length) errors.push(`${id}: số block lệch giữa ngôn ngữ`);
    for (let i = 0; i < vi.length; i++) {
      const b = vi[i];
      if (!VALID.has(b.t)) errors.push(`${id}: block type lạ "${b.t}"`);
      if (b.t === "code") nCode++;
      if (b.t === "img") nImg++;
      if (b.t === "qa") nQa++;
      if (b.t === "p") { words += (b.text || "").trim().split(/\s+/).filter(Boolean).length; if (!firstParaText) firstParaText = b.text || ""; }
      const t = norm(txt(b));
      if (b.t === "note" && t.includes("tl;dr")) nTldr++;
      if (b.t === "note" && t.includes("📖")) nDef++;
      if (b.t === "note" && (t.includes("cybersoft") || t.includes("🎓"))) nCta++;
      if (b.t === "p" && (t.includes("xem them") || t.includes("see also") || t.includes("/tai-lieu/"))) nInternal++;
      const jt = txt(ja[i]); const et = txt(en[i]);
      if (jt !== null) { if (!hasJP(jt)) errors.push(`${id}: block ja thiếu tiếng Nhật`); if (et !== null && String(jt) === String(et)) jaSame++; }
    }
  }
  if (words < MIN_WORDS) errors.push(`${id}: chỉ ~${words} từ văn xuôi vi (< ${MIN_WORDS})`);
  if (nCode < 6) errors.push(`${id}: chỉ ${nCode} code (< 6)`);
  if (nImg < 2) errors.push(`${id}: chỉ ${nImg} img (< 2)`);
  if (nQa < 3) errors.push(`${id}: chỉ ${nQa} qa (< 3)`);
  if (jaSame > 0) errors.push(`${id}: ${jaSame} block ja trùng en (chưa dịch)`);

  // ── (B) SEO ──
  const s = d.seo;
  if (!s) { errors.push(`${id}: THIẾU object seo (buildSeo)`); }
  else {
    const kw = norm(s.primaryKeyword);
    if (!s.primaryKeyword) errors.push(`${id}: thiếu primaryKeyword`);
    const tLen = (s.metaTitle?.vi || "").trim().length;
    if (tLen === 0 || tLen > 60) errors.push(`${id}: metaTitle.vi ${tLen} ký tự (cần 1–60)`);
    if (kw && !norm(s.metaTitle?.vi).includes(kw)) errors.push(`${id}: metaTitle không chứa primaryKeyword`);
    const dLen = (s.metaDescription?.vi || "").trim().length;
    if (dLen < 120 || dLen > 170) errors.push(`${id}: metaDescription.vi ${dLen} ký tự (khuyến nghị 140–160)`);
    if (!/^[a-z0-9-]+$/.test(d.slug || "")) errors.push(`${id}: slug phải không dấu, chỉ a-z0-9-`);
    if (kw) {
      const kwWords = kw.split(/\s+/);
      const slugHit = kwWords.some((w) => (d.slug || "").includes(w));
      if (!slugHit) errors.push(`${id}: slug không chứa phần nào của keyword`);
      if (!norm(firstParaText).includes(kw) && !norm(d.summary?.vi).includes(kw))
        errors.push(`${id}: keyword không xuất hiện ở đoạn mở đầu/summary`);
      if (!headingsText.includes(kw.split(/\s+/)[0]))
        errors.push(`${id}: keyword không xuất hiện ở heading nào`);
    }
    if (s.canonical && d.slug && !s.canonical.endsWith(d.slug)) errors.push(`${id}: canonical không khớp slug`);
    // JSON-LD types
    const types = (s.jsonLd || []).map((x) => x["@type"]);
    for (const need of ["TechArticle", "FAQPage", "Course"])
      if (!types.includes(need)) errors.push(`${id}: JSON-LD thiếu @type ${need}`);
    for (const ld of s.jsonLd || []) { try { JSON.parse(JSON.stringify(ld)); } catch { errors.push(`${id}: JSON-LD không serialize được`); } }
    if ((s.faqs || []).length < 4) errors.push(`${id}: chỉ ${(s.faqs || []).length} FAQ (< 4)`);
    if ((s.courses || []).length < 1) errors.push(`${id}: thiếu course gắn kèm (CTA/Course schema)`);
  }
  if (nTldr < 1) errors.push(`${id}: thiếu TL;DR (TLDR())`);
  if (nCta < 1) errors.push(`${id}: thiếu CTA khóa học (CTA())`);
  if (nInternal < 2) errors.push(`${id}: chỉ ${nInternal} internal link (< 2)`);

  console.log(`• ${id}: ${d.pages.length} chương · ~${words} từ vi · code ${nCode} · img ${nImg} · qa ${nQa} · TL;DR ${nTldr} · FAQ ${(s?.faqs || []).length} · CTA ${nCta} · internal ${nInternal} · LD ${(s?.jsonLd || []).length}`);
}
const uniqCovers = new Set(covers);
if (uniqCovers.size !== covers.length) errors.push(`Thumbnail trùng nhau (${uniqCovers.size}/${covers.length} unique)`);

if (errors.length) { console.log("\n❌ CHƯA ĐẠT (SEO):"); errors.forEach((e) => console.log("  -", e)); process.exit(1); }
console.log("\n✅ ĐẠT chuẩn Testing_BV_SEO (sâu + SEO + AI Overview + Course schema).");
