// doc_au_locators.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Locator & Selector — cách xác định phần tử trên giao diện để tự động thao tác: id, class,
// CSS selector, XPath, text, role, data-testid; vì sao ưu tiên selector ổn định, tránh selector
// giòn (dễ vỡ); công cụ inspect để tìm phần tử. Practice-first, nhiều MOCKUP giao diện (ui_mock),
// code Playwright chạy được. Gắn app TMĐT ShopEasy (trang đăng nhập). Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình đăng nhập ShopEasy, chú thích nhiều loại locator trên từng phần tử ──
const m_login = browser("shopeasy.vn/dang-nhap", [
  panel("ShopEasy · Đăng nhập", [
    field(24, 20, 660, "Email", "mai.tran@gmail.com", "normal"),
    field(24, 112, 660, "Mật khẩu", "••••••••", "normal"),
    btn(24, 204, 180, "Đăng nhập", "primary"),
    btn(216, 204, 224, "Quên mật khẩu?", "ghost"),
    annotate(20, 10, 668, 72, "id: #email-input"),
    annotate(20, 102, 668, 72, "data-testid: password-input"),
    annotate(20, 196, 188, 50, "role=button, name='Đăng nhập'"),
    annotate(212, 196, 236, 50, "text: 'Quên mật khẩu?'"),
  ].join(""), { h: 280, accent: "#0891b2" }),
].join(""), { h: 336, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: bảng các loại locator & độ bền khi UI thay đổi ──
const m_types = grid("Các loại locator & độ bền khi UI thay đổi", ["Loại locator", "Ví dụ trên ShopEasy", "Độ bền", "Khi nào nên dùng"], [
  ["id", "#email-input", "Khá bền (nếu id cố định, đặt tay)", "FE cam kết giữ id ổn định"],
  ["class CSS", ".btn-primary-a3f9c", "Giòn (đổi khi CSS-in-JS build lại)", "Tạm thời, tránh class tự sinh"],
  ["CSS phức hợp", "div.card > button:nth-child(2)", "Rất giòn (phụ thuộc cấu trúc DOM)", "Bất đắc dĩ, ưu tiên thay thế"],
  ["XPath tuyệt đối", "/html/body/div[2]/div[3]/button", "Cực giòn (vỡ khi thêm/bớt 1 thẻ)", "Tránh dùng, gần như không nên"],
  ["text", "'Đăng nhập'", "Trung bình (đổi khi dịch đa ngôn ngữ)", "Nội dung ít đổi, 1 ngôn ngữ"],
  ["role (accessibility)", "role=button, name='Đăng nhập'", "Bền (gắn trải nghiệm người dùng)", "Ưu tiên phần tử tương tác chuẩn ARIA"],
  ["data-testid", "data-testid='btn-login'", "Rất bền (chỉ phục vụ test)", "Ưu tiên hàng đầu khi có sẵn"],
], { accent: "#0891b2", note: "Độ bền tăng dần khi locator gắn với Ý NGHĨA (role, data-testid) thay vì HÌNH DẠNG hiện tại của trang (class tự sinh, vị trí, XPath tuyệt đối)." });

// ── Mockup 3: bảng selector giòn vs ổn định cho cùng phần tử ShopEasy ──
const m_fragile = grid("Selector giòn vs ổn định — cùng 1 phần tử trên ShopEasy", ["Phần tử", "Selector giòn (dễ vỡ)", "Selector ổn định"], [
  ["Nút Đăng nhập", "css: .css-a8f3k2 (class tự sinh)", "data-testid: 'btn-login'"],
  ["Thẻ sản phẩm thứ 3", "css: div:nth-child(3) > .card", "data-testid: 'product-card-<id>'"],
  ["Badge giỏ hàng", "xpath tuyệt đối: /html/body/div[2].../span", "data-testid: 'cart-count'"],
  ["Liên kết Quên mật khẩu", "text khớp chính xác theo 1 ngôn ngữ", "data-testid: 'forgot-password-link'"],
], { accent: "#0891b2", note: "Selector giòn phụ thuộc cấu trúc DOM/class tự sinh; selector ổn định gắn với thuộc tính do đội dev chủ động thêm cho test." });

// ── Mockup 4: ticket Jira khi class CSS tự sinh đổi làm nhiều test vỡ đồng loạt ──
const m_jira = jira({
  key: "SE-14205", title: "Class CSS tự sinh đổi sau mỗi lần build làm 30 test đăng nhập/giỏ hàng vỡ đồng loạt",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · CI pipeline"],
    ["Nguyên nhân", "Test dùng selector css '.css-a8f3k2' do CSS-in-JS tự sinh, đổi giá trị mỗi lần đội FE build lại"],
    ["Ảnh hưởng", "Sau mỗi lần deploy FE, hàng loạt test báo lỗi 'không tìm thấy phần tử' dù tính năng vẫn chạy đúng"],
    ["Đề xuất", "Đổi sang locator data-testid cố định do FE gắn thêm, không phụ thuộc class tự sinh"],
  ],
});

// ── Mockup 5: bảng kanban nợ kỹ thuật do chọn sai loại locator ──
const m_kanban = kanban("Nợ kỹ thuật do chọn sai loại locator (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14210", title: "Thay XPath tuyệt đối ở trang giỏ hàng bằng data-testid", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14205", title: "Đổi class tự sinh sang data-testid cho màn đăng nhập", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14198", title: "Chuẩn hoá text locator đa ngôn ngữ sang role + name", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14180", title: "Thêm data-testid cho toàn bộ nút CTA chính", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Locator và selector khác nhau như thế nào?",
  "How are locator and selector different?",
  "Trong thực hành automation, hai từ này thường dùng thay thế nhau: 'selector' nhấn mạnh CÚ PHÁP để tìm phần tử (ví dụ chuỗi CSS hay XPath), còn 'locator' là khái niệm rộng hơn trong công cụ như Playwright — một đối tượng đại diện cho phần tử, có thể tạo từ selector, từ role, từ text, hay từ data-testid. Nói ngắn gọn: mọi selector đều dùng được để tạo locator, nhưng locator không nhất thiết chỉ dựa trên selector CSS/XPath.",
  "In practice, the two terms are often used interchangeably: 'selector' emphasizes the SYNTAX used to find an element (e.g. a CSS or XPath string), while 'locator' is a broader concept in tools like Playwright — an object representing the element, built from a selector, a role, text, or a data-testid. In short: every selector can be used to build a locator, but a locator isn't necessarily based only on a CSS/XPath selector.",
  "ロケーターとセレクターはどう違う？",
  "実務では両者はほぼ同じ意味で使われることが多いですが、『セレクター』は要素を探すための構文（CSSやXPathの文字列など）を指し、『ロケーター』はPlaywrightのようなツールにおけるより広い概念で、要素を表すオブジェクトです。セレクター、role、テキスト、data-testidなど様々な方法から作られます。あらゆるセレクターはロケーターを作るのに使えますが、ロケーターは必ずしもCSS/XPathセレクターだけに基づくわけではありません。");
const faq2 = FAQ(
  "Vì sao nên ưu tiên data-testid hơn class hay id do CSS-in-JS tự sinh?",
  "Why prefer data-testid over classes or ids auto-generated by CSS-in-JS?",
  "Class hay id do công cụ CSS-in-JS (như styled-components, emotion) tự sinh thường có chuỗi ký tự ngẫu nhiên, có thể đổi mỗi lần build lại dù giao diện không hề thay đổi về nghiệp vụ. Thuộc tính data-testid do đội phát triển chủ động gắn thêm chỉ với mục đích phục vụ kiểm thử, không liên quan style hay logic hiển thị, nên gần như không đổi khi refactor CSS hay đổi thư viện UI — giúp locator bền hơn hẳn theo thời gian.",
  "Classes or ids auto-generated by CSS-in-JS tools (like styled-components, emotion) usually contain random strings and can change on every rebuild, even when nothing changes from a business perspective. A data-testid attribute is deliberately added by the dev team purely for testing, unrelated to styling or display logic, so it rarely changes when CSS is refactored or the UI library is swapped — making the locator far more durable over time.",
  "なぜCSS-in-JSが自動生成するclassやidよりdata-testidを優先すべき？",
  "styled-componentsやemotionのようなCSS-in-JSツールが自動生成するclassやidは、通常ランダムな文字列を含み、業務的には何も変わっていなくてもビルドのたびに変わることがあります。data-testid属性は開発チームがテストのためだけに意図的に付与するもので、スタイルや表示ロジックとは無関係なので、CSSのリファクタリングやUIライブラリの変更があってもほとんど変わりません——これが長期的にロケーターをはるかに堅牢にします。");
const faq3 = FAQ(
  "Khi nào bắt buộc phải dùng XPath thay vì CSS selector?",
  "When is XPath actually required instead of a CSS selector?",
  "Phần lớn trường hợp, CSS selector hoặc locator ngữ nghĩa (role, text, data-testid) đã đủ dùng và dễ đọc hơn XPath. XPath chỉ thật sự cần khi phải tìm phần tử dựa trên nội dung văn bản kết hợp điều hướng phức tạp mà CSS không hỗ trợ, ví dụ tìm phần tử cha từ phần tử con. Ngay cả khi đó, nên viết XPath TƯƠNG ĐỐI, ngắn, dựa trên thuộc tính ổn định — tránh XPath tuyệt đối kiểu /html/body/div[2]/div[3]... vì chỉ cần thêm/bớt 1 thẻ là vỡ ngay.",
  "In most cases, CSS selectors or semantic locators (role, text, data-testid) are enough and easier to read than XPath. XPath is truly needed only when finding an element requires text content combined with complex navigation that CSS doesn't support, e.g. finding a parent from a child element. Even then, write a RELATIVE, short XPath based on stable attributes — avoid an absolute XPath like /html/body/div[2]/div[3]... since adding or removing just one tag breaks it instantly.",
  "CSSセレクターではなくXPathが本当に必要なのはどんな時？",
  "ほとんどの場合、CSSセレクターや意味的なロケーター（role、テキスト、data-testid）で十分で、XPathより読みやすいです。XPathが本当に必要なのは、CSSでは対応できない複雑なナビゲーションを組み合わせた検索が必要な場合だけです。例えば子要素から親要素を探す場合です。それでも、安定した属性に基づいた短い『相対』XPathを書くべきで、/html/body/div[2]/div[3]...のような『絶対』XPathはタグが1つ増減するだけで即座に壊れるため避けてください。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Đội FE dùng CSS-in-JS khiến class đổi ngẫu nhiên mỗi lần build. Loại locator nào nên ưu tiên để test không vỡ theo?", en: "The FE team uses CSS-in-JS, so classes change randomly on every build. Which locator type should be prioritized so tests don't break along with it?", ja: "フロントエンドがCSS-in-JSを使い、ビルドのたびにclassがランダムに変わる。テストが道連れで壊れないためにどのロケーターを優先すべき？" },
    options: [
      { vi: "class CSS do công cụ tự sinh", en: "The CSS class auto-generated by the build tool", ja: "ビルドツールが自動生成するCSSクラス" },
      { vi: "XPath tuyệt đối tính từ thẻ html", en: "An absolute XPath counted from the html tag", ja: "htmlタグから数える絶対XPath" },
      { vi: "data-testid do đội dev chủ động gắn cho phần tử", en: "A data-testid deliberately added to the element by the dev team", ja: "開発チームが要素に意図的に付与したdata-testid" },
      { vi: "Chỉ số vị trí (nth-child) trong danh sách phần tử", en: "A positional index (nth-child) within the element list", ja: "要素リスト内の位置インデックス（nth-child）" },
    ], correct: 2,
    explain: { vi: "data-testid không phụ thuộc style hay cấu trúc DOM tự sinh, nên vẫn ổn định dù class đổi liên tục.", en: "data-testid doesn't depend on styling or auto-generated DOM structure, so it stays stable even as classes keep changing.", ja: "data-testidはスタイルや自動生成されるDOM構造に依存しないため、classが頻繁に変わっても安定します。" },
  }),
  mcq({
    q: { vi: "Thuộc tính data-testid có đặc điểm gì khiến nó phù hợp làm locator cho test tự động?", en: "What characteristic makes the data-testid attribute suitable as a locator for automation?", ja: "data-testid属性が自動化のロケーターとして適している特徴は何？" },
    options: [
      { vi: "Được đội dev gắn riêng cho mục đích test, không liên quan style/logic hiển thị", en: "It's added by the dev team purely for testing, unrelated to styling/display logic", ja: "テストのためだけに開発チームが付与し、スタイルや表示ロジックと無関係" },
      { vi: "Tự động sinh ngẫu nhiên mỗi lần trang tải lại", en: "It's randomly auto-generated every time the page reloads", ja: "ページが再読み込みされるたびにランダムに自動生成される" },
      { vi: "Chỉ tồn tại trên trình duyệt Chrome", en: "It only exists in the Chrome browser", ja: "Chromeブラウザにしか存在しない" },
      { vi: "Thay thế hoàn toàn vai trò của CSS trong giao diện", en: "It completely replaces CSS's role in the UI", ja: "UIにおけるCSSの役割を完全に置き換える" },
    ], correct: 0,
    explain: { vi: "Vì không phục vụ style, data-testid gần như không đổi khi refactor giao diện, giúp locator bền vững.", en: "Because it doesn't serve styling, data-testid barely changes when the UI is refactored, keeping the locator durable.", ja: "スタイルのためではないため、UIをリファクタリングしてもdata-testidはほとんど変わらず、ロケーターが堅牢に保たれます。" },
  }),
  mcq({
    q: { vi: "Vì sao nên tránh XPath tuyệt đối như /html/body/div[2]/div[3]/button?", en: "Why should an absolute XPath like /html/body/div[2]/div[3]/button be avoided?", ja: "/html/body/div[2]/div[3]/buttonのような絶対XPathをなぜ避けるべき？" },
    options: [
      { vi: "Vì Playwright không hỗ trợ chạy XPath", en: "Because Playwright doesn't support running XPath", ja: "PlaywrightがXPathの実行をサポートしていないから" },
      { vi: "Vì chỉ cần thêm/bớt 1 thẻ trong cây DOM là locator vỡ ngay", en: "Because adding or removing just one tag in the DOM tree instantly breaks the locator", ja: "DOMツリーにタグを1つ追加・削除するだけでロケーターが即座に壊れるから" },
      { vi: "Vì XPath chạy chậm hơn CSS selector gấp 10 lần", en: "Because XPath runs 10 times slower than a CSS selector", ja: "XPathはCSSセレクターより10倍遅く動くから" },
      { vi: "Vì XPath không thể dùng để click phần tử", en: "Because XPath cannot be used to click an element", ja: "XPathは要素のクリックに使えないから" },
    ], correct: 1,
    explain: { vi: "XPath tuyệt đối gắn cứng với toàn bộ đường dẫn DOM, chỉ một thay đổi nhỏ ở cấu trúc trang cũng đủ làm sai đường dẫn.", en: "An absolute XPath is hard-coded to the entire DOM path, so even a small change in page structure is enough to misalign it.", ja: "絶対XPathはDOMパス全体に固定されているため、ページ構造のわずかな変更だけでパスがずれてしまいます。" },
  }),
  mcq({
    q: { vi: "Trong Playwright, page.getByRole('button', { name: 'Đăng nhập' }) dùng để làm gì?", en: "In Playwright, what does page.getByRole('button', { name: 'Đăng nhập' }) do?", ja: "Playwrightで、page.getByRole('button', { name: 'Đăng nhập' })は何をする？" },
    options: [
      { vi: "Tìm phần tử theo vai trò accessibility (ví dụ nút bấm) kết hợp tên hiển thị/accessible name", en: "Find the element by its accessibility role (e.g. a button) combined with its accessible name", ja: "アクセシビリティ上の役割（ボタンなど）とアクセシブルネームを組み合わせて要素を探す" },
      { vi: "Tìm phần tử theo class CSS chính xác", en: "Find the element by an exact CSS class", ja: "正確なCSSクラスで要素を探す" },
      { vi: "Tìm toàn bộ phần tử có thẻ button trên trang, bất kể nội dung", en: "Find every element with a button tag on the page, regardless of content", ja: "内容に関係なく、ページ上のbuttonタグを持つ全要素を探す" },
      { vi: "Chỉ dùng được khi phần tử có thuộc tính data-testid", en: "Only works when the element has a data-testid attribute", ja: "要素にdata-testid属性がある場合にしか使えない" },
    ], correct: 0,
    explain: { vi: "getByRole tìm theo vai trò ARIA (button, textbox, link...) kết hợp accessible name, phản ánh đúng cách người dùng/trình đọc màn hình nhận diện phần tử.", en: "getByRole finds elements by their ARIA role (button, textbox, link...) combined with the accessible name, matching how users/screen readers perceive the element.", ja: "getByRoleはARIAのrole（button、textbox、linkなど）とアクセシブルネームで要素を探し、ユーザーやスクリーンリーダーが認識する方法を反映します。" },
  }),
  mcq({
    q: { vi: "Điều gì KHÔNG nên làm khi chọn locator cho một dự án automation nhiều ngôn ngữ (vi/en/ja)?", en: "What should NOT be done when choosing locators for a multi-language (vi/en/ja) automation project?", ja: "多言語（vi/en/ja）の自動化プロジェクトでロケーターを選ぶ際、してはいけないことは？" },
    options: [
      { vi: "Ưu tiên data-testid hoặc role không phụ thuộc ngôn ngữ hiển thị", en: "Prioritize data-testid or role that doesn't depend on the displayed language", ja: "表示言語に依存しないdata-testidやroleを優先する" },
      { vi: "Dùng locator theo text cố định của 1 ngôn ngữ làm nguồn locator DUY NHẤT cho mọi môi trường", en: "Use a fixed-language text locator as the ONLY locator source for every environment", ja: "1つの言語の固定テキストロケーターを、あらゆる環境で唯一のロケーター源にする" },
      { vi: "Kết hợp getByTestId với filter khi cần thu hẹp phạm vi tìm kiếm", en: "Combine getByTestId with a filter when narrowing down the search", ja: "検索範囲を絞り込む際にgetByTestIdとfilterを組み合わせる" },
      { vi: "Trao đổi với đội FE để thống nhất quy ước đặt data-testid", en: "Coordinate with the FE team on a data-testid naming convention", ja: "data-testidの命名規則についてフロントエンドチームと調整する" },
    ], correct: 1,
    explain: { vi: "Locator theo text sẽ vỡ ngay khi đổi ngôn ngữ hiển thị; nên ưu tiên thuộc tính không đổi theo ngôn ngữ như data-testid hoặc role kết hợp key ổn định.", en: "A text-based locator breaks instantly when the display language changes; prioritize attributes that don't vary by language, like data-testid or role with a stable key.", ja: "テキストベースのロケーターは表示言語が変わると即座に壊れます。data-testidや、安定したキーと組み合わせたroleなど、言語に左右されない属性を優先すべきです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & phần tử bạn sẽ chọn", en: "1. TL;DR & the element you'll target", ja: "1. 要点と対象にする要素" },
    blocks: [
      TLDR("Locator selector là cách xác định phần tử trên giao diện để Playwright thao tác đúng chỗ. Bài này bám màn đăng nhập ShopEasy: bạn học các loại locator (id, class, CSS, XPath, text, role, data-testid), vì sao selector giòn dễ vỡ khi UI đổi, cách viết locator Playwright thật (getByRole/getByTestId/CSS/XPath), và công cụ inspect để tìm phần tử. Có 2 tình huống thực tế, nhiều mockup và trắc nghiệm cuối bài.",
        "Locator selector is how you identify an element on the UI so Playwright can act on the right spot. This article follows ShopEasy's login screen: you'll learn the locator types (id, class, CSS, XPath, text, role, data-testid), why fragile selectors break when the UI changes, how to write real Playwright locators (getByRole/getByTestId/CSS/XPath), and inspect tools to find elements. Includes 2 real situations, many mockups, and a quiz at the end.",
        "ロケーターセレクターとは、Playwrightが正しい場所を操作できるよう画面上の要素を特定する方法です。本記事はShopEasyのログイン画面に沿い、ロケーターの種類（id、class、CSS、XPath、テキスト、role、data-testid）、UIが変わると脆いセレクターがなぜ壊れるか、実際に動くPlaywrightロケーターの書き方（getByRole/getByTestId/CSS/XPath）、要素を見つけるインスペクトツールを学びます。2つの実例、多数のモック、最後にクイズ付き。"),
      P("Chào bạn mới! Khi mới học automation, bước đầu tiên và quan trọng nhất là dạy công cụ (như Playwright) cách 'tìm' đúng phần tử trên giao diện để thao tác — bước này gọi là chọn locator selector. Chọn sai sẽ khiến test chạy không ổn định: hôm nay chạy được, mai đổi 1 dòng CSS là gãy, dù tính năng thực tế vẫn hoạt động bình thường. Bài này dùng màn hình đăng nhập của app TMĐT ShopEasy làm ví dụ xuyên suốt: bạn sẽ học các loại locator phổ biến (id, class, CSS, XPath, text, role, data-testid), cách chọn loại bền vững nhất, viết locator thật bằng Playwright, và dùng công cụ inspect để tìm phần tử nhanh.",
        "Hi, newcomer! When first learning automation, the very first and most important step is teaching your tool (like Playwright) how to correctly 'find' an element on the UI to act on — this step is called choosing a locator or selector. Choosing wrong makes tests unstable: working today, breaking tomorrow after a single CSS line changes, even though the feature itself still works fine. This article uses ShopEasy e-commerce app's login screen as a running example: you'll learn the common locator types (id, class, CSS, XPath, text, role, data-testid), how to pick the most durable kind, write real locators in Playwright, and use inspect tools to find elements quickly.",
        "こんにちは、初心者さん！自動化を学び始めて最初に、そして最も重要なステップは、ツール（Playwrightなど）に画面上の正しい要素を『見つける』方法を教えることです——このステップをロケーターセレクターの選択と呼びます。選び方を間違えると、テストが不安定になります：今日は動いても、CSSが1行変わっただけで明日には壊れる、機能自体は正常なのに、ということが起こります。本記事はECアプリShopEasyのログイン画面を例に、一般的なロケーターの種類（id、class、CSS、XPath、テキスト、role、data-testid）、最も堅牢な種類の選び方、Playwrightでの実際のロケーターの書き方、要素を素早く見つけるインスペクトツールの使い方を学びます。"),
      IMG(m_login, "Màn hình đăng nhập ShopEasy, chú thích 4 loại locator khác nhau trên các phần tử", "ShopEasy login screen, annotated with 4 different locator types on its elements", "ShopEasyログイン画面、各要素に4種類の異なるロケーターを注記"),
      DEF("Locator", "cách xác định một phần tử cụ thể trên giao diện để công cụ automation (như Playwright) biết thao tác đúng lên phần tử đó — có thể dựng từ id, class, CSS, XPath, text, role hay data-testid.",
        "the way to identify a specific element on the UI so an automation tool (like Playwright) knows exactly which element to act on — built from an id, class, CSS, XPath, text, role, or data-testid.",
        "自動化ツール（Playwrightなど）がどの要素を正しく操作すべきか分かるように、画面上の特定の要素を特定する方法。id、class、CSS、XPath、テキスト、role、data-testidなどから作られる。"),
    ] },
  { heading: { vi: "2. Vấn đề: selector giòn khiến test dễ vỡ", en: "2. The problem: fragile selectors make tests brittle", ja: "2. 問題：脆いセレクターがテストを壊れやすくする" },
    blocks: [
      P("Hãy tưởng tượng bạn viết locator cho nút 'Đăng nhập' trên ShopEasy bằng cách mở DevTools, thấy class hiển thị là '.css-a8f3k2', rồi copy nguyên chuỗi đó vào test. Cách này chạy đúng ngay lúc viết, vì tại thời điểm đó class thật sự tồn tại. Vấn đề là nhiều dự án hiện đại dùng công cụ CSS-in-JS hoặc bundler tự sinh tên class ngẫu nhiên mỗi lần build lại — dù bạn không sửa gì về giao diện hay nghiệp vụ.",
        "Imagine you write a locator for ShopEasy's 'Login' button by opening DevTools, seeing the displayed class as '.css-a8f3k2', and copying that exact string into the test. This works correctly the moment you write it, since the class truly exists at that time. The problem is many modern projects use CSS-in-JS tools or bundlers that auto-generate random class names on every rebuild — even when you change nothing about the UI or business logic.",
        "ShopEasyの『ログイン』ボタンのロケーターを書くとき、DevToolsを開いて表示されているclassが'.css-a8f3k2'だと分かり、その文字列をそのままテストにコピーしたとします。書いた瞬間は正しく動きます、その時点でそのclassが実在するからです。問題は、多くの現代的なプロジェクトがCSS-in-JSツールやバンドラーを使い、ビルドのたびにランダムなclass名を自動生成することです——UIや業務ロジックを何も変えていなくてもです。"),
      P("Kết quả là sau một lần deploy bình thường, class đó đổi thành '.css-x92mtq', và locator cũ không còn tìm thấy phần tử nào nữa. Test báo lỗi đỏ dù tính năng đăng nhập trên thực tế vẫn hoạt động hoàn hảo — đây chính là 'báo động giả' (false alarm), một trong những lý do phổ biến nhất khiến đội ngũ dần mất niềm tin vào bộ test tự động. Bài học cốt lõi: locator giòn không chỉ tốn công sửa, mà còn làm giảm giá trị của cả automation.",
        "As a result, after a normal deploy, that class changes to '.css-x92mtq', and the old locator no longer finds any element. The test fails red even though the login feature actually still works perfectly — this is a 'false alarm', one of the most common reasons teams gradually lose trust in their automated test suite. The core lesson: a fragile locator doesn't just cost effort to fix — it erodes the value of the entire automation effort.",
        "その結果、普通のデプロイの後、そのclassは'.css-x92mtq'に変わり、古いロケーターはもう何の要素も見つけられなくなります。実際にはログイン機能は完璧に動いているのに、テストは赤く失敗します——これが『誤検知（false alarm）』であり、チームが徐々に自動テストスイートへの信頼を失う最も一般的な理由の1つです。核心的な教訓：脆いロケーターは修正の手間がかかるだけでなく、自動化全体の価値を損ないます。"),
      DEF("Selector giòn", "selector dễ vỡ khi giao diện thay đổi dù chỉ một chút, ví dụ dựa vào class tự sinh, vị trí thứ tự phần tử, hay XPath tuyệt đối gắn cứng toàn bộ cây DOM.",
        "a selector that easily breaks when the UI changes even slightly, e.g. one based on auto-generated classes, element position/order, or an absolute XPath hard-coded to the entire DOM tree.",
        "UIが少し変わっただけで壊れやすいセレクター。例えば自動生成されたclass、要素の並び順、DOM構造全体に固定された絶対XPathに基づくもの。"),
    ] },
  { heading: { vi: "3. Locator cơ bản: id, class, CSS selector", en: "3. Basic locators: id, class, CSS selector", ja: "3. 基本のロケーター：id、class、CSSセレクター" },
    blocks: [
      P("id là loại locator cơ bản và thường ổn định nhất trong nhóm locator kiểu cấu trúc, vì theo chuẩn HTML, id phải là DUY NHẤT trên toàn trang — ví dụ '#email-input' trên màn đăng nhập ShopEasy. Nếu đội dev đặt tay và giữ nguyên id này, đây là lựa chọn tốt. class CSS (ví dụ '.btn-primary') cũng dùng được, nhưng kém ổn định hơn vì một class có thể gắn cho nhiều phần tử, và dễ đổi khi đội thiết kế chỉnh style.",
        "An id is a basic locator type and usually the most stable among structural locators, since by HTML standard an id must be UNIQUE across the whole page — e.g. '#email-input' on ShopEasy's login screen. If the dev team hand-writes and keeps this id, it's a solid choice. A CSS class (e.g. '.btn-primary') also works, but is less stable since one class can be attached to many elements and easily changes when the design team tweaks styles.",
        "idは基本的なロケーターの種類で、構造系ロケーターの中でも通常最も安定しています。HTML標準ではidはページ全体で一意でなければならないからです——例えばShopEasyのログイン画面の'#email-input'。開発チームが手で書き、そのidを維持していれば良い選択です。CSSクラス（例：'.btn-primary'）も使えますが、1つのクラスが複数の要素に付けられ、デザインチームがスタイルを調整すると容易に変わるため、安定性は劣ります。"),
      P("CSS selector phức hợp (ví dụ 'div.card > button:nth-child(2)') cho phép tìm phần tử dựa trên cấu trúc lồng nhau, hữu ích khi phần tử không có id/class riêng. Nhưng đây cũng là loại giòn nhất trong nhóm CSS, vì chỉ cần đội FE đổi thứ tự phần tử hay thêm 1 lớp bọc div, toàn bộ đường dẫn CSS có thể sai lệch. Nên xem CSS selector phức hợp là lựa chọn cuối cùng, không phải mặc định.",
        "A compound CSS selector (e.g. 'div.card > button:nth-child(2)') lets you find an element based on nested structure, useful when the element has no id/class of its own. But it's also the most fragile type in the CSS family, since as soon as the FE team reorders elements or adds one wrapper div, the whole CSS path can go wrong. Treat a compound CSS selector as a last resort, not a default.",
        "複合CSSセレクター（例：'div.card > button:nth-child(2)'）は、入れ子構造に基づいて要素を見つけられ、要素に独自のid/classがない場合に便利です。しかしCSS系の中で最も脆い種類でもあり、フロントエンドが要素の順序を変えたり1つのラップdivを追加しただけで、CSSパス全体がずれる可能性があります。複合CSSセレクターは既定の選択ではなく、最後の手段と考えるべきです。"),
      TIP("Ưu tiên id/CSS selector dựa trên thuộc tính CỐ ĐỊNH do đội dev đặt tay (ví dụ #email-input), tránh id/class do công cụ build tự sinh chuỗi ngẫu nhiên.", "Prioritize id/CSS selectors based on FIXED attributes hand-written by the dev team (e.g. #email-input), and avoid ids/classes auto-generated as random strings by build tools.", "開発チームが手書きした固定属性（#email-inputなど）に基づくid/CSSセレクターを優先し、ビルドツールがランダム文字列で自動生成するid/classは避けよう。"),
    ] },
  { heading: { vi: "4. Locator theo text & role (accessibility)", en: "4. Locators by text & role (accessibility)", ja: "4. テキストとrole（アクセシビリティ）によるロケーター" },
    blocks: [
      P("Locator theo text tìm phần tử dựa trên nội dung hiển thị, ví dụ page.getByText('Quên mật khẩu?') trên ShopEasy. Cách này trực quan, dễ đọc, và gần với cách người dùng thật nhìn vào trang. Tuy nhiên, nó có nhược điểm rõ ràng: nếu app hỗ trợ đa ngôn ngữ (vi/en/ja) và bạn chạy test trên bản dịch khác, text sẽ đổi và locator vỡ ngay lập tức.",
        "A text locator finds an element by its displayed content, e.g. page.getByText('Quên mật khẩu?') on ShopEasy. This is intuitive, readable, and close to how a real user looks at the page. However, it has a clear downside: if the app supports multiple languages (vi/en/ja) and you run the test against a different translation, the text changes and the locator breaks instantly.",
        "テキストロケーターは表示内容に基づいて要素を見つけます。例えばShopEasyのpage.getByText('Quên mật khẩu?')です。これは直感的で読みやすく、実際のユーザーがページを見る方法に近いです。しかし明確な欠点があります：アプリが多言語（vi/en/ja）に対応し、別の翻訳版でテストを実行すると、テキストが変わってロケーターが即座に壊れます。"),
      P("Locator theo role dựa trên chuẩn accessibility (ARIA) — ví dụ 'button', 'textbox', 'link' — kết hợp với accessible name (tên mà trình đọc màn hình sẽ đọc lên). Cách này vừa bền hơn text thuần (không phụ thuộc CSS/DOM), vừa có lợi ích phụ: buộc bạn phải đảm bảo phần tử có accessibility đúng chuẩn, gián tiếp cải thiện chất lượng UI cho người dùng khuyết tật.",
        "A role locator is based on the accessibility (ARIA) standard — e.g. 'button', 'textbox', 'link' — combined with the accessible name (the name a screen reader would announce). This is more durable than plain text (independent of CSS/DOM), and comes with a side benefit: it forces you to ensure the element has proper accessibility, indirectly improving UI quality for users with disabilities.",
        "roleロケーターはアクセシビリティ（ARIA）標準に基づきます——例えば'button'、'textbox'、'link'——アクセシブルネーム（スクリーンリーダーが読み上げる名前）と組み合わせます。これは純粋なテキストより堅牢（CSS/DOMに依存しない）で、副次的な利点もあります：要素が適切なアクセシビリティを備えることを強制し、間接的に障害を持つユーザー向けのUI品質を改善します。"),
      DEF("role (accessibility)", "vai trò của phần tử theo chuẩn ARIA/accessibility (ví dụ button, textbox, link), giúp locator tìm phần tử theo đúng cách người dùng và trình đọc màn hình nhận diện, không phụ thuộc cấu trúc HTML bên dưới.",
        "an element's role under the ARIA/accessibility standard (e.g. button, textbox, link), letting the locator find the element the same way users and screen readers perceive it, independent of the underlying HTML structure.",
        "ARIA/アクセシビリティ標準における要素の役割（button、textbox、linkなど）。ユーザーやスクリーンリーダーが認識する方法と同じ形で要素を見つけられ、内部のHTML構造に依存しない。"),
    ] },
  { heading: { vi: "5. data-testid: locator dành riêng cho test", en: "5. data-testid: a locator built purely for testing", ja: "5. data-testid：テストのためだけのロケーター" },
    blocks: [
      P("Trong số mọi loại locator, data-testid thường được xem là lựa chọn BỀN NHẤT cho automation, vì nó là thuộc tính HTML tuỳ chỉnh (ví dụ data-testid='btn-login') do chính đội phát triển chủ động thêm vào CHỈ để phục vụ kiểm thử — không liên quan gì tới style hiển thị hay logic nghiệp vụ. Khi đội FE đổi thư viện CSS, đổi cấu trúc DOM, hay thậm chí dịch lại toàn bộ text sang ngôn ngữ khác, data-testid vẫn giữ nguyên nếu không ai chủ đích xoá nó.",
        "Among all locator types, data-testid is usually considered the MOST DURABLE choice for automation, because it's a custom HTML attribute (e.g. data-testid='btn-login') deliberately added by the dev team ONLY to support testing — unrelated to display styling or business logic. When the FE team changes CSS libraries, restructures the DOM, or even retranslates all text into another language, data-testid stays the same unless someone intentionally removes it.",
        "あらゆるロケーターの中で、data-testidは通常自動化にとって最も堅牢な選択とされます。なぜなら、開発チームがテストをサポートするためだけに意図的に追加するカスタムHTML属性（例：data-testid='btn-login'）であり、表示スタイルや業務ロジックとは無関係だからです。フロントエンドチームがCSSライブラリを変えたり、DOM構造を変更したり、全テキストを別言語に翻訳し直しても、誰かが意図的に削除しない限りdata-testidはそのまま残ります。"),
      IMG(m_types, "Bảng các loại locator phổ biến và độ bền tương ứng khi giao diện ShopEasy thay đổi", "A table of common locator types and their durability as ShopEasy's UI changes", "ShopEasyのUIが変わったときの、一般的なロケーターの種類とそれぞれの堅牢性の表"),
      DEF("data-testid", "thuộc tính HTML tuỳ chỉnh do đội phát triển chủ động gắn thêm chỉ để phục vụ automation, không ảnh hưởng style hay logic hiển thị, nên gần như không đổi khi refactor giao diện.",
        "a custom HTML attribute deliberately added by the dev team purely to support automation, with no effect on styling or display logic, so it rarely changes when the UI is refactored.",
        "開発チームが自動化のためだけに意図的に付与するカスタムHTML属性で、スタイルや表示ロジックには影響しない。UIをリファクタリングしてもほとんど変わらない。"),
    ] },
  { heading: { vi: "6. So sánh selector giòn và ổn định", en: "6. Comparing fragile vs stable selectors", ja: "6. 脆いセレクターと安定したセレクターの比較" },
    blocks: [
      P("Bảng dưới đây so sánh cùng một vài phần tử trên ShopEasy được chọn theo 2 cách: một bên dùng locator giòn (dễ bị công cụ build, cấu trúc DOM, hay ngôn ngữ hiển thị làm gãy), một bên dùng locator ổn định (gắn với ý nghĩa/thuộc tính chủ động). Nhìn qua bảng, bạn sẽ thấy quy luật chung: locator càng gắn chặt với 'hình dạng hiện tại' của trang (thứ tự, class tự sinh, đường dẫn DOM) thì càng giòn; locator càng gắn với 'ý nghĩa' của phần tử (vai trò, mã định danh chủ động) thì càng bền.",
        "The table below compares the same few elements on ShopEasy chosen two different ways: one using fragile locators (easily broken by build tools, DOM structure, or display language), the other using stable locators (tied to deliberate meaning/attributes). Looking at the table, you'll notice a general rule: the more a locator is tied to the page's 'current shape' (order, auto-generated class, DOM path), the more fragile it is; the more it's tied to the element's 'meaning' (role, deliberate identifier), the more durable it is.",
        "下の表は、ShopEasy上の同じいくつかの要素を2通りの方法で選んだ場合を比較しています：一方はビルドツール、DOM構造、表示言語によって簡単に壊れる脆いロケーター、もう一方は意図的な意味・属性に結びついた安定したロケーターです。表を見ると、一般的な法則に気づくでしょう：ロケーターがページの『現在の形』（順序、自動生成class、DOMパス）に密接であるほど脆く、要素の『意味』（role、意図的な識別子）に結びついているほど堅牢です。"),
      IMG(m_fragile, "Bảng đối chiếu selector giòn và selector ổn định cho cùng phần tử trên ShopEasy", "A side-by-side comparison of fragile vs stable selectors for the same ShopEasy elements", "ShopEasyの同じ要素に対する、脆いセレクターと安定したセレクターの対比表"),
      TIP("Khi review pull request có thêm test mới, hãy hỏi: 'Locator này có đổi khi FE refactor CSS/đổi thư viện UI không?' — nếu có, nên đổi sang data-testid hoặc role.", "When reviewing a pull request that adds a new test, ask: 'Would this locator change if FE refactors CSS or swaps the UI library?' — if so, switch it to data-testid or role.", "新しいテストを追加するプルリクエストをレビューするとき、『フロントエンドがCSSをリファクタリングしたりUIライブラリを変えたら、このロケーターは変わるか？』と自問しよう——もし変わるなら、data-testidかroleに変更すべきです。"),
    ] },
  { heading: { vi: "7. Viết locator Playwright: getByRole, getByTestId, CSS", en: "7. Writing Playwright locators: getByRole, getByTestId, CSS", ja: "7. Playwrightロケーターを書く：getByRole、getByTestId、CSS" },
    blocks: [
      P("Giờ ta viết locator Playwright thật cho màn đăng nhập ShopEasy, áp dụng đúng thứ tự ưu tiên vừa học: data-testid trước, role sau, CSS ổn định nếu không có 2 loại trên.",
        "Now let's write real Playwright locators for ShopEasy's login screen, applying the priority order we just learned: data-testid first, role next, and a stable CSS selector if neither of the above is available.",
        "では、先ほど学んだ優先順位——まずdata-testid、次にrole、どちらもなければ安定したCSSセレクター——を適用して、ShopEasyのログイン画面用に実際のPlaywrightロケーターを書いてみましょう。"),
      STEP(1, "Mở trang đăng nhập ShopEasy bằng page.goto(), xác định các phần tử cần thao tác: ô email, ô mật khẩu, nút đăng nhập.", "Open ShopEasy's login page with page.goto(), and identify the elements to act on: the email field, password field, and login button.", "page.goto()でShopEasyのログインページを開き、操作対象の要素——メール欄、パスワード欄、ログインボタン——を特定する。"),
      STEP(2, "Nếu phần tử có data-testid, dùng page.getByTestId('...') trước tiên — đây là lựa chọn ổn định nhất.", "If the element has a data-testid, use page.getByTestId('...') first — this is the most stable choice.", "要素にdata-testidがあれば、まずpage.getByTestId('...')を使う——これが最も安定した選択肢。"),
      STEP(3, "Nếu phần tử là nút/liên kết chuẩn ARIA, dùng page.getByRole('button', { name: '...' }) để bám theo vai trò và tên hiển thị.", "If the element is an ARIA-standard button/link, use page.getByRole('button', { name: '...' }) to target it by role and accessible name.", "要素がARIA標準のボタン/リンクなら、page.getByRole('button', { name: '...' })でroleとアクセシブルネームに基づいて対象にする。"),
      CODE("javascript", "// tests/locator-demo.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('dang nhap ShopEasy bang cac loai locator on dinh', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/dang-nhap');\n\n  // Uu tien 1: data-testid - on dinh nhat, khong doi khi UI thay doi giao dien\n  await page.getByTestId('email-input').fill('mai.tran@gmail.com');\n\n  // Uu tien 2: role + accessible name - gan voi trai nghiem nguoi dung that\n  await page.getByRole('textbox', { name: 'Mat khau' }).fill('Mai@2024');\n\n  // Uu tien 3: CSS selector on dinh (id khong doi ngau nhien)\n  await page.locator('#btn-login').click();\n\n  await expect(page).toHaveURL(/.*\\/tai-khoan/);\n});"),
      TRY("Mở lại đoạn code trên và thử đổi locator nút 'Đăng nhập' từ #btn-login sang page.getByRole('button', { name: 'Đăng nhập' }), rồi so sánh độ dễ đọc.", "Open the code above and try switching the 'Đăng nhập' button locator from #btn-login to page.getByRole('button', { name: 'Đăng nhập' }), then compare readability.", "上のコードを開き、『Đăng nhập』ボタンのロケーターを#btn-loginからpage.getByRole('button', { name: 'Đăng nhập' })に変えて、読みやすさを比べてみよう。"),
    ] },
  { heading: { vi: "8. Locator Playwright nâng cao: text, XPath, filter/nth", en: "8. Advanced Playwright locators: text, XPath, filter/nth", ja: "8. Playwrightの高度なロケーター：テキスト、XPath、filter/nth" },
    blocks: [
      P("Không phải phần tử nào cũng có sẵn data-testid hay role rõ ràng. Với những trường hợp khó, Playwright vẫn hỗ trợ locator theo text, XPath, và các bộ lọc để thu hẹp phạm vi tìm kiếm khi trang có nhiều phần tử giống nhau.",
        "Not every element already has a data-testid or a clear role. For tricky cases, Playwright still supports text locators, XPath, and filters to narrow the search when a page has many similar elements.",
        "すべての要素にdata-testidや明確なroleがあるわけではありません。難しいケースでは、Playwrightはテキストロケーター、XPath、そしてページに似た要素が多数ある場合に検索範囲を絞り込むフィルターもサポートしています。"),
      STEP(1, "Khi cần tìm theo nội dung hiển thị, dùng page.getByText('...') thay vì tự viết CSS phức tạp.", "When you need to find by displayed content, use page.getByText('...') instead of hand-writing a complex CSS selector.", "表示内容で探す必要があるときは、複雑なCSSセレクターを自分で書く代わりにpage.getByText('...')を使う。"),
      STEP(2, "Khi bắt buộc dùng XPath, viết dạng TƯƠNG ĐỐI bắt đầu bằng //, dựa vào thuộc tính ổn định, kết hợp filter()/first()/nth() khi có nhiều phần tử giống nhau.", "When XPath is unavoidable, write it as a RELATIVE path starting with //, based on stable attributes, combined with filter()/first()/nth() when there are many similar elements.", "XPathがやむを得ない場合は、//で始まる『相対』パスとして、安定した属性に基づいて書き、似た要素が多い場合はfilter()/first()/nth()と組み合わせる。"),
      CODE("javascript", "// Vi du locator theo text va XPath tuong doi (nen dung), tranh XPath tuyet doi\nconst forgotLink = page.getByText('Quen mat khau?');\n\n// XPath TUONG DOI, gan voi thuoc tinh on dinh - CHAP NHAN DUOC\nconst cartBadge = page.locator('xpath=//span[@data-testid=\"cart-count\"]');\n\n// XPath TUYET DOI - de vo khi UI doi 1 cap the, TRANH dung kieu nay\n// page.locator('xpath=/html/body/div[2]/div[3]/header/div/nav/ul/li[4]/span');\n\n// Ket hop filter + nth khi co nhieu phan tu giong nhau\nconst products = page.locator('.product-card');\nawait products.filter({ hasText: 'Ao thun' }).first().click();"),
      TIP("Nếu buộc phải dùng XPath, hãy bắt đầu bằng '//' (tương đối) và dựa vào thuộc tính ổn định (như data-testid) thay vì đếm số thứ tự thẻ.", "If XPath is unavoidable, start with '//' (relative) and base it on stable attributes (like data-testid) instead of counting tag positions.", "XPathがやむを得ない場合は、'//'（相対）で始め、タグの位置を数えるのではなく安定した属性（data-testidなど）に基づいて書こう。"),
    ] },
  { heading: { vi: "9. Công cụ inspect phần tử: DevTools & Playwright Codegen", en: "9. Inspect tools: DevTools & Playwright Codegen", ja: "9. 要素をインスペクトするツール：DevTools・Playwright Codegen" },
    blocks: [
      P("Để biết một phần tử có id, class, hay data-testid gì, bạn cần công cụ 'inspect'. Hai công cụ phổ biến nhất là Chrome DevTools (có sẵn trên mọi trình duyệt Chrome) và Playwright Inspector/Codegen (đi kèm khi cài Playwright).",
        "To know what id, class, or data-testid an element has, you need an 'inspect' tool. The two most common tools are Chrome DevTools (built into every Chrome browser) and Playwright Inspector/Codegen (bundled with Playwright).",
        "要素がどんなid、class、data-testidを持っているか知るには、『インスペクト』ツールが必要です。最も一般的な2つのツールは、Chrome DevTools（すべてのChromeブラウザに標準搭載）とPlaywright Inspector/Codegen（Playwrightをインストールすると付属）です。"),
      STEP(1, "Mở Chrome DevTools (F12), dùng công cụ 'chọn phần tử' (biểu tượng con trỏ) rồi bấm vào phần tử trên trang ShopEasy để xem thẻ HTML tương ứng.", "Open Chrome DevTools (F12), use the 'select element' tool (the cursor icon), then click an element on ShopEasy's page to see its corresponding HTML tag.", "Chrome DevTools（F12）を開き、『要素を選択』ツール（カーソルアイコン）を使って、ShopEasyのページ上の要素をクリックし、対応するHTMLタグを見る。"),
      STEP(2, "Kiểm tra tab Elements xem phần tử có sẵn id, data-testid, hay thuộc tính role/aria-label ổn định hay không, trước khi nghĩ tới CSS phức hợp hay XPath.", "Check the Elements tab to see whether the element already has an id, data-testid, or a stable role/aria-label attribute, before considering a compound CSS selector or XPath.", "複合CSSセレクターやXPathを検討する前に、Elementsタブで要素にすでにid、data-testid、または安定したrole/aria-label属性があるか確認する。"),
      STEP(3, "Dùng lệnh npx playwright codegen <url> để Playwright tự ghi lại thao tác và gợi ý locator — nhưng vẫn nên tự rà lại, ưu tiên đổi sang getByTestId/getByRole nếu công cụ đề xuất selector giòn.", "Run npx playwright codegen <url> to let Playwright record your actions and suggest locators — but still review them yourself, preferring getByTestId/getByRole if the tool suggests a fragile selector.", "npx playwright codegen <url>を実行し、Playwrightに操作を記録させてロケーターを提案させる——ただし必ず自分で見直し、ツールが脆いセレクターを提案した場合はgetByTestId/getByRoleへの変更を優先しよう。"),
      TRY("Vào ShopEasy (hoặc trang bất kỳ), bấm F12, chọn một nút bất kỳ, thử tìm xem nó đã có data-testid chưa — nếu chưa, ghi lại đề xuất thêm cho đội FE.", "Go to ShopEasy (or any page), press F12, pick any button, and check whether it already has a data-testid — if not, note a suggestion to add one for the FE team.", "ShopEasy（または任意のページ）にアクセスし、F12を押して任意のボタンを選び、すでにdata-testidがあるか確認しよう——なければ、フロントエンドチームへの追加提案としてメモしておこう。"),
    ] },
  { heading: { vi: "10. Tình huống thực tế, lỗi hay gặp & câu hỏi thường gặp", en: "10. Real situations, common mistakes & FAQ", ja: "10. 実例・よくある失敗・よくある質問" },
    blocks: [
      SITUATION("Class CSS tự sinh đổi sau mỗi lần build làm 30 test vỡ đồng loạt", "A CSS-in-JS auto-generated class changes on every build, breaking 30 tests at once",
        "Một đội automation viết locator theo class CSS như '.css-a8f3k2' để tìm nút Đăng nhập và badge giỏ hàng trên ShopEasy, vì lúc viết test class này đang hiển thị đúng trên DevTools. Đội FE dùng thư viện CSS-in-JS, nên mỗi lần build lại (kể cả khi không đổi gì về nghiệp vụ), công cụ build sinh ra một chuỗi class ngẫu nhiên mới, ví dụ '.css-x92mtq'.",
        "An automation team writes locators using a CSS class like '.css-a8f3k2' to find the Login button and cart badge on ShopEasy, since that class correctly appeared in DevTools when the tests were written. The FE team uses a CSS-in-JS library, so on every rebuild (even without any business change), the build tool generates a new random class string, e.g. '.css-x92mtq'.",
        "自動化チームが、ShopEasyのログインボタンとカートバッジを見つけるために、'.css-a8f3k2'のようなCSSクラスでロケーターを書く。テストを書いた時点でこのclassが確かにDevToolsに表示されていたからだ。",
        "フロントエンドチームがCSS-in-JSライブラリを使っているため、（業務的には何も変わらなくても）ビルドし直すたびに、ビルドツールが'.css-x92mtq'のような新しいランダムなclass文字列を生成する。"),
      P("Ngay sau lần deploy tiếp theo, 30 test báo lỗi 'không tìm thấy phần tử' dù nút Đăng nhập vẫn hiển thị và hoạt động bình thường trên trình duyệt.",
        "Right after the next deploy, 30 tests fail with 'element not found', even though the Login button still displays and works fine in the browser.",
        "次のデプロイの直後、ログインボタンはブラウザで正常に表示され動作しているにもかかわらず、30個のテストが『要素が見つからない』というエラーで失敗する。"),
      SOLVE("Đề nghị đội FE gắn thêm thuộc tính data-testid cố định cho các phần tử quan trọng (data-testid='btn-login'), rồi đổi toàn bộ 30 test sang dùng page.getByTestId('btn-login') thay vì class tự sinh. Từ đó, dù CSS-in-JS đổi class thế nào, locator vẫn không đổi.",
        "Ask the FE team to add a fixed data-testid attribute to key elements (data-testid='btn-login'), then update all 30 tests to use page.getByTestId('btn-login') instead of the auto-generated class. From then on, no matter how CSS-in-JS changes the class, the locator stays the same.",
        "フロントエンドチームに重要な要素へ固定のdata-testid属性（data-testid='btn-login'）を追加してもらい、30個のテスト全てを自動生成classの代わりにpage.getByTestId('btn-login')を使うよう変更する。これ以降、CSS-in-JSがどうclassを変えても、ロケーターは変わらない。"),
      P("Bài học: bất kỳ locator nào bám vào thứ do CÔNG CỤ tự sinh (build tool, CSS-in-JS, minifier) đều tiềm ẩn rủi ro đổi bất ngờ, kể cả khi không ai chủ đích sửa giao diện. Ưu tiên thuộc tính do CON NGƯỜI chủ động đặt cho mục đích ổn định (id cố định, data-testid) hơn là thứ do máy sinh ra.",
        "Lesson: any locator tied to something auto-generated by a TOOL (a build tool, CSS-in-JS, a minifier) always carries the risk of changing unexpectedly, even when no one intentionally edits the UI. Prioritize attributes deliberately set by HUMANS for stability (a fixed id, data-testid) over things machines generate.",
        "教訓：ビルドツール、CSS-in-JS、ミニファイアなど『ツール』が自動生成するものに結びついたロケーターは、誰もUIを意図的に編集していなくても予期せず変わるリスクを常に抱えています。機械が生成するものより、安定性のために人間が意図的に設定した属性（固定id、data-testid）を優先しましょう。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố 30 test vỡ vì class CSS tự sinh đổi sau khi FE build lại", "A bug ticket recording the incident of 30 broken tests after FE rebuilt and the auto-generated CSS class changed", "フロントエンドの再ビルド後、自動生成されたCSSクラスが変わり30個のテストが壊れたインシデントを記録したバグチケット"),
      RECAP(["Locator bám vào thứ do công cụ tự sinh (class CSS-in-JS) luôn tiềm ẩn rủi ro đổi bất ngờ", "data-testid do con người chủ động đặt bền hơn hẳn theo thời gian"],
        ["A locator tied to something auto-generated by a build tool (CSS-in-JS classes) always risks changing unexpectedly", "A data-testid deliberately set by humans is far more durable over time"],
        ["ビルドツール（CSS-in-JSのclassなど）が自動生成するものに依存するロケーターは、常に予期せぬ変化のリスクがある", "人間が意図的に設定したdata-testidは、長期的にはるかに堅牢"]),
      SITUATION("XPath tuyệt đối dài, chỉ cần thêm 1 thẻ mới là gãy toàn bộ", "A long absolute XPath breaks entirely after just one new tag is added",
        "Một tester mới copy nguyên XPath do DevTools tự sinh khi chuột phải vào phần tử rồi chọn 'Copy XPath', dán thẳng vào test: '/html/body/div[2]/div[3]/header/div/nav/ul/li[4]/span'. Test chạy đúng ngay khi viết. Vài tuần sau, đội FE thêm 1 banner khuyến mãi phía trên header (chỉ thêm 1 thẻ div mới ở đầu trang) — không liên quan gì tới badge giỏ hàng.",
        "A new tester copies the exact XPath auto-generated by DevTools after right-clicking an element and choosing 'Copy XPath', pasting it straight into the test: '/html/body/div[2]/div[3]/header/div/nav/ul/li[4]/span'. The test works correctly right when written. A few weeks later, the FE team adds one promotional banner above the header (just one new div tag at the top of the page) — completely unrelated to the cart badge.",
        "新人テスターが、要素を右クリックして『XPathをコピー』を選んだときにDevToolsが自動生成したXPathをそのままコピーし、テストに直接貼り付ける：'/html/body/div[2]/div[3]/header/div/nav/ul/li[4]/span'。書いた時点ではテストは正しく動く。",
        "数週間後、フロントエンドチームがヘッダーの上にプロモーションバナーを1つ追加する（ページ先頭に新しいdivタグを1つ追加しただけ）——カートバッジとは全く関係ない変更だ。"),
      P("Ngay lập tức, toàn bộ XPath tuyệt đối trong bộ test lệch số thứ tự thẻ, trỏ sai sang phần tử khác hoặc không tìm thấy gì.",
        "Immediately, every absolute XPath in the test suite has its tag indices shifted, pointing to the wrong element or finding nothing at all.",
        "すぐに、テストスイート内の全ての絶対XPathのタグ番号がずれ、間違った要素を指したり、何も見つからなくなったりする。"),
      SOLVE("Thay XPath tuyệt đối bằng locator theo thuộc tính ổn định: page.locator('xpath=//span[@data-testid=\"cart-count\"]') — dạng XPath TƯƠNG ĐỐI, không phụ thuộc số thứ tự thẻ cha. Tốt hơn nữa, nếu có thể, đổi hẳn sang page.getByTestId('cart-count') để không cần XPath.",
        "Replace the absolute XPath with a locator based on a stable attribute: page.locator('xpath=//span[@data-testid=\"cart-count\"]') — a RELATIVE XPath, independent of the parent tags' order. Even better, if possible, switch entirely to page.getByTestId('cart-count') to avoid XPath altogether.",
        "絶対XPathを、安定した属性に基づくロケーターに置き換える：page.locator('xpath=//span[@data-testid=\"cart-count\"]')——親タグの順序に依存しない『相対』XPathです。可能であれば、さらに良いのはXPathを完全に不要にするpage.getByTestId('cart-count')に切り替えること。"),
      P("Đây là lý do vì sao 'Copy XPath' từ DevTools chỉ nên dùng để THAM KHẢO tạm thời, không nên dán thẳng vào code sản phẩm — nó luôn sinh ra đường dẫn tuyệt đối gắn chặt với cấu trúc DOM hiện tại, vốn có thể đổi bất cứ lúc nào một trang được cập nhật.",
        "This is why DevTools' 'Copy XPath' should only be used as a temporary REFERENCE, not pasted straight into production code — it always produces an absolute path tightly bound to the current DOM structure, which can change any time the page is updated.",
        "これが、DevToolsの『XPathをコピー』は一時的な『参考』としてのみ使うべきで、そのまま本番コードに貼り付けるべきではない理由です——常に現在のDOM構造に固く結びついた絶対パスが生成され、ページが更新されるたびにいつでも変わる可能性があります。"),
      IMG(m_kanban, "Bảng theo dõi nợ kỹ thuật do chọn sai loại locator, và quá trình chuyển sang locator ổn định", "A board tracking technical debt from choosing the wrong locator type, and the migration toward stable locators", "誤ったロケーターの種類を選んだことによる技術的負債と、安定したロケーターへの移行過程を追跡するボード"),
      RECAP(["XPath tuyệt đối gắn chặt với toàn bộ đường dẫn DOM, chỉ 1 thẻ mới cũng đủ làm gãy", "Ưu tiên XPath tương đối dựa trên thuộc tính ổn định, hoặc tránh XPath khi có lựa chọn khác"],
        ["An absolute XPath is tightly bound to the entire DOM path, so even one new tag can break it", "Prefer a relative XPath based on stable attributes, or avoid XPath altogether when another option exists"],
        ["絶対XPathはDOMパス全体に固く結びついており、新しいタグが1つ増えるだけで壊れる", "安定した属性に基づく相対XPathを優先するか、他の選択肢があればXPath自体を避ける"]),
      PITFALL("Chọn locator theo số thứ tự phần tử (ví dụ nth-child(3)) khi danh sách có thể thêm/bớt/sắp xếp lại — thứ tự đổi là locator trỏ sai phần tử ngay.", "Choosing a locator by positional index (e.g. nth-child(3)) when the list can be added to, removed from, or reordered — the moment the order changes, the locator instantly points to the wrong element.", "リストに追加・削除・並べ替えが起こり得るのに、位置インデックス（nth-child(3)など）でロケーターを選ぶこと——順序が変わった瞬間、ロケーターは即座に間違った要素を指してしまう。"),
      PITFALL("Copy nguyên XPath tuyệt đối mà DevTools tự sinh (chuột phải → Copy → Copy XPath) rồi dán thẳng vào code mà không rút gọn — đây thường là XPath tuyệt đối cực giòn.", "Copying the exact absolute XPath auto-generated by DevTools (right-click → Copy → Copy XPath) and pasting it straight into the code without simplifying it — this is usually an extremely fragile absolute XPath.", "DevToolsが自動生成した絶対XPath（右クリック→コピー→Copy XPath）をそのままコードに貼り付け、簡略化しないこと——これは通常、極めて脆い絶対XPathです。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者向けPage Object Model"),
      INTERNAL("Tự động hoá kiểm thử là gì cho người mới", "What is test automation for beginners", "tu-dong-hoa-kiem-thu-la-gi-cho-nguoi-moi", "初心者のためのテスト自動化とは"),
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chọn locator selector bền vững qua màn đăng nhập ShopEasy: các loại locator phổ biến (id, class, CSS, XPath, text, role, data-testid), vì sao selector giòn (class tự sinh, XPath tuyệt đối, chỉ số vị trí) dễ làm test vỡ dù tính năng vẫn đúng, cách viết locator Playwright thật bằng getByRole/getByTestId/CSS/XPath, và cách dùng DevTools/Playwright Codegen để tìm phần tử nhanh. Hai tình huống thực tế cho thấy chi phí khi chọn sai locator, và cách khắc phục bằng data-testid hoặc XPath tương đối.",
        "You just learned how to choose durable locator selectors through ShopEasy's login screen: the common locator types (id, class, CSS, XPath, text, role, data-testid), why fragile selectors (auto-generated classes, absolute XPath, positional index) easily break tests even when the feature is fine, how to write real Playwright locators using getByRole/getByTestId/CSS/XPath, and how to use DevTools/Playwright Codegen to find elements quickly. Two real situations showed the cost of choosing the wrong locator, and how to fix it with data-testid or a relative XPath.",
        "ShopEasyのログイン画面を通じて、堅牢なロケーターセレクターの選び方を学びました：一般的なロケーターの種類（id、class、CSS、XPath、テキスト、role、data-testid）、機能自体は正しいのに脆いセレクター（自動生成class、絶対XPath、位置インデックス）がなぜテストを壊しやすいか、getByRole/getByTestId/CSS/XPathを使った実際のPlaywrightロケーターの書き方、要素を素早く見つけるDevTools/Playwright Codegenの使い方。2つの実例が、誤ったロケーターを選ぶコストと、data-testidや相対XPathでの直し方を示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu Page Object Model để gom các locator này vào đúng chỗ, tránh lặp lại rải rác trong nhiều file test. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into the Page Object Model to gather these locators in the right place, avoiding duplication scattered across many test files. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、これらのロケーターを正しい場所にまとめ、多くのテストファイルに散らばる重複を避けるために、Page Object Modelを学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const LOC_01 = makeDoc({
  slug: "locator-selector-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "locator selector",
  keywords: ["locator selector", "css selector testing", "xpath testing", "data-testid", "playwright locator cho người mới"],
  coverLabel: "NGƯỜI MỚI · LOCATOR & SELECTOR · TMĐT",
  crumb: "Locator & Selector cho người mới",
  metaTitle: { vi: "Locator selector cho người mới: chọn phần tử bền vững", en: "Locator & Selector for beginners: choosing durable elements", ja: "初心者向けLocator Selector：堅牢な要素の選び方" },
  metaDescription: {
    vi: "Locator selector cho người mới: id, class, CSS, XPath, text, role, data-testid trên ShopEasy, tránh selector giòn, có code Playwright và trắc nghiệm.",
    en: "Locator selector for beginners: id, class, CSS, XPath, text, role, data-testid on the ShopEasy app, avoiding fragile selectors, with runnable Playwright getByRole/getByTestId code and a quiz.",
    ja: "初心者向けLocator Selector：ShopEasyアプリでのid、class、CSS、XPath、テキスト、role、data-testid、脆いセレクターを避ける方法、動くPlaywrightのgetByRole/getByTestIdコードとクイズ付き。",
  },
  title: {
    vi: "Locator & Selector cho người mới: chọn phần tử bền vững (CSS, XPath, data-testid)",
    en: "Locator & Selector for beginners: choosing durable elements (CSS, XPath, data-testid)",
    ja: "初心者のためのLocator・Selector：堅牢な要素の選び方（CSS、XPath、data-testid）",
  },
  summary: {
    vi: "Bài cho người mới: học cách chọn locator selector bền vững qua app TMĐT ShopEasy — id, class, CSS, XPath, text, role, data-testid; vì sao selector giòn dễ vỡ; code Playwright getByRole/getByTestId/XPath chạy được; công cụ inspect; 2 tình huống thật, nhiều mockup, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to choose durable locator selectors through the ShopEasy e-commerce app — id, class, CSS, XPath, text, role, data-testid; why fragile selectors break; runnable Playwright getByRole/getByTestId/XPath code; inspect tools; 2 real situations, many mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyを通じて堅牢なロケーターセレクターの選び方を学ぶ——id、class、CSS、XPath、テキスト、role、data-testid。脆いセレクターが壊れる理由、動くPlaywrightのgetByRole/getByTestId/XPathコード、インスペクトツール、2つの実例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chọn locator selector bền vững cho automation", steps: [
    { name: "Ưu tiên data-testid hoặc role", text: "Kiểm tra phần tử có sẵn data-testid hoặc vai trò ARIA rõ ràng trước khi nghĩ tới CSS/XPath." },
    { name: "Dùng công cụ inspect để xác nhận", text: "Mở DevTools hoặc Playwright Codegen để kiểm tra thuộc tính thật của phần tử trước khi viết locator." },
    { name: "Tránh selector giòn", text: "Không dùng class tự sinh, chỉ số vị trí, hay XPath tuyệt đối làm locator chính." },
  ] },
  pages,
});

export const AU_LOCATORS_01 = [LOC_01];
