// doc_mb_accessibility.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử khả năng tiếp cận (Accessibility/a11y) cơ bản — điều hướng bàn phím, focus rõ,
// alt text ảnh, độ tương phản màu, nhãn cho form (label/aria), thứ tự đọc màn hình (screen reader),
// cỡ chữ/thu phóng, không chỉ dựa vào màu để truyền tin, WCAG mức A/AA cơ bản.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, btn, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

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

// ── Mockup 1: màn ShopEasy — focus bàn phím rõ + ảnh thiếu alt + chữ tương phản kém (annotate) ──
const m_screen = browser("shopeasy.vn/san-pham/ao-thun-nam", [
  panel("ShopEasy · Trang sản phẩm", [
    `<rect x="24" y="20" width="140" height="140" rx="10" fill="#e2e8f0"/><text x="94" y="98" text-anchor="middle" font-size="34" fill="#94a3b8">🖼</text>`,
    `<rect x="20" y="16" width="148" height="148" rx="12" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>`,
    `<rect x="20" y="-4" width="230" height="18" rx="9" fill="#ef4444"/><text x="28" y="9" font-size="11" font-weight="700" fill="#ffffff">✗ Thẻ &lt;img&gt; thiếu thuộc tính alt</text>`,
    `<text x="184" y="38" font-size="15" font-weight="800" fill="#0f172a">Áo thun nam basic</text>`,
    `<text x="184" y="62" font-size="13" fill="#d1d5db">299.000đ</text>`,
    `<rect x="180" y="48" width="150" height="20" rx="6" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3"/>`,
    `<rect x="180" y="72" width="230" height="18" rx="9" fill="#ef4444"/><text x="188" y="85" font-size="11" font-weight="700" fill="#ffffff">✗ Tương phản chữ/nền quá thấp</text>`,
    btn(184, 108, 170, "Thêm vào giỏ", "primary"),
    `<rect x="180" y="104" width="178" height="42" rx="10" fill="none" stroke="#1a72f5" stroke-width="3" stroke-dasharray="4 3"/>`,
    `<rect x="180" y="150" width="196" height="18" rx="9" fill="#1a72f5"/><text x="188" y="163" font-size="11" font-weight="700" fill="#ffffff">⌨ Focus rõ ràng khi bấm phím Tab</text>`,
  ].join(""), { h: 190, accent: "#7c3aed" }),
].join(""), { h: 246, title: "ShopEasy · TMĐT", accent: "#7c3aed" });

// ── Mockup 2: bảng checklist kiểm thử Accessibility cơ bản theo WCAG A/AA ──
const m_checklist = grid("Checklist kiểm thử Accessibility cơ bản (WCAG A/AA)", ["Tiêu chí", "Mức WCAG", "Cách kiểm tra nhanh"], [
  ["Điều hướng bàn phím", "A", "Dùng Tab/Shift+Tab đi hết trang, không chạm chuột"],
  ["Trạng thái focus rõ ràng", "AA", "Xem có viền/khung sáng quanh phần tử đang chọn không"],
  ["Alt text cho ảnh", "A", "Tắt ảnh hoặc bật screen reader, nghe mô tả có ý nghĩa không"],
  ["Nhãn cho form (label/aria)", "A", "Mỗi ô nhập có <label> hoặc aria-label, không chỉ placeholder"],
  ["Độ tương phản chữ/nền", "AA", "Đo tỉ lệ tương phản, tối thiểu 4.5:1 với chữ thường"],
  ["Không chỉ dùng màu để báo tin", "A", "Chuyển màn hình sang xám, thông tin vẫn hiểu được không"],
  ["Cỡ chữ/thu phóng tới 200%", "AA", "Zoom trình duyệt 200%, nội dung không bị cắt/chồng"],
], { accent: "#7c3aed" });

// ── Mockup 3: bảng độ tương phản màu chữ/nền đạt/không đạt chuẩn AA ──
const m_contrast = grid("Đo độ tương phản màu chữ/nền trên ShopEasy", ["Cặp màu (chữ / nền)", "Tỉ lệ tương phản", "Đạt chuẩn AA (4.5:1)?"], [
  ["Đen #0f172a / trắng #ffffff", "16.1 : 1", "Đạt ✓"],
  ["Xanh dương #1a72f5 / trắng #ffffff", "4.6 : 1", "Đạt ✓ (sát ngưỡng)"],
  ["Xám nhạt #d1d5db / trắng #ffffff", "1.5 : 1", "KHÔNG đạt ✗"],
  ["Trắng #ffffff / vàng #fbbf24", "1.6 : 1", "KHÔNG đạt ✗"],
], { accent: "#7c3aed", highlight: 2, note: "Đo nhanh bằng DevTools › Inspect › Contrast, hoặc extension WebAIM Contrast Checker." });

// ── Mockup 4: ticket Jira của lỗi accessibility — ô tìm kiếm thiếu label ──
const m_jira = jira({
  key: "SE-11322", title: "Ô tìm kiếm trên trang chủ không có label/aria-label — screen reader đọc 'unlabeled edit text'",
  type: "Bug", status: "New", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "production · web ShopEasy · Chrome + NVDA screen reader"],
    ["Các bước", "1) Bật NVDA 2) Dùng Tab tới ô tìm kiếm trên trang chủ 3) Nghe NVDA đọc tên phần tử"],
    ["Kết quả mong đợi", "NVDA đọc rõ 'Tìm kiếm sản phẩm, ô nhập văn bản'"],
    ["Kết quả thực tế", "NVDA chỉ đọc 'unlabeled edit text', người dùng khiếm thị không biết ô này để làm gì"],
    ["Bằng chứng", "video-nvda-search-box.mp4, screenshot-devtools-no-label.png"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi accessibility ──
const m_kanban = kanban("Bảng theo dõi lỗi Accessibility (ShopEasy · Sprint 9)", [
  { name: "New", cards: [
    { key: "SE-11322", title: "Ô tìm kiếm không có label", sev: "High" },
    { key: "SE-11330", title: "Nút chỉ dùng màu đỏ báo lỗi", sev: "Medium" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11290", title: "Ảnh sản phẩm thiếu alt text", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11250", title: "Chữ giá tiền tương phản quá thấp", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11201", title: "Bẫy bàn phím (keyboard trap) trong popup", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu kiểm thử accessibility theo mức WCAG ──
const m_dash = dashboard("Số liệu kiểm thử Accessibility — Sprint 9 (ShopEasy)", [
  { label: "Tổng lỗi a11y", value: "16", sub: "sprint này", color: "#7c3aed" },
  { label: "Vi phạm mức A", value: "9", sub: "tối thiểu bắt buộc", color: "#e11d48" },
  { label: "Vi phạm mức AA", value: "7", sub: "mục tiêu doanh nghiệp", color: "#f97316" },
  { label: "Màn hình đã test bàn phím", value: "12/15", sub: "còn 3 màn chưa test", color: "#2563eb" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử accessibility (a11y) là gì và khác gì kiểm thử giao diện thông thường?",
  "What is accessibility (a11y) testing and how is it different from regular UI testing?",
  "Kiểm thử accessibility là việc xác nhận sản phẩm dùng được với nhiều nhóm người dùng khác nhau, kể cả người khiếm thị, khó vận động, khiếm thính — không chỉ kiểm tra giao diện có đẹp, đúng bố cục theo mắt nhìn thông thường. Nó tập trung vào việc điều hướng bằng bàn phím, đọc bằng screen reader, độ tương phản màu, nhãn cho form... để đảm bảo không ai bị 'chặn cửa' khi dùng app.",
  "Accessibility testing confirms a product is usable by many different groups of users, including people who are visually impaired, have limited mobility, or are hard of hearing — not just checking whether the UI looks good and is laid out correctly for typical sighted use. It focuses on keyboard navigation, screen reader reading, color contrast, form labels, etc., to make sure no one is 'locked out' of using the app.",
  "アクセシビリティ（a11y）テストとは何？通常のUIテストと何が違う？",
  "アクセシビリティテストとは、視覚障害、運動に制限がある、聴覚障害のあるユーザーを含む、さまざまな利用者にとって製品が使いやすいかを確認することです。見た目が綺麗で通常の視覚でレイアウトが正しいかだけを見る通常のUIテストとは異なります。キーボード操作、スクリーンリーダーでの読み上げ、色のコントラスト、フォームのラベルなどに注目し、誰もアプリの利用から『締め出されない』ようにします。");
const faq2 = FAQ(
  "Người mới có cần biết code hay công cụ chuyên sâu để test accessibility không?",
  "Do beginners need to know how to code or use advanced tools to test accessibility?",
  "Không bắt buộc. Bạn có thể bắt đầu chỉ bằng thao tác tay: rút chuột ra, dùng phím Tab/Shift+Tab đi hết trang, mở DevTools của trình duyệt để đo độ tương phản màu, hoặc bật thử một screen reader miễn phí (NVDA trên Windows, VoiceOver có sẵn trên macOS/iOS) để nghe app 'đọc' ra sao. Công cụ chuyên sâu như axe DevTools chỉ là bước nâng cao sau này.",
  "Not necessarily. You can start with hands-on actions only: unplug the mouse, use Tab/Shift+Tab to go through the whole page, open browser DevTools to measure color contrast, or turn on a free screen reader (NVDA on Windows, VoiceOver built into macOS/iOS) to hear how the app 'reads'. Advanced tools like axe DevTools are just a later, more advanced step.",
  "初心者はアクセシビリティをテストするためにコードや専門ツールの知識が必要？",
  "必須ではありません。マウスを外し、Tab/Shift+Tabでページ全体を移動したり、ブラウザのDevToolsで色のコントラストを測ったり、無料のスクリーンリーダー（Windowsの場合NVDA、macOS/iOS標準搭載のVoiceOver）をオンにしてアプリがどう『読み上げられるか』を聞いたりするだけで始められます。axe DevToolsのような専門ツールは後のより上級なステップです。");
const faq3 = FAQ(
  "WCAG là gì và mức A/AA khác nhau thế nào?",
  "What is WCAG and how are levels A and AA different?",
  "WCAG (Web Content Accessibility Guidelines) là bộ tiêu chuẩn quốc tế về khả năng tiếp cận nội dung web. Mức A là các yêu cầu tối thiểu bắt buộc (ví dụ: có alt text, điều hướng được bằng bàn phím). Mức AA là mức phổ biến mà đa số doanh nghiệp hướng tới, bao gồm cả yêu cầu mức A cộng thêm các tiêu chí chặt hơn như tỉ lệ tương phản màu tối thiểu 4.5:1, phóng to chữ tới 200% không vỡ layout. Mức AAA là cao nhất, ít bắt buộc với sản phẩm thương mại thông thường.",
  "WCAG (Web Content Accessibility Guidelines) is the international standard set for web content accessibility. Level A covers the minimum mandatory requirements (e.g., having alt text, being keyboard-navigable). Level AA is the common target most businesses aim for, including all Level A requirements plus stricter criteria such as a minimum 4.5:1 color contrast ratio and text resizing up to 200% without breaking the layout. Level AAA is the highest, rarely mandatory for typical commercial products.",
  "WCAGとは何？A基準とAA基準はどう違う？",
  "WCAG（Web Content Accessibility Guidelines）は、ウェブコンテンツのアクセシビリティに関する国際標準です。A基準は最低限必須の要件（例：alt属性がある、キーボードで操作できる）を指します。AA基準は多くの企業が目指す一般的な水準で、A基準の要件に加え、色のコントラスト比を最低4.5:1にする、文字を200%まで拡大してもレイアウトが崩れないなど、より厳しい基準を含みます。AAA基準は最上位で、通常の商用製品ではあまり必須とされません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử accessibility (a11y) là gì?", en: "What is accessibility (a11y) testing?", ja: "アクセシビリティ（a11y）テストとは何？" },
    options: [
      { vi: "Kiểm tra xem người dùng khuyết tật (khiếm thị, khó vận động...) có thể dùng được sản phẩm không", en: "Checking whether users with disabilities (visually impaired, limited mobility...) can use the product", ja: "障害のあるユーザー（視覚障害、運動制限など）が製品を使えるか確認すること" },
      { vi: "Kiểm tra tốc độ tải trang trên mạng chậm", en: "Checking page load speed on a slow network", ja: "低速な回線でのページ読み込み速度を確認すること" },
      { vi: "Kiểm tra giao diện có đẹp theo gu thẩm mỹ cá nhân không", en: "Checking whether the UI looks nice by personal taste", ja: "個人の好みでUIが綺麗かどうかを確認すること" },
      { vi: "Kiểm tra số lượng người dùng đồng thời tối đa", en: "Checking the maximum number of concurrent users", ja: "最大同時ユーザー数を確認すること" },
    ], correct: 0,
    explain: { vi: "Accessibility testing xác nhận sản phẩm dùng được với nhiều nhóm người dùng khác nhau, kể cả người khuyết tật.", en: "Accessibility testing confirms a product is usable by many different groups of users, including people with disabilities.", ja: "アクセシビリティテストは、障害のある人を含むさまざまな利用者が製品を使えるかを確認します。" },
  }),
  mcq({
    q: { vi: "Vì sao trạng thái FOCUS rõ ràng khi điều hướng bằng bàn phím lại quan trọng?", en: "Why does a clear FOCUS state matter when navigating with a keyboard?", ja: "キーボード操作時に明確なFOCUS状態が重要な理由は？" },
    options: [
      { vi: "Để trang tải nhanh hơn", en: "To make the page load faster", ja: "ページの読み込みを速くするため" },
      { vi: "Để người chỉ dùng bàn phím (không dùng chuột) biết mình đang ở đâu trên trang", en: "So keyboard-only users (no mouse) know where they currently are on the page", ja: "マウスを使わずキーボードだけの利用者が、今ページのどこにいるか分かるようにするため" },
      { vi: "Để giảm dung lượng ảnh trên trang", en: "To reduce the size of images on the page", ja: "ページ内の画像容量を減らすため" },
      { vi: "Để tăng số lượng quảng cáo hiển thị", en: "To increase the number of ads shown", ja: "表示する広告数を増やすため" },
    ], correct: 1,
    explain: { vi: "Không có chuột, dấu vết duy nhất người dùng bàn phím thấy được là khung/viền focus quanh phần tử đang chọn.", en: "Without a mouse, the only trace a keyboard user can see is the focus ring around the currently selected element.", ja: "マウスがない場合、キーボード利用者が確認できる唯一の手がかりは、現在選択中の要素を囲むフォーカスの枠です。" },
  }),
  mcq({
    q: { vi: "Thuộc tính alt cho ảnh dùng để làm gì?", en: "What is the alt attribute on an image used for?", ja: "画像のalt属性は何のために使う？" },
    options: [
      { vi: "Làm ảnh tải nhanh hơn", en: "To make the image load faster", ja: "画像の読み込みを速くするため" },
      { vi: "Tự động đổi màu ảnh", en: "To automatically change the image's color", ja: "画像の色を自動的に変えるため" },
      { vi: "Mô tả nội dung ảnh bằng văn bản để screen reader đọc cho người khiếm thị", en: "Describe the image's content in text so a screen reader can read it to visually impaired users", ja: "スクリーンリーダーが視覚障害のあるユーザーに読み上げられるよう、画像の内容をテキストで説明するため" },
      { vi: "Nén dung lượng file ảnh", en: "To compress the image file size", ja: "画像ファイルのサイズを圧縮するため" },
    ], correct: 2,
    explain: { vi: "Không có alt (hoặc alt rỗng vô nghĩa), screen reader không có gì để đọc, người khiếm thị không biết ảnh thể hiện gì.", en: "Without alt text (or meaningless empty alt), a screen reader has nothing to read, and visually impaired users don't know what the image shows.", ja: "alt属性がない（または意味のない空のalt）場合、スクリーンリーダーは読み上げる内容がなく、視覚障害のあるユーザーは画像が何を表しているか分かりません。" },
  }),
  mcq({
    q: { vi: "Theo WCAG mức AA, tỉ lệ tương phản tối thiểu cho chữ thường (không phải chữ lớn) là bao nhiêu?", en: "Under WCAG level AA, what is the minimum contrast ratio for normal-sized text (not large text)?", ja: "WCAGのAA基準では、通常サイズの文字（大きな文字を除く）の最低コントラスト比はいくつ？" },
    options: [
      { vi: "1.5 : 1", en: "1.5 : 1", ja: "1.5：1" },
      { vi: "3 : 1", en: "3 : 1", ja: "3：1" },
      { vi: "4.5 : 1", en: "4.5 : 1", ja: "4.5：1" },
      { vi: "10 : 1", en: "10 : 1", ja: "10：1" },
    ], correct: 2,
    explain: { vi: "WCAG mức AA yêu cầu tối thiểu 4.5:1 cho chữ thường (chữ lớn/đậm được nới lỏng còn khoảng 3:1).", en: "WCAG level AA requires a minimum of 4.5:1 for normal text (large/bold text is relaxed to about 3:1).", ja: "WCAGのAA基準は通常の文字で最低4.5：1を要求します（大きい・太い文字は約3：1まで緩和されます）。" },
  }),
  mcq({
    q: { vi: "Vì sao KHÔNG nên chỉ dùng màu sắc để truyền đạt thông tin quan trọng (vd chỉ dùng màu đỏ để báo lỗi)?", en: "Why should you NOT rely only on color to convey important information (e.g. using only red to signal an error)?", ja: "重要な情報を色だけで伝えるべきでない（例：エラーを赤色だけで示す）理由は？" },
    options: [
      { vi: "Vì màu đỏ tốn nhiều dung lượng hiển thị hơn màu khác", en: "Because red uses more display resources than other colors", ja: "赤色は他の色より表示に多くのリソースを使うから" },
      { vi: "Vì người mù màu hoặc người dùng screen reader có thể không nhận biết được thông tin chỉ truyền qua màu sắc", en: "Because color-blind users or screen reader users may not perceive information conveyed only through color", ja: "色覚異常のあるユーザーやスクリーンリーダーを使うユーザーは、色だけで伝えられた情報を認識できない可能性があるから" },
      { vi: "Vì màu đỏ luôn bị trình duyệt tự động chặn hiển thị", en: "Because browsers always automatically block the color red", ja: "ブラウザは常に赤色の表示を自動的にブロックするから" },
      { vi: "Vì không có lý do đặc biệt, chỉ là quy ước thẩm mỹ", en: "There's no real reason, it's just an aesthetic convention", ja: "特に理由はなく、単なる美的慣習だから" },
    ], correct: 1,
    explain: { vi: "Người mù màu không phân biệt được đỏ/xanh, và screen reader không 'thấy' màu — cần thêm icon/chữ đi kèm màu.", en: "Color-blind users can't tell red from green, and screen readers can't 'see' color — you need an icon/text alongside the color.", ja: "色覚異常のあるユーザーは赤と緑を区別できず、スクリーンリーダーは色を『見え』ません——色に加えてアイコンや文字が必要です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử accessibility (a11y) là việc xác nhận app dùng được với nhiều nhóm người dùng khác nhau: điều hướng bằng bàn phím, focus rõ ràng, alt text cho ảnh, độ tương phản màu đủ, nhãn rõ cho form, không chỉ dựa vào màu để báo tin, cỡ chữ thu phóng được — theo chuẩn WCAG mức A/AA cơ bản. Bài này bám trang sản phẩm và form của app TMĐT ShopEasy: bạn học cách tự tay kiểm thử a11y không cần công cụ phức tạp, tìm lỗi thật, và hiểu vì sao nó quan trọng. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Accessibility (a11y) testing confirms an app is usable by many different groups of users: keyboard navigation, clear focus states, image alt text, sufficient color contrast, clear form labels, not relying on color alone to convey information, and resizable text — following basic WCAG level A/AA standards. This follows ShopEasy's product page and forms: you learn to test a11y hands-on without complex tools, find real bugs, and understand why it matters. Lots of visuals and a quiz at the end.",
        "アクセシビリティ（a11y）テストとは、キーボード操作、明確なフォーカス状態、画像のalt属性、十分な色のコントラスト、明確なフォームラベル、色だけに頼らない情報伝達、拡大可能な文字サイズなど、基本的なWCAG A/AA基準に沿って、アプリがさまざまな利用者に使えるかを確認することです。本記事はECアプリShopEasyの商品ページとフォームに沿い、複雑なツールなしで手を動かしてa11yをテストする方法、実際のバグの見つけ方、そしてその重要性を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! 'Kiểm thử accessibility' nghe có vẻ to tát, nhưng thực ra bắt đầu rất đơn giản: rút chuột ra khỏi máy, thử dùng app ShopEasy chỉ bằng bàn phím xem có làm được mọi việc không. Rất nhiều app đẹp mắt trên màn hình lại 'khoá cửa' hoàn toàn với người chỉ dùng được bàn phím, người khiếm thị dùng screen reader, hay người mù màu. Trong bài này chúng ta sẽ đi qua trang sản phẩm và form của ShopEasy, chỉ ra những lỗi accessibility phổ biến nhất mà người mới có thể tự phát hiện ngay hôm nay.",
        "Hi, newcomer! 'Accessibility testing' may sound intimidating, but it actually starts very simply: unplug your mouse and try using the ShopEasy app with just a keyboard to see if you can do everything. Many apps that look great on screen completely 'lock the door' on keyboard-only users, visually impaired users relying on a screen reader, or color-blind users. In this article we'll go through ShopEasy's product page and forms, pointing out the most common accessibility bugs a beginner can spot today.",
        "こんにちは、初心者さん！『アクセシビリティテスト』と聞くと大げさに感じるかもしれませんが、実はとても簡単に始められます：マウスを外し、ShopEasyアプリをキーボードだけで操作してすべての操作ができるか試してみましょう。画面上は美しく見える多くのアプリが、キーボードだけを使う人、スクリーンリーダーに頼る視覚障害のある人、色覚異常のある人を完全に『締め出して』しまっています。本記事ではShopEasyの商品ページとフォームを通じて、初心者が今日すぐに見つけられる最も一般的なアクセシビリティのバグを紹介します。"),
      IMG(m_screen, "Màn hình test: trang sản phẩm ShopEasy có ảnh thiếu alt, chữ tương phản kém, nhưng nút có focus rõ khi bấm Tab", "Screen under test: ShopEasy product page with missing alt text, poor contrast text, but a clear focus ring on Tab", "テスト対象画面：alt属性が欠けた画像、コントラストの低い文字があるが、Tabで明確なフォーカスが付くボタンのShopEasy商品ページ"),
      DEF("Accessibility (a11y)", "khả năng một sản phẩm số dùng được bởi càng nhiều người càng tốt, kể cả người khuyết tật (khiếm thị, khó vận động, khiếm thính...), không phân biệt cách họ tương tác với thiết bị.",
        "the ability of a digital product to be usable by as many people as possible, including people with disabilities (visually impaired, limited mobility, hard of hearing...), regardless of how they interact with the device.",
        "デジタル製品が、障害のある人（視覚障害、運動制限、聴覚障害など）を含め、デバイスとの関わり方に関係なく、できるだけ多くの人に使ってもらえる能力のこと。"),
    ] },
  { heading: { vi: "2. Vì sao accessibility quan trọng & WCAG mức A/AA cơ bản", en: "2. Why accessibility matters & basic WCAG level A/AA", ja: "2. アクセシビリティの重要性とWCAG A/AA基礎" },
    blocks: [
      P("Theo nhiều thống kê, khoảng 1/6 dân số thế giới sống chung với một dạng khuyết tật nào đó, và con số này còn chưa tính những người gặp khó khăn tạm thời (gãy tay, đang ở nơi ồn ào, màn hình bị chói nắng). Nếu app ShopEasy chỉ hoạt động tốt khi dùng chuột, mắt nhìn hoàn hảo, tay bấm chuẩn xác, bạn đang tự loại một lượng khách hàng không nhỏ ngay từ khâu trải nghiệm — chưa kể ở một số quốc gia, không đáp ứng accessibility còn có thể vi phạm quy định pháp lý.",
        "According to various statistics, about 1 in 6 people worldwide live with some form of disability, and that doesn't even count people with temporary difficulties (a broken arm, being in a noisy place, a screen glare from sunlight). If ShopEasy only works well with a mouse, perfect eyesight, and precise clicking, you're excluding a significant number of customers right from the experience itself — and in some countries, failing to meet accessibility requirements can even violate legal regulations.",
        "各種統計によると、世界人口の約6人に1人が何らかの障害を抱えて生活しており、これには一時的な困難（腕の骨折、騒がしい場所にいる、画面が日光で反射して見えにくい）を持つ人は含まれていません。もしShopEasyがマウス操作、完璧な視力、正確なクリックでしか快適に使えないなら、体験の入口の時点で相当数の顧客を排除していることになります——さらに一部の国では、アクセシビリティ要件を満たさないことが法規制違反になることもあります。"),
      IMG(m_checklist, "Checklist các tiêu chí kiểm thử accessibility cơ bản theo mức WCAG A/AA", "Checklist of basic accessibility testing criteria by WCAG level A/AA", "WCAG A/AA基準による基本的なアクセシビリティテスト項目のチェックリスト"),
      P("WCAG (Web Content Accessibility Guidelines) là bộ tiêu chuẩn quốc tế phổ biến nhất về khả năng tiếp cận web, chia thành 3 mức: A (tối thiểu bắt buộc), AA (mức phổ biến doanh nghiệp hướng tới), và AAA (cao nhất, ít bắt buộc). Người mới không cần thuộc lòng cả bộ tiêu chuẩn — chỉ cần nắm vững 6-7 tiêu chí cốt lõi ở mức A/AA trong bảng checklist trên: điều hướng bàn phím, focus rõ, alt text, nhãn form, tương phản màu, không chỉ dựa vào màu, và cỡ chữ thu phóng được. Nắm chắc từng ấy đã giúp bạn bắt được phần lớn lỗi accessibility phổ biến trong thực tế.",
        "WCAG (Web Content Accessibility Guidelines) is the most widely used international standard for web accessibility, split into 3 levels: A (minimum mandatory), AA (the common target businesses aim for), and AAA (highest, rarely mandatory). Beginners don't need to memorize the entire standard — just mastering the 6-7 core criteria at level A/AA in the checklist above (keyboard navigation, clear focus, alt text, form labels, color contrast, not relying on color alone, resizable text) already lets you catch most common real-world accessibility bugs.",
        "WCAG（Web Content Accessibility Guidelines）は、ウェブアクセシビリティに関する最も広く使われている国際標準で、A（最低限必須）、AA（企業が目指す一般的な水準）、AAA（最上位、あまり必須ではない）の3段階に分かれます。初心者は規格全体を暗記する必要はなく、上のチェックリストにあるA/AA基準の6〜7個の核となる項目（キーボード操作、明確なフォーカス、alt属性、フォームラベル、色のコントラスト、色だけに頼らない、拡大可能な文字サイズ）を押さえるだけで、実際によくあるアクセシビリティのバグの大部分を見つけられるようになります。"),
    ] },
  { heading: { vi: "3. Điều hướng bàn phím & trạng thái focus rõ ràng", en: "3. Keyboard navigation & clear focus state", ja: "3. キーボード操作と明確なフォーカス状態" },
    blocks: [
      P("Kỹ thuật đầu tiên và dễ tự làm nhất: rút chuột ra, dùng phím Tab để đi tới, Shift+Tab để đi lùi, Enter/Space để kích hoạt nút hoặc liên kết. Trên trang sản phẩm ShopEasy, bạn cần đi qua được tất cả các phần tử tương tác — ảnh (nếu có link), tên sản phẩm, nút 'Thêm vào giỏ', bộ lọc màu/size — theo đúng thứ tự hợp lý, không bị 'kẹt' ở đâu, không bị nhảy lung tung ngoài ý muốn.",
        "The first and easiest technique to try yourself: unplug the mouse, use Tab to move forward, Shift+Tab to move backward, Enter/Space to activate a button or link. On ShopEasy's product page, you need to be able to reach every interactive element — the image (if linked), the product name, the 'Add to cart' button, the color/size filters — in a sensible order, without getting 'stuck' anywhere or jumping around unexpectedly.",
        "自分で試せる最初で最も簡単な技法：マウスを外し、Tabで進む、Shift+Tabで戻る、Enter/Spaceでボタンやリンクを実行する。ShopEasyの商品ページでは、画像（リンクがある場合）、商品名、『カートに追加』ボタン、色・サイズのフィルターなど、すべての操作可能な要素に、合理的な順序でどこにも『詰まる』ことなく、意図せず飛び回ることもなくアクセスできる必要があります。"),
      STEP(1, "Rút chuột ra hoặc quyết định không chạm chuột trong suốt phiên test.", "Unplug the mouse, or decide not to touch it for the entire test session.", "マウスを外すか、テストセッション中はマウスに触れないと決める。"),
      STEP(2, "Bấm Tab lần lượt từ đầu trang, quan sát xem có nhìn thấy phần tử đang được chọn không (viền/khung sáng).", "Press Tab repeatedly from the top of the page, watching whether you can see which element is currently selected (a visible outline/highlight).", "ページの先頭からTabを順に押し、現在選択されている要素が見える（枠やハイライト）かどうか観察する。"),
      STEP(3, "Với mỗi nút/link đang focus, bấm Enter hoặc Space để xác nhận nó hoạt động đúng như khi bấm chuột.", "With each focused button/link, press Enter or Space to confirm it works the same as when clicked with a mouse.", "各フォーカス中のボタン・リンクでEnterまたはSpaceを押し、マウスでクリックした時と同じように動作するか確認する。"),
      TRY("Mở một trang thương mại điện tử bạn hay dùng, rút chuột và thử điền một sản phẩm vào giỏ hàng chỉ bằng bàn phím.", "Open an e-commerce site you use often, unplug the mouse, and try adding a product to the cart using only the keyboard.", "よく使うECサイトを開き、マウスを外して、キーボードだけで商品をカートに入れてみよう。"),
      PITFALL("Chỉ kiểm tra 'có bấm Tab đi được không' mà quên nhìn xem trạng thái FOCUS có hiển thị rõ ràng không — nhiều app có thể điều hướng được bằng bàn phím nhưng người dùng không biết mình đang ở đâu vì focus vô hình.", "Only checking 'can I Tab through it' while forgetting to look at whether the FOCUS state is clearly visible — many apps are keyboard-navigable but users don't know where they are because the focus is invisible.", "『Tabで移動できるか』だけを確認し、フォーカス状態がはっきり見えるかを見落とすこと——多くのアプリはキーボードで操作できても、フォーカスが見えないためユーザーは自分が今どこにいるか分かりません。"),
    ] },
  { heading: { vi: "4. Alt text ảnh & thứ tự đọc màn hình (screen reader)", en: "4. Image alt text & screen reader reading order", ja: "4. 画像のalt属性とスクリーンリーダーの読み上げ順序" },
    blocks: [
      P("Screen reader (VoiceOver trên macOS/iOS, TalkBack trên Android, NVDA trên Windows) là công cụ đọc to nội dung màn hình cho người khiếm thị. Nó đọc theo THỨ TỰ trong mã HTML, không theo vị trí đẹp mắt trên màn hình — nên nếu bố cục CSS sắp xếp lại vị trí nhưng thứ tự HTML lộn xộn, screen reader có thể đọc tên nút trước, mô tả sản phẩm sau, khiến người nghe rất khó hình dung.",
        "A screen reader (VoiceOver on macOS/iOS, TalkBack on Android, NVDA on Windows) is a tool that reads screen content aloud for visually impaired users. It reads in the ORDER of the HTML code, not the visually pleasing on-screen position — so if CSS rearranges the layout but the HTML order is messy, a screen reader might read a button's name first and the product description afterward, making it very hard for the listener to picture the page.",
        "スクリーンリーダー（macOS/iOSのVoiceOver、AndroidのTalkBack、WindowsのNVDA）は、視覚障害のあるユーザーのために画面内容を読み上げるツールです。見た目上の美しい配置ではなく、HTMLコードの順序で読み上げます——CSSでレイアウトが並び替えられていてもHTMLの順序が乱れていると、スクリーンリーダーがボタン名を先に、商品説明を後に読み上げてしまい、聞いている人が内容を想像しづらくなります。"),
      STEP(1, "Nhấp chuột vào ảnh sản phẩm, mở DevTools (F12), kiểm tra thẻ <img> có thuộc tính alt=\"...\" mô tả đúng nội dung không (không phải alt=\"\" hoặc alt=\"image123.jpg\").", "Click the product image, open DevTools (F12), and check whether the <img> tag has an alt=\"...\" attribute that correctly describes the content (not alt=\"\" or alt=\"image123.jpg\").", "商品画像をクリックしてDevTools（F12）を開き、<img>タグにalt=\"...\"属性があり内容を正しく説明しているか確認する（alt=\"\"やalt=\"image123.jpg\"ではないこと）。"),
      STEP(2, "Bật thử screen reader miễn phí (VoiceOver/NVDA), tắt màn hình hoặc nhắm mắt, nghe app đọc trang sản phẩm từ trên xuống.", "Turn on a free screen reader (VoiceOver/NVDA), turn off the screen or close your eyes, and listen to the app read the product page top to bottom.", "無料のスクリーンリーダー（VoiceOver/NVDA）を有効にし、画面を消すか目を閉じて、アプリが商品ページを上から下まで読み上げるのを聞く。"),
      STEP(3, "Ghi lại nếu có phần tử bị đọc sai thứ tự, đọc trống (do thiếu alt), hoặc đọc lặp lại gây khó hiểu.", "Note down any elements read in the wrong order, read as empty (due to missing alt), or read repeatedly in a confusing way.", "順序が間違って読み上げられた要素、（alt属性がないため）空で読み上げられた要素、繰り返し読み上げられて分かりにくい箇所を記録する。"),
      CODE("html", "<!-- SAI: khong co alt hoac alt vo nghia -->\n<img src=\"ao-thun-nam.jpg\">\n<img src=\"ao-thun-nam.jpg\" alt=\"\">\n\n<!-- DUNG: alt mo ta dung noi dung anh -->\n<img src=\"ao-thun-nam.jpg\" alt=\"Ao thun nam mau xanh navy, co tron\">"),
      TRY("Bật VoiceOver (Cmd+F5 trên Mac) hoặc Narrator (Windows+Ctrl+Enter trên Windows) và thử nghe một trang web quen thuộc đọc ra sao trong 1 phút.", "Turn on VoiceOver (Cmd+F5 on Mac) or Narrator (Windows+Ctrl+Enter on Windows) and listen to a familiar website being read out for 1 minute.", "VoiceOver（MacでCmd+F5）またはナレーター（WindowsでWindowsキー+Ctrl+Enter）を有効にし、慣れたウェブサイトが1分間どう読み上げられるか聞いてみよう。"),
    ] },
  { heading: { vi: "5. Nhãn cho form (label/aria) & không chỉ dựa vào màu", en: "5. Form labels (label/aria) & not relying on color alone", ja: "5. フォームのラベル（label/aria）と色だけに頼らないこと" },
    blocks: [
      P("Một ô nhập chỉ có placeholder mờ nhạt ('Nhập số điện thoại...') KHÔNG phải là nhãn thật sự — khi bạn gõ chữ vào, placeholder biến mất, và screen reader thường không đọc placeholder như một nhãn rõ ràng. Ô nhập cần có <label> gắn đúng (thuộc tính for/id khớp nhau) hoặc aria-label, để dù ở trạng thái nào, người dùng screen reader vẫn biết ô đó dùng để làm gì.",
        "An input with only a faint placeholder ('Enter phone number...') is NOT a real label — once you type, the placeholder disappears, and screen readers usually don't read a placeholder as a proper label. An input needs a correctly linked <label> (matching for/id attributes) or an aria-label, so that no matter the state, screen reader users still know what the field is for.",
        "薄いプレースホルダー（『電話番号を入力…』）だけの入力欄は本当のラベルではありません——文字を入力するとプレースホルダーは消え、スクリーンリーダーは通常プレースホルダーを正式なラベルとして読み上げません。入力欄には正しく紐づいた<label>（for/id属性が一致）またはaria-labelが必要で、どんな状態でもスクリーンリーダー利用者がその項目の用途を理解できるようにします。"),
      STEP(1, "Mở DevTools, kiểm tra mỗi ô nhập trong form đăng ký/tìm kiếm ShopEasy có thẻ <label for=\"...\"> khớp id, hoặc aria-label không.", "Open DevTools and check whether each input in ShopEasy's signup/search form has a <label for=\"...\"> matching its id, or an aria-label.", "DevToolsを開き、ShopEasyの登録/検索フォームの各入力欄にidと一致する<label for=\"...\">またはaria-labelがあるか確認する。"),
      STEP(2, "Che thử màn hình bằng bộ lọc thang xám (grayscale) hoặc chụp ảnh rồi bỏ màu, xem thông tin quan trọng (lỗi, trạng thái) có còn hiểu được không.", "Try a grayscale filter over the screen, or take a screenshot and desaturate it, to see whether important information (errors, status) is still understandable.", "画面にグレースケールフィルターをかける、またはスクリーンショットを撮って彩度をなくし、重要な情報（エラー、状態）がそれでも理解できるか確認する。"),
      PITFALL("Chỉ đổi viền ô nhập sang màu đỏ khi có lỗi mà không kèm icon hoặc dòng chữ mô tả lỗi cụ thể — người mù màu hoặc dùng screen reader sẽ không biết ô nào đang sai.", "Only turning an input's border red on error without an icon or specific error text — color-blind users or screen reader users won't know which field is wrong.", "エラー時に入力欄の枠を赤くするだけで、アイコンや具体的なエラー文言を添えないこと——色覚異常のあるユーザーやスクリーンリーダー利用者はどの項目が間違っているか分かりません。"),
    ] },
  { heading: { vi: "6. Thực hành: đo độ tương phản màu chữ/nền", en: "6. Hands-on: measuring text/background color contrast", ja: "6. 実習：文字/背景の色コントラストを測る" },
    blocks: [
      P("Độ tương phản màu quyết định việc người mắt yếu, người lớn tuổi, hay người dùng ngoài trời nắng gắt có đọc được chữ trên màn hình hay không. WCAG mức AA yêu cầu tối thiểu 4.5:1 cho chữ thường, khoảng 3:1 cho chữ lớn/đậm. Cách đo nhanh nhất cho người mới: dùng DevTools của Chrome/Edge — chọn phần tử chữ, mở tab Styles, DevTools sẽ tự tính và hiển thị tỉ lệ tương phản kèm biểu tượng đạt/không đạt AA.",
        "Color contrast determines whether people with low vision, older users, or people using the app in bright sunlight can read the text on screen. WCAG level AA requires a minimum of 4.5:1 for normal text, about 3:1 for large/bold text. The fastest way for a beginner to measure it: use Chrome/Edge DevTools — select the text element, open the Styles tab, and DevTools will automatically calculate and show the contrast ratio along with a pass/fail AA icon.",
        "色のコントラストは、視力の弱い人、高齢者、あるいは強い日差しの下でアプリを使う人が画面上の文字を読めるかどうかを左右します。WCAGのAA基準は通常の文字で最低4.5：1、大きい・太い文字で約3：1を要求します。初心者が最も早く測る方法は、Chrome/EdgeのDevToolsを使うことです——文字要素を選択しStylesタブを開くと、DevToolsが自動的にコントラスト比を計算し、AA基準の合否アイコンとともに表示してくれます。"),
      STEP(1, "Nhấp chuột phải vào đoạn chữ giá tiền trên trang sản phẩm ShopEasy, chọn 'Inspect' để mở DevTools.", "Right-click the price text on ShopEasy's product page and choose 'Inspect' to open DevTools.", "ShopEasyの商品ページの価格テキストを右クリックし、『検証』を選んでDevToolsを開く。"),
      STEP(2, "Trong tab Styles, tìm dòng 'color', bấm vào ô màu để mở bảng chọn màu — DevTools hiện tỉ lệ tương phản và dấu tick/cảnh báo AA ngay bên dưới.", "In the Styles tab, find the 'color' line, click the color swatch to open the color picker — DevTools shows the contrast ratio and an AA tick/warning right below it.", "Stylesタブで『color』の行を見つけ、色の四角をクリックしてカラーピッカーを開く——DevToolsがすぐ下にコントラスト比とAAの合格/警告マークを表示する。"),
      STEP(3, "So khớp kết quả với bảng chuẩn: dưới 4.5:1 với chữ thường là KHÔNG đạt, cần đổi màu chữ đậm hơn hoặc nền sáng hơn.", "Match the result against the standard: below 4.5:1 for normal text means it does NOT pass, and the text color needs to be darker or the background lighter.", "結果を基準表と照合する：通常の文字で4.5：1未満は不合格で、文字色をより濃く、または背景をより明るくする必要がある。"),
      CODE("css", "/* SAI: chu xam nhat tren nen trang, ti le ~1.5:1 */\n.price { color: #d1d5db; background: #ffffff; }\n\n/* DUNG: chu dam hon, ti le ~7:1, dat AA */\n.price { color: #334155; background: #ffffff; }"),
      IMG(m_contrast, "Bảng đo độ tương phản màu chữ/nền — đâu đạt và đâu không đạt chuẩn AA", "Table measuring text/background color contrast — what passes and what fails AA", "文字/背景の色コントラストを測定した表——AA基準に合格するものと不合格なもの"),
      TRY("Mở DevTools trên một trang bạn hay dùng, đo thử tỉ lệ tương phản của đoạn chữ mờ nhất (thường là chữ phụ, ghi chú) trên trang.", "Open DevTools on a site you use often and measure the contrast ratio of the faintest text (usually secondary text or a caption) on the page.", "よく使うサイトでDevToolsを開き、ページ上で最も薄い文字（通常は補足テキストやキャプション）のコントラスト比を測ってみよう。"),
    ] },
  { heading: { vi: "7. Tình huống 1: nút chỉ dùng màu đỏ để báo lỗi", en: "7. Situation 1: a button uses only red to signal an error", ja: "7. シーン1：ボタンが赤色だけでエラーを示す" },
    blocks: [
      SITUATION("Khi giỏ hàng vượt quá số lượng tồn kho, ShopEasy chỉ đổi nút 'Đặt hàng' sang màu đỏ, không có icon cảnh báo, không có dòng chữ giải thích.", "When the cart exceeds available stock, ShopEasy only turns the 'Order' button red — no warning icon, no explanatory text.",
        "Người dùng mù màu đỏ-lục không phân biệt được nút đang ở trạng thái lỗi hay bình thường, vẫn bấm 'Đặt hàng' và nhận thông báo lỗi bất ngờ, khó hiểu nguyên nhân.",
        "A red-green color-blind user can't tell the button is in an error state versus normal, still clicks 'Order', and gets an unexpected error message they don't understand the cause of.",
        "カートが在庫数を超えると、ShopEasyは『注文する』ボタンを赤色に変えるだけで、警告アイコンも説明文もない。",
        "赤緑色覚異常のあるユーザーはボタンがエラー状態か通常状態か区別できず、そのまま『注文する』を押してしまい、原因が分かりにくい予期しないエラーメッセージを受け取る。"),
      SOLVE("Bổ sung icon cảnh báo (⚠) cạnh nút, kèm dòng chữ rõ ràng 'Số lượng vượt tồn kho' ngay trên nút — để trạng thái lỗi được truyền đạt bằng CẢ màu sắc LẪN icon/chữ, không phụ thuộc riêng vào màu.", "Add a warning icon (⚠) next to the button, along with a clear text line 'Quantity exceeds stock' right above it — so the error state is conveyed by BOTH color AND an icon/text, not color alone.", "ボタンの横に警告アイコン（⚠）を追加し、ボタンのすぐ上に『数量が在庫を超えています』という明確な文言を表示する——エラー状態を色だけでなく、色とアイコン/文字の両方で伝えるようにする。"),
      P("Đây là ví dụ điển hình của nguyên tắc 'không chỉ dùng màu để truyền tin' trong WCAG mức A. Màu sắc là một tín hiệu hữu ích nhưng không phải ai cũng nhận ra nó theo cách bạn mong đợi — người mù màu, người dùng màn hình đen trắng, hay screen reader hoàn toàn bỏ lỡ tín hiệu này. Luôn đi kèm icon, chữ, hoặc hình dạng khác biệt để thông tin quan trọng đến được với mọi người.",
        "This is a textbook example of the 'don't rely on color alone' principle in WCAG level A. Color is a useful signal, but not everyone perceives it the way you expect — color-blind users, users on black-and-white screens, or screen readers completely miss this signal. Always pair it with an icon, text, or a different shape so important information reaches everyone.",
        "これはWCAGのA基準にある『色だけに頼らない』原則の典型例です。色は有用なシグナルですが、誰もが期待通りに認識できるわけではありません——色覚異常のあるユーザー、白黒画面のユーザー、スクリーンリーダーはこのシグナルを完全に見逃します。重要な情報が誰にも届くよう、常にアイコン、文字、または異なる形状を併用しましょう。"),
      RECAP(["Màu sắc một mình không đủ để truyền tin quan trọng", "Luôn kèm icon/chữ mô tả cùng với màu để mọi người đều nhận ra"],
        ["Color alone isn't enough to convey important information", "Always pair color with an icon/descriptive text so everyone can perceive it"],
        ["色だけでは重要な情報を伝えるのに不十分", "誰もが認識できるよう、常に色とアイコン/説明文を併用する"]),
    ] },
  { heading: { vi: "8. Tình huống 2: ảnh sản phẩm thiếu alt, screen reader đọc trống", en: "8. Situation 2: a product image missing alt is read as empty by a screen reader", ja: "8. シーン2：alt属性のない商品画像がスクリーンリーダーで空読みされる" },
    blocks: [
      SITUATION("Một khách hàng khiếm thị dùng NVDA để duyệt trang sản phẩm ShopEasy, di chuyển tới ảnh áo thun nam.", "A visually impaired customer uses NVDA to browse ShopEasy's product page and moves to the men's t-shirt image.",
        "NVDA chỉ đọc 'unlabeled graphic' vì thẻ <img> không có thuộc tính alt — khách hàng hoàn toàn không biết ảnh thể hiện màu sắc, kiểu dáng gì, phải đoán mò hoặc bỏ qua sản phẩm.",
        "NVDA only reads 'unlabeled graphic' because the <img> tag has no alt attribute — the customer has no idea what color or style the image shows, and has to guess or skip the product entirely.",
        "視覚障害のある顧客がNVDAを使ってShopEasyの商品ページを閲覧し、メンズTシャツの画像に移動する。",
        "<img>タグにalt属性がないため、NVDAは『unlabeled graphic（ラベルなしの画像）』としか読み上げない——顧客は画像がどんな色・デザインを示しているか全く分からず、推測するか商品自体をスキップせざるを得ない。"),
      SOLVE("Thêm alt mô tả cụ thể ('Áo thun nam màu xanh navy, cổ tròn, form regular') cho mọi ảnh sản phẩm, và bổ sung việc kiểm tra alt text vào checklist trước khi release bất kỳ trang sản phẩm mới nào.", "Add specific descriptive alt text ('Men's t-shirt, navy blue, crew neck, regular fit') to every product image, and add alt-text checking to the release checklist for any new product page.", "すべての商品画像に具体的な説明alt（『メンズTシャツ、ネイビー、クルーネック、レギュラーフィット』）を追加し、新しい商品ページをリリースする前のチェックリストにalt属性の確認を加える。"),
      IMG(m_jira, "Ticket lỗi tìm được qua kiểm thử a11y — ô tìm kiếm thiếu label khiến screen reader đọc sai", "A bug ticket found via a11y testing — a search box missing a label causes the screen reader to misread it", "a11yテストで見つかったバグチケット——ラベルのない検索欄がスクリーンリーダーで誤って読み上げられる"),
      P("Ví dụ này cho thấy accessibility không phải là tính năng 'có thì tốt, không có cũng chẳng sao' — với người dùng screen reader, thiếu alt đồng nghĩa với việc SẢN PHẨM ĐÓ KHÔNG TỒN TẠI trong trải nghiệm mua sắm của họ. Đây cũng là lý do nên đưa việc kiểm tra alt text vào checklist bắt buộc mỗi khi thêm ảnh mới, thay vì chỉ kiểm tra khi có khiếu nại.",
        "This example shows accessibility isn't a 'nice to have' feature — for a screen reader user, missing alt text means that product simply DOES NOT EXIST in their shopping experience. This is also why alt-text checking should be part of the mandatory checklist whenever a new image is added, rather than only being checked after a complaint.",
        "この例は、アクセシビリティが『あれば良い』機能ではないことを示しています——スクリーンリーダー利用者にとって、alt属性の欠如はその商品が買い物体験の中に『存在しない』ことを意味します。これが、苦情が来てから確認するのではなく、新しい画像を追加するたびにalt属性の確認を必須チェックリストに含めるべき理由でもあります。"),
    ] },
  { heading: { vi: "9. Cỡ chữ/thu phóng & theo dõi lỗi accessibility", en: "9. Text size/zoom & tracking accessibility bugs", ja: "9. 文字サイズ/拡大とアクセシビリティバグの追跡" },
    blocks: [
      P("Nhiều người dùng — người lớn tuổi, người mắt yếu, hoặc đơn giản là đang dùng điện thoại ở xa mắt — cần phóng to chữ lên 150-200% để đọc thoải mái. WCAG mức AA yêu cầu trang vẫn dùng được (không bị cắt chữ, không bị nút chồng lên nhau) khi phóng to trình duyệt tới 200%. Cách test nhanh: nhấn Ctrl/Cmd và dấu '+' vài lần trên trang sản phẩm ShopEasy, xem nút 'Thêm vào giỏ' có còn bấm được, chữ có còn đọc trọn vẹn không bị tràn ra ngoài khung hay không.",
        "Many users — older people, people with low vision, or simply someone using their phone at arm's length — need to zoom text to 150-200% to read comfortably. WCAG level AA requires the page to remain usable (no clipped text, no overlapping buttons) when the browser is zoomed to 200%. Quick test: press Ctrl/Cmd and '+' a few times on ShopEasy's product page and check whether the 'Add to cart' button is still clickable and text still reads fully without overflowing its container.",
        "多くのユーザー——高齢者、視力の弱い人、あるいは単に腕を伸ばした距離でスマートフォンを使う人——は快適に読むために文字を150〜200%に拡大する必要があります。WCAGのAA基準は、ブラウザを200%まで拡大してもページが（文字が切れたり、ボタンが重なったりせず）使えることを要求します。手早いテスト方法：ShopEasyの商品ページでCtrl/Cmdと『+』を数回押し、『カートに追加』ボタンがまだクリックでき、文字が枠からはみ出さず全部読めるか確認する。"),
      TIP("Ưu tiên test accessibility ở các màn hình quan trọng nhất trước: đăng nhập, tìm kiếm, giỏ hàng, thanh toán — đó là nơi lỗi a11y khiến khách hàng bỏ cuộc giữa chừng, gây thiệt hại doanh thu trực tiếp.", "Prioritize testing accessibility on the most critical screens first: login, search, cart, checkout — that's where a11y bugs make customers abandon the flow midway, directly hurting revenue.", "最も重要な画面から優先的にアクセシビリティをテストしよう：ログイン、検索、カート、決済——a11yのバグによって顧客が途中で離脱し、売上に直接影響する場所です。"),
      IMG(m_kanban, "Bảng theo dõi lỗi accessibility tìm được qua kiểm thử (ShopEasy · Sprint 9)", "A board tracking accessibility bugs found via testing (ShopEasy · Sprint 9)", "テストで見つかったアクセシビリティバグの追跡ボード（ShopEasy・スプリント9）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi accessibility của sprint vi phạm mức A — cần ưu tiên xử lý trước", "Metrics: most of the sprint's accessibility bugs violate level A — these should be prioritized first", "指標：スプリントのアクセシビリティバグの大半はA基準違反——最優先で対応すべき"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Test tương thích responsive cho người mới", "Responsive compatibility testing for beginners", "test-tuong-thich-responsive-cho-nguoi-moi", "初心者のためのレスポンシブ互換性テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử accessibility (a11y) cơ bản qua trang sản phẩm và form của ShopEasy: điều hướng bằng bàn phím, trạng thái focus rõ ràng, alt text cho ảnh, thứ tự đọc của screen reader, nhãn cho form, độ tương phản màu, nguyên tắc không chỉ dựa vào màu để truyền tin, cỡ chữ thu phóng, cùng WCAG mức A/AA cơ bản. Bạn cũng thấy hai tình huống thật: nút chỉ dùng màu đỏ khiến người mù màu không nhận ra lỗi, và ảnh thiếu alt khiến screen reader đọc trống — cả hai đều là lỗi phổ biến mà người mới hoàn toàn có thể tự phát hiện.",
        "You just learned basic accessibility (a11y) testing through ShopEasy's product page and forms: keyboard navigation, clear focus states, image alt text, screen reader reading order, form labels, color contrast, the principle of not relying on color alone, resizable text, and basic WCAG level A/AA. You also saw two real situations: a button using only red color that a color-blind user can't recognize as an error, and an image missing alt text that a screen reader reads as empty — both are common bugs a beginner can fully catch on their own.",
        "ShopEasyの商品ページとフォームを通じて、基本的なアクセシビリティ（a11y）テストを学びました：キーボード操作、明確なフォーカス状態、画像のalt属性、スクリーンリーダーの読み上げ順序、フォームのラベル、色のコントラスト、色だけに頼らない原則、拡大可能な文字サイズ、そして基本的なWCAG A/AA基準。また、赤色だけを使ったボタンで色覚異常のあるユーザーがエラーに気づけない例と、alt属性のない画像がスクリーンリーダーで空読みされる例という、2つの実際のシーンも見ました——どちらも初心者が自力で完全に見つけられる一般的なバグです。"),
      P("Chặng tiếp theo, bạn có thể học sâu hơn về công cụ tự động hoá kiểm thử accessibility (như axe DevTools, Lighthouse), hoặc quay lại củng cố kỹ năng test giao diện và form dữ liệu để có nền tảng vững chắc trước khi đi sâu. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you could dive deeper into accessibility testing automation tools (like axe DevTools, Lighthouse), or go back to solidify your UI and data-form testing skills for a strong foundation before going further. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、アクセシビリティテストの自動化ツール（axe DevTools、Lighthouseなど）についてさらに深く学ぶか、より深く進む前にUIテストやデータフォームテストのスキルを固め直すのも良いでしょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const A11Y_DOC_01 = makeDoc({
  slug: "kiem-thu-accessibility-a11y-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử accessibility",
  keywords: ["kiểm thử accessibility", "a11y", "WCAG", "kiểm thử khả năng tiếp cận", "accessibility testing cho người mới"],
  coverLabel: "NGƯỜI MỚI · ACCESSIBILITY · TMĐT",
  crumb: "Kiểm thử khả năng tiếp cận (Accessibility/a11y) cơ bản",
  metaTitle: { vi: "Kiểm thử Accessibility (a11y) cơ bản cho người mới", en: "Basic accessibility (a11y) testing for beginners", ja: "初心者向け基本アクセシビリティ（a11y）テスト" },
  metaDescription: {
    vi: "Kiểm thử accessibility (a11y) cho người mới: điều hướng bàn phím, alt text, tương phản màu, nhãn form qua ví dụ ShopEasy, có hình minh hoạ và trắc nghiệm.",
    en: "Accessibility (a11y) testing for beginners: keyboard navigation, alt text, color contrast, form labels through real ShopEasy examples, with full visuals and a quiz.",
    ja: "初心者向けアクセシビリティ（a11y）テスト：ShopEasyの実例を通じてキーボード操作、alt属性、色のコントラスト、フォームラベルを解説。豊富な図とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử khả năng tiếp cận (Accessibility/a11y) cơ bản cho người mới (có trắc nghiệm)",
    en: "Basic accessibility (a11y) testing for beginners (with quiz)",
    ja: "初心者のための基本アクセシビリティ（a11y）テスト（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử accessibility (a11y) qua app TMĐT ShopEasy — điều hướng bàn phím, focus rõ, alt text ảnh, độ tương phản màu, nhãn form, thứ tự đọc screen reader, cỡ chữ thu phóng, không chỉ dựa vào màu, WCAG mức A/AA cơ bản. Có ví dụ lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn accessibility (a11y) testing through the ShopEasy e-commerce app — keyboard navigation, clear focus, image alt text, color contrast, form labels, screen reader reading order, resizable text, not relying on color alone, and basic WCAG level A/AA. Includes real bug examples, many UI mockups, FAQ, and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでアクセシビリティ（a11y）テストを学ぶ——キーボード操作、明確なフォーカス、画像のalt属性、色のコントラスト、フォームラベル、スクリーンリーダーの読み上げ順序、拡大可能な文字サイズ、色だけに頼らない原則、基本的なWCAG A/AA基準。実際のバグ例、多数のモック、FAQ、5問クイズ付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử accessibility cơ bản", steps: [
    { name: "Điều hướng toàn trang chỉ bằng bàn phím", text: "Rút chuột, dùng Tab/Shift+Tab, quan sát trạng thái focus." },
    { name: "Kiểm tra alt text và nhãn form", text: "Bật screen reader, xem DevTools để kiểm tra alt/label." },
    { name: "Đo độ tương phản màu và thử thu phóng 200%", text: "Dùng DevTools đo contrast, zoom trình duyệt kiểm tra layout." },
  ] },
  pages,
});

export const MB_A11Y_01 = [A11Y_DOC_01];
