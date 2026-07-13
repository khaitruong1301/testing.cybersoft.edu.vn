// doc_au_intro.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Tự động hóa kiểm thử là gì & khi nào nên tự động hóa — automation là gì, khác manual thế nào,
// kim tự tháp kiểm thử (unit/integration/e2e), ROI tự động hóa, chọn ca nào để tự động, công cụ
// phổ biến (Selenium/Cypress/Playwright), lộ trình học. Minh hoạ trên app TMĐT ShopEasy, có code
// ngắn (pseudo + Playwright) chạy được. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hóa, công cụ & dự án thực chiến.",
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

// ── Mockup 1: màn giỏ hàng/thanh toán ShopEasy — chú thích ca nào nên/chưa nên tự động ──
const m_screen = browser("shopeasy.vn/gio-hang", [
  panel("ShopEasy · Giỏ hàng & Thanh toán", [
    field(24, 20, 330, "Email đăng nhập", "mai.tran@gmail.com", "normal"),
    field(372, 20, 330, "Mã giảm giá", "SALE10", "normal"),
    field(24, 92, 330, "Số lượng (Áo thun basic)", "2", "normal"),
    field(372, 92, 330, "Tổng tiền", "398.000đ", "normal"),
    btn(24, 168, 200, "Đặt hàng", "primary"),
    btn(240, 168, 260, "Banner khuyến mãi mới", "ghost"),
    annotate(20, 12, 330, 62, "Chạy mỗi ngày -> NÊN tự động"),
    annotate(236, 148, 264, 56, "Mới ra tuần này -> CHƯA nên"),
  ].join(""), { h: 260, accent: "#0ea5e9" }),
].join(""), { h: 316, title: "ShopEasy · Automation", accent: "#0ea5e9" });

// ── Mockup 2: bảng kim tự tháp kiểm thử (unit/integration/e2e) ──
const m_pyramid = grid("Kim tự tháp kiểm thử — tỉ lệ khuyến nghị trên ShopEasy",
  ["Tầng", "Tỉ lệ đề xuất", "Tốc độ chạy", "Chi phí bảo trì", "Ví dụ trên ShopEasy"], [
  ["Unit (đơn vị)", "~70%", "Rất nhanh (mili-giây)", "Thấp", "Hàm tính tổng tiền giỏ hàng, hàm áp mã giảm giá"],
  ["Integration (tích hợp)", "~20%", "Nhanh (vài giây)", "Trung bình", "API tạo đơn hàng gọi service thanh toán & kho"],
  ["E2E / UI (đầu-cuối)", "~10%", "Chậm (chục giây–vài phút)", "Cao", "Luồng đăng nhập → thêm giỏ → thanh toán trên trình duyệt thật"],
], { accent: "#0ea5e9", note: "Càng lên cao, test càng chậm, càng dễ vỡ và tốn công bảo trì hơn — nên viết ít lại và chọn lọc kỹ." });

// ── Mockup 3: bảng Manual Testing vs Automation Testing ──
const m_manual_vs_auto = grid("Manual Testing vs Automation Testing — cùng kiểm thử ShopEasy",
  ["Tiêu chí", "Manual Testing", "Automation Testing"], [
  ["Người/máy thực hiện", "Tester thao tác bằng tay", "Script chạy tự động"],
  ["Tốc độ chạy lại", "Chậm, tốn công mỗi lần", "Nhanh, chạy lại được vô số lần"],
  ["Chi phí ban đầu", "Thấp", "Cao hơn (viết + bảo trì script)"],
  ["Phù hợp nhất với", "Ca mới, UI hay đổi, khám phá", "Ca lặp lại nhiều lần, đã ổn định"],
  ["Phát hiện lỗi UI/UX tinh tế", "Tốt (mắt người quan sát)", "Hạn chế"],
  ["Chạy đêm / trong CI", "Không thể", "Có thể"],
], { accent: "#0ea5e9" });

// ── Mockup 4: bảng chọn ca nào nên tự động hóa ──
const m_choose_case = grid("Ca nào NÊN tự động hóa trên ShopEasy?",
  ["Ca kiểm thử", "Tần suất chạy lại", "Nên tự động?"], [
  ["Đăng nhập → thêm giỏ hàng → thanh toán (hồi quy mỗi sprint)", "Rất thường xuyên", "NÊN"],
  ["Tính tổng tiền khi áp mã giảm giá (logic đã ổn định)", "Thường xuyên", "NÊN"],
  ["Kiểm tra banner khuyến mãi vừa ra mắt tuần này", "Một lần duy nhất", "KHÔNG NÊN"],
  ["Giao diện trang chủ đang thiết kế lại mỗi ngày", "Chưa ổn định", "CHƯA NÊN"],
  ["Đánh giá cảm nhận thẩm mỹ của trang sản phẩm mới", "Cần con người", "KHÔNG NÊN"],
], { accent: "#0ea5e9", note: "Ưu tiên tự động hóa ca lặp lại nhiều lần, logic/giao diện đã ổn định — bỏ qua ca chạy một lần hoặc còn hay đổi." });

// ── Mockup 5: kanban theo dõi script automation bị vỡ do UI thay đổi ──
const m_kanban = kanban("Bảng theo dõi script automation bị vỡ do UI đổi (ShopEasy · Sprint 9)", [
  { name: "Báo vỡ (Broken)", cards: [
    { key: "AT-301", title: "Script checkout: đổi id nút 'Đặt hàng' -> selector cũ chết", sev: "High" },
    { key: "AT-305", title: "Script đăng nhập: đổi layout form -> field không tìm thấy", sev: "Medium" },
  ] },
  { name: "Đang sửa (Fixing)", cards: [
    { key: "AT-301", title: "Cập nhật selector theo data-testid mới, ổn định hơn", sev: "High" },
  ] },
  { name: "Đã ổn định (Stable)", cards: [
    { key: "AT-290", title: "Script tính tổng tiền giỏ hàng — chạy xanh 30 ngày liên tiếp", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu ROI tự động hóa sau 3 tháng ──
const m_dash = dashboard("ROI automation sau 3 tháng tại ShopEasy", [
  { label: "Ca đã tự động hóa", value: "84", sub: "trên tổng 250 ca hồi quy", color: "#0ea5e9" },
  { label: "Test hồi quy thủ công", value: "6 giờ", sub: "trước khi có automation", color: "#f59e0b" },
  { label: "Thời gian chạy tự động", value: "12 phút", sub: "chạy trong CI mỗi đêm", color: "#16a34a" },
  { label: "Lỗi bắt sớm mỗi tuần", value: "~5", sub: "nhờ chạy tự động hàng đêm", color: "#7c3aed" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Tự động hóa kiểm thử (automation testing) là gì?",
  "What is test automation?",
  "Tự động hóa kiểm thử là việc dùng công cụ/script để tự thực hiện lại các bước kiểm thử (nhập liệu, bấm nút, kiểm tra kết quả) thay vì tester làm bằng tay mỗi lần. Máy chạy nhanh, chạy lại được vô số lần, không mệt, rất hợp cho các ca kiểm thử lặp đi lặp lại như hồi quy sau mỗi lần thay đổi code.",
  "Test automation is using tools/scripts to re-run test steps (entering data, clicking buttons, checking results) automatically instead of a tester doing them by hand each time. Machines run fast, can repeat endlessly, and never get tired — great for repetitive cases like regression after every code change.",
  "自動化テスト（automation testing）とは何？",
  "自動化テストとは、テスターが毎回手作業で行う代わりに、ツールやスクリプトを使ってテスト手順（データ入力、ボタンクリック、結果確認）を自動的に繰り返し実行することです。機械は速く、何度でも繰り返せて疲れないため、コード変更のたびに行う回帰テストのような繰り返し作業のケースに非常に向いています。");
const faq2 = FAQ(
  "Automation testing có thay thế hoàn toàn manual testing không?",
  "Does automation testing completely replace manual testing?",
  "Không. Automation chỉ giỏi ở việc chạy lại đúng những bước đã định sẵn và so khớp kết quả — nó không tự 'nhìn' ra giao diện xấu, trải nghiệm khó dùng, hay nghĩ ra tình huống mới lạ như con người. Thực tế các đội hiệu quả nhất luôn kết hợp cả hai: automation lo phần hồi quy lặp lại, con người lo phần khám phá, đánh giá trải nghiệm và các ca mới.",
  "No. Automation is only good at re-running predefined steps and comparing results — it can't 'see' an ugly UI, a confusing experience, or think up new scenarios the way a human can. In practice, the most effective teams always combine both: automation handles repetitive regression, humans handle exploration, experience evaluation, and new cases.",
  "自動化テストは手動テストを完全に置き換えるの？",
  "いいえ。自動化は事前に決められた手順を繰り返し実行し結果を照合することは得意ですが、見た目の悪さや使いにくい体験、人間のように新しい状況を思いつくことは自動ではできません。実際、最も効果的なチームは常に両方を組み合わせます：自動化は繰り返しの回帰テストを担当し、人間は探索、体験の評価、新しいケースの発見を担当します。");
const faq3 = FAQ(
  "Người mới nên học công cụ automation nào trước: Selenium, Cypress hay Playwright?",
  "Which automation tool should a beginner learn first: Selenium, Cypress, or Playwright?",
  "Cả ba đều dùng để tự động hóa trình duyệt và đều tốt để bắt đầu. Nếu chỉ chọn một công cụ hiện đại, dễ học, chạy nhanh và hỗ trợ nhiều trình duyệt sẵn trong một gói, Playwright là lựa chọn phổ biến hiện nay. Selenium có cộng đồng lâu đời nhất và vẫn được nhiều công ty dùng, còn Cypress rất thân thiện cho web hiện đại. Quan trọng hơn công cụ là hiểu đúng TƯ DUY chọn ca để tự động và cách viết test dễ bảo trì — kỹ năng đó dùng được với công cụ nào cũng vậy.",
  "All three automate browsers and are all fine starting points. If you can only pick one modern tool that's easy to learn, fast, and ships with multi-browser support out of the box, Playwright is a popular current choice. Selenium has the longest-running community and is still used by many companies, while Cypress is very friendly for modern web apps. More important than the tool is understanding the right MINDSET for choosing what to automate and writing maintainable tests — that skill transfers to any tool.",
  "初心者はSelenium、Cypress、Playwrightのどれを先に学ぶべき？",
  "3つともブラウザ自動化のためのツールで、どれから始めても問題ありません。学びやすく動作が速く、複数ブラウザ対応が最初から揃った現代的なツールを1つだけ選ぶなら、Playwrightが現在よく選ばれています。Seleniumは最も歴史が長いコミュニティを持ち今も多くの企業で使われており、Cypressは現代的なWebアプリとの相性がとても良いです。ツール選び以上に重要なのは、どのケースを自動化すべきかという考え方と、保守しやすいテストの書き方を正しく理解することです——このスキルはどのツールでも通用します。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Tự động hóa kiểm thử (automation testing) nghĩa là gì?", en: "What does test automation mean?", ja: "テスト自動化とはどういう意味？" },
    options: [
      { vi: "Dùng công cụ/script để tự chạy lại các bước kiểm thử thay vì làm bằng tay", en: "Using tools/scripts to re-run test steps instead of doing them by hand", ja: "手作業の代わりにツール/スクリプトでテスト手順を自動で繰り返すこと" },
      { vi: "Chỉ dùng máy tính cấu hình mạnh hơn để test nhanh hơn", en: "Only using a more powerful computer to test faster", ja: "より高性能なコンピュータを使うだけでテストを速くすること" },
      { vi: "Không cần viết test case nữa", en: "No longer needing to write test cases", ja: "テストケースを書く必要がなくなること" },
      { vi: "Thuê thêm nhiều tester làm thủ công", en: "Hiring more testers to do manual work", ja: "手動作業のためにテスターを増やすこと" },
    ], correct: 0,
    explain: { vi: "Automation là dùng công cụ/script thực hiện lại đúng các bước kiểm thử và so khớp kết quả tự động.", en: "Automation means using tools/scripts to re-run the exact test steps and automatically compare results.", ja: "自動化とは、ツール/スクリプトで正確にテスト手順を繰り返し、結果を自動で照合することです。" },
  }),
  mcq({
    q: { vi: "Theo kim tự tháp kiểm thử, tầng nào nên có NHIỀU test nhất?", en: "According to the test pyramid, which layer should have the MOST tests?", ja: "テストピラミッドで最も多くのテストを持つべき層はどれ？" },
    options: [
      { vi: "E2E / UI (đầu-cuối)", en: "E2E / UI (end-to-end)", ja: "E2E / UI（エンドツーエンド）" },
      { vi: "Integration (tích hợp)", en: "Integration", ja: "統合テスト（Integration）" },
      { vi: "Unit (đơn vị)", en: "Unit", ja: "ユニットテスト（Unit）" },
      { vi: "Cả ba tầng bằng nhau", en: "All three layers equal", ja: "3つの層すべて同じ数" },
    ], correct: 2,
    explain: { vi: "Unit test chạy rất nhanh, chi phí bảo trì thấp nên nên chiếm tỉ lệ lớn nhất; E2E chậm và dễ vỡ nên chiếm ít nhất.", en: "Unit tests run very fast with low maintenance cost, so they should be the largest share; E2E is slow and fragile, so it should be the smallest.", ja: "ユニットテストは非常に高速で保守コストが低いため最も多くすべきです。E2Eは遅く壊れやすいため最も少なくすべきです。" },
  }),
  mcq({
    q: { vi: "Ca kiểm thử nào KHÔNG nên tự động hóa ngay?", en: "Which test case should NOT be automated right away?", ja: "すぐに自動化すべきでないテストケースはどれ？" },
    options: [
      { vi: "Đăng nhập → thêm giỏ hàng → thanh toán, chạy mỗi sprint", en: "Login → add to cart → checkout, run every sprint", ja: "ログイン→カート追加→決済、毎スプリント実行" },
      { vi: "Tính tổng tiền khi áp mã giảm giá, logic đã ổn định", en: "Calculating total with a discount code, logic already stable", ja: "割引コード適用時の合計計算、ロジックは安定済み" },
      { vi: "Kiểm tra banner khuyến mãi mới ra mắt tuần này, chỉ chạy một lần", en: "Checking a promo banner launched this week, run only once", ja: "今週公開された新しいプロモバナーの確認、一度しか実行しない" },
      { vi: "Hồi quy toàn bộ luồng đặt hàng chạy mỗi đêm trong CI", en: "Full order-flow regression run every night in CI", ja: "毎晩CIで実行される注文フロー全体の回帰テスト" },
    ], correct: 2,
    explain: { vi: "Ca chỉ chạy một lần thì chi phí viết + bảo trì script thường không hoàn vốn — làm tay nhanh và rẻ hơn.", en: "A case that only runs once usually doesn't pay back the cost of writing + maintaining a script — doing it manually is faster and cheaper.", ja: "一度しか実行しないケースはスクリプト作成・保守のコストを回収できないことが多く、手動で行う方が速く安上がりです。" },
  }),
  mcq({
    q: { vi: "Vì sao một script automation UI có thể 'vỡ' dù tính năng vẫn hoạt động đúng?", en: "Why can a UI automation script 'break' even when the feature still works correctly?", ja: "機能が正しく動いているのにUI自動化スクリプトが『壊れる』のはなぜ？" },
    options: [
      { vi: "Vì script phụ thuộc vào selector/giao diện, khi UI đổi (id, layout) selector cũ không còn khớp", en: "Because the script depends on selectors/UI, and when the UI changes (id, layout) the old selector no longer matches", ja: "スクリプトはセレクタ/UIに依存しており、UI（id、レイアウト）が変わると古いセレクタが一致しなくなるから" },
      { vi: "Vì máy chủ hết bộ nhớ", en: "Because the server ran out of memory", ja: "サーバーのメモリが不足したから" },
      { vi: "Vì tester quên đăng nhập hệ thống", en: "Because the tester forgot to log into the system", ja: "テスターがシステムにログインし忘れたから" },
      { vi: "Vì tính năng đó chưa từng được test", en: "Because that feature was never tested", ja: "その機能が一度もテストされたことがないから" },
    ], correct: 0,
    explain: { vi: "Script automation 'nhìn' giao diện qua selector; UI đổi (đổi id, đổi layout) mà script không cập nhật sẽ báo lỗi dù tính năng thật vẫn chạy đúng.", en: "An automation script 'sees' the UI through selectors; if the UI changes (id, layout) without the script being updated, it reports a failure even though the real feature still works.", ja: "自動化スクリプトはセレクタを通じてUIを『見て』います。UI（idやレイアウト）が変わってもスクリプトが更新されなければ、実際の機能は正しく動いていてもエラーになります。" },
  }),
  mcq({
    q: { vi: "ROI của tự động hóa được hiểu đơn giản là gì?", en: "What is the ROI of automation, in simple terms?", ja: "自動化のROIとは簡単に言うと何？" },
    options: [
      { vi: "Số dòng code của script automation", en: "The number of lines of code in the automation script", ja: "自動化スクリプトのコード行数" },
      { vi: "Lợi ích (thời gian/công sức tiết kiệm khi chạy lại nhiều lần) so với chi phí viết và bảo trì script", en: "The benefit (time/effort saved from running many times) compared to the cost of writing and maintaining the script", ja: "何度も実行して節約できる時間/労力と、スクリプトの作成・保守コストとを比較した効果" },
      { vi: "Số lượng công cụ automation đang dùng", en: "The number of automation tools currently in use", ja: "現在使用している自動化ツールの数" },
      { vi: "Tốc độ gõ phím của người viết script", en: "The typing speed of the person writing the script", ja: "スクリプトを書く人のタイピング速度" },
    ], correct: 1,
    explain: { vi: "ROI (Return on Investment) so sánh lợi ích tiết kiệm được khi chạy lại nhiều lần với chi phí ban đầu viết + bảo trì — chỉ nên tự động khi lợi ích lớn hơn chi phí.", en: "ROI compares the benefit saved from repeated runs against the upfront cost of writing + maintaining — you should only automate when the benefit outweighs the cost.", ja: "ROI（投資対効果）は、繰り返し実行で節約できる効果と、作成・保守にかかる初期コストを比較するものです。効果がコストを上回る場合にのみ自動化すべきです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Tự động hóa kiểm thử (automation testing) là dùng công cụ/script để tự chạy lại các bước kiểm thử thay vì làm bằng tay — khác với manual testing chỉ dùng con người. Bài này giải thích automation là gì, khác manual thế nào, kim tự tháp kiểm thử (unit/integration/e2e), cách tính ROI để chọn ĐÚNG ca nên tự động, và giới thiệu công cụ phổ biến (Selenium/Cypress/Playwright) qua ví dụ giỏ hàng ShopEasy, kèm đoạn code Playwright chạy được.",
        "Test automation is using tools/scripts to re-run test steps instead of doing them by hand — unlike manual testing, which relies purely on humans. This article explains what automation is, how it differs from manual testing, the test pyramid (unit/integration/e2e), how to calculate ROI to pick the RIGHT cases to automate, and popular tools (Selenium/Cypress/Playwright), all through ShopEasy's cart example with a runnable Playwright snippet.",
        "テスト自動化（automation testing）とは、手作業の代わりにツールやスクリプトでテスト手順を繰り返し実行することです——人間だけに頼るマニュアルテストとは異なります。本記事では、自動化とは何か、マニュアルテストとの違い、テストピラミッド（ユニット/インテグレーション/E2E）、正しく自動化すべきケースを選ぶためのROIの考え方、そして代表的なツール（Selenium/Cypress/Playwright）を、ECアプリShopEasyのカート例と実行可能なPlaywrightコードとともに解説します。"),
      P("Chào bạn mới! Bạn đã quen với việc mở app, nhập liệu, bấm nút rồi tự mắt kiểm tra kết quả — đó là kiểm thử thủ công (manual testing). Nhưng nếu tuần nào cũng phải lặp lại y hệt các bước 'đăng nhập → thêm giỏ hàng → thanh toán' để chắc chắn tính năng cũ chưa bị hỏng sau khi code thay đổi, việc làm tay sẽ rất tốn thời gian và dễ bỏ sót bước. Tự động hóa kiểm thử sinh ra để giải quyết đúng vấn đề đó: viết một lần, máy chạy lại được mãi mãi, nhanh và không mệt.",
        "Hi, newcomer! You're already used to opening an app, entering data, clicking buttons, and checking results with your own eyes — that's manual testing. But if every week you have to repeat the exact same 'login → add to cart → checkout' steps just to make sure old features haven't broken after a code change, doing it by hand becomes very time-consuming and easy to mess up. Test automation exists to solve exactly that problem: write it once, the machine can rerun it forever, fast and tirelessly.",
        "こんにちは、初心者さん！アプリを開き、データを入力し、ボタンを押して自分の目で結果を確認する——それがマニュアルテストです。しかし、コード変更のたびに『ログイン→カート追加→決済』という同じ手順を毎週繰り返して、既存機能が壊れていないか確認しなければならないなら、手作業は非常に時間がかかり、手順を見落としやすくなります。テスト自動化はまさにこの問題を解決するために存在します：一度書けば、機械は何度でも速く疲れずに繰り返し実行できます。"),
      IMG(m_screen, "Màn hình test: giỏ hàng & thanh toán ShopEasy — chú thích ca nên/chưa nên tự động", "Screen under test: ShopEasy cart & checkout — annotated with cases to automate or not", "テスト対象画面：ShopEasyのカート・決済 — 自動化すべき/すべきでないケースの注記付き"),
      DEF("Automation Testing", "dùng công cụ/script để tự thực hiện lại các bước kiểm thử và so khớp kết quả, thay vì tester làm bằng tay mỗi lần.",
        "using tools/scripts to automatically re-run test steps and compare results, instead of a tester doing them by hand each time.",
        "テスターが毎回手作業で行う代わりに、ツールやスクリプトでテスト手順を自動的に繰り返し実行し結果を照合する手法。"),
    ] },
  { heading: { vi: "2. Tự động hóa kiểm thử là gì & khác gì manual testing", en: "2. What is test automation & how it differs from manual testing", ja: "2. テスト自動化とは？マニュアルテストとの違い" },
    blocks: [
      P("Cách dễ nhớ nhất: manual testing là 'con người tự tay làm', còn automation testing là 'máy làm lại theo kịch bản con người đã viết sẵn'. Cả hai đều kiểm tra xem phần mềm có hoạt động đúng không, nhưng khác ở AI thực hiện và khi nào nên dùng cái nào. Manual phù hợp khi tính năng còn mới, giao diện còn thay đổi liên tục, hoặc cần đánh giá trải nghiệm bằng cảm quan con người. Automation phù hợp khi ca kiểm thử đã ổn định và cần chạy đi chạy lại nhiều lần.",
        "The easiest way to remember: manual testing is 'a human doing it by hand', while automation testing is 'a machine repeating a script the human already wrote'. Both check whether the software works correctly, but they differ in WHO performs it and WHEN each should be used. Manual fits when a feature is new, the UI still changes often, or you need a human's sense of experience. Automation fits when a test case is already stable and needs to run over and over.",
        "覚え方：マニュアルテストは『人間が手作業で行う』、自動化テストは『人間があらかじめ書いたスクリプトを機械が繰り返す』ことです。どちらもソフトウェアが正しく動くかを確認しますが、誰が実行するか、いつどちらを使うべきかが異なります。機能がまだ新しくUIが頻繁に変わる場合や、人間の感覚で体験を評価する必要がある場合はマニュアルが向いています。テストケースがすでに安定していて何度も繰り返し実行する必要がある場合は自動化が向いています。"),
      IMG(m_manual_vs_auto, "Bảng so sánh Manual Testing vs Automation Testing trên cùng ShopEasy", "Manual vs automation comparison table on the same ShopEasy features", "同じShopEasyの機能で比較したManual vs Automationテスト表"),
      P("Nhiều bạn mới nghĩ automation 'giỏi hơn' manual nên cứ có thời gian là nên tự động hóa hết. Thực tế không phải vậy: automation chỉ giỏi lặp lại chính xác những gì đã được lập trình sẵn, nó không tự phát hiện ra giao diện xấu, chữ bị lệch, hay trải nghiệm khó dùng — những thứ mắt người nhận ra ngay lập tức. Vì vậy hai loại kiểm thử này BỔ SUNG cho nhau chứ không thay thế nhau hoàn toàn.",
        "Many beginners think automation is 'better' than manual, so any spare time should go into automating everything. That's not quite right: automation is only good at precisely repeating what's already been programmed — it doesn't spot an ugly UI, misaligned text, or a confusing experience on its own, things a human eye notices instantly. So the two testing types COMPLEMENT each other rather than fully replacing one another.",
        "多くの初心者は自動化がマニュアルより『優れている』と考え、時間があればすべて自動化すべきだと思いがちです。実際はそうではありません：自動化はすでにプログラムされた通りに正確に繰り返すことが得意なだけで、見た目の悪さや文字のズレ、使いにくい体験を自ら発見することはできません——それらは人間の目ならすぐに気づくものです。そのため、この2つのテストは互いを完全に置き換えるのではなく、補い合う関係にあります。"),
      DEF("Manual Testing", "kiểm thử do con người thao tác trực tiếp, quan sát và đánh giá kết quả bằng mắt/trải nghiệm thật.",
        "testing performed directly by a human, observing and evaluating results with real eyes and experience.",
        "人間が直接操作し、実際の目と体験で結果を観察・評価するテスト手法。"),
    ] },
  { heading: { vi: "3. Vì sao người mới nên hiểu tự động hóa sớm", en: "3. Why beginners should understand automation early", ja: "3. 初心者が早く自動化を理解すべき理由" },
    blocks: [
      P("Rất ít công ty hiện nay chỉ dùng manual testing thuần túy. Ngay cả một tester mới vào nghề, làm manual là chính, cũng thường được hỏi 'em có biết automation không' trong phỏng vấn, hoặc sẽ dần được giao viết vài script đơn giản khi dự án lớn lên. Hiểu đúng automation từ sớm giúp bạn không bị choáng ngợp khi công việc yêu cầu, và biết cách phối hợp với đội automation nếu bạn chỉ làm manual.",
        "Very few companies today rely purely on manual testing. Even a junior tester doing mostly manual work is often asked 'do you know automation' in interviews, or will gradually be assigned to write a few simple scripts as the project grows. Understanding automation early keeps you from being overwhelmed when the job demands it, and helps you collaborate with the automation team even if you mainly do manual work.",
        "純粋にマニュアルテストだけに頼っている会社は今ではごくわずかです。主にマニュアル作業をする新人テスターでも、面接で『自動化を知っていますか』と聞かれたり、プロジェクトが大きくなるにつれて簡単なスクリプトを書くよう任されたりすることがよくあります。早くから自動化を正しく理解しておけば、業務で求められたときに慌てず、自分がマニュアル中心でも自動化チームと連携しやすくなります。"),
      P("Quan trọng hơn, hiểu automation không chỉ là học cú pháp một công cụ — nó rèn cho bạn TƯ DUY kiểm thử có hệ thống: chia nhỏ luồng thành các bước rõ ràng, xác định kết quả mong đợi cụ thể, và nghĩ trước xem ca nào đáng để đầu tư công sức lặp lại. Tư duy này giúp cả manual testing của bạn cũng chặt chẽ hơn, không chỉ riêng automation.",
        "More importantly, understanding automation isn't just learning one tool's syntax — it trains a systematic testing MINDSET: breaking a flow into clear steps, defining specific expected results, and thinking ahead about which cases are worth the effort to repeat. This mindset makes even your manual testing tighter, not just your automation work.",
        "さらに重要なのは、自動化を理解することは1つのツールの構文を覚えることだけではなく、体系的なテスト思考——フローを明確なステップに分解し、具体的な期待結果を定義し、どのケースが繰り返す価値があるかを事前に考える力を鍛えることです。この思考法は自動化だけでなく、あなたのマニュアルテストもより緻密にしてくれます。"),
      P("Và với riêng bạn — người mới — biết automation từ sớm mở ra nhiều cơ hội nghề nghiệp hơn: bạn có thể ứng tuyển cả vị trí Manual QA lẫn Automation QA, và mức lương của Automation QA thường cao hơn vì đòi hỏi thêm kỹ năng lập trình. Bắt đầu hiểu đúng khái niệm ngay từ bài này là bước nền tảng trước khi đi sâu vào từng công cụ cụ thể.",
        "And for you specifically — a beginner — knowing automation early opens more career opportunities: you can apply for both Manual QA and Automation QA roles, and Automation QA salaries tend to be higher because they require extra programming skills. Getting the concepts right starting with this article is the foundational step before diving into any specific tool.",
        "そして特に初心者のあなたにとって、早くから自動化を知ることはより多くのキャリアの機会を開きます：Manual QAとAutomation QAの両方の職に応募でき、Automation QAはプログラミングスキルが追加で必要なため給与が高めになる傾向があります。この記事から正しい概念を理解することは、特定のツールを深く学ぶ前の土台となる第一歩です。"),
    ] },
  { heading: { vi: "4. Kim tự tháp kiểm thử: unit, integration, e2e", en: "4. The test pyramid: unit, integration, e2e", ja: "4. テストピラミッド：ユニット、インテグレーション、E2E" },
    blocks: [
      P("Kim tự tháp kiểm thử (test pyramid) là mô hình gợi ý nên viết BAO NHIÊU test ở mỗi tầng. Càng xuống thấp (unit), test càng nhỏ, chạy càng nhanh, nên viết nhiều. Càng lên cao (E2E/UI), test càng lớn, càng chậm và dễ vỡ khi giao diện thay đổi, nên viết ít và chọn lọc kỹ những luồng quan trọng nhất.",
        "The test pyramid is a model suggesting HOW MANY tests to write at each layer. The lower down (unit), the smaller and faster tests are, so you should write many. The higher up (E2E/UI), the bigger, slower, and more fragile tests become when the UI changes, so you should write fewer and pick only the most important flows.",
        "テストピラミッドは、各層でどれくらいの数のテストを書くべきかを示すモデルです。下（ユニット）に行くほどテストは小さく速く実行でき、多く書くべきです。上（E2E/UI）に行くほどテストは大きく、遅く、UI変更で壊れやすくなるため、少なく厳選して最も重要なフローだけを書くべきです。"),
      STEP(1, "Tầng đáy — Unit: kiểm tra từng hàm/nghiệp vụ nhỏ độc lập, ví dụ hàm tính tổng tiền giỏ hàng hay hàm áp mã giảm giá.", "Bottom layer — Unit: test each small, independent function/logic, e.g. the function that calculates cart total or applies a discount code.", "最下層 — Unit：カート合計を計算する関数や割引コードを適用する関数など、独立した小さな機能ごとにテストする。"),
      STEP(2, "Tầng giữa — Integration: kiểm tra các phần ghép lại có làm việc đúng với nhau không, ví dụ API tạo đơn hàng gọi đúng service thanh toán và kho.", "Middle layer — Integration: test whether pieces work correctly together, e.g. the order-creation API correctly calling the payment and inventory services.", "中間層 — Integration：部品同士が正しく連携するかを確認する。例えば注文作成APIが決済・在庫サービスを正しく呼び出すか。"),
      STEP(3, "Tầng đỉnh — E2E/UI: kiểm tra cả luồng thật trên trình duyệt như người dùng thật, ví dụ đăng nhập → thêm giỏ hàng → thanh toán trên ShopEasy.", "Top layer — E2E/UI: test the real flow in a real browser like a real user, e.g. login → add to cart → checkout on ShopEasy.", "最上層 — E2E/UI：実際のユーザーのように本物のブラウザで実際のフローをテストする。例えばShopEasyでのログイン→カート追加→決済。"),
      IMG(m_pyramid, "Kim tự tháp kiểm thử — tỉ lệ khuyến nghị & ví dụ trên ShopEasy", "The test pyramid — recommended ratio & ShopEasy examples", "テストピラミッド — 推奨比率とShopEasyの例"),
      TRY("Nhìn vào một tính năng của app bạn dùng (ví dụ giỏ hàng) và thử liệt kê: 1 ca có thể test ở tầng Unit, 1 ca ở Integration, 1 ca ở E2E.", "Look at a feature of an app you use (e.g. the cart) and try to list: 1 case testable at Unit level, 1 at Integration, 1 at E2E.", "使っているアプリの機能（例：カート）を見て、Unit層で1つ、Integration層で1つ、E2E層で1つ、テスト可能なケースを挙げてみよう。"),
    ] },
  { heading: { vi: "5. ROI tự động hóa & cách chọn ca nên tự động hóa", en: "5. Automation ROI & how to choose which cases to automate", ja: "5. 自動化のROIと自動化すべきケースの選び方" },
    blocks: [
      P("Viết và bảo trì một script automation luôn tốn công sức ban đầu (viết script + xử lý dữ liệu test + sửa khi UI đổi). Nếu ca kiểm thử đó chỉ chạy một vài lần trong đời, chi phí này thường KHÔNG hoàn vốn — làm tay lại nhanh và rẻ hơn. Cách quyết định thực dụng: so sánh THỜI GIAN TIẾT KIỆM ĐƯỢC khi chạy lại nhiều lần với CHI PHÍ viết + bảo trì script — đây chính là ROI (Return on Investment) của tự động hóa.",
        "Writing and maintaining an automation script always costs upfront effort (writing the script, handling test data, fixing it when the UI changes). If a test case only runs a few times in its whole life, that cost usually doesn't pay back — doing it manually is faster and cheaper. A practical way to decide: compare the TIME SAVED from running it repeatedly against the COST of writing and maintaining the script — that's automation's ROI (Return on Investment).",
        "自動化スクリプトの作成と保守には常に初期の労力がかかります（スクリプト作成、テストデータの処理、UI変更時の修正）。そのテストケースが一生のうち数回しか実行されないなら、このコストは通常回収できません——手動の方が速く安上がりです。実用的な判断方法：繰り返し実行することで節約できる時間と、スクリプトの作成・保守にかかるコストを比較すること——これが自動化のROI（投資対効果）です。"),
      IMG(m_choose_case, "Bảng chọn ca nào NÊN tự động hóa trên ShopEasy", "Table for choosing which cases to automate on ShopEasy", "ShopEasyで自動化すべきケースを選ぶ表"),
      STEP(1, "Ưu tiên ca chạy LẶP LẠI NHIỀU LẦN (hồi quy mỗi sprint, mỗi bản build) thay vì ca chỉ chạy 1-2 lần.", "Prioritize cases that run REPEATEDLY (regression every sprint, every build) over cases that only run once or twice.", "1〜2回しか実行しないケースより、繰り返し実行される（毎スプリント、毎ビルドの回帰テスト）ケースを優先する。"),
      STEP(2, "Ưu tiên logic/giao diện đã ỔN ĐỊNH; tránh tự động hóa tính năng còn đang thay đổi thiết kế liên tục.", "Prioritize logic/UI that is already STABLE; avoid automating features whose design is still changing constantly.", "すでに安定しているロジック/UIを優先する。デザインが頻繁に変わっている機能の自動化は避ける。"),
      STEP(3, "Ưu tiên luồng QUAN TRỌNG với người dùng/doanh thu (đăng nhập, thanh toán) hơn tính năng phụ ít ảnh hưởng.", "Prioritize flows that matter to USERS/REVENUE (login, checkout) over minor, low-impact features.", "ユーザー/売上にとって重要なフロー（ログイン、決済）を、影響の小さい副次的機能より優先する。"),
      PITFALL("Cố tự động hóa MỌI THỨ ngay khi mới học xong công cụ, kể cả các ca chỉ chạy một lần — script viết ra dùng vài lần rồi bỏ, lãng phí công sức hơn cả làm tay.", "Trying to automate EVERYTHING right after learning a tool, including cases that only run once — the script gets used a few times then abandoned, wasting more effort than doing it manually.", "ツールを学んだばかりですぐに何でも自動化しようとし、一度しか実行しないケースまで対象にしてしまう——スクリプトは数回使われて放置され、手動より労力が無駄になる。"),
      TIP("Nếu không chắc có nên tự động hóa một ca hay không, hãy ước lượng: nó sẽ chạy lại bao nhiêu lần trong 3 tháng tới? Nếu dưới 5 lần, làm tay thường vẫn rẻ hơn.", "If unsure whether to automate a case, estimate: how many times will it run again in the next 3 months? If fewer than 5, manual is usually still cheaper.", "あるケースを自動化すべきか迷ったら、今後3ヶ月で何回実行されるか見積もろう。5回未満なら、通常は手動の方が安上がりです。"),
    ] },
  { heading: { vi: "6. Thực hành: viết một ca automation đơn giản (Playwright)", en: "6. Hands-on: writing a simple automation case (Playwright)", ja: "6. 実習：シンプルな自動化ケースを書く（Playwright）" },
    blocks: [
      P("Giờ ta áp dụng thật: chọn ca 'đăng nhập → thêm giỏ hàng → thanh toán' trên ShopEasy — luồng chạy mỗi sprint, logic đã ổn định, rất đáng để tự động hóa theo bảng ROI ở chương trước. Trước khi viết script, luôn viết ra các bước và kết quả mong đợi bằng ngôn ngữ thường trước, sau đó mới chuyển thành code.",
        "Now let's apply it for real: pick the 'login → add to cart → checkout' case on ShopEasy — a flow that runs every sprint with already-stable logic, well worth automating per the ROI table from the previous chapter. Before writing the script, always write the steps and expected results in plain language first, then translate them into code.",
        "では実際に適用しましょう：ShopEasyの『ログイン→カート追加→決済』ケースを選びます——毎スプリント実行され、ロジックはすでに安定しており、前章のROI表によれば十分に自動化する価値があります。スクリプトを書く前に、常にまず手順と期待結果を普通の言葉で書き出し、それからコードに変換します。"),
      STEP(1, "Viết các bước bằng lời trước: đăng nhập → mở trang sản phẩm → thêm vào giỏ → vào giỏ hàng sửa số lượng → kiểm tra tổng tiền → bấm đặt hàng → kiểm tra thông báo thành công.", "First write the steps in words: log in → open the product page → add to cart → go to cart, edit quantity → check the total → click order → check the success message.", "まず手順を言葉で書く：ログイン→商品ページを開く→カートに追加→カートで数量を編集→合計を確認→注文ボタンを押す→成功メッセージを確認。"),
      STEP(2, "Xác định kết quả mong đợi CỤ THỂ cho từng bước (ví dụ tổng tiền phải đúng '398.000đ'), không viết mơ hồ kiểu 'trang hiển thị đúng'.", "Define a SPECIFIC expected result for each step (e.g. the total must be exactly '398.000đ'), not a vague one like 'page displays correctly'.", "各手順に対して具体的な期待結果を定義する（例：合計は正確に『398.000đ』でなければならない）。『ページが正しく表示される』のような曖昧な表現にしない。"),
      STEP(3, "Chuyển từng bước thành lệnh của công cụ automation (ở đây dùng Playwright): mở trang, điền form, bấm nút, so khớp kết quả bằng assertion.", "Convert each step into automation tool commands (here using Playwright): open the page, fill the form, click the button, compare results with an assertion.", "各手順を自動化ツールのコマンドに変換する（ここではPlaywrightを使用）：ページを開く、フォームに入力する、ボタンをクリックする、アサーションで結果を照合する。"),
      CODE("text", "QUYET DINH CO NEN TU DONG HOA CA NAY KHONG (pseudo code)\n\nfunction nenTuDongHoa(ca) {\n  if (ca.soLanChayMoiThang < 2) return false; // chi chay 1-2 lan, lam tay nhanh hon\n  if (ca.giaoDienDangThayDoiLienTuc) return false; // script se vo lien tuc\n  if (ca.canDanhGiaCamQuan) return false; // tham my/UX nguoi lam tot hon may\n\n  const gioTietKiemMoiThang = ca.soLanChayMoiThang * ca.thoiGianLamTayPhut / 60;\n  const chiPhiVietVaBaoTri = 8; // gio, uoc luong ban dau\n  return gioTietKiemMoiThang * 3 > chiPhiVietVaBaoTri; // ky vong hoan von trong ~3 thang\n}\n\n// Ap dung cho ca 'dang nhap -> them gio hang -> thanh toan':\nnenTuDongHoa({ soLanChayMoiThang: 20, thoiGianLamTayPhut: 6, giaoDienDangThayDoiLienTuc: false, canDanhGiaCamQuan: false });\n// => true (NEN tu dong hoa)"),
      CODE("javascript", "import { test, expect } from '@playwright/test';\n\ntest('ShopEasy: dang nhap, them gio hang, thanh toan thanh cong', async ({ page }) => {\n  // 1) Dang nhap\n  await page.goto('https://shopeasy.vn/dang-nhap');\n  await page.fill('#email', 'mai.tran@gmail.com');\n  await page.fill('#password', 'Mai@2024');\n  await page.click('button[data-testid=\"btn-dang-nhap\"]');\n\n  // 2) Them san pham vao gio hang\n  await page.goto('https://shopeasy.vn/san-pham/ao-thun-basic');\n  await page.click('button[data-testid=\"btn-them-gio\"]');\n\n  // 3) Vao gio hang, sua so luong, kiem tra tong tien\n  await page.goto('https://shopeasy.vn/gio-hang');\n  await page.fill('input[name=\"soluong\"]', '2');\n  await expect(page.locator('#tong-tien')).toHaveText('398.000d');\n\n  // 4) Dat hang va xac nhan thanh cong\n  await page.click('button[data-testid=\"btn-dat-hang\"]');\n  await expect(page.locator('.thong-bao-thanh-cong')).toBeVisible();\n});"),
      TRY("Nhìn đoạn code Playwright trên, thử tìm 1 bước bạn sẽ thêm nữa (ví dụ kiểm tra tên sản phẩm trong giỏ hàng đúng như đã thêm).", "Looking at the Playwright code above, try to find one more step you'd add (e.g. checking the product name in the cart matches what was added).", "上のPlaywrightコードを見て、追加したいステップを1つ考えてみよう（例：カート内の商品名が追加したものと一致するか確認する）。"),
    ] },
  { heading: { vi: "7. Tình huống 1: tự động hóa ca chỉ chạy một lần → lãng phí", en: "7. Situation 1: automating a case that only runs once → wasted effort", ja: "7. シーン1：一度しか実行しないケースを自動化 → 無駄な労力" },
    blocks: [
      SITUATION("Một bạn tester mới học xong Playwright, thấy rất hào hứng nên viết script tự động cho MỌI ca kiểm thử tuần đó, kể cả ca 'kiểm tra banner khuyến mãi Black Friday' chỉ xuất hiện đúng 1 tuần.", "A tester who just finished learning Playwright gets excited and writes automation scripts for EVERY test case that week, including 'check the Black Friday promo banner' which only appears for exactly 1 week.",
        "Bạn mất 3 giờ viết script cho banner đó, nhưng banner chỉ tồn tại 7 ngày rồi bị gỡ bỏ — script chưa từng được chạy lại lần thứ hai. Trong khi đó, ca 'đăng nhập → thanh toán' chạy mỗi sprint suốt cả năm vẫn đang làm tay.", "The tester spends 3 hours writing a script for that banner, but the banner only exists for 7 days before being removed — the script is never run a second time. Meanwhile, the 'login → checkout' case, which runs every sprint all year, is still being done by hand.",
        "Playwrightを学んだばかりのテスターが張り切って、Black Fridayの1週間だけ表示されるプロモバナーの確認ケースを含め、その週の全テストケースを自動化スクリプトにしてしまう。",
        "そのバナーのスクリプト作成に3時間かけたが、バナーは7日で削除され、スクリプトは二度と実行されなかった。一方で、1年中毎スプリント実行される『ログイン→決済』ケースは依然として手作業のままだった。"),
      SOLVE("Áp dụng bảng ROI trước khi viết script: hỏi 'ca này còn chạy lại bao nhiêu lần?' trước khi bắt tay code. Ưu tiên tự động hóa những luồng chạy LẶP LẠI NHIỀU LẦN như đăng nhập/thanh toán trước, để lại các ca một lần cho manual testing.", "Apply the ROI table before writing a script: ask 'how many more times will this case run?' before coding. Prioritize automating REPEATEDLY-RUN flows like login/checkout first, and leave one-off cases to manual testing.", "スクリプトを書く前にROI表を適用し、コードを書く前に『このケースはあと何回実行されるか』を自問する。ログイン/決済のように何度も繰り返し実行されるフローの自動化を優先し、一度きりのケースはマニュアルテストに任せる。"),
      P("Bài học ở đây là: automation không tự động 'tốt hơn' cho mọi ca. Ca chỉ chạy một lần thì chi phí viết + bảo trì script gần như chắc chắn KHÔNG hoàn vốn. Trước khi viết bất kỳ script nào, hãy tự hỏi câu hỏi ở chương 5: ca này còn chạy lại bao nhiêu lần trong 3 tháng tới?",
        "The lesson here: automation isn't automatically 'better' for every case. A case that only runs once almost certainly won't pay back the cost of writing + maintaining a script. Before writing any script, ask the question from chapter 5: how many more times will this case run in the next 3 months?",
        "ここでの教訓は：自動化はすべてのケースに対して自動的に『優れている』わけではないということです。一度しか実行しないケースは、スクリプトの作成・保守コストをほぼ確実に回収できません。どんなスクリプトを書く前にも、第5章の問いを自分に投げかけましょう：このケースは今後3ヶ月であと何回実行されるだろうか？"),
      RECAP(["Automation KHÔNG phải lúc nào cũng đáng đầu tư — hỏi 'còn chạy lại mấy lần' trước khi viết script", "Ưu tiên tự động hóa luồng chạy lặp lại nhiều lần (đăng nhập, thanh toán) trước ca chỉ chạy một lần"],
        ["Automation is NOT always worth the investment — ask 'how many more times will it run' before writing a script", "Prioritize automating frequently-repeated flows (login, checkout) over one-off cases"],
        ["自動化は常に投資する価値があるわけではない——スクリプトを書く前に『あと何回実行されるか』を問う", "一度きりのケースより、繰り返し実行されるフロー（ログイン、決済）の自動化を優先する"]),
    ] },
  { heading: { vi: "8. Tình huống 2: UI đổi liên tục làm script vỡ (flaky)", en: "8. Situation 2: constantly changing UI breaks scripts (flaky)", ja: "8. シーン2：頻繁に変わるUIがスクリプトを壊す（フレーキー）" },
    blocks: [
      SITUATION("Đội đã tự động hóa script checkout ShopEasy. Tuần này team frontend đổi id nút 'Đặt hàng' từ #btn-order sang #checkout-submit để refactor code, không báo trước cho ai.", "The team automated ShopEasy's checkout script. This week, the frontend team changes the 'Place Order' button's id from #btn-order to #checkout-submit for a refactor, without telling anyone.",
        "Script automation báo FAIL đỏ toàn bộ dù tính năng đặt hàng thật vẫn chạy hoàn hảo — chỉ vì selector cũ không còn tìm thấy nút. Cả đội hoảng vì tưởng có bug nghiêm trọng, mất nửa buổi mới phát hiện ra chỉ là do id đổi.", "The automation script reports a full red FAIL even though the real order feature still works perfectly — just because the old selector can no longer find the button. The team panics thinking there's a serious bug, and it takes half a day to discover it's just the id that changed.",
        "チームはShopEasyの決済スクリプトを自動化していた。今週、フロントエンドチームがリファクタリングのため『注文する』ボタンのidを#btn-orderから#checkout-submitに変更し、誰にも知らせなかった。",
        "実際の注文機能は完璧に動いているにもかかわらず、古いセレクタがボタンを見つけられなくなっただけで、自動化スクリプトは全体が赤いFAILを報告した。チームは重大なバグだと慌て、半日かけてidの変更が原因だと突き止めた。"),
      SOLVE("Dùng selector ổn định thay vì phụ thuộc id/class có thể đổi khi refactor — ví dụ thuộc tính data-testid riêng dành cho test, không liên quan tới code giao diện. Đồng thời thống nhất với đội dev: khi đổi giao diện có ảnh hưởng tới data-testid, cần báo trước cho đội automation.", "Use stable selectors instead of relying on ids/classes that can change during refactoring — e.g. a dedicated data-testid attribute for testing, unrelated to UI code. Also agree with the dev team: when a UI change affects data-testid, the automation team should be notified in advance.", "リファクタリングで変わりやすいid/classに頼るのではなく、UIコードとは無関係なテスト専用のdata-testid属性のような安定したセレクタを使う。また、開発チームと合意しておく：UI変更がdata-testidに影響する場合は事前に自動化チームへ知らせること。"),
      P("Đây là 'lỗi' rất phổ biến của automation gọi là flaky/brittle test — script báo sai (false alarm) không phải vì phần mềm lỗi mà vì cách viết script quá phụ thuộc vào chi tiết giao diện dễ đổi. Chọn selector ổn định ngay từ đầu là kỹ năng quan trọng để script sống lâu, ít phải sửa lại mỗi khi giao diện thay đổi.",
        "This is a very common automation 'issue' called a flaky/brittle test — the script reports a false alarm not because the software is broken, but because the script relies too heavily on UI details that change easily. Choosing stable selectors from the start is an important skill to make scripts long-lived and rarely need fixing whenever the UI changes.",
        "これはフレーキー/脆いテストと呼ばれる自動化のよくある『問題』です——ソフトウェアが壊れているのではなく、スクリプトが変わりやすいUIの詳細に依存しすぎているために誤報が発生します。最初から安定したセレクタを選ぶことは、UIが変わるたびに修正が必要にならない、長持ちするスクリプトを作るための重要なスキルです。"),
      IMG(m_kanban, "Bảng theo dõi script automation bị vỡ do UI đổi & tiến độ sửa", "Board tracking automation scripts broken by UI changes & fix progress", "UI変更で壊れた自動化スクリプトと修正進捗の追跡ボード"),
      RECAP(["Script FAIL không phải lúc nào cũng nghĩa là phần mềm có lỗi — có thể do selector cũ, gọi là flaky test", "Chọn selector ổn định (như data-testid) và thống nhất với đội dev để script ít bị vỡ"],
        ["A script FAIL doesn't always mean the software is broken — it may be an outdated selector, called a flaky test", "Choose stable selectors (like data-testid) and align with the dev team so scripts break less often"],
        ["スクリプトのFAILは必ずしもソフトウェアのバグを意味しない——古いセレクタが原因のフレーキーテストの場合もある", "安定したセレクタ（data-testidなど）を選び、開発チームと連携してスクリプトが壊れにくいようにする"]),
    ] },
  { heading: { vi: "9. Công cụ phổ biến & lộ trình học automation cho người mới", en: "9. Popular tools & a learning roadmap for beginners", ja: "9. 代表的なツールと初心者向け学習ロードマップ" },
    blocks: [
      P("Có nhiều công cụ để viết automation, nhưng phổ biến nhất cho web hiện nay là Selenium, Cypress và Playwright. Cả ba đều điều khiển trình duyệt thay bạn: mở trang, gõ chữ, bấm nút, đọc nội dung để so khớp. Selenium có tuổi đời lâu nhất, cộng đồng lớn, hỗ trợ nhiều ngôn ngữ lập trình. Cypress thân thiện, dễ debug, phổ biến cho web hiện đại. Playwright hiện đại, chạy nhanh, hỗ trợ nhiều trình duyệt (Chrome, Firefox, Safari) trong một bộ công cụ, đang được nhiều đội mới chọn.",
        "There are many tools for writing automation, but the most popular for web today are Selenium, Cypress, and Playwright. All three control a browser on your behalf: opening pages, typing, clicking, and reading content to compare. Selenium has the longest history, the biggest community, and supports many programming languages. Cypress is friendly and easy to debug, popular for modern web apps. Playwright is modern, fast, and supports multiple browsers (Chrome, Firefox, Safari) in one toolkit, and is increasingly chosen by new teams.",
        "自動化を書くためのツールは数多くありますが、現在Web向けで最も人気なのはSelenium、Cypress、Playwrightです。3つともあなたの代わりにブラウザを操作します：ページを開き、入力し、クリックし、内容を読み取って照合します。Seleniumは最も歴史が長く、コミュニティが大きく、多くのプログラミング言語をサポートします。Cypressは扱いやすくデバッグしやすく、現代的なWebアプリで人気です。Playwrightはモダンで動作が速く、Chrome、Firefox、Safariなど複数ブラウザを1つのツールセットでサポートしており、新しいチームに選ばれることが増えています。"),
      P("Về lộ trình học, người mới nên đi theo thứ tự: (1) thành thạo tư duy manual testing trước — viết test case rõ ràng, hiểu kết quả mong đợi; (2) học một ngôn ngữ lập trình cơ bản (JavaScript hoặc Python là lựa chọn phổ biến); (3) học một công cụ automation (khuyến nghị bắt đầu với Playwright vì dễ tiếp cận); (4) thực hành viết script cho vài luồng đơn giản trước khi mở rộng ra cả bộ hồi quy; (5) học cách đưa script chạy tự động trong CI/CD để không phải chạy tay mỗi lần.",
        "As for the roadmap, beginners should follow this order: (1) master manual testing thinking first — write clear test cases, understand expected results; (2) learn a basic programming language (JavaScript or Python are popular choices); (3) learn one automation tool (Playwright is recommended as a starting point for its accessibility); (4) practice writing scripts for a few simple flows before expanding to a full regression suite; (5) learn to run scripts automatically in CI/CD so you don't have to run them by hand each time.",
        "学習ロードマップとしては、初心者は次の順序で進めるべきです：(1) まずマニュアルテストの思考を身につける——明確なテストケースを書き、期待結果を理解する；(2) 基本的なプログラミング言語を学ぶ（JavaScriptやPythonが一般的な選択肢）；(3) 1つの自動化ツールを学ぶ（取り組みやすさからPlaywrightを最初のツールとして推奨）；(4) 回帰テスト一式に拡張する前に、いくつかのシンプルなフローでスクリプトを書く練習をする；(5) 毎回手動で実行しなくて済むよう、CI/CDでスクリプトを自動実行する方法を学ぶ。"),
      IMG(m_dash, "Số liệu ROI thực tế sau khi tự động hóa đúng ca tại ShopEasy", "Real ROI metrics after correctly automating cases at ShopEasy", "ShopEasyで正しくケースを自動化した後の実際のROI指標"),
      TIP("Đừng cố học hết cả ba công cụ cùng lúc. Chọn MỘT công cụ (khuyến nghị Playwright), làm chắc một luồng đơn giản trước, rồi mở rộng dần — học sâu một công cụ luôn hiệu quả hơn học lướt nhiều công cụ.",
        "Don't try to learn all three tools at once. Pick ONE tool (Playwright recommended), master one simple flow first, then expand gradually — going deep on one tool always beats skimming several.",
        "3つのツールを一度に学ぼうとしないこと。1つのツール（Playwright推奨）を選び、まずシンプルなフローを確実にこなしてから徐々に広げよう——1つのツールを深く学ぶ方が、複数を浅く学ぶより常に効果的です。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Manual Testing là gì cho người mới", "What is manual testing for beginners", "manual-testing-la-gi-cho-nguoi-moi", "初心者のためのマニュアルテストとは"),
      INTERNAL("Kiểm thử hồi quy & Smoke Test cho người mới", "Regression & smoke testing for beginners", "kiem-thu-hoi-quy-smoke-test-cho-nguoi-moi", "初心者のための回帰テストとスモークテスト"),
      INTERNAL("Cách viết Test Case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi", "初心者のためのテストケースの書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học automation testing là gì, khác manual testing ra sao, kim tự tháp kiểm thử (unit/integration/e2e), cách tính ROI để chọn đúng ca nên tự động, và thực hành viết một script Playwright thật cho luồng checkout ShopEasy. Hai tình huống cũng cho thấy hai bẫy phổ biến: tự động hóa ca chỉ chạy một lần gây lãng phí, và script vỡ (flaky) khi UI đổi mà selector không ổn định.",
        "You just learned what test automation is, how it differs from manual testing, the test pyramid (unit/integration/e2e), how to calculate ROI to pick the right cases to automate, and hands-on practice writing a real Playwright script for ShopEasy's checkout flow. Two situations also showed two common pitfalls: automating a one-off case wastes effort, and scripts break (flaky) when the UI changes but selectors aren't stable.",
        "自動化テストとは何か、マニュアルテストとの違い、テストピラミッド（ユニット/インテグレーション/E2E）、正しく自動化すべきケースを選ぶためのROIの計算方法、そしてShopEasyの決済フローに対する実際のPlaywrightスクリプトの書き方を実習しました。2つのシーンは一般的な2つの落とし穴も示しました：一度きりのケースを自動化すると労力が無駄になること、そしてUIが変わってもセレクタが安定していないとスクリプトが壊れる（フレーキー）ことです。"),
      P("Chặng tiếp theo, bạn nên thực hành sâu hơn với một công cụ cụ thể (khuyến nghị Playwright), học cách tổ chức script gọn gàng (Page Object Model) và đưa script chạy tự động trong CI/CD. Nếu muốn học bài bản từ con số 0 tới đi làm, có cả manual lẫn automation, cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should practice more deeply with one specific tool (Playwright recommended), learn to organize scripts cleanly (Page Object Model), and set scripts to run automatically in CI/CD. If you want to learn properly from zero to hired, covering both manual and automation, with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、特定のツール（Playwright推奨）でより深く実践し、スクリプトをきれいに整理する方法（Page Object Model）を学び、CI/CDでスクリプトを自動実行するよう設定しましょう。マニュアルと自動化の両方を、指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const AU_INTRO_01_DOC = makeDoc({
  slug: "tu-dong-hoa-kiem-thu-la-gi-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "tự động hóa kiểm thử",
  keywords: ["tự động hóa kiểm thử", "automation testing", "kim tự tháp kiểm thử", "ROI tự động hóa", "Selenium Cypress Playwright"],
  coverLabel: "NGƯỜI MỚI · AUTOMATION LÀ GÌ · TMĐT",
  crumb: "Tự động hóa kiểm thử là gì & khi nào nên tự động hóa",
  metaTitle: { vi: "Tự động hóa kiểm thử là gì? Khi nào nên dùng (người mới)", en: "What is test automation? When to use it (beginners)", ja: "テスト自動化とは？初心者向け・使うタイミング" },
  metaDescription: {
    vi: "Tự động hóa kiểm thử là gì, khác manual thế nào, khi nào nên dùng: kim tự tháp test, ROI, chọn ca tự động qua ví dụ ShopEasy, có hình minh hoạ và trắc nghiệm.",
    en: "What test automation is, how it differs from manual testing, and when to apply it: the test pyramid, ROI, how to choose which cases to automate through ShopEasy examples, with visuals and a quiz.",
    ja: "テスト自動化とは何か、マニュアルテストとの違い、いつ導入すべきか：テストピラミッド、ROI、ShopEasyの例で自動化ケースの選び方を、図とクイズ付きで解説します。",
  },
  title: {
    vi: "Tự động hóa kiểm thử là gì & khi nào nên tự động hóa: hướng dẫn cho người mới (có trắc nghiệm)",
    en: "What is test automation & when to automate: a beginner's guide (with quiz)",
    ja: "テスト自動化とは？いつ自動化すべきか：初心者向けガイド（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: automation là gì, khác manual testing thế nào, kim tự tháp kiểm thử (unit/integration/e2e), cách tính ROI để chọn ca nên tự động, công cụ phổ biến (Selenium/Cypress/Playwright) và lộ trình học. Minh hoạ trên app TMĐT ShopEasy, kèm code pseudo và Playwright chạy được, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: what automation is, how it differs from manual testing, the test pyramid (unit/integration/e2e), how to calculate ROI to choose which cases to automate, popular tools (Selenium/Cypress/Playwright) and a learning roadmap. Illustrated through the ShopEasy e-commerce app, with runnable pseudo and Playwright code, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：自動化とは何か、マニュアルテストとの違い、テストピラミッド（ユニット/インテグレーション/E2E）、自動化すべきケースを選ぶためのROIの計算方法、代表的なツール（Selenium/Cypress/Playwright）と学習ロードマップ。ECアプリShopEasyで例示し、実行可能な擬似コードとPlaywrightコード、多数のUIモック、FAQ、5問クイズ付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chọn ca kiểm thử nên tự động hóa", steps: [
    { name: "Liệt kê tần suất chạy lại của ca kiểm thử", text: "Ước lượng ca này sẽ chạy lại bao nhiêu lần trong 3 tháng tới." },
    { name: "Kiểm tra độ ổn định của logic/giao diện", text: "Chỉ tự động hóa khi logic/giao diện đã tương đối ổn định." },
    { name: "So sánh lợi ích tiết kiệm với chi phí viết + bảo trì script", text: "Chỉ tự động hóa khi lợi ích lớn hơn chi phí (ROI dương)." },
  ] },
  pages,
});

export const AU_INTRO_01 = [AU_INTRO_01_DOC];
