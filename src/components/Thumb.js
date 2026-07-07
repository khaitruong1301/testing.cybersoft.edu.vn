"use client";
// Deterministic, eye-catching SVG cover generator.
// No external images needed: builds a premium gradient + motif from a seed,
// with the article's emoji/cover as the focal glyph.

const PALETTES = [
  ["#1a72f5", "#0ea5e9", "#38bdf8"], // brand blue
  ["#7c3aed", "#a855f7", "#c084fc"], // violet
  ["#0d9488", "#10b981", "#34d399"], // teal/emerald
  ["#ea580c", "#f97316", "#fb923c"], // orange
  ["#db2777", "#ec4899", "#f472b6"], // pink
  ["#4f46e5", "#6366f1", "#818cf8"], // indigo
  ["#0891b2", "#06b6d4", "#22d3ee"], // cyan
  ["#ca8a04", "#eab308", "#facc15"], // amber
];

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export default function Thumb({ seed = "", glyph = "📄", className = "", ratio = "16/10", rounded = "rounded-t-2xl" }) {
  const h = hash(seed || glyph);
  const [c0, c1, c2] = PALETTES[h % PALETTES.length];
  const gid = `g${h % 100000}`;
  const isEmoji = glyph && glyph.length <= 4;
  // Deterministic decorative dots
  const dots = Array.from({ length: 6 }, (_, i) => {
    const hh = hash(seed + "d" + i);
    return { x: 8 + (hh % 84), y: 8 + ((hh >> 3) % 84), r: 1.5 + ((hh >> 6) % 4) };
  });

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={{ aspectRatio: ratio }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c0} />
            <stop offset="55%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={gid + "r"} cx="0.8" cy="0.15" r="0.9">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gid})`} />
        <rect width="100" height="100" fill={`url(#${gid}r)`} />
        {/* soft geometric motif */}
        <circle cx="86" cy="80" r="26" fill="#ffffff" opacity="0.10" />
        <circle cx="14" cy="18" r="16" fill="#ffffff" opacity="0.08" />
        <path d="M-5 70 Q 30 55 55 72 T 105 70 V105 H-5 Z" fill="#ffffff" opacity="0.07" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#ffffff" opacity="0.14" />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {isEmoji ? (
          <span className="drop-shadow-[0_3px_10px_rgba(0,0,0,0.28)]" style={{ fontSize: "min(46px, 42%)", lineHeight: 1 }}>
            {glyph}
          </span>
        ) : (
          <img src={glyph} alt="" className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}
