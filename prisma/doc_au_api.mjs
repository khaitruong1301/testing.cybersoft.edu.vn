// doc_au_api.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử API tự động cơ bản — gọi thẳng endpoint (không qua giao diện) bằng Playwright
// request: GET/POST, status code, kiểm body/schema, header & token xác thực, vì sao kiểm
// API thường nhanh hơn kiểm UI rất nhiều. Practice-first, nhiều MOCKUP giao diện (ui_mock),
// có code Playwright/JS chạy được. Gắn app TMĐT ShopEasy (API sản phẩm + API đơn hàng).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, postman, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, kiểm thử API, tự động hoá và dự án thực chiến.",
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

// ── Mockup 1: Postman-style response của GET /products/1024 ──
const m_getresp = postman({
  method: "GET", url: "https://api.shopeasy.vn/products/1024", status: 200, time: "86 ms", size: "1.4 KB", ok: true,
  body: [
    "{",
    '  "id": 1024,',
    '  "name": "Ao thun ShopEasy",',
    '  "price": 199000,',
    '  "stock": 42',
    "}",
  ],
});

// ── Mockup 2: dashboard kết quả chạy bộ test API (nhanh hơn UI) ──
const m_dashboard = dashboard("Kết quả chạy bộ test API ShopEasy bằng Playwright request", [
  { label: "Tổng request", value: "48", sub: "GET + POST + xác thực" },
  { label: "Pass", value: "45", sub: "93.7% đúng status + body", color: "#16a34a" },
  { label: "Fail", value: "3", sub: "Sai status code mong đợi", color: "#ef4444" },
  { label: "Thời gian TB", value: "92 ms", sub: "nhanh hơn UI hàng chục lần" },
], { accent: "#0f766e" });

// ── Mockup 3: bảng mã trạng thái HTTP thường gặp ──
const m_statuscode = grid("Bảng mã trạng thái HTTP thường gặp khi test API ShopEasy", ["Status code", "Ý nghĩa", "Khi nào gặp ở ShopEasy"], [
  ["200 OK", "Yêu cầu thành công, server trả đúng dữ liệu", "GET /products/1024 trả chi tiết sản phẩm"],
  ["201 Created", "Tạo mới tài nguyên thành công", "POST /orders tạo đơn hàng mới"],
  ["400 Bad Request", "Dữ liệu gửi lên sai định dạng/thiếu trường", "POST /orders thiếu quantity hoặc sai kiểu dữ liệu"],
  ["401 Unauthorized", "Thiếu hoặc sai token xác thực", "Gọi POST /orders mà không có header Authorization"],
  ["403 Forbidden", "Có token nhưng không đủ quyền", "Token khách xem không được phép tạo đơn ưu đãi"],
  ["404 Not Found", "Không tìm thấy tài nguyên", "GET /products/999999 — sản phẩm không tồn tại"],
  ["500 Internal Server Error", "Lỗi phía server, không phải lỗi của người gọi", "Server ShopEasy gặp sự cố khi xử lý đơn hàng"],
], { accent: "#0f766e", note: "Nhóm 2xx = thành công, 4xx = lỗi phía client, 5xx = lỗi phía server." });

// ── Mockup 4: request POST /orders có header + body, chú thích hậu quả khi sai ──
const m_apirequest = browser("api.shopeasy.vn/orders · POST", [
  panel("ShopEasy API · Tạo đơn hàng", [
    field(24, 20, 660, "Header: Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9...", "normal"),
    field(24, 112, 660, "Body JSON: productId, quantity, address", '{"productId":1024,"quantity":2,"address":"HCM"}', "normal"),
    btn(24, 204, 220, "Send", "primary"),
    annotate(20, 10, 668, 72, "Thiếu header nay -> 401 Unauthorized"),
    annotate(20, 102, 668, 72, "quantity kieu chuoi -> 400 Bad Request"),
  ].join(""), { h: 280, accent: "#0f766e" }),
].join(""), { h: 336, title: "ShopEasy API · Đơn hàng", accent: "#0f766e" });

// ── Mockup 5: bảng tổng hợp ca kiểm thử API sản phẩm & đơn hàng ──
const m_apitable = grid("Bảng ca kiểm thử API sản phẩm & đơn hàng ShopEasy", ["Ca kiểm thử", "Input", "Kỳ vọng"], [
  ["GET sản phẩm tồn tại", "GET /products/1024", "status 200, body có id=1024, price là số dương"],
  ["GET sản phẩm không tồn tại", "GET /products/999999", "status 404, body có message lỗi"],
  ["POST đơn hàng hợp lệ", "POST /orders kèm token + đủ trường", "status 201, body có orderId, status=PENDING"],
  ["POST đơn hàng thiếu token", "POST /orders không có Authorization", "status 401, không tạo đơn hàng"],
  ["POST đơn hàng sai kiểu dữ liệu", "quantity = \"hai\" (chuỗi)", "status 400, body báo lỗi validate"],
], { accent: "#0f766e", note: "Luôn có cả ca dương (đúng) lẫn ca âm (sai) cho mỗi endpoint quan trọng." });

// ── Mockup 6: ticket Jira khi script chỉ kiểm body, bỏ qua status code ──
const m_jira = jira({
  key: "SE-15820", title: "Script chỉ check body, bỏ qua status code khiến bug 500 lọt qua",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · API ShopEasy · POST /orders"],
    ["Nguyên nhân", "Test chỉ viết expect(body.orderId).toBeTruthy(), không hề gọi expect(res.status()).toBe(...)"],
    ["Ảnh hưởng", "Server trả 500 kèm body rỗng (orderId = chuỗi 'undefined') nhưng test vẫn báo pass suốt 2 ngày"],
    ["Đề xuất", "Luôn kiểm expect(res.status()).toBe(...) NGAY DÒNG ĐẦU sau khi gọi API, trước khi đọc body"],
  ],
});

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử API là gì và khác gì với kiểm thử giao diện (UI)?",
  "What is API testing and how is it different from UI testing?",
  "Kiểm thử API là gọi trực tiếp vào các endpoint của server (ví dụ GET /products/1024) mà không thông qua giao diện, rồi kiểm tra status code và dữ liệu trả về (body) có đúng như mong đợi hay không. Khác với kiểm thử UI phải mở trình duyệt, tải trang, bấm nút rồi mới thấy kết quả, kiểm thử API chạy nhanh hơn nhiều và cho biết chính xác lỗi nằm ở tầng dữ liệu hay tầng hiển thị.",
  "API testing means calling server endpoints directly (e.g. GET /products/1024) without going through the UI, then checking whether the status code and returned data (body) match what's expected. Unlike UI testing, which requires opening a browser, loading a page, and clicking buttons before seeing results, API testing runs much faster and pinpoints whether a bug is in the data layer or the display layer.",
  "APIテストとは何で、UIテストと何が違う？",
  "APIテストとは、UIを介さずサーバーのエンドポイント（例：GET /products/1024）を直接呼び出し、ステータスコードと返却データ（ボディ）が期待どおりかを確認することです。ブラウザを開き、ページを読み込み、ボタンをクリックしてようやく結果が見えるUIテストと違い、APIテストははるかに速く動作し、バグがデータ層にあるのか表示層にあるのかを正確に特定できます。");
const faq2 = FAQ(
  "Vì sao nên kiểm thử API bằng Playwright request thay vì chỉ dùng Postman thủ công?",
  "Why test APIs with Playwright request instead of only using Postman manually?",
  "Postman rất tốt để khám phá API và kiểm tra thủ công từng request, nhưng phải bấm tay mỗi lần. Playwright request cho phép viết các request đó thành code, chạy tự động, lặp lại nhiều lần, gắn vào CI/CD, và kết hợp cùng bộ test UI trong cùng một dự án automation — điều Postman thủ công không làm được nếu không cấu hình thêm.",
  "Postman is great for exploring APIs and manually checking individual requests, but you must click through each one every time. Playwright request lets you turn those requests into code, run them automatically, repeat them many times, wire them into CI/CD, and combine them with UI tests in the same automation project — something manual Postman clicking can't do without extra setup.",
  "手動のPostmanだけでなく、なぜPlaywright requestでAPIをテストすべき？",
  "PostmanはAPIを探索し、個々のリクエストを手動で確認するのに優れていますが、毎回手でクリックする必要があります。Playwright requestならそれらのリクエストをコードにし、自動実行し、何度も繰り返し、CI/CDに組み込み、同じ自動化プロジェクト内でUIテストと組み合わせることができます——手動のPostmanクリックでは追加設定なしにはできないことです。");
const faq3 = FAQ(
  "Status code và kiểm tra body/schema khác nhau thế nào khi test API?",
  "How are status code checks different from body/schema checks in API testing?",
  "Status code cho biết KẾT QUẢ tổng quát của request (thành công, thiếu xác thực, lỗi server...) mà không cần đọc dữ liệu bên trong. Kiểm tra body/schema đi sâu hơn: xác nhận từng trường dữ liệu có tồn tại, đúng kiểu, đúng giá trị mong đợi hay không. Một API vẫn có thể trả status 200 (thành công về mặt kỹ thuật) nhưng body lại sai hoàn toàn về mặt nghiệp vụ — vì vậy cần kiểm cả hai, không chỉ một trong hai.",
  "The status code shows the general RESULT of the request (success, missing authentication, server error...) without needing to read the data inside. Checking the body/schema goes deeper: confirming each data field exists, has the right type, and has the expected value. An API can still return status 200 (technically successful) while the body is completely wrong from a business perspective — so you need to check both, not just one.",
  "APIテストにおいて、ステータスコードの確認とボディ／スキーマの確認は何が違う？",
  "ステータスコードは、中身のデータを読まなくても分かるリクエストの大まかな『結果』（成功、認証不足、サーバーエラーなど）を示します。ボディ／スキーマの確認はさらに踏み込み、各データフィールドが存在するか、型が正しいか、期待どおりの値かを確認します。APIはステータス200（技術的には成功）を返しつつ、ボディが業務的には完全に間違っていることもあり得ます——だからこそ、どちらか一方ではなく両方を確認する必要があります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trong kiểm thử API, status code 401 thường có nghĩa là gì?", en: "In API testing, what does a 401 status code usually mean?", ja: "APIテストにおいて、ステータスコード401は通常何を意味する？" },
    options: [
      { vi: "Yêu cầu thiếu hoặc sai thông tin xác thực (chưa đăng nhập/token sai)", en: "The request is missing or has invalid authentication (not logged in / wrong token)", ja: "リクエストに認証情報が欠けているか誤っている（未ログイン／トークン誤り）" },
      { vi: "Server gặp lỗi nội bộ, không xử lý được yêu cầu", en: "The server hit an internal error and couldn't process the request", ja: "サーバーが内部エラーに遭遇し、リクエストを処理できなかった" },
      { vi: "Tài nguyên được yêu cầu không tồn tại", en: "The requested resource doesn't exist", ja: "要求されたリソースが存在しない" },
      { vi: "Yêu cầu thành công và đã tạo dữ liệu mới", en: "The request succeeded and created new data", ja: "リクエストが成功し、新しいデータが作成された" },
    ], correct: 0,
    explain: { vi: "401 Unauthorized nghĩa là thiếu/sai xác thực — khác với 403 (đủ xác thực nhưng không đủ quyền) và 404 (không tìm thấy tài nguyên).", en: "401 Unauthorized means missing/invalid authentication — different from 403 (authenticated but not authorized) and 404 (resource not found).", ja: "401 Unauthorizedは認証の欠如／誤りを意味します——403（認証済みだが権限不足）や404（リソースが見つからない）とは異なります。" },
  }),
  mcq({
    q: { vi: "Trong Playwright, fixture nào được dùng để gọi API trực tiếp mà không cần mở trình duyệt?", en: "In Playwright, which fixture is used to call an API directly without opening a browser?", ja: "Playwrightで、ブラウザを開かずに直接APIを呼び出すために使うフィクスチャはどれ？" },
    options: [
      { vi: "page", en: "page", ja: "page" },
      { vi: "request", en: "request", ja: "request" },
      { vi: "browser", en: "browser", ja: "browser" },
      { vi: "context", en: "context", ja: "context" },
    ], correct: 1,
    explain: { vi: "Fixture 'request' trong test callback (async ({ request }) => {...}) cho phép gọi API trực tiếp, độc lập với trình duyệt.", en: "The 'request' fixture in the test callback (async ({ request }) => {...}) lets you call APIs directly, independent of the browser.", ja: "テストコールバック内の'request'フィクスチャ（async ({ request }) => {...}）により、ブラウザとは独立して直接APIを呼び出せます。" },
  }),
  mcq({
    q: { vi: "Vì sao chỉ kiểm expect(res.status()).toBe(200) là CHƯA đủ để khẳng định API đúng?", en: "Why is only checking expect(res.status()).toBe(200) NOT enough to confirm an API is correct?", ja: "expect(res.status()).toBe(200)だけの確認では、APIが正しいと断言するのになぜ不十分？" },
    options: [
      { vi: "Vì status code luôn sai trong môi trường staging", en: "Because status codes are always wrong on staging", ja: "ステージング環境ではステータスコードが常に間違っているから" },
      { vi: "Vì status 200 chỉ cho biết request được xử lý, không đảm bảo dữ liệu trong body đúng nghiệp vụ", en: "Because status 200 only shows the request was processed, not that the body's data is business-correct", ja: "ステータス200はリクエストが処理されたことしか示さず、ボディのデータが業務的に正しいことは保証しないから" },
      { vi: "Vì Playwright không hỗ trợ đọc status code", en: "Because Playwright doesn't support reading status codes", ja: "Playwrightはステータスコードの読み取りをサポートしていないから" },
      { vi: "Vì mọi API đều trả về status 200 bất kể có lỗi hay không", en: "Because every API always returns status 200 regardless of errors", ja: "すべてのAPIはエラーの有無にかかわらず常にステータス200を返すから" },
    ], correct: 1,
    explain: { vi: "Một API có thể 'khoẻ mạnh' về kỹ thuật (luôn trả 200) nhưng vẫn trả sai dữ liệu — như ca lỗi cache trả nhầm sản phẩm ở tình huống trong bài.", en: "An API can be technically 'healthy' (always returns 200) yet still return wrong data — like the cache bug returning the wrong product in this lesson's situation.", ja: "APIは技術的には『健全』（常に200を返す）でも、誤ったデータを返すことがあります——本レッスンの実例にあった、キャッシュのバグで別の商品が返されたケースのように。" },
  }),
  mcq({
    q: { vi: "Trong ví dụ POST /orders của ShopEasy, mã trạng thái phù hợp khi tạo đơn hàng thành công là gì?", en: "In ShopEasy's POST /orders example, what's the appropriate status code when order creation succeeds?", ja: "ShopEasyのPOST /orders例で、注文作成が成功したときの適切なステータスコードは？" },
    options: [
      { vi: "200 OK", en: "200 OK", ja: "200 OK" },
      { vi: "201 Created", en: "201 Created", ja: "201 Created" },
      { vi: "204 No Content", en: "204 No Content", ja: "204 No Content" },
      { vi: "302 Found", en: "302 Found", ja: "302 Found" },
    ], correct: 1,
    explain: { vi: "201 Created thường dùng khi request tạo mới thành công một tài nguyên — ở đây là đơn hàng mới.", en: "201 Created is typically used when a request successfully creates a new resource — here, a new order.", ja: "201 Createdは、リクエストが新しいリソース（ここでは新しい注文）の作成に成功したときに通常使われます。" },
  }),
  mcq({
    q: { vi: "Cách nào ĐÚNG để gửi token xác thực khi gọi request.post() bằng Playwright?", en: "What's the CORRECT way to send an auth token when calling request.post() in Playwright?", ja: "Playwrightでrequest.post()を呼ぶとき、認証トークンを送る正しい方法は？" },
    options: [
      { vi: "Viết token trực tiếp vào URL dưới dạng query string", en: "Write the token directly into the URL as a query string", ja: "トークンをURLにクエリ文字列として直接書く" },
      { vi: "Thêm vào headers: { Authorization: `Bearer ${token}` }", en: "Add it to headers: { Authorization: `Bearer ${token}` }", ja: "headersに追加する：{ Authorization: `Bearer ${token}` }" },
      { vi: "Không cần gửi gì, Playwright tự thêm token", en: "No need to send anything, Playwright adds the token automatically", ja: "何も送る必要はなく、Playwrightが自動的にトークンを追加する" },
      { vi: "Gửi token trong phần data cùng với productId", en: "Send the token inside the data along with productId", ja: "productIdと一緒にdata内でトークンを送る" },
    ], correct: 1,
    explain: { vi: "Token xác thực nên gửi qua header Authorization dạng Bearer, tách biệt khỏi body dữ liệu nghiệp vụ và không lộ trên URL.", en: "The auth token should be sent via the Authorization header in Bearer form, kept separate from the business data body and never exposed in the URL.", ja: "認証トークンはAuthorizationヘッダーにBearer形式で送るべきで、業務データのボディとは分離し、URLに露出させてはいけません。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screens you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử API là gọi trực tiếp vào các endpoint của server (không qua giao diện) để kiểm tra status code, dữ liệu trả về (body) và các trường hợp xác thực (token) có đúng như tài liệu API mô tả hay không. Bài này dùng app TMĐT ShopEasy: API xem chi tiết sản phẩm (GET) và API tạo đơn hàng (POST). Bạn sẽ học các status code thường gặp, cách viết request bằng Playwright request, kiểm body/schema, header/token, và 2 tình huống thực tế khi bug lọt qua vì chỉ kiểm status code mà bỏ qua body. Kiểm thử API tự động thường nhanh hơn kiểm UI hàng chục lần vì không cần tải giao diện.",
        "API testing means calling server endpoints directly (bypassing the UI) to verify the status code, the returned data (body), and authentication cases (token) match what the API documentation describes. This lesson uses the ShopEasy e-commerce app: a product detail API (GET) and an order creation API (POST). You'll learn common status codes, how to write requests with Playwright request, checking body/schema, headers/tokens, and two real situations where a bug slipped through because only the status code was checked while the body was ignored. Automated API testing is often tens of times faster than UI testing since there's no interface to load.",
        "API テストとは、UI を介さずにサーバーのエンドポイントを直接呼び出し、ステータスコード、返却データ（ボディ）、認証（トークン）の各ケースが API 仕様どおりかを検証することです。本レッスンは EC アプリ ShopEasy を題材に、商品詳細取得 API（GET）と注文作成 API（POST）を扱います。よくあるステータスコード、Playwright request でのリクエストの書き方、ボディ／スキーマの検証、ヘッダー／トークン、そしてステータスコードだけを確認しボディを見落としたためにバグが見逃された 2 つの実例を学びます。自動化された API テストは画面を読み込む必要がないため、UI テストより数十倍速いことが多いです。"),
      P("Chào bạn mới! Nếu bạn từng test bằng cách bấm nút trên giao diện, chờ trang tải, rồi mới nhìn kết quả — kiểm thử API sẽ là một trải nghiệm hoàn toàn khác: bạn gọi thẳng vào 'cửa sau' của hệ thống, nơi giao diện lấy dữ liệu để hiển thị. ShopEasy có hai API tiêu biểu ta sẽ dùng xuyên suốt bài: GET /products/{id} trả chi tiết một sản phẩm, và POST /orders tạo một đơn hàng mới. Cả hai đều trả về một mã trạng thái (status code) và một khối dữ liệu JSON (body). Học cách kiểm cả hai phần này chính là kỹ năng nền tảng đầu tiên của kiểm thử API tự động.",
        "Hi, newcomer! If you've tested by clicking buttons on the UI, waiting for the page to load, then checking the result — API testing will feel completely different: you call directly into the system's 'back door', the place the UI fetches data from to display it. ShopEasy has two representative APIs we'll use throughout: GET /products/{id} returning a product's details, and POST /orders creating a new order. Both return a status code and a JSON data block (the body). Learning to check both of these is the very first foundational skill of automated API testing.",
        "こんにちは、初心者さん！画面のボタンをクリックし、ページの読み込みを待ってから結果を確認する、というテストをしてきたなら、API テストはまったく違う体験になります。UI が表示用データを取得する『裏口』を直接呼び出すのです。ShopEasy には本レッスンを通じて使う代表的な API が 2 つあります：商品の詳細を返す GET /products/{id} と、新しい注文を作成する POST /orders です。どちらもステータスコードと JSON データブロック（ボディ）を返します。この両方を検証できるようになることが、自動化 API テストにおける最初の基礎スキルです。"),
      IMG(m_getresp, "Kết quả gọi GET /products/1024: status 200, thời gian phản hồi 86ms, body JSON trả về chi tiết sản phẩm", "Result of calling GET /products/1024: status 200, response time 86ms, JSON body returning product details", "GET /products/1024 呼び出しの結果：ステータス200、応答時間86ms、商品詳細を返すJSONボディ"),
      DEF("API", "cách để hai phần mềm 'nói chuyện' với nhau qua các endpoint (địa chỉ) cố định, gửi request và nhận về response, không cần thông qua giao diện người dùng.",
        "a way for two pieces of software to 'talk' to each other through fixed endpoints, sending a request and receiving a response, without going through a user interface.",
        "固定されたエンドポイント（アドレス）を通じて2つのソフトウェアが『会話』する仕組みで、リクエストを送りレスポンスを受け取る、ユーザーインターフェースを介さない方法。"),
      P("CyberSoft Academy dạy kiểm thử API & automation bài bản từ zero tới đi làm — nếu muốn có lộ trình đầy đủ hơn bài viết này, có thể tham khảo khóa Software Testing chuyên nghiệp tại https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ .",
        "CyberSoft Academy teaches API testing and automation systematically from zero to hired — for a fuller learning path than this article, check out the Professional Software Testing course at https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ .",
        "CyberSoft AcademyはAPIテストと自動化をゼロから就職まで体系的に教えています——本記事より詳しい学習ロードマップが欲しい場合は、Software Testing専門コース https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ をご覧ください。"),
    ] },
  { heading: { vi: "2. Vấn đề: chỉ kiểm qua giao diện là chưa đủ", en: "2. The problem: testing through the UI alone isn't enough", ja: "2. 問題：UIだけの確認では不十分" },
    blocks: [
      P("Nhiều bạn mới học tester chỉ quen kiểm tra qua giao diện: mở trình duyệt, bấm nút 'Xem sản phẩm', chờ trang tải, rồi nhìn xem giá tiền hiển thị có đúng không. Cách này chạy được, nhưng có hai vấn đề. Thứ nhất, nó CHẬM — mỗi lần kiểm tra phải tải cả trang, hình ảnh, CSS, JavaScript, dù bạn chỉ cần biết đúng một con số: giá sản phẩm. Thứ hai, nó GIÁN TIẾP — nếu giao diện có lỗi hiển thị (ví dụ CSS che mất giá), bạn không phân biệt được lỗi nằm ở API trả sai dữ liệu, hay chỉ do giao diện vẽ sai.",
        "Many new testers only test through the UI: open the browser, click 'View product', wait for the page to load, then check if the displayed price is correct. This works, but has two problems. First, it's SLOW — every check requires loading the whole page, images, CSS, JavaScript, even though you only need one number: the product price. Second, it's INDIRECT — if the UI has a display bug (say, CSS hiding the price), you can't tell whether the API returned wrong data or the UI just rendered it wrong.",
        "多くの初心者テスターはUIだけでテストします：ブラウザを開き、『商品を見る』をクリックし、ページの読み込みを待ち、表示された価格が正しいか確認する。これでも動きますが、2つの問題があります。1つ目は『遅い』ことです——本当は価格という1つの数値だけを知りたいのに、確認するたびにページ全体、画像、CSS、JavaScriptを読み込む必要があります。2つ目は『間接的』なことです——UIに表示バグ（例えばCSSが価格を隠す）があると、APIが誤ったデータを返したのか、UIが単に誤って描画しただけなのか区別できません。"),
      IMG(m_dashboard, "Kết quả một lần chạy bộ test API ShopEasy: 48 request, thời gian trung bình chỉ 92ms — nhanh hơn kiểm qua giao diện rất nhiều", "Result of one run of the ShopEasy API test suite: 48 requests, average time just 92ms — far faster than checking through the UI", "ShopEasy APIテストスイートの1回の実行結果：48リクエスト、平均時間わずか92ms——UI経由で確認するよりはるかに速い"),
      TIP("Kiểm thử API không thay thế hoàn toàn kiểm thử UI, mà bổ sung một tầng nhanh và chính xác hơn để bắt lỗi dữ liệu sớm. Nếu muốn học lộ trình automation đầy đủ (UI lẫn API), tham khảo khóa học tại CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "API testing doesn't fully replace UI testing — it adds a faster, more precise layer for catching data bugs early. If you want a full automation learning path (both UI and API), check out the course at CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "APIテストはUIテストを完全に置き換えるものではなく、データのバグを早期に発見するための、より速く正確な層を追加するものです。UIとAPI両方を含む完全な自動化学習ロードマップが欲しいなら、CyberSoftのコース https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ をご覧ください。"),
      DEF("Endpoint", "một địa chỉ (URL) cố định trên server, đại diện cho một tài nguyên hoặc hành động cụ thể, ví dụ /products/1024 hay /orders.",
        "a fixed address (URL) on the server representing a specific resource or action, e.g. /products/1024 or /orders.",
        "サーバー上の固定アドレス（URL）で、特定のリソースやアクションを表すもの。例：/products/1024 や /orders。"),
    ] },
  { heading: { vi: "3. Request/response cơ bản: method, header, body", en: "3. Request/response basics: method, header, body", ja: "3. リクエスト／レスポンスの基本：メソッド・ヘッダー・ボディ" },
    blocks: [
      P("Mỗi lần gọi API, bạn gửi đi một REQUEST gồm 4 phần: phương thức (method — GET để lấy dữ liệu, POST để tạo mới, PUT/PATCH để sửa, DELETE để xoá), địa chỉ (URL/endpoint), phần đầu (header — thường chứa thông tin xác thực), và phần thân (body — dữ liệu gửi kèm, chỉ có ở POST/PUT/PATCH). Server xử lý xong sẽ trả về một RESPONSE, cũng gồm 3 phần chính: mã trạng thái (status code) cho biết yêu cầu có thành công không, header, và body chứa dữ liệu trả về (thường là JSON). Kiểm thử API tức là kiểm tra cả request bạn gửi lẫn response bạn nhận có đúng như mong đợi.",
        "Every time you call an API, you send a REQUEST with 4 parts: the method (GET to fetch data, POST to create, PUT/PATCH to update, DELETE to remove), the address (URL/endpoint), headers (usually holding authentication info), and the body (data sent along, only present in POST/PUT/PATCH). After processing, the server returns a RESPONSE, also with 3 main parts: a status code showing whether the request succeeded, headers, and a body containing the returned data (usually JSON). API testing means verifying both the request you send and the response you receive match what's expected.",
        "APIを呼び出すたびに、4つの要素を持つREQUEST（リクエスト）を送ります：メソッド（GETはデータ取得、POSTは新規作成、PUT/PATCHは更新、DELETEは削除）、アドレス（URL/エンドポイント）、ヘッダー（通常は認証情報を含む）、ボディ（送信データ、POST/PUT/PATCHのみに存在）。サーバーが処理を終えると、同じく3つの主要素を持つRESPONSE（レスポンス）を返します：リクエストが成功したかを示すステータスコード、ヘッダー、そして返却データ（通常JSON）を含むボディです。APIテストとは、送信するリクエストと受け取るレスポンスの両方が期待どおりかを検証することです。"),
      TIP("GET dùng để LẤY dữ liệu, không nên làm thay đổi gì trên server. Nếu một API GET lại tạo ra đơn hàng mới mỗi lần gọi, đó là dấu hiệu thiết kế sai — hãy báo lại cho đội phát triển.",
        "GET is for FETCHING data and shouldn't change anything on the server. If a GET API creates a new order every time it's called, that's a design flaw — flag it to the dev team.",
        "GETはデータを『取得』するためのもので、サーバー上で何も変更すべきではありません。もしGET APIが呼び出すたびに新しい注文を作成しているなら、それは設計上の欠陥です——開発チームに報告しましょう。"),
      DEF("JSON body", "định dạng dữ liệu dạng cặp khoá-giá trị mà hầu hết API hiện đại dùng để gửi/nhận dữ liệu, ví dụ {\"id\": 1024, \"price\": 199000}.",
        "a key-value data format that most modern APIs use to send/receive data, e.g. {\"id\": 1024, \"price\": 199000}.",
        "ほとんどの現代的なAPIがデータの送受信に使うキーと値のペア形式。例：{\"id\": 1024, \"price\": 199000}。"),
    ] },
  { heading: { vi: "4. Status code — mã trạng thái nói gì trước cả khi đọc body", en: "4. Status code — what it tells you before reading the body", ja: "4. ステータスコード — ボディを読む前に分かること" },
    blocks: [
      P("Mã trạng thái (status code) là con số 3 chữ số nằm ngay đầu response, cho bạn biết kết quả tổng quát của request mà chưa cần đọc body. Đây thường là thứ đầu tiên một test API kiểm tra, vì nó rẻ, nhanh và ít gây nhầm lẫn. Nhóm 2xx là thành công, 4xx là lỗi do phía người gửi request (client), 5xx là lỗi phía server.",
        "The status code is a 3-digit number right at the start of the response, telling you the general result of the request before you even read the body. It's usually the first thing an API test checks, since it's cheap, fast, and hard to misread. The 2xx group means success, 4xx means an error caused by the request sender (client), and 5xx means a server-side error.",
        "ステータスコードはレスポンスの冒頭にある3桁の数字で、ボディを読む前にリクエストの大まかな結果を教えてくれます。安価で速く、誤読しにくいため、通常APIテストが最初にチェックする項目です。2xx系は成功、4xx系はリクエスト送信側（クライアント）に起因するエラー、5xx系はサーバー側のエラーを意味します。"),
      IMG(m_statuscode, "Bảng các mã trạng thái HTTP thường gặp khi test API sản phẩm & đơn hàng ShopEasy", "Table of common HTTP status codes seen when testing ShopEasy's product & order APIs", "ShopEasyの商品・注文APIをテストする際によく見るHTTPステータスコード一覧表"),
      PITFALL("Chỉ nhớ '200 là tốt, còn lại là xấu' rồi bỏ qua sự khác biệt giữa 400/401/403/404/500. Mỗi mã kể một câu chuyện khác nhau — 401 là 'chưa xác thực', 403 là 'đã xác thực nhưng không đủ quyền', hoàn toàn khác nhau về cách xử lý.",
        "Only remembering '200 is good, everything else is bad' and skipping the difference between 400/401/403/404/500. Each code tells a different story — 401 means 'not authenticated', 403 means 'authenticated but not authorized', which are handled completely differently.",
        "『200は良い、それ以外は悪い』としか覚えず、400/401/403/404/500の違いを飛ばしてしまうこと。それぞれのコードは異なる話をしています——401は『未認証』、403は『認証済みだが権限不足』で、対処方法がまったく異なります。"),
    ] },
  { heading: { vi: "5. Viết request GET đầu tiên bằng Playwright (thực hành)", en: "5. Writing your first GET request with Playwright (hands-on)", ja: "5. Playwrightで最初のGETリクエストを書く（実習）" },
    blocks: [
      P("Playwright không chỉ điều khiển trình duyệt — nó có sẵn fixture 'request' để gọi thẳng API mà không cần mở trình duyệt, chạy nhanh hơn nhiều so với việc mô phỏng người dùng bấm chuột. Ta sẽ viết test đầu tiên: gọi GET /products/1024 và kiểm cả status code lẫn dữ liệu trả về.",
        "Playwright isn't just for controlling a browser — it has a built-in 'request' fixture for calling APIs directly without opening a browser, running much faster than simulating user clicks. Let's write our first test: calling GET /products/1024 and checking both the status code and the returned data.",
        "Playwrightはブラウザを操作するだけでなく、ブラウザを開かずに直接APIを呼び出せる『request』フィクスチャを標準で備えており、ユーザーのクリックをシミュレートするより遥かに高速です。最初のテストを書いてみましょう：GET /products/1024を呼び出し、ステータスコードと返却データの両方を検証します。"),
      STEP(1, "Tạo file tests/api-products.spec.js, import test và expect từ @playwright/test.", "Create tests/api-products.spec.js, importing test and expect from @playwright/test.", "tests/api-products.spec.jsを作成し、@playwright/testからtestとexpectをインポートする。"),
      STEP(2, "Dùng fixture 'request' có sẵn ngay trong callback test — không cần khởi tạo trình duyệt.", "Use the built-in 'request' fixture right in the test callback — no browser setup needed.", "テストコールバック内で標準の'request'フィクスチャを使う——ブラウザの初期化は不要。"),
      STEP(3, "Gọi request.get(url), lưu kết quả vào biến res.", "Call request.get(url), storing the result in a res variable.", "request.get(url)を呼び、結果をres変数に保存する。"),
      STEP(4, "Kiểm expect(res.status()).toBe(200) trước, rồi mới đọc res.json() để kiểm body.", "Check expect(res.status()).toBe(200) first, then read res.json() to verify the body.", "まずexpect(res.status()).toBe(200)を確認し、それからres.json()を読んでボディを検証する。"),
      CODE("javascript", "// tests/api-products.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('lay chi tiet san pham tra ve dung status va body', async ({ request }) => {\n  const res = await request.get('https://api.shopeasy.vn/products/1024');\n\n  expect(res.status()).toBe(200);\n\n  const body = await res.json();\n  expect(body).toHaveProperty('id', 1024);\n  expect(body).toHaveProperty('price');\n  expect(typeof body.price).toBe('number');\n  expect(body.price).toBeGreaterThan(0);\n});"),
      TRY("Đổi 1024 thành một id sản phẩm không tồn tại (ví dụ 999999), chạy lại test và xem status code lúc này là bao nhiêu.", "Change 1024 to an id of a product that doesn't exist (e.g. 999999), rerun the test, and see what status code you get this time.", "1024を存在しない商品のid（例：999999）に変え、テストを再実行して、今度はどんなステータスコードが返ってくるか確認してみよう。"),
      TIP("Nếu bạn thấy hào hứng với việc viết code test API như trên, đây chính là kỹ năng automation cốt lõi được dạy bài bản trong khóa Software Testing tại CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "If writing API tests like this excites you, this is exactly the core automation skill taught systematically in CyberSoft's Software Testing course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "このようなAPIテストのコーディングにワクワクするなら、それはまさにCyberSoftのSoftware Testingコースで体系的に教えられている自動化の中核スキルです：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/"),
    ] },
  { heading: { vi: "6. Kiểm body/schema kỹ hơn với POST /orders (thực hành)", en: "6. Checking body/schema more carefully with POST /orders (hands-on)", ja: "6. POST /ordersでボディ／スキーマをより詳しく検証する（実習）" },
    blocks: [
      P("Chỉ kiểm status code là chưa đủ — response có thể trả 200/201 nhưng body sai lệch (thiếu trường, sai kiểu dữ liệu, giá trị vô lý). Với API tạo đơn hàng POST /orders, ta còn cần gửi kèm body và kiểm dữ liệu trả về có đúng cấu trúc mong đợi hay không.",
        "Checking the status code alone isn't enough — a response can return 200/201 while the body is wrong (missing fields, wrong data types, nonsensical values). For the order creation API POST /orders, we also need to send a body and check whether the returned data matches the expected structure.",
        "ステータスコードだけの確認では不十分です——レスポンスが200/201を返していてもボディが誤っている（フィールドの欠落、データ型の誤り、不合理な値）ことがあります。注文作成APIのPOST /ordersでは、ボディを送信し、返却データが期待どおりの構造かも検証する必要があります。"),
      STEP(1, "Chuẩn bị dữ liệu body: productId, quantity, address.", "Prepare the body data: productId, quantity, address.", "ボディデータを準備する：productId、quantity、address。"),
      STEP(2, "Gọi request.post(url, { data: body }).", "Call request.post(url, { data: body }).", "request.post(url, { data: body })を呼ぶ。"),
      STEP(3, "Kiểm expect(res.status()).toBe(201) vì đây là hành động TẠO MỚI.", "Check expect(res.status()).toBe(201) since this is a CREATE action.", "これは『作成』アクションなので、expect(res.status()).toBe(201)を確認する。"),
      STEP(4, "Kiểm cấu trúc body trả về: có orderId, status đúng giá trị mặc định 'PENDING'.", "Verify the returned body's structure: it has orderId, and status equals the default value 'PENDING'.", "返却されたボディの構造を検証する：orderIdが存在し、statusがデフォルト値'PENDING'であること。"),
      CODE("javascript", "// tests/api-orders.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('tao don hang moi voi du lieu hop le', async ({ request }) => {\n  const res = await request.post('https://api.shopeasy.vn/orders', {\n    data: {\n      productId: 1024,\n      quantity: 2,\n      address: '123 Nguyen Trai, Q5, HCM',\n    },\n  });\n\n  expect(res.status()).toBe(201);\n\n  const body = await res.json();\n  expect(body).toHaveProperty('orderId');\n  expect(body.status).toBe('PENDING');\n  expect(body.totalPrice).toBe(2 * 199000);\n});"),
      PITFALL("Kiểm expect(body).toBeTruthy() rồi coi như xong — cách này gần như không kiểm tra gì cả, vì hầu hết object đều 'truthy'. Hãy kiểm từng trường cụ thể (orderId có tồn tại, status đúng giá trị, totalPrice đúng công thức) thay vì kiểm chung chung.",
        "Checking expect(body).toBeTruthy() and calling it done — this checks almost nothing, since most objects are 'truthy'. Verify specific fields instead (orderId exists, status has the right value, totalPrice matches the formula) rather than a vague generic check.",
        "expect(body).toBeTruthy()だけ確認して終わったつもりになること——これはほとんど何も検証していません。ほとんどのオブジェクトは『truthy』だからです。曖昧な確認ではなく、具体的なフィールド（orderIdが存在するか、statusが正しい値か、totalPriceが計算式どおりか）を検証しましょう。"),
    ] },
  { heading: { vi: "7. Header & token xác thực (thực hành ca âm)", en: "7. Headers & auth tokens (negative-case practice)", ja: "7. ヘッダーと認証トークン（異常系の実習）" },
    blocks: [
      P("Nhiều API trong ShopEasy yêu cầu xác thực: bạn phải gửi kèm header Authorization chứa token (thường dạng Bearer <token>) để chứng minh mình là người dùng hợp lệ. Nếu thiếu hoặc sai token, API sẽ từ chối với status 401. Đây là loại kiểm thử NEGATIVE (kiểm khi làm sai) rất quan trọng — nó đảm bảo hệ thống KHÔNG cho phép thao tác trái phép.",
        "Many ShopEasy APIs require authentication: you must send an Authorization header containing a token (usually in the form Bearer <token>) to prove you're a valid user. If the token is missing or wrong, the API rejects the call with status 401. This is a NEGATIVE test (testing what happens when something is done wrong) that's very important — it ensures the system does NOT allow unauthorized actions.",
        "ShopEasyの多くのAPIは認証を要求します：正当なユーザーであることを証明するため、トークン（通常Bearer <token>形式）を含むAuthorizationヘッダーを送る必要があります。トークンが欠けているか誤っている場合、APIはステータス401で拒否します。これは非常に重要なNEGATIVEテスト（誤った操作をしたときの挙動を確認するテスト）で、システムが不正な操作を許可しないことを保証します。"),
      IMG(m_apirequest, "Yêu cầu POST /orders với header Authorization và body JSON, chú thích hậu quả khi thiếu header hoặc sai kiểu dữ liệu", "A POST /orders request with an Authorization header and JSON body, annotated with the consequences of a missing header or wrong data type", "AuthorizationヘッダーとJSONボディを含むPOST /ordersリクエスト、ヘッダー欠落や型誤りの結果を注記"),
      STEP(1, "Chuẩn bị token hợp lệ (thường lấy từ bước đăng nhập API trước đó hoặc biến môi trường).", "Prepare a valid token (usually obtained from a prior login API step or an environment variable).", "有効なトークンを準備する（通常は事前のログインAPIステップか環境変数から取得）。"),
      STEP(2, "Thêm headers: { Authorization: `Bearer ${token}` } vào request.post().", "Add headers: { Authorization: `Bearer ${token}` } to request.post().", "request.post()にheaders: { Authorization: `Bearer ${token}` }を追加する。"),
      STEP(3, "Viết thêm một test KHÔNG gửi header này, kiểm status phải là 401.", "Write another test that does NOT send this header, checking the status must be 401.", "このヘッダーを送らない別のテストを書き、ステータスが401であることを確認する。"),
      CODE("javascript", "// tests/api-orders-auth.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('tao don hang voi token hop le duoc chap nhan', async ({ request }) => {\n  const res = await request.post('https://api.shopeasy.vn/orders', {\n    headers: { Authorization: `Bearer ${process.env.SHOPEASY_TOKEN}` },\n    data: { productId: 1024, quantity: 1, address: 'HCM' },\n  });\n  expect(res.status()).toBe(201);\n});\n\ntest('tao don hang khong co token bi tu choi', async ({ request }) => {\n  const res = await request.post('https://api.shopeasy.vn/orders', {\n    data: { productId: 1024, quantity: 1, address: 'HCM' },\n  });\n  expect(res.status()).toBe(401);\n});"),
      TIP("Không nên viết thẳng token thật vào code test (dễ lộ bí mật khi đẩy code lên hệ thống quản lý phiên bản). Hãy đọc token từ biến môi trường như process.env.SHOPEASY_TOKEN.",
        "Don't hardcode a real token into test code (it can easily leak when pushed to version control). Read the token from an environment variable like process.env.SHOPEASY_TOKEN instead.",
        "実際のトークンをテストコードに直接書かないこと（バージョン管理システムにコードをプッシュした際に漏洩しやすい）。process.env.SHOPEASY_TOKENのような環境変数からトークンを読み込みましょう。"),
    ] },
  { heading: { vi: "8. Tình huống 1: status 200 nhưng dữ liệu sai", en: "8. Situation 1: status 200 but the data is wrong", ja: "8. シーン1：ステータス200だがデータが誤っている" },
    blocks: [
      SITUATION("Status code báo 200 OK, nhưng dữ liệu trả về sai giá sản phẩm.", "Status code shows 200 OK, but the returned data has the wrong product price.",
        "Một bạn tester mới viết test cho GET /products/1024, chỉ kiểm expect(res.status()).toBe(200) rồi coi như test pass. Vài ngày sau, người dùng thật báo giá hiển thị trên ShopEasy sai — sản phẩm 199.000đ hiển thị thành 990.000đ. Hoá ra do lỗi cache phía server, endpoint vẫn trả 200 OK nhưng body chứa dữ liệu của một sản phẩm KHÁC. Vì test chỉ kiểm status code, bug này không bị bộ test tự động phát hiện suốt nhiều ngày.",
        "A new tester wrote a test for GET /products/1024, only checking expect(res.status()).toBe(200) and considering the test passed. A few days later, real users reported the price shown on ShopEasy was wrong — a 199,000₫ product showed as 990,000₫. It turned out to be a server-side cache bug: the endpoint still returned 200 OK, but the body contained a DIFFERENT product's data. Since the test only checked the status code, the automated suite missed this bug for days.",
        "ステータスコードは200 OKだが、返されたデータの商品価格が間違っている。",
        "ある新人テスターがGET /products/1024用のテストを書き、expect(res.status()).toBe(200)しか確認せずテスト成功とみなした。数日後、実際のユーザーからShopEasyに表示される価格がおかしいと報告が入った——199,000ドンの商品が990,000ドンと表示されていた。原因はサーバー側のキャッシュのバグで、エンドポイントは200 OKを返し続けていたが、ボディには別の商品のデータが入っていた。テストがステータスコードしか確認していなかったため、自動テストスイートは数日間このバグを見逃していた。"),
      SOLVE("Luôn kiểm cả body sau khi kiểm status code: expect(body.id).toBe(1024) để chắc chắn dữ liệu trả về đúng LÀ sản phẩm bạn yêu cầu, không phải một sản phẩm ngẫu nhiên nào khác do lỗi cache/logic.",
        "Always check the body after checking the status code: expect(body.id).toBe(1024) to make sure the returned data is truly the product you requested, not some other random product due to a cache/logic bug.",
        "ステータスコードを確認した後は必ずボディも確認すること：expect(body.id).toBe(1024)で、返却データがキャッシュ／ロジックのバグによる別の商品ではなく、確かにリクエストした商品であることを保証する。"),
      P("Đây là bài học quan trọng: status code chỉ nói 'server xử lý được yêu cầu', KHÔNG nói 'dữ liệu trả về đúng nghiệp vụ'. Một API 'khoẻ mạnh' về mặt kỹ thuật (luôn trả 200) vẫn có thể sai hoàn toàn về mặt dữ liệu.",
        "This is an important lesson: the status code only says 'the server processed the request', NOT 'the returned data is business-correct'. An API that's technically 'healthy' (always returns 200) can still be completely wrong data-wise.",
        "これは重要な教訓です：ステータスコードは『サーバーがリクエストを処理できた』ことしか示さず、『返却データが業務的に正しい』ことは示しません。技術的に『健全』（常に200を返す）なAPIでも、データの面では完全に間違っている可能性があります。"),
      RECAP(["Status 200 chỉ nghĩa là 'gọi được', không nghĩa là 'dữ liệu đúng'", "Luôn kiểm thêm body sau khi kiểm status code"],
        ["Status 200 only means 'the call worked', not 'the data is correct'", "Always check the body in addition to the status code"],
        ["ステータス200は『呼び出せた』ことのみを意味し、『データが正しい』ことは意味しない", "ステータスコードに加えて必ずボディも確認する"]),
    ] },
  { heading: { vi: "9. Tình huống 2: script chỉ kiểm body, bỏ qua status code", en: "9. Situation 2: a script checking only the body, ignoring status code", ja: "9. シーン2：ボディだけを確認しステータスコードを無視したスクリプト" },
    blocks: [
      SITUATION("Script chỉ kiểm body, bỏ qua status code khiến lỗi 500 lọt qua.", "A script that only checks the body, ignoring the status code, lets a 500 error slip through.",
        "Đội automation viết test cho POST /orders bằng cách chỉ kiểm expect(body.orderId).toBeTruthy(), không hề gọi expect(res.status()).toBe(...). Khi server gặp lỗi và trả về status 500 kèm một body rỗng có orderId mặc định là chuỗi 'undefined' (một chuỗi, không phải giá trị thật), câu kiểm 'truthy' vẫn vô tình pass vì chuỗi 'undefined' cũng được coi là truthy trong JavaScript.",
        "The automation team wrote a test for POST /orders that only checked expect(body.orderId).toBeTruthy(), never calling expect(res.status()).toBe(...). When the server hit an error and returned status 500 with an empty body whose orderId defaulted to the string 'undefined' (a string, not a real value), the 'truthy' check accidentally still passed, since the string 'undefined' is also truthy in JavaScript.",
        "ボディだけを確認しステータスコードを無視したスクリプトが、500エラーを見逃す。",
        "自動化チームはPOST /orders用のテストを、expect(body.orderId).toBeTruthy()だけ確認し、expect(res.status()).toBe(...)は一度も呼ばずに書いていた。サーバーがエラーになりステータス500とorderIdがデフォルトで文字列'undefined'（実際の値ではない）になった空のボディを返したとき、'truthy'チェックはたまたま成功してしまった。JavaScriptでは文字列'undefined'もtruthyとして扱われるからだ。"),
      SOLVE("Luôn viết expect(res.status()).toBe(201) NGAY DÒNG ĐẦU TIÊN sau khi gọi API, trước cả khi đọc body — nếu status sai, test nên fail ngay tại đó thay vì đi tiếp và kiểm nhầm một body lỗi.",
        "Always write expect(res.status()).toBe(201) as the VERY FIRST LINE right after calling the API, before even reading the body — if the status is wrong, the test should fail right there instead of continuing and mistakenly checking a broken body.",
        "API呼び出し直後の『最初の行』として必ずexpect(res.status()).toBe(201)を書くこと、ボディを読む前に——ステータスが誤っていれば、そこですぐにテストを失敗させるべきで、続行して壊れたボディを誤って検証してはいけない。"),
      IMG(m_jira, "Ticket ghi lại sự cố: lỗi 500 lọt qua 2 ngày vì test chỉ kiểm body, không kiểm status code", "A ticket recording the incident: a 500 error slipped through for 2 days because the test only checked the body, not the status code", "インシデントを記録したチケット：テストがボディしか確認せずステータスコードを確認しなかったため、500エラーが2日間見逃されていた"),
      P("Chi phí của lỗi này không chỉ nằm ở việc phải fix bug, mà còn ở niềm tin vào bộ test tự động: khi một bộ test 'báo xanh' liên tục dù hệ thống đang lỗi, đội ngũ dần mất niềm tin và phải quay lại kiểm tay — đúng bằng cách automation vốn được kỳ vọng loại bỏ.",
        "The cost of this bug isn't just fixing it, but the loss of trust in the automated suite: when a suite keeps 'showing green' while the system is actually broken, the team gradually loses confidence and has to go back to manual checks — exactly the thing automation was meant to eliminate.",
        "このバグのコストは修正することだけでなく、自動テストスイートへの信頼の喪失にもあります——システムが実際に壊れているのに常に『緑』を示すスイートがあると、チームは徐々に信頼を失い、手動確認に戻らざるを得なくなります——それはまさに自動化が排除するはずだったものです。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("So sánh status code dạng chuỗi thay vì số, ví dụ expect(res.status()).toBe('200') — hầu hết thư viện trả về số (200), so với chuỗi '200' sẽ luôn fail hoặc gây lỗi kiểu dữ liệu khó hiểu.",
        "Comparing the status code as a string instead of a number, e.g. expect(res.status()).toBe('200') — most libraries return a number (200), so comparing to the string '200' will always fail or cause a confusing type error.",
        "ステータスコードを数値ではなく文字列で比較すること、例えばexpect(res.status()).toBe('200')——ほとんどのライブラリは数値（200）を返すため、文字列'200'と比較すると常に失敗するか、分かりにくい型エラーを引き起こす。"),
      PITFALL("Không dọn dữ liệu test sau khi tạo đơn hàng — chạy test POST /orders nhiều lần mà không xoá, khiến database staging phình to và các test khác (ví dụ đếm số đơn hàng) bị sai lệch.",
        "Not cleaning up test data after creating orders — running the POST /orders test repeatedly without deleting them bloats the staging database and skews other tests (e.g. counting orders).",
        "注文作成後にテストデータを片付けないこと——POST /ordersテストを削除せず何度も実行すると、ステージングデータベースが肥大化し、他のテスト（注文数のカウントなど）に狂いが生じる。"),
      TIP("Nếu muốn được kèm 1-1 để luyện viết test API từ đầu tới lúc thành thạo, CyberSoft có chương trình học 1-1 tại https://cybersoft.edu.vn/trainning-course-1vs1/ , phù hợp cho người mới muốn tiến nhanh.",
        "If you want 1-on-1 mentoring to practice writing API tests from scratch until you're proficient, CyberSoft has a 1-on-1 program at https://cybersoft.edu.vn/trainning-course-1vs1/ , suited for beginners who want to progress quickly.",
        "APIテストの書き方をゼロから習熟するまで1対1で指導してほしいなら、CyberSoftには https://cybersoft.edu.vn/trainning-course-1vs1/ の1対1プログラムがあり、早く上達したい初心者に適しています。"),
      IMG(m_apitable, "Bảng tổng hợp các ca kiểm thử API sản phẩm & đơn hàng ShopEasy, gồm cả ca dương lẫn ca âm", "A summary table of ShopEasy's product & order API test cases, including both positive and negative cases", "ShopEasyの商品・注文APIテストケースをまとめた表、正常系と異常系の両方を含む"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử API thủ công với Postman nâng cao cho Tester", "Manual API testing with Postman (advanced) for testers", "kiem-thu-api-thu-cong-postman-nang-cao-cho-tester", "テスター向けPostmanでの手動APIテスト（上級編）"),
      INTERNAL("Assertion — kiểm chứng kết quả cho người mới", "Assertions — verifying results for beginners", "assertion-kiem-chung-ket-qua-cho-nguoi-moi", "初心者のためのアサーション（結果検証）"),
      INTERNAL("Chuẩn bị dữ liệu test automation cho người mới", "Preparing automation test data for beginners", "chuan-bi-du-lieu-test-automation-cho-nguoi-moi", "初心者のための自動化テストデータ準備"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử API cơ bản qua hai endpoint thật của ShopEasy: GET /products/{id} và POST /orders. Từ việc phân biệt status code, kiểm tra body/schema, gửi header Authorization với token, tới hai tình huống thực tế cho thấy vì sao chỉ kiểm status code là chưa đủ — bug có thể ẩn trong dữ liệu body dù request 'chạy được'. Bạn cũng đã viết được các đoạn code Playwright request chạy thật, từ GET đơn giản tới POST kèm xác thực và ca âm (negative case).",
        "You just learned basic API testing through two real ShopEasy endpoints: GET /products/{id} and POST /orders. From distinguishing status codes, checking body/schema, sending an Authorization header with a token, to two real situations showing why checking the status code alone isn't enough — a bug can hide in the body data even when the request 'works'. You also wrote real, runnable Playwright request code, from a simple GET to a POST with authentication and a negative case.",
        "ShopEasyの2つの実際のエンドポイント、GET /products/{id}とPOST /ordersを通じて、基本的なAPIテストを学びました。ステータスコードの区別、ボディ／スキーマの検証、トークン付きAuthorizationヘッダーの送信から、ステータスコードだけの確認では不十分な理由——リクエストが『成功』していてもボディのデータにバグが隠れうる——を示す2つの実例まで。また、シンプルなGETから認証付きPOST、異常系まで、実際に動くPlaywright requestのコードも書きました。"),
      P("Bước tiếp theo, hãy tìm hiểu về kiểm tra schema chặt chẽ hơn (dùng thư viện validate JSON schema), kiểm hiệu năng cơ bản của API (thời gian phản hồi), và cách tổ chức bộ test API dùng chung với bộ test UI trong cùng một dự án automation. Nếu muốn học kiểm thử API tự động bài bản từ số 0 tới lúc tự tin ứng tuyển vị trí Automation Tester, một khoá học có mentor và dự án thực chiến sẽ giúp bạn đi nhanh và đúng hướng hơn nhiều so với tự học rời rạc.",
        "Next, look into stricter schema validation (using a JSON schema validation library), basic API performance checks (response time), and how to organize an API test suite alongside a UI test suite within the same automation project. If you want to learn automated API testing properly from zero until you're confident applying for an Automation Tester role, a course with a mentor and real projects will get you there far faster and more reliably than scattered self-study.",
        "次は、より厳密なスキーマ検証（JSONスキーマ検証ライブラリの使用）、APIの基本的な性能チェック（応答時間）、そして同じ自動化プロジェクト内でAPIテストスイートとUIテストスイートを一緒に整理する方法を学ぶとよいでしょう。ゼロからAutomation Testerポジションに自信を持って応募できるまで自動化APIテストを体系的に学びたいなら、メンターと実プロジェクト付きのコースが、断片的な独学よりもはるかに速く確実に導いてくれます。"),
      CTA(course),
    ] },
];

const API_01 = makeDoc({
  slug: "kiem-thu-api-tu-dong-co-ban-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử API tự động",
  keywords: ["kiểm thử api tự động", "playwright request", "api testing cho người mới", "test api status code", "automation testing cơ bản"],
  coverLabel: "NGƯỜI MỚI · API TESTING TỰ ĐỘNG · TMĐT",
  crumb: "Kiểm thử API tự động cơ bản cho người mới",
  metaTitle: { vi: "Kiểm thử API tự động cơ bản cho người mới", en: "Basic automated API testing for beginners", ja: "初心者向け基本的な自動APIテスト" },
  metaDescription: {
    vi: "Kiểm thử API tự động cơ bản cho người mới: GET/POST, status code, body, header, token bằng Playwright request qua ví dụ ShopEasy, có code chạy và trắc nghiệm.",
    en: "Basic automated API testing for beginners: GET/POST, status code, body, headers, and tokens with Playwright request through ShopEasy examples, with runnable code and a quiz.",
    ja: "初心者向け基本的な自動APIテスト：ShopEasyの例を通じてPlaywright requestでGET/POST、ステータスコード、ボディ、ヘッダー、トークンを学び、動くコードとクイズ付き。",
  },
  title: {
    vi: "Kiểm thử API tự động cơ bản cho người mới: request, response, status code (có code chạy được)",
    en: "Basic automated API testing for beginners: request, response, status code (with runnable code)",
    ja: "初心者のための基本的な自動APIテスト：リクエスト・レスポンス・ステータスコード（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: kiểm thử API tự động qua app TMĐT ShopEasy bằng Playwright request. Status code thường gặp, cách viết GET/POST, kiểm body/schema, header & token xác thực, hai tình huống thật (status 200 nhưng dữ liệu sai, script bỏ qua status code khiến bug 500 lọt qua), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: automated API testing through the ShopEasy e-commerce app using Playwright request. Common status codes, writing GET/POST requests, checking body/schema, auth headers & tokens, two real situations (200 status but wrong data, a script skipping status checks that let a 500 error slip through), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでPlaywright requestを使った自動APIテストを学ぶ。よくあるステータスコード、GET/POSTリクエストの書き方、ボディ／スキーマの検証、認証ヘッダー・トークン、2つの実例（ステータス200でもデータが誤っている、ステータス確認を省いたスクリプトが500エラーを見逃す）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử API cơ bản bằng Playwright request", steps: [
    { name: "Gọi request và kiểm status code trước", text: "Gọi request.get/post rồi kiểm expect(res.status()) ngay dòng đầu, trước khi đọc body." },
    { name: "Kiểm body/schema", text: "Đọc res.json() rồi kiểm từng trường dữ liệu có đúng kiểu, đúng giá trị mong đợi." },
    { name: "Kiểm header & token xác thực", text: "Gửi Authorization: Bearer token, viết thêm ca âm khi thiếu/sai token." },
  ] },
  pages,
});

export const AU_API_01 = [API_01];
