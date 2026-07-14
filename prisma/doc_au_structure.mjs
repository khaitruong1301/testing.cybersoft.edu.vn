// doc_au_structure.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Cấu trúc dự án test & test hooks (beforeEach/afterEach) — vì sao cần tổ chức thư mục rõ ràng,
// cách đặt tên file/test, nhóm test bằng describe, vòng đời hooks beforeAll/beforeEach/afterEach/afterAll,
// chia sẻ setup dùng chung, cấu hình cơ bản (playwright.config.js) và .gitignore.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright/JS chạy được.
// Gắn app TMĐT ShopEasy (trang đăng nhập + giỏ hàng). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, annotate, grid, jira, kanban, stateDiagram } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình giỏ hàng ShopEasy, chú thích badge còn sót sản phẩm test trước ──
const m_cart = browser("shopeasy.vn/gio-hang", [
  panel("ShopEasy · Giỏ hàng", [
    `<rect x="24" y="16" width="712" height="58" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
     <text x="40" y="40" font-size="13" font-weight="700" fill="#0f172a">Áo thun ShopEasy Basic</text>
     <text x="40" y="60" font-size="12" fill="#64748b">Số lượng: 2 · 199.000đ</text>`,
    `<rect x="24" y="86" width="712" height="58" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
     <text x="40" y="110" font-size="13" font-weight="700" fill="#0f172a">Balo laptop ShopEasy Pro</text>
     <text x="40" y="130" font-size="12" fill="#64748b">Số lượng: 1 · 459.000đ</text>`,
    `<circle cx="700" cy="30" r="16" fill="#ef4444"/><text x="700" y="35" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">3</text>`,
    annotate(654, 8, 92, 46, "Badge: 3 sản phẩm sót từ test trước"),
  ].join(""), { h: 280, accent: "#0891b2" }),
].join(""), { h: 336, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: cấu trúc thư mục dự án automation chuẩn (tests/fixtures/config/.gitignore) ──
const m_folder = grid("Cấu trúc thư mục dự án automation chuẩn", ["Thư mục / Tệp", "Vai trò"], [
  ["tests/login.spec.js", "Kịch bản test đăng nhập, nhóm bằng test.describe('ShopEasy - Đăng nhập')"],
  ["tests/cart.spec.js", "Kịch bản test giỏ hàng, dùng chung hooks beforeEach/afterEach"],
  ["fixtures/test-data.json", "Dữ liệu mẫu dùng lại giữa nhiều test: tài khoản, sản phẩm..."],
  ["playwright.config.js", "Cấu hình chạy test: baseURL, trình duyệt, số lần thử lại"],
  [".gitignore", "Loại trừ node_modules/, report, trace khỏi git để repo gọn nhẹ"],
  ["package.json", "Khai báo script chạy test, phiên bản Playwright đang dùng"],
], { accent: "#0891b2", note: "Mỗi loại tệp có 1 vị trí cố định — thành viên mới nhìn tên thư mục là đoán được nội dung bên trong." });

// ── Mockup 3: sơ đồ vòng đời 4 hook trong 1 file test ──
const m_lifecycle = stateDiagram("Vòng đời hooks trong 1 file test.describe", [
  { id: "ba", label: "beforeAll", kind: "start", x: 100, y: 70 },
  { id: "be", label: "beforeEach", kind: "mid", x: 300, y: 70 },
  { id: "t", label: "Test", kind: "ok", x: 500, y: 70 },
  { id: "ae", label: "afterEach", kind: "mid", x: 660, y: 190 },
  { id: "aa", label: "afterAll", kind: "bad", x: 300, y: 190 },
], [
  { from: "ba", to: "be", label: "1 lần, trước tất cả" },
  { from: "be", to: "t", label: "trước MỖI test" },
  { from: "t", to: "ae", label: "sau MỖI test" },
  { from: "ae", to: "be", label: "lặp cho test kế", bad: true },
  { from: "ae", to: "aa", label: "hết test, 1 lần cuối" },
], { accent: "#0891b2", h: 260 });

// ── Mockup 4: bảng hook nào chạy khi nào, ví dụ áp dụng trong ShopEasy ──
const m_hookmatrix = grid("Bảng: hook nào chạy khi nào (ShopEasy · Playwright)", ["Hook", "Chạy khi nào", "Ví dụ dùng trong ShopEasy"], [
  ["beforeAll", "1 lần duy nhất, trước TẤT CẢ test trong describe", "Đọc file test-data.json chứa tài khoản mẫu 1 lần"],
  ["beforeEach", "Trước MỖI test, lặp lại nhiều lần", "Đăng nhập tài khoản ShopEasy trước mỗi test cần tài khoản"],
  ["afterEach", "Sau MỖI test, dù test pass hay fail", "Xoá sản phẩm khỏi giỏ hàng, dọn dữ liệu vừa tạo"],
  ["afterAll", "1 lần duy nhất, sau TẤT CẢ test trong describe", "Đóng kết nối dùng chung, xoá file tạm đã sinh ra"],
], { accent: "#0891b2", note: "beforeAll/afterAll chạy đúng 1 lần; beforeEach/afterEach chạy lặp lại theo từng test." });

// ── Mockup 5: ticket Jira khi thiếu beforeEach dùng chung, code đăng nhập lặp ở 8 file ──
const m_jira = jira({
  key: "SE-14205", title: "Đổi mật khẩu tài khoản test làm hỏng 8 file vì code đăng nhập copy-paste, không dùng beforeEach",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "staging · web ShopEasy · 8 file test cart/checkout/profile đều tự viết lại bước đăng nhập"],
    ["Nguyên nhân", "Mỗi test tự gọi lại các bước điền email/mật khẩu, không gom vào 1 beforeEach dùng chung"],
    ["Ảnh hưởng", "Khi đổi mật khẩu tài khoản test, phải rà và sửa đúng 8 nơi, dễ bỏ sót gây fail rải rác"],
    ["Đề xuất", "Gom bước đăng nhập vào test.beforeEach() của test.describe, mọi test trong file tự động dùng chung"],
  ],
});

// ── Mockup 6: bảng kanban nợ kỹ thuật do thiếu afterEach dọn dẹp ──
const m_kanban = kanban("Nợ kỹ thuật do thiếu hooks dọn dẹp (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14231", title: "Chưa có afterEach xoá giỏ hàng ở checkout.spec.js", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14210", title: "Thêm afterEach xoá giỏ hàng sau mỗi test cart.spec.js", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14198", title: "Test 'giỏ hàng trống khi mới vào' fail ngẫu nhiên", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14180", title: "Thêm beforeEach đăng nhập dùng chung cho cả describe", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Hook (beforeEach/afterEach...) trong test automation là gì?",
  "What are hooks (beforeEach/afterEach...) in test automation?",
  "Hook là các hàm đặc biệt chạy TỰ ĐỘNG vào những thời điểm cố định quanh vòng đời test: trước tất cả test (beforeAll), trước mỗi test (beforeEach), sau mỗi test (afterEach), sau tất cả test (afterAll). Bạn không gọi hook trực tiếp — công cụ test (như Playwright) tự gọi đúng lúc, giúp gom phần chuẩn bị/dọn dẹp dùng chung ra khỏi từng test riêng lẻ.",
  "Hooks are special functions that run AUTOMATICALLY at fixed points around a test's lifecycle: before all tests (beforeAll), before each test (beforeEach), after each test (afterEach), after all tests (afterAll). You never call a hook directly — the test tool (like Playwright) calls it at the right moment, letting you pull shared setup/teardown out of each individual test.",
  "テスト自動化におけるフック（beforeEach/afterEachなど）とは何？",
  "フックとは、テストのライフサイクルの決まったタイミングで自動的に実行される特別な関数です：全テストの前（beforeAll）、各テストの前（beforeEach）、各テストの後（afterEach）、全テストの後（afterAll）。フックを直接呼び出すことはなく、Playwrightのようなテストツールが適切なタイミングで呼び出し、共通の準備・後片付けを各テストから切り離せます。");
const faq2 = FAQ(
  "beforeEach và beforeAll khác nhau ở điểm nào?",
  "What's the difference between beforeEach and beforeAll?",
  "beforeAll chạy đúng 1 lần duy nhất, trước khi bất kỳ test nào trong describe bắt đầu — phù hợp cho việc chuẩn bị tốn thời gian và không đổi giữa các test (ví dụ đọc file dữ liệu mẫu 1 lần). beforeEach chạy lại từ đầu trước MỖI test — phù hợp cho việc cần trạng thái sạch, độc lập ở mỗi test (ví dụ đăng nhập lại để test không phụ thuộc thứ tự chạy).",
  "beforeAll runs exactly once, before any test in the describe block starts — suited for time-consuming setup that doesn't change between tests (e.g. reading a sample data file once). beforeEach re-runs before EVERY test — suited for needing a clean, independent state per test (e.g. logging in again so tests don't depend on run order).",
  "beforeEachとbeforeAllはどう違う？",
  "beforeAllはdescribeブロック内のどのテストが始まる前にもちょうど1回だけ実行されます——テスト間で変わらない、時間のかかる準備に向いています（例：サンプルデータファイルを1回だけ読む）。beforeEachは各テストの前に毎回実行されます——テストごとにクリーンで独立した状態が必要な場合に向いています（例：テストが実行順序に依存しないよう毎回ログインし直す）。");
const faq3 = FAQ(
  "Không viết afterEach dọn dẹp thì có sao không?",
  "What happens if I skip writing an afterEach to clean up?",
  "Có thể chạy được vài test đầu, nhưng dữ liệu do test trước tạo ra (sản phẩm trong giỏ, tài khoản vừa đăng ký...) sẽ còn tồn tại khi test sau chạy. Điều này khiến test sau nhận trạng thái không như mong đợi, dễ fail ngẫu nhiên hoặc chỉ fail khi chạy theo đúng thứ tự nhất định — rất khó debug vì lỗi 'ẩn' trong dữ liệu sót lại từ trước, không nằm ở chính đoạn code đang test.",
  "It might work for the first few tests, but data created by earlier tests (items in the cart, a newly registered account...) will still exist when the next test runs. This causes the next test to see an unexpected state, leading to random failures or failures that only appear in a specific run order — very hard to debug because the bug 'hides' in leftover data, not in the code actually being tested.",
  "afterEachで後片付けを書かなくても大丈夫？",
  "最初の数個のテストは動くかもしれませんが、前のテストが作ったデータ（カート内の商品、新規登録したアカウントなど）は次のテスト実行時にも残ってしまいます。これにより次のテストが予期しない状態を受け取り、ランダムな失敗や特定の実行順序でしか起きない失敗につながります——バグがテスト対象のコード自体ではなく、残ったデータの中に『隠れて』いるため、非常にデバッグしにくくなります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích chính của việc dùng test.describe để nhóm nhiều test lại là gì?", en: "What's the main purpose of using test.describe to group multiple tests?", ja: "test.describeで複数のテストをグループ化する主な目的は？" },
    options: [
      { vi: "Gộp các test cùng một màn hình/tính năng vào một khối, để dùng chung hooks và dễ đọc, dễ tìm khi có lỗi", en: "Combine tests for the same screen/feature into one block, to share hooks and be easier to read and locate when something fails", ja: "同じ画面・機能のテストを1つのブロックにまとめ、フックを共有し、失敗時に見つけやすく読みやすくすること" },
      { vi: "Làm test chạy song song nhanh hơn tự động", en: "Automatically make tests run in parallel faster", ja: "テストを自動的に並列で速く実行すること" },
      { vi: "Ẩn bớt log lỗi khi test fail", en: "Hide error logs when a test fails", ja: "テスト失敗時のエラーログを隠すこと" },
      { vi: "Thay thế hoàn toàn việc đặt tên file test", en: "Completely replace the need to name test files", ja: "テストファイルの命名を完全になくすこと" },
    ], correct: 0,
    explain: { vi: "describe nhóm các test liên quan vào 1 khối, nhờ đó hooks (beforeEach/afterEach...) khai báo bên trong áp dụng chung cho cả nhóm, và người đọc dễ hình dung phạm vi test.", en: "describe groups related tests into one block, so hooks (beforeEach/afterEach...) declared inside apply to the whole group, and readers can easily grasp the test's scope.", ja: "describeは関連するテストを1つのブロックにまとめ、内部で宣言されたフック（beforeEach/afterEachなど）がグループ全体に適用され、読み手はテストの範囲を把握しやすくなります。" },
  }),
  mcq({
    q: { vi: "test.beforeEach() trong 1 test.describe sẽ chạy vào lúc nào?", en: "When does test.beforeEach() inside a test.describe run?", ja: "test.describe内のtest.beforeEach()はいつ実行される？" },
    options: [
      { vi: "Chỉ 1 lần duy nhất, trước test đầu tiên của cả file", en: "Only once, before the very first test in the whole file", ja: "ファイル全体の最初のテストの前に1回だけ" },
      { vi: "Trước MỖI test trong describe đó, lặp lại nhiều lần", en: "Before EVERY test in that describe block, running multiple times", ja: "そのdescribe内の各テストの前に、毎回繰り返し実行される" },
      { vi: "Sau khi tất cả test trong describe đã chạy xong", en: "After all tests in the describe block have finished", ja: "describe内の全テストが終わった後" },
      { vi: "Chỉ chạy khi test trước đó bị fail", en: "Only runs when the previous test failed", ja: "直前のテストが失敗したときだけ実行される" },
    ], correct: 1,
    explain: { vi: "beforeEach lặp lại trước mỗi test, giúp mỗi test bắt đầu từ một trạng thái chuẩn bị giống nhau (ví dụ đã đăng nhập) mà không phụ thuộc test chạy trước nó.", en: "beforeEach repeats before every test, giving each test the same prepared starting state (e.g. already logged in) without depending on the test that ran before it.", ja: "beforeEachは各テストの前に繰り返され、直前に実行されたテストに依存せず、各テストが同じ準備済みの状態（例：ログイン済み）から始まるようにします。" },
  }),
  mcq({
    q: { vi: "Vì sao nên viết afterEach để xoá sản phẩm khỏi giỏ hàng sau mỗi test cart?", en: "Why should you write an afterEach to clear the cart after each cart test?", ja: "各カートテストの後にafterEachでカートから商品を削除すべき理由は？" },
    options: [
      { vi: "Để test chạy nhanh hơn đáng kể", en: "To make tests run significantly faster", ja: "テストを著しく速く実行するため" },
      { vi: "Để tránh dữ liệu (sản phẩm trong giỏ) từ test trước làm sai kết quả của test chạy sau", en: "To prevent leftover data (items in the cart) from an earlier test from skewing the result of a later test", ja: "前のテストのデータ（カート内の商品）が後のテストの結果を狂わせないようにするため" },
      { vi: "Vì Playwright bắt buộc phải có afterEach mới chạy được test", en: "Because Playwright requires an afterEach for tests to run at all", ja: "Playwrightがテスト実行にafterEachを必須としているため" },
      { vi: "Để tự động sinh báo cáo test đẹp hơn", en: "To automatically generate a nicer test report", ja: "テストレポートをより見やすく自動生成するため" },
    ], correct: 1,
    explain: { vi: "Không dọn dẹp sau mỗi test khiến dữ liệu (như sản phẩm còn trong giỏ) tồn tại sang test kế tiếp, gây fail ngẫu nhiên khó debug — afterEach giải quyết đúng vấn đề này.", en: "Skipping cleanup lets data (like leftover cart items) carry over to the next test, causing hard-to-debug random failures — afterEach solves exactly this.", ja: "後片付けをしないと、データ（カートに残った商品など）が次のテストに持ち越され、デバッグしにくいランダムな失敗を引き起こします——afterEachはまさにこれを解決します。" },
  }),
  mcq({
    q: { vi: "Khi nào nên dùng beforeAll thay vì beforeEach cho phần chuẩn bị dữ liệu?", en: "When should you use beforeAll instead of beforeEach for data setup?", ja: "データ準備でbeforeEachではなくbeforeAllを使うべきなのはどんなとき？" },
    options: [
      { vi: "Khi phần chuẩn bị tốn thời gian và giống hệt nhau cho mọi test, không cần lặp lại mỗi lần", en: "When the setup is time-consuming and identical for every test, so it doesn't need to repeat each time", ja: "準備に時間がかかり、全テストで全く同じで、毎回繰り返す必要がない場合" },
      { vi: "Khi mỗi test cần một trạng thái đăng nhập độc lập, khác nhau", en: "When each test needs an independent, different login state", ja: "各テストが独立した異なるログイン状態を必要とする場合" },
      { vi: "Khi muốn dữ liệu bị xoá ngay sau từng test", en: "When you want data cleared right after each test", ja: "各テストの直後にデータを消したい場合" },
      { vi: "Khi test cần chạy độc lập, không phụ thuộc kết quả của test khác", en: "When tests need to run independently, not depending on another test's result", ja: "テストが他のテスト結果に依存せず独立して実行される必要がある場合" },
    ], correct: 0,
    explain: { vi: "beforeAll phù hợp cho việc tốn thời gian và không đổi giữa các test (đọc file dữ liệu mẫu 1 lần); còn beforeEach phù hợp khi mỗi test cần trạng thái riêng, độc lập với test khác.", en: "beforeAll suits time-consuming setup that stays the same across tests (reading a sample data file once); beforeEach suits when each test needs its own state, independent of other tests.", ja: "beforeAllはテスト間で変わらない時間のかかる準備（サンプルデータファイルを1回読むなど）に向いており、beforeEachは各テストが他のテストから独立した固有の状態を必要とする場合に向いています。" },
  }),
  mcq({
    q: { vi: "Vai trò của file .gitignore trong một dự án automation là gì?", en: "What is the role of a .gitignore file in an automation project?", ja: "自動化プロジェクトにおける.gitignoreファイルの役割は？" },
    options: [
      { vi: "Khai báo các hook beforeEach/afterEach dùng chung", en: "Declare shared beforeEach/afterEach hooks", ja: "共通のbeforeEach/afterEachフックを宣言すること" },
      { vi: "Liệt kê những tệp/thư mục KHÔNG nên đưa vào git, như node_modules/, báo cáo test, trace", en: "List files/folders that should NOT be committed to git, like node_modules/, test reports, traces", ja: "node_modules/やテストレポート、トレースなど、gitにコミットすべきでないファイル・フォルダを列挙すること" },
      { vi: "Cấu hình baseURL và trình duyệt chạy test", en: "Configure the baseURL and browser used to run tests", ja: "テスト実行のbaseURLとブラウザを設定すること" },
      { vi: "Chứa dữ liệu mẫu (tài khoản, sản phẩm) dùng cho test", en: "Hold sample data (accounts, products) used by tests", ja: "テストで使うサンプルデータ（アカウント、商品）を保持すること" },
    ], correct: 1,
    explain: { vi: ".gitignore giúp loại các tệp sinh ra khi chạy test (node_modules/, playwright-report/, trace...) khỏi git, giữ repo gọn nhẹ và tránh commit nhầm dữ liệu không cần thiết.", en: ".gitignore excludes files generated while running tests (node_modules/, playwright-report/, traces...) from git, keeping the repo lean and avoiding accidental commits of unnecessary data.", ja: ".gitignoreはテスト実行時に生成されるファイル（node_modules/、playwright-report/、トレースなど）をgitから除外し、リポジトリを軽量に保ち、不要なデータの誤コミットを防ぎます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Cấu trúc dự án test là cách tổ chức thư mục, đặt tên file/test và nhóm test (describe) sao cho ai đọc cũng hiểu ngay. Test hooks (beforeAll/beforeEach/afterEach/afterAll) là các hàm chạy tự động quanh vòng đời test, giúp gom phần chuẩn bị và dọn dẹp dùng chung ra khỏi từng test. Bài này bám màn giỏ hàng của app TMĐT ShopEasy: bạn học thư mục chuẩn tests/fixtures/config, cách viết test.describe kèm beforeEach/afterEach bằng Playwright chạy được thật, và hai tình huống thật cho thấy cái giá phải trả khi thiếu hooks. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Test project structure is how you organize folders, name files/tests, and group tests (describe) so anyone reading it understands right away. Test hooks (beforeAll/beforeEach/afterEach/afterAll) are functions that run automatically around a test's lifecycle, pulling shared setup and teardown out of each test. This follows ShopEasy's cart screen: you'll learn a standard tests/fixtures/config folder layout, how to write test.describe with beforeEach/afterEach in real, runnable Playwright code, and two real situations showing the cost of missing hooks. Lots of visuals and a quiz at the end.",
        "テストプロジェクト構成とは、フォルダの整理、ファイル・テストの命名、テストのグループ化（describe）を、誰が読んでもすぐ理解できるように行うことです。テストフック（beforeAll/beforeEach/afterEach/afterAll）は、テストのライフサイクルの周りで自動実行される関数で、共通の準備・後片付けを各テストから切り離せます。本記事はECアプリShopEasyのカート画面に沿い、標準的なtests/fixtures/configフォルダ構成、実際に動くPlaywrightでのtest.describeとbeforeEach/afterEachの書き方、そしてフック不足のコストを示す2つの実例を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi vừa học automation, phản xạ tự nhiên là mở thư mục dự án, tạo ngay 1 file test đầu tiên, rồi cứ thế thêm file mới mỗi khi có tính năng cần test — không theo quy tắc thư mục hay đặt tên nào cả. Cách này chạy được với vài test đầu tiên. Nhưng khi số lượng test tăng lên, và mỗi test đều cần đăng nhập, dọn dữ liệu trước/sau khi chạy, bạn sẽ thấy cùng một đoạn code chuẩn bị/dọn dẹp lặp đi lặp lại ở khắp nơi, còn file test thì nằm lộn xộn không theo trật tự nào. Cấu trúc dự án test rõ ràng, cộng với test hooks, chính là cách giải quyết cả hai vấn đề: có nơi cố định cho từng loại tệp, và có chỗ cố định để chạy phần chuẩn bị/dọn dẹp dùng chung. Chúng ta sẽ học qua màn giỏ hàng thật của ShopEasy, có hình minh hoạ và code Playwright chạy được.",
        "Hi, newcomer! When you first learn automation, the natural instinct is to open the project folder, create a first test file right away, then keep adding new files whenever a feature needs testing — with no folder rules or naming convention at all. That works fine for the first few tests. But as the number of tests grows, and every test needs to log in, clean data before/after running, you'll notice the same setup/teardown code repeated everywhere, while test files sit scattered with no order. A clear test project structure, combined with test hooks, solves both problems: there's a fixed place for each type of file, and a fixed place to run shared setup/teardown. We'll learn through ShopEasy's real cart screen, with visuals and runnable Playwright code.",
        "こんにちは、初心者さん！自動化を学び始めると、プロジェクトフォルダを開き、すぐに最初のテストファイルを作り、機能をテストする必要があるたびに新しいファイルを追加していく——フォルダのルールも命名規則も全くない、という自然な反応をします。最初の数個のテストならそれでうまくいきます。しかしテストの数が増え、どのテストもログインや実行前後のデータ整理が必要になると、同じ準備・後片付けのコードがあちこちで繰り返され、テストファイルは秩序なく散らばっているのに気づくでしょう。明確なテストプロジェクト構成とテストフックの組み合わせは、まさにこの両方を解決します：各種類のファイルに決まった場所があり、共通の準備・後片付けを実行する決まった場所があるのです。実際のShopEasyのカート画面を通じて、図と動くPlaywrightコード付きで学びます。"),
      IMG(m_cart, "Màn hình test: giỏ hàng ShopEasy, chú thích badge còn sót sản phẩm do thiếu dọn dẹp giữa các test", "Screen under test: ShopEasy cart, annotated with a badge still showing leftover items from a missing cleanup between tests", "テスト対象画面：ShopEasyのカート、テスト間の後片付け不足で商品が残ったバッジを注記"),
      DEF("Cấu trúc dự án test", "cách tổ chức thư mục, đặt tên file/test, và nhóm test (describe) của một dự án automation, sao cho bất kỳ ai đọc cũng nhanh chóng biết tệp nào chứa gì và cần sửa ở đâu.",
        "how a test automation project organizes its folders, names files/tests, and groups tests (describe), so anyone reading it can quickly tell which file holds what and where to make a fix.",
        "自動化プロジェクトがフォルダを整理し、ファイル・テストを命名し、テストをグループ化（describe）する方法のことで、誰が読んでもどのファイルに何が入っていて、どこを直せばよいかがすぐ分かるようにするもの。"),
    ] },
  { heading: { vi: "2. Vấn đề: dự án test không có cấu trúc & không dùng hooks", en: "2. The problem: no structure, no hooks", ja: "2. 問題：構造がなく、フックも使わない" },
    blocks: [
      P("Hãy hình dung một dự án automation ShopEasy sau 3 tháng phát triển không theo quy tắc nào: có file tên test1.js, có file tên checkTest.js, có file tên gio_hang_v2_final.js nằm cùng thư mục gốc. Không ai biết chắc file nào đang được dùng, file nào là bản nháp cũ còn sót lại. Khi cần sửa test giỏ hàng, bạn phải mở từng file để tìm, tốn thời gian chỉ để xác định 'mình nên sửa ở đâu'.",
        "Imagine a ShopEasy automation project after 3 months of development with no rules at all: a file named test1.js, one named checkTest.js, one named gio_hang_v2_final.js, all sitting in the root folder. No one can be sure which file is actually used and which is an old leftover draft. When you need to fix the cart test, you must open each file just to figure out 'where should I even make the fix'.",
        "3か月開発した後、何のルールもないShopEasyの自動化プロジェクトを想像してください：test1.jsという名前のファイル、checkTest.jsという名前のファイル、gio_hang_v2_final.jsという名前のファイルが、すべてルートフォルダに並んでいます。どのファイルが実際に使われていて、どれが古い下書きの残骸なのか誰も確信が持てません。カートのテストを直す必要があるとき、『どこを直せばいいのか』を突き止めるためだけに各ファイルを開かなければなりません。"),
      P("Vấn đề thứ hai, sâu hơn, là thiếu hooks. Mỗi test giỏ hàng đều cần đăng nhập trước; không dùng beforeEach, nghĩa là 5 dòng code đăng nhập được copy-paste vào từng test. Không dùng afterEach để xoá giỏ hàng sau mỗi test, nghĩa là test chạy sau 'thừa hưởng' luôn sản phẩm mà test chạy trước để lại — dẫn tới kết quả sai lệch không phải vì tính năng lỗi, mà vì dữ liệu bẩn tồn đọng. Cả hai vấn đề — cấu trúc lộn xộn và thiếu hooks — cộng dồn lại khiến bộ test ngày càng khó tin tưởng, và mỗi lần có lỗi lại mất rất nhiều thời gian chỉ để tìm ra nguyên nhân thật sự.",
        "The second, deeper problem is missing hooks. Every cart test needs to log in first; without beforeEach, that means 5 lines of login code get copy-pasted into each test. Without afterEach to clear the cart after each test, the next test 'inherits' whatever items the previous test left behind — producing wrong results not because the feature is broken, but because of leftover dirty data. Both problems — messy structure and missing hooks — add up until the test suite becomes less and less trustworthy, and every failure costs a lot of time just to find the real cause.",
        "2つ目の、より根深い問題はフックの不足です。カートの各テストは先にログインが必要です。beforeEachを使わなければ、5行のログインコードが各テストにコピペされることになります。afterEachで各テストの後にカートをクリアしなければ、次のテストは前のテストが残した商品をそのまま『引き継ぐ』ことになり——機能が壊れているからではなく、汚れたデータが残っているために誤った結果を生みます。構造の乱雑さとフック不足という2つの問題が積み重なり、テストスイートはますます信頼できなくなり、失敗のたびに本当の原因を見つけるだけで多くの時間を費やすことになります。"),
      DEF("Hook", "hàm đặc biệt trong công cụ test (như Playwright) chạy tự động vào thời điểm cố định quanh vòng đời test — trước/sau tất cả test, hoặc trước/sau mỗi test — thay vì phải gọi thủ công trong từng test.",
        "a special function in a test tool (like Playwright) that runs automatically at a fixed point around a test's lifecycle — before/after all tests, or before/after each test — instead of being called manually inside every test.",
        "Playwrightのようなテストツールにおける特別な関数で、テストのライフサイクルの決まったタイミング——全テストの前後、または各テストの前後——で自動的に実行され、各テストの中で手動で呼び出す必要がないもの。"),
    ] },
  { heading: { vi: "3. Cấu trúc dự án test là gì & nguyên tắc đặt tên", en: "3. What test project structure is & naming principles", ja: "3. テストプロジェクト構成とは・命名の原則" },
    blocks: [
      P("Cấu trúc dự án test gồm hai phần gắn liền nhau: (1) cách chia thư mục — tệp nào nằm ở đâu, và (2) cách đặt tên — tên file, tên test, tên nhóm test nói lên điều gì. Một dự án có cấu trúc tốt trả lời được ngay câu hỏi: 'Tôi cần sửa test đăng nhập, nên mở file nào?' mà không cần tìm kiếm hay đoán mò.",
        "Test project structure has two tightly linked parts: (1) how folders are split — which file lives where, and (2) how things are named — what the file name, test name, and test group name actually say. A well-structured project immediately answers the question: 'I need to fix the login test, which file should I open?' without having to search or guess.",
        "テストプロジェクト構成には密接に結びついた2つの部分があります：(1) フォルダの分け方——どのファイルがどこにあるか、(2) 命名の仕方——ファイル名・テスト名・テストグループ名が何を語るか。構成の良いプロジェクトは、『ログインテストを直したい、どのファイルを開けばいい？』という質問に、検索や推測なしですぐ答えられます。"),
      P("Nguyên tắc đặt tên phổ biến trong Playwright: mỗi màn hình/luồng nghiệp vụ có 1 file *.spec.js riêng (login.spec.js, cart.spec.js, checkout.spec.js), tên file nói rõ nó test cái gì. Bên trong file, dùng test.describe('ShopEasy - Tên tính năng', ...) để nhóm các test liên quan, và mỗi test('mô tả hành vi cụ thể', ...) nên mô tả rõ ràng bằng câu tiếng Việt hoặc tiếng Anh dễ hiểu, tránh viết tắt khó đoán như test('tc1').",
        "A common Playwright naming principle: each screen/business flow gets its own *.spec.js file (login.spec.js, cart.spec.js, checkout.spec.js), with the file name clearly stating what it tests. Inside the file, use test.describe('ShopEasy - Feature name', ...) to group related tests, and each test('describe the specific behavior', ...) should be described clearly in plain Vietnamese or English, avoiding hard-to-guess abbreviations like test('tc1').",
        "Playwrightでよく使われる命名原則：各画面・業務フローが独自の*.spec.jsファイルを持ち（login.spec.js、cart.spec.js、checkout.spec.js）、ファイル名が何をテストするかを明確に述べます。ファイル内では、test.describe('ShopEasy - 機能名', ...)で関連するテストをグループ化し、各test('具体的な振る舞いの説明', ...)は分かりやすいベトナム語や英語で明確に記述し、test('tc1')のような推測しづらい略語は避けます。"),
      TIP("Đặt tên test bắt đầu bằng động từ mô tả hành vi (ví dụ 'thêm sản phẩm vào giỏ hàng thành công', 'giỏ hàng trống khi vừa đăng nhập') — khi test fail, chỉ nhìn tên là đoán ngay được nên mong đợi gì.", "Start test names with a verb describing the behavior (e.g. 'successfully adds a product to the cart', 'cart is empty right after login') — when a test fails, the name alone lets you guess the expected behavior right away.", "テスト名は振る舞いを表す動詞で始めよう（例：『商品をカートに追加成功』、『ログイン直後はカートが空』）——テストが失敗したとき、名前を見るだけで何を期待していたかすぐ分かります。"),
    ] },
  { heading: { vi: "4. Cấu trúc thư mục dự án automation chuẩn", en: "4. A standard folder structure for automation projects", ja: "4. 自動化プロジェクトの標準的なフォルダ構成" },
    blocks: [
      P("Một dự án Playwright chuẩn thường tách rõ các khu vực: thư mục tests/ chứa các file *.spec.js (mỗi luồng nghiệp vụ 1 file), thư mục fixtures/ chứa dữ liệu mẫu dùng lại giữa nhiều test, cùng với playwright.config.js ở gốc dự án để cấu hình chung, và .gitignore để loại các tệp không nên đưa vào git.",
        "A standard Playwright project usually separates clear areas: a tests/ folder holding *.spec.js files (one per business flow), a fixtures/ folder holding sample data reused across tests, plus playwright.config.js at the project root for shared configuration, and a .gitignore to exclude files that shouldn't be committed to git.",
        "標準的なPlaywrightプロジェクトは通常、明確な領域に分かれます：*.spec.jsファイル（業務フローごとに1つ）を入れるtests/フォルダ、複数のテストで再利用するサンプルデータを入れるfixtures/フォルダ、共通設定用にプロジェクトルートに置くplaywright.config.js、そしてgitにコミットすべきでないファイルを除外する.gitignoreです。"),
      IMG(m_folder, "Cấu trúc thư mục chuẩn của một dự án automation Playwright: tests/, fixtures/, config, .gitignore", "A standard folder structure for a Playwright automation project: tests/, fixtures/, config, .gitignore", "Playwright自動化プロジェクトの標準的なフォルダ構成：tests/、fixtures/、config、.gitignore"),
      CODE("text", "shopeasy-automation/\n├── tests/\n│   ├── login.spec.js     # kich ban test dang nhap\n│   └── cart.spec.js      # kich ban test gio hang\n├── fixtures/\n│   └── test-data.json    # du lieu mau: tai khoan, san pham...\n├── playwright.config.js  # cau hinh chung: baseURL, retries...\n├── .gitignore            # loai node_modules, report khoi git\n└── package.json"),
      TIP("Khi dự án lớn dần, có thể thêm thư mục pages/ cho Page Object hoặc utils/ cho hàm dùng chung — nhưng ngay từ đầu, chỉ cần tests/, fixtures/, config và .gitignore là đủ gọn để bắt đầu đúng cách.", "As the project grows, you can add a pages/ folder for Page Objects or a utils/ folder for shared functions — but at the start, tests/, fixtures/, config, and .gitignore are enough to begin the right way.", "プロジェクトが大きくなるにつれ、Page Object用のpages/フォルダや共通関数用のutils/フォルダを追加できます——しかし最初はtests/、fixtures/、config、.gitignoreだけで、正しく始めるのに十分です。"),
    ] },
  { heading: { vi: "5. Hooks là gì & vòng đời beforeAll/beforeEach/afterEach/afterAll", en: "5. What hooks are & the beforeAll/beforeEach/afterEach/afterAll lifecycle", ja: "5. フックとは・beforeAll/beforeEach/afterEach/afterAllのライフサイクル" },
    blocks: [
      P("Playwright cung cấp 4 hook chính, đặt bên trong test.describe: test.beforeAll() chạy đúng 1 lần trước khi test đầu tiên bắt đầu; test.beforeEach() chạy lại trước MỖI test; test.afterEach() chạy sau MỖI test dù test đó pass hay fail; test.afterAll() chạy đúng 1 lần sau khi test cuối cùng đã xong. Bốn hook này tạo thành một vòng đời lặp lại: chuẩn bị chung một lần, rồi chuẩn bị riêng — chạy — dọn riêng cho từng test, và cuối cùng dọn chung một lần.",
        "Playwright provides 4 main hooks, placed inside test.describe: test.beforeAll() runs exactly once before the first test starts; test.beforeEach() re-runs before EVERY test; test.afterEach() runs after EVERY test regardless of pass or fail; test.afterAll() runs exactly once after the last test finishes. These four hooks form a repeating lifecycle: prepare once shared, then per-test prepare — run — per-test clean, and finally clean once shared.",
        "Playwrightはtest.describeの中に置く4つの主要なフックを提供します：test.beforeAll()は最初のテストが始まる前にちょうど1回実行され、test.beforeEach()は各テストの前に毎回実行され、test.afterEach()はそのテストが成功か失敗かに関わらず各テストの後に実行され、test.afterAll()は最後のテストが終わった後にちょうど1回実行されます。この4つのフックは繰り返されるライフサイクルを形成します：共通の準備を1回、その後テストごとの準備——実行——テストごとの後片付け、そして最後に共通の後片付けを1回。"),
      IMG(m_lifecycle, "Sơ đồ vòng đời 4 hook trong 1 test.describe: beforeAll → (beforeEach → Test → afterEach) lặp lại → afterAll", "Lifecycle diagram of the 4 hooks in a test.describe: beforeAll → (beforeEach → Test → afterEach) repeated → afterAll", "test.describe内の4つのフックのライフサイクル図：beforeAll → （beforeEach → Test → afterEach）繰り返し → afterAll"),
      IMG(m_hookmatrix, "Bảng tổng hợp: hook nào chạy khi nào, kèm ví dụ áp dụng trong ShopEasy", "Summary table: which hook runs when, with ShopEasy application examples", "まとめ表：どのフックがいつ実行されるか、ShopEasyでの適用例付き"),
      DEF("beforeEach", "hook chạy lại trước mỗi test trong cùng 1 test.describe, dùng cho phần chuẩn bị cần lặp lại và độc lập ở từng test, ví dụ đăng nhập lại trước mỗi test cần tài khoản.",
        "a hook that re-runs before every test in the same test.describe, used for setup that must repeat and stay independent per test, e.g. logging in again before every test that needs an account.",
        "同じtest.describe内の各テストの前に毎回実行されるフックで、繰り返す必要があり各テストで独立した準備に使われる。例：アカウントが必要な各テストの前に毎回ログインし直す。"),
    ] },
  { heading: { vi: "6. Viết test đầu tiên dùng describe + beforeEach/afterEach (thực hành)", en: "6. Writing your first test with describe + beforeEach/afterEach (hands-on)", ja: "6. describe + beforeEach/afterEachで最初のテストを書く（実習）" },
    blocks: [
      P("Giờ ta viết test.describe đầu tiên cho màn giỏ hàng ShopEasy, có beforeEach đăng nhập và afterEach dọn giỏ hàng. Làm theo thứ tự dưới đây.",
        "Now let's write the first test.describe for ShopEasy's cart screen, with a beforeEach that logs in and an afterEach that clears the cart. Follow the order below.",
        "では、ログインするbeforeEachとカートをクリアするafterEachを持つ、ShopEasyのカート画面用の最初のtest.describeを書きましょう。以下の順に沿って進めます。"),
      STEP(1, "Tạo file tests/cart.spec.js, import test và expect từ @playwright/test.", "Create tests/cart.spec.js, and import test and expect from @playwright/test.", "tests/cart.spec.jsを作成し、@playwright/testからtestとexpectをインポートする。"),
      STEP(2, "Mở test.describe('ShopEasy - Gio hang', () => {...}) để nhóm mọi test giỏ hàng vào 1 khối.", "Open test.describe('ShopEasy - Gio hang', () => {...}) to group all cart tests into one block.", "test.describe('ShopEasy - Gio hang', () => {...})を開き、すべてのカートテストを1つのブロックにまとめる。"),
      STEP(3, "Khai báo test.beforeEach() để mở trang đăng nhập, điền email/mật khẩu, bấm nút đăng nhập.", "Declare test.beforeEach() to open the login page, fill in email/password, and click the login button.", "test.beforeEach()を宣言し、ログインページを開き、メール・パスワードを入力し、ログインボタンをクリックする。"),
      STEP(4, "Khai báo test.afterEach() để quay lại trang giỏ hàng và bấm nút xoá toàn bộ giỏ hàng.", "Declare test.afterEach() to go back to the cart page and click the clear-cart button.", "test.afterEach()を宣言し、カートページに戻ってカートを空にするボタンをクリックする。"),
      STEP(5, "Viết 2 test dùng chung 2 hook trên: 'thêm sản phẩm thành công' và 'giỏ hàng trống khi vừa đăng nhập'.", "Write 2 tests sharing both hooks above: 'successfully adds a product' and 'cart is empty right after login'.", "上記2つのフックを共有する2つのテストを書く：『商品追加成功』と『ログイン直後はカートが空』。"),
      CODE("javascript", "// tests/cart.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest.describe('ShopEasy - Gio hang', () => {\n  test.beforeEach(async ({ page }) => {\n    await page.goto('https://shopeasy.vn/dang-nhap');\n    await page.fill('#email-input', 'mai.tran@gmail.com');\n    await page.fill('#password-input', 'Mai@2024');\n    await page.click('#btn-login');\n  });\n\n  test.afterEach(async ({ page }) => {\n    await page.goto('https://shopeasy.vn/gio-hang');\n    await page.click('#btn-clear-cart');\n  });\n\n  test('them san pham vao gio hang thanh cong', async ({ page }) => {\n    await page.goto('https://shopeasy.vn/san-pham/ao-thun-basic');\n    await page.click('#btn-add-to-cart');\n    await expect(page.locator('#cart-badge')).toHaveText('1');\n  });\n\n  test('gio hang trong khi vua dang nhap', async ({ page }) => {\n    await page.goto('https://shopeasy.vn/gio-hang');\n    await expect(page.locator('#cart-badge')).toHaveText('0');\n  });\n});"),
      TRY("Thêm 1 test thứ ba trong cùng describe: thêm 2 sản phẩm khác nhau vào giỏ, rồi kiểm tra #cart-badge hiển thị đúng '2' — không cần viết lại bước đăng nhập vì beforeEach đã lo phần đó.", "Add a third test in the same describe: add 2 different products to the cart, then verify #cart-badge shows '2' — no need to rewrite the login step since beforeEach already handles it.", "同じdescribe内に3つ目のテストを追加してみよう：異なる2つの商品をカートに追加し、#cart-badgeが正しく『2』を表示するか確認する——ログイン手順を書き直す必要はない、beforeEachがすでに処理しているから。"),
    ] },
  { heading: { vi: "7. Chia sẻ setup dùng chung bằng beforeAll & cấu hình cơ bản", en: "7. Sharing setup with beforeAll & basic configuration", ja: "7. beforeAllで共通の準備を共有・基本設定" },
    blocks: [
      P("Không phải phần chuẩn bị nào cũng cần lặp lại ở mỗi test. Ví dụ đọc file fixtures/test-data.json chứa danh sách sản phẩm mẫu chỉ cần thực hiện 1 lần cho cả file test — đây là lúc dùng test.beforeAll() thay vì test.beforeEach(), giúp test chạy nhanh hơn vì không đọc lại file nhiều lần không cần thiết.",
        "Not every piece of setup needs to repeat per test. For example, reading the fixtures/test-data.json file containing sample products only needs to happen once for the whole test file — this is when you use test.beforeAll() instead of test.beforeEach(), making tests run faster by avoiding unnecessary repeated file reads.",
        "すべての準備がテストごとに繰り返される必要はありません。例えば、サンプル商品を含むfixtures/test-data.jsonファイルを読むのは、テストファイル全体で1回だけで十分です——これがtest.beforeEach()の代わりにtest.beforeAll()を使うタイミングで、不要な繰り返しファイル読み込みを避け、テストの実行を速くします。"),
      STEP(1, "Tạo playwright.config.js ở gốc dự án, khai báo testDir trỏ tới thư mục tests/.", "Create playwright.config.js at the project root, declaring testDir pointing to the tests/ folder.", "プロジェクトルートにplaywright.config.jsを作成し、tests/フォルダを指すtestDirを宣言する。"),
      STEP(2, "Khai báo baseURL trong use để mọi page.goto() có thể dùng đường dẫn tương đối, gọn hơn.", "Declare baseURL inside use so every page.goto() can use a shorter relative path.", "use内にbaseURLを宣言し、各page.goto()がより短い相対パスを使えるようにする。"),
      CODE("javascript", "// playwright.config.js\nmodule.exports = {\n  testDir: './tests',\n  timeout: 30000,\n  retries: 1,\n  use: {\n    baseURL: 'https://shopeasy.vn',\n    headless: true,\n    screenshot: 'only-on-failure',\n  },\n};"),
      STEP(3, "Tạo file .gitignore ở gốc dự án, thêm node_modules/, playwright-report/, test-results/ và .env.", "Create a .gitignore file at the project root, adding node_modules/, playwright-report/, test-results/, and .env.", "プロジェクトルートに.gitignoreファイルを作成し、node_modules/、playwright-report/、test-results/、.envを追加する。"),
      CODE("text", "node_modules/\ntest-results/\nplaywright-report/\n.env"),
      TIP("Không commit .env chứa mật khẩu tài khoản test thật lên git — .gitignore giúp tránh rò rỉ thông tin nhạy cảm khi chia sẻ dự án automation cho đồng đội.", "Never commit a .env holding real test account passwords to git — .gitignore helps avoid leaking sensitive information when sharing an automation project with teammates.", "実際のテストアカウントのパスワードを含む.envをgitにコミットしないこと——.gitignoreは自動化プロジェクトをチームメンバーと共有する際、機密情報の漏洩を防ぐのに役立ちます。"),
    ] },
  { heading: { vi: "8. Tình huống 1: lặp code đăng nhập ở mọi test → dồn vào beforeEach", en: "8. Situation 1: login code duplicated in every test → consolidate into beforeEach", ja: "8. シーン1：全テストでログインコードが重複 → beforeEachに集約" },
    blocks: [
      SITUATION("Một đội automation viết 8 file test cho ShopEasy (cart, checkout, profile...), mỗi file test tự viết lại đúng 5 dòng code đăng nhập ở đầu mỗi test, không dùng chung beforeEach nào.", "An automation team writes 8 test files for ShopEasy (cart, checkout, profile...), with each test file rewriting the exact same 5-line login code at the start of every test, without sharing any beforeEach.",
        "Đội vận hành đổi mật khẩu tài khoản test dùng chung (từ lý do bảo mật định kỳ). Ngay lập tức, tất cả test trong 8 file đều fail ở đúng bước đăng nhập, dù các tính năng thực tế vẫn hoạt động bình thường. Đội automation phải mở từng file, tìm đúng dòng code đăng nhập, sửa lại mật khẩu — lặp lại y hệt 8 lần cho cùng 1 thay đổi.",
        "The operations team changes the shared test account's password (as part of routine security practice). Immediately, every test in all 8 files fails at the exact login step, even though the actual features still work fine. The automation team must open each file, find the exact login code line, and update the password — repeating the identical fix 8 times for the same one change.",
        "自動化チームがShopEasy用に8個のテストファイル（cart、checkout、profileなど）を書き、各テストファイルが各テストの冒頭で全く同じ5行のログインコードを書き直し、beforeEachを共有していない。",
        "運用チームが（定期的なセキュリティ対応として）共通テストアカウントのパスワードを変更する。すぐに8ファイル全てのテストがまさにログインステップで失敗する——実際の機能は正常に動いているにもかかわらず。自動化チームは各ファイルを開き、正しいログインコードの行を見つけ、パスワードを更新しなければならない——同じ1つの変更のために全く同じ修正を8回繰り返すことになる。"),
      SOLVE("Trong mỗi file, gom 5 dòng code đăng nhập vào test.beforeEach() bên trong test.describe. Khi mật khẩu tài khoản test đổi, chỉ cần sửa đúng 1 dòng trong beforeEach của từng file — và vì beforeEach chỉ tồn tại ở 1 chỗ trong mỗi file, việc rà soát trở nên rõ ràng, không còn sót dòng nào.", "In each file, gather the 5 lines of login code into a test.beforeEach() inside test.describe. When the test account's password changes, fix exactly one line in that file's beforeEach — and since the beforeEach exists in only one place per file, the review becomes clear, with no lines left unfixed.", "各ファイルで、5行のログインコードをtest.describe内のtest.beforeEach()にまとめる。テストアカウントのパスワードが変わったら、各ファイルのbeforeEach内のたった1行を直すだけでよい——beforeEachが各ファイル内の1か所にしか存在しないため、確認作業が明確になり、直し忘れる行がなくなる。"),
      P("Bài học ở đây tương tự việc gom locator vào Page Object: chi phí thật của việc lặp code không nằm ở lần viết đầu tiên, mà ở mỗi lần cần thay đổi sau đó. beforeEach không chỉ giúp test ngắn gọn hơn — nó biến 'sửa N chỗ giống hệt nhau' thành 'sửa đúng N lần, nhưng mỗi lần chỉ 1 chỗ trong đúng 1 file', dễ kiểm soát hơn rất nhiều.",
        "The lesson here is similar to gathering locators into a Page Object: the real cost of duplicated code isn't in the first time you write it, but in every change needed afterward. beforeEach doesn't just make tests shorter — it turns 'fix N identical spots' into 'fix N times, but each time exactly one spot in exactly one file', which is far easier to control.",
        "ここでの教訓はPage Objectにロケーターをまとめるのと似ています：コード重複の本当のコストは最初に書くときではなく、その後必要になるたびの変更にあります。beforeEachはテストを短くするだけでなく、『N箇所の全く同じ場所を直す』を『N回直すが、毎回ちょうど1つのファイル内のちょうど1か所だけ』に変え、遥かに制御しやすくします。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố 8 file test hỏng vì đổi mật khẩu, khi chưa gom code đăng nhập vào beforeEach", "A bug ticket recording the incident of 8 broken test files from a password change, when login code hadn't been consolidated into beforeEach", "ログインコードをbeforeEachにまとめていなかったときの、パスワード変更による8個のテストファイル破損インシデントを記録したバグチケット"),
      RECAP(["Code chuẩn bị lặp lại ở nhiều test = chi phí sửa nhân lên theo số nơi lặp", "beforeEach biến 'sửa rải rác' thành 'sửa đúng 1 chỗ cố định mỗi file'"],
        ["Setup code duplicated across tests = fix cost multiplies by the number of duplicates", "beforeEach turns 'scattered fixes' into 'exactly one fixed spot per file'"],
        ["複数のテストで準備コードが重複＝修正コストが重複箇所の数だけ増える", "beforeEachは『あちこちの修正』を『各ファイルの決まった1か所だけの修正』に変える"]),
    ] },
  { heading: { vi: "9. Tình huống 2: không có afterEach dọn dẹp → rác tích tụ", en: "9. Situation 2: no afterEach cleanup → leftover data piles up", ja: "9. シーン2：afterEachでの後片付けがない → データが蓄積する" },
    blocks: [
      SITUATION("File tests/cart.spec.js có 6 test liên tiếp, mỗi test thêm 1-2 sản phẩm vào giỏ hàng để kiểm tra, nhưng không có test.afterEach() nào xoá giỏ hàng sau khi test xong.", "The tests/cart.spec.js file has 6 tests in a row, each adding 1-2 products to the cart to verify something, but there's no test.afterEach() clearing the cart once a test finishes.",
        "Test thứ 5 trong file có tên 'giỏ hàng trống khi vừa đăng nhập', mong đợi #cart-badge hiển thị '0'. Nhưng vì 4 test chạy trước đó đều thêm sản phẩm và không dọn dẹp, giỏ hàng thực tế đang chứa 5 sản phẩm sót lại. Test báo fail, và người xem báo cáo lầm tưởng tính năng giỏ hàng có lỗi — trong khi lỗi thật sự nằm ở chính bộ test thiếu afterEach.",
        "The 5th test in the file is named 'cart is empty right after login', expecting #cart-badge to show '0'. But since the 4 tests that ran before it all added products without cleaning up, the cart actually contains 5 leftover items. The test reports a failure, and whoever reads the report mistakenly thinks the cart feature is broken — when the real bug is in the test suite itself, missing an afterEach.",
        "ファイル内の5番目のテストは『ログイン直後はカートが空』という名前で、#cart-badgeが『0』を表示することを期待している。しかしその前に実行された4つのテストがすべて商品を追加し後片付けをしなかったため、実際のカートには5個の商品が残っている。テストは失敗と報告され、レポートを見た人はカート機能にバグがあると誤解する——実際のバグはafterEachが不足しているテストスイート自体にあるにもかかわらず。"),
      SOLVE("Thêm test.afterEach() vào test.describe của cart.spec.js, gọi hàm quay lại trang giỏ hàng và bấm nút xoá toàn bộ giỏ hàng sau MỖI test, bất kể test đó pass hay fail. Từ đó, mỗi test luôn bắt đầu với giỏ hàng sạch, không còn phụ thuộc vào việc test nào chạy trước nó.", "Add a test.afterEach() to cart.spec.js's test.describe, calling a function that returns to the cart page and clicks the clear-cart button after EVERY test, whether it passed or failed. From then on, every test always starts with a clean cart, no longer depending on which test ran before it.", "cart.spec.jsのtest.describeにtest.afterEach()を追加し、成功・失敗にかかわらず各テストの後にカートページに戻ってカートを空にするボタンをクリックする関数を呼び出す。これ以降、各テストは常にきれいなカートから始まり、どのテストが先に実行されたかに依存しなくなる。"),
      P("Điểm quan trọng cần nhớ: afterEach nên chạy dù test pass hay fail, vì mục tiêu là đảm bảo trạng thái sạch cho test TIẾP THEO, không phải để 'thưởng' cho test vừa pass. Nếu chỉ dọn dẹp khi test pass, một test fail giữa chừng vẫn để lại rác, và vấn đề lại tái diễn ở đúng nơi tưởng như đã xử lý.",
        "The key point to remember: afterEach should run whether a test passes or fails, because its goal is ensuring a clean state for the NEXT test, not 'rewarding' the test that just passed. If cleanup only happens on pass, a test that fails midway still leaves a mess behind, and the problem resurfaces in exactly the place you thought was handled.",
        "覚えておくべき重要な点：afterEachはテストの成功・失敗にかかわらず実行されるべきです。目的は次のテストのためにきれいな状態を保証することであり、成功したテストへの『ご褒美』ではないからです。成功したときだけ後片付けをすると、途中で失敗したテストは散らかしたままになり、対処済みだと思っていたまさにその場所で問題が再発します。"),
      IMG(m_kanban, "Bảng theo dõi nợ kỹ thuật do thiếu hooks dọn dẹp, và tiến trình bổ sung afterEach", "A board tracking technical debt from missing cleanup hooks, and the progress of adding afterEach", "後片付けフックの不足による技術的負債と、afterEach追加の進捗を追跡するボード"),
      TRY("Nhìn lại code cart.spec.js ở chương 6, thử thêm test thứ tư kiểm tra 'xoá 1 sản phẩm khỏi giỏ hàng' — quan sát xem afterEach đã viết có đủ để test này luôn bắt đầu từ giỏ hàng trống hay không.", "Look back at the cart.spec.js code from chapter 6, and try adding a fourth test that checks 'removing one item from the cart' — observe whether the afterEach you already wrote is enough for this test to always start from an empty cart.", "第6章のcart.spec.jsのコードを振り返り、『カートから商品を1つ削除』を検証する4つ目のテストを追加してみよう——すでに書いたafterEachが、このテストが常に空のカートから始まるのに十分かどうか観察しよう。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Đặt câu assert/expect kiểm tra kết quả nghiệp vụ bên trong beforeEach. Hook chỉ nên lo phần chuẩn bị/dọn dẹp; việc kiểm tra đúng/sai thuộc về từng test cụ thể.", "Placing assert/expect statements that check business results inside a beforeEach. A hook should only handle setup/teardown; checking right versus wrong belongs in each specific test.", "ビジネス結果を検証するassert/expect文をbeforeEachの中に置くこと。フックは準備・後片付けだけを扱うべきで、正誤の検証は各具体的なテストの役割です。"),
      PITFALL("Dùng test.beforeAll() cho phần cần trạng thái riêng của từng test (như đăng nhập), khiến các test vô tình dùng chung 1 phiên đăng nhập và ảnh hưởng lẫn nhau khi chạy song song.", "Using test.beforeAll() for something that needs a per-test state (like login), causing tests to accidentally share one login session and interfere with each other when run in parallel.", "各テストごとの状態が必要なもの（ログインなど）にtest.beforeAll()を使うと、テストが意図せず1つのログインセッションを共有し、並列実行時に互いに影響し合うことになる。"),
      TIP("Khi thêm 1 hook mới, luôn tự hỏi: 'phần này cần lặp lại mỗi test (beforeEach/afterEach), hay chỉ cần 1 lần cho cả file (beforeAll/afterAll)?' — câu trả lời quyết định đặt đúng hook nào.", "When adding a new hook, always ask: 'does this need to repeat every test (beforeEach/afterEach), or only once for the whole file (beforeAll/afterAll)?' — the answer decides which hook to use.", "新しいフックを追加するとき、常に自問しよう：『これは各テストで繰り返す必要があるか（beforeEach/afterEach）、それともファイル全体で1回だけでよいか（beforeAll/afterAll）？』——その答えが正しいフックを決める。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model (POM) for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者向けPage Object Model（POM）"),
      INTERNAL("Chuẩn bị dữ liệu test automation cho người mới", "Preparing test automation data for beginners", "chuan-bi-du-lieu-test-automation-cho-nguoi-moi", "初心者向けテスト自動化のデータ準備"),
      INTERNAL("Assertion - kiểm chứng kết quả cho người mới", "Assertions - verifying results for beginners", "assertion-kiem-chung-ket-qua-cho-nguoi-moi", "初心者向けアサーション・結果検証"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cấu trúc dự án test và test hooks qua màn giỏ hàng ShopEasy: vì sao dự án lộn xộn và thiếu hooks trở nên khó bảo trì, cấu trúc thư mục chuẩn tests/fixtures/config, cách đặt tên file/test rõ ràng, nhóm test bằng describe, vòng đời 4 hook beforeAll/beforeEach/afterEach/afterAll, và cách viết test.describe kèm hooks bằng Playwright chạy được thật. Hai tình huống thật cho thấy cái giá khi thiếu beforeEach dùng chung (sửa 8 file khi đổi mật khẩu) và khi thiếu afterEach dọn dẹp (rác tích tụ khiến test fail oan).",
        "You just learned test project structure and test hooks through ShopEasy's cart screen: why a messy project without hooks becomes hard to maintain, a standard tests/fixtures/config folder layout, clear file/test naming, grouping tests with describe, the 4-hook beforeAll/beforeEach/afterEach/afterAll lifecycle, and how to write test.describe with hooks in real, runnable Playwright code. Two real situations showed the cost of missing a shared beforeEach (fixing 8 files on a password change) and missing an afterEach cleanup (leftover data causing unfair test failures).",
        "ShopEasyのカート画面を通じて、テストプロジェクト構成とテストフックを学びました：構造が乱雑でフックがないプロジェクトがなぜ保守しにくくなるか、標準的なtests/fixtures/configフォルダ構成、明確なファイル・テストの命名、describeによるテストのグループ化、beforeAll/beforeEach/afterEach/afterAllという4つのフックのライフサイクル、そしてPlaywrightで実際に動くフック付きtest.describeの書き方。2つの実例は、共通beforeEachがない場合のコスト（パスワード変更時に8ファイルを修正）と、afterEachでの後片付けがない場合のコスト（データの蓄積による不当なテスト失敗）を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về Page Object Model (tách locator/hành động khỏi test) và cách chuẩn bị dữ liệu test bài bản bằng fixture, để bộ test automation vừa có cấu trúc rõ ràng vừa dễ mở rộng khi dự án lớn dần. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into the Page Object Model (separating locators/actions from tests) and how to prepare test data properly with fixtures, so your automation suite has both a clear structure and room to grow as the project scales up. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、Page Object Model（ロケーター・操作をテストから分離する）と、フィクスチャを使った適切なテストデータ準備について学ぶとよいでしょう——プロジェクトが成長するにつれ、自動化スイートが明確な構造を持ちながら拡張しやすくなるためです。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const STRUCTURE_01 = makeDoc({
  slug: "cau-truc-du-an-test-va-hooks-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "cấu trúc dự án test",
  keywords: ["cấu trúc dự án test", "test hooks", "beforeeach afterEach", "playwright describe", "tổ chức dự án automation cho người mới"],
  coverLabel: "NGƯỜI MỚI · CẤU TRÚC & HOOKS · TMĐT",
  crumb: "Cấu trúc dự án test & hooks cho người mới",
  metaTitle: { vi: "Cấu trúc dự án test & hooks cho người mới", en: "Test project structure & hooks for beginners", ja: "初心者向けテスト構成とフック" },
  metaDescription: {
    vi: "Cấu trúc dự án test & hooks beforeEach/afterEach cho người mới: tổ chức thư mục, describe nhóm test, ví dụ Playwright ShopEasy, có code chạy và trắc nghiệm.",
    en: "Test project structure and beforeEach/afterEach hooks for beginners: folder organization, describe test grouping, a Playwright ShopEasy example with runnable code and a quiz.",
    ja: "初心者向けテストプロジェクト構成とbeforeEach/afterEachフック：フォルダ整理、describeによるグループ化、PlaywrightのShopEasy例、動くコードとクイズ付き。",
  },
  title: {
    vi: "Cấu trúc dự án test & hooks (beforeEach/afterEach) cho người mới: tổ chức bền vững (có code chạy được)",
    en: "Test project structure & hooks (beforeEach/afterEach) for beginners: organizing for the long run (with runnable code)",
    ja: "初心者のためのテストプロジェクト構成とフック（beforeEach/afterEach）：長続きする整理法（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cấu trúc dự án test & test hooks (beforeEach/afterEach) qua app TMĐT ShopEasy. Cấu trúc thư mục chuẩn tests/fixtures/config, đặt tên file/test, nhóm bằng describe, vòng đời 4 hook, hai tình huống thật (lặp code đăng nhập, thiếu afterEach gây rác dữ liệu), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn test project structure and test hooks (beforeEach/afterEach) through the ShopEasy e-commerce app. A standard tests/fixtures/config folder layout, naming files/tests, grouping with describe, the 4-hook lifecycle, two real situations (duplicated login code, missing afterEach causing leftover data), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでテストプロジェクト構成とテストフック（beforeEach/afterEach）を学ぶ。標準的なtests/fixtures/configフォルダ構成、ファイル・テストの命名、describeによるグループ化、4つのフックのライフサイクル、2つの実例（ログインコードの重複、afterEach不足によるデータ残留）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách tổ chức cấu trúc dự án test & dùng hooks", steps: [
    { name: "Tổ chức thư mục dự án", text: "Tách rõ tests/, fixtures/, playwright.config.js và .gitignore." },
    { name: "Nhóm test bằng describe", text: "Mỗi màn hình/luồng nghiệp vụ 1 file *.spec.js, gom test liên quan bằng test.describe." },
    { name: "Dùng hooks đúng chỗ", text: "beforeEach/afterEach cho phần lặp lại mỗi test; beforeAll/afterAll cho phần chỉ cần 1 lần." },
  ] },
  pages,
});

export const AU_STRUCTURE_01 = [STRUCTURE_01];
