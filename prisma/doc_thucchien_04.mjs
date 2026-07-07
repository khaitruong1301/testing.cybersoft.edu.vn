// doc_thucchien_04.mjs — 4 bài thucchien: Logistics(COD, routing), Telecom(rating), Gov(eKYC).
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ============================================================================================
// BÀI 1: Logistics — Tracking giao hàng (state machine) & Đối soát COD (thu hộ)
// ============================================================================================

const cover1 = makeThumb({ id: "log-cod-01", domain: "logistics", kind: "thucchien", label: "実戦 · COD RECON" });

const svg1Arch = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Luồng giao hàng COD · COD delivery &amp; reconciliation flow</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="78" text-anchor="middle">Order Service</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="215" y="78" text-anchor="middle">Dispatch/Routing</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="355" y="78" text-anchor="middle">Driver App</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="495" y="78" text-anchor="middle">Bưu cục/Hub</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="635" y="78" text-anchor="middle">COD Ledger</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#94a3b8" stroke-width="2" marker-end="url(#a1)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="215" y="158" text-anchor="middle">State Machine</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="355" y="158" text-anchor="middle">Tracking Event</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="495" y="158" text-anchor="middle">Cash Handover</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="300" y="200" width="260" height="40" rx="8" fill="#052e2b" stroke="#34d399"/><text x="430" y="225" text-anchor="middle" fill="#6ee7b7">Bất biến: Σ COD thu tài xế = Σ COD nộp bưu cục = Σ COD ghi sổ</text>
</g>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg1Matrix = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="15" font-weight="800" fill="#e2e8f0">Ma trận ca kiểm thử COD · COD test case matrix</text>
<g font-size="10.5" fill="#e2e8f0">
<rect x="20" y="44" width="180" height="28" fill="#1e293b" stroke="#334155"/><text x="30" y="62">Ca / Case</text>
<rect x="200" y="44" width="160" height="28" fill="#1e293b" stroke="#334155"/><text x="210" y="62">Trạng thái đơn</text>
<rect x="360" y="44" width="150" height="28" fill="#1e293b" stroke="#334155"/><text x="370" y="62">Số tiền COD</text>
<rect x="510" y="44" width="190" height="28" fill="#1e293b" stroke="#334155"/><text x="520" y="62">Kỳ vọng (Oracle)</text>

<rect x="20" y="72" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="90">Giao thành công, thu đủ</text>
<rect x="200" y="72" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="90">DELIVERED</text>
<rect x="360" y="72" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="90">= giá trị đơn</text>
<rect x="510" y="72" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="90" fill="#6ee7b7">Ledger khớp, không lệch</text>

<rect x="20" y="100" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="118">Giao 1 phần (partial)</text>
<rect x="200" y="100" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="118">PARTIAL_DELIVERED</text>
<rect x="360" y="100" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="118">&lt; giá trị đơn</text>
<rect x="510" y="100" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="118" fill="#fbbf24">Ghi chú lý do bắt buộc</text>

<rect x="20" y="128" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="146">Khách từ chối nhận</text>
<rect x="200" y="128" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="146">REFUSED→RETURNING</text>
<rect x="360" y="128" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="146">= 0</text>
<rect x="510" y="128" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="146" fill="#6ee7b7">Không phát sinh COD</text>

<rect x="20" y="156" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="174">Tài xế nộp thiếu</text>
<rect x="200" y="156" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="174">DELIVERED, chưa remit</text>
<rect x="360" y="156" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="174">thu&gt;nộp</text>
<rect x="510" y="156" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="174" fill="#f87171">Batch đối soát báo lệch</text>

<rect x="20" y="184" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="202">Chuyển trạng thái sai thứ tự</text>
<rect x="200" y="184" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="202">DELIVERED→PICKED_UP</text>
<rect x="360" y="184" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="202">n/a</text>
<rect x="510" y="184" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="202" fill="#f87171">API từ chối 409/422</text>

<rect x="20" y="212" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="230">Webhook trùng lặp</text>
<rect x="200" y="212" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="230">DELIVERED (2 lần gọi)</text>
<rect x="360" y="212" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="230">1 lần cộng sổ</text>
<rect x="510" y="212" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="230" fill="#6ee7b7">Idempotency-Key chặn double</text>

<rect x="20" y="240" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="258">Hoàn hàng sau giao</text>
<rect x="200" y="240" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="258">DELIVERED→RETURNED</text>
<rect x="360" y="240" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="258">hoàn lại COD</text>
<rect x="510" y="240" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="258" fill="#6ee7b7">Bút toán đảo (reversal) khớp</text>
</g>
</svg>`;

const pages1 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một sàn giao hàng chặng cuối (last-mile) tại Việt Nam xử lý trung bình 450.000 đơn/ngày trên toàn quốc, trong đó khoảng 62% là đơn thu hộ COD (Cash On Delivery — thanh toán khi nhận hàng), phần còn lại đã thanh toán trước qua ví điện tử hoặc thẻ. Mỗi đơn COD đi qua chuỗi: người bán tạo đơn → hệ thống điều phối (dispatch) gán tài xế/tuyến → tài xế lấy hàng tại kho hoặc điểm gửi → giao đến khách và thu tiền mặt hoặc quét mã chuyển khoản → tài xế nộp lại tiền cho bưu cục hoặc chuyển khoản trực tiếp về ví nội bộ → hệ thống đối soát khớp số tiền thu với số tiền nộp và với giá trị đơn hàng. SLA giao hàng nội thành cam kết 24 giờ, liên tỉnh 48-72 giờ; SLA đối soát COD với người bán là T+2 ngày làm việc kể từ khi đơn chuyển trạng thái giao thành công.",
        "A last-mile delivery platform in Vietnam processes about 450,000 orders per day nationwide, of which roughly 62% are COD (Cash On Delivery) orders, the rest prepaid via e-wallet or card. Each COD order flows through: seller creates order → dispatch service assigns driver/route → driver picks up at warehouse or drop point → delivers to customer and collects cash or scanned bank transfer → driver remits the cash to the post office/hub or transfers directly to the internal wallet → the system reconciles collected amount against remitted amount and against order value. Inner-city delivery SLA is 24 hours, inter-province 48-72 hours; COD reconciliation SLA to sellers is T+2 business days from delivery-success status.",
        "ベトナムのラストマイル配送プラットフォームは全国で1日あたり約45万件の注文を処理しており、そのうち約62％が代金引換（COD）注文で、残りは電子ウォレットまたはカードでの前払いです。COD注文の流れは次の通りです。出品者が注文を作成→配車（ディスパッチ）サービスがドライバー・ルートを割り当て→ドライバーが倉庫または集荷拠点で荷物を受け取り→顧客に配達して現金または口座振込QRで代金を回収→ドライバーがその現金を郵便局・拠点に納付するか社内ウォレットへ直接送金→システムが回収額と納付額と注文金額を突合します。市内配送のSLAは24時間、県間は48～72時間、出品者へのCOD突合SLAは配達完了ステータスからT+2営業日です。"
      ),
      IMG(svg1Arch, "Kiến trúc & luồng giao hàng COD end-to-end", "End-to-end COD delivery architecture & flow", "COD配送のエンドツーエンド・アーキテクチャとフロー"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API tạo đơn, cập nhật trạng thái, webhook tracking từ tài xế", "Luồng thu hộ COD: ghi nhận thu, nộp về, đối soát batch cuối ngày", "Điều phối/routing: gán tài xế theo khu vực, tải trọng, khung giờ", "Ngoài phạm vi: thuật toán tối ưu tuyến đường chi tiết (do đội Data/OR đảm nhiệm), UI bản đồ"],
        ["Order creation API, status updates, tracking webhooks from drivers", "COD collection flow: record collection, remittance, end-of-day batch reconciliation", "Dispatch/routing: assign driver by zone, load capacity, time window", "Out of scope: detailed route-optimization algorithm (owned by Data/OR team), map UI"],
        ["注文作成API、ステータス更新、ドライバーからの追跡Webhook", "COD回収フロー：回収記録、納付、日次バッチ突合", "配車・ルーティング：エリア・積載量・時間帯によるドライバー割当", "対象外：詳細なルート最適化アルゴリズム（データ/OR チーム担当）、地図UI"]
      ),
      NOTE(
        "Bài này lấy oracle là bất biến số học COD (tổng thu = tổng nộp = tổng ghi sổ) và tính hợp lệ của chuyển trạng thái (state machine), không phải kiểm tra giao diện tài xế.",
        "This article's oracle is the COD arithmetic invariant (collected = remitted = ledgered) and state-machine transition validity, not the driver-app UI.",
        "本稿のオラクルはCODの算術的不変条件（回収額＝納付額＝台帳計上額）と状態遷移の妥当性であり、ドライバーアプリのUI検証ではありません。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 dịch vụ chính: Order Service (nguồn sự thật về đơn hàng và giá trị COD cần thu), Dispatch/Routing Service (gán tài xế và sinh lộ trình), Driver App/Gateway (nhận sự kiện từ thiết bị tài xế: quét mã, chụp ảnh POD - proof of delivery, xác nhận thu tiền), Hub/Bưu cục Service (ghi nhận tài xế nộp tiền mặt về điểm trung chuyển), và COD Ledger Service (sổ cái COD, nơi chạy batch đối soát). Giao tiếp giữa Order Service và Dispatch là đồng bộ qua REST khi tạo đơn, nhưng cập nhật trạng thái từ hiện trường (tracking event) là bất đồng bộ qua message queue (Kafka) để chịu được tải cao giờ cao điểm và cho phép tài xế gửi sự kiện ngay cả khi mất kết nối tạm thời (retry với offline queue trên app).",
        "The architecture has 5 core services: Order Service (source of truth for order and COD amount due), Dispatch/Routing Service (assigns drivers, generates routes), Driver App/Gateway (receives field events: code scans, proof-of-delivery photos, cash-collection confirmation), Hub/Post-office Service (records driver cash remittance at transit points), and COD Ledger Service (the COD ledger, where batch reconciliation runs). Order Service and Dispatch communicate synchronously via REST at order creation, but field status updates (tracking events) are asynchronous via message queue (Kafka) to withstand peak load and let drivers queue events offline during temporary disconnects (retry via on-device offline queue).",
        "アーキテクチャは5つの中核サービスから構成されます。Order Service（注文とCOD回収予定額の正データ源）、Dispatch/Routing Service（ドライバー割当とルート生成）、Driver App/Gateway（コードスキャン、配達証明写真、代金回収確認などの現場イベントを受信）、Hub/郵便局 Service（ドライバーが中継拠点で現金を納付した記録）、そしてCOD Ledger Service（突合バッチを実行するCOD台帳）です。Order ServiceとDispatchは注文作成時にRESTで同期通信しますが、現場からのステータス更新（追跡イベント）はメッセージキュー（Kafka）経由の非同期処理とし、ピーク時の高負荷に耐え、ドライバーが一時的にオフラインでもイベントをキューに溜めて再送できるようにしています。"
      ),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストが難しいポイント"),
      UL(
        ["Tính bất đồng bộ: trạng thái đơn có thể chưa cập nhật ngay sau khi tài xế bấm giao xong, cần chờ/poll", "Đồng thời: nhiều sự kiện webhook cho cùng 1 đơn có thể đến gần như đồng thời, gây race condition", "Thiết bị tài xế offline: sự kiện gửi trễ/gửi lại (retry) có thể gây trùng lặp", "Tiền mặt vật lý: hệ thống chỉ ghi nhận số liệu, không thể tự xác minh tiền mặt thật — phải dựa vào đối soát chéo nhiều nguồn"],
        ["Asynchrony: order status may not update immediately after driver marks delivered, requires wait/poll", "Concurrency: multiple webhook events for the same order can arrive nearly simultaneously, causing race conditions", "Driver device offline: delayed/retried events can cause duplicates", "Physical cash: the system only records figures, cannot verify real cash itself — must rely on cross-source reconciliation"],
        ["非同期性：ドライバーが配達完了を押した直後は注文ステータスがすぐ更新されない場合があり、待機・ポーリングが必要", "並行性：同一注文に対する複数のWebhookイベントがほぼ同時に届き、レースコンディションを引き起こす", "ドライバー端末のオフライン：遅延・再送イベントが重複を引き起こす可能性", "現金の物理性：システムは数値のみを記録し実物の現金は検証できない――複数ソースの相互突合に頼るしかない"]
      ),
      TIP(
        "Khi test bất đồng bộ, đừng sleep() cố định; poll trạng thái đơn qua API nội bộ test-only với timeout hợp lý (ví dụ tối đa 8s, poll mỗi 500ms) để giảm flaky.",
        "When testing asynchronous flows, avoid fixed sleep(); poll order status via a test-only internal API with a reasonable timeout (e.g. max 8s, poll every 500ms) to reduce flakiness.",
        "非同期フローをテストする際は固定のsleep()を避け、テスト専用の内部APIで妥当なタイムアウト（例：最大8秒、500msごとにポーリング）を使って注文ステータスを確認し、フレーキーさを減らしましょう。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể trung tâm là Order với các trường: orderId, codAmount (số tiền cần thu hộ), status (enum theo state machine), driverId, hubId, createdAt, deliveredAt. Thực thể CashCollection ghi nhận mỗi lần tài xế xác nhận thu tiền tại điểm giao: collectionId, orderId, amount, collectedAt, driverId. Thực thể Remittance ghi nhận tài xế nộp tiền về hub: remittanceId, driverId, hubId, totalAmount, orderIds (danh sách đơn được gộp nộp), remittedAt. Cuối cùng, LedgerEntry là bút toán kế toán nội bộ phản ánh dòng tiền COD, luôn đi theo cặp ghi nợ/ghi có để đảm bảo double-entry, giúp phát hiện sai lệch ngay cả khi một phía dữ liệu bị thao túng hoặc lỗi phần mềm.",
        "The central entity is Order with fields: orderId, codAmount (amount to collect), status (enum per state machine), driverId, hubId, createdAt, deliveredAt. The CashCollection entity records each time a driver confirms cash collection at delivery: collectionId, orderId, amount, collectedAt, driverId. The Remittance entity records driver cash handover to hub: remittanceId, driverId, hubId, totalAmount, orderIds (batch of orders remitted together), remittedAt. Finally, LedgerEntry is the internal accounting entry reflecting COD cash flow, always posted in debit/credit pairs for double-entry, helping detect discrepancies even if one side of the data is tampered with or has a software bug.",
        "中心となるエンティティはOrderで、orderId、codAmount（回収予定額）、status（状態遷移に基づくenum）、driverId、hubId、createdAt、deliveredAtというフィールドを持ちます。CashCollectionエンティティはドライバーが配達時に代金回収を確認するたびに記録されます：collectionId、orderId、amount、collectedAt、driverId。Remittanceエンティティはドライバーが拠点へ現金を引き渡した記録です：remittanceId、driverId、hubId、totalAmount、orderIds（まとめて納付された注文の一覧）、remittedAt。最後にLedgerEntryはCODの資金フローを反映する社内会計仕訳で、複式簿記のため常に借方・貸方のペアで計上され、データの一方が改ざんされたりソフトウェア不具合が生じたりしても不一致を検出できるようにします。"
      ),
      H("Bất biến bắt buộc (oracle)", "Mandatory invariants (oracle)", "必須不変条件（オラクル）"),
      UL(
        [
          "Trạng thái đơn chỉ được chuyển theo cạnh hợp lệ trong state machine (không có đường tắt/lùi)",
          "Với mọi đơn đã DELIVERED: Σ CashCollection.amount của đơn đó = Order.codAmount (trừ trường hợp PARTIAL có ghi chú lý do)",
          "Với mọi hub trong 1 kỳ đối soát: Σ Remittance.totalAmount = Σ CashCollection.amount của các đơn thuộc tài xế đó cùng kỳ",
          "Σ LedgerEntry ghi nợ = Σ LedgerEntry ghi có (double-entry cân bằng tuyệt đối, không lệch 1 đồng)",
          "Mỗi CashCollection/Remittance có đúng 1 bản ghi cho 1 sự kiện thật (idempotency theo Idempotency-Key, không nhân đôi do webhook lặp)",
        ],
        [
          "Order status transitions only along valid state-machine edges (no shortcuts/rollbacks)",
          "For every DELIVERED order: Σ CashCollection.amount for that order = Order.codAmount (except PARTIAL with a reason note)",
          "For every hub in a reconciliation period: Σ Remittance.totalAmount = Σ CashCollection.amount of that driver's orders in the same period",
          "Σ LedgerEntry debit = Σ LedgerEntry credit (double-entry balances exactly, zero variance)",
          "Each CashCollection/Remittance maps to exactly one real event (idempotency via Idempotency-Key, no duplication from repeated webhooks)",
        ],
        [
          "注文ステータスは状態遷移図上の有効な辺に沿ってのみ遷移する（近道・巻き戻しは不可）",
          "DELIVEREDになった全注文について：その注文のΣCashCollection.amount＝Order.codAmount（理由付きのPARTIALを除く）",
          "突合期間内の各拠点について：ΣRemittance.totalAmount＝同期間の当該ドライバーの注文のΣCashCollection.amount",
          "ΣLedgerEntry借方＝ΣLedgerEntry貸方（複式簿記が1円単位で完全一致すること）",
          "各CashCollection/Remittanceは実際のイベント1件に対して正確に1レコード対応する（Idempotency-Keyによる冪等性、Webhook重複による二重計上なし）",
        ]
      ),
      WARN(
        "Nếu chỉ assert 'API trả 200' hoặc 'màn hình hiện Đã giao', bài test sẽ bỏ sót toàn bộ lớp rủi ro thất thoát tiền — đây là lỗi thường gặp nhất ở đội QA mới vào domain logistics.",
        "If you only assert 'API returns 200' or 'screen shows Delivered', the test suite will miss the entire class of cash-leakage risks — this is the most common mistake for QA teams new to the logistics domain.",
        "「APIが200を返す」「画面に配達完了と表示される」だけをアサートすると、資金漏えいというリスクの層をまるごと見落とします。これは物流ドメインに不慣れなQAチームが最も陥りやすい誤りです。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất về mặt tài chính là thất thoát COD: tài xế thu tiền khách nhưng không nộp đủ về hub, hoặc hệ thống ghi nhận sai số tiền do lỗi làm tròn/đơn vị tiền tệ. Rủi ro cao thứ hai là trạng thái đơn sai lệch dẫn đến quyết định vận hành sai — ví dụ đơn thực tế đã giao nhưng hệ thống vẫn hiển thị đang vận chuyển khiến tổng đài xử lý khiếu nại sai. Rủi ro thứ ba là race condition khi nhiều tài xế/nhiều thiết bị cùng thao tác một đơn (ví dụ đơn bị gán lại - reassign - trong lúc tài xế cũ đang giao). Với khối lượng 450.000 đơn/ngày và giá trị COD trung bình 380.000đ/đơn, sai số 0.1% trên tổng COD hằng ngày đã tương đương hơn 170 triệu đồng — do đó chiến lược kiểm thử ưu tiên tuyệt đối cho lớp bất biến số học và state machine trước khi đầu tư vào UI.",
        "The highest financial risk is COD leakage: a driver collects cash from the customer but doesn't remit the full amount to the hub, or the system records the wrong figure due to rounding/currency-unit bugs. The second-highest risk is incorrect order status leading to wrong operational decisions — e.g. an order is actually delivered but the system still shows in-transit, causing the call center to mishandle a complaint. The third risk is race conditions when multiple drivers/devices act on the same order concurrently (e.g. an order gets reassigned while the previous driver is still delivering it). At a volume of 450,000 orders/day and average COD value of ~380,000 VND/order, a 0.1% error on daily total COD equals over 170 million VND — so the test strategy prioritizes the arithmetic-invariant and state-machine layer absolutely before investing in UI.",
        "財務上最大のリスクはCODの漏えいです。ドライバーが顧客から代金を回収したのに拠点へ全額納付しない、あるいは丸め誤差や通貨単位のバグでシステムが誤った金額を記録するケースです。二番目に高いリスクは注文ステータスの誤りが誤った運用判断につながることです。例えば実際には配達済みなのにシステムが配送中のままと表示し、コールセンターがクレーム対応を誤るといったケースです。三番目のリスクは複数のドライバー・端末が同一注文に同時に操作するレースコンディションです（前のドライバーが配達中に注文が再割当されるなど）。1日45万件、平均COD額約38万ドンという規模では、日次COD合計に対する0.1％の誤差だけで1億7千万ドン以上に相当します。そのためテスト戦略はUIへの投資より先に、算術的不変条件と状態遷移の層を絶対的に優先します。"
      ),
      H("Kim tự tháp test cho domain COD", "Test pyramid for the COD domain", "CODドメインのテストピラミッド"),
      UL(
        ["70% unit/contract test cho logic tính COD, state machine, double-entry ledger", "20% API/integration test cho luồng cross-service (order→dispatch→driver→ledger)", "10% E2E qua Playwright mô phỏng thao tác tài xế + đối soát cuối ngày"],
        ["70% unit/contract tests for COD calculation logic, state machine, double-entry ledger", "20% API/integration tests for cross-service flow (order→dispatch→driver→ledger)", "10% E2E via Playwright simulating driver actions + end-of-day reconciliation"],
        ["70％：COD計算ロジック、状態遷移、複式簿記台帳のユニット・契約テスト", "20％：クロスサービスフロー（注文→配車→ドライバー→台帳）のAPI・統合テスト", "10％：ドライバー操作と日次突合をシミュレートするPlaywrightによるE2E"]
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Detailed test plan", ja: "5. 詳細なテスト計画" },
    blocks: [
      P(
        "Phạm vi kiểm thử bao gồm: API tạo/cập nhật đơn, webhook tracking, luồng thu-nộp COD, batch đối soát cuối ngày, và các API test-only để seed/reset dữ liệu môi trường staging. Tiêu chí vào (entry criteria): môi trường staging có đầy đủ 5 service, dữ liệu tài xế/hub mẫu đã seed, mock ngân hàng/ví điện tử cho phần chuyển khoản đã sẵn sàng. Tiêu chí ra (exit criteria): 100% ca P0 (bất biến tài chính) pass, không còn defect Sev1/Sev2 mở, coverage ca lỗi state machine ≥ 90% các cạnh không hợp lệ được thử. Vai trò: 1 Test Lead thiết kế ma trận ca và oracle, 2 SDET viết automation API+E2E, 1 QA thủ công phụ trách ca biên đối soát và khám phá (exploratory). Chỉ số theo dõi: tỷ lệ ca pass, số lệch đối soát phát hiện trước khi lên production, thời gian chạy suite CI.",
        "Test scope covers: order create/update API, tracking webhooks, COD collect-remit flow, end-of-day batch reconciliation, and test-only APIs to seed/reset staging data. Entry criteria: staging environment has all 5 services up, sample driver/hub data seeded, bank/e-wallet transfer mocks ready. Exit criteria: 100% of P0 cases (financial invariants) pass, no open Sev1/Sev2 defects, state-machine failure-case coverage ≥ 90% of invalid edges exercised. Roles: 1 Test Lead designs the case matrix and oracle, 2 SDETs write API+E2E automation, 1 manual QA owns reconciliation edge cases and exploratory testing. Tracked metrics: pass rate, number of reconciliation mismatches caught before production, CI suite run time.",
        "テスト範囲は、注文作成・更新API、追跡Webhook、COD回収・納付フロー、日次バッチ突合、およびステージングデータのシード・リセット用テスト専用APIを含みます。入場基準：ステージング環境で5サービスすべてが稼働し、ドライバー・拠点のサンプルデータが投入済みで、銀行・電子ウォレット送金のモックが準備済みであること。退場基準：P0ケース（財務不変条件）が100％合格し、Sev1/Sev2の未解決不具合がゼロで、状態遷移の異常系カバレッジが無効な辺の90％以上に達していること。役割：テストリード1名がケース表とオラクルを設計し、SDET2名がAPI・E2E自動化を実装し、手動QA1名が突合のエッジケースと探索的テストを担当します。追跡指標：合格率、本番投入前に検出した突合不一致件数、CIスイートの実行時間。"
      ),
      NOTE(
        "Test Plan nên tách rõ 'test tài chính' (ưu tiên P0, do Test Lead review kỹ) khỏi 'test trải nghiệm tài xế' (P2) để tránh dồn nguồn lực sai chỗ.",
        "The Test Plan should clearly separate 'financial tests' (P0 priority, closely reviewed by the Test Lead) from 'driver experience tests' (P2) to avoid misallocating resources.",
        "テスト計画では「財務系テスト」（P0優先、テストリードが詳細レビュー）と「ドライバー体験テスト」（P2）を明確に分離し、リソース配分を誤らないようにすべきです。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca dưới đây áp dụng kỹ thuật equivalence partitioning cho trạng thái đơn (hợp lệ/không hợp lệ) kết hợp boundary analysis cho số tiền COD (đúng/thiếu/thừa/0). Mỗi hàng map trực tiếp tới một bất biến đã nêu ở chương 3, giúp truy vết từ ca test ngược về yêu cầu nghiệp vụ khi có audit. Đặt tên ca theo quy ước: COD-<nhóm>-<số thứ tự>, ví dụ COD-SM-01 (state machine), COD-RECON-03 (reconciliation), để dễ lọc trong test-management tool.",
        "The matrix below applies equivalence partitioning for order status (valid/invalid) combined with boundary analysis for COD amount (exact/short/over/zero). Each row maps directly to an invariant from chapter 3, enabling traceability from test case back to business requirement during audits. Case naming convention: COD-<group>-<seq>, e.g. COD-SM-01 (state machine), COD-RECON-03 (reconciliation), for easy filtering in the test-management tool.",
        "以下のマトリクスは注文ステータス（有効／無効）に同値分割を適用し、COD金額（過不足なし／不足／過剰／ゼロ）に境界値分析を組み合わせています。各行は第3章で述べた不変条件に直接対応しており、監査の際にテストケースから業務要件へ逆にトレースできます。ケース命名規則はCOD-<グループ>-<連番>、例えばCOD-SM-01（状態遷移）、COD-RECON-03（突合）とし、テスト管理ツールでの絞り込みを容易にします。"
      ),
      IMG(svg1Matrix, "Ma trận ca kiểm thử COD theo trạng thái & số tiền", "COD test case matrix by status & amount", "ステータスと金額によるCODテストケースマトリクス"),
      TIP(
        "Khi audit yêu cầu bằng chứng test, hãy giữ tên ca test khớp đúng ID bất biến (ví dụ INV-3 trong tài liệu) để rút ngắn thời gian trả lời auditor.",
        "When an audit requests test evidence, keep test-case names matching the invariant ID exactly (e.g. INV-3 in the doc) to shorten auditor response time.",
        "監査でテストエビデンスを求められた際は、テストケース名を不変条件ID（例：文書中のINV-3）と正確に一致させておくと、監査人への回答時間を短縮できます。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Môi trường staging cần API test-only để seed nhanh các kịch bản: tạo đơn với trạng thái tuỳ ý (bỏ qua các bước trung gian chỉ trong môi trường test), seed tài xế/hub mẫu, và reset toàn bộ ledger về trạng thái sạch trước mỗi lần chạy suite. Mock bên thứ ba gồm: cổng thanh toán (cho phần khách chuyển khoản thay vì tiền mặt) và dịch vụ SMS/OTP xác nhận giao hàng. Dữ liệu nhạy cảm như số điện thoại khách hàng cần được ẩn danh hoá (masking) trong môi trường staging để tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.",
        "Staging needs test-only APIs to quickly seed scenarios: create orders in an arbitrary status (skipping intermediate steps, test-environment only), seed sample drivers/hubs, and reset the entire ledger to a clean state before each suite run. Third-party mocks include: payment gateway (for customers who transfer instead of paying cash) and the SMS/OTP delivery-confirmation service. Sensitive data such as customer phone numbers must be masked in staging to comply with Decree 13/2023/ND-CP on personal data protection.",
        "ステージング環境には、シナリオを素早くシードするためのテスト専用APIが必要です。任意のステータスで注文を作成する（中間ステップを省略、テスト環境限定）、サンプルのドライバー・拠点をシードする、各スイート実行前に台帳全体をクリーンな状態にリセットする、などです。サードパーティのモックには決済ゲートウェイ（現金の代わりに振込する顧客向け）と配達確認のSMS/OTPサービスが含まれます。顧客の電話番号などの機密データは、個人データ保護に関する政令13/2023/ND-CPを遵守するため、ステージング環境でマスキングする必要があります。"
      ),
      CODE("typescript",
`// seed-helper.ts — gọi API test-only để chuẩn bị dữ liệu, KHÔNG dùng trong production
export async function seedOrder(request, opts: { status: string; codAmount: number; driverId?: string }) {
  const res = await request.post("/api/test/orders/seed", {
    data: { status: opts.status, codAmount: opts.codAmount, driverId: opts.driverId ?? "drv-auto-01" },
    headers: { "X-Test-Seed-Token": process.env.TEST_SEED_TOKEN! },
  });
  if (!res.ok()) throw new Error(\`Seed order failed: \${res.status()}\`);
  return res.json(); // { orderId, codAmount, status }
}

export async function resetLedger(request) {
  const res = await request.post("/api/test/ledger/reset", {
    headers: { "X-Test-Seed-Token": process.env.TEST_SEED_TOKEN! },
  });
  if (!res.ok()) throw new Error("Reset ledger failed");
}`),
      WARN(
        "Token seed test-only phải khác biệt hoàn toàn với credential production và bị chặn ở tầng WAF/network nếu domain không phải staging — tránh rủi ro API test-only bị lộ ra production.",
        "The test-only seed token must be completely different from production credentials and blocked at the WAF/network layer on any non-staging domain — to avoid the risk of the test-only API leaking into production.",
        "テスト専用のシードトークンは本番の認証情報とは完全に異なるものにし、ステージング以外のドメインではWAF/ネットワーク層でブロックする必要があります――テスト専用APIが本番に漏れるリスクを避けるためです。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: Happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化の実装：ハッピーパス" },
    blocks: [
      P(
        "Ca happy path xác minh vòng đời đầy đủ của một đơn COD: tạo đơn → gán tài xế → tài xế lấy hàng → giao hàng thu đủ tiền → nộp về hub → batch đối soát khớp. Thay vì assert từng bước riêng lẻ theo kiểu 'màn hình hiện thông báo thành công', test dưới đây theo dõi trực tiếp qua API nội bộ và khẳng định bất biến số học ở bước cuối, đúng tinh thần oracle-first đã nêu ở chương 3.",
        "The happy-path case verifies the full lifecycle of a COD order: create → assign driver → driver picks up → deliver and collect full amount → remit to hub → batch reconciliation matches. Instead of asserting each step individually as 'screen shows success message', the test below tracks directly via internal API and asserts the arithmetic invariant at the final step, in the oracle-first spirit from chapter 3.",
        "ハッピーパスのケースは、COD注文のライフサイクル全体を検証します：作成→ドライバー割当→ドライバーが集荷→配達し全額回収→拠点へ納付→バッチ突合が一致。各ステップを「画面に成功メッセージが表示される」というように個別にアサートするのではなく、以下のテストは内部APIを通じて直接追跡し、最終ステップで算術的不変条件をアサートします。これは第3章で述べたオラクルファーストの精神に沿ったものです。"
      ),
      CODE("typescript",
`// happy-path.spec.ts
import { test, expect } from "@playwright/test";
import { seedOrder, resetLedger } from "./seed-helper";

test.beforeEach(async ({ request }) => resetLedger(request));

test("COD order full lifecycle reconciles to zero variance", async ({ request }) => {
  const order = await seedOrder(request, { status: "CREATED", codAmount: 380_000 });

  await request.post(\`/api/orders/\${order.orderId}/assign\`, { data: { driverId: "drv-auto-01" } });
  await request.post(\`/api/orders/\${order.orderId}/pickup\`);
  await request.post(\`/api/orders/\${order.orderId}/deliver\`, {
    data: { collectedAmount: 380_000, idempotencyKey: "evt-deliver-001" },
  });
  await request.post("/api/hub/remit", {
    data: { driverId: "drv-auto-01", orderIds: [order.orderId], totalAmount: 380_000 },
  });

  const recon = await (await request.post("/api/ledger/reconcile/run", { data: { hubId: "hub-01" } })).json();
  expect(recon.variance).toBe(0); // Bất biến: chênh lệch đối soát phải bằng 0
  expect(recon.orders.find((o) => o.orderId === order.orderId).status).toBe("RECONCILED");
});`),
      SCEN(
        "Đội vận hành hỏi khi go-live",
        "Ops team asks before go-live",
        "Trưởng nhóm vận hành hỏi: 'Nếu batch đối soát chạy giữa lúc tài xế đang nộp tiền dở, dữ liệu có bị đọc nửa chừng không?' — QA cần trả lời dựa trên cơ chế transaction/lock của batch, không chỉ nói 'chắc là không sao'.",
        "The ops lead asks: 'If the reconciliation batch runs while a driver's remittance is mid-flight, could it read partial data?' — QA must answer based on the batch's transaction/lock mechanism, not just say 'probably fine'.",
        "運用リーダーからの質問",
        "運用リーダーが「ドライバーの納付処理が進行中に突合バッチが実行されたら、データを中途半端に読んでしまわないか？」と尋ねます。QAは「たぶん大丈夫」ではなく、バッチのトランザクション・ロック機構に基づいて回答する必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi là nơi giá trị nghiệp vụ cao nhất và cũng là nội dung hay bị hỏi nhất trong phỏng vấn senior QA vì nó thể hiện tư duy oracle thay vì học thuộc thao tác click. Bốn nhóm ca lỗi trọng yếu trong domain COD: (1) webhook trùng lặp do tài xế mất mạng gửi lại sự kiện giao hàng, (2) chuyển trạng thái không hợp lệ theo state machine, (3) tài xế nộp thiếu/thừa so với số đã thu, (4) timeout khi gọi batch đối soát với tập dữ liệu lớn cuối tháng.",
        "Failure cases carry the highest business value and are also the most frequently asked topic in senior QA interviews, because they show oracle-based thinking rather than rote click-through. Four key failure-case groups in the COD domain: (1) duplicate webhooks when a driver's device loses network and resends the delivery event, (2) invalid state-machine transitions, (3) driver remits less/more than collected, (4) timeout when running the reconciliation batch against a large end-of-month dataset.",
        "異常系は業務価値が最も高く、単なるクリック操作の暗記ではなくオラクル思考を示すため、シニアQA面接で最も頻繁に問われるトピックでもあります。CODドメインにおける4つの重要な異常系グループ：(1) ドライバー端末がネットワークを失い配達イベントを再送することによるWebhookの重複、(2) 状態遷移として無効な遷移、(3) ドライバーが回収額より少ない/多い額を納付、(4) 月末の大規模データセットに対して突合バッチを実行した際のタイムアウト。"
      ),
      CODE("typescript",
`// idempotency.spec.ts — webhook giao hàng gửi lặp không được cộng dồn 2 lần
test("duplicate delivery webhook does not double the ledger", async ({ request }) => {
  const order = await seedOrder(request, { status: "PICKED_UP", codAmount: 250_000 });
  const payload = { collectedAmount: 250_000, idempotencyKey: "evt-dup-777" };

  const first = await request.post(\`/api/orders/\${order.orderId}/deliver\`, { data: payload });
  const second = await request.post(\`/api/orders/\${order.orderId}/deliver\`, { data: payload }); // gửi lại y hệt

  expect(first.status()).toBe(200);
  expect(second.status()).toBe(200); // idempotent: trả về cùng kết quả, KHÔNG lỗi 500
  const ledger = await (await request.get(\`/api/ledger/orders/\${order.orderId}\`)).json();
  expect(ledger.collections.length).toBe(1); // chỉ 1 bản ghi thu tiền duy nhất
  expect(ledger.totalCollected).toBe(250_000); // không cộng dồn thành 500_000
});`),
      CODE("typescript",
`// invalid-transition.spec.ts — không cho phép lùi/nhảy trạng thái sai state machine
test("cannot transition DELIVERED back to PICKED_UP", async ({ request }) => {
  const order = await seedOrder(request, { status: "DELIVERED", codAmount: 300_000 });
  const res = await request.post(\`/api/orders/\${order.orderId}/transition\`, { data: { to: "PICKED_UP" } });
  expect(res.status()).toBe(409); // Conflict: cạnh không hợp lệ trong state machine
  const body = await res.json();
  expect(body.errorCode).toBe("INVALID_STATE_TRANSITION");
});`),
      CODE("typescript",
`// short-remittance.spec.ts — tài xế nộp thiếu tiền so với đã thu, batch đối soát phải bắt được
test("underpaid remittance is flagged by reconciliation batch", async ({ request }) => {
  const order = await seedOrder(request, { status: "PICKED_UP", codAmount: 500_000 });
  await request.post(\`/api/orders/\${order.orderId}/deliver\`, {
    data: { collectedAmount: 500_000, idempotencyKey: "evt-short-01" },
  });
  // Tài xế chỉ nộp 450_000 thay vì 500_000 (thiếu 50_000)
  await request.post("/api/hub/remit", {
    data: { driverId: "drv-auto-01", orderIds: [order.orderId], totalAmount: 450_000 },
  });

  const recon = await (await request.post("/api/ledger/reconcile/run", { data: { hubId: "hub-01" } })).json();
  expect(recon.variance).toBe(50_000); // Bất biến vi phạm: phải lộ ra đúng số tiền thiếu
  expect(recon.flaggedDrivers).toContain("drv-auto-01");
});`),
      WARN(
        "Không bao giờ làm tròn số tiền COD ở tầng hiển thị trước khi lưu — mọi phép cộng/trừ phải thực hiện trên số nguyên (đơn vị nhỏ nhất, ví dụ đồng) để tránh sai số dồn tích qua hàng trăm nghìn giao dịch/ngày.",
        "Never round the COD amount at the display layer before saving — all additions/subtractions must be performed on integers (smallest unit, e.g. VND) to avoid accumulated rounding error across hundreds of thousands of transactions/day.",
        "表示層でCOD金額を保存前に丸めてはいけません――加減算はすべて最小単位（例：ドン）の整数で行い、1日数十万件の取引にわたる丸め誤差の蓄積を防ぐ必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & đối soát COD (batch)", en: "10. Post-verification & COD reconciliation (batch)", ja: "10. 事後検証とCOD突合（バッチ）" },
    blocks: [
      P(
        "Batch đối soát chạy mỗi ngày lúc 23:30 (giờ ít giao dịch nhất) và xử lý theo từng hub để giới hạn phạm vi lock. Thuật toán: với mỗi hub, gom toàn bộ Remittance trong ngày, so khớp tổng với Σ CashCollection của các đơn DELIVERED thuộc tài xế nộp về hub đó; nếu variance ≠ 0, ghi vào bảng ReconciliationException kèm driverId, orderIds nghi vấn, và gửi cảnh báo cho đội vận hành tài chính trong vòng 15 phút. Ngoài batch hằng ngày, còn có báo cáo tổng hợp tuần đối chiếu chéo với sổ ngân hàng khi tài xế chuyển khoản thay vì nộp tiền mặt, nhằm phát hiện trường hợp giao dịch ngân hàng bị treo (pending) chưa về nhưng hệ thống đã ghi nhận đã thu.",
        "The reconciliation batch runs daily at 23:30 (lowest-traffic hour) and processes per-hub to limit lock scope. Algorithm: for each hub, gather all Remittances for the day, match the total against Σ CashCollection of DELIVERED orders belonging to drivers remitting to that hub; if variance ≠ 0, write to the ReconciliationException table with driverId, suspect orderIds, and alert the finance ops team within 15 minutes. Besides the daily batch, there is a weekly summary report cross-checked against bank statements when drivers transfer instead of remitting cash, to catch bank transactions stuck pending but already recorded as collected in the system.",
        "突合バッチは毎日23時30分（取引量が最も少ない時間帯）に実行され、ロック範囲を限定するため拠点ごとに処理します。アルゴリズム：各拠点について、その日の全Remittanceを集計し、その拠点へ納付するドライバーが担当するDELIVERED注文のΣCashCollectionと突合します。差異（variance）が0でない場合、driverIdと疑わしいorderIdsとともにReconciliationExceptionテーブルへ記録し、15分以内に財務運用チームへアラートを送信します。日次バッチに加えて、ドライバーが現金納付の代わりに振込を行う場合に銀行明細と突き合わせる週次サマリーレポートもあり、システム上は回収済みと記録されているが銀行取引がpending状態のまま反映されていないケースを検出します。"
      ),
      CODE("typescript",
`// reconcile-batch.spec.ts — xác minh batch phát hiện lệch đúng phạm vi 1 hub, không lan sang hub khác
test("reconciliation batch scopes exceptions per hub only", async ({ request }) => {
  await seedOrder(request, { status: "DELIVERED", codAmount: 200_000, driverId: "drv-hubA" });
  await seedOrder(request, { status: "DELIVERED", codAmount: 150_000, driverId: "drv-hubB" });
  // Chỉ hub A bị thiếu tiền nộp
  await request.post("/api/hub/remit", { data: { driverId: "drv-hubA", totalAmount: 150_000, orderIds: [] } });
  await request.post("/api/hub/remit", { data: { driverId: "drv-hubB", totalAmount: 150_000, orderIds: [] } });

  const reconA = await (await request.post("/api/ledger/reconcile/run", { data: { hubId: "hub-A" } })).json();
  const reconB = await (await request.post("/api/ledger/reconcile/run", { data: { hubId: "hub-B" } })).json();
  expect(reconA.variance).toBeGreaterThan(0); // hub A phải bị flag
  expect(reconB.variance).toBe(0); // hub B không bị ảnh hưởng chéo
});`),
      TIP(
        "Đo thời gian chạy batch trên tập dữ liệu production-scale (giả lập 450.000 đơn) trong môi trường staging trước go-live để phát hiện sớm vấn đề timeout/hiệu năng.",
        "Time the batch run against a production-scale dataset (simulate 450,000 orders) in staging before go-live to catch timeout/performance issues early.",
        "本番規模のデータセット（45万件をシミュレート）に対してステージング環境でバッチの実行時間を計測し、go-live前にタイムアウト・性能問題を早期発見しましょう。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD・監視・指標" },
    blocks: [
      P(
        "Pipeline CI chia suite thành 3 stage chạy song song: unit/contract (dưới 3 phút), API/integration (dưới 8 phút, có seed/reset qua test-only API), và E2E (dưới 15 phút, chạy trên 4 shard song song). Gate bắt buộc trước khi merge: 100% ca P0 (bất biến tài chính) pass, coverage state machine không giảm so với baseline. Sau khi lên production, giám sát chạy dashboard theo dõi 3 chỉ số chính theo thời gian thực: variance đối soát hằng ngày (mục tiêu = 0), tỷ lệ đơn bị 'kẹt' quá 2 giờ ở một trạng thái (health của state machine), và tỷ lệ webhook trùng lặp bị chặn bởi idempotency layer (đo lường mức độ ổn định mạng của tài xế).",
        "The CI pipeline splits the suite into 3 parallel stages: unit/contract (under 3 minutes), API/integration (under 8 minutes, with seed/reset via test-only API), and E2E (under 15 minutes, running across 4 parallel shards). Mandatory gate before merge: 100% of P0 cases (financial invariants) pass, state-machine coverage not regressed vs baseline. Post-production, a monitoring dashboard tracks 3 key real-time metrics: daily reconciliation variance (target = 0), rate of orders 'stuck' over 2 hours in one state (state-machine health), and rate of duplicate webhooks blocked by the idempotency layer (measuring driver network stability).",
        "CIパイプラインはスイートを3つの並列ステージに分割します。ユニット・契約（3分以内）、API・統合（8分以内、テスト専用APIによるシード・リセットを含む）、E2E（15分以内、4シャード並列実行）です。マージ前の必須ゲート：P0ケース（財務不変条件）が100％合格し、状態遷移のカバレッジがベースラインから低下していないこと。本番投入後は、監視ダッシュボードでリアルタイムに3つの主要指標を追跡します。日次突合の差異（目標＝0）、1つの状態に2時間以上「詰まった」注文の割合（状態遷移の健全性）、冪等性レイヤーでブロックされた重複Webhookの割合（ドライバーのネットワーク安定性の指標）です。"
      ),
      CODE("yaml",
`# .github/workflows/cod-reconciliation-ci.yml
name: cod-reconciliation-ci
on: [pull_request]
jobs:
  unit-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage
  api-integration:
    needs: unit-contract
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api -- --grep "@P0"
  e2e:
    needs: api-integration
    strategy:
      matrix: { shard: [1, 2, 3, 4] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
  gate:
    needs: [unit-contract, api-integration, e2e]
    runs-on: ubuntu-latest
    steps:
      - run: echo "All P0 invariant gates passed — safe to merge"`),
      NOTE(
        "Alert variance ≠ 0 nên đi kèm runbook rõ ràng (ai xử lý, escalation trong bao lâu) — một dashboard đẹp không có runbook chỉ tạo thêm nhiễu cho đội trực.",
        "A variance ≠ 0 alert should come with a clear runbook (who handles it, escalation timeline) — a nice dashboard without a runbook just adds noise for the on-call team.",
        "差異≠0のアラートには明確なランブック（誰が対応するか、エスカレーションまでの時間）を伴わせるべきです――ランブックのない美しいダッシュボードは当番チームのノイズを増やすだけです。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent hỗ trợ hiệu quả ở 3 việc: (1) sinh ca kiểm thử biên bổ sung từ đặc tả state machine dạng YAML (agent liệt kê hết cạnh hợp lệ/không hợp lệ, con người review và bổ sung ca chưa nghĩ tới), (2) phân loại sơ bộ ReconciliationException theo mẫu lịch sử (agent gợi ý nguyên nhân có khả năng cao nhất: lỗi làm tròn, tài xế gian lận, hay lỗi đồng bộ mạng — con người xác nhận trước khi đóng ticket), (3) tổng hợp báo cáo hằng ngày từ log CI thành ngôn ngữ tự nhiên cho stakeholder không kỹ thuật. Ranh giới rõ ràng: AI KHÔNG được tự động đóng bất kỳ ReconciliationException nào liên quan đến số tiền — mọi quyết định ảnh hưởng tới tiền thật đều cần con người phê duyệt (human-in-the-loop bắt buộc), vì hậu quả sai sót ở đây là tài chính trực tiếp, không thể rollback dễ dàng như một bug UI.",
        "AI Agent is effective for 3 tasks: (1) generating additional edge test cases from a YAML state-machine spec (the agent lists all valid/invalid edges, humans review and add cases not yet considered), (2) preliminary classification of ReconciliationException by historical pattern (the agent suggests the most likely cause: rounding bug, driver fraud, or network sync error — humans confirm before closing the ticket), (3) summarizing daily CI logs into natural language for non-technical stakeholders. Clear boundary: AI must NOT auto-close any ReconciliationException involving money — every decision affecting real cash requires human approval (mandatory human-in-the-loop), because the consequence of an error here is direct financial impact, not easily rolled back like a UI bug.",
        "AIエージェントは次の3つの業務で効果的です。(1) YAML形式の状態遷移仕様から追加のエッジテストケースを生成する（エージェントが有効/無効な辺をすべて列挙し、人間がレビューして見落としていたケースを追加）、(2) 過去のパターンに基づいてReconciliationExceptionを予備分類する（エージェントが最も可能性の高い原因――丸め誤差、ドライバーの不正、ネットワーク同期エラー――を提案し、人間がチケットを閉じる前に確認）、(3) CIログの日次サマリーを非技術系ステークホルダー向けに自然言語でまとめる。明確な境界：AIは金銭に関わるReconciliationExceptionを自動でクローズしてはならず、実際の現金に影響する決定はすべて人間の承認が必須です（human-in-the-loop必須）。ここでの誤りの結果はUIバグのように簡単にロールバックできる話ではなく、直接的な財務影響だからです。"
      ),
      SCEN(
        "Kịch bản dùng AI Agent hỗ trợ triage",
        "Scenario: AI Agent assisting triage",
        "Sáng thứ Hai, dashboard báo 12 ReconciliationException tồn đọng cuối tuần. AI Agent đọc log, phân nhóm: 8 ca do lỗi làm tròn đã biết (đã có fix, chỉ cần re-run), 3 ca nghi ngờ tài xế nộp thiếu thật, 1 ca dữ liệu thiếu do webhook lỗi. Agent đề xuất thứ tự xử lý ưu tiên, nhưng Test Lead vẫn phải xác nhận từng ca thuộc nhóm 'tài xế nộp thiếu thật' trước khi báo đội tài chính làm việc với tài xế.",
        "On Monday morning, the dashboard shows 12 ReconciliationExceptions pending from the weekend. The AI Agent reads the logs and groups them: 8 cases from a known rounding bug (already fixed, just need re-run), 3 cases suspected of genuine driver underpayment, 1 case of missing data from a failed webhook. The agent proposes a priority order, but the Test Lead must still confirm each case in the 'genuine driver underpayment' group before notifying finance to engage the driver.",
        "トリアージを支援するAIエージェントのシナリオ",
        "月曜の朝、ダッシュボードに週末分の未処理ReconciliationExceptionが12件表示されます。AIエージェントがログを読み、既知の丸め誤差によるもの8件（修正済みで再実行のみ必要）、実際のドライバーの納付不足が疑われるもの3件、Webhook失敗によるデータ欠落1件、に分類します。エージェントは処理の優先順位を提案しますが、テストリードは財務チームにドライバー対応を依頼する前に「実際の納付不足」グループの各ケースを必ず確認しなければなりません。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Nếu batch đối soát báo variance = 0 nhưng thực tế tài xế đã gian lận nộp thiếu rồi lại nộp bù ở kỳ sau, bạn phát hiện thế nào?",
        "If the reconciliation batch reports variance = 0 but the driver actually underpaid then compensated in a later period, how would you detect it?",
        "Variance theo kỳ có thể bằng 0 do bù trừ chéo kỳ, nên cần thêm kiểm tra theo từng đơn riêng lẻ (per-order matching) thay vì chỉ tổng theo kỳ, cộng với theo dõi độ trễ giữa deliveredAt và remittedAt — độ trễ bất thường (ví dụ > 3 ngày) là tín hiệu cảnh báo sớm dù tổng số cuối cùng có khớp.",
        "Per-period variance can be zero due to cross-period offsetting, so you need per-order matching in addition to period totals, plus tracking the lag between deliveredAt and remittedAt — an abnormal lag (e.g. > 3 days) is an early warning signal even if the final total matches.",
        "突合バッチがvariance＝0と報告しても、実際にはドライバーが不足分を後の期間で穴埋めしていた場合、どう検出しますか？",
        "期間ごとのvarianceは期をまたぐ相殺により0になり得るため、期間合計だけでなく注文単位のマッチングが必要です。加えてdeliveredAtとremittedAtの間の遅延を追跡し、異常な遅延（例：3日超）は最終合計が一致していても早期警告シグナルとなります。"
      ),
      QA(
        "Bạn thiết kế test cho state machine của đơn hàng như thế nào để đảm bảo không bỏ sót cạnh không hợp lệ?",
        "How would you design tests for the order state machine to ensure no invalid edge is missed?",
        "Vẽ đồ thị đầy đủ N trạng thái, liệt kê tất cả N×N cặp chuyển đổi có thể, đánh dấu cạnh hợp lệ theo đặc tả nghiệp vụ, sau đó viết ca test phủ mọi cạnh KHÔNG hợp lệ (không chỉ test cạnh hợp lệ) để xác nhận API từ chối đúng — đây là kỹ thuật transition-tree/all-pairs áp dụng cho state machine.",
        "Draw the full graph of N states, enumerate all N×N possible transition pairs, mark valid edges per the business spec, then write test cases covering every INVALID edge (not just valid ones) to confirm the API correctly rejects them — this is the transition-tree/all-pairs technique applied to state machines.",
        "無効な遷移を見落とさないよう、注文の状態遷移のテストをどう設計しますか？",
        "N個の状態の完全なグラフを描き、可能なN×N個の遷移ペアをすべて列挙し、業務仕様に基づいて有効な辺をマークします。その後、有効な辺だけでなくすべての無効な辺をカバーするテストケースを書き、APIが正しく拒否することを確認します――これは状態遷移に適用されるトランジションツリー／オールペア技法です。"
      ),
      QA(
        "Vì sao không nên dùng số thực (float) để lưu trữ số tiền COD?",
        "Why should you avoid using floating-point numbers to store COD amounts?",
        "Số thực nhị phân không biểu diễn chính xác một số giá trị thập phân, dẫn đến sai số làm tròn tích luỹ qua hàng trăm nghìn giao dịch/ngày; nên dùng số nguyên ở đơn vị nhỏ nhất (ví dụ đồng, hoặc cent) hoặc kiểu decimal có độ chính xác cố định, và mọi phép toán tài chính cần test riêng ca biên liên quan tới làm tròn.",
        "Binary floating-point cannot exactly represent certain decimal values, causing rounding errors that accumulate across hundreds of thousands of transactions per day; use integers at the smallest unit (e.g. VND or cents) or a fixed-precision decimal type instead, and every financial calculation needs dedicated boundary test cases around rounding.",
        "CODの金額を保存する際に浮動小数点数を使うべきでないのはなぜですか？",
        "2進の浮動小数点数は一部の10進数値を正確に表現できず、1日数十万件の取引にわたって丸め誤差が蓄積します。最小単位（ドンやセントなど）の整数、または固定精度のdecimal型を使うべきであり、すべての financial計算には丸めに関する専用の境界値テストケースが必要です。"
      ),
      SCEN(
        "Phỏng vấn trực tiếp: senior QA cho vị trí logistics",
        "Live interview: senior QA for a logistics role",
        "Nhà tuyển dụng đưa tình huống: 'Một sáng, 200 đơn COD bị kẹt ở trạng thái OUT_FOR_DELIVERY quá 6 giờ, khách hàng gọi khiếu nại dồn dập. Bạn — với vai trò QA — sẽ làm gì đầu tiên?' Câu trả lời tốt cần đi qua: (1) không vội đổ lỗi code, (2) kiểm tra dashboard giám sát trạng thái đơn theo chương 11 để xem đây là sự cố hạ tầng (queue lag) hay lỗi logic, (3) đối chiếu với log webhook xem event có tới nơi không, (4) đề xuất quy trình rollback/tái xử lý an toàn không ảnh hưởng ledger.",
        "The interviewer poses: 'One morning, 200 COD orders are stuck in OUT_FOR_DELIVERY for over 6 hours, and customers are flooding in with complaints. As QA, what's your first move?' A good answer should cover: (1) don't rush to blame the code, (2) check the order-status monitoring dashboard from chapter 11 to see if it's an infrastructure incident (queue lag) or a logic bug, (3) cross-check webhook logs to see if events arrived, (4) propose a safe rollback/reprocessing procedure that doesn't affect the ledger.",
        "実践面接：物流職のシニアQA",
        "面接官が状況を提示します。「ある朝、200件のCOD注文がOUT_FOR_DELIVERYのまま6時間以上詰まり、顧客からのクレームが殺到しています。QAとしてまず何をしますか？」良い回答は次を含むべきです。(1) すぐにコードのせいにしない、(2) 第11章の注文ステータス監視ダッシュボードを確認し、インフラ障害（キュー遅延）かロジックのバグかを見極める、(3) Webhookログと突き合わせてイベントが到達したか確認する、(4) 台帳に影響を与えない安全なロールバック・再処理手順を提案する。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi từ bối cảnh kinh doanh của một nền tảng giao hàng chặng cuối với 450.000 đơn/ngày, qua kiến trúc 5 dịch vụ, tới bộ bất biến cốt lõi làm oracle: tính hợp lệ của state machine và cân bằng số học COD giữa ba nguồn (thu, nộp, sổ cái). Chiến lược kiểm thử ưu tiên lớp bất biến tài chính trước UI, với kim tự tháp 70/20/10 giữa unit-contract, API-integration và E2E. Ca lỗi chuyên sâu — webhook trùng lặp, chuyển trạng thái sai, nộp thiếu — chính là nơi phân biệt một QA thực chiến với một người chỉ biết click qua kịch bản happy path.",
        "This article moved from the business context of a last-mile platform processing 450,000 orders/day, through a 5-service architecture, to the core invariant set serving as oracle: state-machine validity and COD arithmetic balance across three sources (collection, remittance, ledger). The test strategy prioritizes the financial-invariant layer over UI, with a 70/20/10 pyramid across unit-contract, API-integration, and E2E. Deep failure cases — duplicate webhooks, invalid transitions, underpayment — are exactly what separates a real-world QA from someone who only clicks through the happy path.",
        "本稿は1日45万件を処理するラストマイルプラットフォームの事業背景から始まり、5サービスのアーキテクチャを経て、オラクルとなる中核的な不変条件――状態遷移の妥当性と、3つのソース（回収・納付・台帳）間のCOD算術的均衡――にたどり着きました。テスト戦略はUIよりも財務不変条件の層を優先し、ユニット・契約／API・統合／E2Eの70/20/10ピラミッドを採用します。Webhookの重複、無効な状態遷移、納付不足といった高度な異常系こそが、ハッピーパスをクリックするだけの人と実戦的なQAとを分ける決定的な違いです。"
      ),
      UL(
        ["Đã xác định oracle: state machine hợp lệ + Σthu=Σnộp=Σsổ cái", "Đã có ≥6 ca automation code mẫu (happy path + 3 ca lỗi + batch)", "Đã có CI gate 3 tầng và dashboard giám sát 3 chỉ số", "Đã định ranh giới AI Agent: hỗ trợ phân loại, KHÔNG tự đóng exception liên quan tiền"],
        ["Oracle identified: valid state machine + Σcollected=Σremitted=Σledgered", "≥6 sample automation code cases ready (happy path + 3 failure cases + batch)", "3-tier CI gate and 3-metric monitoring dashboard in place", "AI Agent boundary defined: assists classification, does NOT auto-close money-related exceptions"],
        ["オラクルを特定済み：有効な状態遷移＋Σ回収＝Σ納付＝Σ台帳", "サンプル自動化コードケースを6件以上用意済み（ハッピーパス＋異常系3件＋バッチ）", "3段階のCIゲートと3指標の監視ダッシュボードを整備済み", "AIエージェントの境界を定義済み：分類を支援するが、金銭関連の例外を自動クローズしない"]
      ),
      TIP(
        "Khi bàn giao cho đội mới, đính kèm luôn sơ đồ state machine và bảng bất biến — đây là 2 tài liệu tra cứu nhanh nhất khi debug sự cố đối soát lúc nửa đêm.",
        "When handing over to a new team, always attach the state-machine diagram and the invariant table — these are the two fastest reference documents when debugging a reconciliation incident at midnight.",
        "新しいチームに引き継ぐ際は、状態遷移図と不変条件の一覧表を必ず添付してください――これらは真夜中に突合インシデントをデバッグする際に最も速く参照できる2つの資料です。"
      ),
    ],
  },
];

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "logistics-cod-reconciliation",
  cover: cover1,
  tags: tags("thucchien", "logistics", "api", "playwright", "cicd", "realworld"),
  title: {
    vi: "Thực chiến: kiểm thử tracking giao hàng & đối soát COD trong logistics chặng cuối",
    en: "Enterprise: testing last-mile delivery tracking & COD reconciliation in logistics",
    ja: "実戦：物流ラストマイルにおける配送追跡とCOD突合のテスト",
  },
  summary: {
    vi: "Bài sâu 14 chương: bối cảnh logistics COD, kiến trúc 5 dịch vụ, state machine & bất biến số học COD làm oracle, test plan, ma trận ca, code automation happy path & ca lỗi (idempotency, chuyển trạng thái sai, nộp thiếu), batch đối soát, CI/CD, AI Agent, phỏng vấn.",
    en: "A deep 14-chapter piece: COD logistics context, 5-service architecture, state machine & COD arithmetic invariants as oracle, test plan, case matrix, happy-path & failure-case automation code (idempotency, invalid transitions, underpayment), reconciliation batch, CI/CD, AI Agent, interview angle.",
    ja: "全14章の詳細記事：CODロジスティクスの背景、5サービスアーキテクチャ、オラクルとしての状態遷移とCOD算術的不変条件、テスト計画、ケースマトリクス、ハッピーパスと異常系（冪等性、無効な遷移、納付不足）の自動化コード、突合バッチ、CI/CD、AIエージェント、面接の観点。",
  },
  pages: buildDoc(pages1),
};

// ============================================================================================
// BÀI 2: Logistics — Định tuyến & phân công tài xế thời gian thực (realtime), SLA giao hàng
// ============================================================================================

const cover2 = makeThumb({ id: "log-route-02", domain: "logistics", kind: "thucchien", label: "実戦 · ROUTING SLA" });

const svg2Arch = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="280" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc điều phối realtime · Realtime dispatch &amp; routing architecture</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="120" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="80" y="78" text-anchor="middle">Order Intake</text>
<rect x="170" y="50" width="130" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="235" y="78" text-anchor="middle">Routing Engine</text>
<rect x="330" y="50" width="130" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="395" y="78" text-anchor="middle">Assignment Svc</text>
<rect x="490" y="50" width="130" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="555" y="78" text-anchor="middle">WebSocket Gateway</text>
<path d="M140 73 H170 M300 73 H330 M460 73 H490" stroke="#94a3b8" stroke-width="2" marker-end="url(#a2)"/>
<rect x="490" y="130" width="130" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="555" y="158" text-anchor="middle">Driver App (realtime)</text>
<path d="M555 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#a2)"/>
<rect x="330" y="130" width="130" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="395" y="158" text-anchor="middle">SLA Clock Svc</text>
<path d="M395 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="170" y="130" width="130" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="235" y="158" text-anchor="middle">Load Balancer (zone)</text>
<path d="M235 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="240" y="205" width="260" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="370" y="231" text-anchor="middle" fill="#6ee7b7">Bất biến: mỗi đơn ⇔ đúng 1 tài xế đang hoạt động, mọi lúc</text>
</g>
<defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg2Matrix = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="15" font-weight="800" fill="#e2e8f0">Ma trận ca kiểm thử routing/SLA · Routing/SLA test case matrix</text>
<g font-size="10.5" fill="#e2e8f0">
<rect x="20" y="44" width="180" height="28" fill="#1e293b" stroke="#334155"/><text x="30" y="62">Ca / Case</text>
<rect x="200" y="44" width="160" height="28" fill="#1e293b" stroke="#334155"/><text x="210" y="62">Điều kiện</text>
<rect x="360" y="44" width="150" height="28" fill="#1e293b" stroke="#334155"/><text x="370" y="62">Số tài xế gán</text>
<rect x="510" y="44" width="190" height="28" fill="#1e293b" stroke="#334155"/><text x="520" y="62">Kỳ vọng (Oracle)</text>

<rect x="20" y="72" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="90">Gán đơn bình thường</text>
<rect x="200" y="72" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="90">1 tài xế rảnh trong bán kính</text>
<rect x="360" y="72" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="90">= 1</text>
<rect x="510" y="72" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="90" fill="#6ee7b7">Assignment duy nhất, ACK &lt; 3s</text>

<rect x="20" y="100" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="118">2 dispatcher cùng gán 1 đơn</text>
<rect x="200" y="100" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="118">Race condition đồng thời</text>
<rect x="360" y="100" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="118">= 1 (không 2)</text>
<rect x="510" y="100" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="118" fill="#6ee7b7">Lock/CAS chặn double-assign</text>

<rect x="20" y="128" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="146">Tài xế mất kết nối giữa chừng</text>
<rect x="200" y="128" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="146">WS disconnect &gt; 30s</text>
<rect x="360" y="128" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="146">0 → reassign</text>
<rect x="510" y="128" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="146" fill="#fbbf24">Đơn về lại pool, không mất</text>

<rect x="20" y="156" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="174">Không tài xế nào rảnh</text>
<rect x="200" y="156" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="174">Pool = 0 trong bán kính</text>
<rect x="360" y="156" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="174">= 0</text>
<rect x="510" y="156" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="174" fill="#f87171">Đơn PENDING, cảnh báo SLA sắp vỡ</text>

<rect x="20" y="184" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="202">Tài xế nhận đơn 2 nơi cùng lúc</text>
<rect x="200" y="184" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="202">2 assignment cùng driverId</text>
<rect x="360" y="184" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="202">n/a</text>
<rect x="510" y="184" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="202" fill="#f87171">API từ chối 409, giữ đơn cũ</text>

<rect x="20" y="212" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="230">Quá SLA giao</text>
<rect x="200" y="212" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="230">now - assignedAt &gt; SLA</text>
<rect x="360" y="212" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="230">n/a</text>
<rect x="510" y="212" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="230" fill="#6ee7b7">Breach ghi nhận đúng 1 lần</text>

<rect x="20" y="240" width="180" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="258">Load balancing lệch vùng</text>
<rect x="200" y="240" width="160" height="28" fill="#0f172a" stroke="#334155"/><text x="210" y="258">1 zone quá tải, zone khác rảnh</text>
<rect x="360" y="240" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="370" y="258">cân bằng lại</text>
<rect x="510" y="240" width="190" height="28" fill="#0f172a" stroke="#334155"/><text x="520" y="258" fill="#6ee7b7">Độ lệch tải giữa zone &lt; ngưỡng</text>
</g>
</svg>`;

const pages2 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một nền tảng giao hàng chặng cuối tại Việt Nam vận hành đội xe gồm 18.000 tài xế hoạt động đồng thời trong giờ cao điểm, xử lý trung bình 60.000 đơn/giờ trên toàn quốc. Khác với bài toán đối soát COD offline, bài toán ở đây là thời gian thực (realtime): mỗi khi một đơn mới phát sinh, hệ thống điều phối (dispatch) phải chọn đúng 1 tài xế phù hợp trong vòng vài giây, đẩy thông báo qua kênh WebSocket tới thiết bị tài xế, và chờ tài xế xác nhận (ACK) trong cửa sổ thời gian ngắn trước khi coi như từ chối và tìm tài xế khác. SLA cam kết với khách hàng là 'gán tài xế trong 30 giây kể từ khi đơn được xác nhận thanh toán' và 'giao hàng trong 45 phút nội thành' — hai chỉ số SLA hoàn toàn khác nhau về bản chất đo lường nhưng cùng phụ thuộc vào chất lượng của engine định tuyến.",
        "A last-mile delivery platform in Vietnam operates a fleet of 18,000 drivers active concurrently at peak hours, processing an average of 60,000 orders/hour nationwide. Unlike the offline COD-reconciliation problem, this is a realtime problem: whenever a new order appears, the dispatch system must pick exactly one suitable driver within a few seconds, push a notification over a WebSocket channel to the driver's device, and wait for an acknowledgment (ACK) within a short window before treating it as a decline and finding another driver. The customer-facing SLA commits to 'driver assigned within 30 seconds of payment confirmation' and 'delivery within 45 minutes in-city' — two SLA metrics that differ completely in what they measure but both depend on the quality of the routing engine.",
        "ベトナムのラストマイル配送プラットフォームは、ピーク時に同時稼働する1万8000人のドライバーからなる車両群を運用し、全国で1時間あたり平均6万件の注文を処理しています。オフラインのCOD突合の問題とは異なり、ここではリアルタイム性が問われます。新しい注文が発生するたびに、配車（ディスパッチ）システムは数秒以内に適切なドライバーをちょうど1人選び、WebSocketチャネル経由でドライバーの端末に通知をプッシュし、短い時間枠内でドライバーの応答確認（ACK）を待ちます。時間内に応答がなければ辞退とみなし、別のドライバーを探します。顧客向けSLAは「決済確認から30秒以内にドライバーを割当」「市内配送45分以内」の2つで、測定対象はまったく異なりますが、いずれも経路最適化エンジンの品質に依存しています。"
      ),
      IMG(svg2Arch, "Kiến trúc điều phối & định tuyến thời gian thực end-to-end", "End-to-end realtime dispatch & routing architecture", "リアルタイム配車・経路最適化のエンドツーエンド・アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API/WebSocket gán đơn cho tài xế, luồng ACK/từ chối, timeout tự động chuyển tài xế khác", "SLA clock: đo thời gian gán, thời gian giao, phát hiện breach realtime", "Cân bằng tải (load balancing) giữa các zone/khu vực khi phân bổ tài xế", "Ngoài phạm vi: thuật toán tối ưu tuyến đường chi tiết bằng OR-Tools/bản đồ (do đội Data đảm nhiệm), UI bản đồ tài xế"],
        ["Order-to-driver assignment API/WebSocket, ACK/decline flow, automatic reassignment on timeout", "SLA clock: measuring assignment time, delivery time, realtime breach detection", "Load balancing across zones/regions when allocating drivers", "Out of scope: detailed route-optimization algorithm via OR-Tools/maps (owned by the Data team), driver map UI"],
        ["ドライバーへの注文割当API/WebSocket、ACK・辞退フロー、タイムアウト時の自動再割当", "SLAクロック：割当時間・配達時間の測定、リアルタイムの違反検知", "ドライバー配分時のゾーン・地域間の負荷分散", "対象外：OR-Tools・地図による詳細なルート最適化アルゴリズム（データチーム担当）、ドライバー用地図UI"]
      ),
      NOTE(
        "Bài này lấy oracle là tính duy nhất của phép gán (mỗi đơn ⇔ đúng 1 tài xế đang hoạt động tại mọi thời điểm) và độ chính xác của đồng hồ SLA, không phải chất lượng thuật toán tối ưu tuyến đường.",
        "This article's oracle is the uniqueness of assignment (each order maps to exactly one active driver at any point in time) and the accuracy of the SLA clock, not the quality of the route-optimization algorithm itself.",
        "本稿のオラクルは割当の一意性（各注文は常にちょうど1人の稼働中ドライバーに対応する）とSLAクロックの正確性であり、経路最適化アルゴリズム自体の品質ではありません。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 thành phần chính: Order Intake (nhận đơn mới, xác định điểm lấy/giao), Routing Engine (tính khoảng cách, thời gian dự kiến, xếp hạng ứng viên tài xế), Assignment Service (giữ trạng thái gán, xử lý ACK/decline/timeout, đảm bảo tính duy nhất bằng lock phân tán), WebSocket Gateway (kênh hai chiều realtime giữ kết nối bền với hàng chục nghìn thiết bị tài xế), và SLA Clock Service (đo thời gian từ lúc đơn sẵn sàng tới lúc gán, và từ lúc gán tới lúc giao, phát cảnh báo khi gần vỡ SLA). Assignment Service dùng Redis với lệnh SET NX (set-if-not-exists) hoặc Lua script nguyên tử để giữ khoá 'orderId đang được gán cho driverId X', tránh race condition khi engine định tuyến trả về nhiều ứng viên gần như đồng thời cho các dispatcher worker khác nhau.",
        "The architecture has 5 core components: Order Intake (receives new orders, determines pickup/drop points), Routing Engine (computes distance, ETA, ranks candidate drivers), Assignment Service (holds assignment state, handles ACK/decline/timeout, ensures uniqueness via distributed locking), WebSocket Gateway (a realtime bidirectional channel keeping persistent connections with tens of thousands of driver devices), and SLA Clock Service (measures time from order-ready to assigned, and from assigned to delivered, raising alerts as SLA nears breach). The Assignment Service uses Redis SET NX (set-if-not-exists) or an atomic Lua script to hold a lock 'orderId is being assigned to driverId X', preventing race conditions when the routing engine returns multiple candidates nearly simultaneously to different dispatcher workers.",
        "アーキテクチャは5つの中核コンポーネントで構成されます。Order Intake（新規注文を受け付け、集荷・配達地点を確定）、Routing Engine（距離・到着予定時刻を計算し候補ドライバーをランク付け）、Assignment Service（割当状態を保持し、ACK・辞退・タイムアウトを処理し、分散ロックにより一意性を保証）、WebSocket Gateway（数万台のドライバー端末との永続接続を保つリアルタイム双方向チャネル）、そしてSLA Clock Service（注文準備完了から割当までの時間、割当から配達完了までの時間を測定し、SLA違反が近づくとアラートを発する）です。Assignment ServiceはRedisのSET NX（存在しない場合のみセット）またはアトミックなLuaスクリプトを使い「orderIdはdriverId Xに割当中」というロックを保持し、経路最適化エンジンがほぼ同時に複数の候補を異なるディスパッチャーワーカーへ返した際のレースコンディションを防ぎます。"
      ),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストが難しいポイント"),
      UL(
        ["Realtime + concurrency: nhiều đơn/nhiều tài xế xử lý song song, khó tái lập race condition ổn định", "WebSocket bền kết nối: cần mô phỏng mất kết nối, reconnect, và tin nhắn đến trễ/mất gói", "SLA clock phân tán: đồng hồ đo trên nhiều service phải nhất quán, lệch giờ server (clock skew) gây sai số", "Cân bằng tải giữa zone: khó kiểm chứng 'công bằng' bằng một assertion đơn giản, cần đo phân phối thống kê"],
        ["Realtime + concurrency: many orders/drivers processed in parallel, hard to reliably reproduce race conditions", "Persistent WebSocket: need to simulate disconnects, reconnects, and delayed/dropped messages", "Distributed SLA clock: timers measured across multiple services must stay consistent; server clock skew causes error", "Load balancing across zones: 'fairness' is hard to verify with a single simple assertion, requires statistical distribution measurement"],
        ["リアルタイム＋並行性：多数の注文・ドライバーが並列処理され、レースコンディションを安定して再現しにくい", "永続WebSocket：切断、再接続、遅延・喪失メッセージのシミュレーションが必要", "分散SLAクロック：複数サービスにまたがる計測は一貫している必要があり、サーバーのクロックスキュー（時刻のずれ）が誤差を生む", "ゾーン間の負荷分散：「公平性」は単純な1つのアサーションでは検証しにくく、統計的な分布の測定が必要"]
      ),
      TIP(
        "Khi test WebSocket, dựng một test-double client giả lập tài xế có thể chủ động ngắt/nối lại kết nối theo kịch bản, thay vì phụ thuộc app thật để kiểm soát thời điểm mất mạng.",
        "When testing WebSocket, build a test-double client simulating a driver that can deliberately disconnect/reconnect on a scripted schedule, instead of relying on the real app to control the timing of network loss.",
        "WebSocketをテストする際は、実際のアプリに依存してネットワーク切断のタイミングを制御するのではなく、シナリオ通りに意図的に切断・再接続できるドライバー模擬のテストダブルクライアントを構築しましょう。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể trung tâm là Order với các trường: orderId, pickupZone, status (PENDING_ASSIGN, ASSIGNED, PICKED_UP, DELIVERING, DELIVERED, SLA_BREACHED), createdAt, assignedAt, deliveredAt. Thực thể Assignment ghi nhận mỗi lần hệ thống gán đơn cho tài xế: assignmentId, orderId, driverId, offeredAt, ackedAt (nullable), declinedAt (nullable), expiresAt. Thực thể DriverPresence theo dõi trạng thái realtime của tài xế qua WebSocket: driverId, connectionId, lastHeartbeatAt, currentZone, isAvailable. Cuối cùng, SLABreach ghi nhận mỗi lần một mốc SLA bị vi phạm: breachId, orderId, slaType (ASSIGNMENT hoặc DELIVERY), thresholdSeconds, actualSeconds, detectedAt — đây là dữ liệu dùng để tính KPI vận hành và để QA đối chiếu độ chính xác của SLA clock.",
        "The central entity is Order with fields: orderId, pickupZone, status (PENDING_ASSIGN, ASSIGNED, PICKED_UP, DELIVERING, DELIVERED, SLA_BREACHED), createdAt, assignedAt, deliveredAt. The Assignment entity records each time the system offers an order to a driver: assignmentId, orderId, driverId, offeredAt, ackedAt (nullable), declinedAt (nullable), expiresAt. The DriverPresence entity tracks a driver's realtime state via WebSocket: driverId, connectionId, lastHeartbeatAt, currentZone, isAvailable. Finally, SLABreach records each time an SLA milestone is violated: breachId, orderId, slaType (ASSIGNMENT or DELIVERY), thresholdSeconds, actualSeconds, detectedAt — this data drives operational KPIs and is what QA cross-checks against SLA clock accuracy.",
        "中心となるエンティティはOrderで、orderId、pickupZone、status（PENDING_ASSIGN、ASSIGNED、PICKED_UP、DELIVERING、DELIVERED、SLA_BREACHED）、createdAt、assignedAt、deliveredAtというフィールドを持ちます。Assignmentエンティティはシステムがドライバーへ注文を提示するたびに記録します：assignmentId、orderId、driverId、offeredAt、ackedAt（null可）、declinedAt（null可）、expiresAt。DriverPresenceエンティティはWebSocket経由でドライバーのリアルタイム状態を追跡します：driverId、connectionId、lastHeartbeatAt、currentZone、isAvailable。最後にSLABreachはSLAのマイルストーン違反を記録します：breachId、orderId、slaType（ASSIGNMENTまたはDELIVERY）、thresholdSeconds、actualSeconds、detectedAt。このデータは運用KPIの算出に使われ、QAがSLAクロックの正確性を突き合わせる対象でもあります。"
      ),
      H("Bất biến bắt buộc (oracle)", "Mandatory invariants (oracle)", "必須不変条件（オラクル）"),
      UL(
        [
          "Tại mọi thời điểm t, mỗi đơn ở trạng thái ASSIGNED trở đi có đúng 1 Assignment đang 'active' (ackedAt khác null và chưa hoàn tất/huỷ) — không trùng, không bỏ sót",
          "Một driverId không thể có 2 Assignment 'active' chồng lấp thời gian (không thể giao 2 đơn cùng lúc trên cùng 1 tài xế)",
          "Mọi Assignment hết hạn (quá expiresAt mà chưa ACK) phải tự động chuyển đơn về PENDING_ASSIGN để tìm tài xế khác — không được để đơn 'treo' vô thời hạn",
          "SLABreach.actualSeconds phải bằng đúng chênh lệch giữa 2 mốc thời gian đo trên cùng 1 nguồn đồng hồ tin cậy (server time, không dùng giờ client tài xế)",
          "Tổng số đơn đang PENDING_ASSIGN + ASSIGNED + đang giao phải luôn khớp với tổng đơn active trong Order Intake (không có đơn bị 'rơi' giữa các service)",
        ],
        [
          "At any point in time t, every order in ASSIGNED status or beyond has exactly one 'active' Assignment (ackedAt not null and not yet completed/cancelled) — no duplicates, none missing",
          "A driverId cannot have 2 overlapping 'active' Assignments (a single driver cannot be delivering 2 orders at the same time)",
          "Every expired Assignment (past expiresAt without ACK) must automatically return the order to PENDING_ASSIGN to find another driver — no order may be left hanging indefinitely",
          "SLABreach.actualSeconds must exactly equal the difference between two timestamps measured on the same trusted clock source (server time, never the driver client's clock)",
          "The sum of orders in PENDING_ASSIGN + ASSIGNED + in-delivery must always match the total active orders in Order Intake (no order may be 'dropped' between services)",
        ],
        [
          "任意の時点tにおいて、ASSIGNED以降のステータスにある各注文には、正確に1件の「アクティブな」Assignment（ackedAtがnullでなく、完了・取消もされていない）が存在する――重複なし、漏れなし",
          "1つのdriverIdが時間的に重複する2件の「アクティブな」Assignmentを持つことはできない（同一ドライバーが同時に2件の注文を配達することはできない）",
          "期限切れ（expiresAtを過ぎてもACKなし）のAssignmentはすべて自動的に注文をPENDING_ASSIGNへ戻し、別のドライバーを探す――注文を無期限に「宙ぶらりん」にしてはならない",
          "SLABreach.actualSecondsは、同一の信頼できる時刻ソース（サーバー時刻。ドライバー端末の時刻は使わない）で測定された2つのタイムスタンプの差と正確に一致しなければならない",
          "PENDING_ASSIGN＋ASSIGNED＋配達中の注文の合計は、常にOrder Intakeにおけるアクティブな注文の合計と一致しなければならない（サービス間で注文が「消える」ことがあってはならない）",
        ]
      ),
      WARN(
        "Nếu chỉ assert 'WebSocket nhận được tin nhắn gán đơn', bài test sẽ bỏ sót toàn bộ lớp rủi ro gán trùng/gán mất — đây là lỗi thường gặp khi đội QA quen với REST request-response nhưng chưa quen tư duy trạng thái phân tán realtime.",
        "If you only assert 'the WebSocket received an assignment message', the test suite will miss the entire class of duplicate/lost-assignment risks — a common mistake for QA teams used to REST request-response but unfamiliar with distributed realtime state thinking.",
        "「WebSocketが割当メッセージを受信した」ことだけをアサートすると、割当の重複・消失というリスクの層をまるごと見落とします。これはRESTのリクエスト・レスポンスには慣れていても分散リアルタイム状態の考え方に不慣れなQAチームが陥りやすい誤りです。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất là gán trùng (double-assignment): hai dispatcher worker cùng chọn một tài xế cho hai đơn khác nhau gần như đồng thời, khiến tài xế nhận 2 thông báo xung đột — hậu quả trực tiếp là khách hàng chờ vô ích và uy tín thương hiệu giảm. Rủi ro cao thứ hai là đơn 'mồ côi' (orphaned order): do lỗi timeout hoặc service crash giữa chừng, đơn không được gán lại và biến mất khỏi tầm quan sát của dispatcher cho tới khi khách hàng gọi khiếu nại. Rủi ro thứ ba là SLA clock sai lệch do đồng bộ giờ giữa các service không chuẩn (clock skew), khiến báo cáo SLA cho ban giám đốc sai số liệu thực tế. Với quy mô 60.000 đơn/giờ giờ cao điểm, dù tỷ lệ lỗi gán trùng chỉ 0.05% cũng tương đương 30 đơn/giờ bị ảnh hưởng — đủ để gây làn sóng khiếu nại trên mạng xã hội nếu xảy ra đồng loạt.",
        "The highest risk is double-assignment: two dispatcher workers pick the same driver for two different orders nearly simultaneously, causing the driver to receive two conflicting notifications — the direct consequence is wasted customer wait time and reduced brand trust. The second-highest risk is an 'orphaned' order: due to a timeout bug or mid-flight service crash, the order never gets reassigned and disappears from the dispatcher's view until the customer calls in to complain. The third risk is SLA clock drift from improper time synchronization between services (clock skew), causing SLA reports to management to misrepresent reality. At a scale of 60,000 orders/hour at peak, even a 0.05% double-assignment rate equals 30 affected orders/hour — enough to trigger a wave of social-media complaints if it happens in a burst.",
        "最大のリスクは二重割当（double-assignment）です。2つのディスパッチャーワーカーがほぼ同時に異なる2つの注文に対して同じドライバーを選び、ドライバーが矛盾する2つの通知を受け取ってしまいます。直接的な結果は顧客の無駄な待ち時間とブランド信頼の低下です。二番目に高いリスクは「孤児」注文です。タイムアウトのバグやサービスの途中クラッシュにより、注文が再割当されずディスパッチャーの視界から消え、顧客がクレーム電話をかけるまで気づかれません。三番目のリスクはサービス間の時刻同期の不備（クロックスキュー）によるSLAクロックのずれで、経営陣へのSLAレポートが実態を正しく反映しなくなります。ピーク時1時間あたり6万件という規模では、二重割当率がわずか0.05％でも1時間に30件の影響注文に相当し、まとめて発生すればSNS上の苦情の波を引き起こすのに十分です。"
      ),
      H("Kim tự tháp test cho domain routing realtime", "Test pyramid for the realtime routing domain", "リアルタイムルーティングドメインのテストピラミッド"),
      UL(
        ["65% unit/contract test cho logic gán, khoá phân tán, tính toán SLA clock", "25% API/WebSocket integration test cho luồng offer→ACK/decline→reassign", "10% E2E + load test (k6) mô phỏng bão đơn giờ cao điểm và đo độ trễ p95/p99"],
        ["65% unit/contract tests for assignment logic, distributed locking, SLA clock calculation", "25% API/WebSocket integration tests for the offer→ACK/decline→reassign flow", "10% E2E + load test (k6) simulating a peak-hour order surge and measuring p95/p99 latency"],
        ["65％：割当ロジック、分散ロック、SLAクロック計算のユニット・契約テスト", "25％：offer→ACK/辞退→再割当フローのAPI・WebSocket統合テスト", "10％：ピーク時の注文急増をシミュレートし、p95/p99レイテンシを測定するE2E＋負荷テスト（k6）"]
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Detailed test plan", ja: "5. 詳細なテスト計画" },
    blocks: [
      P(
        "Phạm vi kiểm thử bao gồm: API/WebSocket gán đơn, luồng ACK/decline/timeout, SLA clock, cân bằng tải giữa zone, và các API test-only để mô phỏng số lượng tài xế/đơn ở quy mô lớn trên staging. Tiêu chí vào (entry criteria): môi trường staging có đầy đủ 5 service, WebSocket Gateway chịu được ít nhất 2.000 kết nối đồng thời trong test, đồng hồ server đã đồng bộ NTP giữa các node. Tiêu chí ra (exit criteria): 100% ca P0 (tính duy nhất của assignment) pass, độ trễ gán p95 < 3 giây dưới tải mô phỏng 60.000 đơn/giờ, 0 đơn mồ côi phát hiện sau 24 giờ chạy soak test. Vai trò: 1 Test Lead thiết kế ma trận ca và oracle, 2 SDET viết automation API/WebSocket + kịch bản k6, 1 QA thủ công phụ trách ca biên mạng chập chờn và khám phá (exploratory) trên thiết bị thật. Chỉ số theo dõi: tỷ lệ gán trùng phát hiện, độ trễ gán p50/p95/p99, số breach SLA/giờ.",
        "Test scope covers: order-assignment API/WebSocket, ACK/decline/timeout flow, SLA clock, load balancing across zones, and test-only APIs to simulate large-scale driver/order counts on staging. Entry criteria: staging has all 5 services up, the WebSocket Gateway can sustain at least 2,000 concurrent connections under test, server clocks are NTP-synced across nodes. Exit criteria: 100% of P0 cases (assignment uniqueness) pass, p95 assignment latency < 3 seconds under simulated 60,000 orders/hour load, 0 orphaned orders found after a 24-hour soak test. Roles: 1 Test Lead designs the case matrix and oracle, 2 SDETs write API/WebSocket automation plus k6 scripts, 1 manual QA owns flaky-network edge cases and exploratory testing on real devices. Tracked metrics: double-assignment detection rate, p50/p95/p99 assignment latency, SLA breaches/hour.",
        "テスト範囲は、注文割当API/WebSocket、ACK・辞退・タイムアウトのフロー、SLAクロック、ゾーン間の負荷分散、およびステージングで大規模なドライバー・注文数をシミュレートするテスト専用APIを含みます。入場基準：ステージング環境で5サービスすべてが稼働し、WebSocket Gatewayがテスト中に少なくとも2,000の同時接続に耐えられ、サーバー時刻がノード間でNTP同期されていること。退場基準：P0ケース（割当の一意性）が100％合格し、6万件/時間のシミュレート負荷下で割当レイテンシp95が3秒未満であり、24時間のソークテスト後に孤児注文が0件であること。役割：テストリード1名がケース表とオラクルを設計し、SDET2名がAPI・WebSocket自動化とk6スクリプトを実装し、手動QA1名が不安定なネットワークのエッジケースと実機での探索的テストを担当します。追跡指標：二重割当の検出率、割当レイテンシp50/p95/p99、1時間あたりのSLA違反件数。"
      ),
      NOTE(
        "Test Plan nên tách rõ 'test tính đúng đắn' (P0, phải pass 100%) khỏi 'test hiệu năng dưới tải' (P1, có ngưỡng chấp nhận, không phải nhị phân pass/fail tuyệt đối) để tránh gate CI quá cứng nhắc.",
        "The Test Plan should clearly separate 'correctness tests' (P0, must pass 100%) from 'load-performance tests' (P1, with acceptance thresholds, not an absolute binary pass/fail) to avoid an overly rigid CI gate.",
        "テスト計画では「正当性テスト」（P0、100％合格必須）と「負荷性能テスト」（P1、許容閾値があり絶対的な合格/不合格の二値ではない）を明確に分離し、CIゲートが硬直的になりすぎないようにすべきです。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca dưới đây áp dụng decision table kết hợp giữa trạng thái tài xế (rảnh/bận/mất kết nối) và số lượng ứng viên khả dụng (0/1/nhiều), vì hành vi hệ thống mong đợi thay đổi hoàn toàn tuỳ tổ hợp này. Mỗi hàng map trực tiếp tới một bất biến đã nêu ở chương 3. Đặt tên ca theo quy ước ROUTE-<nhóm>-<số thứ tự>, ví dụ ROUTE-ASSIGN-01 (tính duy nhất), ROUTE-SLA-02 (đo SLA), để dễ lọc trong test-management tool và dễ trace khi có sự cố production.",
        "The matrix below applies a decision table combining driver state (available/busy/disconnected) with the number of available candidates (0/1/many), since expected system behavior changes entirely depending on this combination. Each row maps directly to an invariant from chapter 3. Case naming convention: ROUTE-<group>-<seq>, e.g. ROUTE-ASSIGN-01 (uniqueness), ROUTE-SLA-02 (SLA measurement), for easy filtering in the test-management tool and traceability during production incidents.",
        "以下のマトリクスは、ドライバーの状態（空き／稼働中／切断）と利用可能な候補数（0／1／複数）を組み合わせたデシジョンテーブルを適用しています。この組み合わせによってシステムの期待動作がまったく変わるためです。各行は第3章で述べた不変条件に直接対応します。ケース命名規則はROUTE-<グループ>-<連番>、例えばROUTE-ASSIGN-01（一意性）、ROUTE-SLA-02（SLA測定）とし、テスト管理ツールでの絞り込みと本番障害時のトレースを容易にします。"
      ),
      IMG(svg2Matrix, "Ma trận ca kiểm thử routing theo điều kiện & số tài xế", "Routing test case matrix by condition & driver count", "条件とドライバー数によるルーティングテストケースマトリクス"),
      TIP(
        "Khi ma trận có tổ hợp lớn (trạng thái × zone × tải), ưu tiên pairwise testing thay vì full combinatorial để giữ số ca automation ở mức khả thi mà vẫn phủ phần lớn tương tác đôi có rủi ro cao.",
        "When the matrix has a large number of combinations (state × zone × load), prefer pairwise testing over full combinatorial coverage to keep the automation case count feasible while still covering most high-risk pairwise interactions.",
        "マトリクスの組み合わせが多い場合（状態×ゾーン×負荷）、全組み合わせ網羅ではなくペアワイズテストを優先し、自動化ケース数を現実的に保ちながら、リスクの高いペア相互作用の大部分をカバーしましょう。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Môi trường staging cần API test-only để: seed nhanh N tài xế giả lập đang online với vị trí GPS tuỳ ý, seed đơn hàng với zone/thời điểm tuỳ ý, và giả lập độ trễ mạng/mất kết nối có kiểm soát cho một tập con tài xế cụ thể. Bộ giả lập tài xế (driver simulator) là một client nhẹ kết nối WebSocket thật, gửi heartbeat định kỳ và có thể lập trình để ACK, từ chối, hoặc im lặng (giả lập mất mạng) theo kịch bản test. Vì tài khoản tài xế thật gắn với số điện thoại, dữ liệu test cần dùng dải số ảo (virtual number pool) tách biệt hoàn toàn khỏi production để tuân thủ Nghị định 13/2023/NĐ-CP.",
        "Staging needs test-only APIs to: quickly seed N simulated online drivers with arbitrary GPS positions, seed orders with arbitrary zone/timing, and controllably simulate network latency/disconnection for a specific subset of drivers. The driver simulator is a lightweight client with a real WebSocket connection, sending periodic heartbeats and programmable to ACK, decline, or stay silent (simulating network loss) per test scenario. Since real driver accounts are tied to phone numbers, test data should use a virtual number pool fully separated from production to comply with Decree 13/2023/ND-CP.",
        "ステージング環境には次のテスト専用APIが必要です。任意のGPS位置を持つN人のオンラインドライバーを素早くシードする、任意のゾーン・タイミングで注文をシードする、特定のドライバーのサブセットに対してネットワーク遅延・切断を制御可能な形でシミュレートする、です。ドライバーシミュレーターは実際のWebSocket接続を持つ軽量クライアントで、定期的にハートビートを送信し、テストシナリオに応じてACK・辞退・沈黙（ネットワーク喪失のシミュレート）をプログラム可能です。実際のドライバーアカウントは電話番号に紐づくため、テストデータは本番から完全に分離された仮想番号プールを使用し、個人データ保護に関する政令13/2023/ND-CPを遵守する必要があります。"
      ),
      CODE("typescript",
`// driver-simulator.ts — client WebSocket giả lập tài xế cho test, KHÔNG dùng production
import WebSocket from "ws";

export function makeDriverSimulator(driverId: string, opts: { autoAck?: boolean; silent?: boolean } = {}) {
  const ws = new WebSocket(\`wss://staging.example.com/ws/driver?driverId=\${driverId}\`);
  const received: any[] = [];

  ws.on("open", () => {
    const heartbeat = setInterval(() => {
      if (opts.silent) return; // giả lập mất mạng: không gửi heartbeat
      ws.send(JSON.stringify({ type: "HEARTBEAT", driverId, at: Date.now() }));
    }, 5000);
    ws.on("close", () => clearInterval(heartbeat));
  });

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());
    received.push(msg);
    if (msg.type === "OFFER" && opts.autoAck && !opts.silent) {
      ws.send(JSON.stringify({ type: "ACK", assignmentId: msg.assignmentId, driverId }));
    }
  });

  return { ws, received, disconnect: () => ws.close() };
}`),
      WARN(
        "Token/kênh test-only phải tách biệt hoàn toàn khỏi hạ tầng WebSocket production và bị chặn ở tầng network nếu domain không phải staging — tránh rủi ro driver simulator vô tình kết nối vào production.",
        "The test-only token/channel must be completely separated from the production WebSocket infrastructure and blocked at the network layer on any non-staging domain — to avoid the risk of the driver simulator accidentally connecting to production.",
        "テスト専用のトークン・チャネルは本番のWebSocketインフラと完全に分離し、ステージング以外のドメインではネットワーク層でブロックする必要があります――ドライバーシミュレーターが誤って本番に接続するリスクを避けるためです。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: Happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化の実装：ハッピーパス" },
    blocks: [
      P(
        "Ca happy path xác minh vòng đời gán đơn đầy đủ: đơn mới xuất hiện → routing engine chọn ứng viên → gửi offer qua WebSocket → tài xế ACK trong cửa sổ thời gian → assignment chuyển sang active → SLA clock ghi nhận thời gian gán đúng ngưỡng. Test dưới đây dùng driver simulator thật kết nối WebSocket, không mock ở tầng giao thức, để bắt được cả lỗi tầng transport lẫn lỗi logic nghiệp vụ, đúng tinh thần oracle-first: khẳng định tính duy nhất của assignment thay vì chỉ 'tài xế nhận được thông báo'.",
        "The happy-path case verifies the full assignment lifecycle: a new order appears → the routing engine picks a candidate → an offer is sent over WebSocket → the driver ACKs within the time window → the assignment becomes active → the SLA clock records the assignment time within threshold. The test below uses a real WebSocket-connected driver simulator, not a protocol-layer mock, to catch both transport-layer and business-logic errors, in the oracle-first spirit: asserting assignment uniqueness rather than just 'the driver received a notification'.",
        "ハッピーパスのケースは、割当のライフサイクル全体を検証します：新規注文が発生→経路最適化エンジンが候補を選択→WebSocket経由でofferを送信→ドライバーが時間枠内にACK→割当がアクティブになる→SLAクロックが割当時間を閾値内で記録。以下のテストはプロトコル層のモックではなく実際にWebSocket接続するドライバーシミュレーターを使い、トランスポート層とビジネスロジック両方のエラーを捕捉します。これはオラクルファーストの精神に沿ったもので、「ドライバーが通知を受け取った」だけでなく割当の一意性をアサートします。"
      ),
      CODE("typescript",
`// happy-path.spec.ts
import { test, expect } from "@playwright/test";
import { makeDriverSimulator } from "./driver-simulator";
import { seedOrder, seedDriverOnline, resetDispatchState } from "./seed-helper";

test.beforeEach(async ({ request }) => resetDispatchState(request));

test("order gets assigned to exactly one available driver within SLA", async ({ request }) => {
  await seedDriverOnline(request, { driverId: "drv-sim-01", zone: "hcm-q1" });
  const sim = makeDriverSimulator("drv-sim-01", { autoAck: true });
  await new Promise((r) => sim.ws.on("open", r));

  const t0 = Date.now();
  const order = await seedOrder(request, { pickupZone: "hcm-q1" });

  // poll trạng thái đơn qua API nội bộ thay vì sleep cố định
  let assigned;
  for (let i = 0; i < 20 && !assigned; i++) {
    await new Promise((r) => setTimeout(r, 300));
    const res = await (await request.get(\`/api/orders/\${order.orderId}\`)).json();
    if (res.status === "ASSIGNED") assigned = res;
  }

  expect(assigned).toBeTruthy();
  expect(assigned.driverId).toBe("drv-sim-01");
  expect(Date.now() - t0).toBeLessThan(3000); // SLA gán < 3s trong môi trường test

  const assignments = await (await request.get(\`/api/orders/\${order.orderId}/assignments\`)).json();
  expect(assignments.filter((a) => a.status === "ACTIVE").length).toBe(1); // đúng 1 active
  sim.disconnect();
});`),
      SCEN(
        "Đội vận hành hỏi khi go-live",
        "Ops team asks before go-live",
        "Trưởng nhóm vận hành hỏi: 'Nếu 3 dispatcher worker cùng nhận tín hiệu 1 tài xế rảnh trong cùng 1 mili-giây, làm sao chỉ 1 worker thắng?' — QA cần trả lời dựa trên cơ chế lock phân tán (Redis SET NX/Lua) chứ không chỉ nói 'hệ thống tự xử lý được'.",
        "The ops lead asks: 'If 3 dispatcher workers all see the same available driver in the same millisecond, how does only one worker win?' — QA must answer based on the distributed-lock mechanism (Redis SET NX/Lua), not just say 'the system handles it'.",
        "運用リーダーからの質問",
        "運用リーダーが「3つのディスパッチャーワーカーが同じミリ秒に同一の空きドライバーを検知した場合、なぜ1つのワーカーだけが勝つのか」と尋ねます。QAは「システムが自動的に処理する」ではなく、分散ロック機構（Redis SET NX/Luaスクリプト）に基づいて回答する必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi là nơi giá trị nghiệp vụ cao nhất trong bài toán realtime vì hầu hết bug nghiêm trọng của hệ thống dispatch không nằm ở happy path mà ở các tình huống đồng thời/biên. Bốn nhóm ca lỗi trọng yếu: (1) hai dispatcher cùng cố gán một tài xế cho hai đơn khác nhau gần như đồng thời (double-assignment race condition), (2) tài xế mất kết nối WebSocket giữa lúc đang giữ một assignment active, (3) không còn tài xế nào khả dụng trong bán kính khiến đơn treo và có nguy cơ vỡ SLA, (4) tài xế cố ACK 2 đơn cùng lúc từ 2 thiết bị/phiên khác nhau.",
        "Failure cases carry the highest business value in the realtime problem, because most severe dispatch-system bugs live not in the happy path but in concurrent/edge situations. Four key failure-case groups: (1) two dispatchers simultaneously trying to assign the same driver to two different orders (double-assignment race condition), (2) a driver loses WebSocket connection while holding an active assignment, (3) no driver available within radius, leaving the order stuck and at risk of SLA breach, (4) a driver attempts to ACK 2 orders at once from 2 different devices/sessions.",
        "異常系はリアルタイムの問題において業務価値が最も高いです。ディスパッチシステムの重大なバグの多くはハッピーパスではなく、並行・境界の状況に存在するからです。4つの重要な異常系グループ：(1) 2つのディスパッチャーがほぼ同時に異なる2つの注文に同じドライバーを割り当てようとする（二重割当のレースコンディション）、(2) アクティブな割当を保持中にドライバーがWebSocket接続を失う、(3) 半径内に利用可能なドライバーがおらず、注文が滞留してSLA違反のリスクがある、(4) ドライバーが2つの異なる端末・セッションから同時に2件の注文にACKしようとする。"
      ),
      CODE("typescript",
`// double-assignment.spec.ts — 2 dispatcher cùng cố gán 1 tài xế, chỉ 1 được thắng
test("concurrent dispatch attempts on the same driver resolve to exactly one winner", async ({ request }) => {
  await seedDriverOnline(request, { driverId: "drv-race-01", zone: "hn-cg" });
  const orderA = await seedOrder(request, { pickupZone: "hn-cg" });
  const orderB = await seedOrder(request, { pickupZone: "hn-cg" });

  // gọi song song 2 request "gán thử" cùng driverId cho 2 đơn khác nhau
  const [resA, resB] = await Promise.all([
    request.post(\`/api/dispatch/try-assign\`, { data: { orderId: orderA.orderId, driverId: "drv-race-01" } }),
    request.post(\`/api/dispatch/try-assign\`, { data: { orderId: orderB.orderId, driverId: "drv-race-01" } }),
  ]);

  const results = [resA, resB];
  const wins = results.filter((r) => r.status() === 200);
  const conflicts = results.filter((r) => r.status() === 409);
  expect(wins.length).toBe(1); // đúng 1 request thắng lock
  expect(conflicts.length).toBe(1); // request còn lại bị từ chối rõ ràng, không âm thầm ghi đè
});`),
      CODE("typescript",
`// disconnect-reassign.spec.ts — tài xế mất kết nối giữa chừng, đơn phải quay lại pool
test("order is reassigned after driver disconnects mid-assignment", async ({ request }) => {
  await seedDriverOnline(request, { driverId: "drv-drop-01", zone: "dn-hc" });
  const sim = makeDriverSimulator("drv-drop-01", { autoAck: true });
  await new Promise((r) => sim.ws.on("open", r));

  const order = await seedOrder(request, { pickupZone: "dn-hc" });
  await waitForStatus(request, order.orderId, "ASSIGNED"); // helper poll nội bộ

  sim.disconnect(); // mô phỏng mất mạng đột ngột SAU khi đã ACK
  await new Promise((r) => setTimeout(r, 35_000)); // vượt ngưỡng heartbeat timeout 30s

  const current = await (await request.get(\`/api/orders/\${order.orderId}\`)).json();
  expect(["PENDING_ASSIGN", "ASSIGNED"]).toContain(current.status); // đơn không "mất tích"
  if (current.status === "ASSIGNED") expect(current.driverId).not.toBe("drv-drop-01"); // nếu gán lại, phải khác tài xế cũ
});`),
      CODE("typescript",
`// double-ack.spec.ts — tài xế cố ACK cùng 1 assignment từ 2 phiên khác nhau
test("second ACK from a different session for the same assignment is rejected", async ({ request }) => {
  await seedDriverOnline(request, { driverId: "drv-multi-01", zone: "hcm-q7" });
  const order = await seedOrder(request, { pickupZone: "hcm-q7" });
  await waitForStatus(request, order.orderId, "ASSIGNED");
  const assignment = (await (await request.get(\`/api/orders/\${order.orderId}/assignments\`)).json())[0];

  const first = await request.post(\`/api/assignments/\${assignment.assignmentId}/ack\`, { data: { sessionId: "sess-A" } });
  const second = await request.post(\`/api/assignments/\${assignment.assignmentId}/ack\`, { data: { sessionId: "sess-B" } });

  expect(first.status()).toBe(200);
  expect(second.status()).toBe(409); // ACK thứ 2 bị từ chối, không tạo assignment "active" thứ 2
});`),
      WARN(
        "Không bao giờ dùng giờ trên thiết bị tài xế để tính SLA — thiết bị di động có thể lệch giờ hàng phút, mọi phép đo SLA phải dựa trên server time nhất quán, nếu không báo cáo SLA cho ban giám đốc sẽ sai lệch có hệ thống.",
        "Never use the driver device's clock to calculate SLA — mobile devices can be off by minutes; every SLA measurement must be based on consistent server time, otherwise SLA reports to leadership will be systematically wrong.",
        "SLAの計算にドライバー端末の時刻を使ってはいけません――モバイル端末は数分単位でずれることがあり、すべてのSLA測定は一貫したサーバー時刻に基づく必要があります。そうしないと経営陣へのSLAレポートが系統的に誤ったものになります。"
      ),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & đo SLA (realtime)", en: "10. Post-verification & SLA measurement (realtime)", ja: "10. 事後検証とSLA測定（リアルタイム）" },
    blocks: [
      P(
        "Khác với batch đối soát COD chạy 1 lần/ngày, hậu kiểm SLA ở bài toán này chạy liên tục (streaming) trên mỗi sự kiện thay đổi trạng thái đơn. SLA Clock Service subscribe vào cùng luồng sự kiện với Assignment Service, tính độ trễ theo từng mốc (offeredAt → ackedAt, assignedAt → deliveredAt) và ghi SLABreach ngay khi phát hiện vượt ngưỡng, không đợi tổng hợp cuối ngày. Việc này cho phép đội vận hành can thiệp gần như tức thời (ví dụ tăng incentive cho tài xế ở zone đang thiếu hụt) thay vì chỉ biết sau khi đã trễ. Song song, vẫn cần một job hậu kiểm hằng ngày đối chiếu tổng số SLABreach ghi nhận realtime với số liệu tính lại (recompute) từ log thô, để phát hiện trường hợp SLA Clock Service tự nó bị lỗi hoặc rớt sự kiện.",
        "Unlike the COD-reconciliation batch that runs once daily, SLA post-verification in this problem runs continuously (streaming) on every order-status-change event. The SLA Clock Service subscribes to the same event stream as the Assignment Service, computing latency at each milestone (offeredAt → ackedAt, assignedAt → deliveredAt) and writing an SLABreach the moment a threshold is exceeded, without waiting for end-of-day aggregation. This lets ops intervene near-instantly (e.g. boosting incentives for drivers in an under-supplied zone) instead of finding out after the fact. In parallel, a daily post-verification job is still needed to cross-check the total realtime-recorded SLABreach count against a recompute from raw logs, to catch cases where the SLA Clock Service itself malfunctions or drops events.",
        "1日1回実行されるCOD突合バッチとは異なり、この問題におけるSLAの事後検証は注文ステータス変更イベントごとに継続的（ストリーミング）に実行されます。SLA Clock ServiceはAssignment Serviceと同じイベントストリームを購読し、各マイルストーン（offeredAt→ackedAt、assignedAt→deliveredAt）の遅延を計算し、閾値超過を検知した瞬間にSLABreachを記録します。日次集計を待ちません。これにより運用チームはほぼ即座に介入できます（例えば供給不足のゾーンのドライバーへのインセンティブを増やすなど）。手遅れになってから気づくのではありません。並行して、SLA Clock Service自体に不具合が生じたりイベントを取りこぼしたりするケースを検出するため、リアルタイムで記録された総SLABreach件数を生ログからの再計算値と突き合わせる日次の事後検証ジョブも依然として必要です。"
      ),
      CODE("typescript",
`// sla-realtime.spec.ts — SLA breach được ghi nhận đúng ngay khi vượt ngưỡng, không trễ
test("assignment SLA breach is recorded within seconds of threshold crossing", async ({ request }) => {
  await seedDriverOnline(request, { driverId: "drv-slow-zone", zone: "remote-zone", makeUnavailable: true });
  const order = await seedOrder(request, { pickupZone: "remote-zone" }); // không có tài xế rảnh => sẽ vỡ SLA gán 30s

  await new Promise((r) => setTimeout(r, 32_000));

  const breaches = await (await request.get(\`/api/sla/breaches?orderId=\${order.orderId}\`)).json();
  expect(breaches.length).toBe(1);
  expect(breaches[0].slaType).toBe("ASSIGNMENT");
  expect(breaches[0].actualSeconds).toBeGreaterThanOrEqual(30);
  expect(breaches[0].detectedAt - breaches[0].thresholdCrossedAt).toBeLessThan(5000); // phát hiện trong 5s
});`),
      TIP(
        "So sánh chéo số liệu SLABreach realtime với recompute từ log thô mỗi ngày; nếu 2 con số lệch nhau, ưu tiên điều tra SLA Clock Service trước khi nghi ngờ nghiệp vụ, vì đây thường là dấu hiệu event bị rớt.",
        "Cross-check realtime SLABreach figures against a recompute from raw logs daily; if the two numbers diverge, investigate the SLA Clock Service first before suspecting the business logic, as this is usually a sign of dropped events.",
        "リアルタイムのSLABreach件数と生ログからの再計算値を毎日相互チェックしましょう。両者が乖離している場合は、業務ロジックを疑う前にまずSLA Clock Serviceを調査してください。多くの場合イベントの取りこぼしの兆候だからです。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & tải k6", en: "11. CI/CD, monitoring & k6 load", ja: "11. CI/CD・監視・k6負荷テスト" },
    blocks: [
      P(
        "Pipeline CI chia suite thành 3 stage: unit/contract (dưới 3 phút), API/WebSocket integration (dưới 10 phút, dùng driver simulator thật), và load test k6 mô phỏng bão đơn giờ cao điểm chạy riêng theo lịch (không chặn merge mỗi PR vì tốn thời gian, nhưng bắt buộc trước mỗi release). Gate bắt buộc trước khi merge: 100% ca P0 (tính duy nhất assignment) pass. Gate bắt buộc trước release: p95 độ trễ gán dưới tải mô phỏng phải nằm trong ngưỡng, tỷ lệ lỗi (error rate) dưới 1%. Kịch bản k6 mô phỏng ramp-up từ 0 lên 60.000 đơn/giờ trong 5 phút rồi giữ ổn định 10 phút, kèm một tỷ lệ nhỏ tài xế 'rớt mạng' ngẫu nhiên để phản ánh điều kiện thực tế thay vì môi trường lý tưởng.",
        "The CI pipeline splits the suite into 3 stages: unit/contract (under 3 minutes), API/WebSocket integration (under 10 minutes, using a real driver simulator), and a k6 load test simulating a peak-hour order surge run separately on a schedule (not blocking every PR merge since it's time-consuming, but mandatory before every release). Mandatory merge gate: 100% of P0 cases (assignment uniqueness) pass. Mandatory release gate: p95 assignment latency under simulated load must stay within threshold, error rate under 1%. The k6 scenario ramps from 0 to 60,000 orders/hour over 5 minutes, holds steady for 10 minutes, and includes a small random percentage of drivers 'dropping' connection to reflect real-world conditions rather than an ideal environment.",
        "CIパイプラインはスイートを3つのステージに分割します。ユニット・契約（3分以内）、API・WebSocket統合（10分以内、実際のドライバーシミュレーターを使用）、そしてピーク時の注文急増をシミュレートするk6負荷テスト（時間がかかるため毎PRのマージはブロックしないが、リリース前には必須）です。マージ前の必須ゲート：P0ケース（割当の一意性）が100％合格すること。リリース前の必須ゲート：シミュレート負荷下での割当レイテンシp95が閾値内であり、エラー率が1％未満であること。k6シナリオは5分かけて0から6万件/時間へランプアップし、10分間安定状態を維持し、実際の状況を反映するため理想的な環境ではなくランダムに一定割合のドライバーが「回線切れ」する状況を含みます。"
      ),
      CODE("yaml",
`# .github/workflows/routing-sla-ci.yml
name: routing-sla-ci
on: [pull_request]
jobs:
  unit-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage
  api-ws-integration:
    needs: unit-contract
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api-ws -- --grep "@P0"
  gate:
    needs: [unit-contract, api-ws-integration]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Assignment-uniqueness P0 gates passed — safe to merge"

# k6 chạy riêng theo lịch (nightly) hoặc thủ công trước release, không chặn PR
---
# k6/peak-hour-dispatch.js (chạy bằng: k6 run k6/peak-hour-dispatch.js)
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    peak_ramp: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1h",
      preAllocatedVUs: 500,
      stages: [
        { target: 60000, duration: "5m" },  // ramp-up tới 60.000 đơn/giờ
        { target: 60000, duration: "10m" }, // giữ ổn định
      ],
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<3000"], // SLA gán p95 < 3s
    http_req_failed: ["rate<0.01"],    // error rate < 1%
  },
};

export default function () {
  const res = http.post("https://staging.example.com/api/orders", JSON.stringify({ pickupZone: "hcm-q1" }), {
    headers: { "Content-Type": "application/json" },
  });
  check(res, { "order accepted": (r) => r.status === 201 });
  sleep(1);
}`),
      NOTE(
        "Alert p95 vượt ngưỡng nên đi kèm runbook rõ ràng (kiểm tra zone nào thiếu tài xế, có cần bật incentive khẩn cấp không) — một dashboard đẹp không có runbook chỉ tạo thêm nhiễu cho đội trực.",
        "A p95-threshold-exceeded alert should come with a clear runbook (which zone is under-supplied, whether to trigger emergency incentives) — a nice dashboard without a runbook just adds noise for the on-call team.",
        "p95閾値超過のアラートには明確なランブック（どのゾーンでドライバーが不足しているか、緊急インセンティブを発動すべきか）を伴わせるべきです――ランブックのない美しいダッシュボードは当番チームのノイズを増やすだけです。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent hỗ trợ hiệu quả ở 3 việc: (1) sinh kịch bản k6 bổ sung dựa trên phân phối đơn thực tế của tuần trước (agent phân tích log để đề xuất profile tải thực tế hơn thay vì tải đều giả định, con người review trước khi đưa vào CI), (2) phân tích nguyên nhân gốc (root cause) sơ bộ khi phát hiện tăng đột biến số SLABreach — agent đối chiếu log giữa Routing Engine, Assignment Service, WebSocket Gateway để khoanh vùng service nghi vấn, con người xác nhận trước khi escalate, (3) tổng hợp báo cáo SLA hằng ngày thành ngôn ngữ tự nhiên cho stakeholder không kỹ thuật. Ranh giới rõ ràng: AI KHÔNG được tự động thay đổi tham số routing engine trong production (ví dụ nới bán kính tìm tài xế) — mọi thay đổi ảnh hưởng tới hành vi gán đơn thời gian thực đều cần con người phê duyệt, vì hậu quả sai sót ảnh hưởng trực tiếp đến hàng chục nghìn tài xế và đơn hàng đang hoạt động cùng lúc.",
        "AI Agent is effective for 3 tasks: (1) generating additional k6 scenarios based on last week's actual order distribution (the agent analyzes logs to propose a more realistic load profile instead of an assumed uniform load, humans review before adding it to CI), (2) preliminary root-cause analysis when an SLABreach spike is detected — the agent cross-references logs across Routing Engine, Assignment Service, and WebSocket Gateway to narrow down the suspect service, humans confirm before escalating, (3) summarizing daily SLA reports into natural language for non-technical stakeholders. Clear boundary: AI must NOT automatically change routing-engine parameters in production (e.g. widening the driver-search radius) — every change affecting realtime assignment behavior requires human approval, because the consequence of an error directly affects tens of thousands of drivers and orders active simultaneously.",
        "AIエージェントは次の3つの業務で効果的です。(1) 先週の実際の注文分布に基づいて追加のk6シナリオを生成する（エージェントがログを分析し、想定上の均一負荷ではなくより現実的な負荷プロファイルを提案し、人間がCIに追加する前にレビュー）、(2) SLABreach件数の急増を検知した際の予備的な根本原因分析――エージェントがRouting Engine、Assignment Service、WebSocket Gatewayのログを突き合わせ疑わしいサービスを絞り込み、人間がエスカレーション前に確認、(3) 日次SLAレポートを非技術系ステークホルダー向けに自然言語でまとめる。明確な境界：AIは本番の経路最適化エンジンのパラメータ（例：ドライバー検索半径の拡大）を自動的に変更してはならず、リアルタイムの割当挙動に影響するすべての変更には人間の承認が必要です。誤りの結果は同時に稼働する数万人のドライバーと注文に直接影響するからです。"
      ),
      SCEN(
        "Kịch bản dùng AI Agent hỗ trợ điều tra",
        "Scenario: AI Agent assisting investigation",
        "Chiều thứ Sáu, dashboard báo SLABreach tăng gấp 3 lần so với trung bình trong 20 phút qua. AI Agent đối chiếu log 3 service và phát hiện WebSocket Gateway có tỷ lệ reconnect bất thường ở một khu vực cụ thể, nghi ngờ do sự cố mạng viễn thông khu vực đó. Agent đề xuất tăng timeout ACK tạm thời cho khu vực bị ảnh hưởng, nhưng Test Lead/SRE vẫn phải xác nhận qua log nhà mạng trước khi áp dụng thay đổi cấu hình.",
        "On Friday afternoon, the dashboard reports SLABreach tripling versus average over the last 20 minutes. The AI Agent cross-references logs across the 3 services and finds the WebSocket Gateway has an abnormal reconnect rate in one specific region, suspecting a local telecom network issue. The agent proposes temporarily increasing the ACK timeout for the affected region, but the Test Lead/SRE must still confirm via telecom carrier logs before applying the configuration change.",
        "調査を支援するAIエージェントのシナリオ",
        "金曜の午後、ダッシュボードが過去20分間でSLABreachが平均の3倍に急増したと報告します。AIエージェントが3サービスのログを突き合わせ、WebSocket Gatewayが特定の地域で異常な再接続率を示していることを発見し、その地域の通信キャリア障害を疑います。エージェントは影響を受けた地域のACKタイムアウトを一時的に延長することを提案しますが、テストリード/SREは通信キャリアのログで確認してから設定変更を適用しなければなりません。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn kiểm chứng được hệ thống không bao giờ gán 2 đơn cho cùng 1 tài xế tại cùng 1 thời điểm, khi bản thân race condition rất khó tái lập ổn định?",
        "How would you verify the system never assigns 2 orders to the same driver at the same time, given that the race condition itself is hard to reproduce reliably?",
        "Kết hợp 2 lớp: (1) test tất định ở tầng unit cho logic lock (giả lập 2 request đồng thời gọi cùng hàm gán, assert chỉ 1 thắng), và (2) test tải ở tầng hệ thống bắn hàng nghìn request đồng thời thực tế rồi quét dữ liệu sau đó để đảm bảo không có 2 Assignment active chồng lấp cho cùng driverId — race condition không cần tái lập chính xác kịch bản, chỉ cần đủ áp lực đồng thời để lộ ra nếu có lỗi.",
        "Combine two layers: (1) deterministic unit-level tests for the locking logic (simulate 2 concurrent requests calling the same assignment function, assert only one wins), and (2) system-level load tests firing thousands of real concurrent requests, then scanning the resulting data afterward to ensure no 2 overlapping active Assignments exist for the same driverId — the race condition doesn't need to be reproduced exactly, just enough concurrent pressure to expose a bug if one exists.",
        "レースコンディション自体が安定して再現しにくい中で、システムが同一ドライバーに同時に2つの注文を割り当てないことをどう検証しますか？",
        "2つの層を組み合わせます。(1) ロックロジックに対する決定的なユニットレベルのテスト（同じ割当関数を呼ぶ2つの同時リクエストをシミュレートし、1つだけが勝つことをアサート）、(2) 実際に数千の同時リクエストを送るシステムレベルの負荷テストを行い、その後データをスキャンして同一driverIdに重複するアクティブなAssignmentが存在しないことを確認する。レースコンディションを正確に再現する必要はなく、バグがあれば露呈する程度の同時実行負荷があれば十分です。"
      ),
      QA(
        "SLA clock đo trên nhiều service khác nhau, làm sao đảm bảo không bị lệch giờ (clock skew) gây sai số?",
        "The SLA clock measures across multiple different services — how do you ensure clock skew doesn't cause errors?",
        "Đồng bộ tất cả server bằng NTP với dung sai chấp nhận được (ví dụ < 50ms), và quan trọng hơn là chỉ dùng MỘT nguồn thời gian tin cậy để tính khoảng cách (ví dụ timestamp do chính SLA Clock Service gán khi nhận sự kiện, thay vì cộng/trừ timestamp do nhiều service khác nhau tự sinh) — test riêng một ca kiểm tra server time đồng bộ như một phần của health check môi trường trước khi chạy suite chính.",
        "Sync all servers via NTP within an acceptable tolerance (e.g. < 50ms), and more importantly, use only ONE trusted time source to compute the interval (e.g. a timestamp assigned by the SLA Clock Service itself upon receiving the event, rather than adding/subtracting timestamps independently generated by different services) — have a dedicated test verifying server time sync as part of the environment health check before running the main suite.",
        "SLAクロックは複数の異なるサービスにまたがって測定されますが、クロックスキュー（時刻のずれ）による誤差をどう防ぎますか？",
        "すべてのサーバーを許容誤差内（例：50ms未満）でNTP同期させ、さらに重要なのは、間隔の計算に信頼できる時刻ソースを1つだけ使うことです（例：異なるサービスがそれぞれ生成したタイムスタンプを加減算するのではなく、イベント受信時にSLA Clock Service自体が付与するタイムスタンプを使う）。主要なテストスイートを実行する前に、環境ヘルスチェックの一環としてサーバー時刻の同期を検証する専用テストを用意します。"
      ),
      QA(
        "Nếu một đơn bị 'mồ côi' — không hiển thị lỗi gì nhưng cũng không được gán cho ai — bạn sẽ thiết kế test để phát hiện sớm bằng cách nào?",
        "If an order becomes 'orphaned' — no visible error but also never assigned to anyone — how would you design a test to catch it early?",
        "Không chờ khách hàng khiếu nại mới biết; cần một watchdog test/job định kỳ (ví dụ mỗi phút trong môi trường staging, mỗi 5 phút ở production) quét mọi đơn ở trạng thái PENDING_ASSIGN quá X giây mà không có Assignment nào đang active hoặc đang chờ hết hạn — bất kỳ đơn nào khớp điều kiện này là dấu hiệu 'mồ côi' cần cảnh báo ngay, đây chính là một dạng bất biến giám sát liên tục (continuous invariant check) chứ không phải test một lần.",
        "You shouldn't wait for a customer complaint to find out; you need a periodic watchdog test/job (e.g. every minute in staging, every 5 minutes in production) scanning for any order in PENDING_ASSIGN status for over X seconds with no active or pending-expiry Assignment — any order matching this condition is an 'orphan' signal requiring immediate alert. This is a form of continuous invariant checking, not a one-time test.",
        "注文が『孤児』になった場合――目に見えるエラーはないが誰にも割り当てられていない――早期に検出するテストをどう設計しますか？",
        "顧客のクレームを待って気づくのではいけません。定期的なウォッチドッグテスト・ジョブ（例：ステージングでは毎分、本番では5分ごと）が必要で、PENDING_ASSIGNステータスがX秒以上続き、アクティブまたは期限切れ待ちのAssignmentが存在しない注文をすべてスキャンします。この条件に合致する注文はすべて「孤児」のシグナルであり即座にアラートすべきです。これは一回きりのテストではなく、継続的な不変条件チェックの一種です。"
      ),
      SCEN(
        "Phỏng vấn trực tiếp: senior QA cho vị trí logistics realtime",
        "Live interview: senior QA for a realtime logistics role",
        "Nhà tuyển dụng đưa tình huống: 'Một tối thứ Bảy, dashboard báo p95 độ trễ gán tăng từ 2s lên 12s trong 10 phút, nhưng không có SLABreach nào cho DELIVERY, chỉ ASSIGNMENT. Bạn — với vai trò QA — sẽ điều tra theo hướng nào trước?' Câu trả lời tốt cần đi qua: (1) vì chỉ ASSIGNMENT bị ảnh hưởng chứ không phải DELIVERY, nghi vấn tập trung vào Routing Engine/Assignment Service/WebSocket Gateway chứ chưa phải luồng giao hàng, (2) kiểm tra xem có phải do tăng đột biến số đơn (traffic spike) hay do tài xế online giảm bất thường (ví dụ sự kiện thời tiết xấu), (3) đối chiếu log lock phân tán xem có tăng tỷ lệ conflict/retry không, (4) đề xuất theo dõi thêm chỉ số phân phối tải giữa các zone để loại trừ nguyên nhân mất cân bằng cục bộ.",
        "The interviewer poses: 'One Saturday evening, the dashboard shows assignment p95 latency jumping from 2s to 12s over 10 minutes, but there are no DELIVERY SLABreaches, only ASSIGNMENT ones. As QA, which direction would you investigate first?' A good answer should cover: (1) since only ASSIGNMENT is affected and not DELIVERY, suspicion should focus on the Routing Engine/Assignment Service/WebSocket Gateway rather than the delivery flow, (2) check whether it's a traffic spike or an abnormal drop in online drivers (e.g. a bad-weather event), (3) cross-check distributed-lock logs for an increase in conflict/retry rate, (4) propose additionally monitoring the load-distribution metric across zones to rule out a localized imbalance.",
        "実践面接：リアルタイム物流職のシニアQA",
        "面接官が状況を提示します。「ある土曜の夜、ダッシュボードで割当レイテンシp95が10分間で2秒から12秒に上昇したが、DELIVERYのSLABreachはなくASSIGNMENTのみが発生している。QAとしてまずどの方向で調査しますか？」良い回答は次を含むべきです。(1) DELIVERYではなくASSIGNMENTのみが影響を受けているため、配達フローではなくRouting Engine／Assignment Service／WebSocket Gatewayに疑いを集中させる、(2) トラフィック急増によるものか、オンラインドライバー数の異常な減少（悪天候イベントなど）によるものかを確認する、(3) 分散ロックのログを突き合わせ、コンフリクト・リトライ率の増加がないか確認する、(4) ゾーン間の負荷分布指標をさらに監視し、局所的な不均衡が原因である可能性を排除することを提案する。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài viết đã đi từ bối cảnh kinh doanh của một nền tảng điều phối tài xế thời gian thực với 18.000 tài xế và 60.000 đơn/giờ giờ cao điểm, qua kiến trúc 5 thành phần realtime, tới bộ bất biến cốt lõi làm oracle: tính duy nhất của phép gán (mỗi đơn ⇔ đúng 1 tài xế đang hoạt động) và độ chính xác của SLA clock dựa trên đồng hồ server thống nhất. Chiến lược kiểm thử ưu tiên lớp bất biến đồng thời trước hiệu năng, với kim tự tháp 65/25/10 giữa unit-contract, API/WebSocket integration và E2E/load. Ca lỗi chuyên sâu — double-assignment do race condition, đơn mồ côi do mất kết nối, double-ACK — chính là nơi phân biệt một QA hiểu hệ thống phân tán thời gian thực với một người chỉ quen kiểm thử REST tuần tự.",
        "This article moved from the business context of a realtime dispatch platform with 18,000 drivers and 60,000 orders/hour at peak, through a 5-component realtime architecture, to the core invariant set serving as oracle: assignment uniqueness (each order maps to exactly one active driver) and SLA clock accuracy based on a unified server clock. The test strategy prioritizes the concurrency-invariant layer over performance, with a 65/25/10 pyramid across unit-contract, API/WebSocket integration, and E2E/load. Deep failure cases — race-condition double-assignment, disconnect-caused orphaned orders, double-ACK — are exactly what separates a QA who understands realtime distributed systems from someone only comfortable with sequential REST testing.",
        "本稿は1万8000人のドライバーとピーク時1時間あたり6万件の注文を扱うリアルタイム配車プラットフォームの事業背景から始まり、5つのリアルタイムコンポーネントのアーキテクチャを経て、オラクルとなる中核的な不変条件――割当の一意性（各注文は常にちょうど1人の稼働中ドライバーに対応する）と、統一されたサーバー時刻に基づくSLAクロックの正確性――にたどり着きました。テスト戦略は性能よりも並行性の不変条件の層を優先し、ユニット・契約／API・WebSocket統合／E2E・負荷テストの65/25/10ピラミッドを採用します。レースコンディションによる二重割当、切断による孤児注文、二重ACKといった高度な異常系こそが、リアルタイム分散システムを理解するQAと、順序立ったRESTテストにしか慣れていない人とを分ける決定的な違いです。"
      ),
      UL(
        ["Đã xác định oracle: tính duy nhất assignment + SLA clock trên đồng hồ server thống nhất", "Đã có ≥6 ca automation code mẫu (happy path + 3 ca lỗi + đo SLA + load k6)", "Đã có CI gate 2 tầng cho merge và gate riêng cho release dựa trên k6", "Đã định ranh giới AI Agent: hỗ trợ điều tra/phân tích, KHÔNG tự đổi tham số routing production"],
        ["Oracle identified: assignment uniqueness + SLA clock on a unified server clock", "≥6 sample automation code cases ready (happy path + 3 failure cases + SLA measurement + k6 load)", "2-tier CI gate for merge plus a separate k6-based release gate", "AI Agent boundary defined: assists investigation/analysis, does NOT auto-change production routing parameters"],
        ["オラクルを特定済み：割当の一意性＋統一されたサーバー時刻に基づくSLAクロック", "サンプル自動化コードケースを6件以上用意済み（ハッピーパス＋異常系3件＋SLA測定＋k6負荷テスト）", "マージ用の2段階CIゲートと、k6に基づく別のリリースゲートを整備済み", "AIエージェントの境界を定義済み：調査・分析を支援するが、本番のルーティングパラメータを自動変更しない"]
      ),
      TIP(
        "Khi bàn giao cho đội mới, đính kèm luôn sơ đồ kiến trúc realtime và bảng bất biến — đây là 2 tài liệu tra cứu nhanh nhất khi debug sự cố gán đơn lúc nửa đêm giờ cao điểm.",
        "When handing over to a new team, always attach the realtime architecture diagram and the invariant table — these are the two fastest reference documents when debugging an assignment incident at midnight peak hours.",
        "新しいチームに引き継ぐ際は、リアルタイムアーキテクチャ図と不変条件の一覧表を必ず添付してください――これらは深夜のピーク時に割当インシデントをデバッグする際に最も速く参照できる2つの資料です。"
      ),
    ],
  },
];

const art2 = {
  categorySlug: "enterprise-realworld",
  slug: "logistics-routing-driver-sla-realtime",
  cover: cover2,
  tags: tags("thucchien", "logistics", "api", "k6", "realworld"),
  title: {
    vi: "Thực chiến: định tuyến & phân công tài xế thời gian thực, SLA giao hàng trong logistics",
    en: "Enterprise: realtime routing & driver assignment, delivery SLA in logistics",
    ja: "実戦：物流におけるリアルタイム経路最適化・配車とSLA配達",
  },
  summary: {
    vi: "Bài sâu 14 chương: bối cảnh điều phối tài xế thời gian thực, kiến trúc 5 dịch vụ (routing/assignment/WebSocket/SLA clock), tính duy nhất của assignment & đồng hồ SLA làm oracle, test plan, ma trận ca, code automation happy path & ca lỗi (double-assignment, mất kết nối, double-ACK), đo SLA realtime, CI/CD & tải k6, AI Agent, phỏng vấn.",
    en: "A deep 14-chapter piece: realtime driver-dispatch context, 5-service architecture (routing/assignment/WebSocket/SLA clock), assignment uniqueness & SLA clock as oracle, test plan, case matrix, happy-path & failure-case automation code (double-assignment, disconnection, double-ACK), realtime SLA measurement, CI/CD & k6 load testing, AI Agent, interview angle.",
    ja: "全14章の詳細記事：リアルタイム配車の背景、5サービスアーキテクチャ（ルーティング／割当／WebSocket／SLAクロック）、オラクルとしての割当の一意性とSLAクロック、テスト計画、ケースマトリクス、ハッピーパスと異常系（二重割当、切断、二重ACK）の自動化コード、リアルタイムSLA測定、CI/CD・k6負荷テスト、AIエージェント、面接の観点。",
  },
  pages: buildDoc(pages2),
};

// ============================================================================================
// BÀI 3: Telecom — Rating/Mediation, tính cước CDR, top-up & trừ cước, roaming
// ============================================================================================

const cover3 = makeThumb({ id: "tel-rate-03", domain: "telecom", kind: "thucchien", label: "実戦 · RATING" });

const svg3Arch = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc rating/mediation viễn thông · Telecom rating/mediation architecture</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="72" text-anchor="middle">Switch/HLR</text><text x="75" y="86" text-anchor="middle">(CDR gốc)</text>
<rect x="160" y="50" width="120" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="220" y="72" text-anchor="middle">Mediation</text><text x="220" y="86" text-anchor="middle">(chuẩn hoá, lọc trùng)</text>
<rect x="310" y="50" width="120" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="370" y="72" text-anchor="middle">Rating Engine</text><text x="370" y="86" text-anchor="middle">(bảng giá/gói)</text>
<rect x="460" y="50" width="120" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="520" y="72" text-anchor="middle">Billing/Balance</text><text x="520" y="86" text-anchor="middle">(trừ cước)</text>
<rect x="610" y="50" width="90" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="655" y="78" text-anchor="middle">Invoice</text>
<path d="M130 73 H160 M280 73 H310 M430 73 H460 M580 73 H610" stroke="#94a3b8" stroke-width="2" marker-end="url(#a3)"/>
<rect x="160" y="130" width="120" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="220" y="152" text-anchor="middle">CDR Store</text><text x="220" y="166" text-anchor="middle">(unique cdrId)</text>
<path d="M220 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="310" y="130" width="120" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="370" y="152" text-anchor="middle">Rating Table</text><text x="370" y="166" text-anchor="middle">(gói/roaming)</text>
<path d="M370 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="460" y="130" width="120" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="520" y="152" text-anchor="middle">Top-up Service</text><text x="520" y="166" text-anchor="middle">(nạp tiền)</text>
<path d="M520 176 V190" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="240" y="220" width="300" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="390" y="246" text-anchor="middle" fill="#6ee7b7">Bất biến: mỗi cdrId chỉ tính cước đúng 1 lần; số dư = Σtop-up − Σcước</text>
</g>
<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg3Matrix = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="15" font-weight="800" fill="#e2e8f0">Decision table tính cước (rating) · Rating decision table</text>
<g font-size="10.5" fill="#e2e8f0">
<rect x="20" y="44" width="150" height="28" fill="#1e293b" stroke="#334155"/><text x="30" y="62">Loại CDR</text>
<rect x="170" y="44" width="150" height="28" fill="#1e293b" stroke="#334155"/><text x="180" y="62">Điều kiện gói/roaming</text>
<rect x="320" y="44" width="150" height="28" fill="#1e293b" stroke="#334155"/><text x="330" y="62">Công thức cước</text>
<rect x="470" y="44" width="230" height="28" fill="#1e293b" stroke="#334155"/><text x="480" y="62">Kỳ vọng (Oracle)</text>

<rect x="20" y="72" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="90">Thoại nội mạng</text>
<rect x="170" y="72" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="90">Trong định mức gói</text>
<rect x="320" y="72" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="90">0đ (miễn phí)</text>
<rect x="470" y="72" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="90" fill="#6ee7b7">Trừ phút định mức, cước=0</text>

<rect x="20" y="100" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="118">Thoại nội mạng</text>
<rect x="170" y="100" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="118">Vượt định mức</text>
<rect x="320" y="100" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="118">phút dư × đơn giá</text>
<rect x="470" y="100" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="118" fill="#6ee7b7">Cước &gt; 0, đúng đơn giá bảng rating</text>

<rect x="20" y="128" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="146">Data 4G/5G</text>
<rect x="170" y="128" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="146">Trong nước</text>
<rect x="320" y="128" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="146">MB × đơn giá/gói</text>
<rect x="470" y="128" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="146" fill="#6ee7b7">Làm tròn theo block 1KB/1MB đúng quy tắc</text>

<rect x="20" y="156" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="174">Thoại/Data roaming</text>
<rect x="170" y="156" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="174">Ngoài nước, có đối tác</text>
<rect x="320" y="156" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="174">đơn giá roaming đối tác</text>
<rect x="470" y="156" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="174" fill="#fbbf24">Áp bảng giá quốc gia đối tác, có phí hoà mạng</text>

<rect x="20" y="184" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="202">CDR trùng (duplicate)</text>
<rect x="170" y="184" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="202">cdrId đã tồn tại</text>
<rect x="320" y="184" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="202">n/a</text>
<rect x="470" y="184" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="202" fill="#f87171">Từ chối tính cước lần 2, không trừ tiền thêm</text>

<rect x="20" y="212" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="230">Số dư không đủ</text>
<rect x="170" y="212" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="230">balance &lt; cước tính được</text>
<rect x="320" y="212" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="230">chặn/giới hạn cuộc gọi</text>
<rect x="470" y="212" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="230" fill="#f87171">Cắt cuộc gọi khi chạm 0đ, không âm quá ngưỡng</text>

<rect x="20" y="240" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="258">Top-up hợp lệ</text>
<rect x="170" y="240" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="258">mã thẻ chưa dùng, đúng mệnh giá</text>
<rect x="320" y="240" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="258">balance += mệnh giá</text>
<rect x="470" y="240" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="258" fill="#6ee7b7">Số dư tăng đúng, mã thẻ khoá lại (1 lần dùng)</text>

<rect x="20" y="268" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="30" y="286">Top-up trùng request</text>
<rect x="170" y="268" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="180" y="286">retry cùng idempotency key</text>
<rect x="320" y="268" width="150" height="28" fill="#0f172a" stroke="#334155"/><text x="330" y="286">n/a</text>
<rect x="470" y="268" width="230" height="28" fill="#0f172a" stroke="#334155"/><text x="480" y="286" fill="#6ee7b7">Chỉ cộng tiền đúng 1 lần dù client gọi lại nhiều lần</text>
</g>
</svg>`;

const pages3 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một nhà mạng di động ảo (MVNO) tại Việt Nam phục vụ 4,2 triệu thuê bao trả trước và trả sau, phát sinh trung bình 38 triệu bản ghi chi tiết cuộc gọi (CDR — call detail record) mỗi ngày từ hệ thống chuyển mạch (switch) và cổng dữ liệu (data gateway), chưa kể các CDR roaming quốc tế gửi về theo lô từ đối tác qua giao thức TAP3/NRTRDE với độ trễ vài giờ đến vài ngày. Toàn bộ dòng CDR này phải đi qua một chuỗi xử lý gồm mediation (chuẩn hoá định dạng, loại bỏ bản ghi hỏng, phát hiện trùng lặp), rating (tính cước theo gói cước và bảng giá đang áp dụng tại thời điểm phát sinh cuộc gọi), và billing (trừ vào số dư tài khoản trả trước hoặc cộng dồn vào hoá đơn trả sau). Sai sót ở bất kỳ khâu nào — tính cước sai, tính trùng một CDR, hoặc trừ tiền không khớp với cước đã tính — đều trực tiếp ảnh hưởng đến doanh thu ghi nhận (revenue leakage nếu tính thiếu, hoặc khiếu nại khách hàng ồ ạt nếu tính thừa) và có thể vi phạm quy định của Bộ Thông tin và Truyền thông về minh bạch cước viễn thông.",
        "A mobile virtual network operator (MVNO) in Vietnam serves 4.2 million prepaid and postpaid subscribers, generating an average of 38 million call detail records (CDRs) per day from switching systems and data gateways, not counting international roaming CDRs that arrive in batches from partners via the TAP3/NRTRDE protocol with delays ranging from a few hours to several days. This entire CDR stream must pass through a pipeline consisting of mediation (format normalization, malformed-record rejection, duplicate detection), rating (calculating charges according to the plan and price table in effect at the moment the call occurred), and billing (deducting from a prepaid balance or accumulating onto a postpaid invoice). An error at any stage — incorrect charging, double-counting a single CDR, or a deduction that doesn't match the calculated charge — directly impacts recognized revenue (leakage if undercharged, or a flood of customer complaints if overcharged) and can violate telecom-billing-transparency regulations.",
        "ベトナムのある仮想移動体通信事業者（MVNO）は420万件のプリペイド・ポストペイド契約者にサービスを提供しており、交換機（スイッチ）とデータゲートウェイから1日平均3800万件の通話明細（CDR：call detail record）が発生します。これに加えて、国際ローミングのCDRはTAP3/NRTRDEプロトコル経由でパートナーからバッチ形式で届き、数時間から数日の遅延を伴います。このCDRの流れはすべて、メディエーション（フォーマット正規化、破損レコードの除去、重複検知）、料金計算（rating。発生時点で適用されていたプラン・料金表に基づく計算）、課金（billing。プリペイド残高からの控除、またはポストペイド請求書への積み上げ）という一連の処理を通過しなければなりません。どの段階での誤りも――料金計算の誤り、1件のCDRの二重計上、計算された料金と実際の控除額の不一致――は、計上される収益に直接影響し（過小計算なら収益漏れ、過大計算なら顧客からの苦情殺到につながります）、情報通信省の通信料金透明性regulationに抵触する可能性もあります。"
      ),
      IMG(svg3Arch, "Kiến trúc rating/mediation/billing end-to-end", "End-to-end rating/mediation/billing architecture", "レーティング・メディエーション・課金のエンドツーエンド・アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API mediation nhận/chuẩn hoá CDR, phát hiện & loại CDR trùng theo cdrId", "Rating engine: tính cước theo gói cước, bảng giá roaming, quy tắc làm tròn block", "Billing/Balance: top-up, trừ cước, giới hạn khi số dư không đủ, đối soát cuối kỳ", "Ngoài phạm vi: thuật toán định tuyến cuộc gọi trong mạng lõi (core network), UI CSKH"],
        ["Mediation API receiving/normalizing CDRs, detecting & rejecting duplicate CDRs by cdrId", "Rating engine: charge calculation by plan, roaming price tables, block-rounding rules", "Billing/Balance: top-up, charge deduction, throttling when balance is insufficient, end-of-period reconciliation", "Out of scope: core-network call-routing algorithms, customer-care UI"],
        ["CDRを受信・正規化しcdrIdによる重複検知・拒否を行うメディエーションAPI", "レーティングエンジン：プラン別料金計算、ローミング料金表、ブロック単位の丸めルール", "課金・残高：チャージ、料金控除、残高不足時の制限、期末の突合", "対象外：コアネットワーク内の通話ルーティングアルゴリズム、カスタマーサポートUI"]
      ),
      NOTE(
        "Oracle của bài này KHÔNG phải 'API trả về 200 OK' mà là hai bất biến định lượng: (1) cước tính được phải bằng đúng tổng theo bảng rating áp dụng cho từng CDR, và (2) số dư sau mọi thao tác phải bằng đúng Σtop-up − Σcước đã trừ, không lệch một đồng.",
        "This article's oracle is NOT 'the API returns 200 OK' but two quantitative invariants: (1) the calculated charge must exactly equal the sum according to the rating table applicable to each CDR, and (2) the balance after every operation must exactly equal Σtop-ups − Σcharges deducted, without a single unit of discrepancy.",
        "本稿のオラクルは「APIが200 OKを返すこと」ではなく、2つの定量的な不変条件です。（1）計算された料金は各CDRに適用されるレーティングテーブルに基づく合計と完全に一致すること、（2）あらゆる操作後の残高はΣチャージ額−Σ控除済み料金と1円たりとも狂わず一致することです。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 khối chính nối tiếp nhau: Switch/HLR phát sinh CDR gốc ở định dạng ASN.1/nhị phân, Mediation Layer chuyển đổi sang định dạng chuẩn nội bộ (JSON/Avro), loại bỏ bản ghi lỗi cú pháp và gắn cờ nghi ngờ trùng lặp dựa trên cdrId (do switch cấp) kết hợp hash của (msisdn, startTime, duration, callType), Rating Engine tra bảng giá đang hiệu lực tại thời điểm startTime của CDR (không phải thời điểm xử lý) để tính cước, Billing/Balance Service áp dụng cước vào tài khoản — trừ trực tiếp với thuê bao trả trước hoặc cộng dồn vào bảng invoice_line cho thuê bao trả sau, và cuối cùng Invoice Service tổng hợp theo kỳ cước để xuất hoá đơn. CDR Store đóng vai trò then chốt: đây là nơi duy nhất lưu trạng thái 'đã rate' hay 'chưa rate' của từng cdrId, và mọi thao tác ghi vào đây phải là idempotent — nếu mediation gửi lại cùng một CDR (do retry mạng, do switch gửi trùng), rating engine phải nhận diện và bỏ qua thay vì tính cước lần thứ hai.",
        "The architecture comprises five sequential blocks: the Switch/HLR generates raw CDRs in ASN.1/binary format; the Mediation Layer converts them to an internal standard format (JSON/Avro), discards syntactically malformed records, and flags suspected duplicates based on the cdrId (assigned by the switch) combined with a hash of (msisdn, startTime, duration, callType); the Rating Engine looks up the price table in effect at the CDR's startTime (not the processing time) to compute the charge; the Billing/Balance Service applies the charge to the account — deducting directly for prepaid subscribers or accumulating into the invoice_line table for postpaid subscribers; and finally the Invoice Service aggregates by billing cycle to produce the invoice. The CDR Store plays a pivotal role: it is the single place storing the 'rated' or 'not yet rated' status of each cdrId, and every write to it must be idempotent — if mediation resends the same CDR (due to network retry or the switch sending a duplicate), the rating engine must recognize and skip it rather than charging a second time.",
        "アーキテクチャは連続する5つのブロックで構成されます。Switch/HLRがASN.1・バイナリ形式の生CDRを生成し、メディエーション層が内部標準形式（JSON/Avro）へ変換して構文エラーのあるレコードを破棄し、cdrId（交換機が付与）と(msisdn, startTime, duration, callType)のハッシュを組み合わせて重複疑いにフラグを立てます。レーティングエンジンはCDRのstartTime（処理時刻ではない）時点で有効な料金表を参照して料金を計算し、課金・残高サービスがその料金を口座に適用します――プリペイド契約者には直接控除、ポストペイド契約者にはinvoice_lineテーブルへの積み上げです。最後に請求サービスが課金サイクルごとに集計して請求書を発行します。CDRストアは要となる存在で、各cdrIdの「rating済み／未済」状態を保持する唯一の場所であり、ここへの書き込みはすべて冪等でなければなりません。メディエーションが同一CDRを再送した場合（ネットワークリトライや交換機の重複送信による）、レーティングエンジンはそれを認識してスキップし、二重に課金してはなりません。"
      ),
      UL(
        ["Điểm khó test #1: rating phải dùng bảng giá tại startTime của CDR, không phải thời điểm xử lý batch (dữ liệu roaming có thể trễ vài ngày)", "Điểm khó test #2: idempotency theo cdrId phải đúng ngay cả khi mediation gửi lại do lỗi mạng hoặc do đối tác roaming gửi trùng file TAP3", "Điểm khó test #3: trừ cước và tính cước là 2 bước riêng biệt (rate rồi mới charge) — cần test lệch pha giữa 2 bước khi hệ thống crash giữa chừng"],
        ["Test difficulty #1: rating must use the price table at the CDR's startTime, not the batch-processing time (roaming data can be delayed by several days)", "Test difficulty #2: cdrId-based idempotency must hold even when mediation resends due to network errors or a roaming partner resending a duplicate TAP3 file", "Test difficulty #3: charging and rating are two separate steps (rate, then charge) — test the gap between the two steps if the system crashes mid-way"],
        ["テスト困難点1：レーティングはバッチ処理時刻ではなくCDRのstartTime時点の料金表を使用しなければならない（ローミングデータは数日遅延することがある）", "テスト困難点2：ネットワーク障害による再送やローミングパートナーによるTAP3ファイルの重複送信があっても、cdrIdによる冪等性を維持しなければならない", "テスト困難点3：料金計算と控除は別々の2ステップ（先にrate、その後charge）――途中でシステムがクラッシュした場合の2ステップ間のズレをテストする必要がある"]
      ),
      IMG(svg3Matrix, "Decision table quyết định cách tính cước theo loại CDR", "Decision table for charge calculation by CDR type", "CDR種別ごとの料金計算を決めるディシジョンテーブル"),
      WARN(
        "Không bao giờ tính cước dựa trên bảng giá 'hiện hành lúc chạy job' — nếu job rating chạy trễ (do backlog roaming), một CDR phát sinh trước ngày đổi giá phải vẫn dùng giá cũ, nếu không đối soát cuối kỳ sẽ lệch hàng loạt.",
        "Never rate using the price table 'current at job run time' — if the rating job runs late (due to roaming backlog), a CDR generated before a price change must still use the old price, otherwise end-of-period reconciliation will show mass discrepancies.",
        "「ジョブ実行時点で有効な」料金表に基づいて料金計算をしてはいけません。ローミングの滞留によりレーティングジョブが遅延実行された場合でも、料金改定前に発生したCDRは旧料金を使う必要があります。そうしないと期末の突合で大量の不一致が発生します。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi xoay quanh 5 bảng: `Subscriber` (msisdn, planId, balance, status), `RatingPlan` (planId, freeMinutes, freeData, unitPriceVoice, unitPriceData, roamingPartnerId, effectiveFrom, effectiveTo), `Cdr` (cdrId UNIQUE, msisdn, callType, startTime, duration, dataVolume, roamingCountry, ratedStatus, ratedAmount), `Transaction` (txId, msisdn, type[TOPUP|CHARGE], amount, idempotencyKey UNIQUE, balanceAfter, createdAt), và `Invoice` (invoiceId, msisdn, period, totalAmount, lineItems). Ràng buộc UNIQUE trên `Cdr.cdrId` là tuyến phòng thủ đầu tiên chống tính trùng ở tầng database, nhưng riêng nó chưa đủ vì rating engine có thể đọc CDR, tính cước, rồi crash trước khi cập nhật `ratedStatus` — lúc đó CDR vẫn còn ở trạng thái 'chưa rate' và job retry sẽ tính lại, tạo ra 2 dòng Transaction cho cùng 1 cuộc gọi nếu không có idempotencyKey trên Transaction.",
        "The core data model centers on five tables: `Subscriber` (msisdn, planId, balance, status), `RatingPlan` (planId, freeMinutes, freeData, unitPriceVoice, unitPriceData, roamingPartnerId, effectiveFrom, effectiveTo), `Cdr` (cdrId UNIQUE, msisdn, callType, startTime, duration, dataVolume, roamingCountry, ratedStatus, ratedAmount), `Transaction` (txId, msisdn, type[TOPUP|CHARGE], amount, idempotencyKey UNIQUE, balanceAfter, createdAt), and `Invoice` (invoiceId, msisdn, period, totalAmount, lineItems). The UNIQUE constraint on `Cdr.cdrId` is the first line of defense against double-charging at the database layer, but it alone is insufficient because the rating engine can read a CDR, calculate the charge, then crash before updating `ratedStatus` — at that point the CDR is still 'not rated' and a retry job will recompute it, producing two Transaction rows for the same call unless Transaction also has an idempotencyKey.",
        "コアとなるデータモデルは5つのテーブルを中心とします。`Subscriber`（msisdn、planId、balance、status）、`RatingPlan`（planId、freeMinutes、freeData、unitPriceVoice、unitPriceData、roamingPartnerId、effectiveFrom、effectiveTo）、`Cdr`（cdrId UNIQUE、msisdn、callType、startTime、duration、dataVolume、roamingCountry、ratedStatus、ratedAmount）、`Transaction`（txId、msisdn、type[TOPUP|CHARGE]、amount、idempotencyKey UNIQUE、balanceAfter、createdAt）、`Invoice`（invoiceId、msisdn、period、totalAmount、lineItems）です。`Cdr.cdrId`へのUNIQUE制約はデータベース層での二重課金に対する第一の防衛線ですが、それだけでは不十分です。レーティングエンジンがCDRを読み込み、料金を計算した後、`ratedStatus`を更新する前にクラッシュする可能性があるためです。その時点でCDRはまだ「未rating」のままとなり、Transactionにidempotencyキーがなければ、リトライジョブが再計算して同じ通話に対して2件のTransaction行を生成してしまいます。"
      ),
      H("Bất biến (oracle) bắt buộc", "Mandatory invariants (oracle)", "必須の不変条件（オラクル）"),
      UL(
        ["Idempotency CDR: mỗi cdrId chỉ sinh ra đúng 1 Transaction loại CHARGE, kể cả khi mediation/rating retry N lần", "Đúng bảng giá: ratedAmount phải bằng công thức tính từ RatingPlan có effectiveFrom ≤ CDR.startTime < effectiveTo", "Bảo toàn số dư: balance sau mọi thao tác = Σamount(TOPUP) − Σamount(CHARGE), không có giao dịch 'trôi nổi' ngoài sổ", "Không âm quá ngưỡng: balance không được giảm dưới ngưỡng cho phép (0 hoặc hạn mức tín chấp) sau khi trừ cước", "Idempotency top-up: mỗi idempotencyKey chỉ được cộng tiền đúng 1 lần dù client gọi lại API nhiều lần"],
        ["CDR idempotency: each cdrId produces exactly one CHARGE Transaction, even if mediation/rating retries N times", "Correct price table: ratedAmount must equal the formula computed from the RatingPlan whose effectiveFrom ≤ CDR.startTime < effectiveTo", "Balance conservation: balance after every operation = Σamount(TOPUP) − Σamount(CHARGE), with no 'floating' transaction outside the ledger", "No excess negative: balance must not drop below the allowed threshold (0 or credit limit) after a charge", "Top-up idempotency: each idempotencyKey results in exactly one credit, no matter how many times the client retries the API"],
        ["CDR冪等性：メディエーション・レーティングがN回リトライしても、各cdrIdはCHARGE型のTransactionをちょうど1件だけ生成する", "料金表の正しさ：ratedAmountはeffectiveFrom ≤ CDR.startTime < effectiveToを満たすRatingPlanから算出した計算式と一致する", "残高の保存則：あらゆる操作後のbalance = Σamount(TOPUP) − Σamount(CHARGE)であり、台帳外の「浮いた」取引が存在しない", "許容範囲を超えたマイナス残高の禁止：料金控除後、balanceは許容閾値（0または与信枠）を下回らない", "チャージの冪等性：クライアントが何度APIを再試行しても、各idempotencyKeyにつき残高加算はちょうど1回だけ行われる"]
      ),
      TIP(
        "Thiết kế bảng Transaction với UNIQUE(idempotencyKey) và bảng Cdr với UNIQUE(cdrId) + cột ratedStatus cập nhật trong CÙNG một transaction DB với việc insert Transaction — đây là cách rẻ nhất để loại bỏ cả lớp bug 'tính trùng khi retry'.",
        "Design the Transaction table with UNIQUE(idempotencyKey) and the Cdr table with UNIQUE(cdrId) plus a ratedStatus column updated in the SAME database transaction as the Transaction insert — this is the cheapest way to eliminate the entire class of 'double-charge on retry' bugs.",
        "Transactionテーブルには UNIQUE(idempotencyKey) を、Cdrテーブルには UNIQUE(cdrId) を設定し、ratedStatus列の更新はTransactionのinsertと同一のデータベーストランザクション内で行うよう設計してください。これが「リトライ時の二重計上」というバグのクラス全体を排除する最も安価な方法です。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất xếp theo mức độ ảnh hưởng doanh thu: (1) tính trùng CDR khi hệ thống mediation/rating retry sau lỗi mạng hoặc timeout — có thể khiến hàng chục nghìn thuê bao bị trừ tiền 2 lần trong một sự cố; (2) áp sai bảng giá roaming khi đối tác gửi CDR trễ qua ngày đổi giá; (3) lệch số dư do rating và charge chạy bất đồng bộ, một bên thành công một bên thất bại; (4) làm tròn sai đơn vị tính cước data (theo block 1KB/50KB/1MB tuỳ gói) dẫn đến sai số cộng dồn hàng triệu giao dịch. Với quy mô 38 triệu CDR/ngày, một lỗi làm tròn sai lệch chỉ 0,01% giá trị mỗi giao dịch cũng có thể tạo ra khoản lệch doanh thu hàng trăm triệu đồng mỗi tháng — đây là lý do ma trận rủi ro của bài toán này luôn đặt 'sai số tích luỹ' ngang hàng với 'lỗi chức năng rõ ràng'.",
        "Ranked by revenue impact, the top risks are: (1) duplicate CDR charging when mediation/rating retries after a network error or timeout — potentially double-charging tens of thousands of subscribers in a single incident; (2) applying the wrong roaming price table when a partner sends a CDR late, past a price-change date; (3) balance drift from rating and charging running asynchronously, with one succeeding while the other fails; (4) incorrect data-charge rounding units (per 1KB/50KB/1MB block depending on the plan), causing cumulative error across millions of transactions. At a scale of 38 million CDRs/day, a rounding error of just 0.01% per transaction can create a revenue discrepancy of hundreds of millions of VND per month — which is why this problem's risk matrix always ranks 'cumulative error' alongside 'obvious functional bugs'.",
        "収益への影響度で並べると、最上位のリスクは次の通りです。（1）ネットワークエラーやタイムアウト後のメディエーション・レーティングのリトライによるCDR二重課金――1件のインシデントで数万件の契約者が二重に控除される可能性があります。（2）パートナーが料金改定日を過ぎてCDRを遅延送信した際の誤ったローミング料金表の適用。（3）レーティングと課金が非同期に実行され、一方が成功しもう一方が失敗することによる残高のずれ。（4）プランによって異なるデータ課金の丸め単位（1KB/50KB/1MBブロックごと）の誤りによる、数百万件の取引にわたる累積誤差です。1日3800万件のCDR規模では、1取引あたりわずか0.01%の丸め誤差でも月間数億ドンの収益不一致を生み出しかねません。だからこそ、このリスクマトリクスでは「累積誤差」を「明白な機能バグ」と同列に扱います。"
      ),
      NOTE(
        "Kim tự tháp test đề xuất: 55% unit test cho công thức rating (mỗi loại gói, mỗi ngưỡng làm tròn), 30% integration test cho luồng mediation→rating→billing với DB thật, 15% E2E cho kịch bản đối soát cuối kỳ và roaming đa đối tác.",
        "Suggested test pyramid: 55% unit tests for the rating formulas (each plan type, each rounding threshold), 30% integration tests for the mediation→rating→billing flow against a real DB, 15% E2E tests for end-of-period reconciliation and multi-partner roaming scenarios.",
        "推奨されるテストピラミッドは、レーティング計算式（プラン種別ごと、丸め閾値ごと）のユニットテストが55%、実データベースを用いたメディエーション→レーティング→課金フローの結合テストが30%、期末突合と複数パートナーローミングのシナリオのE2Eテストが15%です。"
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的テスト計画" },
    blocks: [
      P(
        "Test Plan xác định scope gồm: rating engine (unit + integration), mediation dedup (integration), billing/balance (integration + property-based cho bảo toàn số dư), và batch đối soát cuối kỳ (E2E trên tập dữ liệu giả lập quy mô lớn). Entry criteria: bảng RatingPlan và fixture CDR mẫu đã được đội nghiệp vụ (Product/Billing Ops) ký duyệt số liệu tham chiếu; môi trường staging có DB cô lập, không dùng chung với môi trường khác để tránh nhiễu số liệu đối soát. Exit criteria: 100% ca thuộc mức độ rủi ro Cao/Trung bình pass, không còn defect Sev1/Sev2 mở, kết quả đối soát batch trên tập dữ liệu 500.000 CDR mẫu khớp 100% với oracle tính tay/tính bằng script tham chiếu độc lập. Môi trường dữ liệu dùng seed script sinh CDR có kiểm soát: mỗi ca test tạo tập subscriber/CDR riêng theo prefix để không đụng độ khi chạy song song nhiều luồng CI.",
        "The test plan scope covers: the rating engine (unit + integration), mediation deduplication (integration), billing/balance (integration + property-based testing for balance conservation), and the end-of-period reconciliation batch (E2E on a large simulated dataset). Entry criteria: the RatingPlan table and sample CDR fixtures have been signed off with reference figures by the business team (Product/Billing Ops); the staging environment has an isolated DB, not shared with other environments to avoid polluting reconciliation figures. Exit criteria: 100% of High/Medium risk-tier cases pass, no open Sev1/Sev2 defects remain, and batch reconciliation results on a 500,000-CDR sample match 100% with a hand-calculated or independently scripted oracle. The data environment uses a controlled CDR-generating seed script: each test case creates its own subscriber/CDR set by prefix to avoid collisions when running multiple CI threads in parallel.",
        "テスト計画の範囲は、レーティングエンジン（ユニット＋結合）、メディエーションの重複排除（結合）、課金・残高（結合＋残高保存則のプロパティベーステスト）、期末突合バッチ（大規模模擬データセットによるE2E）です。開始基準：RatingPlanテーブルとCDRのサンプルフィクスチャが業務チーム（プロダクト・課金運用）によって参照数値として承認済みであること、ステージング環境が突合数値を汚さないよう他環境と共有しない専用DBを持つことです。終了基準：リスクレベル「高」「中」のケースが100%合格し、Sev1/Sev2の未解決不具合がなく、50万件のCDRサンプルによるバッチ突合結果が手計算または独立した参照スクリプトによるオラクルと100%一致することです。データ環境は制御されたCDR生成シードスクリプトを使用し、各テストケースはprefixごとに独自のsubscriber・CDR集合を作成して、CIの複数スレッド並列実行時の衝突を避けます。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử (decision table cước)", en: "6. Test case design matrix (rating decision table)", ja: "6. テストケース設計マトリクス（レーティングのディシジョンテーブル）" },
    blocks: [
      P(
        "Ma trận thiết kế ca dựa trên kỹ thuật decision table với 3 trục điều kiện: loại CDR (thoại nội mạng/thoại roaming/data), trạng thái định mức gói (trong định mức/vượt định mức), và trạng thái số dư (đủ/không đủ/vừa đủ). Mỗi tổ hợp sinh ra một ca kiểm thử với oracle cụ thể — không phải 'hệ thống trả về thành công' mà là con số cước chính xác đối chiếu với công thức trong RatingPlan. Bổ sung thêm trục boundary cho ngưỡng làm tròn (ví dụ 999KB vs 1000KB nếu block tính là 1MB) và trục thời gian (CDR.startTime nằm sát ranh giới effectiveFrom/effectiveTo của 2 bảng giá liên tiếp) để bắt các lỗi 'off-by-one' kinh điển trong hệ thống tính cước.",
        "The case-design matrix is based on the decision-table technique with three condition axes: CDR type (on-net voice/roaming voice/data), plan-allowance status (within allowance/over allowance), and balance status (sufficient/insufficient/exactly sufficient). Each combination generates a test case with a concrete oracle — not 'the system returns success' but the exact charge figure cross-checked against the RatingPlan formula. An additional boundary axis is added for rounding thresholds (e.g., 999KB vs. 1000KB if the billing block is 1MB) and a time axis (CDR.startTime sitting right at the boundary between two consecutive price tables' effectiveFrom/effectiveTo) to catch the classic 'off-by-one' bugs in rating systems.",
        "ケース設計マトリクスは、CDR種別（同一網内通話・ローミング通話・データ）、プラン定額枠の状態（枠内・枠超過）、残高の状態（十分・不足・ちょうど十分）という3つの条件軸によるディシジョンテーブル手法に基づきます。各組み合わせは具体的なオラクルを持つテストケースを生成します――「システムが成功を返す」ではなく、RatingPlanの計算式と突き合わせた正確な料金額です。丸めの閾値（例：課金ブロックが1MBの場合の999KBと1000KBの比較）と時間軸（CDR.startTimeが連続する2つの料金表のeffectiveFrom/effectiveToの境界ぎりぎりに位置する場合）という境界軸をさらに追加し、レーティングシステムに典型的な「off-by-one」バグを検出します。"
      ),
      IMG(svg3Matrix, "Decision table cước theo loại CDR và trạng thái gói/số dư", "Rating decision table by CDR type and plan/balance state", "CDR種別とプラン・残高状態によるレーティングのディシジョンテーブル"),
      UL(
        ["TC-R01: thoại nội mạng trong định mức → cước = 0", "TC-R02: thoại nội mạng vượt định mức 15 phút → cước = 15 × unitPriceVoice", "TC-R03: data 1200KB, block 1MB → làm tròn lên 2MB theo quy tắc ceiling", "TC-R04: CDR roaming Nhật Bản, đối tác X → áp đúng bảng giá đối tác X, không dùng giá nội địa", "TC-R05: CDR có startTime = effectiveTo − 1 giây của bảng giá cũ → dùng giá cũ, không dùng giá mới", "TC-R06: CDR trùng cdrId gửi lại do mediation retry → không tạo Transaction thứ 2"],
        ["TC-R01: on-net voice within allowance → charge = 0", "TC-R02: on-net voice 15 minutes over allowance → charge = 15 × unitPriceVoice", "TC-R03: 1200KB of data, 1MB block → rounds up to 2MB per ceiling rule", "TC-R04: roaming CDR in Japan, partner X → applies partner X's price table exactly, not the domestic price", "TC-R05: CDR with startTime = effectiveTo − 1 second of the old price table → uses the old price, not the new one", "TC-R06: duplicate cdrId CDR resent due to mediation retry → does not create a second Transaction"],
        ["TC-R01：枠内の同一網内通話 → 料金＝0", "TC-R02：定額枠を15分超過した同一網内通話 → 料金＝15分 × unitPriceVoice", "TC-R03：データ1200KB、ブロック1MB → 切り上げルールにより2MBに丸められる", "TC-R04：日本でのローミングCDR、パートナーX → 国内料金ではなく、パートナーXの料金表を正確に適用", "TC-R05：旧料金表のeffectiveTo − 1秒がstartTimeのCDR → 新料金ではなく旧料金を使用", "TC-R06：メディエーションのリトライにより再送された同一cdrIdのCDR → 2件目のTransactionを作成しない"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường (mock CDR)", en: "7. Data & environment preparation (mock CDR)", ja: "7. データ・環境準備（CDRモック）" },
    blocks: [
      P(
        "Vì CDR thật từ switch chứa dữ liệu nhạy cảm (số điện thoại thật, nội dung định tuyến mạng), môi trường test dùng bộ sinh CDR giả lập (mock generator) tạo ra bản ghi tuân theo đúng schema và phân bố xác suất giống thật: 70% CDR thoại nội mạng, 20% data, 8% thoại liên mạng, 2% roaming — đủ để phủ các nhánh rating khác nhau mà không cần dữ liệu sản xuất. Một API test-only `POST /test/seed-plan` cho phép nạp RatingPlan tuỳ biến theo từng test suite (đơn giá, định mức, effectiveFrom/To) để cô lập từng ca boundary mà không phụ thuộc bảng giá thật đang chạy production. Đối với ca roaming, mock một 'partner rating table' giả lập theo đúng cấu trúc TAP3 rút gọn, và một endpoint test-only để 'tua thời gian' (`POST /test/clock`) mô phỏng CDR đến trễ several ngày sau khi bảng giá đã đổi — đây là kỹ thuật bắt buộc để test được rủi ro #2 đã nêu ở chương 4.",
        "Because real CDRs from the switch contain sensitive data (real phone numbers, network-routing details), the test environment uses a mock CDR generator producing records that follow the exact schema and a realistic probability distribution: 70% on-net voice, 20% data, 8% off-net voice, 2% roaming — enough to cover the different rating branches without needing production data. A test-only API, `POST /test/seed-plan`, lets each test suite load a customized RatingPlan (unit prices, allowances, effectiveFrom/To) to isolate each boundary case without depending on the real price table currently running in production. For roaming cases, a mock 'partner rating table' is built following a simplified TAP3 structure, and a test-only 'time-travel' endpoint (`POST /test/clock`) simulates a CDR arriving several days late after the price table has changed — a technique required to test risk #2 from chapter 4.",
        "スイッチからの実際のCDRには機微なデータ（実際の電話番号、ネットワークルーティングの詳細）が含まれるため、テスト環境ではモックCDR生成器を使用し、正確なスキーマと実際に近い確率分布（同一網内通話70%、データ20%、他網通話8%、ローミング2%）に従うレコードを生成します。これにより、本番データを使わずに異なるレーティング分岐を十分にカバーできます。テスト専用API `POST /test/seed-plan` により、各テストスイートがカスタムのRatingPlan（単価、定額枠、effectiveFrom/To）を投入でき、本番稼働中の実際の料金表に依存せずに各境界ケースを分離できます。ローミングケースでは、簡略化したTAP3構造に従った模擬「パートナー料金表」を構築し、テスト専用の「時間送り」エンドポイント（`POST /test/clock`）により、料金表変更後に数日遅れてCDRが到着する状況をシミュレートします。これは第4章で述べたリスク（2）をテストするために必須の手法です。"
      ),
      CODE(
        "javascript",
        `// seed/mockCdr.js — sinh CDR giả lập theo phân bố thật, dùng cho test rating/mediation
const { randomUUID } = require("crypto");

function makeCdr({ msisdn, callType = "ON_NET_VOICE", duration = 60, dataVolumeKB = 0, startTime, roamingCountry = null }) {
  return {
    cdrId: randomUUID(),           // switch cấp id duy nhất; test trùng sẽ tái sử dụng id này
    msisdn,
    callType,                       // ON_NET_VOICE | OFF_NET_VOICE | DATA | ROAMING_VOICE | ROAMING_DATA
    startTime: startTime || new Date().toISOString(),
    duration,                       // giây, áp dụng cho voice
    dataVolumeKB,                   // KB, áp dụng cho data
    roamingCountry,
  };
}

function generateBatch(n, { msisdnPool, planStart }) {
  const dist = [
    { type: "ON_NET_VOICE", weight: 0.70 },
    { type: "DATA", weight: 0.20 },
    { type: "OFF_NET_VOICE", weight: 0.08 },
    { type: "ROAMING_VOICE", weight: 0.02 },
  ];
  const cdrs = [];
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    let acc = 0, chosen = dist[0].type;
    for (const d of dist) { acc += d.weight; if (r <= acc) { chosen = d.type; break; } }
    const msisdn = msisdnPool[Math.floor(Math.random() * msisdnPool.length)];
    cdrs.push(makeCdr({
      msisdn,
      callType: chosen,
      duration: chosen.includes("VOICE") ? 30 + Math.floor(Math.random() * 600) : 0,
      dataVolumeKB: chosen === "DATA" ? Math.floor(Math.random() * 5000) : 0,
      startTime: new Date(planStart.getTime() + i * 1000).toISOString(),
      roamingCountry: chosen === "ROAMING_VOICE" ? "JP" : null,
    }));
  }
  return cdrs;
}

module.exports = { makeCdr, generateBatch };`
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path (rating + top-up + trừ cước)", en: "8. Happy-path automation implementation (rating + top-up + charge)", ja: "8. ハッピーパス自動化の実装（レーティング＋チャージ＋控除）" },
    blocks: [
      P(
        "Happy path bao phủ ba luồng nối tiếp: (1) top-up thành công làm tăng đúng số dư, (2) CDR thoại vượt định mức được rating đúng theo đơn giá và trừ đúng số tiền vào balance, (3) CDR data được làm tròn đúng theo block. Bộ test dùng fixture riêng cho từng test (msisdn theo prefix ngẫu nhiên) để chạy song song an toàn trên CI, và mọi assertion đều bám theo oracle định lượng — không kiểm tra 'API trả 200' mà kiểm tra số dư tuyệt đối trước/sau và số tiền Transaction ghi lại phải khớp với công thức tính tay.",
        "The happy path covers three sequential flows: (1) a successful top-up correctly increases the balance, (2) a voice CDR over the allowance is rated correctly per the unit price and the exact amount is deducted from the balance, (3) a data CDR is rounded correctly per the block. The test suite uses a dedicated fixture per test (msisdn with a random prefix) to run safely in parallel on CI, and every assertion follows the quantitative oracle — not checking 'the API returns 200' but checking the absolute balance before/after and that the recorded Transaction amount matches the hand-computed formula.",
        "ハッピーパスは3つの連続したフローをカバーします。（1）チャージ成功時に残高が正しく増加すること、（2）定額枠を超過した通話CDRが単価に基づき正しくレーティングされ、正確な金額が残高から控除されること、（3）データCDRがブロック単位で正しく丸められることです。テストスイートはテストごとに専用のフィクスチャ（ランダムなprefix付きmsisdn）を使用し、CI上で安全に並列実行できるようにします。すべてのアサーションは定量的オラクルに従います――「APIが200を返す」ことではなく、前後の絶対残高と、記録されたTransaction金額が手計算の公式と一致することを検証します。"
      ),
      CODE(
        "javascript",
        `// tests/rating.happyPath.spec.js — Playwright/API test, happy path rating + billing
import { test, expect } from "@playwright/test";
import { generateBatch } from "../seed/mockCdr";

test.describe("Rating & Billing happy path", () => {
  test("top-up tăng đúng số dư", async ({ request }) => {
    const msisdn = "84900" + Date.now().toString().slice(-6);
    await request.post("/test/seed-subscriber", { data: { msisdn, balance: 0, planId: "PLAN_BASIC" } });

    const res = await request.post("/api/topup", {
      data: { msisdn, amount: 100000, idempotencyKey: "tk-" + msisdn },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.balanceAfter).toBe(100000); // oracle: balance = 0 + 100000

    const sub = await (await request.get(\`/test/subscriber/\${msisdn}\`)).json();
    expect(sub.balance).toBe(100000);
  });

  test("thoại vượt định mức trừ đúng cước theo unitPriceVoice", async ({ request }) => {
    const msisdn = "84901" + Date.now().toString().slice(-6);
    await request.post("/test/seed-subscriber", { data: { msisdn, balance: 200000, planId: "PLAN_BASIC" } });
    await request.post("/test/seed-plan", {
      data: { planId: "PLAN_BASIC", freeMinutes: 100, unitPriceVoice: 800, effectiveFrom: "2020-01-01" },
    });

    const cdr = { cdrId: "cdr-voice-" + msisdn, msisdn, callType: "ON_NET_VOICE", duration: 115 * 60, startTime: new Date().toISOString() };
    await request.post("/api/mediation/ingest", { data: { cdrs: [cdr] } });
    await request.post("/api/rating/run"); // trigger rating job trong môi trường test

    const tx = await (await request.get(\`/test/transactions/\${msisdn}\`)).json();
    const expectedCharge = 15 * 800; // 115 phút - 100 phút free = 15 phút vượt
    expect(tx.find(t => t.type === "CHARGE").amount).toBe(expectedCharge);

    const sub = await (await request.get(\`/test/subscriber/\${msisdn}\`)).json();
    expect(sub.balance).toBe(200000 - expectedCharge); // oracle: bảo toàn số dư
  });
});`
      ),
      CODE(
        "javascript",
        `// rating/engine.js — công thức rating cốt lõi (đơn giản hoá để minh hoạ oracle)
function rateVoice({ durationSec, freeMinutes, unitPriceVoice }) {
  const minutesUsed = Math.ceil(durationSec / 60);
  const billableMinutes = Math.max(0, minutesUsed - freeMinutes);
  return billableMinutes * unitPriceVoice;
}

function rateData({ dataVolumeKB, blockKB, unitPriceBlock }) {
  const blocks = Math.ceil(dataVolumeKB / blockKB); // luôn làm tròn LÊN theo block
  return blocks * unitPriceBlock;
}

function findApplicablePlan(plans, startTime) {
  // Oracle #2: chọn bảng giá theo startTime của CDR, KHÔNG theo "now"
  return plans.find(p => startTime >= p.effectiveFrom && (!p.effectiveTo || startTime < p.effectiveTo));
}

module.exports = { rateVoice, rateData, findApplicablePlan };`
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu: CDR trùng & roaming sai bảng giá", en: "9. Deep failure cases: duplicate CDR & wrong roaming price table", ja: "9. 深掘り異常系：CDR重複と誤ったローミング料金表" },
    blocks: [
      P(
        "Đây là chương giá trị cao nhất của bài, vì các lỗi ở đây không lộ ra dưới dạng crash rõ ràng mà âm thầm gây lệch doanh thu. Ca đầu tiên: mediation gửi lại một CDR do timeout mạng dù rating engine đã xử lý xong ở lần gọi trước (client timeout nhưng server đã commit) — hệ thống phải phát hiện `cdrId` đã tồn tại và trả về kết quả cũ (idempotent response) thay vì tạo Transaction mới. Ca thứ hai, phức tạp hơn: hai tiến trình rating chạy song song (do auto-scaling worker) cùng đọc một CDR chưa rate tại cùng một thời điểm — nếu không có khoá bi quan (pessimistic lock) hoặc ràng buộc UNIQUE ở tầng DB bảo vệ, cả hai đều tính cước thành công và tạo ra 2 Transaction cho cùng 1 cuộc gọi. Ca thứ ba: CDR roaming từ đối tác Nhật Bản gửi về trễ 4 ngày, rơi đúng vào giai đoạn công ty vừa cập nhật bảng giá roaming mới — rating engine phải tra đúng bảng giá theo `startTime` gốc của CDR (thời điểm cuộc gọi diễn ra tại Nhật, đã quy đổi timezone) chứ không phải theo thời điểm nhận CDR.",
        "This is the highest-value chapter, because errors here don't surface as obvious crashes but silently cause revenue drift. First case: mediation resends a CDR due to a network timeout even though the rating engine already processed it on the prior call (client timed out but the server had committed) — the system must detect that `cdrId` already exists and return the previous result (idempotent response) instead of creating a new Transaction. Second, trickier case: two rating processes run concurrently (due to worker auto-scaling) and both read the same unrated CDR at the same moment — without a pessimistic lock or a UNIQUE constraint at the DB layer protecting it, both succeed in charging and create two Transactions for the same call. Third case: a roaming CDR from a Japanese partner arrives 4 days late, landing right when the company just updated its roaming price table — the rating engine must look up the price table by the CDR's original `startTime` (when the call actually occurred in Japan, timezone-converted), not by when the CDR was received.",
        "この章は本稿で最も価値の高い章です。ここでの誤りは明白なクラッシュとしては現れず、静かに収益のずれを引き起こすためです。1つ目のケース：レーティングエンジンが前回の呼び出しですでに処理済み（クライアントはタイムアウトしたがサーバーはコミット済み）であるにもかかわらず、ネットワークタイムアウトによりメディエーションが同一CDRを再送するケースです。システムは`cdrId`がすでに存在することを検知し、新しいTransactionを作成する代わりに以前の結果を返す（冪等なレスポンス）必要があります。2つ目の、より複雑なケース：ワーカーのオートスケーリングにより2つのレーティングプロセスが並行して実行され、同一の未rating CDRを同時刻に読み込むケースです。悲観的ロックやDB層のUNIQUE制約による保護がなければ、両方とも課金に成功し、同一通話に対して2件のTransactionが作成されてしまいます。3つ目のケース：日本のパートナーからのローミングCDRが4日遅れて到着し、ちょうど会社がローミング料金表を更新した直後のタイミングと重なるケースです。レーティングエンジンはCDR受信時刻ではなく、CDRの元の`startTime`（日本で実際に通話が発生した時刻、タイムゾーン変換済み）に基づいて料金表を参照しなければなりません。"
      ),
      CODE(
        "javascript",
        `// tests/rating.duplicateCdr.spec.js — chống tính trùng khi mediation retry
import { test, expect } from "@playwright/test";

test("gửi lại cùng cdrId không tạo Transaction thứ 2", async ({ request }) => {
  const msisdn = "84902" + Date.now().toString().slice(-6);
  await request.post("/test/seed-subscriber", { data: { msisdn, balance: 500000, planId: "PLAN_BASIC" } });
  const cdr = { cdrId: "cdr-dup-fixed-001", msisdn, callType: "ON_NET_VOICE", duration: 200 * 60, startTime: new Date().toISOString() };

  const first = await request.post("/api/mediation/ingest", { data: { cdrs: [cdr] } });
  await request.post("/api/rating/run");
  const secondSameCdr = await request.post("/api/mediation/ingest", { data: { cdrs: [cdr] } }); // retry giả lập
  await request.post("/api/rating/run");

  expect(first.ok()).toBeTruthy();
  expect(secondSameCdr.ok()).toBeTruthy(); // API vẫn trả OK (idempotent), không phải lỗi 500

  const txs = await (await request.get(\`/test/transactions/\${msisdn}\`)).json();
  const chargeTxs = txs.filter(t => t.type === "CHARGE" && t.cdrId === cdr.cdrId);
  expect(chargeTxs.length).toBe(1); // oracle: đúng 1 Transaction dù ingest 2 lần
});`
      ),
      CODE(
        "javascript",
        `// tests/rating.concurrentRace.spec.js — 2 worker rating chạy song song trên cùng 1 CDR
import { test, expect } from "@playwright/test";

test("2 rating worker race trên cùng CDR chỉ tạo 1 Transaction", async ({ request }) => {
  const msisdn = "84903" + Date.now().toString().slice(-6);
  await request.post("/test/seed-subscriber", { data: { msisdn, balance: 300000, planId: "PLAN_BASIC" } });
  const cdr = { cdrId: "cdr-race-001", msisdn, callType: "DATA", dataVolumeKB: 3000, startTime: new Date().toISOString() };
  await request.post("/api/mediation/ingest", { data: { cdrs: [cdr] } });

  // Gọi rating/run đồng thời để mô phỏng race giữa 2 worker auto-scale
  const [r1, r2] = await Promise.all([
    request.post("/api/rating/run", { data: { workerId: "w1" } }),
    request.post("/api/rating/run", { data: { workerId: "w2" } }),
  ]);
  expect(r1.ok() && r2.ok()).toBeTruthy();

  const txs = await (await request.get(\`/test/transactions/\${msisdn}\`)).json();
  expect(txs.filter(t => t.cdrId === cdr.cdrId).length).toBe(1); // oracle: lock/UNIQUE chặn double-charge
});`
      ),
      CODE(
        "javascript",
        `// tests/rating.roamingLatePricing.spec.js — CDR roaming đến trễ, phải dùng giá tại thời điểm gọi
import { test, expect } from "@playwright/test";

test("CDR roaming trễ 4 ngày vẫn dùng bảng giá cũ theo startTime", async ({ request }) => {
  const msisdn = "84904" + Date.now().toString().slice(-6);
  await request.post("/test/seed-subscriber", { data: { msisdn, balance: 1000000, planId: "PLAN_ROAM" } });
  await request.post("/test/seed-plan", {
    data: { planId: "PLAN_ROAM", roamingPartnerId: "JP01", unitPriceVoice: 5000, effectiveFrom: "2026-01-01", effectiveTo: "2026-07-01" },
  });
  await request.post("/test/seed-plan", {
    data: { planId: "PLAN_ROAM", roamingPartnerId: "JP01", unitPriceVoice: 6500, effectiveFrom: "2026-07-01", effectiveTo: null },
  });

  // cuộc gọi diễn ra 2026-06-29 (giá cũ 5000) nhưng CDR chỉ về hệ thống ngày 2026-07-03 (đã đổi giá)
  const cdr = { cdrId: "cdr-roam-late-001", msisdn, callType: "ROAMING_VOICE", duration: 10 * 60, startTime: "2026-06-29T10:00:00Z", roamingCountry: "JP" };
  await request.post("/api/mediation/ingest", { data: { cdrs: [cdr] } });
  await request.post("/api/rating/run");

  const txs = await (await request.get(\`/test/transactions/\${msisdn}\`)).json();
  const tx = txs.find(t => t.cdrId === cdr.cdrId);
  expect(tx.amount).toBe(10 * 5000); // oracle: dùng giá cũ 5000, KHÔNG dùng giá mới 6500
});`
      ),
      WARN(
        "Nếu rating engine tra bảng giá theo `now()` thay vì `CDR.startTime`, mọi CDR đến trễ quanh thời điểm đổi giá sẽ bị tính sai — đây là lỗi khó phát hiện nhất vì phần lớn CDR đến đúng hạn vẫn tính đúng, chỉ một phần nhỏ CDR trễ mới lộ ra khi đối soát cuối kỳ.",
        "If the rating engine looks up the price table by `now()` instead of `CDR.startTime`, every late-arriving CDR around a price-change moment will be miscalculated — this is the hardest bug to catch because most on-time CDRs still calculate correctly; only the small fraction of late CDRs reveals it at end-of-period reconciliation.",
        "レーティングエンジンが`CDR.startTime`ではなく`now()`で料金表を参照している場合、料金改定時期付近に遅延到着したすべてのCDRが誤って計算されます。これは最も発見しにくいバグです。なぜなら、時間通りに到着するほとんどのCDRは正しく計算され続け、遅延した一部のCDRのみが期末突合で表面化するためです。"
      ),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & đối soát cước cuối kỳ (batch)", en: "10. Post-verification & end-of-period rating reconciliation (batch)", ja: "10. 事後検証と期末料金突合（バッチ）" },
    blocks: [
      P(
        "Ngoài test tự động ở mức API, hệ thống cần một lớp hậu kiểm độc lập chạy theo batch cuối mỗi kỳ cước (thường là hàng ngày và tổng hợp cuối tháng): script đối soát đọc toàn bộ CDR đã 'rated' trong kỳ, tính lại cước bằng một bộ công thức tham chiếu (reference implementation) hoàn toàn tách biệt code với rating engine chính, rồi so sánh từng dòng. Bất kỳ sai lệch nào giữa `ratedAmount` lưu trong hệ thống và số tính lại bởi script tham chiếu đều được coi là defect nghiêm trọng, không phải 'chênh lệch làm tròn chấp nhận được' — vì hệ thống rating tài chính không có khái niệm sai số cho phép, mọi lệch dù 1 đồng cũng phải truy vết. Song song đó, đối soát số dư (balance reconciliation) kiểm tra bất biến toàn hệ thống: với mọi thuê bao, `currentBalance = Σ(TOPUP.amount) - Σ(CHARGE.amount)` tính từ toàn bộ lịch sử Transaction, nếu có thuê bao nào lệch thì đánh dấu để đội vận hành điều tra ngay trong ngày thay vì để dồn sang kỳ sau.",
        "Beyond automated API-level tests, the system needs an independent post-verification layer running as a batch at the end of each billing cycle (typically daily, aggregated monthly): a reconciliation script reads all CDRs 'rated' during the period, recalculates the charge using a reference implementation completely separate in code from the main rating engine, then compares line by line. Any discrepancy between the `ratedAmount` stored in the system and the figure recomputed by the reference script is treated as a serious defect, not an 'acceptable rounding difference' — because a financial rating system has no concept of allowed error; any discrepancy, even one unit, must be traced. In parallel, balance reconciliation checks a system-wide invariant: for every subscriber, `currentBalance = Σ(TOPUP.amount) − Σ(CHARGE.amount)` computed from the entire Transaction history; any subscriber found to be off is flagged for the operations team to investigate the same day rather than letting it roll over to the next period.",
        "API水準の自動テストに加えて、システムには各課金サイクルの期末（通常は日次、月末に集計）に実行される独立した事後検証レイヤーが必要です。突合スクリプトは、その期間に「rating済み」となったすべてのCDRを読み込み、メインのレーティングエンジンとはコードが完全に分離された参照実装（リファレンス実装）で料金を再計算し、1行ずつ比較します。システムに保存されている`ratedAmount`と参照スクリプトによる再計算値との間に生じるいかなる不一致も、「許容される丸め誤差」ではなく重大な不具合として扱われます。金融のレーティングシステムには許容誤差という概念が存在せず、たとえ1円のずれであっても追跡しなければならないからです。並行して、残高突合はシステム全体の不変条件を検証します。すべての契約者について、Transaction履歴全体から算出した`currentBalance = Σ(TOPUP.amount) − Σ(CHARGE.amount)`が成立することを確認し、ずれが見つかった契約者は次の期間に持ち越さず、その日のうちに運用チームが調査できるようフラグを立てます。"
      ),
      CODE(
        "javascript",
        `// batch/reconcileRating.js — hậu kiểm đối soát cước & số dư cuối kỳ, tách biệt code với rating engine
const { rateVoice, rateData, findApplicablePlan } = require("../rating/engine"); // dùng lại công thức thuần, KHÔNG dùng lại pipeline có state

async function reconcileRatingForPeriod(db, period) {
  const cdrs = await db.cdr.findMany({ where: { period, ratedStatus: "RATED" } });
  const mismatches = [];
  for (const cdr of cdrs) {
    const plan = findApplicablePlan(await db.ratingPlan.findManyByMsisdn(cdr.msisdn), cdr.startTime);
    const expected = cdr.callType === "DATA"
      ? rateData({ dataVolumeKB: cdr.dataVolumeKB, blockKB: plan.blockKB, unitPriceBlock: plan.unitPriceData })
      : rateVoice({ durationSec: cdr.duration, freeMinutes: plan.freeMinutes, unitPriceVoice: plan.unitPriceVoice });
    if (expected !== cdr.ratedAmount) {
      mismatches.push({ cdrId: cdr.cdrId, expected, actual: cdr.ratedAmount });
    }
  }
  return mismatches; // oracle: mảng rỗng = đối soát khớp 100%
}

async function reconcileBalances(db) {
  const subs = await db.subscriber.findMany();
  const drift = [];
  for (const s of subs) {
    const topup = await db.transaction.sumAmount({ msisdn: s.msisdn, type: "TOPUP" });
    const charge = await db.transaction.sumAmount({ msisdn: s.msisdn, type: "CHARGE" });
    const expectedBalance = topup - charge;
    if (expectedBalance !== s.balance) drift.push({ msisdn: s.msisdn, expectedBalance, actual: s.balance });
  }
  return drift; // oracle: mảng rỗng = không thuê bao nào lệch số dư
}

module.exports = { reconcileRatingForPeriod, reconcileBalances };`
      ),
      TIP(
        "Chạy script đối soát trên MỘT bản sao dữ liệu chỉ đọc (read replica) để không tạo tải cho hệ thống production đang phục vụ khách hàng, và lưu kết quả mismatch vào bảng riêng để phân tích xu hướng theo thời gian thay vì chỉ cảnh báo tức thời.",
        "Run the reconciliation script against a READ-ONLY replica to avoid adding load to the production system serving customers, and store mismatch results in a dedicated table to analyze trends over time rather than only alerting in the moment.",
        "本番システムに負荷をかけないよう、突合スクリプトは読み取り専用のレプリカに対して実行してください。また、不一致の結果は専用テーブルに保存し、その場限りのアラートだけでなく時系列での傾向分析にも活用してください。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số chất lượng", en: "11. CI/CD, monitoring & quality metrics", ja: "11. CI/CD・監視・品質指標" },
    blocks: [
      P(
        "Pipeline CI chia thành 3 giai đoạn: unit test công thức rating chạy trên mọi pull request (dưới 2 phút), integration test luồng mediation→rating→billing chạy trên môi trường staging khi merge vào nhánh chính (khoảng 12 phút, có seed/reset qua API test-only), và batch reconciliation chạy nightly trên tập dữ liệu mô phỏng 500.000 CDR để bắt các lỗi tích luỹ trước khi lên production. Job rating/billing được đánh dấu là 'gate bắt buộc' (required check) — không cho merge nếu bất kỳ ca nào liên quan idempotency hoặc bảo toàn số dư bị fail, vì đây là các bất biến tài chính không có ngoại lệ. Chỉ số theo dõi gồm: tỉ lệ CDR bị từ chối do lỗi định dạng, tỉ lệ CDR trùng bị chặn thành công, độ trễ trung bình từ lúc CDR phát sinh đến lúc rate xong, và số lượng mismatch phát hiện bởi batch đối soát mỗi đêm — chỉ số cuối này lý tưởng phải luôn bằng 0, và bất kỳ giá trị khác 0 nào đều kích hoạt cảnh báo PagerDuty cho đội on-call.",
        "The CI pipeline is split into three stages: unit tests for the rating formulas run on every pull request (under 2 minutes), integration tests for the mediation→rating→billing flow run on staging when merging to the main branch (about 12 minutes, with seed/reset via test-only APIs), and a batch reconciliation runs nightly against a simulated 500,000-CDR dataset to catch cumulative errors before they reach production. The rating/billing job is marked a 'required check' — merging is blocked if any case related to idempotency or balance conservation fails, since these are financial invariants with no exceptions. Tracked metrics include: the rate of CDRs rejected for format errors, the rate of duplicate CDRs successfully blocked, the average latency from CDR generation to completed rating, and the number of mismatches found by the nightly reconciliation batch — this last metric should ideally always be zero, and any nonzero value triggers a PagerDuty alert for the on-call team.",
        "CIパイプラインは3段階に分かれます。プルリクエストごとに実行されるレーティング計算式のユニットテスト（2分未満）、メインブランチへのマージ時にステージング環境で実行されるメディエーション→レーティング→課金フローの結合テスト（約12分、テスト専用APIによるシード・リセットあり）、そして本番投入前に累積誤差を検出するため、模擬50万件CDRデータセットに対して毎晩実行されるバッチ突合です。レーティング・課金ジョブは「必須チェック」としてマークされます――冪等性や残高保存則に関するケースが1つでも失敗すればマージはブロックされます。これらは例外のない財務上の不変条件だからです。追跡する指標には、フォーマットエラーで拒否されたCDRの割合、正常にブロックされた重複CDRの割合、CDR発生からレーティング完了までの平均遅延、そして毎晩の突合バッチで発見された不一致件数が含まれます。この最後の指標は理想的には常にゼロであるべきで、ゼロ以外の値はオンコールチームへのPagerDutyアラートを発動させます。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/telecom-rating-ci.yml
name: telecom-rating-billing-ci
on:
  pull_request:
    paths: ["rating/**", "billing/**", "mediation/**", "tests/**"]
  push:
    branches: [main]
  schedule:
    - cron: "0 2 * * *"   # batch reconciliation chạy 02:00 hằng đêm

jobs:
  unit-rating:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run test:unit -- rating/

  integration-mediation-billing:
    needs: unit-rating
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_PASSWORD: test }
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run db:migrate:test
      - run: npm run test:integration -- mediation rating billing
      - name: Fail nếu ca idempotency/số dư fail (required check)
        run: npm run test:tag -- "@invariant" --strict

  nightly-reconciliation:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node batch/reconcileRating.js --period=yesterday --output=report.json
      - run: node scripts/assertZeroMismatch.js report.json   # exit 1 nếu có mismatch → cảnh báo`
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent trong kiểm thử rating/billing", en: "12. Integrating AI agents into rating/billing testing", ja: "12. レーティング・課金テストへのAIエージェント統合" },
    blocks: [
      P(
        "AI agent có thể đảm nhiệm tốt các việc lặp lại và tổ hợp lớn: sinh thêm ca boundary cho ngưỡng làm tròn (999KB/1000KB/1MB±1 đơn vị), sinh biến thể CDR roaming cho nhiều quốc gia/đối tác khác nhau dựa trên khuôn mẫu có sẵn, và soạn thảo báo cáo tóm tắt các mismatch phát hiện từ batch đối soát mỗi đêm thành ngôn ngữ dễ đọc cho đội vận hành. Tuy nhiên, ranh giới trách nhiệm phải rõ ràng: AI KHÔNG được tự quyết định 'công thức rating đúng là gì' — công thức và bảng giá phải luôn lấy từ nguồn xác thực do đội nghiệp vụ (Product/Billing Ops) ký duyệt, AI chỉ được dùng để sinh test data/test case dựa trên công thức đã xác nhận, và mọi ca do AI đề xuất phải qua review của kỹ sư QA trước khi đưa vào bộ test chính thức để tránh lẫn giả định sai vào oracle. Với các mismatch tài chính phát hiện từ đối soát, AI có thể hỗ trợ phân loại/gợi ý nguyên nhân khả dĩ (ví dụ 'nghi vấn do CDR roaming đến trễ qua ranh giới đổi giá'), nhưng quyết định điều chỉnh sổ sách và số dư khách hàng luôn cần con người phê duyệt.",
        "AI agents are well-suited to repetitive, combinatorially large work: generating additional boundary cases for rounding thresholds (999KB/1000KB/1MB±1 unit), generating roaming CDR variants for many different countries/partners based on existing templates, and drafting readable summary reports of mismatches found by the nightly reconciliation batch for the operations team. However, the boundary of responsibility must be clear: AI must NOT decide on its own 'what the correct rating formula is' — the formula and price tables must always come from an authoritative source signed off by the business team (Product/Billing Ops); AI is only used to generate test data/cases based on an already-confirmed formula, and every case an AI proposes must be reviewed by a QA engineer before entering the official test suite, to avoid mixing wrong assumptions into the oracle. For financial mismatches found during reconciliation, AI can help classify/suggest likely causes (e.g., 'suspected due to a roaming CDR arriving late across a price-change boundary'), but the decision to adjust ledgers and customer balances always requires human approval.",
        "AIエージェントは、反復的で組み合わせ数の多い作業に適しています。丸め閾値（999KB／1000KB／1MB±1単位）の追加境界ケースの生成、既存テンプレートに基づく多数の国・パートawareごとのローミングCDRバリエーションの生成、毎晩の突合バッチで見つかった不一致を運用チーム向けに読みやすいサマリーレポートとしてまとめることなどです。しかし責任の境界は明確でなければなりません。AIは「正しいレーティング計算式が何か」を自ら決定してはいけません――計算式と料金表は常に業務チーム（プロダクト・課金運用）が承認した正式な情報源から取得しなければならず、AIはすでに確認済みの計算式に基づいてテストデータ・ケースを生成するためだけに使用します。AIが提案したケースはすべて、誤った前提がオラクルに混入するのを防ぐため、正式なテストスイートに組み込まれる前にQAエンジニアのレビューを経なければなりません。突合で発見された財務上の不一致については、AIが原因の分類・示唆（例：「料金改定境界をまたいで遅延到着したローミングCDRが疑われる」）を支援できますが、台帳と顧客残高を調整する決定は常に人間の承認が必要です。"
      ),
      SCEN(
        "Kịch bản: AI đề xuất một ca test cho ngưỡng làm tròn data mới",
        "Scenario: AI proposes a test case for a new data-rounding threshold",
        "Một kỹ sư QA yêu cầu AI agent sinh thêm ca kiểm thử cho ngưỡng làm tròn data khi gói cước mới dùng block 512KB thay vì 1MB. AI phân tích công thức `rateData` hiện có, sinh ra 6 ca boundary (511KB, 512KB, 513KB, 1023KB, 1024KB, 1025KB) kèm giá trị mong đợi tính theo công thức ceiling. Kỹ sư QA review, phát hiện AI tính nhầm 1 ca do hiểu sai đơn vị (KB vs KiB), sửa lại giá trị mong đợi trước khi merge vào bộ test chính thức — minh hoạ đúng nguyên tắc 'AI đề xuất, người xác nhận oracle'.",
        "A QA engineer asks an AI agent to generate additional test cases for the data-rounding threshold when a new plan uses a 512KB block instead of 1MB. The AI analyzes the existing `rateData` formula and generates 6 boundary cases (511KB, 512KB, 513KB, 1023KB, 1024KB, 1025KB) with expected values computed via the ceiling formula. The QA engineer reviews and finds the AI miscalculated one case due to a unit misunderstanding (KB vs. KiB), corrects the expected value before merging into the official test suite — illustrating the principle 'AI proposes, a human confirms the oracle.'",
        "AIエージェントがデータ丸め閾値の新しいテストケースを提案するシナリオ",
        "あるQAエンジニアが、新しいプランが1MBではなく512KBブロックを使用する場合のデータ丸め閾値について、追加のテストケース生成をAIエージェントに依頼します。AIは既存の`rateData`計算式を分析し、ceiling計算式による期待値を付けた6つの境界ケース（511KB、512KB、513KB、1023KB、1024KB、1025KB）を生成します。QAエンジニアがレビューしたところ、AIが単位の誤解（KBとKiB）により1件のケースを誤って計算していたことが判明し、正式なテストスイートにマージする前に期待値を修正しました――これは「AIが提案し、人間がオラクルを確認する」という原則を的確に示しています。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Vì sao rating engine phải tra bảng giá theo `startTime` của CDR thay vì thời điểm xử lý?",
        "Why must the rating engine look up the price table by the CDR's `startTime` rather than the processing time?",
        "Vì CDR có thể đến trễ (đặc biệt roaming, qua đối tác, có thể trễ vài ngày). Nếu tra theo thời điểm xử lý, một cuộc gọi xảy ra trước ngày đổi giá sẽ vô tình bị tính theo giá mới, gây sai lệch doanh thu và tranh chấp với khách hàng. Bảng giá phải được thiết kế có `effectiveFrom/effectiveTo` và rating engine luôn so khớp với `CDR.startTime`.",
        "Because CDRs can arrive late (especially roaming ones via partners, sometimes several days late). If looked up by processing time, a call that occurred before a price change would mistakenly be charged at the new price, causing revenue discrepancies and customer disputes. Price tables must be designed with `effectiveFrom/effectiveTo`, and the rating engine must always match against `CDR.startTime`.",
        "レーティングエンジンはなぜ処理時刻ではなくCDRの`startTime`で料金表を参照しなければならないのですか。",
        "CDRは遅延して到着することがあるためです（特にパートナー経由のローミングCDRは数日遅れることがあります）。処理時刻で参照すると、料金改定前に発生した通話が誤って新料金で計算されてしまい、収益の不一致や顧客とのトラブルを招きます。料金表は`effectiveFrom/effectiveTo`を持つように設計し、レーティングエンジンは常に`CDR.startTime`と照合しなければなりません。"
      ),
      QA(
        "Idempotency theo cdrId đủ để chống tính trùng chưa? Vì sao?",
        "Is cdrId-based idempotency alone sufficient to prevent double-charging? Why or why not?",
        "Chưa đủ nếu chỉ có UNIQUE constraint trên Cdr.cdrId, vì rating engine có thể tính cước xong rồi crash trước khi cập nhật ratedStatus, khiến CDR vẫn ở trạng thái 'chưa rate'. Cần thêm: (1) cập nhật ratedStatus và insert Transaction trong CÙNG một DB transaction, và (2) UNIQUE constraint trên Transaction.idempotencyKey (hoặc trên cặp cdrId+type) để chặn cả trường hợp retry ở tầng ứng dụng.",
        "Not sufficient if there's only a UNIQUE constraint on Cdr.cdrId, because the rating engine could finish calculating a charge and then crash before updating ratedStatus, leaving the CDR still 'not rated'. You also need: (1) updating ratedStatus and inserting the Transaction within the SAME DB transaction, and (2) a UNIQUE constraint on Transaction.idempotencyKey (or on the cdrId+type pair) to also block retries at the application layer.",
        "cdrIdによる冪等性だけで二重課金を防ぐには十分ですか。理由も教えてください。",
        "Cdr.cdrIdへのUNIQUE制約だけでは不十分です。レーティングエンジンが料金計算を終えた後、ratedStatusを更新する前にクラッシュする可能性があり、CDRが「未rating」のままになるためです。追加で必要なのは、（1）ratedStatusの更新とTransactionのinsertを同一のDBトランザクション内で行うこと、（2）アプリケーション層でのリトライも防ぐため、Transaction.idempotencyKey（またはcdrIdとtypeの組み合わせ）にUNIQUE制約を設けることです。"
      ),
      QA(
        "Nếu batch đối soát cuối kỳ phát hiện 200 thuê bao bị lệch số dư nhỏ (dưới 1.000đ), có nên bỏ qua vì 'không đáng kể' không?",
        "If the end-of-period reconciliation batch finds 200 subscribers with small balance discrepancies (under 1,000 VND), should they be ignored as 'not significant'?",
        "Không. Hệ thống rating/billing tài chính không có khái niệm sai số cho phép — một lệch nhỏ lặp lại trên diện rộng thường là dấu hiệu của một lỗi hệ thống (ví dụ làm tròn sai đơn vị, hoặc mất đồng bộ giữa rate và charge) chứ không phải nhiễu ngẫu nhiên. Cần điều tra nguyên nhân gốc, không chỉ 'điều chỉnh thủ công cho khớp sổ' vì điều đó che giấu lỗi thay vì sửa lỗi.",
        "No. A financial rating/billing system has no concept of acceptable error — a small discrepancy repeated broadly is usually a sign of a systemic bug (e.g., incorrect rounding unit, or a rate/charge desynchronization) rather than random noise. The root cause must be investigated, not just 'manually adjusted to match the books,' since that hides the bug instead of fixing it.",
        "期末突合バッチで200契約者に小さな残高のずれ（1,000ドン未満）が見つかった場合、「大した問題ではない」として無視してよいですか。",
        "いいえ。金融のレーティング・課金システムには許容誤差という概念は存在しません。広範囲にわたって繰り返される小さなずれは、多くの場合ランダムなノイズではなく、システム的なバグ（例えば丸め単位の誤りやrateとchargeの非同期化）の兆候です。単に「帳簿を合わせるために手動調整する」のではなく、根本原因を調査しなければなりません。それはバグを直すのではなく隠すことになるからです。"
      ),
      SCEN(
        "Kịch bản phỏng vấn trực tiếp",
        "Live interview scenario",
        "Người phỏng vấn: 'Bạn nhận báo cáo rằng doanh thu tháng này thấp hơn dự kiến 3%, nghi ngờ liên quan đến hệ thống rating roaming. Bạn sẽ điều tra thế nào?' Ứng viên tốt trả lời theo hướng: đầu tiên chạy batch đối soát cuối kỳ so sánh ratedAmount lưu trong hệ thống với công thức tham chiếu độc lập để khoanh vùng có mismatch hay không; nếu có, lọc theo callType=ROAMING và roamingCountry để xem lệch tập trung ở đối tác nào; kiểm tra xem có đợt đổi giá roaming nào gần đây và so sánh CDR.startTime của các giao dịch lệch với effectiveFrom/effectiveTo của bảng giá cũ/mới; cuối cùng kiểm tra độ trễ trung bình của CDR từ đối tác nghi vấn để xác nhận giả thuyết 'CDR đến trễ bị tính sai giá'. Đây là cách trả lời thể hiện tư duy oracle-first thay vì đoán mò.",
        "Interviewer: 'You're told this month's revenue is 3% below forecast, suspected to be related to the roaming rating system. How would you investigate?' A strong candidate answers along these lines: first run the end-of-period reconciliation batch comparing the system's stored ratedAmount against an independent reference formula to identify whether mismatches exist; if so, filter by callType=ROAMING and roamingCountry to see which partner the discrepancy concentrates on; check whether there was a recent roaming price change and compare the CDR.startTime of the discrepant transactions against the old/new price table's effectiveFrom/effectiveTo; finally check the average CDR latency from the suspected partner to confirm the hypothesis that 'late-arriving CDRs were charged at the wrong price.' This answer demonstrates oracle-first thinking rather than guesswork.",
        "実践的な面接シナリオ",
        "面接官：「今月の収益が予測より3%低く、ローミングのレーティングシステムに関連する疑いがあると報告を受けました。どのように調査しますか。」優れた候補者は次のように答えます。まず期末突合バッチを実行し、システムに保存されたratedAmountを独立した参照計算式と比較して不一致の有無を特定します。もし不一致があれば、callType=ROAMINGとroamingCountryで絞り込み、どのパートナーに偏っているかを確認します。次に、最近ローミング料金の改定があったかを確認し、不一致取引のCDR.startTimeを旧・新料金表のeffectiveFrom/effectiveToと突き合わせます。最後に、疑わしいパートナーからのCDRの平均遅延を確認し、「遅延到着したCDRが誤った料金で計算された」という仮説を裏付けます。この回答は当て推量ではなく、オラクルファーストの思考を示しています。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán rating/mediation/billing viễn thông là ví dụ điển hình của hệ thống mà lỗi không lộ ra dưới dạng crash mà dưới dạng sai số âm thầm tích luỹ trên hàng chục triệu giao dịch mỗi ngày. Chiến lược kiểm thử hiệu quả phải đặt hai bất biến làm trung tâm xuyên suốt mọi tầng: idempotency theo cdrId/idempotencyKey để chống tính trùng, và bảo toàn số dư (balance = Σtop-up − Σcước) để chống lệch sổ. Ma trận ca phải phủ đủ tổ hợp loại CDR × trạng thái định mức × trạng thái số dư, đặc biệt chú trọng ranh giới thời gian đổi giá và ranh giới làm tròn dữ liệu — đây là nơi lỗi 'off-by-one' âm thầm gây thiệt hại lớn nhất. Batch đối soát độc lập chạy song song với rating engine chính là tuyến phòng thủ cuối cùng, phát hiện những gì test tự động chưa lường tới, và phải được giám sát chặt với ngưỡng cảnh báo bằng 0 mismatch tuyệt đối. Trước khi bàn giao, đội QA cần xác nhận: mọi ca liên quan 2 bất biến cốt lõi đã pass ổn định qua nhiều lần chạy CI (không flaky), batch đối soát trên tập dữ liệu mô phỏng lớn khớp 100%, và tài liệu oracle/công thức rating đã được đội nghiệp vụ ký duyệt để làm nguồn tham chiếu duy nhất cho mọi lần mở rộng gói cước sau này.",
        "The telecom rating/mediation/billing problem is a textbook example of a system where errors don't surface as crashes but as errors silently accumulating across tens of millions of transactions per day. An effective test strategy must place two invariants at the center of every layer: cdrId/idempotencyKey-based idempotency to prevent double-charging, and balance conservation (balance = Σtop-ups − Σcharges) to prevent ledger drift. The case matrix must cover the full combination of CDR type × allowance state × balance state, with particular attention to the price-change time boundary and the data-rounding boundary — where 'off-by-one' bugs silently cause the greatest damage. An independent reconciliation batch running alongside the main rating engine is the last line of defense, catching what automated tests didn't anticipate, and must be monitored tightly with an alert threshold of exactly zero mismatches. Before handover, the QA team must confirm: every case tied to the two core invariants passes stably across multiple CI runs (not flaky), the reconciliation batch on a large simulated dataset matches 100%, and the oracle/rating-formula documentation has been signed off by the business team as the single reference source for every future plan expansion.",
        "電気通信のレーティング・メディエーション・課金の問題は、誤りがクラッシュとしてではなく、1日数千万件の取引にわたって静かに積み重なる誤差として現れるシステムの典型例です。効果的なテスト戦略は、すべての層の中心に2つの不変条件を据える必要があります。二重課金を防ぐcdrId・idempotencyKeyによる冪等性、そして台帳のずれを防ぐ残高保存則（balance = Σチャージ額 − Σ料金）です。ケースマトリクスはCDR種別×定額枠の状態×残高の状態の全組み合わせをカバーし、特に料金改定の時間境界とデータ丸めの境界に注意を払う必要があります――ここは「off-by-one」バグが静かに最大の被害をもたらす場所です。メインのレーティングエンジンと並行して実行される独立した突合バッチは最後の防衛線であり、自動テストが想定していなかったものを検出するため、不一致件数ゼロという厳格なアラート閾値で監視されなければなりません。引き継ぎ前に、QAチームは次を確認する必要があります。2つの中核的な不変条件に関わるすべてのケースが複数回のCI実行で安定して合格していること（フレークでないこと）、大規模な模擬データセットでの突合バッチが100%一致すること、そしてオラクル・レーティング計算式のドキュメントが業務チームによって承認され、今後のプラン拡張すべてに対する唯一の参照情報源となっていることです。"
      ),
      UL(
        ["Idempotency CDR & top-up đã có UNIQUE constraint + test race condition", "Rating engine tra bảng giá theo CDR.startTime, có test ranh giới effectiveFrom/effectiveTo", "Batch đối soát cước & số dư chạy nightly, ngưỡng cảnh báo = 0 mismatch", "CI có required check cho nhóm test gắn tag @invariant", "Tài liệu oracle/công thức rating đã được Product/Billing Ops ký duyệt"],
        ["CDR & top-up idempotency has UNIQUE constraints + race-condition tests", "Rating engine looks up price tables by CDR.startTime, with tests at the effectiveFrom/effectiveTo boundary", "Rating & balance reconciliation batch runs nightly, alert threshold = 0 mismatches", "CI has a required check for the @invariant-tagged test group", "Oracle/rating-formula documentation has been signed off by Product/Billing Ops"],
        ["CDR・チャージの冪等性にUNIQUE制約とレースコンディションのテストが備わっている", "レーティングエンジンがCDR.startTimeで料金表を参照し、effectiveFrom/effectiveTo境界のテストがある", "料金・残高の突合バッチが毎晩実行され、アラート閾値が不一致0件である", "CIに@invariantタグ付きテスト群の必須チェックがある", "オラクル・レーティング計算式のドキュメントがプロダクト・課金運用によって承認済みである"]
      ),
    ],
  },
];

const art3 = {
  categorySlug: "enterprise-realworld",
  slug: "telecom-rating-mediation-billing",
  cover: cover3,
  tags: tags("thucchien", "telecom", "api", "datadriven", "db", "realworld"),
  title: {
    vi: "Thực chiến: rating/mediation, tính cước CDR, top-up & trừ cước, roaming trong viễn thông",
    en: "Enterprise: CDR rating/mediation, charge calculation, top-up & billing, roaming in telecom",
    ja: "実戦：通信事業者におけるCDR料金計算・メディエーション、チャージ・課金、ローミング",
  },
  summary: {
    vi: "Bài sâu 14 chương: bối cảnh thu thập CDR & rating/mediation viễn thông, kiến trúc 5 khối (mediation/rating/billing/invoice), idempotency CDR & bảo toàn số dư làm oracle, test plan, decision table cước, code automation happy path & ca lỗi chuyên sâu (CDR trùng, race condition, roaming tính sai bảng giá), batch đối soát cước cuối kỳ, CI/CD, AI Agent, phỏng vấn.",
    en: "A deep 14-chapter piece: telecom CDR-collection & rating/mediation context, 5-block architecture (mediation/rating/billing/invoice), CDR idempotency & balance conservation as oracle, test plan, rating decision table, happy-path & deep failure-case automation code (duplicate CDR, race condition, mispriced roaming), end-of-period rating reconciliation batch, CI/CD, AI Agent, interview angle.",
    ja: "全14章の詳細記事：通信事業者における通話明細（CDR）収集とレーティング・メディエーションの背景、5ブロックアーキテクチャ（メディエーション／レーティング／課金／請求）、オラクルとしてのCDR冪等性と残高保存則、テスト計画、料金のディシジョンテーブル、ハッピーパスと深掘り異常系（CDR重複、レースコンディション、ローミングの誤料金表適用）の自動化コード、期末の料金突合バッチ、CI/CD、AIエージェント、面接の観点。",
  },
  pages: buildDoc(pages3),
};

export const THUCCHIEN_04_DOCS = [art1, art2, art3];
