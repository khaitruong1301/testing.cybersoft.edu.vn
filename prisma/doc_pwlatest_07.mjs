// ============================================================================
// doc_pwlatest_07.mjs — 2 bài THỰC CHIẾN (thucchien) cho "Playwright & công cụ mới nhất".
//   A) TMĐT: kiểm thử checkout trong flash sale  (slug: pw-ecommerce-flashsale-checkout)
//   B) Fintech: nạp tiền, hạn mức KYC & chống gian lận (slug: pw-fintech-kyc-limits-fraud)
// Trilingual VI/EN/JA (tiếng Nhật thật), oracle-first, khớp ArticleViewer CyberSoft Tester.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl07a", domain: "ecommerce", kind: "thucchien", label: "FLASH SALE · CHECKOUT" });
const coverB = makeThumb({ id: "pwl07b", domain: "fintech", kind: "thucchien", label: "KYC · LIMITS · FRAUD" });

// SVG frame helper — nền tối, bo góc, tái dùng cho mọi sơ đồ.
const frame = (inner, w = 640, h = 300) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial" font-size="13">
<rect width="${w}" height="${h}" rx="12" fill="#0b1220"/>${inner}</svg>`;

// ===========================================================================
// ARTICLE A — TMĐT: checkout trong flash sale (tồn kho & đồng thời cao)
// ===========================================================================

const imgA1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">KIẾN TRÚC CHECKOUT · FLASH SALE</text>
<g font-size="12">
  <rect x="24" y="56" width="150" height="52" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="40" y="80" fill="#f3e8ff" font-weight="700">Client / App</text><text x="40" y="97" fill="#d8b4fe">giỏ hàng, checkout</text>
  <rect x="245" y="56" width="150" height="52" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="261" y="80" fill="#e0f2fe" font-weight="700">Order API</text><text x="261" y="97" fill="#93c5fd">reserve → confirm</text>
  <rect x="466" y="56" width="150" height="52" rx="8" fill="#134e4a" stroke="#34d399"/><text x="482" y="80" fill="#d1fae5" font-weight="700">Inventory</text><text x="482" y="97" fill="#6ee7b7">stock có khoá</text>
  <rect x="245" y="150" width="150" height="52" rx="8" fill="#422006" stroke="#f59e0b"/><text x="261" y="174" fill="#fef3c7" font-weight="700">Payment GW</text><text x="261" y="191" fill="#fcd34d">idempotent + hook</text>
  <rect x="466" y="150" width="150" height="52" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="482" y="174" fill="#ffedd5" font-weight="700">Coupon svc</text><text x="482" y="191" fill="#fdba74">giới hạn lượt dùng</text>
  <path d="M174 82 h71 M395 82 h71 M320 108 v42" stroke="#64748b" stroke-width="2" marker-end="url(#arrA1)"/>
  <path d="M395 176 h71" stroke="#64748b" stroke-width="2" marker-end="url(#arrA1)"/>
</g>
<defs><marker id="arrA1" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>
<rect x="24" y="228" width="592" height="48" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="40" y="250" fill="#f8fafc" font-weight="700">Oracle: tồn kho không âm · tổng tiền đúng · order state hợp lệ · payment idempotent</text>
<text x="40" y="268" fill="#94a3b8" font-size="11">Playwright lái UI + request context bơm seed và kiểm bất biến ở backend.</text>`),
  "Kiến trúc checkout flash sale và bốn bất biến làm oracle.",
  "Flash-sale checkout architecture and the four invariants used as oracles.",
  "フラッシュセールのチェックアウト構成と、オラクルとする4つの不変条件です。"
);

const imgA2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">MÁY TRẠNG THÁI ĐƠN HÀNG · ORDER STATE MACHINE</text>
<g font-size="12">
  <rect x="24" y="70" width="120" height="46" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="40" y="98" fill="#e0f2fe" font-weight="700">CREATED</text>
  <rect x="184" y="70" width="120" height="46" rx="8" fill="#422006" stroke="#f59e0b"/><text x="200" y="98" fill="#fef3c7" font-weight="700">RESERVED</text>
  <rect x="344" y="70" width="120" height="46" rx="8" fill="#134e4a" stroke="#34d399"/><text x="360" y="98" fill="#d1fae5" font-weight="700">PAID</text>
  <rect x="504" y="70" width="112" height="46" rx="8" fill="#064e3b" stroke="#10b981"/><text x="520" y="98" fill="#d1fae5" font-weight="700">FULFILLED</text>
  <rect x="184" y="176" width="120" height="46" rx="8" fill="#7f1d1d" stroke="#f87171"/><text x="200" y="204" fill="#fee2e2" font-weight="700">CANCELLED</text>
  <rect x="344" y="176" width="120" height="46" rx="8" fill="#4a044e" stroke="#e879f9"/><text x="360" y="204" fill="#fae8ff" font-weight="700">REFUNDED</text>
  <path d="M144 93 h40 M304 93 h40 M464 93 h40" stroke="#64748b" stroke-width="2" marker-end="url(#arrA2)"/>
  <path d="M244 116 v60" stroke="#f87171" stroke-width="2" marker-end="url(#arrA2)"/>
  <path d="M404 116 v60" stroke="#e879f9" stroke-width="2" marker-end="url(#arrA2)"/>
</g>
<defs><marker id="arrA2" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>
<text x="24" y="256" fill="#94a3b8" font-size="12">Chuyển trạng thái hợp lệ mới cho phép; nhảy cóc (CREATED→PAID) là bug phải bắt.</text>`),
  "Máy trạng thái đơn hàng: chỉ các chuyển hợp lệ được phép.",
  "Order state machine: only valid transitions are allowed.",
  "注文ステートマシン: 有効な遷移のみを許可します。"
);

const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh nghiệp vụ: flash sale là bài toán đồng thời khắc nghiệt",
      en: "1. Business context: a flash sale is a brutal concurrency problem",
      ja: "1. 業務背景: フラッシュセールは過酷な並行性問題",
    },
    blocks: [
      P(
        "Flash sale là kịch bản tàn nhẫn nhất mà một hệ thống thương mại điện tử phải chịu. Trong một sàn có quy mô mười triệu người dùng, một chương trình giảm giá lúc mười hai giờ trưa có thể kéo hai trăm nghìn người bấm mua cùng một sản phẩm chỉ còn năm nghìn suất trong vòng ba giây. Đây không phải bài toán tải thuần tuý mà là bài toán tính đúng đắn dưới đồng thời cao: hệ thống phải bán đúng năm nghìn suất, không một suất nào hơn, không âm tồn kho, và mỗi khách trả tiền đúng số tiền của giỏ hàng mình. Một lỗi nhỏ ở đây không chỉ gây khó chịu mà tạo thiệt hại tài chính thật và khủng hoảng niềm tin.",
        "A flash sale is the most brutal scenario an e-commerce system must endure. On a marketplace with ten million users, a noon discount can send two hundred thousand people clicking to buy the same product with only five thousand units left within three seconds. This is not a pure load problem but a correctness-under-high-concurrency problem: the system must sell exactly five thousand units, not one more, never negative inventory, and each customer pays exactly their cart's amount. A small bug here is not merely annoying — it causes real financial loss and a crisis of trust.",
        "フラッシュセールは、ECシステムが耐えねばならない最も過酷なシナリオです。1,000万ユーザー規模のマーケットプレイスで、正午の割引は20万人を、残り5,000個の同一商品へ3秒以内に殺到させ得ます。これは純粋な負荷問題ではなく、高並行下での正しさの問題です。システムは正確に5,000個を販売し、1個も超えず、在庫を負にせず、各顧客はカートの金額を正確に支払う必要があります。ここでの小さなバグは煩わしいだけでなく、実際の金銭的損失と信頼の危機を招きます。"
      ),
      P(
        "Bài viết này tiếp cận checkout flash sale như một bài toán kiểm thử oracle-first ở quy mô doanh nghiệp, không phải một luồng click đơn giản. Chúng ta sẽ xác định các bất biến nghiệp vụ làm oracle, dựng kiến trúc và mô hình dữ liệu, viết test plan và ma trận ca, rồi đi từ happy path đến các ca thất bại sâu: oversell do đua tranh, tính sai tổng tiền, coupon bị lạm dụng, thanh toán trùng lặp, timeout và refund. Cuối cùng là CI, ranh giới cho AI-agent và góc phỏng vấn. Mọi ví dụ dùng Playwright lái giao diện kết hợp request context để bơm seed và kiểm bất biến ở backend.",
        "This article treats flash-sale checkout as an enterprise-scale, oracle-first testing problem, not a simple click flow. We define the business invariants as oracles, lay out the architecture and data model, write the test plan and case matrix, then move from happy path to deep failure cases: oversell under contention, mis-calculated totals, coupon abuse, duplicate payment, timeout and refund. We finish with CI, the AI-agent boundary and the interview angle. Every example uses Playwright driving the UI combined with the request context to seed and to verify invariants at the backend.",
        "本記事はフラッシュセールのチェックアウトを、単純なクリックフローではなく、企業規模のオラクル優先テスト問題として扱います。業務不変条件をオラクルとして定義し、構成とデータモデルを示し、テスト計画とケースマトリックスを書き、ハッピーパスから深い失敗ケース（競合による過剰販売、合計金額の誤計算、クーポン濫用、二重決済、タイムアウトと返金）へ進みます。最後にCI、AIエージェントの境界、面接の観点を扱います。すべての例はUIを操作するPlaywrightと、シードおよびバックエンドでの不変条件検証のためのリクエストコンテキストを組み合わせます。"
      ),
      NOTE(
        "Quy mô giả định xuyên suốt: 10 triệu tài khoản, đỉnh 200.000 request/giây khi mở bán, SLA thanh toán p99 < 800ms, tuân thủ PCI-DSS cho dữ liệu thẻ.",
        "Assumed scale throughout: 10M accounts, peak 200,000 requests/second at sale open, payment SLA p99 < 800ms, PCI-DSS compliance for card data.",
        "本記事の想定規模: 1,000万アカウント、販売開始時ピーク20万リクエスト/秒、決済SLA p99 < 800ms、カードデータはPCI-DSS準拠。"
      ),
      imgA1,
    ],
  },
  {
    heading: {
      vi: "2. Bất biến làm oracle: bốn điều không bao giờ được sai",
      en: "2. Invariants as oracles: four things that must never be wrong",
      ja: "2. オラクルとしての不変条件: 決して誤ってはならない4点",
    },
    blocks: [
      P(
        "Oracle là câu trả lời cho câu hỏi 'kết quả đúng là gì?'. Với checkout flash sale, đừng bao giờ khẳng định 'màn hình hiện thành công' vì màn hình có thể xanh trong khi backend đã bán quá số lượng. Thay vào đó, ta khẳng định bốn bất biến nghiệp vụ. Thứ nhất, tồn kho không bao giờ âm và tổng số suất bán ra không vượt tồn ban đầu — đây là chống oversell. Thứ hai, tổng tiền giỏ hàng và coupon phải đúng đến từng đồng theo bảng giá. Thứ ba, đơn hàng chỉ đi theo các chuyển trạng thái hợp lệ. Thứ tư, thanh toán phải idempotent: retry cùng một yêu cầu chỉ tạo đúng một khoản thu.",
        "An oracle answers the question 'what is the correct result?'. For flash-sale checkout, never assert 'the screen shows success', because the screen can be green while the backend has already oversold. Instead we assert four business invariants. First, inventory is never negative and total units sold never exceed initial stock — this is oversell prevention. Second, cart totals and coupons must be correct to the last cent per the price table. Third, an order only follows valid state transitions. Fourth, payment must be idempotent: retrying the same request creates exactly one charge.",
        "オラクルは「正しい結果とは何か」に答えます。フラッシュセールのチェックアウトでは、決して「画面が成功を表示」とアサートしてはいけません。バックエンドが既に過剰販売していても画面は緑になり得るからです。代わりに4つの業務不変条件をアサートします。第一に、在庫は決して負にならず、総販売数が初期在庫を超えない（過剰販売防止）。第二に、カート合計とクーポンは価格表どおり1円まで正確。第三に、注文は有効な状態遷移のみをたどる。第四に、決済は冪等でなければならない。同一リクエストの再試行は正確に1件の課金のみを生みます。"
      ),
      H("Bốn bất biến viết thành mệnh đề kiểm được", "The four invariants as checkable propositions", "検証可能な命題としての4不変条件"),
      UL(
        [
          "Không oversell: SUM(units_sold) ≤ initial_stock và stock_remaining ≥ 0 tại mọi thời điểm.",
          "Tổng tiền đúng: order.total = SUM(line.qty × line.unit_price) − discount(coupon), không sai số làm tròn.",
          "State machine: mọi order.status_transition nằm trong tập chuyển hợp lệ; không nhảy cóc.",
          "Idempotent payment: với cùng idempotency_key, số bản ghi charge = 1 dù retry N lần.",
        ],
        [
          "No oversell: SUM(units_sold) ≤ initial_stock and stock_remaining ≥ 0 at all times.",
          "Correct total: order.total = SUM(line.qty × line.unit_price) − discount(coupon), no rounding drift.",
          "State machine: every order.status_transition is in the valid set; no skipping.",
          "Idempotent payment: for the same idempotency_key, charge record count = 1 despite N retries.",
        ],
        [
          "過剰販売なし: 常に SUM(units_sold) ≤ initial_stock かつ stock_remaining ≥ 0。",
          "正しい合計: order.total = SUM(line.qty × line.unit_price) − discount(coupon)、丸め誤差なし。",
          "ステートマシン: すべての order.status_transition が有効集合内。飛び越えなし。",
          "冪等な決済: 同一 idempotency_key では、N回再試行しても charge レコード数 = 1。",
        ]
      ),
      TIP(
        "Viết oracle dưới dạng truy vấn SQL hoặc endpoint kiểm tra chuyên dụng, rồi để Playwright gọi qua request context. Assert trên dữ liệu thật mạnh hơn nhiều so với đọc chữ trên màn hình.",
        "Express oracles as SQL queries or dedicated check endpoints, then have Playwright call them via the request context. Asserting on real data is far stronger than reading text on the screen.",
        "オラクルをSQLクエリや専用チェックエンドポイントとして表現し、Playwrightにリクエストコンテキスト経由で呼ばせます。実データへのアサートは、画面の文字を読むよりはるかに強力です。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Kiến trúc và mô hình dữ liệu: nơi bất biến sống",
      en: "3. Architecture and data model: where invariants live",
      ja: "3. アーキテクチャとデータモデル: 不変条件が宿る場所",
    },
    blocks: [
      P(
        "Để kiểm được các bất biến, tester phải hiểu chúng sống ở đâu trong dữ liệu. Kiến trúc điển hình gồm Order API điều phối, Inventory service giữ tồn kho có khoá, Payment gateway xử lý thu tiền idempotent, và Coupon service kiểm soát lượt dùng. Mô hình dữ liệu cốt lõi gồm bảng product với stock, bảng reservation giữ chỗ tạm khi khách vào checkout, bảng order và order_line, bảng payment với idempotency_key, và bảng coupon_redemption ghi lần dùng. Reservation là mấu chốt chống oversell: nó tạm giữ tồn trong một cửa sổ thời gian, hết hạn thì tự nhả về.",
        "To verify the invariants, a tester must understand where they live in the data. A typical architecture has an Order API orchestrator, an Inventory service holding stock with locks, a Payment gateway processing idempotent charges, and a Coupon service controlling redemptions. The core data model has a product table with stock, a reservation table holding a temporary hold when a customer enters checkout, order and order_line tables, a payment table with an idempotency_key, and a coupon_redemption table recording each use. The reservation is the crux of oversell prevention: it temporarily holds stock within a time window and releases it back on expiry.",
        "不変条件を検証するには、テスターはそれがデータのどこに宿るかを理解する必要があります。典型的な構成は、調整役のOrder API、ロック付き在庫を保持するInventoryサービス、冪等な課金を処理するPaymentゲートウェイ、引換を制御するCouponサービスです。中核データモデルは、stockを持つproductテーブル、顧客がチェックアウトに入る際の一時的な確保を保持するreservationテーブル、orderとorder_lineテーブル、idempotency_keyを持つpaymentテーブル、各使用を記録するcoupon_redemptionテーブルです。reservationが過剰販売防止の要で、時間枠内で在庫を一時確保し、期限切れで戻します。"
      ),
      CODE(
        "sql",
        `-- Mô hình dữ liệu rút gọn — nơi các bất biến được thực thi
CREATE TABLE product (
  id          BIGINT PRIMARY KEY,
  sku         TEXT UNIQUE NOT NULL,
  unit_price  BIGINT NOT NULL,             -- lưu bằng đơn vị nhỏ nhất (đồng), tránh float
  stock       INT NOT NULL CHECK (stock >= 0)  -- BẤT BIẾN: tồn kho không âm
);

CREATE TABLE reservation (
  id          UUID PRIMARY KEY,
  product_id  BIGINT REFERENCES product(id),
  qty         INT NOT NULL CHECK (qty > 0),
  expires_at  TIMESTAMPTZ NOT NULL,        -- hết hạn → nhả tồn về
  status      TEXT NOT NULL                -- HELD | CONSUMED | RELEASED
);

CREATE TABLE payment (
  id              UUID PRIMARY KEY,
  order_id        UUID REFERENCES orders(id),
  idempotency_key TEXT UNIQUE NOT NULL,    -- BẤT BIẾN: một key → tối đa một charge
  amount          BIGINT NOT NULL,
  status          TEXT NOT NULL            -- PENDING | CAPTURED | FAILED | REFUNDED
);`
      ),
      P(
        "Điểm cần nhấn cho tester: đơn giá lưu bằng số nguyên theo đơn vị nhỏ nhất (đồng), không bao giờ dùng số thực dấu phẩy động cho tiền, vì float gây sai số làm tròn tích luỹ. Ràng buộc CHECK (stock >= 0) ở tầng cơ sở dữ liệu là hàng phòng thủ cuối cùng chống oversell: dù logic ứng dụng có lỗi, database vẫn từ chối ghi âm. Cột idempotency_key có ràng buộc UNIQUE biến idempotency thành bất biến cấp lưu trữ chứ không chỉ là quy ước. Test của ta sẽ tấn công đúng những điểm này.",
        "A point to stress for testers: unit prices are stored as integers in the smallest unit, never as floating-point for money, because float causes accumulating rounding drift. The CHECK (stock >= 0) constraint at the database layer is the last line of defense against oversell: even if application logic is buggy, the database refuses a negative write. The idempotency_key column with a UNIQUE constraint turns idempotency into a storage-level invariant, not just a convention. Our tests will attack exactly these points.",
        "テスターが強調すべき点: 単価は最小単位の整数で保存し、金銭に浮動小数点を決して使いません。floatは丸め誤差を蓄積させるからです。データベース層の CHECK (stock >= 0) 制約は過剰販売への最後の防衛線で、アプリロジックにバグがあってもDBが負の書き込みを拒否します。UNIQUE制約付きの idempotency_key 列は、冪等性を単なる慣習ではなくストレージレベルの不変条件にします。私たちのテストはまさにこれらの点を攻撃します。"
      ),
      NOTE(
        "Tiền luôn là số nguyên đơn vị nhỏ nhất; so sánh bằng số nguyên. Bug tiền tệ do float là lỗi kinh điển mà interviewer thích hỏi.",
        "Money is always integer in the smallest unit; compare as integers. Float-based currency bugs are a classic that interviewers love to ask about.",
        "金銭は常に最小単位の整数で、整数として比較します。float由来の通貨バグは、面接官が好んで問う古典的な誤りです。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Test plan: phạm vi, tầng test và chiến lược seed",
      en: "4. Test plan: scope, test layers and seeding strategy",
      ja: "4. テスト計画: 範囲・テスト層・シード戦略",
    },
    blocks: [
      P(
        "Một test plan tốt phân tầng rõ ràng để mỗi loại lỗi được bắt ở tầng rẻ nhất. Tầng đơn vị kiểm logic tính tổng và áp coupon với dữ liệu giả. Tầng tích hợp API kiểm reservation, xác nhận đơn và idempotency trực tiếp qua request context, nhanh và tất định. Tầng end-to-end qua giao diện chỉ giữ một lớp mỏng cho các luồng người dùng quan trọng nhất. Tầng đồng thời là đặc thù của flash sale: bắn nhiều yêu cầu song song để phơi bày race condition mà test tuần tự không bao giờ thấy. Chiến lược seed dùng test-only API để tạo sản phẩm, đặt tồn kho chính xác và phát coupon, đảm bảo mỗi test tự cô lập.",
        "A good test plan layers clearly so each defect class is caught at the cheapest layer. The unit layer checks total calculation and coupon application with fake data. The API integration layer checks reservation, order confirmation and idempotency directly via the request context — fast and deterministic. The end-to-end UI layer keeps only a thin slice for the most important user flows. The concurrency layer is specific to flash sales: firing many parallel requests to surface race conditions sequential tests never see. The seeding strategy uses a test-only API to create products, set exact stock and issue coupons, ensuring each test isolates itself.",
        "良いテスト計画は層を明確に分け、各欠陥クラスを最も安価な層で捕らえます。ユニット層は偽データで合計計算とクーポン適用を確認します。API結合層はリクエストコンテキスト経由で確保・注文確定・冪等性を直接確認し、高速で決定的です。エンドツーエンドのUI層は最重要のユーザーフローだけを薄く残します。並行層はフラッシュセール特有で、多数の並列リクエストを撃ち、逐次テストでは見えない競合状態を露出させます。シード戦略はテスト専用APIを使い、商品作成・正確な在庫設定・クーポン発行を行い、各テストの分離を保証します。"
      ),
      CODE(
        "ts",
        `// fixtures.ts — seed qua test-only API, mỗi test tự tạo & tự dọn (idempotent)
import { test as base, expect } from '@playwright/test';

type Seed = { product: { id: string; sku: string }; coupon: { code: string } };

export const test = base.extend<{ seed: Seed }>({
  seed: async ({ request }, use, info) => {
    // ĐẶT tồn kho CHÍNH XÁC để oracle oversell kiểm được
    const p = await (await request.post('/api/test/products', {
      data: { sku: \`FLASH-\${info.testId}\`, unitPrice: 199000, stock: 5 },
    })).json();
    const c = await (await request.post('/api/test/coupons', {
      data: { code: \`SAVE-\${info.testId}\`, percent: 10, maxRedemptions: 3 },
    })).json();

    await use({ product: p, coupon: c });

    // teardown: dọn sạch để chạy lại vẫn tất định
    await request.delete(\`/api/test/products/\${p.id}\`);
    await request.delete(\`/api/test/coupons/\${c.code}\`);
  },
});
export { expect };`
      ),
      WARN(
        "Test-only API phải bị vô hiệu hoàn toàn ở production (feature flag + kiểm môi trường). Một endpoint đặt tồn kho tuỳ ý lọt ra production là lỗ hổng nghiêm trọng.",
        "The test-only API must be fully disabled in production (feature flag + environment check). An endpoint that sets arbitrary stock leaking to production is a severe vulnerability.",
        "テスト専用APIは本番で完全に無効化する必要があります（フィーチャーフラグ＋環境チェック）。任意の在庫を設定できるエンドポイントが本番に漏れるのは重大な脆弱性です。"
      ),
      QA(
        "Vì sao không kiểm mọi thứ qua giao diện cho giống người dùng thật?",
        "Why not test everything through the UI to mimic real users?",
        "実ユーザーを模すため、なぜ全てをUIで検証しないのですか？",
        "Vì test qua giao diện chậm, dễ flaky và yếu về oracle: nó chỉ thấy được cái hiển thị. Các bất biến như tồn kho không âm hay idempotency sống ở backend, phải kiểm qua API hoặc dữ liệu. Tôi giữ một lớp mỏng end-to-end cho luồng quan trọng nhất để bắt lỗi tích hợp thật, còn phần lớn kiểm chứng đặt ở tầng API vừa nhanh vừa mạnh oracle. Đây là nguyên tắc kim tự tháp test áp dụng cho domain thương mại điện tử.",
        "Because UI tests are slow, flaky and weak on oracles: they only see what's displayed. Invariants like non-negative inventory or idempotency live in the backend and must be checked via API or data. I keep a thin end-to-end slice for the most important flow to catch real integration bugs, and place most verification at the API layer — fast and oracle-strong. This is the test pyramid principle applied to e-commerce.",
        "UIテストは遅く、フレーキーになりやすく、オラクルが弱いからです。表示されるものしか見えません。在庫非負や冪等性のような不変条件はバックエンドに宿り、APIやデータで検証すべきです。最重要フローには実結合バグを捕らえるためエンドツーエンドを薄く残し、大半の検証は高速でオラクルの強いAPI層に置きます。これはEC領域に適用したテストピラミッド原則です。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Ma trận ca kiểm thử: từ happy path đến biên",
      en: "5. The test case matrix: from happy path to the edges",
      ja: "5. テストケースマトリックス: ハッピーパスから境界まで",
    },
    blocks: [
      P(
        "Ma trận ca giúp không bỏ sót và làm rõ ưu tiên. Với checkout flash sale, ta chia theo trục điều kiện: tồn kho (đủ, còn đúng một, hết), coupon (không dùng, hợp lệ, hết lượt, hết hạn), đồng thời (một khách, N khách đua một suất), thanh toán (thành công, thất bại, timeout, retry), và trạng thái mạng (bình thường, chậm, mất kết nối giữa chừng). Mỗi ô trong ma trận là một hành vi kỳ vọng gắn với oracle cụ thể. Điều quan trọng là ưu tiên các ô có rủi ro tài chính cao nhất — oversell và thanh toán trùng — lên đầu, vì đó là nơi lỗi gây thiệt hại thật.",
        "A case matrix prevents gaps and clarifies priorities. For flash-sale checkout we split along condition axes: inventory (plenty, exactly one left, sold out), coupon (unused, valid, exhausted, expired), concurrency (single customer, N customers racing one unit), payment (success, failure, timeout, retry), and network state (normal, slow, dropped mid-flow). Each cell in the matrix is an expected behavior bound to a specific oracle. Crucially, prioritize the cells with the highest financial risk — oversell and duplicate payment — first, because that's where bugs cause real damage.",
        "ケースマトリックスは漏れを防ぎ、優先順位を明確にします。フラッシュセールのチェックアウトでは条件軸で分割します。在庫（潤沢・残り1・売切）、クーポン（未使用・有効・上限到達・期限切れ）、並行性（単独顧客・1個をN顧客が競合）、決済（成功・失敗・タイムアウト・再試行）、ネットワーク状態（正常・遅延・途中切断）。マトリックスの各セルは特定のオラクルに紐づく期待挙動です。重要なのは、金銭リスクが最も高いセル（過剰販売と二重決済）を最優先することです。そこがバグが実害を生む場所です。"
      ),
      IMG(
        frame(`
<text x="24" y="32" fill="#f8fafc" font-size="15" font-weight="800">MA TRẬN CA · TỒN KHO × ĐỒNG THỜI × THANH TOÁN</text>
<g font-size="11">
  <rect x="24" y="52" width="180" height="30" rx="6" fill="#1e293b"/><text x="34" y="72" fill="#cbd5e1" font-weight="700">Điều kiện</text>
  <rect x="212" y="52" width="200" height="30" rx="6" fill="#1e293b"/><text x="222" y="72" fill="#cbd5e1" font-weight="700">Kỳ vọng (oracle)</text>
  <rect x="420" y="52" width="196" height="30" rx="6" fill="#1e293b"/><text x="430" y="72" fill="#cbd5e1" font-weight="700">Ưu tiên</text>
  <rect x="24" y="88" width="180" height="28" rx="6" fill="#7f1d1d"/><text x="34" y="107" fill="#fee2e2">Còn 1, 50 khách đua</text><rect x="212" y="88" width="200" height="28" rx="6" fill="#0f172a"/><text x="222" y="107" fill="#e2e8f0">đúng 1 PAID, 49 sold-out</text><rect x="420" y="88" width="196" height="28" rx="6" fill="#7c2d12"/><text x="430" y="107" fill="#ffedd5">P0 · oversell</text>
  <rect x="24" y="120" width="180" height="28" rx="6" fill="#422006"/><text x="34" y="139" fill="#fef3c7">Retry pay 3 lần</text><rect x="212" y="120" width="200" height="28" rx="6" fill="#0f172a"/><text x="222" y="139" fill="#e2e8f0">1 charge duy nhất</text><rect x="420" y="120" width="196" height="28" rx="6" fill="#7c2d12"/><text x="430" y="139" fill="#ffedd5">P0 · idempotency</text>
  <rect x="24" y="152" width="180" height="28" rx="6" fill="#134e4a"/><text x="34" y="171" fill="#d1fae5">Coupon hết lượt</text><rect x="212" y="152" width="200" height="28" rx="6" fill="#0f172a"/><text x="222" y="171" fill="#e2e8f0">từ chối, giá gốc</text><rect x="420" y="152" width="196" height="28" rx="6" fill="#12315e"/><text x="430" y="171" fill="#e0f2fe">P1 · coupon</text>
  <rect x="24" y="184" width="180" height="28" rx="6" fill="#3b0764"/><text x="34" y="203" fill="#f3e8ff">Pay timeout rồi hook</text><rect x="212" y="184" width="200" height="28" rx="6" fill="#0f172a"/><text x="222" y="203" fill="#e2e8f0">reconcile về PAID/refund</text><rect x="420" y="184" width="196" height="28" rx="6" fill="#12315e"/><text x="430" y="203" fill="#e0f2fe">P1 · timeout</text>
</g>
<text x="24" y="248" fill="#94a3b8" font-size="12">P0 = rủi ro tài chính cao nhất, chạy trên mọi commit; P1 chạy hằng đêm.</text>`),
        "Ma trận ca ưu tiên theo rủi ro tài chính: P0 chặn merge.",
        "Case matrix prioritized by financial risk: P0 blocks merge.",
        "金銭リスクで優先順位付けしたケースマトリックス: P0はマージを止めます。"
      ),
      TIP(
        "Gắn mỗi ca một 'oracle' viết bằng lời trước khi viết code. Nếu không nói được kết quả đúng là gì thì chưa nên tự động hoá ca đó.",
        "Attach a written oracle to each case before writing code. If you can't state the correct result, you're not ready to automate that case.",
        "コードを書く前に各ケースへ文章でオラクルを付けます。正しい結果を述べられないなら、そのケースを自動化する準備ができていません。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Happy path: checkout một khách với oracle backend",
      en: "6. Happy path: single-customer checkout with backend oracles",
      ja: "6. ハッピーパス: バックエンドオラクル付きの単独顧客チェックアウト",
    },
    blocks: [
      P(
        "Trước khi tấn công các ca đồng thời, ta xác lập happy path làm mốc. Một khách thêm sản phẩm, áp coupon hợp lệ, thanh toán và nhận đơn. Điểm khác biệt so với test hời hợt là ở phần assert: ta không chỉ kiểm màn hình báo thành công mà gọi request context để đọc trạng thái đơn, tổng tiền và tồn kho từ backend. Tổng tiền phải khớp công thức đến từng đồng sau khi trừ coupon; tồn kho phải giảm đúng số lượng mua; trạng thái đơn phải là PAID. Đây là nền để các ca sau chỉ cần thay đổi một biến và quan sát bất biến nào bị vi phạm.",
        "Before attacking concurrency cases, we establish the happy path as a baseline. A customer adds a product, applies a valid coupon, pays and receives an order. The difference from a shallow test is in the asserts: we don't just check the success screen but call the request context to read order status, total and inventory from the backend. The total must match the formula to the cent after the coupon; inventory must drop by exactly the purchased quantity; order status must be PAID. This is the foundation on which later cases change just one variable and observe which invariant breaks.",
        "並行ケースを攻撃する前に、基準としてハッピーパスを確立します。顧客が商品を追加し、有効なクーポンを適用し、支払い、注文を受け取ります。浅いテストとの違いはアサートにあります。成功画面を確認するだけでなく、リクエストコンテキストを呼び、バックエンドから注文状態・合計・在庫を読みます。合計はクーポン後に式どおり1円まで一致し、在庫は購入数だけ正確に減り、注文状態はPAIDでなければなりません。これは後続ケースが1変数だけ変え、どの不変条件が壊れるかを観察する基盤です。"
      ),
      CODE(
        "ts",
        `import { test, expect } from './fixtures';

test('checkout thành công — kiểm tổng tiền, tồn kho, trạng thái ở backend', async ({ page, request, seed }) => {
  // 1) Luồng người dùng qua UI
  await page.goto(\`/p/\${seed.product.sku}\`);
  await page.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.goto('/checkout');
  await page.getByLabel('Mã giảm giá').fill(seed.coupon.code);
  await page.getByRole('button', { name: 'Áp dụng' }).click();
  await page.getByRole('button', { name: 'Thanh toán' }).click();
  await expect(page.getByTestId('order-status')).toHaveText('Đã thanh toán');

  // 2) ORACLE ở backend — mạnh hơn nhiều so với đọc màn hình
  const orderId = await page.getByTestId('order-id').textContent();
  const order = await (await request.get(\`/api/test/orders/\${orderId}\`)).json();

  // tổng tiền đúng: 199000 - 10% = 179100 (số nguyên, không sai số float)
  expect(order.total).toBe(179100);
  expect(order.status).toBe('PAID');

  // tồn kho giảm đúng 1, không âm
  const prod = await (await request.get(\`/api/test/products/\${seed.product.id}\`)).json();
  expect(prod.stock).toBe(4);
  expect(prod.stock).toBeGreaterThanOrEqual(0);
});`
      ),
      P(
        "Chú ý cách test kết hợp hai công cụ trong cùng một ca: page lái giao diện như người dùng, còn request đọc trạng thái backend làm oracle. Sự kết hợp này là điểm mạnh đặc trưng của Playwright cho kiểm thử doanh nghiệp — cùng một fixture, cùng một context xác thực, nhưng vừa mô phỏng hành vi người dùng vừa xác minh sự thật ở dữ liệu. Nếu chỉ đọc màn hình, một bug làm backend trừ tồn hai lần trong khi UI vẫn hiện đúng sẽ lọt qua; assert trên prod.stock bắt được ngay.",
        "Note how the test combines two tools in one case: page drives the UI like a user, while request reads backend state as the oracle. This combination is Playwright's signature strength for enterprise testing — same fixture, same authenticated context, yet both simulating user behavior and verifying truth in the data. If you only read the screen, a bug that double-decrements stock while the UI still shows correct would slip through; asserting on prod.stock catches it immediately.",
        "テストが1つのケースで2つのツールを組み合わせる点に注目してください。pageはユーザーのようにUIを操作し、requestはオラクルとしてバックエンド状態を読みます。この組み合わせは企業テストにおけるPlaywrightの特徴的な強みです。同一フィクスチャ、同一認証コンテキストで、ユーザー挙動の模擬とデータの真実の検証を両立します。画面だけ読むと、UIは正しく表示しつつ在庫を二重減算するバグを見逃しますが、prod.stockへのアサートは即座に捕らえます。"
      ),
      NOTE(
        "Happy path là mốc so sánh, không phải mục tiêu. Giá trị thật của bộ test nằm ở các ca thất bại ở những chương sau.",
        "The happy path is a baseline, not the goal. The real value of the suite lies in the failure cases in later chapters.",
        "ハッピーパスは基準であり目標ではありません。テストスイートの真価は、後続章の失敗ケースにあります。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ca thất bại sâu #1: race condition và chống oversell",
      en: "7. Deep failure case #1: race conditions and oversell prevention",
      ja: "7. 深い失敗ケース#1: 競合状態と過剰販売防止",
    },
    blocks: [
      P(
        "Đây là ca quan trọng nhất và cũng khó kiểm nhất. Kịch bản: sản phẩm còn đúng một suất, năm mươi khách bấm mua gần như đồng thời. Hệ thống đúng phải cho đúng một đơn thành PAID và bốn mươi chín đơn còn lại nhận thông báo hết hàng — tổng số bán ra bằng đúng tồn ban đầu, không hơn một suất. Test tuần tự không bao giờ phơi bày được lỗi này vì nó chỉ bắn một yêu cầu tại một thời điểm. Ta phải bắn đồng thời nhiều yêu cầu qua request context, rồi đếm kết quả. Oracle là bất biến số học: số đơn PAID cộng với suất còn lại phải bằng tồn ban đầu.",
        "This is the most important and hardest case to test. Scenario: a product has exactly one unit left and fifty customers click to buy nearly simultaneously. The correct system must let exactly one order become PAID and the other forty-nine receive a sold-out message — total sold equals initial stock, not one more. A sequential test never surfaces this bug because it fires one request at a time. We must fire many requests concurrently via the request context, then count results. The oracle is an arithmetic invariant: PAID orders plus remaining units must equal initial stock.",
        "これは最も重要で、かつ最も検証が難しいケースです。シナリオ: 商品の残りが正確に1個で、50人の顧客がほぼ同時に購入を押します。正しいシステムは正確に1注文をPAIDにし、残り49注文に売切通知を返します。総販売数は初期在庫に等しく、1個も超えません。逐次テストは一度に1リクエストしか撃たないため、このバグを決して露出させません。リクエストコンテキストで多数のリクエストを並行に撃ち、結果を数える必要があります。オラクルは算術的不変条件です。PAID注文数＋残り在庫数＝初期在庫。"
      ),
      CODE(
        "ts",
        `test('50 khách đua 1 suất — đúng 1 PAID, không oversell', async ({ request, seed }) => {
  // đặt lại tồn kho về đúng 1 qua test-only API
  await request.post(\`/api/test/products/\${seed.product.id}/stock\`, { data: { stock: 1 } });

  // bắn 50 yêu cầu checkout ĐỒNG THỜI (không tuần tự) → phơi bày race
  const attempts = Array.from({ length: 50 }, (_, i) =>
    request.post('/api/checkout', {
      data: { sku: seed.product.sku, qty: 1, buyer: \`racer-\${i}\` },
    })
  );
  const results = await Promise.all(attempts);
  const statuses = await Promise.all(results.map(r => r.status()));

  // ORACLE: đúng 1 thành công (200/201), 49 bị từ chối (409 hết hàng)
  const ok = statuses.filter(s => s === 200 || s === 201).length;
  const soldOut = statuses.filter(s => s === 409).length;
  expect(ok).toBe(1);
  expect(soldOut).toBe(49);

  // ORACLE số học: tồn còn lại = 0, KHÔNG âm
  const prod = await (await request.get(\`/api/test/products/\${seed.product.id}\`)).json();
  expect(prod.stock).toBe(0);
  expect(prod.stock).toBeGreaterThanOrEqual(0);
});`
      ),
      P(
        "Điểm tinh tế: Promise.all không đảm bảo các yêu cầu chạm server đúng cùng một nano giây, nhưng đủ để tạo cửa sổ đua tranh phơi bày lỗi khoá thiếu. Nếu backend dùng khoá bi quan trên hàng tồn hoặc cập nhật có điều kiện dạng UPDATE ... SET stock = stock - 1 WHERE stock >= 1, chỉ đúng một giao dịch thắng. Nếu code đọc tồn rồi mới ghi mà không khoá, hai giao dịch cùng đọc thấy một suất và cùng ghi thành công — đó là oversell. Test này bắt chính xác lỗi kiến trúc đó, thứ mà không loại test đơn lẻ nào phát hiện được.",
        "A subtle point: Promise.all doesn't guarantee requests hit the server at the exact same nanosecond, but it's enough to create a contention window exposing missing-lock bugs. If the backend uses a pessimistic lock on the stock row or a conditional update like UPDATE ... SET stock = stock - 1 WHERE stock >= 1, exactly one transaction wins. If the code reads stock then writes without locking, two transactions both read one unit and both write successfully — that's oversell. This test catches precisely that architectural bug, which no single-request test can detect.",
        "微妙な点: Promise.all はリクエストが正確に同じナノ秒でサーバーに届くことを保証しませんが、ロック欠如のバグを露出させる競合ウィンドウを作るには十分です。バックエンドが在庫行に悲観ロックを使うか、UPDATE ... SET stock = stock - 1 WHERE stock >= 1 のような条件付き更新を使えば、正確に1トランザクションが勝ちます。コードが在庫を読んでからロックなしで書くと、2トランザクションが1個を読んで両方成功します。これが過剰販売です。このテストはまさにその設計バグを捕らえ、単一リクエストのテストでは検出できません。"
      ),
      WARN(
        "Oversell là lỗi có thể xanh 100% ở mọi test tuần tự và chỉ đỏ dưới tải thật. Nếu không có ca đồng thời trong bộ test, bạn đang mù trước rủi ro tài chính lớn nhất của flash sale.",
        "Oversell can pass 100% of sequential tests and only fail under real load. Without a concurrency case in your suite, you are blind to the biggest financial risk of a flash sale.",
        "過剰販売は逐次テストで100%成功し、実負荷でのみ失敗し得ます。テストスイートに並行ケースがなければ、フラッシュセールの最大の金銭リスクに対して盲目です。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Ca thất bại sâu #2: idempotency thanh toán và retry",
      en: "8. Deep failure case #2: payment idempotency and retries",
      ja: "8. 深い失敗ケース#2: 決済の冪等性と再試行",
    },
    blocks: [
      P(
        "Trong flash sale, mạng chập chờn khiến client hay bấm lại nút thanh toán hoặc tự retry khi timeout. Nếu backend không idempotent, mỗi lần retry tạo một khoản thu, khách bị trừ tiền nhiều lần cho một đơn — thảm hoạ về niềm tin và pháp lý. Cơ chế đúng là idempotency key: client sinh một khoá duy nhất cho một ý định thanh toán, gửi kèm mọi lần retry; backend dùng ràng buộc UNIQUE trên khoá này để đảm bảo chỉ một charge được tạo, các retry sau nhận lại cùng kết quả của lần đầu. Oracle là đếm số bản ghi charge cho khoá đó phải bằng một, bất kể gửi bao nhiêu lần.",
        "In a flash sale, flaky networks make clients re-click pay or auto-retry on timeout. If the backend isn't idempotent, each retry creates a charge and the customer is billed multiple times for one order — a trust and legal disaster. The correct mechanism is an idempotency key: the client generates a unique key for one payment intent, sending it with every retry; the backend uses a UNIQUE constraint on that key to ensure only one charge is created, later retries returning the same result as the first. The oracle is that the charge-record count for that key must equal one, no matter how many times it's sent.",
        "フラッシュセールでは、不安定なネットワークによりクライアントが支払いボタンを再クリックしたり、タイムアウトで自動再試行したりします。バックエンドが冪等でないと、各再試行が課金を生み、顧客は1注文で複数回請求されます。信頼と法務の災害です。正しい仕組みは冪等キーです。クライアントは1つの支払い意図に一意のキーを生成し、すべての再試行に添付します。バックエンドはそのキーへのUNIQUE制約で、課金が1件のみ作成され、後の再試行が初回と同じ結果を返すことを保証します。オラクルは、そのキーの課金レコード数が、何回送信しても1に等しいことです。"
      ),
      CODE(
        "ts",
        `test('retry thanh toán 3 lần cùng key — chỉ tạo 1 charge', async ({ request, seed }) => {
  const idempotencyKey = \`pay-\${crypto.randomUUID()}\`;
  const body = { orderId: 'ord-1', amount: 179100, key: idempotencyKey };

  // gửi CÙNG MỘT yêu cầu 3 lần (mô phỏng retry do timeout)
  const r1 = await request.post('/api/payments', { data: body });
  const r2 = await request.post('/api/payments', { data: body }); // retry
  const r3 = await request.post('/api/payments', { data: body }); // retry

  const p1 = await r1.json(), p2 = await r2.json(), p3 = await r3.json();

  // ORACLE: cả 3 trỏ về CÙNG một charge id (không tạo mới)
  expect(p2.chargeId).toBe(p1.chargeId);
  expect(p3.chargeId).toBe(p1.chargeId);

  // ORACLE bảo toàn tiền: đúng 1 bản ghi charge, đúng 1 lần trừ tiền
  const charges = await (await request.get(
    \`/api/test/charges?key=\${idempotencyKey}\`)).json();
  expect(charges.length).toBe(1);
  expect(charges[0].amount).toBe(179100);
});`
      ),
      SCEN(
        "Khách bị trừ tiền ba lần trong 11 phút",
        "A customer billed three times in 11 minutes",
        "Trong một đợt flash sale, một sàn nhận khiếu nại hàng loạt: khách bị trừ tiền hai đến ba lần cho một đơn. Điều tra cho thấy khi payment gateway trả về chậm, ứng dụng client tự retry mà backend không dùng idempotency key, nên mỗi retry tạo một charge mới. Đội khắc phục bằng cách bắt buộc idempotency key ở mọi lệnh thanh toán và thêm ca test retry ba lần cùng key. Bài học: bất kỳ thao tác tiền bạc nào cũng phải idempotent, và phải có ca test chứng minh điều đó, không phải tin lời.",
        "During a flash sale, a marketplace received mass complaints: customers billed two to three times for one order. Investigation showed that when the payment gateway responded slowly, the client app auto-retried while the backend used no idempotency key, so each retry created a new charge. The team fixed it by mandating an idempotency key on every payment command and adding a three-retry same-key test. Lesson: any money operation must be idempotent, and there must be a test proving it, not a promise.",
        "あるフラッシュセール中、マーケットプレイスに大量の苦情が来ました。顧客が1注文で2〜3回請求されたのです。調査の結果、決済ゲートウェイの応答が遅いとクライアントアプリが自動再試行し、バックエンドが冪等キーを使っていなかったため、各再試行が新しい課金を作っていました。チームはすべての支払いコマンドに冪等キーを必須化し、同一キーで3回再試行するテストを追加して修正しました。教訓: あらゆる金銭操作は冪等でなければならず、それを証明するテストが必要で、口約束ではいけません。"
      ),
      QA(
        "Idempotency key nên do client hay server sinh, và sống bao lâu?",
        "Should the idempotency key be client- or server-generated, and how long does it live?",
        "冪等キーはクライアントとサーバーどちらが生成し、どれだけ有効ですか？",
        "Client sinh key trước khi gửi, vì chỉ client biết một ý định thanh toán và tất cả các retry của nó thuộc cùng một ý định. Server lưu key kèm ràng buộc UNIQUE và kết quả của lần xử lý đầu. Thời gian sống nên đủ dài để bao trọn cửa sổ retry hợp lý — thường 24 giờ — rồi có thể dọn. Điểm mấu chốt là trong cửa sổ đó, cùng key luôn trả cùng kết quả, kể cả khi lần đầu thất bại thì các lần sau cũng nhận lại thất bại y hệt, không tạo trạng thái mới.",
        "The client generates the key before sending, because only the client knows one payment intent and that all its retries belong to the same intent. The server stores the key with a UNIQUE constraint and the first processing's result. The lifetime should be long enough to cover a reasonable retry window — usually 24 hours — then it can be cleaned up. The crux is that within that window the same key always returns the same result; even if the first attempt failed, later ones get the identical failure, creating no new state.",
        "クライアントが送信前にキーを生成します。1つの支払い意図と、そのすべての再試行が同じ意図に属することを知るのはクライアントだけだからです。サーバーはキーをUNIQUE制約と初回処理の結果とともに保存します。有効期間は妥当な再試行ウィンドウを覆うのに十分な長さ（通常24時間）とし、その後クリーンアップできます。要点は、そのウィンドウ内で同一キーが常に同じ結果を返すことです。初回が失敗しても後続は同一の失敗を受け取り、新しい状態を作りません。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ca thất bại sâu #3: coupon, tính tổng và làm tròn",
      en: "9. Deep failure case #3: coupons, totals and rounding",
      ja: "9. 深い失敗ケース#3: クーポン・合計・丸め",
    },
    blocks: [
      P(
        "Coupon là nơi lỗi tính tiền ẩn nấp. Ba loại lỗi phổ biến: lạm dụng lượt dùng khi coupon chỉ cho ba lần nhưng đồng thời nhiều khách áp được quá ba; áp coupon hết hạn do so sánh thời gian sai; và sai số làm tròn khi giảm theo phần trăm trên đơn nhiều dòng. Lỗi làm tròn đặc biệt nguy hiểm vì nó nhỏ, cộng dồn qua hàng triệu đơn thành khoản lệch lớn, và interviewer rất thích hỏi. Oracle cho coupon gồm: số lần dùng không vượt giới hạn ngay cả khi đồng thời, coupon hết hạn bị từ chối, và tổng sau giảm bằng đúng công thức số nguyên đã thống nhất trong đặc tả.",
        "Coupons are where money bugs hide. Three common defect types: redemption abuse when a coupon allows only three uses but concurrent customers apply it more than three times; applying an expired coupon due to wrong time comparison; and rounding drift when discounting by percentage on a multi-line order. Rounding is especially dangerous because it's small, compounds across millions of orders into a large discrepancy, and interviewers love to ask about it. The coupon oracle includes: redemption count never exceeds the limit even under concurrency, expired coupons are rejected, and the discounted total equals exactly the integer formula agreed in the spec.",
        "クーポンは金銭バグが潜む場所です。3つの一般的な欠陥タイプ: クーポンが3回のみ許可するのに同時顧客が3回超適用する引換濫用、時間比較の誤りによる期限切れクーポンの適用、複数行注文でパーセント割引する際の丸め誤差です。丸めは特に危険で、小さくても数百万注文で積み重なって大きなずれになり、面接官が好んで問います。クーポンのオラクルは、並行下でも引換数が上限を超えない、期限切れクーポンは拒否される、割引後合計が仕様で合意した整数式に正確に等しいこと、を含みます。"
      ),
      CODE(
        "ts",
        `test('coupon giới hạn 3 lượt — 10 khách đồng thời chỉ 3 áp được', async ({ request, seed }) => {
  // coupon maxRedemptions = 3 (đã seed); bắn 10 lần áp ĐỒNG THỜI
  const tries = Array.from({ length: 10 }, (_, i) =>
    request.post('/api/coupons/redeem', {
      data: { code: seed.coupon.code, orderId: \`ord-\${i}\` },
    })
  );
  const res = await Promise.all(tries);
  const codes = await Promise.all(res.map(r => r.status()));

  // ORACLE: đúng 3 lượt thành công, 7 bị từ chối (không vượt giới hạn)
  expect(codes.filter(s => s === 200).length).toBe(3);
  expect(codes.filter(s => s === 409).length).toBe(7);

  // ORACLE: bảng redemption có ĐÚNG 3 bản ghi, không hơn
  const used = await (await request.get(
    \`/api/test/coupons/\${seed.coupon.code}/redemptions\`)).json();
  expect(used.length).toBe(3);
});

test('làm tròn: 3 dòng, giảm 10% — tổng khớp công thức số nguyên', async ({ request }) => {
  const order = await (await request.post('/api/test/orders/calc', {
    data: { lines: [{ price: 33333, qty: 1 }, { price: 33333, qty: 1 }, { price: 33334, qty: 1 }], percent: 10 },
  })).json();
  // 99999.9 → theo đặc tả làm tròn xuống = 89999 (không phải 90000 do float)
  expect(order.total).toBe(89999);
});`
      ),
      P(
        "Ca làm tròn minh hoạ vì sao đặc tả phải nói rõ quy tắc làm tròn: làm tròn lên, xuống hay theo ngân hàng, và làm tròn ở mức dòng hay mức tổng. Nếu đặc tả mơ hồ, hai lập trình viên viết hai công thức khác nhau, cả hai đều 'trông đúng', và lệch nhau ở đồng cuối. Nhiệm vụ của tester là ép đặc tả phải rõ ràng, rồi mã hoá quy tắc đó thành oracle số nguyên tất định. Đây là ví dụ điển hình cho nguyên tắc: đừng kiểm 'khoảng đúng' mà kiểm 'đúng đến từng đồng theo quy tắc đã chốt'.",
        "The rounding case shows why the spec must state the rounding rule clearly: round up, down or banker's, and rounded at line level or total level. If the spec is vague, two developers write two different formulas, both 'look right', and diverge by the last cent. The tester's job is to force the spec to be precise, then encode that rule as a deterministic integer oracle. This is a classic example of the principle: don't check 'roughly right', check 'exact to the cent per the agreed rule'.",
        "丸めケースは、仕様が丸め規則を明確に述べるべき理由を示します。切り上げ・切り捨て・銀行丸めのいずれか、そして行レベルか合計レベルかです。仕様が曖昧だと、2人の開発者が2つの異なる式を書き、両方とも「正しく見え」、最後の1円でずれます。テスターの仕事は仕様を精密にさせ、その規則を決定的な整数オラクルとして符号化することです。これは原則の典型例です。「おおよそ正しい」ではなく「合意規則どおり1円まで正確」を検証します。"
      ),
      NOTE(
        "Coupon giới hạn lượt là bài toán đồng thời trá hình: nó cần cùng cơ chế khoá như tồn kho. Kiểm nó với Promise.all giống ca oversell.",
        "A redemption-limited coupon is a concurrency problem in disguise: it needs the same locking as inventory. Test it with Promise.all just like the oversell case.",
        "引換上限付きクーポンは、姿を変えた並行性問題です。在庫と同じロックが必要で、過剰販売ケースと同様にPromise.allで検証します。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Ca thất bại sâu #4: timeout, webhook và reconciliation",
      en: "10. Deep failure case #4: timeout, webhook and reconciliation",
      ja: "10. 深い失敗ケース#4: タイムアウト・Webhook・照合",
    },
    blocks: [
      P(
        "Thanh toán qua cổng bên thứ ba là hệ phân tán bất định: cổng có thể xử lý xong tiền nhưng response về client bị timeout, để lại đơn ở trạng thái mập mờ. Nếu hệ thống vội huỷ đơn khi timeout, khách đã bị trừ tiền mà mất hàng; nếu vội xác nhận, có thể xác nhận đơn chưa trả tiền. Giải pháp đúng là bất đồng bộ: khi timeout, đơn ở trạng thái PENDING, sau đó cổng gửi webhook báo kết quả thật, và một tiến trình reconciliation đối soát định kỳ để đưa mọi đơn về trạng thái đúng. Test phải mô phỏng cả timeout lẫn webhook đến muộn, rồi kiểm đơn hội tụ về đúng trạng thái.",
        "Third-party payment is a non-deterministic distributed system: the gateway may finish charging but the response to the client times out, leaving the order ambiguous. If the system hastily cancels on timeout, the customer is charged but loses the goods; if it hastily confirms, it may confirm an unpaid order. The correct solution is asynchronous: on timeout the order stays PENDING, then the gateway sends a webhook with the real result, and a reconciliation process periodically reconciles to bring every order to its correct state. The test must simulate both timeout and a late-arriving webhook, then verify the order converges to the right state.",
        "サードパーティ決済は非決定的な分散システムです。ゲートウェイは課金を終えてもクライアントへの応答がタイムアウトし、注文が曖昧なまま残り得ます。システムがタイムアウトで急いでキャンセルすると顧客は課金されて商品を失い、急いで確定すると未払い注文を確定し得ます。正しい解決策は非同期です。タイムアウト時に注文はPENDINGのままとなり、ゲートウェイが実結果のWebhookを送り、照合プロセスが定期的に照合してすべての注文を正しい状態にします。テストはタイムアウトと遅延到着するWebhookの両方を模擬し、注文が正しい状態に収束することを検証する必要があります。"
      ),
      CODE(
        "ts",
        `test('pay timeout rồi webhook về sau — đơn hội tụ đúng, không mất/thừa tiền', async ({ page, request }) => {
  // mock cổng: request thanh toán bị TIMEOUT (không trả response)
  await page.route('**/gateway/charge', route => route.abort('timedout'));

  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Thanh toán' }).click();

  // ORACLE trung gian: đơn KHÔNG bị huỷ vội, ở trạng thái chờ đối soát
  const orderId = await page.getByTestId('order-id').textContent();
  let order = await (await request.get(\`/api/test/orders/\${orderId}\`)).json();
  expect(order.status).toBe('PENDING_PAYMENT');

  // mô phỏng cổng gửi webhook báo đã thu tiền thành công (đến muộn)
  await request.post('/api/webhooks/payment', {
    data: { orderId, event: 'charge.succeeded', amount: 179100 },
    headers: { 'x-signature': signWebhook({ orderId }) },  // xác thực chữ ký
  });

  // ORACLE cuối: reconciliation đưa đơn về PAID, đúng 1 charge, số tiền khớp
  order = await (await request.get(\`/api/test/orders/\${orderId}\`)).json();
  expect(order.status).toBe('PAID');
  const charges = await (await request.get(\`/api/test/orders/\${orderId}/charges\`)).json();
  expect(charges.length).toBe(1);
  expect(charges[0].amount).toBe(179100);
});`
      ),
      P(
        "Ca này cũng phải kiểm chiều ngược: timeout nhưng webhook báo thất bại, khi đó đơn phải về CANCELLED và không có charge nào tồn tại. Và ca refund: nếu đã thu tiền nhưng hàng hết trước khi giao, hệ thống phải hoàn tiền và đưa đơn về REFUNDED, với bất biến bảo toàn tiền là tổng thu trừ tổng hoàn bằng đúng giá trị hàng thực giao. Điểm chung của mọi ca timeout là không được đưa ra quyết định vội vàng dựa trên một response duy nhất; phải chờ nguồn sự thật cuối cùng là webhook đã xác thực chữ ký và tiến trình đối soát.",
        "This case must also test the reverse: timeout but the webhook reports failure, in which case the order must go to CANCELLED and no charge exists. And the refund case: if money was captured but stock ran out before delivery, the system must refund and move the order to REFUNDED, with the money-conservation invariant that total captured minus total refunded equals exactly the value of goods actually delivered. The common thread of all timeout cases is: make no hasty decision based on a single response; wait for the final source of truth — a signature-verified webhook and the reconciliation process.",
        "このケースは逆方向も検証する必要があります。タイムアウトだがWebhookが失敗を報告する場合、注文はCANCELLEDになり課金は存在しません。そして返金ケース: 課金済みだが配送前に在庫切れした場合、システムは返金し注文をREFUNDEDにします。金銭保存の不変条件は、総課金額から総返金額を引いた値が実際に配送した商品の価値に正確に等しいことです。すべてのタイムアウトケースの共通点は、単一の応答に基づいて急いで判断しないことです。最終的な真実の源（署名検証済みWebhookと照合プロセス）を待ちます。"
      ),
      WARN(
        "Webhook phải xác thực chữ ký trước khi tin. Test cũng nên có ca webhook giả mạo chữ ký sai bị từ chối — nếu không, kẻ tấn công có thể tự đánh dấu đơn là đã trả.",
        "Webhooks must verify signatures before being trusted. The test should include a forged-signature webhook being rejected — otherwise an attacker could mark orders as paid.",
        "Webhookは信頼する前に署名を検証する必要があります。テストには署名を偽造したWebhookが拒否されるケースも含めるべきです。さもないと攻撃者が注文を支払い済みと偽装できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Máy trạng thái đơn hàng như một oracle",
      en: "11. The order state machine as an oracle",
      ja: "11. オラクルとしての注文ステートマシン",
    },
    blocks: [
      P(
        "Đơn hàng đi qua nhiều trạng thái, và tập các chuyển hợp lệ chính là một oracle mạnh. Chuyển hợp lệ ví dụ: CREATED sang RESERVED sang PAID sang FULFILLED, hoặc nhánh CANCELLED và REFUNDED ở đúng điểm cho phép. Chuyển bất hợp lệ như nhảy thẳng từ CREATED sang PAID mà bỏ qua RESERVED, hay từ FULFILLED quay về PENDING, phải bị hệ thống từ chối. Kiểm state machine nghĩa là với mỗi cặp trạng thái, ta khẳng định chuyển được phép hay không, và không có đường tắt nào lọt qua. Đây là dạng oracle theo bảng quyết định rất phù hợp kiểm thử dữ liệu hoá.",
        "An order moves through many states, and the set of valid transitions is itself a strong oracle. Valid transitions for example: CREATED to RESERVED to PAID to FULFILLED, or the CANCELLED and REFUNDED branches at the allowed points. Invalid transitions like jumping straight from CREATED to PAID skipping RESERVED, or from FULFILLED back to PENDING, must be rejected by the system. Testing the state machine means for each state pair we assert whether the transition is allowed, and that no shortcut slips through. This is a decision-table-style oracle well suited to data-driven testing.",
        "注文は多くの状態を通り、有効な遷移の集合それ自体が強力なオラクルです。有効な遷移の例: CREATED→RESERVED→PAID→FULFILLED、または許可された地点でのCANCELLEDとREFUNDEDの分岐です。CREATEDからRESERVEDを飛ばしてPAIDへ直接跳ぶ、FULFILLEDからPENDINGへ戻るなどの無効な遷移は、システムが拒否する必要があります。ステートマシンの検証とは、各状態ペアについて遷移が許可されるかをアサートし、抜け道が通らないことを確認することです。これはデータ駆動テストに適したデシジョンテーブル型オラクルです。"
      ),
      imgA2,
      CODE(
        "ts",
        `// data-driven: mỗi hàng là một chuyển trạng thái + kỳ vọng allow/deny
const transitions = [
  { from: 'CREATED',   to: 'RESERVED',  allowed: true },
  { from: 'RESERVED',  to: 'PAID',      allowed: true },
  { from: 'PAID',      to: 'FULFILLED', allowed: true },
  { from: 'PAID',      to: 'REFUNDED',  allowed: true },
  { from: 'CREATED',   to: 'PAID',      allowed: false },  // nhảy cóc → cấm
  { from: 'FULFILLED', to: 'PENDING',   allowed: false },  // lùi trạng thái → cấm
  { from: 'CANCELLED', to: 'PAID',      allowed: false },  // đơn đã huỷ → cấm trả
];

for (const t of transitions) {
  test(\`chuyển \${t.from} → \${t.to} phải \${t.allowed ? 'CHO PHÉP' : 'TỪ CHỐI'}\`, async ({ request }) => {
    const order = await (await request.post('/api/test/orders', { data: { status: t.from } })).json();
    const res = await request.post(\`/api/orders/\${order.id}/transition\`, { data: { to: t.to } });
    // ORACLE bảng quyết định: allow → 200, deny → 409
    expect(res.status()).toBe(t.allowed ? 200 : 409);
  });
}`
      ),
      TIP(
        "Bảng chuyển trạng thái nên đến từ đặc tả nghiệp vụ, không phải từ code. Nếu bạn suy bảng từ code, bạn chỉ kiểm code khớp chính nó, không kiểm nó khớp yêu cầu.",
        "The transition table should come from the business spec, not from the code. If you derive the table from the code, you only check code matches itself, not that it matches requirements.",
        "遷移表はコードではなく業務仕様から得るべきです。コードから表を導くと、コードが自己一致することしか検証せず、要件との一致は検証しません。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. CI/CD: phân tầng chạy test theo rủi ro và tải",
      en: "12. CI/CD: tiering test runs by risk and load",
      ja: "12. CI/CD: リスクと負荷でテスト実行を階層化",
    },
    blocks: [
      P(
        "Không thể chạy mọi thứ trên mọi commit vì các ca đồng thời và tải nặng tốn thời gian và tài nguyên. Chiến lược phân tầng: trên mỗi pull request chạy các ca P0 — oversell, idempotency, tính tổng — vì đây là rủi ro tài chính chặn merge. Hằng đêm chạy toàn bộ ma trận gồm cả ca coupon, timeout, state machine và một vòng kiểm tải nhẹ. Trước mỗi đợt flash sale thật, chạy một bài kiểm tải chuyên biệt mô phỏng đỉnh truy cập trên môi trường giống production. Playwright lo phần đúng đắn chức năng và đồng thời ở mức vừa, còn công cụ tải chuyên dụng lo phần đỉnh cực đại.",
        "You can't run everything on every commit because concurrency and heavy-load cases cost time and resources. The tiering strategy: on each pull request run the P0 cases — oversell, idempotency, totals — because these are merge-blocking financial risks. Nightly, run the full matrix including coupon, timeout, state-machine cases and a light load pass. Before each real flash sale, run a dedicated load test simulating peak traffic on a production-like environment. Playwright handles functional correctness and moderate concurrency, while a dedicated load tool handles the extreme peak.",
        "並行性や高負荷のケースは時間とリソースを消費するため、すべてのコミットで全部を実行することはできません。階層化戦略: 各プルリクエストではP0ケース（過剰販売・冪等性・合計）を実行します。これらはマージをブロックする金銭リスクだからです。毎晩、クーポン・タイムアウト・ステートマシンのケースと軽い負荷パスを含む全マトリックスを実行します。実際のフラッシュセール前には、本番類似環境でピークトラフィックを模擬する専用負荷テストを実行します。Playwrightは機能的正しさと中程度の並行性を担い、専用負荷ツールが極端なピークを担います。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/checkout-tests.yml — phân tầng theo rủi ro
name: checkout-tests
on: [pull_request, schedule]
jobs:
  p0-blocking:                        # chạy trên MỌI pull request → chặn merge
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps chromium
      # chỉ ca rủi ro tài chính cao nhất, có tag @p0
      - run: npx playwright test --grep @p0
        env: { CI: 'true' }

  nightly-full:                       # lịch đêm → toàn ma trận + tải nhẹ
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    strategy: { matrix: { shard: [1, 2, 3, 4] } }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: trace-\${{ matrix.shard }}, path: test-results/ }`
      ),
      P(
        "Điểm cần lưu ý trong CI cho domain này là quản lý dữ liệu và cách ly. Mỗi lần chạy phải bắt đầu từ trạng thái sạch, dùng test-only API để seed tồn kho và coupon, và dọn sau khi xong để lần chạy sau tất định. Các ca đồng thời nên chạy trên một cơ sở dữ liệu chuyên cho test, không dùng chung với các job khác, để tránh nhiễu. Trace được giữ lại khi thất bại giúp điều tra oversell hay lệch tiền — thứ theo định nghĩa khó tái hiện — bằng cách xem lại chính xác chuỗi request và trạng thái backend tại thời điểm đỏ.",
        "A key CI consideration for this domain is data management and isolation. Each run must start from a clean state, use the test-only API to seed stock and coupons, and clean up afterward so the next run is deterministic. Concurrency cases should run on a dedicated test database, not shared with other jobs, to avoid noise. Traces retained on failure help investigate oversell or money drift — which by definition are hard to reproduce — by replaying the exact request sequence and backend state at the moment it went red.",
        "この領域のCIで重要な考慮点はデータ管理と分離です。各実行はクリーンな状態から始まり、テスト専用APIで在庫とクーポンをシードし、後で片付けて次の実行を決定的にする必要があります。並行性ケースは、ノイズを避けるため他ジョブと共有しない専用テストDBで実行すべきです。失敗時に保持されたトレースは、赤になった瞬間の正確なリクエスト列とバックエンド状態を再生することで、定義上再現が難しい過剰販売や金額のずれの調査を助けます。"
      ),
      NOTE(
        "Kiểm tải cực đại (k6/JMeter) và kiểm đúng đắn (Playwright) là hai việc khác nhau, bổ sung cho nhau. Đừng dùng Playwright để mô phỏng hai trăm nghìn request/giây.",
        "Extreme load testing (k6/JMeter) and correctness testing (Playwright) are two different, complementary jobs. Don't use Playwright to simulate two hundred thousand requests per second.",
        "極限の負荷テスト（k6/JMeter）と正しさのテスト（Playwright）は、異なるが補完的な2つの仕事です。20万リクエスト/秒の模擬にPlaywrightを使わないでください。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Ranh giới cho AI-agent trong bộ test checkout",
      en: "13. The AI-agent boundary in the checkout suite",
      ja: "13. チェックアウトスイートにおけるAIエージェントの境界",
    },
    blocks: [
      P(
        "Playwright Agents có thể tăng tốc mạnh nhưng phải đặt ranh giới rõ. Planner giỏi khám phá ứng dụng và phác một kế hoạch test dạng Markdown, hữu ích để không bỏ sót luồng. Generator biến kế hoạch thành spec chạy được và tự xác minh locator trên ứng dụng thật, tiết kiệm thời gian viết khung. Healer chạy trong chế độ debug, soi console, network và snapshot để sửa test hỏng hoặc đánh dấu bỏ qua. Nhưng với domain tiền bạc, con người phải sở hữu phần oracle: chính bạn quyết định 'kết quả đúng là gì' cho oversell, idempotency và bảo toàn tiền. Agent hỗ trợ phần cơ học, không được tự định nghĩa bất biến tài chính.",
        "Playwright Agents can accelerate strongly but need a clear boundary. The Planner is good at exploring the app and drafting a Markdown test plan, useful for not missing flows. The Generator turns the plan into runnable specs and self-verifies locators against the live app, saving scaffolding time. The Healer runs in debug mode, inspecting console, network and snapshots to fix broken tests or mark them skipped. But for a money domain, humans must own the oracle: you decide 'what is the correct result' for oversell, idempotency and money conservation. The agent assists the mechanical parts; it must not define financial invariants itself.",
        "Playwright Agentsは強力に加速できますが、明確な境界が必要です。Plannerはアプリを探索しMarkdownのテスト計画を起草するのが得意で、フローの漏れ防止に役立ちます。Generatorは計画を実行可能なスペックに変え、実アプリでロケーターを自己検証し、足場作りの時間を節約します。HealerはデバッグモードでコンソールやネットワークやスナップショットをGeneratorし、壊れたテストを修正またはスキップ指定します。しかし金銭領域では、人間がオラクルを所有せねばなりません。過剰販売・冪等性・金銭保存の「正しい結果とは何か」はあなたが決めます。エージェントは機械的部分を支援し、金融不変条件を自ら定義してはいけません。"
      ),
      CODE(
        "bash",
        `# Playwright Agents: scaffold planner/generator/healer + seed.spec.ts
npx playwright init-agents

# Planner khám phá app, sinh kế hoạch test dạng Markdown (người DUYỆT)
# Generator biến kế hoạch → spec, tự kiểm locator trên app thật
# Healer chạy debug, soi console/network/snapshot, sửa hoặc @skip test hỏng

# Ranh giới: agent viết KHUNG, con người viết & duyệt ORACLE tài chính`
      ),
      QA(
        "Bạn để AI-agent tự sinh và tự sửa test cho luồng thanh toán tới mức nào?",
        "How far do you let an AI agent auto-generate and self-heal payment-flow tests?",
        "決済フローのテストをAIエージェントにどこまで自動生成・自己修復させますか？",
        "Tôi để agent làm phần cơ học: khám phá luồng, sinh khung spec, đề xuất locator ổn định, và gợi ý sửa khi UI đổi. Nhưng ba thứ tôi giữ cho con người: định nghĩa oracle tài chính (oversell, idempotency, bảo toàn tiền), phê duyệt mọi thay đổi ở test tiền bạc, và quyết định đánh dấu bỏ qua. Lý do là hallucination: một agent có thể 'sửa' test bằng cách nới lỏng assertion cho nó xanh, vô tình che một bug thật. Ở domain tiền, một test xanh dối tệ hơn không có test.",
        "I let the agent do the mechanical part: explore flows, generate spec scaffolds, propose stable locators, and suggest fixes when the UI changes. But three things I keep for humans: defining financial oracles (oversell, idempotency, money conservation), approving any change to money tests, and deciding to mark a test skipped. The reason is hallucination: an agent might 'fix' a test by loosening an assertion to make it green, inadvertently hiding a real bug. In a money domain, a falsely green test is worse than no test.",
        "エージェントには機械的部分を任せます。フロー探索、スペック足場の生成、安定ロケーターの提案、UI変更時の修正提案です。しかし3つは人間に残します。金融オラクル（過剰販売・冪等性・金銭保存）の定義、金銭テストへの変更の承認、スキップ指定の判断です。理由はハルシネーションです。エージェントはアサーションを緩めて緑にすることでテストを「修正」し、実バグを隠し得ます。金銭領域では、偽の緑テストはテストがないより悪いのです。"
      ),
      WARN(
        "Không bao giờ để agent tự nới lỏng assertion trên test tiền bạc để 'làm cho nó xanh'. Mọi thay đổi ở oracle tài chính phải qua review con người.",
        "Never let an agent loosen an assertion on a money test to 'make it green'. Any change to a financial oracle must go through human review.",
        "金銭テストのアサーションを「緑にするため」にエージェントが緩めることを決して許さないでください。金融オラクルへの変更はすべて人間のレビューを通す必要があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết và góc phỏng vấn",
      en: "14. Summary and the interview angle",
      ja: "14. まとめと面接の観点",
    },
    blocks: [
      P(
        "Kiểm thử checkout flash sale là bài toán đúng đắn dưới đồng thời cao, không phải luồng click. Chìa khoá là oracle-first: định nghĩa bốn bất biến — không oversell, tổng tiền đúng, state machine hợp lệ, thanh toán idempotent — rồi kiểm chúng trên dữ liệu backend chứ không trên màn hình. Playwright kết hợp lái UI và request context cho phép vừa mô phỏng người dùng vừa xác minh sự thật ở dữ liệu. Các ca đồng thời bằng Promise.all phơi bày race condition mà test tuần tự không thấy. Cuối cùng, CI phân tầng theo rủi ro, và AI-agent hỗ trợ phần cơ học trong khi con người sở hữu oracle tài chính.",
        "Testing flash-sale checkout is a correctness-under-high-concurrency problem, not a click flow. The key is oracle-first: define four invariants — no oversell, correct totals, valid state machine, idempotent payment — then verify them against backend data, not the screen. Playwright combining UI driving and the request context lets you both simulate users and verify truth in the data. Concurrency cases via Promise.all surface race conditions sequential tests miss. Finally, CI tiers by risk, and AI agents assist the mechanical parts while humans own the financial oracles.",
        "フラッシュセールのチェックアウトのテストは、クリックフローではなく高並行下での正しさの問題です。鍵はオラクル優先です。4つの不変条件（過剰販売なし・正しい合計・有効なステートマシン・冪等な決済）を定義し、画面ではなくバックエンドデータで検証します。UI操作とリクエストコンテキストを組み合わせるPlaywrightは、ユーザー模擬とデータの真実の検証を両立させます。Promise.allによる並行ケースは、逐次テストが見逃す競合状態を露出させます。最後に、CIはリスクで階層化し、AIエージェントは機械的部分を支援しつつ人間が金融オラクルを所有します。"
      ),
      H("Câu hỏi phỏng vấn thường gặp", "Common interview questions", "よくある面接質問"),
      QA(
        "Làm sao bạn kiểm được hệ thống không bán quá số lượng trong flash sale?",
        "How do you test that a system doesn't oversell during a flash sale?",
        "フラッシュセール中にシステムが過剰販売しないことをどう検証しますか？",
        "Tôi đặt tồn kho về một con số chính xác qua test-only API, rồi bắn nhiều yêu cầu checkout đồng thời bằng Promise.all — nhiều hơn số suất. Oracle là số học: số đơn thành công phải bằng đúng tồn ban đầu, số còn lại nhận hết hàng, và tồn cuối cùng bằng không, không âm. Test tuần tự không bắt được vì oversell chỉ xuất hiện khi có đua tranh thật. Tôi cũng kiểm ràng buộc CHECK ở database như hàng phòng thủ cuối. Đây là ca P0 chạy trên mọi commit.",
        "I set stock to an exact number via a test-only API, then fire many checkout requests concurrently with Promise.all — more than the units. The oracle is arithmetic: successful orders must equal exactly the initial stock, the rest get sold-out, and final stock is zero, not negative. A sequential test won't catch it because oversell only appears under real contention. I also verify the database CHECK constraint as the last line of defense. This is a P0 case run on every commit.",
        "テスト専用APIで在庫を正確な数に設定し、Promise.allで在庫数より多いチェックアウトリクエストを並行に撃ちます。オラクルは算術的です。成功注文数は初期在庫に正確に等しく、残りは売切となり、最終在庫はゼロで負ではありません。過剰販売は実際の競合下でのみ現れるため、逐次テストでは捕らえられません。最後の防衛線としてデータベースのCHECK制約も検証します。これは毎コミット実行するP0ケースです。"
      ),
      QA(
        "Giải thích idempotency trong thanh toán và cách bạn kiểm nó.",
        "Explain idempotency in payments and how you test it.",
        "決済における冪等性と、その検証方法を説明してください。",
        "Idempotency nghĩa là gửi cùng một yêu cầu nhiều lần chỉ tạo đúng một hiệu ứng. Trong thanh toán, client sinh idempotency key cho một ý định trả tiền, gửi kèm mọi retry; server dùng ràng buộc UNIQUE để chỉ tạo một charge, retry sau trả lại kết quả cũ. Tôi kiểm bằng cách gửi cùng yêu cầu ba lần với cùng key, rồi assert số bản ghi charge bằng một và cả ba trả về cùng charge id. Đây là bất biến bảo toàn tiền, thứ tuyệt đối không được sai ở domain tài chính.",
        "Idempotency means sending the same request multiple times produces exactly one effect. In payments, the client generates an idempotency key for a payment intent, sending it with every retry; the server uses a UNIQUE constraint to create only one charge, later retries returning the old result. I test it by sending the same request three times with the same key, then asserting the charge-record count is one and all three return the same charge id. This is a money-conservation invariant that must never be wrong in a financial domain.",
        "冪等性とは、同じリクエストを複数回送っても正確に1つの効果しか生まないことです。決済では、クライアントが支払い意図に冪等キーを生成し、すべての再試行に添付します。サーバーはUNIQUE制約で1つの課金のみを作成し、後の再試行は古い結果を返します。同一キーで同じリクエストを3回送り、課金レコード数が1で3つとも同じ課金IDを返すことをアサートして検証します。これは金融領域で決して誤ってはならない金銭保存の不変条件です。"
      ),
      NOTE(
        "Thông điệp mang vào phỏng vấn: ở domain tiền bạc, đừng kiểm 'màn hình xanh' mà kiểm bất biến trên dữ liệu, và luôn có ca đồng thời cho oversell và idempotency.",
        "Message to bring to interviews: in a money domain, don't check 'green screen' but invariants on data, and always have concurrency cases for oversell and idempotency.",
        "面接に持ち込むメッセージ: 金銭領域では「緑の画面」ではなくデータ上の不変条件を検証し、過剰販売と冪等性のための並行ケースを常に用意します。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Fintech: nạp tiền, hạn mức KYC & chống gian lận
// ===========================================================================

const imgB1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">LUỒNG NẠP TIỀN · KYC · FRAUD</text>
<g font-size="12">
  <rect x="24" y="58" width="150" height="50" rx="8" fill="#155e63" stroke="#22d3ee"/><text x="40" y="80" fill="#cffafe" font-weight="700">Top-up request</text><text x="40" y="97" fill="#67e8f9">idempotency key</text>
  <rect x="245" y="58" width="150" height="50" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="261" y="80" fill="#e0f2fe" font-weight="700">KYC gate</text><text x="261" y="97" fill="#93c5fd">tier → hạn mức</text>
  <rect x="466" y="58" width="150" height="50" rx="8" fill="#7f1d1d" stroke="#f87171"/><text x="482" y="80" fill="#fee2e2" font-weight="700">Fraud engine</text><text x="482" y="97" fill="#fca5a5">velocity/geo/device</text>
  <rect x="245" y="150" width="150" height="50" rx="8" fill="#134e4a" stroke="#34d399"/><text x="261" y="172" fill="#d1fae5" font-weight="700">Ledger</text><text x="261" y="189" fill="#6ee7b7">double-entry</text>
  <rect x="466" y="150" width="150" height="50" rx="8" fill="#422006" stroke="#f59e0b"/><text x="482" y="172" fill="#fef3c7" font-weight="700">Partner recon</text><text x="482" y="189" fill="#fcd34d">đối soát cuối ngày</text>
  <path d="M174 83 h71 M395 83 h71 M320 108 v42 M466 175 h-71" stroke="#64748b" stroke-width="2" marker-end="url(#arrB1)"/>
</g>
<defs><marker id="arrB1" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>
<rect x="24" y="222" width="592" height="52" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="40" y="244" fill="#f8fafc" font-weight="700">Oracle: bảo toàn số dư · hạn mức KYC · idempotent top-up · luật fraud · khớp đối soát</text>
<text x="40" y="264" fill="#94a3b8" font-size="11">Playwright + request context: seed KYC tier, bơm sự kiện fraud, kiểm ledger cân bằng.</text>`),
  "Luồng nạp tiền qua KYC, fraud engine, ledger và đối soát với đối tác.",
  "Top-up flow through KYC, the fraud engine, the ledger and partner reconciliation.",
  "KYC・不正検知エンジン・元帳・パートナー照合を通る入金フローです。"
);

const imgB2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">HẠN MỨC THEO TẦNG KYC · KYC-TIER LIMITS</text>
<g font-size="12">
  <rect x="24" y="60" width="180" height="30" rx="6" fill="#1e293b"/><text x="34" y="80" fill="#cbd5e1" font-weight="700">Tầng</text>
  <rect x="212" y="60" width="200" height="30" rx="6" fill="#1e293b"/><text x="222" y="80" fill="#cbd5e1" font-weight="700">Hạn mức/ngày</text>
  <rect x="420" y="60" width="196" height="30" rx="6" fill="#1e293b"/><text x="430" y="80" fill="#cbd5e1" font-weight="700">Điều kiện</text>
  <rect x="24" y="96" width="180" height="30" rx="6" fill="#7f1d1d"/><text x="34" y="116" fill="#fee2e2">Tier 0 · chưa KYC</text><rect x="212" y="96" width="200" height="30" rx="6" fill="#0f172a"/><text x="222" y="116" fill="#e2e8f0">2.000.000₫</text><rect x="420" y="96" width="196" height="30" rx="6" fill="#0f172a"/><text x="430" y="116" fill="#94a3b8">chỉ email</text>
  <rect x="24" y="130" width="180" height="30" rx="6" fill="#422006"/><text x="34" y="150" fill="#fef3c7">Tier 1 · CMND/CCCD</text><rect x="212" y="130" width="200" height="30" rx="6" fill="#0f172a"/><text x="222" y="150" fill="#e2e8f0">20.000.000₫</text><rect x="420" y="130" width="196" height="30" rx="6" fill="#0f172a"/><text x="430" y="150" fill="#94a3b8">giấy tờ + selfie</text>
  <rect x="24" y="164" width="180" height="30" rx="6" fill="#134e4a"/><text x="34" y="184" fill="#d1fae5">Tier 2 · địa chỉ + nguồn tiền</text><rect x="212" y="164" width="200" height="30" rx="6" fill="#0f172a"/><text x="222" y="184" fill="#e2e8f0">200.000.000₫</text><rect x="420" y="164" width="196" height="30" rx="6" fill="#0f172a"/><text x="430" y="184" fill="#94a3b8">xác minh nâng cao</text>
</g>
<text x="24" y="230" fill="#94a3b8" font-size="12">Vượt hạn mức phải bị TỪ CHỐI ở backend, không chỉ ẩn nút trên UI.</text>
<text x="24" y="252" fill="#94a3b8" font-size="12">Oracle: SUM(top-up trong 24h) ≤ hạn mức của tier hiện tại.</text>`),
  "Bảng hạn mức theo tầng KYC làm oracle cho kiểm thử.",
  "KYC-tier limit table used as the testing oracle.",
  "テストのオラクルとして使うKYCティア別限度額表です。"
);

const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh nghiệp vụ: ví điện tử là hệ thống tiền thật",
      en: "1. Business context: an e-wallet is a real-money system",
      ja: "1. 業務背景: 電子ウォレットは実マネーシステム",
    },
    blocks: [
      P(
        "Một ví điện tử hay ứng dụng fintech xử lý tiền thật, nên sai sót không chỉ gây khó chịu mà tạo thiệt hại tài chính và rủi ro pháp lý. Ở quy mô năm triệu người dùng, mỗi ngày có hàng trăm nghìn lệnh nạp tiền, và mỗi lệnh phải tuân thủ quy định chống rửa tiền, hạn mức theo mức độ định danh khách hàng, và các luật chống gian lận. Ba trục kiểm thử cốt lõi là: nạp tiền phải bảo toàn số dư và idempotent, hạn mức theo tầng KYC phải được thực thi ở backend, và các luật fraud dựa trên tốc độ giao dịch, vị trí địa lý và thiết bị phải chặn được hành vi bất thường mà không cản khách thật.",
        "An e-wallet or fintech app handles real money, so mistakes cause not just annoyance but financial loss and legal risk. At five million users, hundreds of thousands of top-up commands occur daily, and each must comply with anti-money-laundering rules, limits tied to the customer's identity-verification level, and anti-fraud laws. The three core testing axes are: top-ups must conserve balance and be idempotent, KYC-tier limits must be enforced at the backend, and fraud rules based on transaction velocity, geolocation and device must block abnormal behavior without blocking real customers.",
        "電子ウォレットやフィンテックアプリは実マネーを扱うため、ミスは煩わしさだけでなく金銭的損失と法的リスクを生みます。500万ユーザー規模では毎日数十万件の入金コマンドが発生し、各コマンドはマネーロンダリング防止規定、顧客の本人確認レベルに紐づく限度額、不正防止法に準拠せねばなりません。3つの中核テスト軸は、入金は残高を保存し冪等であること、KYCティア別限度額をバックエンドで強制すること、取引速度・地理位置・デバイスに基づく不正ルールが実顧客を妨げずに異常行動を遮断することです。"
      ),
      P(
        "Bài viết này áp dụng nguyên tắc oracle-first cho fintech: thay vì khẳng định 'nạp thành công', ta khẳng định các bất biến tài chính. Chúng ta sẽ định nghĩa mô hình ledger kiểu ghi kép làm oracle bảo toàn tiền, dựng bảng hạn mức theo tầng KYC, viết test plan và ma trận ca, rồi đi sâu vào các ca thất bại: idempotency khi retry nạp tiền, vượt hạn mức, các luật fraud, và đối soát với đối tác thanh toán. Playwright kết hợp request context cho phép seed tầng KYC, bơm chuỗi sự kiện fraud và kiểm sổ cái cân bằng, tất cả một cách tất định.",
        "This article applies the oracle-first principle to fintech: instead of asserting 'top-up succeeded', we assert financial invariants. We define a double-entry ledger model as the money-conservation oracle, lay out the KYC-tier limit table, write the test plan and case matrix, then go deep into failure cases: idempotency on top-up retries, exceeding limits, fraud rules, and reconciliation with the payment partner. Playwright combined with the request context lets us seed KYC tiers, inject fraud event sequences and verify the ledger balances, all deterministically.",
        "本記事はオラクル優先原則をフィンテックに適用します。「入金成功」をアサートする代わりに、金融不変条件をアサートします。金銭保存のオラクルとして複式簿記の元帳モデルを定義し、KYCティア別限度額表を示し、テスト計画とケースマトリックスを書き、失敗ケース（入金再試行の冪等性、限度額超過、不正ルール、決済パートナーとの照合）を深掘りします。リクエストコンテキストと組み合わせたPlaywrightは、KYCティアのシード、不正イベント列の注入、元帳の均衡検証を、すべて決定的に行えます。"
      ),
      NOTE(
        "Quy mô giả định: 5 triệu người dùng, hàng trăm nghìn lệnh nạp/ngày, tuân thủ AML/KYC theo quy định ngân hàng nhà nước, đối soát T+1 với đối tác thanh toán.",
        "Assumed scale: 5M users, hundreds of thousands of top-ups/day, AML/KYC compliance per central-bank regulation, T+1 reconciliation with the payment partner.",
        "想定規模: 500万ユーザー、1日数十万件の入金、中央銀行規制に基づくAML/KYC準拠、決済パートナーとのT+1照合。"
      ),
      imgB1,
    ],
  },
  {
    heading: {
      vi: "2. Ledger ghi kép: bất biến bảo toàn tiền làm oracle",
      en: "2. Double-entry ledger: money conservation as the oracle",
      ja: "2. 複式元帳: オラクルとしての金銭保存",
    },
    blocks: [
      P(
        "Trái tim của mọi hệ thống tiền tệ đáng tin là sổ cái ghi kép. Mỗi giao dịch tạo ít nhất hai bút toán cân bằng nhau: một bên ghi nợ, một bên ghi có, và tổng của mọi bút toán trong hệ thống luôn bằng không. Đây là bất biến bảo toàn tiền mạnh nhất và là oracle vàng cho kiểm thử fintech. Khi khách nạp một triệu đồng, tài khoản ví khách tăng một triệu và tài khoản quỹ đối tác giảm một triệu tương ứng; tiền không tự sinh ra hay biến mất. Test không kiểm 'số dư hiển thị đúng' mà kiểm 'tổng ghi nợ bằng tổng ghi có' và 'không có bút toán mồ côi'.",
        "The heart of any trustworthy money system is a double-entry ledger. Each transaction creates at least two balancing entries: one debit, one credit, and the sum of all entries in the system is always zero. This is the strongest money-conservation invariant and the gold oracle for fintech testing. When a customer tops up one million, the customer's wallet account increases by one million and the partner-fund account decreases by one million correspondingly; money is neither created nor destroyed. The test doesn't check 'the balance displays correctly' but 'total debits equal total credits' and 'no orphan entries'.",
        "信頼できるマネーシステムの核心は複式簿記の元帳です。各取引は少なくとも2つの均衡する仕訳を作ります。一方が借方、一方が貸方で、システム内の全仕訳の合計は常にゼロです。これは最強の金銭保存不変条件で、フィンテックテストの黄金のオラクルです。顧客が100万円を入金すると、顧客のウォレット勘定が100万円増え、パートナー資金勘定が対応して100万円減ります。お金は生まれも消えもしません。テストは「残高が正しく表示される」ではなく「借方合計＝貸方合計」と「孤立仕訳がない」を検証します。"
      ),
      CODE(
        "sql",
        `-- Sổ cái ghi kép: mỗi giao dịch phải cân bằng, không đâu tiền tự sinh
CREATE TABLE ledger_entry (
  id             UUID PRIMARY KEY,
  txn_id         UUID NOT NULL,            -- gom các bút toán của cùng 1 giao dịch
  account_id     BIGINT NOT NULL,
  direction      TEXT NOT NULL CHECK (direction IN ('DEBIT','CREDIT')),
  amount         BIGINT NOT NULL CHECK (amount > 0),  -- số nguyên, đơn vị nhỏ nhất
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ORACLE bảo toàn tiền: với MỌI txn_id, tổng DEBIT = tổng CREDIT
--   SELECT txn_id,
--          SUM(CASE WHEN direction='DEBIT'  THEN amount ELSE 0 END) AS d,
--          SUM(CASE WHEN direction='CREDIT' THEN amount ELSE 0 END) AS c
--   FROM ledger_entry GROUP BY txn_id HAVING d <> c;   -- phải trả về 0 hàng

CREATE TABLE top_up (
  id              UUID PRIMARY KEY,
  user_id         BIGINT NOT NULL,
  amount          BIGINT NOT NULL,
  idempotency_key TEXT UNIQUE NOT NULL,    -- BẤT BIẾN: 1 key → 1 lần cộng tiền
  status          TEXT NOT NULL            -- PENDING | SUCCEEDED | FAILED
);`
      ),
      P(
        "Với tester, sổ cái ghi kép biến việc kiểm tiền thành một truy vấn đơn giản mà cực mạnh: nhóm các bút toán theo giao dịch, kiểm tổng ghi nợ bằng tổng ghi có ở mọi giao dịch. Nếu có một giao dịch lệch, đó là bằng chứng tiền bị tạo hoặc mất ở đâu đó. Một bất biến toàn cục nữa là tổng số dư của mọi tài khoản khách cộng lại phải bằng tổng tiền đối tác đã chuyển vào, trừ phí. Những truy vấn này chính là oracle: chúng không quan tâm giao diện hiển thị gì, chỉ quan tâm sổ cái có cân bằng hay không.",
        "For a tester, a double-entry ledger turns money checking into a simple but very strong query: group entries by transaction, check total debits equal total credits for every transaction. If any transaction is off, that's evidence money was created or lost somewhere. Another global invariant is that the sum of all customer account balances must equal the total the partner has transferred in, minus fees. These queries are the oracle: they don't care what the UI displays, only whether the ledger balances.",
        "テスターにとって、複式元帳は金銭検証を単純だが非常に強力なクエリに変えます。仕訳を取引ごとにグループ化し、すべての取引で借方合計＝貸方合計を検証します。ずれた取引があれば、それはどこかでお金が作られたか失われた証拠です。もう1つのグローバル不変条件は、全顧客勘定残高の合計が、パートナーが振り込んだ総額から手数料を引いた額に等しいことです。これらのクエリがオラクルです。UIの表示には関心がなく、元帳が均衡するかだけに関心があります。"
      ),
      TIP(
        "Thêm một 'oracle test' chạy sau mỗi kịch bản: truy vấn toàn sổ cái để chắc mọi giao dịch cân bằng. Nó bắt được lỗi rò rỉ tiền mà các assert lẻ bỏ sót.",
        "Add an 'oracle test' after each scenario: query the whole ledger to ensure every transaction balances. It catches money-leak bugs that per-case asserts miss.",
        "各シナリオの後に「オラクルテスト」を追加します。元帳全体をクエリし、すべての取引が均衡することを確認します。個別ケースのアサートが見逃す金銭漏れバグを捕らえます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Hạn mức theo tầng KYC: đặc tả thành bảng quyết định",
      en: "3. KYC-tier limits: turning the spec into a decision table",
      ja: "3. KYCティア別限度額: 仕様をデシジョンテーブル化",
    },
    blocks: [
      P(
        "KYC là quy trình định danh khách hàng, và mức độ định danh quyết định hạn mức giao dịch. Khách chưa xác minh chỉ được nạp một khoản nhỏ; khách đã nộp giấy tờ tuỳ thân được hạn cao hơn; khách xác minh nâng cao gồm địa chỉ và nguồn tiền được hạn cao nhất. Đây là yêu cầu tuân thủ bắt buộc, không phải tuỳ chọn giao diện. Sai lầm phổ biến là chỉ ẩn nút trên giao diện khi vượt hạn, còn backend vẫn chấp nhận — một kẻ tấn công gọi thẳng API sẽ vượt qua. Vì thế oracle phải kiểm ở backend: tổng nạp trong hai mươi tư giờ không được vượt hạn mức của tầng hiện tại.",
        "KYC is the customer identity-verification process, and the verification level determines transaction limits. An unverified customer can top up only a small amount; a customer who submitted ID gets a higher limit; a customer with enhanced verification including address and source of funds gets the highest. This is a mandatory compliance requirement, not a UI option. A common mistake is only hiding the UI button when over the limit while the backend still accepts — an attacker calling the API directly bypasses it. So the oracle must check at the backend: total top-ups in twenty-four hours must not exceed the current tier's limit.",
        "KYCは顧客本人確認プロセスで、確認レベルが取引限度額を決めます。未確認顧客は少額のみ入金でき、身分証を提出した顧客はより高い限度額を得て、住所と資金源を含む強化確認をした顧客は最高額を得ます。これは任意のUIオプションではなく必須のコンプライアンス要件です。よくある誤りは、限度超過時にUIボタンを隠すだけでバックエンドは受け付けることです。APIを直接呼ぶ攻撃者はこれを回避します。よってオラクルはバックエンドで検証せねばなりません。24時間の入金合計が現在ティアの限度額を超えないこと。"
      ),
      imgB2,
      CODE(
        "ts",
        `import { test, expect } from './fixtures';

// data-driven: mỗi tầng KYC có hạn mức riêng — kiểm ở BACKEND, không phải UI
const tiers = [
  { tier: 0, limit: 2_000_000,   amount: 2_500_000, expect: 'DENIED'  },  // vượt → từ chối
  { tier: 0, limit: 2_000_000,   amount: 1_500_000, expect: 'ALLOWED' },
  { tier: 1, limit: 20_000_000,  amount: 25_000_000, expect: 'DENIED'  },
  { tier: 2, limit: 200_000_000, amount: 150_000_000, expect: 'ALLOWED' },
];

for (const t of tiers) {
  test(\`tier \${t.tier} nạp \${t.amount} phải \${t.expect}\`, async ({ request }) => {
    // seed người dùng với đúng tầng KYC qua test-only API
    const user = await (await request.post('/api/test/users', { data: { kycTier: t.tier } })).json();

    const res = await request.post('/api/topups', {
      data: { userId: user.id, amount: t.amount, key: crypto.randomUUID() },
    });

    // ORACLE: vượt hạn mức tier → backend trả 403, KHÔNG cộng tiền
    if (t.expect === 'DENIED') {
      expect(res.status()).toBe(403);
      const wallet = await (await request.get(\`/api/test/wallets/\${user.id}\`)).json();
      expect(wallet.balance).toBe(0);   // số dư không đổi khi bị từ chối
    } else {
      expect(res.status()).toBe(201);
    }
  });
}`
      ),
      SCEN(
        "Bypass hạn mức bằng cách gọi thẳng API",
        "Bypassing the limit by calling the API directly",
        "Một fintech kiểm hạn mức chỉ ở phía giao diện: khi vượt, nút nạp bị mờ đi. Đội bảo mật thử gọi thẳng endpoint nạp tiền bằng công cụ API và nạp được gấp mười lần hạn mức, vì backend không kiểm lại. Đây là lỗ hổng tuân thủ nghiêm trọng có thể bị cơ quan quản lý phạt. Đội khắc phục bằng cách chuyển toàn bộ kiểm hạn mức xuống backend và thêm ca test gọi thẳng API vượt hạn phải nhận 403. Bài học: mọi ràng buộc tuân thủ phải thực thi ở backend, giao diện chỉ là lớp tiện lợi.",
        "A fintech checked the limit only on the frontend: when exceeded, the top-up button greyed out. The security team called the top-up endpoint directly with an API tool and topped up ten times the limit, because the backend didn't re-check. This is a severe compliance vulnerability that regulators can fine. The team fixed it by moving all limit checks to the backend and adding a test where a direct API call over the limit must get 403. Lesson: every compliance constraint must be enforced at the backend; the UI is only a convenience layer.",
        "あるフィンテックは限度額をフロントエンドだけで検証していました。超過時に入金ボタンがグレーアウトします。セキュリティチームがAPIツールで入金エンドポイントを直接呼び、バックエンドが再検証しなかったため限度額の10倍を入金できました。これは規制当局が罰金を科し得る重大なコンプライアンス脆弱性です。チームはすべての限度額チェックをバックエンドに移し、限度超過の直接API呼び出しが403を得るテストを追加して修正しました。教訓: すべてのコンプライアンス制約はバックエンドで強制すべきで、UIは便宜の層にすぎません。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Test plan và chiến lược seed cho fintech",
      en: "4. Test plan and seeding strategy for fintech",
      ja: "4. フィンテックのテスト計画とシード戦略",
    },
    blocks: [
      P(
        "Test plan fintech phân tầng theo cùng logic với thương mại điện tử nhưng nhấn mạnh tính tất định và cô lập vì đụng tiền thật. Tầng đơn vị kiểm logic tính hạn mức còn lại và chấm điểm fraud. Tầng API kiểm idempotency nạp tiền, thực thi hạn mức và luật fraud trực tiếp qua request context — đây là tầng chủ lực vì oracle sống ở dữ liệu. Tầng end-to-end giữ mỏng cho luồng nạp tiền quan trọng. Điểm đặc thù là cần seed được tầng KYC, lịch sử giao dịch để kích hoạt luật velocity, và bối cảnh thiết bị và vị trí để kiểm luật geo. Mọi seed qua test-only API bị khoá chặt ở production.",
        "The fintech test plan tiers by the same logic as e-commerce but emphasizes determinism and isolation because it touches real money. The unit layer checks remaining-limit calculation and fraud scoring. The API layer checks top-up idempotency, limit enforcement and fraud rules directly via the request context — the main layer, since oracles live in the data. The end-to-end layer stays thin for the important top-up flow. What's specific is the need to seed KYC tiers, a transaction history to trigger velocity rules, and device and location context to test geo rules. All seeding is via a test-only API tightly locked in production.",
        "フィンテックのテスト計画はECと同じ論理で階層化しますが、実マネーに触れるため決定性と分離を強調します。ユニット層は残り限度額の計算と不正スコアリングを検証します。API層は入金の冪等性、限度額強制、不正ルールをリクエストコンテキスト経由で直接検証します。オラクルがデータに宿るため、これが主力層です。エンドツーエンド層は重要な入金フローのために薄く保ちます。特有なのは、KYCティア、速度ルールを起動する取引履歴、地理ルールを検証するデバイスと位置のコンテキストをシードする必要がある点です。すべてのシードは本番で厳重にロックされたテスト専用APIを通します。"
      ),
      CODE(
        "ts",
        `// fixtures.ts — seed người dùng fintech với tầng KYC, lịch sử & bối cảnh thiết bị
import { test as base, expect } from '@playwright/test';

type FinUser = { id: string; kycTier: number };

export const test = base.extend<{ user: FinUser }>({
  user: async ({ request }, use, info) => {
    const user = await (await request.post('/api/test/users', {
      data: { kycTier: 1, email: \`qa+\${info.testId}@example.com\` },
    })).json();

    await use(user);

    // teardown: xoá user + toàn bộ ledger entry liên quan → chạy lại sạch
    await request.delete(\`/api/test/users/\${user.id}\`);
  },
});

// helper bơm lịch sử giao dịch để kích hoạt luật velocity
export async function seedHistory(request, userId: string, count: number) {
  for (let i = 0; i < count; i++) {
    await request.post('/api/test/topups/history', {
      data: { userId, amount: 500_000, at: new Date(Date.now() - i * 60_000).toISOString() },
    });
  }
}
export { expect };`
      ),
      QA(
        "Vì sao seed và teardown lại đặc biệt quan trọng ở fintech?",
        "Why are seeding and teardown especially important in fintech?",
        "フィンテックでシードとティアダウンが特に重要なのはなぜですか？",
        "Vì mỗi test đụng đến sổ cái tiền tệ, nếu không dọn sạch, dữ liệu rác của test trước sẽ làm lệch bất biến bảo toàn tiền và kích hoạt sai các luật velocity ở test sau. Ví dụ một test để lại năm giao dịch, test kế bên tưởng khách đang giao dịch nhanh bất thường và bị chặn oan. Mỗi test phải tự tạo user, tự bơm đúng lịch sử cần thiết, và xoá sạch cả user lẫn ledger entry ở teardown. Cô lập tuyệt đối là điều kiện để chạy song song mà vẫn tất định trên dữ liệu tiền.",
        "Because each test touches the money ledger; without cleanup, a prior test's garbage data skews the money-conservation invariant and falsely triggers velocity rules in later tests. For example one test leaves five transactions, and the neighboring test thinks the customer is transacting abnormally fast and wrongly blocks it. Each test must create its own user, inject exactly the history it needs, and delete both user and ledger entries in teardown. Absolute isolation is the condition for running in parallel yet deterministically on money data.",
        "各テストが金銭元帳に触れるため、クリーンアップしないと前のテストのゴミデータが金銭保存の不変条件を歪め、後のテストで速度ルールを誤って起動します。例えばあるテストが5件の取引を残すと、隣のテストは顧客が異常に速く取引していると考え誤ってブロックします。各テストは自分のユーザーを作り、必要な履歴を正確に注入し、ティアダウンでユーザーと元帳仕訳の両方を削除せねばなりません。完全な分離が、金銭データ上で並列かつ決定的に実行する条件です。"
      ),
      WARN(
        "Test fintech tuyệt đối không chạy trên dữ liệu production hay tài khoản thật. Một seed đặt số dư tuỳ ý lọt production là lỗ hổng cho phép tạo tiền giả.",
        "Fintech tests must never run on production data or real accounts. A seed that sets arbitrary balances leaking to production is a vulnerability that allows minting fake money.",
        "フィンテックのテストは本番データや実アカウントで決して実行してはいけません。任意の残高を設定するシードが本番に漏れると、偽の金銭を作れる脆弱性になります。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Ma trận ca: nạp tiền, hạn mức và fraud",
      en: "5. Case matrix: top-up, limits and fraud",
      ja: "5. ケースマトリックス: 入金・限度額・不正",
    },
    blocks: [
      P(
        "Ma trận ca fintech chia theo ba trục nghiệp vụ chính. Trục nạp tiền: thành công, retry cùng key, thất bại từ đối tác, timeout rồi webhook. Trục hạn mức: dưới hạn, đúng hạn, vượt hạn ở từng tầng KYC, và trường hợp nhiều lệnh nhỏ cộng dồn vượt hạn ngày. Trục fraud: tốc độ giao dịch bất thường, đăng nhập từ vị trí địa lý xa nhau trong thời gian ngắn, thiết bị lạ, và các tổ hợp khiến điểm rủi ro vượt ngưỡng. Mỗi ô gắn với một oracle: bảo toàn số dư, hạn mức được thực thi, hay luật fraud kích hoạt đúng. Ưu tiên các ô rủi ro cao nhất là idempotency và bypass hạn mức lên đầu.",
        "The fintech case matrix splits along three main business axes. The top-up axis: success, retry with the same key, partner failure, timeout then webhook. The limit axis: under limit, at limit, over limit per KYC tier, and the case of many small commands summing to over the daily limit. The fraud axis: abnormal transaction velocity, logins from geographically distant locations in a short time, unknown device, and combinations pushing the risk score over threshold. Each cell binds to an oracle: balance conservation, limit enforced, or the fraud rule triggering correctly. Prioritize the highest-risk cells — idempotency and limit bypass — first.",
        "フィンテックのケースマトリックスは3つの主要業務軸で分割します。入金軸: 成功、同一キーでの再試行、パートナー失敗、タイムアウト後Webhook。限度額軸: 限度未満、限度ちょうど、KYCティア別の限度超過、多数の少額コマンドが日次限度を超える場合。不正軸: 異常な取引速度、短時間での地理的に離れた場所からのログイン、未知デバイス、リスクスコアを閾値超えさせる組み合わせ。各セルはオラクルに紐づきます。残高保存、限度強制、または不正ルールの正しい起動です。最高リスクのセル（冪等性と限度回避）を最優先します。"
      ),
      IMG(
        frame(`
<text x="24" y="32" fill="#f8fafc" font-size="15" font-weight="800">MA TRẬN CA · NẠP × HẠN MỨC × FRAUD</text>
<g font-size="11">
  <rect x="24" y="52" width="190" height="30" rx="6" fill="#1e293b"/><text x="34" y="72" fill="#cbd5e1" font-weight="700">Điều kiện</text>
  <rect x="222" y="52" width="200" height="30" rx="6" fill="#1e293b"/><text x="232" y="72" fill="#cbd5e1" font-weight="700">Kỳ vọng (oracle)</text>
  <rect x="430" y="52" width="186" height="30" rx="6" fill="#1e293b"/><text x="440" y="72" fill="#cbd5e1" font-weight="700">Ưu tiên</text>
  <rect x="24" y="88" width="190" height="28" rx="6" fill="#7f1d1d"/><text x="34" y="107" fill="#fee2e2">Retry nạp 3 lần cùng key</text><rect x="222" y="88" width="200" height="28" rx="6" fill="#0f172a"/><text x="232" y="107" fill="#e2e8f0">cộng tiền đúng 1 lần</text><rect x="430" y="88" width="186" height="28" rx="6" fill="#155e63"/><text x="440" y="107" fill="#cffafe">P0 · idempotency</text>
  <rect x="24" y="120" width="190" height="28" rx="6" fill="#422006"/><text x="34" y="139" fill="#fef3c7">Gọi thẳng API vượt hạn</text><rect x="222" y="120" width="200" height="28" rx="6" fill="#0f172a"/><text x="232" y="139" fill="#e2e8f0">backend trả 403</text><rect x="430" y="120" width="186" height="28" rx="6" fill="#155e63"/><text x="440" y="139" fill="#cffafe">P0 · compliance</text>
  <rect x="24" y="152" width="190" height="28" rx="6" fill="#134e4a"/><text x="34" y="171" fill="#d1fae5">10 lệnh/phút</text><rect x="222" y="152" width="200" height="28" rx="6" fill="#0f172a"/><text x="232" y="171" fill="#e2e8f0">velocity chặn, review</text><rect x="430" y="152" width="186" height="28" rx="6" fill="#12315e"/><text x="440" y="171" fill="#e0f2fe">P1 · fraud</text>
  <rect x="24" y="184" width="190" height="28" rx="6" fill="#3b0764"/><text x="34" y="203" fill="#f3e8ff">Đối soát lệch với đối tác</text><rect x="222" y="184" width="200" height="28" rx="6" fill="#0f172a"/><text x="232" y="203" fill="#e2e8f0">phát hiện, gắn cờ</text><rect x="430" y="184" width="186" height="28" rx="6" fill="#12315e"/><text x="440" y="203" fill="#e0f2fe">P1 · recon</text>
</g>
<text x="24" y="248" fill="#94a3b8" font-size="12">P0 (bảo toàn tiền, tuân thủ) chặn merge; P1 (fraud, đối soát) chạy hằng đêm.</text>`),
        "Ma trận ca fintech ưu tiên theo rủi ro tiền bạc và tuân thủ.",
        "Fintech case matrix prioritized by money and compliance risk.",
        "金銭とコンプライアンスのリスクで優先順位付けしたフィンテックのケースマトリックスです。"
      ),
      NOTE(
        "Ba loại ca phải luôn có trong bộ test fintech: idempotency nạp tiền, bypass hạn mức qua API, và một luật fraud tối thiểu. Thiếu bất kỳ cái nào là rủi ro nghiêm trọng.",
        "Three case types must always be in a fintech suite: top-up idempotency, limit bypass via API, and at least one fraud rule. Missing any is a severe risk.",
        "フィンテックのスイートに常に含めるべき3つのケースタイプ: 入金の冪等性、API経由の限度回避、最低1つの不正ルール。いずれを欠いても重大なリスクです。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Happy path: nạp tiền với oracle ledger",
      en: "6. Happy path: top-up with the ledger oracle",
      ja: "6. ハッピーパス: 元帳オラクル付きの入金",
    },
    blocks: [
      P(
        "Happy path nạp tiền làm mốc trước khi tấn công các ca sâu. Khách chọn số tiền, chọn nguồn nạp, xác nhận và nhận thông báo thành công. Điểm khác biệt với test hời hợt nằm ở oracle: sau khi nạp, ta không chỉ đọc số dư trên màn hình mà truy vấn sổ cái để kiểm giao dịch cân bằng, số dư ví tăng đúng số tiền, và trạng thái lệnh nạp là thành công. Kiểm cân bằng ledger đảm bảo tiền được ghi kép đúng cách, không tự sinh ở đâu. Đây là nền để các ca sau chỉ thay một biến — retry, vượt hạn, hay tín hiệu fraud — và quan sát bất biến nào bị vi phạm.",
        "The top-up happy path is the baseline before attacking deep cases. The customer picks an amount and funding source, confirms and gets a success notice. The difference from a shallow test is in the oracle: after the top-up, we don't just read the on-screen balance but query the ledger to check the transaction balances, the wallet balance increased by exactly the amount, and the top-up status is succeeded. Checking the ledger balance ensures money was double-entered correctly, not created anywhere. This is the foundation on which later cases change just one variable — retry, over-limit, or a fraud signal — and observe which invariant breaks.",
        "入金のハッピーパスは深いケースを攻撃する前の基準です。顧客が金額と資金源を選び、確認して成功通知を受け取ります。浅いテストとの違いはオラクルにあります。入金後、画面の残高を読むだけでなく、元帳をクエリして取引が均衡すること、ウォレット残高が金額分だけ正確に増えたこと、入金状態が成功であることを検証します。元帳の均衡確認は、お金がどこかで作られず正しく複式記帳されたことを保証します。これは後続ケースが1変数（再試行・限度超過・不正シグナル）だけ変え、どの不変条件が壊れるかを観察する基盤です。"
      ),
      CODE(
        "ts",
        `import { test, expect } from './fixtures';

test('nạp 1.000.000₫ thành công — kiểm số dư & sổ cái cân bằng', async ({ page, request, user }) => {
  // luồng người dùng qua UI
  await page.goto('/wallet/top-up');
  await page.getByLabel('Số tiền').fill('1000000');
  await page.getByRole('button', { name: 'Xác nhận nạp' }).click();
  await expect(page.getByTestId('topup-status')).toHaveText('Thành công');

  // ORACLE 1: số dư ví tăng ĐÚNG số tiền nạp
  const wallet = await (await request.get(\`/api/test/wallets/\${user.id}\`)).json();
  expect(wallet.balance).toBe(1_000_000);

  // ORACLE 2: sổ cái ghi kép CÂN BẰNG cho giao dịch này
  const txnId = await page.getByTestId('txn-id').textContent();
  const entries = await (await request.get(\`/api/test/ledger?txn=\${txnId}\`)).json();
  const debit  = entries.filter(e => e.direction === 'DEBIT').reduce((s, e) => s + e.amount, 0);
  const credit = entries.filter(e => e.direction === 'CREDIT').reduce((s, e) => s + e.amount, 0);
  expect(debit).toBe(credit);           // tiền không tự sinh/mất
  expect(debit).toBe(1_000_000);
});`
      ),
      TIP(
        "Luôn kèm assert cân bằng ledger vào happy path. Nó rẻ nhưng bắt được lỗi ghi sổ sai — loại lỗi nguy hiểm nhất và khó thấy nhất ở fintech.",
        "Always include a ledger-balance assert in the happy path. It's cheap but catches wrong-bookkeeping bugs — the most dangerous and least visible class in fintech.",
        "ハッピーパスに常に元帳均衡のアサートを含めます。安価ですが、記帳誤りのバグ（フィンテックで最も危険で最も見えにくいクラス）を捕らえます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ca thất bại sâu #1: idempotency khi nạp tiền",
      en: "7. Deep failure case #1: idempotency on top-up",
      ja: "7. 深い失敗ケース#1: 入金の冪等性",
    },
    blocks: [
      P(
        "Giống thanh toán trong thương mại điện tử, nạp tiền phải idempotent vì mạng chập chờn khiến client retry. Nếu backend không dùng idempotency key, một lệnh nạp một triệu bị gửi lại ba lần sẽ cộng ba triệu vào ví — tiền tự sinh, vi phạm bảo toàn. Cơ chế đúng là client sinh key cho một ý định nạp, gửi kèm mọi retry; backend dùng ràng buộc UNIQUE để chỉ cộng tiền một lần và các retry sau trả về kết quả cũ. Oracle kép: số dư ví chỉ tăng đúng một lần, và sổ cái chỉ có một bộ bút toán cho key đó. Đây là ca P0 vì nó động thẳng vào bất biến bảo toàn tiền.",
        "Like payment in e-commerce, top-up must be idempotent because flaky networks make clients retry. If the backend doesn't use an idempotency key, a one-million top-up sent three times adds three million to the wallet — money created, violating conservation. The correct mechanism is the client generating a key for one top-up intent, sent with every retry; the backend using a UNIQUE constraint to credit only once and later retries returning the old result. The dual oracle: the wallet balance increases exactly once, and the ledger has only one entry set for that key. This is a P0 case because it directly touches the money-conservation invariant.",
        "ECの決済と同様、入金は不安定なネットワークがクライアントに再試行させるため冪等でなければなりません。バックエンドが冪等キーを使わないと、100万円の入金を3回送ると300万円がウォレットに加算されます。お金が作られ、保存則に反します。正しい仕組みは、クライアントが1つの入金意図にキーを生成し、すべての再試行に添付し、バックエンドがUNIQUE制約で1回だけ入金し、後の再試行が古い結果を返すことです。二重のオラクル: ウォレット残高が正確に1回だけ増え、元帳にそのキーの仕訳セットが1つだけあること。これは金銭保存の不変条件に直接触れるためP0ケースです。"
      ),
      CODE(
        "ts",
        `test('retry nạp 3 lần cùng key — chỉ cộng tiền 1 lần', async ({ request, user }) => {
  const key = \`topup-\${crypto.randomUUID()}\`;
  const body = { userId: user.id, amount: 1_000_000, key };

  // gửi CÙNG một lệnh nạp 3 lần (mô phỏng retry do timeout mạng)
  const r1 = await request.post('/api/topups', { data: body });
  const r2 = await request.post('/api/topups', { data: body }); // retry
  const r3 = await request.post('/api/topups', { data: body }); // retry
  const t1 = await r1.json(), t2 = await r2.json(), t3 = await r3.json();

  // ORACLE 1: cả 3 trỏ về CÙNG topup id (không tạo mới)
  expect(t2.id).toBe(t1.id);
  expect(t3.id).toBe(t1.id);

  // ORACLE 2 bảo toàn tiền: số dư tăng đúng 1.000.000, KHÔNG phải 3.000.000
  const wallet = await (await request.get(\`/api/test/wallets/\${user.id}\`)).json();
  expect(wallet.balance).toBe(1_000_000);

  // ORACLE 3: sổ cái chỉ có ĐÚNG một bộ bút toán cho key này
  const entries = await (await request.get(\`/api/test/ledger?key=\${key}\`)).json();
  const txns = new Set(entries.map(e => e.txn_id));
  expect(txns.size).toBe(1);
});`
      ),
      QA(
        "Điều gì xảy ra nếu hai retry nạp tiền cùng key chạm server đồng thời?",
        "What happens if two same-key top-up retries hit the server simultaneously?",
        "同一キーの2つの入金再試行が同時にサーバーに届くとどうなりますか？",
        "Đây là ca đua tranh nguy hiểm mà tôi luôn kiểm bằng cách gửi đồng thời qua Promise.all. Nếu backend chỉ kiểm 'key đã tồn tại chưa' rồi mới ghi mà không có khoá hay ràng buộc UNIQUE ở database, hai retry cùng đọc thấy key chưa tồn tại và cùng cộng tiền — nhân đôi. Cách đúng là dựa vào ràng buộc UNIQUE ở tầng lưu trữ: một trong hai giao dịch sẽ vi phạm ràng buộc và bị từ chối, chỉ một cộng tiền. Oracle vẫn là số dư tăng đúng một lần, và tôi kiểm nó dưới điều kiện đồng thời chứ không chỉ tuần tự.",
        "This is a dangerous race case I always test by sending concurrently via Promise.all. If the backend only checks 'does the key exist yet' then writes, without a lock or a database UNIQUE constraint, both retries read the key as non-existent and both credit — doubling. The correct way relies on a UNIQUE constraint at the storage layer: one of the two transactions violates the constraint and is rejected, only one credits. The oracle is still that the balance increases exactly once, and I verify it under concurrency, not just sequentially.",
        "これは私が常にPromise.allで同時送信して検証する危険な競合ケースです。バックエンドが「キーがまだ存在するか」を確認してから書くだけで、ロックやデータベースのUNIQUE制約がないと、両方の再試行がキーを未存在と読み、両方が入金して倍になります。正しい方法はストレージ層のUNIQUE制約に依存します。2つの取引の一方が制約に違反して拒否され、1つだけが入金します。オラクルは依然として残高が正確に1回増えることで、逐次だけでなく並行下で検証します。"
      ),
      WARN(
        "Idempotency dựa trên 'kiểm rồi ghi' ở tầng ứng dụng là không đủ khi có đua tranh. Phải dựa vào ràng buộc UNIQUE ở database làm điểm tuần tự hoá cuối cùng.",
        "Idempotency based on 'check then write' at the application layer is insufficient under contention. Rely on a database UNIQUE constraint as the final serialization point.",
        "アプリ層の「確認してから書く」に基づく冪等性は、競合下では不十分です。最終的な直列化点としてデータベースのUNIQUE制約に依存してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Ca thất bại sâu #2: velocity, geo và device fraud",
      en: "8. Deep failure case #2: velocity, geo and device fraud",
      ja: "8. 深い失敗ケース#2: 速度・地理・デバイスの不正",
    },
    blocks: [
      P(
        "Chống gian lận dựa trên nhiều tín hiệu, và ba loại luật kinh điển là velocity, geo và device. Velocity phát hiện tốc độ giao dịch bất thường: một tài khoản nạp mười lần trong một phút gần như chắc chắn là bot hoặc tài khoản bị chiếm. Geo phát hiện di chuyển bất khả thi: đăng nhập từ Hà Nội rồi năm phút sau từ một quốc gia khác. Device phát hiện thiết bị lạ chưa từng thấy gắn với một tài khoản giá trị cao. Kiểm các luật này nghĩa là bơm chuỗi sự kiện đúng để vượt ngưỡng, rồi khẳng định hệ thống chặn hoặc gắn cờ review — và ngược lại, hành vi bình thường không bị chặn oan.",
        "Fraud prevention rests on many signals, and three classic rule types are velocity, geo and device. Velocity detects abnormal transaction speed: an account topping up ten times in a minute is almost certainly a bot or a compromised account. Geo detects impossible travel: a login from Hanoi then five minutes later from another country. Device detects an unknown, never-seen device tied to a high-value account. Testing these rules means injecting the right event sequence to cross the threshold, then asserting the system blocks or flags for review — and conversely, that normal behavior isn't wrongly blocked.",
        "不正防止は多くのシグナルに基づき、3つの古典的ルールタイプは速度・地理・デバイスです。速度は異常な取引速度を検出します。1分間に10回入金するアカウントは、ほぼ確実にボットか乗っ取られたアカウントです。地理は不可能な移動を検出します。ハノイからのログインの5分後に別の国から。デバイスは、高価値アカウントに紐づく未知の初見デバイスを検出します。これらのルールの検証は、閾値を越える正しいイベント列を注入し、システムがブロックまたはレビューフラグを立てることをアサートし、逆に正常な行動が誤ってブロックされないことを検証することです。"
      ),
      CODE(
        "ts",
        `import { test, expect, seedHistory } from './fixtures';

test('velocity: 10 lệnh nạp trong 1 phút bị chặn để review', async ({ request, user }) => {
  // bơm 9 giao dịch trong 1 phút gần đây → sát ngưỡng velocity
  await seedHistory(request, user.id, 9);

  // lệnh thứ 10 vượt ngưỡng → hệ thống phải chặn/gắn cờ
  const res = await request.post('/api/topups', {
    data: { userId: user.id, amount: 500_000, key: crypto.randomUUID() },
  });
  // ORACLE: bị chặn tạm để review (429/403), KHÔNG cộng tiền âm thầm
  expect([429, 403]).toContain(res.status());
  const flag = await (await request.get(\`/api/test/fraud/flags?user=\${user.id}\`)).json();
  expect(flag.reason).toBe('VELOCITY');
});

test('geo: đăng nhập 2 nước cách nhau 5 phút → impossible travel', async ({ request, user }) => {
  await request.post('/api/test/logins', { data: { userId: user.id, geo: 'VN', at: '2026-07-06T09:00:00Z' } });
  const res = await request.post('/api/topups', {
    data: { userId: user.id, amount: 500_000, key: crypto.randomUUID() },
    headers: { 'x-geo': 'US' },        // 5 phút sau từ nước khác
  });
  // ORACLE: gắn cờ impossible-travel, yêu cầu xác thực bổ sung
  expect(res.status()).toBe(403);
  const flag = await (await request.get(\`/api/test/fraud/flags?user=\${user.id}\`)).json();
  expect(flag.reason).toBe('IMPOSSIBLE_TRAVEL');
});`
      ),
      P(
        "Điểm tinh tế trong kiểm fraud là phải kiểm cả hai chiều để tránh cả âm tính giả lẫn dương tính giả. Âm tính giả là bỏ lọt gian lận thật, gây thiệt hại tiền. Dương tính giả là chặn oan khách thật, gây trải nghiệm tệ và mất khách. Vì thế ngoài ca velocity kích hoạt, phải có ca một khách nạp năm lần rải rác trong ngày không bị chặn. Ngưỡng fraud là tham số nghiệp vụ cần tinh chỉnh, và test bảo vệ cả hai phía của ngưỡng đó. Ranh giới quanh ngưỡng — đúng chín và đúng mười lệnh — là nơi cần ca kiểm biên rõ ràng.",
        "A subtle point in fraud testing is checking both directions to avoid both false negatives and false positives. A false negative lets real fraud through, causing money loss. A false positive wrongly blocks a real customer, causing bad experience and churn. So besides the velocity-triggering case, there must be a case where a customer topping up five times spread over a day is not blocked. The fraud threshold is a business parameter to tune, and tests protect both sides of it. The boundary around the threshold — exactly nine versus exactly ten commands — is where you need explicit boundary cases.",
        "不正テストの微妙な点は、偽陰性と偽陽性の両方を避けるため両方向を検証することです。偽陰性は実際の不正を通し、金銭損失を招きます。偽陽性は実顧客を誤ってブロックし、悪い体験と離脱を招きます。よって速度起動ケースに加え、1日に分散して5回入金する顧客がブロックされないケースが必要です。不正閾値は調整すべき業務パラメータで、テストがその両側を守ります。閾値周辺の境界（正確に9件対10件）は、明確な境界ケースが必要な場所です。"
      ),
      NOTE(
        "Luật fraud là bài toán biên và bảng quyết định. Luôn có ca ngay dưới ngưỡng (không chặn) và ngay trên ngưỡng (chặn) để kiểm chính xác ranh giới.",
        "Fraud rules are a boundary and decision-table problem. Always have a just-below-threshold case (no block) and a just-above case (block) to verify the boundary precisely.",
        "不正ルールは境界とデシジョンテーブルの問題です。閾値のすぐ下（ブロックなし）とすぐ上（ブロック）のケースを常に用意し、境界を正確に検証します。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ca thất bại sâu #3: timeout, webhook và trạng thái nạp",
      en: "9. Deep failure case #3: timeout, webhook and top-up state",
      ja: "9. 深い失敗ケース#3: タイムアウト・Webhook・入金状態",
    },
    blocks: [
      P(
        "Nạp tiền qua đối tác thanh toán là hệ phân tán, và timeout tạo trạng thái mập mờ giống hệt thương mại điện tử. Đối tác có thể đã nhận tiền nhưng response về ứng dụng bị timeout. Nếu ứng dụng vội đánh dấu thất bại, khách mất tiền mà ví không tăng; nếu vội đánh dấu thành công, có thể cộng tiền chưa nhận. Giải pháp đúng là bất đồng bộ: khi timeout, lệnh nạp ở trạng thái chờ, đối tác gửi webhook báo kết quả thật đã xác thực chữ ký, và tiến trình đối soát đưa lệnh về trạng thái đúng. Test mô phỏng timeout rồi webhook đến muộn, kiểm lệnh hội tụ và sổ cái cân bằng đúng ở trạng thái cuối.",
        "Top-up via a payment partner is a distributed system, and timeout creates ambiguous state just like e-commerce. The partner may have received the money but the response to the app times out. If the app hastily marks failure, the customer loses money while the wallet doesn't increase; if it hastily marks success, it may credit money not yet received. The correct solution is asynchronous: on timeout the top-up is pending, the partner sends a signature-verified webhook with the real result, and the reconciliation process brings the command to its correct state. The test simulates timeout then a late webhook, verifying the command converges and the ledger balances correctly at the final state.",
        "決済パートナー経由の入金は分散システムで、タイムアウトはECと同様に曖昧な状態を作ります。パートナーはお金を受け取ったがアプリへの応答がタイムアウトし得ます。アプリが急いで失敗とマークすると顧客はお金を失いウォレットは増えず、急いで成功とマークするとまだ受け取っていないお金を入金し得ます。正しい解決策は非同期です。タイムアウト時に入金は保留となり、パートナーが署名検証済みの実結果Webhookを送り、照合プロセスがコマンドを正しい状態にします。テストはタイムアウト後の遅延Webhookを模擬し、コマンドが収束し最終状態で元帳が正しく均衡することを検証します。"
      ),
      CODE(
        "ts",
        `test('nạp timeout rồi webhook thành công — ví tăng đúng, sổ cái cân bằng', async ({ page, request, user }) => {
  // mock đối tác: request nạp bị TIMEOUT (không response)
  await page.route('**/partner/charge', route => route.abort('timedout'));

  await page.goto('/wallet/top-up');
  await page.getByLabel('Số tiền').fill('1000000');
  await page.getByRole('button', { name: 'Xác nhận nạp' }).click();

  // ORACLE trung gian: lệnh KHÔNG bị đánh thất bại vội, ở trạng thái chờ
  const txnId = await page.getByTestId('txn-id').textContent();
  let topup = await (await request.get(\`/api/test/topups/by-txn/\${txnId}\`)).json();
  expect(topup.status).toBe('PENDING');
  let wallet = await (await request.get(\`/api/test/wallets/\${user.id}\`)).json();
  expect(wallet.balance).toBe(0);         // chưa cộng khi chưa xác nhận

  // đối tác gửi webhook báo đã thu tiền (đến muộn), có chữ ký hợp lệ
  await request.post('/api/webhooks/partner', {
    data: { txnId, event: 'charge.succeeded', amount: 1_000_000 },
    headers: { 'x-signature': signWebhook({ txnId }) },
  });

  // ORACLE cuối: lệnh về SUCCEEDED, ví tăng đúng, sổ cái cân bằng
  topup = await (await request.get(\`/api/test/topups/by-txn/\${txnId}\`)).json();
  expect(topup.status).toBe('SUCCEEDED');
  wallet = await (await request.get(\`/api/test/wallets/\${user.id}\`)).json();
  expect(wallet.balance).toBe(1_000_000);
});`
      ),
      SCEN(
        "Khách nạp thành công nhưng ví không tăng",
        "A customer tops up successfully but the wallet doesn't increase",
        "Một ví điện tử đánh dấu lệnh nạp là thất bại ngay khi gặp timeout từ đối tác. Nhưng đối tác đã thu tiền của khách thật, nên khách mất tiền mà ví không tăng, dẫn tới làn sóng khiếu nại. Điều tra cho thấy hệ thống thiếu xử lý bất đồng bộ và bỏ qua webhook đến muộn. Đội khắc phục bằng cách để lệnh ở trạng thái chờ khi timeout, xử lý webhook đã xác thực chữ ký, và chạy đối soát để bù các lệnh mắc kẹt. Bài học: đừng quyết định số phận tiền dựa trên một response; luôn chờ nguồn sự thật cuối cùng.",
        "An e-wallet marked a top-up as failed the moment it hit a partner timeout. But the partner had charged the real customer, so the customer lost money while the wallet didn't increase, triggering a complaint wave. Investigation showed the system lacked async handling and ignored late webhooks. The team fixed it by keeping the command pending on timeout, processing signature-verified webhooks, and running reconciliation to settle stuck commands. Lesson: don't decide money's fate on one response; always wait for the final source of truth.",
        "ある電子ウォレットは、パートナーのタイムアウトに遭遇した瞬間に入金を失敗とマークしました。しかしパートナーは実顧客に課金していたため、顧客はお金を失いウォレットは増えず、苦情の波を招きました。調査の結果、システムは非同期処理を欠き遅延Webhookを無視していました。チームはタイムアウト時にコマンドを保留のままにし、署名検証済みWebhookを処理し、詰まったコマンドを解決する照合を実行して修正しました。教訓: 1つの応答でお金の運命を決めず、常に最終的な真実の源を待ちます。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Đối soát với đối tác: bất biến khớp cuối ngày",
      en: "10. Partner reconciliation: the end-of-day matching invariant",
      ja: "10. パートナー照合: 日次締めの照合不変条件",
    },
    blocks: [
      P(
        "Đối soát là bước tuân thủ bắt buộc: cuối mỗi ngày, hệ thống của bạn và hệ thống đối tác thanh toán phải khớp về mọi giao dịch. Đối tác gửi một tệp đối soát liệt kê mọi khoản họ đã thu; hệ thống của bạn so từng dòng với sổ cái nội bộ. Bất biến là mọi giao dịch trong sổ cái phải có dòng khớp bên đối tác và ngược lại, với cùng số tiền. Lệch có thể do giao dịch mắc kẹt ở trạng thái chờ, webhook bị mất, hay lỗi ghi sổ. Test đối soát bơm một tệp đối tác có chủ đích chứa dòng lệch, rồi khẳng định tiến trình đối soát phát hiện đúng và gắn cờ để xử lý thủ công, không tự lặng lẽ bỏ qua.",
        "Reconciliation is a mandatory compliance step: at the end of each day, your system and the payment partner's system must match on every transaction. The partner sends a reconciliation file listing every amount they charged; your system compares each line to the internal ledger. The invariant is that every ledger transaction must have a matching partner line and vice versa, with the same amount. Discrepancies can come from transactions stuck pending, lost webhooks, or bookkeeping errors. The reconciliation test injects a deliberately discrepant partner file, then asserts the reconciliation process detects it correctly and flags for manual handling, not silently ignores it.",
        "照合は必須のコンプライアンスステップです。毎日の終わりに、あなたのシステムと決済パートナーのシステムがすべての取引で一致せねばなりません。パートナーは課金したすべての金額を列挙する照合ファイルを送り、あなたのシステムが各行を内部元帳と比較します。不変条件は、すべての元帳取引にパートナー行の一致があり逆も同様で、同じ金額であることです。不一致は保留のまま詰まった取引、失われたWebhook、記帳誤りから生じ得ます。照合テストは意図的に不一致のあるパートナーファイルを注入し、照合プロセスが正しく検出して手動処理のためにフラグを立て、静かに無視しないことをアサートします。"
      ),
      CODE(
        "ts",
        `test('đối soát cuối ngày phát hiện giao dịch lệch với đối tác', async ({ request, user }) => {
  // tạo 3 giao dịch nạp thành công ở phía ta
  const ids = [];
  for (let i = 0; i < 3; i++) {
    const r = await request.post('/api/topups', {
      data: { userId: user.id, amount: 1_000_000, key: crypto.randomUUID() },
    });
    ids.push((await r.json()).id);
  }

  // đối tác gửi tệp đối soát THIẾU 1 giao dịch + THỪA 1 giao dịch lạ
  const partnerFile = [
    { txnId: ids[0], amount: 1_000_000 },
    { txnId: ids[1], amount: 1_000_000 },
    // thiếu ids[2] → ta có, đối tác không
    { txnId: 'unknown-x', amount: 999_000 }, // đối tác có, ta không
  ];
  await request.post('/api/reconciliation/import', { data: { rows: partnerFile } });

  // ORACLE: đối soát báo đúng 2 loại lệch, gắn cờ để xử lý — không bỏ qua
  const report = await (await request.get('/api/reconciliation/report/today')).json();
  expect(report.missingAtPartner).toContain(ids[2]);   // ta có, đối tác thiếu
  expect(report.unknownAtPartner).toContain('unknown-x'); // đối tác có, ta không
  expect(report.status).toBe('DISCREPANCY');
});`
      ),
      QA(
        "Đối soát phát hiện lệch nghĩa là hệ thống có bug đúng không?",
        "Does a reconciliation discrepancy mean the system has a bug?",
        "照合の不一致はシステムにバグがあることを意味しますか？",
        "Không nhất thiết. Lệch đối soát là tín hiệu cần điều tra, không phải kết luận. Có lệch lành tính do lệch thời điểm: một giao dịch xảy ra sát nửa đêm rơi vào ngày khác giữa hai hệ thống, sẽ tự khớp ở kỳ sau. Có lệch nghiêm trọng do webhook mất hay lỗi ghi sổ, cần bù thủ công. Nhiệm vụ của test và của tiến trình đối soát là phát hiện và phân loại lệch, gắn cờ đúng mức, chứ không phải tự động sửa. Tự động lặng lẽ 'khớp' một lệch là che giấu vấn đề — điều tối kỵ ở fintech.",
        "Not necessarily. A reconciliation discrepancy is a signal to investigate, not a conclusion. There are benign discrepancies from timing: a transaction near midnight falls on different days across the two systems and self-matches next cycle. There are serious ones from lost webhooks or bookkeeping errors needing manual settlement. The job of the test and the reconciliation process is to detect and classify discrepancies, flag at the right severity, not auto-fix. Silently auto-'matching' a discrepancy hides the problem — a cardinal sin in fintech.",
        "必ずしもそうではありません。照合の不一致は調査すべきシグナルであり、結論ではありません。タイミングによる良性の不一致があります。深夜近くの取引が2つのシステムで異なる日に落ち、次のサイクルで自己一致します。失われたWebhookや記帳誤りによる深刻なものは手動決済が必要です。テストと照合プロセスの仕事は不一致を検出・分類し、適切な深刻度でフラグを立てることで、自動修正ではありません。不一致を静かに自動「一致」させるのは問題を隠すことで、フィンテックで最大の禁忌です。"
      ),
      NOTE(
        "Đối soát là hàng phòng thủ cuối chống mọi lỗi tiền lọt qua các tầng trên. Một bộ test fintech nghiêm túc phải có ca đối soát phát hiện lệch.",
        "Reconciliation is the last line of defense against any money bug slipping through upper layers. A serious fintech suite must have a discrepancy-detecting reconciliation case.",
        "照合は上位層を通り抜けたあらゆる金銭バグに対する最後の防衛線です。真剣なフィンテックのスイートには、不一致を検出する照合ケースが必要です。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. CI/CD và bảo mật dữ liệu test tiền tệ",
      en: "11. CI/CD and security of money test data",
      ja: "11. CI/CDと金銭テストデータのセキュリティ",
    },
    blocks: [
      P(
        "CI cho fintech phân tầng theo rủi ro giống thương mại điện tử nhưng khắt khe hơn về bảo mật dữ liệu. Trên mỗi pull request chạy các ca P0 — idempotency nạp tiền, bypass hạn mức, cân bằng ledger — vì đây là rủi ro bảo toàn tiền và tuân thủ chặn merge. Hằng đêm chạy toàn bộ ma trận gồm luật fraud và đối soát. Điểm khác biệt lớn là dữ liệu: test tuyệt đối không dùng dữ liệu khách thật, mọi giá trị nhạy cảm dùng dữ liệu tổng hợp, và test-only API bị khoá bằng nhiều lớp môi trường. Trace giữ khi thất bại phải được xử lý cẩn thận vì có thể chứa thông tin nhạy cảm, cần lọc trước khi lưu.",
        "Fintech CI tiers by risk like e-commerce but is stricter on data security. On each pull request, run the P0 cases — top-up idempotency, limit bypass, ledger balance — because these are merge-blocking money-conservation and compliance risks. Nightly, run the full matrix including fraud rules and reconciliation. The big difference is data: tests must never use real customer data, all sensitive values use synthetic data, and the test-only API is locked behind multiple environment layers. Traces retained on failure must be handled carefully as they may contain sensitive information, needing redaction before storage.",
        "フィンテックのCIはECのようにリスクで階層化しますが、データセキュリティにより厳格です。各プルリクエストでP0ケース（入金の冪等性・限度回避・元帳均衡）を実行します。これらはマージをブロックする金銭保存とコンプライアンスのリスクだからです。毎晩、不正ルールと照合を含む全マトリックスを実行します。大きな違いはデータです。テストは実顧客データを決して使わず、すべての機密値は合成データを使い、テスト専用APIは複数の環境層でロックされます。失敗時に保持されるトレースは機密情報を含み得るため慎重に扱い、保存前に秘匿化が必要です。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/fintech-tests.yml — phân tầng + bảo mật dữ liệu
name: fintech-tests
on: [pull_request, schedule]
jobs:
  p0-money:                            # chặn merge: bảo toàn tiền + tuân thủ
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps chromium
      - run: npx playwright test --grep @p0
        env:
          CI: 'true'
          TEST_API_ENABLED: 'true'     # chỉ bật ở CI, KHÔNG BAO GIỜ ở prod
          USE_SYNTHETIC_DATA: 'true'   # không đụng dữ liệu khách thật

  nightly-fraud-recon:                 # lịch đêm: fraud + đối soát
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    strategy: { matrix: { shard: [1, 2] } }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npx playwright test --grep '@fraud|@recon' --shard=\${{ matrix.shard }}/2
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: trace-\${{ matrix.shard }}, path: test-results/ }  # trace đã lọc PII`
      ),
      WARN(
        "Trace và log của test fintech có thể chứa số tài khoản, số dư, thông tin định danh. Phải lọc PII trước khi lưu artifact, và giới hạn quyền truy cập.",
        "Fintech test traces and logs can contain account numbers, balances, identity info. Redact PII before storing artifacts, and restrict access.",
        "フィンテックのテストのトレースとログには口座番号・残高・本人確認情報が含まれ得ます。アーティファクト保存前にPIIを秘匿化し、アクセスを制限してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới cho AI-agent trong bộ test fintech",
      en: "12. The AI-agent boundary in the fintech suite",
      ja: "12. フィンテックスイートにおけるAIエージェントの境界",
    },
    blocks: [
      P(
        "Với fintech, ranh giới cho AI-agent còn nghiêm ngặt hơn thương mại điện tử vì rủi ro tuân thủ và tiền thật. Playwright Agents có thể giúp phần cơ học: Planner khám phá luồng nạp tiền và phác kế hoạch, Generator sinh khung spec và xác minh locator, Healer gợi ý sửa khi giao diện đổi. Nhưng ba nhóm oracle phải do con người sở hữu tuyệt đối: bảo toàn tiền qua ledger, hạn mức tuân thủ theo tầng KYC, và ngưỡng của các luật fraud. Đây là những quyết định có hệ quả pháp lý và tài chính, không được để một mô hình tự định nghĩa hay tự nới lỏng. Agent viết khung, con người viết và duyệt oracle.",
        "For fintech, the AI-agent boundary is even stricter than e-commerce because of compliance risk and real money. Playwright Agents can help the mechanical part: the Planner explores the top-up flow and drafts a plan, the Generator generates spec scaffolds and verifies locators, the Healer suggests fixes when the UI changes. But three oracle groups must be absolutely human-owned: money conservation via the ledger, compliance limits per KYC tier, and the thresholds of fraud rules. These are decisions with legal and financial consequences, not to be defined or loosened by a model. The agent writes the scaffold; humans write and approve the oracle.",
        "フィンテックでは、AIエージェントの境界はコンプライアンスリスクと実マネーのためECよりさらに厳格です。Playwright Agentsは機械的部分を助けられます。Plannerは入金フローを探索し計画を起草し、Generatorはスペック足場を生成しロケーターを検証し、HealerはUI変更時に修正を提案します。しかし3つのオラクルグループは絶対に人間が所有せねばなりません。元帳による金銭保存、KYCティア別のコンプライアンス限度額、不正ルールの閾値です。これらは法的・金銭的な結果を伴う判断で、モデルが定義したり緩めたりしてはいけません。エージェントは足場を書き、人間がオラクルを書いて承認します。"
      ),
      CODE(
        "bash",
        `# Playwright MCP: cho AI lái browser bằng tiếng Anh qua accessibility tree
#   dùng để KHÁM PHÁ luồng, KHÔNG dùng để tự định nghĩa oracle tài chính

npx playwright init-agents        # scaffold planner/generator/healer + seed.spec.ts

# Ranh giới cứng cho fintech:
#  - agent: khám phá luồng, sinh khung spec, đề xuất locator ổn định
#  - CON NGƯỜI: định nghĩa oracle ledger, hạn mức KYC, ngưỡng fraud
#  - MỌI thay đổi ở test tiền/tuân thủ phải qua review 2 người (four-eyes)`
      ),
      QA(
        "Rủi ro lớn nhất khi để AI-agent tham gia bộ test fintech là gì?",
        "What's the biggest risk of letting an AI agent into a fintech test suite?",
        "AIエージェントをフィンテックのテストスイートに入れる最大のリスクは何ですか？",
        "Rủi ro lớn nhất là hallucination làm suy yếu oracle mà không ai nhận ra. Một agent tự sửa test có thể nới lỏng một assertion về hạn mức hay bảo toàn tiền để test xanh, vô tình vô hiệu hoá đúng cái ràng buộc tuân thủ quan trọng nhất. Ở fintech, một test xanh dối không chỉ che bug mà có thể dẫn tới vi phạm quy định bị phạt. Vì thế tôi áp dụng nguyên tắc four-eyes: mọi thay đổi ở test tiền hay tuân thủ phải qua hai người duyệt, và agent không có quyền tự merge các thay đổi đó. Grounding và giới hạn quyền là bắt buộc.",
        "The biggest risk is hallucination weakening the oracle without anyone noticing. A self-healing agent might loosen a limit or money-conservation assertion to make a test green, inadvertently disabling the very compliance constraint that matters most. In fintech a falsely green test doesn't just hide a bug — it can lead to a regulatory violation and fines. So I apply the four-eyes principle: any change to money or compliance tests requires two human approvers, and the agent has no right to auto-merge such changes. Grounding and permission limits are mandatory.",
        "最大のリスクは、誰も気づかないうちにハルシネーションがオラクルを弱めることです。自己修復エージェントが、テストを緑にするため限度額や金銭保存のアサーションを緩め、最も重要なコンプライアンス制約を意図せず無効化し得ます。フィンテックでは偽の緑テストはバグを隠すだけでなく、規制違反と罰金につながり得ます。よって私はフォーアイズ原則を適用します。金銭やコンプライアンスのテストへの変更は2人の人間の承認を要し、エージェントはそのような変更を自動マージする権利を持ちません。グラウンディングと権限制限は必須です。"
      ),
      WARN(
        "Áp dụng four-eyes cho mọi thay đổi test tiền tệ và tuân thủ: hai người duyệt, agent không tự merge. Hallucination nới lỏng oracle là rủi ro nghiêm trọng.",
        "Apply four-eyes to every money and compliance test change: two approvers, no agent auto-merge. Hallucination loosening the oracle is a severe risk.",
        "金銭とコンプライアンスのテスト変更すべてにフォーアイズを適用します。2人の承認者、エージェントの自動マージなし。オラクルを緩めるハルシネーションは重大なリスクです。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết và góc phỏng vấn",
      en: "13. Summary and the interview angle",
      ja: "13. まとめと面接の観点",
    },
    blocks: [
      P(
        "Kiểm thử fintech là bài toán bảo toàn tiền và tuân thủ dưới nhiều ràng buộc, không phải luồng nạp tiền đơn giản. Chìa khoá là oracle-first: dùng sổ cái ghi kép làm oracle bảo toàn tiền, hạn mức theo tầng KYC làm bảng quyết định thực thi ở backend, idempotency làm bất biến chống nhân đôi tiền, các luật fraud làm bài toán biên hai chiều, và đối soát làm hàng phòng thủ cuối. Playwright kết hợp request context cho phép seed tầng KYC, bơm chuỗi sự kiện fraud và kiểm sổ cái cân bằng một cách tất định. CI phân tầng theo rủi ro với bảo mật dữ liệu nghiêm ngặt, và AI-agent bị giới hạn cứng bằng nguyên tắc four-eyes.",
        "Fintech testing is a money-conservation and compliance problem under many constraints, not a simple top-up flow. The key is oracle-first: use a double-entry ledger as the money-conservation oracle, KYC-tier limits as a backend-enforced decision table, idempotency as the anti-double-credit invariant, fraud rules as a two-directional boundary problem, and reconciliation as the last line of defense. Playwright combined with the request context lets you seed KYC tiers, inject fraud event sequences and verify the ledger balances deterministically. CI tiers by risk with strict data security, and AI agents are hard-limited by the four-eyes principle.",
        "フィンテックのテストは、多くの制約下での金銭保存とコンプライアンスの問題で、単純な入金フローではありません。鍵はオラクル優先です。複式元帳を金銭保存のオラクルとし、KYCティア別限度額をバックエンド強制のデシジョンテーブルとし、冪等性を二重入金防止の不変条件とし、不正ルールを双方向の境界問題とし、照合を最後の防衛線とします。リクエストコンテキストと組み合わせたPlaywrightは、KYCティアのシード、不正イベント列の注入、元帳均衡の検証を決定的に行えます。CIはリスクで階層化し厳格なデータセキュリティを伴い、AIエージェントはフォーアイズ原則で厳しく制限されます。"
      ),
      H("Câu hỏi phỏng vấn thường gặp", "Common interview questions", "よくある面接質問"),
      QA(
        "Bạn kiểm 'tiền không tự sinh ra' trong một ví điện tử bằng cách nào?",
        "How do you test that 'money is not created out of nothing' in an e-wallet?",
        "電子ウォレットで「お金が無から生まれない」ことをどう検証しますか？",
        "Tôi dựa vào sổ cái ghi kép làm oracle. Với mỗi giao dịch, tôi truy vấn mọi bút toán và khẳng định tổng ghi nợ bằng tổng ghi có — nếu lệch, tiền đã tự sinh hoặc mất. Ở mức toàn cục, tôi kiểm tổng số dư mọi tài khoản khách bằng tổng đối tác chuyển vào trừ phí. Tôi chạy oracle này sau mỗi kịch bản, kể cả các ca retry và timeout, vì đó là nơi lỗi ghi sổ hay lộ. Đây là bất biến mạnh nhất ở fintech: không kiểm 'số dư hiển thị đúng' mà kiểm 'sổ cái cân bằng'.",
        "I rely on a double-entry ledger as the oracle. For each transaction I query all entries and assert total debits equal total credits — if off, money was created or lost. Globally, I check that the sum of all customer balances equals the total the partner transferred in minus fees. I run this oracle after every scenario, including retry and timeout cases, because that's where bookkeeping bugs surface. This is the strongest invariant in fintech: don't check 'the balance displays right' but 'the ledger balances'.",
        "私は複式元帳をオラクルとして依拠します。各取引について全仕訳をクエリし、借方合計＝貸方合計をアサートします。ずれれば、お金が作られたか失われたのです。グローバルには、全顧客残高の合計がパートナーの振込総額から手数料を引いた額に等しいことを検証します。このオラクルを、再試行やタイムアウトのケースを含む各シナリオの後に実行します。そこが記帳バグの現れる場所だからです。これはフィンテックで最強の不変条件です。「残高が正しく表示される」ではなく「元帳が均衡する」を検証します。"
      ),
      QA(
        "Hạn mức KYC nên kiểm ở giao diện hay backend, và vì sao?",
        "Should KYC limits be tested at the UI or backend, and why?",
        "KYC限度額はUIとバックエンドどちらで検証すべきで、なぜですか？",
        "Phải kiểm ở backend, vì đó là nơi ràng buộc tuân thủ thực sự được thực thi. Nếu chỉ kiểm ở giao diện, một kẻ tấn công gọi thẳng API sẽ vượt qua, tạo lỗ hổng tuân thủ có thể bị phạt. Tôi seed người dùng với đúng tầng KYC qua test-only API, rồi gọi thẳng endpoint nạp tiền với số tiền vượt hạn và khẳng định backend trả về từ chối cùng số dư không đổi. Tôi cũng kiểm ca nhiều lệnh nhỏ cộng dồn vượt hạn ngày. Giao diện chỉ là lớp tiện lợi; oracle tuân thủ luôn nằm ở backend.",
        "It must be tested at the backend, because that's where the compliance constraint is truly enforced. If tested only at the UI, an attacker calling the API directly bypasses it, creating a finable compliance vulnerability. I seed a user with the exact KYC tier via a test-only API, then call the top-up endpoint directly with an over-limit amount and assert the backend returns a denial with unchanged balance. I also test many small commands summing over the daily limit. The UI is only a convenience layer; the compliance oracle always lives at the backend.",
        "バックエンドで検証せねばなりません。そこがコンプライアンス制約が真に強制される場所だからです。UIだけで検証すると、APIを直接呼ぶ攻撃者が回避し、罰金対象のコンプライアンス脆弱性を作ります。テスト専用APIで正確なKYCティアのユーザーをシードし、限度超過額で入金エンドポイントを直接呼び、バックエンドが残高不変で拒否を返すことをアサートします。多数の少額コマンドが日次限度を超えるケースも検証します。UIは便宜の層にすぎず、コンプライアンスのオラクルは常にバックエンドに宿ります。"
      ),
      NOTE(
        "Thông điệp mang vào phỏng vấn: fintech = bảo toàn tiền qua ledger + tuân thủ thực thi ở backend + idempotency + fraud biên hai chiều + đối soát. Oracle luôn ở dữ liệu, không ở màn hình.",
        "Message to bring to interviews: fintech = money conservation via ledger + backend-enforced compliance + idempotency + two-directional fraud boundaries + reconciliation. The oracle is always in the data, not the screen.",
        "面接に持ち込むメッセージ: フィンテック＝元帳による金銭保存＋バックエンド強制のコンプライアンス＋冪等性＋双方向の不正境界＋照合。オラクルは常にデータにあり、画面にはありません。"
      ),
    ],
  },
];

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-fintech-kyc-limits-fraud",
  cover: coverB,
  tags: tags("thucchien", "fintech", "playwright", "api", "realworld", "interview"),
  title: {
    vi: "Thực chiến Fintech: nạp tiền, hạn mức KYC & chống gian lận",
    en: "Fintech in practice: top-up, KYC limits & fraud prevention",
    ja: "実戦フィンテック: 入金・KYC限度額・不正防止",
  },
  summary: {
    vi: "Oracle-first cho fintech: bảo toàn số dư qua sổ cái ghi kép, hạn mức theo tầng KYC thực thi ở backend, idempotency nạp tiền, luật fraud velocity/geo/device, và đối soát với đối tác. Playwright + request context để seed KYC, bơm sự kiện fraud, kiểm ledger cân bằng, xử lý timeout/webhook, CI phân tầng bảo mật dữ liệu và ranh giới AI-agent four-eyes. Kèm góc phỏng vấn.",
    en: "Oracle-first fintech: balance conservation via a double-entry ledger, backend-enforced KYC-tier limits, top-up idempotency, velocity/geo/device fraud rules, and partner reconciliation. Playwright + request context to seed KYC, inject fraud events, verify the ledger balances, handle timeout/webhook, tiered CI with data security and the four-eyes AI-agent boundary. With an interview angle.",
    ja: "オラクル優先のフィンテック: 複式元帳による残高保存、バックエンド強制のKYCティア別限度額、入金の冪等性、速度/地理/デバイスの不正ルール、パートナー照合。Playwright＋リクエストコンテキストでKYCをシードし不正イベントを注入、元帳均衡を検証、タイムアウト/Webhookを処理、データセキュリティ付き階層化CIとフォーアイズのAIエージェント境界。面接の観点付き。",
  },
  pages: buildDoc(pagesB),
};

const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-ecommerce-flashsale-checkout",
  cover: coverA,
  tags: tags("thucchien", "ecommerce", "playwright", "api", "realworld", "interview"),
  title: {
    vi: "Thực chiến TMĐT: kiểm thử checkout trong flash sale (tồn kho & đồng thời cao)",
    en: "E-commerce in practice: testing flash-sale checkout (inventory & high concurrency)",
    ja: "実戦EC: フラッシュセールのチェックアウト検証（在庫と高並行）",
  },
  summary: {
    vi: "Oracle-first cho checkout flash sale: tồn kho không âm, tổng tiền & coupon đúng, máy trạng thái đơn, thanh toán idempotent. Đồng thời cao và race condition qua Promise.all, seed bằng test-only API, mock cổng thanh toán, timeout/webhook/reconciliation, refund, CI phân tầng và ranh giới AI-agent. Kèm góc phỏng vấn.",
    en: "Oracle-first flash-sale checkout: non-negative inventory, correct totals & coupons, order state machine, idempotent payment. High concurrency and race conditions via Promise.all, seeding via a test-only API, mocked payment gateway, timeout/webhook/reconciliation, refunds, tiered CI and the AI-agent boundary. With an interview angle.",
    ja: "オラクル優先のフラッシュセールチェックアウト: 在庫非負、正しい合計とクーポン、注文ステートマシン、冪等な決済。Promise.allによる高並行と競合状態、テスト専用APIでのシード、決済ゲートウェイのモック、タイムアウト/Webhook/照合、返金、階層化CI、AIエージェントの境界。面接の観点付き。",
  },
  pages: buildDoc(pagesA),
};

export const PWLATEST_07 = [artA, artB];
