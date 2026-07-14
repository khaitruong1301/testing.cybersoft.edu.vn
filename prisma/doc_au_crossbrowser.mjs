// doc_au_crossbrowser.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử đa trình duyệt tự động (cross-browser testing) — chạy cùng 1 bộ test trên
// Chromium/Firefox/WebKit, cấu hình "projects" trong playwright.config.js, khác biệt hiển
// thị giữa các trình duyệt, chạy song song để tiết kiệm thời gian, và giả lập viewport/
// thiết bị di động. Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright
// chạy được. Gắn app TMĐT ShopEasy (trang thanh toán). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard } from "./ui_mock.mjs";

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

// ── Mockup 1: ma trận trình duyệt cần kiểm thử cho ShopEasy ──
const m_matrix = grid("Ma trận trình duyệt cần kiểm thử · ShopEasy", ["Trình duyệt", "Tỉ lệ khách ShopEasy dùng", "Engine trong Playwright", "Ưu tiên"], [
  ["Chrome / Edge (desktop)", "58%", "chromium", "Cao"],
  ["Safari (macOS / iOS)", "22%", "webkit", "Cao"],
  ["Firefox (desktop)", "12%", "firefox", "Trung bình"],
  ["Samsung Internet (Android)", "6%", "chromium (engine gần đúng)", "Thấp"],
  ["Trình duyệt khác", "2%", "-", "Thấp"],
], { accent: "#0891b2", note: "Số liệu mô phỏng theo thống kê truy cập ShopEasy — chọn trình duyệt để test dựa trên tỉ lệ khách hàng thật sự dùng, không phải trình duyệt bạn quen code." });

// ── Mockup 2: màn thanh toán ShopEasy render lỗi riêng trên WebKit (Safari), có annotate ──
const m_webkit = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán (WebKit · Safari)", [
    field(24, 20, 660, "Ngày giao hàng mong muốn", "01/08/2026", "error"),
    field(24, 112, 660, "Mã giảm giá", "SALE10", "normal"),
    btn(24, 204, 220, "Xác nhận đặt hàng", "primary"),
    annotate(20, 10, 668, 72, "Bug chỉ có ở WebKit: input date native hiển thị khác Chrome"),
  ].join(""), { h: 280, accent: "#0891b2" }),
].join(""), { h: 336, title: "ShopEasy · WebKit (Safari)", accent: "#0891b2" });

// ── Mockup 3: cấu hình projects trong playwright.config.js ──
const m_projects = grid("Cấu hình projects trong playwright.config.js", ["Project", "Engine (browserName)", "Mô phỏng thiết bị", "Viewport"], [
  ["chromium", "chromium", "Desktop Chrome", "1280×720"],
  ["firefox", "firefox", "Desktop Firefox", "1280×720"],
  ["webkit", "webkit", "Desktop Safari", "1280×720"],
  ["Mobile Chrome", "chromium", "'Pixel 5' (devices)", "393×851"],
  ["Mobile Safari", "webkit", "'iPhone 13' (devices)", "390×844"],
], { accent: "#0891b2", note: "Mỗi project chạy TOÀN BỘ bộ test — Playwright tự nhân bản test theo từng project khi thi hành, không cần viết lại test." });

// ── Mockup 4: thiết bị giả lập thường dùng khi test ShopEasy trên di động ──
const m_devices = grid("Thiết bị giả lập thường dùng cho ShopEasy trên di động", ["Thiết bị (devices[...])", "Engine", "Viewport", "Ghi chú"], [
  ["'Pixel 5'", "chromium", "393×851", "Android Chrome thật, có user-agent mobile"],
  ["'iPhone 13'", "webkit", "390×844", "Safari iOS thật, mô phỏng notch + touch"],
  ["'iPhone 13 Pro Max'", "webkit", "428×926", "Màn lớn, kiểm layout responsive rộng hơn"],
  ["'Desktop Chrome'", "chromium", "1280×720", "Chuẩn desktop mặc định để so sánh"],
], { accent: "#0891b2", note: "devices[...] của Playwright set sẵn viewport, user-agent, deviceScaleFactor cho từng máy — không cần tự đo tay." });

// ── Mockup 5: ticket Jira ghi lại lỗi chỉ xảy ra trên 1 trình duyệt ──
const m_jira = jira({
  key: "SE-14210", title: "Nút 'Xác nhận đặt hàng' không bấm được trên Safari do lỗi CSS chỉ có ở WebKit",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "production · Safari 17 · macOS/iOS · engine WebKit"],
    ["Nguyên nhân", "CI chỉ chạy project 'chromium' trong playwright.config.js, chưa từng bật project 'webkit' nên lỗi CSS riêng của Safari không bị bắt trước khi lên production"],
    ["Ảnh hưởng", "Khách hàng dùng Safari/iPhone không đặt được đơn hàng suốt 3 ngày trước khi đội hỗ trợ phát hiện qua phản ánh của khách"],
    ["Đề xuất", "Bật bắt buộc project 'webkit' trong CI, chặn merge nếu project này fail"],
  ],
});

// ── Mockup 6: kết quả chạy song song 3 trình duyệt ──
const m_dashboard = dashboard("Kết quả chạy song song 3 trình duyệt · ShopEasy suite", [
  { label: "Chromium", value: "42/42", sub: "38s · pass 100%", color: "#16a34a" },
  { label: "Firefox", value: "41/42", sub: "41s · 1 fail (flaky)", color: "#f59e0b" },
  { label: "WebKit", value: "40/42", sub: "52s · 2 fail (CSS)", color: "#ef4444" },
  { label: "Tổng thời gian", value: "~54s", sub: "chạy song song · fullyParallel", color: "#0891b2" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử đa trình duyệt (cross-browser testing) là gì?",
  "What is cross-browser testing?",
  "Kiểm thử đa trình duyệt là chạy cùng một bộ test tự động trên nhiều trình duyệt khác nhau (Chrome, Firefox, Safari...) để phát hiện những lỗi chỉ xuất hiện ở một trình duyệt cụ thể, do mỗi trình duyệt dùng một engine hiển thị (rendering engine) riêng và có thể xử lý CSS, JavaScript, input hơi khác nhau. Với Playwright, bạn cấu hình nhiều 'projects', mỗi project ứng với một engine, rồi chạy toàn bộ test trên cả 3 mà không cần viết lại kịch bản.",
  "Cross-browser testing means running the same automated test suite across multiple browsers (Chrome, Firefox, Safari...) to catch bugs that only show up on a specific browser, since each browser uses its own rendering engine and can handle CSS, JavaScript, and input slightly differently. With Playwright, you configure multiple 'projects', each mapped to one engine, then run the whole suite across all 3 without rewriting your scripts.",
  "クロスブラウザテストとは、Chrome、Firefox、Safariなど複数のブラウザで同じ自動テストスイートを実行し、特定のブラウザだけに現れるバグを見つけることです。各ブラウザは独自のレンダリングエンジンを使い、CSS・JavaScript・入力の扱いが微妙に異なるためです。Playwrightでは複数の'projects'を設定し、それぞれを1つのエンジンに対応させれば、スクリプトを書き直さずに3つ全部でスイート全体を実行できます。");
const faq2 = FAQ(
  "WebKit trong Playwright có giống hệt Safari thật trên máy Mac/iPhone không?",
  "Does Playwright's WebKit engine behave exactly like real Safari on Mac/iPhone?",
  "Rất gần nhưng không phải 100% giống hệt. Playwright dùng chính engine WebKit (engine mã nguồn mở mà Safari dựa trên) nên bắt được phần lớn khác biệt về CSS, font, form control so với Chromium/Firefox. Tuy nhiên bản Safari thật trên macOS/iOS còn có thêm các tuỳ biến riêng của Apple (một số API, chính sách bảo mật, cách xử lý cookie) mà WebKit thuần không mô phỏng hết. Vì vậy WebKit là bước sàng lọc rất tốt, nhưng với tính năng nhạy cảm (thanh toán, đăng nhập sinh trắc học...) nên test thêm trên Safari thật trước khi phát hành.",
  "Very close, but not 100% identical. Playwright uses the actual WebKit engine (the open-source engine Safari is built on), so it catches most CSS, font, and form-control differences versus Chromium/Firefox. However, real Safari on macOS/iOS adds Apple-specific customizations (certain APIs, security policies, cookie handling) that plain WebKit doesn't fully replicate. So WebKit is a great screening step, but for sensitive features (payment, biometric login...) you should also test on real Safari before release.",
  "非常に近いですが100%同一ではありません。PlaywrightはSafariが基盤とするオープンソースエンジンであるWebKitそのものを使うため、Chromium/Firefoxとの間のCSS・フォント・フォームコントロールの違いの大部分を捉えます。ただし実際のmacOS/iOS版Safariには、一部のAPI、セキュリティポリシー、Cookieの扱いなどApple独自のカスタマイズが加わっており、素のWebKitでは完全に再現されません。そのためWebKitは優れたスクリーニング手段ですが、決済や生体認証ログインなど繊細な機能はリリース前に実機のSafariでも確認すべきです。");
const faq3 = FAQ(
  "Chạy test trên cả 3 trình duyệt cùng lúc có làm CI chậm hơn nhiều không?",
  "Does running tests on all 3 browsers at once make CI much slower?",
  "Nếu chạy 3 project TUẦN TỰ (project này xong mới tới project kia) thì đúng là tổng thời gian gần bằng cộng dồn cả 3. Nhưng Playwright cho phép chạy SONG SONG: bật fullyParallel: true trong config và tăng số workers, khi đó Chromium, Firefox, WebKit chạy đồng thời trên các tiến trình khác nhau, tổng thời gian gần bằng thời gian của project chậm nhất chứ không phải cộng dồn cả 3. Trên CI có nhiều máy, bạn còn có thể tách mỗi trình duyệt thành 1 job riêng để chạy thật sự song song ở cấp hạ tầng.",
  "If you run the 3 projects SEQUENTIALLY (one project finishes before the next starts), the total time is roughly the sum of all 3. But Playwright supports PARALLEL execution: enable fullyParallel: true in the config and raise the worker count, so Chromium, Firefox, and WebKit run at the same time in different processes, and total time is close to the slowest single project rather than the sum of all 3. On CI with multiple machines, you can even split each browser into its own job for true infrastructure-level parallelism.",
  "3つのプロジェクトを順番に（1つ終わってから次を）実行すると、合計時間はほぼ3つの合計になります。しかしPlaywrightは並列実行をサポートしています：設定でfullyParallel: trueを有効にしてworker数を増やせば、Chromium・Firefox・WebKitが異なるプロセスで同時に実行され、合計時間は3つの合計ではなく最も遅い1つのプロジェクトに近くなります。複数マシンのあるCIでは、各ブラウザを別々のジョブに分けてインフラレベルで真の並列化をすることもできます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích cốt lõi của kiểm thử đa trình duyệt (cross-browser testing) là gì?", en: "What is the core purpose of cross-browser testing?", ja: "クロスブラウザテストの核心的な目的は何？" },
    options: [
      { vi: "Phát hiện lỗi chỉ xuất hiện trên một trình duyệt cụ thể, do khác biệt engine hiển thị", en: "Catch bugs that only appear on a specific browser, due to rendering-engine differences", ja: "レンダリングエンジンの違いにより特定のブラウザだけに現れるバグを見つけること" },
      { vi: "Làm ứng dụng chạy nhanh hơn trên mọi trình duyệt", en: "Make the app run faster on every browser", ja: "アプリをすべてのブラウザで高速化すること" },
      { vi: "Thay thế hoàn toàn việc kiểm thử thủ công", en: "Completely replace manual testing", ja: "手動テストを完全に置き換えること" },
      { vi: "Tự động sửa lỗi CSS khi phát hiện", en: "Automatically fix CSS bugs when found", ja: "検出したCSSバグを自動で修正すること" },
    ], correct: 0,
    explain: { vi: "Mỗi trình duyệt dùng engine hiển thị riêng, có thể xử lý CSS/JS/input khác nhau — cross-browser testing chạy cùng test trên nhiều engine để bắt đúng những khác biệt này.", en: "Each browser uses its own rendering engine and may handle CSS/JS/input differently — cross-browser testing runs the same test across engines to catch exactly these differences.", ja: "各ブラウザは独自のレンダリングエンジンを持ち、CSS/JS/入力の扱いが異なることがあります——クロスブラウザテストは同じテストを複数エンジンで実行し、まさにこの違いを捉えます。" },
  }),
  mcq({
    q: { vi: "Trong playwright.config.js, dùng cấu hình nào để chạy test trên nhiều trình duyệt khác nhau?", en: "In playwright.config.js, what config lets you run tests on multiple browsers?", ja: "playwright.config.jsで複数ブラウザでテストを実行するにはどの設定を使う？" },
    options: [
      { vi: "Mảng 'projects', mỗi phần tử ứng với 1 trình duyệt/engine", en: "The 'projects' array, with each entry mapped to one browser/engine", ja: "各要素が1つのブラウザ/エンジンに対応する'projects'配列" },
      { vi: "Thuộc tính 'baseURL' trong use", en: "The 'baseURL' property inside use", ja: "use内の'baseURL'プロパティ" },
      { vi: "Số 'retries' khi test fail", en: "The 'retries' count for failed tests", ja: "テスト失敗時の'retries'回数" },
      { vi: "Tên file test.spec.js", en: "The test.spec.js file name", ja: "test.spec.jsというファイル名" },
    ], correct: 0,
    explain: { vi: "'projects' là mảng cấu hình, mỗi project khai báo use: { ...devices[...] } hoặc browserName riêng, Playwright tự chạy toàn bộ test trên từng project.", en: "'projects' is a config array where each entry declares use: { ...devices[...] } or its own browserName, and Playwright automatically runs the whole suite per project.", ja: "'projects'は設定配列で、各エントリがuse: { ...devices[...] }や独自のbrowserNameを宣言し、Playwrightがプロジェクトごとにスイート全体を自動実行します。" },
  }),
  mcq({
    q: { vi: "Lệnh nào chỉ chạy test trên đúng project 'webkit' đã khai báo?", en: "Which command runs tests only on the declared 'webkit' project?", ja: "宣言済みの'webkit'プロジェクトだけでテストを実行するコマンドはどれ？" },
    options: [
      { vi: "npx playwright test --project=webkit", en: "npx playwright test --project=webkit", ja: "npx playwright test --project=webkit" },
      { vi: "npx playwright install webkit", en: "npx playwright install webkit", ja: "npx playwright install webkit" },
      { vi: "npx playwright test --browser=safari", en: "npx playwright test --browser=safari", ja: "npx playwright test --browser=safari" },
      { vi: "npx playwright show-report", en: "npx playwright show-report", ja: "npx playwright show-report" },
    ], correct: 0,
    explain: { vi: "Cờ --project trỏ đúng tên project khai báo trong config; 'install' chỉ tải engine, không chạy test; 'show-report' chỉ mở báo cáo.", en: "The --project flag targets the exact project name declared in the config; 'install' only downloads the engine and doesn't run tests; 'show-report' only opens the report.", ja: "--projectフラグは設定で宣言された正確なプロジェクト名を指定します。'install'はエンジンをダウンロードするだけでテストは実行せず、'show-report'はレポートを開くだけです。" },
  }),
  mcq({
    q: { vi: "Vì sao chạy 3 project Chromium/Firefox/WebKit SONG SONG (parallel) thường nhanh hơn chạy tuần tự?", en: "Why is running the Chromium/Firefox/WebKit projects in PARALLEL usually faster than sequentially?", ja: "Chromium/Firefox/WebKitの3プロジェクトを並列実行するのが順次実行より速い理由は？" },
    options: [
      { vi: "Vì mỗi trình duyệt tự động chạy nhanh hơn khi có bạn khác chạy cùng", en: "Because each browser automatically runs faster when others run alongside it", ja: "他のブラウザが同時に動くと各ブラウザが自動的に速くなるから" },
      { vi: "Vì các project chạy đồng thời trên các tiến trình khác nhau, nên tổng thời gian gần bằng project chậm nhất thay vì cộng dồn cả 3", en: "Because projects run at the same time in different processes, so total time is close to the slowest project instead of the sum of all 3", ja: "各プロジェクトが異なるプロセスで同時に実行されるため、合計時間は3つの合計ではなく最も遅いプロジェクトに近くなるから" },
      { vi: "Vì song song sẽ bỏ qua bớt test không quan trọng", en: "Because parallel mode skips less important tests", ja: "並列実行では重要でないテストをスキップするから" },
      { vi: "Vì Playwright chỉ hỗ trợ chạy song song, không hỗ trợ tuần tự", en: "Because Playwright only supports parallel execution, not sequential", ja: "Playwrightは並列実行しかサポートせず、順次実行はサポートしないから" },
    ], correct: 1,
    explain: { vi: "fullyParallel + nhiều workers cho phép các project chạy đồng thời, nên tổng thời gian giới hạn bởi project chậm nhất chứ không phải tổng của cả 3.", en: "fullyParallel plus multiple workers lets projects run concurrently, so total time is bounded by the slowest project rather than the sum of all 3.", ja: "fullyParallelと複数のworkerにより各プロジェクトが同時に実行されるため、合計時間は3つの合計ではなく最も遅いプロジェクトによって決まります。" },
  }),
  mcq({
    q: { vi: "Trong m_devices, khai báo use: { ...devices['iPhone 13'] } giúp mô phỏng điều gì?", en: "In the devices table, declaring use: { ...devices['iPhone 13'] } emulates what?", ja: "use: { ...devices['iPhone 13'] }という宣言は何をエミュレートする？" },
    options: [
      { vi: "Viewport, user-agent và deviceScaleFactor của iPhone 13 thật, chạy trên engine WebKit", en: "The viewport, user-agent, and deviceScaleFactor of a real iPhone 13, running on the WebKit engine", ja: "実機のiPhone 13のビューポート・user-agent・deviceScaleFactorをWebKitエンジンで再現すること" },
      { vi: "Tốc độ mạng 4G thật của nhà mạng Việt Nam", en: "The real 4G network speed of a Vietnamese carrier", ja: "ベトナムの通信キャリアの実際の4G速度" },
      { vi: "Dung lượng pin còn lại của thiết bị", en: "The device's remaining battery level", ja: "端末の残りバッテリー量" },
      { vi: "Số lượng CPU core của máy chủ CI", en: "The number of CPU cores on the CI server", ja: "CIサーバーのCPUコア数" },
    ], correct: 0,
    explain: { vi: "devices[...] của Playwright là bộ cấu hình dựng sẵn: viewport, user-agent, deviceScaleFactor, hasTouch... khớp thiết bị thật, không liên quan mạng/pin/CPU.", en: "Playwright's devices[...] is a pre-built config bundle: viewport, user-agent, deviceScaleFactor, hasTouch... matching the real device, unrelated to network/battery/CPU.", ja: "Playwrightのdevices[...]は、ビューポート・user-agent・deviceScaleFactor・hasTouchなど実機に合わせた設定一式であり、ネットワークやバッテリー、CPUとは無関係です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & vì sao cần kiểm thử đa trình duyệt", en: "1. TL;DR & why cross-browser testing matters", ja: "1. 要点となぜクロスブラウザテストが必要か" },
    blocks: [
      TLDR("Kiểm thử đa trình duyệt (cross-browser testing) là chạy CÙNG một kịch bản test trên nhiều trình duyệt khác nhau — Chrome, Firefox, Safari — để chắc chắn ứng dụng hoạt động đúng ở mọi nơi khách hàng thật sự dùng, không chỉ trên trình duyệt bạn quen code. Bài này bám app TMĐT ShopEasy: bạn học cách Playwright hỗ trợ 3 engine Chromium/Firefox/WebKit qua cấu hình 'projects', cách chạy test song song trên cả 3, và cách giả lập viewport/thiết bị di động (Pixel 5, iPhone 13). AI đã tổng hợp và hệ thống hoá bài học từ hàng trăm dự án automation thực tế, giúp bạn học nhanh hơn nhiều so với tự mò từng chi tiết. Có nhiều hình minh hoạ, code Playwright chạy được và trắc nghiệm cuối bài.",
        "Cross-browser testing means running the SAME test script across multiple browsers — Chrome, Firefox, Safari — to make sure the app works correctly everywhere real customers actually use it, not just the browser you're used to coding in. This article follows ShopEasy's e-commerce app: you'll learn how Playwright supports 3 engines (Chromium/Firefox/WebKit) via the 'projects' config, how to run tests in parallel across all 3, and how to emulate viewports/mobile devices (Pixel 5, iPhone 13). AI has distilled and structured lessons from hundreds of real automation projects, helping you learn far faster than figuring everything out alone. Plenty of visuals, runnable Playwright code, and a quiz at the end.",
        "クロスブラウザテスト（cross-browser testing）とは、同じテストスクリプトをChrome、Firefox、Safariなど複数のブラウザで実行し、コードを書き慣れたブラウザだけでなく、実際の顧客が使うあらゆる環境でアプリが正しく動くことを確認することです。本記事はECアプリShopEasyに沿い、Playwrightが'projects'設定でChromium/Firefox/WebKitの3つのエンジンをどうサポートするか、3つ全てで並列にテストを実行する方法、そしてビューポート/モバイル端末（Pixel 5、iPhone 13）をエミュレートする方法を学びます。AIが数百の実際の自動化プロジェクトから教訓を蒸留し体系化しており、独学で全てを見つけ出すより遥かに速く学べます。図が豊富で、動くPlaywrightコードと最後にクイズ付き。"),
      P("Chào bạn mới! Khi vừa học automation, phản xạ tự nhiên là viết test rồi chạy thử trên trình duyệt mặc định của máy mình — thường là Chrome. Test pass, bạn yên tâm merge code. Nhưng khách hàng thật của ShopEasy không chỉ dùng Chrome: có người dùng Safari trên iPhone, có người dùng Firefox vì thói quen, có người dùng Edge tại công ty. Nếu chỉ test trên 1 trình duyệt, bạn đang bỏ sót phần lớn trải nghiệm thực tế của khách hàng. Kiểm thử đa trình duyệt giải quyết đúng vấn đề này: chạy cùng bộ test trên nhiều engine hiển thị khác nhau, phát hiện lỗi trước khi khách hàng là người phát hiện đầu tiên.",
        "Hi, newcomer! When you first learn automation, the natural instinct is to write a test and run it on your machine's default browser — usually Chrome. It passes, so you merge with confidence. But ShopEasy's real customers don't only use Chrome: some use Safari on an iPhone, some use Firefox out of habit, some use Edge at the office. Testing on just one browser means you're missing most of the real customer experience. Cross-browser testing solves exactly this: run the same suite across multiple rendering engines, catching bugs before your customer becomes the one who finds them first.",
        "こんにちは、初心者さん！自動化を学び始めると、テストを書いて自分のマシンのデフォルトブラウザ——たいていChrome——で試すのが自然な反応です。テストがパスすれば安心してマージします。しかしShopEasyの実際の顧客はChromeだけを使うわけではありません：iPhoneでSafariを使う人、習慣でFirefoxを使う人、会社でEdgeを使う人もいます。1つのブラウザだけでテストすると、実際の顧客体験の大部分を見落とすことになります。クロスブラウザテストはまさにこれを解決します：複数のレンダリングエンジンで同じスイートを実行し、顧客が最初に見つけてしまう前にバグを捉えます。"),
      IMG(m_matrix, "Ma trận trình duyệt cần kiểm thử cho ShopEasy, theo tỉ lệ khách hàng thật sự dùng", "Browser testing matrix for ShopEasy, based on the real customer usage share", "実際の顧客利用比率に基づく、ShopEasyでテストすべきブラウザのマトリクス"),
      DEF("Cross-browser testing", "chạy cùng một bộ test tự động trên nhiều trình duyệt/engine hiển thị khác nhau, để phát hiện lỗi chỉ xuất hiện ở một trình duyệt cụ thể.",
        "running the same automated test suite across multiple browsers/rendering engines, to catch bugs that only appear on a specific browser.",
        "同じ自動テストスイートを複数のブラウザ/レンダリングエンジンで実行し、特定のブラウザだけに現れるバグを見つけること。"),
    ] },
  { heading: { vi: "2. Vấn đề: chỉ test trên 1 trình duyệt, lỗi lọt sang trình duyệt khác", en: "2. The problem: testing on only 1 browser, bugs slip through on others", ja: "2. 問題：1つのブラウザだけをテストし、他のブラウザでバグが見逃される" },
    blocks: [
      P("Mỗi trình duyệt dùng một engine hiển thị (rendering engine) riêng: Chrome/Edge dùng Chromium (Blink), Firefox dùng Gecko, Safari dùng WebKit. Ba engine này được viết bởi ba đội ngũ khác nhau, tuân theo cùng chuẩn web nhưng không hoàn toàn giống nhau khi triển khai chi tiết — đặc biệt với các phần tử form 'native' như input type='date', select, hay cách trình duyệt xử lý font fallback, thanh cuộn, và một số thuộc tính CSS mới.",
        "Each browser uses its own rendering engine: Chrome/Edge use Chromium (Blink), Firefox uses Gecko, Safari uses WebKit. These three engines are built by three different teams, following the same web standards but not implementing every detail identically — especially with 'native' form elements like input type='date', select, or how each browser handles font fallback, scrollbars, and some newer CSS properties.",
        "各ブラウザは独自のレンダリングエンジンを使います：Chrome/EdgeはChromium（Blink）、FirefoxはGecko、SafariはWebKitです。この3つのエンジンは3つの異なるチームによって作られており、同じWeb標準に従いながらも、細部の実装は完全には一致しません——特にinput type='date'やselectのような『ネイティブ』フォーム要素、フォントフォールバック、スクロールバー、一部の新しいCSSプロパティの扱いなどです。"),
      P("Với ShopEasy, ta đã gặp chuyện này thật: màn thanh toán dùng input type='date' cho ô 'Ngày giao hàng mong muốn'. Trên Chrome/Chromium, ô này hiển thị định dạng và bộ chọn lịch quen thuộc. Nhưng trên WebKit (Safari), cách hiển thị và cách người dùng gõ tay ngày tháng lại khác — nếu code JavaScript của ShopEasy giả định định dạng cố định kiểu Chrome, việc parse ngày trên Safari có thể sai lệch mà test chạy trên Chrome không bao giờ phát hiện ra, vì test đó... chưa từng chạy trên Safari.",
        "With ShopEasy, this really happened: the checkout screen uses input type='date' for the 'Preferred delivery date' field. On Chrome/Chromium, this field shows the familiar format and calendar picker. But on WebKit (Safari), the display and how users type the date manually differ — if ShopEasy's JavaScript assumes a fixed Chrome-style format, date parsing on Safari can go wrong in a way a Chrome-only test would never catch, simply because that test... never ran on Safari.",
        "ShopEasyで実際にこれが起きました：決済画面の『希望配送日』欄にinput type='date'を使っています。Chrome/Chromiumではおなじみの形式とカレンダーピッカーが表示されます。しかしWebKit（Safari）では表示方法やユーザーが手入力する方法が異なります——ShopEasyのJavaScriptがChromeスタイルの固定形式を前提にしていると、Safariでの日付解析がおかしくなる可能性があり、Chromeだけで動くテストは決してそれを検出できません。単にそのテストがSafariで一度も実行されていないからです。"),
      DEF("Rendering engine (engine hiển thị)", "phần mềm lõi bên trong trình duyệt chịu trách nhiệm 'vẽ' HTML/CSS thành giao diện, và thực thi JavaScript — mỗi trình duyệt lớn dùng một engine khác nhau.",
        "the core software inside a browser responsible for 'painting' HTML/CSS into a visual interface and running JavaScript — each major browser uses a different engine.",
        "HTML/CSSをUIとして『描画』し、JavaScriptを実行する責任を持つ、ブラウザ内部のコアソフトウェア——主要ブラウザはそれぞれ異なるエンジンを使う。"),
    ] },
  { heading: { vi: "3. Ba engine mà Playwright hỗ trợ: Chromium, Firefox, WebKit", en: "3. The 3 engines Playwright supports: Chromium, Firefox, WebKit", ja: "3. Playwrightがサポートする3つのエンジン：Chromium、Firefox、WebKit" },
    blocks: [
      P("Điểm mạnh lớn nhất của Playwright cho cross-browser testing là nó cài sẵn và điều khiển trực tiếp CẢ BA engine hiển thị chính của web, không cần cài đặt driver rời cho từng trình duyệt như một số công cụ automation cũ. Chromium đại diện cho Chrome/Edge/Brave (nhóm trình duyệt chiếm thị phần lớn nhất), Firefox đại diện chính nó (engine Gecko), và WebKit đại diện cho Safari trên cả macOS và iOS.",
        "Playwright's biggest strength for cross-browser testing is that it bundles and directly drives ALL THREE major web rendering engines, without needing separate driver installs per browser like some older automation tools required. Chromium represents Chrome/Edge/Brave (the browser group with the largest market share), Firefox represents itself (the Gecko engine), and WebKit represents Safari on both macOS and iOS.",
        "クロスブラウザテストにおけるPlaywrightの最大の強みは、Webの主要な3つのレンダリングエンジンすべてを内蔵し、直接操作できることです。一部の古い自動化ツールのようにブラウザごとに個別のドライバーをインストールする必要がありません。ChromiumはChrome/Edge/Brave（最大の市場シェアを持つブラウザ群）を、Firefoxはそれautomatically自身（Geckoエンジン）を、WebKitはmacOSとiOS両方のSafariを代表します。"),
      P("Vì Playwright điều khiển engine trực tiếp (không thông qua trình duyệt Chrome/Firefox/Safari cài đặt sẵn trên máy bạn), phiên bản engine được Playwright quản lý và tải về đồng bộ mỗi khi bạn chạy npx playwright install. Điều này giúp kết quả test ổn định giữa máy bạn và máy CI — cả hai đều dùng đúng phiên bản engine như nhau, tránh tình trạng 'chạy được trên máy tôi' nhưng lỗi trên CI chỉ vì phiên bản trình duyệt khác nhau.",
        "Because Playwright drives the engines directly (not through the Chrome/Firefox/Safari browser already installed on your machine), the engine versions are managed and downloaded consistently by Playwright every time you run npx playwright install. This keeps test results stable between your machine and CI — both use the exact same engine version, avoiding the classic 'works on my machine' failure caused purely by different browser versions.",
        "Playwrightはエンジンを直接操作するため（あなたのマシンに既にインストールされているChrome/Firefox/Safariブラウザを経由しません）、npx playwright installを実行するたびにPlaywrightがエンジンのバージョンを一貫して管理・ダウンロードします。これにより、あなたのマシンとCIの間でテスト結果が安定します——両方が全く同じエンジンバージョンを使うため、ブラウザバージョンの違いだけで生じる典型的な『自分のマシンでは動く』問題を避けられます。"),
      TIP("Muốn học bài bản cả automation lẫn cross-browser testing với dự án thực tế, không chỉ đọc lý thuyết, một khoá học có mentor hướng dẫn từng bước như https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ sẽ giúp bạn rút ngắn thời gian tự mò mẫm rất nhiều.", "If you want to learn both automation and cross-browser testing properly with real projects, not just theory, a course with mentors guiding you step by step — like https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ — helps you cut down a lot of time spent figuring things out alone.", "理論だけでなく実際のプロジェクトで自動化とクロスブラウザテストの両方を体系的に学びたいなら、メンターが一歩ずつ指導するコース——https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のような——が、独学で試行錯誤する時間を大きく短縮してくれます。"),
    ] },
  { heading: { vi: "4. Cấu hình projects trong playwright.config.js (thực hành)", en: "4. Configuring projects in playwright.config.js (hands-on)", ja: "4. playwright.config.jsでprojectsを設定する（実習）" },
    blocks: [
      P("Trong Playwright, mỗi trình duyệt/thiết bị muốn test được khai báo thành một 'project' trong file playwright.config.js. Khi bạn chạy npx playwright test mà không chỉ định project, Playwright sẽ tự chạy TOÀN BỘ bộ test trên TỪNG project khai báo — bạn không cần viết lại kịch bản test cho từng trình duyệt.",
        "In Playwright, every browser/device you want to test is declared as a 'project' inside playwright.config.js. When you run npx playwright test without specifying a project, Playwright automatically runs the ENTIRE test suite on EACH declared project — you never need to rewrite your test scripts per browser.",
        "Playwrightでは、テストしたい各ブラウザ/デバイスをplaywright.config.js内で'project'として宣言します。プロジェクトを指定せずnpx playwright testを実行すると、Playwrightは宣言された各プロジェクトでテストスイート全体を自動的に実行します——ブラウザごとにテストスクリプトを書き直す必要は一切ありません。"),
      STEP(1, "Mở playwright.config.js, import { devices } từ '@playwright/test'.", "Open playwright.config.js and import { devices } from '@playwright/test'.", "playwright.config.jsを開き、'@playwright/test'から{ devices }をインポートする。"),
      STEP(2, "Khai báo mảng projects với 3 phần tử desktop: chromium, firefox, webkit, mỗi phần tử set use: { ...devices['Desktop ...'] }.", "Declare a projects array with 3 desktop entries: chromium, firefox, webkit, each setting use: { ...devices['Desktop ...'] }.", "chromium、firefox、webkitの3つのデスクトップエントリを持つprojects配列を宣言し、それぞれuse: { ...devices['Desktop ...'] }を設定する。"),
      STEP(3, "Thêm 2 project mô phỏng di động: 'Mobile Chrome' dùng devices['Pixel 5'], 'Mobile Safari' dùng devices['iPhone 13'].", "Add 2 mobile-emulation projects: 'Mobile Chrome' using devices['Pixel 5'], 'Mobile Safari' using devices['iPhone 13'].", "モバイルエミュレーション用の2プロジェクトを追加する：devices['Pixel 5']を使う'Mobile Chrome'と、devices['iPhone 13']を使う'Mobile Safari'。"),
      CODE("javascript", "// playwright.config.js\nconst { defineConfig, devices } = require('@playwright/test');\n\nmodule.exports = defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  retries: 1,\n  use: {\n    baseURL: 'https://shopeasy.vn',\n    trace: 'on-first-retry',\n  },\n  projects: [\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },\n    { name: 'webkit', use: { ...devices['Desktop Safari'] } },\n    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },\n    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },\n  ],\n});"),
      IMG(m_projects, "Bảng 5 project cấu hình trong playwright.config.js: 3 desktop + 2 mô phỏng di động", "The 5 projects configured in playwright.config.js: 3 desktop + 2 mobile emulations", "playwright.config.jsで設定された5つのプロジェクト：デスクトップ3つ＋モバイルエミュレーション2つ"),
      TRY("Mở lại đoạn config trên và thêm 1 project 'Mobile Chrome landscape' bằng cách spread thêm { viewport: { width: 851, height: 393 } } sau devices['Pixel 5'].", "Open the config above and add a 'Mobile Chrome landscape' project by spreading { viewport: { width: 851, height: 393 } } after devices['Pixel 5'].", "上の設定を開き、devices['Pixel 5']の後に{ viewport: { width: 851, height: 393 } }をスプレッドして'Mobile Chrome landscape'プロジェクトを追加してみよう。"),
    ] },
  { heading: { vi: "5. Chạy test theo từng trình duyệt & chạy tất cả (thực hành)", en: "5. Running tests per browser & running all of them (hands-on)", ja: "5. ブラウザごとに実行・全部実行する（実習）" },
    blocks: [
      P("Có 5 project rồi, giờ đến lúc chạy test. Playwright cho phép bạn chọn chạy đúng 1 project khi đang debug nhanh trên 1 trình duyệt, hoặc chạy tất cả khi cần bức tranh đầy đủ trước khi merge/release.",
        "With 5 projects ready, it's time to run tests. Playwright lets you run exactly 1 project when quickly debugging on one browser, or run all of them when you need the full picture before merging/releasing.",
        "5つのプロジェクトが揃ったので、いよいよテストを実行します。Playwrightでは1つのブラウザで素早くデバッグしたいときはちょうど1つのプロジェクトだけを実行でき、マージ/リリース前に全体像が必要なときは全プロジェクトを実行できます。"),
      STEP(1, "Chạy nhanh trên đúng 1 trình duyệt khi đang sửa lỗi: npx playwright test --project=webkit.", "Quickly run on exactly 1 browser while fixing a bug: npx playwright test --project=webkit.", "バグ修正中は1つのブラウザだけで素早く実行：npx playwright test --project=webkit。"),
      STEP(2, "Chạy trên 2 project cụ thể bằng cách lặp lại cờ --project.", "Run on 2 specific projects by repeating the --project flag.", "--projectフラグを繰り返すことで、特定の2つのプロジェクトで実行する。"),
      STEP(3, "Không truyền --project để chạy TOÀN BỘ 5 project cùng lúc — đây là lệnh nên chạy trong CI trước khi merge.", "Omit --project to run ALL 5 projects at once — this is the command CI should run before merging.", "--projectを省略すると5つ全プロジェクトが同時に実行される——これはマージ前にCIが実行すべきコマンド。"),
      CODE("bash", "# Chi chay tren project webkit (nhanh khi dang debug 1 trinh duyet)\nnpx playwright test --project=webkit\n\n# Chay tren 2 project cu the: chromium va firefox\nnpx playwright test --project=chromium --project=firefox\n\n# Khong truyen --project -> chay TOAN BO 5 project khai bao trong config\nnpx playwright test\n\n# Tang so worker de chay song song nhanh hon tren may nhieu nhan CPU\nnpx playwright test --workers=4"),
      P("Khi không truyền --project, Playwright nhân bản mỗi test case thành 5 lần chạy (1 lần/project), rồi hiển thị kết quả tách riêng theo tên project trong báo cáo cuối cùng — nhờ vậy bạn biết ngay test nào fail trên trình duyệt nào, thay vì chỉ biết 'có gì đó fail' chung chung.",
        "When you omit --project, Playwright duplicates each test case into 5 runs (one per project), then shows results grouped by project name in the final report — so you know exactly which test fails on which browser, instead of just a vague 'something failed'.",
        "--projectを省略すると、Playwrightは各テストケースを5回の実行（プロジェクトごとに1回）に複製し、最終レポートでプロジェクト名ごとに結果をグループ化して表示します——そのため『何かが失敗した』という漠然とした情報ではなく、どのテストがどのブラウザで失敗したかが正確に分かります。"),
    ] },
  { heading: { vi: "6. Khác biệt hiển thị giữa các trình duyệt: ca thực tế trên ShopEasy", en: "6. Rendering differences across browsers: a real case on ShopEasy", ja: "6. ブラウザ間の表示差：ShopEasyでの実例" },
    blocks: [
      P("Quay lại ví dụ ô 'Ngày giao hàng mong muốn' ở chương 2: khi chạy project 'webkit' trong bộ 5 project vừa cấu hình, test bắt được ngay một khác biệt mà project 'chromium' không bao giờ thấy. Đây chính là giá trị cốt lõi của kiểm thử đa trình duyệt — không phải để tìm lỗi CHUNG (những lỗi này đã bị bắt ở mọi project), mà để tìm đúng những lỗi RIÊNG của từng engine.",
        "Back to the 'preferred delivery date' example from chapter 2: running the 'webkit' project among our 5 configured projects immediately catches a difference the 'chromium' project would never see. This is the core value of cross-browser testing — not finding COMMON bugs (those get caught on every project anyway), but finding the bugs UNIQUE to each engine.",
        "第2章の『希望配送日』の例に戻りましょう：設定した5つのプロジェクトのうち'webkit'プロジェクトを実行すると、'chromium'プロジェクトでは決して見えない差異をすぐに捉えます。これがクロスブラウザテストの核心的な価値です——共通のバグを見つけること（それはどのプロジェクトでも捕まります）ではなく、各エンジン固有のバグを正確に見つけることです。"),
      IMG(m_webkit, "Màn thanh toán ShopEasy trên WebKit (Safari): ô ngày giao hàng render khác Chrome, khoanh vùng bằng annotate", "ShopEasy's checkout screen on WebKit (Safari): the delivery-date field renders differently from Chrome, highlighted with an annotation", "WebKit（Safari）でのShopEasy決済画面：配送日欄がChromeと違う表示になっており、注記で強調"),
      P("Trong trường hợp này, test trên project 'webkit' báo lỗi ngay ở bước điền ngày vì locator/format không khớp với cách WebKit hiển thị input date. Đây không phải test 'sai' — nó đang làm đúng việc của mình: bắt một khác biệt hiển thị thật sự tồn tại. Cách xử lý đúng thường là chuyển sang dùng fill() với định dạng ISO (yyyy-mm-dd) cho input type='date' thay vì gõ tay theo định dạng hiển thị, vì Playwright chuẩn hoá cách điền input date bất kể trình duyệt hiển thị ra sao.",
        "In this case, the 'webkit' project fails right at the date-filling step because the locator/format doesn't match how WebKit renders the date input. This isn't a 'wrong' test — it's doing exactly its job: catching a real, existing rendering difference. The correct fix is usually to switch to fill() with an ISO format (yyyy-mm-dd) for input type='date' instead of typing the displayed format manually, since Playwright normalizes how it fills date inputs regardless of how the browser visually renders them.",
        "このケースでは、'webkit'プロジェクトが日付入力のステップで即座に失敗します。ロケーター/フォーマットがWebKitの日付入力の表示方法と一致しないためです。これは『間違った』テストではありません——実際に存在するレンダリングの違いを捉えるという、まさに自分の役割を果たしています。正しい対処法は通常、表示形式を手入力する代わりに、input type='date'に対してISO形式（yyyy-mm-dd）でfill()を使うことです。Playwrightはブラウザの見た目に関わらず日付入力の埋め方を正規化するためです。"),
      PITFALL("Thêm project mới ('webkit', 'Mobile Safari'...) vào config nhưng CI vẫn hard-code lệnh chạy kiểu npx playwright test --project=chromium — project mới không bao giờ được chạy dù đã khai báo, tạo cảm giác an toàn giả.", "Adding a new project ('webkit', 'Mobile Safari'...) to the config but CI still hard-codes a command like npx playwright test --project=chromium — the new project never actually runs even though it's declared, creating a false sense of safety.", "新しいプロジェクト（'webkit'、'Mobile Safari'など）を設定に追加しても、CIがnpx playwright test --project=chromiumのようにハードコードされたコマンドのままだと、新しいプロジェクトは宣言されていても決して実行されず、偽りの安心感を生む。"),
    ] },
  { heading: { vi: "7. Viewport & thiết bị giả lập (mobile emulation)", en: "7. Viewport & device emulation (mobile)", ja: "7. ビューポートとデバイスエミュレーション（モバイル）" },
    blocks: [
      P("Ngoài khác biệt về engine, kích thước màn hình (viewport) cũng ảnh hưởng lớn tới giao diện — một layout đẹp trên desktop 1280px có thể vỡ khi thu về 390px của iPhone. Playwright cung cấp sẵn thư viện devices mô phỏng hàng chục thiết bị thật (viewport, user-agent, deviceScaleFactor, hasTouch...), giúp bạn không phải tự đo tay từng thông số.",
        "Besides engine differences, screen size (viewport) also heavily affects the UI — a layout that looks great on a 1280px desktop can break when shrunk to an iPhone's 390px. Playwright ships a devices library emulating dozens of real devices (viewport, user-agent, deviceScaleFactor, hasTouch...), so you don't have to measure every parameter by hand.",
        "エンジンの違いに加え、画面サイズ（ビューポート）もUIに大きな影響を与えます——1280pxのデスクトップで美しいレイアウトが、iPhoneの390pxに縮小すると崩れることがあります。Playwrightには数十の実機をエミュレートするdevicesライブラリ（ビューポート、user-agent、deviceScaleFactor、hasTouchなど）が同梱されており、パラメータを1つずつ手作業で測る必要がありません。"),
      IMG(m_devices, "Bảng thiết bị giả lập thường dùng khi test ShopEasy trên di động, kèm engine và viewport tương ứng", "Common emulated devices for testing ShopEasy on mobile, with the matching engine and viewport", "ShopEasyをモバイルでテストする際によく使うエミュレート端末、対応エンジンとビューポート付き"),
      STEP(1, "Trong project riêng, set use: { ...devices['iPhone 13'] } để chạy toàn bộ test dưới hình dạng iPhone 13 thật (viewport + touch + user-agent).", "In a dedicated project, set use: { ...devices['iPhone 13'] } to run the whole suite as if on a real iPhone 13 (viewport + touch + user-agent).", "専用プロジェクトでuse: { ...devices['iPhone 13'] }を設定し、実機のiPhone 13（ビューポート＋タッチ＋user-agent）としてスイート全体を実行する。"),
      STEP(2, "Muốn kiểm nhanh 1 test ở nhiều kích thước ngay trong cùng file, dùng test.use({ viewport: { width, height } }) để override tạm thời cho 1 describe block.", "To quickly check one test across multiple sizes within the same file, use test.use({ viewport: { width, height } }) to temporarily override a single describe block.", "同じファイル内で1つのテストを複数のサイズですぐ確認したいなら、test.use({ viewport: { width, height } })で1つのdescribeブロックだけ一時的に上書きする。"),
      CODE("javascript", "// tests/responsive-cart.spec.js\nconst { test, expect, devices } = require('@playwright/test');\n\ntest.describe('ShopEasy - Gio hang tren iPhone 13', () => {\n  test.use({ ...devices['iPhone 13'] });\n\n  test('menu rut gon hien thi dung tren man hinh nho', async ({ page }) => {\n    await page.goto('https://shopeasy.vn/gio-hang');\n    await expect(page.locator('#mobile-menu-toggle')).toBeVisible();\n    await expect(page.locator('#desktop-menu')).toBeHidden();\n  });\n});"),
      TIP("Không cần tạo project riêng cho mọi thiết bị muốn thử — test.use({ ...devices['tên thiết bị'] }) đặt ngay trong 1 file test cũng override được viewport/user-agent cho đúng phạm vi test đó.", "You don't need a separate project for every device you want to try — test.use({ ...devices['device name'] }) placed right inside a test file also overrides the viewport/user-agent for just that scope.", "試したいすべての端末に専用プロジェクトを作る必要はありません——テストファイル内にtest.use({ ...devices['端末名'] })を置くだけでも、そのスコープだけビューポート/user-agentを上書きできます。"),
    ] },
  { heading: { vi: "8. Tình huống 1: chỉ test Chrome, lỗi Safari lọt ra production", en: "8. Situation 1: testing only Chrome, a Safari-only bug reaches production", ja: "8. シーン1：Chromeだけをテストし、Safariだけのバグが本番に流出" },
    blocks: [
      SITUATION("Team automation của ShopEasy chỉ cấu hình 1 project 'chromium' trong playwright.config.js suốt nhiều tháng, vì tất cả thành viên trong team đều dùng Chrome để code và test thủ công cũng chủ yếu trên Chrome.", "ShopEasy's automation team only configures 1 'chromium' project in playwright.config.js for months, since every team member codes and does manual testing mostly on Chrome.",
        "Một bản cập nhật CSS làm nút 'Xác nhận đặt hàng' bị đặt sai vị trí (position: sticky xử lý khác nhau giữa Chromium và WebKit), khiến nút này bị che khuất và không bấm được — nhưng CHỈ trên Safari. Vì CI chỉ chạy project 'chromium', test vẫn xanh, code được merge và lên production. 3 ngày sau, đội hỗ trợ khách hàng nhận hàng loạt phản ánh 'không đặt được đơn' từ khách dùng iPhone, doanh thu từ nhóm khách này giảm rõ rệt trong 3 ngày đó.",
        "A CSS update makes the 'Confirm order' button mispositioned (position: sticky behaves differently between Chromium and WebKit), causing the button to be covered and unclickable — but ONLY on Safari. Since CI only runs the 'chromium' project, tests stay green, the code gets merged and released to production. 3 days later, customer support gets flooded with 'can't place an order' complaints from iPhone users, and revenue from that customer segment visibly drops during those 3 days.",
        "ShopEasyの自動化チームは、全メンバーがコーディングも手動テストも主にChromeで行っているため、playwright.config.jsに'chromium'プロジェクトを1つだけ何ヶ月も設定していた。",
        "あるCSSの更新により『注文を確認する』ボタンの位置がずれる（position: stickyの挙動がChromiumとWebKitで異なる）ことで、ボタンが隠れてクリックできなくなる——ただしSafariだけで。CIは'chromium'プロジェクトしか実行しないため、テストは緑のままでコードがマージされ本番にリリースされる。3日後、iPhoneユーザーから『注文できない』という苦情がカスタマーサポートに殺到し、その3日間でこの顧客層からの売上が明らかに落ち込む。"),
      SOLVE("Thêm project 'webkit' vào playwright.config.js và bắt buộc CI chạy TẤT CẢ project (không hard-code --project=chromium), đồng thời chặn merge nếu bất kỳ project nào fail. Ngay khi bật lại, project 'webkit' bắt được lỗi position: sticky này trong vài giây, trước khi code kịp lên production.", "Add a 'webkit' project to playwright.config.js and require CI to run ALL projects (no hard-coded --project=chromium), while blocking merges if any project fails. As soon as this is enabled, the 'webkit' project catches this position: sticky bug within seconds, before the code ever reaches production.", "playwright.config.jsに'webkit'プロジェクトを追加し、CIが（--project=chromiumのハードコードなしで）すべてのプロジェクトを実行するよう必須化し、いずれかのプロジェクトが失敗したらマージをブロックする。有効化した直後、'webkit'プロジェクトが数秒でこのposition: stickyバグを本番に届く前に捉える。"),
      P("Bài học ở đây rất rõ: 'test xanh trên Chrome' không đồng nghĩa với 'ứng dụng chạy đúng ở mọi nơi'. Nếu team chỉ có thói quen dùng 1 trình duyệt, bộ test automation sẽ vô tình phản chiếu đúng thói quen đó — và bỏ sót toàn bộ nhóm khách hàng dùng trình duyệt khác. Đây chính là lý do cross-browser testing nên là một phần bắt buộc của pipeline CI, không phải tuỳ chọn.",
        "The lesson here is clear: 'tests are green on Chrome' does not mean 'the app works correctly everywhere'. If the team only has the habit of using 1 browser, the automation suite will unintentionally mirror that same habit — and miss an entire segment of customers using a different browser. This is exactly why cross-browser testing should be a mandatory part of the CI pipeline, not optional.",
        "ここでの教訓は明確です：『Chromeでテストが緑』は『アプリがどこでも正しく動く』ことを意味しません。チームが1つのブラウザしか使わない習慣を持っていると、自動化スイートは意図せずその習慣をそのまま反映してしまい——別のブラウザを使う顧客層全体を見逃します。だからこそクロスブラウザテストはオプションではなく、CIパイプラインの必須部分であるべきです。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố nút thanh toán bị hỏng chỉ trên Safari, khi CI chưa bật project webkit", "A bug ticket recording the checkout-button incident that only broke on Safari, before CI enabled the webkit project", "CIがwebkitプロジェクトを有効化する前に、Safariだけで決済ボタンが壊れたインシデントを記録したバグチケット"),
      RECAP(["'Xanh trên Chrome' không phải bằng chứng cho 'đúng trên mọi trình duyệt'", "CI nên chạy TẤT CẢ project khai báo, không hard-code chỉ 1 trình duyệt"],
        ["'Green on Chrome' is not proof of 'correct on every browser'", "CI should run ALL declared projects, not hard-code just one browser"],
        ["『Chromeで緑』は『すべてのブラウザで正しい』証拠ではない", "CIは1つのブラウザにハードコードせず、宣言された全プロジェクトを実行すべき"]),
    ] },
  { heading: { vi: "9. Tình huống 2: chạy tuần tự 3 trình duyệt quá lâu, chuyển sang song song", en: "9. Situation 2: running 3 browsers sequentially is too slow, switching to parallel", ja: "9. シーン2：3つのブラウザを順次実行すると遅すぎるため並列に切り替える" },
    blocks: [
      SITUATION("Sau khi thêm project 'webkit' và 'firefox', team ShopEasy để mặc định fullyParallel: false và chỉ 1 worker trong playwright.config.js — Playwright chạy lần lượt: xong hết test trên chromium mới chuyển sang firefox, xong firefox mới tới webkit.", "After adding the 'webkit' and 'firefox' projects, ShopEasy's team leaves fullyParallel: false and just 1 worker in playwright.config.js — Playwright runs sequentially: finish all chromium tests before moving to firefox, finish firefox before moving to webkit.",
        "Bộ test vốn chỉ mất 40 giây trên 1 trình duyệt giờ mất gần 3 phút mỗi lần chạy CI vì phải cộng dồn cả 3 trình duyệt chạy nối tiếp nhau. Với đội có hàng chục pull request mỗi ngày, thời gian chờ CI kéo dài khiến lập trình viên trì hoãn merge, hoặc tệ hơn là bắt đầu bỏ qua bước chờ CI xanh trước khi merge.", "The suite that used to take 40 seconds on 1 browser now takes nearly 3 minutes per CI run, since all 3 browsers run one after another and their times add up. With dozens of pull requests per day, the longer CI wait causes developers to delay merging, or worse, start skipping the step of waiting for CI to turn green before merging.",
        "'webkit'と'firefox'プロジェクトを追加した後、ShopEasyのチームはplaywright.config.jsでfullyParallel: falseとworker数1のままにしていた——Playwrightは順番に実行する：chromiumの全テストが終わってからfirefoxへ、firefoxが終わってからwebkitへ。",
        "1つのブラウザで40秒しかかからなかったスイートが、3つのブラウザが順番に実行され時間が積み重なるため、CIの実行ごとにほぼ3分かかるようになった。1日に数十のプルリクエストがあるチームでは、CIの待ち時間が長くなることで開発者がマージを先延ばしにし、さらに悪いことにマージ前にCIが緑になるのを待つステップを省略し始める。"),
      SOLVE("Bật fullyParallel: true trong playwright.config.js và tăng workers lên phù hợp số CPU core của máy CI (ví dụ workers: 4). Ba project chromium/firefox/webkit giờ chạy đồng thời trên các tiến trình khác nhau, tổng thời gian CI giảm gần về mức của project chậm nhất thay vì cộng dồn cả 3 — từ gần 3 phút xuống còn khoảng 54 giây.", "Enable fullyParallel: true in playwright.config.js and raise workers to match the CI machine's CPU core count (e.g. workers: 4). The 3 projects — chromium/firefox/webkit — now run concurrently in different processes, dropping total CI time close to the slowest single project instead of the sum of all 3 — from nearly 3 minutes down to about 54 seconds.", "playwright.config.jsでfullyParallel: trueを有効にし、CIマシンのCPUコア数に合わせてworkersを増やす（例：workers: 4）。chromium/firefox/webkitの3プロジェクトが異なるプロセスで同時に実行されるようになり、CIの合計時間は3つの合計ではなく最も遅い1つのプロジェクトに近い値まで下がる——ほぼ3分から約54秒へ。"),
      P("Song song hoá không chỉ tiết kiệm thời gian, nó còn giữ cho đội ngũ có phản hồi CI nhanh — điều kiện tiên quyết để mọi người thực sự chờ CI xanh trước khi merge thay vì bỏ qua vì 'chờ lâu quá'. Với dự án có nhiều máy CI, bạn còn có thể tách mỗi project thành 1 job song song ở cấp hạ tầng (matrix build), nhanh hơn nữa so với chỉ tăng workers trên 1 máy.",
        "Parallelization doesn't just save time — it also keeps CI feedback fast, a prerequisite for people actually waiting for green CI before merging instead of skipping it because it 'takes too long'. On projects with multiple CI machines, you can even split each project into its own parallel job at the infrastructure level (a matrix build), which is even faster than just raising workers on a single machine.",
        "並列化は時間を節約するだけでなく、CIのフィードバックを速く保ちます——これは『時間がかかりすぎる』という理由で省略せず、実際にみんながマージ前に緑のCIを待つための前提条件です。複数のCIマシンを持つプロジェクトでは、各プロジェクトをインフラレベルで別々の並列ジョブ（マトリクスビルド）に分けることもでき、1台のマシンでworkerを増やすだけよりさらに速くなります。"),
      IMG(m_dashboard, "Kết quả chạy song song 3 trình duyệt: mỗi project hiển thị số test pass/fail và thời gian riêng, tổng thời gian gần bằng project chậm nhất", "Parallel run results across 3 browsers: each project shows its own pass/fail count and time, with total time close to the slowest project", "3つのブラウザでの並列実行結果：各プロジェクトが個別のpass/fail数と時間を表示し、合計時間は最も遅いプロジェクトに近い"),
      TIP("Nếu muốn đi làm nhanh hơn với nền tảng automation + CI/CD vững, có thể học kèm 1-1 với mentor tại CyberSoft để được xem trực tiếp cấu hình CI của chính dự án bạn: " + course1v1Url, "If you want a faster path to a job with a solid automation + CI/CD foundation, consider 1-on-1 mentoring at CyberSoft to get direct review of your own project's CI setup: " + course1v1Url, "自動化＋CI/CDの確かな基礎で早く就職したいなら、CyberSoftでの1対1メンタリングを検討し、自分自身のプロジェクトのCI設定を直接見てもらいましょう：" + course1v1Url),
      RECAP(["Chạy tuần tự 3 trình duyệt = cộng dồn thời gian, làm chậm phản hồi CI", "fullyParallel + đủ workers giúp tổng thời gian gần bằng project chậm nhất"],
        ["Running 3 browsers sequentially = added-up time, slowing CI feedback", "fullyParallel + enough workers brings total time close to the slowest project"],
        ["3つのブラウザを順次実行＝時間が積み重なりCIフィードバックが遅くなる", "fullyParallelと十分なworkerにより合計時間が最も遅いプロジェクトに近くなる"]),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Dùng chung 1 ảnh baseline cho visual regression testing trên cả 3 trình duyệt, dù mỗi engine render font/anti-alias khác nhau — dẫn tới test visual luôn fail giả (false positive) dù giao diện thực tế không hề đổi.", "Using a single baseline image for visual regression testing across all 3 browsers, even though each engine renders fonts/anti-aliasing differently — causing visual tests to always false-positive fail even when the UI hasn't actually changed.", "各エンジンがフォント/アンチエイリアスを異なる方法でレンダリングするにもかかわらず、3つのブラウザすべてに対してビジュアル回帰テストで同じベースライン画像を使うこと——実際にUIが変わっていなくても、ビジュアルテストが常に偽陽性で失敗する原因になる。"),
      PITFALL("Chỉ thêm project 'webkit'/'firefox' vào config cho có, nhưng không bao giờ chạy chúng trong CI thật (chỉ chạy local thỉnh thoảng) — khiến nhóm hiểu lầm là đã 'phủ' cross-browser trong khi thực tế chưa hề được bảo vệ tự động.", "Adding the 'webkit'/'firefox' projects to the config just to check a box, but never actually running them in real CI (only occasionally locally) — leading the team to falsely believe cross-browser coverage exists when it's actually never automatically protected.", "'webkit'/'firefox'プロジェクトを形だけ設定に追加しても、実際のCIで一度も実行しない（たまにローカルで実行するだけ）——チームがクロスブラウザカバレッジがあると誤解する一方、実際には自動的に保護されたことは一度もない。"),
      TIP("Khi thêm 1 project mới, luôn thử cố tình fail nó 1 lần (đổi tạm 1 locator sai) để chắc chắn CI THẬT SỰ chạy và chặn merge — đừng chỉ tin vào việc 'đã khai báo trong config'.", "When adding a new project, always try intentionally breaking it once (temporarily use a wrong locator) to confirm CI ACTUALLY runs it and blocks merges — don't just trust that it's 'declared in the config'.", "新しいプロジェクトを追加するときは、必ず一度わざと壊してみて（一時的に間違ったロケーターを使う）、CIが本当に実行されマージをブロックすることを確認しよう——『設定に宣言されている』ことだけを信用してはいけない。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử tương thích/responsive cho người mới", "Compatibility/responsive testing for beginners", "test-tuong-thich-responsive-cho-nguoi-moi", "初心者のための互換性・レスポンシブテスト"),
      INTERNAL("Cách chạy test và đọc báo cáo cho người mới", "How to run tests and read reports for beginners", "chay-test-va-doc-bao-cao-cho-nguoi-moi", "初心者のためのテスト実行とレポートの読み方"),
      INTERNAL("Page Object Model (POM) cho người mới", "Page Object Model (POM) for beginners", "page-object-model-pom-cho-nguoi-moi", "初心者のためのPage Object Model（POM）"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử đa trình duyệt qua màn thanh toán ShopEasy: vì sao chỉ test 1 trình duyệt là chưa đủ, ba engine Chromium/Firefox/WebKit mà Playwright hỗ trợ, cách khai báo 'projects' trong playwright.config.js, cách chạy test theo từng trình duyệt hoặc chạy tất cả, cách giả lập viewport/thiết bị di động, và hai tình huống thật cho thấy hậu quả khi bỏ sót Safari (lỗi lọt ra production) so với chạy tuần tự quá lâu (chuyển sang song song). Đây là kỹ năng nền tảng giúp bộ test automation của bạn phản ánh đúng trải nghiệm của MỌI khách hàng, không chỉ khách dùng trình duyệt bạn quen code.",
        "You just learned cross-browser testing through ShopEasy's checkout screen: why testing on only 1 browser isn't enough, the 3 engines Playwright supports (Chromium/Firefox/WebKit), how to declare 'projects' in playwright.config.js, how to run tests per browser or all at once, how to emulate viewports/mobile devices, and two real situations showing the consequences of missing Safari (a bug reaching production) versus running sequentially for too long (switching to parallel). This is a foundational skill that makes your automation suite reflect the real experience of EVERY customer, not just the ones using the browser you're used to coding in.",
        "ShopEasyの決済画面を通じてクロスブラウザテストを学びました：1つのブラウザだけのテストがなぜ不十分か、Playwrightがサポートする3つのエンジン（Chromium/Firefox/WebKit）、playwright.config.jsで'projects'を宣言する方法、ブラウザごと・全部一括でテストを実行する方法、ビューポート/モバイル端末をエミュレートする方法、そしてSafariを見逃した場合（本番へのバグ流出）と順次実行が遅すぎる場合（並列への切り替え）の結果を示す2つの実例。これは、コードを書き慣れたブラウザのユーザーだけでなく、すべての顧客の実際の体験を自動化スイートに正しく反映させるための土台スキルです。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu sâu hơn về visual regression testing (so sánh ảnh chụp giao diện qua các lần chạy) và cách tổ chức CI matrix build để mỗi trình duyệt chạy song song trên hạ tầng riêng. AI có thể giúp bạn tổng hợp nhanh kiến thức nền, nhưng để thành thạo thật sự — đọc đúng lỗi, tổ chức project chuẩn, xử lý flaky test theo từng engine — bạn cần thực hành trên dự án thật với người hướng dẫn. Một khoá học Tester bài bản từ zero tới đi làm như https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, có mentor kèm sát và dự án automation thực chiến, sẽ giúp bạn tự tin ứng tuyển vị trí Automation Tester; nếu cần lộ trình riêng theo tốc độ của bạn, có thể chọn thêm hình thức học 1-1 tại " + course1v1Url + ".",
        "Next, you should dive deeper into visual regression testing (comparing UI screenshots across runs) and organizing a CI matrix build so each browser runs in parallel on its own infrastructure. AI can quickly help you piece together foundational knowledge, but to truly master it — reading errors correctly, structuring projects properly, handling flaky tests per engine — you need hands-on practice on a real project with a mentor. A proper Tester course from zero to hired, like https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/, with close mentoring and real automation projects, helps you confidently apply for an Automation Tester role; if you want a pace tailored to you, 1-on-1 training at " + course1v1Url + " is also available.",
        "次は、ビジュアル回帰テスト（実行のたびにUIスクリーンショットを比較する）と、各ブラウザが独自のインフラで並列実行されるCIマトリクスビルドの構成についてさらに深く学ぶとよいでしょう。AIは基礎知識を素早くまとめる手助けができますが、本当に習得する——エラーを正しく読み、プロジェクトを適切に構成し、エンジンごとのflakyテストに対処する——には、メンターと共に実際のプロジェクトで実践する必要があります。https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のようなゼロから就職までの体系的なテスターコースは、密接なメンタリングと実際の自動化プロジェクトを提供し、Automation Testerポジションへの自信ある応募を助けます。自分のペースに合わせたい場合は、" + course1v1Url + " での1対1トレーニングも選べます。"),
      CTA(course),
    ] },
];

const CROSSBROWSER_01 = makeDoc({
  slug: "kiem-thu-da-trinh-duyet-cross-browser-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử đa trình duyệt",
  keywords: ["kiểm thử đa trình duyệt", "cross-browser testing", "playwright projects", "automation testing", "chạy test song song cho người mới"],
  coverLabel: "NGƯỜI MỚI · CROSS-BROWSER · TMĐT",
  crumb: "Kiểm thử đa trình duyệt (cross-browser) cho người mới",
  metaTitle: { vi: "Kiểm thử đa trình duyệt (cross-browser) cho người mới", en: "Cross-browser testing for beginners", ja: "初心者向けクロスブラウザテスト" },
  metaDescription: {
    vi: "Kiểm thử đa trình duyệt (cross-browser) cho người mới: chạy ShopEasy trên Chromium, Firefox, WebKit bằng Playwright projects, có code và trắc nghiệm cuối bài.",
    en: "Cross-browser testing for beginners: running ShopEasy on Chromium, Firefox, WebKit with Playwright projects, parallel runs, device emulation, runnable code and a quiz at the end.",
    ja: "初心者向けクロスブラウザテスト：PlaywrightのprojectsでShopEasyをChromium、Firefox、WebKit上で実行、並列実行とデバイスエミュレーション、動くコードと最後にクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử đa trình duyệt (cross-browser) cho người mới: chạy song song trên Chromium/Firefox/WebKit (có code chạy được)",
    en: "Cross-browser testing for beginners: running Chromium/Firefox/WebKit in parallel (with runnable code)",
    ja: "初心者のためのクロスブラウザテスト：Chromium/Firefox/WebKitを並列実行する（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử đa trình duyệt (cross-browser testing) qua app TMĐT ShopEasy. Ba engine Chromium/Firefox/WebKit của Playwright, cấu hình 'projects', chạy test theo từng trình duyệt và chạy song song, giả lập viewport/thiết bị di động, hai tình huống thật (lỗi Safari lọt ra production, chạy tuần tự quá lâu chuyển sang song song), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn cross-browser testing through the ShopEasy e-commerce app. Playwright's 3 engines (Chromium/Firefox/WebKit), configuring 'projects', running tests per browser and in parallel, emulating viewports/mobile devices, two real situations (a Safari-only bug reaching production, switching from slow sequential runs to parallel), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでクロスブラウザテストを学ぶ。Playwrightの3つのエンジン（Chromium/Firefox/WebKit）、'projects'の設定、ブラウザごと・並列でのテスト実行、ビューポート/モバイル端末のエミュレーション、2つの実例（Safariだけのバグが本番に流出、遅い順次実行から並列への切り替え）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách cấu hình kiểm thử đa trình duyệt với Playwright", steps: [
    { name: "Khai báo projects trong playwright.config.js", text: "Mỗi trình duyệt/thiết bị là 1 project, dùng devices[...] cho mô phỏng di động." },
    { name: "Chạy test theo từng trình duyệt hoặc tất cả", text: "Dùng --project=<tên> để chạy riêng, bỏ trống để chạy toàn bộ project." },
    { name: "Bật chạy song song", text: "Đặt fullyParallel: true và tăng workers để giảm tổng thời gian CI." },
  ] },
  pages,
});

export const AU_CROSSBROWSER_01 = [CROSSBROWSER_01];
