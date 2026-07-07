// doc_thucchien_02.mjs — 4 bài "Thực chiến doanh nghiệp" (kind=thucchien): 2 bài Bảo hiểm + 2 bài Y tế.
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ============================================================================================
// BÀI 1: Bảo hiểm — Thẩm định (underwriting) & tính phí theo bảng quyết định + hệ số actuarial
// ============================================================================================

const cover1 = makeThumb({ id: "ins-uw-01", domain: "insurance", kind: "thucchien", label: "実戦 · UNDERWRITING" });

const svg1Flow = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#1e1b4b"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e0e7ff">Luồng thẩm định & tính phí · Underwriting &amp; pricing flow</text>
<rect x="24" y="56" width="120" height="52" rx="8" fill="#312e81" stroke="#a5b4fc"/>
<text x="84" y="78" font-size="11" fill="#e0e7ff" text-anchor="middle">Hồ sơ yêu cầu</text>
<text x="84" y="94" font-size="10" fill="#c7d2fe" text-anchor="middle">Application intake</text>
<rect x="176" y="56" width="130" height="52" rx="8" fill="#312e81" stroke="#a5b4fc"/>
<text x="241" y="74" font-size="11" fill="#e0e7ff" text-anchor="middle">Thu thập rủi ro</text>
<text x="241" y="90" font-size="10" fill="#c7d2fe" text-anchor="middle">Risk data (tuổi/nghề/BMI)</text>
<rect x="338" y="56" width="150" height="52" rx="8" fill="#4338ca" stroke="#c4b5fd"/>
<text x="413" y="74" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Decision Table Engine</text>
<text x="413" y="90" font-size="10" fill="#e0e7ff" text-anchor="middle">rule + factor lookup</text>
<rect x="520" y="30" width="160" height="46" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="600" y="52" font-size="11" fill="#6ee7b7" text-anchor="middle" font-weight="700">Chấp nhận + phí</text>
<text x="600" y="66" font-size="9" fill="#a7f3d0" text-anchor="middle">Accept + premium quote</text>
<rect x="520" y="90" width="160" height="46" rx="8" fill="#450a0a" stroke="#f87171"/>
<text x="600" y="112" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="700">Từ chối / loại trừ</text>
<text x="600" y="126" font-size="9" fill="#fecaca" text-anchor="middle">Decline / exclusion</text>
<rect x="338" y="150" width="150" height="46" rx="8" fill="#3f2d0f" stroke="#fbbf24"/>
<text x="413" y="170" font-size="11" fill="#fde68a" text-anchor="middle" font-weight="700">Referral thủ công</text>
<text x="413" y="184" font-size="9" fill="#fef3c7" text-anchor="middle">Manual underwriter review</text>
<g stroke="#a5b4fc" stroke-width="2" fill="none" marker-end="url(#arr1)">
<path d="M144 82 H176"/><path d="M306 82 H338"/>
<path d="M488 74 Q 505 55 520 53"/><path d="M488 90 Q 505 108 520 108"/>
<path d="M413 108 V150"/>
</g>
<defs><marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a5b4fc"/></marker></defs>
<text x="24" y="230" font-size="10" fill="#c7d2fe">Nguồn dữ liệu bên thứ ba: bảng tử vong actuarial, dữ liệu tín dụng, MIB (medical information bureau), telematics nghề nghiệp.</text>
<text x="24" y="246" font-size="9" fill="#a5b4fc">Third-party feeds: actuarial mortality table, credit bureau, MIB, occupational telematics.</text>
</svg>`;

const svg1Table = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Bảng quyết định thẩm định (rút gọn) · Underwriting decision table (excerpt)</text>
<g font-size="11">
<rect x="24" y="44" width="672" height="28" fill="#1e293b"/>
<text x="34" y="63" fill="#93c5fd" font-weight="700">Tuổi</text>
<text x="134" y="63" fill="#93c5fd" font-weight="700">BMI</text>
<text x="224" y="63" fill="#93c5fd" font-weight="700">Hút thuốc</text>
<text x="344" y="63" fill="#93c5fd" font-weight="700">Nghề (nhóm rủi ro)</text>
<text x="524" y="63" fill="#93c5fd" font-weight="700">Bệnh nền</text>
<text x="624" y="63" fill="#93c5fd" font-weight="700">Quyết định</text>
<rect x="24" y="72" width="672" height="26" fill="#0b1220"/>
<text x="34" y="90" fill="#e2e8f0">18–35</text><text x="134" y="90" fill="#e2e8f0">18.5–24.9</text><text x="224" y="90" fill="#e2e8f0">Không</text>
<text x="344" y="90" fill="#e2e8f0">Nhóm 1 (văn phòng)</text><text x="524" y="90" fill="#e2e8f0">Không</text>
<text x="624" y="90" fill="#6ee7b7" font-weight="700">Accept ×1.00</text>
<rect x="24" y="98" width="672" height="26" fill="#111827"/>
<text x="34" y="116" fill="#e2e8f0">36–50</text><text x="134" y="116" fill="#e2e8f0">25–29.9</text><text x="224" y="116" fill="#e2e8f0">Có</text>
<text x="344" y="116" fill="#e2e8f0">Nhóm 2 (công trường)</text><text x="524" y="116" fill="#e2e8f0">Không</text>
<text x="624" y="116" fill="#fde68a" font-weight="700">Accept ×1.65</text>
<rect x="24" y="124" width="672" height="26" fill="#0b1220"/>
<text x="34" y="142" fill="#e2e8f0">51–65</text><text x="134" y="142" fill="#e2e8f0">≥30</text><text x="224" y="142" fill="#e2e8f0">Có</text>
<text x="344" y="142" fill="#e2e8f0">Nhóm 3 (thợ mỏ/lặn)</text><text x="524" y="142" fill="#e2e8f0">Tiểu đường</text>
<text x="624" y="142" fill="#fca5a5" font-weight="700">Refer thủ công</text>
<rect x="24" y="150" width="672" height="26" fill="#111827"/>
<text x="34" y="168" fill="#e2e8f0">Bất kỳ</text><text x="134" y="168" fill="#e2e8f0">Bất kỳ</text><text x="224" y="168" fill="#e2e8f0">Bất kỳ</text>
<text x="344" y="168" fill="#e2e8f0">Nhóm 4 (phi công thử nghiệm)</text><text x="524" y="168" fill="#e2e8f0">-</text>
<text x="624" y="168" fill="#f87171" font-weight="700">Decline (loại trừ)</text>
</g>
<text x="24" y="210" font-size="10" fill="#94a3b8">Công thức: phí năm = phí cơ sở(tuổi/giới) × hệ số nghề × hệ số sức khỏe (BMI, hút thuốc) × hệ số bệnh nền − chiết khấu không hút thuốc &gt; 2 năm.</text>
<text x="24" y="226" font-size="10" fill="#94a3b8">Formula: annual premium = base(age/gender) × occupation factor × health factor (BMI, smoker) × condition loading − non-smoker discount &gt; 2y.</text>
<text x="24" y="250" font-size="10" fill="#64748b">Oracle bất biến: (1) mọi input khớp đúng 1 hàng bảng quyết định — không được rơi vào 0 hoặc &gt;1 hàng; (2) phí luôn = base × Π(factors), làm tròn 2 chữ số, không âm; (3) nhóm nghề 4 luôn bị exclusion tuyệt đối bất kể sức khỏe.</text>
</svg>`;

const pages1 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Công ty bảo hiểm nhân thọ giả định VietLife xử lý trung bình 42.000 hồ sơ yêu cầu bảo hiểm mới mỗi tháng qua kênh online và đại lý, trong đó khoảng 68% được hệ thống thẩm định tự động (straight-through processing) chấp nhận trong dưới 5 phút, phần còn lại chuyển sang chuyên viên thẩm định (underwriter) người. Hệ thống Underwriting & Pricing Engine (UPE) là lõi nghiệp vụ quyết định ai được bảo hiểm, mức phí bao nhiêu, và loại trừ điều khoản nào — sai một quyết định có thể khiến công ty nhận rủi ro dưới giá (rủi ro cao nhưng phí thấp) hoặc mất khách vì phí quá cao so với rủi ro thực.",
        "The hypothetical life insurer VietLife processes an average of 42,000 new applications per month across online and agent channels, of which about 68% are approved via straight-through processing in under 5 minutes, the rest routed to a human underwriter. The Underwriting & Pricing Engine (UPE) is the business core deciding who gets covered, at what premium, and with which exclusions — one wrong decision can mean under-pricing high risk or losing customers to premiums that don't match real risk.",
        "架空の生命保険会社VietLifeは、オンラインおよび代理店チャネルを通じて月平均42,000件の新規保険申込を処理しており、そのうち約68%はストレートスルー処理（自動引受）で5分以内に承認され、残りは人間の引受担当者（アンダーライター）へ回されます。引受・料率計算エンジン（UPE）は、誰を引き受けるか、保険料をいくらにするか、どの免責事項を付けるかを決める業務の中核であり、判断を一つ誤るだけで、高リスクを低い保険料で引き受けてしまう逆選択や、実際のリスクに見合わない高すぎる保険料による顧客離反につながります。"
      ),
      P(
        "Phạm vi kiểm thử bài này tập trung vào 3 module: (1) thu thập dữ liệu rủi ro (tuổi, giới tính, BMI, tiền sử hút thuốc, nghề nghiệp, bệnh nền), (2) engine bảng quyết định (decision table) ánh xạ tổ hợp yếu tố sang quyết định chấp nhận/từ chối/refer, và (3) engine tính phí actuarial nhân các hệ số theo thứ tự chuẩn. Ràng buộc tuân thủ quan trọng: mọi quyết định từ chối phải có lý do bằng văn bản lưu vết (theo quy định bảo vệ người tiêu dùng bảo hiểm), và bảng hệ số actuarial phải khớp với bảng đã được bộ phận actuary phê duyệt, không được hard-code rải rác trong code ứng dụng.",
        "This piece's testing scope covers three modules: (1) risk data intake (age, gender, BMI, smoking history, occupation, pre-existing conditions), (2) the decision-table engine mapping factor combinations to accept/decline/refer, and (3) the actuarial pricing engine multiplying factors in a defined order. A key compliance constraint: every decline must carry a traceable written reason (insurance consumer-protection rules), and the actuarial factor tables must match the actuary-approved master table — never hard-coded scattered across application code.",
        "本稿のテスト範囲は3つのモジュールに焦点を当てます。（1）リスクデータの収集（年齢、性別、BMI、喫煙歴、職業、既往症）、（2）要因の組み合わせを引受可否・照会の判定にマッピングする決定表エンジン、（3）定められた順序で係数を乗算する保険数理的な料率計算エンジンです。重要なコンプライアンス制約として、すべての引受拒否には追跡可能な文書化された理由（保険消費者保護規則に基づく）が必要であり、保険数理係数テーブルはアクチュアリー部門が承認したマスターテーブルと一致していなければならず、アプリケーションコード内に散在するハードコードであってはなりません。"
      ),
      IMG(svg1Flow, "Luồng thẩm định từ hồ sơ tới quyết định cuối cùng", "Underwriting flow from application to final decision", "申込から最終判定までの引受フロー"),
      H("Phạm vi tự động hoá kiểm thử", "Scope of test automation", "テスト自動化の範囲"),
      UL(
        ["API thu thập rủi ro & tính điểm sơ bộ (risk scoring)", "API decision-table engine (accept/decline/refer)", "API tính phí actuarial (premium calculation)", "Luồng end-to-end nộp hồ sơ → nhận báo giá", "Báo cáo đối soát phí actuarial hàng tháng"],
        ["Risk intake & preliminary risk scoring API", "Decision-table engine API (accept/decline/refer)", "Actuarial premium calculation API", "End-to-end submit-application-to-quote flow", "Monthly actuarial premium reconciliation report"],
        ["リスク収集・予備スコアリングAPI", "決定表エンジンAPI（承認・拒否・照会）", "保険数理料率計算API", "申込送信から見積取得までのエンドツーエンドフロー", "月次保険数理料率突合レポート"]
      ),
      NOTE(
        "Trong hệ thống thật, bảng hệ số actuarial thường nằm trong một service riêng (Rating Service) được actuary cập nhật định kỳ theo quý — test phải luôn lấy bảng hệ số hiện hành từ service này thay vì hard-code trong test case.",
        "In real systems the actuarial factor table usually lives in a dedicated Rating Service updated quarterly by actuaries — tests must always pull the current factor table from that service instead of hard-coding it in test cases.",
        "実際のシステムでは、保険数理係数テーブルは通常、アクチュアリーが四半期ごとに更新する専用のレーティングサービスに保持されています。テストはテストケース内にハードコードするのではなく、常にこのサービスから現行の係数テーブルを取得しなければなりません。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "UPE được thiết kế dạng microservices: Application Service nhận hồ sơ từ web/app, Risk Data Service tổng hợp dữ liệu từ MIB (Medical Information Bureau), bureau tín dụng và telematics nghề nghiệp qua các API bên thứ ba, Decision Engine áp bảng quyết định dạng cấu hình (không hard-code), và Rating Service tính phí cuối cùng. Giao tiếp giữa Application Service và Decision Engine là đồng bộ (REST, timeout 3 giây) vì khách hàng chờ báo giá ngay trên màn hình, trong khi việc đối soát với MIB chạy bất đồng bộ qua hàng đợi Kafka với SLA phản hồi 24 giờ cho các ca cần tra cứu sâu.",
        "UPE is built as microservices: an Application Service receiving submissions from web/app, a Risk Data Service aggregating data from MIB (Medical Information Bureau), credit bureaus and occupational telematics via third-party APIs, a Decision Engine applying a configuration-driven decision table (never hard-coded), and a Rating Service computing the final premium. Application Service to Decision Engine communication is synchronous (REST, 3-second timeout) since customers wait for an on-screen quote, while MIB reconciliation runs asynchronously over a Kafka queue with a 24-hour SLA for deep-lookup cases.",
        "UPEはマイクロサービスとして構築されています。Webやアプリからの申込を受け付けるApplication Service、MIB（医療情報局）、信用情報機関、職業テレマティクスからサードパーティAPI経由でデータを集約するRisk Data Service、設定駆動型の決定表を適用するDecision Engine（ハードコードは一切なし）、そして最終保険料を計算するRating Serviceです。Application ServiceとDecision Engine間の通信は同期方式（REST、タイムアウト3秒）で、顧客が画面上で見積もりを待つためです。一方、MIBとの突合は深い照会が必要なケース向けに24時間SLAでKafkaキューを介して非同期実行されます。"
      ),
      IMG(svg1Flow, "Kiến trúc microservices của Underwriting & Pricing Engine", "Microservices architecture of the Underwriting & Pricing Engine", "引受・料率計算エンジンのマイクロサービスアーキテクチャ"),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストの難所"),
      UL(
        ["Dữ liệu MIB/bureau tín dụng là bên thứ ba — không thể gọi thật trong môi trường test", "Bảng quyết định có thể thay đổi theo mùa/quý — test phải bám cấu hình động", "Race condition khi 2 hồ sơ cùng khách hàng nộp gần như đồng thời"],
        ["MIB/credit bureau data is third-party — cannot be called live in test", "Decision table may change seasonally/quarterly — tests must follow dynamic config", "Race condition when two applications from the same customer are submitted nearly simultaneously"],
        ["MIB・信用情報機関のデータはサードパーティであり、テスト環境で実際に呼び出すことはできない", "決定表は季節・四半期ごとに変更される可能性があり、テストは動的な設定に追従する必要がある", "同一顧客からほぼ同時に2件の申込が送信された場合の競合状態"]
      ),
      TIP(
        "Nên có một 'golden dataset' gồm 30–50 hồ sơ mẫu đã được actuary xác nhận kết quả kỳ vọng thủ công, dùng làm baseline hồi quy mỗi khi bảng hệ số cập nhật.",
        "Keep a 'golden dataset' of 30-50 sample applications with actuary-confirmed expected outcomes, used as a regression baseline whenever the factor table is updated.",
        "アクチュアリーが期待結果を手動で確認済みの申込サンプル30〜50件からなる「ゴールデンデータセット」を保持し、係数テーブルが更新されるたびに回帰テストのベースラインとして使用することをお勧めします。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể trung tâm là Application (hồ sơ) gắn với RiskProfile (điểm rủi ro), DecisionResult (kết quả tra bảng quyết định, gồm ruleId trúng) và Quote (báo giá cuối). Mỗi Application chỉ được có duy nhất một DecisionResult hiệu lực tại một thời điểm; nếu dữ liệu rủi ro thay đổi (ví dụ khách bổ sung hồ sơ khám sức khỏe), hệ thống phải tạo phiên bản DecisionResult mới và đánh dấu phiên bản cũ là superseded chứ không được sửa đè lịch sử — đây là yêu cầu audit bắt buộc của cơ quan quản lý bảo hiểm.",
        "The central entity is the Application, linked to a RiskProfile (risk score), a DecisionResult (decision-table lookup outcome, including the matched ruleId) and a Quote (final premium). Each Application may have exactly one active DecisionResult at any time; if risk data changes (e.g., the customer submits additional medical records), the system must create a new DecisionResult version and mark the old one superseded rather than overwriting history — a mandatory audit requirement from insurance regulators.",
        "中心となるエンティティはApplication（申込）であり、RiskProfile（リスクスコア）、DecisionResult（該当したruleIdを含む決定表参照結果）、Quote（最終見積）と紐づいています。各Applicationはある時点で有効なDecisionResultをただ一つだけ持つことができます。リスクデータが変化した場合（例：顧客が追加の健康診断記録を提出した場合）、システムは履歴を上書きするのではなく、新しいDecisionResultのバージョンを作成し、旧バージョンをsuperseded（差し替え済み）としてマークしなければなりません。これは保険監督当局が求める必須の監査要件です。"
      ),
      H("Bất biến nghiệp vụ (oracle) bắt buộc", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Mỗi tổ hợp input hợp lệ khớp đúng 1 hàng (rule) trong bảng quyết định — không 0, không >1",
          "Phí cuối = base(tuổi,giới) × Π(hệ số nghề, sức khỏe, bệnh nền) × (1 − chiết khấu), làm tròn 2 chữ số, luôn > 0",
          "Nhóm nghề rủi ro tuyệt đối (nhóm 4) luôn bị decline bất kể các yếu tố khác — loại trừ cứng, không thể ghi đè bởi override thường",
          "Mọi quyết định decline/refer phải có reasonCode và diễn giải lưu vết, không được trống",
          "DecisionResult là bất biến (immutable) một khi đã phát hành báo giá cho khách; thay đổi tạo bản ghi mới, versioned",
        ],
        [
          "Every valid input combination matches exactly one decision-table rule — never 0, never >1",
          "Final premium = base(age,gender) × Π(occupation, health, condition factors) × (1 − discount), rounded to 2 decimals, always > 0",
          "The absolute high-risk occupation tier (tier 4) always declines regardless of other factors — a hard exclusion that cannot be overridden by a normal override",
          "Every decline/refer decision must carry a non-empty reasonCode and traceable explanation",
          "DecisionResult is immutable once a quote has been issued to the customer; changes create a new versioned record",
        ],
        [
          "有効な入力の組み合わせは決定表のルールにちょうど1件だけ一致しなければならない（0件も複数件もNG）",
          "最終保険料 = 基本料率（年齢・性別）× Π（職業・健康・既往症係数）×（1－割引）、小数点以下2桁に丸め、常に0より大きい",
          "絶対的高リスク職業階層（階層4）は他の要因に関わらず常に拒否（decline）される。これは通常のオーバーライドでは上書きできないハード免責事項である",
          "拒否・照会の判定には必ず空でないreasonCodeと追跡可能な説明が付与されなければならない",
          "顧客へ見積が発行された後、DecisionResultはイミュータブル（不変）であり、変更はバージョン管理された新しいレコードを生成する",
        ]
      ),
      WARN(
        "Nếu tổ hợp input rơi vào 0 hàng bảng quyết định (decision table gap), hệ thống KHÔNG được mặc định approve — phải tự động refer sang underwriter người và log cảnh báo gap coverage.",
        "If an input combination matches zero decision-table rows (a decision-table gap), the system must NOT default to approve — it must auto-refer to a human underwriter and log a gap-coverage alert.",
        "入力の組み合わせが決定表のどの行にも一致しない場合（決定表のギャップ）、システムはデフォルトで承認してはいけません。人間の引受担当者へ自動的に照会し、カバレッジギャップの警告をログに記録する必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất là sai lệch bảng quyết định dẫn đến định giá dưới rủi ro thực (adverse selection risk) — theo ước tính nội bộ, mỗi 0,1% hồ sơ bị định giá sai lệch quá 15% so với rủi ro thực có thể làm tăng combined ratio (tỉ lệ bồi thường + chi phí trên phí thu) thêm khoảng 0,4 điểm phần trăm trong năm tài chính. Rủi ro thứ hai là gap trong bảng quyết định khiến hồ sơ rủi ro cao lọt qua straight-through processing mà không có review người. Rủi ro thứ ba là lỗi làm tròn số hoặc thứ tự nhân hệ số sai gây chênh lệch phí tích lũy trên quy mô hàng chục nghìn hồ sơ mỗi tháng.",
        "The highest risk is a decision-table mismatch leading to under-pricing versus real risk (adverse selection risk) — internal estimates suggest every 0.1% of applications mispriced by more than 15% versus real risk can raise the combined ratio (claims + expenses over premium) by roughly 0.4 percentage points per fiscal year. The second risk is a decision-table gap letting high-risk applications slip through straight-through processing without human review. The third is rounding or factor-multiplication-order bugs causing cumulative premium discrepancies across tens of thousands of applications per month.",
        "最大のリスクは、決定表の不一致による実リスクに対する過小な価格設定（逆選択リスク）です。社内推計では、実リスクと15%以上乖離した価格設定となる申込が0.1%増えるごとに、コンバインドレシオ（保険料に対する保険金支払いと費用の合計比率）が会計年度で約0.4ポイント上昇する可能性があるとされています。第二のリスクは、決定表のギャップにより高リスクの申込が人間のレビューなしにストレートスルー処理をすり抜けてしまうことです。第三は、丸め誤差や係数の乗算順序の誤りにより、月間数万件規模の申込全体で保険料の累積的な乖離が生じることです。"
      ),
      H("Chiến lược kiểm thử theo kim tự tháp", "Test strategy pyramid", "テスト戦略ピラミッド"),
      UL(
        ["70% unit/contract test cho decision-table engine và công thức actuarial (nhanh, chạy mọi PR)", "20% API/integration test cho luồng Application → Decision → Quote với mock MIB/bureau", "10% E2E Playwright cho hành trình khách hàng nộp hồ sơ trên UI thật"],
        ["70% unit/contract tests for the decision-table engine and actuarial formula (fast, run on every PR)", "20% API/integration tests for the Application → Decision → Quote flow with mocked MIB/bureau", "10% E2E Playwright for the real customer application journey on the UI"],
        ["70%はユニット・契約テストで決定表エンジンと保険数理計算式を対象（高速、すべてのPRで実行）", "20%はモック化したMIB・信用情報機関を用いたApplication→Decision→QuoteフローのAPI・統合テスト", "10%は実際のUI上での顧客の申込ジャーニーを対象としたE2E Playwrightテスト"]
      ),
      SCEN(
        "Kịch bản rủi ro thực tế",
        "Real-world risk scenario",
        "Một bản cập nhật bảng hệ số quý 3 vô tình đổi thứ tự áp dụng chiết khấu không hút thuốc trước hệ số bệnh nền thay vì sau, khiến 1.200 hồ sơ hút thuốc có bệnh nền được tính phí thấp hơn thực tế khoảng 8%. Đội QA phát hiện qua bộ golden dataset trước khi release, tránh thất thoát ước tính 2,3 tỷ đồng phí thiếu thu trong năm.",
        "A Q3 factor-table update accidentally swapped the order so the non-smoker discount was applied before the condition loading instead of after, causing 1,200 applications for smokers with pre-existing conditions to be underpriced by about 8%. QA caught it via the golden dataset before release, avoiding an estimated annual under-collection of roughly 2.3 billion VND.",
        "第3四半期の係数テーブル更新で、誤って非喫煙者割引を既往症加算の後ではなく前に適用する順序に入れ替えてしまい、既往症のある喫煙者1,200件の保険料が実際より約8%低く計算されてしまいました。QAチームはリリース前にゴールデンデータセットを通じてこれを発見し、年間で約23億ドン（VND）相当の保険料徴収不足を未然に防ぎました。",
        "面接シナリオ本文（日本語）"
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định scope: kiểm thử UPE v3.4 trước khi go-live bảng hệ số quý mới, không bao gồm module bồi thường (claims) đã kiểm thử ở dự án khác. Entry criteria: bảng hệ số đã được actuary ký duyệt trong hệ thống Rating Config, môi trường staging đã nạp golden dataset. Exit criteria: 100% ca P1 (từ chối/loại trừ tuyệt đối) pass, ≥98% ca P2 pass, không còn defect Critical/High mở, sai lệch phí trên golden dataset dưới 0,01%.",
        "The Test Plan defines scope: testing UPE v3.4 ahead of the new quarterly factor-table go-live, excluding the claims module already tested in a separate project. Entry criteria: the factor table is actuary-signed-off in the Rating Config system, staging is loaded with the golden dataset. Exit criteria: 100% of P1 cases (absolute decline/exclusion) pass, ≥98% of P2 cases pass, no open Critical/High defects, premium discrepancy on the golden dataset under 0.01%.",
        "テスト計画では範囲を定義します。新四半期の係数テーブル本番投入前のUPE v3.4のテストであり、別プロジェクトで既にテスト済みの保険金請求モジュールは対象外です。開始基準：係数テーブルがレーティング設定システム上でアクチュアリーの承認済みであること、ステージング環境にゴールデンデータセットが投入済みであること。終了基準：P1ケース（絶対的拒否・免責）100%合格、P2ケース98%以上合格、Critical/High未解決欠陥ゼロ、ゴールデンデータセットにおける保険料の乖離が0.01%未満であること。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: sở hữu golden dataset và ma trận ca", "Automation Engineer: viết/bảo trì Playwright + API test", "Actuary liaison: xác nhận kỳ vọng phí cho ca biên", "Business Analyst: review reasonCode cho ca từ chối"],
        ["QA Lead: owns the golden dataset and case matrix", "Automation Engineer: writes/maintains Playwright + API tests", "Actuary liaison: confirms expected premium for edge cases", "Business Analyst: reviews reasonCode for decline cases"],
        ["QAリード：ゴールデンデータセットとケース表を管理", "自動化エンジニア：Playwright・APIテストを作成・保守", "アクチュアリー連絡担当：エッジケースの期待保険料を確認", "ビジネスアナリスト：拒否ケースのreasonCodeをレビュー"]
      ),
      NOTE(
        "Chỉ số theo dõi (KPI) chính: tỉ lệ pass ca P1, độ lệch phí trung bình so với golden dataset, thời gian phản hồi decision engine p95 (<800ms).",
        "Key KPIs tracked: P1 case pass rate, average premium deviation vs golden dataset, decision engine p95 response time (<800ms).",
        "主要な監視指標（KPI）：P1ケース合格率、ゴールデンデータセットに対する平均保険料乖離、決定エンジンのp95応答時間（800ms未満）。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử (decision table)", en: "6. Test case design matrix (decision table)", ja: "6. テストケース設計マトリクス（決定表）" },
    blocks: [
      P(
        "Ma trận ca được thiết kế theo kỹ thuật decision table testing kết hợp equivalence partitioning cho từng biến rủi ro: tuổi (18-35 / 36-50 / 51-65 / >65 từ chối tuyệt đối), BMI (thiếu cân / bình thường / thừa cân / béo phì), hút thuốc (có/không), nhóm nghề (1 đến 4, nhóm 4 loại trừ tuyệt đối), và bệnh nền (không / kiểm soát tốt / không kiểm soát). Số tổ hợp lý thuyết lên tới hàng trăm nhưng team rút gọn còn 42 ca đại diện theo nguyên tắc pairwise kết hợp toàn bộ ca biên quan trọng (đúng ranh giới tuổi, đúng ranh giới BMI).",
        "The case matrix is designed using decision-table testing combined with equivalence partitioning per risk variable: age (18-35 / 36-50 / 51-65 / >65 absolute decline), BMI (underweight / normal / overweight / obese), smoker (yes/no), occupation tier (1 to 4, tier 4 absolute exclusion), and pre-existing condition (none / well-controlled / uncontrolled). The theoretical combination count runs into the hundreds, but the team reduced it to 42 representative cases using pairwise combined with all critical boundary cases (exact age boundaries, exact BMI boundaries).",
        "ケース表は、各リスク変数に対する決定表テストと同値分割を組み合わせて設計されています。年齢（18〜35／36〜50／51〜65／65超は絶対拒否）、BMI（低体重／標準／過体重／肥満）、喫煙（有無）、職業階層（1〜4、階層4は絶対免責）、既往症（なし／良好にコントロール／コントロール不良）です。理論上の組み合わせ数は数百に上りますが、チームはペアワイズ法とすべての重要な境界値ケース（年齢の正確な境界、BMIの正確な境界）を組み合わせることで、代表的な42ケースに絞り込みました。"
      ),
      IMG(svg1Table, "Bảng quyết định thẩm định rút gọn với 4 hàng đại diện", "Underwriting decision table excerpt with 4 representative rows", "代表的な4行を抜粋した引受決定表"),
      H("Nhóm ca theo mức ưu tiên", "Case groups by priority", "優先度別のケースグループ"),
      UL(
        ["P1: nhóm nghề 4 (loại trừ tuyệt đối), tuổi >65 (từ chối tuyệt đối), gap bảng quyết định", "P2: ranh giới BMI/tuổi, tổ hợp hút thuốc + bệnh nền, chiết khấu không hút thuốc >2 năm", "P3: tổ hợp thông thường (happy path), test hiệu năng, test đồng thời"],
        ["P1: occupation tier 4 (absolute exclusion), age >65 (absolute decline), decision-table gap", "P2: BMI/age boundaries, smoker + condition combinations, non-smoker discount >2y", "P3: routine combinations (happy path), performance test, concurrency test"],
        ["P1：職業階層4（絶対免責）、年齢65超（絶対拒否）、決定表のギャップ", "P2：BMI・年齢の境界値、喫煙＋既往症の組み合わせ、2年超の非喫煙者割引", "P3：通常の組み合わせ（ハッピーパス）、性能テスト、並行性テスト"]
      ),
      TIP(
        "Đặt tên ca theo mẫu UW_<ruleId>_<biến chính>_<kỳ vọng> (ví dụ UW_R14_TIER4_DECLINE) để dễ truy vết khi bảng quyết định đổi rule id.",
        "Name cases as UW_<ruleId>_<key variable>_<expected> (e.g. UW_R14_TIER4_DECLINE) for easy traceability when the decision table's rule IDs change.",
        "決定表のルールIDが変更された際に追跡しやすいよう、ケース名はUW_<ruleId>_<主要変数>_<期待結果>（例：UW_R14_TIER4_DECLINE）の形式で命名することをお勧めします。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường (mock bên thứ ba)", en: "7. Data & environment setup (third-party mocking)", ja: "7. データ・環境準備（サードパーティのモック化）" },
    blocks: [
      P(
        "Vì MIB và bureau tín dụng là dịch vụ bên thứ ba trả phí theo lượt gọi và có SLA phản hồi tới 24 giờ, môi trường test dùng WireMock để giả lập các response chuẩn: hồ sơ sạch, hồ sơ có cảnh báo y tế (medical flag), hồ sơ có nợ xấu tín dụng, và timeout/lỗi 500 để test khả năng chống chịu. Một API test-only `/test/reset-application` cho phép QA xóa sạch trạng thái Application giữa các lần chạy mà không cần truy cập trực tiếp database, giảm thời gian chuẩn bị dữ liệu từ 15 phút xuống dưới 30 giây mỗi ca.",
        "Since MIB and credit bureaus are paid, per-call third-party services with SLAs up to 24 hours, the test environment uses WireMock to simulate standard responses: clean profile, medical-flag profile, adverse-credit profile, and timeout/500 errors to test resilience. A test-only `/test/reset-application` API lets QA wipe Application state between runs without direct database access, cutting data-prep time from 15 minutes to under 30 seconds per case.",
        "MIBや信用情報機関は呼び出し回数課金でSLAが最大24時間のサードパーティサービスであるため、テスト環境ではWireMockを使用して標準的なレスポンスをシミュレートします。クリーンなプロファイル、医療フラグ付きプロファイル、信用不良プロファイル、そして耐障害性をテストするためのタイムアウト・500エラーです。テスト専用API `/test/reset-application` により、QAはデータベースへの直接アクセスなしに、実行間でApplicationの状態を消去でき、データ準備時間を1ケースあたり15分から30秒未満に短縮できます。"
      ),
      CODE(
        "yaml",
        "# docker-compose.test.yml — môi trường mock cho UPE\nservices:\n  wiremock-mib:\n    image: wiremock/wiremock:3.5.4\n    ports: [\"8081:8080\"]\n    volumes:\n      - ./mocks/mib:/home/wiremock\n  wiremock-credit:\n    image: wiremock/wiremock:3.5.4\n    ports: [\"8082:8080\"]\n    volumes:\n      - ./mocks/credit-bureau:/home/wiremock\n  upe-api:\n    image: vietlife/upe:staging\n    environment:\n      MIB_BASE_URL: http://wiremock-mib:8080\n      CREDIT_BUREAU_URL: http://wiremock-credit:8080\n      RATING_CONFIG_SOURCE: golden-dataset-q3\n    ports: [\"3000:3000\"]"
      ),
      WARN(
        "Không bao giờ trỏ môi trường test vào MIB thật — mỗi lượt tra cứu tính phí và để lại dấu vết trên hồ sơ tín dụng thật của người dùng thử nghiệm, vi phạm quy định bảo vệ dữ liệu cá nhân.",
        "Never point the test environment at the real MIB — each lookup is billed and leaves a trace on the test user's real credit record, violating personal-data-protection rules.",
        "テスト環境を実際のMIBに向けてはいけません。1回の照会ごとに課金され、テストユーザーの実際の信用記録に痕跡が残ってしまい、個人情報保護規則に違反します。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright cho UI kết hợp gọi trực tiếp API `/applications` để chuẩn bị fixture nhanh, theo mô hình Page Object cho form nộp hồ sơ 5 bước. Assertion không chỉ kiểm tra 'hiển thị báo giá' mà phải khớp đúng oracle: ruleId trúng đúng như actuary kỳ vọng, và phí tính bằng tay (base × factors) khớp phí hiển thị trong sai số làm tròn 0,01.",
        "Happy-path automation uses Playwright for the UI combined with direct calls to the `/applications` API to seed fixtures quickly, following a Page Object model for the 5-step submission form. Assertions don't just check 'a quote is shown' — they must match the oracle exactly: the matched ruleId equals the actuary's expectation, and the hand-computed premium (base × factors) matches the displayed premium within a 0.01 rounding tolerance.",
        "ハッピーパス自動化では、5ステップの申込フォームに対してPage Objectモデルに従い、UIにはPlaywrightを、フィクスチャの高速準備には`/applications` APIの直接呼び出しを組み合わせて使用します。アサーションは「見積が表示される」ことだけを確認するのではなく、オラクルと厳密に一致することを検証します。一致したruleIdがアクチュアリーの期待通りであること、手計算した保険料（基本料率×係数）が表示された保険料と丸め誤差0.01以内で一致することです。"
      ),
      CODE(
        "typescript",
        "// upe-happy-path.spec.ts\nimport { test, expect } from '@playwright/test';\nimport { ApplicationPage } from './pages/application-page';\nimport { computeExpectedPremium } from './oracle/actuarial-oracle';\n\ntest('non-smoker office worker gets accepted at base rate x1.00', async ({ page, request }) => {\n  const app = new ApplicationPage(page);\n  await app.goto();\n  await app.fillRisk({ age: 29, gender: 'F', bmi: 21.4, smoker: false, occupationTier: 1, condition: 'none' });\n  await app.submit();\n\n  const quote = await app.getQuoteResult();\n  expect(quote.decision).toBe('ACCEPT');\n  expect(quote.ruleId).toBe('R01');\n\n  const expected = computeExpectedPremium({ age: 29, gender: 'F', bmi: 21.4, smoker: false, occupationTier: 1, condition: 'none' });\n  expect(Math.abs(quote.premium - expected)).toBeLessThanOrEqual(0.01);\n});"
      ),
      CODE(
        "typescript",
        "// oracle/actuarial-oracle.ts — nguồn sự thật độc lập để đối chiếu, KHÔNG copy logic app\nexport function computeExpectedPremium(input: RiskInput): number {\n  const base = BASE_TABLE[input.gender][ageBracket(input.age)];\n  const occFactor = OCCUPATION_FACTOR[input.occupationTier];\n  const healthFactor = bmiFactor(input.bmi) * (input.smoker ? 1.5 : 1.0);\n  const conditionFactor = CONDITION_FACTOR[input.condition];\n  const discount = nonSmokerDiscount(input);\n  return round2(base * occFactor * healthFactor * conditionFactor * (1 - discount));\n}"
      ),
      TIP(
        "Oracle tính phí độc lập PHẢI được viết lại từ tài liệu actuarial gốc, không copy-paste từ code sản phẩm — nếu không, bug trong code sản phẩm sẽ 'tự xác nhận đúng' với chính nó.",
        "The independent premium oracle MUST be written from the original actuarial documentation, not copy-pasted from product code — otherwise a bug in product code would 'self-confirm' against itself.",
        "独立した保険料オラクルは、製品コードからのコピー＆ペーストではなく、元の保険数理ドキュメントから書き起こさなければなりません。そうしないと、製品コードのバグが自分自身に対して「正しいと自己証明」してしまいます。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi chuyên sâu là nơi phát hiện những bug tốn kém nhất và cũng là chủ đề hay bị hỏi nhất khi phỏng vấn vị trí QA bảo hiểm: gap trong bảng quyết định, race condition khi 2 hồ sơ cùng khách nộp gần như đồng thời, timeout của MIB khiến hệ thống phải có chiến lược retry/circuit breaker hợp lý, và lỗi làm tròn tích lũy khi nhân nhiều hệ số liên tiếp.",
        "Deep failure cases are where the most expensive bugs are found, and also the most frequently asked topic in insurance QA interviews: decision-table gaps, race conditions when two applications from the same customer are submitted nearly simultaneously, MIB timeouts requiring a sound retry/circuit-breaker strategy, and cumulative rounding errors from multiplying several factors in sequence.",
        "高度な異常系は、最も高コストなバグが発見される領域であり、保険QAポジションの面接で最も頻繁に問われるテーマでもあります。決定表のギャップ、同一顧客からほぼ同時に2件の申込が送信された場合の競合状態、適切なリトライ・サーキットブレーカー戦略を必要とするMIBのタイムアウト、複数の係数を連続して乗算する際の累積的な丸め誤差などです。"
      ),
      CODE(
        "typescript",
        "// decision-table-gap.spec.ts — bắt gap trong bảng quyết định\ntest('unmatched input combination must auto-refer, not auto-approve', async ({ request }) => {\n  const res = await request.post('/api/decision/evaluate', {\n    data: { age: 999, bmi: -5, smoker: null, occupationTier: 0, condition: 'unknown' },\n  });\n  const body = await res.json();\n  expect(body.decision).toBe('REFER');\n  expect(body.reasonCode).toBe('DECISION_TABLE_GAP');\n  expect(body.matchedRuleCount).toBe(0);\n});"
      ),
      CODE(
        "typescript",
        "// concurrent-submission.spec.ts — 2 hồ sơ cùng khách hàng cùng lúc\ntest('duplicate concurrent applications must not create two active policies', async ({ request }) => {\n  const payload = buildApplication({ customerId: 'CUST-7788' });\n  const [r1, r2] = await Promise.all([\n    request.post('/api/applications', { data: payload }),\n    request.post('/api/applications', { data: payload }),\n  ]);\n  const results = await Promise.all([r1.json(), r2.json()]);\n  const accepted = results.filter((r) => r.status === 'CREATED');\n  expect(accepted.length).toBe(1); // idempotency key phải chặn bản sao\n  const duplicate = results.find((r) => r.status === 'DUPLICATE_REJECTED');\n  expect(duplicate).toBeTruthy();\n});"
      ),
      CODE(
        "typescript",
        "// mib-timeout-resilience.spec.ts\ntest('MIB timeout falls back to manual referral within SLA, never silent-approve', async ({ request }) => {\n  await mockMib.simulateTimeout(5000); // MIB không phản hồi trong 5s\n  const res = await request.post('/api/applications', { data: buildApplication({}) });\n  const body = await res.json();\n  expect(body.decision).toBe('REFER');\n  expect(body.reasonCode).toBe('THIRD_PARTY_TIMEOUT');\n  expect(res.status()).toBe(202); // accepted for manual review, không phải lỗi 5xx cho khách\n});"
      ),
      CODE(
        "typescript",
        "// rounding-order.spec.ts — thứ tự nhân hệ số đúng chuẩn actuarial\ntest('factor multiplication order matches actuarial spec exactly', async () => {\n  const input = { age: 44, gender: 'M', bmi: 27.2, smoker: true, occupationTier: 2, condition: 'controlled', nonSmokerYears: 0 };\n  const premium = await ratingService.compute(input);\n  const expected = computeExpectedPremium(input); // oracle độc lập, thứ tự: base -> occ -> health -> condition -> discount\n  expect(premium).toBeCloseTo(expected, 2);\n});"
      ),
      WARN(
        "Nếu circuit breaker MIB mở (open) quá lâu, hệ thống có thể vô tình rơi vào chế độ 'refer tất cả', làm nghẽn hàng đợi underwriter người — cần test cả kịch bản half-open recovery.",
        "If the MIB circuit breaker stays open too long, the system can accidentally fall into 'refer everything' mode, flooding the human underwriter queue — the half-open recovery scenario must also be tested.",
        "MIBのサーキットブレーカーが開いた状態（open）が長時間続くと、システムが誤って「すべて照会」モードに陥り、人間の引受担当者のキューが詰まってしまう可能性があります。ハーフオープン状態からの復旧シナリオもテストする必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "10. Nghiệp vụ nền/hậu kiểm: đối soát actuarial", en: "10. Back-office: actuarial reconciliation", ja: "10. バックオフィス：保険数理突合" },
    blocks: [
      P(
        "Mỗi đêm, batch job đối soát chạy lại công thức tính phí cho toàn bộ Quote phát hành trong ngày và so sánh với giá trị đã lưu, gắn cờ bất kỳ chênh lệch nào vượt 0,01% — đây là lớp phòng vệ thứ hai độc lập với test tự động, bắt các lỗi do thay đổi cấu hình runtime mà pipeline CI không phủ tới. Báo cáo đối soát cũng kiểm tra bất biến 'mỗi Application có đúng 1 DecisionResult active' bằng truy vấn SQL riêng, và cảnh báo Slack cho đội vận hành nếu phát hiện bản ghi orphan hoặc trùng lặp.",
        "Every night, a reconciliation batch job re-runs the premium formula for every Quote issued that day and compares it against the stored value, flagging any deviation exceeding 0.01% — a second line of defense independent from automated tests, catching bugs from runtime config changes that the CI pipeline doesn't cover. The reconciliation report also checks the 'each Application has exactly one active DecisionResult' invariant via a dedicated SQL query, alerting the ops team on Slack if orphan or duplicate records are found.",
        "毎晩、突合バッチジョブがその日発行されたすべてのQuoteに対して保険料計算式を再実行し、保存されている値と比較して、0.01%を超える乖離があればフラグを立てます。これは自動テストとは独立した第二の防御線であり、CIパイプラインではカバーできない実行時の設定変更によるバグを捕捉します。突合レポートはまた、専用のSQLクエリで「各Applicationは有効なDecisionResultをちょうど1件だけ持つ」という不変条件も検証し、孤立レコードや重複レコードが見つかった場合は運用チームにSlackで警告します。"
      ),
      CODE(
        "sql",
        "-- reconciliation-check.sql — phát hiện Application vi phạm bất biến 1 DecisionResult active\nSELECT a.id AS application_id, COUNT(dr.id) AS active_decisions\nFROM applications a\nJOIN decision_results dr ON dr.application_id = a.id AND dr.status = 'ACTIVE'\nGROUP BY a.id\nHAVING COUNT(dr.id) <> 1;\n\n-- phát hiện chênh lệch phí > 0.01% giữa quote lưu và phí tính lại\nSELECT q.id, q.premium AS stored_premium, r.recomputed_premium,\n       ROUND(ABS(q.premium - r.recomputed_premium) / q.premium * 100, 4) AS deviation_pct\nFROM quotes q\nJOIN recomputed_premiums r ON r.quote_id = q.id\nWHERE ABS(q.premium - r.recomputed_premium) / q.premium > 0.0001;"
      ),
      NOTE(
        "Nhóm actuary yêu cầu báo cáo đối soát dạng CSV hàng tháng để đưa vào hồ sơ tuân thủ nộp cho cơ quan quản lý bảo hiểm — QA cần đảm bảo báo cáo tái tạo được (reproducible) và có chữ ký số (checksum) để chống chỉnh sửa.",
        "The actuarial team requires a monthly CSV reconciliation report for compliance filings submitted to the insurance regulator — QA must ensure the report is reproducible and carries a digital checksum against tampering.",
        "アクチュアリーチームは、保険監督当局に提出するコンプライアンス書類のために月次CSV突合レポートを要求しています。QAはレポートが再現可能であり、改ざん防止のためのデジタルチェックサムを備えていることを保証する必要があります。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng: unit/contract test cho decision engine trên mọi PR (dưới 4 phút), API/integration test với WireMock trên merge vào main (dưới 12 phút, sharded 4 luồng), và E2E Playwright + đối soát golden dataset đầy đủ chạy đêm trước khi release bảng hệ số mới ra production. Gate release cứng: nếu golden dataset lệch quá 0,01% hoặc bất kỳ ca P1 nào fail, pipeline tự động chặn deploy và tag actuary liaison để xác nhận lại.",
        "The CI pipeline runs three tiers: unit/contract tests for the decision engine on every PR (under 4 minutes), API/integration tests with WireMock on merge to main (under 12 minutes, sharded across 4 workers), and full E2E Playwright plus golden-dataset reconciliation running nightly before releasing a new factor table to production. Hard release gate: if the golden dataset deviates over 0.01% or any P1 case fails, the pipeline automatically blocks deployment and tags the actuary liaison for re-confirmation.",
        "CIパイプラインは3層で実行されます。すべてのPRで決定エンジンのユニット・契約テスト（4分未満）、mainへのマージ時にWireMockを用いたAPI・統合テスト（4ワーカーに分割、12分未満）、そして新しい係数テーブルを本番環境にリリースする前の夜間に実行される完全なE2E Playwrightとゴールデンデータセット突合です。厳格なリリースゲートとして、ゴールデンデータセットの乖離が0.01%を超える場合、またはP1ケースが1つでも失敗した場合、パイプラインは自動的にデプロイをブロックし、再確認のためアクチュアリー連絡担当にタグ付けします。"
      ),
      CODE(
        "yaml",
        "# .github/workflows/upe-pipeline.yml\nname: upe-ci\non: [pull_request, push]\njobs:\n  unit-contract:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run test:unit -- --coverage\n  api-integration:\n    needs: unit-contract\n    if: github.ref == 'refs/heads/main'\n    strategy:\n      matrix: { shard: [1, 2, 3, 4] }\n    steps:\n      - uses: actions/checkout@v4\n      - run: docker compose -f docker-compose.test.yml up -d\n      - run: npm run test:api -- --shard=${{ matrix.shard }}/4\n  nightly-golden-dataset:\n    if: github.event_name == 'schedule'\n    steps:\n      - run: npm run test:e2e:full\n      - run: npm run reconcile:golden-dataset -- --max-deviation=0.0001\n      - run: node scripts/gate-release.js"
      ),
      TIP(
        "Đặt dashboard Grafana theo dõi p95 response time của decision engine và tỉ lệ refer/decline theo ngày — tăng đột biến tỉ lệ refer thường là dấu hiệu sớm của gap bảng quyết định mới xuất hiện.",
        "Set up a Grafana dashboard tracking decision engine p95 response time and daily refer/decline rate — a sudden spike in refer rate is often an early sign of a newly introduced decision-table gap.",
        "決定エンジンのp95応答時間と日次の照会・拒否率を監視するGrafanaダッシュボードを構築してください。照会率の急激な上昇は、新たに発生した決定表のギャップの早期兆候であることが多いです。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent được giao nhiệm vụ sinh ca test bổ sung cho các tổ hợp biên chưa được cover bằng cách đọc cấu hình bảng quyết định mới nhất và so sánh với ma trận ca hiện có, đề xuất các tổ hợp thiếu; agent cũng có thể tự động chạy oracle độc lập để tính phí kỳ vọng cho ca mới sinh. Tuy nhiên, mọi ca do AI sinh ra đều phải được actuary liaison hoặc QA Lead xác nhận thủ công trước khi đưa vào bộ hồi quy chính thức — AI không được tự quyết định phí kỳ vọng là 'đúng' vì rủi ro hallucination công thức actuarial là có thật và hậu quả tài chính lớn.",
        "The AI Agent is tasked with generating additional test cases for boundary combinations not yet covered by reading the latest decision-table config and comparing it against the existing case matrix, proposing missing combinations; it can also auto-run the independent oracle to compute the expected premium for newly generated cases. However, every AI-generated case must be manually confirmed by the actuary liaison or QA Lead before entering the official regression suite — the AI must never decide on its own that an expected premium is 'correct', since the risk of hallucinating the actuarial formula is real and the financial consequences are large.",
        "AIエージェントには、最新の決定表設定を読み取り既存のケース表と比較することで、まだカバーされていない境界値の組み合わせに対する追加テストケースを生成し、不足している組み合わせを提案する役割が与えられています。エージェントはまた、新たに生成されたケースの期待保険料を計算するために独立したオラクルを自動実行することもできます。しかし、AIが生成したすべてのケースは、正式な回帰テストスイートに組み込まれる前に、アクチュアリー連絡担当またはQAリードによる手動確認を必ず経なければなりません。保険数理計算式に関するハルシネーション（幻覚）のリスクは現実のものであり、財務的な影響が大きいため、AIが期待保険料を「正しい」と自ら判断することは決して許されません。"
      ),
      H("Ranh giới trách nhiệm AI vs người", "AI vs human responsibility boundary", "AIと人間の責任境界"),
      UL(
        ["AI: sinh gợi ý tổ hợp ca biên thiếu, soạn thảo code test khung", "AI: chạy oracle độc lập để tính giá trị kỳ vọng sơ bộ", "Người: xác nhận cuối cùng giá trị kỳ vọng trước khi đưa vào regression suite", "Người: quyết định rule bảng quyết định mới, AI không được tự sửa cấu hình production"],
        ["AI: suggests missing boundary combinations, drafts scaffold test code", "AI: runs the independent oracle to compute preliminary expected values", "Human: gives final confirmation of expected values before entering the regression suite", "Human: decides new decision-table rules; AI must never modify production config on its own"],
        ["AI：不足している境界値の組み合わせを提案し、テストコードの雛形を作成する", "AI：独立したオラクルを実行して暫定的な期待値を計算する", "人間：回帰テストスイートに組み込む前に期待値を最終確認する", "人間：新しい決定表のルールを決定する。AIが本番設定を自ら変更することは決してない"]
      ),
      NOTE(
        "Log mọi gợi ý của AI Agent (input, ca sinh ra, oracle output) vào một bảng riêng để audit sau này — cơ quan quản lý có thể yêu cầu chứng minh quy trình kiểm soát chất lượng khi dùng AI trong nghiệp vụ bảo hiểm.",
        "Log every AI Agent suggestion (input, generated case, oracle output) into a dedicated table for later audit — regulators may require proof of the quality-control process when AI is used in insurance operations.",
        "AIエージェントのすべての提案（入力、生成されたケース、オラクルの出力）を専用テーブルに記録し、後の監査に備えてください。保険業務でAIを使用する場合、規制当局が品質管理プロセスの証明を求めることがあります。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn kiểm thử một bảng quyết định (decision table) có hàng trăm tổ hợp mà không viết hàng trăm test case?",
        "How would you test a decision table with hundreds of combinations without writing hundreds of test cases?",
        "Dùng kỹ thuật decision table testing kết hợp equivalence partitioning để rút gọn mỗi biến về vùng đại diện, sau đó áp pairwise testing để giảm số tổ hợp cần phủ nhưng vẫn giữ toàn bộ ca biên (ranh giới tuổi, BMI...) và toàn bộ rule loại trừ tuyệt đối là ca P1 bắt buộc kiểm riêng lẻ, không rút gọn.",
        "Use decision-table testing combined with equivalence partitioning to collapse each variable into representative zones, then apply pairwise testing to reduce the combinations needed while still keeping all boundary cases (age, BMI boundaries...) and every absolute-exclusion rule as mandatory individually-tested P1 cases, never collapsed.",
        "何百通りもの組み合わせを持つ決定表を、何百ものテストケースを書かずにテストするにはどうしますか。",
        "決定表テストと同値分割を組み合わせて各変数を代表的な区分に集約し、その後ペアワイズテストを適用して必要な組み合わせ数を減らします。ただし、すべての境界値ケース（年齢・BMIの境界など）とすべての絶対免責ルールは、統合せずに個別にテストすべき必須のP1ケースとして維持します。"
      ),
      QA(
        "Oracle cho bài toán tính phí bảo hiểm nên được xây dựng như thế nào để đáng tin cậy?",
        "How should the oracle for an insurance premium calculation be built to be trustworthy?",
        "Oracle phải được viết độc lập từ tài liệu actuarial gốc (không copy code sản phẩm), có version kiểm soát riêng, và được actuary xác nhận trên golden dataset trước khi dùng làm baseline. Nếu oracle và code sản phẩm cùng có bug giống nhau, test sẽ không bao giờ phát hiện ra — vì vậy độc lập nguồn là yêu cầu sống còn.",
        "The oracle must be written independently from the original actuarial documentation (not copied from product code), version-controlled separately, and confirmed by the actuary against the golden dataset before use as a baseline. If the oracle and product code share the same bug, tests will never catch it — so source independence is a survival requirement.",
        "保険料計算問題のオラクルは、信頼できるものにするためにどのように構築すべきですか。",
        "オラクルは元の保険数理ドキュメントから独立して作成され（製品コードのコピーではなく）、別途バージョン管理され、ベースラインとして使用する前にアクチュアリーがゴールデンデータセットに対して確認しなければなりません。オラクルと製品コードが同じバグを共有していれば、テストは決してそれを検出できません。そのため、ソースの独立性は不可欠な要件です。"
      ),
      QA(
        "Nếu một tổ hợp input không khớp hàng nào trong bảng quyết định, hệ thống nên xử lý thế nào và tại sao?",
        "If an input combination matches no row in the decision table, how should the system handle it and why?",
        "Hệ thống không được mặc định approve hay decline — phải tự động chuyển sang refer thủ công kèm reasonCode 'DECISION_TABLE_GAP' và cảnh báo đội vận hành, vì gap nghĩa là chưa có quy tắc nghiệp vụ nào bao phủ trường hợp này, mặc định bất kỳ hướng nào cũng là rủi ro tài chính hoặc pháp lý.",
        "The system must not default to approve or decline — it must auto-refer for manual review with reasonCode 'DECISION_TABLE_GAP' and alert the ops team, because a gap means no business rule covers this case yet, and defaulting either way is a financial or legal risk.",
        "入力の組み合わせが決定表のどの行にも一致しない場合、システムはどのように処理すべきで、それはなぜですか。",
        "システムはデフォルトで承認または拒否してはいけません。reasonCode「DECISION_TABLE_GAP」を付けて自動的に手動照会へ回し、運用チームに警告する必要があります。ギャップがあるということは、このケースをカバーする業務ルールがまだ存在しないことを意味し、どちらか一方をデフォルトにすることは財務的または法的なリスクとなるためです。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Bạn phát hiện một hệ số actuarial trong production bị nhân sai thứ tự khiến 1.200 hồ sơ bị định giá thấp 8% trong 2 tuần qua. Bạn sẽ báo cáo và xử lý thế nào?",
        "You discover an actuarial factor in production was multiplied in the wrong order, underpricing 1,200 applications by 8% over the past two weeks. How would you report and handle it?",
        "面接官の質問",
        "過去2週間で1,200件の申込が誤った乗算順序により8%過小評価されている保険数理係数の本番環境バグを発見しました。どのように報告し、対処しますか。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán thẩm định & tính phí bảo hiểm là ví dụ điển hình về kiểm thử dựa trên bất biến nghiệp vụ (oracle-first) thay vì kiểm tra giao diện hời hợt: mọi ca test phải trace được về một rule trong bảng quyết định hoặc một công thức actuarial cụ thể. Đội QA đạt hiệu quả cao nhất khi kết hợp 42 ca ma trận quyết định, golden dataset đối soát hàng đêm, và AI Agent hỗ trợ sinh ca biên nhưng luôn có actuary xác nhận cuối. Kết quả sau 2 chu kỳ áp dụng quy trình này: giảm 92% defect liên quan sai lệch phí lọt ra production, và rút ngắn thời gian regression từ 3 ngày xuống còn 6 giờ.",
        "The underwriting and pricing testing problem is a textbook example of oracle-first business-invariant testing rather than shallow UI checking: every test case must trace back to a specific decision-table rule or actuarial formula. The QA team achieves the highest effectiveness by combining the 42-case decision matrix, nightly golden-dataset reconciliation, and AI-Agent-assisted boundary-case generation always confirmed by an actuary. Results after two cycles of applying this process: a 92% reduction in premium-deviation defects reaching production, and regression time cut from 3 days to 6 hours.",
        "引受・料率計算のテスト問題は、表面的なUIチェックではなく、オラクルファーストの業務不変条件に基づくテストの典型例です。すべてのテストケースは、決定表の特定のルールまたは保険数理計算式に遡って追跡できなければなりません。QAチームは、42ケースの決定マトリクス、毎晩のゴールデンデータセット突合、そして常にアクチュアリーの最終確認を伴うAIエージェント支援の境界値ケース生成を組み合わせることで、最も高い効果を上げています。このプロセスを2サイクル適用した結果、本番環境に到達する保険料乖離の欠陥が92%減少し、回帰テストの時間が3日から6時間に短縮されました。"
      ),
      H("Checklist bàn giao", "Handover checklist", "引き継ぎチェックリスト"),
      UL(
        ["☑ Golden dataset 30-50 ca được actuary ký duyệt", "☑ 42 ca ma trận quyết định phủ toàn bộ P1/P2/P3", "☑ Oracle actuarial độc lập version-controlled riêng", "☑ Batch đối soát đêm chạy tự động + cảnh báo Slack", "☑ Gate CI chặn release khi lệch >0,01% hoặc P1 fail", "☑ Log audit đầy đủ cho gợi ý AI Agent"],
        ["☑ Golden dataset of 30-50 actuary-signed-off cases", "☑ 42-case decision matrix covering all P1/P2/P3", "☑ Independent, separately version-controlled actuarial oracle", "☑ Nightly reconciliation batch running automatically + Slack alerts", "☑ CI gate blocking release when deviation >0.01% or P1 fails", "☑ Full audit log for AI Agent suggestions"],
        ["☑ アクチュアリー承認済みのゴールデンデータセット30〜50ケース", "☑ P1/P2/P3全体をカバーする42ケースの決定マトリクス", "☑ 独立して別途バージョン管理された保険数理オラクル", "☑ 自動実行される夜間突合バッチ＋Slack警告", "☑ 乖離0.01%超またはP1失敗時にリリースをブロックするCIゲート", "☑ AIエージェントの提案に対する完全な監査ログ"]
      ),
      TIP(
        "Khi bàn giao cho đội mới, luôn kèm theo tài liệu actuarial gốc (spec công thức) bên cạnh test code — test code chỉ có ý nghĩa khi đọc cùng nguồn công thức mà nó xác thực.",
        "When handing over to a new team, always attach the original actuarial documentation (formula spec) alongside the test code — test code only makes sense when read together with the formula source it validates.",
        "新しいチームに引き継ぐ際は、必ずテストコードと一緒に元の保険数理ドキュメント（計算式の仕様書）を添付してください。テストコードは、それが検証する計算式のソースと合わせて読んで初めて意味を持ちます。"
      ),
    ],
  },
];

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "insurance-underwriting-pricing-decision",
  cover: cover1,
  tags: tags("thucchien", "insurance", "api", "datadriven", "playwright", "realworld"),
  title: {
    vi: "Thực chiến bảo hiểm: thẩm định (underwriting) & tính phí theo bảng quyết định + hệ số actuarial",
    en: "Enterprise insurance: underwriting & pricing via decision table + actuarial factors",
    ja: "実戦・保険：決定表と保険数理係数による引受・料率計算のテスト",
  },
  summary: {
    vi: "Bài sâu 14 chương: bối cảnh underwriting, kiến trúc, bất biến nghiệp vụ, decision table testing, oracle actuarial độc lập, ca lỗi race/timeout/rounding, đối soát, CI/CD, AI Agent, phỏng vấn.",
    en: "14-chapter deep dive: underwriting context, architecture, business invariants, decision-table testing, independent actuarial oracle, race/timeout/rounding failure cases, reconciliation, CI/CD, AI Agent, interview.",
    ja: "14章にわたる詳細解説：引受の背景、アーキテクチャ、業務不変条件、決定表テスト、独立した保険数理オラクル、競合・タイムアウト・丸め誤差の異常系、突合、CI/CD、AIエージェント、面接対策。",
  },
  pages: buildDoc(pages1),
};

// ============================================================================================
// BÀI 2: Bảo hiểm — Tái tục hợp đồng (renewal), sửa đổi (endorsement), proration
// ============================================================================================

const cover2 = makeThumb({ id: "ins-ren-02", domain: "insurance", kind: "thucchien", label: "実戦 · RENEWAL" });

const svg2Flow = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#1e1b4b"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e0e7ff">Vòng đời hợp đồng: tái tục &amp; sửa đổi · Policy lifecycle: renewal &amp; endorsement</text>
<rect x="24" y="60" width="130" height="50" rx="8" fill="#312e81" stroke="#a5b4fc"/>
<text x="89" y="80" font-size="11" fill="#e0e7ff" text-anchor="middle">Hợp đồng hiệu lực</text>
<text x="89" y="96" font-size="9" fill="#c7d2fe" text-anchor="middle">Active policy (term N)</text>
<rect x="190" y="30" width="140" height="46" rx="8" fill="#4338ca" stroke="#c4b5fd"/>
<text x="260" y="50" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Endorsement giữa kỳ</text>
<text x="260" y="65" font-size="9" fill="#e0e7ff" text-anchor="middle">Mid-term endorsement + proration</text>
<rect x="190" y="94" width="140" height="46" rx="8" fill="#0c4a6e" stroke="#7dd3fc">
</rect>
<text x="260" y="114" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Tái tục cuối kỳ</text>
<text x="260" y="129" font-size="9" fill="#e0e7ff" text-anchor="middle">End-of-term renewal</text>
<rect x="368" y="30" width="150" height="46" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="443" y="50" font-size="11" fill="#6ee7b7" text-anchor="middle" font-weight="700">Phí bổ sung/hoàn</text>
<text x="443" y="65" font-size="9" fill="#a7f3d0" text-anchor="middle">Additional charge / refund</text>
<rect x="368" y="94" width="150" height="46" rx="8" fill="#3f2d0f" stroke="#fbbf24"/>
<text x="443" y="114" font-size="11" fill="#fde68a" text-anchor="middle" font-weight="700">Hợp đồng phiên bản N+1</text>
<text x="443" y="129" font-size="9" fill="#fef3c7" text-anchor="middle">Policy version N+1</text>
<rect x="556" y="60" width="140" height="50" rx="8" fill="#450a0a" stroke="#f87171"/>
<text x="626" y="80" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="700">Đối soát cuối kỳ</text>
<text x="626" y="96" font-size="9" fill="#fecaca" text-anchor="middle">End-of-cycle reconciliation</text>
<g stroke="#a5b4fc" stroke-width="2" fill="none" marker-end="url(#arr2)">
<path d="M154 74 Q 172 52 190 52"/><path d="M154 94 Q 172 116 190 116"/>
<path d="M330 52 H368"/><path d="M330 116 H368"/>
<path d="M518 52 Q 540 70 556 78"/><path d="M518 116 Q 540 96 556 92"/>
</g>
<defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a5b4fc"/></marker></defs>
<text x="24" y="200" font-size="10" fill="#c7d2fe">Proration: phí thêm/hoàn = phí năm ÷ 365 × số ngày còn lại của kỳ hợp đồng, tính từ ngày hiệu lực endorsement.</text>
<text x="24" y="216" font-size="9" fill="#a5b4fc">Proration: additional/refund = annual premium ÷ 365 × remaining days in policy term, from the endorsement effective date.</text>
<text x="24" y="236" font-size="9" fill="#818cf8">Bất biến: hiệu lực hợp đồng phải liên tục — không có khoảng trống (gap) hoặc chồng lấn (overlap) giữa các phiên bản.</text>
</svg>`;

const svg2Table = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca endorsement &amp; proration · Endorsement &amp; proration case matrix</text>
<g font-size="11">
<rect x="24" y="44" width="672" height="26" fill="#1e293b"/>
<text x="34" y="62" fill="#93c5fd" font-weight="700">Loại thay đổi</text>
<text x="204" y="62" fill="#93c5fd" font-weight="700">Thời điểm hiệu lực</text>
<text x="384" y="62" fill="#93c5fd" font-weight="700">Tác động phí</text>
<text x="564" y="62" fill="#93c5fd" font-weight="700">Kỳ vọng</text>
<rect x="24" y="70" width="672" height="26" fill="#0b1220"/>
<text x="34" y="88" fill="#e2e8f0">Tăng hạn mức bảo hiểm</text><text x="204" y="88" fill="#e2e8f0">Giữa kỳ, còn 120/365 ngày</text>
<text x="384" y="88" fill="#e2e8f0">Thu thêm phí</text><text x="564" y="88" fill="#6ee7b7" font-weight="700">Prorated charge dương</text>
<rect x="24" y="96" width="672" height="26" fill="#111827"/>
<text x="34" y="114" fill="#e2e8f0">Giảm hạn mức bảo hiểm</text><text x="204" y="114" fill="#e2e8f0">Giữa kỳ, còn 200/365 ngày</text>
<text x="384" y="114" fill="#e2e8f0">Hoàn phí</text><text x="564" y="114" fill="#93c5fd" font-weight="700">Prorated refund dương</text>
<rect x="24" y="122" width="672" height="26" fill="#0b1220"/>
<text x="34" y="140" fill="#e2e8f0">Hủy hợp đồng giữa kỳ</text><text x="204" y="140" fill="#e2e8f0">Giữa kỳ, còn 30/365 ngày</text>
<text x="384" y="140" fill="#e2e8f0">Hoàn phí một phần − phí hủy</text><text x="564" y="140" fill="#fde68a" font-weight="700">Refund − cancellation fee ≥0</text>
<rect x="24" y="148" width="672" height="26" fill="#111827"/>
<text x="34" y="166" fill="#e2e8f0">Tái tục đúng hạn</text><text x="204" y="166" fill="#e2e8f0">Ngày cuối kỳ N</text>
<text x="384" y="166" fill="#e2e8f0">Phí năm mới theo hệ số cập nhật</text><text x="564" y="166" fill="#6ee7b7" font-weight="700">Policy N+1 liên tục, không gap</text>
<rect x="24" y="174" width="672" height="26" fill="#0b1220"/>
<text x="34" y="192" fill="#e2e8f0">Endorsement chồng lấn</text><text x="204" y="192" fill="#e2e8f0">2 thay đổi cùng ngày hiệu lực</text>
<text x="384" y="192" fill="#e2e8f0">Không xác định thứ tự áp dụng</text><text x="564" y="192" fill="#f87171" font-weight="700">Reject / cần versioning tuần tự</text>
</g>
<text x="24" y="230" font-size="10" fill="#94a3b8">Oracle: tổng(phí gốc + Σ prorated adjustments) phải khớp phí cuối cùng trong hệ thống billing, sai số &lt; 0,01 đơn vị tiền tệ.</text>
<text x="24" y="246" font-size="10" fill="#94a3b8">Oracle: sum(original premium + Σ prorated adjustments) must match the final billing-system amount, tolerance &lt; 0.01 currency unit.</text>
</svg>`;

const pages2 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "VietLife quản lý danh mục 1,1 triệu hợp đồng bảo hiểm nhân thọ và phi nhân thọ đang hiệu lực, trong đó khoảng 9% hợp đồng phát sinh yêu cầu sửa đổi (endorsement) giữa kỳ mỗi năm — tăng/giảm hạn mức bảo hiểm, đổi người thụ hưởng, thêm điều khoản bổ sung — và 100% hợp đồng phải qua quy trình tái tục (renewal) vào cuối mỗi kỳ 12 tháng nếu khách hàng không hủy. Module Policy Lifecycle Service (PLS) chịu trách nhiệm tính toán phí theo tỷ lệ thời gian còn lại (proration), phát hành phiên bản hợp đồng mới, và đảm bảo hiệu lực bảo hiểm không bao giờ bị gián đoạn — một ngày gián đoạn hiệu lực có thể khiến công ty từ chối bồi thường sai cho khách hàng vẫn đang đóng phí đều đặn.",
        "VietLife manages a portfolio of 1.1 million active life and non-life policies, of which about 9% undergo a mid-term endorsement each year — increasing/decreasing coverage limits, changing beneficiaries, adding riders — and 100% of policies go through a renewal process at the end of each 12-month term unless the customer cancels. The Policy Lifecycle Service (PLS) is responsible for computing proration based on remaining time, issuing new policy versions, and ensuring coverage is never interrupted — a single day of coverage gap could wrongly cause a claim denial for a customer who has been paying premiums on time.",
        "VietLifeは110万件の有効な生命・損害保険契約のポートフォリオを管理しており、そのうち約9%が毎年、補償限度額の増減、受取人の変更、特約の追加といった契約途中の裏書（保険内容変更、エンドースメント）を発生させ、顧客が解約しない限り100%の契約が12か月ごとの契約期末に更新（リニューアル）手続きを経ます。契約ライフサイクルサービス（PLS）は、残存期間に基づく日割り計算（proration）、新しい契約バージョンの発行、そして補償が途切れないことの保証を担っています。たった1日の補償の空白期間でも、保険料を期日通りに支払っている顧客に対して誤って保険金請求を拒否してしまう可能性があります。"
      ),
      P(
        "Phạm vi kiểm thử bài này tập trung: (1) engine proration tính phí bổ sung/hoàn khi endorsement giữa kỳ, (2) quy trình phát hành phiên bản hợp đồng mới khi tái tục, đảm bảo continuity of coverage (hiệu lực liên tục không gap/overlap), và (3) đối soát cuối kỳ giữa số tiền billing thực thu và số tiền proration tính toán. Ràng buộc nghiệp vụ nghiêm ngặt: mọi thay đổi hợp đồng phải lưu vết dạng version (endorsement history), không cho phép sửa đè bản ghi cũ, phục vụ yêu cầu tra soát khi có khiếu nại hoặc thanh tra.",
        "This piece's testing scope: (1) the proration engine computing additional charges/refunds for mid-term endorsements, (2) the policy-version issuance process at renewal, ensuring continuity of coverage (no gaps/overlaps), and (3) end-of-cycle reconciliation between actual billed amounts and computed proration amounts. A strict business constraint: every policy change must be recorded as a version (endorsement history), never overwriting old records, to serve audit or complaint investigations.",
        "本稿のテスト範囲は次の通りです。（1）契約途中の裏書に対する追加請求・返金を計算する日割り計算エンジン、（2）更新時の新しい契約バージョン発行プロセスで、補償の継続性（ギャップ・重複のない有効性）を保証すること、（3）実際の請求金額と計算された日割り金額との期末突合です。厳格な業務制約として、すべての契約変更は履歴が残るバージョンとして記録されなければならず（裏書履歴）、古いレコードの上書きは許されません。これは苦情対応や監査の際の調査に対応するためです。"
      ),
      IMG(svg2Flow, "Vòng đời hợp đồng: endorsement giữa kỳ và tái tục cuối kỳ", "Policy lifecycle: mid-term endorsement and end-of-term renewal", "契約ライフサイクル：契約途中の裏書と契約期末の更新"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API tính proration cho endorsement giữa kỳ", "API phát hành phiên bản hợp đồng khi tái tục", "Kiểm tra continuity hiệu lực (không gap/overlap)", "Đối soát billing vs proration cuối kỳ", "Luồng E2E: khách yêu cầu tăng hạn mức → nhận hoá đơn bổ sung"],
        ["Proration calculation API for mid-term endorsements", "Policy-version issuance API at renewal", "Coverage continuity check (no gaps/overlaps)", "End-of-cycle billing vs proration reconciliation", "E2E flow: customer requests coverage increase → receives additional invoice"],
        ["契約途中の裏書に対する日割り計算API", "更新時の契約バージョン発行API", "有効性の継続性チェック（ギャップ・重複なし）", "期末の請求額と日割り計算の突合", "E2Eフロー：顧客が補償増額を申請→追加請求書を受領"]
      ),
      NOTE(
        "Renewal khác endorsement ở chỗ renewal luôn tạo TOÀN BỘ hợp đồng phiên bản mới (term mới), còn endorsement chỉ sửa một phần thuộc tính trong CÙNG kỳ hợp đồng hiện tại — hai luồng nghiệp vụ có oracle khác nhau.",
        "Renewal differs from endorsement in that renewal always creates an ENTIRELY new policy version (new term), while endorsement only modifies some attributes WITHIN the current policy term — the two flows have different oracles.",
        "更新（リニューアル）が裏書（エンドースメント）と異なる点は、更新は常に完全に新しい契約バージョン（新しい契約期間）を作成するのに対し、裏書は現在の契約期間内の一部の属性のみを変更することです。この2つの業務フローは異なるオラクルを持ちます。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "PLS tách biệt 3 service: Endorsement Service xử lý thay đổi giữa kỳ và gọi Proration Engine để tính phí chênh lệch, Renewal Service chạy batch hàng đêm quét các hợp đồng sắp hết hạn trong 30 ngày tới để chuẩn bị báo giá tái tục, và Billing Service ghi nhận giao dịch thu/hoàn tiền thực tế liên kết ngân hàng đối tác. Endorsement và Renewal đều publish sự kiện `PolicyVersionCreated` lên Kafka để Billing Service và Notification Service (gửi email/SMS khách hàng) subscribe xử lý bất đồng bộ, tránh khoá luồng chính khi hệ thống thanh toán bên thứ ba chậm.",
        "PLS is split into three services: the Endorsement Service handles mid-term changes and calls the Proration Engine to compute the fee difference, the Renewal Service runs a nightly batch scanning policies expiring within the next 30 days to prepare renewal quotes, and the Billing Service records actual charge/refund transactions linked to a partner bank. Both Endorsement and Renewal publish a `PolicyVersionCreated` event to Kafka for the Billing Service and Notification Service (customer email/SMS) to subscribe and process asynchronously, avoiding blocking the main flow when the third-party payment system is slow.",
        "PLSは3つのサービスに分かれています。契約途中の変更を処理し、差額計算のためにProration Engineを呼び出すEndorsement Service、今後30日以内に満了する契約をスキャンして更新見積を準備する夜間バッチを実行するRenewal Service、提携銀行と連携した実際の請求・返金取引を記録するBilling Serviceです。EndorsementとRenewalはどちらも`PolicyVersionCreated`イベントをKafkaに発行し、Billing ServiceとNotification Service（顧客へのメール・SMS）が非同期で購読・処理します。これにより、サードパーティの決済システムが遅い場合でもメインフローがブロックされることを防ぎます。"
      ),
      IMG(svg2Flow, "Kiến trúc tách biệt Endorsement/Renewal/Billing qua sự kiện Kafka", "Endorsement/Renewal/Billing architecture decoupled via Kafka events", "Kafkaイベントで疎結合されたEndorsement/Renewal/Billingアーキテクチャ"),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストの難所"),
      UL(
        ["Proration phải tính đúng theo lịch (30/360 hay lịch thực actual/365) — sai quy ước gây lệch phí nhỏ nhưng tích luỹ lớn", "2 endorsement hiệu lực cùng ngày cần thứ tự xử lý tuần tự rõ ràng", "Batch renewal đêm phải idempotent nếu chạy lại do lỗi giữa chừng"],
        ["Proration must follow the correct day-count convention (30/360 vs actual/365) — a wrong convention causes small but cumulatively large premium drift", "Two endorsements effective the same day need a clearly defined sequential processing order", "The nightly renewal batch must be idempotent if rerun after a mid-run failure"],
        ["日割り計算は正しい日数計算方式（30/360か実日数/365か）に従う必要があり、誤った方式は小さいながらも累積すると大きな保険料のずれを生む", "同日に発効する2件の裏書には明確な順次処理順序が必要", "夜間更新バッチは、実行途中の失敗後に再実行された場合でも冪等でなければならない"]
      ),
      TIP(
        "Luôn xác nhận với business analyst quy ước ngày (day-count convention) được dùng — actual/365 và 30/360 cho kết quả proration khác nhau vài phần trăm ở các kỳ có tháng 2.",
        "Always confirm the day-count convention used with the business analyst — actual/365 and 30/360 give proration results differing by a few percent in terms spanning February.",
        "使用される日数計算方式（デイカウント規則）については必ずビジネスアナリストに確認してください。実日数/365方式と30/360方式では、2月を含む契約期間において日割り計算結果が数パーセント異なります。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể Policy có nhiều PolicyVersion theo thời gian, mỗi PolicyVersion có effectiveFrom/effectiveTo không được chồng lấn với version khác của cùng Policy. Mỗi Endorsement tạo ra một PolicyVersion mới và một ProrationAdjustment ghi số tiền dương (thu thêm) hoặc âm (hoàn), trong khi Renewal tạo PolicyVersion mới với effectiveFrom bằng đúng effectiveTo + 1 ngày của version trước đó — đây là bất biến continuity quan trọng nhất của toàn hệ thống.",
        "The Policy entity has multiple PolicyVersions over time; each PolicyVersion's effectiveFrom/effectiveTo must not overlap with another version of the same Policy. Every Endorsement creates a new PolicyVersion and a ProrationAdjustment recording a positive amount (additional charge) or negative (refund), while Renewal creates a new PolicyVersion whose effectiveFrom equals exactly the previous version's effectiveTo + 1 day — this is the single most important continuity invariant in the whole system.",
        "Policyエンティティは時系列で複数のPolicyVersionを持ち、各PolicyVersionのeffectiveFrom（発効日）／effectiveTo（満了日）は同一Policyの他のバージョンと重複してはなりません。すべてのEndorsementは新しいPolicyVersionと、正の金額（追加請求）または負の金額（返金）を記録するProrationAdjustmentを作成します。一方Renewalは、直前のバージョンのeffectiveToの翌日と正確に一致するeffectiveFromを持つ新しいPolicyVersionを作成します。これはシステム全体で最も重要な継続性の不変条件です。"
      ),
      H("Bất biến nghiệp vụ (oracle) bắt buộc", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Không có gap: version(N).effectiveTo + 1 ngày = version(N+1).effectiveFrom",
          "Không có overlap: khoảng [effectiveFrom, effectiveTo] của 2 version bất kỳ không giao nhau",
          "Bảo toàn phí: phí gốc + Σ ProrationAdjustment của mọi endorsement = phí cuối cùng trong billing, sai số < 0,01",
          "Proration = phí năm ÷ tổng ngày kỳ × số ngày còn lại kể từ ngày hiệu lực thay đổi, làm tròn theo quy ước day-count đã xác nhận",
          "Endorsement history là append-only: không bao giờ UPDATE/DELETE bản ghi PolicyVersion cũ, chỉ tạo bản ghi mới và đánh dấu supersededBy",
        ],
        [
          "No gap: version(N).effectiveTo + 1 day = version(N+1).effectiveFrom",
          "No overlap: the [effectiveFrom, effectiveTo] range of any two versions never intersects",
          "Premium conservation: original premium + Σ ProrationAdjustment of all endorsements = final billing amount, tolerance < 0.01",
          "Proration = annual premium ÷ total term days × remaining days from the change's effective date, rounded per the confirmed day-count convention",
          "Endorsement history is append-only: never UPDATE/DELETE an old PolicyVersion record, only create a new one and mark supersededBy",
        ],
        [
          "ギャップなし：バージョン(N)のeffectiveTo + 1日 = バージョン(N+1)のeffectiveFrom",
          "重複なし：任意の2つのバージョンの[effectiveFrom, effectiveTo]範囲は決して交差しない",
          "保険料の保存則：元の保険料 + すべての裏書のΣProrationAdjustment = 最終請求金額、誤差0.01未満",
          "日割り計算 = 年間保険料 ÷ 契約期間の総日数 × 変更発効日からの残存日数、確認済みの日数計算方式に従って丸める",
          "裏書履歴は追記専用（append-only）：古いPolicyVersionレコードを決してUPDATE/DELETEせず、新しいレコードを作成しsupersededByをマークするのみ",
        ]
      ),
      WARN(
        "Nếu 2 endorsement được submit với cùng effectiveFrom, hệ thống KHÔNG được xử lý song song tự do — phải có cơ chế khoá tuần tự (optimistic locking theo version number) để tránh 2 ProrationAdjustment tính trên cùng baseline cũ, gây sai lệch phí.",
        "If two endorsements are submitted with the same effectiveFrom, the system must NOT process them freely in parallel — a sequential locking mechanism (optimistic locking by version number) is required to prevent two ProrationAdjustments computed against the same stale baseline, causing premium drift.",
        "同一のeffectiveFromで2件の裏書が提出された場合、システムは自由に並行処理してはいけません。同じ古いベースラインに対して2つのProrationAdjustmentが計算され、保険料のずれが生じることを防ぐため、順次ロック機構（バージョン番号による楽観的ロック）が必要です。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro lớn nhất là gap hiệu lực hợp đồng — nếu batch renewal đêm lỗi một phần và không tạo version mới đúng hạn, khách hàng có thể rơi vào trạng thái 'không có hợp đồng hiệu lực' trong vài giờ, dẫn tới từ chối bồi thường sai nếu có sự kiện bảo hiểm xảy ra đúng lúc đó — rủi ro pháp lý và uy tín rất lớn dù xác suất thấp. Rủi ro thứ hai là sai proration tích luỹ trên diện rộng: với ~99.000 endorsement/năm (9% của 1,1 triệu hợp đồng), một lỗi làm tròn 0,5% có thể gây lệch thu hàng tỷ đồng mỗi năm. Rủi ro thứ ba là mất tính idempotent khi batch renewal chạy lại do lỗi hạ tầng giữa chừng, gây tạo trùng nhiều PolicyVersion cho cùng kỳ mới.",
        "The biggest risk is a coverage gap — if the nightly renewal batch fails partway and doesn't create a new version on time, a customer could end up with 'no active policy' for a few hours, wrongly leading to claim denial if an insured event happens to occur then — low probability but very high legal and reputational risk. The second risk is proration errors accumulating at scale: with ~99,000 endorsements/year (9% of 1.1 million policies), a 0.5% rounding bug could cause billions of VND in revenue drift annually. The third risk is losing idempotency when the renewal batch reruns after a mid-run infrastructure failure, creating duplicate PolicyVersions for the same new term.",
        "最大のリスクは補償の空白期間です。夜間更新バッチが途中で失敗し、新しいバージョンが期日通りに作成されない場合、顧客は数時間「有効な契約なし」の状態に陥る可能性があり、その間に保険事故が発生すれば誤って保険金請求が拒否されてしまいます。発生確率は低いものの、法的・レピュテーションリスクは非常に大きいものです。第二のリスクは、大規模での日割り計算誤差の累積です。年間約99,000件の裏書（110万契約の9%）に対し、0.5%の丸め誤差バグは年間数十億ドンの収益のずれを引き起こす可能性があります。第三のリスクは、更新バッチが実行途中のインフラ障害後に再実行された際に冪等性が失われ、同じ新契約期間に対して重複したPolicyVersionが作成されてしまうことです。"
      ),
      H("Chiến lược kiểm thử theo kim tự tháp", "Test strategy pyramid", "テスト戦略ピラミッド"),
      UL(
        ["65% unit test cho proration formula và continuity check", "25% integration test cho luồng endorsement/renewal với Billing giả lập", "10% E2E cho hành trình khách hàng yêu cầu thay đổi hợp đồng"],
        ["65% unit tests for the proration formula and continuity check", "25% integration tests for the endorsement/renewal flow with a mocked Billing", "10% E2E for the customer journey requesting a policy change"],
        ["65%は日割り計算式と継続性チェックのユニットテスト", "25%はモック化されたBillingを用いたendorsement/renewalフローの統合テスト", "10%は契約変更を申請する顧客ジャーニーのE2Eテスト"]
      ),
      SCEN(
        "Kịch bản rủi ro thực tế",
        "Real-world risk scenario",
        "Batch renewal lúc 2h sáng bị timeout kết nối database giữa chừng sau khi đã xử lý 40.000/58.000 hợp đồng đến hạn, job tự động retry toàn bộ mà không kiểm tra hợp đồng nào đã có version mới, tạo ra 40.000 PolicyVersion trùng lặp. Đội vận hành phát hiện qua cảnh báo continuity-check job và phải chạy script dọn dẹp trong đêm trước giờ mở cửa nghiệp vụ.",
        "The 2am renewal batch hit a database connection timeout mid-run after processing 40,000 of 58,000 due policies; the job auto-retried the entire batch without checking which policies already had a new version, creating 40,000 duplicate PolicyVersions. Ops caught it via the continuity-check alert and had to run a cleanup script overnight before business hours.",
        "面接シナリオ本文（日本語）",
        "午前2時の更新バッチが、期限到来の58,000契約のうち40,000件を処理した時点でデータベース接続タイムアウトに遭遇しました。ジョブはどの契約が既に新しいバージョンを持っているかを確認せずにバッチ全体を自動リトライし、40,000件の重複したPolicyVersionを作成してしまいました。運用チームは継続性チェックのアラートでこれを発見し、営業時間前の夜間にクリーンアップスクリプトを実行しなければなりませんでした。"
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan phạm vi kiểm thử PLS v2.1 trước khi triển khai tính năng endorsement tự phục vụ (self-service) trên app khách hàng. Entry criteria: môi trường staging có 5.000 hợp đồng mẫu với đủ trạng thái (đang hiệu lực, sắp hết hạn, đã tái tục nhiều lần), mock Billing Service sẵn sàng. Exit criteria: 100% ca continuity (gap/overlap) pass, 100% ca proration khớp oracle trong sai số 0,01, batch renewal chạy lại (rerun) không tạo bản ghi trùng, không còn defect Critical/High.",
        "The Test Plan scopes testing PLS v2.1 ahead of rolling out self-service endorsement on the customer app. Entry criteria: staging holds 5,000 sample policies across states (active, expiring soon, renewed multiple times), mock Billing Service ready. Exit criteria: 100% of continuity (gap/overlap) cases pass, 100% of proration cases match the oracle within 0.01 tolerance, a rerun renewal batch creates no duplicate records, no open Critical/High defects.",
        "テスト計画は、顧客アプリでのセルフサービス裏書機能の展開前におけるPLS v2.1のテスト範囲を定めます。開始基準：ステージング環境に様々な状態（有効、まもなく満了、複数回更新済み）の契約サンプル5,000件が用意され、モックBilling Serviceが準備できていること。終了基準：継続性（ギャップ・重複）ケース100%合格、日割り計算ケースが誤差0.01以内でオラクルと一致すること100%、更新バッチの再実行で重複レコードが作成されないこと、Critical/High未解決欠陥がないこと。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: sở hữu ma trận ca continuity/proration", "Automation Engineer: viết test API + batch verification script", "Billing liaison: xác nhận số tiền thực thu khớp proration", "DBA: hỗ trợ kiểm tra ràng buộc constraint gap/overlap ở tầng DB"],
        ["QA Lead: owns the continuity/proration case matrix", "Automation Engineer: writes API tests + batch verification scripts", "Billing liaison: confirms actual charged amounts match proration", "DBA: assists verifying gap/overlap constraints at the DB layer"],
        ["QAリード：継続性・日割り計算のケース表を管理", "自動化エンジニア：APIテストとバッチ検証スクリプトを作成", "請求連絡担当：実際の請求額が日割り計算と一致することを確認", "DBA：DB層でのギャップ・重複制約の検証を支援"]
      ),
      NOTE(
        "Chỉ số KPI theo dõi: tỉ lệ hợp đồng có gap/overlap phát hiện sau mỗi run batch (mục tiêu 0), độ lệch proration trung bình, tỉ lệ batch renewal hoàn tất trong cửa sổ bảo trì 2h-4h sáng.",
        "Tracked KPIs: rate of gap/overlap policies detected after each batch run (target 0), average proration deviation, renewal batch completion rate within the 2am-4am maintenance window.",
        "監視するKPI：各バッチ実行後に検出されるギャップ・重複契約の割合（目標0）、平均日割り計算の乖離、午前2時〜4時のメンテナンスウィンドウ内での更新バッチ完了率。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử (decision table)", en: "6. Test case design matrix (decision table)", ja: "6. テストケース設計マトリクス（決定表）" },
    blocks: [
      P(
        "Ma trận ca chia theo loại thay đổi (tăng hạn mức, giảm hạn mức, hủy giữa kỳ, tái tục đúng hạn, tái tục trễ, endorsement chồng lấn) nhân với thời điểm hiệu lực (đầu kỳ, giữa kỳ, gần cuối kỳ, đúng ngày cuối kỳ — ca biên quan trọng nhất). Với mỗi tổ hợp, oracle kỳ vọng là công thức proration cụ thể và trạng thái continuity sau khi áp dụng, giúp mọi ca đều verify được bằng số liệu thay vì chỉ 'thao tác thành công'.",
        "The case matrix splits by change type (increase coverage, decrease coverage, mid-term cancellation, on-time renewal, late renewal, overlapping endorsements) multiplied by effective timing (start of term, mid-term, near end of term, exactly the last day of term — the most critical boundary). For each combination, the expected oracle is a specific proration formula and the resulting continuity state, so every case can be verified by numbers rather than just 'operation succeeded'.",
        "ケース表は、変更の種類（補償増額、補償減額、契約途中解約、期日通りの更新、更新遅延、重複する裏書）と発効タイミング（契約期首、契約途中、契約期末近く、契約期間の最終日ちょうど―最も重要な境界値）の組み合わせで分割されます。各組み合わせについて、期待されるオラクルは具体的な日割り計算式と適用後の継続性の状態であり、すべてのケースが「操作が成功した」だけでなく数値で検証可能になります。"
      ),
      IMG(svg2Table, "Ma trận ca endorsement & proration với oracle số liệu cụ thể", "Endorsement & proration case matrix with concrete numeric oracle", "具体的な数値オラクルを伴う裏書・日割り計算のケース表"),
      H("Nhóm ca theo mức ưu tiên", "Case groups by priority", "優先度別のケースグループ"),
      UL(
        ["P1: continuity sau renewal (gap/overlap), 2 endorsement cùng ngày hiệu lực", "P2: proration tăng/giảm hạn mức ở các mốc ngày khác nhau, hủy giữa kỳ có phí phạt", "P3: tái tục thông thường không thay đổi, test hiệu năng batch renewal quy mô lớn"],
        ["P1: post-renewal continuity (gap/overlap), two endorsements on the same effective date", "P2: increase/decrease proration at various dates, mid-term cancellation with penalty fee", "P3: routine renewal with no changes, large-scale renewal batch performance test"],
        ["P1：更新後の継続性（ギャップ・重複）、同一発効日の2件の裏書", "P2：様々な日付での増減の日割り計算、違約金付き契約途中解約", "P3：変更のない通常の更新、大規模更新バッチの性能テスト"]
      ),
      TIP(
        "Luôn có ít nhất 1 ca test renewal xảy ra đúng vào năm nhuận (29/2) để phát hiện lỗi tính ngày trong công thức actual/365.",
        "Always include at least one renewal test case falling exactly on a leap year (Feb 29) to catch day-count bugs in the actual/365 formula.",
        "実日数/365方式の計算式における日数計算バグを発見するため、うるう年（2月29日）にちょうど当たる更新テストケースを少なくとも1件は含めてください。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường (mock bên thứ ba)", en: "7. Data & environment setup (third-party mocking)", ja: "7. データ・環境準備（サードパーティのモック化）" },
    blocks: [
      P(
        "Billing Service kết nối cổng thanh toán ngân hàng đối tác thật để thu/hoàn tiền — trong môi trường test, dùng sandbox của cổng thanh toán (test mode) kết hợp mock server riêng mô phỏng độ trễ thực tế (200ms-2s) và các mã lỗi thường gặp (thẻ hết hạn, tài khoản không đủ số dư). API test-only `/test/seed-policy` cho phép sinh nhanh 1 Policy với N PolicyVersion lịch sử tuỳ ý (đã tái tục 3 lần, có 2 endorsement) để dựng ca test phức tạp mà không cần thao tác tuần tự qua UI hàng chục bước.",
        "Billing Service connects to a real partner bank payment gateway for charges/refunds — in the test environment, use the payment gateway's sandbox (test mode) combined with a dedicated mock server simulating realistic latency (200ms-2s) and common error codes (expired card, insufficient balance). A test-only `/test/seed-policy` API lets QA quickly generate a Policy with an arbitrary number of historical PolicyVersions (renewed 3 times, with 2 endorsements) to build complex test cases without dozens of sequential UI steps.",
        "Billing Serviceは、請求・返金のために実際の提携銀行決済ゲートウェイに接続しています。テスト環境では、決済ゲートウェイのサンドボックス（テストモード）と、現実的なレイテンシ（200ms〜2秒）や一般的なエラーコード（カード期限切れ、残高不足）をシミュレートする専用モックサーバーを組み合わせて使用します。テスト専用API `/test/seed-policy` により、QAは任意の数の履歴PolicyVersion（3回更新済み、2件の裏書あり）を持つPolicyを素早く生成でき、数十ステップにわたる順次UI操作なしに複雑なテストケースを構築できます。"
      ),
      CODE(
        "bash",
        "# seed-complex-policy.sh — dựng nhanh 1 hợp đồng đã qua 3 lần tái tục + 2 endorsement\ncurl -X POST http://staging.vietlife.local/test/seed-policy \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"customerId\": \"CUST-9911\",\n    \"initialTermStart\": \"2023-01-01\",\n    \"renewalCount\": 3,\n    \"endorsements\": [\n      { \"type\": \"INCREASE_COVERAGE\", \"effectiveDate\": \"2024-06-15\", \"newLimit\": 500000000 },\n      { \"type\": \"DECREASE_COVERAGE\", \"effectiveDate\": \"2025-02-01\", \"newLimit\": 350000000 }\n    ]\n  }'"
      ),
      TIP(
        "Ghi lại timestamp chính xác (millisecond) khi seed dữ liệu lịch sử để test continuity-check không nhầm giữa lỗi thật và sai lệch múi giờ khi so sánh effectiveTo/effectiveFrom.",
        "Record precise (millisecond) timestamps when seeding historical data so the continuity check doesn't confuse a real bug with a timezone discrepancy when comparing effectiveTo/effectiveFrom.",
        "履歴データをシード投入する際は正確な（ミリ秒単位の）タイムスタンプを記録し、effectiveToとeffectiveFromを比較する際に、実際のバグとタイムゾーンのずれを混同しないようにしてください。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dựng theo Page Object cho form yêu cầu endorsement trên app khách hàng, kết hợp gọi API `/test/seed-policy` để chuẩn bị baseline hợp đồng, sau đó assert cả UI hiển thị đúng số tiền lẫn dữ liệu backend khớp oracle proration. Test không dừng ở 'hiển thị thông báo thành công' mà phải kiểm tra ProrationAdjustment ghi đúng dấu (dương/âm) và giá trị tuyệt đối khớp công thức trong sai số cho phép.",
        "Happy-path automation is built with a Page Object for the endorsement request form on the customer app, combined with calling the `/test/seed-policy` API to prepare a baseline policy, then asserting both the UI shows the correct amount and the backend data matches the proration oracle. Testing doesn't stop at 'success message shown' — it must verify the ProrationAdjustment has the correct sign (positive/negative) and its absolute value matches the formula within tolerance.",
        "ハッピーパス自動化は、顧客アプリの裏書申請フォームに対するPage Objectで構築され、`/test/seed-policy` APIの呼び出しでベースラインとなる契約を準備した上で、UIに正しい金額が表示されることとバックエンドのデータが日割り計算オラクルと一致することの両方をアサートします。テストは「成功メッセージが表示された」ことで終わらず、ProrationAdjustmentが正しい符号（正・負）を持ち、絶対値が許容誤差内で計算式と一致することを検証しなければなりません。"
      ),
      CODE(
        "typescript",
        "// endorsement-increase-coverage.spec.ts\nimport { test, expect } from '@playwright/test';\nimport { EndorsementPage } from './pages/endorsement-page';\nimport { computeProration } from './oracle/proration-oracle';\n\ntest('increasing coverage mid-term charges correct prorated amount', async ({ page, request }) => {\n  const policy = await seedPolicy(request, { termStart: '2025-01-01', termEnd: '2025-12-31', annualPremium: 12000000 });\n  const endorsementPage = new EndorsementPage(page);\n  await endorsementPage.gotoPolicy(policy.id);\n  await endorsementPage.requestIncreaseCoverage({ newLimit: 800000000, effectiveDate: '2025-09-01' });\n\n  const result = await endorsementPage.getAdjustmentResult();\n  const expected = computeProration({\n    annualPremiumDelta: 3000000, termStart: '2025-01-01', termEnd: '2025-12-31', effectiveDate: '2025-09-01', convention: 'actual/365',\n  });\n  expect(result.amount).toBeCloseTo(expected, 2);\n  expect(result.sign).toBe('CHARGE');\n});"
      ),
      CODE(
        "typescript",
        "// oracle/proration-oracle.ts — oracle độc lập tính proration\nexport function computeProration({ annualPremiumDelta, termStart, termEnd, effectiveDate, convention }: ProrationInput): number {\n  const totalDays = dayCount(termStart, termEnd, convention);\n  const remainingDays = dayCount(effectiveDate, termEnd, convention) + 1; // bao gồm ngày hiệu lực\n  return round2((annualPremiumDelta / totalDays) * remainingDays);\n}"
      ),
      TIP(
        "Viết lại hàm dayCount độc lập theo đúng tài liệu quy ước ngày, không tái sử dụng thư viện ngày tháng mà code sản phẩm đang dùng để tránh lỗi hệ thống ẩn giấu ở cả hai phía.",
        "Rewrite the dayCount function independently per the day-count convention documentation, not reusing the same date library the product code uses, to avoid a systemic bug hiding on both sides.",
        "dayCount関数は、製品コードが使用している日付ライブラリを再利用せず、日数計算方式のドキュメントに厳密に従って独立して書き起こしてください。そうしないと、両側に隠れたシステム的なバグを見逃す可能性があります。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Các ca lỗi chuyên sâu trong renewal/endorsement xoay quanh: batch renewal chạy lại (rerun) không được tạo trùng version, endorsement chồng lấn effectiveDate cần cơ chế khoá tuần tự, huỷ hợp đồng giữa kỳ phải trừ đúng phí phạt trước khi hoàn tiền, và renewal trễ hạn (khách xác nhận sau ngày hết hạn cũ) cần xử lý gap có kiểm soát bằng điều khoản grace period.",
        "Deep failure cases in renewal/endorsement revolve around: a rerun renewal batch must not create duplicate versions, overlapping-effective-date endorsements need a sequential locking mechanism, mid-term cancellation must deduct the correct penalty fee before refunding, and late renewal (customer confirms after the old expiry date) needs a controlled gap handled via a grace-period clause.",
        "更新・裏書における高度な異常系は次を中心とします。再実行された更新バッチが重複バージョンを作成しないこと、発効日が重複する裏書には順次ロック機構が必要なこと、契約途中解約では返金前に正しい違約金を差し引く必要があること、更新遅延（顧客が旧満了日後に確認）は猶予期間条項によって制御されたギャップとして処理する必要があることです。"
      ),
      CODE(
        "typescript",
        "// renewal-batch-idempotency.spec.ts\ntest('rerunning renewal batch after partial failure creates no duplicate versions', async ({ request }) => {\n  await request.post('/test/simulate-batch-failure', { data: { failAtPolicyIndex: 40000 } });\n  await request.post('/batch/renewal/run', { data: { asOfDate: '2026-07-06' } });\n  await request.post('/batch/renewal/run', { data: { asOfDate: '2026-07-06' } }); // rerun\n\n  const check = await request.get('/test/continuity-check?date=2026-07-06');\n  const body = await check.json();\n  expect(body.duplicateVersionCount).toBe(0);\n  expect(body.gapCount).toBe(0);\n  expect(body.overlapCount).toBe(0);\n});"
      ),
      CODE(
        "typescript",
        "// overlapping-endorsement-lock.spec.ts\ntest('two endorsements same effective date must process sequentially, not corrupt premium', async ({ request }) => {\n  const policy = await seedPolicy(request, { annualPremium: 12000000 });\n  const [r1, r2] = await Promise.all([\n    request.post(`/policies/${policy.id}/endorsements`, { data: { type: 'INCREASE_COVERAGE', effectiveDate: '2025-09-01', newLimit: 800000000 } }),\n    request.post(`/policies/${policy.id}/endorsements`, { data: { type: 'DECREASE_COVERAGE', effectiveDate: '2025-09-01', newLimit: 600000000 } }),\n  ]);\n  const versions = await getPolicyVersions(request, policy.id);\n  // phải xử lý tuần tự theo optimistic lock, phiên bản cuối cùng phản ánh đúng 1 trong 2 thứ tự xác định\n  expect(versions.filter((v) => !v.supersededBy).length).toBe(1);\n  expect(hasGapOrOverlap(versions)).toBe(false);\n});"
      ),
      CODE(
        "typescript",
        "// mid-term-cancellation-penalty.spec.ts\ntest('mid-term cancellation deducts penalty before refund, never negative payout', async ({ request }) => {\n  const policy = await seedPolicy(request, { annualPremium: 12000000, termStart: '2025-01-01', termEnd: '2025-12-31' });\n  const res = await request.post(`/policies/${policy.id}/cancel`, { data: { effectiveDate: '2025-11-15', penaltyRate: 0.05 } });\n  const body = await res.json();\n  const grossRefund = computeProration({ annualPremiumDelta: -12000000, termStart: '2025-01-01', termEnd: '2025-12-31', effectiveDate: '2025-11-15', convention: 'actual/365' });\n  const expectedNet = round2(grossRefund + Math.abs(grossRefund) * 0.05 * -1); // trừ phí phạt 5% trên phần hoàn\n  expect(body.refundAmount).toBeCloseTo(expectedNet, 2);\n  expect(body.refundAmount).toBeGreaterThanOrEqual(0); // không bao giờ âm\n});"
      ),
      CODE(
        "typescript",
        "// late-renewal-grace-period.spec.ts\ntest('late renewal confirmed within grace period preserves continuity retroactively', async ({ request }) => {\n  const policy = await seedPolicy(request, { termEnd: '2025-12-31' });\n  // khách xác nhận tái tục vào 2026-01-10, trong grace period 15 ngày\n  const res = await request.post(`/policies/${policy.id}/renew`, { data: { confirmedDate: '2026-01-10', gracePeriodDays: 15 } });\n  const body = await res.json();\n  expect(body.newVersion.effectiveFrom).toBe('2026-01-01'); // hồi tố về đúng ngày liền sau kỳ cũ\n  expect(body.coverageGapDays).toBe(0);\n});"
      ),
      WARN(
        "Grace period không nên áp dụng mặc định vô hạn — nếu khách xác nhận renewal ngoài grace period, hệ thống phải tạo hợp đồng MỚI (policy number mới) thay vì giả vờ continuity, tránh gian lận bồi thường hồi tố.",
        "Grace period should not apply indefinitely by default — if a customer confirms renewal outside the grace period, the system must create a BRAND NEW policy (new policy number) rather than pretending continuity, to prevent retroactive claim fraud.",
        "猶予期間はデフォルトで無制限に適用すべきではありません。顧客が猶予期間外に更新を確認した場合、システムは継続性を装うのではなく、まったく新しい契約（新しい証券番号）を作成しなければなりません。これは遡及的な保険金請求詐欺を防ぐためです。"
      ),
    ],
  },
  {
    heading: { vi: "10. Nghiệp vụ nền/hậu kiểm: đối soát billing vs proration", en: "10. Back-office: billing vs proration reconciliation", ja: "10. バックオフィス：請求と日割り計算の突合" },
    blocks: [
      P(
        "Job đối soát cuối mỗi chu kỳ thanh toán (weekly) so sánh tổng ProrationAdjustment tính toán trong hệ thống PLS với tổng giao dịch thực tế ghi nhận ở Billing Service qua cổng thanh toán ngân hàng, gắn cờ mọi hợp đồng có chênh lệch. Ngoài ra, job kiểm tra continuity toàn danh mục 1,1 triệu hợp đồng chạy hàng ngày để phát hiện sớm gap/overlap phát sinh từ bug batch renewal, thay vì chờ khách hàng khiếu nại khi có sự kiện bảo hiểm.",
        "A reconciliation job at the end of each weekly billing cycle compares total ProrationAdjustment computed in PLS against actual transactions recorded in the Billing Service via the bank payment gateway, flagging any policy with a discrepancy. Additionally, a full-portfolio (1.1 million policies) continuity check runs daily to catch gaps/overlaps arising from renewal-batch bugs early, rather than waiting for a customer complaint when an insured event occurs.",
        "毎週の請求サイクル終了時の突合ジョブは、PLSで計算された合計ProrationAdjustmentと、銀行決済ゲートウェイ経由でBilling Serviceに記録された実際の取引を比較し、乖離のある契約すべてにフラグを立てます。さらに、110万件のポートフォリオ全体の継続性チェックが毎日実行され、保険事故発生時の顧客からの苦情を待つのではなく、更新バッチのバグから生じるギャップ・重複を早期に発見します。"
      ),
      CODE(
        "sql",
        "-- reconciliation-billing-vs-proration.sql\nSELECT p.policy_id,\n       SUM(pa.amount) AS total_proration_adjustment,\n       SUM(bt.amount) AS total_billed_amount,\n       ROUND(ABS(SUM(pa.amount) - SUM(bt.amount)), 2) AS diff\nFROM policies p\nJOIN proration_adjustments pa ON pa.policy_id = p.policy_id\nJOIN billing_transactions bt ON bt.policy_id = p.policy_id AND bt.cycle = pa.cycle\nGROUP BY p.policy_id\nHAVING ABS(SUM(pa.amount) - SUM(bt.amount)) > 0.01;\n\n-- continuity check toàn danh mục\nSELECT policy_id, effective_from, effective_to,\n       LEAD(effective_from) OVER (PARTITION BY policy_id ORDER BY effective_from) AS next_from\nFROM policy_versions\nWHERE status = 'ACTIVE_HISTORY'\nQUALIFY next_from IS NOT NULL AND next_from <> DATE_ADD(effective_to, INTERVAL 1 DAY);"
      ),
      NOTE(
        "Kết quả đối soát được xuất báo cáo CSV kèm biểu đồ xu hướng chênh lệch theo tuần, gửi cho phòng tài chính để trích lập dự phòng nếu phát hiện lệch hệ thống, không chỉ đơn lẻ từng hợp đồng.",
        "Reconciliation results are exported as a CSV report with a weekly discrepancy trend chart, sent to the finance department to set aside provisions if a systemic drift is detected, not just isolated per-policy issues.",
        "突合結果は週次の乖離傾向グラフを添えたCSVレポートとしてエクスポートされ、個別契約の問題だけでなく、システム的なずれが検出された場合に引当金を計上するために財務部門へ送付されます。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
    blocks: [
      P(
        "Pipeline CI chạy unit test proration/continuity trên mọi PR (dưới 3 phút), integration test endorsement/renewal với Billing sandbox trên merge (dưới 15 phút), và một job riêng mô phỏng batch renewal quy mô đầy đủ (58.000 hợp đồng mẫu) chạy hàng tuần để đo hiệu năng và phát hiện regression continuity trước khi đổi logic batch. Gate release: bất kỳ ca P1 continuity nào fail sẽ tự động chặn deploy vào production, không có ngoại lệ thủ công.",
        "The CI pipeline runs proration/continuity unit tests on every PR (under 3 minutes), endorsement/renewal integration tests with a Billing sandbox on merge (under 15 minutes), and a separate job simulating a full-scale renewal batch (58,000 sample policies) weekly to measure performance and catch continuity regressions before changing batch logic. Release gate: any failing P1 continuity case automatically blocks production deployment, with no manual override.",
        "CIパイプラインは、すべてのPRで日割り計算・継続性のユニットテスト（3分未満）、マージ時にBillingサンドボックスを用いたendorsement/renewalの統合テスト（15分未満）を実行し、バッチロジックを変更する前に性能を測定し継続性の回帰を発見するため、フルスケールの更新バッチ（サンプル契約58,000件）をシミュレートする別ジョブを週次で実行します。リリースゲート：P1継続性ケースが1つでも失敗した場合、手動での例外なく本番デプロイを自動的にブロックします。"
      ),
      CODE(
        "yaml",
        "# .github/workflows/pls-pipeline.yml\nname: pls-ci\non: [pull_request, push, schedule]\njobs:\n  proration-continuity-unit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run test:unit:proration\n  endorsement-renewal-integration:\n    needs: proration-continuity-unit\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - run: docker compose -f docker-compose.billing-sandbox.yml up -d\n      - run: npm run test:integration:endorsement-renewal\n  weekly-full-batch-simulation:\n    if: github.event_name == 'schedule'\n    steps:\n      - run: npm run batch:renewal:simulate -- --policies=58000\n      - run: npm run check:continuity -- --fail-on-any-gap\n      - run: node scripts/gate-release.js"
      ),
      TIP(
        "Theo dõi biểu đồ Grafana số lượng gap/overlap phát hiện mỗi ngày (mục tiêu luôn = 0) và thời gian chạy batch renewal — thời gian tăng dần bất thường thường báo hiệu N+1 query hoặc thiếu index khi danh mục hợp đồng tăng trưởng.",
        "Track a Grafana chart of daily detected gap/overlap counts (target always = 0) and renewal batch run time — an abnormally increasing run time often signals an N+1 query or missing index as the policy portfolio grows.",
        "毎日検出されるギャップ・重複の件数（目標は常に0）と更新バッチの実行時間を追跡するGrafanaグラフを監視してください。実行時間の異常な増加は、契約ポートフォリオの成長に伴うN+1クエリやインデックス不足の兆候であることが多いです。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent hỗ trợ phân tích log batch renewal hàng đêm để phát hiện sớm dấu hiệu bất thường (thời gian chạy tăng đột biến, tỉ lệ lỗi timeout tăng) và tự động sinh báo cáo tóm tắt cho đội vận hành trước giờ mở cửa nghiệp vụ, giảm thời gian phát hiện sự cố từ vài giờ xuống vài phút. Agent cũng có thể đề xuất ca test mới cho các tổ hợp ngày hiệu lực chưa được phủ (ví dụ đúng ngày 31/12 của năm nhuận), nhưng con người luôn là người xác nhận công thức proration trước khi đưa ca mới vào bộ hồi quy chính thức.",
        "The AI Agent helps analyze nightly renewal batch logs to catch early anomaly signs (run time spikes, rising timeout error rate) and auto-generates a summary report for the ops team before business hours, cutting incident detection time from hours to minutes. The agent can also suggest new test cases for uncovered effective-date combinations (e.g., exactly Dec 31 of a leap year), but a human always confirms the proration formula before a new case enters the official regression suite.",
        "AIエージェントは、夜間更新バッチのログ分析を支援して異常の早期兆候（実行時間の急増、タイムアウトエラー率の上昇）を捉え、営業時間前に運用チーム向けの要約レポートを自動生成することで、インシデント検出時間を数時間から数分に短縮します。エージェントはまた、まだカバーされていない発効日の組み合わせ（例：うるう年の12月31日ちょうど）に対する新しいテストケースを提案することもできますが、新しいケースが正式な回帰テストスイートに組み込まれる前に、日割り計算式は常に人間が確認します。"
      ),
      H("Ranh giới trách nhiệm AI vs người", "AI vs human responsibility boundary", "AIと人間の責任境界"),
      UL(
        ["AI: phân tích log, phát hiện anomaly, tóm tắt báo cáo sự cố", "AI: đề xuất ca biên ngày hiệu lực chưa cover", "Người: xác nhận công thức proration/day-count trước khi thêm ca vào regression", "Người: quyết định có chạy lại batch renewal thất bại hay rollback thủ công"],
        ["AI: log analysis, anomaly detection, incident report summarization", "AI: suggests uncovered effective-date boundary cases", "Human: confirms the proration/day-count formula before adding a case to regression", "Human: decides whether to rerun a failed renewal batch or roll back manually"],
        ["AI：ログ分析、異常検知、インシデントレポートの要約", "AI：カバーされていない発効日の境界ケースを提案", "人間：ケースを回帰テストに追加する前に日割り計算・日数計算式を確認", "人間：失敗した更新バッチを再実行するか手動でロールバックするかを決定"]
      ),
      NOTE(
        "Mọi báo cáo do AI tạo ra được gắn nhãn rõ 'AI-generated summary, chưa xác nhận' cho tới khi QA Lead review, tránh đội vận hành hành động dựa trên kết luận chưa kiểm chứng.",
        "Every AI-generated report is clearly labeled 'AI-generated summary, unverified' until reviewed by the QA Lead, preventing ops from acting on unverified conclusions.",
        "AIが生成したすべてのレポートは、QAリードによるレビューが完了するまで「AI生成の要約、未確認」と明確にラベル付けされ、運用チームが未検証の結論に基づいて行動することを防ぎます。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Bạn kiểm thử tính năng proration khi sửa đổi hợp đồng bảo hiểm giữa kỳ như thế nào?",
        "How would you test proration when a mid-term policy endorsement occurs?",
        "Xác định trước công thức proration và quy ước ngày (day-count convention) từ tài liệu nghiệp vụ, viết oracle độc lập tính giá trị kỳ vọng, sau đó thiết kế ca theo thời điểm hiệu lực khác nhau (đầu/giữa/cuối kỳ, năm nhuận) và loại thay đổi (tăng/giảm/hủy), luôn assert số tiền chính xác trong sai số cho phép chứ không chỉ kiểm tra giao dịch có xảy ra.",
        "First pin down the proration formula and day-count convention from business documentation, write an independent oracle computing the expected value, then design cases across different effective timings (start/mid/end of term, leap year) and change types (increase/decrease/cancel), always asserting the exact amount within tolerance rather than just checking a transaction occurred.",
        "契約途中の裏書が発生した際の日割り計算機能はどのようにテストしますか。",
        "まず業務ドキュメントから日割り計算式と日数計算方式（デイカウント規則）を確定し、期待値を計算する独立したオラクルを作成します。その後、異なる発効タイミング（契約期首・途中・期末、うるう年）と変更の種類（増額・減額・解約）にわたってケースを設計し、取引が発生したことだけでなく、常に許容誤差内での正確な金額をアサートします。"
      ),
      QA(
        "Làm sao đảm bảo hiệu lực hợp đồng không bị gián đoạn khi tái tục hàng loạt bằng batch job?",
        "How do you ensure coverage isn't interrupted when renewing in bulk via a batch job?",
        "Thiết kế batch job idempotent (kiểm tra hợp đồng đã có version mới trước khi tạo lại), chạy continuity-check tự động ngay sau mỗi lần batch hoàn tất để phát hiện gap/overlap, và có cơ chế rollback/retry an toàn khi batch fail giữa chừng thay vì để job tự ý retry toàn bộ mà không kiểm tra trạng thái hiện tại.",
        "Design the batch job to be idempotent (checking whether a policy already has a new version before creating another), run an automatic continuity check right after each batch completes to catch gaps/overlaps, and have a safe rollback/retry mechanism when the batch fails mid-run instead of letting the job blindly retry the whole thing without checking current state.",
        "バッチジョブによる一括更新で補償が途切れないことをどのように保証しますか。",
        "バッチジョブを冪等に設計し（新しいバージョンを再作成する前に既に存在するか確認）、バッチ完了直後に自動的に継続性チェックを実行してギャップ・重複を発見し、バッチが実行途中で失敗した際には現在の状態を確認せずにジョブが全体を盲目的にリトライするのではなく、安全なロールバック・リトライ機構を備えます。"
      ),
      QA(
        "Nếu khách hàng xác nhận tái tục hợp đồng trễ 20 ngày sau khi hết hạn, hệ thống nên xử lý thế nào?",
        "If a customer confirms policy renewal 20 days after expiry, how should the system handle it?",
        "Nếu ngoài grace period đã định nghĩa (ví dụ 15 ngày), hệ thống không được giả vờ continuity hồi tố — phải tạo hợp đồng hoàn toàn mới với số hợp đồng mới, khoảng gián đoạn phải được ghi nhận rõ ràng để tránh rủi ro gian lận bồi thường cho sự kiện xảy ra trong khoảng gián đoạn đó.",
        "If it's outside the defined grace period (e.g., 15 days), the system must not pretend retroactive continuity — it must create a brand-new policy with a new policy number, and the gap must be clearly recorded to prevent claim-fraud risk for events occurring during that gap.",
        "顧客が満了後20日遅れで契約更新を確認した場合、システムはどう処理すべきですか。",
        "定義された猶予期間（例：15日）を超えている場合、システムは遡及的な継続性を装ってはいけません。新しい証券番号を持つ全く新しい契約を作成しなければならず、その空白期間中に発生した事故に対する保険金請求詐欺のリスクを防ぐため、空白期間は明確に記録される必要があります。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Đối soát cuối tuần phát hiện 300 hợp đồng có chênh lệch giữa proration tính toán và tiền thực thu qua billing, chênh lệch trung bình 1,2%. Bạn điều tra và trình bày hướng xử lý thế nào?",
        "Weekly reconciliation finds 300 policies with a discrepancy between computed proration and actual billed amounts, averaging a 1.2% deviation. How would you investigate and present a resolution approach?",
        "面接官の質問",
        "週次突合で、計算された日割り金額と実際の請求額との間に平均1.2%の乖離がある契約が300件見つかりました。どのように調査し、解決策を提示しますか。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán tái tục và sửa đổi hợp đồng bảo hiểm minh hoạ rõ giá trị của kiểm thử dựa trên bất biến continuity và bảo toàn phí thay vì chỉ kiểm tra giao diện: mọi ca test phải trace được về công thức proration cụ thể và trạng thái hiệu lực hợp đồng sau thao tác. Sau khi áp dụng bộ ca P1 continuity, oracle proration độc lập, và đối soát billing hàng tuần, đội QA giảm 87% sự cố gap hiệu lực phát hiện sau go-live và giảm thời gian điều tra chênh lệch phí từ trung bình 2 ngày xuống còn 3 giờ nhờ báo cáo đối soát tự động có gắn cờ chi tiết từng hợp đồng.",
        "The policy renewal and endorsement testing problem clearly illustrates the value of testing based on continuity and premium-conservation invariants rather than shallow UI checking: every test case must trace back to a specific proration formula and the resulting coverage state after the operation. After adopting the P1 continuity case set, the independent proration oracle, and weekly billing reconciliation, the QA team reduced post-go-live coverage-gap incidents by 87% and cut premium-discrepancy investigation time from an average of 2 days to 3 hours thanks to an automated reconciliation report flagging each policy in detail.",
        "契約更新・裏書のテスト問題は、表面的なUIチェックではなく、継続性と保険料保存則の不変条件に基づくテストの価値を明確に示しています。すべてのテストケースは、具体的な日割り計算式と操作後の補償状態に遡って追跡できなければなりません。P1継続性ケース群、独立した日割り計算オラクル、週次の請求突合を採用した結果、QAチームは本番稼働後の補償空白インシデントを87%削減し、各契約を詳細にフラグ付けする自動突合レポートのおかげで、保険料乖離の調査時間を平均2日から3時間に短縮しました。"
      ),
      H("Checklist bàn giao", "Handover checklist", "引き継ぎチェックリスト"),
      UL(
        ["☑ Ma trận ca theo loại thay đổi × thời điểm hiệu lực đầy đủ ca biên", "☑ Oracle proration độc lập theo đúng day-count convention đã xác nhận", "☑ Continuity-check chạy hàng ngày trên toàn danh mục", "☑ Đối soát billing vs proration hàng tuần có cảnh báo tự động", "☑ Batch renewal có test idempotency khi rerun", "☑ Gate CI chặn release khi ca P1 continuity fail"],
        ["☑ Case matrix by change type × effective timing covering all boundary cases", "☑ Independent proration oracle following the confirmed day-count convention", "☑ Daily continuity check across the full portfolio", "☑ Weekly billing vs proration reconciliation with automatic alerts", "☑ Renewal batch idempotency test on rerun", "☑ CI gate blocking release when a P1 continuity case fails"],
        ["☑ 変更の種類×発効タイミングによるケース表がすべての境界ケースをカバー", "☑ 確認済みの日数計算方式に従った独立した日割り計算オラクル", "☑ ポートフォリオ全体に対する日次継続性チェック", "☑ 自動警告付きの週次請求・日割り計算突合", "☑ 再実行時の更新バッチ冪等性テスト", "☑ P1継続性ケース失敗時にリリースをブロックするCIゲート"]
      ),
      TIP(
        "Khi giới thiệu hệ thống này cho thành viên mới, hãy vẽ tay dòng thời gian hiệu lực hợp đồng (timeline) trước khi đọc code — trực quan hoá continuity giúp hiểu bất biến nhanh hơn nhiều so với đọc schema thuần túy.",
        "When onboarding a new team member to this system, sketch the policy effective-date timeline by hand before reading code — visualizing continuity makes the invariant far easier to grasp than reading the raw schema.",
        "新しいチームメンバーにこのシステムを紹介する際は、コードを読む前に契約有効期間のタイムラインを手描きしてください。継続性を視覚化することは、スキーマをそのまま読むよりもはるかに不変条件を理解しやすくします。"
      ),
    ],
  },
];

const art2 = {
  categorySlug: "enterprise-realworld",
  slug: "insurance-policy-renewal-endorsement",
  cover: cover2,
  tags: tags("thucchien", "insurance", "api", "playwright", "advanced", "realworld"),
  title: {
    vi: "Thực chiến bảo hiểm: tái tục hợp đồng (renewal), sửa đổi (endorsement) & proration",
    en: "Enterprise insurance: policy renewal, endorsement & proration testing",
    ja: "実戦・保険：契約更新（リニューアル）・裏書（エンドースメント）と日割り計算のテスト",
  },
  summary: {
    vi: "Bài sâu 14 chương: vòng đời hợp đồng, bất biến continuity & bảo toàn phí, oracle proration độc lập, ca lỗi gap/overlap/idempotency, đối soát billing, CI/CD, AI Agent, phỏng vấn.",
    en: "14-chapter deep dive: policy lifecycle, continuity & premium-conservation invariants, independent proration oracle, gap/overlap/idempotency failure cases, billing reconciliation, CI/CD, AI Agent, interview.",
    ja: "14章にわたる詳細解説：契約ライフサイクル、継続性・保険料保存則の不変条件、独立した日割り計算オラクル、ギャップ・重複・冪等性の異常系、請求突合、CI/CD、AIエージェント、面接対策。",
  },
  pages: buildDoc(pages2),
};

// ============================================================================================
// BÀI 3: Y tế — Đặt lịch khám, EMR, HL7/FHIR, quyền riêng tư PHI/HIPAA, RBAC
// ============================================================================================

const cover3 = makeThumb({ id: "hc-emr-03", domain: "healthcare", kind: "thucchien", label: "実戦 · EMR/PHI" });

const svg3Flow = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#083344"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#cffafe">Luồng đặt lịch &amp; truy cập EMR · Appointment &amp; EMR access flow</text>
<rect x="24" y="56" width="130" height="50" rx="8" fill="#0e7490" stroke="#67e8f9"/>
<text x="89" y="76" font-size="11" fill="#ecfeff" text-anchor="middle">Bệnh nhân đặt lịch</text>
<text x="89" y="92" font-size="9" fill="#cffafe" text-anchor="middle">Patient books slot</text>
<rect x="188" y="56" width="140" height="50" rx="8" fill="#155e75" stroke="#67e8f9"/>
<text x="258" y="76" font-size="11" fill="#ecfeff" text-anchor="middle">Scheduling Service</text>
<text x="258" y="92" font-size="9" fill="#cffafe" text-anchor="middle">Khoá slot, chặn double-book</text>
<rect x="362" y="30" width="150" height="46" rx="8" fill="#0c4a6e" stroke="#7dd3fc"/>
<text x="437" y="50" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">FHIR Gateway</text>
<text x="437" y="65" font-size="9" fill="#e0f2fe" text-anchor="middle">HL7 v2 ↔ FHIR R4 transform</text>
<rect x="362" y="90" width="150" height="46" rx="8" fill="#134e4a" stroke="#5eead4"/>
<text x="437" y="110" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">EMR Service</text>
<text x="437" y="125" font-size="9" fill="#ccfbf1" text-anchor="middle">RBAC theo vai trò (bác sĩ/y tá/lễ tân)</text>
<rect x="548" y="60" width="148" height="50" rx="8" fill="#450a0a" stroke="#f87171"/>
<text x="622" y="80" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="700">Audit Log (WORM)</text>
<text x="622" y="96" font-size="9" fill="#fecaca" text-anchor="middle">Mọi truy cập PHI ghi vết</text>
<g stroke="#67e8f9" stroke-width="2" fill="none" marker-end="url(#arr3)">
<path d="M154 81 H188"/><path d="M328 68 Q 345 50 362 50"/><path d="M328 94 Q 345 112 362 112"/>
<path d="M512 55 Q 530 65 548 75"/><path d="M512 112 Q 530 100 548 92"/>
</g>
<defs><marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#67e8f9"/></marker></defs>
<text x="24" y="190" font-size="10" fill="#a5f3fc">Bất biến: 1 slot bác sĩ chỉ gán 1 bệnh nhân tại 1 thời điểm; RBAC PHI theo nguyên tắc need-to-know; mọi truy cập hồ sơ có audit log không thể sửa/xoá.</text>
<text x="24" y="206" font-size="9" fill="#67e8f9">Invariant: one doctor slot binds to exactly one patient at a time; PHI RBAC follows need-to-know; every record access is logged immutably (WORM).</text>
<text x="24" y="230" font-size="9" fill="#5eead4">Nguồn bên thứ ba: hệ thống bảo hiểm y tế (eligibility check), lab result feed HL7 v2, danh bạ bác sĩ chuyên khoa.</text>
</svg>`;

const svg3Table = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận RBAC truy cập PHI theo vai trò · PHI access RBAC matrix by role</text>
<g font-size="11">
<rect x="24" y="44" width="672" height="26" fill="#1e293b"/>
<text x="34" y="62" fill="#93c5fd" font-weight="700">Vai trò</text>
<text x="184" y="62" fill="#93c5fd" font-weight="700">Xem hồ sơ khám</text>
<text x="324" y="62" fill="#93c5fd" font-weight="700">Xem chẩn đoán tâm thần</text>
<text x="504" y="62" fill="#93c5fd" font-weight="700">Sửa hồ sơ</text>
<text x="624" y="62" fill="#93c5fd" font-weight="700">Xuất dữ liệu</text>
<rect x="24" y="70" width="672" height="26" fill="#0b1220"/>
<text x="34" y="88" fill="#e2e8f0">Bác sĩ điều trị</text><text x="184" y="88" fill="#6ee7b7">Có (bệnh nhân của mình)</text>
<text x="324" y="88" fill="#6ee7b7">Có (break-glass nếu ngoài khoa)</text><text x="504" y="88" fill="#6ee7b7">Có</text><text x="624" y="88" fill="#fde68a">Giới hạn</text>
<rect x="24" y="96" width="672" height="26" fill="#111827"/>
<text x="34" y="114" fill="#e2e8f0">Y tá trực khoa</text><text x="184" y="114" fill="#6ee7b7">Có (khoa mình)</text>
<text x="324" y="114" fill="#f87171">Không</text><text x="504" y="114" fill="#fde68a">Giới hạn (dấu hiệu sinh tồn)</text><text x="624" y="114" fill="#f87171">Không</text>
<rect x="24" y="122" width="672" height="26" fill="#0b1220"/>
<text x="34" y="140" fill="#e2e8f0">Lễ tân đặt lịch</text><text x="184" y="140" fill="#f87171">Không (chỉ metadata lịch)</text>
<text x="324" y="140" fill="#f87171">Không</text><text x="504" y="140" fill="#f87171">Không</text><text x="624" y="140" fill="#f87171">Không</text>
<rect x="24" y="148" width="672" height="26" fill="#111827"/>
<text x="34" y="166" fill="#e2e8f0">Quản trị hệ thống (IT)</text><text x="184" y="166" fill="#f87171">Không (trừ break-glass khẩn cấp)</text>
<text x="324" y="166" fill="#f87171">Không</text><text x="504" y="166" fill="#f87171">Không</text><text x="624" y="166" fill="#fde68a">Có log giám sát riêng</text>
</g>
<text x="24" y="210" font-size="10" fill="#94a3b8">Oracle: mọi truy cập vượt quyền phải bị 403 và ghi audit log 'ACCESS_DENIED'; break-glass phải có lý do bắt buộc và cảnh báo tức thời cho DPO.</text>
<text x="24" y="226" font-size="10" fill="#94a3b8">Oracle: every unauthorized access attempt must return 403 and log 'ACCESS_DENIED'; break-glass access requires a mandatory reason and instant DPO alert.</text>
</svg>`;

const pages3 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Chuỗi phòng khám đa khoa giả định MedCare vận hành 24 cơ sở, phục vụ trung bình 7.500 lượt khám mỗi ngày, với hệ thống Đặt lịch & Hồ sơ điện tử (Appointment & EMR Platform) là xương sống nghiệp vụ kết nối bệnh nhân, bác sĩ, và dữ liệu lâm sàng. Hệ thống phải tuân thủ chuẩn trao đổi dữ liệu y tế HL7 v2 (giao tiếp với hệ thống xét nghiệm cũ) và FHIR R4 (giao tiếp với ứng dụng di động mới, cổng bảo hiểm y tế), đồng thời tuân thủ nguyên tắc bảo vệ Thông tin sức khỏe được bảo vệ (PHI - Protected Health Information) tương đương chuẩn HIPAA dù hoạt động tại Việt Nam, theo cam kết với đối tác bảo hiểm quốc tế.",
        "The hypothetical multi-specialty clinic chain MedCare operates 24 facilities, serving an average of 7,500 visits per day, with the Appointment & EMR Platform as the business backbone connecting patients, doctors, and clinical data. The system must comply with the HL7 v2 healthcare data exchange standard (interfacing with legacy lab systems) and FHIR R4 (interfacing with the new mobile app and insurance portal), while also following Protected Health Information (PHI) protection principles equivalent to HIPAA even though operating in Vietnam, per commitments to international insurance partners.",
        "架空の総合診療クリニックチェーンMedCareは24拠点を運営し、1日平均7,500件の受診に対応しています。予約・電子カルテプラットフォーム（Appointment & EMR Platform）は、患者・医師・臨床データを結ぶ業務の中核です。このシステムは、レガシーな検査システムと連携するHL7 v2ヘルスケアデータ交換規格と、新しいモバイルアプリや保険ポータルと連携するFHIR R4に準拠しなければなりません。同時に、ベトナムで運営されているにもかかわらず、国際保険パートナーとの契約に基づき、HIPAAに相当する保護対象保健情報（PHI: Protected Health Information）の保護原則にも従う必要があります。"
      ),
      P(
        "Phạm vi kiểm thử bài này gồm: (1) module đặt lịch khám với ràng buộc không double-booking (một bác sĩ không thể có 2 lịch trùng giờ), (2) module truy cập EMR theo phân quyền RBAC dựa trên vai trò và nguyên tắc need-to-know, và (3) tầng audit log ghi vết mọi truy cập PHI phục vụ thanh tra tuân thủ. Ràng buộc nghiêm ngặt: dữ liệu bệnh nhân của các khoa nhạy cảm (tâm thần, HIV) phải cô lập thêm một lớp phân quyền bổ sung ngoài RBAC thông thường, và tính năng 'break-glass' (truy cập khẩn cấp vượt quyền) phải luôn có lý do bắt buộc kèm cảnh báo tức thời.",
        "This piece's testing scope includes: (1) the appointment scheduling module with the no-double-booking constraint (one doctor cannot have two overlapping slots), (2) the EMR access module governed by role-based RBAC and the need-to-know principle, and (3) the audit-log layer recording every PHI access for compliance audits. Strict constraint: patient data for sensitive departments (psychiatry, HIV) must have an additional isolation layer beyond ordinary RBAC, and the 'break-glass' feature (emergency access overriding permissions) must always require a mandatory reason plus instant alerting.",
        "本稿のテスト範囲は次の通りです。（1）ダブルブッキング禁止制約（1人の医師は同時刻に2つの重複した予約枠を持てない）を備えた予約スケジューリングモジュール、（2）役割ベースのRBACとneed-to-know原則により管理される電子カルテアクセスモジュール、（3）コンプライアンス監査のためにすべてのPHIアクセスを記録する監査ログ層です。厳格な制約として、機密性の高い診療科（精神科、HIV）の患者データは通常のRBACに加えて追加の隔離層を持たなければならず、「ブレークグラス」機能（権限を超える緊急アクセス）は常に必須の理由と即時の警告を伴わなければなりません。"
      ),
      IMG(svg3Flow, "Luồng đặt lịch và truy cập EMR qua FHIR Gateway", "Appointment and EMR access flow through the FHIR Gateway", "FHIRゲートウェイを介した予約とEMRアクセスのフロー"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API đặt lịch khám & kiểm tra double-booking", "API truy cập EMR theo RBAC + break-glass", "Kiểm tra transform HL7 v2 ↔ FHIR R4", "Audit log cho mọi thao tác đọc/ghi PHI", "Luồng E2E: bệnh nhân đặt lịch → bác sĩ xem hồ sơ → ghi chẩn đoán"],
        ["Appointment booking API & double-booking check", "EMR access API with RBAC + break-glass", "HL7 v2 ↔ FHIR R4 transform verification", "Audit log for every PHI read/write operation", "E2E flow: patient books → doctor views record → records diagnosis"],
        ["予約スケジューリングAPIとダブルブッキングチェック", "RBAC＋ブレークグラス機能を伴うEMRアクセスAPI", "HL7 v2⇔FHIR R4変換の検証", "すべてのPHI読み書き操作に対する監査ログ", "E2Eフロー：患者が予約→医師がカルテを閲覧→診断を記録"]
      ),
      NOTE(
        "FHIR R4 dùng cấu trúc Resource (Patient, Appointment, Observation...) trong khi HL7 v2 dùng message dạng segment phân cách bằng ký tự pipe — engine transform là điểm dễ phát sinh lỗi mapping trường dữ liệu nhất trong toàn hệ thống.",
        "FHIR R4 uses a Resource structure (Patient, Appointment, Observation...) while HL7 v2 uses pipe-delimited segment messages — the transform engine is the most error-prone point for field-mapping bugs in the whole system.",
        "FHIR R4はリソース構造（Patient、Appointment、Observationなど）を使用する一方、HL7 v2はパイプ区切りのセグメントメッセージを使用します。変換エンジンは、システム全体の中でフィールドマッピングのバグが最も発生しやすい箇所です。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm Scheduling Service quản lý slot bác sĩ với khoá pessimistic ở tầng database để chặn double-booking khi nhiều bệnh nhân cùng chọn 1 khung giờ, FHIR Gateway làm tầng chuyển đổi giữa hệ thống xét nghiệm cũ (HL7 v2 qua MLLP) và các client mới (FHIR R4 qua REST), và EMR Service áp RBAC theo policy engine riêng (không hard-code trong controller) để dễ audit và thay đổi quy tắc phân quyền. Giao tiếp giữa Scheduling và EMR là đồng bộ vì bác sĩ cần thấy lịch sử khám ngay khi mở ca khám, còn đồng bộ dữ liệu xét nghiệm từ lab về EMR chạy bất đồng bộ qua hàng đợi với retry có backoff.",
        "The architecture includes a Scheduling Service managing doctor slots with a pessimistic database-level lock to prevent double-booking when multiple patients pick the same time slot, an FHIR Gateway acting as the transform layer between legacy lab systems (HL7 v2 over MLLP) and new clients (FHIR R4 over REST), and an EMR Service applying RBAC through a dedicated policy engine (not hard-coded in controllers) for easier auditing and rule changes. Scheduling-to-EMR communication is synchronous since a doctor needs to see visit history the instant a consultation opens, while lab-result synchronization into EMR runs asynchronously over a queue with backoff retry.",
        "アーキテクチャには、複数の患者が同じ時間枠を選択した際のダブルブッキングを防ぐためデータベースレベルの悲観的ロックで医師の予約枠を管理するScheduling Service、レガシーな検査システム（MLLP経由のHL7 v2）と新しいクライアント（REST経由のFHIR R4）の間の変換層として機能するFHIR Gateway、そして監査やルール変更を容易にするため専用のポリシーエンジン（コントローラーへのハードコードではない）を通じてRBACを適用するEMR Serviceが含まれます。診察開始時に医師が即座に受診履歴を見る必要があるため、SchedulingとEMR間の通信は同期式です。一方、検査結果のEMRへの同期は、バックオフ付きリトライを伴うキューを介して非同期で実行されます。"
      ),
      IMG(svg3Table, "Ma trận RBAC minh hoạ nguyên tắc need-to-know theo vai trò", "RBAC matrix illustrating the need-to-know principle by role", "役割ごとのneed-to-know原則を示すRBACマトリクス"),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストの難所"),
      UL(
        ["Double-booking chỉ lộ ra khi test đồng thời thật (concurrency), test tuần tự không bắt được", "Transform HL7↔FHIR có thể mất/méo trường dữ liệu khi mapping code hệ thống khác biệt", "Break-glass cần test cả trường hợp lạm dụng (nhiều lần truy cập bất thường) để cảnh báo sớm"],
        ["Double-booking only surfaces under real concurrency testing, not sequential testing", "HL7↔FHIR transform can lose/distort fields when code systems differ in mapping", "Break-glass needs testing for abuse patterns too (repeated unusual access) for early alerting"],
        ["ダブルブッキングは実際の並行テストでのみ表面化し、逐次テストでは検出できない", "HL7⇔FHIR変換は、コード体系のマッピングが異なる場合にフィールドが失われたり歪んだりする可能性がある", "ブレークグラスは早期警告のため、乱用パターン（異常な繰り返しアクセス）のテストも必要"]
      ),
      TIP(
        "Dùng k6 hoặc Playwright request context để gửi N request đặt cùng 1 slot thật sự đồng thời (Promise.all), không phải tuần tự — đây là cách duy nhất bắt được race condition double-booking.",
        "Use k6 or Playwright's request context to send N booking requests for the same slot truly concurrently (Promise.all), not sequentially — this is the only way to catch the double-booking race condition.",
        "同一枠に対するN件の予約リクエストを、逐次ではなく本当に並行して（Promise.all）送信するためにk6やPlaywrightのrequestコンテキストを使用してください。これがダブルブッキングの競合状態を検出する唯一の方法です。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể trung tâm gồm Appointment (gắn duy nhất 1 DoctorSlot và 1 Patient), EMRRecord (gắn 1 Patient, nhiều Encounter theo thời gian), và AccessAuditLog ghi mọi lượt đọc/ghi PHI kèm actorId, resourceId, action, timestamp, và lý do nếu là break-glass. Bất biến quan trọng nhất là DoctorSlot chỉ được gán cho đúng 1 Appointment tại một thời điểm — vi phạm bất biến này nghĩa là double-booking, gây hậu quả vận hành nghiêm trọng (bác sĩ phải từ chối khám 1 trong 2 bệnh nhân đã xác nhận lịch).",
        "Central entities include Appointment (bound to exactly one DoctorSlot and one Patient), EMRRecord (bound to one Patient, with many Encounters over time), and AccessAuditLog recording every PHI read/write with actorId, resourceId, action, timestamp, and a reason if it's break-glass. The most important invariant is that a DoctorSlot may be assigned to exactly one Appointment at any time — violating this invariant means double-booking, causing a serious operational consequence (the doctor must turn away one of two patients who both confirmed the slot).",
        "中心となるエンティティには、正確に1つのDoctorSlotと1人のPatientに紐づくAppointment、1人のPatientに紐づき時系列で複数のEncounterを持つEMRRecord、そしてactorId、resourceId、action、timestamp、ブレークグラスの場合は理由を伴うすべてのPHI読み書きを記録するAccessAuditLogが含まれます。最も重要な不変条件は、DoctorSlotがある時点でちょうど1つのAppointmentにのみ割り当てられることです。この不変条件に違反することはダブルブッキングを意味し、深刻な業務上の結果（医師が予約確定済みの2人の患者のうち1人を診察拒否せざるを得ない）を招きます。"
      ),
      H("Bất biến nghiệp vụ (oracle) bắt buộc", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "1 DoctorSlot ⇔ tối đa 1 Appointment active tại 1 thời điểm — không double-booking dưới mọi mức đồng thời",
          "Mọi truy cập PHI (đọc/ghi) đều phải có bản ghi AccessAuditLog tương ứng, không thể sửa/xoá (append-only/WORM)",
          "RBAC theo need-to-know: vai trò không liên quan trực tiếp điều trị bệnh nhân (lễ tân, IT) không được xem nội dung lâm sàng",
          "Dữ liệu khoa nhạy cảm (tâm thần, HIV) có policy phân quyền bổ sung, mặc định ẩn khỏi bác sĩ ngoài khoa trừ khi break-glass",
          "Break-glass luôn yêu cầu lý do bắt buộc (không rỗng) và kích hoạt cảnh báo tức thời cho DPO (Data Protection Officer)",
        ],
        [
          "One DoctorSlot ⇔ at most one active Appointment at a time — no double-booking under any concurrency level",
          "Every PHI access (read/write) must have a corresponding AccessAuditLog entry, non-editable/non-deletable (append-only/WORM)",
          "RBAC by need-to-know: roles not directly involved in patient care (front desk, IT) must not view clinical content",
          "Sensitive-department data (psychiatry, HIV) carries an additional access policy, hidden by default from doctors outside the department unless break-glass",
          "Break-glass always requires a mandatory non-empty reason and triggers an instant alert to the DPO (Data Protection Officer)",
        ],
        [
          "1つのDoctorSlot⇔ある時点で有効なAppointmentは最大1件まで――いかなる並行レベルでもダブルブッキングは発生しない",
          "すべてのPHIアクセス（読み書き）には対応するAccessAuditLogエントリが必要であり、編集・削除不可（追記専用／WORM）でなければならない",
          "need-to-knowによるRBAC：患者ケアに直接関与しない役割（受付、IT）は臨床内容を閲覧できない",
          "機密性の高い診療科（精神科、HIV）のデータには追加のアクセスポリシーがあり、ブレークグラスでない限り、科外の医師にはデフォルトで非表示となる",
          "ブレークグラスは常に必須の空でない理由を要求し、DPO（データ保護責任者）への即時警告をトリガーする",
        ]
      ),
      WARN(
        "Không bao giờ log toàn bộ nội dung PHI (chẩn đoán, kết quả xét nghiệm) vào AccessAuditLog — chỉ log metadata truy cập (ai, khi nào, resource nào, hành động gì); log chứa PHI thô lại tạo thêm một bề mặt rò rỉ dữ liệu mới.",
        "Never log the full PHI content (diagnosis, lab results) into the AccessAuditLog — log only access metadata (who, when, which resource, what action); a log containing raw PHI creates a new data-leak surface.",
        "AccessAuditLogにPHIの全内容（診断、検査結果）を記録してはいけません。アクセスのメタデータ（誰が、いつ、どのリソースに、どんな操作を）のみを記録してください。生のPHIを含むログは、新たなデータ漏洩の経路を生み出してしまいます。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro nghiêm trọng nhất là rò rỉ PHI do lỗi RBAC — theo phân tích nội bộ ngành y tế, một lỗi phân quyền lộ hồ sơ khoa tâm thần hoặc HIV cho nhân viên không liên quan có thể dẫn tới hậu quả pháp lý và mất niềm tin bệnh nhân nghiêm trọng hơn nhiều so với thiệt hại tài chính trực tiếp. Rủi ro thứ hai là double-booking gây gián đoạn vận hành, ước tính mỗi ca double-booking tốn trung bình 25 phút xử lý lại lịch và ảnh hưởng trải nghiệm 2 bệnh nhân cùng lúc. Rủi ro thứ ba là lỗi mapping HL7↔FHIR khiến kết quả xét nghiệm gán sai bệnh nhân hoặc sai đơn vị đo, có thể ảnh hưởng trực tiếp quyết định lâm sàng của bác sĩ.",
        "The most severe risk is PHI leakage due to RBAC bugs — internal healthcare-industry analysis notes that an access-control bug exposing psychiatric or HIV records to unrelated staff can cause legal consequences and loss of patient trust far more serious than direct financial damage. The second risk is double-booking disrupting operations, estimated to cost an average 25 minutes of rescheduling per incident and affecting two patients' experience simultaneously. The third risk is HL7↔FHIR mapping bugs causing lab results to be attributed to the wrong patient or wrong measurement unit, which can directly affect a doctor's clinical decision.",
        "最も深刻なリスクは、RBACのバグによるPHI漏洩です。医療業界の社内分析によると、精神科やHIVの記録が無関係な職員に露出するアクセス制御バグは、直接的な金銭的損害よりもはるかに深刻な法的影響と患者の信頼喪失を引き起こす可能性があります。第二のリスクは業務を混乱させるダブルブッキングで、1件のインシデントあたり平均25分の再スケジュール作業を要し、同時に2人の患者の体験に影響を与えると推定されています。第三のリスクはHL7⇔FHIRのマッピングバグで、検査結果が誤った患者や誤った測定単位に紐づけられてしまい、医師の臨床判断に直接影響を及ぼす可能性があります。"
      ),
      H("Chiến lược kiểm thử theo kim tự tháp", "Test strategy pyramid", "テスト戦略ピラミッド"),
      UL(
        ["55% unit/contract test cho RBAC policy engine và HL7↔FHIR mapping", "30% integration/concurrency test cho double-booking và luồng EMR", "15% E2E Playwright cho hành trình đặt lịch và xem hồ sơ thật trên UI"],
        ["55% unit/contract tests for the RBAC policy engine and HL7↔FHIR mapping", "30% integration/concurrency tests for double-booking and the EMR flow", "15% E2E Playwright for the real booking and record-viewing journey on the UI"],
        ["55%はRBACポリシーエンジンとHL7⇔FHIRマッピングのユニット・契約テスト", "30%はダブルブッキングとEMRフローの統合・並行性テスト", "15%はUI上での実際の予約・カルテ閲覧ジャーニーのE2E Playwrightテスト"]
      ),
      SCEN(
        "Kịch bản rủi ro thực tế",
        "Real-world risk scenario",
        "Một bản cập nhật RBAC policy vô tình cấp quyền xem 'clinical_notes' cho vai trò lễ tân do sai cấu hình nhóm quyền kế thừa (role inheritance), khiến 40 lễ tân tại 24 cơ sở có thể xem chẩn đoán chi tiết trong 6 giờ trước khi bị phát hiện qua audit log bất thường. Đội bảo mật phải báo cáo sự cố PHI breach theo quy trình tuân thủ nội bộ dù chưa ghi nhận truy cập trái phép thực tế nào.",
        "An RBAC policy update accidentally granted 'clinical_notes' view permission to the front-desk role due to a misconfigured role-inheritance group, letting 40 receptionists across 24 facilities potentially view detailed diagnoses for 6 hours before detection via anomalous audit logs. The security team had to report a PHI breach incident per internal compliance procedure even though no actual unauthorized access had been recorded yet.",
        "面接シナリオ本文（日本語）",
        "RBACポリシーの更新で、ロール継承グループの設定ミスにより誤って受付ロールに「clinical_notes」の閲覧権限が付与されてしまい、24拠点の受付職員40名が、異常な監査ログで発見されるまでの6時間、詳細な診断内容を閲覧できる状態になっていました。実際の不正アクセスはまだ記録されていなかったものの、セキュリティチームは社内のコンプライアンス手順に従いPHI侵害インシデントを報告しなければなりませんでした。"
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định scope kiểm thử Appointment & EMR Platform v4.0 trước khi triển khai module break-glass mới, không bao gồm hệ thống thanh toán viện phí đã kiểm thử riêng. Entry criteria: môi trường staging có FHIR sandbox và mock HL7 v2 sẵn sàng, 200 hồ sơ bệnh nhân mẫu phủ đủ các khoa nhạy cảm. Exit criteria: 100% ca P1 (double-booking, RBAC leak, break-glass không log) pass, 0 lỗ hổng bảo mật Critical/High mở, transform HL7↔FHIR khớp 100% trên bộ dữ liệu mẫu 500 message.",
        "The Test Plan scopes testing the Appointment & EMR Platform v4.0 ahead of rolling out the new break-glass module, excluding the hospital billing system tested separately. Entry criteria: staging has FHIR sandbox and mock HL7 v2 ready, 200 sample patient records covering all sensitive departments. Exit criteria: 100% of P1 cases (double-booking, RBAC leak, unlogged break-glass) pass, zero open Critical/High security vulnerabilities, HL7↔FHIR transform matches 100% on a 500-message sample dataset.",
        "テスト計画では、新しいブレークグラスモジュール展開前のAppointment & EMR Platform v4.0のテスト範囲を定義します。別途テスト済みの病院請求システムは対象外です。開始基準：ステージング環境にFHIRサンドボックスとモックHL7 v2が準備できていること、すべての機密診療科をカバーする患者サンプルレコード200件。終了基準：P1ケース（ダブルブッキング、RBAC漏洩、未記録ブレークグラス）100%合格、Critical/Highセキュリティ脆弱性未解決ゼロ、500メッセージのサンプルデータセットでHL7⇔FHIR変換が100%一致すること。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: sở hữu ma trận RBAC và ca double-booking", "Security Engineer: pentest RBAC boundary + review audit log", "Clinical liaison: xác nhận đúng luồng nghiệp vụ khoa nhạy cảm", "Interoperability Engineer: xác nhận mapping HL7↔FHIR đúng chuẩn"],
        ["QA Lead: owns the RBAC matrix and double-booking cases", "Security Engineer: pentests RBAC boundaries + reviews audit logs", "Clinical liaison: confirms correct workflow for sensitive departments", "Interoperability Engineer: confirms HL7↔FHIR mapping conforms to standard"],
        ["QAリード：RBACマトリクスとダブルブッキングケースを管理", "セキュリティエンジニア：RBAC境界のペネトレーションテストと監査ログレビュー", "臨床連絡担当：機密診療科の業務フローが正しいことを確認", "相互運用性エンジニア：HL7⇔FHIRマッピングが規格に準拠していることを確認"]
      ),
      NOTE(
        "KPI theo dõi: số ca double-booking phát hiện/tháng (mục tiêu 0), tỉ lệ truy cập PHI có audit log đầy đủ (mục tiêu 100%), thời gian phản hồi cảnh báo break-glass bất thường (<5 phút).",
        "Tracked KPIs: double-bookings detected per month (target 0), rate of PHI accesses with complete audit logs (target 100%), response time for anomalous break-glass alerts (<5 minutes).",
        "監視するKPI：月間検出ダブルブッキング件数（目標0）、完全な監査ログを伴うPHIアクセスの割合（目標100%）、異常なブレークグラス警告への対応時間（5分未満）。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử (decision table)", en: "6. Test case design matrix (decision table)", ja: "6. テストケース設計マトリクス（決定表）" },
    blocks: [
      P(
        "Ma trận ca RBAC được thiết kế theo decision table với 2 chiều chính: vai trò (bác sĩ điều trị, y tá trực khoa, lễ tân, quản trị IT, bác sĩ ngoài khoa) và loại tài nguyên (lịch hẹn metadata, hồ sơ khám thường, chẩn đoán khoa nhạy cảm, quyền sửa/xoá). Song song, ma trận double-booking phủ các mức đồng thời (2, 10, 50 request cùng slot) và các trạng thái slot (trống, đã giữ tạm 5 phút, đã xác nhận, đã huỷ) để đảm bảo khoá pessimistic hoạt động đúng ở mọi ngưỡng tải.",
        "The RBAC case matrix is designed as a decision table with two main dimensions: role (treating doctor, ward nurse, front desk, IT admin, doctor outside the department) and resource type (appointment metadata, routine visit record, sensitive-department diagnosis, edit/delete permission). In parallel, the double-booking matrix covers concurrency levels (2, 10, 50 requests for the same slot) and slot states (free, held 5 minutes, confirmed, cancelled) to ensure the pessimistic lock works correctly at every load threshold.",
        "RBACケース表は、役割（担当医師、病棟看護師、受付、IT管理者、科外の医師）とリソース種別（予約メタデータ、通常の受診記録、機密診療科の診断、編集・削除権限）という2つの主要な軸を持つ決定表として設計されています。並行して、ダブルブッキングのマトリクスは、並行レベル（同一枠に対する2件、10件、50件のリクエスト）とスロットの状態（空き、5分間の仮押さえ、確定、キャンセル）をカバーし、悲観的ロックがあらゆる負荷閾値で正しく機能することを保証します。"
      ),
      IMG(svg3Table, "Ma trận RBAC 4 vai trò × 4 loại thao tác trên PHI", "RBAC matrix of 4 roles × 4 PHI operation types", "4つの役割×4つのPHI操作種別のRBACマトリクス"),
      H("Nhóm ca theo mức ưu tiên", "Case groups by priority", "優先度別のケースグループ"),
      UL(
        ["P1: double-booking ở mọi mức đồng thời, RBAC leak khoa nhạy cảm, break-glass thiếu lý do", "P2: transform HL7↔FHIR mapping trường dữ liệu, giữ slot tạm hết hạn, audit log tính toàn vẹn", "P3: đặt lịch thông thường (happy path), hiệu năng tìm bác sĩ trống lịch"],
        ["P1: double-booking at every concurrency level, sensitive-department RBAC leak, break-glass missing reason", "P2: HL7↔FHIR field mapping transform, expired temporary slot hold, audit log integrity", "P3: routine booking (happy path), performance of finding available doctors"],
        ["P1：あらゆる並行レベルでのダブルブッキング、機密診療科のRBAC漏洩、理由のないブレークグラス", "P2：HL7⇔FHIRフィールドマッピング変換、仮押さえ枠の期限切れ、監査ログの完全性", "P3：通常の予約（ハッピーパス）、空き医師検索の性能"]
      ),
      TIP(
        "Đặt tên ca theo mẫu RBAC_<role>_<resource>_<expected> (ví dụ RBAC_FRONTDESK_PSYCH_DENY) để tự động sinh báo cáo tuân thủ theo từng vai trò khi thanh tra yêu cầu.",
        "Name cases as RBAC_<role>_<resource>_<expected> (e.g. RBAC_FRONTDESK_PSYCH_DENY) to auto-generate per-role compliance reports when auditors request them.",
        "監査人からの要求時に役割ごとのコンプライアンスレポートを自動生成できるよう、ケース名はRBAC_<role>_<resource>_<expected>（例：RBAC_FRONTDESK_PSYCH_DENY）の形式で命名してください。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường (mock bên thứ ba)", en: "7. Data & environment setup (third-party mocking)", ja: "7. データ・環境準備（サードパーティのモック化）" },
    blocks: [
      P(
        "Vì hệ thống xét nghiệm cũ gửi message HL7 v2 qua giao thức MLLP không thể chạy thật trong CI, môi trường test dùng một MLLP mock server phát lại các message mẫu (ADT, ORU) đã được ẩn danh hoá hoàn toàn (không dùng dữ liệu bệnh nhân thật dưới bất kỳ hình thức nào). Dữ liệu bệnh nhân test được sinh tổng hợp (synthetic) bằng công cụ tạo hồ sơ giả lập tuân thủ định dạng FHIR nhưng không map tới bất kỳ cá nhân thật nào, và API test-only `/test/reset-schedule` giúp dọn sạch toàn bộ slot bác sĩ giữa các lần chạy concurrency test.",
        "Since the legacy lab system sends HL7 v2 messages over MLLP that cannot run live in CI, the test environment uses an MLLP mock server replaying sample messages (ADT, ORU) that are fully de-identified (real patient data is never used in any form). Test patient data is synthetically generated using a mock-record tool conforming to FHIR format but mapping to no real individual, and a test-only `/test/reset-schedule` API clears all doctor slots between concurrency test runs.",
        "レガシーな検査システムはMLLPプロトコル経由でHL7 v2メッセージを送信し、CIで実際に稼働させることができないため、テスト環境では完全に匿名化されたサンプルメッセージ（ADT、ORU）を再生するMLLPモックサーバーを使用します（いかなる形でも実際の患者データは使用しません）。テスト用の患者データは、FHIR形式に準拠するが実在の個人には一切対応しないモックレコード生成ツールで合成的に生成され、テスト専用API `/test/reset-schedule` は並行性テストの実行間ですべての医師スロットをクリアします。"
      ),
      CODE(
        "yaml",
        "# docker-compose.test.yml — môi trường mock cho EMR Platform\nservices:\n  mllp-mock:\n    image: medcare/mllp-simulator:1.2\n    ports: [\"2575:2575\"]\n    volumes:\n      - ./mocks/hl7-messages:/messages\n    environment:\n      REPLAY_MODE: synthetic-only\n  fhir-sandbox:\n    image: hapiproject/hapi:v7.0.0\n    ports: [\"8082:8080\"]\n    environment:\n      hapi.fhir.default_encoding: json\n  emr-api:\n    image: medcare/emr-platform:staging\n    environment:\n      HL7_MLLP_HOST: mllp-mock\n      FHIR_SERVER_URL: http://fhir-sandbox:8080/fhir\n      RBAC_POLICY_SOURCE: staging-policy-v4\n    ports: [\"3000:3000\"]"
      ),
      WARN(
        "Tuyệt đối không dùng bản sao dữ liệu production (dù đã che một phần) làm dữ liệu test — chuẩn PHI yêu cầu ẩn danh hoá hoàn toàn hoặc dùng dữ liệu tổng hợp, che một phần vẫn có thể suy luận ngược danh tính.",
        "Never use a copy of production data (even partially masked) as test data — PHI standards require full de-identification or fully synthetic data; partial masking can still allow re-identification.",
        "本番データのコピー（一部マスクされていても）をテストデータとして使用することは絶対にしないでください。PHI基準では完全な匿名化または完全な合成データが要求されます。一部マスクでは、依然として個人を再特定できる可能性があります。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright cho luồng bệnh nhân đặt lịch qua ứng dụng web, theo Page Object cho form chọn khoa/bác sĩ/khung giờ, kết hợp gọi API kiểm tra trạng thái backend để xác nhận Appointment được tạo đúng và DoctorSlot chuyển trạng thái CONFIRMED. Test RBAC happy path dùng nhiều fixture context Playwright ứng với từng vai trò (bác sĩ, y tá, lễ tân) để verify mỗi vai trò thấy đúng những gì được phép, không hơn không kém.",
        "Happy-path automation uses Playwright for the patient booking flow via the web app, following a Page Object for the department/doctor/time-slot selection form, combined with backend status API calls to confirm the Appointment is created correctly and the DoctorSlot transitions to CONFIRMED. RBAC happy-path testing uses multiple Playwright fixture contexts per role (doctor, nurse, front desk) to verify each role sees exactly what it's permitted to, no more, no less.",
        "ハッピーパス自動化では、診療科・医師・時間枠選択フォームに対するPage Objectに従い、Webアプリを介した患者予約フローにPlaywrightを使用し、バックエンドのステータスAPI呼び出しと組み合わせて、Appointmentが正しく作成されDoctorSlotがCONFIRMED状態に遷移することを確認します。RBACハッピーパステストでは、各役割（医師、看護師、受付）に対応する複数のPlaywrightフィクスチャコンテキストを使用し、各役割が許可された範囲を過不足なく閲覧できることを検証します。"
      ),
      CODE(
        "typescript",
        "// booking-happy-path.spec.ts\nimport { test, expect } from '@playwright/test';\nimport { BookingPage } from './pages/booking-page';\n\ntest('patient books an available slot and it becomes CONFIRMED', async ({ page, request }) => {\n  const booking = new BookingPage(page);\n  await booking.goto();\n  await booking.selectDepartment('Cardiology');\n  await booking.selectDoctor('Dr. Nguyen');\n  await booking.selectSlot('2026-07-10T09:00');\n  await booking.confirm();\n\n  const appt = await booking.getConfirmation();\n  expect(appt.status).toBe('CONFIRMED');\n\n  const slotCheck = await request.get(`/api/slots/${appt.slotId}`);\n  const slotBody = await slotCheck.json();\n  expect(slotBody.status).toBe('CONFIRMED');\n  expect(slotBody.appointmentId).toBe(appt.id);\n});"
      ),
      CODE(
        "typescript",
        "// rbac-role-fixtures.spec.ts — kiểm tra RBAC theo từng vai trò\nimport { test, expect } from './fixtures/role-fixtures'; // fixture tự inject context theo role\n\ntest('front desk cannot view clinical notes, only appointment metadata', async ({ frontDeskRequest }) => {\n  const res = await frontDeskRequest.get('/api/patients/PT-5521/clinical-notes');\n  expect(res.status()).toBe(403);\n  const meta = await frontDeskRequest.get('/api/patients/PT-5521/appointments');\n  expect(meta.status()).toBe(200);\n});"
      ),
      TIP(
        "Xây fixture Playwright riêng cho mỗi vai trò (ví dụ `frontDeskRequest`, `doctorRequest`) tự động login và giữ token theo role — giúp test RBAC đọc như tài liệu đặc tả, không lẫn lộn logic xác thực trong từng test case.",
        "Build a dedicated Playwright fixture per role (e.g. `frontDeskRequest`, `doctorRequest`) that auto-logs in and holds a role-scoped token — this makes RBAC tests read like a spec document, without tangling auth logic into every test case.",
        "各役割専用のPlaywrightフィクスチャ（例：`frontDeskRequest`、`doctorRequest`）を構築し、自動ログインと役割スコープのトークン保持を行わせてください。これにより、認証ロジックを各テストケースに絡めることなく、RBACテストが仕様書のように読みやすくなります。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi chuyên sâu tập trung vào: race condition double-booking khi nhiều request đặt cùng slot thực sự đồng thời, rò rỉ PHI qua lỗi cấu hình RBAC kế thừa quyền sai, break-glass không kích hoạt cảnh báo, và lỗi mapping HL7↔FHIR làm mất trường dữ liệu quan trọng (đơn vị đo xét nghiệm). Đây đều là các chủ đề gây thiệt hại lớn nhất nếu lọt qua production trong ngành y tế.",
        "Deep failure cases focus on: double-booking race conditions when multiple requests for the same slot arrive truly concurrently, PHI leakage from misconfigured RBAC role inheritance, break-glass not triggering an alert, and HL7↔FHIR mapping bugs losing an important field (lab measurement unit). These are the topics causing the most damage if they slip into production in healthcare.",
        "高度な異常系は次に焦点を当てます。同一枠に対する複数のリクエストが本当に並行して到着した際のダブルブッキング競合状態、誤って設定されたRBACロール継承によるPHI漏洩、警告をトリガーしないブレークグラス、そして重要なフィールド（検査測定単位）を失うHL7⇔FHIRマッピングバグです。これらはいずれも、医療分野で本番環境に混入した場合に最も大きな損害をもたらすテーマです。"
      ),
      CODE(
        "typescript",
        "// double-booking-race.spec.ts\ntest('50 concurrent bookings for the same slot must yield exactly one CONFIRMED', async ({ request }) => {\n  const slotId = await createFreeSlot(request, { doctorId: 'DR-001', start: '2026-08-01T10:00' });\n  const attempts = Array.from({ length: 50 }, () =>\n    request.post('/api/appointments', { data: { slotId, patientId: crypto.randomUUID() } })\n  );\n  const results = await Promise.all(attempts);\n  const bodies = await Promise.all(results.map((r) => r.json()));\n  const confirmed = bodies.filter((b) => b.status === 'CONFIRMED');\n  expect(confirmed.length).toBe(1); // đúng 1 request thắng khoá pessimistic\n  const rejected = bodies.filter((b) => b.status === 'SLOT_UNAVAILABLE');\n  expect(rejected.length).toBe(49);\n});"
      ),
      CODE(
        "typescript",
        "// rbac-inheritance-leak.spec.ts — bắt lỗi cấu hình kế thừa quyền sai\ntest('front desk role must never inherit clinical_notes permission via group misconfig', async ({ request }) => {\n  const policy = await request.get('/api/rbac/effective-permissions?role=FRONT_DESK');\n  const body = await policy.json();\n  expect(body.permissions).not.toContain('clinical_notes:read');\n  expect(body.permissions).not.toContain('diagnosis:read');\n});"
      ),
      CODE(
        "typescript",
        "// break-glass-alert.spec.ts\ntest('break-glass access without reason must be rejected and never silently allowed', async ({ doctorRequest }) => {\n  const res = await doctorRequest.post('/api/emr/break-glass', {\n    data: { patientId: 'PT-9012', department: 'PSYCHIATRY', reason: '' },\n  });\n  expect(res.status()).toBe(400);\n});\n\ntest('valid break-glass access triggers instant DPO alert', async ({ doctorRequest, dpoAlertMock }) => {\n  await doctorRequest.post('/api/emr/break-glass', {\n    data: { patientId: 'PT-9012', department: 'PSYCHIATRY', reason: 'Emergency consult - patient unconscious' },\n  });\n  await expect(dpoAlertMock).toHaveReceivedAlert({ patientId: 'PT-9012', type: 'BREAK_GLASS_ACCESS' });\n});"
      ),
      CODE(
        "typescript",
        "// hl7-fhir-unit-mapping.spec.ts\ntest('lab result unit is preserved exactly when transforming HL7 v2 ORU to FHIR Observation', async () => {\n  const hl7Message = loadSampleMessage('ORU_glucose_mmol.hl7');\n  const fhirObservation = await transformHl7ToFhir(hl7Message);\n  expect(fhirObservation.valueQuantity.unit).toBe('mmol/L');\n  expect(fhirObservation.valueQuantity.value).toBeCloseTo(5.4, 1);\n  expect(fhirObservation.subject.reference).toBe('Patient/PT-9012'); // đúng bệnh nhân, không lẫn\n});"
      ),
      WARN(
        "Nếu test double-booking chạy tuần tự (await từng request một), bug race condition sẽ KHÔNG bao giờ lộ ra — luôn dùng Promise.all hoặc công cụ tải thực sự đồng thời như k6 để mô phỏng đúng tải thực tế giờ cao điểm.",
        "If double-booking tests run sequentially (awaiting each request one by one), the race-condition bug will NEVER surface — always use Promise.all or a truly concurrent load tool like k6 to simulate real peak-hour load.",
        "ダブルブッキングテストを逐次実行（1件ずつリクエストをawait）すると、競合状態のバグは決して表面化しません。実際のピーク時の負荷を正しくシミュレートするため、常にPromise.allまたはk6のような真に並行した負荷ツールを使用してください。"
      ),
    ],
  },
  {
    heading: { vi: "10. Nghiệp vụ nền/hậu kiểm: audit & đối soát truy cập", en: "10. Back-office: access audit & reconciliation", ja: "10. バックオフィス：アクセス監査と突合" },
    blocks: [
      P(
        "Job hậu kiểm hàng ngày quét toàn bộ AccessAuditLog để phát hiện mẫu hình bất thường: một tài khoản truy cập quá nhiều hồ sơ bệnh nhân không thuộc lịch khám của mình trong thời gian ngắn (dấu hiệu dò rỉ hoặc lạm dụng quyền), hoặc break-glass được dùng lặp lại bất thường bởi cùng một tài khoản. Song song, job đối soát kiểm tra bất biến 'mọi Appointment có đúng 1 DoctorSlot' và 'mọi truy cập PHI có audit log tương ứng' bằng cách so khớp số lượng request tại API gateway với số bản ghi audit log, gắn cờ chênh lệch để điều tra khả năng log bị bỏ sót.",
        "A daily back-office job scans the entire AccessAuditLog for anomalous patterns: an account accessing an unusually large number of patient records outside its own schedule in a short time (a sign of snooping or permission abuse), or break-glass used repeatedly and unusually by the same account. In parallel, a reconciliation job checks the invariants 'every Appointment has exactly one DoctorSlot' and 'every PHI access has a corresponding audit log entry' by matching API gateway request counts against audit log record counts, flagging discrepancies for investigation of possibly missing logs.",
        "毎日のバックオフィスジョブは、AccessAuditLog全体をスキャンして異常なパターンを検出します。短時間に自分のスケジュールに含まれない患者記録に異常に多くアクセスしているアカウント（不正閲覧や権限乱用の兆候）、または同一アカウントによる異常な繰り返しのブレークグラス使用です。並行して、突合ジョブは「すべてのAppointmentは正確に1つのDoctorSlotを持つ」「すべてのPHIアクセスには対応する監査ログエントリがある」という不変条件を、APIゲートウェイのリクエスト数と監査ログレコード数を照合することでチェックし、ログの欠落の可能性を調査するため乖離にフラグを立てます。"
      ),
      CODE(
        "sql",
        "-- audit-anomaly-detection.sql — phát hiện truy cập bất thường ngoài lịch khám của bác sĩ\nSELECT al.actor_id, COUNT(DISTINCT al.patient_id) AS distinct_patients_accessed\nFROM access_audit_log al\nWHERE al.timestamp >= NOW() - INTERVAL '1 day'\n  AND al.action = 'READ_CLINICAL_NOTES'\n  AND al.patient_id NOT IN (\n    SELECT patient_id FROM appointments WHERE doctor_id = al.actor_id AND appointment_date = CURRENT_DATE\n  )\nGROUP BY al.actor_id\nHAVING COUNT(DISTINCT al.patient_id) > 5; -- ngưỡng cảnh báo\n\n-- đối soát số request gateway vs số bản ghi audit log\nSELECT DATE_TRUNC('hour', gw.timestamp) AS hour_bucket,\n       COUNT(gw.request_id) AS gateway_requests,\n       COUNT(al.log_id) AS audit_entries\nFROM api_gateway_log gw\nLEFT JOIN access_audit_log al ON al.request_id = gw.request_id\nWHERE gw.endpoint LIKE '/api/emr/%'\nGROUP BY hour_bucket\nHAVING COUNT(gw.request_id) <> COUNT(al.log_id);"
      ),
      NOTE(
        "Báo cáo audit hàng tháng phải xuất được cho DPO dưới dạng không thể chỉnh sửa (ký số/hash), phục vụ đúng yêu cầu thanh tra tuân thủ PHI khi cơ quan quản lý hoặc đối tác bảo hiểm yêu cầu.",
        "The monthly audit report must be exportable to the DPO in a tamper-evident form (digitally signed/hashed), meeting PHI compliance audit requirements whenever regulators or insurance partners request them.",
        "月次監査レポートは、規制当局や保険パートナーから要求された際のPHIコンプライアンス監査要件を満たすため、改ざん検知可能な形式（デジタル署名・ハッシュ付き）でDPOにエクスポートできなければなりません。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
    blocks: [
      P(
        "Pipeline CI chạy unit/contract test cho RBAC policy engine và HL7↔FHIR mapping trên mọi PR (dưới 5 phút), integration test double-booking với mức đồng thời tăng dần (2 → 50 request) trên merge vào main (dưới 15 phút), và một job security scan riêng (kiểm tra broken access control theo OWASP) chạy hàng đêm. Gate release cứng: bất kỳ ca P1 RBAC hoặc double-booking nào fail sẽ tự động chặn deploy, và cảnh báo Security Engineer trước khi cho phép override thủ công.",
        "The CI pipeline runs unit/contract tests for the RBAC policy engine and HL7↔FHIR mapping on every PR (under 5 minutes), double-booking integration tests at increasing concurrency levels (2 → 50 requests) on merge to main (under 15 minutes), and a separate security scan job (checking broken access control per OWASP) nightly. Hard release gate: any failing P1 RBAC or double-booking case automatically blocks deployment, alerting the Security Engineer before any manual override is allowed.",
        "CIパイプラインは、すべてのPRでRBACポリシーエンジンとHL7⇔FHIRマッピングのユニット・契約テスト（5分未満）、mainへのマージ時に並行レベルを段階的に増加させた（2→50リクエスト）ダブルブッキング統合テスト（15分未満）、そして夜間に実行される別のセキュリティスキャンジョブ（OWASPに基づく認可制御の不備チェック）を実行します。厳格なリリースゲート：P1のRBACまたはダブルブッキングケースが1つでも失敗した場合、自動的にデプロイをブロックし、手動オーバーライドが許可される前にセキュリティエンジニアに警告します。"
      ),
      CODE(
        "yaml",
        "# .github/workflows/emr-pipeline.yml\nname: emr-ci\non: [pull_request, push, schedule]\njobs:\n  rbac-hl7-fhir-unit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run test:unit:rbac\n      - run: npm run test:unit:hl7-fhir-mapping\n  double-booking-concurrency:\n    needs: rbac-hl7-fhir-unit\n    if: github.ref == 'refs/heads/main'\n    strategy:\n      matrix: { concurrency: [2, 10, 50] }\n    steps:\n      - run: docker compose -f docker-compose.test.yml up -d\n      - run: npm run test:concurrency -- --requests=${{ matrix.concurrency }}\n  nightly-security-scan:\n    if: github.event_name == 'schedule'\n    steps:\n      - run: npm run security:owasp-access-control-scan\n      - run: node scripts/gate-release.js --block-on=P1"
      ),
      TIP(
        "Dashboard Grafana nên theo dõi riêng biệt: số lần 403 do RBAC theo vai trò (tăng bất thường có thể là dấu hiệu policy sai), số lần break-glass/ngày, và độ trễ transform HL7↔FHIR p95.",
        "The Grafana dashboard should track separately: 403 counts by role (an abnormal spike may signal a wrong policy), break-glass uses per day, and HL7↔FHIR transform p95 latency.",
        "Grafanaダッシュボードでは、役割別の403発生回数（異常な急増は誤ったポリシーの兆候の可能性）、1日あたりのブレークグラス使用回数、HL7⇔FHIR変換のp95レイテンシを個別に監視すべきです。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent hỗ trợ phân tích log truy cập PHI hàng ngày để phát hiện sớm mẫu hình bất thường vượt ngưỡng đơn giản (ví dụ một tài khoản truy cập nhiều bệnh nhân ở nhiều khoa khác nhau trong thời gian ngắn dù mỗi lần đều dưới ngưỡng cảnh báo cứng), giúp bắt được các ca lạm dụng tinh vi mà rule-based threshold bỏ sót. Tuy nhiên, mọi cảnh báo do AI đề xuất đều ở trạng thái 'cần điều tra' chứ không tự động khoá tài khoản — quyết định khoá hoặc báo cáo vi phạm PHI luôn do Security Engineer hoặc DPO xác nhận, vì rủi ro AI hiểu sai ngữ cảnh lâm sàng hợp lệ (ví dụ bác sĩ trực cấp cứu cần xem nhiều bệnh nhân) là có thật.",
        "The AI Agent helps analyze daily PHI access logs to catch subtle anomalous patterns beyond simple thresholds (e.g., an account accessing many patients across different departments in a short time even though each individual access stays under the hard alert threshold), catching sophisticated abuse cases that rule-based thresholds miss. However, every AI-suggested alert stays in a 'needs investigation' state rather than auto-locking the account — the decision to lock an account or report a PHI violation is always confirmed by the Security Engineer or DPO, since the risk of AI misreading a valid clinical context (e.g., an ER doctor legitimately needing to view many patients) is real.",
        "AIエージェントは、日次のPHIアクセスログ分析を支援し、単純な閾値を超える微妙な異常パターン（例：1回ごとのアクセスは厳格な警告閾値以下であっても、短時間に異なる複数の診療科の多数の患者にアクセスするアカウント）を検出し、ルールベースの閾値では見逃してしまう巧妙な不正利用ケースを捉えます。しかし、AIが提案するすべての警告は、アカウントを自動的にロックするのではなく「調査が必要」な状態にとどまります。アカウントのロックやPHI違反の報告に関する決定は、常にセキュリティエンジニアまたはDPOによって確認されます。AIが正当な臨床コンテキスト（例：救急医が正当に多くの患者を閲覧する必要がある場合）を誤って解釈するリスクは現実のものだからです。"
      ),
      H("Ranh giới trách nhiệm AI vs người", "AI vs human responsibility boundary", "AIと人間の責任境界"),
      UL(
        ["AI: phát hiện mẫu hình bất thường tinh vi trong log truy cập PHI", "AI: tóm tắt ngữ cảnh (bác sĩ nào, khoa nào, lịch sử truy cập) hỗ trợ điều tra", "Người: xác nhận có phải vi phạm thật trước khi khoá tài khoản/báo cáo", "Người: quyết định chính sách RBAC mới, AI không tự sửa policy production"],
        ["AI: detects subtle anomalous patterns in PHI access logs", "AI: summarizes context (which doctor, which department, access history) to aid investigation", "Human: confirms whether it's a genuine violation before locking an account/reporting", "Human: decides new RBAC policy; AI never modifies production policy on its own"],
        ["AI：PHIアクセスログにおける微妙な異常パターンを検出する", "AI：調査を支援するためコンテキスト（どの医師、どの診療科、アクセス履歴）を要約する", "人間：アカウントをロック・報告する前に本当に違反であるかを確認する", "人間：新しいRBACポリシーを決定する。AIが本番ポリシーを自ら変更することは決してない"]
      ),
      NOTE(
        "Ghi log mọi phân tích của AI Agent kèm mức độ tin cậy (confidence score) vào một hệ thống case-management riêng, tách biệt hoàn toàn khỏi AccessAuditLog gốc, để không làm nhiễu dữ liệu audit chính thức phục vụ tuân thủ.",
        "Log every AI Agent analysis with a confidence score into a separate case-management system, fully isolated from the original AccessAuditLog, to avoid polluting the official compliance audit data.",
        "AIエージェントのすべての分析結果を信頼度スコアとともに、元のAccessAuditLogとは完全に分離された専用のケース管理システムに記録し、公式なコンプライアンス監査データを汚染しないようにしてください。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn kiểm thử để chắc chắn hệ thống đặt lịch không bao giờ double-booking?",
        "How would you test to be certain a scheduling system never double-books?",
        "Không chỉ test tuần tự — phải mô phỏng nhiều request đặt cùng 1 slot thực sự đồng thời bằng Promise.all hoặc công cụ tải như k6, ở nhiều mức tải khác nhau (2, 10, 50 request), và assert đúng 1 request thắng khoá còn lại bị từ chối rõ ràng, không rơi vào trạng thái mơ hồ.",
        "Not just sequential testing — you must simulate multiple requests booking the same slot truly concurrently using Promise.all or a load tool like k6, at several load levels (2, 10, 50 requests), asserting that exactly one request wins the lock and the rest are cleanly rejected, never left in an ambiguous state.",
        "予約スケジューリングシステムが決してダブルブッキングしないことを確実にするため、どのようにテストしますか。",
        "逐次テストだけでは不十分です。Promise.allやk6のような負荷ツールを使って、同一枠に対する複数のリクエストを本当に並行して（2件、10件、50件など複数の負荷レベルで）シミュレートし、正確に1件のリクエストがロックを獲得し、残りは曖昧な状態に陥ることなく明確に拒否されることをアサートする必要があります。"
      ),
      QA(
        "Nguyên tắc need-to-know trong RBAC cho hồ sơ y tế nghĩa là gì và bạn kiểm thử nó thế nào?",
        "What does the need-to-know principle mean for medical record RBAC, and how would you test it?",
        "Need-to-know nghĩa là mỗi vai trò chỉ được xem đúng phần dữ liệu cần thiết cho công việc của mình, không hơn — ví dụ lễ tân chỉ thấy metadata lịch hẹn chứ không thấy chẩn đoán. Kiểm thử bằng ma trận vai trò × loại tài nguyên, mỗi ô phải có ca test riêng khẳng định rõ allow/deny, và test cả trường hợp lỗi cấu hình kế thừa quyền vô tình mở rộng phạm vi truy cập.",
        "Need-to-know means each role can view only the data strictly necessary for its job, no more — e.g., front desk sees only appointment metadata, never diagnoses. Test it via a role × resource-type matrix, with each cell having a dedicated test case asserting a clear allow/deny, plus tests for role-inheritance misconfigurations accidentally widening access scope.",
        "医療記録のRBACにおけるneed-to-know原則とは何を意味し、どのようにテストしますか。",
        "need-to-knowとは、各役割がその業務に厳密に必要なデータのみを閲覧でき、それ以上は閲覧できないことを意味します。例えば受付は予約のメタデータのみを見ることができ、診断内容を見ることはできません。役割×リソース種別のマトリクスでテストし、各セルには明確なallow/denyをアサートする専用のテストケースを持たせ、さらにロール継承の設定ミスが誤ってアクセス範囲を拡大してしまうケースもテストします。"
      ),
      QA(
        "Nếu một bác sĩ cần truy cập khẩn cấp hồ sơ bệnh nhân ngoài khoa mình phụ trách, hệ thống nên xử lý ra sao?",
        "If a doctor needs emergency access to a patient's record outside their own department, how should the system handle it?",
        "Dùng cơ chế break-glass: cho phép truy cập vượt quyền thông thường nhưng bắt buộc bác sĩ nhập lý do cụ thể (không được để trống), ghi log riêng biệt gắn cờ BREAK_GLASS_ACCESS, và kích hoạt cảnh báo tức thời cho DPO để review sau — không bao giờ âm thầm cho phép mà không có dấu vết.",
        "Use a break-glass mechanism: allow access beyond normal permissions but require the doctor to enter a specific, non-empty reason, log it separately flagged as BREAK_GLASS_ACCESS, and trigger an instant alert to the DPO for later review — never silently allow it without a trace.",
        "医師が自分の担当外の診療科の患者記録に緊急アクセスする必要がある場合、システムはどう対応すべきですか。",
        "ブレークグラス機構を使用します。通常の権限を超えるアクセスを許可しますが、医師に具体的な（空でない）理由の入力を義務付け、BREAK_GLASS_ACCESSとしてフラグ付けした別のログに記録し、後でレビューするためDPOへの即時警告をトリガーします。痕跡を残さずに黙って許可することは決してありません。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Đội bảo mật phát hiện một tài khoản lễ tân đã xem hồ sơ chẩn đoán chi tiết của 12 bệnh nhân trong 2 giờ do lỗi cấu hình RBAC kế thừa quyền. Bạn sẽ điều tra và đề xuất khắc phục như thế nào?",
        "The security team discovers a front-desk account viewed detailed diagnosis records for 12 patients within 2 hours due to an RBAC role-inheritance misconfiguration. How would you investigate and propose a fix?",
        "面接官の質問",
        "セキュリティチームは、RBACロール継承の設定ミスにより、ある受付アカウントが2時間以内に12人の患者の詳細な診断記録を閲覧していたことを発見しました。どのように調査し、修正を提案しますか。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán đặt lịch khám và EMR minh hoạ hai lớp bất biến quan trọng cùng lúc: bất biến đồng thời (không double-booking) và bất biến bảo mật dữ liệu (RBAC need-to-know, audit log không thể sửa). Cả hai đều chỉ lộ ra khi test đúng kỹ thuật — concurrency test thật sự song song cho double-booking, và ma trận vai trò × tài nguyên đầy đủ cho RBAC. Sau khi áp dụng bộ test này, đội QA giảm 100% sự cố double-booking phát hiện sau go-live trong 2 quý liên tiếp và phát hiện sớm 3 lỗi cấu hình RBAC tiềm ẩn trước khi ảnh hưởng bệnh nhân thật, tránh được sự cố PHI breach phải báo cáo cơ quan quản lý.",
        "The appointment and EMR testing problem illustrates two critical invariant layers at once: concurrency invariants (no double-booking) and data-security invariants (need-to-know RBAC, immutable audit log). Both only surface when tested with the right technique — truly parallel concurrency testing for double-booking, and a complete role × resource matrix for RBAC. After adopting this test suite, the QA team eliminated post-go-live double-booking incidents across two consecutive quarters and caught 3 potential RBAC misconfigurations early before affecting real patients, avoiding a reportable PHI breach.",
        "予約とEMRのテスト問題は、2つの重要な不変条件の層を同時に示しています。並行性の不変条件（ダブルブッキングなし）とデータセキュリティの不変条件（need-to-know RBAC、変更不可能な監査ログ）です。どちらも正しい技法でテストして初めて表面化します。ダブルブッキングに対する本当に並行した並行性テスト、そしてRBACに対する完全な役割×リソースマトリクスです。このテストスイートを採用した結果、QAチームは2四半期連続で本番稼働後のダブルブッキングインシデントをゼロにし、実際の患者に影響を与える前に潜在的なRBAC設定ミスを3件早期に発見し、規制当局への報告が必要なPHI侵害を回避しました。"
      ),
      H("Checklist bàn giao", "Handover checklist", "引き継ぎチェックリスト"),
      UL(
        ["☑ Concurrency test double-booking ở nhiều mức tải (2/10/50)", "☑ Ma trận RBAC vai trò × loại tài nguyên đầy đủ, có ca deny rõ ràng", "☑ Break-glass luôn yêu cầu lý do + cảnh báo DPO tức thời", "☑ Audit log append-only, không thể sửa/xoá, có job đối soát hàng ngày", "☑ Test mapping HL7↔FHIR trên bộ message mẫu đầy đủ trường", "☑ Gate CI chặn release khi ca P1 RBAC/double-booking fail"],
        ["☑ Double-booking concurrency test at multiple load levels (2/10/50)", "☑ Complete role × resource-type RBAC matrix with clear deny cases", "☑ Break-glass always requires a reason + instant DPO alert", "☑ Audit log is append-only, non-editable/deletable, with a daily reconciliation job", "☑ HL7↔FHIR mapping test on a full-field sample message set", "☑ CI gate blocking release when a P1 RBAC/double-booking case fails"],
        ["☑ 複数の負荷レベル（2/10/50）でのダブルブッキング並行性テスト", "☑ 明確な拒否ケースを伴う役割×リソース種別の完全なRBACマトリクス", "☑ ブレークグラスは常に理由＋DPOへの即時警告を要求", "☑ 監査ログは追記専用で編集・削除不可、日次突合ジョブあり", "☑ 全フィールドを網羅したサンプルメッセージセットでのHL7⇔FHIRマッピングテスト", "☑ P1のRBAC・ダブルブッキングケース失敗時にリリースをブロックするCIゲート"]
      ),
      TIP(
        "Khi review test RBAC với đội mới, luôn dùng ma trận vai trò × tài nguyên dưới dạng bảng trực quan thay vì liệt kê rule rời rạc — giúp phát hiện ngay ô còn thiếu ca test hoặc mâu thuẫn quy tắc.",
        "When reviewing RBAC tests with a new team, always use the role × resource matrix as a visual table rather than listing disjointed rules — this immediately reveals any cell missing a test case or a conflicting rule.",
        "新しいチームとRBACテストをレビューする際は、個別のルールを羅列するのではなく、常に役割×リソースのマトリクスを視覚的な表として使用してください。これにより、テストケースが不足しているセルや矛盾するルールをすぐに発見できます。"
      ),
    ],
  },
];

const art3 = {
  categorySlug: "enterprise-realworld",
  slug: "healthcare-appointment-emr-phi",
  cover: cover3,
  tags: tags("thucchien", "healthcare", "api", "security", "playwright", "realworld"),
  title: {
    vi: "Thực chiến y tế: đặt lịch khám, hồ sơ EMR, chuẩn HL7/FHIR & quyền riêng tư PHI",
    en: "Enterprise healthcare: appointment scheduling, EMR, HL7/FHIR standard & PHI privacy",
    ja: "実戦・医療：予約スケジューリング、電子カルテ、HL7/FHIR規格とPHIプライバシーのテスト",
  },
  summary: {
    vi: "Bài sâu 14 chương: kiến trúc HL7/FHIR, bất biến không double-booking, RBAC need-to-know, break-glass, audit log WORM, đối soát, CI/CD, AI Agent, phỏng vấn.",
    en: "14-chapter deep dive: HL7/FHIR architecture, no-double-booking invariant, need-to-know RBAC, break-glass, WORM audit log, reconciliation, CI/CD, AI Agent, interview.",
    ja: "14章にわたる詳細解説：HL7/FHIRアーキテクチャ、ダブルブッキング禁止の不変条件、need-to-know RBAC、ブレークグラス、WORM監査ログ、突合、CI/CD、AIエージェント、面接対策。",
  },
  pages: buildDoc(pages3),
};

// ============================================================================================
// BÀI 4: Y tế — Kê đơn điện tử (e-prescription), tương tác thuốc & liều theo cân nặng
// ============================================================================================

const cover4 = makeThumb({ id: "hc-rx-04", domain: "healthcare", kind: "thucchien", label: "実戦 · E-RX SAFETY" });

const svg4Flow = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#083344"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#cffafe">Luồng kê đơn điện tử &amp; kiểm tra an toàn · E-prescription &amp; safety-check flow</text>
<rect x="24" y="56" width="130" height="50" rx="8" fill="#0e7490" stroke="#67e8f9"/>
<text x="89" y="76" font-size="11" fill="#ecfeff" text-anchor="middle">Bác sĩ kê đơn</text>
<text x="89" y="92" font-size="9" fill="#cffafe" text-anchor="middle">Doctor prescribes</text>
<rect x="188" y="30" width="150" height="46" rx="8" fill="#155e75" stroke="#67e8f9"/>
<text x="263" y="50" font-size="11" fill="#ecfeff" text-anchor="middle">Drug Interaction Engine</text>
<text x="263" y="65" font-size="9" fill="#cffafe" text-anchor="middle">Kiểm tra chống chỉ định</text>
<rect x="188" y="90" width="150" height="46" rx="8" fill="#134e4a" stroke="#5eead4"/>
<text x="263" y="110" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Dosage Engine</text>
<text x="263" y="125" font-size="9" fill="#ccfbf1" text-anchor="middle">Liều theo cân nặng/tuổi/thận</text>
<rect x="372" y="60" width="150" height="50" rx="8" fill="#450a0a" stroke="#f87171"/>
<text x="447" y="80" font-size="11" fill="#fca5a5" text-anchor="middle" font-weight="700">Chặn / cảnh báo</text>
<text x="447" y="96" font-size="9" fill="#fecaca" text-anchor="middle">Block / safety alert</text>
<rect x="556" y="60" width="140" height="50" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="626" y="80" font-size="11" fill="#6ee7b7" text-anchor="middle" font-weight="700">Đơn thuốc hợp lệ</text>
<text x="626" y="96" font-size="9" fill="#a7f3d0" text-anchor="middle">Valid e-prescription</text>
<g stroke="#67e8f9" stroke-width="2" fill="none" marker-end="url(#arr4)">
<path d="M154 70 Q 172 52 188 52"/><path d="M154 92 Q 172 110 188 112"/>
<path d="M338 60 Q 355 68 372 76"/><path d="M338 108 Q 355 100 372 92"/>
<path d="M522 78 Q 540 78 556 78"/>
</g>
<defs><marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#67e8f9"/></marker></defs>
<text x="24" y="180" font-size="10" fill="#a5f3fc">Nguồn tham chiếu bên thứ ba: cơ sở dữ liệu tương tác thuốc chuẩn (drug interaction database), bảng liều nhi khoa/người cao tuổi/suy thận.</text>
<text x="24" y="196" font-size="9" fill="#67e8f9">Third-party reference: standard drug interaction database, pediatric/geriatric/renal-impairment dosage tables.</text>
<text x="24" y="220" font-size="9" fill="#5eead4">Bất biến: mọi cặp thuốc chống chỉ định tuyệt đối phải bị BLOCK cứng; liều luôn nằm trong khoảng an toàn theo cân nặng/tuổi/chức năng thận.</text>
</svg>`;

const svg4Table = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận mức độ tương tác thuốc &amp; hành động hệ thống · Drug interaction severity matrix</text>
<g font-size="11">
<rect x="24" y="44" width="672" height="26" fill="#1e293b"/>
<text x="34" y="62" fill="#93c5fd" font-weight="700">Cặp thuốc</text>
<text x="254" y="62" fill="#93c5fd" font-weight="700">Mức độ</text>
<text x="384" y="62" fill="#93c5fd" font-weight="700">Cơ chế</text>
<text x="564" y="62" fill="#93c5fd" font-weight="700">Hành động hệ thống</text>
<rect x="24" y="70" width="672" height="26" fill="#0b1220"/>
<text x="34" y="88" fill="#e2e8f0">Warfarin + Aspirin liều cao</text><text x="254" y="88" fill="#f87171" font-weight="700">Chống chỉ định</text>
<text x="384" y="88" fill="#e2e8f0">Tăng nguy cơ xuất huyết</text><text x="564" y="88" fill="#f87171" font-weight="700">BLOCK cứng</text>
<rect x="24" y="96" width="672" height="26" fill="#111827"/>
<text x="34" y="114" fill="#e2e8f0">Simvastatin + Clarithromycin</text><text x="254" y="114" fill="#fde68a" font-weight="700">Nghiêm trọng</text>
<text x="384" y="114" fill="#e2e8f0">Ức chế CYP3A4, tăng độc tính cơ</text><text x="564" y="114" fill="#fde68a" font-weight="700">Cảnh báo bắt buộc xác nhận</text>
<rect x="24" y="122" width="672" height="26" fill="#0b1220"/>
<text x="34" y="140" fill="#e2e8f0">Metformin + thuốc cản quang iod</text><text x="254" y="140" fill="#fde68a" font-weight="700">Trung bình</text>
<text x="384" y="140" fill="#e2e8f0">Nguy cơ toan lactic ở suy thận</text><text x="564" y="140" fill="#fde68a" font-weight="700">Cảnh báo + kiểm tra eGFR</text>
<rect x="24" y="148" width="672" height="26" fill="#111827"/>
<text x="34" y="166" fill="#e2e8f0">Ibuprofen + Paracetamol</text><text x="254" y="166" fill="#6ee7b7" font-weight="700">Nhẹ/Không đáng kể</text>
<text x="384" y="166" fill="#e2e8f0">Cơ chế khác nhau, phối hợp phổ biến</text><text x="564" y="166" fill="#6ee7b7" font-weight="700">Cho phép, không cảnh báo</text>
</g>
<text x="24" y="210" font-size="10" fill="#94a3b8">Oracle liều: liều mg/kg/ngày phải nằm trong [liều tối thiểu, liều tối đa] theo cân nặng thực và độ tuổi; vượt trần luôn bị chặn dù bác sĩ xác nhận.</text>
<text x="24" y="226" font-size="10" fill="#94a3b8">Dosage oracle: mg/kg/day must fall within [min dose, max dose] per actual body weight and age; exceeding the ceiling is always blocked regardless of doctor confirmation.</text>
</svg>`;

const pages4 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Hệ thống kê đơn điện tử (e-Prescription) của chuỗi phòng khám MedCare xử lý trung bình 9.200 đơn thuốc mỗi ngày trên 24 cơ sở, phục vụ cả bệnh nhân nhi khoa, người lớn và người cao tuổi có chức năng thận suy giảm — mỗi nhóm có ngưỡng liều an toàn khác nhau đáng kể. Drug Safety Module là lớp bảo vệ cuối cùng trước khi đơn thuốc được gửi tới nhà thuốc, chịu trách nhiệm chặn các tổ hợp thuốc chống chỉ định tuyệt đối và cảnh báo liều vượt ngưỡng an toàn theo cân nặng/tuổi/chức năng thận — một lỗi bỏ sót ở đây có thể trực tiếp đe doạ tính mạng bệnh nhân, khác hẳn mức độ rủi ro tài chính của các domain khác.",
        "The e-Prescription system at the MedCare clinic chain processes an average of 9,200 prescriptions per day across 24 facilities, serving pediatric, adult, and elderly patients with reduced renal function — each group has significantly different safe-dosage thresholds. The Drug Safety Module is the last line of defense before a prescription is sent to the pharmacy, responsible for blocking absolutely contraindicated drug combinations and warning about doses exceeding the safe threshold based on weight/age/renal function — a missed error here can directly threaten a patient's life, a very different risk profile from the financial risk in other domains.",
        "MedCareクリニックチェーンの電子処方箋（eプリスクリプション）システムは、24拠点で1日平均9,200件の処方箋を処理しており、小児、成人、腎機能が低下した高齢者を含むすべての患者に対応しています。それぞれのグループは大きく異なる安全な用量閾値を持ちます。Drug Safety Moduleは、処方箋が薬局へ送信される前の最後の防御層であり、絶対的に禁忌となる薬剤の組み合わせをブロックし、体重・年齢・腎機能に基づく安全閾値を超える用量を警告する責任を負います。ここでの見落としは、他のドメインの財務リスクとは全く異なり、患者の生命に直接的な脅威を及ぼす可能性があります。"
      ),
      P(
        "Phạm vi kiểm thử bài này gồm: (1) engine kiểm tra tương tác thuốc (drug-drug interaction) dựa trên cơ sở dữ liệu tham chiếu chuẩn cập nhật định kỳ, (2) engine tính liều an toàn theo cân nặng/tuổi/chức năng thận (dosage calculation with clinical grounding), và (3) cơ chế cảnh báo phân tầng theo mức độ nghiêm trọng (chặn cứng / cảnh báo cần xác nhận / thông tin tham khảo). Ràng buộc nghiêm ngặt: mọi cảnh báo an toàn hiển thị cho bác sĩ phải có căn cứ (grounding) từ nguồn dữ liệu y khoa đã kiểm chứng, không được để engine tự suy luận hay AI tự sinh nội dung cảnh báo không kiểm chứng — đây là yêu cầu sống còn khi tích hợp AI vào luồng lâm sàng.",
        "This piece's testing scope includes: (1) the drug-drug interaction checking engine based on a periodically updated standard reference database, (2) the safe-dosage calculation engine based on weight/age/renal function (clinically grounded dosage calculation), and (3) a severity-tiered alerting mechanism (hard block / confirmation-required warning / informational reference). Strict constraint: every safety alert shown to a doctor must be grounded in a verified medical data source — the engine or an AI must never self-infer or generate unverified warning content on its own — a survival requirement when integrating AI into a clinical flow.",
        "本稿のテスト範囲は次の通りです。（1）定期的に更新される標準参照データベースに基づく薬物間相互作用チェックエンジン、（2）体重・年齢・腎機能に基づく安全用量計算エンジン（臨床的にグラウンディングされた用量計算）、（3）重症度別に階層化された警告機構（強制ブロック／確認必須の警告／参考情報）です。厳格な制約として、医師に表示されるすべての安全警告は検証済みの医療データソースにグラウンディングされていなければならず、エンジンやAIが検証されていない警告内容を自ら推論・生成することは決して許されません。これはAIを臨床フローに統合する際の不可欠な要件です。"
      ),
      IMG(svg4Flow, "Luồng kê đơn qua Drug Interaction Engine và Dosage Engine", "Prescription flow through the Drug Interaction Engine and Dosage Engine", "薬物相互作用エンジンと用量エンジンを経由する処方フロー"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["API kiểm tra tương tác thuốc theo cặp/nhóm thuốc", "API tính liều an toàn theo cân nặng/tuổi/eGFR", "Cơ chế cảnh báo phân tầng theo mức độ nghiêm trọng", "Luồng E2E: bác sĩ kê đơn có tương tác → hệ thống chặn/cảnh báo đúng", "Kiểm tra grounding của nội dung cảnh báo AI-assisted"],
        ["Drug interaction check API by drug pair/class", "Safe-dosage calculation API by weight/age/eGFR", "Severity-tiered alerting mechanism", "E2E flow: doctor prescribes an interacting combination → system correctly blocks/warns", "Grounding check for AI-assisted alert content"],
        ["薬剤ペア・薬効群による薬物相互作用チェックAPI", "体重・年齢・eGFRによる安全用量計算API", "重症度別階層警告機構", "E2Eフロー：医師が相互作用のある組み合わせを処方→システムが正しくブロック・警告", "AI支援警告内容のグラウンディングチェック"]
      ),
      NOTE(
        "eGFR (estimated Glomerular Filtration Rate) là chỉ số ước tính chức năng thận dùng để điều chỉnh liều cho bệnh nhân suy thận — nhiều thuốc cần giảm liều hoặc chống chỉ định hoàn toàn khi eGFR dưới ngưỡng nhất định.",
        "eGFR (estimated Glomerular Filtration Rate) is a renal-function estimate used to adjust dosing for patients with impaired kidney function — many drugs require dose reduction or are fully contraindicated when eGFR falls below a certain threshold.",
        "eGFR（推算糸球体濾過量）は、腎機能が低下した患者の用量調整に使用される腎機能の推定指標です。多くの薬剤は、eGFRが一定の閾値を下回ると減量が必要になるか、完全に禁忌となります。"
      ),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm Prescription Service nhận đơn thuốc từ bác sĩ, Drug Interaction Engine tra cứu cơ sở dữ liệu tương tác thuốc chuẩn (cập nhật hàng tháng từ nhà cung cấp dữ liệu y khoa bên thứ ba) để phát hiện cặp/nhóm thuốc chống chỉ định, Dosage Engine tính liều tối đa/tối thiểu an toàn dựa trên hồ sơ bệnh nhân (cân nặng, tuổi, eGFR mới nhất), và Alert Service tổng hợp kết quả từ 2 engine trên thành cảnh báo phân tầng hiển thị cho bác sĩ. Toàn bộ luồng phải chạy đồng bộ với timeout dưới 800ms vì bác sĩ chờ ngay trên màn hình kê đơn, khác với các luồng hậu kiểm có thể chạy bất đồng bộ.",
        "The architecture includes a Prescription Service receiving prescriptions from doctors, a Drug Interaction Engine querying a standard drug-interaction database (updated monthly from a third-party medical data provider) to detect contraindicated drug pairs/classes, a Dosage Engine computing the safe min/max dose based on the patient profile (weight, age, latest eGFR), and an Alert Service aggregating results from both engines into a severity-tiered alert shown to the doctor. The entire flow must run synchronously with a sub-800ms timeout since the doctor waits right on the prescribing screen, unlike back-office flows that can run asynchronously.",
        "アーキテクチャには、医師から処方箋を受け取るPrescription Service、禁忌となる薬剤ペア・薬効群を検出するため標準薬物相互作用データベース（サードパーティの医療データプロバイダーから毎月更新）を照会するDrug Interaction Engine、患者プロファイル（体重、年齢、最新のeGFR）に基づき安全な最小・最大用量を計算するDosage Engine、そして両エンジンの結果を統合して医師に表示する重症度別警告を作成するAlert Serviceが含まれます。バックオフィスのフローが非同期で実行できるのとは異なり、医師が処方画面でまさに待機しているため、フロー全体は800ミリ秒未満のタイムアウトで同期実行されなければなりません。"
      ),
      IMG(svg4Table, "Ma trận mức độ tương tác thuốc và hành động hệ thống tương ứng", "Drug interaction severity matrix and corresponding system actions", "薬物相互作用の重症度マトリクスと対応するシステムの動作"),
      H("Điểm khó khi kiểm thử", "Testing pain points", "テストの難所"),
      UL(
        ["Cơ sở dữ liệu tương tác thuốc cập nhật định kỳ — test phải chạy trên phiên bản dữ liệu hiện hành, không hard-code danh sách cặp thuốc", "Liều an toàn phụ thuộc nhiều biến (cân nặng, tuổi, eGFR) cùng lúc — cần combinatorial testing có kiểm soát", "Cảnh báo AI-assisted phải luôn trace được về nguồn dữ liệu gốc (grounding), không được để AI tự diễn giải mức độ nghiêm trọng"],
        ["The drug interaction database updates periodically — tests must run against the current data version, never hard-coding a drug-pair list", "Safe dosage depends on multiple variables at once (weight, age, eGFR) — needs controlled combinatorial testing", "AI-assisted alerts must always be traceable to the original data source (grounding); the AI must never self-interpret severity"],
        ["薬物相互作用データベースは定期的に更新されるため、テストは薬剤ペアのリストをハードコードせず、現行のデータバージョンに対して実行しなければならない", "安全用量は複数の変数（体重、年齢、eGFR）に同時に依存するため、制御された組み合わせテストが必要", "AI支援警告は常に元のデータソースに遡って追跡可能（グラウンディング）でなければならず、AIが重症度を自ら解釈することは決して許されない"]
      ),
      TIP(
        "Nên tách riêng test cho 'engine tra cứu tương tác đúng dữ liệu' (contract test với database version cụ thể) và 'UI hiển thị đúng cảnh báo' (E2E) — gộp chung dễ làm test giòn khi database cập nhật.",
        "Separate tests for 'the interaction engine looks up data correctly' (contract test against a specific database version) from 'the UI displays the alert correctly' (E2E) — combining them makes tests brittle when the database updates.",
        "「相互作用エンジンが正しくデータを参照する」（特定のデータベースバージョンに対する契約テスト）と「UIが正しく警告を表示する」（E2E）のテストを分離してください。これらを一緒にすると、データベースが更新された際にテストが壊れやすくなります。"
      ),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Thực thể trung tâm gồm Prescription (gắn PatientProfile tại thời điểm kê đơn — snapshot cân nặng/tuổi/eGFR, không tham chiếu động vì hồ sơ có thể thay đổi sau), InteractionCheckResult (kết quả tra cứu từng cặp thuốc kèm mức độ nghiêm trọng), và DosageCheckResult (liều đề xuất vs khoảng an toàn tính toán). Bất biến quan trọng nhất: mọi cặp thuốc ở mức 'chống chỉ định tuyệt đối' (contraindicated) phải luôn dẫn tới BLOCK cứng, không có đường vòng nào (kể cả override của bác sĩ) được phép bỏ qua kiểm tra này trong hệ thống.",
        "Central entities include Prescription (bound to a PatientProfile snapshot at prescribing time — weight/age/eGFR captured then, not dynamically referenced since the profile may change later), InteractionCheckResult (lookup result per drug pair with severity level), and DosageCheckResult (proposed dose vs the computed safe range). The most important invariant: every drug pair at the 'absolutely contraindicated' level must always result in a hard BLOCK — no workaround (including a doctor override) is permitted to bypass this check in the system.",
        "中心となるエンティティには、Prescription（処方時点のPatientProfileスナップショットに紐づく――体重・年齢・eGFRはその時点で記録され、後でプロファイルが変更される可能性があるため動的参照はしない）、InteractionCheckResult（重症度レベルを伴う薬剤ペアごとの照会結果）、DosageCheckResult（提案用量と計算された安全範囲）が含まれます。最も重要な不変条件は、「絶対的禁忌」レベルのすべての薬剤ペアは常に強制BLOCKに至らなければならないということです。医師のオーバーライドを含め、いかなる回避策もこのチェックをバイパスすることは許されません。"
      ),
      H("Bất biến nghiệp vụ (oracle) bắt buộc", "Mandatory business invariants (oracle)", "必須の業務不変条件（オラクル）"),
      UL(
        [
          "Cặp thuốc mức 'chống chỉ định tuyệt đối' luôn BLOCK cứng, không override được bởi bất kỳ vai trò nào",
          "Liều kê phải nằm trong [liều tối thiểu, liều tối đa] tính theo cân nặng thực tại thời điểm kê đơn — vượt trần trên luôn bị chặn",
          "Snapshot dữ liệu bệnh nhân dùng để tính liều phải cố định tại thời điểm kê đơn, không tính lại theo dữ liệu mới nếu đơn đã phát hành",
          "Mọi cảnh báo hiển thị cho bác sĩ phải có nguồn tham chiếu cụ thể (drugId, ruleId, tài liệu y khoa) — không hiển thị cảnh báo không có nguồn gốc",
          "Cảnh báo mức 'cần xác nhận' yêu cầu bác sĩ tick xác nhận rõ ràng kèm ghi log lý do trước khi đơn được gửi đi",
        ],
        [
          "A drug pair at 'absolutely contraindicated' level always hard-BLOCKs, overridable by no role whatsoever",
          "The prescribed dose must fall within [min dose, max dose] computed from the actual weight at prescribing time — exceeding the upper ceiling always blocks",
          "The patient-data snapshot used for dose calculation must be fixed at prescribing time, never recomputed against newer data once the prescription is issued",
          "Every alert shown to the doctor must carry a specific reference source (drugId, ruleId, medical documentation) — no ungrounded alert may be displayed",
          "A 'confirmation-required' alert requires the doctor to explicitly check a confirmation box with a logged reason before the prescription is sent",
        ],
        [
          "「絶対的禁忌」レベルの薬剤ペアは常に強制BLOCKされ、いかなる役割によってもオーバーライドできない",
          "処方用量は処方時点の実際の体重から計算された[最小用量、最大用量]の範囲内でなければならず、上限超過は常にブロックされる",
          "用量計算に使用する患者データのスナップショットは処方時点で固定されなければならず、処方箋発行後に新しいデータで再計算してはならない",
          "医師に表示されるすべての警告には具体的な参照ソース（drugId、ruleId、医療文書）が必要であり、根拠のない警告を表示してはならない",
          "「確認必須」レベルの警告は、処方箋が送信される前に医師が明示的に確認ボックスにチェックし理由をログに記録することを要求する",
        ]
      ),
      WARN(
        "Nếu Dosage Engine tính liều dựa trên cân nặng lấy động từ EMR tại thời điểm truy vấn thay vì snapshot lúc kê đơn, một bản cập nhật cân nặng trễ (do y tá quên nhập) có thể khiến liều đã kê hợp lệ lúc đó bị đánh giá lại sai lệch khi tra cứu lịch sử — luôn dùng snapshot bất biến.",
        "If the Dosage Engine computes dose from weight fetched dynamically from the EMR at query time instead of a prescribing-time snapshot, a delayed weight update (a nurse forgetting to enter it) could cause a dose that was valid when prescribed to be wrongly re-evaluated later — always use an immutable snapshot.",
        "Dosage Engineが、処方時点のスナップショットではなくクエリ時にEMRから動的に取得した体重に基づいて用量を計算する場合、体重更新の遅延（看護師の入力忘れ）により、処方時点では有効だった用量が後で誤って再評価されてしまう可能性があります。常にイミュータブルなスナップショットを使用してください。"
      ),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro nghiêm trọng nhất, khác biệt hoàn toàn với các domain tài chính, là rủi ro trực tiếp tới tính mạng bệnh nhân: bỏ sót một cặp thuốc chống chỉ định hoặc tính sai liều vượt ngưỡng an toàn có thể gây phản ứng phụ nghiêm trọng hoặc tử vong, không có 'hoàn tác giao dịch' như trong bài toán tài chính. Rủi ro thứ hai là cảnh báo giả (false positive) quá nhiều khiến bác sĩ bị 'alert fatigue' và có xu hướng bấm xác nhận bỏ qua cảnh báo một cách máy móc, làm mất tác dụng của toàn bộ lớp an toàn. Rủi ro thứ ba là nội dung cảnh báo do AI hỗ trợ soạn bị hallucination, đưa ra thông tin y khoa sai nhưng trông có vẻ đáng tin.",
        "The most severe risk, entirely different from financial domains, is a direct threat to patient life: missing a contraindicated drug pair or miscalculating a dose beyond the safe threshold can cause a severe adverse reaction or death, with no 'transaction rollback' as in a financial problem. The second risk is excessive false-positive alerts causing doctor 'alert fatigue', leading to mechanically dismissing confirmations and undermining the entire safety layer. The third risk is AI-assisted alert content hallucinating, presenting incorrect medical information that looks credible.",
        "金融ドメインとは全く異なる最も深刻なリスクは、患者の生命への直接的な脅威です。禁忌となる薬剤ペアの見落としや安全閾値を超える用量の計算ミスは、重篤な有害反応や死亡を引き起こす可能性があり、金融の問題のような「取引の取り消し」はありません。第二のリスクは、過剰な偽陽性警告による医師の「アラート疲れ」で、確認を機械的に却下する傾向につながり、安全層全体の効果を損ないます。第三のリスクは、AI支援の警告内容がハルシネーション（幻覚）を起こし、信頼できるように見えるが誤った医療情報を提示してしまうことです。"
      ),
      H("Chiến lược kiểm thử theo kim tự tháp", "Test strategy pyramid", "テスト戦略ピラミッド"),
      UL(
        ["60% unit/contract test cho drug interaction lookup và dosage formula theo từng nhóm tuổi/thận", "25% integration test cho luồng Prescription → Interaction → Dosage → Alert", "15% E2E + grounding test cho nội dung cảnh báo AI-assisted"],
        ["60% unit/contract tests for drug interaction lookup and dosage formulas by age/renal group", "25% integration tests for the Prescription → Interaction → Dosage → Alert flow", "15% E2E + grounding tests for AI-assisted alert content"],
        ["60%は年齢・腎機能グループ別の薬物相互作用照会と用量計算式のユニット・契約テスト", "25%はPrescription→Interaction→Dosage→Alertフローの統合テスト", "15%はAI支援警告内容のE2E・グラウンディングテスト"]
      ),
      SCEN(
        "Kịch bản rủi ro thực tế",
        "Real-world risk scenario",
        "Một bản cập nhật cơ sở dữ liệu tương tác thuốc từ nhà cung cấp bên thứ ba vô tình hạ mức độ nghiêm trọng của cặp Warfarin-Aspirin từ 'chống chỉ định' xuống 'cần xác nhận' do lỗi mapping mã ATC, khiến hệ thống chỉ hiển thị cảnh báo mềm thay vì chặn cứng trong 3 ngày. Đội QA phát hiện qua bộ golden dataset kiểm tra sau mỗi lần đồng bộ dữ liệu bên thứ ba, ngăn chặn kịp thời trước khi có đơn thuốc thực tế nào bị ảnh hưởng.",
        "A drug-interaction database update from a third-party provider accidentally downgraded the Warfarin-Aspirin pair's severity from 'contraindicated' to 'confirmation-required' due to an ATC code mapping error, causing the system to show only a soft warning instead of a hard block for 3 days. QA caught it via the golden dataset check run after every third-party data sync, preventing it in time before any real prescription was affected.",
        "面接シナリオ本文（日本語）",
        "サードパーティプロバイダーからの薬物相互作用データベース更新で、ATCコードのマッピングエラーにより、ワルファリン・アスピリンのペアの重症度が誤って「禁忌」から「確認必須」に格下げされ、3日間システムが強制ブロックの代わりにソフトな警告のみを表示していました。QAはサードパーティデータ同期のたびに実行されるゴールデンデータセットチェックでこれを発見し、実際の処方箋が影響を受ける前に間に合って防止しました。"
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的なテスト計画" },
    blocks: [
      P(
        "Test Plan xác định scope kiểm thử Drug Safety Module v2.3 trước khi tích hợp tính năng AI-assisted alert explanation, không bao gồm hệ thống quản lý tồn kho nhà thuốc đã kiểm thử riêng. Entry criteria: golden dataset 60 cặp thuốc (10 chống chỉ định, 20 nghiêm trọng, 20 trung bình, 10 không đáng kể) đã được dược sĩ lâm sàng xác nhận, môi trường staging đồng bộ đúng phiên bản database tương tác thuốc hiện hành. Exit criteria: 100% ca chống chỉ định tuyệt đối bị BLOCK, 100% ca liều vượt trần bị chặn, mọi cảnh báo AI-assisted có nguồn tham chiếu hợp lệ, không còn defect Critical/High.",
        "The Test Plan scopes testing the Drug Safety Module v2.3 ahead of integrating an AI-assisted alert explanation feature, excluding the pharmacy inventory system tested separately. Entry criteria: a golden dataset of 60 drug pairs (10 contraindicated, 20 severe, 20 moderate, 10 negligible) confirmed by a clinical pharmacist, staging synced to the current drug-interaction database version. Exit criteria: 100% of absolute-contraindication cases BLOCK, 100% of over-ceiling dose cases block, every AI-assisted alert carries a valid reference source, no open Critical/High defects.",
        "テスト計画では、AI支援警告説明機能を統合する前のDrug Safety Module v2.3のテスト範囲を定義します。別途テスト済みの薬局在庫管理システムは対象外です。開始基準：臨床薬剤師が確認したゴールデンデータセット60薬剤ペア（禁忌10、重篤20、中等度20、軽微10）、現行の薬物相互作用データベースバージョンに同期されたステージング環境。終了基準：絶対禁忌ケース100%がBLOCKされること、上限超過用量ケース100%がブロックされること、すべてのAI支援警告が有効な参照ソースを持つこと、Critical/High未解決欠陥がないこと。"
      ),
      H("Chiến lược dữ liệu & vai trò", "Data strategy & roles", "データ戦略と役割"),
      UL(
        ["QA Lead: sở hữu golden dataset tương tác thuốc & ma trận liều", "Clinical Pharmacist liaison: xác nhận mức độ nghiêm trọng và ngưỡng liều", "Automation Engineer: viết test API + grounding verification cho AI alert", "Data Engineer: đảm bảo staging đồng bộ đúng phiên bản database bên thứ ba"],
        ["QA Lead: owns the drug-interaction golden dataset & dosage matrix", "Clinical Pharmacist liaison: confirms severity levels and dosage thresholds", "Automation Engineer: writes API tests + grounding verification for AI alerts", "Data Engineer: ensures staging syncs to the correct third-party database version"],
        ["QAリード：薬物相互作用のゴールデンデータセットと用量マトリクスを管理", "臨床薬剤師連絡担当：重症度レベルと用量閾値を確認", "自動化エンジニア：APIテストとAI警告のグラウンディング検証を作成", "データエンジニア：ステージングが正しいサードパーティデータベースバージョンに同期されていることを保証"]
      ),
      NOTE(
        "KPI theo dõi: tỉ lệ ca chống chỉ định bị BLOCK đúng (mục tiêu 100% tuyệt đối), tỉ lệ cảnh báo có nguồn tham chiếu hợp lệ (mục tiêu 100%), tỉ lệ false positive trên golden dataset (mục tiêu <2% để tránh alert fatigue).",
        "Tracked KPIs: rate of contraindication cases correctly BLOCKed (target absolute 100%), rate of alerts with a valid reference source (target 100%), false-positive rate on the golden dataset (target <2% to avoid alert fatigue).",
        "監視するKPI：禁忌ケースが正しくBLOCKされる割合（目標は絶対に100%）、有効な参照ソースを持つ警告の割合（目標100%）、ゴールデンデータセットにおける偽陽性率（アラート疲れを避けるため目標2%未満）。"
      ),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử (decision table)", en: "6. Test case design matrix (decision table)", ja: "6. テストケース設計マトリクス（決定表）" },
    blocks: [
      P(
        "Ma trận ca tương tác thuốc thiết kế theo decision table với chiều mức độ nghiêm trọng (chống chỉ định / nghiêm trọng / trung bình / không đáng kể) nhân với ngữ cảnh bệnh nhân (người lớn khỏe mạnh / nhi khoa / cao tuổi có eGFR thấp). Song song, ma trận liều dùng equivalence partitioning và boundary value analysis cho biến cân nặng (dưới ngưỡng nhi khoa, trong khoảng an toàn, đúng ngưỡng trần, vượt trần) kết hợp điều chỉnh theo eGFR (bình thường, suy thận nhẹ, suy thận nặng cần chống chỉ định một số thuốc).",
        "The drug-interaction case matrix is designed as a decision table with a severity dimension (contraindicated / severe / moderate / negligible) multiplied by patient context (healthy adult / pediatric / elderly with low eGFR). In parallel, the dosage matrix uses equivalence partitioning and boundary value analysis for the weight variable (below pediatric threshold, within safe range, exactly at the ceiling, over the ceiling) combined with eGFR adjustment (normal, mild renal impairment, severe renal impairment requiring some drugs to be contraindicated).",
        "薬物相互作用のケース表は、重症度の軸（禁忌／重篤／中等度／軽微）と患者コンテキスト（健常成人／小児／低eGFRの高齢者）を掛け合わせた決定表として設計されています。並行して、用量マトリクスは体重変数（小児閾値未満、安全範囲内、上限ちょうど、上限超過）に対する同値分割と境界値分析を、eGFR調整（正常、軽度腎機能障害、一部薬剤の禁忌が必要な重度腎機能障害）と組み合わせて使用します。"
      ),
      IMG(svg4Table, "Ma trận mức độ tương tác thuốc với oracle hành động hệ thống cụ thể", "Drug interaction severity matrix with concrete system-action oracle", "具体的なシステム動作オラクルを伴う薬物相互作用重症度マトリクス"),
      H("Nhóm ca theo mức ưu tiên", "Case groups by priority", "優先度別のケースグループ"),
      UL(
        ["P1: cặp thuốc chống chỉ định tuyệt đối, liều vượt trần an toàn, bỏ sót cảnh báo do lỗi mapping dữ liệu", "P2: cảnh báo nghiêm trọng/trung bình cần xác nhận, điều chỉnh liều theo eGFR thấp, snapshot cân nặng đúng thời điểm", "P3: tổ hợp thuốc không đáng kể (happy path), test hiệu năng tra cứu tương tác dưới 800ms"],
        ["P1: absolute contraindicated pairs, over-ceiling dose, missed alert due to data-mapping error", "P2: severe/moderate confirmation-required alerts, dose adjustment for low eGFR, correctly timed weight snapshot", "P3: negligible combinations (happy path), interaction-lookup performance test under 800ms"],
        ["P1：絶対禁忌ペア、上限超過用量、データマッピングエラーによる警告見落とし", "P2：確認必須の重篤・中等度警告、低eGFRに対する用量調整、正しいタイミングの体重スナップショット", "P3：軽微な組み合わせ（ハッピーパス）、800ミリ秒未満の相互作用照会性能テスト"]
      ),
      TIP(
        "Đặt tên ca theo mẫu RX_<severity>_<patientContext>_<expected> (ví dụ RX_CONTRAINDICATED_ELDERLY_LOWEGFR_BLOCK) để dược sĩ lâm sàng dễ review độc lập với đội automation.",
        "Name cases as RX_<severity>_<patientContext>_<expected> (e.g. RX_CONTRAINDICATED_ELDERLY_LOWEGFR_BLOCK) so the clinical pharmacist can review independently from the automation team.",
        "臨床薬剤師が自動化チームとは独立してレビューしやすいよう、ケース名はRX_<severity>_<patientContext>_<expected>（例：RX_CONTRAINDICATED_ELDERLY_LOWEGFR_BLOCK）の形式で命名してください。"
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường (mock bên thứ ba)", en: "7. Data & environment setup (third-party mocking)", ja: "7. データ・環境準備（サードパーティのモック化）" },
    blocks: [
      P(
        "Cơ sở dữ liệu tương tác thuốc là dịch vụ bên thứ ba trả phí theo license cập nhật hàng tháng — môi trường test dùng một snapshot cố định (frozen) của database tại một phiên bản cụ thể để đảm bảo test không bị đổi kết quả ngoài ý muốn khi nhà cung cấp cập nhật, kết hợp job riêng chạy golden dataset lại mỗi khi đồng bộ phiên bản mới trước khi áp dụng vào production. API test-only `/test/seed-patient-profile` cho phép sinh nhanh hồ sơ bệnh nhân với cân nặng/tuổi/eGFR tuỳ ý để dựng ca test biên mà không cần nhập liệu qua UI.",
        "The drug-interaction database is a paid third-party service licensed with monthly updates — the test environment uses a frozen snapshot of the database at a specific version to ensure tests don't change results unexpectedly when the provider updates, combined with a dedicated job rerunning the golden dataset whenever a new version syncs before applying it to production. A test-only `/test/seed-patient-profile` API lets QA quickly generate a patient profile with arbitrary weight/age/eGFR to build boundary test cases without UI data entry.",
        "薬物相互作用データベースは月次更新のライセンスを持つ有料のサードパーティサービスです。テスト環境では、プロバイダーの更新によってテスト結果が意図せず変わることを防ぐため、特定バージョンでデータベースの固定（フリーズ）されたスナップショットを使用し、新しいバージョンが本番環境に適用される前に同期されるたびにゴールデンデータセットを再実行する専用ジョブと組み合わせます。テスト専用API `/test/seed-patient-profile` により、QAはUIでのデータ入力なしに、任意の体重・年齢・eGFRを持つ患者プロファイルを素早く生成して境界テストケースを構築できます。"
      ),
      CODE(
        "yaml",
        "# docker-compose.test.yml — môi trường mock cho Drug Safety Module\nservices:\n  drug-db-frozen:\n    image: medcare/drug-interaction-db:v2026.06-frozen\n    ports: [\"8083:8080\"]\n  eprescription-api:\n    image: medcare/eprescription:staging\n    environment:\n      DRUG_INTERACTION_DB_URL: http://drug-db-frozen:8080\n      GOLDEN_DATASET_PATH: /fixtures/golden-drug-pairs.json\n      MAX_DOSAGE_TIMEOUT_MS: 800\n    ports: [\"3001:3000\"]"
      ),
      WARN(
        "Không bao giờ trỏ môi trường test vào database tương tác thuốc production trực tiếp — nếu nhà cung cấp cập nhật giữa lúc test đang chạy, kết quả test sẽ không tái lập được (non-reproducible), gây khó khăn lớn khi debug regression.",
        "Never point the test environment directly at the production drug-interaction database — if the provider updates mid-test-run, results become non-reproducible, causing major difficulty debugging regressions.",
        "テスト環境を本番の薬物相互作用データベースに直接向けてはいけません。テスト実行中にプロバイダーが更新した場合、結果が再現不可能になり、回帰のデバッグが非常に困難になります。"
      ),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：ハッピーパス" },
    blocks: [
      P(
        "Happy path automation dùng Playwright cho form kê đơn của bác sĩ, theo Page Object cho luồng chọn thuốc/liều/xác nhận, kết hợp API `/test/seed-patient-profile` để chuẩn bị hồ sơ bệnh nhân với thông số biên. Assertion không dừng ở 'đơn thuốc được tạo' mà phải kiểm tra chính xác: liều đề xuất nằm trong khoảng an toàn tính bởi oracle độc lập, và không có cảnh báo tương tác nào bị bỏ sót khi kê tổ hợp thuốc an toàn.",
        "Happy-path automation uses Playwright for the doctor's prescribing form, following a Page Object for the drug/dose/confirmation selection flow, combined with the `/test/seed-patient-profile` API to prepare a patient profile with boundary parameters. Assertions don't stop at 'the prescription was created' — they must precisely verify: the proposed dose falls within the safe range computed by an independent oracle, and no interaction warning is missed when prescribing a safe drug combination.",
        "ハッピーパス自動化は、薬剤・用量・確認の選択フローに対するPage Objectに従い、医師の処方フォームにPlaywrightを使用し、境界パラメータを持つ患者プロファイルを準備するため`/test/seed-patient-profile` APIと組み合わせます。アサーションは「処方箋が作成された」ことでは終わらず、提案された用量が独立したオラクルによって計算された安全範囲内にあること、安全な薬剤の組み合わせを処方する際に相互作用の警告が見落とされないことを正確に検証しなければなりません。"
      ),
      CODE(
        "typescript",
        "// prescription-happy-path.spec.ts\nimport { test, expect } from '@playwright/test';\nimport { PrescriptionPage } from './pages/prescription-page';\nimport { computeSafeDoseRange } from './oracle/dosage-oracle';\n\ntest('safe combination within weight-based dose range is accepted without warning', async ({ page, request }) => {\n  const patient = await seedPatientProfile(request, { weightKg: 68, age: 42, egfr: 95 });\n  const rx = new PrescriptionPage(page);\n  await rx.gotoPatient(patient.id);\n  await rx.addDrug({ name: 'Amoxicillin', doseMgPerDay: 1500 });\n  await rx.submit();\n\n  const result = await rx.getSubmissionResult();\n  expect(result.status).toBe('SUBMITTED');\n  expect(result.warnings.length).toBe(0);\n\n  const range = computeSafeDoseRange({ drug: 'Amoxicillin', weightKg: 68, age: 42, egfr: 95 });\n  expect(1500).toBeGreaterThanOrEqual(range.min);\n  expect(1500).toBeLessThanOrEqual(range.max);\n});"
      ),
      CODE(
        "typescript",
        "// oracle/dosage-oracle.ts — oracle độc lập tính khoảng liều an toàn\nexport function computeSafeDoseRange({ drug, weightKg, age, egfr }: DosageInput): { min: number; max: number } {\n  const base = DRUG_DOSAGE_TABLE[drug]; // mg/kg/day min-max, từ tài liệu dược lý gốc\n  let max = base.maxMgPerKg * weightKg;\n  if (egfr < 60) max *= RENAL_ADJUSTMENT_FACTOR[drug] ?? 1.0; // giảm liều theo suy thận\n  if (age < 12) max = Math.min(max, base.pediatricCeilingMg ?? Infinity);\n  return { min: base.minMgPerKg * weightKg, max: round2(max) };\n}"
      ),
      TIP(
        "Oracle liều phải được dược sĩ lâm sàng ký duyệt trên từng dòng công thức trước khi merge vào bộ test — đây không phải logic có thể suy luận thuần kỹ thuật, sai sót ở đây có hậu quả khác hẳn bug phần mềm thông thường.",
        "The dosage oracle must be signed off line-by-line by a clinical pharmacist before merging into the test suite — this isn't logic that can be purely technically inferred; a mistake here has consequences unlike an ordinary software bug.",
        "用量オラクルは、テストスイートにマージする前に、臨床薬剤師が計算式の各行を確認・承認しなければなりません。これは純粋に技術的に推論できるロジックではなく、ここでの誤りは通常のソフトウェアバグとは全く異なる結果をもたらします。"
      ),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi chuyên sâu là trọng tâm của toàn bộ hệ thống an toàn kê đơn: chặn tuyệt đối tổ hợp thuốc chống chỉ định dù bác sĩ cố gắng override, chặn liều vượt trần dù nằm trong 'khoảng thường dùng' của thuốc khác, xử lý đúng khi eGFR thiếu dữ liệu (không được mặc định coi là bình thường), và kiểm tra grounding của cảnh báo AI-assisted để đảm bảo không có nội dung y khoa bịa đặt.",
        "Deep failure cases are the focus of the entire prescribing safety system: absolutely blocking contraindicated drug combinations even if a doctor attempts an override, blocking over-ceiling doses even if within another drug's 'commonly used range', correctly handling missing eGFR data (never defaulting to assume normal), and verifying the grounding of AI-assisted alerts to ensure no fabricated medical content.",
        "高度な異常系は、処方安全システム全体の焦点です。医師がオーバーライドを試みても禁忌となる薬剤の組み合わせを絶対的にブロックすること、他の薬剤の「一般的に使用される範囲」内であっても上限超過用量をブロックすること、eGFRデータが欠落している場合の正しい処理（デフォルトで正常とみなさないこと）、そしてAI支援警告のグラウンディングを検証し、捏造された医療内容がないことを確認することです。"
      ),
      CODE(
        "typescript",
        "// contraindicated-hard-block.spec.ts\ntest('absolute contraindicated pair cannot be overridden by any role', async ({ doctorRequest }) => {\n  const res = await doctorRequest.post('/api/prescriptions', {\n    data: { patientId: 'PT-3301', drugs: ['Warfarin', 'Aspirin-HighDose'], overrideRequested: true, overrideReason: 'Clinical judgement' },\n  });\n  const body = await res.json();\n  expect(res.status()).toBe(422);\n  expect(body.blocked).toBe(true);\n  expect(body.overrideAllowed).toBe(false); // không có đường vòng, kể cả có lý do\n});"
      ),
      CODE(
        "typescript",
        "// dose-ceiling-exceeded.spec.ts\ntest('dose exceeding safety ceiling is blocked even if within a similar drug range', async ({ request }) => {\n  const patient = await seedPatientProfile(request, { weightKg: 22, age: 8, egfr: 100 }); // bệnh nhi\n  const res = await request.post('/api/dosage/check', {\n    data: { patientId: patient.id, drug: 'Ibuprofen', doseMgPerDay: 900 }, // vượt trần nhi khoa dù người lớn dùng bình thường\n  });\n  const body = await res.json();\n  expect(body.decision).toBe('BLOCKED');\n  expect(body.reasonCode).toBe('PEDIATRIC_DOSE_CEILING_EXCEEDED');\n});"
      ),
      CODE(
        "typescript",
        "// missing-egfr-fail-safe.spec.ts\ntest('missing eGFR data must trigger mandatory lab check, never assume normal renal function', async ({ request }) => {\n  const patient = await seedPatientProfile(request, { weightKg: 75, age: 68, egfr: null });\n  const res = await request.post('/api/dosage/check', { data: { patientId: patient.id, drug: 'Metformin', doseMgPerDay: 2000 } });\n  const body = await res.json();\n  expect(body.decision).toBe('REQUIRES_LAB_CHECK');\n  expect(body.reasonCode).toBe('MISSING_EGFR_DATA');\n  expect(body.decision).not.toBe('APPROVED'); // không bao giờ tự động approve khi thiếu dữ liệu chức năng thận\n});"
      ),
      CODE(
        "typescript",
        "// ai-alert-grounding.spec.ts — kiểm tra cảnh báo AI-assisted có nguồn tham chiếu thật\ntest('AI-assisted alert explanation must cite a valid drugId and reference source', async ({ request }) => {\n  const res = await request.post('/api/alerts/explain', {\n    data: { drugPair: ['Simvastatin', 'Clarithromycin'] },\n  });\n  const body = await res.json();\n  expect(body.referenceSource).toBeTruthy();\n  expect(body.referenceSource.drugId).toBeDefined();\n  expect(body.referenceSource.documentId).toMatch(/^DRUGDB-/);\n  // nếu AI không tìm được nguồn, phải trả về trạng thái rõ ràng thay vì bịa nội dung\n  expect(body.groundingStatus).not.toBe('UNGROUNDED');\n});"
      ),
      WARN(
        "Nếu AI Agent hỗ trợ soạn nội dung cảnh báo không tìm thấy nguồn tham chiếu hợp lệ, hệ thống PHẢI trả về trạng thái 'không xác định, cần dược sĩ kiểm tra thủ công' thay vì để AI tự diễn giải mức độ nghiêm trọng — hiển thị cảnh báo sai do hallucination nguy hiểm hơn nhiều so với không hiển thị cảnh báo.",
        "If the AI Agent assisting with alert content cannot find a valid reference source, the system MUST return an 'undetermined, requires manual pharmacist review' status instead of letting the AI self-interpret severity — a wrong alert from hallucination is far more dangerous than no alert at all.",
        "警告内容の作成を支援するAIエージェントが有効な参照ソースを見つけられない場合、システムはAIに重症度を自ら解釈させるのではなく、「未確定、薬剤師による手動確認が必要」というステータスを必ず返さなければなりません。ハルシネーションによる誤った警告は、警告が全く表示されないことよりもはるかに危険です。"
      ),
    ],
  },
  {
    heading: { vi: "10. Nghiệp vụ nền/hậu kiểm: đối soát an toàn kê đơn", en: "10. Back-office: prescription safety reconciliation", ja: "10. バックオフィス：処方安全性の突合" },
    blocks: [
      P(
        "Job hậu kiểm hàng ngày quét toàn bộ đơn thuốc đã phát hành trong 24h qua để tái kiểm tra bằng oracle độc lập (không dùng lại logic production), phát hiện bất kỳ đơn nào lẽ ra phải bị chặn nhưng đã lọt qua — đây là lớp phòng vệ thứ hai bắt các lỗi do cấu hình runtime hoặc race condition mà test tự động không phủ hết. Song song, mỗi lần đồng bộ phiên bản mới của cơ sở dữ liệu tương tác thuốc, job tự động chạy lại toàn bộ golden dataset 60 cặp thuốc và chặn việc áp dụng phiên bản mới vào production nếu có bất kỳ cặp chống chỉ định nào bị hạ mức độ nghiêm trọng ngoài ý muốn.",
        "A daily back-office job scans all prescriptions issued in the past 24 hours to re-check them with an independent oracle (not reusing production logic), catching any prescription that should have been blocked but slipped through — a second line of defense catching bugs from runtime config or race conditions that automated tests don't fully cover. In parallel, every time a new drug-interaction database version syncs, a job automatically reruns the full 60-pair golden dataset and blocks applying the new version to production if any contraindicated pair was unintentionally downgraded in severity.",
        "毎日のバックオフィスジョブは、過去24時間に発行されたすべての処方箋をスキャンし、独立したオラクル（本番ロジックを再利用しない）で再チェックを行い、本来ブロックされるべきだったのにすり抜けてしまった処方箋を検出します。これは、自動テストが完全にはカバーしない実行時設定や競合状態によるバグを捕捉する第二の防御線です。並行して、新しい薬物相互作用データベースバージョンが同期されるたびに、ジョブは自動的に60ペアのゴールデンデータセット全体を再実行し、いずれかの禁忌ペアの重症度が意図せず格下げされた場合、新しいバージョンの本番適用をブロックします。"
      ),
      CODE(
        "sql",
        "-- prescription-safety-reconciliation.sql — tái kiểm tra đơn thuốc 24h qua\nSELECT p.prescription_id, p.patient_id, p.drugs, icr.severity, p.system_decision\nFROM prescriptions p\nJOIN interaction_check_results icr ON icr.prescription_id = p.prescription_id\nWHERE p.issued_at >= NOW() - INTERVAL '24 hours'\n  AND icr.severity = 'CONTRAINDICATED'\n  AND p.system_decision <> 'BLOCKED'; -- lẽ ra phải bị chặn nhưng không\n\n-- kiểm tra liều vượt trần lọt qua\nSELECT p.prescription_id, dcr.proposed_dose, dcr.max_safe_dose\nFROM prescriptions p\nJOIN dosage_check_results dcr ON dcr.prescription_id = p.prescription_id\nWHERE dcr.proposed_dose > dcr.max_safe_dose\n  AND p.system_decision NOT IN ('BLOCKED', 'REQUIRES_LAB_CHECK');"
      ),
      NOTE(
        "Bất kỳ phát hiện nào từ job hậu kiểm này đều được escalate NGAY LẬP TỨC tới Clinical Safety Officer, không chờ chu kỳ báo cáo thông thường — khác với các domain tài chính có thể xử lý theo lô hàng tuần, an toàn bệnh nhân yêu cầu phản ứng tức thời.",
        "Any finding from this back-office job is escalated IMMEDIATELY to the Clinical Safety Officer, not waiting for a regular reporting cycle — unlike financial domains that can be handled in weekly batches, patient safety demands an instant response.",
        "このバックオフィスジョブによる発見は、通常の報告サイクルを待たず、直ちにClinical Safety Officer（臨床安全責任者）にエスカレーションされます。週次バッチで処理できる金融ドメインとは異なり、患者の安全は即時の対応を要求します。"
      ),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
    blocks: [
      P(
        "Pipeline CI chạy unit test cho dosage formula và interaction lookup trên mọi PR (dưới 4 phút), integration test đầy đủ golden dataset 60 cặp thuốc trên merge vào main (dưới 10 phút), và một job đặc biệt chạy lại toàn bộ golden dataset ngay khi có bản đồng bộ mới của cơ sở dữ liệu tương tác thuốc bên thứ ba — đây là gate cứng nhất trong toàn hệ thống, không cho phép bất kỳ override thủ công nào nếu có cặp chống chỉ định bị hạ mức độ nghiêm trọng.",
        "The CI pipeline runs unit tests for the dosage formula and interaction lookup on every PR (under 4 minutes), full 60-pair golden-dataset integration tests on merge to main (under 10 minutes), and a special job rerunning the entire golden dataset the moment a new third-party drug-interaction database sync occurs — the hardest gate in the whole system, allowing no manual override whatsoever if a contraindicated pair was downgraded in severity.",
        "CIパイプラインは、すべてのPRで用量計算式と相互作用照会のユニットテスト（4分未満）、mainへのマージ時に60ペアのゴールデンデータセット全体の統合テスト（10分未満）を実行し、サードパーティの薬物相互作用データベースの新しい同期が発生した瞬間に、ゴールデンデータセット全体を再実行する特別なジョブを実行します。これはシステム全体の中で最も厳格なゲートであり、禁忌ペアの重症度が格下げされた場合、いかなる手動オーバーライドも一切許可されません。"
      ),
      CODE(
        "yaml",
        "# .github/workflows/drug-safety-pipeline.yml\nname: drug-safety-ci\non: [pull_request, push, repository_dispatch]\njobs:\n  dosage-interaction-unit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run test:unit:dosage\n      - run: npm run test:unit:interaction\n  golden-dataset-integration:\n    needs: dosage-interaction-unit\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - run: docker compose -f docker-compose.test.yml up -d\n      - run: npm run test:golden-dataset -- --pairs=60\n  on-drugdb-sync:\n    if: github.event_name == 'repository_dispatch'\n    steps:\n      - run: npm run test:golden-dataset -- --pairs=60 --strict\n      - run: node scripts/gate-release.js --block-on=SEVERITY_DOWNGRADE --no-manual-override"
      ),
      TIP(
        "Theo dõi Grafana dashboard riêng cho: tỉ lệ đơn bị BLOCK/ngày theo mức độ, thời gian phản hồi p95 của Dosage Engine (<800ms), và số lần cảnh báo AI-assisted trả về UNGROUNDED — con số này tăng bất thường là dấu hiệu nguồn dữ liệu tham chiếu có vấn đề.",
        "Track a dedicated Grafana dashboard for: daily BLOCK rate by severity, Dosage Engine p95 response time (<800ms), and the count of AI-assisted alerts returning UNGROUNDED — an abnormal increase in this number signals a problem with the reference data source.",
        "重症度別の日次BLOCK率、Dosage Engineのp95応答時間（800ミリ秒未満）、UNGROUNDEDを返すAI支援警告の件数を専用のGrafanaダッシュボードで監視してください。この数値の異常な増加は、参照データソースに問題がある兆候です。"
      ),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
    blocks: [
      P(
        "AI Agent được dùng để soạn nội dung giải thích cảnh báo dễ hiểu hơn cho bác sĩ (ví dụ diễn giải cơ chế tương tác thuốc bằng ngôn ngữ tự nhiên) dựa trên nguồn tham chiếu đã được trích xuất sẵn từ cơ sở dữ liệu tương tác thuốc chuẩn — AI KHÔNG được tự quyết định mức độ nghiêm trọng hay tự tra cứu tương tác thuốc từ kiến thức nội tại của mình, vì rủi ro hallucination trong domain y tế là không thể chấp nhận được. Mọi output của AI Agent phải map được về đúng 1 bản ghi trong cơ sở dữ liệu tham chiếu (grounding 1-1), và nếu không tìm thấy nguồn, agent phải trả lời 'không đủ dữ liệu để giải thích' thay vì suy diễn.",
        "The AI Agent is used to draft more understandable alert explanations for doctors (e.g., explaining the drug-interaction mechanism in natural language) based on a reference source already extracted from the standard drug-interaction database — the AI must NOT decide severity itself or look up drug interactions from its own internal knowledge, since hallucination risk in the healthcare domain is unacceptable. Every AI Agent output must map to exactly one record in the reference database (1-to-1 grounding), and if no source is found, the agent must respond 'insufficient data to explain' rather than inferring.",
        "AIエージェントは、標準薬物相互作用データベースから既に抽出された参照ソースに基づき、医師にとってより理解しやすい警告説明（例：薬物相互作用の仕組みを自然言語で説明する）を作成するために使用されます。AIは重症度を自ら決定したり、自身の内部知識から薬物相互作用を検索したりしてはいけません。医療分野におけるハルシネーションのリスクは受け入れられないからです。AIエージェントのすべての出力は参照データベース内の正確に1件のレコードにマッピングされなければならず（1対1のグラウンディング）、ソースが見つからない場合、エージェントは推論するのではなく「説明するのに十分なデータがありません」と応答しなければなりません。"
      ),
      H("Ranh giới trách nhiệm AI vs người", "AI vs human responsibility boundary", "AIと人間の責任境界"),
      UL(
        ["AI: diễn giải cơ chế tương tác bằng ngôn ngữ dễ hiểu, dựa trên nguồn đã trích xuất sẵn", "AI: tóm tắt lịch sử cảnh báo tương tự để hỗ trợ bác sĩ ra quyết định nhanh hơn", "Người (dược sĩ lâm sàng): xác nhận mức độ nghiêm trọng gốc trong cơ sở dữ liệu tham chiếu", "Người: quyết định cuối cùng có kê đơn hay không khi có cảnh báo cần xác nhận"],
        ["AI: explains the interaction mechanism in understandable language, based on already-extracted sources", "AI: summarizes similar historical alerts to help doctors decide faster", "Human (clinical pharmacist): confirms the original severity level in the reference database", "Human: makes the final decision whether to prescribe when a confirmation-required alert appears"],
        ["AI：既に抽出済みのソースに基づき、相互作用の仕組みを分かりやすい言葉で説明する", "AI：類似の過去警告を要約し、医師がより迅速に判断できるよう支援する", "人間（臨床薬剤師）：参照データベース内の元の重症度レベルを確認する", "人間：確認必須の警告が表示された際に処方するかどうかの最終決定を下す"]
      ),
      NOTE(
        "Mọi tương tác giữa bác sĩ và giải thích AI-assisted đều được log kèm groundingStatus, phục vụ audit sau này nếu có sự cố lâm sàng cần truy vết xem bác sĩ đã nhận được thông tin gì tại thời điểm kê đơn.",
        "Every interaction between a doctor and an AI-assisted explanation is logged with groundingStatus, serving later audits if a clinical incident requires tracing exactly what information the doctor received at prescribing time.",
        "医師とAI支援説明とのすべてのやり取りはgroundingStatusとともにログに記録され、臨床インシデントが発生した際に処方時点で医師がどのような情報を受け取ったかを追跡する必要がある場合の後の監査に役立ちます。"
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Tại sao kiểm thử hệ thống kê đơn thuốc khác biệt căn bản so với kiểm thử hệ thống tài chính?",
        "Why is testing a prescription system fundamentally different from testing a financial system?",
        "Vì hậu quả của một lỗi bỏ sót là trực tiếp đe doạ tính mạng bệnh nhân, không thể 'hoàn tác giao dịch' như sai sót tài chính — điều này đòi hỏi mức độ nghiêm ngặt cao hơn: bất kỳ cặp thuốc chống chỉ định nào cũng phải BLOCK cứng không override, và mọi cảnh báo phải có nguồn gốc kiểm chứng (grounding) thay vì suy luận, đặc biệt khi có AI tham gia soạn nội dung.",
        "Because the consequence of a missed error directly threatens a patient's life, unlike a financial mistake that can be 'rolled back' — this demands a far higher rigor: any contraindicated drug pair must hard-BLOCK with no override, and every alert must be grounded in a verified source rather than inferred, especially when AI is involved in drafting content.",
        "処方箋システムのテストが金融システムのテストと根本的に異なるのはなぜですか。",
        "見落としの結果が、金融の誤りのように「取引を取り消す」ことができるものではなく、患者の生命を直接的に脅かすためです。これははるかに高い厳格さを要求します。禁忌となる薬剤ペアはいかなるものもオーバーライドなしに強制BLOCKされなければならず、特にAIが内容作成に関与する場合、すべての警告は推論ではなく検証済みのソースにグラウンディングされていなければなりません。"
      ),
      QA(
        "Nếu dữ liệu chức năng thận (eGFR) của bệnh nhân bị thiếu, hệ thống nên xử lý thế nào và tại sao?",
        "If a patient's renal-function data (eGFR) is missing, how should the system handle it, and why?",
        "Không được mặc định coi thiếu dữ liệu là 'chức năng thận bình thường' — phải trả về trạng thái yêu cầu kiểm tra xét nghiệm bắt buộc (REQUIRES_LAB_CHECK) trước khi cho phép kê các thuốc cần điều chỉnh theo thận, vì giả định sai có thể dẫn tới quá liều nghiêm trọng ở bệnh nhân suy thận chưa được phát hiện.",
        "Missing data must never default to 'normal renal function' — it must return a mandatory-lab-check-required status (REQUIRES_LAB_CHECK) before allowing prescription of renally adjusted drugs, since a wrong assumption could lead to severe overdose in a patient with undetected renal impairment.",
        "患者の腎機能データ（eGFR）が欠落している場合、システムはどう処理すべきで、それはなぜですか。",
        "データ欠落をデフォルトで「腎機能正常」とみなしてはいけません。腎機能による調整が必要な薬剤の処方を許可する前に、必須の検査確認が必要（REQUIRES_LAB_CHECK）というステータスを返さなければなりません。誤った仮定は、未発見の腎機能障害を持つ患者における重篤な過剰投与につながる可能性があるためです。"
      ),
      QA(
        "Bạn kiểm thử tính năng cảnh báo do AI hỗ trợ soạn nội dung như thế nào để tránh rủi ro hallucination?",
        "How would you test an AI-assisted alert-content feature to avoid hallucination risk?",
        "Kiểm tra grounding: mọi output AI phải trace được về đúng 1 nguồn dữ liệu tham chiếu cụ thể (drugId, documentId), không được để AI tự tra cứu hay suy luận tương tác thuốc từ kiến thức nội tại. Nếu không tìm thấy nguồn, hệ thống phải trả về trạng thái 'không đủ dữ liệu' rõ ràng thay vì cho AI tự bịa nội dung trông có vẻ hợp lý.",
        "Verify grounding: every AI output must trace back to exactly one specific reference data source (drugId, documentId); the AI must never look up or infer drug interactions from its own internal knowledge. If no source is found, the system must clearly return an 'insufficient data' status rather than letting the AI fabricate plausible-looking content.",
        "AI支援の警告内容作成機能をハルシネーションのリスクを避けるためにどのようにテストしますか。",
        "グラウンディングを検証します。AIのすべての出力は正確に1つの具体的な参照データソース（drugId、documentId）に遡って追跡できなければならず、AIが自身の内部知識から薬物相互作用を検索・推論することは決してあってはなりません。ソースが見つからない場合、システムはAIにもっともらしく見える内容を捏造させるのではなく、明確に「データ不足」ステータスを返さなければなりません。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi",
        "Interviewer's prompt",
        "Một bản cập nhật cơ sở dữ liệu tương tác thuốc vô tình hạ mức độ nghiêm trọng của một cặp thuốc chống chỉ định xuống mức 'cần xác nhận' trong 3 ngày trước khi bị phát hiện. Bạn sẽ thiết kế cơ chế phát hiện sớm nào để tránh lặp lại sự cố này?",
        "A drug-interaction database update accidentally downgraded a contraindicated pair's severity to 'confirmation-required' for 3 days before detection. What early-detection mechanism would you design to prevent this recurring?",
        "面接官の質問",
        "薬物相互作用データベースの更新により、誤って禁忌ペアの重症度が「確認必須」に格下げされ、発見されるまで3日間その状態が続きました。この再発を防ぐため、どのような早期検出機構を設計しますか。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán kê đơn điện tử và kiểm tra an toàn thuốc là ví dụ rõ nét nhất về kiểm thử có rủi ro trực tiếp tới tính mạng con người, đòi hỏi mức độ nghiêm ngặt cao hơn hẳn các domain khác: mọi cặp thuốc chống chỉ định phải BLOCK cứng tuyệt đối không override, mọi liều phải nằm trong khoảng an toàn tính theo snapshot dữ liệu cố định, và mọi nội dung AI-assisted phải có grounding kiểm chứng được. Sau khi áp dụng golden dataset 60 cặp thuốc, job tái kiểm tra hậu kiểm hàng ngày, và gate CI chặn cứng khi phát hiện hạ mức độ nghiêm trọng ngoài ý muốn, đội QA giữ vững tỉ lệ 100% ca chống chỉ định bị chặn qua 4 quý liên tiếp và phát hiện sớm 2 sự cố cập nhật dữ liệu bên thứ ba tiềm ẩn nguy hiểm trước khi ảnh hưởng bệnh nhân thật.",
        "The e-prescription and drug-safety testing problem is the clearest example of testing with a direct risk to human life, demanding far higher rigor than other domains: every contraindicated drug pair must hard-BLOCK with absolutely no override, every dose must fall within a safe range computed from a fixed data snapshot, and every AI-assisted content must have verifiable grounding. After adopting the 60-pair golden dataset, a daily back-office re-check job, and a hard CI gate blocking on any unintended severity downgrade, the QA team maintained a 100% block rate for contraindication cases across four consecutive quarters and caught 2 potentially dangerous third-party data-update incidents early, before any real patient was affected.",
        "電子処方箋と薬剤安全性チェックのテスト問題は、他のドメインよりもはるかに高い厳格さを要求する、人命への直接的なリスクを伴うテストの最も明確な例です。すべての禁忌薬剤ペアは絶対にオーバーライドなしに強制BLOCKされなければならず、すべての用量は固定されたデータスナップショットから計算された安全範囲内になければならず、すべてのAI支援コンテンツは検証可能なグラウンディングを持たなければなりません。60ペアのゴールデンデータセット、毎日のバックオフィス再チェックジョブ、意図しない重症度格下げをブロックする厳格なCIゲートを採用した結果、QAチームは4四半期連続で禁忌ケースのブロック率100%を維持し、実際の患者に影響が及ぶ前に、潜在的に危険な2件のサードパーティデータ更新インシデントを早期に発見しました。"
      ),
      H("Checklist bàn giao", "Handover checklist", "引き継ぎチェックリスト"),
      UL(
        ["☑ Golden dataset 60 cặp thuốc được dược sĩ lâm sàng ký duyệt", "☑ Mọi cặp chống chỉ định BLOCK cứng, không override ở bất kỳ vai trò nào", "☑ Oracle liều độc lập theo cân nặng/tuổi/eGFR, snapshot cố định tại thời điểm kê đơn", "☑ Grounding check bắt buộc cho mọi cảnh báo AI-assisted", "☑ Job tái kiểm tra hậu kiểm hàng ngày + escalate tức thời tới Clinical Safety Officer", "☑ Gate CI chặn cứng khi phát hiện hạ mức độ nghiêm trọng ngoài ý muốn"],
        ["☑ 60-pair golden dataset signed off by a clinical pharmacist", "☑ Every contraindicated pair hard-BLOCKs, overridable by no role", "☑ Independent dosage oracle by weight/age/eGFR, fixed snapshot at prescribing time", "☑ Mandatory grounding check for every AI-assisted alert", "☑ Daily back-office re-check job + instant escalation to the Clinical Safety Officer", "☑ Hard CI gate blocking on any unintended severity downgrade"],
        ["☑ 臨床薬剤師が承認したゴールデンデータセット60薬剤ペア", "☑ すべての禁忌ペアが強制BLOCKされ、いかなる役割によってもオーバーライド不可", "☑ 体重・年齢・eGFRによる独立した用量オラクル、処方時点で固定されたスナップショット", "☑ すべてのAI支援警告に対する必須のグラウンディングチェック", "☑ 毎日のバックオフィス再チェックジョブ＋Clinical Safety Officerへの即時エスカレーション", "☑ 意図しない重症度格下げ発生時に厳格にブロックするCIゲート"]
      ),
      TIP(
        "Khi bàn giao hệ thống này, luôn nhấn mạnh với đội mới rằng đây là domain có 'zero tolerance' cho lỗi bỏ sót an toàn — văn hoá review ở đây phải khác hẳn các dự án thông thường, ưu tiên tuyệt đối cho đúng đắn hơn tốc độ phát triển.",
        "When handing over this system, always stress to the new team that this is a 'zero tolerance' domain for safety-check misses — the review culture here must differ sharply from ordinary projects, with correctness taking absolute priority over development speed.",
        "このシステムを引き継ぐ際は、新しいチームに対し、これが安全チェックの見落としに対して「ゼロトレランス」のドメインであることを常に強調してください。ここでのレビュー文化は通常のプロジェクトとは大きく異なる必要があり、開発速度よりも正確性が絶対的に優先されます。"
      ),
    ],
  },
];

const art4 = {
  categorySlug: "enterprise-realworld",
  slug: "healthcare-eprescription-drug-interaction",
  cover: cover4,
  tags: tags("thucchien", "healthcare", "api", "aitesting", "playwright", "realworld"),
  title: {
    vi: "Thực chiến y tế: kê đơn điện tử, kiểm tra tương tác thuốc & an toàn liều dùng",
    en: "Enterprise healthcare: e-prescription, drug interaction & dosage safety testing",
    ja: "実戦・医療：電子処方箋、薬物相互作用チェックと用量安全性のテスト",
  },
  summary: {
    vi: "Bài sâu 14 chương: kiến trúc drug safety, bất biến chặn chống chỉ định & liều an toàn, oracle độc lập theo cân nặng/eGFR, grounding cảnh báo AI, đối soát, CI/CD, phỏng vấn.",
    en: "14-chapter deep dive: drug-safety architecture, contraindication-block & safe-dose invariants, independent weight/eGFR oracle, AI alert grounding, reconciliation, CI/CD, interview.",
    ja: "14章にわたる詳細解説：薬剤安全性アーキテクチャ、禁忌ブロック・安全用量の不変条件、体重・eGFRによる独立オラクル、AI警告のグラウンディング、突合、CI/CD、面接対策。",
  },
  pages: buildDoc(pages4),
};

export const THUCCHIEN_02_DOCS = [art1, art2, art3, art4];
