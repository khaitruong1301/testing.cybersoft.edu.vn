// doc_ma_sbtm.mjs — BÀI MANUAL "NÂNG CAO":
// Quản lý kiểm thử thăm dò theo phiên (Session-Based Test Management — SBTM) — tổ chức
// exploratory testing thành các phiên có charter, time-box, ghi note/bug/issue theo mốc thời gian,
// tính tỉ lệ TBS (Test/Bug/Setup), debrief cuối phiên, đo phủ theo khu vực chức năng.
// Dự án: LogiFlow — hệ điều phối đơn hàng & theo dõi giao hàng (logistics).
// Song ngữ vi/en/ja (ja≠en), 12 chương, nhiều MOCKUP giao diện (ui_mock), trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, charter } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến.",
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
    tags: tags("congnghe", "logistics", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình điều phối đơn LogiFlow (sạch, chưa xảy ra sự cố) ──
const m_app = browser("logiflow.vn/dispatch/DH-88231", [
  panel("LogiFlow · Điều phối đơn DH-88231", [
    field(24, 20, 330, "Khách hàng", "Nguyễn Thị Hoa", "normal"),
    field(372, 20, 330, "Tài xế được gán", "Trần Văn Long", "normal"),
    field(24, 92, 330, "Số kiện hàng", "3 kiện", "normal"),
    field(372, 92, 330, "Số tiền thu hộ (COD)", "1.250.000đ", "normal"),
    btn(24, 168, 220, "Xác nhận giao đủ", "success"),
    btn(260, 168, 220, "Giao một phần", "ghost"),
  ].join(""), { h: 260, accent: "#b45309" }),
].join(""), { h: 316, title: "LogiFlow · Điều phối giao vận", accent: "#b45309" });

// ── Mockup 2: mẫu session charter dạng bảng (grid) ──
const m_charter_grid = grid("Mẫu Session Charter — SBTM cho LogiFlow", ["Trường charter", "Nội dung"], [
  ["Mã charter", "COD-01"],
  ["Mission (khám phá gì)", "Kiểm tra tính đúng số tiền thu hộ khi tài xế giao một phần đơn nhiều kiện"],
  ["Khu vực chức năng", "Đối soát COD (Cash-on-Delivery)"],
  ["Time-box", "90 phút"],
  ["Rủi ro nếu bỏ qua", "Sai lệch tiền COD gây thất thoát hoặc khiếu nại khách hàng"],
  ["Dữ liệu cần chuẩn bị", "Đơn 3–5 kiện, tài khoản tài xế test, môi trường staging"],
], { accent: "#b45309", note: "Charter trả lời 3 câu: khám phá GÌ, ở ĐÂU (khu vực), trong bao lâu — không liệt kê ca kiểm thử cố định." });

// ── Mockup 3: thẻ charter trực quan (bổ sung, cùng nội dung với bảng trên) ──
const m_charter_card = charter({
  title: "COD-01 · Đối soát khi giao một phần",
  target: "Số tiền thu hộ có tính đúng khi tài xế chỉ giao được một phần đơn hàng nhiều kiện",
  area: "Đối soát COD (Cash-on-Delivery)",
  duration: "90 phút",
  ideas: [
    "Giao 1/3 kiện, còn lại hoàn trả — COD có trừ đúng phần chưa giao?",
    "Tài xế nhập sai số kiện đã giao thành công",
    "Khách từ chối nhận, đổi sang chuyển khoản giữa chừng",
    "Mất kết nối app tài xế khi đang xác nhận giao một phần",
    "Đơn có nhiều mã giảm giá áp trước khi giao một phần",
  ],
  accent: "#b45309",
});

// ── Mockup 4: bảng ghi note/bug/issue theo phiên (nhật ký phiên, grid) ──
const m_notes_grid = grid("Nhật ký phiên COD-01 (90 phút) — ghi theo mốc thời gian", ["Thời điểm", "Loại", "Nội dung"], [
  ["00:05", "Note", "Bắt đầu với đơn 3 kiện, giá trị COD 1.250.000đ"],
  ["00:22", "Bug", "Giao 2/3 kiện: app vẫn thu đủ 1.250.000đ, không trừ phần hoàn trả"],
  ["00:41", "Issue", "Không có màn hình chỉnh sửa số kiện đã giao sau khi xác nhận"],
  ["00:58", "Note", "Thử lại với đơn 5 kiện, giao 4 kiện — lần này tính đúng COD theo tỉ lệ"],
  ["01:15", "Bug", "Mất mạng giữa lúc xác nhận giao một phần — đơn treo mãi ở trạng thái 'Đang giao'"],
  ["01:28", "Setup", "Phải cấu hình lại tài khoản tài xế test vì bị khoá do đăng nhập nhiều thiết bị"],
], { accent: "#b45309", highlight: 1, note: "4 loại ghi chú chuẩn SBTM: Note (quan sát), Bug (lỗi), Issue (vấn đề quy trình/thiếu hụt), Question (câu hỏi cần làm rõ)." });

// ── Mockup 5: màn hình LogiFlow bị lỗi + annotate khoanh vùng bug ──
const m_screen_bug = browser("logiflow.vn/dispatch/DH-88231/partial", [
  panel("LogiFlow · Xác nhận giao một phần", [
    field(24, 20, 330, "Số kiện đã giao", "2/3 kiện", "normal"),
    field(372, 20, 330, "Số tiền thu hộ hiển thị", "1.250.000đ", "error"),
    field(24, 92, 330, "Kiện hoàn trả", "1 kiện", "normal"),
    field(372, 92, 330, "Trạng thái mạng", "Mất kết nối 8 giây", "error"),
    btn(24, 168, 200, "Xác nhận", "primary"),
    annotate(368, 12, 330, 62, "BUG: COD không trừ phần hoàn trả"),
    annotate(368, 84, 330, 40, "BUG: mất mạng giữa chừng, đơn treo trạng thái"),
  ].join(""), { h: 260, accent: "#b45309" }),
].join(""), { h: 316, title: "LogiFlow · Sự cố giao một phần", accent: "#b45309" });

// ── Mockup 6: ticket Jira của lỗi tìm được trong phiên COD-01 ──
const m_jira = jira({
  key: "LF-7719", title: "Giao một phần (2/3 kiện): hệ thống vẫn thu đủ 100% tiền COD, không trừ phần hoàn trả",
  type: "Bug", status: "New", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "staging · LogiFlow · app tài xế Android 14"],
    ["Charter", "COD-01 · Đối soát khi giao một phần"],
    ["Các bước", "1) Mở đơn DH-88231 (3 kiện, COD 1.250.000đ) 2) Xác nhận giao 2/3 kiện 3) Xem số tiền thu hộ hiển thị"],
    ["Kết quả mong đợi", "COD thu = COD gốc × (số kiện đã giao / tổng số kiện)"],
    ["Kết quả thực tế", "Hệ thống vẫn hiển thị và thu đủ 1.250.000đ dù chỉ giao 2/3 kiện"],
    ["Ảnh hưởng", "Thu thừa tiền khách hàng, sai lệch đối soát COD toàn tuyến"],
  ],
});

// ── Mockup 7: kanban theo dõi bug/issue tìm được qua nhiều phiên trong sprint ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm được qua các phiên SBTM (LogiFlow · Sprint 9)", [
  { name: "New", cards: [
    { key: "LF-7719", title: "Giao một phần: COD không trừ phần hoàn trả", sev: "Critical" },
    { key: "LF-7723", title: "Mất mạng giữa chừng, đơn treo 'Đang giao'", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "LF-7701", title: "Tài xế nhập sai số kiện vẫn được lưu", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "LF-7688", title: "Thông báo khách hàng gửi trễ >5 phút", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "LF-7654", title: "Điều phối gán 2 tài xế cho cùng 1 đơn", sev: "Low" },
  ] },
]);

// ── Mockup 8: dashboard tỉ lệ TBS của phiên COD-01 ──
const m_dashboard_tbs = dashboard("Tỉ lệ TBS phiên COD-01 (90 phút) — LogiFlow", [
  { label: "Test", value: "58%", sub: "~52 phút thao tác kiểm thử", color: "#16a34a" },
  { label: "Bug", value: "27%", sub: "~24 phút điều tra & ghi lỗi", color: "#e11d48" },
  { label: "Setup", value: "15%", sub: "~14 phút chuẩn bị dữ liệu/tài khoản", color: "#f59e0b" },
  { label: "Độ phủ khu vực COD", value: "~35%", sub: "trong tổng 6 khu vực chức năng", color: "#2563eb" },
]);

// ── Mockup 9: đo độ phủ kiểm thử thăm dò theo khu vực chức năng ──
const m_coverage_grid = grid("Độ phủ kiểm thử thăm dò theo khu vực chức năng (LogiFlow · Sprint 9)",
  ["Khu vực chức năng", "Mức rủi ro", "Số phiên đã chạy", "Độ phủ ước tính", "Ưu tiên tiếp theo"], [
    ["Đối soát COD", "Cao", "2", "~35%", "COD-02: huỷ đơn sau khi đã thu tiền"],
    ["Điều phối tài xế", "Cao", "3", "~50%", "Gán lại tài xế khi huỷ giữa chừng"],
    ["Theo dõi thời gian thực", "T.bình", "1", "~15%", "Mất GPS khi tài xế vào hầm/toà nhà cao tầng"],
    ["Nhận đơn (Order Intake)", "T.bình", "2", "~40%", "Đơn có nhiều mã giảm giá + phí ship động"],
    ["Thông báo khách hàng", "Thấp", "1", "~20%", "Thông báo trùng lặp khi đổi tài xế"],
    ["Bằng chứng giao hàng (POD)", "Cao", "0", "0%", "Chưa có phiên nào — ưu tiên charter kế tiếp"],
  ], { accent: "#b45309", highlight: 5, note: "Độ phủ SBTM đo bằng số phiên/thời gian đầu tư so với rủi ro của khu vực, không đếm ca kiểm thử cố định." });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Session-Based Test Management (SBTM) là gì và khác gì kiểm thử thăm dò (exploratory testing) thông thường?",
  "What is Session-Based Test Management (SBTM) and how does it differ from regular exploratory testing?",
  "SBTM là một khung quản lý cho kiểm thử thăm dò: thay vì khám phá tự do không giới hạn, mỗi lần khám phá được đóng gói thành một PHIÊN (session) có charter nêu rõ mục tiêu và phạm vi, giới hạn thời gian cụ thể (thường 60–120 phút), và kết thúc bằng một bản debrief báo cáo những gì tìm được. Nhờ vậy, kiểm thử thăm dò vẫn giữ được sự linh hoạt nhưng có thể lập kế hoạch, đo lường và báo cáo tiến độ như các hoạt động kiểm thử khác.",
  "SBTM is a management framework for exploratory testing: instead of unlimited free-form exploration, each exploration round is packaged into a SESSION with a charter stating its goal and scope, a specific time-box (usually 60–120 minutes), and ends with a debrief reporting what was found. This keeps exploratory testing flexible while making it plannable, measurable, and reportable like other testing activities.",
  "セッションベーステストマネジメント（SBTM）とは何で、通常の探索的テストとどう違うのですか？",
  "SBTMは探索的テストのための管理フレームワークです。制限のない自由な探索の代わりに、各探索ラウンドを、目標と範囲を明記したチャーターと、具体的な時間制限（通常60〜120分）を持つ「セッション」としてパッケージ化し、終わりには見つけたことを報告するデブリーフで締めくくります。これにより探索的テストは柔軟性を保ちながら、他のテスト活動と同様に計画・測定・報告が可能になります。");
const faq2 = FAQ(
  "Tỉ lệ TBS (Test/Bug/Setup) dùng để làm gì và tỉ lệ bao nhiêu được coi là hợp lý?",
  "What is the TBS (Test/Bug/Setup) ratio used for, and what ratio is considered healthy?",
  "TBS chia thời gian một phiên thành 3 phần: Test (thao tác kiểm thử thực sự), Bug (điều tra và ghi lỗi khi gặp), Setup (chuẩn bị dữ liệu, môi trường, tài khoản...). Không có con số chuẩn tuyệt đối cho mọi đội, nhưng một phiên có tỉ lệ Test dưới 50% hoặc Setup trên 30% thường là dấu hiệu cảnh báo: hoặc môi trường/dữ liệu test chưa ổn định, hoặc charter chưa đủ rõ khiến tester loay hoay thay vì khám phá. TBS quan trọng không phải để chấm điểm cá nhân, mà để đội cải thiện quy trình và hạ tầng test.",
  "TBS splits a session's time into 3 parts: Test (actual testing activity), Bug (investigating and logging defects when found), and Setup (preparing data, environment, accounts...). There's no single universal healthy number, but a session with Test under 50% or Setup over 30% is usually a warning sign: either the test environment/data isn't stable, or the charter isn't clear enough and the tester is fumbling instead of exploring. TBS isn't meant to grade individuals — it's meant to help the team improve process and test infrastructure.",
  "TBS比率（テスト/バグ/セットアップ）は何のために使い、どの比率が健全とされますか？",
  "TBSはセッションの時間を3つに分けます：テスト（実際のテスト作業）、バグ（不具合の調査と記録）、セットアップ（データ・環境・アカウントなどの準備）。全チームに共通の絶対的な基準値はありませんが、テスト比率が50%未満、またはセットアップ比率が30%を超えるセッションは通常警告サインです——テスト環境やデータが不安定か、チャーターが不明確でテスターが探索できずに迷走している可能性があります。TBSは個人を評価するためではなく、チームがプロセスとテスト基盤を改善するためのものです。");
const faq3 = FAQ(
  "Kiểm thử thăm dò vốn không có ca kiểm thử cố định, vậy làm sao đo được 'độ phủ' theo khu vực chức năng?",
  "Exploratory testing has no fixed test cases by nature, so how can you measure 'coverage' by functional area?",
  "Độ phủ trong SBTM không đo theo số ca kiểm thử đã chạy, mà đo theo SỐ PHIÊN và THỜI GIAN đã đầu tư cho từng khu vực chức năng so với mức độ rủi ro của khu vực đó. Cách làm phổ biến là lập một bảng liệt kê tất cả khu vực chức năng (điều phối, theo dõi, đối soát COD, thông báo...), gắn mức rủi ro, rồi theo dõi số phiên/giờ đã chạy trên mỗi khu vực qua từng sprint. Khu vực rủi ro cao nhưng chưa có phiên nào là tín hiệu rõ ràng cần ưu tiên charter tiếp theo — đó là 'độ phủ' theo nghĩa quản lý rủi ro, không phải đếm ca kiểm thử.",
  "Coverage in SBTM isn't measured by the number of test cases run, but by the NUMBER OF SESSIONS and TIME invested in each functional area relative to that area's risk level. A common approach is to build a table listing every functional area (dispatch, tracking, COD reconciliation, notifications...), tag each with a risk level, then track sessions/hours run per area across sprints. A high-risk area with zero sessions is a clear signal to prioritize the next charter — that's 'coverage' in the sense of risk management, not test-case counting.",
  "探索的テストには本来固定のテストケースがないのに、機能領域ごとの『カバレッジ』はどう測定するのですか？",
  "SBTMにおけるカバレッジは実行したテストケース数ではなく、各機能領域のリスクレベルに対して投入した『セッション数』と『時間』で測定します。一般的な方法は、全ての機能領域（配車、追跡、COD照合、通知など）を列挙した表を作り、それぞれにリスクレベルを付け、スプリントごとに各領域で実行したセッション数・時間を追跡することです。リスクが高いのにセッションがゼロの領域は、次のチャーターを優先すべき明確なシグナルです——これはテストケースを数えるのではなく、リスク管理としての『カバレッジ』です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Session-Based Test Management (SBTM) tổ chức kiểm thử thăm dò như thế nào?", en: "How does Session-Based Test Management (SBTM) organize exploratory testing?", ja: "セッションベーステストマネジメント（SBTM）は探索的テストをどう整理する？" },
    options: [
      { vi: "Chia thành các phiên có charter, giới hạn thời gian và debrief sau mỗi phiên", en: "Split into charter-driven, time-boxed sessions with a debrief after each one", ja: "チャーターを持ち時間制限付きのセッションに分け、各セッション後にデブリーフを行う" },
      { vi: "Viết trước hàng trăm ca kiểm thử chi tiết rồi chạy tuần tự", en: "Pre-write hundreds of detailed test cases then run them sequentially", ja: "事前に何百もの詳細なテストケースを書き、順に実行する" },
      { vi: "Chỉ kiểm thử khi có lỗi được khách hàng báo về", en: "Only test when a customer reports a bug", ja: "顧客からバグ報告があった時だけテストする" },
      { vi: "Bỏ qua ghi chép, chỉ cần nhớ trong đầu", en: "Skip logging entirely, just remember it mentally", ja: "記録を省き、頭の中で覚えておくだけにする" },
    ], correct: 0,
    explain: { vi: "SBTM đóng gói khám phá tự do thành phiên có charter, time-box, và debrief để có thể quản lý và báo cáo.", en: "SBTM packages free exploration into charter-driven, time-boxed sessions with a debrief so it can be managed and reported.", ja: "SBTMは自由な探索をチャーター・タイムボックス・デブリーフ付きのセッションにまとめ、管理・報告を可能にします。" },
  }),
  mcq({
    q: { vi: "Một charter phiên SBTM tốt cần nêu rõ điều gì?", en: "What should a good SBTM session charter clearly state?", ja: "良いSBTMセッションチャーターは何を明記すべき？" },
    options: [
      { vi: "Chỉ cần tên người thực hiện phiên", en: "Only the name of the person running the session", ja: "セッション実施者の名前だけ" },
      { vi: "Mục tiêu khám phá (mission), khu vực/phạm vi, và giới hạn thời gian (time-box)", en: "The exploration goal (mission), scope/area, and time-box", ja: "探索の目標（ミッション）、範囲/領域、そして時間制限（タイムボックス）" },
      { vi: "Danh sách toàn bộ ca kiểm thử sẽ chạy từng bước", en: "A full step-by-step list of every test case to run", ja: "実行する全テストケースのステップごとの一覧" },
      { vi: "Số lượng bug dự kiến sẽ tìm được", en: "The expected number of bugs to be found", ja: "見つかると予想されるバグ数" },
    ], correct: 1,
    explain: { vi: "Charter là kim chỉ nam của phiên: mission + khu vực + time-box giúp tester khám phá có định hướng mà vẫn linh hoạt.", en: "The charter guides the session: mission + area + time-box lets the tester explore with direction while staying flexible.", ja: "チャーターはセッションの指針：ミッション＋領域＋タイムボックスにより、柔軟性を保ちつつ方向性を持って探索できます。" },
  }),
  mcq({
    q: { vi: "Trong tỉ lệ TBS, phần 'Setup' quá cao (ví dụ trên 30%) thường cho thấy điều gì?", en: "In the TBS ratio, an unusually high 'Setup' portion (e.g. over 30%) usually indicates what?", ja: "TBS比率で『セットアップ』が異常に高い（例：30%超）場合、通常何を示す？" },
    options: [
      { vi: "Tester đang làm việc rất hiệu quả", en: "The tester is working very efficiently", ja: "テスターが非常に効率よく作業している" },
      { vi: "Môi trường/dữ liệu test chưa ổn định, hoặc charter chưa đủ rõ", en: "The test environment/data isn't stable, or the charter isn't clear enough", ja: "テスト環境/データが不安定か、チャーターが不明確" },
      { vi: "Đã tìm được rất nhiều lỗi nghiêm trọng", en: "Many serious bugs were found", ja: "多くの重大バグが見つかった" },
      { vi: "Không cần quan tâm, tỉ lệ Setup không ảnh hưởng gì", en: "It doesn't matter, the Setup ratio has no effect", ja: "気にする必要はなく、セットアップ比率は何にも影響しない" },
    ], correct: 1,
    explain: { vi: "Setup cao lấy mất thời gian khám phá thật sự, thường do môi trường/dữ liệu chưa sẵn sàng hoặc charter mơ hồ.", en: "High Setup eats into real exploration time, usually due to an unready environment/data or a vague charter.", ja: "セットアップが高いと本来の探索時間が削られます。多くは環境/データ未整備やチャーターの曖昧さが原因です。" },
  }),
  mcq({
    q: { vi: "Một bản debrief sau phiên SBTM nên bao gồm nội dung nào?", en: "What should a debrief after an SBTM session include?", ja: "SBTMセッション後のデブリーフには何を含めるべき？" },
    options: [
      { vi: "Chỉ cần nói 'đã test xong'", en: "Just saying 'testing is done'", ja: "『テストが終わった』とだけ言う" },
      { vi: "Tóm tắt những gì đã khám phá, tỉ lệ TBS, bug/issue tìm được, và đề xuất charter tiếp theo", en: "A summary of what was explored, the TBS ratio, bugs/issues found, and a proposed next charter", ja: "探索した内容の要約、TBS比率、見つかったバグ/イシュー、次のチャーターの提案" },
      { vi: "Danh sách email của cả nhóm dự án", en: "A list of the whole project team's emails", ja: "プロジェクトチーム全員のメールアドレス一覧" },
      { vi: "Chỉ ghi lại thời điểm bắt đầu phiên", en: "Only the session's start time", ja: "セッション開始時刻だけ" },
    ], correct: 1,
    explain: { vi: "Debrief là báo cáo súc tích giúp cả nhóm biết đã khám phá gì, tỉ lệ TBS, vấn đề gặp phải, và hướng đi tiếp theo.", en: "The debrief is a concise report letting the team know what was explored, the TBS ratio, issues encountered, and the next direction.", ja: "デブリーフは、探索内容・TBS比率・発生した問題・次の方向性をチームに伝える簡潔な報告です。" },
  }),
  mcq({
    q: { vi: "Vì sao đo độ phủ theo khu vực chức năng lại quan trọng trong dự án logistics nhiều luồng như LogiFlow?", en: "Why does measuring coverage by functional area matter in a multi-flow logistics project like LogiFlow?", ja: "LogiFlowのような多くのフローを持つ物流プロジェクトで、機能領域別のカバレッジ測定が重要な理由は？" },
    options: [
      { vi: "Vì mọi khu vực đều có rủi ro như nhau nên không cần theo dõi", en: "Because every area carries equal risk so no tracking is needed", ja: "全領域のリスクが同じなので追跡は不要だから" },
      { vi: "Vì giúp nhóm biết khu vực rủi ro cao nào chưa được khám phá đủ, để ưu tiên charter tiếp theo", en: "Because it shows which high-risk areas haven't been explored enough, to prioritize the next charter", ja: "どの高リスク領域がまだ十分に探索されていないかを把握し、次のチャーターを優先付けするため" },
      { vi: "Vì chỉ cần đo phủ đúng một lần duy nhất khi bắt đầu dự án", en: "Because coverage only needs measuring once, at project start", ja: "プロジェクト開始時に一度だけ測定すればよいから" },
      { vi: "Vì độ phủ không liên quan gì tới chất lượng phần mềm", en: "Because coverage has nothing to do with software quality", ja: "カバレッジはソフトウェア品質と無関係だから" },
    ], correct: 1,
    explain: { vi: "Hệ thống nhiều luồng (điều phối, theo dõi, đối soát COD...) có mức rủi ro khác nhau; đo phủ theo khu vực giúp phân bổ phiên hợp lý theo rủi ro qua từng sprint.", en: "Multi-flow systems (dispatch, tracking, COD reconciliation...) carry different risk levels; measuring coverage by area helps allocate sessions sensibly by risk across sprints.", ja: "配車・追跡・COD照合など複数フローを持つシステムはリスクレベルが異なります。領域別カバレッジ測定により、スプリントごとにリスクに応じた適切なセッション配分が可能になります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ khám phá", en: "1. TL;DR & the screen you'll explore", ja: "1. 要点と探索する画面" },
    blocks: [
      TLDR("Session-Based Test Management (SBTM) là cách tổ chức kiểm thử thăm dò (exploratory testing) thành các phiên (session) có charter rõ ràng, giới hạn thời gian (time-box), và báo cáo debrief sau mỗi phiên. Bài này áp dụng SBTM cho LogiFlow — hệ điều phối đơn hàng & theo dõi giao hàng: viết charter theo khu vực chức năng (đối soát COD, điều phối tài xế, theo dõi thời gian thực...), ghi note/bug/issue theo mốc thời gian, tính tỉ lệ TBS (Test/Bug/Setup) và đo độ phủ theo khu vực chức năng thay vì đếm số ca kiểm thử cố định. Có 9 mockup thật, 2 tình huống thực tế và trắc nghiệm 5 câu.",
        "Session-Based Test Management (SBTM) organizes exploratory testing into time-boxed sessions with a clear charter and a debrief report after each session. This article applies SBTM to LogiFlow, an order dispatch & delivery tracking platform: writing charters per functional area (COD reconciliation, driver dispatch, real-time tracking...), logging notes/bugs/issues with timestamps, computing the TBS ratio (Test/Bug/Setup), and measuring coverage by functional area instead of counting fixed test cases. Includes 9 real mockups, 2 real situations and a 5-question quiz.",
        "セッションベーステストマネジメント（SBTM）は、探索的テストを明確なチャーター（憲章）とタイムボックス（時間制限）を持つセッションに整理し、各セッション後にデブリーフ（振り返り報告）を行う手法です。本記事は注文配車・配送追跡プラットフォーム「LogiFlow」にSBTMを適用します：機能領域ごと（COD代金回収照合、ドライバー配車、リアルタイム追跡など）のチャーター作成、タイムスタンプ付きのノート/バグ/イシューの記録、TBS比率（テスト/バグ/セットアップ）の算出、固定テストケース数の代わりに機能領域別のカバレッジ測定を扱います。実物のモック9点、実例2つ、5問クイズ付き。"),
      P("Bạn đã quen với kiểm thử thăm dò tự do — mở app lên và 'lượn' theo trực giác. Session-Based Test Management (SBTM) đưa cách làm đó vào khuôn khổ có thể quản lý được: mỗi lần khám phá là một PHIÊN (session) có charter, có giới hạn thời gian, và kết thúc bằng một buổi debrief ngắn để báo cáo những gì tìm được. Với một hệ thống nhiều luồng nghiệp vụ đan xen như nền tảng điều phối giao vận LogiFlow — nhận đơn, điều phối tài xế, theo dõi thời gian thực, đối soát thu hộ (COD), bằng chứng giao hàng — SBTM giúp nhóm test biết chính xác đã khám phá tới đâu, còn khu vực nào chưa chạm tới, mà không cần viết hàng trăm ca kiểm thử cố định trước.",
        "You're likely familiar with free-form exploratory testing — opening the app and wandering by intuition. Session-Based Test Management (SBTM) turns that into something manageable: every exploration round becomes a SESSION with a charter, a time limit, and ends with a short debrief reporting what was found. For a system with many interwoven business flows like LogiFlow, an order dispatch & delivery tracking platform — order intake, driver dispatch, real-time tracking, cash-on-delivery (COD) reconciliation, proof of delivery — SBTM lets the test team know exactly how far exploration has gone and which areas remain untouched, without pre-writing hundreds of fixed test cases.",
        "自由形式の探索的テスト——直感でアプリを開いて彷徨うようなやり方——にはもう慣れているかもしれません。セッションベーステストマネジメント（SBTM）は、それを管理可能な形に整えます：探索の1周がチャーター（憲章）と時間制限を持つ「セッション」となり、終わりには何を見つけたかを報告する短いデブリーフで締めくくります。注文配車・配送追跡プラットフォームLogiFlowのように、受注、ドライバー配車、リアルタイム追跡、代金引換（COD）照合、配達証明など多くの業務フローが絡み合うシステムでは、SBTMによってテストチームは探索がどこまで進み、どの領域が未着手かを正確に把握でき、事前に何百もの固定テストケースを書く必要がありません。"),
      IMG(m_app, "Màn hình bạn sẽ khám phá: điều phối đơn LogiFlow, gán tài xế và số tiền thu hộ (COD)", "The screen you'll explore: LogiFlow's order dispatch, driver assignment and COD amount", "探索する画面：LogiFlowの注文配車、ドライバー割当とCOD代金回収額"),
      DEF("Session-Based Test Management (SBTM)", "cách tổ chức kiểm thử thăm dò thành các phiên có charter, giới hạn thời gian (time-box) và báo cáo debrief sau mỗi phiên, thay vì đặc tả ca kiểm thử cố định trước.",
        "a way to organize exploratory testing into charter-driven, time-boxed sessions with a debrief report after each one, instead of pre-specifying fixed test cases.",
        "チャーター（憲章）を持ち時間制限（タイムボックス）付きのセッションに探索的テストを整理し、各セッション後にデブリーフ報告を行う手法。事前に固定のテストケースを規定しない。"),
    ] },
  { heading: { vi: "2. Kiểm thử thăm dò tự do vs SBTM có cấu trúc", en: "2. Free-form exploratory testing vs structured SBTM", ja: "2. 自由な探索的テスト vs 構造化されたSBTM" },
    blocks: [
      P("Kiểm thử thăm dò tự do có điểm mạnh là linh hoạt tối đa: tester đi theo trực giác, phát hiện lỗi mà kịch bản viết sẵn không lường trước. Nhưng nhược điểm cũng nằm ở chính sự tự do đó — khó biết đã khám phá bao lâu, khám phá khu vực nào, và tìm được gì, nên rất khó báo cáo tiến độ cho quản lý dự án hay lên kế hoạch cho sprint kế tiếp.",
        "Free-form exploratory testing's strength is maximum flexibility: the tester follows intuition, catching bugs no scripted case anticipated. But its weakness lies in that very freedom — it's hard to know how long was spent exploring, which area was covered, and what was found, making it hard to report progress to project management or plan the next sprint.",
        "自由形式の探索的テストの強みは最大限の柔軟性です：テスターは直感に従い、台本にないバグを捕らえます。しかし弱点もまさにその自由さにあります——どれだけの時間探索したか、どの領域をカバーしたか、何を見つけたかが分かりにくく、プロジェクト管理者への進捗報告や次スプリントの計画が困難になります。"),
      P("SBTM giữ lại toàn bộ sự linh hoạt đó nhưng đóng nó vào một khung tối thiểu: mỗi lần khám phá là một phiên có mục tiêu (charter), có giới hạn thời gian (time-box), và có một bản debrief ngắn cuối phiên. Khung này không hề làm mất đi tính 'thăm dò' — tester vẫn tự do rẽ hướng theo những gì mình quan sát được trong lúc test — nhưng tổng thể của nhiều phiên lại tạo thành một bức tranh có thể đo lường: bao nhiêu phiên đã chạy, tỉ lệ thời gian dành cho việc gì, khu vực nào còn trống.",
        "SBTM keeps all that flexibility but wraps it in a minimal frame: every exploration round is a session with a goal (charter), a time limit (time-box), and a short debrief at the end. This frame doesn't remove the 'exploratory' nature at all — the tester is still free to follow whatever they observe during testing — but the sum of many sessions forms a measurable picture: how many sessions ran, how time was split, which areas remain empty.",
        "SBTMはその柔軟性を全て保ちつつ、最小限の枠組みに収めます：探索の1周が目標（チャーター）と時間制限（タイムボックス）を持つセッションとなり、終わりに短いデブリーフを行います。この枠組みは『探索性』を失わせません——テスターはテスト中に観察したことに従って自由に方向転換できます——しかし多くのセッションの総和は、実行セッション数・時間配分・未着手領域といった測定可能な全体像を形成します。"),
      IMG(m_charter_grid, "Mẫu Session Charter dạng bảng — mission, khu vực chức năng, time-box và rủi ro nếu bỏ qua", "A tabular Session Charter template — mission, functional area, time-box, and the risk of skipping it", "表形式のセッションチャーターの例 — ミッション、機能領域、タイムボックス、省略時のリスク"),
      DEF("Charter", "một bản tuyên bố ngắn nêu rõ khám phá GÌ (mission), ở khu vực chức năng NÀO, trong bao lâu (time-box) — không phải danh sách ca kiểm thử cố định.",
        "a short statement declaring WHAT to explore (mission), WHICH functional area, and for how long (time-box) — not a list of fixed test cases.",
        "何を探索するか（ミッション）、どの機能領域か、どれだけの時間（タイムボックス）かを明記した短い宣言文。固定テストケースの一覧ではない。"),
    ] },
  { heading: { vi: "3. Vì sao đội test hệ logistics nhiều luồng cần thạo SBTM", en: "3. Why a logistics test team needs to master SBTM", ja: "3. 多くのフローを持つ物流システムのテストチームがSBTMを習得すべき理由" },
    blocks: [
      P("Một nền tảng điều phối giao vận như LogiFlow không chỉ là một app — nó là tập hợp nhiều luồng nghiệp vụ đan xen chặt chẽ: nhận đơn kéo theo điều phối tài xế, điều phối tài xế kéo theo theo dõi thời gian thực, và mọi thứ cuối cùng đổ về đối soát tiền thu hộ (COD). Viết ca kiểm thử cố định cho từng tổ hợp trạng thái của các luồng này gần như bất khả thi — số tổ hợp tăng theo cấp số nhân, còn thời gian sprint thì cố định.",
        "A dispatch platform like LogiFlow isn't just an app — it's a set of tightly interwoven business flows: order intake triggers driver dispatch, driver dispatch triggers real-time tracking, and everything eventually flows into cash-on-delivery (COD) reconciliation. Writing fixed test cases for every state combination of these flows is nearly impossible — the number of combinations grows exponentially while sprint time stays fixed.",
        "LogiFlowのような配車プラットフォームは単なるアプリではなく、密接に絡み合う複数の業務フローの集合体です：受注はドライバー配車を引き起こし、配車はリアルタイム追跡を引き起こし、最終的に全てが代金引換（COD）照合に流れ込みます。これらのフローのあらゆる状態の組み合わせに対して固定テストケースを書くことはほぼ不可能です——組み合わせ数は指数的に増える一方、スプリント時間は一定です。"),
      P("SBTM giải quyết đúng bài toán này: thay vì cố gắng liệt kê hết mọi tổ hợp, tester dồn năng lượng khám phá vào khu vực chức năng có rủi ro cao nhất trong một khoảng thời gian định trước, rồi ghi lại thật kỹ những gì quan sát được. Qua nhiều phiên, đội test tích luỹ một bản đồ hiểu biết về hệ thống — biết luồng nào đã 'sờ' tới, luồng nào chưa — điều mà một bộ ca kiểm thử cố định viết một lần rồi để nguyên khó lòng theo kịp khi nghiệp vụ logistics thay đổi liên tục (thêm loại phí ship mới, thêm hình thức thanh toán, thêm khu vực giao hàng).",
        "SBTM solves exactly this problem: instead of trying to enumerate every combination, the tester focuses exploration energy on the highest-risk functional area within a predefined timeframe, then logs observations thoroughly. Across many sessions, the test team accumulates a map of system understanding — knowing which flows have been 'touched' and which haven't — something a fixed test-case set written once and left unchanged struggles to keep up with as logistics business rules keep changing (new shipping fee types, new payment methods, new delivery zones).",
        "SBTMはまさにこの問題を解決します：全ての組み合わせを列挙しようとする代わりに、テスターは決められた時間内で最もリスクの高い機能領域に探索エネルギーを集中し、観察したことを丁寧に記録します。多くのセッションを重ねることで、テストチームはシステム理解のマップ——どのフローに『触れた』か、どこがまだかを蓄積していきます。これは、一度書いたら変えない固定テストケース群では、絶えず変化する物流業務ルール（新しい配送料タイプ、新しい決済方法、新しい配送エリア）に追いつきにくいものです。"),
      P("Đội test còn hưởng lợi ở khía cạnh giao tiếp: một debrief SBTM ngắn gọn dễ trình bày với PM/lead hơn nhiều so với việc giải thích tại sao một bộ ca kiểm thử cố định vẫn chưa 'chạy xong' — vì bản chất SBTM không có khái niệm 'chạy xong', chỉ có 'đã khám phá tới đâu so với rủi ro'.",
        "The test team also benefits in communication: a concise SBTM debrief is far easier to present to a PM/lead than explaining why a fixed test-case set still isn't 'finished running' — because SBTM by nature has no concept of 'finished', only 'how much has been explored relative to risk'.",
        "テストチームはコミュニケーション面でも恩恵を受けます：簡潔なSBTMデブリーフは、固定テストケース群がなぜまだ『実行完了』していないかを説明するより、PM/リードへの提示がずっと容易です——SBTMには本質的に『完了』という概念がなく、あるのは『リスクに対してどこまで探索したか』だけだからです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: khu vực chức năng, công cụ ghi log & cách viết charter", en: "4. Prepare: functional areas, logging tools & writing a charter", ja: "4. 準備：機能領域、記録ツール、チャーターの書き方" },
    blocks: [
      P("Trước khi chạy phiên đầu tiên, đội test cần một bản đồ khu vực chức năng của LogiFlow: Nhận đơn (Order Intake), Điều phối tài xế (Dispatch), Theo dõi thời gian thực (Tracking), Đối soát COD, Bằng chứng giao hàng (POD), Thông báo khách hàng. Mỗi khu vực nên gắn một mức rủi ro sơ bộ (Cao/Trung bình/Thấp) dựa trên mức độ ảnh hưởng tới tiền và trải nghiệm khách hàng, để biết nên ưu tiên viết charter cho khu vực nào trước.",
        "Before running the first session, the test team needs a functional-area map of LogiFlow: Order Intake, Dispatch, Real-time Tracking, COD Reconciliation, Proof of Delivery (POD), Customer Notifications. Each area should get a preliminary risk level (High/Medium/Low) based on its impact on money and customer experience, to know which area's charter to prioritize first.",
        "最初のセッションを実行する前に、テストチームはLogiFlowの機能領域マップが必要です：受注（Order Intake）、配車（Dispatch）、リアルタイム追跡（Tracking）、COD照合、配達証明（POD）、顧客通知。各領域には、資金と顧客体験への影響度に基づく予備的なリスクレベル（高/中/低）を付け、どの領域のチャーターを優先すべきか把握します。"),
      STEP(1, "Liệt kê toàn bộ khu vực chức năng của hệ thống, không lọc trước; gắn mức rủi ro sơ bộ cho từng khu vực.", "List every functional area of the system without pre-filtering; assign a preliminary risk level to each.", "システムの全機能領域を事前に絞らず列挙し、それぞれに予備的なリスクレベルを付ける。"),
      STEP(2, "Chọn khu vực rủi ro cao nhất chưa có phiên nào chạy, viết charter theo công thức: Mission — Area — Time-box — Rủi ro nếu bỏ qua.", "Pick the highest-risk area with no session run yet, write a charter using the formula: Mission — Area — Time-box — Risk if skipped.", "まだセッションが実行されていない最もリスクの高い領域を選び、ミッション—領域—タイムボックス—省略時のリスクという公式でチャーターを書く。"),
      STEP(3, "Chuẩn bị công cụ ghi log: một bảng đơn giản với 4 cột Thời điểm/Loại (Note-Bug-Issue-Question)/Nội dung, cập nhật liên tục trong lúc test.", "Prepare a logging tool: a simple table with 4 columns Timestamp/Type (Note-Bug-Issue-Question)/Content, updated continuously during testing.", "記録ツールを準備する：時刻/種類（ノート・バグ・イシュー・クエスチョン）/内容の4列を持つシンプルな表を用意し、テスト中に随時更新する。"),
      TRY("Chọn 1 khu vực chức năng bất kỳ của LogiFlow (ví dụ 'Thông báo khách hàng') và tự viết thử charter cho nó theo công thức Mission — Area — Time-box.", "Pick any LogiFlow functional area (e.g. 'Customer Notifications') and draft a charter for it using the Mission — Area — Time-box formula.", "LogiFlowの任意の機能領域（例：『顧客通知』）を選び、ミッション—領域—タイムボックスの公式でチャーターを書いてみよう。"),
      PITFALL("Viết charter quá rộng, ví dụ 'khám phá toàn bộ app trong 90 phút' — không có phạm vi rõ, tester dễ lan man và không kịp khám phá sâu khu vực rủi ro cao nhất.", "Writing a charter that's too broad, e.g. 'explore the whole app in 90 minutes' — without a clear scope, the tester easily wanders and never dives deep into the highest-risk area.", "『90分でアプリ全体を探索する』のように範囲が広すぎるチャーターを書く——範囲が不明確だとテスターは彷徨いやすく、最もリスクの高い領域を深く探索しきれません。"),
      IMG(m_charter_card, "Thẻ charter trực quan cho phiên COD-01: mission, khu vực, time-box và các ý tưởng khám phá", "A visual charter card for session COD-01: mission, area, time-box and exploration ideas", "セッションCOD-01の視覚的チャーターカード：ミッション、領域、タイムボックス、探索アイデア"),
    ] },
  { heading: { vi: "5. Thực hành: chạy & ghi log một phiên COD-01 từng bước", en: "5. Hands-on: running & logging session COD-01 step by step", ja: "5. 実践：セッションCOD-01の実行と記録を一歩ずつ" },
    blocks: [
      P("Bây giờ ta chạy thật charter COD-01 đã viết ở chương 4: khám phá xem số tiền thu hộ (COD) có tính đúng khi tài xế chỉ giao được một phần đơn hàng nhiều kiện hay không. Làm theo thứ tự dưới đây để có một phiên đầy đủ, có log rõ ràng.",
        "Now let's actually run the COD-01 charter written in chapter 4: exploring whether the COD amount is calculated correctly when a driver only delivers part of a multi-parcel order. Follow the order below for a complete session with a clear log.",
        "では、第4章で書いたチャーターCOD-01を実際に実行しましょう：ドライバーが複数個口の注文の一部しか配達できなかった場合にCOD代金回収額が正しく計算されるかを探索します。以下の順に沿って、明確なログを持つ完全なセッションにしましょう。"),
      STEP(1, "Bắt đầu đếm giờ (time-box 90 phút), mở đơn 3 kiện với COD 1.250.000đ, ghi Note mốc bắt đầu.", "Start the timer (90-minute time-box), open a 3-parcel order with COD of 1,250,000đ, log a Note for the starting point.", "タイマーを開始（90分タイムボックス）、COD1,250,000ドンの3個口注文を開き、開始時点のNoteを記録する。"),
      STEP(2, "Khám phá theo ý tưởng trong charter: xác nhận giao 2/3 kiện, quan sát số tiền thu hộ hiển thị có trừ đúng phần chưa giao không.", "Explore following the charter's ideas: confirm delivery of 2/3 parcels, observe whether the displayed COD amount correctly deducts the undelivered part.", "チャーターのアイデアに従って探索：2/3個口の配達を確認し、表示されるCOD金額が未配達分を正しく差し引いているか観察する。"),
      STEP(3, "Ghi log ngay lập tức khi quan sát thấy điều bất thường — không chờ tới cuối phiên mới nhớ lại, dễ quên chi tiết quan trọng.", "Log immediately when something unusual is observed — don't wait until the end of the session to recall it, important details are easily forgotten.", "異常を観察したらすぐに記録する——セッションの最後まで待って思い出そうとすると、重要な詳細を忘れやすい。"),
      STEP(4, "Khi hết time-box, dừng lại đúng giờ dù đang khám phá dở, và chuyển ngay sang viết debrief trong khi trí nhớ còn tươi.", "When the time-box ends, stop exactly on time even mid-exploration, and move straight to writing the debrief while memory is still fresh.", "タイムボックスが終了したら、探索の途中でも時間通りに止め、記憶が新しいうちにすぐデブリーフの作成に移る。"),
      CODE("text", "NHAT KY PHIEN COD-01 (90 phut) - LogiFlow\n00:05 Note  Bat dau voi don 3 kien, gia tri COD 1.250.000d\n00:22 Bug   Giao 2/3 kien: app van thu du 1.250.000d, khong tru phan hoan tra\n00:41 Issue Khong co man hinh chinh sua so kien da giao sau khi xac nhan\n00:58 Note  Thu lai voi don 5 kien, giao 4 - lan nay tinh dung COD theo ti le\n01:15 Bug   Mat mang giua luc xac nhan giao mot phan - don treo mai 'Dang giao'\n01:28 Setup Cau hinh lai tai khoan tai xe test vi bi khoa do dang nhap nhieu thiet bi"),
      IMG(m_notes_grid, "Nhật ký phiên COD-01: ghi note/bug/issue theo mốc thời gian trong 90 phút", "Session COD-01's log: notes/bugs/issues recorded by timestamp across 90 minutes", "セッションCOD-01のログ：90分間タイムスタンプ付きで記録されたノート/バグ/イシュー"),
      TRY("Đọc lại nhật ký phiên COD-01 và thử phân loại thêm 1 dòng mới bạn nghĩ nên ghi thêm (gợi ý: hỏi lại BA về quy tắc làm tròn số tiền COD khi chia theo tỉ lệ kiện).", "Re-read the COD-01 log and try classifying one more line you think should be added (hint: ask BA about the COD rounding rule when splitting by parcel ratio).", "COD-01のログを読み返し、追加すべきと思う行をもう1つ分類してみよう（ヒント：個口比率で分割する際のCOD端数処理ルールをBAに確認する）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: phiên không có charter rõ ràng", en: "6. Situation 1: a session without a clear charter", ja: "6. シーン1：明確なチャーターのないセッション" },
    blocks: [
      SITUATION("Một tester mới được giao 'khám phá module điều phối trong 2 tiếng' mà không có charter cụ thể — chỉ một câu miệng ngắn gọn từ lead.", "A new tester is assigned to 'explore the dispatch module for 2 hours' with no concrete charter — just a brief verbal instruction from the lead.",
        "Sau 2 tiếng, tester báo cáo 'đã test xong module điều phối' nhưng không ai biết chính xác đã khám phá những gì, khu vực rủi ro cao nhất (gán lại tài xế khi huỷ đơn giữa chừng) hoàn toàn chưa được chạm tới.",
        "After 2 hours, the tester reports 'the dispatch module has been tested' but no one knows exactly what was explored, and the highest-risk area (reassigning drivers when an order is cancelled mid-way) was never touched at all.",
        "新人テスターが具体的なチャーターなしに『配車モジュールを2時間探索』するよう指示される——リードからの短い口頭指示のみ。",
        "2時間後、テスターは『配車モジュールのテストが終わった』と報告するが、実際に何を探索したのか誰も正確に把握できず、最もリスクの高い領域（注文が途中でキャンセルされた際のドライバー再割当）には全く触れられていなかった。"),
      SOLVE("Viết lại charter cụ thể cho khu vực điều phối theo công thức Mission — Area — Time-box (ví dụ: 'DISP-03 · Kiểm tra gán lại tài xế khi huỷ đơn giữa chừng · Điều phối tài xế · 60 phút'), và yêu cầu mọi phiên sau đều bắt đầu bằng một charter viết ra giấy/công cụ, không giao miệng.", "Rewrite a concrete charter for the dispatch area using the Mission — Area — Time-box formula (e.g. 'DISP-03 · Verify driver reassignment when an order is cancelled mid-way · Driver Dispatch · 60 minutes'), and require every future session to start from a written charter, not a verbal assignment.", "配車領域に対しミッション—領域—タイムボックスの公式で具体的なチャーターを書き直す（例：『DISP-03・注文が途中でキャンセルされた際のドライバー再割当の検証・ドライバー配車・60分』）、以降のすべてのセッションは口頭指示ではなく書面/ツール上のチャーターから始めることを義務付ける。"),
      P("Bài học lớn nhất ở đây: 'đã test xong' không có nghĩa gì nếu không kèm theo charter cụ thể để đối chiếu. Không có charter, hai tester khác nhau khám phá cùng một module trong cùng khoảng thời gian có thể chạm tới hai khu vực hoàn toàn khác nhau — và không ai biết khu vực nào còn bỏ trống cho tới khi một lỗi nghiêm trọng lọt ra production. Charter là công cụ đảm bảo tính CHỦ ĐÍCH của phiên, thứ khác biệt cốt lõi giữa SBTM và 'ngồi bấm lung tung 2 tiếng'.",
        "The biggest lesson here: 'testing is done' means nothing without a concrete charter to check against. Without a charter, two different testers exploring the same module for the same amount of time could touch two completely different areas — and no one knows which area is left empty until a serious bug escapes to production. The charter is what guarantees a session's INTENTIONALITY, the core difference between SBTM and 'clicking around for 2 hours'.",
        "ここでの最大の教訓：具体的なチャーターと照らし合わせられなければ、『テストが終わった』は何も意味しません。チャーターがなければ、同じモジュールを同じ時間探索する2人のテスターが全く異なる領域に触れる可能性があり、重大バグが本番環境に漏れるまで誰もどの領域が手つかずか分かりません。チャーターはセッションの『意図性』を保証するツールであり、SBTMと『2時間適当にクリックする』ことの本質的な違いです。"),
      RECAP(["Không có charter, 'đã test xong' là câu nói vô nghĩa vì không đối chiếu được", "Mọi phiên đều nên bắt đầu từ charter viết ra rõ ràng, không giao miệng"],
        ["Without a charter, 'testing is done' is meaningless because there's nothing to check against", "Every session should start from a clearly written charter, not a verbal assignment"],
        ["チャーターがなければ『テスト完了』は照合できず意味を持たない", "すべてのセッションは口頭指示ではなく明確に書かれたチャーターから始めるべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: tỉ lệ TBS lệch hé lộ lỗi COD nghiêm trọng", en: "7. Situation 2: a skewed TBS ratio reveals a serious COD bug", ja: "7. シーン2：偏ったTBS比率が重大なCODバグを明らかにする" },
    blocks: [
      SITUATION("Trong phiên COD-01, tỉ lệ Bug (điều tra & ghi lỗi) chiếm tới 27% thời gian — cao bất thường so với các phiên trước đó chỉ khoảng 10–15%.", "In session COD-01, the Bug ratio (investigating & logging defects) took up 27% of the time — unusually high compared to previous sessions' typical 10–15%.",
        "Khi rà lại nhật ký phiên, tester phát hiện ra vấn đề không nằm ở một chỗ mà lặp lại ở nhiều tình huống giao một phần: hệ thống LogiFlow luôn thu đủ 100% tiền COD bất kể tài xế giao bao nhiêu kiện, và còn treo trạng thái đơn khi mất mạng giữa chừng — hai lỗi Critical trong cùng một luồng nghiệp vụ.",
        "Reviewing the session log, the tester discovers the problem isn't isolated but repeats across several partial-delivery situations: LogiFlow always collects 100% of the COD amount regardless of how many parcels were delivered, and also gets an order stuck mid-status when connection drops — two Critical bugs in the same business flow.",
        "セッションCOD-01では、バグ（不具合の調査・記録）の割合が時間の27%を占めた——それ以前のセッションが通常10〜15%だったのに比べ異常に高い。",
        "セッションログを見返すと、問題は1箇所ではなく複数の部分配達シーンで繰り返し発生していることが判明：LogiFlowは配達個口数に関わらず常にCOD代金を100%回収し、さらに通信断時に注文ステータスが途中で固まってしまう——同じ業務フローに2つのCriticalバグが存在した。"),
      SOLVE("Không xem tỉ lệ TBS lệch là điều xấu cần che giấu — báo cáo ngay trong debrief kèm 2 ticket Critical (LF-7719, LF-7723), và đề xuất charter kế tiếp 'DISP-COD-02' tập trung riêng vào luồng mất kết nối trong lúc xác nhận giao hàng, vì đây rõ ràng là điểm rủi ro cao chưa được khám phá đủ.", "Don't treat a skewed TBS ratio as something bad to hide — report it right in the debrief along with 2 Critical tickets (LF-7719, LF-7723), and propose the next charter 'DISP-COD-02' focused specifically on the connection-loss flow during delivery confirmation, since it's clearly a high-risk point not yet explored enough.", "偏ったTBS比率を隠すべき悪いことと捉えない——デブリーフでそのままCriticalチケット2件（LF-7719、LF-7723）とともに報告し、配達確認中の通信断フローに特化した次のチャーター『DISP-COD-02』を提案する。これは明らかに十分探索されていない高リスクポイントである。"),
      P("Ví dụ này cho thấy TBS không chỉ là con số quản lý thời gian — nó còn là TÍN HIỆU CẢNH BÁO. Một tỉ lệ Bug tăng vọt bất thường thường có nghĩa tester vừa chạm vào một 'ổ lỗi' thật sự, nơi nhiều vấn đề tập trung trong cùng một luồng nghiệp vụ. Thay vì coi đó là phiên 'kém hiệu quả' vì Test giảm xuống, đội lead giàu kinh nghiệm sẽ đọc con số này như một chỉ dấu để mở thêm charter đào sâu đúng khu vực đó — chính là cách LogiFlow tránh được một lỗi thu tiền sai lan rộng ra production.",
        "This example shows TBS isn't just a time-management number — it's also a WARNING SIGNAL. An unusually spiking Bug ratio usually means the tester just hit a real 'bug nest', where multiple problems cluster in the same business flow. Instead of viewing it as an 'inefficient' session because Test dropped, an experienced lead reads this number as a cue to open more charters digging into that exact area — which is exactly how LogiFlow avoids a wrong-collection bug spreading to production.",
        "この例は、TBSが単なる時間管理の数値ではなく『警告シグナル』でもあることを示しています。バグ比率の異常な急上昇は、多くの場合テスターが本物の『バグの巣』——同じ業務フローに複数の問題が集中する箇所——に触れたことを意味します。テストが減ったから『非効率な』セッションと見なすのではなく、経験豊富なリードはこの数値をまさにその領域を深掘りする追加チャーターを開くきっかけとして読み取ります——これこそLogiFlowが誤徴収バグの本番環境への拡大を防いだ方法です。"),
      IMG(m_screen_bug, "Màn hình LogiFlow khi giao một phần: COD không trừ đúng, đơn treo trạng thái khi mất mạng", "LogiFlow's screen during partial delivery: COD not deducted correctly, order stuck mid-status on connection loss", "部分配達時のLogiFlow画面：CODが正しく差し引かれず、通信断で注文ステータスが固まる"),
      IMG(m_jira, "Ticket LF-7719: hệ thống thu đủ 100% tiền COD dù chỉ giao 2/3 kiện hàng", "Ticket LF-7719: the system collects 100% of the COD amount despite delivering only 2/3 of the parcels", "チケットLF-7719：2/3個口しか配達していないのにシステムがCOD代金を100%回収"),
      TRY("Nghĩ thêm một dấu hiệu bất thường khác trong tỉ lệ TBS (ví dụ Test giảm còn 30%) và đề xuất một hành động cụ thể lead nên làm khi thấy dấu hiệu đó.", "Think of another unusual TBS signal (e.g. Test dropping to 30%) and propose a concrete action a lead should take upon seeing it.", "TBSの別の異常シグナル（例：テストが30%まで低下）を考え、それを見た際にリードが取るべき具体的な行動を提案しよう。"),
    ] },
  { heading: { vi: "8. Debrief & tỉ lệ TBS: cách báo cáo kết quả một phiên", en: "8. Debrief & TBS ratio: how to report a session's results", ja: "8. デブリーフとTBS比率：セッション結果の報告方法" },
    blocks: [
      P("Debrief là bước không thể bỏ qua sau mỗi phiên: một cuộc trao đổi ngắn (10–15 phút) giữa tester và lead/PM, dựa trực tiếp trên nhật ký phiên vừa ghi. Cấu trúc debrief hiệu quả thường theo mô hình PROOF: Past (đã làm gì), Results (tìm được gì), Obstacles (vướng mắc), Outlook (còn gì chưa khám phá), Feelings (cảm nhận chủ quan của tester về rủi ro còn lại).",
        "The debrief is a step you cannot skip after every session: a short (10–15 minute) conversation between the tester and lead/PM, based directly on the session log just written. An effective debrief structure often follows the PROOF model: Past (what was done), Results (what was found), Obstacles (what got in the way), Outlook (what's left unexplored), Feelings (the tester's subjective sense of remaining risk).",
        "デブリーフは各セッション後に欠かせないステップです：直前に記録したセッションログに基づく、テスターとリード/PMの短い（10〜15分）対話です。効果的なデブリーフ構成は多くの場合PROOFモデルに従います：Past（何をしたか）、Results（何を見つけたか）、Obstacles（何が妨げになったか）、Outlook（何が未探索か）、Feelings（残存リスクに対するテスターの主観的感覚）。"),
      P("Tính tỉ lệ TBS ngay sau khi phiên kết thúc, trong lúc log còn rõ ràng: cộng tổng thời gian dành cho từng loại hoạt động (thao tác kiểm thử thực sự, điều tra/ghi bug, chuẩn bị dữ liệu/môi trường) rồi chia cho tổng time-box. Ghi cả 3 con số vào phần đầu debrief để lead nắm được bức tranh tổng quan chỉ trong vài giây trước khi đọc chi tiết.",
        "Compute the TBS ratio right after the session ends, while the log is still fresh: sum the time spent on each activity type (actual testing, bug investigation/logging, data/environment prep) then divide by the total time-box. Write all 3 numbers at the top of the debrief so the lead grasps the overall picture in seconds before reading the details.",
        "セッション終了直後、ログがまだ鮮明なうちにTBS比率を計算します：各活動タイプ（実際のテスト、バグの調査/記録、データ/環境準備）に費やした時間を合計し、総タイムボックスで割ります。詳細を読む前にリードが数秒で全体像を把握できるよう、この3つの数値をデブリーフの冒頭に記載します。"),
      IMG(m_dashboard_tbs, "Tỉ lệ TBS của phiên COD-01: Test 58% · Bug 27% · Setup 15% · độ phủ khu vực COD ~35%", "Session COD-01's TBS ratio: Test 58% · Bug 27% · Setup 15% · COD area coverage ~35%", "セッションCOD-01のTBS比率：テスト58%・バグ27%・セットアップ15%・COD領域カバレッジ約35%"),
      TIP("Đừng dùng TBS để xếp hạng tester giỏi/dở giữa các phiên — mỗi charter có độ khó và mức Setup khác nhau. Hãy so sánh TBS của CÙNG một tester/khu vực qua thời gian để phát hiện xu hướng, không so sánh chéo giữa các phiên khác bản chất.", "Don't use TBS to rank testers as good/bad across sessions — every charter has different difficulty and setup needs. Compare TBS for the SAME tester/area over time to spot trends, not across sessions of a different nature.", "TBSでセッション間のテスターの優劣をランク付けしないこと——チャーターごとに難易度もセットアップの必要性も異なります。同じテスター/領域のTBSを時系列で比較して傾向を見つけ、性質の異なるセッション同士を横比較しないようにしましょう。"),
    ] },
  { heading: { vi: "9. Đo độ phủ theo khu vực chức năng & lỗi hay gặp khi triển khai SBTM", en: "9. Measuring coverage by functional area & common SBTM pitfalls", ja: "9. 機能領域別カバレッジ測定とSBTM導入時のよくある失敗" },
    blocks: [
      P("Sau vài sprint chạy SBTM, đội test nên duy trì một bảng tổng hợp: mỗi khu vực chức năng, mức rủi ro, số phiên đã chạy, độ phủ ước tính, và khu vực nào cần ưu tiên charter kế tiếp. Bảng này thay thế cho khái niệm '% ca kiểm thử đã pass' quen thuộc của kiểm thử kịch bản — ở đây, độ phủ là hàm của RỦI RO và THỜI GIAN đầu tư, không phải số ca cố định.",
        "After a few sprints running SBTM, the test team should maintain a summary table: each functional area, its risk level, number of sessions run, estimated coverage, and which area needs the next charter prioritized. This table replaces the familiar '% of test cases passed' concept from scripted testing — here, coverage is a function of RISK and TIME invested, not a fixed case count.",
        "SBTMを数スプリント運用した後、テストチームは以下のようなサマリー表を維持すべきです：各機能領域、リスクレベル、実行済みセッション数、推定カバレッジ、次に優先すべきチャーター。この表は、スクリプトテストでお馴染みの『合格テストケース率』という概念に代わるものです——ここでのカバレッジは固定ケース数ではなく、リスクと投入時間の関数です。"),
      IMG(m_coverage_grid, "Bảng đo độ phủ kiểm thử thăm dò theo khu vực chức năng — khu vực POD chưa có phiên nào cần ưu tiên", "A coverage table by functional area — the POD area with zero sessions needs priority", "機能領域別カバレッジ表 — セッション0件のPOD領域を優先すべき"),
      IMG(m_kanban, "Bảng theo dõi bug/issue tìm được qua nhiều phiên SBTM trong sprint — tổng hợp giống một bộ hồi quy do khám phá tạo ra", "A board tracking bugs/issues found across many SBTM sessions in the sprint — aggregating into an exploration-generated regression set", "スプリント内の複数SBTMセッションで見つかったバグ/イシューの追跡ボード — 探索から生まれた回帰テスト群として集約"),
      PITFALL("Chạy phiên xong rồi để đó, không cập nhật bảng độ phủ — sau vài sprint không ai còn nhớ khu vực nào đã khám phá kỹ, khu vực nào chỉ mới chạm sơ sài, khiến SBTM mất đi giá trị quản lý rủi ro cốt lõi.", "Running a session then leaving it there without updating the coverage table — after a few sprints no one remembers which areas were explored thoroughly and which were barely touched, losing SBTM's core risk-management value.", "セッションを実行した後カバレッジ表を更新せず放置する——数スプリント後、どの領域が十分探索されどの領域がほとんど手つかずか誰も覚えておらず、SBTM本来のリスク管理価値が失われる。"),
      PITFALL("Ép mọi charter phải tìm được ít nhất N bug mới coi là 'thành công' — điều này khiến tester báo cáo sai lệch hoặc ép ra bug nhỏ không đáng, thay vì báo cáo trung thực một phiên 'sạch' nhưng đã khám phá kỹ.", "Forcing every charter to find at least N bugs to be considered 'successful' — this pushes testers to misreport or force out trivial bugs, instead of honestly reporting a 'clean' but thoroughly explored session.", "全てのチャーターに最低N件のバグ発見を『成功』の条件として課す——これはテスターに虚偽報告や取るに足らないバグの無理な捻出を促し、『クリーン』だが丁寧に探索されたセッションの正直な報告を妨げる。"),
      TIP("Dán bảng độ phủ ở nơi cả nhóm dễ thấy (kênh chat/board chung) và cập nhật ngay sau mỗi debrief — biến việc chọn charter tiếp theo thành một quyết định nhìn số liệu, không phải đoán mò.", "Post the coverage table somewhere the whole team can easily see (shared chat channel/board) and update it right after every debrief — turning the choice of the next charter into a data-driven decision, not a guess.", "カバレッジ表をチーム全員が見やすい場所（共有チャットチャンネル/ボード）に掲示し、デブリーフ直後に更新する——次のチャーター選定を勘ではなくデータに基づく意思決定に変える。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử thăm dò (Exploratory Testing) có charter", "Exploratory testing with a charter", "kiem-thu-tham-do-exploratory-co-charter", "チャーターを用いた探索的テスト"),
      INTERNAL("Kiểm thử dựa trên rủi ro (Risk-Based Testing) cho Tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test results report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách tổ chức kiểm thử thăm dò thành SBTM có kỷ luật qua nền tảng điều phối giao vận LogiFlow: viết charter theo công thức Mission — Area — Time-box, ghi note/bug/issue theo mốc thời gian trong phiên, tính tỉ lệ TBS để vừa quản lý thời gian vừa phát hiện 'ổ lỗi', viết debrief theo mô hình PROOF, và đo độ phủ theo khu vực chức năng thay vì đếm ca kiểm thử cố định. Hai tình huống thật cho thấy: thiếu charter khiến phiên vô nghĩa dù 'đã test xong', còn TBS lệch lại chính là tín hiệu dẫn tới 2 lỗi Critical về tiền thu hộ.",
        "You just learned how to organize exploratory testing into disciplined SBTM through LogiFlow, a delivery dispatch platform: writing charters with the Mission — Area — Time-box formula, logging notes/bugs/issues by timestamp during a session, computing the TBS ratio to both manage time and spot 'bug nests', writing a debrief using the PROOF model, and measuring coverage by functional area instead of counting fixed test cases. Two real situations showed: missing a charter makes a session meaningless even if 'testing is done', while a skewed TBS was exactly the signal leading to 2 Critical COD bugs.",
        "配送手配プラットフォームLogiFlowを通じて、探索的テストを規律あるSBTMに整理する方法を学びました：ミッション—領域—タイムボックスの公式でチャーターを書く、セッション中にタイムスタンプ付きでノート/バグ/イシューを記録する、時間管理と『バグの巣』発見の両方のためにTBS比率を算出する、PROOFモデルでデブリーフを書く、固定テストケースを数える代わりに機能領域別にカバレッジを測定する。2つの実例が示したのは：チャーターがないと『テスト完了』でもセッションが無意味になること、そして偏ったTBSがまさに2件のCritical CODバグにつながるシグナルだったことです。"),
      P("Chặng tiếp theo, bạn nên kết hợp SBTM với kiểm thử dựa trên rủi ro (risk-based testing) để chấm điểm mức độ ưu tiên cho từng khu vực chức năng một cách khách quan hơn, cùng cách viết báo cáo kết quả kiểm thử súc tích cho quản lý dự án. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vào các vị trí đòi hỏi kỹ năng quản lý kiểm thử thăm dò.",
        "Next, you should combine SBTM with risk-based testing to score each functional area's priority more objectively, along with how to write a concise test-results report for project management. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply confidently for roles requiring exploratory test management skills.",
        "次は、SBTMをリスクベーステストと組み合わせ、各機能領域の優先度をより客観的に採点する方法、そしてプロジェクト管理者向けに簡潔なテスト結果報告書を書く方法を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが探索的テスト管理スキルを要求されるポジションへの応募に自信を持てるよう、速い成長を助けます。"),
      CTA(course),
    ] },
];

const SBTM_LOGISTICS_01 = makeDoc({
  slug: "quan-ly-kiem-thu-tham-do-theo-phien-sbtm-cho-tester",
  domain: "logistics",
  primaryKeyword: "session-based test management",
  keywords: ["SBTM", "session-based test management", "kiểm thử thăm dò theo phiên", "session charter", "tỉ lệ TBS", "debrief kiểm thử", "độ phủ khu vực chức năng"],
  coverLabel: "NÂNG CAO · SBTM · LOGISTICS",
  crumb: "Quản lý kiểm thử thăm dò theo phiên (SBTM)",
  metaTitle: {
    vi: "SBTM (Session-Based Test Management) cho Tester",
    en: "SBTM (Session-Based Test Management) for testers",
    ja: "テスターのためのSBTM（セッションベーステストマネジメント）",
  },
  metaDescription: {
    vi: "Session-Based Test Management (SBTM) cho logistics: viết charter, time-box, ghi note/bug, tính tỉ lệ TBS, đo độ phủ khu vực chức năng, ví dụ và trắc nghiệm.",
    en: "Session-Based Test Management (SBTM) for logistics systems: writing session charters, time-boxing, logging notes/bugs, computing the TBS ratio, and measuring coverage by functional area, with real examples, visuals and a quiz.",
    ja: "物流システム向けセッションベーステストマネジメント（SBTM）：セッションチャーターの書き方、タイムボックス、ノート/バグの記録、TBS比率の算出、機能領域別カバレッジ測定を実例・図・クイズ付きで解説。",
  },
  title: {
    vi: "Quản lý kiểm thử thăm dò theo phiên (SBTM) cho hệ điều phối giao vận: charter, TBS, debrief",
    en: "Session-Based Test Management (SBTM) for a delivery dispatch system: charter, TBS, debrief",
    ja: "配送手配システムのためのセッションベーステストマネジメント（SBTM）：チャーター、TBS、デブリーフ",
  },
  summary: {
    vi: "Bài nâng cao: áp dụng Session-Based Test Management (SBTM) cho LogiFlow — hệ điều phối đơn & theo dõi giao hàng. Cách viết session charter (Mission — Area — Time-box), ghi note/bug/issue theo mốc thời gian, tính tỉ lệ TBS (Test/Bug/Setup), viết debrief theo mô hình PROOF, và đo độ phủ theo khu vực chức năng. 9 mockup giao diện, 2 tình huống thực tế và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: applying Session-Based Test Management (SBTM) to LogiFlow, an order dispatch & delivery tracking platform. How to write a session charter (Mission — Area — Time-box), log notes/bugs/issues by timestamp, compute the TBS ratio (Test/Bug/Setup), write a debrief using the PROOF model, and measure coverage by functional area. 9 UI mockups, 2 real situations and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級記事：注文配車・配送追跡プラットフォームLogiFlowにセッションベーステストマネジメント（SBTM）を適用。セッションチャーター（ミッション—領域—タイムボックス）の書き方、タイムスタンプ付きノート/バグ/イシューの記録、TBS比率（テスト/バグ/セットアップ）の算出、PROOFモデルによるデブリーフの書き方、機能領域別カバレッジ測定を解説。UIモック9点、実例2つ、5問クイズ付き。SEO対応、CyberSoftテスターコースへのリンクあり。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chạy một phiên Session-Based Test Management (SBTM)", steps: [
    { name: "Viết charter theo công thức Mission — Area — Time-box", text: "Xác định khu vực chức năng rủi ro cao nhất chưa được khám phá." },
    { name: "Chạy phiên & ghi log theo mốc thời gian", text: "Ghi Note/Bug/Issue/Question liên tục, không chờ tới cuối phiên." },
    { name: "Tính tỉ lệ TBS & viết debrief", text: "Tổng hợp Test/Bug/Setup, báo cáo theo mô hình PROOF, cập nhật bảng độ phủ." },
  ] },
  pages,
});

export const MA_SBTM_01 = [SBTM_LOGISTICS_01];
