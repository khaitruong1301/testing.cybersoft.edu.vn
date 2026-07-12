// doc_mb_da_ngon_ngu.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử đa ngôn ngữ & bản địa hóa (Localization/i18n testing) — chuyển đổi ngôn ngữ,
// dịch thiếu/còn nguyên khóa, tràn chữ khi dịch dài, định dạng ngày/giờ/tiền tệ/số theo vùng,
// hướng văn bản, ký tự đặc biệt/unicode, thứ tự sắp xếp theo ngôn ngữ.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy (VI/EN/JA).
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

// ── Mockup 1: màn hình chọn ngôn ngữ ShopEasy — khóa dịch thô + chữ tràn nút ──
const m_switch = browser("shopeasy.vn/san-pham/tai-nghe-khong-day", [
  panel("ShopEasy · Trang sản phẩm (đang ở EN)", [
    field(24, 20, 330, "Nhãn khuyến mãi", "product.badge.freeship", "error"),
    field(372, 20, 330, "Trạng thái đơn", "order.status.PROCESSING", "error"),
    btn(24, 92, 330, "Đăng ký nhận thông báo giảm giá đặc biệt hôm nay", "primary"),
    btn(372, 92, 330, "Buy now", "secondary"),
    annotate(20, 12, 330, 62, "LỖI: hiển thị khóa dịch thô, chưa dịch"),
    annotate(20, 84, 330, 42, "LỖI: chữ dịch quá dài, tràn khỏi nút"),
  ].join(""), { h: 200, accent: "#0891b2" }),
].join(""), { h: 256, title: "VI | EN | JA", accent: "#0891b2" });

// ── Mockup 2: các loại lỗi/kỹ thuật kiểm thử đa ngôn ngữ ──
const m_technique = grid("Các loại lỗi cần kiểm khi test đa ngôn ngữ", ["Loại lỗi", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Chuyển ngôn ngữ không trọn vẹn", "Đổi ngôn ngữ nhưng vài chỗ vẫn giữ ngôn ngữ cũ", "Menu đổi sang EN nhưng chân trang vẫn tiếng Việt"],
  ["Dịch thiếu / còn nguyên khóa", "Hiển thị khóa dịch thô thay vì văn bản đã dịch", "Nhãn hiện 'product.badge.freeship'"],
  ["Tràn chữ khi dịch dài", "Bản dịch dài hơn bản gốc làm vỡ layout nút/nhãn", "Nút 'Đăng ký nhận thông báo...' tràn khỏi khung"],
  ["Sai định dạng ngày/giờ/số", "Không đổi định dạng theo vùng khi đổi ngôn ngữ", "Ngày 03/04 hiểu nhầm 3 tháng 4 hay 4 tháng 3"],
  ["Sai định dạng tiền tệ", "Không đổi ký hiệu/vị trí tiền tệ theo vùng", "Hiện '128.000$' thay vì '128.000₫' hoặc '$5.49'"],
  ["Ký tự đặc biệt/unicode lỗi", "Ký tự có dấu, kanji, emoji hiển thị sai/vỡ chữ (mojibake)", "Tên 'Nguyễn Thị Ánh' hiện thành ký tự lạ"],
  ["Sai thứ tự sắp xếp", "Sắp xếp theo bảng chữ cái không đúng ngôn ngữ hiện tại", "Danh sách tên tiếng Việt xếp theo thứ tự ASCII"],
], { accent: "#0891b2" });

// ── Mockup 3: bảng định dạng ngày/giờ/tiền tệ/số theo vùng ──
const m_format = grid("Định dạng ngày/giờ/tiền tệ/số theo vùng — cùng 1 đơn hàng ShopEasy", ["Vùng/ngôn ngữ", "Ngày đặt hàng", "Giá sản phẩm", "Số lượng tồn"], [
  ["Tiếng Việt (vi-VN)", "04/03/2026 (ngày/tháng/năm)", "128.000₫ (dấu chấm nghìn)", "1.250 sản phẩm"],
  ["English (en-US)", "March 4, 2026 (tháng/ngày/năm)", "$5.29 (dấu phẩy nghìn, chấm thập phân)", "1,250 items"],
  ["日本語 (ja-JP)", "2026年3月4日", "¥620 (không phần thập phân)", "1,250個"],
], { accent: "#0891b2", note: "Cùng một đơn hàng nhưng hiển thị ngày/giá/số khác nhau theo vùng — sai 1 chỗ có thể khiến khách hiểu nhầm giá hoặc ngày giao hàng." });

// ── Mockup 4: ticket Jira của lỗi dịch thiếu tìm được qua kiểm thử đa ngôn ngữ ──
const m_jira = jira({
  key: "SE-11340", title: "Trang thanh toán (EN): nút xác nhận hiện khóa dịch thô 'checkout.confirm.button'",
  type: "Bug", status: "New", priority: "High", severity: "Major",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · ngôn ngữ EN"],
    ["Các bước", "1) Đổi ngôn ngữ sang EN 2) Thêm SP vào giỏ 3) Vào trang Thanh toán 4) Xem nút xác nhận đơn"],
    ["Kết quả mong đợi", "Nút hiển thị 'Confirm order' theo bản dịch EN"],
    ["Kết quả thực tế", "Nút hiển thị khóa dịch thô 'checkout.confirm.button', không có văn bản người dùng đọc được"],
    ["Bằng chứng", "screenshot-checkout-en-key.png"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi đa ngôn ngữ theo ngôn ngữ ──
const m_kanban = kanban("Bảng theo dõi lỗi Localization theo ngôn ngữ (ShopEasy · Sprint 18)", [
  { name: "New", cards: [
    { key: "SE-11340", title: "EN: nút hiện khóa dịch thô", sev: "High" },
    { key: "SE-11344", title: "JA: nút 'Mua ngay' tràn 2 dòng", sev: "Medium" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11321", title: "EN: giá hiện $128.000 (sai ký hiệu)", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11298", title: "VI: ngày đặt hàng hiện kiểu mm/dd", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11270", title: "JA: tên khách có kanji hiển thị vỡ chữ", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu lỗi đa ngôn ngữ theo ngôn ngữ ──
const m_dash = dashboard("Lỗi Localization tìm được theo ngôn ngữ — Sprint 18", [
  { label: "Tổng lỗi Localization", value: "21", sub: "sprint này", color: "#0891b2" },
  { label: "Ở bản EN", value: "9", sub: "~43%", color: "#2563eb" },
  { label: "Ở bản JA", value: "8", sub: "~38%", color: "#7c3aed" },
  { label: "Mức High/Major", value: "6", sub: "đa số do dịch thiếu/sai định dạng", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử đa ngôn ngữ (Localization Testing) là gì?",
  "What is localization testing?",
  "Kiểm thử đa ngôn ngữ là việc xác nhận sản phẩm hiển thị và hoạt động đúng khi chuyển sang từng ngôn ngữ/vùng cụ thể: bản dịch đầy đủ, không còn khóa dịch thô, không tràn chữ, định dạng ngày/giờ/tiền tệ/số đúng theo vùng, ký tự đặc biệt hiển thị đúng, và thứ tự sắp xếp phù hợp với ngôn ngữ đó. Nó khác với kiểm thử chức năng thông thường vì tập trung vào tính đúng đắn theo văn hóa và ngôn ngữ.",
  "Localization testing verifies that a product displays and works correctly when switched to each specific language/region: complete translations, no raw translation keys, no text overflow, correct date/time/currency/number formats for the region, correctly rendered special characters, and sort order suited to that language. It differs from regular functional testing because it focuses on cultural and linguistic correctness.",
  "ローカライゼーションテストとは何？",
  "ローカライゼーションテストとは、製品を各言語・地域に切り替えたときに正しく表示・動作するかを確認することです：翻訳が完全であること、生の翻訳キーが残っていないこと、文字がはみ出さないこと、地域に応じた日付・時刻・通貨・数値の形式が正しいこと、特殊文字が正しく表示されること、その言語に適した並び順であることなどを確認します。文化・言語的な正しさに焦点を当てる点で通常の機能テストとは異なります。");
const faq2 = FAQ(
  "Kiểm thử đa ngôn ngữ khác gì kiểm thử quốc tế hóa (i18n testing)?",
  "How is localization testing different from internationalization (i18n) testing?",
  "Kiểm thử quốc tế hóa (i18n testing) kiểm tra xem KIẾN TRÚC của sản phẩm có SẴN SÀNG để thêm ngôn ngữ mới hay không — ví dụ mọi văn bản có được tách ra file khóa dịch, giao diện có co giãn được cho chữ dài hơn, có hỗ trợ mã ký tự Unicode không. Kiểm thử đa ngôn ngữ (localization testing) thì kiểm tra một bản dịch CỤ THỂ (VI, EN hay JA) đã ĐÚNG và ĐẦY ĐỦ chưa. Nói ngắn gọn: i18n là 'có sẵn sàng để dịch không', còn localization là 'bản dịch này đã đúng chưa'.",
  "Internationalization (i18n) testing checks whether the product's ARCHITECTURE is READY to add new languages — e.g. whether all text is extracted into translation key files, whether the UI can stretch for longer text, whether it supports Unicode character encoding. Localization testing checks whether one SPECIFIC translation (VI, EN, or JA) is CORRECT and COMPLETE. In short: i18n asks 'is it ready to be translated', localization asks 'is this translation correct'.",
  "ローカライゼーションテストと国際化（i18n）テストの違いは？",
  "国際化（i18n）テストは、製品のアーキテクチャが新しい言語を追加する準備ができているかを確認します——例えば全てのテキストが翻訳キーファイルに分離されているか、UIがより長いテキストに対応して伸縮できるか、Unicode文字コードをサポートしているかなどです。ローカライゼーションテストは、特定の翻訳（VI、EN、JAなど）が正しく完全であるかを確認します。簡単に言うと、i18nは『翻訳の準備ができているか』、ローカライゼーションは『この翻訳が正しいか』を問います。");
const faq3 = FAQ(
  "Vì sao dịch đúng ngữ nghĩa vẫn chưa đủ, cần kiểm thêm gì?",
  "Why isn't a semantically correct translation enough — what else should be tested?",
  "Vì bản địa hóa không chỉ là dịch chữ. Một bản dịch đúng nghĩa vẫn có thể gây lỗi nếu: nó dài hơn bản gốc và làm vỡ layout nút, hoặc dùng sai định dạng ngày/giờ/tiền tệ khiến khách hiểu nhầm (03/04 là 3 tháng 4 hay 4 tháng 3?), hoặc sai ký hiệu tiền tệ khiến khách nghĩ giá đắt/rẻ hơn thực tế, hoặc thứ tự sắp xếp danh sách không theo đúng bảng chữ cái của ngôn ngữ đó. Vì vậy kiểm thử đa ngôn ngữ luôn cần kiểm cả bố cục, định dạng vùng miền, ký tự đặc biệt, không chỉ riêng nội dung dịch.",
  "Because localization is more than translating words. A semantically correct translation can still cause bugs if: it's longer than the original and breaks the button layout, or it uses the wrong date/time/currency format and confuses customers (is 03/04 April 3rd or March 4th?), or the wrong currency symbol makes customers think the price is higher/lower than it is, or a list's sort order doesn't follow that language's alphabet. So localization testing must always check layout, regional formats, and special characters, not just the translated content.",
  "意味的に正しい翻訳でも不十分な理由と、他に何を確認すべき？",
  "ローカライゼーションは単なる単語の翻訳以上のものだからです。意味的に正しい翻訳でも次のような問題を起こすことがあります：原文より長くなりボタンのレイアウトを崩す、日付・時刻・通貨の形式を誤り顧客を混乱させる（03/04は4月3日か3月4日か？）、通貨記号を誤り顧客が価格を実際より高い/安いと誤解する、リストの並び順がその言語のアルファベット順に従っていない、などです。そのためローカライゼーションテストは、翻訳内容だけでなく、レイアウト・地域の形式・特殊文字も常に確認する必要があります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử đa ngôn ngữ (localization testing) chủ yếu kiểm tra điều gì?", en: "What does localization testing mainly check?", ja: "ローカライゼーションテストは主に何を確認する？" },
    options: [
      { vi: "Tốc độ tải trang khi có nhiều người dùng cùng lúc", en: "Page load speed under many concurrent users", ja: "多数のユーザーが同時アクセスした時のページ読み込み速度" },
      { vi: "Sản phẩm hiển thị và hoạt động đúng khi chuyển sang từng ngôn ngữ/vùng cụ thể", en: "Whether the product displays and works correctly when switched to each specific language/region", ja: "各言語・地域に切り替えた時に製品が正しく表示・動作するか" },
      { vi: "Mã nguồn có tuân theo coding convention không", en: "Whether the source code follows coding conventions", ja: "ソースコードがコーディング規約に従っているか" },
      { vi: "Số lượng request API mỗi giây", en: "The number of API requests per second", ja: "1秒あたりのAPIリクエスト数" },
    ], correct: 1,
    explain: { vi: "Localization testing xác nhận bản dịch đầy đủ, đúng định dạng vùng, không vỡ layout khi đổi ngôn ngữ.", en: "Localization testing confirms complete translations, correct regional formats, and no broken layout when switching languages.", ja: "ローカライゼーションテストは、言語切替時に翻訳が完全で地域の形式が正しく、レイアウトが崩れないことを確認します。" },
  }),
  mcq({
    q: { vi: "Nút hiện chữ 'checkout.confirm.button' thay vì 'Xác nhận đơn hàng' là lỗi gì?", en: "A button showing 'checkout.confirm.button' instead of 'Confirm order' is what kind of bug?", ja: "ボタンに『注文確認』ではなく『checkout.confirm.button』と表示されるのはどんなバグ？" },
    options: [
      { vi: "Lỗi tràn chữ (text overflow)", en: "A text overflow bug", ja: "文字はみ出しのバグ" },
      { vi: "Lỗi sai định dạng tiền tệ", en: "A wrong currency format bug", ja: "通貨形式の誤りバグ" },
      { vi: "Lỗi dịch thiếu / còn nguyên khóa dịch", en: "A missing translation / raw translation key bug", ja: "翻訳漏れ・翻訳キーがそのまま表示されるバグ" },
      { vi: "Lỗi thứ tự sắp xếp", en: "A sort order bug", ja: "並び順のバグ" },
    ], correct: 2,
    explain: { vi: "Đây là khóa dịch (translation key) chưa được thay bằng văn bản đã dịch — lỗi dịch thiếu điển hình.", en: "This is a translation key that hasn't been replaced with translated text — a classic missing-translation bug.", ja: "これは翻訳されたテキストに置き換わっていない翻訳キーで、典型的な翻訳漏れバグです。" },
  }),
  mcq({
    q: { vi: "Vì sao bản dịch tiếng Anh/tiếng Nhật dài hơn tiếng Việt lại đáng lo với kiểm thử đa ngôn ngữ?", en: "Why should an English/Japanese translation that's longer than Vietnamese worry a localization tester?", ja: "ベトナム語より長い英語・日本語の翻訳が、なぜローカライゼーションテストで懸念材料なの？" },
    options: [
      { vi: "Vì dịch dài hơn luôn sai ngữ nghĩa", en: "Because a longer translation is always semantically wrong", ja: "長い翻訳は常に意味的に誤っているから" },
      { vi: "Vì nó có thể làm chữ tràn khỏi nút/nhãn, vỡ bố cục giao diện", en: "Because it can make text overflow buttons/labels and break the UI layout", ja: "ボタンやラベルから文字がはみ出し、UIレイアウトが崩れる可能性があるから" },
      { vi: "Vì nó làm chậm tốc độ tải trang", en: "Because it slows down page load speed", ja: "ページの読み込み速度が遅くなるから" },
      { vi: "Vì hệ thống không hỗ trợ tiếng Anh/tiếng Nhật", en: "Because the system doesn't support English/Japanese", ja: "システムが英語・日本語をサポートしていないから" },
    ], correct: 1,
    explain: { vi: "Nút/nhãn thường có kích thước cố định; chữ dịch dài hơn dễ tràn ra ngoài hoặc xuống dòng xấu.", en: "Buttons/labels often have fixed sizes; longer translated text easily overflows or wraps badly.", ja: "ボタンやラベルはサイズが固定されていることが多く、長い翻訳文字ははみ出したり見苦しく折り返されたりしやすいです。" },
  }),
  mcq({
    q: { vi: "Hiển thị giá '128.000$' (dùng ký hiệu $ nhưng số theo kiểu VN) là ví dụ lỗi gì?", en: "Showing a price as '128.000$' (using the $ symbol but VN-style number grouping) is an example of what bug?", ja: "『128.000$』（$記号だがベトナム式の数字区切り）と表示するのはどんなバグの例？" },
    options: [
      { vi: "Lỗi sắp xếp danh sách", en: "A list sort order bug", ja: "リストの並び順バグ" },
      { vi: "Lỗi định dạng tiền tệ/số không đồng bộ theo vùng, dễ gây hiểu nhầm giá", en: "A currency/number format bug not synced to the region, easily causing price confusion", ja: "地域に合っていない通貨・数値形式のバグで、価格の誤解を招きやすい" },
      { vi: "Lỗi hướng văn bản (RTL)", en: "A text direction (RTL) bug", ja: "文字方向（RTL）のバグ" },
      { vi: "Lỗi ký tự đặc biệt/unicode", en: "A special character/unicode bug", ja: "特殊文字・Unicodeのバグ" },
    ], correct: 1,
    explain: { vi: "Ký hiệu tiền tệ và kiểu phân tách số phải đi cùng nhau theo đúng vùng, nếu không khách dễ hiểu nhầm số tiền thật.", en: "The currency symbol and number grouping style must match the region together, otherwise customers easily misread the real amount.", ja: "通貨記号と数値の区切り方は地域に合わせて一致させる必要があり、そうでないと顧客が実際の金額を誤解しやすくなります。" },
  }),
  mcq({
    q: { vi: "Danh sách tên khách hàng tiếng Việt bị sắp xếp sai (không theo bảng chữ cái tiếng Việt) là lỗi liên quan tới điều gì?", en: "A Vietnamese customer name list sorted incorrectly (not following the Vietnamese alphabet) relates to what?", ja: "ベトナム語の顧客名リストが（ベトナム語のアルファベット順ではなく）誤って並べ替えられているのは何に関連するバグ？" },
    options: [
      { vi: "Thứ tự sắp xếp (collation) chưa đúng theo ngôn ngữ hiện tại", en: "Sort order (collation) not correctly following the current language", ja: "現在の言語に正しく従っていない並び順（照合順序）" },
      { vi: "Lỗi hướng văn bản (RTL/LTR)", en: "A text direction (RTL/LTR) bug", ja: "文字方向（RTL/LTR）のバグ" },
      { vi: "Lỗi tràn chữ trên nút", en: "A button text overflow bug", ja: "ボタンの文字はみ出しバグ" },
      { vi: "Lỗi tốc độ tải danh sách", en: "A list load speed bug", ja: "リスト読み込み速度のバグ" },
      { vi: "Lỗi mất kết nối mạng", en: "A network disconnection bug", ja: "ネットワーク切断のバグ" },
    ], correct: 0,
    explain: { vi: "Mỗi ngôn ngữ có quy tắc sắp xếp (collation) riêng; dùng sai quy tắc khiến danh sách trông lộn xộn với người dùng bản ngữ.", en: "Each language has its own sorting rule (collation); using the wrong rule makes the list look jumbled to native speakers.", ja: "各言語には独自の並び替えルール（照合順序）があり、誤ったルールを使うとネイティブスピーカーにはリストが乱雑に見えます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử đa ngôn ngữ (localization testing) là việc xác nhận app hiển thị và hoạt động đúng khi chuyển sang từng ngôn ngữ: bản dịch đầy đủ, không còn khóa dịch thô, chữ không tràn khi dịch dài, định dạng ngày/giờ/tiền tệ/số đúng theo vùng, ký tự đặc biệt hiển thị đúng, và thứ tự sắp xếp phù hợp ngôn ngữ. Bài này bám màn hình đổi ngôn ngữ VI/EN/JA của app TMĐT ShopEasy: bạn học cách nghĩ ca kiểm thử đa ngôn ngữ, tìm lỗi thật (khóa dịch thô, chữ tràn nút, sai định dạng tiền), và cân bằng thời gian kiểm giữa các ngôn ngữ. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Localization testing verifies an app displays and works correctly when switched to each language: complete translations, no raw translation keys, no text overflow from longer translations, correct regional date/time/currency/number formats, correctly rendered special characters, and language-appropriate sort order. This follows ShopEasy's VI/EN/JA language switcher: you learn to think up localization test cases, find real bugs (raw translation keys, button text overflow, wrong currency format), and balance testing time across languages. Lots of visuals and a quiz at the end.",
        "ローカライゼーションテストとは、アプリを各言語に切り替えた時に正しく表示・動作するかを確認することです：翻訳が完全であること、生の翻訳キーが残っていないこと、長い翻訳による文字はみ出しがないこと、地域に応じた日付・時刻・通貨・数値の形式が正しいこと、特殊文字が正しく表示されること、言語に適した並び順であることなど。本記事はECアプリShopEasyのVI/EN/JA言語切替画面に沿い、ローカライゼーションのテストケースの考え方、実際のバグ（生の翻訳キー、ボタン文字のはみ出し、誤った通貨形式）の発見、各言語へのテスト時間の配分方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi mới học test, ta thường chỉ kiểm app chạy đúng với một ngôn ngữ duy nhất (thường là tiếng Việt). Nhưng ShopEasy phục vụ khách hàng ở nhiều vùng, cho phép đổi giao diện sang tiếng Anh và tiếng Nhật. Mỗi lần đổi ngôn ngữ là một 'phiên bản app' mới cần kiểm: chữ có dịch đủ không, có tràn khỏi nút không, ngày tháng và giá tiền có đúng theo vùng không. Kiểm thử đa ngôn ngữ chính là cách bạn chủ động dò từng ngóc ngách này thay vì chỉ tin rằng 'đổi ngôn ngữ chắc là ổn'. Chúng ta sẽ học qua màn hình đổi ngôn ngữ thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! When you first learn testing, you usually only check the app works correctly in a single language (often Vietnamese). But ShopEasy serves customers across regions, letting them switch the UI to English and Japanese. Each language switch is a new 'app version' to check: is the text fully translated, does it overflow buttons, are dates and prices correct for the region. Localization testing is you actively probing every corner instead of just assuming 'switching language is probably fine'. We'll learn through ShopEasy's real language switcher, with visuals and hands-on practice.",
        "こんにちは、初心者さん！テストを学び始めると、通常は単一言語（多くはベトナム語）でアプリが正しく動くかしか確認しません。しかしShopEasyは複数の地域の顧客にサービスを提供し、UIを英語や日本語に切り替えられます。言語を切り替えるたびに、確認すべき新しい『アプリのバージョン』が生まれます：文字が十分に翻訳されているか、ボタンからはみ出していないか、日付や価格が地域に応じて正しいか。ローカライゼーションテストとは、『言語を切り替えても多分大丈夫』と思い込むのではなく、あらゆる隅々を積極的に調べることです。実際のShopEasyの言語切替画面を通じて、図と実習付きで学びます。"),
      IMG(m_switch, "Màn hình test: trang sản phẩm ShopEasy ở EN với khóa dịch thô và nút bị tràn chữ", "Screen under test: ShopEasy's EN product page with raw translation keys and overflowing button text", "テスト対象画面：生の翻訳キーと文字がはみ出したボタンがあるShopEasyのEN商品ページ"),
      DEF("Localization Testing", "kiểm thử xem sản phẩm hiển thị và hoạt động đúng khi chuyển sang một ngôn ngữ/vùng cụ thể hay không: bản dịch, bố cục, định dạng vùng miền.",
        "testing whether a product displays and works correctly when switched to a specific language/region: translation, layout, regional formats.",
        "特定の言語・地域に切り替えた時に製品が正しく表示・動作するか（翻訳・レイアウト・地域の形式）を確認するテスト。"),
    ] },
  { heading: { vi: "2. Kiểm thử quốc tế hóa (i18n) vs kiểm thử đa ngôn ngữ (l10n)", en: "2. Internationalization (i18n) vs localization (l10n) testing", ja: "2. 国際化（i18n）テスト vs ローカライゼーション（l10n）テスト" },
    blocks: [
      P("Cách dễ nhớ nhất: kiểm thử quốc tế hóa (i18n) trả lời 'kiến trúc app có SẴN SÀNG để thêm ngôn ngữ mới không' — ví dụ mọi văn bản đã được tách thành khóa dịch riêng, giao diện có co giãn được cho chữ dài hơn chưa. Kiểm thử đa ngôn ngữ (localization, viết tắt l10n) thì trả lời 'bản dịch CỤ THỂ này đã đúng và đầy đủ chưa'. Với ShopEasy, i18n là việc đội dev đã thiết kế đúng để dễ thêm ngôn ngữ; l10n là việc bạn — tester — xác nhận từng bản dịch VI/EN/JA đã ổn khi thực sự dùng.",
        "The easiest way to remember: internationalization (i18n) testing answers 'is the app's architecture READY to add new languages' — e.g. has all text been extracted into separate translation keys, can the UI stretch for longer text. Localization testing (l10n) answers 'is this SPECIFIC translation correct and complete'. For ShopEasy, i18n is whether the dev team designed it correctly to make adding languages easy; l10n is you — the tester — confirming each VI/EN/JA translation actually works when used.",
        "覚え方：国際化（i18n）テストは『アプリのアーキテクチャが新しい言語を追加する準備ができているか』に答えます——例えば全てのテキストが個別の翻訳キーに抽出されているか、UIがより長いテキストに対応して伸縮できるかなど。ローカライゼーション（l10n）テストは『この特定の翻訳が正しく完全か』に答えます。ShopEasyでは、i18nは開発チームが言語追加を容易にするよう正しく設計したかどうか、l10nはあなた——テスター——が実際に使ってVI/EN/JAの各翻訳が問題ないか確認することです。"),
      P("Bài này tập trung vào l10n — góc nhìn thực hành mà tester mới đi làm hay được giao đầu tiên, vì không cần đọc code, chỉ cần đổi ngôn ngữ trên giao diện và quan sát kỹ. Nhưng hiểu cả hai khái niệm giúp bạn báo lỗi đúng chỗ: lỗi 'chữ tràn nút ở mọi ngôn ngữ trừ VI' thường là lỗi i18n (thiết kế chưa co giãn được); lỗi 'chỉ bản EN thiếu dịch một câu' là lỗi l10n (thiếu nội dung dịch).",
        "This article focuses on l10n — the hands-on angle new testers usually get assigned first, since it doesn't require reading code, just switching languages in the UI and observing carefully. But understanding both concepts helps you report bugs in the right place: 'text overflows buttons in every language except VI' is usually an i18n bug (the design isn't stretchable yet); 'only the EN version is missing one translated sentence' is an l10n bug (missing translation content).",
        "本記事はl10nに焦点を当てます——コードを読む必要がなく、UIで言語を切り替えて注意深く観察するだけでよいため、新人テスターが最初に任されがちな実践的な視点です。しかし両方の概念を理解することで、バグを適切な場所に報告できます：『VI以外の全言語でボタンから文字がはみ出す』は通常i18nのバグ（伸縮できない設計）、『EN版だけ1文の翻訳が抜けている』はl10nのバグ（翻訳内容の不足）です。"),
      DEF("Internationalization (i18n)", "thiết kế kiến trúc để app sẵn sàng thêm ngôn ngữ mới: tách văn bản thành khóa dịch, giao diện co giãn được, hỗ trợ Unicode.",
        "designing the architecture so an app is ready to add new languages: text extracted into translation keys, stretchable UI, Unicode support.",
        "アプリが新しい言語を追加できるようアーキテクチャを設計すること：テキストを翻訳キーに分離、伸縮可能なUI、Unicodeサポート。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử đa ngôn ngữ", en: "3. Why beginners need to master localization testing", ja: "3. 初心者がローカライゼーションテストを習得すべき理由" },
    blocks: [
      P("Càng nhiều app phục vụ khách hàng quốc tế, kiểm thử đa ngôn ngữ càng trở thành kỹ năng phổ biến trong tuyển dụng Tester — nhất là ở các công ty làm sản phẩm cho thị trường Nhật, Anh, Mỹ như CyberSoft hay hay hợp tác. Nếu bạn có thể tự tin đổi ngôn ngữ, soi từng chi tiết dịch thuật và định dạng, bạn đã có một điểm cộng lớn so với các bạn chỉ quen test một ngôn ngữ.",
        "As more apps serve international customers, localization testing becomes an increasingly common Tester hiring skill — especially at companies building products for Japan, UK, or US markets that CyberSoft often partners with. If you can confidently switch languages and scrutinize every translation and formatting detail, you have a big edge over peers who only ever test one language.",
        "国際的な顧客にサービスを提供するアプリが増えるほど、ローカライゼーションテストはテスター採用でますます一般的なスキルになっています——特に日本・英国・米国市場向け製品を作るCyberSoftのような提携企業では。自信を持って言語を切り替え、翻訳と形式のあらゆる細部を精査できれば、単一言語しかテストしたことのない仲間より大きなアドバンテージになります。"),
      P("Ngoài ra, lỗi đa ngôn ngữ tuy trông 'nhỏ' nhưng ảnh hưởng trực tiếp tới trải nghiệm và niềm tin khách hàng. Một nút hiện khóa dịch thô khiến khách nghĩ app 'chưa hoàn thiện, không đáng tin'; một giá tiền hiển thị sai định dạng khiến khách hiểu nhầm số tiền phải trả — có thể dẫn tới khiếu nại hoặc mất đơn hàng. Với ShopEasy, một khách Nhật thấy giá '128.000' mà không rõ đơn vị tiền tệ hoàn toàn có thể huỷ đơn vì tưởng giá quá cao hoặc quá thấp so với thực tế.",
        "Also, localization bugs may look 'small' but directly affect customer experience and trust. A button showing a raw translation key makes customers think the app is 'unfinished, untrustworthy'; a wrongly formatted price confuses customers about how much they're actually paying — potentially leading to complaints or lost orders. On ShopEasy, a Japanese customer seeing a price of '128.000' with an unclear currency unit could easily cancel the order thinking the price is too high or too low.",
        "また、ローカライゼーションのバグは『些細』に見えても、顧客の体験と信頼に直接影響します。生の翻訳キーが表示されたボタンは、顧客に『未完成で信頼できないアプリ』という印象を与えます。誤った形式の価格表示は、顧客が実際に支払う金額を誤解させ、クレームや注文の喪失につながる可能性があります。ShopEasyで、通貨単位が不明確な『128.000』という価格を見た日本人顧客は、実際より高すぎる、または安すぎると思い込んで簡単に注文をキャンセルするかもしれません。"),
      P("Với riêng bạn — người mới — kiểm thử đa ngôn ngữ còn rèn khả năng quan sát cực kỳ tỉ mỉ: bạn phải so sánh cùng một màn hình ở nhiều ngôn ngữ, phát hiện những khác biệt tinh vi mà mắt thường dễ bỏ qua nếu chỉ lướt nhanh. Đây là kỹ năng nền quan trọng cho mọi loại kiểm thử giao diện sau này, không chỉ riêng đa ngôn ngữ.",
        "For you specifically — a beginner — localization testing also trains extremely meticulous observation: you must compare the same screen across multiple languages, catching subtle differences that are easy to miss when just skimming. This is a key foundational skill for all UI testing later on, not just localization.",
        "特に初心者のあなたにとって、ローカライゼーションテストは非常に緻密な観察力も鍛えます：同じ画面を複数の言語で比較し、ざっと見ただけでは見逃しやすい微妙な違いを見つけなければなりません。これは後のあらゆるUIテストにとって重要な基礎スキルであり、ローカライゼーションだけに限りません。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các loại lỗi cần soi", en: "4. Prepare: tools & the types of bugs to look for", ja: "4. 準備：ツールと確認すべきバグの種類" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần chuyển app sang từng ngôn ngữ và một danh sách các loại lỗi thường gặp để không bỏ sót góc nào.",
        "You don't need special tools — just switch the app to each language and use a checklist of common bug types so you don't miss any angle.",
        "特別なツールは不要です——アプリを各言語に切り替え、よくあるバグの種類のチェックリストを使えば漏れを防げます。"),
      STEP(1, "Mở màn hình cần test (ví dụ trang sản phẩm ShopEasy); đổi lần lượt sang VI, EN, JA.", "Open the screen to test (e.g. ShopEasy's product page); switch it to VI, EN, JA in turn.", "テストする画面（例：ShopEasy商品ページ）を開き、VI、EN、JAの順に切り替える。"),
      STEP(2, "Với mỗi ngôn ngữ, soi từng loại lỗi: khóa dịch thô, chữ tràn nút/nhãn, sai định dạng ngày/giờ/tiền tệ/số.", "For each language, check each bug type: raw translation keys, text overflowing buttons/labels, wrong date/time/currency/number formats.", "各言語で、生の翻訳キー、ボタン/ラベルからの文字はみ出し、日付・時刻・通貨・数値形式の誤りといった各バグの種類を確認する。"),
      STEP(3, "Kiểm thêm ký tự đặc biệt/unicode (tên có dấu, kanji, emoji) và thứ tự sắp xếp danh sách theo ngôn ngữ đang chọn.", "Also check special/unicode characters (accented names, kanji, emoji) and the sort order of lists in the currently selected language.", "特殊文字・Unicode（アクセント付きの名前、漢字、絵文字）と、現在選択中の言語でのリストの並び順も確認する。"),
      TRY("Đổi một app bạn hay dùng sang một ngôn ngữ khác và tìm thử 1 chỗ dịch còn thiếu hoặc chữ bị tràn.", "Switch an app you often use to another language and try to find one missing translation or overflowing text.", "よく使うアプリを別の言語に切り替え、翻訳漏れや文字はみ出し箇所を1つ探してみよう。"),
      PITFALL("Chỉ nhìn lướt qua rồi kết luận 'ngôn ngữ nào cũng ổn'. Lỗi đa ngôn ngữ thường ẩn ở những chỗ ít người để ý: chân trang, thông báo lỗi, tooltip, email xác nhận — không chỉ ở màn hình chính.", "Just glancing and concluding 'every language is fine'. Localization bugs often hide in places few people notice: footers, error messages, tooltips, confirmation emails — not just the main screen.", "ざっと見て『どの言語も問題ない』と結論づけること。ローカライゼーションのバグは、フッター、エラーメッセージ、ツールチップ、確認メールなど、あまり注目されない箇所に潜んでいることが多く、メイン画面だけではありません。"),
      IMG(m_technique, "Các loại lỗi cần soi khi kiểm thử đa ngôn ngữ, minh hoạ trên app ShopEasy", "Types of bugs to look for during localization testing, illustrated on the ShopEasy app", "ローカライゼーションテストで確認すべきバグの種類、ShopEasyアプリで例示"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử đa ngôn ngữ từng bước (thực hành)", en: "5. Writing localization test cases step by step (hands-on)", ja: "5. ローカライゼーションテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào trang thanh toán ShopEasy — nơi có cả văn bản, ngày giờ và tiền tệ, dễ lộ nhiều loại lỗi đa ngôn ngữ cùng lúc. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ.",
        "Now let's apply it for real to ShopEasy's checkout page — a screen with text, dates, and currency all at once, easily revealing several localization bug types together. Follow the order below to get a full set of test cases.",
        "では、ShopEasyの決済ページに実際に適用しましょう——テキスト・日付・通貨が一度に揃う画面で、複数のローカライゼーションバグの種類が同時に露見しやすい場所です。以下の順に沿って、完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca chuẩn trước bằng tiếng Việt: mọi văn bản, ngày, giá đều đúng — làm mốc so sánh.", "First define a baseline case in Vietnamese: all text, dates, and prices correct — the comparison baseline.", "まずベトナム語での基準ケースを定義：全てのテキスト・日付・価格が正しい状態を比較基準とする。"),
      STEP(2, "Đổi sang EN, so từng dòng văn bản với bản VI: có dòng nào còn giữ tiếng Việt, còn khóa dịch thô, hay bị tràn không.", "Switch to EN, compare each line of text to the VI version: is any line still Vietnamese, still a raw key, or overflowing.", "ENに切り替え、各行のテキストをVI版と比較：ベトナム語のまま、生の翻訳キーのまま、はみ出しがないか確認する。"),
      STEP(3, "Kiểm định dạng ngày đặt hàng, giá tiền, số lượng ở cả EN và JA — đối chiếu với bảng định dạng chuẩn theo vùng.", "Check the order date, price, and quantity formats in both EN and JA — compare against the standard regional format table.", "ENとJA両方で注文日・価格・数量の形式を確認——地域ごとの標準形式表と照合する。"),
      STEP(4, "Nếu có sai lệch, ghi Expected (định dạng/dịch đúng theo bảng chuẩn) và Actual (điều thực sự hiển thị) rồi chuyển thành bug report.", "If there's a mismatch, write Expected (correct format/translation per the standard table) and Actual (what's actually shown), then turn it into a bug report.", "不一致があれば、Expected（標準表に基づく正しい形式/翻訳）とActual（実際に表示された内容）を記録し、バグレポートにする。"),
      CODE("text", "BO CA KIEM THU DA NGON NGU - trang thanh toan ShopEasy\nCa 1 (EN): Nut xac nhan   | Expected: 'Confirm order' | Actual: 'checkout.confirm.button' (BUG - khoa dich tho)\nCa 2 (EN): Gia san pham   | Expected: '$5.29'         | Actual: '128.000$' (BUG - sai dinh dang tien te)\nCa 3 (JA): Ngay dat hang  | Expected: '2026 nen 3 gatsu 4 nichi' | Actual: dung dinh dang JA\nCa 4 (JA): Nut 'Mua ngay' | Expected: vua khung nut    | Actual: chu trang 2 dong (BUG - tran chu)"),
      TRY("Viết thêm 1 ca kiểm thử đa ngôn ngữ nữa cho trang thanh toán mà bảng trên chưa có (gợi ý: kiểm thông báo lỗi khi nhập sai mã giảm giá).", "Write one more localization case for the checkout page not in the table above (hint: check the error message when an invalid discount code is entered).", "上の表にない決済ページのローカライゼーションケースをもう1つ書こう（ヒント：無効なクーポンコード入力時のエラーメッセージを確認）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: dịch dài làm vỡ layout nút", en: "6. Situation 1: a long translation breaks the button layout", ja: "6. シーン1：長い翻訳がボタンのレイアウトを崩す" },
    blocks: [
      SITUATION("Đội chỉ test giao diện bằng tiếng Việt — mọi nút, nhãn đều vừa khung, ai cũng yên tâm release.", "The team only tests the UI in Vietnamese — every button and label fits perfectly, everyone feels safe to release.",
        "Khi đổi sang tiếng Nhật, nút 'Mua ngay' được dịch thành cụm từ dài hơn nên bị vỡ xuống 2 dòng, đè lên nút bên cạnh, khách bấm nhầm sang nút 'Xóa khỏi giỏ'.",
        "When switched to Japanese, the 'Buy now' button is translated into a longer phrase, wraps to 2 lines, overlaps the neighboring button, and customers accidentally tap 'Remove from cart' instead.",
        "チームはベトナム語のUIのみをテスト——全てのボタン・ラベルがぴったり収まり、安心してリリース。",
        "日本語に切り替えると、『今すぐ購入』ボタンはより長いフレーズに翻訳され2行に折り返され、隣のボタンに重なり、顧客が誤って『カートから削除』ボタンをタップしてしまう。"),
      SOLVE("Bổ sung ca kiểm thử 'chữ dài nhất có thể' cho mọi nút/nhãn quan trọng ở cả EN và JA (không chỉ VI), và đề xuất thiết kế co giãn được hoặc rút gọn bản dịch để tránh vỡ layout.", "Add a 'longest possible text' test case for every important button/label in both EN and JA (not just VI), and propose a stretchable design or a shorter translation to avoid breaking the layout.", "VIだけでなくENとJA両方の重要なボタン・ラベルに『最長になり得るテキスト』のテストケースを追加し、伸縮可能なデザインまたは短い翻訳を提案してレイアウト崩れを防ぐ。"),
      P("Đây là bài học lớn nhất trong chương này: 'vừa khung ở tiếng Việt' không có nghĩa là vừa khung ở mọi ngôn ngữ. Tiếng Nhật và tiếng Anh thường dài hoặc ngắn hơn tiếng Việt tùy câu, và bố cục được thiết kế 'vừa khít' theo một ngôn ngữ rất dễ vỡ khi đổi sang ngôn ngữ khác. Luôn thử với chữ dài nhất có thể ở mọi ngôn ngữ hỗ trợ, đặc biệt ở các nút quan trọng như thanh toán, xóa, xác nhận.",
        "This is the biggest lesson in this chapter: 'fitting in Vietnamese' doesn't mean it fits in every language. Japanese and English are often longer or shorter than Vietnamese depending on the sentence, and a layout designed to 'fit snugly' for one language easily breaks when switched to another. Always test with the longest possible text in every supported language, especially on important buttons like checkout, delete, confirm.",
        "この章での最大の教訓です：『ベトナム語で収まる』は『どの言語でも収まる』ことを意味しません。日本語や英語は文によってベトナム語より長かったり短かったりし、ある言語に『ぴったり』合わせて設計されたレイアウトは、別の言語に切り替えると崩れやすいです。決済・削除・確認といった重要なボタンでは特に、サポートする全言語で考えられる最長のテキストで常にテストしましょう。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử đa ngôn ngữ 'khóa dịch thô ở nút xác nhận'", "A bug ticket found via the localization case 'raw translation key on the confirm button'", "『確認ボタンの生の翻訳キー』ローカライゼーションケースで見つかったバグチケット"),
      RECAP(["'Vừa khung ở tiếng Việt' KHÔNG đồng nghĩa vừa khung ở mọi ngôn ngữ", "Luôn test với chữ dài nhất có thể ở EN và JA, không chỉ VI"],
        ["'Fitting in Vietnamese' does NOT mean it fits in every language", "Always test with the longest possible text in EN and JA, not just VI"],
        ["『ベトナム語で収まる』はどの言語でも収まることを意味しない", "VIだけでなくENとJAでも考えられる最長のテキストで常にテストする"]),
    ] },
  { heading: { vi: "7. Tình huống 2: định dạng tiền sai vùng gây hiểu nhầm giá", en: "7. Situation 2: wrong currency format causes price confusion", ja: "7. シーン2：地域に合わない通貨形式が価格の誤解を招く" },
    blocks: [
      SITUATION("Bạn thử đổi ShopEasy sang tiếng Anh (EN) rồi xem lại giá của một sản phẩm vừa xem bằng tiếng Việt.", "You switch ShopEasy to English (EN) and look again at the price of a product you just viewed in Vietnamese.",
        "Giá vẫn hiện '128.000$' — giữ nguyên con số kiểu Việt Nam nhưng đổi ký hiệu tiền tệ thành đô la, khiến khách nước ngoài tưởng giá là 128.000 đô la thay vì khoảng 5 đô la.",
        "The price still shows '128.000$' — keeping the Vietnamese-style number but changing the currency symbol to dollars, making a foreign customer think the price is 128,000 dollars instead of about 5 dollars.",
        "ShopEasyを英語（EN）に切り替え、先ほどベトナム語で見た商品の価格を再度確認してみる。",
        "価格は依然として『128.000$』と表示される——ベトナム式の数字をそのままに通貨記号だけをドルに変更したため、外国人顧客は実際は約5ドルの商品を128,000ドルだと誤解してしまう。"),
      SOLVE("Báo bug High ngay (ảnh hưởng quyết định mua hàng), đề xuất chuyển đổi cả số tiền lẫn định dạng phân tách số theo đúng vùng (ví dụ '$5.29' cho en-US), và bổ sung ca kiểm thử định dạng tiền tệ cho mọi ngôn ngữ vào bộ hồi quy.", "Report it as a High bug immediately (affects purchase decisions), propose converting both the amount and the number-grouping format to match the region correctly (e.g. '$5.29' for en-US), and add currency-format test cases for every language to the regression suite.", "即座にHighバグとして報告し（購買判断に影響）、金額と数値区切り形式の両方を地域に正しく合わせて変換するよう提案（例：en-USなら『$5.29』）、通貨形式のテストケースを全言語で回帰テストスイートに追加する。"),
      P("Ví dụ này cho thấy vì sao kiểm thử đa ngôn ngữ đặc biệt quan trọng ở những nơi liên quan tới TIỀN. Đổi ký hiệu tiền tệ mà không đổi cách tính/quy đổi số thực sự tạo ra một con số hoàn toàn sai lệch, không chỉ là 'chưa đẹp mắt'. Khi ưu tiên thời gian có hạn, hãy dành nhiều ca kiểm thử hơn cho các màn hình có giá tiền, ngày giao hàng, số lượng — nơi một lỗi định dạng có thể khiến khách hủy đơn hoặc khiếu nại.",
        "This example shows why localization testing matters especially where MONEY is involved. Changing the currency symbol without converting the actual amount produces a completely wrong number, not just something 'less polished'. When time is limited, spend more test cases on screens with prices, delivery dates, quantities — where a formatting bug can make customers cancel orders or complain.",
        "この例は、金額に関わる箇所でローカライゼーションテストが特に重要な理由を示しています。実際の金額を変換せずに通貨記号だけを変更すると、『見た目が良くない』だけでなく完全に誤った数値が生まれます。時間が限られる場合は、価格・配送日・数量が表示される画面により多くのテストケースを割きましょう——形式のバグが顧客の注文キャンセルやクレームにつながる場所です。"),
      TRY("Nghĩ thêm một trường 'liên quan tới tiền/số' khác trên ShopEasy (phí ship, mã giảm giá, điểm tích lũy...) và đề xuất 1 ca kiểm thử định dạng cho nó.", "Think of another 'money/number-related' field on ShopEasy (shipping fee, discount code, loyalty points...) and propose one format test case for it.", "ShopEasyの別の『金額・数値関連』項目（送料、割引コード、ポイントなど）を考え、形式のテストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Cân bằng thời gian kiểm & theo dõi kết quả", en: "8. Balancing test time & tracking results", ja: "8. テスト時間の配分と結果の追跡" },
    blocks: [
      P("Không phải màn hình nào cũng cần kiểm kỹ ở mọi ngôn ngữ như nhau. Cách thực dụng là: mọi màn hình đều có ít nhất 1 lượt kiểm nhanh ở mỗi ngôn ngữ (dịch đủ, không tràn chữ cơ bản); riêng các màn hình rủi ro cao (thanh toán, giá tiền, thông báo lỗi, email xác nhận) thì đầu tư kiểm kỹ hơn ở từng chi tiết định dạng và bản dịch.",
        "Not every screen needs equally thorough checking in every language. A practical rule: every screen gets at least 1 quick pass per language (enough translation, basic no-overflow check); high-risk screens (checkout, pricing, error messages, confirmation emails) get deeper checking of every formatting and translation detail.",
        "全ての画面に同じだけ徹底的なチェックが必要なわけではありません。実用的なルール：全画面に各言語で最低1回の簡易チェック（十分な翻訳、基本的なはみ出しチェック）を行い、リスクの高い画面（決済、価格、エラーメッセージ、確認メール）には形式と翻訳のあらゆる詳細をより深くチェックします。"),
      IMG(m_kanban, "Bảng theo dõi lỗi đa ngôn ngữ theo ngôn ngữ (ShopEasy · Sprint 18)", "A board tracking localization bugs by language (ShopEasy · Sprint 18)", "言語別のローカライゼーションバグ追跡ボード（ShopEasy・スプリント18）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi đa ngôn ngữ của sprint đến từ bản EN và JA, không chỉ VI", "Metrics: most of the sprint's localization bugs come from the EN and JA versions, not just VI", "指標：スプリントのローカライゼーションバグの大半はVIだけでなくEN・JA版から見つかった"),
      TIP("Ưu tiên kiểm kỹ các màn hình liên quan TIỀN, XÁC NHẬN ĐƠN, hoặc THÔNG BÁO LỖI trước — đó là nơi một lỗi đa ngôn ngữ gây thiệt hại lớn nhất tới niềm tin khách hàng.", "Prioritize thoroughly checking screens related to MONEY, ORDER CONFIRMATION, or ERROR MESSAGES first — that's where a localization bug causes the most damage to customer trust.", "金額・注文確認・エラーメッセージに関わる画面を最優先で徹底的にチェックしよう——ローカライゼーションのバグが顧客の信頼に最も大きなダメージを与える場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm kiểm thử đa ngôn ngữ. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when doing localization testing. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はローカライゼーションテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ kiểm màn hình chính, quên các chỗ ít để ý: thông báo lỗi, email xác nhận, tooltip, trang 404 — nơi rất hay bị bỏ quên khi dịch.", "Only checking the main screen, forgetting less-noticed spots: error messages, confirmation emails, tooltips, the 404 page — places that are often forgotten when translating.", "メイン画面だけをチェックし、エラーメッセージ、確認メール、ツールチップ、404ページなど、翻訳時によく忘れられがちなあまり注目されない箇所を見逃す。"),
      PITFALL("So sánh bản dịch bằng cách đọc lướt thay vì đặt hai ngôn ngữ cạnh nhau để đối chiếu từng dòng — dễ bỏ sót câu bị thiếu hoặc câu vẫn giữ ngôn ngữ cũ.", "Comparing translations by skimming instead of placing two languages side by side to check line by line — easily missing a sentence that's missing or still in the old language.", "2つの言語を並べて1行ずつ照合するのではなく、ざっと読んで翻訳を比較すること——欠落した文や古い言語のままの文を見逃しやすい。"),
      TIP("Khi nghi ngờ một chuỗi chưa dịch, thử tìm đúng chuỗi đó trong các ngôn ngữ khác — nếu chỉ một ngôn ngữ khác biệt, khả năng cao là thiếu bản dịch chứ không phải cố ý.", "When suspecting an untranslated string, try finding that exact string in other languages — if only one language differs, it's likely a missing translation, not intentional.", "未翻訳の文字列を疑ったら、他の言語で同じ文字列を探してみよう——1つの言語だけ異なる場合、意図的ではなく翻訳漏れの可能性が高い。"),
      IMG(m_technique, "Nhắc lại các loại lỗi cần soi khi kiểm thử đa ngôn ngữ — dùng làm checklist khi thời gian có hạn", "Reminder of localization bug types to check — use as a checklist when time is limited", "ローカライゼーションで確認すべきバグの種類の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Test tương thích & responsive cho người mới", "Compatibility & responsive testing for beginners", "test-tuong-thich-responsive-cho-nguoi-moi", "初心者のための互換性・レスポンシブテスト"),
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử đa ngôn ngữ qua màn hình đổi ngôn ngữ VI/EN/JA của ShopEasy: phân biệt i18n testing và localization testing, các loại lỗi cần soi (khóa dịch thô, chữ tràn nút, sai định dạng ngày/giờ/tiền tệ/số, ký tự đặc biệt, thứ tự sắp xếp), và hai tình huống thật cho thấy dịch dài dễ vỡ layout còn sai định dạng tiền dễ khiến khách hiểu nhầm giá. Bạn cũng biết cách ưu tiên thời gian kiểm theo mức rủi ro giữa các màn hình. Đây là kỹ năng giúp bạn kiểm thử toàn diện hơn cho những app phục vụ khách hàng đa quốc gia.",
        "You just learned how to do localization testing through ShopEasy's VI/EN/JA language switcher: telling i18n testing and localization testing apart, the types of bugs to check for (raw translation keys, button text overflow, wrong date/time/currency/number formats, special characters, sort order), and two real situations showing long translations easily break layouts while wrong currency formats easily confuse customers about price. You also learned to prioritize checking time by risk level across screens. This skill helps you test more thoroughly for apps serving international customers.",
        "ShopEasyのVI/EN/JA言語切替画面を通じて、ローカライゼーションテストのやり方を学びました：i18nテストとローカライゼーションテストの区別、確認すべきバグの種類（生の翻訳キー、ボタンの文字はみ出し、日付・時刻・通貨・数値形式の誤り、特殊文字、並び順）、そして長い翻訳がレイアウトを崩しやすく、誤った通貨形式が顧客に価格を誤解させやすいことを示す2つの実例。画面間でリスクレベルに応じてチェック時間を優先する方法も学びました。国際的な顧客にサービスを提供するアプリをより網羅的にテストするのに役立つスキルです。"),
      P("Chặng tiếp theo, bạn nên học kỹ về kiểm thử giao diện (UI testing) và kiểm thử tương thích/responsive để phát hiện thêm các lỗi bố cục liên quan, cùng cách viết bug report chuẩn để báo cáo những gì bạn tìm được. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vào các công ty làm sản phẩm quốc tế.",
        "Next, you should study UI testing and compatibility/responsive testing in depth to catch more related layout bugs, along with how to write a proper bug report for what you find. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence to companies building international products.",
        "次は、関連するレイアウトのバグをさらに見つけるためにUIテストと互換性・レスポンシブテストを深く学び、見つけたバグを報告するための適切なバグレポートの書き方も学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と、国際的な製品を作る企業への自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const DANGONNGU_01 = makeDoc({
  slug: "kiem-thu-da-ngon-ngu-localization-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử đa ngôn ngữ",
  keywords: ["kiểm thử đa ngôn ngữ", "localization testing", "i18n testing", "bản địa hóa phần mềm", "kiểm thử đa ngôn ngữ cho người mới"],
  coverLabel: "NGƯỜI MỚI · ĐA NGÔN NGỮ · TMĐT",
  crumb: "Kiểm thử đa ngôn ngữ & bản địa hóa (Localization/i18n)",
  metaTitle: { vi: "Kiểm thử đa ngôn ngữ (Localization) cho người mới", en: "Localization testing for beginners", ja: "初心者向けローカライゼーションテスト" },
  metaDescription: {
    vi: "Kiểm thử đa ngôn ngữ cho người mới: soi lỗi dịch thiếu, chữ tràn nút, sai định dạng ngày giờ tiền tệ qua ShopEasy VI/EN/JA, có hình và trắc nghiệm.",
    en: "Localization testing for beginners: how to spot missing translations, text overflow, and wrong date/currency formats through the ShopEasy VI/EN/JA app, real examples, with visuals and a quiz.",
    ja: "初心者向けローカライゼーションテスト：ShopEasyのVI/EN/JAアプリで翻訳漏れ、文字はみ出し、日付・通貨形式の誤りを見つける方法、実例、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử đa ngôn ngữ & bản địa hóa cho người mới: soi lỗi dịch thiếu, chữ tràn, sai định dạng (có trắc nghiệm)",
    en: "Localization testing for beginners: spotting missing translations, text overflow, wrong formats (with quiz)",
    ja: "初心者のためのローカライゼーションテスト：翻訳漏れ・文字はみ出し・形式の誤りを見つける（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử đa ngôn ngữ (localization) qua app TMĐT ShopEasy chuyển đổi VI/EN/JA. Các loại lỗi cần soi (khóa dịch thô, chữ tràn nút, sai định dạng ngày/giờ/tiền tệ/số, ký tự đặc biệt, thứ tự sắp xếp), ví dụ lỗi thật dịch dài vỡ layout và tiền sai định dạng gây hiểu nhầm giá, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn localization testing through the ShopEasy e-commerce app switching VI/EN/JA. Bug types to check (raw translation keys, button text overflow, wrong date/time/currency/number formats, special characters, sort order), real bug examples (a long translation breaking layout, a wrong currency format confusing price), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：VI/EN/JAを切り替えるECアプリShopEasyでローカライゼーションテストを学ぶ。確認すべきバグの種類（生の翻訳キー、ボタンの文字はみ出し、日付・時刻・通貨・数値形式の誤り、特殊文字、並び順）、実際のバグ例（長い翻訳によるレイアウト崩れ、通貨形式の誤りによる価格の誤解）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử đa ngôn ngữ trên một màn hình", steps: [
    { name: "Đổi lần lượt sang từng ngôn ngữ hỗ trợ", text: "So sánh với bản gốc, tìm chỗ chưa dịch hoặc còn giữ ngôn ngữ cũ." },
    { name: "Kiểm bố cục và định dạng vùng miền", text: "Chữ tràn nút, sai định dạng ngày/giờ/tiền tệ/số, ký tự đặc biệt." },
    { name: "Ưu tiên màn hình rủi ro cao và ghi kết quả mong đợi", text: "Thanh toán, giá tiền, thông báo lỗi cần kiểm kỹ hơn." },
  ] },
  pages,
});

export const MB_DANGONNGU_01 = [DANGONNGU_01];
