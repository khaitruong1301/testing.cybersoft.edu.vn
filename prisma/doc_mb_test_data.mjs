// doc_mb_test_data.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Chuẩn bị dữ liệu kiểm thử (Test Data) — vì sao cần test data, các loại (hợp lệ/không hợp lệ/
// biên/rỗng/đặc biệt), cách tạo & quản lý test data, dữ liệu mẫu cho các trường phổ biến
// (email, số điện thoại VN, ngày, tiền), và vì sao KHÔNG dùng dữ liệu thật/nhạy cảm để test.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: form thanh toán ShopEasy nhập bộ test data hợp lệ/biên/rỗng ──
const m_form = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán đơn hàng", [
    field(24, 20, 330, "Họ tên người nhận", "Trần Thị Mai", "normal"),
    field(372, 20, 330, "Số điện thoại", "0903118226", "normal"),
    field(24, 92, 330, "Ngày giao mong muốn", "29/02/2028", "focus"),
    field(372, 92, 330, "Mã giảm giá", "SALE50", "normal"),
    field(24, 164, 330, "Số lượng", "1", "focus"),
    field(372, 164, 330, "Địa chỉ giao hàng", "", "error"),
    btn(24, 244, 200, "Đặt hàng", "primary"),
    annotate(20, 82, 330, 62, "BIÊN: ngày nhuận 29/02"),
    annotate(20, 154, 330, 62, "BIÊN: số lượng = 1 (hàng cuối)"),
    annotate(368, 154, 330, 62, "RỖNG: bỏ trống trường bắt buộc"),
  ].join(""), { h: 320, accent: "#0f766e" }),
].join(""), { h: 376, title: "ShopEasy · TMĐT", accent: "#0f766e" });

// ── Mockup 2: các loại test data cần chuẩn bị ──
const m_types = grid("Các loại Test Data cần chuẩn bị", ["Loại dữ liệu", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Hợp lệ (Valid)", "Đúng định dạng, nằm trong phạm vi cho phép", "Email: mai.tran@test.cybersoft.vn"],
  ["Không hợp lệ (Invalid)", "Sai định dạng, sai kiểu dữ liệu", "SĐT: '090-abc-226' (lẫn chữ)"],
  ["Biên (Boundary)", "Giá trị nằm đúng ranh giới cho phép", "Tồn kho = 1 (sản phẩm cuối cùng)"],
  ["Rỗng (Empty/Null)", "Bỏ trống hoặc không có giá trị", "Địa chỉ giao hàng để trống"],
  ["Đặc biệt (Special)", "Ký tự đặc biệt, unicode, ngày hiếm gặp", "Họ tên có dấu, emoji, ngày 29/02"],
], { accent: "#0f766e" });

// ── Mockup 3: bảng mẫu bộ dữ liệu cho từng loại trường phổ biến ──
const m_field_grid = grid("Bộ dữ liệu mẫu cho từng trường phổ biến", ["Trường", "Hợp lệ", "Biên", "Không hợp lệ / rỗng"], [
  ["Email", "mai.tran@test.cybersoft.vn", "địa chỉ dài gần tối đa cho phép", "'tranmaimail.com' hoặc để trống"],
  ["SĐT (VN)", "0903118226 (đủ 10 số)", "đúng 10 số hoặc dạng +84903118226", "9 số, 11 số, hoặc lẫn chữ"],
  ["Ngày", "15/03/2026", "29/02 năm nhuận, 31/12, 01/01", "31/02, 32/13, hoặc để trống"],
  ["Tiền (VNĐ)", "500.000₫", "0₫ hoặc mức tối đa hệ thống cho phép", "-50.000₫ hoặc chữ thay vì số"],
], { accent: "#0f766e", note: "Với mỗi trường, luôn chuẩn bị đủ 4 nhóm: hợp lệ · biên · không hợp lệ · rỗng." });

// ── Mockup 4: ticket Jira của lỗi tìm ra vì có chuẩn bị dữ liệu biên ──
const m_jira = jira({
  key: "SE-11340", title: "Mã giảm giá vẫn áp dụng được sau 23:59 ngày hết hạn (thiếu test data biên theo thời gian)",
  type: "Bug", status: "New", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Đặt giờ hệ thống 00:05 ngày sau hạn 2) Vào thanh toán 3) Nhập mã SALE50 (hết hạn 23:59 hôm trước) 4) Bấm Áp dụng"],
    ["Kết quả mong đợi", "Hệ thống từ chối, báo 'Mã đã hết hạn'"],
    ["Kết quả thực tế", "Mã vẫn được áp dụng, giảm 50.000đ"],
    ["Bằng chứng", "screenshot-se11340.png, log-server.txt"],
  ],
});

// ── Mockup 5: dữ liệu thật vs dữ liệu test giả (ẩn danh hoá) ──
const m_anonymize = grid("Dữ liệu THẬT (không dùng) vs dữ liệu test GIẢ (nên dùng)", ["Trường", "Dữ liệu thật — KHÔNG dùng", "Dữ liệu test giả — nên dùng"], [
  ["Họ tên", "Nguyễn Văn Khách (khách thật)", "Trần Thị Mai (tên mẫu)"],
  ["SĐT", "0912xxxxxx (số cá nhân thật)", "0903118226 (số mẫu nội bộ)"],
  ["Email", "khach.that@gmail.com", "mai.tran@test.cybersoft.vn"],
  ["Địa chỉ", "địa chỉ nhà thật của khách", "12 Nguyễn Huệ, Q1, TP.HCM (địa chỉ mẫu)"],
], { accent: "#e11d48", note: "Dùng dữ liệu thật để test có thể làm lộ thông tin cá nhân của khách hàng — luôn thay bằng dữ liệu giả." });

// ── Mockup 6: bảng kanban theo dõi việc chuẩn bị test data cho các tính năng ──
const m_kanban = kanban("Bảng chuẩn bị Test Data (ShopEasy · Sprint 15)", [
  { name: "Cần chuẩn bị", cards: [
    { key: "TD-04", title: "Bộ data cho ô Mã giảm giá", sev: "High" },
    { key: "TD-07", title: "Bộ data ngày giao hàng", sev: "Medium" },
  ] },
  { name: "Đang soạn", cards: [
    { key: "TD-02", title: "Bộ data đăng ký tài khoản", sev: "High" },
  ] },
  { name: "Đã review", cards: [
    { key: "TD-01", title: "Bộ data ô Số lượng giỏ hàng", sev: "High" },
  ] },
  { name: "Sẵn sàng dùng", cards: [
    { key: "TD-00", title: "Bộ data thanh toán (5 loại)", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Test data (dữ liệu kiểm thử) là gì, khác gì test case?",
  "What is test data, and how is it different from a test case?",
  "Test data là các giá trị cụ thể bạn nhập vào khi thực hiện một ca kiểm thử — ví dụ email, số điện thoại, số lượng, ngày tháng. Test case là kịch bản mô tả CÁCH thực hiện và kết quả mong đợi; test data là NGUYÊN LIỆU để chạy kịch bản đó. Một test case tốt vẫn có thể thất bại nếu test data không đủ đa dạng (thiếu ca biên, rỗng, đặc biệt).",
  "Test data is the specific values you enter while executing a test case — e.g. an email, phone number, quantity, or date. A test case is the scenario describing HOW to execute it and the expected result; test data is the RAW MATERIAL used to run that scenario. A good test case can still fail to catch bugs if the test data isn't varied enough (missing boundary, empty, or special cases).",
  "テストデータとは何？テストケースとどう違う？",
  "テストデータとは、テストケースを実行する際に実際に入力する具体的な値のことです——メールアドレス、電話番号、数量、日付など。テストケースは実行方法と期待結果を記した台本であり、テストデータはその台本を動かすための材料です。良いテストケースでも、テストデータの種類（境界値・空欄・特殊値）が不足していればバグを見逃すことがあります。");
const faq2 = FAQ(
  "Vì sao không nên dùng dữ liệu khách hàng thật (production) để test?",
  "Why shouldn't I use real customer (production) data for testing?",
  "Dữ liệu sản xuất chứa thông tin cá nhân thật (tên, số điện thoại, email, địa chỉ) của khách hàng. Dùng nó trên môi trường test/staging — vốn thường ít bảo mật hơn — có thể khiến thông tin bị lộ, hoặc vô tình gửi SMS/email thật tới khách trong lúc test. Ngoài ra nhiều quy định bảo vệ dữ liệu cá nhân cấm việc này. Luôn dùng dữ liệu giả (fake) được thiết kế riêng cho việc test.",
  "Production data contains customers' real personal information (name, phone, email, address). Using it on a test/staging environment — which is usually less secure — can leak that information, or accidentally send a real SMS/email to a customer during testing. Many personal-data-protection regulations also forbid this. Always use fake data designed specifically for testing.",
  "なぜ本番（プロダクション）の顧客データをテストに使ってはいけない？",
  "本番データには顧客の実際の個人情報（氏名、電話番号、メール、住所）が含まれます。通常セキュリティが弱いテスト/ステージング環境でそれを使うと、情報が漏えいしたり、テスト中に誤って本物の顧客へSMSやメールを送ってしまう恐れがあります。多くの個人情報保護規則でもこれは禁止されています。常にテスト専用に作った偽データを使いましょう。");
const faq3 = FAQ(
  "Làm sao quản lý bộ test data để dùng lại nhiều lần, không phải nghĩ lại mỗi lần test?",
  "How do I manage a test data set so I can reuse it instead of re-thinking it every time?",
  "Lưu bộ test data thành một file dùng chung (spreadsheet/CSV) với các cột: Trường, Giá trị, Loại (hợp lệ/biên/rỗng/không hợp lệ/đặc biệt), Kết quả mong đợi. Đặt tên rõ ràng theo tính năng (vd 'test-data-dang-ky.csv'). Sau mỗi lần chạy, dọn/reset dữ liệu đã tạo (xoá tài khoản test, khôi phục tồn kho) để không ảnh hưởng lần test sau, và cập nhật file khi tính năng thay đổi.",
  "Save the test data set into a shared file (spreadsheet/CSV) with columns: Field, Value, Type (valid/boundary/empty/invalid/special), Expected result. Name it clearly by feature (e.g. 'test-data-signup.csv'). After each run, clean up/reset the data you created (delete test accounts, restore stock) so it doesn't affect the next run, and update the file whenever the feature changes.",
  "何度も考え直さずに使い回せるよう、テストデータをどう管理すればいい？",
  "テストデータを共有ファイル（スプレッドシート/CSV）に保存し、列を『項目・値・種類（有効/境界/空/無効/特殊）・期待結果』にしましょう。機能ごとに分かりやすい名前を付けます（例：'test-data-signup.csv'）。実行後は作成したデータ（テストアカウントの削除、在庫の復元）を整理し、次の実行に影響しないようにし、機能変更時はファイルも更新します。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Test data (dữ liệu kiểm thử) là gì?", en: "What is test data?", ja: "テストデータとは何？" },
    options: [
      { vi: "Các giá trị cụ thể được nhập vào khi thực hiện một ca kiểm thử", en: "The specific values entered while executing a test case", ja: "テストケースを実行する際に入力する具体的な値" },
      { vi: "Kịch bản mô tả các bước thực hiện kiểm thử", en: "The scenario describing the steps to execute a test", ja: "テストの実行手順を記した台本" },
      { vi: "Báo cáo tổng kết kết quả kiểm thử", en: "A summary report of test results", ja: "テスト結果のまとめレポート" },
      { vi: "Tên gọi khác của môi trường staging", en: "Another name for the staging environment", ja: "ステージング環境の別名" },
    ], correct: 0,
    explain: { vi: "Test data là nguyên liệu cụ thể (email, SĐT, số lượng...) dùng để chạy một ca kiểm thử, khác với test case là kịch bản.", en: "Test data is the concrete material (email, phone, quantity...) used to run a test case, unlike a test case which is the scenario.", ja: "テストデータはテストケース（台本）とは異なり、実行に使う具体的な材料（メール、電話番号、数量など）です。" },
  }),
  mcq({
    q: { vi: "Vì sao cần chuẩn bị dữ liệu BIÊN (boundary) khi test, ví dụ Số lượng tồn kho = 1?", en: "Why prepare BOUNDARY data when testing, e.g. Stock quantity = 1?", ja: "なぜ境界値（boundary）データ、例えば在庫数量=1を準備すべき？" },
    options: [
      { vi: "Vì giá trị biên trông đẹp hơn trong báo cáo", en: "Because boundary values look nicer in reports", ja: "レポートで見栄えが良いから" },
      { vi: "Vì lỗi rất dễ xảy ra ở đúng ranh giới cho phép, nơi lập trình viên dễ tính sai", en: "Because bugs commonly occur right at the allowed boundary, where developers easily miscalculate", ja: "許容範囲のちょうど境界でバグが起きやすく、開発者が計算を誤りやすいから" },
      { vi: "Vì hệ thống luôn từ chối giá trị biên", en: "Because the system always rejects boundary values", ja: "システムは常に境界値を拒否するから" },
      { vi: "Vì giá trị biên không cần kiểm thử", en: "Because boundary values don't need testing", ja: "境界値はテスト不要だから" },
    ], correct: 1,
    explain: { vi: "Ranh giới cho phép (như hàng cuối cùng trong kho) là nơi logic dễ sai lệch nhất, nên rất cần dữ liệu biên để bắt lỗi.", en: "The allowed boundary (like the last item in stock) is where logic is most likely to be off, so boundary data is essential to catch bugs.", ja: "許容範囲の境界（在庫の最後の1個など）はロジックが最もずれやすい箇所なので、境界データが不可欠です。" },
  }),
  mcq({
    q: { vi: "Đâu là một ví dụ đúng cho dữ liệu RỖNG (empty) khi test form đăng ký?", en: "Which is a correct example of EMPTY data when testing a signup form?", ja: "登録フォームのテストで正しい『空（empty）』データの例はどれ？" },
    options: [
      { vi: "Nhập số điện thoại là '0903118226'", en: "Entering phone number '0903118226'", ja: "電話番号に'0903118226'を入力" },
      { vi: "Để trống ô Địa chỉ giao hàng rồi bấm Đặt hàng", en: "Leaving the Delivery address field blank then clicking Order", ja: "配送先住所を空欄のまま注文をクリック" },
      { vi: "Nhập số lượng = -2", en: "Entering quantity = -2", ja: "数量に-2を入力" },
      { vi: "Nhập email chứa emoji", en: "Entering an email containing an emoji", ja: "絵文字入りのメールを入力" },
    ], correct: 1,
    explain: { vi: "Dữ liệu rỗng là bỏ trống hoàn toàn một trường bắt buộc, khác với dữ liệu không hợp lệ (sai định dạng) hay đặc biệt (ký tự lạ).", en: "Empty data means completely leaving a required field blank, different from invalid data (wrong format) or special data (unusual characters).", ja: "空データとは必須項目を完全に未入力にすることで、無効データ（誤形式）や特殊データ（特殊文字）とは異なります。" },
  }),
  mcq({
    q: { vi: "Vì sao KHÔNG nên dùng dữ liệu khách hàng thật (production) để test trên môi trường staging?", en: "Why should you NOT use real customer (production) data to test on staging?", ja: "なぜステージング環境のテストに本番（実際の顧客）データを使ってはいけない？" },
    options: [
      { vi: "Vì dữ liệu thật chạy chậm hơn dữ liệu giả", en: "Because real data runs slower than fake data", ja: "本物のデータは偽データより処理が遅いから" },
      { vi: "Vì có thể làm lộ thông tin cá nhân của khách hoặc gửi nhầm SMS/email thật cho họ", en: "Because it can leak customers' personal information or accidentally send them a real SMS/email", ja: "顧客の個人情報が漏えいしたり、誤って本物のSMS/メールを送ってしまう恐れがあるから" },
      { vi: "Vì dữ liệu thật không thể nhập vào form", en: "Because real data can't be entered into a form", ja: "本物のデータはフォームに入力できないから" },
      { vi: "Vì dữ liệu thật luôn gây lỗi hệ thống", en: "Because real data always crashes the system", ja: "本物のデータは必ずシステムをクラッシュさせるから" },
    ], correct: 1,
    explain: { vi: "Môi trường test/staging thường kém bảo mật hơn production; dùng dữ liệu thật ở đó có nguy cơ lộ thông tin khách và vi phạm quy định bảo vệ dữ liệu.", en: "Test/staging environments are usually less secure than production; using real data there risks leaking customer info and breaking data-protection rules.", ja: "テスト/ステージング環境は通常本番より安全性が低く、そこで実データを使うと顧客情報漏えいやデータ保護規則違反のリスクがあります。" },
  }),
  mcq({
    q: { vi: "Số điện thoại di động Việt Nam hợp lệ (dùng làm dữ liệu hợp lệ) thường có bao nhiêu chữ số?", en: "A valid Vietnamese mobile phone number (used as valid data) usually has how many digits?", ja: "有効なベトナムの携帯電話番号（有効データとして使う）は通常何桁？" },
    options: [
      { vi: "8 chữ số", en: "8 digits", ja: "8桁" },
      { vi: "9 chữ số", en: "9 digits", ja: "9桁" },
      { vi: "10 chữ số", en: "10 digits", ja: "10桁" },
      { vi: "13 chữ số", en: "13 digits", ja: "13桁" },
    ], correct: 2,
    explain: { vi: "Số di động Việt Nam chuẩn có đủ 10 chữ số (bắt đầu bằng 0); dùng số ít hơn hoặc nhiều hơn là ca kiểm thử BIÊN/không hợp lệ.", en: "A standard Vietnamese mobile number has exactly 10 digits (starting with 0); fewer or more digits become a BOUNDARY/invalid test case.", ja: "標準的なベトナムの携帯番号は0から始まる10桁です。それより少ない/多い桁数は境界値/無効なテストケースになります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Test data (dữ liệu kiểm thử) là các giá trị cụ thể bạn nhập vào khi chạy một ca kiểm thử — và chuẩn bị TỐT bộ test data quan trọng không kém việc viết đúng test case. Bài này bám trang thanh toán của app TMĐT ShopEasy: bạn học 5 loại test data (hợp lệ/không hợp lệ/biên/rỗng/đặc biệt), cách tạo & quản lý bộ dữ liệu dùng lại được, dữ liệu mẫu cho các trường phổ biến (email, số điện thoại, ngày, tiền), và vì sao tuyệt đối không dùng dữ liệu khách hàng thật để test. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Test data is the specific values you enter while running a test case — and preparing a GOOD test data set matters just as much as writing a correct test case. This follows ShopEasy's checkout page: you'll learn 5 types of test data (valid/invalid/boundary/empty/special), how to create and manage a reusable data set, sample data for common fields (email, phone, date, money), and why you must never use real customer data for testing. Lots of visuals and a quiz at the end.",
        "テストデータとは、テストケースを実行する際に実際に入力する具体的な値のことです——良いテストデータ一式を準備することは、正しいテストケースを書くのと同じくらい重要です。本記事はECアプリShopEasyの決済画面に沿い、5種類のテストデータ（有効/無効/境界/空/特殊）、再利用できるデータ一式の作り方と管理法、よくある項目（メール、電話番号、日付、金額）のサンプルデータ、そして実際の顧客データを絶対にテストに使ってはいけない理由を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Nhiều người mới nghĩ rằng viết đúng test case là đủ, còn dữ liệu nhập vào cứ 'gõ đại cho có' là xong. Thực tế thì ngược lại: cùng một test case, nếu dữ liệu bạn nhập luôn là 'Trần Thị Mai, 0903118226, số lượng 2' thì bạn mãi mãi không phát hiện được lỗi xảy ra khi tên có emoji, số điện thoại thiếu 1 số, hay số lượng đúng bằng tồn kho cuối cùng. Chuẩn bị test data chính là bước quyết định bạn kiểm thử NÔNG hay SÂU. Chúng ta sẽ học qua trang thanh toán thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! Many beginners think writing a correct test case is enough, and the data you type in can just be 'anything that fills the box'. In reality it's the opposite: with the same test case, if the data you enter is always 'Tran Thi Mai, 0903118226, quantity 2', you'll never catch the bug that appears when the name has an emoji, the phone number is missing a digit, or the quantity equals the last item in stock. Preparing test data is exactly what determines whether your testing is SHALLOW or DEEP. We'll learn through ShopEasy's real checkout page, with visuals and hands-on practice.",
        "こんにちは、初心者さん！多くの初心者は、正しいテストケースさえ書けば十分で、入力するデータは『とりあえず埋めればいい』と考えがちです。実際は逆です：同じテストケースでも、常に『Trần Thị Mai、0903118226、数量2』というデータばかり入力していては、名前に絵文字が入る、電話番号が1桁足りない、数量がちょうど在庫最後の1個であるといった場合に起きるバグを永遠に見つけられません。テストデータの準備こそ、あなたのテストが浅いか深いかを決める要因です。実際のShopEasy決済画面を通じて、図と実習付きで学びます。"),
      IMG(m_form, "Màn hình test: trang thanh toán ShopEasy với bộ test data biên và rỗng được đánh dấu", "Screen under test: ShopEasy checkout with boundary and empty test data highlighted", "テスト対象画面：境界値・空データを示したShopEasyの決済画面"),
      DEF("Test Data", "các giá trị cụ thể (email, số điện thoại, ngày, số lượng, tiền...) được dùng làm đầu vào khi thực hiện một ca kiểm thử.",
        "the specific values (email, phone, date, quantity, money...) used as input when executing a test case.",
        "テストケースを実行する際の入力として使う具体的な値（メール、電話番号、日付、数量、金額など）。"),
    ] },
  { heading: { vi: "2. Vì sao chuẩn bị test data lại quan trọng", en: "2. Why preparing test data matters", ja: "2. テストデータ準備がなぜ重要か" },
    blocks: [
      P("Hãy hình dung test case như một công thức nấu ăn — nó nói bạn làm gì theo thứ tự nào. Nhưng nếu nguyên liệu (test data) lúc nào cũng chỉ là 1 loại rau quen thuộc, bạn sẽ không bao giờ biết món ăn phản ứng ra sao với nguyên liệu lạ. Tương tự, cùng một test case 'Đặt hàng thành công', nếu bạn chỉ thử với dữ liệu 'đẹp' (đúng định dạng, số lượng vừa phải), bạn đang bỏ sót phần lớn các tình huống người dùng thật sẽ gặp.",
        "Think of a test case as a recipe — it tells you what to do and in what order. But if the ingredient (test data) is always the same familiar vegetable, you'll never know how the dish reacts to an unusual ingredient. Similarly, with the same test case 'Order succeeds', if you only try it with 'nice' data (correctly formatted, a reasonable quantity), you're missing most of the situations real users will actually run into.",
        "テストケースをレシピだと考えてみましょう——何をどの順番で行うかを教えてくれます。しかし材料（テストデータ）がいつも同じ見慣れた野菜だけなら、変わった材料に対して料理がどう反応するか永遠に分かりません。同様に、同じ『注文成功』というテストケースでも、いつも『きれいな』データ（正しい形式、ほどよい数量）だけで試していては、実際のユーザーが遭遇する状況の大半を見逃してしまいます。"),
      IMG(m_kanban, "Bảng chuẩn bị Test Data theo từng tính năng của ShopEasy trước khi vào giai đoạn kiểm thử", "A board tracking test data preparation per ShopEasy feature before the test phase", "テストフェーズ前、ShopEasyの各機能ごとのテストデータ準備ボード"),
      P("Chuẩn bị test data trước khi test còn giúp bạn TIẾT KIỆM thời gian: thay vì vừa test vừa nghĩ ra dữ liệu (dễ bỏ sót loại quan trọng), bạn có sẵn một bộ dữ liệu đủ 5 loại (hợp lệ, không hợp lệ, biên, rỗng, đặc biệt) và chỉ việc chạy lần lượt. Nó cũng giúp đồng đội DÙNG LẠI được bộ dữ liệu của bạn cho lần test hồi quy sau, thay vì mỗi người tự nghĩ một kiểu.",
        "Preparing test data before testing also SAVES time: instead of inventing data on the fly while testing (easy to miss important types), you have a ready set covering all 5 types (valid, invalid, boundary, empty, special) and just run through them one by one. It also lets teammates REUSE your data set for the next regression test, instead of everyone inventing their own.",
        "テスト前にテストデータを準備しておくと時間の節約にもなります：テスト中にその場でデータを考える（重要な種類を見落としやすい）代わりに、5種類（有効・無効・境界・空・特殊）を網羅したデータ一式を用意し、順に実行するだけで済みます。またチームメンバーが次回の回帰テストであなたのデータ一式を使い回せるようになり、各自が別々に考える無駄も減ります。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo việc chuẩn bị test data", en: "3. Why beginners need to master preparing test data", ja: "3. 初心者がテストデータ準備を習得すべき理由" },
    blocks: [
      P("Người dùng thật của ShopEasy không chỉ có 'Trần Thị Mai' — họ có tên viết hoa toàn bộ, tên có ký tự nước ngoài, số điện thoại gõ nhầm, ngày sinh nhập lộn xộn. Nếu bộ test data của bạn nghèo nàn, bạn chỉ đang kiểm tra một góc rất nhỏ của thực tế, dù test case của bạn có viết hay đến đâu.",
        "ShopEasy's real users aren't just 'Tran Thi Mai' — they have names in all caps, names with foreign characters, mistyped phone numbers, dates entered in a jumbled order. If your test data set is thin, you're only checking a tiny corner of reality, no matter how well-written your test case is.",
        "ShopEasyの実際のユーザーは『Trần Thị Mai』だけではありません——全て大文字の名前、外国語の文字が入った名前、入力ミスした電話番号、順番がバラバラな生年月日を持つ人もいます。テストデータ一式が乏しければ、テストケースがどれだけ良く書かれていても、現実のほんの一部しか確認できていません。"),
      P("Với riêng bạn — người mới — kỹ năng chuẩn bị test data cho thấy bạn hiểu 'kiểm thử là để tìm ra điều bất ngờ', không chỉ chạy qua loa. Đây cũng là câu hỏi phỏng vấn phổ biến: 'Cho một ô nhập ngày sinh, hãy liệt kê bộ test data bạn sẽ dùng'. Trả lời đủ 5 loại (hợp lệ, không hợp lệ, biên, rỗng, đặc biệt) cho thấy tư duy hệ thống, không chỉ nhớ lý thuyết suông.",
        "For you specifically — a beginner — the skill of preparing test data shows you understand that 'testing is about finding the unexpected', not just going through the motions. It's also a common interview question: 'Given a date-of-birth field, list the test data you'd use.' Covering all 5 types (valid, invalid, boundary, empty, special) shows systematic thinking, not just rote theory.",
        "特に初心者のあなたにとって、テストデータ準備のスキルは『テストとは予想外のことを見つけるためのもの』であり、形だけこなすものではないという理解を示します。また定番の面接質問でもあります：『生年月日欄について、使用するテストデータを挙げてください』。5種類（有効・無効・境界・空・特殊）全てを答えられれば、丸暗記でなく体系的な思考力を示せます。"),
      P("Và quan trọng nhất: một bộ test data tốt chính là cách bạn CHỦ ĐỘNG bắt lỗi trước khi khách hàng gặp phải, thay vì để lỗi lọt ra production rồi mới biết. Đầu tư đúng mức vào việc chuẩn bị dữ liệu là bạn đang nâng cao chất lượng kiểm thử ngay từ bước đầu tiên — trước cả khi bấm nút chạy test.",
        "And most importantly: a good test data set is how you PROACTIVELY catch bugs before customers hit them, instead of finding out only after a bug escapes to production. Investing properly in preparing data raises the quality of your testing from the very first step — before you even click 'run test'.",
        "そして最も重要なのは、良いテストデータ一式こそが、本番でバグが発覚してから気づくのではなく、顧客が遭遇する前に能動的にバグを捕まえる方法だということです。データ準備に適切に投資することは、テスト実行ボタンを押すより前の、最初の一歩からテストの質を高めることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: 5 loại test data cần nhớ", en: "4. Prepare: the 5 types of test data to remember", ja: "4. 準備：覚えるべき5種類のテストデータ" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt để bắt đầu — chỉ cần một danh sách 5 loại test data để không bỏ sót góc nào khi chuẩn bị dữ liệu cho bất kỳ trường nhập nào.",
        "You don't need special tools to start — just a checklist of the 5 test data types so you don't miss any angle when preparing data for any input field.",
        "始めるのに特別なツールは不要です——どんな入力項目にもデータを漏れなく準備するための5種類のチェックリストがあれば十分です。"),
      STEP(1, "Mở tính năng cần test (ví dụ trang thanh toán ShopEasy); liệt kê từng trường nhập.", "Open the feature to test (e.g. ShopEasy's checkout page); list each input field.", "テストする機能（例：ShopEasyの決済画面）を開き、各入力項目を列挙する。"),
      STEP(2, "Với mỗi trường, chuẩn bị đủ 5 loại: hợp lệ, không hợp lệ, biên, rỗng, đặc biệt.", "For each field, prepare all 5 types: valid, invalid, boundary, empty, special.", "各項目について、有効・無効・境界・空・特殊の5種類を用意する。"),
      STEP(3, "Ghi lại kết quả mong đợi cho mỗi loại dữ liệu trước khi chạy, để dễ so sánh khi test.", "Write the expected result for each data type before running, for easy comparison during testing.", "実行前に各データ種類の期待結果を書いておき、テスト時に比較しやすくする。"),
      TRY("Chọn một trường nhập bất kỳ trong app bạn dùng (vd ô 'Mã bưu điện') và viết đủ 5 loại test data cho nó.", "Pick any input field in an app you use (e.g. a 'Postal code' field) and write all 5 test data types for it.", "使っているアプリの任意の入力項目（例：『郵便番号』欄）を選び、5種類のテストデータをすべて書こう。"),
      PITFALL("Chỉ chuẩn bị dữ liệu HỢP LỆ vì nghĩ 'ai cũng nhập đúng'. Bỏ sót biên/rỗng/đặc biệt khiến nhiều lỗi thật (số lượng cuối kho, ngày nhuận, ký tự lạ) lọt qua mà không hay biết.",
        "Only preparing VALID data because you assume 'everyone enters correctly'. Missing boundary/empty/special cases lets many real bugs (last stock item, leap-year date, unusual characters) slip through unnoticed.",
        "『みんな正しく入力する』と思い込み有効データだけ準備すること。境界・空・特殊を見落とすと、実際のバグ（在庫最後の1個、うるう年の日付、特殊文字）が知らぬ間に漏れます。"),
      IMG(m_types, "5 loại test data cần chuẩn bị, minh hoạ trên các trường của ShopEasy", "The 5 types of test data to prepare, illustrated on ShopEasy's fields", "準備すべき5種類のテストデータ、ShopEasyの項目で例示"),
    ] },
  { heading: { vi: "5. Cách tạo & quản lý test data (thực hành)", en: "5. Creating & managing test data (hands-on)", ja: "5. テストデータの作成と管理（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào ô 'Số lượng' và ô 'Mã giảm giá' trong giỏ hàng ShopEasy — làm theo thứ tự dưới đây để có một bộ test data đầy đủ, dùng lại được cho lần test sau.",
        "Now let's apply it for real to the 'Quantity' and 'Coupon code' fields in ShopEasy's cart — follow the order below to get a full, reusable test data set for the next test run.",
        "では、ShopEasyのカートにある『数量』と『クーポンコード』項目に実際に適用しましょう——以下の順に沿って、次回のテストにも再利用できる完全なテストデータ一式を作りましょう。"),
      STEP(1, "Liệt kê 5 loại dữ liệu cần cho từng trường: hợp lệ, không hợp lệ, biên, rỗng, đặc biệt.", "List the 5 data types needed for each field: valid, invalid, boundary, empty, special.", "各項目に必要な5種類のデータを列挙する：有効・無効・境界・空・特殊。"),
      STEP(2, "Viết giá trị cụ thể cho mỗi loại, ưu tiên dữ liệu GIẢ (email đuôi @test.cybersoft.vn, SĐT mẫu nội bộ) thay vì sao chép dữ liệu khách hàng thật.", "Write a concrete value for each type, preferring FAKE data (an @test.cybersoft.vn email, an internal sample phone) instead of copying real customer data.", "各種類に対し具体的な値を書く。実際の顧客データをコピーせず、偽データ（@test.cybersoft.vnのメール、社内サンプル電話番号など）を優先する。"),
      STEP(3, "Lưu bộ test data vào một file dùng chung (spreadsheet/CSV) kèm cột 'Loại dữ liệu' và 'Kết quả mong đợi'.", "Save the test data set into a shared file (spreadsheet/CSV) with 'Data type' and 'Expected result' columns.", "テストデータ一式を共有ファイル（スプレッドシート/CSV）に保存し、『データ種類』と『期待結果』の列を付ける。"),
      STEP(4, "Sau khi chạy xong, dọn/reset dữ liệu đã tạo (xoá tài khoản test, khôi phục tồn kho) để không ảnh hưởng lần test tiếp theo.", "After running, clean up/reset the data you created (delete test accounts, restore stock) so it doesn't affect the next test run.", "実行後は作成したデータ（テストアカウントの削除、在庫の復元）を整理し、次回のテストに影響しないようにする。"),
      CODE("text", "BO TEST DATA - o 'Ma giam gia' (gio hang ShopEasy)\nGia tri            | Loai            | Ket qua mong doi\nSALE50 (con han)   | Hop le           | Giam 50.000d, tong tien cap nhat dung\n(de trong)         | Rong             | Nut Ap dung bi vo hieu hoac bao 'nhap ma'\nSALE9999XYZ        | Khong hop le     | Bao 'Ma khong ton tai', khong giam gia\nSALE50 (23:59 ngay het han) | Bien   | Van con hieu luc dung den giay cuoi cung\nSALE50😊#          | Dac biet         | Tu choi ky tu dac biet, khong crash trang"),
      TRY("Viết thêm 1 dòng test data nữa cho ô 'Mã giảm giá' mà bảng trên chưa có (gợi ý: mã viết thường 'sale50' có được chấp nhận không?).", "Write one more test data row for 'Coupon code' not in the table above (hint: is a lowercase 'sale50' accepted?).", "上の表にない『クーポンコード』のテストデータをもう1行書こう（ヒント：小文字の'sale50'は受け付けられるか？）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: thiếu dữ liệu biên nên bỏ sót lỗi", en: "6. Situation 1: missing boundary data misses a bug", ja: "6. シーン1：境界データ不足でバグを見逃す" },
    blocks: [
      SITUATION("Đội chỉ chuẩn bị test data với tồn kho 'nhiều' (10, 50, 100 sản phẩm) cho tính năng đặt hàng — mọi ca đều pass, ai cũng yên tâm release.", "The team only prepared test data with 'plenty' of stock (10, 50, 100 items) for the ordering feature — every case passes, everyone feels safe to release.",
        "Lên production, hai khách cùng mua sản phẩm CUỐI CÙNG (tồn kho = 1) trong cùng một phút. Cả hai đều đặt hàng thành công, nhưng kho thực tế chỉ có 1 cái — một đơn buộc phải huỷ, khách rất bực mình.",
        "In production, two customers buy the LAST item (stock = 1) within the same minute. Both orders succeed, but the actual stock only has 1 unit — one order must be cancelled, and the customer is very unhappy.",
        "チームは『十分な』在庫（10、50、100個）だけで注文機能のテストデータを用意——全ケース合格、安心してリリース。",
        "本番環境で、2人の顧客が同じ1分以内に最後の1個（在庫=1）を購入。両方の注文が成功するが実際の在庫は1個のみ——片方をキャンセルせざるを得ず、顧客は非常に不満に。"),
      SOLVE("Bổ sung test data BIÊN cho mọi tính năng liên quan tồn kho: tồn kho = 1, = 0, và mô phỏng 2 người mua cùng lúc — không chỉ test với số lượng tồn kho 'thoải mái'.", "Add BOUNDARY test data for every stock-related feature: stock = 1, = 0, and simulate two simultaneous buyers — not just testing with 'comfortable' stock quantities.", "在庫に関わる全機能に境界値テストデータを追加：在庫=1、=0、そして同時に2人が購入するケースをシミュレート——『余裕のある』在庫数だけでテストしない。"),
      P("Đây là bài học lớn nhất trong chương này: bộ test data chỉ toàn dữ liệu 'thoải mái' sẽ không bao giờ lộ ra lỗi xảy ra ở ranh giới. Danh sách 5 loại ở chương 4 (đặc biệt là BIÊN) chính là công cụ giúp bạn chủ động đi tìm những góc như thế này, thay vì chờ khách hàng báo lỗi.",
        "This is the biggest lesson in this chapter: a test data set full of only 'comfortable' data will never reveal bugs that live at the boundary. The 5-type checklist from chapter 4 (especially BOUNDARY) is exactly the tool that lets you proactively hunt for angles like this, instead of waiting for a customer to report the bug.",
        "この章での最大の教訓です：『余裕のある』データばかりのテストデータ一式では、境界に潜むバグは決して見つかりません。第4章の5種類チェックリスト（特に境界値）は、顧客からの報告を待つのではなく、このような見落としを能動的に探すためのツールです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ chuẩn bị test data biên theo thời gian (mã giảm giá hết hạn)", "A bug ticket found via boundary test data around time (an expiring coupon)", "時間の境界値テストデータで見つかったバグチケット（期限切れクーポン）"),
      RECAP(["Test data chỉ toàn giá trị 'thoải mái' sẽ bỏ sót lỗi ở ranh giới", "Luôn chuẩn bị dữ liệu biên cho các trường liên quan số lượng/thời gian/giới hạn"],
        ["Test data made only of 'comfortable' values misses boundary bugs", "Always prepare boundary data for fields tied to quantity/time/limits"],
        ["『余裕のある』値だけのテストデータは境界のバグを見逃す", "数量・時間・上限に関わる項目には常に境界データを用意する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: dùng dữ liệu thật khiến lộ thông tin khách", en: "7. Situation 2: using real data leaks customer information", ja: "7. シーン2：実データの使用で顧客情報が漏えい" },
    blocks: [
      SITUATION("Để test nhanh, bạn export danh sách 200 khách hàng thật từ hệ thống production rồi import thẳng vào môi trường staging để làm test data.", "To test quickly, you export a list of 200 real customers from production and import it directly into staging as test data.",
        "Môi trường staging không được bảo mật chặt như production. Một thành viên khác vô tình chạy job gửi email khuyến mãi thử nghiệm — và 200 khách hàng thật nhận được email test với nội dung lỗi, kèm cả số điện thoại của họ lộ ra trong log công khai.",
        "The staging environment isn't secured as tightly as production. Another team member accidentally runs a test promotional-email job — and 200 real customers receive a broken test email, with their phone numbers also exposed in a public log.",
        "早くテストするため、本番から200人分の実際の顧客リストをエクスポートし、そのままステージング環境にテストデータとしてインポート。",
        "ステージング環境は本番ほど厳重に保護されていない。別のメンバーが誤ってテスト用プロモーションメールのジョブを実行——200人の実際の顧客が壊れた内容のテストメールを受信し、電話番号も公開ログに漏えいしてしまう。"),
      SOLVE("Xoá ngay dữ liệu thật khỏi staging, báo sự cố cho quản lý bảo mật dữ liệu, và thay bằng bộ test data GIẢ (tên/email/SĐT mẫu) được thiết kế riêng, không bao giờ export dữ liệu production để test nữa.", "Immediately delete the real data from staging, report the incident to the data security lead, and replace it with a FAKE test data set (sample names/emails/phones) designed specifically for testing — never export production data for testing again.", "実データを直ちにステージングから削除し、データセキュリティ担当に報告、テスト専用に設計した偽のテストデータ一式（サンプル名・メール・電話）に置き換える——今後、本番データをテストのためにエクスポートしないこと。"),
      P("Ví dụ này cho thấy vì sao mục 'tránh dùng dữ liệu thật/nhạy cảm' luôn phải đi kèm với việc chuẩn bị test data, không phải là bước phụ. Một bộ dữ liệu GIẢ được thiết kế tốt (họ tên mẫu, email đuôi @test, SĐT nội bộ) vẫn đủ đa dạng để bắt lỗi, mà không mang theo rủi ro làm lộ thông tin của bất kỳ khách hàng thật nào.",
        "This example shows why 'avoid using real/sensitive data' must always go hand in hand with preparing test data, not be a side note. A well-designed FAKE data set (sample names, @test emails, internal sample phones) is still varied enough to catch bugs, without carrying the risk of leaking any real customer's information.",
        "この例は、『実データ・機密データを使わない』ことがテストデータ準備における付随事項ではなく、常に一体であるべき理由を示しています。よく設計された偽データ一式（サンプル名、@testのメール、社内サンプル電話番号）でも十分な多様性でバグを捕まえられ、実際の顧客情報を漏えいさせるリスクを負いません。"),
      IMG(m_anonymize, "So sánh dữ liệu thật (không dùng) và dữ liệu test giả (nên dùng) cho các trường phổ biến", "Comparing real data (don't use) and fake test data (do use) for common fields", "よくある項目における実データ（使用不可）とテスト用偽データ（推奨）の比較"),
      TRY("Nghĩ thêm một trường 'nhạy cảm' khác trong app bạn dùng (số CMND/CCCD, số thẻ ngân hàng...) và đề xuất cách thay nó bằng dữ liệu giả an toàn.", "Think of another 'sensitive' field in an app you use (ID number, bank card number...) and propose a safe fake replacement.", "使っているアプリの別の『機密』項目（身分証番号、銀行カード番号など）を考え、安全な偽データへの置き換え方を提案しよう。"),
    ] },
  { heading: { vi: "8. Dữ liệu mẫu cho các trường phổ biến", en: "8. Sample data for common fields", ja: "8. よくある項目のサンプルデータ" },
    blocks: [
      P("Một số trường xuất hiện ở gần như mọi form (email, số điện thoại, ngày, tiền) — biết trước bộ dữ liệu mẫu cho chúng giúp bạn tiết kiệm rất nhiều thời gian nghĩ lại mỗi lần gặp form mới.",
        "Some fields appear in almost every form (email, phone number, date, money) — knowing a ready sample data set for them saves a lot of time re-thinking every time you meet a new form.",
        "ほぼ全てのフォームに現れる項目（メール、電話番号、日付、金額）があります——それらのサンプルデータ一式を事前に知っておくと、新しいフォームに出会うたびに考え直す時間を大幅に節約できます。"),
      IMG(m_field_grid, "Bộ dữ liệu mẫu cho các trường phổ biến: email, số điện thoại VN, ngày, tiền", "Sample data set for common fields: email, VN phone number, date, money", "よくある項目のサンプルデータ一式：メール、ベトナムの電話番号、日付、金額"),
      P("Với ô EMAIL, ngoài dạng hợp lệ chuẩn, đừng quên các ca biên như địa chỉ dài gần tối đa hệ thống cho phép, hay email có dấu chấm/dấu cộng liên tiếp. Với SỐ ĐIỆN THOẠI Việt Nam, dữ liệu hợp lệ chuẩn có đủ 10 chữ số bắt đầu bằng 0; thiếu hoặc thừa 1 số là ca biên rất hay bị bỏ sót.",
        "For the EMAIL field, besides the standard valid form, don't forget boundary cases like an address that's nearly the system's maximum allowed length, or an email with consecutive dots/plus signs. For Vietnamese PHONE NUMBERS, standard valid data has exactly 10 digits starting with 0; missing or having one extra digit is a very often-missed boundary case.",
        "メール項目では、標準的な有効形式に加え、システムが許容するほぼ最大長のアドレスや、連続したドット/プラス記号を含むメールなどの境界ケースも忘れずに。ベトナムの電話番号では、標準的な有効データは0から始まる10桁ちょうどです。1桁足りない・多いは非常に見落とされやすい境界ケースです。"),
      P("Với ô NGÀY, hãy nhớ ca đặc biệt kinh điển: 29/02 chỉ tồn tại ở năm nhuận — rất nhiều hệ thống xử lý sai ca này. Với ô TIỀN, ngoài giá trị hợp lệ thông thường, luôn thử 0₫ (miễn phí/khuyến mãi) và mức tối đa hệ thống cho phép nhập, vì đây là nơi sai số hay xảy ra nhất khi tính tổng.",
        "For the DATE field, remember the classic special case: 29/02 only exists in a leap year — many systems handle this incorrectly. For the MONEY field, besides a normal valid value, always try 0₫ (free/promotion) and the maximum value the system allows, since this is where calculation errors happen most often.",
        "日付項目では、古典的な特殊ケースを覚えておきましょう：29日/2月はうるう年にしか存在せず、多くのシステムがこれを正しく処理できません。金額項目では、通常の有効値に加え、常に0₫（無料/プロモーション）とシステムが許容する最大値を試しましょう。ここが合計計算のミスが最も起きやすい箇所です。"),
      TIP("Lưu bộ dữ liệu mẫu 4 trường này (email/SĐT/ngày/tiền) thành file dùng chung — gần như mọi bài kiểm thử form sau này bạn đều cần đến chúng.", "Save this sample data set for the 4 fields (email/phone/date/money) into a shared file — you'll need it for almost every future form-testing task.", "この4項目（メール/電話/日付/金額）のサンプルデータ一式を共有ファイルに保存しよう——今後ほぼ全てのフォームテストで必要になります。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi chuẩn bị test data. Biết trước giúp bạn chuẩn bị dữ liệu hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when preparing test data. Knowing them helps you prepare data more efficiently without wasting too much time.",
        "初心者はテストデータ準備で共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にデータを準備できます。"),
      PITFALL("Sao chép nguyên dữ liệu khách hàng thật từ production 'cho nhanh' thay vì tạo dữ liệu giả — mang theo rủi ro lộ thông tin cá nhân rất lớn.", "Copying real customer data straight from production 'to save time' instead of creating fake data — carries a very large risk of leaking personal information.", "『早いから』と本番の実顧客データをそのままコピーし、偽データを作らないこと——個人情報漏えいの非常に大きなリスクを伴います。"),
      PITFALL("Chỉ chuẩn bị test data một lần rồi dùng mãi mãi, không cập nhật khi tính năng thay đổi (vd thêm quy tắc mã giảm giá mới) — khiến bộ dữ liệu cũ dần trở nên vô nghĩa.", "Preparing test data once and reusing it forever without updating when the feature changes (e.g. new coupon rules added) — making the old data set gradually meaningless.", "テストデータを一度だけ準備し、機能変更時（例：クーポンの新ルール追加）に更新せず永遠に使い続けること——古いデータ一式が次第に意味をなさなくなります。"),
      TIP("Trước khi thêm một dòng test data mới, tự hỏi: 'Đây là hợp lệ, không hợp lệ, biên, rỗng hay đặc biệt?' — gắn nhãn rõ ràng giúp bộ dữ liệu dễ đọc và dễ dùng lại cho cả nhóm.", "Before adding a new test data row, ask: 'Is this valid, invalid, boundary, empty, or special?' — clear labeling makes the data set easy to read and reuse for the whole team.", "新しいテストデータ行を追加する前に自問しよう：『これは有効・無効・境界・空・特殊のどれか？』——明確なラベル付けはデータ一式を読みやすくし、チーム全体で再利用しやすくします。"),
      IMG(m_types, "Nhắc lại 5 loại test data — dùng làm checklist khi thời gian có hạn", "Reminder of the 5 test data types — use as a checklist when time is limited", "5種類のテストデータの再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
      INTERNAL("Cách viết test case cho người mới", "How to write a test case for beginners", "cach-viet-test-case-cho-nguoi-moi", "初心者のためのテストケースの書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chuẩn bị test data qua trang thanh toán và giỏ hàng ShopEasy: 5 loại dữ liệu cần nhớ (hợp lệ, không hợp lệ, biên, rỗng, đặc biệt), cách tạo và quản lý một bộ dữ liệu dùng lại được, dữ liệu mẫu cho các trường phổ biến (email, SĐT VN, ngày, tiền), và hai tình huống thật cho thấy vì sao thiếu dữ liệu biên gây bỏ sót lỗi còn dùng dữ liệu thật lại gây lộ thông tin khách hàng. Đây là kỹ năng nền tảng giúp mọi ca kiểm thử của bạn tìm được nhiều lỗi giá trị hơn hẳn.",
        "You just learned how to prepare test data through ShopEasy's checkout page and cart: the 5 data types to remember (valid, invalid, boundary, empty, special), how to create and manage a reusable data set, sample data for common fields (email, VN phone, date, money), and two real situations showing why missing boundary data misses bugs while using real data leaks customer information. This foundational skill helps every test case of yours find far more valuable bugs.",
        "ShopEasyの決済画面とカートを通じて、テストデータの準備方法を学びました：覚えるべき5種類のデータ（有効・無効・境界・空・特殊）、再利用できるデータ一式の作成と管理法、よくある項目（メール、ベトナムの電話番号、日付、金額）のサンプルデータ、そして境界データ不足がバグの見逃しにつながり、実データの使用が顧客情報漏えいにつながる2つの実例。この土台スキルは、あなたのあらゆるテストケースがより価値あるバグを見つける助けになります。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật phân vùng tương đương và giá trị biên để chọn dữ liệu có hệ thống hơn, cùng cách kiểm thử form dữ liệu để áp dụng bộ test data này vào thực tế. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn equivalence partitioning and boundary value techniques to choose data more systematically, along with how to test data forms to apply this test data set in practice. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より体系的にデータを選ぶための同値分割・境界値分析の技法と、このテストデータ一式を実務に適用するためのフォームテストの方法を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const TEST_DATA_01 = makeDoc({
  slug: "chuan-bi-du-lieu-kiem-thu-test-data-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "test data",
  keywords: ["test data", "dữ liệu kiểm thử", "dữ liệu test", "chuẩn bị test data", "test data cho người mới"],
  coverLabel: "NGƯỜI MỚI · TEST DATA · TMĐT",
  crumb: "Chuẩn bị dữ liệu kiểm thử (Test Data)",
  metaTitle: { vi: "Chuẩn bị Test Data cho người mới (đủ 5 loại)", en: "Preparing test data for beginners", ja: "初心者向けテストデータ準備" },
  metaDescription: {
    vi: "Dữ liệu kiểm thử (test data) cho người mới: các loại hợp lệ, biên, rỗng, đặc biệt qua app ShopEasy, kèm dữ liệu mẫu email, SĐT, ngày, tiền và trắc nghiệm.",
    en: "Preparing test data for beginners: 5 types (valid/invalid/boundary/empty/special) via the ShopEasy app, sample data for email, phone, date, money, avoiding real data, with visuals and a quiz.",
    ja: "初心者向けテストデータ準備：ShopEasyアプリで有効・無効・境界・空・特殊の5種類、メール・電話・日付・金額のサンプルデータ、実データを避ける理由、図とクイズ付きで解説。",
  },
  title: {
    vi: "Chuẩn bị dữ liệu kiểm thử (Test Data) cho người mới: đủ 5 loại, không lộ thông tin thật (có trắc nghiệm)",
    en: "Preparing test data for beginners: all 5 types, without leaking real information (with quiz)",
    ja: "初心者のためのテストデータ準備：5種類を網羅し、実データを漏らさない（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cách chuẩn bị test data qua app TMĐT ShopEasy. 5 loại dữ liệu (hợp lệ, không hợp lệ, biên, rỗng, đặc biệt), cách tạo & quản lý bộ dữ liệu dùng lại được, dữ liệu mẫu cho email/SĐT VN/ngày/tiền, ví dụ lỗi thật do thiếu dữ liệu biên và do dùng dữ liệu thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to prepare test data through the ShopEasy e-commerce app. 5 data types (valid, invalid, boundary, empty, special), how to create and manage a reusable data set, sample data for email/VN phone/date/money, real bug examples from missing boundary data and using real data, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでテストデータの準備方法を学ぶ。5種類のデータ（有効・無効・境界・空・特殊）、再利用できるデータ一式の作成と管理、メール/ベトナムの電話/日付/金額のサンプルデータ、境界データ不足と実データ使用による実際のバグ例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chuẩn bị và quản lý test data", steps: [
    { name: "Liệt kê từng trường nhập của tính năng", text: "Xác định các trường cần chuẩn bị dữ liệu." },
    { name: "Chuẩn bị đủ 5 loại dữ liệu cho mỗi trường", text: "Hợp lệ, không hợp lệ, biên, rỗng, đặc biệt — ưu tiên dữ liệu giả." },
    { name: "Lưu và dọn dẹp bộ test data sau khi dùng", text: "Lưu file dùng chung, reset dữ liệu sau mỗi lần chạy để dùng lại được." },
  ] },
  pages,
});

export const MB_TEST_DATA_01 = [TEST_DATA_01];
