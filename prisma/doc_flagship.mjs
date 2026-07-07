// ============================================================================
// FLAGSHIP — bài mẫu CHUẨN MỚI (sâu gấp 3–4 lần): thực chiến doanh nghiệp,
// tích hợp nhiều loại (công nghệ + nâng cao + thực chiến + phỏng vấn), có mục
// lục bài bản (viewer tự sinh từ heading chương), mô tả nghiệp vụ chi tiết,
// data model, test plan, ma trận ca, code, đối soát, AI agent, phỏng vấn.
// Song ngữ VI/EN (ja tạm fallback EN — sẽ dịch Nhật sau khi bạn duyệt format).
// Block types khớp viewer: p, h, ul, code, note, tip, warn, img, scenario, qa.
// ============================================================================

const pick = (o, l) => (o ? o[l] || o.en || o.vi : "");
const P = (vi, en, ja) => ({ t: "p", vi, en, ja: ja ?? en });
const H = (vi, en, ja) => ({ t: "h", vi, en, ja: ja ?? en });
const UL = (vi, en, ja) => ({ t: "ul", vi, en, ja: ja ?? en });
const CODE = (lang, code) => ({ t: "code", lang, code });
const NOTE = (vi, en, ja) => ({ t: "note", vi, en, ja: ja ?? en });
const TIP = (vi, en, ja) => ({ t: "tip", vi, en, ja: ja ?? en });
const WARN = (vi, en, ja) => ({ t: "warn", vi, en, ja: ja ?? en });
const IMG = (svg, capVi, capEn, capJa) => ({ t: "img", svg, cap: { vi: capVi, en: capEn, ja: capJa ?? capEn } });
const SCEN = (tVi, tEn, bVi, bEn) => ({ t: "scenario", title: { vi: tVi, en: tEn, ja: tEn }, body: { vi: bVi, en: bEn, ja: bEn } });
const QA = (qVi, qEn, aVi, aEn) => ({ t: "qa", q: { vi: qVi, en: qEn, ja: qEn }, a: { vi: aVi, en: aEn, ja: aEn } });

function localize(b, l) {
  switch (b.t) {
    case "ul": return { t: "ul", items: b[l] || b.en || b.vi };
    case "code": return { t: "code", lang: b.lang, text: b.code };
    case "img": return { t: "img", svg: b.svg, cap: pick(b.cap, l) };
    case "scenario": return { t: "scenario", title: pick(b.title, l), text: pick(b.body, l) };
    case "qa": return { t: "qa", q: pick(b.q, l), a: pick(b.a, l) };
    default: return { t: b.t, text: pick(b, l) };
  }
}
const L = (blocks, l) => blocks.map((b) => localize(b, l));
function buildDoc(pages) {
  return pages.map((p) => ({
    heading: { vi: p.heading.vi, en: p.heading.en, ja: p.heading.ja ?? p.heading.en },
    blocks: { vi: L(p.blocks, "vi"), en: L(p.blocks, "en"), ja: L(p.blocks, "ja") },
  }));
}

// ---- Tags (bao gồm nhóm "kind" = LOẠI bài, hiển thị thành badge) ----
const TAG = {
  thucchien: { k: "thucchien", vi: "Thực chiến doanh nghiệp", en: "Enterprise real-world", ja: "実戦", g: "kind" },
  banking: { k: "banking", vi: "Ngân hàng", en: "Banking", ja: "銀行", g: "domain" },
  fintech: { k: "fintech", vi: "Fintech", en: "Fintech", ja: "フィンテック", g: "domain" },
  interview: { k: "interview", vi: "Phỏng vấn", en: "Interview", ja: "面接", g: "type" },
  realworld: { k: "realworld", vi: "Thực tế", en: "Real-world", ja: "実務", g: "type" },
  playwright: { k: "playwright", vi: "Playwright", en: "Playwright", ja: "Playwright", g: "tech" },
  api: { k: "api", vi: "API", en: "API", ja: "API", g: "tech" },
  cicd: { k: "cicd", vi: "CI/CD", en: "CI/CD", ja: "CI/CD", g: "tech" },
  tichhop: { k: "tichhop", vi: "Tích hợp", en: "Integrated", ja: "統合", g: "tech" },
  aitesting: { k: "aitesting", vi: "AI Agent", en: "AI Agent", ja: "AIエージェント", g: "tech" },
};

// ============================================================================
// THUMBNAIL
// ============================================================================
const thumb = `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<defs><linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#052e2b"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs>
<rect width="160" height="100" fill="url(#fbg)"/>
<circle cx="26" cy="20" r="30" fill="#2dd4bf" opacity="0.14"/><circle cx="140" cy="88" r="34" fill="#5eead4" opacity="0.12"/>
<rect x="18" y="30" width="40" height="44" rx="4" fill="#083d38" stroke="#2dd4bf"/><path d="M18 30 h40 v-6 l-20 -8 l-20 8 z" fill="#0d9488"/>
<g stroke="#5eead4" stroke-width="2.5"><path d="M26 44 v22 M38 44 v22 M50 44 v22"/></g><rect x="16" y="70" width="44" height="5" rx="2" fill="#2dd4bf"/>
<circle cx="104" cy="34" r="11" fill="#083d38" stroke="#5eead4" stroke-width="1.5"/><text x="104" y="39" text-anchor="middle" font-size="12" font-weight="800" fill="#5eead4">₫</text>
<path d="M58 50 C 86 50 80 34 92 34" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="3 3"/>
<circle cx="126" cy="60" r="13" fill="#064e3b"/><path d="M119 60 l5 5 9 -11" stroke="#34d399" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="86" y="52" width="52" height="30" rx="4" fill="none"/>
<text x="14" y="93" font-size="9" font-weight="800" fill="#ccfbf1">実戦 · CORE BANKING E2E + 対帳</text>
</svg>`;

// ============================================================================
// SVG minh hoạ
// ============================================================================
const svgArch = `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="380" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc hệ thống chuyển khoản · Transfer system architecture</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="24" y="54" width="120" height="46" rx="9" fill="#1e293b"/><text x="84" y="74" fill="#93c5fd">Mobile App</text><text x="84" y="90" fill="#64748b" font-size="9.5">nhập lệnh + OTP</text>
<rect x="176" y="54" width="120" height="46" rx="9" fill="#1e293b"/><text x="236" y="74" fill="#93c5fd">API Gateway</text><text x="236" y="90" fill="#64748b" font-size="9.5">xác thực · rate limit</text>
<rect x="328" y="54" width="130" height="46" rx="9" fill="#1e3a2f"/><text x="393" y="74" fill="#86efac">Transfer Service</text><text x="393" y="90" fill="#64748b" font-size="9.5">orchestrate · idempotency</text>
<rect x="500" y="30" width="90" height="40" rx="9" fill="#3a2f1e"/><text x="545" y="54" fill="#fcd34d">Core / Ledger</text>
<rect x="500" y="86" width="90" height="40" rx="9" fill="#3a2f1e"/><text x="545" y="110" fill="#fcd34d">NAPAS Adapter</text>
<rect x="620" y="30" width="80" height="40" rx="9" fill="#1e293b"/><text x="660" y="54" fill="#c4b5fd">NAPAS</text>
<rect x="620" y="86" width="80" height="40" rx="9" fill="#1e293b"/><text x="660" y="110" fill="#c4b5fd">Bank B</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M144 77 H176" marker-end="url(#fa)"/><path d="M296 77 H328" marker-end="url(#fa)"/><path d="M458 68 C480 68 480 50 500 50" marker-end="url(#fa)"/><path d="M458 86 C480 86 480 106 500 106" marker-end="url(#fa)"/><path d="M590 50 H620" marker-end="url(#fa)"/><path d="M590 106 H620" marker-end="url(#fa)"/></g>
<defs><marker id="fa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<rect x="24" y="150" width="672" height="70" rx="10" fill="#111c30"/>
<text x="40" y="174" font-size="12.5" fill="#93c5fd" font-weight="700">Đồng bộ (sync): App → Gateway → Transfer → Core (trừ tiền + hold). Bất đồng bộ (async): NAPAS → Bank B → callback → ghi có / hoàn.</text>
<text x="40" y="196" font-size="12.5" fill="#64748b">Sync: debit + hold immediately. Async: NAPAS routing + Bank B callback → credit / refund. Notification & Reconstruction batch chạy nền.</text>
<rect x="24" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="40" y="260" font-size="12.5" font-weight="800" fill="#5eead4">Điểm khó kiểm thử · Hard-to-test</text>
<g font-size="11.5" fill="#cbd5e1"><text x="40" y="282">• Bất đồng bộ: callback đến muộn / không đến</text><text x="40" y="302">• Trạng thái trung gian (PENDING/HOLD)</text><text x="40" y="322">• Phụ thuộc NAPAS (bên thứ ba)</text><text x="40" y="342">• Đối soát lệch cuối ngày</text></g>
<rect x="370" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="386" y="260" font-size="12.5" font-weight="800" fill="#fca5a5">Chiến lược · Strategy</text>
<g font-size="11.5" fill="#cbd5e1"><text x="386" y="282">• Seed số dư & mock NAPAS qua API</text><text x="386" y="302">• Chờ theo callback/điều kiện, không sleep</text><text x="386" y="322">• Assert số dư + trạng thái + bút toán</text><text x="386" y="342">• Test đối soát như một luồng riêng</text></g>
</svg>`;

const svgLedger = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#f8fafc"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#0f172a">Sổ cái ghi kép · Double-entry ledger cho 1 lệnh chuyển 5.000.000đ (phí 11.000đ)</text>
<g font-size="12">
<rect x="24" y="46" width="672" height="30" fill="#0f172a"/>
<text x="40" y="66" fill="#fff" font-weight="800">Bút toán (entry)</text><text x="330" y="66" fill="#fff" font-weight="800">Nợ (Debit)</text><text x="480" y="66" fill="#fff" font-weight="800">Có (Credit)</text><text x="600" y="66" fill="#fff" font-weight="800">Tài khoản</text>
<g fill="#334155" font-weight="600">
<rect x="24" y="76" width="672" height="26" fill="#eef2f7"/><text x="40" y="94">Trừ tiền người gửi</text><text x="330" y="94">5.011.000</text><text x="480" y="94">—</text><text x="600" y="94">TK A</text>
<text x="40" y="120">Treo chờ NAPAS (hold)</text><text x="330" y="120">—</text><text x="480" y="120">5.000.000</text><text x="600" y="120">TK trung gian</text>
<rect x="24" y="128" width="672" height="26" fill="#eef2f7"/><text x="40" y="146">Thu phí</text><text x="330" y="146">—</text><text x="480" y="146">11.000</text><text x="600" y="146">TK phí</text>
<text x="40" y="172">Ghi có người nhận (sau callback)</text><text x="330" y="172">5.000.000</text><text x="480" y="172">5.000.000</text><text x="600" y="172">Trung gian→B</text>
</g></g>
<rect x="24" y="196" width="672" height="30" rx="6" fill="#dcfce7"/><text x="40" y="216" font-size="13" font-weight="800" fill="#166534">Bất biến: TỔNG Nợ = TỔNG Có ở mọi thời điểm · sum(Debit) = sum(Credit). Tiền không tự sinh/mất.</text>
<text x="24" y="250" font-size="12.5" fill="#475569">Nếu callback là REJECT: sinh bút toán ĐẢO (reverse) để hoàn 5.000.000đ về TK A và giải phóng hold. Trạng thái cuối = REFUNDED.</text>
<text x="24" y="274" font-size="12.5" fill="#7c3aed" font-weight="700">Mỗi bút toán là một điểm assert; test tài chính phải kiểm cả SỐ DƯ lẫn BÚT TOÁN, không chỉ thông báo "thành công".</text>
</svg>`;

const svgMatrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Ma trận ca kiểm thử · Transfer test matrix (trích)</text>
<g font-size="11.5">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="34" y="63" fill="#fff" font-weight="800">Nhóm</text><text x="150" y="63" fill="#fff" font-weight="800">Điều kiện</text><text x="440" y="63" fill="#fff" font-weight="800">Kết quả mong đợi</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="24" fill="#ede9fe"/><text x="34" y="88" fill="#16a34a">Happy</text><text x="150" y="88">Đủ số dư · trong hạn mức · OTP đúng</text><text x="440" y="88">SUCCESS · A−5.011.000 · B+5.000.000</text>
<text x="34" y="112" fill="#d97706">Boundary</text><text x="150" y="112">Chuyển đúng bằng số dư khả dụng</text><text x="440" y="112">SUCCESS · số dư còn 0</text>
<rect x="24" y="120" width="672" height="24" fill="#ede9fe"/><text x="34" y="136" fill="#dc2626">Negative</text><text x="150" y="136">Số tiền &gt; số dư khả dụng</text><text x="440" y="136">Chặn · "Số dư không đủ" · không tạo bút toán</text>
<text x="34" y="160" fill="#dc2626">Negative</text><text x="150" y="160">Vượt hạn mức KYC/ngày</text><text x="440" y="160">Chặn · gợi ý nâng hạn mức</text>
<rect x="24" y="168" width="672" height="24" fill="#ede9fe"/><text x="34" y="184" fill="#dc2626">Negative</text><text x="150" y="184">OTP sai 5 lần</text><text x="440" y="184">Khoá lệnh · ghi log bảo mật</text>
<text x="34" y="208" fill="#2563eb">Failure</text><text x="150" y="208">NAPAS timeout (không callback)</text><text x="440" y="208">PENDING → auto-refund sau SLA · hoàn tiền</text>
<rect x="24" y="216" width="672" height="24" fill="#ede9fe"/><text x="34" y="232" fill="#2563eb">Failure</text><text x="150" y="232">NAPAS trả REJECT (ACCOUNT_FROZEN)</text><text x="440" y="232">REFUNDED · bút toán đảo · A hoàn nguyên</text>
<text x="34" y="256" fill="#7c3aed">Idempotency</text><text x="150" y="256">Double-submit cùng requestId</text><text x="440" y="256">Chỉ 1 giao dịch · trừ tiền 1 lần</text>
<rect x="24" y="264" width="672" height="24" fill="#ede9fe"/><text x="34" y="280" fill="#0891b2">Recon</text><text x="150" y="280">Core báo SUCCESS, NAPAS báo FAIL</text><text x="440" y="280">Đối soát phát hiện lệch · cảnh báo · giữ tiền</text>
</g></g>
<text x="24" y="306" font-size="12" fill="#6d28d9" font-weight="700">Mỗi HÀNG → tối thiểu một test tự động. Nhóm Failure/Idempotency/Recon là nơi phân biệt QA giỏi.</text>
</svg>`;

const svgRecon = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Đối soát cuối ngày · End-of-day reconciliation</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="26" y="58" width="150" height="52" rx="9" fill="#1e293b"/><text x="101" y="80" fill="#93c5fd">Sổ Core (nội bộ)</text><text x="101" y="97" fill="#64748b" font-size="10">giao dịch trong ngày</text>
<rect x="26" y="130" width="150" height="52" rx="9" fill="#1e293b"/><text x="101" y="152" fill="#c4b5fd">File NAPAS (đối tác)</text><text x="101" y="169" fill="#64748b" font-size="10">settlement report</text>
<rect x="250" y="94" width="150" height="52" rx="9" fill="#1e3a2f"/><text x="325" y="116" fill="#86efac">Recon Engine</text><text x="325" y="133" fill="#64748b" font-size="10">match theo refId</text>
<rect x="470" y="58" width="100" height="44" rx="9" fill="#14532d"/><text x="520" y="84" fill="#bbf7d0">Khớp ✓</text>
<rect x="470" y="118" width="100" height="44" rx="9" fill="#7f1d1d"/><text x="520" y="138" fill="#fecaca">Lệch ✗</text><text x="520" y="153" fill="#fca5a5" font-size="10">→ cảnh báo</text>
<rect x="600" y="118" width="96" height="44" rx="9" fill="#3a2f1e"/><text x="648" y="138" fill="#fcd34d">Xử lý tay</text><text x="648" y="153" fill="#a8a29e" font-size="10">/ tự hoàn</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M176 84 C210 84 216 112 250 116" marker-end="url(#ra)"/><path d="M176 156 C210 156 216 128 250 124" marker-end="url(#ra)"/><path d="M400 108 C430 108 440 80 470 80" marker-end="url(#ra)"/><path d="M400 128 C430 128 440 140 470 140" marker-end="url(#ra)"/><path d="M570 140 H600" marker-end="url(#ra)"/></g>
<defs><marker id="ra" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<text x="26" y="212" font-size="12.5" fill="#fca5a5" font-weight="700">Ca kiểm thử vàng: cố tình tạo lệch (Core SUCCESS nhưng NAPAS FAIL) → recon phải phát hiện, cảnh báo, không để "tiền bay".</text>
<text x="26" y="236" font-size="12" fill="#94a3b8">Golden test: inject a mismatch and assert reconciliation detects it, alerts, and money is not lost.</text>
</svg>`;

// ============================================================================
// NỘI DUNG — 14 chương
// ============================================================================
const pages = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope" },
    blocks: [
      P("Bạn là QA Automation Lead tại NeoBank — một ngân hàng số phục vụ khoảng 3 triệu khách hàng, xử lý trung bình 1,2 triệu giao dịch mỗi ngày, cao điểm cuối tháng lên tới 2.500 giao dịch mỗi phút. Sản phẩm trọng yếu nhất là chuyển khoản: nội bộ (cùng NeoBank) và liên ngân hàng qua NAPAS. Quý này, đội Core Banking tái kiến trúc luồng chuyển khoản liên ngân hàng để giảm độ trễ và tăng tỉ lệ thành công. Mọi thay đổi trên luồng này đều là thay đổi 'chạm tiền thật': một lỗi nhỏ có thể trừ tiền khách hai lần, tạo 'tiền ảo', hoặc để giao dịch treo lơ lửng không rõ trạng thái.",
        "You are the QA Automation Lead at NeoBank — a digital bank serving ~3 million customers, processing on average 1.2 million transactions per day, peaking at 2,500 transactions per minute at month-end. The most critical product is transfers: internal (within NeoBank) and interbank via NAPAS. This quarter the Core Banking team is re-architecting the interbank transfer flow to reduce latency and raise success rates. Every change here is a 'real-money' change: a small bug can double-debit a customer, create 'phantom money', or leave a transaction dangling in an unknown state."),
      P("Yêu cầu đặt ra cho đội QA không chỉ là 'test cho chạy được'. Ban lãnh đạo và bộ phận tuân thủ (compliance) đặt ra ràng buộc: hệ thống phải đạt SLA khả dụng 99,95%, thời gian phản hồi p95 dưới 3 giây cho bước xác nhận, và tuyệt đối không được có sai lệch tài chính lọt ra production. Ngân hàng Nhà nước yêu cầu mọi giao dịch phải truy vết được và đối soát khớp với NAPAS mỗi ngày. Vì thế, chiến lược kiểm thử phải phủ được không chỉ 'happy path' mà cả những ca lỗi tài chính hiếm gặp nhưng hậu quả nghiêm trọng.",
        "The mandate for QA is not merely 'make it work'. Leadership and compliance set constraints: 99.95% availability SLA, p95 response time under 3 seconds for the confirmation step, and zero financial discrepancies reaching production. The central bank requires every transaction to be traceable and reconciled against NAPAS daily. So the test strategy must cover not just the happy path but the rare-yet-severe financial failure cases."),
      H("Phạm vi tự động hoá của tài liệu này", "Scope of automation in this document"),
      UL(["Luồng chuyển khoản liên ngân hàng đầu-cuối: từ thao tác trên app → xác nhận OTP → trừ tiền/treo → định tuyến NAPAS → ghi có/hoàn tiền.",
          "Các ca lỗi tài chính: idempotency (chống trừ tiền hai lần), hoàn tiền khi bị từ chối, xử lý timeout, vượt hạn mức.",
          "Đối soát cuối ngày (reconciliation) giữa sổ Core và file settlement của NAPAS.",
          "Đưa toàn bộ vào CI/CD chạy mỗi PR, kèm giám sát và chỉ số chất lượng.",
          "Tích hợp AI Agent để tăng tốc soạn ca kiểm thử và điều tra lỗi — với ranh giới trách nhiệm rõ ràng."],
         ["The end-to-end interbank transfer flow: app action → OTP confirmation → debit/hold → NAPAS routing → credit/refund.",
          "Financial failure cases: idempotency (no double-debit), refund on rejection, timeout handling, limit breaches.",
          "End-of-day reconciliation between the Core ledger and NAPAS settlement files.",
          "Wiring everything into CI/CD on every PR, with monitoring and quality metrics.",
          "AI-agent integration to accelerate test drafting and failure investigation — with clear accountability boundaries."]),
      NOTE("Bài viết này là bài mẫu 'thực chiến doanh nghiệp' — một trong các LOẠI bài của hệ thống (bên cạnh: chuyên công nghệ, chuyên nâng cao, chuyên phỏng vấn, tích hợp). Nó cố tình đi sâu và dài để bạn thấy chuẩn nội dung; các bài khác sẽ theo cùng độ sâu và cấu trúc mục lục này.",
        "This is an 'enterprise real-world' sample — one of the article KINDS in the system (alongside: technology-focused, advanced, interview-focused, integrated). It is intentionally deep and long to show the content standard; other articles will match this depth and table-of-contents structure."),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow" },
    blocks: [
      P("Trước khi viết dòng test đầu tiên, một QA giỏi phải hiểu hệ thống như một kỹ sư. Luồng chuyển khoản liên ngân hàng đi qua nhiều thành phần và trộn lẫn cả xử lý đồng bộ lẫn bất đồng bộ — đây chính là gốc rễ của phần lớn độ khó khi kiểm thử.",
        "Before writing the first test, a strong QA must understand the system like an engineer. The interbank transfer flow traverses many components and mixes synchronous and asynchronous processing — this is the root of most testing difficulty."),
      IMG(svgArch, "Kiến trúc và các điểm khó kiểm thử của luồng chuyển khoản liên ngân hàng.", "Architecture and hard-to-test points of the interbank transfer flow."),
      P("Phần đồng bộ diễn ra ngay khi khách bấm xác nhận: App gọi API Gateway (xác thực phiên, chống lạm dụng), Gateway chuyển tới Transfer Service. Service này kiểm tra hạn mức, sinh một requestId duy nhất (khoá idempotency), gọi Core để TRỪ tiền người gửi và TREO (hold) khoản tiền vào một tài khoản trung gian, rồi trả về màn hình 'đang xử lý'. Đến đây khách đã thấy tiền bị trừ, nhưng người nhận CHƯA nhận được — trạng thái giao dịch là PENDING.",
        "The synchronous part runs the moment the customer confirms: the App calls the API Gateway (session auth, abuse control), which forwards to the Transfer Service. That service checks limits, generates a unique requestId (the idempotency key), calls Core to DEBIT the sender and HOLD the funds in an intermediary account, then returns a 'processing' screen. At this point the customer sees the debit, but the recipient has NOT received it yet — the transaction state is PENDING."),
      P("Phần bất đồng bộ mới là nơi rủi ro cao nhất. NAPAS Adapter đẩy lệnh sang NAPAS để định tuyến tới Bank B. Kết quả trở về dưới dạng callback (webhook) — có thể sau vài giây, có thể vài phút, và đôi khi KHÔNG bao giờ tới (timeout). Nếu callback là SUCCESS, hệ thống ghi có cho người nhận và chuyển trạng thái sang SUCCESS. Nếu là REJECT, hệ thống phải HOÀN tiền cho người gửi và giải phóng hold, trạng thái REFUNDED. Nếu callback không tới trong SLA, một job nền phải chủ động truy vấn hoặc tự hoàn tiền.",
        "The asynchronous part is where risk peaks. The NAPAS Adapter pushes the order to NAPAS to route to Bank B. The result returns as a callback (webhook) — possibly after seconds, possibly minutes, and sometimes NEVER (timeout). If the callback is SUCCESS, the system credits the recipient and moves to SUCCESS. If REJECT, it must REFUND the sender and release the hold, state REFUNDED. If no callback arrives within SLA, a background job must proactively query or auto-refund."),
      TIP("Vẽ lại luồng và liệt kê mọi trạng thái + chuyển tiếp trạng thái (state machine) TRƯỚC khi thiết kế ca kiểm thử. Mỗi cạnh của máy trạng thái là một ca cần phủ; các trạng thái 'kẹt' (không có đường ra) chính là bug tiềm ẩn.",
        "Redraw the flow and enumerate every state + transition (a state machine) BEFORE designing tests. Each edge of the state machine is a case to cover; 'stuck' states with no exit are latent bugs."),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ", en: "3. Data model & business invariants" },
    blocks: [
      P("Trái tim của một hệ thống ngân hàng là SỔ CÁI GHI KÉP (double-entry ledger): mỗi chuyển động tiền được ghi thành các bút toán Nợ/Có sao cho tổng Nợ luôn bằng tổng Có. Hiểu mô hình này giúp bạn định nghĩa 'oracle' — tức kết quả kỳ vọng chính xác — thay vì chỉ kiểm tra thông báo trên màn hình.",
        "The heart of a banking system is the DOUBLE-ENTRY LEDGER: each money movement is recorded as Debit/Credit entries such that total Debit always equals total Credit. Understanding this lets you define the 'oracle' — the exact expected result — rather than only checking an on-screen message."),
      IMG(svgLedger, "Các bút toán ghi kép sinh ra cho một lệnh chuyển 5.000.000đ và bất biến bảo toàn tiền.", "The double-entry records for a 5,000,000 VND transfer and the money-conservation invariant."),
      H("Bốn bất biến phải đúng ở MỌI thời điểm", "Four invariants that must hold at ALL times"),
      UL(["Bảo toàn tiền (conservation): tổng số dư toàn hệ thống không đổi; sum(Debit) = sum(Credit). Tiền chỉ dịch chuyển, không tự sinh/mất.",
          "Idempotency: cùng một requestId dù được gửi lại bao nhiêu lần cũng chỉ tạo ĐÚNG MỘT giao dịch và trừ tiền một lần.",
          "Trạng thái cuối duy nhất: mỗi giao dịch kết thúc ở đúng một trong SUCCESS / FAILED / REFUNDED — không 'lơ lửng' vô thời hạn.",
          "Khớp đối soát: mỗi giao dịch nội bộ phải có bản ghi tương ứng ở NAPAS và ngược lại; lệch phải được phát hiện."],
         ["Conservation: total system balance is unchanged; sum(Debit) = sum(Credit). Money only moves, it is never created/destroyed.",
          "Idempotency: the same requestId, however many times resent, yields EXACTLY ONE transaction and debits once.",
          "Single terminal state: each transaction ends in exactly one of SUCCESS / FAILED / REFUNDED — never dangling indefinitely.",
          "Reconciliation match: each internal transaction has a corresponding NAPAS record and vice versa; mismatches must be detected."]),
      P("Bốn bất biến này chính là bộ 'oracle' cho toàn bộ bài test. Thay vì assert 'màn hình hiện Thành công', mỗi test tài chính sẽ assert số dư chính xác ở cả hai đầu, sự tồn tại và giá trị của từng bút toán, trạng thái cuối, và (ở tầng đối soát) sự khớp với dữ liệu NAPAS. Đây là khác biệt lớn nhất giữa test 'cho có' và test bảo vệ được tiền thật.",
        "These four invariants are the 'oracle' for the entire suite. Instead of asserting 'the screen shows Success', each financial test asserts the exact balances on both sides, the existence and value of each ledger entry, the terminal state, and (at the reconciliation layer) the match with NAPAS data. This is the biggest difference between a token test and one that actually protects real money."),
      WARN("Cạm bẫy kinh điển: chỉ test 'số dư người gửi giảm'. Bạn phải kiểm cả bút toán phí, tài khoản trung gian (hold), và số dư người nhận. Nhiều bug 'tiền ảo' đến từ việc hold không được giải phóng hoặc phí bị tính hai lần.",
        "Classic trap: only testing 'the sender's balance decreased'. You must also check the fee entry, the intermediary (hold) account, and the recipient's balance. Many 'phantom money' bugs come from a hold never being released or a fee charged twice."),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy" },
    blocks: [
      P("Không thể (và không nên) tự động hoá mọi thứ qua giao diện. Chiến lược đúng bắt đầu từ rủi ro: ưu tiên tự động hoá những luồng mà nếu hỏng sẽ gây mất tiền hoặc vi phạm quy định, và đẩy phần còn lại xuống các tầng test nhanh và rẻ hơn.",
        "You cannot (and should not) automate everything through the UI. The right strategy starts from risk: prioritize automating flows whose failure loses money or breaks regulation, and push the rest down to faster, cheaper test layers."),
      H("Ma trận rủi ro (xác suất × hậu quả)", "Risk matrix (likelihood × impact)"),
      UL(["Cao/Cao — Trừ tiền hai lần khi double-submit: hiếm nhưng mất tiền khách & uy tín. Bắt buộc test tự động, chạy mỗi deploy.",
          "Thấp/Cao — Callback NAPAS không tới (timeout): xảy ra khi mạng/đối tác trục trặc, để lại giao dịch treo. Bắt buộc test.",
          "Trung bình/Cao — Đối soát lệch cuối ngày: nếu không phát hiện, sai lệch tích luỹ. Bắt buộc test luồng đối soát.",
          "Cao/Trung bình — Vượt hạn mức bị chặn sai: ảnh hưởng trải nghiệm & tuân thủ. Test data-driven theo bảng hạn mức.",
          "Trung bình/Thấp — Sai định dạng hiển thị số tiền: khó chịu nhưng không mất tiền. Test ở tầng component/UI nhẹ."],
         ["High/High — Double-debit on double-submit: rare but loses customer money & trust. Must be automated, run every deploy.",
          "Low/High — NAPAS callback never arrives (timeout): happens on network/partner issues, leaves dangling transactions. Must test.",
          "Medium/High — End-of-day reconciliation mismatch: undetected, discrepancies accumulate. Must test the recon flow.",
          "High/Medium — Limit breach wrongly blocked/allowed: affects UX & compliance. Data-driven test against the limit table.",
          "Medium/Low — Wrong amount formatting: annoying but no money lost. Test at the lightweight component/UI layer."]),
      P("Từ ma trận này suy ra tỉ lệ tầng test hợp lý: phần lớn logic (tính phí, kiểm hạn mức, sinh bút toán) được phủ bằng unit/integration test nhanh; API test phủ hợp đồng dữ liệu giữa các service; còn E2E qua UI chỉ dành cho một số ít luồng trọng yếu nhất mà khách thực sự trải nghiệm. Với NeoBank, tỉ lệ mục tiêu là khoảng 70% unit/integration, 20% API, 10% E2E — nhưng 10% E2E đó phải là những luồng đắt giá nhất.",
        "From this matrix comes a sensible test-layer ratio: most logic (fee calc, limit checks, ledger generation) is covered by fast unit/integration tests; API tests cover data contracts between services; and UI E2E is reserved for the few most critical flows the customer actually experiences. For NeoBank the target ratio is ~70% unit/integration, 20% API, 10% E2E — but that 10% E2E must be the most valuable flows."),
      TIP("Định nghĩa 'Definition of Done cho automation' cho từng luồng: chạy xanh 10 lần liên tiếp trong CI, có trace khi fail, assert đủ bất biến tài chính, và được gắn vào pipeline mỗi PR. Chưa đạt thì luồng đó chưa coi là 'đã tự động hoá'.",
        "Define a 'Definition of Done for automation' per flow: green 10 times in a row in CI, a trace on failure, asserts all financial invariants, and wired into every-PR pipeline. Until then, the flow is not 'automated'."),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. A formal test plan" },
    blocks: [
      P("Một Test Plan tốt là hợp đồng giữa QA và phần còn lại của dự án: nó nói rõ test cái gì, trong môi trường nào, khi nào coi là đạt, và ai chịu trách nhiệm. Dưới đây là khung Test Plan rút gọn nhưng đủ dùng ở công ty cho luồng chuyển khoản.",
        "A good test plan is a contract between QA and the rest of the project: it states what is tested, in which environment, when it is considered passing, and who is responsible. Below is a compact but company-usable test-plan template for the transfer flow."),
      H("Phạm vi & không thuộc phạm vi", "Scope & out of scope"),
      UL(["Trong phạm vi: chuyển khoản liên ngân hàng (happy, negative, failure, idempotency), đối soát cuối ngày, thông báo cho khách.",
          "Ngoài phạm vi (đợt này): chuyển khoản nội bộ (đã ổn định), nạp/rút qua thẻ, tính năng tiết kiệm.",
          "Giả định: có môi trường staging riêng, NAPAS được mock ở staging, có API nội bộ để seed/đọc số dư & bút toán."],
         ["In scope: interbank transfer (happy, negative, failure, idempotency), end-of-day reconciliation, customer notifications.",
          "Out of scope (this cycle): internal transfers (already stable), card top-up/withdraw, savings features.",
          "Assumptions: a dedicated staging env, NAPAS mocked in staging, internal APIs to seed/read balances & ledger entries."]),
      H("Tiêu chí vào/ra (entry/exit)", "Entry/exit criteria"),
      UL(["Entry: build đã deploy lên staging, dữ liệu seed sẵn sàng, mock NAPAS hoạt động, tài khoản test đủ vai trò.",
          "Exit: 100% ca trọng yếu (happy + tất cả ca tài chính) pass; ≥95% toàn bộ suite pass; không còn defect mức Critical/High; đối soát khớp trong bộ dữ liệu test.",
          "Tiêu chí dừng (suspension): nếu môi trường staging sập hoặc mock NAPAS lỗi, tạm dừng và báo cáo."],
         ["Entry: build deployed to staging, seed data ready, NAPAS mock working, test accounts across roles.",
          "Exit: 100% of critical cases (happy + all financial cases) pass; ≥95% of the full suite passes; no Critical/High defects; reconciliation matches on the test dataset.",
          "Suspension: if staging is down or the NAPAS mock breaks, suspend and report."]),
      H("Chiến lược dữ liệu, môi trường & vai trò", "Data, environment & role strategy"),
      P("Dữ liệu test được tạo và dọn qua API (không dùng chung tài khoản giữa các test để tránh phụ thuộc trạng thái). Môi trường staging định tuyến NAPAS tới một mock có thể lập trình phản hồi (SUCCESS/REJECT/timeout). Vai trò gồm: khách hàng (người gửi/nhận), nhân viên vận hành (xử lý giao dịch treo), và kiểm soát viên đối soát. Mỗi vai trò có một phiên đăng nhập lưu sẵn để test không phải đăng nhập lại qua UI.",
        "Test data is created and cleaned via API (no shared accounts across tests to avoid state coupling). Staging routes NAPAS to a programmable mock (SUCCESS/REJECT/timeout). Roles include: customer (sender/recipient), operations staff (handling dangling transactions), and a reconciliation controller. Each role has a saved login session so tests don't re-authenticate through the UI."),
      NOTE("Chỉ số báo cáo mỗi sprint cho quản lý: tỉ lệ pass, flaky rate, thời gian chạy suite, số luồng trọng yếu được phủ, số bug tài chính bắt được trước production, và tình trạng khớp đối soát. Đây là ngôn ngữ mà lãnh đạo và compliance hiểu.",
        "Metrics reported each sprint to management: pass rate, flaky rate, suite run time, critical flows covered, financial bugs caught before production, and reconciliation match status. This is the language leadership and compliance understand."),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix" },
    blocks: [
      P("Với nghiệp vụ nhiều điều kiện như chuyển khoản, thiết kế ca kiểm thử phải có hệ thống chứ không thể 'nghĩ tới đâu test tới đó'. Dùng kết hợp ba kỹ thuật kinh điển: phân vùng tương đương (equivalence partitioning), giá trị biên (boundary value) và bảng quyết định (decision table). Kết quả là một ma trận trong đó mỗi hàng là một ca kiểm thử có kết quả mong đợi rõ ràng.",
        "For a highly conditional business like transfers, test design must be systematic rather than ad hoc. Combine three classic techniques: equivalence partitioning, boundary value analysis, and decision tables. The result is a matrix where each row is a test case with an explicit expected result."),
      IMG(svgMatrix, "Trích ma trận ca kiểm thử luồng chuyển khoản — mỗi hàng là một test tự động.", "Excerpt of the transfer test matrix — each row is an automated test."),
      P("Chú ý các nhóm khác nhau đòi hỏi độ chú tâm khác nhau. Nhóm Happy/Boundary kiểm phần logic thường (số dư, hạn mức, phí). Nhóm Negative kiểm hệ thống từ chối đúng cách và KHÔNG tạo bút toán khi lẽ ra phải chặn. Nhóm Failure/Idempotency/Recon mới là nơi phân biệt một QA thực chiến: chúng mô phỏng những điều 'không mong muốn nhưng sẽ xảy ra' — đối tác timeout, khách bấm hai lần, dữ liệu hai bên lệch nhau.",
        "Note that different groups demand different attention. Happy/Boundary groups check ordinary logic (balance, limit, fee). Negative checks the system rejects correctly and does NOT create ledger entries when it should block. The Failure/Idempotency/Recon groups are what separate a battle-tested QA: they simulate the 'unwanted but inevitable' — partner timeouts, double clicks, two-sided data mismatches."),
      TIP("Đặt tên mỗi ca kèm dữ liệu và kết quả kỳ vọng (ví dụ 'transfer_amount_gt_balance → blocked_no_ledger'). Report sẽ chỉ đúng ca fail, và ma trận trở thành tài liệu sống mà cả dev lẫn compliance đọc được.",
        "Name each case with its data and expected result (e.g. 'transfer_amount_gt_balance → blocked_no_ledger'). The report points at the exact failing case, and the matrix becomes living documentation that both devs and compliance can read."),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Test data & environment setup" },
    blocks: [
      P("Độ ổn định của cả bộ test phụ thuộc rất lớn vào cách bạn tạo và cô lập dữ liệu. Nguyên tắc: mỗi test tự dựng trạng thái ban đầu của riêng nó qua API (nhanh và tất định), không click qua UI để tạo tài khoản/số dư, và dọn sạch sau khi chạy. Với luồng phụ thuộc NAPAS, ta định tuyến sang một mock có thể lập trình phản hồi theo từng kịch bản.",
        "The stability of the whole suite depends heavily on how you create and isolate data. Principle: each test builds its own initial state via API (fast and deterministic), never clicking through the UI to create accounts/balances, and cleans up afterward. For NAPAS-dependent flows, route to a programmable mock that responds per scenario."),
      H("Hàm tiện ích seed & đọc trạng thái (test-only API)", "Seed & read helpers (test-only API)"),
      CODE("typescript", "// helpers/bank.ts — chỉ dùng ở môi trường test, bảo vệ bằng token riêng\nimport { APIRequestContext } from '@playwright/test';\n\nexport async function seedAccount(api: APIRequestContext, opts: {\n  balance: number; bank?: string; kyc?: 1 | 2; toppedThisMonth?: number;\n}) {\n  const res = await api.post('/api/test/accounts', { data: opts });\n  if (!res.ok()) throw new Error('seedAccount failed: ' + res.status());\n  return res.json(); // { id, number, balance, ... }\n}\n\nexport async function ledgerOf(api: APIRequestContext, txnId: string) {\n  return (await api.get(`/api/test/ledger/${txnId}`)).json(); // các bút toán Nợ/Có\n}\n\nexport async function balanceOf(api: APIRequestContext, accId: string) {\n  const a = await (await api.get(`/api/test/accounts/${accId}`)).json();\n  return a.balance as number;\n}\n\n// Mock NAPAS: cấu hình phản hồi cho lệnh kế tiếp\nexport async function setNapasBehavior(api: APIRequestContext, refId: string,\n  behavior: 'SUCCESS' | 'REJECT' | 'TIMEOUT', reason?: string) {\n  await api.post('/api/test/napas-mock', { data: { refId, behavior, reason } });\n}"),
      WARN("API test-only (seed, đọc ledger, mock NAPAS) phải bị KHOÁ tuyệt đối ở production (feature flag + network policy + token riêng). Một endpoint tạo số dư lọt lên production là lỗ hổng tài chính nghiêm trọng, không chỉ là bug.",
        "Test-only APIs (seed, read ledger, mock NAPAS) must be absolutely LOCKED in production (feature flag + network policy + dedicated token). A balance-creating endpoint leaking to production is a serious financial vulnerability, not just a bug."),
      P("Về vai trò, ta đăng nhập một lần cho từng vai (khách, vận hành, kiểm soát viên) trong 'global setup' và lưu phiên vào file storageState, rồi gán cho từng test. Cách này vừa nhanh vừa giảm giòn so với việc mỗi test tự đăng nhập qua UI.",
        "For roles, log in once per role (customer, operations, reconciliation controller) in a 'global setup' and save the session to a storageState file, then assign it per test. This is faster and less brittle than each test logging in through the UI."),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Implementation: the happy path" },
    blocks: [
      P("Bắt đầu bằng luồng thành công, nhưng ngay từ đầu đã assert theo bất biến tài chính chứ không chỉ theo thông báo. Ta dùng Page Object cho màn chuyển khoản, seed dữ liệu qua API, và mock NAPAS trả SUCCESS.",
        "Start with the success flow, but assert against financial invariants from the outset, not just a message. Use a Page Object for the transfer screen, seed data via API, and mock NAPAS to return SUCCESS."),
      CODE("typescript", "// pages/TransferPage.ts\nimport { Page } from '@playwright/test';\nexport class TransferPage {\n  constructor(private page: Page) {}\n  goto() { return this.page.goto('/transfer'); }\n  async fill(toBank: string, toNumber: string, amount: number) {\n    await this.page.getByLabel('Ngân hàng nhận').selectOption(toBank);\n    await this.page.getByLabel('Số tài khoản nhận').fill(toNumber);\n    await this.page.getByLabel('Số tiền').fill(String(amount));\n    await this.page.getByRole('button', { name: 'Tiếp tục' }).click();\n  }\n  async confirmOtp(code = '123456') {\n    await this.page.getByLabel('Mã OTP').fill(code);\n    await this.page.getByRole('button', { name: 'Xác nhận' }).click();\n  }\n}"),
      CODE("typescript", "// tests/transfer.happy.spec.ts\nimport { test, expect } from '../fixtures';\nimport { seedAccount, balanceOf, ledgerOf, setNapasBehavior } from '../helpers/bank';\nimport { TransferPage } from '../pages/TransferPage';\n\ntest('chuyển khoản liên NH — SUCCESS + bảo toàn tiền', async ({ customerPage, request }) => {\n  const A = await seedAccount(request, { balance: 10_000_000 });\n  const B = await seedAccount(request, { bank: 'VCB', balance: 0 });\n  const before = await balanceOf(request, A.id) + await balanceOf(request, B.id);\n\n  const tp = new TransferPage(customerPage);\n  await tp.goto();\n  await tp.fill('VCB', B.number, 5_000_000);\n  const txnId = await customerPage.getByTestId('txn-id').innerText();\n  await setNapasBehavior(request, txnId, 'SUCCESS');\n  await tp.confirmOtp();\n\n  // Chờ theo điều kiện (callback async) — KHÔNG sleep\n  await expect(customerPage.getByTestId('txn-status')).toHaveText('Thành công', { timeout: 15_000 });\n\n  // Assert số dư CHÍNH XÁC (phí 11.000đ)\n  expect(await balanceOf(request, A.id)).toBe(10_000_000 - 5_000_000 - 11_000);\n  expect(await balanceOf(request, B.id)).toBe(5_000_000);\n  // Assert bút toán: tổng Nợ = tổng Có\n  const ledger = await ledgerOf(request, txnId);\n  const debit = ledger.reduce((s, e) => s + (e.debit || 0), 0);\n  const credit = ledger.reduce((s, e) => s + (e.credit || 0), 0);\n  expect(debit).toBe(credit);\n  // Bất biến toàn hệ thống (phí về tài khoản phí nội bộ)\n  const after = await balanceOf(request, A.id) + await balanceOf(request, B.id) + 11_000;\n  expect(after).toBe(before);\n});"),
      NOTE("Điểm mấu chốt: test 'happy path' của hệ tài chính vẫn phải assert số dư hai đầu + cân bằng bút toán + bất biến hệ thống. Nếu chỉ chờ chữ 'Thành công', bạn sẽ bỏ lọt đúng loại bug nguy hiểm nhất.",
        "Key point: a financial 'happy path' test must still assert both balances + ledger balance + the system invariant. If you only wait for the word 'Success', you miss exactly the most dangerous class of bug."),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi tài chính chuyên sâu", en: "9. Deep financial failure cases" },
    blocks: [
      P("Đây là phần 'ăn tiền' của tài liệu — nơi mà một QA nâng cao thể hiện giá trị. Ta phủ ba ca lỗi tài chính điển hình: double-submit (idempotency), NAPAS từ chối (hoàn tiền), và NAPAS timeout (tự hoàn theo SLA).",
        "This is the high-value part — where an advanced QA proves their worth. We cover three classic financial failure cases: double-submit (idempotency), NAPAS rejection (refund), and NAPAS timeout (SLA auto-refund)."),
      H("9.1 Idempotency — chống trừ tiền hai lần", "9.1 Idempotency — no double debit"),
      P("Kịch bản: mạng chập chờn khiến app gửi lệnh lần đầu bị treo, người dùng bấm lại. Cả hai lần dùng CÙNG requestId. Hệ thống đúng phải chỉ tạo một giao dịch và trừ tiền một lần. Ta mô phỏng bằng cách chặn response lần đầu rồi cho gửi lại.",
        "Scenario: a flaky network hangs the first submit, the user clicks again. Both attempts use the SAME requestId. A correct system creates one transaction and debits once. We simulate by aborting the first response then allowing a resend."),
      CODE("typescript", "test('idempotency — double-submit chỉ trừ tiền 1 lần', async ({ customerPage, request }) => {\n  const A = await seedAccount(request, { balance: 10_000_000 });\n  const B = await seedAccount(request, { bank: 'VCB', balance: 0 });\n  let hits = 0;\n  await customerPage.route('**/api/transfer', async route => {\n    hits++;\n    if (hits === 1) return route.abort('timedout'); // lần 1: giả timeout\n    return route.continue();                          // lần 2: gửi thật, cùng requestId\n  });\n  const tp = new TransferPage(customerPage);\n  await tp.goto(); await tp.fill('VCB', B.number, 5_000_000); await tp.confirmOtp();\n  await tp.fill('VCB', B.number, 5_000_000); await tp.confirmOtp(); // bấm lại\n  await expect(customerPage.getByTestId('txn-status')).toHaveText('Thành công', { timeout: 15_000 });\n  // Chỉ bị trừ MỘT lần\n  expect(await balanceOf(request, A.id)).toBe(10_000_000 - 5_000_000 - 11_000);\n  expect(await balanceOf(request, B.id)).toBe(5_000_000);\n});"),
      H("9.2 Hoàn tiền khi Bank B từ chối", "9.2 Refund when Bank B rejects"),
      CODE("typescript", "test('NAPAS REJECT → hoàn tiền, trạng thái REFUNDED', async ({ customerPage, request }) => {\n  const A = await seedAccount(request, { balance: 10_000_000 });\n  const B = await seedAccount(request, { bank: 'VCB', balance: 0 });\n  const tp = new TransferPage(customerPage);\n  await tp.goto(); await tp.fill('VCB', B.number, 5_000_000);\n  const txnId = await customerPage.getByTestId('txn-id').innerText();\n  await setNapasBehavior(request, txnId, 'REJECT', 'ACCOUNT_FROZEN');\n  await tp.confirmOtp();\n  await expect(customerPage.getByTestId('txn-status')).toHaveText('Đã hoàn tiền', { timeout: 15_000 });\n  // Tiền quay về nguyên vẹn, hold được giải phóng, người nhận không nhận\n  expect(await balanceOf(request, A.id)).toBe(10_000_000);\n  expect(await balanceOf(request, B.id)).toBe(0);\n  const ledger = await ledgerOf(request, txnId);\n  expect(ledger.some(e => e.type === 'REVERSAL')).toBeTruthy(); // có bút toán đảo\n});"),
      H("9.3 Timeout — tự hoàn theo SLA", "9.3 Timeout — SLA auto-refund"),
      P("Khi NAPAS không callback trong SLA (ví dụ 90 giây ở test), một job nền phải chuyển giao dịch từ PENDING sang tự hoàn. Ta cấu hình mock TIMEOUT và kiểm tra hệ thống không để giao dịch treo mãi.",
        "When NAPAS does not call back within SLA (e.g. 90 seconds in tests), a background job must move the transaction from PENDING to auto-refund. We configure the mock to TIMEOUT and verify the system never leaves it dangling."),
      CODE("typescript", "test('NAPAS TIMEOUT → PENDING rồi tự hoàn sau SLA', async ({ customerPage, request }) => {\n  const A = await seedAccount(request, { balance: 10_000_000 });\n  const B = await seedAccount(request, { bank: 'VCB', balance: 0 });\n  const tp = new TransferPage(customerPage);\n  await tp.goto(); await tp.fill('VCB', B.number, 5_000_000);\n  const txnId = await customerPage.getByTestId('txn-id').innerText();\n  await setNapasBehavior(request, txnId, 'TIMEOUT');\n  await tp.confirmOtp();\n  await expect(customerPage.getByTestId('txn-status')).toHaveText('Đang xử lý');\n  // Kích hoạt job nền (test hook) thay vì chờ thật 90s\n  await request.post('/api/test/run-timeout-sweeper');\n  await expect(customerPage.getByTestId('txn-status')).toHaveText('Đã hoàn tiền', { timeout: 15_000 });\n  expect(await balanceOf(request, A.id)).toBe(10_000_000);\n});"),
      TIP("Với các job chạy theo thời gian (SLA sweeper, batch), hãy cung cấp 'test hook' để kích hoạt chủ động thay vì chờ đồng hồ thật — test vừa nhanh vừa tất định.",
        "For time-based jobs (SLA sweeper, batches), expose a 'test hook' to trigger them proactively instead of waiting real time — tests become fast and deterministic."),
    ],
  },
  {
    heading: { vi: "10. Đối soát cuối ngày (reconciliation)", en: "10. End-of-day reconciliation" },
    blocks: [
      P("Ngay cả khi từng giao dịch riêng lẻ đúng, hệ thống vẫn có thể lệch với NAPAS do mất gói tin, callback trùng, hoặc lỗi phía đối tác. Vì vậy cuối ngày có một tiến trình đối soát: so sổ Core với file settlement của NAPAS theo mã tham chiếu, phát hiện mọi khoản lệch và cảnh báo. Đây là 'lưới an toàn' cuối cùng — và nó cũng phải được kiểm thử tự động.",
        "Even when each individual transaction is correct, the system can still diverge from NAPAS due to lost packets, duplicate callbacks, or partner-side errors. So an end-of-day reconciliation runs: it compares the Core ledger with NAPAS settlement files by reference id, detects every discrepancy, and alerts. This is the final safety net — and it too must be automated."),
      IMG(svgRecon, "Luồng đối soát và ca kiểm thử vàng: cố tình tạo lệch để chắc chắn hệ thống phát hiện.", "The reconciliation flow and the golden test: inject a mismatch to ensure detection."),
      P("Ca kiểm thử quan trọng nhất ở đây không phải là 'mọi thứ khớp', mà là cố tình TẠO LỆCH và kiểm rằng engine đối soát phát hiện, phân loại, và không để 'tiền bay'. Ví dụ: sổ Core ghi SUCCESS nhưng file NAPAS ghi FAIL cho cùng một refId.",
        "The most important test here is not 'everything matches', but deliberately INJECTING a mismatch and verifying the reconciliation engine detects, classifies, and does not 'lose money'. For example: the Core ledger records SUCCESS but the NAPAS file records FAIL for the same refId."),
      CODE("typescript", "test('đối soát phát hiện lệch Core=SUCCESS vs NAPAS=FAIL', async ({ opsPage, request }) => {\n  // Dựng một giao dịch mà Core coi là SUCCESS\n  const { txnId, refId } = await (await request.post('/api/test/seed-success-txn',\n    { data: { amount: 5_000_000 } })).json();\n  // Bơm file settlement NAPAS trong đó refId này lại là FAIL\n  await request.post('/api/test/napas-settlement', {\n    data: { rows: [{ refId, status: 'FAIL' }] },\n  });\n  // Chạy đối soát\n  await request.post('/api/test/run-reconciliation');\n  // Màn hình vận hành phải hiện đúng 1 khoản lệch, phân loại rõ\n  await opsPage.goto('/ops/reconciliation');\n  const row = opsPage.getByTestId(`recon-${refId}`);\n  await expect(row).toBeVisible();\n  await expect(row.getByTestId('recon-type')).toHaveText('LỆCH TRẠNG THÁI');\n  await expect(row.getByTestId('recon-action')).toContainText('Giữ tiền, chờ xử lý');\n  // Số dư người nhận KHÔNG được cộng khi đang có lệch\n});"),
      WARN("Một hệ thống ngân hàng 'xanh' ở mọi test giao dịch đơn lẻ vẫn có thể sai ở tầng tổng thể. Luôn có ít nhất một bộ test đối soát kiểm bất biến TOÀN HỆ THỐNG (tổng tiền, khớp đối tác) — đây là điều compliance quan tâm nhất.",
        "A banking system that is 'green' on every single-transaction test can still be wrong at the aggregate level. Always keep at least one reconciliation suite checking SYSTEM-WIDE invariants (total money, partner match) — this is what compliance cares about most."),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số chất lượng", en: "11. CI/CD, monitoring & quality metrics" },
    blocks: [
      P("Bộ test chỉ tạo giá trị khi chạy tự động mỗi PR và mỗi đêm. Ta chia test theo tầng để phản hồi nhanh: unit/integration chạy trên mọi commit; API + E2E trọng yếu chạy trên PR (song song, chia shard); toàn bộ E2E + đối soát chạy hằng đêm trên staging.",
        "A suite only adds value when it runs automatically on every PR and nightly. Split tests by layer for fast feedback: unit/integration on every commit; API + critical E2E on PRs (parallel, sharded); the full E2E + reconciliation nightly on staging."),
      CODE("yaml", "# .github/workflows/e2e.yml (rút gọn)\nname: banking-e2e\non: [pull_request]\njobs:\n  e2e:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix: { shard: [1, 2, 3, 4] }\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npx playwright test --grep @critical --shard=${{ matrix.shard }}/4\n        env:\n          BASE_URL: ${{ secrets.STAGING_URL }}\n          TEST_API_TOKEN: ${{ secrets.TEST_API_TOKEN }}\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with: { name: report-${{ matrix.shard }}, path: playwright-report }"),
      H("Cổng chất lượng & chỉ số vận hành", "Quality gates & operational metrics"),
      UL(["Gate release: 100% ca tài chính @critical pass; không defect Critical/High; đối soát khớp trên bộ test.",
          "Flaky rate < 1%; test vượt ngưỡng bị quarantine và phải sửa trong sprint.",
          "Thời gian chạy suite @critical < 12 phút nhờ chia shard — đủ nhanh để không cản trở dev.",
          "Sau release: giám sát tỉ lệ giao dịch PENDING quá SLA, tỉ lệ auto-refund, và số khoản lệch đối soát mỗi ngày như tín hiệu sức khoẻ."],
         ["Release gate: 100% of @critical financial cases pass; no Critical/High defects; reconciliation matches on the test set.",
          "Flaky rate < 1%; tests above threshold are quarantined and must be fixed within the sprint.",
          "@critical suite runtime < 12 minutes via sharding — fast enough not to block devs.",
          "Post-release: monitor the rate of transactions PENDING beyond SLA, the auto-refund rate, and daily reconciliation mismatches as health signals."]),
      NOTE("Gắn nhãn (@critical, @recon, @idempotency) cho test để CI chạy đúng tập ở đúng thời điểm: PR chạy @critical cho nhanh, ban đêm chạy toàn bộ. Nhãn cũng giúp báo cáo theo nhóm rủi ro.",
        "Tag tests (@critical, @recon, @idempotency) so CI runs the right subset at the right time: PRs run @critical for speed, nightly runs everything. Tags also enable risk-group reporting."),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent (ranh giới rõ ràng)", en: "12. AI Agent integration (clear boundaries)" },
    blocks: [
      P("AI Agent không thay QA trong hệ thống tài chính, nhưng tăng tốc rõ rệt phần soạn thảo và điều tra. Điều quyết định khi phỏng vấn và khi đi làm là biết CHÍNH XÁC phần nào giao cho AI, phần nào con người phải giữ.",
        "An AI agent does not replace QA in a financial system, but it clearly accelerates drafting and investigation. What matters in interviews and on the job is knowing EXACTLY what to delegate to AI and what humans must keep."),
      H("AI Agent hỗ trợ tốt", "Where the AI agent helps well"),
      UL(["Sinh ma trận ca kiểm thử từ mô tả nghiệp vụ & bảng hạn mức — đặc biệt liệt kê ca negative/biên hay bị quên.",
          "Chuyển ma trận thành khung code data-driven (Playwright + TypeScript) theo Page Object; con người rà lại oracle.",
          "Phân tích trace/log khi test fail trong CI: tóm tắt nguyên nhân khả dĩ và bước tái hiện tối giản.",
          "Đọc báo cáo đối soát lệch, gom nhóm theo loại lệch và đề xuất giả thuyết nguyên nhân để người điều tra nhanh hơn."],
         ["Generating the test matrix from the business description & limit table — especially the negative/boundary cases people forget.",
          "Turning the matrix into a data-driven code skeleton (Playwright + TypeScript) with Page Objects; humans review the oracle.",
          "Analyzing traces/logs on CI failures: summarizing likely causes and a minimal repro.",
          "Reading reconciliation mismatch reports, clustering by discrepancy type and proposing root-cause hypotheses to speed up investigators."]),
      WARN("Ranh giới bất khả xâm phạm: AI KHÔNG tự quyết định pass/fail nghiệp vụ tài chính, KHÔNG tự phê duyệt release, KHÔNG tự 'sửa test cho xanh'. Mọi output của AI phải được người kiểm chứng với requirement và bút toán thật. Agent chỉ chạy trong môi trường test, không chạm dữ liệu/tiền thật.",
        "Inviolable boundary: AI does NOT decide financial pass/fail, does NOT self-approve releases, does NOT 'fix tests green'. All AI output must be validated by a human against the requirement and real ledger entries. The agent runs only in a test environment, never touching real data/money."),
      P("Một cách diễn đạt trưởng thành khi phỏng vấn: 'Tôi dùng AI để đi từ 5 ca lên 50 ca trong vài phút và để tóm tắt trace khi điều tra, nhưng oracle — kết quả kỳ vọng cho từng bút toán — và quyết định release luôn do tôi kiểm chứng, nhất là với hệ mất tiền thật.'",
        "A mature way to put it in an interview: 'I use AI to go from 5 to 50 cases in minutes and to summarize traces during investigation, but the oracle — the expected result for each ledger entry — and the release decision are always validated by me, especially for real-money systems.'"),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn — câu hỏi & kịch bản", en: "13. Interview angle — questions & role-play" },
    blocks: [
      P("Chính tình huống này là 'mỏ' câu hỏi phỏng vấn cho vị trí QA Automation ở ngân hàng/fintech. Dưới đây là những câu hay gặp cùng cách trả lời ghi điểm, và một kịch bản phỏng vấn trực tiếp.",
        "This very scenario is a goldmine of interview questions for QA Automation roles at banks/fintech. Below are common questions with strong answers, and a live role-play."),
      QA("Bạn test một luồng chuyển khoản liên ngân hàng cho nhanh và ổn định thế nào?",
         "How do you test an interbank transfer flow quickly and reliably?",
         "Xác định bất biến nghiệp vụ (bảo toàn tiền, idempotency, trạng thái cuối, khớp đối soát) làm oracle. Seed tài khoản/số dư qua API, chỉ dùng UI cho đúng phần khách trải nghiệm, mock NAPAS để tất định. Assert số dư hai đầu + cân bằng bút toán + trạng thái. Phủ ca lỗi bằng ma trận data-driven, chờ theo callback/điều kiện thay vì sleep, và đưa vào CI với trace on-first-retry.",
         "Define business invariants (conservation, idempotency, terminal state, reconciliation match) as the oracle. Seed accounts/balances via API, use the UI only for what the customer experiences, mock NAPAS for determinism. Assert both balances + ledger balance + state. Cover failures with a data-driven matrix, wait on callbacks/conditions instead of sleeps, and run in CI with trace on-first-retry."),
      QA("Làm sao đảm bảo không trừ tiền khách hai lần?",
         "How do you ensure a customer is never double-debited?",
         "Kiểm idempotency: gửi lại cùng requestId (mô phỏng double-submit do timeout) và assert chỉ tạo một giao dịch, trừ tiền một lần, cân bằng bút toán giữ nguyên. Đây là ca @critical chạy mỗi PR. Ngoài ra tầng đối soát cuối ngày bắt các trường hợp trùng callback mà test đơn lẻ có thể bỏ sót.",
         "Test idempotency: resend the same requestId (simulating a timeout-driven double-submit) and assert only one transaction is created, debited once, ledger stays balanced. This is a @critical case run every PR. Additionally, end-of-day reconciliation catches duplicate-callback cases that single-transaction tests might miss."),
      QA("Xử lý phần bất đồng bộ (callback NAPAS) trong test tự động thế nào?",
         "How do you handle the async part (NAPAS callback) in automated tests?",
         "Mock NAPAS để lập trình phản hồi SUCCESS/REJECT/TIMEOUT theo kịch bản; chờ theo điều kiện (trạng thái giao dịch đổi) với timeout hợp lý thay vì sleep; và với job theo thời gian (SLA sweeper) thì dùng test hook để kích hoạt chủ động. Nhờ đó test vừa phủ được ca async vừa tất định.",
         "Mock NAPAS to program SUCCESS/REJECT/TIMEOUT responses per scenario; wait on a condition (the transaction status changing) with a sensible timeout instead of sleeps; and for time-based jobs (SLA sweeper) use a test hook to trigger them proactively. This covers async cases deterministically."),
      H("Kịch bản phỏng vấn trực tiếp", "Live interview role-play"),
      SCEN("Nhà tuyển dụng hỏi", "Interviewer's prompt",
        "'Trên staging, test chuyển khoản đôi khi đỏ trong CI nhưng chạy tay lại xanh. Product muốn release chiều nay. Bạn xử lý thế nào trong 30 phút?'",
        "'On staging, the transfer test is sometimes red in CI but green locally. Product wants to release this afternoon. How do you handle it in 30 minutes?'"),
      QA("Cách trả lời mẫu (có cấu trúc)",
         "A structured model answer",
         "1) Không chặn hay thả release dựa trên phỏng đoán — mở trace lần fail để có bằng chứng. 2) Phân loại: lỗi thật hay flaky? Xem bước fail, thời điểm, và callback NAPAS mock. 3) Nếu flaky do chờ callback chưa đúng → thay bằng chờ điều kiện + test hook, thêm retry có kiểm soát. 4) Nếu là bug thật (ví dụ double-debit hoặc hold không giải phóng) → chặn release, báo dev kèm trace + test tái hiện, và thêm ca vào @critical. 5) Phòng ngừa: đảm bảo đối soát cuối ngày phủ được lớp này. Kết: quyết định dựa trên trace và bút toán, không dựa vào 'chạy lại cho xanh'.",
         "1) Don't gate or ship on a guess — open the failing run's trace for evidence. 2) Triage: real bug or flaky? Inspect the failing step, timing, and the mocked NAPAS callback. 3) If flaky due to wrong callback waiting → replace with condition waits + a test hook, add controlled retries. 4) If a real bug (e.g. double-debit or an unreleased hold) → block the release, report to devs with the trace + a reproducing test, and add the case to @critical. 5) Prevent: ensure end-of-day reconciliation covers this layer. Bottom line: decide on the trace and ledger, not on 'rerun until green'."),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist" },
    blocks: [
      P("Tài liệu đã đi trọn một vòng thực chiến: từ hiểu nghiệp vụ và kiến trúc, xác định bất biến làm oracle, phân tích rủi ro, viết test plan, thiết kế ma trận ca, chuẩn bị dữ liệu, hiện thực happy path và các ca lỗi tài chính, kiểm thử đối soát, đưa vào CI/CD, đến tích hợp AI và góc phỏng vấn. Đây là độ sâu chuẩn cho các bài 'thực chiến doanh nghiệp' của hệ thống.",
        "This document has gone a full real-world loop: understanding the business and architecture, defining invariants as the oracle, analyzing risk, writing a test plan, designing the case matrix, preparing data, implementing the happy path and financial failure cases, testing reconciliation, wiring CI/CD, and finally AI integration and the interview angle. This is the standard depth for the system's 'enterprise real-world' articles."),
      H("Checklist bàn giao cho một luồng tài chính", "Handover checklist for a financial flow"),
      UL(["Đã liệt kê máy trạng thái và phủ mọi chuyển tiếp, gồm các trạng thái 'kẹt'.",
          "Mỗi test tài chính assert số dư hai đầu + cân bằng bút toán + trạng thái cuối, không chỉ thông báo.",
          "Đủ ca: happy, boundary, negative, failure (timeout/reject), idempotency, và đối soát lệch.",
          "Dữ liệu seed/dọn qua API test-only đã khoá ở production; mock NAPAS lập trình được.",
          "Bộ @critical chạy mỗi PR, song song/shard, có trace on-first-retry; toàn bộ chạy hằng đêm.",
          "Có cổng release theo bất biến tài chính + trạng thái đối soát; flaky rate < 1%.",
          "Ranh giới AI rõ ràng: AI soạn thảo/điều tra, con người giữ oracle và quyết định release."],
         ["State machine enumerated and every transition covered, including 'stuck' states.",
          "Each financial test asserts both balances + ledger balance + terminal state, not just a message.",
          "Full cases: happy, boundary, negative, failure (timeout/reject), idempotency, and reconciliation mismatch.",
          "Seed/cleanup via test-only APIs locked in production; NAPAS mock is programmable.",
          "The @critical suite runs every PR, parallel/sharded, with trace on-first-retry; everything runs nightly.",
          "A release gate on financial invariants + reconciliation status; flaky rate < 1%.",
          "Clear AI boundaries: AI drafts/investigates, humans keep the oracle and the release decision."]),
      NOTE("Đây là BÀI MẪU FLAGSHIP theo chuẩn biên soạn mới: sâu, có mục lục bài bản, mô tả nghiệp vụ chi tiết trên một domain lớn, tích hợp nhiều loại (công nghệ + nâng cao + thực chiến + phỏng vấn). Sau khi bạn duyệt format này, các danh mục/domain khác (y tế, bảo hiểm, fintech, TMĐT, CRM, ERP, dịch vụ…) sẽ được dựng theo đúng độ sâu và cấu trúc này, kèm bản dịch tiếng Nhật.",
        "This is the FLAGSHIP sample in the new authoring standard: deep, with a proper table of contents, detailed business description on a large domain, integrating multiple kinds (technology + advanced + real-world + interview). Once you approve this format, the other categories/domains (healthcare, insurance, fintech, e-commerce, CRM, ERP, services…) will be built to this same depth and structure, with Japanese translations."),
    ],
  },
];

export const FLAGSHIP_DOCS = [
  {
    categorySlug: "enterprise-realworld",
    slug: "flagship-banking-transfer-recon",
    cover: thumb,
    level: 3,
    tags: [TAG.thucchien, TAG.banking, TAG.fintech, TAG.tichhop, TAG.playwright, TAG.api, TAG.cicd, TAG.aitesting, TAG.interview, TAG.realworld],
    title: {
      vi: "Thực chiến: kiểm thử tự động chuyển khoản liên ngân hàng & đối soát (Core Banking E2E)",
      en: "Enterprise: automating interbank transfer & reconciliation testing (Core Banking E2E)",
      ja: "Enterprise: automating interbank transfer & reconciliation testing (Core Banking E2E)",
    },
    summary: {
      vi: "Bài mẫu sâu (chuẩn mới, có mục lục 14 chương): giải bài toán thật của ngân hàng số — kiến trúc, bất biến sổ cái, test plan, ma trận ca, code happy + ca lỗi tài chính (idempotency/hoàn tiền/timeout), đối soát cuối ngày, CI/CD, AI Agent và phỏng vấn. Tích hợp Playwright + API + CI + AI.",
      en: "A deep sample (new standard, 14-chapter TOC): a real digital-bank problem — architecture, ledger invariants, test plan, case matrix, happy + financial failure code (idempotency/refund/timeout), end-of-day reconciliation, CI/CD, AI agent and interviews. Integrates Playwright + API + CI + AI.",
      ja: "A deep enterprise sample: architecture, ledger invariants, test plan, financial failure cases, reconciliation, CI/CD, AI agent and interviews.",
    },
    pages: buildDoc(pages),
  },
];
