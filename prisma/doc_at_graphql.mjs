import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

/* =========================================================================
   ARTICLE 1 — at-graphql-query-mutation-testing (congnghe · ecommerce)
   Testing GraphQL queries & mutations: how it differs from REST, asserting
   data + errors, variables, auth, negative cases, tooling.
   ========================================================================= */

const svgEndpoint = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="24" y="34" fill="#7dd3fc" font-size="15" font-weight="800">REST vs GraphQL — cách gọi khác nhau</text>
<rect x="24" y="52" width="300" height="140" rx="10" fill="#111827" stroke="#334155"/>
<text x="40" y="76" fill="#f1f5f9" font-size="12" font-weight="700">REST — nhiều endpoint</text>
<text x="40" y="100" fill="#94a3b8" font-size="11">GET /products/42</text>
<text x="40" y="120" fill="#94a3b8" font-size="11">GET /products/42/reviews</text>
<text x="40" y="140" fill="#94a3b8" font-size="11">GET /users/7/cart</text>
<text x="40" y="168" fill="#f87171" font-size="11">4xx/5xx = lỗi</text>
<rect x="396" y="52" width="300" height="140" rx="10" fill="#111827" stroke="#334155"/>
<text x="412" y="76" fill="#f1f5f9" font-size="12" font-weight="700">GraphQL — 1 endpoint</text>
<text x="412" y="100" fill="#a7f3d0" font-size="11">POST /graphql</text>
<text x="412" y="120" fill="#94a3b8" font-size="11">query { product reviews cart }</text>
<text x="412" y="140" fill="#94a3b8" font-size="11">1 request → đúng dữ liệu cần</text>
<text x="412" y="168" fill="#fbbf24" font-size="11">HTTP 200 kể cả khi có errors</text>
<path d="M330 122 L390 122" stroke="#7dd3fc" stroke-width="2" marker-end="url(#a1)"/>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs>
</svg>`;

const svgEnvelope = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="24" y="32" fill="#7dd3fc" font-size="15" font-weight="800">Hình dạng response GraphQL — { data, errors }</text>
<rect x="24" y="48" width="672" height="150" rx="10" fill="#0b1220" stroke="#334155"/>
<text x="44" y="76" fill="#a7f3d0" font-size="12" font-family="monospace">{</text>
<text x="64" y="98" fill="#93c5fd" font-size="12" font-family="monospace">"data": { "product": { "id": "42", "price": null } },</text>
<text x="64" y="122" fill="#fbbf24" font-size="12" font-family="monospace">"errors": [</text>
<text x="84" y="144" fill="#f1f5f9" font-size="12" font-family="monospace">{ "message": "...", "path": ["product","price"],</text>
<text x="104" y="164" fill="#f1f5f9" font-size="12" font-family="monospace">"extensions": { "code": "FORBIDDEN" } }</text>
<text x="64" y="184" fill="#fbbf24" font-size="12" font-family="monospace">]</text>
<text x="470" y="184" fill="#f87171" font-size="11" font-weight="700">data + errors CÙNG TỒN TẠI ⇒ partial data</text>
</svg>`;

const a1_pages = [
  {
    heading: {
      vi: "1. GraphQL là gì dưới góc nhìn Tester",
      en: "1. What GraphQL is from a Tester's view",
      ja: "1. テスター視点で見るGraphQLとは",
    },
    blocks: [
      P(
        "GraphQL là một ngôn ngữ truy vấn cho API và một lớp runtime thực thi truy vấn đó dựa trên một schema định kiểu mạnh. Thay vì nhiều endpoint như REST, một dịch vụ GraphQL thường phơi ra một endpoint duy nhất (ví dụ POST /graphql), và client mô tả chính xác dữ liệu mình cần qua một câu query. Với người kiểm thử, điều quan trọng cần nắm ngay từ đầu là: hợp đồng giữa client và server không nằm ở đường dẫn URL mà nằm ở schema. Schema định nghĩa các kiểu (types), các trường (fields), các thao tác gốc (Query, Mutation, Subscription) và tính nullable của từng trường. Hiểu schema chính là hiểu bề mặt kiểm thử.",
        "GraphQL is a query language for APIs and a runtime that executes those queries against a strongly typed schema. Instead of many endpoints like REST, a GraphQL service usually exposes a single endpoint (for example POST /graphql), and the client describes exactly the data it needs through a query. For a tester, the key thing to grasp early is this: the contract between client and server does not live in the URL path, it lives in the schema. The schema defines types, fields, root operations (Query, Mutation, Subscription) and the nullability of each field. Understanding the schema is understanding the test surface.",
        "GraphQLはAPIのためのクエリ言語であり、強く型付けされたスキーマに対してクエリを実行するランタイムです。RESTのように多数のエンドポイントを持つのではなく、GraphQLサービスは通常、単一のエンドポイント（例えばPOST /graphql）を公開し、クライアントはクエリを通じて必要なデータを正確に記述します。テスターにとって最初に理解すべき重要な点は、クライアントとサーバー間の契約はURLパスではなくスキーマに存在するということです。スキーマは型システム、フィールド、ルート操作（Query、Mutation、Subscription）、そして各フィールドのnull許容性を定義します。スキーマを理解することはテスト対象の全体像を理解することです。",
      ),
      P(
        "Trong bài này chúng ta lấy bối cảnh một hệ thống thương mại điện tử: khách hàng xem sản phẩm, đọc đánh giá, thêm vào giỏ và đặt hàng. Cùng một nghiệp vụ đó, nếu viết bằng REST sẽ cần nhiều lời gọi; còn với GraphQL, client có thể gom về một câu query duy nhất. Sự khác biệt này thay đổi cách bạn thiết kế test: bạn không còn kiểm từng endpoint rời rạc mà kiểm các thao tác (operations) và cách chúng hợp thành dữ liệu trả về. Từ đó, chiến lược kiểm thử của Tester phải xoay quanh việc khẳng định đúng dữ liệu, đúng lỗi và đúng kiểu.",
        "In this article we use an e-commerce context: a customer views products, reads reviews, adds to cart and places an order. The same business flow in REST needs many calls; with GraphQL the client can fold it into a single query. This difference changes how you design tests: you no longer probe isolated endpoints but rather operations and how they compose the returned data. Consequently the tester's strategy must revolve around asserting the right data, the right errors and the right types.",
        "本記事ではECサイトを題材にします。顧客が商品を閲覧し、レビューを読み、カートに追加し、注文を行うという流れです。同じ業務フローをRESTで書くと多くの呼び出しが必要ですが、GraphQLではクライアントが1つのクエリにまとめられます。この違いはテスト設計の方法を変えます。もはや個別のエンドポイントを調べるのではなく、操作とそれがどのように返却データを構成するかを検証します。したがってテスターの戦略は、正しいデータ、正しいエラー、正しい型を検証することを中心に据える必要があります。",
      ),
      NOTE(
        "Ba thao tác gốc: Query (đọc dữ liệu), Mutation (ghi/thay đổi dữ liệu), Subscription (nhận dữ liệu theo thời gian thực qua WebSocket). Bài này tập trung vào Query và Mutation vì đó là phần Tester chạm tới nhiều nhất.",
        "Three root operations: Query (read data), Mutation (write/change data), Subscription (receive real-time data over WebSocket). This article focuses on Query and Mutation since those are what testers touch most.",
        "3つのルート操作があります。Query（データ読み取り）、Mutation（データの書き込み・変更）、Subscription（WebSocket経由のリアルタイムデータ受信）です。本記事はテスターが最も多く触れるQueryとMutationに焦点を当てます。",
      ),
      IMG(svgEndpoint, "REST nhiều endpoint vs GraphQL một endpoint", "REST many endpoints vs GraphQL single endpoint", "RESTの複数エンドポイントとGraphQLの単一エンドポイント"),
    ],
  },
  {
    heading: {
      vi: "2. GraphQL khác REST ở đâu — dưới lăng kính kiểm thử",
      en: "2. Where GraphQL differs from REST — through a testing lens",
      ja: "2. GraphQLがRESTと異なる点 — テストの観点から",
    },
    blocks: [
      P(
        "Điểm khác biệt gây bất ngờ nhất cho Tester đến từ REST là mã trạng thái HTTP. Trong REST, ta quen dùng status code làm oracle: 200 là thành công, 404 là không tìm thấy, 400 là dữ liệu sai, 401/403 là vấn đề xác thực/ủy quyền. Trong GraphQL, phần lớn triển khai trả về HTTP 200 cho gần như mọi request được parse thành công, kể cả khi bên trong có lỗi nghiệp vụ hay lỗi phân quyền. Lý do là lỗi ở GraphQL được biểu diễn trong thân response ở mảng errors, chứ không phải ở tầng giao vận HTTP. Đây là cái bẫy số một khiến test giả xanh (false green): bạn assert status 200 và tưởng mọi thứ ổn, trong khi errors chứa đầy lỗi.",
        "The most surprising difference for a tester coming from REST is the HTTP status code. In REST we habitually use the status code as an oracle: 200 means success, 404 not found, 400 bad input, 401/403 an auth problem. In GraphQL most implementations return HTTP 200 for nearly any request that parses successfully, even when there is a business error or an authorization failure inside. The reason is that GraphQL errors are represented in the response body inside an errors array, not at the HTTP transport layer. This is the number one trap that produces false-green tests: you assert status 200 and assume all is well, while errors is full of failures.",
        "RESTから来たテスターにとって最も驚くべき違いはHTTPステータスコードです。RESTでは習慣的にステータスコードをオラクルとして使います。200は成功、404は未検出、400は不正な入力、401/403は認証・認可の問題です。GraphQLではほとんどの実装が、正常にパースできたほぼすべてのリクエストに対してHTTP 200を返します。内部に業務エラーや認可失敗があってもです。理由は、GraphQLのエラーはHTTPトランスポート層ではなく、レスポンス本文のerrors配列で表現されるからです。これがfalse-greenテストを生む最大の落とし穴です。ステータス200を検証してすべて正常だと思い込む一方で、errorsは失敗で埋め尽くされているのです。",
      ),
      CODE("graphql", `# Một operation GraphQL luôn gửi qua POST tới một endpoint duy nhất.
# Client chọn CHÍNH XÁC các field muốn lấy (over-fetch/under-fetch được kiểm soát).
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    title
    price
    reviews(first: 3) {
      rating
      body
    }
  }
}`),
      CODE("json", `// Payload HTTP thực gửi đi: query + variables (+ operationName nếu có nhiều op)
// POST /graphql   Content-Type: application/json
{
  "query": "query GetProduct($id: ID!){ product(id:$id){ id title price } }",
  "operationName": "GetProduct",
  "variables": { "id": "42" }
}`),
      UL(
        [
          "Một endpoint duy nhất — không assert theo URL path mà theo tên operation và cấu trúc dữ liệu.",
          "HTTP 200 cho cả thành công lẫn lỗi nghiệp vụ — status code KHÔNG còn là oracle chính.",
          "Client tự chọn field — test cần khẳng định đủ và đúng các field yêu cầu, không dư không thiếu.",
          "Lỗi nằm trong errors[] của body — oracle thật sự là { data, errors }, không phải header.",
          "Kiểu mạnh theo schema — sai kiểu/biến thiếu bị chặn ở tầng validate trước cả khi chạy resolver.",
        ],
        [
          "A single endpoint — assert by operation name and data shape, not by URL path.",
          "HTTP 200 for both success and business errors — the status code is NO longer the main oracle.",
          "Client picks fields — tests must assert the requested fields are present and correct, no more no less.",
          "Errors live in the body's errors[] — the real oracle is { data, errors }, not headers.",
          "Strong typing from the schema — wrong types or missing variables are rejected at the validation layer before resolvers run.",
        ],
        [
          "単一エンドポイント — URLパスではなく操作名とデータ構造で検証します。",
          "成功も業務エラーもHTTP 200 — ステータスコードはもはや主要なオラクルではありません。",
          "クライアントがフィールドを選択 — 要求したフィールドが過不足なく正しく存在することを検証します。",
          "エラーは本文のerrors[]に存在 — 真のオラクルはヘッダーではなく{ data, errors }です。",
          "スキーマによる強い型付け — 誤った型や不足した変数はリゾルバ実行前の検証層で拒否されます。",
        ],
      ),
      WARN(
        "Đừng bao giờ chỉ assert response.status === 200 với GraphQL. Luôn assert thêm rằng body.errors là undefined (hoặc rỗng) cho ca thành công, và kiểm nội dung errors cho ca lỗi.",
        "Never assert only response.status === 200 with GraphQL. Always also assert that body.errors is undefined (or empty) for the success case, and inspect errors content for the error case.",
        "GraphQLではresponse.status === 200だけを検証してはいけません。成功ケースではbody.errorsがundefined（または空）であることを必ず併せて検証し、エラーケースではerrorsの内容を確認してください。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Kiểm thử Query — khẳng định dữ liệu đọc",
      en: "3. Testing queries — asserting read data",
      ja: "3. Queryのテスト — 読み取りデータの検証",
    },
    blocks: [
      P(
        "Với một query, mục tiêu kiểm thử đầu tiên là: gửi đúng operation kèm biến, rồi khẳng định phần data trả về đúng hình dạng và đúng giá trị. Ta nên chọn field vừa đủ cho nghiệp vụ đang kiểm, tránh lấy quá nhiều field khiến test giòn (brittle) khi schema mở rộng. Một thói quen tốt là tách biến (variables) ra khỏi chuỗi query để tái sử dụng cùng một query cho nhiều bộ dữ liệu. Việc dùng thư viện graphql-request giúp code test gọn: nó nhận endpoint, query và biến, rồi trả về thẳng phần data, đồng thời ném lỗi nếu có errors — hành vi này rất tiện cho ca happy path.",
        "For a query, the first testing goal is: send the right operation with variables, then assert the returned data has the right shape and the right values. We should select just enough fields for the business case under test, avoiding grabbing too many fields which makes tests brittle when the schema grows. A good habit is to separate variables from the query string so one query can be reused across many datasets. Using the graphql-request library keeps test code compact: it takes an endpoint, a query and variables, then returns the data directly while throwing if there are errors — very handy for the happy path.",
        "queryのテストにおける最初の目標は、正しい操作を変数とともに送信し、返却されたdataが正しい構造と正しい値を持つことを検証することです。テスト対象の業務ケースに必要十分なフィールドだけを選択し、多すぎるフィールドの取得を避けるべきです。多すぎるとスキーマ拡張時にテストが脆くなります。良い習慣は変数をクエリ文字列から分離することで、1つのクエリを複数のデータセットで再利用できます。graphql-requestライブラリを使うとテストコードが簡潔になります。エンドポイント、クエリ、変数を受け取り、dataを直接返し、errorsがあれば例外を投げます。これはハッピーパスに非常に便利です。",
      ),
      CODE("javascript", `// Jest + graphql-request — kiểm một query đọc sản phẩm (happy path)
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000/graphql");

const GET_PRODUCT = gql\`
  query GetProduct($id: ID!) {
    product(id: $id) { id title price }
  }
\`;

test("query product trả đúng dữ liệu", async () => {
  // graphql-request ném lỗi nếu response có errors -> happy path an toàn
  const data = await client.request(GET_PRODUCT, { id: "42" });
  expect(data.product).toEqual({ id: "42", title: "Áo thun", price: 199000 });
});`),
      P(
        "Khi cần toàn quyền kiểm soát cả data lẫn errors (thường cho ca âm), ta gọi thẳng bằng supertest hoặc fetch để đọc trọn response envelope. Với supertest bạn nhắm vào app Express/Apollo, POST body chứa query và variables, rồi assert body.data cùng body.errors một cách tường minh. Cách này bộc lộ rõ triết lý oracle của GraphQL: bạn kiểm cả hai nhánh của cái phong bì { data, errors }.",
        "When you need full control over both data and errors (usually for negative cases), call directly with supertest or fetch to read the whole response envelope. With supertest you target the Express/Apollo app, POST a body containing query and variables, then assert body.data and body.errors explicitly. This approach exposes GraphQL's oracle philosophy clearly: you check both branches of the { data, errors } envelope.",
        "dataとerrorsの両方を完全に制御する必要がある場合（通常は異常系）、supertestやfetchで直接呼び出してレスポンス全体を読み取ります。supertestではExpress/Apolloアプリを対象に、queryとvariablesを含む本文をPOSTし、body.dataとbody.errorsを明示的に検証します。この方法はGraphQLのオラクルの考え方を明確に示します。つまり{ data, errors }という封筒の両方の枝を検証するのです。",
      ),
      CODE("javascript", `// supertest — đọc trọn envelope để assert cả data lẫn errors
import request from "supertest";
import { app } from "../server.js";

test("query product qua supertest", async () => {
  const res = await request(app)
    .post("/graphql")
    .send({
      query: "query($id: ID!){ product(id:$id){ id title } }",
      variables: { id: "42" },
    })
    .expect(200); // GraphQL hầu như luôn 200 — đây KHÔNG phải oracle đủ

  expect(res.body.errors).toBeUndefined();       // không có lỗi
  expect(res.body.data.product.title).toBe("Áo thun");
});`),
      TIP(
        "Đặt tên operation (query GetProduct ...) thay vì query ẩn danh. Tên operation giúp log, trace và tính năng persisted queries dễ đọc, và cho phép dùng operationName khi một document chứa nhiều operation.",
        "Name your operations (query GetProduct ...) instead of anonymous queries. Named operations make logs, traces and persisted queries readable, and let you use operationName when one document holds several operations.",
        "匿名クエリではなく操作に名前を付けましょう（query GetProduct ...）。名前付き操作はログ、トレース、永続化クエリを読みやすくし、1つのドキュメントに複数の操作がある場合にoperationNameを使えるようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Kiểm thử Mutation — khẳng định dữ liệu ghi",
      en: "4. Testing mutations — asserting writes",
      ja: "4. Mutationのテスト — 書き込みの検証",
    },
    blocks: [
      P(
        "Mutation là thao tác làm thay đổi trạng thái: tạo đơn hàng, thêm sản phẩm vào giỏ, cập nhật hồ sơ. Kiểm thử mutation khác query ở chỗ ta phải quan tâm cả tác dụng phụ (side effect) lẫn dữ liệu trả về. Một pattern kiểm thử vững chắc gồm ba bước: (1) gửi mutation với input hợp lệ và assert payload trả về; (2) đọc lại bằng một query để xác nhận trạng thái đã thay đổi thật sự trong hệ thống; (3) kiểm tính idempotent hoặc ràng buộc nghiệp vụ nếu có (ví dụ không cho đặt trùng đơn). Bước đọc lại rất quan trọng vì payload trả về của mutation có thể đúng nhưng dữ liệu chưa được ghi bền vững do lỗi transaction.",
        "A mutation is a state-changing operation: create an order, add a product to the cart, update a profile. Testing a mutation differs from a query in that we must care about both the side effect and the returned data. A solid testing pattern has three steps: (1) send the mutation with valid input and assert the returned payload; (2) read back with a query to confirm the state actually changed in the system; (3) check idempotency or business constraints if any (for example not allowing duplicate orders). The read-back step matters because a mutation's returned payload may look right yet the data was not durably persisted due to a transaction failure.",
        "Mutationは状態を変更する操作です。注文の作成、カートへの商品追加、プロフィールの更新などです。Mutationのテストがqueryと異なるのは、副作用と返却データの両方に注意しなければならない点です。堅牢なテストパターンは3つのステップからなります。(1)有効な入力でmutationを送信し返却ペイロードを検証する。(2)queryで読み戻し、システムで状態が実際に変化したことを確認する。(3)必要ならべき等性や業務制約を確認する（例えば重複注文を許可しない）。読み戻しのステップが重要なのは、mutationの返却ペイロードが正しく見えても、トランザクション障害でデータが永続化されていない場合があるからです。",
      ),
      CODE("graphql", `# Mutation nhận input object và trả về payload để client đọc lại kết quả
mutation AddToCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    cart {
      id
      itemCount
      total
    }
  }
}
# variables: { "input": { "productId": "42", "quantity": 2 } }`),
      CODE("javascript", `// Kiểm mutation: gửi -> assert payload -> đọc lại xác nhận trạng thái
import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient("http://localhost:4000/graphql");

const ADD = gql\`mutation Add($input: AddToCartInput!){
  addToCart(input:$input){ cart{ id itemCount total } } }\`;
const CART = gql\`query Cart($id: ID!){ cart(id:$id){ itemCount } }\`;

test("addToCart tăng số lượng và ghi bền vững", async () => {
  const r = await client.request(ADD, { input: { productId: "42", quantity: 2 } });
  expect(r.addToCart.cart.itemCount).toBe(2);   // 1) payload đúng

  const back = await client.request(CART, { id: r.addToCart.cart.id });
  expect(back.cart.itemCount).toBe(2);          // 2) đọc lại xác nhận
});`),
      NOTE(
        "GraphQL không định nghĩa sẵn quy tắc idempotent cho mutation như HTTP (POST không idempotent, PUT idempotent). Nếu nghiệp vụ cần chống trùng, hãy kiểm một khóa idempotency-key trong input và assert gọi hai lần chỉ tạo một bản ghi.",
        "GraphQL does not define built-in idempotency rules for mutations like HTTP does (POST non-idempotent, PUT idempotent). If the business needs de-duplication, test an idempotency-key in the input and assert that calling twice creates only one record.",
        "GraphQLはHTTPのように（POSTは非べき等、PUTはべき等）mutationのべき等性ルールを組み込みで定義していません。業務で重複排除が必要なら、入力のidempotency-keyをテストし、2回呼び出しても1レコードしか作成されないことを検証します。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Oracle lỗi & partial data — trái tim của kiểm thử GraphQL",
      en: "5. Error & partial-data oracle — the heart of GraphQL testing",
      ja: "5. エラーと部分データのオラクル — GraphQLテストの核心",
    },
    blocks: [
      P(
        "GraphQL cho phép một response vừa có data vừa có errors cùng lúc. Điều này gọi là partial data: một trường trong query bị lỗi (ví dụ trường price yêu cầu quyền cao hơn) sẽ được đặt null, và một mục lỗi tương ứng xuất hiện trong mảng errors, kèm path chỉ chính xác trường nào lỗi. Các trường còn lại vẫn trả bình thường. Với Tester, đây là điểm oracle tinh tế: bạn phải xác định rõ ca test kỳ vọng data đầy đủ và errors rỗng, hay chấp nhận partial data với một lỗi cụ thể. Đừng assert cứng data khác null mà quên rằng trường có thể null hợp lệ khi kèm lỗi.",
        "GraphQL allows a response to carry data and errors at the same time. This is called partial data: one field in the query fails (say the price field requires higher privilege) and is set to null, and a corresponding error entry appears in the errors array with a path pointing at exactly which field failed. The remaining fields still return normally. For a tester this is a subtle oracle point: you must decide clearly whether the test expects complete data with empty errors, or accepts partial data with a specific error. Do not hard-assert that data is non-null while forgetting a field may legitimately be null when accompanied by an error.",
        "GraphQLではレスポンスがdataとerrorsを同時に持つことができます。これを部分データと呼びます。クエリ内の1つのフィールドが失敗すると（例えばpriceフィールドがより高い権限を要求する場合）nullに設定され、どのフィールドが失敗したかを正確に示すpathとともに対応するエラー項目がerrors配列に現れます。残りのフィールドは正常に返されます。テスターにとってこれは繊細なオラクルの論点です。テストが完全なdataと空のerrorsを期待するのか、特定のエラーを伴う部分データを受け入れるのかを明確に決めなければなりません。エラーを伴えばフィールドが正当にnullになりうることを忘れて、dataが非nullだと固定的に検証してはいけません。",
      ),
      IMG(svgEnvelope, "Envelope { data, errors } với partial data và path lỗi", "The { data, errors } envelope with partial data and error path", "部分データとエラーpathを含む{ data, errors }封筒"),
      CODE("javascript", `// Assert partial data: price = null vì thiếu quyền, kèm error đúng path & code
test("thiếu quyền -> price null + error FORBIDDEN đúng path", async () => {
  const res = await request(app).post("/graphql").send({
    query: "query($id:ID!){ product(id:$id){ id title price } }",
    variables: { id: "42" },
  }).expect(200);

  expect(res.body.data.product.title).toBe("Áo thun"); // field khác vẫn OK
  expect(res.body.data.product.price).toBeNull();       // field lỗi -> null
  expect(res.body.errors).toHaveLength(1);
  expect(res.body.errors[0].path).toEqual(["product", "price"]);
  expect(res.body.errors[0].extensions.code).toBe("FORBIDDEN");
});`),
      P(
        "Trường extensions.code là nơi server thường đặt mã lỗi máy đọc được (như BAD_USER_INPUT, UNAUTHENTICATED, FORBIDDEN, INTERNAL_SERVER_ERROR). Assert theo code ổn định hơn nhiều so với assert theo chuỗi message vì message có thể đổi theo ngôn ngữ hay bản dịch. Ngoài ra, hãy để ý phân biệt: một trường non-null (kiểu String!) khi lỗi sẽ khiến lỗi lan lên (bubble up) tới cha gần nhất có thể null — đây là hành vi nullability quan trọng mà test phải bao phủ.",
        "The extensions.code field is where servers usually place a machine-readable error code (such as BAD_USER_INPUT, UNAUTHENTICATED, FORBIDDEN, INTERNAL_SERVER_ERROR). Asserting on code is far more stable than asserting on the message string because messages may change with locale or translation. Also watch a distinction: a non-null field (type String!) that errors makes the error bubble up to the nearest nullable parent — this is important nullability behavior that tests must cover.",
        "extensions.codeフィールドは、サーバーが機械可読なエラーコード（BAD_USER_INPUT、UNAUTHENTICATED、FORBIDDEN、INTERNAL_SERVER_ERRORなど）を置く場所です。codeで検証する方がmessage文字列で検証するよりはるかに安定します。messageはロケールや翻訳で変わりうるからです。また区別に注意してください。non-nullフィールド（型String!）がエラーになると、エラーはnull許容な最も近い親までバブルアップします。これはテストがカバーすべき重要なnullabilityの挙動です。",
      ),
      WARN(
        "Đừng nhầm lỗi validate/syntax (server không parse được query, không có data) với lỗi thực thi resolver (có data một phần). Ca đầu thường errors kèm data === null; ca sau là partial data. Test phải phân biệt hai loại này.",
        "Do not confuse validation/syntax errors (the server cannot parse the query, no data) with resolver execution errors (partial data present). The former usually has errors with data === null; the latter is partial data. Tests must distinguish the two.",
        "検証・構文エラー（サーバーがクエリをパースできず、dataがない）とリゾルバ実行エラー（部分データが存在する）を混同してはいけません。前者は通常data === nullを伴うerrorsを持ち、後者は部分データです。テストはこの2種類を区別しなければなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Biến, operationName và ca âm ở tầng validate",
      en: "6. Variables, operationName and negative cases at the validation layer",
      ja: "6. 変数、operationNameと検証層の異常系",
    },
    blocks: [
      P(
        "Biến (variables) là cách truyền dữ liệu động vào query một cách an toàn về kiểu. Khai báo biến trong chữ ký operation ($id: ID!) rồi tham chiếu trong thân query. Vì schema định kiểu mạnh, nếu bạn gửi thiếu một biến bắt buộc (non-null) hoặc gửi sai kiểu, server sẽ trả lỗi ở tầng validate trước khi bất kỳ resolver nào chạy. Đây là một lớp ca âm rất giá trị để kiểm: dữ liệu vào không hợp lệ phải bị chặn sớm với mã lỗi rõ ràng, không được lọt xuống làm hỏng dữ liệu. Khi một document chứa nhiều operation, bạn bắt buộc phải kèm operationName để server biết chạy cái nào.",
        "Variables are the type-safe way to pass dynamic data into a query. Declare a variable in the operation signature ($id: ID!) then reference it in the query body. Because the schema is strongly typed, if you omit a required (non-null) variable or send the wrong type, the server returns an error at the validation layer before any resolver runs. This is a very valuable class of negative cases to test: invalid input must be rejected early with a clear error code, not slip through and corrupt data. When a document holds several operations you must include operationName so the server knows which one to run.",
        "変数はqueryに動的データを型安全に渡す方法です。操作の署名で変数を宣言し（$id: ID!）、クエリ本文で参照します。スキーマは強く型付けされているため、必須（non-null）変数を省略したり誤った型を送ったりすると、サーバーはリゾルバ実行前に検証層でエラーを返します。これはテストすべき非常に価値ある異常系のクラスです。不正な入力は明確なエラーコードで早期に拒否されるべきで、通り抜けてデータを破壊してはいけません。ドキュメントに複数の操作がある場合、どれを実行するかサーバーが分かるようにoperationNameを含めなければなりません。",
      ),
      CODE("javascript", `// Ca âm: gửi sai kiểu biến -> lỗi validate, KHÔNG có data
test("biến sai kiểu bị chặn ở tầng validate", async () => {
  const res = await request(app).post("/graphql").send({
    query: "query($id: ID!){ product(id:$id){ id } }",
    variables: { id: { nested: true } }, // sai kiểu: object thay vì ID
  }).expect(200);

  expect(res.body.data).toBeUndefined();            // chưa chạy resolver
  expect(res.body.errors[0].message).toMatch(/variable|type/i);
});

// Thiếu operationName khi có nhiều operation
test("nhiều operation mà thiếu operationName -> lỗi", async () => {
  const res = await request(app).post("/graphql").send({
    query: "query A{ a:__typename } query B{ b:__typename }",
    // operationName cố tình bỏ trống
  }).expect(200);
  expect(res.body.errors[0].message).toMatch(/operation name|must provide/i);
});`),
      SCEN(
        "Ca âm bị bỏ sót gây sự cố",
        "A missed negative case caused an incident",
        "Đội TMĐT chỉ viết test happy path cho mutation applyCoupon. Một khách gửi quantity âm qua biến; do resolver không kiểm và test không phủ ca âm, hệ thống tạo đơn giá âm và trừ tiền sai. Bài học: mỗi input phải có ít nhất một ca âm ở tầng validate (kiểu, bắt buộc) và một ca âm ở tầng nghiệp vụ (giá trị hợp lệ nhưng vi phạm quy tắc).",
        "The e-commerce team only wrote happy-path tests for the applyCoupon mutation. A customer sent a negative quantity through a variable; because the resolver did not check and tests did not cover the negative case, the system created a negative-price order and refunded incorrectly. Lesson: every input needs at least one negative case at the validation layer (type, required) and one at the business layer (valid value but breaks a rule).",
        "ECチームはapplyCoupon mutationのハッピーパステストしか書きませんでした。ある顧客が変数を通じて負のquantityを送信し、リゾルバが検証せずテストも異常系をカバーしていなかったため、システムは負の価格の注文を作成し誤って返金しました。教訓：すべての入力には検証層（型、必須）の異常系を少なくとも1つ、業務層（有効な値だがルール違反）の異常系を1つ用意すべきです。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Xác thực & ủy quyền — kiểm phân quyền theo từng field",
      en: "7. Authentication & authorization — testing per-field authz",
      ja: "7. 認証と認可 — フィールド単位の認可テスト",
    },
    blocks: [
      P(
        "Trong GraphQL, ủy quyền thường tinh vi hơn REST vì nó có thể áp ở cấp field, không chỉ cấp thao tác. Cùng một query, người dùng ẩn danh thấy title và price, nhưng chỉ admin mới thấy field costPrice (giá vốn). Vì tất cả đi qua một endpoint, Tester phải kiểm ma trận vai trò × field: với mỗi vai trò, những field nào được phép, field nào bị null kèm lỗi FORBIDDEN, và field nào không được tiết lộ cả trong lỗi. Xác thực thường truyền qua header Authorization; mỗi ca test cần gắn token phù hợp rồi assert kết quả theo vai trò.",
        "In GraphQL, authorization is often finer-grained than REST because it can apply at the field level, not just the operation level. In the same query an anonymous user sees title and price, but only an admin sees the costPrice field. Because everything goes through one endpoint, the tester must test a role × field matrix: for each role, which fields are allowed, which are nulled with a FORBIDDEN error, and which must not be disclosed even in the error. Authentication usually travels in the Authorization header; each test attaches the right token then asserts results per role.",
        "GraphQLでは認可がRESTより細かい粒度であることが多いです。操作レベルだけでなくフィールドレベルで適用できるからです。同じクエリで匿名ユーザーはtitleとpriceを見られますが、costPriceフィールドは管理者だけが見られます。すべてが1つのエンドポイントを通るため、テスターはロール×フィールドのマトリクスをテストしなければなりません。各ロールについて、どのフィールドが許可され、どれがFORBIDDENエラーとともにnullになり、どれがエラー内でも開示されてはならないかです。認証は通常Authorizationヘッダーで運ばれます。各テストは適切なトークンを付与してからロールごとに結果を検証します。",
      ),
      CODE("javascript", `// Ma trận vai trò × field: cùng query, khác token, khác kết quả
async function run(token, query, variables) {
  return request(app).post("/graphql")
    .set("Authorization", token ? \`Bearer \${token}\` : "")
    .send({ query, variables }).expect(200);
}
const Q = "query($id:ID!){ product(id:$id){ title price costPrice } }";

test("admin thấy costPrice", async () => {
  const r = await run(ADMIN_TOKEN, Q, { id: "42" });
  expect(r.body.data.product.costPrice).toBe(90000);
  expect(r.body.errors).toBeUndefined();
});

test("khách ẩn danh: costPrice null + FORBIDDEN, không lộ giá vốn", async () => {
  const r = await run(null, Q, { id: "42" });
  expect(r.body.data.product.title).toBe("Áo thun");
  expect(r.body.data.product.costPrice).toBeNull();
  expect(r.body.errors[0].extensions.code).toBe("FORBIDDEN");
});`),
      TIP(
        "Kiểm cả rò rỉ qua thông báo lỗi: message không được chứa dữ liệu nhạy cảm (giá vốn, PII). Ở production nên tắt stack trace trong extensions để không lộ chi tiết nội bộ.",
        "Also test leakage through error messages: the message must not contain sensitive data (cost price, PII). In production, disable stack traces in extensions so internal details are not exposed.",
        "エラーメッセージ経由の漏洩もテストしてください。messageに機密データ（原価、PII）が含まれてはいけません。本番ではextensions内のスタックトレースを無効化し、内部詳細が露出しないようにします。",
      ),
      P(
        "Một khía cạnh an ninh riêng của GraphQL là introspection — khả năng truy vấn chính schema qua __schema và __type. Trên môi trường production, nhiều đội tắt introspection để giảm bề mặt tấn công. Tester nên có một ca kiểm xác nhận introspection bị tắt ở production và bật ở môi trường dev, vì bật nhầm ở production là một lỗ hổng lộ toàn bộ cấu trúc API.",
        "A GraphQL-specific security aspect is introspection — the ability to query the schema itself via __schema and __type. In production many teams disable introspection to reduce attack surface. Testers should have a case confirming introspection is off in production and on in dev, because leaving it on in production is a vulnerability that exposes the whole API structure.",
        "GraphQL固有のセキュリティ面としてイントロスペクションがあります。__schemaや__typeを通じてスキーマ自体を照会する機能です。本番では多くのチームが攻撃対象領域を減らすためにイントロスペクションを無効化します。テスターは本番でイントロスペクションが無効、開発で有効であることを確認するケースを持つべきです。本番で有効のままにするのはAPI構造全体を露出させる脆弱性だからです。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Bộ công cụ kiểm thử GraphQL",
      en: "8. The GraphQL testing toolbox",
      ja: "8. GraphQLテストのツールボックス",
    },
    blocks: [
      P(
        "Không có một công cụ duy nhất tốt nhất; lựa chọn tùy tầng kiểm và ngữ cảnh đội. Ở tầng đơn vị/tích hợp trong Node, graphql-request kết hợp Jest cho code gọn và tập trung vào data. Khi cần đọc trọn envelope và ghép với app server, supertest là lựa chọn quen thuộc. Playwright cung cấp request context (request.post) để gọi API GraphQL độc lập trình duyệt, rất hợp khi bạn đã dùng Playwright cho E2E và muốn dựng dữ liệu qua API. Postman hỗ trợ GraphQL body và biến, tiện cho khám phá thủ công và bộ sưu tập kiểm thử chạy bằng Newman trong CI.",
        "There is no single best tool; the choice depends on the test layer and team context. At the unit/integration layer in Node, graphql-request with Jest gives compact, data-focused code. When you need to read the whole envelope and wire against the server app, supertest is a familiar choice. Playwright offers a request context (request.post) to call the GraphQL API independent of the browser, great when you already use Playwright for E2E and want to seed data via the API. Postman supports a GraphQL body and variables, handy for manual exploration and test collections run with Newman in CI.",
        "唯一最良のツールはありません。選択はテスト層とチームの状況によります。Nodeのユニット・統合層ではgraphql-requestとJestが簡潔でデータ重視のコードを与えます。封筒全体を読み、サーバーアプリと接続する必要があればsupertestが馴染みのある選択です。Playwrightはブラウザから独立してGraphQL APIを呼ぶrequestコンテキスト（request.post）を提供し、すでにE2EでPlaywrightを使いAPI経由でデータを準備したい場合に最適です。PostmanはGraphQL本文と変数をサポートし、手動探索やCIでNewmanで実行するテストコレクションに便利です。",
      ),
      CODE("javascript", `// Playwright request context — gọi GraphQL không cần trình duyệt
import { test, expect, request } from "@playwright/test";

test("seed & verify qua Playwright request", async () => {
  const ctx = await request.newContext({ baseURL: "http://localhost:4000" });
  const res = await ctx.post("/graphql", {
    data: {
      query: "query($id:ID!){ product(id:$id){ id title } }",
      variables: { id: "42" },
    },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.errors).toBeUndefined();
  expect(body.data.product.id).toBe("42");
});`),
      UL(
        [
          "graphql-request + Jest: gọn, ném lỗi khi có errors — hợp happy path và integration.",
          "supertest: đọc trọn { data, errors }, chủ động cho ca âm và partial data.",
          "Playwright request: gọi API độc lập browser, tiện seed dữ liệu cho E2E.",
          "Postman + Newman: khám phá thủ công + chạy collection GraphQL trong CI.",
          "MSW (Mock Service Worker): giả lập response GraphQL ở tầng frontend để test UI ổn định.",
        ],
        [
          "graphql-request + Jest: compact, throws on errors — good for happy path and integration.",
          "supertest: reads the whole { data, errors }, proactive for negative and partial-data cases.",
          "Playwright request: browser-independent API calls, handy to seed data for E2E.",
          "Postman + Newman: manual exploration plus running GraphQL collections in CI.",
          "MSW (Mock Service Worker): mocks GraphQL responses at the frontend layer for stable UI tests.",
        ],
        [
          "graphql-request + Jest：簡潔で、errorsがあれば例外を投げる。ハッピーパスと統合に適します。",
          "supertest：{ data, errors }全体を読み、異常系と部分データに能動的に対応します。",
          "Playwright request：ブラウザ非依存のAPI呼び出しで、E2E用のデータ準備に便利です。",
          "Postman + Newman：手動探索とCIでのGraphQLコレクション実行です。",
          "MSW（Mock Service Worker）：フロントエンド層でGraphQLレスポンスをモックし、安定したUIテストを行います。",
        ],
      ),
      NOTE(
        "Với subscription (thời gian thực qua WebSocket), Playwright hoặc thư viện graphql-ws giúp mở kết nối, gửi một mutation gây sự kiện rồi assert client nhận đúng payload đẩy về. Đây là tầng nâng cao, ngoài phạm vi bài này.",
        "For subscriptions (real-time over WebSocket), Playwright or the graphql-ws library helps open a connection, send a mutation that triggers an event, then assert the client receives the correct pushed payload. This is an advanced layer, out of scope here.",
        "サブスクリプション（WebSocket経由のリアルタイム）では、Playwrightやgraphql-wsライブラリで接続を開き、イベントを発生させるmutationを送り、クライアントが正しいプッシュペイロードを受け取ることを検証します。これは応用層で、本記事の範囲外です。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Hiệu năng & N+1 — cái bẫy resolver",
      en: "9. Performance & N+1 — the resolver trap",
      ja: "9. パフォーマンスとN+1 — リゾルバの罠",
    },
    blocks: [
      P(
        "Vì client tự chọn field và có thể lồng sâu, một query GraphQL vô hại về hình thức có thể sinh ra rất nhiều truy vấn cơ sở dữ liệu ở phía server — hiện tượng N+1. Ví dụ lấy 20 sản phẩm rồi mỗi sản phẩm lấy tác giả review sẽ thành 1 query lấy danh sách cộng 20 query con. Với Tester, đây không chỉ là vấn đề hiệu năng mà còn là rủi ro ổn định: một query lồng sâu có thể làm quá tải DB. Chiến lược kiểm gồm đặt giới hạn độ sâu (depth limit) và độ phức tạp (complexity), rồi viết test khẳng định query vượt ngưỡng bị từ chối, đồng thời đo số lần chạm DB cho các query phổ biến.",
        "Because the client picks fields and can nest deeply, a query that looks harmless can generate very many database queries on the server — the N+1 phenomenon. For example fetching 20 products then each product's review authors becomes 1 list query plus 20 child queries. For a tester this is not only a performance issue but a stability risk: a deeply nested query can overload the DB. The testing strategy includes setting a depth limit and complexity limit, then writing tests asserting that over-limit queries are rejected, while measuring DB hits for common queries.",
        "クライアントがフィールドを選択し深くネストできるため、無害に見えるクエリがサーバー側で非常に多くのデータベースクエリを生成することがあります。N+1現象です。例えば20件の商品を取得し各商品のレビュー作成者を取得すると、1件のリストクエリと20件の子クエリになります。テスターにとってこれはパフォーマンスの問題だけでなく安定性のリスクです。深くネストしたクエリがDBを過負荷にしかねません。テスト戦略には深さ制限と複雑度制限の設定が含まれ、制限超過のクエリが拒否されることを検証するテストを書き、一般的なクエリのDBヒット数を測定します。",
      ),
      CODE("javascript", `// Đo N+1: đếm số lần chạm DB bằng spy, assert đã batch (DataLoader)
test("query 20 sản phẩm KHÔNG gây N+1 (nhờ DataLoader)", async () => {
  const dbSpy = jest.spyOn(db, "query");
  await client.request(gql\`
    query { products(first: 20) { id reviews(first:1){ author { name } } } }
  \`);
  // Nếu batch tốt: ~2-3 lần chạm DB, KHÔNG phải 1 + 20
  expect(dbSpy.mock.calls.length).toBeLessThanOrEqual(3);
});

test("query lồng quá sâu bị chặn bởi depth limit", async () => {
  const deep = "query{ a{ b{ c{ d{ e{ f{ g{ __typename }}}}}}} }";
  const res = await request(app).post("/graphql").send({ query: deep }).expect(200);
  expect(res.body.errors[0].message).toMatch(/depth|exceeds maximum/i);
});`),
      WARN(
        "N+1 có thể ẩn khỏi test đơn lẻ vì dữ liệu nhỏ vẫn chạy nhanh. Hãy kiểm với tập dữ liệu đủ lớn và đo số truy vấn DB, đừng chỉ đo thời gian phản hồi trên máy dev.",
        "N+1 can hide from a single test because small data still runs fast. Test with a large enough dataset and measure DB query count, not just response time on a dev machine.",
        "N+1は単独テストから隠れることがあります。小さなデータでは速く動くからです。十分大きなデータセットでテストし、開発機の応答時間だけでなくDBクエリ数を測定してください。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Bẫy thường gặp khi kiểm thử GraphQL",
      en: "10. Common pitfalls when testing GraphQL",
      ja: "10. GraphQLテストでよくある落とし穴",
    },
    blocks: [
      P(
        "Nhiều lỗi kiểm thử GraphQL bắt nguồn từ việc mang thói quen REST sang mà không điều chỉnh. Dưới đây là những bẫy hay gặp nhất mà đội TMĐT của chúng ta đã va phải, kèm cách phòng. Nắm được chúng giúp bạn viết oracle đúng ngay từ đầu và tránh cả false green lẫn false red.",
        "Many GraphQL testing mistakes come from carrying REST habits over without adjusting. Below are the most common traps our e-commerce team has hit, with prevention. Knowing them helps you write correct oracles from the start and avoid both false-green and false-red results.",
        "GraphQLテストの多くの誤りは、RESTの習慣を調整せずに持ち込むことから生じます。以下は私たちのECチームが遭遇した最も一般的な落とし穴と、その予防策です。これらを知ることで最初から正しいオラクルを書き、false-greenとfalse-redの両方を避けられます。",
      ),
      UL(
        [
          "Chỉ assert status 200 — bỏ qua errors trong body (false green kinh điển).",
          "Quên partial data — assert data khác null trong khi field có thể null hợp lệ khi kèm lỗi.",
          "Assert theo message thay vì extensions.code — test giòn khi đổi bản dịch.",
          "Lấy quá nhiều field — test gãy mỗi khi schema thêm/đổi field không liên quan.",
          "Không kiểm ca âm ở tầng validate (biến thiếu/sai kiểu) — bỏ lọt lỗ hổng input.",
          "Bỏ qua introspection/độ sâu — không phát hiện rủi ro bảo mật và N+1.",
        ],
        [
          "Asserting status 200 only — ignoring errors in the body (the classic false-green).",
          "Forgetting partial data — asserting data non-null while a field may legitimately be null with an error.",
          "Asserting on message instead of extensions.code — brittle tests when translations change.",
          "Selecting too many fields — tests break whenever the schema adds/changes unrelated fields.",
          "No negative cases at the validation layer (missing/wrong-typed variables) — input gaps slip through.",
          "Skipping introspection/depth checks — missing security risk and N+1.",
        ],
        [
          "ステータス200だけを検証 — 本文のerrorsを無視する（古典的なfalse-green）。",
          "部分データを忘れる — フィールドがエラーとともに正当にnullになりうるのにdataを非nullと検証する。",
          "extensions.codeではなくmessageで検証 — 翻訳が変わるとテストが脆くなる。",
          "多すぎるフィールドを選択 — スキーマが無関係なフィールドを追加・変更するたびにテストが壊れる。",
          "検証層で異常系（変数の不足・誤った型）を検証しない — 入力の隙間が通り抜ける。",
          "イントロスペクション・深さのチェックを省く — セキュリティリスクとN+1を見逃す。",
        ],
      ),
      TIP(
        "Tạo một helper gqlRequest(query, variables, token) trả về { status, data, errors } chuẩn hóa. Mọi test dùng chung helper này để luôn có sẵn cả ba nhánh oracle, tránh quên kiểm errors.",
        "Create a gqlRequest(query, variables, token) helper returning a normalized { status, data, errors }. All tests share it so all three oracle branches are always available, preventing forgotten error checks.",
        "正規化された{ status, data, errors }を返すgqlRequest(query, variables, token)ヘルパーを作りましょう。すべてのテストがこれを共有することで、常に3つのオラクルの枝が利用でき、errorsチェックの忘れを防ぎます。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản thực chiến — bộ test cho luồng đặt hàng",
      en: "11. Real scenario — a test suite for the checkout flow",
      ja: "11. 実戦シナリオ — チェックアウトフローのテストスイート",
    },
    blocks: [
      P(
        "Hãy ráp mọi thứ lại thành một bộ test cho luồng đặt hàng TMĐT: khách xem sản phẩm, thêm vào giỏ, áp mã giảm giá, rồi đặt đơn. Ta thiết kế theo tư duy oracle của GraphQL: mỗi bước khẳng định data đúng, errors đúng và trạng thái được ghi bền vững. Bộ test này gồm happy path đầy đủ, ca âm ở validate, ca phân quyền, và một ca partial data khi một field phụ (như gợi ý sản phẩm) lỗi nhưng đơn vẫn phải đặt thành công.",
        "Let us assemble everything into a test suite for an e-commerce checkout flow: the customer views a product, adds to cart, applies a coupon, then places an order. We design with GraphQL's oracle mindset: each step asserts correct data, correct errors and durable state. This suite includes a full happy path, a validation-layer negative case, an authz case, and a partial-data case where an auxiliary field (like product recommendations) fails but the order must still succeed.",
        "すべてをECチェックアウトフローのテストスイートに組み立てましょう。顧客が商品を閲覧し、カートに追加し、クーポンを適用し、注文します。GraphQLのオラクルの考え方で設計します。各ステップで正しいdata、正しいerrors、永続的な状態を検証します。このスイートには完全なハッピーパス、検証層の異常系、認可ケース、そして補助フィールド（商品レコメンドなど）が失敗しても注文は成功しなければならない部分データケースが含まれます。",
      ),
      CODE("javascript", `// Bộ test luồng checkout — ráp query + mutation + oracle đầy đủ
describe("Checkout flow (GraphQL)", () => {
  let cartId, orderPayload;

  test("1) thêm sản phẩm vào giỏ", async () => {
    const r = await client.request(ADD_TO_CART,
      { input: { productId: "42", quantity: 2 } });
    cartId = r.addToCart.cart.id;
    expect(r.addToCart.cart.itemCount).toBe(2);
  });

  test("2) áp coupon hợp lệ giảm đúng số tiền", async () => {
    const r = await client.request(APPLY_COUPON,
      { input: { cartId, code: "SALE10" } });
    expect(r.applyCoupon.cart.discount).toBe(39800); // 10% của 398000
  });

  test("3) coupon hết hạn -> lỗi COUPON_EXPIRED, giỏ KHÔNG đổi", async () => {
    const res = await request(app).post("/graphql").set("Authorization", USER)
      .send({ query: APPLY_COUPON_STR, variables:{ input:{ cartId, code:"OLD" } } })
      .expect(200);
    expect(res.body.errors[0].extensions.code).toBe("COUPON_EXPIRED");
  });

  test("4) đặt đơn: đơn tạo dù field recommendations lỗi (partial data)", async () => {
    const res = await request(app).post("/graphql").set("Authorization", USER)
      .send({ query:
        "mutation($id:ID!){ placeOrder(cartId:$id){ order{ id status } recommendations{ id } } }",
        variables: { id: cartId } }).expect(200);
    expect(res.body.data.placeOrder.order.status).toBe("CONFIRMED"); // đơn OK
    expect(res.body.data.placeOrder.recommendations).toBeNull();     // field phụ lỗi
    expect(res.body.errors[0].path).toContain("recommendations");    // đúng path lỗi
  });
});`),
      P(
        "Điểm tinh tế nhất ở bước 4: nghiệp vụ yêu cầu đơn hàng vẫn phải được đặt thành công ngay cả khi dịch vụ gợi ý sản phẩm (một field phụ, không quan trọng) gặp lỗi. Nhờ nullability của schema (recommendations là kiểu nullable), lỗi ở nhánh đó chỉ làm nó null và thêm một mục errors, chứ không kéo sập toàn bộ mutation. Đây chính là lý do thiết kế nullability đúng ở schema lại là mối quan tâm chung của cả dev và tester.",
        "The subtlest point is step 4: the business requires the order to still succeed even when the product recommendation service (an auxiliary, non-critical field) fails. Thanks to schema nullability (recommendations is a nullable type), an error on that branch only nulls it and adds an errors entry, rather than collapsing the whole mutation. This is exactly why correct nullability design in the schema is a shared concern of both dev and tester.",
        "最も繊細な点はステップ4です。商品レコメンドサービス（補助的で重要でないフィールド）が失敗しても、業務は注文の成功を要求します。スキーマのnullability（recommendationsはnull許容型）のおかげで、その枝のエラーはそれをnullにしてerrors項目を追加するだけで、mutation全体を崩壊させません。これこそスキーマでの正しいnullability設計が開発者とテスターの共通の関心事である理由です。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Câu hỏi phỏng vấn thường gặp",
      en: "12. Common interview questions",
      ja: "12. よくある面接質問",
    },
    blocks: [
      QA(
        "Vì sao GraphQL thường trả HTTP 200 kể cả khi có lỗi, và điều đó ảnh hưởng ra sao đến cách viết oracle?",
        "Why does GraphQL usually return HTTP 200 even on errors, and how does that affect writing the oracle?",
        "Vì lỗi GraphQL được biểu diễn trong mảng errors ở thân response, không phải ở tầng giao vận HTTP. Miễn request được parse và thực thi, server thường trả 200. Do đó oracle không thể dựa vào status code; test phải assert cả body.data lẫn body.errors — errors rỗng cho happy path, và kiểm nội dung/path/extensions.code cho ca lỗi.",
        "Because GraphQL errors are represented in the errors array in the response body, not at the HTTP transport layer. As long as the request parses and executes, the server usually returns 200. So the oracle cannot rely on the status code; tests must assert both body.data and body.errors — empty errors for the happy path, and checking content/path/extensions.code for error cases.",
        "GraphQLのエラーはHTTPトランスポート層ではなくレスポンス本文のerrors配列で表現されるからです。リクエストがパースされ実行される限り、サーバーは通常200を返します。したがってオラクルはステータスコードに頼れません。テストはbody.dataとbody.errorsの両方を検証しなければなりません。ハッピーパスではerrorsが空、エラーケースでは内容・path・extensions.codeを確認します。",
      ),
      QA(
        "Partial data là gì và bạn kiểm nó thế nào?",
        "What is partial data and how do you test it?",
        "Partial data là khi một response vừa có data vừa có errors: một số field lỗi bị đặt null và có mục lỗi tương ứng với path chỉ đúng field đó, trong khi các field khác vẫn trả bình thường. Để kiểm, tôi assert field lỗi là null, assert errors chứa đúng path và extensions.code, đồng thời assert các field không liên quan vẫn trả đúng giá trị — chứng minh lỗi được cô lập đúng theo nullability.",
        "Partial data is when a response has both data and errors: some failing fields are set to null with a corresponding error entry whose path points to that exact field, while other fields still return normally. To test, I assert the failing field is null, assert errors contains the right path and extensions.code, and assert unrelated fields still return correct values — proving the error is isolated correctly per nullability.",
        "部分データとは、レスポンスがdataとerrorsの両方を持つ場合です。失敗したフィールドはnullに設定され、そのフィールドを正確に指すpathを持つ対応するエラー項目があり、他のフィールドは正常に返されます。テストでは、失敗したフィールドがnullであること、errorsが正しいpathとextensions.codeを含むこと、無関係なフィールドが正しい値を返すことを検証します。nullabilityに従ってエラーが正しく隔離されていることを証明します。",
      ),
      QA(
        "Kiểm thử mutation khác kiểm thử query như thế nào?",
        "How does testing a mutation differ from testing a query?",
        "Mutation làm thay đổi trạng thái nên ngoài việc assert payload trả về, tôi phải xác nhận side effect: đọc lại bằng một query để chắc dữ liệu đã ghi bền vững, kiểm ràng buộc nghiệp vụ (ví dụ chống trùng qua idempotency-key) và dọn/khôi phục dữ liệu giữa các test để tránh phụ thuộc thứ tự. Query chỉ đọc nên trọng tâm là hình dạng và giá trị data cùng ca phân quyền field.",
        "A mutation changes state, so beyond asserting the returned payload I must confirm the side effect: read back with a query to ensure data persisted durably, check business constraints (e.g. de-dup via an idempotency-key) and clean up/reset data between tests to avoid ordering dependencies. A query only reads, so the focus is data shape and values plus field-level authz cases.",
        "Mutationは状態を変更するため、返却ペイロードの検証に加えて副作用を確認しなければなりません。queryで読み戻してデータが永続化されたことを確認し、業務制約（例：idempotency-keyによる重複排除）を確認し、順序依存を避けるためテスト間でデータをクリーンアップ・リセットします。queryは読み取りのみなので、焦点はdataの構造と値、そしてフィールド単位の認可ケースです。",
      ),
      QA(
        "Bạn dùng công cụ nào để test GraphQL và vì sao?",
        "Which tools do you use to test GraphQL and why?",
        "Tùy tầng: graphql-request + Jest cho integration gọn và happy path vì nó ném lỗi khi có errors; supertest khi cần đọc trọn { data, errors } cho ca âm và partial data; Playwright request để seed dữ liệu qua API cho E2E; Postman/Newman cho khám phá thủ công và chạy collection trong CI. Tôi luôn gói một helper chuẩn hóa response để không quên assert errors.",
        "Depends on the layer: graphql-request + Jest for compact integration and happy path since it throws on errors; supertest when I need the whole { data, errors } for negative and partial-data cases; Playwright request to seed data via API for E2E; Postman/Newman for manual exploration and running collections in CI. I always wrap a response-normalizing helper so I never forget to assert errors.",
        "層によります。graphql-request + Jestは簡潔な統合とハッピーパスに使います。errorsがあれば例外を投げるからです。supertestは異常系と部分データで{ data, errors }全体が必要なときに使います。Playwright requestはE2E用にAPI経由でデータを準備するために使います。Postman/Newmanは手動探索とCIでのコレクション実行に使います。errorsの検証を忘れないよう、常にレスポンスを正規化するヘルパーで包みます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist",
      en: "13. Summary & checklist",
      ja: "13. まとめとチェックリスト",
    },
    blocks: [
      P(
        "Kiểm thử GraphQL query và mutation đòi hỏi ta rời bỏ oracle dựa vào status code của REST và chuyển sang oracle dựa trên phong bì { data, errors }. Hiểu single endpoint, HTTP 200 kể cả khi lỗi, partial data, nullability, biến và phân quyền theo field là nền tảng để viết test đúng và bền. Kết hợp graphql-request, supertest, Playwright và Postman theo từng tầng, luôn phủ cả happy path lẫn ca âm, và đo N+1 với dữ liệu đủ lớn. Dưới đây là checklist rút gọn để bạn dùng cho mọi bộ test GraphQL.",
        "Testing GraphQL queries and mutations requires leaving REST's status-code oracle and moving to the { data, errors } envelope oracle. Understanding the single endpoint, HTTP 200 even on errors, partial data, nullability, variables and per-field authz is the foundation for correct, durable tests. Combine graphql-request, supertest, Playwright and Postman per layer, always cover happy path and negative cases, and measure N+1 with a large enough dataset. Here is a concise checklist to use for every GraphQL test suite.",
        "GraphQLのqueryとmutationのテストには、RESTのステータスコードオラクルを離れ、{ data, errors }封筒オラクルへ移行することが必要です。単一エンドポイント、エラー時でもHTTP 200、部分データ、nullability、変数、フィールド単位の認可を理解することが、正しく耐久性のあるテストの基盤です。層ごとにgraphql-request、supertest、Playwright、Postmanを組み合わせ、常にハッピーパスと異常系をカバーし、十分大きなデータセットでN+1を測定します。以下はすべてのGraphQLテストスイートで使える簡潔なチェックリストです。",
      ),
      UL(
        [
          "Assert cả data lẫn errors — không bao giờ chỉ dựa vào status 200.",
          "Phủ happy path + ca âm (validate: biến thiếu/sai kiểu) + ca nghiệp vụ.",
          "Kiểm partial data & nullability: field lỗi null + errors đúng path.",
          "So khớp extensions.code thay vì message; kiểm rò rỉ trong message.",
          "Ma trận vai trò × field cho phân quyền; kiểm introspection off ở production.",
          "Đo N+1 và depth/complexity limit với dữ liệu lớn; dùng helper chuẩn hóa response.",
        ],
        [
          "Assert both data and errors — never rely on status 200 alone.",
          "Cover happy path + negative (validation: missing/wrong-typed variables) + business cases.",
          "Test partial data & nullability: failing field null + errors with correct path.",
          "Match extensions.code instead of message; check for leakage in messages.",
          "Role × field matrix for authz; verify introspection off in production.",
          "Measure N+1 and depth/complexity limits with large data; use a response-normalizing helper.",
        ],
        [
          "dataとerrorsの両方を検証 — ステータス200だけに頼らない。",
          "ハッピーパス＋異常系（検証：変数の不足・誤った型）＋業務ケースをカバー。",
          "部分データとnullabilityをテスト：失敗フィールドはnull＋正しいpathのerrors。",
          "messageではなくextensions.codeで照合。messageの漏洩を確認。",
          "認可のためのロール×フィールドマトリクス。本番でイントロスペクションが無効か検証。",
          "大きなデータでN+1と深さ・複雑度制限を測定。レスポンス正規化ヘルパーを使用。",
        ],
      ),
      NOTE(
        "Bài tiếp theo (schema & contract testing) sẽ nâng lên tầng hợp đồng: kiểm chính schema/SDL, phát hiện thay đổi phá vỡ bằng graphql-inspector, và contract theo hướng consumer-driven cho GraphQL trong CI.",
        "The next article (schema & contract testing) rises to the contract layer: validating the schema/SDL itself, detecting breaking changes with graphql-inspector, and consumer-driven contracts for GraphQL in CI.",
        "次の記事（スキーマと契約テスト）は契約層へ上がります。スキーマ・SDL自体の検証、graphql-inspectorによる破壊的変更の検出、CIでのGraphQL向けconsumer-driven契約テストです。",
      ),
    ],
  },
];

/* =========================================================================
   ARTICLE 2 — at-graphql-schema-contract (nangcao · saas)
   Schema-level & contract testing: SDL validation, breaking-change detection
   (graphql-inspector), nullability & deprecation, consumer-driven contracts,
   introspection-based checks, CI gate.
   ========================================================================= */

const svgSdl = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="24" y="32" fill="#7dd3fc" font-size="15" font-weight="800">Schema (SDL) là hợp đồng — nguồn sự thật kiểm thử</text>
<rect x="24" y="48" width="330" height="150" rx="10" fill="#0b1220" stroke="#334155"/>
<text x="42" y="74" fill="#a7f3d0" font-size="12" font-family="monospace">type Product {</text>
<text x="62" y="94" fill="#93c5fd" font-size="12" font-family="monospace">id: ID!</text>
<text x="62" y="114" fill="#93c5fd" font-size="12" font-family="monospace">title: String!</text>
<text x="62" y="134" fill="#f87171" font-size="12" font-family="monospace">sku: String  @deprecated</text>
<text x="62" y="154" fill="#93c5fd" font-size="12" font-family="monospace">price: Money!</text>
<text x="42" y="176" fill="#a7f3d0" font-size="12" font-family="monospace">}</text>
<rect x="380" y="48" width="316" height="150" rx="10" fill="#111827" stroke="#334155"/>
<text x="398" y="74" fill="#f1f5f9" font-size="12" font-weight="700">Kiểm ở tầng hợp đồng</text>
<text x="398" y="98" fill="#94a3b8" font-size="11">• SDL build hợp lệ (buildSchema)</text>
<text x="398" y="118" fill="#94a3b8" font-size="11">• nullability &amp; @deprecated đúng</text>
<text x="398" y="138" fill="#94a3b8" font-size="11">• diff phát hiện breaking change</text>
<text x="398" y="158" fill="#94a3b8" font-size="11">• introspection khớp SDL đã duyệt</text>
<text x="398" y="182" fill="#fbbf24" font-size="11">CI gate chặn merge nếu phá vỡ</text>
</svg>`;

const svgBreaking = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="24" y="32" fill="#7dd3fc" font-size="15" font-weight="800">Phân loại thay đổi schema (graphql-inspector)</text>
<rect x="24" y="48" width="216" height="150" rx="10" fill="#052e16" stroke="#166534"/>
<text x="40" y="72" fill="#34d399" font-size="13" font-weight="800">NON-BREAKING</text>
<text x="40" y="96" fill="#d1fae5" font-size="11">+ field mới (nullable)</text>
<text x="40" y="116" fill="#d1fae5" font-size="11">+ type mới</text>
<text x="40" y="136" fill="#d1fae5" font-size="11">+ enum value mới (input?)</text>
<text x="40" y="164" fill="#a7f3d0" font-size="11">CI: pass ✓</text>
<rect x="252" y="48" width="216" height="150" rx="10" fill="#3b2f0a" stroke="#a16207"/>
<text x="268" y="72" fill="#fbbf24" font-size="13" font-weight="800">DANGEROUS</text>
<text x="268" y="96" fill="#fef3c7" font-size="11">thêm @deprecated</text>
<text x="268" y="116" fill="#fef3c7" font-size="11">đổi default arg</text>
<text x="268" y="136" fill="#fef3c7" font-size="11">enum value có thể vỡ</text>
<text x="268" y="164" fill="#fde68a" font-size="11">CI: cảnh báo, review</text>
<rect x="480" y="48" width="216" height="150" rx="10" fill="#450a0a" stroke="#b91c1c"/>
<text x="496" y="72" fill="#f87171" font-size="13" font-weight="800">BREAKING</text>
<text x="496" y="96" fill="#fecaca" font-size="11">xóa field / type</text>
<text x="496" y="116" fill="#fecaca" font-size="11">đổi kiểu field</text>
<text x="496" y="136" fill="#fecaca" font-size="11">nullable → non-null (arg)</text>
<text x="496" y="164" fill="#fca5a5" font-size="11">CI: fail ✗ chặn merge</text>
</svg>`;

const a2_pages = [
  {
    heading: {
      vi: "1. Từ kiểm operation đến kiểm hợp đồng",
      en: "1. From testing operations to testing the contract",
      ja: "1. 操作のテストから契約のテストへ",
    },
    blocks: [
      P(
        "Ở tầng operation, ta kiểm từng query và mutation trả đúng data và errors. Nhưng khi một API GraphQL phục vụ nhiều nhóm client (web, mobile, đối tác), rủi ro lớn nhất không phải một resolver sai mà là một thay đổi schema vô tình phá vỡ client đang chạy. Vì hợp đồng của GraphQL nằm trọn trong schema, ta có thể kiểm chính schema như một tài sản kiểm thử: nó có build hợp lệ không, nullability và deprecation có đúng chủ đích không, và một thay đổi mới có phá vỡ phiên bản trước không. Đây là tầng kiểm hợp đồng (contract testing) — trọng tâm của bài nâng cao này, đặt trong bối cảnh một nền tảng SaaS đa client.",
        "At the operation layer we check each query and mutation returns the right data and errors. But when a GraphQL API serves many client groups (web, mobile, partners), the biggest risk is not a wrong resolver but a schema change that accidentally breaks a running client. Because GraphQL's contract lives entirely in the schema, we can test the schema itself as a testing asset: does it build validly, are nullability and deprecation intentional, and does a new change break the previous version? This is the contract-testing layer — the focus of this advanced article, set in the context of a multi-client SaaS platform.",
        "操作層では各queryとmutationが正しいdataとerrorsを返すか確認します。しかしGraphQL APIが多くのクライアントグループ（Web、モバイル、パートナー）に提供される場合、最大のリスクは誤ったリゾルバではなく、稼働中のクライアントを誤って壊すスキーマ変更です。GraphQLの契約はスキーマに完全に存在するため、スキーマ自体をテスト資産としてテストできます。妥当にビルドされるか、nullabilityとdeprecationが意図的か、新しい変更が前のバージョンを壊さないかです。これが契約テスト層であり、マルチクライアントSaaSプラットフォームの文脈に置いた本応用記事の焦点です。",
      ),
      IMG(svgSdl, "Schema SDL là hợp đồng và các loại kiểm ở tầng hợp đồng", "The SDL schema as contract and the checks at the contract layer", "契約としてのSDLスキーマと契約層でのチェック"),
      NOTE(
        "SDL (Schema Definition Language) là cú pháp văn bản mô tả schema GraphQL: type, field, kiểu, nullability (dấu !), directive như @deprecated. Ta có thể lưu SDL vào repo và version-control như một hợp đồng công khai.",
        "SDL (Schema Definition Language) is the textual syntax describing a GraphQL schema: types, fields, types, nullability (the ! mark), directives like @deprecated. We can commit SDL to the repo and version-control it as a public contract.",
        "SDL（Schema Definition Language）はGraphQLスキーマを記述するテキスト構文です。型、フィールド、型、nullability（!記号）、@deprecatedのようなディレクティブを表します。SDLをリポジトリにコミットし、公開契約としてバージョン管理できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Vì sao schema là bề mặt kiểm thử tối quan trọng",
      en: "2. Why the schema is the critical test surface",
      ja: "2. なぜスキーマが極めて重要なテスト対象なのか",
    },
    blocks: [
      P(
        "Trong REST, hợp đồng thường rải rác qua tài liệu OpenAPI, và việc phá vỡ có thể âm thầm. Với GraphQL, schema là một artifact máy đọc được, có cấu trúc, cho phép so sánh (diff) hai phiên bản một cách chính xác. Nhờ đó, phát hiện thay đổi phá vỡ trở nên tự động hóa được. Với Tester, điều này mở ra một loại test cực kỳ giá trị mà REST khó có: mỗi lần đội dev sửa schema, ta so nó với phiên bản đã duyệt và phân loại thay đổi. Xóa một field mà client đang dùng, đổi kiểu, hay biến một argument từ nullable thành bắt buộc — tất cả là breaking và phải bị chặn trước khi lên production.",
        "In REST the contract is often scattered across OpenAPI docs, and breakage can be silent. With GraphQL the schema is a machine-readable, structured artifact allowing precise diffing of two versions. This makes breaking-change detection automatable. For a tester this opens an extremely valuable kind of test REST rarely has: every time devs change the schema, we diff it against the approved version and classify the change. Removing a field a client uses, changing a type, or turning an argument from nullable to required — all are breaking and must be blocked before production.",
        "RESTでは契約がOpenAPIドキュメントに散らばることが多く、破壊が静かに起こりえます。GraphQLではスキーマが機械可読で構造化されたアーティファクトであり、2つのバージョンの正確な差分を可能にします。これにより破壊的変更の検出が自動化できます。テスターにとってこれはRESTがめったに持たない極めて価値あるテストを開きます。開発者がスキーマを変更するたびに、承認済みバージョンと差分を取り変更を分類します。クライアントが使うフィールドの削除、型の変更、引数をnullableから必須にすること — すべて破壊的で本番前に阻止しなければなりません。",
      ),
      CODE("graphql", `# schema.graphql — SDL được version-control như hợp đồng công khai
type Query {
  workspace(id: ID!): Workspace
  plans: [Plan!]!
}

type Workspace {
  id: ID!
  name: String!
  seats: Int!
  legacyKey: String @deprecated(reason: "Dùng apiKey thay thế")
  apiKey: String!
}

type Plan { id: ID!  name: String!  monthlyPrice: Int! }`),
      TIP(
        "Coi schema.graphql như một hợp đồng được review trong pull request. Mọi thay đổi schema phải đi kèm diff dễ đọc để reviewer thấy ngay điều gì được thêm, đánh dấu deprecated hay xóa.",
        "Treat schema.graphql as a contract reviewed in the pull request. Every schema change must ship with a readable diff so reviewers immediately see what was added, deprecated or removed.",
        "schema.graphqlをプルリクエストでレビューされる契約として扱いましょう。すべてのスキーマ変更は読みやすい差分を伴い、レビュアーが追加・非推奨化・削除されたものを即座に把握できるようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Kiểm tính hợp lệ của SDL",
      en: "3. Validating the SDL",
      ja: "3. SDLの妥当性検証",
    },
    blocks: [
      P(
        "Kiểm cơ bản nhất ở tầng hợp đồng là: SDL có build được thành schema hợp lệ không. Thư viện graphql (graphql-js) cung cấp buildSchema để dựng schema từ chuỗi SDL; nếu có lỗi cú pháp, tham chiếu kiểu không tồn tại, hoặc vi phạm quy tắc, nó sẽ ném lỗi. Đây là một smoke test rẻ mà mọi dự án GraphQL nên có: chạy trước khi triển khai để chắc chắn schema không hỏng. Ngoài build, ta có thể duyệt qua type map để khẳng định các type và field bắt buộc tồn tại đúng như hợp đồng mong đợi.",
        "The most basic contract-layer check is: does the SDL build into a valid schema? The graphql (graphql-js) library provides buildSchema to construct a schema from an SDL string; if there is a syntax error, a reference to a non-existent type, or a rule violation, it throws. This is a cheap smoke test every GraphQL project should have: run it before deployment to ensure the schema is not broken. Beyond building, we can walk the type map to assert required types and fields exist exactly as the contract expects.",
        "契約層で最も基本的なチェックは、SDLが妥当なスキーマにビルドされるかです。graphql（graphql-js）ライブラリはSDL文字列からスキーマを構築するbuildSchemaを提供します。構文エラー、存在しない型への参照、ルール違反があれば例外を投げます。これはすべてのGraphQLプロジェクトが持つべき安価なスモークテストです。デプロイ前に実行してスキーマが壊れていないことを保証します。ビルド以外にも、型マップを走査して必須の型とフィールドが契約の期待通りに存在することを検証できます。",
      ),
      CODE("javascript", `// Smoke test SDL: build được + type/field bắt buộc tồn tại
import { readFileSync } from "node:fs";
import { buildSchema } from "graphql";

test("SDL build hợp lệ và có type bắt buộc", () => {
  const sdl = readFileSync("./schema.graphql", "utf8");
  const schema = buildSchema(sdl);          // ném lỗi nếu SDL sai

  const Workspace = schema.getType("Workspace");
  expect(Workspace).toBeDefined();
  const fields = Workspace.getFields();
  expect(fields.id).toBeDefined();
  expect(fields.apiKey).toBeDefined();
  // apiKey phải non-null theo hợp đồng
  expect(String(fields.apiKey.type)).toBe("String!");
});`),
      P(
        "Việc assert String(fields.apiKey.type) === 'String!' minh họa cách kiểm nullability ở cấp hợp đồng: dấu ! nghĩa là non-null. Một field đổi từ String! sang String (bỏ non-null) tưởng vô hại cho phía server nhưng lại có thể phá client vốn giả định trường luôn có giá trị. Ngược lại, một argument đổi từ nullable sang non-null là breaking cho caller. Kiểm nullability tường minh giúp bắt sớm các thay đổi tinh vi này.",
        "Asserting String(fields.apiKey.type) === 'String!' shows how to test nullability at the contract level: the ! means non-null. A field changing from String! to String (dropping non-null) may look harmless for the server yet can break a client that assumed the field always has a value. Conversely, an argument changing from nullable to non-null is breaking for callers. Explicit nullability checks catch these subtle changes early.",
        "String(fields.apiKey.type) === 'String!'の検証は契約レベルでnullabilityをテストする方法を示します。!はnon-nullを意味します。フィールドがString!からString（non-nullを外す）に変わることはサーバー側では無害に見えても、フィールドが常に値を持つと仮定したクライアントを壊しかねません。逆に、引数がnullableからnon-nullに変わることは呼び出し側にとって破壊的です。明示的なnullabilityチェックはこれらの微妙な変更を早期に捕捉します。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Nullability & deprecation — kiểm chủ đích thiết kế",
      en: "4. Nullability & deprecation — testing design intent",
      ja: "4. nullabilityとdeprecation — 設計意図のテスト",
    },
    blocks: [
      P(
        "Nullability trong GraphQL không chỉ là chi tiết kỹ thuật mà là quyết định thiết kế hợp đồng. Một field non-null (kiểu T!) hứa với client rằng nó không bao giờ null; nếu resolver trả null cho field non-null, cả object cha có thể bị null-hóa (bubble up), gây lỗi lan rộng. Vì thế, Tester nên kiểm rằng những field cam kết non-null thực sự luôn có giá trị dưới mọi ca (kể cả ca lỗi phụ), và những field có thể vắng mặt hợp lệ được khai nullable. Deprecation qua directive @deprecated là cách báo cho client rằng một field sắp bị gỡ; kiểm rằng field deprecated vẫn hoạt động (chưa xóa) và lý do deprecation được nêu rõ.",
        "Nullability in GraphQL is not just a technical detail but a contract design decision. A non-null field (type T!) promises the client it is never null; if a resolver returns null for a non-null field, the whole parent object can be nulled (bubble up), causing widespread errors. So a tester should check that fields promised non-null actually always have a value under every case (including auxiliary-error cases), and that fields that may legitimately be absent are declared nullable. Deprecation via the @deprecated directive tells the client a field will be removed; test that a deprecated field still works (not yet removed) and its deprecation reason is stated.",
        "GraphQLのnullabilityは単なる技術的詳細ではなく契約設計の決定です。non-nullフィールド（型T!）はクライアントに決してnullにならないと約束します。リゾルバがnon-nullフィールドにnullを返すと、親オブジェクト全体がnull化され（バブルアップ）、広範なエラーを引き起こします。したがってテスターは、non-nullを約束したフィールドがあらゆるケース（補助的エラーケースを含む）で実際に常に値を持つこと、正当に欠落しうるフィールドがnullableと宣言されていることを確認すべきです。@deprecatedディレクティブによるdeprecationはフィールドが削除予定であることをクライアントに伝えます。deprecatedフィールドがまだ動作すること（未削除）と非推奨理由が明記されていることをテストします。",
      ),
      CODE("javascript", `// Kiểm deprecation: field deprecated vẫn tồn tại + có reason
test("legacyKey được đánh @deprecated với lý do rõ ràng", () => {
  const schema = buildSchema(readFileSync("./schema.graphql", "utf8"));
  const f = schema.getType("Workspace").getFields().legacyKey;
  expect(f).toBeDefined();                 // chưa xóa -> client cũ còn dùng được
  expect(f.deprecationReason).toBe("Dùng apiKey thay thế");
});

// Kiểm non-null contract giữ vững ngay cả khi field phụ lỗi
test("seats luôn có giá trị (non-null) dù analytics lỗi", async () => {
  const res = await request(app).post("/graphql").send({
    query: "query($id:ID!){ workspace(id:$id){ seats analytics{ mrr } } }",
    variables: { id: "w1" },
  }).expect(200);
  expect(res.body.data.workspace.seats).toBe(25);       // non-null giữ nguyên
  expect(res.body.data.workspace.analytics).toBeNull(); // field phụ nullable
});`),
      WARN(
        "Đừng khai non-null cho field mà nguồn dữ liệu có thể thiếu. Non-null đặt sai chỗ khiến một lỗi cục bộ bubble up làm null cả object cha, biến một sự cố nhỏ thành lỗi toàn cục. Kiểm nullability là kiểm mức chịu lỗi của hợp đồng.",
        "Do not declare non-null for a field whose data source may be missing. A misplaced non-null makes a local error bubble up and null the whole parent object, turning a small incident into a global failure. Testing nullability is testing the contract's fault tolerance.",
        "データソースが欠落しうるフィールドをnon-nullと宣言してはいけません。誤って配置されたnon-nullはローカルなエラーをバブルアップさせ親オブジェクト全体をnull化し、小さな事故を全体的な障害に変えます。nullabilityのテストは契約の耐障害性のテストです。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Phát hiện thay đổi phá vỡ với graphql-inspector",
      en: "5. Detecting breaking changes with graphql-inspector",
      ja: "5. graphql-inspectorによる破壊的変更の検出",
    },
    blocks: [
      P(
        "graphql-inspector là công cụ chuyên so sánh hai schema và phân loại từng thay đổi thành ba mức: non-breaking (an toàn, ví dụ thêm field nullable mới), dangerous (có thể vỡ tùy cách dùng, ví dụ thêm @deprecated hay đổi default của argument), và breaking (chắc chắn phá client, ví dụ xóa field, đổi kiểu, hay đổi một argument thành bắt buộc). Đây là xương sống của kiểm hợp đồng cho GraphQL: so schema mới trong nhánh với schema baseline đã duyệt, rồi để CI quyết định pass/warn/fail theo mức nghiêm trọng.",
        "graphql-inspector is a tool dedicated to comparing two schemas and classifying each change into three levels: non-breaking (safe, e.g. adding a new nullable field), dangerous (may break depending on usage, e.g. adding @deprecated or changing an argument default), and breaking (definitely breaks clients, e.g. removing a field, changing a type, or making an argument required). This is the backbone of contract testing for GraphQL: diff the new schema in a branch against the approved baseline, then let CI decide pass/warn/fail by severity.",
        "graphql-inspectorは2つのスキーマを比較し各変更を3つのレベルに分類する専用ツールです。non-breaking（安全、例：新しいnullableフィールドの追加）、dangerous（使い方次第で壊れうる、例：@deprecatedの追加や引数のデフォルト変更）、breaking（確実にクライアントを壊す、例：フィールド削除、型変更、引数を必須にする）です。これはGraphQLの契約テストの背骨です。ブランチの新しいスキーマを承認済みベースラインと差分し、CIが深刻度に応じてpass/warn/failを決定します。",
      ),
      IMG(svgBreaking, "Phân loại thay đổi schema: non-breaking / dangerous / breaking", "Schema change classification: non-breaking / dangerous / breaking", "スキーマ変更の分類：non-breaking / dangerous / breaking"),
      CODE("bash", `# CLI graphql-inspector: so schema mới với baseline, fail nếu có breaking
npx @graphql-inspector/cli diff \\
  schema.baseline.graphql schema.graphql

# Ví dụ output:
#   ✖  Field 'Workspace.legacyKey' was removed          (breaking)
#   ⚠  Field 'Plan.trialDays' was deprecated            (dangerous)
#   ✔  Field 'Workspace.region' was added (nullable)    (non-breaking)
# Có breaking -> exit code != 0 -> CI fail`),
      CODE("javascript", `// Dùng graphql-inspector theo API để assert trong test
import { diff } from "@graphql-inspector/core";
import { buildSchema } from "graphql";

test("không có thay đổi BREAKING so với baseline", async () => {
  const before = buildSchema(readFileSync("./schema.baseline.graphql","utf8"));
  const after  = buildSchema(readFileSync("./schema.graphql","utf8"));
  const changes = await diff(before, after);
  const breaking = changes.filter(c => c.criticality.level === "BREAKING");
  expect(breaking).toEqual([]);   // chặn merge nếu có breaking
});`),
      NOTE(
        "Thêm field non-null mới vào một input type là breaking (client cũ không gửi field đó sẽ bị từ chối), trong khi thêm field non-null vào một output type lại non-breaking. graphql-inspector hiểu sự khác biệt này — đừng tự suy luận thủ công.",
        "Adding a new non-null field to an input type is breaking (old clients not sending it get rejected), whereas adding a non-null field to an output type is non-breaking. graphql-inspector understands this distinction — do not reason it out manually.",
        "input型に新しいnon-nullフィールドを追加するのは破壊的です（それを送らない古いクライアントは拒否されます）。一方、output型にnon-nullフィールドを追加するのはnon-breakingです。graphql-inspectorはこの区別を理解します。手動で推論しないでください。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Kiểm qua introspection — schema đang chạy khớp hợp đồng",
      en: "6. Checking via introspection — the running schema matches the contract",
      ja: "6. イントロスペクションによるチェック — 稼働中スキーマが契約と一致",
    },
    blocks: [
      P(
        "Đôi khi SDL trong repo và schema thực đang chạy trên server có thể lệch nhau (ví dụ do cấu hình khác nhau giữa môi trường, hoặc directive áp lúc runtime). Introspection cho phép truy vấn schema thực từ chính server đang chạy qua các trường meta như __schema và __type. Ta có thể chạy một introspection query, dựng lại schema từ kết quả, rồi diff với SDL đã duyệt để chắc rằng server đang phơi ra đúng hợp đồng. Đây là một dạng kiểm tích hợp mạnh: nó bắt được cả những lệch mà kiểm SDL tĩnh bỏ sót.",
        "Sometimes the SDL in the repo and the actual schema running on the server can drift (e.g. due to different config across environments, or directives applied at runtime). Introspection lets you query the real schema from the running server via meta fields like __schema and __type. We can run an introspection query, rebuild a schema from the result, then diff it against the approved SDL to ensure the server exposes exactly the contract. This is a strong integration check: it catches drifts that static SDL checks miss.",
        "リポジトリのSDLとサーバーで実際に稼働中のスキーマがずれることがあります（環境間の設定の違いや、実行時に適用されるディレクティブなどによる）。イントロスペクションは__schemaや__typeのようなメタフィールドを通じて稼働中サーバーから実際のスキーマを照会できます。イントロスペクションクエリを実行し、結果からスキーマを再構築し、承認済みSDLと差分してサーバーが正確に契約を公開していることを確認できます。これは強力な統合チェックで、静的SDLチェックが見逃すずれを捕捉します。",
      ),
      CODE("javascript", `// Introspection: lấy schema đang chạy, so với SDL baseline
import { getIntrospectionQuery, buildClientSchema, buildSchema } from "graphql";
import { diff } from "@graphql-inspector/core";

test("schema đang chạy KHỚP SDL đã duyệt", async () => {
  const res = await request(app).post("/graphql")
    .send({ query: getIntrospectionQuery() }).expect(200);

  const live = buildClientSchema(res.body.data);            // schema từ server
  const baseline = buildSchema(readFileSync("./schema.graphql","utf8"));
  const changes = await diff(baseline, live);
  const breaking = changes.filter(c => c.criticality.level === "BREAKING");
  expect(breaking).toEqual([]);   // server không được lệch hợp đồng
});`),
      TIP(
        "Ở production nên tắt introspection để giảm bề mặt tấn công. Chạy kiểm introspection ở môi trường staging (nơi bật) trong pipeline, và có một ca riêng assert introspection thực sự bị tắt ở production.",
        "In production disable introspection to reduce attack surface. Run the introspection check in staging (where it is on) in the pipeline, and have a dedicated case asserting introspection is really off in production.",
        "本番では攻撃対象領域を減らすためイントロスペクションを無効化すべきです。パイプラインではステージング（有効な環境）でイントロスペクションチェックを実行し、本番でイントロスペクションが本当に無効であることを検証する専用ケースを持ちます。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Contract testing hướng consumer cho GraphQL",
      en: "7. Consumer-driven contract testing for GraphQL",
      ja: "7. GraphQL向けconsumer-driven契約テスト",
    },
    blocks: [
      P(
        "Diff schema bắt mọi thay đổi breaking, nhưng đôi khi một thay đổi kỹ thuật là breaking lại chẳng ảnh hưởng client nào vì không ai dùng field đó. Contract testing hướng consumer (consumer-driven) đảo ngược góc nhìn: mỗi client (consumer) khai báo tập operation và field nó thực sự dùng; phía provider kiểm rằng schema mới vẫn thỏa mãn mọi consumer đó. Cách tiếp cận thực dụng cho GraphQL là thu thập các operation client dùng (từ code hoặc từ log persisted queries), rồi validate từng operation với schema mới bằng hàm validate của graphql-js. Nếu operation nào không còn hợp lệ, đó là breaking THẬT SỰ với một consumer cụ thể.",
        "Schema diff catches every breaking change, but sometimes a technically breaking change affects no client because nobody uses that field. Consumer-driven contract testing flips the view: each client (consumer) declares the set of operations and fields it actually uses; the provider checks that the new schema still satisfies every consumer. A pragmatic GraphQL approach is to collect the operations clients use (from code or from persisted-query logs), then validate each operation against the new schema using graphql-js's validate. If any operation is no longer valid, that is a REAL breaking change for a specific consumer.",
        "スキーマ差分はすべての破壊的変更を捕捉しますが、技術的には破壊的な変更でも誰もそのフィールドを使わないためどのクライアントにも影響しないことがあります。consumer-driven契約テストは視点を反転させます。各クライアント（コンシューマー）は実際に使う操作とフィールドの集合を宣言し、プロバイダーは新しいスキーマがすべてのコンシューマーを満たすことを確認します。GraphQLの実用的なアプローチは、クライアントが使う操作を（コードや永続化クエリのログから）収集し、graphql-jsのvalidateで各操作を新しいスキーマに対して検証することです。ある操作が妥当でなくなれば、それは特定のコンシューマーにとって本当の破壊的変更です。",
      ),
      CODE("javascript", `// Consumer-driven: mỗi client khai operation nó dùng, validate với schema mới
import { buildSchema, parse, validate } from "graphql";

const consumerOps = {
  "mobile-app": "query{ workspace(id:\\"w1\\"){ id name apiKey } }",
  "partner-api": "query{ plans{ id name monthlyPrice } }",
};

test("schema mới thỏa mãn MỌI consumer đã đăng ký", () => {
  const schema = buildSchema(readFileSync("./schema.graphql","utf8"));
  for (const [name, op] of Object.entries(consumerOps)) {
    const errors = validate(schema, parse(op));   // rỗng = operation hợp lệ
    expect(errors).toEqual([]);                    // fail nếu client này bị phá
  }
});`),
      SCEN(
        "Xóa field an toàn nhờ contract consumer",
        "Safely removing a field thanks to consumer contracts",
        "Đội SaaS muốn xóa field legacyKey đã deprecated từ lâu. Diff schema báo đây là breaking. Nhưng khi chạy bộ contract consumer, không operation nào của các client đăng ký còn dùng legacyKey — chứng tỏ mọi consumer đã chuyển sang apiKey. Nhờ vậy đội tự tin gỡ field: CI cảnh báo breaking ở diff nhưng cổng contract consumer xanh, và họ ra quyết định dựa trên dữ liệu thật thay vì phỏng đoán.",
        "The SaaS team wanted to remove the long-deprecated legacyKey field. The schema diff flagged it as breaking. But running the consumer contract suite, no operation from registered clients still used legacyKey — proving every consumer had moved to apiKey. So the team confidently removed the field: CI warned breaking on the diff but the consumer-contract gate was green, and they decided from real data instead of guessing.",
        "SaaSチームは長らく非推奨だったlegacyKeyフィールドを削除したいと考えました。スキーマ差分はこれを破壊的として警告しました。しかしコンシューマー契約スイートを実行すると、登録済みクライアントのどの操作もlegacyKeyをまだ使っていませんでした。すべてのコンシューマーがapiKeyに移行済みだと証明されたのです。そこでチームは自信を持ってフィールドを削除しました。CIは差分で破壊的と警告しましたが、コンシューマー契約ゲートは緑で、彼らは推測ではなく実データに基づいて決定しました。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Cổng CI cho hợp đồng schema",
      en: "8. A CI gate for the schema contract",
      ja: "8. スキーマ契約のためのCIゲート",
    },
    blocks: [
      P(
        "Giá trị thật của kiểm hợp đồng đến khi nó chạy tự động trong CI trên mỗi pull request. Một cổng CI điển hình gồm các bước: build SDL để chắc hợp lệ; diff với baseline bằng graphql-inspector và fail nếu có breaking (warn nếu dangerous); chạy bộ contract consumer để xác nhận không client nào bị phá; và tùy chọn kiểm introspection ở staging để bắt lệch runtime. Khi một PR cố tình đưa breaking change, đội phải chủ động cập nhật baseline và thông báo cho các consumer — biến thay đổi phá vỡ thành một quyết định có kiểm soát thay vì tai nạn.",
        "The real value of contract testing comes when it runs automatically in CI on every pull request. A typical CI gate has steps: build the SDL to ensure validity; diff against baseline with graphql-inspector and fail on breaking (warn on dangerous); run the consumer contract suite to confirm no client is broken; and optionally check introspection in staging to catch runtime drift. When a PR intentionally introduces a breaking change, the team must deliberately update the baseline and notify consumers — turning a breaking change into a controlled decision rather than an accident.",
        "契約テストの真の価値は、すべてのプルリクエストでCIで自動実行されるときに生まれます。典型的なCIゲートには次のステップがあります。SDLをビルドして妥当性を保証する。graphql-inspectorでベースラインと差分し破壊的なら失敗させる（dangerousなら警告）。コンシューマー契約スイートを実行しどのクライアントも壊れていないことを確認する。任意でステージングのイントロスペクションをチェックし実行時のずれを捕捉する。PRが意図的に破壊的変更を導入する場合、チームは意図的にベースラインを更新しコンシューマーに通知しなければなりません。破壊的変更を事故ではなく管理された決定に変えるのです。",
      ),
      CODE("yaml", `# .github/workflows/graphql-contract.yml — cổng hợp đồng trong CI
name: graphql-contract
on: [pull_request]
jobs:
  contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      # 1) SDL hợp lệ + nullability/deprecation + consumer contract
      - run: npm test -- schema
      # 2) Diff phát hiện breaking change so với baseline
      - run: npx @graphql-inspector/cli diff schema.baseline.graphql schema.graphql
      # exit code != 0 khi có breaking -> chặn merge`),
      UL(
        [
          "Build SDL: chặn schema hỏng lọt vào nhánh chính.",
          "Diff baseline: fail khi breaking, warn khi dangerous.",
          "Consumer contract: xác nhận operation của mọi client vẫn hợp lệ.",
          "Introspection ở staging: bắt lệch giữa hợp đồng và server thực.",
          "Cập nhật baseline có chủ đích khi breaking là cố ý, kèm thông báo consumer.",
        ],
        [
          "Build the SDL: block a broken schema from reaching the main branch.",
          "Diff baseline: fail on breaking, warn on dangerous.",
          "Consumer contract: confirm every client's operations remain valid.",
          "Introspection in staging: catch drift between contract and real server.",
          "Update the baseline deliberately when breaking is intended, with consumer notice.",
        ],
        [
          "SDLをビルド：壊れたスキーマがメインブランチに到達するのを阻止する。",
          "ベースライン差分：破壊的なら失敗、dangerousなら警告する。",
          "コンシューマー契約：すべてのクライアントの操作が妥当なままか確認する。",
          "ステージングのイントロスペクション：契約と実サーバー間のずれを捕捉する。",
          "破壊的が意図的な場合はコンシューマー通知とともにベースラインを意図的に更新する。",
        ],
      ),
    ],
  },
  {
    heading: {
      vi: "9. So sánh chiến lược contract: GraphQL vs REST (PACT)",
      en: "9. Comparing contract strategies: GraphQL vs REST (PACT)",
      ja: "9. 契約戦略の比較：GraphQL vs REST（PACT）",
    },
    blocks: [
      P(
        "Trong thế giới REST/microservices, contract testing thường dùng PACT: consumer ghi lại kỳ vọng dưới dạng pact file, provider phát lại để xác nhận. GraphQL có thể dùng PACT nhưng thường không phải cách tự nhiên nhất, vì hợp đồng đã có sẵn ở schema. Với GraphQL, cách bản địa là kết hợp schema diff (bắt breaking ở cấp cấu trúc) với validate operation của từng consumer (bắt breaking thực tế theo cách dùng). Hiểu điểm khác biệt này giúp Tester chọn đúng công cụ thay vì áp máy móc mô hình REST lên GraphQL.",
        "In the REST/microservices world, contract testing often uses PACT: the consumer records expectations as a pact file, the provider replays it to verify. GraphQL can use PACT but it is usually not the most natural fit, because the contract already exists in the schema. For GraphQL the native way combines schema diff (catching breaking at the structural level) with validating each consumer's operations (catching real breaking by usage). Understanding this difference helps testers pick the right tool instead of mechanically forcing the REST model onto GraphQL.",
        "REST・マイクロサービスの世界では、契約テストにPACTがよく使われます。コンシューマーが期待をpactファイルとして記録し、プロバイダーがそれを再生して検証します。GraphQLはPACTを使えますが、通常は最も自然な適合ではありません。契約がすでにスキーマに存在するからです。GraphQLの本来の方法は、スキーマ差分（構造レベルで破壊的を捕捉）と各コンシューマーの操作の検証（使い方による実際の破壊的を捕捉）を組み合わせることです。この違いを理解することで、テスターはRESTモデルを機械的にGraphQLに押し付けるのではなく、正しいツールを選べます。",
      ),
      UL(
        [
          "PACT (REST): pact file mô tả request/response mong đợi; hợp đồng phải tự dựng.",
          "GraphQL: hợp đồng CÓ SẴN trong schema — tận dụng diff thay vì viết lại từ đầu.",
          "GraphQL native: schema diff + validate operation consumer = bao phủ cả cấu trúc lẫn cách dùng.",
          "Vẫn dùng được PACT cho GraphQL nếu tổ chức đã chuẩn hóa quanh nó, nhưng cân nhắc chi phí.",
        ],
        [
          "PACT (REST): a pact file describes expected request/response; the contract must be built.",
          "GraphQL: the contract ALREADY exists in the schema — leverage the diff instead of rewriting.",
          "GraphQL native: schema diff + validating consumer operations = covers structure and usage.",
          "PACT still works for GraphQL if the org standardized on it, but weigh the cost.",
        ],
        [
          "PACT（REST）：pactファイルが期待されるリクエスト・レスポンスを記述する。契約を構築しなければならない。",
          "GraphQL：契約はすでにスキーマに存在する — 書き直す代わりに差分を活用する。",
          "GraphQLネイティブ：スキーマ差分＋コンシューマー操作の検証＝構造と使い方の両方をカバー。",
          "組織がPACTで標準化していればGraphQLでも使えるが、コストを考慮する。",
        ],
      ),
      NOTE(
        "Một số nền tảng schema registry (như Apollo hoặc GraphQL Hub) tự động lưu lịch sử schema, chạy checks trên mỗi thay đổi và theo dõi operation thực tế từ client. Chúng công nghiệp hóa chính ý tưởng trong bài này ở quy mô lớn.",
        "Some schema registry platforms (like Apollo or a GraphQL hub) automatically store schema history, run checks on each change and track real operations from clients. They industrialize exactly the ideas in this article at scale.",
        "一部のスキーマレジストリプラットフォーム（ApolloやGraphQLハブなど）はスキーマ履歴を自動保存し、各変更でチェックを実行し、クライアントからの実際の操作を追跡します。本記事の考えをまさに大規模に工業化するものです。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Bẫy & cạm bẫy ở tầng hợp đồng",
      en: "10. Traps & pitfalls at the contract layer",
      ja: "10. 契約層の罠と落とし穴",
    },
    blocks: [
      P(
        "Kiểm hợp đồng schema nghe gọn gàng nhưng có nhiều cạm bẫy tinh vi khiến cổng CI hoặc quá lỏng (bỏ lọt breaking) hoặc quá chặt (chặn nhầm thay đổi an toàn). Dưới đây là các bẫy thường gặp mà đội SaaS đã rút ra, giúp bạn thiết kế cổng hợp đồng vừa an toàn vừa không cản trở tiến độ.",
        "Schema contract testing sounds tidy but has many subtle pitfalls that make the CI gate either too loose (letting breaking slip through) or too strict (wrongly blocking safe changes). Below are common traps the SaaS team learned, helping you design a contract gate that is both safe and non-obstructive.",
        "スキーマ契約テストはきちんとして聞こえますが、CIゲートを緩すぎる（破壊的を通す）または厳しすぎる（安全な変更を誤って阻止する）ものにする微妙な落とし穴が多くあります。以下はSaaSチームが学んだよくある罠で、安全かつ妨げにならない契約ゲートの設計に役立ちます。",
      ),
      UL(
        [
          "Không có baseline được version-control — không thể diff, mất khả năng bắt breaking.",
          "Coi mọi breaking là fail cứng — chặn cả thay đổi mà không consumer nào dùng; hãy kết hợp contract consumer.",
          "Bỏ qua khác biệt input vs output khi thêm field non-null — tự suy luận sai; dùng công cụ.",
          "Chỉ kiểm SDL tĩnh, quên introspection — bỏ lọt lệch runtime giữa hợp đồng và server.",
          "Deprecation không có kế hoạch gỡ — field @deprecated tồn tại mãi, schema phình to.",
          "Quên cập nhật baseline khi breaking là cố ý — CI kẹt đỏ, đội bắt đầu bỏ qua cảnh báo.",
        ],
        [
          "No version-controlled baseline — cannot diff, losing the ability to catch breaking.",
          "Treating every breaking as a hard fail — blocks changes no consumer uses; combine with consumer contracts.",
          "Ignoring the input vs output difference when adding non-null fields — reasoning it out wrongly; use tooling.",
          "Only static SDL checks, forgetting introspection — missing runtime drift between contract and server.",
          "Deprecation with no removal plan — @deprecated fields linger forever, the schema bloats.",
          "Forgetting to update the baseline when breaking is intentional — CI stays red, the team starts ignoring warnings.",
        ],
        [
          "バージョン管理されたベースラインがない — 差分できず、破壊的を捕捉する能力を失う。",
          "すべての破壊的をハード失敗として扱う — どのコンシューマーも使わない変更を阻止する。コンシューマー契約と組み合わせる。",
          "non-nullフィールド追加時のinputとoutputの違いを無視 — 誤って推論する。ツールを使う。",
          "静的SDLチェックのみでイントロスペクションを忘れる — 契約とサーバー間の実行時ずれを見逃す。",
          "削除計画のないdeprecation — @deprecatedフィールドが永遠に残りスキーマが肥大化する。",
          "破壊的が意図的なときにベースライン更新を忘れる — CIが赤のままでチームが警告を無視し始める。",
        ],
      ),
      WARN(
        "Cổng CI đỏ liên tục vì lý do sai (baseline lạc hậu) còn nguy hiểm hơn không có cổng: đội sẽ học cách bỏ qua nó. Giữ baseline cập nhật và tách rõ warn (dangerous) với fail (breaking).",
        "A CI gate that stays red for the wrong reason (a stale baseline) is more dangerous than no gate: the team learns to ignore it. Keep the baseline current and clearly separate warn (dangerous) from fail (breaking).",
        "誤った理由（古いベースライン）で赤のままのCIゲートはゲートがないより危険です。チームがそれを無視することを学ぶからです。ベースラインを最新に保ち、warn（dangerous）とfail（breaking）を明確に分けます。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản thực chiến — nâng cấp gói SaaS không phá client",
      en: "11. Real scenario — evolving a SaaS plan without breaking clients",
      ja: "11. 実戦シナリオ — クライアントを壊さずにSaaSプランを進化させる",
    },
    blocks: [
      P(
        "Nền tảng SaaS cần đổi mô hình giá: field monthlyPrice: Int! sẽ được thay bằng một cấu trúc giá linh hoạt price { amount currency interval }. Đây là thay đổi lớn có nguy cơ phá cả web, mobile và đối tác. Đội áp dụng quy trình evolution an toàn: thêm cái mới song song, đánh dấu cái cũ deprecated, theo dõi consumer, rồi mới gỡ. Toàn bộ được canh gác bởi bộ kiểm hợp đồng đã dựng ở các chương trước. Đây là ví dụ điển hình cho thấy contract testing biến một thay đổi rủi ro thành một lộ trình có kiểm soát.",
        "The SaaS platform needs to change its pricing model: the monthlyPrice: Int! field will be replaced by a flexible price { amount currency interval } structure. This is a large change risking breakage of web, mobile and partners. The team applies a safe evolution process: add the new alongside, mark the old deprecated, monitor consumers, then remove. The whole thing is guarded by the contract-testing suite built in earlier chapters. This is a textbook example of contract testing turning a risky change into a controlled path.",
        "SaaSプラットフォームは価格モデルを変更する必要があります。monthlyPrice: Int!フィールドが柔軟な価格構造price { amount currency interval }に置き換えられます。これはWeb、モバイル、パートナーを壊すリスクのある大きな変更です。チームは安全な進化プロセスを適用します。新しいものを並行して追加し、古いものを非推奨とマークし、コンシューマーを監視し、それから削除します。全体が前章で構築した契約テストスイートで守られます。これは契約テストがリスクのある変更を管理された経路に変える典型例です。",
      ),
      CODE("graphql", `# Bước 1: thêm cấu trúc mới SONG SONG, deprecate cái cũ (non-breaking + dangerous)
type Plan {
  id: ID!
  name: String!
  monthlyPrice: Int! @deprecated(reason: "Dùng price; sẽ gỡ Q3")
  price: PriceInfo!                # field mới, non-null ở OUTPUT -> non-breaking
}
type PriceInfo { amount: Int!  currency: String!  interval: BillingInterval! }
enum BillingInterval { MONTHLY  YEARLY }`),
      CODE("javascript", `// Test canh gác quá trình evolution
test("evolution: mới song song, cũ còn chạy, không breaking", async () => {
  const before = buildSchema(readFileSync("./schema.baseline.graphql","utf8"));
  const after  = buildSchema(readFileSync("./schema.graphql","utf8"));
  const changes = await diff(before, after);

  // Không có BREAKING (chỉ non-breaking + dangerous vì thêm @deprecated)
  expect(changes.filter(c => c.criticality.level === "BREAKING")).toEqual([]);

  // Consumer cũ dùng monthlyPrice VẪN hợp lệ (chưa gỡ)
  const legacyOp = "query{ plans{ id monthlyPrice } }";
  expect(validate(after, parse(legacyOp))).toEqual([]);

  // Consumer mới dùng price cũng hợp lệ
  const newOp = "query{ plans{ id price{ amount currency interval } } }";
  expect(validate(after, parse(newOp))).toEqual([]);
});`),
      P(
        "Chỉ khi bộ contract consumer cho thấy không còn client nào dùng monthlyPrice (giai đoạn theo dõi kết thúc), đội mới thực hiện bước gỡ field ở một PR riêng, cập nhật baseline có chủ đích. Nhờ vậy, thay đổi phá vỡ tiềm tàng được trải ra thành nhiều bước an toàn, mỗi bước có cổng kiểm hợp đồng xác nhận. Đây chính là giá trị cốt lõi mà kiểm hợp đồng mang lại: cho phép API tiến hóa nhanh mà không đánh đổi sự ổn định của consumer.",
        "Only when the consumer contract suite shows no client still uses monthlyPrice (the monitoring phase ends) does the team perform the removal in a separate PR, deliberately updating the baseline. Thus a potentially breaking change is spread into several safe steps, each verified by a contract gate. This is the core value contract testing brings: letting the API evolve quickly without trading away consumer stability.",
        "コンシューマー契約スイートがどのクライアントもmonthlyPriceをまだ使っていないことを示したとき（監視フェーズが終了したとき）にのみ、チームは別のPRで削除を実行し、意図的にベースラインを更新します。こうして潜在的に破壊的な変更が複数の安全なステップに分散され、各ステップが契約ゲートで検証されます。これが契約テストがもたらす核心的な価値です。コンシューマーの安定性を犠牲にせずAPIを迅速に進化させられるのです。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Câu hỏi phỏng vấn nâng cao",
      en: "12. Advanced interview questions",
      ja: "12. 応用面接質問",
    },
    blocks: [
      QA(
        "Thay đổi schema nào là breaking, dangerous, non-breaking? Cho ví dụ.",
        "Which schema changes are breaking, dangerous, non-breaking? Give examples.",
        "Breaking: xóa field/type, đổi kiểu field, đổi một argument từ nullable thành non-null, hoặc thêm field non-null vào input type — chắc chắn phá client. Dangerous: thêm @deprecated, đổi giá trị default của argument, thêm enum value có thể vỡ nhánh xử lý phía client. Non-breaking: thêm field nullable vào output type, thêm type mới, thêm argument optional. graphql-inspector phân loại tự động các mức này.",
        "Breaking: removing a field/type, changing a field type, changing an argument from nullable to non-null, or adding a non-null field to an input type — definitely breaks clients. Dangerous: adding @deprecated, changing an argument default, adding an enum value that may break client handling. Non-breaking: adding a nullable field to an output type, adding a new type, adding an optional argument. graphql-inspector classifies these levels automatically.",
        "Breaking：フィールド・型の削除、フィールド型の変更、引数をnullableからnon-nullに変更、input型へのnon-nullフィールド追加 — 確実にクライアントを壊します。Dangerous：@deprecatedの追加、引数のデフォルト変更、クライアント処理を壊しうるenum値の追加。Non-breaking：output型へのnullableフィールド追加、新しい型の追加、任意引数の追加。graphql-inspectorがこれらのレベルを自動分類します。",
      ),
      QA(
        "Vì sao thêm field non-null vào input type lại breaking còn vào output type thì không?",
        "Why is adding a non-null field to an input type breaking but not to an output type?",
        "Vì input do client GỬI: nếu thêm một field bắt buộc mới vào input, client cũ không gửi field đó sẽ bị từ chối ở tầng validate — breaking. Còn output do server TRẢ: thêm một field non-null mới vào output không buộc client cũ phải yêu cầu nó (client chỉ chọn field nó cần), nên client cũ vẫn chạy bình thường — non-breaking. Hướng của dữ liệu quyết định tác động.",
        "Because input is SENT by the client: adding a new required field to an input means old clients not sending it get rejected at validation — breaking. Output is RETURNED by the server: adding a new non-null output field does not force old clients to request it (clients only select the fields they need), so old clients keep working — non-breaking. The direction of data determines the impact.",
        "inputはクライアントが送信するからです。inputに新しい必須フィールドを追加すると、それを送らない古いクライアントは検証で拒否されます — breaking。outputはサーバーが返します。新しいnon-null outputフィールドの追加は古いクライアントにそれを要求させません（クライアントは必要なフィールドだけ選択する）ので、古いクライアントは動作し続けます — non-breaking。データの方向が影響を決めます。",
      ),
      QA(
        "Contract testing hướng consumer cho GraphQL khác gì với schema diff thuần?",
        "How does consumer-driven contract testing for GraphQL differ from a plain schema diff?",
        "Schema diff bắt mọi thay đổi breaking ở cấp cấu trúc, kể cả field không ai dùng — có thể quá bảo thủ. Consumer-driven đảo góc nhìn: thu thập các operation client thực dùng và validate chúng với schema mới; chỉ báo breaking khi một client cụ thể thật sự bị phá. Kết hợp cả hai cho phép gỡ field an toàn: diff cảnh báo breaking, nhưng nếu không consumer nào còn dùng thì vẫn gỡ được với bằng chứng thực tế.",
        "A schema diff catches every breaking change at the structural level, even fields nobody uses — it can be too conservative. Consumer-driven flips the view: collect the operations clients actually use and validate them against the new schema; it flags breaking only when a specific client is truly broken. Combining both allows safe field removal: the diff warns breaking, but if no consumer still uses it you can remove it with real evidence.",
        "スキーマ差分は誰も使わないフィールドを含め構造レベルですべての破壊的変更を捕捉します — 保守的すぎることがあります。consumer-drivenは視点を反転させ、クライアントが実際に使う操作を収集し新しいスキーマに対して検証します。特定のクライアントが本当に壊れたときだけ破壊的と警告します。両方を組み合わせると安全なフィールド削除が可能です。差分は破壊的と警告しますが、どのコンシューマーもまだ使っていなければ実際の証拠とともに削除できます。",
      ),
      QA(
        "Introspection dùng để làm gì trong kiểm thử, và vì sao nên tắt ở production?",
        "What is introspection used for in testing, and why disable it in production?",
        "Introspection cho phép truy vấn chính schema đang chạy qua __schema/__type. Trong kiểm thử, tôi dùng nó để lấy schema thực từ server và diff với SDL đã duyệt nhằm bắt lệch runtime giữa hợp đồng và server. Ở production nên tắt vì nó phơi toàn bộ cấu trúc API cho kẻ tấn công dò tìm; tôi thường có một ca kiểm khẳng định introspection thực sự bị tắt ở production và chỉ chạy kiểm dựa trên introspection ở staging.",
        "Introspection lets you query the running schema itself via __schema/__type. In testing I use it to fetch the real schema from the server and diff it against the approved SDL to catch runtime drift between contract and server. In production it should be off because it exposes the whole API structure for attackers to probe; I usually have a case asserting introspection is really disabled in production and only run introspection-based checks in staging.",
        "イントロスペクションは__schema/__typeを通じて稼働中スキーマ自体を照会できます。テストでは、サーバーから実際のスキーマを取得し承認済みSDLと差分して契約とサーバー間の実行時ずれを捕捉するために使います。本番では、攻撃者が探るためにAPI構造全体を露出させるので無効化すべきです。通常、本番でイントロスペクションが本当に無効であることを検証するケースを持ち、イントロスペクションベースのチェックはステージングでのみ実行します。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist hợp đồng",
      en: "13. Summary & contract checklist",
      ja: "13. まとめと契約チェックリスト",
    },
    blocks: [
      P(
        "Kiểm thử ở tầng hợp đồng nâng chất lượng GraphQL từ đúng-từng-operation lên an-toàn-khi-tiến-hóa. Nền tảng là coi schema/SDL như hợp đồng version-controlled, kiểm nó hợp lệ, kiểm nullability và deprecation đúng chủ đích, phát hiện breaking change bằng graphql-inspector, xác nhận không consumer nào bị phá bằng validate operation, và đối chiếu schema đang chạy qua introspection. Gói tất cả vào một cổng CI để biến mọi thay đổi phá vỡ thành quyết định có kiểm soát. Dưới đây là checklist rút gọn cho tầng hợp đồng.",
        "Contract-layer testing lifts GraphQL quality from correct-per-operation to safe-to-evolve. The foundation is treating the schema/SDL as a version-controlled contract, validating it, checking nullability and deprecation are intentional, detecting breaking changes with graphql-inspector, confirming no consumer breaks via operation validation, and reconciling the running schema through introspection. Wrap it all in a CI gate to turn every breaking change into a controlled decision. Here is a concise checklist for the contract layer.",
        "契約層のテストはGraphQLの品質を操作ごとに正しいから安全に進化できるへ引き上げます。基盤はスキーマ・SDLをバージョン管理された契約として扱い、それを検証し、nullabilityとdeprecationが意図的か確認し、graphql-inspectorで破壊的変更を検出し、操作の検証でどのコンシューマーも壊れないことを確認し、イントロスペクションで稼働中スキーマを照合することです。すべてをCIゲートに包み、あらゆる破壊的変更を管理された決定に変えます。以下は契約層の簡潔なチェックリストです。",
      ),
      UL(
        [
          "Version-control SDL; luôn có baseline để diff.",
          "Smoke test: SDL build hợp lệ + type/field bắt buộc tồn tại.",
          "Kiểm nullability & @deprecated đúng chủ đích; có kế hoạch gỡ field deprecated.",
          "graphql-inspector diff: fail breaking, warn dangerous.",
          "Consumer contract: validate operation của mọi client với schema mới.",
          "Introspection ở staging để bắt lệch runtime; introspection off ở production.",
          "Cổng CI trên mỗi PR; cập nhật baseline có chủ đích khi breaking là cố ý.",
        ],
        [
          "Version-control the SDL; always keep a baseline to diff against.",
          "Smoke test: SDL builds validly + required types/fields exist.",
          "Check nullability & @deprecated are intentional; plan removal of deprecated fields.",
          "graphql-inspector diff: fail on breaking, warn on dangerous.",
          "Consumer contract: validate every client's operations against the new schema.",
          "Introspection in staging to catch runtime drift; introspection off in production.",
          "CI gate on every PR; update the baseline deliberately when breaking is intended.",
        ],
        [
          "SDLをバージョン管理する。差分用のベースラインを常に保つ。",
          "スモークテスト：SDLが妥当にビルドされ、必須の型・フィールドが存在する。",
          "nullabilityと@deprecatedが意図的か確認する。deprecatedフィールドの削除計画を立てる。",
          "graphql-inspector差分：破壊的なら失敗、dangerousなら警告。",
          "コンシューマー契約：すべてのクライアントの操作を新しいスキーマに対して検証する。",
          "ステージングのイントロスペクションで実行時ずれを捕捉。本番ではイントロスペクション無効。",
          "すべてのPRでCIゲート。破壊的が意図的なときはベースラインを意図的に更新する。",
        ],
      ),
      TIP(
        "Kết hợp bài này với bài về query/mutation testing: tầng operation bảo đảm mỗi thao tác đúng, tầng hợp đồng bảo đảm schema tiến hóa an toàn. Hai tầng cùng nhau tạo nên chiến lược kiểm thử GraphQL trọn vẹn.",
        "Combine this with the query/mutation testing article: the operation layer ensures each operation is correct, the contract layer ensures the schema evolves safely. Together the two layers form a complete GraphQL testing strategy.",
        "この記事をquery/mutationテストの記事と組み合わせましょう。操作層が各操作の正しさを保証し、契約層がスキーマの安全な進化を保証します。2つの層が一緒になって完全なGraphQLテスト戦略を形成します。",
      ),
    ],
  },
];

export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-graphql-query-mutation-testing",
    cover: makeThumb({ id: "atgql1", domain: "ecommerce", kind: "congnghe", label: "GRAPHQL · API" }),
    tags: tags("congnghe", "graphql", "api", "foundation"),
    title: {
      vi: "Kiểm thử GraphQL: Query & Mutation cho Tester",
      en: "Testing GraphQL: Queries & Mutations for Testers",
      ja: "GraphQLのテスト：テスターのためのクエリとミューテーション",
    },
    summary: {
      vi: "Hiểu vì sao GraphQL khác REST (một endpoint, HTTP 200 kể cả khi lỗi), cách khẳng định data + errors, biến, phân quyền theo field, ca âm và bộ công cụ (graphql-request, supertest, Playwright) qua bối cảnh TMĐT.",
      en: "Understand why GraphQL differs from REST (single endpoint, HTTP 200 even on errors), how to assert data + errors, variables, per-field authz, negative cases and the toolbox (graphql-request, supertest, Playwright) through an e-commerce context.",
      ja: "GraphQLがRESTと異なる理由（単一エンドポイント、エラー時でもHTTP 200）、data + errorsの検証方法、変数、フィールド単位の認可、異常系、ツールボックス（graphql-request、supertest、Playwright）をECの文脈で理解します。",
    },
    pages: buildDoc(a1_pages),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-graphql-schema-contract",
    cover: makeThumb({ id: "atgql2", domain: "saas", kind: "nangcao", label: "GRAPHQL · CONTRACT" }),
    tags: tags("nangcao", "graphql", "contract", "advanced"),
    title: {
      vi: "Kiểm thử Schema & Contract cho GraphQL",
      en: "Schema & Contract Testing for GraphQL",
      ja: "GraphQLのスキーマと契約テスト",
    },
    summary: {
      vi: "Kiểm ở tầng hợp đồng: xác thực SDL, nullability & deprecation, phát hiện breaking change bằng graphql-inspector, contract hướng consumer, kiểm qua introspection và dựng cổng CI — qua bối cảnh nền tảng SaaS đa client.",
      en: "Test at the contract layer: SDL validation, nullability & deprecation, breaking-change detection with graphql-inspector, consumer-driven contracts, introspection-based checks and building a CI gate — through a multi-client SaaS platform.",
      ja: "契約層でのテスト：SDL検証、nullabilityとdeprecation、graphql-inspectorによる破壊的変更の検出、consumer-driven契約、イントロスペクションベースのチェック、CIゲートの構築を、マルチクライアントSaaSプラットフォームの文脈で扱います。",
    },
    pages: buildDoc(a2_pages),
  },
];
