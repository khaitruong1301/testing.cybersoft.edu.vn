// doc_manual_state_transition.mjs — BÀI MANUAL (TRUNG CẤP): Kỹ thuật kiểm thử chuyển trạng thái
// (State Transition Testing) gắn dự án Ví điện tử / Fintech. MOCKUP GIAO DIỆN độ chân thực cao (ui_mock).
// Song ngữ Việt/English/日本語 (ja≠en), 12 chương, có trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, postman, kanban, stateDiagram, dashboard } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: cfg.level || "intermediate",
    tags: tags("congnghe", cfg.domain, "intermediate", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI — Kiểm thử chuyển trạng thái (State Transition) · Dự án Ví điện tử (giao dịch/nạp–rút)
// ══════════════════════════════════════════════════════════════════════════════════════

// --- Mockup 1: màn hình chi tiết giao dịch trong ví điện tử ---
const m_txnScreen = browser("paywallet.vn/vi/giao-dich/TX-77120", [
  panel("PayWallet · Chi tiết giao dịch", [
    field(24, 20, 320, "Mã giao dịch", "TX-77120", "normal"),
    field(372, 20, 330, "Loại", "Chuyển tiền", "normal"),
    field(24, 92, 320, "Số tiền", "2.500.000 ₫", "normal"),
    field(372, 92, 330, "Trạng thái", "Đang xử lý (PENDING)", "focus"),
    field(24, 164, 320, "Người nhận", "0902 *** 118", "normal"),
    field(372, 164, 330, "Thời điểm tạo", "09:41:07 08/07", "normal"),
    btn(24, 236, 150, "Xác nhận", "primary"),
    btn(190, 236, 150, "Hủy giao dịch", "danger"),
    btn(356, 236, 150, "Hoàn tiền", "disabled"),
  ].join(""), { h: 300, accent: "#6d28d9" }),
].join(""), { h: 356, title: "PayWallet · Ví điện tử", accent: "#6d28d9" });

// --- Mockup 2: sơ đồ chuyển trạng thái hợp lệ của một giao dịch ---
const m_stateOk = stateDiagram("Vòng đời trạng thái giao dịch (hợp lệ)", [
  { id: "created", label: "CREATED", x: 110, y: 90, kind: "start" },
  { id: "pending", label: "PENDING", x: 320, y: 90, kind: "mid" },
  { id: "success", label: "SUCCESS", x: 540, y: 60, kind: "ok" },
  { id: "failed", label: "FAILED", x: 540, y: 150, kind: "bad" },
  { id: "refunded", label: "REFUNDED", x: 660, y: 240, kind: "mid" },
], [
  { from: "created", to: "pending", label: "xác nhận" },
  { from: "pending", to: "success", label: "cổng OK" },
  { from: "pending", to: "failed", label: "cổng lỗi" },
  { from: "success", to: "refunded", label: "hoàn tiền" },
], { accent: "#6d28d9", h: 300 });

// --- Mockup 3: chuyển trạng thái BẤT HỢP LỆ cần chặn ---
const m_stateBad = stateDiagram("Chuyển trạng thái BẤT HỢP LỆ (phải bị chặn)", [
  { id: "success", label: "SUCCESS", x: 150, y: 80, kind: "ok" },
  { id: "pending", label: "PENDING", x: 400, y: 80, kind: "mid" },
  { id: "success2", label: "SUCCESS", x: 620, y: 80, kind: "ok" },
  { id: "failed", label: "FAILED", x: 400, y: 210, kind: "bad" },
], [
  { from: "success", to: "pending", label: "quay lui?", bad: true },
  { from: "failed", to: "success2", label: "tự nhảy?", bad: true },
], { accent: "#6d28d9", h: 300 });

// --- Mockup 4: bảng chuyển trạng thái (state-transition table) 0/1-switch ---
const m_stateTable = grid("Bảng chuyển trạng thái — sự kiện × trạng thái", ["Trạng thái \\ Sự kiện", "confirm", "gatewayOK", "gatewayFail", "refund"], [
  ["CREATED", "PENDING", "—", "—", "—"],
  ["PENDING", "—", "SUCCESS", "FAILED", "—"],
  ["SUCCESS", "—", "—", "—", "REFUNDED"],
  ["FAILED", "—", "—", "—", "—"],
  ["REFUNDED", "—", "—", "—", "—"],
], { accent: "#6d28d9", note: "Ô '—' = chuyển tiếp KHÔNG hợp lệ. Mỗi ô có giá trị = 1 test case chuyển đổi (0-switch)." });

// --- Mockup 5: ticket Jira cho lỗi trạng thái ---
const m_jira = jira({
  key: "PAY-4471", title: "Giao dịch FAILED vẫn bấm được 'Hoàn tiền' → tạo trạng thái REFUNDED sai",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web PayWallet · Chrome 126 · ví HV-టెస్ట్"],
    ["Tiền điều kiện", "Giao dịch TX-77133 ở trạng thái FAILED"],
    ["Các bước", "Mở chi tiết → nút 'Hoàn tiền' đang bật → bấm"],
    ["Thực tế", "Hệ thống tạo bản ghi REFUNDED, trừ quỹ đối tác"],
    ["Mong đợi", "FAILED không hoàn tiền được (chưa từng ghi nợ)"],
    ["Ảnh hưởng", "Thất thoát tiền: hoàn cho giao dịch chưa thu"],
  ],
});

// --- Mockup 6: bảng ca kiểm thử chuyển đổi (execution) ---
const m_exec = grid("Bảng thực thi ca chuyển đổi (TestRail)", ["Ca", "Từ trạng thái", "Sự kiện", "Kỳ vọng", "Thực tế", "KQ"], [
  ["TC-ST-01", "CREATED", "confirm", "PENDING", "PENDING", "PASS"],
  ["TC-ST-02", "PENDING", "gatewayOK", "SUCCESS", "SUCCESS", "PASS"],
  ["TC-ST-03", "PENDING", "gatewayFail", "FAILED", "FAILED", "PASS"],
  ["TC-ST-04", "SUCCESS", "refund", "REFUNDED", "REFUNDED", "PASS"],
  ["TC-ST-05", "FAILED", "refund", "Bị chặn", "REFUNDED", "FAIL → PAY-4471"],
  ["TC-ST-06", "SUCCESS", "confirm", "Bị chặn", "Bị chặn", "PASS"],
], { accent: "#6d28d9", highlight: 4 });

// --- Mockup 7: kanban lỗi theo trạng thái ---
const m_kanban = kanban("Bảng lỗi kiểm thử chuyển trạng thái (PayWallet)", [
  { name: "Mới", cards: [
    { key: "PAY-4471", title: "FAILED vẫn hoàn tiền được", sev: "Critical" },
    { key: "PAY-4478", title: "PENDING double-confirm", sev: "High" },
  ] },
  { name: "Đang xử lý", cards: [
    { key: "PAY-4465", title: "SUCCESS→PENDING khi F5", sev: "High" },
  ] },
  { name: "Đã sửa", cards: [
    { key: "PAY-4450", title: "REFUNDED refund lần 2", sev: "Medium" },
  ] },
]);

// --- Mockup 8: dashboard số liệu bao phủ chuyển đổi ---
const m_dash = dashboard("Độ bao phủ chuyển đổi — Sprint 31", [
  { label: "Chuyển đổi hợp lệ", value: "4/4", sub: "0-switch phủ đủ", color: "#16a34a" },
  { label: "Chuyển đổi bị chặn", value: "9/9", sub: "ô '—' đã thử", color: "#6d28d9" },
  { label: "Lỗi trạng thái", value: "2", sub: "1 Critical", color: "#ef4444" },
  { label: "Ca 1-switch", value: "12", sub: "cặp liên tiếp", color: "#0f172a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử chuyển trạng thái (state transition testing) là gì?",
  "What is state transition testing?",
  "Kiểm thử chuyển trạng thái là kỹ thuật thiết kế ca dựa trên máy trạng thái (state machine) của đối tượng: liệt kê các trạng thái, các sự kiện, và chuyển tiếp hợp lệ giữa chúng. Bạn tạo test case cho từng chuyển tiếp hợp lệ (kiểm nó xảy ra đúng) và cho mỗi chuyển tiếp bất hợp lệ (kiểm nó bị chặn). Kỹ thuật này đặc biệt hợp với giao dịch ví điện tử, đơn hàng, hồ sơ vay — nơi thứ tự trạng thái quyết định tính đúng đắn.",
  "State transition testing is a design technique based on an object's state machine: list the states, the events, and the valid transitions between them. You create a test case for each valid transition (checking it happens correctly) and for each invalid transition (checking it is blocked). It fits e-wallet transactions, orders and loan applications, where the order of states determines correctness.",
  "状態遷移テストとは？",
  "状態遷移テストは対象の状態機械（ステートマシン）に基づく設計技法です。状態・イベント・有効な遷移を列挙し、各有効遷移（正しく起きるか）と各無効遷移（ブロックされるか）にテストケースを作ります。電子ウォレットの取引・注文・融資申請など、状態の順序が正しさを決める場面に適します。");
const faq2 = FAQ(
  "0-switch và 1-switch coverage khác nhau thế nào?",
  "What is the difference between 0-switch and 1-switch coverage?",
  "0-switch (còn gọi là bao phủ chuyển đổi đơn) yêu cầu kiểm mọi chuyển tiếp hợp lệ đúng một lần — mỗi cặp (trạng thái, sự kiện) một ca. 1-switch mạnh hơn: kiểm mọi cặp HAI chuyển tiếp liên tiếp (ví dụ CREATED→PENDING→SUCCESS như một chuỗi), nhờ đó phát hiện lỗi phụ thuộc lịch sử mà 0-switch bỏ sót. Dự án rủi ro cao như thanh toán nên đạt tối thiểu 0-switch cho toàn bộ và 1-switch cho các luồng tiền quan trọng.",
  "0-switch (single transition coverage) requires exercising every valid transition exactly once — one case per (state, event) pair. 1-switch is stronger: it exercises every pair of two consecutive transitions (e.g. CREATED→PENDING→SUCCESS as a chain), catching history-dependent bugs that 0-switch misses. High-risk projects like payments should reach at least 0-switch everywhere and 1-switch on critical money flows.",
  "0スイッチと1スイッチカバレッジの違いは？",
  "0スイッチ（単一遷移カバレッジ）は全有効遷移を一度ずつ実行します — (状態, イベント)の各ペアに1ケース。1スイッチはより強力で、連続する2遷移の各ペア（例：CREATED→PENDING→SUCCESSの連鎖）を実行し、0スイッチが見逃す履歴依存バグを検出します。決済など高リスク案件は全体で最低0スイッチ、重要な資金フローで1スイッチを目指します。");
const faq3 = FAQ(
  "Vì sao phải kiểm cả chuyển tiếp bất hợp lệ?",
  "Why must you also test invalid transitions?",
  "Vì phần lớn lỗi nghiêm trọng nằm ở đó. Một giao dịch đã FAILED mà vẫn hoàn tiền được, hay một đơn đã giao mà quay lại 'chờ thanh toán', là những chuyển tiếp bất hợp lệ gây mất tiền hoặc sai dữ liệu. Kiểm thử chuyển trạng thái buộc bạn liệt kê mọi ô 'trống' trong bảng và cố kích hoạt chúng để xác nhận hệ thống chặn đúng. Đây thường là nơi ẩn các lỗi đắt giá nhất.",
  "Because most serious bugs live there. A transaction already FAILED that can still be refunded, or a delivered order that jumps back to 'awaiting payment', are invalid transitions that cause money loss or data corruption. State transition testing forces you to list every 'empty' cell in the table and try to trigger it to confirm the system blocks it. That is often where the most expensive bugs hide.",
  "なぜ無効遷移もテストするのか？",
  "重大バグの多くがそこにあるからです。FAILEDの取引が返金できてしまう、配達済みの注文が『支払い待ち』に戻る、といった無効遷移は資金損失やデータ破損を招きます。状態遷移テストは表の全『空セル』を列挙し、実際に起動を試みてシステムが正しくブロックするか確認させます。最も高くつくバグが潜む場所です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trong kiểm thử chuyển trạng thái, một 'chuyển tiếp' (transition) gồm những thành phần nào?", en: "In state transition testing, what makes up a 'transition'?", ja: "状態遷移テストで『遷移』は何から成る？" },
    options: [
      { vi: "Chỉ một trạng thái", en: "Only one state", ja: "状態だけ" },
      { vi: "Trạng thái nguồn + sự kiện → trạng thái đích", en: "Source state + event → target state", ja: "元の状態＋イベント→先の状態" },
      { vi: "Một lập trình viên", en: "A developer", ja: "開発者" },
      { vi: "Một trình duyệt", en: "A browser", ja: "ブラウザ" },
    ], correct: 1,
    explain: { vi: "Chuyển tiếp = (trạng thái nguồn, sự kiện, trạng thái đích). Mỗi chuyển tiếp hợp lệ là một test case.", en: "A transition = (source state, event, target state). Each valid transition is a test case.", ja: "遷移＝(元状態, イベント, 先状態)。各有効遷移が1テストケースです。" },
  }),
  mcq({
    q: { vi: "Ô '—' (trống) trong bảng chuyển trạng thái nên được kiểm như thế nào?", en: "How should an empty '—' cell in the state table be tested?", ja: "状態表の空セル『—』はどう検証すべき？" },
    options: [
      { vi: "Bỏ qua vì không có gì để test", en: "Skip it, nothing to test", ja: "何もないので飛ばす" },
      { vi: "Cố kích hoạt và xác nhận hệ thống CHẶN", en: "Try to trigger it and confirm the system BLOCKS it", ja: "起動を試みシステムがブロックするか確認" },
      { vi: "Xóa khỏi bảng", en: "Delete it from the table", ja: "表から削除" },
      { vi: "Chỉ ghi chú, không cần chạy", en: "Just note it, no need to run", ja: "メモだけで実行不要" },
    ], correct: 1,
    explain: { vi: "Ô trống = chuyển tiếp bất hợp lệ. Ta cố kích hoạt để chắc chắn hệ thống chặn — đây là nơi lỗi đắt giá hay ẩn.", en: "An empty cell = invalid transition. We try to trigger it to ensure the system blocks it — expensive bugs hide here.", ja: "空セル＝無効遷移。起動を試みブロックを確認します — 高くつくバグが潜みます。" },
  }),
  mcq({
    q: { vi: "0-switch coverage đạt được khi nào?", en: "When is 0-switch coverage achieved?", ja: "0スイッチカバレッジはいつ達成？" },
    options: [
      { vi: "Khi mọi trạng thái được ghé thăm", en: "When every state is visited", ja: "全状態を訪問したとき" },
      { vi: "Khi mọi chuyển tiếp hợp lệ được kiểm ít nhất một lần", en: "When every valid transition is exercised at least once", ja: "全有効遷移を最低一度実行したとき" },
      { vi: "Khi có 100 test case", en: "When you have 100 test cases", ja: "100ケース作ったとき" },
      { vi: "Khi không còn lỗi", en: "When there are no bugs left", ja: "バグが無くなったとき" },
    ], correct: 1,
    explain: { vi: "0-switch = mỗi chuyển tiếp hợp lệ (mỗi cặp trạng thái–sự kiện) được chạy ít nhất một lần.", en: "0-switch = each valid transition (each state–event pair) is run at least once.", ja: "0スイッチ＝各有効遷移（状態–イベントの各ペア）を最低一度実行。" },
  }),
  mcq({
    q: { vi: "Giao dịch FAILED nhưng nút 'Hoàn tiền' vẫn bật và tạo được REFUNDED. Đây là loại lỗi gì?", en: "A FAILED transaction still lets 'Refund' create a REFUNDED record. What kind of bug is this?", ja: "FAILEDの取引で『返金』がREFUNDEDを作れる。どんなバグ？" },
    options: [
      { vi: "Lỗi giao diện nhỏ", en: "A minor UI glitch", ja: "軽微なUI不具合" },
      { vi: "Chuyển tiếp bất hợp lệ không bị chặn → rủi ro mất tiền", en: "An invalid transition not blocked → money-loss risk", ja: "無効遷移が未ブロック→資金損失リスク" },
      { vi: "Đúng thiết kế", en: "Works as designed", ja: "仕様どおり" },
      { vi: "Do mạng chậm", en: "Caused by slow network", ja: "ネットワーク遅延のせい" },
    ], correct: 1,
    explain: { vi: "FAILED→REFUNDED không có trong máy trạng thái hợp lệ; hoàn cho giao dịch chưa thu gây thất thoát → Critical (như PAY-4471).", en: "FAILED→REFUNDED is not in the valid state machine; refunding an uncharged transaction causes loss → Critical (like PAY-4471).", ja: "FAILED→REFUNDEDは有効な状態機械に無く、未課金の返金は損失→Critical（PAY-4471）。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử chuyển trạng thái giúp bạn thiết kế test case cho những đối tượng đi qua nhiều trạng thái theo thứ tự — như một giao dịch ví điện tử. Bài này gắn với màn hình chi tiết giao dịch của ví PayWallet: bạn vẽ máy trạng thái, lập bảng chuyển đổi, sinh ca cho chuyển tiếp hợp lệ và bất hợp lệ, chạy trên TestRail và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "State transition testing lets you design test cases for objects that move through several ordered states — like an e-wallet transaction. This ties to PayWallet's transaction-detail screen: you draw the state machine, build the transition table, derive cases for valid and invalid transitions, run them in TestRail and file Jira bugs. A quiz at the end.",
        "状態遷移テストは、順序どおり複数の状態を通る対象 — 電子ウォレットの取引など — のテストケースを設計します。本記事はPayWalletの取引詳細画面に沿い、状態機械を描き、遷移表を作り、有効・無効遷移のケースを導出し、TestRailで実行しJira起票します。最後にクイズ付き。"),
      P("Kiểm thử chuyển trạng thái (state transition testing) là kỹ thuật thiết kế ca bạn sẽ dùng rất nhiều khi đối tượng có 'vòng đời' rõ ràng: giao dịch, đơn hàng, hồ sơ vay, tài khoản. Thay vì chỉ kiểm từng màn hình rời rạc, bạn nhìn hệ thống như một máy trạng thái và hỏi: 'từ trạng thái này, sự kiện nào được phép, và nó dẫn tới đâu?'. Trong bài, ta bước vào một màn hình giao dịch ví điện tử thật và làm từng bước như một tester đi làm, có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "State transition testing is a design technique you'll use a lot when an object has a clear lifecycle: transactions, orders, loan applications, accounts. Instead of checking isolated screens, you view the system as a state machine and ask: 'from this state, which events are allowed, and where do they lead?'. Here we step into a real e-wallet transaction screen and work step by step like a working tester, with UI mockups, real examples and a final quiz.",
        "状態遷移テストは、対象が明確なライフサイクルを持つ時に頻繁に使う設計技法です：取引・注文・融資申請・口座。個別画面を単独で見る代わりに、システムを状態機械と捉え『この状態からどのイベントが許され、どこへ至るか』を問います。本記事は実際の電子ウォレット取引画面に入り、実務のように進めます。モック・実例・クイズ付き。"),
      IMG(m_txnScreen, "Màn hình test: chi tiết giao dịch ví điện tử PayWallet (trạng thái PENDING)", "Screen under test: PayWallet e-wallet transaction detail (PENDING state)", "テスト対象画面：PayWalletの取引詳細（PENDING状態）"),
      DEF("Kiểm thử chuyển trạng thái", "kỹ thuật thiết kế ca dựa trên máy trạng thái: trạng thái × sự kiện × chuyển tiếp; mỗi chuyển tiếp là một test case.",
        "state transition testing — a case-design technique based on a state machine: states × events × transitions; each transition is a test case.",
        "状態遷移テスト — 状態機械に基づく設計技法：状態×イベント×遷移。各遷移が1テストケース。"),
    ] },
  { heading: { vi: "2. Máy trạng thái trông như thế nào", en: "2. What a state machine looks like", ja: "2. 状態機械の見た目" },
    blocks: [
      P("Một máy trạng thái gồm ba thứ: các trạng thái (những 'chặng' mà đối tượng có thể ở), các sự kiện (hành động/tín hiệu làm nó thay đổi), và các chuyển tiếp (mũi tên nối trạng thái nguồn tới trạng thái đích qua một sự kiện). Vẽ ra sơ đồ, bạn thấy ngay đường đi hợp lệ và những đường KHÔNG được phép đi.",
        "A state machine has three things: states (the 'stages' an object can be in), events (actions/signals that change it), and transitions (arrows connecting a source state to a target state via an event). Drawing it, you immediately see the valid paths and the paths that must NOT be allowed.",
        "状態機械は3要素：状態（対象が取り得る『段階』）、イベント（変化させる操作・信号）、遷移（イベントで元状態から先状態を結ぶ矢印）。図に描くと有効な経路と、許されない経路が一目で分かります。"),
      IMG(m_stateOk, "Vòng đời hợp lệ của một giao dịch ví: CREATED → PENDING → SUCCESS/FAILED → REFUNDED", "A wallet transaction's valid lifecycle: CREATED → PENDING → SUCCESS/FAILED → REFUNDED", "ウォレット取引の有効なライフサイクル：CREATED→PENDING→SUCCESS/FAILED→REFUNDED"),
      DEF("Trạng thái (state)", "một chặng ổn định của đối tượng (ví dụ PENDING, SUCCESS) mà từ đó chỉ một số sự kiện được phép.",
        "a state — a stable stage of the object (e.g. PENDING, SUCCESS) from which only certain events are allowed.",
        "状態 — 対象の安定した段階（例：PENDING, SUCCESS）で、特定のイベントのみ許される。"),
      P("Điểm mạnh của kỹ thuật là nó tách 'điều được phép' khỏi 'điều bị cấm' một cách tường minh. Mỗi mũi tên trên sơ đồ là một chuyển tiếp hợp lệ cần được xác nhận hoạt động đúng; mỗi cặp trạng thái–sự kiện KHÔNG có mũi tên là một chuyển tiếp bất hợp lệ cần được xác nhận là bị chặn. Nhờ đó bạn phủ cả hai mặt: hệ thống làm đúng điều nên làm, và từ chối điều không nên.",
        "The strength is that it explicitly separates 'what is allowed' from 'what is forbidden'. Each arrow on the diagram is a valid transition to confirm works; each state–event pair WITHOUT an arrow is an invalid transition to confirm is blocked. This covers both sides: the system does what it should, and refuses what it shouldn't.",
        "強みは『許されること』と『禁じられること』を明示的に分ける点です。図の各矢印は正しく動くか確認すべき有効遷移。矢印の無い各状態–イベントのペアはブロックを確認すべき無効遷移。これで両面を網羅します：すべきことを行い、すべきでないことを拒否する。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án ví điện tử / fintech", en: "3. Why it matters on an e-wallet / fintech project", ja: "3. 電子ウォレット・フィンテック案件で重要な理由" },
    blocks: [
      P("Ở ví điện tử, mỗi giao dịch đụng trực tiếp tới tiền thật. Nếu một giao dịch nhảy sai trạng thái — ví dụ đã FAILED mà vẫn hoàn tiền, hay đã SUCCESS mà quay lại PENDING rồi trừ tiền lần nữa — hậu quả là mất tiền, sai sổ sách, hoặc khách bị trừ trùng. Đây là loại lỗi mà một lần lọt ra production có thể tốn hàng trăm triệu và làm mất niềm tin người dùng.",
        "In an e-wallet, every transaction touches real money. If a transaction jumps to a wrong state — e.g. already FAILED yet still refundable, or already SUCCESS yet returning to PENDING and charging again — the result is lost money, wrong books, or double-charged customers. This is the kind of bug where one production escape can cost a fortune and destroy user trust.",
        "電子ウォレットでは各取引が実際の資金に直結します。取引が誤った状態へ飛ぶ — 例：FAILEDなのに返金可能、SUCCESSなのにPENDINGへ戻り再課金 — と、資金損失・帳簿不整合・二重課金を招きます。本番に一度漏れると多額の損失と信頼喪失を生むバグ種です。"),
      P("Các luồng này còn phải khớp với đối soát (reconciliation) hằng ngày với ngân hàng và đối tác cổng thanh toán. Một trạng thái sai không chỉ là lỗi phần mềm mà còn làm lệch số liệu tài chính, kéo theo rủi ro tuân thủ. Vì thế, chứng minh 'mọi chuyển tiếp hợp lệ đều đúng và mọi chuyển tiếp cấm đều bị chặn' là một phần bắt buộc của chất lượng, không phải tùy chọn.",
        "These flows must also match daily reconciliation with banks and payment-gateway partners. A wrong state is not just a software bug but skews financial figures, bringing compliance risk. So proving 'every valid transition is correct and every forbidden transition is blocked' is a required part of quality, not optional.",
        "これらのフローは銀行や決済ゲートウェイ提携先との日次照合とも一致せねばなりません。誤った状態はソフト不具合にとどまらず財務数値を歪め、コンプライアンスリスクを招きます。ゆえに『全有効遷移が正しく、全禁止遷移がブロックされる』証明は品質の必須要素です。"),
      P("Một tester biết dựng máy trạng thái và bảng chuyển đổi rõ ràng sẽ được tin tưởng giao những luồng đụng tới tiền. Đây là bước tiến rõ rệt so với chỉ kiểm 'happy path': bạn đang bảo vệ tính toàn vẹn của từng đồng đi qua hệ thống.",
        "A tester who can build clear state machines and transition tables is trusted with money-touching flows. This is a clear step up from only checking the 'happy path': you protect the integrity of every unit of money passing through the system.",
        "明確な状態機械と遷移表を作れるテスターは、資金に関わるフローを任されます。『ハッピーパス』だけの検証から明確に前進し、システムを通る全ての金銭の整合性を守ります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: đọc luồng nghiệp vụ & công cụ", en: "4. Prepare: read the business flow & tools", ja: "4. 準備：業務フローの読解とツール" },
    blocks: [
      P("Nguyên liệu chính là tài liệu mô tả vòng đời đối tượng: các trạng thái, sự kiện kích hoạt, và quy tắc chuyển. Bạn cần đọc kỹ để rút ra danh sách trạng thái và sự kiện trước khi vẽ sơ đồ và lập bảng.",
        "The main ingredient is the document describing the object's lifecycle: the states, triggering events, and transition rules. Read it carefully to extract the list of states and events before drawing the diagram and building the table.",
        "主材料は対象のライフサイクルを記す資料です：状態・起動イベント・遷移ルール。図を描き表を作る前に、状態とイベントの一覧を丁寧に抽出します。"),
      STEP(1, "Đọc mô tả luồng, gạch chân các TRẠNG THÁI (CREATED, PENDING, SUCCESS, FAILED, REFUNDED) và các SỰ KIỆN (confirm, gatewayOK, gatewayFail, refund).", "Read the flow, underline STATES (CREATED, PENDING, SUCCESS, FAILED, REFUNDED) and EVENTS (confirm, gatewayOK, gatewayFail, refund).", "フローを読み、状態（CREATED, PENDING, SUCCESS, FAILED, REFUNDED）とイベント（confirm, gatewayOK, gatewayFail, refund）に線を引く。"),
      STEP(2, "Vẽ máy trạng thái: nối trạng thái nguồn → đích qua sự kiện. Mỗi mũi tên là một chuyển tiếp hợp lệ.", "Draw the state machine: connect source → target via an event. Each arrow is a valid transition.", "状態機械を描く：イベントで元→先を結ぶ。各矢印が有効遷移。"),
      STEP(3, "Mở TestRail/Excel để lưu ca theo chuyển tiếp và Jira để mở lỗi khi thực tế lệch máy trạng thái.", "Open TestRail/Excel to store cases per transition and Jira to file bugs when reality differs from the state machine.", "TestRail/Excelで遷移別ケース保存、実際が状態機械と異なる時のJira起票を準備。"),
      TRY("Lấy vòng đời một đơn hàng TMĐT (Giỏ hàng → Đã đặt → Đã giao → Hoàn trả) — liệt kê trạng thái và sự kiện của nó.", "Take an e-commerce order lifecycle (Cart → Placed → Delivered → Returned) — list its states and events.", "ECの注文ライフサイクル（カート→注文済→配達済→返品）で状態とイベントを列挙しよう。"),
      PITFALL("Chỉ liệt kê trạng thái mà quên sự kiện kích hoạt — bảng sẽ thiếu cột, không sinh được ca chuyển đổi chính xác.", "Listing only states and forgetting the triggering events — the table lacks columns and you can't derive accurate transition cases.", "状態だけ列挙し起動イベントを忘れる — 表に列が欠け、正確な遷移ケースを導出できません。"),
      IMG(m_stateBad, "Những chuyển tiếp BẤT HỢP LỆ cần chặn: SUCCESS→PENDING, FAILED→SUCCESS", "Invalid transitions to block: SUCCESS→PENDING, FAILED→SUCCESS", "ブロックすべき無効遷移：SUCCESS→PENDING、FAILED→SUCCESS"),
    ] },
  { heading: { vi: "5. Các bước lập bảng chuyển đổi & sinh test case", en: "5. Steps to build the transition table & derive cases", ja: "5. 遷移表作成とケース導出の手順" },
    blocks: [
      P("Có bốn bước gọn để đi từ máy trạng thái tới bộ test case đầy đủ. Bảng chuyển đổi (state-transition table) là cầu nối: hàng là trạng thái, cột là sự kiện, mỗi ô ghi trạng thái đích (hoặc '—' nếu không hợp lệ).",
        "Four concise steps take you from the state machine to a complete case set. The state-transition table is the bridge: rows are states, columns are events, each cell holds the target state (or '—' if invalid).",
        "状態機械から完全なケース集合まで4ステップ。遷移表が橋渡し：行が状態、列がイベント、各セルに先の状態（無効なら『—』）。"),
      STEP(1, "Lập bảng: mỗi hàng một trạng thái, mỗi cột một sự kiện; điền trạng thái đích cho ô hợp lệ.", "Build the table: one row per state, one column per event; fill the target state for valid cells.", "表を作る：1行1状態、1列1イベント；有効セルに先の状態を記入。"),
      STEP(2, "Đánh '—' cho mọi ô KHÔNG hợp lệ — đây chính là danh sách chuyển tiếp cần kiểm 'bị chặn'.", "Mark '—' for every INVALID cell — this is exactly the list of transitions to test as 'blocked'.", "無効セルすべてに『—』— これがブロック確認すべき遷移の一覧。"),
      STEP(3, "Mỗi ô có giá trị → một ca chuyển tiếp hợp lệ (0-switch). Ghép hai chuyển tiếp liên tiếp → ca 1-switch.", "Each valued cell → one valid-transition case (0-switch). Chain two consecutive transitions → a 1-switch case.", "各値セル→有効遷移ケース1件（0スイッチ）。連続2遷移を連結→1スイッチケース。"),
      STEP(4, "Mỗi ô '—' → một ca bất hợp lệ: cố kích hoạt và khẳng định hệ thống chặn (thông báo lỗi, không đổi trạng thái).", "Each '—' cell → one invalid case: try to trigger it and assert the system blocks it (error message, no state change).", "各『—』セル→無効ケース：起動を試み、システムがブロックすると断言（エラー表示・状態不変）。"),
      IMG(m_stateTable, "Bảng chuyển trạng thái: sự kiện × trạng thái; ô '—' là chuyển tiếp bất hợp lệ", "State-transition table: events × states; '—' cells are invalid transitions", "状態遷移表：イベント×状態；『—』セルは無効遷移"),
      CODE("text", "TC-ST-01 (0-switch): [CREATED] --confirm-->     Kỳ vọng: PENDING\nTC-ST-02 (0-switch): [PENDING] --gatewayOK-->   Kỳ vọng: SUCCESS\nTC-ST-03 (0-switch): [PENDING] --gatewayFail--> Kỳ vọng: FAILED\nTC-ST-04 (0-switch): [SUCCESS] --refund-->     Kỳ vọng: REFUNDED\nTC-ST-05 (bất hợp lệ): [FAILED] --refund-->    Kỳ vọng: BỊ CHẶN (không tạo REFUNDED)\nTC-ST-06 (1-switch): [CREATED]--confirm-->[PENDING]--gatewayOK-->SUCCESS  Kỳ vọng: chuỗi đúng"),
      TRY("Tự sinh ca cho ô [SUCCESS] × sự kiện 'confirm' — nó hợp lệ hay bị chặn? Kết quả mong đợi là gì?", "Derive the case for [SUCCESS] × event 'confirm' — is it valid or blocked? What is the expected result?", "[SUCCESS]×イベント『confirm』のケースを導出しよう — 有効かブロックか？期待結果は？"),
    ] },
  { heading: { vi: "6. Tình huống 1: chuyển tiếp bất hợp lệ gây mất tiền", en: "6. Situation 1: an invalid transition causing money loss", ja: "6. シーン1：資金損失を招く無効遷移" },
    blocks: [
      SITUATION("Bạn chạy ca TC-ST-05: mở một giao dịch đang FAILED và thử bấm 'Hoàn tiền'.", "You run TC-ST-05: open a FAILED transaction and try to click 'Refund'.",
        "Nút 'Hoàn tiền' lẽ ra phải mờ (disabled) với giao dịch FAILED vì chưa hề thu tiền, nhưng ở đây nó vẫn bật và bấm được — hệ thống tạo bản ghi REFUNDED và trừ quỹ đối tác.",
        "The 'Refund' button should be disabled for a FAILED transaction because no money was ever charged, but here it is enabled and clickable — the system creates a REFUNDED record and debits the partner fund.",
        "TC-ST-05実行：FAILEDの取引を開き『返金』を押す。", "『返金』ボタンはFAILED取引では未課金のため無効のはずが、有効で押せてしまい — システムがREFUNDED記録を作り提携先の資金を引き落とします。"),
      SOLVE("Đối chiếu máy trạng thái: FAILED→REFUNDED không tồn tại. Mở bug Critical với đủ tiền điều kiện, các bước, thực tế và mong đợi.", "Compare the state machine: FAILED→REFUNDED does not exist. File a Critical bug with full preconditions, steps, actual and expected.", "状態機械と照合：FAILED→REFUNDEDは存在しない。前提・手順・実際・期待を明記しCriticalで起票。"),
      P("Khi ghi nhận, sức mạnh của kỹ thuật thể hiện rõ: bạn không nói chung chung 'hoàn tiền bị lỗi' mà chỉ đích danh chuyển tiếp cấm FAILED→REFUNDED, nêu rõ vì sao nó nguy hiểm (hoàn cho giao dịch chưa thu tiền = thất thoát ròng). Lập trình viên nhìn vào biết ngay phải chặn hành động 'refund' khi trạng thái nguồn không phải SUCCESS. Đây là lỗi Critical vì đụng trực tiếp tới tiền và đối soát.",
        "When recording, the technique's power shows: you don't say vaguely 'refund is broken' but name the forbidden transition FAILED→REFUNDED and explain why it's dangerous (refunding an uncharged transaction = net loss). Developers instantly see they must block the 'refund' action when the source state isn't SUCCESS. It's Critical because it touches money and reconciliation.",
        "記録時、技法の力が発揮されます：漠然と『返金が壊れた』でなく禁止遷移FAILED→REFUNDEDを名指しし、危険な理由（未課金取引の返金＝純損失）を示します。開発者は元状態がSUCCESSでない時『refund』をブロックすべきと即座に分かります。資金と照合に直結するためCriticalです。"),
      CODE("text", "TIÊU ĐỀ BUG: [PayWallet] Giao dịch FAILED vẫn hoàn tiền được → tạo REFUNDED sai\nSeverity: Critical | Priority: Highest\nChuyển tiếp cấm bị kích hoạt: FAILED --refund--> REFUNDED (không có trong máy trạng thái)\nTiền điều kiện: giao dịch TX-77133 ở trạng thái FAILED (chưa ghi nợ)\nThực tế: tạo bản ghi REFUNDED, trừ quỹ đối tác 2.500.000đ\nMong đợi: nút 'Hoàn tiền' disabled; API refund trả 409 Conflict nếu bị gọi trực tiếp"),
      RECAP(["Chuyển tiếp bất hợp lệ là nơi lỗi đắt giá ẩn nấp", "Chỉ đích danh chuyển tiếp cấm khi mở bug, nêu rủi ro tiền"],
        ["Invalid transitions are where expensive bugs hide", "Name the forbidden transition in the bug, state the money risk"],
        ["無効遷移に高くつくバグが潜む", "起票時は禁止遷移を名指しし資金リスクを明記"]),
    ] },
  { heading: { vi: "7. Tình huống 2: lỗi phụ thuộc lịch sử (cần 1-switch)", en: "7. Situation 2: a history-dependent bug (needs 1-switch)", ja: "7. シーン2：履歴依存バグ（1スイッチが必要）" },
    blocks: [
      SITUATION("Ca 0-switch đều PASS, nhưng người dùng báo bị trừ tiền hai lần khi thao tác nhanh.", "All 0-switch cases PASS, yet users report being charged twice when acting quickly.",
        "Khi bấm 'Xác nhận' hai lần thật nhanh ở trạng thái CREATED, hệ thống tạo hai lần chuyển CREATED→PENDING→SUCCESS song song, dẫn tới hai lần trừ tiền. Từng chuyển tiếp đơn lẻ đều đúng, nhưng chuỗi liên tiếp lại sai.",
        "Double-clicking 'Confirm' very fast in the CREATED state makes the system run two parallel CREATED→PENDING→SUCCESS chains, charging twice. Each single transition is correct, but the consecutive chain is wrong.",
        "0スイッチは全PASSだが、素早い操作で二重課金の報告。", "CREATED状態で『確認』を素早く2回押すと、CREATED→PENDING→SUCCESSの連鎖が並行して2回走り二重課金に。単一遷移は各々正しいが、連続した連鎖が誤りです。"),
      SOLVE("Dùng ca 1-switch: kiểm chuỗi hai chuyển tiếp liên tiếp và điều kiện idempotency (một lệnh xác nhận chỉ được tạo đúng một chuyển CREATED→PENDING).", "Use a 1-switch case: test the two-consecutive-transition chain and the idempotency rule (one confirm must create exactly one CREATED→PENDING).", "1スイッチケースを使う：連続2遷移の連鎖と冪等性ルール（1回の確認はCREATED→PENDINGを正確に1回のみ生成）を検証。"),
      P("Đây là lúc bao phủ 1-switch tỏ ra giá trị. Lỗi không nằm ở một chuyển tiếp đơn — mà ở việc hai chuyển tiếp liên tiếp cùng chạy khi không được phép. Kiểm thử chuyển trạng thái mức 1-switch buộc bạn thiết kế ca theo CẶP chuyển tiếp, và thêm điều kiện bất biến 'một giao dịch chỉ đi qua CREATED→PENDING đúng một lần' làm oracle. Với luồng tiền, đây là mức bao phủ tối thiểu nên đạt.",
        "This is where 1-switch coverage proves its worth. The bug isn't in one transition — it's two consecutive transitions running when they shouldn't. 1-switch state transition testing forces you to design cases by PAIR of transitions, and add the invariant 'a transaction passes CREATED→PENDING exactly once' as an oracle. For money flows this is the minimum coverage to reach.",
        "ここで1スイッチカバレッジの価値が出ます。バグは単一遷移でなく、許されない2連続遷移の同時実行にあります。1スイッチの状態遷移テストは遷移のペア単位で設計させ、『取引はCREATED→PENDINGを正確に1回だけ通る』という不変条件をオラクルに加えます。資金フローではこれが達成すべき最低カバレッジです。"),
      IMG(m_exec, "Bảng thực thi ca chuyển đổi — ca bất hợp lệ TC-ST-05 FAIL, gắn mã lỗi", "Transition execution sheet — invalid case TC-ST-05 FAILs, linked to a bug", "遷移実行表 — 無効ケースTC-ST-05がFAIL、バグ番号を紐付け"),
      TRY("Viết một ca 1-switch cho chuỗi [PENDING]--gatewayFail-->[FAILED]--refund--> : kết quả mong đợi của bước cuối là gì?", "Write a 1-switch case for the chain [PENDING]--gatewayFail-->[FAILED]--refund--> : what is the expected result of the last step?", "連鎖[PENDING]--gatewayFail-->[FAILED]--refund-->の1スイッチケースを書こう：最終ステップの期待結果は？"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report theo chuyển tiếp", en: "8. Recording & the report by transition", ja: "8. 遷移別の記録とレポート" },
    blocks: [
      P("Vì mỗi chuyển tiếp là một test case, báo cáo của bạn trình bày kết quả theo từng chuyển tiếp — rất dễ đọc và dễ truy vết. Người quản lý nhìn vào biết ngay đường đi nào chưa đạt và ô cấm nào chưa được chặn.",
        "Because each transition is a test case, your report presents results per transition — very readable and traceable. Managers instantly see which path fails and which forbidden cell isn't blocked.",
        "各遷移が1ケースのため、報告は遷移別に結果を提示します。読みやすく追跡しやすく、管理者はどの経路が不合格か、どの禁止セルが未ブロックか即座に分かります。"),
      STEP(1, "Ghi kết quả từng chuyển tiếp (Pass/Fail), tách rõ nhóm hợp lệ (0/1-switch) và nhóm bị chặn.", "Record each transition's result (Pass/Fail), clearly separating the valid group (0/1-switch) and the blocked group.", "各遷移の結果（合否）を記録し、有効群（0/1スイッチ）とブロック群を明確に分ける。"),
      STEP(2, "Với ô cấm chưa được chặn, nêu rõ rủi ro nghiệp vụ (mất tiền, sai đối soát) để xếp mức ưu tiên.", "For an unblocked forbidden cell, state the business risk (money loss, reconciliation mismatch) to set priority.", "未ブロックの禁止セルは業務リスク（資金損失・照合不一致）を明記し優先度を設定。"),
      CODE("text", "BÁO CÁO — Kiểm thử chuyển trạng thái Giao dịch ví — Sprint 31 (PayWallet)\nNgười test: (bạn) | Môi trường: staging | Ngày: 08/07\nBao phủ: 0-switch 4/4 hợp lệ · chặn 9/9 ô cấm · 1-switch: 12 cặp (luồng tiền)\nHợp lệ: PASS 4/4\nBị chặn: PASS 8/9 — FAIL 1: FAILED--refund-->REFUNDED không bị chặn\nLỗi: PAY-4471 Critical  (thất thoát: hoàn cho giao dịch chưa thu)\nKhuyến nghị: (1) chặn refund khi nguồn≠SUCCESS ở cả UI lẫn API; (2) thêm ràng buộc idempotency cho confirm."),
      IMG(m_jira, "Ticket Jira Critical: chỉ đích danh chuyển tiếp cấm FAILED→REFUNDED, đủ bằng chứng", "A Critical Jira ticket naming the forbidden transition FAILED→REFUNDED with full evidence", "Critical Jiraチケット：禁止遷移FAILED→REFUNDEDを名指し、証拠を明記"),
      TIP("Luôn kèm 'chuyển tiếp cấm bị kích hoạt' và mức thiệt hại tiền trong bug trạng thái — nó nâng severity đúng và giúp lập trình viên chặn đúng chỗ.", "Always include the 'forbidden transition triggered' and the money impact in a state bug — it sets the right severity and helps devs block the right spot.", "状態バグには必ず『起動された禁止遷移』と金銭影響を含める — 適切なseverityを設定し、開発者が正しい箇所をブロックできます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng kiểm thử chuyển trạng thái, người ta hay mắc vài lỗi giống nhau. Biết trước giúp bộ ca của bạn phủ đủ mà vẫn gọn.",
        "When new to state transition testing, people make a few common mistakes. Knowing them keeps your case set complete yet compact.",
        "状態遷移テストに不慣れだと共通の失敗をします。事前に知れば、ケース集合が網羅的かつ簡潔になります。"),
      PITFALL("Chỉ kiểm chuyển tiếp hợp lệ, bỏ qua ô '—' — hầu hết lỗi mất tiền nằm ở chuyển tiếp bất hợp lệ không bị chặn.", "Testing only valid transitions and skipping '—' cells — most money-loss bugs are unblocked invalid transitions.", "有効遷移だけ検証し『—』セルを飛ばす — 資金損失バグの多くは未ブロックの無効遷移です。"),
      PITFALL("Dừng ở 0-switch cho luồng tiền — lỗi phụ thuộc lịch sử (trừ tiền hai lần) chỉ lộ ra ở 1-switch.", "Stopping at 0-switch for money flows — history-dependent bugs (double charge) only surface with 1-switch.", "資金フローで0スイッチで止める — 履歴依存バグ（二重課金）は1スイッチでのみ露見。"),
      TIP("Dựng đủ ba tạo tác: sơ đồ máy trạng thái, bảng chuyển đổi (kể cả ô '—'), và danh sách ca 0/1-switch. Ba cái này bổ trợ nhau và là bằng chứng bao phủ.", "Produce all three artifacts: the state diagram, the transition table (including '—' cells), and the 0/1-switch case list. They complement each other and are your coverage evidence.", "3つの成果物を作る：状態図・遷移表（『—』セル含む）・0/1スイッチケース一覧。互いに補完し、カバレッジの証拠になります。"),
      IMG(m_dash, "Dashboard bao phủ chuyển đổi: hợp lệ, bị chặn, ca 1-switch và số lỗi trạng thái", "Transition coverage dashboard: valid, blocked, 1-switch cases and state-bug count", "遷移カバレッジのダッシュボード：有効・ブロック・1スイッチケース・状態バグ数"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kỹ thuật bảng quyết định (Decision Table) cho tester", "The decision table technique for testers", "bang-quyet-dinh-decision-table-cho-tester"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa dùng kiểm thử chuyển trạng thái để thiết kế ca cho vòng đời giao dịch của một ví điện tử: vẽ máy trạng thái, lập bảng chuyển đổi, sinh ca cho chuyển tiếp hợp lệ (0-switch) và chuỗi liên tiếp (1-switch), cố kích hoạt các ô cấm để xác nhận bị chặn, phát hiện một lỗi mất tiền và một lỗi phụ thuộc lịch sử, rồi ghi nhận theo chuyển tiếp. Đây là kỹ năng thiết kế ca ở mức chuyên nghiệp cho các luồng đụng tới tiền.",
        "You just used state transition testing to design cases for an e-wallet's transaction lifecycle: drew the state machine, built the transition table, derived cases for valid transitions (0-switch) and consecutive chains (1-switch), tried to trigger forbidden cells to confirm they're blocked, found a money-loss bug and a history-dependent bug, then recorded by transition. This is professional-level case design for money-touching flows.",
        "状態遷移テストで電子ウォレットの取引ライフサイクルのケースを設計しました：状態機械を描き、遷移表を作り、有効遷移（0スイッチ）と連続連鎖（1スイッチ）のケースを導出し、禁止セルの起動を試みブロックを確認し、資金損失バグと履歴依存バグを発見し、遷移別に記録しました。資金に関わるフローのプロレベルのケース設計スキルです。"),
      P("Chặng tiếp theo là kết hợp nhiều kỹ thuật thiết kế ca (bảng quyết định, phân vùng tương đương, chuyển trạng thái) trên cùng một dự án, rồi tiến tới tự động hóa kiểm thử API cho chính các chuyển tiếp này. Nếu muốn luyện các kỹ thuật này trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khóa học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is combining several case-design techniques (decision table, equivalence partitioning, state transition) on one project, then moving to API test automation for these very transitions. If you want to practice these on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "次は複数のケース設計技法（デシジョンテーブル・同値分割・状態遷移）を1案件で組み合わせ、これらの遷移のAPIテスト自動化へ進みます。指導付きで企業を模した案件で練習したいなら、体系的コースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const STATE_01 = makeDoc({
  slug: "kiem-thu-chuyen-trang-thai-state-transition-cho-tester",
  domain: "fintech",
  level: "intermediate",
  primaryKeyword: "kiểm thử chuyển trạng thái",
  keywords: ["kiểm thử chuyển trạng thái", "state transition testing", "máy trạng thái", "0-switch 1-switch coverage", "kỹ thuật thiết kế test case"],
  coverLabel: "TRUNG CẤP · STATE TRANSITION · VÍ ĐIỆN TỬ",
  crumb: "Kiểm thử chuyển trạng thái (State Transition)",
  metaTitle: { vi: "Kiểm thử chuyển trạng thái (State Transition) cho tester", en: "State transition testing technique for testers", ja: "状態遷移テスト技法（テスト設計）" },
  metaDescription: {
    vi: "Kiểm thử chuyển trạng thái cho tester trên dự án ví điện tử: máy trạng thái, bảng chuyển đổi, ca 0-switch/1-switch, chặn chuyển tiếp lỗi, có trắc nghiệm.",
    en: "State transition testing for testers on an e-wallet project: state machine, transition table, 0-switch/1-switch cases, blocking invalid transitions, UI mockups and a quiz.",
    ja: "テスター向け状態遷移テストを電子ウォレット案件で：状態機械・遷移表・0/1スイッチ・無効遷移のブロック・モック・クイズ。",
  },
  title: {
    vi: "Kiểm thử chuyển trạng thái (State Transition): thiết kế test case cho giao dịch ví điện tử (có trắc nghiệm)",
    en: "State transition testing: designing test cases for e-wallet transactions (with quiz)",
    ja: "状態遷移テスト：電子ウォレット取引のテストケース設計（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: dùng kiểm thử chuyển trạng thái để thiết kế test case cho vòng đời giao dịch ví điện tử. Máy trạng thái, bảng chuyển đổi, ca 0-switch & 1-switch, kiểm cả chuyển tiếp bất hợp lệ, phát hiện lỗi mất tiền và lỗi phụ thuộc lịch sử, ghi nhận theo chuyển tiếp, mockup giao diện thật, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: using state transition testing to design test cases for an e-wallet transaction lifecycle. State machine, transition table, 0-switch & 1-switch cases, testing invalid transitions, finding a money-loss bug and a history-dependent bug, recording by transition, real UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：状態遷移テストで電子ウォレット取引ライフサイクルのテストケースを設計。状態機械・遷移表・0/1スイッチ・無効遷移の検証・資金損失バグと履歴依存バグの発見・遷移別記録・モック・FAQ・クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách dùng kiểm thử chuyển trạng thái để thiết kế test case", steps: [
    { name: "Đọc luồng, rút trạng thái & sự kiện", text: "Vẽ máy trạng thái nối trạng thái nguồn tới đích qua sự kiện." },
    { name: "Lập bảng chuyển đổi", text: "Điền trạng thái đích cho ô hợp lệ, đánh '-' cho ô bất hợp lệ." },
    { name: "Sinh ca 0-switch, 1-switch và ca bị chặn", text: "Mỗi ô có giá trị là một ca hợp lệ; mỗi ô '-' là một ca cần bị chặn." },
  ] },
  pages,
});

export const MANUAL_STATE_01 = [STATE_01];
