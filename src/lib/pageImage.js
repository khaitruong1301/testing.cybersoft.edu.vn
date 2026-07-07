// Render an article page (array of content blocks) into an SVG "image" page,
// PDF-like. Used by /api/pageimg to serve view-only page images.

const W = 900;
const H = 1220;
const PAD = 70;
const CW = W - PAD * 2;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Greedy word-wrap. avgCharW ~ ratio of font size per character.
function wrap(text, fontSize, maxWidth, avgRatio = 0.54) {
  const maxChars = Math.max(6, Math.floor(maxWidth / (fontSize * avgRatio)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (let w of words) {
    // hard-break very long tokens
    while (w.length > maxChars) {
      if (line) { lines.push(line); line = ""; }
      lines.push(w.slice(0, maxChars));
      w = w.slice(maxChars);
    }
    const trial = line ? line + " " + w : w;
    if (trial.length > maxChars) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function renderPageSVG(blocks, opts = {}) {
  const { heading = "", index = 1, total = 1, title = "CyberSoft Tester" } = opts;
  let y = PAD + 46;
  const parts = [];

  const text = (x, yy, s, size, color, weight = "400", mono = false) =>
    `<text x="${x}" y="${yy}" font-family="${mono ? "'Courier New',monospace" : "Inter,Arial,sans-serif"}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;

  for (const b of Array.isArray(blocks) ? blocks : []) {
    if (!b) continue;
    if (y > H - PAD - 40) break; // avoid overflow
    if (b.t === "h") {
      y += 14;
      for (const ln of wrap(b.text, 30, CW, 0.56)) {
        parts.push(text(PAD, y, ln, 30, "#0f172a", "800"));
        y += 40;
      }
      y += 8;
    } else if (b.t === "p") {
      for (const ln of wrap(b.text, 19, CW)) {
        parts.push(text(PAD, y, ln, 19, "#334155"));
        y += 30;
      }
      y += 12;
    } else if (b.t === "ul") {
      for (const item of b.items || []) {
        const lines = wrap(item, 18, CW - 26);
        lines.forEach((ln, i) => {
          if (i === 0) parts.push(text(PAD, y, "•", 18, "#1a72f5", "700"));
          parts.push(text(PAD + 22, y, ln, 18, "#334155"));
          y += 28;
        });
        y += 4;
      }
      y += 8;
    } else if (b.t === "code") {
      const lines = String(b.text).split("\n").flatMap((l) => wrap(l, 15, CW - 30, 0.62));
      const boxH = lines.length * 22 + 24;
      parts.push(`<rect x="${PAD}" y="${y - 18}" width="${CW}" height="${boxH}" rx="10" fill="#0f172a"/>`);
      let cy = y + 4;
      for (const ln of lines) {
        parts.push(text(PAD + 16, cy, ln, 15, "#e2e8f0", "400", true));
        cy += 22;
      }
      y += boxH + 12;
    } else if (b.t === "note") {
      const lines = wrap(b.text, 17, CW - 34);
      const boxH = lines.length * 26 + 22;
      parts.push(`<rect x="${PAD}" y="${y - 18}" width="${CW}" height="${boxH}" rx="8" fill="#eff6ff"/>`);
      parts.push(`<rect x="${PAD}" y="${y - 18}" width="5" height="${boxH}" rx="2" fill="#2f90ff"/>`);
      let cy = y + 2;
      for (const ln of lines) {
        parts.push(text(PAD + 18, cy, ln, 17, "#1e40af", "500"));
        cy += 26;
      }
      y += boxH + 12;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#ffffff"/>
<rect x="0" y="0" width="${W}" height="8" fill="#1a72f5"/>
<text x="${PAD}" y="42" font-family="Inter,Arial" font-size="13" fill="#94a3b8" font-weight="600">${esc(title)}</text>
<text x="${W - PAD}" y="42" font-family="Inter,Arial" font-size="13" fill="#94a3b8" text-anchor="end">${esc(heading)}</text>
<line x1="${PAD}" y1="54" x2="${W - PAD}" y2="54" stroke="#e2e8f0" stroke-width="1"/>
${parts.join("\n")}
<line x1="${PAD}" y1="${H - 50}" x2="${W - PAD}" y2="${H - 50}" stroke="#e2e8f0" stroke-width="1"/>
<text x="${PAD}" y="${H - 28}" font-family="Inter,Arial" font-size="12" fill="#cbd5e1">© CyberSoft Tester — chỉ xem, không tải xuống</text>
<text x="${W - PAD}" y="${H - 28}" font-family="Inter,Arial" font-size="13" fill="#64748b" text-anchor="end" font-weight="700">${index} / ${total}</text>
</svg>`;
}
