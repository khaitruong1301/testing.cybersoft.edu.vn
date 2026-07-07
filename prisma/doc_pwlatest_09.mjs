import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

/* ============================================================================
 * doc_pwlatest_09 — Kind: tichhop (Integrated)
 * A: Tích hợp E2E TMĐT: Playwright + API + CI + AI Agent
 * B: Tích hợp Perf + chất lượng: k6 + Playwright + observability
 * ==========================================================================*/

const coverA = makeThumb({ id: "pwl09a", domain: "ecommerce", kind: "tichhop", label: "E2E · API · CI · AI" });
const coverB = makeThumb({ id: "pwl09b", domain: "fintech", kind: "tichhop", label: "K6 · PERF · OBSERVE" });

/* ------------------------------------------------------------------ ART A */
const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh: một đơn hàng TMĐT phải đi qua bao nhiêu hệ thống",
      en: "1. Context: how many systems an e-commerce order traverses",
      ja: "1. 背景：ECの注文が通過するシステムの数",
    },
    blocks: [
      P(
        "Một sàn TMĐT quy mô lớn không phải là một website đơn lẻ mà là một tập hợp dịch vụ: catalog, giỏ hàng, khuyến mãi, thanh toán, kho, vận chuyển và thông báo. Khi khách bấm 'Đặt hàng', luồng đi qua ít nhất năm biên giới dịch vụ, mỗi biên là một điểm có thể hỏng. Nhóm QA của chúng ta phục vụ SLA 99.9% cho luồng checkout, đỉnh tải 12.000 đơn mỗi phút trong ngày sale, và chịu ràng buộc tuân thủ PCI-DSS ở lớp thanh toán. Vì thế một bài kiểm thử E2E thuần UI là chưa đủ; ta cần tích hợp UI, API, CI và cả tác nhân AI để phủ được cả bề rộng lẫn bề sâu.",
        "A large e-commerce platform is not a single website but a fleet of services: catalog, cart, promotions, payment, inventory, shipping and notifications. When a shopper taps 'Place order', the flow crosses at least five service boundaries, each a place that can fail. Our QA team serves a 99.9% SLA on the checkout flow, peaks at 12,000 orders per minute on sale days, and lives under PCI-DSS constraints at the payment layer. A pure UI E2E test is therefore not enough; we must integrate UI, API, CI and an AI agent to cover both breadth and depth.",
        "大規模なECプラットフォームは単一のウェブサイトではなく、カタログ・カート・プロモーション・決済・在庫・配送・通知といったサービス群です。買い物客が「注文する」を押すと、フローは少なくとも五つのサービス境界を越え、それぞれが故障しうる箇所になります。私たちのQAチームはチェックアウトに99.9%のSLAを提供し、セール日には毎分12,000注文のピークに達し、決済層ではPCI-DSSの制約下にあります。したがって純粋なUIのE2Eだけでは不十分で、UI・API・CI・AIエージェントを統合して幅と深さの両方を覆う必要があります。"
      ),
      P(
        "Bài viết này ghép bốn mảnh thành một dây chuyền duy nhất. Playwright lo phần trải nghiệm người dùng thật trên trình duyệt; API request context của Playwright lo phần dựng dữ liệu và làm oracle (nguồn chân lý) để không phải phụ thuộc vào UI khi kiểm tra kết quả; GitHub Actions lo việc chạy song song bằng shard rồi gộp báo cáo blob; và bộ Playwright Agents (Planner, Generator, Healer) lo việc sinh và tự chữa kiểm thử dưới một cổng review của con người. Mục tiêu cuối là một pipeline mà mỗi lần merge đều xác nhận bất biến nghiệp vụ của luồng đặt hàng.",
        "This article stitches four pieces into a single pipeline. Playwright owns the real user experience in the browser; Playwright's API request context owns data setup and acts as the oracle (source of truth) so we don't depend on the UI to check results; GitHub Actions runs everything in parallel via sharding then merges blob reports; and the Playwright Agents suite (Planner, Generator, Healer) generates and self-heals tests under a human review gate. The end goal is a pipeline where every merge confirms the business invariants of the order flow.",
        "本記事は四つの部品を一つのパイプラインに縫い合わせます。Playwrightはブラウザ上の実際のユーザー体験を担い、PlaywrightのAPIリクエストコンテキストはデータ準備とオラクル（真実の源）を担って、結果確認をUIに依存しないようにします。GitHub Actionsはシャーディングで並列実行しblobレポートを統合し、Playwright Agents群（Planner・Generator・Healer）は人間のレビューゲートの下でテストを生成・自己修復します。最終目標は、すべてのマージが注文フローの業務不変条件を確認するパイプラインです。"
      ),
      NOTE(
        "Nguyên tắc xuyên suốt: UI để mô phỏng người dùng, API để dựng và để phán xử. Không dùng UI kiểm tra thứ mà API biết chính xác hơn.",
        "Guiding principle: UI simulates the user, API sets up and adjudicates. Never use the UI to verify something the API knows more precisely.",
        "一貫した原則：UIはユーザーを模倣し、APIは準備と判定を行います。APIがより正確に知っていることをUIで検証してはいけません。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc dây chuyền và mô hình dữ liệu",
      en: "2. Pipeline architecture and data model",
      ja: "2. パイプラインの構成とデータモデル",
    },
    blocks: [
      P(
        "Trước khi viết dòng code nào, ta cần một bức tranh chung để cả nhóm nói cùng ngôn ngữ. Kiến trúc kiểm thử phản chiếu kiến trúc sản phẩm: một lớp UI (Playwright browser), một lớp API (request context tới các microservice), một lớp điều phối (GitHub Actions), và một lớp trí tuệ (AI agents). Dữ liệu chảy theo một chiều: agent sinh test, CI chạy test song song, mỗi test dựng seed qua API, thao tác UI, rồi phán xử bằng API và trace.",
        "Before writing a line of code we need a shared picture so the team speaks one language. The test architecture mirrors the product architecture: a UI layer (Playwright browser), an API layer (request context to the microservices), an orchestration layer (GitHub Actions), and an intelligence layer (AI agents). Data flows one way: the agent generates tests, CI runs them in parallel, each test seeds via API, drives the UI, then adjudicates with API and trace.",
        "コードを一行書く前に、チームが一つの言語で話せる共通の絵が必要です。テスト構成は製品構成を反映します：UI層（Playwrightブラウザ）、API層（マイクロサービスへのリクエストコンテキスト）、オーケストレーション層（GitHub Actions）、知能層（AIエージェント）です。データは一方向に流れます：エージェントがテストを生成し、CIが並列実行し、各テストはAPIでシードし、UIを操作し、APIとトレースで判定します。"
      ),
      IMG(
        `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0f172a"/>
<rect x="20" y="20" width="140" height="60" rx="8" fill="#7c2d92"/><text x="90" y="46" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">AI Agents</text><text x="90" y="64" text-anchor="middle" fill="#f1f5f9" font-size="10">Plan·Gen·Heal</text>
<rect x="20" y="120" width="140" height="60" rx="8" fill="#0369a1"/><text x="90" y="146" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">GitHub Actions</text><text x="90" y="164" text-anchor="middle" fill="#f1f5f9" font-size="10">shard + blob</text>
<rect x="250" y="70" width="150" height="60" rx="8" fill="#155e63"/><text x="325" y="96" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Playwright UI</text><text x="325" y="114" text-anchor="middle" fill="#f1f5f9" font-size="10">browser flow</text>
<rect x="250" y="170" width="150" height="60" rx="8" fill="#155e63"/><text x="325" y="196" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">API context</text><text x="325" y="214" text-anchor="middle" fill="#f1f5f9" font-size="10">seed + oracle</text>
<rect x="470" y="30" width="150" height="50" rx="8" fill="#1e3a8a"/><text x="545" y="60" text-anchor="middle" fill="#fff" font-size="12">Order svc</text>
<rect x="470" y="95" width="150" height="50" rx="8" fill="#1e3a8a"/><text x="545" y="125" text-anchor="middle" fill="#fff" font-size="12">Inventory svc</text>
<rect x="470" y="160" width="150" height="50" rx="8" fill="#1e3a8a"/><text x="545" y="190" text-anchor="middle" fill="#fff" font-size="12">Payment svc</text>
<rect x="470" y="225" width="150" height="50" rx="8" fill="#1e3a8a"/><text x="545" y="255" text-anchor="middle" fill="#fff" font-size="12">Trace/Report</text>
<g stroke="#7dd3fc" stroke-width="2" fill="none"><path d="M160 50 L250 90"/><path d="M160 150 L250 100"/><path d="M160 150 L250 200"/><path d="M400 100 L470 55"/><path d="M400 100 L470 120"/><path d="M400 200 L470 185"/><path d="M400 200 L470 250"/></g>
</svg>`,
        "Bốn lớp: AI agents và CI điều phối, Playwright UI và API context thực thi, các microservice là hệ thống dưới kiểm thử.",
        "Four layers: AI agents and CI orchestrate, Playwright UI and API context execute, the microservices are the system under test.",
        "四層：AIエージェントとCIが調整し、PlaywrightのUIとAPIコンテキストが実行し、マイクロサービスがテスト対象システムです。"
      ),
      P(
        "Mô hình dữ liệu tối thiểu để kiểm thử luồng đặt hàng gồm: Product (id, giá, tồn kho), Cart (dòng hàng), Order (trạng thái, tổng tiền, khoá idempotency) và Payment (số tiền, trạng thái giao dịch). Bất biến nghiệp vụ mà chúng ta bảo vệ chính là những ràng buộc giữa các thực thể này: tồn kho không bao giờ âm, tổng tiền đơn bằng tổng dòng cộng phí trừ khuyến mãi, và một khoá idempotency chỉ tạo đúng một đơn dù người dùng bấm hai lần.",
        "The minimal data model to test the order flow includes: Product (id, price, stock), Cart (line items), Order (status, total, idempotency key) and Payment (amount, transaction status). The business invariants we protect are the constraints between these entities: stock never goes negative, order total equals sum of lines plus fees minus promotions, and one idempotency key creates exactly one order even if the user double-taps.",
        "注文フローをテストする最小データモデルには、Product（id・価格・在庫）、Cart（明細）、Order（状態・合計・冪等性キー）、Payment（金額・取引状態）が含まれます。守るべき業務不変条件はこれらの実体間の制約です：在庫は決して負にならず、注文合計は明細合計＋手数料−プロモーションに等しく、一つの冪等性キーはユーザーが二度押しても正確に一つの注文だけを生成します。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Bất biến làm oracle: đừng khẳng định 'thấy thành công'",
      en: "3. Invariants as the oracle: don't assert 'shows success'",
      ja: "3. オラクルとしての不変条件：「成功が見える」と断言しない",
    },
    blocks: [
      P(
        "Sai lầm phổ biến của E2E là kiểm tra rằng màn hình hiển thị chữ 'Đặt hàng thành công'. Câu đó dễ đỏ đèn xanh giả: UI có thể hiện thông báo trong khi kho chưa trừ, tiền chưa trừ, hay đơn bị nhân đôi. Oracle đúng phải là bất biến nghiệp vụ, và cách kiểm bất biến chính xác nhất là hỏi API chứ không phải đọc DOM. Với mỗi đơn, ta kiểm bốn bất biến: tồn kho giảm đúng số lượng đã mua, không âm; tiền được ghi sổ kép cân bằng; đơn ở trạng thái hợp lệ theo bảng quyết định; và idempotency đảm bảo retry không sinh đơn thứ hai.",
        "A common E2E mistake is checking that the screen shows the text 'Order successful'. That assertion easily goes falsely green: the UI can show the message while stock wasn't decremented, money wasn't charged, or the order was doubled. The correct oracle is the business invariant, and the most precise way to check it is to ask the API, not read the DOM. For each order we check four invariants: stock decreased by exactly the purchased quantity, never negative; money is double-entry balanced; the order is in a valid state per the decision table; and idempotency guarantees a retry does not create a second order.",
        "E2Eのよくある誤りは、画面に「注文成功」という文字が表示されるかを確認することです。そのアサーションは容易に偽のグリーンになります：在庫が減っていない・課金されていない・注文が二重になっている状態でもUIはメッセージを表示しうるからです。正しいオラクルは業務不変条件であり、最も正確に確認する方法はDOMを読むことではなくAPIに問い合わせることです。各注文で四つの不変条件を確認します：在庫は購入数量ちょうど減り決して負にならない、金額は複式で均衡している、注文は決定表に従い有効な状態にある、そして冪等性が再試行で二つ目の注文を作らないことを保証します。"
      ),
      CODE(
        "ts",
        `// oracle.ts — kiểm bất biến nghiệp vụ qua API request context
import { APIRequestContext, expect } from '@playwright/test';

export async function assertOrderInvariants(
  api: APIRequestContext,
  orderId: string,
  expected: { productId: string; qty: number; stockBefore: number }
) {
  const order = await (await api.get(\`/api/orders/\${orderId}\`)).json();
  const inv   = await (await api.get(\`/api/inventory/\${expected.productId}\`)).json();

  // 1) tồn kho không âm và giảm đúng
  expect(inv.available).toBeGreaterThanOrEqual(0);
  expect(inv.available).toBe(expected.stockBefore - expected.qty);

  // 2) sổ kép cân bằng: debit == credit
  const ledger = await (await api.get(\`/api/orders/\${orderId}/ledger\`)).json();
  const debit  = ledger.entries.filter((e:any)=>e.side==='debit').reduce((s:any,e:any)=>s+e.amount,0);
  const credit = ledger.entries.filter((e:any)=>e.side==='credit').reduce((s:any,e:any)=>s+e.amount,0);
  expect(debit).toBe(credit);

  // 3) trạng thái đơn nằm trong tập hợp lệ
  expect(['PAID','CONFIRMED']).toContain(order.status);
}`
      ),
      TIP(
        "Đặt oracle vào một module riêng, tách khỏi bước UI. Khi UI đổi, oracle không phải sửa; khi luật nghiệp vụ đổi, chỉ sửa một chỗ.",
        "Put the oracle in its own module, separate from UI steps. When the UI changes the oracle needs no edit; when business rules change, edit one place.",
        "オラクルはUIステップから分離した独立モジュールに置きます。UIが変わってもオラクルは修正不要、業務ルールが変わっても一箇所だけ修正します。"
      ),
      QA(
        "Tại sao không nên tin assertion 'màn hình hiện Đặt hàng thành công'?",
        "Why shouldn't we trust the assertion 'screen shows Order successful'?",
        "Vì đó là một oracle yếu: thông báo trên UI chỉ phản ánh trạng thái phía client, không phản ánh trạng thái đã cam kết ở backend. Trong hệ phân tán, UI có thể lạc quan hiển thị thành công trong khi service kho hoặc thanh toán mới ở trạng thái pending, đã rollback, hay bị nhân đôi. Oracle mạnh phải kiểm bất biến ở nguồn dữ liệu thật qua API: kho không âm, sổ kép cân, đúng một đơn. Assertion text chỉ nên là kiểm phụ về UX, không bao giờ là bằng chứng nghiệp vụ.",
        "Because it is a weak oracle: the UI message reflects only client-side state, not the committed backend state. In a distributed system the UI can optimistically show success while the inventory or payment service is still pending, has rolled back, or was doubled. A strong oracle must check invariants at the real data source via API: stock not negative, ledger balanced, exactly one order. A text assertion should only be an auxiliary UX check, never business evidence.",
        "なぜ「画面に注文成功と表示される」というアサーションを信頼すべきでないのですか？",
        "それは弱いオラクルだからです：UIメッセージはクライアント側の状態のみを反映し、バックエンドでコミットされた状態を反映しません。分散システムでは、在庫や決済サービスがまだpending・ロールバック済み・二重化されている間も、UIは楽観的に成功を表示しうります。強いオラクルはAPI経由で実データ源の不変条件を確認しなければなりません：在庫が負でない、台帳が均衡、正確に一注文。テキストアサーションはUXの補助確認に留め、決して業務の証拠にしてはいけません。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. API request context: dựng seed và làm nguồn chân lý",
      en: "4. API request context: seeding and source of truth",
      ja: "4. APIリクエストコンテキスト：シードと真実の源",
    },
    blocks: [
      P(
        "Playwright cung cấp một request context chạy độc lập với trình duyệt, dùng cùng cơ chế lưu trữ và proxy. Ta dùng nó cho hai việc: dựng dữ liệu ban đầu (tạo sản phẩm, nạp tồn kho, tạo tài khoản test) và xác minh kết quả sau khi thao tác UI. Việc dựng qua API nhanh hơn nhiều lần so với bấm qua UI, và quan trọng hơn, nó làm test trở nên xác định. Nếu bạn tạo dữ liệu bằng UI, một lỗi ở form đăng ký cũng làm hỏng test checkout — đó là ghép cặp sai.",
        "Playwright provides a request context that runs independently of the browser, using the same storage and proxy. We use it for two things: seeding initial data (create products, load stock, create test accounts) and verifying results after UI actions. Seeding via API is many times faster than clicking through the UI and, more importantly, makes tests deterministic. If you create data via the UI, a bug in the signup form also breaks the checkout test — that is wrong coupling.",
        "Playwrightはブラウザとは独立に動作するリクエストコンテキストを提供し、同じストレージとプロキシを使います。これを二つの目的で使います：初期データのシード（商品作成・在庫投入・テストアカウント作成）と、UI操作後の結果検証です。API経由のシードはUIをクリックするより何倍も速く、さらに重要なことにテストを決定的にします。UIでデータを作ると、登録フォームのバグがチェックアウトテストも壊します—それは誤った結合です。"
      ),
      CODE(
        "ts",
        `// fixtures.ts — request context có sẵn token, dùng chung cho mọi test
import { test as base, request } from '@playwright/test';

type Seeded = { productId: string; stockBefore: number };

export const test = base.extend<{ api: any; seed: Seeded }>({
  api: async ({ playwright, baseURL }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { Authorization: \`Bearer \${process.env.SEED_TOKEN}\` },
    });
    await use(ctx);
    await ctx.dispose();
  },
  seed: async ({ api }, use) => {
    const p = await (await api.post('/api/products', {
      data: { name: 'Test SKU', price: 250000, stock: 50 },
    })).json();
    await use({ productId: p.id, stockBefore: 50 });
    await api.delete(\`/api/products/\${p.id}\`); // dọn sau test → idempotent
  },
});
export { expect } from '@playwright/test';`
      ),
      WARN(
        "Không seed vào môi trường sản xuất. Token seed phải bị vô hiệu ở prod; nếu lỡ chạy, guard ở backend phải từ chối. Kiểm thử là quyền lực, quyền lực cần rào.",
        "Never seed into production. The seed token must be disabled in prod; if accidentally run, a backend guard must reject it. Testing is power, and power needs guardrails.",
        "本番環境にシードしてはいけません。シードトークンは本番で無効化し、誤って実行されてもバックエンドのガードが拒否する必要があります。テストは力であり、力には防護柵が必要です。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Luồng UI E2E happy path cho đơn hàng",
      en: "5. The UI E2E happy path for an order",
      ja: "5. 注文のUI E2Eハッピーパス",
    },
    blocks: [
      P(
        "Happy path là xương sống mà mọi biến thể lỗi treo vào. Test này mở trang sản phẩm đã seed, thêm vào giỏ, đi tới checkout, điền địa chỉ, thanh toán bằng thẻ test, rồi phán xử bằng oracle chứ không đọc chữ trên màn hình. Chú ý dùng locator theo vai trò (getByRole) và nhãn (getByLabel) để test bền với thay đổi CSS. Playwright tự chờ (auto-waiting) nên ta không rải sleep; mỗi hành động chờ điều kiện actionability trước khi thực thi.",
        "The happy path is the spine every failure variant hangs on. This test opens the seeded product page, adds to cart, goes to checkout, fills the address, pays with a test card, then adjudicates with the oracle rather than reading on-screen text. Note the use of role-based (getByRole) and label (getByLabel) locators to make the test resilient to CSS changes. Playwright auto-waits so we scatter no sleeps; each action waits for actionability before executing.",
        "ハッピーパスはあらゆる失敗バリアントが掛かる背骨です。このテストはシード済みの商品ページを開き、カートに追加し、チェックアウトへ進み、住所を入力し、テストカードで支払い、画面の文字を読むのではなくオラクルで判定します。CSS変更に強くするため、ロール（getByRole）とラベル（getByLabel）によるロケーターを使う点に注目してください。Playwrightは自動待機するのでsleepを撒きません。各アクションは実行前に操作可能性を待ちます。"
      ),
      CODE(
        "ts",
        `// order.happy.spec.ts
import { test, expect } from './fixtures';
import { assertOrderInvariants } from './oracle';

test('đặt hàng thành công và bất biến được giữ', async ({ page, api, seed }) => {
  await page.goto(\`/product/\${seed.productId}\`);
  await page.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Thanh toán' }).click();

  await page.getByLabel('Họ tên').fill('Nguyen Van A');
  await page.getByLabel('Địa chỉ').fill('12 Ly Thuong Kiet, HN');
  await page.getByLabel('Số thẻ').fill('4242424242424242');
  await page.getByLabel('MM/YY').fill('12/30');
  await page.getByLabel('CVC').fill('123');

  // idempotency key gửi kèm để chống double-submit
  await page.getByRole('button', { name: 'Đặt hàng' }).click();

  const orderId = await page.getByTestId('order-id').innerText();
  await assertOrderInvariants(api, orderId, {
    productId: seed.productId, qty: 1, stockBefore: seed.stockBefore,
  });
});`
      ),
      NOTE(
        "getByTestId chỉ để lấy định danh kỹ thuật (order-id), không để kiểm nghiệp vụ. Nghiệp vụ luôn do oracle API phán xử.",
        "getByTestId is only to grab a technical identifier (order-id), not to check business logic. Business logic is always adjudicated by the API oracle.",
        "getByTestIdは技術的な識別子（order-id）を取得するためだけで、業務ロジックの確認用ではありません。業務ロジックは常にAPIオラクルが判定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Ca lỗi sâu: idempotency, timeout và hoàn tiền",
      en: "6. Deep failure cases: idempotency, timeout and refund",
      ja: "6. 深い失敗ケース：冪等性・タイムアウト・返金",
    },
    blocks: [
      P(
        "Happy path chỉ chứng minh hệ thống chạy khi mọi thứ thuận lợi. Giá trị thật của QA nằm ở ca lỗi. Ba ca sâu nhất của luồng đặt hàng là: người dùng bấm 'Đặt hàng' hai lần trong một giây (double-submit); cổng thanh toán trả về chậm quá ngưỡng khiến client timeout nhưng backend vẫn xử lý (partial failure); và đơn bị huỷ dẫn tới hoàn tiền và hoàn kho. Mỗi ca đều phải giữ nguyên bất biến: đúng một đơn, tiền và kho luôn nhất quán.",
        "The happy path only proves the system works when everything goes well. The real value of QA is in failure cases. The three deepest cases of the order flow are: the user taps 'Place order' twice in one second (double-submit); the payment gateway responds past the threshold so the client times out but the backend still processes (partial failure); and an order is cancelled leading to refund and stock restock. Each case must preserve the invariants: exactly one order, money and stock always consistent.",
        "ハッピーパスはすべてが順調なときにシステムが動くことしか証明しません。QAの真価は失敗ケースにあります。注文フローの最も深い三ケースは：ユーザーが一秒間に「注文する」を二度押す（二重送信）、決済ゲートウェイが閾値を超えて応答しクライアントはタイムアウトするがバックエンドは処理を続ける（部分失敗）、注文がキャンセルされ返金と在庫戻しに至る、です。各ケースは不変条件を保たねばなりません：正確に一つの注文、金額と在庫は常に整合。"
      ),
      CODE(
        "ts",
        `// order.failure.spec.ts — double-submit phải sinh đúng một đơn
import { test, expect } from './fixtures';

test('double-submit → idempotency giữ đúng 1 đơn', async ({ request, seed, baseURL }) => {
  const key = crypto.randomUUID();
  const body = { productId: seed.productId, qty: 1, idempotencyKey: key };

  // gửi hai request song song cùng key
  const [r1, r2] = await Promise.all([
    request.post('/api/orders', { data: body }),
    request.post('/api/orders', { data: body }),
  ]);
  const o1 = await r1.json();
  const o2 = await r2.json();

  // hai response nhưng cùng một orderId
  expect(o1.id).toBe(o2.id);

  // kho chỉ giảm 1, không giảm 2
  const inv = await (await request.get(\`/api/inventory/\${seed.productId}\`)).json();
  expect(inv.available).toBe(seed.stockBefore - 1);
});`
      ),
      SCEN(
        "Sự cố thật: timeout 30 giây, khách bấm lại",
        "Real incident: 30-second timeout, customer retries",
        "Trong đợt sale, cổng thanh toán chậm 30 giây; app hiển thị lỗi timeout nên khách bấm 'Đặt hàng' lại. Kết quả: nhiều khách bị trừ tiền hai lần, tổng thiệt hại phải hoàn 340 triệu đồng. Nguyên nhân gốc là idempotency key được sinh ở client mỗi lần bấm thay vì gắn với phiên checkout. Bài học: test phải mô phỏng đúng ranh giới timeout, và key phải gắn với giỏ hàng, không gắn với lần bấm.",
        "During a sale the payment gateway lagged 30 seconds; the app showed a timeout error so customers re-tapped 'Place order'. Result: many customers were charged twice, totaling 340M VND to refund. Root cause: the idempotency key was generated client-side on each tap instead of bound to the checkout session. Lesson: tests must simulate the exact timeout boundary, and the key must bind to the cart, not to the tap.",
        "実際の事故：30秒のタイムアウト、顧客が再試行",
        "セール中に決済ゲートウェイが30秒遅延し、アプリがタイムアウトエラーを表示したため顧客が「注文する」を再度押しました。結果、多くの顧客が二重課金され、返金総額は3億4000万ドンに達しました。根本原因は冪等性キーがチェックアウトセッションに紐づかず、押すたびにクライアント側で生成されていたことです。教訓：テストは正確なタイムアウト境界を模擬し、キーは押下ではなくカートに紐づけるべきです。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ma trận ca kiểm thử theo bảng quyết định",
      en: "7. Test case matrix via decision table",
      ja: "7. 決定表によるテストケースマトリクス",
    },
    blocks: [
      P(
        "Để không bỏ sót nhánh, ta lập bảng quyết định cho luồng checkout với ba biến đầu vào: tồn kho đủ hay không, thẻ hợp lệ hay bị từ chối, và có khuyến mãi hay không. Bảng này biến các tổ hợp thành danh sách ca kiểm thử tường minh, mỗi hàng có oracle riêng. Đây là cầu nối giữa phân tích nghiệp vụ và code test; đồng thời là đầu vào tuyệt vời cho Planner agent ở chương sau.",
        "To miss no branch, we build a decision table for the checkout flow with three inputs: stock sufficient or not, card valid or declined, and promotion present or not. The table turns combinations into an explicit test case list, each row with its own oracle. This bridges business analysis and test code; it is also excellent input for the Planner agent in the next chapter.",
        "分岐を漏らさないため、チェックアウトフローの決定表を三つの入力で作ります：在庫が十分か否か、カードが有効か拒否か、プロモーションの有無です。この表は組み合わせを明示的なテストケース一覧に変え、各行に独自のオラクルを持たせます。これは業務分析とテストコードの橋渡しであり、次章のPlannerエージェントへの優れた入力にもなります。"
      ),
      UL(
        [
          "Kho đủ + thẻ hợp lệ + không KM → đơn PAID, kho giảm, tiền đủ.",
          "Kho đủ + thẻ hợp lệ + có KM → đơn PAID, tổng tiền trừ đúng phần trăm KM.",
          "Kho hết + thẻ hợp lệ → chặn ở bước giỏ, không tạo đơn, không trừ tiền.",
          "Kho đủ + thẻ bị từ chối → đơn PENDING/FAILED, kho hoàn về, không trừ tiền.",
          "Kho đủ + thẻ hợp lệ + double-submit → đúng một đơn PAID.",
        ],
        [
          "Stock ok + valid card + no promo → order PAID, stock down, money exact.",
          "Stock ok + valid card + promo → order PAID, total reduced by exact promo percent.",
          "Out of stock + valid card → blocked at cart step, no order, no charge.",
          "Stock ok + declined card → order PENDING/FAILED, stock restored, no charge.",
          "Stock ok + valid card + double-submit → exactly one PAID order.",
        ],
        [
          "在庫あり＋有効カード＋割引なし → 注文PAID、在庫減、金額正確。",
          "在庫あり＋有効カード＋割引あり → 注文PAID、割引率どおり合計が減額。",
          "在庫切れ＋有効カード → カート段階で遮断、注文なし、課金なし。",
          "在庫あり＋拒否カード → 注文PENDING/FAILED、在庫戻し、課金なし。",
          "在庫あり＋有効カード＋二重送信 → PAID注文が正確に一つ。",
        ]
      ),
      TIP(
        "Mỗi hàng bảng quyết định nên map một-một tới một test title. Khi Planner agent đọc bảng này, nó sinh đúng số spec bạn mong đợi.",
        "Each decision-table row should map one-to-one to a test title. When the Planner agent reads this table, it generates exactly the number of specs you expect.",
        "決定表の各行はテストタイトルと一対一で対応させるべきです。Plannerエージェントがこの表を読むと、期待どおりの数のspecを生成します。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Playwright Agents: Planner sinh kế hoạch",
      en: "8. Playwright Agents: Planner writes the plan",
      ja: "8. Playwright Agents：Plannerが計画を書く",
    },
    blocks: [
      P(
        "Từ Playwright v1.56, bộ Playwright Agents đưa ba tác nhân AI hợp tác vào quy trình. Lệnh 'npx playwright init-agents' dựng chúng cùng một seed.spec.ts chứa fixtures và setup dùng chung. Planner là tác nhân đầu tiên: nó khám phá ứng dụng thật, đọc cấu trúc cây khả truy cập (accessibility tree) và viết ra một kế hoạch kiểm thử dạng Markdown. Điểm mạnh là Planner grounding trên ứng dụng sống nên kế hoạch bám sát UI thực, giảm ảo giác (hallucination) so với việc chỉ suy từ mô tả.",
        "Since Playwright v1.56, the Playwright Agents suite brings three cooperating AI agents into the workflow. The command 'npx playwright init-agents' scaffolds them along with a seed.spec.ts holding shared fixtures and setup. Planner is the first agent: it explores the real app, reads the accessibility tree and writes a Markdown test plan. Its strength is that Planner grounds on the live app so the plan tracks the real UI, reducing hallucination compared to inferring from a description alone.",
        "Playwright v1.56以降、Playwright Agents群は三つの協調するAIエージェントをワークフローに導入します。コマンド「npx playwright init-agents」は共有フィクスチャとセットアップを持つseed.spec.tsとともにそれらを生成します。Plannerは最初のエージェントで、実際のアプリを探索し、アクセシビリティツリーを読んでMarkdownのテスト計画を書きます。その強みはPlannerがライブアプリにグラウンディングするため、計画が実際のUIに沿い、説明だけから推論するよりハルシネーションを減らすことです。"
      ),
      CODE(
        "bash",
        `# dựng bộ agent và seed
npx playwright init-agents

# chạy Planner với đầu vào là bảng quyết định + URL app
npx playwright agent plan \\
  --url https://staging.shop.example \\
  --context docs/checkout-decision-table.md \\
  --out plans/checkout.plan.md

# kết quả: plans/checkout.plan.md — kế hoạch Markdown có bước + oracle gợi ý`
      ),
      CODE(
        "md",
        `<!-- plans/checkout.plan.md (Planner sinh) -->
# Kế hoạch: Checkout luồng đặt hàng
## Ca 1 — Kho đủ, thẻ hợp lệ, không KM
- Điều kiện: seed product stock=50
- Bước: mở /product/:id → Thêm giỏ → Thanh toán → điền form → Đặt hàng
- Oracle: order.status ∈ {PAID}; inventory.available == 49; ledger.debit == credit
## Ca 2 — Thẻ bị từ chối
- Bước: dùng thẻ 4000000000000002 (declined)
- Oracle: order.status ∈ {FAILED}; inventory.available == 50 (hoàn kho); no charge`
      ),
      NOTE(
        "Kế hoạch Markdown là hiện vật con người đọc được. Reviewer duyệt kế hoạch trước khi cho phép sinh code — cổng review đầu tiên nằm ở đây.",
        "The Markdown plan is a human-readable artifact. A reviewer approves the plan before code generation is allowed — the first review gate is here.",
        "Markdown計画は人間が読める成果物です。レビュアーはコード生成を許可する前に計画を承認します—最初のレビューゲートはここにあります。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Generator: biến kế hoạch thành spec chạy được",
      en: "9. Generator: turning the plan into runnable specs",
      ja: "9. Generator：計画を実行可能なspecに変換",
    },
    blocks: [
      P(
        "Generator nhận kế hoạch Markdown đã duyệt và sinh ra các spec TypeScript chạy được. Điểm khác biệt so với một trình sinh code mù là Generator xác minh locator trên ứng dụng sống: nó không đoán selector mà thử tìm phần tử thật, đảm bảo getByRole hay getByLabel khớp DOM hiện tại. Nhờ đó test sinh ra ít gãy hơn và dùng oracle API mà kế hoạch đã chỉ định. Tuy vậy, code do AI sinh vẫn phải qua review: ta kiểm rằng oracle đúng là bất biến nghiệp vụ, không phải một assertion 'thấy chữ thành công' trá hình.",
        "Generator takes the approved Markdown plan and produces runnable TypeScript specs. Unlike a blind code generator, Generator verifies locators against the live app: it does not guess selectors but tries to find real elements, ensuring getByRole or getByLabel match the current DOM. Generated tests are therefore less brittle and use the API oracle the plan specified. Still, AI-generated code must pass review: we check that the oracle truly is a business invariant, not a disguised 'sees success text' assertion.",
        "Generatorは承認されたMarkdown計画を受け取り、実行可能なTypeScript specを生成します。盲目的なコード生成器と違い、Generatorはロケーターをライブアプリに対して検証します：セレクタを推測せず実際の要素を探し、getByRoleやgetByLabelが現在のDOMに一致することを保証します。そのため生成テストは壊れにくく、計画が指定したAPIオラクルを使います。それでもAI生成コードはレビューを通す必要があります：オラクルが本当に業務不変条件であり、「成功文字が見える」を偽装したアサーションでないことを確認します。"
      ),
      CODE(
        "bash",
        `# Generator đọc plan đã duyệt, sinh spec, xác minh locator trên app sống
npx playwright agent generate \\
  --plan plans/checkout.plan.md \\
  --url https://staging.shop.example \\
  --out tests/generated/

# sau khi sinh, chạy thử để Generator tự chỉnh locator nếu lệch
npx playwright test tests/generated/ --reporter=line`
      ),
      WARN(
        "Đừng merge thẳng spec do Generator sinh. Code AISinh có thể chèn oracle yếu (kiểm text) hoặc chờ cứng. Review bắt buộc mọi assertion phải là bất biến, mọi chờ phải là auto-wait.",
        "Never merge Generator-produced specs straight in. AI-generated code may insert weak oracles (text checks) or hard waits. Review must require every assertion to be an invariant and every wait to be auto-wait.",
        "Generatorが生成したspecをそのままマージしてはいけません。AI生成コードは弱いオラクル（テキスト確認）や固定待機を挿入しうります。レビューはすべてのアサーションが不変条件、すべての待機が自動待機であることを要求すべきです。"
      ),
      QA(
        "Vì sao Generator xác minh locator trên app sống lại quan trọng?",
        "Why does Generator verifying locators on the live app matter?",
        "Vì đây là điểm phân biệt giữa sinh code hữu ích và sinh code ảo. Một LLM thuần có thể bịa selector '.btn-primary-2' không tồn tại, khiến test đỏ ngay. Bằng cách chạy trên DOM thật và ưu tiên locator theo vai trò/nhãn, Generator neo (grounding) đầu ra vào thực tại, giảm ảo giác và giảm flaky. Đây là ví dụ cụ thể của grounding trong kiểm thử AI.",
        "Because it separates useful code generation from hallucinated generation. A pure LLM may invent a nonexistent selector '.btn-primary-2', turning the test red immediately. By running against the real DOM and preferring role/label locators, Generator grounds its output in reality, reducing hallucination and flakiness. This is a concrete example of grounding in AI testing.",
        "なぜGeneratorがライブアプリでロケーターを検証することが重要ですか？",
        "それが有用なコード生成とハルシネーション生成を分けるからです。純粋なLLMは存在しないセレクタ「.btn-primary-2」を捏造し、テストを即座に赤くしうります。実際のDOMに対して実行しロール／ラベルのロケーターを優先することで、Generatorは出力を現実にグラウンディングし、ハルシネーションとフレーキーを減らします。これはAIテストにおけるグラウンディングの具体例です。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Healer: tự chữa test gãy dưới cổng review",
      en: "10. Healer: self-healing failing tests under a review gate",
      ja: "10. Healer：レビューゲート下で失敗テストを自己修復",
    },
    blocks: [
      P(
        "Healer là tác nhân thứ ba, chạy ở chế độ debug. Khi một test đỏ, Healer soi console, network và ARIA snapshot để hiểu nguyên nhân: locator đổi vì UI refactor, hay lỗi thật của sản phẩm. Nếu là locator lệch, nó đề xuất sửa; nếu không tự tin, nó đánh dấu skip kèm lý do thay vì che giấu. Điều tối quan trọng: Healer không được tự merge. Mọi đề xuất chữa đi qua pull request để con người xét — vì một 'sửa' sai có thể biến một lỗi sản phẩm thật thành đèn xanh giả.",
        "Healer is the third agent, running in debug mode. When a test goes red, Healer inspects console, network and ARIA snapshots to understand the cause: a locator changed due to a UI refactor, or a genuine product bug. If it's a drifted locator, it proposes a fix; if unsure, it marks the test skipped with a reason instead of hiding it. Crucially: Healer must not self-merge. Every healing proposal goes through a pull request for a human to judge — because a wrong 'fix' can turn a real product bug into a false green.",
        "Healerは三番目のエージェントで、デバッグモードで動作します。テストが赤くなると、Healerはコンソール・ネットワーク・ARIAスナップショットを調べて原因を理解します：UIリファクタでロケーターが変わったのか、本物の製品バグなのか。ロケーターのずれなら修正を提案し、自信がなければ隠さず理由付きでスキップにマークします。決定的に重要なこと：Healerは自己マージしてはいけません。すべての修復提案は人間が判断するためプルリクエストを通ります—誤った「修正」が本物の製品バグを偽のグリーンに変えうるからです。"
      ),
      IMG(
        `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="220" fill="#0f172a"/>
<rect x="20" y="90" width="110" height="44" rx="8" fill="#b91c1c"/><text x="75" y="117" text-anchor="middle" fill="#fff" font-size="12">Test đỏ</text>
<rect x="160" y="90" width="120" height="44" rx="8" fill="#7c2d92"/><text x="220" y="112" text-anchor="middle" fill="#fff" font-size="12">Healer</text><text x="220" y="127" text-anchor="middle" fill="#f1f5f9" font-size="9">debug + snapshot</text>
<rect x="320" y="30" width="130" height="44" rx="8" fill="#0369a1"/><text x="385" y="57" text-anchor="middle" fill="#fff" font-size="11">Sửa locator?</text>
<rect x="320" y="150" width="130" height="44" rx="8" fill="#a16207"/><text x="385" y="177" text-anchor="middle" fill="#fff" font-size="11">Skip + lý do</text>
<rect x="490" y="90" width="130" height="44" rx="8" fill="#155e63"/><text x="555" y="112" text-anchor="middle" fill="#fff" font-size="11">Pull Request</text><text x="555" y="127" text-anchor="middle" fill="#f1f5f9" font-size="9">human gate</text>
<g stroke="#7dd3fc" stroke-width="2" fill="none"><path d="M130 112 L160 112"/><path d="M280 100 L320 60"/><path d="M280 122 L320 165"/><path d="M450 52 L490 100"/><path d="M450 172 L490 122"/></g>
</svg>`,
        "Healer chẩn đoán, đề xuất sửa hoặc skip có lý do, nhưng con người mới là người merge.",
        "Healer diagnoses, proposes a fix or a reasoned skip, but a human is the one who merges.",
        "Healerは診断し、修正または理由付きスキップを提案しますが、マージするのは人間です。"
      ),
      QA(
        "Nếu Healer tự sửa và merge được, ta có nên bật để tiết kiệm thời gian?",
        "If Healer could self-fix and merge, should we enable it to save time?",
        "Không. Cổng review của con người là ranh giới an toàn không thể bỏ. Nếu để Healer tự merge, một lỗi thật như 'nút Đặt hàng biến mất' có thể bị AI 'chữa' bằng cách trỏ sang nút khác, làm test xanh trong khi khách hàng không đặt được hàng. Tự động hoá được phần chẩn đoán và soạn diff; giữ con người ở phần quyết định. Đó là ranh giới AI-agent đúng đắn.",
        "No. The human review gate is a safety boundary that cannot be removed. If Healer self-merges, a real bug like 'the Place Order button disappeared' could be 'fixed' by the AI pointing at another button, turning the test green while customers can't order. Automate diagnosis and drafting the diff; keep the human at the decision. That is the correct AI-agent boundary.",
        "Healerが自己修正・マージできるなら、時間節約のため有効にすべきですか？",
        "いいえ。人間のレビューゲートは取り除けない安全境界です。Healerが自己マージすると、「注文ボタンが消えた」という本物のバグをAIが別のボタンを指すことで「修正」し、顧客が注文できないのにテストが緑になりうります。診断と差分の下書きは自動化し、判断は人間に残します。それが正しいAIエージェントの境界です。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. CI với GitHub Actions: shard và gộp báo cáo blob",
      en: "11. CI on GitHub Actions: sharding and merging blob reports",
      ja: "11. GitHub ActionsのCI：シャーディングとblobレポート統合",
    },
    blocks: [
      P(
        "Chạy toàn bộ bộ E2E trên một máy sẽ mất hàng chục phút và làm nghẽn merge. Playwright hỗ trợ shard: chia bộ test thành N phần chạy trên N runner song song. Mỗi runner xuất một báo cáo blob, sau đó một job gộp (merge-reports) ghép các blob thành một báo cáo HTML duy nhất. Cách này biến 40 phút thành khoảng 8 phút với năm shard, và vẫn cho ra một trace viewer thống nhất để điều tra thất bại.",
        "Running the whole E2E suite on one machine takes tens of minutes and blocks merges. Playwright supports sharding: split the suite into N parts running on N parallel runners. Each runner emits a blob report, then a merge-reports job stitches the blobs into a single HTML report. This turns 40 minutes into about 8 with five shards, and still yields a unified trace viewer to investigate failures.",
        "E2Eスイート全体を一台のマシンで実行すると数十分かかりマージを塞ぎます。Playwrightはシャーディングをサポートします：スイートをN個に分割しN台の並列ランナーで実行します。各ランナーはblobレポートを出力し、merge-reportsジョブがblobを一つのHTMLレポートに縫い合わせます。これは40分を五シャードで約8分にし、失敗を調査する統一されたトレースビューアも得られます。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/e2e.yml
name: e2e
on: [pull_request]
jobs:
  test:
    strategy:
      fail-fast: false
      matrix: { shard: [1, 2, 3, 4, 5] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npx playwright install --with-deps chromium
      - run: npx playwright test --shard=\${{ matrix.shard }}/5
        env:
          SEED_TOKEN: \${{ secrets.STAGING_SEED_TOKEN }}
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: blob-\${{ matrix.shard }}
          path: blob-report/
          retention-days: 3

  merge:
    if: \${{ !cancelled() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { path: all-blobs, pattern: blob-* }
      - run: npx playwright merge-reports --reporter=html ./all-blobs
      - uses: actions/upload-artifact@v4
        with: { name: html-report, path: playwright-report/ }`
      ),
      TIP(
        "Đặt trace: 'retain-on-failure-and-retries' trong config. Khi shard nào đó đỏ, bạn mở đúng trace của lần thử thất bại mà không phải chạy lại.",
        "Set trace: 'retain-on-failure-and-retries' in config. When a shard goes red, you open the exact trace of the failed attempt without rerunning.",
        "設定でtrace: 'retain-on-failure-and-retries'を設定します。あるシャードが赤くなったとき、再実行せずに失敗した試行の正確なトレースを開けます。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ghép cả dây chuyền: từ commit tới cổng review",
      en: "12. Wiring the full pipeline: from commit to review gate",
      ja: "12. パイプライン全体の配線：コミットからレビューゲートまで",
    },
    blocks: [
      P(
        "Giờ ta ghép mọi mảnh thành một dòng chảy có thứ tự. Khi có commit, CI chạy các spec (kể cả spec do Generator sinh và đã review) theo shard, dựng seed qua API, thao tác UI, phán xử bằng oracle. Nếu có test đỏ, Healer chạy trong một job debug, tạo pull request đề xuất chữa. Con người xem PR ấy cùng trace: nếu là locator lệch thì duyệt, nếu là lỗi sản phẩm thì mở ticket. Không có bước nào để AI tự đóng vòng lặp mà không có mắt người ở cổng cuối.",
        "Now we wire every piece into an ordered flow. On commit, CI runs the specs (including reviewed Generator-produced specs) by shard, seeds via API, drives the UI, adjudicates with the oracle. If a test goes red, Healer runs in a debug job and opens a pull request proposing a fix. A human reviews that PR alongside the trace: if it's a drifted locator, approve; if it's a product bug, open a ticket. No step lets AI close the loop without human eyes at the final gate.",
        "今、すべての部品を順序付きのフローに配線します。コミット時、CIはspec（レビュー済みのGenerator生成specを含む）をシャードごとに実行し、API経由でシードし、UIを操作し、オラクルで判定します。テストが赤くなると、Healerはデバッグジョブで動作し修正を提案するプルリクエストを開きます。人間はそのPRをトレースとともにレビューします：ロケーターのずれなら承認、製品バグならチケットを起票します。最終ゲートに人間の目がないままAIがループを閉じるステップはありません。"
      ),
      CODE(
        "yaml",
        `# thêm job heal (chạy khi test đỏ), tạo PR chứ không tự merge
  heal:
    if: \${{ failure() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright agent heal --input playwright-report/ --out heal.patch
      - name: mở PR đề xuất chữa (human gate)
        uses: peter-evans/create-pull-request@v6
        with:
          branch: healer/auto-fix
          title: "Healer: đề xuất sửa test gãy (cần review)"
          body: "AI đề xuất. KHÔNG tự merge. Xem trace kèm theo."
          labels: needs-human-review`
      ),
      NOTE(
        "Cổng review là nhãn 'needs-human-review' + quy tắc bảo vệ nhánh yêu cầu ít nhất một approval. Cấu hình repo, không chỉ quy ước.",
        "The review gate is the 'needs-human-review' label plus branch protection requiring at least one approval. Configure it in the repo, not just by convention.",
        "レビューゲートは「needs-human-review」ラベルと、少なくとも一つの承認を要求するブランチ保護です。慣習だけでなくリポジトリで設定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Chống flaky và bảo đảm tính xác định",
      en: "13. Fighting flakiness and ensuring determinism",
      ja: "13. フレーキー対策と決定性の確保",
    },
    blocks: [
      P(
        "Một pipeline tích hợp chỉ đáng tin nếu nó không đỏ ngẫu nhiên. Flaky đến từ ba nguồn: chờ cứng (sleep) thay vì auto-wait, dữ liệu chia sẻ giữa test khiến chúng phụ thuộc nhau, và phụ thuộc mạng thật ngoài tầm kiểm soát. Ta xử lý cả ba: bỏ mọi sleep, mỗi test tự seed và tự dọn để đảm bảo tính idempotent, và mock các dịch vụ bên thứ ba như cổng thanh toán bằng route hoặc routeWebSocket. Khi test vẫn thi thoảng đỏ, ta bật video retention mode cho lần retry để bắt được khoảnh khắc gãy.",
        "An integrated pipeline is trustworthy only if it doesn't go red at random. Flakiness comes from three sources: hard waits (sleep) instead of auto-wait, data shared between tests making them interdependent, and real network dependencies beyond our control. We tackle all three: remove every sleep, have each test self-seed and self-clean for idempotency, and mock third-party services like the payment gateway with route or routeWebSocket. When a test still occasionally reddens, we enable video retention mode on the retry to capture the breaking moment.",
        "統合パイプラインはランダムに赤くならない場合にのみ信頼できます。フレーキーは三つの源から来ます：自動待機の代わりの固定待機（sleep）、テスト間で共有されるデータによる相互依存、そして制御外の実ネットワーク依存です。三つすべてに対処します：すべてのsleepを除去し、各テストが冪等性のため自らシードし自ら片付け、決済ゲートウェイのようなサードパーティをrouteやrouteWebSocketでモックします。それでも時々赤くなる場合、再試行時にビデオ保持モードを有効にして破断の瞬間を捉えます。"
      ),
      CODE(
        "ts",
        `// mock cổng thanh toán để test xác định, không gọi ra ngoài
test.beforeEach(async ({ page }) => {
  await page.route('**/payment-gateway/charge', async route => {
    const req = route.request().postDataJSON();
    // giả lập declined cho thẻ test cụ thể
    const declined = req.card === '4000000000000002';
    await route.fulfill({
      status: declined ? 402 : 200,
      json: declined ? { status: 'declined' } : { status: 'approved', txId: 'tx_test' },
    });
  });
});`
      ),
      WARN(
        "Flaky bị bỏ qua sẽ ăn mòn niềm tin: khi nửa số lần đỏ là giả, đội ngũ bắt đầu bỏ qua cả lần đỏ thật. Coi flaky là lỗi P1, không phải phiền toái.",
        "Ignored flakiness erodes trust: when half the reds are false, the team starts ignoring the real reds too. Treat flakiness as a P1 defect, not a nuisance.",
        "無視されたフレーキーは信頼を蝕みます：赤の半分が偽物だと、チームは本物の赤も無視し始めます。フレーキーは煩わしさではなくP1欠陥として扱います。"
      ),
    ],
  },
  {
    heading: {
      vi: "14. Ranh giới AI-agent và góc nhìn phỏng vấn",
      en: "14. AI-agent boundaries and the interview angle",
      ja: "14. AIエージェントの境界と面接の観点",
    },
    blocks: [
      P(
        "Tích hợp AI vào QA không có nghĩa là giao phó phán quyết cho AI. Ranh giới đúng: AI làm phần lặp và tốn công (khám phá app, soạn kế hoạch, sinh khung spec, chẩn đoán gãy, soạn diff), con người làm phần phán quyết (duyệt kế hoạch, duyệt oracle, quyết định chữa hay mở ticket). Khi phỏng vấn cấp senior, câu hỏi hay không phải 'bạn dùng công cụ nào' mà 'bạn đặt ranh giới ở đâu và vì sao'. Người trả lời tốt sẽ nói về grounding, hallucination, và cổng review như một thiết kế an toàn có chủ đích.",
        "Integrating AI into QA does not mean delegating judgment to AI. The correct boundary: AI does the repetitive, laborious parts (explore the app, draft the plan, generate spec skeletons, diagnose failures, draft diffs), humans do the judgment (approve the plan, approve the oracle, decide to heal or open a ticket). In senior interviews, the good question isn't 'which tool do you use' but 'where do you draw the boundary and why'. A strong answer talks about grounding, hallucination and the review gate as deliberate safety design.",
        "AIをQAに統合することは判断をAIに委ねることを意味しません。正しい境界：AIは反復的で手間のかかる部分（アプリ探索・計画の下書き・spec骨格生成・失敗の診断・差分の下書き）を行い、人間は判断（計画の承認・オラクルの承認・修復かチケット起票かの決定）を行います。シニア面接では、良い質問は「どのツールを使うか」ではなく「どこに境界を引きなぜか」です。優れた回答はグラウンディング・ハルシネーション・レビューゲートを意図的な安全設計として語ります。"
      ),
      QA(
        "Nhà tuyển dụng hỏi: làm sao đảm bảo test do AI sinh không cho đèn xanh giả?",
        "Interviewer asks: how do you ensure AI-generated tests don't produce false greens?",
        "Tôi neo ba lớp phòng thủ. Một, Generator xác minh locator trên app sống để không đoán bừa. Hai, mọi oracle phải là bất biến nghiệp vụ kiểm qua API, review bắt buộc từ chối assertion kiểu 'thấy chữ thành công'. Ba, Healer không được tự merge; đề xuất chữa đi qua PR có nhãn cần-review và bảo vệ nhánh. Ba lớp này biến AI thành trợ lý tăng năng suất chứ không phải nguồn rủi ro im lặng.",
        "I anchor three defense layers. One, Generator verifies locators on the live app so it doesn't guess. Two, every oracle must be a business invariant checked via API; review mandatorily rejects 'sees success text' assertions. Three, Healer must not self-merge; healing proposals go through a labeled needs-review PR with branch protection. These three layers make AI a productivity assistant rather than a silent source of risk.",
        "面接官の質問：AI生成テストが偽のグリーンを出さないことをどう保証しますか？",
        "三層の防御を据えます。一つ、Generatorはライブアプリでロケーターを検証し推測しません。二つ、すべてのオラクルはAPIで確認する業務不変条件でなければならず、レビューは「成功文字が見える」アサーションを必須で拒否します。三つ、Healerは自己マージ禁止で、修復提案はブランチ保護付きの要レビューPRを通ります。この三層がAIを静かなリスク源ではなく生産性の助手にします。"
      ),
      SCEN(
        "Vòng phỏng vấn: thiết kế pipeline trong 30 phút",
        "Interview round: design the pipeline in 30 minutes",
        "Đề bài: 'Thiết kế pipeline E2E cho luồng checkout, tận dụng AI nhưng an toàn.' Ứng viên mạnh vẽ bốn lớp (UI/API/CI/AI), chỉ rõ oracle là bất biến qua API, giải thích shard+blob để CI nhanh, và đặc biệt nhấn cổng review con người giữa Generator/Healer và nhánh chính. Ứng viên yếu chỉ liệt kê công cụ và quên nói ai phán quyết cuối cùng.",
        "Prompt: 'Design an E2E pipeline for checkout, leverage AI but stay safe.' A strong candidate draws four layers (UI/API/CI/AI), pins the oracle as invariants via API, explains shard+blob for fast CI, and especially stresses the human review gate between Generator/Healer and the main branch. A weak candidate just lists tools and forgets who adjudicates last.",
        "面接ラウンド：30分でパイプラインを設計",
        "課題：「チェックアウトのE2Eパイプラインを設計し、AIを活用しつつ安全に」。強い候補者は四層（UI/API/CI/AI）を描き、オラクルをAPI経由の不変条件と定め、高速CIのためのshard+blobを説明し、特にGenerator/Healerとメインブランチの間の人間レビューゲートを強調します。弱い候補者はツールを列挙するだけで、最後に誰が判定するかを忘れます。"
      ),
      P(
        "Tổng kết, dây chuyền tích hợp này cho ta tốc độ của tự động hoá AI mà không đánh đổi độ tin cậy. UI mô phỏng người dùng thật; API dựng dữ liệu và làm oracle bất biến; CI chạy song song nhanh và cho trace để điều tra; agent AI gánh phần lặp và luôn dừng trước cổng con người. Khi mỗi merge đều xác nhận rằng kho không âm, tiền cân sổ kép, và idempotency giữ đúng một đơn, ta không chỉ 'chạy test' — ta bảo vệ đúng những lời hứa nghiệp vụ của sàn TMĐT.",
        "In summary, this integrated pipeline gives us the speed of AI automation without trading away reliability. UI simulates the real user; API seeds data and serves as the invariant oracle; CI runs fast in parallel and provides traces to investigate; AI agents carry the repetitive load and always stop before the human gate. When every merge confirms stock never negative, money double-entry balanced, and idempotency holding exactly one order, we are not merely 'running tests' — we are protecting the very business promises of the e-commerce platform.",
        "まとめると、この統合パイプラインは信頼性を犠牲にせずAI自動化の速度を与えます。UIは実際のユーザーを模擬し、APIはデータをシードし不変オラクルとして機能し、CIは並列で高速に実行し調査用トレースを提供し、AIエージェントは反復作業を担い常に人間ゲートの前で止まります。すべてのマージが在庫は決して負でない・金額は複式で均衡・冪等性が正確に一注文を保つことを確認するとき、私たちは単に「テストを実行している」のではなく、ECプラットフォームの業務上の約束そのものを守っているのです。"
      ),
    ],
  },
];

/* ------------------------------------------------------------------ ART B */
const pagesB = [
  {
    heading: {
      vi: "1. Bài toán: một regression hiệu năng ẩn dưới lỗi chức năng",
      en: "1. The problem: a perf regression hiding under a functional failure",
      ja: "1. 課題：機能障害の下に隠れた性能リグレッション",
    },
    blocks: [
      P(
        "Trong một hệ thống fintech xử lý giao dịch chuyển tiền, chất lượng không chỉ là 'đúng' mà còn là 'kịp'. Một endpoint xác nhận giao dịch có thể trả về kết quả chính xác nhưng chậm tới mức vi phạm SLA, và độ chậm ấy đôi khi lại là nguyên nhân gốc của một lỗi chức năng ở thượng nguồn: client timeout rồi retry, sinh giao dịch trùng. Bài viết này tích hợp ba trụ cột — k6 để tạo tải và đo hiệu năng, Playwright để kiểm chức năng E2E, và observability (traces, metrics, logs, Grafana) để tương quan hai loại tín hiệu ấy trong CI.",
        "In a fintech system processing money transfers, quality is not only 'correct' but also 'in time'. A transaction confirmation endpoint may return an accurate result yet be slow enough to violate the SLA, and that slowness is sometimes the root cause of an upstream functional failure: the client times out then retries, creating duplicate transactions. This article integrates three pillars — k6 for load and performance measurement, Playwright for functional E2E, and observability (traces, metrics, logs, Grafana) to correlate those two signal types in CI.",
        "送金取引を処理するフィンテックシステムでは、品質は「正しい」だけでなく「間に合う」ことでもあります。取引確認エンドポイントは正確な結果を返しても、SLAを侵害するほど遅いことがあり、その遅さが時に上流の機能障害の根本原因になります：クライアントがタイムアウトして再試行し、重複取引を生成するのです。本記事は三つの柱を統合します—負荷と性能測定のk6、機能E2EのPlaywright、そしてCIでこれら二種類の信号を相関させるオブザーバビリティ（トレース・メトリクス・ログ・Grafana）です。"
      ),
      P(
        "Ràng buộc nghiệp vụ khắc nghiệt: p95 độ trễ của endpoint xác nhận phải dưới 400ms ở tải 2.000 giao dịch/giây, tỉ lệ lỗi dưới 0.1%, và tiền phải cân sổ kép tuyệt đối. SLO này không phải khẩu hiệu mà là cổng chặn trong pipeline: nếu ngưỡng k6 vỡ, build đỏ; nếu test chức năng Playwright đỏ, ta phải truy ngược qua trace để biết liệu nguyên nhân có phải là chính regression hiệu năng vừa phát hiện hay không.",
        "The business constraints are strict: the confirmation endpoint's p95 latency must be under 400ms at 2,000 transactions/second, error rate under 0.1%, and money must be strictly double-entry balanced. This SLO is not a slogan but a gate in the pipeline: if a k6 threshold breaks, the build reds; if a Playwright functional test reds, we must trace back to learn whether the cause is the very perf regression we just detected.",
        "業務制約は厳格です：確認エンドポイントのp95レイテンシは2,000取引/秒の負荷で400ms未満、エラー率0.1%未満、金額は厳密に複式で均衡していなければなりません。このSLOはスローガンではなくパイプラインのゲートです：k6の閾値が破れればビルドは赤くなり、Playwright機能テストが赤くなれば、原因が今検出した性能リグレッションそのものかどうかをトレースで遡って知る必要があります。"
      ),
      NOTE(
        "Triết lý: chức năng và hiệu năng không phải hai thế giới. Một sự cố production thường là giao điểm của cả hai; test tích hợp phải nhìn được giao điểm ấy.",
        "Philosophy: functionality and performance are not two worlds. A production incident is often the intersection of both; integrated testing must see that intersection.",
        "哲学：機能と性能は二つの世界ではありません。本番障害はしばしば両者の交点であり、統合テストはその交点を見られなければなりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc quan sát được: traces, metrics, logs",
      en: "2. Observable architecture: traces, metrics, logs",
      ja: "2. 観測可能なアーキテクチャ：トレース・メトリクス・ログ",
    },
    blocks: [
      P(
        "Observability đứng trên ba trụ: traces (dấu vết một request đi xuyên các service), metrics (số đo tổng hợp như p95, error rate), và logs (bản ghi sự kiện chi tiết). Trong pipeline này, cả k6 và Playwright đều gắn một trace id chung vào request, để khi một giao dịch chậm hay hỏng, ta lần được toàn bộ đường đi của nó qua các microservice và đọc trên Grafana. Đây là điều biến 'test đỏ' từ một bí ẩn thành một câu chuyện có thể điều tra.",
        "Observability stands on three pillars: traces (the path of one request across services), metrics (aggregate measures like p95, error rate), and logs (detailed event records). In this pipeline, both k6 and Playwright attach a shared trace id to requests, so when a transaction is slow or fails we can follow its entire path across microservices and read it on Grafana. This is what turns a 'red test' from a mystery into an investigable story.",
        "オブザーバビリティは三つの柱に立ちます：トレース（サービスを横断する一つのリクエストの経路）、メトリクス（p95やエラー率のような集約指標）、ログ（詳細なイベント記録）です。このパイプラインでは、k6とPlaywrightの両方がリクエストに共有トレースIDを付与するので、取引が遅いか失敗したとき、マイクロサービスを横断する全経路を追ってGrafanaで読めます。これが「赤いテスト」を謎から調査可能な物語に変えるものです。"
      ),
      IMG(
        `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#0b1220"/>
<rect x="20" y="30" width="120" height="50" rx="8" fill="#155e63"/><text x="80" y="60" text-anchor="middle" fill="#fff" font-size="12">k6 load</text>
<rect x="20" y="120" width="120" height="50" rx="8" fill="#155e63"/><text x="80" y="150" text-anchor="middle" fill="#fff" font-size="12">Playwright</text>
<rect x="200" y="75" width="140" height="60" rx="8" fill="#1f2937"/><text x="270" y="100" text-anchor="middle" fill="#fff" font-size="12">Txn endpoint</text><text x="270" y="118" text-anchor="middle" fill="#7dd3fc" font-size="10">trace-id chung</text>
<rect x="400" y="20" width="100" height="40" rx="6" fill="#0369a1"/><text x="450" y="45" text-anchor="middle" fill="#fff" font-size="11">Traces</text>
<rect x="400" y="80" width="100" height="40" rx="6" fill="#0369a1"/><text x="450" y="105" text-anchor="middle" fill="#fff" font-size="11">Metrics</text>
<rect x="400" y="140" width="100" height="40" rx="6" fill="#0369a1"/><text x="450" y="165" text-anchor="middle" fill="#fff" font-size="11">Logs</text>
<rect x="540" y="80" width="80" height="60" rx="8" fill="#a21caf"/><text x="580" y="115" text-anchor="middle" fill="#fff" font-size="12">Grafana</text>
<g stroke="#7dd3fc" stroke-width="2" fill="none"><path d="M140 55 L200 95"/><path d="M140 145 L200 115"/><path d="M340 90 L400 40"/><path d="M340 105 L400 100"/><path d="M340 120 L400 160"/><path d="M500 40 L540 100"/><path d="M500 100 L540 110"/><path d="M500 160 L540 120"/></g>
</svg>`,
        "k6 và Playwright cùng gắn trace-id vào endpoint giao dịch; traces/metrics/logs hội tụ về Grafana.",
        "k6 and Playwright both attach a trace-id to the transaction endpoint; traces/metrics/logs converge in Grafana.",
        "k6とPlaywrightは取引エンドポイントに共通のトレースIDを付与し、トレース／メトリクス／ログはGrafanaに集約します。"
      ),
      TIP(
        "Tiêm trace id vào header W3C traceparent ở cả k6 và Playwright. Cùng một chuẩn tức là cùng một dòng thời gian khi điều tra.",
        "Inject the trace id into the W3C traceparent header in both k6 and Playwright. The same standard means the same timeline when investigating.",
        "k6とPlaywrightの両方でW3C traceparentヘッダーにトレースIDを注入します。同じ標準は調査時に同じタイムラインを意味します。"
      ),
      QA(
        "Trong ba trụ observability, cái nào quan trọng nhất khi điều tra một giao dịch chậm?",
        "Among the three observability pillars, which matters most when investigating a slow transaction?",
        "Không có cái nào 'quan trọng nhất' một cách tuyệt đối, nhưng trace là điểm khởi đầu tốt nhất cho một giao dịch cụ thể chậm. Metrics cho biết 'p95 tăng' nhưng không nói request nào; logs cho chi tiết nhưng rời rạc và khó nối; trace cho toàn bộ đường đi của đúng request đó qua các service kèm thời lượng mỗi span. Từ span nghẽn trong trace, ta nhảy sang logs của service đó để đọc chi tiết, và soi metrics để biết vấn đề là cá biệt hay hệ thống. Ba trụ bổ sung nhau; trace là sợi nối chúng.",
        "None is 'most important' absolutely, but the trace is the best starting point for one specific slow transaction. Metrics tell you 'p95 rose' but not which request; logs give detail but are scattered and hard to stitch; a trace gives the full path of that exact request across services with per-span durations. From the bottleneck span in the trace, you jump to that service's logs for detail, and check metrics to see whether the issue is isolated or systemic. The three pillars complement each other; the trace is the thread connecting them.",
        "オブザーバビリティの三つの柱のうち、遅い取引を調査するときどれが最も重要ですか？",
        "絶対的に「最も重要」なものはありませんが、特定の遅い取引にはトレースが最良の出発点です。メトリクスは「p95が上昇した」と教えますがどのリクエストかは言いません。ログは詳細ですが散在し縫い合わせが困難です。トレースはまさにそのリクエストのサービスを横断する全経路をスパンごとの時間とともに与えます。トレースのボトルネックスパンから、そのサービスのログへ飛んで詳細を読み、メトリクスを見て問題が個別か系統的かを知ります。三つの柱は補完し合い、トレースはそれらを結ぶ糸です。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. SLO, ngưỡng và bất biến làm oracle kép",
      en: "3. SLO, thresholds and invariants as a dual oracle",
      ja: "3. SLO・閾値・二重オラクルとしての不変条件",
    },
    blocks: [
      P(
        "Ở đây oracle có hai mặt. Mặt hiệu năng: ngưỡng k6 (thresholds) định nghĩa SLO thành điều kiện pass/fail — p95 dưới 400ms, tỉ lệ lỗi HTTP dưới 0.1%. Mặt chức năng: bất biến nghiệp vụ — mỗi giao dịch chuyển tiền phải bảo toàn tổng số dư (tiền không tự sinh hay biến mất), và idempotency đảm bảo một lệnh chuyển chỉ thực thi một lần. Test đạt chỉ khi cả hai oracle đều xanh; một endpoint nhanh nhưng làm mất tiền, hay đúng tiền nhưng chậm hơn SLA, đều là thất bại.",
        "Here the oracle has two faces. The performance face: k6 thresholds turn the SLO into pass/fail conditions — p95 under 400ms, HTTP error rate under 0.1%. The functional face: business invariants — every transfer must conserve total balance (money is neither created nor destroyed), and idempotency ensures a transfer executes exactly once. The test passes only when both oracles are green; an endpoint that is fast but loses money, or correct but slower than SLA, both count as failure.",
        "ここでオラクルは二つの顔を持ちます。性能の顔：k6の閾値がSLOをpass/fail条件に変えます—p95が400ms未満、HTTPエラー率0.1%未満。機能の顔：業務不変条件—各送金は総残高を保存し（金額は生成も消滅もしない）、冪等性が送金を正確に一度だけ実行することを保証します。テストは両方のオラクルが緑のときのみ合格します。速いが金を失うエンドポイント、正しいがSLAより遅いエンドポイント、どちらも失敗と数えます。"
      ),
      UL(
        [
          "SLO trễ: p95 < 400ms, p99 < 900ms ở 2.000 giao dịch/giây.",
          "SLO lỗi: tỉ lệ lỗi HTTP < 0.1%; không có 5xx trong 10 phút cửa sổ.",
          "Bất biến tiền: tổng debit == tổng credit sau mọi lô giao dịch.",
          "Bất biến idempotency: cùng một transfer key → đúng một bút toán.",
        ],
        [
          "Latency SLO: p95 < 400ms, p99 < 900ms at 2,000 txn/second.",
          "Error SLO: HTTP error rate < 0.1%; no 5xx in a 10-minute window.",
          "Money invariant: total debit == total credit after every batch.",
          "Idempotency invariant: same transfer key → exactly one ledger entry.",
        ],
        [
          "レイテンシSLO：2,000取引/秒でp95 < 400ms、p99 < 900ms。",
          "エラーSLO：HTTPエラー率 < 0.1%、10分ウィンドウで5xxなし。",
          "金額不変条件：各バッチ後、総借方 == 総貸方。",
          "冪等性不変条件：同じ送金キー → 正確に一つの仕訳。",
        ]
      ),
      WARN(
        "Đừng chỉ đo trung bình. Trung bình che đuôi phân phối; SLA production hỏng ở p95/p99, nơi khách khó chịu nhất. Luôn đặt ngưỡng trên phân vị cao.",
        "Never measure only the average. The mean hides the distribution tail; production SLAs break at p95/p99 where customers hurt most. Always set thresholds on high percentiles.",
        "平均だけを測ってはいけません。平均は分布の裾を隠します。本番SLAは顧客が最も苦しむp95/p99で壊れます。常に高いパーセンタイルに閾値を設定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Kịch bản k6: dựng tải cho endpoint giao dịch",
      en: "4. k6 script: load-testing the transaction endpoint",
      ja: "4. k6スクリプト：取引エンドポイントの負荷テスト",
    },
    blocks: [
      P(
        "k6 viết kịch bản tải bằng JavaScript, mô tả số người dùng ảo (VU), giai đoạn tăng giảm tải, và các ngưỡng. Kịch bản dưới đây tăng dần tới 2.000 giao dịch mỗi giây, gửi lệnh chuyển tiền với một transfer key duy nhất mỗi lần, gắn traceparent để tương quan, và định nghĩa threshold biến SLO thành cổng pass/fail. Ta cũng thêm một custom metric đếm số phản hồi vi phạm idempotency để bắt lỗi chức năng ngay trong lúc tải.",
        "k6 writes load scripts in JavaScript, describing virtual users (VUs), ramp stages, and thresholds. The script below ramps to 2,000 transactions per second, sends transfer commands each with a unique transfer key, attaches traceparent for correlation, and defines thresholds turning the SLO into a pass/fail gate. We also add a custom metric counting responses that violate idempotency to catch functional bugs during load.",
        "k6はJavaScriptで負荷スクリプトを書き、仮想ユーザー（VU）・ランプ段階・閾値を記述します。以下のスクリプトは毎秒2,000取引までランプし、それぞれ一意の送金キーを持つ送金コマンドを送り、相関のためtraceparentを付与し、SLOをpass/failゲートに変える閾値を定義します。負荷中に機能バグを捉えるため、冪等性を侵害する応答を数えるカスタムメトリクスも追加します。"
      ),
      CODE(
        "js",
        `// transfer.load.js — k6 tải endpoint xác nhận giao dịch
import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const dupViolations = new Counter('idempotency_violations');

export const options = {
  scenarios: {
    ramp_txn: {
      executor: 'ramping-arrival-rate',
      startRate: 100, timeUnit: '1s',
      preAllocatedVUs: 500, maxVUs: 3000,
      stages: [
        { target: 500,  duration: '1m' },
        { target: 2000, duration: '3m' },  // giữ đỉnh tải
        { target: 0,    duration: '1m' },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<400', 'p(99)<900'],  // SLO trễ
    http_req_failed:   ['rate<0.001'],               // < 0.1% lỗi
    idempotency_violations: ['count==0'],            // bất biến chức năng
  },
};

function traceparent() {
  const t = uuidv4().replace(/-/g, '');
  const s = uuidv4().replace(/-/g, '').slice(0, 16);
  return \`00-\${t}-\${s}-01\`;
}

export default function () {
  const key = uuidv4();
  const res = http.post('https://staging.bank.example/api/transfers/confirm',
    JSON.stringify({ from: 'ACC1', to: 'ACC2', amount: 100000, transferKey: key }),
    { headers: { 'Content-Type': 'application/json', traceparent: traceparent() } }
  );
  const ok = check(res, { 'status 200': r => r.status === 200 });
  // gửi lại cùng key: phải trả về CÙNG txId (idempotent)
  const retry = http.post('https://staging.bank.example/api/transfers/confirm',
    JSON.stringify({ from: 'ACC1', to: 'ACC2', amount: 100000, transferKey: key }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (ok && res.json('txId') !== retry.json('txId')) dupViolations.add(1);
}`
      ),
      P(
        "Một điểm tinh tế thường bị bỏ qua: chọn executor sai làm sai lệch toàn bộ kết luận. Nếu ta dùng số VU cố định, khi hệ thống chậm đi, mỗi VU tự động gửi ít request hơn, throughput thực tế giảm và ta vô tình đo một tải nhẹ hơn dự định — che mất chính điểm nghẽn cần tìm. Ngược lại, ramping-arrival-rate giữ nguyên số giao dịch/giây mà nghiệp vụ yêu cầu và để k6 tự cấp thêm VU khi cần, nên nó phơi bày đúng ngưỡng gãy. Ngoài ra, ta tách giai đoạn khởi động (warm-up) khỏi giai đoạn đo để tránh tính cả thời gian JIT và cache lạnh vào số p95 công bố.",
        "A subtle point often overlooked: choosing the wrong executor skews every conclusion. If we use a fixed VU count, when the system slows each VU automatically sends fewer requests, actual throughput drops and we inadvertently measure a lighter load than intended — hiding the very bottleneck we seek. Conversely, ramping-arrival-rate holds the transactions/second the business requires and lets k6 allocate more VUs as needed, so it exposes the true breaking point. We also separate a warm-up phase from the measurement phase to avoid counting JIT and cold-cache time into the published p95.",
        "見落とされがちな微妙な点：エグゼキュータの選択を誤るとすべての結論が歪みます。固定VU数を使うと、システムが遅くなったとき各VUは自動的に送信リクエストを減らし、実スループットが下がり、意図より軽い負荷を測ってしまいます—探しているボトルネックそのものを隠すのです。逆にramping-arrival-rateは業務が要求する取引/秒を保ち、必要に応じてk6がVUを追加するので、真の破断点を露呈させます。また、公表するp95にJITやコールドキャッシュの時間を含めないよう、ウォームアップ段階を測定段階から分離します。"
      ),
      NOTE(
        "ramping-arrival-rate cố định số giao dịch/giây bất kể độ trễ, nên đo đúng khả năng chịu tải. Nếu dùng VU cố định, độ trễ tăng sẽ tự giảm throughput và che vấn đề.",
        "ramping-arrival-rate fixes transactions/second regardless of latency, measuring true capacity. With fixed VUs, rising latency self-reduces throughput and hides the problem.",
        "ramping-arrival-rateはレイテンシに関わらず取引/秒を固定するので、真の処理能力を測定します。固定VUだと、レイテンシ上昇が自動的にスループットを下げ問題を隠します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Kịch bản Playwright: kiểm chức năng chuyển tiền",
      en: "5. Playwright script: functional transfer test",
      ja: "5. Playwrightスクリプト：送金の機能テスト",
    },
    blocks: [
      P(
        "Song song với tải, Playwright kiểm rằng luồng chuyển tiền đúng nghiệp vụ trên trình duyệt thật. Test này đăng nhập bằng passkey (WebAuthn virtual authenticator có từ v1.61), nhập lệnh chuyển, xác nhận, rồi phán xử bằng oracle số dư qua API. Điểm mấu chốt: Playwright gắn cùng chuẩn traceparent như k6, nên nếu giao dịch này chậm hoặc lỗi, ta tìm được đúng trace trên Grafana và so với dữ liệu tải cùng thời điểm.",
        "In parallel with load, Playwright verifies the transfer flow is business-correct in a real browser. This test logs in with a passkey (WebAuthn virtual authenticator, available since v1.61), enters a transfer command, confirms, then adjudicates with a balance oracle via API. The key point: Playwright attaches the same traceparent standard as k6, so if this transaction is slow or fails, we find the exact trace on Grafana and compare against the load data at the same moment.",
        "負荷と並行して、Playwrightは送金フローが実際のブラウザで業務的に正しいことを検証します。このテストはパスキー（v1.61以降利用可能なWebAuthn仮想認証器）でログインし、送金コマンドを入力し、確認し、API経由の残高オラクルで判定します。要点：Playwrightはk6と同じtraceparent標準を付与するので、この取引が遅いか失敗したとき、Grafanaで正確なトレースを見つけ、同じ瞬間の負荷データと比較できます。"
      ),
      CODE(
        "ts",
        `// transfer.func.spec.ts — Playwright kiểm chức năng + gắn trace-id chung
import { test, expect, request } from '@playwright/test';

function traceparent() {
  const t = crypto.randomUUID().replace(/-/g, '');
  const s = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  return \`00-\${t}-\${s}-01\`;
}

test('chuyển tiền: số dư bảo toàn và idempotent', async ({ page, context, baseURL }) => {
  const tp = traceparent();
  await context.setExtraHTTPHeaders({ traceparent: tp });

  // đăng nhập bằng passkey (WebAuthn virtual authenticator, v1.61)
  const client = await context.newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal', hasUserVerification: true, isUserVerified: true },
  });

  await page.goto('/transfer');
  await page.getByLabel('Tài khoản nguồn').fill('ACC1');
  await page.getByLabel('Tài khoản đích').fill('ACC2');
  await page.getByLabel('Số tiền').fill('100000');

  const api = await request.newContext({ baseURL, extraHTTPHeaders: { traceparent: tp } });
  const before = await (await api.get('/api/accounts/ACC1/balance')).json();

  await page.getByRole('button', { name: 'Xác nhận chuyển' }).click();
  const txId = await page.getByTestId('tx-id').innerText();

  // oracle: số dư nguồn giảm đúng, sổ kép cân, retry cùng txId
  const after = await (await api.get('/api/accounts/ACC1/balance')).json();
  expect(after.amount).toBe(before.amount - 100000);

  const led = await (await api.get(\`/api/transfers/\${txId}/ledger\`)).json();
  const debit = led.entries.filter((e:any)=>e.side==='debit').reduce((s:any,e:any)=>s+e.amount,0);
  const credit = led.entries.filter((e:any)=>e.side==='credit').reduce((s:any,e:any)=>s+e.amount,0);
  expect(debit).toBe(credit);
});`
      ),
      TIP(
        "Lưu trace-id (tp) vào annotation của test: test.info().annotations.push({type:'traceparent', description: tp}). Báo cáo Playwright sẽ hiện link tra cứu Grafana.",
        "Save the trace-id (tp) into the test annotation: test.info().annotations.push({type:'traceparent', description: tp}). The Playwright report then shows a Grafana lookup link.",
        "トレースID（tp）をテストの注釈に保存します：test.info().annotations.push({type:'traceparent', description: tp})。Playwrightレポートにgrafana検索リンクが表示されます。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Tương quan: nối regression hiệu năng với lỗi chức năng",
      en: "6. Correlation: linking a perf regression to a functional failure",
      ja: "6. 相関：性能リグレッションと機能障害を結びつける",
    },
    blocks: [
      P(
        "Đây là trái tim của bài. Giả sử một bản build mới thêm một truy vấn N+1 vào endpoint xác nhận. k6 báo p95 tăng từ 320ms lên 610ms — ngưỡng vỡ, build đỏ ở lớp hiệu năng. Cùng lúc, test Playwright thi thoảng đỏ vì client chờ quá lâu rồi retry, sinh ra hai bút toán. Nếu chỉ nhìn riêng lẻ, ta tưởng có hai lỗi khác nhau. Nhưng vì cả hai chia sẻ chuẩn trace, ta mở Grafana, lọc theo trace của lần Playwright đỏ, thấy nó dừng ở đúng truy vấn N+1 mà k6 cũng chỉ ra. Một nguyên nhân gốc, hai triệu chứng.",
        "This is the heart of the article. Suppose a new build adds an N+1 query to the confirmation endpoint. k6 reports p95 rising from 320ms to 610ms — threshold broken, build red at the performance layer. At the same time, the Playwright test occasionally reds because the client waits too long then retries, creating two ledger entries. Viewed separately, we'd think there are two different bugs. But because both share the trace standard, we open Grafana, filter by the trace of the red Playwright run, and see it stall at the exact N+1 query that k6 also pointed to. One root cause, two symptoms.",
        "これが本記事の核心です。新しいビルドが確認エンドポイントにN+1クエリを追加したとします。k6はp95が320msから610msに上昇したと報告し—閾値が破れ、性能層でビルドが赤くなります。同時にPlaywrightテストは時々赤くなります。クライアントが長く待ちすぎて再試行し、二つの仕訳を生成するからです。別々に見ると二つの異なるバグだと思うでしょう。しかし両方がトレース標準を共有するので、Grafanaを開き赤いPlaywright実行のトレースで絞り込むと、k6も指摘したまさにそのN+1クエリで停滞しているのが見えます。一つの根本原因、二つの症状です。"
      ),
      SCEN(
        "Điều tra sự cố: hai đèn đỏ, một nguyên nhân",
        "Incident investigation: two red lights, one cause",
        "Bảng CI hiện job k6 đỏ (p95 610ms) và job Playwright flaky (2/10 lần đỏ vì retry sinh giao dịch trùng). QA lấy trace-id từ annotation của lần Playwright đỏ, dán vào Grafana Tempo, thấy span 'db.query orders' chiếm 480ms. Đối chiếu dashboard k6 cùng khung giờ: đúng span đó là điểm nghẽn. Kết luận: N+1 mới là nguyên nhân gốc; sửa query, cả hai đèn xanh trở lại. Không có trace chung, QA đã tốn nhiều giờ đuổi 'lỗi idempotency' mà quên rằng nó chỉ là hệ quả của độ chậm.",
        "The CI board shows the k6 job red (p95 610ms) and the Playwright job flaky (2/10 red from retries creating duplicate transactions). QA takes the trace-id from the red Playwright annotation, pastes it into Grafana Tempo, and sees the 'db.query orders' span taking 480ms. Cross-checking the k6 dashboard for the same window: that exact span is the bottleneck. Conclusion: the new N+1 is the root cause; fix the query and both lights go green. Without a shared trace, QA would have spent hours chasing an 'idempotency bug' forgetting it was merely a consequence of the slowness.",
        "障害調査：二つの赤信号、一つの原因",
        "CIボードはk6ジョブが赤（p95 610ms）、Playwrightジョブがフレーキー（再試行で重複取引を生成し10回中2回赤）を示します。QAは赤いPlaywright注釈からトレースIDを取り、Grafana Tempoに貼り、「db.query orders」スパンが480msかかっているのを見ます。同じ時間帯のk6ダッシュボードと照合：まさにそのスパンがボトルネックです。結論：新しいN+1が根本原因で、クエリを修正すると両方の信号が緑に戻ります。共通トレースがなければ、QAはそれが遅さの結果に過ぎないことを忘れ、「冪等性バグ」を何時間も追いかけたでしょう。"
      ),
      QA(
        "Vì sao dùng trace id chung lại rút ngắn điều tra thay vì đọc log riêng lẻ?",
        "Why does a shared trace id shorten investigation versus reading separate logs?",
        "Vì log riêng lẻ chỉ cho biết 'chậm ở đâu đó' hoặc 'lỗi ở đâu đó', còn trace cho biết chính xác request nào đi qua service nào mất bao lâu. Khi k6 và Playwright cùng chuẩn traceparent, một trace id nối tín hiệu hiệu năng với triệu chứng chức năng thành một dòng thời gian duy nhất. Điều tra chuyển từ 'suy đoán tương quan' sang 'đọc quan hệ nhân quả trực tiếp' — thường rút từ hàng giờ xuống vài phút.",
        "Because separate logs only tell you 'slow somewhere' or 'failed somewhere', while a trace tells you exactly which request crossed which service and how long each took. When k6 and Playwright share the traceparent standard, one trace id links the performance signal to the functional symptom into a single timeline. Investigation shifts from 'guessing correlation' to 'reading causality directly' — usually cutting hours to minutes.",
        "なぜ共通トレースIDは個別ログを読むより調査を短縮しますか？",
        "個別ログは「どこかで遅い」「どこかで失敗」しか教えませんが、トレースはどのリクエストがどのサービスをどれだけの時間で通過したかを正確に教えます。k6とPlaywrightがtraceparent標準を共有すると、一つのトレースIDが性能信号と機能症状を単一のタイムラインに結びます。調査は「相関の推測」から「因果の直接読解」へ移り—通常、数時間を数分に短縮します。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ma trận ca kiểm thử hiệu năng và chức năng",
      en: "7. Performance and functional test matrix",
      ja: "7. 性能と機能のテストマトリクス",
    },
    blocks: [
      P(
        "Để bao phủ có hệ thống, ta lập ma trận hai chiều: một chiều là mức tải (nhàn, danh định, đỉnh, quá tải), một chiều là loại kiểm (độ trễ, tỉ lệ lỗi, bất biến tiền, idempotency). Mỗi ô có ngưỡng và oracle riêng, và một số ô đặc biệt cần cả k6 lẫn Playwright chạy đồng thời để lộ ra tương tác. Ma trận này giúp nhóm thảo luận rủi ro trước khi viết code, và là danh sách kiểm tra cho từng lần release.",
        "For systematic coverage, we build a two-dimensional matrix: one axis is load level (idle, nominal, peak, overload), the other is check type (latency, error rate, money invariant, idempotency). Each cell has its own threshold and oracle, and some special cells need both k6 and Playwright running simultaneously to expose interactions. This matrix helps the team discuss risk before writing code and serves as a checklist per release.",
        "体系的なカバレッジのため、二次元マトリクスを作ります：一軸は負荷レベル（アイドル・定格・ピーク・過負荷）、もう一軸はチェック種別（レイテンシ・エラー率・金額不変条件・冪等性）です。各セルは独自の閾値とオラクルを持ち、いくつかの特別なセルは相互作用を暴くためk6とPlaywrightの同時実行が必要です。このマトリクスはコードを書く前にチームがリスクを議論するのを助け、リリースごとのチェックリストになります。"
      ),
      UL(
        [
          "Tải danh định × độ trễ: p95 < 400ms — chỉ k6.",
          "Tải đỉnh × idempotency: retry dưới tải phải giữ một bút toán — k6 + oracle.",
          "Tải đỉnh × chức năng: Playwright chạy song song, số dư phải bảo toàn.",
          "Quá tải × tỉ lệ lỗi: chấp nhận từ chối có kiểm soát (429), không được 5xx.",
        ],
        [
          "Nominal load × latency: p95 < 400ms — k6 only.",
          "Peak load × idempotency: retry under load must keep one ledger entry — k6 + oracle.",
          "Peak load × functional: Playwright runs in parallel, balance must be conserved.",
          "Overload × error rate: controlled rejection (429) acceptable, no 5xx.",
        ],
        [
          "定格負荷×レイテンシ：p95 < 400ms — k6のみ。",
          "ピーク負荷×冪等性：負荷下の再試行は一つの仕訳を保つ — k6＋オラクル。",
          "ピーク負荷×機能：Playwrightが並行実行、残高は保存されねばならない。",
          "過負荷×エラー率：制御された拒否（429）は許容、5xxは不可。",
        ]
      ),
      NOTE(
        "Ô 'quá tải' quan trọng bị bỏ quên: dưới quá tải hệ thống nên từ chối lịch sự (429, backpressure) chứ không sập. Test phải khẳng định hành vi xuống cấp có kiểm soát.",
        "The overlooked 'overload' cell matters: under overload the system should reject gracefully (429, backpressure) rather than crash. Tests must assert controlled degradation.",
        "見落とされがちな「過負荷」セルは重要です：過負荷下でシステムはクラッシュではなく丁寧に拒否（429・バックプレッシャー）すべきです。テストは制御された劣化を主張しなければなりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Cổng ngưỡng trong CI: build đỏ khi SLO vỡ",
      en: "8. Threshold gates in CI: red build when SLO breaks",
      ja: "8. CIの閾値ゲート：SLOが破れたらビルド赤",
    },
    blocks: [
      P(
        "Ngưỡng chỉ có ý nghĩa khi nó chặn được merge. k6 trả về mã thoát khác 0 khi threshold vỡ, nên trong GitHub Actions, chỉ cần để bước 'k6 run' không bị bọc bởi lệnh nuốt lỗi là build tự đỏ. Ta xuất kết quả k6 sang định dạng JSON và đẩy metrics vào Prometheus để Grafana vẽ; đồng thời lưu summary làm artifact để reviewer đọc nhanh mà không phải mở dashboard. Playwright chạy ở job riêng nhưng cùng workflow, và một job tổng hợp quyết định trạng thái cuối.",
        "A threshold only matters when it blocks a merge. k6 returns a nonzero exit code when a threshold breaks, so in GitHub Actions, simply not wrapping the 'k6 run' step in an error-swallowing command makes the build red automatically. We export k6 results to JSON and push metrics into Prometheus for Grafana to chart; we also save the summary as an artifact so reviewers read it quickly without opening the dashboard. Playwright runs in a separate job but the same workflow, and an aggregation job decides the final status.",
        "閾値はマージを塞ぐときにのみ意味を持ちます。k6は閾値が破れると非ゼロの終了コードを返すので、GitHub Actionsでは「k6 run」ステップをエラーを飲み込むコマンドで包まないだけでビルドが自動的に赤くなります。k6の結果をJSONにエクスポートしメトリクスをPrometheusに送りGrafanaで描画し、レビュアーがダッシュボードを開かず素早く読めるようサマリーをアーティファクトとして保存します。Playwrightは別ジョブだが同じワークフローで実行し、集約ジョブが最終状態を決めます。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/quality.yml — perf + functional cùng cổng
name: quality
on: [pull_request]
jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: grafana/setup-k6-action@v1
      - name: chạy k6 (build đỏ nếu threshold vỡ)
        run: k6 run --out json=k6-result.json transfer.load.js
        env: { K6_PROMETHEUS_RW_SERVER_URL: \${{ secrets.PROM_RW }} }
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with: { name: k6-summary, path: k6-result.json }

  functional:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npx playwright install --with-deps chromium
      - run: npx playwright test transfer.func.spec.ts
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with: { name: pw-report, path: playwright-report/ }

  gate:
    needs: [perf, functional]   # cả hai phải xanh mới cho merge
    runs-on: ubuntu-latest
    steps:
      - run: echo "SLO + chức năng đều đạt — cho phép merge"`
      ),
      WARN(
        "Đừng đặt 'continue-on-error: true' cho bước k6 chỉ để tránh phiền. Làm vậy là biến cổng ngưỡng thành trang trí; SLO vỡ sẽ trôi ra production.",
        "Never set 'continue-on-error: true' on the k6 step just to avoid annoyance. That turns the threshold gate into decoration; a broken SLO will slip into production.",
        "煩わしさを避けるためだけにk6ステップに「continue-on-error: true」を設定してはいけません。それは閾値ゲートを飾りに変え、破れたSLOが本番に漏れます。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Dashboard Grafana và cảnh báo dựa trên SLO",
      en: "9. Grafana dashboards and SLO-based alerting",
      ja: "9. GrafanaダッシュボードとSLOベースのアラート",
    },
    blocks: [
      P(
        "Grafana biến số liệu thành câu chuyện nhìn được. Ta dựng ba panel cốt lõi: biểu đồ p95/p99 theo thời gian với đường ngưỡng 400ms; tỉ lệ lỗi HTTP với cảnh báo ở 0.1%; và một panel error budget cho biết ta đã tiêu bao nhiêu phần ngân sách lỗi của SLO trong chu kỳ. Khi p95 vượt ngưỡng trong CI, cùng dashboard ấy cho reviewer thấy ngay hình dạng của regression — dốc lên đột ngột sau commit nào — thay vì chỉ một con số khô khan.",
        "Grafana turns numbers into a visible story. We build three core panels: a p95/p99 time chart with the 400ms threshold line; an HTTP error-rate panel with an alert at 0.1%; and an error-budget panel showing how much of the SLO's error budget we've spent this cycle. When p95 exceeds the threshold in CI, that same dashboard shows the reviewer the shape of the regression — a sudden climb after which commit — rather than a lone dry number.",
        "Grafanaは数値を見える物語に変えます。三つの中核パネルを作ります：400ms閾値線付きのp95/p99時系列チャート、0.1%でアラートするHTTPエラー率パネル、このサイクルでSLOのエラーバジェットをどれだけ消費したかを示すエラーバジェットパネルです。CIでp95が閾値を超えると、同じダッシュボードがレビュアーにリグレッションの形—どのコミット後に急上昇したか—を、孤立した無味な数値ではなく見せます。"
      ),
      CODE(
        "yaml",
        `# grafana-alert.yaml — cảnh báo khi error budget cháy nhanh (burn rate)
apiVersion: 1
groups:
  - name: txn-slo
    rules:
      - alert: FastBurnLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket{route="/transfers/confirm"}[5m]))
            by (le)) > 0.4
        for: 5m
        labels: { severity: page }
        annotations:
          summary: "p95 > 400ms trên endpoint xác nhận giao dịch"
          runbook: "https://runbook.example/slo/txn-latency"
      - alert: ErrorBudgetBurn
        expr: |
          (1 - (sum(rate(http_requests_total{code!~"5.."}[1h]))
              / sum(rate(http_requests_total[1h])))) > 0.001
        for: 10m
        labels: { severity: page }`
      ),
      TIP(
        "Cảnh báo theo burn rate (tốc độ tiêu ngân sách lỗi) thay vì ngưỡng tức thời: ít báo động giả hơn và phản ánh đúng mức đe doạ SLO trong dài hạn.",
        "Alert on burn rate (how fast the error budget depletes) instead of instantaneous thresholds: fewer false alarms and a truer reflection of the long-term SLO threat.",
        "瞬間的な閾値ではなくバーンレート（エラーバジェットの消費速度）でアラートします：誤報が少なく、長期的なSLOの脅威をより正確に反映します。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Bất biến tiền dưới tải: sổ kép không được lệch",
      en: "10. Money invariant under load: the ledger must not drift",
      ja: "10. 負荷下の金額不変条件：台帳はずれてはいけない",
    },
    blocks: [
      P(
        "Điều đáng sợ nhất trong fintech không phải chậm mà là mất cân sổ. Dưới tải cao, các điều kiện tranh chấp (race condition) hiếm gặp mới lộ ra: hai giao dịch cùng chạm một tài khoản, một khoá bị bỏ lỡ, và số dư lệch vài đồng. Vài đồng ấy nhân với hàng triệu giao dịch là một thảm hoạ kiểm toán. Vì thế sau mỗi lần k6 dồn tải, ta chạy một job đối soát: tổng mọi bút toán debit phải bằng tổng credit trên toàn hệ thống, tuyệt đối, không sai số. Đây là bất biến cứng, không phải ngưỡng mềm.",
        "The scariest thing in fintech is not slowness but an unbalanced ledger. Under high load, rare race conditions surface: two transactions touch one account, a lock is missed, and the balance drifts by a few units. Those few units times millions of transactions is an audit disaster. So after each k6 load burst we run a reconciliation job: the sum of all debit entries must equal the sum of credits across the whole system, absolutely, with zero tolerance. This is a hard invariant, not a soft threshold.",
        "フィンテックで最も恐ろしいのは遅さではなく台帳の不均衡です。高負荷下でまれな競合状態が表面化します：二つの取引が一つの口座に触れ、ロックが漏れ、残高が数単位ずれます。その数単位に数百万の取引を掛けると監査の惨事です。そこで各k6負荷バースト後に照合ジョブを実行します：すべての借方エントリの合計はシステム全体の貸方合計に等しくなければならず、絶対に、許容誤差ゼロで。これはソフトな閾値ではなくハードな不変条件です。"
      ),
      CODE(
        "ts",
        `// reconcile.spec.ts — đối soát toàn hệ thống sau tải
import { test, expect, request } from '@playwright/test';

test('sau tải: tổng debit == tổng credit (không sai số)', async ({ baseURL }) => {
  const api = await request.newContext({ baseURL });
  const rep = await (await api.get('/api/ledger/reconcile?window=last-15m')).json();

  // bất biến cứng: cân sổ kép tuyệt đối
  expect(rep.totalDebit).toBe(rep.totalCredit);
  // không có giao dịch treo (pending quá lâu) sau khi tải kết thúc
  expect(rep.stuckTransactions).toBe(0);
  // mọi transferKey duy nhất → đúng một txId
  expect(rep.duplicateKeys).toHaveLength(0);
});`
      ),
      QA(
        "Nếu chỉ lệch 1 đồng trên một triệu giao dịch, có nên cho qua không?",
        "If it's off by just 1 unit across a million transactions, should we let it pass?",
        "Không bao giờ. Trong sổ kép, lệch một đồng không phải sai số làm tròn mà là dấu hiệu một luồng nào đó mất tính nguyên tử: một bút toán được ghi mà bút toán đối ứng bị nuốt. Con số nhỏ hôm nay là lỗ hổng nhân bản dưới tải cao ngày mai. Bất biến tiền phải là đẳng thức tuyệt đối; mọi dung sai ở đây là mở cửa cho mất mát và rủi ro kiểm toán.",
        "Never. In double-entry accounting, being off by one is not a rounding error but a sign some flow lost atomicity: an entry was written while its counterpart was swallowed. A small number today is a defect that multiplies under high load tomorrow. The money invariant must be an absolute equality; any tolerance here opens the door to loss and audit risk.",
        "百万取引でわずか1単位ずれるだけなら、通すべきですか？",
        "決して通しません。複式簿記で1単位ずれるのは丸め誤差ではなく、あるフローが原子性を失った兆候です：一方の仕訳が書かれ、対応する仕訳が飲み込まれたのです。今日の小さな数字は明日の高負荷下で増殖する欠陥です。金額不変条件は絶対的な等式でなければならず、ここでの許容は損失と監査リスクへの扉を開きます。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Chống flaky trong test tải và test chức năng",
      en: "11. Fighting flakiness in load and functional tests",
      ja: "11. 負荷テストと機能テストのフレーキー対策",
    },
    blocks: [
      P(
        "Flaky ở đây có hai dạng riêng. Ở k6, kết quả dao động khi máy chạy tải bị chia sẻ tài nguyên hoặc mạng không ổn định; giải pháp là chạy runner cách ly, tăng dần tải để tránh sốc, và lặp lại ba lần lấy trung vị làm số công bố. Ở Playwright, flaky đến từ chờ cứng và phụ thuộc thứ tự; ta bỏ sleep, mỗi test tự dựng tài khoản riêng để idempotent, và mock các dịch vụ ngoài. Điểm chung: một test tải hay chức năng không ổn định thì tệ hơn không có test, vì nó dạy đội ngũ bỏ qua tín hiệu.",
        "Flakiness here has two distinct forms. In k6, results wobble when the load machine shares resources or the network is unstable; the fix is isolated runners, gradual ramping to avoid shock, and repeating three times taking the median as the published number. In Playwright, flakiness comes from hard waits and order dependence; we remove sleeps, have each test build its own account for idempotency, and mock external services. The common thread: an unstable load or functional test is worse than no test, because it teaches the team to ignore the signal.",
        "ここでのフレーキーは二つの異なる形を持ちます。k6では、負荷マシンがリソースを共有したりネットワークが不安定なとき結果が揺れます。対策は分離したランナー、ショックを避ける段階的ランプ、三回繰り返して中央値を公表値とすることです。Playwrightでは、フレーキーは固定待機と順序依存から来ます。sleepを除去し、冪等性のため各テストが独自の口座を作り、外部サービスをモックします。共通点：不安定な負荷または機能テストはテストがないより悪いです。チームに信号を無視するよう教えるからです。"
      ),
      CODE(
        "bash",
        `# chạy k6 ba lần, lấy trung vị p95 để công bố ổn định
for i in 1 2 3; do
  k6 run --summary-export="run-$i.json" transfer.load.js
done
node -e '
  const p = [1,2,3].map(i => require("./run-"+i+".json").metrics.http_req_duration["p(95)"]);
  p.sort((a,b)=>a-b);
  console.log("p95 median =", p[1].toFixed(1), "ms");
'`
      ),
      P(
        "Có một cạm bẫy tinh vi khi so sánh kết quả giữa các lần build: nếu môi trường staging thay đổi âm thầm (thêm dịch vụ nền, dữ liệu phình to, hàng xóm ồn ào trên máy chia sẻ), một 'regression' ta thấy có thể là nhiễu môi trường chứ không phải lỗi code. Vì thế ta cố định phiên bản hạ tầng, chạy một baseline ngay trước mỗi so sánh, và chỉ kết luận regression khi độ lệch vượt khoảng tin cậy của baseline. Kỷ luật này biến số đo hiệu năng từ cảm tính thành bằng chứng có thể bảo vệ trước hội đồng release.",
        "There is a subtle trap when comparing results across builds: if the staging environment silently changes (an added background service, bloated data, a noisy neighbor on a shared machine), a 'regression' we observe may be environmental noise rather than a code defect. So we pin the infrastructure version, run a baseline right before each comparison, and only conclude a regression when the deviation exceeds the baseline's confidence interval. This discipline turns performance numbers from gut feeling into evidence defensible before a release board.",
        "ビルド間で結果を比較する際の微妙な罠：ステージング環境が静かに変化すると（バックグラウンドサービスの追加、データの肥大化、共有マシンの騒がしい隣人）、観測した「リグレッション」がコード欠陥ではなく環境ノイズかもしれません。そこでインフラのバージョンを固定し、各比較の直前にベースラインを実行し、偏差がベースラインの信頼区間を超えたときのみリグレッションと結論します。この規律は性能数値を勘からリリース委員会の前で擁護できる証拠に変えます。"
      ),
      WARN(
        "Đừng công bố kết quả tải từ một lần chạy duy nhất trên máy chia sẻ. Số đo hiệu năng cần lặp lại và cách ly; một lần chạy là giai thoại, không phải bằng chứng.",
        "Never publish load results from a single run on a shared machine. Performance numbers need repetition and isolation; a single run is an anecdote, not evidence.",
        "共有マシンでの単一実行から負荷結果を公表してはいけません。性能数値は繰り返しと分離が必要です。単一実行は逸話であり証拠ではありません。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Đóng vòng phản hồi: từ cảnh báo tới runbook",
      en: "12. Closing the feedback loop: from alert to runbook",
      ja: "12. フィードバックループを閉じる：アラートからランブックへ",
    },
    blocks: [
      P(
        "Một pipeline chất lượng không dừng ở việc phát hiện; nó phải dẫn tới hành động. Khi cảnh báo burn rate kích hoạt hoặc CI đỏ vì SLO vỡ, mỗi cảnh báo trỏ tới một runbook: các bước chẩn đoán đã chuẩn hoá, dashboard cần mở, truy vấn trace mẫu, và cách rollback. Nhờ trace id chung, runbook có thể hướng dẫn dán id từ báo cáo Playwright vào Grafana để định vị span nghẽn trong vài phút. Vòng lặp khép kín: đo, cảnh báo, điều tra bằng trace, sửa, xác nhận SLO xanh trở lại.",
        "A quality pipeline does not stop at detection; it must lead to action. When a burn-rate alert fires or CI reds because an SLO broke, each alert points to a runbook: standardized diagnostic steps, dashboards to open, sample trace queries, and how to roll back. Thanks to the shared trace id, the runbook can instruct pasting the id from the Playwright report into Grafana to locate the bottleneck span within minutes. The loop closes: measure, alert, investigate via trace, fix, confirm the SLO is green again.",
        "品質パイプラインは検出で止まらず、行動につながらねばなりません。バーンレートアラートが発火するかSLOが破れてCIが赤くなると、各アラートはランブックを指します：標準化された診断手順、開くべきダッシュボード、サンプルトレースクエリ、ロールバック方法です。共通トレースIDのおかげで、ランブックはPlaywrightレポートのIDをGrafanaに貼ってボトルネックスパンを数分で特定するよう指示できます。ループが閉じます：測定・アラート・トレースで調査・修正・SLOが再び緑であることを確認。"
      ),
      IMG(
        `<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="620" height="200" fill="#0b1220"/>
<circle cx="80" cy="100" r="34" fill="#155e63"/><text x="80" y="104" text-anchor="middle" fill="#fff" font-size="11">Đo</text>
<circle cx="210" cy="60" r="34" fill="#0369a1"/><text x="210" y="64" text-anchor="middle" fill="#fff" font-size="11">Cảnh báo</text>
<circle cx="340" cy="100" r="34" fill="#a21caf"/><text x="340" y="97" text-anchor="middle" fill="#fff" font-size="10">Điều tra</text><text x="340" y="110" text-anchor="middle" fill="#f1f5f9" font-size="9">trace</text>
<circle cx="470" cy="60" r="34" fill="#7c2d12"/><text x="470" y="64" text-anchor="middle" fill="#fff" font-size="11">Sửa</text>
<circle cx="560" cy="120" r="34" fill="#0f766e"/><text x="560" y="124" text-anchor="middle" fill="#fff" font-size="11">Xác nhận</text>
<g stroke="#7dd3fc" stroke-width="2" fill="none" marker-end="url(#a)"><path d="M110 90 L180 70"/><path d="M240 75 L312 92"/><path d="M370 92 L442 72"/><path d="M498 75 L534 105"/></g>
<path d="M540 145 Q300 210 90 130" stroke="#7dd3fc" stroke-width="2" fill="none" stroke-dasharray="5 4"/>
</svg>`,
        "Vòng lặp khép kín: đo → cảnh báo → điều tra qua trace → sửa → xác nhận, rồi lặp lại.",
        "Closed loop: measure → alert → investigate via trace → fix → confirm, then repeat.",
        "閉じたループ：測定 → アラート → トレースで調査 → 修正 → 確認、そして繰り返し。"
      ),
      NOTE(
        "Runbook nên link trực tiếp truy vấn Grafana đã điền sẵn biến trace id. Càng ít thao tác thủ công lúc sự cố, càng ít sai lầm dưới áp lực.",
        "The runbook should link a Grafana query pre-filled with the trace-id variable. The fewer manual steps during an incident, the fewer mistakes under pressure.",
        "ランブックはトレースID変数を事前入力したGrafanaクエリを直接リンクすべきです。障害時の手作業が少ないほど、プレッシャー下での誤りが減ります。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn và tổng kết tích hợp",
      en: "13. Interview angle and integration summary",
      ja: "13. 面接の観点と統合のまとめ",
    },
    blocks: [
      P(
        "Kỹ sư QA cấp cao trong fintech thường bị hỏi cách nối hiệu năng với chức năng. Câu trả lời hay không dừng ở 'tôi chạy k6 và Playwright riêng', mà chỉ ra thiết kế tương quan: trace id chung, oracle kép (ngưỡng SLO và bất biến tiền), và cổng CI chặn merge khi bất kỳ mặt nào vỡ. Người phỏng vấn tinh ý sẽ đào sâu vào tình huống một regression hiệu năng gây ra lỗi chức năng — chính kịch bản N+1 ở trên — để xem ứng viên có tư duy nhân quả xuyên tầng hay không.",
        "Senior QA engineers in fintech are often asked how to link performance with functionality. A good answer does not stop at 'I run k6 and Playwright separately' but shows a correlation design: a shared trace id, a dual oracle (SLO thresholds and money invariants), and a CI gate blocking the merge when either face breaks. A sharp interviewer digs into the case where a perf regression causes a functional failure — exactly the N+1 scenario above — to see whether the candidate has cross-layer causal thinking.",
        "フィンテックのシニアQAエンジニアは、性能と機能をどう結びつけるかをよく聞かれます。良い回答は「k6とPlaywrightを別々に実行する」で止まらず、相関設計を示します：共通トレースID、二重オラクル（SLO閾値と金額不変条件）、いずれかの面が破れたときマージを塞ぐCIゲートです。鋭い面接官は、性能リグレッションが機能障害を引き起こすケース—まさに上記のN+1シナリオ—を掘り下げ、候補者に層をまたぐ因果的思考があるかを見ます。"
      ),
      QA(
        "Nhà tuyển dụng hỏi: đo hiệu năng và kiểm chức năng nên tách hay gộp pipeline?",
        "Interviewer asks: should performance and functional testing be separate or unified pipelines?",
        "Tách về mặt thực thi để chạy song song và tối ưu tài nguyên, nhưng gộp về mặt tín hiệu và quyết định. Nghĩa là job k6 và job Playwright chạy riêng cho nhanh, nhưng chúng chia sẻ trace id để tương quan, và một job cổng tổng hợp chỉ cho merge khi cả SLO lẫn bất biến chức năng đều đạt. Tách thực thi, gộp phán quyết — đó là cách vừa nhanh vừa không để lọt sự cố xuyên tầng.",
        "Separate in execution to run in parallel and optimize resources, but unified in signal and decision. That is, the k6 job and the Playwright job run separately for speed, yet they share a trace id for correlation, and an aggregation gate job allows merge only when both the SLO and functional invariants pass. Separate execution, unified judgment — that is how you stay fast while not letting cross-layer incidents slip through.",
        "面接官の質問：性能測定と機能テストはパイプラインを分けるべきか統合すべきか？",
        "実行は並列実行とリソース最適化のため分け、信号と決定は統合します。つまりk6ジョブとPlaywrightジョブは速度のため別々に実行しますが、相関のためトレースIDを共有し、集約ゲートジョブはSLOと機能不変条件の両方が合格したときのみマージを許可します。実行は分離、判断は統合—これが高速を保ちつつ層をまたぐ障害を漏らさない方法です。"
      ),
      P(
        "Tổng kết, tích hợp k6, Playwright và observability biến chất lượng từ hai câu hỏi rời rạc ('có đúng không' và 'có nhanh không') thành một câu hỏi thống nhất: hệ thống có giữ đúng lời hứa nghiệp vụ ở đúng tốc độ dưới đúng mức tải hay không. Trace id chung là sợi chỉ nối, SLO và bất biến tiền là oracle kép, CI là cổng chặn, và Grafana là nơi câu chuyện hiện ra để con người điều tra. Khi một regression hiệu năng và một lỗi chức năng chỉ về cùng một span, ta không đoán mò nữa — ta đọc thẳng nhân quả và sửa đúng gốc.",
        "In summary, integrating k6, Playwright and observability turns quality from two disjoint questions ('is it correct' and 'is it fast') into one unified question: does the system keep its business promises at the right speed under the right load. The shared trace id is the connecting thread, the SLO and money invariants are the dual oracle, CI is the blocking gate, and Grafana is where the story appears for humans to investigate. When a perf regression and a functional failure point to the same span, we stop guessing — we read causality directly and fix the true root.",
        "まとめると、k6・Playwright・オブザーバビリティの統合は、品質を二つのばらばらな問い（「正しいか」と「速いか」）から一つの統一された問いに変えます：システムは正しい負荷下で正しい速度で業務の約束を守るか。共通トレースIDは結ぶ糸、SLOと金額不変条件は二重オラクル、CIは阻止ゲート、Grafanaは人間が調査するために物語が現れる場所です。性能リグレッションと機能障害が同じスパンを指すとき、私たちはもう推測せず—因果を直接読み、真の根本を修正します。"
      ),
    ],
  },
];

/* ------------------------------------------------------------------ EXPORT */
const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-integrated-ecommerce-api-ci-ai",
  cover: coverA,
  tags: tags("tichhop", "ecommerce", "playwright", "api", "cicd", "aitesting"),
  title: {
    vi: "Tích hợp E2E TMĐT: Playwright + API + CI + AI Agent",
    en: "Integrated E-commerce E2E: Playwright + API + CI + AI Agent",
    ja: "EC統合E2E：Playwright＋API＋CI＋AIエージェント",
  },
  summary: {
    vi: "Ghép UI E2E của Playwright, API request context làm oracle bất biến, CI GitHub Actions shard/blob, và bộ Playwright Agents (Planner/Generator/Healer) dưới cổng review con người — cho luồng đặt hàng TMĐT.",
    en: "Combine Playwright UI E2E, API request context as the invariant oracle, GitHub Actions CI with shard/blob, and Playwright Agents (Planner/Generator/Healer) under a human review gate — for an e-commerce order flow.",
    ja: "PlaywrightのUI E2E、不変オラクルとしてのAPIリクエストコンテキスト、shard/blobのGitHub Actions CI、そして人間レビューゲート下のPlaywright Agents（Planner/Generator/Healer）を、ECの注文フローのために統合します。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-integrated-k6-perf-observability",
  cover: coverB,
  tags: tags("tichhop", "fintech", "playwright", "k6", "cicd", "advanced"),
  title: {
    vi: "Tích hợp Perf + chất lượng: k6 + Playwright + observability",
    en: "Integrated Perf + Quality: k6 + Playwright + observability",
    ja: "性能＋品質の統合：k6＋Playwright＋オブザーバビリティ",
  },
  summary: {
    vi: "Kết hợp tải/hiệu năng k6, kiểm chức năng E2E Playwright, và observability (traces/metrics/logs, Grafana) trong CI; tương quan một regression hiệu năng với lỗi chức năng qua trace id chung, cổng SLO/threshold, cho endpoint giao dịch fintech dưới tải.",
    en: "Combine k6 load/perf, Playwright functional E2E, and observability (traces/metrics/logs, Grafana) in CI; correlate a perf regression with a functional failure via a shared trace id, SLO/threshold gates, for a fintech transaction endpoint under load.",
    ja: "k6の負荷/性能、Playwrightの機能E2E、CIでのオブザーバビリティ（トレース/メトリクス/ログ・Grafana）を組み合わせ、共通トレースIDで性能リグレッションと機能障害を相関させ、SLO/閾値ゲートで、負荷下のフィンテック取引エンドポイントを扱います。",
  },
  pages: buildDoc(pagesB),
};

export const PWLATEST_09 = [artA, artB];
