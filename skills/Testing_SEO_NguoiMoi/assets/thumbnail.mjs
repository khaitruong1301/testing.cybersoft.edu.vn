// thumbnail.mjs — sinh THUMBNAIL SVG 16/10 (viewBox 160x100) đặc trưng cho từng bài.
// Đổi màu theo DOMAIN + motif theo KIND để mỗi bài trông khác nhau (không nhàm).
// Trả về chuỗi SVG thô -> gán vào article.cover (viewer render full-bleed).
// SEO: thumbnail độc nhất/bài giúp Google Images + social share (OG) bắt mắt hơn.

const DOMAIN_PALETTE = {
  banking: ["#0b1220", "#12315e"], fintech: ["#0b1220", "#155e63"],
  insurance: ["#1e1b4b", "#3730a3"], healthcare: ["#083344", "#0e7490"],
  ecommerce: ["#3b0764", "#7c2d92"], retail: ["#7c2d12", "#c2410c"],
  crm: ["#134e4a", "#0f766e"], erp: ["#1f2937", "#374151"],
  saas: ["#0c4a6e", "#0369a1"], logistics: ["#422006", "#a16207"],
  telecom: ["#4a044e", "#a21caf"], gov: ["#0f172a", "#334155"],
  edtech: ["#052e2b", "#047857"], default: ["#0f172a", "#1e3a8a"],
};

function motif(kind, ac) {
  switch (kind) {
    case "phongvan":
      return `<rect x="46" y="26" width="42" height="30" rx="7" fill="${ac}"/><path d="M56 56 l0 9 10-9z" fill="${ac}"/>
<rect x="54" y="36" width="24" height="4" rx="2" fill="#0f172a" opacity="0.35"/><rect x="54" y="44" width="16" height="4" rx="2" fill="#0f172a" opacity="0.25"/>
<circle cx="104" cy="44" r="15" fill="none" stroke="${ac}" stroke-width="3"/><text x="104" y="50" text-anchor="middle" font-size="18" font-weight="800" fill="${ac}">?</text>`;
    case "thucchien":
      return `<rect x="40" y="28" width="40" height="44" rx="4" fill="#0b0f1a" stroke="${ac}"/><path d="M40 28 h40 v-6 l-20 -8 l-20 8 z" fill="${ac}"/>
<g stroke="${ac}" stroke-width="2.5"><path d="M48 42 v22 M60 42 v22 M72 42 v22"/></g>
<circle cx="116" cy="52" r="14" fill="#052e16"/><path d="M109 52 l5 5 9 -11" stroke="#34d399" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "tichhop":
      return `<circle cx="52" cy="34" r="9" fill="${ac}"/><circle cx="52" cy="66" r="9" fill="${ac}"/><circle cx="104" cy="50" r="11" fill="${ac}"/>
<g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M60 38 L96 48 M60 62 L96 54"/></g>
<circle cx="128" cy="30" r="7" fill="${ac}" opacity="0.7"/><path d="M114 46 L122 34" stroke="${ac}" stroke-width="2" stroke-dasharray="3 3"/>`;
    case "nangcao":
      return `<g fill="${ac}"><rect x="44" y="58" width="12" height="14" rx="2"/><rect x="62" y="48" width="12" height="24" rx="2"/><rect x="80" y="38" width="12" height="34" rx="2"/><rect x="98" y="28" width="12" height="44" rx="2"/></g>
<path d="M46 46 L112 24" stroke="#fff" stroke-width="2.5" opacity="0.7"/><path d="M104 22 l10 0 l0 10" stroke="#fff" stroke-width="2.5" fill="none"/>`;
    case "beginner": // hạt mầm / sách mở — bài người mới
      return `<path d="M50 66 q30 -20 60 0" fill="none" stroke="${ac}" stroke-width="3"/><path d="M80 66 v-24" stroke="${ac}" stroke-width="3"/>
<path d="M80 44 q-14 -2 -18 -16 q16 0 18 16z" fill="${ac}"/><path d="M80 50 q14 -2 18 -14 q-16 -1 -18 14z" fill="${ac}" opacity="0.8"/>
<circle cx="80" cy="40" r="4" fill="#fde68a"/>`;
    default: // congnghe: bánh răng + code
      return `<circle cx="60" cy="50" r="16" fill="none" stroke="${ac}" stroke-width="6"/><circle cx="60" cy="50" r="5" fill="${ac}"/>
${Array.from({ length: 8 }).map((_, i) => `<rect x="58" y="26" width="4" height="8" rx="1.5" fill="${ac}" transform="rotate(${i * 45} 60 50)"/>`).join("")}
<g stroke="${ac}" stroke-width="2.5" fill="none"><path d="M92 40 l-8 10 l8 10 M108 40 l8 10 l-8 10"/></g>`;
  }
}

export function makeThumb({ id = "t", domain = "default", kind = "congnghe", label = "" }) {
  const [c0, c1] = DOMAIN_PALETTE[domain] || DOMAIN_PALETTE.default;
  const ac = "#7dd3fc";
  return `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
<rect width="160" height="100" fill="url(#${id})"/>
<circle cx="24" cy="20" r="30" fill="#ffffff" opacity="0.07"/><circle cx="140" cy="88" r="34" fill="#ffffff" opacity="0.07"/>
${motif(kind, ac)}
<text x="12" y="93" font-size="9" font-weight="800" fill="#f1f5f9" opacity="0.95">${label}</text>
</svg>`;
}
