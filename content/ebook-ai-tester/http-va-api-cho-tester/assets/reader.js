/* Trình đọc online — ebook / slide CyberSoft
   Trang tải theo nhu cầu từ pages/pNNN.dat (đã mã hoá). Hai chế độ: cuộn và lật trang. Hiệu ứng chạy khi trang hiển thị. */
(() => {
  "use strict";
  const KEY = new TextEncoder().encode(window.BOOK_KEY || "CyberSoft-AIE-2026");
  let W = 794, H = 1123; const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(3, "0");
  const store = { get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  let TOTAL = 0, TOC = [], cur = 1, mode = null, two = false, busy = false;
  const cache = new Map();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && store.get("aie-anim", "1") === "1") document.body.classList.add("anim");

  // ───────── dữ liệu ─────────
  function dec(b64) {
    const bin = atob(b64.trim()), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i) ^ KEY[i % KEY.length];
    return new TextDecoder().decode(u);
  }
  function getPage(n) {
    if (!cache.has(n)) cache.set(n, fetch(`pages/p${pad(n)}.dat`, { cache: "force-cache" }).then((r) => r.text()).then(dec));
    return cache.get(n);
  }
  const cssReady = new Promise((res) => {
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "assets/book.css?v=" + (window.AIE_V || "1");
    l.onload = res; l.onerror = res; document.head.appendChild(l);
  });

  // ───────── ô trang ─────────
  function mkSlot(n, w) {
    const s = document.createElement("div");
    s.className = "slot"; s.dataset.n = n; s.style.width = w + "px"; s.style.height = Math.round(w * H / W) + "px";
    s.innerHTML = `<div class="ld"><img src="thumbs/p${pad(n)}.webp" alt=""><span>Trang ${n}</span></div>`;
    return s;
  }
  async function fill(slot) {
    const n = +slot.dataset.n;
    if (slot.dataset.ok === "1" || !n) return slot;
    slot.dataset.ok = "1";
    const [html] = await Promise.all([getPage(n), cssReady]);
    if (slot.dataset.ok !== "1") return slot;
    slot.innerHTML = html;
    const pg = slot.firstElementChild;
    if (pg) { pg.style.transform = `scale(${(parseFloat(slot.style.width) || slot.clientWidth) / W})`; requestAnimationFrame(() => prep(pg)); }
    return slot;
  }
  function unfill(slot) {
    if (slot.dataset.ok !== "1") return;
    deact(slot.querySelector(".pg"));
    slot.dataset.ok = "0";
    const n = slot.dataset.n;
    slot.innerHTML = `<div class="ld"><img src="thumbs/p${pad(n)}.webp" alt=""><span>Trang ${n}</span></div>`;
  }
  function rescale(slot, w) {
    slot.style.width = w + "px"; slot.style.height = Math.round(w * H / W) + "px";
    const pg = slot.querySelector(".pg"); if (pg) pg.style.transform = `scale(${w / W})`;
  }

  // ───────── chuẩn bị hiệu ứng ─────────
  const REVEAL = [".hd", ".lead", ".card", ".mini", ".box", ".fn", ".fa", ".st", ".cyn", ".cyc", ".dg-n", ".dg-lab", ".b3", ".isl", ".l3-r", ".tw tbody tr",
    ".vsc", ".vsm", ".fx", ".stat", ".tag", ".msg", ".cl", ".jr3-s", ".lg3-i", ".cs3-t", ".cs3-p", ".cs3-l", ".zm-a", ".zm-b", ".opi", ".opw",
    ".tb-c", ".nm-r", ".da-c", ".c12-jd", ".c13-k", ".bdr", ".ml-c", ".ml-s", ".br", ".pnh", ".h2"];
  function prep(pg) {
    if (!pg || pg.dataset.prep) return;
    pg.dataset.prep = "1";
    let lab = 300;
    $$(".s3", pg).forEach((sc) => {
      const g = $$(".s3s", sc); g.forEach((e, i) => e.style.setProperty("--i", i));
      const L = g.length * 55 + 250; lab = Math.max(lab, L);
      sc.style.setProperty("--lab", L);
    });
    $$(".s3-ln, .dg-e", pg).forEach((p) => {
      try { p.style.setProperty("--len", Math.ceil(p.getTotalLength()) + 2); } catch {}
      if (p.getAttribute("stroke-dasharray")) p.classList.add("dash");
    });
    $$(".dg", pg).forEach((d) => d.style.setProperty("--lab", 200 + $$(".dg-n", d).length * 90));
    // xuất hiện lần lượt theo thứ tự trong trang (giới hạn độ trễ)
    let k = 0;
    $$(REVEAL.join(","), pg).forEach((el) => {
      if (el.closest(".s3")) return;
      el.classList.add("rv");
      el.style.setProperty("--d", Math.min(1800, 120 + k * (el.matches(".cl, .tw tbody tr, .ml-s") ? 25 : 70)));
      k++;
    });
    $$(".bt i", pg).forEach((e, i) => e.style.setProperty("--d", 300 + i * 120));
    pg.addEventListener("click", (e) => {
      const t = e.target.closest("[data-p]");
      if (t) { e.preventDefault(); jump(+t.dataset.p); }
    });
  }
  const loops = new WeakMap();
  function act(pg) {
    if (!pg || pg.classList.contains("on")) return;
    if (!pg.dataset.prep) { requestAnimationFrame(() => act(pg)); return; }
    pg.classList.add("on");
    if (!document.body.classList.contains("anim")) return;
    const timers = [];
    // hạt dữ liệu chạy dọc đường nối
    $$(".s3-ln, .dg-e", pg).forEach((p, i) => {
      const svg = p.ownerSVGElement; if (!svg) return;
      const len = +(p.style.getPropertyValue("--len") || 200), c = p.dataset.c || "#4C6FFF";
      const n = len > 260 ? 2 : 1;
      for (let j = 0; j < n; j++) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("r", "4"); dot.setAttribute("fill", c); dot.setAttribute("stroke", "#fff"); dot.setAttribute("stroke-width", "1.5");
        dot.setAttribute("class", "mv"); dot.style.color = c; dot.setAttribute("opacity", "0");
        const dur = Math.max(1.4, len / 110);
        const delay = (+(p.closest("[style*='--lab']")?.style.getPropertyValue("--lab")) || 500) / 1000 + 1 + j * dur / n;
        dot.innerHTML = `<animateMotion dur="${dur}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite" path="${p.getAttribute("d")}"/><set attributeName="opacity" to="1" begin="${delay.toFixed(2)}s"/>`;
        svg.appendChild(dot);
      }
      try { svg.setCurrentTime && svg.setCurrentTime(0); } catch {}
    });
    // chạy từng bước: sáng lần lượt từng bước của flow, danh sách bước, hành trình, vòng lặp, sơ đồ, chú giải
    const groups = [[".flow", ":scope > .fn"], [".steps", ":scope > .st"], [".jr3-row", ":scope > .jr3-s"], [".cycle", ":scope > .cyn"], [".dg", ":scope > .dg-n:not(.dg-ghost)"], [".lg3", ":scope > .lg3-i"]];
    groups.forEach(([gs, cs]) => $$(gs, pg).forEach((g) => {
      const items = $$(cs, g); if (items.length < 2) return;
      let i = -1;
      const start = setTimeout(() => {
        const tick = () => { items.forEach((x) => x.classList.remove("now")); i = (i + 1) % items.length; items[i].classList.add("now"); };
        tick(); timers.push(setInterval(tick, 1300));
      }, 1600 + Math.random() * 600);
      timers.push(start);
    }));
    // đếm số
    $$(".stat b, .sp-st b", pg).forEach((b) => {
      const m = b.textContent.match(/^([^\d]*)([\d.,]+)(.*)$/); if (!m) return;
      const target = parseFloat(m[2].replace(/\./g, "").replace(",", ".")); if (!isFinite(target) || target > 1e7) return;
      const dec = (m[2].split(",")[1] || "").length, t0 = performance.now(), D = 1200, orig = b.textContent;
      const step = (t) => {
        const q = Math.min(1, (t - t0) / D), v = target * (1 - Math.pow(1 - q, 3));
        b.textContent = m[1] + v.toLocaleString("vi-VN", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + m[3];
        if (q < 1 && pg.classList.contains("on")) requestAnimationFrame(step); else b.textContent = orig;
      };
      requestAnimationFrame(step);
    });
    loops.set(pg, timers);
  }
  function deact(pg) {
    if (!pg) return;
    pg.classList.remove("on");
    (loops.get(pg) || []).forEach((t) => { clearInterval(t); clearTimeout(t); });
    loops.delete(pg);
    $$(".mv", pg).forEach((d) => d.remove());
    $$(".now", pg).forEach((x) => x.classList.remove("now"));
  }
  function restart(pg) { if (!pg) return; deact(pg); void pg.offsetWidth; act(pg); }

  // ───────── chế độ cuộn ─────────
  const scroller = $("#scroller");
  let io1, io2, slots = [];
  function scrollW() { return Math.min(W * 1.15, scroller.clientWidth - (innerWidth < 700 ? 16 : 48)); }
  function buildScroll() {
    scroller.innerHTML = ""; const w = scrollW();
    slots = []; const frag = document.createDocumentFragment();
    for (let n = 1; n <= TOTAL; n++) { const s = mkSlot(n, w); slots.push(s); frag.appendChild(s); }
    scroller.appendChild(frag);
    io1 && io1.disconnect(); io2 && io2.disconnect();
    io1 = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) fill(e.target);
    }), { root: scroller, rootMargin: "1600px 0px" });
    io2 = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const pg = e.target.querySelector(".pg");
        if (e.isIntersecting && e.intersectionRatio > 0.35) {
          fill(e.target).then((s) => act(s.querySelector(".pg")));
          setCur(+e.target.dataset.n, false);
        } else if (!e.isIntersecting || e.intersectionRatio < 0.1) deact(pg);
      });
      // dọn trang ở xa để nhẹ máy
      slots.forEach((s) => { if (Math.abs(+s.dataset.n - cur) > 14) unfill(s); });
    }, { root: scroller, threshold: [0, 0.1, 0.35, 0.6] });
    slots.forEach((s) => { io1.observe(s); io2.observe(s); });
  }
  function scrollTo(n) { const s = slots[n - 1]; if (s) scroller.scrollTop = s.offsetTop - 16; }

  // ───────── chế độ lật trang ─────────
  const spread = $("#spread"), flipBox = $("#flip");
  function flipDims() {
    const vw = flipBox.clientWidth - 40, vh = flipBox.clientHeight - 36;
    two = vw > 1000 && vw / vh > 1.15;
    let h = vh, w = h * W / H;
    if (two && 2 * w > vw) { w = vw / 2; h = w * H / W; }
    if (!two && w > vw) { w = vw; h = w * H / W; }
    return Math.floor(w);
  }
  const pairOf = (n) => (two ? (n <= 1 ? [0, 1] : [n % 2 ? n - 1 : n, n % 2 ? n : n + 1]) : [n]);
  async function showSpread(n) {
    const w = flipDims(), pr = pairOf(n);
    $$(".pg", spread).forEach(deact);
    spread.innerHTML = ""; spread.className = two ? "two" : "one";
    for (const p of pr) {
      const s = mkSlot(p >= 1 && p <= TOTAL ? p : 0, w);
      if (!(p >= 1 && p <= TOTAL)) { s.innerHTML = ""; s.style.background = "transparent"; s.style.boxShadow = "none"; }
      spread.appendChild(s);
    }
    await Promise.all($$(".slot", spread).map((s) => +s.dataset.n ? fill(s) : s));
    $$(".pg", spread).forEach(act);
    // tải trước trang kế
    pr.forEach((p) => { if (p + 2 <= TOTAL) getPage(p + 2); if (p + 1 <= TOTAL) getPage(p + 1); if (p - 1 >= 1) getPage(p - 1); });
  }
  async function turn(dir) {
    if (busy) return;
    const pr = pairOf(cur), step = two ? 2 : 1;
    let target = dir > 0 ? Math.max(...pr) + 1 : Math.min(...pr.filter((x) => x >= 1)) - 1;
    if (two && dir < 0) target = Math.max(1, target);
    if (target < 1 || target > TOTAL) return;
    busy = true;
    const w = flipDims(), h = Math.round(w * H / W), np = pairOf(target);
    const leaf = document.createElement("div"); leaf.className = "leaf";
    leaf.style.width = w + "px"; leaf.style.height = h + "px";
    const face = async (p, cls) => {
      const f = document.createElement("div"); f.className = "face " + cls;
      if (p >= 1 && p <= TOTAL) { const s = mkSlot(p, w); f.appendChild(s); await fill(s); }
      return f;
    };
    let front, back;
    if (two) {
      if (dir > 0) { front = await face(pr[1], "front"); back = await face(np[0], "back"); leaf.style.left = w + "px"; leaf.style.transformOrigin = "0 50%"; }
      else { front = await face(pr[0], "front"); back = await face(np[1], "back"); leaf.style.left = "0px"; leaf.style.transformOrigin = "100% 50%"; }
    } else {
      if (dir > 0) { front = await face(cur, "front"); back = await face(0, "back"); leaf.style.left = "0px"; leaf.style.transformOrigin = "0 50%"; }
      else { front = await face(target, "front"); back = await face(0, "back"); leaf.style.left = "0px"; leaf.style.transformOrigin = "0 50%"; leaf.style.transform = "rotateY(-180deg)"; }
    }
    const shade = document.createElement("div"); shade.className = "shade";
    leaf.append(front, back, shade);
    // trang lộ ra phía dưới
    if (two) {
      const slotsNow = $$(".slot", spread), under = dir > 0 ? slotsNow[1] : slotsNow[0], up = dir > 0 ? np[1] : np[0];
      const ns = mkSlot(up >= 1 && up <= TOTAL ? up : 0, w);
      if (up >= 1 && up <= TOTAL) await fill(ns); else { ns.innerHTML = ""; ns.style.background = "transparent"; ns.style.boxShadow = "none"; }
      deact(under.querySelector(".pg")); under.replaceWith(ns);
    } else if (dir > 0) {
      const ns = mkSlot(target, w); await fill(ns);
      const old = $(".slot", spread); deact(old.querySelector(".pg")); old.replaceWith(ns);
    }
    spread.appendChild(leaf); void leaf.offsetWidth;
    requestAnimationFrame(() => {
      leaf.style.transform = two ? (dir > 0 ? "rotateY(-180deg)" : "rotateY(180deg)") : (dir > 0 ? "rotateY(-180deg)" : "rotateY(0deg)");
      shade.style.opacity = "1";
    });
    await new Promise((r) => setTimeout(r, 880));
    busy = false;
    setCur(target, false);
    await showSpread(target);
  }

  // ───────── điều hướng ─────────
  const pgIn = $("#pg");
  function setCur(n, move = true) {
    n = Math.max(1, Math.min(TOTAL, n | 0)); cur = n;
    pgIn.value = n; history.replaceState(null, "", "#p" + n);
    $$(".r-th.cur, .r-tc.cur, .r-ts.cur").forEach((e) => e.classList.remove("cur"));
    const th = $(`.r-th[data-p="${n}"]`); if (th) th.classList.add("cur");
    if (move) { if (mode === "scroll") scrollTo(n); else showSpread(n); }
  }
  function jump(n) { if (document.body.classList.contains("splash-on")) start(mode || store.get("aie-mode", "flip"), n); else setCur(n, true); if (innerWidth < 900) side(false); }
  function next(d) { if (mode === "flip") turn(d); else setCur(cur + d, true); }

  function start(m, n) {
    document.body.classList.remove("splash-on");
    $("#splash").hidden = true;
    setMode(m, n || cur);
  }
  function setMode(m, n) {
    mode = m; store.set("aie-mode", m);
    $$(".mode button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
    $$(".pg").forEach(deact);
    scroller.hidden = m !== "scroll"; flipBox.hidden = m !== "flip";
    if (m === "scroll") { spread.innerHTML = ""; buildScroll(); requestAnimationFrame(() => scrollTo(n)); setCur(n, false); }
    else { scroller.innerHTML = ""; slots = []; setCur(n, false); showSpread(n); }
  }

  // ───────── thanh bên ─────────
  function side(open, tab) {
    document.body.classList.toggle("side-open", open);
    if (tab) {
      $$(".tabs [data-t]").forEach((b) => b.classList.toggle("on", b.dataset.t === tab));
      $("#tocList").hidden = tab !== "toc"; $("#thumbGrid").hidden = tab !== "thumb";
      if (tab === "thumb") { const c = $(`.r-th[data-p="${cur}"]`); c && c.scrollIntoView({ block: "center" }); }
    }
  }
  function buildSide() {
    const tl = $("#tocList");
    tl.innerHTML = TOC.map((e) => e.k === "ch"
      ? `<div class="r-tc" data-p="${e.p}"><i>${e.n ? String(e.n).padStart(2, "0") : "•"}</i><span>${e.t}</span><em>${e.p}</em></div>`
      : `<div class="r-ts" data-p="${e.p}"><span>${e.t}</span><em>${e.p}</em></div>`).join("");
    const tg = $("#thumbGrid"); let h = "";
    for (let n = 1; n <= TOTAL; n++) h += `<div class="r-th" data-p="${n}"><img loading="lazy" src="thumbs/p${pad(n)}.webp" alt="Trang ${n}"><span>${n}</span></div>`;
    tg.innerHTML = h;
    [tl, tg].forEach((x) => x.addEventListener("click", (e) => { const t = e.target.closest("[data-p]"); if (t) jump(+t.dataset.p); }));
  }

  // ───────── chặn tải, chụp, in ─────────
  const shield = $("#shield");
  let shT;
  function hide(ms) { shield.hidden = false; clearTimeout(shT); if (ms) shT = setTimeout(() => (shield.hidden = true), ms); }
  function unhide() { clearTimeout(shT); shield.hidden = true; }
  ["contextmenu", "dragstart", "selectstart", "copy", "cut"].forEach((ev) => document.addEventListener(ev, (e) => { if (!e.target.closest("input")) e.preventDefault(); }));
  document.addEventListener("keydown", (e) => {
    const k = (e.key || "").toLowerCase(), mod = e.ctrlKey || e.metaKey;
    if (k === "printscreen") { e.preventDefault(); hide(2500); try { navigator.clipboard.writeText("Tài liệu chỉ đọc online tại " + location.host + location.pathname + ""); } catch {} return; }
    if ((e.metaKey && e.shiftKey) || (k === "meta" && e.shiftKey) || (k === "shift" && e.metaKey)) { hide(3000); }
    if (mod && ["s", "p", "u", "c", "a", "x", "o"].includes(k)) { e.preventDefault(); if (k === "p") hide(1500); return; }
    if (k === "f12" || (mod && e.shiftKey && ["i", "j", "c", "k"].includes(k))) { e.preventDefault(); return; }
    if (e.target.closest && e.target.closest("input")) return;
    if (document.body.classList.contains("splash-on")) return;
    if (["arrowright", "pagedown"].includes(k) || (k === " " && mode === "flip")) { e.preventDefault(); next(1); }
    else if (["arrowleft", "pageup"].includes(k)) { e.preventDefault(); next(-1); }
    else if (k === "home") setCur(1); else if (k === "end") setCur(TOTAL);
  }, true);
  document.addEventListener("keyup", (e) => { if ((e.key || "").toLowerCase() === "printscreen") { hide(2500); try { navigator.clipboard.writeText(""); } catch {} } });
  addEventListener("blur", () => hide());
  addEventListener("focus", unhide);
  document.addEventListener("visibilitychange", () => (document.hidden ? hide() : unhide()));
  addEventListener("beforeprint", () => { document.body.style.visibility = "hidden"; });
  addEventListener("afterprint", () => { document.body.style.visibility = ""; });
  try { window.print = () => hide(1500); } catch {}
  // watermark mờ (để truy vết nếu bị chụp bằng thiết bị khác)
  (() => {
    const c = document.createElement("canvas"); c.width = 420; c.height = 260; const x = c.getContext("2d");
    x.translate(210, 130); x.rotate(-0.42); x.font = "700 17px 'Be Vietnam Pro',Arial"; x.fillStyle = "#7A1E2C"; x.textAlign = "center";
    x.fillText("CyberSoft Academy · cybersoft.edu.vn", 0, -8); x.font = "600 13px Arial"; x.fillText("Chỉ đọc online · không sao chép", 0, 14);
    $("#wm").style.backgroundImage = `url(${c.toDataURL()})`;
  })();

  // ───────── gắn sự kiện ─────────
  $$("[data-go]").forEach((b) => b.addEventListener("click", () => start(b.dataset.go, 1)));
  $$(".sp-ch a").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); start(store.get("aie-mode", "flip"), +a.dataset.p); }));
  $$(".mode button").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.m, cur)));
  $("#bToc").addEventListener("click", () => side(!document.body.classList.contains("side-open") || $("#tocList").hidden, "toc"));
  $("#bThumb").addEventListener("click", () => side(!document.body.classList.contains("side-open") || $("#thumbGrid").hidden, "thumb"));
  $("#bClose").addEventListener("click", () => side(false));
  $$(".tabs [data-t]").forEach((b) => b.addEventListener("click", () => side(true, b.dataset.t)));
  $("#bPrev").addEventListener("click", () => next(-1));
  $("#bNext").addEventListener("click", () => next(1));
  $("#fzL").addEventListener("click", () => turn(-1));
  $("#fzR").addEventListener("click", () => turn(1));
  pgIn.addEventListener("change", () => setCur(+pgIn.value || 1));
  $("#bFull").addEventListener("click", () => { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); });
  $("#bAnim").addEventListener("click", (e) => {
    const on = !document.body.classList.contains("anim");
    document.body.classList.toggle("anim", on); e.currentTarget.classList.toggle("on", on); store.set("aie-anim", on ? "1" : "0");
    $$(".pg.on").forEach(restart);
  });
  $("#bAnim").classList.toggle("on", document.body.classList.contains("anim"));
  let tx = 0;
  flipBox.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  flipBox.addEventListener("touchend", (e) => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) turn(d < 0 ? 1 : -1); });
  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      if (mode === "scroll") { const w = scrollW(); slots.forEach((s) => rescale(s, w)); scrollTo(cur); }
      else if (mode === "flip") showSpread(cur);
    }, 200);
  });

  // ───────── khởi động ─────────
  fetch("toc.json", { cache: "no-cache" }).then((r) => r.json()).then((d) => {
    TOTAL = d.total; TOC = d.toc; if (d.w) { W = d.w; H = d.h; } $("#tot").textContent = "/ " + TOTAL;
    buildSide();
    const m = location.hash.match(/p(\d+)/);
    if (m) start(store.get("aie-mode", innerWidth < 900 ? "scroll" : "flip"), +m[1]);
  });
})();
