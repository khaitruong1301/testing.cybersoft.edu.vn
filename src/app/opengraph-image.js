import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CyberSoft Tester — Học Kiểm thử phần mềm / QA & AI Testing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg,#155ce1 0%,#1a72f5 45%,#184bb6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              background: "white",
              color: "#1a72f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            CS
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>CyberSoft Tester</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
          Học Kiểm thử phần mềm / QA thực chiến
        </div>
        <div style={{ fontSize: 34, marginTop: 24, color: "#dbeafe", maxWidth: 980 }}>
          Manual · Automation (Playwright, Selenium) · API · Performance · AI Testing · ISTQB
        </div>
      </div>
    ),
    { ...size }
  );
}
