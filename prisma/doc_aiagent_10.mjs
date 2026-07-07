// ============================================================================
// AIAGENT_10 — 2 bài "Tích hợp" (kind=tichhop).
// A: AI agent + k6 load testing + observability (fintech) — SLO oracle, CI gating.
// B: Contract testing giữa microservices + AI agent + CI (banking) — PACT, oracle=tương thích hợp đồng.
// Trilingual VI/EN/JA (JA thật, khác EN). Oracle-first: khẳng định BẤT BIẾN nghiệp vụ/SLO/hợp đồng.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia10a", domain: "fintech", kind: "tichhop", label: "K6·AI·OBSERVE" });
const coverB = makeThumb({ id: "aia10b", domain: "banking", kind: "tichhop", label: "CONTRACT·AI·CI" });

const pagesA = [];
const pagesB = [];

/* =========================================================================
 * ARTICLE A — Tích hợp k6 + AI agent + observability (fintech). Oracle = SLO.
 * ========================================================================= */

pagesA.push({
  heading: {
    vi: "1. Bối cảnh & oracle: SLO là chân lý, không phải 'chạy nhanh'",
    en: "1. Context & oracle: the SLO is the truth, not 'it felt fast'",
    ja: "1. 背景とオラクル：真実はSLOであり「速そう」ではない",
  },
  blocks: [
    P(
      "Chúng ta làm việc trên một nền tảng fintech xử lý ví điện tử và thanh toán QR cho khoảng ba triệu người dùng, cao điểm giờ trưa và tối lên tới mười hai nghìn giao dịch mỗi phút. Với hệ thống tiền bạc, 'nhanh' không phải một cảm giác mà là một cam kết đo được: SLO nói rằng p95 của API tạo giao dịch phải dưới bốn trăm mili-giây và tỉ lệ lỗi phải dưới nửa phần trăm trong cửa sổ trượt năm phút. Bài viết này ghép ba mảnh thường bị làm rời rạc: kiểm thử tải bằng k6, một AI agent để đề xuất kịch bản và đọc trace/metric, và observability để nhìn xuyên hệ thống. Điểm mấu chốt đặt lên đầu tiên: oracle của chúng ta là SLO, chứ không phải 'màn hình phản hồi mượt'.",
      "We work on a fintech platform running e-wallets and QR payments for around three million users, with lunch and evening peaks reaching twelve thousand transactions per minute. For a money system, 'fast' is not a feeling but a measurable commitment: the SLO states that the p95 of the create-transaction API must be under four hundred milliseconds and the error rate under half a percent over a five-minute sliding window. This article stitches together three pieces that are usually kept apart: load testing with k6, an AI agent to propose scenarios and read traces/metrics, and observability to see through the system. The key point up front: our oracle is the SLO, not 'the screen felt smooth'.",
      "私たちはeウォレットとQR決済を約300万ユーザーに提供するフィンテック基盤で作業しており、昼と夜のピークは毎分1万2千件の取引に達します。金銭を扱うシステムでは「速い」は感覚ではなく測定可能な約束です。SLOは、取引作成APIのp95が400ミリ秒未満、エラー率が5分のスライディングウィンドウで0.5パーセント未満であることを定めます。本稿は通常ばらばらに扱われる3つの要素をつなぎます。k6による負荷テスト、シナリオを提案しトレースとメトリクスを読むAIエージェント、そしてシステムを見通すオブザーバビリティです。最初に置く要点は、私たちのオラクルはSLOであって「画面が滑らかに感じた」ではないということです。"
    ),
    P(
      "Vì sao phải nhấn mạnh oracle? Bởi một bài kiểm thử tải mà chỉ in ra 'đã gửi mười nghìn request' thì không nói được điều gì về sức khỏe hệ thống. Chúng ta cần khẳng định những bất biến có ý nghĩa: dưới tải mục tiêu, p95 vẫn nằm trong ngân sách; không có request nào trả về mã 5xx quá ngưỡng; không giao dịch nào bị ghi hai lần khi client thử lại; và độ trễ hàng đợi ghi sổ kế toán không phình ra vô hạn. AI agent trong kiến trúc này không được phép tự phán 'đạt' hay 'trượt' — nó chỉ đề xuất kịch bản và tóm tắt bằng chứng, còn quyết định gate vẫn dựa trên ngưỡng SLO mã hóa cứng và một người review.",
      "Why insist on the oracle? Because a load test that only prints 'sent ten thousand requests' says nothing about system health. We must assert meaningful invariants: under target load the p95 stays within budget; no request returns 5xx above a threshold; no transaction is double-written when the client retries; and the ledger write-queue latency does not balloon without bound. The AI agent in this architecture is not allowed to declare 'pass' or 'fail' on its own — it only proposes scenarios and summarizes evidence, while the gate decision rests on hard-coded SLO thresholds and a human reviewer.",
      "なぜオラクルにこだわるのか。「1万リクエストを送信した」とだけ出力する負荷テストは、システムの健全性について何も語らないからです。意味のある不変条件をアサーションしなければなりません。目標負荷下でp95が予算内に収まること、5xxを返すリクエストがしきい値を超えないこと、クライアントが再試行しても取引が二重書き込みされないこと、そして台帳書き込みキューのレイテンシが無限に膨張しないこと。このアーキテクチャのAIエージェントは自身で「合格」「不合格」を宣言できません。シナリオを提案し証拠を要約するだけで、ゲートの判断はハードコードされたSLOしきい値と人間のレビュアーに委ねられます。"
    ),
    IMG(
      `<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="250" rx="12" fill="#0b1220"/>
<rect x="24" y="40" width="140" height="70" rx="10" fill="#155e63" stroke="#7dd3fc" stroke-width="2"/>
<text x="94" y="70" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">AI Agent</text>
<text x="94" y="90" text-anchor="middle" fill="#bae6fd" font-size="10">propose scenarios</text>
<rect x="24" y="150" width="140" height="70" rx="10" fill="#155e63" stroke="#7dd3fc" stroke-width="2"/>
<text x="94" y="180" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">k6</text>
<text x="94" y="200" text-anchor="middle" fill="#bae6fd" font-size="10">generate load</text>
<rect x="260" y="95" width="150" height="70" rx="10" fill="#0369a1" stroke="#7dd3fc" stroke-width="2"/>
<text x="335" y="125" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">System Under Test</text>
<text x="335" y="145" text-anchor="middle" fill="#bae6fd" font-size="10">API · ledger · queue</text>
<rect x="500" y="40" width="140" height="70" rx="10" fill="#0f766e" stroke="#7dd3fc" stroke-width="2"/>
<text x="570" y="70" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">Observability</text>
<text x="570" y="90" text-anchor="middle" fill="#bae6fd" font-size="10">metrics · traces</text>
<rect x="500" y="150" width="140" height="70" rx="10" fill="#7c2d12" stroke="#fca5a5" stroke-width="2"/>
<text x="570" y="180" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">SLO Gate</text>
<text x="570" y="200" text-anchor="middle" fill="#fecaca" font-size="10">p95 · error rate</text>
<g stroke="#7dd3fc" stroke-width="2" fill="none">
<path d="M164 75 L260 120"/><path d="M164 185 L260 140"/>
<path d="M410 120 L500 75"/><path d="M410 140 L500 185"/>
<path d="M570 110 L570 150" stroke-dasharray="4 4"/>
</g>
</svg>`,
      "Kiến trúc tích hợp: agent đề xuất kịch bản, k6 tạo tải, hệ thống bị đo bằng observability, cổng SLO ra quyết định.",
      "Integrated architecture: the agent proposes scenarios, k6 generates load, the system is measured by observability, the SLO gate decides.",
      "統合アーキテクチャ：エージェントがシナリオを提案し、k6が負荷を生成し、システムはオブザーバビリティで測定され、SLOゲートが判断します。"
    ),
    NOTE(
      "Quy ước xuyên bài: 'oracle-first' nghĩa là ta viết ngưỡng SLO trước, rồi mới thiết kế kịch bản để thử phá vỡ ngưỡng đó.",
      "Convention throughout: 'oracle-first' means we write the SLO thresholds first, then design scenarios to try to break them.",
      "本稿の方針：「オラクル優先」とは、先にSLOしきい値を書き、その後でそれを破ろうとするシナリオを設計することを意味します。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Ranh giới của AI agent: nó đề xuất, con người quyết",
    en: "2. The AI agent's boundary: it proposes, humans decide",
    ja: "2. AIエージェントの境界：提案はする、決めるのは人間",
  },
  blocks: [
    P(
      "AI agent ở đây có ba nhiệm vụ rõ ràng và một danh sách dài những việc nó không được làm. Nó được phép: đọc đặc tả OpenAPI và lịch sử traffic để đề xuất hồ sơ tải (ramp-up, số VU, phân bố endpoint); đọc kết quả k6 cùng metric và trace để tóm tắt điểm nghẽn; và gợi ý ngưỡng cảnh báo dựa trên dữ liệu lịch sử. Nó không được phép: tự sửa ngưỡng SLO, tự đánh dấu một lần chạy là 'đạt', hay tự merge thay đổi vào nhánh chính. Ranh giới này quan trọng vì mô hình ngôn ngữ có thể ảo giác (ハルシネーション) — nó có thể 'tự tin' kết luận sai nếu ta để nó tự phán quyết.",
      "The AI agent here has three clear jobs and a long list of things it must not do. It may: read the OpenAPI spec and traffic history to propose load profiles (ramp-up, VU count, endpoint distribution); read k6 results together with metrics and traces to summarize bottlenecks; and suggest alert thresholds based on historical data. It may not: change SLO thresholds, mark a run as 'pass' by itself, or merge changes into the main branch. This boundary matters because a language model can hallucinate — it can 'confidently' reach a wrong conclusion if we let it be the judge.",
      "ここでのAIエージェントには明確な3つの仕事と、してはならないことの長いリストがあります。許可されるのは、OpenAPI仕様とトラフィック履歴を読んで負荷プロファイル（ランプアップ、VU数、エンドポイント分布）を提案すること、k6の結果をメトリクスやトレースと合わせて読みボトルネックを要約すること、履歴データに基づいてアラートしきい値を提案することです。許可されないのは、SLOしきい値の変更、実行を自分で「合格」と判定すること、変更をメインブランチにマージすることです。言語モデルはハルシネーションを起こしうるため、この境界は重要です。判定を任せると自信を持って誤った結論に達する可能性があります。"
    ),
    P(
      "Để chống ảo giác, ta áp dụng grounding: mọi kết luận của agent phải trích dẫn số liệu thật từ tệp kết quả k6 (summary.json) hoặc từ hệ observability, kèm mã truy vết. Nếu agent nói 'endpoint /pay chậm ở p99', câu đó phải đi kèm giá trị p99 cụ thể và khoảng thời gian lấy mẫu. Reviewer con người đọc bản tóm tắt có trích dẫn, đối chiếu nhanh với dashboard, rồi mới bấm phê duyệt. Cách này giữ tốc độ mà không đánh đổi độ tin cậy: agent làm phần đọc-tổng-hợp tốn công, con người giữ phần phán quyết.",
      "To fight hallucination we apply grounding: every agent conclusion must cite real numbers from the k6 result file (summary.json) or from the observability stack, with a trace reference. If the agent says '/pay is slow at p99', that statement must carry the concrete p99 value and the sampling window. A human reviewer reads the cited summary, cross-checks it quickly against the dashboard, then approves. This keeps speed without trading away trust: the agent does the tedious read-and-synthesize work, the human keeps the verdict.",
      "ハルシネーションに対抗するためグラウンディングを適用します。エージェントのすべての結論は、k6結果ファイル（summary.json）またはオブザーバビリティ基盤の実際の数値を、トレース参照とともに引用しなければなりません。エージェントが「/payはp99で遅い」と言うなら、その文には具体的なp99値とサンプリング期間が付いていなければなりません。人間のレビュアーは引用付きの要約を読み、ダッシュボードと素早く突き合わせてから承認します。これにより信頼を犠牲にせず速度を保てます。エージェントは手間のかかる読み取りと統合を行い、人間が判定を握ります。"
    ),
    UL(
      ["Agent ĐƯỢC: đề xuất hồ sơ tải, tóm tắt điểm nghẽn có trích dẫn, gợi ý ngưỡng cảnh báo.",
       "Agent KHÔNG: sửa SLO, tự phán đạt/trượt, tự merge.",
       "Con người GIỮ: định nghĩa SLO, phê duyệt gate, sở hữu ca rủi ro cao (thanh toán, hoàn tiền)."],
      ["Agent MAY: propose load profiles, summarize bottlenecks with citations, suggest alert thresholds.",
       "Agent MUST NOT: change SLO, self-judge pass/fail, self-merge.",
       "Humans KEEP: SLO definition, gate approval, ownership of high-risk cases (payment, refund)."],
      ["エージェントが可能：負荷プロファイルの提案、引用付きのボトルネック要約、アラートしきい値の提案。",
       "エージェント禁止：SLOの変更、合否の自己判定、自己マージ。",
       "人間が保持：SLOの定義、ゲート承認、高リスクケース（支払い、返金）の所有。"]
    ),
    WARN(
      "Đừng bao giờ để agent tự viết lại ngưỡng SLO khi bài chạy trượt. Đó là 'dời cột gôn' — biến cổng chất lượng thành vô nghĩa.",
      "Never let the agent rewrite SLO thresholds when a run fails. That is 'moving the goalposts' — it renders the quality gate meaningless.",
      "実行が失敗したときにエージェントがSLOしきい値を書き換えることを決して許してはいけません。それは「ゴールポストを動かす」ことであり、品質ゲートを無意味にします。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Định nghĩa SLO/SLI thành mã: nguồn sự thật duy nhất",
    en: "3. Encoding SLO/SLI as code: a single source of truth",
    ja: "3. SLO/SLIをコード化する：唯一の信頼できる情報源",
  },
  blocks: [
    P(
      "Trước khi viết bất kỳ kịch bản k6 nào, ta cần cố định SLI (chỉ số ta đo) và SLO (ngưỡng ta cam kết) dưới dạng mã có thể diff và review. SLI của chúng ta gồm: độ trễ p95 và p99 của các endpoint quan trọng, tỉ lệ lỗi phân theo mã trạng thái, và thông lượng thành công. SLO đặt ngân sách cụ thể trên từng SLI. Việc mã hóa vào một tệp YAML duy nhất giúp cả k6, hệ cảnh báo và cổng CI đọc chung một nguồn — không ai được phép giữ 'ngưỡng riêng' trong đầu. Đây chính là oracle mà mọi thành phần khác phải phục tùng.",
      "Before writing any k6 scenario, we must fix the SLIs (what we measure) and SLOs (the thresholds we commit to) as code that can be diffed and reviewed. Our SLIs include: p95 and p99 latency of critical endpoints, error rate split by status code, and successful throughput. The SLOs put concrete budgets on each SLI. Encoding them into a single YAML file lets k6, the alerting system, and the CI gate read one source — nobody is allowed to keep a 'private threshold' in their head. This is precisely the oracle every other component must obey.",
      "k6シナリオを書く前に、SLI（測定する指標）とSLO（約束するしきい値）を、差分表示とレビューが可能なコードとして固定する必要があります。私たちのSLIには、重要エンドポイントのp95・p99レイテンシ、ステータスコード別のエラー率、成功スループットが含まれます。SLOは各SLIに具体的な予算を設定します。これらを単一のYAMLファイルにコード化することで、k6・アラートシステム・CIゲートが1つの情報源を読みます。誰も「自分だけのしきい値」を頭の中に持つことは許されません。これがまさに、他のすべてのコンポーネントが従うべきオラクルです。"
    ),
    CODE("yaml", `# slo.yaml — nguồn sự thật duy nhất cho oracle hiệu năng
service: wallet-payment-api
window: 5m            # cửa sổ trượt đánh giá
slos:
  - sli: latency_p95_ms
    endpoint: POST /v1/transactions
    threshold: 400     # p95 < 400ms
    comparator: "<"
  - sli: latency_p99_ms
    endpoint: POST /v1/transactions
    threshold: 900
    comparator: "<"
  - sli: error_rate
    scope: all
    threshold: 0.005   # < 0.5%
    comparator: "<"
  - sli: throughput_ok_rps
    scope: all
    threshold: 150     # phải chịu >= 150 rps thành công
    comparator: ">="
guardrails:
  agent_may_edit: false   # agent KHÔNG được sửa file này
  human_approver: "qa-lead"`),
    P(
      "Lưu ý cách chúng ta gắn comparator rõ ràng cho từng SLI. Điều này quan trọng vì có chỉ số cần nhỏ hơn (độ trễ, tỉ lệ lỗi) và có chỉ số cần lớn hơn (thông lượng thành công). Khi cổng CI đọc tệp này, nó không đoán chiều so sánh mà tuân theo đúng khai báo. Trường 'agent_may_edit: false' được chương trình CI thực thi cứng: nếu agent gửi PR chạm vào slo.yaml, pipeline tự động từ chối. Nhờ vậy oracle không thể bị bào mòn một cách vô tình hay cố ý.",
      "Note how we attach an explicit comparator to each SLI. This matters because some metrics must be lower (latency, error rate) and some must be higher (successful throughput). When the CI gate reads this file it does not guess the comparison direction; it follows the declaration exactly. The 'agent_may_edit: false' field is hard-enforced by the CI program: if the agent opens a PR touching slo.yaml, the pipeline auto-rejects it. This way the oracle cannot be eroded, accidentally or deliberately.",
      "各SLIに明示的な比較演算子を付けている点に注目してください。レイテンシやエラー率のように小さい方が良い指標と、成功スループットのように大きい方が良い指標があるため、これは重要です。CIゲートはこのファイルを読むとき、比較方向を推測せず宣言に正確に従います。「agent_may_edit: false」フィールドはCIプログラムによって厳格に強制されます。エージェントがslo.yamlに触れるPRを開くと、パイプラインは自動的に却下します。こうしてオラクルは、偶然にも故意にも侵食されえません。"
    ),
    TIP(
      "Đặt SLO gần với hợp đồng nghiệp vụ, không phải với năng lực phần cứng hiện tại. SLO phản ánh điều người dùng chịu được, không phản ánh 'máy hiện chạy được bao nhiêu'.",
      "Set SLOs close to the business contract, not to current hardware capacity. An SLO reflects what users can tolerate, not 'what the box happens to do today'.",
      "SLOは現在のハードウェア性能ではなく、業務契約に近づけて設定してください。SLOはユーザーが許容できるものを反映し、「今の機材がたまたま出せる値」を反映しません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Agent đề xuất hồ sơ tải từ đặc tả & traffic thật",
    en: "4. The agent proposes a load profile from spec & real traffic",
    ja: "4. エージェントが仕様と実トラフィックから負荷プロファイルを提案",
  },
  blocks: [
    P(
      "Bước đầu tiên của agent là biến hiểu biết về hệ thống thành một hồ sơ tải có căn cứ. Thay vì đoán 'chạy một nghìn VU', agent đọc phân bố endpoint trong bảy ngày traffic gần nhất, nhận ra rằng tạo giao dịch chiếm khoảng sáu mươi phần trăm, tra cứu số dư chiếm ba mươi phần trăm, phần còn lại là lịch sử và hồ sơ. Nó đề xuất một hồ sơ ramp-up phản ánh đúng tỉ lệ đó và mô phỏng cao điểm giờ trưa. Quan trọng: agent xuất ra đề xuất dưới dạng JSON có cấu trúc để con người review, chứ không tự chạy.",
      "The agent's first step is to turn its understanding of the system into a grounded load profile. Instead of guessing 'run a thousand VUs', the agent reads the endpoint distribution across the last seven days of traffic, learns that create-transaction is about sixty percent, balance lookup thirty percent, the rest history and profile. It proposes a ramp-up profile that reflects those ratios and simulates the lunch peak. Crucially, the agent emits its proposal as structured JSON for a human to review, rather than running it itself.",
      "エージェントの最初のステップは、システムの理解を根拠のある負荷プロファイルに変えることです。「1000 VUで実行」と推測する代わりに、エージェントは直近7日間のトラフィックのエンドポイント分布を読み、取引作成が約60パーセント、残高照会が30パーセント、残りが履歴とプロフィールであることを学びます。その比率を反映しランプアップし昼のピークを模擬するプロファイルを提案します。重要なのは、エージェントが提案を構造化JSONとして出力し人間がレビューすることで、自分では実行しない点です。"
    ),
    CODE("json", `// agent-proposal.json — đề xuất hồ sơ tải (chờ con người duyệt)
{
  "rationale": "Phân bố dựa trên traffic 7 ngày; mô phỏng cao điểm 11:30-13:00",
  "evidence": { "source": "obs://traffic/7d", "sampled": 4210338 },
  "stages": [
    { "duration": "2m", "target": 50,  "note": "warm-up" },
    { "duration": "5m", "target": 200, "note": "ramp to peak" },
    { "duration": "10m","target": 200, "note": "hold at peak" },
    { "duration": "3m", "target": 0,   "note": "ramp-down" }
  ],
  "mix": [
    { "endpoint": "POST /v1/transactions", "weight": 0.60 },
    { "endpoint": "GET  /v1/balance",      "weight": 0.30 },
    { "endpoint": "GET  /v1/history",      "weight": 0.10 }
  ],
  "requires_human_review": true
}`),
    P(
      "Reviewer nhìn vào trường 'rationale' và 'evidence' để kiểm tra xem đề xuất có căn cứ hay chỉ là con số đẹp. Nếu agent đề xuất giữ hai trăm VU nhưng traffic thật cao điểm chỉ tương đương một trăm hai mươi, reviewer có thể yêu cầu giải thích hoặc điều chỉnh — có thể ta cố ý muốn thử ở một trăm năm mươi phần trăm cao điểm để dự phòng tăng trưởng. Trường 'requires_human_review' luôn bằng true; pipeline sẽ không nhận một hồ sơ tải chưa được người ký duyệt. Ở đây ta thấy rõ triết lý: agent tăng tốc soạn thảo, còn phán quyết vẫn ở con người.",
      "The reviewer looks at the 'rationale' and 'evidence' fields to check whether the proposal is grounded or just a nice-looking number. If the agent proposes holding two hundred VUs but real peak traffic only equates to about one hundred twenty, the reviewer can ask for justification or adjust — perhaps we deliberately want to test at one hundred fifty percent of peak to leave room for growth. The 'requires_human_review' field is always true; the pipeline will not accept a load profile without a human sign-off. Here the philosophy is clear: the agent accelerates authoring, the verdict stays with the human.",
      "レビュアーは「rationale」と「evidence」フィールドを見て、提案が根拠あるものか単に見栄えの良い数字かを確認します。エージェントが200 VUの維持を提案するのに実際のピークトラフィックが約120相当なら、レビュアーは正当化を求めるか調整できます。成長の余地のため意図的にピークの150パーセントで試したい場合もあるでしょう。「requires_human_review」フィールドは常にtrueであり、パイプラインは人間の承認なしに負荷プロファイルを受け付けません。ここで哲学は明確です。エージェントは作成を加速し、判定は人間に残ります。"
    ),
    SCEN(
      "Đề xuất bị bác vì thiếu grounding",
      "A proposal rejected for lack of grounding",
      "Một agent mới huấn luyện đề xuất năm trăm VU 'để chắc chắn'. Reviewer hỏi bằng chứng; trường evidence trỏ tới một mẫu chỉ ba nghìn request — quá nhỏ và lệch giờ thấp điểm. Reviewer bác đề xuất, yêu cầu lấy mẫu đại diện đủ bảy ngày. Bài học: con số lớn không đồng nghĩa an toàn; grounding kém dẫn tới lãng phí và kết luận sai.",
      "A freshly tuned agent proposes five hundred VUs 'to be safe'. The reviewer asks for evidence; the evidence field points to a sample of only three thousand requests — too small and skewed to an off-peak hour. The reviewer rejects the proposal and requires a representative seven-day sample. Lesson: a big number is not safety; weak grounding leads to waste and wrong conclusions.",
      "調整したてのエージェントが「念のため」500 VUを提案します。レビュアーが証拠を求めると、evidenceフィールドはわずか3千リクエストのサンプルを指しており、小さすぎて閑散時間に偏っています。レビュアーは提案を却下し、7日間の代表的なサンプルを要求します。教訓：大きな数字は安全ではなく、弱いグラウンディングは無駄と誤った結論を招きます。",
      "グラウンディング不足で却下された提案"
    ),
  ],
});


pagesA.push({
  heading: {
    vi: "5. Viết kịch bản k6 với threshold gắn thẳng vào SLO",
    en: "5. Writing the k6 script with thresholds bound to the SLO",
    ja: "5. SLOに紐づくしきい値を持つk6スクリプトを書く",
  },
  blocks: [
    P(
      "Sau khi hồ sơ tải được duyệt, ta hiện thực hóa nó thành một kịch bản k6. Điểm mấu chốt là các threshold trong k6 không phải con số tùy ý mà được sinh ra từ slo.yaml, bảo đảm bài chạy dùng đúng oracle với cổng CI. k6 hỗ trợ khai báo threshold theo metric, và khi một threshold bị vi phạm, tiến trình k6 kết thúc với mã lỗi khác không — đây chính là tín hiệu để CI chặn phát hành. Ta cũng đo custom metric riêng cho từng endpoint quan trọng để phân tích sau này chính xác hơn.",
      "Once the load profile is approved, we realize it as a k6 script. The key point is that k6 thresholds are not arbitrary numbers but generated from slo.yaml, ensuring the run uses the same oracle as the CI gate. k6 supports declaring thresholds per metric, and when a threshold is violated the k6 process exits with a non-zero code — this is exactly the signal for CI to block the release. We also record custom metrics per critical endpoint for more precise later analysis.",
      "負荷プロファイルが承認されたら、それをk6スクリプトとして実現します。重要なのは、k6のしきい値が任意の数字ではなくslo.yamlから生成される点で、実行がCIゲートと同じオラクルを使うことを保証します。k6はメトリクスごとのしきい値宣言をサポートし、しきい値が違反されるとk6プロセスは非ゼロコードで終了します。これがまさにCIがリリースを止める信号です。後の分析をより正確にするため、重要エンドポイントごとにカスタムメトリクスも記録します。"
    ),
    CODE("javascript", `// load.js — kịch bản k6, threshold sinh từ slo.yaml
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const txLatency = new Trend('tx_latency_ms', true);
const txErrors  = new Rate('tx_errors');

export const options = {
  stages: [
    { duration: '2m',  target: 50 },
    { duration: '5m',  target: 200 },
    { duration: '10m', target: 200 },
    { duration: '3m',  target: 0 },
  ],
  // thresholds ánh xạ 1-1 với slo.yaml — oracle chung với CI
  thresholds: {
    'tx_latency_ms': ['p(95)<400', 'p(99)<900'],
    'tx_errors':     ['rate<0.005'],
    'http_req_failed': ['rate<0.005'],
  },
};

export default function () {
  const idem = \`\${__VU}-\${__ITER}\`;              // khóa idempotency
  const res = http.post('https://api.wallet/v1/transactions',
    JSON.stringify({ to: 'acc_9931', amount: 15000 }),
    { headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idem } });

  txLatency.add(res.timings.duration);
  txErrors.add(res.status >= 500);
  check(res, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    'has tx id':     (r) => !!r.json('transaction_id'),
  });
  sleep(0.3);
}`),
    P(
      "Chú ý khóa Idempotency-Key được sinh từ VU và số vòng lặp. Trong hệ thống tiền, đây không chỉ là chi tiết kỹ thuật mà là điều kiện để kiểm tra một bất biến sống còn: khi client gửi lại cùng một khóa idempotency, hệ thống phải trả về cùng một giao dịch chứ không tạo giao dịch mới. Ở chương sau ta sẽ dùng chính khóa này để kiểm thử tính idempotent dưới tải cao — nơi race condition dễ lộ ra nhất. k6 ở đây vừa tạo tải vừa cấy sẵn dữ liệu để oracle nghiệp vụ có thể được xác minh.",
      "Note the Idempotency-Key is derived from the VU and iteration number. In a money system this is not just a technical detail but the condition for checking a vital invariant: when the client resends the same idempotency key, the system must return the same transaction rather than create a new one. In a later chapter we use this very key to test idempotency under high load — where race conditions surface most easily. Here k6 both generates load and seeds data so the business oracle can be verified.",
      "Idempotency-KeyがVUと反復番号から導出される点に注目してください。金銭システムではこれは単なる技術的詳細ではなく、重要な不変条件を検証する条件です。クライアントが同じ冪等キーを再送したとき、システムは新しい取引を作成せず同じ取引を返さなければなりません。後の章ではこのキーを使い、高負荷下で冪等性をテストします。競合状態が最も現れやすい場所です。ここでk6は負荷を生成すると同時にデータを仕込み、業務オラクルを検証できるようにします。"
    ),
    NOTE(
      "Từ Playwright v1.60, tracing.startHar()/stopHar() cho phép ghi HAR như một phần của trace; hữu ích khi cần đối chiếu request UI với dữ liệu tải backend.",
      "From Playwright v1.60, tracing.startHar()/stopHar() lets you record a HAR as part of a trace; useful when correlating UI requests with backend load data.",
      "Playwright v1.60以降、tracing.startHar()/stopHar()でトレースの一部としてHARを記録できます。UIリクエストとバックエンドの負荷データを突き合わせる際に有用です。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Observability: tương quan k6 với metric ứng dụng",
    en: "6. Observability: correlating k6 with application metrics",
    ja: "6. オブザーバビリティ：k6とアプリメトリクスの相関",
  },
  blocks: [
    P(
      "Kết quả k6 cho ta cái nhìn từ phía client: p95, tỉ lệ lỗi, thông lượng. Nhưng để hiểu vì sao chậm, ta phải nhìn vào trong hệ thống bằng observability — ba trụ cột metric, log và trace. Mẹo tích hợp quan trọng nhất là gắn nhãn chung: mỗi lần chạy k6 gắn một 'test_run_id' vào header, và hệ thống propagate id đó qua các span của trace. Nhờ vậy ta có thể lọc dashboard theo đúng lần chạy tải, không lẫn với traffic thật. Việc tương quan này biến hai nguồn dữ liệu rời rạc thành một câu chuyện mạch lạc về hành vi dưới tải.",
      "The k6 results give us the client-side view: p95, error rate, throughput. But to understand why it is slow, we must look inside the system with observability — the three pillars of metrics, logs, and traces. The most important integration trick is a shared label: each k6 run stamps a 'test_run_id' into a header, and the system propagates that id across trace spans. This lets us filter the dashboard to exactly one load run, not mixed with real traffic. This correlation turns two separate data sources into one coherent story about behavior under load.",
      "k6の結果はクライアント側の視点、すなわちp95・エラー率・スループットを与えます。しかしなぜ遅いかを理解するには、オブザーバビリティ、つまりメトリクス・ログ・トレースの3本柱でシステム内部を見る必要があります。最も重要な統合の工夫は共有ラベルです。各k6実行はヘッダーに「test_run_id」を刻み、システムはそのIDをトレースのスパン全体に伝播させます。これによりダッシュボードを特定の1回の負荷実行だけに絞り込め、実トラフィックと混ざりません。この相関は、2つの別々のデータソースを負荷下の挙動についての一貫した物語に変えます。"
    ),
    IMG(
      `<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="230" rx="12" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">Correlate by test_run_id</text>
<rect x="30" y="55" width="170" height="55" rx="8" fill="#155e63" stroke="#7dd3fc" stroke-width="2"/>
<text x="115" y="80" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">k6 summary.json</text>
<text x="115" y="98" text-anchor="middle" fill="#bae6fd" font-size="10">p95 / errors / rps</text>
<rect x="30" y="130" width="170" height="55" rx="8" fill="#0f766e" stroke="#7dd3fc" stroke-width="2"/>
<text x="115" y="155" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">Traces (spans)</text>
<text x="115" y="173" text-anchor="middle" fill="#bae6fd" font-size="10">db / queue / ext-call</text>
<path d="M200 82 L280 110 M200 158 L280 120" stroke="#7dd3fc" stroke-width="2" fill="none"/>
<rect x="285" y="85" width="120" height="60" rx="8" fill="#0369a1" stroke="#7dd3fc" stroke-width="2"/>
<text x="345" y="112" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">Correlator</text>
<text x="345" y="130" text-anchor="middle" fill="#bae6fd" font-size="10">join on id</text>
<path d="M405 115 L470 115" stroke="#7dd3fc" stroke-width="2" fill="none" marker-end="url(#a10a)"/>
<rect x="475" y="70" width="160" height="90" rx="8" fill="#12315e" stroke="#7dd3fc" stroke-width="2"/>
<text x="555" y="100" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">Root-cause view</text>
<text x="555" y="120" text-anchor="middle" fill="#bae6fd" font-size="10">"p95 spike =</text>
<text x="555" y="136" text-anchor="middle" fill="#bae6fd" font-size="10">db pool saturation"</text>
<defs><marker id="a10a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs>
</svg>`,
      "Tương quan k6 và trace theo test_run_id giúp truy nguyên nguyên nhân gốc của tăng p95.",
      "Correlating k6 and traces by test_run_id lets you trace the root cause of a p95 spike.",
      "test_run_idでk6とトレースを相関させると、p95スパイクの根本原因を追跡できます。"
    ),
    P(
      "Trong thực tế, khi p95 vượt ngân sách, câu hỏi luôn là: nghẽn ở đâu? Có thể là pool kết nối cơ sở dữ liệu bão hòa, hàng đợi ghi sổ tích tụ, hay một lệnh gọi dịch vụ ngoài (cổng thanh toán) chậm. AI agent sẽ đọc các span đã tương quan và tóm tắt phân bổ thời gian: bao nhiêu phần trăm thời gian request nằm ở tầng nào. Con người dùng bản tóm tắt đó như manh mối, rồi mở trace chi tiết để xác nhận. Không có tương quan này, ta chỉ biết 'chậm' mà không biết 'chậm ở đâu' — và không thể sửa điều mình không thấy.",
      "In practice, when p95 exceeds budget the question is always: where is the bottleneck? It could be a saturated database connection pool, a backed-up ledger write queue, or a slow external call (payment gateway). The AI agent reads the correlated spans and summarizes the time breakdown: what percentage of request time sits in which layer. Humans use that summary as a lead, then open a detailed trace to confirm. Without this correlation we only know 'slow' without knowing 'slow where' — and you cannot fix what you cannot see.",
      "実際には、p95が予算を超えたときの問いは常に「ボトルネックはどこか」です。データベース接続プールの飽和、台帳書き込みキューの滞留、あるいは外部呼び出し（決済ゲートウェイ）の遅延かもしれません。AIエージェントは相関済みのスパンを読み、時間の内訳を要約します。リクエスト時間の何パーセントがどの層にあるか。人間はその要約を手がかりに、詳細なトレースを開いて確認します。この相関がなければ「遅い」ことだけがわかり「どこが遅いか」はわからず、見えないものは直せません。"
    ),
    TIP(
      "Truyền test_run_id qua header W3C traceparent hoặc baggage để các span tự động mang nhãn; tránh phải sửa từng service thủ công.",
      "Propagate test_run_id via the W3C traceparent header or baggage so spans carry the label automatically; avoid editing each service by hand.",
      "test_run_idをW3C traceparentヘッダーやbaggageで伝播させ、スパンが自動的にラベルを持つようにします。各サービスを手作業で編集するのを避けられます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Ca lỗi sâu 1: idempotency dưới tải & thử lại",
    en: "7. Deep failure case 1: idempotency under load & retries",
    ja: "7. 深い障害ケース1：負荷と再試行下の冪等性",
  },
  blocks: [
    P(
      "Đây là ca lỗi nguy hiểm nhất trong fintech: khi mạng chập chờn dưới tải, client thử lại request tạo giao dịch. Nếu server không idempotent, một lần bấm chuyển tiền có thể tạo hai bút toán trừ tiền — khách hàng bị trừ hai lần. Bất biến oracle ở đây rõ ràng: với cùng một Idempotency-Key, dù client gửi bao nhiêu lần, hệ thống chỉ được tạo đúng một giao dịch và mọi lần gọi sau phải trả về giao dịch đã tạo với cùng transaction_id. Ta kiểm thử bất biến này chính dưới tải, vì race condition chỉ lộ ra khi nhiều luồng cùng chạm một khóa.",
      "This is the most dangerous failure case in fintech: when the network is flaky under load, the client retries the create-transaction request. If the server is not idempotent, one tap of 'transfer' can create two debit entries — the customer is charged twice. The oracle invariant here is clear: for the same Idempotency-Key, no matter how many times the client sends, the system must create exactly one transaction and every subsequent call must return the created transaction with the same transaction_id. We test this invariant precisely under load, because the race condition only surfaces when many threads hit the same key.",
      "これはフィンテックで最も危険な障害ケースです。負荷下でネットワークが不安定になると、クライアントは取引作成リクエストを再試行します。サーバーが冪等でなければ、送金を1回タップしただけで2つの引き落とし記帳が作成され、顧客は二重に請求されます。ここでのオラクル不変条件は明確です。同じIdempotency-Keyに対して、クライアントが何度送信してもシステムはちょうど1つの取引を作成し、以降のすべての呼び出しは同じtransaction_idで作成済みの取引を返さなければなりません。この不変条件をまさに負荷下でテストします。競合状態は多数のスレッドが同じキーに当たるときのみ現れるからです。"
    ),
    CODE("javascript", `// idempotency.js — bắn song song cùng một khóa idempotency dưới tải
import http from 'k6/http';
import { check } from 'k6';
import exec from 'k6/execution';

export const options = { scenarios: {
  storm: { executor: 'per-vu-iterations', vus: 40, iterations: 5 },
}};

export default function () {
  // 40 VU cùng dùng chung 1 khóa cho mỗi "wave" -> ép race
  const key = \`storm-\${exec.scenario.iterationInTest % 5}\`;
  const res = http.post('https://api.wallet/v1/transactions',
    JSON.stringify({ to: 'acc_1', amount: 10000 }),
    { headers: { 'Idempotency-Key': key, 'Content-Type': 'application/json' } });
  check(res, { 'status accepted': (r) => r.status === 200 || r.status === 409 });
}`),
    P(
      "Kịch bản k6 chỉ tạo áp lực; oracle thật sự được xác minh ở tầng dữ liệu sau khi chạy. Ta chạy một truy vấn kiểm tra: với mỗi khóa idempotency, đếm số bút toán được tạo. Nếu bất kỳ khóa nào sinh ra nhiều hơn một giao dịch hoàn tất, bài kiểm thử trượt — bất kể k6 báo latency đẹp đến đâu. Đây là điểm khác biệt cốt lõi giữa 'kiểm thử hiệu năng' hời hợt và 'kiểm thử hiệu năng oracle-first': ta không chỉ hỏi 'có nhanh không' mà còn hỏi 'dưới tốc độ đó, nghiệp vụ có còn đúng không'.",
      "The k6 scenario only creates pressure; the real oracle is verified at the data layer after the run. We run a check query: for each idempotency key, count the created entries. If any key yields more than one completed transaction, the test fails — no matter how pretty k6's latency looks. This is the core difference between shallow 'performance testing' and 'oracle-first performance testing': we do not only ask 'is it fast' but also 'at that speed, is the business still correct'.",
      "k6シナリオは圧力を作るだけで、本当のオラクルは実行後にデータ層で検証されます。チェッククエリを実行します。各冪等キーについて作成された記帳数を数えます。いずれかのキーが2つ以上の完了取引を生んだら、k6のレイテンシがどれほど美しくてもテストは失敗します。これが浅い「性能テスト」とオラクル優先の「性能テスト」の核心的な違いです。「速いか」だけでなく「その速度で業務は依然として正しいか」も問うのです。"
    ),
    CODE("sql", `-- oracle-check.sql — không khóa nào được tạo >1 giao dịch hoàn tất
SELECT idempotency_key, COUNT(*) AS n
FROM transactions
WHERE status = 'COMPLETED'
GROUP BY idempotency_key
HAVING COUNT(*) > 1;   -- kỳ vọng: 0 dòng`),
    QA(
      "Vì sao phải kiểm thử idempotency DƯỚI tải thay vì ở môi trường tĩnh?",
      "Why test idempotency UNDER load instead of in a quiet environment?",
      "Bởi lỗi idempotency thường là race condition: hai luồng cùng đọc 'chưa tồn tại' rồi cùng ghi. Ở môi trường tĩnh một-request-một-lúc, khóa hoạt động đúng và ta lầm tưởng an toàn. Chỉ dưới đồng thời cao, cửa sổ tranh chấp giữa 'kiểm tra tồn tại' và 'ghi' mới đủ rộng để lộ lỗi. Vì thế ta ghép k6 (tạo đồng thời) với oracle dữ liệu (đếm bút toán).",
      "Because idempotency bugs are usually race conditions: two threads both read 'not existing' then both write. In a quiet, one-request-at-a-time environment the key works correctly and we falsely believe it is safe. Only under high concurrency is the contention window between 'check existence' and 'write' wide enough to expose the bug. That is why we pair k6 (concurrent creation) with a data oracle (count entries).",
      "冪等性のバグは通常、競合状態だからです。2つのスレッドが両方「存在しない」と読み、両方が書き込みます。静かな1リクエストずつの環境ではキーは正しく動作し、安全だと誤って信じてしまいます。高い並行性の下でのみ、「存在確認」と「書き込み」の間の競合ウィンドウがバグを露出させるほど広くなります。だからk6（並行作成）とデータオラクル（記帳数の集計）を組み合わせるのです。",
      "なぜ静かな環境ではなく負荷下で冪等性をテストするのか？"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Ca lỗi sâu 2: timeout, backpressure & suy giảm duyên dáng",
    en: "8. Deep failure case 2: timeout, backpressure & graceful degradation",
    ja: "8. 深い障害ケース2：タイムアウト、バックプレッシャー、優雅な劣化",
  },
  blocks: [
    P(
      "Khi tải vượt sức, hệ thống tốt không sụp đổ mà suy giảm duyên dáng: từ chối sớm phần vượt ngưỡng thay vì để mọi request cùng chậm rồi timeout hàng loạt. Ta thiết kế một kịch bản đẩy tải vượt hai lần cao điểm để quan sát hành vi backpressure. Oracle không phải 'không có lỗi' — ở mức quá tải, có lỗi là hợp lý — mà là: hệ thống phải trả 429 (quá tải) nhanh và rõ ràng, không được để hàng đợi ghi sổ phình vô hạn, và khi tải rút về, p95 phải phục hồi trong thời gian cam kết. Nói cách khác, oracle là 'suy giảm có kiểm soát', không phải 'không bao giờ lỗi'.",
      "When load exceeds capacity, a good system does not collapse but degrades gracefully: it rejects the excess early instead of letting every request slow down and then time out en masse. We design a scenario that pushes load to twice the peak to observe backpressure behavior. The oracle is not 'no errors' — at overload, some errors are reasonable — but rather: the system must return 429 (overloaded) quickly and clearly, the ledger write queue must not balloon without bound, and when load recedes, p95 must recover within the committed time. In other words, the oracle is 'controlled degradation', not 'never errors'.",
      "負荷が容量を超えたとき、良いシステムは崩壊せず優雅に劣化します。すべてのリクエストを遅くさせて一斉にタイムアウトさせるのではなく、超過分を早期に拒否します。バックプレッシャーの挙動を観察するため、ピークの2倍まで負荷をかけるシナリオを設計します。オラクルは「エラーがない」ことではなく（過負荷では一部のエラーは妥当です）、システムが429（過負荷）を素早く明確に返すこと、台帳書き込みキューが無限に膨張しないこと、負荷が引いたときp95が約束された時間内に回復することです。言い換えれば、オラクルは「制御された劣化」であって「決してエラーしない」ことではありません。"
    ),
    CODE("javascript", `// overload.js — đẩy 2x cao điểm, kiểm tra suy giảm duyên dáng
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
const rejected = new Rate('rejected_429');
const recovery = new Trend('recovery_ms', true);

export const options = {
  stages: [
    { duration: '3m', target: 400 },   // 2x cao điểm
    { duration: '5m', target: 400 },
    { duration: '3m', target: 100 },   // rút về mức bình thường -> đo phục hồi
  ],
  thresholds: {
    // dưới quá tải: 429 CHẤP NHẬN được, nhưng 5xx thì KHÔNG
    'http_req_failed{status:5xx}': ['rate<0.01'],
    'recovery_ms': ['p(95)<30000'],   // p95 phục hồi < 30s sau khi tải rút
  },
};

export default function () {
  const res = http.post('https://api.wallet/v1/transactions',
    JSON.stringify({ to: 'acc_1', amount: 5000 }),
    { headers: { 'Content-Type': 'application/json' } });
  rejected.add(res.status === 429);
  if (res.status < 500) recovery.add(res.timings.duration);
}`),
    P(
      "Điểm tinh tế nằm ở threshold phân biệt 429 với 5xx. Một request bị từ chối bằng 429 là hệ thống đang tự bảo vệ đúng cách; một 5xx là hệ thống thật sự hỏng. Vì thế oracle chấp nhận 429 ở mức cao khi quá tải nhưng gần như không dung thứ 5xx. Đồng thời, custom metric recovery_ms đo thời gian độ trễ trở lại bình thường sau khi tải rút — nếu hệ thống 'kẹt' ở trạng thái chậm dù tải đã giảm, đó là dấu hiệu tài nguyên chưa được giải phóng (rò rỉ kết nối, hàng đợi chưa tiêu thụ hết). AI agent tóm tắt các mẫu này và trỏ reviewer tới trace của giai đoạn phục hồi.",
      "The subtlety is in the threshold distinguishing 429 from 5xx. A request rejected with 429 means the system is protecting itself correctly; a 5xx means the system truly broke. So the oracle tolerates 429 at a high rate under overload but nearly never tolerates 5xx. Meanwhile the custom recovery_ms metric measures how long latency takes to return to normal after load recedes — if the system is 'stuck' slow even though load dropped, that signals resources were not released (connection leaks, an unconsumed queue). The AI agent summarizes these patterns and points the reviewer to traces of the recovery phase.",
      "微妙な点は429と5xxを区別するしきい値にあります。429で拒否されたリクエストはシステムが正しく自己防衛していることを意味し、5xxはシステムが本当に壊れたことを意味します。したがってオラクルは過負荷下で429を高い率で許容しますが、5xxはほぼ許容しません。一方、カスタムメトリクスrecovery_msは負荷が引いた後にレイテンシが正常に戻るまでの時間を測ります。負荷が下がったのにシステムが遅いまま「詰まって」いれば、リソースが解放されていない兆候です（接続リーク、消費されないキュー）。AIエージェントはこれらのパターンを要約し、レビュアーを回復フェーズのトレースに導きます。"
    ),
    WARN(
      "Đừng đặt oracle 'không có lỗi nào' cho ca quá tải. Điều đó buộc bạn phải cấp phát thừa vô lý, và vẫn không chống được đỉnh tải bất ngờ. Hãy oracle hóa hành vi suy giảm, không phải sự hoàn hảo.",
      "Do not set a 'zero errors' oracle for the overload case. It forces absurd over-provisioning and still cannot withstand an unexpected spike. Oracle-ize the degradation behavior, not perfection.",
      "過負荷ケースに「エラーゼロ」のオラクルを設定してはいけません。不合理な過剰プロビジョニングを強い、それでも予期せぬスパイクには耐えられません。完璧さではなく劣化の挙動をオラクル化してください。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. AI agent phân tích trace & sinh báo cáo có trích dẫn",
    en: "9. The AI agent analyzes traces & produces a cited report",
    ja: "9. AIエージェントがトレースを分析し引用付きレポートを生成",
  },
  blocks: [
    P(
      "Sau khi k6 chạy xong, ta có summary.json và một kho trace được gắn nhãn test_run_id. AI agent nhận cả hai làm đầu vào, đối chiếu điểm vi phạm SLO với các span tương ứng, rồi sinh một báo cáo Markdown ngắn gọn. Nguyên tắc bất di bất dịch: mỗi khẳng định phải kèm bằng chứng có thể mở được — đường dẫn trace, giá trị số, khoảng thời gian. Báo cáo không kết luận 'đạt/trượt'; nó chỉ trình bày bằng chứng và giả thuyết nguyên nhân gốc để con người phán quyết nhanh hơn.",
      "After k6 finishes we have summary.json and a store of traces labeled with test_run_id. The AI agent takes both as input, matches SLO-violating points to the corresponding spans, then produces a concise Markdown report. The unbreakable rule: every claim must carry openable evidence — a trace path, a numeric value, a time window. The report does not conclude 'pass/fail'; it only presents evidence and root-cause hypotheses so humans can decide faster.",
      "k6が終了すると、summary.jsonとtest_run_idでラベル付けされたトレースの保管庫が得られます。AIエージェントは両方を入力とし、SLO違反点を対応するスパンに突き合わせ、簡潔なMarkdownレポートを生成します。破ってはならない規則は、すべての主張が開ける証拠、すなわちトレースパス、数値、時間ウィンドウを伴わなければならないことです。レポートは「合否」を結論せず、証拠と根本原因の仮説を提示するだけで、人間がより速く判断できるようにします。"
    ),
    CODE("markdown", `## Load Report — run 2026-07-07T04:00 (test_run_id=lr-8821)
**Verdict: (for human)** — 1 SLO breach observed.

| SLI | budget | observed | status |
|-----|--------|----------|--------|
| tx p95 (ms) | < 400 | **512** | ❌ breach |
| tx p99 (ms) | < 900 | 870 | ✅ |
| error rate | < 0.5% | 0.11% | ✅ |

### Evidence (grounded)
- p95 breach window: 04:07–04:09 (peak hold).
- trace://lr-8821/span/db-pool shows **wait_ms p95 = 190** (pool exhausted).
- Hypothesis: DB connection pool (size 20) saturates at 200 VU.

### Suggested next step (NOT auto-applied)
- Raise pool to 40 in staging, re-run; human to approve.`),
    P(
      "Chú ý dòng 'Verdict: (for human)' — agent cố tình không tự chốt. Bảng SLI trích số thật; phần Evidence trỏ tới span cụ thể với giá trị cụ thể (wait_ms p95 = 190) để reviewer có thể mở đúng chỗ mà xác nhận. Giả thuyết nguyên nhân gốc được nêu như giả thuyết, không như sự thật. Và đề xuất bước tiếp theo được gắn nhãn 'NOT auto-applied' — agent không tự động tăng pool hay tự merge. Cấu trúc báo cáo này giữ đúng ranh giới: agent tăng tốc phân tích, con người giữ quyền quyết định và hành động.",
      "Note the 'Verdict: (for human)' line — the agent deliberately does not finalize. The SLI table cites real numbers; the Evidence section points to a specific span with a specific value (wait_ms p95 = 190) so the reviewer can open exactly the right place to confirm. The root-cause hypothesis is stated as a hypothesis, not as fact. And the suggested next step is labeled 'NOT auto-applied' — the agent does not automatically raise the pool or self-merge. This report structure keeps the boundary intact: the agent accelerates analysis, humans keep the decision and the action.",
      "「Verdict: (for human)」の行に注目してください。エージェントは意図的に確定させません。SLIテーブルは実際の数値を引用し、Evidenceセクションは具体的な値（wait_ms p95 = 190）を持つ特定のスパンを指し、レビュアーがまさに正しい場所を開いて確認できるようにします。根本原因の仮説は事実ではなく仮説として述べられます。そして次のステップの提案は「NOT auto-applied」とラベル付けされ、エージェントは自動的にプールを増やしたり自己マージしたりしません。このレポート構造は境界を保ちます。エージェントは分析を加速し、人間が判断と行動を握ります。"
    ),
    NOTE(
      "Grounding = mọi kết luận neo vào dữ liệu mở được. Nếu agent không thể trích dẫn, coi như nó đang phỏng đoán và reviewer phải nghi ngờ.",
      "Grounding = every conclusion anchored to openable data. If the agent cannot cite, treat it as guessing and the reviewer must be skeptical.",
      "グラウンディング＝すべての結論が開けるデータに固定されること。エージェントが引用できないなら推測とみなし、レビュアーは懐疑的でなければなりません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Cổng CI: chặn phát hành khi vi phạm SLO",
    en: "10. The CI gate: block releases on SLO violations",
    ja: "10. CIゲート：SLO違反でリリースを止める",
  },
  blocks: [
    P(
      "Tích hợp chỉ có giá trị khi nó bảo vệ được nhánh chính. Ta gắn bài chạy k6 vào pipeline: mỗi PR chạm vào các dịch vụ quan trọng sẽ kích hoạt một job tải rút gọn (smoke performance) trên môi trường tương tự production; trước mỗi lần release lên staging thì chạy bài tải đầy đủ. Vì threshold trong k6 sinh từ slo.yaml, chỉ cần k6 thoát với mã khác không là job fail và pipeline chặn merge. Không có tranh cãi cảm tính về 'nhanh chậm' — cổng ra quyết định bằng đúng oracle đã mã hóa.",
      "Integration is only valuable when it protects the main branch. We wire the k6 run into the pipeline: each PR touching critical services triggers a reduced smoke-performance job on a production-like environment; before each release to staging, we run the full load test. Because the k6 thresholds come from slo.yaml, a non-zero k6 exit code is enough to fail the job and block the merge. No emotional argument about 'fast or slow' — the gate decides by the exact encoded oracle.",
      "統合はメインブランチを守るときにのみ価値があります。k6実行をパイプラインに組み込みます。重要サービスに触れる各PRは本番同等環境で縮小したスモーク性能ジョブを起動し、ステージングへの各リリース前に完全な負荷テストを実行します。k6のしきい値はslo.yamlから来るため、k6が非ゼロで終了するだけでジョブが失敗しマージがブロックされます。「速い遅い」の感情的な議論はなく、ゲートは符号化された正確なオラクルで判断します。"
    ),
    CODE("yaml", `# .github/workflows/perf-gate.yml
name: perf-gate
on: [pull_request]
jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Guard SLO file (agent may not edit)
        run: |
          if git diff --name-only origin/main | grep -q '^slo.yaml$'; then
            if [ "\${{ github.actor }}" = "qa-agent-bot" ]; then
              echo "::error::Agent cannot edit slo.yaml"; exit 1
            fi
          fi
      - name: Run k6 (thresholds from slo.yaml)
        run: k6 run --out json=summary.json load.js   # exit != 0 nếu breach
      - name: Idempotency oracle
        run: psql "$DB" -f oracle-check.sql -v ON_ERROR_STOP=1
      - name: Agent report (advisory, non-blocking)
        run: node agent/analyze.mjs summary.json > report.md
      - uses: actions/upload-artifact@v4
        with: { name: perf-report, path: report.md }`),
    P(
      "Có ba lớp bảo vệ trong workflow này. Thứ nhất, bước 'Guard SLO file' chặn chính bot agent chạm vào slo.yaml — thực thi ranh giới bằng mã, không chỉ bằng lời hứa. Thứ hai, k6 chạy với threshold từ oracle chung nên breach làm fail job cứng. Thứ ba, oracle idempotency chạy như một bước riêng, độc lập với latency: dù hiệu năng đẹp mà nghiệp vụ sai thì vẫn fail. Báo cáo của agent được tải lên như artifact tư vấn, không chặn — nó giúp con người hiểu nhanh nhưng không nắm quyền gate. Đây là sự phân vai rõ ràng giữa máy và người.",
      "There are three protection layers in this workflow. First, the 'Guard SLO file' step blocks the agent bot itself from touching slo.yaml — enforcing the boundary in code, not just by promise. Second, k6 runs with thresholds from the shared oracle so a breach hard-fails the job. Third, the idempotency oracle runs as a separate step, independent of latency: even if performance is pretty but the business is wrong, it still fails. The agent report is uploaded as an advisory artifact, non-blocking — it helps humans understand quickly but does not hold the gate. This is a clear division of roles between machine and human.",
      "このワークフローには3つの保護層があります。第一に、「Guard SLO file」ステップはエージェントボット自身がslo.yamlに触れることをブロックします。約束ではなくコードで境界を強制します。第二に、k6は共有オラクルのしきい値で実行され、違反はジョブをハード失敗させます。第三に、冪等性オラクルはレイテンシとは独立した別ステップとして実行されます。性能が美しくても業務が間違っていれば失敗します。エージェントのレポートは助言的なアーティファクトとしてアップロードされ、ブロックしません。人間が素早く理解するのを助けますが、ゲートは握りません。これは機械と人間の明確な役割分担です。"
    ),
    TIP(
      "Chạy bài tải trên môi trường có hình dạng giống production (kích thước pool, cấu hình DB). Tải trên máy dev cho số vô nghĩa và tạo cảm giác an toàn giả.",
      "Run the load test on an environment shaped like production (pool sizes, DB config). Load on a dev box gives meaningless numbers and a false sense of safety.",
      "負荷テストは本番と同じ形状の環境（プールサイズ、DB設定）で実行してください。開発マシンでの負荷は無意味な数値と誤った安心感を与えます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Ma trận ca kiểm thử & chống flaky trong perf",
    en: "11. Test case matrix & fighting flakiness in perf",
    ja: "11. テストケース行列と性能テストのフレーキー対策",
  },
  blocks: [
    P(
      "Kiểm thử hiệu năng cũng có thể flaky: cùng một bản build, hai lần chạy cho hai kết quả khác nhau vì nhiễu môi trường (hàng xóm ồn ào, GC, cache lạnh). Để cổng CI đáng tin, ta phải kiểm soát nhiễu: khởi động warm-up để làm ấm cache và JIT, chạy trên node cách ly, và đánh giá SLO trên cửa sổ trượt thay vì trên đỉnh nhọn tức thời. Ma trận dưới đây liệt kê các ca chuẩn kèm oracle tương ứng, để đội không quên phủ các chiều rủi ro khác nhau: tải bình thường, cao điểm, quá tải, và soak (chạy dài phát hiện rò rỉ).",
      "Performance testing can also be flaky: the same build, two runs, two different results because of environmental noise (noisy neighbors, GC, cold cache). For the CI gate to be trustworthy, we must control the noise: run a warm-up to warm the cache and JIT, run on isolated nodes, and evaluate the SLO over a sliding window rather than on an instantaneous spike. The matrix below lists the standard cases with their oracles, so the team does not forget to cover different risk dimensions: normal load, peak, overload, and soak (a long run to detect leaks).",
      "性能テストもフレーキーになりえます。同じビルドでも、環境ノイズ（うるさい隣人、GC、コールドキャッシュ）のため2回の実行で2つの異なる結果が出ます。CIゲートが信頼できるためにはノイズを制御しなければなりません。キャッシュとJITを温めるウォームアップを実行し、隔離ノードで実行し、瞬間的なスパイクではなくスライディングウィンドウでSLOを評価します。以下の行列は標準ケースと対応するオラクルを列挙し、チームが異なるリスク次元（通常負荷、ピーク、過負荷、リーク検出のための長時間実行soak）をカバーし忘れないようにします。"
    ),
    IMG(
      `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="220" rx="12" fill="#0b1220"/>
<text x="330" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">Case matrix — scenario → oracle</text>
<g font-size="11" fill="#e2e8f0">
<rect x="24" y="42" width="612" height="30" fill="#12315e"/>
<text x="36" y="62" font-weight="700" fill="#7dd3fc">Scenario</text>
<text x="230" y="62" font-weight="700" fill="#7dd3fc">Load</text>
<text x="360" y="62" font-weight="700" fill="#7dd3fc">Oracle</text>
<line x1="24" y1="72" x2="636" y2="72" stroke="#334155"/>
<text x="36" y="92">Normal</text><text x="230" y="92">~120 VU</text><text x="360" y="92">p95&lt;400, err&lt;0.5%</text>
<line x1="24" y1="102" x2="636" y2="102" stroke="#1e293b"/>
<text x="36" y="122">Peak</text><text x="230" y="122">200 VU hold</text><text x="360" y="122">p95&lt;400 giữ ổn định</text>
<line x1="24" y1="132" x2="636" y2="132" stroke="#1e293b"/>
<text x="36" y="152">Overload</text><text x="230" y="152">400 VU (2x)</text><text x="360" y="152">429 ok, 5xx&lt;1%, phục hồi&lt;30s</text>
<line x1="24" y1="162" x2="636" y2="162" stroke="#1e293b"/>
<text x="36" y="182">Soak</text><text x="230" y="182">150 VU · 2h</text><text x="360" y="182">bộ nhớ/queue không trôi tăng</text>
</g>
</svg>`,
      "Ma trận ca: mỗi kịch bản tải gắn với một oracle nghiệp vụ/SLO cụ thể.",
      "Case matrix: each load scenario is bound to a specific business/SLO oracle.",
      "ケース行列：各負荷シナリオは特定の業務/SLOオラクルに紐づきます。"
    ),
    P(
      "Ca soak đặc biệt quan trọng và thường bị bỏ qua. Chạy tải vừa phải trong hai giờ để phát hiện những vấn đề chỉ lộ theo thời gian: rò rỉ bộ nhớ, kết nối không đóng, hàng đợi tăng chậm nhưng đều. Oracle của soak không phải latency tức thời mà là xu hướng: bộ nhớ heap phải ổn định, không trôi tăng tuyến tính; độ sâu hàng đợi phải dao động quanh một mức, không leo dốc. AI agent rất hữu ích ở đây vì nó có thể đọc chuỗi thời gian dài và phát hiện xu hướng trôi mà mắt người dễ bỏ sót trong biểu đồ nhiễu.",
      "The soak case is especially important and often skipped. Run a moderate load for two hours to detect problems that only surface over time: memory leaks, unclosed connections, a slowly but steadily growing queue. The soak oracle is not instantaneous latency but a trend: heap memory must be stable, not drifting up linearly; queue depth must oscillate around a level, not climb. The AI agent is very useful here because it can read a long time series and detect a drift trend that the human eye easily misses in a noisy chart.",
      "soakケースは特に重要で、しばしば省略されます。中程度の負荷を2時間実行し、時間とともにのみ現れる問題を検出します。メモリリーク、閉じられない接続、ゆっくりだが着実に増えるキューです。soakのオラクルは瞬間的なレイテンシではなく傾向です。ヒープメモリは線形に上昇せず安定していなければならず、キューの深さはある水準の周りで振動し登り続けてはなりません。AIエージェントはここで非常に有用です。長い時系列を読み、ノイズの多いチャートで人間の目が見逃しやすいドリフト傾向を検出できるからです。"
    ),
    QA(
      "Làm sao phân biệt bài perf 'trượt vì hồi quy thật' với 'trượt vì flaky'?",
      "How do you tell a perf test 'failing from a real regression' from 'failing from flakiness'?",
      "Chạy lại có kiểm soát và dùng cửa sổ trượt. Nếu hồi quy thật, breach lặp lại ổn định qua nhiều lần chạy và tương quan với một thay đổi mã cụ thể (bisect). Nếu flaky, breach xuất hiện rời rạc, không tương quan với commit, và biến mất khi loại nhiễu (warm-up, node cách ly). Đừng nới ngưỡng để 'hết flaky' — hãy sửa nguồn nhiễu; nới ngưỡng là làm hỏng oracle.",
      "Rerun in a controlled way and use a sliding window. If it is a real regression, the breach reproduces stably across runs and correlates with a specific code change (bisect). If it is flaky, the breach appears sporadically, does not correlate with a commit, and disappears when noise is removed (warm-up, isolated node). Do not loosen the threshold to 'stop the flakiness' — fix the noise source; loosening the threshold corrupts the oracle.",
      "制御された方法で再実行しスライディングウィンドウを使います。本当の回帰なら、違反は複数回の実行で安定して再現し、特定のコード変更と相関します（bisect）。フレーキーなら、違反は散発的に現れコミットと相関せず、ノイズを除去すると（ウォームアップ、隔離ノード）消えます。「フレーキーを止める」ためにしきい値を緩めてはいけません。ノイズ源を直してください。しきい値の緩和はオラクルを壊します。",
      "本当の回帰による性能テスト失敗とフレーキーによる失敗をどう見分けるか？"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Rủi ro, chống mẫu & bài học vận hành",
    en: "12. Risks, anti-patterns & operational lessons",
    ja: "12. リスク、アンチパターン、運用上の教訓",
  },
  blocks: [
    P(
      "Sau nhiều chu kỳ vận hành, vài chống mẫu lặp lại đủ để cảnh báo. Nguy hiểm nhất là 'tin agent như oracle': để mô hình tự phán đạt/trượt rồi merge — sớm muộn nó ảo giác một kết luận sai và bạn phát hành một hồi quy hiệu năng. Thứ hai là 'perf theater': chạy k6 chỉ để có báo cáo đẹp mà threshold đặt lỏng đến vô nghĩa. Thứ ba là 'đo sai môi trường': tải trên máy dev rồi tưởng production an toàn. Thứ tư là 'bỏ oracle nghiệp vụ': chỉ nhìn latency mà quên kiểm tra idempotency và bảo toàn tiền dưới tải.",
      "After many operating cycles, a few anti-patterns recur enough to warn about. The most dangerous is 'trusting the agent as the oracle': letting the model self-judge pass/fail then merge — sooner or later it hallucinates a wrong conclusion and you ship a performance regression. Second is 'perf theater': running k6 just to have a pretty report while thresholds are set loose to the point of meaninglessness. Third is 'measuring the wrong environment': loading a dev box then assuming production is safe. Fourth is 'dropping the business oracle': looking only at latency while forgetting to check idempotency and money conservation under load.",
      "多くの運用サイクルの後、いくつかのアンチパターンが警告に値するほど繰り返されます。最も危険なのは「エージェントをオラクルとして信頼する」ことです。モデルに合否を自己判定させてマージすると、遅かれ早かれ誤った結論をハルシネーションし、性能回帰を出荷します。第二は「性能テストの見せかけ」で、しきい値を無意味なほど緩く設定しながら、美しいレポートのためだけにk6を実行します。第三は「誤った環境の測定」で、開発マシンに負荷をかけて本番が安全だと思い込みます。第四は「業務オラクルの放棄」で、レイテンシだけを見て負荷下の冪等性と資金保存の確認を忘れます。"
    ),
    UL(
      ["Chống mẫu: agent tự phán quyết → luôn giữ ngưỡng cứng + review người.",
       "Chống mẫu: threshold lỏng → sinh từ slo.yaml, review khi đổi.",
       "Chống mẫu: đo trên máy dev → dùng môi trường giống production.",
       "Chống mẫu: quên oracle nghiệp vụ → luôn ghép check idempotency/bảo toàn tiền."],
      ["Anti-pattern: agent self-judges → always keep hard thresholds + human review.",
       "Anti-pattern: loose thresholds → generate from slo.yaml, review on change.",
       "Anti-pattern: measure on dev box → use a production-like environment.",
       "Anti-pattern: forget the business oracle → always pair idempotency/money-conservation checks."],
      ["アンチパターン：エージェントの自己判定 → 常にハードしきい値と人間レビューを保つ。",
       "アンチパターン：緩いしきい値 → slo.yamlから生成し、変更時にレビュー。",
       "アンチパターン：開発マシンでの測定 → 本番同等環境を使う。",
       "アンチパターン：業務オラクルの忘却 → 常に冪等性/資金保存チェックを組み合わせる。"]
    ),
    SCEN(
      "Suýt phát hành hồi quy p95 vì tin agent",
      "Nearly shipping a p95 regression by trusting the agent",
      "Một lần, agent kết luận 'perf ổn' vì nó chỉ đọc trung bình (mean) chứ không đọc p95. Mean đẹp nhưng đuôi phân phối rất xấu do một truy vấn N+1 mới. Reviewer phát hiện vì báo cáo thiếu p95 có trích dẫn, yêu cầu bổ sung, và bài lộ breach. Bài học: bắt buộc agent trích dẫn đúng SLI đã định (p95/p99), không cho phép thay thế bằng chỉ số dễ đẹp hơn.",
      "Once, the agent concluded 'perf is fine' because it only read the mean, not p95. The mean looked good but the distribution tail was ugly due to a new N+1 query. The reviewer caught it because the report lacked a cited p95, demanded it, and the run revealed the breach. Lesson: force the agent to cite the exact defined SLIs (p95/p99), never allowing substitution by a more flattering metric.",
      "あるとき、エージェントは平均だけを読みp95を読まなかったため「性能は問題ない」と結論しました。平均は良く見えましたが、新しいN+1クエリのため分布の裾が非常に悪かったのです。レビュアーはレポートに引用付きp95が欠けていたため気づき、それを要求し、実行で違反が明らかになりました。教訓：エージェントに定義された正確なSLI（p95/p99）を引用させ、より見栄えの良い指標での置き換えを決して許さないことです。",
      "エージェントを信頼してp95回帰を出荷しかけた"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Góc phỏng vấn & tổng kết oracle-first",
    en: "13. Interview angle & oracle-first wrap-up",
    ja: "13. 面接での論点とオラクル優先のまとめ",
  },
  blocks: [
    P(
      "Trong phỏng vấn vị trí QA/SDET có yếu tố hiệu năng, câu hỏi hay gặp là 'bạn tích hợp kiểm thử hiệu năng vào CI thế nào và làm sao biết khi nào chặn phát hành?'. Câu trả lời mạnh không nói về công cụ trước mà nói về oracle trước: định nghĩa SLO thành mã, gắn threshold k6 vào chính oracle đó, tương quan k6 với observability để tìm nguyên nhân, và để AI agent tăng tốc phân tích trong khi con người giữ quyền phán quyết. Người phỏng vấn muốn thấy bạn phân biệt được 'nhanh' (cảm giác) với 'đạt SLO' (đo được), và hiểu vì sao idempotency phải kiểm dưới tải.",
      "In interviews for a QA/SDET role with a performance element, a common question is 'how do you integrate performance testing into CI and how do you know when to block a release?'. A strong answer does not lead with tools but with the oracle: define SLOs as code, bind k6 thresholds to that same oracle, correlate k6 with observability to find causes, and let the AI agent accelerate analysis while humans keep the verdict. The interviewer wants to see you distinguish 'fast' (a feeling) from 'meets SLO' (measured), and understand why idempotency must be tested under load.",
      "性能要素のあるQA/SDET職の面接で、よくある質問は「性能テストをCIにどう統合し、いつリリースを止めるべきかどう判断するか」です。強い回答はツールから始めず、オラクルから始めます。SLOをコードとして定義し、k6のしきい値を同じオラクルに紐づけ、原因を見つけるためk6とオブザーバビリティを相関させ、AIエージェントに分析を加速させつつ人間が判定を握ります。面接官は、あなたが「速い」（感覚）と「SLOを満たす」（測定値）を区別し、なぜ冪等性を負荷下でテストしなければならないかを理解しているかを見たいのです。"
    ),
    QA(
      "Vì sao không để AI agent tự động chặn/thông qua phát hành dựa trên phân tích của nó?",
      "Why not let the AI agent automatically block/approve a release based on its analysis?",
      "Vì oracle phải xác định, có thể kiểm chứng và ổn định; còn mô hình ngôn ngữ thì xác suất và có thể ảo giác. Nếu agent nắm quyền gate, một kết luận sai của nó sẽ trực tiếp gây hại — phát hành hồi quy hoặc chặn nhầm. Ta giữ quyết định ở ngưỡng cứng (slo.yaml) và ở con người; agent chỉ tăng tốc phân tích với bằng chứng có trích dẫn. Đây là nguyên tắc phân tách: máy làm phần đọc-tổng-hợp, người giữ phán quyết.",
      "Because the oracle must be deterministic, verifiable, and stable, while a language model is probabilistic and can hallucinate. If the agent holds the gate, one wrong conclusion directly causes harm — shipping a regression or a false block. We keep the decision in hard thresholds (slo.yaml) and in humans; the agent only accelerates analysis with cited evidence. This is the separation principle: the machine does the read-and-synthesize, the human keeps the verdict.",
      "オラクルは決定的で検証可能で安定していなければならず、言語モデルは確率的でハルシネーションを起こしうるからです。エージェントがゲートを握ると、1つの誤った結論が直接害を与えます。回帰の出荷や誤ったブロックです。判断はハードしきい値（slo.yaml）と人間に保ち、エージェントは引用付き証拠で分析を加速するだけです。これが分離の原則です。機械が読み取りと統合を行い、人間が判定を握ります。",
      "なぜAIエージェントに分析に基づいてリリースを自動でブロック/承認させないのか？"
    ),
    QA(
      "Kể một bất biến (oracle) bạn kiểm dưới tải mà không phải là độ trễ.",
      "Name an invariant (oracle) you check under load that is not latency.",
      "Bảo toàn tiền theo bút toán kép: sau khi chạy tải hàng nghìn chuyển khoản, tổng ghi nợ phải bằng tổng ghi có, không tiền nào 'bốc hơi' hay 'sinh ra'. Và idempotency: cùng khóa thì đúng một giao dịch hoàn tất. Hai bất biến này độc lập với hiệu năng — hệ thống có thể nhanh mà vẫn sai tiền, nên phải kiểm riêng bằng truy vấn dữ liệu sau tải.",
      "Double-entry money conservation: after running a load of thousands of transfers, total debits must equal total credits, no money 'evaporates' or is 'created'. And idempotency: the same key yields exactly one completed transaction. These two invariants are independent of performance — a system can be fast yet wrong about money, so they must be checked separately with a data query after the load.",
      "複式簿記による資金保存です。数千件の送金の負荷を実行した後、総借方は総貸方と等しくなければならず、お金が「蒸発」したり「生成」されたりしてはいけません。そして冪等性です。同じキーはちょうど1つの完了取引を生みます。この2つの不変条件は性能とは独立です。システムは速くてもお金について間違いうるので、負荷後のデータクエリで別途チェックしなければなりません。",
      "レイテンシではない、負荷下で検証する不変条件（オラクル）を1つ挙げてください。"
    ),
    P(
      "Tổng kết lại toàn bài: tích hợp hiệu năng — chất lượng không phải là 'chạy k6 rồi nhìn số', mà là một vòng khép kín lấy oracle làm trung tâm. SLO được mã hóa làm chân lý; k6 tạo tải và mang chính ngưỡng đó; observability cho ta nhìn vào trong để tìm nguyên nhân; AI agent tăng tốc soạn thảo và phân tích trong ranh giới grounding; con người giữ quyền phán quyết; và CI thực thi tất cả bằng cách chặn phát hành khi oracle bị vi phạm. Khi bốn mảnh này khớp nhau, ta có một cỗ máy vừa nhanh vừa đáng tin — điều mà một hệ thống tiền bạc bắt buộc phải có.",
      "To summarize the whole article: integrated performance–quality is not 'run k6 and look at numbers', but a closed loop centered on the oracle. The SLO is encoded as truth; k6 generates load and carries that very threshold; observability lets us look inside to find causes; the AI agent accelerates authoring and analysis within grounding boundaries; humans keep the verdict; and CI enforces it all by blocking releases when the oracle is violated. When these four pieces fit together, we get a machine that is both fast and trustworthy — exactly what a money system must have.",
      "記事全体をまとめると、性能と品質の統合は「k6を実行して数値を見る」ことではなく、オラクルを中心とした閉ループです。SLOは真実として符号化され、k6は負荷を生成しそのしきい値を運び、オブザーバビリティは原因を見つけるため内部を見せ、AIエージェントはグラウンディングの境界内で作成と分析を加速し、人間が判定を握り、CIはオラクル違反時にリリースをブロックしてすべてを強制します。この4つの要素が噛み合うと、速くて信頼できる仕組みが得られます。まさに金銭システムが持つべきものです。"
    ),
  ],
});

/* =========================================================================
 * ARTICLE B — Contract testing giữa microservices + AI agent + CI (banking).
 * Oracle = tương thích hợp đồng (contract compatibility).
 * ========================================================================= */

pagesB.push({
  heading: {
    vi: "1. Bối cảnh & oracle: hợp đồng là chân lý giữa các dịch vụ",
    en: "1. Context & oracle: the contract is the truth between services",
    ja: "1. 背景とオラクル：契約がサービス間の真実",
  },
  blocks: [
    P(
      "Chúng ta làm việc trong một ngân hàng số với hàng chục microservice: dịch vụ tài khoản, sổ cái, hạn mức, phòng chống gian lận, thông báo. Một luồng chuyển khoản đơn giản đi qua năm sáu dịch vụ, mỗi dịch vụ do một đội khác nhau phát triển và phát hành độc lập. Vấn đề cốt lõi của kiến trúc này không phải là mỗi dịch vụ chạy đúng riêng lẻ, mà là chúng có nói chung một ngôn ngữ hay không: khi dịch vụ tài khoản gọi dịch vụ hạn mức, cấu trúc request và response mà bên gọi kỳ vọng có khớp với cái bên bị gọi cung cấp không. Kiểm thử hợp đồng (契約テスト) sinh ra để trả lời chính câu hỏi đó, và oracle của nó là tính tương thích hợp đồng.",
      "We work in a digital bank with dozens of microservices: account, ledger, limits, fraud, notification. A simple transfer flows through five or six services, each built by a different team and released independently. The core problem of this architecture is not whether each service runs correctly in isolation, but whether they speak a common language: when the account service calls the limits service, does the request and response structure the caller expects match what the callee provides. Contract testing exists to answer exactly that question, and its oracle is contract compatibility.",
      "私たちは数十のマイクロサービスを持つデジタルバンクで働いています。口座、台帳、限度額、不正防止、通知です。単純な送金は5、6のサービスを流れ、各サービスは異なるチームが構築し独立してリリースします。このアーキテクチャの核心的な問題は、各サービスが単独で正しく動くかではなく、共通の言語を話すかどうかです。口座サービスが限度額サービスを呼ぶとき、呼び出し側が期待するリクエストとレスポンスの構造が、呼ばれる側が提供するものと一致するか。契約テストはまさにその問いに答えるために存在し、そのオラクルは契約の互換性です。"
    ),
    P(
      "Hãy đặt oracle lên đầu tiên như mọi bài trong bộ này. Oracle của kiểm thử hợp đồng không phải 'dịch vụ trả về 200' mà là một bất biến mạnh hơn: mọi kỳ vọng mà consumer (bên tiêu thụ) khai báo trong hợp đồng phải được provider (bên cung cấp) thỏa mãn — không thiếu trường bắt buộc, không đổi kiểu dữ liệu, không xóa trường mà consumer đang dùng. Đây là consumer-driven contract: chính bên tiêu thụ định nghĩa nó cần gì, và provider phải chứng minh mình đáp ứng được. Khi hợp đồng bị phá vỡ, ta muốn phát hiện ở CI trước khi triển khai, chứ không phải khi giao dịch của khách hàng thất bại lúc nửa đêm.",
      "Put the oracle first, as in every article in this set. The oracle of contract testing is not 'the service returns 200' but a stronger invariant: every expectation the consumer declares in the contract must be satisfied by the provider — no missing required field, no changed data type, no removed field the consumer relies on. This is a consumer-driven contract: the consumer itself defines what it needs, and the provider must prove it meets it. When a contract is broken, we want to detect it in CI before deploying, not when a customer's transaction fails at midnight.",
      "このセットのすべての記事と同様、オラクルを最初に置きましょう。契約テストのオラクルは「サービスが200を返す」ことではなく、より強い不変条件です。コンシューマーが契約で宣言するすべての期待を、プロバイダーが満たさなければなりません。必須フィールドの欠落なし、データ型の変更なし、コンシューマーが依存するフィールドの削除なしです。これがコンシューマー駆動契約です。コンシューマー自身が必要なものを定義し、プロバイダーはそれを満たすことを証明しなければなりません。契約が壊れたとき、顧客の取引が真夜中に失敗したときではなく、デプロイ前にCIで検出したいのです。"
    ),
    IMG(
      `<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="240" rx="12" fill="#0b1220"/>
<rect x="30" y="90" width="150" height="60" rx="10" fill="#12315e" stroke="#7dd3fc" stroke-width="2"/>
<text x="105" y="115" text-anchor="middle" fill="#f1f5f9" font-size="13" font-weight="800">Consumer</text>
<text x="105" y="134" text-anchor="middle" fill="#bae6fd" font-size="10">account-svc</text>
<rect x="480" y="90" width="150" height="60" rx="10" fill="#12315e" stroke="#7dd3fc" stroke-width="2"/>
<text x="555" y="115" text-anchor="middle" fill="#f1f5f9" font-size="13" font-weight="800">Provider</text>
<text x="555" y="134" text-anchor="middle" fill="#bae6fd" font-size="10">limits-svc</text>
<rect x="255" y="40" width="150" height="55" rx="10" fill="#0f766e" stroke="#7dd3fc" stroke-width="2"/>
<text x="330" y="64" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">Pact (contract)</text>
<text x="330" y="82" text-anchor="middle" fill="#bae6fd" font-size="10">expectations</text>
<rect x="255" y="150" width="150" height="55" rx="10" fill="#7c2d12" stroke="#fca5a5" stroke-width="2"/>
<text x="330" y="174" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">Broker + CI</text>
<text x="330" y="192" text-anchor="middle" fill="#fecaca" font-size="10">can-i-deploy?</text>
<path d="M180 110 L255 80" stroke="#7dd3fc" stroke-width="2" fill="none"/>
<text x="205" y="88" fill="#bae6fd" font-size="9">publishes</text>
<path d="M405 80 L480 110" stroke="#7dd3fc" stroke-width="2" fill="none"/>
<text x="430" y="88" fill="#bae6fd" font-size="9">verifies</text>
<path d="M330 95 L330 150" stroke="#fca5a5" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
</svg>`,
      "Consumer-driven contract: consumer công bố kỳ vọng, provider xác minh, broker + CI ra quyết định triển khai.",
      "Consumer-driven contract: the consumer publishes expectations, the provider verifies, broker + CI decide deployment.",
      "コンシューマー駆動契約：コンシューマーが期待を公開し、プロバイダーが検証し、ブローカーとCIがデプロイを判断します。"
    ),
    NOTE(
      "Kiểm thử hợp đồng KHÔNG thay thế kiểm thử tích hợp end-to-end, nhưng nó bắt phần lớn lỗi 'lệch giao diện' sớm hơn và rẻ hơn nhiều.",
      "Contract testing does NOT replace end-to-end integration testing, but it catches most 'interface drift' bugs far earlier and much more cheaply.",
      "契約テストはエンドツーエンドの統合テストを置き換えませんが、「インターフェースのずれ」のバグの大半をはるかに早く安価に捕捉します。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Vì sao CDC (consumer-driven) thắng kiểm thử E2E giòn",
    en: "2. Why CDC (consumer-driven) beats brittle E2E testing",
    ja: "2. なぜCDC（コンシューマー駆動）は脆いE2Eテストに勝るか",
  },
  blocks: [
    P(
      "Trước khi có kiểm thử hợp đồng, cách phổ biến để bắt lỗi lệch giao diện là dựng một môi trường tích hợp đầy đủ và chạy E2E. Cách này có ba điểm yếu chí tử ở quy mô ngân hàng: chậm (phải khởi động hàng chục dịch vụ), giòn (một dịch vụ hỏng làm cả bộ E2E đỏ, khó biết nguyên nhân), và tốn kém (duy trì dữ liệu, môi trường, thời gian chạy). Quan trọng hơn, E2E chỉ chạy được khi tất cả dịch vụ đã sẵn sàng — quá muộn để bắt lỗi hợp đồng lúc đang phát triển. Kiểm thử hợp đồng đảo ngược: mỗi cặp consumer-provider được kiểm riêng, nhanh, cô lập.",
      "Before contract testing, the common way to catch interface-drift bugs was to stand up a full integration environment and run E2E. This approach has three fatal weaknesses at bank scale: slow (you must boot dozens of services), brittle (one broken service turns the whole E2E suite red, hard to pinpoint the cause), and expensive (maintaining data, environments, run time). More importantly, E2E only runs when all services are ready — too late to catch contract bugs during development. Contract testing inverts this: each consumer-provider pair is tested separately, fast, in isolation.",
      "契約テストの前は、インターフェースのずれのバグを捕捉する一般的な方法は、完全な統合環境を立ち上げてE2Eを実行することでした。この方法は銀行規模で3つの致命的な弱点を持ちます。遅い（数十のサービスを起動する必要がある）、脆い（1つのサービスの故障がE2Eスイート全体を赤くし、原因の特定が難しい）、高価（データ、環境、実行時間の維持）。さらに重要なのは、E2Eはすべてのサービスが準備できたときのみ実行でき、開発中の契約バグを捕捉するには遅すぎることです。契約テストはこれを逆転させます。各コンシューマー・プロバイダーのペアを別々に、速く、隔離してテストします。"
    ),
    UL(
      ["E2E: chậm, giòn, đắt, phát hiện muộn — chỉ chạy khi mọi dịch vụ sẵn sàng.",
       "CDC: nhanh, cô lập, rẻ, phát hiện sớm — kiểm từng cặp consumer-provider.",
       "CDC không cần provider thật lúc test consumer (dùng stub từ hợp đồng), và không cần consumer thật lúc verify provider (phát lại tương tác)."],
      ["E2E: slow, brittle, expensive, late detection — only runs when all services are ready.",
       "CDC: fast, isolated, cheap, early detection — tests each consumer-provider pair.",
       "CDC needs no real provider when testing the consumer (uses a stub from the contract), and no real consumer when verifying the provider (replays interactions)."],
      ["E2E：遅い、脆い、高価、検出が遅い。すべてのサービスが準備できたときのみ実行。",
       "CDC：速い、隔離、安価、早期検出。各コンシューマー・プロバイダーのペアをテスト。",
       "CDCはコンシューマーのテスト時に実プロバイダーを必要とせず（契約からのスタブを使用）、プロバイダーの検証時に実コンシューマーを必要としません（相互作用を再生）。"]
    ),
    P(
      "Cơ chế then chốt là: khi kiểm thử consumer, ta chạy nó chống lại một mock được sinh từ hợp đồng — nếu consumer gọi đúng như đã khai báo, tương tác được ghi thành một 'pact'. Khi verify provider, công cụ phát lại chính những tương tác đó vào provider thật và kiểm tra provider trả về đúng như hợp đồng mô tả. Hai phía không cần chạy đồng thời; chúng gặp nhau qua tài liệu hợp đồng, được lưu ở một broker trung tâm. Nhờ vậy hai đội phát hành độc lập mà vẫn có một oracle chung ràng buộc họ.",
      "The key mechanism is: when testing the consumer, we run it against a mock generated from the contract — if the consumer calls exactly as declared, the interaction is recorded as a 'pact'. When verifying the provider, the tool replays those very interactions against the real provider and checks the provider returns exactly what the contract describes. The two sides need not run at the same time; they meet through the contract document, stored in a central broker. This lets two teams release independently while still sharing one oracle that binds them.",
      "重要なメカニズムは次の通りです。コンシューマーをテストするとき、契約から生成されたモックに対して実行します。コンシューマーが宣言通りに正確に呼べば、相互作用は「pact」として記録されます。プロバイダーを検証するとき、ツールはまさにその相互作用を実プロバイダーに再生し、プロバイダーが契約の記述通りに返すかをチェックします。両者は同時に実行する必要はなく、中央ブローカーに保存された契約ドキュメントを通じて出会います。これにより2つのチームが独立してリリースしながら、両者を縛る1つのオラクルを共有できます。"
    ),
    TIP(
      "Dùng CDC cho ranh giới nội bộ giữa các đội; giữ vài kịch bản E2E mỏng cho luồng tiền quan trọng nhất. Đừng bỏ hẳn E2E, chỉ đừng dựa vào nó để bắt lỗi giao diện.",
      "Use CDC for internal boundaries between teams; keep a few thin E2E scenarios for the most critical money flows. Do not drop E2E entirely, just do not rely on it to catch interface bugs.",
      "チーム間の内部境界にはCDCを使い、最も重要な資金フローには薄いE2Eシナリオをいくつか保ちます。E2Eを完全にやめず、インターフェースのバグ捕捉をそれに頼らないだけです。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Cấu trúc một hợp đồng Pact & oracle tương thích",
    en: "3. The structure of a Pact contract & the compatibility oracle",
    ja: "3. Pact契約の構造と互換性オラクル",
  },
  blocks: [
    P(
      "Một hợp đồng Pact là tài liệu JSON mô tả các tương tác mà consumer kỳ vọng: với request nào (method, path, headers, body) thì provider phải trả response nào (status, headers, body). Điểm tinh tế và quan trọng nhất là matcher: hợp đồng không nên cố định giá trị cụ thể (ví dụ số dư đúng bằng 15000) mà nên mô tả hình dạng (số dư là một số nguyên, mã tiền tệ là chuỗi ba ký tự). Nếu cố định giá trị, hợp đồng sẽ giòn và đỏ giả mỗi khi dữ liệu thay đổi; nếu mô tả hình dạng, oracle kiểm đúng thứ ta quan tâm: tính tương thích cấu trúc, không phải dữ liệu nhất thời.",
      "A Pact contract is a JSON document describing the interactions the consumer expects: for a given request (method, path, headers, body) the provider must return a given response (status, headers, body). The subtlest and most important point is the matcher: the contract should not fix concrete values (e.g. balance exactly 15000) but describe the shape (balance is an integer, currency is a three-character string). If you fix values, the contract becomes brittle and falsely red whenever data changes; if you describe the shape, the oracle checks exactly what we care about: structural compatibility, not transient data.",
      "Pact契約は、コンシューマーが期待する相互作用を記述するJSONドキュメントです。あるリクエスト（メソッド、パス、ヘッダー、ボディ）に対し、プロバイダーはあるレスポンス（ステータス、ヘッダー、ボディ）を返さなければなりません。最も微妙で重要な点はマッチャーです。契約は具体的な値（例：残高がちょうど15000）を固定せず、形状（残高は整数、通貨コードは3文字の文字列）を記述すべきです。値を固定すると契約は脆くなりデータが変わるたびに誤って赤くなります。形状を記述すれば、オラクルは私たちが関心を持つもの、すなわち一時的なデータではなく構造的な互換性を正確にチェックします。"
    ),
    CODE("javascript", `// account.limits.pact.spec.ts — consumer test sinh hợp đồng
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
const { like, integer, regex } = MatchersV3;

const provider = new PactV3({ consumer: 'account-svc', provider: 'limits-svc' });

provider
  .given('customer c-1 has a daily limit')
  .uponReceiving('a check-limit request for 15000')
  .withRequest({
    method: 'POST', path: '/v1/limits/check',
    headers: { 'Content-Type': 'application/json' },
    body: { customerId: 'c-1', amount: 15000, currency: 'VND' },
  })
  .willRespondWith({
    status: 200,
    // MATCHER: mô tả HÌNH DẠNG, không cố định giá trị -> oracle tương thích
    body: {
      allowed: like(true),
      remaining: integer(2350000),
      currency: regex('^[A-Z]{3}$', 'VND'),
    },
  });`),
    P(
      "Chú ý ba matcher: like(true) chấp nhận bất kỳ boolean nào, integer() chấp nhận bất kỳ số nguyên nào, regex() ràng buộc định dạng mã tiền tệ. Điều consumer thực sự phụ thuộc là: có trường 'allowed' kiểu boolean, 'remaining' là số nguyên, 'currency' đúng định dạng ISO. Nếu ngày mai provider đổi 'remaining' từ số nguyên sang chuỗi, hoặc đổi tên trường, hợp đồng sẽ bắt được ngay khi verify. Đây chính là oracle tương thích: ta khẳng định cấu trúc mà bên tiêu thụ dựa vào, không khẳng định một giá trị cụ thể vốn sẽ thay đổi theo dữ liệu thật.",
      "Note the three matchers: like(true) accepts any boolean, integer() accepts any integer, regex() constrains the currency format. What the consumer truly depends on is: an 'allowed' field of type boolean, 'remaining' as an integer, 'currency' in ISO format. If tomorrow the provider changes 'remaining' from integer to string, or renames the field, the contract catches it immediately at verification. This is precisely the compatibility oracle: we assert the structure the consumer relies on, not a specific value that will change with real data.",
      "3つのマッチャーに注目してください。like(true)は任意のブール値を受け入れ、integer()は任意の整数を受け入れ、regex()は通貨形式を制約します。コンシューマーが本当に依存するのは、ブール型の「allowed」フィールド、整数としての「remaining」、ISO形式の「currency」です。明日プロバイダーが「remaining」を整数から文字列に変えたり、フィールド名を変えたりすれば、契約は検証時にすぐ捕捉します。これがまさに互換性オラクルです。実データで変わる特定の値ではなく、コンシューマーが依存する構造をアサーションします。"
    ),
    WARN(
      "Đừng viết hợp đồng khớp giá trị cụ thể (exact match) cho dữ liệu động. Đó là nguồn flaky lớn nhất của kiểm thử hợp đồng — dùng matcher hình dạng thay vì giá trị cứng.",
      "Do not write contracts with exact matches for dynamic data. That is the biggest source of contract-test flakiness — use shape matchers, not hard values.",
      "動的データに対して具体的な値の完全一致で契約を書いてはいけません。それは契約テストのフレーキーの最大の原因です。ハードな値ではなく形状マッチャーを使ってください。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. AI agent sinh & bảo trì hợp đồng trong ranh giới",
    en: "4. The AI agent generates & maintains contracts within boundaries",
    ja: "4. AIエージェントが境界内で契約を生成・保守",
  },
  blocks: [
    P(
      "AI agent trong bài này có vai trò tăng tốc phần soạn thảo và bảo trì hợp đồng — vốn tốn công và dễ bỏ sót. Nó đọc đặc tả OpenAPI của provider, lịch sử các lời gọi thật, và mã của consumer để đề xuất bản nháp hợp đồng: những tương tác nào cần có, dùng matcher hình dạng nào cho từng trường. Nó cũng có thể phát hiện 'trường consumer dùng nhưng chưa có trong hợp đồng', một nguồn lỗi âm thầm phổ biến. Nhưng — như mọi bài — agent không tự merge hợp đồng, không tự phán tương thích; nó chỉ đề xuất, con người review và ký duyệt.",
      "The AI agent in this article accelerates the authoring and maintenance of contracts — work that is tedious and easy to miss. It reads the provider's OpenAPI spec, the history of real calls, and the consumer's code to propose a draft contract: which interactions are needed, which shape matcher to use for each field. It can also detect 'a field the consumer uses but that is missing from the contract', a common silent source of bugs. But — as in every article — the agent does not self-merge contracts, does not self-judge compatibility; it only proposes, humans review and sign off.",
      "この記事のAIエージェントは、手間がかかり見落としやすい契約の作成と保守を加速します。プロバイダーのOpenAPI仕様、実際の呼び出しの履歴、コンシューマーのコードを読み、契約の草案を提案します。どの相互作用が必要か、各フィールドにどの形状マッチャーを使うか。また「コンシューマーが使うが契約に欠けているフィールド」を検出できます。これは一般的な静かなバグの原因です。しかし、どの記事とも同様に、エージェントは契約を自己マージせず、互換性を自己判定しません。提案するだけで、人間がレビューし承認します。"
    ),
    CODE("json", `// agent-contract-suggestion.json — đề xuất bổ sung hợp đồng (chờ duyệt)
{
  "reason": "Consumer đọc field 'tier' từ response nhưng hợp đồng chưa khai báo",
  "evidence": {
    "consumer_code": "account-svc/limits.ts:42  -> resp.data.tier",
    "provider_spec": "limits-svc/openapi.yaml#/LimitResult/tier"
  },
  "proposed_matcher": { "field": "tier", "matcher": "regex", "pattern": "^(BASIC|GOLD|VIP)$" },
  "risk": "Nếu provider bỏ 'tier', consumer sẽ đọc undefined -> lỗi phân hạng",
  "requires_human_review": true
}`),
    P(
      "Reviewer đọc trường 'evidence' để xác nhận đề xuất có căn cứ: agent trỏ đúng dòng mã consumer đang dùng 'tier' và đúng vị trí trong OpenAPI của provider. Trường 'risk' giải thích hậu quả nếu bỏ qua. Đây là grounding: agent không nói suông 'nên thêm tier' mà chứng minh bằng mã thật. Con người quyết định có đưa 'tier' vào hợp đồng không — có thể ta muốn, hoặc có thể consumer nên ngừng phụ thuộc vào trường đó. Dù quyết định thế nào, chính con người chịu trách nhiệm cho hợp đồng cuối cùng, còn agent chịu trách nhiệm cho việc không để sót manh mối.",
      "The reviewer reads the 'evidence' field to confirm the proposal is grounded: the agent points to the exact consumer line using 'tier' and the exact spot in the provider's OpenAPI. The 'risk' field explains the consequence of ignoring it. This is grounding: the agent does not merely say 'you should add tier' but proves it with real code. The human decides whether to put 'tier' into the contract — maybe we want it, or maybe the consumer should stop depending on that field. Whatever the decision, the human owns the final contract, while the agent owns not missing the lead.",
      "レビュアーは「evidence」フィールドを読み、提案が根拠あるものか確認します。エージェントは「tier」を使う正確なコンシューマーの行と、プロバイダーのOpenAPIの正確な箇所を指します。「risk」フィールドは無視した場合の結果を説明します。これがグラウンディングです。エージェントは単に「tierを追加すべき」と言うのではなく、実際のコードで証明します。人間は「tier」を契約に入れるか決めます。入れたいか、あるいはコンシューマーがそのフィールドへの依存をやめるべきか。どちらの決定でも、人間が最終契約を所有し、エージェントは手がかりを見逃さないことを所有します。"
    ),
    SCEN(
      "Agent phát hiện phụ thuộc ngầm chưa vào hợp đồng",
      "The agent spots an implicit dependency not yet in the contract",
      "Consumer bắt đầu đọc field 'tier' để hiển thị huy hiệu hạng khách, nhưng lập trình viên quên cập nhật hợp đồng. Provider sau đó dọn dẹp response và bỏ 'tier' — CI hợp đồng vẫn xanh vì hợp đồng không nhắc 'tier', nhưng production sẽ vỡ. Agent quét mã consumer, phát hiện phụ thuộc ngầm, đề xuất thêm matcher. Reviewer duyệt, hợp đồng cập nhật, và lần verify sau bắt được ngay khi provider định bỏ trường. Lỗi ngầm biến thành lỗi rõ ràng ở CI.",
      "The consumer starts reading the 'tier' field to show a customer-tier badge, but the developer forgot to update the contract. The provider later cleans up the response and drops 'tier' — the contract CI stays green because the contract never mentions 'tier', but production will break. The agent scans the consumer code, spots the implicit dependency, proposes adding a matcher. The reviewer approves, the contract updates, and the next verification catches it the moment the provider tries to drop the field. A silent bug becomes an explicit CI failure.",
      "コンシューマーは顧客ランクのバッジを表示するため「tier」フィールドを読み始めますが、開発者は契約の更新を忘れます。プロバイダーは後でレスポンスを整理し「tier」を削除します。契約は「tier」に触れないため契約CIは緑のままですが、本番は壊れます。エージェントはコンシューマーのコードをスキャンし、暗黙の依存を見つけ、マッチャーの追加を提案します。レビュアーが承認し、契約が更新され、次の検証はプロバイダーがフィールドを削除しようとした瞬間に捕捉します。静かなバグが明示的なCI失敗になります。",
      "エージェントが契約にない暗黙の依存を発見"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "5. Provider verification: phát lại tương tác trong CI",
    en: "5. Provider verification: replaying interactions in CI",
    ja: "5. プロバイダー検証：CIで相互作用を再生",
  },
  blocks: [
    P(
      "Nửa còn lại của kiểm thử hợp đồng là verify provider. Công cụ Pact lấy hợp đồng từ broker và phát lại từng tương tác vào provider thật đang chạy: gửi đúng request đã khai báo, rồi kiểm tra response thật có khớp với các matcher trong hợp đồng không. Điểm mấu chốt là provider state — trước mỗi tương tác, provider phải được đưa về trạng thái mà consumer giả định (ví dụ 'customer c-1 has a daily limit'). Ta cài các hàm state handler để thiết lập dữ liệu nền, giúp việc phát lại xác định và lặp lại được, tránh flaky do dữ liệu thay đổi.",
      "The other half of contract testing is verifying the provider. The Pact tool pulls the contract from the broker and replays each interaction against the real running provider: it sends exactly the declared request, then checks whether the real response matches the contract's matchers. The key point is provider state — before each interaction, the provider must be brought into the state the consumer assumed (e.g. 'customer c-1 has a daily limit'). We install state handler functions to set up the background data, making the replay deterministic and repeatable, avoiding flakiness from changing data.",
      "契約テストのもう半分はプロバイダーの検証です。Pactツールはブローカーから契約を取得し、各相互作用を実行中の実プロバイダーに再生します。宣言された正確なリクエストを送り、実レスポンスが契約のマッチャーと一致するかチェックします。重要な点はプロバイダー状態です。各相互作用の前に、プロバイダーはコンシューマーが想定した状態（例：「顧客c-1に日次限度額がある」）にされなければなりません。バックグラウンドデータを設定する状態ハンドラー関数をインストールし、再生を決定的で再現可能にし、データ変更によるフレーキーを避けます。"
    ),
    CODE("javascript", `// verify.provider.ts — chạy trong CI của limits-svc
import { Verifier } from '@pact-foundation/pact';

new Verifier({
  provider: 'limits-svc',
  providerBaseUrl: 'http://localhost:8081',
  // lấy mọi hợp đồng của provider này từ broker
  pactBrokerUrl: process.env.PACT_BROKER_URL,
  publishVerificationResult: true,
  providerVersion: process.env.GIT_SHA,
  // state handler: đưa provider về đúng trạng thái consumer giả định
  stateHandlers: {
    'customer c-1 has a daily limit': async () => {
      await db.limits.upsert({ customerId: 'c-1', daily: 5_000_000, used: 2_650_000 });
    },
  },
}).verifyProvider().then(() => {
  console.log('✓ all consumer contracts satisfied'); // oracle: tương thích
});`),
    P(
      "Khi verify chạy, mỗi tương tác trong mỗi hợp đồng của mọi consumer sẽ được kiểm. Nếu provider trả thiếu trường 'remaining', đổi kiểu 'allowed' từ boolean sang chuỗi, hay đổi mã trạng thái, Verifier báo trượt kèm chi tiết đúng trường nào lệch. Đây là lúc oracle tương thích phát huy: nó không hỏi 'provider có chạy không' mà hỏi 'provider có còn tôn trọng mọi cam kết với mọi consumer không'. Kết quả verify được publish ngược lên broker, tạo một ma trận: phiên bản provider nào tương thích với phiên bản consumer nào — nền tảng cho quyết định triển khai an toàn ở chương sau.",
      "When verification runs, every interaction in every contract of every consumer is checked. If the provider returns a missing 'remaining' field, changes 'allowed' from boolean to string, or changes the status code, the Verifier reports a failure with the exact field that drifted. This is where the compatibility oracle shines: it does not ask 'does the provider run' but 'does the provider still honor every commitment to every consumer'. The verification result is published back to the broker, forming a matrix: which provider version is compatible with which consumer version — the basis for safe deployment decisions in the next chapter.",
      "検証が実行されると、すべてのコンシューマーのすべての契約のすべての相互作用がチェックされます。プロバイダーが「remaining」フィールドを欠いて返したり、「allowed」をブールから文字列に変えたり、ステータスコードを変えたりすれば、Verifierはずれた正確なフィールドとともに失敗を報告します。ここで互換性オラクルが輝きます。「プロバイダーが動くか」ではなく「プロバイダーがすべてのコンシューマーへのすべての約束を依然として守るか」を問います。検証結果はブローカーに公開され、行列を形成します。どのプロバイダーバージョンがどのコンシューマーバージョンと互換か。次章の安全なデプロイ判断の基礎です。"
    ),
    NOTE(
      "State handler nên tạo dữ liệu tối thiểu đủ cho tương tác, và dọn sạch sau đó. State rò rỉ giữa các tương tác là nguồn flaky kín đáo.",
      "State handlers should create the minimum data needed for the interaction and clean up afterward. State leaking between interactions is a subtle source of flakiness.",
      "状態ハンドラーは相互作用に必要な最小限のデータを作成し、その後クリーンアップすべきです。相互作用間で状態が漏れるのは、微妙なフレーキーの原因です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Phát hiện thay đổi phá vỡ (breaking change) & versioning",
    en: "6. Detecting breaking changes & versioning",
    ja: "6. 破壊的変更の検出とバージョニング",
  },
  blocks: [
    P(
      "Không phải mọi thay đổi hợp đồng đều nguy hiểm. Thêm một trường mới vào response thường là thay đổi tương thích ngược (consumer cũ vẫn chạy). Nhưng xóa một trường, đổi kiểu, đổi tên, hay thắt chặt ràng buộc là thay đổi phá vỡ — sẽ làm consumer hiện có thất bại. Nhiệm vụ của kiểm thử hợp đồng, có AI agent hỗ trợ, là phân loại đúng mỗi thay đổi. Agent so sánh hợp đồng cũ với đề xuất mới và gắn nhãn: tương thích, phá vỡ, hay mơ hồ. Nhưng quyết định 'đây có phải breaking không' vẫn cần con người khi ngữ cảnh nghiệp vụ phức tạp.",
      "Not every contract change is dangerous. Adding a new field to a response is usually a backward-compatible change (old consumers still run). But removing a field, changing a type, renaming, or tightening a constraint is a breaking change — it will make existing consumers fail. The job of contract testing, aided by the AI agent, is to classify each change correctly. The agent compares the old contract with the new proposal and labels it: compatible, breaking, or ambiguous. But the decision 'is this breaking?' still needs a human when the business context is complex.",
      "すべての契約変更が危険なわけではありません。レスポンスに新しいフィールドを追加するのは通常、後方互換の変更です（古いコンシューマーは依然として動く）。しかしフィールドの削除、型の変更、名前の変更、制約の強化は破壊的変更で、既存のコンシューマーを失敗させます。AIエージェントに支援された契約テストの仕事は、各変更を正しく分類することです。エージェントは古い契約と新しい提案を比較し、互換・破壊的・曖昧とラベル付けします。しかし「これは破壊的か」という判断は、業務コンテキストが複雑なとき依然として人間を必要とします。"
    ),
    IMG(
      `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="220" rx="12" fill="#0b1220"/>
<text x="330" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">Change classification → gate</text>
<rect x="30" y="55" width="180" height="45" rx="8" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="120" y="76" text-anchor="middle" fill="#dcfce7" font-size="11" font-weight="700">Add optional field</text>
<text x="120" y="92" text-anchor="middle" fill="#86efac" font-size="10">→ compatible ✓</text>
<rect x="30" y="110" width="180" height="45" rx="8" fill="#3b0a0a" stroke="#f87171" stroke-width="2"/>
<text x="120" y="131" text-anchor="middle" fill="#fecaca" font-size="11" font-weight="700">Remove used field</text>
<text x="120" y="147" text-anchor="middle" fill="#fca5a5" font-size="10">→ breaking ✗</text>
<rect x="30" y="165" width="180" height="40" rx="8" fill="#3b2a06" stroke="#fbbf24" stroke-width="2"/>
<text x="120" y="185" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="700">Change type</text>
<text x="120" y="199" text-anchor="middle" fill="#fcd34d" font-size="10">→ breaking / review ⚠</text>
<path d="M210 110 L300 120" stroke="#7dd3fc" stroke-width="2" fill="none"/>
<rect x="305" y="95" width="150" height="55" rx="8" fill="#0369a1" stroke="#7dd3fc" stroke-width="2"/>
<text x="380" y="120" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">can-i-deploy?</text>
<text x="380" y="138" text-anchor="middle" fill="#bae6fd" font-size="10">check matrix</text>
<path d="M455 122 L520 122" stroke="#fca5a5" stroke-width="2" fill="none"/>
<rect x="525" y="95" width="110" height="55" rx="8" fill="#7c2d12" stroke="#fca5a5" stroke-width="2"/>
<text x="580" y="120" text-anchor="middle" fill="#f1f5f9" font-size="12" font-weight="700">BLOCK</text>
<text x="580" y="138" text-anchor="middle" fill="#fecaca" font-size="10">if incompatible</text>
</svg>`,
      "Phân loại thay đổi hợp đồng và ánh xạ tới quyết định gate: chỉ chặn khi thực sự phá vỡ tương thích.",
      "Classifying contract changes and mapping to a gate decision: block only when compatibility is truly broken.",
      "契約変更を分類しゲート判断にマッピングします。互換性が本当に壊れたときのみブロックします。"
    ),
    P(
      "Chiến lược versioning là chìa khóa để hai đội tiến hóa độc lập. Mỗi phiên bản consumer và provider được gắn thẻ (thường bằng git SHA) khi publish/verify. Broker giữ ma trận tương thích. Nhờ đó, khi một đội muốn thêm trường mới, họ có thể triển khai an toàn nếu thay đổi là tương thích ngược, kể cả khi consumer chưa cập nhật. Ngược lại, nếu ai đó cố xóa một trường mà một consumer đang phụ thuộc, ma trận sẽ chỉ ra ngay cặp không tương thích. Việc phân loại này biến 'sợ đổi giao diện' thành 'đổi có kiểm soát'.",
      "The versioning strategy is the key to letting two teams evolve independently. Each consumer and provider version is tagged (usually by git SHA) at publish/verify time. The broker keeps the compatibility matrix. So when a team wants to add a new field, they can deploy safely if the change is backward-compatible, even if the consumer has not updated. Conversely, if someone tries to remove a field a consumer depends on, the matrix immediately shows the incompatible pair. This classification turns 'fear of interface changes' into 'controlled change'.",
      "バージョニング戦略は、2つのチームが独立して進化するための鍵です。各コンシューマーとプロバイダーのバージョンは公開/検証時にタグ付け（通常git SHA）されます。ブローカーは互換性行列を保持します。したがってチームが新しいフィールドを追加したいとき、変更が後方互換ならコンシューマーが更新していなくても安全にデプロイできます。逆に、誰かがコンシューマーが依存するフィールドを削除しようとすると、行列は即座に非互換のペアを示します。この分類は「インターフェース変更への恐れ」を「制御された変更」に変えます。"
    ),
    QA(
      "Thêm một trường mới vào response có phải breaking change không?",
      "Is adding a new field to a response a breaking change?",
      "Thường thì KHÔNG, nếu consumer bỏ qua trường lạ (tolerant reader). Thêm trường tùy chọn là tương thích ngược: consumer cũ vẫn đọc được những gì nó cần. Nhưng nó CÓ THỂ phá vỡ nếu consumer dùng kiểu kiểm tra 'strict' từ chối trường lạ, hoặc nếu trường mới bắt buộc trong request. Vì thế nguyên tắc: provider nên thêm cẩn thận, consumer nên đọc khoan dung. Oracle tương thích kiểm đúng ranh giới này qua matcher.",
      "Usually NO, if the consumer ignores unknown fields (tolerant reader). Adding an optional field is backward-compatible: an old consumer still reads what it needs. But it CAN break if the consumer uses 'strict' validation that rejects unknown fields, or if the new field is required in a request. Hence the principle: providers should add carefully, consumers should read tolerantly. The compatibility oracle checks exactly this boundary through matchers.",
      "通常はいいえです。コンシューマーが未知のフィールドを無視すれば（寛容なリーダー）。オプションフィールドの追加は後方互換です。古いコンシューマーは必要なものを依然として読めます。しかし、コンシューマーが未知のフィールドを拒否する「厳密な」検証を使う場合、または新フィールドがリクエストで必須の場合は壊れる可能性があります。したがって原則は、プロバイダーは慎重に追加し、コンシューマーは寛容に読むべきです。互換性オラクルはマッチャーを通じてまさにこの境界をチェックします。",
      "レスポンスに新しいフィールドを追加するのは破壊的変更ですか？"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Cổng CI: can-i-deploy chặn triển khai không tương thích",
    en: "7. The CI gate: can-i-deploy blocks incompatible deployments",
    ja: "7. CIゲート：can-i-deployが非互換なデプロイをブロック",
  },
  blocks: [
    P(
      "Đây là nơi hợp đồng biến thành cổng bảo vệ thật sự. Pact broker cung cấp truy vấn 'can-i-deploy': trước khi triển khai một phiên bản provider (hoặc consumer) lên môi trường, ta hỏi broker rằng phiên bản này có tương thích với mọi đối tác đang chạy ở môi trường đó không. Nếu có bất kỳ cặp nào chưa verify hoặc verify trượt, lệnh trả về mã lỗi khác không và pipeline dừng. Nhờ vậy, oracle tương thích không chỉ là một bài test chạy cho vui mà là điều kiện cứng để được phép phát hành — đúng tinh thần oracle-first.",
      "This is where the contract turns into a real protective gate. The Pact broker provides a 'can-i-deploy' query: before deploying a provider (or consumer) version to an environment, we ask the broker whether this version is compatible with every partner currently running in that environment. If any pair is unverified or fails verification, the command returns a non-zero exit code and the pipeline stops. So the compatibility oracle is not just a test that runs for show but a hard condition to be allowed to release — exactly the oracle-first spirit.",
      "ここで契約が本物の保護ゲートになります。Pactブローカーは「can-i-deploy」クエリを提供します。プロバイダー（またはコンシューマー）のバージョンを環境にデプロイする前に、このバージョンがその環境で現在動作するすべてのパートナーと互換かをブローカーに尋ねます。いずれかのペアが未検証または検証失敗なら、コマンドは非ゼロの終了コードを返しパイプラインが止まります。したがって互換性オラクルは見せかけで動くテストではなく、リリースを許可される厳格な条件です。まさにオラクル優先の精神です。"
    ),
    CODE("yaml", `# .github/workflows/contract-gate.yml
name: contract-gate
on: [push]
jobs:
  consumer-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run consumer tests (sinh & publish pact)
        run: npm run test:pact
      - name: Publish to broker
        run: |
          pact-broker publish ./pacts \
            --consumer-app-version "\${{ github.sha }}" \
            --branch "\${{ github.ref_name }}"
  can-i-deploy:
    needs: [consumer-contract]
    runs-on: ubuntu-latest
    steps:
      - name: Gate — chỉ deploy nếu tương thích với 'production'
        run: |
          pact-broker can-i-deploy \
            --pacticipant account-svc \
            --version "\${{ github.sha }}" \
            --to-environment production   # exit != 0 nếu KHÔNG tương thích
      - name: Guardrail — agent không được tự merge pact
        run: node ci/guard-agent-pact.mjs   # fail nếu tác giả là bot agent`),
    P(
      "Có hai lớp bảo vệ đáng chú ý. Thứ nhất, bước 'can-i-deploy' là oracle triển khai: nó tra ma trận tương thích trong broker và chỉ cho phép đi tiếp nếu phiên bản này an toàn với production hiện tại. Thứ hai, guardrail 'guard-agent-pact' thực thi ranh giới AI: nếu một PR sửa hợp đồng do bot agent tạo mà chưa có review người, pipeline từ chối. Cấu trúc này bảo đảm agent có thể đề xuất nhanh nhưng không bao giờ tự đưa một hợp đồng chưa được kiểm chứng vào nguồn sự thật. Con người vẫn là người ký duyệt cuối cùng cho mọi thay đổi oracle.",
      "There are two notable protection layers. First, the 'can-i-deploy' step is the deployment oracle: it queries the compatibility matrix in the broker and only lets you proceed if this version is safe with the current production. Second, the 'guard-agent-pact' guardrail enforces the AI boundary: if a PR modifies a contract authored by the agent bot without human review, the pipeline rejects it. This structure ensures the agent can propose quickly but never puts an unverified contract into the source of truth on its own. The human remains the final approver for every oracle change.",
      "注目すべき保護層が2つあります。第一に、「can-i-deploy」ステップはデプロイオラクルです。ブローカーの互換性行列を照会し、このバージョンが現在の本番と安全な場合のみ進行を許可します。第二に、「guard-agent-pact」ガードレールはAI境界を強制します。エージェントボットが作成した契約を人間のレビューなしに変更するPRなら、パイプラインは却下します。この構造は、エージェントが素早く提案できるが、検証されていない契約を自分で信頼できる情報源に入れないことを保証します。人間はすべてのオラクル変更の最終承認者であり続けます。"
    ),
    TIP(
      "Gắn thẻ môi trường (production/staging) cho phiên bản khi verify để can-i-deploy biết 'đối tác đang chạy ở đâu'. Không có thẻ môi trường, ma trận tương thích vô nghĩa.",
      "Tag versions with environments (production/staging) at verify time so can-i-deploy knows 'where the partner runs'. Without environment tags, the compatibility matrix is meaningless.",
      "検証時にバージョンに環境タグ（production/staging）を付け、can-i-deployが「パートナーがどこで動くか」を知るようにします。環境タグがなければ互換性行列は無意味です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Ca lỗi sâu: xóa trường, đổi kiểu & tương thích ngược",
    en: "8. Deep failure case: field removal, type change & backward compat",
    ja: "8. 深い障害ケース：フィールド削除、型変更、後方互換性",
  },
  blocks: [
    P(
      "Hãy đi sâu vào ca phá vỡ điển hình nhất trong ngân hàng: provider 'limits-svc' muốn refactor và đổi 'remaining' từ số nguyên (đơn vị đồng) sang một object { amount, currency }. Với provider, đây là cải tiến; với consumer 'account-svc' đang đọc 'remaining' như số, đây là thảm họa — mọi phép tính hạn mức sẽ sai hoặc lỗi runtime. Oracle tương thích bắt chính xác điều này: khi verify, Verifier phát lại tương tác cũ và thấy response mới không còn khớp matcher integer() cho 'remaining'. Bài verify trượt, can-i-deploy trả về không tương thích, pipeline chặn — trước khi một đồng nào bị tính sai.",
      "Let us dive into the most classic breaking case in banking: the provider 'limits-svc' wants to refactor and change 'remaining' from an integer (in đồng) to an object { amount, currency }. For the provider this is an improvement; for the consumer 'account-svc' reading 'remaining' as a number, it is a disaster — every limit calculation will be wrong or crash at runtime. The compatibility oracle catches exactly this: at verification, the Verifier replays the old interaction and sees the new response no longer matches the integer() matcher for 'remaining'. Verification fails, can-i-deploy returns incompatible, the pipeline blocks — before a single đồng is miscalculated.",
      "銀行で最も典型的な破壊的ケースを深掘りしましょう。プロバイダー「limits-svc」はリファクタリングして「remaining」を整数（đồng単位）からオブジェクト { amount, currency } に変えたいとします。プロバイダーにとっては改善ですが、「remaining」を数値として読むコンシューマー「account-svc」にとっては災害です。すべての限度額計算が間違うか実行時にクラッシュします。互換性オラクルはまさにこれを捕捉します。検証時、Verifierは古い相互作用を再生し、新しいレスポンスが「remaining」のinteger()マッチャーにもはや一致しないことを見ます。検証は失敗し、can-i-deployは非互換を返し、パイプラインはブロックします。1đồngも誤計算される前に。"
    ),
    CODE("javascript", `// verify chạy trong CI của provider MỚI -> phát hiện breaking
// Response cũ (hợp đồng consumer kỳ vọng):   { remaining: 2350000 }
// Response mới (provider refactor):          { remaining: { amount: 2350000, currency: 'VND' } }

// Verifier output (rút gọn):
// ✗ Verifying a pact between account-svc and limits-svc
//   check-limit request for 15000
//     returns a response which
//       has a matching body
//         $.remaining -> Expected integer but got Hash
//           { "amount": 2350000, "currency": "VND" }
//
// Result: FAILED (1 interaction) -> exit 1 -> can-i-deploy = NO`),
    P(
      "Cách xử lý đúng khi gặp breaking không phải là 'nới hợp đồng cho qua', mà là quản lý vòng đời tương thích. Provider có thể dùng expand-and-contract: thêm trường mới 'remainingDetail' (object) song song với 'remaining' cũ (giữ nguyên số), phát hành; đợi consumer chuyển sang dùng 'remainingDetail'; rồi mới bỏ 'remaining' cũ ở một phát hành sau, khi ma trận tương thích xác nhận không còn consumer nào phụ thuộc. AI agent hỗ trợ bằng cách quét toàn bộ consumer để trả lời 'còn ai đang dùng remaining không', nhưng quyết định các bước migration vẫn do con người hoạch định.",
      "The right way to handle a breaking change is not 'loosen the contract to pass', but to manage the compatibility lifecycle. The provider can use expand-and-contract: add a new field 'remainingDetail' (object) alongside the old 'remaining' (keep the number), release; wait for consumers to switch to 'remainingDetail'; only then drop the old 'remaining' in a later release, when the compatibility matrix confirms no consumer depends on it. The AI agent helps by scanning all consumers to answer 'is anyone still using remaining', but the migration steps are still planned by humans.",
      "破壊的変更への正しい対処は「通すために契約を緩める」ことではなく、互換性のライフサイクルを管理することです。プロバイダーはexpand-and-contractを使えます。古い「remaining」（数値のまま）と並行して新フィールド「remainingDetail」（オブジェクト）を追加してリリースし、コンシューマーが「remainingDetail」に切り替えるのを待ち、互換性行列がどのコンシューマーも依存しないと確認したときにのみ、後のリリースで古い「remaining」を削除します。AIエージェントは「まだremainingを使う人がいるか」に答えるため全コンシューマーをスキャンして支援しますが、移行手順は依然として人間が計画します。"
    ),
    WARN(
      "Khi verify trượt vì breaking, TUYỆT ĐỐI không sửa hợp đồng cho khớp response mới để 'làm xanh CI'. Đó là xóa bằng chứng lỗi thật; consumer production vẫn sẽ vỡ.",
      "When verification fails due to a breaking change, NEVER edit the contract to match the new response just to 'make CI green'. That erases evidence of a real bug; production consumers will still break.",
      "破壊的変更で検証が失敗したとき、「CIを緑にする」ために新しいレスポンスに合わせて契約を編集することは決してしてはいけません。それは本当のバグの証拠を消すことで、本番のコンシューマーは依然として壊れます。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "9. Ma trận ca kiểm thử hợp đồng theo bảng quyết định",
    en: "9. The contract test-case matrix as a decision table",
    ja: "9. 決定表としての契約テストケース行列",
  },
  blocks: [
    P(
      "Để phủ hợp đồng cho một tương tác nghiệp vụ như kiểm hạn mức, ta không chỉ viết một tương tác 'happy path' mà lập một bảng quyết định các trạng thái mà consumer phụ thuộc: hạn mức còn dư (allowed=true), vượt hạn mức (allowed=false), khách bị khóa (403), khách không tồn tại (404), dịch vụ tạm quá tải (503). Mỗi hàng trong bảng trở thành một tương tác trong hợp đồng với provider state riêng. Oracle vẫn là tương thích: consumer khai báo nó cần xử lý được năm nhánh này, và provider phải chứng minh trả về đúng cấu trúc cho từng nhánh.",
      "To cover the contract for a business interaction like limit checking, we do not just write one 'happy path' interaction but build a decision table of the states the consumer depends on: limit remaining (allowed=true), over limit (allowed=false), customer locked (403), customer not found (404), service temporarily overloaded (503). Each row of the table becomes an interaction in the contract with its own provider state. The oracle is still compatibility: the consumer declares it needs to handle these five branches, and the provider must prove it returns the right structure for each branch.",
      "限度額チェックのような業務相互作用の契約をカバーするため、1つの「ハッピーパス」相互作用だけを書くのではなく、コンシューマーが依存する状態の決定表を作ります。限度額に余裕（allowed=true）、限度額超過（allowed=false）、顧客ロック（403）、顧客不在（404）、サービス一時過負荷（503）。表の各行は独自のプロバイダー状態を持つ契約内の相互作用になります。オラクルは依然として互換性です。コンシューマーはこの5つの分岐を処理する必要があると宣言し、プロバイダーは各分岐に正しい構造を返すことを証明しなければなりません。"
    ),
    IMG(
      `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="220" rx="12" fill="#0b1220"/>
<text x="330" y="26" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800">Decision table — check-limit contract</text>
<g font-size="11" fill="#e2e8f0">
<rect x="24" y="42" width="612" height="28" fill="#12315e"/>
<text x="36" y="61" font-weight="700" fill="#7dd3fc">Provider state</text>
<text x="300" y="61" font-weight="700" fill="#7dd3fc">Status</text>
<text x="420" y="61" font-weight="700" fill="#7dd3fc">Oracle (shape)</text>
<line x1="24" y1="70" x2="636" y2="70" stroke="#334155"/>
<text x="36" y="90">has remaining limit</text><text x="300" y="90">200</text><text x="420" y="90">allowed:bool, remaining:int</text>
<line x1="24" y1="100" x2="636" y2="100" stroke="#1e293b"/>
<text x="36" y="119">over limit</text><text x="300" y="119">200</text><text x="420" y="119">allowed:false, reason:str</text>
<line x1="24" y1="129" x2="636" y2="129" stroke="#1e293b"/>
<text x="36" y="148">customer locked</text><text x="300" y="148">403</text><text x="420" y="148">code:"LOCKED"</text>
<line x1="24" y1="158" x2="636" y2="158" stroke="#1e293b"/>
<text x="36" y="177">customer not found</text><text x="300" y="177">404</text><text x="420" y="177">code:"NOT_FOUND"</text>
<line x1="24" y1="187" x2="636" y2="187" stroke="#1e293b"/>
<text x="36" y="206">overloaded</text><text x="300" y="206">503</text><text x="420" y="206">retryAfter:int</text>
</g>
</svg>`,
      "Bảng quyết định biến mỗi nhánh nghiệp vụ thành một tương tác hợp đồng với oracle hình dạng riêng.",
      "The decision table turns each business branch into a contract interaction with its own shape oracle.",
      "決定表は各業務分岐を独自の形状オラクルを持つ契約相互作用に変えます。"
    ),
    P(
      "Cách lập bảng này quan trọng vì consumer thường xử lý các nhánh lỗi khác nhau: 403 hiển thị thông báo khóa tài khoản, 404 báo dữ liệu sai, 503 kích hoạt cơ chế thử lại. Nếu hợp đồng chỉ phủ happy path, một thay đổi ở nhánh 503 (ví dụ provider bỏ trường retryAfter) sẽ lọt qua CI mà consumer thử lại sai. AI agent giúp đề xuất các nhánh còn thiếu bằng cách đối chiếu mã xử lý lỗi của consumer với các tương tác đã có trong hợp đồng, chỉ ra 'consumer xử lý 503 nhưng hợp đồng chưa phủ'. Con người xác nhận và bổ sung.",
      "Building this table matters because the consumer usually handles error branches differently: 403 shows an account-locked message, 404 flags bad data, 503 triggers a retry mechanism. If the contract only covers the happy path, a change in the 503 branch (e.g. the provider drops the retryAfter field) slips through CI while the consumer retries wrongly. The AI agent helps propose missing branches by matching the consumer's error-handling code against the interactions already in the contract, pointing out 'the consumer handles 503 but the contract does not cover it'. Humans confirm and add.",
      "この表を作ることが重要なのは、コンシューマーが通常エラー分岐を異なる方法で処理するからです。403はアカウントロックのメッセージを表示し、404は不正データを示し、503は再試行メカニズムを起動します。契約がハッピーパスのみをカバーすると、503分岐の変更（例：プロバイダーがretryAfterフィールドを削除）はCIをすり抜け、コンシューマーは誤って再試行します。AIエージェントは、コンシューマーのエラー処理コードを契約内の既存の相互作用と突き合わせ、「コンシューマーは503を処理するが契約はカバーしていない」と指摘して、欠けている分岐の提案を助けます。人間が確認し追加します。"
    ),
    QA(
      "Vì sao cần phủ cả nhánh lỗi (403/404/503) trong hợp đồng, không chỉ happy path?",
      "Why cover error branches (403/404/503) in the contract, not just the happy path?",
      "Vì consumer xử lý mỗi nhánh lỗi bằng logic khác nhau và phụ thuộc vào cấu trúc response của nhánh đó (mã lỗi, retryAfter...). Nếu provider đổi cấu trúc nhánh lỗi mà hợp đồng không phủ, CI xanh giả còn consumer vỡ ở production — thường vào đúng lúc hệ thống đang căng (503). Hợp đồng phải bảo vệ cả con đường hạnh phúc lẫn con đường đau khổ, vì cả hai đều là cam kết mà consumer dựa vào.",
      "Because the consumer handles each error branch with different logic and depends on that branch's response structure (error code, retryAfter, etc.). If the provider changes an error branch's structure and the contract does not cover it, CI is falsely green while the consumer breaks in production — often exactly when the system is under stress (503). The contract must protect both the happy path and the unhappy path, because both are commitments the consumer relies on.",
      "コンシューマーは各エラー分岐を異なるロジックで処理し、その分岐のレスポンス構造（エラーコード、retryAfterなど）に依存するからです。プロバイダーがエラー分岐の構造を変え、契約がカバーしなければ、CIは誤って緑になりコンシューマーは本番で壊れます。多くの場合、まさにシステムが逼迫しているとき（503）です。契約はハッピーパスとアンハッピーパスの両方を守らなければなりません。どちらもコンシューマーが依存する約束だからです。",
      "なぜハッピーパスだけでなくエラー分岐（403/404/503）も契約でカバーするのか？"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Bi-directional contract & tích hợp OpenAPI",
    en: "10. Bi-directional contracts & OpenAPI integration",
    ja: "10. 双方向契約とOpenAPIの統合",
  },
  blocks: [
    P(
      "Consumer-driven Pact rất mạnh nhưng đòi hỏi provider chạy verify chống lại hợp đồng của mọi consumer, đôi khi tốn công phối hợp. Một biến thể hữu ích là bi-directional contract testing: provider công bố đặc tả của mình (OpenAPI) như một 'provider contract', còn broker so khớp hợp đồng consumer với đặc tả đó thay vì phát lại vào provider thật. Cách này nhẹ hơn khi provider đã có OpenAPI chuẩn và đội provider không muốn tích hợp phát-lại. Oracle vẫn giữ nguyên bản chất: mọi kỳ vọng của consumer phải nằm trong tập khả năng mà provider công bố.",
      "Consumer-driven Pact is powerful but requires the provider to run verification against every consumer's contract, sometimes costly to coordinate. A useful variant is bi-directional contract testing: the provider publishes its own spec (OpenAPI) as a 'provider contract', and the broker cross-checks the consumer contract against that spec instead of replaying into the real provider. This is lighter when the provider already has a solid OpenAPI and the provider team does not want to integrate replay. The oracle keeps its essence: every consumer expectation must lie within the capability set the provider publishes.",
      "コンシューマー駆動のPactは強力ですが、プロバイダーがすべてのコンシューマーの契約に対して検証を実行する必要があり、調整が高くつくことがあります。有用な変種は双方向契約テストです。プロバイダーは自身の仕様（OpenAPI）を「プロバイダー契約」として公開し、ブローカーは実プロバイダーに再生する代わりに、コンシューマー契約をその仕様と相互チェックします。プロバイダーがすでに堅実なOpenAPIを持ち、プロバイダーチームが再生を統合したくない場合、これは軽量です。オラクルは本質を保ちます。すべてのコンシューマーの期待は、プロバイダーが公開する能力セット内になければなりません。"
    ),
    CODE("bash", `# bi-directional: provider publish OpenAPI làm provider contract
pactflow publish-provider-contract openapi.yaml \
  --provider limits-svc \
  --provider-app-version "$GIT_SHA" \
  --content-type application/yaml \
  --verification-results verify-report.json \
  --verifier "schemathesis"   # đã tự test provider khớp OpenAPI của chính nó

# broker sẽ so khớp: mọi kỳ vọng consumer ⊆ khả năng OpenAPI provider
# can-i-deploy vẫn dùng chung một cổng như CDC
pact-broker can-i-deploy --pacticipant account-svc \
  --version "$GIT_SHA" --to-environment production`),
    P(
      "Điểm cần cẩn trọng: bi-directional chỉ đáng tin khi provider thực sự tuân thủ OpenAPI của mình. Vì thế provider phải có bước tự kiểm (ví dụ schemathesis hoặc dredd) chứng minh mã chạy đúng đặc tả trước khi công bố; nếu không, ta chỉ so hợp đồng consumer với một tài liệu có thể sai lệch so với hiện thực. AI agent hữu ích ở đây khi phát hiện lệch giữa OpenAPI và hành vi thật của provider — nó đọc log/trace và cảnh báo 'đặc tả nói trường bắt buộc nhưng thực tế đôi khi vắng'. Con người quyết định sửa đặc tả hay sửa mã.",
      "A point to watch: bi-directional is only trustworthy when the provider actually conforms to its own OpenAPI. So the provider must have a self-check step (e.g. schemathesis or dredd) proving the code runs per spec before publishing; otherwise we only compare the consumer contract against a document that may diverge from reality. The AI agent is useful here in detecting drift between the OpenAPI and the provider's real behavior — it reads logs/traces and warns 'the spec says a field is required but in reality it is sometimes absent'. Humans decide whether to fix the spec or fix the code.",
      "注意点：双方向は、プロバイダーが実際に自身のOpenAPIに準拠するときのみ信頼できます。したがってプロバイダーは公開前にコードが仕様通り動くことを証明する自己チェックステップ（例：schemathesisやdredd）を持たなければなりません。そうでなければ、現実と乖離しうるドキュメントとコンシューマー契約を比較するだけです。AIエージェントはここで、OpenAPIとプロバイダーの実際の挙動のずれを検出するのに有用です。ログとトレースを読み「仕様はフィールドを必須と言うが実際は時々欠ける」と警告します。人間は仕様を直すかコードを直すか決めます。"
    ),
    NOTE(
      "CDC (phát lại) và bi-directional (so đặc tả) không loại trừ nhau. Nhiều đội dùng CDC cho ranh giới quan trọng nhất, bi-directional cho các provider đã có OpenAPI vững.",
      "CDC (replay) and bi-directional (spec comparison) are not mutually exclusive. Many teams use CDC for the most critical boundaries and bi-directional for providers that already have a solid OpenAPI.",
      "CDC（再生）と双方向（仕様比較）は相互排他的ではありません。多くのチームは最も重要な境界にCDCを、堅実なOpenAPIを持つプロバイダーに双方向を使います。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Chống flaky trong kiểm thử hợp đồng",
    en: "11. Fighting flakiness in contract testing",
    ja: "11. 契約テストのフレーキー対策",
  },
  blocks: [
    P(
      "Kiểm thử hợp đồng ít flaky hơn E2E nhưng không miễn nhiễm. Ba nguồn flaky phổ biến: một là matcher quá chặt (khớp giá trị cụ thể thay vì hình dạng) làm test đỏ mỗi khi dữ liệu đổi; hai là provider state không xác định (dữ liệu nền rò rỉ giữa các tương tác, hoặc phụ thuộc thứ tự chạy); ba là phụ thuộc thời gian (timestamp, TTL) không được matcher hóa. Nguyên tắc chống flaky ở đây trùng với nguyên tắc oracle: chỉ khẳng định đúng thứ ta thực sự phụ thuộc — cấu trúc và ràng buộc — và mô tả phần biến thiên bằng matcher thay vì giá trị cứng.",
      "Contract testing is less flaky than E2E but not immune. Three common flaky sources: one, overly strict matchers (matching a concrete value instead of a shape) turn the test red whenever data changes; two, non-deterministic provider state (background data leaking between interactions, or run-order dependence); three, time dependence (timestamps, TTLs) not matcher-ized. The anti-flaky principle here coincides with the oracle principle: assert only what we truly depend on — structure and constraints — and describe the variable parts with matchers instead of hard values.",
      "契約テストはE2Eよりフレーキーが少ないですが、免疫ではありません。一般的なフレーキー源が3つあります。1つ目は厳しすぎるマッチャー（形状ではなく具体的な値の一致）で、データが変わるたびにテストが赤くなります。2つ目は非決定的なプロバイダー状態（相互作用間でバックグラウンドデータが漏れる、または実行順序に依存する）。3つ目はマッチャー化されていない時間依存（タイムスタンプ、TTL）です。ここでのフレーキー対策の原則はオラクルの原則と一致します。本当に依存するもの、すなわち構造と制約のみをアサーションし、変動する部分をハードな値ではなくマッチャーで記述します。"
    ),
    CODE("javascript", `// dùng matcher cho phần biến thiên -> hết flaky do dữ liệu/thời gian
import { MatchersV3 } from '@pact-foundation/pact';
const { integer, datetime, uuid, eachLike } = MatchersV3;

willRespondWith({
  status: 200,
  body: {
    txId: uuid('9f1c...-...-...'),               // bất kỳ UUID hợp lệ
    createdAt: datetime("yyyy-MM-dd'T'HH:mm:ssZ", '2026-07-07T04:00:00Z'),
    remaining: integer(2350000),                 // bất kỳ số nguyên
    entries: eachLike({ acc: 'a-1', delta: integer(-15000) }, 1), // >=1 phần tử cùng hình dạng
  },
});`),
    P(
      "Chú ý eachLike: nó khai báo 'một mảng có ít nhất một phần tử, mỗi phần tử theo hình dạng này' — đúng thứ consumer cần, mà không cố định số lượng hay giá trị. datetime() ràng buộc định dạng thời gian mà không cố định thời điểm; uuid() chấp nhận mọi UUID hợp lệ. Sau khi matcher hóa đúng, một hợp đồng sẽ chỉ đỏ khi có thay đổi cấu trúc thật, không đỏ vì hôm nay dữ liệu khác hôm qua. Đây là điều làm cổng CI đáng tin: mỗi lần đỏ đều là tín hiệu thật, không phải nhiễu — và đội sẽ không học thói quen tai hại 'thấy đỏ thì chạy lại cho xanh'.",
      "Note eachLike: it declares 'an array with at least one element, each element of this shape' — exactly what the consumer needs, without fixing count or value. datetime() constrains the time format without fixing the instant; uuid() accepts any valid UUID. Once properly matcher-ized, a contract only goes red on a real structural change, not because today's data differs from yesterday's. This is what makes the CI gate trustworthy: every red is a real signal, not noise — and the team will not learn the harmful habit of 'see red, just rerun until green'.",
      "eachLikeに注目してください。「少なくとも1つの要素を持つ配列、各要素はこの形状」と宣言します。数量や値を固定せず、コンシューマーが必要とするものを正確に表します。datetime()は時刻を固定せず時間形式を制約し、uuid()は任意の有効なUUIDを受け入れます。適切にマッチャー化すると、契約は本当の構造変更のときのみ赤くなり、今日のデータが昨日と違うから赤くなることはありません。これがCIゲートを信頼できるものにします。すべての赤は本当の信号でありノイズではありません。そしてチームは「赤を見たら緑になるまで再実行する」という有害な習慣を身につけません。"
    ),
    TIP(
      "Đặt một 'wip' branch cho hợp đồng đang phát triển và chỉ áp cổng can-i-deploy cho nhánh chính. Nhờ đó đội thử nghiệm hợp đồng mới mà không chặn nhầm phát hành.",
      "Set a 'wip' branch for contracts under development and only apply the can-i-deploy gate to the main branch. This lets the team experiment with new contracts without falsely blocking releases.",
      "開発中の契約に「wip」ブランチを設定し、can-i-deployゲートはメインブランチにのみ適用します。これによりチームは新しい契約を試しつつ、リリースを誤ってブロックしません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Rủi ro, chống mẫu & bài học vận hành",
    en: "12. Risks, anti-patterns & operational lessons",
    ja: "12. リスク、アンチパターン、運用上の教訓",
  },
  blocks: [
    P(
      "Vận hành kiểm thử hợp đồng ở quy mô ngân hàng dạy ta vài chống mẫu đắt giá. Thứ nhất, 'hợp đồng khớp giá trị cứng' — nguồn flaky và bảo trì khổ sở; luôn dùng matcher hình dạng. Thứ hai, 'sửa hợp đồng cho khớp bug' — khi verify đỏ vì breaking, đừng nới hợp đồng, hãy sửa provider hoặc migration. Thứ ba, 'để agent tự merge hợp đồng' — agent có thể ảo giác một matcher sai và làm oracle mất giá trị; luôn giữ review người. Thứ tư, 'chỉ phủ happy path' — bỏ nhánh lỗi khiến consumer vỡ đúng lúc căng nhất. Thứ năm, 'quên gắn thẻ môi trường' — làm can-i-deploy vô nghĩa.",
      "Operating contract testing at bank scale teaches a few costly anti-patterns. First, 'contracts matching hard values' — a source of flakiness and maintenance pain; always use shape matchers. Second, 'editing the contract to match the bug' — when verification is red due to a breaking change, do not loosen the contract, fix the provider or the migration. Third, 'letting the agent self-merge contracts' — the agent can hallucinate a wrong matcher and devalue the oracle; always keep human review. Fourth, 'covering only the happy path' — dropping error branches makes the consumer break exactly when it is most stressed. Fifth, 'forgetting environment tags' — rendering can-i-deploy meaningless.",
      "銀行規模で契約テストを運用すると、いくつかの高価なアンチパターンを学びます。第一に「ハードな値に一致する契約」。フレーキーと保守の苦痛の原因で、常に形状マッチャーを使います。第二に「バグに合わせて契約を編集する」。破壊的変更で検証が赤いとき、契約を緩めずプロバイダーか移行を直します。第三に「エージェントに契約を自己マージさせる」。エージェントは誤ったマッチャーをハルシネーションしオラクルの価値を下げうるので、常に人間のレビューを保ちます。第四に「ハッピーパスのみをカバー」。エラー分岐を落とすとコンシューマーが最も逼迫したときに壊れます。第五に「環境タグを忘れる」。can-i-deployを無意味にします。"
    ),
    UL(
      ["Chống mẫu: matcher khớp giá trị cứng → dùng matcher hình dạng.",
       "Chống mẫu: sửa hợp đồng cho khớp bug → sửa provider/migration.",
       "Chống mẫu: agent tự merge hợp đồng → luôn review người.",
       "Chống mẫu: chỉ phủ happy path → phủ cả nhánh lỗi bằng bảng quyết định.",
       "Chống mẫu: quên gắn thẻ môi trường → luôn tag phiên bản theo môi trường."],
      ["Anti-pattern: hard-value matchers → use shape matchers.",
       "Anti-pattern: edit contract to match the bug → fix provider/migration.",
       "Anti-pattern: agent self-merges contracts → always human review.",
       "Anti-pattern: cover only happy path → cover error branches via decision table.",
       "Anti-pattern: forget environment tags → always tag versions by environment."],
      ["アンチパターン：ハード値マッチャー → 形状マッチャーを使う。",
       "アンチパターン：バグに合わせて契約を編集 → プロバイダー/移行を直す。",
       "アンチパターン：エージェントの契約自己マージ → 常に人間レビュー。",
       "アンチパターン：ハッピーパスのみカバー → 決定表でエラー分岐もカバー。",
       "アンチパターン：環境タグの忘却 → 常にバージョンを環境でタグ付け。"]
    ),
    SCEN(
      "Sự cố suýt xảy ra vì 'làm xanh CI'",
      "A near-miss from 'making CI green'",
      "Một provider verify đỏ vì đổi kiểu 'remaining'. Dưới áp lực deadline, một kỹ sư định sửa hợp đồng consumer để khớp response mới cho CI xanh. Reviewer chặn lại: làm vậy chỉ xóa cảnh báo, consumer production vẫn đọc số và sẽ vỡ. Đội chuyển sang expand-and-contract: thêm trường mới, giữ trường cũ, di trú consumer, rồi mới bỏ. Bài học: CI đỏ do breaking là bạn, không phải kẻ thù — nó đang ngăn một sự cố thật.",
      "A provider's verification went red from changing the type of 'remaining'. Under deadline pressure, an engineer nearly edited the consumer contract to match the new response for a green CI. The reviewer blocked it: doing so only erases the warning, the production consumer still reads a number and will break. The team moved to expand-and-contract: add the new field, keep the old one, migrate consumers, then drop. Lesson: a red CI from a breaking change is your friend, not your enemy — it is preventing a real incident.",
      "あるプロバイダーの検証が「remaining」の型変更で赤くなりました。締め切りの圧力の下、あるエンジニアは緑のCIのため新しいレスポンスに合わせてコンシューマー契約を編集しかけました。レビュアーがそれをブロックしました。そうすることは警告を消すだけで、本番のコンシューマーは依然として数値を読み壊れます。チームはexpand-and-contractに移りました。新フィールドを追加し、古いものを保ち、コンシューマーを移行し、その後削除します。教訓：破壊的変更による赤いCLは敵ではなく味方で、本当のインシデントを防いでいます。",
      "「CIを緑にする」ことによる危機一髪"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Góc phỏng vấn & tổng kết oracle-first",
    en: "13. Interview angle & oracle-first wrap-up",
    ja: "13. 面接での論点とオラクル優先のまとめ",
  },
  blocks: [
    P(
      "Trong phỏng vấn cho vị trí QA/SDET làm việc với microservice, câu hỏi kinh điển là 'làm sao đảm bảo các dịch vụ vẫn tương thích khi mỗi đội phát hành độc lập?'. Câu trả lời mạnh bắt đầu từ oracle tương thích, không từ công cụ: consumer khai báo kỳ vọng dưới dạng hợp đồng có matcher hình dạng; provider verify phát lại; broker giữ ma trận tương thích; can-i-deploy làm cổng CI; AI agent tăng tốc soạn và bảo trì hợp đồng trong ranh giới grounding còn con người ký duyệt. Người phỏng vấn muốn nghe bạn phân biệt breaking với non-breaking, và biết vì sao 'sửa hợp đồng cho xanh' là sai lầm nghiêm trọng.",
      "In interviews for a QA/SDET role working with microservices, the classic question is 'how do you ensure services stay compatible when each team releases independently?'. A strong answer starts from the compatibility oracle, not from tools: consumers declare expectations as contracts with shape matchers; providers verify by replay; the broker holds the compatibility matrix; can-i-deploy is the CI gate; the AI agent accelerates authoring and maintaining contracts within grounding boundaries while humans sign off. The interviewer wants to hear you distinguish breaking from non-breaking, and know why 'editing the contract to go green' is a serious mistake.",
      "マイクロサービスを扱うQA/SDET職の面接で、古典的な質問は「各チームが独立してリリースするとき、サービスの互換性をどう保証するか」です。強い回答はツールではなく互換性オラクルから始まります。コンシューマーは形状マッチャーを持つ契約として期待を宣言し、プロバイダーは再生で検証し、ブローカーは互換性行列を保持し、can-i-deployがCIゲートで、AIエージェントはグラウンディングの境界内で契約の作成と保守を加速し人間が承認します。面接官は、あなたが破壊的と非破壊的を区別し、なぜ「緑にするため契約を編集する」ことが深刻な間違いかを知っているかを聞きたいのです。"
    ),
    QA(
      "Kiểm thử hợp đồng khác kiểm thử tích hợp E2E ở điểm nào, và khi nào dùng cái nào?",
      "How does contract testing differ from E2E integration testing, and when do you use which?",
      "Kiểm thử hợp đồng kiểm từng cặp consumer-provider một cách cô lập và nhanh, tập trung vào tương thích giao diện; nó không cần cả hệ thống chạy cùng lúc. E2E kiểm luồng nghiệp vụ đầu-cuối qua nhiều dịch vụ thật, chậm và giòn hơn nhưng bắt được lỗi tích hợp hành vi mà hợp đồng không thấy (ví dụ logic sai dù cấu trúc đúng). Dùng hợp đồng làm lớp phòng thủ chính cho lệch giao diện giữa đội; giữ vài E2E mỏng cho luồng tiền quan trọng nhất.",
      "Contract testing checks each consumer-provider pair in isolation and fast, focusing on interface compatibility; it does not need the whole system running at once. E2E checks end-to-end business flows across many real services, slower and more brittle but catching behavioral integration bugs a contract cannot see (e.g. wrong logic despite correct structure). Use contracts as the primary defense against interface drift between teams; keep a few thin E2E for the most critical money flows.",
      "契約テストは各コンシューマー・プロバイダーのペアを隔離して速くチェックし、インターフェースの互換性に焦点を当てます。システム全体を同時に動かす必要はありません。E2Eは多くの実サービスにわたるエンドツーエンドの業務フローをチェックし、遅く脆いですが、契約が見られない振る舞いの統合バグ（例：構造は正しいがロジックが間違う）を捕捉します。チーム間のインターフェースのずれの主防御に契約を使い、最も重要な資金フローには薄いE2Eをいくつか保ちます。",
      "契約テストはE2E統合テストとどう違い、いつどちらを使うか？"
    ),
    QA(
      "Vì sao AI agent không được tự phán 'hợp đồng tương thích' và tự merge?",
      "Why can't the AI agent self-judge 'contract compatible' and self-merge?",
      "Vì tương thích hợp đồng là oracle phải xác định và kiểm chứng được bằng công cụ (Verifier, can-i-deploy), còn mô hình ngôn ngữ thì xác suất và có thể ảo giác một matcher sai hoặc bỏ sót một nhánh. Nếu agent nắm quyền, một sai sót của nó đưa thẳng vào nguồn sự thật và làm mọi cổng phía sau tin nhầm. Ta để công cụ xác minh và con người phán quyết; agent chỉ đề xuất có trích dẫn (mã consumer, đặc tả provider). Máy làm phần đọc-tổng-hợp, người giữ oracle.",
      "Because contract compatibility is an oracle that must be deterministic and tool-verifiable (Verifier, can-i-deploy), while a language model is probabilistic and can hallucinate a wrong matcher or miss a branch. If the agent holds the power, one of its mistakes goes straight into the source of truth and makes every downstream gate falsely trust it. We let tools verify and humans decide; the agent only proposes with citations (consumer code, provider spec). The machine does the read-and-synthesize, the human keeps the oracle.",
      "契約の互換性は決定的でツール検証可能（Verifier、can-i-deploy）でなければならないオラクルであり、言語モデルは確率的で誤ったマッチャーをハルシネーションしたり分岐を見逃したりしうるからです。エージェントが権限を握ると、その1つの誤りが信頼できる情報源に直接入り、下流のすべてのゲートが誤って信頼します。ツールに検証させ人間が判断します。エージェントは引用付き（コンシューマーのコード、プロバイダーの仕様）で提案するだけです。機械が読み取りと統合を行い、人間がオラクルを握ります。",
      "なぜAIエージェントは「契約は互換」と自己判定し自己マージできないのか？"
    ),
    P(
      "Tổng kết toàn bài: kiểm thử hợp đồng tích hợp với AI agent và CI là một hệ khép kín lấy tính tương thích làm oracle trung tâm. Consumer định nghĩa nhu cầu bằng matcher hình dạng; provider chứng minh đáp ứng qua verify; broker và can-i-deploy biến kết quả thành cổng chặn phát hành; AI agent tăng tốc soạn thảo, phát hiện phụ thuộc ngầm và phân loại thay đổi trong ranh giới grounding; con người giữ quyền ký duyệt mọi thay đổi oracle. Khi các mảnh này khớp, hàng chục đội có thể phát hành độc lập mỗi ngày mà không sợ vỡ giao diện — đúng điều một hệ thống ngân hàng phân tán cần để vừa nhanh vừa an toàn.",
      "To summarize the whole article: contract testing integrated with an AI agent and CI is a closed loop centered on compatibility as the oracle. Consumers define needs with shape matchers; providers prove they meet them through verification; the broker and can-i-deploy turn results into a release-blocking gate; the AI agent accelerates authoring, detects implicit dependencies, and classifies changes within grounding boundaries; humans keep sign-off on every oracle change. When these pieces fit, dozens of teams can release independently every day without fear of interface breakage — exactly what a distributed banking system needs to be both fast and safe.",
      "記事全体をまとめると、AIエージェントとCIに統合された契約テストは、互換性をオラクルの中心とした閉ループです。コンシューマーは形状マッチャーでニーズを定義し、プロバイダーは検証を通じてそれを満たすことを証明し、ブローカーとcan-i-deployは結果をリリースをブロックするゲートに変え、AIエージェントはグラウンディングの境界内で作成を加速し暗黙の依存を検出し変更を分類し、人間がすべてのオラクル変更の承認を握ります。これらの要素が噛み合うと、数十のチームがインターフェースの破壊を恐れず毎日独立してリリースできます。分散した銀行システムが速くて安全であるために必要なものです。"
    ),
  ],
});

export const AIAGENT_10 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-integrated-k6-agent-observability",
    cover: coverA,
    tags: tags("tichhop", "fintech", "aitesting", "k6", "cicd", "realworld"),
    title: {
      vi: "Tích hợp hiệu năng & chất lượng: AI agent + k6 + observability",
      en: "Integrated performance & quality: AI agent + k6 + observability",
      ja: "性能と品質の統合：AIエージェント + k6 + オブザーバビリティ",
    },
    summary: {
      vi: "Kết hợp kiểm thử hiệu năng bằng k6 với một AI agent và observability trên nền fintech: agent đề xuất kịch bản tải, phân tích trace/metric, còn oracle là SLO (p95 latency, tỉ lệ lỗi). Bài trình bày kiến trúc tương quan k6 với metric ứng dụng, cổng review của con người, và cổng CI chặn phát hành khi vi phạm SLO.",
      en: "Combine k6 performance testing with an AI agent and observability on a fintech platform: the agent proposes load scenarios and analyzes traces/metrics, while the oracle is the SLO (p95 latency, error rate). It covers correlating k6 with app metrics, a human review gate, and a CI gate that blocks releases on SLO violations.",
      ja: "フィンテック基盤でk6性能テストとAIエージェント、オブザーバビリティを組み合わせます。エージェントは負荷シナリオを提案しトレースとメトリクスを分析し、オラクルはSLO（p95レイテンシ、エラー率）です。k6とアプリメトリクスの相関、人間のレビューゲート、SLO違反でリリースを止めるCIゲートを扱います。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-integrated-contract-microservices-ai",
    cover: coverB,
    tags: tags("tichhop", "banking", "aitesting", "contract", "cicd", "advanced"),
    title: {
      vi: "Contract testing giữa microservices + AI agent + CI (ngân hàng)",
      en: "Contract testing between microservices + AI agent + CI (banking)",
      ja: "マイクロサービス間の契約テスト + AIエージェント + CI（銀行）",
    },
    summary: {
      vi: "Kiểm thử hợp đồng theo hướng consumer-driven (PACT) giữa các microservice ngân hàng, có AI agent hỗ trợ sinh và bảo trì hợp đồng, phát hiện thay đổi phá vỡ tương thích. Oracle là tính tương thích hợp đồng; provider verification chạy trong CI, con người review, và pipeline chặn phát hành khi hợp đồng không tương thích.",
      en: "Consumer-driven contract testing (PACT) between banking microservices, with an AI agent helping generate and maintain contracts and spot breaking changes. The oracle is contract compatibility; provider verification runs in CI, humans review, and the pipeline blocks releases when contracts are incompatible.",
      ja: "銀行のマイクロサービス間でコンシューマー駆動の契約テスト（PACT）を行い、AIエージェントが契約の生成・保守と破壊的変更の検出を支援します。オラクルは契約の互換性であり、プロバイダー検証はCIで実行され、人間がレビューし、契約が非互換のときパイプラインがリリースを止めます。",
    },
    pages: buildDoc(pagesB),
  },
];
