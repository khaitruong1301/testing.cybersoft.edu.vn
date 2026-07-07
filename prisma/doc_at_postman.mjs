// ============================================================================
// AT_POSTMAN — 2 bài "Postman & Newman" (kind=congnghe) cho automation-tools.
// 1) at-postman-newman-ci   — từ test API thủ công đến chạy collection tự động
//    trong CI với Newman (domain banking).
// 2) at-postman-data-driven-scripting — pm.* scripting nâng cao & data-driven,
//    chaining, JSON schema, iterationData, auth, negative cases (domain saas).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// SVG helpers (viewBox 0 0 720 220, dark bg #0f172a)
// ---------------------------------------------------------------------------
const SVG_PIPELINE = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Manual Postman → Newman → CI gate</text>
<rect x="30" y="70" width="140" height="70" rx="10" fill="#12315e" stroke="#60a5fa" stroke-width="2"/>
<text x="100" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#dbeafe">Collection</text>
<text x="100" y="120" text-anchor="middle" font-size="10" fill="#93c5fd">folders + pm.test</text>
<rect x="200" y="70" width="140" height="70" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="270" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#ccfbf1">Environment</text>
<text x="270" y="120" text-anchor="middle" font-size="10" fill="#5eead4">baseUrl · token</text>
<rect x="370" y="70" width="140" height="70" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="440" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#e0e7ff">newman run</text>
<text x="440" y="120" text-anchor="middle" font-size="10" fill="#a5b4fc">CLI + reporters</text>
<rect x="540" y="70" width="150" height="70" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="615" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#ffedd5">CI gate</text>
<text x="615" y="120" text-anchor="middle" font-size="10" fill="#fdba74">exit code ≠ 0 → fail</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arP)"><path d="M170 105 h30"/><path d="M340 105 h30"/><path d="M510 105 h30"/></g>
<text x="360" y="185" text-anchor="middle" font-size="11" fill="#64748b">htmlextra · junit report → artifact + kiểm định merge</text>
<defs><marker id="arP" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_SANDBOX = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Vòng đời một request trong Postman Sandbox</text>
<rect x="40" y="55" width="180" height="55" rx="8" fill="#155e63" stroke="#22d3ee" stroke-width="2"/>
<text x="130" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#cffafe">Pre-request Script</text>
<text x="130" y="98" text-anchor="middle" font-size="10" fill="#67e8f9">set biến, ký, sinh data</text>
<rect x="270" y="55" width="180" height="55" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
<text x="360" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#dbeafe">HTTP Request</text>
<text x="360" y="98" text-anchor="middle" font-size="10" fill="#93c5fd">gửi tới API thật/mock</text>
<rect x="500" y="55" width="180" height="55" rx="8" fill="#4c1d95" stroke="#a78bfa" stroke-width="2"/>
<text x="590" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#ede9fe">Test Script</text>
<text x="590" y="98" text-anchor="middle" font-size="10" fill="#c4b5fd">pm.test · pm.expect</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arS)"><path d="M220 82 h50"/><path d="M450 82 h50"/></g>
<rect x="150" y="145" width="420" height="50" rx="8" fill="#0b1220" stroke="#475569" stroke-width="1.5"/>
<text x="360" y="167" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">pm.variables · pm.environment · pm.collectionVariables</text>
<text x="360" y="184" text-anchor="middle" font-size="10" fill="#64748b">scope biến chia sẻ giữa các bước → chaining request</text>
<defs><marker id="arS" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_DATADRIVEN = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Data-driven: 1 request × N dòng dữ liệu</text>
<rect x="40" y="55" width="150" height="130" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="115" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="#e0f2fe">users.csv</text>
<g font-size="9.5" fill="#7dd3fc"><text x="55" y="100">email,pass,expect</text><text x="55" y="118">a@x.io,Ok1!,200</text><text x="55" y="136">bad,123,400</text><text x="55" y="154">c@x.io,,422</text></g>
<rect x="270" y="80" width="170" height="70" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="355" y="108" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">POST /login</text>
<text x="355" y="128" text-anchor="middle" font-size="10" fill="#5eead4">{{email}} {{pass}}</text>
<g font-size="10" fill="#fbbf24"><text x="530" y="80">iter 1 → 200 ✓</text><text x="530" y="112">iter 2 → 400 ✓</text><text x="530" y="144">iter 3 → 422 ✓</text></g>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arD)"><path d="M190 118 h80"/><path d="M440 115 h70"/></g>
<text x="360" y="205" text-anchor="middle" font-size="11" fill="#64748b">newman run col.json -d users.csv  → mỗi dòng = 1 iteration, dùng chung assertion</text>
<defs><marker id="arD" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const SVG_CHAIN = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Chaining: truyền token & id qua biến</text>
<rect x="30" y="70" width="150" height="80" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="105" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#e0e7ff">POST /auth</text>
<text x="105" y="118" text-anchor="middle" font-size="10" fill="#a5b4fc">set env token</text>
<rect x="230" y="70" width="150" height="80" rx="10" fill="#155e63" stroke="#22d3ee" stroke-width="2"/>
<text x="305" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#cffafe">POST /orders</text>
<text x="305" y="118" text-anchor="middle" font-size="10" fill="#67e8f9">Bearer {{token}}</text>
<rect x="430" y="70" width="150" height="80" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="505" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">GET /orders/:id</text>
<text x="505" y="118" text-anchor="middle" font-size="10" fill="#5eead4">use {{orderId}}</text>
<rect x="600" y="70" width="95" height="80" rx="10" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="647" y="105" text-anchor="middle" font-size="12" font-weight="700" fill="#ffedd5">DELETE</text>
<text x="647" y="123" text-anchor="middle" font-size="10" fill="#fdba74">cleanup</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arC)"><path d="M180 110 h50"/><path d="M380 110 h50"/><path d="M580 110 h20"/></g>
<text x="360" y="195" text-anchor="middle" font-size="11" fill="#64748b">pm.environment.set("token", …) → {{token}} ở request sau · pm.collectionVariables cho orderId</text>
<defs><marker id="arC" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

// ===========================================================================
// BÀI 1 — at-postman-newman-ci (banking)
// ===========================================================================
const pages1 = [
  {
    heading: {
      vi: "1. Vì sao chuyển test API thủ công sang tự động",
      en: "1. Why move from manual to automated API testing",
      ja: "1. なぜ手動APIテストから自動化へ移行するのか",
    },
    blocks: [
      P(
        "Trong một ngân hàng số, mỗi ngày đội QA phải kiểm thử hàng trăm endpoint: mở tài khoản, chuyển khoản, tra cứu số dư, khóa thẻ. Ở giai đoạn đầu, kiểm thử viên thường mở Postman, bấm Send từng request, rồi mắt thường so sánh phản hồi với đặc tả. Cách làm này rất chậm, dễ bỏ sót và không lặp lại được: khi lập trình viên sửa một API lúc nửa đêm, không ai chạy lại toàn bộ. Bài viết này đi từ thao tác thủ công đó tới một quy trình chạy collection tự động, có cổng kiểm định trong CI, để mỗi lần đẩy code là toàn bộ API được gác cửa.",
        "In a digital bank, the QA team must test hundreds of endpoints every day: open account, transfer money, check balance, block card. Early on, testers open Postman, click Send on each request, and eyeball the response against the spec. This is slow, error-prone and non-repeatable: when a developer patches an API at midnight, nobody replays the whole suite. This article moves from that manual gesture to an automated collection run gated in CI, so every code push guards the entire API surface.",
        "デジタルバンクでは、QAチームは毎日、口座開設・送金・残高照会・カードロックなど数百のエンドポイントをテストしなければなりません。初期段階では、テスターがPostmanを開き、各リクエストのSendを押し、目視で仕様と照合します。これは遅く、ミスが起きやすく、再現性がありません。開発者が深夜にAPIを修正しても、誰も全体を再実行しないのです。本記事では、その手動操作から、CIで検証ゲートを備えた自動コレクション実行へと進み、コードをプッシュするたびにAPI全体を守れるようにします。",
      ),
      IMG(SVG_PIPELINE, "Từ Postman thủ công đến cổng CI với Newman", "From manual Postman to a Newman CI gate", "手動PostmanからNewmanのCIゲートまで"),
      UL(
        ["Lặp lại được: cùng một collection chạy giống nhau trên máy dev và trên CI", "Nhanh: hàng trăm assertion chạy trong vài giây thay vì vài giờ bấm tay", "Có bằng chứng: report HTML/JUnit lưu lại kết quả cho audit ngân hàng", "Gác cửa: pipeline fail khi có assertion sai, chặn code lỗi vào nhánh chính"],
        ["Repeatable: the same collection runs identically on a dev laptop and on CI", "Fast: hundreds of assertions in seconds instead of hours of clicking", "Evidence: HTML/JUnit reports keep results for banking audits", "Gating: the pipeline fails on any failed assertion, blocking bad code from main"],
        ["再現性: 同じコレクションが開発PCとCIで同一に実行されます", "高速: 手作業の数時間ではなく数秒で数百のアサーションを実行します", "証跡: HTML/JUnitレポートが銀行監査向けに結果を保存します", "ゲート: アサーション失敗でパイプラインが失敗し、不良コードのmain流入を防ぎます"],
      ),
      NOTE(
        "Tự động hóa không thay thế tư duy kiểm thử; nó chỉ giải phóng bạn khỏi thao tác lặp để tập trung vào thiết kế ca kiểm thử tốt hơn.",
        "Automation does not replace test thinking; it frees you from repetition so you focus on designing better test cases.",
        "自動化はテストの思考を置き換えるものではありません。反復作業から解放し、より良いテストケース設計に集中させてくれるものです。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Mô hình Collection, Folder và Request",
      en: "2. The Collection, Folder and Request model",
      ja: "2. コレクション・フォルダ・リクエストのモデル",
    },
    blocks: [
      P(
        "Đơn vị tổ chức trong Postman là collection: một cây chứa các folder và request. Với hệ core-banking, ta thường tạo một collection cho từng miền nghiệp vụ, ví dụ Accounts, Transfers, Cards. Bên trong mỗi folder là các request cụ thể như POST /accounts, GET /accounts/:id. Cấu trúc rõ ràng giúp Newman chạy đúng thứ tự và giúp người mới đọc hiểu luồng nghiệp vụ. Một collection được lưu dưới dạng file JSON theo chuẩn Collection Format v2.1, nhờ đó có thể đưa vào Git và review như mã nguồn.",
        "The organizing unit in Postman is the collection: a tree of folders and requests. For a core-banking system we usually create one collection per business domain, e.g. Accounts, Transfers, Cards. Each folder holds concrete requests like POST /accounts, GET /accounts/:id. A clear structure lets Newman run in order and helps newcomers read the business flow. A collection is stored as a JSON file in Collection Format v2.1, so it can live in Git and be reviewed like source code.",
        "Postmanの整理単位はコレクションで、フォルダとリクエストのツリーです。コアバンキングシステムでは通常、Accounts・Transfers・Cardsのように業務ドメインごとに1コレクションを作成します。各フォルダには POST /accounts、GET /accounts/:id といった具体的なリクエストが入ります。明確な構造により、Newmanが順序どおり実行でき、新メンバーも業務フローを読み取れます。コレクションはCollection Format v2.1のJSONファイルとして保存されるため、Gitに置いてソースコードのようにレビューできます。",
      ),
      UL(
        ["Collection: đơn vị chạy của Newman, tương ứng một bộ kiểm thử", "Folder: nhóm logic (ví dụ luồng đăng nhập, luồng chuyển khoản)", "Request: một lời gọi HTTP với method, URL, header, body", "Collection JSON: đưa vào Git, review như code, so sánh diff qua các bản"],
        ["Collection: Newman's unit of execution, one test suite", "Folder: a logical group (e.g. login flow, transfer flow)", "Request: one HTTP call with method, URL, headers, body", "Collection JSON: lives in Git, reviewed like code, diffed across versions"],
        ["コレクション: Newmanの実行単位、1つのテストスイート", "フォルダ: 論理的なグループ（例: ログインフロー、送金フロー）", "リクエスト: メソッド・URL・ヘッダー・ボディを持つ1回のHTTP呼び出し", "コレクションJSON: Gitに置き、コードのようにレビューし、版間で差分を取ります"],
      ),
      CODE("bash", `# Cấu trúc thư mục kiểm thử trong repo ngân hàng
banking-api-tests/
├── collections/
│   ├── accounts.postman_collection.json
│   └── transfers.postman_collection.json
├── environments/
│   ├── dev.postman_environment.json
│   └── staging.postman_environment.json
├── data/
│   └── transfer-cases.csv
└── package.json   # scripts newman + reporters`),
      TIP(
        "Đặt tên request theo dạng \"METHOD /path — mục tiêu\" để report đọc như một danh sách checklist nghiệp vụ.",
        "Name requests as \"METHOD /path — goal\" so the report reads like a business checklist.",
        "リクエスト名は「METHOD /path — 目的」の形式にすると、レポートが業務チェックリストのように読めます。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Test Script và pm.* trong Postman Sandbox",
      en: "3. Test scripts and pm.* in the Postman Sandbox",
      ja: "3. テストスクリプトとサンドボックスのpm.*",
    },
    blocks: [
      P(
        "Mỗi request có hai ô script chạy trong Postman Sandbox (một môi trường JavaScript): Pre-request Script chạy trước khi gửi, và Tests chạy sau khi có phản hồi. Đối tượng trung tâm là pm. Ta dùng pm.test để khai báo một ca kiểm thử có tên, pm.response để đọc phản hồi, và pm.expect (thư viện Chai) để viết khẳng định. Đây chính là cách biến việc \"nhìn bằng mắt\" thành assertion tự động, chạy được cả trên Newman.",
        "Every request has two script slots running in the Postman Sandbox (a JavaScript environment): the Pre-request Script runs before sending, and Tests runs after the response arrives. The central object is pm. We use pm.test to declare a named test case, pm.response to read the response, and pm.expect (the Chai library) to write assertions. This is how eyeballing becomes automated assertions that also run under Newman.",
        "各リクエストには、Postmanサンドボックス（JavaScript環境）で動く2つのスクリプト枠があります。Pre-request Scriptは送信前に、Testsは応答受信後に実行されます。中心となるオブジェクトはpmです。名前付きテストケースを宣言するpm.test、応答を読むpm.response、アサーションを書くpm.expect（Chaiライブラリ）を使います。これが目視を、Newmanでも動く自動アサーションへ変える方法です。",
      ),
      IMG(SVG_SANDBOX, "Vòng đời request: pre-request → HTTP → test", "Request lifecycle: pre-request → HTTP → test", "リクエストのライフサイクル: pre-request → HTTP → test"),
      CODE("javascript", `// Tab "Tests" cho request GET /accounts/:id
pm.test("Status code là 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Thời gian phản hồi dưới 800ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(800);
});

const body = pm.response.json();
pm.test("Trả về đúng accountId đã yêu cầu", function () {
  pm.expect(body.accountId).to.eql(pm.collectionVariables.get("accountId"));
  pm.expect(body).to.have.property("balance");
  pm.expect(body.currency).to.be.oneOf(["VND", "USD"]);
});`),
      NOTE(
        "pm.response.to.have.status và pm.expect là hai phong cách khẳng định; cả hai đều hợp lệ, chọn một để nhất quán trong đội.",
        "pm.response.to.have.status and pm.expect are two assertion styles; both are valid, pick one for team consistency.",
        "pm.response.to.have.status と pm.expect は2つのアサーションスタイルです。どちらも有効なので、チームの一貫性のため1つを選びます。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Assertion và kiểm định lược đồ JSON",
      en: "4. Assertions and JSON schema validation",
      ja: "4. アサーションとJSONスキーマ検証",
    },
    blocks: [
      P(
        "Khẳng định từng trường sẽ dài dòng khi phản hồi có cấu trúc lớn. Với API ngân hàng, hợp đồng dữ liệu rất quan trọng: một trường số dư thiếu hay sai kiểu có thể gây sự cố tài chính. Vì vậy ta kiểm định lược đồ (schema validation): mô tả cấu trúc mong đợi bằng JSON Schema rồi để pm.response.to.have.jsonSchema kiểm tra toàn bộ phản hồi trong một assertion. Postman dùng thư viện ajv bên dưới; các bản cũ dùng tv4. Cách này bắt được thay đổi hợp đồng ngay cả khi giá trị hợp lệ.",
        "Asserting field by field gets verbose for large payloads. For banking APIs the data contract is critical: a missing or wrong-typed balance field can cause a financial incident. So we do schema validation: describe the expected shape with JSON Schema and let pm.response.to.have.jsonSchema check the whole response in one assertion. Postman uses the ajv library under the hood; older versions used tv4. This catches contract changes even when values look valid.",
        "フィールドを個別にアサートすると、大きなペイロードでは冗長になります。銀行APIではデータ契約が重要です。残高フィールドの欠落や型違いは金融事故を招きかねません。そこでスキーマ検証を行います。期待する形をJSON Schemaで記述し、pm.response.to.have.jsonSchema に応答全体を1つのアサーションで検査させます。Postmanは内部でajvライブラリを使い、旧版はtv4を使いました。これは値が正常に見えても契約の変更を捕捉します。",
      ),
      CODE("javascript", `// Kiểm định lược đồ cho phản hồi tài khoản
const accountSchema = {
  type: "object",
  required: ["accountId", "balance", "currency", "status"],
  properties: {
    accountId: { type: "string" },
    balance:   { type: "number" },
    currency:  { type: "string", enum: ["VND", "USD"] },
    status:    { type: "string", enum: ["ACTIVE", "BLOCKED", "CLOSED"] }
  }
};

pm.test("Phản hồi khớp lược đồ tài khoản", function () {
  pm.response.to.have.jsonSchema(accountSchema);
});`),
      WARN(
        "Đừng để schema quá lỏng (chỉ type: object). Bắt buộc khai báo required và enum thì mới bắt được lỗi hợp đồng thực sự.",
        "Do not make the schema too loose (just type: object). Declaring required and enum is what catches real contract breaks.",
        "スキーマを緩くしすぎない（type: objectだけ）でください。requiredとenumを宣言してこそ、本当の契約違反を捕捉できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Biến và môi trường: dev, staging, production",
      en: "5. Variables and environments: dev, staging, production",
      ja: "5. 変数と環境: dev・staging・production",
    },
    blocks: [
      P(
        "Không được ghi cứng URL hay token vào request. Postman cung cấp nhiều phạm vi biến (variable scope): biến toàn cục, biến collection, biến environment, biến data và biến cục bộ. Ta tạo file environment riêng cho dev, staging và production, mỗi file chứa baseUrl, tài khoản kỹ thuật và các khóa. Trong request, ta tham chiếu bằng cú pháp mustache {{baseUrl}}. Nhờ vậy cùng một collection chạy được ở mọi môi trường chỉ bằng cách đổi file environment, một yếu tố bắt buộc để đưa vào CI.",
        "Never hard-code URLs or tokens into requests. Postman offers several variable scopes: global, collection, environment, data and local. We create separate environment files for dev, staging and production, each holding baseUrl, technical accounts and keys. In a request we reference them with mustache syntax {{baseUrl}}. Thus the same collection runs anywhere just by swapping the environment file — a must for CI.",
        "URLやトークンをリクエストにハードコードしないでください。Postmanには複数の変数スコープがあります。グローバル・コレクション・環境・データ・ローカルです。dev・staging・production用に別々の環境ファイルを作り、それぞれにbaseUrl・技術アカウント・キーを保持します。リクエスト内ではmustache構文 {{baseUrl}} で参照します。こうして同じコレクションが環境ファイルを差し替えるだけでどこでも動き、CI投入の必須条件になります。",
      ),
      CODE("json", `// environments/staging.postman_environment.json (rút gọn)
{
  "name": "staging",
  "values": [
    { "key": "baseUrl", "value": "https://staging-api.bank.example", "enabled": true },
    { "key": "clientId", "value": "qa-runner", "enabled": true },
    { "key": "token", "value": "", "enabled": true }
  ]
}`),
      UL(
        ["Global: dùng chung mọi collection — hạn chế dùng cho hệ lớn", "Collection: hằng số của riêng bộ kiểm thử (ví dụ apiVersion)", "Environment: khác nhau theo môi trường (baseUrl, khóa)", "Data: đến từ file CSV/JSON khi chạy data-driven", "Local: đặt trong script, chỉ sống trong một lần chạy request"],
        ["Global: shared across all collections — limit for large systems", "Collection: constants owned by this suite (e.g. apiVersion)", "Environment: differ per environment (baseUrl, keys)", "Data: come from a CSV/JSON file in data-driven runs", "Local: set in a script, live only within one request run"],
        ["グローバル: 全コレクション共有 — 大規模では使用を制限", "コレクション: このスイート固有の定数（例: apiVersion）", "環境: 環境ごとに異なる（baseUrl、キー）", "データ: データ駆動実行時にCSV/JSONファイルから供給", "ローカル: スクリプト内で設定、1回のリクエスト実行内だけ有効"],
      ),
      TIP(
        "Không commit token thật vào file environment. Để trống và nạp qua biến môi trường CI (--env-var) hoặc cho pre-request script tự lấy token.",
        "Never commit real tokens to environment files. Leave them empty and inject via CI env vars (--env-var) or fetch a token in a pre-request script.",
        "実トークンを環境ファイルにコミットしないでください。空にしておき、CIの環境変数（--env-var）で注入するか、pre-requestスクリプトで取得します。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Chuỗi request và cấp phát token",
      en: "6. Chaining requests and token provisioning",
      ja: "6. リクエストの連鎖とトークン取得",
    },
    blocks: [
      P(
        "Nhiều nghiệp vụ ngân hàng cần đăng nhập trước rồi mới gọi được API bảo vệ. Ta đặt một request POST /auth ở đầu collection, trong tab Tests đọc token rồi lưu vào biến environment. Các request sau dùng header Authorization: Bearer {{token}}. Kỹ thuật này gọi là chaining: kết quả của bước trước trở thành đầu vào của bước sau, giữ đúng thứ tự chạy. Trên Newman, thứ tự trong collection chính là thứ tự thực thi, nên chỉ cần sắp request cho đúng.",
        "Many banking flows require logging in before calling protected APIs. We place a POST /auth request at the top of the collection, read the token in its Tests tab and store it in an environment variable. Later requests use header Authorization: Bearer {{token}}. This technique is chaining: an earlier step's output becomes a later step's input, preserving run order. In Newman the order in the collection is the execution order, so we just arrange requests correctly.",
        "多くの銀行フローでは、保護されたAPIを呼ぶ前にログインが必要です。コレクション先頭に POST /auth リクエストを置き、そのTestsタブでトークンを読み取り環境変数に保存します。以降のリクエストはヘッダー Authorization: Bearer {{token}} を使います。この手法が連鎖（チェイニング）で、前ステップの出力が次ステップの入力になり、実行順序を保ちます。Newmanではコレクション内の順序が実行順序なので、リクエストを正しく並べるだけです。",
      ),
      CODE("javascript", `// Tests của POST /auth — lưu token cho các request sau
pm.test("Đăng nhập thành công", function () {
  pm.response.to.have.status(200);
});
const data = pm.response.json();
pm.environment.set("token", data.access_token);
pm.collectionVariables.set("accountId", data.defaultAccountId);

// Pre-request Script của request cần bảo vệ (nếu token gần hết hạn)
if (!pm.environment.get("token")) {
  console.warn("Chưa có token — hãy chạy request /auth trước");
}`),
      NOTE(
        "Đặt request /auth trong một folder \"setup\" ở đầu collection. Newman chạy tuần tự từ trên xuống nên setup luôn chạy trước.",
        "Put the /auth request in a \"setup\" folder at the top. Newman runs top to bottom, so setup always runs first.",
        "/auth リクエストを先頭の「setup」フォルダに置きます。Newmanは上から順に実行するため、setupが必ず最初に走ります。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Kiểm thử dựa trên dữ liệu (data-driven)",
      en: "7. Data-driven testing",
      ja: "7. データ駆動テスト",
    },
    blocks: [
      P(
        "Luồng chuyển khoản có nhiều biến thể: đủ số dư, thiếu số dư, sai định dạng số tài khoản, vượt hạn mức. Thay vì tạo bốn request giống nhau, ta viết một request POST /transfers dùng biến {{fromAccount}}, {{toAccount}}, {{amount}}, {{expectedStatus}} rồi cung cấp một file dữ liệu. Postman gọi mỗi dòng dữ liệu là một iteration. Trên giao diện, Collection Runner cho phép nạp CSV/JSON; trên dòng lệnh, Newman dùng cờ -d. Cùng một assertion sẽ được áp cho mọi dòng, giúp phủ nhiều ca chỉ với một request.",
        "The transfer flow has many variants: sufficient balance, insufficient balance, malformed account number, over the limit. Instead of four near-identical requests, we write one POST /transfers using {{fromAccount}}, {{toAccount}}, {{amount}}, {{expectedStatus}} and supply a data file. Postman calls each data row an iteration. In the UI, the Collection Runner loads CSV/JSON; on the CLI, Newman uses the -d flag. The same assertions apply to every row, covering many cases with one request.",
        "送金フローには多くのバリエーションがあります。残高十分、残高不足、口座番号の形式不正、限度額超過などです。ほぼ同一の4リクエストを作る代わりに、{{fromAccount}}・{{toAccount}}・{{amount}}・{{expectedStatus}} を使う1つの POST /transfers を書き、データファイルを供給します。Postmanは各データ行をイテレーションと呼びます。UIではCollection RunnerがCSV/JSONを読み込み、CLIではNewmanが -d フラグを使います。同じアサーションが全行に適用され、1リクエストで多くのケースを網羅します。",
      ),
      IMG(SVG_DATADRIVEN, "Một request chạy N iteration theo file dữ liệu", "One request runs N iterations from a data file", "1つのリクエストがデータファイルからN回のイテレーションを実行"),
      P(
        "Lợi ích lớn nhất của cách này là tách phần logic khỏi phần dữ liệu. Khi nghiệp vụ thêm một quy tắc mới, ta chỉ cần thêm một dòng vào file dữ liệu chứ không phải sao chép thêm request rồi sửa từng chỗ. File dữ liệu cũng trở thành một dạng tài liệu sống: người đọc nhìn vào là hiểu ngay các trường hợp mà API phải xử lý đúng. Với ngân hàng, nơi mỗi quy tắc chuyển khoản có thể liên quan tới hạn mức, phí và tỷ giá, việc quản lý ca kiểm thử bằng bảng dữ liệu giúp đội nghiệp vụ và đội kỹ thuật cùng đọc và cùng bổ sung một cách an toàn.",
        "The biggest benefit here is separating logic from data. When the business adds a new rule, we only add one row to the data file rather than copying another request and editing every spot. The data file also becomes living documentation: a reader instantly sees the cases the API must handle correctly. For a bank, where each transfer rule may involve limits, fees and exchange rates, managing test cases as a data table lets business and engineering read and extend them together safely.",
        "ここでの最大の利点は、ロジックとデータの分離です。業務が新しいルールを追加するとき、リクエストを複製して各所を修正するのではなく、データファイルに1行追加するだけです。データファイルは生きたドキュメントにもなります。読み手はAPIが正しく処理すべきケースを一目で把握できます。各送金ルールが限度額・手数料・為替に関わりうる銀行では、テストケースをデータ表として管理することで、業務チームと技術チームが一緒に安全に読み拡張できます。",
      ),
      CODE("javascript", `// Tests dùng cột expectedStatus từ file CSV
pm.test("Status khớp kỳ vọng của dòng dữ liệu", function () {
  const expected = Number(pm.iterationData.get("expectedStatus"));
  pm.expect(pm.response.code).to.eql(expected);
});`),
    ],
  },
  {
    heading: {
      vi: "8. Newman CLI: chạy collection ngoài giao diện",
      en: "8. Newman CLI: running collections headless",
      ja: "8. Newman CLI: GUIなしでコレクションを実行",
    },
    blocks: [
      P(
        "Newman là trình chạy dòng lệnh chính thức của Postman, viết bằng Node.js. Nó nạp một collection JSON, một environment và tùy chọn một file dữ liệu, rồi thực thi toàn bộ pm.test giống hệt Collection Runner nhưng không cần giao diện. Điểm mấu chốt cho tự động hóa: khi có bất kỳ assertion nào fail, Newman thoát với mã khác 0. Đây là tín hiệu để CI biết build đã hỏng. Cài Newman qua npm, cố định phiên bản trong package.json để mọi máy chạy giống nhau.",
        "Newman is Postman's official command-line runner, written in Node.js. It loads a collection JSON, an environment and optionally a data file, then executes all pm.test exactly like the Collection Runner but without a UI. The key for automation: on any failed assertion, Newman exits with a non-zero code. That is the signal CI uses to know the build is broken. Install Newman via npm and pin the version in package.json so every machine runs identically.",
        "NewmanはPostman公式のコマンドラインランナーで、Node.js製です。コレクションJSON・環境・任意でデータファイルを読み込み、Collection Runnerと全く同じようにすべてのpm.testを実行しますが、UIは不要です。自動化の要点は、いずれかのアサーションが失敗するとNewmanが非ゼロのコードで終了することです。これがビルド破損をCIに知らせる信号です。npmでNewmanを入れ、package.jsonでバージョンを固定し、全マシンで同一に動くようにします。",
      ),
      CODE("bash", `# Cài đặt (cố định phiên bản)
npm install --save-dev newman newman-reporter-htmlextra

# Chạy cơ bản với environment
npx newman run collections/transfers.postman_collection.json \\
  -e environments/staging.postman_environment.json

# Chạy data-driven, lặp theo CSV
npx newman run collections/transfers.postman_collection.json \\
  -e environments/staging.postman_environment.json \\
  -d data/transfer-cases.csv

# Kiểm tra mã thoát (0 = pass, khác 0 = có test fail)
echo "exit code = $?"`),
      TIP(
        "Thêm cờ --bail để dừng ngay khi gặp lỗi khi debug, hoặc bỏ nó khi muốn thấy toàn bộ ca fail trong một lần chạy CI.",
        "Add --bail to stop on the first failure while debugging, or omit it in CI to see all failing cases in one run.",
        "デバッグ時は --bail を付けて最初の失敗で停止し、CIでは付けずに1回の実行で全失敗ケースを確認します。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Reporter: htmlextra và JUnit",
      en: "9. Reporters: htmlextra and JUnit",
      ja: "9. レポーター: htmlextra と JUnit",
    },
    blocks: [
      P(
        "Newman xuất kết quả qua các reporter. Reporter cli in ra terminal, phù hợp khi chạy tay. Trong CI ta cần bằng chứng lưu lại: reporter htmlextra (một gói newman-reporter cộng đồng) tạo báo cáo HTML đẹp có thể mở như trang web, còn reporter junit tạo file XML theo chuẩn JUnit để các máy chủ CI như Jenkins, GitLab hiển thị thành bảng test có màu. Với ngân hàng, các báo cáo này chính là hồ sơ kiểm thử cho kiểm toán và cho việc điều tra sự cố.",
        "Newman emits results through reporters. The cli reporter prints to the terminal, good for manual runs. In CI we need saved evidence: the htmlextra reporter (a community newman-reporter package) produces a rich HTML report you can open like a web page, while the junit reporter emits JUnit-standard XML so CI servers like Jenkins or GitLab render a colored test table. For a bank, these reports are the test records for audit and incident investigation.",
        "Newmanはレポーター経由で結果を出力します。cliレポーターはターミナルに表示し、手動実行に適します。CIでは保存された証跡が必要です。htmlextraレポーター（コミュニティ製のnewman-reporterパッケージ）はWebページのように開ける豊富なHTMLレポートを生成し、junitレポーターはJUnit標準のXMLを出力してJenkinsやGitLabなどのCIサーバーが色付きテスト表を描画できます。銀行では、これらのレポートが監査とインシデント調査のためのテスト記録になります。",
      ),
      CODE("bash", `# Nhiều reporter cùng lúc: cli để xem, htmlextra + junit để lưu
npx newman run collections/transfers.postman_collection.json \\
  -e environments/staging.postman_environment.json \\
  -d data/transfer-cases.csv \\
  --reporters cli,htmlextra,junit \\
  --reporter-htmlextra-export reports/transfers.html \\
  --reporter-junit-export reports/transfers-junit.xml`),
      P(
        "Trong thực tế, ta thường bật đồng thời nhiều reporter cho những mục đích khác nhau. Reporter cli giúp lập trình viên đọc nhanh ngay trên log của pipeline khi có lỗi. Reporter junit là ngôn ngữ chung mà hầu hết máy chủ CI hiểu, nhờ đó kết quả hiện thành bảng test có màu ngay trong giao diện build. Còn reporter htmlextra tạo ra một trang báo cáo giàu thông tin, có thể tải về như một artifact và gửi cho kiểm toán viên hay quản lý mà không cần họ đăng nhập vào hệ thống CI. Việc lưu lại các báo cáo này theo từng lần chạy giúp đội có bằng chứng khách quan khi cần điều tra một sự cố xảy ra vào thời điểm nào đó trong quá khứ.",
        "In practice we usually enable several reporters at once for different purposes. The cli reporter lets developers read quickly right in the pipeline log when something fails. The junit reporter is the common language most CI servers understand, so results render as a colored test table in the build UI. The htmlextra reporter produces a rich report page that can be downloaded as an artifact and sent to an auditor or manager without them logging into the CI system. Saving these reports per run gives the team objective evidence when investigating an incident that happened at some point in the past.",
        "実務では通常、目的別に複数のレポーターを同時に有効化します。cliレポーターは、失敗時に開発者がパイプラインのログで素早く読めます。junitレポーターはほとんどのCIサーバーが理解する共通言語で、結果がビルドUIに色付きテスト表として描画されます。htmlextraレポーターは、アーティファクトとしてダウンロードでき、監査人や管理者にCIにログインさせずに送れる豊富なレポートページを生成します。これらのレポートを実行ごとに保存すれば、過去のある時点で起きたインシデントを調査する際に客観的な証跡が得られます。",
      ),
      NOTE(
        "Reporter là gói npm đặt tên newman-reporter-<tên>. Cài htmlextra bằng: npm i -D newman-reporter-htmlextra rồi dùng --reporters htmlextra.",
        "Reporters are npm packages named newman-reporter-<name>. Install htmlextra with: npm i -D newman-reporter-htmlextra then use --reporters htmlextra.",
        "レポーターは newman-reporter-<名前> という名のnpmパッケージです。htmlextraは npm i -D newman-reporter-htmlextra で入れ、--reporters htmlextra で使います。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Tích hợp CI và cổng kiểm định (pipeline gate)",
      en: "10. CI integration and the pipeline gate",
      ja: "10. CI統合とパイプラインゲート",
    },
    blocks: [
      P(
        "Bước cuối là đưa Newman vào tích hợp liên tục (continuous integration). Mỗi khi có commit hoặc pull request, máy chủ CI cài phụ thuộc, chạy newman run rồi lưu report làm artifact. Vì Newman trả mã thoát khác 0 khi có test fail, chỉ cần để lệnh chạy trực tiếp là bước sẽ đỏ và pull request bị chặn merge. Đây chính là cổng kiểm định: không API nào được ghép vào nhánh chính nếu chưa qua toàn bộ assertion. Với ngân hàng, ta thường chạy trên môi trường staging đã seed dữ liệu, không bao giờ chạy test ghi lên production.",
        "The final step is putting Newman into continuous integration. On each commit or pull request, the CI server installs dependencies, runs newman run and saves the report as an artifact. Because Newman returns a non-zero exit code on failure, letting the command run directly makes the step red and blocks the pull request from merging. This is the gate: no API merges to main until all assertions pass. For a bank we run against a seeded staging environment and never run write tests on production.",
        "最後のステップはNewmanを継続的インテグレーションに組み込むことです。コミットやプルリクエストごとに、CIサーバーが依存関係をインストールし、newman runを実行してレポートをアーティファクトとして保存します。Newmanは失敗時に非ゼロの終了コードを返すため、コマンドを直接走らせるだけでステップが赤くなり、プルリクエストのマージがブロックされます。これがゲートです。全アサーションが通るまでどのAPIもmainにマージされません。銀行ではシードされたstaging環境で実行し、本番で書き込みテストは決して行いません。",
      ),
      CODE("yaml", `# .github/workflows/api-tests.yml
name: API contract tests
on: [pull_request]
jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - name: Run Newman (fails build on any assertion error)
        run: |
          npx newman run collections/transfers.postman_collection.json \\
            -e environments/staging.postman_environment.json \\
            -d data/transfer-cases.csv \\
            --env-var "token=\${{ secrets.QA_TOKEN }}" \\
            --reporters cli,junit,htmlextra \\
            --reporter-junit-export reports/junit.xml \\
            --reporter-htmlextra-export reports/report.html
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with: { name: newman-report, path: reports/ }`),
      WARN(
        "Truyền bí mật qua secrets của CI và cờ --env-var, đừng in token ra log. Đặt if: always() để report luôn được lưu kể cả khi test fail.",
        "Pass secrets via CI secrets and --env-var, never print tokens to logs. Use if: always() so the report is saved even when tests fail.",
        "秘密情報はCIのシークレットと --env-var で渡し、トークンをログに出力しないでください。if: always() を付け、テスト失敗時もレポートを保存します。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Cạm bẫy thường gặp",
      en: "11. Common pitfalls",
      ja: "11. よくある落とし穴",
    },
    blocks: [
      P(
        "Nhiều đội bắt đầu tốt nhưng vấp ở những chi tiết khiến bộ kiểm thử trở nên giòn (flaky) hoặc vô dụng. Dưới đây là các lỗi hay gặp khi đưa Postman và Newman vào ngân hàng, cùng cách phòng tránh để cổng CI đáng tin cậy.",
        "Many teams start well but stumble on details that make the suite flaky or useless. Below are the common mistakes when bringing Postman and Newman into a bank, with how to avoid them so the CI gate stays trustworthy.",
        "多くのチームは順調に始めますが、スイートを不安定（flaky）または無用にする細部でつまずきます。以下はPostmanとNewmanを銀行に導入する際のよくある誤りと、CIゲートを信頼できるものに保つ回避策です。",
      ),
      UL(
        ["Không có assertion: request chỉ gửi mà không có pm.test — Newman luôn xanh dù API hỏng", "Phụ thuộc dữ liệu bẩn: test dựa trên bản ghi có sẵn dễ vỡ khi DB đổi; hãy tự tạo và dọn dữ liệu", "Ghi cứng token/URL: khiến collection không chạy được trên môi trường khác", "Thứ tự ngầm định: request sau phụ thuộc biến của request trước nhưng lại chạy riêng lẻ khi debug", "Bỏ qua mã thoát: quên rằng chỉ cần newman run là đủ để CI đỏ khi fail"],
        ["No assertions: requests only send without pm.test — Newman is always green even if the API is broken", "Dirty data dependence: tests relying on pre-existing rows break when the DB changes; create and clean your own data", "Hard-coded token/URL: makes the collection unrunnable on other environments", "Implicit ordering: a later request depends on an earlier request's variable but is run alone while debugging", "Ignoring exit codes: forgetting that plain newman run already turns CI red on failure"],
        ["アサーションなし: リクエストが送信のみでpm.testがない — APIが壊れてもNewmanは常に緑", "汚れたデータ依存: 既存の行に依存するテストはDB変更で壊れる。自前でデータを作成し掃除する", "トークン/URLのハードコード: 他環境でコレクションが動かなくなる", "暗黙の順序: 後のリクエストが前のリクエストの変数に依存するのに、デバッグ時に単独実行される", "終了コードの無視: 単なるnewman runで失敗時にCIが赤くなることを忘れる"],
      ),
      TIP(
        "Thêm một request \"cleanup\" ở cuối collection để xóa bản ghi test đã tạo, giữ môi trường staging sạch cho lần chạy sau.",
        "Add a \"cleanup\" request at the end of the collection to delete created test records, keeping staging clean for the next run.",
        "コレクション末尾に「cleanup」リクエストを追加し、作成したテストレコードを削除して、次回のためにstagingを清潔に保ちます。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Kịch bản thực chiến: gác cửa API chuyển khoản",
      en: "12. Real scenario: gating the transfer API",
      ja: "12. 実戦シナリオ: 送金APIのゲート化",
    },
    blocks: [
      SCEN(
        "Sự cố suýt lọt lên production",
        "A near-miss to production",
        "Đội core-banking sửa dịch vụ chuyển khoản để thêm phí. Một lập trình viên vô tình đổi kiểu trường balance từ số sang chuỗi. Trước đây lỗi này lọt qua vì QA test tay theo cảm giác. Lần này, collection Transfers có assertion jsonSchema với balance: {type: number}. Khi mở pull request, GitHub Actions chạy newman run, iteration \"đủ số dư\" fail vì schema không khớp, mã thoát khác 0, bước CI đỏ và merge bị chặn. Report htmlextra chỉ rõ dòng dữ liệu và assertion nào hỏng. Lỗi được sửa trong 20 phút, không bao giờ chạm tới khách hàng.",
        "The core-banking team edits the transfer service to add a fee. A developer accidentally changes the balance field type from number to string. Previously this slipped through because QA tested by feel. This time the Transfers collection has a jsonSchema assertion with balance: {type: number}. On the pull request, GitHub Actions runs newman run, the \"sufficient balance\" iteration fails on the schema mismatch, the exit code is non-zero, the CI step is red and the merge is blocked. The htmlextra report pinpoints which data row and assertion broke. Fixed in 20 minutes, never reaching customers.",
        "本番寸前のヒヤリ",
        "コアバンキングチームが送金サービスに手数料を追加します。開発者が誤ってbalanceフィールドの型を数値から文字列に変えました。以前はQAが感覚でテストしたためすり抜けました。今回はTransfersコレクションに balance: {type: number} のjsonSchemaアサーションがあります。プルリクエストでGitHub Actionsがnewman runを実行し、「残高十分」のイテレーションがスキーマ不一致で失敗、終了コードは非ゼロ、CIステップは赤くマージがブロックされます。htmlextraレポートがどのデータ行とアサーションが壊れたか特定します。20分で修正され、顧客に届くことはありませんでした。",
      ),
      P(
        "Bài học: một assertion lược đồ đúng chỗ giá trị hơn hàng chục lần bấm Send bằng tay. Tự động hóa biến kiến thức kiểm thử của bạn thành một tấm lưới an toàn chạy 24/7.",
        "Lesson: one well-placed schema assertion is worth more than dozens of manual Sends. Automation turns your testing knowledge into a safety net running 24/7.",
        "教訓: 適切に配置した1つのスキーマアサーションは、手動Sendの数十回より価値があります。自動化はあなたのテスト知識を24時間365日動く安全網に変えます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Câu hỏi phỏng vấn thường gặp",
      en: "13. Common interview questions",
      ja: "13. よくある面接質問",
    },
    blocks: [
      QA(
        "Newman là gì và khác Collection Runner ở điểm nào?",
        "What is Newman and how does it differ from the Collection Runner?",
        "Newman là trình chạy dòng lệnh của Postman viết bằng Node.js. Nó thực thi cùng một collection với cùng các pm.test như Collection Runner trong giao diện, nhưng không cần UI nên chạy được trên máy chủ CI. Quan trọng nhất, Newman trả về mã thoát khác 0 khi có test fail, cho phép tự động chặn build.",
        "Newman is Postman's Node.js command-line runner. It executes the same collection with the same pm.test as the in-app Collection Runner, but without a UI so it runs on CI servers. Crucially, Newman returns a non-zero exit code on failure, which lets you gate builds automatically.",
        "NewmanとCollection Runnerの違いは？",
        "NewmanはPostmanのNode.js製コマンドラインランナーです。アプリ内のCollection Runnerと同じコレクション・同じpm.testを実行しますが、UI不要なのでCIサーバーで動きます。最も重要なのは、失敗時に非ゼロの終了コードを返し、ビルドを自動でゲートできることです。",
      ),
      QA(
        "Làm sao truyền token từ request đăng nhập sang các request sau?",
        "How do you pass a token from a login request to later requests?",
        "Trong tab Tests của request đăng nhập, đọc token bằng pm.response.json() rồi lưu bằng pm.environment.set(\"token\", value). Các request sau dùng header Authorization: Bearer {{token}}. Vì Newman chạy tuần tự theo thứ tự trong collection, request đăng nhập cần đặt trước.",
        "In the login request's Tests tab, read the token via pm.response.json() and store it with pm.environment.set(\"token\", value). Later requests use header Authorization: Bearer {{token}}. Since Newman runs sequentially in collection order, place the login request first.",
        "ログインリクエストのトークンを後続に渡すには？",
        "ログインリクエストのTestsタブで pm.response.json() でトークンを読み、pm.environment.set(\"token\", value) で保存します。後続リクエストはヘッダー Authorization: Bearer {{token}} を使います。Newmanはコレクション順に逐次実行するため、ログインリクエストを先頭に置きます。",
      ),
      QA(
        "Vì sao kiểm định lược đồ JSON tốt hơn khẳng định từng trường?",
        "Why is JSON schema validation better than field-by-field assertions?",
        "Schema mô tả toàn bộ cấu trúc mong đợi (kiểu, trường bắt buộc, enum) trong một chỗ, nên bắt được thay đổi hợp đồng ngay cả khi giá trị hợp lệ, và tránh viết hàng chục pm.expect lặp lại. pm.response.to.have.jsonSchema kiểm cả phản hồi trong một assertion. Với hệ tài chính, sai kiểu một trường như balance có thể gây sự cố, nên schema là tấm chắn hợp đồng quan trọng.",
        "A schema describes the whole expected shape (types, required fields, enums) in one place, so it catches contract changes even when values are valid, and avoids dozens of repetitive pm.expect. pm.response.to.have.jsonSchema checks the whole response in one assertion. In finance, a wrong type on a field like balance can cause an incident, so the schema is a vital contract guard.",
        "なぜフィールド個別より JSON スキーマ検証が良いのか？",
        "スキーマは期待する形全体（型・必須フィールド・enum）を1か所で記述するため、値が正常でも契約変更を捕捉し、反復的なpm.expectを何十も書かずに済みます。pm.response.to.have.jsonSchema は応答全体を1つのアサーションで検査します。金融ではbalanceのようなフィールドの型違いが事故を招くため、スキーマは重要な契約の守り手です。",
      ),
      QA(
        "Làm sao để bí mật không lộ khi chạy Newman trong CI?",
        "How do you keep secrets safe when running Newman in CI?",
        "Không commit token thật vào file environment; để trống rồi nạp lúc chạy bằng cờ --env-var lấy giá trị từ secrets của CI. Không in token ra log, và dùng if: always() chỉ để lưu report chứ không lộ giá trị. Với môi trường ghi dữ liệu, luôn chạy trên staging đã seed, không chạy test ghi lên production.",
        "Do not commit real tokens to environment files; leave them empty and inject at run time with --env-var reading from CI secrets. Never print tokens to logs, and use if: always() only to save reports, not to expose values. For write-capable flows, always run on seeded staging, never write tests on production.",
        "CIでNewmanを走らせる際に秘密情報を守るには？",
        "実トークンを環境ファイルにコミットせず、空にしておき、CIのシークレットから値を取る --env-var で実行時に注入します。トークンをログに出力せず、if: always() はレポート保存のみに使い値を露出しません。書き込みを伴うフローは常にシードされたstagingで実行し、本番で書き込みテストはしません。",
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết và checklist",
      en: "14. Summary and checklist",
      ja: "14. まとめとチェックリスト",
    },
    blocks: [
      P(
        "Chúng ta đã đi trọn con đường từ bấm Send bằng tay đến một cổng kiểm định API tự động trong CI. Nền tảng là collection có cấu trúc rõ, biến và môi trường sạch, test script dùng pm.* với assertion và kiểm định lược đồ, rồi Newman chạy headless với reporter lưu bằng chứng, cuối cùng là pipeline chặn merge khi có lỗi. Áp dụng nhất quán, đội QA ngân hàng biến kiến thức kiểm thử thành một lưới an toàn chạy trên mỗi pull request.",
        "We have walked the full path from clicking Send by hand to an automated API gate in CI. The foundation is well-structured collections, clean variables and environments, pm.* test scripts with assertions and schema validation, then headless Newman with reporters that save evidence, and finally a pipeline that blocks merges on failure. Applied consistently, a banking QA team turns testing knowledge into a safety net running on every pull request.",
        "手動でSendを押すところから、CIの自動APIゲートまで全行程を歩みました。基盤は、よく構造化されたコレクション、清潔な変数と環境、アサーションとスキーマ検証を備えたpm.*テストスクリプト、次に証跡を保存するレポーター付きのヘッドレスNewman、最後に失敗でマージをブロックするパイプラインです。一貫して適用すれば、銀行のQAチームはテスト知識をあらゆるプルリクエストで動く安全網に変えられます。",
      ),
      UL(
        ["Collection chia folder theo nghiệp vụ, lưu JSON trong Git", "Mọi request có pm.test; endpoint quan trọng có jsonSchema", "Không ghi cứng URL/token — dùng environment và {{biến}}", "Có file environment riêng cho dev/staging/production", "Newman chạy được ở local và CI với cùng lệnh", "Reporter htmlextra + junit lưu làm artifact", "Pipeline dựa vào mã thoát để chặn merge khi fail", "Có request cleanup, không chạy test ghi lên production"],
        ["Collection split into folders by domain, JSON in Git", "Every request has pm.test; key endpoints have jsonSchema", "No hard-coded URLs/tokens — use environments and {{vars}}", "Separate environment files for dev/staging/production", "Newman runs locally and in CI with the same command", "htmlextra + junit reporters saved as artifacts", "Pipeline relies on exit code to block merges on failure", "A cleanup request exists; never write tests on production"],
        ["コレクションはドメインごとにフォルダ分割、JSONをGitに保存", "全リクエストにpm.test、重要エンドポイントにjsonSchema", "URL/トークンをハードコードせず、環境と {{変数}} を使用", "dev/staging/production用に別々の環境ファイル", "Newmanがローカルとcで同じコマンドで動く", "htmlextra + junitレポーターをアーティファクトとして保存", "パイプラインは終了コードに依拠し失敗時にマージをブロック", "cleanupリクエストを用意し、本番で書き込みテストをしない"],
      ),
      NOTE(
        "Bắt đầu nhỏ: một collection quan trọng nhất, đưa vào CI, rồi mở rộng dần. Một cổng chạy được tốt hơn mười collection không ai chạy.",
        "Start small: your single most important collection, put it in CI, then expand. One working gate beats ten collections nobody runs.",
        "小さく始めましょう。最も重要な1つのコレクションをCIに入れ、徐々に拡大します。動く1つのゲートは、誰も実行しない10のコレクションに勝ります。",
      ),
    ],
  },
];

// ===========================================================================
// BÀI 2 — at-postman-data-driven-scripting (saas)
// ===========================================================================
const pages2 = [
  {
    heading: {
      vi: "1. Scripting nâng cao: khi request tĩnh là chưa đủ",
      en: "1. Advanced scripting: when static requests aren't enough",
      ja: "1. 高度なスクリプティング: 静的リクエストでは足りないとき",
    },
    blocks: [
      P(
        "Một nền tảng SaaS đa người thuê (multi-tenant) có API rất động: token hết hạn, mỗi tenant có gói dịch vụ khác nhau, dữ liệu tạo ở bước này lại cần cho bước sau. Nếu chỉ dùng request tĩnh với giá trị cố định, bộ kiểm thử sẽ giòn và không phản ánh hành vi thật. Bài viết này đi sâu vào khả năng lập trình của Postman qua đối tượng pm: tính toán trong pre-request, khẳng định linh hoạt trong test, nối các bước bằng biến, kiểm định lược đồ, và đặc biệt là kiểm thử dựa trên dữ liệu với nhiều ca gồm cả ca lỗi.",
        "A multi-tenant SaaS platform has a very dynamic API: tokens expire, each tenant has a different plan, data created in one step is needed by the next. With only static requests and fixed values, the suite becomes brittle and fails to reflect real behavior. This article dives into Postman's programmability through the pm object: computing in pre-request, flexible assertions in tests, chaining steps with variables, schema validation, and especially data-driven testing across many cases including error cases.",
        "マルチテナントのSaaSプラットフォームは非常に動的なAPIを持ちます。トークンは失効し、各テナントは異なるプランを持ち、あるステップで作成したデータが次で必要になります。固定値の静的リクエストだけでは、スイートは脆く、実際の挙動を反映できません。本記事はpmオブジェクトを通じたPostmanのプログラマビリティに踏み込みます。pre-requestでの計算、テストでの柔軟なアサーション、変数によるステップ連鎖、スキーマ検証、そして特にエラーケースを含む多数のケースでのデータ駆動テストです。",
      ),
      IMG(SVG_SANDBOX, "Sandbox: nơi pm.* biến request thành logic sống", "The sandbox where pm.* turns requests into living logic", "サンドボックス: pm.* がリクエストを生きたロジックに変える場"),
      UL(
        ["Pre-request Script: sinh dữ liệu, ký request, chuẩn bị biến trước khi gửi", "Test Script: khẳng định phản hồi, trích giá trị, quyết định luồng", "pm.variables/environment/collection: chia sẻ trạng thái giữa các bước", "pm.iterationData: đọc dữ liệu từng dòng khi chạy data-driven"],
        ["Pre-request Script: generate data, sign requests, prepare variables before sending", "Test Script: assert responses, extract values, drive flow", "pm.variables/environment/collection: share state across steps", "pm.iterationData: read per-row data in data-driven runs"],
        ["Pre-request Script: データ生成、リクエスト署名、送信前の変数準備", "Test Script: 応答のアサーション、値の抽出、フロー制御", "pm.variables/environment/collection: ステップ間で状態を共有", "pm.iterationData: データ駆動実行で行ごとのデータを読み取り"],
      ),
      NOTE(
        "Script trong Postman chạy trong sandbox JavaScript có sẵn một số thư viện (lodash, chai, moment ở bản cũ). Hãy dùng chúng vừa đủ để test dễ đọc, tránh biến test thành ứng dụng.",
        "Postman scripts run in a JavaScript sandbox with some bundled libraries (lodash, chai, moment in older versions). Use them just enough to keep tests readable, don't turn tests into an app.",
        "Postmanのスクリプトは、いくつかの同梱ライブラリ（lodash、chai、旧版のmoment）を持つJavaScriptサンドボックスで動きます。テストを読みやすく保つ程度に使い、テストをアプリ化しないでください。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Đối tượng pm: bản đồ các API hay dùng",
      en: "2. The pm object: a map of common APIs",
      ja: "2. pmオブジェクト: よく使うAPIの地図",
    },
    blocks: [
      P(
        "Trước khi viết logic phức tạp, cần nắm chắc các nhánh chính của đối tượng pm. Đây là API do Postman cung cấp, không nên tự bịa tên hàm. Nắm đúng những nhánh này giúp bạn viết script gọn và chạy được cả trên Newman.",
        "Before writing complex logic, get comfortable with the main branches of the pm object. This is the API Postman provides; do not invent function names. Knowing these branches well lets you write concise scripts that also run under Newman.",
        "複雑なロジックを書く前に、pmオブジェクトの主要な枝に慣れておきましょう。これはPostmanが提供するAPIであり、関数名を勝手に作らないでください。これらの枝を正しく知れば、Newmanでも動く簡潔なスクリプトが書けます。",
      ),
      CODE("javascript", `// Các nhánh pm hay dùng (tham chiếu nhanh)
pm.request                 // request sắp gửi (đọc/sửa header, url, body)
pm.response.code           // mã trạng thái, ví dụ 200
pm.response.json()         // parse body JSON
pm.response.headers.get()  // đọc header phản hồi
pm.response.responseTime   // thời gian phản hồi (ms)
pm.test(name, fn)          // khai báo một test case có tên
pm.expect(value)           // chai expect
pm.environment.set/get()   // biến environment
pm.collectionVariables.set/get()
pm.variables.get()         // đọc biến theo thứ tự phạm vi hiện hành
pm.iterationData.get()     // dữ liệu của iteration hiện tại
pm.sendRequest()           // gửi request phụ trong script (ví dụ lấy token)`),
      TIP(
        "Dùng pm.variables.get() khi chỉ cần đọc mà không quan tâm biến nằm ở phạm vi nào; Postman sẽ tìm theo thứ tự ưu tiên local → data → environment → collection → global.",
        "Use pm.variables.get() when you just need to read regardless of scope; Postman resolves in priority order local → data → environment → collection → global.",
        "スコープを気にせず読むだけなら pm.variables.get() を使います。Postmanは local → data → environment → collection → global の優先順で解決します。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Pre-request Script: sinh dữ liệu và ký request",
      en: "3. Pre-request Script: generating data and signing requests",
      ja: "3. Pre-request Script: データ生成とリクエスト署名",
    },
    blocks: [
      P(
        "Pre-request Script chạy trước khi gửi, là nơi lý tưởng để chuẩn bị dữ liệu động. Với SaaS, ta thường cần một email duy nhất cho mỗi lần tạo tài khoản, một dấu thời gian, hoặc một chữ ký HMAC cho webhook. Ta tính giá trị rồi lưu vào biến để body của request tham chiếu bằng {{...}}. Nhờ vậy mỗi lần chạy dùng dữ liệu mới, tránh lỗi trùng và phản ánh đúng cách hệ thống thật hoạt động.",
        "The Pre-request Script runs before sending, the ideal place to prepare dynamic data. For SaaS we often need a unique email per account creation, a timestamp, or an HMAC signature for a webhook. We compute the value and store it in a variable so the request body references it with {{...}}. Each run then uses fresh data, avoiding duplicate errors and reflecting how the real system behaves.",
        "Pre-request Scriptは送信前に実行され、動的データを準備する理想の場所です。SaaSでは、アカウント作成ごとに一意のメール、タイムスタンプ、またはWebhook用のHMAC署名が必要になることが多いです。値を計算して変数に保存し、リクエストボディが {{...}} で参照します。こうして各実行が新しいデータを使い、重複エラーを避け、実システムの挙動を正しく反映します。",
      ),
      CODE("javascript", `// Pre-request Script cho POST /signup
const unique = Date.now();
pm.collectionVariables.set("signupEmail", \`qa+\${unique}@tenant.io\`);
pm.collectionVariables.set("requestedAt", new Date().toISOString());

// Ký HMAC cho webhook bằng CryptoJS có sẵn trong sandbox
const secret = pm.environment.get("webhookSecret");
const payload = pm.collectionVariables.get("signupEmail");
const sig = CryptoJS.HmacSHA256(payload, secret).toString();
pm.request.headers.upsert({ key: "X-Signature", value: sig });`),
      NOTE(
        "CryptoJS được nạp sẵn trong sandbox nên có thể ký request mà không cần thư viện ngoài. Với logic tạo token phụ trợ, dùng pm.sendRequest.",
        "CryptoJS is preloaded in the sandbox, so you can sign requests without external libraries. For fetching a helper token, use pm.sendRequest.",
        "CryptoJSはサンドボックスにプリロードされているため、外部ライブラリなしでリクエストに署名できます。補助トークンの取得には pm.sendRequest を使います。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Luồng xác thực: token, refresh và pm.sendRequest",
      en: "4. Auth flows: token, refresh and pm.sendRequest",
      ja: "4. 認証フロー: トークン・リフレッシュ・pm.sendRequest",
    },
    blocks: [
      P(
        "API SaaS thường dùng OAuth2 với access token ngắn hạn. Thay vì dán token bằng tay, ta để pre-request tự lấy token nếu chưa có hoặc đã hết hạn. pm.sendRequest cho phép gửi một request phụ ngay trong script rồi xử lý phản hồi qua callback. Ta lưu access token và thời điểm hết hạn vào biến, và chỉ gọi lại khi cần. Cách này giữ collection tự chủ, chạy được trên Newman mà không cần thao tác tay.",
        "SaaS APIs commonly use OAuth2 with short-lived access tokens. Instead of pasting a token by hand, we let the pre-request fetch one when it is missing or expired. pm.sendRequest sends a helper request right inside the script and handles the response in a callback. We store the access token and its expiry in variables, and only re-fetch when needed. This keeps the collection self-sufficient and runnable under Newman without manual steps.",
        "SaaS APIは短命なアクセストークンを持つOAuth2をよく使います。トークンを手で貼る代わりに、pre-requestが欠落または失効時に自動取得します。pm.sendRequest はスクリプト内で補助リクエストを送り、応答をコールバックで処理します。アクセストークンと失効時刻を変数に保存し、必要時のみ再取得します。これによりコレクションが自己完結し、手動操作なしでNewmanで動きます。",
      ),
      CODE("javascript", `// Pre-request Script: lấy token nếu thiếu hoặc hết hạn
const now = Date.now();
const exp = Number(pm.environment.get("tokenExp") || 0);

if (!pm.environment.get("token") || now >= exp) {
  pm.sendRequest({
    url: pm.environment.get("baseUrl") + "/oauth/token",
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: { mode: "raw", raw: JSON.stringify({
      grant_type: "client_credentials",
      client_id: pm.environment.get("clientId"),
      client_secret: pm.environment.get("clientSecret")
    })}
  }, function (err, res) {
    if (err) { console.error(err); return; }
    const b = res.json();
    pm.environment.set("token", b.access_token);
    pm.environment.set("tokenExp", now + (b.expires_in - 30) * 1000);
  });
}`),
      TIP(
        "Trừ hao vài giây (ở đây 30s) khỏi expires_in để tránh dùng token vừa hết hạn giữa lúc gửi. Đây là mẹo tránh test giòn do thời điểm.",
        "Subtract a few seconds (here 30s) from expires_in to avoid using a token that expires mid-send. This avoids timing-flaky tests.",
        "expires_inから数秒（ここでは30秒）を引き、送信途中に失効したトークンを使わないようにします。タイミング由来の不安定さを避けるコツです。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Chaining: nối các request qua biến",
      en: "5. Chaining: wiring requests through variables",
      ja: "5. チェイニング: 変数でリクエストをつなぐ",
    },
    blocks: [
      P(
        "Một kịch bản SaaS điển hình: đăng nhập, tạo dự án, thêm thành viên, rồi xóa dọn. Mỗi bước sinh ra một định danh mà bước sau cần. Ta trích các định danh này trong tab Tests và lưu vào biến collection, rồi tham chiếu ở URL và body của request kế tiếp. Việc chọn đúng phạm vi biến rất quan trọng: token dùng chung nhiều môi trường nên đặt ở environment; còn projectId chỉ có ý nghĩa trong một lần chạy nên đặt ở collection variable.",
        "A typical SaaS scenario: log in, create a project, add a member, then clean up. Each step yields an identifier the next step needs. We extract these in the Tests tab and store them in collection variables, then reference them in the next request's URL and body. Choosing the right variable scope matters: a token is shared across environments so put it in environment; a projectId only makes sense within one run so put it in a collection variable.",
        "典型的なSaaSシナリオ: ログイン、プロジェクト作成、メンバー追加、そして後始末です。各ステップは次が必要とする識別子を生みます。これらをTestsタブで抽出しコレクション変数に保存し、次のリクエストのURLとボディで参照します。適切な変数スコープの選択が重要です。トークンは環境間で共有するため環境に、projectIdは1回の実行内でのみ意味を持つためコレクション変数に置きます。",
      ),
      IMG(SVG_CHAIN, "Chuỗi request: token & id truyền qua biến", "Chained requests: token and id passed via variables", "連鎖リクエスト: トークンとidを変数で受け渡し"),
      CODE("javascript", `// Tests của POST /projects — lưu id cho các bước sau
pm.test("Tạo project trả 201", function () {
  pm.response.to.have.status(201);
});
const project = pm.response.json();
pm.collectionVariables.set("projectId", project.id);

// Request kế: POST /projects/{{projectId}}/members
// body: { "email": "{{signupEmail}}", "role": "editor" }`),
      WARN(
        "Khi debug một request đơn lẻ, biến từ bước trước có thể chưa được đặt và request sẽ fail. Hãy chạy cả folder hoặc cả collection để chaining hoạt động đúng.",
        "When debugging a single request, a variable from an earlier step may be unset and the request fails. Run the whole folder or collection so chaining works correctly.",
        "単一リクエストのデバッグ時、前ステップの変数が未設定でリクエストが失敗することがあります。フォルダ全体またはコレクション全体を実行し、連鎖が正しく動くようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Kiểm định lược đồ với ajv trong pm",
      en: "6. Schema validation with ajv in pm",
      ja: "6. pm内のajvによるスキーマ検証",
    },
    blocks: [
      P(
        "Với API SaaS công khai, hợp đồng dữ liệu là lời hứa với khách hàng tích hợp. Ta khẳng định phản hồi khớp lược đồ bằng pm.response.to.have.jsonSchema, vốn dựa trên trình xác thực ajv bên trong Postman. Ta có thể định nghĩa schema tái sử dụng ở biến collection để nhiều request cùng dùng, đảm bảo mọi endpoint trả về cấu trúc nhất quán. Điều này bắt được cả trường thừa, thiếu hay sai kiểu — những thay đổi tinh vi thường lọt qua khi chỉ kiểm giá trị.",
        "For a public SaaS API, the data contract is a promise to integrating customers. We assert the response matches a schema via pm.response.to.have.jsonSchema, which relies on Postman's built-in ajv validator. We can define reusable schemas in a collection variable so many requests share them, ensuring every endpoint returns a consistent shape. This catches extra, missing or wrong-typed fields — subtle changes that slip past value-only checks.",
        "公開SaaS APIでは、データ契約は統合する顧客への約束です。pm.response.to.have.jsonSchema で応答がスキーマに一致するとアサートします。これはPostman内蔵のajvバリデーターに依拠します。再利用可能なスキーマをコレクション変数に定義し、多くのリクエストで共有でき、あらゆるエンドポイントが一貫した形を返すことを保証します。これは余分・欠落・型違いのフィールドを捕捉します。値のみの検査をすり抜ける微妙な変更です。",
      ),
      CODE("javascript", `// Tests: dùng schema đã lưu ở collection variable
const projectSchema = {
  type: "object",
  required: ["id", "name", "plan", "createdAt", "members"],
  properties: {
    id:        { type: "string" },
    name:      { type: "string" },
    plan:      { type: "string", enum: ["free", "pro", "enterprise"] },
    createdAt: { type: "string", format: "date-time" },
    members:   { type: "array", items: { type: "object", required: ["email"] } }
  },
  additionalProperties: false   // bắt lỗi trường thừa ngoài hợp đồng
};

pm.test("Project khớp lược đồ hợp đồng", function () {
  pm.expect(pm.response.json()).to.be.jsonSchema
    ? pm.expect(pm.response.json()).to.be.jsonSchema(projectSchema)
    : pm.response.to.have.jsonSchema(projectSchema);
});`),
      P(
        "Một lời khuyên khi vận hành schema trong đội đông người là đặt các định nghĩa lược đồ tái sử dụng ở một chỗ, ví dụ biến cấp collection, thay vì sao chép vào từng request. Khi hợp đồng API thay đổi, ta sửa đúng một nơi và mọi assertion tự cập nhật theo. Ngoài ra nên phân biệt rõ giữa kiểm định lược đồ và kiểm định giá trị cụ thể: schema đảm bảo hình dạng và kiểu, còn các pm.test riêng đảm bảo giá trị nghiệp vụ như số dư đúng bằng phép tính mong đợi. Kết hợp hai lớp này cho ta một mạng lưới vừa rộng vừa sâu, bắt được cả thay đổi hợp đồng lẫn lỗi tính toán.",
        "A practical tip when running schemas in a large team is to keep reusable schema definitions in one place, e.g. a collection variable, rather than copying them into each request. When the API contract changes, we edit exactly one place and all assertions update accordingly. Also clearly separate schema validation from specific value validation: the schema guarantees shape and types, while individual pm.test guarantee business values like a balance equal to the expected calculation. Combining these two layers gives a net that is both wide and deep, catching contract changes and computation bugs alike.",
        "大人数のチームでスキーマを運用する際の実践的なコツは、再利用可能なスキーマ定義を各リクエストに複製せず、コレクション変数など1か所に保つことです。API契約が変わったら、ちょうど1か所を修正すればすべてのアサーションが更新されます。また、スキーマ検証と具体的な値の検証を明確に分けます。スキーマは形と型を保証し、個別のpm.testは期待計算どおりの残高など業務上の値を保証します。この2層を組み合わせると、広くかつ深い網が得られ、契約変更と計算バグの両方を捕捉できます。",
      ),
      NOTE(
        "additionalProperties: false giúp phát hiện khi backend lỡ thêm trường không nằm trong hợp đồng — rất quan trọng với API công khai.",
        "additionalProperties: false detects when the backend accidentally adds a field outside the contract — important for public APIs.",
        "additionalProperties: false は、バックエンドが契約外のフィールドを誤って追加した場合を検出します。公開APIで重要です。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. iterationData: nguồn dữ liệu CSV và JSON",
      en: "7. iterationData: CSV and JSON data sources",
      ja: "7. iterationData: CSVとJSONのデータソース",
    },
    blocks: [
      P(
        "Kiểm thử dựa trên dữ liệu tách phần logic khỏi phần dữ liệu. Ta viết một request duy nhất tham chiếu biến, rồi cung cấp một file dữ liệu; mỗi dòng là một iteration. Postman đọc file này qua pm.iterationData. File CSV phù hợp khi dữ liệu phẳng, dòng đầu là tên cột; file JSON phù hợp khi cần cấu trúc lồng nhau, là một mảng các đối tượng. Cả hai đều dùng được trong Collection Runner và Newman với cờ -d.",
        "Data-driven testing separates logic from data. We write a single request that references variables, then supply a data file; each row is an iteration. Postman reads it via pm.iterationData. CSV fits flat data with a header row of column names; JSON fits nested structures as an array of objects. Both work in the Collection Runner and Newman with the -d flag.",
        "データ駆動テストはロジックとデータを分離します。変数を参照する単一のリクエストを書き、データファイルを供給します。各行が1イテレーションです。Postmanは pm.iterationData 経由で読みます。CSVは列名のヘッダー行を持つフラットなデータに、JSONはオブジェクト配列としてネスト構造に適します。両方ともCollection RunnerとNewmanで -d フラグで動きます。",
      ),
      CODE("json", `// data/plan-cases.json — mảng các iteration, hỗ trợ cấu trúc lồng
[
  { "plan": "free",       "seats": 1,  "expectStatus": 201, "expectErr": null },
  { "plan": "pro",        "seats": 10, "expectStatus": 201, "expectErr": null },
  { "plan": "enterprise", "seats": 0,  "expectStatus": 422, "expectErr": "SEATS_MIN" },
  { "plan": "unknown",    "seats": 5,  "expectStatus": 400, "expectErr": "PLAN_INVALID" }
]`),
      CODE("javascript", `// Tests dùng chung cho mọi iteration (ca hợp lệ và ca lỗi)
const expectStatus = Number(pm.iterationData.get("expectStatus"));
const expectErr = pm.iterationData.get("expectErr");

pm.test(\`Status = \${expectStatus} cho plan \${pm.iterationData.get("plan")}\`, function () {
  pm.expect(pm.response.code).to.eql(expectStatus);
});

if (expectErr) {
  pm.test("Trả đúng mã lỗi nghiệp vụ", function () {
    pm.expect(pm.response.json().errorCode).to.eql(expectErr);
  });
}`),
    ],
  },
  {
    heading: {
      vi: "8. Ca âm và kiểm thử lỗi",
      en: "8. Negative and error-case testing",
      ja: "8. 異常系とエラーケースのテスト",
    },
    blocks: [
      P(
        "Một bộ kiểm thử tốt không chỉ chứng minh đường hạnh phúc chạy được, mà còn chứng minh hệ thống từ chối đúng cách. Ca âm (negative case) kiểm các đầu vào sai: thiếu trường bắt buộc, vượt hạn mức gói, token hết hạn, định dạng sai. Với API SaaS, phản hồi lỗi cũng là hợp đồng: mã trạng thái đúng, mã lỗi nghiệp vụ đúng, thông điệp không lộ thông tin nhạy cảm. Ta gộp cả ca hợp lệ và ca lỗi vào cùng một file dữ liệu, dùng cột kỳ vọng để một request phủ nhiều nhánh.",
        "A good suite doesn't only prove the happy path works; it proves the system rejects correctly. Negative cases check bad inputs: missing required fields, over the plan limit, expired token, wrong format. For a SaaS API the error response is also a contract: correct status code, correct business error code, a message that leaks no sensitive info. We fold valid and error cases into one data file, using expectation columns so one request covers many branches.",
        "良いスイートはハッピーパスが動くことを示すだけでなく、システムが正しく拒否することも示します。異常系は不正な入力を検査します。必須フィールドの欠落、プラン上限超過、失効トークン、形式違いです。SaaS APIではエラー応答も契約です。正しいステータスコード、正しい業務エラーコード、機密を漏らさないメッセージです。正常ケースとエラーケースを1つのデータファイルにまとめ、期待列を使い1リクエストで多くの分岐を網羅します。",
      ),
      UL(
        ["Thiếu trường bắt buộc → mong đợi 400 và mã lỗi VALIDATION", "Vượt hạn mức gói → mong đợi 422 và mã lỗi nghiệp vụ", "Token hết hạn/không có → mong đợi 401, không lộ chi tiết", "Truy cập tenant khác → mong đợi 403 (kiểm soát phân quyền)", "Định dạng body sai → mong đợi 400, không phải 500"],
        ["Missing required field → expect 400 and a VALIDATION error code", "Over the plan limit → expect 422 and a business error code", "Expired/missing token → expect 401, no detail leak", "Accessing another tenant → expect 403 (authorization control)", "Malformed body → expect 400, not 500"],
        ["必須フィールド欠落 → 400とVALIDATIONエラーコードを期待", "プラン上限超過 → 422と業務エラーコードを期待", "失効/欠落トークン → 401、詳細漏洩なしを期待", "別テナントへのアクセス → 403（認可制御）を期待", "不正な形式のボディ → 500ではなく400を期待"],
      ),
      P(
        "Một cách tư duy hữu ích là với mỗi endpoint, ngoài ca hạnh phúc, hãy tự hỏi hệ thống nên phản ứng thế nào khi người dùng làm sai, khi kẻ xấu cố tình lách, và khi hạ tầng gặp trục trặc. Ba nhóm câu hỏi đó dẫn tới các ca âm về xác thực, phân quyền và ràng buộc nghiệp vụ. Trong SaaS đa người thuê, nhóm phân quyền đặc biệt quan trọng: một tenant tuyệt đối không được đọc hay sửa dữ liệu của tenant khác. Ta viết hẳn một ca cố tình dùng token của tenant A để gọi tài nguyên của tenant B và khẳng định phải nhận 403. Bỏ sót nhóm ca này là bỏ ngỏ một lỗ hổng bảo mật nghiêm trọng mà đường hạnh phúc không bao giờ chạm tới.",
        "A useful way to think is: for each endpoint, beyond the happy path, ask how the system should react when a user makes a mistake, when a bad actor tries to bypass, and when the infrastructure hiccups. Those three question groups lead to negative cases about authentication, authorization and business constraints. In multi-tenant SaaS, the authorization group matters especially: one tenant must never read or edit another tenant's data. We write an explicit case that deliberately uses tenant A's token to call tenant B's resource and assert a 403. Skipping this group leaves open a serious security hole that the happy path never touches.",
        "有用な考え方は、各エンドポイントについてハッピーパス以外に、ユーザーが誤操作したとき、悪意ある者が回避を試みたとき、インフラが不調のとき、システムがどう反応すべきかを問うことです。この3つの問いのグループが、認証・認可・業務制約に関する異常系へ導きます。マルチテナントSaaSでは認可グループが特に重要です。あるテナントが他テナントのデータを読んだり編集したりしては絶対にいけません。テナントAのトークンでテナントBのリソースを意図的に呼ぶケースを明示的に書き、403を期待するとアサートします。このグループを省くと、ハッピーパスが決して触れない深刻なセキュリティホールを残します。",
      ),
      WARN(
        "Nếu đầu vào sai trả về 500 thay vì 4xx, đó là lỗi thật: server đang crash chứ không từ chối lịch sự. Ca âm chính là để bắt điều này.",
        "If bad input returns 500 instead of 4xx, that's a real bug: the server is crashing, not rejecting gracefully. Negative cases exist to catch this.",
        "不正な入力が4xxではなく500を返すなら、それは本当のバグです。サーバーは丁寧に拒否せずクラッシュしています。異常系はこれを捕捉するためにあります。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Chạy data-driven trên Newman",
      en: "9. Running data-driven on Newman",
      ja: "9. Newmanでデータ駆動を実行",
    },
    blocks: [
      P(
        "Mọi thứ đã dựng trong Postman đều chạy được headless bằng Newman với cùng file dữ liệu. Cờ -d nạp CSV hoặc JSON, cờ -n đặt số vòng lặp nếu muốn lặp thêm, và report tổng hợp kết quả theo từng iteration. Vì mỗi dòng có cột kỳ vọng riêng, một lần chạy phủ cả ca hợp lệ lẫn ca lỗi. Đây là cách biến một request thành hàng chục ca kiểm thử tự động, sẵn sàng cho tích hợp liên tục.",
        "Everything built in Postman runs headless in Newman with the same data file. The -d flag loads CSV or JSON, the -n flag sets iteration count if you want extra loops, and the report aggregates results per iteration. Because each row carries its own expectation columns, one run covers both valid and error cases. This turns one request into dozens of automated cases, ready for continuous integration.",
        "Postmanで作ったすべては、同じデータファイルでNewmanでもヘッドレスに動きます。-d フラグがCSVまたはJSONを読み込み、-n フラグは追加ループが欲しい場合のイテレーション数を設定し、レポートがイテレーションごとに結果を集計します。各行が独自の期待列を持つため、1回の実行で正常ケースとエラーケースの両方を網羅します。これは1リクエストを数十の自動ケースに変え、継続的インテグレーションに備えます。",
      ),
      CODE("bash", `# Data-driven với file JSON, xuất report htmlextra
npx newman run collections/projects.postman_collection.json \\
  -e environments/saas-staging.postman_environment.json \\
  -d data/plan-cases.json \\
  --reporters cli,htmlextra \\
  --reporter-htmlextra-export reports/plans.html

# Lặp lại tập dữ liệu 3 lần (ví dụ để soi độ ổn định)
npx newman run collections/projects.postman_collection.json \\
  -e environments/saas-staging.postman_environment.json \\
  -d data/plan-cases.json -n 3`),
      P(
        "Khi số iteration lớn, cách bạn đặt tên test quyết định report có đọc được hay không. Nếu mọi iteration đều tạo ra test cùng tên, báo cáo Newman sẽ hiện một danh sách dài lặp lại mà không biết dòng nào ứng với dữ liệu nào. Bằng cách nội suy giá trị của iteration vào tên test, mỗi dòng trở nên tự mô tả, và khi một ca fail bạn nhận ra ngay đó là plan nào, seat bao nhiêu. Đây là chi tiết nhỏ nhưng tạo khác biệt lớn khi phải phân tích một lần chạy CI có hàng trăm assertion. Ngoài ra, hãy giữ file dữ liệu ở trong Git cùng collection để thay đổi ca kiểm thử được review như thay đổi mã nguồn.",
        "When iterations are many, how you name tests decides whether the report is readable. If every iteration produces a same-named test, the Newman report shows a long repeating list with no clue which row maps to which data. By interpolating iteration values into the test name, each row becomes self-describing, and when a case fails you immediately see which plan, how many seats. It is a small detail that makes a big difference when analyzing a CI run with hundreds of assertions. Also keep the data file in Git alongside the collection so test-case changes get reviewed like source changes.",
        "イテレーションが多いとき、テストの命名がレポートの読みやすさを決めます。全イテレーションが同名テストを生むと、Newmanレポートはどの行がどのデータに対応するか手がかりのない長い繰り返しリストになります。イテレーションの値をテスト名に補間すれば各行が自己記述的になり、ケースが失敗したときどのプラン・何席かが即座に分かります。数百のアサーションを持つCI実行を分析するとき大きな違いを生む小さな細部です。また、データファイルをコレクションとともにGitに置き、テストケースの変更をソース変更のようにレビューさせましょう。",
      ),
      TIP(
        "Đặt tên test có nội suy biến (như \`Status = ${expected} cho plan ${plan}\`) để report Newman phân biệt rõ từng iteration thay vì thấy nhiều dòng trùng tên.",
        "Name tests with interpolation (like `Status = ${expected} for plan ${plan}`) so the Newman report distinguishes each iteration instead of showing many same-named rows.",
        "テスト名に変数を補間（例: `Status = ${expected} for plan ${plan}`）すると、Newmanレポートが各イテレーションを区別でき、同名の行が並ぶのを防げます。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Tổ chức và tái sử dụng script",
      en: "10. Organizing and reusing scripts",
      ja: "10. スクリプトの整理と再利用",
    },
    blocks: [
      P(
        "Khi bộ kiểm thử lớn lên, việc lặp lại logic ở nhiều request trở thành gánh nặng. Postman cho phép đặt script ở cấp folder và cấp collection: script tại đó chạy trước hoặc sau mọi request bên trong, phù hợp cho việc lấy token hay khẳng định chung như thời gian phản hồi. Ngoài ra có thể lưu hàm dùng chung vào một biến rồi eval lại, nhưng nên hạn chế để test dễ đọc. Nguyên tắc là giữ mỗi request tập trung vào ca nghiệp vụ, đẩy phần chung lên cấp cao hơn.",
        "As the suite grows, repeating logic across requests becomes a burden. Postman lets you put scripts at folder and collection level: those run before or after every request inside, ideal for token fetching or shared assertions like response time. You can also store shared helpers in a variable and re-eval them, but keep this minimal for readability. The principle: keep each request focused on its business case and push common parts to a higher level.",
        "スイートが大きくなると、リクエスト間でロジックを繰り返すのが負担になります。Postmanはフォルダレベルとコレクションレベルにスクリプトを置けます。それらは内部の全リクエストの前後で実行され、トークン取得や応答時間などの共通アサーションに理想的です。共有ヘルパーを変数に保存して再evalすることもできますが、可読性のため最小限に。原則は、各リクエストを業務ケースに集中させ、共通部分を上位に押し上げることです。",
      ),
      CODE("javascript", `// Collection-level Tests (áp cho mọi request): khẳng định chung
pm.test("Không có lỗi server (5xx)", function () {
  pm.expect(pm.response.code).to.be.below(500);
});
pm.test("Có header X-Request-Id để truy vết", function () {
  pm.expect(pm.response.headers.has("X-Request-Id")).to.be.true;
});`),
      NOTE(
        "Script cấp collection/folder chạy cho mọi request con, kể cả trên Newman. Dùng cho các bất biến chung (không 5xx, có request-id), còn assertion đặc thù thì để ở từng request.",
        "Collection/folder-level scripts run for every child request, including on Newman. Use them for shared invariants (no 5xx, has request-id); keep specific assertions on each request.",
        "コレクション/フォルダレベルのスクリプトは、Newman上でも含め全子リクエストで実行されます。共通の不変条件（5xxなし、request-idあり）に使い、固有のアサーションは各リクエストに置きます。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Cạm bẫy khi scripting và data-driven",
      en: "11. Pitfalls in scripting and data-driven",
      ja: "11. スクリプティングとデータ駆動の落とし穴",
    },
    blocks: [
      P(
        "Script mạnh nhưng cũng dễ tạo ra bộ kiểm thử khó bảo trì hoặc cho kết quả sai lệch. Dưới đây là các bẫy hay gặp khi lập trình Postman và chạy data-driven, kèm cách phòng tránh để bộ kiểm thử vừa mạnh vừa đáng tin.",
        "Scripts are powerful but can also create a suite that is hard to maintain or gives misleading results. Below are common traps when programming Postman and running data-driven, with how to avoid them so the suite stays both powerful and trustworthy.",
        "スクリプトは強力ですが、保守しにくい、または誤解を招く結果を出すスイートを作りやすくもあります。以下はPostmanをプログラムしデータ駆動を実行する際のよくある罠と、スイートを強力かつ信頼できるものに保つ回避策です。",
      ),
      UL(
        ["Test không có khẳng định: pm.test rỗng luôn xanh, không kiểm gì cả", "So sánh sai kiểu: pm.iterationData trả chuỗi, quên Number() nên 200 !== \"200\"", "Ca lỗi mà khẳng định như ca hợp lệ: dùng cột kỳ vọng để phân nhánh", "Phụ thuộc thứ tự nhưng chạy đơn lẻ: biến chaining chưa được đặt", "Script quá thông minh: nhiều logic phức tạp khiến test khó đọc và giòn"],
        ["Assertion-free tests: an empty pm.test always passes and checks nothing", "Wrong-type compare: pm.iterationData returns strings; forgetting Number() makes 200 !== \"200\"", "Asserting error cases like happy paths: use expectation columns to branch", "Order-dependent but run alone: chaining variables are unset", "Over-clever scripts: heavy logic makes tests hard to read and brittle"],
        ["アサーションのないテスト: 空のpm.testは常に通過し何も検査しない", "型違いの比較: pm.iterationDataは文字列を返す。Number()を忘れると 200 !== \"200\"", "エラーケースを正常系のようにアサート: 期待列で分岐する", "順序依存なのに単独実行: 連鎖変数が未設定", "賢すぎるスクリプト: 重いロジックがテストを読みにくく脆くする"],
      ),
      TIP(
        "Luôn ép kiểu dữ liệu từ file với Number() hay JSON.parse() vì mọi giá trị trong CSV đều là chuỗi. Đây là nguồn lỗi im lặng phổ biến nhất của data-driven.",
        "Always coerce data-file values with Number() or JSON.parse() since everything in CSV is a string. This is the most common silent bug in data-driven runs.",
        "CSVの値はすべて文字列なので、Number()やJSON.parse()で必ず型変換します。これはデータ駆動実行で最も多い静かなバグです。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Kịch bản thực chiến: kiểm thử hạn mức gói SaaS",
      en: "12. Real scenario: testing SaaS plan limits",
      ja: "12. 実戦シナリオ: SaaSプラン上限のテスト",
    },
    blocks: [
      SCEN(
        "Một file dữ liệu thay cho hai mươi request",
        "One data file replacing twenty requests",
        "Nền tảng SaaS cần kiểm API tạo dự án tuân đúng hạn mức của từng gói: free tối đa 3 dự án, pro 50, enterprise không giới hạn; số ghế (seat) cũng theo gói. Trước đây đội QA có gần hai mươi request lặp gần giống nhau, sửa một quy tắc là phải chỉnh khắp nơi. Đội tái cấu trúc thành một request POST /projects duy nhất dùng biến, cộng một file plan-cases.json chứa cả ca hợp lệ và ca lỗi với cột expectStatus, expectErr. Tab Tests phân nhánh theo cột kỳ vọng và kiểm định lược đồ. Chạy bằng Newman với -d, một lần chạy phủ hai mươi ca; khi backend đổi hạn mức, chỉ cần sửa file dữ liệu.",
        "The SaaS platform needs to verify the project-creation API respects each plan's limits: free up to 3 projects, pro 50, enterprise unlimited; seats also vary by plan. The QA team had nearly twenty near-identical requests, so one rule change meant edits everywhere. They refactored into a single POST /projects using variables, plus a plan-cases.json holding valid and error cases with expectStatus and expectErr columns. The Tests tab branches on expectation columns and validates the schema. Run with Newman and -d, one run covers twenty cases; when the backend changes a limit, only the data file is edited.",
        "20リクエストに代わる1つのデータファイル",
        "SaaSプラットフォームは、プロジェクト作成APIが各プランの上限を守るか検証する必要があります。freeは最大3プロジェクト、proは50、enterpriseは無制限。席数もプランで異なります。以前QAチームはほぼ同一の20近いリクエストを持ち、1つのルール変更であちこち修正が必要でした。変数を使う単一の POST /projects と、expectStatus・expectErr列で正常ケースとエラーケースを保持する plan-cases.json に再構成しました。Testsタブは期待列で分岐しスキーマを検証します。Newmanと -d で実行し、1回で20ケースを網羅。バックエンドが上限を変えても、データファイルだけ修正します。",
      ),
      P(
        "Bài học: tách logic khỏi dữ liệu giúp bộ kiểm thử co giãn theo nghiệp vụ. Thêm một quy tắc gói mới chỉ là thêm một dòng trong file dữ liệu, không phải sao chép request.",
        "Lesson: separating logic from data makes the suite scale with the business. Adding a new plan rule is just one more row in the data file, not another copied request.",
        "教訓: ロジックとデータの分離はスイートを業務に合わせて伸縮させます。新しいプランルールの追加は、リクエストの複製ではなくデータファイルの1行追加だけです。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Câu hỏi phỏng vấn thường gặp",
      en: "13. Common interview questions",
      ja: "13. よくある面接質問",
    },
    blocks: [
      QA(
        "Khác nhau giữa pm.variables, pm.environment và pm.collectionVariables?",
        "What is the difference between pm.variables, pm.environment and pm.collectionVariables?",
        "pm.environment và pm.collectionVariables đặt/đọc biến ở đúng phạm vi environment hoặc collection và tồn tại qua nhiều request. pm.variables.get() chỉ để đọc, tự tìm giá trị theo thứ tự ưu tiên phạm vi (local → data → environment → collection → global). Dùng environment cho token dùng chung nhiều môi trường, collection variable cho định danh chỉ có nghĩa trong một lần chạy như projectId.",
        "pm.environment and pm.collectionVariables set/read variables at exactly the environment or collection scope and persist across requests. pm.variables.get() is read-only and resolves by scope priority (local → data → environment → collection → global). Use environment for tokens shared across environments, collection variables for run-scoped ids like projectId.",
        "pm.variables・pm.environment・pm.collectionVariablesの違いは？",
        "pm.environment と pm.collectionVariables はまさに環境またはコレクションスコープで変数を設定/読み取り、複数リクエストにまたがり保持します。pm.variables.get() は読み取り専用で、スコープ優先順（local → data → environment → collection → global）で解決します。環境間で共有するトークンには環境を、projectIdのような実行スコープのidにはコレクション変数を使います。",
      ),
      QA(
        "Data-driven testing trong Postman hoạt động thế nào?",
        "How does data-driven testing work in Postman?",
        "Ta viết một request tham chiếu biến bằng {{...}} rồi cung cấp một file CSV hoặc JSON. Mỗi dòng (CSV) hay mỗi phần tử mảng (JSON) là một iteration; Postman đọc qua pm.iterationData.get(). Trong Collection Runner chọn file dữ liệu, còn trên Newman dùng cờ -d. Cùng một assertion áp cho mọi dòng; nếu file có cột kỳ vọng thì một request có thể phủ cả ca hợp lệ lẫn ca lỗi.",
        "We write a request referencing variables with {{...}} and supply a CSV or JSON file. Each CSV row or JSON array element is an iteration; Postman reads it via pm.iterationData.get(). The Collection Runner picks a data file, Newman uses the -d flag. The same assertions apply to every row; with expectation columns one request can cover both valid and error cases.",
        "Postmanのデータ駆動テストはどう動くのか？",
        "{{...}} で変数を参照するリクエストを書き、CSVまたはJSONファイルを供給します。CSVの各行、JSONの各配列要素が1イテレーションで、Postmanは pm.iterationData.get() で読みます。Collection Runnerはデータファイルを選び、Newmanは -d フラグを使います。同じアサーションが全行に適用され、期待列があれば1リクエストで正常ケースとエラーケースの両方を網羅できます。",
      ),
      QA(
        "Làm sao lấy token động ngay trong Postman mà không dán tay?",
        "How do you fetch a token dynamically inside Postman without pasting it?",
        "Dùng pm.sendRequest trong Pre-request Script để gọi endpoint token, xử lý phản hồi trong callback rồi lưu access_token và thời điểm hết hạn vào biến environment. Kiểm tra token còn hạn trước khi gọi lại để tránh lấy token thừa. Nên trừ hao vài giây khỏi expires_in để tránh dùng token vừa hết hạn. Cách này giúp collection tự chủ, chạy được trên Newman.",
        "Use pm.sendRequest in a Pre-request Script to call the token endpoint, handle the response in a callback, and store the access_token and expiry in an environment variable. Check token validity before re-fetching to avoid extra calls. Subtract a few seconds from expires_in to avoid using a just-expired token. This keeps the collection self-sufficient and Newman-runnable.",
        "手で貼らずPostman内でトークンを動的取得するには？",
        "Pre-request Scriptで pm.sendRequest を使いトークンエンドポイントを呼び、応答をコールバックで処理し、access_tokenと失効時刻を環境変数に保存します。再取得前にトークンの有効性を確認し余分な呼び出しを避けます。expires_inから数秒引き、失効直後のトークン使用を避けます。これでコレクションが自己完結しNewmanで実行できます。",
      ),
      QA(
        "Vì sao ca âm quan trọng và cần kiểm gì?",
        "Why do negative cases matter and what should they check?",
        "Ca âm chứng minh hệ thống từ chối đúng cách, không chỉ đường hạnh phúc. Cần kiểm mã trạng thái đúng (400/401/403/422 thay vì 500), mã lỗi nghiệp vụ đúng, và thông điệp không lộ thông tin nhạy cảm. Đầu vào sai trả 500 là lỗi thật vì server crash thay vì từ chối lịch sự. Gộp ca âm và ca dương vào cùng file dữ liệu, phân nhánh bằng cột kỳ vọng.",
        "Negative cases prove the system rejects correctly, not just the happy path. They should check the correct status code (400/401/403/422 instead of 500), the correct business error code, and messages that leak no sensitive info. Bad input returning 500 is a real bug because the server crashes instead of rejecting gracefully. Fold negative and positive cases into one data file, branching on expectation columns.",
        "なぜ異常系が重要で何を検査すべきか？",
        "異常系はシステムがハッピーパスだけでなく正しく拒否することを示します。正しいステータスコード（500ではなく400/401/403/422）、正しい業務エラーコード、機密を漏らさないメッセージを検査すべきです。不正な入力が500を返すのは、サーバーが丁寧に拒否せずクラッシュするため本当のバグです。異常系と正常系を1つのデータファイルにまとめ、期待列で分岐します。",
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết và checklist",
      en: "14. Summary and checklist",
      ja: "14. まとめとチェックリスト",
    },
    blocks: [
      P(
        "Chúng ta đã khai thác sâu khả năng lập trình của Postman: chuẩn bị dữ liệu động trong pre-request, lấy token bằng pm.sendRequest, nối các bước qua biến với đúng phạm vi, kiểm định lược đồ bằng ajv, và kiểm thử dựa trên dữ liệu phủ cả ca hợp lệ lẫn ca lỗi. Điểm cốt lõi là tách logic khỏi dữ liệu và giữ script vừa đủ thông minh. Làm đúng, một request duy nhất trở thành hàng chục ca kiểm thử có thể chạy headless bằng Newman và gắn vào tích hợp liên tục.",
        "We have exploited Postman's programmability in depth: preparing dynamic data in pre-request, fetching tokens with pm.sendRequest, chaining steps through correctly-scoped variables, validating schemas with ajv, and data-driven testing across valid and error cases. The core is separating logic from data and keeping scripts just clever enough. Done right, a single request becomes dozens of cases runnable headless by Newman and wired into continuous integration.",
        "Postmanのプログラマビリティを深く活用しました。pre-requestでの動的データ準備、pm.sendRequestでのトークン取得、適切なスコープの変数によるステップ連鎖、ajvによるスキーマ検証、正常ケースとエラーケースにまたがるデータ駆動テストです。核心はロジックとデータの分離と、スクリプトを賢すぎない程度に保つことです。正しく行えば、単一のリクエストが数十のケースになり、Newmanでヘッドレスに実行し継続的インテグレーションに組み込めます。",
      ),
      UL(
        ["Mỗi pm.test có khẳng định thật, không để test rỗng", "Dùng đúng phạm vi biến: environment cho token, collection cho id một lần chạy", "Lấy token bằng pm.sendRequest, trừ hao thời gian hết hạn", "Kiểm định lược đồ với required/enum/additionalProperties", "Tách logic khỏi dữ liệu bằng file CSV/JSON và pm.iterationData", "Ép kiểu dữ liệu file với Number()/JSON.parse()", "Phủ ca âm: 4xx đúng, mã lỗi đúng, không lộ thông tin", "Chạy headless bằng Newman -d, đặt tên test nội suy biến"],
        ["Every pm.test has a real assertion, no empty tests", "Use the right variable scope: environment for tokens, collection for run-scoped ids", "Fetch tokens with pm.sendRequest, subtract expiry buffer", "Validate schemas with required/enum/additionalProperties", "Separate logic from data via CSV/JSON files and pm.iterationData", "Coerce data-file values with Number()/JSON.parse()", "Cover negative cases: correct 4xx, correct error code, no leaks", "Run headless with Newman -d, name tests with interpolation"],
        ["各pm.testに本物のアサーション、空のテストを作らない", "正しい変数スコープ: トークンは環境、実行スコープidはコレクション", "pm.sendRequestでトークン取得、失効バッファを差し引く", "required/enum/additionalPropertiesでスキーマ検証", "CSV/JSONファイルとpm.iterationDataでロジックとデータを分離", "データファイルの値をNumber()/JSON.parse()で型変換", "異常系を網羅: 正しい4xx、正しいエラーコード、漏洩なし", "Newman -dでヘッドレス実行、テスト名に変数を補間"],
      ),
      TIP(
        "Xem file dữ liệu là tài liệu sống về hành vi API: mỗi dòng là một quy tắc nghiệp vụ được kiểm chứng tự động. Giữ nó gọn và có ý nghĩa.",
        "Treat the data file as living documentation of API behavior: each row is a business rule verified automatically. Keep it lean and meaningful.",
        "データファイルをAPI挙動の生きたドキュメントとして扱いましょう。各行は自動検証される業務ルールです。簡潔で意味あるものに保ちます。",
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
    slug: "at-postman-newman-ci",
    cover: makeThumb({ id: "atpm1", domain: "banking", kind: "congnghe", label: "POSTMAN · NEWMAN" }),
    tags: tags("congnghe", "postman", "api", "cicd", "realworld"),
    title: {
      vi: "Từ test API thủ công đến chạy collection tự động trong CI với Newman",
      en: "From manual API testing to automated collection runs in CI with Newman",
      ja: "手動APIテストからNewmanによるCIでの自動コレクション実行へ",
    },
    summary: {
      vi: "Hành trình ngân hàng số: cấu trúc collection và environment, viết test script pm.*, kiểm định lược đồ JSON, chạy Newman với reporter và gác cửa merge trong pipeline CI.",
      en: "A digital-banking journey: collection and environment structure, pm.* test scripts, JSON schema validation, running Newman with reporters, and gating merges in a CI pipeline.",
      ja: "デジタルバンキングの旅: コレクションと環境の構造、pm.*テストスクリプト、JSONスキーマ検証、レポーター付きNewman実行、CIパイプラインでのマージゲート化。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-postman-data-driven-scripting",
    cover: makeThumb({ id: "atpm2", domain: "saas", kind: "congnghe", label: "PM SCRIPTING · DATA" }),
    tags: tags("congnghe", "postman", "api", "datadriven"),
    title: {
      vi: "Scripting nâng cao & kiểm thử dựa trên dữ liệu trong Postman",
      en: "Advanced scripting and data-driven testing in Postman",
      ja: "Postmanでの高度なスクリプティングとデータ駆動テスト",
    },
    summary: {
      vi: "Đi sâu vào đối tượng pm: sinh dữ liệu trong pre-request, lấy token bằng pm.sendRequest, chaining qua biến, kiểm định lược đồ ajv, iterationData CSV/JSON và ca âm cho nền tảng SaaS.",
      en: "A deep dive into the pm object: generating data in pre-request, fetching tokens with pm.sendRequest, chaining via variables, ajv schema validation, CSV/JSON iterationData and negative cases for a SaaS platform.",
      ja: "pmオブジェクトの深掘り: pre-requestでのデータ生成、pm.sendRequestでのトークン取得、変数による連鎖、ajvスキーマ検証、CSV/JSONのiterationData、SaaSプラットフォーム向けの異常系。",
    },
    pages: buildDoc(pages2),
  },
];
