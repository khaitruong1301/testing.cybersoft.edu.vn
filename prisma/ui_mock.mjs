// ui_mock.mjs — Thư viện dựng MOCKUP GIAO DIỆN độ chân thực cao (SVG) cho bài viết Tester.
// Mục tiêu: người đọc NHÌN như ảnh chụp thật của app/tool đang test để hình dung khi thực hành.
// Mỗi hàm trả về một CHUỖI SVG hoàn chỉnh (bọc bằng IMG(svg, capVi, capEn, capJa) trong bài).
// Viewer render inline SVG trong thẻ trắng bo góc, nên nền sáng/tối đều đẹp.
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const W = 760; // khớp cột đọc của viewer

// ── Khung CỬA SỔ TRÌNH DUYỆT (browser chrome): traffic lights + thanh URL ──
export function browser(url, inner, { h = 380, title = "", accent = "#1a72f5", chrome = "#e9edf3" } = {}) {
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="1" y="1" width="${W - 2}" height="46" rx="15" fill="${chrome}"/>
<rect x="1" y="30" width="${W - 2}" height="18" fill="${chrome}"/>
<circle cx="26" cy="24" r="6" fill="#ff5f57"/><circle cx="46" cy="24" r="6" fill="#febc2e"/><circle cx="66" cy="24" r="6" fill="#28c840"/>
<rect x="96" y="12" width="${W - 120}" height="24" rx="12" fill="#ffffff" stroke="#d5dae2"/>
<text x="114" y="28" font-size="12" fill="#64748b">🔒 ${esc(url)}</text>
${title ? `<text x="${W - 30}" y="28" text-anchor="end" font-size="11" font-weight="700" fill="${accent}">${esc(title)}</text>` : ""}
<g transform="translate(0,48)">${inner}</g></svg>`;
}

// ── Khung PANEL (thẻ ứng dụng/di động, không có URL) ──
export function panel(title, inner, { h = 340, accent = "#1a72f5", w = W } = {}) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${w}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${w}" height="40" rx="16" fill="${accent}"/><rect x="0" y="20" width="${w}" height="20" fill="${accent}"/>
<text x="20" y="26" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>
<g transform="translate(0,40)">${inner}</g></svg>`;
}

// ── Ô NHẬP có nhãn + trạng thái (normal/focus/error/disabled) ──
export function field(x, y, w, label, value, state = "normal") {
  const border = state === "error" ? "#ef4444" : state === "focus" ? "#1a72f5" : "#cbd5e1";
  const bg = state === "disabled" ? "#f1f5f9" : "#ffffff";
  const txt = value ? `<text x="${x + 12}" y="${y + 40}" font-size="13" fill="#0f172a">${esc(value)}</text>`
    : `<text x="${x + 12}" y="${y + 40}" font-size="13" fill="#94a3b8">…</text>`;
  const err = state === "error" ? `<text x="${x}" y="${y + 66}" font-size="11" fill="#ef4444">✗ không hợp lệ</text>` : "";
  return `<text x="${x}" y="${y + 12}" font-size="11" font-weight="700" fill="#475569">${esc(label)}</text>
<rect x="${x}" y="${y + 22}" width="${w}" height="30" rx="8" fill="${bg}" stroke="${border}" stroke-width="${state === "normal" || state === "disabled" ? 1 : 2}"/>${txt}${err}`;
}

// ── NÚT ──
export function btn(x, y, w, label, kind = "primary") {
  const map = { primary: ["#1a72f5", "#ffffff"], ghost: ["#eef2f7", "#334155"], danger: ["#ef4444", "#ffffff"], success: ["#16a34a", "#ffffff"], disabled: ["#e2e8f0", "#94a3b8"] };
  const [bg, fg] = map[kind] || map.primary;
  return `<rect x="${x}" y="${y}" width="${w}" height="34" rx="9" fill="${bg}"/><text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="${fg}">${esc(label)}</text>`;
}

// ── Chú thích khoanh vùng lỗi (bug annotation): khung đỏ + nhãn ──
export function annotate(x, y, w, h, label) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>
<rect x="${x}" y="${y - 20}" width="${Math.max(60, label.length * 6.4 + 16)}" height="18" rx="9" fill="#ef4444"/>
<text x="${x + 8}" y="${y - 7}" font-size="11" font-weight="700" fill="#ffffff">${esc(label)}</text>`;
}

// ── BẢNG DỮ LIỆU (data grid) có header + tô dòng nổi bật ──
export function grid(title, headers, rows, { h, accent = "#1a72f5", highlight = -1, note = "" } = {}) {
  const colW = (W - 40) / headers.length;
  const rowH = 30, top = 92;
  const height = h || (top + rows.length * rowH + 30);
  const head = headers.map((hd, i) => `<text x="${24 + i * colW}" y="${top - 10}" font-size="11.5" font-weight="800" fill="#334155">${esc(hd)}</text>`).join("");
  const body = rows.map((r, ri) => {
    const y = top + ri * rowH;
    const hl = ri === highlight;
    const bgc = hl ? "#fef2f2" : ri % 2 ? "#f8fafc" : "#ffffff";
    const cells = r.map((c, ci) => `<text x="${24 + ci * colW}" y="${y + 20}" font-size="12" fill="${hl && ci === r.length - 1 ? "#b91c1c" : "#334155"}" font-weight="${hl && ci === r.length - 1 ? 700 : 400}">${esc(c)}</text>`).join("");
    return `<rect x="12" y="${y}" width="${W - 24}" height="${rowH}" fill="${bgc}"/>${cells}`;
  }).join("");
  const noteEl = note ? `<text x="24" y="${height - 12}" font-size="11" fill="#64748b">${esc(note)}</text>` : "";
  return `<svg viewBox="0 0 ${W} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${height}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="46" rx="16" fill="${accent}"/><rect x="0" y="24" width="${W}" height="22" fill="${accent}"/>
<text x="24" y="29" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>
<line x1="12" y1="${top - 2}" x2="${W - 12}" y2="${top - 2}" stroke="#e2e8f0"/>
${head}${body}${noteEl}</svg>`;
}

// ── THẺ TICKET JIRA (nhìn như Jira thật): key, loại, tiêu đề, các field, mức độ ──
export function jira({ key = "BUG-000", title = "", type = "Bug", status = "Open", priority = "High", severity = "High", fields = [], color = "#de350b" }) {
  const rows = fields.slice(0, 6);
  const h = 150 + rows.length * 24;
  const fEls = rows.map((f, i) => `<text x="24" y="${150 + i * 24}" font-size="12" fill="#5e6c84" font-weight="700">${esc(f[0])}</text><text x="150" y="${150 + i * 24}" font-size="12" fill="#172b4d">${esc(f[1])}</text>`).join("");
  const pill = (x, txt, bg, fg) => `<rect x="${x}" y="108" width="${Math.max(52, txt.length * 7 + 16)}" height="22" rx="4" fill="${bg}"/><text x="${x + 8}" y="123" font-size="11" font-weight="800" fill="${fg}">${esc(txt)}</text>`;
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="12" fill="#ffffff" stroke="#dfe1e6"/>
<rect x="0" y="0" width="${W}" height="40" rx="12" fill="#f4f5f7"/><rect x="0" y="20" width="${W}" height="20" fill="#f4f5f7"/>
<rect x="16" y="12" width="16" height="16" rx="3" fill="${color}"/><text x="24" y="24" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">!</text>
<text x="42" y="25" font-size="12.5" font-weight="800" fill="#42526e">${esc(type)} · ${esc(key)}</text>
<text x="${W - 20}" y="25" text-anchor="end" font-size="11" font-weight="800" fill="#0052cc">JIRA</text>
<text x="24" y="70" font-size="15" font-weight="800" fill="#172b4d">${esc(title)}</text>
${pill(24, "STATUS: " + status, "#dfe1e6", "#42526e")}
${pill(190, "PRIORITY: " + priority, "#ffebe6", "#bf2600")}
${pill(360, "SEVERITY: " + severity, "#fff0b3", "#974f0c")}
${fEls}</svg>`;
}

// ── POSTMAN: request (method+url) + response (status/time) + body ──
export function postman({ method = "GET", url = "", status = 200, time = "120 ms", size = "1.2 KB", body = [], ok = true }) {
  const mcolor = { GET: "#0f9d58", POST: "#f9a825", PUT: "#2962ff", DELETE: "#d50000", PATCH: "#7b1fa2" }[method] || "#0f9d58";
  const scolor = ok ? "#0f9d58" : "#d50000";
  const bodyLines = body.slice(0, 9).map((l, i) => `<text x="24" y="${188 + i * 20}" font-size="12" font-family="Menlo,Consolas,monospace" fill="#c8d3e0">${esc(l)}</text>`).join("");
  const h = 176 + Math.min(body.length, 9) * 20 + 16;
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="38" rx="14" fill="#fff2ec"/><rect x="0" y="18" width="${W}" height="20" fill="#fff2ec"/>
<text x="20" y="24" font-size="13" font-weight="800" fill="#ff6c37">◭ Postman</text>
<rect x="16" y="50" width="${W - 32}" height="34" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
<rect x="24" y="57" width="62" height="20" rx="5" fill="${mcolor}"/><text x="55" y="71" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">${esc(method)}</text>
<text x="98" y="71" font-size="12.5" font-family="Menlo,Consolas,monospace" fill="#172b4d">${esc(url)}</text>
<rect x="${W - 92}" y="55" width="72" height="24" rx="6" fill="#1a72f5"/><text x="${W - 56}" y="71" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">Send</text>
<text x="24" y="108" font-size="11" font-weight="800" fill="#64748b">RESPONSE</text>
<circle cx="98" cy="104" r="5" fill="${scolor}"/><text x="110" y="108" font-size="12" font-weight="800" fill="${scolor}">${esc(status)}</text>
<text x="180" y="108" font-size="11" fill="#64748b">⏱ ${esc(time)}</text><text x="280" y="108" font-size="11" fill="#64748b">⬇ ${esc(size)}</text>
<rect x="16" y="120" width="${W - 32}" height="${h - 134}" rx="10" fill="#0f172a"/>
<text x="24" y="140" font-size="10.5" font-weight="700" fill="#64748b">Body · JSON</text>
${bodyLines}</svg>`;
}

// ── BẢNG KANBAN (defect board): các cột trạng thái + thẻ lỗi ──
export function kanban(title, columns, { accent = "#1a72f5" } = {}) {
  const colW = (W - 48) / columns.length;
  const maxCards = Math.max(...columns.map((c) => c.cards.length));
  const h = 130 + maxCards * 46;
  const cols = columns.map((col, ci) => {
    const x = 20 + ci * colW;
    const head = `<rect x="${x}" y="60" width="${colW - 12}" height="28" rx="7" fill="#eef2f7"/><text x="${x + 12}" y="79" font-size="12" font-weight="800" fill="#334155">${esc(col.name)} · ${col.cards.length}</text>`;
    const cards = col.cards.slice(0, 5).map((cd, i) => {
      const y = 96 + i * 46;
      const pc = { Critical: "#de350b", High: "#ff8b00", Medium: "#ffab00", Low: "#36b37e" }[cd.sev] || "#5e6c84";
      return `<rect x="${x}" y="${y}" width="${colW - 12}" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="${x}" y="${y}" width="4" height="40" rx="2" fill="${pc}"/>
<text x="${x + 12}" y="${y + 16}" font-size="10.5" font-weight="800" fill="#5e6c84">${esc(cd.key)}</text>
<text x="${x + 12}" y="${y + 31}" font-size="11" fill="#172b4d">${esc((cd.title || "").slice(0, Math.floor(colW / 6.5)))}</text>`;
    }).join("");
    return head + cards;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="46" rx="16" fill="${accent}"/><rect x="0" y="24" width="${W}" height="22" fill="${accent}"/>
<text x="24" y="29" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>${cols}</svg>`;
}

// ── SƠ ĐỒ CHUYỂN TRẠNG THÁI (state machine): nodes {id,label,x,y,kind} + edges {from,to,label,bad} ──
export function stateDiagram(title, nodes, edges, { accent = "#1a72f5", h = 340 } = {}) {
  const nk = { start: "#1a72f5", ok: "#16a34a", bad: "#ef4444", mid: "#334155" };
  const nmap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edgeEls = edges.map((e) => {
    const a = nmap[e.from], b = nmap[e.to];
    const col = e.bad ? "#ef4444" : "#94a3b8";
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dash = e.bad ? `stroke-dasharray="6 4"` : "";
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${col}" stroke-width="2" ${dash} marker-end="url(#ar)"/>
<rect x="${mx - e.label.length * 3.4 - 6}" y="${my - 10}" width="${e.label.length * 6.8 + 12}" height="18" rx="9" fill="#ffffff" stroke="${col}"/>
<text x="${mx}" y="${my + 3}" text-anchor="middle" font-size="10.5" fill="${e.bad ? "#b91c1c" : "#475569"}" font-weight="${e.bad ? 700 : 500}">${esc(e.label)}</text>`;
  }).join("");
  const nodeEls = nodes.map((n) => `<rect x="${n.x - 52}" y="${n.y - 18}" width="104" height="36" rx="18" fill="${nk[n.kind] || nk.mid}"/><text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${esc(n.label)}</text>`).join("");
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6z" fill="#94a3b8"/></marker></defs>
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="40" rx="16" fill="${accent}"/><rect x="0" y="20" width="${W}" height="20" fill="${accent}"/>
<text x="20" y="26" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>
${edgeEls}${nodeEls}</svg>`;
}

// ── DASHBOARD số liệu (metric cards) ──
export function dashboard(title, metrics, { accent = "#1a72f5" } = {}) {
  const cardW = (W - 20 - 12 * (metrics.length - 1)) / metrics.length;
  const cards = metrics.map((m, i) => {
    const x = 10 + i * (cardW + 12);
    return `<rect x="${x}" y="58" width="${cardW}" height="86" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="${x + 14}" y="82" font-size="11" font-weight="700" fill="#64748b">${esc(m.label)}</text>
<text x="${x + 14}" y="116" font-size="24" font-weight="900" fill="${m.color || accent}">${esc(m.value)}</text>
<text x="${x + 14}" y="134" font-size="10.5" fill="#94a3b8">${esc(m.sub || "")}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} 162" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="162" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="42" rx="16" fill="${accent}"/><rect x="0" y="22" width="${W}" height="20" fill="${accent}"/>
<text x="20" y="27" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>${cards}</svg>`;
}

// ── SƠ ĐỒ LUỒNG MODULE (integration): boxes + mũi tên dữ liệu ──
export function moduleFlow(title, boxes, arrows, { accent = "#1a72f5", h = 300 } = {}) {
  const bmap = Object.fromEntries(boxes.map((b) => [b.id, b]));
  const arr = arrows.map((a) => {
    const s = bmap[a.from], t = bmap[a.to];
    const col = a.bad ? "#ef4444" : "#1a72f5";
    const mx = (s.x + t.x) / 2, my = (s.y + t.y) / 2 - 6;
    return `<line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" stroke="${col}" stroke-width="2.5" ${a.bad ? 'stroke-dasharray="6 4"' : ""} marker-end="url(#mf)"/>
<rect x="${mx - a.label.length * 3.2 - 6}" y="${my - 9}" width="${a.label.length * 6.4 + 12}" height="17" rx="8" fill="#ffffff" stroke="${col}"/>
<text x="${mx}" y="${my + 3}" text-anchor="middle" font-size="10" fill="${a.bad ? "#b91c1c" : "#155ce1"}" font-weight="700">${esc(a.label)}</text>`;
  }).join("");
  const bx = boxes.map((b) => `<rect x="${b.x - 66}" y="${b.y - 26}" width="132" height="52" rx="12" fill="#eef4ff" stroke="#1a72f5"/><text x="${b.x}" y="${b.y - 2}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#155ce1">${esc(b.label)}</text>${b.sub ? `<text x="${b.x}" y="${b.y + 15}" text-anchor="middle" font-size="10" fill="#64748b">${esc(b.sub)}</text>` : ""}`).join("");
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<defs><marker id="mf" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6z" fill="#1a72f5"/></marker></defs>
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="40" rx="16" fill="${accent}"/><rect x="0" y="20" width="${W}" height="20" fill="${accent}"/>
<text x="20" y="26" font-size="14" font-weight="800" fill="#ffffff">${esc(title)}</text>
${arr}${bx}</svg>`;
}

// ── THẺ CHARTER (exploratory session sheet) ──
export function charter({ title = "", target = "", area = "", ideas = [], duration = "60'", accent = "#7c3aed" }) {
  const lines = ideas.slice(0, 5).map((it, i) => `<text x="30" y="${150 + i * 24}" font-size="12" fill="#334155">▸ ${esc(it)}</text>`).join("");
  const h = 150 + Math.min(ideas.length, 5) * 24 + 16;
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="42" rx="16" fill="${accent}"/><rect x="0" y="22" width="${W}" height="20" fill="${accent}"/>
<text x="20" y="27" font-size="14" font-weight="800" fill="#ffffff">🧭 Charter · ${esc(title)}</text>
<text x="24" y="66" font-size="11.5" font-weight="800" fill="#7c3aed">EXPLORE</text><text x="110" y="66" font-size="12.5" fill="#172b4d">${esc(target)}</text>
<text x="24" y="90" font-size="11.5" font-weight="800" fill="#7c3aed">AREA</text><text x="110" y="90" font-size="12.5" fill="#172b4d">${esc(area)}</text>
<text x="24" y="114" font-size="11.5" font-weight="800" fill="#7c3aed">TIMEBOX</text><text x="110" y="114" font-size="12.5" fill="#172b4d">${esc(duration)}</text>
<line x1="16" y1="126" x2="${W - 16}" y2="126" stroke="#eee"/>
<text x="24" y="140" font-size="10.5" font-weight="800" fill="#94a3b8">TEST IDEAS</text>
${lines}</svg>`;
}
