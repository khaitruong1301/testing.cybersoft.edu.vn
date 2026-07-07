"use client";
import { useState } from "react";
// Article thumbnail: renders a REAL cover image (URL/data URI) or an inline SVG
// cover full-bleed; falls back to a generated illustration only if none/loads-fail.

// ---- Category-ish color themes (by keyword) ----
const THEMES = {
  blue: ["#1e6ff5", "#3b93ff"],
  indigo: ["#4f46e5", "#6366f1"],
  violet: ["#7c3aed", "#a855f7"],
  teal: ["#0d9488", "#14b8a6"],
  cyan: ["#0891b2", "#06b6d4"],
  emerald: ["#059669", "#10b981"],
  orange: ["#ea580c", "#f97316"],
  amber: ["#d97706", "#f59e0b"],
  sky: ["#0284c7", "#0ea5e9"],
  rose: ["#e11d48", "#f43f5e"],
  slate: ["#334155", "#475569"],
};

// Map a topic type -> theme color
const TYPE_THEME = {
  testcase: "blue", bug: "rose", api: "orange", automation: "indigo",
  performance: "amber", ai: "violet", accessibility: "cyan", devices: "sky",
  exploratory: "teal", security: "slate", interview: "emerald", certificate: "amber",
  cv: "sky", tools: "indigo", data: "teal", doc: "blue",
};

const RULES = [
  ["bug", ["bug", "lỗi", "defect", "báo cáo", "report", "khiếm khuyết"]],
  ["testcase", ["test case", "testcase", "kịch bản", "checklist", "test plan", "kế hoạch", "thiết kế test", "boundary", "equivalence", "decision table", "phân vùng"]],
  ["api", ["api", "postman", "endpoint", "request", "rest", "json", "http", "backend", "schema"]],
  ["performance", ["performance", "hiệu năng", "load", "tải", "jmeter", "k6", "tốc độ", "stress", "throughput"]],
  ["ai", ["ai ", " ai", "claude", "chatgpt", "gpt", "agent", "trí tuệ", "machine", "ml", "llm", "prompt"]],
  ["accessibility", ["accessibility", "a11y", "truy cập", "khuyết tật", "wcag"]],
  ["devices", ["trình duyệt", "browser", "thiết bị", "device", "mobile", "responsive", "tương thích", "cross", "đa trình"]],
  ["exploratory", ["exploratory", "khám phá", "charter", "sbtm", "phiên"]],
  ["security", ["security", "bảo mật", "penetration", "pentest", "xss", "injection"]],
  ["interview", ["phỏng vấn", "interview", "mock", "tuyển dụng"]],
  ["certificate", ["istqb", "chứng chỉ", "certificate", "foundation", "advanced"]],
  ["cv", ["cv", "resume", "hồ sơ", "ats", "portfolio"]],
  ["automation", ["automation", "tự động", "playwright", "selenium", "cypress", "script", "ci", "pipeline", "framework", "pom", "page object"]],
  ["data", ["data-driven", "dữ liệu", "data driven", "bảng dữ liệu", "fixture"]],
  ["tools", ["công cụ", "tool", "cấu hình", "config", "cài đặt", "setup", "môi trường"]],
];

function classify(text = "", emoji = "") {
  const s = (" " + text + " ").toLowerCase();
  for (const [type, kws] of RULES) if (kws.some((k) => s.includes(k))) return type;
  // fall back on emoji hints
  const e = emoji || "";
  if (/🐛|🐞/.test(e)) return "bug";
  if (/🎭|⚙️|🧰|🔧/.test(e)) return "automation";
  if (/🤖|🧠|🕹️/.test(e)) return "ai";
  if (/🚀/.test(e)) return "performance";
  if (/🎤/.test(e)) return "interview";
  if (/🏅|🎖️/.test(e)) return "certificate";
  if (/📄|🧾/.test(e)) return "cv";
  return "doc";
}

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// White = "#fff", accent light = W2. Illustrations live in a 160x100 viewBox.
const W = "#ffffff";
const W2 = "rgba(255,255,255,0.55)";
const W3 = "rgba(255,255,255,0.22)";
const INK = "rgba(15,23,42,0.85)";

function Scene({ type, accent }) {
  switch (type) {
    case "testcase":
      return (
        <g>
          <rect x="52" y="20" width="56" height="64" rx="7" fill={W} />
          <rect x="60" y="14" width="40" height="12" rx="4" fill={W2} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="60" y={34 + i * 12} width="9" height="9" rx="2.5" fill={i < 3 ? accent : W3} />
              {i < 3 && <path d={`M62 ${38.5 + i * 12} l2 2 3.5-4`} stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="73" y={36 + i * 12} width={i % 2 ? 24 : 30} height="4.5" rx="2.25" fill="rgba(15,23,42,0.18)" />
            </g>
          ))}
        </g>
      );
    case "bug":
      return (
        <g>
          <ellipse cx="80" cy="54" rx="22" ry="24" fill={W} />
          <rect x="74" y="40" width="12" height="10" rx="5" fill={W} />
          <circle cx="76" cy="44" r="1.6" fill={INK} />
          <circle cx="84" cy="44" r="1.6" fill={INK} />
          <line x1="58" y1="46" x2="70" y2="52" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="66" x2="70" y2="60" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <line x1="102" y1="46" x2="90" y2="52" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <line x1="102" y1="66" x2="90" y2="60" stroke={W} strokeWidth="3" strokeLinecap="round" />
          <line x1="80" y1="42" x2="80" y2="76" stroke={accent} strokeWidth="2.4" strokeDasharray="3 3" />
          <circle cx="80" cy="54" r="3" fill={accent} />
          <circle cx="80" cy="64" r="2.4" fill={accent} />
          <circle cx="106" cy="30" r="9" fill={accent} />
          <path d="M106 26v5M106 34v0.5" stroke={W} strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "api":
      return (
        <g>
          <text x="46" y="62" fontSize="34" fontWeight="800" fill={W} fontFamily="monospace">{"{"}</text>
          <text x="104" y="62" fontSize="34" fontWeight="800" fill={W} fontFamily="monospace">{"}"}</text>
          <rect x="66" y="34" width="30" height="5" rx="2.5" fill={W} />
          <rect x="66" y="46" width="24" height="5" rx="2.5" fill={accent} />
          <rect x="66" y="58" width="30" height="5" rx="2.5" fill={W2} />
          <rect x="60" y="74" width="40" height="12" rx="6" fill={W} />
          <text x="80" y="83" fontSize="7.5" fontWeight="800" fill={INK} textAnchor="middle" fontFamily="monospace">200 OK</text>
        </g>
      );
    case "automation":
      return (
        <g>
          <rect x="42" y="22" width="76" height="56" rx="7" fill={W} />
          <rect x="42" y="22" width="76" height="13" rx="7" fill={W2} />
          <circle cx="50" cy="28.5" r="2" fill={accent} />
          <circle cx="57" cy="28.5" r="2" fill="rgba(15,23,42,0.25)" />
          <circle cx="64" cy="28.5" r="2" fill="rgba(15,23,42,0.25)" />
          <circle cx="80" cy="56" r="15" fill={accent} />
          <path d="M75 49l12 7-12 7z" fill={W} />
          <rect x="48" y="70" width="30" height="4" rx="2" fill="rgba(15,23,42,0.15)" />
        </g>
      );
    case "performance":
      return (
        <g>
          <path d="M52 68a28 28 0 0 1 56 0" fill="none" stroke={W} strokeWidth="7" strokeLinecap="round" />
          <path d="M52 68a28 28 0 0 1 8-19" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" />
          <circle cx="80" cy="68" r="5" fill={W} />
          <line x1="80" y1="68" x2="97" y2="50" stroke={W} strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="60" cy="49" r="2.4" fill={W2} />
          <circle cx="80" cy="41" r="2.4" fill={W2} />
          <circle cx="100" cy="49" r="2.4" fill={W2} />
        </g>
      );
    case "ai":
      return (
        <g>
          <rect x="56" y="34" width="48" height="40" rx="10" fill={W} />
          <line x1="80" y1="24" x2="80" y2="34" stroke={W} strokeWidth="3" />
          <circle cx="80" cy="21" r="4" fill={accent} />
          <circle cx="70" cy="52" r="5" fill={accent} />
          <circle cx="90" cy="52" r="5" fill={accent} />
          <circle cx="70" cy="52" r="1.8" fill={W} />
          <circle cx="90" cy="52" r="1.8" fill={W} />
          <rect x="70" y="63" width="20" height="4" rx="2" fill="rgba(15,23,42,0.2)" />
          <rect x="47" y="46" width="6" height="16" rx="3" fill={W2} />
          <rect x="107" y="46" width="6" height="16" rx="3" fill={W2} />
        </g>
      );
    case "accessibility":
      return (
        <g>
          <circle cx="80" cy="50" r="26" fill="none" stroke={W} strokeWidth="3.5" />
          <circle cx="80" cy="38" r="4.5" fill={W} />
          <path d="M64 46h32" stroke={W} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M80 46v13M80 59l-8 12M80 59l8 12" stroke={W} strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="80" cy="50" r="10" fill="none" stroke={accent} strokeWidth="2.4" />
        </g>
      );
    case "devices":
      return (
        <g>
          <rect x="44" y="26" width="58" height="42" rx="5" fill={W} />
          <rect x="49" y="31" width="48" height="30" rx="2" fill={W3} />
          <rect x="60" y="70" width="26" height="4" rx="2" fill={W2} />
          <rect x="98" y="44" width="20" height="34" rx="4" fill={accent} />
          <rect x="101" y="49" width="14" height="22" rx="1.5" fill={W} />
          <circle cx="108" cy="74" r="1.6" fill={W} />
        </g>
      );
    case "exploratory":
      return (
        <g>
          <circle cx="80" cy="52" r="26" fill={W} />
          <circle cx="80" cy="52" r="26" fill="none" stroke={W2} strokeWidth="1" />
          <path d="M80 34l6 22-22 6z" fill={accent} />
          <path d="M80 70l-6-22 22-6z" fill="rgba(15,23,42,0.25)" />
          <circle cx="80" cy="52" r="3" fill={W} />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1="80" y1="52" x2={80 + 24 * Math.cos((a * Math.PI) / 180)} y2={52 + 24 * Math.sin((a * Math.PI) / 180)} stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
          ))}
        </g>
      );
    case "security":
      return (
        <g>
          <path d="M80 24l24 9v16c0 15-10 26-24 31-14-5-24-16-24-31V33z" fill={W} />
          <path d="M80 30l18 7v13c0 11-7 19-18 23-11-4-18-12-18-23V37z" fill="none" stroke={W3} strokeWidth="1.5" />
          <path d="M72 51l6 6 12-13" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "interview":
      return (
        <g>
          <rect x="46" y="28" width="42" height="30" rx="7" fill={W} />
          <path d="M56 58l0 9 10-9z" fill={W} />
          <rect x="54" y="37" width="26" height="4" rx="2" fill="rgba(15,23,42,0.2)" />
          <rect x="54" y="45" width="18" height="4" rx="2" fill="rgba(15,23,42,0.14)" />
          <rect x="92" y="40" width="12" height="24" rx="6" fill={accent} />
          <path d="M88 60a10 10 0 0 0 20 0" fill="none" stroke={accent} strokeWidth="2.6" />
          <line x1="98" y1="70" x2="98" y2="78" stroke={accent} strokeWidth="2.6" />
          <line x1="92" y1="78" x2="104" y2="78" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
        </g>
      );
    case "certificate":
      return (
        <g>
          <rect x="48" y="24" width="64" height="44" rx="5" fill={W} />
          <rect x="55" y="32" width="34" height="4" rx="2" fill="rgba(15,23,42,0.18)" />
          <rect x="55" y="41" width="50" height="3.5" rx="1.75" fill="rgba(15,23,42,0.1)" />
          <rect x="55" y="49" width="42" height="3.5" rx="1.75" fill="rgba(15,23,42,0.1)" />
          <circle cx="98" cy="70" r="12" fill={accent} />
          <path d="M98 64l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill={W} />
          <path d="M92 80l-3 12 9-5 9 5-3-12" fill={accent} />
        </g>
      );
    case "cv":
      return (
        <g>
          <rect x="54" y="20" width="52" height="64" rx="6" fill={W} />
          <circle cx="70" cy="36" r="8" fill={accent} />
          <rect x="84" y="30" width="16" height="4" rx="2" fill="rgba(15,23,42,0.2)" />
          <rect x="84" y="38" width="12" height="3.5" rx="1.75" fill="rgba(15,23,42,0.12)" />
          <rect x="62" y="52" width="36" height="3.5" rx="1.75" fill="rgba(15,23,42,0.12)" />
          <rect x="62" y="60" width="36" height="3.5" rx="1.75" fill="rgba(15,23,42,0.12)" />
          <rect x="62" y="68" width="24" height="3.5" rx="1.75" fill="rgba(15,23,42,0.12)" />
        </g>
      );
    case "tools":
      return (
        <g>
          <circle cx="76" cy="50" r="18" fill="none" stroke={W} strokeWidth="7" />
          <circle cx="76" cy="50" r="6" fill={W} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return <rect key={i} x={74} y={26} width="4" height="8" rx="1.5" fill={W} transform={`rotate(${i * 45} 76 50)`} />;
          })}
          <path d="M96 66l14 14" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          <circle cx="94" cy="64" r="5" fill={accent} />
        </g>
      );
    case "data":
      return (
        <g>
          <rect x="50" y="26" width="60" height="48" rx="5" fill={W} />
          <rect x="50" y="26" width="60" height="12" rx="5" fill={accent} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <line x1="50" y1={50 + r * 10} x2="110" y2={50 + r * 10} stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
            </g>
          ))}
          <line x1="70" y1="38" x2="70" y2="74" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
          <line x1="90" y1="38" x2="90" y2="74" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
        </g>
      );
    default:
      return (
        <g>
          <rect x="54" y="20" width="52" height="64" rx="7" fill={W} />
          <path d="M92 20l14 14h-14z" fill={W2} />
          <rect x="62" y="44" width="36" height="4" rx="2" fill="rgba(15,23,42,0.16)" />
          <rect x="62" y="53" width="36" height="4" rx="2" fill="rgba(15,23,42,0.12)" />
          <rect x="62" y="62" width="24" height="4" rx="2" fill="rgba(15,23,42,0.12)" />
        </g>
      );
  }
}

export default function CoverArt({ seed = "", title = "", glyph = "📄", className = "", ratio = "16/10", rounded = "rounded-t-2xl" }) {
  const [imgErr, setImgErr] = useState(false);
  // If the article cover is a real image (URL / data URI) or an inline SVG, render
  // it full-bleed. Real photos represent the article; falls back to a generated
  // illustration only if there's no image or the image fails to load.
  if (typeof glyph === "string") {
    const g = glyph.trim();
    if (g.startsWith("<svg")) {
      return (
        <div
          className={`relative overflow-hidden ${rounded} ${className} [&>svg]:absolute [&>svg]:inset-0 [&>svg]:h-full [&>svg]:w-full`}
          style={{ aspectRatio: ratio }}
          dangerouslySetInnerHTML={{ __html: g }}
        />
      );
    }
    if ((g.startsWith("data:") || g.startsWith("http")) && !imgErr) {
      return (
        <div className={`relative overflow-hidden ${rounded} ${className} bg-slate-200`} style={{ aspectRatio: ratio }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={g}
            alt={title || ""}
            loading="lazy"
            onError={() => setImgErr(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      );
    }
  }

  const type = classify(title, glyph);
  // Màu suy từ hash → mỗi bài một tông màu riêng (không "na ná"); Scene theo type để đại diện nội dung.
  const h = hash(seed || title || glyph);
  const hue = h % 360;
  const hue2 = (hue + 26 + (h % 42)) % 360;
  const c0 = `hsl(${hue} 62% ${17 + (h % 8)}%)`;
  const c1 = `hsl(${hue2} 66% ${40 + ((h >> 3) % 12)}%)`;
  const gid = `cg${h % 100000}`;
  const accent = "rgba(255,255,255,0.9)";
  const dots = Array.from({ length: 4 }, (_, i) => {
    const hh = hash(gid + "d" + i);
    return { x: 8 + (hh % 148), y: 8 + ((hh >> 6) % 86), r: 1.5 + ((hh >> 12) % 4) };
  });

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={{ aspectRatio: ratio }}>
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c0} />
            <stop offset="100%" stopColor={c1} />
          </linearGradient>
          <radialGradient id={gid + "r"} cx="0.82" cy="0.12" r="0.9">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="160" height="100" fill={`url(#${gid})`} />
        <rect width="160" height="100" fill={`url(#${gid}r)`} />
        {/* soft motif + seeded dots (per-article variation) */}
        <circle cx="20" cy="20" r="26" fill="#ffffff" opacity="0.06" />
        <circle cx="140" cy="88" r="34" fill="#000000" opacity="0.06" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#ffffff" opacity="0.10" />
        ))}
        <Scene type={type} accent={accent} />
        {/* topic emoji badge */}
        {glyph && glyph.length <= 4 && (
          <g>
            <circle cx="20" cy="82" r="12" fill="rgba(255,255,255,0.9)" />
            <text x="20" y="86.5" fontSize="12" textAnchor="middle">{glyph}</text>
          </g>
        )}
      </svg>
    </div>
  );
}
