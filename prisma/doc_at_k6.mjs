// ============================================================================
// DOC_AT_K6 — 3 bài SÂU về k6 (Grafana k6) performance testing.
// A: Nền tảng k6 — vì sao load test, VU, script đầu tiên, options/stages, đọc summary.
// B: Thresholds & Scenarios — cổng pass/fail, executors, custom metrics, SharedArray.
// C: k6 trong CI + Observability — pipeline gate, stream Prometheus/Grafana/InfluxDB, soak.
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn, viewBox 0 0 720 220, nền tối #0f172a)
// ---------------------------------------------------------------------------
const SVG_VU_MODEL = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Mô hình Virtual User (VU) trong k6</text>
<g fill="#0c4a6e" stroke="#38bdf8" stroke-width="2">
<rect x="30" y="70" width="120" height="46" rx="9"/><rect x="30" y="126" width="120" height="46" rx="9"/></g>
<g fill="#134e4a" stroke="#2dd4bf" stroke-width="2">
<rect x="170" y="70" width="120" height="46" rx="9"/><rect x="170" y="126" width="120" height="46" rx="9"/></g>
<text x="90" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#bae6fd">VU 1</text>
<text x="90" y="154" text-anchor="middle" font-size="12" font-weight="700" fill="#bae6fd">VU 2</text>
<text x="230" y="98" text-anchor="middle" font-size="11" fill="#99f6e4">iteration → sleep</text>
<text x="230" y="154" text-anchor="middle" font-size="11" fill="#99f6e4">iteration → sleep</text>
<g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#ak1)"><path d="M150 93 h20"/><path d="M150 149 h20"/></g>
<rect x="330" y="86" width="150" height="70" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="405" y="116" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">default fn</text>
<text x="405" y="138" text-anchor="middle" font-size="10.5" fill="#a5b4fc">http.get → check</text>
<g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#ak1)"><path d="M290 93 h40 v18"/><path d="M290 149 h40 v-18"/></g>
<rect x="520" y="86" width="170" height="70" rx="10" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="605" y="112" text-anchor="middle" font-size="13" font-weight="800" fill="#6ee7b7">SUT / server</text>
<text x="605" y="134" text-anchor="middle" font-size="10.5" fill="#86efac">đo latency + throughput</text>
<g stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#ak2)"><path d="M480 121 h40"/></g>
<defs>
<marker id="ak1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker>
<marker id="ak2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#f59e0b"/></marker>
</defs>
<text x="360" y="200" text-anchor="middle" font-size="11" fill="#64748b">Mỗi VU là một luồng độc lập lặp default function; tổng VU × tần suất = tải áp lên hệ thống</text>
</svg>`;

const SVG_STAGES = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">stages: ramp-up → giữ tải → ramp-down</text>
<line x1="60" y1="170" x2="680" y2="170" stroke="#475569" stroke-width="2"/>
<line x1="60" y1="60" x2="60" y2="170" stroke="#475569" stroke-width="2"/>
<text x="30" y="66" font-size="11" fill="#94a3b8">VU</text>
<text x="680" y="190" text-anchor="end" font-size="11" fill="#94a3b8">time</text>
<polyline points="60,170 220,80 460,80 620,170" fill="none" stroke="#38bdf8" stroke-width="3"/>
<circle cx="220" cy="80" r="4" fill="#38bdf8"/><circle cx="460" cy="80" r="4" fill="#38bdf8"/>
<line x1="220" y1="80" x2="220" y2="170" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="460" y1="80" x2="460" y2="170" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
<text x="140" y="140" text-anchor="middle" font-size="11" fill="#7dd3fc">ramp-up 30s</text>
<text x="340" y="70" text-anchor="middle" font-size="11" fill="#7dd3fc">giữ 100 VU · 1m</text>
<text x="545" y="140" text-anchor="middle" font-size="11" fill="#7dd3fc">ramp-down 30s</text>
<text x="360" y="205" text-anchor="middle" font-size="11" fill="#64748b">ramp-up từ từ giúp làm nóng cache/pool và tránh false failure lúc khởi động</text>
</svg>`;

const SVG_SUMMARY = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Đọc bản tóm tắt cuối lần chạy k6</text>
<rect x="40" y="50" width="200" height="140" rx="10" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
<text x="140" y="76" text-anchor="middle" font-size="12" font-weight="800" fill="#7dd3fc">Throughput</text>
<text x="140" y="104" text-anchor="middle" font-size="18" font-weight="800" fill="#e2e8f0">1 250 req/s</text>
<text x="140" y="128" text-anchor="middle" font-size="10.5" fill="#94a3b8">http_reqs / duration</text>
<text x="140" y="160" text-anchor="middle" font-size="10.5" fill="#64748b">= công suất xử lý</text>
<rect x="260" y="50" width="200" height="140" rx="10" fill="#111827" stroke="#fbbf24" stroke-width="2"/>
<text x="360" y="76" text-anchor="middle" font-size="12" font-weight="800" fill="#fde68a">Latency p95</text>
<text x="360" y="104" text-anchor="middle" font-size="18" font-weight="800" fill="#e2e8f0">420 ms</text>
<text x="360" y="128" text-anchor="middle" font-size="10.5" fill="#94a3b8">http_req_duration</text>
<text x="360" y="160" text-anchor="middle" font-size="10.5" fill="#64748b">95% nhanh hơn mốc này</text>
<rect x="480" y="50" width="200" height="140" rx="10" fill="#111827" stroke="#f87171" stroke-width="2"/>
<text x="580" y="76" text-anchor="middle" font-size="12" font-weight="800" fill="#fecaca">Error rate</text>
<text x="580" y="104" text-anchor="middle" font-size="18" font-weight="800" fill="#e2e8f0">0.3 %</text>
<text x="580" y="128" text-anchor="middle" font-size="10.5" fill="#94a3b8">http_req_failed</text>
<text x="580" y="160" text-anchor="middle" font-size="10.5" fill="#64748b">tỉ lệ request lỗi</text>
</svg>`;

const SVG_TEST_TYPES = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Năm loại kiểm thử tải phổ biến</text>
<line x1="50" y1="180" x2="690" y2="180" stroke="#475569" stroke-width="2"/>
<line x1="50" y1="55" x2="50" y2="180" stroke="#475569" stroke-width="2"/>
<polyline points="60,178 90,150 120,150" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
<text x="95" y="200" text-anchor="middle" font-size="10" fill="#7dd3fc">smoke</text>
<polyline points="150,178 190,110 260,110 290,178" fill="none" stroke="#34d399" stroke-width="2.5"/>
<text x="220" y="200" text-anchor="middle" font-size="10" fill="#6ee7b7">load</text>
<polyline points="320,178 360,70 400,70 430,178" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
<text x="375" y="200" text-anchor="middle" font-size="10" fill="#fde68a">stress</text>
<polyline points="460,178 470,178 475,60 480,60 485,178 520,178" fill="none" stroke="#f87171" stroke-width="2.5"/>
<text x="490" y="200" text-anchor="middle" font-size="10" fill="#fca5a5">spike</text>
<polyline points="550,178 580,130 670,130 690,178" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
<text x="620" y="200" text-anchor="middle" font-size="10" fill="#c4b5fd">soak</text>
<text x="360" y="45" text-anchor="middle" font-size="10.5" fill="#64748b">Mỗi hình dạng tải trả lời một câu hỏi rủi ro khác nhau</text>
</svg>`;

const SVG_EXECUTORS = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">VU-based vs Arrival-rate</text>
<rect x="40" y="50" width="300" height="140" rx="10" fill="#111827" stroke="#38bdf8" stroke-width="2"/>
<text x="190" y="76" text-anchor="middle" font-size="13" font-weight="800" fill="#7dd3fc">ramping-vus (open? no)</text>
<g font-size="10.5" fill="#cbd5e1"><text x="58" y="102">＋ điều khiển số VU đồng thời</text>
<text x="58" y="124">－ RPS phụ thuộc thời gian đáp ứng</text>
<text x="58" y="146">－ server chậm → RPS tự tụt</text>
<text x="58" y="170">→ hợp: mô phỏng "số người đang online"</text></g>
<rect x="380" y="50" width="300" height="140" rx="10" fill="#111827" stroke="#2dd4bf" stroke-width="2"/>
<text x="530" y="76" text-anchor="middle" font-size="13" font-weight="800" fill="#5eead4">constant-arrival-rate</text>
<g font-size="10.5" fill="#cbd5e1"><text x="398" y="102">＋ giữ RPS cố định (open model)</text>
<text x="398" y="124">＋ phản ánh lưu lượng thật (req/s)</text>
<text x="398" y="146">＋ VU tự tăng khi server chậm lại</text>
<text x="398" y="170">→ hợp: SLA theo RPS · capacity test</text></g>
</svg>`;

const SVG_CUSTOM_METRICS = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bốn loại metric trong k6</text>
<g>
<rect x="30" y="60" width="155" height="120" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="107" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#bae6fd">Counter</text>
<text x="107" y="118" text-anchor="middle" font-size="10.5" fill="#7dd3fc">cộng dồn</text>
<text x="107" y="140" text-anchor="middle" font-size="10" fill="#7dd3fc">số lỗi · số đơn</text>
<rect x="200" y="60" width="155" height="120" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="277" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#99f6e4">Gauge</text>
<text x="277" y="118" text-anchor="middle" font-size="10.5" fill="#5eead4">giá trị hiện tại</text>
<text x="277" y="140" text-anchor="middle" font-size="10" fill="#5eead4">size cuối cùng</text>
<rect x="370" y="60" width="155" height="120" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="447" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#c7d2fe">Rate</text>
<text x="447" y="118" text-anchor="middle" font-size="10.5" fill="#a5b4fc">tỉ lệ true/false</text>
<text x="447" y="140" text-anchor="middle" font-size="10" fill="#a5b4fc">% pass · % lỗi</text>
<rect x="540" y="60" width="155" height="120" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="617" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#fed7aa">Trend</text>
<text x="617" y="118" text-anchor="middle" font-size="10.5" fill="#fdba74">phân bố (p95/p99)</text>
<text x="617" y="140" text-anchor="middle" font-size="10" fill="#fdba74">thời gian nghiệp vụ</text>
</g>
<text x="360" y="205" text-anchor="middle" font-size="11" fill="#64748b">http_req_duration là một Trend dựng sẵn; bạn tự tạo Trend cho bước nghiệp vụ riêng</text>
</svg>`;

const SVG_CI_GATE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">k6 là cổng chất lượng trong pipeline</text>
<g fill="#111827" stroke="#475569" stroke-width="2">
<rect x="30" y="80" width="120" height="60" rx="9"/><rect x="180" y="80" width="120" height="60" rx="9"/></g>
<rect x="330" y="70" width="150" height="80" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<g fill="#111827" stroke="#475569" stroke-width="2"><rect x="510" y="80" width="80" height="60" rx="9"/></g>
<rect x="620" y="80" width="70" height="60" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="90" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">build</text>
<text x="240" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">deploy stg</text>
<text x="405" y="105" text-anchor="middle" font-size="13" font-weight="800" fill="#7dd3fc">k6 run</text>
<text x="405" y="128" text-anchor="middle" font-size="10.5" fill="#bae6fd">thresholds → exit code</text>
<text x="550" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">approve</text>
<text x="655" y="115" text-anchor="middle" font-size="11" font-weight="700" fill="#6ee7b7">prod</text>
<g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#ac1)">
<path d="M150 110 h30"/><path d="M300 110 h30"/><path d="M480 110 h30"/><path d="M590 110 h30"/></g>
<path d="M405 150 v30 h-260 v-10" fill="none" stroke="#f87171" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ac2)"/>
<text x="270" y="200" text-anchor="middle" font-size="11" fill="#fca5a5">exit≠0 → chặn deploy, trả về sửa</text>
<defs>
<marker id="ac1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker>
<marker id="ac2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#f87171"/></marker>
</defs>
</svg>`;

const SVG_OBSERVABILITY = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Stream metric k6 → kho + Grafana</text>
<rect x="40" y="80" width="130" height="70" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="105" y="112" text-anchor="middle" font-size="13" font-weight="800" fill="#c7d2fe">k6 run</text>
<text x="105" y="132" text-anchor="middle" font-size="10" fill="#a5b4fc">--out xk6-...</text>
<g fill="#111827" stroke="#38bdf8" stroke-width="2">
<rect x="250" y="55" width="150" height="42" rx="9"/><rect x="250" y="110" width="150" height="42" rx="9"/></g>
<text x="325" y="81" text-anchor="middle" font-size="11.5" font-weight="700" fill="#7dd3fc">Prometheus (RW)</text>
<text x="325" y="136" text-anchor="middle" font-size="11.5" font-weight="700" fill="#7dd3fc">InfluxDB</text>
<rect x="470" y="80" width="150" height="70" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="545" y="112" text-anchor="middle" font-size="13" font-weight="800" fill="#fed7aa">Grafana</text>
<text x="545" y="132" text-anchor="middle" font-size="10" fill="#fdba74">dashboard + alert</text>
<g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#ao1)">
<path d="M170 105 h80 v-25 h0"/><path d="M170 120 h80 v11 h0"/>
<path d="M400 76 h70 v20"/><path d="M400 131 h70 v-20"/></g>
<rect x="470" y="165" width="220" height="40" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="580" y="190" text-anchor="middle" font-size="10.5" fill="#86efac">so p95 client với CPU/GC server</text>
<defs><marker id="ao1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_SOAK = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Soak test lộ rò rỉ bộ nhớ theo thời gian</text>
<line x1="60" y1="180" x2="680" y2="180" stroke="#475569" stroke-width="2"/>
<line x1="60" y1="50" x2="60" y2="180" stroke="#475569" stroke-width="2"/>
<text x="30" y="56" font-size="10" fill="#94a3b8">mem</text>
<text x="680" y="198" text-anchor="end" font-size="10" fill="#94a3b8">time (giờ)</text>
<polyline points="60,150 200,145 360,138 520,120 680,90" fill="none" stroke="#f87171" stroke-width="3"/>
<text x="420" y="115" font-size="11" fill="#fca5a5">bộ nhớ tăng dần → nghi rò rỉ</text>
<polyline points="60,150 680,148" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="6 5"/>
<text x="200" y="168" font-size="10.5" fill="#6ee7b7">kỳ vọng: phẳng</text>
<text x="360" y="208" text-anchor="middle" font-size="11" fill="#64748b">Tải vừa phải nhưng kéo dài nhiều giờ mới lộ ra vấn đề tích tụ</text>
</svg>`;

// ===========================================================================
// ARTICLE A — Nền tảng k6 (fintech, congnghe)
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Vì sao cần kiểm thử tải và k6 giải bài toán gì",
      en: "1. Why load testing matters and what k6 solves",
      ja: "1. なぜ負荷テストが重要で、k6 が何を解決するのか",
    },
    blocks: [
      P(
        "Một hệ thống fintech có thể chạy mượt khi một người kiểm thử bấm thử, nhưng sụp đổ vào lúc 9 giờ sáng ngày lương về khi hàng chục nghìn người cùng đăng nhập, chuyển khoản và tra soát. Kiểm thử chức năng chỉ trả lời câu hỏi 'tính năng có đúng không', còn kiểm thử tải (load testing) trả lời một câu hỏi khác hẳn: 'hệ thống chịu được bao nhiêu người dùng cùng lúc trước khi chậm hoặc lỗi'. Đây là loại rủi ro không thể phát hiện bằng cách click tay, vì nó chỉ xuất hiện khi có áp lực đồng thời thật sự.",
        "A fintech system may run smoothly when one tester clicks through it, yet collapse at 9 a.m. on payday when tens of thousands of users log in, transfer money and reconcile at once. Functional testing answers 'does the feature work'; load testing answers a completely different question: 'how many concurrent users can the system handle before it slows down or breaks'. This class of risk cannot be found by manual clicking because it only appears under real concurrent pressure.",
        "フィンテックのシステムは、テスターが一人で操作する分には快適に動くかもしれませんが、給料日の午前9時に何万人もが同時にログイン・送金・照合を行うと崩壊することがあります。機能テストは「機能が正しく動くか」に答えますが、負荷テストはまったく別の問いに答えます。それは「システムが遅くなったり壊れたりする前に、何人の同時ユーザーに耐えられるか」です。この種のリスクは、実際の同時アクセス圧力の下でしか現れないため、手動クリックでは見つけられません。"
      ),
      P(
        "k6 (nay là Grafana k6) là công cụ mã nguồn mở để viết và chạy kiểm thử tải bằng cách mô phỏng nhiều người dùng ảo. Điểm mạnh của k6 là kịch bản test được viết bằng JavaScript nhưng nhân chạy bằng Go, nên vừa dễ viết vừa nhẹ tài nguyên, cho phép sinh hàng nghìn người dùng ảo trên một máy khiêm tốn. Trong tài liệu này chúng ta sẽ đi từ khái niệm gốc đến script đầu tiên, rồi tới cách đọc kết quả một cách chuyên nghiệp.",
        "k6 (now Grafana k6) is an open-source tool for writing and running load tests by simulating many virtual users. Its strength is that test scripts are written in JavaScript while the engine runs on Go, making scripts easy to write yet resource-light, so you can generate thousands of virtual users on a modest machine. In this document we go from first principles to your first script, then to reading results like a professional.",
        "k6（現在は Grafana k6）は、多数の仮想ユーザーをシミュレートして負荷テストを書き実行するためのオープンソースツールです。強みは、テストスクリプトを JavaScript で書きながらエンジンは Go で動作する点で、書きやすく資源も軽いため、控えめなマシンでも数千の仮想ユーザーを生成できます。本ドキュメントでは、基本原理から最初のスクリプト、そしてプロとして結果を読む方法まで進みます。"
      ),
      IMG(SVG_VU_MODEL, "Mỗi VU lặp default function và tạo tải lên hệ thống", "Each VU loops the default function and generates load on the system", "各仮想ユーザーが default 関数を繰り返し、システムに負荷をかけます"),
      NOTE(
        "Kiểm thử tải KHÔNG thay thế kiểm thử chức năng — nó bổ sung một chiều rủi ro mới: hiệu năng dưới áp lực.",
        "Load testing does NOT replace functional testing — it adds a new risk dimension: performance under pressure.",
        "負荷テストは機能テストを置き換えるものではなく、圧力下の性能という新しいリスクの側面を加えるものです。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Các khái niệm cốt lõi: VU, iteration, throughput, latency",
      en: "2. Core concepts: VU, iteration, throughput, latency",
      ja: "2. 中核概念：仮想ユーザー、イテレーション、スループット、レイテンシ",
    },
    blocks: [
      P(
        "Trước khi viết dòng code nào, cần nắm bốn khái niệm nền. Một Virtual User (VU) là một luồng độc lập trong k6, lặp đi lặp lại kịch bản của bạn giống như một người dùng thật. Một iteration là một lần chạy trọn vẹn default function. Throughput (thông lượng) là số request hệ thống phục vụ được mỗi giây — thước đo công suất. Latency (độ trễ) là thời gian một request từ lúc gửi tới lúc nhận đủ phản hồi — thước đo trải nghiệm.",
        "Before writing any code, grasp four foundational concepts. A Virtual User (VU) is an independent thread in k6 that repeats your scenario like a real user. An iteration is one complete run of the default function. Throughput is how many requests the system serves per second — a measure of capacity. Latency is the time a request takes from send to full response — a measure of experience.",
        "コードを書く前に、四つの基礎概念を押さえます。仮想ユーザー（VU）は k6 内の独立したスレッドで、実際のユーザーのようにシナリオを繰り返します。イテレーションは default 関数の一回の完全な実行です。スループットはシステムが毎秒処理できるリクエスト数で、処理能力の指標です。レイテンシはリクエストの送信から完全な応答受信までの時間で、体験の指標です。"
      ),
      P(
        "Điều quan trọng và hay bị hiểu lầm: nhiều VU không tự động nghĩa là nhiều throughput. Nếu server chậm, mỗi VU phải chờ lâu hơn cho mỗi iteration, nên số request/giây thực tế lại giảm. Vì vậy chuyên gia hiệu năng không nói 'chúng tôi chạy 500 VU' như một mục tiêu, mà nói 'chúng tôi đạt X request/giây với p95 latency Y'. Con số phần trăm (percentile) như p95 hay p99 quan trọng hơn giá trị trung bình, vì trung bình che giấu những người dùng bị chậm nhất — mà chính họ mới là người phàn nàn.",
        "A crucial and often-misunderstood point: more VUs do not automatically mean more throughput. If the server is slow, each VU waits longer per iteration, so actual requests per second may drop. That is why performance experts do not state '500 VUs' as a goal, but rather 'we achieved X requests/second at p95 latency Y'. Percentiles like p95 or p99 matter more than the average, because the average hides the slowest users — and those are precisely the ones who complain.",
        "重要でよく誤解される点があります。仮想ユーザーが多いことは自動的にスループットが高いことを意味しません。サーバーが遅ければ各仮想ユーザーはイテレーションごとに長く待つため、実際の毎秒リクエスト数はむしろ下がります。だから性能の専門家は「500 仮想ユーザーを流す」を目標とはせず、「p95 レイテンシ Y で毎秒 X リクエストを達成した」と言います。p95 や p99 といったパーセンタイルは平均より重要です。平均は最も遅いユーザーを隠しますが、その人こそが苦情を言うからです。"
      ),
      UL(
        ["VU — người dùng ảo, một luồng lặp kịch bản", "iteration — một lần chạy trọn default function", "throughput — req/s hệ thống phục vụ được", "latency — thời gian request; đọc theo p95/p99, không chỉ trung bình", "error rate — tỉ lệ request thất bại dưới tải"],
        ["VU — virtual user, one thread looping the scenario", "iteration — one full run of the default function", "throughput — requests/second the system serves", "latency — request time; read via p95/p99, not just average", "error rate — share of failed requests under load"],
        ["仮想ユーザー — シナリオを繰り返す一つのスレッド", "イテレーション — default 関数の一回の完全実行", "スループット — システムが処理する毎秒リクエスト数", "レイテンシ — リクエスト時間。平均でなく p95/p99 で読む", "エラー率 — 負荷下で失敗したリクエストの割合"]
      ),
      TIP(
        "Khi báo cáo hiệu năng, luôn kèm percentile và điều kiện tải: 'p95 = 420ms tại 1000 req/s' rõ ràng hơn 'trung bình 200ms'.",
        "When reporting performance, always include the percentile and load condition: 'p95 = 420ms at 1000 req/s' is clearer than 'average 200ms'.",
        "性能を報告する際は、常にパーセンタイルと負荷条件を添えます。「平均200ms」より「1000 req/s で p95 = 420ms」の方が明確です。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Cài đặt k6 và cấu trúc một script tối thiểu",
      en: "3. Installing k6 and the anatomy of a minimal script",
      ja: "3. k6 のインストールと最小スクリプトの構造",
    },
    blocks: [
      P(
        "k6 là một tệp nhị phân độc lập, cài bằng trình quản lý gói của hệ điều hành (Homebrew trên macOS, apt trên Debian/Ubuntu, Chocolatey trên Windows) hoặc chạy qua Docker. Một script k6 luôn có hai phần bắt buộc để chạy được: một hàm mặc định (default function) chứa hành vi mỗi VU sẽ lặp, và (tùy chọn nhưng gần như luôn dùng) một đối tượng options khai báo cách áp tải.",
        "k6 is a standalone binary, installed via your OS package manager (Homebrew on macOS, apt on Debian/Ubuntu, Chocolatey on Windows) or run through Docker. A k6 script always has two runnable essentials: a default function containing the behavior each VU repeats, and (optional but nearly always used) an options object declaring how to apply load.",
        "k6 は単体のバイナリで、OS のパッケージマネージャ（macOS の Homebrew、Debian/Ubuntu の apt、Windows の Chocolatey）またはDocker 経由でインストールします。k6 スクリプトには実行に必須の二要素があります。各仮想ユーザーが繰り返す振る舞いを含む default 関数と、負荷のかけ方を宣言する options オブジェクト（任意ですがほぼ常に使用）です。"
      ),
      CODE("bash", `# Cài đặt k6
brew install k6                 # macOS
sudo apt-get install k6         # Debian/Ubuntu (sau khi thêm repo Grafana)
choco install k6                # Windows

# Chạy một script
k6 run script.js

# Chạy qua Docker, ghi đè số VU và thời lượng qua CLI
docker run --rm -i grafana/k6 run - <script.js
k6 run --vus 50 --duration 30s script.js`),
      CODE("javascript", `// script.js — script k6 tối thiểu tuyệt đối
import http from 'k6/http';
import { sleep } from 'k6';

// Hàm mặc định: MỖI VU lặp lại thân hàm này liên tục
export default function () {
  http.get('https://test.k6.io');   // gửi 1 GET request
  sleep(1);                         // "think time" — nghỉ 1 giây như người thật
}`),
      P(
        "Hàm http.get trả về một đối tượng response chứa status, thân, headers và các số đo thời gian. sleep(1) mô phỏng 'think time' — khoảng dừng tự nhiên giữa các thao tác của người dùng thật. Nếu bỏ sleep, mỗi VU sẽ nã request liên tục không nghỉ, tạo ra mô hình tải phi thực tế và thường làm sai lệch kết quả throughput.",
        "http.get returns a response object with status, body, headers and timing measurements. sleep(1) simulates 'think time' — the natural pause between a real user's actions. If you remove sleep, each VU hammers requests non-stop, creating an unrealistic load model that usually distorts throughput results.",
        "http.get はステータス・本文・ヘッダー・各種タイミング計測を含む response オブジェクトを返します。sleep(1) は「think time」、つまり実際のユーザーの操作間の自然な間を模擬します。sleep を外すと各仮想ユーザーは休みなくリクエストを連打し、非現実的な負荷モデルとなり、通常はスループットの結果を歪めます。"
      ),
      WARN(
        "Đừng quên sleep(). Một vòng lặp không có think time thường tạo tải cao giả tạo và khiến bạn kết luận sai về sức chịu của hệ thống.",
        "Do not forget sleep(). A loop without think time usually creates artificially high load and leads to wrong conclusions about system capacity.",
        "sleep() を忘れないでください。think time のないループは通常、人為的に高い負荷を生み、システム能力について誤った結論を導きます。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Kiểm tra kết quả với check()",
      en: "4. Validating responses with check()",
      ja: "4. check() によるレスポンス検証",
    },
    blocks: [
      P(
        "Gửi request thôi chưa đủ — bạn cần xác nhận hệ thống trả về đúng thứ. Hàm check() trong k6 nhận một giá trị và một tập điều kiện, trả về true/false cho mỗi điều kiện và ghi lại tỉ lệ pass. Điểm cực kỳ quan trọng và hay gây bất ngờ cho người mới: check() KHÔNG làm test fail và KHÔNG dừng lần chạy khi điều kiện sai. Nó chỉ ghi nhận. Điều này khác hẳn assertion trong test chức năng.",
        "Sending a request is not enough — you must confirm the system returns the right thing. k6's check() takes a value and a set of conditions, returns true/false per condition and records the pass rate. A critically important and often surprising point for newcomers: check() does NOT fail the test and does NOT stop the run when a condition is false. It merely records. This differs sharply from assertions in functional testing.",
        "リクエストを送るだけでは不十分で、システムが正しいものを返すか確認する必要があります。k6 の check() は値と条件の集合を受け取り、条件ごとに true/false を返して合格率を記録します。初心者が驚きやすい極めて重要な点として、check() は条件が偽でもテストを失敗させず、実行も止めません。単に記録するだけです。これは機能テストのアサーションとは大きく異なります。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');

  // check() ghi nhận pass/fail nhưng KHÔNG dừng lần chạy
  check(res, {
    'status là 200': (r) => r.status === 200,
    'thân < 100ms': (r) => r.timings.duration < 100,
    'có chữ "Collection"': (r) => r.body.includes('Collection'),
  });

  sleep(1);
}`),
      P(
        "Trong summary cuối, bạn sẽ thấy một dòng checks cho biết bao nhiêu phần trăm điều kiện đã pass. Nếu bạn muốn một điều kiện thực sự làm lần chạy THẤT BẠI (trả exit code khác 0), bạn phải dùng thresholds — chủ đề của bài nâng cao. Cặp check + threshold là nền tảng để biến k6 thành một cổng chất lượng tự động thay vì chỉ là công cụ đo.",
        "In the final summary you will see a checks line reporting the percentage of conditions passed. If you want a condition to actually FAIL the run (return a non-zero exit code), you must use thresholds — the subject of the advanced article. The check + threshold pair is the foundation for turning k6 into an automated quality gate rather than a mere measurement tool.",
        "最後のサマリーには、条件の合格率を示す checks 行が表示されます。ある条件で実際に実行を失敗させたい（ゼロ以外の終了コードを返したい）場合は、しきい値を使う必要があり、これは応用記事の主題です。check としきい値の組み合わせは、k6 を単なる計測ツールではなく自動品質ゲートに変える基盤です。"
      ),
      NOTE(
        "check() = quan sát và ghi nhận. threshold = ra quyết định pass/fail cho cả lần chạy. Hai thứ khác nhau, dùng cùng nhau.",
        "check() = observe and record. threshold = decide pass/fail for the whole run. Two different things, used together.",
        "check() は観察して記録するもの。しきい値は実行全体の合否を決めるもの。異なる二つを併用します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Options: điều khiển tải bằng vus và duration",
      en: "5. Options: controlling load with vus and duration",
      ja: "5. options：vus と duration で負荷を制御する",
    },
    blocks: [
      P(
        "Cách đơn giản nhất để áp tải là khai báo hai trường trong options: vus (số người dùng ảo đồng thời) và duration (chạy trong bao lâu). k6 sẽ khởi động đúng số VU đó và cho mỗi VU lặp default function liên tục cho tới hết thời lượng. Đây là mô hình tải phẳng — hữu ích để nắm nhanh sức chịu ở một mức cố định.",
        "The simplest way to apply load is declaring two fields in options: vus (number of concurrent virtual users) and duration (how long to run). k6 spins up exactly that many VUs and each one loops the default function continuously until the duration ends. This is a flat load model — useful for quickly gauging capacity at a fixed level.",
        "負荷をかける最も簡単な方法は、options に二つのフィールドを宣言することです。vus（同時仮想ユーザー数）と duration（実行時間）です。k6 はその数の仮想ユーザーを起動し、各仮想ユーザーは時間が尽きるまで default 関数を繰り返します。これは平坦な負荷モデルで、固定レベルでの処理能力を素早く把握するのに便利です。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { check, sleep } from 'k6';

// options nằm cùng module với default function
export const options = {
  vus: 50,          // 50 người dùng ảo đồng thời
  duration: '1m',   // chạy trong 1 phút
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}`),
      P(
        "Bạn cũng có thể ghi đè các giá trị này từ dòng lệnh mà không sửa code: k6 run --vus 100 --duration 5m script.js. Cách ghi đè qua CLI rất tiện khi cùng một kịch bản cần chạy ở nhiều mức tải khác nhau trong pipeline. Tuy nhiên, tải phẳng ít phản ánh thực tế: người dùng thật đến dần rồi rời dần. Vì vậy phần tiếp theo giới thiệu stages — cách mô hình hóa tải tăng và giảm theo thời gian.",
        "You can also override these from the command line without editing code: k6 run --vus 100 --duration 5m script.js. CLI overriding is handy when the same scenario must run at different load levels in a pipeline. However, flat load rarely mirrors reality: real users arrive gradually and leave gradually. So the next section introduces stages — how to model load ramping up and down over time.",
        "これらの値はコードを変えずにコマンドラインから上書きもできます。k6 run --vus 100 --duration 5m script.js です。CLI 上書きは、同じシナリオをパイプラインで異なる負荷レベルで実行する際に便利です。ただし平坦な負荷は現実をあまり反映しません。実際のユーザーは徐々に増え徐々に減ります。そこで次節では stages、つまり時間経過に沿って負荷を増減させるモデル化を紹介します。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Stages: mô hình hóa ramp-up và ramp-down",
      en: "6. Stages: modeling ramp-up and ramp-down",
      ja: "6. stages：ランプアップとランプダウンをモデル化する",
    },
    blocks: [
      P(
        "Thuộc tính stages cho phép mô tả tải như một chuỗi mốc: mỗi stage nói 'trong thời gian này, đưa số VU về mức target'. k6 sẽ nội suy tuyến tính giữa các mốc, tạo ra đường tăng (ramp-up), đoạn giữ (giữ tải ổn định) và đường giảm (ramp-down). Ramp-up từ từ rất quan trọng: nó làm nóng cache, kết nối pool và JIT, tránh những lỗi giả xuất hiện chỉ vì hệ thống bị dội tải đột ngột lúc khởi động.",
        "The stages property lets you describe load as a sequence of milestones: each stage says 'over this time, move the VU count toward this target'. k6 interpolates linearly between milestones, producing a ramp-up, a hold (steady load) and a ramp-down. Gradual ramp-up matters: it warms up caches, connection pools and JIT, avoiding false failures that appear merely because the system is suddenly slammed at startup.",
        "stages プロパティは、負荷を一連のマイルストーンとして記述できます。各ステージは「この時間の間に仮想ユーザー数をこのターゲットへ動かす」と指定します。k6 はマイルストーン間を線形補間し、ランプアップ、保持（安定負荷）、ランプダウンを生成します。緩やかなランプアップは重要です。キャッシュ・接続プール・JIT を温め、起動時に急に負荷を浴びせただけで現れる偽の失敗を防ぎます。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },  // ramp-up: 0 → 100 VU trong 30s
    { duration: '1m',  target: 100 },  // giữ ổn định 100 VU trong 1 phút
    { duration: '30s', target: 0 },    // ramp-down: 100 → 0 VU trong 30s
  ],
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}`),
      IMG(SVG_STAGES, "stages tạo hình tải: ramp-up, giữ, ramp-down", "stages create a load shape: ramp-up, hold, ramp-down", "stages は負荷の形（ランプアップ・保持・ランプダウン）を作ります"),
      P(
        "Hình tải này gần với đời thực hơn nhiều so với tải phẳng. Trong thực tế, đội hiệu năng thường thiết kế nhiều hình tải khác nhau để trả lời các câu hỏi rủi ro khác nhau — đó chính là các loại kiểm thử tải mà ta sẽ tổng hợp ở chương gần cuối.",
        "This load shape is far closer to real life than flat load. In practice, performance teams design several load shapes to answer different risk questions — precisely the load test types we consolidate in the near-final chapter.",
        "この負荷の形は平坦な負荷よりはるかに現実に近いものです。実務では、性能チームは異なるリスクの問いに答えるために複数の負荷の形を設計します。それが終盤の章でまとめる負荷テストの種類です。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Chạy test và đọc bản tóm tắt cuối",
      en: "7. Running the test and reading the end-of-run summary",
      ja: "7. テスト実行と終了サマリーの読み方",
    },
    blocks: [
      P(
        "Khi lần chạy kết thúc, k6 in ra một bản tóm tắt dày đặc số liệu. Người mới thường bị choáng, nhưng thực ra chỉ cần đọc kỹ ba đến bốn dòng để có kết luận. http_reqs cho biết tổng số request và tốc độ trung bình (req/s) — đây là throughput. http_req_duration là phân bố thời gian phản hồi; hãy nhìn cột p(95) chứ đừng chỉ nhìn avg. http_req_failed là tỉ lệ request lỗi — error rate. checks là phần trăm điều kiện check() đã pass.",
        "When the run ends, k6 prints a metric-dense summary. Newcomers are often overwhelmed, but in truth you only need to read three or four lines carefully to draw a conclusion. http_reqs shows total requests and the average rate (req/s) — this is throughput. http_req_duration is the response-time distribution; look at the p(95) column, not just avg. http_req_failed is the failed-request ratio — the error rate. checks is the percentage of check() conditions that passed.",
        "実行が終わると、k6 は指標が密に詰まったサマリーを出力します。初心者は圧倒されがちですが、実際は結論を出すのに三〜四行を注意深く読むだけで十分です。http_reqs は総リクエスト数と平均レート（req/s）を示し、これがスループットです。http_req_duration は応答時間の分布で、avg だけでなく p(95) 列を見ます。http_req_failed は失敗リクエスト率、つまりエラー率です。checks は check() 条件の合格率です。"
      ),
      CODE("text", `     http_reqs..............: 74250   1237.5/s     ← throughput ≈ 1237 req/s
     http_req_duration......: avg=41ms min=12ms med=35ms max=982ms
                              p(90)=68ms  p(95)=98ms   ← latency đọc ở p95
     http_req_failed........: 0.31%   231 out of 74250 ← error rate 0.31%
     checks.................: 99.69%  73981 out of 74212
     iterations.............: 74250   1237.5/s
     vus....................: 100     min=1  max=100`),
      IMG(SVG_SUMMARY, "Ba chỉ số quyết định: throughput, p95 latency, error rate", "The three decisive metrics: throughput, p95 latency, error rate", "決定的な三指標：スループット、p95 レイテンシ、エラー率"),
      P(
        "Nguyên tắc đọc: đừng nhìn từng con số một cách cô lập. Một hệ thống đạt throughput cao nhưng p95 latency 5 giây là hệ thống tệ. Một hệ thống latency thấp nhưng error rate 8% là hệ thống hỏng. Chỉ khi cả ba chỉ số đều nằm trong ngưỡng chấp nhận thì bạn mới kết luận hệ thống 'chịu được' mức tải đã thử.",
        "Reading principle: never look at a single number in isolation. A system with high throughput but 5-second p95 latency is a bad system. A system with low latency but 8% error rate is a broken system. Only when all three metrics sit within acceptable thresholds can you conclude the system 'handles' the tested load.",
        "読み方の原則として、一つの数字を単独で見てはいけません。スループットが高くても p95 レイテンシが5秒なら悪いシステムです。レイテンシが低くてもエラー率が8%なら壊れたシステムです。三つの指標すべてが許容しきい値内にあって初めて、システムが試験した負荷に「耐える」と結論できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Đo cái gì cho đúng: latency phía client vs phía server",
      en: "8. Measuring the right thing: client-side vs server-side latency",
      ja: "8. 正しく測る：クライアント側とサーバー側のレイテンシ",
    },
    blocks: [
      P(
        "k6 đo latency ở phía client — tức là toàn bộ thời gian từ khi VU gửi request đến khi nhận đủ phản hồi, bao gồm cả thời gian đi qua mạng và hàng đợi. Con số này quan trọng vì nó gần với trải nghiệm người dùng cuối. Nhưng khi điều tra nguyên nhân chậm, bạn cần đối chiếu với latency phía server (thời gian xử lý thực trong ứng dụng). Nếu client thấy 500ms nhưng server báo chỉ xử lý 50ms, phần chênh 450ms đang nằm ở mạng, cân bằng tải, hoặc hàng đợi kết nối.",
        "k6 measures latency client-side — the full time from when a VU sends a request to receiving the complete response, including network transit and queuing. This number matters because it is close to the end-user experience. But when investigating slowness, you must cross-check with server-side latency (actual processing time inside the app). If the client sees 500ms but the server reports only 50ms of processing, the missing 450ms lives in the network, load balancer or connection queue.",
        "k6 はレイテンシをクライアント側で測ります。つまり仮想ユーザーがリクエストを送ってから完全な応答を受け取るまでの全時間で、ネットワーク通過やキュー待ちも含みます。この数値はエンドユーザー体験に近いため重要です。しかし遅さの原因を調べる際は、サーバー側レイテンシ（アプリ内の実処理時間）と突き合わせる必要があります。クライアントが500msでもサーバーが処理50msと報告するなら、差の450msはネットワーク・ロードバランサ・接続キューにあります。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  // res.timings phân rã latency phía client thành từng chặng:
  //   blocked, connecting, tls_handshaking, sending, waiting, receiving
  console.log('waiting (TTFB):', res.timings.waiting);   // thời gian chờ server
  console.log('receiving     :', res.timings.receiving); // thời gian tải body
  sleep(1);
}`),
      P(
        "Trường res.timings.waiting (còn gọi là Time To First Byte) thường là phần phản ánh gánh nặng xử lý phía server rõ nhất, trong khi receiving phản ánh kích thước phản hồi và băng thông. Việc phân rã này giúp bạn không đổ lỗi nhầm: một API trả JSON khổng lồ có thể chậm ở receiving chứ không phải do logic server yếu.",
        "The res.timings.waiting field (also called Time To First Byte) usually best reflects the server-side processing burden, while receiving reflects response size and bandwidth. This breakdown keeps you from misattributing blame: an API returning a huge JSON may be slow in receiving rather than because of weak server logic.",
        "res.timings.waiting フィールド（Time To First Byte とも呼ばれます）は通常、サーバー側の処理負担を最もよく反映し、receiving は応答サイズと帯域幅を反映します。この分解により責任を取り違えずに済みます。巨大な JSON を返す API はサーバーロジックが弱いのではなく receiving で遅い場合があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Năm loại kiểm thử tải và câu hỏi mỗi loại trả lời",
      en: "9. Five load test types and the question each answers",
      ja: "9. 五つの負荷テストの種類と各々が答える問い",
    },
    blocks: [
      P(
        "Không có một 'bài test tải' duy nhất. Cộng đồng k6 phân loại theo hình dạng tải, mỗi loại phục vụ một mục đích rủi ro riêng. Smoke test dùng tải rất nhỏ (1–2 VU) chỉ để xác nhận script và hệ thống hoạt động cơ bản — chạy nhanh trước mỗi lần thay đổi. Load test đưa hệ thống tới mức tải kỳ vọng ở giờ cao điểm để kiểm chứng nó đáp ứng SLA. Stress test đẩy vượt mức kỳ vọng để tìm điểm gãy và quan sát cách hệ thống suy giảm.",
        "There is no single 'load test'. The k6 community classifies by load shape, each serving a distinct risk purpose. A smoke test uses very small load (1–2 VUs) just to confirm the script and system basically work — run quickly before every change. A load test brings the system to expected peak-hour load to verify it meets the SLA. A stress test pushes beyond expectation to find the breaking point and observe how the system degrades.",
        "単一の「負荷テスト」は存在しません。k6 コミュニティは負荷の形で分類し、各々が異なるリスク目的を担います。スモークテストは非常に小さな負荷（1〜2 仮想ユーザー）で、スクリプトとシステムが基本的に動くか確認するだけで、変更のたびに素早く実行します。ロードテストはシステムを想定ピーク時負荷まで導き、SLA を満たすか検証します。ストレステストは想定を超えて押し、破綻点を見つけ、システムの劣化の仕方を観察します。"
      ),
      IMG(SVG_TEST_TYPES, "Hình dạng tải của smoke, load, stress, spike, soak", "Load shapes of smoke, load, stress, spike, soak", "スモーク・ロード・ストレス・スパイク・ソークの負荷の形"),
      UL(
        ["Smoke — tải tối thiểu, kiểm tra script/hệ thống sống", "Load — tải kỳ vọng, kiểm chứng SLA giờ cao điểm", "Stress — vượt kỳ vọng, tìm điểm gãy", "Spike — tăng vọt đột ngột rồi rút, mô phỏng viral/flash sale", "Soak — tải vừa kéo dài nhiều giờ, tìm rò rỉ/tích tụ"],
        ["Smoke — minimal load, checks script/system is alive", "Load — expected load, verifies peak-hour SLA", "Stress — beyond expectation, finds the breaking point", "Spike — sudden surge then withdrawal, simulates viral/flash sale", "Soak — moderate load over many hours, finds leaks/accumulation"],
        ["スモーク — 最小負荷、スクリプト/システムの生存確認", "ロード — 想定負荷、ピーク時 SLA の検証", "ストレス — 想定超え、破綻点の発見", "スパイク — 急増後の急減、バイラル/フラッシュセールを模擬", "ソーク — 中程度の負荷を数時間、漏れ/蓄積を発見"]
      ),
      P(
        "Spike test mô phỏng những cú tăng vọt đột ngột — ví dụ một chiến dịch fintech hoàn tiền được lan truyền, hàng chục nghìn người đổ vào trong vài phút rồi biến mất. Soak test (còn gọi endurance) giữ tải vừa phải trong nhiều giờ để phát hiện các vấn đề chỉ lộ ra theo thời gian như rò rỉ bộ nhớ hay đầy đĩa log. Chọn đúng loại test là kỹ năng lớn hơn cả việc viết script.",
        "A spike test simulates sudden surges — for example a fintech cashback campaign going viral, tens of thousands pouring in within minutes then vanishing. A soak test (also called endurance) holds moderate load for many hours to reveal problems that only surface over time, such as memory leaks or filling log disks. Choosing the right test type is a bigger skill than writing the script.",
        "スパイクテストは急な急増を模擬します。例えばフィンテックのキャッシュバックキャンペーンがバイラル化し、数分で何万人も殺到して消えるような場合です。ソークテスト（耐久テストとも）は中程度の負荷を数時間保ち、メモリ漏れやログディスク逼迫など時間経過でしか現れない問題を明らかにします。適切なテスト種類の選択はスクリプト作成より大きなスキルです。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Tình huống thực chiến: sự cố cổng thanh toán ngày lương",
      en: "10. Real-world scenario: a payday payment-gateway incident",
      ja: "10. 実戦シナリオ：給料日の決済ゲートウェイ障害",
    },
    blocks: [
      SCEN(
        "Cổng thanh toán chậm vào giờ cao điểm",
        "Payment gateway slows at peak hour",
        "Một ví điện tử fintech nhận báo cáo rằng giao dịch bị chậm và một số bị timeout vào khoảng 9–10 giờ sáng các ngày cuối tháng. Đội hiệu năng dựng một load test k6 mô phỏng luồng 'đăng nhập → xem số dư → chuyển khoản', ramp-up tới mức tải quan sát được trên hệ thống giám sát giờ cao điểm. Ở mức đó, p95 latency của bước chuyển khoản vọt từ 300ms lên 4.2 giây và error rate chạm 6%, dù CPU server mới ở 55%. Manh mối 'CPU thấp mà vẫn chậm' chỉ tới nghẽn ở tầng khác chứ không phải thiếu CPU.",
        "A fintech e-wallet receives reports that transactions slow down and some time out around 9–10 a.m. at month-end. The performance team builds a k6 load test simulating the 'log in → check balance → transfer' flow, ramping up to the load observed on peak-hour monitoring. At that level, the transfer step's p95 latency jumps from 300ms to 4.2 seconds and error rate hits 6%, even though server CPU is only at 55%. The clue 'low CPU yet still slow' points to a bottleneck in another layer, not a CPU shortage.",
        "あるフィンテックの電子ウォレットが、月末の午前9〜10時頃に取引が遅くなり一部がタイムアウトするとの報告を受けます。性能チームは「ログイン→残高確認→送金」フローを模擬する k6 ロードテストを構築し、ピーク時監視で観測された負荷までランプアップします。そのレベルで送金ステップの p95 レイテンシは300msから4.2秒へ跳ね上がり、エラー率は6%に達しますが、サーバー CPU はわずか55%です。「CPU は低いのに遅い」という手がかりは、CPU 不足ではなく別の層のボトルネックを指しています。"
      ),
      P(
        "Bằng cách phân rã res.timings, đội thấy waiting (TTFB) chiếm gần như toàn bộ độ trễ. Đối chiếu với chỉ số phía server, họ phát hiện connection pool tới cơ sở dữ liệu bị cạn: các VU phải xếp hàng chờ một kết nối rảnh. Tăng kích thước pool và thêm chỉ mục cho truy vấn số dư đưa p95 về 350ms. Bài học: k6 không tự sửa lỗi, nhưng nó tái hiện được sự cố một cách có kiểm soát để đội tìm ra nguyên nhân gốc.",
        "By decomposing res.timings, the team finds that waiting (TTFB) accounts for almost all the delay. Cross-checking server-side metrics, they discover the database connection pool is exhausted: VUs queue waiting for a free connection. Enlarging the pool and adding an index for the balance query brings p95 back to 350ms. The lesson: k6 does not fix the bug, but it reproduces the incident in a controlled way so the team can find the root cause.",
        "res.timings を分解すると、チームは waiting（TTFB）が遅延のほぼ全てを占めることを発見します。サーバー側指標と突き合わせると、データベースの接続プールが枯渇していることが判明します。仮想ユーザーは空き接続を待って並ぶのです。プールサイズの拡大と残高クエリへのインデックス追加で p95 は350msに戻ります。教訓は、k6 はバグを直しませんが、障害を制御された形で再現し、チームが根本原因を見つけられるようにすることです。"
      ),
      TIP(
        "Khi CPU thấp mà latency vẫn cao, hãy nghi ngờ các nguồn tài nguyên hữu hạn khác: connection pool, thread pool, lock, hàng đợi — không phải lúc nào cũng do thiếu CPU.",
        "When CPU is low but latency stays high, suspect other finite resources: connection pool, thread pool, locks, queues — it is not always a CPU shortage.",
        "CPU が低いのにレイテンシが高いときは、他の有限資源を疑います。接続プール・スレッドプール・ロック・キューなどで、常に CPU 不足とは限りません。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Sai lầm phổ biến của người mới với k6",
      en: "11. Common beginner mistakes with k6",
      ja: "11. k6 初心者のよくある誤り",
    },
    blocks: [
      P(
        "Nhiều kết luận hiệu năng sai không đến từ hệ thống mà đến từ script test viết ẩu. Sai lầm số một là chạy tải từ một máy quá yếu hoặc mạng quá kém: khi ấy chính máy sinh tải mới là nút thắt, và bạn đo giới hạn của công cụ chứ không phải của hệ thống. Sai lầm số hai là bỏ sleep(), khiến mô hình tải phi thực tế. Sai lầm số ba là chỉ nhìn giá trị trung bình mà bỏ qua p95/p99.",
        "Many wrong performance conclusions come not from the system but from sloppily written test scripts. The number-one mistake is running load from a machine that is too weak or a network too poor: then the load generator itself is the bottleneck, and you measure the tool's limit, not the system's. The second mistake is dropping sleep(), yielding an unrealistic load model. The third is looking only at the average and ignoring p95/p99.",
        "多くの誤った性能結論は、システムではなく雑に書かれたテストスクリプトから生じます。第一の誤りは、弱すぎるマシンや貧弱すぎるネットワークから負荷をかけることです。その場合、負荷生成側がボトルネックとなり、システムではなくツールの限界を測ってしまいます。第二の誤りは sleep() を省き、非現実的な負荷モデルにすることです。第三は平均だけを見て p95/p99 を無視することです。"
      ),
      UL(
        ["Máy sinh tải yếu → đo giới hạn công cụ, không phải hệ thống", "Bỏ sleep() → mô hình tải sai lệch", "Chỉ nhìn avg, bỏ p95/p99 → che giấu người dùng chậm nhất", "Test thẳng lên production mà không cảnh báo → gây sự cố thật", "Không kiểm tra body → status 200 nhưng nội dung lỗi vẫn 'pass'"],
        ["Weak load generator → measures tool limit, not the system", "Dropping sleep() → distorted load model", "Only looking at avg, ignoring p95/p99 → hides slowest users", "Testing straight on production without warning → causes a real incident", "Not checking body → status 200 but error content still 'passes'"],
        ["弱い負荷生成機 → システムでなくツールの限界を測る", "sleep() 省略 → 歪んだ負荷モデル", "avg だけ見て p95/p99 無視 → 最も遅いユーザーを隠す", "警告なしに本番へ直接テスト → 実障害を引き起こす", "本文未検証 → ステータス200でもエラー内容が「合格」に"]
      ),
      WARN(
        "Không bao giờ chạy stress/spike test lên môi trường production mà không có sự đồng ý và cửa sổ bảo trì — bạn có thể tự gây ra sự cố mình đang cố phòng ngừa.",
        "Never run stress/spike tests against production without consent and a maintenance window — you may cause the very incident you are trying to prevent.",
        "同意とメンテナンス枠なしに本番へストレス/スパイクテストを実行してはいけません。防ごうとしている障害を自ら引き起こしかねません。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Hỏi & Đáp nền tảng k6",
      en: "12. k6 foundations Q&A",
      ja: "12. k6 基礎 Q&A",
    },
    blocks: [
      QA(
        "k6 khác JMeter ở điểm nào?",
        "How does k6 differ from JMeter?",
        "k6 viết kịch bản bằng JavaScript và chạy trên nhân Go, nhẹ tài nguyên, thân thiện với quy trình code (git, code review, CI). JMeter dùng giao diện đồ họa/XML, mạnh về plugin và giao thức đa dạng nhưng nặng hơn khi tạo nhiều VU. Nhiều đội chọn k6 vì kịch bản là code, dễ đưa vào pipeline như một cổng chất lượng.",
        "k6 scripts in JavaScript and runs on a Go engine, resource-light and developer-friendly (git, code review, CI). JMeter uses a GUI/XML, strong on plugins and diverse protocols but heavier when generating many VUs. Many teams pick k6 because scripts are code, easy to put in a pipeline as a quality gate.",
        "k6 の違いは何ですか？",
        "k6 は JavaScript でスクリプトを書き Go エンジンで動作し、資源が軽く開発フロー（git・コードレビュー・CI）に馴染みます。JMeter は GUI/XML を使い、プラグインや多様なプロトコルに強い一方、多数の仮想ユーザー生成では重くなります。多くのチームはスクリプトがコードでパイプラインに品質ゲートとして組み込みやすいため k6 を選びます。"
      ),
      QA(
        "Bao nhiêu VU là 'đủ' cho một bài test?",
        "How many VUs are 'enough' for a test?",
        "Không có con số cố định — VU không phải mục tiêu. Hãy bắt đầu từ tải mục tiêu theo nghiệp vụ (ví dụ 1000 req/s giờ cao điểm) rồi tăng VU cho tới khi đạt mức throughput đó, đồng thời theo dõi p95 latency và error rate. Nếu tăng VU mà throughput không tăng nữa, bạn đã chạm giới hạn hệ thống.",
        "There is no fixed number — VUs are not the goal. Start from a business target load (e.g. 1000 req/s at peak) then raise VUs until you reach that throughput, while watching p95 latency and error rate. If adding VUs no longer increases throughput, you have hit the system's limit.",
        "テストに『十分な』仮想ユーザー数はいくつですか？",
        "固定の数はなく、仮想ユーザーは目標ではありません。業務上の目標負荷（例：ピーク時1000 req/s）から始め、そのスループットに達するまで仮想ユーザーを増やしつつ、p95 レイテンシとエラー率を監視します。仮想ユーザーを増やしてもスループットが上がらなければ、システムの限界に達しています。"
      ),
      QA(
        "Vì sao check() không làm test fail?",
        "Why doesn't check() fail the test?",
        "Đây là thiết kế có chủ đích. Trong test tải, một vài lỗi lẻ dưới áp lực là bình thường; bạn không muốn cả lần chạy dừng vì một request lỗi. check() ghi nhận tỉ lệ để bạn thấy bức tranh tổng thể. Muốn ra quyết định pass/fail cho cả lần chạy (exit code), bạn dùng thresholds — kết hợp check + threshold để có cổng tự động.",
        "This is intentional design. In load testing, a few isolated errors under pressure are normal; you do not want the whole run to stop over one failed request. check() records the rate so you see the overall picture. To make a pass/fail decision for the whole run (exit code), you use thresholds — combine check + threshold for an automated gate.",
        "なぜ check() はテストを失敗させないのですか？",
        "これは意図的な設計です。負荷テストでは圧力下の少数の単発エラーは正常で、一つの失敗リクエストで実行全体を止めたくありません。check() は率を記録し全体像を見せます。実行全体の合否判定（終了コード）にはしきい値を使い、check としきい値を組み合わせて自動ゲートにします。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Thresholds & Scenarios (ecommerce, nangcao)
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Từ đo lường đến ra quyết định: vì sao cần thresholds",
      en: "1. From measuring to deciding: why thresholds matter",
      ja: "1. 計測から意思決定へ：なぜしきい値が重要か",
    },
    blocks: [
      P(
        "Ở mức nền tảng, k6 đo và in số liệu — nhưng con người vẫn phải nhìn và phán đoán. Trong một hệ thống thương mại điện tử với hàng chục pipeline mỗi ngày, việc để người đọc summary bằng mắt là không khả thi. Thresholds biến k6 từ công cụ đo thành công cụ ra quyết định: bạn khai báo các điều kiện pass/fail dựa trên metric, và nếu bất kỳ điều kiện nào bị vi phạm, k6 trả về exit code khác 0 — đủ để một pipeline tự động chặn việc phát hành.",
        "At the foundation level, k6 measures and prints numbers — but a human still has to look and judge. In an e-commerce system with dozens of pipelines a day, having people eyeball summaries is not feasible. Thresholds turn k6 from a measuring tool into a decision tool: you declare pass/fail conditions based on metrics, and if any condition is violated, k6 returns a non-zero exit code — enough for an automated pipeline to block the release.",
        "基礎レベルでは k6 は計測して数値を出力しますが、人間が見て判断する必要が残ります。一日に何十ものパイプラインを持つ EC システムでは、人がサマリーを目視するのは現実的ではありません。しきい値は k6 を計測ツールから意思決定ツールへ変えます。指標に基づく合否条件を宣言し、どれかが違反されると k6 はゼロ以外の終了コードを返します。これは自動パイプラインがリリースを止めるのに十分です。"
      ),
      P(
        "Bài viết này đi sâu vào ba trụ cột nâng cao của k6: thresholds làm cổng pass/fail, scenarios & executors để tạo mô hình tải thực tế (đặc biệt là arrival-rate cho RPS ổn định), và custom metrics để đo những gì có ý nghĩa nghiệp vụ. Cuối cùng ta ghép chúng lại thành một mô hình lưu lượng giống thật cho một sàn TMĐT vào mùa cao điểm.",
        "This article dives into three advanced pillars of k6: thresholds as pass/fail gates, scenarios & executors for realistic load models (especially arrival-rate for steady RPS), and custom metrics for measuring what matters to the business. Finally we assemble them into a lifelike traffic model for an e-commerce marketplace during peak season.",
        "本記事では k6 の三つの応用の柱を掘り下げます。合否ゲートとしてのしきい値、現実的な負荷モデルのためのシナリオとエグゼキュータ（特に安定 RPS のための到着率）、そして業務にとって重要なものを測るカスタム指標です。最後にこれらを組み合わせ、繁忙期の EC マーケットプレイスに向けた本物らしいトラフィックモデルを構築します。"
      ),
      NOTE(
        "checks nói 'bao nhiêu phần trăm điều kiện đúng'. thresholds nói 'lần chạy này ĐẠT hay TRƯỢT'. Chỉ thresholds mới ảnh hưởng exit code.",
        "checks say 'what percentage of conditions passed'. thresholds say 'did this run PASS or FAIL'. Only thresholds affect the exit code.",
        "checks は「条件の何%が合格したか」を示します。しきい値は「この実行が合格か不合格か」を示します。終了コードに影響するのはしきい値だけです。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Cú pháp thresholds và ngữ nghĩa vi phạm",
      en: "2. Threshold syntax and violation semantics",
      ja: "2. しきい値の構文と違反の意味論",
    },
    blocks: [
      P(
        "Thresholds được khai báo trong options.thresholds, khóa là tên metric và giá trị là mảng biểu thức. Mỗi biểu thức dùng một hàm tổng hợp (p(95), avg, rate, count, max...) so với một ngưỡng. Nếu biểu thức sai vào cuối lần chạy, threshold đó bị coi là thất bại. Ví dụ kinh điển: 'http_req_duration': ['p(95)<500'] nghĩa là 95% request phải nhanh hơn 500ms, nếu không lần chạy trượt.",
        "Thresholds are declared in options.thresholds, keyed by metric name with an array of expressions as value. Each expression uses an aggregation function (p(95), avg, rate, count, max...) compared to a limit. If an expression is false at the end of the run, that threshold has failed. The classic example: 'http_req_duration': ['p(95)<500'] means 95% of requests must be faster than 500ms, otherwise the run fails.",
        "しきい値は options.thresholds に、指標名をキーとし式の配列を値として宣言します。各式は集計関数（p(95)・avg・rate・count・max など）を使い上限と比較します。実行終了時に式が偽なら、そのしきい値は失敗です。定番の例として 'http_req_duration': ['p(95)<500'] は、95%のリクエストが500msより速くなければならず、そうでなければ実行は失敗する意味です。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '2m',  target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    // 95% request nhanh hơn 500ms VÀ 99% nhanh hơn 1.5s
    http_req_duration: ['p(95)<500', 'p(99)<1500'],
    // tỉ lệ lỗi phải dưới 1%
    http_req_failed: ['rate<0.01'],
    // ít nhất 99% checks phải pass
    checks: ['rate>0.99'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}`),
      P(
        "Một tính năng mạnh là abortOnFail: nếu một threshold quan trọng bị vi phạm sớm, bạn có thể yêu cầu k6 dừng ngay lần chạy thay vì lãng phí thời gian tiếp tục áp tải lên một hệ thống rõ ràng đã hỏng. Điều này đặc biệt hữu ích trong CI, nơi thời gian pipeline là tiền.",
        "A powerful feature is abortOnFail: if a critical threshold is violated early, you can ask k6 to abort the run immediately instead of wasting time continuing to load an already-broken system. This is especially useful in CI, where pipeline time is money.",
        "強力な機能に abortOnFail があります。重要なしきい値が早期に違反された場合、明らかに壊れたシステムへ負荷をかけ続けて時間を浪費する代わりに、k6 に即座に実行を中止させられます。パイプライン時間がコストとなる CI で特に有用です。"
      ),
      CODE("javascript", `export const options = {
  thresholds: {
    http_req_failed: [
      // dừng ngay lần chạy nếu tỉ lệ lỗi vượt 5% sau 10s đầu
      { threshold: 'rate<0.05', abortOnFail: true, delayAbortEval: '10s' },
    ],
  },
};`),
      WARN(
        "Đặt ngưỡng theo SLA nghiệp vụ thật, không phải con số cho đẹp. Ngưỡng quá lỏng thì cổng vô dụng; quá chặt thì pipeline đỏ liên tục và đội sẽ bỏ qua nó.",
        "Set thresholds from real business SLAs, not vanity numbers. Too loose and the gate is useless; too strict and the pipeline is constantly red and the team will start ignoring it.",
        "しきい値は見栄えの数字でなく実際の業務 SLA から設定します。緩すぎればゲートは無意味、厳しすぎればパイプラインが常に赤くなりチームは無視し始めます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Scenarios: nhiều kịch bản trong một lần chạy",
      en: "3. Scenarios: multiple workloads in one run",
      ja: "3. シナリオ：一度の実行で複数のワークロード",
    },
    blocks: [
      P(
        "options.scenarios cho phép định nghĩa nhiều kịch bản độc lập chạy song song trong cùng một lần k6 run, mỗi kịch bản có executor riêng, thời điểm bắt đầu riêng, và có thể gọi một hàm exec khác nhau. Đây là bước tiến lớn so với một default function duy nhất: một sàn TMĐT thực tế có người duyệt sản phẩm, người tìm kiếm, người thanh toán — mỗi nhóm có tần suất và tỉ trọng khác nhau.",
        "options.scenarios lets you define multiple independent scenarios running in parallel within one k6 run, each with its own executor, its own start time, and possibly calling a different exec function. This is a big step beyond a single default function: a real e-commerce marketplace has browsers, searchers and checkout users — each group with a different frequency and weight.",
        "options.scenarios は、一度の k6 実行内で並行して動く複数の独立シナリオを定義できます。各々が独自のエグゼキュータ、独自の開始時刻を持ち、異なる exec 関数を呼べます。これは単一の default 関数からの大きな前進です。実際の EC マーケットプレイスには閲覧者・検索者・決済者がおり、各グループの頻度と比重は異なります。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browsing: {
      executor: 'ramping-vus',
      exec: 'browse',            // gọi hàm browse()
      startVUs: 0,
      stages: [
        { duration: '1m', target: 300 },
        { duration: '3m', target: 300 },
      ],
    },
    checkout: {
      executor: 'constant-arrival-rate',
      exec: 'checkout',          // gọi hàm checkout()
      rate: 50, timeUnit: '1s',  // giữ ổn định 50 đơn/giây
      duration: '4m',
      preAllocatedVUs: 100, maxVUs: 300,
    },
  },
};

export function browse() {
  http.get('https://test.k6.io/products');
  sleep(2);
}
export function checkout() {
  http.post('https://test.k6.io/checkout', JSON.stringify({ id: 1 }));
  sleep(1);
}`),
      P(
        "Mỗi kịch bản đóng góp metric riêng nhưng vẫn gộp vào bức tranh tổng. Bạn có thể mô phỏng đồng thời một dòng duyệt sản phẩm nặng (nhiều VU) và một dòng thanh toán đòi hỏi RPS ổn định — phản ánh đúng bản chất khác nhau của hai luồng nghiệp vụ.",
        "Each scenario contributes its own metrics while still folding into the overall picture. You can simulate a heavy product-browsing stream (many VUs) and a checkout stream demanding steady RPS simultaneously — accurately reflecting the different natures of the two business flows.",
        "各シナリオは独自の指標に貢献しつつ、全体像にも組み込まれます。重い商品閲覧の流れ（多数の仮想ユーザー）と、安定 RPS を要求する決済の流れを同時に模擬でき、二つの業務フローの異なる性質を正確に反映します。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Executors: VU-based vs arrival-rate",
      en: "4. Executors: VU-based vs arrival-rate",
      ja: "4. エグゼキュータ：仮想ユーザー基準 vs 到着率",
    },
    blocks: [
      P(
        "Executor quyết định cách k6 điều phối công việc. Nhóm dựa trên VU (constant-vus, ramping-vus) điều khiển số người dùng đồng thời — đây là mô hình đóng (closed model): một VU chỉ bắt đầu iteration mới sau khi iteration trước xong. Hệ quả quan trọng: nếu server chậm lại, RPS thực tế tự tụt xuống, vì VU phải chờ. Nhóm này hợp để trả lời 'nếu có N người đang online cùng lúc thì sao'.",
        "The executor decides how k6 schedules work. The VU-based group (constant-vus, ramping-vus) controls concurrent users — this is a closed model: a VU only starts a new iteration after the previous one finishes. An important consequence: if the server slows down, actual RPS drops by itself because VUs must wait. This group suits answering 'what if N users are online at once'.",
        "エグゼキュータは k6 が作業をどう調整するかを決めます。仮想ユーザー基準グループ（constant-vus・ramping-vus）は同時ユーザー数を制御します。これはクローズドモデルで、仮想ユーザーは前のイテレーション終了後にのみ新しいイテレーションを開始します。重要な帰結として、サーバーが遅くなると仮想ユーザーは待たねばならず、実際の RPS は自ずと下がります。このグループは「N人が同時にオンラインならどうなるか」に答えるのに適します。"
      ),
      P(
        "Nhóm dựa trên tần suất đến (constant-arrival-rate, ramping-arrival-rate) là mô hình mở (open model): k6 khởi động iteration mới theo một nhịp cố định (ví dụ 50 iteration/giây) bất kể iteration cũ đã xong chưa, tự cấp thêm VU từ pool khi cần. Đây là mô hình phản ánh lưu lượng thật tốt hơn, vì lưu lượng internet đến theo req/s chứ không phải theo 'số người đang chờ'. Nếu server chậm, số VU đang hoạt động sẽ phình lên — chính điều đó phơi bày vấn đề capacity.",
        "The arrival-rate group (constant-arrival-rate, ramping-arrival-rate) is an open model: k6 launches new iterations at a fixed pace (e.g. 50 iterations/second) regardless of whether old ones finished, allocating more VUs from a pool as needed. This model reflects real traffic better, because internet traffic arrives as req/s, not as 'number of people waiting'. If the server slows, the number of active VUs balloons — which is exactly what exposes capacity problems.",
        "到着率グループ（constant-arrival-rate・ramping-arrival-rate）はオープンモデルです。k6 は古いイテレーションが終わったかに関係なく固定ペース（例：毎秒50イテレーション）で新しいイテレーションを開始し、必要に応じてプールから仮想ユーザーを追加します。このモデルは実トラフィックをよりよく反映します。インターネットのトラフィックは「待っている人数」でなく req/s で到着するからです。サーバーが遅くなると稼働中の仮想ユーザー数が膨らみ、それがまさに容量問題を露呈します。"
      ),
      IMG(SVG_EXECUTORS, "Closed model (ramping-vus) vs open model (arrival-rate)", "Closed model (ramping-vus) vs open model (arrival-rate)", "クローズドモデル（ramping-vus）vs オープンモデル（到着率）"),
      TIP(
        "Muốn kiểm chứng SLA theo RPS (ví dụ 'chịu 1000 req/s'), hãy dùng arrival-rate. Muốn mô phỏng 'số người online', dùng ramping-vus.",
        "To verify an RPS-based SLA (e.g. 'handle 1000 req/s'), use arrival-rate. To simulate 'number online', use ramping-vus.",
        "RPS 基準の SLA（例：「1000 req/s に耐える」）を検証するなら到着率を、「オンライン人数」を模擬するなら ramping-vus を使います。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Custom metrics: Counter, Gauge, Rate, Trend",
      en: "5. Custom metrics: Counter, Gauge, Rate, Trend",
      ja: "5. カスタム指標：Counter、Gauge、Rate、Trend",
    },
    blocks: [
      P(
        "Ngoài metric dựng sẵn, k6 cho bạn tạo metric riêng để đo những gì có nghĩa với nghiệp vụ. Có bốn loại. Counter cộng dồn một con số (số đơn đặt thành công). Gauge lưu giá trị cuối cùng (kích thước giỏ hàng gần nhất). Rate theo dõi tỉ lệ true/false (tỉ lệ đơn có mã giảm giá). Trend thu thập phân bố để tính p95/p99 (thời gian riêng của bước 'thêm vào giỏ').",
        "Beyond built-in metrics, k6 lets you create custom metrics to measure what matters to the business. There are four types. Counter accumulates a number (successfully placed orders). Gauge stores the last value (most recent cart size). Rate tracks a true/false ratio (share of orders with a discount code). Trend collects a distribution to compute p95/p99 (the dedicated time of the 'add to cart' step).",
        "組み込み指標に加え、k6 は業務にとって重要なものを測るカスタム指標を作れます。四種類あります。Counter は数を累積します（成功した注文数）。Gauge は最後の値を保持します（直近のカートサイズ）。Rate は true/false の比率を追跡します（割引コード付き注文の割合）。Trend は分布を収集し p95/p99 を計算します（「カート追加」ステップ専用の時間）。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { Counter, Rate, Trend } from 'k6/metrics';
import { check, sleep } from 'k6';

// Khai báo metric riêng ở phạm vi module
const ordersPlaced = new Counter('orders_placed');
const couponUsed   = new Rate('coupon_used');
const addToCartTime = new Trend('add_to_cart_ms', true);

export const options = {
  thresholds: {
    // đặt threshold TRÊN custom metric, y như metric dựng sẵn
    'add_to_cart_ms': ['p(95)<800'],
    'orders_placed':  ['count>1000'],
  },
};

export default function () {
  const t0 = Date.now();
  const res = http.post('https://test.k6.io/cart', JSON.stringify({ sku: 'A1' }));
  addToCartTime.add(Date.now() - t0);            // ghi vào Trend
  const ok = check(res, { 'added': (r) => r.status === 201 });
  if (ok) ordersPlaced.add(1);                   // ghi vào Counter
  couponUsed.add(res.json('hasCoupon') === true); // ghi vào Rate
  sleep(1);
}`),
      IMG(SVG_CUSTOM_METRICS, "Bốn loại metric và ý nghĩa từng loại", "The four metric types and what each means", "四つの指標型と各々の意味"),
      P(
        "Sức mạnh thực sự lộ ra khi bạn đặt threshold trên custom metric: giờ bạn có thể fail một lần chạy vì 'thời gian thêm vào giỏ p95 vượt 800ms' — một tiêu chí nghiệp vụ, không chỉ là tiêu chí HTTP thô. Đây là cách biến k6 thành công cụ nói ngôn ngữ của sản phẩm chứ không chỉ ngôn ngữ hạ tầng.",
        "The real power emerges when you set a threshold on a custom metric: now you can fail a run because 'add-to-cart p95 exceeded 800ms' — a business criterion, not just a raw HTTP one. This is how you make k6 speak the language of the product rather than only the language of infrastructure.",
        "真の力はカスタム指標にしきい値を設定したときに現れます。今や「カート追加 p95 が800msを超えた」という業務基準で実行を失敗させられます。生の HTTP 基準だけではありません。これが k6 をインフラの言語だけでなく製品の言語で語らせる方法です。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Tags và groups: cắt lát dữ liệu theo bước nghiệp vụ",
      en: "6. Tags and groups: slicing data by business step",
      ja: "6. タグとグループ：業務ステップでデータを切り分ける",
    },
    blocks: [
      P(
        "Khi một kịch bản có nhiều request khác nhau, metric gộp chung sẽ che giấu chi tiết. Tags cho phép gắn nhãn key-value lên từng request để sau đó lọc metric theo nhãn. Groups gom nhiều bước thành một khối logic (ví dụ 'Checkout') để đọc thời gian của cả khối. Nhờ vậy bạn có thể trả lời câu hỏi 'p95 của riêng bước thanh toán là bao nhiêu' thay vì chỉ 'p95 của toàn bộ request'.",
        "When a scenario has many different requests, aggregated metrics hide detail. Tags let you attach key-value labels to individual requests so you can later filter metrics by label. Groups bundle several steps into one logical block (e.g. 'Checkout') to read the block's timing. This lets you answer 'what is the p95 of the checkout step alone' instead of only 'the p95 of all requests'.",
        "シナリオに多くの異なるリクエストがあると、集約指標は詳細を隠します。タグは個々のリクエストにキー・バリューのラベルを付け、後でラベルごとに指標をフィルタできます。グループは複数のステップを一つの論理ブロック（例：「Checkout」）にまとめ、そのブロックのタイミングを読めます。これにより「全リクエストの p95」だけでなく「決済ステップ単独の p95」に答えられます。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { group, sleep } from 'k6';

export default function () {
  group('Search', function () {
    // tag riêng cho request tìm kiếm
    http.get('https://test.k6.io/search?q=phone', { tags: { step: 'search' } });
  });

  group('Checkout', function () {
    http.post('https://test.k6.io/cart',     null, { tags: { step: 'add_cart' } });
    http.post('https://test.k6.io/checkout', null, { tags: { step: 'pay' } });
  });
  sleep(1);
}`),
      P(
        "Tags còn cho phép đặt threshold có phạm vi hẹp, ví dụ chỉ áp p95<300ms cho các request mang tag step:pay. Điều này rất mạnh: các bước quan trọng nhất về mặt tiền bạc (thanh toán) có thể có ngưỡng nghiêm ngặt hơn các bước ít quan trọng (xem gợi ý sản phẩm).",
        "Tags also allow scoped thresholds, e.g. applying p95<300ms only to requests carrying the tag step:pay. This is powerful: the most money-critical steps (payment) can have stricter thresholds than less critical ones (viewing product recommendations).",
        "タグはスコープ付きしきい値も可能にします。例えば p95<300ms をタグ step:pay を持つリクエストだけに適用します。これは強力で、金銭的に最も重要なステップ（決済）は、重要度の低いステップ（おすすめ商品閲覧）より厳しいしきい値を持てます。"
      ),
      CODE("javascript", `export const options = {
  thresholds: {
    // threshold có phạm vi: chỉ áp cho request tag step:pay
    'http_req_duration{step:pay}': ['p(95)<300'],
    'http_req_duration{step:search}': ['p(95)<600'],
  },
};`),
    ],
  },
  {
    heading: {
      vi: "7. Tham số hóa dữ liệu với SharedArray",
      en: "7. Data parameterization with SharedArray",
      ja: "7. SharedArray によるデータのパラメータ化",
    },
    blocks: [
      P(
        "Test thật cần dữ liệu đa dạng: nhiều tài khoản, nhiều mã sản phẩm, nhiều truy vấn tìm kiếm khác nhau. Nếu mỗi VU tự nạp một tệp CSV lớn vào bộ nhớ, hàng nghìn VU sẽ nhân bản dữ liệu hàng nghìn lần và làm cạn RAM. SharedArray giải quyết đúng vấn đề này: nó nạp dữ liệu một lần và chia sẻ (chỉ đọc) cho mọi VU, giữ mức tiêu thụ bộ nhớ thấp bất kể số VU.",
        "Real tests need diverse data: many accounts, many product SKUs, many different search queries. If each VU loads a large CSV into memory, thousands of VUs replicate the data thousands of times and exhaust RAM. SharedArray solves exactly this: it loads the data once and shares it (read-only) across all VUs, keeping memory consumption low regardless of VU count.",
        "実際のテストには多様なデータが必要です。多数のアカウント、多数の商品 SKU、多数の異なる検索クエリです。各仮想ユーザーが大きな CSV をメモリに読み込むと、数千の仮想ユーザーがデータを数千回複製し RAM を使い果たします。SharedArray はまさにこれを解決します。データを一度だけ読み込み、全仮想ユーザーで（読み取り専用で）共有し、仮想ユーザー数によらずメモリ消費を低く保ちます。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

// Nạp MỘT LẦN, chia sẻ cho mọi VU (không nhân bản theo VU)
const users = new SharedArray('users', function () {
  return JSON.parse(open('./users.json')); // [{u:'a',p:'x'}, ...]
});

export const options = { vus: 200, duration: '2m' };

export default function () {
  // __VU: chỉ số VU hiện tại (1..N) · __ITER: số iteration của VU này
  const user = users[(__VU - 1) % users.length];
  http.post('https://test.k6.io/login',
    JSON.stringify({ username: user.u, password: user.p }));
  sleep(1);
}`),
      P(
        "Hai biến toàn cục __VU và __ITER rất hữu ích để phân phối dữ liệu: __VU cho biết đây là VU thứ mấy, __ITER cho biết đây là lần lặp thứ mấy của VU đó. Kết hợp chúng, bạn có thể đảm bảo mỗi VU dùng một tài khoản riêng, hoặc mỗi iteration dùng một sản phẩm khác nhau, tránh việc mọi VU cùng đăng nhập một tài khoản (điều làm sai lệch kết quả vì cache/lock).",
        "The two globals __VU and __ITER are very useful for distributing data: __VU tells you which VU this is, __ITER tells you which iteration of that VU this is. Combining them, you can ensure each VU uses a distinct account, or each iteration uses a different product, avoiding all VUs logging into the same account (which skews results due to caching/locking).",
        "二つのグローバル __VU と __ITER はデータ配分に非常に有用です。__VU はこれが何番目の仮想ユーザーか、__ITER はその仮想ユーザーの何回目のイテレーションかを示します。組み合わせれば、各仮想ユーザーが別々のアカウントを使う、または各イテレーションが異なる商品を使うことを保証でき、全仮想ユーザーが同一アカウントでログインすること（キャッシュ/ロックにより結果を歪める）を避けられます。"
      ),
      NOTE(
        "Hàm open() chỉ chạy được trong ngữ cảnh khởi tạo (init context), không dùng trong default function. Vì thế SharedArray bọc open() trong hàm nạp một lần.",
        "The open() function only works in the init context, not inside the default function. That is why SharedArray wraps open() in a load-once function.",
        "open() 関数は初期化コンテキストでのみ動作し、default 関数内では使えません。だから SharedArray は open() を一度だけ読み込む関数で包みます。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Mô hình hóa lưu lượng giống thật",
      en: "8. Modeling lifelike traffic",
      ja: "8. 本物らしいトラフィックのモデル化",
    },
    blocks: [
      P(
        "Lưu lượng thật không đồng nhất. Trên một sàn TMĐT, tỉ lệ điển hình có thể là 70% người chỉ duyệt/tìm kiếm, 20% thêm vào giỏ, và 10% thực sự thanh toán — hình phễu quen thuộc. Một bài test hiệu năng đáng tin phải tái tạo tỉ trọng này, nếu không bạn đang đo một hệ thống giả tưởng nơi ai cũng thanh toán. Kết hợp scenarios (mỗi luồng một executor), arrival-rate (giữ RPS thật), và SharedArray (dữ liệu đa dạng) cho ta một mô hình gần thực tế.",
        "Real traffic is not uniform. On an e-commerce marketplace, a typical split might be 70% browsing/searching, 20% adding to cart, and 10% actually checking out — the familiar funnel. A trustworthy performance test must reproduce this weighting, otherwise you are measuring a fictional system where everyone checks out. Combining scenarios (one executor per flow), arrival-rate (steady real RPS) and SharedArray (diverse data) gives a near-real model.",
        "実トラフィックは均一ではありません。EC マーケットプレイスでは、典型的な内訳は閲覧/検索70%、カート追加20%、実際の決済10%というお馴染みのファネルかもしれません。信頼できる性能テストはこの比重を再現せねばならず、さもなければ全員が決済する架空のシステムを測っていることになります。シナリオ（フローごとに一つのエグゼキュータ）、到着率（安定した実 RPS）、SharedArray（多様なデータ）を組み合わせれば、現実に近いモデルが得られます。"
      ),
      CODE("javascript", `export const options = {
  scenarios: {
    browsers: { executor: 'constant-arrival-rate', exec: 'browse',
      rate: 700, timeUnit: '1s', duration: '5m',
      preAllocatedVUs: 500, maxVUs: 1500 },
    carters:  { executor: 'constant-arrival-rate', exec: 'addCart',
      rate: 200, timeUnit: '1s', duration: '5m',
      preAllocatedVUs: 200, maxVUs: 600 },
    payers:   { executor: 'constant-arrival-rate', exec: 'pay',
      rate: 100, timeUnit: '1s', duration: '5m',
      preAllocatedVUs: 150, maxVUs: 500 },
  },
  thresholds: {
    'http_req_duration{step:pay}': ['p(95)<400'],  // bước tiền: nghiêm ngặt
    'http_req_failed': ['rate<0.005'],
  },
};`),
      P(
        "Cách tiếp cận theo tỉ trọng arrival-rate cho phép nói chính xác 'hệ thống phục vụ 700 lượt duyệt/giây, 200 thêm giỏ/giây và 100 thanh toán/giây đồng thời với p95 thanh toán dưới 400ms'. Đó là một tuyên bố capacity rõ ràng, có thể đưa vào tài liệu SLA và tái kiểm chứng ở mỗi lần phát hành.",
        "The arrival-rate weighting approach lets you state precisely 'the system serves 700 browses/sec, 200 add-to-carts/sec and 100 checkouts/sec simultaneously with checkout p95 under 400ms'. That is a clear capacity statement, fit for an SLA document and re-verifiable at every release.",
        "到着率による比重付けの手法は、「システムは毎秒700閲覧・200カート追加・100決済を同時に処理し、決済 p95 は400ms未満」と正確に述べられます。これは明確な容量表明で、SLA 文書に適し、リリースごとに再検証できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Setup và teardown: chuẩn bị và dọn dẹp",
      en: "9. Setup and teardown: preparing and cleaning up",
      ja: "9. setup と teardown：準備と後片付け",
    },
    blocks: [
      P(
        "k6 có vòng đời với các giai đoạn rõ ràng. Hàm setup() chạy MỘT LẦN trước khi bất kỳ VU nào bắt đầu, dùng để chuẩn bị dữ liệu dùng chung (ví dụ lấy một token quản trị, tạo dữ liệu seed). Giá trị nó trả về được truyền vào default function của mọi VU. Hàm teardown() chạy MỘT LẦN sau khi mọi VU kết thúc, dùng để dọn dẹp (xóa dữ liệu test đã tạo). Hiểu vòng đời này giúp tránh việc lặp lại thao tác đắt đỏ ở mỗi iteration.",
        "k6 has a lifecycle with clear stages. setup() runs ONCE before any VU starts, used to prepare shared data (e.g. fetch an admin token, seed data). Its return value is passed into every VU's default function. teardown() runs ONCE after all VUs finish, used for cleanup (deleting created test data). Understanding this lifecycle avoids repeating expensive operations on every iteration.",
        "k6 には明確な段階を持つライフサイクルがあります。setup() は仮想ユーザー開始前に一度だけ実行され、共有データの準備（例：管理者トークン取得、シードデータ作成）に使います。その戻り値はすべての仮想ユーザーの default 関数に渡されます。teardown() は全仮想ユーザー終了後に一度だけ実行され、後片付け（作成したテストデータの削除）に使います。このライフサイクルの理解は、各イテレーションで高コストな操作を繰り返すのを避けます。"
      ),
      CODE("javascript", `import http from 'k6/http';

// 1) init context (mỗi VU khi khởi tạo) — nạp file, khai báo metric
// 2) setup(): CHẠY 1 LẦN trước tất cả VU
export function setup() {
  const res = http.post('https://test.k6.io/auth', JSON.stringify({ role: 'admin' }));
  return { token: res.json('token') };   // truyền cho default & teardown
}

// 3) default: mỗi VU lặp, nhận data từ setup
export default function (data) {
  http.get('https://test.k6.io/orders', {
    headers: { Authorization: 'Bearer ' + data.token },
  });
}

// 4) teardown(): CHẠY 1 LẦN sau tất cả VU
export function teardown(data) {
  http.del('https://test.k6.io/seed', null, {
    headers: { Authorization: 'Bearer ' + data.token },
  });
}`),
      TIP(
        "Đừng đặt thao tác đăng nhập admin trong default function — nó sẽ chạy hàng nghìn lần vô ích. Đưa vào setup() để chạy đúng một lần.",
        "Do not put admin login inside the default function — it will run thousands of pointless times. Put it in setup() to run exactly once.",
        "管理者ログインを default 関数に置いてはいけません。数千回無駄に実行されます。setup() に入れて一度だけ実行します。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Tình huống thực chiến: flash sale trên sàn TMĐT",
      en: "10. Real-world scenario: a flash sale on a marketplace",
      ja: "10. 実戦シナリオ：マーケットプレイスのフラッシュセール",
    },
    blocks: [
      SCEN(
        "Chuẩn bị flash sale 12/12",
        "Preparing for the 12/12 flash sale",
        "Một sàn TMĐT sắp mở flash sale lúc 0 giờ ngày 12/12, dự kiến lưu lượng gấp 8 lần ngày thường trong 15 phút đầu. Đội QA hiệu năng thiết kế một mô hình arrival-rate ba luồng (duyệt, thêm giỏ, thanh toán) với tỉ trọng phễu, kèm một spike scenario mô phỏng cú tăng vọt lúc mở màn. Họ đặt threshold nghiêm ngặt cho bước thanh toán (tag step:pay, p95<400ms, error<0.5%) và cho phép ngưỡng lỏng hơn ở bước duyệt.",
        "A marketplace is about to open a flash sale at midnight on 12/12, expecting 8x normal traffic in the first 15 minutes. The performance QA team designs a three-flow arrival-rate model (browse, add-cart, checkout) with funnel weighting, plus a spike scenario simulating the opening surge. They set strict thresholds for checkout (tag step:pay, p95<400ms, error<0.5%) and allow looser thresholds on browsing.",
        "あるマーケットプレイスが12/12の午前0時にフラッシュセールを開始予定で、最初の15分間に通常の8倍のトラフィックを見込んでいます。性能 QA チームはファネル比重を持つ三フローの到着率モデル（閲覧・カート追加・決済）と、開始時の急増を模擬するスパイクシナリオを設計します。決済には厳しいしきい値（タグ step:pay、p95<400ms、エラー<0.5%）を設定し、閲覧にはより緩いしきい値を許します。"
      ),
      P(
        "Lần chạy đầu tiên fail threshold ở step:pay — p95 lên 1.8 giây. Dùng tags và groups để cắt lát, đội thấy bước 'kiểm tra tồn kho' trong luồng thanh toán là thủ phạm: nó gọi một dịch vụ đồng bộ không có cache. Sau khi thêm cache tồn kho và giới hạn số lượng đặt song song, lần chạy sau đạt threshold. Nhờ SharedArray cấp mỗi VU một sản phẩm và tài khoản riêng, mô hình không bị sai lệch do tất cả cùng tranh một bản ghi tồn kho.",
        "The first run fails the step:pay threshold — p95 climbs to 1.8 seconds. Slicing with tags and groups, the team sees the 'inventory check' step in the checkout flow is the culprit: it calls a synchronous, un-cached service. After adding an inventory cache and limiting concurrent placement, the next run passes the thresholds. Thanks to SharedArray giving each VU a distinct product and account, the model is not skewed by everyone contending for one inventory record.",
        "最初の実行は step:pay のしきい値で失敗し、p95 は1.8秒に上昇します。タグとグループで切り分けると、決済フローの「在庫確認」ステップが犯人だと分かります。キャッシュのない同期サービスを呼んでいるのです。在庫キャッシュを追加し同時注文数を制限すると、次の実行はしきい値を満たします。SharedArray が各仮想ユーザーに別々の商品とアカウントを与えるため、全員が一つの在庫レコードを奪い合ってモデルが歪むことはありません。"
      ),
      WARN(
        "Nếu mọi VU cùng thao tác trên một bản ghi (một sản phẩm, một tài khoản), bạn đo tranh chấp khóa chứ không đo capacity thật. Luôn tham số hóa dữ liệu.",
        "If all VUs operate on one record (one product, one account), you measure lock contention, not real capacity. Always parameterize data.",
        "全仮想ユーザーが一つのレコード（一つの商品、一つのアカウント）を操作すると、実容量でなくロック競合を測ります。常にデータをパラメータ化します。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Chống lỗi thường gặp ở mức nâng cao",
      en: "11. Avoiding common advanced-level pitfalls",
      ja: "11. 応用レベルのよくある落とし穴の回避",
    },
    blocks: [
      P(
        "Ở mức nâng cao, các bẫy tinh vi hơn. Với arrival-rate, nếu đặt preAllocatedVUs và maxVUs quá thấp, k6 sẽ không kịp cấp VU để giữ nhịp và cảnh báo 'insufficient VUs' — kết quả là RPS thực không đạt target dù bạn tưởng đã cấu hình đúng. Một bẫy khác: đặt threshold trên metric không tồn tại (gõ sai tên) khiến threshold bị bỏ qua âm thầm, tạo cảm giác an toàn giả.",
        "At the advanced level, pitfalls are subtler. With arrival-rate, if preAllocatedVUs and maxVUs are set too low, k6 cannot allocate VUs fast enough to keep the pace and warns 'insufficient VUs' — so actual RPS misses the target even though you thought you configured it right. Another trap: setting a threshold on a non-existent metric (typo in the name) makes the threshold silently ignored, creating a false sense of safety.",
        "応用レベルでは落とし穴はより微妙です。到着率で preAllocatedVUs と maxVUs を低く設定しすぎると、k6 はペースを保つのに十分な速さで仮想ユーザーを割り当てられず「insufficient VUs」と警告します。正しく設定したつもりでも実 RPS は目標に届きません。別の罠として、存在しない指標にしきい値を設定（名前の打ち間違い）すると、しきい値は静かに無視され、偽りの安心感を生みます。"
      ),
      UL(
        ["preAllocatedVUs/maxVUs quá thấp → 'insufficient VUs', không đạt RPS", "Gõ sai tên metric trong threshold → bị bỏ qua âm thầm", "Quên tham số hóa → đo tranh chấp khóa thay vì capacity", "Đặt logic đắt trong default thay vì setup → lãng phí và nhiễu số liệu", "Trộn open/closed model mà không hiểu ngữ nghĩa → hiểu sai kết quả"],
        ["preAllocatedVUs/maxVUs too low → 'insufficient VUs', RPS not met", "Typo in metric name in a threshold → silently ignored", "Forgetting parameterization → measuring lock contention, not capacity", "Expensive logic in default instead of setup → waste and noisy metrics", "Mixing open/closed model without understanding semantics → misreading results"],
        ["preAllocatedVUs/maxVUs が低すぎ → 「insufficient VUs」、RPS 未達", "しきい値内の指標名の打ち間違い → 静かに無視", "パラメータ化忘れ → 容量でなくロック競合を測る", "高コストロジックを setup でなく default に → 無駄と指標のノイズ", "意味論を理解せず open/closed モデルを混ぜる → 結果の誤読"]
      ),
      TIP(
        "Sau khi chạy, kiểm tra summary xem threshold của bạn có thật sự được đánh giá không (có xuất hiện với ✓ hoặc ✗). Nếu không thấy, rất có thể bạn gõ sai tên metric.",
        "After a run, check the summary to confirm your threshold was actually evaluated (it shows with ✓ or ✗). If it does not appear, you likely mistyped the metric name.",
        "実行後、しきい値が実際に評価されたか（✓ か ✗ で表示されるか）サマリーで確認します。表示されなければ、指標名を打ち間違えた可能性が高いです。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Hỏi & Đáp thresholds & scenarios",
      en: "12. Thresholds & scenarios Q&A",
      ja: "12. しきい値とシナリオ Q&A",
    },
    blocks: [
      QA(
        "Khi nào dùng arrival-rate thay vì ramping-vus?",
        "When should I use arrival-rate instead of ramping-vus?",
        "Dùng arrival-rate khi mục tiêu là một tốc độ request cụ thể (RPS) và bạn muốn giữ tốc độ đó ổn định bất kể server nhanh hay chậm — đây là mô hình phản ánh lưu lượng internet thật. Dùng ramping-vus khi mục tiêu là mô phỏng một số lượng người dùng đồng thời nhất định. Với SLA dạng 'chịu N req/s', arrival-rate là lựa chọn đúng.",
        "Use arrival-rate when the goal is a specific request rate (RPS) and you want to hold it steady regardless of server speed — this reflects real internet traffic. Use ramping-vus when the goal is to simulate a certain number of concurrent users. For an SLA like 'handle N req/s', arrival-rate is the right choice.",
        "ramping-vus でなく到着率をいつ使うべきですか？",
        "到着率は、目標が特定のリクエストレート（RPS）で、サーバーの速さに関係なくそれを安定に保ちたいときに使います。これは実際のインターネットトラフィックを反映します。ramping-vus は、一定数の同時ユーザーを模擬するのが目標のときに使います。「N req/s に耐える」型の SLA には到着率が正しい選択です。"
      ),
      QA(
        "Threshold và check khác nhau thế nào?",
        "How do thresholds differ from checks?",
        "check() là quan sát cấp request: nó ghi lại một điều kiện đúng/sai cho từng lần gọi, nhưng không làm lần chạy fail. threshold là tiêu chí cấp toàn cục trên một metric tổng hợp (p95, rate, count...): nếu bị vi phạm, k6 trả exit code khác 0. Bạn thường dùng chúng cùng nhau: check để thu thập, threshold để ra quyết định.",
        "check() is a request-level observation: it records a true/false condition per call but does not fail the run. A threshold is a global criterion on an aggregated metric (p95, rate, count...): if violated, k6 returns a non-zero exit code. You typically use them together: check to collect, threshold to decide.",
        "しきい値と check はどう違いますか？",
        "check() はリクエストレベルの観察で、呼び出しごとに真偽の条件を記録しますが実行を失敗させません。しきい値は集約指標（p95・rate・count など）に対するグローバルな基準で、違反されると k6 はゼロ以外の終了コードを返します。通常は併用します。check で収集し、しきい値で判断します。"
      ),
      QA(
        "Tại sao nên tạo custom metric thay vì chỉ dùng http_req_duration?",
        "Why create custom metrics instead of just using http_req_duration?",
        "http_req_duration gộp mọi request lại, nên nó không cho biết riêng bước nghiệp vụ quan trọng nhất chạy nhanh hay chậm. Một custom Trend như add_to_cart_ms đo đúng khoảng thời gian nghiệp vụ bạn quan tâm, và bạn có thể đặt threshold trên nó. Điều này giúp cổng chất lượng nói bằng ngôn ngữ sản phẩm ('thêm vào giỏ phải dưới 800ms') thay vì ngôn ngữ HTTP thô.",
        "http_req_duration lumps all requests together, so it cannot tell you whether the single most important business step is fast or slow. A custom Trend like add_to_cart_ms measures exactly the business interval you care about, and you can set a threshold on it. This lets the quality gate speak the product's language ('add-to-cart must be under 800ms') instead of raw HTTP language.",
        "http_req_duration だけでなくカスタム指標を作る理由は？",
        "http_req_duration は全リクエストを一括りにするため、最も重要な単一の業務ステップが速いか遅いかは分かりません。add_to_cart_ms のようなカスタム Trend は、関心のある業務区間を正確に測り、しきい値を設定できます。これにより品質ゲートは生の HTTP でなく製品の言語（「カート追加は800ms未満であること」）で語れます。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE C — k6 trong CI + Observability (telecom, nangcao)
// ===========================================================================
const pagesC = [
  {
    heading: {
      vi: "1. Vì sao đưa k6 vào CI và observability",
      en: "1. Why put k6 into CI and observability",
      ja: "1. なぜ k6 を CI と可観測性に組み込むのか",
    },
    blocks: [
      P(
        "Một bài test tải chạy tay một lần trước khi phát hành có giá trị hạn chế: nó cho bạn ảnh chụp một thời điểm, rồi bị lãng quên. Trong một nhà mạng viễn thông với hàng triệu thuê bao và bản phát hành liên tục, giá trị thật đến từ việc chạy k6 tự động trong pipeline ở mỗi thay đổi lớn, và stream metric tới một hệ thống quan sát để nhìn xu hướng theo thời gian. Chỉ khi ấy bạn mới phát hiện được hồi quy hiệu năng — khi một bản build làm p95 chậm đi 20% so với tuần trước.",
        "A load test run by hand once before release has limited value: it gives you a single snapshot, then is forgotten. In a telecom carrier with millions of subscribers and continuous releases, real value comes from running k6 automatically in the pipeline on every major change, and streaming metrics to an observability system to see trends over time. Only then can you catch performance regressions — when a build makes p95 20% slower than last week.",
        "リリース前に一度手動で実行する負荷テストの価値は限定的です。一時点のスナップショットを与えるだけで、その後忘れられます。数百万の加入者を持ち継続的にリリースする通信キャリアでは、真の価値は、大きな変更のたびに k6 をパイプラインで自動実行し、指標を可観測性システムへストリームして時間経過の傾向を見ることから生まれます。そのときにこそ性能回帰を捉えられます。あるビルドが p95 を先週より20%遅くしたときです。"
      ),
      P(
        "Bài viết này tập trung vào ba việc: chạy k6 như một cổng trong pipeline CI (dựa vào exit code từ thresholds), stream metric tới Prometheus/Grafana/InfluxDB để quan sát, và đối chiếu metric phía k6 với metric phía server để tìm nguyên nhân gốc. Cuối cùng ta bàn về soak test và phát hiện hồi quy theo thời gian.",
        "This article focuses on three things: running k6 as a gate in the CI pipeline (relying on exit codes from thresholds), streaming metrics to Prometheus/Grafana/InfluxDB for observation, and correlating k6-side metrics with server-side metrics to find root causes. Finally we discuss soak tests and detecting regressions over time.",
        "本記事は三つに焦点を当てます。CI パイプラインでゲートとして k6 を実行すること（しきい値からの終了コードに依拠）、Prometheus/Grafana/InfluxDB へ指標をストリームして観測すること、そして k6 側の指標をサーバー側の指標と相関させて根本原因を見つけることです。最後にソークテストと時間経過での回帰検出を論じます。"
      ),
      NOTE(
        "Giá trị của k6 nhân lên khi nó chạy đều đặn và metric được lưu lại — một lần chạy lẻ chỉ là ảnh chụp, một chuỗi lần chạy mới là xu hướng.",
        "k6's value multiplies when it runs regularly and metrics are stored — a single run is just a snapshot, a series of runs is a trend.",
        "k6 の価値は、定期的に実行され指標が保存されるときに倍増します。単発の実行はスナップショットに過ぎず、一連の実行こそが傾向です。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Exit code: cách k6 nói với pipeline rằng nó trượt",
      en: "2. Exit code: how k6 tells the pipeline it failed",
      ja: "2. 終了コード：k6 がパイプラインに失敗を伝える方法",
    },
    blocks: [
      P(
        "Nền tảng để k6 làm cổng CI là hành vi exit code. Khi mọi threshold pass, k6 kết thúc với exit code 0. Khi có bất kỳ threshold nào trượt, k6 kết thúc với exit code 99. Hệ thống CI (GitHub Actions, GitLab CI, Jenkins...) coi exit code khác 0 là bước thất bại và tự động dừng pipeline. Nhờ vậy, một bản build làm hiệu năng tệ đi sẽ bị chặn tự động, không cần con người ngồi đọc số.",
        "The foundation of k6 as a CI gate is its exit-code behavior. When all thresholds pass, k6 exits with code 0. When any threshold fails, k6 exits with code 99. CI systems (GitHub Actions, GitLab CI, Jenkins...) treat a non-zero exit code as a failed step and automatically stop the pipeline. Thus a build that degrades performance is blocked automatically, with no human needed to read numbers.",
        "k6 を CI ゲートにする基盤は終了コードの挙動です。すべてのしきい値が合格すると k6 はコード0で終了します。いずれかのしきい値が失敗するとコード99で終了します。CI システム（GitHub Actions・GitLab CI・Jenkins など）はゼロ以外の終了コードを失敗ステップと見なし、自動的にパイプラインを止めます。こうして性能を悪化させるビルドは自動的にブロックされ、人が数値を読む必要はありません。"
      ),
      IMG(SVG_CI_GATE, "k6 chặn deploy khi threshold trượt (exit≠0)", "k6 blocks deploy when a threshold fails (exit≠0)", "しきい値が失敗すると k6 はデプロイをブロックします（exit≠0）"),
      CODE("bash", `# Chạy k6, và exit code sẽ dừng pipeline nếu threshold trượt
k6 run smoke.js
echo "exit code = $?"   # 0 nếu pass, 99 nếu có threshold trượt

# Xuất kết quả ra JSON để lưu artifact và so sánh về sau
k6 run --out json=result.json load.js

# Tóm tắt ra file để pipeline đính kèm làm bằng chứng
k6 run --summary-export=summary.json load.js`),
      P(
        "Một mẹo quan trọng: trong pipeline nên phân biệt bài smoke (nhanh, chạy mọi PR) với bài load/soak (nặng, chạy theo lịch hoặc trước phát hành). Bài smoke với tải nhỏ và threshold cơ bản đảm bảo không có gì gãy rõ ràng; bài nặng chạy ít thường xuyên hơn để không làm chậm mọi commit.",
        "An important tip: in a pipeline you should distinguish the smoke test (fast, on every PR) from load/soak tests (heavy, scheduled or pre-release). A smoke test with small load and basic thresholds ensures nothing is obviously broken; heavy tests run less frequently so they do not slow every commit.",
        "重要なコツとして、パイプラインではスモークテスト（高速、全 PR で実行）とロード/ソークテスト（重い、スケジュールまたはリリース前）を区別すべきです。小さな負荷と基本的なしきい値のスモークテストは明らかな破綻がないことを保証し、重いテストはより低頻度で実行して全コミットを遅くしないようにします。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Chạy k6 trong GitHub Actions",
      en: "3. Running k6 in GitHub Actions",
      ja: "3. GitHub Actions で k6 を実行する",
    },
    blocks: [
      P(
        "Cách phổ biến nhất là dùng action chính thức của Grafana để cài k6, rồi chạy script. Bước k6 sẽ tự làm pipeline đỏ nếu threshold trượt, vì action tôn trọng exit code. Bạn có thể upload kết quả JSON làm artifact để lưu vết và so sánh giữa các lần chạy.",
        "The most common approach is using Grafana's official action to install k6, then run the script. The k6 step turns the pipeline red if a threshold fails, because the action respects the exit code. You can upload the JSON result as an artifact to keep a trail and compare between runs.",
        "最も一般的な方法は、Grafana 公式のアクションで k6 をインストールしスクリプトを実行することです。アクションは終了コードを尊重するため、しきい値が失敗すると k6 ステップはパイプラインを赤くします。JSON 結果をアーティファクトとしてアップロードし、履歴を残して実行間で比較できます。"
      ),
      CODE("yaml", `# .github/workflows/perf.yml
name: perf-gate
on: [pull_request]
jobs:
  k6-smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run k6 smoke test
        uses: grafana/setup-k6-action@v1
      - name: Execute
        uses: grafana/run-k6-action@v1
        with:
          path: ./tests/smoke.js
          # exit code 99 nếu threshold trượt -> step FAIL -> pipeline đỏ
      - name: Upload result
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: k6-result
          path: summary.json`),
      P(
        "Trong bối cảnh viễn thông, một pipeline điển hình chạy smoke test trên mỗi pull request để bắt hồi quy nghiêm trọng sớm, rồi một job load test theo lịch hằng đêm trên môi trường staging giống production. Kết quả hằng đêm được stream vào Grafana để đội nhìn xu hướng qua các ngày, thay vì chỉ pass/fail của một lần.",
        "In a telecom context, a typical pipeline runs a smoke test on every pull request to catch serious regressions early, then a scheduled nightly load-test job on a production-like staging environment. The nightly results are streamed into Grafana so the team sees trends across days, rather than just one run's pass/fail.",
        "通信の文脈では、典型的なパイプラインは重大な回帰を早期に捉えるため全プルリクエストでスモークテストを実行し、次に本番に近いステージング環境で毎晩スケジュールされたロードテストジョブを実行します。毎晩の結果は Grafana へストリームされ、チームは一回の合否だけでなく日々の傾向を見ます。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Stream metric ra output ngoài",
      en: "4. Streaming metrics to external outputs",
      ja: "4. 外部出力への指標ストリーミング",
    },
    blocks: [
      P(
        "Mặc định k6 chỉ in summary cuối và mất hết chuỗi thời gian. Để quan sát được diễn biến và lưu lịch sử, k6 hỗ trợ nhiều output đẩy metric ra ngoài trong lúc chạy: Prometheus (qua remote write), InfluxDB, và nhiều đích khác. Cờ --out chọn đích. Với Prometheus, output là một xk6 extension tích hợp sẵn trong bản k6 hiện đại, đẩy metric theo giao thức remote write để Prometheus lưu và Grafana vẽ.",
        "By default k6 only prints the end summary and loses the whole time series. To observe the progression and keep history, k6 supports multiple outputs that push metrics out during the run: Prometheus (via remote write), InfluxDB, and other destinations. The --out flag selects the destination. For Prometheus, the output is an xk6 extension built into modern k6 that pushes metrics via the remote write protocol so Prometheus stores them and Grafana plots them.",
        "デフォルトでは k6 は終了サマリーのみを出力し、時系列全体を失います。推移を観測し履歴を保つため、k6 は実行中に指標を外部へ押し出す複数の出力をサポートします。Prometheus（リモートライト経由）、InfluxDB、その他の宛先です。--out フラグで宛先を選びます。Prometheus の場合、出力は現代の k6 に組み込まれた xk6 拡張で、リモートライトプロトコルで指標を押し出し、Prometheus が保存し Grafana が描画します。"
      ),
      CODE("bash", `# Đẩy metric tới Prometheus qua remote write (built-in output hiện đại)
K6_PROMETHEUS_RW_SERVER_URL=http://prometheus:9090/api/v1/write \\
  k6 run --out experimental-prometheus-rw load.js

# Đẩy tới InfluxDB (thường ghép với dashboard Grafana có sẵn)
k6 run --out influxdb=http://influxdb:8086/k6 load.js

# Có thể bật nhiều output cùng lúc
k6 run --out json=result.json \\
       --out experimental-prometheus-rw load.js`),
      IMG(SVG_OBSERVABILITY, "k6 stream metric tới Prometheus/InfluxDB, Grafana trực quan hóa", "k6 streams metrics to Prometheus/InfluxDB, Grafana visualizes", "k6 は Prometheus/InfluxDB へ指標をストリームし、Grafana が可視化します"),
      P(
        "xk6 là bộ công cụ để xây một bản k6 tùy biến có thêm extension — ví dụ đầu ra tới một hệ thống giám sát nội bộ, hoặc giao thức mà nhân k6 chưa hỗ trợ sẵn (kafka, một hàng đợi riêng). Với phần lớn đội, các output tích hợp sẵn (Prometheus RW, InfluxDB, JSON, cloud) đã đủ; xk6 dành cho nhu cầu đặc thù.",
        "xk6 is the toolkit for building a custom k6 binary with extra extensions — for example output to an internal monitoring system, or a protocol the k6 core does not yet support (kafka, a proprietary queue). For most teams the built-in outputs (Prometheus RW, InfluxDB, JSON, cloud) are enough; xk6 is for specialized needs.",
        "xk6 は追加拡張を持つカスタム k6 バイナリを構築するツールキットです。例えば社内監視システムへの出力や、k6 コアがまだサポートしないプロトコル（kafka、独自キュー）です。ほとんどのチームには組み込み出力（Prometheus RW・InfluxDB・JSON・クラウド）で十分で、xk6 は特殊な需要向けです。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Đối chiếu metric client với metric server",
      en: "5. Correlating client metrics with server metrics",
      ja: "5. クライアント指標とサーバー指標の相関",
    },
    blocks: [
      P(
        "Metric của k6 là góc nhìn phía khách (client): latency người dùng cảm nhận, throughput đạt được, tỉ lệ lỗi. Nhưng để tìm nguyên nhân chậm, bạn phải ghép chúng lên cùng một trục thời gian với metric phía server: CPU, bộ nhớ, số kết nối DB, độ dài hàng đợi, thời gian GC. Khi p95 phía k6 vọt lên đúng lúc CPU server chạm 100% hoặc GC pause tăng, bạn có tương quan rõ ràng chỉ tới nút thắt.",
        "k6's metrics are the client's viewpoint: user-perceived latency, achieved throughput, error rate. But to find the cause of slowness, you must lay them on the same time axis as server-side metrics: CPU, memory, DB connections, queue depth, GC time. When k6-side p95 spikes exactly when server CPU hits 100% or GC pauses rise, you have a clear correlation pointing to the bottleneck.",
        "k6 の指標はクライアント側の視点です。ユーザーが感じるレイテンシ、達成したスループット、エラー率です。しかし遅さの原因を見つけるには、それらをサーバー側指標（CPU・メモリ・DB 接続数・キュー長・GC 時間）と同じ時間軸に並べる必要があります。k6 側の p95 が、ちょうどサーバー CPU が100%に達したときや GC ポーズが増えたときに急上昇すれば、ボトルネックを指す明確な相関が得られます。"
      ),
      P(
        "Cách làm thực tế: đưa cả metric k6 (qua Prometheus RW) và metric server (qua exporter/agent như node_exporter, cAdvisor, hoặc APM) vào cùng một Grafana. Đặt các biểu đồ chồng theo thời gian: hàng trên là p95 và error rate từ k6, hàng dưới là CPU/mem/DB pool từ server. Việc căn cùng trục thời gian biến 'hệ thống chậm' mơ hồ thành 'chậm vì cạn connection pool lúc 21h05'.",
        "Practical approach: bring both k6 metrics (via Prometheus RW) and server metrics (via exporters/agents like node_exporter, cAdvisor, or an APM) into the same Grafana. Stack the charts by time: the top row is p95 and error rate from k6, the bottom row is CPU/mem/DB pool from the server. Aligning the shared time axis turns a vague 'the system is slow' into 'slow because the connection pool ran dry at 21:05'.",
        "実践的な方法として、k6 指標（Prometheus RW 経由）とサーバー指標（node_exporter・cAdvisor・APM などのエクスポータ/エージェント経由）の両方を同じ Grafana に取り込みます。チャートを時間で積み重ねます。上段は k6 からの p95 とエラー率、下段はサーバーからの CPU/メモリ/DB プールです。共有時間軸を揃えることで、曖昧な「システムが遅い」を「21時05分に接続プールが枯渇したから遅い」に変えます。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';

// Gắn nhãn build vào metric để căn cùng trục thời gian với server-side
const ttfb = new Trend('server_ttfb_ms', true);

export const options = {
  // tag ở phạm vi toàn test: mọi metric mang nhãn version + env
  tags: { version: __ENV.BUILD || 'dev', env: 'staging' },
};

export default function () {
  const res = http.get('https://test.k6.io/api/billing');
  ttfb.add(res.timings.waiting);   // TTFB ~ gánh xử lý phía server
  sleep(1);
}`),
      TIP(
        "Luôn đồng bộ đồng hồ (NTP) giữa máy sinh tải và server. Lệch thời gian vài giây đủ làm tương quan sai và dẫn tới kết luận nhầm.",
        "Always sync clocks (NTP) between the load generator and the server. A few seconds of drift is enough to misalign correlation and lead to wrong conclusions.",
        "負荷生成機とサーバー間で常に時計を同期（NTP）します。数秒のずれでも相関を狂わせ、誤った結論を招くのに十分です。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Phát hiện hồi quy hiệu năng theo thời gian",
      en: "6. Detecting performance regressions over time",
      ja: "6. 時間経過での性能回帰の検出",
    },
    blocks: [
      P(
        "Hồi quy hiệu năng hiếm khi xảy ra đột ngột — thường là sự trượt dần: mỗi bản phát hành thêm 5% latency, sau ba tháng hệ thống chậm gấp đôi mà không ai nhận ra vì từng bước đều nhỏ. Cách chống lại là lưu metric từ mỗi lần chạy k6 định kỳ vào một kho (Prometheus/InfluxDB) và dựng dashboard xu hướng: p95 của luồng thanh toán qua từng ngày, throughput tối đa qua từng tuần. Một đường đi lên đều đặn của p95 là tín hiệu cảnh báo sớm.",
        "Performance regressions rarely happen abruptly — usually it is gradual drift: each release adds 5% latency, and after three months the system is twice as slow while nobody notices because each step was small. The defense is storing metrics from every periodic k6 run into a store (Prometheus/InfluxDB) and building trend dashboards: checkout-flow p95 by day, max throughput by week. A steadily rising p95 line is an early warning signal.",
        "性能回帰が突然起きることは稀で、通常は緩やかなドリフトです。各リリースがレイテンシを5%追加し、三ヶ月後にはシステムが二倍遅くなるのに、各段階が小さいため誰も気づきません。対策は、定期的な各 k6 実行の指標をストア（Prometheus/InfluxDB）に保存し、傾向ダッシュボードを構築することです。日ごとの決済フロー p95、週ごとの最大スループットです。着実に上昇する p95 の線は早期警告の信号です。"
      ),
      P(
        "Có thể tiến thêm một bước: thiết lập cảnh báo (alert) trong Grafana khi p95 của một lần chạy định kỳ vượt quá mức của tuần trước một tỉ lệ nhất định. Như vậy đội được thông báo chủ động thay vì phải nhớ mở dashboard. Kết hợp với việc gắn nhãn mỗi lần chạy bằng commit hash hoặc phiên bản, bạn có thể truy ngược chính xác bản build nào đã gây ra bước trượt.",
        "You can go one step further: set up alerts in Grafana when a periodic run's p95 exceeds last week's by a certain ratio. Then the team is proactively notified instead of having to remember to open the dashboard. Combined with tagging each run by commit hash or version, you can trace precisely which build caused the drift.",
        "さらに一歩進められます。定期実行の p95 が先週を一定比率超えたときに Grafana でアラートを設定します。そうすればチームはダッシュボードを開くのを覚えておく代わりに能動的に通知されます。各実行をコミットハッシュやバージョンでタグ付けすることと組み合わせれば、どのビルドがドリフトを引き起こしたか正確に追跡できます。"
      ),
      UL(
        ["Lưu metric mỗi lần chạy định kỳ vào Prometheus/InfluxDB", "Dựng dashboard xu hướng: p95, throughput, error rate theo ngày/tuần", "Gắn nhãn run bằng commit hash/version để truy ngược", "Đặt alert khi p95 vượt baseline một tỉ lệ nhất định", "So sánh baseline mỗi phát hành với lần trước, không chỉ pass/fail tuyệt đối"],
        ["Store metrics from each periodic run in Prometheus/InfluxDB", "Build trend dashboards: p95, throughput, error rate by day/week", "Tag runs by commit hash/version for traceability", "Set alerts when p95 exceeds baseline by a set ratio", "Compare each release's baseline with the previous, not just absolute pass/fail"],
        ["定期実行ごとの指標を Prometheus/InfluxDB に保存", "傾向ダッシュボード構築：日/週ごとの p95・スループット・エラー率", "追跡のため実行をコミットハッシュ/バージョンでタグ付け", "p95 がベースラインを一定比率超えたらアラート設定", "各リリースのベースラインを前回と比較、絶対的合否だけでなく"]
      ),
    ],
  },
  {
    heading: {
      vi: "7. Soak test: phát hiện vấn đề tích tụ theo thời gian",
      en: "7. Soak tests: finding problems that accumulate over time",
      ja: "7. ソークテスト：時間とともに蓄積する問題の発見",
    },
    blocks: [
      P(
        "Soak test (kiểm thử độ bền) giữ một mức tải vừa phải nhưng kéo dài rất lâu — thường vài giờ tới cả ngày. Mục tiêu không phải tìm điểm gãy mà tìm những vấn đề chỉ lộ ra theo thời gian: rò rỉ bộ nhớ, kết nối không được đóng tích tụ dần, đĩa log đầy, cache phình vô hạn, hoặc bảng cơ sở dữ liệu phình làm truy vấn chậm dần. Đây là những lỗi mà một load test 5 phút không bao giờ thấy.",
        "A soak test (endurance test) holds a moderate load but for a very long time — typically several hours up to a full day. The goal is not to find the breaking point but to find problems that only surface over time: memory leaks, unclosed connections accumulating, log disks filling, caches growing unbounded, or database tables bloating so queries slow down gradually. These are bugs a 5-minute load test never sees.",
        "ソークテスト（耐久テスト）は中程度の負荷を非常に長く保ちます。通常は数時間から丸一日です。目的は破綻点を見つけることでなく、時間とともにしか現れない問題を見つけることです。メモリ漏れ、閉じられない接続の蓄積、ログディスクの逼迫、際限なく成長するキャッシュ、あるいはデータベーステーブルの肥大化でクエリが徐々に遅くなることです。これらは5分のロードテストが決して見ない不具合です。"
      ),
      CODE("javascript", `import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 100,
      duration: '4h',   // giữ tải vừa trong 4 giờ để lộ tích tụ
    },
  },
  thresholds: {
    // p95 phải ổn định suốt 4 giờ, không được trượt dần
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  http.get('https://test.k6.io/api/usage');
  sleep(1);
}`),
      IMG(SVG_SOAK, "Soak test: bộ nhớ tăng dần theo giờ lộ rò rỉ", "Soak test: memory rising over hours reveals a leak", "ソークテスト：数時間で上昇するメモリが漏れを露呈します"),
      P(
        "Điều làm soak test khác biệt là bạn phải quan sát metric SERVER trong suốt thời gian chạy, không chỉ nhìn summary cuối. Nếu bộ nhớ server tăng đều đặn theo đường thẳng suốt 4 giờ trong khi tải giữ nguyên, đó gần như chắc chắn là rò rỉ. Đây chính là lý do observability (chương trước) và soak test bổ trợ nhau: soak tạo điều kiện, observability giúp nhìn thấy vấn đề tích tụ.",
        "What makes a soak test distinctive is that you must watch SERVER metrics throughout the run, not just the final summary. If server memory rises steadily in a straight line over 4 hours while load stays constant, that is almost certainly a leak. This is exactly why observability (previous chapter) and soak tests complement each other: soak creates the conditions, observability lets you see the accumulating problem.",
        "ソークテストを特徴づけるのは、最終サマリーだけでなく実行中ずっとサーバー指標を監視せねばならない点です。負荷が一定なのにサーバーメモリが4時間直線的に上昇し続けるなら、それはほぼ確実に漏れです。これこそが可観測性（前章）とソークテストが補完し合う理由です。ソークが条件を作り、可観測性が蓄積する問題を見せます。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. k6 Cloud và chạy phân tán",
      en: "8. k6 Cloud and distributed execution",
      ja: "8. k6 Cloud と分散実行",
    },
    blocks: [
      P(
        "Một máy sinh tải đơn lẻ có giới hạn: đến một mức VU nhất định, chính CPU/mạng của máy đó thành nút thắt. Để tạo tải rất lớn từ nhiều vùng địa lý, có hai hướng. Grafana Cloud k6 (dịch vụ có phí) chạy lần test trên hạ tầng đám mây, phân tán tải qua nhiều vùng và cung cấp giao diện phân tích sẵn. Hướng còn lại là tự vận hành k6 phân tán, ví dụ trên Kubernetes qua k6-operator, điều phối nhiều pod cùng chạy một phần tải.",
        "A single load generator has limits: past a certain VU level, that machine's own CPU/network becomes the bottleneck. To generate very large load from multiple geographies, there are two directions. Grafana Cloud k6 (a paid service) runs the test on cloud infrastructure, distributing load across regions and providing a built-in analysis UI. The other direction is self-operating distributed k6, e.g. on Kubernetes via k6-operator, orchestrating many pods each running a share of the load.",
        "単一の負荷生成機には限界があります。ある仮想ユーザー数を超えると、そのマシン自身の CPU/ネットワークがボトルネックになります。複数の地域から非常に大きな負荷を生成するには二つの方向があります。Grafana Cloud k6（有料サービス）はクラウドインフラでテストを実行し、負荷を地域間で分散し、組み込みの分析 UI を提供します。もう一つの方向は k6 を自前で分散運用することで、例えば k6-operator 経由で Kubernetes 上に、負荷の一部ずつを実行する多数の Pod を編成します。"
      ),
      CODE("bash", `# Chạy trên Grafana Cloud k6 (cần đăng nhập/token)
k6 cloud run load.js

# Hoặc: chạy local nhưng đẩy kết quả LÊN cloud để phân tích/lưu trữ
k6 run --out cloud load.js

# Phân tán tự vận hành trên Kubernetes (k6-operator) — khai báo qua CRD
kubectl apply -f - <<'YAML'
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata: { name: load-test }
spec:
  parallelism: 4               # 4 pod cùng chạy, chia tải
  script: { configMap: { name: k6-scripts, file: load.js } }
YAML`),
      P(
        "Khi phân tán, một điểm cần nhớ: metric được tổng hợp lại từ mọi node, và bạn phải chắc từng node có đủ tài nguyên. Với nhà mạng viễn thông cần mô phỏng thuê bao từ nhiều thành phố, chạy phân tán đa vùng còn giúp phản ánh độ trễ mạng thực tế theo địa lý — một khía cạnh mà một máy đơn ở một nơi không tái tạo được.",
        "When distributing, one point to remember: metrics are aggregated from all nodes, and you must ensure each node has enough resources. For a telecom carrier needing to simulate subscribers from many cities, multi-region distributed execution also helps reflect real geographic network latency — an aspect a single machine in one place cannot reproduce.",
        "分散する際に覚えておく点として、指標は全ノードから集約され、各ノードが十分な資源を持つことを保証せねばなりません。多くの都市からの加入者を模擬する必要がある通信キャリアにとって、複数地域の分散実行は地理による実際のネットワークレイテンシを反映するのにも役立ちます。これは一箇所の単一マシンでは再現できない側面です。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Tình huống thực chiến: hồi quy âm thầm ở API tính cước",
      en: "9. Real-world scenario: a silent regression in the billing API",
      ja: "9. 実戦シナリオ：課金 API の静かな回帰",
    },
    blocks: [
      SCEN(
        "p95 trượt dần qua các sprint",
        "p95 drifting across sprints",
        "Một nhà mạng chạy load test hằng đêm cho API tính cước trên staging, stream metric vào Grafana. Trong ba sprint, không lần nào fail threshold p95<500ms — mọi đêm đều xanh. Nhưng dashboard xu hướng cho thấy p95 đã leo từ 210ms lên 470ms: chưa vi phạm ngưỡng nhưng đang tiến sát và tăng đều. Đội nhận cảnh báo Grafana đặt ở mức 'p95 vượt 150% baseline 30 ngày' và điều tra trước khi nó thực sự phá ngưỡng trong sản xuất.",
        "A carrier runs a nightly load test for the billing API on staging, streaming metrics into Grafana. Across three sprints, no run fails the p95<500ms threshold — every night is green. But the trend dashboard shows p95 has crept from 210ms to 470ms: not yet violating the threshold but approaching it and rising steadily. The team gets a Grafana alert set at 'p95 exceeds 150% of the 30-day baseline' and investigates before it actually breaks the threshold in production.",
        "ある通信キャリアは課金 API のロードテストをステージングで毎晩実行し、指標を Grafana へストリームします。三つのスプリントで、p95<500ms のしきい値を失敗した実行はなく、毎晩緑です。しかし傾向ダッシュボードは p95 が210msから470msへ這い上がったことを示します。まだしきい値違反ではありませんが、迫りつつ着実に上昇しています。チームは「p95 が30日ベースラインの150%を超える」に設定した Grafana アラートを受け、本番で実際にしきい値を破る前に調査します。"
      ),
      P(
        "Nhờ gắn nhãn mỗi lần chạy bằng commit hash, đội khoanh vùng bước trượt lớn nhất trùng với một thay đổi thêm một truy vấn N+1 trong logic tính cước. Đối chiếu metric server, họ thấy số truy vấn DB mỗi request tăng gấp bốn. Sửa thành một truy vấn gộp đưa p95 về 190ms. Điểm mấu chốt: không có dashboard xu hướng và alert, lỗi này sẽ chỉ bị phát hiện khi khách hàng thật phàn nàn về hóa đơn chậm.",
        "By tagging each run with a commit hash, the team localizes the biggest drift step to a change that introduced an N+1 query in the billing logic. Correlating server metrics, they see DB queries per request quadrupled. Fixing it to a single batched query brings p95 back to 190ms. The key point: without a trend dashboard and alert, this bug would only be found when real customers complain about slow billing.",
        "各実行をコミットハッシュでタグ付けすることで、チームは最大のドリフト段階を、課金ロジックに N+1 クエリを導入した変更に特定します。サーバー指標と相関させると、リクエストあたりの DB クエリが4倍になっていることが分かります。単一のバッチクエリに修正すると p95 は190msに戻ります。要点は、傾向ダッシュボードとアラートがなければ、この不具合は実際の顧客が課金の遅さを訴えるまで見つからなかったということです。"
      ),
      NOTE(
        "Một lần chạy 'xanh' không có nghĩa là 'khỏe'. Xu hướng giữa các lần chạy mới cho biết hệ thống đang tốt lên hay xấu đi.",
        "A single 'green' run does not mean 'healthy'. The trend across runs tells you whether the system is getting better or worse.",
        "一回の「緑」の実行が「健康」を意味するわけではありません。実行間の傾向こそが、システムが良くなっているか悪くなっているかを教えます。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Thực hành tốt khi vận hành k6 ở quy mô",
      en: "10. Good practices for operating k6 at scale",
      ja: "10. k6 を規模で運用するためのよい実践",
    },
    blocks: [
      P(
        "Khi k6 trở thành một phần của quy trình phát hành, tính kỷ luật quan trọng như tính đúng đắn. Kịch bản test nên nằm trong git cùng mã nguồn, được review như code. Threshold nên phản ánh SLA đã thống nhất với bên nghiệp vụ, được cập nhật khi SLA đổi. Môi trường test tải nên càng giống production càng tốt (cùng cấu hình DB, cùng loại instance) vì test trên môi trường yếu hơn cho kết quả lạc quan giả tạo.",
        "When k6 becomes part of the release process, discipline matters as much as correctness. Test scripts should live in git alongside the source, reviewed like code. Thresholds should reflect SLAs agreed with the business side, updated when the SLA changes. The load-test environment should be as production-like as possible (same DB config, same instance types) because testing on a weaker environment gives falsely optimistic results.",
        "k6 がリリースプロセスの一部になると、規律は正しさと同じくらい重要です。テストスクリプトはソースと共に git に置き、コードのようにレビューすべきです。しきい値は業務側と合意した SLA を反映し、SLA が変わったら更新すべきです。負荷テスト環境はできる限り本番に近く（同じ DB 設定、同じインスタンス種別）すべきです。弱い環境でのテストは偽りに楽観的な結果を与えるからです。"
      ),
      UL(
        ["Kịch bản k6 nằm trong git, review như code", "Threshold gắn với SLA nghiệp vụ, có người sở hữu", "Môi trường test giống production để tránh kết quả lạc quan giả", "Phân tách smoke (mỗi PR) và load/soak (theo lịch)", "Lưu và trực quan hóa metric để theo dõi xu hướng, không chỉ pass/fail", "Đồng bộ đồng hồ và ghi lại phiên bản build cho mỗi lần chạy"],
        ["k6 scripts in git, reviewed like code", "Thresholds tied to business SLAs, with an owner", "Production-like test environment to avoid falsely optimistic results", "Separate smoke (every PR) from load/soak (scheduled)", "Store and visualize metrics to track trends, not just pass/fail", "Sync clocks and record the build version for each run"],
        ["k6 スクリプトを git に置きコードのようにレビュー", "しきい値を業務 SLA に結び付け、所有者を置く", "偽りに楽観的な結果を避けるため本番に近いテスト環境", "スモーク（全 PR）とロード/ソーク（スケジュール）を分離", "合否だけでなく傾向を追うため指標を保存・可視化", "時計を同期し各実行のビルドバージョンを記録"]
      ),
      TIP(
        "Coi kịch bản hiệu năng như một tài sản kỹ thuật lâu dài: đặt tên rõ, tách cấu hình khỏi logic, và viết README ngắn giải thích mỗi bài đo cái gì.",
        "Treat performance scripts as a long-lived engineering asset: name them clearly, separate config from logic, and write a short README explaining what each test measures.",
        "性能スクリプトを長寿命のエンジニアリング資産として扱います。明確に命名し、設定をロジックから分離し、各テストが何を測るか説明する短い README を書きます。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Bức tranh tổng: k6 trong vòng đời chất lượng",
      en: "11. The big picture: k6 in the quality lifecycle",
      ja: "11. 全体像：品質ライフサイクルにおける k6",
    },
    blocks: [
      P(
        "Đặt mọi thứ lại với nhau: k6 không phải một công cụ chạy một lần rồi bỏ, mà là một mắt xích trong vòng đời chất lượng liên tục. Ở tầng phát triển, smoke test chạy trên mỗi PR bắt hồi quy nghiêm trọng sớm. Ở tầng phát hành, load test kiểm chứng SLA trước khi lên production. Ở tầng vận hành, soak test và dashboard xu hướng theo dõi sức khỏe dài hạn. Ba tầng này ăn khớp qua cùng một bộ script và cùng một hệ quan sát.",
        "Putting it all together: k6 is not a run-once-and-discard tool, but a link in a continuous quality lifecycle. At the development layer, smoke tests on every PR catch serious regressions early. At the release layer, load tests verify the SLA before production. At the operations layer, soak tests and trend dashboards track long-term health. These three layers mesh through the same set of scripts and the same observability stack.",
        "すべてをまとめると、k6 は一度実行して捨てるツールではなく、継続的な品質ライフサイクルの一つの環です。開発層では全 PR のスモークテストが重大な回帰を早期に捉えます。リリース層ではロードテストが本番前に SLA を検証します。運用層ではソークテストと傾向ダッシュボードが長期的な健全性を追跡します。これら三層は同じスクリプト群と同じ可観測性スタックを通じて噛み合います。"
      ),
      P(
        "Với một nhà mạng viễn thông, điều này nghĩa là mỗi tính năng mới đi qua một cổng hiệu năng tự động, mỗi phát hành có một baseline hiệu năng được ghi lại, và mỗi xu hướng xấu đi được cảnh báo trước khi khách hàng cảm nhận. Đó là sự dịch chuyển từ 'phản ứng khi có sự cố' sang 'phòng ngừa dựa trên dữ liệu' — chính là giá trị lớn nhất mà kiểm thử hiệu năng được tự động hóa mang lại.",
        "For a telecom carrier, this means every new feature passes an automated performance gate, every release has a recorded performance baseline, and every worsening trend is alerted before customers feel it. That is the shift from 'reacting to incidents' to 'data-driven prevention' — precisely the greatest value that automated performance testing brings.",
        "通信キャリアにとって、これはすべての新機能が自動性能ゲートを通り、すべてのリリースが記録された性能ベースラインを持ち、すべての悪化傾向が顧客が感じる前にアラートされることを意味します。それは「障害への反応」から「データ駆動の予防」への転換であり、まさに自動化された性能テストがもたらす最大の価値です。"
      ),
      WARN(
        "Tự động hóa không thay thế phán đoán: một cổng CI xanh chỉ tốt bằng chất lượng threshold và độ giống thật của môi trường test. Con người vẫn phải sở hữu các giả định đó.",
        "Automation does not replace judgment: a green CI gate is only as good as the quality of its thresholds and how production-like the test environment is. Humans must still own those assumptions.",
        "自動化は判断を置き換えません。緑の CI ゲートは、そのしきい値の質とテスト環境の本番らしさの分だけしか良くありません。人間がその前提を所有し続ける必要があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Hỏi & Đáp CI & observability",
      en: "12. CI & observability Q&A",
      ja: "12. CI と可観測性 Q&A",
    },
    blocks: [
      QA(
        "Làm sao để k6 làm pipeline đỏ khi hiệu năng tệ?",
        "How do I make k6 turn the pipeline red on bad performance?",
        "Định nghĩa thresholds trong options. Khi một threshold bị vi phạm, k6 kết thúc với exit code 99. Hệ thống CI coi exit code khác 0 là bước thất bại và dừng pipeline. Không cần script phụ để phân tích — chính k6 đã trả tín hiệu pass/fail. Chỉ cần đảm bảo threshold phản ánh SLA thật để cổng có ý nghĩa.",
        "Define thresholds in options. When a threshold is violated, k6 exits with code 99. The CI system treats a non-zero exit code as a failed step and stops the pipeline. No extra parsing script is needed — k6 itself returns the pass/fail signal. Just ensure the thresholds reflect real SLAs so the gate is meaningful.",
        "性能が悪いとき k6 でパイプラインを赤くするには？",
        "options にしきい値を定義します。しきい値が違反されると k6 はコード99で終了します。CI システムはゼロ以外の終了コードを失敗ステップと見なしパイプラインを止めます。解析用の追加スクリプトは不要で、k6 自身が合否信号を返します。ゲートが意味を持つよう、しきい値が実際の SLA を反映することを確認するだけです。"
      ),
      QA(
        "Nên chạy load test nặng trên mỗi commit không?",
        "Should I run heavy load tests on every commit?",
        "Không nên — nó làm chậm mọi commit và tốn tài nguyên. Hãy chạy smoke test nhẹ (tải nhỏ, threshold cơ bản) trên mỗi PR để bắt hồi quy nghiêm trọng, và để dành load/stress/soak test nặng chạy theo lịch (hằng đêm/hằng tuần) hoặc trước mỗi phát hành lớn trên môi trường giống production. Kết quả các lần nặng nên được lưu để theo dõi xu hướng.",
        "No — it slows every commit and wastes resources. Run a light smoke test (small load, basic thresholds) on every PR to catch serious regressions, and reserve heavy load/stress/soak tests for scheduled runs (nightly/weekly) or before major releases on a production-like environment. Results of heavy runs should be stored to track trends.",
        "重いロードテストを全コミットで実行すべきですか？",
        "いいえ、全コミットを遅くし資源を浪費します。軽いスモークテスト（小さな負荷、基本しきい値）を全 PR で実行して重大な回帰を捉え、重いロード/ストレス/ソークテストはスケジュール実行（毎晩/毎週）または主要リリース前に本番に近い環境で行うよう取っておきます。重い実行の結果は傾向追跡のため保存すべきです。"
      ),
      QA(
        "Vì sao phải stream metric ra Prometheus/Grafana thay vì chỉ đọc summary?",
        "Why stream metrics to Prometheus/Grafana instead of just reading the summary?",
        "Summary chỉ cho một con số tổng ở cuối và mất hết chuỗi thời gian. Stream metric cho phép xem diễn biến trong lúc chạy (khi nào latency vọt), lưu lịch sử để so sánh giữa các lần, đối chiếu với metric server trên cùng trục thời gian, và đặt alert. Nói ngắn: summary trả lời 'lần này thế nào', còn observability trả lời 'đang tốt lên hay xấu đi và vì sao'.",
        "The summary gives only one aggregate number at the end and loses the whole time series. Streaming metrics lets you see the progression during the run (when latency spikes), keep history to compare across runs, correlate with server metrics on the same time axis, and set alerts. In short: the summary answers 'how was this run', while observability answers 'getting better or worse and why'.",
        "サマリーを読むだけでなく Prometheus/Grafana へ指標をストリームする理由は？",
        "サマリーは最後の集約値を一つ与えるだけで時系列全体を失います。指標のストリームは、実行中の推移（いつレイテンシが急上昇したか）を見られ、実行間比較のため履歴を保ち、同じ時間軸でサーバー指標と相関させ、アラートを設定できます。要するにサマリーは「今回はどうだったか」に、可観測性は「良くなっているか悪くなっているか、なぜか」に答えます。"
      ),
    ],
  },
];

// ===========================================================================
// EXPORT
// ===========================================================================
export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-k6-performance-foundation",
    cover: makeThumb({ id: "atk6a", domain: "fintech", kind: "congnghe", label: "K6 · PERF" }),
    tags: tags("congnghe", "k6", "foundation"),
    title: {
      vi: "Nền tảng k6: kiểm thử tải, VU và script đầu tiên",
      en: "k6 Foundations: load testing, VUs and your first script",
      ja: "k6 の基礎：負荷テスト、仮想ユーザー、そして最初のスクリプト",
    },
    summary: {
      vi: "Vì sao cần kiểm thử tải, khái niệm VU/throughput/latency, viết script k6 đầu tiên với http.get + check + sleep, dùng options/stages, đọc summary (throughput, p95, error rate) và phân loại smoke/load/stress/spike/soak — trên domain fintech.",
      en: "Why load testing matters, the VU/throughput/latency concepts, writing your first k6 script with http.get + check + sleep, using options/stages, reading the summary (throughput, p95, error rate) and classifying smoke/load/stress/spike/soak — on a fintech domain.",
      ja: "なぜ負荷テストが重要か、仮想ユーザー/スループット/レイテンシの概念、http.get + check + sleep での最初の k6 スクリプト、options/stages の使用、サマリー（スループット・p95・エラー率）の読み方、smoke/load/stress/spike/soak の分類を、フィンテック領域で解説します。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-k6-thresholds-scenarios",
    cover: makeThumb({ id: "atk6b", domain: "ecommerce", kind: "nangcao", label: "K6 · THRESHOLDS" }),
    tags: tags("nangcao", "k6", "advanced"),
    title: {
      vi: "k6 nâng cao: thresholds, scenarios và custom metrics",
      en: "Advanced k6: thresholds, scenarios and custom metrics",
      ja: "k6 応用：しきい値、シナリオ、カスタム指標",
    },
    summary: {
      vi: "Thresholds làm cổng pass/fail (exit code), scenarios & executors (arrival-rate cho RPS thật), custom metrics Counter/Gauge/Rate/Trend, tags & groups, tham số hóa dữ liệu với SharedArray và mô hình hóa lưu lượng giống thật — trên domain TMĐT.",
      en: "Thresholds as pass/fail gates (exit code), scenarios & executors (arrival-rate for real RPS), custom Counter/Gauge/Rate/Trend metrics, tags & groups, data parameterization with SharedArray and modeling lifelike traffic — on an e-commerce domain.",
      ja: "合否ゲートとしてのしきい値（終了コード）、シナリオとエグゼキュータ（実 RPS のための到着率）、Counter/Gauge/Rate/Trend のカスタム指標、タグとグループ、SharedArray によるデータのパラメータ化、本物らしいトラフィックのモデル化を、EC 領域で解説します。",
    },
    pages: buildDoc(pagesB),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-k6-ci-observability",
    cover: makeThumb({ id: "atk6c", domain: "telecom", kind: "nangcao", label: "K6 · CI/OBS" }),
    tags: tags("nangcao", "k6", "cicd", "advanced"),
    title: {
      vi: "k6 trong CI và observability: cổng, xu hướng, soak test",
      en: "k6 in CI and observability: gates, trends, soak tests",
      ja: "CI と可観測性における k6：ゲート、傾向、ソークテスト",
    },
    summary: {
      vi: "Chạy k6 như cổng chất lượng trong pipeline (exit code từ thresholds, GitHub Actions), stream metric tới Prometheus/Grafana/InfluxDB, đối chiếu với metric server, phát hiện hồi quy hiệu năng theo thời gian, soak test và k6 Cloud/phân tán — trên domain viễn thông.",
      en: "Running k6 as a quality gate in the pipeline (exit code from thresholds, GitHub Actions), streaming metrics to Prometheus/Grafana/InfluxDB, correlating with server metrics, detecting performance regressions over time, soak tests and k6 Cloud/distributed execution — on a telecom domain.",
      ja: "パイプラインで品質ゲートとして k6 を実行（しきい値からの終了コード、GitHub Actions）、Prometheus/Grafana/InfluxDB への指標ストリーム、サーバー指標との相関、時間経過での性能回帰の検出、ソークテスト、k6 Cloud/分散実行を、通信領域で解説します。",
    },
    pages: buildDoc(pagesC),
  },
];
