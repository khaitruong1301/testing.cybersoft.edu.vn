// ============================================================================
// AT_APPIUM — 2 bài SÂU về Appium (kiểm thử tự động mobile), song ngữ VI/EN/JA.
// 1. at-appium-mobile-foundation (congnghe · telecom) — nền tảng Appium 2.
// 2. at-appium-device-farm-parallel (nangcao · retail) — scale, device farm, CI.
// JA thật (kana/kanji), khác EN. Block types khớp ArticleViewer + verify.mjs.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// SVG helpers (hand-drawn, dark bg #0f172a, viewBox 0 0 720 220)
// ---------------------------------------------------------------------------
const SVG_ARCH = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Kiến trúc Appium — client / server / driver</text>
<rect x="24" y="60" width="150" height="90" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="99" y="92" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Test Client</text>
<text x="99" y="112" text-anchor="middle" font-size="10.5" fill="#7dd3fc">Java · JS · Python</text>
<text x="99" y="128" text-anchor="middle" font-size="10.5" fill="#7dd3fc">WebDriver bindings</text>
<rect x="260" y="60" width="170" height="90" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="345" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">Appium Server 2.x</text>
<text x="345" y="110" text-anchor="middle" font-size="10.5" fill="#5eead4">HTTP · W3C protocol</text>
<text x="345" y="126" text-anchor="middle" font-size="10.5" fill="#5eead4">route /session /element</text>
<rect x="516" y="42" width="180" height="58" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="606" y="66" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">UiAutomator2 driver</text>
<text x="606" y="84" text-anchor="middle" font-size="10" fill="#a5b4fc">Android</text>
<rect x="516" y="112" width="180" height="58" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="606" y="136" text-anchor="middle" font-size="12" font-weight="800" fill="#ffedd5">XCUITest driver</text>
<text x="606" y="154" text-anchor="middle" font-size="10" fill="#fdba74">iOS</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a1)"><path d="M174 105 h84"/><path d="M430 92 h84"/><path d="M430 118 h84"/></g>
<defs><marker id="a1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<text x="216" y="96" text-anchor="middle" font-size="9.5" fill="#cbd5e1">JSON /session</text>
<text x="360" y="196" text-anchor="middle" font-size="11" fill="#64748b">Cùng một test → đổi driver theo nền tảng, không đổi WebDriver protocol.</text>
</svg>`;

const SVG_LOCATORS = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Chiến lược locator theo nền tảng</text>
<rect x="30" y="52" width="300" height="70" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="180" y="78" text-anchor="middle" font-size="13" font-weight="800" fill="#bbf7d0">accessibility id (chung)</text>
<text x="180" y="100" text-anchor="middle" font-size="10.5" fill="#86efac">content-desc (Android) · a11y label (iOS)</text>
<rect x="30" y="134" width="300" height="66" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="180" y="160" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Android: UiSelector</text>
<text x="180" y="180" text-anchor="middle" font-size="10" fill="#7dd3fc">-android uiautomator · resource-id</text>
<rect x="390" y="134" width="300" height="66" rx="9" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="540" y="160" text-anchor="middle" font-size="12" font-weight="800" fill="#ffedd5">iOS: predicate / class chain</text>
<text x="540" y="180" text-anchor="middle" font-size="10" fill="#fdba74">-ios predicate string · -ios class chain</text>
<rect x="390" y="52" width="300" height="70" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="540" y="78" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">Ưu tiên ổn định</text>
<text x="540" y="100" text-anchor="middle" font-size="10.5" fill="#a5b4fc">a11y id &gt; id &gt; XPath (chậm/giòn)</text>
</svg>`;

const SVG_GESTURE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">W3C Actions API — mô hình cử chỉ (gesture)</text>
<rect x="60" y="50" width="220" height="140" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
<circle cx="120" cy="150" r="10" fill="#38bdf8"/>
<circle cx="220" cy="80" r="10" fill="#f87171"/>
<path d="M120 150 L220 80" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#g1)"/>
<defs><marker id="g1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#fbbf24"/></marker></defs>
<text x="170" y="205" text-anchor="middle" font-size="10.5" fill="#94a3b8">pointerDown → pause → pointerMove → pointerUp</text>
<rect x="330" y="60" width="360" height="34" rx="7" fill="#052e16" stroke="#34d399"/>
<text x="510" y="82" text-anchor="middle" font-size="11.5" fill="#bbf7d0">tap · longPress: một pointer, tọa độ hoặc element</text>
<rect x="330" y="104" width="360" height="34" rx="7" fill="#0c4a6e" stroke="#38bdf8"/>
<text x="510" y="126" text-anchor="middle" font-size="11.5" fill="#bae6fd">swipe / scroll: move giữa 2 tọa độ có pause</text>
<rect x="330" y="148" width="360" height="34" rx="7" fill="#3b0764" stroke="#c084fc"/>
<text x="510" y="170" text-anchor="middle" font-size="11.5" fill="#e9d5ff">pinch/zoom: hai pointer song song</text>
</svg>`;

const SVG_PARALLEL = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Chạy song song — nhiều phiên Appium độc lập</text>
<rect x="40" y="52" width="180" height="60" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="130" y="78" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Runner (shard 1..N)</text>
<text x="130" y="98" text-anchor="middle" font-size="10" fill="#7dd3fc">systemPort / wdaLocalPort riêng</text>
<rect x="500" y="42" width="190" height="40" rx="8" fill="#134e4a" stroke="#2dd4bf"/>
<text x="595" y="67" text-anchor="middle" font-size="11.5" fill="#ccfbf1">Pixel 7 · Android 14</text>
<rect x="500" y="90" width="190" height="40" rx="8" fill="#134e4a" stroke="#2dd4bf"/>
<text x="595" y="115" text-anchor="middle" font-size="11.5" fill="#ccfbf1">iPhone 15 · iOS 17</text>
<rect x="500" y="138" width="190" height="40" rx="8" fill="#134e4a" stroke="#2dd4bf"/>
<text x="595" y="163" text-anchor="middle" font-size="11.5" fill="#ccfbf1">Galaxy S22 · Android 13</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#p1)"><path d="M220 82 h280 v-20"/><path d="M220 88 h280 v22"/><path d="M220 94 h280 v64"/></g>
<defs><marker id="p1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<text x="360" y="200" text-anchor="middle" font-size="11" fill="#64748b">Mỗi phiên = cổng riêng + UDID riêng → không tranh chấp tài nguyên.</text>
</svg>`;

const SVG_FARM = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Local vs Cloud device farm</text>
<rect x="30" y="50" width="300" height="150" rx="10" fill="#111827" stroke="#334155" stroke-width="2"/>
<text x="180" y="76" text-anchor="middle" font-size="13" font-weight="800" fill="#e2e8f0">Local grid</text>
<text x="180" y="102" text-anchor="middle" font-size="10.5" fill="#94a3b8">emulator + máy thật cắm USB</text>
<text x="180" y="124" text-anchor="middle" font-size="10.5" fill="#94a3b8">rẻ · nhanh · phủ thiết bị hẹp</text>
<text x="180" y="146" text-anchor="middle" font-size="10.5" fill="#94a3b8">tự lo quản lý pin/nhiệt/OS</text>
<rect x="390" y="50" width="300" height="150" rx="10" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="540" y="76" text-anchor="middle" font-size="13" font-weight="800" fill="#bbf7d0">Cloud farm</text>
<text x="540" y="102" text-anchor="middle" font-size="10.5" fill="#86efac">BrowserStack · Sauce Labs</text>
<text x="540" y="124" text-anchor="middle" font-size="10.5" fill="#86efac">hàng trăm OS/thiết bị thật</text>
<text x="540" y="146" text-anchor="middle" font-size="10.5" fill="#86efac">video · log · song song lớn</text>
<text x="540" y="168" text-anchor="middle" font-size="10.5" fill="#fca5a5">tốn phí · phụ thuộc mạng</text>
</svg>`;

const SVG_FLAKE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Nguồn flake trên mobile &amp; cách chặn</text>
<rect x="30" y="50" width="200" height="44" rx="8" fill="#1e293b" stroke="#f87171" stroke-width="2"/>
<text x="130" y="78" text-anchor="middle" font-size="11.5" fill="#fecaca">Animation chưa xong</text>
<rect x="30" y="102" width="200" height="44" rx="8" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
<text x="130" y="130" text-anchor="middle" font-size="11.5" fill="#fde68a">Popup quyền/OTA</text>
<rect x="30" y="154" width="200" height="44" rx="8" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
<text x="130" y="182" text-anchor="middle" font-size="11.5" fill="#ddd6fe">Mạng chậm/timeout</text>
<path d="M230 72 L360 118 M230 124 L360 122 M230 176 L360 126" stroke="#64748b" stroke-width="2" fill="none"/>
<rect x="360" y="96" width="180" height="54" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="450" y="118" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Explicit wait</text>
<text x="450" y="138" text-anchor="middle" font-size="10" fill="#7dd3fc">WebDriverWait + điều kiện</text>
<path d="M540 122 h40" stroke="#94a3b8" stroke-width="2.5" marker-end="url(#f1)"/>
<defs><marker id="f1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="586" y="96" width="110" height="54" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="641" y="120" text-anchor="middle" font-size="12" font-weight="800" fill="#bbf7d0">Ổn định</text>
<text x="641" y="138" text-anchor="middle" font-size="9.5" fill="#86efac">+ retry có kiểm soát</text>
</svg>`;

const SVG_CI = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#e2e8f0">Pipeline CI cho kiểm thử mobile</text>
<g font-size="11" font-weight="700">
<rect x="20" y="80" width="120" height="56" rx="9" fill="#0c4a6e" stroke="#38bdf8"/><text x="80" y="105" text-anchor="middle" fill="#e0f2fe">Build APK/IPA</text><text x="80" y="123" text-anchor="middle" font-size="9.5" fill="#7dd3fc" font-weight="400">artifact</text>
<rect x="170" y="80" width="120" height="56" rx="9" fill="#134e4a" stroke="#2dd4bf"/><text x="230" y="105" text-anchor="middle" fill="#ccfbf1">Upload farm</text><text x="230" y="123" text-anchor="middle" font-size="9.5" fill="#5eead4" font-weight="400">app_url</text>
<rect x="320" y="80" width="120" height="56" rx="9" fill="#3730a3" stroke="#818cf8"/><text x="380" y="105" text-anchor="middle" fill="#e0e7ff">Chạy shard</text><text x="380" y="123" text-anchor="middle" font-size="9.5" fill="#a5b4fc" font-weight="400">song song</text>
<rect x="470" y="80" width="120" height="56" rx="9" fill="#7c2d12" stroke="#fb923c"/><text x="530" y="105" text-anchor="middle" fill="#ffedd5">Gộp báo cáo</text><text x="530" y="123" text-anchor="middle" font-size="9.5" fill="#fdba74" font-weight="400">JUnit/Allure</text>
<rect x="620" y="80" width="80" height="56" rx="9" fill="#052e16" stroke="#34d399"/><text x="660" y="112" text-anchor="middle" fill="#bbf7d0">Gate</text>
</g>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#c1)"><path d="M140 108 h30"/><path d="M290 108 h30"/><path d="M440 108 h30"/><path d="M590 108 h30"/></g>
<defs><marker id="c1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<text x="360" y="180" text-anchor="middle" font-size="11" fill="#64748b">Chặn merge nếu smoke suite trên máy thật đỏ.</text>
</svg>`;

// ===========================================================================
// BÀI 1 — Appium foundations
// ===========================================================================
const pages1 = [
  {
    heading: { vi: "1. Vì sao cần kiểm thử tự động mobile", en: "1. Why mobile automation matters", ja: "1. なぜモバイル自動テストが必要か" },
    blocks: [
      P(
        "Một ứng dụng viễn thông chạy trên hàng trăm dòng máy, nhiều phiên bản Android và iOS khác nhau. Kiểm thử tay không thể phủ hết ma trận thiết bị đó trong thời gian hợp lý, nên đội QA cần một công cụ tự động điều khiển ứng dụng thật giống như người dùng chạm, vuốt và gõ. Appium ra đời để giải quyết đúng bài toán này: viết một bộ kịch bản, chạy được trên cả Android lẫn iOS mà không phải viết lại từ đầu cho mỗi nền tảng.",
        "A telecom app runs on hundreds of device models across many Android and iOS versions. Manual testing cannot cover that device matrix in a reasonable time, so the QA team needs a tool that drives the real application the way a user taps, swipes and types. Appium exists to solve exactly this: write one set of scripts and run them on both Android and iOS without rewriting from scratch for each platform.",
        "通信アプリは多数のAndroidおよびiOSバージョンにわたる数百の機種で動作します。手動テストではその端末マトリクスを妥当な時間で網羅できないため、QAチームはユーザーがタップ・スワイプ・入力するのと同じように実アプリを操作するツールを必要とします。Appiumはまさにこの課題を解決するために存在し、一つのスクリプト群を書けばAndroidとiOSの両方で実行でき、プラットフォームごとに書き直す必要がありません。"
      ),
      P(
        "Điểm mấu chốt khiến Appium được ưa chuộng là nó không yêu cầu bạn nhúng thư viện lạ vào ứng dụng hay chỉnh sửa mã nguồn sản phẩm. Appium điều khiển ứng dụng qua các framework tự động hoá do chính nền tảng cung cấp, nên bạn kiểm thử đúng file build mà người dùng sẽ cài. Đây là điều đội QA viễn thông đánh giá cao vì họ thường nhận bản build đóng gói sẵn từ đội phát triển.",
        "The key reason Appium is popular is that it does not require you to embed a foreign library into the app or modify product source code. Appium drives the app through automation frameworks provided by the platform itself, so you test the exact build users will install. Telecom QA teams value this because they usually receive pre-packaged builds from the development team.",
        "Appiumが好まれる決定的な理由は、アプリに外部ライブラリを組み込んだり製品のソースコードを変更したりする必要がない点です。Appiumはプラットフォーム自身が提供する自動化フレームワークを通じてアプリを操作するため、ユーザーが実際にインストールするビルドそのものをテストできます。通信のQAチームは開発チームから完成済みのビルドを受け取ることが多いため、この点を高く評価します。"
      ),
      UL(
        ["Phủ ma trận thiết bị rộng mà không nhân đôi công sức viết kịch bản", "Kiểm thử đúng bản build sản phẩm, không cần sửa mã nguồn", "Dùng lại kỹ năng WebDriver mà đội web đã quen"],
        ["Cover a wide device matrix without doubling scripting effort", "Test the actual product build without modifying source code", "Reuse WebDriver skills the web team already knows"],
        ["スクリプト作成の手間を倍にせず広い端末マトリクスを網羅", "ソースコードを変更せず実際の製品ビルドをテスト", "Webチームが既に習得したWebDriverスキルを再利用"]
      ),
      NOTE(
        "Appium không thay thế kiểm thử tay hoàn toàn; nó giải phóng con người khỏi các kịch bản hồi quy lặp đi lặp lại để tập trung vào kiểm thử khám phá và trải nghiệm.",
        "Appium does not fully replace manual testing; it frees people from repetitive regression scripts so they can focus on exploratory and experience testing.",
        "Appiumは手動テストを完全に置き換えるものではなく、繰り返しの回帰スクリプトから人を解放し、探索的テストや体験のテストに集中できるようにします。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc client / server / driver", en: "2. Client / server / driver architecture", ja: "2. クライアント／サーバー／ドライバー構成" },
    blocks: [
      P(
        "Appium theo mô hình ba lớp rõ ràng. Lớp client là bộ kịch bản test của bạn viết bằng Java, JavaScript, Python hay ngôn ngữ khác, dùng thư viện binding tuân theo giao thức WebDriver. Lớp server là tiến trình Appium chạy dưới dạng dịch vụ HTTP, nhận các lệnh chuẩn W3C như tạo session, tìm element, gửi thao tác. Lớp driver là phần biết cách nói chuyện với từng nền tảng cụ thể để thực thi lệnh trên thiết bị.",
        "Appium follows a clear three-layer model. The client layer is your test script written in Java, JavaScript, Python or another language, using binding libraries that follow the WebDriver protocol. The server layer is the Appium process running as an HTTP service, receiving standard W3C commands such as create session, find element and send actions. The driver layer knows how to talk to each specific platform to execute commands on the device.",
        "Appiumは明確な三層モデルに従います。クライアント層はJava・JavaScript・Pythonなどで書かれたテストスクリプトで、WebDriverプロトコルに従うバインディングライブラリを使います。サーバー層はHTTPサービスとして動くAppiumプロセスで、セッション作成・要素検索・操作送信といった標準W3Cコマンドを受け取ります。ドライバー層は各プラットフォームと会話し端末上でコマンドを実行する方法を知っています。"
      ),
      IMG(SVG_ARCH, "Ba lớp Appium và cách một test dùng chung protocol cho hai nền tảng.", "Appium's three layers and how one test shares the protocol across two platforms.", "Appiumの三層と、一つのテストが二つのプラットフォームでプロトコルを共有する仕組み。"),
      P(
        "Giao thức WebDriver là cầu nối quan trọng nhất. Vì Appium nói cùng ngôn ngữ với Selenium, đội đã quen tự động hoá web sẽ thấy các khái niệm quen thuộc: session, capability, tìm element, gửi lệnh. Sự khác biệt nằm ở tầng driver bên dưới. Với Android, driver UiAutomator2 dùng framework kiểm thử của Google; với iOS, driver XCUITest dùng framework của Apple. Test client không cần biết chi tiết này, nó chỉ gửi lệnh W3C và Appium định tuyến xuống đúng driver.",
        "The WebDriver protocol is the most important bridge. Because Appium speaks the same language as Selenium, teams familiar with web automation find familiar concepts: session, capability, find element, send command. The difference lies in the driver layer underneath. For Android the UiAutomator2 driver uses Google's testing framework; for iOS the XCUITest driver uses Apple's framework. The test client need not know these details, it only sends W3C commands and Appium routes them to the right driver.",
        "WebDriverプロトコルは最も重要な橋渡しです。AppiumはSeleniumと同じ言語を話すため、Web自動化に慣れたチームはセッション・ケイパビリティ・要素検索・コマンド送信といった馴染みのある概念を見つけられます。違いは下層のドライバーにあります。AndroidではUiAutomator2ドライバーがGoogleのテストフレームワークを使い、iOSではXCUITestドライバーがAppleのフレームワークを使います。テストクライアントはこの詳細を知る必要はなく、W3Cコマンドを送るだけでAppiumが適切なドライバーへ振り分けます。"
      ),
      NOTE(
        "Appium 2 tách hẳn driver thành plugin cài riêng qua trình quản lý driver, khác với Appium 1 gộp sẵn mọi driver. Điều này giúp bản lõi nhẹ và bạn chỉ cài driver mình cần.",
        "Appium 2 fully separates drivers into plugins installed via the driver manager, unlike Appium 1 which bundled every driver. This keeps the core light and lets you install only the drivers you need.",
        "Appium 2はすべてのドライバーを同梱していたAppium 1と異なり、ドライバーをドライバーマネージャー経由で個別インストールするプラグインとして完全に分離します。これによりコアが軽量になり、必要なドライバーだけをインストールできます。"
      ),
    ],
  },
  {
    heading: { vi: "3. Cài đặt Appium 2 và driver", en: "3. Installing Appium 2 and drivers", ja: "3. Appium 2とドライバーのインストール" },
    blocks: [
      P(
        "Appium 2 được cài dưới dạng gói Node, còn các driver được quản lý riêng bằng lệnh con appium driver. Cách tách này là điểm khác biệt lớn nhất so với bản cũ và bạn cần nắm để chuẩn bị môi trường đúng. Sau khi cài lõi, bạn cài UiAutomator2 cho Android và XCUITest cho iOS, rồi dùng công cụ appium-doctor hoặc appium setup để kiểm tra các phụ thuộc như Android SDK, biến môi trường và Xcode.",
        "Appium 2 is installed as a Node package, while drivers are managed separately with the appium driver subcommand. This separation is the biggest difference from the old version and you must understand it to prepare the environment correctly. After installing the core, you add UiAutomator2 for Android and XCUITest for iOS, then use appium-doctor or appium setup to verify dependencies such as the Android SDK, environment variables and Xcode.",
        "Appium 2はNodeパッケージとしてインストールされ、ドライバーはappium driverサブコマンドで別途管理されます。この分離は旧バージョンとの最大の違いであり、環境を正しく準備するために理解が必要です。コアをインストールした後、Android用にUiAutomator2、iOS用にXCUITestを追加し、appium-doctorまたはappium setupでAndroid SDK・環境変数・Xcodeといった依存関係を検証します。"
      ),
      CODE("bash", `# Cài lõi Appium 2 toàn cục
npm install -g appium

# Cài driver theo nền tảng (Appium 2)
appium driver install uiautomator2   # Android
appium driver install xcuitest        # iOS

# Kiểm tra driver đã cài & phiên bản
appium driver list --installed

# Khởi động server (mặc định cổng 4723, base path /)
appium server -p 4723`),
      P(
        "Trước khi viết dòng test đầu tiên, hãy chắc chắn thiết bị hiển thị với công cụ nền tảng. Với Android, lệnh adb devices phải liệt kê emulator hoặc máy thật đã bật gỡ lỗi USB. Với iOS, bạn cần Xcode, một mô phỏng đã tạo và với máy thật là hồ sơ ký thích hợp. Bước kiểm tra này tiết kiệm rất nhiều thời gian vì phần lớn lỗi lúc mới bắt đầu đến từ môi trường chứ không phải từ kịch bản test.",
        "Before writing the first line of test, make sure the device is visible to the platform tooling. On Android, adb devices must list the emulator or a real device with USB debugging enabled. On iOS you need Xcode, a created simulator, and for a real device the proper signing profile. This verification step saves a lot of time because most beginner failures come from the environment rather than the test script.",
        "最初のテスト行を書く前に、端末がプラットフォームのツールから見えることを確認してください。Androidではadb devicesがエミュレータまたはUSBデバッグを有効にした実機を一覧表示する必要があります。iOSではXcode・作成済みのシミュレータ、実機の場合は適切な署名プロファイルが必要です。初心者の失敗の多くはテストスクリプトではなく環境に起因するため、この検証ステップは多くの時間を節約します。"
      ),
      TIP(
        "Ghim phiên bản driver trong tài liệu môi trường của đội. Driver mới có thể đổi hành vi nhỏ, và mọi máy trong đội nên chạy cùng bộ phiên bản để tránh lỗi khó tái hiện.",
        "Pin driver versions in your team's environment doc. New drivers can change small behaviours, and every machine in the team should run the same version set to avoid hard-to-reproduce failures.",
        "チームの環境ドキュメントでドライバーのバージョンを固定してください。新しいドライバーは細かい挙動を変えることがあり、再現が難しい失敗を避けるためチーム全員が同じバージョンセットで動かすべきです。"
      ),
    ],
  },
  {
    heading: { vi: "4. Capabilities: khai báo phiên", en: "4. Capabilities: declaring the session", ja: "4. ケイパビリティ：セッションの宣言" },
    blocks: [
      P(
        "Capabilities là bộ tham số bạn gửi khi tạo session để nói cho Appium biết cần điều khiển thiết bị nào, bằng driver gì và ứng dụng nào. Appium 2 dùng chuẩn W3C nên các khoá phải có tiền tố nhà cung cấp, ví dụ appium:deviceName thay vì viết trơn như bản cũ. Hiểu đúng nhóm capability giúp bạn tránh những lỗi khởi tạo phiên phổ biến nhất khi mới học.",
        "Capabilities are the parameters you send when creating a session to tell Appium which device to control, with which driver, and which application. Appium 2 uses the W3C standard so keys must carry a vendor prefix, for example appium:deviceName instead of the bare form used in the old version. Understanding capability groups helps you avoid the most common session-startup errors for beginners.",
        "ケイパビリティは、どの端末をどのドライバーでどのアプリを操作するかをAppiumに伝えるためにセッション作成時に送るパラメータです。Appium 2はW3C標準を使うためキーにはベンダー接頭辞が必要で、例えば旧バージョンの裸の形式ではなくappium:deviceNameと書きます。ケイパビリティのグループを理解すると、初心者に最も多いセッション起動エラーを避けられます。"
      ),
      CODE("json", `{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Pixel_7_API_34",
  "appium:app": "/builds/telco-app-release.apk",
  "appium:appPackage": "com.telco.app",
  "appium:appActivity": ".ui.MainActivity",
  "appium:newCommandTimeout": 120,
  "appium:autoGrantPermissions": true
}`),
      P(
        "Với iOS, bộ capability tương ứng dùng automationName là XCUITest, khai báo bundleId của ứng dụng, và tuỳ chọn udid cho máy thật. Điểm cần nhớ là platformName và automationName quyết định driver, còn các khoá còn lại tinh chỉnh hành vi phiên. Khoá newCommandTimeout đặc biệt quan trọng vì nó quyết định server chờ bao lâu trước khi tự huỷ phiên khi không nhận lệnh mới.",
        "For iOS the corresponding capability set uses automationName XCUITest, declares the app's bundleId, and optionally a udid for a real device. The key point to remember is that platformName and automationName decide the driver, while the remaining keys tune session behaviour. The newCommandTimeout key is especially important because it decides how long the server waits before killing the session when it receives no new command.",
        "iOSでは対応するケイパビリティセットでautomationNameにXCUITestを使い、アプリのbundleIdを宣言し、実機の場合は任意でudidを指定します。覚えておくべき要点は、platformNameとautomationNameがドライバーを決め、残りのキーがセッションの挙動を調整することです。newCommandTimeoutキーは、新しいコマンドを受け取らないときサーバーがセッションを終了するまで待つ時間を決めるため特に重要です。"
      ),
      WARN(
        "Đừng gán app và appPackage cùng lúc nếu ứng dụng đã cài sẵn; hãy chọn một cách. Trộn lẫn dễ khiến Appium cài lại bản khác hoặc mở nhầm activity, gây thất bại khó hiểu ngay ở bước tạo phiên.",
        "Do not set both app and appPackage at once if the app is already installed; pick one approach. Mixing them can make Appium reinstall a different build or launch the wrong activity, causing confusing failures right at session creation.",
        "アプリが既にインストール済みの場合、appとappPackageを同時に設定しないでください。どちらか一方を選びます。混在させるとAppiumが別のビルドを再インストールしたり誤ったアクティビティを起動したりし、セッション作成の段階で分かりにくい失敗を招きます。"
      ),
    ],
  },
  {
    heading: { vi: "5. Test đầu tiên trên emulator", en: "5. First test on an emulator", ja: "5. エミュレータでの最初のテスト" },
    blocks: [
      P(
        "Bây giờ ta ghép mọi thứ lại thành một test hoàn chỉnh chạy trên emulator. Kịch bản dưới đây khởi tạo phiên với capabilities, tìm một nút bằng accessibility id, chạm vào nó, rồi kiểm tra một element kết quả xuất hiện. Đây là khung sườn của mọi test Appium: tạo phiên, tìm element, thao tác, khẳng định, rồi đóng phiên gọn gàng trong khối dọn dẹp.",
        "Now we combine everything into a complete test running on an emulator. The script below creates a session with capabilities, finds a button by accessibility id, taps it, then checks that a result element appears. This is the skeleton of every Appium test: create the session, find an element, act, assert, then close the session cleanly in a teardown block.",
        "ここですべてを組み合わせ、エミュレータで動く完全なテストにします。以下のスクリプトはケイパビリティでセッションを作成し、アクセシビリティIDでボタンを探してタップし、結果要素が表示されることを確認します。これはあらゆるAppiumテストの骨格です：セッション作成・要素検索・操作・アサーション・そして後処理ブロックでセッションを丁寧に閉じます。"
      ),
      CODE("javascript", `// WebdriverIO — smoke test đăng nhập trên emulator Android
import { remote } from 'webdriverio';

const caps = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Pixel_7_API_34',
  'appium:app': '/builds/telco-app-release.apk',
  'appium:autoGrantPermissions': true,
};

const driver = await remote({
  hostname: '127.0.0.1', port: 4723, path: '/', capabilities: caps,
});

try {
  const loginBtn = await driver.$('~login_button');   // ~ = accessibility id
  await loginBtn.click();
  const home = await driver.$('~home_screen');
  await home.waitForDisplayed({ timeout: 10000 });
  console.log('Đăng nhập thành công:', await home.isDisplayed());
} finally {
  await driver.deleteSession();                       // luôn đóng phiên
}`),
      P(
        "Chú ý cú pháp locator: tiền tố dấu ngã trong WebdriverIO là cách viết tắt cho accessibility id. Việc chờ element hiển thị bằng waitForDisplayed thay vì giả định nó sẵn sàng là thói quen tốt ngay từ đầu, vì màn hình mobile thường có hoạt ảnh chuyển cảnh khiến element chưa tương tác được ngay lập tức. Khối finally đảm bảo phiên luôn được đóng kể cả khi có lỗi, tránh rò rỉ thiết bị bị khoá.",
        "Note the locator syntax: the tilde prefix in WebdriverIO is shorthand for accessibility id. Waiting for the element to be displayed with waitForDisplayed instead of assuming it is ready is a good habit from the start, because mobile screens often have transition animations that make an element not yet interactable. The finally block ensures the session is always closed even on error, avoiding leaking a locked device.",
        "ロケータの構文に注目してください。WebdriverIOのチルダ接頭辞はアクセシビリティIDの省略記法です。要素が準備できたと仮定せずwaitForDisplayedで表示を待つのは最初から良い習慣です。モバイル画面には画面遷移アニメーションがあり要素がすぐ操作可能にならないことが多いためです。finallyブロックはエラー時でもセッションが必ず閉じられることを保証し、ロックされた端末の漏れを防ぎます。"
      ),
      TIP(
        "Đặt tên accessibility id có nghĩa và ổn định trong mã sản phẩm là món quà lớn nhất đội phát triển tặng đội QA. Hãy chủ động đề nghị điều này trong buổi review thiết kế.",
        "Setting meaningful, stable accessibility ids in product code is the biggest gift the dev team gives the QA team. Proactively request this in design reviews.",
        "製品コードに意味があり安定したアクセシビリティIDを設定することは、開発チームがQAチームに贈る最大の贈り物です。設計レビューで積極的に依頼しましょう。"
      ),
    ],
  },
  {
    heading: { vi: "6. Chạy trên thiết bị thật", en: "6. Running on a real device", ja: "6. 実機での実行" },
    blocks: [
      P(
        "Emulator và mô phỏng tiện cho vòng lặp phát triển nhanh, nhưng một số vấn đề chỉ lộ ra trên máy thật: cảm biến vân tay, thông báo đẩy, chất lượng mạng di động, hiệu năng thực và các popup của hệ điều hành. Với ứng dụng viễn thông, việc kiểm thử trên máy thật càng quan trọng vì luồng như đăng ký SIM eSIM hay xác thực OTP qua SMS gắn chặt với phần cứng và mạng thật.",
        "Emulators and simulators are convenient for fast development loops, but some issues only surface on real hardware: fingerprint sensors, push notifications, cellular network quality, real performance and OS popups. For a telecom app, real-device testing is even more important because flows like eSIM registration or OTP verification over SMS are tightly bound to real hardware and networks.",
        "エミュレータやシミュレータは高速な開発ループに便利ですが、一部の問題は実機でしか表面化しません：指紋センサー・プッシュ通知・モバイルネットワーク品質・実際の性能・OSのポップアップです。通信アプリでは、eSIM登録やSMS経由のOTP認証といったフローが実際のハードウェアとネットワークに密接に結びついているため、実機テストはさらに重要です。"
      ),
      CODE("json", `// Capabilities cho máy Android thật (UDID lấy từ adb devices)
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:udid": "R5CR20XXXXX",
  "appium:deviceName": "Galaxy S22",
  "appium:appPackage": "com.telco.app",
  "appium:appActivity": ".ui.MainActivity",
  "appium:noReset": true
}`),
      P(
        "Khoá udid gắn phiên với đúng một thiết bị cụ thể, lấy được từ lệnh adb devices trên Android hoặc công cụ liệt kê thiết bị trên iOS. Khoá noReset đặt true để giữ nguyên trạng thái ứng dụng giữa các lần chạy, hữu ích khi bạn không muốn đăng nhập lại mỗi test. Trên iOS máy thật, bạn còn cần cấu hình WebDriverAgent với hồ sơ ký hợp lệ, đây thường là rào cản kỹ thuật đầu tiên mà đội mới làm iOS gặp phải.",
        "The udid key binds the session to exactly one specific device, obtained from adb devices on Android or a device-listing tool on iOS. The noReset key set to true keeps the app state between runs, useful when you do not want to log in again each test. On a real iOS device you also need to configure WebDriverAgent with a valid signing profile, which is usually the first technical hurdle a team new to iOS meets.",
        "udidキーはセッションを厳密に一つの特定端末に結びつけ、Androidではadb devices、iOSでは端末一覧ツールから取得します。noResetキーをtrueにすると実行間でアプリの状態を保持でき、テストごとに再ログインしたくない場合に便利です。iOS実機ではさらに有効な署名プロファイルでWebDriverAgentを設定する必要があり、これはiOSに不慣れなチームが最初に出会う技術的な障壁であることが多いです。"
      ),
      NOTE(
        "Máy thật có thể ngủ, hết pin hoặc mất kết nối USB giữa lượt chạy. Hãy giữ màn hình luôn sáng khi test và theo dõi nhiệt độ khi chạy dài để tránh thiết bị tự điều tiết hiệu năng.",
        "Real devices can sleep, run out of battery or lose USB connection mid-run. Keep the screen awake during tests and monitor temperature on long runs to avoid the device throttling performance.",
        "実機は実行中にスリープしたり、バッテリーが切れたり、USB接続が失われたりします。テスト中は画面を常に点灯させ、長時間実行では端末が性能を絞るのを避けるため温度を監視してください。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chiến lược locator", en: "7. Locator strategies", ja: "7. ロケータ戦略" },
    blocks: [
      P(
        "Chọn locator đúng là yếu tố quyết định giữa một bộ test ổn định và một bộ test hay đỏ vô cớ. Locator ổn định nhất và dùng chung được cho cả hai nền tảng là accessibility id, ánh xạ sang content-desc trên Android và nhãn accessibility trên iOS. Sau đó mới đến resource-id trên Android hay các bộ chọn riêng nền tảng. XPath tuy linh hoạt nhưng chậm và giòn, nên chỉ dùng khi thật sự không còn cách nào tốt hơn.",
        "Choosing the right locator is the deciding factor between a stable test suite and one that goes red for no reason. The most stable locator that works across both platforms is accessibility id, which maps to content-desc on Android and the accessibility label on iOS. Then come resource-id on Android or platform-specific selectors. XPath, while flexible, is slow and brittle, so use it only when there is genuinely no better option.",
        "適切なロケータの選択は、安定したテストスイートと理由もなく赤くなるスイートを分ける決定的要因です。両プラットフォームで使える最も安定したロケータはアクセシビリティIDで、Androidではcontent-desc、iOSではアクセシビリティラベルに対応します。次にAndroidのresource-idやプラットフォーム固有のセレクタが続きます。XPathは柔軟ですが遅く壊れやすいため、本当に他に良い方法がないときだけ使います。"
      ),
      IMG(SVG_LOCATORS, "Thứ tự ưu tiên locator và các bộ chọn riêng cho Android/iOS.", "Locator priority order and platform-specific selectors for Android/iOS.", "ロケータの優先順位とAndroid／iOS向けの固有セレクタ。"),
      P(
        "Với Android, UiSelector cho phép mô tả element theo thuộc tính giao diện như text, class hay chỉ số, gửi qua chiến lược -android uiautomator. Với iOS, hai công cụ mạnh là predicate string mô tả điều kiện lọc và class chain diễn tả quan hệ cha con theo cú pháp ngắn gọn hơn XPath và nhanh hơn nhiều. Nắm được các bộ chọn riêng này giúp bạn xử lý những màn hình phức tạp mà accessibility id không phủ hết.",
        "For Android, UiSelector lets you describe an element by UI attributes such as text, class or index, sent via the -android uiautomator strategy. For iOS, two powerful tools are the predicate string describing filter conditions and the class chain expressing parent-child relationships in a syntax shorter than XPath and much faster. Mastering these platform selectors helps you handle complex screens that accessibility id alone cannot cover.",
        "AndroidではUiSelectorがtext・class・indexなどのUI属性で要素を記述でき、-android uiautomator戦略で送信します。iOSでは強力なツールが二つあり、フィルタ条件を記述するpredicate stringと、XPathより短くはるかに速い構文で親子関係を表すclass chainです。これらのプラットフォームセレクタを習得すると、アクセシビリティIDだけでは網羅できない複雑な画面を扱えます。"
      ),
      CODE("javascript", `// Android UiSelector: tìm theo text chính xác
const btn = await driver.$('android=new UiSelector().text("Xác nhận")');

// Android resource-id
const field = await driver.$('id:com.telco.app:id/phone_input');

// iOS predicate string: nút có nhãn "Continue" và đang hiển thị
const next = await driver.$('-ios predicate string:label == "Continue" AND visible == 1');

// iOS class chain: ô nhập thứ 2 trong màn hình
const otp = await driver.$('-ios class chain:**/XCUIElementTypeTextField[2]');`),
      WARN(
        "Tránh XPath tuyệt đối kiểu duyệt theo chỉ số toàn cây. Chỉ cần đội phát triển thêm một view bao ngoài là toàn bộ đường dẫn gãy. Ưu tiên id ổn định do đội phát triển cung cấp.",
        "Avoid absolute XPath that traverses the whole tree by index. A single wrapping view added by the dev team breaks the entire path. Prefer stable ids provided by the development team.",
        "ツリー全体をインデックスで辿る絶対XPathは避けてください。開発チームがラップするビューを一つ追加するだけでパス全体が壊れます。開発チームが提供する安定したIDを優先してください。"
      ),
    ],
  },
  {
    heading: { vi: "8. Appium Inspector", en: "8. Appium Inspector", ja: "8. Appium Inspector" },
    blocks: [
      P(
        "Appium Inspector là công cụ đồ hoạ giúp bạn soi cây giao diện của ứng dụng đang chạy để tìm ra thuộc tính element và locator phù hợp. Bạn kết nối Inspector tới server Appium với chính bộ capabilities dùng cho test, sau đó chạm vào element trên ảnh chụp màn hình để xem thuộc tính accessibility id, resource-id, text và gợi ý locator. Đây là cách nhanh nhất để xác định locator thay vì đoán mò trong mã.",
        "Appium Inspector is a graphical tool that lets you inspect the UI tree of the running app to find element attributes and suitable locators. You connect the Inspector to the Appium server with the same capabilities used for tests, then tap an element on the screenshot to see attributes like accessibility id, resource-id, text and suggested locators. This is the fastest way to determine locators instead of guessing in code.",
        "Appium Inspectorは、実行中アプリのUIツリーを調べて要素属性と適切なロケータを見つけるグラフィカルツールです。テストで使うのと同じケイパビリティでInspectorをAppiumサーバーに接続し、スクリーンショット上の要素をタップするとアクセシビリティID・resource-id・text・推奨ロケータなどの属性が見えます。これはコード内で当てずっぽうにするより最速でロケータを特定する方法です。"
      ),
      SCEN(
        "Dò locator cho màn hình OTP",
        "Hunting a locator for the OTP screen",
        "Đội QA viễn thông cần tự động luồng nhập OTP nhưng màn hình có sáu ô số không có accessibility id. Mở Appium Inspector, họ chạm từng ô và thấy chúng chỉ khác nhau ở chỉ số trong cùng một class. Họ dùng iOS class chain để chọn ô theo vị trí và ghi phản hồi cho đội phát triển bổ sung id ổn định ở sprint sau. Nhờ vậy test chạy được ngay mà vẫn cải thiện chất lượng mã lâu dài.",
        "A telecom QA team needs to automate the OTP entry flow but the screen has six digit fields with no accessibility id. Opening Appium Inspector, they tap each field and see they differ only by index within the same class. They use an iOS class chain to select fields by position and file feedback for the dev team to add stable ids next sprint. This gets tests running immediately while still improving code quality long term.",
        "通信のQAチームはOTP入力フローを自動化する必要がありますが、画面にはアクセシビリティIDのない六つの数字欄があります。Appium Inspectorを開いて各欄をタップすると、同じクラス内でindexだけが異なると分かります。iOS class chainで位置により欄を選び、次のスプリントで開発チームに安定したIDを追加してもらうフィードバックを提出します。これによりテストは即座に動き、長期的にコード品質も改善されます。"
      ),
      TIP(
        "Bật chế độ ghi lại thao tác trong Inspector để sinh nhanh khung code cho một luồng, nhưng luôn tinh chỉnh lại locator và thêm chờ tường minh trước khi đưa vào bộ test chính.",
        "Enable the action-recording mode in Inspector to quickly scaffold code for a flow, but always refine the locators and add explicit waits before putting it into the main suite.",
        "Inspectorのアクション記録モードを有効にするとフローのコードを素早く生成できますが、メインスイートに入れる前に必ずロケータを調整し明示的な待機を追加してください。"
      ),
    ],
  },
  {
    heading: { vi: "9. Cử chỉ cơ bản với W3C Actions", en: "9. Basic gestures with W3C Actions", ja: "9. W3C Actionsによる基本ジェスチャー" },
    blocks: [
      P(
        "Cử chỉ như chạm, giữ, vuốt và cuộn được mô tả qua W3C Actions API, một mô hình chung dựa trên chuỗi sự kiện của con trỏ. Một cử chỉ đơn được tạo từ các bước nhấn xuống, di chuyển, dừng và nhả ra ở một hay nhiều con trỏ. Appium xây các phương thức tiện lợi bên trên mô hình này, nhưng hiểu tầng gốc giúp bạn tạo cử chỉ chính xác khi cần, chẳng hạn vuốt đúng khoảng cách để lộ nút ẩn.",
        "Gestures such as tap, long press, swipe and scroll are described through the W3C Actions API, a common model based on a sequence of pointer events. A single gesture is built from steps of pressing down, moving, pausing and releasing on one or more pointers. Appium builds convenience methods on top of this model, but understanding the base layer lets you craft precise gestures when needed, such as swiping the exact distance to reveal a hidden button.",
        "タップ・長押し・スワイプ・スクロールといったジェスチャーは、ポインタイベントの連続に基づく共通モデルであるW3C Actions APIで記述されます。単一のジェスチャーは、一つ以上のポインタでの押下・移動・一時停止・解放のステップから構成されます。Appiumはこのモデルの上に便利メソッドを構築しますが、基礎層を理解すると必要なときに正確なジェスチャーを作れます。例えば隠れたボタンを露出させるちょうどの距離をスワイプするなどです。"
      ),
      IMG(SVG_GESTURE, "Mô hình con trỏ của W3C Actions cho tap, swipe và pinch.", "The W3C Actions pointer model for tap, swipe and pinch.", "tap・swipe・pinchのためのW3C Actionsポインタモデル。"),
      CODE("javascript", `// Swipe lên bằng W3C Actions (WebdriverIO)
await driver.action('pointer')
  .move({ x: 200, y: 1400 })     // đặt con trỏ ở đáy
  .down()
  .pause(100)
  .move({ duration: 600, x: 200, y: 400 })  // kéo lên đỉnh
  .up()
  .perform();

// Cách rút gọn: cuộn tới element bằng mobile command của UiAutomator2
await driver.execute('mobile: scrollGesture', {
  left: 100, top: 300, width: 500, height: 1000,
  direction: 'down', percent: 3.0,
});`),
      P(
        "Ví dụ đầu dùng chuỗi Actions thô để vuốt từ đáy lên đỉnh, kiểm soát từng bước và thời lượng di chuyển. Ví dụ sau dùng lệnh mobile riêng của driver, gọn hơn cho các thao tác thường gặp như cuộn theo hướng. Với ứng dụng viễn thông, cuộn danh sách gói cước dài hay vuốt thẻ trong ví điện tử là các cử chỉ bạn sẽ viết đi viết lại, nên gói chúng thành hàm dùng chung ngay từ sớm.",
        "The first example uses a raw Actions sequence to swipe from bottom to top, controlling each step and the movement duration. The second uses the driver's own mobile command, more concise for common actions like scrolling in a direction. For a telecom app, scrolling a long list of plans or swiping cards in a wallet are gestures you will write repeatedly, so wrap them into shared helpers early.",
        "最初の例は生のActionsシーケンスで下から上へスワイプし、各ステップと移動時間を制御します。二つ目はドライバー独自のmobileコマンドを使い、方向へのスクロールのような一般的な操作をより簡潔にします。通信アプリでは長い料金プラン一覧のスクロールやウォレット内のカードのスワイプが繰り返し書くジェスチャーなので、早めに共通ヘルパーにまとめましょう。"
      ),
      NOTE(
        "Tọa độ tuyệt đối phụ thuộc độ phân giải màn hình. Hãy tính toạ độ theo tỉ lệ kích thước cửa sổ hoặc theo vị trí element để cử chỉ chạy đúng trên nhiều thiết bị khác nhau.",
        "Absolute coordinates depend on screen resolution. Compute coordinates as a ratio of window size or from an element's location so gestures work correctly across many different devices.",
        "絶対座標は画面解像度に依存します。多くの異なる端末でジェスチャーが正しく動くよう、座標をウィンドウサイズの比率や要素の位置から計算してください。"
      ),
    ],
  },
  {
    heading: { vi: "10. Bẫy thường gặp khi mới bắt đầu", en: "10. Common beginner pitfalls", ja: "10. 初心者がよく陥る落とし穴" },
    blocks: [
      P(
        "Phần lớn thất bại đầu đời của test Appium đến từ vài mẫu lặp đi lặp lại. Thứ nhất là dùng sleep cố định thay vì chờ tường minh, khiến test lúc nhanh lúc chậm đều hỏng. Thứ hai là locator giòn dựa vào XPath tuyệt đối. Thứ ba là quên xử lý popup xin quyền hệ điều hành che mất element. Thứ tư là không đóng phiên khi lỗi, để thiết bị kẹt cho lần chạy sau.",
        "Most early Appium test failures come from a few repeating patterns. First is using fixed sleeps instead of explicit waits, which breaks tests whether they run fast or slow. Second is brittle locators relying on absolute XPath. Third is forgetting to handle OS permission popups that cover elements. Fourth is not closing the session on error, leaving the device stuck for the next run.",
        "初期のAppiumテスト失敗の多くはいくつかの繰り返しパターンから生じます。一つ目は明示的な待機ではなく固定sleepを使うことで、速く動いても遅く動いてもテストが壊れます。二つ目は絶対XPathに依存する壊れやすいロケータです。三つ目は要素を覆うOSの権限ポップアップの処理を忘れることです。四つ目はエラー時にセッションを閉じず、次の実行のために端末を詰まらせることです。"
      ),
      UL(
        ["Thay sleep cố định bằng chờ tường minh có điều kiện rõ ràng", "Đặt autoGrantPermissions hoặc xử lý popup quyền một cách chủ động", "Luôn đóng phiên trong khối dọn dẹp dù test thành công hay thất bại", "Kiểm tra phiên bản driver và OS đồng nhất giữa các máy"],
        ["Replace fixed sleeps with explicit waits and clear conditions", "Set autoGrantPermissions or proactively handle permission popups", "Always close the session in teardown whether the test passed or failed", "Keep driver and OS versions consistent across machines"],
        ["固定sleepを明確な条件付きの明示的待機に置き換える", "autoGrantPermissionsを設定するか権限ポップアップを積極的に処理する", "テストの成否にかかわらず後処理でセッションを必ず閉じる", "マシン間でドライバーとOSのバージョンを一致させる"]
      ),
      CODE("javascript", `// KHÔNG NÊN: chờ mù bằng thời gian cố định
await driver.pause(3000);
await (await driver.$('~submit')).click();  // dễ đỏ nếu máy chậm

// NÊN: chờ có điều kiện rồi mới thao tác
const submit = await driver.$('~submit');
await submit.waitForEnabled({ timeout: 8000 });
await submit.click();`),
      WARN(
        "Popup xin quyền vị trí, thông báo hay danh bạ trên hệ điều hành không nằm trong ứng dụng và có thể chặn mọi thao tác tiếp theo. Hãy lường trước và xử lý chúng như một phần của luồng test.",
        "OS popups requesting location, notifications or contacts permission are outside the app and can block all subsequent actions. Anticipate and handle them as part of the test flow.",
        "位置情報・通知・連絡先の権限を求めるOSのポップアップはアプリの外にあり、以降のすべての操作を妨げることがあります。テストフローの一部として予測し処理してください。"
      ),
    ],
  },
  {
    heading: { vi: "11. Kịch bản thực chiến viễn thông", en: "11. Real telecom scenario", ja: "11. 通信の実戦シナリオ" },
    blocks: [
      P(
        "Hãy xâu chuỗi kiến thức thành một luồng nghiệp vụ thật của nhà mạng: người dùng đăng nhập, xem gói cước, chọn mua thêm dung lượng và xác nhận. Test này chạm vào cả locator chung, cử chỉ cuộn, chờ tường minh và khẳng định kết quả. Đây chính là kiểu test hồi quy mà đội QA muốn tự động hoá vì nó lặp lại mỗi lần phát hành và tốn nhiều công nếu làm tay.",
        "Let us chain the knowledge into a real carrier business flow: the user logs in, views plans, chooses to buy extra data and confirms. This test touches shared locators, scroll gestures, explicit waits and result assertions. This is exactly the kind of regression test the QA team wants to automate because it repeats every release and is costly to do by hand.",
        "知識をつなげて通信事業者の実際の業務フローにしましょう：ユーザーがログインし、料金プランを見て、追加データの購入を選び、確認します。このテストは共通ロケータ・スクロールジェスチャー・明示的待機・結果アサーションのすべてに触れます。これはまさにQAチームが自動化したい回帰テストの類で、リリースごとに繰り返され手作業では手間がかかるためです。"
      ),
      CODE("javascript", `// Luồng: đăng nhập → cuộn tới gói → mua thêm data → xác nhận
async function buyDataPack(driver) {
  await (await driver.$('~login_button')).click();
  await (await driver.$('~home_screen')).waitForDisplayed({ timeout: 10000 });

  // cuộn tới thẻ gói "Data 5GB"
  await driver.execute('mobile: scrollGesture', {
    left: 100, top: 300, width: 500, height: 1200, direction: 'down', percent: 2.0,
  });
  const pack = await driver.$('~pack_data_5gb');
  await pack.waitForDisplayed({ timeout: 8000 });
  await pack.click();

  const confirm = await driver.$('~confirm_purchase');
  await confirm.waitForEnabled({ timeout: 8000 });
  await confirm.click();

  const success = await driver.$('~purchase_success');
  await success.waitForDisplayed({ timeout: 12000 });
  return await success.isDisplayed();   // true nếu mua thành công
}`),
      P(
        "Điểm đáng chú ý là mỗi bước đều chờ điều kiện rõ ràng trước khi thao tác, và luồng được gói trong một hàm dùng lại được để nhiều test khác nhau gọi lại với dữ liệu khác nhau. Khi bộ test lớn dần, chính những hàm nghiệp vụ như thế này trở thành khối xây dựng, còn từng test chỉ ghép các khối lại thành kịch bản đọc dễ như tiếng người.",
        "The notable point is that every step waits for a clear condition before acting, and the flow is wrapped in a reusable function that many different tests can call with different data. As the suite grows, these business functions become the building blocks, while each test just assembles the blocks into a scenario as readable as plain language.",
        "注目点は、各ステップが操作前に明確な条件を待つこと、そしてフローが多くの異なるテストから異なるデータで呼べる再利用可能な関数に包まれていることです。スイートが大きくなると、こうした業務関数が構成部品となり、各テストは部品を組み合わせて自然言語のように読みやすいシナリオにするだけになります。"
      ),
      TIP(
        "Tách dữ liệu test khỏi mã kịch bản. Cùng một hàm buyDataPack nên chạy được với nhiều gói khác nhau chỉ bằng cách đổi tham số đầu vào, giúp mở rộng độ phủ mà không nhân bản mã.",
        "Separate test data from script code. The same buyDataPack function should run with many different packs just by changing input parameters, expanding coverage without duplicating code.",
        "テストデータをスクリプトコードから分離してください。同じbuyDataPack関数は入力パラメータを変えるだけで多くの異なるプランで動くべきで、コードを複製せずに網羅範囲を広げられます。"
      ),
    ],
  },
  {
    heading: { vi: "12. Hỏi đáp phỏng vấn", en: "12. Interview Q&A", ja: "12. 面接の質疑応答" },
    blocks: [
      QA(
        "Appium điều khiển ứng dụng mà không cần sửa mã nguồn bằng cách nào?",
        "How does Appium drive an app without modifying source code?",
        "Appium dùng các framework tự động hoá của chính nền tảng: UiAutomator2 cho Android và XCUITest cho iOS. Test client gửi lệnh WebDriver W3C tới server, server định tuyến xuống driver, driver gọi framework nền tảng để thao tác trên bản build thật. Vì thế bạn kiểm thử đúng file người dùng cài mà không nhúng thư viện lạ.",
        "Appium uses the platform's own automation frameworks: UiAutomator2 for Android and XCUITest for iOS. The test client sends W3C WebDriver commands to the server, the server routes them to a driver, and the driver calls the platform framework to act on the real build. So you test the exact file users install without embedding a foreign library.",
        "AppiumはプラットフォームのフレームワークであるAndroid用UiAutomator2とiOS用XCUITestを使います。テストクライアントがW3C WebDriverコマンドをサーバーに送り、サーバーがドライバーへ振り分け、ドライバーがプラットフォームのフレームワークを呼んで実ビルドを操作します。よって外部ライブラリを組み込まずユーザーが実際にインストールするファイルそのものをテストできます。"
      ),
      QA(
        "Khác biệt chính giữa Appium 1 và Appium 2 là gì?",
        "What is the main difference between Appium 1 and Appium 2?",
        "Appium 2 tách driver thành plugin cài riêng qua trình quản lý driver, thay vì gộp sẵn mọi driver như bản 1. Nó cũng chuẩn hoá theo giao thức W3C nên capability cần tiền tố appium:. Kết quả là lõi nhẹ hơn, bạn chỉ cài driver cần dùng, và có thể mở rộng bằng plugin.",
        "Appium 2 separates drivers into plugins installed via the driver manager, instead of bundling every driver like version 1. It also standardises on the W3C protocol so capabilities need the appium: prefix. The result is a lighter core, you install only the drivers you need, and it is extensible via plugins.",
        "Appium 2はバージョン1のようにすべてのドライバーを同梱するのではなく、ドライバーをドライバーマネージャー経由で個別インストールするプラグインに分離します。またW3Cプロトコルに標準化されケイパビリティにはappium:接頭辞が必要です。結果としてコアが軽くなり、必要なドライバーだけをインストールでき、プラグインで拡張できます。"
      ),
      QA(
        "Vì sao nên ưu tiên accessibility id hơn XPath?",
        "Why prefer accessibility id over XPath?",
        "Accessibility id ổn định, nhanh và dùng chung cho cả Android lẫn iOS, lại phục vụ song song mục tiêu khả năng tiếp cận. XPath tuyệt đối phụ thuộc cấu trúc cây, chỉ cần đội phát triển thêm một view bao ngoài là gãy, và việc duyệt cây khiến tìm element chậm. Vì thế accessibility id giảm rõ rệt tỉ lệ test đỏ vô cớ.",
        "Accessibility id is stable, fast and shared across both Android and iOS, and it doubles as an accessibility goal. Absolute XPath depends on tree structure, breaks the moment the dev team adds a wrapping view, and tree traversal makes element lookup slow. So accessibility id markedly reduces flaky red tests.",
        "アクセシビリティIDは安定していて速く、AndroidとiOSの両方で共有でき、同時にアクセシビリティの目標も兼ねます。絶対XPathはツリー構造に依存し、開発チームがラップするビューを追加した瞬間に壊れ、ツリー探索により要素検索が遅くなります。よってアクセシビリティIDは理由のない不安定な赤いテストを著しく減らします。"
      ),
      QA(
        "Khi nào cần test trên máy thật thay vì emulator?",
        "When do you need real-device testing instead of an emulator?",
        "Khi luồng phụ thuộc phần cứng hoặc mạng thật: vân tay, camera, thông báo đẩy, chất lượng mạng di động, hiệu năng thật, popup hệ điều hành, hay xác thực OTP qua SMS. Emulator hợp cho vòng lặp phát triển nhanh, còn máy thật cần cho smoke suite trước phát hành để bắt lỗi chỉ xuất hiện trên phần cứng thật.",
        "When a flow depends on real hardware or network: fingerprint, camera, push notifications, cellular quality, real performance, OS popups, or OTP verification over SMS. Emulators suit fast development loops, while real devices are needed for the pre-release smoke suite to catch issues that only appear on real hardware.",
        "フローが実ハードウェアやネットワークに依存する場合です：指紋・カメラ・プッシュ通知・モバイル品質・実際の性能・OSのポップアップ・SMS経由のOTP認証など。エミュレータは高速な開発ループに向き、実機はリリース前のスモークスイートで実ハードウェアでしか現れない問題を捕まえるために必要です。"
      ),
    ],
  },
  {
    heading: { vi: "13. Tổng kết và checklist", en: "13. Summary and checklist", ja: "13. まとめとチェックリスト" },
    blocks: [
      P(
        "Nền tảng Appium xoay quanh vài trụ cột: kiến trúc client-server-driver dựa trên giao thức WebDriver, cách cài Appium 2 với driver riêng, khai báo capabilities đúng chuẩn W3C, chọn locator ổn định và tạo cử chỉ qua W3C Actions. Nắm vững những trụ cột này, bạn viết được test chạy trên cả emulator lẫn máy thật, cho cả Android lẫn iOS, và sẵn sàng bước tiếp sang bài về scale và device farm.",
        "Appium foundations revolve around a few pillars: the client-server-driver architecture over the WebDriver protocol, installing Appium 2 with separate drivers, declaring W3C-compliant capabilities, choosing stable locators and crafting gestures via W3C Actions. Master these pillars and you can write tests that run on both emulators and real devices, for both Android and iOS, ready to move on to the article about scaling and device farms.",
        "Appiumの基礎はいくつかの柱を軸に展開します：WebDriverプロトコル上のクライアント・サーバー・ドライバー構成、個別ドライバーでのAppium 2インストール、W3C準拠のケイパビリティ宣言、安定したロケータの選択、そしてW3C Actionsによるジェスチャー作成です。これらの柱を習得すればエミュレータと実機の両方、AndroidとiOSの両方で動くテストを書け、スケーリングとデバイスファームの記事へ進む準備が整います。"
      ),
      UL(
        ["Đã cài Appium 2 và driver UiAutomator2/XCUITest, ghim phiên bản", "Capabilities đúng tiền tố appium:, có newCommandTimeout hợp lý", "Locator ưu tiên accessibility id, có phương án riêng cho từng nền tảng", "Mọi thao tác đều chờ tường minh, không dùng sleep cố định", "Phiên luôn được đóng trong khối dọn dẹp; đã chạy trên cả emulator và máy thật"],
        ["Appium 2 and UiAutomator2/XCUITest drivers installed, versions pinned", "Capabilities use the appium: prefix with a sensible newCommandTimeout", "Locators prioritise accessibility id with platform-specific fallbacks", "Every action uses explicit waits, no fixed sleeps", "Sessions always closed in teardown; run on both emulator and real device"],
        ["Appium 2とUiAutomator2／XCUITestドライバーをインストールしバージョンを固定", "ケイパビリティはappium:接頭辞を使い妥当なnewCommandTimeoutを持つ", "ロケータはアクセシビリティIDを優先しプラットフォーム固有の代替を用意", "すべての操作は明示的待機を使い固定sleepを使わない", "セッションは後処理で必ず閉じる；エミュレータと実機の両方で実行済み"]
      ),
      NOTE(
        "Bài tiếp theo sẽ mở rộng nền tảng này lên quy mô: chạy song song nhiều thiết bị, dùng device farm đám mây, kiểm soát flake và tích hợp vào CI cho ma trận thiết bị lớn.",
        "The next article scales this foundation up: running many devices in parallel, using cloud device farms, controlling flake and integrating into CI for a large device matrix.",
        "次の記事ではこの基礎を規模へ拡張します：多数の端末の並列実行、クラウドのデバイスファーム利用、不安定さの制御、そして大規模な端末マトリクスのためのCI統合です。"
      ),
    ],
  },
];

// ===========================================================================
// BÀI 2 — Scaling: device farm, parallel, CI
// ===========================================================================
const pages2 = [
  {
    heading: { vi: "1. Từ một test đến quy mô lớn", en: "1. From one test to scale", ja: "1. 一つのテストから大規模へ" },
    blocks: [
      P(
        "Một ứng dụng bán lẻ phải hoạt động tốt trên hàng loạt điện thoại giá rẻ lẫn cao cấp, nhiều phiên bản hệ điều hành và độ phân giải màn hình khác nhau. Khi bộ test Appium lớn dần, chạy tuần tự từng thiết bị trở nên quá chậm để kịp mỗi lần phát hành. Bài này bàn về cách đưa nền tảng Appium lên quy mô sản xuất: chạy song song, dùng device farm, kiểm soát flake, đồng bộ hoá và tích hợp CI.",
        "A retail app must work well on a range of budget and premium phones, many OS versions and different screen resolutions. As the Appium suite grows, running devices sequentially becomes too slow to keep up with each release. This article discusses taking the Appium foundation to production scale: parallel execution, device farms, flake control, synchronisation and CI integration.",
        "小売アプリは廉価版から高級機まで幅広いスマートフォン、多数のOSバージョン、異なる画面解像度でうまく動く必要があります。Appiumスイートが大きくなると、端末を順番に実行するのはリリースごとに間に合わせるには遅すぎます。この記事ではAppiumの基礎を本番規模へ引き上げる方法を論じます：並列実行・デバイスファーム・不安定さの制御・同期・CI統合です。"
      ),
      P(
        "Bài toán cốt lõi khi mở rộng là thời gian và độ phủ. Chạy song song rút ngắn thời gian, còn device farm mở rộng độ phủ thiết bị mà không cần mua và bảo trì kho máy vật lý. Nhưng cả hai đều làm lộ ra sự mong manh của test mobile, nên kiểm soát flake và đồng bộ hoá trở thành kỹ năng bắt buộc chứ không còn là tuỳ chọn.",
        "The core problem when scaling is time and coverage. Parallel execution shortens time, while a device farm expands device coverage without buying and maintaining a physical device fleet. But both expose the fragility of mobile tests, so flake control and synchronisation become mandatory skills rather than optional.",
        "スケーリング時の核心的課題は時間と網羅範囲です。並列実行は時間を短縮し、デバイスファームは物理端末群を購入・保守せずに端末の網羅範囲を広げます。しかしどちらもモバイルテストの脆さを露呈させるため、不安定さの制御と同期は任意ではなく必須のスキルになります。"
      ),
      NOTE(
        "Scale không chỉ là chạy nhanh hơn. Nếu bộ test không ổn định thì chạy song song chỉ nhân số lần đỏ ngẫu nhiên lên, làm mất niềm tin của đội. Ổn định phải đi trước tốc độ.",
        "Scale is not just about running faster. If the suite is unstable, parallel execution only multiplies random reds, eroding the team's trust. Stability must come before speed.",
        "スケールは単に速く動かすことではありません。スイートが不安定なら並列実行はランダムな赤を増やすだけで、チームの信頼を損ないます。安定性は速度に先立つべきです。"
      ),
    ],
  },
  {
    heading: { vi: "2. Chạy song song nhiều thiết bị", en: "2. Parallel execution across devices", ja: "2. 複数端末での並列実行" },
    blocks: [
      P(
        "Chạy song song trong Appium nghĩa là mở nhiều phiên độc lập cùng lúc, mỗi phiên gắn với một thiết bị riêng qua udid. Mấu chốt kỹ thuật là mỗi phiên phải có cổng nội bộ riêng để driver không tranh chấp tài nguyên: trên Android là systemPort cho UiAutomator2, trên iOS là wdaLocalPort cho WebDriverAgent. Nếu hai phiên dùng chung cổng, chúng sẽ chồng chéo và gây lỗi ngẫu nhiên rất khó gỡ.",
        "Parallel execution in Appium means opening multiple independent sessions at once, each bound to a separate device via udid. The technical key is that each session must have its own internal port so drivers do not contend for resources: on Android that is systemPort for UiAutomator2, on iOS wdaLocalPort for WebDriverAgent. If two sessions share a port they overlap and cause random, very hard-to-debug failures.",
        "Appiumの並列実行とは、複数の独立したセッションを同時に開き、各セッションをudidで別々の端末に結びつけることです。技術的な鍵は、ドライバーがリソースを奪い合わないよう各セッションが独自の内部ポートを持つことです：AndroidではUiAutomator2用のsystemPort、iOSではWebDriverAgent用のwdaLocalPortです。二つのセッションがポートを共有すると重なり、非常にデバッグしにくいランダムな失敗を引き起こします。"
      ),
      IMG(SVG_PARALLEL, "Nhiều phiên Appium song song, mỗi phiên có cổng và UDID riêng.", "Multiple parallel Appium sessions, each with its own port and UDID.", "複数の並列Appiumセッション、各々が独自のポートとUDIDを持つ。"),
      CODE("javascript", `// wdio.conf: nhiều capabilities song song, mỗi thiết bị cổng riêng
export const config = {
  maxInstances: 3,           // 3 phiên chạy đồng thời
  capabilities: [
    { platformName: 'Android', 'appium:automationName': 'UiAutomator2',
      'appium:udid': 'emulator-5554', 'appium:systemPort': 8201,
      'appium:app': '/builds/retail.apk' },
    { platformName: 'Android', 'appium:automationName': 'UiAutomator2',
      'appium:udid': 'emulator-5556', 'appium:systemPort': 8202,
      'appium:app': '/builds/retail.apk' },
    { platformName: 'iOS', 'appium:automationName': 'XCUITest',
      'appium:udid': '00008110-0011', 'appium:wdaLocalPort': 8101,
      'appium:app': '/builds/retail.ipa' },
  ],
};`),
      TIP(
        "Sinh cổng theo chỉ số shard hoặc theo biến môi trường để không bao giờ đụng nhau. Một hàm nhỏ tạo cổng từ chỉ số worker sẽ tiết kiệm nhiều giờ gỡ lỗi tranh chấp.",
        "Generate ports by shard index or from an environment variable so they never collide. A small function producing a port from the worker index saves many hours debugging contention.",
        "ポートはシャードのインデックスや環境変数から生成し、決して衝突しないようにします。ワーカーのインデックスからポートを生成する小さな関数は競合のデバッグに何時間も節約します。"
      ),
    ],
  },
  {
    heading: { vi: "3. Device farm đám mây", en: "3. Cloud device farms", ja: "3. クラウドデバイスファーム" },
    blocks: [
      P(
        "Device farm đám mây như BrowserStack hay Sauce Labs cho bạn truy cập hàng trăm thiết bị thật và mô phỏng qua mạng, kèm video, log và khả năng chạy song song rất lớn mà không cần tự mua và bảo trì kho máy. Bạn tải bản build lên farm, nhận về một mã định danh ứng dụng, rồi trỏ capabilities tới điểm cuối của nhà cung cấp thay vì server Appium cục bộ. Phần còn lại của kịch bản gần như giữ nguyên.",
        "Cloud device farms like BrowserStack or Sauce Labs give you access to hundreds of real and simulated devices over the network, with video, logs and very large parallelism, without buying and maintaining a device fleet yourself. You upload the build to the farm, receive an app identifier, then point capabilities at the provider's endpoint instead of a local Appium server. The rest of the script stays almost unchanged.",
        "BrowserStackやSauce Labsのようなクラウドデバイスファームは、端末群を自前で購入・保守せずに、ネットワーク越しに数百の実機・シミュレータへのアクセスを提供し、動画・ログ・非常に大きな並列性を伴います。ビルドをファームにアップロードしアプリ識別子を受け取り、ローカルのAppiumサーバーの代わりにプロバイダのエンドポイントへケイパビリティを向けます。スクリプトの残りはほぼそのままです。"
      ),
      IMG(SVG_FARM, "So sánh grid cục bộ và device farm đám mây.", "Comparing a local grid and a cloud device farm.", "ローカルグリッドとクラウドデバイスファームの比較。"),
      CODE("javascript", `// Trỏ WebdriverIO tới BrowserStack thay vì server cục bộ
export const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key:  process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',
  path: '/wd/hub',
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'bs://<app-hash-sau-khi-upload>',
    'appium:deviceName': 'Samsung Galaxy S22',
    'appium:platformVersion': '12.0',
    'bstack:options': { projectName: 'Retail App', buildName: 'PR-1284' },
  }],
};`),
      P(
        "Điểm khác biệt nằm ở cách xác thực và địa chỉ điểm cuối, còn các bước tìm element và thao tác vẫn dùng cùng API WebDriver. Nhờ vậy bạn có thể phát triển cục bộ trên emulator rồi chuyển sang farm chỉ bằng cách đổi cấu hình. Với đội bán lẻ, farm đặc biệt hữu ích để phủ các dòng máy phổ biến ở từng thị trường mà đội không sở hữu vật lý.",
        "The difference lies in authentication and endpoint address, while the find-element and action steps still use the same WebDriver API. This lets you develop locally on an emulator then switch to the farm just by changing configuration. For a retail team, the farm is especially useful to cover popular device models in each market that the team does not physically own.",
        "違いは認証とエンドポイントアドレスにあり、要素検索や操作のステップは同じWebDriver APIを使います。これによりエミュレータでローカル開発してから設定を変えるだけでファームへ切り替えられます。小売チームにとってファームは、チームが物理的に所有しない各市場で人気の機種を網羅するのに特に有用です。"
      ),
      WARN(
        "Đừng nhét khoá bí mật của farm vào mã. Luôn đọc chúng từ biến môi trường hoặc kho bí mật của CI để tránh lộ thông tin đăng nhập trong lịch sử kho mã.",
        "Do not hardcode farm secret keys into code. Always read them from environment variables or the CI secret store to avoid leaking credentials in the repository history.",
        "ファームのシークレットキーをコードに直書きしないでください。認証情報をリポジトリ履歴に漏らさないよう、必ず環境変数やCIのシークレットストアから読み込みます。"
      ),
    ],
  },
  {
    heading: { vi: "4. Đồng bộ hoá và chiến lược chờ", en: "4. Synchronisation and wait strategy", ja: "4. 同期と待機戦略" },
    blocks: [
      P(
        "Đồng bộ hoá là nghệ thuật để test chờ đúng thứ nó cần trước khi thao tác. Trên mobile, thời điểm một element sẵn sàng phụ thuộc hoạt ảnh, tải dữ liệu và tốc độ thiết bị, nên chờ ngầm cố định gần như luôn sai. Chờ tường minh với điều kiện rõ ràng như hiển thị, có thể chạm hay tồn tại là cách đáng tin cậy. Đây là kỹ năng phân biệt bộ test mong manh với bộ test vững vàng.",
        "Synchronisation is the art of making a test wait for exactly what it needs before acting. On mobile, when an element becomes ready depends on animation, data loading and device speed, so a fixed implicit wait is almost always wrong. Explicit waits with clear conditions like displayed, clickable or existing are the reliable way. This is the skill that distinguishes a fragile suite from a solid one.",
        "同期とは、テストが操作前に必要なものを正確に待つ技術です。モバイルでは要素が準備できるタイミングがアニメーション・データ読み込み・端末速度に依存するため、固定の暗黙的待機はほぼ常に誤りです。表示・クリック可能・存在といった明確な条件での明示的待機が信頼できる方法です。これは脆いスイートと堅牢なスイートを分けるスキルです。"
      ),
      CODE("java", `// Java: WebDriverWait với điều kiện tường minh (Appium + Selenium)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Chờ nút thanh toán có thể chạm rồi mới bấm
WebElement pay = wait.until(
    ExpectedConditions.elementToBeClickable(
        AppiumBy.accessibilityId("checkout_pay")));
pay.click();

// Chờ màn hình thành công xuất hiện
wait.until(ExpectedConditions.presenceOfElementLocated(
    AppiumBy.accessibilityId("order_success")));`),
      P(
        "Ngoài chờ tường minh, bạn nên tránh trộn chờ ngầm và chờ tường minh vì chúng có thể cộng dồn thời gian chờ một cách khó lường. Một quy tắc thực dụng là đặt chờ ngầm bằng không rồi luôn dùng chờ tường minh cho từng bước quan trọng. Cách này khiến hành vi chờ trở nên rõ ràng và có thể suy luận, giúp gỡ lỗi nhanh khi test đỏ.",
        "Beyond explicit waits, you should avoid mixing implicit and explicit waits because they can add up wait time unpredictably. A pragmatic rule is to set the implicit wait to zero and always use explicit waits for each important step. This makes wait behaviour clear and reasoned about, helping you debug quickly when a test goes red.",
        "明示的待機に加えて、暗黙的待機と明示的待機の混在は待機時間を予測不能に累積させ得るため避けるべきです。実用的なルールは暗黙的待機をゼロにし、重要なステップごとに常に明示的待機を使うことです。これにより待機の挙動が明確で推論可能になり、テストが赤くなったとき素早くデバッグできます。"
      ),
      NOTE(
        "Đừng nhầm chờ với sleep. Chờ tường minh trả về ngay khi điều kiện đúng, còn sleep luôn tiêu tốn trọn khoảng thời gian dù element đã sẵn sàng từ lâu.",
        "Do not confuse waiting with sleeping. An explicit wait returns as soon as the condition is true, while sleep always consumes the whole interval even if the element was ready long ago.",
        "待機とsleepを混同しないでください。明示的待機は条件が真になった瞬間に戻りますが、sleepは要素がとっくに準備できていても常に全区間を消費します。"
      ),
    ],
  },
  {
    heading: { vi: "5. Kiểm soát flake trên mobile", en: "5. Flake control on mobile", ja: "5. モバイルでの不安定さ制御" },
    blocks: [
      P(
        "Flake là những lần đỏ không do lỗi thật của sản phẩm mà do môi trường bất định. Trên mobile, các nguồn flake điển hình gồm hoạt ảnh chưa xong, popup xin quyền hay cập nhật hệ điều hành che element, mạng chậm gây timeout, và trạng thái sót lại từ lần chạy trước. Cách chữa gốc rễ là chờ đúng điều kiện, xử lý popup chủ động, cô lập trạng thái và chỉ dùng retry như lưới an toàn cuối cùng.",
        "Flake is red runs caused not by a real product defect but by an uncertain environment. On mobile, typical flake sources include unfinished animations, permission or OS-update popups covering elements, slow networks causing timeouts, and leftover state from a previous run. The root cure is waiting on the right condition, handling popups proactively, isolating state, and using retry only as a last safety net.",
        "不安定さ（flake）とは、実際の製品欠陥ではなく不確実な環境によって引き起こされる赤い実行です。モバイルでの典型的な発生源には、未完了のアニメーション・要素を覆う権限やOS更新のポップアップ・タイムアウトを招く遅いネットワーク・前回実行から残った状態が含まれます。根本的な治療法は正しい条件を待ち、ポップアップを積極的に処理し、状態を隔離し、リトライは最後の安全網としてのみ使うことです。"
      ),
      IMG(SVG_FLAKE, "Các nguồn flake trên mobile và cách chặn bằng chờ tường minh.", "Sources of mobile flake and how explicit waits mitigate them.", "モバイルの不安定さの発生源と、明示的待機による緩和方法。"),
      CODE("javascript", `// Retry có kiểm soát ở tầng test, không giấu lỗi thật
export const config = {
  // WebdriverIO: thử lại tối đa 1 lần cho test đánh dấu không ổn định
  specFileRetries: 1,
  specFileRetriesDelay: 5,
  // Vô hiệu hoá hoạt ảnh để giảm flake do transition
  capabilities: [{
    'appium:automationName': 'UiAutomator2',
    'appium:disableWindowAnimation': true,
  }],
};

// Xử lý popup quyền chủ động trước khi thao tác chính
async function dismissPermissionIfPresent(driver) {
  const allow = await driver.$('id:com.android.permissioncontroller:id/permission_allow_button');
  if (await allow.isExisting()) await allow.click();
}`),
      WARN(
        "Retry mù có thể che giấu lỗi thật của sản phẩm. Hãy theo dõi tỉ lệ test phải retry; nếu một test cần retry thường xuyên, đó là dấu hiệu cần sửa gốc chứ không phải chấp nhận.",
        "Blind retries can mask real product defects. Track the rate of tests that need retry; if a test frequently needs a retry, that is a signal to fix the root cause rather than accept it.",
        "盲目的なリトライは実際の製品欠陥を隠し得ます。リトライを要するテストの割合を追跡してください。あるテストが頻繁にリトライを要するなら、それは受け入れるのではなく根本原因を修正すべき兆候です。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận phủ thiết bị", en: "6. Device coverage matrix", ja: "6. 端末カバレッジマトリクス" },
    blocks: [
      P(
        "Không thể và không cần chạy mọi test trên mọi thiết bị. Ma trận phủ thiết bị là cách chọn có chủ đích tổ hợp hệ điều hành, dòng máy và độ phân giải sao cho tối đa hoá khả năng bắt lỗi với chi phí hợp lý. Đội bán lẻ thường phân tầng: một nhóm nhỏ thiết bị phổ biến chạy toàn bộ hồi quy, một nhóm rộng hơn chỉ chạy smoke, và vài thiết bị biên chạy các luồng nhạy cảm với phần cứng.",
        "You cannot and need not run every test on every device. A device coverage matrix is a way to deliberately choose combinations of OS, model and resolution to maximise defect-finding at reasonable cost. Retail teams usually tier this: a small set of popular devices runs the full regression, a wider set runs smoke only, and a few edge devices run hardware-sensitive flows.",
        "すべてのテストをすべての端末で実行することはできず、その必要もありません。端末カバレッジマトリクスは、OS・機種・解像度の組み合わせを意図的に選び、妥当なコストで欠陥発見を最大化する方法です。小売チームは通常これを階層化します：人気端末の小集合が全回帰を実行し、より広い集合はスモークのみ、いくつかのエッジ端末がハードウェアに敏感なフローを実行します。"
      ),
      UL(
        ["Tầng chính: vài dòng máy chiếm thị phần lớn, chạy toàn bộ hồi quy", "Tầng rộng: nhiều OS và độ phân giải, chỉ chạy smoke suite", "Tầng biên: máy cũ, RAM thấp, mạng yếu cho luồng nhạy cảm hiệu năng", "Cập nhật ma trận theo số liệu thiết bị thực của người dùng"],
        ["Primary tier: a few high-market-share models running full regression", "Wide tier: many OS versions and resolutions running smoke only", "Edge tier: old, low-RAM, weak-network devices for performance-sensitive flows", "Update the matrix based on real user device analytics"],
        ["主要層：市場シェアの高い数機種で全回帰を実行", "広域層：多数のOSバージョンと解像度でスモークのみ実行", "エッジ層：性能に敏感なフロー向けの旧型・低RAM・低速回線端末", "実ユーザーの端末分析に基づきマトリクスを更新"]
      ),
      SCEN(
        "Chọn ma trận cho đợt phát hành lớn",
        "Choosing a matrix for a major release",
        "Trước một đợt phát hành lớn của app bán lẻ, đội QA xem số liệu và thấy 70% người dùng dùng năm dòng máy Android tầm trung và hai đời iPhone. Họ đặt năm dòng đó cộng hai iPhone vào tầng chính chạy toàn bộ hồi quy trên farm, thêm mười cấu hình phổ biến khác chỉ chạy smoke, và giữ một máy Android cũ RAM thấp để kiểm tra luồng thanh toán khi bộ nhớ hạn chế. Nhờ phân tầng, họ phủ đủ rủi ro mà không nổ chi phí farm.",
        "Before a major release of the retail app, the QA team reviews analytics and finds 70% of users on five mid-range Android models and two iPhone generations. They put those five plus two iPhones in the primary tier running full regression on the farm, add ten other popular configs running smoke only, and keep one old low-RAM Android to test the checkout flow under memory pressure. Through tiering they cover the risk without blowing up farm cost.",
        "小売アプリの大型リリース前に、QAチームは分析を確認し、ユーザーの70%が五つの中価格帯Android機種と二世代のiPhoneを使っていると分かります。その五機種と二つのiPhoneを主要層に入れファームで全回帰を実行し、他の人気構成十個はスモークのみ、メモリ逼迫下で決済フローを試すため旧型の低RAM Androidを一台保持します。階層化によりファーム費用を膨らませずにリスクを網羅します。"
      ),
    ],
  },
  {
    heading: { vi: "7. Sharding và chia tải test", en: "7. Sharding and test distribution", ja: "7. シャーディングとテスト分散" },
    blocks: [
      P(
        "Sharding là chia bộ test thành nhiều phần chạy trên nhiều thiết bị hoặc tiến trình song song để rút ngắn tổng thời gian. Điều then chốt là các test phải độc lập với nhau, không chia sẻ trạng thái ngầm, để có thể xếp vào bất kỳ shard nào mà kết quả không đổi. Cân bằng tải giữa các shard cũng quan trọng: nếu một shard chứa toàn test dài thì nó thành nút cổ chai kéo dài cả đợt chạy.",
        "Sharding is splitting the suite into parts that run on multiple devices or parallel processes to shorten total time. The key is that tests must be independent of each other, sharing no hidden state, so they can be placed into any shard without changing the result. Balancing load across shards also matters: if one shard holds all the long tests it becomes a bottleneck stretching the whole run.",
        "シャーディングとは、総時間を短縮するためスイートを複数の端末や並列プロセスで動く部分に分割することです。鍵はテストが互いに独立し隠れた状態を共有しないことで、どのシャードに置いても結果が変わらないようにします。シャード間の負荷分散も重要です：あるシャードが長いテストばかりを抱えると全体の実行を引き延ばすボトルネックになります。"
      ),
      CODE("bash", `# Chia test thành N shard trong CI (ví dụ mẫu, cú pháp tuỳ runner)
# Mỗi job CI chạy một shard trên một thiết bị farm khác nhau
npx wdio run wdio.conf.js --shard=1/4    # job 1
npx wdio run wdio.conf.js --shard=2/4    # job 2
npx wdio run wdio.conf.js --shard=3/4    # job 3
npx wdio run wdio.conf.js --shard=4/4    # job 4

# Gộp báo cáo JUnit từ mọi shard để có bức tranh tổng thể
npx junit-merge -d ./reports -o ./reports/merged.xml`),
      P(
        "Sau khi các shard chạy xong, bạn gộp báo cáo lại thành một tệp tổng để nhìn thấy toàn bộ kết quả ở một chỗ. Định dạng JUnit XML được đa số hệ CI hiểu, còn công cụ như Allure cho báo cáo trực quan hơn với ảnh chụp và bước chạy. Việc gộp báo cáo là mảnh ghép quan trọng vì không có nó thì kết quả nằm rải rác trên nhiều job và rất khó đọc.",
        "After shards finish, you merge reports into a single aggregate file to see all results in one place. The JUnit XML format is understood by most CI systems, while tools like Allure give a more visual report with screenshots and steps. Merging reports is an important piece because without it results are scattered across many jobs and very hard to read.",
        "シャードが終わると、レポートを一つの集約ファイルにマージして全結果を一箇所で見ます。JUnit XML形式はほとんどのCIシステムが理解し、Allureのようなツールはスクリーンショットやステップ付きのより視覚的なレポートを提供します。レポートのマージは重要な要素です。それがないと結果が多数のジョブに散らばり非常に読みにくいためです。"
      ),
      TIP(
        "Sắp shard theo thời gian chạy lịch sử thay vì theo số lượng test. Cân bằng theo thời gian giúp mọi shard kết thúc gần cùng lúc, tận dụng tối đa số máy song song.",
        "Distribute shards by historical run time rather than by test count. Balancing by time makes all shards finish at nearly the same moment, maximising use of the parallel devices.",
        "シャードはテスト数ではなく過去の実行時間で分配してください。時間で均衡させるとすべてのシャードがほぼ同時に終わり、並列端末の利用を最大化します。"
      ),
    ],
  },
  {
    heading: { vi: "8. Tích hợp CI", en: "8. CI integration", ja: "8. CI統合" },
    blocks: [
      P(
        "Tích hợp vào CI biến bộ test Appium thành cổng chất lượng tự động chạy mỗi khi có thay đổi mã. Pipeline điển hình gồm các bước: xây dựng bản build APK hoặc IPA, tải lên device farm để nhận mã ứng dụng, chạy các shard song song trên farm, gộp báo cáo, rồi đặt cổng chặn merge nếu smoke suite trên máy thật thất bại. Nhờ vậy lỗi hồi quy trên mobile được bắt sớm, trước khi tới tay người dùng.",
        "CI integration turns the Appium suite into a quality gate that runs automatically on every code change. A typical pipeline has these steps: build the APK or IPA, upload to the device farm to get an app identifier, run shards in parallel on the farm, merge reports, then set a gate that blocks merge if the real-device smoke suite fails. This way mobile regressions are caught early, before reaching users.",
        "CI統合はAppiumスイートを、コード変更のたびに自動実行される品質ゲートに変えます。典型的なパイプラインは次のステップを持ちます：APKまたはIPAをビルドし、デバイスファームにアップロードしてアプリ識別子を取得し、ファームでシャードを並列実行し、レポートをマージし、実機スモークスイートが失敗したらマージをブロックするゲートを設定します。これによりモバイルの回帰がユーザーに届く前に早期に捕まります。"
      ),
      IMG(SVG_CI, "Pipeline CI: build → upload farm → chạy shard → gộp báo cáo → gate.", "CI pipeline: build → upload farm → run shards → merge reports → gate.", "CIパイプライン：ビルド→ファームアップロード→シャード実行→レポートマージ→ゲート。"),
      CODE("yaml", `# GitHub Actions: chạy Appium trên farm khi mở pull request
name: mobile-e2e
on: [pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - name: Run shard on farm
        env:
          BROWSERSTACK_USERNAME: \${{ secrets.BS_USER }}
          BROWSERSTACK_ACCESS_KEY: \${{ secrets.BS_KEY }}
        run: npx wdio run wdio.conf.js --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        with: { name: report-\${{ matrix.shard }}, path: reports/ }`),
      NOTE(
        "Tách suite thành smoke nhanh chạy mỗi pull request và regression đầy đủ chạy theo lịch hoặc trước phát hành. Không nên bắt mọi pull request chờ toàn bộ hồi quy dài trên farm.",
        "Split the suite into a fast smoke run on every pull request and a full regression run on a schedule or before release. Do not make every pull request wait for the entire long regression on the farm.",
        "スイートを、すべてのプルリクエストで走る高速スモークと、スケジュールまたはリリース前に走る完全回帰に分けてください。すべてのプルリクエストにファーム上の長い回帰全体を待たせるべきではありません。"
      ),
    ],
  },
  {
    heading: { vi: "9. Quản lý dữ liệu và trạng thái", en: "9. Data and state management", ja: "9. データと状態の管理" },
    blocks: [
      P(
        "Khi chạy song song trên nhiều thiết bị, việc nhiều test cùng dùng chung một tài khoản hay giỏ hàng sẽ gây xung đột và đỏ ngẫu nhiên. Nguyên tắc là mỗi phiên test nên có dữ liệu riêng, tốt nhất được tạo mới qua API trước khi chạy và dọn sạch sau khi xong. Cách này giữ cho các test độc lập thật sự, điều kiện tiên quyết để sharding và chạy song song hoạt động đúng.",
        "When running in parallel across many devices, multiple tests sharing one account or cart causes conflicts and random reds. The principle is that each test session should have its own data, ideally freshly created via API before the run and cleaned up afterward. This keeps tests genuinely independent, a prerequisite for sharding and parallel execution to work correctly.",
        "多数の端末で並列実行するとき、複数のテストが一つのアカウントやカートを共有すると競合とランダムな赤を招きます。原則は各テストセッションが独自のデータを持つことで、理想的には実行前にAPIで新規作成し実行後にクリーンアップします。これによりテストが真に独立し、シャーディングと並列実行が正しく機能する前提条件になります。"
      ),
      CODE("javascript", `// Tạo dữ liệu qua API trước test, dọn sau test — mỗi phiên riêng biệt
beforeEach(async () => {
  testUser = await api.createUser({ tier: 'retail', balance: 100 });
  // đăng nhập bằng deep link để bỏ qua UI login, tiết kiệm thời gian
  await driver.execute('mobile: deepLink', {
    url: \`retailapp://login?token=\${testUser.token}\`,
    package: 'com.retail.app',
  });
});

afterEach(async () => {
  await api.deleteUser(testUser.id);   // dọn dữ liệu, tránh rác tích tụ
  await driver.deleteSession();
});`),
      P(
        "Một mẹo tăng tốc và tăng ổn định là dùng deep link hoặc API để đưa ứng dụng thẳng vào trạng thái cần kiểm thử, thay vì bấm qua toàn bộ giao diện mỗi lần. Ví dụ, thay vì đăng nhập qua màn hình mỗi test, bạn tạo phiên bằng token rồi mở deep link tới màn hình đích. Cách này vừa nhanh hơn, vừa giảm điểm hỏng do phải đi qua nhiều màn hình không liên quan.",
        "A speed and stability trick is to use a deep link or API to put the app directly into the state under test, instead of clicking through the entire UI each time. For example, instead of logging in through the screen every test, you create a session with a token then open a deep link to the target screen. This is both faster and reduces failure points from traversing many unrelated screens.",
        "速度と安定性を高めるコツは、毎回UI全体をクリックする代わりに、ディープリンクやAPIでアプリをテスト対象の状態に直接置くことです。例えば、テストごとに画面からログインする代わりにトークンでセッションを作り、目的画面へのディープリンクを開きます。これは高速であり、無関係な多数の画面を辿ることによる失敗点も減らします。"
      ),
      TIP(
        "Coi việc chuẩn bị trạng thái qua API là một phần của kiến trúc test, không phải mẹo vặt. Nó là đòn bẩy lớn nhất để bộ test mobile vừa nhanh vừa ổn định khi mở rộng.",
        "Treat API-based state setup as part of the test architecture, not a hack. It is the biggest lever for a mobile suite to be both fast and stable as it scales.",
        "API経由の状態セットアップを小技ではなくテストアーキテクチャの一部とみなしてください。それはモバイルスイートがスケール時に高速かつ安定であるための最大のレバーです。"
      ),
    ],
  },
  {
    heading: { vi: "10. Chẩn đoán và gỡ lỗi khi scale", en: "10. Diagnostics and debugging at scale", ja: "10. スケール時の診断とデバッグ" },
    blocks: [
      P(
        "Khi chạy hàng trăm test trên nhiều thiết bị, một test đỏ không thể tái hiện dễ dàng bằng cách chạy tay như trên máy bàn. Vì thế thu thập bằng chứng tự động là bắt buộc: ảnh chụp màn hình tại thời điểm hỏng, cây giao diện dạng nguồn trang, log thiết bị và video nếu farm hỗ trợ. Những dữ liệu này biến một lần đỏ mơ hồ thành một manh mối cụ thể để truy nguyên nguyên nhân.",
        "When running hundreds of tests across many devices, a red test cannot be easily reproduced by hand-running as on a desktop. So automatic evidence capture is mandatory: a screenshot at the moment of failure, the UI tree as page source, device logs and video if the farm supports it. This data turns a vague red into a concrete clue to trace the cause.",
        "多数の端末で数百のテストを実行するとき、赤いテストはデスクトップのように手動実行で簡単には再現できません。よって自動的な証拠収集が必須です：失敗の瞬間のスクリーンショット・ページソースとしてのUIツリー・端末ログ・ファームが対応していれば動画です。このデータは曖昧な赤を原因を追跡する具体的な手がかりに変えます。"
      ),
      CODE("javascript", `// Hook chụp bằng chứng khi một test thất bại (WebdriverIO)
afterTest: async function (test, ctx, { passed }) {
  if (!passed) {
    // ảnh chụp màn hình tại thời điểm hỏng
    await driver.saveScreenshot(\`./artifacts/\${test.title}.png\`);
    // cây giao diện để soi locator sai
    const src = await driver.getPageSource();
    require('fs').writeFileSync(\`./artifacts/\${test.title}.xml\`, src);
    // log thiết bị Android
    const logs = await driver.getLogs('logcat');
    require('fs').writeFileSync(\`./artifacts/\${test.title}.log\`,
      logs.map(l => l.message).join('\\n'));
  }
},`),
      P(
        "Một thói quen quý là gắn thẻ mỗi lần chạy bằng thông tin bối cảnh: tên thiết bị, phiên bản OS, mã build và số shard. Khi một lỗi chỉ xuất hiện trên một cấu hình cụ thể, các thẻ này giúp bạn khoanh vùng nhanh xem đó là lỗi sản phẩm thật hay chỉ là đặc thù của một dòng máy. Không có bối cảnh, việc gỡ lỗi ở quy mô lớn giống như mò kim đáy bể.",
        "A valuable habit is tagging each run with context: device name, OS version, build number and shard index. When a failure appears only on a specific configuration, these tags help you quickly narrow down whether it is a real product defect or a quirk of one device model. Without context, debugging at scale is like finding a needle in a haystack.",
        "貴重な習慣は各実行にコンテキストのタグを付けることです：端末名・OSバージョン・ビルド番号・シャード番号です。失敗が特定の構成でのみ現れるとき、これらのタグは実際の製品欠陥か一機種の癖かを素早く絞り込むのに役立ちます。コンテキストがないと、大規模なデバッグは干し草の中の針探しのようになります。"
      ),
      WARN(
        "Đừng để artifact chồng chất vô hạn. Đặt chính sách dọn dẹp và chỉ giữ bằng chứng của các lần đỏ trong khoảng thời gian hợp lý, kẻo kho lưu trữ phình to và tốn kém.",
        "Do not let artifacts pile up indefinitely. Set a cleanup policy and keep evidence only for red runs within a reasonable window, or storage balloons and becomes costly.",
        "アーティファクトを無限に溜めないでください。クリーンアップ方針を設け、赤い実行の証拠のみを妥当な期間だけ保持しないと、ストレージが膨張し高コストになります。"
      ),
    ],
  },
  {
    heading: { vi: "11. Hỏi đáp phỏng vấn nâng cao", en: "11. Advanced interview Q&A", ja: "11. 応用面接の質疑応答" },
    blocks: [
      QA(
        "Làm sao chạy song song nhiều thiết bị mà không xung đột tài nguyên?",
        "How do you run many devices in parallel without resource conflicts?",
        "Mỗi phiên gắn với một udid riêng và có cổng nội bộ riêng: systemPort cho UiAutomator2 trên Android, wdaLocalPort cho WebDriverAgent trên iOS. Nên sinh cổng theo chỉ số worker để không đụng nhau. Ngoài ra dữ liệu test phải độc lập giữa các phiên để tránh xung đột trạng thái.",
        "Each session binds to its own udid and has its own internal port: systemPort for UiAutomator2 on Android, wdaLocalPort for WebDriverAgent on iOS. Generate ports by worker index so they do not collide. Additionally, test data must be independent across sessions to avoid state conflicts.",
        "各セッションは独自のudidに結びつき独自の内部ポートを持ちます：AndroidのUiAutomator2にはsystemPort、iOSのWebDriverAgentにはwdaLocalPortです。ポートはワーカーのインデックスで生成し衝突しないようにします。さらにテストデータはセッション間で独立し状態の競合を避ける必要があります。"
      ),
      QA(
        "Khi nào dùng device farm đám mây thay vì grid cục bộ?",
        "When do you use a cloud device farm instead of a local grid?",
        "Khi cần độ phủ thiết bị rộng vượt quá số máy mình sở hữu, cần chạy song song lớn, hoặc cần các dòng máy và OS ở thị trường mà đội không có vật lý. Grid cục bộ rẻ và nhanh cho vòng lặp phát triển; farm đám mây phù hợp cho hồi quy phủ rộng trước phát hành, đổi lại tốn phí và phụ thuộc mạng.",
        "When you need device coverage beyond the machines you own, need large parallelism, or need device models and OSes from a market the team does not physically have. A local grid is cheap and fast for development loops; a cloud farm suits broad-coverage regression before release, at the cost of fees and network dependence.",
        "自分が所有するマシンを超える端末網羅が必要なとき、大きな並列性が必要なとき、またはチームが物理的に持たない市場の機種やOSが必要なときです。ローカルグリッドは開発ループには安く速く、クラウドファームはリリース前の広範囲な回帰に向きますが、費用とネットワーク依存という代償があります。"
      ),
      QA(
        "Phân biệt flake với lỗi sản phẩm thật như thế nào?",
        "How do you distinguish flake from a real product defect?",
        "Chạy lại có kiểm soát và xem lỗi có tái hiện ổn định không; đọc bằng chứng thu thập như ảnh chụp, page source và log. Nếu lỗi chỉ xuất hiện ngẫu nhiên, biến mất khi thêm chờ tường minh hay xử lý popup, thì là flake. Nếu tái hiện đều trên cùng bước với cùng dữ liệu thì nhiều khả năng là lỗi sản phẩm thật cần báo cho đội phát triển.",
        "Rerun in a controlled way and see if the failure reproduces stably; read collected evidence like screenshots, page source and logs. If the failure appears only randomly and disappears when you add explicit waits or handle popups, it is flake. If it reproduces consistently at the same step with the same data, it is likely a real product defect to report to the dev team.",
        "制御された方法で再実行し失敗が安定して再現するか確認し、スクリーンショット・ページソース・ログといった収集した証拠を読みます。失敗がランダムにのみ現れ、明示的待機の追加やポップアップ処理で消えるならflakeです。同じデータで同じステップで一貫して再現するなら、開発チームに報告すべき実際の製品欠陥である可能性が高いです。"
      ),
      QA(
        "Chiến lược chờ nào an toàn nhất trên mobile và vì sao?",
        "Which wait strategy is safest on mobile and why?",
        "Chờ tường minh với điều kiện rõ ràng như element hiển thị hay có thể chạm, kết hợp đặt chờ ngầm bằng không để tránh cộng dồn khó lường. Sleep cố định luôn sai vì thời điểm sẵn sàng phụ thuộc hoạt ảnh, mạng và tốc độ thiết bị. Chờ tường minh trả về ngay khi điều kiện đúng nên vừa nhanh vừa ổn định.",
        "Explicit waits with clear conditions like element displayed or clickable, combined with setting the implicit wait to zero to avoid unpredictable stacking. Fixed sleep is always wrong because readiness depends on animation, network and device speed. An explicit wait returns as soon as the condition is true, so it is both fast and stable.",
        "要素の表示やクリック可能といった明確な条件での明示的待機と、予測不能な累積を避けるため暗黙的待機をゼロに設定する組み合わせです。固定sleepは準備完了のタイミングがアニメーション・ネットワーク・端末速度に依存するため常に誤りです。明示的待機は条件が真になった瞬間に戻るため高速かつ安定です。"
      ),
    ],
  },
  {
    heading: { vi: "12. Kịch bản thực chiến bán lẻ", en: "12. Real retail scenario", ja: "12. 小売の実戦シナリオ" },
    blocks: [
      P(
        "Đội QA của một chuỗi bán lẻ cần đảm bảo luồng thanh toán hoạt động trên toàn ma trận thiết bị trước ngày khuyến mãi lớn. Họ dựng một pipeline chạy smoke suite thanh toán trên farm cho ba mươi cấu hình thiết bị mỗi đêm, chia thành tám shard song song, chuẩn bị dữ liệu qua API cho từng phiên, và gộp báo cáo về một bảng điều khiển. Bất kỳ cấu hình nào đỏ đều tạo cảnh báo kèm ảnh chụp và log để đội xem ngay sáng hôm sau.",
        "The QA team of a retail chain needs to ensure the checkout flow works across the whole device matrix before a big sale day. They build a pipeline that runs the checkout smoke suite on the farm for thirty device configurations every night, split into eight parallel shards, prepare data via API for each session, and merge reports into one dashboard. Any red configuration raises an alert with a screenshot and logs for the team to review the next morning.",
        "小売チェーンのQAチームは、大型セール日の前に決済フローが端末マトリクス全体で動くことを保証する必要があります。彼らは毎晩ファームで三十の端末構成に対し決済スモークスイートを実行し、八つの並列シャードに分割し、各セッションのデータをAPIで準備し、レポートを一つのダッシュボードにマージするパイプラインを構築します。赤い構成はスクリーンショットとログ付きのアラートを発し、翌朝チームが確認します。"
      ),
      CODE("javascript", `// Smoke thanh toán, chạy trên mọi cấu hình trong ma trận
describe('Checkout smoke @critical', () => {
  it('mua một sản phẩm và thanh toán thành công', async () => {
    // trạng thái chuẩn bị sẵn qua API + deep link (mục 9)
    const search = await driver.$('~search_input');
    await search.waitForDisplayed({ timeout: 10000 });
    await search.setValue('áo thun');

    const first = await driver.$('~product_item_0');
    await first.waitForDisplayed({ timeout: 8000 });
    await first.click();

    await (await driver.$('~add_to_cart')).click();
    await (await driver.$('~go_to_cart')).click();

    const pay = await driver.$('~checkout_pay');
    await pay.waitForEnabled({ timeout: 8000 });
    await pay.click();

    const ok = await driver.$('~order_success');
    await ok.waitForDisplayed({ timeout: 15000 });
    expect(await ok.isDisplayed()).toBe(true);
  });
});`),
      P(
        "Kịch bản này gói gọn mọi kỹ thuật của bài: locator ổn định, chờ tường minh cho từng bước, dữ liệu chuẩn bị qua API để độc lập, và được thiết kế để chạy song song trên nhiều thiết bị của farm. Gắn thẻ critical giúp CI chọn đúng nhóm test smoke cần chạy trên mọi pull request, còn toàn bộ hồi quy chạy theo lịch đêm. Đó là cách một luồng nghiệp vụ quan trọng được bảo vệ liên tục ở quy mô lớn.",
        "This scenario wraps up every technique of the article: stable locators, explicit waits for each step, data prepared via API for independence, and designed to run in parallel across many farm devices. The critical tag lets CI pick the right smoke group to run on every pull request, while the full regression runs on the nightly schedule. That is how an important business flow is continuously protected at scale.",
        "このシナリオは記事のあらゆる技術を包み込みます：安定したロケータ・各ステップの明示的待機・独立のためにAPIで準備したデータ、そして多数のファーム端末で並列実行するよう設計されています。criticalタグによりCIはすべてのプルリクエストで走らせるべき正しいスモークグループを選び、完全回帰は毎晩のスケジュールで走ります。それが重要な業務フローが大規模に継続的に守られる方法です。"
      ),
      TIP(
        "Bắt đầu nhỏ với một smoke suite critical chạy ổn định trên farm rồi mới mở rộng ma trận. Một bộ smoke đáng tin cậy có giá trị hơn nhiều một bộ hồi quy khổng lồ mà không ai tin kết quả.",
        "Start small with a critical smoke suite running stably on the farm before expanding the matrix. A trustworthy smoke set is far more valuable than a huge regression set whose results nobody trusts.",
        "マトリクスを広げる前に、ファームで安定して動くcriticalスモークスイートから小さく始めてください。信頼できるスモークセットは、結果を誰も信じない巨大な回帰セットよりはるかに価値があります。"
      ),
    ],
  },
  {
    heading: { vi: "13. Tổng kết và checklist mở rộng", en: "13. Summary and scaling checklist", ja: "13. まとめとスケーリングチェックリスト" },
    blocks: [
      P(
        "Mở rộng kiểm thử mobile là bài toán của cả tốc độ lẫn độ tin cậy. Chạy song song với cổng và udid riêng rút ngắn thời gian; device farm đám mây mở rộng độ phủ; đồng bộ hoá tường minh và kiểm soát flake giữ cho kết quả đáng tin; ma trận phủ có chủ đích cân bằng rủi ro với chi phí; và tích hợp CI biến tất cả thành cổng chất lượng tự động. Ổn định luôn phải đi trước tốc độ, nếu không việc scale chỉ nhân thêm nhiễu.",
        "Scaling mobile testing is a problem of both speed and reliability. Parallel execution with separate ports and udids shortens time; cloud device farms expand coverage; explicit synchronisation and flake control keep results trustworthy; a deliberate coverage matrix balances risk against cost; and CI integration turns it all into an automatic quality gate. Stability must always come before speed, otherwise scaling only multiplies noise.",
        "モバイルテストのスケーリングは速度と信頼性の両方の問題です。個別のポートとudidでの並列実行は時間を短縮し、クラウドデバイスファームは網羅範囲を広げ、明示的な同期と不安定さの制御は結果を信頼できるものに保ち、意図的なカバレッジマトリクスはリスクとコストを均衡させ、CI統合はそのすべてを自動的な品質ゲートに変えます。安定性は常に速度に先立つべきで、さもなければスケーリングはノイズを増やすだけです。"
      ),
      UL(
        ["Mỗi phiên song song có udid và cổng nội bộ riêng, không tranh chấp", "Dùng farm đám mây cho độ phủ rộng; khoá bí mật đọc từ môi trường", "Chờ tường minh cho mọi bước; đặt chờ ngầm bằng không", "Chữa flake tận gốc trước, retry chỉ là lưới an toàn cuối", "Ma trận phủ phân tầng theo số liệu người dùng thật", "Dữ liệu test độc lập, chuẩn bị qua API; thu artifact khi đỏ", "CI tách smoke nhanh cho pull request và hồi quy đầy đủ theo lịch"],
        ["Each parallel session has its own udid and internal port, no contention", "Use a cloud farm for broad coverage; read secret keys from the environment", "Explicit waits for every step; set implicit wait to zero", "Fix flake at the root first, retry is only a last safety net", "Tier the coverage matrix by real user analytics", "Independent test data prepared via API; capture artifacts on red", "CI splits fast smoke for pull requests and full regression on a schedule"],
        ["各並列セッションは独自のudidと内部ポートを持ち競合しない", "広範囲な網羅にクラウドファームを使い、シークレットキーは環境から読む", "すべてのステップに明示的待機；暗黙的待機はゼロに設定", "不安定さはまず根本から修正し、リトライは最後の安全網のみ", "カバレッジマトリクスを実ユーザー分析で階層化", "独立したテストデータをAPIで準備；赤のときアーティファクトを収集", "CIはプルリクエスト用の高速スモークとスケジュールでの完全回帰を分ける"]
      ),
      NOTE(
        "Đo lường để cải tiến: theo dõi thời gian chạy tổng, tỉ lệ test phải retry và tỉ lệ đỏ theo cấu hình. Chính những con số này chỉ ra nên đầu tư vào đâu tiếp theo để bộ test mobile vừa nhanh vừa đáng tin.",
        "Measure to improve: track total run time, the retry rate and the red rate by configuration. These numbers show where to invest next so the mobile suite is both fast and trustworthy.",
        "改善のために測定してください：総実行時間・リトライ率・構成別の赤率を追跡します。これらの数値が、モバイルスイートが高速かつ信頼できるものになるよう次にどこへ投資すべきかを示します。"
      ),
    ],
  },
];

// ===========================================================================
// EXPORT
// ===========================================================================
export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-appium-mobile-foundation",
    cover: makeThumb({ id: "atapp1", domain: "telecom", kind: "congnghe", label: "APPIUM · MOBILE" }),
    tags: tags("congnghe", "appium", "foundation"),
    title: {
      vi: "Appium nền tảng: kiến trúc, cài đặt & test mobile đầu tiên",
      en: "Appium foundations: architecture, setup & your first mobile test",
      ja: "Appium基礎：構成・セットアップ・最初のモバイルテスト",
    },
    summary: {
      vi: "Nắm kiến trúc client-server-driver của Appium 2, cài đặt driver UiAutomator2/XCUITest, khai báo capabilities W3C, chạy test đầu tiên trên emulator và máy thật, chọn locator ổn định và tạo cử chỉ qua W3C Actions cho ứng dụng viễn thông.",
      en: "Master Appium 2's client-server-driver architecture, install UiAutomator2/XCUITest drivers, declare W3C capabilities, run your first test on emulator and real device, choose stable locators and craft gestures via W3C Actions for a telecom app.",
      ja: "Appium 2のクライアント・サーバー・ドライバー構成を習得し、UiAutomator2／XCUITestドライバーをインストールし、W3Cケイパビリティを宣言し、エミュレータと実機で最初のテストを実行し、安定したロケータを選び、通信アプリ向けにW3C Actionsでジェスチャーを作ります。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-appium-device-farm-parallel",
    cover: makeThumb({ id: "atapp2", domain: "retail", kind: "nangcao", label: "APPIUM · SCALE" }),
    tags: tags("nangcao", "appium", "cicd", "advanced"),
    title: {
      vi: "Scale kiểm thử mobile: chạy song song, device farm & CI",
      en: "Scaling mobile testing: parallel execution, device farms & CI",
      ja: "モバイルテストのスケーリング：並列実行・デバイスファーム・CI",
    },
    summary: {
      vi: "Đưa Appium lên quy mô sản xuất cho ứng dụng bán lẻ: chạy song song nhiều thiết bị, dùng device farm đám mây, kiểm soát flake, đồng bộ hoá bằng chờ tường minh, sharding, ma trận phủ thiết bị và tích hợp CI thành cổng chất lượng.",
      en: "Take Appium to production scale for a retail app: parallel execution across devices, cloud device farms, flake control, synchronisation with explicit waits, sharding, a device coverage matrix and CI integration as a quality gate.",
      ja: "小売アプリ向けにAppiumを本番規模へ：複数端末の並列実行・クラウドデバイスファーム・不安定さの制御・明示的待機による同期・シャーディング・端末カバレッジマトリクス・品質ゲートとしてのCI統合。",
    },
    pages: buildDoc(pages2),
  },
];
