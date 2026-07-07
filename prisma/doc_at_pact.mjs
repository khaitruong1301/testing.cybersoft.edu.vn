import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

/* ============================================================================
 * doc_at_pact — PACT / Contract testing (3 bài SÂU trilingual)
 *   1. at-pact-consumer-driven   (congnghe · fintech)  — CDC fundamentals
 *   2. at-pact-provider-verification (nangcao · banking) — provider verification
 *   3. at-pact-broker-ci         (nangcao · saas)      — Pact Broker & CI
 * ==========================================================================*/

/* ============================================================================
 * ARTICLE 1 — Consumer-driven contract testing fundamentals
 * ==========================================================================*/
const pages1 = [
  {
    heading: {
      vi: "1. Bài toán tích hợp trong kiến trúc microservices",
      en: "1. The integration problem in a microservices architecture",
      ja: "1. マイクロサービス構成における統合の問題",
    },
    blocks: [
      P(
        "Hãy tưởng tượng một nền tảng fintech với hàng chục dịch vụ nhỏ: dịch vụ ví, dịch vụ thanh toán, dịch vụ hạn mức tín dụng, dịch vụ thông báo. Ứng dụng di động (consumer) gọi API của dịch vụ ví (provider) để lấy số dư. Mỗi dịch vụ do một đội khác nhau phát triển, deploy độc lập, nhiều lần mỗi ngày. Khi số lượng cặp gọi nhau tăng lên, một thay đổi nhỏ ở phía provider — đổi tên một trường JSON, bỏ một field, thay kiểu dữ liệu — có thể làm hỏng consumer mà không ai phát hiện cho tới khi khách hàng gặp lỗi trên production.",
        "Imagine a fintech platform with dozens of small services: a wallet service, a payment service, a credit-limit service, a notifications service. The mobile app (the consumer) calls the wallet service (the provider) to fetch a balance. Each service is built by a different team, deployed independently, many times a day. As the number of calling pairs grows, a small change on the provider side — renaming a JSON field, dropping a field, changing a data type — can break the consumer with nobody noticing until a customer hits an error in production.",
        "数十の小さなサービスを持つフィンテックプラットフォームを想像してください：ウォレットサービス、決済サービス、与信枠サービス、通知サービスです。モバイルアプリ（コンシューマ）は残高を取得するためにウォレットサービス（プロバイダ）のAPIを呼び出します。各サービスは異なるチームが開発し、独立して一日に何度もデプロイされます。呼び出しペアの数が増えると、プロバイダ側の小さな変更—JSONフィールドの改名、フィールドの削除、データ型の変更—が、本番で顧客がエラーに遭遇するまで誰も気づかないままコンシューマを壊しうるのです。"
      ),
      P(
        "Câu hỏi cốt lõi mà mỗi đội phải trả lời trước khi deploy là: 'Thay đổi của tôi có phá vỡ bất kỳ ai đang phụ thuộc vào tôi không?'. Trong một hệ thống nguyên khối (monolith), trình biên dịch và bộ test tích hợp trong cùng một repo trả lời câu hỏi này ngay lập tức. Nhưng trong microservices, consumer và provider nằm ở hai repo, hai pipeline, hai vòng đời khác nhau. Không có trình biên dịch nào bắc cầu qua ranh giới mạng. Đây chính là khoảng trống mà contract testing (kiểm thử hợp đồng) và cụ thể là Pact ra đời để lấp đầy.",
        "The core question every team must answer before deploying is: 'Does my change break anyone who depends on me?'. In a monolith, the compiler and the integration test suite in the same repository answer this instantly. But in microservices, the consumer and provider live in two repos, two pipelines, two different lifecycles. No compiler bridges the network boundary. This is exactly the gap that contract testing — and specifically Pact — was created to fill.",
        "各チームがデプロイ前に答えなければならない核心的な問いは、「私の変更は、私に依存している誰かを壊すか？」です。モノリスでは、同じリポジトリ内のコンパイラと統合テストスイートがこれを即座に答えます。しかしマイクロサービスでは、コンシューマとプロバイダは二つのリポジトリ、二つのパイプライン、二つの異なるライフサイクルに存在します。ネットワーク境界を橋渡しするコンパイラはありません。これこそ契約テスト、特にPactが埋めるために生まれた隙間なのです。"
      ),
      NOTE(
        "Oracle (nguồn phán xử) của contract testing không phải 'ứng dụng chạy đúng' mà là 'consumer và provider vẫn tương thích với nhau'. Đó là một oracle về khả năng tương thích, hẹp nhưng cực kỳ chính xác.",
        "The oracle (source of truth) of contract testing is not 'the app runs correctly' but 'the consumer and provider are still compatible with each other'. It is a compatibility oracle — narrow, but extremely precise.",
        "契約テストのオラクル（判定の源）は「アプリが正しく動く」ではなく「コンシューマとプロバイダが互いに互換性を保っている」です。これは互換性のオラクルであり、狭いですが極めて正確です。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Vì sao contract testing thắng E2E toàn phần cho microservices",
      en: "2. Why contract testing beats full E2E for microservices",
      ja: "2. なぜ契約テストがマイクロサービスにおいて全E2Eに勝るのか",
    },
    blocks: [
      P(
        "Cách phòng thủ truyền thống là dựng một môi trường staging đầy đủ, triển khai tất cả các dịch vụ thật, rồi chạy một bộ test đầu-cuối (E2E) đi qua toàn bộ hệ thống. Cách này có vẻ chắc chắn nhưng đắt và giòn. Để test tương tác giữa ví và thanh toán, bạn phải khởi động cả hai dịch vụ, cùng cơ sở dữ liệu, hàng đợi tin nhắn và mọi phụ thuộc. Với hàng chục dịch vụ, một môi trường như thế mất nhiều giờ để dựng, dễ hỏng vì lý do không liên quan, và khi test đỏ bạn không biết dịch vụ nào có lỗi.",
        "The traditional defence is to build a full staging environment, deploy all the real services, then run an end-to-end (E2E) suite that traverses the whole system. This feels safe but is expensive and brittle. To test the wallet-payment interaction you must boot both services, their databases, message queues and every dependency. With dozens of services such an environment takes hours to stand up, breaks for unrelated reasons, and when a test goes red you cannot tell which service is at fault.",
        "従来の防御策は、完全なステージング環境を構築し、すべての実サービスをデプロイし、システム全体を通るエンドツーエンド（E2E）スイートを実行することです。これは安全に見えますが、高価で脆いです。ウォレットと決済の相互作用をテストするには、両サービス、それらのデータベース、メッセージキュー、あらゆる依存を起動しなければなりません。数十のサービスがあると、そのような環境は立ち上げに何時間もかかり、無関係な理由で壊れ、テストが赤になってもどのサービスに問題があるか分かりません。"
      ),
      P(
        "Contract testing đảo ngược bài toán. Thay vì chạy hai dịch vụ thật cùng lúc, ta tách phép kiểm thành hai nửa độc lập. Nửa consumer chạy consumer thật đối diện với một provider giả lập (mock provider), ghi lại chính xác các yêu cầu mà consumer gửi và phản hồi mà nó mong đợi. Nửa provider chạy provider thật và phát lại đúng những yêu cầu đó, kiểm rằng provider trả về phản hồi khớp. Không lúc nào ta cần cả hai dịch vụ cùng chạy. Mỗi nửa nhanh như unit test, chạy được trong pipeline riêng của từng đội, và khi đỏ nó chỉ đúng một điểm hỏng: hợp đồng bị phá.",
        "Contract testing inverts the problem. Instead of running two real services at once, we split the check into two independent halves. The consumer half runs the real consumer against a mock provider, recording exactly the requests the consumer sends and the responses it expects. The provider half runs the real provider and replays precisely those requests, checking that the provider returns a matching response. At no point do we need both services running together. Each half is as fast as a unit test, runs in each team's own pipeline, and when red it points to exactly one failure: the contract was broken.",
        "契約テストは問題を反転させます。二つの実サービスを同時に動かす代わりに、検証を二つの独立した半分に分割します。コンシューマ側は実際のコンシューマをモックプロバイダに対して実行し、コンシューマが送るリクエストと期待するレスポンスを正確に記録します。プロバイダ側は実際のプロバイダを実行し、それらのリクエストを正確に再生し、プロバイダが一致するレスポンスを返すかを確認します。両サービスを一緒に動かす必要は一度もありません。各半分はユニットテストと同じくらい速く、各チーム自身のパイプラインで実行され、赤になったときはただ一つの故障を指します：契約が壊れたこと。"
      ),
      IMG(
        `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">E2E toàn phần vs Contract testing</text>
<rect x="30" y="50" width="300" height="150" rx="10" fill="#1e293b" stroke="#f87171"/>
<text x="180" y="74" text-anchor="middle" fill="#f87171" font-size="12" font-weight="700">Full E2E (đắt, giòn)</text>
<rect x="55" y="90" width="70" height="40" rx="6" fill="#155e63"/><text x="90" y="114" text-anchor="middle" fill="#fff" font-size="10">Consumer</text>
<rect x="145" y="90" width="70" height="40" rx="6" fill="#155e63"/><text x="180" y="114" text-anchor="middle" fill="#fff" font-size="10">Provider</text>
<rect x="235" y="90" width="70" height="40" rx="6" fill="#155e63"/><text x="270" y="114" text-anchor="middle" fill="#fff" font-size="10">DB + MQ</text>
<text x="180" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">tất cả chạy cùng lúc · nhiều giờ</text>
<text x="180" y="178" text-anchor="middle" fill="#94a3b8" font-size="9">đỏ → không rõ ai lỗi</text>
<rect x="390" y="50" width="300" height="150" rx="10" fill="#1e293b" stroke="#34d399"/>
<text x="540" y="74" text-anchor="middle" fill="#34d399" font-size="12" font-weight="700">Contract (nhanh, chính xác)</text>
<rect x="415" y="90" width="80" height="40" rx="6" fill="#0369a1"/><text x="455" y="108" text-anchor="middle" fill="#fff" font-size="9">Consumer</text><text x="455" y="122" text-anchor="middle" fill="#7dd3fc" font-size="8">+ mock</text>
<rect x="585" y="90" width="80" height="40" rx="6" fill="#0369a1"/><text x="625" y="108" text-anchor="middle" fill="#fff" font-size="9">Provider</text><text x="625" y="122" text-anchor="middle" fill="#7dd3fc" font-size="8">+ replay</text>
<path d="M495 110 L585 110" stroke="#7dd3fc" stroke-width="2" stroke-dasharray="4 3"/><text x="540" y="104" text-anchor="middle" fill="#7dd3fc" font-size="9">pact file</text>
<text x="540" y="168" text-anchor="middle" fill="#94a3b8" font-size="9">tách rời · vài giây mỗi nửa</text>
<text x="540" y="186" text-anchor="middle" fill="#94a3b8" font-size="9">đỏ → biết đúng điểm hỏng</text>
</svg>`,
        "Contract testing tách phép kiểm thành hai nửa độc lập, kết nối qua một pact file thay vì môi trường chung.",
        "Contract testing splits the check into two independent halves, connected via a pact file instead of a shared environment.",
        "契約テストは検証を二つの独立した半分に分割し、共有環境ではなくpactファイルで接続します。"
      ),
      UL(
        ["Phản hồi nhanh: mỗi nửa chạy trong vài giây, không cần dựng cả hệ thống.", "Định vị lỗi chính xác: test đỏ chỉ đúng một cặp consumer-provider.", "Độc lập vòng đời: mỗi đội chạy phần của mình trong pipeline riêng.", "Consumer-driven: hợp đồng phản ánh đúng những gì consumer thực sự dùng."],
        ["Fast feedback: each half runs in seconds, no need to stand up the whole system.", "Precise fault localisation: a red test points to exactly one consumer-provider pair.", "Lifecycle independence: each team runs its part in its own pipeline.", "Consumer-driven: the contract reflects exactly what the consumer actually uses."],
        ["高速なフィードバック：各半分は数秒で実行され、システム全体を立ち上げる必要がありません。", "正確な障害の特定：赤いテストはただ一つのコンシューマ・プロバイダのペアを指します。", "ライフサイクルの独立：各チームは自分の部分を自身のパイプラインで実行します。", "コンシューマ駆動：契約はコンシューマが実際に使うものを正確に反映します。"]
      ),
      WARN(
        "Contract testing KHÔNG thay thế mọi loại test. Nó không kiểm logic nghiệp vụ sâu, hiệu năng, hay hành trình người dùng phức tạp. Nó chỉ bảo vệ một thứ: sự tương thích của giao diện giữa hai dịch vụ. Hãy dùng nó cùng unit test và một lượng nhỏ E2E cho các luồng quan trọng nhất.",
        "Contract testing does NOT replace every kind of test. It does not check deep business logic, performance, or complex user journeys. It protects exactly one thing: the interface compatibility between two services. Use it alongside unit tests and a small amount of E2E for the most critical flows.",
        "契約テストはあらゆる種類のテストを置き換えるものではありません。深い業務ロジック、性能、複雑なユーザー体験は検証しません。守るのはただ一つ：二つのサービス間のインターフェースの互換性です。ユニットテストと、最も重要なフローに対する少量のE2Eと併用してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Pact hoạt động thế nào: hợp đồng do consumer sinh ra",
      en: "3. How Pact works: the consumer generates the contract",
      ja: "3. Pactの仕組み：コンシューマが契約を生成する",
    },
    blocks: [
      P(
        "Điểm khác biệt then chốt của Pact so với các cách tiếp cận khác nằm ở hai chữ 'consumer-driven' (do consumer dẫn dắt). Hợp đồng không được viết trước bởi kiến trúc sư rồi áp xuống. Thay vào đó, chính consumer, thông qua bài test của nó, tuyên bố: 'Tôi sẽ gửi yêu cầu này và tôi cần phản hồi có hình dạng này'. Khi bài test consumer chạy, thư viện Pact khởi động một mock provider trong bộ nhớ, consumer thật gọi vào mock đó, và Pact ghi lại mọi tương tác (interaction) thành một file JSON gọi là pact file.",
        "The key distinction of Pact from other approaches lies in two words: 'consumer-driven'. The contract is not written up front by an architect and imposed downward. Instead the consumer itself, through its test, declares: 'I will send this request and I need a response of this shape'. When the consumer test runs, the Pact library starts an in-memory mock provider, the real consumer calls that mock, and Pact records every interaction into a JSON file called the pact file.",
        "Pactが他のアプローチと決定的に異なる点は「コンシューマ駆動」という言葉にあります。契約はアーキテクトが事前に書いて上から押し付けるものではありません。代わりにコンシューマ自身が、そのテストを通じて宣言します：「私はこのリクエストを送り、この形のレスポンスが必要です」。コンシューマテストが実行されると、Pactライブラリはインメモリのモックプロバイダを起動し、実際のコンシューマがそのモックを呼び、Pactはすべての相互作用（インタラクション）をpactファイルと呼ばれるJSONファイルに記録します。"
      ),
      P(
        "Pact file này là hiện vật trung tâm của toàn bộ quy trình. Nó chứa danh sách các interaction, mỗi interaction gồm: một provider state (trạng thái tiên quyết mà provider cần có), một request (method, path, headers, body mong đợi) và một response (status, headers, body mà consumer sẽ nhận và xử lý được). Vì được sinh từ chính consumer thật đang chạy, hợp đồng luôn phản ánh đúng thực tế sử dụng, không bao giờ lệch pha với code. Sau đó pact file được chuyển sang phía provider để phát lại — đó là bước provider verification (kiểm chứng provider) mà bài tiếp theo sẽ đi sâu.",
        "This pact file is the central artefact of the whole workflow. It contains a list of interactions, each comprising: a provider state (the precondition the provider must be in), a request (method, path, headers, expected body) and a response (status, headers, body the consumer will receive and can process). Because it is generated by the real running consumer, the contract always reflects actual usage and never drifts from the code. The pact file is then handed to the provider side for replay — the provider verification step the next article explores in depth.",
        "このpactファイルはワークフロー全体の中心的な成果物です。インタラクションのリストを含み、各インタラクションは、プロバイダ状態（プロバイダが満たすべき前提条件）、リクエスト（メソッド・パス・ヘッダー・期待するボディ）、レスポンス（コンシューマが受け取り処理できるステータス・ヘッダー・ボディ）から成ります。実際に動作するコンシューマから生成されるため、契約は常に実際の使用を反映し、コードから乖離することはありません。その後pactファイルはプロバイダ側に渡されて再生されます—これが次の記事で深掘りするプロバイダ検証のステップです。"
      ),
      IMG(
        `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Vòng đời một hợp đồng Pact</text>
<rect x="30" y="55" width="150" height="60" rx="8" fill="#0369a1"/><text x="105" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Consumer test</text><text x="105" y="100" text-anchor="middle" fill="#7dd3fc" font-size="9">gọi mock provider</text>
<rect x="285" y="55" width="150" height="60" rx="8" fill="#7c2d92"/><text x="360" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Pact file</text><text x="360" y="100" text-anchor="middle" fill="#e9d5ff" font-size="9">interactions JSON</text>
<rect x="540" y="55" width="150" height="60" rx="8" fill="#155e63"/><text x="615" y="82" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Provider verify</text><text x="615" y="100" text-anchor="middle" fill="#a7f3d0" font-size="9">phát lại request</text>
<path d="M180 85 L285 85" stroke="#7dd3fc" stroke-width="2.5" marker-end="url(#a1)"/><text x="232" y="76" text-anchor="middle" fill="#7dd3fc" font-size="9">sinh</text>
<path d="M435 85 L540 85" stroke="#34d399" stroke-width="2.5" marker-end="url(#a1)"/><text x="487" y="76" text-anchor="middle" fill="#34d399" font-size="9">publish</text>
<rect x="230" y="150" width="260" height="46" rx="8" fill="#1e293b" stroke="#475569"/><text x="360" y="170" text-anchor="middle" fill="#cbd5e1" font-size="10">provider state · request · response</text><text x="360" y="186" text-anchor="middle" fill="#94a3b8" font-size="9">+ matchers (like / eachLike / term)</text>
<path d="M360 115 L360 150" stroke="#a78bfa" stroke-width="2" stroke-dasharray="3 3"/>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs>
</svg>`,
        "Consumer sinh pact file, publish lên broker, provider phát lại từng request để kiểm chứng.",
        "The consumer generates the pact file, publishes it to a broker, and the provider replays each request to verify.",
        "コンシューマがpactファイルを生成しブローカーへ公開し、プロバイダが各リクエストを再生して検証します。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Cài đặt pact-js và cấu trúc một bài test consumer",
      en: "4. Installing pact-js and the structure of a consumer test",
      ja: "4. pact-jsの導入とコンシューマテストの構造",
    },
    blocks: [
      P(
        "Với hệ sinh thái JavaScript/TypeScript, thư viện chính thức là pact-js. Nó cung cấp lớp PactV3 (mô hình tương tác V3/V4) để khai báo hợp đồng và một mock server tự động. Ta cài nó như một dependency phát triển và cấu hình thư mục xuất pact. Điểm quan trọng: bài test consumer là một bài unit test bình thường (chạy bằng Jest, Vitest, Mocha...), chỉ khác ở chỗ trước khi gọi HTTP thật, ta trỏ client của mình vào địa chỉ mock server do Pact cấp.",
        "In the JavaScript/TypeScript ecosystem the official library is pact-js. It provides the PactV3 class (the V3/V4 interaction model) to declare the contract and an automatic mock server. We install it as a dev dependency and configure the pact output directory. The key point: a consumer test is an ordinary unit test (run with Jest, Vitest, Mocha...), differing only in that before making a real HTTP call we point our client at the mock server address Pact provides.",
        "JavaScript/TypeScriptのエコシステムでは、公式ライブラリはpact-jsです。契約を宣言するためのPactV3クラス（V3/V4のインタラクションモデル）と自動モックサーバーを提供します。開発依存としてインストールし、pact出力ディレクトリを設定します。重要な点：コンシューマテストは普通のユニットテスト（Jest・Vitest・Mochaなどで実行）であり、実際のHTTP呼び出しを行う前に、自分のクライアントをPactが提供するモックサーバーのアドレスに向けるだけが違いです。"
      ),
      CODE(
        "bash",
        `# Cài pact-js (consumer + verifier trong cùng gói)
npm install --save-dev @pact-foundation/pact

# Cấu trúc thư mục khuyến nghị
#   src/wallet-client.ts        <- code consumer thật
#   test/wallet.consumer.pact.test.ts
#   pacts/                       <- nơi pact file được sinh ra`
      ),
      CODE(
        "ts",
        `// wallet-client.ts — code consumer THẬT, không biết gì về Pact.
// Nó chỉ nhận baseURL rồi gọi HTTP như bình thường.
import axios from "axios";

export interface Balance {
  accountId: string;
  currency: string;
  amount: number;
}

export class WalletClient {
  constructor(private readonly baseURL: string) {}

  async getBalance(accountId: string): Promise<Balance> {
    const res = await axios.get(
      \`\${this.baseURL}/accounts/\${accountId}/balance\`,
      { headers: { Accept: "application/json" } }
    );
    return res.data as Balance;
  }
}`
      ),
      NOTE(
        "Chú ý code consumer hoàn toàn không import Pact. Đây là nguyên tắc vàng: hợp đồng được kiểm ở tầng test, còn code sản xuất giữ nguyên. Bài test sẽ tiêm baseURL của mock server vào client này.",
        "Note the consumer code imports nothing from Pact. This is the golden rule: the contract is exercised at the test layer while production code stays untouched. The test injects the mock server's baseURL into this client.",
        "コンシューマのコードがPactを一切importしないことに注目してください。これは黄金律です：契約はテスト層で検証され、本番コードは手つかずのままです。テストはこのクライアントにモックサーバーのbaseURLを注入します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Viết interaction đầu tiên với PactV3",
      en: "5. Writing your first interaction with PactV3",
      ja: "5. PactV3で最初のインタラクションを書く",
    },
    blocks: [
      P(
        "Một interaction được mô tả bằng bốn phần theo phong cách kể chuyện: given (trạng thái provider tiên quyết), uponReceiving (mô tả yêu cầu), withRequest (chi tiết request), willRespondWith (phản hồi mong đợi). Sau khi khai báo, ta gọi executeTest và bên trong callback đó mới thực sự chạy code consumer nhắm vào mock server. Nếu consumer gửi đúng request đã khai báo, mock trả về response đã khai báo và bài test xanh; nếu consumer gửi request khác (sai path, thiếu header), mock từ chối và bài test đỏ ngay tại chỗ.",
        "An interaction is described in four narrative parts: given (the provider precondition), uponReceiving (a description of the request), withRequest (the request details), willRespondWith (the expected response). After declaring it, we call executeTest, and only inside that callback does the consumer code actually run against the mock server. If the consumer sends exactly the declared request, the mock returns the declared response and the test is green; if the consumer sends a different request (wrong path, missing header), the mock rejects it and the test goes red right there.",
        "インタラクションは物語風の四つの部分で記述されます：given（プロバイダの前提条件）、uponReceiving（リクエストの説明）、withRequest（リクエストの詳細）、willRespondWith（期待するレスポンス）。宣言後にexecuteTestを呼び、そのコールバックの中で初めてコンシューマのコードがモックサーバーに対して実行されます。コンシューマが宣言どおりのリクエストを送れば、モックは宣言どおりのレスポンスを返しテストは緑になります。異なるリクエスト（誤ったパス、欠けたヘッダー）を送れば、モックは拒否しその場でテストが赤になります。"
      ),
      CODE(
        "ts",
        `// wallet.consumer.pact.test.ts
import { PactV3, MatchersV3 } from "@pact-foundation/pact";
import path from "path";
import { WalletClient } from "../src/wallet-client";

const { like, decimal, string } = MatchersV3;

const provider = new PactV3({
  consumer: "MobileApp",
  provider: "WalletService",
  dir: path.resolve(process.cwd(), "pacts"),
});

describe("WalletClient contract", () => {
  it("fetches a balance for an existing account", () => {
    provider
      .given("account 42 exists with a positive balance")
      .uponReceiving("a request for account 42 balance")
      .withRequest({
        method: "GET",
        path: "/accounts/42/balance",
        headers: { Accept: "application/json" },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          accountId: string("42"),
          currency: string("VND"),
          amount: decimal(1500000.5),
        },
      });

    return provider.executeTest(async (mockServer) => {
      const client = new WalletClient(mockServer.url);
      const balance = await client.getBalance("42");
      expect(balance.accountId).toBe("42");
      expect(balance.currency).toBe("VND");
      expect(typeof balance.amount).toBe("number");
    });
  });
});`
      ),
      P(
        "Hãy để ý chuỗi given('account 42 exists with a positive balance'). Đây là provider state — một cái tên chuỗi mà provider sẽ dùng để tự đưa mình về đúng trạng thái trước khi phát lại request. Ở phía consumer nó chỉ là một nhãn; sức mạnh thật sự của nó bộc lộ khi provider verification kích hoạt một hook tương ứng để tạo tài khoản số 42. Nhờ tách bạch này, consumer không cần biết provider lưu dữ liệu ra sao.",
        "Notice the string given('account 42 exists with a positive balance'). This is a provider state — a string name the provider will use to put itself into the right state before replaying the request. On the consumer side it is just a label; its real power appears when provider verification triggers a matching hook to create account 42. Thanks to this separation, the consumer need not know how the provider stores data.",
        "given('account 42 exists with a positive balance')という文字列に注目してください。これはプロバイダ状態です—プロバイダがリクエストを再生する前に正しい状態に自分を置くために使う文字列名です。コンシューマ側では単なるラベルですが、その真の力はプロバイダ検証が対応するフックを起動して口座42を作成するときに現れます。この分離のおかげで、コンシューマはプロバイダがデータをどう保存するかを知る必要がありません。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Matchers: kiểm hình dạng thay vì giá trị cố định",
      en: "6. Matchers: matching shape instead of fixed values",
      ja: "6. マッチャー：固定値ではなく形を照合する",
    },
    blocks: [
      P(
        "Nếu hợp đồng khẳng định amount phải chính xác bằng 1500000.5, provider sẽ hỏng chỉ vì số dư của tài khoản mẫu thay đổi — một sự giòn vô nghĩa. Điều consumer thật sự quan tâm không phải giá trị mà là hình dạng: amount là một số, currency là chuỗi, danh sách giao dịch là một mảng các đối tượng có cùng cấu trúc. Đó là lý do Pact cung cấp matchers. Thay vì so khớp bằng nhau, matcher yêu cầu provider trả về dữ liệu KHỚP KIỂU với ví dụ.",
        "If the contract asserts amount must be exactly 1500000.5, the provider will break merely because the sample account's balance changes — a meaningless brittleness. What the consumer truly cares about is not the value but the shape: amount is a number, currency is a string, the transaction list is an array of objects with the same structure. That is why Pact provides matchers. Instead of matching by equality, a matcher asks the provider to return data that MATCHES THE TYPE of the example.",
        "契約がamountを正確に1500000.5でなければならないと断言すると、プロバイダはサンプル口座の残高が変わるだけで壊れます—無意味な脆さです。コンシューマが本当に気にするのは値ではなく形です：amountは数値、currencyは文字列、取引リストは同じ構造のオブジェクトの配列。だからPactはマッチャーを提供します。等価で照合する代わりに、マッチャーはプロバイダに例と型が一致するデータを返すよう求めます。"
      ),
      UL(
        ["like(value): khớp bất kỳ giá trị nào cùng KIỂU với ví dụ (số, chuỗi, boolean...).", "eachLike(item, {min}): một mảng mà mỗi phần tử khớp cấu trúc của item; min quy định số phần tử tối thiểu.", "term({matcher, generate}) / regex: giá trị phải khớp một biểu thức chính quy (mã tiền tệ, UUID, ngày ISO).", "integer / decimal / boolean / datetime: matcher kiểu chuyên biệt, chặt chẽ hơn like."],
        ["like(value): matches any value of the same TYPE as the example (number, string, boolean...).", "eachLike(item, {min}): an array where each element matches the structure of item; min sets the minimum count.", "term({matcher, generate}) / regex: the value must match a regular expression (currency code, UUID, ISO date).", "integer / decimal / boolean / datetime: specialised type matchers, stricter than like."],
        ["like(value)：例と同じ型の任意の値に一致します（数値・文字列・真偽値など）。", "eachLike(item, {min})：各要素がitemの構造に一致する配列。minは最小要素数を指定します。", "term({matcher, generate}) / regex：値は正規表現に一致しなければなりません（通貨コード・UUID・ISO日付）。", "integer / decimal / boolean / datetime：likeより厳格な専用の型マッチャーです。"]
      ),
      CODE(
        "ts",
        `// Interaction thứ hai: lịch sử giao dịch (một mảng) dùng eachLike + term
import { MatchersV3 } from "@pact-foundation/pact";
const { eachLike, like, integer, term, datetime } = MatchersV3;

provider
  .given("account 42 has at least one transaction")
  .uponReceiving("a request for account 42 transactions")
  .withRequest({ method: "GET", path: "/accounts/42/transactions" })
  .willRespondWith({
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      accountId: like("42"),
      items: eachLike(
        {
          txId: term({ matcher: "^[0-9a-f-]{36}$", generate: "6f1c...-42" }),
          amount: integer(50000),
          direction: term({ matcher: "^(DEBIT|CREDIT)$", generate: "DEBIT" }),
          createdAt: datetime("yyyy-MM-dd'T'HH:mm:ssZ", "2026-07-06T09:00:00+0700"),
        },
        { min: 1 }
      ),
    },
  });`
      ),
      TIP(
        "Quy tắc thực hành: chỉ khai báo những trường consumer THỰC SỰ đọc. Nếu consumer không dùng field 'branchCode', đừng đưa nó vào hợp đồng. Hợp đồng càng gọn, provider càng có tự do thay đổi những phần không ai phụ thuộc — đây là tinh thần cốt lõi của consumer-driven.",
        "Practical rule: only declare the fields the consumer ACTUALLY reads. If the consumer never uses 'branchCode', keep it out of the contract. The leaner the contract, the more freedom the provider has to change parts nobody depends on — this is the core spirit of consumer-driven contracts.",
        "実践的な規則：コンシューマが実際に読むフィールドだけを宣言してください。コンシューマが'branchCode'を使わないなら契約に入れないこと。契約が簡潔なほど、プロバイダは誰も依存しない部分を変更する自由を得ます—これがコンシューマ駆動契約の核心的な精神です。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Sinh pact file và đọc hiểu nội dung của nó",
      en: "7. Generating the pact file and reading its contents",
      ja: "7. pactファイルの生成とその内容の理解",
    },
    blocks: [
      P(
        "Khi bài test consumer chạy xanh, pact-js ghi một file JSON vào thư mục pacts, đặt tên theo cặp consumer-provider, ví dụ MobileApp-WalletService.json. File này chính là hợp đồng có thể chia sẻ. Việc đọc hiểu nó giúp ta gỡ lỗi nhanh: nếu provider verification thất bại, ta so sánh request/response trong file với hành vi thật của provider. Dưới đây là một pact file rút gọn cho hai interaction ta vừa viết.",
        "When the consumer test passes green, pact-js writes a JSON file into the pacts directory, named after the consumer-provider pair, e.g. MobileApp-WalletService.json. This file is the shareable contract. Reading it helps debugging: if provider verification fails, we compare the request/response in the file against the provider's real behaviour. Below is a trimmed pact file for the two interactions we just wrote.",
        "コンシューマテストが緑で通ると、pact-jsはpactsディレクトリにJSONファイルを書き込み、コンシューマ・プロバイダのペア名（例：MobileApp-WalletService.json）を付けます。このファイルが共有可能な契約です。これを読めるとデバッグが速くなります：プロバイダ検証が失敗したら、ファイル内のリクエスト/レスポンスをプロバイダの実際の挙動と比較します。以下は先ほど書いた二つのインタラクションのための縮約されたpactファイルです。"
      ),
      CODE(
        "json",
        `{
  "consumer": { "name": "MobileApp" },
  "provider": { "name": "WalletService" },
  "interactions": [
    {
      "description": "a request for account 42 balance",
      "providerStates": [
        { "name": "account 42 exists with a positive balance" }
      ],
      "request": {
        "method": "GET",
        "path": "/accounts/42/balance",
        "headers": { "Accept": "application/json" }
      },
      "response": {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
        "body": { "accountId": "42", "currency": "VND", "amount": 1500000.5 },
        "matchingRules": {
          "body": {
            "$.amount": { "matchers": [{ "match": "decimal" }] },
            "$.currency": { "matchers": [{ "match": "type" }] }
          }
        }
      }
    }
  ],
  "metadata": { "pactSpecification": { "version": "3.0.0" } }
}`
      ),
      P(
        "Hãy chú ý khối matchingRules. Đây là nơi các matcher biến thành quy tắc so khớp thực thi được ở phía provider. '$.amount' dùng match 'decimal' nghĩa là provider được phép trả bất kỳ số thập phân nào; '$.currency' dùng match 'type' nghĩa là chỉ cần cùng kiểu chuỗi. Chính nhờ matchingRules mà một hợp đồng vừa cụ thể (có ví dụ để đọc) vừa linh hoạt (không trói buộc giá trị). Đây là cầu nối trực tiếp tới bài về provider verification.",
        "Note the matchingRules block. This is where the matchers become executable comparison rules on the provider side. '$.amount' with match 'decimal' means the provider may return any decimal number; '$.currency' with match 'type' means only the same string type is required. It is precisely matchingRules that make a contract both concrete (with a readable example) and flexible (not binding the value). This is the direct bridge to the article on provider verification.",
        "matchingRulesブロックに注目してください。ここでマッチャーがプロバイダ側で実行可能な比較規則になります。'$.amount'のmatch 'decimal'はプロバイダが任意の小数を返してよいことを意味し、'$.currency'のmatch 'type'は同じ文字列型だけを要求します。まさにmatchingRulesが契約を具体的（読める例がある）かつ柔軟（値を縛らない）にします。これがプロバイダ検証の記事への直接の橋渡しです。"
      ),
      QA(
        "Nếu tôi có hai consumer khác nhau cùng gọi WalletService thì sao?",
        "What if I have two different consumers both calling WalletService?",
        "Mỗi consumer sinh pact file riêng của nó (ví dụ MobileApp-WalletService.json và WebApp-WalletService.json), phản ánh đúng tập trường mà nó dùng. Provider sẽ phải kiểm chứng với cả hai hợp đồng. Đây là điểm mạnh: provider không được phá vỡ bất kỳ consumer nào, và mỗi hợp đồng chỉ ràng buộc đúng phần mà consumer đó phụ thuộc.",
        "Each consumer generates its own pact file (e.g. MobileApp-WalletService.json and WebApp-WalletService.json), reflecting exactly the set of fields it uses. The provider must verify against both contracts. This is a strength: the provider must not break any consumer, and each contract only binds the part that particular consumer depends on.",
        "二つの異なるコンシューマがWalletServiceを呼ぶ場合はどうなりますか？",
        "各コンシューマは自身のpactファイル（例：MobileApp-WalletService.jsonとWebApp-WalletService.json）を生成し、使うフィールドの集合を正確に反映します。プロバイダは両方の契約に対して検証しなければなりません。これは強みです：プロバイダはどのコンシューマも壊してはならず、各契約はそのコンシューマが依存する部分だけを縛ります。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Xử lý lỗi và các trường hợp biên trong hợp đồng",
      en: "8. Error handling and edge cases in the contract",
      ja: "8. 契約におけるエラー処理と境界ケース",
    },
    blocks: [
      P(
        "Một hợp đồng tốt không chỉ mô tả đường hạnh phúc. Consumer thật phải xử lý được cả 404 khi tài khoản không tồn tại và 422 khi tham số sai. Nếu ta chỉ ký hợp đồng cho 200, ngày provider đổi định dạng thân lỗi (error body) consumer sẽ vỡ mà không ai biết. Vì thế ta thêm interaction cho từng mã lỗi mà consumer thực sự phân nhánh xử lý, kèm provider state tương ứng như 'account 99 does not exist'.",
        "A good contract does not only describe the happy path. The real consumer must handle both a 404 when the account is missing and a 422 when a parameter is wrong. If we only sign a contract for 200, the day the provider changes its error body format the consumer will break with nobody knowing. So we add an interaction for each error code the consumer actually branches on, with a matching provider state such as 'account 99 does not exist'.",
        "良い契約はハッピーパスだけを記述するのではありません。実際のコンシューマは、口座がない場合の404もパラメータが誤っている場合の422も処理できなければなりません。200だけの契約を結ぶと、プロバイダがエラーボディの形式を変えた日にコンシューマは誰も気づかず壊れます。そこでコンシューマが実際に分岐処理する各エラーコードに対して、'account 99 does not exist'のような対応するプロバイダ状態を付けてインタラクションを追加します。"
      ),
      CODE(
        "ts",
        `// Interaction cho trường hợp không tìm thấy tài khoản
provider
  .given("account 99 does not exist")
  .uponReceiving("a request for a non-existent account balance")
  .withRequest({ method: "GET", path: "/accounts/99/balance" })
  .willRespondWith({
    status: 404,
    headers: { "Content-Type": "application/json" },
    body: {
      error: like("ACCOUNT_NOT_FOUND"),
      message: like("Account 99 was not found"),
    },
  });

// Trong executeTest, kiểm consumer NÉM đúng lỗi mong đợi
return provider.executeTest(async (mockServer) => {
  const client = new WalletClient(mockServer.url);
  await expect(client.getBalance("99")).rejects.toMatchObject({
    response: { status: 404 },
  });
});`
      ),
      SCEN(
        "Sự cố thật: field bị đổi tên âm thầm",
        "A real incident: a field silently renamed",
        "Đội WalletService refactor và đổi 'amount' thành 'balanceAmount' trong một PR tưởng chừng vô hại. Không có contract test, PR merge và deploy lên production. Ứng dụng di động đọc balance.amount ra undefined, hiển thị số dư 0đ cho hàng nghìn khách. Sự cố phải rollback khẩn. Sau đó nhóm áp dụng Pact: cùng thay đổi đó giờ làm provider verification đỏ ngay trong CI của WalletService, kèm thông báo rõ ràng rằng consumer MobileApp mong đợi field 'amount'. PR bị chặn trước khi rời máy dev.",
        "The WalletService team refactored and renamed 'amount' to 'balanceAmount' in a seemingly harmless PR. With no contract test, the PR merged and shipped to production. The mobile app read balance.amount as undefined and displayed a 0 balance to thousands of customers. The incident required an emergency rollback. The team then adopted Pact: the same change now turns provider verification red right in WalletService's CI, with a clear message that consumer MobileApp expects the field 'amount'. The PR is blocked before it ever leaves the dev machine.",
        "実際の障害：フィールドがひそかに改名される",
        "WalletServiceチームは一見無害なPRでリファクタリングを行い、'amount'を'balanceAmount'に改名しました。契約テストがなかったため、PRはマージされ本番に出荷されました。モバイルアプリはbalance.amountをundefinedとして読み、数千の顧客に残高0を表示しました。この障害は緊急ロールバックを要しました。その後チームはPactを導入しました：同じ変更は今やWalletServiceのCIでプロバイダ検証を赤にし、コンシューマMobileAppがフィールド'amount'を期待している旨の明確なメッセージを出します。PRは開発機を離れる前に阻止されます。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Chạy test consumer trong Jest/Vitest và tích hợp CI cơ bản",
      en: "9. Running consumer tests in Jest/Vitest and basic CI integration",
      ja: "9. Jest/Vitestでのコンシューマテスト実行と基本的なCI統合",
    },
    blocks: [
      P(
        "Bài test consumer chạy như bất kỳ suite nào khác. Ta thêm một script npm riêng để dễ gọi trong pipeline và cấu hình log level của Pact để chẩn đoán khi cần. Điều quan trọng về mặt vận hành là pact file phải được coi là một hiện vật (artifact) của build: nó được sinh ra mỗi lần test chạy và cần được đẩy tới nơi provider có thể lấy về. Ở bài Broker & CI ta sẽ publish nó lên Pact Broker; ở mức cơ bản, nhiều đội bắt đầu bằng cách commit hoặc chia sẻ file qua artifact của CI.",
        "The consumer test runs like any other suite. We add a dedicated npm script for easy invocation in the pipeline and configure Pact's log level to diagnose when needed. The operationally important thing is that the pact file must be treated as a build artifact: it is regenerated on every test run and must be pushed to where the provider can pull it. In the Broker & CI article we publish it to a Pact Broker; at the basic level many teams start by committing or sharing the file via a CI artifact.",
        "コンシューマテストは他のスイートと同様に実行されます。パイプラインで呼びやすいよう専用のnpmスクリプトを追加し、必要時に診断できるようPactのログレベルを設定します。運用上重要なのは、pactファイルをビルドの成果物として扱うことです：テスト実行のたびに再生成され、プロバイダが取得できる場所へ送られる必要があります。Broker & CIの記事ではPactブローカーへ公開します。基本レベルでは、多くのチームはファイルをコミットするかCIの成果物経由で共有することから始めます。"
      ),
      CODE(
        "json",
        `// package.json (trích)
{
  "scripts": {
    "test:pact:consumer": "vitest run test/**/*.pact.test.ts"
  }
}`
      ),
      CODE(
        "yaml",
        `# .github/workflows/consumer.yml — nửa consumer
name: consumer-contract
on: [push]
jobs:
  pact-consumer:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run test:pact:consumer   # sinh pacts/*.json
      - uses: actions/upload-artifact@v4
        with:
          name: pacts
          path: pacts/`
      ),
      NOTE(
        "Ở giai đoạn học, upload pact như artifact là đủ. Khi lên quy mô nhiều đội, artifact tĩnh không đủ vì thiếu versioning và không trả lời được 'phiên bản này đã tương thích chưa'. Đó là lý do Pact Broker tồn tại, xem bài 3.",
        "For learning, uploading the pact as an artifact is enough. At multi-team scale a static artifact is insufficient because it lacks versioning and cannot answer 'is this version already compatible'. That is why the Pact Broker exists, see article 3.",
        "学習段階ではpactを成果物としてアップロードすれば十分です。複数チームの規模では、静的な成果物はバージョン管理を欠き「このバージョンはもう互換か」に答えられないため不十分です。だからPactブローカーが存在します、記事3を参照してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Những cạm bẫy phổ biến khi viết consumer test",
      en: "10. Common pitfalls when writing consumer tests",
      ja: "10. コンシューマテストを書く際のよくある落とし穴",
    },
    blocks: [
      P(
        "Người mới thường mắc vài lỗi lặp lại. Thứ nhất là dùng giá trị cố định thay vì matcher, khiến hợp đồng giòn. Thứ hai là mock hoá quá tay: viết test cho những trường hợp mà consumer thật không bao giờ gọi, tạo ra hợp đồng chứa yêu cầu ảo mà provider phải gánh. Thứ ba là nhầm Pact với một công cụ kiểm thử tích hợp thật — Pact không kiểm rằng provider trả về dữ liệu đúng nghiệp vụ, nó chỉ kiểm rằng hình dạng khớp hợp đồng.",
        "Beginners repeatedly make a few mistakes. First, using fixed values instead of matchers, making the contract brittle. Second, over-mocking: writing tests for cases the real consumer never calls, creating a contract with phantom requests the provider must carry. Third, mistaking Pact for a real integration testing tool — Pact does not check that the provider returns business-correct data, only that the shape matches the contract.",
        "初心者は繰り返しいくつかの誤りを犯します。第一に、マッチャーではなく固定値を使い契約を脆くすること。第二に、モックのしすぎ：実際のコンシューマが決して呼ばないケースのテストを書き、プロバイダが背負う幻のリクエストを含む契約を作ること。第三に、Pactを本物の統合テストツールと勘違いすること—Pactはプロバイダが業務的に正しいデータを返すかは確認せず、形が契約に一致するかだけを確認します。"
      ),
      UL(
        ["Đừng viết hợp đồng cho luồng consumer không thực sự dùng — nó tạo ràng buộc giả.", "Đừng khẳng định thứ tự phần tử trong mảng trừ khi consumer thật phụ thuộc thứ tự.", "Đừng nhét toàn bộ response của provider vào hợp đồng — chỉ nhét phần bạn đọc.", "Đừng để test consumer gọi ra mạng thật — luôn nhắm vào mockServer.url."],
        ["Don't write contracts for consumer flows you don't actually use — it creates fake constraints.", "Don't assert array element order unless the real consumer depends on order.", "Don't cram the provider's entire response into the contract — only include what you read.", "Don't let the consumer test hit the real network — always target mockServer.url."],
        ["実際に使わないコンシューマフローの契約を書かないこと—偽の制約を生みます。", "実際のコンシューマが順序に依存しない限り、配列要素の順序を断言しないこと。", "プロバイダのレスポンス全体を契約に詰め込まないこと—読む部分だけを含めること。", "コンシューマテストを実ネットワークに到達させないこと—常にmockServer.urlを対象にすること。"]
      ),
      QA(
        "Pact có kiểm được rằng số dư trả về đúng về mặt nghiệp vụ không?",
        "Can Pact verify that the returned balance is business-correct?",
        "Không, và đó là điều quan trọng phải hiểu. Pact chỉ kiểm khả năng tương thích của giao diện: consumer gửi request đúng dạng, provider trả về response đúng hình dạng. Việc số dư có bằng đúng tổng giao dịch hay không là logic nghiệp vụ, thuộc về unit test và integration test của chính provider. Pact bảo vệ ranh giới, không bảo vệ tính đúng của tính toán bên trong.",
        "No, and that is important to understand. Pact only checks interface compatibility: the consumer sends a well-formed request, the provider returns a well-shaped response. Whether the balance equals the correct sum of transactions is business logic, belonging to the provider's own unit and integration tests. Pact protects the boundary, not the correctness of the internal computation.",
        "Pactは返された残高が業務的に正しいことを検証できますか？",
        "いいえ、それは理解すべき重要な点です。Pactはインターフェースの互換性だけを確認します：コンシューマが整形式のリクエストを送り、プロバイダが正しい形のレスポンスを返す。残高が取引の正しい合計に等しいかは業務ロジックであり、プロバイダ自身のユニットテストと統合テストに属します。Pactは境界を守り、内部計算の正しさは守りません。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. So sánh Pact với các cách kiểm thử hợp đồng khác",
      en: "11. Comparing Pact with other contract-testing approaches",
      ja: "11. Pactと他の契約テスト手法の比較",
    },
    blocks: [
      P(
        "Pact không phải lựa chọn duy nhất. Spring Cloud Contract phổ biến trong hệ sinh thái JVM, tiếp cận theo hướng provider-driven: provider viết hợp đồng dạng Groovy/YAML rồi sinh stub cho consumer. OpenAPI/schema validation kiểm rằng response khớp một lược đồ, nhưng không nắm được kỳ vọng cụ thể của từng consumer. Pact nổi bật ở tính consumer-driven và ở hệ sinh thái Broker giúp điều phối triển khai. Việc chọn công cụ nào phụ thuộc ngôn ngữ, ai 'sở hữu' hợp đồng, và mức độ trưởng thành của quy trình CI.",
        "Pact is not the only choice. Spring Cloud Contract is popular in the JVM world, taking a provider-driven approach: the provider writes contracts in Groovy/YAML then generates stubs for consumers. OpenAPI/schema validation checks that a response matches a schema but cannot capture each consumer's specific expectations. Pact stands out for being consumer-driven and for the Broker ecosystem that orchestrates deployment. Which tool to pick depends on language, who 'owns' the contract, and the maturity of the CI process.",
        "Pactは唯一の選択肢ではありません。Spring Cloud ContractはJVM界で人気があり、プロバイダ駆動のアプローチを取ります：プロバイダがGroovy/YAMLで契約を書き、コンシューマ向けのスタブを生成します。OpenAPI/スキーマ検証はレスポンスがスキーマに一致するかを確認しますが、各コンシューマの具体的な期待は捉えられません。Pactはコンシューマ駆動である点と、デプロイを調整するブローカーのエコシステムで際立ちます。どのツールを選ぶかは言語、誰が契約を「所有」するか、CIプロセスの成熟度に依ります。"
      ),
      IMG(
        `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" fill="#0f172a"/>
<text x="360" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="700">Pact vs Spring Cloud Contract vs Schema</text>
<rect x="30" y="50" width="210" height="150" rx="10" fill="#1e293b" stroke="#7dd3fc"/>
<text x="135" y="74" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="700">Pact</text>
<text x="135" y="98" text-anchor="middle" fill="#cbd5e1" font-size="9">consumer-driven</text>
<text x="135" y="118" text-anchor="middle" fill="#cbd5e1" font-size="9">consumer sinh hợp đồng</text>
<text x="135" y="138" text-anchor="middle" fill="#cbd5e1" font-size="9">broker + can-i-deploy</text>
<text x="135" y="158" text-anchor="middle" fill="#94a3b8" font-size="9">đa ngôn ngữ</text>
<rect x="255" y="50" width="210" height="150" rx="10" fill="#1e293b" stroke="#a7f3d0"/>
<text x="360" y="74" text-anchor="middle" fill="#a7f3d0" font-size="12" font-weight="700">Spring Cloud Contract</text>
<text x="360" y="98" text-anchor="middle" fill="#cbd5e1" font-size="9">provider-driven</text>
<text x="360" y="118" text-anchor="middle" fill="#cbd5e1" font-size="9">provider viết Groovy/YAML</text>
<text x="360" y="138" text-anchor="middle" fill="#cbd5e1" font-size="9">sinh stub cho consumer</text>
<text x="360" y="158" text-anchor="middle" fill="#94a3b8" font-size="9">tối ưu cho JVM</text>
<rect x="480" y="50" width="210" height="150" rx="10" fill="#1e293b" stroke="#fbbf24"/>
<text x="585" y="74" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">Schema / OpenAPI</text>
<text x="585" y="98" text-anchor="middle" fill="#cbd5e1" font-size="9">kiểm khớp lược đồ</text>
<text x="585" y="118" text-anchor="middle" fill="#cbd5e1" font-size="9">không theo consumer cụ thể</text>
<text x="585" y="138" text-anchor="middle" fill="#cbd5e1" font-size="9">nhẹ, dễ áp dụng</text>
<text x="585" y="158" text-anchor="middle" fill="#94a3b8" font-size="9">thiếu điều phối deploy</text>
</svg>`,
        "Ba cách tiếp cận: Pact (consumer-driven), Spring Cloud Contract (provider-driven), và schema validation.",
        "Three approaches: Pact (consumer-driven), Spring Cloud Contract (provider-driven), and schema validation.",
        "三つのアプローチ：Pact（コンシューマ駆動）、Spring Cloud Contract（プロバイダ駆動）、スキーマ検証。"
      ),
      QA(
        "Khi nào tôi nên chọn Spring Cloud Contract thay vì Pact?",
        "When should I choose Spring Cloud Contract over Pact?",
        "Nếu toàn bộ hệ thống là Java/Spring và đội provider muốn 'sở hữu' và định nghĩa hợp đồng trước, Spring Cloud Contract tích hợp mượt và tận dụng stub sẵn cho consumer. Nếu bạn có nhiều ngôn ngữ (mobile Swift/Kotlin, web JS, backend Go/Java), muốn hợp đồng phản ánh đúng nhu cầu thật của từng consumer, và cần cổng can-i-deploy để deploy độc lập, Pact là lựa chọn tự nhiên hơn nhờ tính đa ngôn ngữ và hệ sinh thái Broker.",
        "If the whole system is Java/Spring and the provider team wants to 'own' and define the contract up front, Spring Cloud Contract integrates smoothly and reuses stubs for consumers. If you have many languages (mobile Swift/Kotlin, web JS, backend Go/Java), want contracts to reflect each consumer's true needs, and need a can-i-deploy gate for independent deploys, Pact is the more natural choice thanks to its polyglot support and Broker ecosystem.",
        "PactではなくSpring Cloud Contractを選ぶべきなのはいつですか？",
        "システム全体がJava/Springで、プロバイダチームが契約を「所有」し事前に定義したいなら、Spring Cloud Contractは滑らかに統合しコンシューマ向けにスタブを再利用します。多言語（モバイルSwift/Kotlin、ウェブJS、バックエンドGo/Java）を持ち、契約が各コンシューマの真のニーズを反映することを望み、独立デプロイのためのcan-i-deployゲートが必要なら、多言語対応とブローカーのエコシステムのおかげでPactがより自然な選択です。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Tổng kết và lộ trình áp dụng cho đội của bạn",
      en: "12. Summary and an adoption roadmap for your team",
      ja: "12. まとめとチーム向けの導入ロードマップ",
    },
    blocks: [
      P(
        "Consumer-driven contract testing giải quyết đúng bài toán mà E2E toàn phần làm rất tốn kém: bảo đảm hai dịch vụ triển khai độc lập vẫn nói cùng một ngôn ngữ. Ta đã đi từ vấn đề tích hợp, qua cơ chế Pact sinh hợp đồng từ consumer thật, tới cách viết interaction với PactV3, cách dùng matchers để giữ hợp đồng linh hoạt, cách đọc pact file và tránh những cạm bẫy phổ biến. Mảnh ghép còn thiếu là phía provider phát lại và hệ thống điều phối — hai bài sau sẽ hoàn thiện bức tranh.",
        "Consumer-driven contract testing solves precisely the problem full E2E makes so expensive: ensuring two independently deployed services still speak the same language. We moved from the integration problem, through the Pact mechanism of generating a contract from the real consumer, to writing interactions with PactV3, using matchers to keep contracts flexible, reading the pact file and avoiding common pitfalls. The missing piece is the provider replay and the orchestration system — the next two articles complete the picture.",
        "コンシューマ駆動契約テストは、全E2Eが非常に高価にする問題を正確に解決します：独立してデプロイされた二つのサービスが同じ言語を話し続けることを保証するのです。統合の問題から、実際のコンシューマから契約を生成するPactの仕組み、PactV3でのインタラクションの記述、契約を柔軟に保つマッチャーの使用、pactファイルの読解、よくある落とし穴の回避まで進みました。欠けている部分はプロバイダの再生とオーケストレーションシステムです—次の二記事が全体像を完成させます。"
      ),
      UL(
        ["Bắt đầu từ MỘT cặp consumer-provider quan trọng nhất, đừng phủ toàn bộ ngay.", "Viết interaction cho cả đường hạnh phúc lẫn các mã lỗi consumer thật xử lý.", "Dùng matchers cho mọi giá trị động; chỉ cố định những gì thực sự bất biến.", "Đưa test consumer vào CI ngay, coi pact file là artifact bắt buộc của build.", "Chuẩn bị bước tiếp: publish pact lên Broker và bật provider verification."],
        ["Start from ONE most important consumer-provider pair, don't cover everything at once.", "Write interactions for both the happy path and the error codes the real consumer handles.", "Use matchers for every dynamic value; only fix what is truly invariant.", "Put the consumer test in CI immediately, treat the pact file as a required build artifact.", "Prepare the next step: publish the pact to the Broker and enable provider verification."],
        ["最も重要な一つのコンシューマ・プロバイダのペアから始め、一度に全てを覆わないこと。", "ハッピーパスと実際のコンシューマが処理するエラーコードの両方のインタラクションを書くこと。", "すべての動的な値にマッチャーを使い、真に不変なものだけを固定すること。", "コンシューマテストを直ちにCIに入れ、pactファイルを必須のビルド成果物として扱うこと。", "次のステップを準備すること：pactをブローカーへ公開しプロバイダ検証を有効にすること。"]
      ),
      TIP(
        "Chỉ số thành công đầu tiên nên đo là: 'thời gian phát hiện một breaking change ở API'. Trước Pact nó thường tính bằng ngày (tới khi khách phàn nàn); sau Pact nó phải tính bằng phút (ngay trong CI). Nếu con số đó giảm rõ rệt, việc áp dụng đã đúng hướng.",
        "The first success metric to measure is: 'time to detect an API breaking change'. Before Pact it is usually counted in days (until customers complain); after Pact it must be counted in minutes (right in CI). If that number drops sharply, the adoption is on the right track.",
        "最初に測るべき成功指標は「APIの破壊的変更を検出するまでの時間」です。Pact導入前は通常、日単位（顧客が苦情を言うまで）で数えます。導入後は分単位（CI内で即座に）でなければなりません。その数字が大きく下がれば、導入は正しい軌道に乗っています。"
      ),
    ],
  },
];

/* ============================================================================
 * ARTICLE 2 — Provider verification
 * ==========================================================================*/
const svgVerifyFlow = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Provider verification · プロバイダ検証の流れ</text>
<rect x="30" y="60" width="150" height="54" rx="10" fill="#12315e" stroke="#7dd3fc"/><text x="105" y="84" text-anchor="middle" font-size="12" fill="#e2e8f0">Pact file</text><text x="105" y="102" text-anchor="middle" font-size="10" fill="#94a3b8">(interactions)</text>
<rect x="285" y="60" width="150" height="54" rx="10" fill="#0b3b2e" stroke="#34d399"/><text x="360" y="84" text-anchor="middle" font-size="12" fill="#e2e8f0">Verifier</text><text x="360" y="102" text-anchor="middle" font-size="10" fill="#94a3b8">replay each request</text>
<rect x="540" y="60" width="150" height="54" rx="10" fill="#3b0764" stroke="#c084fc"/><text x="615" y="84" text-anchor="middle" font-size="12" fill="#e2e8f0">Real provider</text><text x="615" y="102" text-anchor="middle" font-size="10" fill="#94a3b8">running instance</text>
<path d="M180 87 H285" stroke="#7dd3fc" stroke-width="2" marker-end="url(#a2)"/>
<path d="M435 87 H540" stroke="#34d399" stroke-width="2" marker-end="url(#a2)"/>
<rect x="285" y="150" width="150" height="46" rx="10" fill="#1e293b" stroke="#f59e0b"/><text x="360" y="170" text-anchor="middle" font-size="11" fill="#e2e8f0">provider state</text><text x="360" y="186" text-anchor="middle" font-size="9" fill="#94a3b8">seed data before replay</text>
<path d="M360 150 V114" stroke="#f59e0b" stroke-width="2" marker-end="url(#a2)"/>
<text x="615" y="150" text-anchor="middle" font-size="10" fill="#34d399">actual response == expected ? PASS : FAIL</text>
<defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs></svg>`;

const svgCompatMatrix = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Backward compatibility · 後方互換性のマトリクス</text>
<g font-size="11" fill="#e2e8f0">
<rect x="30" y="50" width="150" height="30" fill="#1e293b"/><text x="40" y="70">Consumer \\ Provider</text>
<rect x="180" y="50" width="120" height="30" fill="#1e293b"/><text x="200" y="70">v1.0</text>
<rect x="300" y="50" width="120" height="30" fill="#1e293b"/><text x="320" y="70">v1.1</text>
<rect x="420" y="50" width="120" height="30" fill="#1e293b"/><text x="440" y="70">v2.0</text>
<rect x="30" y="80" width="150" height="34" fill="#0b1220"/><text x="40" y="102">app v1.0</text>
<rect x="180" y="80" width="120" height="34" fill="#052e16"/><text x="220" y="102" fill="#34d399">PASS</text>
<rect x="300" y="80" width="120" height="34" fill="#052e16"/><text x="340" y="102" fill="#34d399">PASS</text>
<rect x="420" y="80" width="120" height="34" fill="#3b0a0a"/><text x="440" y="102" fill="#f87171">FAIL</text>
<rect x="30" y="114" width="150" height="34" fill="#0b1220"/><text x="40" y="136">app v1.1</text>
<rect x="180" y="114" width="120" height="34" fill="#3b0a0a"/><text x="220" y="136" fill="#f87171">FAIL</text>
<rect x="300" y="114" width="120" height="34" fill="#052e16"/><text x="340" y="136" fill="#34d399">PASS</text>
<rect x="420" y="114" width="120" height="34" fill="#052e16"/><text x="440" y="136" fill="#34d399">PASS</text>
</g>
<text x="30" y="180" font-size="11" fill="#94a3b8">can-i-deploy đọc bảng này để quyết định: chỉ deploy khi mọi ô liên quan đều PASS.</text>
<text x="30" y="200" font-size="11" fill="#94a3b8">can-i-deploy reads this matrix — deploy only when every relevant cell is PASS.</text></svg>`;

const pages2 = [
  {
    heading: { vi: "1. Sau hợp đồng: trách nhiệm chuyển sang provider", en: "1. After the contract: the burden shifts to the provider", ja: "1. 契約の後：責任はプロバイダへ移る" },
    blocks: [
      P(
        "Ở bài trước, consumer đã sinh ra một pact file mô tả chính xác những gì nó kỳ vọng ở provider. Nhưng một hợp đồng chỉ có giá trị khi bên còn lại thực sự tôn trọng nó. Provider verification là bước phát lại (replay) từng interaction trong pact vào một instance provider đang chạy thật, rồi so sánh phản hồi thực tế với phản hồi kỳ vọng. Đây là nơi contract testing chứng minh giá trị: nếu provider vô tình đổi tên trường, đổi kiểu dữ liệu hay bỏ một endpoint, verification sẽ đỏ ngay trong CI của provider — trước khi thay đổi kịp chạm tới production.",
        "In the previous article, the consumer produced a pact file describing exactly what it expects from the provider. But a contract only matters if the other side actually honors it. Provider verification is the step of replaying every interaction from the pact against a real, running provider instance, then comparing the actual response with the expected one. This is where contract testing earns its keep: if the provider accidentally renames a field, changes a type or drops an endpoint, verification goes red right in the provider's CI — long before the change can reach production.",
        "前の記事では、コンシューマがプロバイダへの期待を正確に記述したpactファイルを生成しました。しかし契約は、相手側が実際にそれを守って初めて意味を持ちます。プロバイダ検証とは、pact内の各インタラクションを実際に稼働中のプロバイダインスタンスへ再生し、実際の応答と期待した応答を比較する工程です。ここで契約テストは真価を発揮します：プロバイダが誤ってフィールド名を変えたり、型を変えたり、エンドポイントを削除したりすれば、検証は変更が本番に届くずっと前に、プロバイダのCI内で即座に赤くなります。"
      ),
      P(
        "Điểm mấu chốt cần nhớ: verification không chạy trên môi trường thật với dữ liệu thật của khách hàng, mà chạy trên một provider được dựng riêng cho kiểm thử, với dữ liệu được gieo có kiểm soát. Provider không cần biết consumer là ai hay UI trông thế nào; nó chỉ cần chứng minh rằng với mỗi yêu cầu trong hợp đồng, nó trả về đúng cấu trúc đã cam kết. Nhờ tách bạch này, một provider phục vụ 40 consumer vẫn chỉ cần một bộ verification duy nhất đọc tất cả pact liên quan.",
        "A key point to remember: verification does not run against the real environment with real customer data, but against a provider stood up specifically for testing, with controlled seeded data. The provider need not know who the consumer is or what the UI looks like; it only has to prove that for each request in the contract, it returns the exact structure it promised. Thanks to this separation, a provider serving 40 consumers still needs only a single verification suite that reads all the relevant pacts.",
        "覚えておくべき重要点：検証は実顧客データを持つ本番環境ではなく、検証専用に立ち上げたプロバイダと、制御された投入データに対して実行します。プロバイダはコンシューマが誰か、UIがどう見えるかを知る必要はありません。契約内の各リクエストに対し、約束した構造を正確に返すことを証明するだけでよいのです。この分離のおかげで、40のコンシューマにサービスを提供するプロバイダでも、関連する全pactを読む単一の検証スイートだけで済みます。"
      ),
      NOTE(
        "Oracle của bài này: provider PHẢI thoả mãn mọi interaction mà một consumer thật đã cam kết. Không phải 'API trả 200', mà là 'cấu trúc và ràng buộc đúng như hợp đồng'.",
        "This article's oracle: the provider MUST satisfy every interaction a real consumer committed to. Not 'the API returns 200', but 'the structure and constraints match the contract exactly'.",
        "本記事のオラクル：プロバイダは、実際のコンシューマが約束した全インタラクションを満たさなければなりません。「APIが200を返す」ではなく「構造と制約が契約と正確に一致する」ことです。"
      ),
    ],
  },
  {
    heading: { vi: "2. Cơ chế phát lại hoạt động thế nào", en: "2. How the replay mechanism works", ja: "2. 再生メカニズムの仕組み" },
    blocks: [
      P(
        "Verifier đọc pact file, lấy ra danh sách interaction, và với mỗi interaction nó dựng lại đúng HTTP request (method, path, query, header, body) rồi gửi tới provider đang chạy. Phản hồi thực tế được so khớp với phần response kỳ vọng, nhưng không so khớp cứng từng byte: các matcher mà consumer đã dùng (như like, eachLike, regex) được diễn giải để so theo kiểu và ràng buộc, không so theo giá trị cụ thể. Nhờ vậy provider được tự do trả về '123' hay '999' miễn là vẫn là chuỗi số đúng định dạng.",
        "The Verifier reads the pact file, extracts the list of interactions, and for each one it reconstructs the exact HTTP request (method, path, query, headers, body) and sends it to the running provider. The actual response is matched against the expected response, but not byte-for-byte: the matchers the consumer used (like, eachLike, regex) are interpreted so comparison is by type and constraint, not by concrete value. This lets the provider return '123' or '999' as long as it is still a correctly formatted numeric string.",
        "Verifierはpactファイルを読み、インタラクションのリストを取り出し、それぞれについて正確なHTTPリクエスト（メソッド・パス・クエリ・ヘッダ・ボディ）を再構築して稼働中のプロバイダへ送信します。実際の応答は期待応答と照合されますが、バイト単位ではありません。コンシューマが使ったマッチャー（like・eachLike・正規表現）が解釈され、具体値ではなく型と制約で比較されます。これによりプロバイダは、正しい形式の数値文字列である限り「123」でも「999」でも返せます。"
      ),
      IMG(svgVerifyFlow, "Luồng phát lại: Verifier gửi request từ pact, gieo state, so phản hồi.", "Replay flow: the Verifier sends requests from the pact, seeds state, compares responses.", "再生フロー：Verifierはpactからリクエストを送り、状態を投入し、応答を比較します。"),
      P(
        "Một chi tiết quan trọng: mỗi interaction thường đi kèm một 'provider state' — một chuỗi mô tả tiền đề dữ liệu, ví dụ 'tài khoản 123 tồn tại và có số dư 500'. Trước khi phát lại request, Verifier gọi một hook để đưa provider về đúng trạng thái đó. Nếu thiếu bước gieo trạng thái này, request sẽ chạy trên dữ liệu ngẫu nhiên và verification sẽ đỏ vì lý do sai — không phải vì hợp đồng bị phá, mà vì dữ liệu không khớp bối cảnh.",
        "One important detail: each interaction usually carries a 'provider state' — a string describing a data precondition, for example 'account 123 exists with balance 500'. Before replaying the request, the Verifier calls a hook to bring the provider into exactly that state. Without this seeding step, the request runs against random data and verification goes red for the wrong reason — not because the contract broke, but because the data did not match the context.",
        "重要な詳細が一つあります：各インタラクションには通常「プロバイダ状態」という、データの前提条件を記述する文字列（例：「口座123が存在し残高500」）が付きます。リクエストを再生する前に、Verifierはフックを呼んでプロバイダをまさにその状態にします。この投入ステップが無いと、リクエストはランダムなデータに対して走り、検証は誤った理由で赤くなります—契約が壊れたからではなく、データが文脈に合わないためです。"
      ),
    ],
  },
  {
    heading: { vi: "3. Cài đặt Verifier với pact-js", en: "3. Setting up the Verifier with pact-js", ja: "3. pact-js での Verifier のセットアップ" },
    blocks: [
      P(
        "Ở hệ sinh thái JavaScript/TypeScript, thư viện @pact-foundation/pact cung cấp lớp Verifier. Ý tưởng là: khởi động provider thật (hoặc một bản dựng test của nó) trên một cổng cục bộ, rồi trỏ Verifier vào cổng đó cùng với nguồn pact. Verifier sẽ tự làm phần còn lại. Đoạn code dưới đây là khung tối thiểu cho một provider Node/Express, thường được đặt trong bộ test của chính provider và chạy như một bài test bình thường.",
        "In the JavaScript/TypeScript ecosystem, the @pact-foundation/pact library provides the Verifier class. The idea is: start the real provider (or a test build of it) on a local port, then point the Verifier at that port together with a pact source. The Verifier does the rest. The snippet below is a minimal skeleton for a Node/Express provider, typically placed in the provider's own test suite and run like an ordinary test.",
        "JavaScript/TypeScriptエコシステムでは、@pact-foundation/pactライブラリがVerifierクラスを提供します。考え方はこうです：実際のプロバイダ（またはそのテストビルド）をローカルポートで起動し、そのポートとpactソースをVerifierに指定します。残りはVerifierが行います。以下のスニペットはNode/Expressプロバイダ向けの最小の骨組みで、通常プロバイダ自身のテストスイートに置き、普通のテストのように実行します。"
      ),
      CODE("javascript", `// provider.pact.test.js
import { Verifier } from "@pact-foundation/pact";
import { app } from "../src/app.js";

let server;
beforeAll(() => { server = app.listen(8080); });
afterAll(() => server.close());

test("Provider honours the wallet consumer contract", () => {
  return new Verifier({
    provider: "wallet-api",
    providerBaseUrl: "http://localhost:8080",
    // đọc pact từ file cục bộ (bài sau sẽ đổi sang Broker)
    pactUrls: ["./pacts/wallet-web-wallet-api.json"],
    providerVersion: process.env.GIT_SHA || "dev",
  }).verifyProvider();
});`),
      TIP(
        "Luôn để verifyProvider() trả về Promise và return nó trong test — nếu quên return, test runner có thể báo xanh trước khi verification thực sự chạy xong.",
        "Always let verifyProvider() return its Promise and return it from the test — if you forget to return it, the runner may go green before verification actually finishes.",
        "verifyProvider() が返すPromiseを必ずテストからreturnしてください。returnを忘れると、検証が実際に終わる前にランナーが緑になることがあります。"
      ),
    ],
  },
  {
    heading: { vi: "4. Lấy pact từ đâu: file cục bộ hay Pact Broker", en: "4. Where pacts come from: local file or Pact Broker", ja: "4. pact の入手元：ローカルファイルか Pact Broker か" },
    blocks: [
      P(
        "Ban đầu, để học, ta thường trỏ Verifier vào một file pact tĩnh bằng pactUrls. Cách này ổn cho demo nhưng không mở rộng được: khi có nhiều consumer và nhiều version, ta không thể chép tay từng file. Trong dự án thật, pact được publish lên một Pact Broker và Verifier lấy về theo tên provider cùng với các tiêu chí chọn version (ví dụ: 'mọi pact của consumer đang chạy production'). Bài tiếp theo dành riêng cho Broker; ở đây chỉ cần biết Verifier hỗ trợ cả hai nguồn qua cấu hình.",
        "At first, for learning, we usually point the Verifier at a static pact file via pactUrls. That is fine for a demo but does not scale: with many consumers and many versions, you cannot hand-copy each file. In a real project, pacts are published to a Pact Broker and the Verifier fetches them by provider name together with version-selection criteria (for example, 'every pact of consumers currently in production'). The next article is dedicated to the Broker; here it is enough to know the Verifier supports both sources via configuration.",
        "最初は学習のため、通常pactUrlsで静的なpactファイルをVerifierに指定します。デモには十分ですが、スケールしません：多数のコンシューマと多数のバージョンがあると、各ファイルを手でコピーできません。実際のプロジェクトではpactはPact Brokerへ公開され、Verifierはプロバイダ名とバージョン選択条件（例：「現在本番稼働中のコンシューマの全pact」）で取得します。次の記事はBroker専用です。ここではVerifierが設定で両方のソースに対応することを知れば十分です。"
      ),
      CODE("javascript", `// Cấu hình lấy pact từ Broker thay cho pactUrls
new Verifier({
  provider: "wallet-api",
  providerBaseUrl: "http://localhost:8080",
  pactBrokerUrl: process.env.PACT_BROKER_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  // chỉ verify pact của consumer đang ở môi trường production
  consumerVersionSelectors: [{ deployedOrReleased: true }],
  publishVerificationResult: process.env.CI === "true",
  providerVersion: process.env.GIT_SHA,
});`),
      WARN(
        "Chỉ bật publishVerificationResult trên CI với providerVersion là git sha thật. Publish kết quả từ máy dev với version 'dev' sẽ làm bẩn dữ liệu can-i-deploy sau này.",
        "Only enable publishVerificationResult on CI with providerVersion set to a real git sha. Publishing results from a dev machine with version 'dev' will pollute can-i-deploy data later.",
        "publishVerificationResult はCI上でのみ、providerVersionを実際のgit shaにして有効化してください。開発マシンからバージョン「dev」で結果を公開すると、後の can-i-deploy データを汚します。"
      ),
    ],
  },
  {
    heading: { vi: "5. Provider states: gieo dữ liệu đúng bối cảnh", en: "5. Provider states: seeding the right data context", ja: "5. プロバイダ状態：正しいデータ文脈の投入" },
    blocks: [
      P(
        "Provider states là cơ chế để Verifier yêu cầu provider 'hãy chuẩn bị dữ liệu như thế này trước khi tôi gửi request'. Consumer khai báo state khi viết interaction (ví dụ given('account 123 exists with balance 500')); provider hiện thực một stateHandler ứng với đúng chuỗi đó. Bên trong handler, ta thường insert bản ghi vào một database test, hoặc cấu hình một stub nội bộ. Điều quan trọng là mỗi state phải độc lập và có thể lặp lại — không phụ thuộc thứ tự chạy.",
        "Provider states are the mechanism for the Verifier to ask the provider to 'prepare data like this before I send the request'. The consumer declares a state when writing the interaction (for example given('account 123 exists with balance 500')); the provider implements a stateHandler keyed to exactly that string. Inside the handler you typically insert records into a test database or configure an internal stub. The key is that each state must be independent and repeatable — never dependent on run order.",
        "プロバイダ状態は、Verifierがプロバイダに「リクエストを送る前にこのようにデータを準備してほしい」と依頼する仕組みです。コンシューマはインタラクション記述時に状態を宣言し（例：given('account 123 exists with balance 500')）、プロバイダはまさにその文字列に対応するstateHandlerを実装します。ハンドラ内では通常、テストDBにレコードを挿入するか内部スタブを構成します。肝心なのは、各状態が独立し反復可能であること—実行順に依存しないことです。"
      ),
      CODE("javascript", `new Verifier({
  provider: "wallet-api",
  providerBaseUrl: "http://localhost:8080",
  pactBrokerUrl: process.env.PACT_BROKER_URL,
  providerVersion: process.env.GIT_SHA,
  stateHandlers: {
    "account 123 exists with balance 500": async () => {
      await db.accounts.deleteMany();
      await db.accounts.insert({ id: "123", balanceCents: 50000, currency: "VND" });
      return "seeded account 123";
    },
    "account 123 does not exist": async () => {
      await db.accounts.deleteMany();
      return "cleared accounts";
    },
  },
});`),
      P(
        "Chú ý cách hai state đối lập được chuẩn bị: một state gieo tài khoản tồn tại, một state xoá sạch để mô phỏng tài khoản không tồn tại. Chính nhờ tách state mà provider có thể chứng minh nó xử lý đúng cả đường thành công lẫn đường lỗi 404, mà không cần consumer phải biết gì về cấu trúc database của provider. Đây là ranh giới đẹp: consumer mô tả 'bối cảnh nghiệp vụ', provider tự dịch bối cảnh đó thành thao tác dữ liệu cụ thể.",
        "Notice how the two opposite states are prepared: one seeds an existing account, the other wipes everything clean to simulate a non-existent account. It is precisely this state separation that lets the provider prove it handles both the success path and the 404 error path correctly, without the consumer needing to know anything about the provider's database schema. This is a clean boundary: the consumer describes a 'business context', the provider translates that context into concrete data operations itself.",
        "二つの対立する状態がどう準備されるかに注目してください：一方は既存口座を投入し、他方は全消去して存在しない口座を模擬します。まさにこの状態分離により、プロバイダはコンシューマがプロバイダのDBスキーマを何も知らなくても、成功パスと404エラーパスの両方を正しく処理することを証明できます。これは美しい境界です：コンシューマは「業務文脈」を記述し、プロバイダがその文脈を自ら具体的なデータ操作へ翻訳します。"
      ),
    ],
  },
  {
    heading: { vi: "6. Xác thực, header động & request filters", en: "6. Auth, dynamic headers & request filters", ja: "6. 認証・動的ヘッダ・リクエストフィルタ" },
    blocks: [
      P(
        "Nhiều provider yêu cầu token xác thực ở mỗi request. Nhưng pact file lại lưu token mà consumer đã dùng lúc ghi hợp đồng — token đó có thể đã hết hạn khi provider verify. Giải pháp là requestFilter: một middleware chạy ngay trước khi Verifier gửi request, cho phép ta thay header Authorization bằng một token hợp lệ mới sinh cho môi trường test. Đây cũng là nơi tiêm các header hạ tầng như trace-id mà provider cần nhưng không thuộc phạm vi hợp đồng nghiệp vụ.",
        "Many providers require an auth token on every request. But the pact file stores the token the consumer used when recording the contract — that token may have expired by the time the provider verifies. The solution is a requestFilter: a middleware that runs just before the Verifier sends the request, letting you swap the Authorization header for a freshly minted valid token for the test environment. This is also where you inject infrastructure headers like trace-id that the provider needs but are outside the business contract's scope.",
        "多くのプロバイダは全リクエストに認証トークンを要求します。しかしpactファイルには、コンシューマが契約記録時に使ったトークンが保存されており、プロバイダ検証時には失効している場合があります。解決策はrequestFilterです：Verifierがリクエストを送る直前に走るミドルウェアで、Authorizationヘッダをテスト環境向けに新しく発行した有効なトークンへ差し替えられます。ここは、プロバイダが必要とするが業務契約の範囲外であるtrace-idなどのインフラヘッダを注入する場所でもあります。"
      ),
      CODE("javascript", `new Verifier({
  provider: "wallet-api",
  providerBaseUrl: "http://localhost:8080",
  pactUrls: ["./pacts/wallet-web-wallet-api.json"],
  providerVersion: process.env.GIT_SHA,
  // thay token cũ trong pact bằng token test hợp lệ
  requestFilter: (req, res, next) => {
    req.headers["authorization"] = "Bearer " + issueTestToken({ scope: "wallet.read" });
    next();
  },
});`),
      NOTE(
        "requestFilter chỉ nên chạm tới phần KHÔNG thuộc hợp đồng (auth hạ tầng, tracing). Nếu bạn dùng nó để sửa body cho khớp, bạn đang che giấu một hợp đồng bị phá thay vì phát hiện nó.",
        "A requestFilter should only touch what is OUTSIDE the contract (infrastructure auth, tracing). If you use it to rewrite the body to match, you are hiding a broken contract instead of catching it.",
        "requestFilterは契約の外側（インフラ認証・トレーシング）のみに触れるべきです。ボディを書き換えて一致させるために使うなら、壊れた契約を検出する代わりに隠していることになります。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chạy verification happy path đầu-cuối", en: "7. Running an end-to-end happy-path verification", ja: "7. エンドツーエンドの正常系検証の実行" },
    blocks: [
      P(
        "Ghép mọi mảnh lại, một lần chạy verification hoàn chỉnh gồm: khởi động provider test, nạp nguồn pact, đăng ký stateHandlers, gắn requestFilter, rồi gọi verifyProvider(). Verifier lần lượt gieo state, gửi từng request, và in ra một báo cáo dạng danh sách interaction kèm PASS/FAIL. Khi tất cả xanh, ta có bằng chứng máy kiểm chứng rằng provider hiện tại tương thích với mọi consumer trong tập pact đã chọn.",
        "Putting all the pieces together, one complete verification run consists of: starting the test provider, loading the pact source, registering stateHandlers, attaching the requestFilter, then calling verifyProvider(). The Verifier seeds each state in turn, sends each request, and prints a report listing interactions with PASS/FAIL. When everything is green, you have machine-checked evidence that the current provider is compatible with every consumer in the selected pact set.",
        "全ての部品を組み合わせると、完全な検証実行は次の要素から成ります：テストプロバイダの起動、pactソースの読み込み、stateHandlersの登録、requestFilterの取り付け、そしてverifyProvider()の呼び出し。Verifierは各状態を順に投入し、各リクエストを送り、インタラクションをPASS/FAIL付きで列挙するレポートを出力します。全て緑になれば、現在のプロバイダが選択したpactセット内の全コンシューマと互換であることを機械的に検証した証拠が得られます。"
      ),
      CODE("bash", `# chạy như một bài test bình thường trong CI của provider
npm run test:pact-provider

# ví dụ output rút gọn của Verifier:
# Verifying a pact between wallet-web and wallet-api
#   Given account 123 exists with balance 500
#     a request for balance of account 123
#       returns a response which
#         has status code 200 (OK)
#         has a matching body (OK)
#   Given account 123 does not exist
#     a request for balance of account 999
#       returns a response which
#         has status code 404 (OK)
# 2 interactions, 0 failures`),
      P(
        "Điều đáng chú ý trong output là mỗi dòng 'Given ...' tương ứng với một provider state, và mỗi kiểm tra con (status code, matching body) được đánh giá độc lập. Khi đọc log verification, hãy tập trung vào những dòng con này thay vì chỉ nhìn tổng PASS/FAIL — chúng cho biết chính xác phần nào của hợp đồng đang được thoả mãn và phần nào không.",
        "What is worth noting in the output is that each 'Given ...' line corresponds to a provider state, and each sub-check (status code, matching body) is evaluated independently. When reading verification logs, focus on these sub-lines rather than only the overall PASS/FAIL — they tell you exactly which part of the contract is being satisfied and which is not.",
        "出力で注目すべきは、各「Given ...」行がプロバイダ状態に対応し、各サブチェック（ステータスコード・ボディ一致）が独立に評価される点です。検証ログを読むときは、全体のPASS/FAILだけでなくこれらのサブ行に注目してください—契約のどの部分が満たされ、どの部分が満たされていないかを正確に教えてくれます。"
      ),
    ],
  },
  {
    heading: { vi: "8. Khi verification thất bại: đọc diff & chẩn đoán", en: "8. When verification fails: reading the diff & diagnosing", ja: "8. 検証が失敗したとき：差分の読解と診断" },
    blocks: [
      P(
        "Giá trị lớn nhất của Pact nằm ở lúc nó đỏ. Khi một verification fail, Verifier in ra một diff cho biết trường nào thiếu, sai kiểu, hay sai giá trị so với matcher. Ví dụ nếu provider đổi 'balanceCents' thành 'balance', diff sẽ chỉ rõ khoá kỳ vọng không tồn tại trong phản hồi thực tế. Người đọc cần phân biệt hai loại nguyên nhân: một là provider thật sự phá vỡ hợp đồng (phải sửa provider hoặc phối hợp lại với consumer), hai là môi trường test bị gieo sai (state handler lỗi) khiến đỏ 'giả'.",
        "Pact's greatest value shows up when it goes red. When a verification fails, the Verifier prints a diff showing which field is missing, has the wrong type, or the wrong value against the matcher. For example, if the provider renames 'balanceCents' to 'balance', the diff points out that the expected key does not exist in the actual response. The reader must distinguish two kinds of cause: one is the provider genuinely breaking the contract (fix the provider or re-coordinate with the consumer), the other is the test environment being seeded wrong (a faulty state handler) causing a 'false' red.",
        "Pactの最大の価値は赤くなったときに現れます。検証が失敗すると、Verifierはどのフィールドが欠けているか、型が違うか、マッチャーに対し値が違うかを示す差分を出力します。例えばプロバイダが「balanceCents」を「balance」に改名すると、差分は期待キーが実応答に存在しないと指摘します。読み手は二種類の原因を区別する必要があります：一つはプロバイダが本当に契約を破ったこと（プロバイダを修正するかコンシューマと再調整）、もう一つはテスト環境の投入ミス（状態ハンドラの不具合）による「偽の」赤です。"
      ),
      CODE("text", `# diff điển hình khi provider đổi tên trường
Failures:

1) Verifying a pact between wallet-web and wallet-api
   Given account 123 exists with balance 500
     a request for balance of account 123 returns a response which
       has a matching body
         $.balanceCents  Expected 'balanceCents' but was missing
         $.balance       Actual key not expected by the contract

# => hợp đồng bị phá: provider phải giữ 'balanceCents' hoặc phát hành version mới có phối hợp.`),
      SCEN(
        "Chẩn đoán một pha đỏ thật", "Diagnosing a real red",
        "Sáng thứ Hai, pipeline của wallet-api đỏ ở bước verify. Diff cho thấy trường 'currency' bị đổi từ chuỗi 'VND' sang một object { code, symbol }. Đội provider định nghĩa lại kiểu để phục vụ một tính năng đa tiền tệ — nhưng consumer wallet-web đang parse currency như chuỗi. Nhờ Pact, va chạm này bị chặn trong CI của provider, trước khi kịp deploy. Giải pháp: provider thêm trường mới 'currencyDetail' và giữ 'currency' cũ cho tới khi consumer chuyển đổi xong.",
        "On Monday morning, the wallet-api pipeline goes red at the verify step. The diff shows the 'currency' field changed from the string 'VND' to an object { code, symbol }. The provider team redefined the type to serve a multi-currency feature — but the wallet-web consumer parses currency as a string. Thanks to Pact, this collision is blocked in the provider's CI, before any deploy. The fix: the provider adds a new 'currencyDetail' field and keeps the old 'currency' until the consumer has migrated.",
        "月曜の朝、wallet-apiのパイプラインが検証ステップで赤になります。差分は「currency」フィールドが文字列「VND」からオブジェクト{ code, symbol }へ変わったことを示します。プロバイダチームは多通貨機能のため型を再定義しました—しかしコンシューマwallet-webはcurrencyを文字列としてパースします。Pactのおかげで、この衝突はデプロイ前にプロバイダのCIで阻止されます。解決策：プロバイダは新フィールド「currencyDetail」を追加し、コンシューマの移行が済むまで旧「currency」を保持します。"
      ),
    ],
  },
  {
    heading: { vi: "9. Versioning & tương thích ngược", en: "9. Versioning & backward compatibility", ja: "9. バージョニングと後方互換性" },
    blocks: [
      P(
        "Contract testing không cấm thay đổi API; nó chỉ buộc thay đổi diễn ra an toàn. Nguyên tắc vàng là mở rộng thay vì phá vỡ: thêm trường mới (an toàn), nhưng không xoá hay đổi kiểu trường cũ khi vẫn còn consumer phụ thuộc. Mỗi lần provider verify, nó gắn kết quả với một providerVersion (git sha), nhờ đó ta xây được một ma trận tương thích: version provider nào thoả mãn version consumer nào. Ma trận này chính là dữ liệu để công cụ quyết định deploy ở bài sau.",
        "Contract testing does not forbid API changes; it only forces them to happen safely. The golden rule is expand rather than break: add new fields (safe), but do not remove or retype old fields while consumers still depend on them. Each time the provider verifies, it ties the result to a providerVersion (git sha), letting you build a compatibility matrix: which provider version satisfies which consumer version. This matrix is exactly the data the deploy-decision tool uses in the next article.",
        "契約テストはAPI変更を禁じません。安全に変更させるだけです。黄金律は、破壊ではなく拡張です：新フィールドの追加は安全ですが、依存するコンシューマがまだいる間は旧フィールドの削除や型変更をしません。プロバイダは検証のたびに結果をproviderVersion（git sha）へ結び付け、互換性マトリクスを構築できます：どのプロバイダバージョンがどのコンシューマバージョンを満たすか。このマトリクスこそ、次の記事でデプロイ判断ツールが使うデータです。"
      ),
      IMG(svgCompatMatrix, "Ma trận tương thích: mỗi ô là kết quả verify của một cặp version.", "Compatibility matrix: each cell is the verify result of one version pair.", "互換性マトリクス：各セルは一つのバージョンペアの検証結果です。"),
      UL(
        ["Thêm trường mới: an toàn, không phá consumer cũ.", "Nới lỏng ràng buộc (bắt buộc → tuỳ chọn) ở response: thường an toàn.", "Xoá trường / đổi kiểu / đổi tên: phá vỡ nếu còn consumer dùng.", "Thêm trường bắt buộc ở REQUEST provider yêu cầu: có thể phá consumer cũ."],
        ["Adding a new field: safe, does not break old consumers.", "Loosening a constraint (required → optional) on the response: usually safe.", "Removing a field / changing a type / renaming: breaking if a consumer still uses it.", "Adding a required field to the REQUEST the provider demands: can break old consumers."],
        ["新フィールドの追加：安全で、旧コンシューマを壊しません。", "応答の制約を緩める（必須→任意）：通常安全です。", "フィールド削除・型変更・改名：使用中のコンシューマがいれば破壊的です。", "プロバイダが要求するリクエストに必須フィールドを追加：旧コンシューマを壊し得ます。"]
      ),
    ],
  },
  {
    heading: { vi: "10. Message pact (bất đồng bộ) so với HTTP", en: "10. Message pacts (async) versus HTTP", ja: "10. メッセージpact（非同期）とHTTPの比較" },
    blocks: [
      P(
        "Không phải mọi tích hợp đều là HTTP request/response. Nhiều hệ ngân hàng và fintech giao tiếp qua hàng đợi message (Kafka, RabbitMQ): provider phát một message, consumer tiêu thụ nó. Pact hỗ trợ điều này qua 'message pact' — thay vì kiểm request/response, nó kiểm cấu trúc của message mà provider tạo ra có khớp với thứ consumer kỳ vọng đọc được. Verifier gọi một hàm sinh message thật của provider rồi so khớp bằng matcher, y như với HTTP.",
        "Not every integration is an HTTP request/response. Many banking and fintech systems communicate over message queues (Kafka, RabbitMQ): the provider emits a message, the consumer consumes it. Pact supports this via a 'message pact' — instead of checking request/response, it checks that the structure of the message the provider produces matches what the consumer expects to read. The Verifier calls a function that produces the provider's real message, then matches it with matchers, just like HTTP.",
        "全ての統合がHTTPリクエスト/レスポンスではありません。多くの銀行・フィンテックシステムはメッセージキュー（Kafka・RabbitMQ）で通信します：プロバイダがメッセージを発行し、コンシューマが消費します。Pactは「メッセージpact」でこれに対応します—リクエスト/レスポンスを検査する代わりに、プロバイダが生成するメッセージの構造がコンシューマの読取り期待と一致するかを検査します。Verifierはプロバイダの実メッセージを生成する関数を呼び、HTTPと同様にマッチャーで照合します。"
      ),
      CODE("javascript", `import { MessageProviderPact } from "@pact-foundation/pact";

new MessageProviderPact({
  provider: "wallet-api",
  pactBrokerUrl: process.env.PACT_BROKER_URL,
  providerVersion: process.env.GIT_SHA,
  messageProviders: {
    "a balance-changed event": async () => ({
      accountId: "123",
      balanceCents: 50000,
      changedAt: new Date().toISOString(),
    }),
  },
}).verify();`),
      P(
        "Với message pact, provider state vẫn có vai trò tương tự (chuẩn bị bối cảnh), nhưng đối tượng kiểm tra là payload của event chứ không phải HTTP body. Cách tiếp cận này giúp mở rộng contract testing sang kiến trúc event-driven mà nhiều tổ chức tài chính đang dùng, nơi một sự kiện 'số dư thay đổi' phải được nhiều consumer (thông báo, đối soát, phát hiện gian lận) đọc đúng cùng một lúc.",
        "With a message pact, provider states still play a similar role (preparing context), but the thing under test is the event payload rather than an HTTP body. This approach extends contract testing to the event-driven architectures many financial organizations use, where a 'balance changed' event must be read correctly by several consumers (notifications, reconciliation, fraud detection) all at once.",
        "メッセージpactでは、プロバイダ状態は依然として同様の役割（文脈準備）を果たしますが、検査対象はHTTPボディではなくイベントのペイロードです。このアプローチは、多くの金融組織が使うイベント駆動アーキテクチャへ契約テストを拡張します。そこでは「残高変更」イベントが複数のコンシューマ（通知・照合・不正検知）に同時に正しく読まれなければなりません。"
      ),
    ],
  },
  {
    heading: { vi: "11. Đưa provider verification vào CI", en: "11. Putting provider verification into CI", ja: "11. プロバイダ検証をCIへ組み込む" },
    blocks: [
      P(
        "Provider verification chỉ phát huy giá trị khi chạy tự động trên mỗi thay đổi của provider. Trong pipeline, bước verify thường đứng sau unit test và trước khi build artifact deploy. Nó lấy pact từ Broker, dựng provider với database test, chạy Verifier, rồi publish kết quả kèm git sha lên Broker. Nếu bất kỳ interaction nào fail, pipeline dừng — provider không được phép merge một thay đổi phá vỡ consumer đang chạy.",
        "Provider verification only delivers value when it runs automatically on every provider change. In the pipeline, the verify step usually sits after unit tests and before building the deploy artifact. It fetches pacts from the Broker, stands up the provider with a test database, runs the Verifier, then publishes the result with the git sha to the Broker. If any interaction fails, the pipeline stops — the provider must not merge a change that breaks a running consumer.",
        "プロバイダ検証は、プロバイダの変更ごとに自動実行されて初めて価値を生みます。パイプラインでは、検証ステップは通常ユニットテストの後、デプロイ成果物のビルド前に置かれます。Brokerからpactを取得し、テストDBでプロバイダを立ち上げ、Verifierを実行し、結果をgit shaと共にBrokerへ公開します。いずれかのインタラクションが失敗すればパイプラインは停止します—プロバイダは稼働中のコンシューマを壊す変更をマージしてはなりません。"
      ),
      CODE("yaml", `# .github/workflows/provider-verify.yml
name: provider-verify
on: [push]
jobs:
  verify:
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:16, env: { POSTGRES_PASSWORD: test }, ports: ["5432:5432"] }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run migrate:test
      - run: npm run test:pact-provider
        env:
          PACT_BROKER_URL: \${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: \${{ secrets.PACT_BROKER_TOKEN }}
          GIT_SHA: \${{ github.sha }}
          CI: "true"`),
      TIP(
        "Gắn database test như một service của job (ví dụ postgres) và migrate trước khi verify. State handler cần một database sạch, xác định, để mọi lần chạy đều lặp lại được.",
        "Attach a test database as a job service (e.g. postgres) and migrate before verifying. State handlers need a clean, deterministic database so every run is repeatable.",
        "テストDBをジョブのサービス（例：postgres）として付け、検証前にマイグレートしてください。状態ハンドラは、毎回の実行が反復可能になるよう、クリーンで決定的なDBを必要とします。"
      ),
    ],
  },
  {
    heading: { vi: "12. Góc phỏng vấn & tổng kết", en: "12. Interview angle & summary", ja: "12. 面接の観点とまとめ" },
    blocks: [
      QA(
        "Sự khác nhau giữa provider state và mock dữ liệu thông thường là gì?",
        "What is the difference between a provider state and ordinary data mocking?",
        "Provider state là một hợp đồng nhỏ về tiền đề dữ liệu do consumer khai báo và provider tự hiện thực; nó gắn với từng interaction và được Verifier gọi trước khi phát lại. Mock dữ liệu thông thường nằm trong tay người viết test provider và không có ràng buộc từ hợp đồng. State giúp giữ ranh giới: consumer nói 'cần bối cảnh gì', provider quyết 'gieo thế nào'.",
        "A provider state is a small contract about a data precondition, declared by the consumer and implemented by the provider; it is tied to each interaction and called by the Verifier before replay. Ordinary data mocking is in the hands of whoever writes the provider test and has no contract-driven constraint. States keep the boundary: the consumer says 'what context is needed', the provider decides 'how to seed it'.",
        "プロバイダ状態は、コンシューマが宣言しプロバイダが実装する、データ前提条件に関する小さな契約です。各インタラクションに結び付き、再生前にVerifierが呼びます。通常のデータモックはプロバイダテストの書き手の裁量にあり、契約由来の制約がありません。状態は境界を保ちます：コンシューマは「どんな文脈が必要か」を言い、プロバイダは「どう投入するか」を決めます。"
      ),
      QA(
        "Vì sao phải publish kết quả verification kèm providerVersion?",
        "Why must you publish the verification result together with the providerVersion?",
        "Vì quyết định deploy sau này (can-i-deploy) cần biết chính xác version provider nào đã được kiểm chứng với version consumer nào. Nếu chỉ publish 'pass/fail' mà thiếu version, ta không thể trả lời câu hỏi 'version tôi sắp deploy có an toàn không'. providerVersion là git sha giúp truy vết kết quả về đúng commit sinh ra nó.",
        "Because the later deploy decision (can-i-deploy) needs to know exactly which provider version was verified against which consumer version. If you only publish 'pass/fail' without the version, you cannot answer 'is the version I'm about to deploy safe'. The providerVersion is a git sha that traces the result back to the exact commit that produced it.",
        "後のデプロイ判断（can-i-deploy）が、どのプロバイダバージョンがどのコンシューマバージョンに対し検証されたかを正確に知る必要があるからです。バージョン無しで「合否」だけ公開すると、「これからデプロイするバージョンは安全か」に答えられません。providerVersionはgit shaで、結果をそれを生んだ正確なコミットへ辿らせます。"
      ),
      QA(
        "Nếu provider phục vụ nhiều consumer với kỳ vọng khác nhau thì verify thế nào?",
        "If a provider serves many consumers with different expectations, how do you verify?",
        "Verifier lấy về tất cả pact liên quan (theo consumerVersionSelectors) và phát lại từng interaction của mọi consumer trong cùng một lần chạy. Provider phải thoả mãn hợp nhất của mọi hợp đồng. Nếu hai consumer kỳ vọng mâu thuẫn, đó là tín hiệu thiết kế API cần xem lại — thường bằng cách versioning endpoint hoặc thêm trường thay vì đổi trường.",
        "The Verifier fetches all relevant pacts (per consumerVersionSelectors) and replays every interaction of every consumer in the same run. The provider must satisfy the union of all contracts. If two consumers have conflicting expectations, that is a signal the API design needs review — usually by versioning the endpoint or adding fields rather than changing them.",
        "Verifierは関連する全pactを（consumerVersionSelectorsに従い）取得し、全コンシューマの各インタラクションを同一実行で再生します。プロバイダは全契約の和集合を満たさねばなりません。二つのコンシューマの期待が矛盾すれば、それはAPI設計を見直す信号です—通常、フィールドを変えるのではなくエンドポイントをバージョニングするかフィールドを追加します。"
      ),
      P(
        "Tóm lại, provider verification là nửa còn lại của contract testing: nó biến một pact tĩnh thành một bài kiểm chứng sống chạy trên provider thật. Nắm vững provider states, requestFilter, versioning và cách đọc diff khi đỏ là đủ để vận hành verification vững vàng. Mảnh ghép cuối — điều phối nhiều consumer/provider và quyết định deploy an toàn — thuộc về Pact Broker, chủ đề của bài tiếp theo.",
        "In summary, provider verification is the other half of contract testing: it turns a static pact into a living check that runs against a real provider. Mastering provider states, requestFilter, versioning and how to read the diff when red is enough to operate verification solidly. The final piece — coordinating many consumers/providers and deciding on safe deploys — belongs to the Pact Broker, the subject of the next article.",
        "まとめると、プロバイダ検証は契約テストのもう半分です：静的なpactを、実プロバイダに対して走る生きた検査へ変えます。プロバイダ状態・requestFilter・バージョニング・赤時の差分の読み方を習得すれば、検証を堅実に運用できます。最後の部品—多数のコンシューマ/プロバイダの調整と安全なデプロイ判断—はPact Brokerに属し、次の記事の主題です。"
      ),
    ],
  },
];

/* ============================================================================
 * ARTICLE 3 — Pact Broker & CI workflow
 * ==========================================================================*/
const svgBrokerArch = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Pact Broker · ブローカーの役割</text>
<rect x="30" y="60" width="150" height="50" rx="10" fill="#12315e" stroke="#7dd3fc"/><text x="105" y="80" text-anchor="middle" font-size="11" fill="#e2e8f0">Consumer CI</text><text x="105" y="98" text-anchor="middle" font-size="9" fill="#94a3b8">publish pact</text>
<rect x="285" y="45" width="150" height="120" rx="12" fill="#1e293b" stroke="#c084fc" stroke-width="2"/><text x="360" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="#e2e8f0">Pact Broker</text><text x="360" y="92" text-anchor="middle" font-size="9" fill="#94a3b8">pacts + versions</text><text x="360" y="108" text-anchor="middle" font-size="9" fill="#94a3b8">tags + results</text><text x="360" y="124" text-anchor="middle" font-size="9" fill="#94a3b8">matrix</text><text x="360" y="140" text-anchor="middle" font-size="9" fill="#94a3b8">can-i-deploy</text>
<rect x="540" y="60" width="150" height="50" rx="10" fill="#0b3b2e" stroke="#34d399"/><text x="615" y="80" text-anchor="middle" font-size="11" fill="#e2e8f0">Provider CI</text><text x="615" y="98" text-anchor="middle" font-size="9" fill="#94a3b8">verify + publish</text>
<path d="M180 85 H285" stroke="#7dd3fc" stroke-width="2" marker-end="url(#a3)"/>
<path d="M540 85 H435" stroke="#34d399" stroke-width="2" marker-end="url(#a3)"/>
<text x="360" y="195" text-anchor="middle" font-size="10" fill="#94a3b8">webhook: pact mới → kích hoạt provider verify / new pact triggers provider verify</text>
<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#c084fc"/></marker></defs></svg>`;

const svgCanDeploy = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">can-i-deploy gate · デプロイ可否ゲート</text>
<rect x="40" y="60" width="180" height="50" rx="10" fill="#12315e" stroke="#7dd3fc"/><text x="130" y="82" text-anchor="middle" font-size="11" fill="#e2e8f0">Muốn deploy consumer</text><text x="130" y="100" text-anchor="middle" font-size="9" fill="#94a3b8">version abc123 → production</text>
<rect x="290" y="55" width="150" height="60" rx="10" fill="#1e293b" stroke="#f59e0b"/><text x="365" y="80" text-anchor="middle" font-size="11" fill="#e2e8f0">can-i-deploy</text><text x="365" y="98" text-anchor="middle" font-size="9" fill="#94a3b8">tra matrix</text>
<path d="M220 85 H290" stroke="#7dd3fc" stroke-width="2" marker-end="url(#a4)"/>
<rect x="510" y="45" width="170" height="40" rx="10" fill="#052e16" stroke="#34d399"/><text x="595" y="70" text-anchor="middle" font-size="11" fill="#34d399">ALLOWED → deploy</text>
<rect x="510" y="105" width="170" height="40" rx="10" fill="#3b0a0a" stroke="#f87171"/><text x="595" y="130" text-anchor="middle" font-size="11" fill="#f87171">BLOCKED → stop</text>
<path d="M440 78 L510 65" stroke="#34d399" stroke-width="2" marker-end="url(#a4)"/>
<path d="M440 92 L510 122" stroke="#f87171" stroke-width="2" marker-end="url(#a4)"/>
<text x="40" y="175" font-size="10" fill="#94a3b8">Chỉ ALLOWED khi mọi provider mà consumer phụ thuộc đã verify version production tương ứng.</text>
<text x="40" y="195" font-size="10" fill="#94a3b8">ALLOWED only when every provider the consumer depends on has verified the matching production version.</text>
<defs><marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs></svg>`;

const pages3 = [
  {
    heading: { vi: "1. Vì sao pact file rải rác là không đủ", en: "1. Why scattered pact files are not enough", ja: "1. 散在するpactファイルでは不十分な理由" },
    blocks: [
      P(
        "Khi mới bắt đầu, ta chép tay pact file từ consumer sang provider. Cách này sập ngay khi hệ thống lớn lên: một nền tảng SaaS đa tenant có thể có hàng chục dịch vụ, mỗi cặp consumer–provider lại có nhiều version đang chạy ở các môi trường khác nhau. Câu hỏi thật sự cần trả lời không phải 'file pact ở đâu' mà là 'version consumer tôi sắp deploy có tương thích với version provider đang chạy production không'. Không một file tĩnh nào trả lời được câu này; ta cần một nơi tập trung ghi nhớ mọi pact, mọi version, và mọi kết quả verify.",
        "When starting out, we hand-copy the pact file from consumer to provider. This collapses as soon as the system grows: a multi-tenant SaaS platform may have dozens of services, and each consumer–provider pair has many versions running in different environments. The real question to answer is not 'where is the pact file' but 'is the consumer version I'm about to deploy compatible with the provider version currently in production'. No static file can answer this; we need a central place that remembers every pact, every version, and every verification result.",
        "始めたばかりの頃は、pactファイルをコンシューマからプロバイダへ手でコピーします。システムが大きくなると、これはすぐに破綻します：マルチテナントのSaaSプラットフォームには数十のサービスがあり得、各コンシューマ–プロバイダのペアは異なる環境で稼働する多数のバージョンを持ちます。本当に答えるべき問いは「pactファイルはどこか」ではなく「これからデプロイするコンシューマバージョンは、現在本番稼働中のプロバイダバージョンと互換か」です。静的ファイルではこれに答えられません。全pact・全バージョン・全検証結果を記憶する中央の場所が必要です。"
      ),
      P(
        "Pact Broker là hạ tầng đó. Nó là một dịch vụ lưu trữ pact được publish, gắn mỗi pact với version và tag của consumer, nhận kết quả verify từ provider, và từ đó xây một ma trận tương thích. Trên nền ma trận này, Broker cung cấp câu trả lời 'có/không' cho câu hỏi deploy — biến contract testing từ một bộ test rời rạc thành một cơ chế điều phối release an toàn cho cả tổ chức.",
        "The Pact Broker is that infrastructure. It is a service that stores published pacts, ties each pact to the consumer's version and tags, receives verification results from the provider, and from these builds a compatibility matrix. On top of this matrix, the Broker provides a yes/no answer to the deploy question — turning contract testing from a set of isolated tests into an organization-wide safe-release coordination mechanism.",
        "Pact Brokerがそのインフラです。公開されたpactを保存し、各pactをコンシューマのバージョンとタグに結び付け、プロバイダから検証結果を受け取り、それらから互換性マトリクスを構築するサービスです。このマトリクスの上で、Brokerはデプロイの問いに対する可否の答えを提供します—契約テストを、孤立したテスト群から組織全体の安全リリース調整メカニズムへ変えるのです。"
      ),
      NOTE(
        "Oracle của bài này: KHÔNG BAO GIỜ deploy một version mà các hợp đồng của nó chưa được verify tương thích với môi trường đích.",
        "This article's oracle: NEVER deploy a version whose contracts have not been verified compatible with the target environment.",
        "本記事のオラクル：契約が対象環境と互換であると検証されていないバージョンを、決してデプロイしないこと。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc Pact Broker", en: "2. Pact Broker architecture", ja: "2. Pact Broker のアーキテクチャ" },
    blocks: [
      P(
        "Về mặt kiến trúc, Pact Broker là một ứng dụng web có database (thường PostgreSQL) lưu bốn nhóm dữ liệu: các pact đã publish, các version và tag của consumer/provider, các kết quả verification, và các bản ghi deployment/release. Consumer CI đẩy pact lên; provider CI kéo pact về, verify, rồi đẩy kết quả lên. Có thể tự host bằng Docker image chính thức, hoặc dùng bản quản lý PactFlow. Với đội nhỏ, một container Broker + một PostgreSQL là đủ để bắt đầu.",
        "Architecturally, the Pact Broker is a web application with a database (usually PostgreSQL) storing four groups of data: published pacts, consumer/provider versions and tags, verification results, and deployment/release records. The consumer CI pushes pacts up; the provider CI pulls pacts down, verifies, then pushes results up. You can self-host it with the official Docker image, or use the managed PactFlow. For a small team, one Broker container plus one PostgreSQL is enough to get started.",
        "アーキテクチャ上、Pact Brokerはデータベース（通常PostgreSQL）を持つWebアプリケーションで、四種類のデータを保存します：公開されたpact、コンシューマ/プロバイダのバージョンとタグ、検証結果、デプロイ/リリース記録。コンシューマCIはpactを押し上げ、プロバイダCIはpactを取得し検証して結果を押し上げます。公式Dockerイメージで自己ホストするか、マネージドのPactFlowを使えます。小規模チームなら、Brokerコンテナ一つとPostgreSQL一つで始めるのに十分です。"
      ),
      IMG(svgBrokerArch, "Broker đứng giữa: nhận pact từ consumer, kết quả từ provider, trả lời can-i-deploy.", "The Broker sits in the middle: receives pacts from consumers, results from providers, answers can-i-deploy.", "Brokerは中央に位置します：コンシューマからpactを、プロバイダから結果を受け取り、can-i-deployに答えます。"),
      CODE("yaml", `# docker-compose.yml — Pact Broker tự host tối thiểu
services:
  postgres:
    image: postgres:16
    environment: { POSTGRES_USER: pact, POSTGRES_PASSWORD: pact, POSTGRES_DB: pact }
  broker:
    image: pactfoundation/pact-broker:latest
    ports: ["9292:9292"]
    depends_on: [postgres]
    environment:
      PACT_BROKER_DATABASE_URL: "postgres://pact:pact@postgres/pact"
      PACT_BROKER_BASIC_AUTH_USERNAME: admin
      PACT_BROKER_BASIC_AUTH_PASSWORD: \${BROKER_PASSWORD}`),
    ],
  },
  {
    heading: { vi: "3. Publish pact kèm version & tag", en: "3. Publishing pacts with version & tags", ja: "3. バージョンとタグ付きでpactを公開する" },
    blocks: [
      P(
        "Sau khi test consumer sinh ra pact, bước publish đẩy nó lên Broker cùng hai mẩu metadata quan trọng: consumer version (nên là git sha để truy vết) và branch/tag (ví dụ nhánh main hay môi trường). Tag là cách Broker biết một version đang 'ở đâu' trong vòng đời — nhờ tag, câu hỏi 'consumer nào đang chạy production' có câu trả lời chính xác. Việc publish thường dùng CLI pact-broker hoặc lệnh tích hợp trong thư viện.",
        "After the consumer test produces a pact, the publish step pushes it to the Broker with two important pieces of metadata: the consumer version (ideally a git sha for traceability) and a branch/tag (for example the main branch or an environment). A tag is how the Broker knows where a version is in its lifecycle — thanks to tags, the question 'which consumer is running in production' has a precise answer. Publishing typically uses the pact-broker CLI or a library-integrated command.",
        "コンシューマテストがpactを生成した後、公開ステップはそれを二つの重要なメタデータと共にBrokerへ押し上げます：コンシューマバージョン（追跡のため理想的にはgit sha）とブランチ/タグ（例：mainブランチや環境）。タグは、Brokerがバージョンがライフサイクルのどこにあるかを知る手段です—タグのおかげで「どのコンシューマが本番稼働中か」に正確に答えられます。公開は通常pact-broker CLIかライブラリ統合コマンドを使います。"
      ),
      CODE("bash", `# publish pact với version = git sha và gắn branch hiện tại
pact-broker publish ./pacts \\
  --consumer-app-version "$GIT_SHA" \\
  --branch "$GIT_BRANCH" \\
  --broker-base-url "$PACT_BROKER_URL" \\
  --broker-token "$PACT_BROKER_TOKEN"

# ví dụ: consumer 'wallet-web' version a1b2c3 trên branch main`),
      TIP(
        "Dùng git sha làm version thay vì số tăng thủ công. Nó tự động, duy nhất, và cho phép truy ngược mọi kết quả về đúng commit — cực kỳ hữu ích khi điều tra một pha BLOCKED bất ngờ.",
        "Use the git sha as the version instead of a manually incremented number. It is automatic, unique, and lets you trace every result back to the exact commit — invaluable when investigating an unexpected BLOCKED.",
        "手動で増やす番号の代わりにgit shaをバージョンに使ってください。自動・一意で、全結果を正確なコミットへ辿れます—予期しないBLOCKEDを調査するとき極めて有用です。"
      ),
    ],
  },
  {
    heading: { vi: "4. Ma trận consumer × provider", en: "4. The consumer × provider matrix", ja: "4. コンシューマ×プロバイダのマトリクス" },
    blocks: [
      P(
        "Trái tim của Broker là ma trận: một bảng mà mỗi hàng ghi lại một cặp (consumer version, provider version) và kết quả verification giữa chúng đã biết hay chưa, pass hay fail. Ma trận này lớn dần theo thời gian và là bộ nhớ tập thể của mọi tương tác đã được kiểm chứng. Khi ai đó hỏi 'deploy version này có an toàn không', Broker không đoán — nó tra đúng các hàng liên quan trong ma trận và trả lời dựa trên dữ liệu thật.",
        "The heart of the Broker is the matrix: a table where each row records a (consumer version, provider version) pair and whether the verification between them is known, passing or failing. This matrix grows over time and is the collective memory of every verified interaction. When someone asks 'is deploying this version safe', the Broker does not guess — it looks up exactly the relevant rows in the matrix and answers based on real data.",
        "Brokerの心臓部はマトリクスです：各行が（コンシューマバージョン、プロバイダバージョン）のペアと、それらの間の検証が既知か・合格か・不合格かを記録する表です。このマトリクスは時間と共に成長し、検証された全インタラクションの集合的記憶です。誰かが「このバージョンのデプロイは安全か」と問うと、Brokerは推測しません—マトリクス内の関連する行を正確に参照し、実データに基づいて答えます。"
      ),
      IMG(svgCanDeploy, "can-i-deploy tra ma trận và trả về ALLOWED hoặc BLOCKED cho một lần deploy.", "can-i-deploy queries the matrix and returns ALLOWED or BLOCKED for a deploy.", "can-i-deployはマトリクスを照会し、デプロイに対しALLOWEDかBLOCKEDを返します。"),
      P(
        "Điểm tinh tế: ma trận cho phép mỗi bên tiến hoá độc lập miễn là luôn tồn tại một tổ hợp tương thích ở môi trường đích. Nhờ vậy consumer và provider không phải deploy đồng bộ như trước; mỗi đội đi theo nhịp riêng, và Broker là trọng tài đảm bảo không ai vô tình đẩy ra một tổ hợp chưa từng được kiểm chứng.",
        "The subtle point: the matrix lets each side evolve independently as long as a compatible combination always exists in the target environment. This means consumer and provider no longer have to deploy in lockstep; each team moves at its own pace, and the Broker is the referee ensuring nobody accidentally ships an unverified combination.",
        "微妙な点：マトリクスは、対象環境に互換な組み合わせが常に存在する限り、各側が独立して進化することを許します。つまりコンシューマとプロバイダはもはや歩調を合わせてデプロイする必要がなく、各チームは自分のペースで動き、Brokerは誰も未検証の組み合わせを誤って出荷しないことを保証する審判です。"
      ),
    ],
  },
  {
    heading: { vi: "5. can-i-deploy: cổng an toàn trước deploy", en: "5. can-i-deploy: the safety gate before deploy", ja: "5. can-i-deploy：デプロイ前の安全ゲート" },
    blocks: [
      P(
        "can-i-deploy là lệnh biến toàn bộ ma trận thành một quyết định thực thi được trong pipeline. Ta hỏi Broker: 'tôi muốn deploy pacticipant X version Y tới môi trường production — có được không?'. Broker kiểm mọi provider (hoặc consumer) mà X phụ thuộc, xác nhận rằng version tương ứng ở production đã verify thành công với Y, rồi trả về mã thoát 0 (được) hoặc khác 0 (chặn). Đặt lệnh này ngay trước bước deploy là cách chặn cứng những release phá vỡ tích hợp.",
        "can-i-deploy is the command that turns the whole matrix into an actionable decision in the pipeline. You ask the Broker: 'I want to deploy pacticipant X version Y to the production environment — may I?'. The Broker checks every provider (or consumer) X depends on, confirms that the corresponding production version has verified successfully against Y, then returns exit code 0 (allowed) or non-zero (blocked). Placing this command right before the deploy step is how you hard-block releases that would break integration.",
        "can-i-deployは、マトリクス全体をパイプライン内の実行可能な判断へ変えるコマンドです。Brokerに問います：「pacticipant X のバージョンYを本番環境へデプロイしたい—よいか」。BrokerはXが依存する全プロバイダ（またはコンシューマ）を確認し、本番の対応バージョンがYに対し検証成功していることを確かめ、終了コード0（許可）か非0（ブロック）を返します。このコマンドをデプロイステップの直前に置くことが、統合を壊すリリースを固く阻止する方法です。"
      ),
      CODE("bash", `# cổng an toàn: chỉ deploy nếu Broker xác nhận tương thích
pact-broker can-i-deploy \\
  --pacticipant wallet-web \\
  --version "$GIT_SHA" \\
  --to-environment production \\
  --broker-base-url "$PACT_BROKER_URL" \\
  --broker-token "$PACT_BROKER_TOKEN"

# exit 0 => pipeline tiếp tục deploy
# exit != 0 => pipeline dừng, in ra provider nào chưa verify`),
      WARN(
        "Đừng bỏ qua can-i-deploy để 'giải phóng' một release đang kẹt. Nếu nó chặn, nghĩa là một tổ hợp chưa được kiểm chứng — bỏ qua đồng nghĩa với việc tự nguyện đẩy rủi ro tích hợp ra production.",
        "Do not skip can-i-deploy to 'unblock' a stuck release. If it blocks, it means a combination is unverified — skipping it means voluntarily shipping integration risk to production.",
        "詰まったリリースを「解放」するためにcan-i-deployを飛ばさないでください。ブロックされるなら未検証の組み合わせがあるということです—飛ばすのは統合リスクを自ら本番へ出荷することです。"
      ),
    ],
  },
  {
    heading: { vi: "6. record-deployment & môi trường", en: "6. record-deployment & environments", ja: "6. record-deployment と環境" },
    blocks: [
      P(
        "Để can-i-deploy biết 'version nào đang ở production', pipeline phải báo cho Broker mỗi khi một deploy thành công. Lệnh record-deployment cập nhật trạng thái: version này giờ đang chạy ở môi trường kia. Nhờ vậy Broker luôn có bức tranh cập nhật về hiện trạng từng môi trường (test, staging, production), và mọi truy vấn can-i-deploy đều dựa trên sự thật mới nhất chứ không phải phỏng đoán.",
        "For can-i-deploy to know 'which version is in production', the pipeline must tell the Broker every time a deploy succeeds. The record-deployment command updates the state: this version is now running in that environment. This keeps the Broker's picture of each environment (test, staging, production) current, so every can-i-deploy query is based on the latest truth rather than guesswork.",
        "can-i-deployが「どのバージョンが本番にあるか」を知るには、デプロイ成功のたびにパイプラインがBrokerへ伝えねばなりません。record-deploymentコマンドは状態を更新します：このバージョンが今その環境で稼働中である、と。これによりBrokerの各環境（test・staging・production）の把握が最新に保たれ、全can-i-deploy照会が推測ではなく最新の真実に基づきます。"
      ),
      CODE("bash", `# sau khi deploy thành công, ghi nhận trạng thái môi trường
pact-broker record-deployment \\
  --pacticipant wallet-web \\
  --version "$GIT_SHA" \\
  --environment production \\
  --broker-base-url "$PACT_BROKER_URL" \\
  --broker-token "$PACT_BROKER_TOKEN"`),
      P(
        "Cặp can-i-deploy (trước deploy) và record-deployment (sau deploy) tạo thành một vòng khép kín: hỏi trước khi làm, ghi lại sau khi làm. Chính vòng này giữ cho ma trận luôn phản ánh đúng thực địa, và là điều kiện để mọi quyết định deploy sau đó vẫn chính xác. Bỏ record-deployment thì can-i-deploy sẽ dần đưa ra phán quyết dựa trên dữ liệu cũ.",
        "The pair of can-i-deploy (before deploy) and record-deployment (after deploy) forms a closed loop: ask before doing, record after doing. It is this loop that keeps the matrix reflecting the real field, and is the precondition for every subsequent deploy decision to stay correct. Skip record-deployment and can-i-deploy will gradually judge based on stale data.",
        "can-i-deploy（デプロイ前）とrecord-deployment（デプロイ後）の対は閉ループを成します：実行前に問い、実行後に記録する。このループこそがマトリクスを現場に忠実に保ち、以後の全デプロイ判断が正しくあり続ける前提です。record-deploymentを省くと、can-i-deployは次第に古いデータに基づいて判断するようになります。"
      ),
    ],
  },
  {
    heading: { vi: "7. Webhooks: tự động kích hoạt provider verify", en: "7. Webhooks: auto-triggering provider verification", ja: "7. Webhook：プロバイダ検証の自動起動" },
    blocks: [
      P(
        "Có một khoảng trống thời gian nguy hiểm: consumer publish một pact mới, nhưng provider chưa chạy verify lại cho tới lần commit tiếp theo của nó. Trong khoảng đó, ma trận thiếu một ô và can-i-deploy có thể chặn oan. Webhook lấp khoảng trống này: khi Broker nhận một pact mới hoặc pact thay đổi, nó tự gọi một URL để kích hoạt pipeline verify của provider ngay lập tức. Nhờ vậy hợp đồng mới được kiểm chứng gần như tức thì, không phải chờ.",
        "There is a dangerous time gap: the consumer publishes a new pact, but the provider does not re-run verification until its next commit. In that window, the matrix is missing a cell and can-i-deploy may block unfairly. A webhook fills this gap: when the Broker receives a new or changed pact, it automatically calls a URL to trigger the provider's verify pipeline immediately. This way the new contract is verified almost instantly, with no waiting.",
        "危険な時間差があります：コンシューマが新しいpactを公開しても、プロバイダは次のコミットまで検証を再実行しません。その間、マトリクスにはセルが欠け、can-i-deployが不当にブロックし得ます。Webhookはこの隙間を埋めます：Brokerが新規または変更されたpactを受け取ると、自動的にURLを呼んでプロバイダの検証パイプラインを即座に起動します。これにより新契約はほぼ即時に検証され、待つ必要がありません。"
      ),
      CODE("bash", `# tạo webhook: khi pact của wallet-api thay đổi, kích hoạt provider CI
pact-broker create-webhook \\
  "https://ci.example.com/api/trigger/provider-verify" \\
  --request POST \\
  --header "Authorization: Bearer \${CI_TOKEN}" \\
  --contract-content-changed \\
  --provider wallet-api \\
  --broker-base-url "$PACT_BROKER_URL"`),
      NOTE(
        "Webhook biến contract testing thành thời gian thực: consumer đổi hợp đồng buổi sáng thì phản hồi tương thích của provider có ngay trong vài phút, thay vì chờ tới sprint sau.",
        "Webhooks make contract testing real-time: if a consumer changes a contract in the morning, the provider's compatibility feedback arrives within minutes, instead of waiting until the next sprint.",
        "Webhookは契約テストをリアルタイムにします：コンシューマが朝に契約を変えれば、プロバイダの互換フィードバックは次のスプリントを待たず数分で届きます。"
      ),
    ],
  },
  {
    heading: { vi: "8. Pending pacts & WIP pacts", en: "8. Pending pacts & WIP pacts", ja: "8. ペンディングpactとWIP pact" },
    blocks: [
      P(
        "Một vấn đề thực tế: nếu mọi pact mới lập tức làm đỏ pipeline provider, thì consumer sẽ ngại thêm kỳ vọng mới vì sợ 'phá build của người khác'. Pending pacts giải quyết điều này: một pact chưa từng được provider verify thành công sẽ được đánh dấu 'pending', và nếu nó fail thì pipeline provider vẫn xanh (chỉ cảnh báo). Chỉ khi provider đã verify thành công một lần, pact đó mới 'tốt nghiệp' và từ đó fail sẽ làm đỏ build. Cơ chế này cho phép consumer đẩy kỳ vọng mới mà không chặn provider.",
        "A practical problem: if every new pact immediately reddens the provider pipeline, consumers become reluctant to add new expectations for fear of 'breaking someone else's build'. Pending pacts solve this: a pact the provider has never successfully verified is marked 'pending', and if it fails the provider pipeline stays green (warning only). Only once the provider has verified it successfully does that pact 'graduate', and from then on a failure reddens the build. This lets consumers push new expectations without blocking the provider.",
        "実際的な問題：新しいpactが全て即座にプロバイダのパイプラインを赤くすると、コンシューマは「他人のビルドを壊す」ことを恐れて新しい期待の追加をためらいます。ペンディングpactがこれを解決します：プロバイダが一度も検証成功していないpactは「ペンディング」と印付けされ、失敗してもプロバイダのパイプラインは緑のまま（警告のみ）です。プロバイダが一度検証成功して初めてそのpactは「卒業」し、以後は失敗がビルドを赤くします。これによりコンシューマはプロバイダをブロックせず新しい期待を出せます。"
      ),
      P(
        "WIP (work in progress) pacts là phần bổ trợ: chúng tự động đưa các pact từ nhánh đang phát triển của consumer vào lần verify của provider dưới dạng pending, để provider thấy trước 'điều consumer sắp yêu cầu' mà không bị bắt buộc phải đỏ. Kết hợp pending + WIP giúp hai đội tiến hoá song song một cách lịch sự: consumer thử nghiệm tự do, provider có tầm nhìn sớm, và chỉ những hợp đồng đã ổn định mới trở thành ràng buộc cứng.",
        "WIP (work in progress) pacts are the complement: they automatically pull pacts from the consumer's in-development branches into the provider's verify run as pending, so the provider gets an early look at 'what the consumer is about to require' without being forced red. Combining pending + WIP lets the two teams evolve in parallel politely: the consumer experiments freely, the provider gets early visibility, and only stabilized contracts become hard constraints.",
        "WIP（作業中）pactは補完です：コンシューマの開発中ブランチのpactを自動的にプロバイダの検証実行へペンディングとして取り込み、プロバイダが赤を強いられずに「コンシューマがこれから要求すること」を早期に見られます。ペンディング＋WIPの組み合わせは、二チームを礼儀正しく並行進化させます：コンシューマは自由に試し、プロバイダは早期の可視性を得て、安定した契約だけが固い制約になります。"
      ),
      TIP(
        "Bật pending pacts + WIP pacts ngay khi có từ hai đội trở lên. Không có chúng, contract testing dễ bị coi là 'thứ hay chặn build' và bị gỡ bỏ.",
        "Turn on pending pacts + WIP pacts as soon as you have two or more teams. Without them, contract testing is easily seen as 'the thing that blocks builds' and gets removed.",
        "二つ以上のチームができたら、すぐにペンディングpactとWIP pactを有効にしてください。これらが無いと、契約テストは「ビルドを止めるもの」と見なされ、外されがちです。"
      ),
    ],
  },
  {
    heading: { vi: "9. Triển khai độc lập consumer & provider an toàn", en: "9. Deploying consumer & provider independently and safely", ja: "9. コンシューマとプロバイダの独立かつ安全なデプロイ" },
    blocks: [
      P(
        "Mục tiêu cuối của toàn bộ cỗ máy này là independent deployability: mỗi dịch vụ được release theo nhịp riêng mà không cần một 'ngày deploy chung' đầy rủi ro. Broker cho phép điều đó bằng cách đảm bảo, tại mọi thời điểm, mọi cặp đang chạy production đều tương thích. Consumer muốn thêm một trường? Nó publish pact, chờ provider verify, rồi can-i-deploy sẽ tự cho phép khi provider đã sẵn sàng. Provider muốn tối ưu nội bộ? Miễn không phá hợp đồng, nó deploy tự do.",
        "The ultimate goal of this whole machine is independent deployability: each service released at its own cadence without a risky 'shared deploy day'. The Broker enables that by ensuring, at all times, that every pair running in production is compatible. A consumer wants to add a field? It publishes the pact, waits for provider verification, then can-i-deploy allows it automatically once the provider is ready. A provider wants to optimize internally? As long as it does not break the contract, it deploys freely.",
        "この機械全体の最終目標は独立デプロイ可能性です：各サービスが危険な「共通デプロイ日」なしに自分のペースでリリースされること。Brokerは、常に本番稼働中の全ペアが互換であることを保証してこれを可能にします。コンシューマがフィールドを追加したい？pactを公開し、プロバイダ検証を待ち、プロバイダの準備が整えばcan-i-deployが自動的に許可します。プロバイダが内部最適化をしたい？契約を壊さない限り、自由にデプロイします。"
      ),
      SCEN(
        "Một tuần release điển hình ở nền tảng SaaS", "A typical release week at a SaaS platform",
        "Đội billing (provider) muốn đổi cách tính proration nội bộ và deploy thứ Ba; can-i-deploy xanh vì hợp đồng không đổi, họ release ngay. Đội dashboard (consumer) muốn hiển thị thêm trường 'nextInvoiceDate', publish pact mới thứ Tư; webhook kích hoạt provider verify, provider bổ sung trường, verify xanh; thứ Năm dashboard chạy can-i-deploy → ALLOWED và deploy. Không có ngày deploy chung, không có cuộc họp đồng bộ nào — Broker là điểm phối hợp duy nhất.",
        "The billing team (provider) wants to change internal proration and deploy on Tuesday; can-i-deploy is green because the contract is unchanged, so they release immediately. The dashboard team (consumer) wants to show a new 'nextInvoiceDate' field and publishes a new pact on Wednesday; the webhook triggers provider verify, the provider adds the field, verification goes green; on Thursday the dashboard runs can-i-deploy → ALLOWED and deploys. No shared deploy day, no synchronization meeting — the Broker is the single coordination point.",
        "課金チーム（プロバイダ）は内部の日割り計算を変え火曜にデプロイしたい；契約は不変なのでcan-i-deployは緑で、すぐリリースします。ダッシュボードチーム（コンシューマ）は新フィールド「nextInvoiceDate」を表示したく水曜に新pactを公開；webhookがプロバイダ検証を起動し、プロバイダはフィールドを追加、検証は緑に；木曜にダッシュボードはcan-i-deployを実行→ALLOWEDでデプロイ。共通デプロイ日も同期会議もなく—Brokerが唯一の調整点です。"
      ),
    ],
  },
  {
    heading: { vi: "10. Bẫy thường gặp", en: "10. Common pitfalls", ja: "10. よくある落とし穴" },
    blocks: [
      P(
        "Cạm bẫy phổ biến nhất là dùng version không truy vết được (như 'latest' hay số tay) khiến ma trận trở nên vô nghĩa. Thứ hai là quên record-deployment, làm can-i-deploy phán quyết trên dữ liệu môi trường cũ. Thứ ba là tắt pending pacts, khiến mọi kỳ vọng mới của consumer lập tức làm đỏ build provider và gây xích mích giữa các đội. Thứ tư là coi can-i-deploy là thủ tục hình thức và bỏ qua khi nó chặn — hành động này vô hiệu hoá toàn bộ giá trị an toàn.",
        "The most common pitfall is using non-traceable versions (like 'latest' or manual numbers) that render the matrix meaningless. Second is forgetting record-deployment, making can-i-deploy judge on stale environment data. Third is disabling pending pacts, so every new consumer expectation immediately reddens the provider build and causes friction between teams. Fourth is treating can-i-deploy as a formality and bypassing it when it blocks — this nullifies the entire safety value.",
        "最も一般的な落とし穴は、追跡不能なバージョン（「latest」や手動番号）を使いマトリクスを無意味にすることです。二つ目はrecord-deploymentを忘れ、can-i-deployが古い環境データで判断すること。三つ目はペンディングpactを無効にし、コンシューマの新しい期待が全て即座にプロバイダのビルドを赤くしてチーム間の摩擦を生むこと。四つ目はcan-i-deployを形式と見なしブロック時に迂回すること—これは安全性の価値全体を無にします。"
      ),
      UL(
        ["Luôn dùng git sha làm version; không bao giờ dùng 'latest'.", "Gọi record-deployment sau MỌI lần deploy thành công.", "Bật pending + WIP pacts khi có nhiều đội.", "Không bao giờ bỏ qua can-i-deploy khi nó chặn.", "Bảo vệ Broker bằng auth; pact chứa thông tin cấu trúc API."],
        ["Always use a git sha as the version; never use 'latest'.", "Call record-deployment after EVERY successful deploy.", "Enable pending + WIP pacts when you have multiple teams.", "Never bypass can-i-deploy when it blocks.", "Protect the Broker with auth; pacts contain API structure information."],
        ["常にgit shaをバージョンに使い、決して「latest」を使わないこと。", "デプロイ成功のたびにrecord-deploymentを呼ぶこと。", "複数チームがあればペンディング＋WIP pactを有効にすること。", "can-i-deployがブロックしたとき決して迂回しないこと。", "Brokerを認証で保護すること；pactはAPI構造情報を含みます。"]
      ),
    ],
  },
  {
    heading: { vi: "11. Đưa toàn bộ vào pipeline CI", en: "11. Wiring the whole flow into CI", ja: "11. 全フローをCIパイプラインへ組み込む" },
    blocks: [
      P(
        "Ghép mọi thứ, một dòng chảy CI hoàn chỉnh cho consumer gồm: chạy consumer test để sinh pact, publish pact kèm git sha và branch, rồi trước khi deploy chạy can-i-deploy, và sau khi deploy chạy record-deployment. Phía provider gồm: verify pact từ Broker và publish kết quả, được kích hoạt cả theo commit lẫn theo webhook. Khi cả hai pipeline cùng nói chuyện qua Broker, tổ chức có một cơ chế release an toàn tự động, không cần điều phối thủ công.",
        "Putting it all together, a complete CI flow for the consumer consists of: run consumer tests to generate the pact, publish the pact with the git sha and branch, then before deploy run can-i-deploy, and after deploy run record-deployment. The provider side consists of: verify pacts from the Broker and publish results, triggered both by commits and by webhooks. When both pipelines talk through the Broker, the organization has an automated safe-release mechanism with no manual coordination.",
        "全てを組み合わせると、コンシューマの完全なCIフローは次の要素から成ります：コンシューマテストを実行しpactを生成、git shaとブランチ付きでpactを公開、デプロイ前にcan-i-deployを実行、デプロイ後にrecord-deploymentを実行。プロバイダ側は：Brokerからpactを検証し結果を公開、コミットとwebhookの両方で起動。両パイプラインがBrokerを介して対話すると、組織は手動調整なしの自動安全リリース機構を得ます。"
      ),
      CODE("yaml", `# consumer pipeline (rút gọn)
steps:
  - run: npm test                       # sinh ./pacts/*.json
  - run: pact-broker publish ./pacts --consumer-app-version "$GIT_SHA" --branch "$GIT_BRANCH"
  - run: pact-broker can-i-deploy --pacticipant wallet-web --version "$GIT_SHA" --to-environment production
  - run: ./deploy.sh
  - run: pact-broker record-deployment --pacticipant wallet-web --version "$GIT_SHA" --environment production`),
      P(
        "Điểm cần khắc sâu: thứ tự các bước là một phần của an toàn. publish phải trước can-i-deploy (để Broker có dữ liệu mới nhất), can-i-deploy phải trước deploy (để chặn kịp), và record-deployment phải sau deploy (để phản ánh đúng hiện trạng). Sai thứ tự này thì cổng an toàn mất tác dụng dù mọi lệnh đều có mặt.",
        "A point to internalize: the order of steps is part of the safety. publish must come before can-i-deploy (so the Broker has the latest data), can-i-deploy must come before deploy (to block in time), and record-deployment must come after deploy (to reflect the real state). Get this order wrong and the safety gate stops working even though every command is present.",
        "身に付けるべき点：ステップの順序は安全性の一部です。publishはcan-i-deployの前でなければならず（Brokerが最新データを持つように）、can-i-deployはdeployの前（間に合って止めるため）、record-deploymentはdeployの後（実状態を反映するため）でなければなりません。この順序を誤ると、全コマンドが揃っていても安全ゲートは機能しなくなります。"
      ),
    ],
  },
  {
    heading: { vi: "12. Góc phỏng vấn & tổng kết", en: "12. Interview angle & summary", ja: "12. 面接の観点とまとめ" },
    blocks: [
      QA(
        "can-i-deploy khác gì so với chỉ chạy lại toàn bộ test tích hợp trước khi deploy?",
        "How is can-i-deploy different from just re-running all integration tests before deploy?",
        "Chạy lại test tích hợp đòi hỏi mọi dịch vụ phải cùng có mặt, chậm và giòn. can-i-deploy không chạy test nào cả — nó tra kết quả verification đã có sẵn trong ma trận, gần như tức thì. Nó trả lời câu hỏi 'tổ hợp version này đã từng được kiểm chứng tương thích chưa' bằng dữ liệu lịch sử, thay vì dựng lại cả thế giới mỗi lần deploy.",
        "Re-running integration tests requires every service to be present together, is slow and brittle. can-i-deploy runs no tests at all — it looks up verification results already in the matrix, almost instantly. It answers 'has this version combination ever been verified compatible' using historical data, instead of rebuilding the whole world on every deploy.",
        "統合テストの再実行は全サービスが同時に揃うことを要し、遅く脆いです。can-i-deployはテストを一切実行しません—マトリクスに既にある検証結果をほぼ即時に参照します。デプロイのたびに全世界を再構築する代わりに、「このバージョン組み合わせは互換と検証されたことがあるか」を履歴データで答えます。"
      ),
      QA(
        "Tag và environment trong Broker dùng để làm gì?",
        "What are tags and environments in the Broker used for?",
        "Chúng cho Broker biết một version đang 'ở đâu' trong vòng đời và môi trường. Nhờ tag/environment, can-i-deploy có thể hỏi cụ thể 'tương thích với production' thay vì chỉ 'tương thích với version mới nhất'. Đây là nền tảng để hỗ trợ nhiều môi trường (test/staging/production) với hiện trạng khác nhau cùng lúc.",
        "They tell the Broker where a version is in its lifecycle and environment. Thanks to tags/environments, can-i-deploy can specifically ask 'compatible with production' rather than just 'compatible with the latest version'. This is the foundation for supporting multiple environments (test/staging/production) with different states simultaneously.",
        "それらはBrokerに、バージョンがライフサイクルと環境のどこにあるかを伝えます。タグ/環境のおかげで、can-i-deployは単に「最新バージョンと互換」ではなく具体的に「本番と互換」を問えます。これは、異なる状態の複数環境（test/staging/production）を同時に支える基盤です。"
      ),
      QA(
        "Pact Broker và bi-directional contract testing khác nhau ra sao?",
        "How do the Pact Broker and bi-directional contract testing differ?",
        "Pact truyền thống là consumer-driven: consumer sinh hợp đồng, provider phát lại để verify. Bi-directional (trên PactFlow) cho phép provider cung cấp một đặc tả OpenAPI đã tự test, rồi Broker so hợp đồng consumer với đặc tả đó thay vì phát lại — hữu ích khi provider đã có sẵn spec và bộ test riêng. Cả hai đều dùng Broker làm nơi lưu trữ và ra quyết định can-i-deploy; khác nhau ở cách 'chứng minh' phía provider.",
        "Traditional Pact is consumer-driven: the consumer generates the contract, the provider replays to verify. Bi-directional (on PactFlow) lets the provider supply a self-tested OpenAPI spec, then the Broker compares the consumer contract against that spec instead of replaying — useful when the provider already has a spec and its own tests. Both use the Broker for storage and can-i-deploy decisions; they differ in how the provider side is 'proven'.",
        "従来のPactはコンシューマ駆動です：コンシューマが契約を生成し、プロバイダが再生して検証します。双方向（PactFlow上）はプロバイダが自己テスト済みのOpenAPI仕様を提供し、Brokerが再生の代わりにコンシューマ契約をその仕様と比較します—プロバイダに既に仕様と独自テストがある場合に有用です。両者ともBrokerを保存とcan-i-deploy判断に使い、プロバイダ側の「証明」方法が異なります。"
      ),
      P(
        "Tổng kết cả ba bài: consumer sinh hợp đồng, provider phát lại verify, và Broker điều phối để quyết định deploy an toàn. Ba mảnh này biến contract testing từ một kỹ thuật test thành một chiến lược release cho kiến trúc microservices. Khi vận hành đúng — version truy vết được, can-i-deploy làm cổng, record-deployment khép vòng, pending/WIP giữ hoà khí giữa các đội — bạn có được thứ quý nhất trong hệ phân tán: khả năng deploy độc lập mà vẫn ngủ ngon.",
        "Summing up all three articles: the consumer generates the contract, the provider replays to verify, and the Broker coordinates to decide safe deploys. These three pieces turn contract testing from a testing technique into a release strategy for microservice architectures. Operated correctly — traceable versions, can-i-deploy as the gate, record-deployment closing the loop, pending/WIP keeping peace between teams — you gain the most precious thing in a distributed system: the ability to deploy independently and still sleep at night.",
        "三記事すべてのまとめ：コンシューマが契約を生成し、プロバイダが再生して検証し、Brokerが調整して安全なデプロイを判断します。この三つの部品は、契約テストをテスト技法からマイクロサービスアーキテクチャのリリース戦略へ変えます。正しく運用すれば—追跡可能なバージョン、ゲートとしてのcan-i-deploy、ループを閉じるrecord-deployment、チーム間の平和を保つpending/WIP—分散システムで最も貴重なもの、すなわち独立してデプロイしても夜安眠できる能力が得られます。"
      ),
    ],
  },
];

/* ============================================================================
 * COVERS + EXPORT
 * ==========================================================================*/
const coverA = makeThumb({ id: "atpact1", domain: "fintech", kind: "congnghe", label: "PACT · CONSUMER" });
const coverB = makeThumb({ id: "atpact2", domain: "banking", kind: "nangcao", label: "PACT · PROVIDER" });
const coverC = makeThumb({ id: "atpact3", domain: "saas", kind: "nangcao", label: "PACT · BROKER · CI" });

export const DOCS = [
  {
    categorySlug: "automation-tools",
    slug: "at-pact-consumer-driven",
    cover: coverA,
    tags: tags("congnghe", "contract", "api", "foundation"),
    title: {
      vi: "PACT: Contract testing hướng consumer cho microservices",
      en: "PACT: Consumer-driven contract testing for microservices",
      ja: "PACT：マイクロサービスのためのコンシューマ駆動契約テスト",
    },
    summary: {
      vi: "Vì sao E2E toàn phần tốn kém, cách Pact sinh hợp đồng từ consumer thật, viết interaction với PactV3, dùng matchers, đọc pact file và tránh cạm bẫy.",
      en: "Why full E2E is expensive, how Pact generates a contract from a real consumer, writing interactions with PactV3, using matchers, reading the pact file and avoiding pitfalls.",
      ja: "全E2Eが高価な理由、実コンシューマから契約を生成するPactの仕組み、PactV3でのインタラクション記述、マッチャーの活用、pactファイルの読解と落とし穴回避。",
    },
    pages: buildDoc(pages1),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-pact-provider-verification",
    cover: coverB,
    tags: tags("nangcao", "contract", "api", "advanced"),
    title: {
      vi: "PACT: Provider verification — phát lại hợp đồng trên provider thật",
      en: "PACT: Provider verification — replaying contracts against a real provider",
      ja: "PACT：プロバイダ検証 — 実プロバイダに対する契約の再生",
    },
    summary: {
      vi: "Cơ chế phát lại, cài Verifier, provider states, requestFilter, versioning & tương thích ngược, message pact và đưa verification vào CI.",
      en: "The replay mechanism, setting up the Verifier, provider states, requestFilter, versioning & backward compatibility, message pacts and putting verification in CI.",
      ja: "再生メカニズム、Verifierの設定、プロバイダ状態、requestFilter、バージョニングと後方互換性、メッセージpact、検証のCI組込み。",
    },
    pages: buildDoc(pages2),
  },
  {
    categorySlug: "automation-tools",
    slug: "at-pact-broker-ci",
    cover: coverC,
    tags: tags("nangcao", "contract", "cicd", "advanced"),
    title: {
      vi: "PACT Broker & CI: can-i-deploy và triển khai độc lập an toàn",
      en: "PACT Broker & CI: can-i-deploy and safe independent deployment",
      ja: "PACT Broker と CI：can-i-deploy と安全な独立デプロイ",
    },
    summary: {
      vi: "Kiến trúc Broker, publish pact kèm version/tag, ma trận tương thích, can-i-deploy, record-deployment, webhooks, pending/WIP pacts và pipeline CI đầu-cuối.",
      en: "Broker architecture, publishing pacts with version/tags, the compatibility matrix, can-i-deploy, record-deployment, webhooks, pending/WIP pacts and an end-to-end CI pipeline.",
      ja: "Brokerのアーキテクチャ、バージョン/タグ付きpact公開、互換性マトリクス、can-i-deploy、record-deployment、webhook、pending/WIP pact、エンドツーエンドのCIパイプライン。",
    },
    pages: buildDoc(pages3),
  },
];
