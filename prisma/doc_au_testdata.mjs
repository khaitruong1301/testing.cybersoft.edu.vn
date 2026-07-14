// doc_au_testdata.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Chuẩn bị dữ liệu test trong automation (fixtures, tạo & dọn dữ liệu) — vì sao test cần dữ liệu
// độc lập & lặp lại được, fixtures/setup-teardown, tạo dữ liệu qua API/DB thay vì UI, dọn dữ liệu
// sau test, test không phụ thuộc nhau. Practice-first, nhiều MOCKUP giao diện (ui_mock), có code
// Playwright/JS chạy được. Gắn app TMĐT ShopEasy (tài khoản + đơn hàng). Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "congnghe", label: cfg.coverLabel });
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
    categorySlug: "automation-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", "automation", "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn "Đơn hàng của tôi" ShopEasy, chú thích dữ liệu test riêng cho lần chạy ──
const m_account = browser("shopeasy.vn/tai-khoan/don-hang", [
  panel("ShopEasy · Đơn hàng của tôi", [
    field(24, 20, 660, "Tài khoản đăng nhập", "qa.1721.938201@shopeasy.vn", "normal"),
    field(24, 112, 660, "Mã đơn hàng vừa tạo", "DH-TEST-938201", "normal"),
    btn(24, 204, 220, "Xem chi tiết đơn", "primary"),
    annotate(20, 10, 668, 72, "Sinh riêng cho lần chạy: email gắn timestamp"),
    annotate(20, 102, 668, 72, "Đơn hàng tạo qua API, không đụng đơn của ai khác"),
  ].join(""), { h: 280, accent: "#0f766e" }),
].join(""), { h: 336, title: "ShopEasy · TMĐT", accent: "#0f766e" });

// ── Mockup 2: bảng các loại fixture thường dùng khi chuẩn bị dữ liệu test ──
const m_fixtureTypes = grid("Các loại fixture thường dùng khi chuẩn bị dữ liệu test", ["Loại fixture", "Vai trò", "Ví dụ trong ShopEasy"], [
  ["testAccount", "Tạo + tự xoá 1 tài khoản riêng cho mỗi test", "testAccount.email, testAccount.id"],
  ["testOrder", "Tạo sẵn 1 đơn hàng ở đúng trạng thái cần test", "testOrder.code = 'DH-TEST-9021'"],
  ["apiContext", "Cung cấp kênh gọi thẳng API, không qua thao tác UI", "request.post('/accounts', {...})"],
  ["page (có sẵn)", "Tab trình duyệt riêng biệt cho từng test", "await page.goto(url)"],
  ["fixture cấp worker", "Dữ liệu chỉ-đọc, dùng chung an toàn cho cả nhóm test trong 1 worker", "catalogFixture (danh mục sản phẩm mẫu)"],
], { accent: "#0f766e", note: "Mỗi fixture chịu trách nhiệm cho đúng 1 loại dữ liệu — test chỉ khai báo cần fixture nào, không tự tạo dữ liệu thủ công." });

// ── Mockup 3: sơ đồ chuẩn bị dữ liệu Setup → Test → Teardown ──
const m_flow = moduleFlow("Sơ đồ chuẩn bị dữ liệu: Setup → Test → Teardown", [
  { id: "setup", label: "Setup", sub: "tạo dữ liệu qua API", x: 96, y: 150 },
  { id: "test", label: "Test", sub: "chạy kịch bản trên ShopEasy", x: 380, y: 150 },
  { id: "teardown", label: "Teardown", sub: "xoá dữ liệu vừa tạo", x: 664, y: 150 },
], [
  { from: "setup", to: "test", label: "trước use()" },
  { from: "test", to: "teardown", label: "sau use(), luôn chạy" },
], { accent: "#0f766e", h: 260 });

// ── Mockup 4: bảng so sánh tạo dữ liệu qua giao diện (UI) và qua API/DB ──
const m_uiapi = grid("Tạo dữ liệu test: qua giao diện (UI) và qua API/DB", ["Tiêu chí", "Qua giao diện (UI)", "Qua API/DB"], [
  ["Tốc độ", "Chậm: phải điền form, chờ trang tải từng bước", "Nhanh: 1 lệnh gọi API tạo xong tài khoản/đơn hàng"],
  ["Độ ổn định", "Dễ vỡ khi UI đổi id, đổi bước, đổi validation", "Ổn định hơn: chỉ phụ thuộc hợp đồng API (request/response)"],
  ["Phù hợp cho", "Đúng phần đang MUỐN kiểm thử (ví dụ: form đăng ký)", "Phần CHUẨN BỊ TRƯỚC cho test khác (không phải trọng tâm test)"],
  ["Tốc độ cả bộ test", "Chậm dần khi số test tăng, vì bước nào cũng qua UI", "Giữ tốc độ ổn định dù bộ test lớn lên"],
  ["Rủi ro dữ liệu tồn đọng", "Cao hơn: khó dọn lại đúng dữ liệu vừa tạo qua UI", "Thấp hơn: có sẵn id trả về để gọi API xoá đúng bản ghi"],
], { accent: "#0f766e", note: "Nguyên tắc: chỉ dùng UI để test đúng tính năng đang kiểm thử; mọi dữ liệu 'nền' nên tạo qua API/DB." });

// ── Mockup 5: ticket Jira khi test phụ thuộc dữ liệu cũ hard-code ──
const m_jira = jira({
  key: "SE-14210", title: "Test thanh toán fail vì mã đơn hard-code 'DH-1001' đã bị xoá khỏi DB staging",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · chạy sau khi DB được dọn định kỳ"],
    ["Nguyên nhân", "Test viết cứng mã đơn 'DH-1001' có sẵn trên staging, không tự tạo dữ liệu riêng"],
    ["Ảnh hưởng", "Khi đơn 'DH-1001' bị xoá/đổi trạng thái do dọn dữ liệu định kỳ, test báo lỗi dù luồng thanh toán vẫn hoạt động đúng"],
    ["Đề xuất", "Chuyển sang tạo đơn hàng riêng qua API ngay trong fixture của từng test, không phụ thuộc dữ liệu có sẵn"],
  ],
});

// ── Mockup 6: bảng kanban nợ kỹ thuật do dữ liệu test không được cô lập/dọn dẹp ──
const m_kanban = kanban("Nợ kỹ thuật do dữ liệu test không cô lập (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14225", title: "10 test cùng dùng 1 tài khoản 'demo@shopeasy.vn'", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14210", title: "Refactor test thanh toán sang tạo đơn qua API", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14198", title: "Thêm teardown xoá tài khoản test sau mỗi lần chạy CI", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14180", title: "Tạo fixture testAccount dùng chung cho cả bộ test", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Fixture trong automation testing là gì?",
  "What is a fixture in automation testing?",
  "Fixture là một khối chuẩn bị (setup) chạy trước khi test thực thi — ví dụ tạo tài khoản, tạo đơn hàng, mở kết nối — và có thể tự động dọn dẹp (teardown) ngay sau khi test kết thúc, dù test đó pass hay fail. Trong Playwright, fixture được khai báo bằng test.extend() và test chỉ cần khai báo tên fixture cần dùng trong tham số của hàm test.",
  "A fixture is a setup block that runs before a test executes — for example creating an account, creating an order, opening a connection — and can automatically clean up (teardown) right after the test finishes, whether it passed or failed. In Playwright, fixtures are declared with test.extend(), and a test simply declares the fixture name it needs in its function parameters.",
  "自動化テストにおけるフィクスチャとは何？",
  "フィクスチャとは、テストが実行される前に走る準備（セットアップ）ブロックです——例えばアカウント作成、注文作成、接続オープンなど——そしてテストが合格しても失敗しても、テスト終了直後に自動で後片付け（ティアダウン）できます。Playwrightではtest.extend()でフィクスチャを宣言し、テストはその関数の引数に必要なフィクスチャ名を書くだけで使えます。");
const faq2 = FAQ(
  "Vì sao không nên tạo dữ liệu test bằng cách thao tác qua giao diện (UI)?",
  "Why shouldn't test data be created by interacting with the UI?",
  "Không phải KHÔNG BAO GIỜ được tạo qua UI — mà nên dành thao tác UI cho đúng phần đang muốn kiểm thử. Nếu bài test đang kiểm tra tính năng thanh toán nhưng lại phải điền form đăng ký, đăng nhập, thêm sản phẩm vào giỏ chỉ để CÓ dữ liệu, thì phần chuẩn bị đó vừa chậm vừa dễ vỡ khi UI đổi. Tạo dữ liệu nền qua API/DB nhanh hơn nhiều lần, ổn định hơn, và giữ test tập trung đúng vào điều cần kiểm chứng.",
  "It's not that you should NEVER create data via the UI — UI interaction should be reserved for the exact feature under test. If a test is verifying checkout but must fill a signup form, log in, and add items to cart just to HAVE data, that setup is both slow and fragile whenever the UI changes. Creating background data via API/DB is many times faster, more stable, and keeps the test focused on what actually needs verifying.",
  "なぜUI操作でテストデータを作成すべきではないの？",
  "『絶対にUI経由で作ってはいけない』わけではなく、UI操作はまさにテスト対象の機能のために取っておくべきということです。決済機能を検証するテストなのに、データを『用意するためだけ』に登録フォーム入力、ログイン、カートへの商品追加を行わなければならないなら、その準備は遅い上にUIが変わるたびに壊れやすくなります。API/DB経由で背景データを作成すれば、はるかに速く、より安定し、テストが本当に検証すべきことに集中できます。");
const faq3 = FAQ(
  "Nếu quên viết teardown (dọn dữ liệu) thì hậu quả thực tế là gì?",
  "What actually happens in practice if you forget to write teardown (data cleanup)?",
  "Dữ liệu test sẽ tồn đọng lại sau mỗi lần chạy: tài khoản test chất đống, đơn hàng test lẫn vào dữ liệu thật, và những lần chạy sau có thể tình cờ 'thấy' dữ liệu cũ này rồi cho kết quả sai — ví dụ test đếm số đơn hàng của 1 tài khoản sẽ đếm nhầm cả đơn của lần chạy trước. Về lâu dài, database môi trường test phình to, chậm dần, và niềm tin vào kết quả test giảm sút vì không ai chắc dữ liệu đang thấy là 'sạch' hay là rác tồn đọng.",
  "Test data piles up after every run: test accounts accumulate, test orders mix in with real-looking data, and later runs may accidentally 'see' this leftover data and produce wrong results — for example, a test counting an account's orders would miscount by including orders from a previous run. Over time, the test environment's database grows bloated and slower, and trust in test results erodes because no one is sure whether the data they're seeing is 'clean' or leftover junk.",
  "ティアダウン（データの後片付け）を書き忘れると実際にはどうなる？",
  "実行のたびにテストデータが積み重なります：テストアカウントが山積みになり、テスト用の注文が実データのように紛れ込み、後の実行がこの残留データを偶然『見て』誤った結果を出すことがあります——例えば、あるアカウントの注文数を数えるテストが、前回実行の注文まで数えてしまうといった具合です。長期的にはテスト環境のデータベースが肥大化して遅くなり、見ているデータが『きれい』なのか残留ゴミなのか誰も確信が持てなくなり、テスト結果への信頼が落ちていきます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao dữ liệu test cho automation nên độc lập và lặp lại được (repeatable)?", en: "Why should automation test data be independent and repeatable?", ja: "自動化のテストデータはなぜ独立していて繰り返し可能であるべき？" },
    options: [
      { vi: "Để mỗi lần chạy test đều xuất phát từ trạng thái dữ liệu giống nhau, không phụ thuộc kết quả của lần chạy trước hay của test khác", en: "So every test run starts from the same data state, without depending on the result of a previous run or another test", ja: "テストを実行するたびに、前回の実行や他のテストの結果に依存せず、同じデータ状態から始められるようにするため" },
      { vi: "Để dữ liệu test trông giống hệt dữ liệu thật trên production", en: "So test data looks exactly like real production data", ja: "テストデータを本番データと全く同じに見せるため" },
      { vi: "Để giảm số lượng test case cần viết", en: "To reduce the number of test cases that need to be written", ja: "書くべきテストケースの数を減らすため" },
      { vi: "Để không cần viết assert/expect trong test", en: "So there's no need to write assert/expect in the test", ja: "テストにassert/expectを書く必要をなくすため" },
    ], correct: 0,
    explain: { vi: "Dữ liệu độc lập và lặp lại được giúp mọi lần chạy cho kết quả đáng tin cậy, không bị ảnh hưởng bởi thứ tự chạy hay dữ liệu tồn đọng từ trước.", en: "Independent, repeatable data means every run gives a trustworthy result, unaffected by run order or leftover data from before.", ja: "独立して繰り返し可能なデータにより、実行順序や以前の残留データに左右されず、毎回信頼できる結果が得られます。" },
  }),
  mcq({
    q: { vi: "Fixture trong Playwright dùng để làm gì?", en: "What is a fixture used for in Playwright?", ja: "Playwrightにおいて、フィクスチャは何のために使う？" },
    options: [
      { vi: "Chỉ dùng để chụp ảnh màn hình khi test lỗi", en: "Only used to take a screenshot when a test fails", ja: "テスト失敗時にスクリーンショットを撮るためだけに使う" },
      { vi: "Chuẩn bị (setup) dữ liệu/môi trường trước khi test chạy, và dọn dẹp (teardown) sau khi test xong", en: "Prepare (setup) data/environment before a test runs, and clean up (teardown) after the test finishes", ja: "テスト実行前にデータ/環境を準備（セットアップ）し、テスト終了後に後片付け（ティアダウン）する" },
      { vi: "Thay thế hoàn toàn việc viết câu assert/expect", en: "Completely replace the need to write assert/expect statements", ja: "assert/expect文を書く必要を完全に置き換える" },
      { vi: "Chỉ hoạt động khi chạy trên trình duyệt Chrome", en: "Only works when running on the Chrome browser", ja: "Chromeブラウザで実行するときだけ動作する" },
    ], correct: 1,
    explain: { vi: "Fixture gói gọn phần setup trước use() và teardown sau use(), giúp test chỉ cần khai báo tên fixture cần dùng.", en: "A fixture wraps the setup before use() and the teardown after use(), so a test only needs to declare the fixture name it needs.", ja: "フィクスチャはuse()の前のセットアップとuse()の後のティアダウンをまとめており、テストは必要なフィクスチャ名を宣言するだけで済みます。" },
  }),
  mcq({
    q: { vi: "Vì sao nên tạo dữ liệu nền (background data) qua API/DB thay vì qua giao diện (UI)?", en: "Why should background data be created via API/DB instead of through the UI?", ja: "なぜ背景データはUI経由ではなくAPI/DB経由で作成すべき？" },
    options: [
      { vi: "Vì giao diện UI luôn chứa lỗi không thể tin tưởng", en: "Because the UI always contains bugs that can't be trusted", ja: "UIには常に信頼できないバグが含まれているから" },
      { vi: "Vì tạo qua API/DB nhanh hơn nhiều, ổn định hơn, và không phụ thuộc các bước UI có thể thay đổi", en: "Because creating via API/DB is much faster, more stable, and doesn't depend on UI steps that may change", ja: "API/DB経由の作成の方がはるかに速く、より安定していて、変わる可能性のあるUIの手順に依存しないから" },
      { vi: "Vì gọi API thì không cần xác thực (authentication)", en: "Because calling an API requires no authentication", ja: "APIを呼ぶには認証が不要だから" },
      { vi: "Vì giao diện ShopEasy không hỗ trợ chức năng đăng nhập", en: "Because the ShopEasy UI doesn't support a login feature", ja: "ShopEasyのUIはログイン機能をサポートしていないから" },
    ], correct: 1,
    explain: { vi: "API/DB tạo dữ liệu nhanh và ổn định hơn hẳn, để dành thao tác UI cho đúng phần đang cần kiểm thử.", en: "API/DB creates data far faster and more stably, reserving UI interaction for the exact part that needs testing.", ja: "API/DBの方がデータ作成が遥かに速く安定しており、UI操作は本当にテストが必要な部分のために取っておけます。" },
  }),
  mcq({
    q: { vi: "Điều gì dễ xảy ra nhất nếu quên dọn dữ liệu (teardown) sau khi test chạy xong?", en: "What is most likely to happen if you forget to clean up (teardown) data after a test finishes?", ja: "テスト終了後にデータの後片付け（ティアダウン）を忘れると、最も起こりやすいことは？" },
    options: [
      { vi: "Test luôn chạy nhanh hơn vì có nhiều dữ liệu sẵn để dùng lại", en: "Tests always run faster because there's more leftover data to reuse", ja: "再利用できるデータが増えるため、テストが常に速く実行される" },
      { vi: "Dữ liệu tồn đọng có thể khiến lần chạy sau bị trùng lặp hoặc fail vì trạng thái ban đầu đã khác so với mong đợi", en: "Leftover data can cause the next run to hit duplicates or fail because the starting state differs from what's expected", ja: "残留データが原因で、次回の実行が重複したり、想定と異なる初期状態のため失敗したりする可能性がある" },
      { vi: "Không có ảnh hưởng gì vì hệ thống sẽ tự động dọn sạch mọi database mỗi đêm", en: "There is no impact at all because the system automatically wipes every database every night", ja: "システムが毎晩すべてのデータベースを自動で消去するため、全く影響はない" },
      { vi: "Test sẽ tự động bỏ qua toàn bộ các bước cần dùng tới dữ liệu", en: "Tests will automatically skip every step that needs data", ja: "テストはデータを必要とするすべての手順を自動的にスキップする" },
    ], correct: 1,
    explain: { vi: "Dữ liệu tồn đọng làm lệch trạng thái ban đầu, dẫn tới lần chạy sau dễ trùng lặp, đếm sai, hoặc fail dù tính năng vẫn đúng.", en: "Leftover data shifts the starting state, making later runs prone to duplicates, miscounts, or failures even though the feature itself is fine.", ja: "残留データによって初期状態がずれ、機能自体は正常でも、後の実行が重複や誤カウント、失敗を起こしやすくなります。" },
  }),
  mcq({
    q: { vi: "Vì sao nhiều test chạy song song KHÔNG nên dùng chung 1 tài khoản/1 bộ dữ liệu?", en: "Why shouldn't many tests running in parallel share the same account or the same dataset?", ja: "並行して実行される多くのテストが、なぜ同じ1つのアカウント/データセットを共有すべきではない？" },
    options: [
      { vi: "Vì Playwright không hỗ trợ chạy test song song", en: "Because Playwright doesn't support running tests in parallel", ja: "Playwrightはテストの並行実行をサポートしていないから" },
      { vi: "Vì các test có thể đọc/ghi đồng thời lên cùng dữ liệu, gây đụng độ và kết quả không đáng tin cậy", en: "Because tests may read/write the same data at the same time, causing collisions and unreliable results", ja: "テストが同時に同じデータを読み書きし、衝突を起こして結果が信頼できなくなる可能性があるから" },
      { vi: "Vì mỗi tài khoản dùng chung sẽ tự động bị hệ thống khoá lại", en: "Because a shared account will automatically get locked by the system", ja: "共有アカウントはシステムによって自動的にロックされるから" },
      { vi: "Vì mỗi tài khoản chỉ được phép đăng nhập đúng 1 lần duy nhất trong đời", en: "Because each account can only ever log in exactly once", ja: "各アカウントは生涯で一度しかログインできないから" },
    ], correct: 1,
    explain: { vi: "Khi nhiều test song song cùng đụng vào 1 tài khoản/đơn hàng, thao tác của test này có thể ghi đè hoặc làm lệch dữ liệu mà test kia đang kiểm tra.", en: "When many parallel tests touch the same account/order, one test's actions can overwrite or shift the data another test is checking.", ja: "多くの並行テストが同じアカウント/注文に触れると、あるテストの操作が別のテストが検証しているデータを上書きしたりずらしたりする可能性があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & vì sao dữ liệu test quan trọng", en: "1. TL;DR & why test data matters", ja: "1. 要点とテストデータが重要な理由" },
    blocks: [
      TLDR("Chuẩn bị dữ liệu test là bước nền tảng của automation: mỗi test cần dữ liệu của RIÊNG mình, độc lập với test khác, và có thể tạo lại y hệt ở bất kỳ lần chạy nào (repeatable). Bài này bám app TMĐT ShopEasy: bạn học vì sao dữ liệu dùng chung gây lỗi khó lường, khái niệm fixture với setup/teardown, cách tạo tài khoản/đơn hàng qua API thay vì qua giao diện, cách dọn dữ liệu sau test, và cách giữ test không phụ thuộc lẫn nhau — có code Playwright chạy được, nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Preparing test data is a foundational step of automation: every test needs its OWN data, independent from other tests, and re-creatable identically on any run (repeatable). This article follows the ShopEasy e-commerce app: you'll learn why shared data causes unpredictable failures, the fixture concept with setup/teardown, how to create accounts/orders via API instead of the UI, how to clean up data after tests, and how to keep tests independent of each other — with runnable Playwright code, plenty of visuals, and a quiz at the end.",
        "テストデータの準備は自動化の土台となるステップです：各テストは他のテストから独立した『自分専用』のデータを必要とし、どの実行でも全く同じように再現できる（繰り返し可能）必要があります。本記事はECアプリShopEasyに沿い、共有データがなぜ予測しづらい失敗を招くか、setup/teardownを伴うフィクスチャの概念、UIではなくAPI経由でアカウント/注文を作成する方法、テスト後のデータの後片付け、そしてテスト同士を独立させておく方法を学びます——動くPlaywrightコード、豊富な図、そして最後にクイズ付き。"),
      P("Chào bạn mới! Khi bắt đầu viết test automation, phần lớn người mới tập trung vào việc thao tác giao diện: bấm nút, điền form, kiểm tra kết quả hiện ra. Nhưng có một câu hỏi âm thầm quyết định test của bạn có đáng tin hay không: dữ liệu bạn đang test LÀ dữ liệu gì, TỪ ĐÂU mà có, và LIỆU nó có còn nguyên vẹn ở lần chạy tiếp theo? Nếu test 'mượn' một tài khoản có sẵn, một đơn hàng ai đó tạo trước, kết quả hôm nay đúng không có nghĩa ngày mai vẫn đúng — vì dữ liệu đó có thể đã bị người khác đổi, xoá, hoặc dùng chung với 1 test khác đang chạy song song. Chuẩn bị dữ liệu test đúng cách chính là nền móng giúp automation đáng tin cậy lâu dài, và đó là điều bài này sẽ giúp bạn làm chủ qua ví dụ thật với ShopEasy.",
        "Hi, newcomer! When you start writing automated tests, most beginners focus on interacting with the UI: clicking buttons, filling forms, checking what appears. But there's a quiet question that decides whether your test can be trusted: what data are you actually testing WITH, WHERE did it come from, and WILL it still be intact on the next run? If a test 'borrows' an existing account, or an order someone else created earlier, today's correct result doesn't guarantee tomorrow's — because that data may have been changed, deleted, or shared with another test running in parallel. Preparing test data properly is exactly the foundation that makes automation trustworthy over the long run, and this article will help you master it through real ShopEasy examples.",
        "こんにちは、初心者さん！自動テストを書き始めると、多くの初心者はUI操作——ボタンを押す、フォームに入力する、表示された結果を確認する——に集中します。しかし、あなたのテストが信頼できるかどうかを静かに左右する問いがあります：テストしているデータは一体何で、どこから来て、次の実行でもそのまま残っているのでしょうか？既存のアカウントや誰かが以前作った注文を『借りて』テストしていると、今日正しかった結果が明日も正しいとは限りません——そのデータは誰かに変更されたり、削除されたり、並行実行中の別のテストと共有されたりしているかもしれないからです。テストデータを正しく準備することこそが、長期的に自動化を信頼できるものにする土台であり、本記事は実際のShopEasyの例を通じてそれを習得する手助けをします。"),
      IMG(m_account, "Màn hình ShopEasy: tài khoản và đơn hàng được tạo riêng cho mỗi lần chạy test, không lẫn với dữ liệu khác", "ShopEasy screen: an account and order created just for this test run, not mixed with other data", "ShopEasy画面：このテスト実行専用に作成されたアカウントと注文、他のデータとは混ざらない"),
      DEF("Dữ liệu test (test data)", "toàn bộ dữ liệu (tài khoản, đơn hàng, sản phẩm...) mà một kịch bản test cần có sẵn để chạy và kiểm tra kết quả, có thể là dữ liệu có sẵn hoặc do chính test tự tạo ra.",
        "all the data (accounts, orders, products...) a test scenario needs available to run and verify its result, which may be pre-existing data or data the test creates itself.",
        "テストシナリオが実行され結果を検証するために必要とするすべてのデータ（アカウント、注文、商品など）で、既存のデータの場合もあれば、テスト自身が作成するデータの場合もある。"),
    ] },
  { heading: { vi: "2. Vấn đề: test dùng chung dữ liệu, kết quả không đáng tin", en: "2. The problem: tests sharing data, unreliable results", ja: "2. 問題：データを共有するテスト、信頼できない結果" },
    blocks: [
      P("Hãy hình dung đội automation ShopEasy viết 20 test, và cả 20 test đều đăng nhập bằng đúng 1 tài khoản 'demo@shopeasy.vn' có sẵn trên môi trường staging. Ban đầu mọi thứ chạy ổn — cho tới khi 2 test cùng cập nhật giỏ hàng của tài khoản này cùng lúc: một test đang kiểm tra 'giỏ hàng trống sau khi xoá hết', test kia lại vừa thêm 2 sản phẩm vào giỏ để test 'tính tổng tiền'. Cả hai chạy song song, và tuỳ vào việc ai 'thắng' trước, một trong hai test sẽ fail dù code tính năng hoàn toàn đúng.",
        "Imagine ShopEasy's automation team writes 20 tests, and all 20 log in with the exact same 'demo@shopeasy.vn' account that already exists on staging. At first everything runs fine — until two tests update this account's cart at the same time: one test is checking 'cart empty after clearing everything', while another just added 2 products to the cart to test 'total calculation'. Both run in parallel, and depending on which one 'wins' first, one of them fails even though the feature code is entirely correct.",
        "ShopEasyの自動化チームが20個のテストを書き、その20個すべてがステージング環境に既にある同じ『demo@shopeasy.vn』アカウントでログインすると想像してください。最初はすべて順調です——2つのテストが同時にこのアカウントのカートを更新するまでは：あるテストは『全部削除した後カートが空』であることを検証中で、もう1つのテストは『合計金額の計算』をテストするためカートに商品を2つ追加したばかりです。両方が並行して実行され、どちらが先に『勝つ』かによって、機能のコードは完全に正しいのにどちらかのテストが失敗します。"),
      P("Vấn đề không dừng ở đó. Khi 1 test khác vô tình xoá tài khoản 'demo@shopeasy.vn' để kiểm tra tính năng 'xoá tài khoản', mọi test còn lại dùng chung tài khoản này sẽ đồng loạt fail — không phải vì tính năng của chúng có lỗi, mà vì dữ liệu chúng cần đã biến mất. Đây là dấu hiệu rõ ràng nhất của một bộ test 'giòn': kết quả phụ thuộc vào thứ tự chạy, vào việc test nào chạy trước, và vào việc có ai đó đang đụng vào cùng dữ liệu hay không — những thứ mà bản thân tính năng cần kiểm thử không hề liên quan.",
        "The problem doesn't stop there. When another test accidentally deletes the 'demo@shopeasy.vn' account while verifying the 'delete account' feature, every remaining test sharing this account fails at once — not because their features have bugs, but because the data they need has vanished. This is the clearest sign of a 'brittle' test suite: results depend on run order, on which test happens to run first, and on whether someone else is touching the same data — none of which has anything to do with the feature actually being tested.",
        "問題はそれだけではありません。別のテストが『アカウント削除』機能を検証する際に誤って『demo@shopeasy.vn』アカウントを削除すると、このアカウントを共有している残りのすべてのテストが一斉に失敗します——それらの機能にバグがあるからではなく、必要なデータが消えてしまったからです。これは『脆い』テストスイートの最も明確な兆候です：結果が実行順序、どのテストがたまたま先に実行されるか、そして誰かが同じデータに触れているかどうかに左右される——それらはテスト対象の機能自体とは何の関係もありません。"),
      DEF("Cô lập dữ liệu (data isolation)", "nguyên tắc mỗi test dùng dữ liệu của riêng nó, không đọc/ghi lên dữ liệu mà test khác cũng đang dùng, để kết quả không bị ảnh hưởng bởi test khác.",
        "the principle that each test uses its own data and doesn't read/write data another test is also using, so its result isn't affected by other tests.",
        "各テストが自分専用のデータを使い、他のテストも使っているデータを読み書きしないという原則で、結果が他のテストに左右されないようにするもの。"),
    ] },
  { heading: { vi: "3. Fixture là gì & vì sao gắn liền với dữ liệu test", en: "3. What a fixture is & why it's tied to test data", ja: "3. フィクスチャとは何か・なぜテストデータと結びついているか" },
    blocks: [
      P("Fixture là cách Playwright (và nhiều framework automation khác) chuẩn hoá việc chuẩn bị và dọn dẹp mọi thứ một test cần — trong đó dữ liệu test là ví dụ phổ biến nhất. Một fixture gồm 2 giai đoạn: phần đứng TRƯỚC use() là setup (tạo tài khoản, tạo đơn hàng...), phần đứng SAU use() là teardown (xoá dữ liệu vừa tạo). Test chỉ cần khai báo tên fixture mình cần trong tham số hàm test, Playwright tự lo phần còn lại — kể cả khi test đó fail giữa chừng, teardown vẫn được đảm bảo chạy.",
        "A fixture is how Playwright (and many other automation frameworks) standardizes preparing and cleaning up everything a test needs — with test data being the most common example. A fixture has 2 phases: the part BEFORE use() is setup (creating an account, creating an order...), the part AFTER use() is teardown (deleting the data just created). A test simply declares the fixture name it needs in its function parameters, and Playwright handles the rest — even if that test fails midway, teardown is still guaranteed to run.",
        "フィクスチャは、Playwright（および他の多くの自動化フレームワーク）がテストに必要なあらゆるものの準備と後片付けを標準化する仕組みです——その中でもテストデータは最も一般的な例です。フィクスチャには2つの段階があります：use()の前の部分がセットアップ（アカウント作成、注文作成など）、use()の後の部分がティアダウン（作成したデータの削除）です。テストは関数の引数に必要なフィクスチャ名を宣言するだけで、残りはPlaywrightが処理します——そのテストが途中で失敗しても、ティアダウンは確実に実行されます。"),
      IMG(m_fixtureTypes, "Các loại fixture thường dùng khi chuẩn bị dữ liệu test cho ShopEasy", "The kinds of fixtures commonly used to prepare test data for ShopEasy", "ShopEasyのテストデータ準備によく使われるフィクスチャの種類"),
      P("Điểm mấu chốt của fixture không nằm ở cú pháp, mà ở TƯ DUY: thay vì mỗi test tự tay tạo dữ liệu theo cách riêng (và dễ quên dọn), bạn định nghĩa MỘT nơi duy nhất biết cách tạo đúng loại dữ liệu đó, và mọi test chỉ cần 'mượn' fixture này. Nhờ vậy, nếu sau này cách tạo tài khoản test thay đổi (ví dụ thêm trường bắt buộc), bạn chỉ cần sửa đúng 1 fixture, thay vì rà từng test.",
        "The key point of a fixture isn't the syntax — it's the MINDSET: instead of every test hand-crafting its own data its own way (and easily forgetting to clean up), you define ONE single place that knows how to create that kind of data correctly, and every test simply 'borrows' this fixture. So if the way test accounts are created later changes (say, a required field is added), you only need to fix that one fixture, instead of hunting through every test.",
        "フィクスチャの要点は構文ではなく、考え方にあります：各テストがそれぞれ独自のやり方でデータを手作りする（そして片付けを忘れやすい）代わりに、その種のデータを正しく作る方法を知っている場所を1つだけ定義し、すべてのテストはこのフィクスチャを『借りる』だけです。そのおかげで、後にテストアカウントの作成方法が変わっても（例えば必須項目が追加されても）、各テストを探し回るのではなく、そのフィクスチャ1つだけを直せば済みます。"),
      TIP("Đặt tên fixture theo đúng dữ liệu nó tạo ra (testAccount, testOrder...) để bất kỳ ai đọc tên tham số trong hàm test cũng đoán được dữ liệu đang dùng là gì.", "Name fixtures after the exact data they create (testAccount, testOrder...) so anyone reading the test function's parameter names can guess what data is being used.", "フィクスチャはそれが作るデータそのままの名前を付けよう（testAccount、testOrderなど）。テスト関数の引数名を読む誰もが、使われているデータが何か推測できるように。"),
    ] },
  { heading: { vi: "4. Setup → Test → Teardown: vòng đời của 1 fixture", en: "4. Setup → Test → Teardown: a fixture's lifecycle", ja: "4. Setup → Test → Teardown：フィクスチャのライフサイクル" },
    blocks: [
      P("Mỗi lần một test khai báo dùng fixture testAccount, vòng đời diễn ra theo đúng 3 bước: (1) Setup — Playwright chạy đoạn code trước use(), gọi API tạo tài khoản mới; (2) Test — hàm use(account) trả tài khoản đó vào test, và toàn bộ thân test chạy với dữ liệu này; (3) Teardown — ngay sau khi test kết thúc (bất kể pass hay fail), đoạn code sau use() chạy tiếp để gọi API xoá tài khoản vừa tạo. Ba bước này lặp lại độc lập cho MỖI test, nên 2 test chạy song song sẽ có 2 tài khoản hoàn toàn khác nhau.",
        "Every time a test declares it uses the testAccount fixture, its lifecycle follows exactly 3 steps: (1) Setup — Playwright runs the code before use(), calling the API to create a new account; (2) Test — the use(account) call passes that account into the test, and the entire test body runs with this data; (3) Teardown — right after the test finishes (pass or fail), the code after use() continues, calling the API to delete the account just created. These 3 steps repeat independently for EACH test, so two tests running in parallel get two completely different accounts.",
        "テストがtestAccountフィクスチャを使うと宣言するたびに、ライフサイクルは正確に3つのステップをたどります：(1) Setup — Playwrightがuse()の前のコードを実行し、APIを呼んで新しいアカウントを作成する；(2) Test — use(account)の呼び出しがそのアカウントをテストに渡し、テスト本体全体がこのデータで実行される；(3) Teardown — テスト終了直後（合格でも失敗でも）、use()の後のコードが続けて実行され、作成したばかりのアカウントを削除するAPIを呼ぶ。この3つのステップは各テストごとに独立して繰り返されるため、並行実行される2つのテストは全く異なる2つのアカウントを持つことになります。"),
      IMG(m_flow, "Vòng đời chuẩn bị dữ liệu qua fixture: Setup tạo dữ liệu, Test dùng dữ liệu, Teardown xoá dữ liệu", "The data-prep lifecycle through a fixture: Setup creates the data, Test uses it, Teardown deletes it", "フィクスチャによるデータ準備のライフサイクル：Setupがデータを作成し、Testがそれを使い、Teardownが削除する"),
      P("Điều làm nên sự khác biệt so với việc tự viết setup/dọn dẹp thủ công trong từng test là TÍNH ĐẢM BẢO: teardown của fixture chạy ngay cả khi test throw lỗi giữa chừng, vì Playwright quản lý phần này ở khung chạy test, không phụ thuộc vào việc bạn có nhớ gọi hàm dọn dẹp ở cuối file hay không. Đây chính là lý do fixture là công cụ đúng đắn để chuẩn bị dữ liệu test, thay vì viết tay từng bước setup/cleanup rải rác trong mỗi file.",
        "What sets this apart from hand-writing setup/cleanup manually in each test is the GUARANTEE: a fixture's teardown runs even if the test throws an error midway, because Playwright manages this at the test runner level, independent of whether you remembered to call a cleanup function at the end of the file. This is exactly why fixtures are the right tool for preparing test data, instead of hand-writing scattered setup/cleanup steps in every file.",
        "各テストで手作業でセットアップ/後片付けを書くのと違う点は、その保証にあります：フィクスチャのティアダウンは、テストが途中でエラーをスローしても実行されます。なぜならPlaywrightがこれをテストランナーのレベルで管理しており、ファイルの最後で後片付け関数を呼ぶのを覚えていたかどうかに依存しないからです。これこそが、各ファイルに散らばった手書きのセットアップ/クリーンアップ手順の代わりに、フィクスチャがテストデータ準備に適したツールである理由です。"),
    ] },
  { heading: { vi: "5. Tạo dữ liệu qua API/DB thay vì qua giao diện", en: "5. Creating data via API/DB instead of the UI", ja: "5. UIではなくAPI/DB経由でデータを作成する" },
    blocks: [
      P("Có một câu hỏi người mới hay bỏ qua: khi cần 1 tài khoản để test giỏ hàng, nên tạo tài khoản đó bằng cách nào — điền form đăng ký trên giao diện, hay gọi thẳng API tạo tài khoản? Câu trả lời gần như luôn là API/DB, TRỪ KHI chính bài test đó đang kiểm thử tính năng đăng ký. Lý do rất thực tế: mỗi bước UI (mở trang, điền ô, chờ phản hồi, chờ redirect) tốn thời gian và có thể fail vì lý do không liên quan gì tới dữ liệu — ví dụ 1 ô input đổi id, 1 bước xác thực OTP mới được thêm vào.",
        "There's a question beginners often overlook: when you need an account to test the cart, how should that account be created — by filling out the signup form on the UI, or by calling the account-creation API directly? The answer is almost always API/DB, UNLESS the test itself is specifically verifying the signup feature. The reason is very practical: every UI step (opening a page, filling a field, waiting for a response, waiting for a redirect) takes time and can fail for reasons entirely unrelated to the data — say, an input field's id changed, or a new OTP verification step was added.",
        "初心者がよく見落とす疑問があります：カートをテストするためにアカウントが必要なとき、そのアカウントはどう作成すべきか——UI上で登録フォームに入力するか、それともアカウント作成APIを直接呼ぶか？答えはほぼ常にAPI/DBです、そのテスト自体が登録機能を具体的に検証している場合を除いては。理由は非常に実用的です：UIの各手順（ページを開く、欄に入力する、応答を待つ、リダイレクトを待つ）は時間がかかり、データとは全く無関係な理由——例えば入力欄のidが変わった、新しいOTP認証手順が追加された——で失敗する可能性があります。"),
      IMG(m_uiapi, "So sánh tạo dữ liệu test qua giao diện (UI) và qua API/DB", "Comparing creating test data via the UI versus via API/DB", "UI経由とAPI/DB経由のテストデータ作成の比較"),
      P("Nguyên tắc gọn để nhớ: chỉ dùng UI cho ĐÚNG PHẦN bạn đang kiểm thử; mọi dữ liệu 'nền' cần có để test phần đó — tài khoản đã đăng nhập, sản phẩm đã có sẵn, đơn hàng ở trạng thái nào đó — nên tạo qua API/DB. Khi áp dụng đúng nguyên tắc này, bộ test của bạn vừa chạy nhanh hơn hẳn (vì bớt bước UI không cần thiết), vừa ổn định hơn (vì ít phụ thuộc vào các bước UI có thể đổi).",
        "A simple rule to remember: only use the UI for the EXACT part you're testing; all 'background' data needed to test that part — a logged-in account, a product already in stock, an order in some state — should be created via API/DB. Applying this rule correctly makes your test suite run noticeably faster (fewer unnecessary UI steps) and more stable (fewer dependencies on UI steps that might change).",
        "覚えておくべきシンプルな原則：UIはまさにテストしている部分のためだけに使い、その部分をテストするために必要な『背景』データ——ログイン済みアカウント、既に在庫のある商品、ある状態の注文——はAPI/DB経由で作成すべきです。この原則を正しく適用すれば、テストスイートは明らかに速く実行され（不要なUI手順が減るため）、より安定します（変わる可能性のあるUI手順への依存が減るため）。"),
      TIP("Nếu chưa có endpoint API tạo dữ liệu, hãy đề xuất với đội backend thêm 1 API 'chỉ dùng cho test' (test-only) trên môi trường staging — chi phí thêm 1 API nhỏ rẻ hơn rất nhiều so với việc cả bộ test chậm và giòn vì luôn phải qua UI.", "If there's no API endpoint to create data yet, propose to the backend team adding one small 'test-only' API on the staging environment — the cost of one small API is far cheaper than an entire test suite that's slow and brittle from always going through the UI.", "データ作成用のAPIエンドポイントがまだない場合、ステージング環境に『テスト専用』の小さなAPIを1つ追加するようバックエンドチームに提案しよう——小さなAPI1つのコストは、常にUIを経由するために遅くて脆いテストスイート全体よりもはるかに安い。"),
    ] },
  { heading: { vi: "6. Viết fixture Playwright đầu tiên: testAccount (thực hành)", en: "6. Writing your first Playwright fixture: testAccount (hands-on)", ja: "6. 最初のPlaywrightフィクスチャを書く：testAccount（実習）" },
    blocks: [
      P("Giờ ta viết fixture đầu tiên cho ShopEasy: mỗi test sẽ có 1 tài khoản riêng, tự tạo trước khi chạy và tự xoá sau khi xong. Làm theo thứ tự dưới đây.",
        "Now let's write the first fixture for ShopEasy: every test gets its own account, auto-created before running and auto-deleted afterward. Follow the order below.",
        "では、ShopEasyのために最初のフィクスチャを書きましょう：各テストは実行前に自動作成され、終了後に自動削除される専用アカウントを持ちます。以下の順に進めましょう。"),
      STEP(1, "Tạo file fixtures/testData.js, import test/expect gốc từ @playwright/test.", "Create fixtures/testData.js, importing the base test/expect from @playwright/test.", "fixtures/testData.jsを作成し、@playwright/testから元のtest/expectをインポートする。"),
      STEP(2, "Gọi baseTest.extend({...}) để khai báo fixture 'testAccount' mới.", "Call baseTest.extend({...}) to declare a new 'testAccount' fixture.", "baseTest.extend({...})を呼び、新しい'testAccount'フィクスチャを宣言する。"),
      STEP(3, "Trong phần TRƯỚC use(): gọi request.post tạo tài khoản với email gắn timestamp để không trùng giữa các lần chạy.", "In the part BEFORE use(): call request.post to create an account with a timestamp-suffixed email so it never collides across runs.", "use()の前の部分で、実行間で衝突しないようタイムスタンプ付きのメールでアカウントを作成するrequest.postを呼ぶ。"),
      STEP(4, "Gọi await use(account) để đưa tài khoản vào test, rồi viết phần TEARDOWN ngay sau đó để gọi request.delete xoá tài khoản.", "Call await use(account) to hand the account to the test, then write the TEARDOWN part right after to call request.delete and remove the account.", "await use(account)を呼んでアカウントをテストに渡し、その直後にrequest.deleteを呼んでアカウントを削除するTEARDOWN部分を書く。"),
      CODE("javascript", "// fixtures/testData.js\nconst base = require('@playwright/test');\nconst { test: baseTest, expect } = base;\n\nconst test = baseTest.extend({\n  testAccount: async ({ request }, use) => {\n    // SETUP: tao tai khoan test rieng qua API, khong dung UI\n    const email = `qa.${Date.now()}@shopeasy.vn`;\n    const res = await request.post('https://api.shopeasy.vn/accounts', {\n      data: { email, password: 'Test@2024', fullName: 'QA Automation' },\n    });\n    const account = await res.json(); // { id, email, ... }\n\n    await use(account); // <-- than test chay o day, dung 'account' nay\n\n    // TEARDOWN: xoa tai khoan sau khi test xong, du pass hay fail\n    await request.delete(`https://api.shopeasy.vn/accounts/${account.id}`);\n  },\n});\n\nmodule.exports = { test, expect };"),
      TRY("Mở lại code trên và thử đổi fullName thành 1 tham số tuỳ chọn (overrides.fullName), để test nào cần tài khoản với tên riêng vẫn dùng được cùng 1 fixture.", "Open the code above and try turning fullName into an optional parameter (overrides.fullName), so a test needing an account with a specific name can still reuse the same fixture.", "上のコードを開き、fullNameをオプションのパラメータ（overrides.fullName）に変えてみよう。特定の名前のアカウントが必要なテストでも、同じフィクスチャを再利用できるように。"),
    ] },
  { heading: { vi: "7. Gọi API tạo tài khoản/đơn hàng cho từng ca test (thực hành)", en: "7. Calling the API to create accounts/orders per test case (hands-on)", ja: "7. テストケースごとにアカウント/注文を作成するAPIを呼ぶ（実習）" },
    blocks: [
      P("Không phải test nào cũng cần đúng 1 fixture cố định — nhiều khi bạn cần tạo dữ liệu với tham số khác nhau tuỳ ca test (ví dụ: 1 đơn hàng có 3 sản phẩm, đơn khác chỉ có 1). Lúc này, viết các hàm helper gọi API là cách linh hoạt hơn fixture cố định, và có thể dùng lại bên trong nhiều fixture khác nhau.",
        "Not every test needs exactly one fixed fixture — often you need to create data with different parameters depending on the test case (e.g. one order with 3 products, another with just 1). In this case, writing helper functions that call the API is more flexible than a fixed fixture, and can be reused inside many different fixtures.",
        "すべてのテストが1つの固定フィクスチャを必要とするわけではありません——テストケースによって異なるパラメータでデータを作成する必要がよくあります（例：3つの商品を含む注文と、1つだけの注文）。この場合、APIを呼ぶヘルパー関数を書く方が固定フィクスチャより柔軟で、さまざまなフィクスチャの中で再利用できます。"),
      STEP(1, "Tạo file fixtures/api-helpers.js chứa các hàm tạo dữ liệu độc lập với fixture.", "Create fixtures/api-helpers.js holding data-creation functions independent of any fixture.", "どのフィクスチャからも独立したデータ作成関数を持つfixtures/api-helpers.jsを作成する。"),
      STEP(2, "Viết createTestAccount(request, overrides) nhận tham số tuỳ chỉnh, mặc định vẫn sinh email theo timestamp.", "Write createTestAccount(request, overrides) that accepts custom parameters while still defaulting to a timestamp-based email.", "カスタムパラメータを受け取りつつ、デフォルトではタイムスタンプベースのメールを生成するcreateTestAccount(request, overrides)を書く。"),
      STEP(3, "Viết createTestOrder(request, accountId, items) gọi API tạo đơn hàng gắn với 1 tài khoản cụ thể.", "Write createTestOrder(request, accountId, items) calling the API to create an order tied to a specific account.", "特定のアカウントに紐づく注文を作成するAPIを呼ぶcreateTestOrder(request, accountId, items)を書く。"),
      CODE("javascript", "// fixtures/api-helpers.js\nasync function createTestAccount(request, overrides = {}) {\n  const email = overrides.email || `qa.${Date.now()}@shopeasy.vn`;\n  const res = await request.post('https://api.shopeasy.vn/accounts', {\n    data: { email, password: 'Test@2024', fullName: 'QA Automation', ...overrides },\n  });\n  return res.json(); // { id, email, ... }\n}\n\nasync function createTestOrder(request, accountId, items) {\n  const res = await request.post('https://api.shopeasy.vn/orders', {\n    data: { accountId, items, status: 'PENDING' },\n  });\n  return res.json(); // { id, code, total, ... }\n}\n\nmodule.exports = { createTestAccount, createTestOrder };"),
      P("Chú ý cả 2 hàm đều trả về dữ liệu mà API vừa tạo (kèm id) — đây là chi tiết quan trọng: có id nghĩa là bạn LUÔN biết chính xác bản ghi nào cần xoá ở bước teardown, thay vì phải đoán hoặc xoá nhầm dữ liệu của người khác.",
        "Notice both functions return the data the API just created (including an id) — this is an important detail: having an id means you ALWAYS know exactly which record needs deleting at teardown time, instead of guessing or accidentally deleting someone else's data.",
        "両方の関数がAPIが作成したばかりのデータ（idを含む）を返すことに注目してください——これは重要な細部です：idがあるということは、ティアダウンの際に削除すべきレコードを推測したり、誤って他人のデータを削除したりせず、常に正確に把握できるということです。"),
    ] },
  { heading: { vi: "8. Dọn dữ liệu sau test: teardown đúng cách (thực hành)", en: "8. Cleaning up after tests: proper teardown (hands-on)", ja: "8. テスト後のデータの後片付け：正しいティアダウン（実習）" },
    blocks: [
      P("Với dữ liệu tạo qua fixture (như testAccount ở chương 6), teardown gần như 'miễn phí' vì đã nằm sẵn trong fixture. Nhưng với dữ liệu tạo bằng helper function ngay trong thân test (như createTestOrder ở chương 7), bạn cần chủ động gọi API xoá — đúng ngay sau khi các bước kiểm tra kết thúc, để đảm bảo dữ liệu không tồn đọng dù test đó về sau có fail ở bước khác.",
        "For data created via a fixture (like testAccount in chapter 6), teardown is almost 'free' since it's already built into the fixture. But for data created by a helper function right inside the test body (like createTestOrder in chapter 7), you need to actively call the delete API — right after the verification steps finish, to make sure data doesn't linger even if that test later fails at another step.",
        "第6章のtestAccountのようにフィクスチャ経由で作成されたデータの場合、ティアダウンはほぼ『無料』です——すでにフィクスチャに組み込まれているからです。しかし第7章のcreateTestOrderのようにテスト本体内でヘルパー関数によって作成されたデータの場合、検証手順が終わった直後に削除APIを能動的に呼ぶ必要があります。そのテストが後で別の手順で失敗しても、データが残らないようにするためです。"),
      STEP(1, "Ngay sau assert/expect kiểm tra kết quả, gọi request.delete với id dữ liệu vừa tạo.", "Right after the assert/expect verifying the result, call request.delete with the id of the data just created.", "結果を検証するassert/expectの直後に、作成したばかりのデータのidでrequest.deleteを呼ぶ。"),
      STEP(2, "Nếu 1 test tạo nhiều bản ghi (vd nhiều đơn hàng), cân nhắc gom teardown vào test.afterEach() để không bỏ sót.", "If a test creates multiple records (e.g. several orders), consider grouping teardown into test.afterEach() so nothing is missed.", "テストが複数のレコード（例：複数の注文）を作成する場合、見落としがないようteardownをtest.afterEach()にまとめることを検討する。"),
      STEP(3, "Không nên coi teardown là 'tuỳ chọn' — hãy review teardown như review chính đoạn assert, vì thiếu nó sẽ âm thầm phá bộ test theo thời gian.", "Don't treat teardown as 'optional' — review teardown as carefully as you review the assertions themselves, because missing it will quietly break the test suite over time.", "ティアダウンを『任意』とみなさないこと——アサーション自体をレビューするのと同じくらい注意深くティアダウンをレビューしよう。それを怠ると、時間とともに静かにテストスイートを壊してしまうから。"),
      CODE("javascript", "// tests/checkout.spec.js\nconst { test, expect } = require('../fixtures/testData');\nconst { createTestOrder } = require('../fixtures/api-helpers');\n\ntest.describe('ShopEasy - Thanh toan', () => {\n  test('thanh toan don hang thanh cong', async ({ page, request, testAccount }) => {\n    const order = await createTestOrder(request, testAccount.id, [\n      { sku: 'SKU-001', qty: 2 },\n    ]);\n\n    await page.goto('https://shopeasy.vn/dang-nhap');\n    await page.fill('#email-input', testAccount.email);\n    await page.fill('#password-input', 'Test@2024');\n    await page.click('#btn-login');\n    await page.goto(`https://shopeasy.vn/don-hang/${order.code}`);\n    await page.click('#btn-thanh-toan');\n\n    await expect(page.locator('#order-status')).toHaveText('Da thanh toan');\n\n    // Don hang tao rieng cho test nay -> xoa ngay sau khi kiem tra xong\n    await request.delete(`https://api.shopeasy.vn/orders/${order.id}`);\n  });\n});"),
      TIP("testAccount ở test trên KHÔNG cần tự xoá trong file test — fixture đã lo teardown đó. Bạn chỉ cần tự dọn những gì bạn tự tạo NGOÀI fixture (ở đây là order).", "The testAccount in the test above does NOT need manual deletion in the test file — the fixture already handles that teardown. You only need to clean up what you created OUTSIDE the fixture (here, the order).", "上のテストのtestAccountはテストファイル内で手動削除する必要はない——フィクスチャがすでにそのティアダウンを担っている。フィクスチャの外で自分が作成したもの（ここでは注文）だけを自分で片付ければよい。"),
    ] },
  { heading: { vi: "9. Tình huống 1: dùng chung 1 tài khoản, chạy song song đụng nhau", en: "9. Situation 1: sharing one account, parallel runs collide", ja: "9. シーン1：1つのアカウントを共有し、並行実行が衝突する" },
    blocks: [
      SITUATION("Một đội automation ShopEasy để 15 test giỏ hàng cùng đăng nhập bằng 1 tài khoản có sẵn 'shared@shopeasy.vn' cho 'tiện', thay vì tạo tài khoản riêng cho mỗi test.", "A ShopEasy automation team has 15 cart tests all log in with the same existing 'shared@shopeasy.vn' account for 'convenience', instead of creating a separate account per test.", "ShopEasyの自動化チームが、テストごとに専用アカウントを作成する代わりに、『便利だから』という理由で15個のカートテストすべてを既存の共有アカウント『shared@shopeasy.vn』でログインさせている。",
        "Khi chạy trên CI với 4 worker song song, kết quả trở nên thất thường: có lần cả 15 test pass, có lần 2-3 test fail với thông báo 'giỏ hàng có 5 sản phẩm, mong đợi 2' — vì 1 worker khác đang thêm sản phẩm vào đúng tài khoản này cùng lúc. Team mất nhiều giờ nghi ngờ code tính năng có bug, trước khi phát hiện nguyên nhân thật là dữ liệu dùng chung.",
        "Running on CI with 4 parallel workers, results become erratic: sometimes all 15 tests pass, sometimes 2-3 fail with 'cart has 5 products, expected 2' — because another worker is adding products to this exact same account at the same time. The team spends hours suspecting the feature code has a bug, before discovering the real cause is shared data.",
        "CIで4つのワーカーを並行実行すると、結果は不安定になります：15個すべて合格することもあれば、2〜3個が『カートに商品が5個あるが、期待値は2個』というメッセージで失敗することもあります——別のワーカーが同時にまさに同じアカウントに商品を追加しているからです。チームは機能コードにバグがあると何時間も疑った末、本当の原因が共有データであることを発見します。"),
      SOLVE("Thay 1 tài khoản dùng chung bằng fixture testAccount tự tạo riêng cho mỗi test (như chương 6), mỗi test có giỏ hàng của chính mình, chạy song song bao nhiêu worker cũng không còn đụng độ vì không còn ai 'đứng chung sân' với ai.", "Replace the single shared account with a testAccount fixture that creates a fresh account per test (as in chapter 6): each test gets its own cart, and no matter how many workers run in parallel, there's no more collision since no two tests 'stand on the same ground' anymore.", "共有アカウント1つを、各テストごとに新しいアカウントを作成するtestAccountフィクスチャ（第6章のように）に置き換える：各テストは自分専用のカートを持ち、いくつのワーカーが並行実行されても、もはや誰も『同じ土俵に立つ』ことがないため衝突は起きなくなる。"),
      P("Bài học ở đây rất cụ thể: 'tiện' khi viết test lần đầu (dùng luôn tài khoản có sẵn) lại trở thành nguồn lỗi khó chẩn đoán nhất khi bộ test lớn lên và chạy song song. Chi phí tạo thêm 1 tài khoản riêng cho mỗi test gần như bằng 0 nhờ fixture, trong khi chi phí gỡ lỗi 'flaky' vì dữ liệu dùng chung có thể tốn hàng giờ mỗi lần xảy ra.",
        "The lesson here is very concrete: what's 'convenient' when first writing a test (just reusing an existing account) becomes the hardest-to-diagnose source of bugs once the suite grows and runs in parallel. The cost of creating a separate account per test is nearly zero thanks to fixtures, while the cost of debugging 'flakiness' from shared data can cost hours each time it happens.",
        "ここでの教訓は非常に具体的です：テストを最初に書くときの『便利さ』（既存のアカウントをそのまま使う）は、スイートが大きくなり並行実行されるようになると、最も診断しづらいバグの原因になります。フィクスチャのおかげでテストごとに専用アカウントを作成するコストはほぼゼロですが、共有データによる『不安定さ』をデバッグするコストは、起こるたびに何時間もかかることがあります。"),
      RECAP(["Dữ liệu dùng chung + chạy song song = kết quả thất thường, khó chẩn đoán", "Mỗi test 1 fixture dữ liệu riêng = hết đụng độ, dù chạy bao nhiêu worker"],
        ["Shared data + parallel runs = erratic, hard-to-diagnose results", "One data fixture per test = no more collisions, no matter how many workers"],
        ["共有データ＋並行実行＝不安定で診断困難な結果", "テストごとに専用データフィクスチャ＝いくつワーカーがあっても衝突なし"]),
      TRY("Nhìn lại code fixture testAccount ở chương 6, thử hình dung: nếu 4 test cùng dùng fixture này chạy song song, chúng có đụng tài khoản của nhau không? Vì sao?", "Look back at the testAccount fixture code in chapter 6 and imagine: if 4 tests using this fixture run in parallel, would they collide over each other's accounts? Why or why not?", "第6章のtestAccountフィクスチャのコードを振り返り、想像してみよう：このフィクスチャを使う4つのテストが並行実行されたら、互いのアカウントで衝突するだろうか？なぜそうなる、あるいはならないのか？"),
    ] },
  { heading: { vi: "10. Tình huống 2, lỗi hay gặp & câu hỏi thường gặp", en: "10. Situation 2, common mistakes & FAQ", ja: "10. シーン2、よくある失敗・よくある質問" },
    blocks: [
      SITUATION("Một test thanh toán viết cứng mã đơn hàng có sẵn 'DH-1001' trên staging thay vì tự tạo đơn hàng riêng, và không có bước teardown vì 'đơn này vốn đã có sẵn, đâu cần xoá'.", "A checkout test hard-codes an existing order code 'DH-1001' on staging instead of creating its own order, and has no teardown step because 'this order already existed, why would it need deleting'.", "決済テストが、独自の注文を作成する代わりにステージング上の既存の注文コード『DH-1001』をハードコーディングしており、『この注文はもともと存在していたので削除する必要はない』という理由でティアダウン手順もない。",
        "Vài tuần sau, đội vận hành dọn dữ liệu staging định kỳ và xoá đơn 'DH-1001' vì tưởng đó là dữ liệu rác. Ngay lập tức, test thanh toán fail với lỗi 'không tìm thấy đơn hàng' ở mọi lần chạy tiếp theo — dù tính năng thanh toán trên thực tế hoàn toàn bình thường. Tệ hơn, không ai trong đội automation nhớ vì sao mã 'DH-1001' lại quan trọng, vì nó không được tạo ra từ chính test.",
        "A few weeks later, the ops team routinely cleans up staging data and deletes order 'DH-1001', assuming it's junk data. Immediately, the checkout test fails with 'order not found' on every subsequent run — even though the actual checkout feature works completely fine. Worse, no one on the automation team remembers why 'DH-1001' mattered, since it wasn't created by the test itself.",
        "数週間後、運用チームがステージングデータを定期的に片付け、ゴミデータだと思って注文『DH-1001』を削除します。すぐに、決済テストはその後のすべての実行で『注文が見つからない』というエラーで失敗します——実際の決済機能は完全に正常に動いているにもかかわらずです。さらに悪いことに、自動化チームの誰も『DH-1001』がなぜ重要だったのか覚えていません、テスト自身が作成したものではなかったからです。"),
      SOLVE("Refactor test để tự tạo đơn hàng riêng qua API ngay trong fixture/helper (như chương 6-7), và thêm teardown xoá đơn ngay sau khi test xong (như chương 8). Từ đó, test không còn phụ thuộc bất kỳ dữ liệu 'có sẵn' nào trên staging, và tự chịu trách nhiệm dọn dẹp phần dữ liệu của chính mình.", "Refactor the test to create its own order via API right inside the fixture/helper (as in chapters 6-7), and add teardown to delete the order right after the test finishes (as in chapter 8). From then on, the test no longer depends on any 'pre-existing' data on staging, and is responsible for cleaning up its own data.", "テストをリファクタリングし、フィクスチャ/ヘルパー内でAPI経由で独自の注文を作成し（第6〜7章のように）、テスト終了直後に注文を削除するティアダウンを追加する（第8章のように）。これ以降、テストはステージング上のいかなる『既存』データにも依存せず、自分自身のデータの片付けに責任を持つ。"),
      PITFALL("Viết test dựa vào mã đơn hàng, id sản phẩm, hoặc tài khoản 'có sẵn' trên môi trường test mà chính test không tạo ra — dữ liệu này có thể bị đổi hoặc dọn bất cứ lúc nào, ngoài tầm kiểm soát của test.", "Writing a test that depends on an order code, product id, or account 'already existing' on the test environment that the test itself didn't create — this data can be changed or cleaned up at any time, outside the test's control.", "テスト自身が作成していない、テスト環境に『既に存在する』注文コード、商品id、アカウントに依存するテストを書くこと——このデータはいつでも変更・削除される可能性があり、テストの制御が及ばない。"),
      PITFALL("Chỉ viết teardown cho dữ liệu tạo qua fixture, quên teardown cho dữ liệu tạo bằng helper function gọi trực tiếp trong thân test — dữ liệu 'lọt lưới' này vẫn tồn đọng và gây rối ở lần chạy sau.", "Only writing teardown for data created via fixtures, forgetting teardown for data created by helper functions called directly inside the test body — this data 'slips through the net' and still lingers, causing trouble on later runs.", "フィクスチャ経由で作成されたデータのティアダウンだけを書き、テスト本体内で直接呼ばれるヘルパー関数によって作成されたデータのティアダウンを忘れること——この『網の目をすり抜けた』データは残り続け、後の実行でトラブルを引き起こす。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố test phụ thuộc mã đơn hàng hard-code, khi dữ liệu có sẵn bị dọn", "A bug ticket recording the incident of a test depending on a hard-coded order code, when the pre-existing data got cleaned up", "既存データが片付けられた際に、ハードコーディングされた注文コードに依存するテストのインシデントを記録したバグチケット"),
      IMG(m_kanban, "Bảng theo dõi nợ kỹ thuật do dữ liệu test không được cô lập/dọn dẹp, và quá trình refactor sang fixture", "A board tracking technical debt from uncontained test data, and the refactor process toward fixtures", "隔離/後片付けされていないテストデータによる技術的負債と、フィクスチャへのリファクタリング過程を追跡するボード"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Chuẩn bị dữ liệu kiểm thử (test data) cho người mới", "Preparing test data for beginners", "chuan-bi-du-lieu-kiem-thu-test-data-cho-nguoi-moi", "初心者のためのテストデータ準備"),
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者向けPage Object Model"),
      INTERNAL("Chạy test và đọc báo cáo cho người mới", "Running tests and reading reports for beginners", "chay-test-va-doc-bao-cao-cho-nguoi-moi", "初心者のためのテスト実行とレポートの読み方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chuẩn bị dữ liệu test cho automation qua ví dụ ShopEasy: vì sao dữ liệu dùng chung khiến kết quả không đáng tin, khái niệm fixture với vòng đời Setup → Test → Teardown, vì sao nên tạo dữ liệu nền qua API/DB thay vì qua giao diện, cách viết fixture testAccount và các hàm helper tạo tài khoản/đơn hàng bằng Playwright chạy thật, và cách dọn dữ liệu đúng cách sau mỗi test. Hai tình huống thật cho thấy hậu quả cụ thể của dữ liệu dùng chung khi chạy song song, và của việc phụ thuộc dữ liệu có sẵn không do chính test tạo ra.",
        "You just learned how to prepare test data for automation through ShopEasy examples: why shared data makes results untrustworthy, the fixture concept with its Setup → Test → Teardown lifecycle, why background data should be created via API/DB instead of the UI, how to write a testAccount fixture and helper functions that create accounts/orders with real, runnable Playwright code, and how to clean up data properly after each test. Two real situations showed the concrete consequences of shared data under parallel runs, and of depending on pre-existing data the test itself didn't create.",
        "ShopEasyの例を通じて、自動化のためのテストデータ準備を学びました：共有データがなぜ結果を信頼できなくするか、Setup → Test → Teardownというライフサイクルを持つフィクスチャの概念、なぜ背景データはUIではなくAPI/DB経由で作成すべきか、実際に動くPlaywrightコードでtestAccountフィクスチャとアカウント/注文を作成するヘルパー関数の書き方、そして各テスト後にデータを正しく片付ける方法。2つの実例は、並行実行下での共有データの具体的な結果と、テスト自身が作成していない既存データに依存することの結果を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về cách kết hợp fixture với data-driven testing (chạy cùng 1 kịch bản với nhiều bộ dữ liệu khác nhau) và cách quản lý fixture cấp worker cho dữ liệu chỉ-đọc dùng chung an toàn, để bộ test automation vừa nhanh vừa đáng tin cậy khi dự án lớn dần. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into combining fixtures with data-driven testing (running the same script with multiple data sets) and managing worker-scoped fixtures for read-only data that's safe to share, so your automation suite stays both fast and trustworthy as the project grows. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、フィクスチャとデータ駆動テスト（同じスクリプトを複数の異なるデータセットで実行する）を組み合わせる方法と、安全に共有できる読み取り専用データのためのワーカースコープフィクスチャの管理方法を学ぶとよいでしょう——プロジェクトが成長するにつれ、自動化スイートを速く、かつ信頼できるものに保つためです。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const TESTDATA_01 = makeDoc({
  slug: "chuan-bi-du-lieu-test-automation-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "dữ liệu test automation",
  keywords: ["dữ liệu test automation", "test data automation", "playwright fixtures", "tạo dữ liệu test qua api", "chuẩn bị dữ liệu kiểm thử cho người mới"],
  coverLabel: "NGƯỜI MỚI · TEST DATA AUTOMATION · TMĐT",
  crumb: "Chuẩn bị dữ liệu test automation cho người mới",
  metaTitle: { vi: "Chuẩn bị dữ liệu test automation cho người mới", en: "Test data & fixtures for automation beginners", ja: "初心者向けテストデータとフィクスチャ準備" },
  metaDescription: {
    vi: "Dữ liệu test automation cho người mới: vì sao cần dữ liệu độc lập, dùng fixtures Playwright tạo/dọn dữ liệu qua API cho ShopEasy, có code chạy và trắc nghiệm.",
    en: "Test data for automation beginners: why tests need independent, repeatable data, using Playwright fixtures to create/clean data via API for ShopEasy, with runnable code and a quiz.",
    ja: "自動化初心者のためのテストデータ：独立して繰り返し可能なデータが必要な理由、PlaywrightフィクスチャでAPI経由のShopEasyデータ作成・削除、動くコードとクイズ付き。",
  },
  title: {
    vi: "Chuẩn bị dữ liệu test trong automation cho người mới: fixtures, tạo & dọn dữ liệu (có code chạy được)",
    en: "Preparing test data for automation beginners: fixtures, creating & cleaning data (with runnable code)",
    ja: "初心者のための自動化テストデータ準備：フィクスチャ、データの作成と後片付け（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: chuẩn bị dữ liệu test trong automation qua app TMĐT ShopEasy. Vì sao test cần dữ liệu độc lập & lặp lại được, khái niệm fixture với setup/teardown, tạo tài khoản/đơn hàng qua API thay vì UI, dọn dữ liệu sau test, giữ test không phụ thuộc nhau, hai tình huống thật (dùng chung tài khoản chạy song song đụng nhau, không dọn data khiến lần chạy sau fail), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: preparing test data for automation through the ShopEasy e-commerce app. Why tests need independent and repeatable data, the fixture concept with setup/teardown, creating accounts/orders via API instead of the UI, cleaning up data after tests, keeping tests independent of each other, two real situations (a shared account colliding under parallel runs, missing cleanup breaking a later run), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyを通じて自動化のためのテストデータ準備を学ぶ。テストが独立して繰り返し可能なデータを必要とする理由、setup/teardownを伴うフィクスチャの概念、UIではなくAPI経由でのアカウント/注文作成、テスト後のデータ片付け、テスト同士を独立させておく方法、2つの実例（共有アカウントが並行実行で衝突する、後片付け漏れで後の実行が失敗する）、多数のUIモック、FAQ、5問クイズ。SEO対応、CyberSoftテスターコースへのリンク付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chuẩn bị dữ liệu test cho automation", steps: [
    { name: "Xác định dữ liệu cần độc lập & lặp lại được", text: "Mỗi test cần dữ liệu của riêng nó, không phụ thuộc test khác hay dữ liệu có sẵn." },
    { name: "Viết fixture tạo dữ liệu qua API", text: "Setup gọi API tạo tài khoản/đơn hàng trước use(), thay vì thao tác qua UI." },
    { name: "Dọn dữ liệu sau test", text: "Teardown gọi API xoá dữ liệu vừa tạo ngay sau khi test kết thúc, dù pass hay fail." },
  ] },
  pages,
});

export const AU_TESTDATA_01 = [TESTDATA_01];
