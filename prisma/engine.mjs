// engine.mjs — bộ dựng block + trilingual + tag, KHỚP viewer CyberSoft Tester.
// Copy vào prisma/ (hoặc import) khi tạo module bài mới. Block types hợp lệ:
//   p, h, ul, code, note, tip, warn, img, scenario, qa.

export const pick = (o, l) => (o ? o[l] || o.en || o.vi : "");

// --- Block constructors (đối số ja tuỳ chọn; nếu bỏ trống -> fallback en) ---
export const P = (vi, en, ja) => ({ t: "p", vi, en, ja: ja ?? en });
export const H = (vi, en, ja) => ({ t: "h", vi, en, ja: ja ?? en });
export const UL = (vi, en, ja) => ({ t: "ul", vi, en, ja: ja ?? en });      // vi/en/ja là MẢNG chuỗi
export const CODE = (lang, code) => ({ t: "code", lang, code });             // code KHÔNG dịch
export const NOTE = (vi, en, ja) => ({ t: "note", vi, en, ja: ja ?? en });
export const TIP = (vi, en, ja) => ({ t: "tip", vi, en, ja: ja ?? en });
export const WARN = (vi, en, ja) => ({ t: "warn", vi, en, ja: ja ?? en });
export const IMG = (svg, capVi, capEn, capJa) => ({ t: "img", svg, cap: { vi: capVi, en: capEn, ja: capJa ?? capEn } });
export const SCEN = (tVi, tEn, bVi, bEn, tJa, bJa) => ({ t: "scenario", title: { vi: tVi, en: tEn, ja: tJa ?? tEn }, body: { vi: bVi, en: bEn, ja: bJa ?? bEn } });
export const QA = (qVi, qEn, aVi, aEn, qJa, aJa) => ({ t: "qa", q: { vi: qVi, en: qEn, ja: qJa ?? qEn }, a: { vi: aVi, en: aEn, ja: aJa ?? aEn } });

export function localize(b, l) {
  switch (b.t) {
    case "ul": return { t: "ul", items: b[l] || b.en || b.vi };
    case "code": return { t: "code", lang: b.lang, text: b.code };
    case "img": return { t: "img", svg: b.svg, cap: pick(b.cap, l) };
    case "scenario": return { t: "scenario", title: pick(b.title, l), text: pick(b.body, l) };
    case "qa": return { t: "qa", q: pick(b.q, l), a: pick(b.a, l) };
    default: return { t: b.t, text: pick(b, l) };
  }
}
export const L = (blocks, l) => blocks.map((b) => localize(b, l));

// pages: [{ heading:{vi,en,ja}, blocks:[...authored blocks] }]
export function buildDoc(pages) {
  return pages.map((p) => ({
    heading: { vi: p.heading.vi, en: p.heading.en, ja: p.heading.ja ?? p.heading.en },
    blocks: { vi: L(p.blocks, "vi"), en: L(p.blocks, "en"), ja: L(p.blocks, "ja") },
  }));
}

// --- Từ điển TAG (đủ 4 nhóm). Dùng TAG[key] để gắn tags cho bài. ---
export const TAG = {
  // kind (mỗi bài đúng 1) - hiển thị thành badge
  congnghe: { k: "congnghe", vi: "Chuyên công nghệ", en: "Technology", ja: "技術特化", g: "kind" },
  nangcao: { k: "nangcao", vi: "Chuyên nâng cao", en: "Advanced", ja: "応用", g: "kind" },
  phongvan: { k: "phongvan", vi: "Chuyên phỏng vấn", en: "Interview-focus", ja: "面接特化", g: "kind" },
  thucchien: { k: "thucchien", vi: "Thực chiến doanh nghiệp", en: "Enterprise real-world", ja: "実戦", g: "kind" },
  tichhop: { k: "tichhop", vi: "Tích hợp", en: "Integrated", ja: "統合", g: "kind" },
  // domain
  banking: { k: "banking", vi: "Ngân hàng", en: "Banking", ja: "銀行", g: "domain" },
  fintech: { k: "fintech", vi: "Fintech", en: "Fintech", ja: "フィンテック", g: "domain" },
  insurance: { k: "insurance", vi: "Bảo hiểm", en: "Insurance", ja: "保険", g: "domain" },
  healthcare: { k: "healthcare", vi: "Y tế", en: "Healthcare", ja: "医療", g: "domain" },
  ecommerce: { k: "ecommerce", vi: "TMĐT", en: "E-commerce", ja: "EC", g: "domain" },
  retail: { k: "retail", vi: "Bán lẻ", en: "Retail", ja: "小売", g: "domain" },
  crm: { k: "crm", vi: "CRM", en: "CRM", ja: "CRM", g: "domain" },
  erp: { k: "erp", vi: "ERP", en: "ERP", ja: "ERP", g: "domain" },
  saas: { k: "saas", vi: "Dịch vụ SaaS", en: "SaaS", ja: "SaaS", g: "domain" },
  logistics: { k: "logistics", vi: "Logistics", en: "Logistics", ja: "物流", g: "domain" },
  telecom: { k: "telecom", vi: "Viễn thông", en: "Telecom", ja: "通信", g: "domain" },
  gov: { k: "gov", vi: "Khu vực công", en: "Public sector", ja: "公共", g: "domain" },
  edtech: { k: "edtech", vi: "Giáo dục", en: "EdTech", ja: "教育", g: "domain" },
  // tech
  playwright: { k: "playwright", vi: "Playwright", en: "Playwright", ja: "Playwright", g: "tech" },
  selenium: { k: "selenium", vi: "Selenium", en: "Selenium", ja: "Selenium", g: "tech" },
  cypress: { k: "cypress", vi: "Cypress", en: "Cypress", ja: "Cypress", g: "tech" },
  appium: { k: "appium", vi: "Appium", en: "Appium", ja: "Appium", g: "tech" },
  postman: { k: "postman", vi: "Postman/API", en: "Postman/API", ja: "Postman/API", g: "tech" },
  k6: { k: "k6", vi: "k6/Perf", en: "k6/Perf", ja: "k6/性能", g: "tech" },
  jmeter: { k: "jmeter", vi: "JMeter", en: "JMeter", ja: "JMeter", g: "tech" },
  graphql: { k: "graphql", vi: "GraphQL", en: "GraphQL", ja: "GraphQL", g: "tech" },
  contract: { k: "contract", vi: "Contract/PACT", en: "Contract/PACT", ja: "契約テスト", g: "tech" },
  api: { k: "api", vi: "API", en: "API", ja: "API", g: "tech" },
  cicd: { k: "cicd", vi: "CI/CD", en: "CI/CD", ja: "CI/CD", g: "tech" },
  pom: { k: "pom", vi: "POM", en: "POM", ja: "POM", g: "tech" },
  mocking: { k: "mocking", vi: "Mocking", en: "Mocking", ja: "モック", g: "tech" },
  datadriven: { k: "datadriven", vi: "Data-driven", en: "Data-driven", ja: "データ駆動", g: "tech" },
  visual: { k: "visual", vi: "Visual", en: "Visual", ja: "ビジュアル", g: "tech" },
  a11y: { k: "a11y", vi: "Accessibility", en: "Accessibility", ja: "アクセシビリティ", g: "tech" },
  security: { k: "security", vi: "Security", en: "Security", ja: "セキュリティ", g: "tech" },
  aitesting: { k: "aitesting", vi: "AI Agent", en: "AI Agent", ja: "AIエージェント", g: "tech" },
  trace: { k: "trace", vi: "Debug/Trace", en: "Debug/Trace", ja: "デバッグ", g: "tech" },
  // type
  foundation: { k: "foundation", vi: "Nền tảng", en: "Foundation", ja: "基礎", g: "type" },
  realworld: { k: "realworld", vi: "Thực tế", en: "Real-world", ja: "実務", g: "type" },
  interview: { k: "interview", vi: "Phỏng vấn", en: "Interview", ja: "面接", g: "type" },
  tip: { k: "tip", vi: "Tip", en: "Tip", ja: "コツ", g: "type" },
  experience: { k: "experience", vi: "Kinh nghiệm", en: "Experience", ja: "経験", g: "type" },
  advanced: { k: "advanced", vi: "Nâng cao", en: "Advanced", ja: "上級", g: "type" },
  seo: { k: "seo", vi: "Chuẩn SEO", en: "SEO-optimized", ja: "SEO最適化", g: "type" },
  beginner: { k: "beginner", vi: "Người mới", en: "Beginner", ja: "初心者", g: "type" },
};

export const tags = (...keys) => keys.map((k) => TAG[k]).filter(Boolean);
