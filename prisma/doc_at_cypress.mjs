// ============================================================================
// doc_at_cypress.mjs — 3 bài SÂU về Cypress (trilingual VI/EN/JA, JA thật ≠ EN).
// 1) at-cypress-e2e-spa      — Cypress cho SPA hiện đại (auto-wait, retry-ability).
// 2) at-cypress-network-intercept — cy.intercept & điều khiển network (stub/spy/fixtures).
// 3) at-cypress-component-ci — Component testing + CI song song (cy.session, Cypress Cloud).
// Block types khớp ArticleViewer. Chạy verify.mjs để kiểm cổng chất lượng.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// SVG helpers (hand-drawn, dark bg #0f172a, light text)
// ---------------------------------------------------------------------------
const SVG_ARCH = `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="240" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Cypress chạy BÊN TRONG trình duyệt (cùng vòng lặp sự kiện với app)</text>
<rect x="40" y="60" width="300" height="150" rx="12" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="190" y="85" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">BROWSER (Electron/Chrome)</text>
<rect x="60" y="100" width="120" height="44" rx="8" fill="#134e4a" stroke="#2dd4bf"/>
<text x="120" y="127" text-anchor="middle" font-size="12" fill="#ccfbf1">App SPA</text>
<rect x="200" y="100" width="120" height="44" rx="8" fill="#3730a3" stroke="#818cf8"/>
<text x="260" y="127" text-anchor="middle" font-size="12" fill="#e0e7ff">Test code</text>
<rect x="60" y="156" width="260" height="40" rx="8" fill="#111827" stroke="#334155"/>
<text x="190" y="181" text-anchor="middle" font-size="11" fill="#cbd5e1">DOM · fetch/XHR · storage — truy cập trực tiếp</text>
<rect x="420" y="80" width="260" height="110" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
<text x="550" y="105" text-anchor="middle" font-size="13" font-weight="800" fill="#f1f5f9">Node process</text>
<text x="550" y="130" text-anchor="middle" font-size="11" fill="#94a3b8">cypress run · plugins · task()</text>
<text x="550" y="152" text-anchor="middle" font-size="11" fill="#94a3b8">đọc file · seed DB · report</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a1)"><path d="M340 135 h80"/></g>
<defs><marker id="a1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_RETRY = `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="240" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Retry-ability: lệnh + assertion cuối được thử lại tới khi PASS hoặc hết timeout</text>
<rect x="40" y="60" width="200" height="120" rx="10" fill="#0c4a6e" stroke="#38bdf8"/>
<text x="140" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">cy.get('.cart')</text>
<text x="140" y="120" text-anchor="middle" font-size="11" fill="#7dd3fc">query lại DOM</text>
<text x="140" y="145" text-anchor="middle" font-size="11" fill="#7dd3fc">mỗi ~50ms</text>
<rect x="280" y="60" width="200" height="120" rx="10" fill="#134e4a" stroke="#2dd4bf"/>
<text x="380" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">.should('be.visible')</text>
<text x="380" y="120" text-anchor="middle" font-size="11" fill="#5eead4">kiểm điều kiện</text>
<text x="380" y="145" text-anchor="middle" font-size="11" fill="#5eead4">FAIL → thử lại</text>
<rect x="520" y="60" width="160" height="120" rx="10" fill="#052e16" stroke="#34d399"/>
<text x="600" y="100" text-anchor="middle" font-size="13" font-weight="800" fill="#bbf7d0">PASS ✓</text>
<text x="600" y="130" text-anchor="middle" font-size="11" fill="#86efac">không cần sleep</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a2)"><path d="M240 120 h40"/><path d="M480 120 h40"/></g>
<path d="M380 180 q -120 40 -240 -40" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a2)"/>
<text x="230" y="225" text-anchor="middle" font-size="11" font-weight="700" fill="#fbbf24">vòng retry mặc định 4s (defaultCommandTimeout)</text>
<defs><marker id="a2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_INTERCEPT = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">cy.intercept — chặn & điều khiển tầng network của app</text>
<rect x="40" y="60" width="150" height="70" rx="10" fill="#3730a3" stroke="#818cf8"/>
<text x="115" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">App gọi</text>
<text x="115" y="112" text-anchor="middle" font-size="11" fill="#a5b4fc">GET /api/products</text>
<rect x="285" y="45" width="170" height="100" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="370" y="72" text-anchor="middle" font-size="13" font-weight="800" fill="#fed7aa">cy.intercept()</text>
<text x="370" y="96" text-anchor="middle" font-size="11" fill="#fdba74">match route → stub/spy</text>
<text x="370" y="116" text-anchor="middle" font-size="11" fill="#fdba74">gắn alias '@list'</text>
<rect x="540" y="45" width="150" height="46" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="615" y="74" text-anchor="middle" font-size="11" fill="#bbf7d0">fixtures/list.json</text>
<rect x="540" y="100" width="150" height="46" rx="8" fill="#450a0a" stroke="#f87171"/>
<text x="615" y="129" text-anchor="middle" font-size="11" fill="#fecaca">forceNetworkError / 500</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a3)"><path d="M190 95 h95"/><path d="M455 80 h85"/><path d="M455 118 h85"/></g>
<rect x="40" y="175" width="640" height="60" rx="10" fill="#111827" stroke="#334155"/>
<text x="360" y="200" text-anchor="middle" font-size="12" fill="#cbd5e1">cy.wait('@list') → chặn tới khi request xảy ra, trả về đối tượng interception (req/res)</text>
<text x="360" y="222" text-anchor="middle" font-size="11" fill="#94a3b8">Test được: loading · empty · error · phân trang — không cần backend thật</text>
<defs><marker id="a3" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_STATES = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bốn trạng thái mọi màn hình dữ liệu phải phủ</text>
<rect x="30" y="55" width="155" height="120" rx="10" fill="#7c2d12" stroke="#fb923c"/>
<text x="107" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#fed7aa">LOADING</text>
<circle cx="107" cy="120" r="18" fill="none" stroke="#fdba74" stroke-width="4" stroke-dasharray="60 30"/>
<text x="107" y="160" text-anchor="middle" font-size="10" fill="#fdba74">delay → spinner</text>
<rect x="200" y="55" width="155" height="120" rx="10" fill="#1e293b" stroke="#94a3b8"/>
<text x="277" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#e2e8f0">EMPTY</text>
<rect x="240" y="105" width="74" height="30" rx="6" fill="none" stroke="#64748b" stroke-dasharray="4 4"/>
<text x="277" y="160" text-anchor="middle" font-size="10" fill="#cbd5e1">body:[] → CTA</text>
<rect x="370" y="55" width="155" height="120" rx="10" fill="#450a0a" stroke="#f87171"/>
<text x="447" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#fecaca">ERROR</text>
<text x="447" y="128" text-anchor="middle" font-size="26" font-weight="800" fill="#f87171">500</text>
<text x="447" y="160" text-anchor="middle" font-size="10" fill="#fca5a5">statusCode → retry</text>
<rect x="540" y="55" width="150" height="120" rx="10" fill="#052e16" stroke="#34d399"/>
<text x="615" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#bbf7d0">SUCCESS</text>
<path d="M598 120 l10 10 l18 -22" stroke="#34d399" stroke-width="4" fill="none" stroke-linecap="round"/>
<text x="615" y="160" text-anchor="middle" font-size="10" fill="#86efac">fixture → render</text>
</svg>`;

const SVG_CI = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">CI song song: chia spec cho nhiều máy qua Cypress Cloud</text>
<rect x="40" y="55" width="160" height="60" rx="10" fill="#0c4a6e" stroke="#38bdf8"/>
<text x="120" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">git push</text>
<text x="120" y="102" text-anchor="middle" font-size="11" fill="#7dd3fc">CI trigger</text>
<rect x="260" y="45" width="180" height="80" rx="10" fill="#155e63" stroke="#2dd4bf" stroke-width="2"/>
<text x="350" y="72" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">Cypress Cloud</text>
<text x="350" y="94" text-anchor="middle" font-size="11" fill="#5eead4">record + load balance</text>
<text x="350" y="112" text-anchor="middle" font-size="11" fill="#5eead4">--parallel</text>
<g fill="#3730a3" stroke="#818cf8"><rect x="510" y="40" width="170" height="40" rx="8"/><rect x="510" y="90" width="170" height="40" rx="8"/><rect x="510" y="140" width="170" height="40" rx="8"/></g>
<text x="595" y="65" text-anchor="middle" font-size="11" fill="#e0e7ff">runner 1 · spec A,B</text>
<text x="595" y="115" text-anchor="middle" font-size="11" fill="#e0e7ff">runner 2 · spec C,D</text>
<text x="595" y="165" text-anchor="middle" font-size="11" fill="#e0e7ff">runner 3 · spec E,F</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a4)"><path d="M200 85 h60"/><path d="M440 85 h70 M440 90 l70 20 M440 80 l70 60"/></g>
<rect x="40" y="200" width="640" height="46" rx="10" fill="#111827" stroke="#334155"/>
<text x="360" y="228" text-anchor="middle" font-size="12" fill="#cbd5e1">Kết quả gộp: dashboard · video · screenshot · phân tích flake · Test Replay</text>
<defs><marker id="a4" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_COMP = `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="240" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Component test: mount 1 component thật trong browser, không cần cả app</text>
<rect x="40" y="60" width="200" height="140" rx="12" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="140" y="88" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">cy.mount(&lt;Btn/&gt;)</text>
<text x="140" y="115" text-anchor="middle" font-size="11" fill="#a5b4fc">props · context</text>
<text x="140" y="138" text-anchor="middle" font-size="11" fill="#a5b4fc">Vite/webpack dev</text>
<text x="140" y="161" text-anchor="middle" font-size="11" fill="#a5b4fc">render thật</text>
<rect x="290" y="60" width="180" height="140" rx="12" fill="#0c4a6e" stroke="#38bdf8"/>
<text x="380" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">cy.get + assert</text>
<text x="380" y="118" text-anchor="middle" font-size="11" fill="#7dd3fc">click · type</text>
<text x="380" y="140" text-anchor="middle" font-size="11" fill="#7dd3fc">spy onClick</text>
<text x="380" y="162" text-anchor="middle" font-size="11" fill="#7dd3fc">retry-ability y hệt e2e</text>
<rect x="520" y="60" width="160" height="140" rx="12" fill="#052e16" stroke="#34d399"/>
<text x="600" y="100" text-anchor="middle" font-size="12" font-weight="800" fill="#bbf7d0">Nhanh · cô lập</text>
<text x="600" y="130" text-anchor="middle" font-size="11" fill="#86efac">phản hồi &lt;1s</text>
<text x="600" y="152" text-anchor="middle" font-size="11" fill="#86efac">edge case dễ dựng</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#a5)"><path d="M240 130 h50"/><path d="M470 130 h50"/></g>
<defs><marker id="a5" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

// ===========================================================================
// BÀI 1 — Cypress cho SPA hiện đại (foundation)
// ===========================================================================
const pages1 = [
  {
    heading: { vi: "1. Cypress là gì và giải quyết bài toán nào", en: "1. What Cypress is and the problem it solves", ja: "1. Cypressとは何か、どんな課題を解決するか" },
    blocks: [
      P(
        "Cypress là một framework kiểm thử end-to-end (E2E) chạy trực tiếp trong trình duyệt, ra đời để giải bài toán kiểm thử ứng dụng web hiện đại một trang (SPA) như React, Vue hay Angular. Trong một hệ thống TMĐT thật, mỗi lần deploy có thể ảnh hưởng tới luồng tìm kiếm, thêm giỏ hàng và thanh toán; kiểm thử thủ công không kịp và không đáng tin. Cypress cho phép viết kịch bản mô phỏng đúng thao tác người dùng: mở trang, gõ ô tìm kiếm, bấm nút, rồi khẳng định kết quả trên giao diện. Điểm khác biệt lớn nhất so với các công cụ đời trước là Cypress chạy cùng vòng lặp sự kiện với ứng dụng, nên nó thấy mọi thứ app thấy. Nhờ đó việc chờ đợi bất đồng bộ được xử lý tự động, giảm mạnh loại lỗi 'chập chờn' vốn là ác mộng của automation.",
        "Cypress is an end-to-end (E2E) testing framework that runs directly inside the browser, created to test modern single-page web apps (SPA) built with React, Vue or Angular. In a real e-commerce system, each deploy can touch the search, add-to-cart and checkout flows; manual testing cannot keep up and is not trustworthy. Cypress lets you write scripts that mimic exactly what a user does: open a page, type into the search box, click a button, then assert the result on the UI. The biggest difference from older tools is that Cypress runs in the same event loop as the application, so it sees everything the app sees. Because of that, asynchronous waiting is handled automatically, sharply reducing the flaky failures that plague automation.",
        "Cypressは、ブラウザ内で直接動作するエンドツーエンド（E2E）テストフレームワークであり、React・Vue・Angularなどの最新のシングルページアプリ（SPA）をテストするために生まれました。実際のECシステムでは、デプロイのたびに検索・カート追加・決済のフローに影響が及ぶ可能性があり、手動テストでは追いつかず信頼もできません。Cypressを使えば、ページを開き、検索ボックスに入力し、ボタンを押し、UI上の結果を検証するという、ユーザーの操作そのものを再現するスクリプトを書けます。旧世代のツールとの最大の違いは、Cypressがアプリと同じイベントループ内で動作し、アプリが見るものをすべて見られる点です。そのため非同期の待機が自動で処理され、自動化の悩みの種であるフレーキーな失敗を大幅に減らせます。"
      ),
      IMG(SVG_ARCH, "Kiến trúc: Cypress chạy trong browser, phối hợp với tiến trình Node.", "Architecture: Cypress runs in the browser, paired with a Node process.", "アーキテクチャ: Cypressはブラウザ内で動作し、Nodeプロセスと連携します。"),
      UL(
        ["Chạy trong trình duyệt: truy cập trực tiếp DOM, fetch/XHR, storage.", "Tự động chờ (auto-wait) và thử lại (retry-ability) trước khi báo lỗi.", "Time-travel debugging: xem lại từng bước trong Test Runner.", "Chỉ hỗ trợ JavaScript/TypeScript — không đa ngôn ngữ như Selenium."],
        ["Runs in the browser: direct access to DOM, fetch/XHR, storage.", "Automatic waiting (auto-wait) and retry-ability before failing.", "Time-travel debugging: replay each step in the Test Runner.", "JavaScript/TypeScript only — not multi-language like Selenium."],
        ["ブラウザ内で動作: DOM・fetch/XHR・ストレージへ直接アクセスします。", "失敗前に自動待機とリトライ性（retry-ability）が働きます。", "タイムトラベルデバッグ: Test Runnerで各ステップを再生できます。", "JavaScript/TypeScriptのみ対応で、Seleniumのような多言語ではありません。"]
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc: vì sao chạy trong browser lại khác biệt", en: "2. Architecture: why running in-browser is different", ja: "2. アーキテクチャ: ブラウザ内動作がなぜ違うのか" },
    blocks: [
      P(
        "Hầu hết công cụ cũ như Selenium điều khiển trình duyệt từ bên ngoài qua giao thức WebDriver, gửi lệnh qua mạng và chờ phản hồi. Cypress lật ngược mô hình: mã kiểm thử được nạp thẳng vào trang cùng ứng dụng, chạy trong cùng tiến trình JavaScript. Vì thế Cypress không phải 'đoán' xem app đã sẵn sàng chưa mà có thể quan sát trực tiếp DOM và các yêu cầu mạng. Bên cạnh đó luôn tồn tại một tiến trình Node nền để làm các việc ngoài trình duyệt: đọc file, seed dữ liệu, gọi API hệ thống, và ghi báo cáo. Hai phần này giao tiếp qua cơ chế nội bộ, cho bạn cả sức mạnh trong trang lẫn khả năng chạm vào hệ điều hành khi cần.",
        "Most older tools like Selenium drive the browser from the outside via the WebDriver protocol, sending commands over the wire and awaiting responses. Cypress inverts the model: the test code is loaded straight into the page alongside the app and runs in the same JavaScript process. Therefore Cypress does not have to 'guess' whether the app is ready — it observes the DOM and network requests directly. Alongside this there is always a background Node process for out-of-browser work: reading files, seeding data, calling system APIs and writing reports. The two parts talk over an internal channel, giving you both in-page power and the ability to touch the OS when needed.",
        "Seleniumのような旧来のツールの多くは、WebDriverプロトコルを介して外部からブラウザを制御し、ネットワーク越しにコマンドを送って応答を待ちます。Cypressはこのモデルを逆転させ、テストコードをアプリと共にページへ直接読み込み、同じJavaScriptプロセス内で実行します。そのためCypressはアプリの準備完了を「推測」する必要がなく、DOMとネットワーク要求を直接観測できます。さらに、ファイル読み込み・データ投入・システムAPI呼び出し・レポート出力といったブラウザ外の作業を担うNodeプロセスが常に背後に存在します。両者は内部チャネルで通信し、ページ内での強力さとOSへのアクセス能力を両立させます。"
      ),
      NOTE(
        "Vì chạy trong browser, Cypress có giới hạn kiến trúc: khó thao tác nhiều tab, và nguyên bản không cho điều hướng nhiều domain trong một test (dù cy.origin đã nới lỏng phần này).",
        "Because it runs in the browser, Cypress has architectural limits: multi-tab is hard, and natively you cannot navigate across multiple domains in one test (though cy.origin has relaxed this).",
        "ブラウザ内で動作するため、Cypressにはアーキテクチャ上の制約があります: 複数タブの操作は難しく、本来1つのテスト内で複数ドメインへ遷移できません（cy.originで緩和されました）。"
      ),
      CODE("js", `// cypress/e2e/smoke.cy.js — bài test đầu tiên
describe('Trang chủ TMĐT', () => {
  it('hiển thị tiêu đề và ô tìm kiếm', () => {
    cy.visit('/');                       // mở app
    cy.contains('h1', 'Cửa hàng').should('be.visible');
    cy.get('[data-cy="search"]').should('exist');
  });
});`),
    ],
  },
  {
    heading: { vi: "3. Auto-wait & retry-ability — trái tim của Cypress", en: "3. Auto-wait & retry-ability — the heart of Cypress", ja: "3. 自動待機とリトライ性 — Cypressの心臓部" },
    blocks: [
      P(
        "Trong SPA, dữ liệu tới bất đồng bộ: bấm 'Thêm giỏ' xong, badge số lượng chỉ cập nhật sau khi API trả về. Với công cụ cũ bạn phải rải sleep để chờ, dẫn tới test vừa chậm vừa dễ hỏng. Cypress giải quyết bằng retry-ability: mỗi lệnh truy vấn như cy.get hay cy.contains sẽ tự động truy vấn lại DOM nhiều lần cho tới khi phần tử xuất hiện, và assertion cuối cùng cũng được thử lại tới khi đúng hoặc hết thời gian chờ mặc định (defaultCommandTimeout, thường 4 giây). Nhờ vậy bạn viết code như thể mọi thứ đồng bộ, còn Cypress lo phần chờ đợi. Đây là lý do các bài test Cypress viết đúng cách rất ít 'chập chờn'.",
        "In a SPA, data arrives asynchronously: after clicking 'Add to cart', the quantity badge updates only once the API responds. With older tools you sprinkle sleeps to wait, making tests both slow and fragile. Cypress solves this with retry-ability: each query command like cy.get or cy.contains automatically re-queries the DOM repeatedly until the element appears, and the final assertion is also retried until it passes or the default command timeout (defaultCommandTimeout, usually 4 seconds) elapses. So you write code as if everything were synchronous while Cypress handles the waiting. This is why correctly written Cypress tests are rarely flaky.",
        "SPAではデータが非同期で届きます。「カートに追加」を押しても、数量バッジはAPIの応答後にしか更新されません。旧来のツールではsleepを散りばめて待つため、テストは遅く壊れやすくなります。Cypressはリトライ性でこれを解決します。cy.getやcy.containsのようなクエリコマンドは、要素が現れるまでDOMを自動的に再クエリし、最後のアサーションも成功するか既定のコマンドタイムアウト（defaultCommandTimeout、通常4秒）まで再試行されます。つまり、すべて同期的であるかのようにコードを書けば、待機はCypressが担います。これが、正しく書かれたCypressテストがフレーキーになりにくい理由です。"
      ),
      IMG(SVG_RETRY, "Retry-ability: lệnh và assertion cuối được thử lại tới khi PASS.", "Retry-ability: command and last assertion retried until PASS.", "リトライ性: コマンドと最後のアサーションはPASSまで再試行されます。"),
      CODE("js", `// KHÔNG cần cy.wait(3000). Assertion kéo theo auto-wait.
cy.get('[data-cy="add-to-cart"]').click();
cy.get('[data-cy="cart-count"]')   // query lại tới khi thấy phần tử
  .should('have.text', '1');        // retry tới khi text = '1' (<= 4s)`),
      WARN(
        "Chỉ lệnh truy vấn (query) mới được retry. Lệnh hành động như .click(), .type() KHÔNG retry lại chính nó. Đừng gắn nhiều assertion sau một hành động rồi mong nó lặp lại hành động.",
        "Only query commands are retried. Action commands like .click() and .type() do NOT retry themselves. Do not chain many assertions after an action expecting the action to repeat.",
        "再試行されるのはクエリコマンドだけです。.click()や.type()などのアクションコマンドは自身を再試行しません。アクションの後に多くのアサーションを連ね、アクションが繰り返されると期待してはいけません。"
      ),
    ],
  },
  {
    heading: { vi: "4. Cài đặt & cấu hình cho dự án SPA", en: "4. Installation & configuration for a SPA project", ja: "4. SPAプロジェクトのインストールと設定" },
    blocks: [
      P(
        "Cài Cypress rất gọn: chỉ cần một lệnh npm và toàn bộ binary trình duyệt đi kèm được quản lý tự động. Sau khi cài, bạn mở Test Runner để tạo cấu trúc thư mục mặc định, rồi khai báo cấu hình trong cypress.config.js. Với một SPA TMĐT, baseUrl nên trỏ về server dev để mọi cy.visit('/') gọn gàng, và bạn có thể chỉnh timeout, viewport, thư mục fixtures. Cấu hình tách theo hai loại: e2e (kiểm thử toàn ứng dụng) và component (kiểm thử từng thành phần). Nên bật video/screenshot khi chạy trong CI để có bằng chứng khi lỗi.",
        "Installing Cypress is compact: a single npm command, and the bundled browser binaries are managed automatically. After installing, you open the Test Runner to scaffold the default folders, then declare configuration in cypress.config.js. For an e-commerce SPA, baseUrl should point to the dev server so every cy.visit('/') stays clean, and you can tune timeouts, viewport and the fixtures folder. Configuration splits into two kinds: e2e (whole-app testing) and component (per-component testing). Enable video/screenshots when running in CI to have evidence on failure.",
        "Cypressのインストールは簡潔で、npmコマンド1つで済み、同梱のブラウザバイナリも自動管理されます。インストール後はTest Runnerを開いて既定のフォルダを生成し、cypress.config.jsに設定を記述します。EC向けSPAでは、baseUrlを開発サーバーに向けておくとcy.visit('/')が簡潔になり、タイムアウト・ビューポート・fixturesフォルダを調整できます。設定はe2e（アプリ全体）とcomponent（コンポーネント単位）の2種類に分かれます。CI実行時は失敗時の証拠のためにビデオ/スクリーンショットを有効にしましょう。"
      ),
      CODE("bash", `npm install -D cypress
npx cypress open      # mở Test Runner (interactive)
npx cypress run       # chạy headless trong terminal / CI`),
      CODE("js", `// cypress.config.js
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 6000,       // tăng nhẹ cho SPA nặng
    viewportWidth: 1280, viewportHeight: 800,
    video: true, screenshotOnRunFailure: true,
    setupNodeEvents(on, config) { /* plugins / task() */ return config; },
  },
});`),
    ],
  },
  {
    heading: { vi: "5. Câu lệnh cy: get, contains, và cách chuỗi lệnh", en: "5. cy commands: get, contains, and chaining", ja: "5. cyコマンド: get・contains・チェーンの仕組み" },
    blocks: [
      P(
        "Cypress dùng chuỗi lệnh (chain) bắt đầu bằng cy. Lệnh cy.get chọn phần tử theo CSS selector, còn cy.contains chọn theo nội dung văn bản — rất hữu ích khi bạn muốn tìm nút theo nhãn 'Thanh toán'. Điều quan trọng cần nhớ: các lệnh cy KHÔNG trả về giá trị đồng bộ mà xếp vào hàng đợi và chạy tuần tự bất đồng bộ. Vì thế bạn không dùng biến gán trực tiếp mà nối tiếp .then() nếu cần giá trị. Để test ổn định, hãy chọn phần tử bằng thuộc tính chuyên dụng như data-cy thay vì class CSS dễ thay đổi theo thiết kế.",
        "Cypress uses command chains starting with cy. The cy.get command selects elements by CSS selector, while cy.contains selects by text content — handy when you want the button labeled 'Checkout'. A key point: cy commands do NOT return values synchronously; they enqueue and run sequentially and asynchronously. So you don't assign to a variable directly but chain .then() when you need a value. For stable tests, select elements by a dedicated attribute like data-cy rather than CSS classes that change with design.",
        "CypressはcyChで始まるコマンドチェーンを使います。cy.getはCSSセレクタで要素を選び、cy.containsはテキスト内容で選ぶため、「決済」ラベルのボタンを探すときに便利です。重要な点として、cyコマンドは同期的に値を返さず、キューに入って順次・非同期に実行されます。そのため変数へ直接代入せず、値が必要なときは.then()を連結します。安定したテストのために、デザインで変わりやすいCSSクラスではなくdata-cyのような専用属性で要素を選びましょう。"
      ),
      CODE("js", `// data-cy = neo bền vững; .then() khi cần đọc giá trị
cy.get('[data-cy="product-card"]').should('have.length', 12);
cy.contains('button', 'Thanh toán').click();

cy.get('[data-cy="total"]').invoke('text').then((t) => {
  const money = Number(t.replace(/[^\\d]/g, ''));
  expect(money).to.be.greaterThan(0);
});`),
      TIP(
        "Thêm thuộc tính data-cy vào code app là khoản đầu tư nhỏ nhưng đền đáp lớn: selector rõ ràng, không vỡ khi đổi CSS, và đọc test dễ hiểu ý định.",
        "Adding data-cy attributes to app code is a small investment with a big payoff: selectors are explicit, don't break on CSS changes, and tests read with clear intent.",
        "アプリのコードにdata-cy属性を追加するのは、小さな投資で大きな見返りがあります。セレクタが明確でCSS変更でも壊れず、テストの意図が読み取りやすくなります。"
      ),
    ],
  },
  {
    heading: { vi: "6. Assertion: should, expect và chuỗi kiểm tra", en: "6. Assertions: should, expect and chained checks", ja: "6. アサーション: should・expectと連鎖検証" },
    blocks: [
      P(
        "Assertion là nơi bạn khẳng định hệ thống đúng như kỳ vọng. Cypress dựa trên thư viện Chai, cung cấp hai phong cách: .should() nối vào chuỗi lệnh (được retry cùng lệnh trước), và expect() trong khối .then() để kiểm tra giá trị JavaScript thuần. Bạn có thể xâu nhiều điều kiện trong một .should() và Cypress sẽ đợi tất cả cùng đúng. Với TMĐT, một assertion tốt vừa kiểm nội dung hiển thị vừa kiểm trạng thái nút, ví dụ giỏ có 2 sản phẩm thì nút 'Thanh toán' phải bật. Viết assertion mô tả đúng hành vi nghiệp vụ giúp test trở thành tài liệu sống của sản phẩm.",
        "Assertions are where you state the system behaves as expected. Cypress builds on the Chai library, offering two styles: .should() chained onto commands (retried with the previous command), and expect() inside a .then() block for plain JavaScript checks. You can stack multiple conditions in one .should() and Cypress waits for all to hold. For e-commerce, a good assertion checks both displayed content and control state — e.g. with 2 items in the cart, the 'Checkout' button must be enabled. Writing assertions that describe real business behavior makes tests living documentation of the product.",
        "アサーションは、システムが期待どおりに振る舞うと表明する場所です。CypressはChaiライブラリを基盤とし、2つのスタイルを提供します。コマンドに連結する.should()（直前のコマンドと共に再試行される）と、素のJavaScript値を検証する.then()内のexpect()です。1つの.should()に複数条件を重ねると、Cypressはすべて成立するまで待ちます。ECでは、良いアサーションは表示内容とコントロールの状態の両方を確認します。例えばカートに2品あるなら「決済」ボタンは有効でなければなりません。実際の業務挙動を記述するアサーションは、製品の生きたドキュメントになります。"
      ),
      CODE("js", `cy.get('[data-cy="cart-item"]').should('have.length', 2);
cy.get('[data-cy="checkout"]')
  .should('be.visible')
  .and('not.be.disabled');          // xâu nhiều điều kiện

cy.get('[data-cy="badge"]').should(($b) => {   // assertion tuỳ biến (retry)
  expect($b.text().trim()).to.match(/^\\d+$/);
});`),
    ],
  },
  {
    heading: { vi: "7. Cấu trúc bài test & hook đời sống", en: "7. Test structure & lifecycle hooks", ja: "7. テスト構造とライフサイクルフック" },
    blocks: [
      P(
        "Một bộ test dễ bảo trì cần cấu trúc rõ ràng. Cypress dùng describe để nhóm kịch bản, it cho từng ca kiểm thử, và các hook beforeEach/afterEach để chuẩn bị và dọn dẹp. Nguyên tắc vàng: mỗi it phải độc lập, tự dựng trạng thái của mình và không phụ thuộc thứ tự chạy của test khác. Với TMĐT, beforeEach thường đăng nhập và đưa app về trang cần test. Tránh gộp cả một luồng dài vào một it khổng lồ; hãy chia nhỏ theo hành vi để khi lỗi bạn biết ngay bước nào hỏng. Đặt tên it bằng ngôn ngữ nghiệp vụ, không phải ngôn ngữ kỹ thuật.",
        "A maintainable suite needs clear structure. Cypress uses describe to group scenarios, it for each test case, and beforeEach/afterEach hooks for setup and teardown. The golden rule: each it must be independent, build its own state, and not depend on the run order of other tests. For e-commerce, beforeEach often logs in and brings the app to the page under test. Avoid cramming a long flow into one giant it; split by behavior so a failure tells you exactly which step broke. Name your it blocks in business language, not technical jargon.",
        "保守しやすいスイートには明確な構造が必要です。Cypressはdescribeでシナリオをまとめ、itで各テストケースを表し、beforeEach/afterEachフックで準備と後片付けを行います。黄金律は、各itが独立し、自らの状態を構築し、他テストの実行順に依存しないことです。ECではbeforeEachでログインし、対象ページへアプリを移動させることが多いです。長いフローを1つの巨大なitに詰め込むのは避け、挙動ごとに分割して、失敗時にどのステップが壊れたか即座に分かるようにします。itの名前は技術用語ではなく業務言語で付けましょう。"
      ),
      CODE("js", `describe('Giỏ hàng', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="email"]').type('qa@shop.vn');
    cy.get('[data-cy="password"]').type('Secret123');
    cy.get('[data-cy="submit"]').click();
    cy.location('pathname').should('eq', '/');   // xác nhận đã vào
  });

  it('thêm 1 sản phẩm cập nhật badge', () => { /* ... */ });
  it('xoá sản phẩm đưa giỏ về rỗng', () => { /* ... */ });
});`),
    ],
  },
  {
    heading: { vi: "8. Time-travel debugging & Test Runner", en: "8. Time-travel debugging & the Test Runner", ja: "8. タイムトラベルデバッグとTest Runner" },
    blocks: [
      P(
        "Một trong những tính năng khiến Cypress được yêu thích là time-travel debugging. Khi chạy trong Test Runner tương tác, mỗi lệnh được ghi lại thành một mục trong Command Log; bạn rê chuột qua bất kỳ bước nào để xem ảnh chụp DOM ngay khoảnh khắc đó. Điều này biến việc gỡ lỗi từ đoán mò thành quan sát chính xác: bạn thấy trang trông thế nào trước và sau mỗi click. Kết hợp với DevTools của trình duyệt, bạn có thể đặt breakpoint bằng cy.pause() hoặc debug() để dừng và soi trạng thái. Khi test fail trong CI, video và screenshot tự động cung cấp bối cảnh tương tự dù bạn không ngồi xem trực tiếp.",
        "One feature that makes Cypress beloved is time-travel debugging. In the interactive Test Runner, each command is recorded as an entry in the Command Log; hover any step to see a DOM snapshot at that exact moment. This turns debugging from guesswork into precise observation: you see how the page looked before and after each click. Combined with the browser DevTools, you can set breakpoints with cy.pause() or debug() to halt and inspect state. When a test fails in CI, automatic video and screenshots provide similar context even though you're not watching live.",
        "Cypressが愛される機能の一つがタイムトラベルデバッグです。対話的なTest Runnerでは各コマンドがCommand Logの項目として記録され、任意のステップにマウスを重ねると、その瞬間のDOMスナップショットを見られます。これによりデバッグは当て推量から正確な観察へと変わり、各クリックの前後でページがどう見えたか分かります。ブラウザのDevToolsと組み合わせ、cy.pause()やdebug()でブレークポイントを置き、状態を停止して調べられます。CIでテストが失敗しても、自動のビデオとスクリーンショットが、直接見ていなくても同様の文脈を提供します。"
      ),
      CODE("js", `it('debug luồng thanh toán', () => {
  cy.visit('/cart');
  cy.get('[data-cy="checkout"]').click();
  cy.pause();                       // dừng để soi state trong Runner
  cy.get('[data-cy="pay"]').debug() // log $el ra DevTools console
    .click();
});`),
    ],
  },
  {
    heading: { vi: "9. Ví dụ leo thang: từ smoke tới luồng mua hàng", en: "9. Escalating example: from smoke to purchase flow", ja: "9. 段階的な例: スモークから購入フローまで" },
    blocks: [
      P(
        "Hãy đi từ đơn giản tới phức tạp. Ca smoke chỉ kiểm trang tải được. Tiếp theo là ca tương tác: tìm sản phẩm, thêm vào giỏ, kiểm badge. Cuối cùng là luồng nghiệp vụ hoàn chỉnh: từ trang chủ, tìm 'áo thun', chọn size, thêm giỏ, vào thanh toán, điền địa chỉ và xác nhận đơn. Ca cuối này chạm nhiều màn hình và trạng thái bất đồng bộ, nhưng nhờ auto-wait bạn không cần một cy.wait cứng nào. Khi test dài ra, hãy bọc các bước lặp lại (như đăng nhập) vào lệnh tuỳ biến để giữ kịch bản gọn và tập trung vào hành vi đang kiểm.",
        "Let's go from simple to complex. The smoke case only checks the page loads. Next is an interaction case: search a product, add to cart, check the badge. Finally a full business flow: from home, search 'tee', pick a size, add to cart, go to checkout, fill the address and confirm the order. This last case touches many screens and async states, yet thanks to auto-wait you need no hard cy.wait. As tests grow, wrap repeated steps (like login) into custom commands to keep scenarios lean and focused on the behavior under test.",
        "単純なものから複雑なものへ進みましょう。スモークケースはページが読み込めるかだけを確認します。次は操作ケースで、商品を検索しカートへ追加しバッジを確認します。最後に完全な業務フローで、トップから「Tシャツ」を検索し、サイズを選び、カートへ追加し、決済へ進み、住所を入力して注文を確定します。この最後のケースは多くの画面と非同期状態に触れますが、自動待機のおかげで固定のcy.waitは不要です。テストが大きくなったら、ログインなどの繰り返し手順をカスタムコマンドにまとめ、シナリオを簡潔に保ち対象の挙動に集中させます。"
      ),
      CODE("js", `it('mua hàng thành công đầu-cuối', () => {
  cy.visit('/');
  cy.get('[data-cy="search"]').type('áo thun{enter}');
  cy.get('[data-cy="product-card"]').first().click();
  cy.get('[data-cy="size-M"]').click();
  cy.get('[data-cy="add-to-cart"]').click();
  cy.get('[data-cy="cart-count"]').should('have.text', '1');
  cy.get('[data-cy="go-checkout"]').click();
  cy.get('[data-cy="address"]').type('12 Lê Lợi, Q1');
  cy.contains('button', 'Đặt hàng').click();
  cy.contains('Đặt hàng thành công').should('be.visible');
});`),
    ],
  },
  {
    heading: { vi: "10. Bẫy thường gặp & cách né", en: "10. Common pitfalls & how to avoid them", ja: "10. よくある落とし穴と回避法" },
    blocks: [
      P(
        "Người mới thường rơi vào vài bẫy. Thứ nhất là lạm dụng cy.wait(ms) cố định: nó vừa làm test chậm vừa vẫn chập chờn, hãy thay bằng assertion để tận dụng retry. Thứ hai là gán biến từ lệnh cy vì tưởng nó đồng bộ; đúng cách là dùng .then() hoặc alias qua .as(). Thứ ba là selector mong manh dựa vào class CSS hay chỉ số DOM; hãy dùng data-cy. Thứ tư là test phụ thuộc lẫn nhau khiến một lỗi kéo sập cả chuỗi. Cuối cùng, nhiều người quên rằng lệnh hành động không retry, nên khi phần tử chưa sẵn sàng, click sẽ trượt — hãy assert phần tử tồn tại trước khi tác động.",
        "Newcomers fall into a few traps. First, overusing fixed cy.wait(ms): it makes tests slow yet still flaky — replace it with assertions to leverage retry. Second, assigning variables from cy commands as if synchronous; the right way is .then() or aliasing via .as(). Third, brittle selectors relying on CSS classes or DOM indexes; use data-cy. Fourth, interdependent tests where one failure cascades. Finally, many forget action commands don't retry, so if the element isn't ready the click misses — assert the element exists before acting on it.",
        "初心者はいくつかの罠に陥ります。第一に、固定のcy.wait(ms)の乱用で、テストは遅くなるのにフレーキーなままです。アサーションに置き換えてリトライを活かしましょう。第二に、cyコマンドの戻り値を同期的とみなして変数へ代入することです。正しくは.then()や.as()によるエイリアスを使います。第三に、CSSクラスやDOM索引に頼るもろいセレクタで、data-cyを使うべきです。第四に、相互依存するテストで、一つの失敗が連鎖します。最後に、アクションコマンドは再試行されないことを忘れがちで、要素が未準備だとクリックが外れます。操作前に要素の存在をアサートしましょう。"
      ),
      QA(
        "Vì sao không nên dùng cy.wait(3000) để chờ dữ liệu?",
        "Why should you avoid cy.wait(3000) to wait for data?",
        "Vì đó là chờ mù: nếu API nhanh hơn 3s thì bạn lãng phí thời gian, nếu chậm hơn thì test vẫn fail. Cách đúng là chờ theo điều kiện — dùng assertion để Cypress tự retry, hoặc cy.wait('@alias') để chờ đúng request cần.",
        "Because it's a blind wait: if the API is faster than 3s you waste time, if slower the test still fails. The right way is conditional waiting — use assertions so Cypress retries, or cy.wait('@alias') to wait for the exact request.",
        "それは盲目的な待機だからです。APIが3秒より速ければ時間を浪費し、遅ければテストは失敗します。正しくは条件付き待機で、アサーションでCypressに再試行させるか、cy.wait('@alias')で対象の要求を待ちます。",
        "テストケースを安定させる待機方法について教えてください。"
      ),
    ],
  },
  {
    heading: { vi: "11. So sánh Cypress với Playwright & Selenium", en: "11. Cypress vs Playwright & Selenium", ja: "11. CypressとPlaywright・Seleniumの比較" },
    blocks: [
      P(
        "Không có công cụ nào là 'tốt nhất' tuyệt đối; lựa chọn tuỳ bối cảnh. Selenium mạnh về đa ngôn ngữ và đa trình duyệt, chuẩn công nghiệp lâu đời, nhưng phải tự lo chờ đợi và dễ chập chờn. Playwright của Microsoft cũng auto-wait, hỗ trợ đa trình duyệt qua một API, nhiều tab, nhiều domain và chạy đa ngôn ngữ — rất mạnh cho kịch bản phức tạp. Cypress nổi bật ở trải nghiệm lập trình viên: Test Runner trực quan, time-travel, tài liệu tốt, gần gũi với dev frontend. Điểm yếu của Cypress là bó buộc JS/TS và hạn chế đa tab/đa domain nguyên bản. Với đội frontend React/Vue muốn feedback nhanh và debug dễ, Cypress thường là lựa chọn thoải mái nhất.",
        "No tool is absolutely 'best'; the choice depends on context. Selenium excels at multi-language and cross-browser, a long-standing industry standard, but you must handle waiting yourself and it's flaky-prone. Microsoft's Playwright also auto-waits, supports cross-browser via one API, multiple tabs, multiple domains and multi-language execution — very strong for complex scenarios. Cypress shines in developer experience: an intuitive Test Runner, time-travel, great docs, close to frontend devs. Cypress's weaknesses are being bound to JS/TS and native limits on multi-tab/multi-domain. For React/Vue frontend teams wanting fast feedback and easy debugging, Cypress is often the most comfortable choice.",
        "絶対的に「最良」のツールはなく、選択は文脈次第です。Seleniumは多言語・クロスブラウザに強く、長年の業界標準ですが、待機は自前で扱う必要がありフレーキーになりやすいです。MicrosoftのPlaywrightも自動待機し、単一APIでクロスブラウザ・複数タブ・複数ドメイン・多言語実行に対応し、複雑なシナリオに非常に強力です。Cypressは開発者体験で際立ち、直感的なTest Runner、タイムトラベル、優れたドキュメントでフロントエンド開発者に親しみやすいです。弱点はJS/TSに縛られ、複数タブ/複数ドメインが本来制限される点です。高速なフィードバックと容易なデバッグを求めるReact/Vueチームには、Cypressが最も快適な選択になることが多いです。"
      ),
      UL(
        ["Selenium: đa ngôn ngữ/đa trình duyệt, chuẩn cũ, phải tự chờ.", "Playwright: auto-wait, đa tab/đa domain, đa ngôn ngữ, mạnh cho web phức tạp.", "Cypress: DX xuất sắc, time-travel, JS/TS, hợp đội frontend."],
        ["Selenium: multi-language/cross-browser, legacy standard, manual waits.", "Playwright: auto-wait, multi-tab/multi-domain, multi-language, strong for complex web.", "Cypress: excellent DX, time-travel, JS/TS, great for frontend teams."],
        ["Selenium: 多言語/クロスブラウザ、旧来の標準、待機は自前。", "Playwright: 自動待機、複数タブ/複数ドメイン、多言語、複雑なWebに強い。", "Cypress: 優れたDX、タイムトラベル、JS/TS、フロントエンドチーム向き。"]
      ),
    ],
  },
  {
    heading: { vi: "12. Kịch bản thực chiến & hỏi đáp phỏng vấn", en: "12. Real-world scenario & interview Q&A", ja: "12. 実戦シナリオと面接Q&A" },
    blocks: [
      SCEN(
        "Regression đêm cho website TMĐT",
        "Nightly regression for an e-commerce site",
        "Đội QA của một sàn TMĐT có 400 test Cypress bao phủ tìm kiếm, giỏ hàng, thanh toán và tài khoản. Mỗi đêm CI chạy toàn bộ headless; nếu tỉ lệ pass dưới 100% thì cảnh báo Slack và chặn merge. Nhờ auto-wait và selector data-cy, tỉ lệ flake dưới 1%, đội tin tưởng kết quả và deploy nhiều lần mỗi ngày.",
        "A marketplace's QA team has 400 Cypress tests covering search, cart, checkout and account. Every night CI runs them all headless; if pass rate is below 100% it alerts Slack and blocks merges. Thanks to auto-wait and data-cy selectors, flake stays under 1%, the team trusts results and ships several times a day.",
        "夜間EC回帰テスト",
        "あるマーケットプレイスのQAチームは、検索・カート・決済・アカウントを網羅する400のCypressテストを持ちます。毎晩CIが全件をヘッドレスで実行し、合格率が100%未満ならSlackへ通知しマージを止めます。自動待機とdata-cyセレクタのおかげでフレーキー率は1%未満に保たれ、チームは結果を信頼し1日に複数回デプロイします。"
      ),
      QA(
        "Cypress xử lý bất đồng bộ như thế nào mà không cần callback?",
        "How does Cypress handle async without callbacks?",
        "Các lệnh cy được xếp vào hàng đợi và chạy tuần tự; Cypress tự chờ mỗi lệnh xong (và retry query/assertion) trước khi sang lệnh sau. Nên bạn viết như code đồng bộ, chỉ dùng .then() khi cần đọc giá trị.",
        "cy commands enqueue and run sequentially; Cypress waits for each to finish (retrying queries/assertions) before the next. So you write it like synchronous code and only use .then() when you need a value.",
        "cyコマンドはキューに入り順次実行され、Cypressは各コマンドの完了（クエリ/アサーションの再試行を含む）を待ってから次へ進みます。だから同期コードのように書け、値が必要なときだけ.then()を使います。",
        "自動待機の仕組みを説明してください。"
      ),
      QA(
        "Khi nào Cypress KHÔNG phải lựa chọn phù hợp?",
        "When is Cypress NOT the right choice?",
        "Khi bạn cần đa ngôn ngữ (Java/Python), test nhiều tab/nhiều domain phức tạp, kiểm thử native app, hoặc chạy trên Safari/WebKit rộng rãi — lúc đó Playwright hoặc Selenium/Appium hợp hơn.",
        "When you need multi-language (Java/Python), complex multi-tab/multi-domain tests, native app testing, or broad Safari/WebKit runs — then Playwright or Selenium/Appium fit better.",
        "多言語（Java/Python）が必要、複雑な複数タブ/複数ドメイン、ネイティブアプリのテスト、Safari/WebKitでの広範な実行が必要な場合は、PlaywrightやSelenium/Appiumの方が適します。",
        "Cypressが適さない場面はどこですか。"
      ),
      P(
        "Tóm lại, Cypress là công cụ E2E mạnh cho SPA hiện đại nhờ ba trụ cột: chạy trong browser, auto-wait/retry-ability, và trải nghiệm gỡ lỗi tuyệt vời. Checklist khi bắt đầu: dùng data-cy cho selector, tránh cy.wait cứng, giữ mỗi test độc lập, đặt tên theo nghiệp vụ, bật video/screenshot trong CI, và hiểu rõ giới hạn để chọn công cụ đúng cho từng bài toán. Nắm vững những nền tảng này, bạn đã sẵn sàng tiến tới điều khiển network và kiểm thử thành phần ở các bài sau.",
        "In short, Cypress is a strong E2E tool for modern SPAs thanks to three pillars: running in-browser, auto-wait/retry-ability, and an excellent debugging experience. A starter checklist: use data-cy selectors, avoid hard cy.wait, keep each test independent, name by business behavior, enable video/screenshots in CI, and know the limits to pick the right tool per problem. Master these foundations and you're ready to move on to network control and component testing in later articles.",
        "要するにCypressは、ブラウザ内動作・自動待機/リトライ性・優れたデバッグ体験という3本柱により、最新SPAに強力なE2Eツールです。開始時のチェックリスト: data-cyセレクタを使い、固定のcy.waitを避け、各テストを独立させ、業務挙動で命名し、CIでビデオ/スクリーンショットを有効にし、限界を理解して課題ごとに適切なツールを選ぶことです。これらの基礎を身につければ、後続記事のネットワーク制御とコンポーネントテストへ進む準備が整います。"
      ),
    ],
  },
];

// ===========================================================================
// BÀI 2 — cy.intercept & điều khiển network (mocking, realworld)
// ===========================================================================
const pages2 = [
  {
    heading: { vi: "1. Vì sao phải điều khiển network khi test", en: "1. Why control the network when testing", ja: "1. テストでネットワークを制御する理由" },
    blocks: [
      P(
        "Ứng dụng SaaS hiện đại phụ thuộc nặng vào API: dashboard tải danh sách dự án, biểu đồ gọi endpoint thống kê, thông báo đến qua polling. Nếu test E2E luôn đập vào backend thật, bạn phải phụ thuộc dữ liệu server, khó tái tạo trạng thái lỗi, và test chậm và giòn. Đó là lúc cy.intercept vào cuộc: nó chặn tầng network của app ngay trong trình duyệt, cho bạn quyền quyết định request nào được stub (trả dữ liệu giả) và request nào chỉ spy (theo dõi mà vẫn cho đi thật). Nhờ đó bạn dựng được mọi trạng thái: danh sách rỗng, lỗi 500, tải chậm, phân trang — tất cả một cách xác định.",
        "Modern SaaS apps depend heavily on APIs: a dashboard loads a project list, charts call a stats endpoint, notifications arrive via polling. If E2E tests always hit the real backend, you depend on server data, struggle to reproduce error states, and tests get slow and brittle. That's where cy.intercept steps in: it intercepts the app's network layer right in the browser, letting you decide which requests to stub (return fake data) and which to only spy (observe while still passing through). Thus you can build any state: empty list, 500 error, slow load, pagination — all deterministically.",
        "最新のSaaSアプリはAPIに大きく依存します。ダッシュボードはプロジェクト一覧を読み込み、グラフは統計エンドポイントを呼び、通知はポーリングで届きます。E2Eテストが常に実バックエンドを叩くと、サーバーデータに依存し、エラー状態の再現が難しく、テストは遅く脆くなります。そこでcy.interceptの出番です。ブラウザ内でアプリのネットワーク層を傍受し、どの要求をスタブ（偽データを返す）し、どれをスパイ（実通信させつつ観測）するかを決められます。これにより、空リスト・500エラー・低速読み込み・ページングなど、あらゆる状態を確定的に構築できます。"
      ),
      IMG(SVG_INTERCEPT, "cy.intercept chặn route, gắn alias, stub hoặc spy.", "cy.intercept matches routes, aliases, stubs or spies.", "cy.interceptはルートをマッチし、エイリアスを付け、スタブまたはスパイします。"),
      UL(
        ["Stub: trả response giả để dựng trạng thái xác định.", "Spy: cho request đi thật nhưng theo dõi để assert.", "Alias + cy.wait('@x'): đồng bộ test với thời điểm request.", "Fixtures: lưu dữ liệu mẫu trong file JSON để tái dùng."],
        ["Stub: return fake responses to build deterministic states.", "Spy: let the request pass through but observe to assert.", "Alias + cy.wait('@x'): sync the test to when the request happens.", "Fixtures: store sample data in JSON files for reuse."],
        ["スタブ: 偽の応答を返し確定的な状態を作ります。", "スパイ: 要求を実通信させつつ観測してアサートします。", "エイリアス + cy.wait('@x'): 要求発生時点にテストを同期します。", "フィクスチャ: サンプルデータをJSONファイルに保存し再利用します。"]
      ),
    ],
  },
  {
    heading: { vi: "2. Cơ chế: cy.intercept khớp route thế nào", en: "2. Mechanism: how cy.intercept matches routes", ja: "2. 仕組み: cy.interceptのルートマッチ" },
    blocks: [
      P(
        "cy.intercept nhận một mẫu route (method + URL, có thể dùng glob hoặc regex) và một handler quyết định làm gì. Khi app phát ra request khớp, Cypress giữ nó lại và áp dụng handler: trả object stub, đọc fixture, thay đổi response, hay chỉ ghi nhận. Quan trọng: phải khai báo intercept TRƯỚC khi hành động gây ra request, nếu không request đã bay đi. Bạn nên đặt intercept trong beforeEach hoặc ngay đầu it, trước cy.visit nếu request xảy ra lúc tải trang. URL matching hỗ trợ ký tự đại diện, ví dụ '**/api/projects*' để bắt cả query string.",
        "cy.intercept takes a route pattern (method + URL, supporting glob or regex) and a handler deciding what to do. When the app emits a matching request, Cypress holds it and applies the handler: return a stub object, read a fixture, modify the response, or just record it. Crucially, you must declare the intercept BEFORE the action that triggers the request, otherwise the request has already left. Put intercepts in beforeEach or at the top of the it, before cy.visit if the request happens on page load. URL matching supports wildcards, e.g. '**/api/projects*' to catch query strings too.",
        "cy.interceptはルートパターン（メソッド＋URL、globや正規表現に対応）と、何をするかを決めるハンドラーを取ります。アプリがマッチする要求を出すと、Cypressはそれを保持しハンドラーを適用します。スタブオブジェクトを返す、フィクスチャを読む、応答を書き換える、あるいは記録するだけです。重要なのは、要求を引き起こすアクションのに傍受を宣言することです。さもないと要求は既に送信済みです。傍受はbeforeEachやitの先頭に置き、ページ読み込み時に要求が起きるならcy.visitのに置きます。URLマッチはワイルドカードに対応し、例えば'**/api/projects*'でクエリ文字列も捕捉します。"
      ),
      CODE("js", `// Khai báo TRƯỚC khi kích hoạt request
cy.intercept('GET', '**/api/projects*', { fixture: 'projects.json' }).as('list');
cy.visit('/dashboard');       // request xảy ra lúc tải trang
cy.wait('@list');             // chờ đúng request này rồi mới assert`),
      NOTE(
        "cy.intercept thay thế cy.route cũ (đã bỏ). Nó chặn được cả fetch lẫn XHR, và cho phép can thiệp sâu vào req/res — mạnh hơn nhiều so với API đời trước.",
        "cy.intercept replaces the old cy.route (removed). It intercepts both fetch and XHR and allows deep req/res manipulation — far more powerful than the older API.",
        "cy.interceptは旧cy.route（廃止）を置き換えます。fetchとXHRの両方を傍受し、req/resへ深く介入でき、旧APIよりはるかに強力です。"
      ),
    ],
  },
  {
    heading: { vi: "3. Stub response: dựng dữ liệu xác định", en: "3. Stubbing responses: building deterministic data", ja: "3. 応答のスタブ: 確定的なデータ構築" },
    blocks: [
      P(
        "Stub là trả về dữ liệu do bạn kiểm soát thay cho server. Điều này biến test thành xác định: cùng một đầu vào luôn cho cùng kết quả, không phụ thuộc dữ liệu thật đang thay đổi. Với dashboard SaaS, bạn có thể stub endpoint /api/projects để luôn trả về đúng 3 dự án với tên và trạng thái biết trước, rồi assert bảng hiển thị đúng 3 dòng. Bạn kiểm soát cả statusCode, headers, body và độ trễ. Stub đặc biệt hữu ích để test những trạng thái khó tái tạo với backend thật, như tài khoản vừa tạo chưa có dữ liệu, hay gói cước hết hạn.",
        "Stubbing means returning data you control instead of the server's. This makes tests deterministic: the same input always yields the same result, independent of changing real data. For a SaaS dashboard, you can stub /api/projects to always return exactly 3 projects with known names and statuses, then assert the table shows exactly 3 rows. You control statusCode, headers, body and delay. Stubbing is especially useful for states hard to reproduce with a real backend, like a brand-new account with no data, or an expired plan.",
        "スタブとは、サーバーの代わりに自分が制御するデータを返すことです。これによりテストは確定的になり、同じ入力は変化する実データに依存せず常に同じ結果を返します。SaaSダッシュボードでは、/api/projectsをスタブして常に既知の名前と状態を持つちょうど3件のプロジェクトを返させ、表に3行表示されるとアサートできます。statusCode・ヘッダー・ボディ・遅延まで制御できます。スタブは、データのない作りたてのアカウントや期限切れプランなど、実バックエンドでは再現しにくい状態のテストに特に有用です。"
      ),
      CODE("js", `it('hiển thị đúng số dự án từ API', () => {
  cy.intercept('GET', '**/api/projects*', {
    statusCode: 200,
    body: [
      { id: 1, name: 'Alpha',  status: 'active' },
      { id: 2, name: 'Beta',   status: 'paused' },
      { id: 3, name: 'Gamma',  status: 'active' },
    ],
  }).as('list');
  cy.visit('/dashboard');
  cy.wait('@list');
  cy.get('[data-cy="project-row"]').should('have.length', 3);
  cy.contains('[data-cy="project-row"]', 'Beta')
    .should('contain', 'paused');
});`),
    ],
  },
  {
    heading: { vi: "4. Fixtures: quản lý dữ liệu mẫu", en: "4. Fixtures: managing sample data", ja: "4. フィクスチャ: サンプルデータ管理" },
    blocks: [
      P(
        "Khi body stub lớn hoặc dùng lại nhiều nơi, nhúng thẳng vào test làm code rối. Fixtures giải quyết bằng cách lưu dữ liệu mẫu trong thư mục cypress/fixtures dưới dạng JSON, rồi tham chiếu qua tuỳ chọn { fixture: 'ten.json' } hoặc cy.fixture(). Cách này tách dữ liệu khỏi logic test, giúp nhiều bài dùng chung một tập dữ liệu chuẩn và dễ cập nhật khi API đổi schema. Bạn cũng có thể nạp fixture vào biến để tuỳ biến trước khi stub, ví dụ lấy mẫu 100 bản ghi rồi cắt còn 1 để test trạng thái ít dữ liệu.",
        "When the stub body is large or reused in many places, inlining it clutters the test. Fixtures solve this by storing sample data in the cypress/fixtures folder as JSON, referenced via the { fixture: 'name.json' } option or cy.fixture(). This separates data from test logic, lets many tests share one canonical dataset, and is easy to update when the API changes schema. You can also load a fixture into a variable to customize before stubbing, e.g. take a 100-record sample then slice to 1 to test a low-data state.",
        "スタブのボディが大きい、または多くの場所で再利用される場合、テストに直書きすると散らかります。フィクスチャは、サンプルデータをcypress/fixturesフォルダにJSONとして保存し、{ fixture: 'name.json' }オプションやcy.fixture()で参照して解決します。これによりデータとテストロジックが分離され、多くのテストが1つの正規データセットを共有でき、APIのスキーマ変更時も更新が容易です。フィクスチャを変数に読み込み、スタブ前にカスタマイズもできます。例えば100件のサンプルを1件に切り詰めて低データ状態をテストします。"
      ),
      CODE("json", `// cypress/fixtures/projects.json
[
  { "id": 1, "name": "Alpha", "status": "active",  "members": 8 },
  { "id": 2, "name": "Beta",  "status": "paused",  "members": 3 }
]`),
      CODE("js", `// dùng fixture trực tiếp, hoặc nạp để tuỳ biến
cy.intercept('GET', '**/api/projects*', { fixture: 'projects.json' }).as('list');

cy.fixture('projects.json').then((all) => {
  cy.intercept('GET', '**/api/projects*', { body: all.slice(0, 1) }).as('one');
});`),
    ],
  },
  {
    heading: { vi: "5. Alias & cy.wait('@alias'): đồng bộ chính xác", en: "5. Alias & cy.wait('@alias'): precise synchronization", ja: "5. エイリアスとcy.wait('@alias'): 正確な同期" },
    blocks: [
      P(
        "Sau khi intercept, bạn gắn alias bằng .as('ten') rồi dùng cy.wait('@ten') để chặn test tới khi request thực sự xảy ra. Đây là cách chờ đúng đắn: thay vì đoán thời gian, bạn chờ đúng sự kiện mạng cụ thể. Quan trọng hơn, cy.wait trả về đối tượng interception chứa cả request và response, nên bạn có thể assert luôn payload gửi đi và dữ liệu nhận về. Điều này cực mạnh khi kiểm thử: bạn xác nhận app gọi đúng endpoint với đúng tham số, và render đúng những gì server trả. Nếu chờ nhiều request, truyền mảng alias cho một cy.wait.",
        "After intercepting, you alias with .as('name') then use cy.wait('@name') to block the test until the request actually happens. This is the correct way to wait: instead of guessing time, you wait for a specific network event. More importantly, cy.wait returns the interception object containing both request and response, so you can assert the outgoing payload and the incoming data. This is powerful in testing: you confirm the app calls the right endpoint with the right params and renders exactly what the server returned. To wait for multiple requests, pass an array of aliases to one cy.wait.",
        "傍受後、.as('name')でエイリアスを付け、cy.wait('@name')で要求が実際に起きるまでテストを止めます。これが正しい待ち方です。時間を推測する代わりに、特定のネットワークイベントを待ちます。さらに重要なのは、cy.waitが要求と応答の両方を含むインターセプションオブジェクトを返すことで、送信ペイロードと受信データをアサートできます。これはテストで強力です。アプリが正しいパラメータで正しいエンドポイントを呼び、サーバーの返答どおりに描画すると確認できます。複数要求を待つには、エイリアスの配列を1つのcy.waitに渡します。"
      ),
      CODE("js", `cy.intercept('POST', '**/api/login').as('login');
cy.get('[data-cy="submit"]').click();

cy.wait('@login').then(({ request, response }) => {
  expect(request.body).to.have.property('email');   // assert payload gửi
  expect(response.statusCode).to.eq(200);           // assert kết quả
});`),
      TIP(
        "Assert cả request.body giúp bắt lỗi 'app gọi API sai tham số' — loại bug mà chỉ nhìn UI sẽ không phát hiện được.",
        "Asserting request.body catches 'app calls API with wrong params' bugs — the kind you'd never spot by looking at the UI alone.",
        "request.bodyをアサートすると「アプリがAPIを誤ったパラメータで呼ぶ」バグを捕まえられます。UIを見るだけでは決して気づけない種類のバグです。"
      ),
    ],
  },
  {
    heading: { vi: "6. Test trạng thái loading", en: "6. Testing the loading state", ja: "6. ローディング状態のテスト" },
    blocks: [
      P(
        "Trạng thái đang tải thường bị bỏ quên vì với backend thật nó trôi qua quá nhanh để kiểm. Với cy.intercept bạn chủ động làm chậm response bằng tuỳ chọn delay, tạo cửa sổ thời gian đủ để assert spinner hay skeleton hiển thị. Kịch bản: khi vào dashboard, spinner phải xuất hiện trong lúc chờ, và biến mất khi dữ liệu về. Đây là ví dụ điển hình cho thấy vì sao điều khiển network quan trọng: bạn không thể tin cậy kiểm thử một trạng thái thoáng qua nếu không kiểm soát được thời điểm nó xảy ra.",
        "The loading state is often overlooked because with a real backend it passes too fast to check. With cy.intercept you deliberately slow the response using the delay option, creating a time window wide enough to assert the spinner or skeleton shows. Scenario: entering the dashboard, a spinner must appear while waiting and disappear when data arrives. This is a classic example of why network control matters: you cannot reliably test a fleeting state without controlling when it happens.",
        "ローディング状態は、実バックエンドでは速く通り過ぎて確認できないため見落とされがちです。cy.interceptではdelayオプションで応答を意図的に遅らせ、スピナーやスケルトンの表示をアサートできるだけの時間窓を作ります。シナリオ: ダッシュボードに入るとき、待機中はスピナーが表示され、データ到着時に消えなければなりません。これは、ネットワーク制御が重要な理由の典型例です。いつ起きるかを制御しなければ、つかの間の状態を確実にテストできません。"
      ),
      IMG(SVG_STATES, "Bốn trạng thái cần phủ: loading · empty · error · success.", "Four states to cover: loading · empty · error · success.", "網羅すべき4状態: loading · empty · error · success。"),
      CODE("js", `it('hiển thị spinner khi đang tải', () => {
  cy.intercept('GET', '**/api/projects*', {
    delay: 800, fixture: 'projects.json',
  }).as('list');
  cy.visit('/dashboard');
  cy.get('[data-cy="spinner"]').should('be.visible');   // trong lúc chờ
  cy.wait('@list');
  cy.get('[data-cy="spinner"]').should('not.exist');    // sau khi có data
});`),
    ],
  },
  {
    heading: { vi: "7. Test trạng thái rỗng (empty state)", en: "7. Testing the empty state", ja: "7. 空状態のテスト" },
    blocks: [
      P(
        "Người dùng mới toanh của SaaS chưa có dữ liệu; màn hình phải hiển thị hướng dẫn 'Tạo dự án đầu tiên' thay vì bảng trống lạnh lẽo. Với backend thật, tạo được một tài khoản đúng-trống rất phiền. Stub một response mảng rỗng giải quyết ngay: bạn khẳng định app không crash, ẩn bảng, và hiện đúng thông điệp khuyến khích cùng nút CTA. Empty state là điểm chạm quan trọng của trải nghiệm onboarding, nên đáng được test tự động chứ không chỉ kiểm thủ công một lần.",
        "A brand-new SaaS user has no data; the screen must show a 'Create your first project' guide instead of a cold empty table. With a real backend, creating a genuinely-empty account is a hassle. Stubbing an empty-array response solves it instantly: you assert the app doesn't crash, hides the table, and shows the right encouraging message with a CTA button. The empty state is a key touchpoint of the onboarding experience, so it deserves automated tests, not just a one-off manual check.",
        "SaaSの真新しいユーザーはデータがなく、画面は冷たい空の表ではなく「最初のプロジェクトを作成」という案内を表示すべきです。実バックエンドでは、本当に空のアカウントを作るのは手間です。空配列の応答をスタブすれば即座に解決します。アプリがクラッシュせず、表を隠し、CTAボタン付きの適切な励ましメッセージを表示するとアサートできます。空状態はオンボーディング体験の重要な接点であり、一度きりの手動確認ではなく自動テストに値します。"
      ),
      CODE("js", `it('hiện hướng dẫn khi chưa có dự án', () => {
  cy.intercept('GET', '**/api/projects*', { body: [] }).as('empty');
  cy.visit('/dashboard');
  cy.wait('@empty');
  cy.get('[data-cy="project-row"]').should('not.exist');
  cy.contains('Tạo dự án đầu tiên').should('be.visible');
  cy.get('[data-cy="cta-create"]').should('be.enabled');
});`),
    ],
  },
  {
    heading: { vi: "8. Test trạng thái lỗi (error handling)", en: "8. Testing error states (error handling)", ja: "8. エラー状態のテスト" },
    blocks: [
      P(
        "Xử lý lỗi là dấu hiệu phần mềm trưởng thành, nhưng lại khó test vì bạn không muốn backend thật hỏng. cy.intercept cho bạn giả lập mọi loại lỗi: 500 server error, 401 hết phiên, hay thậm chí lỗi mạng hoàn toàn bằng forceNetworkError. Test khẳng định app không trắng màn hình mà hiện thông báo lỗi thân thiện và nút 'Thử lại'. Bạn cũng nên kiểm luồng phục hồi: sau khi bấm thử lại, nếu request lần hai thành công thì dữ liệu phải hiện ra. Đây là kịch bản mà kiểm thủ công gần như không bao giờ chạm tới đủ.",
        "Error handling marks mature software but is hard to test because you don't want the real backend to fail. cy.intercept lets you simulate every kind of failure: 500 server error, 401 expired session, or even a total network failure via forceNetworkError. The test asserts the app doesn't go blank but shows a friendly error message and a 'Retry' button. You should also check the recovery flow: after clicking retry, if the second request succeeds, the data must appear. This is a scenario manual testing almost never covers thoroughly.",
        "エラー処理は成熟したソフトウェアの証ですが、実バックエンドを壊したくないためテストが難しいです。cy.interceptはあらゆる失敗を模擬できます。500サーバーエラー、401セッション切れ、さらにforceNetworkErrorで完全なネットワーク障害まで。テストはアプリが白画面にならず、親しみやすいエラーメッセージと「再試行」ボタンを表示するとアサートします。回復フローも確認すべきです。再試行後、2回目の要求が成功すればデータが表示されねばなりません。これは手動テストがほぼ十分に網羅しないシナリオです。"
      ),
      CODE("js", `it('hiện lỗi rồi phục hồi khi thử lại', () => {
  cy.intercept('GET', '**/api/projects*', { statusCode: 500 }).as('fail');
  cy.visit('/dashboard');
  cy.wait('@fail');
  cy.contains('Có lỗi xảy ra').should('be.visible');

  // lần thử lại: đổi handler sang thành công
  cy.intercept('GET', '**/api/projects*', { fixture: 'projects.json' }).as('ok');
  cy.get('[data-cy="retry"]').click();
  cy.wait('@ok');
  cy.get('[data-cy="project-row"]').should('have.length.greaterThan', 0);
});`),
    ],
  },
  {
    heading: { vi: "9. Spy: theo dõi request thật", en: "9. Spy: observing real requests", ja: "9. スパイ: 実際の要求を観測" },
    blocks: [
      P(
        "Không phải lúc nào cũng nên stub. Đôi khi bạn muốn request đi tới backend thật (ví dụ trong test tích hợp) nhưng vẫn cần assert nó đã xảy ra đúng cách. Đó là chế độ spy: gọi cy.intercept chỉ với route và alias, không kèm handler trả dữ liệu. Request vẫn chạy bình thường, Cypress chỉ đứng quan sát. Bạn dùng nó để xác nhận app phát đúng số lần gọi analytics, gửi đúng header xác thực, hay không gọi thừa endpoint tốn kém. Spy là công cụ tinh tế để kiểm hành vi mạng mà không thay đổi dữ liệu thực tế.",
        "You shouldn't always stub. Sometimes you want the request to reach the real backend (e.g. in integration tests) but still need to assert it happened correctly. That's spy mode: call cy.intercept with only the route and alias, no data-returning handler. The request runs normally; Cypress just observes. Use it to confirm the app fires the right number of analytics calls, sends the correct auth header, or doesn't over-call an expensive endpoint. Spy is a subtle tool to check network behavior without altering real data.",
        "常にスタブすべきではありません。時には要求を実バックエンドに届けたい（例えば統合テスト）が、正しく起きたとアサートしたい場合があります。それがスパイモードです。cy.interceptをルートとエイリアスだけで呼び、データを返すハンドラーは付けません。要求は通常どおり実行され、Cypressは観測するだけです。アプリが正しい回数の分析呼び出しを行い、正しい認証ヘッダーを送り、高価なエンドポイントを過剰に呼ばないと確認するのに使います。スパイは実データを変えずにネットワーク挙動を確認する繊細なツールです。"
      ),
      CODE("js", `// KHÔNG có handler trả data => spy, request đi thật
cy.intercept('POST', '**/api/analytics').as('track');
cy.get('[data-cy="buy"]').click();
cy.wait('@track').its('request.body.event').should('eq', 'purchase');

// dùng cy.get('@track.all') để đếm số lần gọi
cy.get('@track.all').should('have.length', 1);`),
    ],
  },
  {
    heading: { vi: "10. Sửa đổi response động (req.reply)", en: "10. Dynamically modifying responses (req.reply)", ja: "10. 応答の動的変更（req.reply）" },
    blocks: [
      P(
        "cy.intercept còn cho phép truyền một hàm callback để can thiệp động vào từng request/response. Trong callback bạn nhận đối tượng req, có thể đọc và sửa header, body, rồi gọi req.continue() để đi tiếp và chỉnh response thật, hoặc req.reply() để tự trả. Kỹ thuật này hữu ích khi bạn muốn giữ phần lớn dữ liệu thật nhưng ép một trường cụ thể, ví dụ luôn đặt trạng thái gói cước thành 'trial' để test banner nâng cấp, mà không cần dựng cả tài khoản trial. Đây là mức kiểm soát tinh vi nhất của intercept.",
        "cy.intercept also lets you pass a callback function to dynamically intervene on each request/response. In the callback you receive the req object, can read and modify headers and body, then call req.continue() to proceed and tweak the real response, or req.reply() to answer yourself. This technique helps when you want to keep most real data but force one specific field — e.g. always set plan status to 'trial' to test the upgrade banner, without provisioning a whole trial account. This is intercept's most refined level of control.",
        "cy.interceptはコールバック関数を渡し、各要求/応答へ動的に介入することもできます。コールバックでreqオブジェクトを受け取り、ヘッダーやボディを読み書きし、req.continue()で進めて実応答を調整するか、req.reply()で自ら応答します。この手法は、大半の実データを保ちつつ特定フィールドだけを強制したいときに有用です。例えばアップグレードバナーをテストするため、トライアルアカウントを用意せずにプラン状態を常に「trial」に設定します。これがinterceptの最も洗練された制御レベルです。"
      ),
      CODE("js", `cy.intercept('GET', '**/api/me', (req) => {
  req.continue((res) => {
    res.body.plan = 'trial';        // ép field, giữ phần còn lại thật
    res.body.trialDaysLeft = 2;
  });
}).as('me');
cy.visit('/settings');
cy.wait('@me');
cy.contains('Còn 2 ngày dùng thử').should('be.visible');`),
      WARN(
        "Đừng lạm dụng stub tới mức test không còn chạm backend thật ở đâu. Cân bằng: nhiều test UI dùng stub cho nhanh và xác định, một số test tích hợp then chốt vẫn nên đi thật để bắt lỗi hợp đồng API.",
        "Don't over-stub to the point tests never touch the real backend. Balance: many UI tests use stubs for speed and determinism, while a few key integration tests still go real to catch API contract breaks.",
        "テストが実バックエンドに一切触れないほどスタブを乱用してはいけません。バランスが大切です。多くのUIテストは速度と確定性のためスタブを使い、いくつかの重要な統合テストは実通信でAPI契約の破綻を捕まえます。"
      ),
    ],
  },
  {
    heading: { vi: "11. Kịch bản thực chiến: dashboard SaaS đa trạng thái", en: "11. Real-world scenario: multi-state SaaS dashboard", ja: "11. 実戦シナリオ: 多状態のSaaSダッシュボード" },
    blocks: [
      SCEN(
        "Phủ đầy đủ trạng thái cho trang dự án",
        "Full state coverage for the projects page",
        "Đội QA của một SaaS quản lý dự án phải đảm bảo trang /dashboard hoạt động đúng ở mọi trạng thái. Họ viết một file test dùng cy.intercept để dựng lần lượt: có dữ liệu, rỗng, lỗi 500, mạng chết, và tải chậm. Nhờ đó bốn trạng thái vốn khó tái tạo với backend thật được kiểm tự động mỗi lần CI chạy. Khi frontend refactor component bảng, bộ test này bắt ngay hồi quy ở trạng thái rỗng mà trước kia hay bị bỏ sót.",
        "The QA team of a project-management SaaS must ensure /dashboard works correctly in every state. They write one test file using cy.intercept to build in turn: with data, empty, 500 error, dead network, and slow load. Thus four states hard to reproduce with a real backend are checked automatically on every CI run. When the frontend refactors the table component, this suite immediately catches a regression in the empty state that used to be missed.",
        "多状態を網羅するプロジェクトページ",
        "プロジェクト管理SaaSのQAチームは、/dashboardがあらゆる状態で正しく動くと保証せねばなりません。彼らはcy.interceptを使う1つのテストファイルを書き、順に構築します。データあり、空、500エラー、ネットワーク断、低速読み込み。これにより実バックエンドでは再現しにくい4状態が、CI実行ごとに自動確認されます。フロントエンドが表コンポーネントをリファクタすると、このスイートは以前は見落とされがちだった空状態の回帰を即座に捕まえます。"
      ),
      QA(
        "Khác nhau giữa stub và spy trong cy.intercept là gì?",
        "What's the difference between stub and spy in cy.intercept?",
        "Stub trả về response giả do bạn định nghĩa, request KHÔNG đi tới server; dùng để dựng trạng thái xác định. Spy chỉ theo dõi, request VẪN đi thật; dùng để assert app đã gọi đúng mà không đổi dữ liệu. Phân biệt: có handler trả data = stub, chỉ route+alias = spy.",
        "Stub returns a fake response you define; the request does NOT reach the server — used to build deterministic states. Spy only observes; the request DOES go through — used to assert the app called correctly without altering data. Rule: with a data-returning handler = stub, only route+alias = spy.",
        "スタブは自分が定義した偽の応答を返し、要求はサーバーへ届きません。確定的な状態の構築に使います。スパイは観測のみで、要求は実通信します。データを変えずにアプリが正しく呼んだとアサートするのに使います。見分け方: データを返すハンドラーあり=スタブ、ルート+エイリアスのみ=スパイ。",
        "ネットワークインターセプトにおけるスタブとスパイの違いは何ですか。"
      ),
    ],
  },
  {
    heading: { vi: "12. CI, phỏng vấn & tổng kết", en: "12. CI, interview & summary", ja: "12. CI・面接・まとめ" },
    blocks: [
      P(
        "Trong CI, các test dùng intercept chạy nhanh và ổn định vì không phụ thuộc backend thật hay dữ liệu server đang đổi. Bạn nên gom các fixture vào git để mọi máy chạy giống nhau, và tách rõ 'suite stub' (nhanh, chạy mọi PR) với 'suite tích hợp' (đi thật, chạy trước release). Khi test fail trong CI, hãy nhìn interception object trong log để biết app đã gọi endpoint nào với payload gì — thường bug lộ ngay ở đó. Quản lý network tốt là kỹ năng tách biệt tester giỏi với tester trung bình vì nó mở ra khả năng test những gì UI đơn thuần không chạm tới.",
        "In CI, intercept-based tests run fast and stable because they don't depend on the real backend or changing server data. Commit fixtures to git so every machine runs identically, and clearly separate the 'stub suite' (fast, on every PR) from the 'integration suite' (real, before release). When a test fails in CI, inspect the interception object in the log to see which endpoint the app called with what payload — the bug often surfaces right there. Good network management is a skill that separates strong testers from average ones because it opens up testing what the UI alone can't reach.",
        "CIでは、intercept利用のテストは実バックエンドや変化するサーバーデータに依存しないため、速く安定して動きます。フィクスチャをgitにコミットしてどのマシンでも同一に動くようにし、「スタブスイート」（高速、全PRで実行）と「統合スイート」（実通信、リリース前）を明確に分けます。CIでテストが失敗したら、ログのインターセプションオブジェクトを調べ、アプリがどのエンドポイントをどんなペイロードで呼んだか確認します。バグはそこに現れることが多いです。優れたネットワーク管理は、UIだけでは届かないものをテストする道を開くため、優秀なテスターを平均的なテスターから分ける技能です。"
      ),
      QA(
        "Vì sao phải đặt cy.intercept trước cy.visit hoặc trước hành động?",
        "Why must cy.intercept come before cy.visit or the action?",
        "Vì intercept chỉ bắt các request xảy ra SAU khi nó được khai báo. Nếu app đã gửi request lúc tải trang mà bạn intercept sau, request đó đã bay đi và alias không bao giờ match, khiến cy.wait('@alias') timeout.",
        "Because intercept only catches requests that happen AFTER it's declared. If the app already sent a request on page load and you intercept afterward, that request has left and the alias never matches, making cy.wait('@alias') time out.",
        "interceptは宣言されたに起きた要求だけを捕捉するからです。アプリがページ読み込み時に既に要求を送り、後から傍受すると、その要求は送信済みでエイリアスがマッチせず、cy.wait('@alias')がタイムアウトします。",
        "ネットワークインターセプトを宣言する順序が重要なのはなぜですか。"
      ),
      QA(
        "Làm sao assert app gửi đúng payload trong request?",
        "How do you assert the app sends the right payload?",
        "cy.wait('@alias') trả về đối tượng interception; trong .then() bạn đọc request.body và dùng expect để kiểm các trường. Đây là cách bắt lỗi tham số sai mà nhìn UI không thấy.",
        "cy.wait('@alias') returns the interception object; in .then() you read request.body and use expect to check fields. This catches wrong-param bugs invisible from the UI.",
        "cy.wait('@alias')はインターセプションオブジェクトを返します。.then()内でrequest.bodyを読み、expectでフィールドを検証します。UIからは見えない誤パラメータのバグを捕まえられます。",
        "アサーションで送信ペイロードを検証する方法を教えてください。"
      ),
      P(
        "Tổng kết: cy.intercept là chìa khoá để test SPA một cách xác định và toàn diện. Nắm ba chế độ (stub, spy, sửa động), biết dùng alias + cy.wait để đồng bộ chính xác, tận dụng fixtures để quản lý dữ liệu, và luôn phủ đủ bốn trạng thái loading/empty/error/success. Cân bằng giữa stub cho tốc độ và tích hợp thật cho niềm tin. Với những kỹ thuật này, bộ test của bạn không chỉ kiểm 'app có chạy' mà còn kiểm 'app xử lý đúng mọi tình huống mạng'.",
        "Summary: cy.intercept is the key to testing SPAs deterministically and comprehensively. Master the three modes (stub, spy, dynamic edit), use alias + cy.wait to sync precisely, leverage fixtures to manage data, and always cover the four loading/empty/error/success states. Balance stubbing for speed against real integration for confidence. With these techniques, your suite doesn't just check 'the app runs' but 'the app handles every network situation correctly'.",
        "まとめ: cy.interceptは、SPAを確定的かつ包括的にテストする鍵です。3つのモード（スタブ・スパイ・動的編集）を習得し、エイリアス+cy.waitで正確に同期し、フィクスチャでデータを管理し、常にloading/empty/error/successの4状態を網羅しましょう。速度のためのスタブと、信頼のための実統合のバランスを取ります。これらの技術により、スイートは「アプリが動く」だけでなく「アプリがあらゆるネットワーク状況を正しく処理する」ことを検証します。"
      ),
    ],
  },
];

// ===========================================================================
// BÀI 3 — Component testing + CI song song (advanced)
// ===========================================================================
const pages3 = [
  {
    heading: { vi: "1. Component testing là gì và vì sao cần", en: "1. What component testing is and why you need it", ja: "1. コンポーネントテストとは何か、なぜ必要か" },
    blocks: [
      P(
        "Component testing là kiểm thử từng thành phần UI một cách cô lập, mount nó thật trong trình duyệt thay vì render cả ứng dụng như E2E. Với một fintech dashboard có hàng trăm component — nút, form nhập tiền, biểu đồ, bảng giao dịch — test E2E cho mọi tổ hợp trạng thái là quá đắt và chậm. Cypress Component Testing lấp khoảng trống giữa unit test (nhanh nhưng không render thật) và E2E (thật nhưng chậm): bạn mount một component với props cụ thể, tương tác thật, và assert bằng đúng API cy quen thuộc. Phản hồi dưới một giây khiến vòng lặp phát triển UI cực nhanh, vì bạn không phải khởi động cả backend hay điều hướng qua nhiều màn hình chỉ để chạm tới một khối nhỏ. Điều này đặc biệt giá trị trong fintech, nơi một component số dư có thể phải hiển thị đúng ở hàng chục biến thể như số âm, số rất lớn, đơn vị tiền khác nhau hay trạng thái đang đồng bộ. Với E2E, dựng đủ những tình huống ấy vừa tốn công vừa mong manh; với component test, bạn chỉ cần truyền props tương ứng là có ngay trạng thái cần kiểm.",
        "Component testing checks each UI component in isolation, mounting it for real in the browser rather than rendering the whole app like E2E. For a fintech dashboard with hundreds of components — buttons, money-input forms, charts, transaction tables — E2E for every state combination is too expensive and slow. Cypress Component Testing fills the gap between unit tests (fast but no real render) and E2E (real but slow): you mount a component with specific props, interact for real, and assert with the same familiar cy API. Sub-second feedback makes the UI development loop extremely fast.",
        "コンポーネントテストは、各UIコンポーネントを孤立して検証し、E2Eのようにアプリ全体を描画するのではなく、ブラウザ内で実際にマウントします。ボタン・金額入力フォーム・グラフ・取引表など数百のコンポーネントを持つフィンテックのダッシュボードでは、あらゆる状態の組み合わせをE2Eするのは高価で遅すぎます。Cypressコンポーネントテストは、ユニットテスト（速いが実描画なし）とE2E（実際だが遅い）の隙間を埋めます。特定のpropsでコンポーネントをマウントし、実際に操作し、慣れ親しんだ同じcy APIでアサートします。1秒未満のフィードバックがUI開発ループを極めて高速にします。"
      ),
      IMG(SVG_COMP, "Component test: mount component thật, tương tác, assert như e2e.", "Component test: mount a real component, interact, assert like e2e.", "コンポーネントテスト: 実コンポーネントをマウントし、操作し、e2eのようにアサートします。"),
      UL(
        ["Cô lập: test 1 component với props/context tự chọn.", "Render thật trong browser qua Vite/webpack dev server.", "Dùng cùng API cy: get, click, type, intercept, assertion.", "Nhanh hơn E2E nhiều, dễ dựng edge case."],
        ["Isolation: test one component with chosen props/context.", "Real render in the browser via Vite/webpack dev server.", "Same cy API: get, click, type, intercept, assertions.", "Much faster than E2E, edge cases easy to set up."],
        ["孤立: 選んだprops/contextで1コンポーネントをテストします。", "Vite/webpack開発サーバー経由でブラウザ内で実描画します。", "同じcy API: get・click・type・intercept・アサーション。", "E2Eよりはるかに速く、エッジケースを構築しやすいです。"]
      ),
    ],
  },
  {
    heading: { vi: "2. Cài đặt Component Testing (React)", en: "2. Setting up Component Testing (React)", ja: "2. コンポーネントテストの設定（React）" },
    blocks: [
      P(
        "Cấu hình component testing khai báo trong cùng cypress.config.js nhưng ở khối component. Bạn chọn framework (react, vue, angular, svelte) và bundler (vite hoặc webpack) để Cypress dựng dev server render component. Cypress cung cấp lệnh cy.mount thông qua adapter cypress/react (hoặc cypress/vue...). Với dự án React + Vite, cấu hình rất gọn. Sau đó bạn khai báo cy.mount trong file support component để dùng chung. Điểm mạnh là component test tái sử dụng đúng cấu hình build của app thật, nên component render giống hệt môi trường production.",
        "Component testing config lives in the same cypress.config.js but under the component block. You pick a framework (react, vue, angular, svelte) and a bundler (vite or webpack) so Cypress spins up a dev server to render components. Cypress provides the cy.mount command via the cypress/react adapter (or cypress/vue...). For a React + Vite project the config is compact. You then declare cy.mount in the component support file for shared use. The strength is that component tests reuse the app's real build config, so components render exactly like the production environment.",
        "コンポーネントテストの設定は同じcypress.config.js内のcomponentブロックに置きます。フレームワーク（react・vue・angular・svelte）とバンドラー（viteまたはwebpack）を選ぶと、Cypressがコンポーネントを描画する開発サーバーを起動します。Cypressはcypress/reactアダプター（またはcypress/vueなど）経由でcy.mountコマンドを提供します。React + Viteプロジェクトでは設定は簡潔です。次にコンポーネントのサポートファイルでcy.mountを宣言し共用します。強みは、コンポーネントテストがアプリの実ビルド設定を再利用するため、コンポーネントが本番環境と全く同じように描画される点です。"
      ),
      CODE("js", `// cypress.config.js — thêm khối component
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
});`),
      CODE("js", `// cypress/support/component.js
import { mount } from 'cypress/react';
Cypress.Commands.add('mount', mount);
// giờ dùng cy.mount(<Component/>) trong mọi test`),
    ],
  },
  {
    heading: { vi: "3. cy.mount: render component với props", en: "3. cy.mount: rendering a component with props", ja: "3. cy.mount: propsを指定してコンポーネントを描画" },
    blocks: [
      P(
        "Lệnh cy.mount đặt component vào cây DOM thật của Cypress. Bạn truyền props như khi dùng component trong app, kể cả callback để spy sự kiện. Sau khi mount, bạn dùng đúng cy.get, click, type và assertion như E2E — kèm đầy đủ retry-ability. Ví dụ với component nút thanh toán của fintech: mount với nhãn và trạng thái disabled, rồi kiểm hiển thị; mount với onClick là một cy.spy để xác nhận nút gọi handler đúng một lần khi bấm. Vì component render thật, bạn bắt được cả lỗi CSS, lỗi điều kiện hiển thị, lẫn lỗi logic sự kiện.",
        "The cy.mount command places the component into Cypress's real DOM tree. You pass props just like using the component in the app, including callbacks to spy on events. After mounting, you use the same cy.get, click, type and assertions as E2E — with full retry-ability. For example a fintech pay-button component: mount with a label and disabled state, then check rendering; mount with onClick as a cy.spy to confirm the button calls the handler exactly once on click. Because the component renders for real, you catch CSS bugs, conditional-display bugs, and event-logic bugs alike.",
        "cy.mountコマンドはコンポーネントをCypressの実DOMツリーに配置します。アプリでコンポーネントを使うときと同様にpropsを渡し、イベントをスパイするコールバックも含められます。マウント後はE2Eと同じcy.get・click・type・アサーションを、完全なリトライ性付きで使います。例えばフィンテックの決済ボタンコンポーネント: ラベルとdisabled状態でマウントして描画を確認し、onClickをcy.spyにしてマウントし、クリック時にハンドラーがちょうど1回呼ばれると確認します。コンポーネントが実際に描画されるため、CSSのバグ・条件表示のバグ・イベントロジックのバグをすべて捕まえられます。"
      ),
      CODE("jsx", `import PayButton from './PayButton';

it('gọi onPay đúng 1 lần khi bấm', () => {
  const onPay = cy.spy().as('onPay');
  cy.mount(<PayButton amount={500000} onPay={onPay} />);
  cy.contains('button', 'Thanh toán 500.000đ').click();
  cy.get('@onPay').should('have.been.calledOnce');
});

it('disabled khi số tiền = 0', () => {
  cy.mount(<PayButton amount={0} onPay={cy.spy()} />);
  cy.get('button').should('be.disabled');
});`),
    ],
  },
  {
    heading: { vi: "4. Custom commands: tái dùng logic test", en: "4. Custom commands: reusing test logic", ja: "4. カスタムコマンド: テストロジックの再利用" },
    blocks: [
      P(
        "Khi nhiều test lặp lại cùng chuỗi bước, bạn nên đóng gói thành lệnh tuỳ biến qua Cypress.Commands.add. Lệnh này trở thành cy.tenLenh dùng được ở mọi nơi, giúp test ngắn gọn và ý định rõ ràng. Trong fintech, các thao tác như đăng nhập, chọn ví, hay điền form chuyển tiền lặp đi lặp lại; gói chúng thành cy.login, cy.pickWallet giúp giảm trùng lặp và khi luồng đổi bạn chỉ sửa một chỗ. Với TypeScript, bạn khai báo kiểu cho lệnh để có gợi ý. Custom command là nền tảng để giữ bộ test lớn dễ bảo trì.",
        "When many tests repeat the same steps, wrap them into a custom command via Cypress.Commands.add. It becomes cy.myCommand usable everywhere, keeping tests short and intent clear. In fintech, operations like logging in, picking a wallet, or filling a transfer form recur; packaging them as cy.login, cy.pickWallet reduces duplication, and when a flow changes you fix one place. With TypeScript, declare types for the command to get IntelliSense. Custom commands are the foundation for keeping a large suite maintainable.",
        "多くのテストが同じ手順を繰り返すなら、Cypress.Commands.add経由でカスタムコマンドにまとめます。それはどこでも使えるcy.myCommandとなり、テストを短く意図を明確に保ちます。フィンテックでは、ログイン・ウォレット選択・送金フォーム入力などの操作が繰り返されます。それらをcy.login・cy.pickWalletとしてまとめると重複が減り、フロー変更時は1箇所を直すだけです。TypeScriptではコマンドの型を宣言して補完を得ます。カスタムコマンドは大規模スイートを保守しやすく保つ基盤です。"
      ),
      CODE("js", `// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {          // cache phiên (mục 5)
    cy.visit('/login');
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').type(password, { log: false });
    cy.get('[data-cy="submit"]').click();
    cy.location('pathname').should('eq', '/');
  });
});
// dùng: cy.login('qa@fin.vn', 'Secret123');`),
    ],
  },
  {
    heading: { vi: "5. cy.session: tái dùng phiên đăng nhập", en: "5. cy.session: reusing login sessions", ja: "5. cy.session: ログインセッションの再利用" },
    blocks: [
      P(
        "Đăng nhập lại ở mỗi test rất tốn thời gian, đặc biệt khi có hàng trăm test. cy.session giải quyết bằng cách chạy logic đăng nhập một lần rồi cache toàn bộ cookie, localStorage, sessionStorage dưới một khoá. Ở các test sau có cùng khoá, Cypress khôi phục phiên đã cache ngay lập tức thay vì đăng nhập lại. Điều này cắt giảm đáng kể thời gian chạy, nhất là trong fintech nơi đăng nhập có thể qua OTP hay nhiều bước. Bạn có thể thêm hàm validate để Cypress tự kiểm phiên cache còn hợp lệ không, nếu hết hạn thì tự đăng nhập lại.",
        "Logging in on every test wastes time, especially with hundreds of tests. cy.session solves it by running login logic once then caching all cookies, localStorage and sessionStorage under a key. In later tests with the same key, Cypress restores the cached session instantly instead of re-logging in. This cuts run time significantly, especially in fintech where login may involve OTP or multiple steps. You can add a validate function so Cypress checks whether the cached session is still valid, re-logging in if expired.",
        "テストごとにログインし直すのは、特に数百のテストがあると時間を浪費します。cy.sessionは、ログインロジックを一度実行し、すべてのcookie・localStorage・sessionStorageをキーの下にキャッシュして解決します。同じキーの後続テストでは、Cypressは再ログインせずキャッシュ済みセッションを即座に復元します。これは、ログインがOTPや複数ステップを伴うフィンテックで特に実行時間を大きく削減します。validate関数を追加すれば、Cypressはキャッシュ済みセッションがまだ有効か確認し、期限切れなら再ログインします。"
      ),
      CODE("js", `Cypress.Commands.add('login', (email, password) => {
  cy.session(
    email,                                  // khoá cache
    () => {                                 // logic tạo phiên
      cy.request('POST', '/api/login', { email, password })
        .then(({ body }) => {
          window.localStorage.setItem('token', body.token);
        });
    },
    { validate() {                          // kiểm phiên còn sống
        cy.request('/api/me').its('status').should('eq', 200);
      } }
  );
});`),
      TIP(
        "Đăng nhập qua cy.request thay vì bấm form trong cy.session giúp nhanh hơn nhiều và không phụ thuộc UI login — lý tưởng cho khâu chuẩn bị trạng thái.",
        "Logging in via cy.request instead of clicking the form inside cy.session is much faster and independent of the login UI — ideal for state setup.",
        "cy.session内でフォームをクリックする代わりにcy.requestでログインすると、はるかに速くログインUIに依存しません。状態準備に理想的です。"
      ),
    ],
  },
  {
    heading: { vi: "6. Chạy headless trong CI", en: "6. Running headless in CI", ja: "6. CIでのヘッドレス実行" },
    blocks: [
      P(
        "Trong pipeline CI, bạn chạy Cypress ở chế độ headless bằng cypress run — không mở cửa sổ, ghi video và screenshot khi lỗi. Bạn cần khởi động server app trước rồi mới chạy test; công cụ như start-server-and-test giúp điều phối việc này gọn gàng. Với GitHub Actions, có sẵn action chính thức cypress-io/github-action lo cả cài đặt, cache và chạy. Điều quan trọng là môi trường CI phải xác định: cùng phiên bản Node, cùng browser, cùng biến môi trường. Ghi lại artifact video/screenshot để chẩn đoán lỗi mà không cần chạy lại tại máy.",
        "In the CI pipeline, you run Cypress headless with cypress run — no window, recording video and screenshots on failure. You need to start the app server first, then run tests; tools like start-server-and-test orchestrate this cleanly. For GitHub Actions there's the official cypress-io/github-action handling install, cache and run. The key is that the CI environment must be deterministic: same Node version, same browser, same env vars. Store video/screenshot artifacts to diagnose failures without rerunning locally.",
        "CIパイプラインでは、cypress runでCypressをヘッドレス実行します。ウィンドウを開かず、失敗時にビデオとスクリーンショットを記録します。まずアプリサーバーを起動してからテストを実行する必要があり、start-server-and-testのようなツールがこれをきれいに調整します。GitHub Actionsには公式のcypress-io/github-actionがあり、インストール・キャッシュ・実行を担います。重要なのはCI環境が確定的であることです。同じNodeバージョン、同じブラウザ、同じ環境変数。ビデオ/スクリーンショットのアーティファクトを保存し、ローカルで再実行せず失敗を診断します。"
      ),
      CODE("yaml", `# .github/workflows/e2e.yml
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm run preview          # khởi động app
          wait-on: 'http://localhost:4173' # chờ server sẵn sàng
          browser: chrome`),
    ],
  },
  {
    heading: { vi: "7. Song song hoá với Cypress Cloud", en: "7. Parallelization with Cypress Cloud", ja: "7. Cypress Cloudによる並列化" },
    blocks: [
      P(
        "Khi bộ test lớn tới hàng trăm spec, chạy tuần tự trên một máy quá lâu. Cypress hỗ trợ chạy song song: nhiều máy CI cùng chạy, và Cypress Cloud phân bổ các file spec cho từng máy sao cho cân bằng tải, giảm tổng thời gian gần như tuyến tính theo số máy. Bạn bật bằng cờ --record --parallel cùng một record key. Cloud dùng dữ liệu lịch sử về thời lượng mỗi spec để chia thông minh, tránh cảnh một máy ôm hết spec chậm. Kết quả gộp lại thành một dashboard duy nhất với video, screenshot và phân tích. Đây là cách đội lớn giữ vòng feedback CI dưới ngưỡng chấp nhận được.",
        "When a suite grows to hundreds of specs, running sequentially on one machine is too slow. Cypress supports parallel runs: multiple CI machines run together, and Cypress Cloud distributes spec files across them to balance load, cutting total time almost linearly with machine count. You enable it with --record --parallel and a shared record key. Cloud uses historical per-spec duration data to split intelligently, avoiding one machine hogging all the slow specs. Results merge into a single dashboard with video, screenshots and analytics. This is how large teams keep the CI feedback loop under an acceptable threshold.",
        "スイートが数百のspecに膨らむと、1台で逐次実行するのは遅すぎます。Cypressは並列実行に対応します。複数のCIマシンが同時に走り、Cypress Cloudがspecファイルを各マシンに配分して負荷を分散し、総時間をマシン数にほぼ比例して削減します。--record --parallelと共有record keyで有効化します。Cloudはspecごとの過去の所要時間データを使って賢く分割し、1台が遅いspecを抱え込むのを避けます。結果はビデオ・スクリーンショット・分析付きの単一ダッシュボードに統合されます。これが大規模チームがCIフィードバックループを許容範囲に保つ方法です。"
      ),
      IMG(SVG_CI, "CI song song: Cloud chia spec cho nhiều runner rồi gộp kết quả.", "Parallel CI: Cloud splits specs across runners then merges results.", "並列CI: Cloudがspecを複数ランナーへ分割し結果を統合します。"),
      CODE("bash", `# 3 máy CI cùng chạy, dùng chung recordKey và ciBuildId
npx cypress run --record --parallel \\
  --key $CYPRESS_RECORD_KEY \\
  --ci-build-id $GITHUB_RUN_ID \\
  --browser chrome`),
    ],
  },
  {
    heading: { vi: "8. Kiểm soát flaky test", en: "8. Controlling flaky tests", ja: "8. フレーキーテストの制御" },
    blocks: [
      P(
        "Flaky là test lúc pass lúc fail dù code không đổi — kẻ thù của niềm tin vào CI. Nguyên nhân thường là chờ đợi sai (cy.wait cứng), phụ thuộc thứ tự, dữ liệu chung bị test khác đụng, hay hiệu ứng animation. Cypress giúp bằng auto-wait vốn đã giảm nhiều flake, và cung cấp test retries: cấu hình để một test fail được chạy lại vài lần trước khi coi là fail thật, phân biệt lỗi thật với chập chờn thoáng qua. Nhưng retry chỉ là băng cứu thương; gốc rễ vẫn phải sửa. Cypress Cloud còn tự phát hiện và gắn cờ test flaky dựa trên lịch sử để bạn ưu tiên xử lý.",
        "Flaky tests pass and fail without code changes — the enemy of CI trust. Common causes are wrong waiting (hard cy.wait), order dependence, shared data touched by other tests, or animations. Cypress helps via auto-wait, which already reduces much flake, and offers test retries: configure a failed test to rerun a few times before being deemed a real failure, separating real bugs from transient flakiness. But retries are just a bandage; the root cause must still be fixed. Cypress Cloud also auto-detects and flags flaky tests based on history so you can prioritize fixing them.",
        "フレーキーテストはコード変更なしに合格したり失敗したりし、CIの信頼の敵です。よくある原因は誤った待機（固定のcy.wait）、順序依存、他テストに触られる共有データ、アニメーションです。Cypressは自動待機で多くのフレークを減らし、テストリトライも提供します。失敗したテストを本当の失敗とみなすに数回再実行するよう設定し、実バグとつかの間のフレーキーさを区別します。ただしリトライは絆創膏にすぎず、根本原因は修正すべきです。Cypress Cloudは履歴に基づきフレーキーテストを自動検出し印を付けるため、修正の優先順位を決められます。"
      ),
      CODE("js", `// cypress.config.js — retry: 2 lần trong CI, 0 lần khi dev
module.exports = defineConfig({
  retries: { runMode: 2, openMode: 0 },
  e2e: { /* ... */ },
});`),
      WARN(
        "Đừng dùng retries để che flake mãi mãi. Hãy coi mỗi test phải retry là một cảnh báo cần điều tra: thường là chờ sai hoặc phụ thuộc trạng thái chưa cô lập.",
        "Don't use retries to hide flake forever. Treat every test that needs a retry as a warning to investigate: usually wrong waiting or un-isolated state dependence.",
        "リトライでフレークを永遠に隠してはいけません。リトライを要する各テストは調査すべき警告と捉えます。多くは誤った待機か、孤立していない状態依存です。"
      ),
    ],
  },
  {
    heading: { vi: "9. Báo cáo & Test Replay", en: "9. Reporting & Test Replay", ja: "9. レポートとTest Replay" },
    blocks: [
      P(
        "Báo cáo tốt biến kết quả test thành hành động. Cho terminal/CI, bạn có thể dùng reporter như mochawesome sinh HTML/JSON đẹp, hoặc junit để tích hợp với hệ thống CI. Cypress Cloud nâng cấp trải nghiệm này lên: mỗi lần chạy tạo dashboard với video từng test, screenshot lúc fail, và biểu đồ xu hướng theo thời gian. Tính năng Test Replay cho phép bạn tua lại chính xác trạng thái DOM, console, và network của lần chạy CI ngay trên trình duyệt, như thể bạn đang debug tại chỗ — giải quyết nỗi đau kinh điển 'trên máy tôi chạy được'. Với fintech nơi mỗi lỗi có thể ảnh hưởng tiền bạc, khả năng truy vết này là vô giá.",
        "Good reporting turns test results into action. For terminal/CI, you can use a reporter like mochawesome for nice HTML/JSON, or junit to integrate with CI systems. Cypress Cloud levels this up: each run produces a dashboard with per-test video, failure screenshots, and trend charts over time. The Test Replay feature lets you replay the exact DOM, console and network state of a CI run right in the browser, as if debugging live — solving the classic 'works on my machine' pain. For fintech, where each bug can affect money, this traceability is invaluable.",
        "良いレポートはテスト結果を行動に変えます。ターミナル/CIには、きれいなHTML/JSONを生成するmochawesomeや、CIシステムと統合するjunitのようなレポーターを使えます。Cypress Cloudはこれを引き上げます。各実行はテストごとのビデオ、失敗時のスクリーンショット、時系列の傾向グラフを持つダッシュボードを生成します。Test Replay機能では、CI実行時の正確なDOM・コンソール・ネットワーク状態をブラウザ上で再生でき、ライブでデバッグするかのようで、「私のマシンでは動く」という古典的な痛みを解決します。各バグが金銭に影響しうるフィンテックでは、この追跡性は計り知れません。"
      ),
      CODE("bash", `npm install -D mochawesome
npx cypress run \\
  --reporter mochawesome \\
  --reporter-options reportDir=cypress/reports,html=true,json=true`),
    ],
  },
  {
    heading: { vi: "10. Chiến lược: E2E vs component vs unit", en: "10. Strategy: E2E vs component vs unit", ja: "10. 戦略: E2E vs コンポーネント vs ユニット" },
    blocks: [
      P(
        "Một chiến lược test trưởng thành phối hợp nhiều tầng theo kim tự tháp: nhiều unit test nhanh ở đáy, một lớp component test ở giữa, và ít E2E ở đỉnh phủ luồng quan trọng nhất. Cypress phục vụ tốt hai tầng trên. Component test bắt lỗi trong từng khối UI với chi phí thấp; E2E xác nhận các khối ghép lại chạy đúng luồng nghiệp vụ đầu-cuối. Với fintech, luồng chuyển tiền phải có E2E vì rủi ro cao, còn hàng chục biến thể hiển thị của component số dư thì để component test lo. Đừng dùng E2E để test mọi thứ — nó đắt và chậm; hãy đặt mỗi loại lỗi ở tầng test rẻ nhất bắt được nó.",
        "A mature test strategy combines layers in a pyramid: many fast unit tests at the base, a middle layer of component tests, and few E2E at the top covering the most critical flows. Cypress serves the top two layers well. Component tests catch bugs in each UI block cheaply; E2E confirms the blocks together run correct end-to-end business flows. For fintech, the transfer flow must have E2E because the risk is high, while dozens of display variants of a balance component are left to component tests. Don't use E2E to test everything — it's expensive and slow; place each bug class at the cheapest test layer that catches it.",
        "成熟したテスト戦略はピラミッド状に層を組み合わせます。底に多数の高速ユニットテスト、中間にコンポーネントテストの層、頂点に最重要フローを網羅する少数のE2E。Cypressは上位2層をよく担います。コンポーネントテストは各UIブロックのバグを低コストで捕まえ、E2Eはブロックを合わせて業務フローがエンドツーエンドで正しく動くと確認します。フィンテックでは、リスクが高いため送金フローにE2Eが必須ですが、残高コンポーネントの数十の表示バリエーションはコンポーネントテストに任せます。E2Eで何もかもテストしてはいけません。高価で遅いです。各バグ種を、それを捕まえられる最も安いテスト層に置きましょう。"
      ),
      UL(
        ["Unit: hàm/logic thuần, cực nhanh, nhiều nhất.", "Component (Cypress): 1 khối UI render thật, vừa nhanh vừa thật.", "E2E (Cypress): luồng nghiệp vụ then chốt, ít nhưng giá trị cao.", "Đặt mỗi loại lỗi ở tầng rẻ nhất bắt được nó."],
        ["Unit: pure functions/logic, very fast, most numerous.", "Component (Cypress): one UI block rendered for real, fast yet realistic.", "E2E (Cypress): critical business flows, few but high value.", "Put each bug class at the cheapest layer that catches it."],
        ["ユニット: 純粋な関数/ロジック、非常に速く、最も多い。", "コンポーネント（Cypress）: 実描画される1つのUIブロック、速くて現実的。", "E2E（Cypress）: 重要な業務フロー、少数だが価値が高い。", "各バグ種をそれを捕まえられる最も安い層に置く。"]
      ),
    ],
  },
  {
    heading: { vi: "11. Kịch bản thực chiến: pipeline fintech", en: "11. Real-world scenario: a fintech pipeline", ja: "11. 実戦シナリオ: フィンテックのパイプライン" },
    blocks: [
      SCEN(
        "Pipeline test cho ví điện tử",
        "Test pipeline for an e-wallet",
        "Một fintech ví điện tử có 250 E2E và 600 component test. Trên mỗi PR, component test và một tập E2E khói chạy trong ~4 phút nhờ chia 4 máy song song qua Cypress Cloud; cy.session tái dùng phiên nên không tốn thời gian đăng nhập lại. Trước release, toàn bộ E2E chạy với retries=2 và Test Replay bật để chẩn đoán nhanh. Cloud gắn cờ hai test flaky ở luồng nạp tiền; đội điều tra thấy do animation, sửa bằng chờ theo assertion thay vì thời gian. Tỉ lệ flake giảm còn 0.3%, đội deploy tự tin nhiều lần mỗi ngày.",
        "An e-wallet fintech has 250 E2E and 600 component tests. On each PR, component tests and a smoke E2E set run in ~4 minutes thanks to 4 parallel machines via Cypress Cloud; cy.session reuses sessions so no time is lost re-logging in. Before release, the full E2E set runs with retries=2 and Test Replay on for fast diagnosis. Cloud flags two flaky tests in the top-up flow; the team investigates, finds it's animation, and fixes by waiting on assertions instead of time. Flake drops to 0.3% and the team deploys confidently several times a day.",
        "電子ウォレットのテストパイプライン",
        "ある電子ウォレットのフィンテックは250のE2Eと600のコンポーネントテストを持ちます。各PRでは、Cypress Cloud経由の4台並列によりコンポーネントテストとスモークE2Eが約4分で走り、cy.sessionがセッションを再利用するため再ログインの時間を失いません。リリース前には全E2Eがretries=2とTest Replayを有効にして走り、迅速に診断します。Cloudはチャージフローの2つのフレーキーテストに印を付け、チームは調査してアニメーションが原因と分かり、時間ではなくアサーションで待つよう修正します。フレーキー率は0.3%に下がり、チームは1日に複数回自信を持ってデプロイします。"
      ),
      QA(
        "cy.session giúp gì và khi nào cache bị làm mới?",
        "What does cy.session do and when is the cache refreshed?",
        "cy.session chạy logic đăng nhập một lần rồi cache cookie/localStorage/sessionStorage theo khoá, các test sau khôi phục tức thì thay vì đăng nhập lại. Cache làm mới khi khoá đổi, hoặc khi hàm validate báo phiên không còn hợp lệ.",
        "cy.session runs login logic once then caches cookies/localStorage/sessionStorage by key; later tests restore instantly instead of re-logging in. The cache refreshes when the key changes or when the validate function reports the session invalid.",
        "cy.sessionはログインロジックを一度実行し、cookie/localStorage/sessionStorageをキーごとにキャッシュします。後続テストは再ログインせず即座に復元します。キャッシュはキーが変わるか、validate関数がセッションを無効と報告したときに更新されます。",
        "カスタムコマンドとcy.sessionで認証を再利用する方法を教えてください。"
      ),
      QA(
        "Chạy song song trong Cypress Cloud hoạt động thế nào?",
        "How does parallelization in Cypress Cloud work?",
        "Nhiều máy CI cùng chạy với --record --parallel và chung ciBuildId; Cypress Cloud phân bổ file spec cho từng máy dựa trên thời lượng lịch sử để cân bằng tải, rồi gộp kết quả về một dashboard. Tổng thời gian giảm gần tuyến tính theo số máy.",
        "Multiple CI machines run with --record --parallel and a shared ciBuildId; Cypress Cloud distributes spec files to each based on historical durations to balance load, then merges results into one dashboard. Total time drops near-linearly with machine count.",
        "複数のCIマシンが--record --parallelと共有ciBuildIdで走り、Cypress Cloudは過去の所要時間に基づきspecファイルを各マシンへ配分して負荷を分散し、結果を1つのダッシュボードに統合します。総時間はマシン数にほぼ比例して減ります。",
        "コンポーネントテストと並列CIで実行時間を短縮する方法を教えてください。"
      ),
    ],
  },
  {
    heading: { vi: "12. Phỏng vấn & checklist tổng kết", en: "12. Interview & summary checklist", ja: "12. 面接とまとめチェックリスト" },
    blocks: [
      P(
        "Ở cấp nâng cao, người phỏng vấn quan tâm cách bạn giữ bộ test lớn nhanh, ổn định và đáng tin. Hãy nói được: dùng component test cho phản hồi nhanh và cô lập; cy.session để tránh đăng nhập lặp; song song hoá qua Cloud để cắt thời gian; retries kết hợp điều tra gốc rễ để trị flake; và Test Replay để chẩn đoán lỗi CI. Đồng thời trung thực về giới hạn Cypress — JS/TS, đa tab/đa domain hạn chế — để chọn công cụ đúng. Tư duy kim tự tháp test và đặt mỗi lỗi ở tầng rẻ nhất là dấu hiệu của một tester trưởng thành, không chỉ biết viết test mà biết thiết kế chiến lược test.",
        "At an advanced level, interviewers care how you keep a large suite fast, stable and trustworthy. Be able to say: use component tests for fast, isolated feedback; cy.session to avoid repeated logins; parallelize via Cloud to cut time; retries combined with root-cause investigation to tame flake; and Test Replay to diagnose CI failures. Also be honest about Cypress's limits — JS/TS, restricted multi-tab/multi-domain — to pick the right tool. Test-pyramid thinking and placing each bug at the cheapest layer marks a mature tester who not only writes tests but designs a test strategy.",
        "上級レベルでは、面接官は大規模スイートを速く安定して信頼できる状態に保つ方法を重視します。次のように言えることが大切です。速く孤立したフィードバックにコンポーネントテストを使い、繰り返しのログインを避けるためcy.sessionを使い、時間短縮のためCloudで並列化し、フレークを抑えるためリトライと根本原因調査を組み合わせ、CI失敗の診断にTest Replayを使う。またCypressの限界（JS/TS、制限された複数タブ/複数ドメイン）に正直になり、適切なツールを選びます。テストピラミッド思考と各バグを最も安い層に置くことは、テストを書くだけでなくテスト戦略を設計する成熟したテスターの証です。"
      ),
      UL(
        ["Component test cho UI: mount thật, spy sự kiện, phản hồi <1s.", "cy.session tái dùng phiên; đăng nhập qua cy.request cho nhanh.", "CI: cypress run headless + start-server-and-test.", "Song song qua Cloud; retries trị flake tạm thời, sửa gốc rễ.", "Test Replay + reporter để chẩn đoán và báo cáo."],
        ["Component tests for UI: real mount, event spies, <1s feedback.", "cy.session reuses sessions; log in via cy.request for speed.", "CI: cypress run headless + start-server-and-test.", "Parallelize via Cloud; retries tame flake temporarily, fix root cause.", "Test Replay + reporter for diagnosis and reporting."],
        ["UIにコンポーネントテスト: 実マウント、イベントスパイ、1秒未満のフィードバック。", "cy.sessionでセッション再利用、速度のためcy.requestでログイン。", "CI: cypress runヘッドレス + start-server-and-test。", "Cloudで並列化、リトライで一時的にフレークを抑え根本を修正。", "Test Replay + レポーターで診断とレポート。"]
      ),
      QA(
        "Vì sao component test hữu ích dù đã có E2E?",
        "Why are component tests useful even when you have E2E?",
        "Vì E2E chậm và đắt cho mọi tổ hợp trạng thái; component test mount 1 khối UI thật, cô lập, chạy dưới 1 giây, dễ dựng edge case và spy sự kiện. Nó bắt lỗi ở tầng rẻ hơn nhiều, để dành E2E cho các luồng nghiệp vụ then chốt.",
        "Because E2E is slow and expensive for every state combination; a component test mounts one real UI block, isolated, runs under a second, makes edge cases easy and spies events. It catches bugs at a much cheaper layer, reserving E2E for critical business flows.",
        "E2Eはあらゆる状態の組み合わせに遅く高価だからです。コンポーネントテストは実UIブロックを1つ孤立してマウントし、1秒未満で走り、エッジケースを容易にしイベントをスパイします。はるかに安い層でバグを捕まえ、E2Eを重要な業務フローに温存します。",
        "E2Eがあってもコンポーネントテストが有用な理由は何ですか。"
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
    slug: "at-cypress-e2e-spa",
    cover: makeThumb({ id: "atcyp1", domain: "ecommerce", kind: "congnghe", label: "CYPRESS · E2E SPA" }),
    tags: tags("congnghe", "cypress", "foundation"),
    title: {
      vi: "Cypress cho SPA hiện đại: auto-wait, retry-ability & time-travel",
      en: "Cypress for modern SPAs: auto-wait, retry-ability & time-travel",
      ja: "最新SPAのためのCypress: 自動待機・リトライ性・タイムトラベル",
    },
    summary: {
      vi: "Hiểu Cypress từ gốc: chạy trong browser, cơ chế auto-wait & retry-ability, câu lệnh cy, assertion, cấu trúc test và gỡ lỗi time-travel cho ứng dụng TMĐT một trang.",
      en: "Understand Cypress from the ground up: running in-browser, the auto-wait & retry-ability mechanism, cy commands, assertions, test structure and time-travel debugging for a single-page e-commerce app.",
      ja: "Cypressを根本から理解します: ブラウザ内動作、自動待機とリトライ性の仕組み、cyコマンド、アサーション、テスト構造、そしてEC向けシングルページアプリのタイムトラベルデバッグ。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-cypress-network-intercept",
    cover: makeThumb({ id: "atcyp2", domain: "saas", kind: "congnghe", label: "CYPRESS · INTERCEPT" }),
    tags: tags("congnghe", "cypress", "mocking", "realworld"),
    title: {
      vi: "cy.intercept & điều khiển network: stub, spy, fixtures và trạng thái",
      en: "cy.intercept & network control: stub, spy, fixtures and states",
      ja: "cy.interceptとネットワーク制御: スタブ・スパイ・フィクスチャと状態",
    },
    summary: {
      vi: "Làm chủ cy.intercept để test SPA xác định: stub response, spy request, dùng fixtures, alias + cy.wait, và phủ đủ trạng thái loading/empty/error/success cho dashboard SaaS.",
      en: "Master cy.intercept for deterministic SPA testing: stub responses, spy requests, use fixtures, alias + cy.wait, and cover loading/empty/error/success states for a SaaS dashboard.",
      ja: "確定的なSPAテストのためにcy.interceptを習得します: 応答のスタブ、要求のスパイ、フィクスチャ活用、エイリアス + cy.wait、そしてSaaSダッシュボードのloading/empty/error/success状態の網羅。",
    },
    pages: buildDoc(pages2),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-cypress-component-ci",
    cover: makeThumb({ id: "atcyp3", domain: "fintech", kind: "nangcao", label: "CYPRESS · COMPONENT+CI" }),
    tags: tags("nangcao", "cypress", "cicd", "advanced"),
    title: {
      vi: "Component testing & CI song song: cy.mount, cy.session, Cypress Cloud",
      en: "Component testing & parallel CI: cy.mount, cy.session, Cypress Cloud",
      ja: "コンポーネントテストと並列CI: cy.mount・cy.session・Cypress Cloud",
    },
    summary: {
      vi: "Nâng cao với Cypress: component testing (cy.mount), custom commands, cy.session tái dùng phiên, chạy headless và song song qua Cypress Cloud, kiểm soát flake và báo cáo cho pipeline fintech.",
      en: "Go advanced with Cypress: component testing (cy.mount), custom commands, cy.session for session reuse, headless and parallel runs via Cypress Cloud, flake control and reporting for a fintech pipeline.",
      ja: "Cypressで上級へ: コンポーネントテスト（cy.mount）、カスタムコマンド、セッション再利用のためのcy.session、Cypress Cloud経由のヘッドレス・並列実行、フレーク制御、そしてフィンテックパイプラインのレポート。",
    },
    pages: buildDoc(pages3),
  },
];
