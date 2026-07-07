// ============================================================================
// AT_SELENIUM — 3 bài SÂU về Selenium (Automation Tester), trilingual VI/EN/JA.
//  1) WebDriver Architecture (W3C · By locators · explicit wait · POM) — congnghe
//  2) Waits & Synchronization (giết flaky) — nangcao
//  3) Selenium Grid 4 & Parallel/CI — congnghe
// JA thật, khác EN. Block types khớp ArticleViewer + verify.mjs.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const cover1 = makeThumb({ id: "atsel1", domain: "saas", kind: "congnghe", label: "SELENIUM · WEBDRIVER" });
const cover2 = makeThumb({ id: "atsel2", domain: "banking", kind: "nangcao", label: "SELENIUM · WAITS" });
const cover3 = makeThumb({ id: "atsel3", domain: "ecommerce", kind: "congnghe", label: "SELENIUM · GRID 4" });

// ---------------------------------------------------------------------------
// SVG helpers (hand-drawn, dark bg)
// ---------------------------------------------------------------------------
const SVG_WD_ARCH = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Selenium WebDriver — kiến trúc client / driver / browser</text>
<rect x="30" y="70" width="170" height="90" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="115" y="102" text-anchor="middle" font-size="14" font-weight="800" fill="#e0f2fe">Test code</text>
<text x="115" y="123" text-anchor="middle" font-size="10.5" fill="#7dd3fc">Java / Python binding</text>
<text x="115" y="140" text-anchor="middle" font-size="10.5" fill="#7dd3fc">driver.findElement(...)</text>
<rect x="275" y="70" width="170" height="90" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="360" y="98" text-anchor="middle" font-size="14" font-weight="800" fill="#ccfbf1">Browser Driver</text>
<text x="360" y="119" text-anchor="middle" font-size="10.5" fill="#5eead4">chromedriver / geckodriver</text>
<text x="360" y="136" text-anchor="middle" font-size="10.5" fill="#5eead4">HTTP server nội bộ</text>
<rect x="520" y="70" width="170" height="90" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="605" y="98" text-anchor="middle" font-size="14" font-weight="800" fill="#e0e7ff">Browser</text>
<text x="605" y="119" text-anchor="middle" font-size="10.5" fill="#a5b4fc">Chrome / Firefox</text>
<text x="605" y="136" text-anchor="middle" font-size="10.5" fill="#a5b4fc">DOM · render engine</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#wa)">
<path d="M200 115 h72"/><path d="M445 115 h72"/></g>
<defs><marker id="wa" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<text x="236" y="105" text-anchor="middle" font-size="10" fill="#cbd5e1">W3C JSON</text>
<text x="236" y="152" text-anchor="middle" font-size="10" fill="#64748b">HTTP /session</text>
<text x="481" y="105" text-anchor="middle" font-size="10" fill="#cbd5e1">DevTools/native</text>
<rect x="30" y="190" width="660" height="46" rx="8" fill="#111827" stroke="#334155"/>
<text x="360" y="210" text-anchor="middle" font-size="11.5" fill="#cbd5e1">Giao thức W3C WebDriver: mỗi lệnh = 1 HTTP request có command + params → driver dịch sang thao tác thật</text>
<text x="360" y="228" text-anchor="middle" font-size="10.5" fill="#64748b">POST /session · POST /session/{id}/element · POST /session/{id}/element/{el}/click</text>
</svg>`;

const SVG_POM = `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="250" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Page Object Model — tách locator/hành động khỏi test</text>
<rect x="40" y="60" width="200" height="150" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
<text x="140" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#fde68a">LoginPage (Page Object)</text>
<text x="140" y="112" text-anchor="middle" font-size="10.5" fill="#fcd34d">usernameField = By.id(...)</text>
<text x="140" y="130" text-anchor="middle" font-size="10.5" fill="#fcd34d">passwordField = By.id(...)</text>
<text x="140" y="152" text-anchor="middle" font-size="10.5" fill="#fbbf24">login(user, pass)</text>
<text x="140" y="170" text-anchor="middle" font-size="10.5" fill="#fbbf24">getErrorText()</text>
<text x="140" y="192" text-anchor="middle" font-size="10" fill="#94a3b8">1 file / 1 màn hình</text>
<rect x="290" y="60" width="180" height="150" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="380" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Test (TestNG/pytest)</text>
<text x="380" y="114" text-anchor="middle" font-size="10.5" fill="#7dd3fc">loginPage.login(a,b)</text>
<text x="380" y="134" text-anchor="middle" font-size="10.5" fill="#7dd3fc">assert dashboard hiển thị</text>
<text x="380" y="160" text-anchor="middle" font-size="10.5" fill="#7dd3fc">chỉ mô tả nghiệp vụ</text>
<text x="380" y="188" text-anchor="middle" font-size="10" fill="#94a3b8">không có By/CSS ở đây</text>
<rect x="520" y="60" width="160" height="150" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="600" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">Lợi ích</text>
<text x="600" y="114" text-anchor="middle" font-size="10.5" fill="#5eead4">UI đổi → sửa 1 chỗ</text>
<text x="600" y="134" text-anchor="middle" font-size="10.5" fill="#5eead4">tái dùng · dễ đọc</text>
<text x="600" y="154" text-anchor="middle" font-size="10.5" fill="#5eead4">ít trùng lặp</text>
<text x="600" y="174" text-anchor="middle" font-size="10.5" fill="#5eead4">test bền hơn</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#pa)"><path d="M290 135 h-50"/><path d="M520 135 h-50"/></g>
<defs><marker id="pa" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_WAITS = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">3 loại wait trong Selenium</text>
<rect x="30" y="60" width="210" height="170" rx="10" fill="#1e293b" stroke="#f87171" stroke-width="2"/>
<text x="135" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#fecaca">Implicit wait</text>
<text x="135" y="112" text-anchor="middle" font-size="10.5" fill="#fca5a5">đặt 1 lần / driver</text>
<text x="135" y="132" text-anchor="middle" font-size="10.5" fill="#fca5a5">poll đến khi element có mặt</text>
<text x="135" y="152" text-anchor="middle" font-size="10.5" fill="#fca5a5">áp cho MỌI findElement</text>
<text x="135" y="180" text-anchor="middle" font-size="10.5" fill="#f87171">chỉ chờ presence,</text>
<text x="135" y="196" text-anchor="middle" font-size="10.5" fill="#f87171">không chờ clickable</text>
<text x="135" y="216" text-anchor="middle" font-size="10" fill="#94a3b8">đừng trộn với explicit!</text>
<rect x="255" y="60" width="210" height="170" rx="10" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="360" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#a7f3d0">Explicit wait</text>
<text x="360" y="112" text-anchor="middle" font-size="10.5" fill="#6ee7b7">WebDriverWait + condition</text>
<text x="360" y="132" text-anchor="middle" font-size="10.5" fill="#6ee7b7">ExpectedConditions</text>
<text x="360" y="152" text-anchor="middle" font-size="10.5" fill="#6ee7b7">chờ đúng trạng thái cần</text>
<text x="360" y="180" text-anchor="middle" font-size="10.5" fill="#34d399">visible · clickable · text</text>
<text x="360" y="200" text-anchor="middle" font-size="10.5" fill="#34d399">→ được KHUYẾN NGHỊ</text>
<rect x="480" y="60" width="210" height="170" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="585" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#c7d2fe">Fluent wait</text>
<text x="585" y="112" text-anchor="middle" font-size="10.5" fill="#a5b4fc">explicit + tinh chỉnh</text>
<text x="585" y="132" text-anchor="middle" font-size="10.5" fill="#a5b4fc">withTimeout / pollingEvery</text>
<text x="585" y="152" text-anchor="middle" font-size="10.5" fill="#a5b4fc">ignoring(Exception)</text>
<text x="585" y="180" text-anchor="middle" font-size="10.5" fill="#818cf8">retry custom condition</text>
<text x="585" y="200" text-anchor="middle" font-size="10.5" fill="#818cf8">chống stale element</text>
</svg>`;

const SVG_RACE = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Race condition → StaleElementReferenceException</text>
<rect x="40" y="60" width="150" height="60" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="115" y="88" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0f2fe">1. findElement</text>
<text x="115" y="106" text-anchor="middle" font-size="10" fill="#7dd3fc">giữ ref tới node DOM</text>
<rect x="230" y="60" width="150" height="60" rx="9" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
<text x="305" y="88" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fde68a">2. JS render lại</text>
<text x="305" y="106" text-anchor="middle" font-size="10" fill="#fcd34d">React/Vue thay node</text>
<rect x="420" y="60" width="150" height="60" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="495" y="88" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fecaca">3. .click() ref cũ</text>
<text x="495" y="106" text-anchor="middle" font-size="10" fill="#fca5a5">node không còn → Stale</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#ra)"><path d="M190 90 h40"/><path d="M380 90 h40"/></g>
<defs><marker id="ra" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="60" y="150" width="600" height="80" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="360" y="176" text-anchor="middle" font-size="12.5" font-weight="800" fill="#a7f3d0">Cách chữa</text>
<text x="360" y="198" text-anchor="middle" font-size="10.5" fill="#6ee7b7">tìm LẠI element ngay trước khi thao tác · wrap trong retry · dùng ExpectedConditions.refreshed()</text>
<text x="360" y="216" text-anchor="middle" font-size="10.5" fill="#6ee7b7">wait.until(elementToBeClickable(By...)) thay vì cache ref lâu</text>
</svg>`;

const SVG_GRID = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="280" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Selenium Grid 4 — Hub &amp; Node phân tán</text>
<rect x="30" y="60" width="140" height="80" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="100" y="92" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Test runner</text>
<text x="100" y="112" text-anchor="middle" font-size="10" fill="#7dd3fc">TestNG · pytest-xdist</text>
<text x="100" y="128" text-anchor="middle" font-size="10" fill="#7dd3fc">RemoteWebDriver</text>
<rect x="250" y="55" width="180" height="90" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="340" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">HUB / Router</text>
<text x="340" y="102" text-anchor="middle" font-size="10" fill="#5eead4">Distributor · Session Queue</text>
<text x="340" y="118" text-anchor="middle" font-size="10" fill="#5eead4">Session Map · Event Bus</text>
<text x="340" y="134" text-anchor="middle" font-size="10" fill="#5eead4">khớp capabilities → node</text>
<rect x="500" y="45" width="190" height="55" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="595" y="68" text-anchor="middle" font-size="12" font-weight="700" fill="#e0e7ff">Node 1 · Chrome</text>
<text x="595" y="86" text-anchor="middle" font-size="9.5" fill="#a5b4fc">max 5 session</text>
<rect x="500" y="110" width="190" height="55" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="595" y="133" text-anchor="middle" font-size="12" font-weight="700" fill="#e0e7ff">Node 2 · Firefox</text>
<text x="595" y="151" text-anchor="middle" font-size="9.5" fill="#a5b4fc">max 3 session</text>
<rect x="500" y="175" width="190" height="55" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="595" y="198" text-anchor="middle" font-size="12" font-weight="700" fill="#e0e7ff">Node 3 · Edge</text>
<text x="595" y="216" text-anchor="middle" font-size="9.5" fill="#a5b4fc">Docker container</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#ga)"><path d="M170 100 h80"/></g>
<g stroke="#2dd4bf" stroke-width="2" fill="none" marker-end="url(#gb)"><path d="M430 90 L500 72"/><path d="M430 100 L500 137"/><path d="M430 115 L500 200"/></g>
<defs>
<marker id="ga" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker>
<marker id="gb" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#2dd4bf"/></marker>
</defs>
<text x="360" y="262" text-anchor="middle" font-size="11" fill="#cbd5e1">Test gửi capabilities lên Hub → Distributor xếp phiên vào Node phù hợp → chạy song song, cross-browser</text>
</svg>`;

const SVG_CI = `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="240" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Pipeline CI — Selenium chạy song song</text>
<rect x="20" y="70" width="120" height="70" rx="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
<text x="80" y="100" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0f2fe">git push</text>
<text x="80" y="120" text-anchor="middle" font-size="9.5" fill="#7dd3fc">PR / main</text>
<rect x="170" y="70" width="120" height="70" rx="9" fill="#1e293b" stroke="#2dd4bf" stroke-width="2"/>
<text x="230" y="96" text-anchor="middle" font-size="11.5" font-weight="700" fill="#ccfbf1">build + up Grid</text>
<text x="230" y="116" text-anchor="middle" font-size="9.5" fill="#5eead4">docker compose</text>
<rect x="320" y="70" width="120" height="70" rx="9" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="380" y="96" text-anchor="middle" font-size="11.5" font-weight="700" fill="#c7d2fe">chạy song song</text>
<text x="380" y="116" text-anchor="middle" font-size="9.5" fill="#a5b4fc">xdist / TestNG</text>
<rect x="470" y="70" width="120" height="70" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="530" y="96" text-anchor="middle" font-size="11.5" font-weight="700" fill="#a7f3d0">report + shot</text>
<text x="530" y="116" text-anchor="middle" font-size="9.5" fill="#6ee7b7">Allure · JUnit XML</text>
<rect x="620" y="70" width="80" height="70" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="660" y="100" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fecaca">gate</text>
<text x="660" y="120" text-anchor="middle" font-size="9.5" fill="#fca5a5">pass/fail</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#ca)">
<path d="M140 105 h30"/><path d="M290 105 h30"/><path d="M440 105 h30"/><path d="M590 105 h30"/></g>
<defs><marker id="ca" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<text x="360" y="185" text-anchor="middle" font-size="11" fill="#cbd5e1">Grid + xdist rút thời gian bộ 400 test từ ~40 phút xuống ~8 phút; artifact screenshot/log gắn vào build</text>
<text x="360" y="208" text-anchor="middle" font-size="10.5" fill="#64748b">flaky bị cách ly (quarantine), retry 1 lần trước khi báo fail</text>
</svg>`;

// ===========================================================================
// ARTICLE 1 — WebDriver Architecture
// ===========================================================================
const pages1 = [
  {
    heading: { vi: "1. WebDriver là gì và giải quyết bài toán nào", en: "1. What WebDriver is and the problem it solves", ja: "1. WebDriver とは何か、どんな課題を解決するか" },
    blocks: [
      P(
        "Selenium WebDriver là bộ thư viện điều khiển trình duyệt thật (Chrome, Firefox, Edge, Safari) bằng code, giúp mô phỏng chính xác hành vi người dùng: mở trang, gõ chữ, click, submit form và đọc kết quả trên DOM. Khác với việc kiểm thử thủ công lặp đi lặp lại, WebDriver cho phép một QA viết kịch bản một lần rồi chạy hàng trăm lần trên nhiều trình duyệt. Trong một dự án SaaS quản lý hợp đồng có hơn 300 màn hình, đội kiểm thử không thể click tay mỗi lần release; họ cần một bộ test hồi quy tự động chạy sau mỗi lần merge. WebDriver chính là công cụ nền tảng cho lớp end-to-end đó. Bài viết này đi sâu vào kiến trúc, cách cài đặt, cách định vị phần tử và cách viết test ổn định thay vì test hay đỏ.",
        "Selenium WebDriver is a library that drives real browsers (Chrome, Firefox, Edge, Safari) from code, faithfully simulating user behavior: opening a page, typing, clicking, submitting forms and reading the DOM. Unlike repetitive manual testing, WebDriver lets a QA write a scenario once and run it hundreds of times across browsers. In a SaaS contract-management product with over 300 screens, the test team cannot click by hand every release; they need an automated regression suite that runs after every merge. WebDriver is the foundation for that end-to-end layer. This article dives into the architecture, installation, element location and how to write stable tests instead of flaky ones.",
        "Selenium WebDriver は、実際のブラウザ（Chrome、Firefox、Edge、Safari）をコードから操作し、ページを開く・入力する・クリックする・フォーム送信する・DOM を読むといったユーザー行動を忠実に再現するライブラリです。繰り返しの手動テストと違い、テストケースを一度書けば複数ブラウザで何百回でも実行できます。300 画面を超える SaaS 契約管理製品では、リリースのたびに手でクリックすることはできず、マージ後に自動で走る回帰テストスイートが必要です。WebDriver はその E2E 層の基盤です。本記事ではアーキテクチャ、インストール、要素の特定、そしてフレーキーではなく安定したテストの書き方を掘り下げます。"
      ),
      UL(
        ["Điều khiển trình duyệt thật, không phải trình duyệt giả lập", "Chuẩn hoá qua giao thức W3C nên đa nền tảng", "Hỗ trợ nhiều ngôn ngữ: Java, Python, C#, JavaScript, Ruby", "Nền tảng cho hồi quy end-to-end và cross-browser"],
        ["Drives real browsers, not headless emulators only", "Standardized via the W3C protocol, cross-platform", "Multi-language bindings: Java, Python, C#, JavaScript, Ruby", "Foundation for end-to-end and cross-browser regression"],
        ["エミュレーターではなく実ブラウザを操作します", "W3C プロトコルで標準化され、クロスプラットフォームです", "Java・Python・C#・JavaScript・Ruby など多言語対応です", "E2E とクロスブラウザ回帰の基盤になります"]
      ),
      NOTE(
        "WebDriver không phải framework kiểm thử. Nó chỉ điều khiển trình duyệt; bạn vẫn cần TestNG, JUnit hoặc pytest để tổ chức test, assertion và báo cáo.",
        "WebDriver is not a test framework. It only drives the browser; you still need TestNG, JUnit or pytest for structure, assertions and reporting.",
        "WebDriver はテストフレームワークではありません。ブラウザを操作するだけで、テスト構成・アサーション・レポートには TestNG、JUnit、pytest が別途必要です。"
      ),
    ],
  },
  {
    heading: { vi: "2. Cơ chế bên trong: giao thức W3C WebDriver", en: "2. Internals: the W3C WebDriver protocol", ja: "2. 内部の仕組み: W3C WebDriver プロトコル" },
    blocks: [
      P(
        "Khi bạn gọi driver.findElement(By.id(\"user\")).click() trong code, thực chất binding ngôn ngữ không trực tiếp chạm vào trình duyệt. Nó gửi một HTTP request theo chuẩn W3C WebDriver tới một tiến trình trung gian gọi là browser driver, ví dụ chromedriver cho Chrome hay geckodriver cho Firefox. Driver này là một máy chủ HTTP nhỏ: nó nhận lệnh dạng JSON, dịch sang thao tác gốc của trình duyệt (qua DevTools hoặc API native), rồi trả kết quả về. Mỗi lệnh Selenium tương ứng một endpoint, ví dụ POST /session để mở phiên, POST /session/{id}/element để tìm phần tử, POST /session/{id}/element/{el}/click để click. Hiểu mô hình ba tầng client-driver-browser giúp bạn gỡ lỗi tốt hơn khi test treo hoặc báo lỗi phiên bản driver không khớp trình duyệt.",
        "When you call driver.findElement(By.id(\"user\")).click() the language binding does not touch the browser directly. It sends an HTTP request following the W3C WebDriver spec to an intermediary process called the browser driver, e.g. chromedriver for Chrome or geckodriver for Firefox. That driver is a small HTTP server: it receives JSON commands, translates them into native browser operations (via DevTools or native APIs), and returns the result. Each Selenium command maps to an endpoint, e.g. POST /session to open a session, POST /session/{id}/element to find an element, POST /session/{id}/element/{el}/click to click. Understanding the three-tier client-driver-browser model helps you debug hangs and driver/browser version mismatches.",
        "driver.findElement(By.id(\"user\")).click() を呼ぶとき、言語バインディングは直接ブラウザに触れません。W3C WebDriver 仕様に従った HTTP リクエストを、browser driver と呼ばれる中間プロセス（Chrome なら chromedriver、Firefox なら geckodriver）へ送ります。このドライバは小さな HTTP サーバーで、JSON コマンドを受け取り、DevTools やネイティブ API を通じてブラウザの操作へ変換し、結果を返します。各 Selenium コマンドはエンドポイントに対応し、たとえばセッション開始は POST /session、要素検索は POST /session/{id}/element、クリックは POST /session/{id}/element/{el}/click です。この 3 層のクライアント・ドライバ・ブラウザ構造を理解すると、ハングやドライバとブラウザのバージョン不一致のデバッグが楽になります。"
      ),
      IMG(SVG_WD_ARCH, "Kiến trúc ba tầng và luồng lệnh W3C", "Three-tier architecture and W3C command flow", "3 層アーキテクチャと W3C コマンドの流れ"),
      P(
        "Từ Selenium 4, giao thức W3C là mặc định duy nhất, thay cho JSON Wire Protocol cũ. Điều này loại bỏ nhiều khác biệt hành vi giữa các trình duyệt và mở đường cho tích hợp DevTools như bắt log console hay giả lập vị trí địa lý. Selenium Manager, ra mắt cũng trong dòng 4, tự động tải đúng phiên bản driver khớp với trình duyệt trên máy, nên bạn không còn phải tay tải chromedriver và cập nhật đường dẫn mỗi khi Chrome tự nâng cấp. Đây là một trong những nguyên nhân phổ biến nhất gây gãy pipeline trước đây.",
        "Since Selenium 4 the W3C protocol is the only default, replacing the old JSON Wire Protocol. This removes many cross-browser behavior differences and enables DevTools integration such as capturing console logs or emulating geolocation. Selenium Manager, also introduced in the 4.x line, automatically downloads the driver version matching the local browser, so you no longer hand-download chromedriver and update paths every time Chrome auto-updates — historically one of the most common causes of broken pipelines.",
        "Selenium 4 以降、W3C プロトコルが唯一の既定となり、旧来の JSON Wire Protocol を置き換えました。これによりブラウザ間の挙動差が減り、コンソールログ取得や位置情報エミュレーションといった DevTools 連携が可能になります。同じく 4 系で導入された Selenium Manager は、ローカルのブラウザに合うドライババージョンを自動でダウンロードするため、Chrome が自動更新するたびに chromedriver を手動取得してパスを直す必要がなくなりました。これは以前パイプラインが壊れる最も一般的な原因の一つでした。"
      ),
    ],
  },
  {
    heading: { vi: "3. Cài đặt và khởi động phiên đầu tiên", en: "3. Installation and your first session", ja: "3. インストールと最初のセッション" },
    blocks: [
      P(
        "Với Python, bạn chỉ cần cài selenium qua pip; từ phiên bản 4.6 trở đi Selenium Manager tự lo phần driver. Đoạn code dưới mở Chrome, truy cập trang đăng nhập, và in tiêu đề. Với Java, bạn thêm dependency selenium-java vào Maven hoặc Gradle. Điểm mấu chốt cho người mới: luôn gọi driver.quit() trong khối finally hoặc teardown để đóng phiên và giải phóng tiến trình driver, nếu không bạn sẽ tích tụ hàng chục tiến trình chromedriver treo trên máy CI và làm cạn RAM.",
        "In Python just install selenium via pip; from 4.6 onward Selenium Manager handles the driver. The snippet below opens Chrome, visits a login page and prints the title. In Java you add the selenium-java dependency to Maven or Gradle. Key point for beginners: always call driver.quit() in a finally block or teardown to close the session and free the driver process, otherwise you accumulate dozens of hung chromedriver processes on the CI machine and exhaust RAM.",
        "Python では pip で selenium を入れるだけで、4.6 以降は Selenium Manager がドライバを面倒見ます。以下のコードは Chrome を開き、ログインページへアクセスしてタイトルを表示します。Java では selenium-java 依存関係を Maven か Gradle に追加します。初心者への要点は、必ず finally ブロックか teardown で driver.quit() を呼び、セッションを閉じてドライバプロセスを解放することです。さもないと CI マシン上に停止した chromedriver プロセスが何十も溜まり、RAM を使い果たします。"
      ),
      CODE("python", `# pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()          # Selenium Manager tự tải driver
try:
    driver.get("https://example.com/login")
    print(driver.title)
    driver.find_element(By.ID, "username").send_keys("qa_user")
    driver.find_element(By.ID, "password").send_keys("secret")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
finally:
    driver.quit()                    # LUÔN đóng phiên`),
      CODE("java", `// Maven: org.seleniumhq.selenium:selenium-java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
  public static void main(String[] args) {
    WebDriver driver = new ChromeDriver();      // Selenium Manager resolves driver
    try {
      driver.get("https://example.com/login");
      System.out.println(driver.getTitle());
      driver.findElement(By.id("username")).sendKeys("qa_user");
      driver.findElement(By.id("password")).sendKeys("secret");
      driver.findElement(By.cssSelector("button[type='submit']")).click();
    } finally {
      driver.quit();
    }
  }
}`),
      TIP(
        "Trên CI dùng chế độ headless (options.add_argument(\"--headless=new\")) và đặt kích thước cửa sổ cố định để kết quả ổn định giữa máy local và server.",
        "On CI use headless mode (options.add_argument(\"--headless=new\")) and set a fixed window size so results stay consistent between local and server.",
        "CI ではヘッドレスモード（options.add_argument(\"--headless=new\")）を使い、ウィンドウサイズを固定して、ローカルとサーバーで結果を一致させましょう。"
      ),
    ],
  },
  {
    heading: { vi: "4. Định vị phần tử: By locators", en: "4. Locating elements: By locators", ja: "4. 要素の特定: By ロケーター" },
    blocks: [
      P(
        "Toàn bộ độ ổn định của một test phụ thuộc vào chất lượng locator. Selenium hỗ trợ tám chiến lược qua lớp By: ID, NAME, CLASS_NAME, TAG_NAME, LINK_TEXT, PARTIAL_LINK_TEXT, CSS_SELECTOR và XPATH. Thứ tự ưu tiên thực tế nên là: ID ổn định nhất vì thường duy nhất và ít đổi, kế đến là CSS selector dựa trên thuộc tính data-testid mà đội dev thêm riêng cho kiểm thử, sau cùng mới đến XPath khi cần điều hướng theo quan hệ cha-con hoặc lọc theo text. Tránh dùng XPath tuyệt đối kiểu /html/body/div[3]/div[2] vì chỉ cần thêm một thẻ div là gãy. Locator tốt là locator mô tả ý nghĩa nghiệp vụ, không mô tả vị trí vật lý trên cây DOM.",
        "A test's stability lives or dies by locator quality. Selenium offers eight strategies through the By class: ID, NAME, CLASS_NAME, TAG_NAME, LINK_TEXT, PARTIAL_LINK_TEXT, CSS_SELECTOR and XPATH. A practical priority: ID is the most stable since it is usually unique and rarely changes, then a CSS selector on a data-testid attribute the dev team adds specifically for testing, and only then XPath when you need parent-child navigation or text filtering. Avoid absolute XPath like /html/body/div[3]/div[2] because adding a single div breaks it. A good locator describes business meaning, not a physical position in the DOM tree.",
        "テストの安定性はロケーターの品質で決まります。Selenium は By クラスを通じて 8 種類の戦略を提供します: ID、NAME、CLASS_NAME、TAG_NAME、LINK_TEXT、PARTIAL_LINK_TEXT、CSS_SELECTOR、XPATH です。実務での優先順位は、ID が通常一意で変わりにくく最も安定、次に開発チームがテスト用に付ける data-testid 属性への CSS セレクター、最後に親子ナビゲーションやテキスト絞り込みが必要なときの XPath です。/html/body/div[3]/div[2] のような絶対 XPath は div を一つ足すだけで壊れるので避けます。良いロケーターは DOM ツリー上の物理的位置ではなく業務的な意味を表します。"
      ),
      CODE("python", `from selenium.webdriver.common.by import By

# Ưu tiên cao → thấp
driver.find_element(By.ID, "checkout-btn")                       # tốt nhất
driver.find_element(By.CSS_SELECTOR, "[data-testid='add-cart']") # ổn định cho test
driver.find_element(By.CSS_SELECTOR, "form.login input[name='email']")
driver.find_element(By.XPATH, "//button[normalize-space()='Thanh toán']")  # lọc theo text
# TRÁNH: XPath tuyệt đối
# driver.find_element(By.XPATH, "/html/body/div[3]/div[2]/button")  # dễ gãy`),
      UL(
        ["ID: nhanh nhất, ưu tiên nếu duy nhất và ổn định", "CSS selector: linh hoạt, đọc dễ, hiệu năng tốt", "data-testid: thuộc tính riêng cho test, không đổi khi CSS đổi", "XPath: mạnh nhất cho text và quan hệ, nhưng dễ giòn nếu lạm dụng"],
        ["ID: fastest, prefer when unique and stable", "CSS selector: flexible, readable, good performance", "data-testid: a test-only attribute, immune to CSS changes", "XPath: most powerful for text and relationships, but brittle if overused"],
        ["ID: 最速、一意で安定なら優先します", "CSS セレクター: 柔軟で読みやすく性能も良好です", "data-testid: テスト専用属性で CSS 変更の影響を受けません", "XPath: テキストや関係に最強ですが乱用すると壊れやすいです"]
      ),
      WARN(
        "CLASS_NAME dựa trên class CSS rất dễ gãy vì dev đổi style thường xuyên; và các class do framework tự sinh (ví dụ css-1a2b3c) thay đổi mỗi lần build. Đừng bao giờ neo test vào chúng.",
        "CLASS_NAME on CSS classes is very brittle since devs change styling often; and framework-generated classes (e.g. css-1a2b3c) change every build. Never anchor tests to them.",
        "CSS クラスに依存する CLASS_NAME は、開発者がスタイルを頻繁に変えるため非常に壊れやすく、フレームワークが自動生成するクラス（例: css-1a2b3c）はビルドごとに変わります。テストをそれらに固定してはいけません。"
      ),
    ],
  },
  {
    heading: { vi: "5. Explicit wait: nền tảng của test ổn định", en: "5. Explicit wait: the basis of stable tests", ja: "5. 明示的待機: 安定テストの基礎" },
    blocks: [
      P(
        "Ứng dụng web hiện đại tải bất đồng bộ: dữ liệu về sau, animation chạy, nút bị disable rồi mới enable. Nếu test cố click ngay khi phần tử chưa sẵn sàng, nó sẽ ném NoSuchElementException hoặc ElementNotInteractableException. Cách chữa đúng đắn không phải time.sleep(3) cứng nhắc mà là explicit wait: WebDriverWait kết hợp với các điều kiện trong ExpectedConditions. Nó poll DOM theo chu kỳ (mặc định 500ms) cho tới khi điều kiện đúng hoặc hết timeout. Nhờ vậy test chờ đúng bằng thời gian cần thiết, không nhanh hơn để gãy, cũng không chậm hơn để lãng phí. Đây là kỹ thuật quan trọng nhất để chống flaky và sẽ được đào sâu ở bài số 2.",
        "Modern web apps load asynchronously: data arrives later, animations play, buttons are disabled then enabled. If a test clicks before the element is ready it throws NoSuchElementException or ElementNotInteractableException. The correct fix is not a rigid time.sleep(3) but an explicit wait: WebDriverWait combined with conditions from ExpectedConditions. It polls the DOM periodically (500ms by default) until the condition is true or the timeout elapses. The test waits exactly as long as needed — not shorter (breaking) nor longer (wasteful). This is the single most important technique against flakiness, explored in depth in article 2.",
        "現代の Web アプリは非同期に読み込まれます。データは後から届き、アニメーションが走り、ボタンは無効から有効に変わります。要素が準備できる前にクリックすると NoSuchElementException や ElementNotInteractableException が発生します。正しい対処は硬直的な time.sleep(3) ではなく明示的待機です。WebDriverWait と ExpectedConditions の条件を組み合わせ、条件が真になるかタイムアウトまで DOM を定期的に（既定 500ms）ポーリングします。これによりテストは必要な時間だけ待ち、短すぎて壊れることも長すぎて無駄になることもありません。フレーキー対策で最重要の技術で、記事 2 で深掘りします。"
      ),
      CODE("python", `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

wait = WebDriverWait(driver, 10)   # timeout 10s, poll 500ms
# Chờ nút clickable rồi mới click — không dùng sleep
btn = wait.until(EC.element_to_be_clickable((By.ID, "checkout-btn")))
btn.click()
# Chờ thông báo thành công xuất hiện
wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".toast-success")))`),
      NOTE(
        "Không trộn implicit wait và explicit wait trong cùng một driver. Khi cả hai cùng bật, thời gian chờ có thể cộng dồn khó lường và gây timeout kỳ lạ.",
        "Do not mix implicit and explicit waits on the same driver. With both on, wait times can add up unpredictably and cause strange timeouts.",
        "同じドライバで暗黙的待機と明示的待機を混在させないでください。両方有効だと待機時間が予測不能に加算され、奇妙なタイムアウトを招きます。"
      ),
    ],
  },
  {
    heading: { vi: "6. Tương tác nâng cao: form, dropdown, alert, frame", en: "6. Advanced interactions: forms, dropdowns, alerts, frames", ja: "6. 高度な操作: フォーム・ドロップダウン・アラート・フレーム" },
    blocks: [
      P(
        "Ngoài click và gõ chữ, kịch bản thực tế phải xử lý dropdown gốc bằng lớp Select, hộp thoại JavaScript alert/confirm qua driver.switch_to.alert, và nội dung nằm trong iframe qua switch_to.frame. Đây là những nơi người mới hay vấp: một nút nằm trong iframe sẽ không bao giờ tìm thấy nếu bạn chưa switch vào frame đó. Với các thao tác phức tạp như kéo thả, hover menu, giữ phím Ctrl để chọn nhiều dòng, Selenium cung cấp lớp ActionChains (Python) hoặc Actions (Java) để dựng chuỗi hành động chuột và bàn phím. Sau khi thao tác trong frame xong, nhớ switch_to.default_content() để quay về ngữ cảnh chính, nếu không các lệnh tiếp theo sẽ tìm nhầm chỗ.",
        "Beyond clicking and typing, real scenarios must handle native dropdowns via the Select class, JavaScript alert/confirm dialogs via driver.switch_to.alert, and content inside an iframe via switch_to.frame. These trip beginners up: a button inside an iframe is never found until you switch into that frame. For complex gestures like drag-and-drop, hover menus, or Ctrl-selecting multiple rows, Selenium provides ActionChains (Python) or Actions (Java) to build sequences of mouse and keyboard actions. After working in a frame, remember switch_to.default_content() to return to the main context, otherwise later commands look in the wrong place.",
        "クリックや入力の他に、実際のシナリオでは Select クラスによるネイティブドロップダウン、driver.switch_to.alert による JavaScript の alert/confirm ダイアログ、switch_to.frame による iframe 内コンテンツを扱う必要があります。ここは初心者がつまずく所で、iframe 内のボタンはそのフレームへ切り替えるまで決して見つかりません。ドラッグ＆ドロップ、ホバーメニュー、Ctrl を押しながらの複数行選択などの複雑な操作には、マウスとキーボードの連続動作を組み立てる ActionChains（Python）や Actions（Java）があります。フレーム内で作業したら switch_to.default_content() で主コンテキストへ戻らないと、後続コマンドが誤った場所を探します。"
      ),
      CODE("python", `from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains

# Dropdown gốc <select>
Select(driver.find_element(By.ID, "country")).select_by_visible_text("Vietnam")

# Alert của trình duyệt
alert = driver.switch_to.alert
alert.accept()

# Vào iframe rồi thao tác, sau đó quay ra
driver.switch_to.frame("payment-iframe")
driver.find_element(By.ID, "card-number").send_keys("4111111111111111")
driver.switch_to.default_content()

# Hover để mở menu rồi click mục con
menu = driver.find_element(By.ID, "account-menu")
ActionChains(driver).move_to_element(menu).click(
    driver.find_element(By.LINK_TEXT, "Đăng xuất")).perform()`),
    ],
  },
  {
    heading: { vi: "7. Page Object Model: tách locator khỏi test", en: "7. Page Object Model: separating locators from tests", ja: "7. Page Object Model: ロケーターとテストの分離" },
    blocks: [
      P(
        "Khi bộ test lớn dần, nếu mỗi test đều chứa By.id và click rải rác thì một thay đổi UamI nhỏ trên trang đăng nhập sẽ buộc bạn sửa hàng chục test. Page Object Model (POM) giải quyết bằng cách gom mọi locator và hành động của một màn hình vào một lớp đại diện. Test chỉ gọi các phương thức nghiệp vụ như loginPage.login(user, pass) mà không biết gì về CSS bên dưới. Khi dev đổi id ô mật khẩu, bạn chỉ sửa đúng một dòng trong LoginPage, mọi test dùng nó tự hưởng lợi. POM biến bộ test từ đống script khó bảo trì thành một thư viện mô tả ứng dụng theo ngôn ngữ người dùng, dễ đọc cho cả người không viết code.",
        "As a suite grows, if every test contains scattered By.id and click calls, a tiny UI change to the login screen forces you to edit dozens of tests. The Page Object Model (POM) solves this by gathering every locator and action of one screen into a representative class. Tests only call business methods like loginPage.login(user, pass) and know nothing about the underlying CSS. When a dev changes the password field id, you fix exactly one line in LoginPage and every test using it benefits. POM turns a suite from an unmaintainable pile of scripts into a library that describes the app in the user's language, readable even by non-coders.",
        "スイートが大きくなると、各テストに By.id や click が散在していれば、ログイン画面の小さな UI 変更で何十ものテストを直す羽目になります。Page Object Model（POM）は、ある画面のロケーターと操作をすべて代表クラスにまとめて解決します。テストは loginPage.login(user, pass) のような業務メソッドを呼ぶだけで、背後の CSS を知りません。開発者がパスワード欄の id を変えても、LoginPage の 1 行を直すだけで、それを使う全テストが恩恵を受けます。POM はスイートを保守困難なスクリプトの山から、アプリをユーザーの言葉で表すライブラリへ変えます。"
      ),
      IMG(SVG_POM, "POM tách trách nhiệm: page giữ locator, test giữ nghiệp vụ", "POM separates concerns: page holds locators, test holds business logic", "POM は責務を分離: page がロケーター、test が業務ロジックを保持"),
      CODE("python", `# pages/login_page.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    USERNAME = (By.ID, "username")
    PASSWORD = (By.ID, "password")
    SUBMIT   = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR    = (By.CSS_SELECTOR, ".alert-error")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def login(self, user, pw):
        self.wait.until(EC.visibility_of_element_located(self.USERNAME)).send_keys(user)
        self.driver.find_element(*self.PASSWORD).send_keys(pw)
        self.driver.find_element(*self.SUBMIT).click()

    def error_text(self):
        return self.wait.until(EC.visibility_of_element_located(self.ERROR)).text`),
      CODE("python", `# tests/test_login.py — test SẠCH, chỉ nghiệp vụ
def test_login_sai_mat_khau(driver):
    page = LoginPage(driver)
    driver.get("https://example.com/login")
    page.login("qa_user", "wrong_pass")
    assert "Sai thông tin đăng nhập" in page.error_text()`),
    ],
  },
  {
    heading: { vi: "8. Ví dụ leo thang: kịch bản checkout đầu-cuối", en: "8. Escalating example: an end-to-end checkout", ja: "8. 段階的な例: エンドツーエンドの購入フロー" },
    blocks: [
      P(
        "Ghép các mảnh lại, đây là một kịch bản thực tế: đăng nhập, thêm sản phẩm vào giỏ, đi tới thanh toán, điền địa chỉ trong iframe, xác nhận và kiểm tra mã đơn hàng hiển thị. Kịch bản này chạm tới hầu hết kỹ thuật đã học: POM cho từng màn hình, explicit wait ở mỗi bước chuyển trang, Select cho quốc gia, switch_to.frame cho khối thanh toán. Điểm quan trọng là mỗi assertion đều đứng sau một wait tường minh, nên test không đỏ vì trang chưa kịp render. Với một đội SaaS, chính kịch bản đầu-cuối như thế này chạy trên CI mỗi đêm là lá chắn cuối cùng trước khi tính năng tới tay khách hàng trả tiền.",
        "Putting the pieces together, here is a realistic scenario: log in, add a product to the cart, go to checkout, fill an address inside an iframe, confirm, and assert the order code shows. It touches most techniques learned: POM per screen, explicit waits at each page transition, Select for country, switch_to.frame for the payment block. The key is that every assertion sits behind an explicit wait, so the test does not go red because the page had not rendered yet. For a SaaS team, exactly this kind of end-to-end scenario running on CI nightly is the last shield before a feature reaches paying customers.",
        "部品を組み合わせた現実的なシナリオです。ログインし、商品をカートに追加し、購入画面へ進み、iframe 内で住所を入力し、確定して注文番号の表示を検証します。これは学んだ技術の大半に触れます。画面ごとの POM、各ページ遷移での明示的待機、国選択の Select、決済ブロックの switch_to.frame です。要点は、すべてのアサーションが明示的待機の後ろにあることで、ページがまだ描画されていないためにテストが赤くなりません。SaaS チームにとって、まさにこの種の E2E シナリオを CI で毎晩実行することが、機能が有料顧客に届く前の最後の盾です。"
      ),
      CODE("python", `def test_checkout_thanh_cong(driver):
    driver.get("https://shop.example.com")
    LoginPage(driver).login("buyer@example.com", "pass123")

    catalog = CatalogPage(driver)
    catalog.add_to_cart("SKU-1001")
    catalog.go_to_checkout()

    checkout = CheckoutPage(driver)
    checkout.fill_address(country="Vietnam", city="Hà Nội", street="12 Lê Lợi")
    checkout.fill_payment_in_iframe(card="4111111111111111")  # tự switch frame
    order_code = checkout.confirm_and_get_order_code()        # wait toast rồi đọc

    assert order_code.startswith("ORD-"), f"Mã đơn không hợp lệ: {order_code}"`),
      TIP(
        "Đặt mỗi bước nghiệp vụ vào một phương thức của page và cho nó tự chờ trạng thái sẵn sàng. Test đọc như một câu chuyện, ai cũng hiểu, và cực kỳ bền.",
        "Put each business step into a page method and let it self-wait for readiness. The test reads like a story anyone understands, and it is extremely durable.",
        "各業務ステップを page のメソッドにし、準備完了を自ら待たせましょう。テストは誰でも分かる物語のように読め、非常に頑丈になります。"
      ),
    ],
  },
  {
    heading: { vi: "9. Những lỗi phổ biến khiến test giòn", en: "9. Common pitfalls that make tests brittle", ja: "9. テストを脆くする典型的な落とし穴" },
    blocks: [
      P(
        "Phần lớn test Selenium bị bỏ hoang không phải vì Selenium yếu mà vì viết sai vài thói quen. Lỗi số một là dùng time.sleep cứng thay wait tường minh: máy chậm thì gãy, máy nhanh thì phí thời gian. Lỗi thứ hai là locator giòn dựa vào vị trí DOM hay class tự sinh. Lỗi thứ ba là không cô lập dữ liệu: test tạo user nhưng không dọn, chạy lần hai thì đụng trùng. Lỗi thứ tư là chia sẻ trạng thái giữa các test khiến thứ tự chạy ảnh hưởng kết quả. Lỗi thứ năm là bỏ quên driver.quit() gây rò rỉ tiến trình. Nhận diện được năm nhóm này, bạn đã tránh khoảng 80% nguyên nhân flaky trong thực tế.",
        "Most Selenium suites get abandoned not because Selenium is weak but because of a few bad habits. Number one is hard time.sleep instead of explicit waits: slow machines break, fast ones waste time. Number two is brittle locators tied to DOM position or generated classes. Number three is no data isolation: a test creates a user but never cleans up, so the second run collides. Number four is shared state between tests so run order affects results. Number five is forgetting driver.quit(), leaking processes. Recognize these five and you avoid roughly 80% of real-world flakiness causes.",
        "Selenium スイートの多くは Selenium が弱いからではなく、いくつかの悪い習慣で放棄されます。第一は明示的待機ではなく硬い time.sleep で、遅いマシンでは壊れ、速いマシンでは時間を浪費します。第二は DOM 位置や自動生成クラスに依存した脆いロケーターです。第三はデータ分離の欠如で、テストがユーザーを作っても後始末せず、2 回目の実行で衝突します。第四はテスト間の状態共有で、実行順序が結果に影響します。第五は driver.quit() の忘れによるプロセスリークです。この 5 群を認識すれば、実務のフレーキー原因の約 80% を避けられます。"
      ),
      UL(
        ["Thay mọi sleep cứng bằng WebDriverWait + ExpectedConditions", "Ưu tiên id/data-testid, tránh XPath tuyệt đối và class tự sinh", "Mỗi test tự tạo và tự dọn dữ liệu của mình", "Test độc lập, không phụ thuộc thứ tự", "Luôn quit driver trong teardown"],
        ["Replace every hard sleep with WebDriverWait + ExpectedConditions", "Prefer id/data-testid, avoid absolute XPath and generated classes", "Each test creates and cleans up its own data", "Independent tests, no order dependency", "Always quit the driver in teardown"],
        ["硬い sleep をすべて WebDriverWait + ExpectedConditions へ置き換えます", "id/data-testid を優先し、絶対 XPath と自動生成クラスを避けます", "各テストが自分のデータを作成し後始末します", "テストは独立させ、実行順序に依存させません", "teardown で必ずドライバを quit します"]
      ),
    ],
  },
  {
    heading: { vi: "10. So sánh Selenium với Playwright và Cypress", en: "10. Selenium vs Playwright and Cypress", ja: "10. Selenium と Playwright・Cypress の比較" },
    blocks: [
      P(
        "Selenium không phải lựa chọn duy nhất. Playwright của Microsoft có auto-wait tích hợp, chạy nhanh, hỗ trợ nhiều tab và trace viewer mạnh; nó gọn cho dự án web mới. Cypress chạy trong cùng vòng lặp sự kiện của trình duyệt, gỡ lỗi trực quan tuyệt vời nhưng bị giới hạn về đa tab và cross-origin. Vậy khi nào vẫn chọn Selenium? Khi bạn cần độ phủ trình duyệt rộng nhất kể cả Safari và các trình duyệt cũ, cần hỗ trợ đa ngôn ngữ lập trình cho đội hỗn hợp, cần Grid để mở rộng phân tán quy mô doanh nghiệp, hoặc đang duy trì một hệ thống test Selenium trưởng thành đã đầu tư nhiều năm. Selenium là chuẩn W3C, hệ sinh thái lớn nhất và ổn định lâu dài.",
        "Selenium is not the only choice. Microsoft's Playwright has built-in auto-wait, runs fast, supports multiple tabs and a powerful trace viewer; it is lean for greenfield web projects. Cypress runs inside the browser's event loop with excellent visual debugging but is limited on multi-tab and cross-origin. So when do you still pick Selenium? When you need the widest browser coverage including Safari and legacy browsers, multi-language bindings for a mixed team, Grid for enterprise-scale distributed scaling, or you maintain a mature Selenium suite with years of investment. Selenium is the W3C standard, the largest ecosystem and stable long-term.",
        "Selenium が唯一の選択肢ではありません。Microsoft の Playwright は自動待機を内蔵し、高速で、複数タブや強力なトレースビューアーに対応し、新規 Web プロジェクトに軽量です。Cypress はブラウザのイベントループ内で動作し、視覚的デバッグに優れますが、複数タブやクロスオリジンに制約があります。ではいつ Selenium を選ぶのか。Safari や旧ブラウザを含む最も広いブラウザ網羅、混成チーム向けの多言語対応、企業規模の分散スケーリングのための Grid、あるいは長年投資した成熟した Selenium スイートを維持する場合です。Selenium は W3C 標準で、最大級のエコシステムを持ち、長期的に安定します。"
      ),
      QA(
        "Đội tôi làm web mới toanh, không có ràng buộc cũ, nên chọn gì?",
        "My team builds a brand-new web app with no legacy constraints — what should we pick?",
        "Với dự án mới không ràng buộc, Playwright thường cho trải nghiệm nhanh và ít flaky hơn nhờ auto-wait. Nhưng nếu đội đã thạo Java/Selenium hoặc cần Safari và Grid doanh nghiệp, Selenium 4 vẫn là lựa chọn vững. Không có công cụ nào sai, chỉ có công cụ hợp bối cảnh.",
        "For a greenfield project with no constraints, Playwright often gives a faster, less flaky experience thanks to auto-wait. But if the team already knows Java/Selenium or needs Safari and enterprise Grid, Selenium 4 remains a solid choice. No tool is wrong; only fit for context matters.",
        "新規で制約のないプロジェクトでは、自動待機のおかげで Playwright の方が高速でフレーキーが少ないことが多いです。ただしチームが既に Java/Selenium に精通している、または Safari や企業向け Grid が必要なら、Selenium 4 も堅実な選択です。間違ったツールはなく、文脈への適合だけが重要です。"
      ),
    ],
  },
  {
    heading: { vi: "11. Kịch bản thực chiến tại doanh nghiệp", en: "11. A real workplace scenario", ja: "11. 職場での実戦シナリオ" },
    blocks: [
      SCEN(
        "Regression đêm cho SaaS quản lý hợp đồng",
        "Nightly regression for a contract-management SaaS",
        "Đội QA năm người bảo trì 420 test Selenium POM cho một SaaS 300 màn hình. Trước đây bộ test hay đỏ ngẫu nhiên khoảng 15% mỗi lần chạy, dev mất niềm tin và bắt đầu bỏ qua kết quả. Đội rà lại: thay toàn bộ sleep bằng explicit wait, chuẩn hoá locator sang data-testid do dev thêm, tách dữ liệu test qua API seed trước mỗi ca, và bật retry một lần cho test đỏ. Sau ba tuần, tỉ lệ đỏ ngẫu nhiên rớt xuống dưới 1% và pipeline lấy lại uy tín.",
        "A five-person QA team maintains 420 Selenium POM tests for a 300-screen SaaS. The suite used to fail randomly about 15% per run; devs lost trust and started ignoring results. The team audited it: replaced all sleeps with explicit waits, standardized locators to dev-added data-testid, isolated test data via an API seed before each run, and enabled a single retry for red tests. After three weeks the random-failure rate dropped below 1% and the pipeline regained credibility.",
        "契約管理 SaaS の 300 画面に対し、5 名の QA チームが 420 の Selenium POM テストを保守します。",
        "5 名の QA チームが 300 画面の SaaS 向けに 420 の Selenium POM テストを保守します。以前はスイートが実行ごとに約 15% ランダムに失敗し、開発者は信頼を失って結果を無視し始めました。チームは監査し、全 sleep を明示的待機へ置換、ロケーターを開発者が追加した data-testid に標準化、各実行前に API シードでテストデータを分離し、赤いテストに 1 回のリトライを有効化しました。3 週間後、ランダム失敗率は 1% 未満に下がり、パイプラインは信頼を取り戻しました。"
      ),
      P(
        "Bài học rút ra không nằm ở một API cao siêu mà ở kỷ luật kỹ thuật: chờ đúng, định vị bền, cô lập dữ liệu, và đo lường tỉ lệ flaky như một chỉ số chất lượng. Một bộ test đỏ ngẫu nhiên còn tệ hơn không có test, vì nó bào mòn niềm tin của cả đội. Người QA giỏi không chỉ viết được test mà còn giữ cho nó xanh một cách trung thực qua thời gian.",
        "The lesson is not some exotic API but engineering discipline: wait correctly, locate durably, isolate data, and measure the flaky rate as a quality metric. A randomly-red suite is worse than no suite because it erodes the whole team's trust. A strong QA not only writes tests but keeps them honestly green over time.",
        "教訓は高度な API ではなく技術的規律です。正しく待ち、頑丈に特定し、データを分離し、フレーキー率を品質指標として測定することです。ランダムに赤くなるスイートはテストが無いより悪く、チーム全体の信頼を蝕みます。優れた QA はテストを書けるだけでなく、時間をかけて誠実に緑を保ちます。"
      ),
    ],
  },
  {
    heading: { vi: "12. Câu hỏi phỏng vấn và tổng kết", en: "12. Interview questions and summary", ja: "12. 面接質問とまとめ" },
    blocks: [
      QA(
        "Giải thích sự khác nhau giữa findElement và findElements.",
        "Explain the difference between findElement and findElements.",
        "findElement trả về phần tử đầu tiên khớp locator và ném NoSuchElementException nếu không có. findElements trả về một danh sách; nếu không khớp gì thì trả về danh sách rỗng chứ không ném lỗi. Vì thế để kiểm tra một phần tử có tồn tại hay không, người ta thường dùng findElements rồi kiểm tra độ dài danh sách.",
        "findElement returns the first matching element and throws NoSuchElementException if none exists. findElements returns a list; with no match it returns an empty list rather than throwing. So to check whether an element exists, people often use findElements and check the list length.",
        "findElement は最初に一致した要素を返し、無ければ NoSuchElementException を投げます。findElements はリストを返し、一致が無ければ例外ではなく空リストを返します。そのため要素の有無を確認するには findElements を使ってリストの長さを調べるのが一般的です。",
        ""
      ),
      QA(
        "Tại sao không nên dùng implicit wait và explicit wait cùng lúc?",
        "Why should you not use implicit and explicit waits together?",
        "Khi cả hai cùng bật, cơ chế polling của chúng có thể chồng lên nhau khiến thời gian chờ thực tế lớn hơn dự kiến và biến động khó lường giữa các lần chạy. Điều này gây timeout ngẫu nhiên và làm test khó gỡ lỗi. Khuyến nghị là tắt implicit wait và dùng explicit wait một cách nhất quán.",
        "With both on, their polling mechanisms can compound, making actual wait time larger than expected and unpredictable across runs. This causes random timeouts and hard-to-debug tests. The recommendation is to disable implicit wait and use explicit waits consistently.",
        "両方有効だとポーリングが重なり合い、実際の待機時間が想定より長く、実行ごとに予測不能に変動します。これがランダムなタイムアウトを生み、デバッグを困難にします。推奨は暗黙的待機を無効化し、明示的待機を一貫して使うことです。",
        ""
      ),
      QA(
        "Page Object Model mang lại lợi ích gì so với viết locator trực tiếp trong test?",
        "What does the Page Object Model give you over inlining locators in tests?",
        "POM tập trung locator và hành động của mỗi màn hình vào một lớp, nên khi UI đổi bạn chỉ sửa một chỗ thay vì hàng chục test. Nó tăng khả năng tái sử dụng, giảm trùng lặp, và làm test đọc theo ngôn ngữ nghiệp vụ nên dễ bảo trì và dễ hiểu cho cả người không code.",
        "POM centralizes each screen's locators and actions into one class, so a UI change means fixing one place instead of dozens of tests. It improves reuse, reduces duplication, and makes tests read in business language — easier to maintain and understandable even to non-coders.",
        "POM は各画面のロケーターと操作を 1 つのクラスに集約するため、UI 変更時は何十ものテストではなく 1 か所を直すだけで済みます。再利用性が上がり重複が減り、テストが業務言語で読めるため、保守しやすく非エンジニアにも分かりやすくなります。",
        ""
      ),
      P(
        "Tổng kết, Selenium WebDriver điều khiển trình duyệt thật qua giao thức W3C ba tầng, và chất lượng test phụ thuộc vào ba trụ cột: locator bền, explicit wait đúng chỗ, và Page Object Model để dễ bảo trì. Nắm chắc ba điều này cộng với kỷ luật cô lập dữ liệu và luôn quit driver, bạn đã có nền tảng để xây một bộ test hồi quy đáng tin. Hai bài tiếp theo sẽ đào sâu vào chống flaky bằng đồng bộ hoá, và mở rộng chạy song song bằng Selenium Grid.",
        "In summary, Selenium WebDriver drives real browsers over the three-tier W3C protocol, and test quality rests on three pillars: durable locators, well-placed explicit waits, and the Page Object Model for maintainability. Master these plus the discipline of data isolation and always quitting the driver, and you have the foundation for a trustworthy regression suite. The next two articles go deep on killing flakiness through synchronization and scaling out parallel runs with Selenium Grid.",
        "まとめると、Selenium WebDriver は 3 層の W3C プロトコルで実ブラウザを操作し、テスト品質は 3 本の柱に支えられます。頑丈なロケーター、適所の明示的待機、保守性のための Page Object Model です。これらにデータ分離とドライバの必ずの quit という規律を加えれば、信頼できる回帰スイートの基盤が整います。次の 2 記事では同期化によるフレーキー撲滅と、Selenium Grid による並列実行のスケールアウトを深掘りします。"
      ),
      UL(
        ["WebDriver = client + browser driver + browser qua W3C", "Locator ưu tiên id/data-testid, tránh XPath tuyệt đối", "Explicit wait thay sleep để chống flaky", "POM để bảo trì; cô lập dữ liệu; luôn quit driver"],
        ["WebDriver = client + browser driver + browser over W3C", "Prefer id/data-testid locators, avoid absolute XPath", "Explicit waits replace sleep to fight flakiness", "POM for maintainability; isolate data; always quit driver"],
        ["WebDriver = クライアント + ブラウザドライバ + ブラウザ（W3C 経由）", "ロケーターは id/data-testid を優先し絶対 XPath を避けます", "sleep の代わりに明示的待機でフレーキー対策します", "保守性に POM、データ分離、ドライバは必ず quit します"]
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE 2 — Waits & Synchronization (kill flakiness)
// ===========================================================================
const pages2 = [
  {
    heading: { vi: "1. Flaky test là gì và vì sao nó chết người", en: "1. What flaky tests are and why they are deadly", ja: "1. フレーキーなテストとは何か、なぜ致命的か" },
    blocks: [
      P(
        "Một test flaky là test có lúc xanh có lúc đỏ trên cùng một đoạn code không đổi. Trong hệ thống lõi của một ngân hàng số, nơi mỗi lần release chạm tới giao dịch tiền thật, một bộ test hay đỏ ngẫu nhiên còn nguy hiểm hơn không có test: nó khiến đội mất niềm tin, bắt đầu bấm chạy lại cho tới khi xanh, và cuối cùng vô hiệu hoá luôn cả những lần đỏ thật sự là bug. Nguyên nhân số một của flaky trong Selenium là đồng bộ hoá sai: test chạy nhanh hơn tốc độ ứng dụng cập nhật DOM. Bài này đào sâu ba loại wait, ExpectedConditions, điều kiện tuỳ biến, stale element, race condition và chiến lược retry để đưa tỉ lệ flaky về gần không.",
        "A flaky test passes sometimes and fails other times on the exact same unchanged code. In a digital bank's core system, where every release touches real money movement, a randomly-red suite is more dangerous than no suite: the team loses trust, starts re-running until green, and eventually ignores even the reds that are genuine bugs. The number one cause of Selenium flakiness is bad synchronization: the test runs faster than the app updates the DOM. This article dives into the three wait types, ExpectedConditions, custom conditions, stale elements, race conditions and retry strategy to drive the flaky rate near zero.",
        "フレーキーなテストとは、まったく同じ変更のないコードに対し、あるときは緑、あるときは赤になるテストです。実際の資金移動に触れるデジタルバンクの中核システムでは、ランダムに赤くなるスイートはテストが無いより危険です。チームは信頼を失い、緑になるまで再実行し始め、やがて本物のバグである赤さえ無視します。Selenium のフレーキーの最大原因は同期化の失敗で、アプリが DOM を更新する速度よりテストが速く動くことです。本記事では 3 種類の待機、ExpectedConditions、カスタム条件、ステール要素、レースコンディション、リトライ戦略を深掘りし、フレーキー率をゼロ近くまで下げます。"
      ),
      WARN(
        "Đừng bao giờ chữa flaky bằng cách tăng time.sleep. Nó chỉ giấu triệu chứng, làm bộ test chậm dần, và vẫn gãy trên máy tải cao.",
        "Never fix flakiness by increasing time.sleep. It only hides the symptom, slows the suite down, and still breaks on a loaded machine.",
        "time.sleep を増やしてフレーキーを直そうとしてはいけません。症状を隠すだけでスイートを遅くし、負荷の高いマシンでは依然として壊れます。"
      ),
    ],
  },
  {
    heading: { vi: "2. Implicit wait: tiện nhưng nhiều bẫy", en: "2. Implicit wait: convenient but full of traps", ja: "2. 暗黙的待機: 便利だが罠が多い" },
    blocks: [
      P(
        "Implicit wait được đặt một lần cho cả driver bằng driver.implicitly_wait(10). Sau đó mọi lệnh findElement sẽ tự poll DOM tối đa 10 giây trước khi ném NoSuchElementException. Nghe rất tiện, nhưng nó có ba nhược điểm nghiêm trọng. Thứ nhất, nó chỉ chờ phần tử có mặt trong DOM, không chờ phần tử hiển thị hay có thể click, nên bạn vẫn dính ElementNotInteractableException. Thứ hai, nó áp lên mọi lời gọi kể cả những chỗ bạn cố ý muốn kiểm tra phần tử KHÔNG tồn tại, làm test kiểm tra vắng mặt chậm chạp một cách vô lý. Thứ ba, trộn nó với explicit wait gây cộng dồn thời gian khó lường. Nhiều đội trưởng thành chọn tắt hẳn implicit wait và chỉ dùng explicit.",
        "Implicit wait is set once per driver with driver.implicitly_wait(10). Then every findElement polls the DOM up to 10 seconds before throwing NoSuchElementException. Convenient, but it has three serious drawbacks. First, it only waits for presence in the DOM, not visibility or clickability, so you still hit ElementNotInteractableException. Second, it applies to every call including places where you deliberately check an element is ABSENT, making absence checks absurdly slow. Third, mixing it with explicit wait causes unpredictable compounding. Many mature teams disable implicit wait entirely and use explicit only.",
        "暗黙的待機は driver.implicitly_wait(10) でドライバに一度だけ設定します。以降、すべての findElement は NoSuchElementException を投げる前に最大 10 秒 DOM をポーリングします。便利ですが深刻な欠点が 3 つあります。第一に、DOM 上の存在だけを待ち、可視性やクリック可能性は待たないため、依然 ElementNotInteractableException に当たります。第二に、要素が「無い」ことをわざと確認する箇所も含め全呼び出しに適用され、不在確認が不合理に遅くなります。第三に、明示的待機と混ぜると予測不能に加算されます。成熟したチームの多くは暗黙的待機を完全に無効化し、明示的待機のみを使います。"
      ),
      IMG(SVG_WAITS, "Ba loại wait và khi nào dùng loại nào", "The three wait types and when to use each", "3 種類の待機とそれぞれの使いどころ"),
      CODE("python", `# Đặt implicit wait (nếu dùng) — CHỈ đặt một lần, đừng trộn explicit
driver.implicitly_wait(0)   # nhiều đội đặt 0 để tắt hẳn, dùng explicit thay thế

# Hệ quả: kiểm tra một phần tử vắng mặt sẽ RẤT chậm nếu implicit > 0
elements = driver.find_elements(By.CSS_SELECTOR, ".error")  # trả [] ngay nếu implicit=0
assert len(elements) == 0, "Không được có lỗi hiển thị"`),
    ],
  },
  {
    heading: { vi: "3. Explicit wait và ExpectedConditions", en: "3. Explicit wait and ExpectedConditions", ja: "3. 明示的待機と ExpectedConditions" },
    blocks: [
      P(
        "Explicit wait là công cụ chủ lực. Bạn tạo một WebDriverWait với timeout và chu kỳ poll, rồi truyền vào một điều kiện. Selenium cung cấp sẵn một bộ ExpectedConditions bao trùm hầu hết nhu cầu: presence_of_element_located chờ phần tử vào DOM, visibility_of_element_located chờ nó hiển thị, element_to_be_clickable chờ nó vừa hiển thị vừa bật, text_to_be_present_in_element chờ nội dung, staleness_of chờ một phần tử cũ biến mất, và alert_is_present chờ hộp thoại. Chọn đúng điều kiện cho đúng ý định là mấu chốt: nếu bạn định click thì chờ element_to_be_clickable chứ đừng chỉ chờ presence, vì phần tử có trong DOM chưa chắc đã bấm được.",
        "Explicit wait is the workhorse. You create a WebDriverWait with a timeout and polling interval, then pass a condition. Selenium ships a set of ExpectedConditions covering most needs: presence_of_element_located waits for the element in the DOM, visibility_of_element_located waits for it to be visible, element_to_be_clickable waits for visible and enabled, text_to_be_present_in_element waits for content, staleness_of waits for an old element to disappear, and alert_is_present waits for a dialog. Choosing the right condition for the right intent is key: if you intend to click, wait for element_to_be_clickable rather than mere presence, because being in the DOM does not mean it is clickable.",
        "明示的待機は主力です。タイムアウトとポーリング間隔を持つ WebDriverWait を作り、条件を渡します。Selenium はほとんどの用途を網羅する ExpectedConditions を用意しています。presence_of_element_located は DOM 内の存在を待ち、visibility_of_element_located は可視化を待ち、element_to_be_clickable は可視かつ有効を待ち、text_to_be_present_in_element は内容を待ち、staleness_of は古い要素の消失を待ち、alert_is_present はダイアログを待ちます。意図に合う条件選びが要点で、クリックするつもりなら単なる存在ではなく element_to_be_clickable を待ちます。DOM にあってもクリック可能とは限らないからです。"
      ),
      CODE("python", `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

wait = WebDriverWait(driver, 15, poll_frequency=0.5)

wait.until(EC.presence_of_element_located((By.ID, "app")))            # có trong DOM
wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".modal")))  # hiển thị
btn = wait.until(EC.element_to_be_clickable((By.ID, "pay")))         # bấm được
btn.click()
wait.until(EC.text_to_be_present_in_element(
    (By.CSS_SELECTOR, ".status"), "Thành công"))                     # có nội dung`),
      TIP(
        "Đặt timeout hào phóng (10–15s) nhưng chu kỳ poll ngắn (0.3–0.5s). Test sẽ tiếp tục ngay khi điều kiện đúng, nên timeout lớn không làm test chậm nếu app phản hồi nhanh.",
        "Use a generous timeout (10–15s) but a short poll interval (0.3–0.5s). The test continues the moment the condition is true, so a large timeout does not slow tests when the app responds quickly.",
        "タイムアウトは余裕をもって（10〜15 秒）、ポーリング間隔は短く（0.3〜0.5 秒）設定します。条件が真になった瞬間にテストが進むため、アプリの応答が速ければ大きなタイムアウトでもテストは遅くなりません。"
      ),
    ],
  },
  {
    heading: { vi: "4. Fluent wait và điều kiện tuỳ biến", en: "4. Fluent wait and custom conditions", ja: "4. Fluent 待機とカスタム条件" },
    blocks: [
      P(
        "Đôi khi các ExpectedConditions có sẵn không diễn tả được điều bạn cần, ví dụ chờ số dư tài khoản trong bảng cập nhật đúng bằng một giá trị sau khi API xử lý xong. Khi đó bạn viết điều kiện tuỳ biến: trong Python đó chỉ là một hàm hoặc callable nhận driver và trả về giá trị truthy khi thoả. Fluent wait là dạng explicit wait được tinh chỉnh thêm: bạn đặt riêng timeout, chu kỳ poll, và danh sách ngoại lệ cần bỏ qua giữa các lần poll. Điều này đặc biệt hữu ích để bỏ qua StaleElementReferenceException tạm thời trong lúc trang đang render lại, thay vì để nó làm gãy test.",
        "Sometimes the built-in ExpectedConditions cannot express what you need, e.g. waiting for an account balance in a table to update to exactly one value after an API finishes. Then you write a custom condition: in Python it is simply a function or callable taking driver and returning a truthy value when satisfied. Fluent wait is a further-tuned explicit wait: you set timeout, poll interval, and a list of exceptions to ignore between polls. This is especially useful to swallow a transient StaleElementReferenceException while the page re-renders, instead of letting it break the test.",
        "組み込みの ExpectedConditions で表現できない場合があります。たとえば API 処理後に表の残高がちょうどある値へ更新されるのを待つ場合です。そのときはカスタム条件を書きます。Python では driver を受け取り、満たされたら truthy を返す関数や呼び出し可能オブジェクトです。Fluent 待機はさらに調整した明示的待機で、タイムアウト、ポーリング間隔、ポーリング間で無視する例外のリストを設定します。これはページ再描画中の一時的な StaleElementReferenceException を、テストを壊させずに飲み込むのに特に有用です。"
      ),
      CODE("python", `from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait

# Điều kiện tuỳ biến: chờ số dư đúng bằng giá trị mong đợi
def balance_equals(expected):
    def _cond(driver):
        el = driver.find_element(By.CSS_SELECTOR, ".balance")
        return el if el.text.strip() == expected else False
    return _cond

# Fluent wait: bỏ qua Stale trong lúc bảng render lại
wait = WebDriverWait(driver, 20, poll_frequency=0.5,
                     ignored_exceptions=[StaleElementReferenceException])
wait.until(balance_equals("1,250,000 đ"))`),
      CODE("java", `// Java FluentWait tương đương
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(20))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(StaleElementReferenceException.class);

WebElement balance = wait.until(d -> {
    WebElement el = d.findElement(By.cssSelector(".balance"));
    return el.getText().trim().equals("1,250,000 đ") ? el : null;
});`),
    ],
  },
  {
    heading: { vi: "5. Stale element: nguyên nhân và cách chữa", en: "5. Stale element: cause and cure", ja: "5. ステール要素: 原因と対処" },
    blocks: [
      P(
        "StaleElementReferenceException là một trong những lỗi gây hoang mang nhất. Nó xảy ra khi bạn giữ một tham chiếu tới một phần tử DOM, rồi trang render lại phần đó (điều rất thường xuyên với React, Vue, Angular), khiến node cũ bị thay bằng node mới. Tham chiếu bạn cầm giờ trỏ vào một node không còn trong cây, nên mọi thao tác ném stale. Cách chữa gốc rễ là không cache tham chiếu quá lâu: tìm lại phần tử ngay trước khi thao tác. Với danh sách động, thay vì lặp qua các phần tử đã lấy sẵn, hãy lấy lại danh sách hoặc thao tác theo chỉ số. Selenium cũng có ExpectedConditions.refreshed để bọc một điều kiện và tự tìm lại phần tử khi gặp stale.",
        "StaleElementReferenceException is one of the most confusing errors. It happens when you hold a reference to a DOM element, then the page re-renders that part (very common with React, Vue, Angular), replacing the old node with a new one. Your held reference now points to a node no longer in the tree, so any action throws stale. The root cure is not caching references too long: re-find the element right before acting. For dynamic lists, instead of iterating pre-fetched elements, re-fetch the list or act by index. Selenium also has ExpectedConditions.refreshed to wrap a condition and re-locate the element on stale.",
        "StaleElementReferenceException は最も紛らわしいエラーの一つです。DOM 要素への参照を保持したまま、ページがその部分を再描画し（React、Vue、Angular で非常に多い）、古いノードが新しいノードに置き換わると発生します。保持中の参照はツリーに無いノードを指すため、あらゆる操作でステールが投げられます。根本的な対処は参照を長く保持しないことで、操作の直前に要素を再取得します。動的リストでは、取得済み要素を反復する代わりに、リストを再取得するかインデックスで操作します。Selenium には条件をラップしてステール時に要素を再特定する ExpectedConditions.refreshed もあります。"
      ),
      IMG(SVG_RACE, "Race condition dẫn tới stale element và cách chữa", "Race condition leading to stale element and its cure", "ステール要素を招くレースコンディションとその対処"),
      CODE("python", `from selenium.common.exceptions import StaleElementReferenceException

# SAI: cache ref rồi trang render lại → stale
rows = driver.find_elements(By.CSS_SELECTOR, "tbody tr")
for r in rows:
    r.click()   # có thể ném StaleElementReferenceException

# ĐÚNG: thao tác theo chỉ số, tìm lại mỗi vòng
count = len(driver.find_elements(By.CSS_SELECTOR, "tbody tr"))
for i in range(count):
    row = driver.find_elements(By.CSS_SELECTOR, "tbody tr")[i]  # tìm LẠI
    row.click()`),
    ],
  },
  {
    heading: { vi: "6. Race condition trong ứng dụng SPA", en: "6. Race conditions in SPA applications", ja: "6. SPA アプリのレースコンディション" },
    blocks: [
      P(
        "Ứng dụng một trang (SPA) làm race condition trở nên tinh vi hơn. Nút Thanh toán có thể hiển thị ngay lập tức nhưng bị disable cho tới khi một lời gọi API xác thực trở về; nếu test click đúng khe thời gian đó, click bị nuốt mà không báo lỗi, và assertion sau đó thất bại một cách khó hiểu. Một biểu hiện khác là spinner loading che phủ nút: click trúng lớp overlay chứ không phải nút thật. Cách xử lý đúng là chờ đúng trạng thái tương tác được, không chỉ chờ hiển thị. Với spinner, hãy chờ nó biến mất bằng invisibility_of_element_located trước khi thao tác. Nguyên tắc vàng: luôn đồng bộ theo trạng thái ứng dụng thật, không theo thời gian đồng hồ.",
        "Single-page apps make race conditions subtler. A Pay button may appear immediately but stay disabled until a validation API returns; if the test clicks in that window, the click is swallowed with no error, and the later assertion fails inexplicably. Another form is a loading spinner overlaying the button: the click lands on the overlay, not the real button. The right handling is to wait for the actual interactable state, not just visibility. For spinners, wait for them to disappear via invisibility_of_element_located before acting. The golden rule: always synchronize on real application state, never on wall-clock time.",
        "シングルページアプリはレースコンディションをより微妙にします。支払いボタンは即座に表示されても、検証 API が返るまで無効のままかもしれません。テストがその隙にクリックすると、クリックはエラーなく飲み込まれ、後のアサーションが不可解に失敗します。別の形はローディングスピナーがボタンを覆う場合で、クリックは実ボタンではなくオーバーレイに当たります。正しい対処は、単なる可視性ではなく実際に操作可能な状態を待つことです。スピナーには invisibility_of_element_located で消失を待ってから操作します。黄金律は、常に実際のアプリ状態で同期し、時計時間では同期しないことです。"
      ),
      CODE("python", `# Chờ spinner biến mất TRƯỚC khi tương tác
wait.until(EC.invisibility_of_element_located((By.CSS_SELECTOR, ".loading-spinner")))
# Rồi mới chờ nút thật sự clickable (đã enable sau khi API validate xong)
wait.until(EC.element_to_be_clickable((By.ID, "pay"))).click()
# Chờ điều hướng SPA hoàn tất bằng dấu hiệu trang mới
wait.until(EC.url_contains("/receipt"))`),
      NOTE(
        "Trong SPA, URL đổi không đồng nghĩa nội dung đã render. Hãy chờ một phần tử đặc trưng của trang đích thay vì chỉ chờ url_contains.",
        "In SPAs, a URL change does not mean content has rendered. Wait for a distinctive element of the target page rather than only url_contains.",
        "SPA では URL の変化はコンテンツの描画完了を意味しません。url_contains だけでなく、遷移先ページ特有の要素を待ちましょう。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chiến lược retry: cách dùng đúng liều", en: "7. Retry strategy: the right dosage", ja: "7. リトライ戦略: 適切な用量" },
    blocks: [
      P(
        "Retry là con dao hai lưỡi. Dùng đúng, nó cách ly những gián đoạn hạ tầng thật sự ngẫu nhiên như mạng chớp nháng hay một node Grid tạm quá tải. Dùng sai, nó biến thành tấm thảm giấu bug: một test đỏ vì lỗi đồng bộ thật được retry cho tới khi may mắn xanh, và bug lọt lưới. Nguyên tắc là chỉ retry ở mức test hoặc mức thao tác nhỏ, tối đa một tới hai lần, và luôn ghi log lại lần đỏ đầu tiên để đội theo dõi tỉ lệ flaky. Trong TestNG bạn cài IRetryAnalyzer, trong pytest bạn dùng plugin pytest-rerunfailures với cờ --reruns 1. Quan trọng hơn cả: mỗi lần retry cứu được một test phải trở thành một vé điều tra, không phải một cái cớ để quên.",
        "Retry is a double-edged sword. Used right, it isolates genuinely random infrastructure blips like a flickering network or a momentarily overloaded Grid node. Used wrong, it becomes a rug to hide bugs under: a test red from a real synchronization defect is retried until it luckily passes, and the bug slips through. The rule is to retry only at the test or small-operation level, at most one or two times, and always log the first red so the team tracks the flaky rate. In TestNG you implement IRetryAnalyzer; in pytest you use the pytest-rerunfailures plugin with --reruns 1. Above all: every retry that saves a test should become an investigation ticket, not an excuse to forget.",
        "リトライは諸刃の剣です。正しく使えば、明滅するネットワークや一時的に過負荷の Grid ノードといった真にランダムなインフラの不具合を隔離します。誤って使えば、バグを隠す絨毯になります。本物の同期不具合で赤いテストが運良く通るまでリトライされ、バグがすり抜けます。原則はテスト単位か小さな操作単位でのみ、最大 1〜2 回リトライし、最初の赤を必ずログに残してチームがフレーキー率を追えるようにすることです。TestNG では IRetryAnalyzer を実装し、pytest では pytest-rerunfailures プラグインを --reruns 1 で使います。何より、テストを救ったリトライは忘れる口実ではなく調査チケットになるべきです。"
      ),
      CODE("java", `// TestNG IRetryAnalyzer — retry tối đa 1 lần
public class RetryOnce implements IRetryAnalyzer {
  private int count = 0;
  private static final int MAX = 1;
  @Override public boolean retry(ITestResult result) {
    if (count < MAX) { count++;
      System.out.println("RETRY flaky: " + result.getName());  // log để theo dõi
      return true;
    }
    return false;
  }
}
// Gắn: @Test(retryAnalyzer = RetryOnce.class)`),
      CODE("bash", `# pytest: rerun tối đa 1 lần, chỉ để cách ly flaky hạ tầng
pip install pytest-rerunfailures
pytest --reruns 1 --reruns-delay 2 -v
# Xuất báo cáo để soi test nào phải rerun -> mở vé điều tra`),
    ],
  },
  {
    heading: { vi: "8. Kịch bản thực chiến: giao dịch ngân hàng", en: "8. Real scenario: a banking transaction", ja: "8. 実戦シナリオ: 銀行取引" },
    blocks: [
      SCEN(
        "Chuyển khoản và đối soát số dư",
        "Fund transfer and balance reconciliation",
        "Test chuyển 500.000đ từ tài khoản A sang B rồi kiểm số dư mới. Trên staging ngân hàng, bước xác nhận gọi một API chống gian lận mất 1–3 giây tuỳ tải; số dư chỉ cập nhật sau khi webhook đối soát về. Bản đầu tiên dùng sleep(2) nên đỏ ngẫu nhiên khi API chậm. Đội thay bằng chuỗi wait: chờ nút xác nhận clickable, chờ toast thành công, rồi dùng điều kiện tuỳ biến chờ số dư đúng bằng giá trị mong đợi với FluentWait bỏ qua stale. Sau đó test xanh ổn định bất kể tải.",
        "Transfer 500,000 VND from account A to B and check the new balance. On the bank's staging, the confirm step calls an anti-fraud API taking 1–3 seconds under load; the balance only updates after a reconciliation webhook returns. The first version used sleep(2) so it went red randomly when the API was slow. The team replaced it with a wait chain: wait for the confirm button clickable, wait for the success toast, then a custom condition awaiting the balance to equal the expected value with a FluentWait ignoring stale. The test then stayed stably green regardless of load.",
        "口座 A から B へ 50 万ドンを送金し、新しい残高を確認します。",
        "口座 A から B へ 50 万ドンを送金し新残高を確認します。銀行のステージングでは、確認ステップが負荷により 1〜3 秒かかる不正防止 API を呼び、残高は照合 Webhook が返った後にのみ更新されます。最初の版は sleep(2) を使ったため、API が遅いとランダムに赤くなりました。チームは待機チェーンに置換しました。確認ボタンのクリック可能を待ち、成功トーストを待ち、次に FluentWait でステールを無視しながら残高が期待値に等しくなるカスタム条件を待ちます。その後テストは負荷に関わらず安定して緑を保ちました。"
      ),
      CODE("python", `def test_chuyen_khoan(driver, wait):
    tx = TransferPage(driver)
    tx.open()
    tx.fill(to_account="B-002", amount="500000")
    wait.until(EC.element_to_be_clickable((By.ID, "confirm"))).click()
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".toast-success")))
    # Chờ số dư đối soát về đúng giá trị — điều kiện tuỳ biến + fluent ignore stale
    wait.until(balance_equals("2,500,000 đ"))
    assert tx.last_status() == "Hoàn tất"`),
    ],
  },
  {
    heading: { vi: "9. Đo lường và quản trị flaky", en: "9. Measuring and governing flakiness", ja: "9. フレーキーの測定と統制" },
    blocks: [
      P(
        "Bạn không thể cải thiện thứ không đo. Một đội trưởng thành theo dõi flaky rate như một chỉ số chất lượng ngang với độ phủ. Cách làm: gắn nhãn mỗi lần một test phải retry mới xanh, tổng hợp theo tuần, và xếp hạng những test đỏ ngẫu nhiên nhiều nhất để ưu tiên chữa. Những test flaky dai dẳng nên bị đưa vào khu cách ly (quarantine): vẫn chạy nhưng không chặn merge, đồng thời gắn vé bắt buộc điều tra trong hạn định. Điều tối kỵ là để một test flaky vô thời hạn trong bộ chặn merge, vì nó dạy cả đội thói quen bấm chạy lại và bỏ qua tín hiệu đỏ, làm hỏng toàn bộ giá trị của kiểm thử tự động.",
        "You cannot improve what you do not measure. A mature team tracks the flaky rate as a quality metric on par with coverage. How: tag each time a test needs a retry to pass, aggregate weekly, and rank the most randomly-red tests to prioritize fixes. Persistently flaky tests should go into quarantine: still run but not blocking merges, with a mandatory investigation ticket on a deadline. The cardinal sin is leaving a flaky test indefinitely in the merge-blocking set, because it trains the whole team to re-run and ignore red signals, destroying the entire value of automated testing.",
        "測定しないものは改善できません。成熟したチームはフレーキー率をカバレッジと同等の品質指標として追跡します。方法は、テストが通るのにリトライを要したたびにタグ付けし、週次で集計し、最もランダムに赤くなるテストをランク付けして修正を優先します。慢性的にフレーキーなテストは隔離（quarantine）に入れ、実行はするがマージをブロックせず、期限付きの必須調査チケットを付けます。最大の禁忌は、フレーキーなテストをマージブロック集合に無期限で残すことです。チーム全体に再実行して赤信号を無視する習慣を教え、自動テストの価値全体を壊すからです。"
      ),
      UL(
        ["Ghi log mỗi lần retry cứu được test", "Tổng hợp flaky rate theo tuần, xếp hạng ưu tiên", "Cách ly (quarantine) test flaky dai dẳng khỏi cổng merge", "Mỗi test cách ly kèm vé điều tra có hạn"],
        ["Log every retry that saves a test", "Aggregate flaky rate weekly, rank by priority", "Quarantine persistently flaky tests out of the merge gate", "Each quarantined test carries a deadlined investigation ticket"],
        ["テストを救ったリトライを毎回ログに残します", "フレーキー率を週次集計し優先度でランク付けします", "慢性的にフレーキーなテストをマージゲートから隔離します", "隔離した各テストに期限付き調査チケットを付けます"]
      ),
    ],
  },
  {
    heading: { vi: "10. So sánh cách tiếp cận đồng bộ hoá", en: "10. Comparing synchronization approaches", ja: "10. 同期化アプローチの比較" },
    blocks: [
      P(
        "Selenium yêu cầu bạn tự đồng bộ hoá bằng explicit wait, đó là điểm khác biệt lớn so với Playwright và Cypress vốn có auto-wait tích hợp cho hầu hết hành động. Với Playwright, click sẽ tự chờ phần tử hiển thị, ổn định và bật trước khi thao tác, giảm mạnh nhu cầu wait thủ công. Ưu điểm của cách Selenium là bạn kiểm soát tường minh và có thể diễn tả những điều kiện nghiệp vụ rất riêng; nhược điểm là dễ quên wait và gây flaky nếu thiếu kỷ luật. Không có cách nào tuyệt đối tốt hơn: đội Selenium bù lại bằng cách chuẩn hoá wait trong Page Object, để mỗi hành động của page tự chờ trạng thái sẵn sàng, tái tạo hiệu ứng auto-wait một cách nhất quán.",
        "Selenium requires you to synchronize explicitly with waits, a big difference from Playwright and Cypress which have built-in auto-wait for most actions. In Playwright a click auto-waits for the element to be visible, stable and enabled before acting, sharply reducing manual waits. Selenium's approach lets you control explicitly and express very specific business conditions; the downside is it is easy to forget a wait and cause flakiness without discipline. Neither is absolutely better: Selenium teams compensate by standardizing waits inside Page Objects, so each page action self-waits for readiness, reproducing the auto-wait effect consistently.",
        "Selenium は明示的待機で自ら同期化する必要があり、これはほとんどの操作に自動待機を内蔵する Playwright や Cypress との大きな違いです。Playwright ではクリックが操作前に要素の可視・安定・有効を自動で待ち、手動待機の必要を大幅に減らします。Selenium の方式は明示的に制御でき、非常に固有の業務条件を表現できる利点があり、欠点は規律が無いと待機を忘れてフレーキーを招きやすいことです。どちらが絶対的に優れるということはなく、Selenium チームは Page Object 内で待機を標準化し、各 page 操作が準備完了を自ら待つことで、自動待機の効果を一貫して再現して補います。"
      ),
      QA(
        "Nếu Selenium dễ flaky hơn vì phải wait thủ công, sao vẫn dùng?",
        "If Selenium is more prone to flakiness due to manual waits, why still use it?",
        "Vì kỷ luật wait có thể chuẩn hoá được trong Page Object và fixture, đưa flaky về gần như bằng công cụ auto-wait. Đổi lại, Selenium cho độ phủ trình duyệt và đa ngôn ngữ rộng nhất, chuẩn W3C, và Grid mạnh cho quy mô doanh nghiệp. Với đội đã đầu tư và tuân thủ kỷ luật đồng bộ, Selenium hoàn toàn ổn định.",
        "Because wait discipline can be standardized in Page Objects and fixtures, bringing flakiness near auto-wait tools. In return, Selenium gives the widest browser and language coverage, the W3C standard, and strong Grid for enterprise scale. For a team that has invested and follows synchronization discipline, Selenium is perfectly stable.",
        "待機の規律は Page Object やフィクスチャで標準化でき、フレーキーを自動待機ツール並みに下げられるからです。見返りに Selenium は最も広いブラウザと言語の網羅、W3C 標準、企業規模向けの強力な Grid を提供します。投資済みで同期化の規律を守るチームにとって、Selenium は十分に安定します。",
        ""
      ),
    ],
  },
  {
    heading: { vi: "11. Câu hỏi phỏng vấn về đồng bộ hoá", en: "11. Interview questions on synchronization", ja: "11. 同期化に関する面接質問" },
    blocks: [
      QA(
        "Phân biệt presence_of_element_located và visibility_of_element_located.",
        "Distinguish presence_of_element_located from visibility_of_element_located.",
        "presence chỉ chờ phần tử có mặt trong cây DOM, kể cả khi nó đang bị ẩn bằng display none hay opacity 0. visibility chờ phần tử vừa có trong DOM vừa thực sự hiển thị với kích thước lớn hơn không. Khi bạn cần đọc text hay click, hãy dùng visibility hoặc clickable, đừng chỉ dùng presence.",
        "presence only waits for the element to exist in the DOM tree, even if hidden via display none or opacity 0. visibility waits for it to be both in the DOM and actually displayed with a nonzero size. When you need to read text or click, use visibility or clickable, not mere presence.",
        "presence は要素が DOM ツリーに存在することだけを待ち、display none や opacity 0 で隠れていても構いません。visibility は DOM 内にあり、かつサイズが 0 でなく実際に表示されるのを待ちます。テキスト読み取りやクリックが必要なら、単なる presence ではなく visibility か clickable を使います。",
        ""
      ),
      QA(
        "Bạn xử lý StaleElementReferenceException thế nào trong danh sách động?",
        "How do you handle StaleElementReferenceException in a dynamic list?",
        "Tôi không cache tham chiếu qua các lần render. Với danh sách, tôi lấy số lượng rồi truy cập lại phần tử theo chỉ số ở mỗi vòng lặp, hoặc bọc thao tác trong FluentWait có ignoring StaleElementReferenceException, hoặc dùng ExpectedConditions.refreshed để tự tìm lại. Cốt lõi là tìm lại element ngay trước khi thao tác.",
        "I never cache references across renders. For lists I get the count then re-access elements by index each loop, or wrap the action in a FluentWait ignoring StaleElementReferenceException, or use ExpectedConditions.refreshed to re-locate. The core is re-finding the element right before acting.",
        "描画をまたいで参照をキャッシュしません。リストでは件数を取得し、各ループでインデックスにより要素を再取得するか、StaleElementReferenceException を無視する FluentWait で操作を包むか、ExpectedConditions.refreshed で再特定します。核心は操作直前に要素を再取得することです。",
        ""
      ),
      QA(
        "Khi nào retry là hợp lý và khi nào nó có hại?",
        "When is retry reasonable and when is it harmful?",
        "Retry hợp lý khi gián đoạn thật sự ngẫu nhiên từ hạ tầng như mạng hay node Grid quá tải. Nó có hại khi che giấu bug đồng bộ hoá hay lỗi nghiệp vụ thật, vì test được cứu tới khi may mắn xanh và bug lọt lưới. Nguyên tắc: retry tối đa một hai lần, luôn log và mở vé điều tra cho mỗi lần cứu.",
        "Retry is reasonable for genuinely random infrastructure blips like network or an overloaded Grid node. It is harmful when it masks a synchronization defect or a real business bug, since the test is saved until it luckily passes and the bug escapes. Rule: retry at most once or twice, always log and open an investigation ticket per save.",
        "リトライはネットワークや過負荷の Grid ノードのような真にランダムなインフラ障害には妥当です。同期不具合や本物の業務バグを隠すときは有害で、運良く通るまでテストが救われバグがすり抜けます。原則は最大 1〜2 回、必ずログして救済ごとに調査チケットを開くことです。",
        ""
      ),
    ],
  },
  {
    heading: { vi: "12. Tổng kết và checklist chống flaky", en: "12. Summary and anti-flaky checklist", ja: "12. まとめとフレーキー対策チェックリスト" },
    blocks: [
      P(
        "Đồng bộ hoá đúng là ranh giới giữa một bộ test đáng tin và một bộ test bị bỏ hoang. Bốn nguyên tắc cốt lõi cần khắc sâu: một, không bao giờ dùng sleep cứng, luôn chờ theo trạng thái ứng dụng bằng explicit hoặc fluent wait. Hai, chọn đúng ExpectedConditions cho đúng ý định, đặc biệt clickable khi định click. Ba, không cache tham chiếu để tránh stale, tìm lại element ngay trước khi thao tác. Bốn, dùng retry như thuốc kháng sinh, đúng liều và có giám sát, kèm đo lường flaky rate. Nắm vững bốn điều này, bạn biến Selenium từ công cụ hay đỏ thành một lá chắn ổn định cho những hệ thống nhạy cảm nhất.",
        "Correct synchronization is the line between a trustworthy suite and an abandoned one. Four core principles to internalize: one, never use hard sleep, always wait on application state via explicit or fluent wait. Two, pick the right ExpectedConditions for the intent, especially clickable when you plan to click. Three, do not cache references to avoid stale — re-find the element right before acting. Four, use retry like antibiotics: right dose, monitored, with flaky-rate measurement. Master these four and you turn Selenium from a flaky tool into a stable shield for the most sensitive systems.",
        "正しい同期化は、信頼できるスイートと放棄されるスイートの境界線です。刻み込むべき 4 つの核心原則。第一に硬い sleep は決して使わず、常に明示的または fluent 待機でアプリ状態を待ちます。第二に意図に合う ExpectedConditions を選び、クリックするなら特に clickable を使います。第三にステール回避のため参照をキャッシュせず、操作直前に要素を再取得します。第四にリトライは抗生物質のように、適量で監視付き、フレーキー率測定を伴って使います。この 4 つを習得すれば、Selenium をフレーキーなツールから、最も敏感なシステムの安定した盾へ変えられます。"
      ),
      UL(
        ["Không sleep cứng — explicit/fluent wait theo trạng thái", "ExpectedConditions đúng ý định (clickable để click)", "Không cache ref — tìm lại element trước thao tác", "Retry có liều lượng + đo flaky rate + quarantine"],
        ["No hard sleep — explicit/fluent wait on state", "ExpectedConditions matching intent (clickable to click)", "Do not cache refs — re-find before acting", "Dosed retry + flaky-rate measurement + quarantine"],
        ["硬い sleep 禁止 — 状態に基づく明示的/fluent 待機", "意図に合う ExpectedConditions（クリックには clickable）", "参照をキャッシュせず操作前に要素を再取得", "用量を守るリトライ + フレーキー率測定 + 隔離"]
      ),
      TIP(
        "Chuẩn hoá wait ngay trong Page Object: mỗi phương thức tự chờ trạng thái sẵn sàng của nó. Đó là cách một đội Selenium tái tạo hiệu ứng auto-wait một cách nhất quán và bền vững.",
        "Standardize waits inside the Page Object: each method self-waits for its own readiness. That is how a Selenium team reproduces the auto-wait effect consistently and durably.",
        "待機を Page Object 内で標準化しましょう。各メソッドが自身の準備完了を自ら待ちます。それが Selenium チームが自動待機の効果を一貫して持続的に再現する方法です。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE 3 — Selenium Grid 4 & Parallel / CI
// ===========================================================================
const pages3 = [
  {
    heading: { vi: "1. Vì sao cần chạy song song và Grid", en: "1. Why parallel execution and Grid are needed", ja: "1. なぜ並列実行と Grid が必要か" },
    blocks: [
      P(
        "Một bộ test end-to-end đầy đủ cho sàn thương mại điện tử có thể lên tới hàng trăm kịch bản: đăng nhập, tìm kiếm, giỏ hàng, thanh toán, khuyến mãi, hoàn tiền, trên nhiều trình duyệt. Chạy tuần tự trên một máy có thể mất bốn mươi phút tới cả tiếng, quá lâu để gắn vào mỗi pull request. Chạy song song và phân tán qua Selenium Grid giải quyết đúng bài toán này: nhiều test chạy đồng thời trên nhiều node, mỗi node có thể là một trình duyệt khác nhau, giúp cắt thời gian tổng xuống còn vài phút. Bài này đi sâu vào kiến trúc Grid 4, cách dựng bằng Docker, cách viết test song song với TestNG và pytest-xdist, và cách tích hợp toàn bộ vào CI.",
        "A full end-to-end suite for an e-commerce marketplace can reach hundreds of scenarios: login, search, cart, checkout, promotions, refunds, across multiple browsers. Running them sequentially on one machine can take forty minutes to an hour — far too long to gate every pull request. Parallel, distributed execution via Selenium Grid solves exactly this: many tests run concurrently across nodes, each node possibly a different browser, cutting total time to a few minutes. This article dives into Grid 4 architecture, standing it up with Docker, writing parallel tests with TestNG and pytest-xdist, and integrating the whole thing into CI.",
        "EC マーケットプレイスの完全な E2E スイートは、ログイン・検索・カート・購入・プロモーション・返金を複数ブラウザで、と数百のシナリオに達し得ます。1 台のマシンで逐次実行すると 40 分から 1 時間かかり、全プルリクエストのゲートには長すぎます。Selenium Grid による並列分散実行はまさにこれを解決します。多数のテストが複数ノードで同時に走り、各ノードは別ブラウザになり得て、合計時間を数分に短縮します。本記事では Grid 4 のアーキテクチャ、Docker での構築、TestNG と pytest-xdist による並列テストの書き方、そして全体の CI 統合を深掘りします。"
      ),
      UL(
        ["Cắt thời gian bộ test từ hàng chục phút xuống vài phút", "Cross-browser thật: Chrome, Firefox, Edge cùng lúc", "Tách máy chạy test khỏi máy CI để mở rộng độc lập", "Nền tảng để scale kiểm thử theo quy mô doanh nghiệp"],
        ["Cut suite time from tens of minutes to a few", "True cross-browser: Chrome, Firefox, Edge at once", "Separate test-runner machines from CI to scale independently", "Foundation to scale testing at enterprise size"],
        ["スイート時間を数十分から数分へ短縮します", "真のクロスブラウザ: Chrome・Firefox・Edge を同時に", "テスト実行機を CI から分離し独立してスケールします", "企業規模でテストをスケールする基盤になります"]
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc Selenium Grid 4", en: "2. Selenium Grid 4 architecture", ja: "2. Selenium Grid 4 のアーキテクチャ" },
    blocks: [
      P(
        "Grid 4 được viết lại hoàn toàn so với Grid 3. Ở chế độ phân tán đầy đủ, nó gồm nhiều thành phần tách rời: Router nhận mọi request từ ngoài và định tuyến; Distributor chịu trách nhiệm chọn node phù hợp và tạo phiên; Session Queue giữ hàng đợi các yêu cầu phiên chưa được xử lý; Session Map ghi nhớ phiên nào đang chạy trên node nào; và Event Bus để các thành phần giao tiếp bất đồng bộ. Ở quy mô nhỏ bạn không cần tách rời, mà chạy chế độ standalone gộp tất cả vào một tiến trình, hoặc chế độ hub-and-node cổ điển với một hub trung tâm và nhiều node đăng ký lên. Node là nơi thật sự chạy trình duyệt; mỗi node khai báo các slot ứng với capabilities như trình duyệt và số phiên tối đa.",
        "Grid 4 was fully rewritten versus Grid 3. In fully distributed mode it comprises decoupled components: the Router receives all external requests and routes them; the Distributor picks a suitable node and creates sessions; the Session Queue holds pending session requests; the Session Map remembers which session runs on which node; and the Event Bus lets components communicate asynchronously. At small scale you do not need the split — run standalone mode bundling everything into one process, or the classic hub-and-node mode with a central hub and multiple nodes registering to it. Nodes are where browsers actually run; each node declares slots for capabilities like browser and max sessions.",
        "Grid 4 は Grid 3 から全面的に書き直されました。完全分散モードでは疎結合のコンポーネントで構成されます。Router は外部からの全リクエストを受けてルーティングし、Distributor は適切なノードを選んでセッションを作成し、Session Queue は未処理のセッション要求を保持し、Session Map はどのセッションがどのノードで動くかを記憶し、Event Bus はコンポーネント間の非同期通信を担います。小規模では分割は不要で、すべてを 1 プロセスにまとめる standalone モードか、中央ハブと複数ノードが登録する古典的な hub-and-node モードを使います。ノードは実際にブラウザが動く場所で、各ノードはブラウザや最大セッション数などの capabilities に対応するスロットを宣言します。"
      ),
      IMG(SVG_GRID, "Grid 4: Hub/Router phân phối phiên tới các Node", "Grid 4: Hub/Router distributing sessions to Nodes", "Grid 4: Hub/Router がセッションをノードへ分配"),
      NOTE(
        "Test không đổi khi chuyển sang Grid: bạn chỉ thay ChromeDriver cục bộ bằng RemoteWebDriver trỏ tới URL của hub. Toàn bộ locator, wait, POM giữ nguyên.",
        "Tests do not change when moving to Grid: you just swap local ChromeDriver for a RemoteWebDriver pointing at the hub URL. All locators, waits and POM stay the same.",
        "Grid へ移行してもテストは変わりません。ローカルの ChromeDriver をハブ URL を指す RemoteWebDriver に差し替えるだけです。ロケーター・待機・POM はすべてそのままです。"
      ),
    ],
  },
  {
    heading: { vi: "3. Dựng Grid bằng Docker Compose", en: "3. Standing up Grid with Docker Compose", ja: "3. Docker Compose で Grid を構築する" },
    blocks: [
      P(
        "Cách nhanh và sạch nhất để dựng Grid là dùng bộ ảnh docker-selenium chính thức. Bạn chạy một service hub và vài service node cho từng trình duyệt, mỗi node tự đăng ký lên hub qua Event Bus. Docker cô lập môi trường nên kết quả nhất quán giữa máy local và CI, đồng thời dễ mở rộng bằng cách tăng số bản sao node. Biến SE_NODE_MAX_SESSIONS kiểm soát số phiên chạy song song trên mỗi node; đặt nó cân bằng với số CPU và RAM để tránh trình duyệt bị đói tài nguyên gây flaky. Cổng 4444 là nơi hub lắng nghe, và bạn có thể mở giao diện Grid tại /ui để xem các node và phiên đang chạy theo thời gian thực.",
        "The fastest, cleanest way to stand up Grid is the official docker-selenium images. You run one hub service and several node services per browser, each node self-registering to the hub via the Event Bus. Docker isolates the environment so results are consistent between local and CI, and it scales easily by increasing node replicas. The SE_NODE_MAX_SESSIONS variable controls parallel sessions per node; balance it with CPU and RAM to avoid resource-starved browsers causing flakiness. Port 4444 is where the hub listens, and you can open the Grid UI at /ui to watch nodes and sessions live.",
        "Grid を構築する最速で最もクリーンな方法は、公式の docker-selenium イメージです。ハブサービス 1 つとブラウザごとのノードサービスを複数実行し、各ノードは Event Bus 経由でハブへ自己登録します。Docker は環境を分離するためローカルと CI で結果が一致し、ノードのレプリカを増やすだけで容易にスケールします。SE_NODE_MAX_SESSIONS 変数は各ノードの並列セッション数を制御します。リソース不足のブラウザがフレーキーを招かないよう、CPU と RAM に合わせて調整します。ポート 4444 でハブが待ち受け、/ui で Grid UI を開くとノードとセッションをリアルタイムに確認できます。"
      ),
      CODE("yaml", `# docker-compose.yml — Grid 4 hub + node Chrome/Firefox
services:
  selenium-hub:
    image: selenium/hub:4.25
    ports: ["4442:4442", "4443:4443", "4444:4444"]

  chrome:
    image: selenium/node-chrome:4.25
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4
    shm_size: 2g          # tránh Chrome crash vì thiếu /dev/shm

  firefox:
    image: selenium/node-firefox:4.25
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=2`),
      CODE("bash", `docker compose up -d --scale chrome=3   # 3 node Chrome chạy song song
# Mở http://localhost:4444/ui để xem trạng thái Grid
docker compose logs -f selenium-hub`),
      WARN(
        "Chrome trong Docker hay crash nếu /dev/shm quá nhỏ. Luôn đặt shm_size ít nhất 2g cho node Chrome, nếu không bạn sẽ gặp lỗi tab crash ngẫu nhiên rất khó truy vết.",
        "Chrome in Docker often crashes if /dev/shm is too small. Always set shm_size to at least 2g for Chrome nodes, otherwise you get random tab-crash errors that are very hard to trace.",
        "Docker 内の Chrome は /dev/shm が小さすぎるとよくクラッシュします。Chrome ノードには必ず shm_size を最低 2g に設定してください。さもないと追跡困難なランダムなタブクラッシュが発生します。"
      ),
    ],
  },
  {
    heading: { vi: "4. Kết nối test tới Grid bằng RemoteWebDriver", en: "4. Connecting tests to Grid via RemoteWebDriver", ja: "4. RemoteWebDriver で Grid へ接続する" },
    blocks: [
      P(
        "Để test chạy trên Grid thay vì máy local, bạn thay driver cục bộ bằng RemoteWebDriver và truyền URL của hub cùng với capabilities mong muốn. Capabilities cho biết bạn cần trình duyệt nào, phiên bản nào, hệ điều hành nào; Distributor sẽ khớp yêu cầu với một node còn slot phù hợp. Đây là chỗ đẹp của kiến trúc: cùng một bộ test, chỉ đổi capabilities là chạy được trên Chrome, Firefox hay Edge mà không sửa logic. Trong thực tế người ta tham số hoá trình duyệt qua biến môi trường hoặc file cấu hình, để một lệnh chạy có thể quét qua ma trận nhiều trình duyệt.",
        "To run tests on Grid instead of the local machine, you swap the local driver for a RemoteWebDriver and pass the hub URL along with desired capabilities. Capabilities state which browser, version and OS you need; the Distributor matches the request to a node with a suitable free slot. This is the beauty of the architecture: the same suite runs on Chrome, Firefox or Edge by changing only capabilities, no logic edits. In practice people parameterize the browser via an environment variable or config file, so one run sweeps a matrix of browsers.",
        "テストをローカルではなく Grid で走らせるには、ローカルドライバを RemoteWebDriver に差し替え、ハブ URL と希望する capabilities を渡します。capabilities はどのブラウザ・バージョン・OS が必要かを示し、Distributor は要求を適切な空きスロットのあるノードに合わせます。これがアーキテクチャの美点で、同じスイートが capabilities を変えるだけで Chrome・Firefox・Edge で動き、ロジックの修正は不要です。実務ではブラウザを環境変数や設定ファイルでパラメータ化し、1 回の実行で複数ブラウザのマトリクスを回します。"
      ),
      CODE("python", `from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

def make_driver():
    opts = Options()
    opts.set_capability("browserName", os.getenv("BROWSER", "chrome"))
    return webdriver.Remote(
        command_executor="http://localhost:4444/wd/hub",   # URL của hub
        options=opts,
    )

# Dùng như driver bình thường — mọi POM/wait giữ nguyên
driver = make_driver()`),
      CODE("java", `// Java: RemoteWebDriver trỏ tới hub
ChromeOptions options = new ChromeOptions();
options.setBrowserVersion("stable");
WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), options);`),
    ],
  },
  {
    heading: { vi: "5. Chạy song song với TestNG", en: "5. Parallel execution with TestNG", ja: "5. TestNG での並列実行" },
    blocks: [
      P(
        "Trong hệ sinh thái Java, TestNG điều phối chạy song song ở mức method, class hoặc test thông qua thuộc tính parallel và thread-count trong file testng.xml. Điểm sống còn khi chạy song song là mỗi thread phải có instance WebDriver riêng của nó; nếu nhiều thread dùng chung một driver, các phiên sẽ giẫm lên nhau và cho kết quả sai loạn. Mẫu chuẩn là dùng ThreadLocal để mỗi thread giữ driver độc lập, khởi tạo trong beforeMethod và đóng trong afterMethod. Bạn cũng dùng DataProvider với parallel true để chạy cùng một test trên nhiều trình duyệt đồng thời, tạo thành ma trận cross-browser thật.",
        "In the Java ecosystem, TestNG orchestrates parallelism at method, class or test level via the parallel and thread-count attributes in testng.xml. The critical point when running in parallel is that each thread must have its own WebDriver instance; if threads share one driver, sessions trample each other and produce chaotic results. The standard pattern uses ThreadLocal so each thread holds an independent driver, created in beforeMethod and closed in afterMethod. You also use a DataProvider with parallel true to run the same test across browsers simultaneously, forming a true cross-browser matrix.",
        "Java エコシステムでは、TestNG が testng.xml の parallel と thread-count 属性を通じてメソッド・クラス・テスト単位の並列化を統制します。並列実行時に決定的に重要なのは、各スレッドが独自の WebDriver インスタンスを持つことです。スレッドが 1 つのドライバを共有すると、セッションが互いを踏みつけ混沌とした結果になります。標準パターンは ThreadLocal を使い、各スレッドが独立したドライバを持ち、beforeMethod で作成し afterMethod で閉じます。また parallel true の DataProvider を使えば、同じテストを複数ブラウザで同時に実行し、真のクロスブラウザマトリクスを作れます。"
      ),
      CODE("java", `// ThreadLocal driver — MỖI thread một phiên riêng
public class BaseTest {
  protected static ThreadLocal<WebDriver> tlDriver = new ThreadLocal<>();

  @BeforeMethod @Parameters("browser")
  public void setUp(@Optional("chrome") String browser) throws Exception {
    MutableCapabilities caps = new MutableCapabilities();
    caps.setCapability("browserName", browser);
    tlDriver.set(new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), caps));
  }
  protected WebDriver driver() { return tlDriver.get(); }

  @AfterMethod(alwaysRun = true)
  public void tearDown() { driver().quit(); tlDriver.remove(); }
}`),
      CODE("xml", `<!-- testng.xml — chạy song song ở mức method, 4 thread -->
<suite name="e2e" parallel="methods" thread-count="4">
  <test name="chrome"><parameter name="browser" value="chrome"/>
    <classes><class name="tests.CheckoutTest"/></classes></test>
  <test name="firefox"><parameter name="browser" value="firefox"/>
    <classes><class name="tests.CheckoutTest"/></classes></test>
</suite>`),
    ],
  },
  {
    heading: { vi: "6. Chạy song song với pytest-xdist", en: "6. Parallel execution with pytest-xdist", ja: "6. pytest-xdist での並列実行" },
    blocks: [
      P(
        "Ở phía Python, pytest-xdist là công cụ chuẩn để chạy song song. Cờ -n auto tạo số worker bằng số CPU, mỗi worker là một tiến trình độc lập chạy một tập con của bộ test. Vì mỗi worker là tiến trình riêng, việc cô lập driver tự nhiên hơn Java: bạn chỉ cần một fixture tạo RemoteWebDriver mới cho mỗi test hoặc mỗi worker. Điều cần cẩn trọng là cô lập dữ liệu: khi nhiều test chạy đồng thời, chúng không được dùng chung tài khoản hay bản ghi, nếu không sẽ đụng độ. Giải pháp là mỗi test tạo dữ liệu riêng qua API seed với định danh duy nhất, ví dụ email kèm timestamp, và dọn sau khi xong.",
        "On the Python side, pytest-xdist is the standard for parallelism. The -n auto flag spawns workers equal to CPU count, each an independent process running a subset of the suite. Because each worker is its own process, driver isolation is more natural than in Java: you just need a fixture creating a fresh RemoteWebDriver per test or per worker. The care point is data isolation: when many tests run at once they must not share accounts or records, or they collide. The solution is each test creating its own data via an API seed with a unique identifier, e.g. an email with a timestamp, and cleaning up afterward.",
        "Python 側では pytest-xdist が並列化の標準です。-n auto フラグは CPU 数と同数のワーカーを起動し、各ワーカーは独立プロセスとしてスイートの部分集合を実行します。各ワーカーが独自プロセスのため、ドライバの分離は Java より自然で、テストまたはワーカーごとに新しい RemoteWebDriver を作るフィクスチャだけで済みます。注意点はデータ分離で、多数のテストが同時に走るときにアカウントやレコードを共有してはならず、さもないと衝突します。解決策は各テストが一意の識別子（例: タイムスタンプ付きメール）で API シードから自分のデータを作り、後で片付けることです。"
      ),
      CODE("python", `# conftest.py — fixture driver độc lập cho mỗi test
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture
def driver():
    opts = Options()
    d = webdriver.Remote("http://localhost:4444/wd/hub", options=opts)
    yield d
    d.quit()   # dọn phiên sau mỗi test — an toàn khi song song`),
      CODE("bash", `# Chạy song song: 1 worker / CPU, cách ly theo tiến trình
pip install pytest-xdist
pytest -n auto --dist loadfile -v
# --dist loadfile giữ các test cùng file trên cùng worker (ổn định hơn)`),
      TIP(
        "Với xdist, hãy sinh dữ liệu test duy nhất theo worker, ví dụ dùng biến môi trường PYTEST_XDIST_WORKER để thêm hậu tố vào email hay mã đơn, tránh hai worker tạo trùng bản ghi.",
        "With xdist, generate unique test data per worker, e.g. use the PYTEST_XDIST_WORKER env var to suffix emails or order codes, avoiding two workers creating duplicate records.",
        "xdist ではワーカーごとに一意のテストデータを生成しましょう。たとえば PYTEST_XDIST_WORKER 環境変数でメールや注文コードに接尾辞を付け、2 つのワーカーが重複レコードを作るのを防ぎます。"
      ),
    ],
  },
  {
    heading: { vi: "7. Tích hợp vào pipeline CI", en: "7. Integrating into the CI pipeline", ja: "7. CI パイプラインへの統合" },
    blocks: [
      P(
        "Bước cuối là gắn tất cả vào CI để chạy tự động mỗi lần đẩy code. Luồng điển hình trên GitHub Actions: checkout code, dựng Grid bằng docker compose up, chờ hub sẵn sàng, chạy bộ test song song, thu thập báo cáo và ảnh chụp màn hình khi lỗi làm artifact, rồi hạ Grid. Điểm quan trọng là chờ hub thật sự sẵn sàng trước khi bắn test, thường bằng cách poll endpoint status của hub cho tới khi ready true, tránh chạy test khi node chưa đăng ký xong. Khi có lỗi, việc tự động đính kèm screenshot và log trình duyệt vào build giúp gỡ lỗi mà không cần dựng lại môi trường. Kết quả: bộ 400 test cross-browser rút từ khoảng bốn mươi phút tuần tự xuống còn tầm tám phút.",
        "The final step is wiring it all into CI to run automatically on every push. A typical GitHub Actions flow: checkout code, stand up Grid with docker compose up, wait for the hub to be ready, run the suite in parallel, collect reports and failure screenshots as artifacts, then tear Grid down. The key is waiting for the hub to be truly ready before firing tests — usually by polling the hub status endpoint until ready is true — to avoid running before nodes finish registering. On failure, automatically attaching screenshots and browser logs to the build enables debugging without rebuilding the environment. The result: a 400-test cross-browser suite drops from about forty minutes sequential to around eight minutes.",
        "最後のステップは、すべてを CI に組み込み、プッシュのたびに自動実行することです。典型的な GitHub Actions のフローは、コードをチェックアウトし、docker compose up で Grid を立ち上げ、ハブの準備完了を待ち、スイートを並列実行し、レポートと失敗時のスクリーンショットをアーティファクトとして収集し、Grid を落とします。要点は、テストを撃つ前にハブが本当に準備完了するのを待つことで、通常はハブの status エンドポイントを ready が true になるまでポーリングし、ノードの登録完了前に実行しないようにします。失敗時にスクリーンショットとブラウザログを自動でビルドに添付すれば、環境を再構築せずにデバッグできます。結果として 400 のクロスブラウザテストが逐次の約 40 分から約 8 分に短縮されます。"
      ),
      IMG(SVG_CI, "Pipeline CI dựng Grid, chạy song song, thu artifact", "CI pipeline stands up Grid, runs parallel, collects artifacts", "CI パイプラインが Grid を構築し並列実行しアーティファクトを収集"),
      CODE("yaml", `# .github/workflows/e2e.yml
name: e2e
on: [push, pull_request]
jobs:
  selenium:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Up Grid
        run: docker compose up -d --scale chrome=3
      - name: Wait hub ready
        run: |
          for i in $(seq 1 30); do
            curl -sf http://localhost:4444/wd/hub/status | grep '"ready": true' && break
            sleep 2
          done
      - name: Run tests in parallel
        run: pytest -n auto --dist loadfile --junitxml=report.xml
      - name: Upload artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with: { name: e2e-report, path: "report.xml\\nscreenshots/" }
      - name: Down Grid
        if: always()
        run: docker compose down`),
    ],
  },
  {
    heading: { vi: "8. Chụp màn hình và log khi lỗi", en: "8. Screenshots and logs on failure", ja: "8. 失敗時のスクリーンショットとログ" },
    blocks: [
      P(
        "Khi một test đỏ trên CI trong lúc chạy song song, bạn không có màn hình để nhìn tận mắt. Vì thế tự động chụp screenshot ngay tại thời điểm thất bại là kỹ thuật gỡ lỗi quan trọng nhất cho môi trường headless phân tán. Trong pytest bạn viết một hook gắn vào phần teardown để, nếu test fail, gọi driver.save_screenshot lưu ảnh kèm tên test và timestamp. Trong TestNG bạn dùng ITestListener bắt sự kiện onTestFailure. Ngoài ảnh, hãy thu thêm log console trình duyệt và log của node để tái dựng bối cảnh. Kết hợp screenshot ảnh, page source HTML tại thời điểm lỗi, và log là bộ ba giúp bạn hiểu vì sao test đỏ mà không cần chạy lại toàn bộ.",
        "When a test goes red on CI during parallel runs, you have no screen to look at live. So automatically capturing a screenshot at the moment of failure is the most important debugging technique for a distributed headless environment. In pytest you write a hook into teardown that, if the test failed, calls driver.save_screenshot to store an image named by test and timestamp. In TestNG you use an ITestListener catching onTestFailure. Beyond images, also collect browser console logs and node logs to reconstruct context. Combining the screenshot, the HTML page source at failure time, and logs is the trio that lets you understand why a test went red without re-running everything.",
        "並列実行中に CI でテストが赤くなると、その場で見る画面がありません。そのため失敗の瞬間に自動でスクリーンショットを撮ることは、分散ヘッドレス環境で最も重要なデバッグ技術です。pytest では teardown にフックを書き、テストが失敗したら driver.save_screenshot を呼んでテスト名とタイムスタンプ付きの画像を保存します。TestNG では onTestFailure を捕捉する ITestListener を使います。画像に加え、ブラウザのコンソールログとノードのログも収集して文脈を再構成します。スクリーンショット、失敗時の HTML ページソース、ログの三点セットが、すべてを再実行せずにテストが赤くなった理由を理解させてくれます。"
      ),
      CODE("python", `# conftest.py — tự chụp màn hình khi test FAIL
import pytest

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    if rep.when == "call" and rep.failed:
        drv = item.funcargs.get("driver")
        if drv:
            drv.save_screenshot(f"screenshots/{item.name}.png")
            # lưu thêm page source để soi DOM lúc lỗi
            open(f"screenshots/{item.name}.html", "w").write(drv.page_source)`),
    ],
  },
  {
    heading: { vi: "9. Kịch bản thực chiến: đêm hội sale TMĐT", en: "9. Real scenario: e-commerce sale-night", ja: "9. 実戦シナリオ: EC のセール前夜" },
    blocks: [
      SCEN(
        "Đảm bảo checkout trước ngày hội sale lớn",
        "Guarding checkout before a mega-sale day",
        "Một sàn TMĐT chuẩn bị cho ngày sale với lưu lượng gấp mười lần. Đội QA có 380 test end-to-end phủ tìm kiếm, giỏ hàng, mã giảm giá và thanh toán trên Chrome, Firefox, Edge. Chạy tuần tự mất bốn mươi hai phút, không kịp cho nhịp release dày trước sale. Họ dựng Grid 4 trên Docker với chín node, chạy song song bằng pytest-xdist -n auto, cô lập dữ liệu qua API seed theo worker. Thời gian tổng rớt xuống tám phút. Mỗi test fail tự chụp màn hình và lưu page source làm artifact, giúp truy vết trong vài phút thay vì dựng lại môi trường. Nhờ đó đội chạy được cả bộ test trên mỗi PR ngay trong tuần cao điểm.",
        "An e-commerce marketplace prepares for a sale day with ten times the traffic. The QA team has 380 end-to-end tests covering search, cart, discount codes and checkout across Chrome, Firefox and Edge. Sequential runs took forty-two minutes, too slow for the dense pre-sale release cadence. They stood up Grid 4 on Docker with nine nodes, ran in parallel with pytest-xdist -n auto, and isolated data via a per-worker API seed. Total time dropped to eight minutes. Every failing test auto-captured a screenshot and page source as artifacts, enabling tracing in minutes instead of rebuilding the environment. As a result the team could run the full suite on every PR right through the peak week.",
        "EC マーケットプレイスがトラフィック 10 倍のセール日に備えます。",
        "EC マーケットプレイスがトラフィック 10 倍のセール日に備えます。QA チームは検索・カート・割引コード・購入を Chrome・Firefox・Edge で網羅する 380 の E2E テストを持ちます。逐次実行は 42 分かかり、セール前の密なリリースペースには遅すぎました。彼らは 9 ノードで Docker 上に Grid 4 を構築し、pytest-xdist -n auto で並列実行し、ワーカーごとの API シードでデータを分離しました。合計時間は 8 分に低下しました。失敗した各テストはスクリーンショットとページソースをアーティファクトとして自動取得し、環境再構築ではなく数分での追跡を可能にしました。その結果、チームはピーク週を通じて全プルリクエストで全スイートを実行できました。"
      ),
      P(
        "Điều rút ra là Grid và song song không chỉ để chạy nhanh, mà để đưa được phản hồi chất lượng vào đúng thời điểm ra quyết định. Một bộ test mất bốn mươi phút thì không ai đợi trên mỗi PR; một bộ tám phút thì gắn được vào mọi thay đổi, biến kiểm thử end-to-end từ nghi thức chạy đêm thành hàng rào chắn thời gian thực. Đầu tư vào hạ tầng Grid trả về bằng chính tốc độ ra quyết định của cả đội phát triển.",
        "The takeaway is that Grid and parallelism are not only about speed but about delivering quality feedback exactly when decisions are made. A forty-minute suite no one waits for on each PR; an eight-minute one attaches to every change, turning end-to-end testing from a nightly ritual into a real-time barrier. Investment in Grid infrastructure pays back in the whole dev team's decision speed.",
        "教訓は、Grid と並列化が速度のためだけでなく、意思決定の瞬間に品質フィードバックを届けるためにあることです。40 分のスイートは各 PR で誰も待ちませんが、8 分なら全変更に付けられ、E2E テストを夜間の儀式からリアルタイムの防壁に変えます。Grid インフラへの投資は、開発チーム全体の意思決定速度として返ってきます。"
      ),
    ],
  },
  {
    heading: { vi: "10. Bẫy thường gặp khi chạy song song", en: "10. Common pitfalls in parallel execution", ja: "10. 並列実行の典型的な落とし穴" },
    blocks: [
      P(
        "Chuyển sang song song bóc trần những giả định ngầm về tính độc lập. Bẫy phổ biến nhất là chia sẻ trạng thái: dùng chung tài khoản đăng nhập, cùng ghi vào một bản ghi, hay phụ thuộc thứ tự chạy. Bẫy thứ hai là đói tài nguyên: đặt số phiên mỗi node quá cao so với CPU và RAM khiến trình duyệt phản hồi chậm và test flaky trở lại. Bẫy thứ ba là driver dùng chung giữa các thread, gây trộn phiên. Bẫy thứ tư là không đặt shm_size cho Chrome trong Docker. Bẫy thứ năm là chạy test trước khi node đăng ký xong lên hub. Nhận diện và phòng năm bẫy này giúp việc song song hoá không đánh đổi độ ổn định lấy tốc độ.",
        "Going parallel exposes hidden assumptions about independence. The most common pitfall is shared state: reusing one login account, writing to the same record, or depending on run order. The second is resource starvation: setting sessions per node too high for CPU and RAM makes browsers slow and tests flaky again. The third is a driver shared across threads, mixing sessions. The fourth is not setting shm_size for Chrome in Docker. The fifth is running tests before nodes finish registering with the hub. Recognizing and preventing these five keeps parallelization from trading stability for speed.",
        "並列化は独立性についての暗黙の前提を露呈させます。最も一般的な落とし穴は状態共有で、1 つのログインアカウントの使い回し、同じレコードへの書き込み、実行順序への依存です。第二はリソース不足で、ノードあたりのセッション数を CPU や RAM に対し高く設定するとブラウザが遅くなり再びテストがフレーキーになります。第三はスレッド間で共有されたドライバによるセッション混在です。第四は Docker 内 Chrome に shm_size を設定しないことです。第五はノードがハブへの登録を終える前にテストを実行することです。この 5 つを認識し防げば、並列化が安定性と速度を引き換えにせずに済みます。"
      ),
      UL(
        ["Mỗi test/thread có driver và dữ liệu riêng, không chia sẻ", "Cân bằng max sessions với CPU/RAM để tránh đói tài nguyên", "Đặt shm_size cho node Chrome trong Docker", "Chờ hub ready trước khi chạy test", "Test độc lập, không phụ thuộc thứ tự"],
        ["Each test/thread has its own driver and data, no sharing", "Balance max sessions with CPU/RAM to avoid starvation", "Set shm_size for Chrome nodes in Docker", "Wait for hub ready before running tests", "Independent tests, no order dependency"],
        ["各テスト/スレッドが独自のドライバとデータを持ち共有しません", "リソース不足を避けるため最大セッションを CPU/RAM と均衡させます", "Docker の Chrome ノードに shm_size を設定します", "テスト実行前にハブの ready を待ちます", "テストは独立させ実行順序に依存させません"]
      ),
    ],
  },
  {
    heading: { vi: "11. Câu hỏi phỏng vấn về Grid và song song", en: "11. Interview questions on Grid and parallelism", ja: "11. Grid と並列化に関する面接質問" },
    blocks: [
      QA(
        "Vai trò của Distributor và Session Queue trong Grid 4 là gì?",
        "What are the roles of the Distributor and Session Queue in Grid 4?",
        "Session Queue giữ các yêu cầu phiên chưa được xử lý, đóng vai hàng đợi khi tất cả node đang bận. Distributor liên tục lấy yêu cầu từ hàng đợi, khớp capabilities với một node còn slot phù hợp, rồi tạo phiên trên node đó và ghi vào Session Map. Nhờ tách rời, Grid 4 xử lý được lưu lượng phiên lớn mà không nghẽn ở một điểm.",
        "The Session Queue holds pending session requests, acting as a buffer when all nodes are busy. The Distributor continuously pulls requests from the queue, matches capabilities to a node with a suitable free slot, then creates the session on that node and records it in the Session Map. Thanks to decoupling, Grid 4 handles high session traffic without a single choke point.",
        "Session Queue は未処理のセッション要求を保持し、全ノードが多忙なときのバッファとして機能します。Distributor はキューから継続的に要求を取り出し、capabilities を適切な空きスロットのあるノードに合わせ、そのノードでセッションを作成して Session Map に記録します。疎結合のおかげで、Grid 4 は単一のボトルネックなしに高いセッション負荷を処理します。",
        ""
      ),
      QA(
        "Vì sao phải dùng ThreadLocal cho WebDriver khi chạy song song trong TestNG?",
        "Why must you use ThreadLocal for WebDriver when running parallel in TestNG?",
        "Vì TestNG chạy nhiều test trên nhiều thread chia sẻ cùng instance của lớp test. Nếu driver là biến thường, các thread sẽ ghi đè lẫn nhau và trộn phiên, cho kết quả sai. ThreadLocal đảm bảo mỗi thread giữ một tham chiếu driver độc lập, nên mỗi test thao tác trên đúng phiên trình duyệt của nó.",
        "Because TestNG runs many tests on many threads sharing the same test class instance. If the driver is an ordinary field, threads overwrite each other and mix sessions, producing wrong results. ThreadLocal ensures each thread holds an independent driver reference, so every test operates on its own browser session.",
        "TestNG は同じテストクラスのインスタンスを共有する複数スレッドで多数のテストを実行するからです。ドライバが通常のフィールドだとスレッドが互いを上書きしセッションを混在させ、誤った結果を生みます。ThreadLocal は各スレッドが独立したドライバ参照を持つことを保証し、各テストが自身のブラウザセッションで動作します。",
        ""
      ),
      QA(
        "Làm sao đảm bảo test không đụng nhau khi chạy song song?",
        "How do you ensure tests do not collide when run in parallel?",
        "Mỗi test phải tự chủ về dữ liệu: tạo tài khoản và bản ghi riêng với định danh duy nhất, ví dụ email kèm timestamp hoặc mã worker, rồi dọn sau khi xong. Không chia sẻ trạng thái toàn cục, không phụ thuộc thứ tự chạy, và cấp cho mỗi thread một driver riêng. Đó là điều kiện tiên quyết để song song hoá an toàn.",
        "Each test must own its data: create its own account and records with a unique identifier, e.g. an email with a timestamp or worker id, then clean up afterward. Do not share global state, do not depend on run order, and give each thread its own driver. That is the precondition for safe parallelization.",
        "各テストは自身のデータを所有すべきです。一意の識別子（例: タイムスタンプやワーカー ID 付きのメール）で独自のアカウントとレコードを作り、後で片付けます。グローバル状態を共有せず、実行順序に依存せず、各スレッドに独自のドライバを与えます。それが安全な並列化の前提条件です。",
        ""
      ),
    ],
  },
  {
    heading: { vi: "12. Tổng kết và checklist Grid/CI", en: "12. Summary and Grid/CI checklist", ja: "12. まとめと Grid/CI チェックリスト" },
    blocks: [
      P(
        "Selenium Grid 4 và chạy song song là cách đưa kiểm thử end-to-end lên quy mô doanh nghiệp mà vẫn giữ phản hồi nhanh. Kiến trúc Router, Distributor, Session Queue và Node cho phép phân phối phiên linh hoạt; Docker giúp dựng Grid nhất quán và dễ mở rộng; TestNG với ThreadLocal và pytest-xdist với fixture cô lập cho phép song song an toàn; và tích hợp CI biến tất cả thành một hàng rào tự động sau mỗi lần đẩy code. Chìa khoá thành công không chỉ là hạ tầng mà là kỷ luật độc lập: mỗi test tự chủ dữ liệu, mỗi thread một driver, chờ hạ tầng sẵn sàng, và luôn thu artifact khi lỗi. Ba bài trong loạt này cùng nhau tạo nên nền tảng đầy đủ để xây dựng và vận hành một hệ thống kiểm thử Selenium vững chắc.",
        "Selenium Grid 4 and parallel execution take end-to-end testing to enterprise scale while keeping feedback fast. The Router, Distributor, Session Queue and Node architecture allow flexible session distribution; Docker stands up Grid consistently and scalably; TestNG with ThreadLocal and pytest-xdist with isolated fixtures enable safe parallelism; and CI integration turns it all into an automatic barrier after every push. The key to success is not just infrastructure but the discipline of independence: each test owns its data, each thread its driver, wait for infrastructure readiness, and always collect artifacts on failure. The three articles in this series together form a complete foundation to build and operate a solid Selenium testing system.",
        "Selenium Grid 4 と並列実行は、フィードバックを速く保ちつつ E2E テストを企業規模へ引き上げます。Router・Distributor・Session Queue・Node のアーキテクチャは柔軟なセッション分配を可能にし、Docker は Grid を一貫してスケーラブルに構築し、ThreadLocal を使う TestNG と分離フィクスチャを使う pytest-xdist は安全な並列化を実現し、CI 統合はそれらすべてをプッシュ後の自動防壁に変えます。成功の鍵はインフラだけでなく独立性の規律です。各テストが自身のデータを所有し、各スレッドが自身のドライバを持ち、インフラの準備完了を待ち、失敗時に必ずアーティファクトを収集します。本シリーズの 3 記事は合わせて、堅牢な Selenium テストシステムを構築し運用する完全な基盤を成します。"
      ),
      UL(
        ["Grid 4: Router/Distributor/Queue/Node phân phối phiên", "Docker để dựng Grid nhất quán, shm_size cho Chrome", "TestNG ThreadLocal · pytest-xdist fixture cô lập", "CI: chờ hub ready · thu screenshot/log · gate pass-fail"],
        ["Grid 4: Router/Distributor/Queue/Node distribute sessions", "Docker to stand up Grid consistently, shm_size for Chrome", "TestNG ThreadLocal · pytest-xdist isolated fixtures", "CI: wait hub ready · collect screenshot/log · pass-fail gate"],
        ["Grid 4: Router/Distributor/Queue/Node がセッションを分配", "Docker で Grid を一貫構築、Chrome に shm_size", "TestNG の ThreadLocal・pytest-xdist の分離フィクスチャ", "CI: ハブ ready を待つ・スクショ/ログ収集・合否ゲート"]
      ),
      TIP(
        "Bắt đầu nhỏ với Grid standalone một node để làm quen, rồi mới chuyển sang phân tán nhiều node và tăng song song. Đừng tối ưu hạ tầng trước khi test của bạn thật sự độc lập.",
        "Start small with a standalone single-node Grid to get familiar, then move to distributed multi-node and raise parallelism. Do not optimize infrastructure before your tests are truly independent.",
        "まず standalone の単一ノード Grid で慣れ、それから複数ノードの分散へ移行し並列度を上げましょう。テストが真に独立する前にインフラを最適化してはいけません。"
      ),
    ],
  },
];

// ===========================================================================
export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-selenium-webdriver-architecture",
    cover: cover1,
    tags: tags("congnghe", "selenium", "pom", "foundation"),
    title: {
      vi: "Selenium WebDriver: kiến trúc, locator, wait và Page Object Model",
      en: "Selenium WebDriver: architecture, locators, waits and the Page Object Model",
      ja: "Selenium WebDriver: アーキテクチャ・ロケーター・待機・Page Object Model",
    },
    summary: {
      vi: "Đi sâu kiến trúc W3C ba tầng, cài đặt Python/Java, tám chiến lược By locator, explicit wait và POM để viết test end-to-end ổn định thay vì hay đỏ.",
      en: "A deep dive into the three-tier W3C architecture, Python/Java setup, the eight By locator strategies, explicit waits and POM to write stable end-to-end tests instead of flaky ones.",
      ja: "3 層の W3C アーキテクチャ、Python/Java のセットアップ、8 種類の By ロケーター戦略、明示的待機、POM を深掘りし、フレーキーではなく安定した E2E テストを書きます。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-selenium-waits-synchronization",
    cover: cover2,
    tags: tags("nangcao", "selenium", "advanced"),
    title: {
      vi: "Selenium chống flaky: wait, đồng bộ hoá và chiến lược retry",
      en: "Killing flakiness in Selenium: waits, synchronization and retry strategy",
      ja: "Selenium のフレーキー撲滅: 待機・同期化・リトライ戦略",
    },
    summary: {
      vi: "Đào sâu implicit vs explicit vs fluent wait, ExpectedConditions, điều kiện tuỳ biến, stale element, race condition trong SPA và cách dùng retry đúng liều để đưa tỉ lệ flaky về gần không.",
      en: "A deep dive into implicit vs explicit vs fluent waits, ExpectedConditions, custom conditions, stale elements, SPA race conditions and dosed retry to drive the flaky rate near zero.",
      ja: "暗黙的・明示的・fluent 待機、ExpectedConditions、カスタム条件、ステール要素、SPA のレースコンディション、適量のリトライを深掘りし、フレーキー率をゼロ近くへ下げます。",
    },
    pages: buildDoc(pages2),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-selenium-grid-parallel",
    cover: cover3,
    tags: tags("congnghe", "selenium", "cicd", "realworld"),
    title: {
      vi: "Selenium Grid 4 và chạy song song: Docker, TestNG, pytest-xdist, CI",
      en: "Selenium Grid 4 and parallel execution: Docker, TestNG, pytest-xdist, CI",
      ja: "Selenium Grid 4 と並列実行: Docker・TestNG・pytest-xdist・CI",
    },
    summary: {
      vi: "Kiến trúc Grid 4 hub/node, dựng bằng Docker, chạy cross-browser song song với TestNG ThreadLocal và pytest-xdist, và tích hợp CI để cắt thời gian bộ test từ hàng chục phút xuống vài phút.",
      en: "Grid 4 hub/node architecture, standing it up with Docker, running cross-browser in parallel with TestNG ThreadLocal and pytest-xdist, and CI integration to cut suite time from tens of minutes to a few.",
      ja: "Grid 4 の hub/node アーキテクチャ、Docker での構築、TestNG の ThreadLocal と pytest-xdist によるクロスブラウザ並列実行、そしてスイート時間を数十分から数分へ短縮する CI 統合を扱います。",
    },
    pages: buildDoc(pages3),
  },
];
