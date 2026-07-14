// doc_au_login_flow.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Tự động hóa kiểm thử luồng đăng ký & đăng nhập cho app TMĐT ShopEasy bằng Playwright.
// Ghép lại POM + assertion + waits đã học ở các bài trước: viết Page Object cho màn đăng ký
// và đăng nhập, viết test cho ca đúng lẫn ca sai (sai mật khẩu, để trống, email đã tồn tại),
// kiểm tra điều hướng sau đăng nhập, đăng xuất, và giữ phiên khi tải lại trang.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), code Playwright chạy được. Song ngữ
// vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard, moduleFlow } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình đăng ký ShopEasy, chú thích locator từng ô nhập và nút ──
const m_register = browser("shopeasy.vn/dang-ky", [
  panel("ShopEasy · Đăng ký", [
    field(24, 20, 660, "Họ và tên", "Mai Trần", "normal"),
    field(24, 112, 660, "Email", "mai.tran@gmail.com", "normal"),
    field(24, 204, 660, "Mật khẩu", "••••••••", "normal"),
    btn(24, 296, 220, "Đăng ký", "primary"),
    annotate(20, 10, 668, 72, "Locator: #fullname-input"),
    annotate(20, 102, 668, 72, "Locator: #email-input"),
    annotate(20, 194, 668, 72, "Locator: #password-input"),
    annotate(20, 288, 228, 50, "Locator: #btn-register"),
  ].join(""), { h: 390, accent: "#0891b2" }),
].join(""), { h: 446, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: màn hình đăng nhập ShopEasy, mật khẩu sai + thông báo lỗi ──
const m_login_error = browser("shopeasy.vn/dang-nhap", [
  panel("ShopEasy · Đăng nhập", [
    field(24, 20, 660, "Email", "mai.tran@gmail.com", "normal"),
    field(24, 112, 660, "Mật khẩu", "••••••••", "error"),
    btn(24, 220, 220, "Đăng nhập", "primary"),
    annotate(20, 10, 668, 72, "Locator: #email-input"),
    annotate(20, 102, 668, 92, "Locator: #password-input + .login-error"),
    annotate(20, 212, 228, 50, "Locator: #btn-login"),
  ].join(""), { h: 300, accent: "#0891b2" }),
].join(""), { h: 356, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 3: bảng các ca cần tự động hóa cho đăng ký & đăng nhập ──
const m_cases = grid("Các ca cần tự động hóa cho đăng ký & đăng nhập ShopEasy", ["Ca kiểm thử", "Bước chính", "Kết quả mong đợi"], [
  ["Đăng ký hợp lệ", "Điền tên/email động/mật khẩu, bấm Đăng ký", "Điều hướng sang /tai-khoan"],
  ["Đăng ký với email đã tồn tại", "Dùng lại email đã đăng ký trước", "Hiện lỗi 'Email đã tồn tại'"],
  ["Đăng ký để trống trường bắt buộc", "Bỏ trống Họ tên hoặc Mật khẩu", "Hiện lỗi bắt buộc, không tạo tài khoản"],
  ["Đăng nhập đúng mật khẩu", "Nhập email + mật khẩu hợp lệ", "Điều hướng sang /tai-khoan"],
  ["Đăng nhập sai mật khẩu", "Nhập đúng email, sai mật khẩu", "Hiện lỗi, vẫn ở /dang-nhap"],
  ["Đăng nhập để trống mật khẩu", "Bỏ trống ô mật khẩu, bấm Đăng nhập", "Nút bị chặn hoặc hiện lỗi bắt buộc"],
  ["Đăng xuất", "Bấm nút Đăng xuất ở trang tài khoản", "Điều hướng về /dang-nhap, xoá phiên"],
  ["Giữ phiên sau khi tải lại trang", "Đăng nhập xong, reload trang", "Vẫn ở trạng thái đã đăng nhập"],
], { accent: "#0891b2", note: "Ưu tiên tự động hóa đủ 8 ca này trước khi mở rộng sang các luồng khác." });

// ── Mockup 4: sơ đồ luồng test đăng ký -> đăng nhập -> giữ phiên & đăng xuất ──
const m_flow = moduleFlow("Sơ đồ luồng test đăng ký → đăng nhập → giữ phiên & đăng xuất", [
  { id: "reg", label: "Test đăng ký", sub: "register.spec.js", x: 96, y: 150 },
  { id: "login", label: "Test đăng nhập", sub: "login.spec.js", x: 380, y: 150 },
  { id: "session", label: "Test phiên & đăng xuất", sub: "session.spec.js", x: 664, y: 150 },
], [
  { from: "reg", to: "login", label: "dùng email vừa tạo" },
  { from: "login", to: "session", label: "reload rồi đăng xuất" },
], { accent: "#0891b2", h: 260 });

// ── Mockup 5: ticket Jira khi test không assert URL nên bỏ sót lỗi điều hướng ──
const m_jira = jira({
  key: "SE-14210", title: "Đăng nhập thành công nhưng không điều hướng sang /tai-khoan, test bị timeout",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Playwright CI"],
    ["Nguyên nhân", "Test chỉ kiểm tra loginButton đã click, không assert URL sau đăng nhập nên bug điều hướng lọt qua"],
    ["Ảnh hưởng", "Người dùng đăng nhập xong bị kẹt ở trang /dang-nhap dù tài khoản hợp lệ, ảnh hưởng toàn bộ luồng sau"],
    ["Đề xuất", "Thêm expect(page).toHaveURL(/tai-khoan/) ngay sau bước login() trong mọi test đăng nhập"],
  ],
});

// ── Mockup 6: dashboard theo dõi độ phủ tự động hóa của luồng đăng ký & đăng nhập ──
const m_dashboard = dashboard("Bảng theo dõi tự động hóa luồng đăng ký & đăng nhập ShopEasy", [
  { label: "Ca đã tự động", value: "8/8", sub: "đăng ký + đăng nhập + phiên" },
  { label: "Tỷ lệ pass", value: "100%", sub: "chạy trên CI mỗi ngày", color: "#16a34a" },
  { label: "Thời gian chạy", value: "42s", sub: "toàn bộ 8 ca" },
  { label: "Ca cần bổ sung", value: "0", sub: "đã phủ đủ theo bảng ca" },
], { accent: "#0891b2" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vì sao cần test cả ca đăng nhập sai mật khẩu, không chỉ ca đúng?",
  "Why test the wrong-password login case, not just the correct one?",
  "Ca đăng nhập đúng chỉ xác nhận luồng vui vẻ (happy path) hoạt động, nhưng phần lớn lỗi thực tế nằm ở cách hệ thống XỬ LÝ khi người dùng nhập sai — thông báo lỗi có hiện đúng không, người dùng có bị kẹt ở màn hình sai không. Bỏ qua ca này đồng nghĩa bỏ qua đúng phần dễ có bug nhất.",
  "A correct-login test only confirms the happy path works, but most real bugs live in how the system HANDLES incorrect input — whether the right error message appears, whether the user gets stuck on the wrong screen. Skipping this case means skipping exactly the part most likely to have bugs.",
  "なぜ間違ったパスワードでのログインもテストする必要があるのか、正しいケースだけではだめなのか？",
  "正しいログインのテストはハッピーパスが動くことしか確認しません。実際のバグの多くは、間違った入力にシステムがどう対応するか——正しいエラーメッセージが表示されるか、ユーザーが間違った画面で行き詰まらないか——に潜んでいます。このケースを省くことは、最もバグが起きやすい部分を省くことと同じです。");
const faq2 = FAQ(
  "Làm sao tránh lỗi 'email đã tồn tại' khi chạy lại test đăng ký nhiều lần trên CI?",
  "How do you avoid an 'email already exists' error when rerunning register tests on CI?",
  "Sinh email động mỗi lần chạy, ví dụ ghép timestamp vào email dạng qa.tester+123456789@gmail.com, thay vì dùng đúng 1 email cố định. Nhờ vậy mỗi lần chạy test tạo một tài khoản hoàn toàn mới, không phụ thuộc vào việc dữ liệu lần chạy trước có được dọn hay chưa.",
  "Generate the email dynamically on every run, e.g. appending a timestamp like qa.tester+123456789@gmail.com, instead of using one fixed email. That way, every run creates a brand-new account, independent of whether the previous run's data was cleaned up.",
  "CI上で登録テストを何度も実行するとき『メールが既に存在する』エラーをどう避ける？",
  "固定の1つのメールを使う代わりに、qa.tester+123456789@gmail.comのようにタイムスタンプを付けて毎回動的にメールを生成します。こうすることで、前回実行のデータが片付いているかに関係なく、毎回まったく新しいアカウントが作られます。");
const faq3 = FAQ(
  "Kiểm thử giữ phiên đăng nhập (session) khác gì so với kiểm thử đăng nhập thành công?",
  "How is testing session persistence different from testing a successful login?",
  "Test đăng nhập thành công chỉ kiểm tra ngay SAU khi bấm nút — điều hướng đúng trang. Test giữ phiên kiểm tra một bước XA HƠN: sau khi đã đăng nhập, tải lại trang hoặc điều hướng đi nơi khác rồi quay lại, người dùng có còn ở trạng thái đăng nhập hay bị đá về trang đăng nhập. Hai lớp kiểm tra này bổ sung cho nhau, không thay thế nhau.",
  "A successful-login test only checks right after clicking the button — that it navigates to the correct page. A session test checks one step further: after logging in, reloading the page or navigating away and back, is the user still logged in or kicked back to the login page. These two layers complement, not replace, each other.",
  "セッション維持のテストは、ログイン成功のテストと何が違う？",
  "ログイン成功のテストはボタンを押した直後——正しいページに遷移するか——だけを確認します。セッションのテストはさらに一歩先を確認します：ログイン後にページを再読み込みしたり、別ページへ移動して戻ったりしたとき、ユーザーがまだログイン状態か、それともログインページに戻されるかです。この2つの層は互いを補完するものであり、置き換えるものではありません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao vẫn cần test đăng nhập với mật khẩu SAI, dù ca đăng nhập đúng đã pass?", en: "Why still test logging in with a WRONG password, even after the correct-login case passes?", ja: "正しいログインのケースが通っても、なぜ間違ったパスワードでのログインもテストする必要がある？" },
    options: [
      { vi: "Vì ca sai giúp phát hiện lỗi ở phần xử lý và hiển thị thông báo lỗi, điều ca đúng không kiểm tra được", en: "Because the wrong-password case catches bugs in how errors are handled and displayed, which the correct case can't verify", ja: "誤りケースはエラーの処理・表示に関するバグを検出できるが、正しいケースではそれを検証できないから" },
      { vi: "Vì Playwright bắt buộc phải có ít nhất 2 test trong 1 file", en: "Because Playwright requires at least 2 tests per file", ja: "Playwrightは1ファイルに最低2つのテストが必須だから" },
      { vi: "Vì ca sai luôn chạy nhanh hơn ca đúng", en: "Because the wrong-password case always runs faster than the correct one", ja: "誤りケースは常に正しいケースより速く実行されるから" },
      { vi: "Vì ca đúng không thể chạy nếu thiếu ca sai", en: "Because the correct case cannot run without the wrong case existing", ja: "誤りケースがないと正しいケースが実行できないから" },
    ], correct: 0,
    explain: { vi: "Phần lớn bug thực tế nằm ở cách hệ thống xử lý input sai, nên ca sai mật khẩu là phần kiểm thử quan trọng không thể bỏ qua.", en: "Most real bugs live in how the system handles bad input, so the wrong-password case is a critical test that can't be skipped.", ja: "実際のバグの多くは不正な入力への対応に潜むため、パスワード誤りのケースは省略できない重要なテストです。" },
  }),
  mcq({
    q: { vi: "Vấn đề gì xảy ra nếu test đăng ký luôn dùng đúng 1 email cố định trên CI?", en: "What problem occurs if a register test always uses one fixed email on CI?", ja: "登録テストがCI上で常に固定の1つのメールを使うと、どんな問題が起きる？" },
    options: [
      { vi: "Không có vấn đề gì, vì Playwright tự dọn dữ liệu sau mỗi lần chạy", en: "No problem at all, since Playwright automatically cleans up data after each run", ja: "問題はない。Playwrightが毎回実行後にデータを自動で片付けるから" },
      { vi: "Từ lần chạy thứ 2 trở đi, test sẽ fail vì email đó đã tồn tại trong hệ thống", en: "From the second run onward, the test fails because that email already exists in the system", ja: "2回目の実行以降、そのメールがシステムに既に存在するためテストが失敗する" },
      { vi: "Test sẽ chạy nhanh hơn đáng kể", en: "The test will run significantly faster", ja: "テストが著しく速く実行される" },
      { vi: "Trình duyệt sẽ tự động đổi email đó", en: "The browser will automatically change that email", ja: "ブラウザがそのメールを自動的に変更する" },
    ], correct: 1,
    explain: { vi: "Vì email cố định đã được tạo ở lần chạy trước, các lần chạy sau sẽ luôn gặp lỗi 'email đã tồn tại' — cần sinh email động để tránh.", en: "Because the fixed email was already created on a previous run, later runs always hit 'email already exists' — dynamic emails avoid this.", ja: "固定メールは前回の実行で既に作成されているため、以降の実行は必ず『メールが既に存在する』エラーになります——動的メールで回避します。" },
  }),
  mcq({
    q: { vi: "Cách assert ĐÚNG để kiểm tra điều hướng sau khi đăng nhập thành công là gì?", en: "What is the CORRECT way to assert navigation after a successful login?", ja: "ログイン成功後の遷移を検証する正しい方法は？" },
    options: [
      { vi: "Dùng page.waitForTimeout(5000) rồi kiểm tra bằng mắt", en: "Use page.waitForTimeout(5000) and check visually", ja: "page.waitForTimeout(5000)を使って目視で確認する" },
      { vi: "Dùng expect(page).toHaveURL(...) để chờ và xác nhận đúng URL đích", en: "Use expect(page).toHaveURL(...) to wait for and confirm the correct target URL", ja: "expect(page).toHaveURL(...)を使い、正しい遷移先URLを待って確認する" },
      { vi: "Không cần assert gì, chỉ cần login() chạy không lỗi là đủ", en: "No assertion needed, it's enough that login() runs without throwing", ja: "何も検証する必要はなく、login()がエラーなく実行されればよい" },
      { vi: "Chỉ cần kiểm tra tiêu đề trang bằng console.log", en: "Just check the page title with console.log", ja: "console.logでページタイトルを確認するだけでよい" },
    ], correct: 1,
    explain: { vi: "expect(page).toHaveURL(...) tự động chờ theo điều kiện (auto-wait) thay vì chờ cứng, và thật sự xác nhận điều hướng đúng đích.", en: "expect(page).toHaveURL(...) auto-waits based on a condition instead of a fixed delay, and truly confirms navigation to the right destination.", ja: "expect(page).toHaveURL(...)は固定待機ではなく条件に基づく自動待機を行い、実際に正しい遷移先を確認します。" },
  }),
  mcq({
    q: { vi: "Theo POM, locator của nút Đăng xuất trên trang tài khoản nên đặt ở đâu?", en: "According to POM, where should the Logout button's locator on the account page live?", ja: "POMによれば、アカウントページのログアウトボタンのロケーターはどこに置くべき？" },
    options: [
      { vi: "Viết trực tiếp trong mọi file test cần đăng xuất", en: "Written directly in every test file that needs to log out", ja: "ログアウトが必要な全テストファイルに直接書く" },
      { vi: "Trong Page Object của màn hình chứa nút đó (ví dụ AccountPage/LoginPage)", en: "In the Page Object of the screen containing that button (e.g. AccountPage/LoginPage)", ja: "そのボタンを含む画面のPage Object（例：AccountPage/LoginPage）の中" },
      { vi: "Trong playwright.config.js", en: "In playwright.config.js", ja: "playwright.config.jsの中" },
      { vi: "Không cần lưu, gõ lại tay mỗi lần dùng", en: "No need to store it, retype it by hand every time", ja: "保存する必要はなく、使うたびに手書きする" },
      { vi: "Trong fixtures/test-data.json cùng với dữ liệu tài khoản", en: "In fixtures/test-data.json alongside account data", ja: "アカウントデータと一緒にfixtures/test-data.jsonの中" },
    ], correct: 1,
    explain: { vi: "Đúng nguyên tắc POM: locator thuộc về Page Object của màn hình chứa phần tử đó, để khi UI đổi chỉ cần sửa 1 nơi.", en: "Following POM: the locator belongs to the Page Object of the screen containing that element, so a UI change only needs one fix.", ja: "POMの原則どおり、ロケーターはその要素を含む画面のPage Objectに属します。UIが変わっても直すのは1箇所だけです。" },
  }),
  mcq({
    q: { vi: "Test 'giữ phiên sau khi tải lại trang' cần kiểm tra điều gì là chính?", en: "What should a 'session kept after page reload' test mainly verify?", ja: "『ページ再読み込み後のセッション維持』テストは主に何を検証すべき？" },
    options: [
      { vi: "Tốc độ tải trang có nhanh hơn 1 giây không", en: "Whether the page loads in under 1 second", ja: "ページの読み込みが1秒未満かどうか" },
      { vi: "Sau khi reload, người dùng vẫn ở trạng thái đã đăng nhập, không bị đưa về trang đăng nhập", en: "After reloading, the user is still logged in and not redirected back to the login page", ja: "再読み込み後もユーザーがログイン状態を保ち、ログインページに戻されないこと" },
      { vi: "Màu sắc giao diện có đổi theo theme tối không", en: "Whether the UI color changes according to dark theme", ja: "UIの色がダークテーマに応じて変わるかどうか" },
      { vi: "Số lượng cookie có đúng bằng 10 không", en: "Whether the cookie count equals exactly 10", ja: "クッキーの数がちょうど10個かどうか" },
    ], correct: 1,
    explain: { vi: "Mục tiêu của test giữ phiên là xác nhận trạng thái đăng nhập không mất đi sau reload — đây chính là điều người dùng thật kỳ vọng.", en: "The goal of a session test is confirming login state isn't lost after a reload — exactly what real users expect.", ja: "セッションテストの目的は、再読み込み後もログイン状態が失われないことを確認することです——実際のユーザーが期待する動作そのものです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & luồng bạn sẽ test", en: "1. TL;DR & the flow you'll test", ja: "1. 要点とテストするフロー" },
    blocks: [
      TLDR("Bài này hướng dẫn tự động test đăng nhập và đăng ký cho ứng dụng TMĐT ShopEasy bằng Playwright: viết Page Object cho màn đăng ký/đăng nhập, viết test cho ca đúng lẫn ca sai (sai mật khẩu, để trống, email đã tồn tại), kiểm tra điều hướng sau khi đăng nhập, đăng xuất và giữ phiên khi tải lại trang. Kết hợp POM, assertion và waits bạn đã học ở các bài trước, có nhiều mockup giao diện, code Playwright chạy được và trắc nghiệm cuối bài.",
        "This article shows how to automate testing the register and login flow of the ShopEasy e-commerce app with Playwright: writing Page Objects for the register/login screens, writing tests for both valid and invalid cases (wrong password, blank fields, existing email), verifying navigation after login, logging out, and keeping the session after a page reload. It combines the POM, assertions and waits you learned earlier, with many UI mockups, runnable Playwright code and a quiz at the end.",
        "この記事では、PlaywrightでECアプリShopEasyの登録・ログインフローを自動テストする方法を紹介します：登録・ログイン画面用のPage Objectの作成、正常系と異常系（パスワード間違い、未入力、既存メール）両方のテスト作成、ログイン後の遷移確認、ログアウト、ページ再読み込み後のセッション維持です。これまで学んだPOM、アサーション、待機処理を組み合わせ、多数のUIモック、動くPlaywrightコード、最後にクイズを用意しています。"),
      P("Chào mừng trở lại! Ở các bài trước bạn đã học Page Object Model, cách viết assertion, và cách xử lý bất đồng bộ bằng waits. Bài này sẽ ghép cả ba lại để tự động test đăng nhập và đăng ký — hai luồng gần như MỌI ứng dụng web đều có, và cũng là nơi bug điều hướng, thông báo lỗi sai, hay lỗi giữ phiên rất hay xảy ra. Ta sẽ dùng đúng app TMĐT ShopEasy quen thuộc, viết Page Object cho cả màn đăng ký lẫn đăng nhập, rồi viết test bao phủ cả ca đúng lẫn ca sai.",
        "Welcome back! In earlier articles you learned the Page Object Model, how to write assertions, and how to handle asynchrony with waits. This article ties all three together to automate testing login and registration — two flows almost every web app has, and exactly where navigation bugs, wrong error messages, or broken sessions tend to hide. We'll use the same familiar ShopEasy e-commerce app, write Page Objects for both the register and login screens, then write tests covering both valid and invalid cases.",
        "おかえりなさい！これまでの記事でPage Object Model、アサーションの書き方、待機処理による非同期対応を学びました。今回はこの3つを組み合わせ、ログインと登録を自動テストします——ほぼすべてのWebアプリにある2つのフローであり、遷移バグや誤ったエラーメッセージ、セッションの不具合が潜みやすい場所でもあります。おなじみのECアプリShopEasyを使い、登録・ログイン両画面のPage Objectを作成し、正常系と異常系の両方をカバーするテストを書いていきます。"),
      IMG(m_register, "Màn hình đăng ký ShopEasy, chú thích locator từng ô nhập và nút Đăng ký", "The ShopEasy register screen, annotated with the locator for each field and the Register button", "ShopEasyの登録画面、各入力欄と登録ボタンのロケーターを注記"),
      DEF("Dữ liệu động (dynamic test data)", "dữ liệu kiểm thử được sinh mới mỗi lần chạy (ví dụ email kèm timestamp), giúp test đăng ký không bị trùng và chạy lại nhiều lần mà không lỗi.",
        "test data generated fresh on every run (e.g. an email with a timestamp appended), so registration tests never collide and can be rerun repeatedly without failing.",
        "実行のたびに新しく生成されるテストデータ（例：タイムスタンプ付きメール）で、登録テストが重複せず、何度再実行しても失敗しないようにするもの。"),
    ] },
  { heading: { vi: "2. Vì sao cần tự động hóa luồng đăng ký & đăng nhập", en: "2. Why automate the register & login flow", ja: "2. 登録・ログインフローを自動化すべき理由" },
    blocks: [
      P("Đăng ký và đăng nhập là hai luồng phải kiểm thử lại ở gần như MỌI lần phát hành, vì hầu hết tính năng khác đều đứng sau bước đăng nhập. Nếu làm thủ công, mỗi lần release bạn phải lặp lại y hệt các bước: mở trang, điền form, bấm nút, quan sát kết quả — tốn thời gian và rất dễ chỉ kiểm tra ca 'đúng' cho nhanh, bỏ qua các ca sai vì áp lực thời gian.",
        "Register and login are two flows you must retest on almost every release, since most other features sit behind the login step. Done manually, every release repeats the exact same steps: open the page, fill the form, click, observe the result — time-consuming, and it's tempting to only check the 'happy' case for speed, skipping the negative cases under time pressure.",
        "登録とログインは、ほぼすべてのリリースで再テストが必要な2つのフローです。他のほとんどの機能がログインの後ろに位置するためです。手動で行うと、リリースのたびに同じ手順——ページを開き、フォームに入力し、ボタンを押し、結果を観察する——を繰り返すことになり、時間がかかる上、時間的なプレッシャーから『正しい』ケースだけを速く確認し、異常系を省いてしまいがちです。"),
      P("Tự động hóa hai luồng này mang lại lợi ích ngay lập tức: chạy trong vài giây thay vì vài phút, chạy được TRÊN MỌI lần commit qua CI, và quan trọng nhất — không bao giờ 'quên' test ca sai mật khẩu chỉ vì đang gấp. Đây cũng là ví dụ thực hành tốt để ghép POM (tổ chức code), assertion (kiểm tra kết quả) và waits (chờ đúng cách) lại thành một bộ test hoàn chỉnh, thay vì học riêng lẻ từng phần.",
        "Automating these two flows brings immediate benefits: running in seconds instead of minutes, running on EVERY commit via CI, and most importantly — never 'forgetting' the wrong-password case just because you're in a hurry. It's also a great hands-on example for combining POM (code organization), assertions (result checking), and waits (waiting correctly) into one complete test suite, instead of learning each part in isolation.",
        "この2つのフローを自動化すると、すぐに恩恵があります：数分ではなく数秒で実行でき、CIで全コミットごとに実行でき、そして何より——急いでいるからといってパスワード誤りのケースを『忘れる』ことがなくなります。またこれは、POM（コード整理）、アサーション（結果検証）、待機処理（正しい待ち方）を個別に学ぶのではなく、1つの完成したテストスイートにまとめる良い実践例でもあります。"),
      TIP("Đăng nhập là bước xảy ra TRƯỚC hầu hết luồng khác — nếu test đăng nhập chạy chậm hoặc flaky, toàn bộ bộ test phía sau bị ảnh hưởng dây chuyền. Ưu tiên làm nó ổn định đầu tiên.", "Login happens BEFORE most other flows — if the login test is slow or flaky, every test downstream is affected in a chain reaction. Prioritize making it stable first.", "ログインはほとんどの他のフローより前に発生します——ログインテストが遅かったり不安定だったりすると、後続のテスト全体に連鎖的に影響します。まずこれを安定させることを優先しましょう。"),
    ] },
  { heading: { vi: "3. Xác định các ca cần tự động hóa", en: "3. Identifying the cases to automate", ja: "3. 自動化すべきケースを洗い出す" },
    blocks: [
      P("Trước khi viết code, hãy liệt kê rõ các ca cần tự động hóa — giống như viết test case trước khi automation. Với đăng ký & đăng nhập, ta cần bao phủ cả ca hợp lệ lẫn các ca người dùng thực tế hay gặp: nhập sai, để trống, dùng lại dữ liệu đã tồn tại, và các hành vi sau khi đăng nhập như đăng xuất, giữ phiên.",
        "Before writing code, clearly list the cases to automate — just like writing test cases before automating them. For register & login, we need to cover both valid cases and the ones real users actually hit: wrong input, blank fields, reusing existing data, and post-login behaviors like logging out and keeping the session.",
        "コードを書く前に、自動化すべきケースを明確に洗い出しましょう——自動化する前にテストケースを書くのと同じです。登録・ログインでは、正常系だけでなく、実際のユーザーがよく遭遇するケース——入力ミス、未入力、既存データの再利用、そしてログアウトやセッション維持といったログイン後の挙動——もカバーする必要があります。"),
      IMG(m_cases, "Bảng 8 ca cần tự động hóa cho luồng đăng ký & đăng nhập ShopEasy", "A table of 8 cases to automate for ShopEasy's register & login flow", "ShopEasyの登録・ログインフローで自動化すべき8つのケースの表"),
      P("Bảng trên là bản đồ cho toàn bộ phần thực hành tiếp theo: chương 5 sẽ hiện thực hóa 3 ca đầu (đăng ký), chương 6 hiện thực hóa 3 ca tiếp theo (đăng nhập), và chương 7 xử lý 2 ca cuối (đăng xuất, giữ phiên). Viết đủ bảng ca trước giúp bạn không viết thiếu, và cũng dễ review với đồng đội trước khi bắt tay vào code.",
        "The table above is the map for the rest of the hands-on sections: chapter 5 implements the first 3 cases (register), chapter 6 implements the next 3 (login), and chapter 7 handles the final 2 (logout, session). Writing out the full case table first keeps you from missing anything, and makes it easy to review with teammates before touching any code.",
        "上の表は、これから行う実習全体の地図です：5章で最初の3つ（登録）、6章で次の3つ（ログイン）、7章で最後の2つ（ログアウト、セッション）を実装します。先にケース一覧を書き出しておくことで、抜け漏れを防ぎ、コードを書く前にチームメンバーとレビューしやすくもなります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị Page Object: LoginPage & RegisterPage (thực hành)", en: "4. Preparing Page Objects: LoginPage & RegisterPage (hands-on)", ja: "4. Page Objectを準備する：LoginPageとRegisterPage（実習）" },
    blocks: [
      P("Áp dụng đúng nguyên tắc POM đã học: mỗi màn hình có 1 lớp riêng chứa locator + hành động. Ta viết 2 lớp — LoginPage cho màn đăng nhập, RegisterPage cho màn đăng ký — để các file test sau này chỉ cần gọi hàm, không tự viết locator.",
        "Applying the POM principle you already learned: each screen gets its own class holding locators + actions. We write two classes — LoginPage for the login screen, RegisterPage for the register screen — so later test files only call functions, never writing their own locators.",
        "学んだPOMの原則をそのまま適用します：各画面がロケーターと操作を持つ専用クラスを持ちます。ログイン画面用のLoginPage、登録画面用のRegisterPageという2つのクラスを書き、後のテストファイルは関数を呼ぶだけで、独自のロケーターを書かないようにします。"),
      STEP(1, "Tạo pages/LoginPage.js với locator ô email, mật khẩu, nút đăng nhập, khối lỗi, và hàm login(email, password).", "Create pages/LoginPage.js with locators for the email field, password field, login button, error block, and a login(email, password) function.", "pages/LoginPage.jsを作成し、メール欄、パスワード欄、ログインボタン、エラーブロックのロケーターと、login(email, password)関数を用意する。"),
      STEP(2, "Tạo pages/RegisterPage.js với locator ô họ tên, email, mật khẩu, nút đăng ký, khối lỗi, và hàm register(fullName, email, password).", "Create pages/RegisterPage.js with locators for the full-name, email, password fields, register button, error block, and a register(fullName, email, password) function.", "pages/RegisterPage.jsを作成し、氏名、メール、パスワードの各欄、登録ボタン、エラーブロックのロケーターと、register(fullName, email, password)関数を用意する。"),
      STEP(3, "Mỗi lớp có hàm goto() riêng để mở đúng URL màn hình của nó (/dang-nhap hoặc /dang-ky).", "Each class gets its own goto() function to open its exact screen URL (/dang-nhap or /dang-ky).", "各クラスに、自身の画面URL（/dang-nhapまたは/dang-ky）を開く専用のgoto()関数を用意する。"),
      STEP(4, "Export cả 2 lớp để file test import và dùng chung trong cùng 1 kịch bản khi cần (ví dụ đăng ký xong rồi đăng nhập).", "Export both classes so test files can import and use them together in one scenario when needed (e.g. register then log in).", "必要なとき（例：登録してからログインする）に1つのシナリオで一緒にインポートして使えるよう、両クラスをエクスポートする。"),
      CODE("javascript", "// pages/LoginPage.js\nclass LoginPage {\n  constructor(page) {\n    this.page = page;\n    this.emailInput = page.locator('#email-input');\n    this.passwordInput = page.locator('#password-input');\n    this.loginButton = page.locator('#btn-login');\n    this.errorMessage = page.locator('.login-error');\n    this.logoutButton = page.locator('#btn-logout');\n  }\n\n  async goto() {\n    await this.page.goto('https://shopeasy.vn/dang-nhap');\n  }\n\n  async login(email, password) {\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.loginButton.click();\n  }\n\n  async logout() {\n    await this.logoutButton.click();\n  }\n}\n\nmodule.exports = { LoginPage };"),
      CODE("javascript", "// pages/RegisterPage.js\nclass RegisterPage {\n  constructor(page) {\n    this.page = page;\n    this.fullNameInput = page.locator('#fullname-input');\n    this.emailInput = page.locator('#email-input');\n    this.passwordInput = page.locator('#password-input');\n    this.registerButton = page.locator('#btn-register');\n    this.errorMessage = page.locator('.register-error');\n  }\n\n  async goto() {\n    await this.page.goto('https://shopeasy.vn/dang-ky');\n  }\n\n  async register(fullName, email, password) {\n    await this.fullNameInput.fill(fullName);\n    await this.emailInput.fill(email);\n    await this.passwordInput.fill(password);\n    await this.registerButton.click();\n  }\n\n  async getErrorText() {\n    return this.errorMessage.textContent();\n  }\n}\n\nmodule.exports = { RegisterPage };"),
    ] },
  { heading: { vi: "5. Viết test đăng ký: đúng, trùng email, để trống (thực hành)", en: "5. Writing register tests: valid, duplicate email, blank field (hands-on)", ja: "5. 登録テストを書く：正常、メール重複、未入力（実習）" },
    blocks: [
      P("Giờ ta hiện thực hóa 3 ca đầu trong bảng ở chương 3. Điểm mấu chốt: ca đăng ký hợp lệ PHẢI dùng email động (sinh mới mỗi lần chạy) để tránh lỗi 'email đã tồn tại' ở lần chạy sau — chi tiết vì sao sẽ bàn kỹ ở tình huống chương 9.",
        "Now let's implement the first 3 cases from the table in chapter 3. Key point: the valid-register case MUST use a dynamic email (freshly generated each run) to avoid an 'email already exists' error on later runs — we'll cover why in detail in the situation in chapter 9.",
        "では、3章の表の最初の3ケースを実装しましょう。重要なポイント：正常な登録ケースは、以降の実行で『メールが既に存在する』エラーを避けるため、必ず動的なメール（実行のたびに新しく生成）を使わなければなりません——理由は9章のシーンで詳しく扱います。"),
      STEP(1, "Import RegisterPage vào tests/register.spec.js, khởi tạo new RegisterPage(page) trong mỗi test.", "Import RegisterPage into tests/register.spec.js, instantiate new RegisterPage(page) in each test.", "tests/register.spec.jsにRegisterPageをインポートし、各テストでnew RegisterPage(page)を生成する。"),
      STEP(2, "Ca hợp lệ: sinh email bằng Date.now(), gọi register(), rồi assert điều hướng sang /tai-khoan bằng expect(page).toHaveURL().", "Valid case: generate the email with Date.now(), call register(), then assert navigation to /tai-khoan with expect(page).toHaveURL().", "正常ケース：Date.now()でメールを生成し、register()を呼び、expect(page).toHaveURL()で/tai-khoanへの遷移を検証する。"),
      STEP(3, "Ca trùng email & để trống: gọi register() với email cố định đã tồn tại, hoặc để trống mật khẩu, rồi assert errorMessage hiển thị.", "Duplicate email & blank case: call register() with a fixed already-existing email, or a blank password, then assert errorMessage is visible.", "メール重複・未入力ケース：既存の固定メール、またはパスワードを空にしてregister()を呼び、errorMessageが表示されることを検証する。"),
      CODE("javascript", "// tests/register.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { RegisterPage } = require('../pages/RegisterPage');\n\ntest.describe('ShopEasy - Dang ky', () => {\n  test('dang ky thanh cong voi email dong moi lan chay', async ({ page }) => {\n    const registerPage = new RegisterPage(page);\n    const uniqueEmail = `qa.tester+${Date.now()}@gmail.com`;\n    await registerPage.goto();\n    await registerPage.register('Mai Tran', uniqueEmail, 'Mai@2024');\n    await expect(page).toHaveURL(/.*\\/tai-khoan/);\n  });\n\n  test('dang ky that bai voi email da ton tai', async ({ page }) => {\n    const registerPage = new RegisterPage(page);\n    await registerPage.goto();\n    await registerPage.register('Mai Tran', 'da-ton-tai@gmail.com', 'Mai@2024');\n    await expect(registerPage.errorMessage).toBeVisible();\n    await expect(registerPage.errorMessage).toContainText('da ton tai');\n  });\n\n  test('dang ky bao loi khi bo trong mat khau', async ({ page }) => {\n    const registerPage = new RegisterPage(page);\n    const uniqueEmail = `qa.tester+${Date.now()}@gmail.com`;\n    await registerPage.goto();\n    await registerPage.register('Mai Tran', uniqueEmail, '');\n    await expect(registerPage.errorMessage).toBeVisible();\n  });\n});"),
      TRY("Thêm 1 test thứ tư: đăng ký với ô Họ và tên để trống, kiểm tra registerPage.errorMessage hiện đúng thông báo bắt buộc nhập.", "Add a fourth test: register with a blank Full Name field, and verify registerPage.errorMessage shows the correct required-field message.", "4つ目のテストを追加：氏名欄を空にして登録し、registerPage.errorMessageが正しい必須項目メッセージを表示するか確認しよう。"),
    ] },
  { heading: { vi: "6. Viết test đăng nhập: đúng mật khẩu & sai mật khẩu (thực hành)", en: "6. Writing login tests: correct & wrong password (hands-on)", ja: "6. ログインテストを書く：正しいパスワードと間違ったパスワード（実習）" },
    blocks: [
      P("Tiếp tục với 3 ca đăng nhập trong bảng: đúng mật khẩu, sai mật khẩu, và để trống mật khẩu. Ca sai mật khẩu quan trọng không kém ca đúng — nó xác nhận hệ thống PHẢN HỒI đúng khi người dùng gõ nhầm, thay vì im lặng hoặc crash.",
        "Continuing with the 3 login cases from the table: correct password, wrong password, and blank password. The wrong-password case is just as important as the correct one — it confirms the system RESPONDS correctly when a user mistypes, instead of staying silent or crashing.",
        "表にある3つのログインケースを続けます：正しいパスワード、間違ったパスワード、未入力のパスワードです。パスワード誤りのケースは正しいケースと同じくらい重要です——ユーザーが打ち間違えたとき、システムが黙り込んだりクラッシュしたりせず正しく応答することを確認します。"),
      IMG(m_login_error, "Màn hình đăng nhập ShopEasy khi nhập sai mật khẩu, chú thích locator ô lỗi và nút", "The ShopEasy login screen after a wrong password, annotated with the error field and button locators", "パスワードを間違えたときのShopEasyログイン画面、エラー欄とボタンのロケーターを注記"),
      STEP(1, "Import LoginPage vào tests/login.spec.js, khởi tạo new LoginPage(page) trong mỗi test.", "Import LoginPage into tests/login.spec.js, instantiate new LoginPage(page) in each test.", "tests/login.spec.jsにLoginPageをインポートし、各テストでnew LoginPage(page)を生成する。"),
      STEP(2, "Ca đúng mật khẩu: gọi login() với tài khoản hợp lệ, assert điều hướng sang /tai-khoan bằng expect(page).toHaveURL() (auto-wait, không dùng waitForTimeout).", "Correct-password case: call login() with a valid account, assert navigation to /tai-khoan with expect(page).toHaveURL() (auto-wait, not waitForTimeout).", "正しいパスワードのケース：有効なアカウントでlogin()を呼び、expect(page).toHaveURL()（自動待機、waitForTimeoutは使わない）で/tai-khoanへの遷移を検証する。"),
      STEP(3, "Ca sai mật khẩu: gọi login() với mật khẩu sai, assert loginPage.errorMessage hiển thị VÀ URL vẫn còn ở /dang-nhap.", "Wrong-password case: call login() with an incorrect password, assert loginPage.errorMessage is visible AND the URL stays on /dang-nhap.", "パスワード誤りのケース：誤ったパスワードでlogin()を呼び、loginPage.errorMessageが表示され、かつURLが/dang-nhapのままであることを検証する。"),
      CODE("javascript", "// tests/login.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { LoginPage } = require('../pages/LoginPage');\n\ntest.describe('ShopEasy - Dang nhap', () => {\n  test('dang nhap thanh cong dieu huong sang trang tai khoan', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('mai.tran@gmail.com', 'Mai@2024');\n    await expect(page).toHaveURL(/.*\\/tai-khoan/, { timeout: 5000 });\n  });\n\n  test('dang nhap that bai voi mat khau sai, hien loi va o lai trang dang nhap', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('mai.tran@gmail.com', 'sai-mat-khau-123');\n    await expect(loginPage.errorMessage).toBeVisible();\n    await expect(page).toHaveURL(/.*\\/dang-nhap/);\n  });\n\n  test('dang nhap bao loi khi bo trong mat khau', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('mai.tran@gmail.com', '');\n    await expect(loginPage.errorMessage).toBeVisible();\n  });\n});"),
      TRY("Chạy lại test 'sai mật khẩu' 2 lần liên tiếp và quan sát: nó có luôn pass ổn định không, hay đôi lúc bị flaky vì thiếu chờ đúng cách?", "Rerun the 'wrong password' test twice in a row and observe: does it always pass consistently, or is it sometimes flaky from missing proper waits?", "『パスワード誤り』のテストを連続して2回実行し観察しよう：常に安定して通るか、それとも適切な待機がなく時々不安定になるか？"),
    ] },
  { heading: { vi: "7. Kiểm tra đăng xuất & giữ phiên đăng nhập (thực hành)", en: "7. Testing logout & session persistence (hands-on)", ja: "7. ログアウトとセッション維持のテスト（実習）" },
    blocks: [
      P("2 ca cuối trong bảng nằm sau bước đăng nhập: giữ phiên khi tải lại trang, và đăng xuất đúng cách. Cả hai đều tái sử dụng loginPage.login() đã viết ở chương trước — đúng tinh thần POM: không viết lại logic đăng nhập ở nơi khác.",
        "The last 2 cases in the table come after the login step: keeping the session on reload, and logging out correctly. Both reuse the loginPage.login() written in the previous chapter — true to POM: don't rewrite login logic elsewhere.",
        "表の最後の2ケースはログインステップの後にあります：再読み込み時のセッション維持と、正しいログアウトです。どちらも前章で書いたloginPage.login()を再利用します——POMの精神どおり、ログインロジックを他の場所で書き直しません。"),
      IMG(m_flow, "Sơ đồ luồng test: đăng ký sinh email dùng cho đăng nhập, đăng nhập rồi kiểm tra phiên & đăng xuất", "Test flow diagram: registration produces an email used for login, then login flows into session & logout checks", "テストの流れ図：登録で生成したメールをログインに使い、ログイン後にセッションとログアウトを確認する"),
      STEP(1, "Test giữ phiên: login() xong, gọi page.reload(), rồi assert URL vẫn ở /tai-khoan (không bị đá về /dang-nhap).", "Session test: after login(), call page.reload(), then assert the URL is still /tai-khoan (not redirected to /dang-nhap).", "セッションテスト：login()の後にpage.reload()を呼び、URLが（/dang-nhapに戻されず）/tai-khoanのままであることを検証する。"),
      STEP(2, "Test đăng xuất: login() xong, gọi loginPage.logout(), assert URL chuyển về /dang-nhap, rồi thử truy cập lại /tai-khoan để xác nhận phiên đã bị xoá.", "Logout test: after login(), call loginPage.logout(), assert the URL moves to /dang-nhap, then try visiting /tai-khoan again to confirm the session was cleared.", "ログアウトテスト：login()の後にloginPage.logout()を呼び、URLが/dang-nhapに変わることを検証し、さらに/tai-khoanへ再度アクセスしてセッションが削除されたことを確認する。"),
      CODE("javascript", "// tests/session.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { LoginPage } = require('../pages/LoginPage');\n\ntest('giu phien dang nhap sau khi tai lai trang', async ({ page }) => {\n  const loginPage = new LoginPage(page);\n  await loginPage.goto();\n  await loginPage.login('mai.tran@gmail.com', 'Mai@2024');\n  await page.reload();\n  await expect(page).toHaveURL(/.*\\/tai-khoan/);\n});\n\ntest('dang xuat dieu huong ve trang dang nhap va xoa phien', async ({ page }) => {\n  const loginPage = new LoginPage(page);\n  await loginPage.goto();\n  await loginPage.login('mai.tran@gmail.com', 'Mai@2024');\n  await loginPage.logout();\n  await expect(page).toHaveURL(/.*\\/dang-nhap/);\n  await page.goto('https://shopeasy.vn/tai-khoan');\n  await expect(page).toHaveURL(/.*\\/dang-nhap/);\n});"),
    ] },
  { heading: { vi: "8. Tình huống 1: chỉ test happy path, bỏ sót ca sai mật khẩu", en: "8. Situation 1: testing only the happy path, skipping the wrong-password case", ja: "8. シーン1：ハッピーパスだけをテストし、パスワード誤りケースを省略する" },
    blocks: [
      SITUATION("Vì gấp deadline, một bạn automation mới chỉ viết đúng 1 test cho luồng đăng nhập: đăng nhập với tài khoản hợp lệ và assert điều hướng thành công. Ca sai mật khẩu bị bỏ qua vì 'chắc không ai gõ sai đâu'.", "Under a tight deadline, a new automation engineer writes only ONE test for the login flow: logging in with a valid account and asserting a successful navigation. The wrong-password case is skipped because 'no one's really going to mistype anyway'.",
        "Vài tuần sau, đội frontend đổi cách hiển thị thông báo lỗi (đổi class '.login-error' thành '.error-banner') nhưng không xóa class cũ hoàn toàn — khối lỗi vẫn tồn tại trên DOM nhưng KHÔNG BAO GIỜ hiện chữ. Người dùng thật gõ sai mật khẩu, không thấy thông báo lỗi nào, tưởng hệ thống bị treo và gọi lên tổng đài hỗ trợ. Vì không có test nào che phủ ca này, lỗi tồn tại nhiều tuần trước khi bị phát hiện.",
        "Due to a tight deadline, a new automation engineer writes just ONE test for the login flow: log in with a valid account and assert successful navigation. The wrong-password case is skipped because 'no one's really going to mistype anyway'.",
        "Weeks later, the frontend team changes how error messages display (renaming class '.login-error' to '.error-banner') but doesn't fully remove the old class — the error block still exists in the DOM but NEVER shows text. A real user mistypes their password, sees no error message, thinks the system is frozen, and calls support. Because no test covered this case, the bug lived for weeks before being caught.",
        "締め切りに追われ、新人の自動化エンジニアがログインフローのテストを1つだけ書く：有効なアカウントでログインし、正常な遷移をアサートする。パスワード誤りのケースは『どうせ誰も打ち間違えないだろう』と省略される。",
        "数週間後、フロントエンドチームがエラーメッセージの表示方法を変更する（'.login-error'クラスを'.error-banner'に変更）が、古いクラスを完全には削除しない——エラーブロックはDOM上に存在するが、テキストが決して表示されなくなる。実際のユーザーがパスワードを打ち間違えても、エラーメッセージが見えず、システムがフリーズしたと思ってサポートに電話する。このケースをカバーするテストがなかったため、バグは発見されるまで数週間存在し続けた。"),
      SOLVE("Bổ sung ngay test 'sai mật khẩu' như đã viết ở chương 6: gọi login() với mật khẩu sai, rồi assert loginPage.errorMessage hiển thị VÀ chứa đúng nội dung thông báo. Test này chạy trên MỌI lần commit qua CI, nên nếu class lỗi đổi mà không cập nhật đúng, test sẽ báo đỏ ngay lập tức thay vì đợi người dùng thật phát hiện.", "Immediately add the 'wrong password' test written in chapter 6: call login() with a wrong password, then assert loginPage.errorMessage is visible AND contains the correct message text. This test runs on EVERY commit via CI, so if the error class changes without a proper update, the test fails immediately instead of waiting for a real user to discover it.", "6章で書いた『パスワード誤り』のテストをすぐに追加する：誤ったパスワードでlogin()を呼び、loginPage.errorMessageが表示され、正しいメッセージ内容を含むことをアサートする。このテストはCIで全コミットごとに実行されるため、エラークラスが正しく更新されずに変わった場合、実際のユーザーが発見するのを待たずにすぐテストが失敗として報告される。"),
      P("Bài học: 'happy path pass' không đồng nghĩa với 'tính năng hoạt động đúng'. Phần xử lý lỗi — thông báo hiện đúng chỗ, đúng nội dung, không làm người dùng bối rối — thường bị xem nhẹ khi viết test, nhưng lại chính là nơi trải nghiệm người dùng thật sự bị ảnh hưởng khi có sự cố.",
        "Lesson: a passing happy path doesn't mean the feature works correctly. Error handling — the message appearing in the right place, with the right content, without confusing the user — is often underweighted when writing tests, yet it's exactly where real user experience is affected when something goes wrong.",
        "教訓：ハッピーパスが通ることは、機能が正しく動作していることを意味しません。エラー処理——メッセージが正しい場所に、正しい内容で表示され、ユーザーを混乱させないこと——はテストを書く際に軽視されがちですが、何か問題が起きたときに実際のユーザー体験が影響を受けるのはまさにこの部分です。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố thông báo lỗi đăng nhập không hiện, do thiếu test ca sai mật khẩu", "A bug ticket recording the incident where the login error message never showed, due to a missing wrong-password test", "パスワード誤りのテストが欠けていたために、ログインのエラーメッセージが表示されなかったインシデントを記録したバグチケット"),
      RECAP(["Happy path pass không có nghĩa là tính năng hoàn chỉnh", "Ca sai mật khẩu thường là nơi lộ bug xử lý lỗi thật"],
        ["A passing happy path doesn't mean the feature is complete", "The wrong-password case is often where real error-handling bugs surface"],
        ["ハッピーパスが通っても機能が完全とは限らない", "パスワード誤りのケースこそ、実際のエラー処理バグが表面化しやすい場所"]),
    ] },
  { heading: { vi: "9. Tình huống 2: test đăng ký tạo trùng email mỗi lần chạy", en: "9. Situation 2: register tests colliding on the same email every run", ja: "9. シーン2：登録テストが実行のたびに同じメールで衝突する" },
    blocks: [
      SITUATION("Một đội automation viết test đăng ký với email cố định 'test.qa@gmail.com', chạy pass ngon lành ở máy cá nhân lần đầu tiên. Test này được thêm vào pipeline CI, chạy tự động mỗi khi có commit mới.", "An automation team writes a register test using the fixed email 'test.qa@gmail.com', which passes smoothly on a personal machine the first time. This test is added to the CI pipeline, running automatically on every new commit.",
        "Lần chạy CI đầu tiên pass bình thường — tài khoản 'test.qa@gmail.com' được tạo thành công. Nhưng lần chạy CI thứ hai (commit tiếp theo) lại FAIL, báo lỗi 'email đã tồn tại', dù code ứng dụng không hề có bug gì. Đội automation hoang mang tưởng vừa có regression, mất cả buổi điều tra mới phát hiện: chính test của mình đã 'tự phá' chính nó vì dùng lại y hệt 1 email.",
        "The first CI run passes fine — the 'test.qa@gmail.com' account is created successfully. But the second CI run (next commit) FAILS with an 'email already exists' error, even though the app code has no actual bug. The automation team panics, assuming a regression just happened, and spends a whole afternoon investigating before discovering: their own test 'broke itself' by reusing the exact same email.",
        "自動化チームが固定メール'test.qa@gmail.com'を使った登録テストを書き、個人のマシンで最初の実行はスムーズに通る。このテストはCIパイプラインに追加され、新しいコミットのたびに自動実行される。",
        "最初のCI実行は問題なく通る——'test.qa@gmail.com'アカウントが正常に作成される。しかし2回目のCI実行（次のコミット）は『メールが既に存在する』エラーでFAILする、アプリのコードには実際バグがないにもかかわらず。自動化チームはリグレッションが起きたと思いパニックになり、丸半日調査した末に、自分たちのテスト自身が同じメールを再利用して『自壊』していたことを発見する。"),
      SOLVE("Đổi sang sinh email động ngay trong test, ghép timestamp bằng Date.now() (như đã viết ở chương 5): `qa.tester+${Date.now()}@gmail.com`. Mỗi lần chạy tạo một địa chỉ email khác nhau tuyệt đối, nên test đăng ký hợp lệ luôn tạo được tài khoản mới, không phụ thuộc lịch sử chạy trước đó hay việc dữ liệu test có được dọn hay không.", "Switch to generating the email dynamically inside the test, appending a timestamp with Date.now() (as written in chapter 5): `qa.tester+${Date.now()}@gmail.com`. Every run produces a completely different email address, so the valid-register test always creates a fresh account, independent of run history or whether test data was cleaned up.", "テスト内で動的にメールを生成するように変更し、Date.now()でタイムスタンプを付与する（5章で書いた通り）：`qa.tester+${Date.now()}@gmail.com`。実行のたびに完全に異なるメールアドレスが生成されるため、正常な登録テストは常に新しいアカウントを作成でき、実行履歴やテストデータが片付けられているかに依存しません。"),
      P("Bài học ở đây không chỉ là 'dùng email động' — mà là nguyên tắc rộng hơn: một test tự động NÊN chạy độc lập, lặp lại được nhiều lần, không phụ thuộc trạng thái để lại từ lần chạy trước. Nguyên tắc này áp dụng cho mọi luồng có thao tác TẠO dữ liệu (đăng ký, tạo đơn hàng, tạo bình luận...), không riêng gì đăng ký.",
        "The lesson here isn't just 'use a dynamic email' — it's the broader principle: an automated test SHOULD run independently and repeatably, without depending on state left behind by a previous run. This principle applies to any flow that CREATES data (registration, placing orders, posting comments...), not just registration.",
        "ここでの教訓は『動的なメールを使う』ことだけではなく、より広い原則です：自動テストは独立して実行でき、繰り返し実行可能であるべきで、前回の実行が残した状態に依存すべきではありません。この原則は、登録に限らず、データを『作成』するあらゆるフロー（登録、注文作成、コメント投稿など）に当てはまります。"),
      IMG(m_dashboard, "Bảng theo dõi độ phủ tự động hóa sau khi sửa lỗi email trùng bằng dữ liệu động", "A coverage dashboard after fixing the duplicate-email bug with dynamic test data", "動的テストデータでメール重複バグを修正した後の自動化カバレッジダッシュボード"),
      RECAP(["Dùng dữ liệu tạo mới (email động) cho MỌI ca đăng ký, không chỉ ca chính", "Test tự động nên độc lập, chạy lặp lại nhiều lần mà không lỗi vì dữ liệu cũ"],
        ["Use freshly generated data (dynamic email) for EVERY register case, not just the main one", "Automated tests should be independent and rerunnable without failing due to leftover data"],
        ["主要ケースだけでなく、すべての登録ケースで新規生成データ（動的メール）を使う", "自動テストは独立していて、古いデータのせいで失敗せず何度も再実行できるべき"]),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Chỉ test happy path (đăng nhập/đăng ký đúng), bỏ qua ca sai mật khẩu, để trống, hay dữ liệu trùng — đúng phần dễ ẩn bug xử lý lỗi nhất.", "Only testing the happy path (correct login/register), skipping wrong-password, blank-field, or duplicate-data cases — exactly the part most likely to hide error-handling bugs.", "ハッピーパス（正しいログイン/登録）だけをテストし、パスワード誤り、未入力、データ重複のケースを省略すること——まさにエラー処理のバグが最も隠れやすい部分です。"),
      PITFALL("Dùng page.waitForTimeout() cố định để 'chờ điều hướng xong' thay vì expect(page).toHaveURL(...). Chờ cứng vừa chậm không cần thiết, vừa vẫn có thể flaky nếu mạng chậm hơn thời gian chờ đã đặt.", "Using a fixed page.waitForTimeout() to 'wait for navigation to finish' instead of expect(page).toHaveURL(...). A fixed wait is both needlessly slow and can still be flaky if the network is slower than the wait duration you set.", "遷移完了を『待つ』ためにexpect(page).toHaveURL(...)の代わりに固定のpage.waitForTimeout()を使うこと。固定待機は不必要に遅い上、設定した待機時間よりネットワークが遅ければ、それでも不安定になり得ます。"),
      TIP("Dùng dữ liệu động (timestamp) làm mặc định cho MỌI ca đăng ký ngay từ đầu, không chỉ ca chính — thói quen này giúp cả bộ test độc lập và chạy lại được nhiều lần trên CI mà không lo dữ liệu cũ.", "Make dynamic data (a timestamp) the default for EVERY register case from the start, not just the main one — this habit keeps the whole suite independent and rerunnable on CI without worrying about leftover data.", "最初から、主要ケースだけでなくすべての登録ケースで動的データ（タイムスタンプ）をデフォルトにしよう——この習慣により、テストスイート全体が独立し、古いデータを気にせずCI上で何度も再実行できます。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model (POM) for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者向けPage Object Model"),
      INTERNAL("Kiểm thử đăng nhập & đăng ký cho người mới", "Testing login & registration for beginners", "kiem-thu-dang-nhap-dang-ky-cho-nguoi-moi", "初心者のためのログイン・登録テスト"),
      INTERNAL("Waits & xử lý bất đồng bộ cho người mới", "Waits & handling asynchrony for beginners", "waits-xu-ly-bat-dong-bo-cho-nguoi-moi", "初心者のための待機処理と非同期対応"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa tự động test đăng nhập và đăng ký cho ShopEasy bằng cách ghép POM, assertion và waits lại thành một bộ test hoàn chỉnh: LoginPage/RegisterPage tách locator khỏi test, 8 ca bao phủ cả đúng lẫn sai (mật khẩu sai, để trống, email trùng), kiểm tra điều hướng bằng expect(page).toHaveURL(), và xác nhận đăng xuất/giữ phiên hoạt động đúng. Hai tình huống thật cho thấy chi phí khi chỉ test happy path (bug thông báo lỗi lọt qua) và khi dùng dữ liệu tĩnh cho ca tạo dữ liệu (test tự phá chính nó).",
        "You just automated testing login and registration for ShopEasy by combining POM, assertions and waits into one complete test suite: LoginPage/RegisterPage separate locators from tests, 8 cases cover both valid and invalid paths (wrong password, blank fields, duplicate email), navigation is verified with expect(page).toHaveURL(), and logout/session persistence are confirmed to work correctly. Two real situations showed the cost of testing only the happy path (an error-message bug slipping through) and of using static data for a data-creating case (the test breaking itself).",
        "POM、アサーション、待機処理を組み合わせ、ShopEasyのログインと登録を自動テストする1つの完成したテストスイートを作りました：LoginPage/RegisterPageがロケーターをテストから分離し、8つのケースが正常系と異常系（パスワード誤り、未入力、メール重複）の両方をカバーし、expect(page).toHaveURL()で遷移を検証し、ログアウトとセッション維持が正しく動くことを確認しました。2つの実例は、ハッピーパスだけをテストしたときのコスト（エラーメッセージのバグが見逃される）と、データ作成ケースに静的データを使ったときのコスト（テストが自壊する）を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về chạy test song song trên nhiều trình duyệt (cross-browser) và cách dựng dữ liệu test bằng API thay vì UI để chạy nhanh hơn. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into running tests in parallel across multiple browsers (cross-browser) and setting up test data via API instead of the UI for faster runs. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、複数ブラウザでの並列実行（クロスブラウザ）や、より速く実行するためにUIではなくAPIでテストデータを準備する方法を学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const LOGINFLOW_01 = makeDoc({
  slug: "tu-dong-test-dang-ky-dang-nhap-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "tự động test đăng nhập",
  keywords: ["tự động test đăng nhập", "tự động test đăng ký", "automation testing", "playwright end-to-end", "kiểm thử luồng đăng nhập cho người mới"],
  coverLabel: "NGƯỜI MỚI · TỰ ĐỘNG ĐĂNG NHẬP · TMĐT",
  crumb: "Tự động test đăng ký & đăng nhập cho người mới",
  metaTitle: { vi: "Tự động test đăng nhập & đăng ký cho người mới", en: "Automated login & register testing for beginners", ja: "初心者のための自動ログイン・登録テスト" },
  metaDescription: {
    vi: "Tự động test đăng nhập & đăng ký ShopEasy bằng Playwright: Page Object, sai mật khẩu, email trùng, để trống, đăng xuất, giữ phiên — có code chạy và trắc nghiệm.",
    en: "Automated login and register testing for ShopEasy with Playwright: writing Page Objects, checking wrong password, duplicate email, blank fields, logout, and session persistence, with runnable code and a quiz at the end.",
    ja: "PlaywrightでShopEasyのログイン・登録を自動テスト：Page Objectの作成、パスワード誤り・メール重複・未入力・ログアウト・セッション維持の検証、動くコードと最後にクイズ付きで解説。",
  },
  title: {
    vi: "Tự động hóa kiểm thử luồng đăng ký & đăng nhập cho người mới (có code chạy được)",
    en: "Automating the register & login flow for beginners (with runnable code)",
    ja: "初心者のための登録・ログインフロー自動テスト（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: tự động test đăng nhập ShopEasy bằng Playwright, ghép POM, assertion và waits thành 1 bộ test hoàn chỉnh. Viết LoginPage/RegisterPage, 8 ca bao phủ đúng/sai (mật khẩu sai, để trống, email trùng), điều hướng, đăng xuất, giữ phiên. Hai tình huống thật (bỏ sót ca sai mật khẩu, email trùng mỗi lần chạy), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: automate testing ShopEasy's login flow with Playwright, combining POM, assertions and waits into one complete test suite. Write LoginPage/RegisterPage, 8 cases covering valid/invalid paths (wrong password, blank fields, duplicate email), navigation, logout, session persistence. Two real situations (skipping the wrong-password case, colliding emails every run), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：PlaywrightでShopEasyのログインフローを自動テストし、POM、アサーション、待機処理を1つの完成したテストスイートにまとめる。LoginPage/RegisterPageの作成、正常系・異常系（パスワード誤り、未入力、メール重複）8ケース、遷移、ログアウト、セッション維持。2つの実例（パスワード誤りケースの省略、実行ごとのメール重複）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách tự động test luồng đăng ký & đăng nhập", steps: [
    { name: "Viết Page Object cho từng màn hình", text: "LoginPage và RegisterPage chứa locator + hành động, tách khỏi file test." },
    { name: "Viết test bao phủ ca đúng và ca sai", text: "Đăng nhập/đăng ký đúng, sai mật khẩu, để trống, email trùng — dùng dữ liệu động." },
    { name: "Kiểm tra điều hướng, đăng xuất, giữ phiên", text: "Dùng expect(page).toHaveURL() để xác nhận điều hướng, reload để kiểm tra phiên." },
  ] },
  pages,
});

export const AU_LOGINFLOW_01 = [LOGINFLOW_01];
