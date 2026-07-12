// doc_ma_metrics.mjs — BÀI MANUAL NÂNG CAO: Đo lường chất lượng kiểm thử (Test Metrics)
// cho dự án phần mềm doanh nghiệp — hệ quản trị doanh nghiệp (ERP) lớn.
// Chọn đúng metric theo mục tiêu, công thức & diễn giải Defect Density / DRE / MTTR /
// Test Coverage / Pass Rate, tránh lạm dụng metric (đo sai hành vi — Goodhart's Law),
// dùng metric để cải tiến quy trình & báo cáo lãnh đạo. Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, jira, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, chỉ số chất lượng & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "nangcao", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle, description: cfg.metaDescription, slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword, keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq), courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "erp", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Helper cục bộ: BIỂU ĐỒ XU HƯỚNG (line chart, 0-100%) — không sửa ui_mock.mjs ──
const escT = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function trendChart(title, labels, series, { accent = "#155ce1", h = 300 } = {}) {
  const W = 760;
  const left = 54, right = 24, top = 78, bottom = 46;
  const plotW = W - left - right, plotH = h - top - bottom;
  const n = labels.length;
  const stepX = n > 1 ? plotW / (n - 1) : 0;
  const yFor = (v) => top + plotH - (v / 100) * plotH;
  const gridLines = [0, 25, 50, 75, 100].map((g) =>
    `<line x1="${left}" y1="${yFor(g)}" x2="${W - right}" y2="${yFor(g)}" stroke="#eef2f7"/><text x="${left - 10}" y="${yFor(g) + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${g}</text>`
  ).join("");
  const xLabels = labels.map((lb, i) =>
    `<text x="${left + i * stepX}" y="${h - 14}" text-anchor="middle" font-size="10.5" fill="#64748b">${escT(lb)}</text>`
  ).join("");
  const lines = series.map((s) => {
    const pts = s.values.map((v, i) => `${left + i * stepX},${yFor(v)}`).join(" ");
    const dots = s.values.map((v, i) => `<circle cx="${left + i * stepX}" cy="${yFor(v)}" r="3.2" fill="${s.color}"/>`).join("");
    return `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
  }).join("");
  const legend = series.map((s, i) => {
    const x = 24 + i * 200;
    return `<rect x="${x}" y="54" width="12" height="12" rx="3" fill="${s.color}"/><text x="${x + 18}" y="64" font-size="11.5" font-weight="700" fill="#334155">${escT(s.name)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="${W}" height="${h}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="0" y="0" width="${W}" height="42" rx="16" fill="${accent}"/><rect x="0" y="22" width="${W}" height="20" fill="${accent}"/>
<text x="20" y="27" font-size="14" font-weight="800" fill="#ffffff">${escT(title)}</text>
${legend}
${gridLines}
${lines}
${xLabels}
</svg>`;
}

// ── Mockup 1: dashboard các chỉ số chính, dự án ERP doanh nghiệp VinaERP ──
const m_dash = dashboard("Bảng điều khiển chỉ số kiểm thử — ERP VinaERP (Sprint 24)", [
  { label: "Defect Density", value: "1.8", sub: "lỗi / KLOC · toàn hệ thống", color: "#e11d48" },
  { label: "DRE", value: "92%", sub: "lỗi lọc trước release", color: "#16a34a" },
  { label: "MTTR (Critical)", value: "6.4h", sub: "trung bình khắc phục", color: "#f59e0b" },
  { label: "Test Coverage", value: "78%", sub: "yêu cầu được test", color: "#2563eb" },
  { label: "Pass Rate", value: "96%", sub: "ca kiểm thử pass", color: "#7c3aed" },
]);

// ── Mockup 2: bảng công thức tính từng metric ──
const m_formulas = grid("Công thức tính 5 chỉ số đo lường chất lượng kiểm thử", ["Chỉ số", "Công thức", "Đơn vị"], [
  ["Defect Density", "Số lỗi tìm được ÷ Kích thước sản phẩm (KLOC / module / use case)", "lỗi/KLOC"],
  ["DRE", "Lỗi trước release ÷ (Lỗi trước release + Lỗi sau release trong 30 ngày) × 100%", "%"],
  ["MTTR", "Tổng thời gian khắc phục các lỗi ÷ Số lỗi đã khắc phục", "giờ"],
  ["Test Coverage", "Số yêu cầu/luồng được test ÷ Tổng số yêu cầu/luồng × 100%", "%"],
  ["Pass Rate", "Số ca kiểm thử Pass ÷ Tổng số ca kiểm thử đã chạy × 100%", "%"],
], { accent: "#155ce1", note: "Luôn ghi rõ mẫu số (kích thước sản phẩm, cửa sổ thời gian, tổng số ca) khi báo cáo — thiếu mẫu số, con số dễ bị hiểu sai." });

// ── Mockup 3: bảng metric dùng ĐÚNG vs BỊ LẠM DỤNG (Goodhart's Law) ──
const m_misuse = grid("Dùng metric ĐÚNG vs BỊ LẠM DỤNG (đo sai hành vi)", ["Chỉ số", "Dùng ĐÚNG — cải tiến quy trình", "Lạm dụng — gây tác dụng ngược"], [
  ["Số lỗi tester tìm được", "Theo dõi xu hướng theo module để phân bổ lại nguồn lực test", "Gắn KPI cá nhân theo SỐ LƯỢNG → tester báo bug rác/trùng để đạt chỉ tiêu"],
  ["Pass Rate", "Kết hợp Test Coverage để đánh giá độ tin cậy thực sự", "Chỉ nhìn % Pass cao rồi kết luận 'sẵn sàng release' dù coverage vùng rủi ro thấp"],
  ["DRE", "So sánh DRE giữa các release để đánh giá hiệu quả kiểm thử trước release", "Trì hoãn không tính lỗi phát hiện sau release để ép DRE = 100%"],
  ["MTTR", "Ưu tiên phân bổ người xử lý lỗi Critical/High nhanh hơn", "Ép fix nhanh bằng mọi giá → fix ẩu, không viết ca hồi quy, lỗi tái phát"],
], { accent: "#e11d48", note: "Goodhart's Law: khi một chỉ số trở thành MỤC TIÊU (KPI cá nhân), nó thường ngừng là chỉ số tốt để đo lường." });

// ── Mockup 4: kanban lỗi Sprint 24 sau khi gắn KPI 'số bug tìm được' cho tester ──
const m_kanban = kanban("Bảng lỗi Sprint 24 — sau khi gắn KPI 'số bug tìm được' cho tester", [
  { name: "New", cards: [
    { key: "ERP-5510", title: "Nút Lưu lệch 1px trên màn hình phụ", sev: "Low" },
    { key: "ERP-5511", title: "Trùng nội dung với ERP-5488 (đã báo tuần trước)", sev: "Low" },
  ] },
  { name: "Invalid", cards: [
    { key: "ERP-5498", title: "Nhãn 'Save' tiếng Anh ở màn hình ít dùng nội bộ", sev: "Low" },
  ] },
  { name: "Duplicate", cards: [
    { key: "ERP-5501", title: "Trùng nội dung với ERP-5477", sev: "Low" },
  ] },
  { name: "Valid — Critical", cards: [
    { key: "ERP-5477", title: "Duyệt phiếu chi 2 lần tạo 2 bút toán kế toán trùng", sev: "Critical" },
  ] },
]);

// ── Mockup 5: ticket MTTR — dấu thời gian từ phát hiện tới xác nhận khắc phục ──
const m_jira_mttr = jira({
  key: "ERP-5477", title: "Duyệt phiếu chi 2 lần tạo 2 bút toán kế toán trùng — ảnh hưởng sổ cái",
  type: "Bug", status: "Verified", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · module Kế toán · VinaERP v6.2"],
    ["Phát hiện", "08:12 · 14/07 — regression trước release"],
    ["Bắt đầu sửa", "09:40 · 14/07"],
    ["Hoàn tất sửa", "13:55 · 14/07"],
    ["Xác nhận (verify)", "14:34 · 14/07"],
    ["MTTR ticket này", "≈ 6.4 giờ (từ phát hiện tới xác nhận)"],
  ],
});

// ── Mockup 6: biểu đồ xu hướng DRE / Test Coverage / Pass Rate qua 6 sprint ──
const m_trend = trendChart("Xu hướng DRE, Test Coverage, Pass Rate — 6 sprint gần nhất (ERP VinaERP)",
  ["Sprint 19", "Sprint 20", "Sprint 21", "Sprint 22", "Sprint 23", "Sprint 24"],
  [
    { name: "DRE (%)", color: "#16a34a", values: [72, 78, 81, 85, 89, 92] },
    { name: "Test Coverage (%)", color: "#2563eb", values: [55, 60, 65, 70, 74, 78] },
    { name: "Pass Rate (%)", color: "#7c3aed", values: [90, 91, 93, 94, 95, 96] },
  ]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Test metrics là gì và vì sao dự án ERP doanh nghiệp cần đo lường chất lượng kiểm thử?",
  "What are test metrics, and why does an enterprise ERP project need to measure testing quality?",
  "Test metrics (chỉ số đo lường kiểm thử) là các con số định lượng — như Defect Density, DRE, MTTR, Test Coverage, Pass Rate — phản ánh chất lượng sản phẩm và hiệu quả quy trình kiểm thử theo thời gian, thay vì cảm tính 'thấy ổn'. Với dự án ERP doanh nghiệp lớn — nhiều module Kế toán, Bán hàng, Kho, Nhân sự liên kết chặt với nhau — một lỗi nhỏ lọt production có thể gây sai lệch số liệu tài chính dây chuyền. Metric giúp phát hiện sớm module nào đang rủi ro, quy trình nào đang chậm cải thiện, để can thiệp trước khi hậu quả lan rộng.",
  "Test metrics are quantitative numbers — like Defect Density, DRE, MTTR, Test Coverage, Pass Rate — that reflect product quality and testing process effectiveness over time, instead of a gut feeling that things 'look fine'. On a large enterprise ERP project — with Accounting, Sales, Inventory, and HR modules tightly interlinked — one small bug that escapes to production can cascade into wrong financial figures across modules. Metrics help spot which module is at risk and which process is stalling early enough to intervene before the impact spreads.",
  "テストメトリクス（test metrics）とは何？なぜ企業向けERPプロジェクトにテスト品質の測定が必要？",
  "テストメトリクスとは、Defect Density、DRE、MTTR、Test Coverage、Pass Rateなど、感覚的な『大丈夫そう』ではなく、時系列で製品品質とテストプロセスの効果を反映する定量的な数値です。会計・販売・在庫・人事モジュールが密接に連携する大規模な企業向けERPプロジェクトでは、本番環境に漏れた小さなバグが連鎖的に財務数値の誤りを引き起こす可能性があります。メトリクスはどのモジュールがリスクにさらされ、どのプロセスの改善が停滞しているかを早期に発見し、影響が広がる前に介入するのに役立ちます。");
const faq2 = FAQ(
  "Nên chọn Defect Density, DRE, MTTR, Test Coverage hay Pass Rate để báo cáo lãnh đạo?",
  "Should I report Defect Density, DRE, MTTR, Test Coverage, or Pass Rate to leadership?",
  "Không có một chỉ số 'vạn năng' — mỗi chỉ số trả lời một câu hỏi khác nhau: Defect Density cho biết module nào rủi ro cao; DRE cho biết quy trình kiểm thử trước release có hiệu quả không; MTTR cho biết đội phản ứng sự cố nhanh hay chậm; Test Coverage cho biết phần nào CHƯA được test; Pass Rate chỉ cho biết ca đã chạy có pass không, không nói gì về phần chưa được viết ca. Báo cáo lãnh đạo nên trình bày TỐI THIỂU một cặp bổ trợ (ví dụ Pass Rate đi kèm Test Coverage) kèm xu hướng nhiều sprint, thay vì một con số đơn lẻ tại một thời điểm.",
  "There's no single 'do-it-all' metric — each answers a different question: Defect Density shows which module is high-risk; DRE shows whether pre-release testing is effective; MTTR shows how fast the team responds to incidents; Test Coverage shows what hasn't been tested yet; Pass Rate only shows whether executed cases passed, saying nothing about untested areas. A leadership report should present at least one complementary pair (e.g. Pass Rate alongside Test Coverage) with a multi-sprint trend, rather than a single number at one point in time.",
  "経営陣への報告にはDefect Density、DRE、MTTR、Test Coverage、Pass Rateのどれを選ぶべき？",
  "『万能』な単一指標はありません——各指標は異なる問いに答えます：Defect Densityはどのモジュールが高リスクかを示し、DREはリリース前テストの効果を示し、MTTRはチームのインシデント対応速度を示し、Test Coverageは未テスト領域を示し、Pass Rateは実行済みケースの合格状況のみを示し未テスト領域については何も語りません。経営陣への報告では、単一時点の1つの数値ではなく、少なくとも1組の補完的な指標（例：Pass RateとTest Coverageを併記）と複数スプリントにわたる傾向を示すべきです。");
const faq3 = FAQ(
  "Làm sao tránh lạm dụng metric khiến tester hành xử sai (đo sai hành vi)?",
  "How do I avoid metric misuse that drives testers into the wrong behavior?",
  "Nguyên tắc cốt lõi là Goodhart's Law: khi một chỉ số trở thành MỤC TIÊU cá nhân (KPI), nó thường ngừng là thước đo tốt. Cụ thể: không gắn KPI cá nhân trực tiếp theo SỐ LƯỢNG bug tìm được (sinh bug rác/trùng); luôn dùng nhiều chỉ số bổ trợ lẫn nhau thay vì một con số đơn lẻ (Pass Rate cao vẫn cần đối chiếu Test Coverage); ưu tiên đo XU HƯỚNG theo thời gian và NGUYÊN NHÂN GỐC của bất thường, thay vì so sánh cứng nhắc giữa các cá nhân/team; và luôn giải thích bối cảnh (mẫu số, phạm vi đo, độ phức tạp module) khi trình bày con số.",
  "The core principle is Goodhart's Law: when a metric becomes a personal target (a KPI), it usually stops being a good measure. Concretely: don't tie individual KPIs directly to the NUMBER of bugs found (it breeds junk/duplicate bugs); always use several complementary metrics rather than a single number (a high Pass Rate still needs to be checked against Test Coverage); prioritize measuring TRENDS over time and the ROOT CAUSE of anomalies rather than rigidly comparing individuals or teams; and always explain the context (denominator, measurement scope, module complexity) when presenting a number.",
  "テスターを誤った行動に導くメトリクスの乱用をどう避ける？",
  "核心原則はグッドハートの法則です：ある指標が個人の目標（KPI）になると、その指標は良い測定基準でなくなることが多いということです。具体的には：発見したバグの『数』を直接個人KPIに結びつけない（ゴミ/重複バグを生む）。単一の数値ではなく常に複数の補完指標を用いる（高いPass Rateでも必ずTest Coverageと照合する）。個人やチーム間の硬直的な比較ではなく、時系列の傾向と異常の根本原因の測定を優先する。そして数値を提示する際は常に文脈（分母、測定範囲、モジュールの複雑さ）を説明する。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Defect Density được tính theo công thức nào?", en: "Which formula defines Defect Density?", ja: "Defect Density（欠陥密度）はどの計算式で求める？" },
    options: [
      { vi: "Số lỗi tìm được ÷ Kích thước sản phẩm (KLOC/module/use case)", en: "Number of defects found ÷ product size (KLOC/module/use case)", ja: "発見された欠陥数 ÷ 製品規模（KLOC/モジュール/ユースケース）" },
      { vi: "Số ca kiểm thử Pass ÷ Tổng số ca đã chạy × 100%", en: "Passed test cases ÷ total executed cases × 100%", ja: "合格したテストケース数 ÷ 実行済みケース総数 × 100%" },
      { vi: "Thời gian trung bình khắc phục lỗi", en: "The average time to repair a defect", ja: "欠陥修復の平均時間" },
      { vi: "Số lỗi lọt ra production sau release", en: "The number of defects that escape to production after release", ja: "リリース後に本番環境へ漏れた欠陥数" },
    ], correct: 0,
    explain: { vi: "Defect Density = số lỗi tìm được chia cho kích thước sản phẩm (thường tính theo KLOC hoặc theo module/use case), cho biết mật độ lỗi để so sánh giữa các module.", en: "Defect Density = defects found divided by product size (often KLOC, or per module/use case), showing defect density to compare modules.", ja: "Defect Density＝発見された欠陥数を製品規模（多くはKLOC、またはモジュール/ユースケース単位）で割ったもので、モジュール間の欠陥密度を比較するのに使う。" },
  }),
  mcq({
    q: { vi: "DRE (Defect Removal Efficiency) đo lường điều gì?", en: "What does DRE (Defect Removal Efficiency) measure?", ja: "DRE（Defect Removal Efficiency）は何を測定する？" },
    options: [
      { vi: "Tỉ lệ lỗi được lọc TRƯỚC khi release so với tổng lỗi (trước + sau release)", en: "The proportion of defects caught BEFORE release out of total defects (before + after release)", ja: "リリース前に除去された欠陥の割合（リリース前＋リリース後の合計欠陥数に対する比率）" },
      { vi: "Số lỗi trung bình trên mỗi module", en: "The average number of defects per module", ja: "モジュールあたりの平均欠陥数" },
      { vi: "Thời gian trung bình để viết một ca kiểm thử", en: "The average time to write one test case", ja: "テストケース1件を書く平均時間" },
      { vi: "Tổng số ca kiểm thử đã tự động hoá", en: "The total number of automated test cases", ja: "自動化されたテストケースの総数" },
    ], correct: 0,
    explain: { vi: "DRE = Lỗi trước release ÷ (Lỗi trước release + Lỗi sau release trong một cửa sổ thời gian) × 100% — DRE thấp nghĩa là quy trình kiểm thử đang để lọt nhiều lỗi ra production.", en: "DRE = defects before release ÷ (defects before release + defects after release within a time window) × 100% — a low DRE means the testing process is letting many defects escape to production.", ja: "DRE＝リリース前欠陥数 ÷（リリース前欠陥数＋一定期間内のリリース後欠陥数）× 100%——DREが低いとテストプロセスが多くの欠陥を本番環境に漏らしていることを意味する。" },
  }),
  mcq({
    q: { vi: "Vì sao gắn KPI cá nhân trực tiếp theo SỐ LƯỢNG bug tester tìm được thường phản tác dụng?", en: "Why does tying individual KPIs directly to the NUMBER of bugs a tester finds often backfire?", ja: "テスターが発見したバグの『数』を直接個人KPIに結びつけるとなぜ逆効果になりやすい？" },
    options: [
      { vi: "Vì bug tìm được không bao giờ được sửa", en: "Because found bugs never get fixed", ja: "発見されたバグは決して修正されないから" },
      { vi: "Vì tester có xu hướng báo bug rác/trùng/không nghiêm trọng để đạt chỉ tiêu, làm nhiễu dữ liệu chất lượng thật (Goodhart's Law)", en: "Because testers tend to report junk/duplicate/trivial bugs to hit the quota, polluting the real quality data (Goodhart's Law)", ja: "テスターがノルマ達成のためゴミ/重複/軽微なバグを報告する傾向が生まれ、実際の品質データが歪むから（グッドハートの法則）" },
      { vi: "Vì hệ thống quản lý lỗi không cho phép đếm số lượng", en: "Because the bug tracking system doesn't allow counting bugs", ja: "バグ管理システムは件数をカウントできないから" },
      { vi: "Vì tester sẽ không tìm được lỗi nào nữa", en: "Because testers will stop finding any bugs at all", ja: "テスターがバグを一切見つけなくなるから" },
    ], correct: 1,
    explain: { vi: "Khi một chỉ số trở thành mục tiêu cá nhân, người ta tối ưu để đạt chỉ số đó thay vì mục tiêu thật (chất lượng) — đây chính là Goodhart's Law, minh hoạ điển hình của việc metric bị lạm dụng.", en: "When a metric becomes a personal target, people optimize to hit the metric instead of the real goal (quality) — this is Goodhart's Law, a classic example of metric misuse.", ja: "指標が個人の目標になると、人は本当の目的（品質）ではなく指標そのものを達成しようと最適化する——これがグッドハートの法則であり、メトリクス乱用の典型例。" },
  }),
  mcq({
    q: { vi: "Pass Rate 99% có luôn đồng nghĩa sản phẩm sẵn sàng release không?", en: "Does a 99% Pass Rate always mean the product is ready to release?", ja: "Pass Rate 99%は常にリリース可能を意味する？" },
    options: [
      { vi: "Có, Pass Rate cao luôn nghĩa là release an toàn", en: "Yes, a high Pass Rate always means it's safe to release", ja: "はい、高いPass Rateは常に安全なリリースを意味する" },
      { vi: "Không, cần đối chiếu thêm Test Coverage vì Pass Rate cao có thể do thiếu ca kiểm thử ở vùng rủi ro cao", en: "No, it must be checked against Test Coverage, since a high Pass Rate can come from too few test cases in high-risk areas", ja: "いいえ、高リスク領域のテストケースが少ないために高いPass Rateになっている可能性があるため、Test Coverageと照合する必要がある" },
      { vi: "Không, vì Pass Rate không thể tính theo phần trăm", en: "No, because Pass Rate cannot be expressed as a percentage", ja: "いいえ、Pass Rateはパーセントで表せないから" },
      { vi: "Có, miễn là MTTR bằng 0", en: "Yes, as long as MTTR is zero", ja: "はい、MTTRが0である限り" },
    ], correct: 1,
    explain: { vi: "Pass Rate chỉ nói về ca ĐÃ chạy, không nói gì về phần CHƯA được viết ca — Test Coverage thấp mà Pass Rate cao là dấu hiệu điển hình của 'lạm dụng metric' che giấu rủi ro thật.", en: "Pass Rate only reflects executed cases, saying nothing about untested areas — low Test Coverage with a high Pass Rate is a classic sign of metric misuse hiding real risk.", ja: "Pass Rateは実行済みケースについてのみを示し、未テスト領域については何も語らない——低いTest Coverageと高いPass Rateの組み合わせは、実際のリスクを隠すメトリクス乱用の典型的な兆候。" },
  }),
  mcq({
    q: { vi: "MTTR (Mean Time To Repair) phù hợp nhất để đo điều gì?", en: "What is MTTR (Mean Time To Repair) best used to measure?", ja: "MTTR（Mean Time To Repair）は何を測定するのに最も適している？" },
    options: [
      { vi: "Mật độ lỗi trên mỗi module", en: "Defect density per module", ja: "モジュールあたりの欠陥密度" },
      { vi: "Tỉ lệ ca kiểm thử được tự động hoá", en: "The proportion of automated test cases", ja: "自動化されたテストケースの割合" },
      { vi: "Tốc độ trung bình khắc phục lỗi sau khi phát hiện, đặc biệt lỗi Critical/High", en: "The average speed at which defects are fixed after detection, especially Critical/High ones", ja: "特にCritical/Highの欠陥について、発見後の平均修復速度" },
      { vi: "Số yêu cầu nghiệp vụ chưa được test", en: "The number of business requirements not yet tested", ja: "まだテストされていない業務要件の数" },
    ], correct: 2,
    explain: { vi: "MTTR = tổng thời gian khắc phục các lỗi ÷ số lỗi đã khắc phục — dùng để đánh giá tốc độ phản ứng của đội, đặc biệt quan trọng với lỗi mức Critical/High ảnh hưởng nghiệp vụ.", en: "MTTR = total time to fix defects ÷ number of defects fixed — used to assess the team's response speed, especially critical for Critical/High-severity business-impacting defects.", ja: "MTTR＝欠陥修復にかかった合計時間 ÷ 修復済み欠陥数——チームの対応速度を評価するために使われ、特に業務に影響するCritical/High欠陥にとって重要。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & vì sao dự án ERP cần bộ chỉ số kiểm thử", en: "1. TL;DR & why an ERP project needs a testing metrics suite", ja: "1. 要点とERPプロジェクトにテストメトリクス群が必要な理由" },
    blocks: [
      TLDR("Đo lường chất lượng kiểm thử (test metrics) là dùng các con số định lượng — Defect Density, DRE, MTTR, Test Coverage, Pass Rate — để phản ánh chất lượng sản phẩm và hiệu quả quy trình, thay vì cảm tính. Bài này bám dự án ERP doanh nghiệp lớn VinaERP: bạn học công thức, cách diễn giải đúng từng chỉ số, hai tình huống thật cho thấy đo sai hành vi gây hại (KPI số bug, pass rate ảo), và cách dùng metric để cải tiến quy trình & báo cáo lãnh đạo. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Measuring testing quality (test metrics) means using quantitative numbers — Defect Density, DRE, MTTR, Test Coverage, Pass Rate — to reflect product quality and process effectiveness instead of gut feeling. This article follows the large enterprise ERP project VinaERP: you'll learn the formulas, how to interpret each metric correctly, two real situations showing how measuring the wrong behavior causes harm (bug-count KPIs, a false pass rate), and how to use metrics to improve process and report to leadership. Lots of visuals and a quiz at the end.",
        "テスト品質の測定（テストメトリクス）とは、感覚ではなくDefect Density、DRE、MTTR、Test Coverage、Pass Rateなどの定量的な数値を用いて、製品品質とプロセスの効果を反映することです。本記事は大規模な企業向けERPプロジェクトVinaERPに沿って進みます：各指標の計算式と正しい解釈、誤った行動を測定してしまう害を示す2つの実例（バグ件数KPI、見せかけのパスレート）、そしてメトリクスをプロセス改善と経営陣への報告に活用する方法を学びます。図が豊富で最後にクイズ付き。"),
      P("VinaERP là hệ quản trị doanh nghiệp (ERP) lớn phục vụ hàng trăm khách hàng doanh nghiệp, gồm các module liên kết chặt: Kế toán, Bán hàng, Kho, Mua hàng, Nhân sự. Một nghiệp vụ đơn giản như 'duyệt phiếu chi' có thể chạm tới ba module cùng lúc — nếu kiểm thử lỏng lẻo, một lỗi nhỏ có thể tạo ra bút toán sai lệch dây chuyền trên toàn hệ thống sổ sách. Ở quy mô này, 'cảm thấy ổn' không còn đủ; đội QA cần một bộ chỉ số định lượng để biết chính xác module nào rủi ro, quy trình nào đang chậm cải thiện, và khi nào có thể tự tin release.",
        "VinaERP is a large enterprise resource planning (ERP) system serving hundreds of corporate clients, made up of tightly linked modules: Accounting, Sales, Inventory, Procurement, HR. A simple operation like 'approving a payment voucher' can touch three modules at once — with loose testing, one small bug can cascade into mismatched ledger entries across the whole books. At this scale, 'feels fine' is no longer enough; the QA team needs a quantitative metrics suite to know exactly which module is at risk, which process is improving too slowly, and when it's safe to confidently release.",
        "VinaERPは数百の法人顧客にサービスを提供する大規模な企業資源計画（ERP）システムで、会計・販売・在庫・購買・人事の各モジュールが密接に連携しています。『支払伝票の承認』のような単純な業務でも同時に3つのモジュールに触れることがあり、テストが甘いと小さなバグが帳簿全体にわたる連鎖的な数値の不整合を引き起こしかねません。この規模では『大丈夫そう』という感覚だけでは不十分で、QAチームはどのモジュールがリスクにさらされ、どのプロセスの改善が遅れているか、いつ自信を持ってリリースできるかを正確に把握するための定量的な指標群を必要とします。"),
      IMG(m_dash, "Bảng điều khiển các chỉ số đo lường chất lượng kiểm thử chính của dự án ERP VinaERP", "Dashboard of the ERP VinaERP project's main testing quality metrics", "ERP VinaERPプロジェクトの主要テスト品質メトリクスのダッシュボード"),
      DEF("Test Metrics", "các con số định lượng (Defect Density, DRE, MTTR, Test Coverage, Pass Rate...) dùng để đo chất lượng sản phẩm và hiệu quả quy trình kiểm thử theo thời gian, làm căn cứ ra quyết định thay vì cảm tính.",
        "quantitative numbers (Defect Density, DRE, MTTR, Test Coverage, Pass Rate...) used to measure product quality and testing process effectiveness over time, serving as a decision basis instead of gut feeling.",
        "感覚ではなく意思決定の根拠として、時系列で製品品質とテストプロセスの効果を測定するための定量的な数値（Defect Density、DRE、MTTR、Test Coverage、Pass Rateなど）。"),
    ] },
  { heading: { vi: "2. Chọn đúng metric theo mục tiêu — đừng đo cho có", en: "2. Choose the right metric for the goal — don't measure just to measure", ja: "2. 目的に合った正しいメトリクスを選ぶ — 形だけの測定はしない" },
    blocks: [
      P("Sai lầm phổ biến nhất khi đo lường chất lượng kiểm thử là bắt đầu từ 'chúng ta có công cụ đo được cái này, vậy đo luôn' thay vì bắt đầu từ mục tiêu. Cách làm đúng theo khung GQM (Goal — Question — Metric): trước tiên xác định MỤC TIÊU cụ thể (ví dụ 'giảm lỗi sản xuất ảnh hưởng module Kế toán'), sau đó đặt CÂU HỎI cần trả lời ('module nào đang có mật độ lỗi cao bất thường?'), rồi mới chọn METRIC phù hợp để trả lời câu hỏi đó (Defect Density theo module). Nếu đi ngược — chọn metric trước rồi tìm lý do đo — bạn dễ có một núi báo cáo đẹp nhưng vô dụng cho việc ra quyết định.",
        "The most common mistake when measuring testing quality is starting from 'we have a tool that can measure this, so let's measure it' instead of starting from a goal. The correct approach follows the GQM framework (Goal — Question — Metric): first define a specific GOAL (e.g. 'reduce production defects affecting the Accounting module'), then frame the QUESTION that needs answering ('which module has an abnormally high defect density?'), and only then pick the METRIC that answers it (Defect Density by module). Going in reverse — picking a metric first and inventing a reason to measure it — easily produces a mountain of pretty but useless-for-decisions reports.",
        "テスト品質測定で最もよくある間違いは、目標から始めるのではなく『これを測れるツールがあるから測ろう』から始めることです。正しいアプローチはGQMフレームワーク（Goal—Question—Metric）に従います：まず具体的な目標を定義し（例：『会計モジュールに影響する本番欠陥を減らす』）、次に答えるべき質問を立て（『どのモジュールが異常に高い欠陥密度を持つか？』）、その質問に答えるメトリクスを選びます（モジュール別Defect Density）。逆順で——先にメトリクスを選んでから測定理由を後付けする——と、見た目は綺麗でも意思決定には役立たない報告書の山ができやすくなります。"),
      P("Với dự án ERP như VinaERP, các mục tiêu thường gặp và metric tương ứng: giảm rủi ro sản xuất ở module tài chính → Defect Density + DRE theo module; tăng tốc độ xử lý sự cố production → MTTR theo mức độ nghiêm trọng; đảm bảo nghiệp vụ quan trọng không bị bỏ sót khi test → Test Coverage theo yêu cầu/luồng nghiệp vụ; theo dõi sức khoẻ bộ hồi quy → Pass Rate kết hợp xu hướng theo thời gian. Không có chỉ số nào 'vạn năng' — luôn xuất phát từ câu hỏi cụ thể đội đang cần trả lời.",
        "For an ERP project like VinaERP, common goals and their matching metrics: reduce production risk in the financial module → Defect Density + DRE by module; speed up production incident response → MTTR by severity; ensure critical business flows aren't missed during testing → Test Coverage by requirement/business flow; monitor the health of the regression suite → Pass Rate combined with a time trend. No single metric is 'do-it-all' — always start from the specific question the team needs answered.",
        "VinaERPのようなERPプロジェクトでは、よくある目標と対応するメトリクスは次のとおりです：財務モジュールの本番リスクを減らす→モジュール別Defect Density＋DRE、本番インシデント対応を高速化する→重大度別MTTR、テスト時に重要業務が漏れないようにする→要件/業務フロー別Test Coverage、リグレッションスイートの健全性を監視する→時系列傾向を伴うPass Rate。『万能』な単一指標は存在せず、常にチームが答える必要のある具体的な問いから始めるべきです。"),
      TIP("Trước khi thêm bất kỳ metric mới nào vào báo cáo, tự hỏi: 'Nếu con số này thay đổi, chúng ta sẽ làm gì khác đi?' — nếu không trả lời được, đó có thể là vanity metric (chỉ số cho đẹp báo cáo, không giúp ra quyết định).", "Before adding any new metric to a report, ask: 'If this number changes, what would we do differently?' — if you can't answer, it may be a vanity metric (one that looks good in a report but doesn't drive any decision).", "レポートに新しいメトリクスを追加する前に自問しよう：『この数値が変化したら、私たちは何を変えるか？』——答えられなければ、それはバニティメトリクス（レポートを見栄えよくするだけで意思決定に役立たない指標）かもしれません。"),
      PITFALL("Đo quá nhiều chỉ số cùng lúc 'cho chắc' khiến báo cáo dài nhưng loãng, không ai nhớ nổi con số nào quan trọng. Chọn 3-5 chỉ số cốt lõi gắn trực tiếp với mục tiêu hiện tại của dự án, thay vì liệt kê mọi thứ đo được.", "Measuring too many metrics at once 'just to be safe' makes reports long but diluted, and nobody remembers which number matters. Pick 3-5 core metrics tied directly to the project's current goals instead of listing everything measurable.", "『念のため』とあまりに多くの指標を同時に測定すると、報告書は長くなるが薄まり、どの数値が重要か誰も覚えていられません。測定可能なものを全て列挙するのではなく、プロジェクトの現在の目標に直結する3〜5個の中核指標を選びましょう。"),
    ] },
  { heading: { vi: "3. Defect Density — công thức & cách diễn giải đúng", en: "3. Defect Density — formula and correct interpretation", ja: "3. Defect Density — 計算式と正しい解釈" },
    blocks: [
      P("Defect Density (mật độ lỗi) đo số lỗi tìm được trên một đơn vị kích thước sản phẩm — thường là KLOC (nghìn dòng code), nhưng với dự án nghiệp vụ như ERP, đội QA VinaERP thường quy đổi theo SỐ LƯỢNG USE CASE hoặc SỐ MÀN HÌNH NGHIỆP VỤ của từng module để dễ so sánh giữa các module có độ phức tạp khác nhau. Công thức: Defect Density = Số lỗi tìm được ÷ Kích thước sản phẩm.",
        "Defect Density measures the number of defects found per unit of product size — usually KLOC (thousand lines of code), but for a business-driven project like an ERP, VinaERP's QA team often normalizes by NUMBER OF USE CASES or BUSINESS SCREENS per module to make comparison easier across modules of differing complexity. Formula: Defect Density = defects found ÷ product size.",
        "Defect Density（欠陥密度）は、製品規模の単位あたりに発見された欠陥数を測定します——通常はKLOC（千行のコード）ですが、ERPのような業務主導型プロジェクトでは、VinaERPのQAチームは複雑さの異なるモジュール間で比較しやすいよう、モジュールごとのユースケース数や業務画面数で正規化することが多いです。計算式：Defect Density＝発見された欠陥数÷製品規模。"),
      CODE("text", "VI DU: Defect Density theo module - Sprint 24 (VinaERP)\nModule Ke toan   : 24 loi / 12 use case = 2.0 loi/use case\nModule Ban hang   : 18 loi / 20 use case = 0.9 loi/use case\nModule Kho        : 9  loi / 15 use case = 0.6 loi/use case\nModule Nhan su     : 6  loi / 18 use case = 0.3 loi/use case\n=> Ke toan co mat do loi cao gap 2-6 lan cac module khac -> can uu tien\n   review lai thiet ke test case va tang so gio kiem thu cho module nay."),
      P("Diễn giải đúng Defect Density đòi hỏi ngữ cảnh, không chỉ nhìn con số thô. Mật độ lỗi CAO không phải luôn xấu — có thể vì module đó nghiệp vụ phức tạp hơn (Kế toán có nhiều quy tắc tính toán, bút toán kép), hoặc vì đội test module đó đang làm việc kỹ hơn hẳn các module khác. Ngược lại, mật độ lỗi THẤP không phải luôn tốt — nó có thể phản ánh module đó bị test hời hợt, thiếu ca kiểm thử, chứ không hẳn là chất lượng thật sự cao. Vì vậy Defect Density nên luôn được đọc CÙNG với Test Coverage của module đó.",
        "Interpreting Defect Density correctly requires context, not just the raw number. A HIGH defect density isn't always bad — it might be because that module has more complex business rules (Accounting has many calculation rules, double-entry bookkeeping), or because the team testing it is working notably more thoroughly than others. Conversely, a LOW defect density isn't always good — it may reflect shallow testing and too few test cases for that module, not genuinely high quality. So Defect Density should always be read TOGETHER WITH that module's Test Coverage.",
        "Defect Densityを正しく解釈するには、生の数値だけでなく文脈が必要です。密度が高いことは必ずしも悪いことではありません——そのモジュールの業務ルールがより複雑（会計には多くの計算ルールと複式簿記がある）だったり、そのモジュールをテストするチームが他より格段に丁寧に取り組んでいたりする可能性があります。逆に密度が低いことも必ずしも良いことではありません——そのモジュールのテストが浅く、テストケースが少ないことを反映しているだけで、本当に品質が高いとは限りません。そのためDefect Densityは常にそのモジュールのTest Coverageと合わせて読むべきです。"),
      DEF("Defect Density", "số lỗi tìm được chia cho kích thước sản phẩm (KLOC, module, hoặc use case) — dùng để so sánh mật độ lỗi giữa các phần của hệ thống, luôn cần đọc cùng Test Coverage.",
        "the number of defects found divided by product size (KLOC, module, or use case) — used to compare defect density across parts of the system; should always be read alongside Test Coverage.",
        "発見された欠陥数を製品規模（KLOC、モジュール、またはユースケース）で割ったもの——システムの各部分間の欠陥密度を比較するために使い、常にTest Coverageと合わせて読む必要がある。"),
    ] },
  { heading: { vi: "4. DRE (Defect Removal Efficiency) — đo hiệu quả lọc lỗi trước release", en: "4. DRE (Defect Removal Efficiency) — measuring how well defects are filtered before release", ja: "4. DRE（Defect Removal Efficiency）— リリース前の欠陥除去効率を測定する" },
    blocks: [
      P("DRE đo tỉ lệ phần trăm lỗi được phát hiện và xử lý TRƯỚC khi release, so với tổng số lỗi (bao gồm cả lỗi phát hiện SAU release trong một cửa sổ thời gian cố định, thường 30 ngày). Công thức: DRE = Lỗi trước release ÷ (Lỗi trước release + Lỗi sau release trong 30 ngày) × 100%. Đây là chỉ số phản ánh trực tiếp HIỆU QUẢ của toàn bộ quy trình kiểm thử — không chỉ riêng công của tester mà cả review thiết kế, code review, kiểm thử tự động.",
        "DRE measures the percentage of defects found and handled BEFORE release, out of the total defects (including those found AFTER release within a fixed time window, usually 30 days). Formula: DRE = defects before release ÷ (defects before release + defects after release within 30 days) × 100%. This metric directly reflects the EFFECTIVENESS of the entire testing process — not just the tester's work but also design review, code review, and automated testing.",
        "DREは、リリース前に発見・対処された欠陥の割合を、総欠陥数（固定期間、通常30日以内にリリース後発見された欠陥を含む）に対して測定します。計算式：DRE＝リリース前欠陥数÷（リリース前欠陥数＋30日以内のリリース後欠陥数）×100%。この指標はテスタの作業だけでなく、設計レビュー、コードレビュー、自動テストを含むテストプロセス全体の効果を直接反映します。"),
      CODE("text", "VI DU: DRE cho release VinaERP v6.2\nLoi tim truoc release      : 210 loi\nLoi phat hien sau release (30 ngay): 18 loi\nDRE = 210 / (210 + 18) x 100% = 92.1%\n\nSo sanh voi release truoc (v6.1): DRE = 84% (28/33 loi truoc, 28 sau khi tinh du lieu)\n=> DRE tang tu 84% len 92% - quy trinh review + kiem thu hoi quy dang hieu qua hon."),
      P("DRE thấp là tín hiệu cảnh báo sớm: nhiều lỗi đang 'lọt lưới' ra production dù đã trải qua các vòng kiểm thử. Nguyên nhân thường không nằm ở một cá nhân mà ở quy trình — thiếu review thiết kế trước khi code, ca kiểm thử không phủ đúng luồng nghiệp vụ rủi ro cao, hoặc môi trường staging khác quá xa production khiến một số lỗi chỉ xuất hiện khi chạy dữ liệu thật. Vì vậy khi DRE giảm, hành động đúng là điều tra NGUYÊN NHÂN GỐC theo quy trình (shift-left: review sớm hơn, viết ca kiểm thử theo rủi ro), không phải quy trách nhiệm cho một cá nhân.",
        "A low DRE is an early warning sign: many defects are 'slipping through the net' to production despite going through rounds of testing. The cause usually isn't one individual but the process — missing design review before coding, test cases not covering high-risk business flows correctly, or a staging environment too different from production so some defects only appear with real data. So when DRE drops, the right action is to investigate the ROOT CAUSE in the process (shift-left: earlier review, risk-based test case design), not to blame one individual.",
        "低いDREは早期警告のサインです：複数回のテストを経たにもかかわらず、多くの欠陥が本番環境に『網をすり抜けて』います。原因は通常、個人ではなくプロセスにあります——コーディング前の設計レビュー不足、高リスク業務フローを正しくカバーしていないテストケース、ステージング環境が本番環境とかけ離れすぎていて実データでしか現れない欠陥があるなどです。そのためDREが低下したときの正しい対応は、個人を責めることではなく、プロセスにおける根本原因を調査すること（シフトレフト：より早いレビュー、リスクベースのテストケース設計）です。"),
      DEF("DRE", "tỉ lệ phần trăm lỗi được phát hiện trước release so với tổng số lỗi (trước + sau release trong một cửa sổ thời gian cố định) — phản ánh hiệu quả toàn bộ quy trình kiểm thử.",
        "the percentage of defects found before release out of total defects (before + after release within a fixed time window) — reflects the effectiveness of the entire testing process.",
        "総欠陥数（リリース前＋固定期間内のリリース後）に対する、リリース前に発見された欠陥の割合——テストプロセス全体の効果を反映する。"),
    ] },
  { heading: { vi: "5. MTTR — đo tốc độ khắc phục sự cố/lỗi", en: "5. MTTR — measuring the speed of incident/defect resolution", ja: "5. MTTR — インシデント/欠陥の修復速度を測定する" },
    blocks: [
      P("MTTR (Mean Time To Repair/Resolve) đo thời gian trung bình từ khi một lỗi được PHÁT HIỆN tới khi được KHẮC PHỤC và XÁC NHẬN (verify) xong, thường tính riêng theo từng mức độ nghiêm trọng vì lỗi Critical cần phản ứng khác hẳn lỗi Low. Công thức: MTTR = Tổng thời gian khắc phục các lỗi ÷ Số lỗi đã khắc phục. Với dự án ERP, MTTR cho lỗi Critical ảnh hưởng nghiệp vụ tài chính (như phiếu chi, bút toán) đặc biệt quan trọng vì mỗi giờ trì hoãn có thể đồng nghĩa sổ sách khách hàng doanh nghiệp bị sai lệch thêm.",
        "MTTR (Mean Time To Repair/Resolve) measures the average time from when a defect is DETECTED to when it's FIXED and VERIFIED, usually tracked separately by severity level since a Critical defect demands a very different response than a Low one. Formula: MTTR = total time to fix defects ÷ number of defects fixed. For an ERP project, MTTR for Critical defects affecting financial business flows (like payment vouchers, ledger entries) is especially important, since every hour of delay can mean a corporate client's books get further out of sync.",
        "MTTR（Mean Time To Repair/Resolve）は、欠陥が発見されてから修復・検証（verify）が完了するまでの平均時間を測定し、通常はCritical欠陥がLow欠陥とはまったく異なる対応を必要とするため重大度別に個別に追跡されます。計算式：MTTR＝欠陥修復にかかった合計時間÷修復済み欠陥数。ERPプロジェクトでは、支払伝票や仕訳などの財務業務に影響するCritical欠陥のMTTRが特に重要です。遅延1時間ごとに法人顧客の帳簿がさらにずれる可能性があるためです。"),
      IMG(m_jira_mttr, "Ticket lỗi Critical ghi lại dấu thời gian từ phát hiện tới xác nhận khắc phục, dùng để tính MTTR", "A Critical bug ticket recording timestamps from detection to verified fix, used to compute MTTR", "発見から修復確認までのタイムスタンプを記録したCriticalバグチケット、MTTR計算に使用"),
      P("MTTR nên được theo dõi tách biệt theo mức độ nghiêm trọng, không gộp chung mọi lỗi. Gộp chung dễ tạo ảo giác sai: một đội có thể có MTTR trung bình 'đẹp' vì fix rất nhanh hàng chục lỗi giao diện Low, trong khi một lỗi Critical ảnh hưởng sổ cái lại nằm chờ nhiều ngày không ai xử lý — con số trung bình che khuất hoàn toàn vấn đề nghiêm trọng nhất. Ngoài ra, MTTR nên đo đủ ba mốc: phát hiện, bắt đầu sửa, và XÁC NHẬN xong (không chỉ 'code đã commit'), vì một lỗi coi là 'fixed' nhưng chưa verify vẫn có thể tái phát.",
        "MTTR should be tracked separately by severity, not lumped together for every defect. Lumping them together easily creates a false impression: a team might have a 'nice-looking' average MTTR because it fixes dozens of Low-severity UI bugs very quickly, while a single Critical defect affecting the ledger sits unaddressed for days — the average completely masks the most serious issue. MTTR should also track all three milestones: detection, start of fix, and VERIFIED completion (not just 'code committed'), since a defect marked 'fixed' but not yet verified can still recur.",
        "MTTRは全ての欠陥をまとめてではなく、重大度別に個別に追跡すべきです。まとめてしまうと誤った印象を与えやすくなります：あるチームは数十件のLow重大度のUIバグを素早く修正することで『見栄えの良い』平均MTTRを持つ一方、帳簿に影響するたった1件のCritical欠陥が何日も未対応のまま放置されている——平均値は最も深刻な問題を完全に覆い隠してしまいます。また、MTTRは『コードがコミットされた』時点だけでなく、発見・修正開始・検証完了（verified）の3つの節目すべてを追跡すべきです。『修正済み』とされても未検証の欠陥は再発する可能性があるためです。"),
      DEF("MTTR", "thời gian trung bình từ khi lỗi được phát hiện tới khi khắc phục và xác nhận xong, thường tính riêng theo mức độ nghiêm trọng để không che khuất lỗi Critical đang bị trì hoãn.",
        "the average time from when a defect is detected to when it's fixed and verified, usually tracked separately by severity so a delayed Critical defect isn't masked.",
        "欠陥が発見されてから修復・検証が完了するまでの平均時間。放置されているCritical欠陥が覆い隠されないよう、通常は重大度別に個別に追跡する。"),
    ] },
  { heading: { vi: "6. Test Coverage & Pass Rate — công thức, diễn giải và cạm bẫy", en: "6. Test Coverage & Pass Rate — formulas, interpretation, and pitfalls", ja: "6. Test CoverageとPass Rate — 計算式、解釈、落とし穴" },
    blocks: [
      P("Test Coverage đo tỉ lệ phần yêu cầu/luồng nghiệp vụ ĐÃ được viết và chạy ca kiểm thử, so với tổng số yêu cầu/luồng cần test: Test Coverage = Số yêu cầu/luồng được test ÷ Tổng số yêu cầu/luồng × 100%. Pass Rate đo tỉ lệ ca kiểm thử ĐÃ CHẠY và cho kết quả Pass: Pass Rate = Số ca Pass ÷ Tổng số ca đã chạy × 100%. Khác biệt cốt lõi: Test Coverage nói về PHẠM VI (đã test cái gì), còn Pass Rate chỉ nói về KẾT QUẢ của phạm vi đã chọn — nó hoàn toàn im lặng về phần chưa được viết ca kiểm thử.",
        "Test Coverage measures the proportion of requirements/business flows that HAVE been written into and executed by test cases, out of the total requirements/flows needing testing: Test Coverage = requirements/flows tested ÷ total requirements/flows × 100%. Pass Rate measures the proportion of EXECUTED test cases that returned a Pass result: Pass Rate = passed cases ÷ total executed cases × 100%. The core difference: Test Coverage talks about SCOPE (what's been tested), while Pass Rate only talks about the RESULT within the chosen scope — it says nothing at all about what hasn't been written into a test case yet.",
        "Test Coverageは、テストが必要な要件/業務フローの総数に対して、実際にテストケースが作成・実行された要件/業務フローの割合を測定します：Test Coverage＝テスト済み要件/フロー数÷要件/フロー総数×100%。Pass Rateは、実行済みテストケースのうちPass判定になった割合を測定します：Pass Rate＝Pass数÷実行済みケース総数×100%。核心的な違い：Test Coverageは範囲（何をテストしたか）について語り、Pass Rateは選ばれた範囲内の結果についてのみ語ります——まだテストケースが書かれていない部分については一切何も語りません。"),
      P("Cạm bẫy phổ biến nhất khi báo cáo lãnh đạo là chỉ trưng Pass Rate cao (98-99%) mà không kèm Test Coverage — con số này 'đẹp' nhưng có thể đơn giản vì đội chỉ viết ca cho những luồng dễ, bỏ qua các luồng nghiệp vụ phức tạp, hiếm gặp nhưng rủi ro cao (ví dụ: xử lý hoàn tiền một phần khi đơn hàng đã xuất hoá đơn VAT). Một dự án có Test Coverage 45% và Pass Rate 99% thực ra RỦI RO HƠN dự án có Test Coverage 85% và Pass Rate 93%, dù con số Pass Rate của dự án sau thấp hơn.",
        "The most common pitfall in leadership reports is showcasing only a high Pass Rate (98-99%) without accompanying Test Coverage — this number 'looks nice' but may simply be because the team only wrote cases for easy flows, skipping complex, rare-but-high-risk business flows (e.g. handling a partial refund after a VAT invoice has already been issued). A project with 45% Test Coverage and 99% Pass Rate is actually RISKIER than one with 85% Test Coverage and 93% Pass Rate, even though the latter's Pass Rate number is lower.",
        "経営陣への報告で最もよくある落とし穴は、Test Coverageを伴わずに高いPass Rate（98〜99%）だけを見せることです——この数値は『見栄えが良い』ものの、単にチームが簡単なフローのケースしか書かず、複雑で稀だが高リスクな業務フロー（例：VAT請求書発行後の一部返金処理）をスキップしただけかもしれません。Test Coverage 45%・Pass Rate 99%のプロジェクトは、Test Coverage 85%・Pass Rate 93%のプロジェクトよりも実際にはリスクが高いのです。後者のPass Rate数値の方が低いにもかかわらずです。"),
      TIP("Luôn trình bày Pass Rate ĐI KÈM Test Coverage trong cùng một biểu đồ hoặc bảng — không bao giờ báo cáo một mình Pass Rate cho lãnh đạo, vì nó dễ tạo cảm giác an toàn giả.", "Always present Pass Rate ALONGSIDE Test Coverage in the same chart or table — never report Pass Rate alone to leadership, since it easily creates a false sense of safety.", "Pass Rateは常にTest Coverageと同じグラフや表で併記しよう——Pass Rate単体を経営陣に報告してはいけません。誤った安心感を生みやすいためです。"),
    ] },
  { heading: { vi: "7. Bảng tổng hợp công thức & bảng metric bị lạm dụng (Goodhart's Law)", en: "7. Formula summary & the metric-misuse table (Goodhart's Law)", ja: "7. 計算式まとめとメトリクス乱用の表（グッドハートの法則）" },
    blocks: [
      P("Sau khi đã hiểu từng chỉ số riêng lẻ, hãy nhìn lại toàn bộ công thức trong một bảng để tiện tra cứu khi làm báo cáo thực tế cho dự án ERP.",
        "Now that each metric has been covered individually, let's look at all the formulas together in one table for easy reference when building real reports for an ERP project.",
        "各指標を個別に理解したところで、ERPプロジェクトの実際のレポート作成時に参照しやすいよう、すべての計算式を1つの表にまとめて見てみましょう。"),
      IMG(m_formulas, "Bảng tổng hợp công thức tính 5 chỉ số đo lường chất lượng kiểm thử", "Summary table of formulas for the 5 testing quality metrics", "5つのテスト品質メトリクスの計算式をまとめた表"),
      P("Điểm chung nguy hiểm nhất của mọi metric là Goodhart's Law: 'khi một thước đo trở thành mục tiêu, nó ngừng là một thước đo tốt'. Metric vốn được sinh ra để PHẢN ÁNH thực tế và hỗ trợ ra quyết định — nhưng nếu bị biến thành KPI cá nhân hoặc điều kiện thưởng/phạt cứng nhắc, con người sẽ tối ưu hành vi để đạt con số đó, kể cả khi điều đó đi ngược lại mục tiêu chất lượng thật. Bảng dưới đây đối chiếu cách dùng ĐÚNG và cách LẠM DỤNG cho từng chỉ số, dựa trên tình huống thật đã xảy ra ở các dự án doanh nghiệp.",
        "The most dangerous common trait across all metrics is Goodhart's Law: 'when a measure becomes a target, it ceases to be a good measure'. Metrics are born to REFLECT reality and support decisions — but once turned into a personal KPI or a rigid reward/punishment condition, people optimize their behavior to hit that number, even at the expense of real quality. The table below contrasts the CORRECT use versus the MISUSE for each metric, based on real situations that have occurred on enterprise projects.",
        "すべての指標に共通する最も危険な特性はグッドハートの法則です：『ある尺度が目標になると、それは良い尺度ではなくなる』。メトリクスは本来、現実を反映し意思決定を支援するために生まれたものです——しかし個人のKPIや硬直的な報酬/罰則の条件に変わってしまうと、人は本当の品質目標を犠牲にしてでもその数値を達成しようと行動を最適化してしまいます。以下の表は、企業プロジェクトで実際に起きた状況をもとに、各指標の正しい使い方と乱用を対比しています。"),
      IMG(m_misuse, "Bảng đối chiếu dùng metric đúng vs bị lạm dụng, minh hoạ Goodhart's Law", "A table contrasting correct metric use versus misuse, illustrating Goodhart's Law", "正しいメトリクスの使い方と乱用を対比した表、グッドハートの法則を例示"),
    ] },
  { heading: { vi: "8. Tình huống 1: KPI 'số bug tester tìm được' khiến tester báo bug rác", en: "8. Situation 1: a 'number of bugs found' KPI drives testers to report junk bugs", ja: "8. シーン1：『発見バグ数』KPIがテスターにゴミバグを報告させる" },
    blocks: [
      SITUATION("Ban lãnh đạo dự án VinaERP muốn tăng động lực cho đội QA, quyết định gắn KPI thưởng cuối sprint dựa trực tiếp trên SỐ LƯỢNG bug mỗi tester tìm được, với mục tiêu 'khuyến khích tester chăm tìm lỗi hơn'.",
        "VinaERP's project leadership wants to motivate the QA team and decides to tie an end-of-sprint bonus KPI directly to the NUMBER of bugs each tester finds, aiming to 'encourage testers to hunt for bugs more diligently'.",
        "Ngay Sprint 24, số lượng bug báo cáo tăng vọt 40% so với sprint trước — nhưng khi Lead QA rà lại, phần lớn là bug trùng lặp, lỗi giao diện cực nhỏ (lệch 1px), hoặc báo sai (không phải lỗi thật). Trong khi đó, một lỗi Critical thật sự ở luồng duyệt phiếu chi (gây trùng bút toán kế toán) lại bị chìm giữa hàng chục ticket rác, mất 3 ngày mới được phát hiện và xử lý.",
        "Right in Sprint 24, the number of reported bugs jumps 40% compared to the previous sprint — but when the QA Lead reviews them, most are duplicates, tiny UI issues (1px off), or invalid reports (not real bugs). Meanwhile, a genuinely Critical defect in the payment voucher approval flow (causing duplicate accounting entries) gets buried among dozens of junk tickets, taking 3 days to be noticed and handled.",
        "VinaERPプロジェクトの経営陣はQAチームのモチベーションを高めたいと考え、『テスターにもっと熱心にバグを探すよう促す』ことを狙いとして、スプリント末のボーナスKPIを各テスターが発見したバグの『数』に直接結びつけることを決定した。",
        "Sprint 24直後、報告されたバグ数は前スプリントより40%急増した——しかしQAリードが精査すると、その大半は重複、極小のUI問題（1pxのずれ）、または無効な報告（実際のバグではない）だった。一方で、支払伝票承認フローに実際に存在したCritical欠陥（会計仕訳の重複を引き起こす）は数十件のゴミチケットに埋もれ、発見・対応まで3日を要した。"),
      SOLVE("Bỏ ngay KPI cá nhân theo SỐ LƯỢNG bug thô; thay bằng đánh giá kết hợp nhiều tín hiệu (tỉ lệ bug Valid/Total, mức độ nghiêm trọng trung bình tìm được, đóng góp vào các luồng nghiệp vụ rủi ro cao) và luôn có bước Lead QA review/phân loại bug trước khi tính vào bất kỳ chỉ số đánh giá nào; đồng thời thiết lập quy trình ưu tiên ticket theo Severity để lỗi Critical không bị chìm giữa ticket thấp giá trị.", "Immediately drop the individual KPI based on raw bug COUNT; replace it with an assessment combining several signals (Valid/Total bug ratio, average severity of bugs found, contribution to high-risk business flows), and always have a QA Lead review/triage step before any bug counts toward an evaluation metric; also set up a Severity-based ticket prioritization process so Critical defects don't get buried among low-value tickets.", "生のバグ『数』に基づく個人KPIを直ちに廃止し、複数のシグナルを組み合わせた評価（Valid/Total比率、発見したバグの平均重大度、高リスク業務フローへの貢献度）に置き換える。またどの評価指標に計上する前にも必ずQAリードによるレビュー/トリアージのステップを設け、Critical欠陥が低価値なチケットに埋もれないよう重大度ベースのチケット優先順位付けプロセスを確立する。"),
      P("Đây là ví dụ kinh điển của Goodhart's Law trong thực tế doanh nghiệp: metric 'số bug tìm được' vốn hữu ích để theo dõi XU HƯỚNG phát hiện lỗi theo module, nhưng khi bị biến thành mục tiêu cá nhân gắn thưởng, nó tạo động lực sai — tối đa hoá SỐ LƯỢNG thay vì GIÁ TRỊ. Bài học cho tester và Lead QA: bất kỳ chỉ số nào định gắn với đánh giá cá nhân đều cần được kiểm tra trước câu hỏi 'nếu ai đó cố tình chơi (game) con số này mà không quan tâm mục tiêu thật, họ sẽ làm gì?' — nếu câu trả lời dễ dàng và có hại, đừng dùng chỉ số đó làm KPI cá nhân.",
        "This is a textbook example of Goodhart's Law in enterprise practice: the 'number of bugs found' metric is genuinely useful for tracking the TREND of defect detection by module, but once turned into a bonus-linked personal target, it creates the wrong incentive — maximizing QUANTITY instead of VALUE. The lesson for testers and QA Leads: any metric intended to be tied to individual evaluation should first be checked against the question 'if someone deliberately gamed this number without caring about the real goal, what would they do?' — if the answer is easy and harmful, don't use that metric as a personal KPI.",
        "これは企業の実務におけるグッドハートの法則の典型例です：『発見したバグ数』という指標は本来、モジュール別の欠陥検出傾向を追跡するのに有用ですが、ボーナスに紐づく個人目標に変わると、誤ったインセンティブを生み出します——価値ではなく数量を最大化してしまうのです。テスターとQAリードへの教訓：個人評価に結びつける予定のどんな指標も、まず『本当の目標を気にせず誰かが意図的にこの数値を『ゲーム』しようとしたら、何をするか？』という問いにかけるべきです。答えが簡単で有害なら、その指標を個人KPIとして使ってはいけません。"),
      IMG(m_kanban, "Bảng lỗi Sprint 24 tràn ngập ticket trùng/không hợp lệ sau khi gắn KPI theo số lượng bug", "Sprint 24's bug board flooded with duplicate/invalid tickets after tying a KPI to bug count", "バグ件数KPIを導入した後、重複/無効なチケットで溢れたSprint 24のバグボード"),
      RECAP(["Gắn KPI cá nhân theo SỐ LƯỢNG bug thô dễ sinh bug rác (Goodhart's Law)", "Luôn kết hợp nhiều tín hiệu (Valid/Total, Severity) thay vì một con số đơn lẻ khi đánh giá"],
        ["Tying individual KPIs to raw bug COUNT easily breeds junk bugs (Goodhart's Law)", "Always combine several signals (Valid/Total, Severity) instead of a single number when evaluating"],
        ["生のバグ『数』を個人KPIに結びつけるとゴミバグを生みやすい（グッドハートの法則）", "評価時は単一の数値ではなく複数のシグナル（Valid/Total、重大度）を組み合わせる"]),
    ] },
  { heading: { vi: "9. Tình huống 2: Pass Rate 99% thiếu độ phủ vùng rủi ro & dùng metric cải tiến báo cáo lãnh đạo", en: "9. Situation 2: a 99% pass rate lacking coverage of a risky area & using metrics to improve leadership reporting", ja: "9. シーン2：Pass Rate 99%だがリスク領域の網羅性不足 & メトリクスによる経営報告の改善" },
    blocks: [
      SITUATION("Trước khi release VinaERP v6.3, báo cáo QA gửi lãnh đạo ghi 'Pass Rate: 99%, sẵn sàng release' — mọi người yên tâm bấm nút go-live.",
        "Before releasing VinaERP v6.3, the QA report sent to leadership states 'Pass Rate: 99%, ready to release' — everyone feels confident hitting the go-live button.",
        "Một tuần sau go-live, nhiều khách hàng doanh nghiệp báo lỗi khi thực hiện hoàn tiền một phần cho đơn hàng đã xuất hoá đơn VAT — một luồng nghiệp vụ hiếm gặp nhưng ảnh hưởng trực tiếp tới báo cáo thuế. Khi rà lại, luồng này chỉ có Test Coverage 20%, phần lớn ca kiểm thử tập trung vào các luồng phổ biến, dễ viết ca.",
        "A week after go-live, several corporate clients report errors when processing a partial refund on an order that already has a VAT invoice issued — a rare but tax-report-critical business flow. On review, this flow had only 20% Test Coverage, since most test cases focused on common, easy-to-write flows.",
        "VinaERP v6.3のリリース前、経営陣に送られたQAレポートには『Pass Rate：99%、リリース準備完了』と記載されており、全員が安心してgo-liveボタンを押した。",
        "go-liveの1週間後、複数の法人顧客がVAT請求書発行済みの注文に対する一部返金処理でエラーを報告——これは稀だが税務報告に直接影響する業務フローだった。確認すると、このフローのTest Coverageはわずか20%で、大半のテストケースは一般的で書きやすいフローに集中していた。"),
      SOLVE("Bổ sung ngay luồng 'hoàn tiền một phần sau khi xuất hoá đơn VAT' vào bộ ca kiểm thử ưu tiên rủi ro cao, và từ nay mọi báo cáo release BẮT BUỘC trình bày Pass Rate CÙNG Test Coverage theo từng nhóm rủi ro (Cao/Trung bình/Thấp) thay vì một con số Pass Rate tổng duy nhất — để lãnh đạo thấy rõ vùng nào rủi ro cao nhưng độ phủ còn thấp trước khi quyết định go-live.", "Immediately add the 'partial refund after VAT invoice issuance' flow to the high-risk-priority test suite, and from now on every release report MUST present Pass Rate TOGETHER WITH Test Coverage broken down by risk group (High/Medium/Low) instead of a single overall Pass Rate number — so leadership can clearly see which high-risk area still has low coverage before deciding to go live.", "『VAT請求書発行後の一部返金』フローを直ちに高リスク優先テストスイートに追加し、今後すべてのリリースレポートでは単一の総合Pass Rate数値ではなく、リスクグループ別（高/中/低）にPass RateとTest Coverageを必ず併記する——go-live判断の前に、経営陣がどの高リスク領域のカバレッジがまだ低いかを明確に把握できるようにする。"),
      P("Đây chính là hệ quả của việc dùng metric để BÁO CÁO LÃNH ĐẠO mà thiếu ngữ cảnh: con số Pass Rate 99% không sai về mặt tính toán, nhưng thiếu Test Coverage đi kèm khiến nó trở thành 'sự an toàn giả'. Để dùng metric cải tiến quy trình thực sự, đội QA VinaERP xây dựng một quy trình 3 bước lặp lại mỗi sprint.",
        "This is exactly the consequence of using a metric to REPORT TO LEADERSHIP without context: the 99% Pass Rate number isn't wrong arithmetically, but missing its accompanying Test Coverage turns it into 'false safety'. To genuinely use metrics to improve the process, VinaERP's QA team built a 3-step routine repeated every sprint.",
        "これはまさに、文脈を欠いたまま経営陣への報告にメトリクスを使用した結果です：Pass Rate 99%という数値は計算上間違ってはいませんが、付随するTest Coverageがないことで『見せかけの安全』になってしまいます。メトリクスを実際にプロセス改善へ活かすため、VinaERPのQAチームは毎スプリント繰り返す3ステップのルーチンを構築しました。"),
      STEP(1, "Thu thập dữ liệu thô từ Jira (lỗi, thời gian) và công cụ quản lý test case theo từng sprint, tách riêng theo module và mức độ nghiêm trọng.", "Collect raw data from Jira (defects, timestamps) and the test case management tool per sprint, broken down by module and severity.", "スプリントごとにJira（欠陥、タイムスタンプ）とテストケース管理ツールから生データを収集し、モジュールと重大度別に分ける。"),
      STEP(2, "Tính 5 chỉ số theo công thức chuẩn và VẼ XU HƯỚNG qua nhiều sprint liên tiếp — một con số tại một thời điểm dễ gây hiểu nhầm, xu hướng mới cho biết quy trình đang cải thiện hay xấu đi.", "Compute the 5 metrics using the standard formulas and PLOT THE TREND across several consecutive sprints — a single-point-in-time number is easy to misread; the trend reveals whether the process is improving or worsening.", "標準的な計算式で5つの指標を算出し、連続する複数スプリントにわたる傾向をグラフ化する——単一時点の数値は誤解を招きやすく、傾向こそがプロセスが改善しているか悪化しているかを示す。"),
      STEP(3, "Đóng gói báo cáo cho lãnh đạo gồm: dashboard tóm tắt, biểu đồ xu hướng, và với mỗi con số bất thường — một dòng NGUYÊN NHÂN GỐC + hành động cải tiến đề xuất, thay vì chỉ liệt kê con số suông.", "Package the leadership report with: a summary dashboard, a trend chart, and for every anomalous number — one line stating the ROOT CAUSE plus a proposed improvement action, instead of just listing bare numbers.", "経営陣向けレポートには、要約ダッシュボード、傾向グラフ、そして異常な数値ごとに——単なる数値の羅列ではなく、根本原因と提案する改善アクションを1行で添える。"),
      IMG(m_trend, "Xu hướng DRE, Test Coverage, Pass Rate qua 6 sprint gần nhất — dùng để báo cáo lãnh đạo thay vì một con số đơn lẻ", "Trend of DRE, Test Coverage, and Pass Rate over the last 6 sprints — used for leadership reporting instead of a single number", "直近6スプリントにおけるDRE、Test Coverage、Pass Rateの傾向——単一の数値ではなく経営陣への報告に使用"),
      TIP("Khi trình bày cho lãnh đạo không rành kỹ thuật, luôn dịch con số thành RỦI RO KINH DOANH cụ thể (ví dụ: 'luồng hoàn tiền sau VAT chỉ phủ 20% — nếu có lỗi ở đây, ảnh hưởng trực tiếp báo cáo thuế của khách hàng') thay vì chỉ đọc phần trăm khô khan.", "When presenting to non-technical leadership, always translate numbers into concrete BUSINESS RISK (e.g. 'the post-VAT refund flow is only 20% covered — a bug here directly impacts the client's tax reporting') instead of just reading out dry percentages.", "技術に詳しくない経営陣へのプレゼンでは、単なる無機質なパーセンテージを読み上げるのではなく、常に数値を具体的な事業リスクに翻訳しよう（例：『VAT後返金フローのカバレッジはわずか20%——ここにバグがあれば顧客の税務報告に直接影響する』）。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a testing results report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
      INTERNAL("Độ phủ mã và kiểm thử luồng dữ liệu cho tester", "Code coverage and data-flow testing for testers", "do-phu-ma-va-kiem-thu-luong-du-lieu-cho-tester", "テスターのためのコードカバレッジとデータフローテスト"),
      INTERNAL("Phân tích nguyên nhân gốc (RCA) cho tester", "Root cause analysis (RCA) for testers", "phan-tich-nguyen-nhan-goc-rca-cho-tester", "テスターのための根本原因分析（RCA）"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách đo lường chất lượng kiểm thử cho dự án ERP doanh nghiệp lớn: chọn đúng metric theo mục tiêu bằng khung GQM, công thức và cách diễn giải đúng Defect Density, DRE, MTTR, Test Coverage, Pass Rate — luôn đọc từng con số trong ngữ cảnh, không đơn lẻ. Bạn cũng thấy hai tình huống thật cho thấy đo sai hành vi gây hại thế nào (KPI số bug thô, Pass Rate thiếu Test Coverage), và cách xây dựng quy trình 3 bước để dùng metric cải tiến thực sự và báo cáo lãnh đạo bằng xu hướng thay vì con số rời rạc.",
        "You just learned how to measure testing quality for a large enterprise ERP project: choosing the right metric for the goal using the GQM framework, the formulas and correct interpretation of Defect Density, DRE, MTTR, Test Coverage, and Pass Rate — always reading each number in context, never alone. You also saw two real situations showing how measuring the wrong behavior causes harm (a raw bug-count KPI, a Pass Rate missing Test Coverage), and how to build a 3-step routine to genuinely use metrics for improvement and report to leadership through trends instead of isolated numbers.",
        "大規模な企業向けERPプロジェクトにおけるテスト品質の測定方法を学びました：GQMフレームワークを使って目標に合った正しいメトリクスを選ぶこと、Defect Density、DRE、MTTR、Test Coverage、Pass Rateの計算式と正しい解釈——各数値を単独ではなく常に文脈の中で読むこと。また、誤った行動を測定することがどれほど害を及ぼすかを示す2つの実例（生のバグ数KPI、Test Coverageを欠いたPass Rate）、そして孤立した数値ではなく傾向を通じてメトリクスを本当の改善と経営報告に活用する3ステップのルーチンの構築方法も見ました。"),
      P("Chặng tiếp theo, bạn nên đào sâu độ phủ mã và kiểm thử luồng dữ liệu để nghĩ ca kiểm thử có hệ thống hơn ở các luồng rủi ro cao, cùng kỹ thuật phân tích nguyên nhân gốc (RCA) để biến mỗi con số bất thường thành hành động cải tiến cụ thể thay vì chỉ báo cáo suông. Nếu muốn học bài bản từ nền tảng manual tới thiết kế bộ chỉ số chất lượng cho dự án thực chiến cùng người hướng dẫn, một khoá học Tester chuyên nghiệp sẽ giúp bạn tự tin đảm nhận vai trò QA cấp cao hơn.",
        "Next, you should dig deeper into code coverage and data-flow testing to design test cases more systematically for high-risk flows, along with root cause analysis (RCA) techniques to turn every anomalous number into a concrete improvement action instead of just a bare report. If you want to learn properly from manual foundations all the way to designing a quality metrics suite for real projects with a mentor, a professional Tester course will help you confidently take on a more senior QA role.",
        "次は、高リスクフローに対してより体系的にテストケースを設計するため、コードカバレッジとデータフローテストを深く学び、また異常な数値を単なる報告ではなく具体的な改善アクションに変えるための根本原因分析（RCA）技法を学びましょう。指導者と共に、マニュアルの基礎から実際のプロジェクト向け品質指標群の設計まで体系的に学びたいなら、プロフェッショナルなテスターコースがより上級のQAの役割を自信を持って担う助けとなります。"),
      CTA(course),
    ] },
];

const MA_METRICS_DOC = makeDoc({
  slug: "do-luong-chat-luong-kiem-thu-test-metrics-cho-tester",
  domain: "erp",
  primaryKeyword: "đo lường chất lượng kiểm thử",
  keywords: ["đo lường chất lượng kiểm thử", "test metrics", "defect density", "DRE", "MTTR", "test coverage", "pass rate", "báo cáo lãnh đạo QA"],
  coverLabel: "NÂNG CAO · TEST METRICS · DOANH NGHIỆP",
  crumb: "Đo lường chất lượng kiểm thử (Test Metrics)",
  metaTitle: {
    vi: "Đo lường chất lượng kiểm thử (Test Metrics) cho Tester",
    en: "Measuring testing quality: test metrics for testers",
    ja: "テスト品質の測定：テスター向けテストメトリクス",
  },
  metaDescription: {
    vi: "Đo lường chất lượng kiểm thử dự án ERP doanh nghiệp: công thức Defect Density, DRE, MTTR, Test Coverage, Pass Rate, diễn giải đúng và tránh lạm dụng metric.",
    en: "Measuring testing quality for an enterprise ERP project: Defect Density, DRE, MTTR, Test Coverage, Pass Rate formulas, correct interpretation, avoiding metric misuse, and effective leadership reporting.",
    ja: "企業向けERPプロジェクトのテスト品質測定：Defect Density、DRE、MTTR、Test Coverage、Pass Rateの計算式、正しい解釈、メトリクス乱用の回避、経営陣への効果的な報告方法を解説。",
  },
  title: {
    vi: "Đo lường chất lượng kiểm thử (Test Metrics) trong dự án ERP doanh nghiệp: chọn đúng chỉ số, tránh đo sai hành vi",
    en: "Measuring testing quality (Test Metrics) in an enterprise ERP project: choosing the right metric, avoiding measuring the wrong behavior",
    ja: "企業向けERPプロジェクトにおけるテスト品質の測定（Test Metrics）：正しい指標の選択と誤った行動測定の回避",
  },
  summary: {
    vi: "Bài nâng cao: đo lường chất lượng kiểm thử cho dự án ERP doanh nghiệp lớn VinaERP. Chọn đúng metric theo mục tiêu (GQM), công thức & diễn giải Defect Density, DRE, MTTR, Test Coverage, Pass Rate; hai tình huống thật về đo sai hành vi (KPI số bug, pass rate ảo); dùng metric cải tiến quy trình & báo cáo lãnh đạo. Nhiều mockup dashboard/bảng/kanban/xu hướng, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: measuring testing quality for VinaERP, a large enterprise ERP project. Choosing the right metric per goal (GQM), formulas and interpretation of Defect Density, DRE, MTTR, Test Coverage, Pass Rate; two real situations on measuring the wrong behavior (bug-count KPI, false pass rate); using metrics to improve process and report to leadership. Many dashboard/table/kanban/trend mockups, FAQ, and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "上級記事：大規模な企業向けERPプロジェクトVinaERPのテスト品質測定。GQMによる目標に合った正しいメトリクスの選択、Defect Density、DRE、MTTR、Test Coverage、Pass Rateの計算式と解釈、誤った行動を測定する2つの実例（バグ数KPI、見せかけのパスレート）、メトリクスを用いたプロセス改善と経営報告。多数のダッシュボード/表/かんばん/傾向モック、FAQ、5問クイズ付き。CyberSoftテスターコースへリンク。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách xây dựng bộ chỉ số đo lường chất lượng kiểm thử", steps: [
    { name: "Xác định mục tiêu theo khung GQM", text: "Chọn metric trả lời đúng câu hỏi đội đang cần, không đo cho có." },
    { name: "Tính công thức chuẩn & theo dõi xu hướng", text: "Defect Density, DRE, MTTR, Test Coverage, Pass Rate — đọc theo xu hướng nhiều sprint." },
    { name: "Đóng gói báo cáo kèm nguyên nhân gốc & hành động", text: "Không dùng metric làm KPI cá nhân đơn lẻ; luôn giải thích ngữ cảnh cho lãnh đạo." },
  ] },
  pages,
});

export const MA_METRICS_01 = [MA_METRICS_DOC];
