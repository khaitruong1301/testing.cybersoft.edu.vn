// doc_au_mobile.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Tự động kiểm thử responsive & giả lập thiết bị di động (mobile device emulation) bằng
// Playwright devices (iPhone/Pixel), viewport tuỳ chỉnh, kiểm layout mobile vs desktop,
// mô phỏng chạm/cuộn, so sánh render. Gắn app TMĐT ShopEasy (bản mobile). Song ngữ vi/en/ja
// (ja≠en), 12 chương, nhiều mockup ui_mock, code Playwright chạy được, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { panel, field, btn, annotate, grid, jira, kanban } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, công cụ & dự án thực chiến.",
};
const course1v1Url = "https://cybersoft.edu.vn/trainning-course-1vs1/";

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

// ── Mockup 1: bảng thiết bị & viewport phổ biến cần test ──
const m_devicetable = grid("Bảng thiết bị & viewport thường dùng khi test responsive", ["Thiết bị", "Độ phân giải (CSS px)", "Loại", "Preset Playwright"], [
  ["iPhone 13", "390 x 844", "Điện thoại · iOS", "devices['iPhone 13']"],
  ["Pixel 5", "393 x 851", "Điện thoại · Android", "devices['Pixel 5']"],
  ["iPad Mini", "768 x 1024", "Máy tính bảng", "devices['iPad Mini']"],
  ["Mobile nhỏ (tuỳ chỉnh)", "360 x 780", "Điện thoại phổ thông", "page.setViewportSize()"],
  ["Laptop nhỏ (tuỳ chỉnh)", "1280 x 800", "Desktop", "page.setViewportSize()"],
  ["Full HD (tuỳ chỉnh)", "1920 x 1080", "Desktop", "page.setViewportSize()"],
], { accent: "#0891b2", note: "Không có 1 kích thước 'chuẩn' duy nhất — chọn nhóm thiết bị/viewport khớp với dữ liệu người dùng thật của sản phẩm." });

// ── Mockup 2: màn ShopEasy mobile, chú thích lỗi menu che nút Thêm vào giỏ ──
const m_mobile = panel("ShopEasy Mobile · Trang sản phẩm (iPhone 13 · 390×844)", [
  field(24, 20, 660, "Số lượng", "1", "normal"),
  btn(24, 112, 300, "Thêm vào giỏ hàng", "primary"),
  btn(340, 112, 300, "☰ Menu di động (sticky)", "ghost"),
  annotate(20, 10, 668, 72, "Vùng chạm: ô số lượng, cần đủ 44x44px"),
  annotate(336, 102, 308, 50, "BUG: menu sticky che một phần nút Thêm vào giỏ"),
].join(""), { h: 236, accent: "#0891b2" });

// ── Mockup 3: bảng so sánh render Mobile vs Desktop cùng 1 màn hình ──
const m_compare = grid("So sánh render: ShopEasy giỏ hàng ở Mobile (390px) và Desktop (1280px)", ["Tiêu chí", "Mobile · 390px", "Desktop · 1280px"], [
  ["Menu điều hướng", "Thu gọn thành icon ☰, mở dạng overlay toàn màn hình", "Hiện đầy đủ dạng thanh ngang"],
  ["Danh sách sản phẩm trong giỏ", "Xếp dọc, 1 cột, ảnh nhỏ hơn", "Xếp dạng bảng nhiều cột"],
  ["Nút Thanh toán", "Cố định (sticky) ở đáy màn hình để luôn thấy được", "Nằm cuối trang, không cần sticky"],
  ["Vùng chạm nút bấm", "Tối thiểu 44x44px để ngón tay bấm chính xác", "Có thể nhỏ hơn vì dùng chuột trỏ chính xác"],
  ["Bảng giá chi tiết", "Dễ tràn ngang nếu không cuộn/thu gọn cột", "Đủ chỗ hiển thị hết cột mà không tràn"],
], { accent: "#0891b2", note: "Cùng 1 trang giỏ hàng nhưng hành vi kỳ vọng khác nhau theo kích thước màn hình — đây chính là thứ automation cần kiểm tra." });

// ── Mockup 4: cấu hình devices trong playwright.config.js ──
const m_config = grid("Cấu hình 'projects' mô phỏng thiết bị trong playwright.config.js", ["Project", "Thiết bị mô phỏng", "Mục đích kiểm thử"], [
  ["mobile-iphone", "devices['iPhone 13']", "Kiểm layout & chạm trên Safari iOS giả lập"],
  ["mobile-pixel", "devices['Pixel 5']", "Kiểm layout & chạm trên Chrome Android giả lập"],
  ["tablet-ipad", "devices['iPad Mini']", "Kiểm layout ở kích thước trung gian"],
  ["desktop-chrome", "viewport tuỳ chỉnh 1280x800, không dùng devices", "So sánh với bản desktop làm mốc đối chiếu"],
], { accent: "#0891b2", note: "Mỗi project chạy TOÀN BỘ bộ test trên đúng 1 kiểu thiết bị/viewport — Playwright tự chạy song song các project." });

// ── Mockup 5: ticket Jira ghi lại lỗi responsive trên iPhone ──
const m_jira = jira({
  key: "SE-14108", title: "Menu di động sticky che nút 'Thêm vào giỏ hàng' trên iPhone 13 (390px)",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Safari iOS giả lập qua devices['iPhone 13']"],
    ["Bước tái hiện", "Mở trang sản phẩm ở viewport 390x844, cuộn xuống dưới, quan sát vùng nút Thêm vào giỏ"],
    ["Kết quả thực tế", "Menu di động sticky phủ lên khoảng 30% chiều cao nút, khó bấm trúng bằng ngón tay"],
    ["Kết quả mong đợi", "Nút Thêm vào giỏ luôn hiển thị trọn vẹn, vùng chạm tối thiểu 44x44px, không bị che"],
    ["Đề xuất", "Thêm test tự động kiểm tra boundingBox() của nút ở mọi viewport mobile trong CI"],
  ],
});

// ── Mockup 6: bảng kanban theo dõi lỗi responsive/mobile ──
const m_kanban = kanban("Theo dõi lỗi responsive & mobile emulation (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14115", title: "Bảng giá chi tiết tràn ngang ở viewport 360px", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14108", title: "Menu sticky che nút Thêm vào giỏ trên iPhone 13", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14099", title: "Thêm project mobile-pixel vào playwright.config.js", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14080", title: "Thêm test viewport tuỳ chỉnh cho giỏ hàng", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử responsive & giả lập thiết bị (device emulation) là gì?",
  "What is responsive testing and device emulation?",
  "Kiểm thử responsive là kiểm tra xem giao diện web có hiển thị và hoạt động đúng ở nhiều kích thước màn hình khác nhau (điện thoại, máy tính bảng, desktop) hay không. Giả lập thiết bị (device emulation) là cách công cụ automation như Playwright 'đóng giả' một thiết bị thật — đúng kích thước màn hình, user-agent, tỉ lệ pixel, có hỗ trợ chạm hay không — mà không cần sở hữu thiết bị vật lý đó.",
  "Responsive testing checks whether a web UI displays and behaves correctly across many screen sizes (phone, tablet, desktop). Device emulation is how automation tools like Playwright 'pretend' to be a real device — matching its screen size, user-agent, pixel ratio, and touch support — without you owning the physical device.",
  "レスポンシブテスト・端末エミュレーションとは？",
  "レスポンシブテストとは、ウェブUIがスマートフォン、タブレット、デスクトップなど様々な画面サイズで正しく表示・動作するかを確認することです。端末エミュレーション（device emulation）とは、Playwrightのような自動化ツールが、実機を持たなくても画面サイズ、ユーザーエージェント、ピクセル比、タッチ対応の有無などを『実機のふりをして』再現する仕組みです。");
const faq2 = FAQ(
  "Giả lập thiết bị trong Playwright khác gì test trên thiết bị thật?",
  "How is device emulation in Playwright different from testing on a real device?",
  "Giả lập thiết bị mô phỏng đúng kích thước màn hình, user-agent và một số hành vi cảm ứng, giúp phát hiện sớm lỗi về layout, kích thước vùng chạm, hay phần tử bị che khuất — chạy nhanh, chạy song song, không cần phần cứng. Tuy nhiên nó không mô phỏng 100% mọi đặc thù phần cứng thật (hiệu năng CPU/GPU, cảm biến, mạng di động thật, trình duyệt gốc của thiết bị), nên với dự án lớn, đội ngũ thường kết hợp: giả lập để kiểm tra nhanh mỗi lần code thay đổi, và test trên thiết bị thật (hoặc farm thiết bị) định kỳ trước khi phát hành.",
  "Device emulation mimics the exact screen size, user-agent, and some touch behavior, helping you catch layout bugs, touch-target sizing issues, or overlapping elements early — fast, parallel, no hardware needed. But it doesn't replicate 100% of real hardware specifics (actual CPU/GPU performance, sensors, real mobile networks, the device's native browser), so on larger projects teams typically combine both: emulation for quick checks on every code change, and testing on real devices (or a device farm) periodically before release.",
  "Playwrightの端末エミュレーションは実機でのテストと何が違う？",
  "端末エミュレーションは画面サイズ、ユーザーエージェント、一部のタッチ挙動を正確に再現し、レイアウトの不具合やタップ領域のサイズ、要素の重なりなどを早期に発見できます——高速で並列実行でき、ハードウェアも不要です。ただし実機の特性（実際のCPU/GPU性能、センサー、実際のモバイル通信、端末純正のブラウザ）を100%再現するわけではないため、大規模プロジェクトではコード変更のたびのクイックチェックにエミュレーションを、リリース前の定期確認に実機（または端末ファーム）を組み合わせるのが一般的です。");
const faq3 = FAQ(
  "Viewport tùy chỉnh khác gì so với dùng devices có sẵn của Playwright?",
  "How is a custom viewport different from using Playwright's built-in devices?",
  "devices có sẵn (như devices['iPhone 13']) gói sẵn nhiều thuộc tính của một thiết bị thật: kích thước màn hình, user-agent, tỉ lệ pixel (deviceScaleFactor), có hỗ trợ chạm (hasTouch) hay không, có phải thiết bị di động (isMobile) hay không... rất tiện khi muốn mô phỏng đúng một thiết bị phổ biến. Viewport tùy chỉnh (dùng page.setViewportSize hoặc khai báo viewport trong project) chỉ đổi đúng kích thước màn hình, không tự động đổi user-agent hay bật cảm ứng — phù hợp khi muốn kiểm tra nhanh nhiều mức kích thước (breakpoint) khác nhau mà không quan tâm thiết bị cụ thể là gì.",
  "The built-in devices (like devices['iPhone 13']) bundle many properties of a real device: screen size, user-agent, pixel ratio (deviceScaleFactor), whether touch is supported (hasTouch), whether it's mobile (isMobile)... very handy when you want to accurately emulate a popular device. A custom viewport (using page.setViewportSize or declaring viewport in a project) only changes the screen size, without automatically changing the user-agent or enabling touch — suited for quickly checking many size breakpoints without caring about a specific device.",
  "カスタムviewportとPlaywright組み込みのdevicesは何が違う？",
  "組み込みのdevices（devices['iPhone 13']など）は実機の多くの属性——画面サイズ、ユーザーエージェント、ピクセル比（deviceScaleFactor）、タッチ対応の有無（hasTouch）、モバイル端末かどうか（isMobile）など——をまとめて持ち、よく使われる端末を正確に再現したいときに便利です。カスタムviewport（page.setViewportSizeを使うか、project内でviewportを宣言する）は画面サイズだけを変え、ユーザーエージェントやタッチを自動的には変更しません——特定の端末を気にせず複数のサイズ（ブレークポイント）を素早く確認したいときに向いています。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích cốt lõi của kiểm thử responsive/mobile là gì?", en: "What is the core purpose of responsive/mobile testing?", ja: "レスポンシブ・モバイルテストの核心的な目的は何？" },
    options: [
      { vi: "Kiểm tra giao diện hiển thị và hoạt động đúng trên nhiều kích thước màn hình khác nhau", en: "Verify the UI displays and behaves correctly across many different screen sizes", ja: "UIが様々な画面サイズで正しく表示・動作することを確認すること" },
      { vi: "Làm test chạy nhanh hơn bằng cách bỏ bớt bước chờ tải trang", en: "Make tests run faster by skipping page-load waits", ja: "ページ読み込み待機を省いてテストを高速化すること" },
      { vi: "Tự động sinh dữ liệu kiểm thử ngẫu nhiên cho mọi form", en: "Automatically generate random test data for every form", ja: "すべてのフォーム用にランダムなテストデータを自動生成すること" },
      { vi: "Thay thế hoàn toàn việc kiểm thử trên thiết bị thật", en: "Completely replace testing on real devices", ja: "実機でのテストを完全に置き換えること" },
    ], correct: 0,
    explain: { vi: "Responsive/mobile testing nhắm vào việc layout, hành vi và vùng chạm đều đúng ở mọi kích thước màn hình mà người dùng thật sự dùng.", en: "Responsive/mobile testing targets making sure layout, behavior, and touch targets are correct at every screen size real users actually use.", ja: "レスポンシブ・モバイルテストは、実際のユーザーが使うあらゆる画面サイズでレイアウト・動作・タップ領域が正しいことを確認することが目的です。" },
  }),
  mcq({
    q: { vi: "devices['iPhone 13'] trong Playwright cung cấp sẵn những gì?", en: "What does Playwright's devices['iPhone 13'] provide out of the box?", ja: "Playwrightのdevices['iPhone 13']はあらかじめ何を提供する？" },
    options: [
      { vi: "Chỉ mỗi kích thước màn hình, không có gì khác", en: "Only the screen size, nothing else", ja: "画面サイズだけで他は何もない" },
      { vi: "Viewport, user-agent, tỉ lệ pixel (deviceScaleFactor) và cờ hỗ trợ chạm (hasTouch)", en: "Viewport, user-agent, pixel ratio (deviceScaleFactor), and a touch-support flag (hasTouch)", ja: "ビューポート、ユーザーエージェント、ピクセル比（deviceScaleFactor）、タッチ対応フラグ（hasTouch）" },
      { vi: "Dữ liệu tài khoản đăng nhập mẫu cho mọi trang web", en: "Sample login account data for every website", ja: "あらゆるウェブサイト用のサンプルログインアカウントデータ" },
      { vi: "Kết nối tới thiết bị iPhone thật qua USB", en: "A connection to a real iPhone over USB", ja: "USB経由での実機iPhoneへの接続" },
    ], correct: 1,
    explain: { vi: "devices['iPhone 13'] gói sẵn nhiều thuộc tính mô phỏng một thiết bị thật, không chỉ riêng kích thước màn hình.", en: "devices['iPhone 13'] bundles multiple properties that emulate a real device, not just the screen size.", ja: "devices['iPhone 13']は画面サイズだけでなく、実機を模倣する複数の属性をまとめて持っています。" },
  }),
  mcq({
    q: { vi: "Khác biệt chính giữa dùng devices preset và page.setViewportSize() là gì?", en: "What is the main difference between using a devices preset and page.setViewportSize()?", ja: "devicesプリセットの使用とpage.setViewportSize()の主な違いは？" },
    options: [
      { vi: "Không có khác biệt, hai cách hoàn toàn giống nhau", en: "There's no difference, the two are identical", ja: "違いはなく、両者は全く同じ" },
      { vi: "setViewportSize() chỉ đổi kích thước màn hình, không tự đổi user-agent hay bật cảm ứng như devices preset", en: "setViewportSize() only changes the screen size, without auto-changing the user-agent or enabling touch like a devices preset does", ja: "setViewportSize()は画面サイズのみを変更し、devicesプリセットのようにユーザーエージェントの変更やタッチの有効化は自動で行わない" },
      { vi: "devices preset chỉ dùng được cho trình duyệt Firefox", en: "A devices preset can only be used with the Firefox browser", ja: "devicesプリセットはFirefoxブラウザでしか使えない" },
      { vi: "setViewportSize() cần thiết bị vật lý kết nối trước khi chạy", en: "setViewportSize() requires a physical device to be connected before running", ja: "setViewportSize()は実行前に実機の接続が必要" },
    ], correct: 1,
    explain: { vi: "devices preset gói nhiều thuộc tính mô phỏng thiết bị; setViewportSize() chỉ đổi mỗi kích thước, phù hợp khi cần thử nhanh nhiều breakpoint.", en: "A devices preset bundles many device-emulation properties; setViewportSize() only changes the size, suited for quickly trying many breakpoints.", ja: "devicesプリセットは端末エミュレーションの多くの属性をまとめて持ち、setViewportSize()はサイズのみを変更するため、複数のブレークポイントを素早く試すのに向いています。" },
  }),
  mcq({
    q: { vi: "Nên dùng hàm nào để mô phỏng đúng thao tác chạm ngón tay thay vì click chuột trên thiết bị cảm ứng?", en: "Which function should you use to accurately emulate a finger tap instead of a mouse click on a touch device?", ja: "タッチ端末で、マウスクリックの代わりに指のタップを正しく再現するにはどの関数を使うべき？" },
    options: [
      { vi: "page.locator(...).click()", en: "page.locator(...).click()", ja: "page.locator(...).click()" },
      { vi: "page.locator(...).tap()", en: "page.locator(...).tap()", ja: "page.locator(...).tap()" },
      { vi: "page.locator(...).hover()", en: "page.locator(...).hover()", ja: "page.locator(...).hover()" },
      { vi: "page.locator(...).focus()", en: "page.locator(...).focus()", ja: "page.locator(...).focus()" },
    ], correct: 1,
    explain: { vi: "tap() mô phỏng đúng sự kiện chạm (touch events) mà thiết bị cảm ứng thật phát ra, cần bật hasTouch (đã có sẵn trong devices preset mobile).", en: "tap() accurately emulates the touch events a real touch device fires, requiring hasTouch to be enabled (already on by default in mobile devices presets).", ja: "tap()は実際のタッチ端末が発火するタッチイベントを正しく再現し、hasTouchの有効化が必要です（モバイルのdevicesプリセットでは既定で有効）。" },
  }),
  mcq({
    q: { vi: "Vì sao cần kiểm tra vùng chạm tối thiểu (ví dụ 44x44px) của nút bấm trên mobile?", en: "Why check that a button's touch target is at least a minimum size (e.g. 44x44px) on mobile?", ja: "モバイルでボタンの最小タップ領域（例：44×44px）を確認すべき理由は？" },
    options: [
      { vi: "Vì đây là quy ước giúp ngón tay bấm trúng nút chính xác, tránh bấm nhầm sang phần tử bên cạnh", en: "It's a convention that helps a finger tap the button accurately, avoiding accidentally tapping a neighboring element", ja: "指が正確にボタンをタップし、隣接する要素を誤ってタップしないようにするための慣習だから" },
      { vi: "Vì Playwright bắt buộc mọi nút phải đúng 44x44px mới chạy được test", en: "Because Playwright requires every button to be exactly 44x44px for the test to run", ja: "Playwrightがすべてのボタンをちょうど44×44pxにしなければテストを実行できないから" },
      { vi: "Vì kích thước này giúp trang tải nhanh hơn trên mạng di động", en: "Because this size makes the page load faster on mobile networks", ja: "このサイズがモバイル通信でのページ読み込みを速くするから" },
      { vi: "Vì đây là giới hạn kỹ thuật của trình duyệt WebKit", en: "Because it's a technical limit of the WebKit browser engine", ja: "WebKitブラウザエンジンの技術的な制限だから" },
    ], correct: 0,
    explain: { vi: "Ngón tay to hơn con trỏ chuột nhiều lần; vùng chạm quá nhỏ dễ khiến người dùng bấm nhầm, đặc biệt khi các nút đặt gần nhau.", en: "A finger is many times larger than a mouse cursor; a touch target that's too small easily causes mis-taps, especially when buttons sit close together.", ja: "指はマウスカーソルよりはるかに大きく、タップ領域が小さすぎると特にボタン同士が近い場合に誤タップが起こりやすくなります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Tự động kiểm thử responsive là kiểm tra giao diện web hiển thị và hoạt động đúng ở nhiều kích thước màn hình, còn giả lập thiết bị (device emulation) là cách Playwright 'đóng giả' iPhone, Pixel... mà không cần phần cứng thật. Bài này bám bản mobile của app TMĐT ShopEasy: bạn học dùng devices['iPhone 13']/devices['Pixel 5'], đổi viewport tuỳ chỉnh, kiểm layout mobile vs desktop, mô phỏng chạm và cuộn. AI đã tổng hợp và hệ thống hoá bài học từ hàng trăm dự án automation thực tế để bạn học nhanh hơn nhiều so với tự mò từng chi tiết. Có nhiều hình minh hoạ, code Playwright chạy được và trắc nghiệm cuối bài.",
        "Automated responsive testing checks that a web UI displays and behaves correctly across many screen sizes, while device emulation is how Playwright 'pretends' to be an iPhone, a Pixel... without real hardware. This article follows the mobile version of ShopEasy's e-commerce app: you'll learn to use devices['iPhone 13']/devices['Pixel 5'], switch custom viewports, check mobile-vs-desktop layout, and emulate tap and scroll. AI has distilled and structured lessons from hundreds of real automation projects, helping you learn far faster than figuring everything out alone. Lots of visuals, runnable Playwright code, and a quiz at the end.",
        "自動レスポンシブテストとは、ウェブUIが様々な画面サイズで正しく表示・動作するかを確認することで、端末エミュレーション（device emulation）とは、Playwrightが実機なしでiPhoneやPixelなどの『ふり』をする仕組みです。本記事はECアプリShopEasyのモバイル版に沿い、devices['iPhone 13']/devices['Pixel 5']の使い方、カスタムviewportの切り替え、モバイルとデスクトップのレイアウト確認、タップ・スクロールのエミュレーションを学びます。AIが数百の実際の自動化プロジェクトから教訓を蒸留し体系化しており、独学で全てを見つけ出すより遥かに速く学べます。図が豊富で、動くPlaywrightコードと最後にクイズ付き。"),
      P("Chào bạn mới! Ngày nay phần lớn khách hàng mở web bằng điện thoại chứ không phải máy tính, nên nếu chỉ test trên màn hình desktop quen thuộc của mình, bạn đang bỏ sót phần lớn trải nghiệm thực tế. Playwright cho phép mô phỏng hàng chục thiết bị di động phổ biến ngay trong code, không cần sở hữu iPhone hay Pixel thật, không cần cài app điều khiển thiết bị phức tạp. Chúng ta sẽ học qua bản mobile thật của ShopEasy — trang sản phẩm và giỏ hàng — có hình minh hoạ và code Playwright chạy được, dùng cả devices preset lẫn viewport tuỳ chỉnh.",
        "Hi, newcomer! Nowadays most customers open the web on a phone, not a computer, so if you only test on your familiar desktop screen, you're missing most of the real experience. Playwright lets you emulate dozens of popular mobile devices right in code — no need to own a real iPhone or Pixel, no complex device-control app to install. We'll learn through ShopEasy's real mobile screens — the product page and cart — with visuals and runnable Playwright code, using both device presets and custom viewports.",
        "こんにちは、初心者さん！今日、ほとんどの顧客はパソコンではなくスマートフォンでウェブを開くため、慣れたデスクトップ画面だけでテストしていると、実際の体験の大部分を見落とすことになります。Playwrightはコードの中で数十種類の人気モバイル端末をエミュレートでき、実機のiPhoneやPixelを持つ必要も、複雑な端末制御アプリを入れる必要もありません。ShopEasyの実際のモバイル画面——商品ページとカート——を通じて、図と動くPlaywrightコード付きで、デバイスプリセットとカスタムviewportの両方を学びます。"),
      IMG(m_devicetable, "Bảng thiết bị & viewport thường gặp: từ điện thoại nhỏ tới desktop Full HD", "Common devices & viewports: from small phones to Full HD desktops", "よくある端末・viewport一覧：小型スマホからFull HDデスクトップまで"),
      DEF("Responsive testing", "kiểm tra giao diện web hiển thị và hoạt động đúng ở nhiều kích thước màn hình khác nhau, không chỉ riêng màn hình bạn đang code.",
        "checking that a web UI displays and behaves correctly across many different screen sizes, not just the one you're coding on.",
        "自分がコーディングしている画面だけでなく、様々な画面サイズでウェブUIが正しく表示・動作するかを確認すること。"),
    ] },
  { heading: { vi: "2. Vấn đề: web chạy tốt trên desktop nhưng vỡ trên mobile", en: "2. The problem: the web works on desktop but breaks on mobile", ja: "2. 問題：デスクトップでは動くがモバイルで崩れる" },
    blocks: [
      P("Hãy hình dung đội dev ShopEasy phát triển và tự kiểm tra trang sản phẩm trên laptop 15 inch — mọi thứ đều đẹp: nút bấm rõ ràng, menu hiện đầy đủ, không phần tử nào bị che. Nhưng khi khách hàng thật mở cùng trang đó trên iPhone, một thanh menu di động (sticky) lại phủ lên một phần nút 'Thêm vào giỏ hàng', khiến người dùng khó bấm trúng, thậm chí bấm nhầm sang mục khác.",
        "Imagine ShopEasy's dev team builds and self-checks the product page on a 15-inch laptop — everything looks great: buttons are clear, the menu shows in full, nothing overlaps. But when a real customer opens that same page on an iPhone, a sticky mobile menu bar covers part of the 'Add to cart' button, making it hard to tap accurately, or even tapping the wrong item.",
        "ShopEasyの開発チームが15インチのノートパソコンで商品ページを開発・自己確認していると想像してください——ボタンは明確で、メニューは全部表示され、何も重ならず、すべてが美しく見えます。しかし実際の顧客がiPhoneで同じページを開くと、モバイル用の固定メニューバーが『カートに追加』ボタンの一部を覆い、正確にタップしづらく、間違った項目をタップしてしまうことさえあります。"),
      IMG(m_mobile, "Màn hình test: trang sản phẩm ShopEasy trên iPhone 13, chú thích lỗi menu che nút Thêm vào giỏ", "Screen under test: ShopEasy's product page on iPhone 13, annotated with the menu-covers-button bug", "テスト対象画面：iPhone 13でのShopEasy商品ページ、メニューがボタンを覆うバグを注記"),
      P("Vấn đề không nằm ở việc dev 'làm ẩu' — mà ở việc quy trình test chỉ chạy trên 1 kích thước màn hình duy nhất. Web hiện đại dùng CSS responsive (flexbox, media query, breakpoint) để tự đổi bố cục theo kích thước màn hình, nhưng chính sự 'tự đổi' đó lại là nguồn lỗi: một phần tử ẩn/hiện sai điều kiện, một breakpoint tính sai, hay một thanh sticky mới thêm vào không tính tới không gian còn lại trên màn hình nhỏ. Những lỗi này gần như vô hình nếu bạn chỉ test trên desktop, và chỉ lộ ra khi có ai đó — người dùng thật, hoặc automation — mở đúng ở kích thước mobile.",
        "The problem isn't sloppy development — it's that the test process only runs at a single screen size. Modern web uses responsive CSS (flexbox, media queries, breakpoints) to auto-adjust layout by screen size, but that very 'auto-adjusting' is a source of bugs: an element shown/hidden under the wrong condition, a miscalculated breakpoint, or a newly added sticky bar that doesn't account for the remaining space on a small screen. These bugs are nearly invisible if you only test on desktop, and only surface when someone — a real user, or automation — opens the page at exactly a mobile size.",
        "問題は開発が『いい加減』だからではなく、テストプロセスが1つの画面サイズでしか実行されていないことにあります。現代のウェブはレスポンシブCSS（flexbox、メディアクエリ、ブレークポイント）で画面サイズに応じてレイアウトを自動調整しますが、まさにその『自動調整』こそがバグの温床です：条件を誤った要素の表示/非表示、計算が間違ったブレークポイント、小さい画面の残りスペースを考慮せずに追加された新しい固定バーなど。これらのバグはデスクトップだけでテストしていればほぼ見えず、誰か——実際のユーザー、または自動化——がまさにモバイルサイズで開いたときにだけ表面化します。"),
      DEF("Breakpoint", "một mốc chiều rộng màn hình mà tại đó CSS đổi cách bố trí giao diện (ví dụ dưới 768px chuyển sang bố cục 1 cột).",
        "a screen-width threshold at which CSS switches how the UI is laid out (e.g. below 768px it switches to a 1-column layout).",
        "CSSがUIのレイアウトを切り替える画面幅のしきい値（例：768px未満で1列レイアウトに切り替わる）。"),
    ] },
  { heading: { vi: "3. Kiểm thử responsive & giả lập thiết bị là gì, nguyên tắc cốt lõi", en: "3. What responsive testing & device emulation are, and the core principle", ja: "3. レスポンシブテスト・端末エミュレーションとは何か、その核心原則" },
    blocks: [
      P("Nguyên tắc cốt lõi rất đơn giản: thay vì chạy test 1 lần ở 1 kích thước, bạn chạy CÙNG một kịch bản test ở NHIỀU kích thước màn hình khác nhau — điện thoại nhỏ, điện thoại lớn, máy tính bảng, desktop — rồi kiểm tra xem giao diện có đúng ở từng nơi hay không. Playwright hỗ trợ điều này qua 2 cơ chế bổ trợ nhau: devices có sẵn (mô phỏng đúng một thiết bị thật, gồm cả user-agent và khả năng cảm ứng) và viewport tuỳ chỉnh (chỉ đổi kích thước màn hình, linh hoạt cho việc thử nhiều mức breakpoint).",
        "The core principle is simple: instead of running a test once at one size, you run the SAME test script at MANY different screen sizes — small phone, large phone, tablet, desktop — and check whether the UI is correct at each one. Playwright supports this through two complementary mechanisms: built-in devices (accurately emulating a real device, including user-agent and touch capability) and custom viewports (only changing screen size, flexible for trying many breakpoints).",
        "核心原則はシンプルです：1つのサイズで1回テストを実行するのではなく、同じテストスクリプトを小型スマホ、大型スマホ、タブレット、デスクトップなど複数の異なる画面サイズで実行し、それぞれでUIが正しいか確認します。Playwrightはこれを補完し合う2つの仕組みでサポートします：組み込みdevices（ユーザーエージェントやタッチ対応も含め実機を正確にエミュレート）とカスタムviewport（画面サイズのみを変更し、複数のブレークポイントを試すのに柔軟）です。"),
      IMG(m_compare, "So sánh render cùng 1 màn hình giỏ hàng ShopEasy ở Mobile 390px và Desktop 1280px", "Comparing the same ShopEasy cart screen rendered at Mobile 390px versus Desktop 1280px", "同じShopEasyのカート画面をMobile 390pxとDesktop 1280pxでレンダリング比較"),
      P("Nói cách khác, đây không phải là kiểm thử một tính năng mới — mà là kiểm thử LẠI cùng một tính năng đã đúng ở desktop, dưới một 'điều kiện' khác: kích thước màn hình khác, có thể kèm khả năng chạm thay vì chuột. Ai muốn học automation bài bản, không chỉ đọc lý thuyết mà thực hành trên dự án thật cùng mentor, có thể tham khảo khoá học tại https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ — nơi các chủ đề như responsive testing được dạy song song với automation nền tảng.",
        "In other words, this isn't testing a new feature — it's RE-testing the same feature that already works on desktop, under a different 'condition': a different screen size, possibly with touch instead of a mouse. If you want to learn automation properly, not just theory but hands-on practice on real projects with a mentor, check out the course at https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ — where topics like responsive testing are taught alongside automation fundamentals.",
        "つまりこれは新機能のテストではなく、既にデスクトップで正しく動いている同じ機能を、異なる『条件』——異なる画面サイズ、場合によってはマウスの代わりにタッチ——で再テストすることです。理論だけでなくメンターと共に実際のプロジェクトで実践しながら自動化を体系的に学びたいなら、レスポンシブテストのようなトピックが自動化の基礎と並行して教えられる https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のコースを参考にしてください。"),
      TIP("Đừng chỉ test đúng 1 kích thước mobile. Chọn ít nhất 1 điện thoại nhỏ, 1 điện thoại lớn, 1 máy tính bảng và 1 desktop — vì lỗi layout thường chỉ lộ ở đúng vài mốc kích thước hẹp gần breakpoint.", "Don't test just one mobile size. Pick at least one small phone, one large phone, one tablet, and one desktop — layout bugs often only surface at a few narrow size ranges near a breakpoint.", "モバイルは1サイズだけでテストしないこと。最低でも小型スマホ、大型スマホ、タブレット、デスクトップを1つずつ選ぼう——レイアウトのバグはブレークポイント付近の狭いサイズ範囲でしか現れないことが多いです。"),
    ] },
  { heading: { vi: "4. Playwright devices: iPhone 13, Pixel 5 & cấu hình dự án", en: "4. Playwright devices: iPhone 13, Pixel 5 & project configuration", ja: "4. Playwright devices：iPhone 13、Pixel 5とプロジェクト設定" },
    blocks: [
      P("Playwright đóng gói sẵn hàng chục thiết bị phổ biến trong đối tượng devices, mỗi thiết bị là 1 object gồm viewport, userAgent, deviceScaleFactor, isMobile, hasTouch... Cách dùng gọn nhất trong dự án thật là khai báo mỗi thiết bị thành 1 'project' riêng trong playwright.config.js — khi đó Playwright sẽ tự chạy TOÀN BỘ bộ test lần lượt (hoặc song song) trên từng project, không cần sửa gì trong file test.",
        "Playwright bundles dozens of popular devices in the devices object, each device being an object with viewport, userAgent, deviceScaleFactor, isMobile, hasTouch... The cleanest way to use this in a real project is to declare each device as its own 'project' in playwright.config.js — then Playwright automatically runs the ENTIRE test suite in sequence (or in parallel) across each project, with no change needed in the test files.",
        "Playwrightはdevicesオブジェクトに人気の端末を数十種類あらかじめ用意しており、各端末はviewport、userAgent、deviceScaleFactor、isMobile、hasTouchなどを含むオブジェクトです。実際のプロジェクトで最もすっきり使う方法は、playwright.config.jsで各端末を独自の『project』として宣言することです——そうすればPlaywrightはテストファイルを何も変更せずに、各projectでテストスイート全体を順番に（または並列に）自動実行します。"),
      IMG(m_config, "Cấu hình nhiều 'projects' mô phỏng iPhone 13, Pixel 5, iPad Mini và desktop trong cùng 1 file config", "Multiple 'projects' configured to emulate iPhone 13, Pixel 5, iPad Mini, and desktop in one config file", "iPhone 13、Pixel 5、iPad Mini、デスクトップをエミュレートする複数の'projects'を1つの設定ファイルで構成"),
      CODE("javascript", "// playwright.config.js\nconst { defineConfig, devices } = require('@playwright/test');\n\nmodule.exports = defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  projects: [\n    {\n      name: 'mobile-iphone',\n      use: { ...devices['iPhone 13'] },\n    },\n    {\n      name: 'mobile-pixel',\n      use: { ...devices['Pixel 5'] },\n    },\n    {\n      name: 'tablet-ipad',\n      use: { ...devices['iPad Mini'] },\n    },\n    {\n      name: 'desktop-chrome',\n      use: { viewport: { width: 1280, height: 800 } },\n    },\n  ],\n});"),
      TIP("Khi chọn thiết bị để đưa vào devices preset, ưu tiên theo dữ liệu thật (Google Analytics, số liệu truy cập) của sản phẩm — đừng chỉ chọn iPhone mới nhất vì đó là máy bạn đang dùng.", "When choosing which devices to include as presets, prioritize your product's real analytics data — don't just pick the latest iPhone because it's the phone you personally use.", "devicesプリセットに含める端末を選ぶ際は、プロダクトの実際のアクセス解析データを優先しよう——自分が使っているからという理由だけで最新のiPhoneを選ばないこと。"),
    ] },
  { heading: { vi: "5. Viết test đầu tiên với devices['iPhone 13'] (thực hành)", en: "5. Writing your first test with devices['iPhone 13'] (hands-on)", ja: "5. devices['iPhone 13']で最初のテストを書く（実習）" },
    blocks: [
      P("Giờ ta viết 1 test cụ thể cho trang sản phẩm ShopEasy, mô phỏng đúng iPhone 13, và kiểm tra nút 'Thêm vào giỏ hàng' vừa hiển thị đầy đủ vừa đủ kích thước để ngón tay bấm chính xác.",
        "Now let's write a specific test for ShopEasy's product page, accurately emulating an iPhone 13, and check that the 'Add to cart' button is both fully visible and large enough for an accurate finger tap.",
        "では、ShopEasyの商品ページ用に具体的なテストを書き、iPhone 13を正確にエミュレートして、『カートに追加』ボタンが完全に表示され、指で正確にタップできる十分な大きさかを確認しましょう。"),
      STEP(1, "Import devices cùng test/expect từ @playwright/test.", "Import devices alongside test/expect from @playwright/test.", "@playwright/testからtest/expectと一緒にdevicesをインポートする。"),
      STEP(2, "Gọi test.use({ ...devices['iPhone 13'] }) ở đầu file để mọi test trong file này chạy đúng kích thước, user-agent, tỉ lệ pixel của iPhone 13.", "Call test.use({ ...devices['iPhone 13'] }) at the top of the file so every test in it runs with iPhone 13's exact size, user-agent, and pixel ratio.", "ファイル冒頭でtest.use({ ...devices['iPhone 13'] })を呼び、そのファイル内の全テストがiPhone 13の正確なサイズ、ユーザーエージェント、ピクセル比で実行されるようにする。"),
      STEP(3, "Dùng boundingBox() lấy kích thước thật của nút trên màn hình, rồi assert chiều rộng/chiều cao đều lớn hơn 44px — ngưỡng vùng chạm tối thiểu phổ biến.", "Use boundingBox() to get the button's real on-screen size, then assert both width and height are greater than 44px — the common minimum touch-target threshold.", "boundingBox()でボタンの実際の画面上のサイズを取得し、幅と高さの両方が44pxより大きいことをassertする——一般的な最小タップ領域のしきい値です。"),
      CODE("javascript", "// tests/mobile-product.spec.js\nconst { test, expect, devices } = require('@playwright/test');\n\ntest.use({ ...devices['iPhone 13'] });\n\ntest('trang san pham hien thi dung tren iPhone 13', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/san-pham/ao-thun-basic');\n\n  const addToCartBtn = page.locator('#btn-add-to-cart');\n  await expect(addToCartBtn).toBeVisible();\n\n  const box = await addToCartBtn.boundingBox();\n  expect(box.width).toBeGreaterThan(44);\n  expect(box.height).toBeGreaterThan(44);\n\n  // Menu di dong khong duoc de len nut Them vao gio\n  const menuBox = await page.locator('#mobile-sticky-menu').boundingBox();\n  expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(box.y);\n});"),
      TRY("Sửa test trên để chạy thêm với devices['Pixel 5'] bằng cách tạo 1 file test.use() khác, hoặc thêm project 'mobile-pixel' vào config rồi chạy lại đúng file test này trên cả 2 project.", "Modify the test above to also run with devices['Pixel 5'], either by creating a separate test.use() file, or by adding a 'mobile-pixel' project to the config and re-running this same test file on both projects.", "上のテストをdevices['Pixel 5']でも実行できるように修正してみよう。別のtest.use()ファイルを作るか、設定に'mobile-pixel'プロジェクトを追加して、同じテストファイルを両方のプロジェクトで実行しよう。"),
    ] },
  { heading: { vi: "6. Viewport tuỳ chỉnh & so sánh layout mobile vs desktop (thực hành)", en: "6. Custom viewport & comparing mobile vs desktop layout (hands-on)", ja: "6. カスタムviewportとモバイル・デスクトップのレイアウト比較（実習）" },
    blocks: [
      P("Không phải lúc nào bạn cũng cần mô phỏng đúng 1 thiết bị cụ thể. Đôi khi bạn chỉ cần trả lời: 'ở chiều rộng X pixel, nút Thanh toán có còn hiển thị đúng không?' — đây là lúc viewport tuỳ chỉnh phát huy tác dụng, vì bạn có thể thử rất nhiều mức kích thước liền nhau mà không cần tạo project riêng cho từng mức.",
        "You won't always need to accurately emulate one specific device. Sometimes you just need to answer: 'at X pixels wide, does the Checkout button still display correctly?' — this is where a custom viewport shines, since you can try many consecutive size levels without creating a separate project for each.",
        "常に特定の端末を正確にエミュレートする必要があるわけではありません。時には『幅Xピクセルで、チェックアウトボタンはまだ正しく表示されるか？』に答えるだけでよいことがあります——これがカスタムviewportの真価です。各サイズごとに専用のprojectを作らなくても、連続する多くのサイズレベルを試せます。"),
      STEP(1, "Liệt kê danh sách kích thước cần thử dưới dạng mảng {name, width, height} thay vì hard-code từng test riêng.", "List the sizes you want to try as an array of {name, width, height} objects instead of hard-coding each test separately.", "各テストを個別にハードコードする代わりに、試したいサイズを{name, width, height}の配列として列挙する。"),
      STEP(2, "Dùng page.setViewportSize({width, height}) ngay trong test để đổi kích thước màn hình động, không cần tạo project mới.", "Call page.setViewportSize({width, height}) right inside the test to change the screen size dynamically, without creating a new project.", "新しいprojectを作らずに、テスト内で直接page.setViewportSize({width, height})を呼んで画面サイズを動的に変更する。"),
      STEP(3, "Lặp qua mảng kích thước bằng vòng for, mỗi vòng gọi 1 test() riêng — Playwright sẽ hiện rõ tên từng kích thước trong báo cáo kết quả.", "Loop through the size array with a for loop, calling a separate test() each time — Playwright will clearly show each size's name in the results report.", "forループでサイズ配列を回し、毎回別々のtest()を呼ぶ——Playwrightは結果レポートで各サイズの名前を明確に表示する。"),
      CODE("javascript", "// tests/viewport-compare.spec.js\nconst { test, expect } = require('@playwright/test');\n\nconst sizes = [\n  { name: 'mobile-nho', width: 360, height: 780 },\n  { name: 'mobile-lon', width: 414, height: 896 },\n  { name: 'tablet', width: 768, height: 1024 },\n  { name: 'desktop', width: 1280, height: 800 },\n];\n\nfor (const size of sizes) {\n  test(`gio hang hien thi dung o kich thuoc ${size.name}`, async ({ page }) => {\n    await page.setViewportSize({ width: size.width, height: size.height });\n    await page.goto('https://shopeasy.vn/gio-hang');\n\n    const checkoutBtn = page.locator('#btn-checkout');\n    await expect(checkoutBtn).toBeVisible();\n\n    const box = await checkoutBtn.boundingBox();\n    expect(box.x + box.width).toBeLessThanOrEqual(size.width);\n  });\n}"),
      P("Chú ý dòng assert cuối: box.x + box.width phải nhỏ hơn hoặc bằng chiều rộng màn hình — đây là cách phát hiện lỗi 'tràn ngang' (horizontal overflow), một trong những lỗi responsive phổ biến nhất, khi một phần tử rộng hơn màn hình khiến người dùng phải cuộn ngang khó chịu.",
        "Notice the final assertion: box.x + box.width must be less than or equal to the screen width — this is how you detect 'horizontal overflow', one of the most common responsive bugs, where an element wider than the screen forces users into an annoying horizontal scroll.",
        "最後のアサーションに注目してください：box.x + box.widthは画面幅以下でなければなりません——これは『横方向のはみ出し（horizontal overflow）』を検出する方法で、要素が画面より広くなり、ユーザーに不快な横スクロールを強いる、最も一般的なレスポンシブバグの1つです。"),
    ] },
  { heading: { vi: "7. Giả lập chạm & cuộn (touch/scroll) trên mobile (thực hành)", en: "7. Emulating tap & scroll on mobile (hands-on)", ja: "7. モバイルでのタップ・スクロールのエミュレーション（実習）" },
    blocks: [
      P("Trên desktop, bạn dùng click(); nhưng trên thiết bị cảm ứng, hành vi thật của người dùng là chạm ngón tay, và nhiều trang còn tải thêm nội dung khi cuộn xuống (lazy load). Playwright cung cấp tap() và các cách mô phỏng cuộn để bài test phản ánh đúng hành vi mobile thay vì giả định hành vi desktop.",
        "On desktop you use click(); but on a touch device, the user's real behavior is a finger tap, and many pages also lazy-load more content as you scroll down. Playwright provides tap() and ways to emulate scrolling so your test reflects real mobile behavior instead of assuming desktop behavior.",
        "デスクトップではclick()を使いますが、タッチ端末での実際のユーザーの動作は指のタップであり、多くのページは下にスクロールするとさらにコンテンツを遅延読み込み（lazy load）します。Playwrightはtap()とスクロールをエミュレートする方法を提供し、テストがデスクトップの動作を前提とせず、実際のモバイルの動作を反映するようにします。"),
      STEP(1, "Dùng page.locator(...).tap() thay vì .click() khi muốn mô phỏng đúng thao tác chạm ngón tay — cần hasTouch bật (đã có sẵn trong hầu hết devices preset mobile).", "Use page.locator(...).tap() instead of .click() when you want to accurately emulate a finger tap — this requires hasTouch to be enabled (already on in most mobile devices presets).", "指のタップを正しく再現したいときはpage.locator(...).click()の代わりに.tap()を使う——hasTouchの有効化が必要（ほとんどのモバイルdevicesプリセットで既定で有効）。"),
      STEP(2, "Dùng page.mouse.wheel(deltaX, deltaY) để mô phỏng cuộn trang, phù hợp khi cần kiểm tra nội dung tải thêm (lazy load) khi cuộn xuống.", "Use page.mouse.wheel(deltaX, deltaY) to emulate scrolling, useful when you need to check content that lazy-loads as you scroll down.", "page.mouse.wheel(deltaX, deltaY)でスクロールをエミュレートする。下にスクロールしたときに遅延読み込みされるコンテンツを確認したいときに便利。"),
      STEP(3, "Sau khi cuộn, dùng toBeVisible() để xác nhận phần tử mong đợi (ví dụ sản phẩm thứ 11 trong danh sách) thực sự đã xuất hiện trên màn hình.", "After scrolling, use toBeVisible() to confirm the expected element (e.g. the 11th product in the list) has actually appeared on screen.", "スクロール後、期待する要素（例：リスト内の11番目の商品）が実際に画面に表示されたことをtoBeVisible()で確認する。"),
      CODE("javascript", "// tests/mobile-scroll.spec.js\nconst { test, expect, devices } = require('@playwright/test');\n\ntest.use({ ...devices['Pixel 5'] });\n\ntest('cham va cuon danh sach san pham tren Pixel 5', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/danh-muc/ao-thun');\n\n  // Cham vao san pham dau tien (thao tac ngon tay thuc su)\n  await page.locator('.product-card').first().tap();\n  await expect(page).toHaveURL(/.*\\/san-pham\\//);\n  await page.goBack();\n\n  // Cuon xuong de kich hoat lazy-load\n  await page.mouse.wheel(0, 1200);\n  await expect(page.locator('.product-card').nth(10)).toBeVisible();\n});"),
      TIP("Muốn nắm trọn bộ automation từ cơ bản tới các kỹ thuật mobile/responsive nâng cao theo tốc độ riêng của bạn, có mentor kèm sát, có thể tìm hiểu hình thức học 1-1 tại " + course1v1Url + ".", "If you want to master automation from the basics to advanced mobile/responsive techniques at your own pace, with close mentoring, check out 1-on-1 training at " + course1v1Url + ".", "基礎から高度なモバイル・レスポンシブ技術まで、自分のペースで、密接な指導を受けながら自動化を習得したいなら、" + course1v1Url + " での1対1トレーニングを確認してみよう。"),
    ] },
  { heading: { vi: "8. Tình huống 1: menu di động che nút Thêm vào giỏ trên iPhone", en: "8. Situation 1: the mobile menu covers the Add-to-cart button on iPhone", ja: "8. シーン1：iPhoneでモバイルメニューがカート追加ボタンを覆う" },
    blocks: [
      SITUATION("Đội automation ShopEasy chỉ chạy bộ test trên project 'desktop-chrome' viewport 1280x800 trong CI, chưa từng thêm project mô phỏng thiết bị di động nào.", "ShopEasy's automation team only runs the test suite on the 'desktop-chrome' project (1280x800 viewport) in CI, and has never added any mobile device project.",
        "Một bản cập nhật giao diện thêm menu di động dạng sticky ở đáy màn hình trên mobile để tiện điều hướng. Vì test chỉ chạy ở desktop, nơi menu này không hiện, CI vẫn báo XANH bình thường. Vài ngày sau, bộ phận chăm sóc khách hàng nhận được nhiều phản ánh 'không bấm được nút Thêm vào giỏ trên iPhone' — lỗi đã tồn tại trên production nhiều ngày trước khi bị phát hiện.",
        "A UI update adds a sticky mobile menu at the bottom of the screen for easier navigation on mobile. Since tests only run on desktop, where this menu doesn't appear, CI keeps reporting GREEN as usual. A few days later, customer support receives many complaints about 'can't tap the Add to cart button on iPhone' — the bug had been live in production for days before anyone noticed.",
        "ShopEasyの自動化チームはCIで'desktop-chrome'プロジェクト（1280x800のviewport）でのみテストスイートを実行しており、モバイル端末をエミュレートするprojectを一度も追加していない。",
        "UI更新で、モバイルでのナビゲーションを容易にするため画面下部に固定モバイルメニューが追加される。テストはこのメニューが表示されないデスクトップでしか実行されないため、CIは通常通りGREENと報告し続ける。数日後、カスタマーサポートに『iPhoneでカートに追加ボタンがタップできない』という苦情が多数寄せられる——誰かが気づく前に、バグは本番環境で数日間放置されていた。"),
      SOLVE("Thêm project 'mobile-iphone' dùng devices['iPhone 13'] vào playwright.config.js, và viết test kiểm tra boundingBox() của nút Thêm vào giỏ không bị phần tử nào khác (như menu sticky) đè lên. Chạy project này trong CI song song với desktop-chrome, để bất kỳ thay đổi giao diện nào ảnh hưởng tới mobile cũng bị chặn ngay ở pull request, không cần đợi khách hàng phản ánh.", "Add a 'mobile-iphone' project using devices['iPhone 13'] to playwright.config.js, and write a test checking that the Add-to-cart button's boundingBox() isn't covered by any other element (like the sticky menu). Run this project in CI alongside desktop-chrome, so any UI change affecting mobile gets caught right at the pull request, instead of waiting for customer complaints.", "playwright.config.jsにdevices['iPhone 13']を使う'mobile-iphone'プロジェクトを追加し、カート追加ボタンのboundingBox()が他の要素（固定メニューなど）に覆われていないことを確認するテストを書く。このプロジェクトをdesktop-chromeと並行してCIで実行し、モバイルに影響するUI変更が顧客からの苦情を待たずにプルリクエストの段階で即座に検出されるようにする。"),
      P("Bài học ở đây rất rõ: bộ test 'xanh 100%' không có nghĩa là ứng dụng ổn ở mọi nơi — nó chỉ có nghĩa là ứng dụng ổn ở NHỮNG GÌ bộ test đó thực sự kiểm tra. Nếu quy trình CI chưa từng chạy trên kích thước mobile, một lỗi hiển thị nghiêm trọng trên mobile hoàn toàn có thể lọt qua mà không ai hay biết cho tới khi khách hàng gặp phải.",
        "The lesson here is clear: a '100% green' test suite doesn't mean the app is fine everywhere — it only means the app is fine at WHATEVER that suite actually checks. If the CI pipeline has never run at a mobile size, a serious mobile display bug can slip through completely unnoticed until customers hit it.",
        "ここでの教訓は明確です：『100%グリーン』のテストスイートは、アプリがあらゆる場所で問題ないことを意味するのではなく、そのスイートが実際に確認している範囲で問題がないことを意味するだけです。CIパイプラインがモバイルサイズで一度も実行されたことがなければ、深刻なモバイル表示バグが誰にも気づかれずすり抜けてしまう可能性は十分にあります。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố menu di động che nút Thêm vào giỏ, khi CI chưa kiểm thử ở kích thước mobile", "A bug ticket recording the mobile-menu-covers-button incident, from when CI hadn't tested at mobile size", "CIがモバイルサイズでテストしていなかったときの、モバイルメニューがボタンを覆うインシデントを記録したバグチケット"),
      RECAP(["CI 'xanh' chỉ đảm bảo đúng những gì được test, không đảm bảo mọi kích thước màn hình", "Thêm project mobile vào CI biến lỗi 'khách hàng phát hiện' thành lỗi 'chặn ngay ở pull request'"],
        ["A 'green' CI only guarantees what was actually tested, not every screen size", "Adding a mobile project to CI turns a 'customer-discovered' bug into one 'blocked right at the pull request'"],
        ["『グリーン』のCIは実際にテストされた範囲を保証するだけで、あらゆる画面サイズを保証しない", "CIにモバイルプロジェクトを追加すれば、『顧客が発見する』バグを『プルリクエストで即座に阻止される』バグに変えられる"]),
    ] },
  { heading: { vi: "9. Tình huống 2: bảng giá tràn ngang ở viewport nhỏ", en: "9. Situation 2: the price table overflows horizontally at a small viewport", ja: "9. シーン2：小さいviewportで価格表が横にはみ出す" },
    blocks: [
      SITUATION("Đội thiết kế thêm bảng so sánh giá gói vận chuyển (Tiêu chuẩn/Nhanh/Hoả tốc) gồm 4 cột trên trang giỏ hàng ShopEasy, hiển thị tốt trên mọi màn hình họ tự kiểm tra bằng laptop cá nhân.", "The design team adds a 4-column shipping-tier price comparison table (Standard/Fast/Express) to ShopEasy's cart page, displaying fine on every screen they check with their personal laptops.",
        "Một tester chạy thử bộ test viewport tuỳ chỉnh ở kích thước 360px (điện thoại phổ thông, khá phổ biến ở một số thị trường), và assertion 'box.x + box.width phải nhỏ hơn hoặc bằng chiều rộng màn hình' báo lỗi: bảng giá rộng hơn màn hình gần 80px, buộc người dùng phải cuộn ngang mới thấy hết cột giá cuối cùng — một trải nghiệm khó chịu và dễ khiến khách bỏ giỏ hàng.",
        "A tester runs the custom-viewport test suite at 360px (a common budget-phone width in some markets), and the assertion 'box.x + box.width must be less than or equal to screen width' fails: the price table is nearly 80px wider than the screen, forcing users to scroll horizontally just to see the last price column — a jarring experience likely to cause cart abandonment.",
        "デザインチームは、ShopEasyのカートページに配送プラン比較表（標準・速達・特急の4列）を追加し、自分たちの個人用ノートパソコンで確認したすべての画面で正しく表示されている。",
        "テスターがカスタムviewportのテストスイートを360px（一部市場でよくある廉価スマホの幅）で実行すると、『box.x + box.widthは画面幅以下でなければならない』というアサーションが失敗する：価格表が画面よりほぼ80px広く、ユーザーは最後の価格列を見るためだけに横スクロールを強いられる——不快な体験でカート放棄につながりやすい。"),
      SOLVE("Yêu cầu đội thiết kế/frontend chuyển bảng 4 cột sang dạng xếp chồng (mỗi gói vận chuyển 1 khối, xếp dọc) khi màn hình dưới một breakpoint nhất định, thay vì giữ nguyên 4 cột và để trình duyệt tự thu nhỏ chữ. Sau khi sửa, chạy lại đúng bộ test viewport tuỳ chỉnh ở cả 360px, 414px, 768px, 1280px để xác nhận không còn tràn ngang ở bất kỳ mức nào.", "Ask the design/frontend team to switch the 4-column table into a stacked layout (each shipping tier as its own vertical block) below a certain breakpoint, instead of keeping 4 columns and letting the browser shrink the text. After the fix, rerun the same custom-viewport test suite at 360px, 414px, 768px, and 1280px to confirm there's no more horizontal overflow at any level.", "デザイン・フロントエンドチームに、4列のまま文字をブラウザに自動縮小させるのではなく、一定のブレークポイント以下では4列表を積み重ね型レイアウト（各配送プランを1つの縦ブロックにする）に切り替えるよう依頼する。修正後、同じカスタムviewportテストスイートを360px、414px、768px、1280pxで再実行し、どのレベルでも横はみ出しがなくなったことを確認する。"),
      P("Điều đáng chú ý là lỗi này KHÔNG xuất hiện ở bất kỳ kích thước nào mà đội thiết kế tự kiểm tra — vì laptop cá nhân của họ luôn rộng hơn 360px rất nhiều. Đây chính là lý do vì sao bộ test tự động cần bao phủ cả những mức kích thước 'nhỏ nhất' trong danh sách thiết bị mục tiêu, chứ không chỉ những gì tiện cho người kiểm tra thủ công.",
        "Notably, this bug never appeared at any size the design team checked themselves — because their personal laptops were always far wider than 360px. This is exactly why an automated suite needs to cover the 'smallest' sizes on the target device list too, not just whatever's convenient for manual checking.",
        "注目すべきは、このバグがデザインチームが自分で確認したどのサイズでも一度も現れなかったことです——彼らの個人用ノートパソコンは常に360pxよりはるかに広かったからです。これこそ、自動化スイートが手動確認にとって都合の良いサイズだけでなく、対象端末リストの『最小』サイズもカバーする必要がある理由です。"),
      IMG(m_kanban, "Bảng theo dõi lỗi responsive/mobile của ShopEasy, từ phát hiện tới xử lý", "A board tracking ShopEasy's responsive/mobile bugs, from discovery to resolution", "発見から対応までを追跡するShopEasyのレスポンシブ・モバイルバグ管理ボード"),
      TRY("Nhìn lại mảng sizes trong code chương 6, thêm 1 kích thước 320px (điện thoại rất nhỏ, vẫn còn dùng ở một số thị trường) và dự đoán xem những phần tử nào của trang giỏ hàng có khả năng tràn ngang nhất ở mức này.", "Look back at the sizes array from chapter 6's code, add a 320px size (a very small phone, still used in some markets), and predict which elements on the cart page are most likely to overflow horizontally at that size.", "第6章のコードのsizes配列を振り返り、320px（非常に小さいスマホ、一部市場でまだ使われている）のサイズを追加し、そのサイズでカートページのどの要素が最も横にはみ出しやすいか予測してみよう。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Chỉ test trên 1 kích thước màn hình duy nhất (thường là màn desktop quen thuộc của người viết test) rồi cho rằng ứng dụng đã 'responsive'. Một kích thước không đại diện cho toàn bộ phổ thiết bị mà khách hàng thật đang dùng.", "Only testing at a single screen size (usually the tester's familiar desktop) and assuming the app is 'responsive'. One size doesn't represent the whole range of devices real customers actually use.", "1つの画面サイズ（多くの場合テスト作成者が慣れたデスクトップ）だけでテストし、アプリが『レスポンシブ』だと思い込むこと。1つのサイズは、実際の顧客が使う端末の幅広い範囲を代表しません。"),
      PITFALL("Dùng devices preset mobile nhưng viết test theo hành vi desktop (như hover chuột) — trên thiết bị cảm ứng thật, hover gần như không tồn tại theo cách đó, khiến test không phản ánh đúng trải nghiệm người dùng.", "Using a mobile devices preset but writing tests with desktop behavior (like mouse hover) — on a real touch device, hover barely exists that way, so the test doesn't reflect the actual user experience.", "モバイルのdevicesプリセットを使いながら、デスクトップの動作（マウスホバーなど）でテストを書くこと——実際のタッチ端末ではホバーはそのような形でほぼ存在せず、テストが実際のユーザー体験を反映しなくなる。"),
      TIP("Khi thêm 1 breakpoint mới vào CSS của dự án, thêm luôn 1 dòng vào bảng/mảng kích thước cần test — giữ danh sách test đồng bộ với danh sách breakpoint thực tế, tránh 'test một đằng, CSS đổi một nẻo'.", "When adding a new breakpoint to your project's CSS, also add a line to your test size table/array — keep the test list in sync with the real breakpoint list, avoiding a mismatch between what's tested and what CSS actually changes at.", "プロジェクトのCSSに新しいブレークポイントを追加するときは、テストサイズの表/配列にも1行追加しよう——テストリストを実際のブレークポイントリストと同期させ、『テストは片方、CSSはもう片方』というズレを防ぐ。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test tương thích & responsive cho người mới", "Compatibility & responsive testing for beginners", "test-tuong-thich-responsive-cho-nguoi-moi", "初心者のための互換性・レスポンシブテスト"),
      INTERNAL("Kiểm thử đa trình duyệt (cross-browser) cho người mới", "Cross-browser testing for beginners", "kiem-thu-da-trinh-duyet-cross-browser-cho-nguoi-moi", "初心者のためのクロスブラウザテスト"),
      INTERNAL("Kiểm thử ứng dụng di động nâng cao cho Tester", "Advanced mobile app testing for testers", "kiem-thu-ung-dung-di-dong-nang-cao-cho-tester", "テスターのための高度なモバイルアプリテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học tự động kiểm thử responsive & giả lập thiết bị di động qua bản mobile của ShopEasy: vì sao web chạy tốt trên desktop vẫn có thể vỡ trên mobile, cách dùng devices['iPhone 13']/devices['Pixel 5'] và viewport tuỳ chỉnh, cách mô phỏng chạm/cuộn, cùng cấu hình nhiều 'projects' để CI tự chạy song song trên nhiều thiết bị. Hai tình huống thật cho thấy chi phí của việc chỉ test 1 kích thước (lỗi lọt ra production) so với việc bao phủ đủ các mức kích thước mục tiêu (lỗi bị chặn ngay ở pull request). Đây là kỹ năng nền tảng giúp bộ test automation của bạn phản ánh đúng trải nghiệm của phần lớn khách hàng thật — những người mở web bằng điện thoại.",
        "You just learned automated responsive testing and mobile device emulation through ShopEasy's mobile screens: why an app that works on desktop can still break on mobile, how to use devices['iPhone 13']/devices['Pixel 5'] and custom viewports, how to emulate tap/scroll, and how to configure multiple 'projects' so CI runs across devices in parallel automatically. Two real situations showed the cost of testing only one size (a bug reaching production) versus covering enough target sizes (a bug blocked right at the pull request). This is a foundational skill that makes your automation suite reflect the real experience of most customers — the ones opening the web on a phone.",
        "ShopEasyのモバイル画面を通じて、自動レスポンシブテストとモバイル端末エミュレーションを学びました：デスクトップで動くアプリがなぜモバイルで崩れうるか、devices['iPhone 13']/devices['Pixel 5']とカスタムviewportの使い方、タップ・スクロールのエミュレーション方法、そしてCIが複数端末を自動的に並列実行できるよう複数の'projects'を設定する方法。2つの実例は、1サイズだけテストするコスト（バグが本番環境に到達する）と、対象サイズを十分にカバーするコスト（バグがプルリクエストで即座に阻止される）の違いを示しました。これは、自動化スイートがスマートフォンでウェブを開く大多数の実際の顧客の体験を正しく反映するための土台スキルです。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về visual regression testing (so sánh ảnh chụp giao diện qua các lần chạy để phát hiện lệch layout tinh vi) và cách tổ chức CI matrix để mỗi thiết bị/trình duyệt chạy song song trên hạ tầng riêng. AI có thể giúp bạn tổng hợp nhanh kiến thức nền, nhưng để thành thạo thật sự — đọc đúng lỗi responsive, chọn đúng breakpoint cần test, xử lý flaky test khi mô phỏng cảm ứng — bạn cần thực hành trên dự án thật với người hướng dẫn. Một khoá học Tester bài bản từ zero tới đi làm như https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, có mentor kèm sát và dự án automation thực chiến, sẽ giúp bạn tự tin ứng tuyển vị trí Automation Tester; nếu cần lộ trình riêng theo tốc độ của bạn, có thể chọn thêm hình thức học 1-1 tại " + course1v1Url + ".",
        "Next, you should look into visual regression testing (comparing UI screenshots across runs to catch subtle layout drift) and organizing a CI matrix so each device/browser runs in parallel on its own infrastructure. AI can quickly help you piece together foundational knowledge, but to truly master it — reading responsive bugs correctly, choosing the right breakpoints to test, handling flaky tests when emulating touch — you need hands-on practice on a real project with a mentor. A proper Tester course from zero to hired, like https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, with close mentoring and real automation projects, helps you confidently apply for an Automation Tester role; if you want a pace tailored to you, 1-on-1 training at " + course1v1Url + " is also available.",
        "次は、ビジュアル回帰テスト（実行のたびにUIスクリーンショットを比較し、微妙なレイアウトのずれを検出する）と、各端末・ブラウザが独自のインフラで並列実行されるCIマトリクスの構成についてさらに学ぶとよいでしょう。AIは基礎知識を素早くまとめる手助けができますが、本当に習得する——レスポンシブのバグを正しく読み解き、テストすべき正しいブレークポイントを選び、タッチエミュレーション時のflakyテストに対処する——には、メンターと共に実際のプロジェクトで実践する必要があります。https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のようなゼロから就職までの体系的なテスターコースは、密接なメンタリングと実際の自動化プロジェクトを提供し、Automation Testerポジションへの自信ある応募を助けます。自分のペースに合わせたい場合は、" + course1v1Url + " での1対1トレーニングも選べます。"),
      CTA(course),
    ] },
];

const MOBILE_01 = makeDoc({
  slug: "tu-dong-kiem-thu-responsive-mobile-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "tự động kiểm thử mobile",
  keywords: ["tự động kiểm thử mobile", "responsive testing", "playwright devices", "giả lập thiết bị di động", "kiểm thử responsive cho người mới"],
  coverLabel: "NGƯỜI MỚI · MOBILE AUTOMATION · TMĐT",
  crumb: "Tự động kiểm thử responsive & mobile cho người mới",
  metaTitle: { vi: "Tự động kiểm thử mobile & responsive cho người mới", en: "Automated mobile & responsive testing for beginners", ja: "初心者のためのモバイル・レスポンシブ自動テスト" },
  metaDescription: {
    vi: "Tự động kiểm thử mobile & responsive cho người mới: dùng Playwright devices giả lập iPhone, Pixel, đổi viewport, kiểm layout, chạm và cuộn trên ShopEasy.",
    en: "Automated mobile & responsive testing for beginners: using Playwright devices to emulate iPhone, Pixel, change viewport, check layout, tap and scroll on the ShopEasy app, with runnable code and a quiz at the end.",
    ja: "初心者向けモバイル・レスポンシブ自動テスト：Playwrightのdevicesでのモバイル端末エミュレーション、viewport変更、レイアウト確認、ShopEasyアプリでのタップ・スクロール、動くコードと最後にクイズ付きで解説。",
  },
  title: {
    vi: "Tự động kiểm thử responsive & giả lập thiết bị di động cho người mới (có code Playwright chạy được)",
    en: "Automated responsive & mobile device emulation testing for beginners (with runnable Playwright code)",
    ja: "初心者のためのレスポンシブ・モバイル端末エミュレーション自動テスト（動くPlaywrightコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: tự động kiểm thử responsive & giả lập thiết bị di động qua app TMĐT ShopEasy. Dùng Playwright devices['iPhone 13']/devices['Pixel 5'], viewport tuỳ chỉnh, so sánh layout mobile vs desktop, mô phỏng chạm/cuộn, hai tình huống thật (menu che nút bấm, bảng giá tràn ngang), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: automated responsive testing and mobile device emulation through the ShopEasy e-commerce app. Using Playwright devices['iPhone 13']/devices['Pixel 5'], custom viewports, comparing mobile-vs-desktop layout, emulating tap/scroll, two real situations (a menu covering a button, an overflowing price table), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyを通じた自動レスポンシブテストとモバイル端末エミュレーション。Playwrightのdevices['iPhone 13']/devices['Pixel 5']、カスタムviewport、モバイル・デスクトップのレイアウト比較、タップ・スクロールのエミュレーション、2つの実例（メニューがボタンを覆う、価格表がはみ出す）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách áp dụng tự động kiểm thử responsive & mobile", steps: [
    { name: "Chọn danh sách thiết bị/viewport mục tiêu", text: "Chọn theo dữ liệu truy cập thật, gồm cả mobile nhỏ, mobile lớn, tablet, desktop." },
    { name: "Cấu hình devices preset & viewport tuỳ chỉnh", text: "Khai báo project với devices['iPhone 13']/devices['Pixel 5'] cho thiết bị phổ biến, dùng setViewportSize() cho breakpoint tuỳ ý." },
    { name: "Viết assertion kiểm layout & vùng chạm", text: "Kiểm phần tử không bị che, không tràn ngang, vùng chạm đủ tối thiểu 44x44px." },
  ] },
  pages,
});

export const AU_MOBILE_01 = [MOBILE_01];
