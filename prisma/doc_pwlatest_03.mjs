// ============================================================================
// doc_pwlatest_03.mjs — "Playwright & công cụ mới nhất" (bài 03)
// Article A: Network & WebSocket mocking (routeWebSocket + HAR tracing) — fintech.
// Article B: Chrome for Testing & cross-browser (Playwright 1.57+) — saas.
// Song ngữ REAL VI/EN/JA. Block types khớp ArticleViewer.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl03a", domain: "fintech", kind: "congnghe", label: "NETWORK · WS MOCK" });
const coverB = makeThumb({ id: "pwl03b", domain: "saas", kind: "congnghe", label: "CHROME-FOR-TESTING" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (tự vẽ, không dùng ảnh ngoài).
// ---------------------------------------------------------------------------
const svgWsFlow = `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="260" rx="12" fill="#0b1220"/>
<rect x="24" y="90" width="150" height="80" rx="10" fill="#12315e" stroke="#7dd3fc"/>
<text x="99" y="126" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Trình duyệt</text>
<text x="99" y="146" text-anchor="middle" fill="#94a3b8" font-size="11">WebSocket client</text>
<rect x="245" y="70" width="150" height="120" rx="10" fill="#155e63" stroke="#7dd3fc"/>
<text x="320" y="120" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">routeWebSocket()</text>
<text x="320" y="140" text-anchor="middle" fill="#bae6fd" font-size="11">intercept · mock</text>
<text x="320" y="158" text-anchor="middle" fill="#bae6fd" font-size="11">modify frames</text>
<rect x="466" y="90" width="150" height="80" rx="10" fill="#1e3a8a" stroke="#7dd3fc"/>
<text x="541" y="126" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Price server</text>
<text x="541" y="146" text-anchor="middle" fill="#94a3b8" font-size="11">wss://feed</text>
<g stroke="#7dd3fc" stroke-width="2.5" fill="none">
<path d="M174 118 L245 118" marker-end="url(#a)"/>
<path d="M395 118 L466 118" marker-end="url(#a)" stroke-dasharray="6 5"/>
<path d="M466 150 L395 150" marker-end="url(#b)" stroke-dasharray="6 5"/>
<path d="M245 150 L174 150" marker-end="url(#b)"/></g>
<text x="209" y="108" text-anchor="middle" fill="#7dd3fc" font-size="10">connect</text>
<text x="430" y="108" text-anchor="middle" fill="#7dd3fc" font-size="10">connectToServer()</text>
<text x="320" y="222" text-anchor="middle" fill="#94a3b8" font-size="11">Mock hoàn toàn (không nối server) HOẶC nối thật rồi sửa từng frame</text>
<defs>
<marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker>
<marker id="b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs></svg>`;

const svgOracle = `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="240" rx="12" fill="#0b1220"/>
<text x="320" y="34" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="800">Oracle cho luồng giá realtime</text>
<rect x="30" y="60" width="180" height="150" rx="10" fill="#12315e" stroke="#7dd3fc"/>
<text x="120" y="86" text-anchor="middle" fill="#bae6fd" font-size="12" font-weight="700">Mock feed (cố định)</text>
<text x="120" y="112" text-anchor="middle" fill="#cbd5e1" font-size="11">BTC 42,000</text>
<text x="120" y="132" text-anchor="middle" fill="#cbd5e1" font-size="11">→ 42,150</text>
<text x="120" y="152" text-anchor="middle" fill="#cbd5e1" font-size="11">→ HALT</text>
<text x="120" y="186" text-anchor="middle" fill="#94a3b8" font-size="10">chuỗi frame tất định</text>
<rect x="230" y="60" width="180" height="150" rx="10" fill="#155e63" stroke="#7dd3fc"/>
<text x="320" y="86" text-anchor="middle" fill="#bae6fd" font-size="12" font-weight="700">Bất biến (oracle)</text>
<text x="320" y="112" text-anchor="middle" fill="#cbd5e1" font-size="11">HALT → khoá lệnh</text>
<text x="320" y="132" text-anchor="middle" fill="#cbd5e1" font-size="11">Δ giá → cập nhật P&L</text>
<text x="320" y="152" text-anchor="middle" fill="#cbd5e1" font-size="11">stale → cảnh báo</text>
<rect x="430" y="60" width="180" height="150" rx="10" fill="#1e3a8a" stroke="#7dd3fc"/>
<text x="520" y="86" text-anchor="middle" fill="#bae6fd" font-size="12" font-weight="700">Kiểm chứng UI</text>
<text x="520" y="112" text-anchor="middle" fill="#cbd5e1" font-size="11">nút Buy disabled</text>
<text x="520" y="132" text-anchor="middle" fill="#cbd5e1" font-size="11">badge "Dừng"</text>
<text x="520" y="152" text-anchor="middle" fill="#cbd5e1" font-size="11">số dư không đổi</text>
<g stroke="#7dd3fc" stroke-width="2.5" fill="none"><path d="M210 135 L230 135"/><path d="M410 135 L430 135"/></g></svg>`;

const svgHar = `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="220" rx="12" fill="#0b1220"/>
<text x="320" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="800">HAR: ghi một lần → phát lại nhiều lần</text>
<rect x="40" y="60" width="150" height="70" rx="10" fill="#155e63" stroke="#7dd3fc"/>
<text x="115" y="90" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">RECORD</text>
<text x="115" y="110" text-anchor="middle" fill="#bae6fd" font-size="10">startHar() → API thật</text>
<rect x="245" y="60" width="150" height="70" rx="10" fill="#12315e" stroke="#7dd3fc"/>
<text x="320" y="90" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">feed.har</text>
<text x="320" y="110" text-anchor="middle" fill="#bae6fd" font-size="10">request+response</text>
<rect x="450" y="60" width="150" height="70" rx="10" fill="#1e3a8a" stroke="#7dd3fc"/>
<text x="525" y="90" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="700">REPLAY</text>
<text x="525" y="110" text-anchor="middle" fill="#bae6fd" font-size="10">routeFromHAR()</text>
<g stroke="#7dd3fc" stroke-width="2.5" fill="none"><path d="M190 95 L245 95"/><path d="M395 95 L450 95"/></g>
<text x="320" y="175" text-anchor="middle" fill="#94a3b8" font-size="11">update: 'missing' | 'always'  ·  ổn định, không phụ thuộc mạng thật</text></svg>`;

const svgProjects = `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="260" rx="12" fill="#0b1220"/>
<text x="320" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="800">Ma trận projects trong playwright.config.ts</text>
<g font-size="12" font-weight="700">
<rect x="30" y="60" width="180" height="56" rx="9" fill="#0c4a6e" stroke="#7dd3fc"/><text x="120" y="84" text-anchor="middle" fill="#e2e8f0">chromium</text><text x="120" y="102" text-anchor="middle" fill="#bae6fd" font-size="10">Chrome for Testing</text>
<rect x="230" y="60" width="180" height="56" rx="9" fill="#134e4a" stroke="#7dd3fc"/><text x="320" y="84" text-anchor="middle" fill="#e2e8f0">firefox</text><text x="320" y="102" text-anchor="middle" fill="#bae6fd" font-size="10">Gecko</text>
<rect x="430" y="60" width="180" height="56" rx="9" fill="#3730a3" stroke="#7dd3fc"/><text x="520" y="84" text-anchor="middle" fill="#e2e8f0">webkit</text><text x="520" y="102" text-anchor="middle" fill="#bae6fd" font-size="10">Safari engine</text>
<rect x="30" y="140" width="180" height="56" rx="9" fill="#7c2d12" stroke="#7dd3fc"/><text x="120" y="164" text-anchor="middle" fill="#e2e8f0">Mobile Chrome</text><text x="120" y="182" text-anchor="middle" fill="#bae6fd" font-size="10">Pixel 7</text>
<rect x="230" y="140" width="180" height="56" rx="9" fill="#7c2d12" stroke="#7dd3fc"/><text x="320" y="164" text-anchor="middle" fill="#e2e8f0">Mobile Safari</text><text x="320" y="182" text-anchor="middle" fill="#bae6fd" font-size="10">iPhone 15</text>
<rect x="430" y="140" width="180" height="56" rx="9" fill="#334155" stroke="#7dd3fc"/><text x="520" y="164" text-anchor="middle" fill="#e2e8f0">chrome (channel)</text><text x="520" y="182" text-anchor="middle" fill="#bae6fd" font-size="10">stable đã cài</text>
</g>
<text x="320" y="232" text-anchor="middle" fill="#94a3b8" font-size="11">1 config → nhiều môi trường · chạy song song trong CI · shard theo project</text></svg>`;

const svgCftPipeline = `<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="230" rx="12" fill="#0b1220"/>
<text x="320" y="32" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="800">Vì sao Chrome for Testing ổn định hơn Chrome thường</text>
<rect x="40" y="60" width="240" height="120" rx="10" fill="#7c2d12" stroke="#f87171"/>
<text x="160" y="86" text-anchor="middle" fill="#fecaca" font-size="12" font-weight="700">Chrome người dùng</text>
<text x="160" y="110" text-anchor="middle" fill="#fee2e2" font-size="11">tự cập nhật nền</text>
<text x="160" y="130" text-anchor="middle" fill="#fee2e2" font-size="11">phiên bản trôi</text>
<text x="160" y="150" text-anchor="middle" fill="#fee2e2" font-size="11">flaky bất chợt</text>
<rect x="360" y="60" width="240" height="120" rx="10" fill="#052e16" stroke="#34d399"/>
<text x="480" y="86" text-anchor="middle" fill="#bbf7d0" font-size="12" font-weight="700">Chrome for Testing</text>
<text x="480" y="110" text-anchor="middle" fill="#dcfce7" font-size="11">phiên bản ghim (pinned)</text>
<text x="480" y="130" text-anchor="middle" fill="#dcfce7" font-size="11">không tự cập nhật</text>
<text x="480" y="150" text-anchor="middle" fill="#dcfce7" font-size="11">tái lập được</text>
<text x="320" y="120" text-anchor="middle" fill="#7dd3fc" font-size="22" font-weight="800">→</text></svg>`;

// ===========================================================================
// ARTICLE A — Network & WebSocket mocking
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh: vì sao mock mạng là kỹ năng bắt buộc của QA fintech",
      en: "1. Context: why network mocking is a must-have QA skill in fintech",
      ja: "1. 背景：なぜネットワークモックはフィンテックQAの必須スキルなのか",
    },
    blocks: [
      P(
        "Trong một sàn giao dịch fintech, giá tài sản đến trình duyệt qua hai kênh: REST cho dữ liệu tĩnh (danh mục, số dư) và WebSocket cho luồng giá realtime. Nếu bài kiểm thử của bạn phụ thuộc vào server giá thật, nó sẽ chớp tắt (flaky) mỗi khi thị trường biến động, và bạn gần như không thể tái lập một tình huống hiếm như 'giá rơi 30% trong một giây'. Mục tiêu của mock mạng là biến những đầu vào không kiểm soát được thành đầu vào tất định, để mỗi lần chạy đều cho cùng một kết quả.",
        "In a fintech trading venue, asset prices reach the browser through two channels: REST for static data (portfolio, balance) and WebSocket for the realtime price stream. If your tests depend on the real price server, they turn flaky whenever the market moves, and you can barely reproduce a rare event such as 'price drops 30% in one second'. The goal of network mocking is to turn uncontrollable inputs into deterministic ones, so every run yields the same outcome.",
        "フィンテックの取引所では、資産価格は二つの経路でブラウザに届きます。静的データ（ポートフォリオ、残高）はREST、リアルタイム価格ストリームはWebSocketです。テストが本物の価格サーバーに依存すると、相場が動くたびにフレーキーになり、『一秒で価格が30%下落する』ような稀な事象はほぼ再現できません。ネットワークモックの目的は、制御できない入力を決定的な入力へ変え、実行ごとに同じ結果を得ることです。",
      ),
      P(
        "Playwright cung cấp ba lớp công cụ cho việc này: page.route/fulfill để chặn và giả lập HTTP, page.routeWebSocket()/browserContext.routeWebSocket() để chặn và sửa WebSocket, và tracing.startHar()/stopHar() để ghi lại toàn bộ lưu lượng thành một tệp HAR rồi phát lại. Bài viết đi xuyên suốt một ví dụ fintech: bảng giá coin realtime, nút Đặt lệnh, và các bất biến nghiệp vụ mà bài kiểm thử phải bảo vệ. Chúng ta sẽ không kiểm 'màn hình hiện thành công' mà kiểm những quy tắc tiền không được vi phạm.",
        "Playwright provides three layers for this: page.route/fulfill to intercept and fake HTTP, page.routeWebSocket()/browserContext.routeWebSocket() to intercept and edit WebSocket, and tracing.startHar()/stopHar() to record all traffic into a HAR file and replay it. This article runs through one fintech example: a realtime coin price board, a Place-Order button, and the business invariants the test must protect. We will not assert 'the screen shows success' but the money rules that must never be violated.",
        "Playwrightはこのために三つの層を提供します。HTTPを傍受・偽装するpage.route/fulfill、WebSocketを傍受・改変するpage.routeWebSocket()/browserContext.routeWebSocket()、そして全トラフィックをHARファイルに記録して再生するtracing.startHar()/stopHar()です。本稿は一つのフィンテック例を通します。リアルタイムのコイン価格ボード、発注ボタン、そしてテストが守るべき業務不変条件です。『画面に成功が出た』ではなく、決して破ってはならないお金のルールを検証します。",
      ),
      NOTE(
        "Mock không phải để 'làm test dễ đậu'. Mock là để cô lập hệ thống đang test khỏi thế giới bên ngoài, nhờ đó lỗi tìm được là lỗi của chính hệ thống, không phải nhiễu từ mạng.",
        "Mocking is not about 'making tests pass easily'. It isolates the system under test from the outside world, so the defects you find belong to the system itself, not to network noise.",
        "モックは『テストを楽に通す』ためではありません。テスト対象を外界から隔離し、見つかる欠陥がネットワークのノイズではなくシステム自身のものになるようにするためです。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Nền tảng: page.route và fulfill cho HTTP",
      en: "2. Foundation: page.route and fulfill for HTTP",
      ja: "2. 基礎：HTTPのためのpage.routeとfulfill",
    },
    blocks: [
      P(
        "Trước khi nói WebSocket, hãy nắm chắc HTTP. page.route đăng ký một trình xử lý cho các request khớp mẫu URL; trong trình xử lý bạn có thể fulfill (trả về phản hồi giả), continue (đi tiếp, có thể sửa header/body), hoặc abort (chặn hẳn). Đây là công cụ để giả lập báo giá REST của một nhà cung cấp bên thứ ba, hoặc cổng thanh toán, mà không cần gọi ra ngoài. Route được đăng ký sau sẽ ưu tiên hơn route đăng ký trước, nên hãy đặt route đặc thù trước route tổng quát.",
        "Before WebSocket, master HTTP. page.route registers a handler for requests matching a URL pattern; inside it you can fulfill (return a fake response), continue (proceed, optionally editing headers/body), or abort (block outright). This is the tool to fake a third-party REST quote provider or a payment gateway without any outbound call. A later route takes precedence over an earlier one, so register specific routes before generic ones.",
        "WebSocketの前にHTTPを押さえましょう。page.routeはURLパターンに一致するリクエストにハンドラを登録します。その中でfulfill（偽の応答を返す）、continue（ヘッダーやボディを編集して続行）、abort（完全に遮断）ができます。これは外部呼び出しなしにサードパーティのREST見積プロバイダや決済ゲートウェイを偽装する道具です。後から登録したルートが優先されるため、汎用ルートより先に固有ルートを登録します。",
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';

// Giả lập báo giá REST của nhà cung cấp bên thứ ba (deterministic).
test('portfolio hiển thị giá từ quote provider đã mock', async ({ page }) => {
  await page.route('**/api/quotes/BTC', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ symbol: 'BTC', price: 42000, ts: 1_700_000_000 }),
    });
  });

  await page.goto('/portfolio');
  // Oracle: UI phải render đúng con số ta cấp, không phụ thuộc thị trường thật.
  await expect(page.getByTestId('btc-price')).toHaveText('42,000');
});`,
      ),
      TIP(
        "Dùng page.route('**/api/**', route => route.abort()) ở đầu suite để 'ngắt mạng' — bất kỳ request nào bạn quên mock sẽ lộ ra ngay, thay vì lẳng lặng gọi ra production.",
        "Use page.route('**/api/**', route => route.abort()) at the start of a suite to 'cut the network' — any request you forgot to mock surfaces immediately instead of silently hitting production.",
        "スイートの冒頭でpage.route('**/api/**', route => route.abort())を使って『ネットワークを切断』しましょう。モックし忘れたリクエストが本番へ静かに飛ぶ代わりに、すぐ表面化します。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. WebSocket là gì và vì sao khó test",
      en: "3. What WebSocket is and why it is hard to test",
      ja: "3. WebSocketとは何か、なぜテストが難しいのか",
    },
    blocks: [
      P(
        "WebSocket là kết nối song công (full-duplex) mở lâu dài giữa trình duyệt và server: sau bắt tay HTTP Upgrade, hai bên gửi frame cho nhau bất cứ lúc nào. Đây là xương sống của mọi thứ realtime — bảng giá, sổ lệnh, thông báo. Cái khó khi test là: dữ liệu đến bất đồng bộ và không theo yêu cầu của client, thời điểm frame đến ảnh hưởng trực tiếp tới trạng thái UI, và bạn không thể 'gọi lại' một khoảnh khắc thị trường. Đây chính là nơi routeWebSocket tỏa sáng.",
        "WebSocket is a long-lived full-duplex connection between browser and server: after the HTTP Upgrade handshake, both sides push frames at any time. It is the backbone of everything realtime — price boards, order books, notifications. The difficulty in testing is that data arrives asynchronously and unrequested by the client, the timing of each frame directly drives UI state, and you cannot 'replay' a market moment. This is exactly where routeWebSocket shines.",
        "WebSocketはブラウザとサーバー間の長寿命な全二重接続です。HTTP Upgradeハンドシェイクの後、双方がいつでもフレームを送れます。価格ボード、板情報、通知など、あらゆるリアルタイム機能の基盤です。テストの難しさは、データがクライアントの要求とは無関係に非同期で届くこと、各フレームの到着タイミングがUI状態を直接左右すること、そして相場の一瞬を『再生』できないことにあります。まさにここでrouteWebSocketが力を発揮します。",
      ),
      IMG(
        svgWsFlow,
        "Sơ đồ: routeWebSocket đứng giữa client và server — có thể mock hoàn toàn hoặc nối server thật rồi sửa frame.",
        "Diagram: routeWebSocket sits between client and server — either mock fully or connect to the real server and edit frames.",
        "図：routeWebSocketはクライアントとサーバーの間に立ち、完全にモックするか、実サーバーへ接続してフレームを改変します。",
      ),
      P(
        "Có hai chế độ. Chế độ mock hoàn toàn: bạn không nối server thật, tự đóng vai server và bơm chuỗi frame do mình soạn. Chế độ trung gian: bạn gọi ws.connectToServer() để mở kết nối thật, rồi chỉ can thiệp một số frame — ví dụ chèn thêm frame báo 'thị trường tạm dừng', hoặc chặn frame chứa dữ liệu nhạy cảm. Chọn chế độ theo mục tiêu: kiểm logic UI thuần thì mock hoàn toàn; kiểm khả năng chống chịu với dữ liệu bất thường thì dùng trung gian.",
        "There are two modes. Full mock: you do not connect to the real server, you play the server yourself and pump a frame sequence you author. Man-in-the-middle: you call ws.connectToServer() to open the real connection, then intervene on selected frames — for example injecting a 'market halted' frame, or dropping a frame with sensitive data. Choose by goal: to test pure UI logic use full mock; to test resilience against abnormal data use the middle mode.",
        "モードは二つあります。完全モックでは、実サーバーへ接続せず、自分がサーバー役となり自作のフレーム列を流します。中間者モードでは、ws.connectToServer()で実接続を開き、選んだフレームだけに介入します。例えば『市場停止』フレームを注入したり、機微データを含むフレームを落としたりします。目的で選びます。純粋なUIロジックの検証なら完全モック、異常データへの耐性の検証なら中間者モードです。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. routeWebSocket: mock hoàn toàn luồng giá coin",
      en: "4. routeWebSocket: fully mocking the coin price stream",
      ja: "4. routeWebSocket：コイン価格ストリームの完全モック",
    },
    blocks: [
      P(
        "Ở chế độ mock hoàn toàn, ta chặn URL WebSocket và tự trả frame. Callback nhận đối tượng WebSocketRoute; ta lắng nghe ws.onMessage() để biết client gửi gì (ví dụ lệnh subscribe), rồi dùng ws.send() để đẩy các bản cập nhật giá theo kịch bản. Vì ta soạn sẵn chuỗi giá, bài test tất định tuyệt đối: cùng đầu vào, cùng thứ tự frame, cùng kết quả UI. Đây là cách kiểm 'khi giá nhảy từ 42,000 lên 42,150 thì P&L của danh mục tăng đúng bao nhiêu'.",
        "In full-mock mode we intercept the WebSocket URL and emit frames ourselves. The callback receives a WebSocketRoute; we listen on ws.onMessage() to see what the client sends (e.g. a subscribe command), then use ws.send() to push scripted price updates. Because we author the price sequence, the test is perfectly deterministic: same inputs, same frame order, same UI outcome. This is how you verify 'when price jumps 42,000 to 42,150, the portfolio P&L rises by exactly this much'.",
        "完全モックでは、WebSocketのURLを傍受し、フレームを自ら送出します。コールバックはWebSocketRouteを受け取ります。ws.onMessage()でクライアントの送信（例：subscribeコマンド）を確認し、ws.send()で台本どおりの価格更新を押し出します。価格列を自作するためテストは完全に決定的です。同じ入力、同じフレーム順、同じUI結果になります。これが『価格が42,000から42,150へ跳ねたとき、ポートフォリオのP&Lが正確にいくら上がるか』を検証する方法です。",
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';

test('bảng giá cập nhật realtime qua WebSocket đã mock', async ({ page }) => {
  await page.routeWebSocket('wss://feed.exchange.local/stream', (ws) => {
    ws.onMessage((raw) => {
      const msg = JSON.parse(String(raw));
      if (msg.type === 'subscribe' && msg.symbol === 'BTC') {
        // Bơm chuỗi giá tất định — không phụ thuộc thị trường thật.
        ws.send(JSON.stringify({ type: 'tick', symbol: 'BTC', price: 42000 }));
        ws.send(JSON.stringify({ type: 'tick', symbol: 'BTC', price: 42150 }));
      }
    });
  });

  await page.goto('/trade/BTC');
  await expect(page.getByTestId('last-price')).toHaveText('42,150');
  // Oracle: P&L = (giá mới - giá vào) * số lượng. Không kiểm 'màn hình xanh'.
  await expect(page.getByTestId('pnl')).toHaveText('+150.00');
});`,
      ),
      P(
        "Một điểm tinh tế cần nắm là thứ tự và thời điểm gửi frame. Vì ta chủ động ws.send() theo kịch bản, ta kiểm soát được cả những trạng thái trung gian: giá tăng dần, giá đi ngang, rồi giá rơi mạnh — mỗi frame đẩy UI qua một trạng thái mà ta có thể kiểm chứng. Điều này biến những ca vốn phải chờ may rủi ngoài thị trường thành ca lặp lại được trong vài mili-giây. Khi cần mô phỏng độ trễ giữa các tick, ta có thể xen kẽ chờ; nhưng nguyên tắc vàng là không assert theo mốc thời gian tuyệt đối, mà assert theo trạng thái cuối cùng ổn định để tránh phụ thuộc đồng hồ máy chạy CI.",
        "A subtle point is frame ordering and timing. Because we actively ws.send() by script, we control intermediate states too: rising price, sideways, then a sharp drop — each frame pushes the UI through a state we can verify. This turns cases that used to wait on market luck into ones repeatable in a few milliseconds. When you need to simulate delay between ticks you can interleave waits; but the golden rule is not to assert against absolute timestamps, but against the final stable state to avoid depending on the CI machine's clock.",
        "微妙な点はフレームの順序とタイミングです。台本どおりに能動的にws.send()するため、中間状態も制御できます。価格の上昇、横ばい、そして急落——各フレームがUIを検証可能な状態へ押し進めます。これは、市場の運任せで待っていたケースを、数ミリ秒で再現可能なものへ変えます。ティック間の遅延を模擬する必要があれば待機を挟めますが、黄金律は絶対的なタイムスタンプではなく最終的な安定状態で検証することです。CIマシンの時計への依存を避けるためです。",
      ),
      NOTE(
        "routeWebSocket dùng nội bộ Playwright, không phải mocking ở tầng thư viện của app. Nghĩa là bạn test đúng đường đi thật của dữ liệu: từ dây WebSocket vào code xử lý của ứng dụng.",
        "routeWebSocket works inside Playwright, not at your app's library layer. That means you test the real data path: from the WebSocket wire into the app's handling code.",
        "routeWebSocketはアプリのライブラリ層ではなくPlaywright内部で動作します。つまり、WebSocketの通信路からアプリの処理コードへ至る本物のデータ経路をテストできます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Chế độ trung gian: nối server thật rồi sửa frame",
      en: "5. Man-in-the-middle: connect to the real server, then edit frames",
      ja: "5. 中間者モード：実サーバーへ接続してフレームを改変する",
    },
    blocks: [
      P(
        "Đôi khi bạn muốn kiểm ứng dụng chống chịu với dữ liệu thật nhưng có một chút bất thường. Khi đó gọi ws.connectToServer() để mở kết nối tới server thật; hàm này trả về đối tượng server-side mà bạn có thể lắng nghe. Với ws.onMessage() ở phía client bạn quyết định frame nào chuyển tiếp, frame nào chặn, frame nào sửa. Đây là công cụ mạnh để tiêm lỗi: đổi một giá hợp lệ thành số âm, cắt một trường bắt buộc, hoặc chèn frame ngoài thứ tự.",
        "Sometimes you want to test that the app tolerates real but slightly abnormal data. Then call ws.connectToServer() to open a connection to the real server; it returns the server-side object you can listen to. Using ws.onMessage() on the client side you decide which frames pass through, which are dropped, which are edited. This is a powerful fault-injection tool: turn a valid price into a negative number, strip a required field, or inject an out-of-order frame.",
        "実データではあるが少し異常なデータへの耐性を検証したいことがあります。そのときはws.connectToServer()で実サーバーへの接続を開きます。これは購読できるサーバー側オブジェクトを返します。クライアント側のws.onMessage()で、どのフレームを通し、どれを落とし、どれを改変するかを決めます。これは強力な障害注入の道具です。正当な価格を負の数に変えたり、必須フィールドを削ったり、順序外のフレームを注入したりできます。",
      ),
      CODE(
        "ts",
        `test('ứng dụng bỏ qua tick giá âm bất thường từ server', async ({ page }) => {
  await page.routeWebSocket('wss://feed.exchange.local/stream', (ws) => {
    const server = ws.connectToServer();            // nối server thật
    server.onMessage((raw) => {
      const msg = JSON.parse(String(raw));
      if (msg.type === 'tick' && msg.price < 0) {
        // Tiêm lỗi: server (giả định) gửi giá âm -> KHÔNG chuyển tiếp cho client.
        return;                                       // drop frame độc hại
      }
      ws.send(String(raw));                           // frame hợp lệ: cho qua
    });
    ws.onMessage((raw) => server.send(String(raw)));  // client -> server
  });

  await page.goto('/trade/BTC');
  // Oracle: giá hiển thị không bao giờ âm, dù dây có bơm số âm.
  await expect(page.getByTestId('last-price')).not.toContainText('-');
});`,
      ),
      WARN(
        "Chế độ trung gian vẫn chạm server thật — trong CI hãy trỏ tới môi trường staging, đừng nối vào feed production. Một bài test tiêm lỗi mà bắn nhầm vào hệ thống thật có thể gây báo động vận hành.",
        "Man-in-the-middle still touches the real server — in CI point it at staging, never at the production feed. A fault-injection test that accidentally hits a real system can trigger operational alarms.",
        "中間者モードでも実サーバーに触れます。CIではステージングを指し、本番フィードには決して繋がないでください。障害注入テストが誤って本番システムに当たると運用アラームを引き起こしかねません。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. browserContext.routeWebSocket cho nhiều tab/nhiều trang",
      en: "6. browserContext.routeWebSocket for multiple tabs/pages",
      ja: "6. 複数タブ・複数ページのためのbrowserContext.routeWebSocket",
    },
    blocks: [
      P(
        "Nếu chỉ mock cho một trang thì page.routeWebSocket là đủ. Nhưng một sàn giao dịch thường mở nhiều tab: bảng giá, sổ lệnh, cửa sổ pop-out biểu đồ. Khi cần mọi trang trong cùng ngữ cảnh dùng chung một mock WebSocket, hãy đăng ký ở cấp browserContext. Điều này đặc biệt hữu ích cho fixture dùng chung: một nơi khai báo, mọi test kế thừa. Nó cũng giúp bắt các kết nối WebSocket mở ra từ trang con mà bạn có thể quên nếu chỉ gắn ở cấp page.",
        "If you only mock for one page, page.routeWebSocket suffices. But a trading venue often opens several tabs: price board, order book, a pop-out chart window. When every page in the same context should share one WebSocket mock, register it at the browserContext level. This is especially useful for shared fixtures: declare once, every test inherits it. It also catches WebSocket connections opened from child pages that you might miss if you only attach at the page level.",
        "一つのページだけをモックするならpage.routeWebSocketで十分です。しかし取引所は複数タブを開きがちです。価格ボード、板情報、ポップアウトのチャート窓などです。同一コンテキスト内のすべてのページが一つのWebSocketモックを共有すべきときは、browserContextレベルで登録します。これは共有フィクスチャに特に有用です。一度宣言すれば全テストが継承します。ページレベルだけでは見逃しがちな子ページからのWebSocket接続も捕捉できます。",
      ),
      CODE(
        "ts",
        `// fixtures.ts — mock WebSocket cho MỌI trang trong context.
import { test as base } from '@playwright/test';

export const test = base.extend<{ mockFeed: void }>({
  mockFeed: [async ({ context }, use) => {
    await context.routeWebSocket('wss://feed.exchange.local/stream', (ws) => {
      ws.onMessage((raw) => {
        const m = JSON.parse(String(raw));
        if (m.type === 'subscribe') {
          ws.send(JSON.stringify({ type: 'tick', symbol: m.symbol, price: 42000 }));
        }
      });
    });
    await use();
  }, { auto: true }],  // auto: mọi test đều có feed mock, không cần khai báo lại
});`,
      ),
      TIP(
        "Đặt mock feed vào fixture auto:true để không lập trình viên nào 'quên mock' rồi vô tình gọi ra mạng thật. Fixture chung là hàng rào an toàn cho cả đội.",
        "Put the mock feed into an auto:true fixture so no engineer 'forgets to mock' and accidentally calls the real network. A shared fixture is a safety fence for the whole team.",
        "モックフィードをauto:trueのフィクスチャに入れましょう。そうすれば誰も『モックし忘れて』実ネットワークを呼ぶことがありません。共有フィクスチャはチーム全体の安全柵です。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Oracle-first: bất biến nghiệp vụ khi thị trường tạm dừng (HALT)",
      en: "7. Oracle-first: business invariants when the market halts (HALT)",
      ja: "7. オラクル優先：市場停止（HALT）時の業務不変条件",
    },
    blocks: [
      P(
        "Điểm khác biệt giữa QA giỏi và QA trung bình nằm ở oracle. Đừng viết 'nhấn Buy thấy toast thành công'. Hãy viết theo bất biến: khi feed gửi trạng thái HALT, nút Đặt lệnh phải bị vô hiệu hóa, số dư không được thay đổi, và mọi lệnh đang chờ phải bị treo chứ không khớp. Mock cho phép ta dựng đúng khoảnh khắc HALT — điều gần như không thể tái lập trên thị trường thật — và kiểm rằng ứng dụng tuân thủ quy tắc bảo vệ tiền.",
        "The difference between a great and an average QA lies in the oracle. Do not write 'click Buy, see success toast'. Write by invariant: when the feed sends a HALT status, the Place-Order button must be disabled, the balance must not change, and any pending order must be held rather than filled. Mocking lets us stage the exact HALT moment — nearly impossible to reproduce in the real market — and verify the app obeys the money-protection rules.",
        "優れたQAと平凡なQAの差はオラクルにあります。『Buyを押して成功トーストを見る』ではいけません。不変条件で書きます。フィードがHALT状態を送ったら、発注ボタンは無効化され、残高は変わらず、保留中の注文は約定せず保留されねばなりません。モックはHALTの瞬間そのものを再現できます。実市場ではほぼ不可能なこの状況を作り、アプリが資金保護ルールを守ることを検証します。",
      ),
      IMG(
        svgOracle,
        "Bảng: mock feed cố định → bất biến nghiệp vụ (oracle) → điểm kiểm chứng trên UI.",
        "Table: fixed mock feed → business invariants (oracle) → UI verification points.",
        "表：固定のモックフィード → 業務不変条件（オラクル） → UIの検証ポイント。",
      ),
      CODE(
        "ts",
        `test('khi thị trường HALT thì khoá đặt lệnh và giữ nguyên số dư', async ({ page }) => {
  await page.routeWebSocket('wss://feed.exchange.local/stream', (ws) => {
    ws.onMessage(() => {
      ws.send(JSON.stringify({ type: 'tick', symbol: 'BTC', price: 42000 }));
      ws.send(JSON.stringify({ type: 'status', symbol: 'BTC', state: 'HALT' }));
    });
  });

  await page.goto('/trade/BTC');
  const balanceBefore = await page.getByTestId('cash-balance').innerText();

  // Bất biến 1: nút Buy bị vô hiệu khi HALT.
  await expect(page.getByRole('button', { name: 'Buy' })).toBeDisabled();
  // Bất biến 2: có badge trạng thái dừng.
  await expect(page.getByTestId('mkt-status')).toHaveText('Halted');
  // Bất biến 3: số dư KHÔNG đổi — tiền không bị trừ khi không giao dịch được.
  await expect(page.getByTestId('cash-balance')).toHaveText(balanceBefore);
});`,
      ),
      SCEN(
        "Phỏng vấn: 'Bạn test tính năng realtime thế nào để không flaky?'",
        "Interview: 'How do you test a realtime feature without flakiness?'",
        "Tôi trả lời rằng chìa khóa là tất định hóa đầu vào bằng routeWebSocket: tôi tự soạn chuỗi frame nên loại bỏ hoàn toàn phụ thuộc thời gian mạng. Sau đó tôi không assert vào thời điểm, mà assert vào trạng thái ổn định bằng expect có auto-retry (toBeDisabled, toHaveText). Cuối cùng tôi định nghĩa oracle theo bất biến tiền — ví dụ số dư không đổi khi HALT — nên bài test bắt đúng lỗi nghiệp vụ chứ không chỉ lỗi hiển thị.",
        "I answer that the key is determinizing inputs with routeWebSocket: because I author the frame sequence, I fully remove network-timing dependence. Then I assert on stable state via auto-retrying expect (toBeDisabled, toHaveText) rather than on timing. Finally I define the oracle by money invariants — e.g. balance unchanged on HALT — so the test catches real business bugs, not just rendering bugs.",
        "面接：『リアルタイム機能をフレーキーにせずどうテストしますか？』",
        "鍵はrouteWebSocketで入力を決定的にすることだと答えます。フレーム列を自作するため、ネットワークのタイミング依存を完全に排除できます。次に、タイミングではなく自動再試行付きのexpect（toBeDisabled、toHaveText）で安定状態を検証します。最後にオラクルを資金の不変条件で定義します。例えばHALT時に残高が変わらないことです。こうすればテストは表示のバグだけでなく本物の業務バグを捕捉します。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. tracing.startHar / stopHar: HAR như một dạng trace",
      en: "8. tracing.startHar / stopHar: HAR as a form of tracing",
      ja: "8. tracing.startHar / stopHar：トレースとしてのHAR",
    },
    blocks: [
      P(
        "HAR (HTTP Archive) là một tệp JSON ghi lại đầy đủ request và response của một phiên. Từ Playwright 1.60, tracing.startHar()/stopHar() nâng HAR thành công dân hạng nhất của hệ thống trace: bạn có thể bật ghi ngay trong luồng test, sau đó mở HAR trong Trace Viewer để xem từng request kèm method, status, thời gian. Điều này đặc biệt hữu ích khi bạn muốn có một 'bằng chứng mạng' đính kèm mỗi lần chạy hỏng, thay vì phải đoán ứng dụng đã gọi những gì.",
        "HAR (HTTP Archive) is a JSON file recording all requests and responses of a session. Since Playwright 1.60, tracing.startHar()/stopHar() promote HAR to a first-class citizen of the trace system: you can turn on capture within the test flow, then open the HAR in Trace Viewer to inspect each request with its method, status and timing. This is especially useful when you want a 'network evidence' attached to every failing run, instead of guessing what the app called.",
        "HAR（HTTP Archive）はセッションの全リクエストと応答を記録するJSONファイルです。Playwright 1.60から、tracing.startHar()/stopHar()はHARをトレースシステムの第一級市民へ昇格させました。テストの流れの中で記録を開始でき、HARをTrace Viewerで開いて各リクエストをメソッド・ステータス・タイミングと共に確認できます。これは、アプリが何を呼んだか推測する代わりに、失敗した実行ごとに『ネットワークの証拠』を添付したいときに特に有用です。",
      ),
      CODE(
        "ts",
        `import { test } from '@playwright/test';

test('ghi HAR làm bằng chứng mạng cho phiên đặt lệnh', async ({ page, context }) => {
  // 1.60+: HAR như một dạng trace, bật/tắt trong luồng test.
  await context.tracing.startHar({ path: 'trace/order-flow.har' });

  await page.goto('/trade/BTC');
  await page.getByRole('button', { name: 'Buy' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await context.tracing.stopHar();
  // trace/order-flow.har giờ chứa mọi request REST của phiên -> đính kèm report.
});`,
      ),
      NOTE(
        "Khác biệt với route: startHar không thay đổi hành vi mạng, nó chỉ ghi lại. route dùng để giả lập; HAR trước hết dùng để quan sát và làm bằng chứng, sau đó mới dùng để phát lại.",
        "Difference from route: startHar does not change network behaviour, it only records. route is for faking; HAR is first for observation and evidence, and only then for replay.",
        "routeとの違い：startHarはネットワーク動作を変えず、記録のみ行います。routeは偽装用、HARはまず観測と証拠のため、その後に再生のためのものです。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. recordHar và routeFromHAR: ghi một lần, phát lại tất định",
      en: "9. recordHar and routeFromHAR: record once, replay deterministically",
      ja: "9. recordHarとrouteFromHAR：一度記録し、決定的に再生する",
    },
    blocks: [
      P(
        "Có hai đường vào HAR khi tạo context. recordHar khai báo lúc newContext để ghi lưu lượng ra tệp. Sau khi đã có tệp, page.routeFromHAR() (hoặc context.routeFromHAR()) sẽ phục vụ mọi request khớp từ HAR thay vì gọi mạng — biến bài test thành hoàn toàn ngoại tuyến và tất định. Tùy chọn update quyết định hành vi: 'minimal' ghi vừa đủ; update:true bổ sung request còn thiếu; not-found:'abort' chặn mọi request không có trong HAR để lộ phụ thuộc ẩn.",
        "There are two entry points to HAR at context creation. recordHar declared at newContext records traffic to a file. Once you have the file, page.routeFromHAR() (or context.routeFromHAR()) serves every matching request from the HAR instead of hitting the network — making the test fully offline and deterministic. The update option governs behaviour: 'minimal' records just enough; update:true fills in missing requests; not-found:'abort' blocks any request absent from the HAR to expose hidden dependencies.",
        "コンテキスト生成時、HARへの入口は二つあります。newContext時に宣言するrecordHarはトラフィックをファイルへ記録します。ファイルができたら、page.routeFromHAR()（またはcontext.routeFromHAR()）が一致する全リクエストをネットワークではなくHARから提供し、テストを完全にオフラインかつ決定的にします。updateオプションが挙動を決めます。'minimal'は必要最小限を記録し、update:trueは欠けたリクエストを補い、not-found:'abort'はHARにないリクエストを遮断して隠れた依存を露呈させます。",
      ),
      CODE(
        "ts",
        `// LẦN 1 — ghi HAR từ backend thật (staging).
const ctxRecord = await browser.newContext({
  recordHar: { path: 'har/quotes.har', mode: 'minimal', content: 'embed' },
});

// LẦN 2+ — phát lại từ HAR, không gọi mạng, tất định.
test('portfolio chạy hoàn toàn offline từ HAR', async ({ page }) => {
  await page.routeFromHAR('har/quotes.har', {
    url: '**/api/**',
    update: false,          // chỉ phát lại, không ghi đè
    notFound: 'abort',      // request lạ -> abort, để lộ phụ thuộc chưa ghi
  });
  await page.goto('/portfolio');
  await expect(page.getByTestId('btc-price')).toBeVisible();
});`,
      ),
      IMG(
        svgHar,
        "Vòng đời HAR: RECORD (gọi API thật) → tệp .har → REPLAY (routeFromHAR) không phụ thuộc mạng.",
        "HAR lifecycle: RECORD (real API) → .har file → REPLAY (routeFromHAR) with no network dependency.",
        "HARのライフサイクル：RECORD（実API）→ .harファイル → REPLAY（routeFromHAR）でネットワーク非依存。",
      ),
      WARN(
        "HAR có thể chứa dữ liệu nhạy cảm (token, số tài khoản). Trước khi commit tệp HAR, hãy loại bỏ hoặc thay thế bí mật, và cân nhắc content:'embed' vs lưu tách để kiểm soát rò rỉ.",
        "HAR can contain sensitive data (tokens, account numbers). Before committing a HAR, scrub or replace secrets, and weigh content:'embed' vs external storage to control leakage.",
        "HARには機微データ（トークン、口座番号）が含まれ得ます。HARをコミットする前に秘密情報を除去または置換し、漏洩制御のためcontent:'embed'と外部保存を比較検討してください。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Mock thanh toán và báo giá bên thứ ba một cách an toàn",
      en: "10. Safely mocking third-party payments and quotes",
      ja: "10. サードパーティ決済と見積を安全にモックする",
    },
    blocks: [
      P(
        "Cổng thanh toán và nhà cung cấp báo giá là những phụ thuộc bạn không sở hữu: chúng có rate limit, có thể tính phí mỗi lần gọi, và không cho bạn tự do dựng tình huống lỗi. Mock hóa chúng cho ta ba lợi ích: bài test chạy nhanh và ổn định, không tốn phí, và quan trọng nhất là ta có thể tái lập mọi kịch bản lỗi — thẻ bị từ chối, timeout, phản hồi 3D-Secure, webhook trùng lặp. Với báo giá qua WebSocket, ta còn dựng được cảnh giá lệch quá xa để kiểm cơ chế bảo vệ trượt giá (slippage).",
        "Payment gateways and quote providers are dependencies you do not own: they have rate limits, may charge per call, and give you no freedom to stage error cases. Mocking them yields three benefits: fast and stable tests, no cost, and most importantly the ability to reproduce every failure scenario — declined card, timeout, 3D-Secure response, duplicate webhook. For quotes over WebSocket, you can also stage a price that drifted too far to test slippage protection.",
        "決済ゲートウェイと見積プロバイダは、あなたが所有しない依存です。レート制限があり、呼び出しごとに課金されることもあり、エラーケースを自由に作れません。モック化は三つの利点を生みます。速く安定したテスト、コストゼロ、そして最も重要な、あらゆる失敗シナリオの再現です。カード拒否、タイムアウト、3D-Secure応答、重複webhookなどです。WebSocket経由の見積では、乖離しすぎた価格を作りスリッページ保護の検証もできます。",
      ),
      CODE(
        "ts",
        `// Mock cổng thanh toán: dựng thẻ bị từ chối + idempotency.
test('nạp tiền: thẻ bị từ chối không làm tăng số dư', async ({ page }) => {
  await page.route('**/pay/charge', async (route) => {
    const req = route.request().postDataJSON();
    // Oracle idempotency: cùng idempotency-key -> cùng một kết quả.
    await route.fulfill({
      status: 402,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'declined', code: 'card_declined', key: req.idempotencyKey }),
    });
  });

  await page.goto('/wallet/topup');
  const before = await page.getByTestId('cash-balance').innerText();
  await page.getByRole('button', { name: 'Nạp 100' }).click();

  await expect(page.getByText('Thẻ bị từ chối')).toBeVisible();
  // Bất biến: từ chối -> số dư KHÔNG tăng.
  await expect(page.getByTestId('cash-balance')).toHaveText(before);
});`,
      ),
      SCEN(
        "Thực chiến: webhook thanh toán bị lặp",
        "Real-world: duplicated payment webhook",
        "Cổng thanh toán đôi khi gửi webhook 'đã thanh toán' hai lần do retry. Ta mock hai lần gọi cùng idempotency-key và kiểm oracle: số dư chỉ được cộng đúng một lần, và bản ghi giao dịch không bị nhân đôi. Đây là loại lỗi tiền nghiêm trọng mà chỉ mock mới cho ta dựng lại đáng tin cậy trong CI.",
        "Payment gateways sometimes send a 'paid' webhook twice due to retries. We mock two calls with the same idempotency key and check the oracle: the balance is credited exactly once, and the transaction ledger is not duplicated. This is a serious money bug that only mocking lets us reliably reproduce in CI.",
        "実戦：重複した決済webhook",
        "決済ゲートウェイは再試行のため『支払済み』webhookを二度送ることがあります。同じ冪等キーで二回の呼び出しをモックし、オラクルを検証します。残高は正確に一度だけ加算され、取引台帳は重複しません。これはモックだけがCIで確実に再現できる深刻な資金バグです。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Bẫy oracle: mock đúng nhưng oracle sai",
      en: "11. Oracle pitfalls: correct mock but wrong oracle",
      ja: "11. オラクルの落とし穴：モックは正しいがオラクルが誤り",
    },
    blocks: [
      P(
        "Mock mạnh đến mức nếu dùng ẩu, bạn có thể tạo ra bài test 'luôn xanh' mà chẳng chứng minh điều gì. Bẫy phổ biến nhất là mock cả phía trả lời rồi assert lại chính cái mình vừa mock — vòng lặp tự khẳng định. Bẫy thứ hai là mock quá nhiều đến mức bỏ qua cả logic thật của ứng dụng. Bẫy thứ ba là oracle mờ nhạt: 'có phần tử xuất hiện' thay vì 'số tiền đúng bằng công thức'. Nguyên tắc: mock để cấp đầu vào; oracle phải kiểm đầu ra do chính ứng dụng tính ra, chứ không phải giá trị bạn tự nhét vào.",
        "Mocking is so powerful that if used carelessly you can build an always-green test that proves nothing. The most common trap is mocking the response and then asserting the very thing you just mocked — a self-confirming loop. The second trap is over-mocking to the point of bypassing the app's real logic. The third is a vague oracle: 'an element appears' instead of 'the amount equals the formula'. The rule: mock to supply inputs; the oracle must check outputs the app itself computes, not values you injected.",
        "モックは非常に強力なので、雑に使うと何も証明しない『常に緑』のテストを作れてしまいます。最も多い罠は、応答をモックしてから、まさにモックした値を検証することです。自己確認のループです。二つ目の罠は、過剰なモックでアプリの実ロジックを迂回してしまうことです。三つ目は曖昧なオラクルです。『金額が計算式と一致する』ではなく『要素が現れる』です。原則はこうです。モックは入力の供給に使い、オラクルはアプリ自身が計算する出力を検証すべきで、あなたが注入した値ではありません。",
      ),
      UL(
        [
          "Không assert lại giá trị vừa mock — hãy assert kết quả biến đổi (P&L, tổng, trạng thái) do app tính.",
          "Giữ mock ở mức tối thiểu cần thiết; mock cả world thì bạn chỉ test cái mock.",
          "Oracle theo bất biến tiền/nghiệp vụ, không theo pixel hay chuỗi 'thành công'.",
          "Có ít nhất một bài chạy với backend thật (staging) để bắt trường hợp mock lệch hợp đồng.",
        ],
        [
          "Do not re-assert the mocked value — assert the transformed result (P&L, total, state) the app computes.",
          "Keep mocks minimal; mock the whole world and you only test the mock.",
          "Base the oracle on money/business invariants, not pixels or a 'success' string.",
          "Keep at least one run against a real (staging) backend to catch mocks drifting from the contract.",
        ],
        [
          "モックした値を再検証しないこと。アプリが計算する変換結果（P&L、合計、状態）を検証します。",
          "モックは必要最小限に。世界全体をモックするとモックだけをテストすることになります。",
          "オラクルはピクセルや『成功』文字列ではなく、資金・業務の不変条件に基づけます。",
          "モックが契約から乖離する事態を捕らえるため、実（ステージング）バックエンドに対する実行を最低一つ残します。",
        ],
      ),
      TIP(
        "Định kỳ chạy một 'contract test' đối chiếu HAR đã lưu với phản hồi thật của staging. Nếu schema đổi, mock của bạn sẽ lỗi thời và test xanh giả tạo.",
        "Periodically run a 'contract test' comparing the stored HAR against staging's real responses. If the schema changes, your mocks go stale and tests turn falsely green.",
        "保存したHARとステージングの実応答を突き合わせる『契約テスト』を定期的に実行しましょう。スキーマが変わればモックは陳腐化し、テストは偽りの緑になります。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Tích hợp CI: đính kèm HAR/trace và chạy song song",
      en: "12. CI integration: attach HAR/trace and run in parallel",
      ja: "12. CI統合：HAR/トレースの添付と並列実行",
    },
    blocks: [
      P(
        "Trong CI, giá trị của mock là tốc độ và độ ổn định: không gọi mạng ngoài nên không bị rate limit hay chập chờn, và có thể chạy song song hàng trăm bài. Hãy cấu hình để mỗi lần chạy hỏng tự đính kèm trace và HAR; khi review sự cố, bạn xem đúng chuỗi request đã diễn ra thay vì phỏng đoán. Kết hợp trace: 'retain-on-failure' với startHar cho bạn cả trace hành động lẫn bằng chứng mạng — đủ để dựng lại hiện trường một lỗi tiền.",
        "In CI, the value of mocking is speed and stability: no external calls so no rate limits or flakiness, and you can run hundreds of tests in parallel. Configure each failing run to auto-attach the trace and HAR; when reviewing an incident you see the exact request sequence that happened instead of guessing. Combining trace: 'retain-on-failure' with startHar gives you both an action trace and network evidence — enough to reconstruct the scene of a money bug.",
        "CIでは、モックの価値は速度と安定性です。外部呼び出しがないためレート制限もフレーキーもなく、数百のテストを並列実行できます。失敗した実行ごとにトレースとHARを自動添付するよう構成しましょう。インシデントのレビュー時、推測ではなく実際に起きたリクエスト列そのものを見られます。trace: 'retain-on-failure'とstartHarの組み合わせは、操作トレースとネットワーク証拠の両方を与え、資金バグの現場を再構成するに十分です。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/e2e.yml
name: e2e-mocked
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]        # chạy song song 4 phần
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: traces-\${{ matrix.shard }}
          path: |
            test-results/**/trace.zip
            trace/*.har`,
      ),
      QA(
        "Vì sao mock lại làm CI nhanh và rẻ hơn?",
        "Why does mocking make CI faster and cheaper?",
        "Vì không gọi ra mạng ngoài: loại bỏ độ trễ mạng, tránh rate limit và phí theo lần gọi của bên thứ ba, và cho phép chạy song song không giới hạn vì không có tài nguyên chung ngoài hệ thống. Bài test cũng ổn định hơn nên ít lần chạy lại, tiết kiệm phút CI.",
        "Because there are no outbound calls: it removes network latency, avoids third-party rate limits and per-call fees, and allows unlimited parallelism since there is no shared external resource. Tests are also more stable, so fewer reruns and saved CI minutes.",
        "なぜモックはCIを速く安くするのですか？",
        "外部呼び出しがないからです。ネットワーク遅延を除き、サードパーティのレート制限や呼び出し課金を避け、外部共有資源がないため無制限に並列化できます。テストも安定するため再実行が減り、CIの時間を節約します。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Ranh giới AI-agent và tổng kết",
      en: "13. AI-agent boundary and wrap-up",
      ja: "13. AIエージェントの境界とまとめ",
    },
    blocks: [
      P(
        "Các agent AI của Playwright (Planner, Generator, Healer) rất mạnh trong việc khám phá UI và sinh selector, nhưng chúng không nên tự quyết định oracle nghiệp vụ. Ranh giới hợp lý: để agent giúp dựng khung test và tìm locator ổn định, còn con người định nghĩa bất biến tiền và mock đúng hợp đồng. Agent có thể 'ảo giác' (hallucination) một quy tắc nghiệp vụ không tồn tại; phải neo (grounding) chúng vào tài liệu và decision table thật. Với mock, hãy để agent gợi ý còn người review kỹ để không tạo test tự khẳng định.",
        "Playwright's AI agents (Planner, Generator, Healer) are powerful at exploring UI and generating selectors, but they should not decide the business oracle themselves. A sound boundary: let agents help scaffold tests and find stable locators, while humans define money invariants and contract-correct mocks. Agents can hallucinate a non-existent business rule; they must be grounded in real docs and decision tables. For mocks, let the agent suggest but have a human review carefully to avoid self-confirming tests.",
        "PlaywrightのAIエージェント（Planner、Generator、Healer）はUIの探索とセレクタ生成に強力ですが、業務オラクルを自ら決めるべきではありません。健全な境界はこうです。エージェントにはテストの骨組み作りと安定ロケーターの発見を任せ、人間が資金の不変条件と契約に忠実なモックを定義します。エージェントは存在しない業務ルールをハルシネーションし得るため、実際のドキュメントとデシジョンテーブルにグラウンディングせねばなりません。モックはエージェントに提案させ、自己確認テストを避けるため人間が入念にレビューします。",
      ),
      QA(
        "routeWebSocket khác gì với việc mock thư viện WebSocket trong app?",
        "How is routeWebSocket different from mocking the app's WebSocket library?",
        "Mock thư viện thay thế code của chính app, nên bạn không kiểm được đường đi thật từ dây vào app. routeWebSocket chặn ở tầng trình duyệt/Playwright, nên app chạy nguyên vẹn logic WebSocket của nó — bạn kiểm end-to-end đúng như production, chỉ khác nguồn frame là do bạn cấp.",
        "Mocking the library replaces the app's own code, so you cannot test the real path from the wire into the app. routeWebSocket intercepts at the browser/Playwright layer, so the app runs its WebSocket logic intact — you test end-to-end just like production, only the frame source is supplied by you.",
        "routeWebSocketはアプリのWebSocketライブラリをモックするのと何が違いますか？",
        "ライブラリのモックはアプリ自身のコードを置き換えるため、通信路からアプリへの本物の経路をテストできません。routeWebSocketはブラウザ／Playwright層で傍受するため、アプリはWebSocketロジックをそのまま実行します。本番同様にエンドツーエンドで検証でき、違いはフレームの供給元があなたである点だけです。",
      ),
      QA(
        "Khi nào chọn HAR replay thay vì viết mock tay?",
        "When choose HAR replay over hand-written mocks?",
        "Chọn HAR khi luồng có nhiều request phức tạp và bạn muốn ảnh chụp trung thực của một phiên thật — ghi một lần từ staging rồi phát lại. Viết mock tay khi cần dựng chính xác một kịch bản hiếm (lỗi, biên) mà backend thật khó tạo. Thường ta kết hợp: HAR cho phần nền ổn định, mock tay cho các frame/response cần thao túng.",
        "Choose HAR when the flow has many complex requests and you want a faithful snapshot of a real session — record once from staging then replay. Hand-write mocks when you must stage an exact rare scenario (error, edge) that the real backend can hardly produce. Often you combine: HAR for the stable backdrop, hand mocks for the frames/responses you need to manipulate.",
        "手書きモックよりHAR再生を選ぶのはいつですか？",
        "フローに複雑なリクエストが多く、実セッションの忠実なスナップショットが欲しいときはHARを選びます。ステージングから一度記録し再生します。実バックエンドでは作りにくい稀なシナリオ（エラー、境界）を正確に再現する必要があるときは手書きモックにします。多くは併用します。安定した背景にHAR、操作が必要なフレームや応答に手書きモックです。",
      ),
      QA(
        "Làm sao đảm bảo mock không che giấu lỗi tích hợp thật với bên thứ ba?",
        "How do you ensure mocks do not hide real integration bugs with third parties?",
        "Tôi giữ một tầng contract test chạy định kỳ đối chiếu schema mock/HAR với phản hồi thật của staging; nếu nhà cung cấp đổi trường, tầng này đỏ và cảnh báo mock đã lỗi thời. Ngoài ra tôi có một nhóm smoke nhỏ chạy end-to-end với backend thật trên môi trường staging trước mỗi release. Mock cho tốc độ và độ phủ ở CI hằng ngày; contract test và smoke thật là lưới an toàn chống lệch hợp đồng.",
        "I keep a contract-test layer that periodically compares the mock/HAR schema against staging's real responses; if the provider changes a field, this layer turns red and warns that the mock is stale. I also keep a small smoke group running end-to-end against the real backend on staging before each release. Mocks give speed and coverage in daily CI; contract tests and real smoke are the safety net against contract drift.",
        "モックがサードパーティとの本物の統合バグを隠さないことをどう保証しますか？",
        "モック／HARのスキーマをステージングの実応答と定期的に突き合わせる契約テストの層を保ちます。プロバイダがフィールドを変えれば、この層が赤くなりモックの陳腐化を警告します。さらに、各リリース前にステージングの実バックエンドに対しエンドツーエンドで走る小さなスモーク群を保ちます。モックは日常のCIで速度と網羅を与え、契約テストと実スモークは契約乖離への安全網です。",
      ),
      P(
        "Tóm lại, ba công cụ tạo thành một bộ hoàn chỉnh cho QA fintech: route/fulfill giả lập HTTP, routeWebSocket tất định hóa luồng realtime, và HAR ghi/phát lại cả phiên. Sức mạnh thật sự không nằm ở việc mock giỏi, mà ở việc kết nối mock với oracle nghiệp vụ đúng đắn — để mỗi bài test bảo vệ một quy tắc tiền cụ thể. Đó là điều phân biệt một QA fintech thực thụ với người chỉ biết 'nhấn nút thấy xanh'.",
        "In sum, the three tools form a complete kit for fintech QA: route/fulfill fakes HTTP, routeWebSocket determinizes the realtime stream, and HAR records/replays a whole session. The real power is not in mocking skilfully, but in wiring mocks to a correct business oracle — so each test protects a concrete money rule. That is what separates a true fintech QA from someone who merely 'clicks a button and sees green'.",
        "まとめると、三つの道具はフィンテックQAの完全なキットを成します。route/fulfillはHTTPを偽装し、routeWebSocketはリアルタイムストリームを決定的にし、HARはセッション全体を記録・再生します。真の力は巧みなモックではなく、モックを正しい業務オラクルへ結びつけることにあります。各テストが具体的な資金ルールを守るようにするのです。それこそが、真のフィンテックQAと『ボタンを押して緑を見る』だけの人を分けるものです。",
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Chrome for Testing & cross-browser
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh: reproducibility là nền móng của kiểm thử tự động",
      en: "1. Context: reproducibility is the foundation of automated testing",
      ja: "1. 背景：再現性は自動テストの基盤",
    },
    blocks: [
      P(
        "Một bộ kiểm thử tự động chỉ có giá trị khi nó tất định: cùng code, cùng dữ liệu thì phải cho cùng kết quả. Nhưng trình duyệt lại là một biến số ngầm. Chrome bản người dùng tự cập nhật nền âm thầm, có thể đổi hành vi render hay layout giữa hai lần chạy CI, khiến bài test 'hôm qua xanh hôm nay đỏ' mà code không đổi. Đây là loại flaky khó chịu nhất vì nguyên nhân nằm ngoài repo của bạn. Playwright 1.57 giải quyết gốc rễ bằng cách chuyển sang các bản Chrome for Testing.",
        "An automated suite is only valuable when it is deterministic: same code, same data must give the same result. But the browser is a hidden variable. A consumer Chrome silently auto-updates in the background, potentially changing render or layout behaviour between two CI runs, making a test 'green yesterday, red today' with no code change. This is the most frustrating kind of flakiness because the cause lies outside your repo. Playwright 1.57 attacks the root by switching to Chrome for Testing builds.",
        "自動スイートは決定的であって初めて価値を持ちます。同じコード、同じデータは同じ結果を出さねばなりません。しかしブラウザは隠れた変数です。一般向けChromeは背後で静かに自動更新し、二回のCI実行の間にレンダリングやレイアウトの挙動を変え得ます。コード変更なしに『昨日は緑、今日は赤』となるのです。原因があなたのリポジトリの外にあるため、これは最も厄介なフレーキーです。Playwright 1.57はChrome for Testingビルドへ切り替えることで根本を断ちます。",
      ),
      P(
        "Bài viết này giải thích Chrome for Testing là gì, vì sao nó ổn định hơn, và cách tổ chức cross-browser đúng chuẩn: projects cho chromium/firefox/webkit, mobile emulation, cấu hình channel, và những hệ quả trong CI. Chúng ta xem qua một góc nhìn SaaS: một ứng dụng web nhiều khách hàng cần bằng chứng rằng nó chạy đúng trên mọi engine và mọi kích thước màn hình mà khách dùng, không phải chỉ trên máy của lập trình viên.",
        "This article explains what Chrome for Testing is, why it is more stable, and how to structure cross-browser testing properly: projects for chromium/firefox/webkit, mobile emulation, channel configuration, and the CI implications. We take a SaaS lens: a multi-tenant web app needs evidence that it works on every engine and every screen size its customers use, not just on a developer's machine.",
        "本稿はChrome for Testingとは何か、なぜより安定するのか、そしてクロスブラウザテストを正しく構成する方法を説明します。chromium/firefox/webkit向けのprojects、モバイルエミュレーション、channel設定、そしてCIへの影響です。SaaSの視点で見ます。マルチテナントのWebアプリは、開発者のマシン上だけでなく、顧客が使うあらゆるエンジンとあらゆる画面サイズで動く証拠を必要とします。",
      ),
      NOTE(
        "Tái lập được (reproducibility) không phải mục tiêu 'nice to have'. Không tái lập được thì mọi kết quả test đều đáng ngờ, và đội sẽ dần mất niềm tin vào suite — dấu chấm hết cho tự động hóa.",
        "Reproducibility is not a 'nice to have'. Without it every test result is suspect, and the team gradually loses trust in the suite — the death of automation.",
        "再現性は『あれば良い』ものではありません。それなしでは全てのテスト結果が疑わしくなり、チームは次第にスイートへの信頼を失います。自動化の終焉です。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Chrome for Testing là gì?",
      en: "2. What is Chrome for Testing?",
      ja: "2. Chrome for Testingとは何か？",
    },
    blocks: [
      P(
        "Chrome for Testing (CfT) là một dòng bản Chrome do Google phát hành riêng cho mục đích tự động hóa. Khác với Chrome người dùng, CfT không có cơ chế tự cập nhật, được đánh phiên bản rõ ràng và có thể tải về theo đúng số hiệu qua một điểm phân phối ổn định (JSON endpoints liệt kê mọi phiên bản kèm ChromeDriver tương ứng). Nói ngắn gọn: CfT tồn tại để bạn ghim (pin) một phiên bản và tin rằng nó không đổi dưới chân mình. Playwright 1.57 dùng các bản CfT cho cả chế độ headed và headless.",
        "Chrome for Testing (CfT) is a line of Chrome builds Google releases specifically for automation. Unlike consumer Chrome, CfT has no auto-update, is clearly versioned, and can be downloaded by exact number from a stable distribution point (JSON endpoints listing every version with its matching ChromeDriver). In short: CfT exists so you can pin a version and trust it will not shift under your feet. Playwright 1.57 uses CfT builds for both headed and headless modes.",
        "Chrome for Testing（CfT）は、Googleが自動化のために特別にリリースするChromeビルドの系列です。一般向けChromeと異なり、CfTには自動更新がなく、明確にバージョン付けされ、安定した配布点（各バージョンと対応するChromeDriverを列挙するJSONエンドポイント）から正確な番号でダウンロードできます。要するに、CfTはバージョンを固定（ピン）し、足元で変わらないと信頼するために存在します。Playwright 1.57はheadedとheadlessの両方でCfTビルドを使います。",
      ),
      IMG(
        svgCftPipeline,
        "So sánh: Chrome người dùng (tự cập nhật, phiên bản trôi, flaky) vs Chrome for Testing (ghim, tái lập được).",
        "Comparison: consumer Chrome (auto-update, drifting version, flaky) vs Chrome for Testing (pinned, reproducible).",
        "比較：一般向けChrome（自動更新、バージョン漂流、フレーキー）とChrome for Testing（固定、再現可能）。",
      ),
      P(
        "Trước đây, Playwright dùng một bản build Chromium nội bộ. CfT gần với Chrome thật hơn về mặt tính năng thương mại (ví dụ các API media, codec), nên bài test phản ánh sát hành vi mà người dùng cuối gặp, đồng thời vẫn giữ được tính ghim phiên bản. Đây là sự cân bằng giữa 'giống Chrome thật' và 'không bị trôi' — điều mà cả Chromium thuần lẫn Chrome người dùng đều không đạt được trọn vẹn.",
        "Previously Playwright used an internal Chromium build. CfT is closer to real Chrome in commercial features (e.g. media APIs, codecs), so tests reflect the behaviour end users actually see, while still keeping version pinning. This is the balance between 'like real Chrome' and 'no drift' — something neither pure Chromium nor consumer Chrome fully achieves.",
        "以前、Playwrightは内部のChromiumビルドを使っていました。CfTは商用機能（例：メディアAPI、コーデック）の面で本物のChromeに近く、テストはエンドユーザーが実際に見る挙動を反映しつつ、バージョン固定も保ちます。これは『本物のChromeに近い』と『漂流しない』の均衡です。純粋なChromiumも一般向けChromeも完全には達成できないものです。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Vì sao ghim phiên bản lại chống flaky",
      en: "3. Why pinned versions fight flakiness",
      ja: "3. なぜバージョン固定はフレーキーと戦うのか",
    },
    blocks: [
      P(
        "Flaky do trình duyệt thường đến từ những thay đổi tinh vi: một pixel khác trong render font làm hỏng so sánh ảnh, một thay đổi timing trong scheduler làm đổi thứ tự sự kiện, hay một API bị đánh dấu deprecated. Khi trình duyệt tự cập nhật, những thay đổi này ập tới bất ngờ. Ghim phiên bản biến trình duyệt từ biến số thành hằng số: bạn cập nhật nó một cách có chủ đích, qua một commit, và chạy lại toàn bộ suite để xác nhận trước khi chấp nhận. Việc nâng cấp trở thành một sự kiện được kiểm soát, không phải một tai nạn.",
        "Browser-induced flakiness usually comes from subtle changes: a different pixel in font rendering breaks a screenshot comparison, a timing change in the scheduler alters event order, or an API gets deprecated. When the browser auto-updates, these arrive unannounced. Pinning turns the browser from a variable into a constant: you update it deliberately, via a commit, and rerun the whole suite to confirm before accepting. The upgrade becomes a controlled event, not an accident.",
        "ブラウザ由来のフレーキーは通常、微妙な変化から生じます。フォント描画の1ピクセルの違いがスクリーンショット比較を壊し、スケジューラのタイミング変化がイベント順を変え、あるいはAPIが非推奨になります。ブラウザが自動更新すると、これらは予告なく到来します。固定はブラウザを変数から定数へ変えます。コミットを通じて意図的に更新し、受け入れる前にスイート全体を再実行して確認します。アップグレードは事故ではなく制御されたイベントになります。",
      ),
      CODE(
        "bash",
        `# Cài đúng phiên bản trình duyệt Playwright quản lý (đã ghim theo release).
npx playwright install chromium firefox webkit

# Xem phiên bản chính xác đang dùng -> ghi vào tài liệu/CI để tái lập.
npx playwright --version

# Trong CI, cache theo đúng số hiệu để mọi runner dùng cùng một binary.
# key: playwright-\${{ hashFiles('package-lock.json') }}`,
      ),
      TIP(
        "Ghim phiên bản Playwright trong package.json (không dùng dấu ^ mở rộng) vì phiên bản trình duyệt gắn với phiên bản Playwright. Nâng cấp Playwright = nâng cấp trình duyệt, hãy làm có chủ đích.",
        "Pin the Playwright version in package.json (avoid a loose ^) because the browser version is tied to the Playwright version. Upgrading Playwright means upgrading the browser — do it deliberately.",
        "package.jsonでPlaywrightのバージョンを固定しましょう（緩い^は避ける）。ブラウザのバージョンはPlaywrightのバージョンに紐づくためです。Playwrightの更新はブラウザの更新を意味します。意図的に行いましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Ba engine: chromium, firefox, webkit",
      en: "4. Three engines: chromium, firefox, webkit",
      ja: "4. 三つのエンジン：chromium、firefox、webkit",
    },
    blocks: [
      P(
        "Cross-browser thật sự nghĩa là kiểm trên ba engine render khác nhau, không phải ba thương hiệu. chromium (dùng CfT) đại diện Chrome và Edge; firefox dùng engine Gecko; webkit dùng engine của Safari. Vì Safari trên iOS bắt buộc dùng WebKit, project webkit là cách duy nhất trên nhiều nền tảng để bắt lỗi đặc thù Safari mà không cần máy Mac thật cho mọi lập trình viên. Ba engine phủ gần như toàn bộ thị phần trình duyệt của một sản phẩm SaaS phổ thông.",
        "True cross-browser means testing on three different rendering engines, not three brands. chromium (using CfT) represents Chrome and Edge; firefox uses the Gecko engine; webkit uses Safari's engine. Because Safari on iOS is required to use WebKit, the webkit project is on many platforms the only way to catch Safari-specific bugs without a real Mac for every developer. The three engines cover nearly the entire browser market share of a typical SaaS product.",
        "真のクロスブラウザとは、三つの異なるレンダリングエンジンでのテストであり、三つのブランドではありません。chromium（CfTを使用）はChromeとEdgeを代表し、firefoxはGeckoエンジンを、webkitはSafariのエンジンを使います。iOSのSafariはWebKitの使用が必須なため、webkitプロジェクトは多くのプラットフォームで、開発者全員に実機Macを用意せずSafari固有のバグを捕らえる唯一の方法です。三つのエンジンは一般的なSaaS製品のブラウザシェアのほぼ全域を覆います。",
      ),
      CODE(
        "ts",
        `// playwright.config.ts — ba engine cơ bản.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },  // CfT ở 1.57+
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});`,
      ),
      P(
        "Một sai lầm phổ biến là nghĩ 'tôi test trên Chrome và Edge nghĩa là đã cross-browser'. Thực ra cả hai đều dùng engine Chromium, nên bạn chỉ đang test một engine hai lần. Cross-browser có ý nghĩa khi và chỉ khi bạn đổi engine render, vì chính engine mới quyết định cách CSS được tính, cách JavaScript được lập lịch, và cách các API web được hiện thực. Vì thế ba project chromium/firefox/webkit của Playwright được thiết kế đúng theo trục engine: chúng đại diện cho ba cách hiểu khác nhau về cùng một trang web mà người dùng thật của bạn đang trải nghiệm mỗi ngày.",
        "A common mistake is thinking 'I test on Chrome and Edge, so I am cross-browser'. In fact both use the Chromium engine, so you are testing one engine twice. Cross-browser matters if and only if you change the rendering engine, because the engine is what decides how CSS is computed, how JavaScript is scheduled, and how web APIs are implemented. That is why Playwright's three chromium/firefox/webkit projects are designed along the engine axis: they represent three different interpretations of the same web page that your real users experience every day.",
        "よくある誤解は『ChromeとEdgeでテストしているからクロスブラウザだ』と考えることです。実際には両方ともChromiumエンジンを使うため、一つのエンジンを二度テストしているだけです。クロスブラウザが意味を持つのは、レンダリングエンジンを変えるときだけです。エンジンこそがCSSの計算方法、JavaScriptのスケジューリング、Web APIの実装を決めるからです。だからこそPlaywrightの三つのchromium/firefox/webkitプロジェクトはエンジン軸に沿って設計されています。実際のユーザーが毎日体験する同じWebページの、三つの異なる解釈を表します。",
      ),
      NOTE(
        "devices['Desktop Chrome'] không phải 'một cái Chrome bất kỳ' — nó là preset cấu hình viewport, userAgent, và engine chromium mà Playwright ghim. Đó là lý do nó tái lập được.",
        "devices['Desktop Chrome'] is not 'some random Chrome' — it is a preset for viewport, userAgent, and the chromium engine Playwright pins. That is why it is reproducible.",
        "devices['Desktop Chrome']は『どこかの適当なChrome』ではありません。ビューポート、userAgent、そしてPlaywrightが固定するchromiumエンジンのプリセットです。だからこそ再現可能なのです。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Mobile emulation: Pixel và iPhone",
      en: "5. Mobile emulation: Pixel and iPhone",
      ja: "5. モバイルエミュレーション：PixelとiPhone",
    },
    blocks: [
      P(
        "Phần lớn lưu lượng của một SaaS hiện đại đến từ di động, nhưng dựng cả một trại thiết bị thật là tốn kém. Playwright cung cấp emulation: đặt viewport, deviceScaleFactor, userAgent, isMobile và hasTouch để mô phỏng một thiết bị. 'Mobile Chrome' chạy trên engine chromium với hình dáng Pixel; 'Mobile Safari' chạy trên webkit với hình dáng iPhone — điểm mấu chốt là nó dùng đúng engine của Safari, nên phát hiện được lỗi CSS/JS đặc thù iOS, chứ không chỉ thu nhỏ cửa sổ Chrome. Emulation không thay thế hoàn toàn thiết bị thật, nhưng bắt được đại đa số lỗi layout responsive sớm và rẻ.",
        "Most traffic for a modern SaaS comes from mobile, but building a real device lab is expensive. Playwright offers emulation: setting viewport, deviceScaleFactor, userAgent, isMobile and hasTouch to simulate a device. 'Mobile Chrome' runs on the chromium engine with a Pixel shape; 'Mobile Safari' runs on webkit with an iPhone shape — crucially it uses Safari's actual engine, so it detects iOS-specific CSS/JS bugs, not merely a shrunk Chrome window. Emulation does not fully replace real devices, but it catches the vast majority of responsive layout bugs early and cheaply.",
        "現代のSaaSのトラフィックの大半はモバイルから来ますが、実機ラボの構築は高価です。Playwrightはエミュレーションを提供します。viewport、deviceScaleFactor、userAgent、isMobile、hasTouchを設定して端末を模擬します。『Mobile Chrome』はPixelの形でchromiumエンジン上を走り、『Mobile Safari』はiPhoneの形でwebkit上を走ります。重要なのはSafariの実エンジンを使う点で、単に縮小したChrome窓ではなくiOS固有のCSS/JSバグを検出します。エミュレーションは実機を完全には置き換えませんが、レスポンシブのレイアウトバグの大半を早く安く捕らえます。",
      ),
      CODE(
        "ts",
        `// Thêm project mobile — dùng đúng engine, chỉ đổi hình dáng thiết bị.
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },   // chromium engine
  { name: 'Mobile Safari', use: { ...devices['iPhone 15'] } }, // webkit engine (iOS-like)
],`,
      ),
      P(
        "Trong thực tế, phần lớn lỗi responsive không nằm ở API thiết bị mà ở layout: một menu bị tràn ở viewport hẹp, một nút bị che bởi bàn phím ảo, một bảng không cuộn ngang được trên màn hình nhỏ. Những lỗi này emulation bắt rất tốt và rẻ, vì chúng phụ thuộc vào kích thước và engine chứ không phụ thuộc phần cứng thật. Chiến lược khôn ngoan cho SaaS là phủ rộng bằng emulation ở CI mỗi ngày, và dành ngân sách thiết bị thật cho một nhóm nhỏ tính năng quan trọng như thanh toán trong ứng dụng hay quét mã. Nhờ đó bạn có độ phủ cao mà không đốt tiền vào một trại thiết bị khổng lồ.",
        "In practice most responsive bugs are not in device APIs but in layout: a menu overflowing at a narrow viewport, a button hidden by the virtual keyboard, a table that cannot scroll horizontally on a small screen. Emulation catches these very well and cheaply, because they depend on size and engine rather than on real hardware. A wise SaaS strategy is broad emulation coverage in daily CI, reserving the real-device budget for a small set of critical features like in-app payment or scanning. This gives high coverage without burning money on a huge device lab.",
        "実際、レスポンシブのバグの大半は端末APIではなくレイアウトにあります。狭いビューポートでメニューがはみ出す、仮想キーボードにボタンが隠れる、小さな画面で表が横スクロールできない、などです。これらは実ハードウェアではなくサイズとエンジンに依存するため、エミュレーションが非常によく安価に捕らえます。SaaSの賢明な戦略は、日常のCIでは広くエミュレーションで覆い、アプリ内決済やスキャンのような重要機能の小さな集合に実機予算を割くことです。巨大な端末ラボに散財せず高い網羅を得られます。",
      ),
      WARN(
        "Emulation không phải thiết bị thật: nó không mô phỏng CPU chậm, mạng thật, hay lỗi phần cứng camera/GPS. Với tính năng nhạy hiệu năng hoặc dùng sâu API thiết bị, hãy bổ sung một tầng test trên thiết bị thật.",
        "Emulation is not a real device: it does not simulate a slow CPU, real network, or camera/GPS hardware quirks. For performance-sensitive features or deep device-API use, add a real-device test layer.",
        "エミュレーションは実機ではありません。遅いCPU、実ネットワーク、カメラ／GPSのハードウェア特有の癖は模擬しません。性能に敏感な機能や端末APIの深い利用には、実機テストの層を追加してください。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Cấu hình channel: khi cần Chrome/Edge đã cài trên máy",
      en: "6. Channel config: when you need the machine's installed Chrome/Edge",
      ja: "6. channel設定：マシンに入ったChrome/Edgeが必要なとき",
    },
    blocks: [
      P(
        "Đôi khi bạn cần chạy trên Chrome hoặc Edge bản chính thức đã cài trên máy — ví dụ để kiểm một tính năng chỉ có ở bản thương mại, hoặc để tái lập báo lỗi của khách trên Edge. Tùy chọn channel cho phép điều đó: channel:'chrome', 'chrome-beta', 'msedge', v.v. Khi dùng channel, Playwright điều khiển binary hệ thống thay vì CfT ghim. Đây là công cụ hữu ích nhưng cần dùng có ý thức: bạn đánh đổi tính tái lập lấy tính 'giống môi trường khách', nên thường tách thành project riêng chạy có chọn lọc.",
        "Sometimes you need to run on the machine's official Chrome or Edge — for instance to test a feature only in the commercial build, or to reproduce a customer's bug on Edge. The channel option enables that: channel:'chrome', 'chrome-beta', 'msedge', etc. With a channel, Playwright drives the system binary instead of pinned CfT. It is a useful tool but use it consciously: you trade reproducibility for 'closeness to the customer environment', so it is usually a separate project run selectively.",
        "時にはマシンの公式ChromeやEdgeで実行する必要があります。例えば商用ビルドにしかない機能を検証したり、Edge上の顧客のバグを再現したりするためです。channelオプションがそれを可能にします。channel:'chrome'、'chrome-beta'、'msedge'などです。channelを使うと、Playwrightは固定されたCfTの代わりにシステムのバイナリを制御します。有用な道具ですが意識して使いましょう。再現性と『顧客環境への近さ』を引き換えにするため、通常は選択的に実行する別プロジェクトにします。",
      ),
      CODE(
        "ts",
        `projects: [
  // Mặc định: CfT ghim, tái lập được -> chạy trong mọi CI run.
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },

  // Kênh hệ thống: chỉ chạy khi cần (ví dụ nightly hoặc gắn @channel).
  { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
  { name: 'chrome-stable', use: { channel: 'chrome' } },
],`,
      ),
      QA(
        "Khi nào dùng channel:'chrome' thay vì chromium mặc định?",
        "When to use channel:'chrome' instead of the default chromium?",
        "Dùng channel khi bạn cần đúng binary Chrome/Edge thương mại: kiểm codec/DRM chỉ có ở bản chính thức, hoặc tái lập lỗi khách báo trên phiên bản cụ thể. Với suite hằng ngày, giữ chromium (CfT) vì nó ghim và tái lập được; đưa channel vào một job riêng để không làm cả suite phụ thuộc vào bản Chrome trên runner.",
        "Use a channel when you need the exact commercial Chrome/Edge binary: testing codecs/DRM only in the official build, or reproducing a customer bug on a specific version. For the daily suite keep chromium (CfT) because it is pinned and reproducible; put channel into a separate job so the whole suite does not depend on the runner's installed Chrome.",
        "デフォルトのchromiumではなくchannel:'chrome'を使うのはいつですか？",
        "商用のChrome/Edgeバイナリそのものが必要なときにchannelを使います。公式ビルドにしかないコーデック／DRMの検証や、特定バージョンでの顧客バグの再現です。日常のスイートはchromium（CfT）を保ちます。固定され再現可能だからです。channelは別ジョブに入れ、スイート全体がランナー導入のChromeに依存しないようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Chạy chọn lọc project trong CLI",
      en: "7. Selecting projects on the CLI",
      ja: "7. CLIでのプロジェクト選択",
    },
    blocks: [
      P(
        "Chạy đủ mọi project cho mọi push là tốn kém và không cần thiết. Chiến lược thường dùng: khi phát triển cục bộ chỉ chạy chromium cho nhanh; khi mở pull request chạy đủ ba engine; ban đêm (nightly) chạy thêm mobile và channel hệ thống. Playwright hỗ trợ chọn project bằng cờ --project, và có thể grep theo tag để chạy con của suite. Nhờ đó bạn cân bằng giữa phản hồi nhanh và độ phủ rộng.",
        "Running every project on every push is expensive and unnecessary. A common strategy: locally run only chromium for speed; on pull request run all three engines; nightly add mobile and the system channels. Playwright supports selecting projects with the --project flag, and can grep by tag to run a subset of the suite. This balances fast feedback against broad coverage.",
        "全プッシュで全プロジェクトを走らせるのは高価で不要です。よくある戦略はこうです。ローカルでは速度のためchromiumのみ、プルリクエストでは三エンジン全て、夜間（nightly）にはモバイルとシステムchannelを追加します。Playwrightは--projectフラグでのプロジェクト選択に対応し、タグでgrepしてスイートの一部を走らせられます。これで速い反応と広い網羅を両立します。",
      ),
      CODE(
        "bash",
        `# Cục bộ: nhanh, chỉ một engine.
npx playwright test --project=chromium

# CI trên PR: ba engine chính.
npx playwright test --project=chromium --project=firefox --project=webkit

# Nightly: thêm mobile + kênh hệ thống.
npx playwright test  # tất cả project trong config

# Chỉ chạy nhóm test smoke bất kể project.
npx playwright test --grep @smoke`,
      ),
      TIP(
        "Đặt tên project nhất quán và ổn định vì báo cáo và artifact gắn theo tên project. Đổi tên project = mất liên tục lịch sử flaky trong dashboard.",
        "Keep project names consistent and stable because reports and artifacts are keyed by project name. Renaming a project breaks the continuity of flaky history in the dashboard.",
        "プロジェクト名は一貫させ安定させましょう。レポートとアーティファクトはプロジェクト名で紐づくためです。プロジェクト名の変更はダッシュボードのフレーキー履歴の連続性を壊します。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Hệ quả trong CI: cài trình duyệt và cache",
      en: "8. CI implications: installing browsers and caching",
      ja: "8. CIへの影響：ブラウザのインストールとキャッシュ",
    },
    blocks: [
      P(
        "Vì CfT ghim phiên bản, mỗi runner CI phải tải đúng binary đó. Bước npx playwright install --with-deps kéo về cả trình duyệt lẫn thư viện hệ thống cần thiết. Để tiết kiệm thời gian, cache thư mục trình duyệt theo khóa gắn với phiên bản Playwright — không đổi khi Playwright không đổi. Nên chạy các project trên các job/shard song song để tổng thời gian không phình theo số engine. Với image Docker, cân nhắc image chính thức của Playwright đã kèm sẵn trình duyệt để bỏ hẳn bước install.",
        "Because CfT pins the version, each CI runner must download that exact binary. The npx playwright install --with-deps step pulls both browsers and the needed system libraries. To save time, cache the browsers directory with a key tied to the Playwright version — unchanged while Playwright is unchanged. Run projects on parallel jobs/shards so total time does not balloon with the number of engines. For Docker, consider Playwright's official image with browsers preinstalled to drop the install step entirely.",
        "CfTはバージョンを固定するため、各CIランナーはその正確なバイナリをダウンロードせねばなりません。npx playwright install --with-depsのステップはブラウザと必要なシステムライブラリの両方を取得します。時間節約のため、Playwrightのバージョンに紐づくキーでブラウザディレクトリをキャッシュします。Playwrightが変わらない限り変わりません。プロジェクトを並列のジョブ／シャードで走らせ、総時間がエンジン数で膨らまないようにします。Dockerでは、installステップを完全に省くため、ブラウザが事前導入されたPlaywright公式イメージを検討しましょう。",
      ),
      CODE(
        "yaml",
        `# CI: cache trình duyệt theo phiên bản Playwright + chạy 3 engine song song.
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - name: Cache browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: pw-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
      - run: npx playwright install --with-deps \${{ matrix.project }}
      - run: npx playwright test --project=\${{ matrix.project }}`,
      ),
      SCEN(
        "Sự cố: 'CI xanh, nhưng khách gặp lỗi chỉ trên Safari'",
        "Incident: 'CI is green, but customers hit a bug only on Safari'",
        "Điều tra cho thấy suite chỉ chạy chromium để tiết kiệm thời gian. Ta bổ sung project webkit vào pipeline PR và ngay lập tức tái lập được lỗi flex-gap đặc thù WebKit. Bài học: 'xanh' chỉ có ý nghĩa trong phạm vi engine đã chạy; muốn tự tin cross-browser thì phải thật sự chạy các engine đó, không suy diễn từ một engine.",
        "Investigation shows the suite only ran chromium to save time. We add the webkit project to the PR pipeline and immediately reproduce a WebKit-specific flex-gap bug. Lesson: 'green' only means something within the engines that ran; to be confident cross-browser you must actually run those engines, not extrapolate from one.",
        "インシデント：『CIは緑なのに、顧客はSafariだけでバグに遭う』",
        "調査の結果、時間節約のためスイートはchromiumのみを走らせていました。webkitプロジェクトをPRパイプラインに追加すると、即座にWebKit固有のflex-gapバグを再現できました。教訓はこうです。『緑』は走ったエンジンの範囲でしか意味を持ちません。クロスブラウザに自信を持つには、一つのエンジンから推測せず、それらのエンジンを実際に走らせねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Headed vs headless với Chrome for Testing",
      en: "9. Headed vs headless with Chrome for Testing",
      ja: "9. Chrome for Testingでのheadedとheadless",
    },
    blocks: [
      P(
        "Trước đây, chế độ headless của Chrome là một bản thực thi khác biệt về hành vi so với headed, gây ra những lỗi 'chỉ xảy ra khi không hiển thị' rất khó chịu. Với 1.57, CfT hợp nhất: cả headed và headless đều dùng cùng dòng build, nên hành vi nhất quán hơn giữa lúc bạn xem tận mắt (headed, để debug) và lúc CI chạy ẩn (headless). Điều này giảm hẳn nhóm flaky do khác biệt headless/headed, và làm cho việc 'chạy được trên máy tôi' đáng tin hơn khi lên CI.",
        "Previously Chrome's headless mode was a behaviourally distinct implementation from headed, causing frustrating 'only when not displayed' bugs. With 1.57, CfT unifies them: both headed and headless use the same build line, so behaviour is more consistent between when you watch (headed, for debugging) and when CI runs hidden (headless). This sharply reduces the headless/headed flakiness class and makes 'works on my machine' more trustworthy in CI.",
        "以前、Chromeのheadlessモードはheadedとは挙動の異なる実装であり、『表示しないときだけ起きる』という厄介なバグを生みました。1.57ではCfTがこれを統一します。headedもheadlessも同じビルド系列を使うため、目視するとき（デバッグ用のheaded）とCIが隠れて走るとき（headless）の挙動がより一貫します。これによりheadless/headed差異によるフレーキーの一群が大幅に減り、『自分のマシンでは動く』がCIでより信頼できます。",
      ),
      CODE(
        "ts",
        `// Chọn headed/headless theo môi trường, nhưng cùng một dòng CfT.
export default defineConfig({
  use: {
    headless: !!process.env.CI,   // CI: headless; cục bộ: headed để xem
    trace: 'retain-on-failure',   // giữ trace khi hỏng để điều tra
  },
});`,
      ),
      NOTE(
        "Vẫn nên có một job debug chạy headed khi cần soi mắt, nhưng đừng để hành vi khác nhau giữa hai chế độ là nguồn flaky. Với CfT, khoảng cách đó đã hẹp lại đáng kể.",
        "Still keep a headed debug job when you need to eyeball things, but do not let differing behaviour between modes be a flakiness source. With CfT, that gap has narrowed considerably.",
        "目視が必要なときのためheadedのデバッグジョブは残しつつ、二つのモード間の挙動差をフレーキーの原因にしないでください。CfTにより、その差はかなり縮まりました。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Xử lý khác biệt engine trong bài test",
      en: "10. Handling engine differences inside tests",
      ja: "10. テスト内でのエンジン差異の扱い",
    },
    blocks: [
      P(
        "Chạy trên ba engine đôi khi lộ ra khác biệt hợp lệ: một API chưa hỗ trợ trên WebKit, một hành vi cuộn khác trên Firefox. Cách xử lý đúng không phải là if lồng rối rắm, mà dùng cơ chế của Playwright: test.skip() có điều kiện theo browserName cho tính năng chưa được engine hỗ trợ, hoặc tách project với testMatch riêng. Quan trọng là ghi rõ lý do skip để nó là quyết định có tài liệu, không phải cách né lỗi. Một bài test bị skip mà không giải thích là một khoảng mù nguy hiểm.",
        "Running on three engines sometimes reveals legitimate differences: an API not yet supported on WebKit, a different scroll behaviour on Firefox. The right handling is not tangled nested ifs but Playwright's mechanisms: conditional test.skip() by browserName for a feature an engine lacks, or a separate project with its own testMatch. Crucially, document the reason for the skip so it is a recorded decision, not a way to dodge a bug. A skipped test with no explanation is a dangerous blind spot.",
        "三エンジンでの実行は、時に正当な差異を露呈します。WebKitで未対応のAPI、Firefoxで異なるスクロール挙動などです。正しい扱いは絡み合った入れ子のifではなく、Playwrightの仕組みです。エンジンが欠く機能にはbrowserNameによる条件付きtest.skip()、あるいは独自のtestMatchを持つ別プロジェクトです。重要なのはskipの理由を記録し、バグを避ける手段ではなく文書化された決定にすることです。説明のないskipされたテストは危険な盲点です。",
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';

test('tải file qua API mới', async ({ page, browserName }) => {
  // Bỏ qua CÓ LÝ DO: API này chưa hỗ trợ trên WebKit tại phiên bản đang ghim.
  test.skip(browserName === 'webkit', 'File System Access API chưa có trên WebKit');

  await page.goto('/export');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  await expect(page.getByText('Đã xuất')).toBeVisible();
});`,
      ),
      QA(
        "Nên làm gì khi một bài test đỏ chỉ trên một engine?",
        "What to do when a test is red on only one engine?",
        "Trước tiên xác định đó là lỗi thật của sản phẩm trên engine đó hay khác biệt hành vi hợp lệ. Nếu là lỗi sản phẩm, đó chính là giá trị của cross-browser — báo cho dev sửa. Nếu là khác biệt hợp lệ (API chưa hỗ trợ), dùng test.skip có điều kiện kèm lý do rõ ràng và, nếu cần, mở issue theo dõi để không quên gỡ skip khi engine hỗ trợ.",
        "First determine whether it is a real product bug on that engine or a legitimate behaviour difference. If it is a product bug, that is exactly the value of cross-browser — report it to dev. If it is a legitimate difference (unsupported API), use conditional test.skip with a clear reason and, if needed, open a tracking issue so you remember to remove the skip once the engine supports it.",
        "あるエンジンだけでテストが赤いとき何をすべきですか？",
        "まず、それがそのエンジンでの本物の製品バグか、正当な挙動差かを見極めます。製品バグならまさにクロスブラウザの価値です。開発へ報告します。正当な差（未対応API）なら、明確な理由付きの条件付きtest.skipを使い、必要なら追跡issueを開いて、エンジンが対応したらskip解除を忘れないようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Chiến lược ma trận cho SaaS đa khách hàng",
      en: "11. Matrix strategy for a multi-tenant SaaS",
      ja: "11. マルチテナントSaaSのためのマトリクス戦略",
    },
    blocks: [
      P(
        "Một SaaS phục vụ nhiều khách hàng thường có dữ liệu phân tích cho biết khách thực tế dùng trình duyệt và kích thước nào. Hãy để dữ liệu đó dẫn dắt ma trận: đừng test iPhone SE nếu không ai dùng, nhưng chớ bỏ Firefox nếu 8% khách dùng nó. Ma trận nên phủ các cặp (engine × viewport) trọng yếu chứ không phủ mù quáng mọi tổ hợp — tổ hợp bùng nổ nhanh. Ghim phiên bản CfT còn giúp bạn có một 'đường cơ sở' rõ ràng để đối chiếu khi khách báo lỗi trên phiên bản mới của Chrome.",
        "A SaaS serving many customers usually has analytics showing which browsers and sizes customers actually use. Let that data drive the matrix: do not test an iPhone SE if nobody uses it, but do not drop Firefox if 8% of customers use it. The matrix should cover the significant (engine × viewport) pairs rather than blindly every combination — combinations explode fast. Pinning the CfT version also gives you a clear baseline to compare against when a customer reports a bug on a newer Chrome.",
        "多くの顧客に提供するSaaSは通常、顧客が実際にどのブラウザとサイズを使うかを示す分析データを持ちます。そのデータでマトリクスを導きましょう。誰も使わないiPhone SEはテストせず、顧客の8%が使うならFirefoxを外しません。マトリクスは全組み合わせを盲目的に覆うのではなく、重要な（エンジン×ビューポート）の対を覆うべきです。組み合わせは急速に爆発します。CfTのバージョン固定は、顧客が新しいChromeでバグを報告したときに比較する明確な基準線も与えます。",
      ),
      IMG(
        svgProjects,
        "Ma trận projects: ba engine + hai mobile + một kênh hệ thống — một config, nhiều môi trường.",
        "Projects matrix: three engines + two mobiles + one system channel — one config, many environments.",
        "プロジェクトのマトリクス：三エンジン＋二モバイル＋一システムchannel。一つの設定で多くの環境を。",
      ),
      TIP(
        "Gắn nhãn ưu tiên cho project: chromium là bắt buộc mỗi PR, firefox/webkit bắt buộc trước merge, mobile/channel chạy nightly. Rõ ràng ưu tiên giúp cân bằng tốc độ và độ phủ mà không tranh cãi mỗi lần.",
        "Tag projects with priority: chromium mandatory each PR, firefox/webkit mandatory before merge, mobile/channel nightly. Clear priorities balance speed and coverage without arguing every time.",
        "プロジェクトに優先度を付けましょう。chromiumは各PRで必須、firefox/webkitはマージ前に必須、mobile/channelはnightlyです。明確な優先度は、毎回議論せずに速度と網羅を両立させます。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới AI-agent trong cross-browser",
      en: "12. AI-agent boundary in cross-browser",
      ja: "12. クロスブラウザにおけるAIエージェントの境界",
    },
    blocks: [
      P(
        "AI agent có thể sinh nhanh khung test chạy trên nhiều project và gợi ý locator ổn định, nhưng quyết định 'engine nào là quan trọng với khách của chúng ta' thuộc về con người, dựa trên dữ liệu thật. Agent cũng dễ đề xuất test.skip để 'làm cho xanh' khi gặp khác biệt engine — đây là chỗ nguy hiểm cần review, vì skip sai chỗ che giấu lỗi cross-browser thật. Neo (grounding) agent vào tài liệu tương thích và số liệu phân tích khách hàng để tránh ảo giác về độ phủ.",
        "An AI agent can quickly scaffold tests across projects and suggest stable locators, but the decision 'which engine matters to our customers' belongs to humans, based on real data. Agents also readily propose test.skip to 'make it green' when they hit an engine difference — a dangerous spot to review, since a wrong skip hides a real cross-browser bug. Ground the agent in compatibility docs and customer analytics to avoid hallucinating coverage.",
        "AIエージェントは複数プロジェクトにまたがるテストの骨組みを素早く作り、安定ロケーターを提案できますが、『どのエンジンが顧客にとって重要か』の判断は実データに基づき人間に属します。エージェントはエンジン差に遭うと『緑にする』ためtest.skipを気軽に提案しがちです。誤ったskipは本物のクロスブラウザバグを隠すため、レビューすべき危険箇所です。網羅のハルシネーションを避けるため、互換性ドキュメントと顧客分析にエージェントをグラウンディングしましょう。",
      ),
      QA(
        "AI-agent có thể tự chọn ma trận cross-browser không?",
        "Can an AI agent choose the cross-browser matrix on its own?",
        "Không nên để nó tự quyết. Agent thiếu bối cảnh kinh doanh về khách hàng nào quan trọng và ràng buộc chi phí CI. Hãy để agent đề xuất và tự động hóa việc dựng config, còn con người chốt ma trận dựa trên phân tích thị phần trình duyệt thực tế và SLA. Agent giỏi ở việc thực thi, con người giỏi ở việc chọn cái gì đáng thực thi.",
        "It should not decide alone. The agent lacks business context on which customers matter and CI cost constraints. Let the agent propose and automate scaffolding the config, while humans finalize the matrix based on real browser-share analytics and SLAs. Agents are good at execution; humans are good at choosing what is worth executing.",
        "AIエージェントはクロスブラウザのマトリクスを単独で選べますか？",
        "単独で決めさせるべきではありません。エージェントはどの顧客が重要かという業務文脈とCIコストの制約を欠きます。エージェントには提案と設定の骨組み自動化を任せ、人間が実際のブラウザシェア分析とSLAに基づきマトリクスを確定します。エージェントは実行が得意で、人間は何を実行する価値があるか選ぶのが得意です。",
      ),
      WARN(
        "Đừng để agent xóa hay skip test đỏ mà không có người phê duyệt. Test đỏ trên một engine thường chính là giá trị lớn nhất của cross-browser — nó bắt lỗi mà một engine giấu.",
        "Do not let an agent delete or skip a red test without human approval. A red test on one engine is often the greatest value of cross-browser — it catches a bug one engine hides.",
        "人間の承認なしにエージェントに赤いテストを削除・skipさせないでください。あるエンジンで赤いテストはしばしばクロスブラウザの最大の価値です。あるエンジンが隠すバグを捕らえます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết và checklist triển khai",
      en: "13. Wrap-up and rollout checklist",
      ja: "13. まとめと展開チェックリスト",
    },
    blocks: [
      P(
        "Chrome for Testing biến trình duyệt từ một biến số ngầm thành một thành phần được kiểm soát, và đó là điều kiện cần cho một suite đáng tin. Kết hợp với projects cho ba engine, mobile emulation dựa trên dữ liệu khách, và channel dùng có chọn lọc, bạn có một chiến lược cross-browser vừa rộng vừa tái lập được. Trong CI, hãy ghim phiên bản, cache trình duyệt, chạy các project song song, và luôn giữ ít nhất firefox và webkit trước khi merge để không rơi vào bẫy 'xanh trên chromium là đủ'.",
        "Chrome for Testing turns the browser from a hidden variable into a controlled component, and that is a necessary condition for a trustworthy suite. Combined with projects for three engines, data-driven mobile emulation, and selectively used channels, you get a cross-browser strategy that is both broad and reproducible. In CI, pin versions, cache browsers, run projects in parallel, and always keep at least firefox and webkit before merge to avoid the 'green on chromium is enough' trap.",
        "Chrome for Testingはブラウザを隠れた変数から制御された構成要素へ変えます。それは信頼できるスイートの必要条件です。三エンジンのprojects、データ駆動のモバイルエミュレーション、選択的に使うchannelと組み合わせれば、広くかつ再現可能なクロスブラウザ戦略が得られます。CIではバージョンを固定し、ブラウザをキャッシュし、プロジェクトを並列実行し、『chromiumで緑なら十分』の罠を避けるためマージ前に少なくともfirefoxとwebkitを常に保ちます。",
      ),
      UL(
        [
          "Ghim phiên bản Playwright (kéo theo trình duyệt CfT) trong package.json.",
          "Cấu hình projects: chromium + firefox + webkit + mobile theo dữ liệu khách.",
          "Chỉ dùng channel cho nhu cầu đặc thù, tách thành project/job riêng.",
          "CI: install --with-deps, cache theo phiên bản, shard/project song song.",
          "Trước merge: bắt buộc ít nhất ba engine; nightly phủ mobile và channel.",
          "Mọi test.skip theo engine phải có lý do và issue theo dõi.",
        ],
        [
          "Pin the Playwright version (which pulls the CfT browser) in package.json.",
          "Configure projects: chromium + firefox + webkit + mobile per customer data.",
          "Use channels only for specific needs, split into a separate project/job.",
          "CI: install --with-deps, cache by version, parallel shards/projects.",
          "Before merge: mandate at least three engines; nightly cover mobile and channel.",
          "Every engine-based test.skip must carry a reason and a tracking issue.",
        ],
        [
          "package.jsonでPlaywrightのバージョン（CfTブラウザを伴う）を固定する。",
          "projectsを構成する：顧客データに応じてchromium＋firefox＋webkit＋mobile。",
          "channelは固有のニーズにのみ使い、別プロジェクト／ジョブに分ける。",
          "CI：install --with-deps、バージョンでキャッシュ、シャード／プロジェクトを並列化。",
          "マージ前：少なくとも三エンジンを必須にし、nightlyでmobileとchannelを覆う。",
          "エンジンに基づく全てのtest.skipは理由と追跡issueを持たねばならない。",
        ],
      ),
      QA(
        "Một câu tóm tắt giá trị của Chrome for Testing khi phỏng vấn?",
        "One sentence to summarize the value of Chrome for Testing in an interview?",
        "Chrome for Testing loại bỏ tự cập nhật và ghim phiên bản trình duyệt, biến nó thành một hằng số tái lập được — nhờ đó bài test tất định hơn, việc nâng cấp trở thành sự kiện có kiểm soát, và ta có một đường cơ sở rõ ràng để đối chiếu khi điều tra khác biệt hành vi giữa các phiên bản.",
        "Chrome for Testing removes auto-update and pins the browser version, turning it into a reproducible constant — so tests are more deterministic, upgrades become controlled events, and we have a clear baseline to compare against when investigating behavioural differences across versions.",
        "面接でChrome for Testingの価値を一文で要約すると？",
        "Chrome for Testingは自動更新を排し、ブラウザのバージョンを固定して再現可能な定数に変えます。これによりテストはより決定的になり、アップグレードは制御されたイベントになり、バージョン間の挙動差を調査する際に比較する明確な基準線が得られます。",
      ),
    ],
  },
];

export const PWLATEST_03 = [
  {
    categorySlug: "playwright-tools",
    slug: "pw-network-websocket-mocking",
    cover: coverA,
    tags: tags("congnghe", "fintech", "playwright", "mocking", "api", "realworld"),
    title: {
      vi: "Mock mạng & WebSocket: routeWebSocket + tracing HAR",
      en: "Network & WebSocket mocking: routeWebSocket + HAR tracing",
      ja: "ネットワーク＆WebSocketモック：routeWebSocketとHARトレース",
    },
    summary: {
      vi: "Tất định hóa luồng giá realtime fintech bằng page.route/fulfill, page.routeWebSocket() và browserContext.routeWebSocket(), cùng tracing.startHar()/stopHar() và routeFromHAR — với oracle theo bất biến tiền.",
      en: "Determinize a fintech realtime price stream with page.route/fulfill, page.routeWebSocket() and browserContext.routeWebSocket(), plus tracing.startHar()/stopHar() and routeFromHAR — with money-invariant oracles.",
      ja: "page.route/fulfill、page.routeWebSocket()、browserContext.routeWebSocket()、さらにtracing.startHar()/stopHar()とrouteFromHARで、フィンテックのリアルタイム価格ストリームを決定的にします。オラクルは資金の不変条件に基づきます。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "playwright-tools",
    slug: "pw-chrome-for-testing-crossbrowser",
    cover: coverB,
    tags: tags("congnghe", "saas", "playwright", "cicd", "foundation", "tip"),
    title: {
      vi: "Chrome for Testing & cross-browser (Playwright 1.57+)",
      en: "Chrome for Testing & cross-browser (Playwright 1.57+)",
      ja: "Chrome for Testingとクロスブラウザ（Playwright 1.57以降）",
    },
    summary: {
      vi: "Vì sao Playwright 1.57 chuyển sang bản Chrome for Testing (ghim phiên bản, headed+headless), cách dựng projects cho chromium/firefox/webkit và mobile emulation, cấu hình channel, và hệ quả trong CI để test tái lập được.",
      en: "Why Playwright 1.57 switched to Chrome for Testing builds (pinned versions, headed+headless), how to set up projects for chromium/firefox/webkit and mobile emulation, channel config, and the CI implications for reproducible tests.",
      ja: "なぜPlaywright 1.57がChrome for Testingビルド（バージョン固定、headed＋headless）へ切り替えたのか、chromium/firefox/webkitとモバイルエミュレーションのprojects構成、channel設定、そして再現可能なテストのためのCIへの影響を解説します。",
    },
    pages: buildDoc(pagesB),
  },
];
