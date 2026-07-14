// doc_au_datadriven.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Data-driven testing (chạy 1 kịch bản test với nhiều bộ dữ liệu) — vì sao cần tham số hóa test,
// tách dữ liệu khỏi logic kiểm tra, dùng mảng/JSON/CSV, cách đặt tên ca test theo dữ liệu để dễ debug.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright/JS chạy được.
// Gắn app TMĐT ShopEasy (form áp dụng mã giảm giá khi thanh toán). Song ngữ vi/en/ja (ja≠en),
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

// ── Mockup 1: màn hình thanh toán ShopEasy, ô nhập mã giảm giá + chú thích locator ──
const m_form = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Áp dụng mã giảm giá", [
    field(24, 20, 500, "Mã giảm giá", "SUMMER10", "normal"),
    btn(540, 20, 176, "Áp dụng", "primary"),
    annotate(20, 10, 508, 68, "Locator: #coupon-input"),
    annotate(536, 12, 184, 50, "Locator: #btn-apply-coupon"),
    `<text x="24" y="160" font-size="12.5" font-weight="700" fill="#16a34a">✓ Áp dụng thành công! Giảm 10% — còn lại 358.200đ</text>`,
    `<text x="24" y="182" font-size="10.5" fill="#94a3b8">Locator thông báo: #coupon-message</text>`,
  ].join(""), { h: 210, accent: "#0891b2" }),
].join(""), { h: 266, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: bảng bộ dữ liệu test cho ô mã giảm giá (input → kết quả mong đợi) ──
const m_data = grid("Bảng bộ dữ liệu test: mã giảm giá ShopEasy (input → kết quả mong đợi)",
  ["Tên ca test (đặt theo dữ liệu)", "Mã nhập", "Kết quả mong đợi"], [
  ["hop-le - ma con han", "SUMMER10", "Áp dụng thành công, giảm 10%"],
  ["hop-le - khong phan biet hoa/thuong", "summer10", "Áp dụng thành công, giảm 10%"],
  ["khong-hop-le - ma khong ton tai", "ABCXYZ", "Mã không hợp lệ"],
  ["het-han - ma tung dung", "TET2024", "Mã đã hết hạn"],
  ["bien-duoi - do dai 3 ky tu (min 4)", "S10", "Mã không hợp lệ"],
  ["bien-tren - do dai 20 ky tu (max 15)", "SUMMER10SUMMER10SUM", "Mã không hợp lệ"],
  ["rong - khong nhap gi", "(để trống)", "Vui lòng nhập mã giảm giá"],
  ["co-khoang-trang - tu dong trim", "  SUMMER10  ", "Áp dụng thành công, giảm 10%"],
], { accent: "#0891b2", highlight: 4, note: "1 ô nhập, 1 nút bấm — nhưng có tới 8 bộ dữ liệu cần kiểm tra: hợp lệ, không hợp lệ, biên." });

// ── Mockup 3: sơ đồ 1 kịch bản test × N bộ dữ liệu ──
const m_flow = moduleFlow("Sơ đồ 1 kịch bản test × N bộ dữ liệu (data-driven)", [
  { id: "data", label: "Bảng dữ liệu", sub: "couponTestCases[]", x: 96, y: 150 },
  { id: "loop", label: "Vòng lặp for...of", sub: "test() sinh N ca chạy thật", x: 380, y: 150 },
  { id: "ui", label: "Form ShopEasy", sub: "#coupon-input, #btn-apply-coupon", x: 664, y: 150 },
], [
  { from: "data", to: "loop", label: "for (const tc of testCases)" },
  { from: "loop", to: "ui", label: "nhập tc.code, kiểm tra tc.expected" },
], { accent: "#0891b2", h: 260 });

// ── Mockup 4: bảng trước/sau khi áp dụng data-driven testing ──
const m_baseafter = grid("Trước và sau khi áp dụng data-driven testing", ["Tiêu chí", "KHÔNG data-driven (copy-paste)", "CÓ data-driven"], [
  ["Số file/test cho 8 bộ dữ liệu", "8 test gần giống hệt nhau, mỗi file 1 mã", "1 mảng dữ liệu + 1 vòng lặp for...of + test()"],
  ["Thêm 1 bộ dữ liệu mới", "Copy-paste thêm 1 file test nữa", "Thêm đúng 1 dòng vào mảng testCases"],
  ["Sửa logic kiểm tra (assert)", "Phải sửa lại ở mọi file test đã copy-paste", "Chỉ sửa đúng 1 chỗ trong thân vòng lặp"],
  ["Đọc hiểu bộ dữ liệu đang test", "Phải mở từng file mới biết đang test mã gì", "Nhìn thẳng vào mảng testCases là thấy hết"],
  ["CI báo đỏ, biết bộ nào fail?", "Tên test giống nhau, khó biết mã nào gây lỗi", "Tên test gắn theo dữ liệu, biết ngay mã nào fail"],
], { accent: "#0891b2", note: "Cùng kiểm tra 1 ô nhập mã giảm giá, chỉ khác cách tổ chức — nhưng công sức bảo trì khác nhau rất nhiều." });

// ── Mockup 5: ticket Jira khi tên test giống hệt nhau khiến không biết bộ dữ liệu nào fail ──
const m_jira = jira({
  key: "SE-14208", title: "CI báo '1 failed' nhưng không rõ bộ dữ liệu mã giảm giá nào gây lỗi",
  type: "Bug", status: "Open", priority: "Medium", severity: "Medium",
  fields: [
    ["Môi trường", "CI pipeline · staging · web ShopEasy · Chrome 126"],
    ["Nguyên nhân", "Vòng lặp for...of chạy 8 bộ dữ liệu nhưng test('ap dung ma giam gia') dùng tên cố định, giống nhau ở cả 8 lần lặp"],
    ["Ảnh hưởng", "Log CI chỉ hiện '7 passed, 1 failed - ap dung ma giam gia', tester phải chạy lại từng bộ dữ liệu để tìm ra mã nào fail"],
    ["Đề xuất", "Đặt tên test động theo từng bộ dữ liệu, ví dụ test(`ma giam gia [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`)"],
  ],
});

// ── Mockup 6: bảng kanban nợ kỹ thuật do copy-paste 20 test gần giống nhau ──
const m_kanban = kanban("Nợ kỹ thuật do copy-paste test gần giống nhau (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14190", title: "20 test mã giảm giá copy-paste, chỉ khác 2 dòng mỗi file", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14208", title: "Gộp 20 test thành 1 bảng dữ liệu + 1 vòng lặp for...of", sev: "Medium" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14199", title: "Đặt tên test động theo dữ liệu để CI báo lỗi rõ ràng", sev: "Low" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14150", title: "Tách bảng dữ liệu ra file JSON riêng cho dễ cập nhật", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Data-driven testing là gì?",
  "What is data-driven testing?",
  "Data-driven testing (kiểm thử dựa trên dữ liệu) là cách viết MỘT kịch bản test dùng chung logic kiểm tra, rồi chạy lặp lại kịch bản đó với NHIỀU bộ dữ liệu đầu vào khác nhau (hợp lệ, không hợp lệ, biên...). Dữ liệu được tách riêng khỏi code test — thường lưu trong mảng, file JSON hoặc CSV — còn vòng lặp (như for...of) sẽ tự sinh ra nhiều ca test tương ứng với từng bộ dữ liệu.",
  "Data-driven testing is a way of writing ONE test script that shares the same verification logic, then running that script repeatedly with MANY different sets of input data (valid, invalid, boundary...). The data is kept separate from the test code — usually stored in an array, a JSON file, or a CSV — while a loop (like for...of) automatically generates one test case per data set.",
  "データ駆動テストとは何？",
  "データ駆動テストとは、同じ検証ロジックを共有する1つのテストスクリプトを書き、そのスクリプトを多数の異なる入力データセット（正常値、異常値、境界値など）で繰り返し実行する方法です。データはテストコードから分離され、通常は配列、JSONファイル、CSVに保存され、for...ofのようなループがデータセットごとに1つのテストケースを自動的に生成します。");
const faq2 = FAQ(
  "Data-driven testing khác gì so với viết từng test riêng lẻ cho mỗi bộ dữ liệu?",
  "How is data-driven testing different from writing a separate test for each data set?",
  "Viết từng test riêng lẻ nghĩa là mỗi bộ dữ liệu có một file/khối test riêng, dẫn tới trùng lặp gần như toàn bộ code (chỉ khác giá trị nhập và kết quả mong đợi). Data-driven testing tách phần 'dữ liệu' (mã nào, mong đợi gì) ra một bảng riêng, còn phần 'logic kiểm tra' (mở trang, nhập liệu, so sánh kết quả) chỉ viết đúng 1 lần trong thân vòng lặp — nhờ đó thêm/sửa/xoá 1 bộ dữ liệu không đụng tới logic test.",
  "Writing separate tests means each data set has its own file/block, causing nearly the entire code to be duplicated (only the input value and expected result differ). Data-driven testing separates the 'data' part (which code, what's expected) into its own table, while the 'verification logic' (open the page, fill input, compare result) is written exactly once inside the loop body — so adding, editing, or removing a data set never touches the test logic.",
  "個別にテストを書くのとデータ駆動テストは何が違う？",
  "個別にテストを書くとは、各データセットが専用のファイル・ブロックを持つことを意味し、コードのほぼ全体が重複します（入力値と期待結果だけが違う）。データ駆動テストは『データ』部分（どのコード、何を期待するか）を専用の表に分離し、『検証ロジック』（ページを開く、入力する、結果を比較する）はループ本体内でちょうど1回だけ書かれます——そのためデータセットの追加・編集・削除がテストロジックに影響しません。");
const faq3 = FAQ(
  "Khi nào nên tách bộ dữ liệu ra file JSON/CSV riêng thay vì để thẳng trong mảng của file test?",
  "When should test data be split into a separate JSON/CSV file instead of staying as an array in the test file?",
  "Để thẳng mảng trong file test là đủ khi bộ dữ liệu nhỏ, ít thay đổi (như ví dụ 8 mã giảm giá trong bài này). Khi bộ dữ liệu lớn dần (vài chục, vài trăm dòng), hoặc cần người không biết code (BA, tester manual) cùng bổ sung dữ liệu, hoặc muốn tái sử dụng cùng bộ dữ liệu cho nhiều kịch bản test khác nhau — lúc đó nên tách ra file JSON/CSV riêng, đọc bằng fs.readFileSync, để việc cập nhật dữ liệu không đòi hỏi sửa code test.",
  "Keeping the array inline in the test file is fine when the data set is small and rarely changes (like the 8 coupon codes in this article). Once the data set grows (dozens or hundreds of rows), or non-coders (BAs, manual testers) need to contribute data, or the same data set needs reuse across multiple test scripts — that's when it should move to a separate JSON/CSV file, read with fs.readFileSync, so updating data never requires touching the test code.",
  "テストファイル内の配列のままではなく、いつ別のJSON/CSVファイルに分けるべき？",
  "データセットが小さく、めったに変わらない場合（本記事の8個のクーポンコードの例など）は、テストファイル内の配列のままで十分です。データセットが大きくなる（数十〜数百行）、コードを書けない人（BAや手動テスター）がデータを追加する必要がある、あるいは同じデータセットを複数のテストスクリプトで再利用したい場合は、fs.readFileSyncで読み込む別のJSON/CSVファイルに分離すべきです。そうすればデータの更新にテストコードを触る必要がなくなります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích cốt lõi của data-driven testing là gì?", en: "What is the core purpose of data-driven testing?", ja: "データ駆動テストの核心的な目的は何？" },
    options: [
      { vi: "Chạy CHUNG một kịch bản kiểm tra với nhiều bộ dữ liệu đầu vào khác nhau, thay vì viết nhiều test gần giống hệt nhau", en: "Run ONE shared verification script against many different input data sets, instead of writing many nearly identical tests", ja: "ほぼ同じテストを何個も書く代わりに、共通の1つの検証スクリプトを多数の異なる入力データセットで実行すること" },
      { vi: "Làm test chạy song song nhanh hơn trên nhiều trình duyệt", en: "Make tests run faster in parallel across many browsers", ja: "多くのブラウザでテストを並列に速く実行すること" },
      { vi: "Tự động sinh ra locator cho mọi phần tử trên giao diện", en: "Automatically generate locators for every UI element", ja: "UIのすべての要素のロケーターを自動生成すること" },
      { vi: "Thay thế hoàn toàn việc viết assert/expect", en: "Completely replace the need to write assert/expect", ja: "assert/expectを書く必要を完全になくすこと" },
    ], correct: 0,
    explain: { vi: "Data-driven testing tách dữ liệu khỏi logic, cho phép 1 kịch bản test chạy lặp lại với N bộ dữ liệu khác nhau.", en: "Data-driven testing separates data from logic, letting one test script run repeatedly across N different data sets.", ja: "データ駆動テストはデータとロジックを分離し、1つのテストスクリプトをN個の異なるデータセットで繰り返し実行できるようにします。" },
  }),
  mcq({
    q: { vi: "Trong data-driven testing, phần 'dữ liệu' (mã nhập, kết quả mong đợi) nên đặt ở đâu?", en: "In data-driven testing, where should the 'data' part (input code, expected result) be placed?", ja: "データ駆動テストでは、『データ』部分（入力コード、期待結果）はどこに置くべき？" },
    options: [
      { vi: "Viết cứng ngay trong từng câu assert của từng test riêng lẻ", en: "Hard-coded directly inside each separate test's assert statement", ja: "個別の各テストのassert文にハードコードする" },
      { vi: "Tách riêng thành mảng/JSON/CSV, tách biệt khỏi logic kiểm tra", en: "Split into a separate array/JSON/CSV, apart from the verification logic", ja: "検証ロジックとは別に、配列・JSON・CSVに分離する" },
      { vi: "Đặt trong file playwright.config.js", en: "Placed inside the playwright.config.js file", ja: "playwright.config.jsファイルの中に置く" },
      { vi: "Không cần lưu ở đâu, gõ tay mỗi lần chạy test", en: "No need to store it anywhere, type it manually every time tests run", ja: "どこにも保存せず、テスト実行のたびに手入力する" },
    ], correct: 1,
    explain: { vi: "Nguyên tắc cốt lõi là tách dữ liệu khỏi logic — dữ liệu nằm trong mảng/JSON/CSV riêng, vòng lặp mới là nơi 'đọc' dữ liệu đó để chạy test.", en: "The core principle is separating data from logic — data lives in a separate array/JSON/CSV, while the loop is what 'reads' that data to run the tests.", ja: "核心原則はデータとロジックの分離です——データは別の配列・JSON・CSVにあり、ループがそのデータを『読んで』テストを実行します。" },
  }),
  mcq({
    q: { vi: "Vì sao nên đặt tên test động theo từng bộ dữ liệu (ví dụ test(`ma giam gia [${tc.name}]...`)) thay vì dùng 1 tên cố định cho cả vòng lặp?", en: "Why name tests dynamically per data set (e.g. test(`coupon [${tc.name}]...`)) instead of using one fixed name for the whole loop?", ja: "ループ全体で1つの固定名を使うのではなく、なぜデータセットごとに動的なテスト名（例：test(`coupon [${tc.name}]...`)）を付けるべき？" },
    options: [
      { vi: "Để test chạy nhanh hơn đáng kể", en: "So tests run significantly faster", ja: "テストが著しく速く動くようにするため" },
      { vi: "Để khi CI báo lỗi, biết ngay chính xác bộ dữ liệu nào gây fail mà không cần debug lại toàn bộ", en: "So when CI reports a failure, you know exactly which data set caused it without re-debugging everything", ja: "CIが失敗を報告したとき、全体をデバッグし直さなくても、どのデータセットが原因か正確にすぐ分かるようにするため" },
      { vi: "Vì Playwright bắt buộc mỗi test phải có tên khác nhau mới chạy được", en: "Because Playwright requires every test to have a different name to run at all", ja: "Playwrightはテストが動くために異なる名前を必須としているため" },
      { vi: "Để giấu bớt số lượng test thật sự đang chạy", en: "To hide the actual number of tests being run", ja: "実際に実行されているテスト数を隠すため" },
    ], correct: 1,
    explain: { vi: "Tên test cố định khiến log CI hiện '7 passed, 1 failed' mà không rõ bộ nào — đặt tên theo dữ liệu giúp thấy ngay bộ dữ liệu gây lỗi.", en: "A fixed test name makes CI logs show '7 passed, 1 failed' without telling which set failed — naming by data instantly reveals the failing data set.", ja: "固定のテスト名だとCIログは『7 passed, 1 failed』としか表示されずどのセットか分かりません——データ名を使うと失敗したデータセットが即座に分かります。" },
  }),
  mcq({
    q: { vi: "Khi nào nên tách bộ dữ liệu test ra một file JSON/CSV riêng thay vì để mảng ngay trong file test?", en: "When should test data move to a separate JSON/CSV file instead of staying as an array in the test file?", ja: "テストファイル内の配列のままにせず、いつ別のJSON/CSVファイルにデータを分けるべき？" },
    options: [
      { vi: "Ngay cả khi chỉ có 2-3 bộ dữ liệu và không bao giờ thay đổi", en: "Even when there are just 2-3 data sets that never change", ja: "データセットが2〜3個だけで変わらない場合でも" },
      { vi: "Khi bộ dữ liệu lớn dần, cần người không biết code cùng cập nhật, hoặc dùng chung cho nhiều kịch bản test", en: "When the data set grows large, non-coders need to update it, or it needs to be reused across multiple test scripts", ja: "データセットが大きくなる、コードを書けない人が更新する必要がある、または複数のテストスクリプトで再利用する場合" },
      { vi: "Chỉ khi dự án không dùng Playwright", en: "Only when the project doesn't use Playwright", ja: "プロジェクトがPlaywrightを使っていない場合のみ" },
      { vi: "Không bao giờ nên tách, luôn để thẳng trong file test", en: "Never split it out, always keep it inline in the test file", ja: "決して分けるべきではなく、常にテストファイル内に置く" },
    ], correct: 1,
    explain: { vi: "File JSON/CSV riêng hợp lý khi dữ liệu lớn, cần chia sẻ, hoặc cần người ngoài code cùng chỉnh sửa — mảng inline vẫn ổn với bộ dữ liệu nhỏ.", en: "A separate JSON/CSV file makes sense when data is large, needs sharing, or needs non-coder edits — an inline array is still fine for small data sets.", ja: "データが大きい、共有が必要、コードを書けない人の編集が必要な場合は別のJSON/CSVファイルが理にかなっています——小さいデータセットならインライン配列で十分です。" },
  }),
  mcq({
    q: { vi: "Điều gì KHÔNG nên làm khi viết vòng lặp for...of chạy data-driven testing?", en: "What should you AVOID doing when writing a for...of loop for data-driven testing?", ja: "データ駆動テスト用のfor...ofループを書くとき、何をすべきではない？" },
    options: [
      { vi: "Lặp qua mảng test case và gọi test() bên trong thân vòng lặp", en: "Looping through the test case array and calling test() inside the loop body", ja: "テストケース配列をループしてループ本体内でtest()を呼ぶこと" },
      { vi: "Đặt tên mỗi ca test theo dữ liệu tương ứng của nó", en: "Naming each test case after its corresponding data", ja: "各テストケースを対応するデータにちなんで命名すること" },
      { vi: "Nhồi if/else phức tạp để 'đoán' xử lý riêng cho từng bộ dữ liệu ngay trong thân vòng lặp, thay vì để trường 'expected' trong dữ liệu tự mô tả kết quả", en: "Stuffing complex if/else logic to 'guess' special handling per data set inside the loop, instead of letting the data's 'expected' field describe the result itself", ja: "データの'expected'フィールドに結果を語らせる代わりに、ループ内で複雑なif/elseを詰め込んで各データセットごとの特別処理を『推測』しようとすること" },
      { vi: "Dùng cùng 1 logic kiểm tra (assert) cho tất cả các bộ dữ liệu trong vòng lặp", en: "Using the same verification (assert) logic for every data set in the loop", ja: "ループ内のすべてのデータセットに同じ検証（assert）ロジックを使うこと" },
    ], correct: 2,
    explain: { vi: "Nhồi if/else theo từng bộ dữ liệu phá vỡ mục đích data-driven — hãy để trường 'expected' trong dữ liệu tự mô tả kết quả, thân vòng lặp chỉ cần 1 logic kiểm tra duy nhất.", en: "Stuffing if/else per data set defeats the purpose of data-driven testing — let the data's 'expected' field describe the result, keeping one single verification logic in the loop.", ja: "データセットごとにif/elseを詰め込むのはデータ駆動の目的に反します——データの'expected'フィールドに結果を語らせ、ループ内は単一の検証ロジックにとどめましょう。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Data-driven testing là cách viết MỘT kịch bản test dùng chung logic, rồi chạy lặp lại với NHIỀU bộ dữ liệu (hợp lệ/không hợp lệ/biên). Bài này bám màn thanh toán của app TMĐT ShopEasy, cụ thể là ô nhập mã giảm giá: bạn học vì sao cần tham số hoá test, cách tách dữ liệu khỏi logic bằng mảng/JSON, cách đặt tên ca test theo dữ liệu, và viết vòng lặp for...of + test() bằng Playwright chạy được thật. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Data-driven testing means writing ONE test script that shares the same logic, then running it repeatedly with MANY data sets (valid/invalid/boundary). This follows ShopEasy's checkout screen, specifically the coupon code field: you'll learn why test parameterization matters, how to separate data from logic using arrays/JSON, how to name test cases after their data, and how to write a real, runnable for...of + test() loop in Playwright. Lots of visuals and a quiz at the end.",
        "データ駆動テストとは、同じロジックを共有する1つのテストスクリプトを書き、多数のデータセット（正常値/異常値/境界値）で繰り返し実行することです。本記事はECアプリShopEasyの決済画面、特にクーポンコード入力欄に沿って、テストのパラメータ化がなぜ必要か、配列/JSONを使ってデータとロジックを分離する方法、データにちなんでテストケースを命名する方法、そしてPlaywrightで実際に動くfor...of + test()ループの書き方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi vừa học automation, phản xạ tự nhiên là viết 1 test cho 1 trường hợp: mở trang, nhập mã 'SUMMER10', bấm áp dụng, kiểm tra thông báo thành công. Nhưng thực tế 1 ô nhập mã giảm giá cần kiểm tra rất nhiều trường hợp: mã hợp lệ, mã hết hạn, mã không tồn tại, mã để trống, mã quá ngắn/quá dài... Nếu viết riêng từng test cho mỗi trường hợp, bạn sẽ có hàng chục file gần giống hệt nhau, chỉ khác đúng 2 dòng: giá trị nhập và kết quả mong đợi. Data-driven testing giải quyết vấn đề này: viết đúng 1 kịch bản, rồi 'nạp' nhiều bộ dữ liệu vào chạy lặp lại. Chúng ta sẽ học qua ô mã giảm giá thật của ShopEasy, có hình minh hoạ và code Playwright chạy được.",
        "Hi, newcomer! When you first learn automation, the natural instinct is to write one test per case: open the page, enter 'SUMMER10', click apply, check the success message. But in reality, a single coupon field needs many cases checked: valid code, expired code, non-existent code, blank code, too short/too long code... Writing a separate test for each case gives you dozens of nearly identical files, differing only in two lines: the input value and the expected result. Data-driven testing solves exactly this: write exactly one script, then 'feed' it many data sets to run repeatedly. We'll learn through ShopEasy's real coupon field, with visuals and runnable Playwright code.",
        "こんにちは、初心者さん！自動化を学び始めると、1つのケースごとに1つのテストを書く、という自然な反応をします：ページを開き、'SUMMER10'を入力し、適用をクリックし、成功メッセージを確認する。しかし実際には1つのクーポン欄で確認すべきケースはたくさんあります：有効なコード、期限切れコード、存在しないコード、空欄、短すぎ/長すぎるコードなど。ケースごとに別々のテストを書くと、入力値と期待結果の2行しか違わない、ほぼ同一の数十個のファイルができてしまいます。データ駆動テストはまさにこれを解決します：ちょうど1つのスクリプトを書き、それに多数のデータセットを『与えて』繰り返し実行します。実際のShopEasyのクーポン欄を通じて、図と動くPlaywrightコード付きで学びます。"),
      IMG(m_form, "Màn hình test: ô nhập mã giảm giá ShopEasy khi thanh toán, chú thích locator ô nhập/nút/thông báo", "Screen under test: ShopEasy's checkout coupon field, annotated with the locators for the input, button, and message", "テスト対象画面：決済時のShopEasyクーポン入力欄、入力欄・ボタン・メッセージのロケーターを注記"),
      DEF("Data-driven testing", "cách viết một kịch bản kiểm tra dùng chung logic, rồi chạy lặp lại với nhiều bộ dữ liệu đầu vào khác nhau, thay vì viết nhiều test gần giống hệt nhau.",
        "a way of writing one verification script that shares the same logic, then running it repeatedly with many different input data sets, instead of writing many nearly identical tests.",
        "同じロジックを共有する1つの検証スクリプトを書き、ほぼ同じテストを何個も書く代わりに、多数の異なる入力データセットで繰り返し実行する方法。"),
    ] },
  { heading: { vi: "2. Vấn đề: khi bạn có 20 test gần giống hệt nhau", en: "2. The problem: 20 nearly identical tests", ja: "2. 問題：ほぼ同じ20個のテスト" },
    blocks: [
      P("Hãy hình dung bạn được giao kiểm tra ô mã giảm giá của ShopEasy. Bạn viết test đầu tiên: nhập 'SUMMER10', kiểm tra thông báo 'Áp dụng thành công'. Rồi bạn copy file đó, đổi giá trị thành 'ABCXYZ', đổi kỳ vọng thành 'Mã không hợp lệ'. Rồi lại copy tiếp cho mã hết hạn, mã để trống, mã quá dài... Chỉ sau vài giờ, bạn có 8, 10, rồi 20 file test — mỗi file giống hệt nhau 95%, chỉ khác đúng giá trị nhập và câu kiểm tra kết quả.",
        "Imagine you're assigned to test ShopEasy's coupon field. You write the first test: enter 'SUMMER10', check for 'Applied successfully'. Then you copy that file, change the value to 'ABCXYZ', change the expectation to 'Invalid code'. Then copy again for an expired code, a blank code, a too-long code... After just a few hours, you have 8, 10, then 20 test files — each 95% identical, differing only in the input value and the result check.",
        "ShopEasyのクーポン欄をテストするよう任されたと想像してください。最初のテストを書きます：'SUMMER10'を入力し、'適用成功'を確認する。そのファイルをコピーし、値を'ABCXYZ'に変え、期待を'無効なコード'に変えます。さらに期限切れコード、空欄、長すぎるコード用にコピーを続けます……わずか数時間後には8個、10個、そして20個のテストファイルができています——それぞれが95%同一で、入力値と結果チェックだけが違います。"),
      P("Vấn đề thật sự xuất hiện khi bạn cần thay đổi logic kiểm tra — ví dụ sếp yêu cầu thêm bước kiểm tra số tiền cuối cùng sau khi áp dụng mã, không chỉ thông báo. Với 20 file gần giống nhau, bạn phải mở từng file, sửa từng chỗ, rất dễ bỏ sót 1-2 file. Đây chính là lúc bạn nhận ra: cái mình cần không phải 20 kịch bản khác nhau, mà là 1 kịch bản và 20 bộ dữ liệu.",
        "The real problem appears when you need to change the verification logic — say your manager asks you to also check the final total after applying the code, not just the message. With 20 nearly identical files, you must open each one and fix it individually, easily missing 1-2 files. This is when you realize: what you actually need isn't 20 different scripts, but 1 script and 20 data sets.",
        "本当の問題は、検証ロジックを変える必要が出たときに現れます——例えば上司が、メッセージだけでなくコード適用後の最終合計金額もチェックするよう求めてきたとします。ほぼ同一の20ファイルでは、各ファイルを開いて1つずつ直さねばならず、1〜2ファイルを見落としがちです。ここで気づきます：本当に必要なのは20個の異なるスクリプトではなく、1個のスクリプトと20個のデータセットだと。"),
      IMG(m_data, "Bảng bộ dữ liệu test cho ô mã giảm giá: mỗi dòng là 1 trường hợp cần kiểm tra", "Test data table for the coupon field: each row is a case to verify", "クーポン欄のテストデータ表：各行が確認すべきケース"),
      DEF("Tham số hóa test (test parameterization)", "kỹ thuật thiết kế 1 kịch bản test nhận dữ liệu đầu vào như tham số, để có thể chạy lại với nhiều giá trị khác nhau mà không sửa code.",
        "the technique of designing a test script to accept input data as parameters, so it can be re-run with many different values without changing the code.",
        "テストスクリプトが入力データをパラメータとして受け取るよう設計し、コードを変更せずに多数の異なる値で再実行できるようにする技法。"),
    ] },
  { heading: { vi: "3. Data-driven testing là gì & nguyên tắc cốt lõi", en: "3. What data-driven testing is & its core principle", ja: "3. データ駆動テストとは何か・その核心原則" },
    blocks: [
      P("Nguyên tắc cốt lõi của data-driven testing là 'tách dữ liệu khỏi logic': logic kiểm tra (mở trang, nhập liệu, bấm nút, so sánh kết quả) được viết đúng 1 lần, còn dữ liệu (mã nào, mong đợi kết quả gì) được gom vào một bảng riêng — thường là mảng object trong JavaScript, hoặc file JSON/CSV. Một vòng lặp (phổ biến nhất là for...of) sẽ đọc từng dòng dữ liệu và sinh ra 1 ca test tương ứng, chạy đúng cùng 1 logic nhưng với giá trị khác nhau.",
        "The core principle of data-driven testing is 'separating data from logic': the verification logic (open the page, fill input, click, compare result) is written exactly once, while the data (which code, what result is expected) is gathered into its own table — usually a JavaScript array of objects, or a JSON/CSV file. A loop (most commonly for...of) reads each data row and generates one corresponding test case, running the exact same logic but with different values.",
        "データ駆動テストの核心原則は『データとロジックの分離』です：検証ロジック（ページを開く、入力する、クリックする、結果を比較する）はちょうど1回書かれ、データ（どのコード、どんな結果を期待するか）は専用の表——通常はJavaScriptのオブジェクト配列、またはJSON/CSVファイル——にまとめられます。ループ（最も一般的にはfor...of）が各データ行を読み取り、対応する1つのテストケースを生成し、同じロジックを異なる値で実行します。"),
      IMG(m_flow, "Sơ đồ: bảng dữ liệu được vòng lặp for...of đọc, sinh ra N ca test chạy trên form ShopEasy", "Diagram: a data table read by a for...of loop, generating N test cases run against the ShopEasy form", "図：データ表がfor...ofループで読み込まれ、ShopEasyフォームに対してN個のテストケースを生成する"),
      P("Nói cách khác: bảng dữ liệu 'biết' phải test cái gì và mong đợi kết quả ra sao, còn kịch bản test chỉ 'biết' cách thực hiện và cách so sánh. Khi cần thêm 1 trường hợp mới, bạn chỉ thêm 1 dòng dữ liệu — không đụng tới logic. Khi cần sửa cách kiểm tra (ví dụ thêm kiểm tra số tiền), bạn chỉ sửa đúng 1 chỗ trong thân vòng lặp — mọi bộ dữ liệu tự động dùng logic mới. Đây là lý do data-driven testing giúp bộ test bền vững và dễ mở rộng hơn hẳn khi số lượng trường hợp cần kiểm tra tăng lên.",
        "In other words: the data table 'knows' what to test and what result to expect, while the test script only 'knows' how to perform the steps and compare results. When you need a new case, you just add one data row — without touching the logic. When you need to change how verification works (e.g. also checking the final total), you fix exactly one spot inside the loop body — every data set automatically uses the new logic. This is why data-driven testing keeps a test suite sustainable and far easier to extend as the number of cases grows.",
        "言い換えれば、データ表は『何をテストし、どんな結果を期待するか』を知っており、テストスクリプトは『どう実行し、どう比較するか』だけを知っています。新しいケースが必要なとき、ロジックに触れず1行のデータを追加するだけです。検証方法を変える必要があるとき（例：最終合計金額も確認する）、ループ本体内のたった1箇所を直せば、すべてのデータセットが自動的に新しいロジックを使います。これが、確認すべきケース数が増えるにつれ、データ駆動テストがテストスイートを持続可能で拡張しやすく保つ理由です。"),
      IMG(m_baseafter, "Bảng so sánh: cùng ô mã giảm giá, tổ chức test KHÔNG có data-driven và CÓ data-driven", "Comparison: the same coupon field, tests organized WITHOUT data-driven versus WITH data-driven", "比較表：同じクーポン欄で、データ駆動なしとデータ駆動ありでテストを整理した場合"),
      TIP("Luôn tự hỏi trước khi copy-paste 1 test: 'phần khác nhau giữa 2 test này chỉ là dữ liệu, hay có logic khác nhau thật sự?' — nếu chỉ khác dữ liệu, đó là dấu hiệu nên chuyển sang data-driven.", "Before copy-pasting a test, always ask: 'is the difference between these two tests only the data, or genuinely different logic?' — if it's only data, that's a sign you should switch to data-driven.", "テストをコピペする前に必ず自問しよう：『この2つのテストの違いはデータだけか、それとも本当にロジックが違うのか？』——データだけの違いなら、データ駆動に切り替えるべきサインです。"),
    ] },
  { heading: { vi: "4. Chọn bộ dữ liệu: hợp lệ, không hợp lệ và biên", en: "4. Choosing data sets: valid, invalid, and boundary", ja: "4. データセットの選び方：正常値・異常値・境界値" },
    blocks: [
      P("Data-driven testing chỉ mạnh khi bộ dữ liệu được chọn tốt. Với ô mã giảm giá ShopEasy, ta chia dữ liệu thành 3 nhóm: dữ liệu HỢP LỆ (mã đúng, còn hạn — kỳ vọng áp dụng thành công), dữ liệu KHÔNG HỢP LỆ (mã sai, mã hết hạn, mã không tồn tại — kỳ vọng thông báo lỗi tương ứng), và dữ liệu BIÊN (độ dài tối thiểu/tối đa, ô để trống, khoảng trắng thừa — nơi lỗi hay ẩn náu nhất). Nếu bạn chưa quen kỹ thuật chọn giá trị biên, có thể xem thêm bài phân vùng tương đương và giá trị biên trong phần liên kết cuối bài.",
        "Data-driven testing only shines when the data set is well chosen. For ShopEasy's coupon field, we split data into 3 groups: VALID data (correct, unexpired code — expecting success), INVALID data (wrong code, expired code, non-existent code — expecting the matching error message), and BOUNDARY data (minimum/maximum length, blank field, extra whitespace — where bugs hide most often). If you're not yet familiar with picking boundary values, see the equivalence partitioning and boundary value article linked at the end.",
        "データ駆動テストは、データセットがうまく選ばれてこそ真価を発揮します。ShopEasyのクーポン欄では、データを3グループに分けます：正常値データ（正しく期限内のコード——成功を期待）、異常値データ（間違ったコード、期限切れコード、存在しないコード——対応するエラーメッセージを期待）、境界値データ（最小/最大の長さ、空欄、余分な空白——バグが最も潜みやすい場所）。境界値の選び方にまだ慣れていなければ、記事末尾のリンクにある同値分割と境界値の記事を参照してください。"),
      P("Chú ý bảng dữ liệu ở chương 2: dòng 'khong-phan-biet-hoa/thuong' và 'co-khoang-trang' không phải trường hợp 'hiển nhiên' — chúng kiểm tra những giả định ngầm (hệ thống có tự động chuẩn hoá chữ hoa/thường và khoảng trắng hay không). Đây chính là giá trị của data-driven testing: một khi đã có sẵn cơ chế chạy nhiều bộ dữ liệu, việc bổ sung thêm các trường hợp 'ngầm định' như vậy chỉ tốn thêm 1 dòng, gần như miễn phí.",
        "Notice the data table in chapter 2: the 'case-insensitive' and 'has-whitespace' rows aren't 'obvious' cases — they test implicit assumptions (whether the system auto-normalizes case and whitespace). This is exactly the value of data-driven testing: once the mechanism to run many data sets exists, adding such 'implicit' cases costs just one extra row, almost for free.",
        "第2章のデータ表に注目してください：『大文字小文字を区別しない』と『空白を含む』の行は『当たり前』のケースではありません——システムが大文字小文字や空白を自動的に正規化するかという暗黙の前提を検証しています。これこそがデータ駆動テストの価値です：多数のデータセットを実行する仕組みさえあれば、こうした『暗黙の』ケースを追加するのはたった1行、ほぼ無料同然です。"),
      TIP("Đặt tên cho từng bộ dữ liệu ngay khi thiết kế bảng (ví dụ 'bien-duoi', 'het-han'), đừng để tới lúc viết code mới nghĩ tên — việc này giúp bạn tự kiểm tra đã bao phủ đủ nhóm hợp lệ/không hợp lệ/biên chưa.", "Name each data set right when designing the table (e.g. 'lower-boundary', 'expired'), don't leave naming until you write code — this helps you self-check whether you've covered enough valid/invalid/boundary groups.", "表を設計する時点で各データセットに名前を付けよう（例：'下限境界'、'期限切れ'）、コードを書く段階まで命名を後回しにしないこと——これにより正常値/異常値/境界値のグループを十分カバーできているか自己チェックできます。"),
    ] },
  { heading: { vi: "5. Đặt tên ca test theo dữ liệu", en: "5. Naming test cases after their data", ja: "5. データにちなんだテストケースの命名" },
    blocks: [
      P("Một chi tiết nhỏ nhưng cực kỳ quan trọng trong data-driven testing: TÊN của ca test được sinh ra trong vòng lặp. Nếu bạn dùng 1 tên cố định cho mọi lần lặp (ví dụ test('kiểm tra mã giảm giá', ...)), khi CI chạy 8 bộ dữ liệu, log sẽ hiện '7 passed, 1 failed - kiểm tra mã giảm giá' — 8 dòng giống hệt nhau, bạn hoàn toàn không biết bộ dữ liệu nào gây lỗi.",
        "One small but critically important detail in data-driven testing: the NAME of the test case generated inside the loop. If you use one fixed name for every iteration (e.g. test('check coupon code', ...)), when CI runs 8 data sets, the log will show '7 passed, 1 failed - check coupon code' — 8 identical lines, and you have no idea which data set caused the failure.",
        "データ駆動テストにおける小さいながらも極めて重要な点：ループ内で生成されるテストケースの『名前』です。すべての反復に1つの固定名（例：test('クーポンコードを確認', ...)）を使うと、CIが8個のデータセットを実行したとき、ログには『7 passed, 1 failed - クーポンコードを確認』と表示されます——8行が全く同じで、どのデータセットが失敗の原因か全く分かりません。"),
      P("Cách giải quyết là đặt tên test ĐỘNG, ghép trực tiếp thông tin từ chính bộ dữ liệu đang chạy vào tên — ví dụ tên trường hợp, giá trị nhập, hoặc kết quả mong đợi. Khi đó, mỗi lần lặp sinh ra một tên test khác nhau, và log CI sẽ liệt kê rõ ràng dòng nào fail ứng với bộ dữ liệu nào, giúp bạn debug ngay lập tức mà không cần chạy lại từ đầu.",
        "The fix is to name tests DYNAMICALLY, embedding information from the current data set directly into the name — such as the case name, the input value, or the expected result. Then each iteration produces a different test name, and the CI log clearly lists which line failed for which data set, letting you debug instantly without re-running from scratch.",
        "解決策は、テスト名を『動的』にし、現在実行中のデータセットの情報（ケース名、入力値、期待結果など）を名前に直接埋め込むことです。そうすれば各反復で異なるテスト名が生成され、CIログはどの行がどのデータセットで失敗したかを明確に示し、最初からやり直さずに即座にデバッグできます。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố: tên test giống nhau ở mọi lần lặp khiến không biết bộ dữ liệu nào fail", "A bug ticket recording the incident: identical test names in every iteration hide which data set failed", "インシデントを記録したバグチケット：反復ごとに同じテスト名が使われ、どのデータセットが失敗したか分からない"),
      TIP("Mẫu đặt tên gợi ý: test(`ma giam gia [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`) — vừa có tên ngắn gọn (tc.name), vừa có đủ dữ liệu để debug ngay từ dòng log mà không cần mở code.", "Suggested naming pattern: test(`coupon [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`) — it's both a short readable name (tc.name) and carries enough data to debug straight from the log line without opening the code.", "推奨命名パターン：test(`coupon [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`)——短く読みやすい名前（tc.name）でありながら、コードを開かずログ行だけでデバッグできるだけの十分なデータを含みます。"),
    ] },
  { heading: { vi: "6. Viết mảng test case đầu tiên (thực hành)", en: "6. Writing your first test case array (hands-on)", ja: "6. 最初のテストケース配列を書く（実習）" },
    blocks: [
      P("Giờ ta viết bảng dữ liệu đầu tiên cho ô mã giảm giá ShopEasy. Làm theo thứ tự dưới đây để có một mảng testCases đầy đủ, dùng được ngay cho vòng lặp ở chương sau.",
        "Now let's write the first data table for ShopEasy's coupon field. Follow the order below to get a complete testCases array, ready to use in the loop in the next chapter.",
        "では、ShopEasyのクーポン欄用に最初のデータ表を書きましょう。以下の順に沿って、次章のループですぐ使える完全なtestCases配列を作りましょう。"),
      STEP(1, "Tạo file fixtures/coupon-test-data.js, khai báo mảng couponTestCases.", "Create fixtures/coupon-test-data.js, and declare the couponTestCases array.", "fixtures/coupon-test-data.jsを作成し、couponTestCases配列を宣言する。"),
      STEP(2, "Mỗi phần tử là 1 object có 3 trường: name (tên trường hợp), code (mã nhập), expected (kết quả mong đợi).", "Each element is an object with 3 fields: name (case name), code (input code), expected (expected result).", "各要素はname（ケース名）、code（入力コード）、expected（期待結果）の3つのフィールドを持つオブジェクトにする。"),
      STEP(3, "Phủ đủ 3 nhóm: hợp lệ, không hợp lệ, biên — dựa theo bảng dữ liệu đã thiết kế ở chương 4.", "Cover all 3 groups: valid, invalid, boundary — based on the data table designed in chapter 4.", "第4章で設計したデータ表に基づき、正常値・異常値・境界値の3グループをすべてカバーする。"),
      STEP(4, "Export mảng để file test có thể import và dùng.", "Export the array so test files can import and use it.", "テストファイルがインポートして使えるよう、配列をエクスポートする。"),
      CODE("javascript", "// fixtures/coupon-test-data.js\nconst couponTestCases = [\n  { name: 'hop-le - ma con han', code: 'SUMMER10', expected: 'Ap dung thanh cong, giam 10%' },\n  { name: 'hop-le - khong phan biet hoa/thuong', code: 'summer10', expected: 'Ap dung thanh cong, giam 10%' },\n  { name: 'khong-hop-le - ma khong ton tai', code: 'ABCXYZ', expected: 'Ma khong hop le' },\n  { name: 'het-han - ma tung dung', code: 'TET2024', expected: 'Ma da het han' },\n  { name: 'bien-duoi - do dai 3 ky tu', code: 'S10', expected: 'Ma khong hop le' },\n  { name: 'bien-tren - do dai 20 ky tu', code: 'SUMMER10SUMMER10SUM', expected: 'Ma khong hop le' },\n  { name: 'rong - khong nhap gi', code: '', expected: 'Vui long nhap ma giam gia' },\n  { name: 'co-khoang-trang - tu dong trim', code: '  SUMMER10  ', expected: 'Ap dung thanh cong, giam 10%' },\n];\n\nmodule.exports = { couponTestCases };"),
      TRY("Mở lại mảng trên và thêm 1 bộ dữ liệu nữa: mã chứa ký tự đặc biệt như 'SUM#MER10', tự đặt tên trường hợp và kết quả mong đợi mà bạn nghĩ là hợp lý.", "Open the array above and add one more data set: a code containing a special character like 'SUM#MER10', naming the case and expected result you think is reasonable.", "上の配列を開き、'SUM#MER10'のような特殊文字を含むコードのデータセットをもう1つ追加し、妥当だと思うケース名と期待結果を自分で決めてみよう。"),
    ] },
  { heading: { vi: "7. Viết vòng lặp for...of + test() (thực hành)", en: "7. Writing the for...of + test() loop (hands-on)", ja: "7. for...of + test()ループを書く（実習）" },
    blocks: [
      P("Có mảng testCases rồi, giờ ta viết đúng 1 kịch bản test, đặt trong vòng lặp for...of để tự động sinh ra 8 ca test — mỗi ca dùng đúng 1 bộ dữ liệu, tên gắn theo dữ liệu như đã bàn ở chương 5.",
        "With the testCases array ready, we now write exactly one test script inside a for...of loop to automatically generate 8 test cases — each using exactly one data set, named after that data as discussed in chapter 5.",
        "testCases配列ができたので、for...ofループ内にちょうど1つのテストスクリプトを書き、8個のテストケースを自動生成します——各テストケースは第5章で議論したようにデータにちなんで命名された、1つのデータセットだけを使います。"),
      STEP(1, "Import test, expect từ @playwright/test và couponTestCases từ fixtures.", "Import test, expect from @playwright/test and couponTestCases from fixtures.", "@playwright/testからtest, expectを、fixturesからcouponTestCasesをインポートする。"),
      STEP(2, "Dùng for (const tc of couponTestCases) để lặp qua từng bộ dữ liệu.", "Use for (const tc of couponTestCases) to loop through each data set.", "for (const tc of couponTestCases)を使い各データセットをループする。"),
      STEP(3, "Bên trong vòng lặp, gọi test() với tên động ghép theo tc.name/tc.code/tc.expected.", "Inside the loop, call test() with a dynamic name built from tc.name/tc.code/tc.expected.", "ループ内で、tc.name/tc.code/tc.expectedから組み立てた動的な名前でtest()を呼ぶ。"),
      STEP(4, "Trong thân test, nhập tc.code vào ô mã giảm giá, bấm áp dụng, rồi so sánh với tc.expected.", "Inside the test body, fill tc.code into the coupon field, click apply, then compare against tc.expected.", "テスト本体でtc.codeをクーポン欄に入力し、適用をクリックし、tc.expectedと比較する。"),
      CODE("javascript", "// tests/coupon.spec.js\nconst { test, expect } = require('@playwright/test');\nconst { couponTestCases } = require('../fixtures/coupon-test-data');\n\ntest.describe('ShopEasy - Ap dung ma giam gia (data-driven)', () => {\n  for (const tc of couponTestCases) {\n    test(`ma giam gia [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`, async ({ page }) => {\n      await page.goto('https://shopeasy.vn/thanh-toan');\n      await page.locator('#coupon-input').fill(tc.code);\n      await page.locator('#btn-apply-coupon').click();\n      await expect(page.locator('#coupon-message')).toHaveText(tc.expected);\n    });\n  }\n});"),
      P("Chú ý: chỉ có DUY NHẤT 1 khối test() được viết ra trong code, nhưng khi chạy, Playwright sẽ hiện đúng 8 ca test độc lập trong báo cáo — mỗi ca ứng với 1 dòng trong mảng testCases, có tên riêng, kết quả riêng. Đây chính là sức mạnh của data-driven testing: viết ít, kiểm tra được nhiều.",
        "Notice: there's only ONE test() block written in the code, but when run, Playwright reports exactly 8 independent test cases — each matching one row in the testCases array, with its own name and its own result. This is exactly the power of data-driven testing: write less, verify more.",
        "注目：コードにはtest()ブロックがただ1つしか書かれていませんが、実行するとPlaywrightはレポートにちょうど8個の独立したテストケースを表示します——testCases配列の各行に対応し、それぞれ独自の名前と結果を持ちます。これこそがデータ駆動テストの力です：少なく書いて、多く検証する。"),
    ] },
  { heading: { vi: "8. Mở rộng: đọc bộ dữ liệu từ file JSON", en: "8. Extending: reading data from a JSON file", ja: "8. 拡張：JSONファイルからデータを読み込む" },
    blocks: [
      P("Khi bộ dữ liệu lớn dần, hoặc cần người không viết code (BA, tester manual) cùng bổ sung mã giảm giá cần kiểm tra, ta nên tách mảng ra một file JSON riêng, đọc bằng module fs có sẵn của Node.js. Việc này giúp cập nhật dữ liệu không đòi hỏi đụng vào code test — chỉ cần sửa file JSON.",
        "As the data set grows, or when non-coders (BAs, manual testers) need to add coupon codes to check, we should split the array into a separate JSON file, read using Node.js's built-in fs module. This lets data updates happen without touching the test code — only the JSON file needs editing.",
        "データセットが大きくなる、あるいはコードを書けない人（BA、手動テスター）が確認すべきクーポンコードを追加する必要がある場合、配列をNode.js標準のfsモジュールで読み込む別のJSONファイルに分離すべきです。これによりデータの更新にテストコードを触る必要がなくなり、JSONファイルを直すだけで済みます。"),
      CODE("json", "[\n  { \"name\": \"hop-le - ma con han\", \"code\": \"SUMMER10\", \"expected\": \"Ap dung thanh cong, giam 10%\" },\n  { \"name\": \"khong-hop-le - ma khong ton tai\", \"code\": \"ABCXYZ\", \"expected\": \"Ma khong hop le\" },\n  { \"name\": \"het-han - ma tung dung\", \"code\": \"TET2024\", \"expected\": \"Ma da het han\" },\n  { \"name\": \"rong - khong nhap gi\", \"code\": \"\", \"expected\": \"Vui long nhap ma giam gia\" }\n]"),
      CODE("javascript", "// tests/coupon-from-json.spec.js\nconst fs = require('fs');\nconst path = require('path');\nconst { test, expect } = require('@playwright/test');\n\nconst couponTestCases = JSON.parse(\n  fs.readFileSync(path.join(__dirname, '../fixtures/coupon-test-data.json'), 'utf-8')\n);\n\ntest.describe('ShopEasy - Ap dung ma giam gia (doc tu JSON)', () => {\n  for (const tc of couponTestCases) {\n    test(`ma giam gia [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`, async ({ page }) => {\n      await page.goto('https://shopeasy.vn/thanh-toan');\n      await page.locator('#coupon-input').fill(tc.code);\n      await page.locator('#btn-apply-coupon').click();\n      await expect(page.locator('#coupon-message')).toHaveText(tc.expected);\n    });\n  }\n});"),
      TIP("Logic vòng lặp và tên test ở file này gần như GIỐNG HỆT chương 7 — chỉ khác cách nạp dữ liệu (đọc JSON thay vì import mảng JS). Đây chính là minh chứng: dữ liệu và logic thật sự tách biệt.", "The loop logic and test naming in this file are almost IDENTICAL to chapter 7 — the only difference is how data is loaded (reading JSON instead of importing a JS array). This is direct proof that data and logic are truly separated.", "このファイルのループロジックとテスト命名は第7章とほぼ同一です——違うのはデータの読み込み方法（JS配列のインポートではなくJSONの読み込み）だけです。これこそデータとロジックが本当に分離されている証拠です。"),
    ] },
  { heading: { vi: "9. Tình huống 1: copy-paste 20 test gần giống nhau", en: "9. Situation 1: copy-pasting 20 nearly identical tests", ja: "9. シーン1：ほぼ同じ20個のテストのコピペ" },
    blocks: [
      SITUATION("Bạn được giao viết test cho ô mã giảm giá ShopEasy. Bạn viết test đầu tiên chạy ổn, rồi copy-paste ra thêm 19 file/test tương tự, mỗi lần chỉ đổi giá trị mã nhập và câu kiểm tra thông báo mong đợi.", "You're assigned to test ShopEasy's coupon field. Your first test runs fine, so you copy-paste it into 19 more similar files/tests, each time only changing the input code value and the expected message check.",
        "Vài tuần sau, sếp yêu cầu thêm 1 bước kiểm tra: sau khi áp dụng mã, phải kiểm tra thêm số tiền cuối cùng hiển thị đúng. Vì có tới 20 file gần giống nhau, bạn phải mở từng file để thêm dòng assert mới, mất gần trọn buổi và vô tình bỏ sót 2 file khiến bug lọt qua production.", "A few weeks later, your manager asks for one more check: after applying the code, also verify the displayed final total is correct. With 20 nearly identical files, you must open each one to add the new assert line, spending almost a full session and accidentally missing 2 files, letting a bug slip into production.",
        "ShopEasyのクーポン欄をテストするよう任される。最初のテストはうまく動くので、それをコピペして19個の類似ファイル・テストを作り、毎回入力コードの値と期待メッセージのチェックだけを変える。",
        "数週間後、上司からもう1つ確認を追加するよう求められる：コード適用後、表示される最終合計金額が正しいかも確認すること。ほぼ同一の20ファイルがあるため、各ファイルを開いて新しいassert行を追加せねばならず、ほぼ丸1回分の作業時間がかかり、うっかり2ファイルを見落として本番環境にバグが混入してしまう。"),
      SOLVE("Gộp 20 test thành 1 mảng testCases[] (như chương 6) và 1 vòng lặp for...of + test() duy nhất (như chương 7). Khi cần thêm bước kiểm tra số tiền cuối cùng, chỉ cần thêm đúng 1 dòng expect() trong thân vòng lặp — cả 20 bộ dữ liệu tự động áp dụng kiểm tra mới, không sót file nào.", "Merge the 20 tests into a single testCases[] array (as in chapter 6) and one for...of + test() loop (as in chapter 7). When a check for the final total is needed, add exactly one expect() line inside the loop body — all 20 data sets automatically apply the new check, with no file left out.", "20個のテストを1つのtestCases[]配列（第6章）と1つのfor...of + test()ループ（第7章）にまとめる。最終合計金額の確認が必要になったとき、ループ本体にexpect()の行をちょうど1つ追加するだけで、20個のデータセット全てが自動的に新しいチェックを適用し、見落とすファイルはなくなる。"),
      P("Đây là ví dụ rõ nhất về chi phí thật của việc copy-paste test: không phải khi viết lần đầu, mà là mỗi lần logic kiểm tra cần thay đổi sau đó. Đầu tư gộp thành data-driven ngay từ khi có 3-4 test tương tự nhau rẻ hơn rất nhiều so với việc rà 20 file mỗi khi cần sửa.",
        "This is the clearest example of the real cost of copy-pasting tests: not when writing them the first time, but every time the verification logic needs to change afterward. Consolidating into data-driven form as soon as you have 3-4 similar tests is far cheaper than hunting through 20 files every time a fix is needed.",
        "これはテストのコピペの本当のコストを最も明確に示す例です：初めて書くときではなく、その後検証ロジックを変える必要が出るたびにです。3〜4個の似たテストができた時点でデータ駆動形式にまとめる方が、修正のたびに20ファイルを探し回るよりもはるかに安上がりです。"),
      IMG(m_kanban, "Bảng theo dõi nợ kỹ thuật do copy-paste test gần giống nhau, và quá trình gộp về data-driven", "A board tracking technical debt from copy-pasted near-identical tests, and the process of merging into data-driven form", "ほぼ同じテストのコピペによる技術的負債と、データ駆動形式への統合過程を追跡するボード"),
      RECAP(["Copy-paste test = chi phí sửa nhân lên theo số file", "Data-driven biến 'sửa N chỗ' thành 'sửa đúng 1 chỗ trong vòng lặp'"],
        ["Copy-pasted tests = fix cost multiplies by file count", "Data-driven turns 'fix N places' into 'fix exactly one spot inside the loop'"],
        ["テストのコピペ＝修正コストがファイル数分に増える", "データ駆動は『N箇所を直す』を『ループ内のたった1箇所を直す』に変える"]),
    ] },
  { heading: { vi: "10. Tình huống 2 & lỗi hay gặp, mẹo, câu hỏi thường gặp", en: "10. Situation 2 & common mistakes, tips, FAQ", ja: "10. シーン2・よくある失敗・コツ・よくある質問" },
    blocks: [
      SITUATION("Bộ test data-driven của bạn chạy 8 bộ dữ liệu cho ô mã giảm giá, nhưng tất cả đều dùng tên cố định test('kiem tra ma giam gia', ...) cho mọi lần lặp.", "Your data-driven suite runs 8 data sets for the coupon field, but all of them use the fixed name test('check coupon code', ...) for every iteration.",
        "CI báo '7 passed, 1 failed - kiem tra ma giam gia'. Vì tên giống hệt ở cả 8 dòng log, bạn không biết bộ dữ liệu nào gây lỗi — phải chạy lại từng bộ dữ liệu một cách thủ công để tìm ra, tốn gần 20 phút chỉ để xác định vị trí lỗi.", "CI reports '7 passed, 1 failed - check coupon code'. Since the name is identical across all 8 log lines, you don't know which data set caused the failure — you must manually re-run each data set one by one to find it, wasting nearly 20 minutes just locating the bug.",
        "データ駆動スイートはクーポン欄用に8個のデータセットを実行するが、すべての反復で固定名test('クーポンコードを確認', ...)を使っている。",
        "CIは『7 passed, 1 failed - クーポンコードを確認』と報告する。8行のログすべてで名前が同一のため、どのデータセットが失敗の原因か分からない——手動で1つずつデータセットを再実行して特定せねばならず、バグの位置を突き止めるだけでほぼ20分を費やす。"),
      SOLVE("Đổi sang đặt tên test động như ở chương 5 và 7: test(`ma giam gia [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`). Lần chạy tiếp theo, log CI hiện rõ đúng dòng 'ma giam gia [het-han - ma tung dung]: ... failed', biết ngay bộ dữ liệu nào cần xem lại mà không cần chạy thử lại.", "Switch to dynamic test naming as in chapters 5 and 7: test(`coupon [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`). On the next run, the CI log clearly shows the line 'coupon [expired - previously valid]: ... failed', instantly identifying which data set needs review, without re-running anything.", "第5章・第7章のように動的なテスト名に切り替える：test(`coupon [${tc.name}]: \"${tc.code}\" => \"${tc.expected}\"`)。次回の実行では、CIログに『coupon [期限切れ - 以前は有効]: ... failed』という行がはっきり表示され、何も再実行せずどのデータセットを確認すべきか即座に分かる。"),
      PITFALL("Dùng 1 tên test cố định cho cả vòng lặp (không đưa dữ liệu vào tên) — khiến log CI không phân biệt được các lần lặp, phải đoán mò bộ dữ liệu nào fail.", "Using one fixed test name for the whole loop (without embedding data into it) — this makes CI logs indistinguishable between iterations, forcing you to guess which data set failed.", "ループ全体で1つの固定テスト名を使う（データを名前に埋め込まない）——CIログが反復間で区別できなくなり、どのデータセットが失敗したか推測せざるを得なくなる。"),
      PITFALL("Nhồi if/else phức tạp trong thân vòng lặp để 'đoán' xử lý riêng theo từng bộ dữ liệu, thay vì để trường expected trong dữ liệu tự mô tả kết quả mong đợi.", "Stuffing complex if/else inside the loop to 'guess' special handling per data set, instead of letting the data's expected field describe the expected result itself.", "データの'expected'フィールドに期待結果を語らせる代わりに、ループ本体に複雑なif/elseを詰め込んでデータセットごとに『推測』した特別処理をすること。"),
      TIP("Khi thêm 1 trường dữ liệu mới (ví dụ finalPrice để kiểm tra số tiền cuối), thêm luôn trường đó vào TẤT CẢ các dòng trong bảng dữ liệu, kể cả khi giá trị là null/không áp dụng — tránh vòng lặp bị lỗi vì thiếu trường ở một vài dòng.", "When adding a new data field (e.g. finalPrice to check the final total), add it to EVERY row in the data table, even when the value is null/not applicable — this avoids the loop breaking due to a missing field in a few rows.", "新しいデータフィールド（例：最終金額を確認するfinalPrice）を追加するとき、値がnull/適用外であっても表の全行に追加しよう——一部の行でフィールドが欠けてループが壊れるのを防げます。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Chuẩn bị dữ liệu test automation cho người mới", "Preparing test data for automation for beginners", "chuan-bi-du-lieu-test-automation-cho-nguoi-moi", "初心者のための自動化テストデータの準備"),
      INTERNAL("Assertion — kiểm chứng kết quả cho người mới", "Assertions — verifying results for beginners", "assertion-kiem-chung-ket-qua-cho-nguoi-moi", "初心者のためのアサーション（結果検証）"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割・境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học data-driven testing qua ô mã giảm giá của app TMĐT ShopEasy: vì sao copy-paste nhiều test gần giống nhau tốn công bảo trì, nguyên tắc tách dữ liệu khỏi logic bằng mảng/JSON, cách chọn bộ dữ liệu hợp lệ/không hợp lệ/biên, cách đặt tên ca test theo dữ liệu để CI báo lỗi rõ ràng, và cách viết vòng lặp for...of + test() bằng Playwright có thể chạy thật. Hai tình huống thật cho thấy chi phí khi copy-paste test (sửa 20 file) so với khi có data-driven (sửa đúng 1 chỗ), cùng cách đặt tên test giúp debug nhanh hơn nhiều.",
        "You just learned data-driven testing through ShopEasy's coupon field: why copy-pasting many nearly identical tests costs maintenance effort, the principle of separating data from logic using arrays/JSON, how to choose valid/invalid/boundary data sets, how to name test cases after data so CI reports failures clearly, and how to write a real, runnable for...of + test() loop in Playwright. Two real situations showed the cost of copy-pasted tests (fixing 20 files) versus data-driven (fixing exactly one spot), plus how test naming makes debugging much faster.",
        "ShopEasyのクーポン欄を通じてデータ駆動テストを学びました：ほぼ同じテストのコピペがなぜ保守の手間がかかるか、配列/JSONを使ってデータとロジックを分離する原則、正常値/異常値/境界値データセットの選び方、CIが失敗を明確に報告するようデータにちなんでテストケースを命名する方法、そしてPlaywrightで実際に動くfor...of + test()ループの書き方。2つの実例は、テストのコピペのコスト（20ファイルを修正）とデータ駆動の場合（たった1箇所を修正）の違い、そしてテスト命名がデバッグをはるかに速くする様子を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về Page Object Model (tách locator/hành động khỏi test) và cách kết hợp POM với data-driven testing để bộ test automation vừa dễ bảo trì vừa bao phủ được nhiều trường hợp. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into the Page Object Model (separating locators/actions from tests) and how to combine POM with data-driven testing so your automation suite is both maintainable and covers many cases. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、Page Object Model（ロケーター/操作をテストから分離する）と、それをデータ駆動テストと組み合わせて、自動化スイートを保守しやすくかつ多くのケースをカバーできるようにする方法を学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const DATADRIVEN_01 = makeDoc({
  slug: "data-driven-testing-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "data-driven testing",
  keywords: ["data-driven testing", "tham so hoa test", "automation testing", "playwright for of test", "chay test nhieu bo du lieu cho nguoi moi"],
  coverLabel: "NGƯỜI MỚI · DATA-DRIVEN · TMĐT",
  crumb: "Data-driven testing cho người mới",
  metaTitle: { vi: "Data-driven testing cho người mới", en: "Data-driven testing for beginners", ja: "初心者向けデータ駆動テスト" },
  metaDescription: {
    vi: "Data-driven testing cho người mới: tách dữ liệu khỏi logic qua mã giảm giá ShopEasy, dùng mảng/JSON, vòng lặp for...of Playwright, có code và trắc nghiệm.",
    en: "Data-driven testing for beginners: separating data from test logic through ShopEasy's coupon field, using arrays/JSON and a for...of loop in Playwright, with runnable code and a quiz.",
    ja: "初心者向けデータ駆動テスト：ShopEasyのクーポン欄を通じて配列/JSONとPlaywrightのfor...ofループでデータとテストロジックを分離、動くコードとクイズ付きで解説。",
  },
  title: {
    vi: "Data-driven testing cho người mới: chạy 1 kịch bản với nhiều bộ dữ liệu (có code chạy được)",
    en: "Data-driven testing for beginners: running one script with many data sets (with runnable code)",
    ja: "初心者のためのデータ駆動テスト：1つのスクリプトを多数のデータセットで実行する（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học data-driven testing qua app TMĐT ShopEasy. Vì sao cần tách dữ liệu khỏi logic test, cách dùng mảng/JSON, đặt tên ca test theo dữ liệu, viết vòng lặp for...of + test() bằng Playwright chạy được, hai tình huống thật (copy-paste 20 test, tên test mơ hồ khi fail), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn data-driven testing through the ShopEasy e-commerce app. Why separate data from test logic, how to use arrays/JSON, naming test cases after data, writing a runnable for...of + test() loop in Playwright, two real situations (copy-pasting 20 tests, vague failure names), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでデータ駆動テストを学ぶ。データをテストロジックから分離する理由、配列/JSONの使い方、データにちなんだテストケースの命名、Playwrightで動くfor...of + test()ループの書き方、2つの実例（20個のテストのコピペ、失敗時の曖昧なテスト名）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách áp dụng data-driven testing cho test tự động", steps: [
    { name: "Tách dữ liệu ra khỏi logic test", text: "Gom mã nhập + kết quả mong đợi vào 1 mảng/JSON riêng, viết logic kiểm tra đúng 1 lần." },
    { name: "Viết vòng lặp for...of + test()", text: "Lặp qua từng bộ dữ liệu, sinh ra 1 ca test tương ứng, đặt tên theo dữ liệu." },
    { name: "Mở rộng khi dữ liệu lớn dần", text: "Tách bảng dữ liệu ra file JSON/CSV riêng, đọc bằng fs.readFileSync khi cần." },
  ] },
  pages,
});

export const AU_DATADRIVEN_01 = [DATADRIVEN_01];
