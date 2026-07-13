// doc_au_pom.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Page Object Model (POM) — vì sao cần tách locator/hành động khỏi test, cấu trúc thư mục,
// cách viết Page Object đầu tiên, tái sử dụng, và giữ script automation bền vững khi UI đổi.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright/JS chạy được.
// Gắn app TMĐT ShopEasy (trang đăng nhập + giỏ hàng). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
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

// ── Mockup 1: màn hình đăng nhập ShopEasy, chú thích locator từng phần tử ──
const m_login = browser("shopeasy.vn/dang-nhap", [
  panel("ShopEasy · Đăng nhập", [
    field(24, 20, 660, "Email", "mai.tran@gmail.com", "normal"),
    field(24, 112, 660, "Mật khẩu", "••••••••", "normal"),
    btn(24, 204, 220, "Đăng nhập", "primary"),
    annotate(20, 10, 668, 72, "Locator: #email-input"),
    annotate(20, 102, 668, 72, "Locator: #password-input"),
    annotate(20, 196, 228, 50, "Locator: #btn-login"),
  ].join(""), { h: 280, accent: "#0891b2" }),
].join(""), { h: 336, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: bảng trước/sau khi áp dụng Page Object Model ──
const m_baseafter = grid("Trước và sau khi áp dụng Page Object Model", ["Tiêu chí", "KHÔNG dùng POM", "CÓ dùng POM"], [
  ["Vị trí locator", "Viết thẳng trong từng file test", "Gom trong 1 lớp Page Object (LoginPage, CartPage...)"],
  ["UI đổi id nút", "Phải sửa lại ở MỌI file test có dùng nút đó", "Chỉ sửa đúng 1 chỗ trong Page Object"],
  ["Luồng đăng nhập lặp lại", "Copy-paste code đăng nhập ở nhiều test", "Gọi loginPage.login(email, password)"],
  ["Đọc hiểu test mới", "Lẫn lộn thao tác UI và logic kiểm tra", "Test đọc như câu chuyện nghiệp vụ, dễ hiểu"],
  ["Bảo trì khi dự án lớn", "Ngày càng giòn, sợ sửa vì dễ vỡ nhiều nơi", "Ổn định hơn, sửa 1 nơi đúng phạm vi ảnh hưởng"],
], { accent: "#0891b2", note: "Cùng 1 tính năng, chỉ khác cách tổ chức code — nhưng chi phí bảo trì khác nhau rất nhiều." });

// ── Mockup 3: sơ đồ tách Test ↔ Page Object ↔ Giao diện ──
const m_flow = moduleFlow("Sơ đồ tách Test ↔ Page Object ↔ Giao diện ShopEasy", [
  { id: "test", label: "Test file", sub: "login.spec.js", x: 96, y: 150 },
  { id: "page", label: "Page Object", sub: "class LoginPage", x: 380, y: 150 },
  { id: "ui", label: "Giao diện ShopEasy", sub: "DOM thật trên trình duyệt", x: 664, y: 150 },
], [
  { from: "test", to: "page", label: "gọi loginPage.login()" },
  { from: "page", to: "ui", label: "thao tác #email-input..." },
], { accent: "#0891b2", h: 260 });

// ── Mockup 4: cấu trúc thư mục dự án automation dùng POM ──
const m_folder = grid("Cấu trúc thư mục dự án automation dùng POM", ["Thư mục / Tệp", "Vai trò"], [
  ["pages/LoginPage.js", "Lớp Page Object: locator + hành động của màn Đăng nhập"],
  ["pages/CartPage.js", "Lớp Page Object: locator + hành động của màn Giỏ hàng"],
  ["pages/BasePage.js", "Lớp cha chứa hành vi dùng chung (goto, chờ tải trang...)"],
  ["tests/login.spec.js", "Kịch bản test dùng LoginPage, KHÔNG chứa locator trực tiếp"],
  ["tests/cart.spec.js", "Kịch bản test dùng LoginPage + CartPage"],
  ["playwright.config.js", "Cấu hình chạy test: trình duyệt, baseURL, số lần thử lại"],
], { accent: "#0891b2", note: "Mỗi màn hình ShopEasy ứng với đúng 1 lớp Page Object; test chỉ gọi hàm, không tự tìm locator." });

// ── Mockup 5: ticket Jira khi UI đổi id nút làm hỏng hàng loạt test không dùng POM ──
const m_jira = jira({
  key: "SE-13402", title: "Đổi id nút Đăng nhập (#btn-login -> #btn-signin) làm hỏng 50 test không dùng POM",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · CI pipeline"],
    ["Nguyên nhân", "Team automation viết locator '#btn-login' lặp lại trực tiếp trong 50 file test khác nhau, không qua Page Object"],
    ["Ảnh hưởng", "Sau khi FE đổi id nút, 50 test báo đỏ đồng loạt dù tính năng đăng nhập vẫn hoạt động bình thường"],
    ["Đề xuất", "Refactor sang Page Object Model: gom locator nút vào LoginPage, chỉ sửa đúng 1 chỗ khi UI đổi"],
  ],
});

// ── Mockup 6: bảng kanban nợ kỹ thuật do locator lặp lại khắp nơi ──
const m_kanban = kanban("Nợ kỹ thuật do locator lặp lại khắp nơi (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-13410", title: "Locator '#cart-quantity' lặp lại trong 12 file test", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-13402", title: "Refactor LoginPage sau sự cố đổi id nút", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-13399", title: "Tách CartPage khỏi test giỏ hàng", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-13380", title: "Tạo BasePage dùng chung cho mọi Page Object", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Page Object Model (POM) là gì?",
  "What is the Page Object Model (POM)?",
  "Page Object Model là một cách tổ chức code automation, trong đó mỗi màn hình (hoặc thành phần) của ứng dụng được đại diện bởi một lớp (class) riêng — gọi là Page Object — chứa các locator (cách tìm phần tử) và các hành động (nhập liệu, bấm nút...) trên màn hình đó. File test chỉ gọi các hàm của lớp này, không tự tìm locator hay thao tác trực tiếp lên giao diện.",
  "The Page Object Model is a way to organize automation code where each screen (or component) of the app is represented by its own class — called a Page Object — containing the locators (how to find elements) and the actions (typing, clicking...) on that screen. Test files only call this class's functions, instead of finding locators or manipulating the UI directly.",
  "Page Object Modelとは何？",
  "Page Object Modelとは、アプリの各画面（またはコンポーネント）をPage Objectと呼ばれる専用クラスで表すという、自動化コードの整理方法です。このクラスにはロケーター（要素の探し方）とその画面での操作（入力、クリックなど）が入ります。テストファイルはこのクラスの関数を呼ぶだけで、自分でロケーターを探したりUIを直接操作したりしません。");
const faq2 = FAQ(
  "POM khác gì so với viết test 'thẳng' không qua lớp trung gian?",
  "How is POM different from writing tests 'directly' without a middle layer?",
  "Viết test 'thẳng' nghĩa là mọi locator và hành động được viết ngay trong file test, dẫn tới trùng lặp code ở nhiều file khi nhiều test cùng dùng chung một màn hình (như đăng nhập). POM tách phần 'biết giao diện' (locator, thao tác) ra một lớp riêng, còn file test chỉ tập trung vào 'logic kiểm tra' (input nào, mong đợi kết quả gì) — nhờ đó khi giao diện đổi, bạn chỉ sửa đúng 1 chỗ thay vì lục lại từng file test.",
  "Writing tests 'directly' means every locator and action is written right inside the test file, causing duplicated code across many files whenever multiple tests share the same screen (like login). POM separates the 'UI-aware' part (locators, actions) into its own class, so the test file only focuses on 'verification logic' (what input, what expected result) — so when the UI changes, you fix exactly one place instead of digging through every test file.",
  "中間層を挟まず『そのまま』テストを書くのとPOMは何が違う？",
  "『そのまま』書くとは、すべてのロケーターと操作をテストファイルに直接書くことで、複数のテストが同じ画面（ログインなど）を共有するたびにコードが重複します。POMは『UIを知っている』部分（ロケーター・操作）を専用クラスに分離し、テストファイルは『検証ロジック』（どの入力、どんな期待結果か）だけに集中できます。そのためUIが変わった時、全テストファイルを探し回らず、たった1箇所を直せば済みます。");
const faq3 = FAQ(
  "Có bắt buộc dùng POM ngay từ dự án automation đầu tiên không?",
  "Do I have to use POM right from my very first automation project?",
  "Không bắt buộc cho vài test rời rạc, viết một lần rồi bỏ. Nhưng rất nên áp dụng ngay khi dự án có từ vài chục test trở lên, hoặc nhiều test dùng chung một màn hình (như đăng nhập, giỏ hàng). Áp dụng POM sớm giúp bạn tránh phải dừng lại refactor toàn bộ code khi dự án phình to — tương tự việc dọn nhà sớm thay vì đợi đồ chất đầy mới dọn.",
  "It's not required for a few one-off tests written once and discarded. But it's strongly recommended once a project reaches a few dozen tests, or when many tests share the same screen (like login, cart). Adopting POM early saves you from having to stop and refactor the whole codebase once the project grows large — similar to tidying up early instead of waiting until things pile up.",
  "最初の自動化プロジェクトから必ずPOMを使わなければならない？",
  "数個限りで一度書いて終わりのテストなら必須ではありません。しかしプロジェクトが数十個以上のテストになったり、多くのテストが同じ画面（ログインやカートなど）を共有したりする場合は、早めに導入することを強くお勧めします。POMを早く導入すれば、プロジェクトが大きくなってからコード全体をリファクタリングする羽目にならずに済みます——物が溜まってから片付けるより、早めに整理しておくのと同じです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích cốt lõi của Page Object Model (POM) là gì?", en: "What is the core purpose of the Page Object Model (POM)?", ja: "Page Object Model（POM）の核心的な目的は何？" },
    options: [
      { vi: "Tách locator và hành động trên giao diện ra khỏi logic kiểm tra trong file test", en: "Separate UI locators and actions from the verification logic in test files", ja: "UIのロケーターと操作をテストファイルの検証ロジックから分離すること" },
      { vi: "Làm test chạy nhanh hơn bằng cách bỏ bớt bước chờ", en: "Make tests run faster by skipping wait steps", ja: "待機ステップを省いてテストを高速化すること" },
      { vi: "Tự động sinh dữ liệu kiểm thử ngẫu nhiên", en: "Automatically generate random test data", ja: "ランダムなテストデータを自動生成すること" },
      { vi: "Thay thế hoàn toàn việc viết test", en: "Completely replace the need to write tests", ja: "テストを書く必要を完全になくすこと" },
    ], correct: 0,
    explain: { vi: "POM gom locator + hành động vào 1 lớp Page Object riêng, để file test chỉ tập trung vào việc kiểm tra kết quả.", en: "POM groups locators + actions into a dedicated Page Object class, so test files can focus purely on verifying results.", ja: "POMはロケーターと操作を専用のPage Objectクラスにまとめ、テストファイルは結果の検証に専念できます。" },
  }),
  mcq({
    q: { vi: "Trong POM, locator của một phần tử (ví dụ nút Đăng nhập) nên được đặt ở đâu?", en: "In POM, where should the locator for an element (e.g. the Login button) be placed?", ja: "POMでは、ある要素（例：ログインボタン）のロケーターはどこに置くべき？" },
    options: [
      { vi: "Trong lớp Page Object tương ứng với màn hình chứa phần tử đó", en: "In the Page Object class that corresponds to the screen containing that element", ja: "その要素を含む画面に対応するPage Objectクラスの中" },
      { vi: "Rải đều trong mọi file test có nhắc tới nút đó", en: "Spread across every test file that mentions that button", ja: "そのボタンに言及するすべてのテストファイルに分散させる" },
      { vi: "Trong file cấu hình playwright.config.js", en: "In the playwright.config.js configuration file", ja: "playwright.config.js設定ファイルの中" },
      { vi: "Không cần lưu ở đâu, gõ lại mỗi lần dùng", en: "No need to store it anywhere, retype it every time it's used", ja: "どこにも保存せず、使うたびに書き直す" },
    ], correct: 0,
    explain: { vi: "Locator thuộc về Page Object của đúng màn hình đó — đây là nơi duy nhất 'biết' cách tìm phần tử trên giao diện.", en: "The locator belongs to that screen's Page Object — the single place that 'knows' how to find the element on the UI.", ja: "ロケーターはその画面のPage Objectに属します——UI上で要素を見つける方法を『知っている』唯一の場所です。" },
  }),
  mcq({
    q: { vi: "Khi FE đổi id của nút Đăng nhập, dự án CÓ dùng POM cần sửa ở đâu?", en: "When FE changes the Login button's id, where does a project USING POM need to be fixed?", ja: "フロントエンドがログインボタンのidを変更したとき、POMを使うプロジェクトはどこを直せばよい？" },
    options: [
      { vi: "Sửa lại ở từng file test có dùng nút đó, có thể là hàng chục file", en: "Fix it in every test file that uses that button, possibly dozens of files", ja: "そのボタンを使う各テストファイル、場合によっては数十ファイルを修正する" },
      { vi: "Chỉ sửa đúng 1 chỗ: locator trong lớp Page Object của màn hình đó", en: "Fix exactly one place: the locator inside that screen's Page Object class", ja: "たった1箇所、その画面のPage Objectクラス内のロケーターだけを直す" },
      { vi: "Không cần sửa gì, test sẽ tự nhận diện lại nút", en: "No fix needed, tests will automatically re-detect the button", ja: "何も直さなくても、テストが自動的にボタンを再検出する" },
      { vi: "Phải viết lại toàn bộ bộ test từ đầu", en: "Must rewrite the entire test suite from scratch", ja: "テストスイート全体を最初から書き直さなければならない" },
    ], correct: 1,
    explain: { vi: "Nhờ locator chỉ tồn tại ở 1 nơi (Page Object), việc UI đổi id chỉ tốn đúng 1 lần sửa thay vì rà khắp bộ test.", en: "Because the locator exists in only one place (the Page Object), a UI id change costs exactly one fix instead of hunting through the whole suite.", ja: "ロケーターが1箇所（Page Object）にしか存在しないため、UIのid変更は全テストを探し回らず1回の修正で済みます。" },
  }),
  mcq({
    q: { vi: "Vì sao gọi loginPage.login(email, password) trong nhiều test lại tốt hơn copy-paste code đăng nhập?", en: "Why is calling loginPage.login(email, password) in many tests better than copy-pasting the login code?", ja: "多くのテストでloginPage.login(email, password)を呼ぶことが、ログインコードをコピペするより良い理由は？" },
    options: [
      { vi: "Vì code chạy nhanh hơn đáng kể", en: "Because the code runs significantly faster", ja: "コードが著しく速く動くから" },
      { vi: "Vì tránh trùng lặp code, và khi luồng đăng nhập đổi chỉ cần sửa 1 hàm login() là mọi test dùng nó đều cập nhật theo", en: "Because it avoids duplicated code, and when the login flow changes, fixing just the login() function updates every test that uses it", ja: "コード重複を避けられ、ログインフローが変わってもlogin()関数を1つ直すだけで、それを使う全テストに反映されるから" },
      { vi: "Vì test sẽ không cần chạy trên trình duyệt thật nữa", en: "Because tests no longer need to run on a real browser", ja: "テストが実ブラウザで動く必要がなくなるから" },
      { vi: "Vì đây là cách duy nhất Playwright chấp nhận", en: "Because it's the only way Playwright accepts", ja: "これがPlaywrightが受け入れる唯一の方法だから" },
    ], correct: 1,
    explain: { vi: "Tái sử dụng hàm login() giúp mọi test hưởng lợi ngay khi luồng đăng nhập đổi, không phải sửa từng nơi copy-paste.", en: "Reusing the login() function means every test benefits immediately when the login flow changes, instead of fixing each copy-pasted spot.", ja: "login()関数を再利用すれば、ログインフローが変わってもコピペした箇所を1つずつ直す必要がなく、全テストがすぐ恩恵を受けます。" },
  }),
  mcq({
    q: { vi: "Điều gì KHÔNG nên đặt bên trong một lớp Page Object (như LoginPage)?", en: "What should NOT be placed inside a Page Object class (like LoginPage)?", ja: "Page Objectクラス（LoginPageなど）の中に置くべきではないものは？" },
    options: [
      { vi: "Locator của các phần tử trên màn hình đó", en: "Locators for the elements on that screen", ja: "その画面の要素のロケーター" },
      { vi: "Các hàm hành động như login(), goto()", en: "Action functions like login(), goto()", ja: "login()やgoto()のようなアクション関数" },
      { vi: "Các câu assert/expect kiểm tra kết quả kinh doanh của một ca test cụ thể", en: "assert/expect statements checking the business result of a specific test case", ja: "特定のテストケースのビジネス結果を検証するassert/expect文" },
      { vi: "Constructor nhận vào đối tượng page của Playwright", en: "A constructor that receives Playwright's page object", ja: "Playwrightのpageオブジェクトをうけとるコンストラクタ" },
    ], correct: 2,
    explain: { vi: "Assert thuộc về từng ca test cụ thể (mong đợi gì) — nên đặt trong file test, không đặt trong Page Object vốn chỉ 'biết' giao diện.", en: "Assertions belong to each specific test case (what's expected) — they belong in the test file, not the Page Object, which only 'knows' the UI.", ja: "アサーションは各テストケース固有のもの（何を期待するか）——UIだけを『知っている』Page Objectではなく、テストファイルに置くべきです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Page Object Model (POM) là cách tổ chức code automation: mỗi màn hình có 1 lớp riêng chứa locator + hành động, còn file test chỉ gọi hàm để kiểm tra kết quả. Bài này bám màn đăng nhập và giỏ hàng của app TMĐT ShopEasy: bạn học vì sao cần POM, cách tách test khỏi locator, cấu trúc thư mục chuẩn, và viết class LoginPage/CartPage bằng Playwright chạy được thật. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "The Page Object Model (POM) organizes automation code: each screen gets its own class holding locators + actions, while test files just call functions to verify results. This follows ShopEasy's login and cart screens: you'll learn why POM matters, how to separate tests from locators, a standard folder structure, and how to write real, runnable LoginPage/CartPage classes in Playwright. Lots of visuals and a quiz at the end.",
        "Page Object Model（POM）は自動化コードの整理法です：各画面がロケーターと操作を持つ専用クラスを持ち、テストファイルは結果を検証するために関数を呼ぶだけになります。本記事はECアプリShopEasyのログイン画面とカートに沿い、POMがなぜ必要か、テストとロケーターの分離方法、標準的なフォルダ構成、そして実際に動くLoginPage/CartPageクラスのPlaywrightでの書き方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi vừa học automation, phản xạ tự nhiên là viết thẳng: mở trình duyệt, tìm phần tử bằng id, click, nhập liệu — tất cả nằm gọn trong 1 file test. Cách này chạy tốt với vài test đầu tiên. Nhưng khi số lượng test tăng lên vài chục, và nhiều test cùng phải 'đăng nhập' trước khi làm việc khác, bạn sẽ thấy cùng một đoạn code lặp đi lặp lại ở khắp nơi. Page Object Model chính là cách giải quyết vấn đề này: gom mọi thứ 'biết về giao diện' vào một lớp riêng, để file test chỉ còn tập trung vào việc kiểm tra đúng/sai. Chúng ta sẽ học qua màn đăng nhập và giỏ hàng thật của ShopEasy, có hình minh hoạ và code Playwright chạy được.",
        "Hi, newcomer! When you first learn automation, the natural instinct is to write everything directly: open the browser, find an element by id, click, type — all crammed into one test file. That works fine for the first few tests. But once you have a few dozen tests, and many of them must 'log in' before doing anything else, you'll notice the same code block repeated everywhere. The Page Object Model solves exactly this: it gathers everything that 'knows about the UI' into its own class, so test files can focus purely on checking right versus wrong. We'll learn through ShopEasy's real login and cart screens, with visuals and runnable Playwright code.",
        "こんにちは、初心者さん！自動化を学び始めると、ブラウザを開き、idで要素を探し、クリックし、入力する——すべてを1つのテストファイルに詰め込む、という自然な反応をします。最初の数個のテストならそれでうまくいきます。しかしテストが数十個になり、多くが他の作業の前に『ログイン』しなければならないとき、同じコードがあちこちで繰り返されているのに気づくでしょう。Page Object Modelはまさにこれを解決します：『UIを知っている』すべてを専用クラスに集約し、テストファイルは正誤の検証だけに専念できるようにします。実際のShopEasyのログイン画面とカートを通じて、図と動くPlaywrightコード付きで学びます。"),
      IMG(m_login, "Màn hình test: trang đăng nhập ShopEasy, chú thích locator từng ô nhập và nút", "Screen under test: ShopEasy login page, annotated with the locator for each field and button", "テスト対象画面：ShopEasyログインページ、各入力欄とボタンのロケーターを注記"),
      DEF("Page Object Model", "cách tổ chức code automation, mỗi màn hình ứng dụng có 1 lớp riêng chứa locator và hành động, file test chỉ gọi hàm của lớp đó.",
        "a way to organize automation code where each app screen has its own class holding locators and actions, and test files only call that class's functions.",
        "アプリの各画面がロケーターと操作を持つ専用クラスを持ち、テストファイルはそのクラスの関数だけを呼ぶという、自動化コードの整理法。"),
    ] },
  { heading: { vi: "2. Vấn đề: test tự động không có cấu trúc rõ ràng", en: "2. The problem: automation without a clear structure", ja: "2. 問題：構造のない自動化テスト" },
    blocks: [
      P("Hãy hình dung bạn viết 10 test cho ShopEasy, và cả 10 test đều cần đăng nhập trước. Nếu không có cấu trúc, mỗi file test sẽ có đúng đoạn code: tìm ô email bằng '#email-input', tìm ô mật khẩu bằng '#password-input', click nút '#btn-login'. Ban đầu điều này có vẻ vô hại — chỉ là copy-paste vài dòng. Nhưng khi dự án lớn lên tới 50, 100 test, cùng một đoạn code đăng nhập tồn tại ở 50, 100 nơi khác nhau.",
        "Imagine you write 10 tests for ShopEasy, and all 10 need to log in first. Without structure, every test file has the exact same block: find the email field with '#email-input', find the password field with '#password-input', click the '#btn-login' button. At first this seems harmless — just copy-pasting a few lines. But as the project grows to 50, 100 tests, the same login code block exists in 50, 100 different places.",
        "ShopEasy用に10個のテストを書き、その10個すべてが先にログインする必要があると想像してください。構造がなければ、各テストファイルに全く同じブロックが現れます：'#email-input'でメール欄を探し、'#password-input'でパスワード欄を探し、'#btn-login'ボタンをクリックする。最初は無害に見えます——数行をコピペするだけです。しかしプロジェクトが50、100個のテストに成長すると、同じログインコードが50、100か所に存在することになります。"),
      IMG(m_baseafter, "Bảng so sánh: cùng tính năng đăng nhập/giỏ hàng, tổ chức KHÔNG có POM và CÓ POM", "Comparison: the same login/cart feature, organized WITHOUT POM versus WITH POM", "比較表：同じログイン/カート機能を、POMなしとPOMありで整理した場合"),
      P("Vấn đề thật sự lộ ra khi giao diện thay đổi — điều gần như chắc chắn sẽ xảy ra trong một dự án đang phát triển. Đội thiết kế đổi id nút, thêm bước xác thực, hay đổi nhãn ô nhập. Nếu locator nằm rải rác trong 50 file, bạn phải rà từng file để sửa, dễ bỏ sót, dễ sửa sai chỗ này đúng chỗ kia. Đây chính là lúc chi phí bảo trì automation vượt xa lợi ích nó mang lại — và cũng là lý do nhiều đội automation 'bỏ cuộc' giữa chừng vì test ngày càng giòn, khó tin tưởng.",
        "The real problem surfaces when the UI changes — something almost certain to happen in an evolving project. The design team changes a button's id, adds a verification step, or renames an input label. If locators are scattered across 50 files, you must hunt through every file to fix them, easily missing some or fixing the wrong spot. This is exactly when automation's maintenance cost outweighs its benefit — and why many automation teams give up midway as tests grow ever more brittle and untrustworthy.",
        "本当の問題は、UIが変わったときに表面化します——成長中のプロジェクトではほぼ確実に起こることです。デザインチームがボタンのidを変えたり、確認ステップを追加したり、入力欄のラベルを変えたりします。ロケーターが50ファイルに散らばっていれば、すべてのファイルを探して修正しなければならず、見落としたり、間違った場所を直したりしがちです。まさにこの瞬間、自動化の保守コストがその利益を上回ります——そして多くの自動化チームがテストの脆さと信頼できなさに疲れて途中で諦める理由でもあります。"),
      DEF("Locator", "cách tìm một phần tử trên giao diện (id, class, text, role...), để công cụ automation biết thao tác lên đúng phần tử đó.",
        "the way to find an element on a screen (id, class, text, role...), so the automation tool knows which exact element to act on.",
        "画面上の要素を見つける方法（id、class、テキスト、roleなど）で、自動化ツールがどの要素に操作すべきか分かるようにするもの。"),
    ] },
  { heading: { vi: "3. Page Object Model là gì & nguyên tắc cốt lõi", en: "3. What Page Object Model is & its core principle", ja: "3. Page Object Modelとは何か・その核心原則" },
    blocks: [
      P("Nguyên tắc cốt lõi của POM là 'tách biệt trách nhiệm' (separation of concerns): mỗi màn hình của ứng dụng được đại diện bởi một lớp — gọi là Page Object — chứa TẤT CẢ những gì liên quan tới giao diện màn hình đó: locator của các phần tử, và các hành động có thể thực hiện (điền form, bấm nút, đọc nội dung). File test không còn 'biết' id hay class CSS nào cả — nó chỉ gọi các hàm như loginPage.login(email, password) rồi kiểm tra kết quả.",
        "The core principle of POM is 'separation of concerns': each screen in the app is represented by a class — called a Page Object — containing EVERYTHING related to that screen's UI: the elements' locators, and the actions that can be performed (filling a form, clicking a button, reading content). The test file no longer 'knows' any id or CSS class at all — it just calls functions like loginPage.login(email, password) and then checks the result.",
        "POMの核心原則は『関心の分離（separation of concerns）』です：アプリの各画面はPage Objectと呼ばれるクラスで表され、その画面のUIに関するすべて——要素のロケーターと実行可能な操作（フォーム入力、ボタンクリック、内容の読み取り）——を含みます。テストファイルはもはやどんなidやCSSクラスも『知りません』——loginPage.login(email, password)のような関数を呼び、その結果を確認するだけです。"),
      IMG(m_flow, "Sơ đồ luồng gọi: test file gọi hàm của Page Object, Page Object mới thao tác trực tiếp lên giao diện", "Call flow diagram: the test file calls Page Object functions, and only the Page Object acts directly on the UI", "呼び出しフロー図：テストファイルがPage Objectの関数を呼び、Page Objectだけが直接UIを操作する"),
      P("Nói cách khác: Page Object 'biết' giao diện trông ra sao và cách thao tác lên nó, còn file test chỉ 'biết' nghiệp vụ — dữ liệu nào cần nhập, kết quả nào là đúng. Khi giao diện đổi, chỉ phần 'biết giao diện' (Page Object) cần sửa; phần 'biết nghiệp vụ' (test) hầu như không đổi vì logic kiểm tra vẫn y hệt. Đây là lý do POM giúp automation bền vững hơn hẳn theo thời gian, đặc biệt với dự án nhiều màn hình dùng chung (như đăng nhập xuất hiện trước hầu hết mọi luồng).",
        "In other words: the Page Object 'knows' what the UI looks like and how to interact with it, while the test file only 'knows' the business logic — what data to enter, what result is correct. When the UI changes, only the 'UI-aware' part (the Page Object) needs fixing; the 'business-aware' part (the test) barely changes since the verification logic stays the same. This is why POM keeps automation far more sustainable over time, especially for projects with many shared screens (like login, which appears before most flows).",
        "言い換えれば、Page Objectは『UIがどう見え、どう操作するか』を知っており、テストファイルは『ビジネスロジック』——どんなデータを入力し、どんな結果が正しいか——だけを知っています。UIが変わったとき、修正が必要なのは『UIを知っている』部分（Page Object）だけで、『ビジネスを知っている』部分（テスト）は検証ロジックが同じままなのでほとんど変わりません。これが、POMが特にログインのように多くのフローの前に現れる共有画面が多いプロジェクトで、自動化を長期的に遥かに持続可能にする理由です。"),
      TIP("Đặt tên lớp Page Object theo đúng tên màn hình (LoginPage, CartPage, CheckoutPage...) để bất kỳ ai đọc code cũng đoán được nó đại diện màn hình nào.", "Name Page Object classes after the exact screen they represent (LoginPage, CartPage, CheckoutPage...) so anyone reading the code can immediately guess which screen it stands for.", "Page Objectクラスは表す画面の名前そのままに命名しよう（LoginPage、CartPage、CheckoutPageなど）。コードを読む誰もがどの画面を表すか一目で分かるように。"),
    ] },
  { heading: { vi: "4. Cấu trúc thư mục dự án automation dùng POM", en: "4. Folder structure for a POM-based automation project", ja: "4. POMを使った自動化プロジェクトのフォルダ構成" },
    blocks: [
      P("Một dự án Playwright dùng POM thường tách rõ 2 khu vực: thư mục pages/ chứa các lớp Page Object (mỗi màn hình 1 file), và thư mục tests/ chứa các kịch bản test (mỗi luồng nghiệp vụ 1 file). Cách đặt tên nhất quán giúp bất kỳ thành viên mới nào cũng nhanh chóng tìm đúng chỗ cần sửa khi có lỗi.",
        "A Playwright project using POM typically separates two areas clearly: a pages/ folder holding the Page Object classes (one file per screen), and a tests/ folder holding the test scripts (one file per business flow). Consistent naming helps any new team member quickly find the right place to fix when something breaks.",
        "POMを使うPlaywrightプロジェクトでは、通常2つの領域を明確に分けます：Page Objectクラスを入れるpages/フォルダ（画面ごとに1ファイル）と、テストスクリプトを入れるtests/フォルダ（業務フローごとに1ファイル）です。一貫した命名は、新しいメンバーが不具合発生時に直すべき場所をすぐ見つける助けになります。"),
      IMG(m_folder, "Cấu trúc thư mục thường gặp của dự án Playwright áp dụng Page Object Model", "A common folder structure for a Playwright project applying the Page Object Model", "Page Object Modelを適用したPlaywrightプロジェクトによくあるフォルダ構成"),
      CODE("text", "shopeasy-automation/\n├── pages/\n│   ├── BasePage.js       # hanh vi dung chung: goto, cho tai trang...\n│   ├── LoginPage.js      # locator + hanh dong man Dang nhap\n│   └── CartPage.js       # locator + hanh dong man Gio hang\n├── tests/\n│   ├── login.spec.js     # kich ban test dang nhap, dung LoginPage\n│   └── cart.spec.js      # kich ban test gio hang, dung LoginPage + CartPage\n├── fixtures/\n│   └── test-data.json    # du lieu mau: tai khoan, san pham...\n├── playwright.config.js\n└── package.json"),
      TIP("Nếu nhiều Page Object dùng chung 1 hành vi (ví dụ hàm goto chờ trang tải xong), tách ra một lớp BasePage rồi cho các Page Object khác kế thừa — tránh lặp lại chính trong các lớp Page Object.", "If multiple Page Objects share a behavior (e.g. a goto function that waits for the page to load), extract it into a BasePage class and have the other Page Objects extend it — avoiding duplication even inside your Page Object layer.", "複数のPage Objectが同じ振る舞い（ページ読み込み待機のgoto関数など）を共有するなら、BasePageクラスに抽出し、他のPage Objectがそれを継承するようにしよう——Page Object層自体での重複も防げます。"),
    ] },
  { heading: { vi: "5. Viết Page Object đầu tiên: LoginPage (thực hành)", en: "5. Writing your first Page Object: LoginPage (hands-on)", ja: "5. 最初のPage Objectを書く：LoginPage（実習）" },
    blocks: [
      P("Giờ ta viết Page Object đầu tiên cho màn đăng nhập ShopEasy. Làm theo thứ tự dưới đây để có một lớp LoginPage đầy đủ locator và hành động.",
        "Now let's write the first Page Object for ShopEasy's login screen. Follow the order below to get a LoginPage class with full locators and actions.",
        "では、ShopEasyのログイン画面用に最初のPage Objectを書きましょう。以下の順に沿って、ロケーターと操作が揃ったLoginPageクラスを作りましょう。"),
      STEP(1, "Tạo file pages/LoginPage.js, khai báo constructor nhận vào đối tượng page của Playwright.", "Create pages/LoginPage.js, and declare a constructor that receives Playwright's page object.", "pages/LoginPage.jsを作成し、Playwrightのpageオブジェクトを受け取るコンストラクタを宣言する。"),
      STEP(2, "Khai báo các locator trong constructor: ô email, ô mật khẩu, nút đăng nhập, khối thông báo lỗi.", "Declare the locators in the constructor: the email field, password field, login button, error message block.", "コンストラクタ内でロケーターを宣言する：メール欄、パスワード欄、ログインボタン、エラーメッセージブロック。"),
      STEP(3, "Viết hàm goto() để mở trang đăng nhập, và hàm login(email, password) gộp cả 3 thao tác điền + bấm.", "Write a goto() function to open the login page, and a login(email, password) function combining all 3 fill + click actions.", "ログインページを開くgoto()関数と、入力とクリックの3つの操作をまとめたlogin(email, password)関数を書く。"),
      STEP(4, "Export lớp LoginPage để file test có thể import và dùng.", "Export the LoginPage class so test files can import and use it.", "テストファイルがインポートして使えるよう、LoginPageクラスをエクスポートする。"),
      CODE("javascript", "// pages/LoginPage.js\nclass LoginPage {\n  constructor(page) {\n    this.page = page;\n    this.emailInput = page.locator('#email-input');\n    this.passwordInput = page.locator('#password-input');\n    this.loginButton = page.locator('#btn-login');\n    this.errorMessage = page.locator('.login-error');\n  }\n\n  async goto() {\n    await this.page.goto('https://shopeasy.vn/dang-nhap');\n  }\n\n  async login(email, password) {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.loginButton.click();\n  }\n\n  async getErrorText() {\n    return this.errorMessage.textContent();\n  }\n}\n\nmodule.exports = { LoginPage };"),
      TRY("Mở lại code trên và thêm 1 locator nữa cho ô 'Quên mật khẩu?' cùng 1 hàm clickForgotPassword() gọi nó.", "Open the code above and add one more locator for the 'Forgot password?' link, plus a clickForgotPassword() function that clicks it.", "上のコードを開き、『パスワードを忘れた？』リンク用のロケーターと、それをクリックするclickForgotPassword()関数を追加してみよう。"),
    ] },
  { heading: { vi: "6. Viết test dùng LoginPage (thực hành)", en: "6. Writing a test that uses LoginPage (hands-on)", ja: "6. LoginPageを使うテストを書く（実習）" },
    blocks: [
      P("Có LoginPage rồi, giờ file test trở nên gọn gàng hẳn: không còn locator nào xuất hiện trong test, chỉ còn các bước nghiệp vụ và câu kiểm tra kết quả.",
        "With LoginPage ready, the test file becomes noticeably cleaner: no locators appear in the test at all — only business steps and result checks remain.",
        "LoginPageができたことで、テストファイルは格段にすっきりします：テスト内にロケーターは一切現れず、業務手順と結果の検証だけが残ります。"),
      STEP(1, "Import LoginPage vào file test bằng require/import.", "Import LoginPage into the test file with require/import.", "require/importでLoginPageをテストファイルに読み込む。"),
      STEP(2, "Khởi tạo new LoginPage(page) ở đầu mỗi test cần đăng nhập.", "Instantiate new LoginPage(page) at the start of every test that needs login.", "ログインが必要な各テストの冒頭でnew LoginPage(page)を生成する。"),
      STEP(3, "Gọi loginPage.goto() và loginPage.login(email, password), rồi dùng expect() để kiểm tra kết quả mong đợi.", "Call loginPage.goto() and loginPage.login(email, password), then use expect() to verify the expected result.", "loginPage.goto()とloginPage.login(email, password)を呼び、expect()で期待結果を検証する。"),
      CODE("javascript", "// tests/login.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { LoginPage } = require('../pages/LoginPage');\n\ntest.describe('ShopEasy - Dang nhap', () => {\n  test('dang nhap thanh cong voi tai khoan hop le', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('mai.tran@gmail.com', 'Mai@2024');\n    await expect(page).toHaveURL(/.*\\/tai-khoan/);\n  });\n\n  test('dang nhap that bai voi mat khau sai', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('mai.tran@gmail.com', 'sai-mat-khau');\n    await expect(loginPage.errorMessage).toBeVisible();\n  });\n});"),
      TRY("Thêm 1 test thứ ba: đăng nhập với ô email để trống, kiểm tra loginPage.errorMessage hiện đúng thông báo.", "Add a third test: log in with a blank email field, and verify loginPage.errorMessage shows the correct message.", "3つ目のテストを追加：メール欄を空欄にしてログインし、loginPage.errorMessageが正しいメッセージを表示するか確認しよう。"),
    ] },
  { heading: { vi: "7. Mở rộng: CartPage & tái sử dụng Page Object", en: "7. Extending: CartPage & reusing Page Objects", ja: "7. 拡張：CartPageとPage Objectの再利用" },
    blocks: [
      P("Sức mạnh thật sự của POM lộ rõ khi bạn có nhiều màn hình. Với giỏ hàng ShopEasy, ta tạo thêm lớp CartPage — và vì hầu hết luồng giỏ hàng đều cần đăng nhập trước, ta tái sử dụng LoginPage đã viết ở chương trước thay vì viết lại từ đầu.",
        "POM's real power shows once you have multiple screens. For ShopEasy's cart, we add a CartPage class — and since most cart flows require logging in first, we reuse the LoginPage from the previous chapter instead of rewriting it from scratch.",
        "POMの本当の力は複数の画面があるときに現れます。ShopEasyのカートにはCartPageクラスを追加します——そしてほとんどのカートフローは先にログインが必要なため、前章で書いたLoginPageをゼロから書き直さず再利用します。"),
      CODE("javascript", "// pages/CartPage.js\nclass CartPage {\n  constructor(page) {\n    this.page = page;\n    this.quantityInput = page.locator('#cart-quantity');\n    this.totalPrice = page.locator('#cart-total');\n    this.checkoutButton = page.locator('#btn-checkout');\n  }\n\n  async setQuantity(qty) {\n    await this.quantityInput.fill(String(qty));\n    await this.page.keyboard.press('Tab');\n  }\n\n  async getTotal() {\n    return this.totalPrice.textContent();\n  }\n\n  async checkout() {\n    await this.checkoutButton.click();\n  }\n}\n\nmodule.exports = { CartPage };"),
      STEP(1, "Import cả LoginPage và CartPage vào tests/cart.spec.js.", "Import both LoginPage and CartPage into tests/cart.spec.js.", "tests/cart.spec.jsにLoginPageとCartPageの両方をインポートする。"),
      STEP(2, "Dùng loginPage.login() để đăng nhập trước, sau đó điều hướng sang trang giỏ hàng.", "Use loginPage.login() to log in first, then navigate to the cart page.", "loginPage.login()で先にログインし、その後カートページへ移動する。"),
      STEP(3, "Dùng cartPage.setQuantity() và cartPage.getTotal() để kiểm tra tổng tiền cập nhật đúng.", "Use cartPage.setQuantity() and cartPage.getTotal() to verify the total updates correctly.", "cartPage.setQuantity()とcartPage.getTotal()で合計金額が正しく更新されるか検証する。"),
      CODE("javascript", "// tests/cart.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { LoginPage } = require('../pages/LoginPage');\nconst { CartPage } = require('../pages/CartPage');\n\ntest('cap nhat so luong thi tong tien thay doi dung', async ({ page }) => {\n  const loginPage = new LoginPage(page);\n  const cartPage = new CartPage(page);\n  await loginPage.goto();\n  await loginPage.login('mai.tran@gmail.com', 'Mai@2024');\n  await page.goto('https://shopeasy.vn/gio-hang');\n  await cartPage.setQuantity(2);\n  await expect(cartPage.totalPrice).toContainText('398.000');\n});"),
      P("Chú ý cách test này KHÔNG hề biết '#cart-quantity' hay '#email-input' là gì — nó chỉ gọi hàm của LoginPage và CartPage. Nếu mai này ShopEasy đổi cách hiển thị giỏ hàng, chỉ CartPage cần sửa; test này gần như không phải đụng tới.",
        "Notice this test doesn't know what '#cart-quantity' or '#email-input' even is — it only calls LoginPage and CartPage functions. If ShopEasy changes how the cart displays tomorrow, only CartPage needs fixing; this test barely needs to be touched.",
        "このテストが'#cart-quantity'や'#email-input'が何なのか全く知らないことに注目してください——LoginPageとCartPageの関数を呼ぶだけです。もしShopEasyがカートの表示方法を変えても、直すのはCartPageだけで、このテストはほとんど触る必要がありません。"),
    ] },
  { heading: { vi: "8. Tình huống 1: UI đổi id nút, không dùng POM phải sửa 50 test", en: "8. Situation 1: a UI id change forces editing 50 tests without POM", ja: "8. シーン1：UIのid変更でPOMなしでは50個のテストを直す羽目に" },
    blocks: [
      SITUATION("Một đội automation viết 50 test cho ShopEasy, mỗi file test tự viết locator '#btn-login' trực tiếp để tìm nút đăng nhập, không qua Page Object nào.", "An automation team writes 50 tests for ShopEasy, with each test file directly writing the '#btn-login' locator to find the login button, without going through any Page Object.",
        "Đội frontend đổi id nút thành '#btn-signin' để khớp chuẩn đặt tên mới. Ngay lập tức, cả 50 test báo lỗi 'không tìm thấy phần tử', dù tính năng đăng nhập trên thực tế vẫn hoạt động bình thường. Đội automation phải rà từng file, sửa từng chỗ, mất gần 1 ngày làm việc chỉ để cập nhật 1 dòng locator lặp lại 50 lần.",
        "The frontend team renames the button's id to '#btn-signin' to match a new naming convention. Immediately, all 50 tests fail with 'element not found', even though the login feature actually still works fine. The automation team must hunt through every file, fix each spot one by one, spending nearly a full day just updating one locator line duplicated 50 times.",
        "自動化チームがShopEasy用に50個のテストを書き、各テストファイルがログインボタンを見つけるために'#btn-login'ロケーターを直接書き、どのPage Objectも経由していない。",
        "フロントエンドチームが新しい命名規則に合わせてボタンのidを'#btn-signin'に変更する。すぐに50個のテスト全てが『要素が見つからない』というエラーで失敗する——実際にはログイン機能は正常に動いているにもかかわらず。自動化チームは各ファイルを探し回り、1か所ずつ直す必要があり、50回重複した1行のロケーターを更新するためだけにほぼ丸1日を費やす。"),
      SOLVE("Refactor toàn bộ locator '#btn-login' về một chỗ duy nhất: constructor của lớp LoginPage. Khi id đổi, chỉ cần sửa đúng 1 dòng trong LoginPage.js, và cả 50 test tự động dùng locator mới mà không cần đụng tới bất kỳ file test nào.", "Refactor all instances of the '#btn-login' locator into a single place: the LoginPage class's constructor. When the id changes, fix exactly one line in LoginPage.js, and all 50 tests automatically pick up the new locator without touching a single test file.", "'#btn-login'ロケーターの全出現箇所を1か所——LoginPageクラスのコンストラクタ——にリファクタリングする。idが変わってもLoginPage.jsのたった1行を直すだけで、50個のテスト全てがテストファイルに一切触れずに新しいロケーターを自動的に使うようになる。"),
      P("Đây là ví dụ rõ ràng nhất cho thấy chi phí thật của việc KHÔNG dùng POM: không phải khi viết lần đầu, mà là mỗi lần giao diện thay đổi sau đó — điều xảy ra thường xuyên trong một dự án đang phát triển. Đầu tư một buổi để tổ chức lại theo POM ngay từ đầu rẻ hơn rất nhiều so với việc rà 50 file mỗi lần UI đổi.",
        "This is the clearest example of the real cost of NOT using POM: not when writing tests the first time, but every time the UI changes afterward — something that happens frequently in a growing project. Investing one session to organize things with POM from the start is far cheaper than hunting through 50 files every time the UI changes.",
        "これはPOMを使わないことの本当のコストを最も明確に示す例です：初めてテストを書くときではなく、その後UIが変わるたびに——成長中のプロジェクトでは頻繁に起こることです。最初からPOMで整理するために1回時間を投資する方が、UIが変わるたびに50ファイルを探し回るよりもはるかに安上がりです。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố 50 test hỏng vì đổi id nút, khi automation chưa dùng POM", "A bug ticket recording the incident of 50 broken tests from an id change, when automation didn't yet use POM", "POMをまだ使っていない自動化で、id変更により50個のテストが壊れたインシデントを記録したバグチケット"),
      RECAP(["Locator lặp lại ở nhiều file = chi phí sửa nhân lên theo số file", "POM biến 'sửa N chỗ' thành 'sửa đúng 1 chỗ'"],
        ["Locators duplicated across files = fix cost multiplies by file count", "POM turns 'fix N places' into 'fix exactly one place'"],
        ["複数ファイルにロケーターが重複＝修正コストがファイル数分に増える", "POMは『N箇所を直す』を『たった1箇所を直す』に変える"]),
    ] },
  { heading: { vi: "9. Tình huống 2: locator lặp lại khắp nơi, khó bảo trì", en: "9. Situation 2: locators duplicated everywhere, hard to maintain", ja: "9. シーン2：ロケーターがあちこちに重複し、保守が困難" },
    blocks: [
      SITUATION("Bạn được giao sửa một test giỏ hàng bị fail, và phát hiện locator '#cart-quantity' đang được viết trực tiếp trong 12 file test khác nhau, mỗi file viết một kiểu hơi khác (có file dùng '#cart-quantity', có file dùng 'input[name=\"quantity\"]').", "You're assigned to fix a failing cart test, and discover the '#cart-quantity' locator is written directly in 12 different test files, each slightly differently (some use '#cart-quantity', others use 'input[name=\"quantity\"]').",
        "Vì không có một nguồn locator duy nhất, bạn không chắc cách nào đang đúng, cách nào đã lỗi thời. Sửa một file có thể vô tình không khớp với 11 file còn lại, khiến bug tái diễn ở nơi khác dù bạn nghĩ đã sửa xong.",
        "Because there's no single source of truth for the locator, you're not sure which version is correct and which is outdated. Fixing one file might accidentally not match the other 11, so the bug resurfaces elsewhere even though you thought it was fixed.",
        "カートのテストが失敗しているのを直すよう任され、'#cart-quantity'ロケーターが12個の異なるテストファイルに直接書かれており、それぞれ微妙に違う（'#cart-quantity'を使うファイルもあれば、'input[name=\"quantity\"]'を使うファイルもある）ことを発見する。",
        "ロケーターの唯一の情報源がないため、どちらが正しくどちらが古いのか確信が持てない。1つのファイルを直しても、残り11ファイルと意図せず一致せず、直したと思ってもバグが別の場所で再発する。"),
      SOLVE("Tạo lớp CartPage với duy nhất 1 locator '#cart-quantity' chính thức, rồi thay toàn bộ 12 file test để gọi cartPage.setQuantity() thay vì tự viết locator. Từ nay, mọi thay đổi liên quan tới ô số lượng chỉ cần sửa ở CartPage.js.", "Create a CartPage class with a single official '#cart-quantity' locator, then update all 12 test files to call cartPage.setQuantity() instead of writing their own locator. From now on, any change to the quantity field only needs a fix in CartPage.js.", "'#cart-quantity'という唯一の公式ロケーターを持つCartPageクラスを作成し、12個のテストファイル全てを、独自のロケーターを書く代わりにcartPage.setQuantity()を呼ぶように変更する。これ以降、数量欄に関する変更はCartPage.jsを直すだけで済む。"),
      P("Bài học ở đây: locator lặp lại không chỉ tốn công sửa, mà còn gây ra sự KHÔNG NHẤT QUÁN — mỗi nơi viết một kiểu khác nhau, khiến bạn không biết đâu là 'nguồn sự thật' để tin tưởng. POM giải quyết cả hai vấn đề cùng lúc: có đúng 1 nơi định nghĩa locator, và mọi test đều dùng chung định nghĩa đó.",
        "The lesson here: duplicated locators don't just cost effort to fix — they also cause INCONSISTENCY, where each spot is written slightly differently, leaving you unsure which is the 'source of truth' to trust. POM solves both problems at once: there's exactly one place defining the locator, and every test shares that same definition.",
        "ここでの教訓：ロケーターの重複は修正の手間がかかるだけでなく、不整合も引き起こします——各箇所が微妙に違う書き方をしていて、どれが信頼できる『情報源』か分からなくなります。POMは両方の問題を同時に解決します：ロケーターを定義する場所がちょうど1つあり、全テストがその定義を共有します。"),
      IMG(m_kanban, "Bảng theo dõi nợ kỹ thuật do locator lặp lại, và quá trình refactor sang POM", "A board tracking technical debt from duplicated locators, and the refactor process toward POM", "ロケーター重複による技術的負債と、POMへのリファクタリング過程を追跡するボード"),
      TRY("Nhìn lại 2 khối code LoginPage/CartPage ở các chương trước, tìm xem có locator nào bạn nghĩ nên tách thêm thành hàm hành động riêng (ví dụ 'xoá sản phẩm khỏi giỏ') để tránh lặp lại sau này.", "Look back at the LoginPage/CartPage code blocks from earlier chapters and find any locator you think should be extracted into its own action function (e.g. 'remove item from cart') to avoid duplication later.", "前の章のLoginPage/CartPageのコードを振り返り、後の重複を避けるため専用のアクション関数（例：『カートから商品を削除』）に切り出すべきだと思うロケーターを探してみよう。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Đặt câu assert/expect kiểm tra kết quả nghiệp vụ bên trong Page Object. Page Object chỉ nên 'biết' giao diện và trả dữ liệu ra; việc so sánh đúng/sai thuộc về file test.", "Placing assert/expect statements that check business results inside the Page Object. A Page Object should only 'know' the UI and return data; comparing right versus wrong belongs in the test file.", "ビジネス結果を検証するassert/expect文をPage Objectの中に置くこと。Page ObjectはUIを『知り』データを返すだけであるべきで、正誤の比較はテストファイルの役割です。"),
      PITFALL("Tạo 1 Page Object khổng lồ chứa locator của TOÀN BỘ website thay vì tách theo từng màn hình. Điều này khiến file quá dài, khó tìm, và khác gì để mọi thứ lộn xộn như cũ.", "Creating one giant Page Object holding locators for the ENTIRE website instead of splitting by screen. This makes the file too long, hard to search, and is barely different from the original mess.", "画面ごとに分けず、サイト全体のロケーターを持つ巨大な1つのPage Objectを作ること。ファイルが長くなりすぎて探しにくく、元の混乱とほとんど変わらなくなります。"),
      TIP("Khi thêm 1 phần tử mới lên màn hình, luôn tự hỏi: 'locator này nên nằm trong Page Object nào?' trước khi viết — thói quen này giữ cấu trúc POM sạch sẽ lâu dài.", "When adding a new element to a screen, always ask: 'which Page Object should this locator live in?' before writing anything — this habit keeps your POM structure clean over the long run.", "画面に新しい要素を追加するとき、書く前に必ず『このロケーターはどのPage Objectに属すべきか？』と自問しよう——この習慣が長期的にPOM構造をきれいに保ちます。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Tự động hoá kiểm thử là gì cho người mới", "What is test automation for beginners", "tu-dong-hoa-kiem-thu-la-gi-cho-nguoi-moi", "初心者のためのテスト自動化とは"),
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi", "初心者のためのテストケースの書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học Page Object Model qua màn đăng nhập và giỏ hàng ShopEasy: vì sao test không có cấu trúc rõ ràng trở nên khó bảo trì, nguyên tắc tách locator/hành động khỏi test, cấu trúc thư mục chuẩn, và cách viết LoginPage/CartPage bằng Playwright có thể chạy thật. Hai tình huống thật cho thấy chi phí khi UI đổi mà không dùng POM (sửa 50 test) so với khi có POM (sửa đúng 1 chỗ), cùng cách locator lặp lại gây mất nhất quán. Đây là kỹ năng nền tảng giúp bộ test automation của bạn bền vững hơn nhiều khi dự án lớn dần.",
        "You just learned the Page Object Model through ShopEasy's login and cart screens: why unstructured tests become hard to maintain, the principle of separating locators/actions from tests, a standard folder structure, and how to write real, runnable LoginPage/CartPage classes in Playwright. Two real situations showed the cost of a UI change without POM (fixing 50 tests) versus with POM (fixing exactly one place), plus how duplicated locators cause inconsistency. This is a foundational skill that makes your automation suite far more sustainable as the project grows.",
        "ShopEasyのログイン画面とカートを通じてPage Object Modelを学びました：構造のないテストがなぜ保守しにくくなるか、テストからロケーター/操作を分離する原則、標準的なフォルダ構成、そしてPlaywrightで実際に動くLoginPage/CartPageクラスの書き方。2つの実例は、POMなしでUIが変わったときのコスト（50個のテストを修正）と、POMがある場合（たった1箇所を修正）の違い、そしてロケーターの重複が不整合を引き起こす様子を示しました。プロジェクトが成長するにつれ、自動化スイートを遥かに持続可能にする土台スキルです。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về data-driven testing (chạy cùng 1 kịch bản với nhiều bộ dữ liệu) và cách tổ chức fixture dùng chung, để bộ test automation vừa dễ bảo trì vừa dễ mở rộng. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into data-driven testing (running the same script with multiple data sets) and how to organize shared fixtures, so your automation suite is both maintainable and easy to extend. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、データ駆動テスト（同じスクリプトを複数のデータセットで実行する）と、共有フィクスチャの整理方法を学ぶとよいでしょう——自動化スイートを保守しやすく、かつ拡張しやすくするためです。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const POM_01 = makeDoc({
  slug: "page-object-model-pom-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "page object model",
  keywords: ["page object model", "pom testing", "automation testing", "playwright page object", "tổ chức test tự động cho người mới"],
  coverLabel: "NGƯỜI MỚI · PAGE OBJECT MODEL · TMĐT",
  crumb: "Page Object Model (POM) cho người mới",
  metaTitle: { vi: "Page Object Model (POM) cho người mới", en: "Page Object Model for beginners", ja: "初心者向けPage Object Model" },
  metaDescription: {
    vi: "Page Object Model (POM) cho người mới: tách locator, hành động khỏi test qua LoginPage, CartPage của ShopEasy bằng Playwright, có code chạy và trắc nghiệm.",
    en: "Page Object Model for beginners: separating locators and actions from tests through ShopEasy's LoginPage and CartPage examples in Playwright, with runnable code and a quiz at the end.",
    ja: "初心者向けPage Object Model：PlaywrightでのShopEasyのLoginPage・CartPage例を通じてロケーターと操作をテストから分離、動くコードと最後にクイズ付きで解説。",
  },
  title: {
    vi: "Page Object Model (POM) cho người mới: tổ chức script tự động bền vững (có code chạy được)",
    en: "Page Object Model (POM) for beginners: organizing automation scripts to last (with runnable code)",
    ja: "初心者のためのPage Object Model（POM）：長持ちする自動化スクリプトの整理法（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học Page Object Model (POM) qua app TMĐT ShopEasy. Vì sao cần tách locator/hành động khỏi test, cấu trúc thư mục chuẩn, viết class LoginPage/CartPage bằng Playwright chạy được, hai tình huống thật (đổi id nút gây hỏng 50 test, locator lặp lại khó bảo trì), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn the Page Object Model (POM) through the ShopEasy e-commerce app. Why separate locators/actions from tests, a standard folder structure, writing runnable LoginPage/CartPage classes in Playwright, two real situations (a button id change breaking 50 tests, duplicated locators hard to maintain), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでPage Object Model（POM）を学ぶ。ロケーター/操作をテストから分離する理由、標準的なフォルダ構成、Playwrightで動くLoginPage/CartPageクラスの書き方、2つの実例（ボタンid変更で50個のテストが壊れる、ロケーター重複で保守困難）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách áp dụng Page Object Model cho test tự động", steps: [
    { name: "Tách locator và hành động ra khỏi test", text: "Gom locator + thao tác của mỗi màn hình vào 1 lớp Page Object riêng." },
    { name: "Viết Page Object đầu tiên", text: "Constructor nhận page, khai báo locator, viết hàm hành động (login, setQuantity...)." },
    { name: "Cho test gọi hàm của Page Object", text: "File test chỉ gọi hàm và assert kết quả, không tự viết locator." },
  ] },
  pages,
});

export const AU_POM_01 = [POM_01];
