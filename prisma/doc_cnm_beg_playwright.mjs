// doc_cnm_beg_playwright.mjs — BÀI "DÀNH CHO NGƯỜI MỚI" (beginner): nhập môn Playwright.
// Chủ đề: Playwright là gì, cài đặt tối giản, viết bài test tự động ĐẦU TIÊN, chạy & xem kết quả.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, quy trình lỗi, công cụ & dự án thực chiến.",
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
    categorySlug: "playwright-tools", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", "ecommerce", "playwright", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: trang chủ ShopEasy — màn hình bạn sẽ test ──
const m_shop_home = browser("shopeasy.vn", [
  panel("ShopEasy · Trang chủ", [
    field(24, 20, 500, "Tìm sản phẩm", "Tai nghe Bluetooth chống ồn", "normal"),
    btn(540, 20, 140, "Tìm kiếm", "primary"),
    field(24, 100, 330, "Danh mục", "Điện tử", "normal"),
    field(372, 100, 330, "Sắp xếp", "Giá tăng dần", "normal"),
    btn(24, 180, 240, "Xem tất cả sản phẩm", "ghost"),
    annotate(20, 8, 660, 92, "Mục tiêu test đầu tiên: tiêu đề trang phải chứa 'ShopEasy'"),
  ].join(""), { h: 240, accent: "#7c2d92" }),
].join(""), { h: 296, title: "ShopEasy · TMĐT", accent: "#7c2d92" });

// ── Mockup 2: kết quả chạy test lần đầu ──
const m_run_result = dashboard("Kết quả chạy test — npx playwright test", [
  { label: "Passed", value: "1", sub: "test đầu tiên của bạn", color: "#16a34a" },
  { label: "Failed", value: "0", sub: "chưa có lỗi nào", color: "#ef4444" },
  { label: "Trình duyệt", value: "3", sub: "Chromium, Firefox, WebKit", color: "#2563eb" },
  { label: "Thời gian", value: "1.4s", sub: "chạy song song", color: "#7c2d92" },
]);

// ── Mockup 3: bảng HTML report ──
const m_report_table = grid("Playwright HTML Report", ["Tên test", "Trình duyệt", "Trạng thái", "Thời gian"], [
  ["kiểm tra tiêu đề trang ShopEasy", "chromium", "✓ Passed", "0.6s"],
  ["kiểm tra tiêu đề trang ShopEasy", "firefox", "✓ Passed", "0.5s"],
  ["kiểm tra tiêu đề trang ShopEasy", "webkit", "✓ Passed", "0.5s"],
], { accent: "#7c2d92" });

// ── Mockup 4: bảng các locator phổ biến ──
const m_locator_table = grid("Các cách tìm phần tử (locator) phổ biến", ["Locator", "Ví dụ", "Khi nào dùng"], [
  ["getByRole", "page.getByRole('button', { name: 'Đặt hàng' })", "Ưu tiên dùng đầu tiên — theo vai trò & nhãn"],
  ["getByLabel", "page.getByLabel('Số điện thoại')", "Ô nhập có nhãn (label) rõ ràng"],
  ["getByText", "page.getByText('Thêm vào giỏ')", "Tìm theo đúng văn bản hiển thị"],
  ["getByTestId", "page.getByTestId('search-input')", "Khi phần tử có data-testid riêng"],
], { accent: "#7c2d92", highlight: 0 });

// ── Mockup 5: màn hình lỗi Timeout khi nút chưa kịp bật ──
const m_fail_timeout = browser("shopeasy.vn/san-pham/tai-nghe-bluetooth", [
  panel("ShopEasy · Chi tiết sản phẩm", [
    field(24, 20, 330, "Tên sản phẩm", "Tai nghe Bluetooth chống ồn", "normal"),
    field(372, 20, 330, "Giá", "890.000 ₫", "normal"),
    btn(24, 100, 220, "Thêm vào giỏ hàng", "disabled"),
    annotate(20, 90, 340, 60, "Timeout 30000ms exceeded chờ nút 'Thêm vào giỏ hàng'"),
  ].join(""), { h: 200, accent: "#e11d48" }),
].join(""), { h: 256, title: "Lỗi: hết thời gian chờ", accent: "#e11d48" });

// ── Mockup 6: danh sách sản phẩm có nhiều nút cùng tên (strict mode) ──
const m_multi_add = browser("shopeasy.vn/danh-muc/tai-nghe", [
  panel("ShopEasy · Danh sách sản phẩm", [
    field(24, 20, 220, "Tai nghe A", "250.000 ₫", "normal"),
    btn(24, 100, 200, "Thêm vào giỏ", "primary"),
    field(268, 20, 220, "Tai nghe B", "390.000 ₫", "normal"),
    btn(268, 100, 200, "Thêm vào giỏ", "primary"),
    field(512, 20, 220, "Tai nghe C", "510.000 ₫", "normal"),
    btn(512, 100, 200, "Thêm vào giỏ", "primary"),
    annotate(20, 150, 692, 40, "3 nút cùng tên 'Thêm vào giỏ' → getByText bị lỗi 'strict mode violation'"),
  ].join(""), { h: 210, accent: "#7c2d92" }),
].join(""), { h: 266, title: "Nhiều sản phẩm cùng nút", accent: "#7c2d92" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Playwright là gì?",
  "What is Playwright?",
  "Playwright là một framework kiểm thử tự động miễn phí do Microsoft phát triển. Nó cho phép bạn viết một đoạn code ngắn để điều khiển trình duyệt thật (Chromium, Firefox, WebKit) — mở trang, gõ chữ, bấm nút, kiểm tra kết quả — thay vì phải tự tay làm đi làm lại các bước đó. Với người mới, Playwright dễ bắt đầu vì có sẵn công cụ tạo dự án mẫu chỉ bằng một dòng lệnh.",
  "Playwright is a free automated testing framework built by Microsoft. It lets you write a short piece of code to drive a real browser (Chromium, Firefox, WebKit) — open a page, type text, click buttons, check results — instead of doing those steps by hand over and over. For beginners, Playwright is easy to start with since a single command scaffolds a sample project for you.",
  "Playwrightとは何ですか？",
  "Playwrightは、Microsoftが開発した無料の自動テストフレームワークです。短いコードを書くだけで実際のブラウザ（Chromium、Firefox、WebKit）を操作できます — ページを開き、文字を入力し、ボタンを押し、結果を確認する — 同じ手順を毎回手作業で行う必要がありません。初心者にとっては、1つのコマンドでサンプルプロジェクトが自動生成されるため始めやすいです。");
const faq2 = FAQ(
  "Học Playwright có cần biết lập trình trước không?",
  "Do I need to know programming before learning Playwright?",
  "Bạn nên biết chút ít JavaScript cơ bản (biến, hàm, async/await) để đọc hiểu code test, nhưng không cần giỏi lập trình ngay từ đầu. Bài test Playwright đầu tiên chỉ khoảng 5-10 dòng và có cấu trúc lặp lại: mở trang → thao tác → kiểm tra kết quả. Bạn hoàn toàn có thể bắt chước mẫu có sẵn rồi dần hiểu sâu hơn qua thực hành.",
  "It helps to know a little basic JavaScript (variables, functions, async/await) to read test code, but you don't need to be a strong programmer from day one. A first Playwright test is usually only about 5-10 lines with a repeating shape: open the page → act → check the result. You can copy a working sample and gradually understand it deeper through practice.",
  "Playwrightを学ぶ前にプログラミングの知識が必要ですか？",
  "テストコードを読むために基本的なJavaScript（変数、関数、async/await）を少し知っていると役立ちますが、最初から高いプログラミング力は不要です。最初のPlaywrightテストは通常5〜10行程度で、ページを開く→操作する→結果を確認するという繰り返しの形をしています。動くサンプルを真似しながら、実践を通じて徐々に深く理解していけます。");
const faq3 = FAQ(
  "Playwright khác gì so với Selenium hay Cypress?",
  "How is Playwright different from Selenium or Cypress?",
  "Cả ba đều dùng để tự động hoá trình duyệt, nhưng Playwright có cơ chế 'tự động chờ' (auto-wait) mạnh nên test ít bị 'flaky' (lúc đậu lúc rớt) hơn, hỗ trợ sẵn nhiều trình duyệt (Chromium, Firefox, WebKit) chỉ với một API, và có công cụ xem lại từng bước test (trace, report) rất trực quan cho người mới. Selenium lâu đời và đa ngôn ngữ hơn; Cypress dễ học nhưng giới hạn hơn về trình duyệt.",
  "All three automate browsers, but Playwright has strong built-in auto-waiting, so tests are less 'flaky' (passing sometimes, failing others). It also supports multiple browsers (Chromium, Firefox, WebKit) through one API, and has very visual tools (trace, report) for reviewing each test step — great for beginners. Selenium is older and supports more languages; Cypress is easy to learn but more limited on browsers.",
  "PlaywrightはSeleniumやCypressとどう違いますか？",
  "3つともブラウザ自動化のためのツールですが、Playwrightは強力な『自動待機』機能を持ち、テストが『フレーキー』（成功したり失敗したりする）になりにくいです。1つのAPIで複数ブラウザ（Chromium、Firefox、WebKit）に対応し、各テストの手順を振り返れる非常に視覚的なツール（trace、report）があり初心者にも分かりやすいです。Seleniumは歴史が長く対応言語が多く、Cypressは学びやすい反面ブラウザの制限が大きめです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Playwright dùng để làm gì?", en: "What is Playwright used for?", ja: "Playwrightは何のために使いますか？" },
    options: [
      { vi: "Thiết kế giao diện web", en: "Designing web UIs", ja: "Webデザイン" },
      { vi: "Tự động hoá thao tác & kiểm thử trên trình duyệt thật", en: "Automating actions & testing on a real browser", ja: "実際のブラウザでの操作・テストの自動化" },
      { vi: "Quản lý cơ sở dữ liệu", en: "Managing databases", ja: "データベース管理" },
      { vi: "Thiết kế logo", en: "Designing logos", ja: "ロゴデザイン" },
    ], correct: 1,
    explain: { vi: "Playwright điều khiển trình duyệt thật (Chromium/Firefox/WebKit) để mở trang, thao tác và kiểm tra kết quả tự động.", en: "Playwright drives a real browser (Chromium/Firefox/WebKit) to open pages, act, and check results automatically.", ja: "Playwrightは実ブラウザ（Chromium/Firefox/WebKit）を操作し、ページを開き、操作し、結果を自動で確認します。" },
  }),
  mcq({
    q: { vi: "Lệnh nào dùng để CHẠY các bài test Playwright vừa viết?", en: "Which command RUNS the Playwright tests you just wrote?", ja: "書いたばかりのPlaywrightテストを実行するコマンドはどれ？" },
    options: [
      { vi: "npm start", en: "npm start", ja: "npm start" },
      { vi: "npx playwright test", en: "npx playwright test", ja: "npx playwright test" },
      { vi: "node index.js", en: "node index.js", ja: "node index.js" },
      { vi: "npx playwright install", en: "npx playwright install", ja: "npx playwright install" },
    ], correct: 1,
    explain: { vi: "`npx playwright test` chạy toàn bộ file test trong thư mục cấu hình (mặc định là tests/).", en: "`npx playwright test` runs every test file in the configured folder (default tests/).", ja: "`npx playwright test`は設定フォルダ（既定はtests/）内の全テストファイルを実行します。" },
  }),
  mcq({
    q: { vi: "Dòng `await expect(page).toHaveTitle(/ShopEasy/);` dùng để làm gì?", en: "What does `await expect(page).toHaveTitle(/ShopEasy/);` do?", ja: "`await expect(page).toHaveTitle(/ShopEasy/);` は何をする行？" },
    options: [
      { vi: "Kiểm tra tiêu đề trang có khớp mẫu chứa 'ShopEasy'", en: "Checks the page title matches a pattern containing 'ShopEasy'", ja: "ページタイトルが『ShopEasy』を含むパターンに一致するか確認する" },
      { vi: "Chụp ảnh màn hình trang", en: "Takes a screenshot of the page", ja: "ページのスクリーンショットを撮る" },
      { vi: "Đóng trình duyệt", en: "Closes the browser", ja: "ブラウザを閉じる" },
      { vi: "Cài đặt Playwright", en: "Installs Playwright", ja: "Playwrightをインストールする" },
    ], correct: 0,
    explain: { vi: "`expect(page).toHaveTitle(...)` là một web-first assertion: nó tự chờ và kiểm tra tiêu đề trang khớp mẫu đã cho.", en: "`expect(page).toHaveTitle(...)` is a web-first assertion: it auto-waits and checks the page title matches the given pattern.", ja: "`expect(page).toHaveTitle(...)`はweb-firstアサーションで、自動的に待機しページタイトルが指定パターンと一致するか確認します。" },
  }),
  mcq({
    q: { vi: "Test báo lỗi 'Timeout 30000ms exceeded' khi tìm nút 'Thêm vào giỏ hàng'. Nguyên nhân THƯỜNG GẶP nhất với người mới là gì?", en: "Your test errors 'Timeout 30000ms exceeded' finding the 'Add to cart' button. What's the MOST common beginner cause?", ja: "『Thêm vào giỏ hàng』ボタンを探して『Timeout 30000ms exceeded』エラー。初心者に最も多い原因は？" },
    options: [
      { vi: "Locator sai hoặc phần tử chưa kịp xuất hiện/khớp", en: "A wrong locator, or the element hasn't appeared/matched in time", ja: "ロケーターが間違っている、または要素がまだ現れていない" },
      { vi: "Máy tính yếu", en: "A weak computer", ja: "PCの性能不足" },
      { vi: "Tên file test sai chính tả", en: "A typo in the test file name", ja: "テストファイル名のタイプミス" },
      { vi: "Dùng sai ngôn ngữ lập trình", en: "Using the wrong programming language", ja: "間違ったプログラミング言語を使用" },
    ], correct: 0,
    explain: { vi: "Timeout khi tìm phần tử gần như luôn do locator không khớp đúng phần tử mong muốn, hoặc phần tử chưa kịp bật/hiển thị.", en: "A timeout while locating almost always means the locator doesn't match the intended element, or the element wasn't ready/visible yet.", ja: "要素検索でのタイムアウトはほぼ常に、ロケーターが意図した要素に一致していないか、要素がまだ準備できていないことが原因です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & Playwright là gì", en: "1. TL;DR & what Playwright is", ja: "1. 要点とPlaywrightとは" },
    blocks: [
      TLDR("Playwright là công cụ giúp bạn viết code ngắn để trình duyệt tự làm việc thay bạn: mở trang, gõ chữ, bấm nút, rồi kiểm tra kết quả đúng hay sai. Bài này dẫn bạn cài đặt tối giản, viết bài test tự động ĐẦU TIÊN trên app TMĐT ShopEasy, chạy nó và đọc kết quả. Có hình minh hoạ, 2 tình huống lỗi thường gặp và trắc nghiệm cuối bài.",
        "Playwright is a tool that lets you write short code so a browser does work for you: open a page, type text, click buttons, then check whether the result is right. This article walks you through a minimal install, writing your FIRST automated test on the ShopEasy e-commerce app, running it, and reading the results. It includes visuals, two common failure situations, and a quiz.",
        "Playwrightは短いコードを書くだけでブラウザに作業を代行させるツールです：ページを開き、文字を入力し、ボタンを押し、結果が正しいか確認します。本記事では最小限のインストール、ECアプリShopEasyでの最初の自動テストの作成、実行、結果の読み方を案内します。図解、よくある2つの失敗シーン、最後にクイズがあります。"),
      P("Chào mừng bạn đến với automation testing! Nếu bạn từng test thủ công — mở trình duyệt, gõ tay từng bước, rồi so kết quả bằng mắt — thì Playwright sẽ giúp máy tính làm hộ bạn phần lặp đi lặp lại đó. Bạn chỉ cần viết một lần, rồi chạy lại bao nhiêu lần cũng được, trên nhiều trình duyệt cùng lúc. Bài viết này không giả định bạn biết gì trước — chúng ta sẽ đi từng bước nhỏ, có hình ảnh và ví dụ code thật.",
        "Welcome to automation testing! If you've done manual testing — opening a browser, typing each step by hand, then eyeballing the result — Playwright lets a computer handle that repetitive part for you. You write it once, then run it as many times as you like, across multiple browsers at once. This article assumes no prior knowledge — we'll go step by step, with visuals and real code examples.",
        "自動化テストの世界へようこそ！ブラウザを開き、手順を1つずつ手入力し、結果を目で確認する手動テストをしたことがあるなら、Playwrightはその繰り返し部分をコンピュータに代行させてくれます。一度書けば、何度でも、複数のブラウザで同時に実行できます。本記事は事前知識を前提とせず、図と実際のコード例を使って一歩ずつ進みます。"),
      IMG(m_shop_home, "Màn hình bạn sẽ test: trang chủ ShopEasy — mục tiêu đầu tiên là kiểm tra tiêu đề trang", "The screen you'll test: ShopEasy homepage — the first goal is checking the page title", "テスト対象画面：ShopEasyのホーム — 最初の目標はページタイトルの確認"),
      DEF("Playwright", "framework kiểm thử tự động do Microsoft phát triển, cho phép viết test chạy thật trên nhiều trình duyệt (Chromium, Firefox, WebKit).",
        "an automated testing framework built by Microsoft that lets you write tests which run for real on multiple browsers (Chromium, Firefox, WebKit).",
        "Microsoftが開発した自動テストフレームワークで、Chromium・Firefox・WebKitなど複数ブラウザで実際に動くテストを書けます。"),
    ] },
  { heading: { vi: "2. Cài đặt Playwright tối giản (từng bước)", en: "2. Minimal Playwright install (step by step)", ja: "2. Playwrightの最小限インストール（手順）" },
    blocks: [
      P("Bạn không cần cấu hình gì phức tạp. Playwright có sẵn một lệnh khởi tạo dự án mẫu, tự hỏi vài câu rồi dựng sẵn mọi thứ cho bạn: file cấu hình, thư mục test mẫu, cả 3 trình duyệt.",
        "You don't need any complex setup. Playwright ships a project-scaffolding command that asks a few questions, then sets everything up for you: the config file, a sample test folder, and all 3 browsers.",
        "複雑な設定は不要です。Playwrightにはプロジェクトを雛形生成するコマンドがあり、いくつか質問した後、設定ファイル・サンプルテストフォルダ・3つのブラウザすべてを自動で用意してくれます。"),
      STEP(1, "Mở terminal tại thư mục dự án trống, chạy lệnh khởi tạo Playwright.", "Open a terminal in an empty project folder and run the Playwright init command.", "空のプロジェクトフォルダでターミナルを開き、Playwright初期化コマンドを実行する。"),
      CODE("bash", "npm init playwright@latest"),
      STEP(2, "Trả lời các câu hỏi: chọn 'JavaScript' (đơn giản cho người mới), giữ thư mục test mặc định 'tests', chọn 'Cài luôn trình duyệt' (yes).", "Answer the prompts: choose 'JavaScript' (simplest for beginners), keep the default 'tests' folder, choose to install browsers now (yes).", "質問に答える：『JavaScript』を選択（初心者に最も簡単）、既定の『tests』フォルダを維持、ブラウザを今すぐインストール（yes）を選ぶ。"),
      STEP(3, "Đợi cài xong. Playwright sẽ tạo sẵn file cấu hình `playwright.config.js` và một file test mẫu trong thư mục `tests/`.", "Wait for it to finish. Playwright creates a `playwright.config.js` config file and a sample test file inside `tests/`.", "完了を待つ。Playwrightは`playwright.config.js`設定ファイルと`tests/`フォルダ内にサンプルテストファイルを作成する。"),
      TIP("Nếu chỉ muốn cài thêm trình duyệt sau này (ví dụ máy mới), dùng lệnh `npx playwright install`.", "If you only need to install browsers later (e.g. on a new machine), use `npx playwright install`.", "後でブラウザだけ追加インストールしたい場合（例：新しいマシン）は`npx playwright install`を使う。"),
      TRY("Chạy `npm init playwright@latest` trên máy bạn ngay bây giờ và chọn JavaScript ở bước hỏi ngôn ngữ.", "Run `npm init playwright@latest` on your machine right now and choose JavaScript at the language prompt.", "今すぐ自分のマシンで`npm init playwright@latest`を実行し、言語の質問でJavaScriptを選んでみよう。"),
    ] },
  { heading: { vi: "3. Viết bài test tự động ĐẦU TIÊN", en: "3. Writing your FIRST automated test", ja: "3. 最初の自動テストを書く" },
    blocks: [
      P("Giờ ta xoá bớt file test mẫu và viết một bài test của riêng bạn cho ShopEasy: mở trang chủ, kiểm tra tiêu đề, gõ từ khoá tìm kiếm rồi bấm Tìm kiếm. Đây là một luồng rất phổ biến bạn sẽ gặp lại nhiều lần khi test thật.",
        "Now let's clear the sample test and write your own test for ShopEasy: open the homepage, check the title, type a search keyword, then click Search. This is a very common flow you'll meet again and again in real testing.",
        "では、サンプルテストを片付けてShopEasy用の自分のテストを書きましょう：ホームページを開き、タイトルを確認し、検索キーワードを入力し、検索ボタンを押す。これは実際のテストで何度も出会う非常によくある流れです。"),
      STEP(1, "Tạo file mới `tests/shopeasy-home.spec.js` trong thư mục `tests/`.", "Create a new file `tests/shopeasy-home.spec.js` inside the `tests/` folder.", "`tests/`フォルダ内に新しいファイル`tests/shopeasy-home.spec.js`を作成する。"),
      STEP(2, "Nhập đoạn code bên dưới — đây chính là bài test tự động đầu tiên của bạn.", "Type in the code below — this is your very first automated test.", "以下のコードを入力する — これがあなたの最初の自動テストです。"),
      CODE("javascript", "import { test, expect } from '@playwright/test';\n\ntest('kiểm tra tiêu đề trang ShopEasy', async ({ page }) => {\n  // 1) Mở trang chủ ShopEasy\n  await page.goto('https://shopeasy.vn');\n\n  // 2) Kiểm tra tiêu đề trang có chứa \"ShopEasy\"\n  await expect(page).toHaveTitle(/ShopEasy/);\n\n  // 3) Gõ từ khoá vào ô tìm kiếm\n  await page.getByPlaceholder('Tìm sản phẩm').fill('Tai nghe Bluetooth');\n\n  // 4) Bấm nút Tìm kiếm\n  await page.getByRole('button', { name: 'Tìm kiếm' }).click();\n\n  // 5) Kỳ vọng: tiêu đề khu vực kết quả xuất hiện\n  await expect(page.getByRole('heading', { name: /Kết quả tìm kiếm/ })).toBeVisible();\n});"),
      TRY("Gõ lại đúng đoạn code trên vào file của bạn (đừng copy-paste) — gõ tay giúp bạn nhớ cú pháp nhanh hơn nhiều.", "Type the code above into your file yourself (don't copy-paste) — typing it by hand helps you remember the syntax much faster.", "上記コードを自分でファイルに入力してみよう（コピペしない）— 手で入力すると構文が驚くほど早く身につく。"),
      PITFALL("Quên từ khoá `await` trước mỗi hành động của Playwright — thiếu `await` khiến test chạy sai thứ tự hoặc báo lỗi khó hiểu.", "Forgetting the `await` keyword before each Playwright action — missing `await` makes the test run out of order or throw confusing errors.", "Playwrightの各操作の前に`await`を付け忘れる — `await`が無いとテストの順序が狂ったり分かりにくいエラーが出たりする。"),
    ] },
  { heading: { vi: "4. Giải thích từng dòng code vừa viết", en: "4. Explaining every line you just wrote", ja: "4. 書いたコードの各行を解説" },
    blocks: [
      P("Đừng lo nếu bạn chưa hiểu hết — hãy đọc phần giải thích sau rồi quay lại nhìn code, bạn sẽ thấy nó không đáng sợ như tưởng tượng.",
        "Don't worry if you don't understand it all yet — read the explanation below then look at the code again, and it'll feel much less intimidating.",
        "まだ完全に理解できなくても心配無用 — 以下の解説を読んでからコードを見直すと、思ったより怖くないと分かります。"),
      P("`test('tên test', async ({ page }) => { ... })` — khai báo một bài test có tên, `page` là 'trang trình duyệt' mà bạn sẽ điều khiển bên trong. `page.goto(url)` mở một địa chỉ web, giống bạn gõ URL vào thanh địa chỉ rồi Enter.",
        "`test('test name', async ({ page }) => { ... })` — declares a named test; `page` is the 'browser page' you'll control inside it. `page.goto(url)` opens a web address, just like typing a URL in the address bar and pressing Enter.",
        "`test('テスト名', async ({ page }) => { ... })` — 名前付きテストの宣言。`page`はその中で操作する『ブラウザページ』です。`page.goto(url)`はWebアドレスを開く操作で、アドレスバーにURLを入力してEnterを押すのと同じです。"),
      P("`expect(page).toHaveTitle(...)` là một 'lời khẳng định' (assertion): bạn nói ra điều bạn MONG ĐỢI là đúng, Playwright sẽ tự kiểm tra và tự chờ một chút nếu trang chưa tải kịp — bạn không cần tự viết code chờ.",
        "`expect(page).toHaveTitle(...)` is an 'assertion': you state what you EXPECT to be true, and Playwright checks it, auto-waiting a little if the page hasn't finished loading — you don't need to write waiting code yourself.",
        "`expect(page).toHaveTitle(...)`は『アサーション』です：あなたが正しいと期待することを述べ、Playwrightがそれを確認し、ページの読み込みが済んでいなければ少し自動で待ちます — 自分で待機コードを書く必要はありません。"),
      P("`page.getByPlaceholder('Tìm sản phẩm')` và `page.getByRole('button', { name: 'Tìm kiếm' })` là hai LOCATOR — cách Playwright tìm đúng phần tử trên trang trước khi thao tác (`.fill(...)` gõ chữ, `.click()` bấm). Chương 6 sẽ nói kỹ hơn về locator.",
        "`page.getByPlaceholder('Tìm sản phẩm')` and `page.getByRole('button', { name: 'Tìm kiếm' })` are two LOCATORS — how Playwright finds the right element on the page before acting (`.fill(...)` types text, `.click()` clicks). Chapter 6 covers locators in more depth.",
        "`page.getByPlaceholder('Tìm sản phẩm')`と`page.getByRole('button', { name: 'Tìm kiếm' })`は2つのロケーターです — 操作前にPlaywrightがページ上の正しい要素を見つける方法（`.fill(...)`は文字入力、`.click()`はクリック）。ロケーターの詳細は第6章で扱います。"),
      TIP("Cứ đọc code Playwright như một câu tiếng Anh: 'lấy phần tử có role button, tên Tìm kiếm, rồi click' — dễ hiểu hơn bạn nghĩ.", "Just read Playwright code like an English sentence: 'get the element with role button, name Tìm kiếm, then click' — easier than you think.", "Playwrightのコードは英語の文のように読むとよい：『roleがbutton、名前がTìm kiếmの要素を取得してクリック』— 思うより簡単です。"),
    ] },
  { heading: { vi: "5. Chạy test & xem kết quả", en: "5. Running the test & reading results", ja: "5. テストを実行して結果を見る" },
    blocks: [
      STEP(1, "Lưu file test lại, rồi mở terminal tại thư mục dự án.", "Save the test file, then open a terminal in your project folder.", "テストファイルを保存し、プロジェクトフォルダでターミナルを開く。"),
      CODE("bash", "npx playwright test"),
      STEP(2, "Chờ vài giây — Playwright tự chạy test trên cả 3 trình duyệt (Chromium, Firefox, WebKit) rồi in ra tổng kết ngay trên terminal.", "Wait a few seconds — Playwright automatically runs the test on all 3 browsers (Chromium, Firefox, WebKit) then prints a summary right in the terminal.", "数秒待つ — Playwrightは自動で3つのブラウザ（Chromium、Firefox、WebKit）すべてでテストを実行し、ターミナルにすぐ要約を表示する。"),
      IMG(m_run_result, "Tổng kết ngay sau khi chạy: bao nhiêu test Passed/Failed, chạy trên mấy trình duyệt, mất bao lâu", "Summary right after running: how many tests Passed/Failed, on how many browsers, how long it took", "実行直後の要約：Passed/Failedのテスト数、対象ブラウザ数、所要時間"),
      STEP(3, "Mở báo cáo chi tiết dạng trang web (HTML report) để xem từng bước.", "Open the detailed web-page report (HTML report) to see each step.", "各ステップを見るために詳細なWebページ形式のレポート（HTMLレポート）を開く。"),
      CODE("bash", "npx playwright show-report"),
      IMG(m_report_table, "HTML report: mỗi dòng là kết quả test trên một trình duyệt, kèm thời gian chạy", "The HTML report: each row is the test's result on one browser, with the run time", "HTMLレポート：各行は1ブラウザでのテスト結果と実行時間"),
      TRY("Chạy `npx playwright test` trên máy bạn ngay và thử mở `npx playwright show-report` để xem báo cáo thật.", "Run `npx playwright test` on your machine now, then try `npx playwright show-report` to see a real report.", "今すぐ自分のマシンで`npx playwright test`を実行し、`npx playwright show-report`で実際のレポートを見てみよう。"),
    ] },
  { heading: { vi: "6. Tìm phần tử trên trang: locator cơ bản", en: "6. Finding elements on the page: basic locators", ja: "6. ページ上の要素を見つける：基本のロケーター" },
    blocks: [
      P("Muốn bấm đúng nút hay gõ đúng ô, Playwright cần biết 'phần tử đó ở đâu'. Cách bạn chỉ đường cho Playwright gọi là locator. Có nhiều cách viết locator, nhưng người mới nên ưu tiên vài cách dễ đọc và ổn định nhất.",
        "To click the right button or type in the right field, Playwright needs to know 'where that element is'. The way you point Playwright to it is called a locator. There are many ways to write one, but beginners should prioritize the most readable and stable ones.",
        "正しいボタンを押したり正しい欄に入力したりするには、Playwrightは『その要素がどこにあるか』を知る必要があります。それを指し示す方法がロケーターです。書き方は色々ありますが、初心者は最も読みやすく安定した方法を優先すべきです。"),
      DEF("Locator (bộ định vị)", "cách Playwright dùng để tìm một phần tử cụ thể trên trang (nút, ô nhập, văn bản) trước khi thao tác lên nó.",
        "how Playwright finds a specific element on the page (a button, input, piece of text) before acting on it.",
        "Playwrightがページ上の特定の要素（ボタン・入力欄・テキスト）を操作する前に見つける方法。"),
      IMG(m_locator_table, "Các locator phổ biến nhất và khi nào nên dùng — ưu tiên getByRole trước tiên", "The most common locators and when to use each — prefer getByRole first", "最も一般的なロケーターと使いどころ — まずgetByRoleを優先"),
      P("Mẹo chọn locator cho người mới: hãy hỏi 'người dùng thật sẽ gọi phần tử này là gì?' — một cái nút tên 'Đặt hàng', hay một ô nhập có nhãn 'Số điện thoại'. `getByRole` và `getByLabel` mô phỏng đúng cách người dùng nhìn thấy trang, nên ổn định hơn khi giao diện thay đổi màu sắc hay bố cục.",
        "A beginner's tip for choosing locators: ask 'what would a real user call this element?' — a button named 'Place order', or an input labeled 'Phone number'. `getByRole` and `getByLabel` mirror how a real user sees the page, so they're more stable when the UI changes color or layout.",
        "初心者向けロケーター選びのコツ：『実際のユーザーはこの要素を何と呼ぶか？』と考える — 『注文する』という名前のボタン、あるいは『電話番号』というラベルの入力欄。`getByRole`と`getByLabel`は実際のユーザーがページを見る方法を反映するため、UIの色やレイアウトが変わっても安定しています。"),
    ] },
  { heading: { vi: "7. Tình huống 1: test bỗng dưng báo Timeout", en: "7. Situation 1: the test suddenly reports a Timeout", ja: "7. シーン1：突然のTimeoutエラー" },
    blocks: [
      SITUATION("Test của bạn chạy được vài lần rồi bỗng báo lỗi 'Timeout 30000ms exceeded' khi tìm nút 'Thêm vào giỏ hàng'.", "Your test ran fine a few times, then suddenly errors 'Timeout 30000ms exceeded' finding the 'Add to cart' button.",
        "Trang sản phẩm hôm nay tải chậm hơn bình thường do mạng yếu; nút 'Thêm vào giỏ hàng' chỉ bật lên (enabled) SAU khi ảnh sản phẩm tải xong, muộn hơn 30 giây Playwright chờ.",
        "The product page loads slower than usual today due to a weak connection; the 'Add to cart' button only becomes enabled AFTER the product image finishes loading, later than the 30 seconds Playwright waits.",
        "テストは何度か正常に動いていたが、突然『Thêm vào giỏ hàng』ボタン検索で『Timeout 30000ms exceeded』エラー。",
        "回線が弱く今日は商品ページの読み込みがいつもより遅い。『Thêm vào giỏ hàng』ボタンは商品画像の読み込み完了後にのみ有効になり、Playwrightが待つ30秒より遅れる。"),
      SOLVE("Đừng thêm `page.waitForTimeout(...)` phỏng đoán thời gian — hãy dùng web-first assertion để tự chờ đúng điều kiện: `await expect(page.getByRole('button', { name: 'Thêm vào giỏ hàng' })).toBeEnabled();` trước khi `.click()`.", "Don't add a guessed `page.waitForTimeout(...)` — use a web-first assertion to wait for the right condition instead: `await expect(page.getByRole('button', { name: 'Thêm vào giỏ hàng' })).toBeEnabled();` before `.click()`.", "推測で`page.waitForTimeout(...)`を足さない — 正しい条件を待つweb-firstアサーションを使う：`.click()`の前に`await expect(page.getByRole('button', { name: 'Thêm vào giỏ hàng' })).toBeEnabled();`。"),
      P("Điều quan trọng cần hiểu: Playwright đã TỰ chờ sẵn (auto-wait) cho hầu hết hành động, nhưng nó chỉ chờ theo ĐIỀU KIỆN bạn yêu cầu (ví dụ 'phần tử có hiển thị không', 'có bật không'), chứ không đọc được ý định của bạn. Người mới hay phản xạ thêm `waitForTimeout(500)` cho 'chắc ăn' — đây là phỏng đoán, không phải điều kiện thật, nên vẫn có thể fail khi mạng chậm hơn dự đoán.",
        "The key thing to understand: Playwright already auto-waits for most actions, but it only waits for the CONDITION you ask for (e.g. 'is it visible', 'is it enabled') — it can't read your intent. Beginners often reflexively add `waitForTimeout(500)` 'just to be safe' — that's a guess, not a real condition, so it can still fail when the network is slower than expected.",
        "理解すべき重要な点：Playwrightはほとんどの操作で既に自動待機しますが、それはあなたが求めた『条件』（例：表示されているか、有効になっているか）に対してのみで、意図を読み取ってはくれません。初心者は『念のため』反射的に`waitForTimeout(500)`を足しがちですが、これは推測であり本当の条件ではないため、想定より回線が遅い時は依然として失敗し得ます。"),
      IMG(m_fail_timeout, "Màn hình lỗi: nút vẫn bị mờ (disabled) khi Playwright hết thời gian chờ", "The failing screen: the button is still greyed out (disabled) when Playwright's wait runs out", "失敗画面：Playwrightの待機時間切れ時にボタンがまだ無効（灰色）"),
    ] },
  { heading: { vi: "8. Tình huống 2: locator chọn nhầm phần tử", en: "8. Situation 2: the locator matches the wrong element", ja: "8. シーン2：ロケーターが要素を誤って一致" },
    blocks: [
      SITUATION("Bạn viết `page.getByText('Thêm vào giỏ').click()` cho trang danh sách sản phẩm, nhưng Playwright báo lỗi 'strict mode violation: locator resolved to 3 elements'.", "You write `page.getByText('Thêm vào giỏ').click()` for the product listing page, but Playwright errors 'strict mode violation: locator resolved to 3 elements'.",
        "Trang danh mục có 3 sản phẩm, mỗi sản phẩm đều có một nút 'Thêm vào giỏ' giống hệt nhau về chữ. `getByText` khớp cả 3 nút cùng lúc nên Playwright không biết bạn muốn bấm nút nào, và từ chối bấm bừa để tránh sai.",
        "The category page lists 3 products, and each has an identical 'Thêm vào giỏ' button by text. `getByText` matches all 3 at once, so Playwright doesn't know which one you want, and refuses to click blindly to avoid mistakes.",
        "商品一覧ページで`page.getByText('Thêm vào giỏ').click()`と書いたが、Playwrightが『strict mode violation: locator resolved to 3 elements』とエラー。",
        "カテゴリページには3つの商品があり、それぞれ同じ文字の『Thêm vào giỏ』ボタンを持つ。`getByText`は3つ全てに一致するため、Playwrightはどれを押すべきか分からず、誤クリックを避けるため実行を拒否する。"),
      SOLVE("Thu hẹp phạm vi tìm kiếm về đúng 1 sản phẩm trước, ví dụ dùng thẻ chứa sản phẩm đó: `await page.getByRole('listitem').filter({ hasText: 'Tai nghe B' }).getByRole('button', { name: 'Thêm vào giỏ' }).click();`", "Narrow the search to just the one product's container first, e.g.: `await page.getByRole('listitem').filter({ hasText: 'Tai nghe B' }).getByRole('button', { name: 'Thêm vào giỏ' }).click();`", "まず対象商品のコンテナに範囲を絞る。例：`await page.getByRole('listitem').filter({ hasText: 'Tai nghe B' }).getByRole('button', { name: 'Thêm vào giỏ' }).click();`"),
      P("Lỗi 'strict mode violation' không phải Playwright đang 'khó tính' — nó đang BẢO VỆ bạn khỏi bấm nhầm sản phẩm trong lúc chạy tự động, thứ mà test thủ công bằng mắt sẽ không tự phát hiện được. Bài học cho người mới: khi trang có nhiều phần tử giống nhau (danh sách sản phẩm, danh sách dòng bảng), hãy luôn thu hẹp phạm vi về đúng một 'khối chứa' trước khi tìm nút/ô nhập bên trong nó.",
        "The 'strict mode violation' isn't Playwright being 'picky' — it's PROTECTING you from clicking the wrong product during automated runs, something manual eyeballing wouldn't catch by itself. The lesson for beginners: whenever a page has many similar elements (a product list, table rows), always narrow to the correct one 'container' first before finding a button/input inside it.",
        "『strict mode violation』はPlaywrightが『気難しい』わけではありません — 自動実行中に誤った商品をクリックすることからあなたを守っているのです。これは目視の手動テストでは自然には気づけないことです。初心者への教訓：ページに似た要素が多くある場合（商品リスト、テーブル行など）、内部のボタン/入力欄を探す前に、必ず正しい1つの『コンテナ』へ範囲を絞りましょう。"),
      IMG(m_multi_add, "3 sản phẩm cùng có nút 'Thêm vào giỏ' — cần thu hẹp về đúng 1 sản phẩm trước khi bấm", "3 products all with a 'Thêm vào giỏ' button — narrow to the one product before clicking", "3つの商品すべてに『Thêm vào giỏ』ボタン — クリック前に対象商品へ範囲を絞る必要がある"),
      RECAP(["Timeout thường do chờ sai điều kiện, không phải máy yếu — dùng web-first assertion thay vì đoán thời gian", "Nhiều phần tử giống nhau → thu hẹp về đúng 1 khối chứa trước khi tìm nút/ô nhập bên trong"],
        ["A timeout usually means waiting for the wrong condition, not a weak machine — use web-first assertions instead of guessing a duration", "Many similar elements → narrow to the correct container first before finding a button/input inside it"],
        ["タイムアウトは通常マシンが弱いのではなく待機条件が誤り — 時間を推測せずweb-firstアサーションを使う", "似た要素が多い場合→内部の要素を探す前に正しいコンテナへ範囲を絞る"]),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo cho người mới", en: "9. Common mistakes & tips for beginners", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Trước khi khép lại phần thực hành, đây là vài điều người mới hay vấp phải khi mới bắt đầu với Playwright — biết trước giúp bạn tiết kiệm rất nhiều thời gian gỡ lỗi.",
        "Before wrapping up the hands-on part, here are a few things beginners commonly trip over when starting with Playwright — knowing them ahead of time saves a lot of debugging time.",
        "実践部分を終える前に、Playwrightを始めたばかりの初心者がよくつまずく点をいくつか紹介します — 事前に知っておくとデバッグ時間を大きく節約できます。"),
      PITFALL("Chạy test nhắm vào website thật của công ty khác mà chưa xin phép — chỉ nên test trên môi trường staging/demo do đội bạn kiểm soát.", "Running tests against another company's real live site without permission — only test on a staging/demo environment your team controls.", "許可なく他社の本番サイトに対してテストを実行する — チームが管理するステージング/デモ環境でのみテストすること。"),
      PITFALL("Viết một test làm quá nhiều việc (đăng nhập + tìm kiếm + thêm giỏ + thanh toán) ngay từ đầu — test dài khó đọc và khó biết bước nào fail.", "Writing one test that does too much at once (login + search + add to cart + checkout) right away — long tests are hard to read and hard to tell which step failed.", "最初から多くを一度に行うテスト（ログイン＋検索＋カート追加＋決済）を書く — 長いテストは読みにくく、どのステップで失敗したか分かりにくい。"),
      TIP("Đặt tên test rõ ràng theo mẫu 'kiểm tra + hành động + kết quả mong đợi', ví dụ 'kiểm tra tiêu đề trang ShopEasy' — khi test fail, tên test tự nó đã nói lên vấn đề.", "Name tests clearly using a 'check + action + expected result' pattern, e.g. 'checks ShopEasy page title' — when a test fails, its name alone tells you the problem.", "『確認+行動+期待結果』の形で明確なテスト名を付ける。例『ShopEasyのページタイトルを確認』— テストが失敗した時、名前だけで問題が分かる。"),
      TIP("Chạy `npx playwright test --ui` để mở chế độ UI Mode — xem trực quan từng bước test chạy, rất hữu ích khi mới học.", "Run `npx playwright test --ui` to open UI Mode — a visual way to watch each test step run, very useful while learning.", "`npx playwright test --ui`でUIモードを開く — 各テストステップの実行を視覚的に見られ、学習中にとても役立つ。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug (defect) life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenarios & checklists for beginners", "test-scenario-checklist-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa hoàn thành hành trình đầu tiên với Playwright trên app ShopEasy: hiểu Playwright là gì, cài đặt tối giản, viết một bài test tự động thật (mở trang, kiểm tra tiêu đề, tìm kiếm), chạy nó và đọc kết quả qua terminal lẫn HTML report. Bạn cũng học cách xử lý hai lỗi rất phổ biến — Timeout và locator khớp nhầm nhiều phần tử — điều mà hầu như ai học automation cũng gặp trong tuần đầu tiên.",
        "You just completed your first journey with Playwright on the ShopEasy app: understanding what Playwright is, doing a minimal install, writing a real automated test (open the page, check the title, search), running it, and reading results via both the terminal and the HTML report. You also learned to handle two very common failures — Timeouts and a locator matching multiple elements — something almost everyone learning automation hits in their first week.",
        "ShopEasyアプリでPlaywrightの最初の旅を終えました：Playwrightとは何か、最小限のインストール、実際の自動テストの作成（ページを開き、タイトルを確認し、検索する）、実行、ターミナルとHTMLレポート両方での結果の読み方。また、自動化を学ぶほぼ全員が最初の週に出会う、TimeoutとロケーターがA複数要素に一致する、という2つの非常によくある失敗への対処法も学びました。"),
      P("Chặng tiếp theo, bạn nên luyện thêm các locator nâng cao hơn (filter, nth, chaining), học cách tổ chức nhiều test bằng Page Object Model, và ghép Playwright vào một pipeline CI/CD để test tự chạy mỗi khi có thay đổi code. Nếu muốn học automation testing bài bản, có người hướng dẫn và dự án thực chiến từ Zero tới đi làm, một khoá học Tester chuyên nghiệp sẽ giúp bạn tiến rất nhanh.",
        "Next, practice more advanced locators (filter, nth, chaining), learn to organize many tests with the Page Object Model, and wire Playwright into a CI/CD pipeline so tests run automatically on every code change. If you want to learn automation testing properly, with a mentor and real projects, from Zero to hired, a professional Tester course will help you progress very fast.",
        "次のステップとして、より高度なロケーター（filter、nth、チェーン）を練習し、Page Object Modelで多数のテストを整理する方法を学び、コード変更のたびに自動実行されるようPlaywrightをCI/CDパイプラインに組み込みましょう。指導者と実際のプロジェクトで、ゼロから就職まで体系的に自動化テストを学びたいなら、プロのテスターコースが非常に速い成長を助けます。"),
      CTA(course),
    ] },
];

const CNM_BEG_PW_DOC = makeDoc({
  slug: "playwright-cho-nguoi-moi-test-dau-tien",
  domain: "ecommerce",
  primaryKeyword: "Playwright cho người mới",
  keywords: ["Playwright cho người mới", "Playwright là gì", "viết test Playwright đầu tiên", "cài đặt Playwright", "automation testing cho người mới"],
  coverLabel: "NGƯỜI MỚI · PLAYWRIGHT · TMĐT",
  crumb: "Playwright cho người mới: test tự động đầu tiên",
  metaTitle: { vi: "Playwright cho người mới: viết test đầu tiên", en: "Playwright for beginners: write your first test", ja: "初心者のためのPlaywright：最初のテスト作成" },
  metaDescription: {
    vi: "Playwright cho người mới: hướng dẫn cài đặt tối giản, viết bài test tự động đầu tiên và chạy thử trên app TMĐT ShopEasy, có hình minh hoạ và trắc nghiệm.",
    en: "Playwright for beginners: a minimal install guide, writing your first automated test, and running it on the ShopEasy e-commerce app, with visuals and a reinforcing quiz.",
    ja: "初心者向けPlaywright：最小限のインストール手順、最初の自動テストの作成、ECアプリShopEasyでの実行を、図解と理解度クイズ付きで解説します。",
  },
  title: {
    vi: "Playwright cho người mới: viết bài test tự động ĐẦU TIÊN (có trắc nghiệm)",
    en: "Playwright for beginners: writing your FIRST automated test (with quiz)",
    ja: "初心者のためのPlaywright：最初の自動テストを書く（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: Playwright là gì, cài đặt tối giản chỉ một lệnh, viết bài test tự động đầu tiên qua app TMĐT ShopEasy, giải thích từng dòng code, chạy test và đọc kết quả (terminal + HTML report), locator cơ bản, 2 tình huống lỗi thường gặp (Timeout, locator khớp nhầm) có cách giải, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: what Playwright is, a one-command minimal install, writing your first automated test through the ShopEasy e-commerce app, explaining every line, running the test and reading results (terminal + HTML report), basic locators, 2 common failure situations (Timeout, mismatched locator) with fixes, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：Playwrightとは何か、1コマンドの最小限インストール、ECアプリShopEasyでの最初の自動テスト作成、各行の解説、テストの実行と結果の読み方（ターミナル＋HTMLレポート）、基本のロケーター、よくある2つの失敗シーン（Timeout、ロケーターの誤一致）とその対処、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết và chạy bài test Playwright đầu tiên", steps: [
    { name: "Cài đặt tối giản", text: "Chạy `npm init playwright@latest`, chọn JavaScript, giữ cấu hình mặc định." },
    { name: "Viết bài test đầu tiên", text: "Mở trang, kiểm tra tiêu đề, tìm kiếm sản phẩm bằng locator getByRole/getByPlaceholder." },
    { name: "Chạy & xem kết quả", text: "Chạy `npx playwright test` rồi mở `npx playwright show-report` để xem báo cáo chi tiết." },
  ] },
  pages,
});

export const CNM_BEG_PW_01 = [CNM_BEG_PW_DOC];
