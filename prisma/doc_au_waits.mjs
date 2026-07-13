// doc_au_waits.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Waits (chờ) & xử lý bất đồng bộ trong automation — vì sao test tự động hay "flaky" vì thời gian,
// implicit vs explicit wait, auto-waiting của Playwright, chờ phần tử/điều kiện thay vì sleep cứng,
// và cách đặt timeout hợp lý. Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright
// chạy được. Gắn app TMĐT ShopEasy (trang sản phẩm tải dữ liệu bất đồng bộ). Song ngữ vi/en/ja
// (ja ≠ en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, annotate, grid, jira, kanban, stateDiagram } from "./ui_mock.mjs";

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

// ── Mockup 1: ShopEasy đang tải dữ liệu sản phẩm bất đồng bộ, chú thích locator lúc "loading" ──
const m_loading = browser("shopeasy.vn/san-pham", [
  panel("ShopEasy · Trang sản phẩm (đang tải)", [
    `<circle cx="380" cy="66" r="20" fill="none" stroke="#0891b2" stroke-width="4" stroke-dasharray="80 40"/>`,
    `<text x="380" y="112" text-anchor="middle" font-size="12.5" fill="#64748b">Đang tải dữ liệu sản phẩm từ server...</text>`,
    `<rect x="24" y="136" width="712" height="56" rx="8" fill="#eef2f7"/>`,
    `<rect x="24" y="202" width="712" height="56" rx="8" fill="#eef2f7"/>`,
    annotate(20, 132, 720, 130, 'Locator: .product-list[data-state="loading"] — DOM đã có nhưng CHƯA đúng nội dung cần test'),
  ].join(""), { h: 292, accent: "#0891b2" }),
].join(""), { h: 348, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: bảng các loại wait phổ biến trong automation ──
const m_types_grid = grid("Các loại wait (chờ) phổ biến trong automation", ["Loại wait", "Cách hoạt động", "Khi nào nên dùng"], [
  ["Sleep cứng (hard sleep)", "Dừng đúng N giây bất kể trang đã sẵn sàng hay chưa", "Gần như không nên dùng — nguồn gây flaky hàng đầu"],
  ["Implicit wait", "Cấu hình 1 lần cho cả trình duyệt, áp dụng ngầm cho mọi lần tìm phần tử", "Selenium truyền thống; kém linh hoạt, khó đoán khi trộn nhiều điều kiện"],
  ["Explicit wait", "Chờ đến khi ĐÚNG 1 điều kiện cụ thể xảy ra, đặt ngay tại chỗ cần", "Khi cần chờ đúng điều kiện nghiệp vụ (dữ liệu tải xong, nút bật lại...)"],
  ["Auto-wait (Playwright)", "Tự động chờ phần tử 'actionable' trước mỗi hành động, không cần viết wait tay", "Mặc định cho hầu hết click/fill/hover trong Playwright hiện đại"],
  ["Polling / waitFor tuỳ biến", "Lặp kiểm tra 1 hàm điều kiện tới khi đúng hoặc hết timeout", "Điều kiện phức tạp, không có sẵn assertion dựng sẵn"],
], { accent: "#0891b2", note: "Cùng mục tiêu 'chờ đúng lúc', nhưng độ tin cậy và chi phí bảo trì rất khác nhau." });

// ── Mockup 3: vòng đời một phần tử trước khi automation được phép thao tác lên nó ──
const m_state_diagram = stateDiagram("Vòng đời chờ điều kiện của 1 phần tử trên trang ShopEasy", [
  { id: "none", label: "Chưa tồn tại", kind: "start", x: 90, y: 70 },
  { id: "attached", label: "Attached (DOM)", kind: "mid", x: 290, y: 70 },
  { id: "visible", label: "Visible", kind: "mid", x: 480, y: 70 },
  { id: "actionable", label: "Actionable", kind: "ok", x: 660, y: 70 },
  { id: "timeout", label: "Timeout → Fail", kind: "bad", x: 480, y: 230 },
], [
  { from: "none", to: "attached", label: "server trả dữ liệu, DOM render" },
  { from: "attached", to: "visible", label: "không còn display:none" },
  { from: "visible", to: "actionable", label: "không bị che, chưa disabled" },
  { from: "visible", to: "timeout", label: "quá thời gian timeout", bad: true },
], { accent: "#0891b2", h: 300 });

// ── Mockup 4: bảng so sánh sleep cứng và chờ theo điều kiện ──
const m_sleep_vs_wait = grid("Sleep cứng vs chờ theo điều kiện (chờ đúng lúc)", ["Tiêu chí", "Sleep cứng (waitForTimeout)", "Chờ theo điều kiện (expect/waitFor)"], [
  ["Khi trang tải NHANH hơn thời gian chờ", "Lãng phí thời gian chờ thừa, test chạy chậm không cần thiết", "Đi tiếp ngay khi điều kiện đúng, không phí giây nào"],
  ["Khi trang tải CHẬM hơn thời gian chờ", "Thao tác quá sớm, phần tử chưa sẵn sàng — test fail dù app không lỗi", "Tiếp tục chờ tới khi đúng điều kiện hoặc hết timeout hợp lý"],
  ["Độ ổn định (ít flaky)", "Thấp — phụ thuộc con số đoán mò, không phản ánh thực tế mạng/server", "Cao — bám sát trạng thái thật của trang tại mọi lần chạy"],
  ["Chi phí bảo trì", "Phải chỉnh số giây thủ công mỗi khi tốc độ hệ thống đổi", "Không cần chỉnh — điều kiện tự thích ứng với tốc độ thực tế"],
  ["Thời gian chạy toàn bộ suite", "Cộng dồn thời gian chờ thừa ở hàng trăm test", "Chỉ chờ đúng phần cần, tổng thời gian chạy nhanh hơn rõ rệt"],
], { accent: "#0891b2", note: "Sleep cứng là con dao hai lưỡi: không bao giờ vừa đủ cho mọi lần chạy." });

// ── Mockup 5: ticket Jira ghi lại sự cố flaky test do dùng sleep cứng quá ngắn ──
const m_jira = jira({
  key: "SE-14107", title: "Test 'hien-thi-danh-sach-san-pham' flaky: pass khi mạng nhanh, fail khi mạng chậm",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · CI pipeline chạy song song"],
    ["Nguyên nhân", "Test dùng page.waitForTimeout(2000) trước khi đọc '.product-item', trong khi API sản phẩm đôi khi mất hơn 2.5s ở môi trường CI tải cao"],
    ["Ảnh hưởng", "Test báo fail 'element not found' dù tính năng hiển thị sản phẩm hoàn toàn đúng, làm giảm niềm tin vào bộ test tự động"],
    ["Đề xuất", "Thay waitForTimeout(2000) bằng await expect(locator).toBeVisible() để chờ đúng điều kiện thay vì đoán số giây cố định"],
  ],
});

// ── Mockup 6: kanban theo dõi các lỗi flaky do timing chưa được xử lý đúng cách ──
const m_kanban = kanban("Bảng theo dõi lỗi flaky do timing (ShopEasy · Automation)", [
  { name: "Backlog", cards: [
    { key: "SE-14120", title: "Test giỏ hàng đôi khi click nút Thêm trước khi nút bật lại", sev: "Medium" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-14107", title: "Thay sleep cứng bằng expect().toBeVisible() cho trang sản phẩm", sev: "High" },
  ] },
  { name: "Review", cards: [
    { key: "SE-14098", title: "Thêm waitFor() cho tổng tiền giỏ hàng cập nhật bất đồng bộ", sev: "Medium" },
  ] },
  { name: "Done", cards: [
    { key: "SE-14080", title: "Chuẩn hoá timeout mặc định trong playwright.config.js", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Implicit wait và explicit wait khác nhau thế nào?",
  "How are implicit wait and explicit wait different?",
  "Implicit wait là 1 cấu hình đặt MỘT LẦN cho toàn bộ trình duyệt/phiên làm việc, áp dụng ngầm cho MỌI lần tìm phần tử — bạn không thấy nó xuất hiện rõ ràng trong từng bước test. Explicit wait là chờ ĐÚNG 1 điều kiện cụ thể, được viết rõ ràng ngay tại đúng chỗ trong code cần chờ (ví dụ chờ nút bật lại trước khi click). Explicit wait linh hoạt và dễ đoán hơn vì bạn kiểm soát chính xác điều kiện và vị trí chờ.",
  "Implicit wait is a setting configured ONCE for the whole browser/session, applied silently to EVERY element lookup — you don't see it explicitly in each test step. Explicit wait waits for exactly ONE specific condition, written clearly right at the point in the code where waiting is needed (e.g. waiting for a button to re-enable before clicking). Explicit wait is more flexible and predictable because you control exactly which condition and where to wait.",
  "implicit waitとexplicit waitはどう違う？",
  "implicit waitはブラウザ・セッション全体に対して一度だけ設定され、すべての要素検索に暗黙的に適用されます——各テストステップには明示的に現れません。explicit waitはちょうど1つの具体的な条件を待つもので、待機が必要なコードの箇所に明確に書かれます（例：クリック前にボタンが再度有効になるのを待つ）。explicit waitは、どの条件をどこで待つかを正確に制御できるため、より柔軟で予測しやすいです。");
const faq2 = FAQ(
  "Vì sao dùng sleep cứng (hard sleep) trong test tự động lại không tốt?",
  "Why is using a hard sleep in automated tests a bad idea?",
  "Sleep cứng dừng script đúng N giây bất kể trạng thái thực tế của trang. Nếu trang tải nhanh hơn N giây, bạn lãng phí thời gian chờ thừa; nếu trang tải chậm hơn N giây (do mạng chậm, server tải cao...), test vẫn thao tác quá sớm và fail dù ứng dụng không hề có lỗi. Vì tốc độ thực tế luôn thay đổi giữa các lần chạy, không có con số N nào là 'vừa đủ' cho mọi lần — đây chính là nguồn gốc phổ biến nhất của flaky test.",
  "A hard sleep pauses the script for exactly N seconds regardless of the page's actual state. If the page loads faster than N seconds, you waste extra time; if it loads slower than N seconds (due to slow network, high server load...), the test still acts too early and fails even though the app has no bug. Because real-world speed always varies between runs, no value of N is ever 'just right' for every run — this is the most common source of flaky tests.",
  "自動テストでハードスリープを使うのがなぜ良くない？",
  "ハードスリープは、ページの実際の状態にかかわらず、ちょうどN秒スクリプトを止めます。ページがN秒より速く読み込まれれば余計な時間を無駄にし、N秒より遅ければ（ネットワークが遅い、サーバー負荷が高いなど）テストはまだ早すぎるタイミングで操作してしまい、アプリにバグがなくても失敗します。実際の速度は実行ごとに常に変わるため、どんなNの値も毎回『ちょうど良い』ことはありません——これがflaky testの最も一般的な原因です。");
const faq3 = FAQ(
  "Playwright 'tự động chờ' (auto-wait) nghĩa là gì, tôi có còn cần viết wait thủ công không?",
  "What does Playwright's 'auto-wait' mean, do I still need to write manual waits?",
  "Auto-wait nghĩa là trước khi thực hiện hầu hết hành động (click, fill, hover...), Playwright tự kiểm tra phần tử đã 'actionable' chưa — tức là đã gắn vào DOM, hiển thị, không bị che, không disabled, và đứng yên (không còn animate) — rồi mới thao tác, mà bạn không cần viết wait thủ công cho từng bước đó. Tuy vậy, với những điều kiện mang tính NGHIỆP VỤ (ví dụ chờ đúng dòng chữ 'Đã thêm vào giỏ' xuất hiện, hay chờ tổng tiền cập nhật đúng số), bạn vẫn nên dùng explicit wait như await expect(locator).toBeVisible() hoặc waitFor() để chờ đúng điều kiện đó.",
  "Auto-wait means that before most actions (click, fill, hover...), Playwright automatically checks whether the element is 'actionable' — attached to the DOM, visible, not obscured, not disabled, and stable (no longer animating) — before acting, so you don't need to write a manual wait for each step. However, for business-specific conditions (e.g. waiting for the text 'Added to cart' to appear, or the total price to update to the correct number), you should still use an explicit wait such as await expect(locator).toBeVisible() or waitFor() for that exact condition.",
  "Playwrightの『auto-wait（自動待機）』とは何か、まだ手動でwaitを書く必要はある？",
  "auto-waitとは、ほとんどの操作（クリック、入力、ホバーなど）を行う前に、Playwrightが要素が『actionable（操作可能）』かどうか——DOMにアタッチされ、表示されており、隠れておらず、無効化されておらず、静止している（アニメーション中でない）——を自動的に確認してから操作することを意味し、各ステップに手動でwaitを書く必要はありません。ただし、ビジネス固有の条件（例：『カートに追加しました』というテキストの表示を待つ、合計金額が正しい数値に更新されるのを待つなど）については、await expect(locator).toBeVisible()やwaitFor()のようなexplicit waitをその条件のために使うべきです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao sleep cứng (page.waitForTimeout) không phải cách tốt để xử lý bất đồng bộ trong automation?", en: "Why isn't a hard sleep (page.waitForTimeout) a good way to handle asynchrony in automation?", ja: "なぜハードスリープ（page.waitForTimeout）は自動化で非同期処理を扱う良い方法ではない？" },
    options: [
      { vi: "Vì thời gian chờ cố định không khớp tốc độ thực tế: nhanh thì lãng phí, chậm thì vẫn fail", en: "Because a fixed wait time never matches real-world speed: too fast wastes time, too slow still fails", ja: "固定の待機時間が実際の速度と一致しないため：速すぎれば無駄、遅すぎればそれでも失敗する" },
      { vi: "Vì Playwright không hỗ trợ hàm waitForTimeout", en: "Because Playwright doesn't support the waitForTimeout function", ja: "Playwrightがwaitforcaimeout関数をサポートしていないため" },
      { vi: "Vì nó chỉ hoạt động trên trình duyệt Firefox", en: "Because it only works on the Firefox browser", ja: "Firefoxブラウザでしか動作しないため" },
      { vi: "Vì nó làm ứng dụng thật bị chậm đi khi người dùng thật truy cập", en: "Because it slows down the real app for real users", ja: "実際のユーザーがアクセスする際にアプリ自体を遅くするため" },
    ], correct: 0,
    explain: { vi: "Sleep cứng dùng 1 con số cố định, trong khi tốc độ tải thực tế luôn thay đổi — không có con số nào 'vừa đủ' cho mọi lần chạy.", en: "A hard sleep uses one fixed number, while real loading speed always varies — no number is ever 'just right' for every run.", ja: "ハードスリープは固定の数値を使いますが、実際の読み込み速度は常に変動します——どんな数値も毎回『ちょうど良い』ことはありません。" },
  }),
  mcq({
    q: { vi: "Sự khác biệt cốt lõi giữa implicit wait và explicit wait là gì?", en: "What is the core difference between implicit wait and explicit wait?", ja: "implicit waitとexplicit waitの核心的な違いは何？" },
    options: [
      { vi: "Implicit wait áp dụng ngầm cho mọi lần tìm phần tử; explicit wait chờ đúng 1 điều kiện cụ thể tại đúng chỗ cần", en: "Implicit wait applies silently to every element lookup; explicit wait waits for one specific condition at the exact point needed", ja: "implicit waitはすべての要素検索に暗黙的に適用され、explicit waitは必要な箇所でちょうど1つの具体的な条件を待つ" },
      { vi: "Implicit wait chỉ dùng được với API, explicit wait chỉ dùng được với giao diện", en: "Implicit wait only works with APIs, explicit wait only works with UIs", ja: "implicit waitはAPIにしか使えず、explicit waitはUIにしか使えない" },
      { vi: "Hai khái niệm này hoàn toàn giống nhau, chỉ khác tên gọi", en: "The two concepts are completely identical, just named differently", ja: "この2つの概念は全く同じで、名前が違うだけである" },
      { vi: "Explicit wait luôn nhanh hơn implicit wait trong mọi trường hợp", en: "Explicit wait is always faster than implicit wait in every case", ja: "explicit waitは常にimplicit waitより速い" },
    ], correct: 0,
    explain: { vi: "Implicit wait là cấu hình chung, áp dụng ngầm; explicit wait tường minh, kiểm soát đúng điều kiện và đúng vị trí cần chờ.", en: "Implicit wait is a global, silently-applied setting; explicit wait is explicit, giving precise control over the condition and location to wait at.", ja: "implicit waitは暗黙的に適用される全体設定であり、explicit waitは明示的で、待つべき条件と場所を正確に制御できます。" },
  }),
  mcq({
    q: { vi: "Auto-waiting (tự động chờ) của Playwright hoạt động thế nào trước khi click/fill một phần tử?", en: "How does Playwright's auto-waiting work before clicking/filling an element?", ja: "要素をクリック/入力する前に、Playwrightのauto-waitingはどう動作する？" },
    options: [
      { vi: "Tự kiểm tra phần tử đã 'actionable' (hiện, không bị che, không disabled...) trước khi thao tác, không cần viết wait tay", en: "It automatically checks the element is 'actionable' (visible, not obscured, not disabled...) before acting, without a manual wait", ja: "操作前に要素が『actionable』（表示、隠れていない、無効化されていないなど）かを自動的に確認し、手動waitは不要" },
      { vi: "Nó luôn dừng đúng 5 giây trước mọi hành động", en: "It always pauses exactly 5 seconds before every action", ja: "すべての操作の前に必ずちょうど5秒停止する" },
      { vi: "Nó bỏ qua hoàn toàn việc kiểm tra trạng thái phần tử để chạy cho nhanh", en: "It completely skips checking the element's state to run faster", ja: "実行を速くするため要素の状態確認を完全に省略する" },
      { vi: "Nó chỉ hoạt động khi bạn tự viết thêm page.waitForTimeout()", en: "It only works if you manually add page.waitForTimeout()", ja: "手動でpage.waitForTimeout()を追加した場合にのみ動作する" },
    ], correct: 0,
    explain: { vi: "Auto-wait kiểm tra actionability (attached, visible, stable, enabled...) trước hành động, giảm hẳn nhu cầu viết wait thủ công.", en: "Auto-wait checks actionability (attached, visible, stable, enabled...) before an action, greatly reducing the need for manual waits.", ja: "auto-waitは操作前にactionability（アタッチ、表示、静止、有効など）を確認し、手動waitの必要性を大きく減らします。" },
  }),
  mcq({
    q: { vi: "await expect(locator).toBeVisible() khác gì so với thao tác ngay lập tức mà không chờ?", en: "How does await expect(locator).toBeVisible() differ from acting immediately without waiting?", ja: "await expect(locator).toBeVisible()は、待たずにすぐ操作するのとどう違う？" },
    options: [
      { vi: "Nó chủ động chờ và tự retry cho tới khi phần tử hiển thị hoặc hết timeout, thay vì thao tác ngay có thể fail vì phần tử chưa sẵn sàng", en: "It actively waits and retries until the element is visible or the timeout runs out, instead of acting immediately and possibly failing because the element isn't ready", ja: "要素が表示されるかタイムアウトになるまで能動的に待機・再試行する。すぐ操作すると要素が未準備で失敗する可能性がある" },
      { vi: "Nó không có tác dụng gì khác, chỉ là cách viết dài hơn", en: "It has no real effect, it's just a longer way to write the same thing", ja: "実質的な効果はなく、単に長い書き方に過ぎない" },
      { vi: "Nó khiến test luôn fail nếu phần tử chưa có sẵn ngay từ đầu", en: "It makes the test always fail if the element isn't present right from the start", ja: "要素が最初から存在しなければ必ずテストを失敗させる" },
      { vi: "Nó chỉ hoạt động với các phần tử input, không dùng được với danh sách sản phẩm", en: "It only works with input elements, not with a product list", ja: "input要素にしか使えず、商品リストには使えない" },
    ], correct: 0,
    explain: { vi: "expect().toBeVisible() là explicit wait: tự retry theo điều kiện, chỉ fail khi thật sự hết timeout mà điều kiện vẫn sai.", en: "expect().toBeVisible() is an explicit wait: it retries against the condition and only fails once the timeout truly runs out while the condition is still false.", ja: "expect().toBeVisible()はexplicit waitです：条件に対して再試行し、タイムアウトが本当に切れても条件が満たされない場合にのみ失敗します。" },
  }),
  mcq({
    q: { vi: "Đặt timeout chờ quá dài cho một điều kiện có thể gây ra vấn đề gì?", en: "What problem can setting too long a timeout for a wait condition cause?", ja: "待機条件のタイムアウトを長く設定しすぎると、どんな問題が起こりうる？" },
    options: [
      { vi: "Khi điều kiện thật sự không bao giờ đúng (có bug thật), test phải đợi rất lâu mới báo fail, làm chậm cả pipeline CI", en: "When the condition genuinely never becomes true (a real bug), the test must wait a long time before failing, slowing down the whole CI pipeline", ja: "条件が本当に真にならない場合（実際のバグ）、テストが失敗を報告するまでに非常に長く待たされ、CIパイプライン全体が遅くなる" },
      { vi: "Test sẽ luôn pass ngay cả khi ứng dụng có lỗi thật", en: "The test will always pass even if the app has a real bug", ja: "アプリに本当のバグがあってもテストは常に成功する" },
      { vi: "Trình duyệt sẽ tự động đóng lại giữa chừng", en: "The browser will automatically close halfway through", ja: "ブラウザが途中で自動的に閉じてしまう" },
      { vi: "Không có tác động gì, timeout càng dài càng an toàn trong mọi trường hợp", en: "There's no impact at all, longer timeout is always safer in every case", ja: "何の影響もなく、タイムアウトは長ければ長いほど常に安全である" },
    ], correct: 0,
    explain: { vi: "Timeout hợp lý là cân bằng: đủ dài để không fail oan lúc hệ thống chậm bình thường, nhưng không quá dài khiến bug thật mất nhiều thời gian mới lộ ra.", en: "A sensible timeout balances two needs: long enough to avoid false failures during normal slowness, but not so long that a real bug takes forever to surface.", ja: "適切なタイムアウトはバランスが重要です：通常の遅さで誤って失敗しない程度に長く、しかし本当のバグが表面化するまで永遠にかからない程度に短くする必要があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Waits automation là kỹ năng chờ đúng thời điểm trong test tự động: thay vì đoán mò bằng sleep cứng, bạn chờ đúng điều kiện (phần tử hiện, dữ liệu tải xong) rồi mới thao tác. Bài này bám trang sản phẩm tải bất đồng bộ của ShopEasy: vì sao test hay 'flaky' do thời gian, implicit vs explicit wait, auto-wait của Playwright, và cách viết await expect()/waitFor() chạy được thật, kèm timeout hợp lý. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Waits automation is the skill of waiting for the right moment in automated tests: instead of guessing with a hard sleep, you wait for the right condition (element visible, data loaded) before acting. This article follows ShopEasy's asynchronously loading product page: why tests get 'flaky' due to timing, implicit vs explicit wait, Playwright's auto-wait, and how to write real, runnable await expect()/waitFor() code, plus sensible timeouts. Lots of visuals and a quiz at the end.",
        "Waits automationとは、自動テストで正しいタイミングを待つスキルです。ハードスリープで当てずっぽうに待つのではなく、正しい条件（要素が表示された、データが読み込まれた）を待ってから操作します。本記事は非同期でデータを読み込むShopEasyの商品ページに沿い、なぜテストが時間のせいで『flaky（不安定）』になるのか、implicit waitとexplicit waitの違い、Playwrightのauto-wait、そして実際に動くawait expect()/waitFor()コードの書き方、適切なタイムアウトの設定を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi mới học automation, bạn sẽ sớm gặp một hiện tượng khó chịu: test chạy pass lúc này, fail lúc khác, dù bạn không hề sửa gì. Thủ phạm phổ biến nhất chính là 'thời gian' — cụ thể là việc trang web tải dữ liệu bất đồng bộ (gọi API, render danh sách sản phẩm...) mất một khoảng thời gian không cố định. Nếu script automation thao tác 'quá sớm', trước khi dữ liệu thật sự sẵn sàng, test sẽ fail dù ứng dụng hoàn toàn không có lỗi. Bài này giúp bạn hiểu đúng cơ chế 'chờ' trong automation, qua trang sản phẩm ShopEasy — nơi danh sách sản phẩm chỉ xuất hiện sau khi gọi API xong.",
        "Hi, newcomer! Early in learning automation, you'll soon hit an annoying phenomenon: a test passes this time, fails the next, even though you changed nothing. The most common culprit is 'timing' — specifically, a web page loading data asynchronously (calling an API, rendering a product list...) taking an unpredictable amount of time. If your automation script acts 'too early', before the data is actually ready, the test fails even though the app has no bug at all. This article helps you truly understand the 'waiting' mechanism in automation, through ShopEasy's product page — where the product list only appears after an API call completes.",
        "こんにちは、初心者さん！自動化を学び始めると、すぐに厄介な現象に出会います：何も変更していないのに、あるときはテストが通り、あるときは失敗する。最も多い原因は『タイミング』です——具体的には、ウェブページがデータを非同期で読み込む（APIを呼ぶ、商品リストを描画するなど）のにかかる時間が一定ではないことです。自動化スクリプトがデータが本当に準備できる『前』に操作してしまうと、アプリには何のバグもないのにテストが失敗します。本記事は、APIの呼び出しが完了して初めて商品リストが表示されるShopEasyの商品ページを通じて、自動化における『待機』の仕組みを正しく理解する手助けをします。"),
      IMG(m_loading, "Màn hình test: ShopEasy đang tải dữ liệu sản phẩm bất đồng bộ, chú thích locator ở trạng thái 'đang tải'", "Screen under test: ShopEasy loading product data asynchronously, annotated with the locator at the 'loading' state", "テスト対象画面：ShopEasyが商品データを非同期で読み込み中、『loading』状態のロケーターを注記"),
      DEF("Wait (chờ)", "hành động khiến automation TẠM DỪNG một cách có chủ đích cho tới khi 1 điều kiện cụ thể đúng, hoặc hết thời gian timeout cho phép.",
        "an action that deliberately pauses automation until a specific condition becomes true, or until the allowed timeout runs out.",
        "特定の条件が真になるまで、または許容されたタイムアウトが切れるまで、意図的に自動化を一時停止させる操作。"),
    ] },
  { heading: { vi: "2. Vấn đề: vì sao test tự động hay 'flaky' vì thời gian", en: "2. The problem: why automated tests get 'flaky' due to timing", ja: "2. 問題：なぜ自動テストはタイミングのせいで『flaky』になるのか" },
    blocks: [
      P("Web hiện đại hiếm khi tải xong mọi thứ ngay lập tức. Khi bạn mở trang sản phẩm ShopEasy, trình duyệt trả về khung HTML rỗng trước, rồi JavaScript mới gọi API lấy danh sách sản phẩm, và chỉ khi API trả lời xong, danh sách mới được render lên màn hình. Khoảng thời gian giữa 'mở trang' và 'dữ liệu thật sự sẵn sàng' không cố định — nó phụ thuộc tốc độ mạng, tải server, và có thể khác nhau ở mỗi lần chạy dù cùng một môi trường.",
        "Modern web pages rarely load everything instantly. When you open ShopEasy's product page, the browser first returns an empty HTML shell, then JavaScript calls an API to fetch the product list, and only once the API responds does the list get rendered on screen. The time between 'opening the page' and 'the data actually being ready' isn't fixed — it depends on network speed, server load, and can vary between runs even in the same environment.",
        "現代のウェブページは、すべてが即座に読み込まれることはほとんどありません。ShopEasyの商品ページを開くと、ブラウザはまず空のHTMLの骨組みを返し、その後JavaScriptがAPIを呼び出して商品リストを取得し、APIが応答して初めてリストが画面に描画されます。『ページを開く』ことと『データが実際に準備できる』ことの間の時間は一定ではありません——ネットワーク速度やサーバー負荷に依存し、同じ環境でも実行ごとに異なることがあります。"),
      P("Script automation thường chạy nhanh hơn nhiều so với tốc độ con người click chuột — và đôi khi còn nhanh hơn cả tốc độ trang web render xong. Nếu script viết '.product-item' ngay sau page.goto(), có khả năng thật cao là lúc đó server vẫn đang xử lý response, danh sách sản phẩm chưa hề tồn tại trên DOM. Kết quả: test báo lỗi 'element not found', dù chỉ vài trăm mili-giây sau đó, phần tử này xuất hiện hoàn toàn bình thường. Đây chính là bản chất của một race condition trong automation — automation 'đến trước' dữ liệu thật.",
        "Automation scripts often run much faster than a human clicking — sometimes even faster than the page finishing its render. If a script looks for '.product-item' right after page.goto(), there's a real chance the server is still processing the response and the product list doesn't exist in the DOM yet. The result: the test reports 'element not found', even though the element appears perfectly normally a few hundred milliseconds later. This is exactly the nature of a race condition in automation — the automation 'arrives before' the real data.",
        "自動化スクリプトは人間がクリックするより遥かに速く動くことが多く——時にはページの描画が終わるより速いこともあります。スクリプトがpage.goto()の直後に'.product-item'を探すと、その時点でサーバーがまだレスポンスを処理中で、商品リストがDOMにまだ存在しない可能性が非常に高くなります。結果として、その要素はわずか数百ミリ秒後には全く正常に現れるにもかかわらず、テストは『要素が見つからない』と報告します。これはまさに自動化におけるレースコンディション——自動化が実データより『先に到着する』現象——の本質です。"),
      IMG(m_types_grid, "Bảng tổng hợp các loại wait phổ biến trong automation và khi nào nên dùng", "A table summarizing common wait types in automation and when to use each", "自動化でよく使われる待機の種類とその使いどころをまとめた表"),
      DEF("Flaky test", "một test đôi khi pass, đôi khi fail dù code test và ứng dụng không hề đổi giữa các lần chạy — nguyên nhân phổ biến nhất là chờ sai thời điểm.",
        "a test that sometimes passes and sometimes fails even though neither the test code nor the app changes between runs — the most common cause is waiting at the wrong moment.",
        "テストコードもアプリも実行ごとに変わっていないのに、時に成功し時に失敗するテスト——最も一般的な原因は、間違ったタイミングで待機していることである。"),
    ] },
  { heading: { vi: "3. Sleep cứng (hard sleep) — vì sao là cách tệ nhất", en: "3. Hard sleep — why it's the worst approach", ja: "3. ハードスリープ — なぜ最悪の方法なのか" },
    blocks: [
      P("Phản xạ tự nhiên của người mới khi gặp lỗi 'element not found' là thêm một dòng dừng cứng: page.waitForTimeout(2000) — chờ đúng 2 giây rồi mới thao tác tiếp. Cách này có vẻ giải quyết được vấn đề trước mắt, nhưng thực chất chỉ đang 'đoán mò' một con số, không hề dựa vào trạng thái thực tế của trang. Vấn đề lộ ra ngay khi tốc độ hệ thống thay đổi — mà điều này gần như chắc chắn sẽ xảy ra giữa các lần chạy khác nhau.",
        "A newcomer's natural reflex when hitting 'element not found' is to add a hard pause: page.waitForTimeout(2000) — wait exactly 2 seconds before continuing. This seems to solve the immediate problem, but it's really just 'guessing' a number, with no basis in the page's actual state. The problem surfaces the moment system speed changes — which is almost certain to happen between different runs.",
        "『要素が見つからない』エラーに遭遇したとき、初心者が自然に取る反応は、page.waitForTimeout(2000)のようなハードな一時停止を追加すること——ちょうど2秒待ってから続行する、というものです。これは一見、目の前の問題を解決したように見えますが、実際にはページの実際の状態に何の根拠もなく、単に数字を『当てずっぽう』しているだけです。問題は、システムの速度が変わった瞬間に表面化します——そしてこれは実行ごとにほぼ確実に起こります。"),
      SITUATION("Một tester mới viết test cho trang sản phẩm ShopEasy, thêm page.waitForTimeout(2000) ngay sau khi mở trang, rồi mới đọc '.product-item' để kiểm tra sản phẩm hiển thị đúng.", "A new tester writes a test for ShopEasy's product page, adding page.waitForTimeout(2000) right after opening the page, then reads '.product-item' to verify products display correctly.",
        "Ở máy cá nhân, mạng nhanh, API trả lời trong 400ms — test luôn pass, nhưng lãng phí gần 1.6 giây chờ vô ích mỗi lần chạy. Khi đẩy lên CI chạy song song nhiều test cùng lúc, server chịu tải cao hơn, API đôi khi mất tới 2.5 giây mới trả lời. Lúc đó test vẫn thao tác đúng sau 2 giây như đã hẹn — nhưng dữ liệu thật sự CHƯA có, và test fail với lỗi 'element not found', dù trang sản phẩm hoàn toàn không có lỗi.",
        "On the tester's own machine with fast internet, the API responds in 400ms — the test always passes, but wastes nearly 1.6 seconds waiting needlessly every run. Once pushed to CI running many tests in parallel, the server takes on higher load, and the API sometimes takes up to 2.5 seconds to respond. At that point the test still acts right at the scheduled 2 seconds — but the real data ISN'T there yet, and the test fails with 'element not found', even though the product page has no bug at all.",
        "新人テスターがShopEasyの商品ページ用のテストを書き、ページを開いた直後にpage.waitForTimeout(2000)を追加し、その後'.product-item'を読み取って商品が正しく表示されているか検証する。",
        "個人のマシンではネットワークが速く、APIは400msで応答する——テストは常に成功するが、実行のたびに約1.6秒の無駄な待機時間を費やす。並列で多数のテストを実行するCIにデプロイすると、サーバーの負荷が高くなり、APIの応答に最大2.5秒かかることがある。その時、テストは予定通り2秒後にそのまま操作するが、実データはまだ存在せず、商品ページに何のバグもないにもかかわらずテストは『要素が見つからない』というエラーで失敗する。"),
      SOLVE("Thay page.waitForTimeout(2000) bằng await expect(page.locator('.product-item').first()).toBeVisible() — chờ ĐÚNG điều kiện 'sản phẩm đầu tiên đã hiển thị', bất kể API trả lời trong 400ms hay 2.5 giây. Test chạy nhanh khi hệ thống nhanh, và vẫn đúng khi hệ thống chậm hơn bình thường một chút.",
        "Replace page.waitForTimeout(2000) with await expect(page.locator('.product-item').first()).toBeVisible() — waiting for the EXACT condition 'the first product is visible', regardless of whether the API responds in 400ms or 2.5 seconds. The test runs fast when the system is fast, and still passes correctly when the system is a bit slower than usual.",
        "page.waitForTimeout(2000)をawait expect(page.locator('.product-item').first()).toBeVisible()に置き換える——APIが400msで応答しようと2.5秒かかろうと、『最初の商品が表示された』という正確な条件を待つ。システムが速ければテストも速く実行され、通常より少し遅くても正しくパスする。"),
      IMG(m_sleep_vs_wait, "Bảng so sánh sleep cứng và chờ theo điều kiện ở cả hai kịch bản: hệ thống nhanh và hệ thống chậm", "A comparison table of hard sleep versus condition-based waiting, in both a fast-system and a slow-system scenario", "システムが速い場合と遅い場合の両方における、ハードスリープと条件ベースの待機の比較表"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố flaky test do sleep cứng quá ngắn so với tốc độ thật của API", "A bug ticket recording a flaky test incident caused by a hard sleep shorter than the API's real response time", "APIの実際の応答時間より短いハードスリープが原因のflakyテストのインシデントを記録したバグチケット"),
      RECAP(["Sleep cứng dùng 1 con số cố định, không phản ánh tốc độ thực tế đang đổi liên tục", "Chờ theo điều kiện luôn 'vừa đủ': nhanh thì đi ngay, chậm thì vẫn đợi đúng"],
        ["A hard sleep uses one fixed number that never reflects the constantly changing real speed", "Condition-based waiting is always 'just enough': fast means proceed right away, slow means it still waits correctly"],
        ["ハードスリープは常に変動する実際の速度を反映しない固定の数値を使う", "条件ベースの待機は常に『ちょうど良い』——速ければすぐ進み、遅くても正しく待つ"]),
    ] },
  { heading: { vi: "4. Implicit wait là gì & vì sao có giới hạn", en: "4. What implicit wait is & its limitations", ja: "4. implicit waitとは何か・その限界" },
    blocks: [
      P("Implicit wait là một cấu hình đặt MỘT LẦN ở cấp trình duyệt hoặc phiên làm việc: 'nếu tìm không thấy phần tử ngay, hãy tự động thử lại trong tối đa N giây trước khi báo lỗi'. Cấu hình này áp dụng ngầm cho MỌI lần tìm phần tử trong suốt phiên, bạn không cần viết lại ở từng dòng code. Đây là cách tiếp cận phổ biến trong các công cụ automation thế hệ cũ như Selenium WebDriver truyền thống.",
        "Implicit wait is a setting configured ONCE at the browser or session level: 'if an element isn't found right away, automatically retry for up to N seconds before reporting an error'. This setting applies silently to EVERY element lookup throughout the session, without you rewriting it at each line of code. This is a common approach in older-generation automation tools like traditional Selenium WebDriver.",
        "implicit waitは、ブラウザまたはセッションレベルで一度だけ設定される設定です：『要素がすぐに見つからない場合、エラーを報告する前に最大N秒間自動的に再試行する』というものです。この設定はセッション全体を通じてすべての要素検索に暗黙的に適用され、各行のコードに書き直す必要はありません。これは従来型のSelenium WebDriverのような、古い世代の自動化ツールでよく見られるアプローチです。"),
      P("Giới hạn lớn nhất của implicit wait là tính 'tất cả hoặc không có gì': cùng một con số N giây áp dụng cho MỌI phần tử, dù đó là một nút bấm luôn có sẵn ngay lập tức, hay một danh sách sản phẩm cần chờ API trả lời. Nếu N quá ngắn, những phần tử cần chờ lâu vẫn fail; nếu N quá dài, mọi lần tìm phần tử không thấy (kể cả lỗi thật của ứng dụng) đều phải đợi rất lâu mới báo lỗi, làm chậm cả bộ test. Ngoài ra, khi trộn implicit wait với explicit wait, hành vi chờ có thể trở nên khó đoán, vì hai cơ chế cộng dồn lên nhau theo cách không rõ ràng.",
        "Implicit wait's biggest limitation is its 'all or nothing' nature: the same N-second number applies to EVERY element, whether it's a button that's always instantly available or a product list that needs to wait for an API response. If N is too short, elements that genuinely need longer still fail; if N is too long, every failed lookup (including genuine app bugs) takes a long time to report, slowing down the whole suite. Also, mixing implicit wait with explicit wait can make waiting behavior unpredictable, since the two mechanisms stack in unclear ways.",
        "implicit waitの最大の限界は『オール・オア・ナッシング』な性質です：同じN秒という数値が、常に即座に利用可能なボタンにも、APIの応答を待つ必要がある商品リストにも、すべての要素に適用されます。Nが短すぎると、本当に長く待つ必要がある要素はそれでも失敗します。Nが長すぎると、（アプリの本当のバグを含め）見つからないすべての検索がエラー報告までに長くかかり、テストスイート全体が遅くなります。さらに、implicit waitとexplicit waitを混在させると、2つの仕組みが不明瞭な形で積み重なるため、待機の挙動が予測しにくくなることがあります。"),
      DEF("Implicit wait", "cấu hình chờ đặt 1 lần cho toàn phiên làm việc, tự động áp dụng ngầm cho mọi lần tìm phần tử, không phân biệt loại phần tử hay điều kiện cụ thể.",
        "a wait setting configured once for the whole session, silently applied to every element lookup, regardless of element type or specific condition.",
        "セッション全体に対して一度だけ設定される待機設定で、要素の種類や具体的な条件を区別せず、すべての要素検索に暗黙的に適用される。"),
      TIP("Nếu công cụ automation bạn dùng có cả implicit wait và explicit wait (như Selenium), tránh trộn cả hai — hãy chọn 1 chiến lược nhất quán để hành vi chờ luôn dễ đoán.", "If your automation tool has both implicit and explicit wait (like Selenium), avoid mixing them — pick one consistent strategy so waiting behavior stays predictable.", "使っている自動化ツールがimplicit waitとexplicit waitの両方を持つ場合（Seleniumなど）、両方を混ぜるのは避けよう——待機の挙動を常に予測可能にするため、一貫した戦略を1つ選ぼう。"),
    ] },
  { heading: { vi: "5. Explicit wait là gì & khi nào nên dùng", en: "5. What explicit wait is & when to use it", ja: "5. explicit waitとは何か・いつ使うべきか" },
    blocks: [
      P("Explicit wait là chờ ĐÚNG 1 điều kiện cụ thể, được viết tường minh ngay tại vị trí code cần chờ — thay vì áp dụng ngầm cho mọi thứ như implicit wait. Ví dụ: 'chờ đến khi danh sách sản phẩm hiển thị', 'chờ đến khi nút Thêm vào giỏ không còn bị disabled', hay 'chờ đến khi tổng tiền đổi thành đúng số mong đợi'. Mỗi lần chờ gắn liền với một mục đích nghiệp vụ rõ ràng, nên rất dễ đọc hiểu khi xem lại code sau này.",
        "Explicit wait waits for exactly ONE specific condition, written explicitly right at the point in the code where waiting is needed — instead of applying silently to everything like implicit wait. For example: 'wait until the product list is displayed', 'wait until the Add to cart button is no longer disabled', or 'wait until the total price updates to the expected number'. Each wait is tied to a clear business purpose, making the code very easy to read later.",
        "explicit waitは、implicit waitのようにすべてに暗黙的に適用されるのではなく、待機が必要なコードの箇所で明示的に書かれる、ちょうど1つの具体的な条件を待つものです。例：『商品リストが表示されるまで待つ』『カートに追加ボタンが無効化されなくなるまで待つ』『合計金額が期待通りの数値に更新されるまで待つ』など。それぞれの待機は明確なビジネス目的に結びついているため、後でコードを読み返すときに非常に理解しやすくなります。"),
      P("Sức mạnh của explicit wait là khả năng chờ đúng NGỮ CẢNH, không phải chờ đúng một khoảng thời gian mù quáng. Khi trang ShopEasy đổi cách tải dữ liệu (ví dụ API nhanh hơn nhờ cache), explicit wait tự động 'đi tiếp' sớm hơn mà không cần sửa code — vì điều kiện chờ (phần tử hiển thị) đã đúng sớm hơn. Đây chính là lý do explicit wait được xem là nền tảng cho cả implicit lẫn auto-wait hiện đại: dù cơ chế bên dưới khác nhau, mục tiêu cuối cùng luôn là 'chờ đúng điều kiện, không chờ đúng con số'.",
        "The power of explicit wait is its ability to wait for the right CONTEXT, not blindly for a fixed duration. When ShopEasy's page changes how it loads data (e.g. the API gets faster thanks to caching), explicit wait automatically 'moves on' sooner without any code change — because the wait condition (element visible) becomes true sooner. This is exactly why explicit wait is considered the foundation for both implicit wait and modern auto-wait: no matter how the underlying mechanism differs, the ultimate goal is always 'wait for the right condition, not the right number'.",
        "explicit waitの強みは、当てずっぽうな一定時間ではなく、正しい『文脈』を待てることです。ShopEasyのページがデータの読み込み方法を変えた場合（例：キャッシュによりAPIが速くなった場合）、explicit waitはコードを変更することなく自動的に早く『先に進み』ます——待機条件（要素が表示される）がより早く真になるからです。これこそ、explicit waitがimplicit waitと最新のauto-waitの両方の基盤とみなされる理由です：内部の仕組みがどう違っても、最終的な目標は常に『正しい数値を待つのではなく、正しい条件を待つ』ことです。"),
      DEF("Explicit wait", "chờ tường minh cho ĐÚNG 1 điều kiện cụ thể tại đúng vị trí code cần chờ, thay vì áp dụng ngầm cho mọi thứ như implicit wait.",
        "an explicit wait for exactly ONE specific condition, at the exact point in the code where waiting is needed, instead of applying silently to everything like implicit wait.",
        "implicit waitのようにすべてに暗黙的に適用されるのではなく、待機が必要なコードの箇所で、ちょうど1つの具体的な条件を明示的に待つこと。"),
      TIP("Đặt tên biến/điều kiện chờ theo đúng ý nghĩa nghiệp vụ (vd 'chờ sản phẩm hiển thị', không phải 'chờ 2 giây') — code sẽ tự giải thích được lý do chờ khi người khác đọc lại.", "Name your wait conditions after their business meaning (e.g. 'wait for product visible', not 'wait 2 seconds') — the code then explains itself when someone else reads it later.", "待機条件はビジネス上の意味に沿って名付けよう（例：『2秒待つ』ではなく『商品の表示を待つ』）——そうすればコードが後で読む人に待機の理由を自ら説明してくれる。"),
    ] },
  { heading: { vi: "6. Auto-waiting của Playwright — cơ chế 'chờ sẵn sàng' phía sau await", en: "6. Playwright's auto-waiting — the 'readiness' mechanism behind await", ja: "6. Playwrightのauto-waiting — awaitの裏にある『準備完了』の仕組み" },
    blocks: [
      P("Playwright đưa khái niệm explicit wait lên một tầm cao mới bằng cách tích hợp NGẦM cơ chế chờ vào hầu hết mọi hành động, gọi là auto-waiting (tự động chờ). Trước khi thực hiện click(), fill(), hay hover(), Playwright tự kiểm tra phần tử đã đạt trạng thái 'actionable' (có thể thao tác được) hay chưa — bao gồm: đã gắn vào DOM (attached), đang hiển thị (visible), không bị phần tử khác che (not obscured), chưa bị vô hiệu hoá (enabled), và đã đứng yên, không còn animate (stable).",
        "Playwright takes the concept of explicit wait to a new level by silently building the waiting mechanism into most actions, called auto-waiting. Before performing click(), fill(), or hover(), Playwright automatically checks whether the element has reached an 'actionable' state — including: attached to the DOM, visible, not obscured by another element, enabled, and stable (no longer animating).",
        "Playwrightは、auto-waiting（自動待機）と呼ばれる仕組みをほとんどの操作に暗黙的に組み込むことで、explicit waitの概念を新たな段階へと引き上げています。click()、fill()、hover()を実行する前に、Playwrightは要素が『actionable（操作可能）』な状態に達しているかを自動的に確認します——これにはDOMにアタッチされている（attached）、表示されている（visible）、他の要素に隠れていない（not obscured）、無効化されていない（enabled）、静止しアニメーション中でない（stable）ことが含まれます。"),
      P("Nói cách khác, bạn không cần tự viết 'chờ nút hiện lên rồi mới click' — chỉ cần gọi locator.click(), Playwright sẽ tự lo phần chờ đó, và chỉ báo lỗi khi thật sự hết thời gian timeout mà phần tử vẫn chưa actionable. Đây là lý do vì sao code Playwright hiện đại thường trông 'gọn gàng' hơn hẳn so với các script Selenium cũ đầy rẫy các dòng wait thủ công. Tuy vậy, auto-wait chỉ xử lý phần TRẠNG THÁI GIAO DIỆN của phần tử — nó không tự biết được logic nghiệp vụ như 'tổng tiền đã cập nhật đúng số tiền mong đợi', nên với những điều kiện đó, bạn vẫn cần viết explicit wait riêng bằng expect() hoặc waitFor().",
        "In other words, you don't need to manually write 'wait for the button to appear, then click' — just call locator.click(), and Playwright handles the waiting for you, only reporting an error once the timeout truly runs out while the element still isn't actionable. This is why modern Playwright code tends to look far 'cleaner' than old Selenium scripts full of manual wait lines. However, auto-wait only handles the element's UI STATE — it doesn't automatically know business logic like 'the total has updated to the expected amount', so for those conditions you still need to write an explicit wait yourself using expect() or waitFor().",
        "言い換えれば、『ボタンが現れるのを待ってからクリックする』と自分で書く必要はありません——locator.click()を呼ぶだけで、Playwrightがその待機を代わりに処理し、要素が本当にactionableにならないままタイムアウトが切れたときだけエラーを報告します。これが、最新のPlaywrightのコードが、手動のwait行だらけの古いSeleniumスクリプトよりもはるかに『すっきり』見える理由です。しかし、auto-waitは要素のUI状態しか扱いません——『合計金額が期待した金額に更新された』といったビジネスロジックは自動的には分かりません。そのため、そうした条件についてはexpect()やwaitFor()を使って自分でexplicit waitを書く必要があります。"),
      IMG(m_state_diagram, "Sơ đồ vòng đời một phần tử ShopEasy phải trải qua trước khi Playwright cho phép thao tác lên nó", "Lifecycle diagram of a ShopEasy element as it must progress before Playwright allows an action on it", "PlaywrightがShopEasyの要素への操作を許可する前に、その要素がたどるライフサイクル図"),
      DEF("Actionable", "trạng thái của 1 phần tử đã sẵn sàng để thao tác: gắn vào DOM, hiển thị, không bị che, chưa bị vô hiệu hoá, và đứng yên (không còn animate).",
        "the state of an element being ready to interact with: attached to the DOM, visible, not obscured, not disabled, and stable (no longer animating).",
        "操作可能な要素の状態：DOMにアタッチされ、表示され、隠れておらず、無効化されておらず、静止（アニメーション終了）している状態。"),
    ] },
  { heading: { vi: "7. Thực hành: await expect(locator).toBeVisible() — chờ đúng điều kiện", en: "7. Hands-on: await expect(locator).toBeVisible() — waiting for the right condition", ja: "7. 実習：await expect(locator).toBeVisible() — 正しい条件を待つ" },
    blocks: [
      P("Giờ ta viết test đầu tiên cho trang sản phẩm ShopEasy, dùng đúng cách chờ theo điều kiện thay vì sleep cứng. Làm theo thứ tự dưới đây.",
        "Now let's write the first test for ShopEasy's product page, using proper condition-based waiting instead of a hard sleep. Follow the order below.",
        "では、ハードスリープの代わりに正しい条件ベースの待機を使って、ShopEasyの商品ページ用の最初のテストを書きましょう。以下の順に沿って進めましょう。"),
      STEP(1, "Mở trang sản phẩm bằng page.goto('https://shopeasy.vn/san-pham') — KHÔNG thêm bất kỳ dòng waitForTimeout nào ngay sau đó.", "Open the product page with page.goto('https://shopeasy.vn/san-pham') — do NOT add any waitForTimeout line right after it.", "page.goto('https://shopeasy.vn/san-pham')で商品ページを開く——その直後にwaitForTimeoutの行を絶対に追加しない。"),
      STEP(2, "Lấy locator cho sản phẩm đầu tiên: page.locator('.product-item').first().", "Get the locator for the first product: page.locator('.product-item').first().", "最初の商品のロケーターを取得する：page.locator('.product-item').first()。"),
      STEP(3, "Dùng await expect(locator).toBeVisible() để CHỜ đúng điều kiện phần tử hiển thị, thay vì đọc nội dung ngay lập tức.", "Use await expect(locator).toBeVisible() to WAIT for the exact condition that the element is visible, instead of reading its content right away.", "すぐに内容を読み取るのではなく、await expect(locator).toBeVisible()を使って要素が表示されるという正確な条件を待つ。"),
      STEP(4, "Sau khi chắc chắn phần tử đã hiển thị, mới đọc textContent() hoặc kiểm tra các thuộc tính khác của nó.", "Only after being certain the element is visible, read its textContent() or check its other attributes.", "要素が表示されていることを確認した後で初めて、textContent()を読んだり他の属性を確認したりする。"),
      CODE("javascript", "// tests/san-pham.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('hien thi danh sach san pham sau khi tai xong', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/san-pham');\n\n  const firstProduct = page.locator('.product-item').first();\n\n  // Cho DUNG dieu kien: phan tu da hien thi, khong doan mo so giay\n  await expect(firstProduct).toBeVisible();\n\n  // Chi doc noi dung SAU KHI da chac chan phan tu san sang\n  await expect(firstProduct.locator('.product-name')).not.toBeEmpty();\n});"),
      TRY("Mở lại code trên và thêm 1 assertion nữa: chờ '.product-list' có ít nhất 1 phần tử con '.product-item' bằng await expect(page.locator('.product-item')).toHaveCount(...) với số lượng lớn hơn 0.", "Open the code above and add one more assertion: wait for '.product-list' to have at least one '.product-item' child using await expect(page.locator('.product-item')).toHaveCount(...) with a count greater than 0.", "上のコードを開き、もう1つアサーションを追加してみよう：await expect(page.locator('.product-item')).toHaveCount(...)を使って'.product-list'に少なくとも1つの'.product-item'子要素があることを、0より大きい数で待とう。"),
    ] },
  { heading: { vi: "8. Thực hành: waitFor() — chờ điều kiện tuỳ biến", en: "8. Hands-on: waitFor() — waiting for a custom condition", ja: "8. 実習：waitFor() — カスタム条件を待つ" },
    blocks: [
      P("Không phải điều kiện nào cũng có sẵn assertion dựng sẵn như toBeVisible(). Với giỏ hàng ShopEasy, khi bạn đổi số lượng sản phẩm, tổng tiền được cập nhật bất đồng bộ (gọi API tính lại giá) — bạn cần chờ đúng lúc tổng tiền đổi thành số mong đợi, không phải chỉ chờ phần tử hiển thị. Đây là lúc locator.waitFor() cùng các điều kiện tuỳ biến phát huy tác dụng.",
        "Not every condition has a ready-made assertion like toBeVisible(). For ShopEasy's cart, when you change a product's quantity, the total price updates asynchronously (calling an API to recalculate the price) — you need to wait for the exact moment the total changes to the expected number, not just for an element to appear. This is where locator.waitFor() with custom conditions comes in handy.",
        "toBeVisible()のような既製のアサーションがすべての条件に用意されているわけではありません。ShopEasyのカートでは、商品の数量を変更すると、合計金額が非同期に更新されます（価格再計算のAPIを呼び出す）——要素が表示されるのを待つだけでなく、合計金額が期待した数値に変わる正確な瞬間を待つ必要があります。ここでlocator.waitFor()とカスタム条件が役立ちます。"),
      STEP(1, "Sau khi gọi cartPage.setQuantity(2), KHÔNG đọc ngay totalPrice.textContent() — vì API tính giá có thể chưa trả lời xong.", "After calling cartPage.setQuantity(2), do NOT read totalPrice.textContent() immediately — the pricing API may not have responded yet.", "cartPage.setQuantity(2)を呼んだ後、totalPrice.textContent()をすぐに読まない——価格計算APIがまだ応答していない可能性がある。"),
      STEP(2, "Dùng await expect(totalPrice).toContainText(...) — bản thân assertion này đã tự retry cho tới khi đúng nội dung hoặc hết timeout.", "Use await expect(totalPrice).toContainText(...) — this assertion itself already retries until the content matches or the timeout runs out.", "await expect(totalPrice).toContainText(...)を使う——このアサーション自体が、内容が一致するかタイムアウトになるまで既に再試行する。"),
      STEP(3, "Với điều kiện phức tạp hơn không có assertion dựng sẵn (ví dụ chờ 1 phần tử biến mất KHỎI DOM hẳn), dùng locator.waitFor({ state: 'detached' }).", "For more complex conditions without a ready-made assertion (e.g. waiting for an element to fully disappear FROM the DOM), use locator.waitFor({ state: 'detached' }).", "既製のアサーションがないより複雑な条件（例：要素がDOMから完全に消えるのを待つ）には、locator.waitFor({ state: 'detached' })を使う。"),
      CODE("javascript", "// tests/gio-hang.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('cap nhat so luong thi tong tien cap nhat dung', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/gio-hang');\n\n  const totalPrice = page.locator('#cart-total');\n  const loadingSpinner = page.locator('.cart-loading');\n\n  await page.locator('#cart-quantity').fill('2');\n  await page.keyboard.press('Tab');\n\n  // Cho dieu kien tuy bien: spinner tinh gia PHAI bien mat khoi DOM\n  await loadingSpinner.waitFor({ state: 'detached', timeout: 5000 });\n\n  // Assertion tu retry cho toi khi dung noi dung hoac het timeout\n  await expect(totalPrice).toContainText('398.000');\n});"),
      TRY("Viết thêm 1 hàm waitForCartSynced(page) dùng page.waitForFunction() để chờ tới khi thuộc tính data-syncing của giỏ hàng chuyển từ 'true' sang 'false', rồi gọi hàm này trước khi đọc tổng tiền.", "Write an additional waitForCartSynced(page) function using page.waitForFunction() to wait until the cart's data-syncing attribute switches from 'true' to 'false', then call this function before reading the total.", "page.waitForFunction()を使ってwaitForCartSynced(page)という関数を追加で書き、カートのdata-syncing属性が'true'から'false'に切り替わるのを待ち、合計金額を読む前にこの関数を呼んでみよう。"),
    ] },
  { heading: { vi: "9. Timeout hợp lý: đặt bao nhiêu là đủ?", en: "9. Sensible timeouts: how much is enough?", ja: "9. 適切なタイムアウト：どのくらいが十分か？" },
    blocks: [
      P("Mọi cơ chế chờ theo điều kiện đều cần một 'giới hạn cuối cùng' gọi là timeout — nếu điều kiện vẫn sai sau khoảng thời gian này, test mới thật sự báo fail. Timeout hợp lý là sự cân bằng giữa hai rủi ro: quá NGẮN khiến test fail oan khi hệ thống chỉ đang chậm hơn bình thường một chút (ví dụ do CI chạy nhiều test song song); quá DÀI khiến khi có bug thật (phần tử thật sự không bao giờ xuất hiện), test phải đợi rất lâu mới báo lỗi, làm chậm cả pipeline CI.",
        "Every condition-based waiting mechanism needs a 'final limit' called a timeout — only once the condition remains false after this duration does the test truly report a failure. A sensible timeout balances two risks: too SHORT causes false failures when the system is just a bit slower than usual (e.g. because CI is running many tests in parallel); too LONG means that when there's a genuine bug (the element truly never appears), the test has to wait a very long time before failing, slowing down the whole CI pipeline.",
        "条件ベースの待機の仕組みには、必ず『最終的な限界』であるタイムアウトが必要です——この時間が経過しても条件が満たされない場合にのみ、テストは本当に失敗を報告します。適切なタイムアウトは2つのリスクのバランスです：短すぎると、システムが通常より少し遅いだけ（例：CIが多くのテストを並列実行しているため）なのに誤って失敗してしまいます。長すぎると、本当のバグがある場合（要素が本当に一切現れない場合）、テストが失敗を報告するまでに非常に長く待たされ、CIパイプライン全体が遅くなります。"),
      P("Playwright cho phép cấu hình timeout ở nhiều tầng: timeout mặc định cho mọi assertion expect() trong playwright.config.js, và timeout riêng cho từng lần gọi cụ thể khi cần khác biệt (ví dụ chờ 1 file tải lên mất lâu hơn bình thường). Nguyên tắc chung: đặt timeout mặc định đủ rộng để bao trùm độ trễ 'bình thường' của môi trường chạy thật (bao gồm cả CI tải cao), nhưng không nới rộng tuỳ tiện cho từng test riêng lẻ chỉ để 'test tạm pass' — nếu một điều kiện thường xuyên cần timeout dài bất thường, đó có thể là dấu hiệu cho thấy chính ứng dụng đang chậm, cần được báo lại cho đội phát triển.",
        "Playwright lets you configure timeouts at several levels: a default timeout for every expect() assertion in playwright.config.js, and a specific timeout for individual calls when needed differently (e.g. waiting for a file upload that legitimately takes longer). The general principle: set the default timeout wide enough to cover the 'normal' latency of your real running environment (including high-load CI), but don't casually widen it for individual tests just to 'make the test pass' — if a condition regularly needs an unusually long timeout, that may be a sign the app itself is slow and should be reported back to the dev team.",
        "Playwrightでは複数の階層でタイムアウトを設定できます：playwright.config.js内のすべてのexpect()アサーションに対するデフォルトタイムアウト、そして必要に応じて個別の呼び出しに対する専用のタイムアウト（例：通常より時間がかかるファイルアップロードを待つ場合）です。一般原則としては、実際の実行環境の『通常の』遅延（高負荷のCIを含む）をカバーできるだけデフォルトタイムアウトを広く設定しつつ、単に『テストを一時的にパスさせる』ためだけに個々のテストで安易に広げないことです——ある条件が定期的に異常に長いタイムアウトを必要とする場合、それはアプリ自体が遅いことを示すサインかもしれず、開発チームに報告すべきです。"),
      CODE("javascript", "// playwright.config.js\nmodule.exports = {\n  timeout: 30000,       // gioi han toi da 1 TEST duoc chay\n  expect: {\n    timeout: 5000,       // gioi han mac dinh cho MOI assertion expect()\n  },\n  use: {\n    actionTimeout: 8000, // gioi han cho hanh dong click/fill... (auto-wait)\n  },\n};\n\n// Rieng 1 dieu kien can lau hon binh thuong: dat timeout rieng tai cho goi\n// await expect(uploadStatus).toHaveText('Hoan tat', { timeout: 15000 });"),
      PITFALL("Đặt timeout toàn cục cực dài (ví dụ 60 giây) chỉ để 'né' một vài test hay fail, thay vì tìm đúng nguyên nhân. Điều này che giấu vấn đề thật và làm cả bộ test chạy chậm hẳn khi có lỗi.", "Setting a globally very long timeout (e.g. 60 seconds) just to 'dodge' a few failing tests, instead of finding the real cause. This hides the real problem and makes the whole suite run much slower whenever something is actually broken.", "本当の原因を突き止める代わりに、いくつかの失敗するテストを『避ける』ためだけに、グローバルなタイムアウトを非常に長く（例：60秒）設定すること。これは本当の問題を隠し、何かが実際に壊れているときにテストスイート全体を大幅に遅くする。"),
    ] },
  { heading: { vi: "10. Tình huống 2: click trước khi phần tử sẵn sàng & lỗi hay gặp", en: "10. Situation 2: clicking before the element is ready & common mistakes", ja: "10. シーン2：要素が準備できる前にクリックする・よくある失敗" },
    blocks: [
      SITUATION("Một test giỏ hàng ShopEasy gọi cartPage.setQuantity(3) rồi ngay lập tức gọi checkoutButton.click(), vì tester tin rằng nút Thanh toán luôn có sẵn trên màn hình.", "A ShopEasy cart test calls cartPage.setQuantity(3) and immediately calls checkoutButton.click() right after, because the tester assumes the Checkout button is always available on screen.",
        "Thực tế, sau khi đổi số lượng, ShopEasy tạm thời VÔ HIỆU HOÁ nút Thanh toán (disabled) trong lúc tính lại tổng tiền, rồi mới bật lại khi tính xong. Vì click() được gọi ngay lập tức, có lúc nút vẫn còn disabled — thao tác không có tác dụng, luồng thanh toán không được kích hoạt, và bước kiểm tra sau đó fail với lỗi khó hiểu vì trông như 'nút không phản hồi', dù bản chất là click quá sớm.",
        "In reality, after the quantity changes, ShopEasy temporarily DISABLES the Checkout button while recalculating the total, then re-enables it once done. Because click() is called immediately, sometimes the button is still disabled — the action has no effect, the checkout flow isn't triggered, and the following verification step fails with a confusing error that looks like 'the button isn't responding', when the real cause is clicking too early.",
        "ShopEasyのカートテストがcartPage.setQuantity(3)を呼び出し、テスターが決済ボタンは常に画面上で利用可能だと思い込んで、その直後にcheckoutButton.click()を呼び出す。",
        "実際には、数量が変更された後、ShopEasyは合計金額を再計算している間、一時的に決済ボタンを無効化（disabled）し、計算が終わってから再度有効にします。click()が即座に呼ばれるため、ボタンがまだ無効化されたままのことがあります——操作は何の効果もなく、決済フローは起動されず、後続の検証ステップは『ボタンが反応しない』ように見える分かりにくいエラーで失敗します。実際の原因は早すぎるクリックであるにもかかわらずです。"),
      SOLVE("Thêm await expect(checkoutButton).toBeEnabled() ngay trước dòng click() — chờ đúng điều kiện 'nút đã bật lại sau khi tính giá xong', thay vì tin rằng nút luôn sẵn sàng. Nhờ auto-wait của Playwright, bản thân click() cũng đã tự kiểm tra enabled, nhưng thêm assertion tường minh giúp lỗi (nếu có) được báo rõ ràng hơn ngay tại đúng bước, thay vì lẫn vào bước sau.", "Add await expect(checkoutButton).toBeEnabled() right before the click() line — wait for the exact condition 'the button is re-enabled after pricing finishes', instead of assuming the button is always ready. Thanks to Playwright's auto-wait, click() itself already checks enabled state, but adding an explicit assertion makes any failure (if one occurs) reported clearly at the right step, instead of getting mixed into a later one.", "click()の行の直前にawait expect(checkoutButton).toBeEnabled()を追加する——ボタンが常に準備できていると思い込むのではなく、『価格計算が終わった後にボタンが再度有効になった』という正確な条件を待つ。Playwrightのauto-waitのおかげでclick()自体も既にenabled状態を確認しているが、明示的なアサーションを追加することで、（もしあれば）失敗が後続のステップに混ざらず、正しいステップで明確に報告される。"),
      IMG(m_kanban, "Bảng theo dõi các lỗi flaky do timing ở ShopEasy, và tiến độ khắc phục bằng cách chờ đúng điều kiện", "A board tracking ShopEasy's timing-related flaky bugs, and the progress of fixing them with condition-based waiting", "ShopEasyのタイミング関連のflakyバグを追跡し、条件ベースの待機で修正する進捗を示すボード"),
      PITFALL("Gọi hành động (click, fill) ngay sau một thao tác khác thay đổi trạng thái giao diện (đổi số lượng, xoá sản phẩm...) mà không chờ giao diện ổn định lại trước.", "Calling an action (click, fill) right after another action that changes the UI state (changing quantity, removing an item...) without waiting for the UI to settle first.", "数量の変更、商品の削除など、UIの状態を変える別の操作の直後に、UIが落ち着くのを待たずにアクション（クリック、入力）を呼び出すこと。"),
      PITFALL("Nhầm lẫn 'phần tử hiển thị' (visible) với 'phần tử sẵn sàng thao tác' (actionable) — một nút có thể VISIBLE nhưng vẫn đang disabled, click vào đó không có tác dụng gì.", "Confusing 'element visible' with 'element actionable' — a button can be VISIBLE yet still disabled, and clicking it has no effect.", "『要素が表示されている（visible）』と『要素が操作可能（actionable）』を混同すること——ボタンは表示されていても無効化されている場合があり、クリックしても何の効果もない。"),
      TIP("Sau bất kỳ thao tác nào có thể kích hoạt tính toán lại trên giao diện (đổi số lượng, áp mã giảm giá...), luôn thêm 1 assertion chờ trạng thái ổn định trước khi thao tác tiếp theo.", "After any action that may trigger a UI recalculation (changing quantity, applying a discount code...), always add a wait assertion for the settled state before the next action.", "UIの再計算を引き起こす可能性のある操作（数量の変更、割引コードの適用など）の後は、次の操作の前に必ず落ち着いた状態を待つアサーションを追加しよう。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Locator & Selector cho người mới", "Locators & selectors for beginners", "locator-selector-cho-nguoi-moi", "初心者のためのロケーター・セレクター"),
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model (POM) for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者のためのPage Object Model（POM）"),
      INTERNAL("Tự động hoá kiểm thử là gì cho người mới", "What is test automation for beginners", "tu-dong-hoa-kiem-thu-la-gi-cho-nguoi-moi", "初心者のためのテスト自動化とは"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học waits automation qua trang sản phẩm và giỏ hàng bất đồng bộ của ShopEasy: vì sao test tự động hay 'flaky' vì thời gian, sự khác biệt giữa implicit wait và explicit wait, cơ chế auto-waiting của Playwright, và cách viết await expect()/waitFor() thật để chờ đúng điều kiện thay vì đoán mò bằng sleep cứng, cùng cách đặt timeout hợp lý. Hai tình huống thật cho thấy chi phí của việc chờ sai thời điểm: sleep cứng khiến test vừa lãng phí thời gian vừa dễ vỡ, còn click trước khi phần tử sẵn sàng gây lỗi khó hiểu dù bản chất chỉ là thiếu 1 dòng chờ điều kiện.",
        "You just learned waits automation through ShopEasy's asynchronous product page and cart: why automated tests get 'flaky' due to timing, the difference between implicit wait and explicit wait, Playwright's auto-waiting mechanism, and how to write real await expect()/waitFor() code to wait for the right condition instead of guessing with a hard sleep, along with how to set sensible timeouts. Two real situations showed the cost of waiting at the wrong moment: a hard sleep makes tests both wasteful and prone to breaking, while clicking before an element is ready causes confusing failures that are really just missing one condition-wait line.",
        "ShopEasyの非同期な商品ページとカートを通じてwaits automationを学びました：なぜ自動テストがタイミングのせいで『flaky』になるのか、implicit waitとexplicit waitの違い、Playwrightのauto-waitingの仕組み、そしてハードスリープで当てずっぽうに待つ代わりに正しい条件を待つ実際のawait expect()/waitFor()コードの書き方、適切なタイムアウトの設定方法です。2つの実例が、間違ったタイミングで待つコストを示しました：ハードスリープはテストを無駄にしつつ壊れやすくし、要素が準備できる前にクリックすることは、実は1行の条件待機が欠けているだけなのに分かりにくい失敗を引き起こします。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về xử lý mạng (network mocking/interception) để kiểm soát chủ động tốc độ trả lời của API khi test, và cách dùng Playwright Trace Viewer để xem lại chính xác lúc nào một điều kiện chờ bị timeout. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into network mocking/interception to actively control API response speed during tests, and how to use Playwright's Trace Viewer to see exactly when a wait condition timed out. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、テスト中にAPIの応答速度を能動的に制御するためのネットワークモッキング／インターセプト、そしてPlaywrightのTrace Viewerを使って、待機条件がいつタイムアウトしたのかを正確に確認する方法を学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const WAITS_01 = makeDoc({
  slug: "waits-xu-ly-bat-dong-bo-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "waits automation",
  keywords: ["waits automation", "explicit wait", "implicit wait", "playwright auto wait", "flaky test", "chờ bất đồng bộ automation testing"],
  coverLabel: "NGƯỜI MỚI · WAITS & ASYNC · TMĐT",
  crumb: "Waits & xử lý bất đồng bộ cho người mới",
  metaTitle: { vi: "Waits Automation: chờ đúng cách cho người mới", en: "Waits Automation: waiting the right way for beginners", ja: "初心者のためのWaits Automation（正しい待ち方）" },
  metaDescription: {
    vi: "Waits automation cho người mới: vì sao chờ sai gây flaky, implicit vs explicit wait, auto-wait Playwright, chờ đúng điều kiện qua ShopEasy, kèm code chạy được.",
    en: "Waits automation for beginners: why waiting at the wrong time causes flaky tests, implicit vs explicit wait, Playwright's auto-wait, waiting for the right condition through the ShopEasy app, with runnable code.",
    ja: "初心者向けWaits automation：間違ったタイミングで待つとなぜflakyテストになるのか、implicit・explicit wait、PlaywrightのAuto-wait、ShopEasyアプリで正しい条件を待つ方法を動くコード付きで解説。",
  },
  title: {
    vi: "Waits & xử lý bất đồng bộ trong automation cho người mới (có code Playwright chạy được)",
    en: "Waits & handling asynchrony in automation for beginners (with runnable Playwright code)",
    ja: "初心者のための自動化におけるWaits（待機）と非同期処理（動くPlaywrightコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cách chờ (waits) đúng thời điểm trong automation qua app TMĐT ShopEasy. Vì sao test hay 'flaky' vì thời gian, implicit vs explicit wait, auto-waiting của Playwright, cách viết await expect()/waitFor() chạy được, timeout hợp lý, hai tình huống thật (sleep cứng, click trước khi phần tử sẵn sàng), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to wait at the right moment in automation through the ShopEasy e-commerce app. Why tests get 'flaky' due to timing, implicit vs explicit wait, Playwright's auto-waiting, how to write runnable await expect()/waitFor() code, sensible timeouts, two real situations (a hard sleep, clicking before an element is ready), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyを通じて、自動化で正しいタイミングで待つ方法を学ぶ。なぜテストがタイミングのせいで『flaky』になるのか、implicit・explicit wait、Playwrightのauto-waiting、動くawait expect()/waitFor()コードの書き方、適切なタイムアウト、2つの実例（ハードスリープ、要素準備前のクリック）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chờ đúng điều kiện thay vì sleep cứng trong automation", steps: [
    { name: "Bỏ sleep cứng", text: "Xoá page.waitForTimeout() cố định, xác định điều kiện thực sự cần chờ." },
    { name: "Viết explicit wait đúng điều kiện", text: "Dùng await expect(locator).toBeVisible() hoặc locator.waitFor() cho đúng điều kiện nghiệp vụ." },
    { name: "Đặt timeout hợp lý", text: "Cấu hình timeout đủ rộng cho môi trường thật, không nới tuỳ tiện để né lỗi." },
  ] },
  pages,
});

export const AU_WAITS_01 = [WAITS_01];
