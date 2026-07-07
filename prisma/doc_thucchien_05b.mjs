// doc_thucchien_05b.mjs — 1 bài thucchien: Banking fraud detection realtime.
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const cover1 = makeThumb({ id: "bnk-fraud-04", domain: "banking", kind: "thucchien", label: "実戦 · FRAUD RT" });

const svg1 = `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="220" rx="12" fill="#0f172a"/>
  <text x="24" y="30" fill="#e2e8f0" font-size="14" font-family="monospace">Luồng quyết định gian lận thời gian thực (realtime scoring pipeline)</text>
  <rect x="20" y="50" width="120" height="50" rx="8" fill="#1e293b" stroke="#38bdf8"/>
  <text x="35" y="80" fill="#7dd3fc" font-size="12">Giao dịch</text>
  <rect x="170" y="50" width="140" height="50" rx="8" fill="#1e293b" stroke="#38bdf8"/>
  <text x="180" y="72" fill="#7dd3fc" font-size="11">Feature Store</text>
  <text x="180" y="88" fill="#94a3b8" font-size="10">velocity/geo/device</text>
  <rect x="340" y="50" width="140" height="50" rx="8" fill="#1e293b" stroke="#f59e0b"/>
  <text x="355" y="72" fill="#fbbf24" font-size="11">Rule Engine</text>
  <text x="355" y="88" fill="#94a3b8" font-size="10">hạn mức + rule</text>
  <rect x="510" y="50" width="150" height="50" rx="8" fill="#1e293b" stroke="#f59e0b"/>
  <text x="525" y="72" fill="#fbbf24" font-size="11">ML Model</text>
  <text x="525" y="88" fill="#94a3b8" font-size="10">score bất thường</text>
  <path d="M140 75 H170" stroke="#38bdf8" stroke-width="2"/>
  <path d="M310 75 H340" stroke="#38bdf8" stroke-width="2"/>
  <path d="M480 75 H510" stroke="#38bdf8" stroke-width="2"/>
  <rect x="260" y="130" width="180" height="50" rx="8" fill="#1e293b" stroke="#34d399"/>
  <text x="272" y="152" fill="#6ee7b7" font-size="11">Decision Aggregator</text>
  <text x="272" y="168" fill="#94a3b8" font-size="10">APPROVE/HOLD/DECLINE</text>
  <path d="M585 100 V115 L440 130" stroke="#34d399" stroke-width="2" fill="none"/>
  <path d="M240 75 V115 L330 130" stroke="#34d399" stroke-width="2" fill="none"/>
  <text x="20" y="205" fill="#64748b" font-size="10" font-family="monospace">SLA quyết định &lt; 150ms · fallback rule khi ML timeout</text>
</svg>`;

const svg2 = `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="240" rx="12" fill="#0f172a"/>
  <text x="24" y="28" fill="#e2e8f0" font-size="14" font-family="monospace">Bảng ngưỡng rule velocity/geo/device</text>
  <rect x="20" y="45" width="660" height="30" fill="#1e293b"/>
  <text x="30" y="65" fill="#38bdf8" font-size="11">Rule</text>
  <text x="230" y="65" fill="#38bdf8" font-size="11">Ngưỡng</text>
  <text x="400" y="65" fill="#38bdf8" font-size="11">Hành động</text>
  <text x="560" y="65" fill="#38bdf8" font-size="11">Oracle FP/FN</text>
  <rect x="20" y="75" width="660" height="30" fill="#111827"/>
  <text x="30" y="95" fill="#e2e8f0" font-size="11">Velocity 5 GD/60s</text>
  <text x="230" y="95" fill="#fbbf24" font-size="11">&gt;=5 lần/phút</text>
  <text x="400" y="95" fill="#f87171" font-size="11">HOLD</text>
  <text x="560" y="95" fill="#94a3b8" font-size="10">Recall ưu tiên</text>
  <rect x="20" y="105" width="660" height="30" fill="#1e293b"/>
  <text x="30" y="125" fill="#e2e8f0" font-size="11">Geo-jump &gt;800km/30ph</text>
  <text x="230" y="125" fill="#fbbf24" font-size="11">tốc độ &gt; máy bay</text>
  <text x="400" y="125" fill="#f87171" font-size="11">DECLINE</text>
  <text x="560" y="125" fill="#94a3b8" font-size="10">FPR &lt; 1%</text>
  <rect x="20" y="135" width="660" height="30" fill="#111827"/>
  <text x="30" y="155" fill="#e2e8f0" font-size="11">Device mới + số tiền lớn</text>
  <text x="230" y="155" fill="#fbbf24" font-size="11">&gt; 20tr &amp; device_new</text>
  <text x="400" y="155" fill="#f87171" font-size="11">OTP step-up</text>
  <text x="560" y="155" fill="#94a3b8" font-size="10">Cân bằng UX</text>
  <rect x="20" y="165" width="660" height="30" fill="#1e293b"/>
  <text x="30" y="185" fill="#e2e8f0" font-size="11">Hạn mức ngày</text>
  <text x="230" y="185" fill="#fbbf24" font-size="11">tổng &gt; limit_daily</text>
  <text x="400" y="185" fill="#f87171" font-size="11">DECLINE cứng</text>
  <text x="560" y="185" fill="#94a3b8" font-size="10">Race-safe atomic</text>
  <text x="20" y="220" fill="#64748b" font-size="10" font-family="monospace">Precision/Recall đo theo cửa sổ trượt 24h, retrain ngưỡng hàng tuần</text>
</svg>`;

const pages1 = [
  // 1. Bối cảnh
  {
    heading: {
      vi: "1. Bối cảnh nghiệp vụ: chống gian lận & hạn mức thời gian thực",
      en: "1. Business Context: Realtime Fraud Detection & Limits",
      ja: "1. 業務背景：リアルタイム不正検知と限度額管理",
    },
    blocks: [
      P(
        "Ngân hàng số hiện đại xử lý hàng chục triệu giao dịch mỗi ngày qua thẻ, chuyển khoản nhanh (NAPAS 24/7), ví điện tử và cổng thanh toán thương mại điện tử. Mỗi giao dịch đi qua một hệ thống chấm điểm gian lận thời gian thực trước khi được duyệt, giữ lại (hold) hoặc từ chối. Yêu cầu nghiệp vụ khắt khe: quyết định phải ra trong dưới 150-200 mili-giây để không làm chậm trải nghiệm khách hàng tại POS hay ATM, đồng thời phải đủ chính xác để không bỏ lọt kẻ gian và không làm phiền khách hàng thật. Đây là bài toán kinh điển của ngành ngân hàng, nơi tốc độ và độ chính xác luôn mâu thuẫn nhau và đội QA phải kiểm chứng cả hai.",
        "Modern digital banks process tens of millions of transactions daily across cards, fast transfers (real-time payment rails), e-wallets, and e-commerce payment gateways. Every transaction passes through a realtime fraud scoring system before being approved, held, or declined. The business requirement is strict: the decision must be made in under 150-200 milliseconds to avoid slowing down the customer experience at POS or ATM, while still being accurate enough to avoid missing fraudsters and avoid annoying genuine customers. This is a classic banking problem where speed and accuracy constantly conflict, and QA must verify both.",
        "現代のデジタルバンクは、カード決済、即時送金（24時間決済網）、電子ウォレット、EC決済ゲートウェイを通じて、毎日数千万件の取引を処理しています。すべての取引は承認・保留・拒否を判定するリアルタイム不正検知システムを通過します。業務要件は非常に厳しく、POSやATMでの顧客体験を損なわないよう150〜200ミリ秒未満で判定を下す必要がある一方、詐欺師を見逃さず、正規顧客を煩わせない十分な精度も求められます。これは速度と精度が常に相反する銀行業界の典型的な課題であり、QAは両方を検証しなければなりません。"
      ),
      P(
        "Hệ thống phải đồng thời quản lý hạn mức (limits) theo nhiều chiều: hạn mức giao dịch đơn, hạn mức theo ngày, theo tháng, theo kênh (ATM, POS, online), theo loại thẻ và theo hồ sơ rủi ro khách hàng. Hạn mức và chống gian lận liên kết chặt chẽ: một giao dịch có thể hợp lệ về hạn mức nhưng bị chặn vì bất thường hành vi (velocity bất thường, đổi vị trí địa lý phi thực tế, thiết bị lạ chưa từng đăng nhập). Ngược lại, một giao dịch trong ngưỡng rủi ro thấp nhưng vượt hạn mức vẫn phải bị từ chối cứng theo quy định NHNN và chính sách nội bộ. QA cần hiểu rõ ranh giới giữa hai luồng kiểm soát này để thiết kế ca kiểm thử đúng.",
        "The system must simultaneously manage limits across multiple dimensions: single transaction limit, daily limit, monthly limit, per-channel limit (ATM, POS, online), per card type, and per customer risk profile. Limits and fraud detection are tightly coupled: a transaction may be valid regarding limits but blocked due to abnormal behavior (unusual velocity, unrealistic geographic jump, an unrecognized device never seen before). Conversely, a transaction with a low risk score but exceeding limits must still be hard-declined per central bank regulation and internal policy. QA needs to clearly understand the boundary between these two control flows to design correct test cases.",
        "システムは、単体取引限度額、日次限度額、月次限度額、チャネル別限度額（ATM・POS・オンライン）、カード種別、顧客リスクプロファイル別など、複数の軸で限度額を同時に管理する必要があります。限度額と不正検知は密接に連動しており、限度額上は問題なくても、異常な行動（異常な取引頻度、現実的にあり得ない地理的移動、未登録の新規デバイスなど）によりブロックされる取引があります。逆に、リスクスコアが低くても限度額を超えた取引は、中央銀行の規制や社内ポリシーにより強制的に拒否されなければなりません。QAはこの二つの制御フローの境界を正しく理解し、適切なテストケースを設計する必要があります。"
      ),
      P(
        "Về mặt tổ chức, dự án này thường có SLA nghiêm ngặt: p99 độ trễ dưới 200ms, tỷ lệ khả dụng 99.99%, và các chỉ số chất lượng mô hình được báo cáo hàng tuần cho ủy ban rủi ro (Precision, Recall, False Positive Rate). Đội test không chỉ kiểm thử chức năng mà còn phải hợp tác với đội Data Science để xác định oracle đúng — tức là tiêu chuẩn đúng/sai cho từng quyết định — và với đội hạ tầng để đo hiệu năng dưới tải cao điểm (giờ lương, ngày lễ, Black Friday). Bài viết này trình bày toàn bộ vòng đời kiểm thử cho hệ thống chống gian lận và hạn mức thời gian thực, từ kiến trúc, mô hình dữ liệu, chiến lược test, ma trận ca, đến CI/CD đo lường chất lượng mô hình và tải.",
        "Organizationally, this project typically carries strict SLAs: p99 latency under 200ms, 99.99% availability, and model quality metrics reported weekly to the risk committee (Precision, Recall, False Positive Rate). The test team not only performs functional testing but must collaborate with the Data Science team to define the correct oracle — the correctness standard for each decision — and with the infrastructure team to measure performance under peak load (payday, holidays, Black Friday). This article covers the full test lifecycle for the realtime fraud and limits system, from architecture, data model, test strategy, case matrix, to CI/CD measuring model quality and load.",
        "組織面では、このプロジェクトには厳格なSLAが課されるのが一般的です。p99レイテンシ200ミリ秒未満、可用性99.99%、そしてモデル品質指標（適合率・再現率・誤検知率）はリスク委員会に毎週報告されます。テストチームは機能テストだけでなく、各判定の正誤基準となる「オラクル」をデータサイエンスチームと共に定義し、ピーク負荷時（給料日、祝日、セール日）の性能をインフラチームと共に測定する必要があります。本稿では、アーキテクチャ、データモデル、テスト戦略、ケースマトリクス、モデル品質と負荷を測定するCI/CDまで、リアルタイム不正検知・限度額システムの全テストライフサイクルを解説します。"
      ),
    ],
  },

  // 2. Kiến trúc + luồng realtime
  {
    heading: {
      vi: "2. Kiến trúc hệ thống và luồng quyết định thời gian thực",
      en: "2. System Architecture and Realtime Decision Flow",
      ja: "2. システムアーキテクチャとリアルタイム判定フロー",
    },
    blocks: [
      P(
        "Kiến trúc điển hình gồm bốn lớp: cổng nhận giao dịch (transaction gateway), kho đặc trưng thời gian thực (feature store) tổng hợp velocity/geo/device, công cụ luật (rule engine) áp hạn mức và luật tĩnh, và mô hình học máy chấm điểm bất thường. Một bộ tổng hợp quyết định (decision aggregator) kết hợp kết quả rule engine và điểm ML để ra quyết định cuối: APPROVE, HOLD (yêu cầu xác thực bổ sung như OTP) hoặc DECLINE. Toàn bộ luồng này phải hoàn tất trong ngân sách thời gian rất hẹp, thường dưới 150ms, nên các thành phần được thiết kế bất đồng bộ, có cache và fallback khi một dịch vụ con chậm hoặc lỗi.",
        "The typical architecture has four layers: transaction gateway, realtime feature store aggregating velocity/geo/device, rule engine applying limits and static rules, and a machine learning model scoring anomalies. A decision aggregator combines rule engine results and ML score to produce the final decision: APPROVE, HOLD (requiring additional authentication like OTP), or DECLINE. This entire flow must complete within a very tight time budget, typically under 150ms, so components are designed asynchronously with caching and fallback when a sub-service is slow or fails.",
        "典型的なアーキテクチャは4層で構成されます。取引を受け付けるゲートウェイ、取引頻度・地理・デバイス情報を集約するリアルタイム特徴量ストア、限度額と静的ルールを適用するルールエンジン、そして異常スコアを算出する機械学習モデルです。判定アグリゲータがルールエンジンの結果とMLスコアを統合し、最終判定（承認・保留＝追加認証要求・拒否）を下します。この一連の流れは非常に短い時間予算（通常150ミリ秒未満）内で完了する必要があるため、各コンポーネントは非同期設計となっており、下位サービスが遅延・障害した場合のキャッシュとフォールバックを備えています。"
      ),
      P(
        "Feature store là trái tim của hệ thống: nó duy trì cửa sổ trượt (sliding window) cho từng khách hàng, ví dụ số giao dịch trong 1 phút/1 giờ/1 ngày gần nhất, tổng số tiền đã chi trong ngày, danh sách thiết bị đã từng dùng, và tọa độ địa lý của giao dịch gần nhất để tính vận tốc di chuyển ảo (velocity geo-jump). Dữ liệu này thường lưu trong bộ nhớ tốc độ cao (Redis hoặc tương đương) để đọc/ghi dưới mili-giây. Một điểm QA cần đặc biệt lưu ý là tính nhất quán cuối cùng (eventual consistency) giữa feature store và cơ sở dữ liệu giao dịch gốc — độ trễ đồng bộ có thể tạo ra khoảng hở (race window) mà kẻ gian lợi dụng để thực hiện nhiều giao dịch đồng thời vượt hạn mức trước khi hệ thống kịp cập nhật.",
        "The feature store is the heart of the system: it maintains sliding windows per customer, e.g., transaction count in the last minute/hour/day, total amount spent today, list of previously used devices, and the geo-coordinates of the last transaction to compute an implied travel velocity (geo-jump). This data is typically kept in high-speed memory (Redis or equivalent) for sub-millisecond read/write. A point QA must pay special attention to is eventual consistency between the feature store and the source transaction database — sync latency can create a race window that fraudsters exploit to execute multiple concurrent transactions exceeding limits before the system updates.",
        "特徴量ストアはシステムの中核です。顧客ごとに直近1分・1時間・1日の取引件数、当日の累計利用金額、これまで使用したデバイス一覧、直近取引の位置情報から算出する移動速度（地理的ジャンプ）などのスライディングウィンドウを維持します。このデータは通常、ミリ秒未満の読み書きを実現する高速メモリ（Redis等）に保持されます。QAが特に注意すべき点は、特徴量ストアと元の取引データベース間の結果整合性（eventual consistency）です。同期の遅延が「レースウィンドウ」を生み、詐欺師がシステムの更新前に複数の同時取引で限度額を超過させる隙を作る可能性があります。"
      ),
      IMG(svg1,
        "Luồng quyết định gian lận thời gian thực: giao dịch qua feature store, rule engine, ML model rồi tới decision aggregator.",
        "Realtime fraud decision flow: transaction passes through feature store, rule engine, ML model, then the decision aggregator.",
        "リアルタイム不正判定フロー：取引は特徴量ストア、ルールエンジン、MLモデルを経て判定アグリゲータに到達します。"
      ),
      P(
        "Ngoài luồng đồng bộ, hệ thống còn có luồng bất đồng bộ (asynchronous) để cập nhật lại nhãn (label) sau khi có xác nhận từ khách hàng hoặc điều tra viên (ví dụ khách hàng báo giao dịch bị mất cắp thẻ), phục vụ việc huấn luyện lại mô hình. Ngoài ra còn có kênh quan sát (observability) ghi log mọi quyết định kèm lý do (rule nào kích hoạt, điểm ML bao nhiêu) để phục vụ điều tra khiếu nại và kiểm toán tuân thủ. Việc thiết kế test không thể tách rời các luồng phụ này vì chúng ảnh hưởng trực tiếp tới khả năng tái tạo (reproducibility) của một quyết định khi cần giải trình với khách hàng hoặc cơ quan quản lý.",
        "Besides the synchronous flow, the system also has an asynchronous flow to update labels after confirmation from the customer or an investigator (e.g., the customer reports card theft), feeding model retraining. There is also an observability channel logging every decision along with its reason (which rule fired, what ML score) to support complaint investigation and compliance audits. Test design cannot be separated from these auxiliary flows because they directly affect the reproducibility of a decision when explanation is required to a customer or regulator.",
        "同期フローに加え、顧客や調査員からの確認（例：カード盗難の申告）を受けてラベルを更新し、モデル再学習に活用する非同期フローも存在します。さらに、どのルールが発火したか、MLスコアはいくつだったかを含む全判定をログ記録する可観測性チャネルもあり、苦情調査やコンプライアンス監査に活用されます。テスト設計はこれらの補助フローと切り離せません。なぜなら、顧客や規制当局への説明が求められる際の判定の再現性に直接影響するからです。"
      ),
    ],
  },

  // 3. Data model & bất biến + oracle
  {
    heading: {
      vi: "3. Mô hình dữ liệu, bất biến nghiệp vụ và Oracle FP/FN",
      en: "3. Data Model, Business Invariants, and FP/FN Oracle",
      ja: "3. データモデル、業務不変条件、FP/FNオラクル",
    },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi xoay quanh thực thể Transaction (mã giao dịch, số tiền, thời gian, kênh, thiết bị, tọa độ), Customer (hồ sơ rủi ro, hạn mức cấu hình), FeatureSnapshot (trạng thái cửa sổ trượt tại thời điểm quyết định) và Decision (kết quả, lý do, điểm số, độ trễ xử lý). Bất biến nghiệp vụ (invariant) quan trọng nhất là: tổng số tiền các giao dịch APPROVE trong một ngày của một khách hàng không bao giờ được vượt quá hạn mức ngày đã cấu hình tại thời điểm giao dịch, kể cả khi có nhiều giao dịch đồng thời cạnh tranh cùng lúc (concurrent). Đây là bất biến bắt buộc phải giữ đúng tuyệt đối, khác với các quyết định gian lận vốn mang tính xác suất.",
        "The core data model revolves around the Transaction entity (transaction ID, amount, timestamp, channel, device, coordinates), Customer (risk profile, configured limits), FeatureSnapshot (sliding window state at decision time), and Decision (result, reason, score, processing latency). The most important business invariant is: the total amount of APPROVE transactions in one day for a customer must never exceed the configured daily limit at transaction time, even when multiple concurrent transactions compete simultaneously. This invariant must be held absolutely, unlike fraud decisions which are inherently probabilistic.",
        "コアデータモデルは、取引エンティティ（取引ID、金額、日時、チャネル、デバイス、位置情報）、顧客（リスクプロファイル、設定済み限度額）、特徴量スナップショット（判定時点のスライディングウィンドウ状態）、判定（結果、理由、スコア、処理レイテンシ）を中心に構成されます。最も重要な業務不変条件は、ある顧客の1日における承認済み取引の合計金額が、複数の同時競合取引があっても、設定された日次限度額を絶対に超えないことです。これは確率的性質を持つ不正判定とは異なり、絶対に守られなければならない不変条件です。"
      ),
      P(
        "Bất biến thứ hai liên quan đến tính đơn điệu của rủi ro: nếu một giao dịch bị đánh dấu DECLINE bởi một rule cứng (ví dụ vượt hạn mức, thẻ bị khóa), thì không có điểm ML nào có thể lật ngược quyết định thành APPROVE — rule cứng luôn có quyền phủ quyết cao nhất. Bất biến thứ ba là tính toàn vẹn của feature store: mọi giao dịch APPROVE phải được phản ánh vào cửa sổ trượt trước khi giao dịch tiếp theo của cùng khách hàng được xử lý, nếu không sẽ xảy ra hiện tượng 'double spending' vượt hạn mức do đọc dữ liệu cũ.",
        "The second invariant concerns risk monotonicity: if a transaction is marked DECLINE by a hard rule (e.g., exceeding limit, blocked card), no ML score can flip the decision back to APPROVE — hard rules always have the highest veto power. The third invariant is feature store integrity: every APPROVE transaction must be reflected into the sliding window before the next transaction of the same customer is processed, otherwise a 'double spending' phenomenon exceeding limits occurs due to reading stale data.",
        "二つ目の不変条件はリスクの単調性に関するものです。ある取引がハードルール（例：限度額超過、カード凍結）によりDECLINEと判定された場合、いかなるMLスコアもその判定をAPPROVEに覆すことはできません。ハードルールは常に最高の拒否権を持ちます。三つ目の不変条件は特徴量ストアの整合性です。すべての承認済み取引は、同一顧客の次の取引が処理される前にスライディングウィンドウへ反映されなければなりません。そうでなければ、古いデータを読み取ることによる限度額超過の「二重利用」が発生します。"
      ),
      P(
        "Oracle cho bài toán này không phải là kết quả nhị phân đơn giản mà là một bộ chỉ số thống kê đo trên tập nhãn thật (ground truth) được xác nhận sau: Precision = TP/(TP+FP) đo tỷ lệ trong các giao dịch bị chặn có bao nhiêu thực sự là gian lận; Recall = TP/(TP+FN) đo tỷ lệ gian lận thực sự bị bắt được; False Positive Rate = FP/(FP+TN) đo tỷ lệ giao dịch hợp lệ bị chặn oan. Oracle chức năng (áp hạn mức, thứ tự ưu tiên rule) phải đúng 100% và kiểm bằng assertion cứng; oracle chất lượng mô hình (Precision/Recall/FPR) được kiểm bằng ngưỡng thống kê trên tập dữ liệu hồi cứu (backtest) và giám sát trực tuyến liên tục, không thể assert cứng từng ca đơn lẻ.",
        "The oracle for this problem is not a simple binary result but a set of statistical metrics measured on a confirmed ground-truth label set: Precision = TP/(TP+FP) measures how many of the blocked transactions were truly fraud; Recall = TP/(TP+FN) measures what fraction of actual fraud was caught; False Positive Rate = FP/(FP+TN) measures the rate of legitimate transactions wrongly blocked. The functional oracle (limit enforcement, rule priority order) must be 100% correct and checked with hard assertions; the model quality oracle (Precision/Recall/FPR) is checked with statistical thresholds on a backtest dataset and continuous online monitoring, not asserted per single case.",
        "この問題のオラクルは単純な二値結果ではなく、後で確認される正解ラベル集合に対して測定される統計指標群です。適合率（Precision）= TP/(TP+FP)はブロックされた取引のうち実際に不正だった割合を、再現率（Recall）= TP/(TP+FN)は実際の不正のうち検知できた割合を、誤検知率（False Positive Rate）= FP/(FP+TN)は正規取引が誤ってブロックされた割合を測定します。機能面のオラクル（限度額適用、ルール優先順位）は100%正しくなければならず、厳格なアサーションで検証します。一方、モデル品質オラクル（適合率・再現率・誤検知率）は、バックテストデータセットに対する統計的閾値と継続的なオンライン監視で検証され、個々のケースごとに厳格判定することはできません。"
      ),
    ],
  },

  // 4. Rủi ro & chiến lược test
  {
    heading: {
      vi: "4. Rủi ro nghiệp vụ và chiến lược kiểm thử",
      en: "4. Business Risks and Test Strategy",
      ja: "4. 業務リスクとテスト戦略",
    },
    blocks: [
      P(
        "Rủi ro lớn nhất là false negative nghiêm trọng: bỏ lọt một giao dịch gian lận có thể gây thiệt hại tài chính trực tiếp và ảnh hưởng uy tín ngân hàng, đặc biệt khi gian lận xảy ra hàng loạt (fraud ring) trong thời gian ngắn. Rủi ro thứ hai là false positive gây trải nghiệm tồi: chặn nhầm giao dịch hợp lệ của khách VIP vào đúng thời điểm quan trọng (thanh toán khách sạn khi đi công tác nước ngoài) có thể dẫn đến khiếu nại, mất khách hàng, thậm chí lên báo chí. Rủi ro thứ ba là rủi ro hiệu năng: nếu quyết định chậm quá SLA, hệ thống thanh toán có thể timeout và tự động fallback theo hướng bất lợi (either auto-approve rủi ro cao, hoặc auto-decline gây tồi tệ trải nghiệm hàng loạt).",
        "The biggest risk is a severe false negative: missing a fraudulent transaction can cause direct financial loss and damage bank reputation, especially when fraud occurs in bulk (fraud ring) within a short time. The second risk is a false positive causing poor experience: wrongly blocking a VIP customer's legitimate transaction at a critical moment (paying a hotel bill on a business trip abroad) can lead to complaints, customer churn, even media coverage. The third risk is performance risk: if the decision is slower than the SLA, the payment system may time out and auto-fallback in an unfavorable direction (either risky auto-approve, or auto-decline causing mass poor experience).",
        "最大のリスクは重大な見逃し（False Negative）です。不正取引を見逃すと直接的な金銭的損失と銀行の信用毀損を招き、特に短時間で組織的に発生する不正（フロード・リング）では被害が拡大します。二つ目のリスクは体験を損なう誤検知（False Positive）です。VIP顧客の重要な瞬間（海外出張中のホテル決済など）の正規取引を誤ってブロックすると、苦情や顧客離脱、さらには報道につながる可能性があります。三つ目は性能リスクです。判定がSLAより遅い場合、決済システムがタイムアウトし、不利な方向（リスクの高い自動承認、または大量の悪い体験を招く自動拒否）にフォールバックする可能性があります。"
      ),
      P(
        "Chiến lược kiểm thử chia thành bốn tầng: (1) kiểm thử đơn vị và tích hợp cho rule engine đảm bảo mọi ngưỡng hạn mức và thứ tự ưu tiên rule đúng tuyệt đối; (2) kiểm thử mô hình (model testing) bao gồm backtest trên tập dữ liệu lịch sử có nhãn, đo Precision/Recall/FPR theo từng phân khúc rủi ro và phát hiện model drift; (3) kiểm thử đồng thời (concurrency testing) để phát hiện race condition trong cập nhật hạn mức và feature store; (4) kiểm thử tải và độ trễ (performance testing) mô phỏng lưu lượng cao điểm để xác nhận p95/p99 nằm trong SLA. Bốn tầng này chạy song song trong pipeline CI/CD, với các cổng chất lượng (quality gate) riêng biệt cho từng tầng.",
        "The test strategy is divided into four layers: (1) unit and integration testing for the rule engine ensuring every limit threshold and rule priority order is absolutely correct; (2) model testing including backtesting on labeled historical data, measuring Precision/Recall/FPR per risk segment and detecting model drift; (3) concurrency testing to detect race conditions in limit and feature store updates; (4) performance and latency testing simulating peak traffic to confirm p95/p99 stay within SLA. These four layers run in parallel in the CI/CD pipeline, with separate quality gates for each layer.",
        "テスト戦略は4層に分かれます。（1）すべての限度額閾値とルール優先順位が絶対的に正しいことを保証するルールエンジンの単体・結合テスト、（2）ラベル付き履歴データによるバックテスト、リスクセグメント別の適合率・再現率・誤検知率測定、モデルドリフト検知を含むモデルテスト、（3）限度額と特徴量ストア更新における競合状態を検出する並行性テスト、（4）ピークトラフィックを模擬してp95/p99がSLA内であることを確認する性能・レイテンシテストです。この4層はCI/CDパイプライン内で並行して実行され、各層に個別の品質ゲートを持ちます。"
      ),
      NOTE(
        "Test cho hệ thống chống gian lận không thể chỉ dựa vào assertion nhị phân — phải kết hợp assertion cứng cho luật/hạn mức và đánh giá thống kê cho mô hình.",
        "Testing a fraud system cannot rely solely on binary assertions — it must combine hard assertions for rules/limits with statistical evaluation for the model.",
        "不正検知システムのテストは二値アサーションだけに頼ることはできません。ルール・限度額に対する厳格なアサーションと、モデルに対する統計的評価を組み合わせる必要があります。"
      ),
    ],
  },

  // 5. Test Plan
  {
    heading: {
      vi: "5. Test Plan chi tiết",
      en: "5. Detailed Test Plan",
      ja: "5. 詳細テスト計画",
    },
    blocks: [
      P(
        "Test Plan bắt đầu bằng việc xác định phạm vi: trong scope gồm rule engine, feature store, decision aggregator và API quyết định; ngoài scope là việc huấn luyện mô hình ML (thuộc trách nhiệm Data Science, QA chỉ kiểm chứng kết quả đầu ra). Mục tiêu đo lường gồm: 100% ca hạn mức đúng theo bảng quy tắc, Precision tối thiểu 85% và Recall tối thiểu 90% trên tập backtest chuẩn, FPR dưới 1%, độ trễ p99 dưới 200ms ở tải 2000 giao dịch/giây. Môi trường kiểm thử cần một bản sao feature store cách ly (staging) với dữ liệu giả lập đại diện đủ các phân khúc khách hàng và kịch bản gian lận đã biết.",
        "The Test Plan starts by defining scope: in-scope includes rule engine, feature store, decision aggregator, and the decision API; out-of-scope is ML model training (Data Science's responsibility, QA only verifies output results). Measurement goals include: 100% correct limit cases per the rule table, minimum 85% Precision and minimum 90% Recall on the standard backtest set, FPR under 1%, p99 latency under 200ms at 2000 transactions/second load. The test environment needs an isolated feature store replica (staging) with synthetic data representing enough customer segments and known fraud scenarios.",
        "テスト計画はまずスコープの定義から始まります。対象範囲はルールエンジン、特徴量ストア、判定アグリゲータ、判定APIです。範囲外はMLモデルの学習（データサイエンスの責任範囲、QAは出力結果の検証のみ行う）です。測定目標は、ルール表に基づく限度額ケースの100%正確性、標準バックテストセットでの適合率85%以上・再現率90%以上、誤検知率1%未満、2000件/秒の負荷でのp99レイテンシ200ミリ秒未満です。テスト環境には、十分な顧客セグメントと既知の不正シナリオを表す模擬データを持つ、隔離された特徴量ストアのレプリカ（ステージング）が必要です。"
      ),
      P(
        "Lịch trình kiểm thử chia theo sprint: sprint đầu tập trung kiểm thử chức năng rule engine và API cơ bản; sprint hai bổ sung kiểm thử đồng thời và race condition trên hạn mức; sprint ba chạy backtest mô hình với tập dữ liệu lớn và đo các chỉ số chất lượng; sprint bốn thực hiện kiểm thử tải kết hợp đo độ trễ đầu-cuối. Vai trò được phân định rõ: kỹ sư kiểm thử tự động hóa API sở hữu rule engine test, kỹ sư hiệu năng sở hữu load test, và một chuyên gia phân tích dữ liệu phối hợp đánh giá chất lượng mô hình cùng QA lead. Rủi ro của kế hoạch (dữ liệu backtest không đại diện đủ, môi trường staging không phản ánh đúng độ trễ mạng thật) được ghi nhận và có phương án giảm thiểu bằng cách đối chiếu định kỳ với dữ liệu production ẩn danh.",
        "The test schedule is divided by sprint: the first sprint focuses on rule engine and basic API functional testing; the second adds concurrency and race condition testing on limits; the third runs model backtesting with a large dataset and measures quality metrics; the fourth performs load testing combined with end-to-end latency measurement. Roles are clearly defined: API automation engineers own the rule engine tests, performance engineers own load testing, and a data analyst coordinates model quality assessment with the QA lead. Plan risks (backtest data not representative enough, staging environment not reflecting real network latency) are recorded with mitigation via periodic comparison against anonymized production data.",
        "テストスケジュールはスプリント単位で区切られます。第1スプリントはルールエンジンと基本APIの機能テストに注力し、第2スプリントは限度額における並行性・競合状態テストを追加し、第3スプリントは大規模データセットによるモデルバックテストと品質指標測定を行い、第4スプリントは負荷テストとエンドツーエンドのレイテンシ測定を組み合わせて実施します。役割は明確に分担されます。API自動化エンジニアがルールエンジンテストを担当し、性能エンジニアが負荷テストを担当し、データアナリストがQAリードと共にモデル品質評価を調整します。計画のリスク（バックテストデータの代表性不足、ステージング環境が実際のネットワーク遅延を反映していないこと）は記録され、匿名化された本番データとの定期的な照合による緩和策が用意されます。"
      ),
    ],
  },

  // 6. Ma trận ca (IMG svg2)
  {
    heading: {
      vi: "6. Ma trận ca kiểm thử theo ngưỡng rule",
      en: "6. Test Case Matrix by Rule Threshold",
      ja: "6. ルール閾値によるテストケースマトリクス",
    },
    blocks: [
      P(
        "Ma trận ca kiểm thử được tổ chức theo từng rule và giá trị biên của nó, kết hợp kỹ thuật phân vùng tương đương và giá trị biên cổ điển với tư duy oracle gian lận. Với rule velocity (số giao dịch trong 60 giây), các ca cần kiểm gồm: đúng ngưỡng (4 giao dịch/60s là hợp lệ), tại ngưỡng (5 giao dịch/60s kích hoạt HOLD), vượt ngưỡng nhiều (10 giao dịch/60s phải DECLINE), và ca biên thời gian (giao dịch thứ 5 xảy ra đúng tại mili-giây 59999 của cửa sổ 60000ms để kiểm tra làm tròn cửa sổ trượt).",
        "The test case matrix is organized by each rule and its boundary value, combining classic equivalence partitioning and boundary value techniques with fraud oracle thinking. For the velocity rule (transaction count in 60 seconds), cases to check include: under threshold (4 transactions/60s is valid), at threshold (5 transactions/60s triggers HOLD), well over threshold (10 transactions/60s must DECLINE), and a time boundary case (the 5th transaction occurring exactly at millisecond 59999 of the 60000ms window to check sliding window rounding).",
        "テストケースマトリクスは、各ルールとその境界値ごとに整理され、古典的な同値分割・境界値分析の手法と不正検知オラクルの考え方を組み合わせています。取引頻度ルール（60秒間の取引件数）については、閾値未満（60秒間に4件は有効）、閾値ちょうど（60秒間に5件でHOLD発動）、閾値を大幅超過（60秒間に10件はDECLINE必須）、時間境界ケース（5件目の取引が60000ミリ秒ウィンドウの59999ミリ秒目に発生し、スライディングウィンドウの丸めを確認）を検証する必要があります。"
      ),
      IMG(svg2,
        "Bảng ngưỡng rule velocity/geo/device với hành động và tiêu chí oracle FP/FN tương ứng.",
        "Velocity/geo/device rule threshold table with corresponding actions and FP/FN oracle criteria.",
        "取引頻度・地理・デバイスルールの閾値表と、対応するアクションおよびFP/FNオラクル基準。"
      ),
      P(
        "Với rule geo-jump, ca đặc biệt cần kiểm là hai giao dịch cách nhau 800km trong 30 phút — vận tốc ngụ ý vượt tốc độ máy bay thương mại, phải DECLINE; nhưng ca đối chứng quan trọng không kém là giao dịch qua ứng dụng ví điện tử không có tọa độ vật lý thật (chỉ có IP), nơi rule geo-jump không nên áp dụng cứng mà phải hạ trọng số để tránh false positive hàng loạt cho khách hàng dùng VPN công ty hợp pháp. Với rule device mới, ma trận cần phủ tổ hợp: thiết bị mới + số tiền nhỏ (thường APPROVE với giám sát), thiết bị mới + số tiền lớn (HOLD yêu cầu OTP), và thiết bị đã tin cậy trước đó nhưng đổi SIM gần đây (rủi ro SIM-swap, cần rule riêng). Với hạn mức ngày, ma trận phải phủ ca đua tranh (race): hai giao dịch gửi đồng thời khi tổng cộng vừa đúng bằng hạn mức, chỉ một giao dịch được APPROVE, giao dịch còn lại phải DECLINE dù xử lý gần như cùng lúc.",
        "For the geo-jump rule, a special case to check is two transactions 800km apart within 30 minutes — the implied velocity exceeds commercial airplane speed, must DECLINE; but an equally important counter-case is a transaction via an e-wallet app with no true physical coordinates (only IP), where geo-jump should not apply hard but should be down-weighted to avoid mass false positives for customers legitimately using corporate VPNs. For the new device rule, the matrix needs to cover combinations: new device + small amount (usually APPROVE with monitoring), new device + large amount (HOLD requiring OTP), and a previously trusted device with a recent SIM change (SIM-swap risk, needs a dedicated rule). For the daily limit, the matrix must cover a race case: two transactions submitted simultaneously when the total exactly equals the limit — only one transaction should be APPROVE, the other must DECLINE even though processed nearly at the same time.",
        "地理的ジャンプルールについては、30分以内に800km離れた2つの取引という特殊ケースを確認する必要があります。この暗示的な速度は商用旅客機の速度を超えるためDECLINEが必須です。同様に重要な対照ケースとして、実際の物理座標を持たない（IPのみの）電子ウォレットアプリ経由の取引があり、この場合、地理的ジャンプルールを厳格に適用するのではなく、正規の企業VPNを使う顧客への大量の誤検知を避けるため重み付けを下げるべきです。新規デバイスルールについては、新規デバイス＋少額（通常は監視付きAPPROVE）、新規デバイス＋高額（OTP要求のHOLD）、以前から信頼されているデバイスだが最近SIM変更あり（SIMスワップリスク、専用ルールが必要）の組み合わせをマトリクスでカバーする必要があります。日次限度額については、レースケースをカバーする必要があります。合計がちょうど限度額と等しくなる2つの取引が同時に送信された場合、ほぼ同時に処理されても、1つのみがAPPROVEされ、もう1つはDECLINEされなければなりません。"
      ),
    ],
  },

  // 7. Chuẩn bị dữ liệu / mock feature store
  {
    heading: {
      vi: "7. Chuẩn bị dữ liệu kiểm thử và mock feature store",
      en: "7. Test Data Preparation and Feature Store Mocking",
      ja: "7. テストデータ準備と特徴量ストアのモック",
    },
    blocks: [
      P(
        "Chuẩn bị dữ liệu cho hệ thống gian lận đòi hỏi ba nguồn: dữ liệu tổng hợp (synthetic) sinh theo kịch bản để kiểm thử chức năng rule chính xác, dữ liệu lịch sử ẩn danh có nhãn xác nhận (confirmed fraud/legit) để backtest mô hình, và dữ liệu mô phỏng tải (load) sinh theo phân phối thực tế của lưu lượng cao điểm. Với dữ liệu tổng hợp, mỗi ca cần một 'kịch bản khách hàng' đầy đủ: hồ sơ rủi ro ban đầu, lịch sử giao dịch nền (background transactions) để feature store có trạng thái hợp lý trước khi giao dịch kiểm thử được gửi, tránh trường hợp cửa sổ trượt trống làm sai lệch kết quả rule velocity.",
        "Preparing data for the fraud system requires three sources: synthetic data generated by scenario to test exact rule functionality, anonymized historical data with confirmed labels (confirmed fraud/legit) to backtest the model, and simulated load data generated per the actual distribution of peak traffic. For synthetic data, each case needs a full 'customer scenario': an initial risk profile, background transaction history so the feature store has a reasonable state before the test transaction is submitted, avoiding an empty sliding window that would skew velocity rule results.",
        "不正検知システムのデータ準備には3つの情報源が必要です。正確なルール機能をテストするためのシナリオベースの合成データ、モデルのバックテストのための確認済みラベル（確定不正／正規）付き匿名化履歴データ、そしてピークトラフィックの実際の分布に基づいて生成される負荷シミュレーションデータです。合成データについては、各ケースに完全な「顧客シナリオ」が必要です。初期リスクプロファイル、テスト取引が送信される前に特徴量ストアが妥当な状態を持つようにする背景取引履歴（これがないと、空のスライディングウィンドウが取引頻度ルールの結果を歪めてしまいます）。"
      ),
      CODE("javascript",
`// mock-feature-store.js — dựng feature store giả lập cho test rule engine
class MockFeatureStore {
  constructor() { this.windows = new Map(); } // customerId -> [{ts, amount, geo, deviceId}]

  seedBackground(customerId, transactions) {
    this.windows.set(customerId, [...transactions]);
  }

  record(customerId, tx) {
    const list = this.windows.get(customerId) || [];
    list.push(tx);
    this.windows.set(customerId, list);
  }

  velocityLastNSeconds(customerId, nowMs, windowMs) {
    const list = this.windows.get(customerId) || [];
    return list.filter(t => nowMs - t.ts <= windowMs).length;
  }

  dailyTotal(customerId, dayKey) {
    const list = this.windows.get(customerId) || [];
    return list
      .filter(t => t.dayKey === dayKey)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  geoJumpKmh(customerId, newTx) {
    const list = this.windows.get(customerId) || [];
    const last = list[list.length - 1];
    if (!last) return 0;
    const hours = (newTx.ts - last.ts) / 3_600_000;
    const km = haversineKm(last.geo, newTx.geo);
    return hours > 0 ? km / hours : Infinity;
  }
}

module.exports = { MockFeatureStore };`
      ),
      TIP(
        "Luôn seed dữ liệu nền (background transactions) trước khi gửi giao dịch kiểm thử, nếu không cửa sổ trượt trống sẽ khiến mọi ca velocity/geo đều PASS giả tạo.",
        "Always seed background transactions before sending the test transaction, otherwise an empty sliding window makes every velocity/geo case falsely PASS.",
        "テスト取引を送信する前に必ず背景取引データをシードしてください。そうしないと、空のスライディングウィンドウにより取引頻度・地理ルールのケースがすべて偽の合格となってしまいます。"
      ),
    ],
  },

  // 8. Happy path
  {
    heading: {
      vi: "8. Happy path: giao dịch hợp lệ được duyệt đúng luồng",
      en: "8. Happy Path: Legitimate Transaction Approved Correctly",
      ja: "8. ハッピーパス：正規取引の正しい承認フロー",
    },
    blocks: [
      P(
        "Ca happy path xác nhận rằng một giao dịch hoàn toàn bình thường — số tiền nhỏ, thiết bị quen thuộc, vị trí địa lý nhất quán, chưa chạm bất kỳ ngưỡng hạn mức nào — được APPROVE trong thời gian dưới SLA và feature store được cập nhật đúng ngay sau đó để phản ánh cho giao dịch tiếp theo. Ca này tưởng đơn giản nhưng là nền tảng để phát hiện regression: nếu một thay đổi rule vô tình siết chặt ngưỡng, ca happy path sẽ là ca đầu tiên báo động vì tỷ lệ approve giảm bất thường trên tập hồi quy.",
        "The happy path case confirms that a completely normal transaction — small amount, familiar device, consistent geographic location, not touching any limit threshold — is APPROVE within SLA and the feature store is correctly updated right after to reflect the next transaction. This case seems simple but is the foundation for detecting regression: if a rule change accidentally tightens a threshold, the happy path case will be the first to alarm because the approve rate drops abnormally in the regression suite.",
        "ハッピーパスケースは、金額が小さく、デバイスも見慣れたもので、地理的位置も一貫しており、いかなる限度額閾値にも触れていない完全に正常な取引が、SLA内でAPPROVEされ、その直後に次の取引に反映されるよう特徴量ストアが正しく更新されることを確認します。このケースは単純に見えますが、リグレッション検知の基盤です。ルール変更が誤って閾値を厳しくした場合、リグレッションスイートで承認率が異常に低下するため、ハッピーパスケースが最初に警告を発します。"
      ),
      CODE("javascript",
`// happy-path.test.js — giao dịch hợp lệ được duyệt trong SLA
const { scoreTransaction } = require("../src/decisionAggregator");
const { MockFeatureStore } = require("./mock-feature-store");

test("giao dịch nhỏ, thiết bị quen, geo nhất quán -> APPROVE trong SLA", async () => {
  const store = new MockFeatureStore();
  store.seedBackground("cust-001", [
    { ts: Date.now() - 3_600_000, amount: 200_000, geo: { lat: 10.77, lng: 106.7 }, deviceId: "dev-A" },
  ]);

  const tx = {
    customerId: "cust-001",
    amount: 150_000,
    ts: Date.now(),
    geo: { lat: 10.78, lng: 106.69 },
    deviceId: "dev-A",
  };

  const start = performance.now();
  const decision = await scoreTransaction(tx, store);
  const latencyMs = performance.now() - start;

  expect(decision.result).toBe("APPROVE");
  expect(decision.triggeredRules).toHaveLength(0);
  expect(latencyMs).toBeLessThan(200);

  const total = store.dailyTotal("cust-001", decision.dayKey);
  expect(total).toBe(350_000); // đã cộng dồn giao dịch mới
});`
      ),
    ],
  },

  // 9. Ca lỗi chuyên sâu
  {
    heading: {
      vi: "9. Ca lỗi chuyên sâu: false accept/reject và race hạn mức",
      en: "9. Deep-Dive Failure Cases: False Accept/Reject and Limit Race",
      ja: "9. 深掘り失敗ケース：誤受理・誤拒否と限度額レース",
    },
    blocks: [
      P(
        "Ca false accept (false negative) mô phỏng một fraud ring dùng nhiều giao dịch nhỏ dưới ngưỡng để tránh rule velocity đơn giản (kỹ thuật 'smurfing'). Test phải xác nhận rule engine có luật tổng hợp theo tổng số tiền cộng dồn trong cửa sổ dài hơn, không chỉ đếm số lượng giao dịch. Ca false reject (false positive) mô phỏng khách hàng thật đi công tác nước ngoài, đổi liên tiếp nhiều quốc gia trong vài ngày — hệ thống cần có cơ chế 'travel notice' hoặc giảm trọng số geo-jump khi khách đã khai báo trước, nếu không sẽ chặn oan hàng loạt giao dịch hợp lệ.",
        "The false accept (false negative) case simulates a fraud ring using many small transactions below the threshold to evade a simple velocity rule ('smurfing' technique). The test must confirm the rule engine has an aggregate rule on cumulative amount over a longer window, not just counting transaction quantity. The false reject (false positive) case simulates a real customer traveling abroad, switching countries in quick succession over a few days — the system needs a 'travel notice' mechanism or reduced geo-jump weight when the customer has pre-declared, otherwise it will wrongly block a batch of legitimate transactions.",
        "誤受理（見逃し）ケースは、単純な取引頻度ルールを回避するため閾値以下の多数の少額取引を使うフロード・リング（「スマーフィング」手法）を模擬します。テストでは、ルールエンジンが取引件数だけでなく、より長いウィンドウでの累計金額に基づく集計ルールを持っていることを確認する必要があります。誤拒否（誤検知）ケースは、数日間で複数国を短期間に移動する海外出張中の実在顧客を模擬します。システムには「渡航通知」機能や、顧客が事前申告している場合の地理的ジャンプの重み低減機構が必要です。そうでなければ、大量の正規取引が誤ってブロックされてしまいます。"
      ),
      CODE("javascript",
`// smurfing.test.js — phát hiện gian lận chia nhỏ giao dịch dưới ngưỡng velocity
test("nhiều giao dịch nhỏ dưới ngưỡng nhưng tổng vượt hạn mức 1h -> HOLD", async () => {
  const store = new MockFeatureStore();
  const base = Date.now() - 55 * 60_000;
  // 8 giao dịch 3 triệu mỗi lần, rải trong 55 phút, mỗi lần không vượt ngưỡng đơn lẻ
  for (let i = 0; i < 8; i++) {
    store.record("cust-002", {
      ts: base + i * 6 * 60_000,
      amount: 3_000_000,
      geo: { lat: 10.77, lng: 106.7 },
      deviceId: "dev-B",
      dayKey: "2026-07-07",
    });
  }

  const tx = { customerId: "cust-002", amount: 3_000_000, ts: Date.now(),
    geo: { lat: 10.77, lng: 106.7 }, deviceId: "dev-B" };

  const decision = await scoreTransaction(tx, store);
  expect(decision.result).toBe("HOLD");
  expect(decision.triggeredRules).toContain("AGGREGATE_AMOUNT_1H");
});`
      ),
      CODE("javascript",
`// limit-race.test.js — hai giao dịch đồng thời cạnh tranh hạn mức ngày
test("2 giao dịch đồng thời vừa đủ hạn mức -> chỉ 1 APPROVE", async () => {
  const store = new MockFeatureStore();
  const limitDaily = 10_000_000;
  store.seedBackground("cust-003", []);

  const txA = { customerId: "cust-003", amount: 6_000_000, ts: Date.now(), dayKey: "2026-07-07" };
  const txB = { customerId: "cust-003", amount: 6_000_000, ts: Date.now(), dayKey: "2026-07-07" };

  // gửi đồng thời để mô phỏng race condition thực tế
  const [decisionA, decisionB] = await Promise.all([
    scoreTransaction(txA, store, { limitDaily }),
    scoreTransaction(txB, store, { limitDaily }),
  ]);

  const approvedCount = [decisionA, decisionB].filter(d => d.result === "APPROVE").length;
  expect(approvedCount).toBe(1); // atomic reservation phải chặn giao dịch thứ 2
  expect(store.dailyTotal("cust-003", "2026-07-07")).toBeLessThanOrEqual(limitDaily);
});`
      ),
      WARN(
        "Nếu kiểm tra hạn mức được thực hiện bằng đọc-rồi-ghi (read-then-write) không atomic, ca race hạn mức sẽ pass giả tạo trong môi trường đơn luồng nhưng thất bại trong production đa luồng thật — luôn kiểm bằng Promise.all hoặc công cụ tải đồng thời thực sự.",
        "If limit checking is done via non-atomic read-then-write, the limit race case will falsely pass in a single-threaded environment but fail in real multi-threaded production — always test with Promise.all or a genuine concurrent load tool.",
        "限度額チェックが非アトミックな読み取り→書き込みで行われている場合、限度額レースケースはシングルスレッド環境では偽の合格となりますが、実際のマルチスレッド本番環境では失敗します。必ずPromise.allや実際の並行負荷ツールでテストしてください。"
      ),
    ],
  },

  // 10. CI/CD + Precision-Recall + k6
  {
    heading: {
      vi: "10. CI/CD: đo Precision/Recall và tải độ trễ bằng k6",
      en: "10. CI/CD: Measuring Precision/Recall and Latency Load with k6",
      ja: "10. CI/CD：k6による適合率・再現率と負荷レイテンシの測定",
    },
    blocks: [
      P(
        "Pipeline CI/CD cho hệ thống này cần ba cổng chất lượng tách biệt: cổng chức năng (unit/integration test rule engine phải 100% pass), cổng chất lượng mô hình (backtest Precision/Recall/FPR phải đạt ngưỡng tối thiểu đã thống nhất với ủy ban rủi ro), và cổng hiệu năng (k6 load test đo p95/p99 độ trễ dưới tải mô phỏng). Cổng chất lượng mô hình chạy trên tập dữ liệu hồi cứu cố định (frozen backtest set) để đảm bảo so sánh công bằng giữa các phiên bản mô hình, tránh tình trạng 'data leakage' khi vô tình dùng dữ liệu tương lai để đánh giá.",
        "The CI/CD pipeline for this system needs three separate quality gates: a functional gate (rule engine unit/integration tests must be 100% pass), a model quality gate (backtest Precision/Recall/FPR must meet the minimum threshold agreed with the risk committee), and a performance gate (k6 load test measuring p95/p99 latency under simulated load). The model quality gate runs on a frozen backtest dataset to ensure fair comparison between model versions, avoiding 'data leakage' from accidentally using future data for evaluation.",
        "このシステムのCI/CDパイプラインには3つの独立した品質ゲートが必要です。機能ゲート（ルールエンジンの単体・結合テストは100%合格が必須）、モデル品質ゲート（バックテストの適合率・再現率・誤検知率がリスク委員会と合意した最低閾値を満たすこと）、性能ゲート（k6負荷テストによるシミュレーション負荷下でのp95/p99レイテンシ測定）です。モデル品質ゲートは、モデルバージョン間の公平な比較を保証し、評価に将来のデータを誤って使用する「データリーク」を避けるため、固定されたバックテストデータセット上で実行されます。"
      ),
      CODE("yaml",
`# .github/workflows/fraud-quality-gate.yml
name: fraud-quality-gate
on: [pull_request]

jobs:
  functional-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:rule-engine -- --coverage

  model-backtest:
    runs-on: ubuntu-latest
    needs: functional-tests
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node scripts/backtest.js --dataset frozen-2026-06.parquet --out report.json
      - run: node scripts/check-thresholds.js --precision-min 0.85 --recall-min 0.90 --fpr-max 0.01

  latency-load:
    runs-on: ubuntu-latest
    needs: functional-tests
    steps:
      - uses: actions/checkout@v4
      - name: Run k6 load test
        uses: grafana/k6-action@v0.3.1
        with:
          filename: k6/fraud-latency.js
        env:
          TARGET_RPS: "2000"
          P99_MAX_MS: "200"`
      ),
      CODE("javascript",
`// k6/fraud-latency.js — kiểm tải độ trễ quyết định gian lận thời gian thực
import http from "k6/http";
import { check } from "k6";
import { Trend } from "k6/metrics";

const decisionLatency = new Trend("decision_latency_ms");

export const options = {
  scenarios: {
    peak_traffic: {
      executor: "constant-arrival-rate",
      rate: 2000,
      timeUnit: "1s",
      duration: "3m",
      preAllocatedVUs: 300,
      maxVUs: 800,
    },
  },
  thresholds: {
    "decision_latency_ms": ["p(95)<180", "p(99)<200"],
    "http_req_failed": ["rate<0.001"],
  },
};

export default function () {
  const payload = JSON.stringify({
    customerId: \`cust-\${__VU}\`,
    amount: Math.floor(Math.random() * 5_000_000),
    deviceId: \`dev-\${__VU % 50}\`,
    geo: { lat: 10.77 + Math.random() * 0.1, lng: 106.7 + Math.random() * 0.1 },
  });

  const res = http.post("https://staging.bank.internal/api/fraud/score", payload, {
    headers: { "Content-Type": "application/json" },
  });

  decisionLatency.add(res.timings.duration);
  check(res, { "status 200": (r) => r.status === 200 });
}`
      ),
      NOTE(
        "Ba cổng chạy song song nhưng deploy chỉ được phép khi CẢ BA đều xanh — riêng cổng mô hình cần thêm bước phê duyệt thủ công của ủy ban rủi ro khi ngưỡng thay đổi.",
        "The three gates run in parallel but deploy is only allowed when ALL THREE are green — the model gate additionally requires manual risk committee approval when thresholds change.",
        "3つのゲートは並行して実行されますが、デプロイは3つすべてがグリーンの場合のみ許可されます。モデルゲートは閾値変更時にリスク委員会の手動承認がさらに必要です。"
      ),
    ],
  },

  // 11. Phỏng vấn
  {
    heading: {
      vi: "11. Góc phỏng vấn: câu hỏi và kịch bản thực chiến",
      en: "11. Interview Corner: Questions and Real-World Scenario",
      ja: "11. 面接コーナー：質問と実戦シナリオ",
    },
    blocks: [
      SCEN(
        "Phỏng vấn viên đưa tình huống: 'Đội Data Science báo Precision tăng từ 82% lên 91% sau khi siết ngưỡng ML, nhưng Recall giảm từ 93% xuống 84%. Anh/chị làm QA sẽ phản hồi thế nào trước khi cho phép deploy?'",
        "The interviewer gives a scenario: 'The Data Science team reports Precision increased from 82% to 91% after tightening the ML threshold, but Recall dropped from 93% to 84%. As QA, how would you respond before allowing deploy?'",
        "Ứng viên nên chỉ ra đây không đơn thuần là đánh đổi có lợi: Recall giảm 9 điểm phần trăm nghĩa là bỏ lọt nhiều giao dịch gian lận thực sự hơn, cần quy đổi ra thiệt hại tài chính ước tính (severity-weighted amount) chứ không chỉ nhìn tỷ lệ phần trăm. Đối chiếu với ngưỡng tối thiểu Recall ≥90% đã thống nhất với ủy ban rủi ro (chương 5), ứng viên nên đề nghị KHÔNG deploy cho tới khi có phân tích chi tiết theo phân khúc rủi ro và số tiền gian lận bị bỏ lọt, đồng thời đề xuất chạy A/B trên traffic thấp trước khi rollout toàn bộ.",
        "面接官はシナリオを提示します。「データサイエンスチームはMLの閾値を厳しくした後、適合率が82%から91%に上昇したが、再現率は93%から84%に低下したと報告しています。QAとして、デプロイを許可する前にどう対応しますか。」",
        "候補者は、これが単純に有利なトレードオフではないことを指摘すべきです。再現率が9ポイント低下したということは、より多くの実際の不正取引を見逃すことを意味し、パーセンテージだけでなく推定される金銭的損失（重大度加重金額）に換算する必要があります。リスク委員会と合意した最低再現率90%以上の基準（第5章）と照らし合わせ、候補者はリスクセグメント別と見逃した不正金額の詳細分析が得られるまでデプロイしないよう提案し、全面展開前に低トラフィックでA/Bテストを実施することを提案すべきです。"
      ),
      QA(
        "Làm sao kiểm thử một hệ thống mà kết quả đúng/sai không xác định ngay lập tức (nhãn gian lận chỉ có sau vài ngày điều tra)?",
        "How do you test a system where correctness isn't known immediately (fraud labels only arrive after days of investigation)?",
        "Chiến lược 'oracle trễ' (delayed oracle): tách kiểm thử thành hai lớp. Lớp tức thời kiểm chứng hành vi xác định được ngay (hạn mức, thứ tự rule, độ trễ) bằng assertion cứng. Lớp trễ thu thập quyết định cùng nhãn xác nhận sau này vào kho dữ liệu riêng, rồi chạy job định kỳ (hàng ngày/tuần) tính lại Precision/Recall/FPR trên cửa sổ trượt, so sánh với ngưỡng đã thống nhất và cảnh báo khi lệch chuẩn (model drift).",
        "A 'delayed oracle' strategy: split testing into two layers. The immediate layer verifies behavior that is known right away (limits, rule order, latency) with hard assertions. The delayed layer collects decisions along with confirmed labels that arrive later into a dedicated data store, then runs a periodic job (daily/weekly) to recompute Precision/Recall/FPR over a sliding window, comparing against the agreed threshold and alerting on model drift.",
        "不正判定のラベルが数日間の調査後にしか確定しないシステムをどうテストしますか。",
        "「遅延オラクル」戦略を用います。テストを2層に分けます。即時層はすぐに判明する挙動（限度額、ルール順序、レイテンシ）を厳格なアサーションで検証します。遅延層は判定結果と後で確定するラベルを専用のデータストアに収集し、定期ジョブ（日次・週次）でスライディングウィンドウ上の適合率・再現率・誤検知率を再計算し、合意された閾値と比較してモデルドリフトを警告します。"
      ),
      QA(
        "Rule cứng (hạn mức) và điểm ML mềm nên phối hợp thế nào khi ra quyết định cuối?",
        "How should hard rules (limits) and soft ML scores collaborate in the final decision?",
        "Nguyên tắc phân tầng quyền phủ quyết: rule cứng liên quan tuân thủ và hạn mức pháp lý luôn có quyền phủ quyết tuyệt đối, không mô hình nào được lật ngược quyết định DECLINE của rule cứng. Điểm ML chỉ tác động trong vùng xám nơi rule không cứng — quyết định giữa APPROVE và HOLD. Việc phân tầng rõ ràng giúp QA thiết kế ca kiểm thử độc lập cho từng tầng và giúp giải trình quyết định minh bạch khi khách hàng khiếu nại.",
        "The layered veto principle: hard rules related to compliance and legal limits always have absolute veto power — no model can flip a hard rule's DECLINE decision. ML scores only influence the gray zone where rules aren't hard — deciding between APPROVE and HOLD. Clear layering helps QA design independent test cases per layer and helps transparently explain decisions when a customer complains.",
        "ハードルール（限度額）とソフトなMLスコアは最終判定でどう連携すべきですか。",
        "階層的拒否権の原則です。コンプライアンスや法定限度額に関するハードルールは常に絶対的な拒否権を持ち、いかなるモデルもハードルールのDECLINE判定を覆すことはできません。MLスコアは、ルールが厳格でないグレーゾーン（承認と保留の間の判定）にのみ影響します。明確な階層化により、QAは各層ごとに独立したテストケースを設計でき、顧客からの苦情に対して判定を透明に説明できます。"
      ),
      QA(
        "Khi tải tăng đột biến (Black Friday) và ML model timeout, hệ thống nên fallback thế nào để vẫn an toàn?",
        "When load spikes suddenly (Black Friday) and the ML model times out, how should the system fall back to remain safe?",
        "Chiến lược fallback an toàn: khi ML timeout, hệ thống chuyển về chế độ chỉ dùng rule cứng (rule-only mode) với ngưỡng thận trọng hơn bình thường (ví dụ hạ ngưỡng velocity để bù đắp việc thiếu điểm ML), đồng thời tăng tỷ lệ HOLD thay vì APPROVE tự động cho giao dịch số tiền lớn. QA cần có bộ test riêng mô phỏng ML timeout để xác nhận fallback kích hoạt đúng và không có khoảng trống bảo mật (an toàn hơn là chậm, nhưng không được mất kiểm soát).",
        "The safe fallback strategy: when ML times out, the system switches to rule-only mode with a more conservative threshold than normal (e.g., lowering the velocity threshold to compensate for missing ML score), while also increasing the HOLD rate instead of auto-APPROVE for large-amount transactions. QA needs a dedicated test suite simulating ML timeout to confirm fallback triggers correctly and there is no security gap (safer to be slower, but must not lose control).",
        "負荷が急増（ブラックフライデー）してMLモデルがタイムアウトした場合、システムはどう安全にフォールバックすべきですか。",
        "安全なフォールバック戦略です。MLがタイムアウトした場合、システムはルールのみモード（rule-only mode）に切り替わり、通常より慎重な閾値（例：MLスコアの欠如を補うため取引頻度閾値を下げる）を適用し、同時に高額取引に対する自動APPROVEではなくHOLD率を高めます。QAはMLタイムアウトを模擬する専用テストスイートを用意し、フォールバックが正しく発動し、セキュリティの隙間がないことを確認する必要があります（遅くなる方が安全だが、制御を失ってはならない）。"
      ),
    ],
  },

  // 12. Tóm tắt & checklist
  {
    heading: {
      vi: "12. Tóm tắt và checklist trước khi go-live",
      en: "12. Summary and Go-Live Checklist",
      ja: "12. まとめとゴーライブ前チェックリスト",
    },
    blocks: [
      P(
        "Kiểm thử hệ thống chống gian lận và hạn mức thời gian thực đòi hỏi tư duy khác biệt căn bản so với kiểm thử chức năng thông thường: một phần bài toán có oracle xác định tuyệt đối (hạn mức, thứ tự rule), phần còn lại có oracle thống kê xác suất (chất lượng mô hình ML). Người làm test phải thông thạo cả hai ngôn ngữ — assertion cứng của kỹ thuật kiểm thử truyền thống và các chỉ số Precision/Recall/FPR của khoa học dữ liệu — để có thể giao tiếp hiệu quả với cả đội kỹ thuật lẫn ủy ban rủi ro. Việc bỏ qua một trong hai khía cạnh đều dẫn đến rủi ro nghiêm trọng: chỉ kiểm chức năng mà bỏ qua chất lượng mô hình sẽ khiến hệ thống 'chạy đúng' nhưng chặn oan hoặc bỏ lọt hàng loạt; chỉ kiểm mô hình mà bỏ qua chức năng sẽ khiến vi phạm hạn mức pháp lý dẫn đến hậu quả tuân thủ nghiêm trọng.",
        "Testing a realtime fraud and limits system requires a fundamentally different mindset from ordinary functional testing: part of the problem has an absolutely deterministic oracle (limits, rule order), the rest has a statistical/probabilistic oracle (ML model quality). Testers must be fluent in both languages — hard assertions from traditional testing technique and Precision/Recall/FPR metrics from data science — to communicate effectively with both the engineering team and the risk committee. Neglecting either aspect leads to serious risk: testing only functionality while ignoring model quality lets the system 'run correctly' yet mass-block or mass-miss; testing only the model while ignoring functionality lets legal limit violations cause serious compliance consequences.",
        "リアルタイム不正検知・限度額システムのテストには、通常の機能テストとは根本的に異なる思考が求められます。問題の一部は絶対的に決定論的なオラクル（限度額、ルール順序）を持ち、残りは統計的・確率的オラクル（MLモデル品質）を持ちます。テスターは、従来のテスト手法による厳格なアサーションと、データサイエンスの適合率・再現率・誤検知率指標という両方の言語に精通し、エンジニアリングチームとリスク委員会の両方と効果的にコミュニケーションできなければなりません。どちらか一方を軽視すると深刻なリスクにつながります。機能のみをテストしモデル品質を無視すると、システムは「正しく動作」していても大量の誤検知や見逃しを起こします。モデルのみをテストし機能を無視すると、法定限度額違反が深刻なコンプライアンス上の結果を招きます。"
      ),
      UL(
        [
          "Checklist go-live: bảng ngưỡng rule đã được ủy ban rủi ro phê duyệt bằng văn bản",
          "Backtest Precision ≥85%, Recall ≥90%, FPR <1% trên tập dữ liệu đóng băng gần nhất",
          "Test race condition hạn mức pass với công cụ tải đồng thời thực sự (không chỉ đơn luồng)",
          "k6 xác nhận p99 <200ms ở 2000 giao dịch/giây liên tục 3 phút",
          "Kịch bản fallback khi ML timeout đã kiểm thử và log rõ ràng để điều tra sau",
          "Cơ chế 'travel notice' hoặc giảm trọng số geo-jump cho khách đã khai báo đi công tác",
        ],
        [
          "Go-live checklist: rule threshold table approved in writing by the risk committee",
          "Backtest Precision ≥85%, Recall ≥90%, FPR <1% on the most recent frozen dataset",
          "Limit race condition tests pass with a genuine concurrent load tool (not just single-threaded)",
          "k6 confirms p99 <200ms at 2000 transactions/second sustained for 3 minutes",
          "ML timeout fallback scenario tested with clear logging for later investigation",
          "'Travel notice' mechanism or reduced geo-jump weight for customers who pre-declared travel",
        ],
        [
          "ゴーライブチェックリスト：ルール閾値表がリスク委員会により書面で承認されている",
          "最新の固定データセットでバックテストの適合率≥85%、再現率≥90%、誤検知率<1%を達成",
          "限度額レース条件テストが実際の並行負荷ツール（シングルスレッドのみでなく）で合格",
          "k6でp99<200ミリ秒を2000件/秒で3分間持続して確認",
          "MLタイムアウト時のフォールバックシナリオをテスト済みで、後の調査用に明確にログ記録",
          "事前に渡航を申告した顧客向けの「渡航通知」機構または地理的ジャンプ重み低減",
        ]
      ),
      P(
        "Cuối cùng, chất lượng của hệ thống chống gian lận không phải là trạng thái tĩnh mà là quá trình liên tục: kẻ gian luôn thích nghi với luật mới, nên ngưỡng rule và mô hình cần được đánh giá lại định kỳ (weekly/monthly) và mọi thay đổi ngưỡng đều phải đi qua đúng ba cổng chất lượng đã trình bày. Đội QA đóng vai trò người gác cổng khách quan, đảm bảo tốc độ ra tính năng mới không đánh đổi bằng an toàn tài chính của khách hàng và uy tín ngân hàng.",
        "Finally, the quality of a fraud system is not a static state but a continuous process: fraudsters constantly adapt to new rules, so rule thresholds and models need periodic re-evaluation (weekly/monthly), and every threshold change must pass through the same three quality gates described. The QA team acts as an objective gatekeeper, ensuring the speed of shipping new features is never traded off against customer financial safety and bank reputation.",
        "最後に、不正検知システムの品質は静的な状態ではなく継続的なプロセスです。詐欺師は常に新しいルールに適応するため、ルール閾値とモデルは定期的（週次・月次）に再評価される必要があり、閾値のあらゆる変更は前述の3つの品質ゲートを通過しなければなりません。QAチームは客観的なゲートキーパーとして、新機能のリリース速度が顧客の金銭的安全と銀行の信用と引き換えにならないことを保証する役割を担います。"
      ),
    ],
  },
];

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "banking-fraud-detection-limits-realtime",
  cover: cover1,
  tags: tags("thucchien", "banking", "api", "aitesting", "k6", "realworld"),
  title: {
    vi: "Thực chiến ngân hàng: kiểm thử chống gian lận & hạn mức thời gian thực",
    en: "Banking Real-World: Testing Realtime Fraud Detection & Limits",
    ja: "銀行実戦：リアルタイム不正検知・限度額テスト",
  },
  summary: {
    vi: "Bài thực chiến sâu về kiểm thử hệ thống chống gian lận và hạn mức thời gian thực trong ngân hàng: kiến trúc, mô hình dữ liệu, oracle Precision/Recall/FPR, ma trận ca theo ngưỡng rule, race condition hạn mức, và CI/CD đo chất lượng mô hình cùng tải độ trễ bằng k6.",
    en: "A deep real-world article on testing a realtime banking fraud detection and limits system: architecture, data model, Precision/Recall/FPR oracle, rule-threshold test case matrix, limit race conditions, and CI/CD measuring model quality plus k6 latency load.",
    ja: "銀行のリアルタイム不正検知・限度額システムのテストに関する実戦的な記事です。アーキテクチャ、データモデル、適合率・再現率・誤検知率オラクル、ルール閾値別テストケースマトリクス、限度額の競合状態、そしてモデル品質とk6によるレイテンシ負荷を測定するCI/CDを解説します。",
  },
  pages: buildDoc(pages1),
};

export const THUCCHIEN_05B_DOCS = [art1];
