// CyberSoft brand lockup (gold cube + CYBERSOFT wordmark) as a self-contained
// inline SVG — renders correctly everywhere, scales crisply at any size.
// Size via className (height), e.g. "h-8 w-auto".
export default function BrandLogo({ className = "h-8 w-auto", withTagline = false }) {
  return (
    <svg viewBox={withTagline ? "0 0 328 112" : "0 0 328 92"} className={className} role="img" aria-label="CyberSoft">
      <defs>
        <linearGradient id="bl_lidTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFEDB0" /><stop offset="0.5" stopColor="#F6C736" /><stop offset="1" stopColor="#E7A417" />
        </linearGradient>
        <linearGradient id="bl_lidFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E9B12A" /><stop offset="1" stopColor="#C6890F" /></linearGradient>
        <linearGradient id="bl_lidSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D89A17" /><stop offset="1" stopColor="#A8720C" /></linearGradient>
        <linearGradient id="bl_baseTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6e4433" /><stop offset="1" stopColor="#40211c" /></linearGradient>
        <linearGradient id="bl_baseL" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stopColor="#F0C864" /><stop offset="1" stopColor="#8E6017" /></linearGradient>
        <linearGradient id="bl_baseR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7A3E36" /><stop offset="1" stopColor="#3A1E1B" /></linearGradient>
      </defs>

      {/* Isometric cube: floating gold lid over a gold/maroon box */}
      <g transform="translate(-10,3) scale(0.155)">
        {/* base box */}
        <polygon points="256,250 400,322 256,394 112,322" fill="url(#bl_baseTop)" />
        <polygon points="112,322 112,432 256,504 256,394" fill="url(#bl_baseL)" />
        <polygon points="400,322 400,432 256,504 256,394" fill="url(#bl_baseR)" />
        {/* glossy sweep on the maroon right face */}
        <polygon points="330,358 400,394 400,432 330,470" fill="#ffffff" opacity="0.06" />
        {/* floating lid (thin gold slab) */}
        <polygon points="112,128 112,150 256,222 256,200" fill="url(#bl_lidSide)" />
        <polygon points="400,128 400,150 256,222 256,200" fill="url(#bl_lidFront)" />
        <polygon points="256,56 400,128 256,200 112,128" fill="url(#bl_lidTop)" />
        <polygon points="256,72 372,130 256,188 140,130" fill="#ffffff" opacity="0.14" />
      </g>

      {/* Wordmark */}
      <text x="58" y="60" fontFamily="Inter, -apple-system, 'SF Pro Display', system-ui, sans-serif" fontSize="41" fontWeight="800" letterSpacing="-0.6" fill="#431814">CYBERSOFT</text>
      {withTagline && (
        <text x="59" y="94" fontFamily="Inter, system-ui, sans-serif" fontSize="12.2" fontWeight="700" letterSpacing="0.3" fill="#A9740F">ĐÀO TẠO CHUYÊN GIA LẬP TRÌNH, CÔNG NGHỆ &amp; AI</text>
      )}
    </svg>
  );
}
