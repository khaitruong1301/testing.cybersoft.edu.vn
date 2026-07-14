// doc_au_codegen.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Dùng Playwright Codegen (npx playwright codegen) để ghi lại thao tác click/nhập liệu
// thành code test tự động, cách đọc và chỉnh sửa code sinh ra, chọn locator tốt,
// dùng Codegen để học nhanh cú pháp Playwright, và giới hạn của test ghi tự động
// (khi nào cần refactor sang cấu trúc bền vững hơn như Page Object).
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright/JS chạy được.
// Gắn app TMĐT ShopEasy (trang đăng nhập). Song ngữ vi/en/ja (ja≠en), 12 chương,
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
const COURSE_1V1_URL = "https://cybersoft.edu.vn/trainning-course-1vs1/";

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

// ── Mockup 1: cửa sổ Playwright Inspector đang ghi thao tác trên màn đăng nhập ShopEasy ──
const m_recorder = browser("shopeasy.vn/dang-nhap · Playwright Inspector đang ghi", [
  panel("ShopEasy · Đăng nhập (đang thao tác thật)", [
    field(24, 20, 660, "Email", "mai.tran@gmail.com", "focus"),
    field(24, 112, 660, "Mật khẩu", "••••••••", "normal"),
    btn(24, 204, 220, "Đăng nhập", "primary"),
    annotate(20, 10, 668, 72, "🔴 REC: getByLabel('Email').fill(...)"),
    annotate(20, 102, 668, 72, "🔴 REC: getByLabel('Mật khẩu').fill(...)"),
    annotate(20, 196, 228, 50, "🔴 REC: getByRole('button',{name:'Đăng nhập'}).click()"),
  ].join(""), { h: 280, accent: "#dc2626" }),
].join(""), { h: 336, title: "● Recording", accent: "#dc2626" });

// ── Mockup 2: bảng code ghi thô (Codegen sinh ra) và code sau khi chỉnh sửa ──
const m_rawvsclean = grid("Code Codegen sinh thô và code sau khi người mới chỉnh sửa", ["Tiêu chí", "Code Codegen ghi thô", "Code sau khi chỉnh sửa"], [
  ["Tên test", "test('test', ...) — tên mặc định vô nghĩa", "test('dang nhap thanh cong voi tai khoan hop le', ...)"],
  ["Bước thừa", "Có bước hover menu ngôn ngữ do lỡ tay khi ghi", "Đã xoá, chỉ giữ bước đúng luồng đăng nhập"],
  ["Assert kết quả", "Không có câu expect() nào kiểm tra kết quả", "Thêm expect(page).toHaveURL(...) để xác nhận đăng nhập thành công"],
  ["Locator", "Trộn lẫn getByText và getByLabel không nhất quán", "Ưu tiên getByLabel/getByRole ổn định, đặt lại nếu cần"],
  ["Khả năng tái sử dụng", "Chỉ chạy đúng 1 lần, không tái dùng được ở test khác", "Có thể tách thành hàm/Page Object để dùng lại"],
], { accent: "#dc2626", note: "Codegen cho bạn điểm khởi đầu nhanh — phần chỉnh sửa mới quyết định test có bền vững hay không." });

// ── Mockup 3: bảng so sánh các kiểu locator Codegen có thể sinh ra ──
const m_locatorpick = grid("Các kiểu locator Codegen gợi ý khi bạn click vào 1 phần tử", ["Kiểu locator", "Ví dụ", "Độ ổn định khi UI đổi"], [
  ["Theo role + tên hiển thị", "getByRole('button', { name: 'Đăng nhập' })", "Khá ổn định — chỉ vỡ khi đổi cả vai trò lẫn nhãn"],
  ["Theo nhãn ô nhập (label)", "getByLabel('Email')", "Ổn định — gắn với nhãn form, ít đổi"],
  ["Theo text hiển thị", "getByText('Thêm vào giỏ')", "Giòn — vỡ ngay khi đổi câu chữ, dịch ngôn ngữ"],
  ["Theo test id riêng", "getByTestId('btn-login')", "Rất ổn định — nhưng cần FE gắn sẵn thuộc tính test id"],
  ["Theo CSS/XPath phức tạp", "locator('div > div:nth-child(3) > button')", "Rất giòn — chỉ cần đổi 1 lớp CSS là vỡ"],
], { accent: "#dc2626", note: "Codegen thường ưu tiên gợi ý role/label/test id trước — nhưng vẫn nên tự kiểm tra lại trước khi lưu bài test." });

// ── Mockup 4: sơ đồ quy trình Ghi → Sửa → Chạy khi dùng Codegen ──
const m_flow = moduleFlow("Quy trình dùng Codegen: Ghi → Đọc & sửa → Chạy trong bộ test", [
  { id: "record", label: "1. Ghi", sub: "npx playwright codegen", x: 96, y: 150 },
  { id: "edit", label: "2. Đọc & sửa", sub: "đặt tên, thêm assert, dọn bước thừa", x: 380, y: 150 },
  { id: "run", label: "3. Chạy", sub: "npx playwright test", x: 664, y: 150 },
], [
  { from: "record", to: "edit", label: "code .spec.js thô" },
  { from: "edit", to: "run", label: "code đã refactor" },
], { accent: "#dc2626", h: 260 });

// ── Mockup 5: ticket Jira khi commit thẳng code Codegen với selector theo text bị giòn ──
const m_jira = jira({
  key: "SE-14201", title: "Test 'Thêm vào giỏ' fail sau khi marketing đổi nhãn nút, dù chức năng vẫn chạy tốt",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · CI pipeline"],
    ["Nguyên nhân", "Test được ghi bằng Codegen, commit thẳng locator page.getByText('Thêm vào giỏ') không sửa lại"],
    ["Sự kiện", "Đội marketing đổi nhãn nút thành 'Thêm giỏ hàng' cho ngắn gọn hơn"],
    ["Ảnh hưởng", "Test báo 'không tìm thấy phần tử' dù luồng thêm giỏ hàng trên thực tế vẫn hoạt động đúng"],
    ["Đề xuất", "Đổi sang getByTestId('add-to-cart') hoặc getByRole ổn định thay vì phụ thuộc câu chữ hiển thị"],
  ],
});

// ── Mockup 6: bảng kanban dọn dẹp các test được ghi bằng Codegen chưa qua chỉnh sửa ──
const m_kanban = kanban("Dọn dẹp các test ghi bằng Codegen chưa refactor (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14210", title: "test('test', ...) tên mặc định, chưa đặt lại tên rõ nghĩa", sev: "Low" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14201", title: "Đổi getByText sang getByTestId cho nút Thêm vào giỏ", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14198", title: "Xoá bước hover menu ngôn ngữ ghi thừa trong test đăng nhập", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14180", title: "Thêm expect() kiểm tra kết quả cho test ghi bằng Codegen", sev: "Medium" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Playwright Codegen là gì?",
  "What is Playwright Codegen?",
  "Playwright Codegen là công cụ đi kèm Playwright, mở một trình duyệt thật và một cửa sổ Inspector: khi bạn click, nhập liệu, chọn dropdown trên trình duyệt đó, Codegen tự động ghi lại từng thao tác và sinh ra code Playwright (JavaScript/TypeScript/Python...) tương ứng theo thời gian thực. Bạn chạy bằng lệnh `npx playwright codegen <url>`.",
  "Playwright Codegen is a tool bundled with Playwright that opens a real browser plus an Inspector window: as you click, type, or select dropdowns in that browser, Codegen records each action in real time and generates the corresponding Playwright code (JavaScript/TypeScript/Python...). You run it with `npx playwright codegen <url>`.",
  "Playwright Codegenとは何？",
  "Playwright Codegenは、Playwrightに付属するツールで、実際のブラウザとInspectorウィンドウを開きます。そのブラウザ内でクリック、入力、ドロップダウン選択を行うと、Codegenがリアルタイムで各操作を記録し、対応するPlaywrightコード（JavaScript/TypeScript/Pythonなど）を生成します。`npx playwright codegen <url>`で実行します。");
const faq2 = FAQ(
  "Code Codegen sinh ra có dùng được ngay, không cần sửa gì không?",
  "Can the code Codegen generates be used right away, without any edits?",
  "Về mặt kỹ thuật thì chạy được ngay, nhưng gần như luôn NÊN chỉnh sửa trước khi đưa vào bộ test chính thức: đặt lại tên test có ý nghĩa (thay vì 'test'), thêm câu expect() để kiểm tra kết quả (Codegen chỉ ghi hành động, không tự thêm assert), dọn các bước thừa lỡ ghi (hover nhầm, click nhầm), và xem lại locator có đủ ổn định hay không.",
  "Technically it runs right away, but you should almost always edit it before adding it to your real test suite: rename the test meaningfully (instead of 'test'), add expect() statements to verify results (Codegen only records actions, it never adds assertions on its own), remove accidentally recorded extra steps (a stray hover or click), and review whether the locators are stable enough.",
  "Codegenが生成したコードはそのまますぐ使え、修正は不要？",
  "技術的にはすぐ実行できますが、本番のテストスイートに入れる前にほぼ必ず編集すべきです：意味のあるテスト名に変更する（'test'のままにしない）、結果を検証するexpect()文を追加する（Codegenは操作を記録するだけでアサーションは自動追加しない）、誤って記録された余分なステップ（誤ホバーや誤クリック）を取り除く、ロケーターが十分安定しているか見直す。");
const faq3 = FAQ(
  "Nên dùng Codegen để ghi toàn bộ bộ test automation của dự án không?",
  "Should I use Codegen to record my entire project's automation suite?",
  "Không nên. Codegen rất mạnh để khởi động nhanh, khám phá cú pháp Playwright, hoặc lấy locator ban đầu cho một màn hình mới — nhưng nó ghi lại chính xác những gì bạn thao tác, không hiểu cấu trúc dự án hay tái sử dụng code. Với dự án có vài chục test trở lên, bạn nên dùng Codegen để LẤY Ý TƯỞNG code ban đầu, rồi refactor vào cấu trúc bền vững hơn (ví dụ Page Object Model) thay vì giữ nguyên từng file được ghi rời rạc.",
  "No. Codegen is great for a quick start, exploring Playwright syntax, or grabbing initial locators for a new screen — but it records exactly what you do, without understanding project structure or code reuse. For a project with a few dozen tests or more, use Codegen to get INITIAL code ideas, then refactor into a more sustainable structure (like the Page Object Model) instead of keeping each recorded file as-is.",
  "プロジェクトの自動化テスト全体をCodegenで記録すべき？",
  "いいえ。Codegenは素早く始める、Playwrightの構文を探る、新しい画面の初期ロケーターを取得するのには非常に強力ですが、プロジェクト構造やコードの再利用を理解せず、あなたの操作をそのまま記録するだけです。数十個以上のテストがあるプロジェクトでは、Codegenを初期コードのアイデア取得に使い、記録されたファイルをそのまま残すのではなく、Page Object Modelのようなより持続可能な構造にリファクタリングすべきです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích chính của lệnh `npx playwright codegen` là gì?", en: "What is the main purpose of the `npx playwright codegen` command?", ja: "`npx playwright codegen`コマンドの主な目的は何？" },
    options: [
      { vi: "Tự động ghi lại thao tác chuột/bàn phím trên trình duyệt và sinh ra code test Playwright tương ứng", en: "Automatically record mouse/keyboard actions in the browser and generate the corresponding Playwright test code", ja: "ブラウザ上のマウス・キーボード操作を自動記録し、対応するPlaywrightテストコードを生成すること" },
      { vi: "Tự động sửa lỗi trong bộ test có sẵn", en: "Automatically fix bugs in an existing test suite", ja: "既存のテストスイートのバグを自動的に修正すること" },
      { vi: "Chạy song song test trên nhiều trình duyệt cùng lúc", en: "Run tests in parallel across multiple browsers at once", ja: "複数のブラウザでテストを同時に並列実行すること" },
      { vi: "Tạo báo cáo HTML tổng hợp sau khi test chạy xong", en: "Generate an HTML summary report after tests finish running", ja: "テスト実行後にHTMLの要約レポートを生成すること" },
    ], correct: 0,
    explain: { vi: "Codegen mở trình duyệt thật, ghi lại mọi thao tác của bạn và sinh code Playwright tương ứng theo thời gian thực — đó là công dụng cốt lõi của nó.", en: "Codegen opens a real browser, records every action you take, and generates the corresponding Playwright code in real time — that's its core purpose.", ja: "Codegenは実際のブラウザを開き、あなたのすべての操作を記録して対応するPlaywrightコードをリアルタイムで生成します——これが核心的な用途です。" },
  }),
  mcq({
    q: { vi: "Ghi xong 1 luồng bằng Codegen, người mới NÊN làm gì trước khi coi test đã hoàn chỉnh?", en: "After recording a flow with Codegen, what SHOULD a beginner do before considering the test complete?", ja: "Codegenでフローを記録した後、初心者はテストを完成とみなす前に何をすべき？" },
    options: [
      { vi: "Không cần làm gì thêm, code Codegen sinh ra luôn hoàn chỉnh và đúng", en: "Nothing more is needed, the code Codegen generates is always complete and correct", ja: "何もする必要はない、Codegenが生成したコードは常に完璧で正しい" },
      { vi: "Đọc lại code, đặt tên test rõ nghĩa, thêm câu expect() kiểm tra kết quả, dọn các bước thừa", en: "Read through the code, give the test a meaningful name, add expect() statements to verify results, and remove extra steps", ja: "コードを読み直し、テストに意味のある名前を付け、結果を検証するexpect()文を追加し、余分なステップを取り除く" },
      { vi: "Xoá hết code sinh ra và viết lại hoàn toàn bằng tay từ đầu", en: "Delete all the generated code and rewrite everything by hand from scratch", ja: "生成されたコードをすべて削除し、最初から完全に手で書き直す" },
      { vi: "Chạy ngay code đó trên môi trường production của khách hàng", en: "Immediately run that code against the customer's production environment", ja: "そのコードを直ちに顧客の本番環境で実行する" },
    ], correct: 1,
    explain: { vi: "Codegen chỉ ghi hành động, không tự thêm assert hay đặt tên có ý nghĩa — người viết test cần đọc lại và bổ sung những phần này.", en: "Codegen only records actions; it never adds assertions or meaningful names on its own — the test author needs to review and add those.", ja: "Codegenは操作を記録するだけで、アサーションや意味のある名前を自動追加しません——テスト作成者がこれらを見直して追加する必要があります。" },
  }),
  mcq({
    q: { vi: "Vì sao locator dựa trên TEXT hiển thị (ví dụ getByText('Thêm vào giỏ')) thường giòn hơn locator theo role/label?", en: "Why is a locator based on displayed TEXT (e.g. getByText('Add to cart')) usually more brittle than a role/label locator?", ja: "表示テキストに基づくロケーター（例：getByText('カートに追加')）が、role/labelロケーターより脆い理由は？" },
    options: [
      { vi: "Vì câu chữ hiển thị dễ bị đổi (marketing đổi nhãn, dịch ngôn ngữ...) trong khi role/label thường ổn định hơn", en: "Because displayed text is easily changed (marketing rewording, translation...) while role/label usually stays more stable", ja: "表示テキストは（マーケティングによる文言変更、翻訳などで）変わりやすい一方、role/labelは通常より安定しているから" },
      { vi: "Vì getByText luôn chạy chậm hơn các locator khác", en: "Because getByText always runs slower than other locators", ja: "getByTextは常に他のロケーターより実行が遅いから" },
      { vi: "Vì Playwright không hỗ trợ chính thức getByText", en: "Because Playwright doesn't officially support getByText", ja: "PlaywrightはgetByTextを公式にサポートしていないから" },
      { vi: "Vì locator theo role luôn báo lỗi khi chạy trên CI", en: "Because role-based locators always fail when run on CI", ja: "roleベースのロケーターはCIで実行すると常に失敗するから" },
    ], correct: 0,
    explain: { vi: "Text hiển thị phục vụ nội dung/marketing nên hay đổi; role và nhãn form gắn với ý nghĩa chức năng nên ít đổi hơn, giúp test bền vững hơn.", en: "Displayed text serves content/marketing and changes often; roles and form labels are tied to functional meaning and change less, keeping tests more stable.", ja: "表示テキストはコンテンツ・マーケティングのためのものでよく変わります。roleやフォームのラベルは機能的な意味に結びついており変わりにくく、テストがより安定します。" },
  }),
  mcq({
    q: { vi: "Khi ghi bằng Codegen mà lỡ hover/click nhầm vào phần tử không liên quan, dòng code thừa đó nên xử lý ra sao trước khi lưu bài test?", en: "If you accidentally hover/click an unrelated element while recording with Codegen, how should that extra code be handled before saving the test?", ja: "Codegenで記録中に無関係な要素を誤ってホバー・クリックしてしまった場合、その余分なコードはテストを保存する前にどうすべき？" },
    options: [
      { vi: "Giữ nguyên, vì mọi thứ Codegen ghi lại đều cần thiết", en: "Keep it as-is, since everything Codegen records is necessary", ja: "そのまま残す、Codegenが記録したものはすべて必要だから" },
      { vi: "Đọc lại code sinh ra và xoá/dọn các bước không phục vụ mục tiêu của bài test", en: "Read through the generated code and remove/clean up steps that don't serve the test's goal", ja: "生成されたコードを読み直し、テストの目的に貢献しないステップを削除・整理する" },
      { vi: "Chạy lại bước thừa đó nhiều lần để chắc chắn nó không lỗi", en: "Re-run that extra step many times to make sure it doesn't fail", ja: "そのステップが失敗しないよう何度も再実行する" },
      { vi: "Biến dòng đó thành comment nhưng vẫn để Playwright thực thi", en: "Turn that line into a comment but still let Playwright execute it", ja: "その行をコメントに変えつつPlaywrightに実行させ続ける" },
    ], correct: 1,
    explain: { vi: "Bước thừa làm test dài hơn, khó đọc và có thể gây flaky (ví dụ hover vào menu load chậm) — nên dọn sạch, chỉ giữ đúng luồng cần kiểm tra.", en: "Extra steps make a test longer, harder to read, and can cause flakiness (e.g. hovering a slow-loading menu) — clean them up and keep only the intended flow.", ja: "余分なステップはテストを長く読みにくくし、flakyの原因にもなり得ます（読み込みの遅いメニューへのホバーなど）——きれいに取り除き、意図したフローだけを残しましょう。" },
  }),
  mcq({
    q: { vi: "Giới hạn lớn nhất của việc CHỈ dùng test do Codegen ghi, không refactor gì, khi dự án automation lớn dần là gì?", en: "What is the biggest limitation of using ONLY Codegen-recorded tests, without any refactoring, as an automation project grows?", ja: "自動化プロジェクトが大きくなるにつれ、リファクタリングを一切せずCodegenで記録したテストだけを使うことの最大の限界は？" },
    options: [
      { vi: "Không có giới hạn nào, Codegen luôn đủ dùng cho mọi quy mô dự án", en: "There's no limitation at all, Codegen is always enough for any project size", ja: "限界は一切ない、Codegenはどんな規模のプロジェクトにも常に十分" },
      { vi: "Locator và hành động bị lặp lại rải rác trong nhiều file được ghi riêng lẻ, khó bảo trì khi giao diện đổi — cần refactor sang cấu trúc bền vững hơn như Page Object Model", en: "Locators and actions end up duplicated across many separately recorded files, hard to maintain when the UI changes — needing a refactor into a more sustainable structure like the Page Object Model", ja: "ロケーターと操作が個別に記録された多数のファイルに重複し、UIが変わると保守が困難になる——Page Object Modelのようなより持続可能な構造へのリファクタリングが必要" },
      { vi: "Codegen sẽ tự động refactor toàn bộ code giúp bạn theo thời gian", en: "Codegen will automatically refactor all your code for you over time", ja: "Codegenが時間とともにコードを自動的にリファクタリングしてくれる" },
      { vi: "Test ghi bằng Codegen luôn chạy chậm hơn nhiều lần so với viết tay hoàn toàn", en: "Codegen-recorded tests always run many times slower than fully hand-written ones", ja: "Codegenで記録したテストは完全手書きのテストより常にはるかに遅く動く" },
    ], correct: 1,
    explain: { vi: "Mỗi lần ghi bằng Codegen tạo ra 1 file độc lập, không tự chia sẻ locator hay hàm dùng chung — dự án lớn dần sẽ cần refactor để tránh trùng lặp và dễ bảo trì.", en: "Each Codegen recording creates an independent file that doesn't automatically share locators or common functions — a growing project needs refactoring to avoid duplication and stay maintainable.", ja: "Codegenで記録するたびに独立したファイルが作られ、ロケーターや共通関数が自動的に共有されるわけではありません——プロジェクトが成長するにつれ、重複を避け保守しやすくするためのリファクタリングが必要です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ ghi", en: "1. TL;DR & the screen you'll record", ja: "1. 要点と記録する画面" },
    blocks: [
      TLDR("Playwright Codegen (`npx playwright codegen`) mở một trình duyệt thật cùng cửa sổ Inspector: bạn click, nhập liệu trên trang, Codegen tự động ghi lại và sinh ra code test Playwright tương ứng — không cần gõ tay locator ngay từ đầu. Bài này bám màn đăng nhập của app TMĐT ShopEasy: bạn học cách chạy Codegen, đọc code sinh ra, chỉnh sửa cho gọn và đúng, chọn locator ổn định, và nhận ra giới hạn của test ghi tự động khi nào cần refactor. Trong thời đại AI có thể gợi ý code nhanh, Playwright Codegen vẫn là cách thực chiến nhất để người mới nhìn thấy code Playwright thật ngay từ thao tác chuột đầu tiên — kỹ năng này được dạy bài bản tại khóa Software Testing chuyên nghiệp của CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ . Nhiều hình minh hoạ, code chạy được và trắc nghiệm cuối bài.",
        "Playwright Codegen (`npx playwright codegen`) opens a real browser plus an Inspector window: as you click and type on the page, Codegen automatically records it and generates the corresponding Playwright test code — no need to hand-type locators from scratch. This follows ShopEasy's login screen: you'll learn to run Codegen, read the generated code, edit it to be clean and correct, choose stable locators, and recognize when recorded tests hit their limits and need refactoring. In an era where AI can quickly suggest code, Playwright Codegen remains the most hands-on way for beginners to see real Playwright code from their very first click — a skill taught properly in CyberSoft's Professional Software Testing course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ . Lots of visuals, runnable code, and a quiz at the end.",
        "Playwright Codegen（`npx playwright codegen`）は、実際のブラウザとInspectorウィンドウを開きます。ページ上でクリックや入力を行うと、Codegenが自動的に記録し、対応するPlaywrightテストコードを生成します——最初からロケーターを手打ちする必要はありません。本記事はECアプリShopEasyのログイン画面に沿い、Codegenの実行方法、生成コードの読み方、きれいで正しいコードへの修正方法、安定したロケーターの選び方、そして記録されたテストの限界とリファクタリングが必要になるタイミングを学びます。AIが素早くコードを提案できる時代でも、Playwright Codegenは初心者が最初のクリックから本物のPlaywrightコードを目にする最も実践的な方法であり続けます——このスキルはCyberSoftのソフトウェアテスト専門コースで体系的に学べます：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ 。図、動くコード、最後にクイズ付き。"),
      P("Chào bạn mới! Nếu bạn vừa học automation và cảm thấy hơi choáng vì phải tự nhớ cú pháp Playwright, hoặc tự tìm locator bằng cách bấm F12 rồi dò từng thẻ HTML — Playwright Codegen sinh ra để giải quyết đúng nỗi lo đó. Chạy `npx playwright codegen` cùng địa chỉ trang cần test, một trình duyệt thật sẽ mở lên, kèm một cửa sổ nhỏ gọi là Inspector. Bạn cứ thao tác bình thường như người dùng thật: click ô Email, gõ chữ, bấm nút Đăng nhập — Codegen lặng lẽ ghi lại từng bước và hiện code Playwright tương ứng ngay trong cửa sổ Inspector, theo thời gian thực. Chúng ta sẽ thực hành trên đúng màn đăng nhập thật của ShopEasy, có hình minh hoạ và code chạy được.",
        "Hi, newcomer! If you've just started learning automation and feel a bit overwhelmed having to memorize Playwright syntax, or hunting for locators by pressing F12 and digging through HTML tags — Playwright Codegen exists to solve exactly that worry. Run `npx playwright codegen` with the URL you want to test, and a real browser opens up alongside a small window called the Inspector. You just interact normally like a real user: click the Email field, type, click the Login button — Codegen quietly records each step and shows the corresponding Playwright code right in the Inspector window, in real time. We'll practice on ShopEasy's real login screen, with visuals and runnable code.",
        "こんにちは、初心者さん！自動化を学び始めたばかりで、Playwrightの構文を覚えたり、F12を押してHTMLタグを一つずつ探してロケーターを見つけたりすることに少し圧倒されているなら——Playwright Codegenはまさにその悩みを解決するために存在します。テストしたいURLと共に`npx playwright codegen`を実行すると、実際のブラウザが開き、Inspectorと呼ばれる小さなウィンドウも一緒に開きます。あとは実際のユーザーのように普通に操作するだけです：メール欄をクリックし、入力し、ログインボタンをクリックする——Codegenは各ステップを静かに記録し、対応するPlaywrightコードをInspectorウィンドウにリアルタイムで表示します。ShopEasyの実際のログイン画面で実習し、図と動くコード付きで学びます。"),
      IMG(m_recorder, "Playwright Inspector đang ghi thao tác trên màn đăng nhập ShopEasy, chú thích code sinh theo từng bước", "Playwright Inspector recording actions on ShopEasy's login screen, annotated with the code generated at each step", "ShopEasyのログイン画面での操作を記録するPlaywright Inspector、各ステップで生成されるコードを注記"),
      DEF("Playwright Codegen", "công cụ ghi lại thao tác chuột/bàn phím trên trình duyệt thật và tự động sinh ra code test Playwright tương ứng, chạy bằng lệnh npx playwright codegen.",
        "a tool that records mouse/keyboard actions in a real browser and automatically generates the corresponding Playwright test code, run via the npx playwright codegen command.",
        "実際のブラウザでのマウス・キーボード操作を記録し、対応するPlaywrightテストコードを自動生成するツール。npx playwright codegenコマンドで実行する。"),
    ] },
  { heading: { vi: "2. Vấn đề: viết locator tay chậm và dễ nản với người mới", en: "2. The problem: hand-writing locators is slow and discouraging for beginners", ja: "2. 問題：初心者にとってロケーターを手書きするのは遅く挫折しやすい" },
    blocks: [
      P("Trước khi có Codegen, cách phổ biến để viết 1 test là: mở DevTools (F12), tự tìm phần tử trên cây HTML, đọc id/class, rồi gõ tay dòng code như page.locator('#email-input').fill(...). Với người mới, bước 'tự tìm và đoán locator đúng' này tốn khá nhiều thời gian và dễ chọn nhầm — ví dụ chọn 1 class CSS chỉ dùng để canh giao diện, không hề ổn định để làm locator.",
        "Before Codegen, the common way to write a test was: open DevTools (F12), manually find the element in the HTML tree, read its id/class, then hand-type a line like page.locator('#email-input').fill(...). For beginners, this 'manually find and guess the right locator' step takes considerable time and is easy to get wrong — for example picking a CSS class only meant for layout, which is far from a stable locator.",
        "Codegenが登場する前、テストを書く一般的な方法は：DevTools（F12）を開き、HTMLツリーで手動で要素を探し、idやclassを読み取り、page.locator('#email-input').fill(...)のような行を手打ちする、というものでした。初心者にとって、この『手動で探して正しいロケーターを推測する』ステップはかなり時間がかかり、間違えやすいです——例えばレイアウト調整専用のCSSクラスを選んでしまい、ロケーターとして全く安定しないケースなど。"),
      P("Ngoài ra, người mới thường chưa quen cú pháp Playwright: nên dùng fill() hay type()? click() có cần await không? getByRole() viết thế nào cho đúng? Khi vừa phải nhớ cú pháp vừa phải tự dò locator, tốc độ học rất chậm, và dễ nản vì test đầu tiên có khi mất cả buổi mới chạy được.",
        "In addition, beginners often aren't yet familiar with Playwright syntax: should you use fill() or type()? Does click() need an await? How do you write getByRole() correctly? Having to memorize syntax while also hunting for locators makes learning slow, and it's easy to get discouraged when your very first test takes an entire session just to run.",
        "さらに、初心者はPlaywrightの構文にまだ慣れていないことが多いです：fill()とtype()どちらを使うべき？click()にawaitは必要？getByRole()はどう正しく書く？構文を覚えながらロケーターを探さなければならないと学習速度は非常に遅く、最初のテストを動かすだけで丸一日かかることもあり、挫折しやすくなります。"),
      DEF("Locator giòn (brittle locator)", "cách tìm phần tử dễ bị 'vỡ' (không tìm thấy nữa) chỉ vì một thay đổi nhỏ và không liên quan tới chức năng, ví dụ đổi câu chữ hiển thị hay lớp CSS canh giao diện.",
        "a way to find an element that easily 'breaks' (stops matching) from a small, functionally unrelated change, such as rewording displayed text or a layout-only CSS class.",
        "表示テキストの言い換えやレイアウト専用のCSSクラスなど、機能とは無関係な小さな変更だけで簡単に『壊れる』（見つからなくなる）要素の探し方。"),
      P("Codegen không xoá bỏ hoàn toàn nỗi lo này, nhưng giải quyết phần 'điểm khởi đầu': bạn không cần tự gõ locator hay nhớ hết cú pháp ngay từ đầu — chỉ cần thao tác như người dùng thật, rồi đọc code Codegen sinh ra để học dần. Đây là lý do Codegen rất hợp với người mới trong vài tuần đầu học automation.",
        "Codegen doesn't eliminate this worry entirely, but it solves the 'starting point' part: you don't need to type locators yourself or memorize every syntax detail from day one — you just act like a real user, then read the code Codegen generates to learn gradually. This is why Codegen fits beginners so well in their first few weeks learning automation.",
        "Codegenはこの悩みを完全になくすわけではありませんが、『出発点』の部分を解決します：最初からロケーターを自分で打ったりすべての構文を覚えたりする必要はなく、実際のユーザーのように操作するだけで、Codegenが生成したコードを読みながら少しずつ学べます。これが、自動化を学び始めた最初の数週間、Codegenが初心者にとても合う理由です。"),
    ] },
  { heading: { vi: "3. Cài đặt & chạy Codegen lần đầu", en: "3. Installing & running Codegen for the first time", ja: "3. インストールと初めてのCodegen実行" },
    blocks: [
      P("Codegen đã có sẵn khi bạn cài Playwright, không cần cài thêm gì khác. Chỉ cần một lệnh trong terminal, kèm địa chỉ trang muốn ghi, là trình duyệt và Inspector sẽ tự mở lên.",
        "Codegen comes bundled once you install Playwright — nothing extra to install. Just one command in the terminal, with the URL you want to record, and the browser plus Inspector will open automatically.",
        "Codegenは、Playwrightをインストールすれば追加インストールなしで最初から使えます。ターミナルで記録したいURLと共に1つのコマンドを実行するだけで、ブラウザとInspectorが自動的に開きます。"),
      STEP(1, "Cài Playwright cho dự án nếu chưa có: npm init playwright@latest.", "Install Playwright for the project if you haven't: npm init playwright@latest.", "まだの場合、プロジェクトにPlaywrightをインストールする：npm init playwright@latest。"),
      STEP(2, "Mở terminal tại thư mục dự án, chạy npx playwright codegen kèm địa chỉ trang cần ghi.", "Open a terminal in the project folder, and run npx playwright codegen followed by the URL to record.", "プロジェクトフォルダでターミナルを開き、記録したいURLを付けてnpx playwright codegenを実行する。"),
      STEP(3, "Một trình duyệt thật mở lên tại đúng trang, kèm cửa sổ Inspector hiển thị code trống ban đầu.", "A real browser opens right at that page, alongside an Inspector window showing empty code initially.", "実際のブラウザがそのページで開き、最初は空のコードを表示するInspectorウィンドウも一緒に開く。"),
      STEP(4, "Thao tác bình thường trên trình duyệt (click, gõ chữ...); quan sát code trong Inspector tự cập nhật theo từng bước.", "Interact normally on the browser (click, type...); watch the code in the Inspector update itself with each step.", "ブラウザ上で普通に操作する（クリック、入力など）；Inspector内のコードが各ステップごとに自動更新されるのを観察する。"),
      CODE("bash", "# Cai Playwright cho du an (neu chua co)\nnpm init playwright@latest\n\n# Chay Codegen tren man dang nhap ShopEasy\nnpx playwright codegen https://shopeasy.vn/dang-nhap"),
      TIP("Cửa sổ Inspector còn có nút 'Record' để tạm dừng/tiếp tục ghi, và ô chọn ngôn ngữ xuất code (JavaScript, TypeScript, Python, Java, .NET) — chọn đúng ngôn ngữ dự án bạn đang dùng trước khi copy code ra.", "The Inspector window also has a 'Record' toggle to pause/resume recording, and a dropdown to choose the output language (JavaScript, TypeScript, Python, Java, .NET) — pick the language matching your project before copying the code out.", "Inspectorウィンドウには記録を一時停止・再開する『Record』ボタンと、出力言語（JavaScript、TypeScript、Python、Java、.NET）を選ぶドロップダウンもあります——コードをコピーする前に、使用中のプロジェクトに合った言語を選びましょう。"),
    ] },
  { heading: { vi: "4. Ghi luồng đăng nhập ShopEasy bằng Codegen (thực hành)", en: "4. Recording ShopEasy's login flow with Codegen (hands-on)", ja: "4. CodegenでShopEasyのログインフローを記録する（実習）" },
    blocks: [
      P("Giờ ta ghi lại luồng đăng nhập thật của ShopEasy. Làm theo thứ tự dưới đây, quan sát Inspector sinh code ngay khi bạn thao tác.",
        "Now let's record ShopEasy's real login flow. Follow the order below, and watch the Inspector generate code right as you interact.",
        "では、ShopEasyの実際のログインフローを記録しましょう。以下の順に沿って進め、操作した瞬間にInspectorがコードを生成するのを観察してください。"),
      STEP(1, "Chạy npx playwright codegen https://shopeasy.vn/dang-nhap, chờ trình duyệt và Inspector mở lên.", "Run npx playwright codegen https://shopeasy.vn/dang-nhap, and wait for the browser and Inspector to open.", "npx playwright codegen https://shopeasy.vn/dang-nhapを実行し、ブラウザとInspectorが開くのを待つ。"),
      STEP(2, "Click vào ô Email, gõ mai.tran@gmail.com — quan sát dòng getByLabel('Email').fill(...) xuất hiện.", "Click the Email field, type mai.tran@gmail.com — watch the getByLabel('Email').fill(...) line appear.", "メール欄をクリックし、mai.tran@gmail.comと入力する——getByLabel('Email').fill(...)の行が現れるのを観察する。"),
      STEP(3, "Click ô Mật khẩu, gõ mật khẩu, rồi bấm nút Đăng nhập — Inspector tiếp tục sinh thêm 2-3 dòng code.", "Click the Password field, type the password, then click the Login button — the Inspector generates 2-3 more lines of code.", "パスワード欄をクリックし、パスワードを入力し、ログインボタンをクリックする——Inspectorがさらに2〜3行のコードを生成する。"),
      STEP(4, "Bấm nút 'Copy' trong Inspector để sao chép toàn bộ code sinh ra, dán vào file test tạm để đọc kỹ ở chương sau.", "Click the 'Copy' button in the Inspector to copy all the generated code, and paste it into a temporary test file to review closely in the next chapter.", "Inspectorの『Copy』ボタンをクリックして生成されたコード全体をコピーし、次の章でじっくり読むために一時テストファイルに貼り付ける。"),
      TRY("Tự chạy npx playwright codegen với chính trang đăng nhập ShopEasy (hoặc trang đăng nhập của bất kỳ web nào bạn hay dùng), thử đăng nhập sai mật khẩu 1 lần rồi đúng 1 lần, xem code sinh ra khác nhau thế nào.", "Run npx playwright codegen yourself against ShopEasy's login page (or any login page you commonly use), try logging in with a wrong password once and a correct one once, and see how the generated code differs.", "自分でShopEasyのログインページ（またはよく使う任意のログインページ）に対してnpx playwright codegenを実行し、間違ったパスワードで一度、正しいパスワードで一度ログインを試し、生成されるコードがどう違うか見てみよう。"),
    ] },
  { heading: { vi: "5. Đọc hiểu code Codegen sinh ra (thực hành)", en: "5. Reading and understanding the code Codegen generates (hands-on)", ja: "5. Codegenが生成したコードを読み解く（実習）" },
    blocks: [
      P("Đây là code Codegen sinh ra thật khi ghi luồng đăng nhập ở chương trước — kể cả một bước thừa vì lỡ tay hover qua menu chọn ngôn ngữ trước khi vào đúng luồng. Hãy đọc kỹ từng dòng trước khi chỉnh sửa ở chương sau.",
        "Here's the actual code Codegen generated while recording the login flow from the previous chapter — including one extra step from accidentally hovering over the language menu before getting into the actual flow. Read each line carefully before editing it in the next chapter.",
        "これは前章でログインフローを記録した際にCodegenが実際に生成したコードです——本来のフローに入る前に誤って言語メニューにホバーしてしまった余分なステップも含みます。次章で編集する前に、各行をよく読んでください。"),
      CODE("javascript", "import { test, expect } from '@playwright/test';\n\ntest('test', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/dang-nhap');\n  await page.getByRole('link', { name: 'Tieng Viet' }).hover();\n  await page.getByLabel('Email').click();\n  await page.getByLabel('Email').fill('mai.tran@gmail.com');\n  await page.getByLabel('Mat khau').click();\n  await page.getByLabel('Mat khau').fill('Mai@2024');\n  await page.getByRole('button', { name: 'Dang nhap' }).click();\n});"),
      P("Vài điểm đáng chú ý: (1) tên test mặc định là 'test' — không nói lên nội dung gì; (2) dòng hover vào menu 'Tiếng Việt' không liên quan tới việc đăng nhập, chỉ vì trong lúc ghi bạn lỡ rê chuột qua đó; (3) Codegen tự thêm cả bước click() trước fill() — vì đó đúng là 2 hành động thật bạn đã làm (click để focus ô, rồi mới gõ); (4) không có bất kỳ dòng expect() nào — Codegen chỉ ghi hành động, hoàn toàn không tự đoán bạn muốn kiểm tra điều gì.",
        "A few things worth noting: (1) the default test name is 'test' — it says nothing about the content; (2) the hover on the 'Tiếng Việt' menu line is unrelated to logging in, just from accidentally moving the mouse over it while recording; (3) Codegen adds a click() before fill() — because that's exactly the two real actions you did (clicking to focus the field, then typing); (4) there isn't a single expect() line — Codegen only records actions, and never guesses what you meant to verify.",
        "いくつか注目すべき点：（1）デフォルトのテスト名は'test'——内容を何も表していない；（2）『Tiếng Việt』メニューへのホバー行はログインとは無関係で、記録中に誤ってマウスをそこに動かしただけ；（3）Codegenはfill()の前にclick()も追加している——これはあなたが実際に行った2つの動作（欄にフォーカスするためクリックし、それから入力する）そのものだから；（4）expect()の行が1つもない——Codegenは操作を記録するだけで、あなたが何を検証したいのか一切推測しない。"),
      DEF("Assertion (expect)", "câu lệnh kiểm tra kết quả có đúng như mong đợi hay không (ví dụ expect(page).toHaveURL(...)); Codegen không tự sinh ra câu này, người viết test phải tự thêm.",
        "a statement that checks whether a result matches expectations (e.g. expect(page).toHaveURL(...)); Codegen never generates this on its own, so the test author must add it manually.",
        "結果が期待通りか検証する文（例：expect(page).toHaveURL(...)）；Codegenはこれを自動生成しないため、テスト作成者が自分で追加する必要がある。"),
    ] },
  { heading: { vi: "6. Chỉnh sửa code sinh ra: đặt tên, thêm assert, dọn dẹp", en: "6. Editing the generated code: naming, adding assertions, cleaning up", ja: "6. 生成されたコードの編集：命名、アサーション追加、整理" },
    blocks: [
      P("Có code thô rồi, giờ ta biến nó thành 1 test thật sự đáng tin: đặt tên rõ nghĩa, xoá bước thừa, và quan trọng nhất — thêm câu kiểm tra kết quả. Nếu muốn được kèm 1-1 để luyện đọc và chỉnh sửa code Codegen sinh ra tới khi thành thạo, CyberSoft có chương trình học 1-1 tại " + COURSE_1V1_URL + " , phù hợp cho người mới muốn tiến nhanh.",
        "With the raw code ready, let's turn it into a genuinely trustworthy test: give it a meaningful name, remove extra steps, and most importantly — add a result check. If you want 1-on-1 mentoring to practice reading and editing Codegen's generated code until you're proficient, CyberSoft has a 1-on-1 program at " + COURSE_1V1_URL + " , suited for beginners who want to progress quickly.",
        "生の生成コードができたので、本当に信頼できるテストに変えましょう：意味のある名前を付け、余分なステップを取り除き、そして最も重要な——結果を確認する文を追加する。Codegenが生成したコードの読み方・編集の仕方を習熟するまで1対1で指導してほしいなら、CyberSoftには" + COURSE_1V1_URL + " の1対1プログラムがあり、早く上達したい初心者に適しています。"),
      STEP(1, "Đổi tên test('test', ...) thành tên mô tả đúng nội dung, ví dụ 'dang nhap thanh cong voi tai khoan hop le'.", "Rename test('test', ...) to a name that describes the content, e.g. 'login succeeds with a valid account'.", "test('test', ...)を内容を説明する名前、例えば『有効なアカウントでログイン成功』に変更する。"),
      STEP(2, "Xoá dòng hover() vào menu ngôn ngữ — không phục vụ mục tiêu kiểm tra đăng nhập.", "Delete the hover() line on the language menu — it doesn't serve the login test's goal.", "言語メニューのhover()行を削除する——ログインテストの目的に貢献しないため。"),
      STEP(3, "Thêm câu expect() sau bước click Đăng nhập để xác nhận đăng nhập thành công, ví dụ kiểm tra URL chuyển sang trang tài khoản.", "Add an expect() line after the login click to verify a successful login, e.g. checking the URL redirects to the account page.", "ログインクリックの後にexpect()文を追加し、ログイン成功を検証する。例：URLがアカウントページにリダイレクトされることを確認。"),
      CODE("javascript", "import { test, expect } from '@playwright/test';\n\ntest('dang nhap thanh cong voi tai khoan hop le', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/dang-nhap');\n  await page.getByLabel('Email').fill('mai.tran@gmail.com');\n  await page.getByLabel('Mat khau').fill('Mai@2024');\n  await page.getByRole('button', { name: 'Dang nhap' }).click();\n\n  await expect(page).toHaveURL(/.*\\/tai-khoan/);\n});"),
      IMG(m_rawvsclean, "Bảng so sánh code Codegen sinh thô và code sau khi người mới chỉnh sửa", "A comparison of the raw Codegen code versus the code after a beginner edits it", "Codegenが生成した生のコードと、初心者が編集した後のコードの比較表"),
      TIP("Không cần giữ đúng dòng click() rồi mới fill() nếu 2 bước liên tiếp cùng thao tác lên cùng 1 ô — fill() của Playwright đã tự bao gồm việc focus vào ô đó, có thể gộp lại cho gọn.", "You don't have to keep a separate click() before fill() if both consecutive actions target the same field — Playwright's fill() already focuses the element, so you can merge them for brevity.", "連続する2つの操作が同じ欄に対するものなら、fill()の前に別途click()を残す必要はありません——Playwrightのfill()はすでにその要素にフォーカスするので、簡潔にまとめられます。"),
    ] },
  { heading: { vi: "7. Chọn locator tốt trong nhiều lựa chọn Codegen đưa ra", en: "7. Choosing a good locator among the options Codegen offers", ja: "7. Codegenが提示する複数の選択肢から良いロケーターを選ぶ" },
    blocks: [
      P("Khi bạn click vào cùng 1 phần tử, đôi khi Codegen có thể sinh ra các kiểu locator khác nhau tuỳ vào cấu trúc HTML của trang. Hiểu được locator nào ổn định hơn giúp bạn tự tin sửa lại nếu thấy Codegen chọn chưa tối ưu — thay vì giữ nguyên mọi thứ vì 'công cụ tự sinh ra chắc đúng'.",
        "When you click the same element, Codegen can sometimes generate different kinds of locators depending on the page's HTML structure. Understanding which locator is more stable helps you confidently fix it if Codegen's pick isn't optimal — instead of keeping everything as-is just because 'the tool auto-generated it, so it must be right'.",
        "同じ要素をクリックしても、ページのHTML構造によってCodegenが異なる種類のロケーターを生成することがあります。どのロケーターがより安定しているかを理解しておけば、Codegenの選択が最適でない場合に、『ツールが自動生成したから正しいはず』と鵜呑みにせず、自信を持って修正できます。"),
      IMG(m_locatorpick, "Bảng so sánh các kiểu locator Codegen có thể sinh ra khi bạn click vào 1 phần tử, và độ ổn định của từng kiểu", "A comparison of the locator types Codegen may generate when you click an element, and how stable each type is", "要素をクリックした際にCodegenが生成しうるロケーターの種類と、それぞれの安定性の比較表"),
      P("Nguyên tắc chung: ưu tiên locator theo role + tên hiển thị (getByRole) hoặc theo nhãn form (getByLabel), vì chúng gắn với ý nghĩa chức năng của phần tử — nút vẫn là nút, ô nhập vẫn là ô nhập, dù đội thiết kế đổi màu sắc hay bố cục. Chỉ dùng locator theo text hiển thị (getByText) khi phần chữ đó gần như chắc chắn không đổi (ví dụ thông báo lỗi cố định). Với những phần tử quan trọng hay bị đổi câu chữ (như nút quảng cáo, nhãn khuyến mãi), đề nghị đội frontend gắn thêm data-testid để có locator ổn định tuyệt đối.",
        "General rule: prefer role + accessible name locators (getByRole) or form label locators (getByLabel), since they're tied to the element's functional meaning — a button stays a button, a field stays a field, even if the design team changes colors or layout. Only use displayed-text locators (getByText) when that text is almost certainly stable (e.g. a fixed error message). For important elements prone to text changes (like promo buttons, sale labels), ask the frontend team to add a data-testid for an absolutely stable locator.",
        "一般原則：role＋アクセシブルネームのロケーター（getByRole）またはフォームラベルのロケーター（getByLabel）を優先しましょう。これらは要素の機能的な意味に結びついているため、デザインチームが色やレイアウトを変えても、ボタンはボタンのまま、欄は欄のままです。表示テキストのロケーター（getByText）は、そのテキストがほぼ確実に変わらない場合（固定のエラーメッセージなど）にのみ使いましょう。文言が変わりやすい重要な要素（プロモボタン、セールラベルなど）には、フロントエンドチームにdata-testidの追加を依頼し、絶対的に安定したロケーターを確保します。"),
      TIP("Codegen cho phép bạn hover chuột lên 1 phần tử trong Inspector để xem locator đang được highlight trên trang — dùng cách này để kiểm tra locator có trỏ đúng phần tử duy nhất bạn muốn hay không trước khi lưu code.", "Codegen lets you hover over an element in the Inspector to see the locator highlighted on the page — use this to verify the locator points to exactly the single element you want before saving the code.", "CodegenではInspector内の要素にマウスをホバーすると、ページ上でロケーターがハイライトされます——コードを保存する前に、ロケーターが本当に欲しい唯一の要素を指しているか、この方法で確認しましょう。"),
    ] },
  { heading: { vi: "8. Tình huống 1: dùng thẳng code Codegen với selector giòn, test vỡ khi đổi nhãn nút", en: "8. Situation 1: using raw Codegen code with a brittle selector, breaking when the label changes", ja: "8. シーン1：脆いセレクターを持つCodegenの生コードをそのまま使い、ラベル変更でテストが壊れる" },
    blocks: [
      SITUATION("Một bạn mới ghi test cho nút 'Thêm vào giỏ' trên trang sản phẩm ShopEasy bằng Codegen. Code sinh ra dùng page.getByText('Thêm vào giỏ').click() — vì trang chưa gắn data-testid, và Codegen chọn text hiển thị làm locator. Bạn commit thẳng code này vào bộ test mà không xem lại.", "A beginner records a test for the 'Add to cart' button on ShopEasy's product page using Codegen. The generated code uses page.getByText('Add to cart').click() — since the page doesn't have a data-testid yet, Codegen picks the displayed text as the locator. The beginner commits this code straight into the test suite without reviewing it.",
        "Vài tuần sau, đội marketing đổi nhãn nút thành 'Thêm giỏ hàng' cho gọn và nhất quán với các trang khác. Ngay lập tức test báo lỗi 'không tìm thấy phần tử', dù chức năng thêm sản phẩm vào giỏ trên thực tế vẫn hoạt động hoàn toàn bình thường — chỉ có câu chữ trên nút đổi.", "A few weeks later, the marketing team renames the button to 'Add to bag' for brevity and consistency with other pages. The test immediately fails with 'element not found', even though the add-to-cart feature itself still works perfectly fine — only the button's wording changed.",
        "初心者がShopEasyの商品ページの『カートに追加』ボタン用のテストをCodegenで記録する。ページにまだdata-testidがないため、Codegenは表示テキストをロケーターとして選び、生成されたコードはpage.getByText('カートに追加').click()を使う。初心者はこのコードを見直さずにそのままテストスイートにコミットする。",
        "数週間後、マーケティングチームが他のページとの一貫性と簡潔さのため、ボタンを『カートへ』に変更する。実際にはカートに追加する機能自体は完全に正常に動いているにもかかわらず、テストは即座に『要素が見つからない』というエラーで失敗する——ボタンの文言だけが変わったのだ。"),
      SOLVE("Đổi locator từ getByText(text hiển thị) sang locator ổn định hơn: nếu trang có gắn data-testid thì dùng getByTestId('add-to-cart'); nếu chưa có, đề nghị đội frontend thêm vào, hoặc tạm dùng getByRole('button', { name: /thêm.*giỏ/i }) với regex linh hoạt hơn thay vì so khớp chính xác từng chữ.", "Change the locator from getByText(displayed text) to something more stable: if the page has a data-testid, use getByTestId('add-to-cart'); if not, ask the frontend team to add one, or temporarily use getByRole('button', { name: /add.*cart/i }) with a more flexible regex instead of matching the exact wording.", "ロケーターを表示テキストによるgetByTextから、より安定したものに変更する：ページにdata-testidがあればgetByTestId('add-to-cart')を使う；なければフロントエンドチームに追加を依頼するか、正確な文言一致ではなくgetByRole('button', { name: /カート.*追加/i })のような柔軟な正規表現を暫定的に使う。"),
      P("Bài học: code Codegen sinh ra hoàn toàn ĐÚNG tại thời điểm ghi — nó chạy được ngay. Nhưng 'chạy được' không đồng nghĩa với 'bền vững'. Đây chính xác là điều người mới cần luyện: nhìn locator Codegen chọn, tự hỏi 'phần này có khả năng đổi trong tương lai gần không?', rồi quyết định giữ nguyên hay thay bằng lựa chọn ổn định hơn trước khi lưu vào bộ test chính thức.",
        "The lesson: the code Codegen generates is entirely CORRECT at the moment of recording — it runs right away. But 'runs' doesn't mean 'sustainable'. This is exactly what beginners need to practice: looking at the locator Codegen picked, asking yourself 'is this likely to change in the near future?', then deciding whether to keep it or swap it for something more stable before saving it into the real test suite.",
        "教訓：Codegenが生成するコードは記録した瞬間には完全に正しく、すぐに実行できます。しかし『実行できる』ことは『持続可能』であることを意味しません。これはまさに初心者が練習すべきことです：Codegenが選んだロケーターを見て、『これは近い将来変わる可能性があるか？』と自問し、本番のテストスイートに保存する前に、そのまま使うかより安定したものに置き換えるかを判断する。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố test 'Thêm vào giỏ' vỡ vì locator theo text hiển thị bị đổi", "A bug ticket recording the incident where the 'Add to cart' test broke due to a changed text-based locator", "テキストベースのロケーターが変更されたことで『カートに追加』テストが壊れたインシデントを記録したバグチケット"),
      RECAP(["Code Codegen sinh ra ĐÚNG lúc ghi, không có nghĩa là BỀN VỮNG lâu dài", "Locator theo text hiển thị nên được xem lại, đổi sang role/label/test id nếu có thể"],
        ["Code Codegen generates is CORRECT at recording time, which doesn't mean it's sustainable long-term", "Displayed-text locators should be reviewed and swapped for role/label/test id when possible"],
        ["Codegenが生成するコードは記録時には正しいが、それは長期的に持続可能であることを意味しない", "表示テキストのロケーターは見直し、可能ならrole/label/test idに置き換えるべき"]),
    ] },
  { heading: { vi: "9. Tình huống 2: ghi lại cả bước thừa, khiến test dài và dễ flaky", en: "9. Situation 2: recording extra steps, making the test long and flaky", ja: "9. シーン2：余分なステップまで記録され、テストが長くflakyになる" },
    blocks: [
      SITUATION("Trong lúc ghi luồng đăng nhập ShopEasy bằng Codegen (giống chương 5), bạn vô tình rê chuột qua menu chọn ngôn ngữ và click nhầm vào ô tìm kiếm trước khi bấm đúng nút Đăng nhập. Codegen ghi lại TẤT CẢ các thao tác đó, kể cả những cú click/hover không liên quan tới mục tiêu test.", "While recording ShopEasy's login flow with Codegen (like in chapter 5), you accidentally move the mouse over the language menu and misclick the search box before clicking the actual Login button. Codegen records ALL of these actions, including clicks/hovers unrelated to the test's goal.",
        "File test sinh ra dài hơn cần thiết, khó đọc vì lẫn cả những bước không liên quan tới đăng nhập. Tệ hơn, menu ngôn ngữ trên trang tải chậm hơn bình thường vào một số lần chạy — khiến bước hover đó thỉnh thoảng timeout, làm cả bài test báo fail dù luồng đăng nhập chính hoàn toàn không có vấn đề gì.", "The generated test file is longer than necessary, hard to read because of steps unrelated to logging in. Worse, the language menu occasionally loads slower than usual on some runs — causing that hover step to sometimes time out, failing the whole test even though the main login flow has no issue at all.",
        "ShopEasyのログインフローをCodegenで記録している最中（第5章と同様）、誤ってマウスを言語メニューの上に動かし、実際のログインボタンをクリックする前に検索ボックスを誤クリックしてしまう。Codegenはこれらすべての操作を記録し、テストの目的とは無関係なクリック・ホバーも含まれる。",
        "生成されたテストファイルは必要以上に長くなり、ログインと無関係なステップが混ざって読みにくくなる。さらに悪いことに、言語メニューは一部の実行で通常より読み込みが遅くなることがあり、そのホバーステップが時々タイムアウトし、メインのログインフロー自体には全く問題がないにもかかわらずテスト全体が失敗になる。"),
      SOLVE("Mở lại code sinh ra, đọc từng dòng, và xoá hẳn các bước không phục vụ mục tiêu test (dòng hover menu ngôn ngữ, dòng click nhầm ô tìm kiếm) — chỉ giữ lại đúng chuỗi hành động cần thiết: mở trang, điền email, điền mật khẩu, bấm đăng nhập, kiểm tra kết quả.", "Reopen the generated code, read each line, and completely remove steps that don't serve the test's goal (the language menu hover line, the mis-clicked search box line) — keeping only the exact necessary sequence: open the page, fill email, fill password, click login, verify the result.", "生成されたコードを開き直し、各行を読み、テストの目的に貢献しないステップ（言語メニューのホバー行、誤クリックした検索ボックスの行）を完全に削除する——ページを開く、メールを入力する、パスワードを入力する、ログインをクリックする、結果を検証するという、本当に必要な手順だけを残す。"),
      P("Bài học ở đây khác với tình huống 1: vấn đề không nằm ở locator giòn, mà ở việc Codegen ghi lại CHÍNH XÁC những gì bạn làm — kể cả những thao tác bạn không hề định làm. Codegen không 'hiểu' mục tiêu test của bạn là gì, nó chỉ ghi hành động. Trách nhiệm lọc ra 'hành động nào thật sự cần' luôn thuộc về người viết test, không phải công cụ.",
        "The lesson here differs from Situation 1: the problem isn't a brittle locator, it's that Codegen records EXACTLY what you do — including actions you never intended. Codegen doesn't 'understand' your test's goal, it only records actions. The responsibility to filter 'which actions are actually needed' always belongs to the test author, not the tool.",
        "ここでの教訓はシーン1とは異なります：問題は脆いロケーターではなく、Codegenがあなたの行動を『正確に』記録すること——意図していなかった操作も含めて——にあります。Codegenはあなたのテストの目的を『理解』しません、操作を記録するだけです。『本当に必要な操作はどれか』を取捨選択する責任は、常にツールではなくテスト作成者にあります。"),
      IMG(m_kanban, "Bảng theo dõi việc dọn dẹp các test được ghi bằng Codegen còn dư bước thừa, chưa qua chỉnh sửa", "A board tracking cleanup of Codegen-recorded tests that still have leftover extra steps, not yet edited", "余分なステップが残ったまま未編集の、Codegenで記録されたテストの整理作業を追跡するボード"),
      TRY("Mở lại code thô ở chương 5, tự tìm xem còn dòng nào khác (ngoài dòng hover menu) mà bạn nghĩ không thật sự cần thiết cho mục tiêu 'kiểm tra đăng nhập thành công', rồi thử xoá và chạy lại test.", "Open the raw code from chapter 5 again, find any other line (besides the menu hover) you think isn't actually necessary for the 'verify successful login' goal, then try removing it and rerunning the test.", "第5章の生コードを開き直し、（メニューホバー以外に）『ログイン成功を検証する』という目的に本当に必要ないと思う行がないか探し、削除して再度テストを実行してみよう。"),
    ] },
  { heading: { vi: "10. Giới hạn của Codegen, lỗi hay gặp & câu hỏi thường gặp", en: "10. Codegen's limitations, common mistakes & FAQ", ja: "10. Codegenの限界・よくある失敗・よくある質問" },
    blocks: [
      P("Codegen tuyệt vời để bắt đầu nhanh, nhưng có giới hạn rõ ràng khi dự án automation lớn dần. Mỗi lần ghi tạo ra 1 file độc lập — Codegen không biết bạn đã có LoginPage hay hàm login() dùng chung ở đâu đó, nên nó không tự tái sử dụng code cũ. Nếu bạn ghi 10 luồng đều cần đăng nhập trước, Codegen sẽ ghi lại y hệt các bước đăng nhập 10 lần trong 10 file khác nhau — đúng vấn đề 'locator/hành động lặp lại' mà cấu trúc như Page Object Model được sinh ra để giải quyết. Nói cách khác: dùng Codegen để LẤY code khởi đầu, rồi refactor vào cấu trúc bền vững hơn khi số lượng test tăng lên, thay vì giữ nguyên từng file ghi rời rạc mãi mãi.",
        "Codegen is great for a quick start, but has clear limits as an automation project grows. Each recording creates one independent file — Codegen doesn't know you already have a LoginPage or a shared login() function somewhere, so it never reuses existing code. If you record 10 flows that all need login first, Codegen will record the exact same login steps 10 times across 10 different files — precisely the 'duplicated locators/actions' problem that a structure like the Page Object Model exists to solve. In other words: use Codegen to get a starting point, then refactor into a more sustainable structure as your test count grows, instead of keeping every recorded file separate forever.",
        "Codegenは素早く始めるのに優れていますが、自動化プロジェクトが大きくなるにつれ明確な限界があります。記録のたびに独立したファイルが1つ作られます——Codegenはあなたがすでにどこかにログイン用のLoginPageや共有login()関数を持っていることを知らないため、既存のコードを再利用することはありません。ログインが先に必要な10個のフローを記録すると、Codegenは全く同じログイン手順を10個の異なるファイルに10回記録します——これはまさにPage Object Modelのような構造が解決するために生まれた『ロケーター・操作の重複』問題です。つまり、テスト数が増えるにつれて、記録された各ファイルを永遠に別々のまま残すのではなく、Codegenを出発点として使い、より持続可能な構造にリファクタリングしましょう。"),
      PITFALL("Coi mọi code Codegen sinh ra là 'chuẩn cuối cùng' rồi commit thẳng, không đọc lại — dễ dính đủ loại vấn đề: locator giòn, bước thừa, thiếu assert, tên test vô nghĩa.", "Treating everything Codegen generates as the 'final standard' and committing it straight away without reviewing — easily leads to a mix of problems: brittle locators, extra steps, missing assertions, meaningless test names.", "Codegenが生成したものすべてを『最終基準』とみなし、見直さずそのままコミットすること——脆いロケーター、余分なステップ、アサーションの欠如、意味のないテスト名など、様々な問題につながりやすい。"),
      PITFALL("Dùng Codegen để ghi cả những luồng phức tạp có nhiều điều kiện rẽ nhánh (ví dụ 'nếu giỏ hàng trống thì...') — Codegen chỉ ghi đúng 1 đường đi cụ thể bạn vừa thao tác, không tự sinh logic rẽ nhánh cho bạn.", "Using Codegen to record complex flows with many branching conditions (e.g. 'if the cart is empty then...') — Codegen only records the one specific path you just took, and never generates branching logic for you.", "多くの分岐条件を持つ複雑なフロー（例：『カートが空なら...』）をCodegenで記録すること——Codegenはあなたが実際に行った1つの具体的な経路だけを記録し、分岐ロジックを自動生成することはない。"),
      TIP("Muốn thực hành ghi rồi refactor test Codegen trên dự án automation thật với mentor kèm sát, tham khảo khóa Software Testing chuyên nghiệp (Manual + Automation) tại CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "Want to practice recording then refactoring Codegen tests on a real automation project with close mentorship? Check out CyberSoft's Professional Software Testing (Manual + Automation) course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "実際の自動化プロジェクトでメンターに密着指導してもらいながらCodegenテストの記録とリファクタリングを実践したいなら、CyberSoftのソフトウェアテスト専門コース（手動＋自動）をチェック：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Locator & Selector cho người mới", "Locators & selectors for beginners", "locator-selector-cho-nguoi-moi", "初心者のためのロケーター・セレクター"),
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者向けPage Object Model"),
      INTERNAL("Tự động hoá kiểm thử là gì cho người mới", "What is test automation for beginners", "tu-dong-hoa-kiem-thu-la-gi-cho-nguoi-moi", "初心者のためのテスト自動化とは"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học Playwright Codegen qua màn đăng nhập và trang sản phẩm thật của ShopEasy: cách chạy npx playwright codegen, đọc code sinh ra (kể cả nhận diện bước thừa lỡ ghi), chỉnh sửa lại cho có tên rõ nghĩa và câu assert, cách chọn locator ổn định trong nhiều lựa chọn Codegen đưa ra, và giới hạn của test ghi tự động khi dự án lớn dần. Hai tình huống thật cho thấy 2 kiểu vấn đề khác nhau: locator giòn theo text hiển thị (vỡ khi đổi nhãn nút), và bước thừa lẫn vào code do lỡ tay khi ghi (khiến test dài, dễ flaky). Đây là kỹ năng khởi đầu rất thực tế, giúp bạn viết được test Playwright chạy được ngay từ những ngày đầu học automation, thay vì mất nhiều tuần chỉ để làm quen cú pháp.",
        "You just learned Playwright Codegen through ShopEasy's real login screen and product page: how to run npx playwright codegen, read the generated code (including spotting accidentally recorded extra steps), edit it with a meaningful name and assertions, choose a stable locator among the options Codegen offers, and recognize the limits of recorded tests as a project grows. Two real situations showed two different kinds of problems: a brittle text-based locator (breaking on a label change), and extra steps leaking into the code from a slip while recording (making tests longer and flaky). This is a very practical starting skill, letting you write a runnable Playwright test from your very first days learning automation, instead of spending weeks just getting comfortable with syntax.",
        "ShopEasyの実際のログイン画面と商品ページを通じてPlaywright Codegenを学びました：npx playwright codegenの実行方法、生成コードの読み方（誤って記録された余分なステップを見つけることを含む）、意味のある名前とアサーションを付けた編集、Codegenが提示する複数の選択肢から安定したロケーターを選ぶ方法、そしてプロジェクトが大きくなるにつれての記録されたテストの限界。2つの実例は異なる種類の問題を示しました：表示テキストによる脆いロケーター（ラベル変更で壊れる）と、記録中のミスでコードに混入した余分なステップ（テストを長くflakyにする）。これは非常に実践的な出発点となるスキルであり、構文に慣れるだけで何週間も費やす代わりに、自動化を学び始めた最初の数日から動くPlaywrightテストを書けるようにしてくれます。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về Page Object Model (POM) để biết cách gom các locator/hành động ghi được bằng Codegen vào một cấu trúc dùng chung, tránh lặp lại khi số lượng test tăng lên. AI có thể giúp bạn gợi ý nhanh cú pháp Playwright, nhưng để thành thạo thật sự — đọc đúng code Codegen sinh ra, biết khi nào cần refactor, tổ chức project chuẩn — bạn cần thực hành trên dự án thật với người hướng dẫn. Một khoá học Tester bài bản từ zero tới đi làm như https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, có mentor kèm sát và dự án automation thực chiến, sẽ giúp bạn tự tin ứng tuyển vị trí Automation Tester; nếu cần lộ trình riêng theo tốc độ của bạn, có thể chọn thêm hình thức học 1-1 tại " + COURSE_1V1_URL + ".",
        "Next, you should look into the Page Object Model (POM) to learn how to group the locators/actions recorded by Codegen into a shared structure, avoiding duplication as your test count grows. AI can quickly help suggest Playwright syntax, but to truly master it — correctly reading Codegen's generated code, knowing when to refactor, structuring a project properly — you need hands-on practice on a real project with a mentor. A proper Tester course from zero to hired, like https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, with close mentoring and real automation projects, helps you confidently apply for an Automation Tester role; if you want a pace tailored to you, 1-on-1 training at " + COURSE_1V1_URL + " is also available.",
        "次は、Page Object Model（POM）についてさらに学び、Codegenで記録したロケーター・操作を共有構造にまとめる方法を知り、テスト数が増えるにつれての重複を避けましょう。AIはPlaywrightの構文を素早く提案する手助けができますが、本当に習得する——Codegenが生成したコードを正しく読み、いつリファクタリングすべきか知り、プロジェクトを適切に構成する——には、メンターと共に実際のプロジェクトで実践する必要があります。https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のようなゼロから就職までの体系的なテスターコースは、密接なメンタリングと実際の自動化プロジェクトを提供し、Automation Testerポジションへの自信ある応募を助けます。自分のペースに合わせたい場合は、" + COURSE_1V1_URL + " での1対1トレーニングも選べます。"),
      CTA(course),
    ] },
];

const CODEGEN_01 = makeDoc({
  slug: "dung-codegen-ghi-test-tu-dong-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "playwright codegen",
  keywords: ["playwright codegen", "ghi test tu dong", "automation testing", "record and playback testing", "chon locator cho nguoi moi"],
  coverLabel: "NGƯỜI MỚI · CODEGEN · TMĐT",
  crumb: "Dùng Codegen ghi thao tác thành test tự động cho người mới",
  metaTitle: { vi: "Playwright Codegen: ghi test tự động cho người mới", en: "Playwright Codegen: recording automated tests for beginners", ja: "初心者向けPlaywright Codegen：操作を自動テストに記録" },
  metaDescription: {
    vi: "Playwright Codegen cho người mới: dùng npx playwright codegen ghi thao tác trên ShopEasy thành code test, đọc, chỉnh sửa và chọn locator ổn định, có ví dụ chạy được.",
    en: "Playwright Codegen for beginners: use npx playwright codegen to record actions on ShopEasy into test code, then read, edit, and choose stable locators, with runnable examples and a quiz.",
    ja: "初心者向けPlaywright Codegen：npx playwright codegenでShopEasy上の操作をテストコードとして記録し、読解・編集・安定したロケーター選びを学ぶ、動く例とクイズ付き解説記事。",
  },
  title: {
    vi: "Dùng Codegen ghi thao tác thành test tự động cho người mới (có code chạy được)",
    en: "Using Codegen to record actions into automated tests for beginners (with runnable code)",
    ja: "初心者のためのCodegenで操作を自動テストに記録する方法（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: dùng Playwright Codegen (npx playwright codegen) ghi thao tác click/nhập trên app TMĐT ShopEasy thành code test tự động. Cách chạy Codegen, đọc và chỉnh sửa code sinh ra, chọn locator tốt, hai tình huống thật (selector giòn theo text vỡ khi đổi nhãn nút, ghi cả bước thừa gây flaky), giới hạn của test ghi tự động và khi nào cần refactor. Nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: use Playwright Codegen (npx playwright codegen) to record clicks/typing on the ShopEasy e-commerce app into automated test code. How to run Codegen, read and edit the generated code, choose good locators, two real situations (a brittle text selector breaking on a label change, extra steps causing flakiness), the limits of recorded tests and when to refactor. Many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：Playwright Codegen（npx playwright codegen）を使い、ECアプリShopEasy上のクリック・入力を自動テストコードとして記録する。Codegenの実行方法、生成コードの読解と編集、良いロケーターの選び方、2つの実例（テキストベースの脆いセレクターがラベル変更で壊れる、余分なステップによるflaky）、記録されたテストの限界とリファクタリングのタイミング。多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách dùng Codegen ghi test tự động", steps: [
    { name: "Chạy Codegen", text: "npx playwright codegen kèm địa chỉ trang, thao tác như người dùng thật." },
    { name: "Đọc & chỉnh sửa code sinh ra", text: "Đặt tên test rõ nghĩa, thêm assert, xoá bước thừa lỡ ghi." },
    { name: "Chọn locator ổn định", text: "Ưu tiên role/label/test id, tránh phụ thuộc text hiển thị dễ đổi." },
  ] },
  pages,
});

export const AU_CODEGEN_01 = [CODEGEN_01];
