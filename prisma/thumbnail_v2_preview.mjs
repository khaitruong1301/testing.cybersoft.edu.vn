// thumbnail.mjs v2 — thumbnail SVG 16/10 (viewBox 160x100) NHIỀU LỚP + NHIỀU BIẾN THỂ.
// Mỗi loại biểu tượng (motif) & mỗi ngành (domain scene) có nhiều biến thể; chọn theo id
// của bài => 2 bài cùng "AI" ra 2 icon khác; 2 bài cùng "banking" ra 2 cảnh khác.
// Lớp: (1) gradient theo domain, (2) DOMAIN SCENE dưới đáy (opacity 0.40), (3) MOTIF hero
// giữa, (4) TECH CHIPS góc phải, (5) scrim + nhãn. Trả về chuỗi SVG thô.

const D = "#0f172a";
const SCENE_OPACITY = 0.40;

const DOMAIN_PALETTE = {
  banking:   ["#0b1220", "#12315e", "#38bdf8"],
  fintech:   ["#06231f", "#0f766e", "#34d399"],
  insurance: ["#1e1b4b", "#3730a3", "#a5b4fc"],
  healthcare:["#062a33", "#0e7490", "#67e8f9"],
  ecommerce: ["#2e0a45", "#7c2d92", "#f0abfc"],
  retail:    ["#3a1206", "#c2410c", "#fdba74"],
  crm:       ["#0a2f2b", "#0f766e", "#5eead4"],
  erp:       ["#111827", "#374151", "#cbd5e1"],
  saas:      ["#082438", "#0369a1", "#7dd3fc"],
  logistics: ["#2a1605", "#a16207", "#fcd34d"],
  telecom:   ["#2e0733", "#a21caf", "#f5d0fe"],
  gov:       ["#0b1220", "#334155", "#94a3b8"],
  edtech:    ["#04241f", "#047857", "#6ee7b7"],
  default:   ["#0f172a", "#1e3a8a", "#93c5fd"],
};

// =============== phân loại chủ đề (giữ) ===============
export function classifyMotif(label, kind) {
  const s = " " + String(label || "").toUpperCase() + " ";
  const has = (...ks) => ks.some((k) => s.includes(k));
  if (has("PASSKEY", "WEBAUTHN", "SECURITY", "OAUTH", "LOGIN", " AUTH", "XSS", "PENTEST", "BẢO MẬT")) return "security";
  if (has("NETWORK", "WS MOCK", " MOCK", " HAR", "ROUTE", "INTERCEPT", "REQUEST", "MẠNG")) return "network";
  if (has("COMPONENT", " CT ", "REACT", "VUE", "SVELTE")) return "component";
  if (has("TRACE", "UI MODE", "DEBUG", "INSPECT", "REPORT", "VIEWER")) return "trace";
  if (has("ANTI-FLAKY", "FLAKY", "RETRY", "STABIL", "ỔN ĐỊNH")) return "flaky";
  if (has("PARALLEL", "SHARD", "RUNTIME", "SCALE", "PIPELINE")) return "parallel";
  if (has("PERF", "PERFORMANCE", "LOAD", " K6", "JMETER", "BENCH", "HIỆU NĂNG", "TẢI")) return "chart";
  if (has(" API", "REST", "GRAPHQL", "CONTRACT", "PACT", "POSTMAN", "ENDPOINT")) return "api";
  if (has("CODEGEN", " CLI", "SKILLS", "SCRIPT", " CODE")) return "cli";
  if (has("CHROME", "BROWSER", "WEBKIT", "FIREFOX", "EDGE", "SAFARI")) return "browser";
  if (has("APPIUM", "MOBILE", "DEVICE", "THIẾT BỊ", "RESPONSIVE")) return "device";
  if (has("STORAGE", "DATABASE", " DB ", " DATA", "FIXTURE", "DỮ LIỆU")) return "database";
  if (has("AGENT", "AI-NATIVE", " AI ", " MCP", " LLM", "CLAUDE", " GPT", "PROMPT")) return "ai";
  if (has("PHỎNG VẤN", "INTERVIEW")) return "qa";
  if (has("DOANH NGHIỆP", "ENTERPRISE", "BANKING", "NGÂN HÀNG", "THỰC CHIẾN", "FINTECH")) return "building";
  return { thucchien: "building", phongvan: "qa", nangcao: "chart", tichhop: "nodes", ai: "ai" }[kind] || "gear";
}

// =============== MOTIF hero — mỗi type có NHIỀU biến thể ===============
const MOTIFS = {
  ai: [
    (ac) => `<rect x="56" y="34" width="48" height="40" rx="11" fill="#fff"/><line x1="80" y1="24" x2="80" y2="34" stroke="#fff" stroke-width="3"/><circle cx="80" cy="21" r="4" fill="${ac}"/><circle cx="70" cy="52" r="5" fill="${ac}"/><circle cx="90" cy="52" r="5" fill="${ac}"/><rect x="70" y="63" width="20" height="4" rx="2" fill="${D}" opacity="0.3"/><rect x="47" y="46" width="6" height="16" rx="3" fill="#fff" opacity="0.6"/><rect x="107" y="46" width="6" height="16" rx="3" fill="#fff" opacity="0.6"/>`,
    (ac) => `<g stroke="#fff" stroke-width="1.5" opacity="0.5"><path d="M52 34 L80 42 M52 34 L80 58 M52 50 L80 42 M52 50 L80 58 M52 66 L80 42 M52 66 L80 58 M80 42 L108 50 M80 58 L108 50"/></g><g fill="${ac}"><circle cx="52" cy="34" r="5"/><circle cx="52" cy="50" r="5"/><circle cx="52" cy="66" r="5"/><circle cx="80" cy="42" r="5"/><circle cx="80" cy="58" r="5"/><circle cx="108" cy="50" r="6"/></g>`,
    (ac) => `<path d="M80 24 l6 20 20 6 -20 6 -6 20 -6 -20 -20 -6 20 -6 z" fill="#fff"/><circle cx="80" cy="50" r="5" fill="${ac}"/><circle cx="116" cy="30" r="3" fill="${ac}"/><circle cx="46" cy="70" r="3" fill="${ac}"/><circle cx="112" cy="72" r="2.5" fill="${ac}"/>`,
    (ac) => `<rect x="58" y="32" width="44" height="40" rx="9" fill="#fff"/><g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M80 40 q-11 0 -11 8 q-8 2 -6 11 q0 8 9 6"/><path d="M80 40 q11 0 11 8 q8 2 6 11 q0 8 -9 6"/></g><g stroke="#fff" stroke-width="2"><path d="M58 44 h-8 M58 60 h-8 M102 44 h8 M102 60 h8 M70 32 v-8 M90 32 v-8 M70 72 v8 M90 72 v8"/></g>`,
  ],
  chart: [
    (ac) => `<g fill="${ac}"><rect x="44" y="58" width="12" height="14" rx="2"/><rect x="62" y="48" width="12" height="24" rx="2"/><rect x="80" y="38" width="12" height="34" rx="2"/><rect x="98" y="28" width="12" height="44" rx="2"/></g><path d="M46 46 L112 24" stroke="#fff" stroke-width="2.5" opacity="0.8"/><path d="M104 22 l10 0 l0 10" stroke="#fff" stroke-width="2.5" fill="none"/>`,
    (ac) => `<path d="M42 70 L58 54 L74 62 L92 40 L116 48 L116 72 L42 72 Z" fill="${ac}" opacity="0.35"/><path d="M42 70 L58 54 L74 62 L92 40 L116 48" fill="none" stroke="#fff" stroke-width="2.5"/><g fill="#fff"><circle cx="58" cy="54" r="2.5"/><circle cx="92" cy="40" r="2.5"/></g>`,
    (ac) => `<circle cx="80" cy="50" r="21" fill="none" stroke="#fff" stroke-width="8" opacity="0.3"/><path d="M80 29 a21 21 0 0 1 18 32" fill="none" stroke="${ac}" stroke-width="8" stroke-linecap="round"/><text x="80" y="56" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">%</text>`,
  ],
  api: [
    (ac) => `<text x="40" y="68" font-size="48" font-weight="800" fill="${ac}" font-family="monospace">{</text><text x="104" y="68" font-size="48" font-weight="800" fill="${ac}" font-family="monospace">}</text><rect x="66" y="38" width="30" height="5" rx="2.5" fill="#fff"/><rect x="66" y="50" width="24" height="5" rx="2.5" fill="#fff" opacity="0.7"/><rect x="66" y="62" width="30" height="5" rx="2.5" fill="#fff" opacity="0.5"/>`,
    (ac) => `<rect x="48" y="42" width="26" height="16" rx="3" fill="#fff"/><rect x="44" y="46" width="4" height="3" fill="#fff"/><rect x="44" y="51" width="4" height="3" fill="#fff"/><path d="M74 50 h12" stroke="${ac}" stroke-width="3"/><rect x="86" y="42" width="26" height="16" rx="3" fill="${ac}"/><rect x="112" y="46" width="4" height="3" fill="${ac}"/><rect x="112" y="51" width="4" height="3" fill="${ac}"/>`,
    (ac) => `<g stroke="${ac}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M64 36 l-14 14 l14 14"/><path d="M96 36 l14 14 l-14 14"/></g><path d="M86 32 l-12 36" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`,
  ],
  security: [
    (ac) => `<path d="M80 24 l24 9 v16 c0 15 -10 26 -24 31 -14 -5 -24 -16 -24 -31 v-16 z" fill="#fff"/><circle cx="80" cy="47" r="7" fill="none" stroke="${ac}" stroke-width="3.5"/><path d="M80 54 v11" stroke="${ac}" stroke-width="3.5" stroke-linecap="round"/>`,
    (ac) => `<g fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M80 28 a21 23 0 0 1 21 23 v7"/><path d="M80 37 a13 15 0 0 1 13 15 v9"/><path d="M80 46 a6 8 0 0 1 6 8 v11"/><path d="M59 51 a21 23 0 0 1 9 -19"/><path d="M67 60 a13 15 0 0 1 5 -13"/></g>`,
    (ac) => `<circle cx="66" cy="44" r="13" fill="none" stroke="${ac}" stroke-width="5"/><circle cx="66" cy="44" r="4" fill="${ac}"/><path d="M75 53 L102 80 M94 72 l8 -8 M85 63 l7 7" stroke="${ac}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  ],
  database: [
    (ac) => `<ellipse cx="80" cy="34" rx="26" ry="9" fill="#fff"/><path d="M54 34 v32 a26 9 0 0 0 52 0 v-32 a26 9 0 0 1 -52 0" fill="#fff"/><path d="M54 50 a26 9 0 0 0 52 0" fill="none" stroke="${ac}" stroke-width="2.5"/><ellipse cx="80" cy="34" rx="26" ry="9" fill="none" stroke="${ac}" stroke-width="2.5"/>`,
    (ac) => `<g fill="#fff"><ellipse cx="80" cy="34" rx="24" ry="7"/><ellipse cx="80" cy="50" rx="24" ry="7"/><ellipse cx="80" cy="66" rx="24" ry="7"/></g><g fill="none" stroke="${ac}" stroke-width="2"><ellipse cx="80" cy="34" rx="24" ry="7"/><ellipse cx="80" cy="50" rx="24" ry="7"/><ellipse cx="80" cy="66" rx="24" ry="7"/></g>`,
    (ac) => `<rect x="52" y="30" width="56" height="42" rx="3" fill="#fff"/><rect x="52" y="30" width="56" height="11" rx="3" fill="${ac}"/><g stroke="${ac}" stroke-width="1.5" opacity="0.5"><path d="M52 52 h56 M52 62 h56 M71 41 v31 M90 41 v31"/></g>`,
  ],
  network: [
    (ac) => `<circle cx="52" cy="34" r="8" fill="${ac}"/><circle cx="52" cy="70" r="8" fill="${ac}"/><circle cx="110" cy="52" r="10" fill="${ac}"/><g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M59 38 L101 49 M59 66 L101 55"/></g><circle cx="86" cy="28" r="4" fill="#fff" opacity="0.85"/><path d="M56 34 L84 28" stroke="${ac}" stroke-width="1.5" stroke-dasharray="3 3"/>`,
    (ac) => `<circle cx="80" cy="50" r="23" fill="none" stroke="#fff" stroke-width="2.5"/><g fill="none" stroke="${ac}" stroke-width="2"><ellipse cx="80" cy="50" rx="10" ry="23"/><path d="M57 50 h46 M61 38 h38 M61 62 h38"/></g>`,
    (ac) => `<circle cx="80" cy="50" r="9" fill="${ac}"/><g fill="#fff"><circle cx="52" cy="34" r="5"/><circle cx="108" cy="34" r="5"/><circle cx="52" cy="66" r="5"/><circle cx="108" cy="66" r="5"/></g><g stroke="${ac}" stroke-width="2"><path d="M72 44 L56 36 M88 44 L104 36 M72 56 L56 64 M88 56 L104 64"/></g>`,
  ],
  building: [
    (ac) => `<rect x="40" y="28" width="40" height="44" rx="4" fill="#0b0f1a" stroke="${ac}"/><path d="M40 28 h40 v-6 l-20 -8 l-20 8 z" fill="${ac}"/><g stroke="${ac}" stroke-width="2.5"><path d="M48 42 v22 M60 42 v22 M72 42 v22"/></g><circle cx="116" cy="52" r="14" fill="#052e16"/><path d="M109 52 l5 5 9 -11" stroke="#34d399" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    (ac) => `<g fill="#fff"><rect x="50" y="40" width="18" height="34"/><rect x="72" y="28" width="18" height="46"/><rect x="94" y="46" width="18" height="28"/></g><g fill="${ac}"><rect x="54" y="44" width="3" height="3"/><rect x="61" y="44" width="3" height="3"/><rect x="54" y="52" width="3" height="3"/><rect x="61" y="52" width="3" height="3"/><rect x="76" y="33" width="3" height="3"/><rect x="83" y="33" width="3" height="3"/><rect x="76" y="42" width="3" height="3"/><rect x="83" y="42" width="3" height="3"/><rect x="76" y="51" width="3" height="3"/><rect x="83" y="51" width="3" height="3"/><rect x="98" y="50" width="3" height="3"/><rect x="105" y="50" width="3" height="3"/><rect x="98" y="58" width="3" height="3"/><rect x="105" y="58" width="3" height="3"/></g>`,
    (ac) => `<rect x="46" y="30" width="52" height="44" rx="3" fill="#fff"/><g fill="${ac}"><rect x="52" y="36" width="10" height="8"/><rect x="66" y="36" width="10" height="8"/><rect x="80" y="36" width="12" height="8"/><rect x="52" y="48" width="10" height="8"/><rect x="66" y="48" width="10" height="8"/><rect x="80" y="48" width="12" height="8"/></g><circle cx="114" cy="56" r="12" fill="#052e16"/><path d="M108 56 l4 4 8 -9" stroke="#34d399" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ],
  cli: [
    (ac) => `<rect x="40" y="28" width="80" height="48" rx="7" fill="#0b1020" stroke="${ac}"/><path d="M50 44 l11 8 -11 8" stroke="${ac}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="66" y="58" width="30" height="4" rx="2" fill="${ac}"/>`,
    (ac) => `<rect x="42" y="30" width="76" height="46" rx="6" fill="#0b1020" stroke="${ac}"/><g fill="${ac}"><rect x="52" y="40" width="20" height="3.5" rx="1.5"/><rect x="76" y="40" width="14" height="3.5" rx="1.5" opacity="0.6"/><rect x="58" y="49" width="26" height="3.5" rx="1.5" opacity="0.85"/><rect x="52" y="58" width="16" height="3.5" rx="1.5" opacity="0.6"/><rect x="72" y="58" width="22" height="3.5" rx="1.5"/></g>`,
  ],
  browser: [
    (ac) => `<rect x="40" y="26" width="80" height="52" rx="7" fill="#fff"/><rect x="40" y="26" width="80" height="13" rx="7" fill="${ac}"/><circle cx="49" cy="32.5" r="2" fill="#fff"/><circle cx="56" cy="32.5" r="2" fill="#fff"/><rect x="66" y="30" width="46" height="5" rx="2.5" fill="#fff" opacity="0.75"/><rect x="50" y="49" width="60" height="5" rx="2.5" fill="${D}" opacity="0.15"/><rect x="50" y="60" width="40" height="5" rx="2.5" fill="${D}" opacity="0.12"/>`,
    (ac) => `<rect x="42" y="30" width="76" height="46" rx="6" fill="#fff"/><g fill="${ac}"><rect x="42" y="30" width="26" height="12" rx="4"/><rect x="70" y="32" width="24" height="10" rx="4" opacity="0.45"/><rect x="96" y="32" width="18" height="10" rx="4" opacity="0.3"/></g><rect x="50" y="52" width="60" height="4" rx="2" fill="${D}" opacity="0.15"/><rect x="50" y="62" width="44" height="4" rx="2" fill="${D}" opacity="0.12"/>`,
  ],
  qa: [
    (ac) => `<rect x="46" y="26" width="42" height="30" rx="7" fill="${ac}"/><path d="M56 56 l0 9 10-9z" fill="${ac}"/><rect x="54" y="36" width="24" height="4" rx="2" fill="${D}" opacity="0.35"/><rect x="54" y="44" width="16" height="4" rx="2" fill="${D}" opacity="0.25"/><circle cx="104" cy="44" r="15" fill="none" stroke="${ac}" stroke-width="3"/><text x="104" y="50" text-anchor="middle" font-size="18" font-weight="800" fill="${ac}">?</text>`,
    (ac) => `<rect x="54" y="26" width="52" height="46" rx="5" fill="#fff"/><g stroke="${ac}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M61 40 l3 3 6 -7"/><path d="M61 55 l3 3 6 -7"/></g><g fill="${D}" opacity="0.25"><rect x="76" y="40" width="22" height="4" rx="2"/><rect x="76" y="54" width="22" height="4" rx="2"/></g>`,
  ],
  nodes: [
    (ac) => `<circle cx="52" cy="34" r="9" fill="${ac}"/><circle cx="52" cy="66" r="9" fill="${ac}"/><circle cx="104" cy="50" r="11" fill="${ac}"/><g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M60 38 L96 48 M60 62 L96 54"/></g><circle cx="128" cy="30" r="7" fill="${ac}" opacity="0.7"/><path d="M114 46 L122 34" stroke="${ac}" stroke-width="2" stroke-dasharray="3 3"/>`,
    (ac) => `<g fill="${ac}"><rect x="44" y="42" width="22" height="16" rx="3"/><rect x="96" y="26" width="22" height="16" rx="3"/><rect x="96" y="58" width="22" height="16" rx="3"/></g><g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M66 50 L96 34 M66 50 L96 66"/></g>`,
  ],
  flaky: [
    (ac) => `<path d="M80 26 l32 52 h-64 z" fill="${ac}"/><rect x="76.5" y="44" width="7" height="18" rx="3.5" fill="${D}"/><circle cx="80" cy="68" r="3.5" fill="${D}"/>`,
    (ac) => `<circle cx="80" cy="50" r="21" fill="none" stroke="${ac}" stroke-width="5" stroke-dasharray="17 9"/><path d="M99 40 l4 -6 -1 9 -8 -3 z" fill="${ac}"/><path d="M80 42 v10 l6 4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  ],
  parallel: [
    (ac) => `<g fill="none" stroke="${ac}" stroke-width="5" stroke-linecap="round"><path d="M44 40 h58"/><path d="M44 60 h58"/></g><path d="M98 32 l16 8 -16 8z" fill="${ac}"/><path d="M98 52 l16 8 -16 8z" fill="${ac}"/>`,
    (ac) => `<g fill="${ac}"><rect x="44" y="32" width="62" height="8" rx="4"/><rect x="44" y="46" width="50" height="8" rx="4" opacity="0.8"/><rect x="44" y="60" width="56" height="8" rx="4" opacity="0.6"/></g><g fill="#fff"><rect x="108" y="32" width="8" height="8" rx="2"/><rect x="96" y="46" width="8" height="8" rx="2"/><rect x="102" y="60" width="8" height="8" rx="2"/></g>`,
  ],
  component: [
    (ac) => `<rect x="44" y="28" width="30" height="30" rx="5" fill="${ac}"/><rect x="82" y="28" width="30" height="30" rx="5" fill="#fff"/><rect x="63" y="50" width="30" height="30" rx="5" fill="#fff" opacity="0.85"/><circle cx="78" cy="28" r="5" fill="${ac}"/>`,
    (ac) => `<path d="M50 32 h16 a5 5 0 0 1 10 0 h18 v16 a5 5 0 0 1 0 10 v16 h-44 v-16 a5 5 0 0 0 0 -10 z" fill="${ac}"/><rect x="60" y="46" width="20" height="20" rx="3" fill="#fff" opacity="0.35"/>`,
  ],
  trace: [
    (ac) => `<rect x="44" y="42" width="9" height="28" rx="2" fill="#fff"/><rect x="58" y="30" width="9" height="40" rx="2" fill="#fff"/><rect x="72" y="48" width="9" height="22" rx="2" fill="#fff"/><circle cx="104" cy="44" r="14" fill="none" stroke="${ac}" stroke-width="5"/><path d="M114 54 l10 10" stroke="${ac}" stroke-width="6" stroke-linecap="round"/>`,
    (ac) => `<g fill="${ac}"><rect x="44" y="32" width="42" height="7" rx="3.5"/><rect x="54" y="43" width="48" height="7" rx="3.5" opacity="0.85"/><rect x="64" y="54" width="40" height="7" rx="3.5" opacity="0.7"/><rect x="72" y="65" width="32" height="7" rx="3.5" opacity="0.55"/></g>`,
  ],
  device: [
    (ac) => `<rect x="42" y="28" width="54" height="40" rx="4" fill="#fff"/><rect x="60" y="70" width="22" height="3" rx="1.5" fill="#fff" opacity="0.6"/><rect x="100" y="40" width="18" height="32" rx="4" fill="${ac}"/><rect x="103" y="45" width="12" height="21" rx="1.5" fill="#fff"/>`,
    (ac) => `<rect x="64" y="24" width="32" height="52" rx="6" fill="#fff"/><rect x="68" y="31" width="24" height="36" fill="${ac}" opacity="0.45"/><circle cx="80" cy="71" r="2.5" fill="${ac}"/><rect x="74" y="27" width="12" height="2" rx="1" fill="${ac}" opacity="0.5"/>`,
  ],
  gear: [
    (ac) => `<circle cx="60" cy="50" r="16" fill="none" stroke="${ac}" stroke-width="6"/><circle cx="60" cy="50" r="5" fill="${ac}"/>${Array.from({ length: 8 }).map((_, i) => `<rect x="58" y="26" width="4" height="8" rx="1.5" fill="${ac}" transform="rotate(${i * 45} 60 50)"/>`).join("")}<g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M92 40 l-8 10 l8 10 M108 40 l8 10 l-8 10"/></g>`,
    (ac) => `<g fill="none" stroke="${ac}" stroke-width="5"><circle cx="66" cy="46" r="14"/><circle cx="100" cy="66" r="9"/></g><circle cx="66" cy="46" r="4" fill="${ac}"/><circle cx="100" cy="66" r="3" fill="${ac}"/>${Array.from({ length: 6 }).map((_, i) => `<rect x="64" y="28" width="4" height="7" rx="1.5" fill="${ac}" transform="rotate(${i * 60} 66 46)"/>`).join("")}`,
  ],
};

export function motif(type, ac, v = 0) {
  const arr = MOTIFS[type] || MOTIFS.gear;
  return arr[v % arr.length](ac);
}

// =============== DOMAIN SCENE — mỗi ngành NHIỀU biến thể ===============
const SCENES = {
  banking: [
    (T) => `<path d="M20 60 L80 42 L140 60 Z" fill="${T}"/><rect x="26" y="60" width="108" height="5" fill="${T}"/><g fill="${T}"><rect x="32" y="65" width="7" height="24"/><rect x="50" y="65" width="7" height="24"/><rect x="68" y="65" width="7" height="24"/><rect x="86" y="65" width="7" height="24"/><rect x="104" y="65" width="7" height="24"/><rect x="120" y="65" width="7" height="24"/></g><rect x="20" y="89" width="120" height="5" fill="${T}"/><text x="80" y="58" text-anchor="middle" font-size="12" font-weight="800" fill="${T}">$</text>`,
    (T) => `<rect x="52" y="52" width="56" height="40" rx="4" fill="none" stroke="${T}" stroke-width="3"/><circle cx="80" cy="72" r="12" fill="none" stroke="${T}" stroke-width="3"/><g stroke="${T}" stroke-width="2"><path d="M80 60 v-4 M80 84 v4 M68 72 h-4 M92 72 h4 M72 64 l-3 -3 M88 64 l3 -3 M72 80 l-3 3 M88 80 l3 3"/></g>`,
    (T) => `<rect x="40" y="56" width="46" height="30" rx="4" fill="${T}"/><rect x="40" y="63" width="46" height="7" fill="#0b0f1a" opacity="0.4"/><rect x="46" y="76" width="16" height="5" rx="2" fill="#0b0f1a" opacity="0.4"/><g fill="none" stroke="${T}" stroke-width="2.5"><ellipse cx="112" cy="82" rx="14" ry="4"/><ellipse cx="112" cy="74" rx="14" ry="4"/><ellipse cx="112" cy="66" rx="14" ry="4"/></g>`,
  ],
  fintech: [
    (T) => `<g stroke="${T}" stroke-width="3"><path d="M30 60 v26"/><path d="M46 52 v30"/><path d="M62 66 v20"/><path d="M110 48 v34"/><path d="M126 58 v26"/></g><g fill="${T}"><rect x="26" y="64" width="8" height="16"/><rect x="42" y="58" width="8" height="18"/><rect x="58" y="70" width="8" height="10"/><rect x="106" y="54" width="8" height="20"/><rect x="122" y="62" width="8" height="14"/></g><path d="M26 82 L52 72 L74 78 L100 60 L134 66" fill="none" stroke="${T}" stroke-width="2.5" stroke-linecap="round"/><circle cx="80" cy="82" r="8" fill="none" stroke="${T}" stroke-width="2.5"/><text x="80" y="86" text-anchor="middle" font-size="9" font-weight="800" fill="${T}">₫</text>`,
    (T) => `<rect x="40" y="58" width="40" height="28" rx="4" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M40 66 h40" stroke="${T}" stroke-width="2"/><circle cx="72" cy="72" r="3" fill="${T}"/><path d="M92 84 L104 70 L112 76 L128 56" fill="none" stroke="${T}" stroke-width="2.5" stroke-linecap="round"/><path d="M120 56 h8 v8" fill="none" stroke="${T}" stroke-width="2.5"/>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><ellipse cx="58" cy="84" rx="16" ry="5"/><ellipse cx="58" cy="76" rx="16" ry="5"/><ellipse cx="58" cy="68" rx="16" ry="5"/></g><path d="M94 84 L108 66 L120 78 L134 52" fill="none" stroke="${T}" stroke-width="2.5" stroke-linecap="round"/><path d="M126 52 h8 v8" fill="none" stroke="${T}" stroke-width="2.5"/>`,
  ],
  ecommerce: [
    (T) => `<path d="M30 60 h10 l6 22 h34 l6 -16 h-40" fill="none" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><circle cx="52" cy="88" r="3.5" fill="${T}"/><circle cx="76" cy="88" r="3.5" fill="${T}"/><path d="M96 66 h22 l3 22 h-28 z" fill="${T}"/><path d="M101 66 a6 6 0 0 1 12 0" fill="none" stroke="${T}" stroke-width="2.5"/><g transform="rotate(-18 132 62)"><rect x="122" y="54" width="20" height="14" rx="2" fill="${T}"/><circle cx="127" cy="59" r="2" fill="#0b0f1a"/></g>`,
    (T) => `<path d="M38 60 h64 l-4 -12 h-56 z" fill="${T}"/><rect x="40" y="60" width="60" height="28" fill="${T}"/><rect x="60" y="70" width="20" height="18" fill="#0b0f1a" opacity="0.5"/><path d="M110 64 h18 l3 22 h-24 z" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M115 64 a5 5 0 0 1 10 0" fill="none" stroke="${T}" stroke-width="2"/>`,
    (T) => `<rect x="34" y="58" width="42" height="27" rx="3" fill="${T}"/><rect x="34" y="64" width="42" height="6" fill="#0b0f1a" opacity="0.4"/><rect x="40" y="76" width="14" height="4" rx="2" fill="#0b0f1a" opacity="0.4"/><path d="M92 62 l18 -6 18 6 v18 l-18 6 -18 -6 z" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M92 62 l18 6 18 -6 M110 68 v18" stroke="${T}" stroke-width="2" fill="none"/>`,
  ],
  saas: [
    (T) => `<path d="M50 66 a10 10 0 0 1 20 -3 a12 12 0 0 1 22 3 a8 8 0 0 1 -2 15 h-38 a8 8 0 0 1 -2 -15z" fill="none" stroke="${T}" stroke-width="3"/><g fill="${T}"><rect x="104" y="78" width="26" height="4" rx="2"/><rect x="104" y="70" width="26" height="4" rx="2" opacity="0.7"/><rect x="104" y="62" width="26" height="4" rx="2" opacity="0.5"/></g>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><rect x="44" y="56" width="34" height="30" rx="3"/><path d="M44 66 h34 M44 76 h34"/></g><g fill="${T}"><circle cx="50" cy="61" r="1.5"/><circle cx="50" cy="71" r="1.5"/><circle cx="50" cy="81" r="1.5"/></g><g fill="none" stroke="${T}" stroke-width="2.5"><path d="M92 84 a18 18 0 1 1 26 0"/></g><path d="M105 84 l9 -13" stroke="${T}" stroke-width="2" fill="none"/>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><rect x="46" y="54" width="60" height="13" rx="2"/><rect x="54" y="72" width="60" height="13" rx="2"/></g><g fill="${T}"><rect x="50" y="59" width="10" height="4" rx="2"/><rect x="58" y="77" width="10" height="4" rx="2"/></g>`,
  ],
  insurance: [
    (T) => `<path d="M44 66 a26 26 0 0 1 52 0 z" fill="${T}"/><path d="M70 66 v18 a6 6 0 0 0 12 0" fill="none" stroke="${T}" stroke-width="3"/><g fill="${T}"><path d="M112 58 c4 6 6 9 6 13 a6 6 0 0 1 -12 0 c0 -4 2 -7 6 -13z"/></g><path d="M126 62 l14 5 v9 c0 8 -6 13 -14 16 -8 -3 -14 -8 -14 -16 v-9z" fill="none" stroke="${T}" stroke-width="2.5"/>`,
    (T) => `<path d="M80 50 l24 9 v15 c0 14 -10 24 -24 29 -14 -5 -24 -15 -24 -29 v-15 z" fill="none" stroke="${T}" stroke-width="3"/><path d="M80 74 c-4 -6 -13 -4 -13 3 c0 6 8 10 13 14 c5 -4 13 -8 13 -14 c0 -7 -9 -9 -13 -3z" fill="${T}"/>`,
  ],
  healthcare: [
    (T) => `<path d="M20 76 h34 l6 -16 l8 30 l7 -22 l6 8 h13" fill="none" stroke="${T}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="104" y="58" width="30" height="30" rx="5" fill="none" stroke="${T}" stroke-width="3"/><path d="M119 64 v18 M110 73 h18" stroke="${T}" stroke-width="4" stroke-linecap="round"/>`,
    (T) => `<g transform="rotate(35 58 72)"><rect x="40" y="64" width="36" height="16" rx="8" fill="none" stroke="${T}" stroke-width="3"/><path d="M58 64 v16" stroke="${T}" stroke-width="3"/></g><rect x="102" y="58" width="30" height="30" rx="5" fill="none" stroke="${T}" stroke-width="3"/><path d="M117 64 v18 M108 73 h18" stroke="${T}" stroke-width="4" stroke-linecap="round"/>`,
  ],
  telecom: [
    (T) => `<path d="M74 88 L80 52 L86 88 Z" fill="none" stroke="${T}" stroke-width="3"/><path d="M76 74 h8 M74 66 h12" stroke="${T}" stroke-width="2.5"/><g fill="none" stroke="${T}" stroke-width="2.5"><path d="M96 44 a20 20 0 0 1 0 28"/><path d="M104 38 a30 30 0 0 1 0 40"/><path d="M64 44 a20 20 0 0 0 0 28"/><path d="M56 38 a30 30 0 0 0 0 40"/></g><circle cx="80" cy="52" r="3" fill="${T}"/>`,
    (T) => `<rect x="50" y="56" width="24" height="34" rx="4" fill="none" stroke="${T}" stroke-width="2.5"/><rect x="54" y="61" width="16" height="20" fill="${T}" opacity="0.4"/><circle cx="62" cy="85" r="1.6" fill="${T}"/><g fill="${T}"><rect x="92" y="80" width="6" height="8"/><rect x="102" y="72" width="6" height="16"/><rect x="112" y="62" width="6" height="26"/><rect x="122" y="54" width="6" height="34"/></g>`,
  ],
  retail: [
    (T) => `<rect x="34" y="60" width="92" height="30" fill="${T}"/><path d="M30 60 h100 l-6 -12 h-88 z" fill="${T}"/><g fill="#0b0f1a" opacity="0.5"><rect x="38" y="48" width="8" height="12"/><rect x="54" y="48" width="8" height="12"/><rect x="70" y="48" width="8" height="12"/><rect x="86" y="48" width="8" height="12"/><rect x="102" y="48" width="8" height="12"/><rect x="118" y="48" width="8" height="12"/></g><rect x="72" y="70" width="16" height="20" fill="#0b0f1a" opacity="0.55"/><rect x="40" y="70" width="20" height="12" fill="#0b0f1a" opacity="0.35"/><rect x="100" y="70" width="20" height="12" fill="#0b0f1a" opacity="0.35"/>`,
    (T) => `<g transform="rotate(-20 60 66)"><rect x="44" y="56" width="30" height="20" rx="3" fill="${T}"/><circle cx="50" cy="62" r="2.5" fill="#0b0f1a"/></g><path d="M96 64 h34 l-4 24 h-26 z" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M104 64 a9 9 0 0 1 18 0" fill="none" stroke="${T}" stroke-width="2.5"/>`,
  ],
  logistics: [
    (T) => `<rect x="40" y="58" width="40" height="24" rx="2" fill="${T}"/><path d="M80 66 h16 l10 10 v6 h-26 z" fill="${T}"/><circle cx="52" cy="86" r="5" fill="none" stroke="${T}" stroke-width="3"/><circle cx="94" cy="86" r="5" fill="none" stroke="${T}" stroke-width="3"/><path d="M112 62 q10 0 10 10 t12 10" fill="none" stroke="${T}" stroke-width="2.5" stroke-dasharray="4 4"/><path d="M134 74 l0 10 M130 78 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" stroke="${T}" stroke-width="2.5" fill="none"/>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><rect x="46" y="64" width="24" height="22"/><rect x="74" y="64" width="24" height="22"/><rect x="60" y="42" width="24" height="22"/></g><path d="M118 58 a10 10 0 1 1 -20 0 a10 10 0 0 1 20 0 M108 68 v16" stroke="${T}" stroke-width="2.5" fill="none"/><circle cx="108" cy="58" r="3" fill="${T}"/>`,
  ],
  edtech: [
    (T) => `<path d="M50 58 L80 48 L110 58 L80 68 Z" fill="${T}"/><path d="M80 68 v10 M110 58 v14" stroke="${T}" stroke-width="2.5"/><circle cx="110" cy="74" r="2.5" fill="${T}"/><path d="M46 80 q20 -8 34 0 q14 -8 34 0 v10 q-20 -8 -34 0 q-14 -8 -34 0 z" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M80 80 v10" stroke="${T}" stroke-width="2"/>`,
    (T) => `<g transform="rotate(45 58 66)"><rect x="52" y="46" width="12" height="34" fill="${T}"/><path d="M52 80 l6 10 6 -10 z" fill="${T}"/></g><circle cx="112" cy="60" r="12" fill="none" stroke="${T}" stroke-width="2.5"/><path d="M106 70 h12 M108 76 h8" stroke="${T}" stroke-width="2.5"/><path d="M112 46 v-6 M126 60 h6 M98 60 h-6 M122 50 l4 -4 M102 50 l-4 -4" stroke="${T}" stroke-width="2"/>`,
  ],
  crm: [
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><circle cx="44" cy="64" r="7"/><path d="M34 82 a10 10 0 0 1 20 0"/><circle cx="80" cy="58" r="8"/><path d="M68 78 a12 12 0 0 1 24 0"/><circle cx="116" cy="64" r="7"/><path d="M106 82 a10 10 0 0 1 20 0"/><path d="M52 66 h20 M88 66 h20" stroke-dasharray="3 3"/></g>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><rect x="46" y="54" width="30" height="34" rx="3"/><circle cx="61" cy="66" r="6"/><path d="M52 84 a9 9 0 0 1 18 0"/></g><g fill="${T}"><rect x="86" y="58" width="26" height="4" rx="2"/><rect x="86" y="68" width="26" height="4" rx="2" opacity="0.7"/><rect x="86" y="78" width="18" height="4" rx="2" opacity="0.5"/></g>`,
  ],
  erp: [
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><rect x="45" y="49" width="18" height="18" rx="3"/><rect x="45" y="71" width="18" height="18" rx="3"/><rect x="71" y="49" width="18" height="18" rx="3"/><rect x="71" y="71" width="18" height="18" rx="3"/><rect x="97" y="49" width="18" height="18" rx="3"/><rect x="97" y="71" width="18" height="18" rx="3"/><path d="M54 67 v4 M80 67 v4 M106 67 v4 M63 58 h8 M89 58 h8 M63 80 h8 M89 80 h8"/></g>`,
    (T) => `<g fill="none" stroke="${T}" stroke-width="4"><circle cx="64" cy="60" r="15"/><circle cx="102" cy="78" r="10"/></g><circle cx="64" cy="60" r="4" fill="${T}"/><circle cx="102" cy="78" r="3" fill="${T}"/><path d="M64 60 L102 78" stroke="${T}" stroke-width="2" stroke-dasharray="3 3"/>`,
  ],
  gov: [
    (T) => `<path d="M62 56 a18 12 0 0 1 36 0 z" fill="${T}"/><rect x="78" y="44" width="4" height="12" fill="${T}"/><path d="M50 66 L80 58 L110 66 Z" fill="${T}"/><g fill="${T}"><rect x="54" y="66" width="6" height="22"/><rect x="68" y="66" width="6" height="22"/><rect x="80" y="66" width="6" height="22"/><rect x="92" y="66" width="6" height="22"/><rect x="106" y="66" width="6" height="22"/></g><rect x="46" y="88" width="68" height="4" fill="${T}"/>`,
  ],
  default: [
    (T) => `<g fill="none" stroke="${T}" stroke-width="2.5"><path d="M30 80 h24 v-12 h20 v16 h26"/><path d="M110 60 h20 v20"/></g><g fill="${T}"><circle cx="30" cy="80" r="3"/><circle cx="74" cy="68" r="3"/><circle cx="130" cy="80" r="3"/><circle cx="110" cy="60" r="3"/></g>`,
  ],
};

export function domainScene(domain, tint, v = 0) {
  const arr = SCENES[domain] || SCENES.default;
  return `<g opacity="${SCENE_OPACITY}">${arr[v % arr.length](tint)}</g>`;
}

// =============== TECH CHIPS ===============
const TECH_MAP = [
  [["PLAYWRIGHT", "PW"], "PW"], [["CYPRESS"], "CY"], [["SELENIUM"], "SE"],
  [["APPIUM", "MOBILE"], "APP"], [[" K6", "LOAD", "TẢI", "PERF", "HIỆU NĂNG"], "k6"],
  [["JMETER"], "JMX"], [["POSTMAN", " API", "REST", "CONTRACT", "PACT"], "API"],
  [["GRAPHQL"], "GQL"], [["CI", "PIPELINE", "GITHUB", "JENKINS"], "CI"],
  [["DOCKER", "K8S", "KUBER"], "K8s"], [["AI", "LLM", "AGENT", "MCP", "CLAUDE", "GPT", "PROMPT"], "AI"],
  [["SECURITY", "OWASP", "PENTEST", "BẢO MẬT", "XSS", "OAUTH"], "SEC"],
  [["SQL", "DATABASE", " DB ", "DỮ LIỆU", "ORACLE"], "SQL"],
  [["REACT", "COMPONENT", " CT "], "CT"], [["ALLURE", "REPORT", "TRACE"], "RPT"],
];
export function techFromLabel(label, kind) {
  const s = " " + String(label || "").toUpperCase() + " ";
  const out = [];
  for (const [keys, tag] of TECH_MAP) {
    if (keys.some((k) => s.includes(k)) && !out.includes(tag)) out.push(tag);
    if (out.length >= 3) break;
  }
  const fb = { thucchien: "E2E", phongvan: "Q&A", nangcao: "PRO", tichhop: "INT", ai: "AI", congnghe: "TECH" }[kind] || "QA";
  if (out.length === 0) out.push("QA", fb);
  if (out.length === 1 && out[0] !== fb) out.push(fb);
  return out.slice(0, 3);
}
function techChips(tags, ac) {
  return tags.map((t, i) => {
    const w = 8 + t.length * 5.4;
    const y = 8 + i * 13;
    const rx = 148 - w;
    return `<g transform="translate(${rx} ${y})"><rect width="${w}" height="10" rx="5" fill="#0b0f1a" opacity="0.55"/><rect width="${w}" height="10" rx="5" fill="none" stroke="${ac}" stroke-width="0.8" opacity="0.9"/><circle cx="5" cy="5" r="1.7" fill="${ac}"/><text x="${w/2+1.5}" y="7.4" text-anchor="middle" font-size="6" font-weight="800" fill="#e5eefc" font-family="Inter,Arial">${t}</text></g>`;
  }).join("");
}

function h32(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }

// =============== makeThumb v2 ===============
export function makeThumb({ id = "t", domain = "default", kind = "congnghe", label = "", tech = null }) {
  const pal = DOMAIN_PALETTE[domain] || DOMAIN_PALETTE.default;
  const seed = h32(id + "|" + kind + "|" + label + "|" + domain);
  const c0 = pal[0], c1 = pal[1], glow = pal[2], ac = pal[2], sceneTint = pal[2];
  const uid = "g" + seed.toString(36);
  const b1 = h32(id + "b1"), b2 = h32(id + "b2");
  const mv = h32(id + "|mv") ;                    // biến thể biểu tượng theo id
  const sv = h32(id + "|sv");                     // biến thể cảnh ngành theo id
  const chips = techChips(tech || techFromLabel(label, kind), ac);
  const domScene = domainScene(domain, sceneTint, sv);
  const heroType = classifyMotif(label, kind);
  return `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<defs>
<linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>
<radialGradient id="${uid}s" cx="0.5" cy="0.4" r="0.6"><stop offset="0" stop-color="${glow}" stop-opacity="0.30"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
<linearGradient id="${uid}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0.4" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.5"/></linearGradient>
<pattern id="${uid}d" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.05"/></pattern>
</defs>
<rect width="160" height="100" fill="url(#${uid})"/>
<rect width="160" height="100" fill="url(#${uid}d)"/>
<circle cx="${8 + (b1 % 34)}" cy="${6 + (b1 >> 5) % 24}" r="${30 + (b1 % 14)}" fill="#ffffff" opacity="0.05"/>
<circle cx="${120 + (b2 % 34)}" cy="${78 + (b2 >> 5) % 22}" r="${30 + (b2 % 16)}" fill="#000000" opacity="0.10"/>
<rect width="160" height="100" fill="url(#${uid}s)"/>
${domScene}
<g transform="translate(80 38) scale(1.05) translate(-80 -50)">${motif(heroType, ac, mv)}</g>
${chips}
<rect width="160" height="100" fill="url(#${uid}c)"/>
<rect x="12" y="84.5" width="16" height="3" rx="1.5" fill="${ac}"/>
<text x="12" y="93" font-size="10" font-weight="800" letter-spacing="0.3" fill="#ffffff">${label}</text>
</svg>`;
}
