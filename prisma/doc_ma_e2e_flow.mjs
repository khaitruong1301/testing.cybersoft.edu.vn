// doc_ma_e2e_flow.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử luồng nghiệp vụ đầu-cuối phức tạp (End-to-End Business Flow Testing) cho hệ BẢO HIỂM:
// luồng bồi thường xuyên nhiều module/hệ thống & vai trò (yêu cầu bồi thường -> giám định -> duyệt ->
// chi trả -> kế toán), dữ liệu chảy qua các bước, điểm bàn giao (handoff), trạng thái treo,
// timeout liên hệ thống, đối chiếu cuối luồng. Dự án: ClaimFlow — bồi thường bảo hiểm xe của XeAn Insurance.
// 2 tình huống thật (jira/kanban/dashboard), sơ đồ luồng xuyên module (moduleFlow).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến bảo hiểm.",
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
    tags: tags("congnghe", "insurance", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: sơ đồ luồng bồi thường xuyên 5 module/vai trò (moduleFlow) ──
const m_flow = moduleFlow("Luồng bồi thường xe ClaimFlow xuyên 5 module: Tiếp nhận → Giám định → Duyệt → Chi trả → Kế toán", [
  { id: "intake", label: "Tiếp nhận", sub: "Hồ sơ XA-2026-00847", x: 110, y: 70 },
  { id: "assess", label: "Giám định", sub: "App hiện trường", x: 380, y: 70 },
  { id: "approve", label: "Duyệt", sub: "Claims Manager", x: 650, y: 70 },
  { id: "pay", label: "Chi trả", sub: "Payment/Core banking", x: 380, y: 230 },
  { id: "acct", label: "Kế toán", sub: "ERP đối soát", x: 650, y: 230 },
], [
  { from: "intake", to: "assess", label: "Hồ sơ + ảnh hiện trường" },
  { from: "assess", to: "approve", label: "Biên bản + mức đề xuất" },
  { from: "approve", to: "pay", label: "Số tiền duyệt + TK thụ hưởng" },
  { from: "pay", to: "acct", label: "Mã GD ngân hàng + số đã chi" },
  { from: "acct", to: "approve", label: "Đối soát: lệch số tiền", bad: true },
], { accent: "#0f766e", h: 340 });

// ── Mockup 2: bảng điểm bàn giao (handoff) & dữ liệu chảy xuyên hệ thống ──
const m_handoff = grid("Điểm bàn giao & dữ liệu chảy xuyên luồng bồi thường ClaimFlow", ["Điểm bàn giao", "Dữ liệu gửi đi", "Dữ liệu nhận về/xác nhận", "Rủi ro nếu thiếu kiểm tra"], [
  ["Tiếp nhận → Giám định", "Mã hồ sơ, biển số xe, mô tả tai nạn, ảnh hiện trường", "Xác nhận giám định viên đã tiếp nhận, lịch hẹn hiện trường", "Hồ sơ 'kẹt' ở Tiếp nhận, không ai gán giám định viên"],
  ["Giám định → Duyệt", "Biên bản giám định, mức thiệt hại xác nhận, mức đề xuất bồi thường", "Trạng thái 'đã nhận biên bản' trên hệ Duyệt", "Duyệt mở hồ sơ nhưng mức đề xuất trống do đồng bộ lỗi"],
  ["Duyệt → Chi trả", "Số tiền được duyệt, số tài khoản thụ hưởng, mã phê duyệt", "Mã lệnh chi, trạng thái 'đã lập lệnh chi'", "Chi trả sai số tiền do đọc nhầm phiên bản dữ liệu cũ"],
  ["Chi trả → Kế toán", "Mã giao dịch ngân hàng, số tiền đã chi thực tế, thời điểm chi", "Bút toán ghi nhận chi phí bồi thường", "Kế toán ghi thiếu/ghi trễ, số liệu báo cáo sai kỳ"],
  ["Kế toán → Duyệt (đối soát ngược)", "Số tiền đã chi thực tế đối chiếu với số tiền đã duyệt", "Xác nhận khớp hoặc cảnh báo lệch", "Lệch âm thầm không ai phát hiện tới khi kiểm toán"],
], { accent: "#0f766e", note: "Mỗi điểm bàn giao là 1 nơi dữ liệu có thể MẤT, SAI LỆCH hoặc TRỄ — tester E2E phải kiểm chứng cả 2 chiều: dữ liệu gửi đi và dữ liệu nhận về." });

// ── Mockup 3: màn Duyệt bồi thường — dữ liệu giám định chưa đồng bộ sang (annotate) ──
const m_screen = browser("claimflow.xean.vn/duyet/XA-2026-00847", [
  panel("ClaimFlow · Duyệt bồi thường — Hồ sơ XA-2026-00847", [
    field(24, 20, 330, "Mã hồ sơ", "XA-2026-00847", "normal"),
    field(372, 20, 330, "Biển số xe", "51K-772.09", "normal"),
    field(24, 92, 330, "Mức thiệt hại giám định", "", "error"),
    field(372, 92, 330, "Đề xuất bồi thường", "", "error"),
    field(24, 164, 330, "Trạng thái đồng bộ giám định", "Đang chờ (12 giờ)", "error"),
    field(372, 164, 330, "Hạn xử lý theo SLA", "Còn 4 giờ", "normal"),
    btn(24, 236, 200, "Duyệt hồ sơ", "disabled"),
    btn(240, 236, 200, "Yêu cầu bổ sung", "ghost"),
    annotate(20, 82, 330, 66, "Trống: chưa nhận dữ liệu từ Giám định"),
    annotate(368, 82, 330, 66, "Trống: mức đề xuất chưa đồng bộ sang"),
    annotate(20, 154, 330, 44, "Handoff TREO 12 giờ, vượt SLA sắp tới"),
  ].join(""), { h: 320, accent: "#0f766e" }),
].join(""), { h: 376, title: "ClaimFlow · Duyệt bồi thường", accent: "#0f766e" });

// ── Mockup 4: bảng ca kiểm thử E2E theo nhánh (happy path + các nhánh lỗi) ──
const m_branches = grid("Ca kiểm thử E2E theo nhánh — luồng bồi thường ClaimFlow", ["Nhánh kịch bản E2E", "Đường đi qua các module", "Kết quả mong đợi"], [
  ["Happy path — hồ sơ hợp lệ, đủ điều kiện", "Tiếp nhận → Giám định → Duyệt → Chi trả → Kế toán", "Số tiền chi trả = số tiền duyệt; bút toán kế toán khớp 100%; tổng thời gian trong SLA"],
  ["Hồ sơ bị từ chối giữa luồng (không đủ điều kiện bảo hiểm)", "Tiếp nhận → Giám định → Duyệt (từ chối) → đóng hồ sơ", "Trạng thái 'Từ chối' hiển thị đúng lý do; không phát sinh lệnh chi; hồ sơ không treo ở Chi trả"],
  ["Timeout liên hệ thống giữa Duyệt và Chi trả", "Duyệt gửi lệnh chi → Chi trả không phản hồi trong ngưỡng thời gian", "Duyệt tự động retry với cùng mã lệnh (idempotent); không tạo 2 lệnh chi trùng"],
  ["Hồ sơ treo giữa Giám định và Duyệt (không ai nhận xử lý)", "Giám định hoàn tất → hồ sơ nằm im, không được gán người duyệt", "Hệ thống cảnh báo SLA sắp vi phạm; có cơ chế tự động nhắc/gán lại người xử lý"],
  ["Lệch dữ liệu phát hiện ở bước đối soát kế toán", "Chi trả ghi nhận X đồng → Kế toán ghi nhận Y đồng (X ≠ Y)", "Báo cáo đối soát cuối ngày cảnh báo lệch, kèm mã hồ sơ và số tiền chênh lệch cụ thể"],
], { accent: "#7c3aed" });

// ── Mockup 5: ticket Jira của hồ sơ treo giữa Giám định và Duyệt ──
const m_jira = jira({
  key: "XA-58210", title: "Hồ sơ XA-2026-00847 treo 9 ngày giữa Giám định và Duyệt, không hệ thống nào cảnh báo SLA",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "Production · ClaimFlow v5.2 · module Giám định + Duyệt"],
    ["Các bước", "1) Giám định viên hoàn tất biên bản lúc ngày D 2) Hồ sơ chuyển trạng thái 'Chờ duyệt' 3) Không ai được tự động gán làm người duyệt 4) Kiểm tra hồ sơ 9 ngày sau"],
    ["Kết quả mong đợi", "Hồ sơ được gán người duyệt trong 24 giờ; cảnh báo SLA hiển thị nếu quá hạn"],
    ["Kết quả thực tế", "Hồ sơ nằm ở trạng thái 'Chờ duyệt' 9 ngày, không cảnh báo, không ai xử lý; khách hàng gọi khiếu nại"],
    ["Bằng chứng", "log-claimflow-XA847.csv, export-hang-so-hang-doi-duyet.xlsx"],
  ],
});

// ── Mockup 6: kanban theo dõi lỗi luồng E2E tìm được qua kiểm thử ──
const m_kanban = kanban("Bảng theo dõi lỗi luồng E2E bồi thường (ClaimFlow · Sprint Handoff)", [
  { name: "New", cards: [
    { key: "XA-58210", title: "Hồ sơ treo 9 ngày giữa Giám định-Duyệt", sev: "Critical" },
    { key: "XA-58233", title: "Lệch 1.200.000đ giữa Chi trả và Kế toán", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "XA-58190", title: "Timeout Duyệt→Chi trả tạo 2 lệnh chi trùng", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "XA-58077", title: "Mức đề xuất trống khi Giám định→Duyệt", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "XA-57920", title: "Hồ sơ từ chối vẫn phát sinh lệnh chi", sev: "Medium" },
  ] },
]);

// ── Mockup 7: dashboard số liệu kiểm thử luồng E2E ──
const m_dash = dashboard("Số liệu kiểm thử luồng E2E bồi thường — ClaimFlow (Sprint Handoff)", [
  { label: "Hồ sơ E2E đã kiểm thử", value: "36", sub: "đủ 5 module, 5 nhánh kịch bản", color: "#0f766e" },
  { label: "Hồ sơ phát hiện TREO", value: "6", sub: "kẹt ở điểm bàn giao, không ai nhận", color: "#e11d48" },
  { label: "Lệch dữ liệu cuối luồng", value: "4", sub: "phát hiện ở bước đối soát kế toán", color: "#b91c1c" },
  { label: "Vi phạm SLA tổng luồng", value: "9", sub: "trên tổng 36 hồ sơ kiểm thử", color: "#b45309" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử luồng nghiệp vụ đầu-cuối (End-to-End Business Flow Testing) là gì?",
  "What is end-to-end business flow testing?",
  "Kiểm thử luồng nghiệp vụ đầu-cuối là việc theo dõi MỘT hồ sơ/giao dịch nghiệp vụ đi xuyên suốt TẤT CẢ các module, hệ thống và vai trò tham gia — từ điểm khởi tạo tới điểm kết thúc thật sự (ví dụ: một hồ sơ bồi thường từ lúc tiếp nhận tới lúc tiền về tài khoản khách hàng và được ghi sổ kế toán) — thay vì chỉ kiểm thử từng module riêng lẻ. Trọng tâm không phải 'chức năng A có chạy đúng không' mà là 'dữ liệu và trạng thái có được truyền đúng, đủ, kịp thời qua từng điểm bàn giao hay không'.",
  "End-to-end business flow testing means following ONE business record/transaction all the way through EVERY module, system, and role involved — from its true starting point to its true ending point (e.g. a claim from intake until the money reaches the customer's account and is booked in accounting) — instead of only testing each module in isolation. The focus isn't 'does function A work correctly' but 'is data and state passed correctly, completely, and on time across every handoff point'.",
  "エンドツーエンド業務フロー（End-to-End Business Flow Testing）とは何？",
  "エンドツーエンド業務フローテストとは、1件の業務記録/取引が関わる『すべての』モジュール・システム・役割を通じて、本当の起点から本当の終点まで（例：保険金請求案件が受付されてから顧客口座に入金され会計に記帳されるまで）追跡することを指し、各モジュールを個別にテストするだけでは不十分です。焦点は『機能Aが正しく動くか』ではなく『データと状態が各引き継ぎ地点を通じて正しく、完全に、時間どおりに渡されるか』です。");
const faq2 = FAQ(
  "Làm sao thiết kế ca kiểm thử E2E khi luồng đi qua nhiều hệ thống thuộc nhiều đội khác nhau?",
  "How do you design E2E test cases when the flow spans multiple systems owned by different teams?",
  "Bắt đầu bằng cách vẽ sơ đồ luồng thực tế (không phải luồng lý tưởng trên tài liệu) và đánh dấu từng ĐIỂM BÀN GIAO — nơi một module kết thúc phần việc của nó và module kế tiếp bắt đầu. Với mỗi điểm bàn giao, xác định rõ dữ liệu nào được gửi đi, dữ liệu/xác nhận nào cần nhận lại, và thời gian tối đa cho phép (SLA). Sau đó thiết kế ca theo NHÁNH: một ca happy path xuyên suốt, và nhiều ca mô phỏng lỗi tại từng điểm bàn giao (trễ, mất dữ liệu, timeout, từ chối giữa chừng). Vì các hệ thống thuộc nhiều đội khác nhau, tester E2E cần làm việc với đại diện mỗi đội để biết chính xác hợp đồng dữ liệu (data contract) giữa hai module, tránh giả định sai.",
  "Start by drawing the REAL flow (not the idealized one in documentation) and marking every HANDOFF POINT — where one module finishes its part and the next one begins. For each handoff, define exactly what data gets sent, what data/confirmation must come back, and the maximum allowed time (SLA). Then design cases by BRANCH: one full happy-path case, plus several cases simulating failure at each handoff (delay, data loss, timeout, mid-flow rejection). Since the systems belong to different teams, an E2E tester needs to work with a representative from each team to know the exact data contract between two modules, avoiding wrong assumptions.",
  "フローが異なるチームが所有する複数システムにまたがる場合、E2Eテストケースをどう設計する？",
  "まず（ドキュメント上の理想的なフローではなく）実際のフローを図に描き、各『引き継ぎ地点』——あるモジュールが担当を終え次のモジュールが始まる地点——をマークすることから始めます。各引き継ぎ地点について、送信されるデータ、返送されるべきデータ/確認、許容される最大時間（SLA）を明確に定義します。その後、ブランチごとにケースを設計します：1つの完全なハッピーパスケースと、各引き継ぎ地点での障害（遅延、データ損失、タイムアウト、途中拒否）を模した複数のケースです。システムが異なるチームに属しているため、E2Eテスターは各チームの代表者と協力し、2つのモジュール間の正確なデータ契約を把握し、誤った前提を避ける必要があります。");
const faq3 = FAQ(
  "Vì sao đối chiếu dữ liệu cuối luồng (end-of-flow reconciliation) lại quan trọng trong kiểm thử E2E?",
  "Why does end-of-flow reconciliation matter in E2E testing?",
  "Vì phần lớn lỗi luồng nghiệp vụ nghiêm trọng không hiện lỗi rõ ràng ở BẤT KỲ MÀN HÌNH nào — mỗi module vẫn báo 'thành công', nhưng con số cuối cùng ở đầu này (ví dụ số tiền Chi trả đã chuyển) lại không khớp với con số ở đầu kia (số tiền Kế toán ghi sổ). Nếu tester chỉ kiểm tra từng bước có 'chạy được' hay không mà không đối chiếu dữ liệu giữa điểm đầu và điểm cuối của toàn luồng, những lệch số âm thầm này sẽ lọt qua kiểm thử và chỉ bị phát hiện khi kiểm toán hoặc khách hàng khiếu nại — lúc đó chi phí sửa chữa và uy tín thiệt hại đã lớn hơn nhiều so với bắt được lỗi ngay từ giai đoạn kiểm thử.",
  "Because most serious business-flow bugs don't show an obvious error on ANY screen — each module still reports 'success', but the final number at one end (e.g. the amount Payment transferred) doesn't match the number at the other end (the amount Accounting booked). If a tester only checks whether each step 'runs' without reconciling data between the flow's start and end points, these silent discrepancies slip through testing and only get caught during an audit or a customer complaint — by which point the cost of fixing them and the reputational damage are far greater than catching the bug during testing.",
  "E2Eテストにおいて、フロー終了時のデータ照合（end-of-flow reconciliation）がなぜ重要？",
  "重大な業務フローバグの多くは、どの画面にも明確なエラーとして現れないからです——各モジュールは『成功』と報告し続けますが、一方の端の最終数値（例：支払いが送金した金額）がもう一方の端の数値（会計が記帳した金額）と一致しません。テスターが各ステップが『動くかどうか』だけを確認し、フローの起点と終点の間でデータを照合しなければ、こうした静かな不一致はテストをすり抜け、監査や顧客からの苦情の際に初めて発見されます——その時点では、修正コストと信用の損失は、テスト段階でバグを捕まえるよりもはるかに大きくなっています。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử luồng nghiệp vụ đầu-cuối (E2E business flow testing) khác gì so với kiểm thử từng module riêng lẻ?", en: "How does end-to-end business flow testing differ from testing each module in isolation?", ja: "エンドツーエンド業務フローテストは各モジュールを個別にテストすることとどう違う？" },
    options: [
      { vi: "Theo dõi một hồ sơ/giao dịch xuyên suốt tất cả module, hệ thống, vai trò tham gia, tập trung vào dữ liệu và trạng thái truyền qua từng điểm bàn giao", en: "It follows one record/transaction across all modules, systems, and roles involved, focusing on data and state passed at each handoff", ja: "1件の記録/取引が関わる全モジュール・システム・役割を通じて追跡し、各引き継ぎ地点でのデータと状態の受け渡しに焦点を当てる" },
      { vi: "Chỉ kiểm tra giao diện của module cuối cùng trong luồng", en: "Only checking the UI of the last module in the flow", ja: "フローの最後のモジュールのUIだけを確認する" },
      { vi: "Chạy lại toàn bộ test case chức năng của từng module nhiều lần", en: "Rerunning every module's functional test cases many times", ja: "各モジュールの機能テストケースを何度も再実行する" },
      { vi: "Chỉ đo thời gian phản hồi của một API duy nhất", en: "Only measuring the response time of a single API", ja: "単一のAPIの応答時間だけを測定する" },
    ], correct: 0,
    explain: { vi: "E2E business flow testing quan tâm tới việc dữ liệu/trạng thái có 'sống sót' đúng qua toàn bộ hành trình nghiệp vụ, không chỉ từng module riêng lẻ có pass hay không.", en: "E2E business flow testing cares whether data/state correctly 'survives' the whole business journey, not just whether each module passes in isolation.", ja: "E2E業務フローテストは、各モジュールが個別に合格するかではなく、データ/状態が業務の全行程を通じて正しく『生き残る』かに関心がある。" },
  }),
  mcq({
    q: { vi: "'Điểm bàn giao' (handoff point) trong luồng nghiệp vụ đầu-cuối là gì?", en: "What is a 'handoff point' in an end-to-end business flow?", ja: "エンドツーエンド業務フローにおける『引き継ぎ地点（handoff point）』とは？" },
    options: [
      { vi: "Nơi một module/vai trò kết thúc phần việc của mình và bàn giao dữ liệu cho module/vai trò kế tiếp xử lý tiếp", en: "The point where one module/role finishes its part and hands data off to the next module/role to continue processing", ja: "あるモジュール/役割が担当を終え、次のモジュール/役割にデータを引き継いで処理を続ける地点" },
      { vi: "Màn hình đăng nhập của hệ thống", en: "The system's login screen", ja: "システムのログイン画面" },
      { vi: "Nút bấm 'Lưu nháp' trên form", en: "The 'Save draft' button on a form", ja: "フォームの『下書き保存』ボタン" },
      { vi: "Báo cáo cuối tháng của phòng kế toán", en: "The accounting department's month-end report", ja: "経理部の月末レポート" },
    ], correct: 0,
    explain: { vi: "Điểm bàn giao là nơi dữ liệu chuyển từ module này sang module khác — chính là nơi dễ mất, sai lệch hoặc treo nhất trong luồng E2E.", en: "A handoff point is where data moves from one module to another — exactly where data is most likely to be lost, corrupted, or stuck in an E2E flow.", ja: "引き継ぎ地点はデータがあるモジュールから別のモジュールへ移る場所であり、E2Eフローでデータが失われたり、誤ったり、滞留したりする最も起きやすい場所です。" },
  }),
  mcq({
    q: { vi: "Hồ sơ bồi thường 'treo' nhiều ngày giữa Giám định và Duyệt mà không ai xử lý cho thấy điều gì?", en: "A claim 'stuck' for days between Assessment and Approval with nobody handling it shows what?", ja: "保険金請求が『査定』と『承認』の間で何日も『滞留』し誰も処理しない場合、何を示している？" },
    options: [
      { vi: "Thiếu cơ chế gán/nhắc việc và cảnh báo SLA tại điểm bàn giao đó, không phải lỗi chức năng của riêng một module", en: "A missing auto-assignment/reminder mechanism and SLA alerting at that handoff, not a bug in one module's function alone", ja: "その引き継ぎ地点における自動割当/リマインド機構とSLAアラートの欠如であり、単一モジュールの機能バグではない" },
      { vi: "Giám định viên đã làm sai biên bản giám định", en: "The assessor filled out the assessment report incorrectly", ja: "査定員が査定報告書を誤って記入した" },
      { vi: "Khách hàng nhập sai thông tin xe", en: "The customer entered the wrong vehicle information", ja: "顧客が車両情報を誤って入力した" },
      { vi: "Hệ thống Chi trả bị lỗi giao diện", en: "The Payment system has a UI bug", ja: "支払いシステムにUIバグがある" },
      { vi: "Kế toán ghi sổ chậm hơn quy định", en: "Accounting booked entries later than required", ja: "経理の記帳が規定より遅れた" },
    ], correct: 0,
    explain: { vi: "Trạng thái treo thường xuất phát từ việc THIẾU cơ chế theo dõi/cảnh báo tại điểm bàn giao, không phải lỗi logic bên trong một module đơn lẻ.", en: "A stuck state usually comes from a MISSING tracking/alerting mechanism at the handoff, not internal logic bugs inside a single module.", ja: "滞留状態は通常、引き継ぎ地点における追跡/アラート機構の『欠如』から生じ、単一モジュール内部のロジックバグではない。" },
  }),
  mcq({
    q: { vi: "Khi xảy ra timeout liên hệ thống giữa bước Duyệt và Chi trả, cách xử lý ĐÚNG mà tester cần kiểm chứng là gì?", en: "When a cross-system timeout happens between Approval and Payment, what correct handling should a tester verify?", ja: "承認と支払いの間でシステム間タイムアウトが発生した場合、テスターが検証すべき正しい対処は？" },
    options: [
      { vi: "Cơ chế retry phải mang tính idempotent (dùng lại đúng mã lệnh chi), không được tạo thêm một lệnh chi trùng khi gửi lại", en: "The retry mechanism must be idempotent (reusing the same payment order code), not creating a duplicate payment order when resending", ja: "リトライ機構は冪等（同じ支払指図コードを再利用）でなければならず、再送時に重複した支払指図を作成してはならない" },
      { vi: "Cứ timeout là phải huỷ toàn bộ hồ sơ ngay lập tức", en: "Any timeout should immediately cancel the entire claim", ja: "タイムアウトが起きたら直ちに案件全体をキャンセルすべき" },
      { vi: "Bỏ qua timeout vì hiếm khi xảy ra trong thực tế", en: "Ignore the timeout since it rarely happens in reality", ja: "実際にはめったに起きないのでタイムアウトは無視してよい" },
      { vi: "Luôn chi trả gấp đôi số tiền để đảm bảo khách hàng không bị thiệt", en: "Always pay out double the amount to make sure the customer isn't shortchanged", ja: "顧客が損をしないよう常に2倍の金額を支払う" },
    ], correct: 0,
    explain: { vi: "Idempotent retry đảm bảo gửi lại request không tạo giao dịch chi trùng — đúng trọng tâm cần kiểm chứng khi có timeout giữa các hệ thống.", en: "Idempotent retry ensures resending a request doesn't create a duplicate payout transaction — exactly what to verify when a cross-system timeout happens.", ja: "冪等なリトライは、リクエストを再送しても重複した支払取引が作られないことを保証する——システム間タイムアウト時に検証すべき核心点。" },
  }),
  mcq({
    q: { vi: "Vì sao bước đối chiếu cuối luồng (end-of-flow reconciliation) cần có trong bộ ca kiểm thử E2E?", en: "Why does an end-to-end test suite need an end-of-flow reconciliation step?", ja: "なぜE2Eテストスイートにフロー終了時の照合ステップが必要？" },
    options: [
      { vi: "Vì mỗi module có thể tự báo 'thành công' riêng lẻ dù số liệu tổng thể giữa điểm đầu và điểm cuối luồng đã lệch nhau, chỉ đối chiếu mới phát hiện được", en: "Because each module can individually report 'success' even though the overall figures between the flow's start and end have drifted apart — only reconciliation catches that", ja: "各モジュールは個別に『成功』と報告し得るが、フロー全体の起点と終点の数値がずれていることがあり、照合でしか発見できないから" },
      { vi: "Vì đối chiếu giúp tăng tốc độ xử lý hồ sơ", en: "Because reconciliation speeds up claim processing", ja: "照合が案件処理速度を上げるから" },
      { vi: "Vì nó thay thế hoàn toàn cho việc kiểm thử từng module", en: "Because it completely replaces testing each module", ja: "各モジュールのテストを完全に置き換えるから" },
      { vi: "Vì khách hàng yêu cầu xem báo cáo đối chiếu hàng ngày", en: "Because customers demand to see a daily reconciliation report", ja: "顧客が毎日の照合レポートを見ることを要求するから" },
    ], correct: 0,
    explain: { vi: "Đối chiếu cuối luồng là cách duy nhất bắt được lỗi 'âm thầm' — mỗi bước đều báo thành công nhưng số liệu tổng thể sai lệch.", en: "End-of-flow reconciliation is the only way to catch 'silent' bugs — every step reports success yet the overall figures are wrong.", ja: "フロー終了時の照合は、各ステップが成功と報告しつつも全体の数値が誤っている『静かな』バグを捉える唯一の方法です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & sơ đồ luồng bạn sẽ test", en: "1. TL;DR & the flow you'll test", ja: "1. 要点とテストするフロー" },
    blocks: [
      TLDR("Kiểm thử luồng nghiệp vụ đầu-cuối (End-to-End Business Flow Testing) là theo dõi MỘT hồ sơ nghiệp vụ đi xuyên suốt nhiều module/hệ thống/vai trò khác nhau, thay vì chỉ kiểm thử từng module tách rời. Bài này bám sát ClaimFlow — hệ thống bồi thường bảo hiểm xe của XeAn Insurance — với luồng 5 bước: Tiếp nhận → Giám định → Duyệt → Chi trả → Kế toán. Bạn học cách xác định điểm bàn giao, thiết kế ca theo nhánh, bắt lỗi hồ sơ treo và dữ liệu lệch khi đối soát cuối luồng. Nhiều mockup và trắc nghiệm cuối bài.",
        "End-to-end business flow testing means following ONE business record across many different modules/systems/roles, instead of only testing each module in isolation. This article follows ClaimFlow — XeAn Insurance's auto claims system — through a 5-step flow: Intake → Assessment → Approval → Payment → Accounting. You'll learn to identify handoff points, design branch-based cases, and catch stuck claims and data drift at end-of-flow reconciliation. Lots of visuals and a quiz at the end.",
        "エンドツーエンド業務フローテストとは、各モジュールを個別にテストするのではなく、1件の業務記録が複数の異なるモジュール/システム/役割を通じて流れる様子を追跡することです。本記事は、XeAn Insuranceの自動車保険金請求システムClaimFlowを題材に、受付→査定→承認→支払→経理という5ステップのフローを扱います。引き継ぎ地点の特定方法、ブランチ別のケース設計、滞留する案件やフロー終了時の照合で発見されるデータのずれの捕まえ方を学びます。図が豊富で最後にクイズ付き。"),
      P("Nếu bạn đã quen kiểm thử từng chức năng riêng lẻ — form nhập liệu chạy đúng, API trả về đúng mã trạng thái, màn hình hiển thị đúng dữ liệu — bài này đưa bạn sang một góc nhìn khác hẳn: điều gì xảy ra khi MỘT hồ sơ phải đi qua NĂM hệ thống khác nhau, do BỐN vai trò khác nhau xử lý, trước khi thật sự 'xong việc' theo đúng nghĩa nghiệp vụ (tiền về tay khách hàng và được ghi sổ đúng). Với hệ thống bảo hiểm, mỗi bước riêng lẻ có thể hoạt động hoàn hảo khi kiểm thử độc lập — form Tiếp nhận nhận hồ sơ tốt, app Giám định lưu ảnh tốt, màn Duyệt hiển thị đúng — nhưng khi ghép lại thành một luồng thật, dữ liệu có thể bị mất giữa hai module, trạng thái có thể 'treo' vì không ai chịu trách nhiệm bàn giao tiếp theo, và số liệu cuối cùng có thể lệch nhau giữa nơi tiền được chi và nơi tiền được ghi sổ. Chúng ta sẽ học qua ClaimFlow: theo dõi trọn vẹn một hồ sơ bồi thường xe từ lúc mở tới lúc đóng.",
        "If you're used to testing individual functions — a data-entry form working correctly, an API returning the right status code, a screen displaying the right data — this article shifts you to a very different angle: what happens when ONE record has to pass through FIVE different systems, handled by FOUR different roles, before it's truly 'done' in the real business sense (money reaches the customer and gets booked correctly). In an insurance system, each individual step can work perfectly when tested in isolation — the Intake form accepts claims fine, the Assessment app saves photos fine, the Approval screen displays correctly — but once stitched into a real flow, data can get lost between two modules, a state can get 'stuck' because nobody owns the next handoff, and the final figures can drift apart between where the money is paid out and where it's booked. We'll learn through ClaimFlow: tracking one auto claim record fully, from open to close.",
        "個々の機能テスト——データ入力フォームが正しく動く、APIが正しいステータスコードを返す、画面が正しいデータを表示する——に慣れているなら、本記事は全く異なる視点へ導きます：1件の記録が、真の意味で『完了』（顧客にお金が届き正しく記帳される）するまでに、4つの異なる役割が担当する5つの異なるシステムを通過しなければならないとどうなるか、という問題です。保険システムでは、個々のステップは単独でテストすれば完璧に動くことがあります——受付フォームは案件を問題なく受け取り、査定アプリは写真を問題なく保存し、承認画面は正しく表示されます——しかし実際のフローに組み合わさると、2つのモジュール間でデータが失われたり、次の引き継ぎを誰も担当せず状態が『滞留』したり、お金が支払われた場所と記帳された場所の間で最終的な数値がずれたりし得ます。ClaimFlowを通じて、1件の自動車保険金請求記録を開始から終了まで完全に追跡する方法を学びます。"),
      IMG(m_flow, "Sơ đồ luồng bồi thường ClaimFlow xuyên 5 module: Tiếp nhận → Giám định → Duyệt → Chi trả → Kế toán, kèm đối soát ngược phát hiện lệch", "ClaimFlow diagram across 5 modules: Intake → Assessment → Approval → Payment → Accounting, with a reverse reconciliation edge exposing drift", "5モジュールを通るClaimFlow図：受付→査定→承認→支払→経理、ずれを発見する逆方向の照合エッジ付き"),
      DEF("End-to-End Business Flow Testing", "kiểm thử một hồ sơ/giao dịch nghiệp vụ đi xuyên suốt toàn bộ module, hệ thống và vai trò tham gia, từ điểm khởi tạo tới điểm kết thúc thật sự.",
        "testing a business record/transaction all the way through every module, system, and role involved, from its true starting point to its true ending point.",
        "1件の業務記録/取引が関わるすべてのモジュール・システム・役割を通じて、本当の起点から本当の終点までテストする手法。"),
    ] },
  { heading: { vi: "2. Điểm bàn giao (handoff) & dữ liệu chảy xuyên hệ thống", en: "2. Handoff points & data flowing across systems", ja: "2. 引き継ぎ地点とシステムを越えて流れるデータ" },
    blocks: [
      P("Trái tim của kiểm thử luồng nghiệp vụ đầu-cuối không nằm ở bên trong một module, mà nằm ở KHOẢNG GIỮA hai module — nơi gọi là điểm bàn giao (handoff point). Tại mỗi điểm bàn giao, một module 'nói xong' phần việc của mình và module kế tiếp phải 'nghe đúng' để tiếp tục. Với luồng bồi thường ClaimFlow, có năm điểm bàn giao chính: Tiếp nhận gửi hồ sơ và ảnh hiện trường cho Giám định; Giám định gửi biên bản và mức đề xuất cho Duyệt; Duyệt gửi số tiền phê duyệt và thông tin thụ hưởng cho Chi trả; Chi trả gửi mã giao dịch và số tiền đã chi thực tế cho Kế toán; và cuối cùng Kế toán đối soát ngược lại với Duyệt để xác nhận số liệu khớp.",
        "The heart of end-to-end business flow testing isn't inside a module — it's in the SPACE BETWEEN two modules, called a handoff point. At each handoff point, one module 'finishes speaking' its part and the next module must 'listen correctly' to continue. In the ClaimFlow claims flow, there are five main handoff points: Intake sends the record and scene photos to Assessment; Assessment sends the report and proposed amount to Approval; Approval sends the approved sum and payee details to Payment; Payment sends the transaction code and actual amount paid to Accounting; and finally Accounting reconciles back with Approval to confirm the figures match.",
        "エンドツーエンド業務フローテストの核心はモジュール内部ではなく、2つのモジュールの『間』——引き継ぎ地点と呼ばれる場所にあります。各引き継ぎ地点で、あるモジュールが自分の担当分を『話し終え』、次のモジュールが続けるために正しく『聞き取ら』なければなりません。ClaimFlowの請求フローには5つの主要な引き継ぎ地点があります：受付が記録と現場写真を査定に送る、査定が報告書と提案金額を承認に送る、承認が承認金額と受取人情報を支払に送る、支払が取引コードと実際の支払金額を経理に送る、そして最後に経理が承認と逆方向に照合して数値の一致を確認します。"),
      IMG(m_handoff, "Bảng điểm bàn giao & dữ liệu chảy xuyên luồng bồi thường ClaimFlow, kèm rủi ro nếu thiếu kiểm tra từng điểm", "Table of handoff points and data flowing across the ClaimFlow claims journey, with the risk of skipping each check", "ClaimFlowの請求フローを通じて流れる引き継ぎ地点とデータの表、各チェックを省略した場合のリスク付き"),
      P("Một sai lầm phổ biến khi kiểm thử luồng phức tạp là chỉ kiểm tra CHIỀU GỬI — 'module A có gửi request đi không' — mà quên kiểm tra CHIỀU NHẬN — 'module B có nhận đúng, đủ, và xác nhận lại đúng cách không'. Trong thực tế, phần lớn lỗi luồng nghiêm trọng không nằm ở việc module A 'quên gửi', mà nằm ở việc module B nhận dữ liệu nhưng ÁNH XẠ SAI trường, bỏ sót trường tùy chọn tưởng không quan trọng, hoặc không xác nhận lại cho module A biết là đã nhận thành công — khiến module A tưởng luồng vẫn đang chờ trong khi module B đã âm thầm xử lý xong (hoặc ngược lại, tưởng đã xong nhưng thực ra chưa nhận được gì).",
        "A common mistake when testing a complex flow is only checking the SEND direction — 'did module A send the request' — while forgetting the RECEIVE direction — 'did module B receive it correctly, completely, and acknowledge it properly'. In reality, most serious flow bugs aren't module A 'forgetting to send' — they're module B receiving the data but MAPPING a field wrong, missing an optional-looking field that actually matters, or failing to acknowledge back to module A that it received successfully — leaving module A thinking the flow is still waiting while module B has silently finished processing (or the reverse: thinking it's done when nothing was actually received).",
        "複雑なフローをテストする際によくある間違いは、『送信』方向——『モジュールAはリクエストを送信したか』——だけを確認し、『受信』方向——『モジュールBは正しく、完全に受信し、正しく確認応答したか』——を忘れることです。実際には、重大なフローバグの多くはモジュールAが『送信を忘れた』のではなく、モジュールBがデータを受信したものの項目の『マッピングを誤った』り、重要なのに見た目上オプションに見える項目を見落としたり、正常に受信したことをモジュールAに確認応答し損ねたりすることに起因します——これによりモジュールAはまだ待機中だと思い込んでいるのにモジュールBは静かに処理を終えている（あるいは逆に、完了したと思っているのに実は何も受信していない）ことになります。"),
      DEF("Handoff Point (Điểm bàn giao)", "nơi một module/vai trò kết thúc phần việc và bàn giao dữ liệu, trạng thái cho module/vai trò kế tiếp xử lý tiếp trong cùng một luồng nghiệp vụ.",
        "the point where one module/role finishes its part and hands off data and state for the next module/role to continue within the same business flow.",
        "同一の業務フロー内で、あるモジュール/役割が担当を終え、次のモジュール/役割が処理を続けるためにデータと状態を引き継ぐ地点。"),
    ] },
  { heading: { vi: "3. Vì sao kiểm thử luồng E2E khó hơn và quan trọng hơn kiểm thử từng module", en: "3. Why E2E flow testing is harder and more important than testing modules alone", ja: "3. なぜE2Eフローテストは各モジュール単体のテストより難しく重要なのか" },
    blocks: [
      P("Kiểm thử từng module riêng lẻ có một lợi thế lớn: dễ kiểm soát dữ liệu đầu vào, dễ đoán kết quả đầu ra, dễ tự động hoá. Nhưng chính vì mỗi module được test tách rời, đội phát triển thường DÙNG DỮ LIỆU GIẢ LẬP (mock) cho các module còn lại — nghĩa là ca kiểm thử pass không chứng minh được gì về việc các module THẬT có 'nói chuyện' đúng với nhau hay không. Với một hệ thống bồi thường bảo hiểm, nơi năm hệ thống khác nhau (có thể do các đội khác nhau, thậm chí nhà cung cấp khác nhau phát triển) phải phối hợp cho MỘT hồ sơ, khoảng trống giữa 'từng module pass riêng lẻ' và 'luồng thật chạy đúng' chính là nơi phần lớn sự cố production xảy ra.",
        "Testing each module in isolation has a big advantage: input data is easy to control, output is easy to predict, and it's easy to automate. But precisely because each module is tested separately, dev teams usually use MOCKED data for the other modules — meaning a passing test case proves nothing about whether the REAL modules actually 'talk' to each other correctly. In an insurance claims system, where five different systems (possibly built by different teams, even different vendors) must coordinate for ONE record, the gap between 'each module passing individually' and 'the real flow working correctly' is exactly where most production incidents happen.",
        "各モジュールを個別にテストすることには大きな利点があります：入力データを制御しやすく、出力を予測しやすく、自動化しやすいことです。しかし各モジュールが個別にテストされるからこそ、開発チームは他のモジュールに対して『モックデータ』を使うのが普通です——つまりテストケースが合格しても、実際のモジュール同士が正しく『会話』しているかについては何も証明しません。保険金請求システムのように、5つの異なるシステム（異なるチーム、場合によっては異なるベンダーが開発している可能性もある）が1件の記録のために連携しなければならない場合、『各モジュールが個別に合格する』ことと『実際のフローが正しく動く』ことの間のギャップこそが、ほとんどの本番障害が発生する場所です。"),
      P("Ngoài ra, luồng nghiệp vụ E2E còn đặc biệt khó vì nó kéo dài qua THỜI GIAN — không phải một request-response tức thì mà có thể mất vài giờ tới vài ngày để một hồ sơ đi từ Tiếp nhận tới Kế toán, với nhiều bước có sự tham gia của CON NGƯỜI (giám định viên đi hiện trường, người duyệt xem xét hồ sơ). Trong khoảng thời gian đó, hồ sơ có thể ở trạng thái 'chờ' rất lâu mà không ai để ý, hệ thống có thể bị bảo trì giữa chừng, hoặc một trong các hệ thống tham gia có thể tạm thời không khả dụng — những kịch bản mà kiểm thử chức năng thông thường (chạy nhanh, trong một phiên) không bao giờ mô phỏng được.",
        "E2E business flows are also especially hard because they stretch across TIME — not an instant request-response, but potentially hours or days for one record to travel from Intake to Accounting, with several steps involving HUMANS (an assessor visiting the scene, an approver reviewing the case). During that time, a record can sit 'waiting' for a very long time unnoticed, a system can go through maintenance mid-flow, or one of the participating systems can become temporarily unavailable — scenarios that ordinary functional testing (fast, within one session) never simulates.",
        "また、E2E業務フローは『時間』にまたがるため特に難しくなります——即座のリクエスト・レスポンスではなく、1件の記録が受付から経理まで移動するのに数時間から数日かかることがあり、複数のステップに『人間』（現場を訪れる査定員、案件を審査する承認者）が関与します。その間、記録は誰にも気づかれず非常に長く『待機』状態のままになったり、フローの途中でシステムがメンテナンスに入ったり、参加システムの1つが一時的に利用不可になったりし得ます——これらは通常の機能テスト（速く、1セッション内で完結）が決してシミュレートしないシナリオです。"),
      P("Cuối cùng, hậu quả của lỗi luồng E2E trong ngành bảo hiểm không chỉ là 'trải nghiệm xấu' mà có thể là hậu quả pháp lý và tài chính trực tiếp: hồ sơ treo quá lâu vi phạm cam kết SLA với khách hàng và cơ quan quản lý, chi trả sai số tiền là tổn thất tài chính thật, còn dữ liệu lệch giữa Chi trả và Kế toán có thể dẫn tới báo cáo tài chính sai lệch — một vấn đề nghiêm trọng khi bị kiểm toán. Đây là lý do kiểm thử luồng E2E cần được coi là một hạng mục kiểm thử ĐỘC LẬP, có kế hoạch riêng, không thể chỉ 'suy ra' từ việc từng module đã pass.",
        "Finally, the consequences of E2E flow bugs in insurance aren't just 'a bad experience' — they can be direct legal and financial consequences: a claim stuck too long breaches SLA commitments to customers and regulators, an incorrect payout is a real financial loss, and data drift between Payment and Accounting can lead to misstated financial reports — a serious problem under audit. This is why E2E flow testing needs to be treated as an INDEPENDENT test category with its own plan, not something you can simply 'infer' from each module passing.",
        "最後に、保険業界におけるE2Eフローバグの結果は『悪い体験』にとどまらず、直接的な法的・財務的結果になり得ます：長く滞留した案件は顧客や規制当局へのSLAコミットメントに違反し、誤った支払額は実際の財務損失であり、支払と経理の間のデータのずれは財務報告の誤りにつながり得ます——これは監査において深刻な問題です。だからこそE2Eフローテストは、各モジュールの合格から単に『推測』できるものではなく、独自の計画を持つ『独立した』テスト分類として扱われる必要があるのです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: quy trình & kỹ thuật thiết kế ca kiểm thử E2E", en: "4. Prepare: a process & techniques for designing E2E test cases", ja: "4. 準備：E2Eテストケース設計のプロセスと技法" },
    blocks: [
      P("Trước khi viết bất kỳ ca kiểm thử nào, tester E2E cần một bức tranh THẬT về luồng — không phải luồng lý tưởng trong tài liệu đặc tả, mà là luồng thực tế bao gồm cả những đường lỗi mà tài liệu thường bỏ sót. Quy trình dưới đây giúp bạn đi từ sơ đồ luồng tới bộ ca kiểm thử theo nhánh có hệ thống.",
        "Before writing any test case, an E2E tester needs a REAL picture of the flow — not the idealized flow in the spec document, but the actual flow including the error paths documentation usually skips. The process below takes you from a flow diagram to a systematic set of branch-based test cases.",
        "テストケースを書く前に、E2Eテスターはフローの『実際の』全体像——仕様書にある理想化されたフローではなく、ドキュメントが通常省略するエラー経路も含む実際のフロー——を把握する必要があります。以下のプロセスは、フロー図から体系的なブランチ別テストケース群へと導きます。"),
      STEP(1, "Vẽ sơ đồ luồng thật (không phải luồng lý tưởng): liệt kê từng module/hệ thống/vai trò tham gia và đánh số thứ tự các điểm bàn giao.", "Draw the real flow (not the idealized one): list every module/system/role involved and number each handoff point.", "実際のフロー（理想化されたものではない）を描き、関わるすべてのモジュール/システム/役割を列挙し、各引き継ぎ地点に番号を振る。"),
      STEP(2, "Với mỗi điểm bàn giao, xác định: dữ liệu gửi đi, dữ liệu/xác nhận nhận về, và SLA thời gian tối đa cho phép.", "For each handoff point, define: the data sent, the data/acknowledgement received back, and the maximum allowed SLA time.", "各引き継ぎ地点について、送信されるデータ、返送されるデータ/確認応答、許容される最大SLA時間を定義する。"),
      STEP(3, "Thiết kế 1 ca happy path xuyên suốt toàn bộ luồng trước, dùng làm mốc so sánh cho các ca nhánh lỗi.", "Design one happy-path case spanning the entire flow first, to use as a baseline for the error-branch cases.", "まずフロー全体を貫く1つのハッピーパスケースを設計し、エラーブランチケースの比較基準とする。"),
      STEP(4, "Với mỗi điểm bàn giao, thêm ít nhất một ca lỗi mô phỏng: dữ liệu thiếu/sai, timeout, hồ sơ bị từ chối giữa chừng, hoặc hồ sơ 'treo' không ai xử lý.", "For each handoff point, add at least one simulated failure case: missing/wrong data, a timeout, a mid-flow rejection, or a claim 'stuck' with nobody handling it.", "各引き継ぎ地点について、少なくとも1つの模擬障害ケース（データの欠落/誤り、タイムアウト、フロー途中の拒否、誰も処理しない『滞留』案件）を追加する。"),
      CODE("text", "KE HOACH CA KIEM THU E2E - Ho so boi thuong ClaimFlow\nDu lieu nen: Ho so XA-2026-00847, xe 51K-772.09, muc thiet hai uoc tinh 18.000.000d\nB1: Tiep nhan tao ho so, gan giam dinh vien trong 2 gio (SLA)\nB2: Giam dinh hoan tat bien ban, de xuat boi thuong 16.500.000d, chuyen sang Duyet\nB3: Duyet xac nhan muc de xuat, phat lenh chi 16.500.000d toi TK khach hang\nB4: Chi tra thuc hien lenh chi, ghi ma giao dich ngan hang\nB5: Ke toan doi soat: so tien da chi (buoc 4) phai KHOP voi so tien da duyet (buoc 3)\nExpected: ca 5 buoc hoan tat trong SLA tong luong, so lieu khop 100% o buoc doi soat"),
      TRY("Chọn một điểm bàn giao bất kỳ trong sơ đồ ClaimFlow và tự viết thêm 1 ca lỗi cho điểm đó (gợi ý: dữ liệu tới chậm hơn SLA, hoặc dữ liệu tới nhưng sai định dạng).", "Pick any handoff point in the ClaimFlow diagram and write one more failure case for it (hint: data arrives later than the SLA, or arrives but in the wrong format).", "ClaimFlow図の任意の引き継ぎ地点を選び、その地点に対するもう1つの障害ケースを書いてみよう（ヒント：データがSLAより遅く到着する、または到着するが形式が誤っている）。"),
      PITFALL("Chỉ kiểm thử luồng E2E bằng cách 'chạy hết một lượt xem có lỗi không' mà không có checklist rõ ràng cho từng điểm bàn giao. Không có checklist, tester dễ bỏ sót đúng điểm bàn giao có rủi ro cao nhất vì màn hình cuối cùng vẫn 'trông có vẻ đúng'.", "Testing the E2E flow only by 'running through once to see if anything breaks' without a clear checklist per handoff point. Without a checklist, testers easily miss exactly the highest-risk handoff because the final screen still 'looks fine'.", "各引き継ぎ地点の明確なチェックリストなしに、E2Eフローを『1回通しで実行してみて何か壊れないか見る』だけでテストすること。チェックリストがなければ、最終画面が『問題なさそうに見える』ため、最もリスクの高い引き継ぎ地点をまさに見落としやすくなる。"),
      IMG(m_screen, "Màn Duyệt bồi thường: dữ liệu từ Giám định chưa đồng bộ sang, hồ sơ treo gần vượt SLA", "Approval screen: data from Assessment hasn't synced yet, the claim is stuck close to breaching SLA", "承認画面：査定からのデータがまだ同期されておらず、案件はSLA違反寸前で滞留している"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử E2E từng bước & bộ ca theo nhánh", en: "5. Writing E2E test cases step by step & the branch-based suite", ja: "5. E2Eテストケースを一歩ずつ書く・ブランチ別ケース一式" },
    blocks: [
      P("Áp dụng quy trình ở chương trước vào ClaimFlow, ta có một bộ ca kiểm thử theo NHÁNH: một nhánh happy path và bốn nhánh mô phỏng các dạng lỗi phổ biến nhất trong luồng nghiệp vụ đa hệ thống — từ chối giữa luồng, timeout liên hệ thống, hồ sơ treo không ai xử lý, và lệch dữ liệu chỉ lộ ra ở bước đối soát cuối cùng.",
        "Applying the process from the previous chapter to ClaimFlow gives us a BRANCH-based test suite: one happy-path branch and four branches simulating the most common failure types in a multi-system business flow — mid-flow rejection, cross-system timeout, an unowned stuck claim, and data drift only exposed at final reconciliation.",
        "前章のプロセスをClaimFlowに適用すると、ブランチ別のテストスイートが得られます：1つのハッピーパスブランチと、マルチシステム業務フローで最も一般的な障害タイプ——フロー途中の拒否、システム間タイムアウト、担当者不在の滞留案件、最終照合でのみ露呈するデータのずれ——を模した4つのブランチです。"),
      IMG(m_branches, "Bảng ca kiểm thử E2E theo nhánh cho luồng bồi thường ClaimFlow: happy path & 4 nhánh lỗi phổ biến", "Branch-based E2E test-case table for the ClaimFlow claims flow: happy path & 4 common failure branches", "ClaimFlow請求フローのブランチ別E2Eテストケース表：ハッピーパスと4つの一般的な障害ブランチ"),
      P("Điểm khác biệt lớn nhất so với thiết kế ca kiểm thử chức năng thông thường là: mỗi ca trong bảng trên KHÔNG chỉ kiểm tra 'màn hình có hiển thị đúng không' mà kiểm tra 'trạng thái và dữ liệu ở TẤT CẢ các hệ thống liên quan có nhất quán với nhau không' tại cùng một thời điểm. Ví dụ với nhánh 'timeout liên hệ thống', ca kiểm thử không dừng lại ở việc xem Duyệt có báo lỗi timeout hay không, mà phải kiểm tra tiếp: hệ thống Chi trả có tạo lệnh chi trùng không, mã lệnh chi có được giữ nguyên khi retry không, và cuối cùng đối soát ở Kế toán có phát hiện bất thường nào không. Một ca kiểm thử E2E 'đủ tốt' luôn kết thúc bằng việc kiểm tra dữ liệu ở module CUỐI của luồng, chứ không dừng ở module xảy ra sự cố.",
        "The biggest difference from ordinary functional test-case design is: each case in the table above doesn't just check 'does the screen display correctly' but checks 'are the state and data across ALL involved systems consistent with each other' at the same point in time. For example, in the 'cross-system timeout' branch, the test case doesn't stop at whether Approval shows a timeout error — it must also check: does Payment create a duplicate payment order, does the order code stay the same on retry, and finally does reconciliation at Accounting catch any anomaly. A 'good enough' E2E test case always ends by checking data at the FINAL module of the flow, not stopping at the module where the failure occurred.",
        "通常の機能テストケース設計との最大の違いは、上の表の各ケースが『画面が正しく表示されるか』だけでなく、同じ時点で『関係する『すべての』システム間で状態とデータが一致しているか』を確認することです。例えば『システム間タイムアウト』ブランチでは、承認がタイムアウトエラーを表示するかどうかで終わらず、支払が重複した支払指図を作成していないか、リトライ時に指図コードが同じままか、そして最終的に経理での照合が何らかの異常を検知するかまで確認する必要があります。『十分に良い』E2Eテストケースは常に、障害が発生したモジュールで止まらず、フローの『最終』モジュールでのデータ確認で終わります。"),
    ] },
  { heading: { vi: "6. Tình huống 1: hồ sơ treo giữa Giám định và Duyệt, không ai xử lý", en: "6. Situation 1: a claim stuck between Assessment and Approval, unowned", ja: "6. シーン1：査定と承認の間で滞留する案件、誰も処理しない" },
    blocks: [
      SITUATION("Giám định viên hoàn tất biên bản cho hồ sơ XA-2026-00847 và chuyển trạng thái sang 'Chờ duyệt'. Hệ thống thiết kế để tự động gán một Claims Manager xử lý trong 24 giờ.", "The assessor finishes the report for claim XA-2026-00847 and moves its status to 'Awaiting approval'. The system is designed to auto-assign a Claims Manager to handle it within 24 hours.",
        "Do lỗi cấu hình hàng đợi phân công, hồ sơ không được gán cho bất kỳ ai. Không có cảnh báo nào được kích hoạt vì hệ thống chỉ cảnh báo khi hồ sơ ĐÃ được gán nhưng người xử lý trễ hạn — không cảnh báo trường hợp hồ sơ CHƯA được gán cho ai cả. Chín ngày sau, khách hàng gọi khiếu nại vì chưa nhận được phản hồi.", "Due to a queue-assignment configuration bug, the claim doesn't get assigned to anyone. No alert fires because the system only alerts when a claim HAS been assigned but the handler is late — not when a claim HASN'T been assigned to anyone at all. Nine days later, the customer calls to complain about not hearing back.",
        "査定員が案件XA-2026-00847の報告書を完成させ、ステータスを『承認待ち』に変更する。システムは24時間以内にクレームマネージャーを自動割当するよう設計されている。",
        "割当キューの設定バグにより、案件は誰にも割り当てられない。システムは案件が『割り当てられているが』担当者が期限を過ぎた場合にのみアラートを発するよう設計されており、そもそも『誰にも割り当てられていない』場合にはアラートしないため、警告は発生しない。9日後、顧客が返答がないことについて苦情の電話をかけてくる。"),
      SOLVE("Báo bug Critical (vi phạm SLA khách hàng), yêu cầu bổ sung một cơ chế quét định kỳ (ví dụ mỗi giờ) tìm TẤT CẢ hồ sơ ở trạng thái 'Chờ duyệt' nhưng KHÔNG có người được gán — không chỉ cảnh báo khi có người được gán nhưng trễ hạn — và tự động gán lại hoặc báo động cho quản lý cấp trên nếu hàng đợi phân công gặp lỗi. Bổ sung ca kiểm thử này (hồ sơ chưa từng được gán) vào bộ hồi quy E2E, vì đây là dạng lỗi 'không ai bấm chuông báo' rất dễ tái diễn sau mỗi lần thay đổi logic phân công.", "Report it as a Critical bug (customer SLA breach), request adding a periodic scan (e.g. hourly) that finds ALL claims in 'Awaiting approval' status that have NO assignee — not just alerting when someone is assigned but late — and auto-reassign or escalate to a manager if the assignment queue fails. Add this test case (a claim that was never assigned) to the E2E regression suite, since it's the kind of 'nobody rings the alarm' bug that easily recurs after any change to assignment logic.", "Criticalバグとして報告し（顧客SLA違反）、担当者が割り当てられているが遅延している場合だけでなく、『承認待ち』ステータスで担当者が『いない』すべての案件を見つける定期スキャン（例：毎時）を追加するよう要求し、割当キューに障害が発生した場合は自動再割当または上位管理者へのエスカレーションを行うようにする。このテストケース（一度も割り当てられなかった案件）をE2E回帰テストスイートに追加する。これは割当ロジックに変更が加わるたびに再発しやすい『誰も警鐘を鳴らさない』種類のバグだからだ。"),
      P("Bài học lớn nhất từ tình huống này: kiểm thử E2E không thể chỉ mô phỏng 'đường đi đúng chậm hơn bình thường' mà còn phải mô phỏng 'đường đi KHÔNG BAO GIỜ bắt đầu' — tức là hồ sơ dừng lại hoàn toàn ở một điểm bàn giao mà không có bất kỳ tín hiệu lỗi rõ ràng nào. Đây chính là lý do vì sao chỉ kiểm thử 'timeout có cảnh báo không' là chưa đủ; tester còn cần kiểm thử riêng ca 'không có gì xảy ra cả' — không request, không lỗi, không cảnh báo, chỉ có sự im lặng — vì đây là dạng lỗi khó phát hiện nhất bằng log thông thường.",
        "The biggest lesson from this situation: E2E testing can't only simulate 'the correct path running slower than usual' — it must also simulate 'the path never starting at all', meaning a claim stops completely at a handoff point with no clear error signal whatsoever. That's exactly why testing 'does a timeout trigger an alert' alone isn't enough; testers also need a separate case for 'nothing happens at all' — no request, no error, no alert, just silence — because it's the hardest bug type to catch through ordinary logs.",
        "この状況からの最大の教訓：E2Eテストは『正しい経路が通常より遅く進む』ことだけをシミュレートするのでは不十分で、『経路が全く始まらない』こと——つまり明確なエラーシグナルが一切ないまま、案件が引き継ぎ地点で完全に停止すること——もシミュレートしなければなりません。だからこそ『タイムアウトがアラートをトリガーするか』だけをテストするのでは不十分なのです。テスターは『何も起きない』ケース——リクエストもエラーもアラートもなく、ただの沈黙——も個別にテストする必要があります。これは通常のログでは最も検知しにくいバグ種別だからです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử E2E 'hồ sơ treo, không ai được gán xử lý' giữa Giám định và Duyệt", "A bug ticket found via the E2E 'unowned, stuck claim' case between Assessment and Approval", "査定と承認の間の『滞留、誰も割り当てられていない案件』E2Eケースで見つかったバグチケット"),
      RECAP(["Kiểm thử cả 'timeout có cảnh báo' lẫn 'không gì xảy ra cả, im lặng hoàn toàn'", "Cần cơ chế quét định kỳ hồ sơ CHƯA được gán, không chỉ cảnh báo khi trễ hạn"],
        ["Test both 'timeout triggers an alert' and 'nothing happens at all, complete silence'", "Need a periodic scan for UNASSIGNED claims, not just alerts for late-but-assigned ones"],
        ["『タイムアウトがアラートをトリガーする』ことと『何も起きない完全な沈黙』の両方をテストする", "遅延だが割当済みのケースだけでなく『未割当』案件の定期スキャンが必要"]),
    ] },
  { heading: { vi: "7. Tình huống 2: dữ liệu bồi thường lệch khi sang Kế toán", en: "7. Situation 2: claim data drifts when it crosses into Accounting", ja: "7. シーン2：経理に渡る際に保険金データがずれる" },
    blocks: [
      SITUATION("Duyệt phê duyệt số tiền bồi thường 16.500.000đ cho hồ sơ XA-2026-00901. Chi trả thực hiện lệnh chi và báo 'thành công'.", "Approval sets the payout amount for claim XA-2026-00901 at 16,500,000đ. Payment executes the payout order and reports 'success'.",
        "Do một job đồng bộ chạy sai thứ tự, Kế toán ghi sổ số tiền 15.300.000đ — thấp hơn số tiền thực tế đã chi 1.200.000đ. Không có màn hình nào báo lỗi vì cả Chi trả và Kế toán đều tự tin dữ liệu của mình là đúng; chỉ báo cáo đối soát cuối ngày mới lộ ra chênh lệch, và chỉ khi có ai đó chủ động xem báo cáo đó.", "Because a sync job runs out of order, Accounting books 15,300,000đ — 1,200,000đ less than what was actually paid out. No screen shows an error, since both Payment and Accounting are each confident their own data is correct; only the end-of-day reconciliation report reveals the gap, and only if someone actually looks at that report.",
        "案件XA-2026-00901に対し、承認は保険金額を1,650万ドンに設定する。支払は支払指図を実行し『成功』と報告する。",
        "同期ジョブが誤った順序で実行されたため、経理は153万ドンを記帳する——実際に支払われた金額より120万ドン少ない。支払と経理の両方が自分のデータは正しいと確信しているため、どの画面にもエラーは表示されない。日次照合レポートでのみギャップが明らかになり、誰かがそのレポートを実際に確認した場合に限られる。"),
      SOLVE("Báo bug Critical (sai lệch số liệu tài chính), yêu cầu đội phát triển đảm bảo job đồng bộ Chi trả → Kế toán chạy ĐÚNG THỨ TỰ và có cơ chế xác nhận nhận đủ (acknowledgement) thay vì đồng bộ 'bắn và quên' (fire-and-forget); đồng thời đề xuất chuyển báo cáo đối soát từ 'xem thủ công cuối ngày' sang cảnh báo TỰ ĐỘNG ngay khi phát hiện chênh lệch vượt ngưỡng, thay vì phụ thuộc vào việc có người chủ động mở báo cáo hay không. Bổ sung ca kiểm thử đối soát số tiền Chi trả với Kế toán vào bộ hồi quy E2E chạy sau mỗi lần thay đổi liên quan tới job đồng bộ.", "Report it as a Critical bug (financial figures mismatch), request the dev team ensure the Payment → Accounting sync job runs in the CORRECT ORDER and has an acknowledgement mechanism instead of a 'fire-and-forget' sync; also propose moving reconciliation from 'manually reviewed at end of day' to an AUTOMATIC alert as soon as a discrepancy above threshold is detected, instead of depending on someone proactively opening the report. Add this Payment-vs-Accounting reconciliation test case to the E2E regression suite run after any change to the sync job.", "Criticalバグとして報告し（財務数値の不一致）、開発チームに支払→経理の同期ジョブが『正しい順序』で実行され、『撃ちっぱなし』の同期ではなく確認応答機構を持つよう要求する。また、照合を『日次で手動レビュー』から、誰かが積極的にレポートを開くことに依存せず、しきい値を超える不一致が検出され次第『自動』アラートするよう変更することを提案する。この支払対経理の照合テストケースを、同期ジョブへの変更後に実行されるE2E回帰テストスイートに追加する。"),
      P("Tình huống này là ví dụ rõ nhất cho việc vì sao 'mỗi bước báo thành công' không đồng nghĩa với 'luồng đúng'. Cả Chi trả lẫn Kế toán đều không hề báo lỗi — mỗi hệ thống chỉ biết về phần dữ liệu của riêng nó và tin rằng nó đúng. Chỉ khi tester (hoặc hệ thống) chủ động ĐỐI CHIẾU số liệu giữa điểm đầu và điểm cuối của luồng — thay vì tin vào từng thông báo 'thành công' riêng lẻ — lỗi mới lộ diện. Đây là lý do bước đối chiếu cuối luồng không nên là một bước 'tuỳ chọn' hay 'nice to have', mà phải là một PHẦN BẮT BUỘC của mọi ca kiểm thử E2E chạm tới dữ liệu tài chính.",
        "This situation is the clearest example of why 'every step reports success' doesn't mean 'the flow is correct'. Neither Payment nor Accounting reports any error — each system only knows about its own slice of data and believes it's correct. The bug only surfaces when a tester (or the system) actively RECONCILES the figures between the flow's start and end points — instead of trusting each individual 'success' notification. That's why the end-of-flow reconciliation step shouldn't be 'optional' or 'nice to have' — it must be a REQUIRED part of every E2E test case that touches financial data.",
        "この状況は、『各ステップが成功を報告する』ことが『フローが正しい』ことを意味しない理由を最も明確に示す例です。支払も経理もエラーを報告しません——各システムは自分のデータの断片しか知らず、それが正しいと信じています。テスター（またはシステム）が個々の『成功』通知を信頼するのではなく、フローの起点と終点の間で数値を積極的に『照合』したときにのみ、バグが露呈します。だからこそフロー終了時の照合ステップは『オプション』や『あれば良い』ものではなく、財務データに触れるすべてのE2Eテストケースの『必須』部分でなければならないのです。"),
      TRY("Nghĩ thêm một cặp module khác trong ClaimFlow có thể lệch dữ liệu âm thầm tương tự (ví dụ: số tiền Duyệt phê duyệt vs số tiền hiển thị trên thông báo gửi khách hàng) và đề xuất 1 ca đối soát cho cặp đó.", "Think of another pair of modules in ClaimFlow that could silently drift the same way (e.g. the amount Approval sets vs the amount shown in the customer notification) and propose one reconciliation case for that pair.", "ClaimFlow内で同様に静かにずれる可能性のある別のモジュールペア（例：承認が設定する金額と顧客への通知に表示される金額）を考え、そのペアに対する照合ケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Timeout liên hệ thống & khả năng chịu lỗi xuyên luồng", en: "8. Cross-system timeouts & flow-wide fault tolerance", ja: "8. システム間タイムアウトとフロー全体の耐障害性" },
    blocks: [
      P("Trong luồng E2E đa hệ thống, timeout không phải là 'trường hợp hiếm' mà là chuyện gần như CHẮC CHẮN sẽ xảy ra ở quy mô đủ lớn — mạng chập chờn, một hệ thống bảo trì đúng lúc, hoặc đơn giản là quá tải tạm thời. Câu hỏi quan trọng không phải 'timeout có xảy ra không' mà là 'khi timeout xảy ra, luồng có TỰ HỒI PHỤC đúng cách hay để lại hậu quả (dữ liệu trùng, tiền chi hai lần, hồ sơ kẹt vĩnh viễn) hay không'.",
        "In a multi-system E2E flow, a timeout isn't a 'rare case' — at sufficient scale it's almost CERTAIN to happen: flaky networks, a system undergoing maintenance at the wrong moment, or simply temporary overload. The important question isn't 'will a timeout happen' but 'when it happens, does the flow RECOVER correctly, or does it leave behind consequences (duplicate data, a double payout, a permanently stuck claim)'.",
        "マルチシステムE2Eフローでは、タイムアウトは『まれなケース』ではなく、十分な規模では発生することがほぼ『確実』です——不安定なネットワーク、タイミングの悪いメンテナンス、あるいは単なる一時的な過負荷。重要な問いは『タイムアウトが起きるかどうか』ではなく、『起きたときにフローが正しく『回復』するか、それとも結果（データの重複、二重支払、永久に滞留する案件）を残すか』です。"),
      P("Hai cơ chế then chốt tester cần kiểm chứng khi thiết kế ca timeout là idempotency (tính chất bất biến khi lặp) và circuit breaker (ngắt mạch tạm thời). Idempotency đảm bảo nếu Duyệt gửi lại đúng lệnh chi (do không nhận được phản hồi từ Chi trả và tự động retry), hệ thống Chi trả phải nhận diện đây là YÊU CẦU TRÙNG (qua một mã định danh duy nhất gắn với lệnh chi) và trả về đúng kết quả đã xử lý trước đó, thay vì tạo một lệnh chi mới. Circuit breaker giúp một hệ thống đang gặp sự cố (ví dụ Chi trả quá tải) không bị 'dội bom' thêm request retry từ Duyệt, mà tạm thời chuyển các request đó sang trạng thái 'chờ xử lý sau' cho tới khi hệ thống đích phục hồi — tránh biến một sự cố cục bộ thành sự cố lan rộng toàn luồng.",
        "The two key mechanisms testers need to verify when designing timeout cases are idempotency (behaving the same when repeated) and the circuit breaker (temporarily cutting the circuit). Idempotency ensures that if Approval resends the same payout order (because it got no response from Payment and auto-retried), the Payment system must recognize this as a DUPLICATE REQUEST (via a unique identifier attached to the order) and return the previously processed result, instead of creating a new payout order. A circuit breaker keeps a system in trouble (e.g. an overloaded Payment service) from being 'bombarded' with more retry requests from Approval, instead temporarily routing those requests into a 'process later' state until the target system recovers — preventing a local incident from becoming a flow-wide one.",
        "タイムアウトケースを設計する際にテスターが検証すべき2つの重要な機構は、冪等性（繰り返しても同じ挙動をする性質）とサーキットブレーカー（一時的な回路遮断）です。冪等性は、承認が同じ支払指図を再送した場合（支払から応答がなく自動リトライしたため）、支払システムがこれを（指図に付与された一意の識別子を通じて）『重複リクエスト』と認識し、新しい支払指図を作成するのではなく以前処理済みの結果を返すことを保証します。サーキットブレーカーは、障害中のシステム（例：過負荷の支払サービス）が承認からのさらなるリトライリクエストで『攻撃』されないようにし、代わりにそれらのリクエストを対象システムが回復するまで一時的に『後で処理』状態にルーティングします——ローカルな障害がフロー全体の障害になるのを防ぎます。"),
      IMG(m_kanban, "Bảng theo dõi lỗi luồng E2E tìm được qua kiểm thử (ClaimFlow · Sprint Handoff)", "A board tracking E2E flow bugs found via testing (ClaimFlow · Sprint Handoff)", "テストで見つかったE2Eフローバグの追跡ボード（ClaimFlow・スプリントHandoff）"),
      TIP("Khi thiết kế ca timeout, luôn kiểm tra CẢ HAI đầu: hệ thống gửi (có retry đúng cách, không lặp vô hạn) và hệ thống nhận (có nhận diện đúng request trùng qua mã định danh, không xử lý hai lần).", "When designing timeout cases, always check BOTH ends: the sending system (does it retry correctly, without looping forever) and the receiving system (does it correctly recognize duplicate requests via an identifier, without processing twice).", "タイムアウトケースを設計する際は、常に両端を確認しよう：送信システム（正しくリトライし無限ループしないか）と受信システム（識別子を通じて重複リクエストを正しく認識し2回処理しないか）。"),
    ] },
  { heading: { vi: "9. Cân bằng ưu tiên, theo dõi & lỗi hay gặp khi kiểm thử E2E", en: "9. Balancing priorities, tracking, & common mistakes in E2E testing", ja: "9. 優先順位のバランス、追跡、E2Eテストでよくある失敗" },
    blocks: [
      P("Không phải mọi luồng nghiệp vụ trong hệ thống bảo hiểm đều cần bộ ca kiểm thử E2E đầy đủ như nhau. Cách thực dụng là ưu tiên theo hai tiêu chí: luồng có CHẠM TỚI TIỀN THẬT (bồi thường, hoàn phí, thanh toán phí bảo hiểm) và luồng có NHIỀU ĐIỂM BÀN GIAO GIỮA CÁC ĐỘI KHÁC NHAU (rủi ro 'không ai chịu trách nhiệm' cao hơn khi có nhiều bên tham gia). Các luồng chỉ tra cứu thông tin nội bộ, không chạm dữ liệu tài chính, có thể ưu tiên kiểm thử E2E thấp hơn.",
        "Not every business flow in an insurance system needs an equally full E2E test suite. A practical approach is to prioritize by two criteria: flows that TOUCH REAL MONEY (claims, refunds, premium payments) and flows with MANY HANDOFF POINTS ACROSS DIFFERENT TEAMS (the risk of 'nobody owns it' is higher with more parties involved). Flows that only look up internal information, without touching financial data, can be given lower E2E test priority.",
        "保険システムのすべての業務フローが同じように完全なE2Eテストスイートを必要とするわけではありません。実用的なアプローチは、2つの基準で優先順位を付けることです：実際の『お金に触れる』フロー（保険金請求、返金、保険料支払い）と、『異なるチーム間の引き継ぎ地点が多い』フロー（関係者が多いほど『誰も担当しない』リスクが高まる）。財務データに触れない社内情報照会だけのフローは、E2Eテストの優先度を下げてもよいでしょう。"),
      IMG(m_dash, "Số liệu kiểm thử luồng E2E bồi thường ClaimFlow: hồ sơ treo, lệch dữ liệu, vi phạm SLA", "ClaimFlow E2E testing metrics: stuck claims, data drift, SLA breaches", "ClaimFlow E2Eテスト指標：滞留案件、データのずれ、SLA違反"),
      PITFALL("Chỉ đo thời gian kiểm thử E2E bằng 'luồng có chạy hết không' mà không đo 'luồng có chạy ĐÚNG trong SLA không'. Một luồng chạy xong sau 15 ngày thay vì 3 ngày vẫn coi là PASS nếu không có ca kiểm thử theo dõi thời gian rõ ràng — đây là lỗ hổng phổ biến khiến vi phạm SLA lọt qua kiểm thử.", "Measuring E2E testing only by 'does the flow complete' without measuring 'does the flow complete correctly within SLA'. A flow that finishes after 15 days instead of 3 still counts as PASS if there's no explicit time-tracking test case — a common gap that lets SLA breaches slip through testing.", "E2Eテストを『フローが完了するか』だけで測り、『SLA内で正しく完了するか』を測らないこと。明示的な時間追跡テストケースがなければ、3日ではなく15日後に完了したフローも『合格』とみなされてしまいます——これはSLA違反がテストをすり抜ける一般的な抜け穴です。"),
      PITFALL("Kiểm thử E2E chỉ với dữ liệu 'đẹp' (một hồ sơ, một khách hàng, không có gì bất thường) mà quên kiểm thử nhiều hồ sơ CHẠY SONG SONG qua cùng một luồng — trong thực tế, hàng trăm hồ sơ đi qua ClaimFlow cùng lúc, và lỗi hàng đợi/phân công thường chỉ lộ ra khi có tải thật, không phải với một hồ sơ đơn lẻ.", "Testing E2E only with 'clean' data (one claim, one customer, nothing unusual) while forgetting to test many claims running IN PARALLEL through the same flow — in reality, hundreds of claims pass through ClaimFlow at once, and queue/assignment bugs often only surface under real load, not with a single isolated claim.", "『きれいな』データ（1件の案件、1人の顧客、異常なし）だけでE2Eをテストし、同じフローを『並行して』流れる多数の案件をテストするのを忘れること——実際には、何百もの案件が同時にClaimFlowを通過しており、キュー/割当のバグは、単一の孤立した案件ではなく実際の負荷下でのみ露呈することが多い。"),
      TIP("Ưu tiên bộ ca kiểm thử E2E cho các luồng chạm tới TIỀN THẬT trước, và luôn đưa bước đối chiếu số liệu ở module CUỐI luồng vào tiêu chí PASS/FAIL của mọi ca — đừng để 'mỗi bước báo thành công' đánh lừa kết luận của bạn.", "Prioritize E2E test suites for flows touching REAL MONEY first, and always include an end-of-flow reconciliation check in the PASS/FAIL criteria of every case — don't let 'every step reports success' fool your conclusion.", "実際のお金に触れるフローのE2Eテストスイートを優先し、すべてのケースの合否基準にフロー終了時の照合チェックを必ず含めよう——『各ステップが成功を報告する』ことに結論を惑わされないように。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
      INTERNAL("Thiết kế ca kiểm thử từ Use Case cho Tester", "Designing test cases from use cases for testers", "thiet-ke-ca-kiem-thu-tu-use-case-cho-tester", "テスターのためのユースケースからのテストケース設計"),
      INTERNAL("Kiểm thử báo cáo và đối soát dữ liệu cho Tester", "Testing reports and data reconciliation for testers", "kiem-thu-bao-cao-va-doi-soat-du-lieu-cho-tester", "テスターのためのレポート・データ照合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử luồng nghiệp vụ đầu-cuối (End-to-End Business Flow Testing) qua ClaimFlow — hệ thống bồi thường bảo hiểm xe với luồng 5 bước Tiếp nhận → Giám định → Duyệt → Chi trả → Kế toán: cách xác định điểm bàn giao và dữ liệu chảy xuyên hệ thống, quy trình thiết kế bộ ca theo nhánh (happy path + 4 nhánh lỗi), và hai tình huống thật cho thấy vì sao 'mỗi bước báo thành công' không đồng nghĩa 'luồng đúng' — hồ sơ treo không ai xử lý, và dữ liệu lệch âm thầm khi sang kế toán. Bạn cũng biết cách kiểm chứng timeout liên hệ thống qua idempotency và circuit breaker, cùng cách ưu tiên bộ ca theo mức độ chạm tới tiền thật. Đây là kỹ năng nâng cao giúp bạn bắt được lớp lỗi mà kiểm thử từng module riêng lẻ không bao giờ chạm tới.",
        "You just learned end-to-end business flow testing through ClaimFlow — an auto insurance claims system with a 5-step flow, Intake → Assessment → Approval → Payment → Accounting: how to identify handoff points and data flowing across systems, a process for designing a branch-based suite (happy path + 4 failure branches), and two real situations showing why 'every step reports success' doesn't mean 'the flow is correct' — an unowned stuck claim, and data silently drifting on its way to accounting. You also learned to verify cross-system timeouts via idempotency and circuit breakers, and how to prioritize the test suite by how much a flow touches real money. This is an advanced skill that lets you catch a bug class ordinary module-by-module testing never reaches.",
        "ClaimFlow——受付→査定→承認→支払→経理という5ステップのフローを持つ自動車保険金請求システム——を通じてエンドツーエンド業務フローテストを学びました：引き継ぎ地点とシステムを越えて流れるデータの特定方法、ブランチ別ケース一式（ハッピーパス＋4つの障害ブランチ）の設計プロセス、そして『各ステップが成功を報告する』ことが『フローが正しい』ことを意味しない理由を示す2つの実例——誰も処理しない滞留案件、そして経理に渡る際に静かにずれるデータ。冪等性とサーキットブレーカーを通じてシステム間タイムアウトを検証する方法、フローが実際のお金にどれだけ触れるかによってテストスイートに優先順位を付ける方法も学びました。これは、通常のモジュール単位のテストが決して届かないバグ種別を捉えられるようになる上級スキルです。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu sâu hơn về kiểm thử tích hợp giữa hai hệ thống liền kề để nắm chắc hợp đồng dữ liệu (data contract) trước khi ghép thành luồng E2E, cùng cách thiết kế báo cáo đối soát tự động để phát hiện lệch dữ liệu ngay khi phát sinh thay vì chờ tới cuối kỳ. Nếu muốn học bài bản từ nền tảng tới các kỹ thuật nâng cao như thế này cùng người hướng dẫn và dự án thực tế bảo hiểm/tài chính, một khoá học Tester chuyên nghiệp sẽ giúp bạn tự tin đảm nhận các luồng nghiệp vụ đa hệ thống có độ nhạy cảm cao về dữ liệu và tiền bạc.",
        "Next, you should dig deeper into integration testing between two adjacent systems to nail down the data contract before stitching them into an E2E flow, along with designing automated reconciliation reports that catch data drift as soon as it happens instead of waiting until period-end. If you want to learn properly from the fundamentals to advanced techniques like this, with a mentor and real insurance/finance projects, a professional Tester course will help you confidently take on multi-system business flows with high sensitivity around data and money.",
        "次は、E2Eフローに組み合わせる前に隣接する2つのシステム間の統合テストを深く理解しデータ契約をしっかり固めること、そして期末を待たずにデータのずれが発生した時点で捉える自動照合レポートの設計方法を学ぶとよいでしょう。指導者と実際の保険/金融案件とともに、基礎からこのような上級技法まで体系的に学びたいなら、プロフェッショナルテスターコースが、データとお金に対する機微度の高いマルチシステム業務フローを自信を持って担当できるよう助けてくれます。"),
      CTA(course),
    ] },
];

const MA_E2E_DOC_01 = makeDoc({
  slug: "kiem-thu-luong-nghiep-vu-dau-cuoi-e2e-cho-tester",
  domain: "insurance",
  primaryKeyword: "kiểm thử luồng nghiệp vụ đầu-cuối",
  keywords: ["kiểm thử luồng nghiệp vụ đầu-cuối", "end-to-end business flow testing", "điểm bàn giao", "handoff", "kiểm thử E2E", "đối soát dữ liệu", "timeout liên hệ thống", "bảo hiểm"],
  coverLabel: "NÂNG CAO · E2E BUSINESS FLOW · BẢO HIỂM",
  crumb: "Kiểm thử luồng nghiệp vụ đầu-cuối (End-to-End Business Flow Testing)",
  metaTitle: {
    vi: "Kiểm thử luồng nghiệp vụ đầu-cuối cho Tester",
    en: "End-to-end business flow testing for testers",
    ja: "テスターのためのエンドツーエンド業務フローテスト",
  },
  metaDescription: {
    vi: "Kiểm thử luồng nghiệp vụ đầu-cuối (E2E) cho Tester bảo hiểm: điểm bàn giao, dữ liệu chảy, hồ sơ treo, timeout liên hệ thống, đối soát cuối luồng qua ClaimFlow.",
    en: "End-to-end business flow testing for insurance testers: handoff points, data flow, stuck claims, cross-system timeouts, end-of-flow reconciliation through ClaimFlow, with visuals and a quiz.",
    ja: "保険テスター向けエンドツーエンド業務フローテスト：ClaimFlowで引き継ぎ地点、データフロー、滞留案件、システム間タイムアウト、フロー終了時の照合を解説、図とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử luồng nghiệp vụ đầu-cuối (End-to-End Business Flow Testing) cho hệ bồi thường bảo hiểm xe",
    en: "End-to-end business flow testing for an auto insurance claims system",
    ja: "自動車保険金請求システムのためのエンドツーエンド業務フローテスト",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử luồng nghiệp vụ đầu-cuối (E2E business flow testing) qua ClaimFlow — hệ bồi thường bảo hiểm xe với luồng 5 bước Tiếp nhận, Giám định, Duyệt, Chi trả, Kế toán. Điểm bàn giao & dữ liệu chảy, quy trình thiết kế ca theo nhánh, 2 tình huống thật (hồ sơ treo không ai xử lý, dữ liệu lệch khi sang kế toán), timeout liên hệ thống, đối soát cuối luồng, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: end-to-end business flow testing through ClaimFlow — an auto insurance claims system with a 5-step flow: Intake, Assessment, Approval, Payment, Accounting. Handoff points & data flow, a process for branch-based case design, 2 real situations (an unowned stuck claim, data drift on its way to accounting), cross-system timeouts, end-of-flow reconciliation, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：自動車保険金請求システムClaimFlow——受付・査定・承認・支払・経理という5ステップのフローを持つ——を通じたエンドツーエンド業務フローテスト。引き継ぎ地点とデータフロー、ブランチ別ケース設計プロセス、実例2件（誰も処理しない滞留案件、経理へのデータのずれ）、システム間タイムアウト、フロー終了時の照合、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thiết kế và viết ca kiểm thử luồng nghiệp vụ đầu-cuối", steps: [
    { name: "Vẽ sơ đồ luồng thật & đánh dấu từng điểm bàn giao", text: "Xác định dữ liệu gửi đi, dữ liệu nhận về và SLA cho mỗi điểm bàn giao." },
    { name: "Thiết kế bộ ca theo nhánh: happy path + các nhánh lỗi", text: "Từ chối giữa luồng, timeout liên hệ thống, hồ sơ treo, lệch dữ liệu." },
    { name: "Luôn đối chiếu dữ liệu ở module cuối luồng trước khi kết luận PASS", text: "Mỗi bước báo thành công không đồng nghĩa toàn luồng đúng." },
  ] },
  pages,
});

export const MA_E2E_01 = [MA_E2E_DOC_01];
