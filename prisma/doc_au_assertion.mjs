// doc_au_assertion.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Assertion & kiểm chứng kết quả — assertion là gì, vì sao phải kiểm chứng ĐÚNG điều quan trọng
// (không thừa/thiếu), hard vs soft assertion, so khớp text/số/trạng thái/URL, thông điệp lỗi rõ ràng,
// và cách tránh viết test "luôn xanh" (không assert gì thật sự). Practice-first, nhiều MOCKUP giao diện
// (ui_mock), có code Playwright chạy được. Gắn app TMĐT ShopEasy (trang giỏ hàng/kết quả thanh toán).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, btn, annotate, grid, jira, kanban } from "./ui_mock.mjs";

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

// ── Mockup 1: bảng các loại assertion phổ biến trong automation ──
const m_types = grid("Các loại assertion phổ biến khi test giao diện ShopEasy", ["Loại assertion", "Kiểm chứng cái gì", "Ví dụ trên ShopEasy"], [
  ["So khớp văn bản (text)", "Nội dung hiển thị đúng chuỗi mong đợi", "Tên sản phẩm hiển thị đúng 'Áo thun nam basic'"],
  ["So khớp số (number)", "Giá trị số đúng, không lệch làm tròn", "Tổng tiền giỏ hàng đúng 398.000"],
  ["Trạng thái phần tử (state)", "Phần tử có hiển thị/bật/tắt đúng không", "Nút 'Thanh toán' bị vô hiệu hoá khi giỏ hàng trống"],
  ["URL / điều hướng", "Trình duyệt đến đúng trang sau hành động", "Sau khi đặt hàng, URL chuyển sang /don-hang-thanh-cong"],
  ["Thuộc tính (attribute)", "Thuộc tính HTML đúng giá trị mong đợi", "Ảnh sản phẩm có alt mô tả đúng tên sản phẩm"],
  ["Số lượng phần tử (count)", "Số phần tử lặp lại đúng như kỳ vọng", "Giỏ hàng hiển thị đúng 3 dòng sản phẩm"],
], { accent: "#0891b2", note: "Chọn đúng loại assertion cho đúng điều cần kiểm chứng — assert sai loại dễ bỏ sót lỗi thật." });

// ── Mockup 2: màn hình kết quả thanh toán ShopEasy, annotate điểm cần assert ──
const m_result = browser("shopeasy.vn/don-hang-thanh-cong", [
  panel("ShopEasy · Đặt hàng thành công", [
    `<text x="24" y="40" font-size="15" font-weight="800" fill="#0f172a">Mã đơn hàng: #SE-88213</text>`,
    `<text x="24" y="70" font-size="13" fill="#334155">Trạng thái: Đã xác nhận</text>`,
    `<text x="24" y="100" font-size="13" fill="#334155">Tổng thanh toán: 398.000đ</text>`,
    btn(24, 130, 220, "Xem đơn hàng của tôi", "success"),
    annotate(20, 20, 320, 34, "Assert: mã đơn hàng khớp regex #SE-\\d+"),
    annotate(20, 60, 260, 30, "Assert: trạng thái = 'Đã xác nhận'"),
    annotate(20, 90, 260, 30, "Assert: tổng tiền = 398.000đ"),
    annotate(20, 122, 228, 48, "Assert: nút 'Xem đơn hàng' hiển thị"),
  ].join(""), { h: 300, accent: "#0891b2" }),
].join(""), { h: 356, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 3: bảng so sánh test CÓ assert thật vs test 'luôn xanh' ──
const m_greenfake = grid("Test CÓ assert thật vs test 'luôn xanh' (không kiểm chứng gì)", ["Tiêu chí", "Test 'luôn xanh'", "Test CÓ assert thật"], [
  ["Hành động", "Chỉ mở trang, không kiểm tra gì thêm", "Mở trang RỒI kiểm tra nội dung/trạng thái mong đợi"],
  ["Khi tính năng lỗi", "Vẫn báo PASS màu xanh dù dữ liệu sai", "Báo FAIL đỏ ngay khi kết quả không khớp mong đợi"],
  ["Giá trị thật sự", "Tạo cảm giác an toàn giả, không phát hiện bug", "Phát hiện đúng lúc dữ liệu/giao diện sai lệch"],
  ["Ví dụ ShopEasy", "await page.goto(cart) rồi kết thúc test", "await expect(cartTotal).toHaveText('398.000đ')"],
  ["Rủi ro dài hạn", "Đội ngũ tin tưởng nhầm vào bộ test không đáng tin", "Bộ test phản ánh đúng chất lượng sản phẩm"],
], { accent: "#0891b2", highlight: 1, note: "Test chạy xong không lỗi KHÔNG có nghĩa là tính năng đúng — phải có assertion mới gọi là kiểm chứng." });

// ── Mockup 4: ticket Jira ghi lại bug lọt production do thiếu assert ──
const m_jira = jira({
  key: "SE-14087", title: "Giỏ hàng cộng sai tổng tiền khi giảm giá, test tự động không phát hiện vì thiếu assert tổng tiền",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "production · web ShopEasy · Chrome 126"],
    ["Nguyên nhân", "Test 'apply-voucher.spec.js' chỉ kiểm tra thông báo 'Áp dụng mã thành công' hiển thị, KHÔNG assert tổng tiền sau giảm giá"],
    ["Ảnh hưởng", "Voucher tính sai 10% thành 100.000đ cố định, khách hàng bị trừ tiền sai, phát hiện qua khiếu nại chứ không qua CI"],
    ["Đề xuất", "Bổ sung expect(cartTotal).toHaveText() kiểm tra đúng số tiền sau khi áp voucher, không chỉ kiểm tra thông báo hiển thị"],
  ],
});

// ── Mockup 5: dashboard so sánh độ tin cậy bộ test trước/sau khi bổ sung assertion đầy đủ ──
const m_dashboard = grid("Độ tin cậy bộ test ShopEasy trước và sau khi bổ sung assertion đầy đủ", ["Chỉ số", "Trước (thiếu assert)", "Sau (assert đầy đủ)"], [
  ["Số test 'luôn xanh' phát hiện được", "0/40 (không ai để ý)", "0/40 (đã loại bỏ hết)"],
  ["Bug lọt production/tháng", "6 bug", "1 bug"],
  ["Thời gian phát hiện sai lệch dữ liệu", "Qua khiếu nại khách hàng (vài ngày)", "Ngay trong CI (vài phút)"],
  ["Niềm tin của team vào kết quả PASS", "Thấp — hay phải kiểm tra tay lại", "Cao — PASS nghĩa là thật sự đúng"],
], { accent: "#0891b2", note: "Assertion đầy đủ không làm test chạy chậm hơn đáng kể, nhưng tăng mạnh khả năng bắt lỗi thật." });

// ── Mockup 6: kanban các test đang thiếu assert cần bổ sung ──
const m_kanban = kanban("Rà soát test thiếu assertion đáng tin cậy (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14090", title: "checkout.spec.js chỉ goto(), chưa assert URL sau đặt hàng", sev: "High" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14087", title: "apply-voucher.spec.js thiếu assert tổng tiền sau giảm giá", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14079", title: "Bổ sung soft assertion cho trang kết quả đặt hàng", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14060", title: "cart.spec.js đã assert đủ số lượng + tổng tiền + trạng thái nút", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Assertion trong automation testing là gì?",
  "What is an assertion in automation testing?",
  "Assertion là câu lệnh kiểm chứng: so sánh kết quả thực tế (giá trị hiển thị trên giao diện, dữ liệu trả về...) với kết quả mong đợi, rồi báo PASS nếu khớp hoặc FAIL nếu không khớp. Không có assertion, một đoạn script chỉ 'chạy qua các bước' mà không thật sự kiểm tra điều gì cả — dù trình duyệt không báo lỗi kỹ thuật, tính năng vẫn có thể sai mà không ai biết.",
  "An assertion is a verification statement: it compares the actual result (a value shown on the UI, returned data...) with the expected result, then reports PASS if they match or FAIL if they don't. Without an assertion, a script only 'walks through steps' without actually checking anything — even if the browser reports no technical error, the feature could still be wrong and nobody would know.",
  "自動化テストにおけるアサーションとは何？",
  "アサーションとは検証文です：実際の結果（画面に表示された値、返されたデータなど）を期待される結果と比較し、一致すればPASS、一致しなければFAILと報告します。アサーションがなければ、スクリプトはただ『手順を通過する』だけで実際には何も検証していません——ブラウザが技術的なエラーを報告しなくても、機能が間違っている可能性があり誰も気づきません。");
const faq2 = FAQ(
  "Hard assertion và soft assertion khác nhau thế nào?",
  "What is the difference between hard assertion and soft assertion?",
  "Hard assertion (assert cứng) dừng test ngay khi kiểm chứng đầu tiên thất bại, các bước sau không chạy nữa. Soft assertion (assert mềm) ghi nhận thất bại nhưng vẫn cho test chạy tiếp để kiểm chứng các điều kiện còn lại, rồi báo cáo TẤT CẢ lỗi tìm được cùng lúc ở cuối test. Hard assertion phù hợp khi bước sau phụ thuộc vào bước trước còn đúng; soft assertion phù hợp khi muốn thấy toàn bộ bức tranh lỗi trong 1 lần chạy, ví dụ kiểm tra nhiều trường trên cùng 1 màn hình kết quả.",
  "Hard assertion stops the test immediately when the first check fails, so later steps never run. Soft assertion records the failure but lets the test keep running to verify the remaining conditions, then reports ALL the failures found together at the end. Hard assertion suits cases where a later step depends on the earlier one still being correct; soft assertion suits cases where you want to see the whole picture of failures in one run, e.g. checking many fields on the same result screen.",
  "ハードアサーションとソフトアサーションはどう違う？",
  "ハードアサーション（厳格な検証）は最初の検証が失敗した時点でテストを即座に停止し、以降のステップは実行されません。ソフトアサーション（緩やかな検証）は失敗を記録しつつテストを続行させ、残りの条件も検証したうえで、最後に見つかった失敗を全てまとめて報告します。ハードアサーションは後のステップが前のステップの正しさに依存する場合に適し、ソフトアサーションは同じ結果画面の複数フィールドを検証するなど、1回の実行で失敗の全体像を見たい場合に適します。");
const faq3 = FAQ(
  "Vì sao một test không có assertion vẫn có thể 'PASS' dù tính năng đang lỗi?",
  "Why can a test with no assertion still 'PASS' even when the feature is broken?",
  "Vì công cụ automation chỉ báo FAIL khi có một câu lệnh so sánh (assert/expect) không khớp, hoặc khi thao tác kỹ thuật thất bại (ví dụ không tìm thấy phần tử). Nếu script chỉ mở trang, điền form, bấm nút mà không có bất kỳ câu expect() nào kiểm tra kết quả, nó sẽ chạy hết các bước và kết thúc 'thành công' về mặt kỹ thuật — dù giá trị hiển thị trên màn hình sai hoàn toàn so với mong đợi. Đây gọi là test 'luôn xanh': trông như đang bảo vệ tính năng nhưng thực chất không kiểm chứng gì cả.",
  "Because the automation tool only reports FAIL when a comparison statement (assert/expect) doesn't match, or when a technical action fails (e.g. an element isn't found). If a script only opens a page, fills a form, clicks a button without any expect() checking the result, it will run through every step and finish 'successfully' from a technical standpoint — even if the value shown on screen is completely wrong. This is called an 'always green' test: it looks like it's protecting the feature but actually verifies nothing at all.",
  "アサーションのないテストが、機能が壊れているのになぜ『PASS』になり得る？",
  "自動化ツールは、比較文（assert/expect）が一致しない場合、または技術的な操作が失敗した場合（例：要素が見つからない）にのみFAILを報告するからです。スクリプトがページを開き、フォームに入力し、ボタンをクリックするだけで結果を検証するexpect()が一切なければ、全ステップを実行し技術的には『成功』して終わります——画面に表示された値が期待と完全に違っていても。これは『常に緑』のテストと呼ばれます：機能を守っているように見えて実は何も検証していません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Assertion trong automation testing có vai trò gì?", en: "What role does an assertion play in automation testing?", ja: "自動化テストにおいてアサーションはどんな役割を果たす？" },
    options: [
      { vi: "So sánh kết quả thực tế với kết quả mong đợi, rồi báo PASS/FAIL", en: "Compare the actual result with the expected result, then report PASS/FAIL", ja: "実際の結果を期待される結果と比較し、PASS/FAILを報告する" },
      { vi: "Tăng tốc độ chạy của trình duyệt khi test", en: "Speed up the browser while testing", ja: "テスト中のブラウザの実行速度を上げる" },
      { vi: "Tự động sinh dữ liệu test ngẫu nhiên", en: "Automatically generate random test data", ja: "ランダムなテストデータを自動生成する" },
      { vi: "Ghi lại video quá trình chạy test", en: "Record a video of the test run", ja: "テスト実行の動画を記録する" },
    ], correct: 0,
    explain: { vi: "Assertion chính là câu lệnh kiểm chứng: không có nó, test chỉ 'chạy qua' chứ không thật sự xác nhận điều gì đúng hay sai.", en: "An assertion is the verification statement: without it, a test just 'runs through' without truly confirming anything right or wrong.", ja: "アサーションは検証文そのものです。それがなければテストは『通過するだけ』で、正誤を実際には確認していません。" },
  }),
  mcq({
    q: { vi: "Test chỉ mở trang giỏ hàng ShopEasy rồi kết thúc, không có expect() nào — điều gì xảy ra khi tổng tiền tính sai?", en: "A test only opens ShopEasy's cart page then ends, with no expect() at all — what happens when the total is calculated wrong?", ja: "ShopEasyのカートページを開くだけで終わり、expect()が一切ないテスト——合計金額が誤って計算されたらどうなる？" },
    options: [
      { vi: "Test tự động báo FAIL vì phát hiện số liệu sai", en: "The test automatically reports FAIL because it detects the wrong number", ja: "誤った数値を検出して自動的にFAILを報告する" },
      { vi: "Test vẫn báo PASS vì không có câu lệnh nào kiểm chứng tổng tiền", en: "The test still reports PASS because no statement verifies the total", ja: "合計金額を検証する文がないため、テストは依然としてPASSを報告する" },
      { vi: "Trình duyệt tự đóng và huỷ kết quả test", en: "The browser automatically closes and discards the test result", ja: "ブラウザが自動的に閉じ、テスト結果が破棄される" },
      { vi: "Test sẽ chạy chậm lại đáng kể để cảnh báo", en: "The test will run noticeably slower to warn the team", ja: "警告のためテストが著しく遅くなる" },
    ], correct: 1,
    explain: { vi: "Không có assertion kiểm tra tổng tiền thì công cụ không có cơ sở để báo FAIL — đây chính là test 'luôn xanh'.", en: "Without an assertion checking the total, the tool has no basis to report FAIL — this is exactly an 'always green' test.", ja: "合計金額を検証するアサーションがなければ、ツールはFAILを報告する根拠がありません——まさに『常に緑』のテストです。" },
  }),
  mcq({
    q: { vi: "Điểm khác biệt cốt lõi giữa hard assertion và soft assertion là gì?", en: "What is the core difference between hard assertion and soft assertion?", ja: "ハードアサーションとソフトアサーションの核心的な違いは何？" },
    options: [
      { vi: "Hard assertion dừng test ngay khi thất bại; soft assertion ghi nhận rồi chạy tiếp để gom hết lỗi", en: "Hard assertion stops the test immediately on failure; soft assertion records it and keeps running to collect all failures", ja: "ハードアサーションは失敗時に即座にテストを停止し、ソフトアサーションは記録して実行を続け全ての失敗を集める" },
      { vi: "Hard assertion chỉ dùng cho số, soft assertion chỉ dùng cho text", en: "Hard assertion is only for numbers, soft assertion is only for text", ja: "ハードアサーションは数値専用、ソフトアサーションはテキスト専用" },
      { vi: "Soft assertion chạy nhanh hơn hard assertion gấp đôi", en: "Soft assertion runs twice as fast as hard assertion", ja: "ソフトアサーションはハードアサーションの2倍速く動く" },
      { vi: "Hard assertion không cần khai báo giá trị mong đợi", en: "Hard assertion doesn't need an expected value declared", ja: "ハードアサーションは期待値の宣言が不要" },
    ], correct: 0,
    explain: { vi: "Hard dừng ngay ở lỗi đầu tiên; soft cho phép kiểm tra hết các điều kiện còn lại rồi báo cáo toàn bộ lỗi cùng lúc.", en: "Hard stops right at the first failure; soft lets you check all remaining conditions then reports every failure together.", ja: "ハードは最初の失敗で即停止し、ソフトは残りの条件も検証したうえで全ての失敗をまとめて報告します。" },
  }),
  mcq({
    q: { vi: "Vì sao assert quá chặt vào một chuỗi text hay đổi (ví dụ banner khuyến mãi) lại dễ gây phiền toái?", en: "Why does asserting too strictly on a frequently-changing text string (e.g. a promo banner) tend to cause trouble?", ja: "頻繁に変わるテキスト文字列（例：プロモバナー）に厳しくアサートしすぎると、なぜ厄介になりやすい？" },
    options: [
      { vi: "Vì test sẽ báo FAIL mỗi khi nội dung khuyến mãi đổi, dù tính năng giỏ hàng vẫn hoạt động đúng", en: "Because the test will report FAIL every time the promo content changes, even though the cart feature still works correctly", ja: "カート機能が正しく動いていても、プロモ内容が変わるたびにテストがFAILを報告するから" },
      { vi: "Vì assert text luôn chạy chậm hơn assert số", en: "Because text assertions always run slower than number assertions", ja: "テキストのアサーションは数値のアサーションより常に遅いから" },
      { vi: "Vì Playwright không hỗ trợ assert text", en: "Because Playwright doesn't support text assertions", ja: "Playwrightはテキストのアサーションをサポートしないから" },
      { vi: "Vì assert text luôn báo PASS bất kể nội dung gì", en: "Because text assertions always report PASS regardless of content", ja: "テキストのアサーションは内容に関係なく常にPASSを報告するから" },
    ], correct: 0,
    explain: { vi: "Kiểm chứng đúng điều quan trọng nghĩa là chọn assert phần ổn định (tổng tiền, trạng thái nút...), không phải nội dung marketing hay đổi.", en: "Verifying what matters means asserting the stable parts (total, button state...), not marketing content that changes often.", ja: "重要な点を検証するとは、頻繁に変わるマーケティング文言ではなく、安定した部分（合計金額、ボタン状態など）をアサートすることです。" },
  }),
  mcq({
    q: { vi: "Một thông điệp lỗi assertion rõ ràng nên chứa những gì?", en: "What should a clear assertion error message contain?", ja: "明確なアサーションエラーメッセージには何が含まれるべき？" },
    options: [
      { vi: "Chỉ ghi 'Test thất bại' và không có thêm chi tiết", en: "Just write 'Test failed' with no further detail", ja: "『テスト失敗』とだけ書き、それ以上の詳細はない" },
      { vi: "Giá trị mong đợi, giá trị thực tế nhận được, và bối cảnh (đang kiểm chứng cái gì)", en: "The expected value, the actual value received, and the context (what is being verified)", ja: "期待値、実際に得られた値、そして文脈（何を検証しているか）" },
      { vi: "Toàn bộ mã nguồn của ứng dụng đang test", en: "The entire source code of the app under test", ja: "テスト対象アプリの全ソースコード" },
      { vi: "Ảnh chụp màn hình của mọi trang đã ghé qua trong phiên trình duyệt", en: "A screenshot of every page visited during the browser session", ja: "ブラウザセッション中に訪れた全ページのスクリーンショット" },
    ], correct: 1,
    explain: { vi: "Thông điệp lỗi tốt giúp người đọc hiểu ngay 'mong đợi gì — nhận được gì — ở đâu' mà không cần dò lại từng bước của script.", en: "A good error message immediately tells the reader 'what was expected — what was received — where', without needing to trace back through every script step.", ja: "良いエラーメッセージは、スクリプトの各ステップを追い直さなくても『何を期待し、何を得て、どこで』を読者にすぐ伝えます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ kiểm chứng", en: "1. TL;DR & the screen you'll verify", ja: "1. 要点と検証する画面" },
    blocks: [
      TLDR("Assertion là câu lệnh kiểm chứng: so sánh kết quả thực tế với kết quả mong đợi rồi báo PASS/FAIL — không có nó, script chỉ 'chạy qua' chứ không xác nhận gì cả. Bài này bám màn kết quả đặt hàng của app TMĐT ShopEasy: bạn học vì sao phải kiểm chứng đúng điều quan trọng (không thừa/thiếu), hard vs soft assertion, cách so khớp text/số/trạng thái/URL, viết thông điệp lỗi rõ ràng, và cách tránh test 'luôn xanh' không assert gì thật. Nhiều hình minh hoạ, code Playwright chạy được và trắc nghiệm cuối bài.",
        "An assertion is a verification statement: it compares the actual result with the expected one, then reports PASS/FAIL — without it, a script only 'walks through steps' without confirming anything. This article follows ShopEasy's order-result screen: you'll learn why you must verify what actually matters (not too much, not too little), hard vs soft assertion, how to match text/number/state/URL, how to write clear error messages, and how to avoid 'always green' tests that don't really assert anything. Lots of visuals, runnable Playwright code, and a quiz at the end.",
        "アサーションとは検証文です：実際の結果を期待される結果と比較し、PASS/FAILを報告します——それがなければスクリプトは『手順を通過する』だけで何も確認していません。本記事はECアプリShopEasyの注文結果画面に沿い、なぜ本当に重要な点を検証すべきか（多すぎず少なすぎず）、ハードとソフトのアサーション、テキスト/数値/状態/URLの照合方法、明確なエラーメッセージの書き方、そして何も検証していない『常に緑』のテストを避ける方法を学びます。図が豊富で、動くPlaywrightコードと最後にクイズ付き。"),
      P("Chào bạn mới! Khi bắt đầu học automation, phần lớn thời gian bạn sẽ tập trung vào việc điều khiển trình duyệt: mở trang, điền form, bấm nút. Nhưng có một sự thật ít ai nhắc tới ngay từ đầu: điều khiển trình duyệt thành công KHÔNG đồng nghĩa với việc tính năng đang hoạt động đúng. Chỉ khi bạn viết ra một câu lệnh so sánh — 'giá trị này PHẢI bằng giá trị kia' — thì test mới thật sự trở thành một phép kiểm chứng. Câu lệnh đó gọi là assertion. Chúng ta sẽ học qua màn kết quả đặt hàng thật của ShopEasy, có hình minh hoạ và code Playwright chạy được.",
        "Hi, newcomer! When you start learning automation, most of your time goes into controlling the browser: opening a page, filling a form, clicking a button. But there's a truth rarely mentioned early on: successfully controlling the browser does NOT mean the feature actually works correctly. Only when you write a comparison statement — 'this value MUST equal that value' — does the test truly become a verification. That statement is called an assertion. We'll learn through ShopEasy's real order-result screen, with visuals and runnable Playwright code.",
        "こんにちは、初心者さん！自動化を学び始めると、ほとんどの時間はブラウザの操作に費やされます：ページを開き、フォームに入力し、ボタンをクリックする。しかし早い段階ではあまり言われない真実があります：ブラウザの操作に成功したからといって、機能が正しく動いているとは限りません。『この値はあの値と等しくなければならない』という比較文を書いて初めて、テストは本当の検証になります。その文をアサーションと呼びます。ShopEasyの実際の注文結果画面を通じて、図と動くPlaywrightコード付きで学びましょう。"),
      IMG(m_result, "Màn hình kết quả đặt hàng ShopEasy, chú thích các điểm cần assert: mã đơn, trạng thái, tổng tiền, nút tiếp theo", "ShopEasy's order-result screen, annotated with what to assert: order id, status, total, next button", "ShopEasyの注文結果画面、アサートすべき点（注文ID、ステータス、合計金額、次のボタン）を注記"),
      DEF("Assertion", "câu lệnh kiểm chứng trong automation, so sánh giá trị thực tế nhận được với giá trị mong đợi, rồi báo test PASS nếu khớp hoặc FAIL nếu không khớp.",
        "a verification statement in automation that compares the actual value received with the expected value, then reports the test as PASS if they match or FAIL if they don't.",
        "自動化における検証文で、実際に得られた値を期待値と比較し、一致すればテストをPASS、一致しなければFAILと報告するもの。"),
    ] },
  { heading: { vi: "2. Vấn đề: điều khiển trình duyệt thành công chưa phải kiểm chứng", en: "2. The problem: controlling the browser isn't verification yet", ja: "2. 問題：ブラウザ操作の成功はまだ検証ではない" },
    blocks: [
      P("Hãy hình dung một script tự động: mở trang ShopEasy, thêm 1 sản phẩm vào giỏ, tăng số lượng lên 2, rồi kết thúc. Nếu không có bất kỳ câu expect() nào, script này sẽ 'chạy thành công' về mặt kỹ thuật — trình duyệt không báo lỗi, không phần tử nào bị thiếu. Nhưng nó KHÔNG hề trả lời câu hỏi quan trọng nhất: tổng tiền sau khi tăng số lượng có đúng không? Đây chính là khoảng trống mà nhiều người mới bỏ qua khi mới học automation.",
        "Imagine an automated script: open the ShopEasy page, add a product to the cart, increase the quantity to 2, then finish. Without any expect() statement, this script will 'run successfully' from a technical standpoint — the browser reports no error, no element is missing. But it does NOT answer the most important question at all: is the total after increasing quantity correct? This is exactly the gap many newcomers overlook when first learning automation.",
        "自動化スクリプトを想像してください：ShopEasyのページを開き、商品をカートに追加し、数量を2に増やして終了する。expect()文が一切なければ、このスクリプトは技術的には『正常に実行完了』します——ブラウザはエラーを報告せず、要素も欠けていません。しかしそれは最も重要な問いに全く答えていません：数量を増やした後の合計金額は正しいのか？これはまさに、自動化を学び始めたばかりの多くの初心者が見落とすギャップです。"),
      IMG(m_greenfake, "Bảng so sánh: test 'luôn xanh' chỉ điều khiển trình duyệt vs test có assertion thật sự kiểm chứng", "Comparison: an 'always green' test only controls the browser versus a test with real verifying assertions", "比較表：ブラウザ操作だけの『常に緑』テストと、本当に検証するアサーションを持つテスト"),
      P("Điều nguy hiểm hơn cả là test 'luôn xanh' này vẫn xuất hiện trong báo cáo CI với dấu tick màu xanh, y hệt các test đang kiểm chứng thật sự. Đội ngũ nhìn vào bảng kết quả sẽ tin rằng tính năng giỏ hàng đang hoạt động tốt — trong khi thực tế không ai kiểm tra điều đó cả. Sự an toàn này là GIẢ, và nó chỉ lộ ra khi khách hàng thật gặp lỗi trên production.",
        "What's even more dangerous is that this 'always green' test still shows up in the CI report with a green checkmark, exactly like tests that actually verify something. The team looking at the results dashboard will believe the cart feature works fine — when in reality nobody checked that at all. This safety is FALSE, and it only surfaces once a real customer hits the bug in production.",
        "さらに危険なのは、この『常に緑』のテストが、本当に検証しているテストと全く同じように、CIレポートに緑のチェックマークで表示され続けることです。結果ダッシュボードを見るチームは、カート機能が正常に動いていると信じてしまいます——実際には誰もそれを検証していないのに。この安全性は偽物であり、実際の顧客が本番環境でバグに遭遇して初めて露見します。"),
      DEF("Test 'luôn xanh'", "một kịch bản automation thực hiện đầy đủ các bước thao tác nhưng không có assertion kiểm chứng kết quả, nên luôn báo PASS bất kể tính năng có đúng hay không.",
        "an automation script that performs all the action steps but has no assertion to verify the result, so it always reports PASS regardless of whether the feature is actually correct.",
        "全ての操作手順を実行するが結果を検証するアサーションがなく、機能が実際に正しいかどうかにかかわらず常にPASSを報告する自動化スクリプト。"),
    ] },
  { heading: { vi: "3. Kiểm chứng đúng điều quan trọng: không thừa, không thiếu", en: "3. Verifying what actually matters: not too much, not too little", ja: "3. 本当に重要な点を検証する：多すぎず少なすぎず" },
    blocks: [
      P("Nguyên tắc cốt lõi khi viết assertion là chọn ĐÚNG điều cần kiểm chứng cho mục đích của test đó — không thiếu (bỏ sót điểm quan trọng, dẫn tới test 'luôn xanh' một phần) và không thừa (assert cả những chi tiết không liên quan, khiến test dễ vỡ vô cớ). Với màn kết quả đặt hàng ShopEasy, điều 'quan trọng' là: mã đơn hàng đúng định dạng, trạng thái là 'Đã xác nhận', và tổng tiền khớp với giỏ hàng trước đó.",
        "The core principle when writing assertions is choosing EXACTLY what matters for that test's purpose — not too little (missing important points, causing a partially 'always green' test) and not too much (asserting irrelevant details, making the test needlessly fragile). For ShopEasy's order-result screen, what 'matters' is: the order id has the correct format, the status is 'Confirmed', and the total matches the earlier cart.",
        "アサーションを書く際の核心原則は、そのテストの目的にとって本当に重要な点を正確に選ぶことです——少なすぎない（重要な点を見落とし、部分的に『常に緑』のテストになる）、多すぎない（無関係な詳細までアサートし、テストが不必要に壊れやすくなる）。ShopEasyの注文結果画面では、『重要』なのは：注文IDが正しい形式であること、ステータスが『確認済み』であること、合計金額が以前のカートと一致することです。"),
      IMG(m_types, "Bảng các loại assertion phổ biến: text, số, trạng thái, URL, thuộc tính, số lượng phần tử", "Table of common assertion types: text, number, state, URL, attribute, element count", "テキスト・数値・状態・URL・属性・要素数といった一般的なアサーションの種類の表"),
      P("Assert 'thừa' thường gặp nhất ở người mới là kiểm chứng luôn cả những nội dung hay thay đổi vì lý do không liên quan tới logic — ví dụ banner khuyến mãi, ngày giờ hiển thị, hay id nội bộ không ảnh hưởng nghiệp vụ. Mỗi lần nội dung đó đổi (dù tính năng vẫn đúng), test lại báo FAIL, khiến đội ngũ mất niềm tin và dần bỏ qua các cảnh báo đỏ — kể cả khi có bug thật.",
        "The most common 'excessive' assertion for beginners is verifying content that changes for reasons unrelated to the actual logic — like a promo banner, a displayed timestamp, or an internal id that doesn't affect the business outcome. Every time that content changes (even though the feature is still correct), the test reports FAIL, eroding the team's trust and causing them to gradually ignore red warnings — even when there's a real bug.",
        "初心者に最も多い『過剰な』アサーションは、実際のロジックとは無関係な理由で変わる内容——プロモバナー、表示される日時、業務結果に影響しない内部IDなど——を検証してしまうことです。その内容が変わるたびに（機能自体は正しいままでも）テストはFAILを報告し、チームの信頼を損ない、本物のバグがあっても赤い警告を徐々に無視するようになります。"),
      TIP("Trước khi assert bất cứ điều gì, tự hỏi: 'Nếu giá trị này sai, người dùng thật có bị ảnh hưởng không?' — nếu câu trả lời là có, đó là điều quan trọng cần assert.", "Before asserting anything, ask yourself: 'If this value is wrong, would real users actually be affected?' — if yes, that's what matters and deserves an assertion.", "何かをアサートする前に、『この値が間違っていたら、実際のユーザーに影響があるか？』と自問しよう——答えがイエスなら、それが検証すべき重要な点です。"),
    ] },
  { heading: { vi: "4. Hard assertion vs soft assertion", en: "4. Hard assertion vs soft assertion", ja: "4. ハードアサーションとソフトアサーション" },
    blocks: [
      P("Có 2 cách assertion xử lý khi thất bại. Hard assertion (assert cứng) — cách mặc định của expect() trong Playwright — sẽ DỪNG test ngay lập tức khi kiểm chứng đầu tiên không khớp; các bước sau đó không chạy nữa. Soft assertion (assert mềm) ghi nhận thất bại nhưng vẫn cho phép test chạy tiếp để kiểm tra các điều kiện còn lại, rồi báo cáo TOÀN BỘ lỗi tìm được cùng lúc khi test kết thúc.",
        "There are 2 ways an assertion handles a failure. Hard assertion — Playwright's default behavior for expect() — STOPS the test immediately when the first check doesn't match; the following steps never run. Soft assertion records the failure but still lets the test keep running to check the remaining conditions, then reports ALL the failures found together when the test ends.",
        "アサーションが失敗を処理する方法は2通りあります。ハードアサーション——Playwrightのexpect()のデフォルトの動作——は、最初の検証が一致しなかった時点でテストを即座に停止し、以降のステップは実行されません。ソフトアサーションは失敗を記録しつつテストを続行させて残りの条件も検証し、テスト終了時に見つかった全ての失敗をまとめて報告します。"),
      CODE("javascript", "// hard assertion (mac dinh cua Playwright): dung ngay khi that bai\nawait expect(page.locator('#order-status')).toHaveText('Da xac nhan');\n// neu dong tren FAIL, dong duoi se KHONG chay:\nawait expect(page.locator('#order-total')).toHaveText('398.000d');\n\n// soft assertion: ghi nhan loi nhung van chay tiep, gom het loi cuoi test\nawait expect.soft(page.locator('#order-status')).toHaveText('Da xac nhan');\nawait expect.soft(page.locator('#order-total')).toHaveText('398.000d');\nawait expect.soft(page.locator('#order-id')).toHaveText(/^#SE-\\d+$/);\n// Playwright se bao ca 3 loi (neu co) cung luc khi test ket thuc"),
      P("Chọn hard assertion khi bước kiểm chứng sau THẬT SỰ phụ thuộc vào bước trước còn đúng — ví dụ nếu chưa xác nhận trang đã tải đúng, kiểm tra tiếp các phần tử bên trong là vô nghĩa. Chọn soft assertion khi bạn muốn thấy TOÀN CẢNH các sai lệch trên cùng một màn hình trong 1 lần chạy, thay vì phải sửa từng lỗi rồi chạy lại nhiều lần mới thấy lỗi tiếp theo.",
        "Choose hard assertion when the next check REALLY depends on the earlier one still being correct — e.g. if you haven't confirmed the page loaded correctly, checking elements inside it further is pointless. Choose soft assertion when you want to see the FULL PICTURE of mismatches on the same screen in one run, instead of fixing one error and rerunning multiple times just to see the next one.",
        "次の検証が本当に前のステップの正しさに依存する場合はハードアサーションを選びましょう——例えばページが正しく読み込まれたことを確認していなければ、その中の要素をさらに検証しても無意味です。同じ画面上の不一致の全体像を1回の実行で見たい場合はソフトアサーションを選びましょう——1つのエラーを直して何度も再実行して次のエラーを見るのではなく。"),
      TIP("Nếu chỉ dùng soft assertion mà quên bước cuối, lỗi sẽ được ghi nhận nhưng test có thể vẫn báo PASS — với Playwright, luôn gọi expect.soft() đủ số lượng cần và để framework tự tổng hợp báo cáo cuối test.", "If you only use expect.soft() but the framework isn't set up to aggregate, failures might get recorded yet the test could still report PASS — with Playwright, expect.soft() failures are automatically aggregated and reported at test end, so just call it as many times as needed.", "expect.soft()だけ使ってフレームワークが集計するよう設定されていないと、失敗が記録されてもテストがPASSと報告されることがあります——Playwrightではexpect.soft()の失敗は自動的に集計されテスト終了時に報告されるので、必要な回数呼べば十分です。"),
    ] },
  { heading: { vi: "5. Viết assertion đầu tiên: so khớp text và trạng thái (thực hành)", en: "5. Writing your first assertions: matching text and state (hands-on)", ja: "5. 最初のアサーションを書く：テキストと状態の照合（実習）" },
    blocks: [
      P("Giờ ta viết assertion cho màn kết quả đặt hàng ShopEasy. Làm theo thứ tự dưới đây để kiểm chứng đúng những điều quan trọng nhất trên màn hình này.",
        "Now let's write assertions for ShopEasy's order-result screen. Follow the order below to verify what matters most on this screen.",
        "では、ShopEasyの注文結果画面用にアサーションを書きましょう。この画面で最も重要な点を検証するため、以下の順に沿いましょう。"),
      STEP(1, "Sau khi đặt hàng, dùng expect(page.locator(...)).toHaveText() để kiểm tra trạng thái đơn hàng đúng chuỗi 'Đã xác nhận'.", "After placing the order, use expect(page.locator(...)).toHaveText() to check the order status matches the exact string 'Confirmed'.", "注文後、expect(page.locator(...)).toHaveText()を使って注文ステータスが『確認済み』という正確な文字列と一致するか検証する。"),
      STEP(2, "Kiểm tra nút 'Xem đơn hàng của tôi' hiển thị bằng expect(...).toBeVisible() — xác nhận người dùng có đường đi tiếp theo.", "Check the 'View my order' button is visible with expect(...).toBeVisible() — confirming the user has a next step to take.", "『注文を見る』ボタンがexpect(...).toBeVisible()で表示されているか検証する——ユーザーに次の行動があることを確認する。"),
      STEP(3, "Dùng expect(...).toBe() để so khớp một giá trị JavaScript thuần (ví dụ mã trạng thái trả về từ API), không phải phần tử DOM.", "Use expect(...).toBe() to match a plain JavaScript value (e.g. a status code returned from an API), not a DOM element.", "DOM要素ではなく、プレーンなJavaScriptの値（例：APIから返されたステータスコード）を照合するにはexpect(...).toBe()を使う。"),
      CODE("javascript", "// tests/order-result.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('man ket qua dat hang hien thi dung trang thai va nut tiep theo', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/don-hang-thanh-cong?order=SE-88213');\n\n  // so khop text: trang thai phai dung chuoi mong doi\n  await expect(page.locator('#order-status')).toHaveText('Da xac nhan');\n\n  // so khop trang thai hien thi: nut tiep theo phai xuat hien\n  await expect(page.locator('#btn-view-order')).toBeVisible();\n\n  // so khop mot gia tri JavaScript thuan, khong phai DOM\n  const res = await page.request.get('/api/orders/SE-88213');\n  const body = await res.json();\n  expect(body.statusCode).toBe(200);\n});"),
      TRY("Thêm 1 câu expect(...) kiểm tra mã đơn hàng hiển thị trên màn hình khớp đúng định dạng '#SE-' theo sau là các chữ số, dùng toHaveText() với regex.", "Add one more expect(...) checking the order id shown on screen matches the '#SE-' followed by digits format, using toHaveText() with a regex.", "画面に表示された注文IDが『#SE-』の後に数字が続く形式と一致するかを検証するexpect(...)を、正規表現付きのtoHaveText()でもう1つ追加してみよう。"),
    ] },
  { heading: { vi: "6. So khớp số & URL sau hành động (thực hành)", en: "6. Matching numbers & URL after an action (hands-on)", ja: "6. 操作後の数値とURLの照合（実習）" },
    blocks: [
      P("Ngoài text và trạng thái, hai loại assertion cực kỳ quan trọng trong thương mại điện tử là số (tiền, số lượng) và URL (điều hướng đúng trang sau hành động). Cả hai đều liên quan trực tiếp tới trải nghiệm và độ tin cậy của người dùng thật.",
        "Besides text and state, two extremely important assertion types in e-commerce are numbers (money, quantity) and URL (navigating to the correct page after an action). Both directly relate to real users' experience and trust.",
        "テキストと状態のほかに、EC分野で極めて重要な2つのアサーション種類は数値（金額、数量）とURL（操作後に正しいページへ遷移すること）です。どちらも実際のユーザー体験と信頼に直結します。"),
      STEP(1, "Tăng số lượng sản phẩm lên 2 trong giỏ hàng, rồi assert tổng tiền hiển thị đúng bằng toHaveText() với chuỗi số đã tính sẵn.", "Increase the product quantity to 2 in the cart, then assert the displayed total exactly matches a pre-calculated number string using toHaveText().", "カート内の商品数量を2に増やし、事前に計算した数値文字列とtoHaveText()で表示された合計金額が一致するかアサートする。"),
      STEP(2, "Sau khi bấm 'Đặt hàng', assert URL của trang chuyển đúng sang '/don-hang-thanh-cong' bằng expect(page).toHaveURL().", "After clicking 'Place order', assert the page URL correctly changes to '/don-hang-thanh-cong' using expect(page).toHaveURL().", "『注文する』をクリックした後、expect(page).toHaveURL()でページのURLが正しく『/don-hang-thanh-cong』に変わったかアサートする。"),
      CODE("javascript", "// tests/cart-total.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('tang so luong thi tong tien va URL sau dat hang deu dung', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/gio-hang');\n\n  await page.locator('#cart-quantity').fill('2');\n  await page.keyboard.press('Tab');\n\n  // so khop so: tong tien phai dung theo don gia x so luong\n  await expect(page.locator('#cart-total')).toHaveText('398.000d');\n\n  await page.locator('#btn-checkout').click();\n  await page.locator('#btn-place-order').click();\n\n  // so khop URL sau hanh dong: dieu huong dung trang ket qua\n  await expect(page).toHaveURL(/.*\\/don-hang-thanh-cong/);\n});"),
      PITFALL("Assert số bằng cách so sánh chuỗi định dạng sẵn ('398.000đ') dễ vỡ nếu định dạng tiền tệ đổi (thêm/bớt dấu chấm). Với số liệu quan trọng, cân nhắc trích xuất số thuần rồi so sánh bằng toBe() thay vì so khớp cả chuỗi có định dạng.", "Asserting a number by comparing a pre-formatted string ('398,000đ') is fragile if the currency format changes (adding/removing separators). For important figures, consider extracting the plain number and comparing with toBe() instead of matching the whole formatted string.", "整形済みの文字列（『398,000đ』）で数値をアサートすると、通貨のフォーマットが変わった（区切り記号の増減）場合に壊れやすいです。重要な数値については、整形済み文字列全体を照合するのではなく、素の数値を抽出してtoBe()で比較することを検討しましょう。"),
    ] },
  { heading: { vi: "7. Soft assertion trong thực tế: kiểm chứng nhiều điều kiện cùng lúc", en: "7. Soft assertion in practice: verifying many conditions at once", ja: "7. 実践におけるソフトアサーション：複数条件を同時に検証する" },
    blocks: [
      P("Màn kết quả đặt hàng ShopEasy có nhiều thông tin cần đúng cùng lúc: mã đơn, trạng thái, tổng tiền, nút tiếp theo. Nếu dùng hard assertion cho từng cái, mỗi lần chạy chỉ thấy được lỗi ĐẦU TIÊN — muốn thấy lỗi thứ hai phải sửa lỗi đầu rồi chạy lại. Soft assertion giải quyết đúng vấn đề này.",
        "ShopEasy's order-result screen has many pieces of information that must be correct at once: order id, status, total, next button. If you use hard assertion for each one, every run only shows the FIRST failure — to see the second one, you'd have to fix the first and rerun. Soft assertion solves exactly this problem.",
        "ShopEasyの注文結果画面には同時に正しくなければならない多くの情報があります：注文ID、ステータス、合計金額、次のボタン。それぞれにハードアサーションを使うと、1回の実行で最初の失敗しか見えません——2番目を見るには最初を直して再実行する必要があります。ソフトアサーションはまさにこの問題を解決します。"),
      CODE("javascript", "// tests/order-result-full.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('man ket qua dat hang: kiem chung day du bang soft assertion', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/don-hang-thanh-cong?order=SE-88213');\n\n  await expect.soft(page.locator('#order-id')).toHaveText(/^#SE-\\d+$/);\n  await expect.soft(page.locator('#order-status')).toHaveText('Da xac nhan');\n  await expect.soft(page.locator('#order-total')).toHaveText('398.000d');\n  await expect.soft(page.locator('#btn-view-order')).toBeVisible();\n\n  // Playwright tu dong bao TAT CA loi soft o day, khong can goi gi them\n});"),
      P("Nhờ cách này, nếu cả 4 điều kiện đều sai, báo cáo cuối test sẽ liệt kê đủ cả 4 lỗi trong 1 lần chạy — tiết kiệm đáng kể thời gian debug so với việc sửa từng lỗi một qua nhiều lần chạy lại. Đây là lý do soft assertion rất được ưa chuộng cho các màn hình 'tổng hợp kết quả' như trang đặt hàng thành công, trang hồ sơ, hay trang xác nhận thanh toán.",
        "Thanks to this, if all 4 conditions are wrong, the test's final report will list all 4 failures in a single run — saving significant debugging time compared to fixing them one at a time across multiple reruns. This is why soft assertion is popular for 'result summary' screens like the order-success page, profile page, or payment confirmation page.",
        "これにより、4つの条件すべてが間違っていても、テストの最終レポートには1回の実行で4つの失敗すべてが列挙されます——複数回再実行して1つずつ直すのに比べ、デバッグ時間を大幅に節約できます。だからこそソフトアサーションは、注文成功ページ、プロフィールページ、支払い確認ページのような『結果まとめ』画面で好まれます。"),
      TIP("Soft assertion không thay thế hoàn toàn hard assertion — vẫn nên dùng hard assertion cho bước 'điều kiện tiên quyết' (ví dụ trang có tải đúng không) trước khi chuyển sang soft assertion cho các chi tiết bên trong.", "Soft assertion doesn't fully replace hard assertion — you should still use hard assertion for the 'precondition' step (e.g. whether the page loaded correctly) before switching to soft assertion for the details inside it.", "ソフトアサーションはハードアサーションを完全に置き換えるものではありません——中の詳細をソフトアサーションで検証する前に、『前提条件』のステップ（ページが正しく読み込まれたかなど）にはハードアサーションを使うべきです。"),
      IMG(m_dashboard, "Bảng so sánh độ tin cậy bộ test ShopEasy trước và sau khi bổ sung assertion đầy đủ", "Comparison of ShopEasy test suite reliability before and after adding complete assertions", "アサーションを完全に追加する前と後のShopEasyテストスイート信頼性の比較"),
    ] },
  { heading: { vi: "8. Tình huống 1: test chỉ mở trang, không assert gì — luôn PASS dù lỗi", en: "8. Situation 1: a test that only opens a page, asserts nothing — always PASS even when broken", ja: "8. シーン1：ページを開くだけで何もアサートしないテスト——壊れていても常にPASS" },
    blocks: [
      SITUATION("Một bạn mới viết test cho tính năng áp dụng mã giảm giá trên giỏ hàng ShopEasy: mở trang giỏ hàng, nhập mã 'GIAM10', bấm 'Áp dụng', rồi kết thúc test — không có bất kỳ expect() nào kiểm tra tổng tiền sau khi giảm giá.", "A newcomer writes a test for ShopEasy's voucher feature: open the cart page, type the code 'GIAM10', click 'Apply', then end the test — with no expect() at all checking the total after the discount.",
        "Sau đó backend có bug: mã 'GIAM10' (nghĩa là giảm 10%) lại bị tính cố định trừ 100.000đ thay vì trừ theo phần trăm. Với đơn hàng nhỏ, số tiền trừ sai lớn hơn nhiều so với mong đợi — khách hàng bị trừ quá tay. Nhưng vì test không có assertion nào kiểm tra tổng tiền, nó vẫn chạy hết các bước và báo PASS màu xanh trong mọi lần chạy CI, không ai phát hiện ra cho tới khi khách hàng khiếu nại.",
        "Later, a backend bug appears: the code 'GIAM10' (meaning 10% off) is incorrectly calculated as a fixed 100,000đ deduction instead of a percentage. For small orders, the wrongly deducted amount is much larger than expected — customers get overcharged incorrectly. But because the test has no assertion checking the total, it still runs through every step and reports a green PASS on every CI run, and nobody notices until a customer complains.",
        "ある初心者がShopEasyのバウチャー機能用のテストを書く：カートページを開き、コード『GIAM10』を入力し、『適用』をクリックして終了する——割引後の合計金額を検証するexpect()は一切ない。",
        "その後バックエンドにバグが発生する：コード『GIAM10』（10%オフを意味する）が、パーセンテージではなく固定10万ドン引きとして誤って計算される。小さな注文では、誤って差し引かれた金額が期待よりずっと大きくなる——顧客が過剰に請求される。しかしテストに合計金額を検証するアサーションがないため、全ステップを実行し続け、CIの全実行で緑のPASSを報告し続け、顧客が苦情を言うまで誰も気づかない。"),
      SOLVE("Bổ sung expect(page.locator('#cart-total')).toHaveText() kiểm tra đúng tổng tiền sau khi áp mã, tính sẵn giá trị mong đợi dựa trên phần trăm giảm giá thay vì chỉ kiểm tra thông báo 'Áp dụng thành công' hiển thị (thông báo có thể đúng dù số tiền tính sai).", "Add expect(page.locator('#cart-total')).toHaveText() to check the correct total after applying the code, pre-calculating the expected value based on the discount percentage, instead of only checking that the 'Applied successfully' message shows (the message can be correct even when the amount is calculated wrong).", "expect(page.locator('#cart-total')).toHaveText()を追加し、割引率に基づいて事前計算した期待値でコード適用後の合計金額を検証する——『適用成功』メッセージの表示だけを確認するのではなく（金額計算が間違っていてもメッセージは正しく表示され得る）。"),
      P("Bài học ở đây: kiểm tra thông báo hiển thị 'thành công' không thay thế được việc kiểm chứng SỐ LIỆU thật sự đúng. Một thông báo UI có thể hiển thị đúng ngay cả khi logic tính toán bên dưới đang sai hoàn toàn — đó là lý do assertion phải nhắm vào đúng dữ liệu ảnh hưởng tới người dùng, không chỉ vào thông báo bề mặt.",
        "The lesson here: checking that a 'success' message displays doesn't replace verifying the actual DATA is correct. A UI message can display correctly even when the underlying calculation logic is completely wrong — that's why assertions must target the actual data affecting users, not just surface-level messages.",
        "ここでの教訓：『成功』メッセージが表示されることの確認は、実際のデータが正しいことの検証の代わりにはなりません。基盤となる計算ロジックが完全に間違っていても、UIメッセージは正しく表示され得ます——だからこそアサーションは表面的なメッセージだけでなく、ユーザーに影響する実際のデータを対象にすべきです。"),
      IMG(m_jira, "Ticket lỗi ghi lại bug giảm giá tính sai lọt production vì test thiếu assert tổng tiền", "A bug ticket recording a discount-calculation bug that reached production because the test lacked a total assertion", "テストが合計金額のアサーションを欠いていたため本番環境に到達した割引計算バグを記録したバグチケット"),
      RECAP(["Không assert = không kiểm chứng, dù test 'chạy xong' vẫn không có nghĩa gì", "Kiểm tra thông báo hiển thị KHÔNG thay thế được kiểm tra dữ liệu/số liệu thật"],
        ["No assertion = no verification, a test that 'finishes running' still means nothing", "Checking a displayed message does NOT replace checking the actual data/number"],
        ["アサーションなし＝検証なし。テストが『実行完了』しても意味を持たない", "表示メッセージの確認は実際のデータ/数値の確認の代わりにはならない"]),
    ] },
  { heading: { vi: "9. Tình huống 2: assert quá chặt vào text hay đổi khiến test dễ vỡ", en: "9. Situation 2: asserting too strictly on frequently-changing text makes tests fragile", ja: "9. シーン2：頻繁に変わるテキストへの過度に厳しいアサーションでテストが脆くなる" },
    blocks: [
      SITUATION("Một bạn khác viết assert cho banner khuyến mãi trên trang chủ ShopEasy: expect(page.locator('#promo-banner')).toHaveText('Giảm 20% toàn bộ áo thun — chỉ hôm nay!'), kiểm tra khớp CHÍNH XÁC từng ký tự của nội dung banner.", "Another newcomer writes an assertion for ShopEasy's homepage promo banner: expect(page.locator('#promo-banner')).toHaveText('20% off all t-shirts — today only!'), checking an EXACT character-for-character match of the banner content.",
        "Đội marketing đổi nội dung banner gần như mỗi ngày để chạy chương trình khuyến mãi mới. Mỗi lần đổi, test này báo FAIL — dù trang chủ, giỏ hàng, và toàn bộ luồng mua hàng vẫn hoạt động hoàn toàn bình thường. Sau vài tuần, đội automation quá mệt vì phải sửa test này liên tục, bắt đầu bỏ qua báo đỏ của nó, và rồi bỏ luôn cả các cảnh báo đỏ khác vì đã quen 'thấy đỏ là chuyện thường'.",
        "The marketing team changes the banner content almost every day to run new promotions. Every time it changes, this test reports FAIL — even though the homepage, cart, and the entire purchase flow are still working completely normally. After a few weeks, the automation team gets tired of constantly fixing this test, starts ignoring its red failures, and then starts ignoring other red warnings too, having grown used to 'seeing red is normal'.",
        "別の初心者がShopEasyのホームページのプロモバナー用にアサーションを書く：expect(page.locator('#promo-banner')).toHaveText('Tシャツ全品20%オフ——本日限り！')、バナー内容を1文字単位で完全一致するか検証する。",
        "マーケティングチームは新しいキャンペーンを実施するためほぼ毎日バナー内容を変更する。変更のたびにこのテストはFAILを報告する——ホームページ、カート、購入フロー全体は完全に正常に動いているにもかかわらず。数週間後、自動化チームはこのテストを絶えず直すことに疲れ、その赤い失敗を無視し始め、『赤が見えるのは普通』に慣れてしまい、他の赤い警告も無視するようになる。"),
      SOLVE("Đổi assertion sang kiểm chứng điều thật sự ổn định và quan trọng: banner CÓ hiển thị (toBeVisible()) và chứa từ khoá cố định như 'Giảm' hoặc '%' (toContainText() thay vì toHaveText() khớp toàn bộ), thay vì so khớp nguyên văn nội dung marketing hay đổi hằng ngày.", "Change the assertion to verify what's actually stable and important: that the banner IS visible (toBeVisible()) and contains a fixed keyword like 'off' or '%' (toContainText() instead of an exact toHaveText() match), instead of matching the exact marketing copy that changes daily.", "アサーションを、本当に安定していて重要な点——バナーが表示されている（toBeVisible()）こと、固定キーワード（『オフ』や『%』など）を含む（完全一致のtoHaveText()ではなくtoContainText()）こと——を検証するように変更する。毎日変わるマーケティング文言の完全一致ではなく。"),
      P("Bài học ở đây: 'kiểm chứng đúng điều quan trọng' còn có nghĩa là chọn ĐỘ CHẶT phù hợp cho từng loại nội dung. Dữ liệu nghiệp vụ ổn định (tổng tiền, trạng thái, mã đơn) nên assert chặt và chính xác. Nội dung dễ đổi vì lý do kinh doanh (banner, copy marketing) nên assert lỏng hơn — chỉ kiểm tra phần cấu trúc/từ khoá cố định, không khớp nguyên văn.",
        "The lesson here: 'verifying what matters' also means choosing the right STRICTNESS for each type of content. Stable business data (total, status, order id) should be asserted tightly and precisely. Content that changes often for business reasons (banners, marketing copy) should be asserted more loosely — only checking the fixed structural/keyword part, not matching the exact wording.",
        "ここでの教訓：『重要な点を検証する』とは、コンテンツの種類ごとに適切な厳しさを選ぶことも意味します。安定したビジネスデータ（合計金額、ステータス、注文ID）は厳密かつ正確にアサートすべきです。ビジネス上の理由で頻繁に変わるコンテンツ（バナー、マーケティング文言）は緩くアサートすべきです——完全一致ではなく、固定された構造やキーワードの部分だけを検証する。"),
      TRY("Nhìn lại code chương 5–7, tìm 1 assertion đang so khớp toàn bộ chuỗi text và cân nhắc đổi sang toContainText() nếu phần nội dung đó có khả năng hay thay đổi vì lý do marketing/hiển thị.", "Look back at the code from chapters 5-7, find one assertion that matches the whole text string, and consider switching it to toContainText() if that content is likely to change often for marketing/display reasons.", "5〜7章のコードを振り返り、テキスト文字列全体を照合しているアサーションを1つ見つけ、その内容がマーケティング/表示上の理由で頻繁に変わりそうならtoContainText()への変更を検討してみよう。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Viết script điều khiển trình duyệt đầy đủ (mở trang, điền form, bấm nút) nhưng quên hẳn câu expect() cuối cùng. Test vẫn 'chạy được' và dễ khiến người viết tưởng đã kiểm chứng xong, dù thực chất chưa hề assert gì.", "Writing a fully functional browser-control script (open page, fill form, click button) but forgetting the final expect() entirely. The test still 'runs' and easily makes the author think verification is done, even though nothing has actually been asserted.", "完全に機能するブラウザ操作スクリプト（ページを開き、フォームに入力し、ボタンをクリックする）を書きながら、最後のexpect()を完全に忘れること。テストは『実行できる』ため、実際には何もアサートしていないのに、作者は検証が完了したと思い込みやすい。"),
      PITFALL("Viết thông điệp lỗi mơ hồ kiểu 'assertion failed' mà không nói rõ đang kiểm chứng cái gì, mong đợi gì, nhận được gì — khiến người đọc log phải dò lại toàn bộ script mới hiểu vì sao FAIL.", "Writing a vague error message like 'assertion failed' without stating what's being verified, what was expected, what was received — forcing whoever reads the log to trace through the whole script just to understand why it failed.", "何を検証しているか、何を期待していたか、何を得たかを述べずに『assertion failed』のような曖昧なエラーメッセージを書くこと——ログを読む人が、なぜ失敗したか理解するためにスクリプト全体を追い直さなければならなくなる。"),
      TIP("Playwright tự sinh thông điệp lỗi khá chi tiết (giá trị mong đợi vs thực tế) khi dùng expect() có sẵn — nếu viết assertion tuỳ chỉnh, hãy giữ nguyên tinh thần đó: luôn nêu rõ 'mong đợi gì — nhận được gì — ở đâu'.", "Playwright automatically generates fairly detailed error messages (expected vs actual) when using its built-in expect() — if writing a custom assertion, keep that same spirit: always state 'what was expected — what was received — where'.", "Playwrightは組み込みのexpect()を使うとかなり詳細なエラーメッセージ（期待値 vs 実際）を自動生成します——カスタムアサーションを書く場合も同じ精神を保ちましょう：常に『何を期待し、何を得て、どこで』を明記する。"),
      IMG(m_kanban, "Bảng theo dõi các test đang thiếu assertion đáng tin cậy cần bổ sung tại ShopEasy", "A board tracking tests at ShopEasy that are missing reliable assertions and need updates", "ShopEasyで信頼できるアサーションが不足しており追加が必要なテストを追跡するボード"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Waits & xử lý bất đồng bộ cho người mới", "Waits & handling asynchrony for beginners", "waits-xu-ly-bat-dong-bo-cho-nguoi-moi", "初心者のための待機と非同期処理"),
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者のためのPage Object Model"),
      INTERNAL("Cách viết bug report cho người mới", "How to write bug reports for beginners", "cach-viet-bug-report-cho-nguoi-moi", "初心者のためのバグレポートの書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học assertion & kiểm chứng kết quả qua màn kết quả đặt hàng và giỏ hàng ShopEasy: vì sao điều khiển trình duyệt thành công chưa phải là kiểm chứng, cách chọn đúng điều quan trọng để assert (không thừa/thiếu), khác biệt giữa hard và soft assertion, cách so khớp text/số/trạng thái/URL bằng Playwright, và cách viết thông điệp lỗi rõ ràng. Hai tình huống thật cho thấy hậu quả khi thiếu assert (bug giảm giá lọt production) và khi assert quá chặt (test vỡ vì banner đổi nội dung).",
        "You just learned assertions and result verification through ShopEasy's order-result and cart screens: why controlling the browser successfully isn't yet verification, how to choose exactly what matters to assert (not too much, not too little), the difference between hard and soft assertion, how to match text/number/state/URL with Playwright, and how to write clear error messages. Two real situations showed the consequences of missing assertions (a discount bug reaching production) and asserting too strictly (a test breaking because a banner's content changed).",
        "ShopEasyの注文結果画面とカート画面を通じて、アサーションと結果検証を学びました：ブラウザ操作の成功がなぜまだ検証ではないか、多すぎず少なすぎず本当に重要な点をどう選んでアサートするか、ハードとソフトのアサーションの違い、Playwrightでテキスト/数値/状態/URLを照合する方法、そして明確なエラーメッセージの書き方。2つの実例は、アサーション不足の結果（割引バグの本番流出）と過度に厳しいアサーションの結果（バナー内容の変更でテストが壊れる）を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về waits & xử lý bất đồng bộ (đảm bảo assert đúng lúc dữ liệu đã sẵn sàng, tránh lỗi flaky) và Page Object Model (tổ chức locator + hành động gọn gàng, để assertion trong test luôn tập trung vào nghiệp vụ). Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into waits & handling asynchrony (making sure you assert once data is actually ready, avoiding flaky failures) and the Page Object Model (organizing locators + actions cleanly, so the assertions in your tests always focus on business logic). If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、待機と非同期処理（データが実際に準備できてからアサートし、不安定な失敗を避ける）と、Page Object Model（ロケーターと操作をきちんと整理し、テスト内のアサーションが常に業務ロジックに集中できるようにする）を学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const ASSERTION_01 = makeDoc({
  slug: "assertion-kiem-chung-ket-qua-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "assertion kiểm chứng",
  keywords: ["assertion testing", "kiem chung ket qua automation", "hard soft assertion", "playwright expect", "kiem tra ket qua tu dong hoa cho nguoi moi"],
  coverLabel: "NGƯỜI MỚI · ASSERTION · TMĐT",
  crumb: "Assertion & kiểm chứng kết quả cho người mới",
  metaTitle: { vi: "Assertion kiểm chứng kết quả cho người mới", en: "Assertion & result verification for beginners", ja: "初心者向けアサーションと結果検証" },
  metaDescription: {
    vi: "Assertion kiểm chứng kết quả cho người mới: hard/soft assertion, so khớp text/số/URL qua ShopEasy bằng Playwright, tránh test 'luôn xanh', kèm trắc nghiệm.",
    en: "Assertion and result verification for beginners: hard vs soft assertion, matching text/number/URL through ShopEasy with Playwright, avoiding 'always green' tests, with a quiz.",
    ja: "初心者向けアサーションと結果検証：ハード・ソフトアサーション、PlaywrightでShopEasy画面のテキスト/数値/状態/URLを照合、『常に緑』のテストを避ける方法。動くコードとクイズ付き。",
  },
  title: {
    vi: "Assertion & kiểm chứng kết quả trong automation cho người mới (có code chạy được)",
    en: "Assertion & result verification in automation for beginners (with runnable code)",
    ja: "初心者のための自動化におけるアサーションと結果検証（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học assertion & kiểm chứng kết quả qua app TMĐT ShopEasy. Vì sao điều khiển trình duyệt thành công chưa phải kiểm chứng, kiểm chứng đúng điều quan trọng (không thừa/thiếu), hard vs soft assertion, so khớp text/số/trạng thái/URL bằng Playwright, viết thông điệp lỗi rõ ràng, hai tình huống thật (bug lọt production vì thiếu assert, test vỡ vì assert quá chặt), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn assertion & result verification through the ShopEasy e-commerce app. Why successfully controlling the browser isn't verification yet, verifying what actually matters (not too much, not too little), hard vs soft assertion, matching text/number/state/URL with Playwright, writing clear error messages, two real situations (a bug reaching production from missing assertions, a test breaking from over-strict assertions), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでアサーションと結果検証を学ぶ。ブラウザ操作の成功がなぜまだ検証ではないか、本当に重要な点を検証する方法、ハードとソフトのアサーション、Playwrightでテキスト/数値/状態/URLを照合する方法、明確なエラーメッセージの書き方、2つの実例（アサーション不足によるバグの本番流出、過度に厳しいアサーションによるテスト崩壊）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết assertion kiểm chứng kết quả trong automation", steps: [
    { name: "Chọn đúng điều quan trọng cần kiểm chứng", text: "Xác định giá trị nào ảnh hưởng thật tới người dùng, không assert thừa nội dung hay đổi." },
    { name: "Chọn loại assertion phù hợp", text: "So khớp text/số/trạng thái/URL, quyết định dùng hard hay soft assertion." },
    { name: "Viết assertion & thông điệp lỗi rõ ràng", text: "Dùng expect().toBe/toHaveText/toBeVisible, đảm bảo lỗi hiện rõ mong đợi vs thực tế." },
  ] },
  pages,
});

export const AU_ASSERTION_01 = [ASSERTION_01];
