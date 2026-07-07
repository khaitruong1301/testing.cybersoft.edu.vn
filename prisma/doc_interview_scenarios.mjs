// ============================================================================
// CATEGORY: "Tình huống phỏng vấn chuyên sâu" (In-depth Interview Scenarios)
// Chuẩn Testing_BaiViet: mỗi bài ≥12 chương, ≥1500 từ/ngôn ngữ, ja DỊCH THẬT,
// ≥6 code, ≥2 img SVG, ≥3 qa, thumbnail SVG riêng. kind = "phongvan".
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

export const INTERVIEW_SCENARIO_CATEGORY = {
  slug: "interview-scenarios",
  icon: "🎯",
  title: { vi: "Tình huống phỏng vấn chuyên sâu", en: "In-depth Interview Scenarios", ja: "面接シナリオ（実践）" },
  description: {
    vi: "Tuyển tập TÌNH HUỐNG phỏng vấn Tester/QA thực chiến, phân tích chuyên sâu: nhà tuyển dụng đánh giá gì, khung trả lời ghi điểm, câu hỏi theo cấp độ, kịch bản mock 1-1, sai lầm khiến trượt và tiêu chí chấm điểm.",
    en: "A collection of real-world Tester/QA interview scenarios with deep analysis: what interviewers assess, winning answer frameworks, level-based questions, 1-1 mock scripts, failure pitfalls and scoring rubrics.",
    ja: "実務ベースのTester/QA面接シナリオ集。面接官の評価観点、加点される回答フレーム、レベル別の質問、1対1の模擬面接、不合格になる落とし穴、採点基準を深く解説します。",
  },
};

// --------------------------- SVG minh hoạ (bài 1) ---------------------------
const svgTransferFlow = `<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="210" rx="14" fill="#0b1220"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Luồng chuyển tiền · Money-transfer flow</text>
<g font-size="11" fill="#cbd5e1">
<rect x="24" y="60" width="120" height="46" rx="8" fill="#12315e" stroke="#3b82f6"/><text x="84" y="88" text-anchor="middle" fill="#fff">App / Client</text>
<rect x="192" y="60" width="130" height="46" rx="8" fill="#12315e" stroke="#3b82f6"/><text x="257" y="82" text-anchor="middle" fill="#fff">Payment API</text><text x="257" y="98" text-anchor="middle" fill="#93c5fd">Idempotency-Key</text>
<rect x="372" y="60" width="120" height="46" rx="8" fill="#12315e" stroke="#3b82f6"/><text x="432" y="88" text-anchor="middle" fill="#fff">Core Ledger</text>
<rect x="540" y="60" width="150" height="46" rx="8" fill="#12315e" stroke="#3b82f6"/><text x="615" y="82" text-anchor="middle" fill="#fff">Đối soát / Recon</text><text x="615" y="98" text-anchor="middle" fill="#93c5fd">webhook</text>
<path d="M144 83 h44" stroke="#38bdf8" stroke-width="2" marker-end="url(#a)"/><path d="M322 83 h44" stroke="#38bdf8" stroke-width="2" marker-end="url(#a)"/><path d="M492 83 h44" stroke="#38bdf8" stroke-width="2" marker-end="url(#a)"/>
<text x="60" y="150" fill="#94a3b8">Bất biến / Invariant: tổng tiền toàn hệ thống KHÔNG đổi (double-entry).</text>
<text x="60" y="172" fill="#94a3b8">Trạng thái cuối DUY NHẤT: succeeded | failed (không có ‘treo’).</text>
</g>
<defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#38bdf8"/></marker></defs>
</svg>`;

const svgTransferMatrix = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca kiểm thử · Test case matrix</text>
<g font-size="11">
<rect x="24" y="46" width="672" height="26" fill="#1e293b"/>
<text x="34" y="63" fill="#93c5fd" font-weight="700">Nhóm</text><text x="180" y="63" fill="#93c5fd" font-weight="700">Ca tiêu biểu</text><text x="560" y="63" fill="#93c5fd" font-weight="700">Bất biến/Oracle</text>
<g fill="#cbd5e1">
<text x="34" y="92">Chức năng</text><text x="180" y="92">Chuyển hợp lệ, đủ số dư</text><text x="560" y="92">Bảo toàn tiền</text>
<text x="34" y="118">Biên</text><text x="180" y="118">Đúng hạn mức / trên 1 đơn vị / số 0</text><text x="560" y="118">Từ chối đúng ngưỡng</text>
<text x="34" y="144">Âm tính</text><text x="180" y="144">Thiếu số dư, sai OTP, mất mạng</text><text x="560" y="144">Không trừ tiền</text>
<text x="34" y="170">Đồng thời</text><text x="180" y="170">2 lệnh cùng lúc / bấm 2 lần</text><text x="560" y="170">Idempotent, 1 lần trừ</text>
<text x="34" y="196">Phi chức năng</text><text x="180" y="196">Bảo mật, hiệu năng, đối soát</text><text x="560" y="196">RBAC, SLA, khớp recon</text>
</g>
<line x1="24" y1="100" x2="696" y2="100" stroke="#1e293b"/><line x1="24" y1="126" x2="696" y2="126" stroke="#1e293b"/><line x1="24" y1="152" x2="696" y2="152" stroke="#1e293b"/><line x1="24" y1="178" x2="696" y2="178" stroke="#1e293b"/>
</g></svg>`;

// =========================== BÀI 1: Chuyển tiền ===========================
const A1_pages = [
  {
    heading: { vi: "1. Bối cảnh tình huống phỏng vấn", en: "1. The interview scenario", ja: "1. 面接シナリオの背景" },
    blocks: [
      SCEN("Nhà tuyển dụng hỏi", "Interviewer's prompt",
        "“Ứng dụng ngân hàng của chúng tôi cho phép chuyển tiền giữa hai tài khoản. Không có tài liệu chi tiết. Bạn hãy thiết kế bộ test cho tính năng này và trình bày cách bạn tư duy.” Người phỏng vấn quan sát cách bạn biến một bài toán mơ hồ thành một hệ thống có ranh giới, rủi ro và tiêu chí đúng-sai.",
        "“Our banking app lets a user transfer money between two accounts. There is no detailed spec. Design the test set for this feature and walk me through your thinking.” The interviewer watches how you turn an ambiguous problem into a system with boundaries, risks and pass/fail criteria.",
        "「当行のアプリは二つの口座間で送金できます。詳細な仕様書はありません。この機能のテストセットを設計し、考え方を説明してください。」面接官は、曖昧な課題を境界・リスク・合否基準を持つシステムへと落とし込む思考過程を見ています。"),
      P("Đây là một trong những đề phỏng vấn kinh điển nhất của QA fintech, và cũng là nơi phần lớn ứng viên trung bình bộc lộ điểm yếu. Họ lao ngay vào liệt kê ca test giao diện mà quên rằng tiền là dữ liệu nhạy cảm nhất: một lỗi nhỏ có thể mất tiền thật, sai sổ sách, hoặc vi phạm quy định. Bài viết này bóc tách toàn bộ tình huống theo đúng cách một ứng viên senior sẽ trình bày.",
        "This is one of the most classic fintech QA prompts, and where many average candidates reveal weakness. They rush into listing UI cases and forget that money is the most sensitive data: a small bug can lose real funds, corrupt the books, or breach regulations. This article dissects the whole scenario the way a senior candidate would present it.",
        "これはフィンテックQA面接で最も典型的な設問の一つであり、平均的な候補者が弱点を露呈しやすい場面でもあります。彼らはUIのケース列挙に飛びつき、金銭が最も繊細なデータであることを忘れます。小さな不具合が実際の資金喪失・帳簿の不整合・規制違反を招きます。本稿では、シニア候補者の説明方法に沿って状況全体を分解します。"),
      NOTE("Mục tiêu của bạn không phải kể được nhiều ca nhất, mà cho thấy một PHƯƠNG PHÁP có thể áp dụng cho mọi bài toán mở.",
        "Your goal is not to name the most cases, but to demonstrate a METHOD that generalises to any open-ended problem.",
        "目標は最多のケースを挙げることではなく、あらゆる自由回答型の課題に応用できる「方法論」を示すことです。"),
    ],
  },
  {
    heading: { vi: "2. Điều nhà tuyển dụng thực sự đánh giá", en: "2. What the interviewer really assesses", ja: "2. 面接官が本当に評価する点" },
    blocks: [
      P("Trước khi trả lời, hãy hiểu bốn nhóm năng lực mà người phỏng vấn chấm ngầm. Hiểu được điều này giúp bạn định hướng câu trả lời để tối đa hoá điểm, thay vì kể lể ngẫu nhiên. Đa số vòng phỏng vấn thất bại không phải vì ứng viên thiếu kiến thức, mà vì họ trình bày không cho thấy tư duy có hệ thống.",
        "Before answering, understand the four competency groups the interviewer silently scores. Knowing this lets you steer the answer to maximise points instead of random enumeration. Most failed interviews are not due to missing knowledge, but to a presentation that fails to show systematic thinking.",
        "回答の前に、面接官が暗黙に採点する四つの能力群を理解しましょう。これを知ることで、無作為な列挙ではなく得点を最大化する方向へ回答を導けます。多くの不合格は知識不足ではなく、体系的思考を示せない説明に起因します。"),
      UL(
        ["Tư duy có hệ thống: có khung để không bỏ sót (chức năng, biên, âm tính, đồng thời, phi chức năng).",
         "Nhạy cảm rủi ro nghiệp vụ: nhận ra tiền cần nhất quán, chống trùng, tuân thủ hạn mức/AML.",
         "Đặt câu hỏi làm rõ: nêu giả định thay vì đoán mò.",
         "Ưu tiên hoá theo rủi ro: biết ca nào chạy trước khi thời gian hữu hạn."],
        ["Systematic thinking: a framework so nothing is missed (functional, boundary, negative, concurrency, non-functional).",
         "Business-risk sensitivity: seeing money needs consistency, dedupe, limits/AML compliance.",
         "Clarifying questions: stating assumptions instead of guessing.",
         "Risk-based prioritisation: knowing which cases run first under time limits."],
        ["体系的思考：漏れを防ぐフレーム（機能・境界・異常系・並行・非機能）。",
         "業務リスク感覚：金銭には整合性・重複防止・限度額/AML遵守が必要だと気づく。",
         "明確化の質問：当てずっぽうではなく前提を明示する。",
         "リスクベースの優先順位：時間制約下でどのケースを先に実行するか判断する。"]),
      TIP("Nói to khung tư duy ngay đầu: “Em chia theo 5 nhóm và đặc biệt nhấn 3 rủi ro tiền.” Câu này lập tức cho thấy bạn có phương pháp.",
        "Verbalise the framework up front: “I split into 5 groups and especially emphasise 3 money risks.” This instantly signals method.",
        "冒頭でフレームを言語化しましょう。「5つのグループに分け、特に3つの金銭リスクを重視します」。これで方法論が即座に伝わります。"),
      P("Một điều ít ứng viên để ý là người phỏng vấn cũng đánh giá thái độ trước sự mơ hồ. Khi không có tài liệu, phản ứng của bạn tiết lộ bạn sẽ làm việc thế nào trong dự án thật: người trưởng thành coi đó là cơ hội để đặt câu hỏi và chủ động đề xuất, trong khi người thiếu kinh nghiệm than phiền hoặc đứng im. Vì vậy, hãy giữ giọng bình tĩnh, tự tin, và biến sự thiếu thông tin thành một loạt giả định hợp lý mà bạn nêu rõ ràng.",
        "Something few candidates notice is that the interviewer also assesses your attitude toward ambiguity. With no spec, your reaction reveals how you'd work on a real project: a mature person treats it as a chance to ask questions and proactively propose, while an inexperienced one complains or freezes. So keep a calm, confident tone and turn the missing information into a set of reasonable assumptions you state clearly.",
        "候補者が見落としがちなのは、面接官が曖昧さへの態度も評価している点です。仕様が無いとき、あなたの反応は実プロジェクトでの働き方を露呈します。成熟した人は質問し能動的に提案する好機と捉え、経験の浅い人は不満を述べたり固まったりします。ですから、落ち着いた自信のある口調を保ち、不足情報を明確に述べる合理的な前提の集合へと変えましょう。"),
    ],
  },
  {
    heading: { vi: "3. Bước 1 — Làm rõ yêu cầu", en: "3. Step 1 — Clarify requirements", ja: "3. ステップ1 — 要件の明確化" },
    blocks: [
      P("Dành 60–90 giây hỏi làm rõ là điểm cộng lớn nhất mà ứng viên yếu thường bỏ qua. Mỗi giả định khác nhau sẽ sinh ra một bộ test khác nhau, nên việc đóng khung bài toán trước khi thiết kế cho thấy bạn làm việc như trong dự án thật, nơi requirement luôn thiếu và mơ hồ.",
        "Spending 60–90 seconds clarifying is the biggest plus that weak candidates skip. Each assumption produces a different test set, so framing the problem before designing shows you work like on a real project, where requirements are always incomplete and ambiguous.",
        "60〜90秒を明確化に使うことは、弱い候補者が省きがちな最大の加点要素です。前提ごとに異なるテストセットが生まれるため、設計前に課題を枠づけることは、要件が常に不完全で曖昧な実プロジェクトと同じ働き方を示します。"),
      UL(
        ["Chuyển nội bộ cùng ngân hàng hay liên ngân hàng? Cùng loại tiền hay có tỉ giá?",
         "Có hạn mức mỗi giao dịch / mỗi ngày? Có phí? Có OTP / xác thực 2 lớp?",
         "Xử lý đồng bộ hay có trạng thái ‘đang xử lý’? Có hoàn tiền khi thất bại?",
         "Ràng buộc tuân thủ: chống rửa tiền (AML), giới hạn quốc gia, ghi log kiểm toán?"],
        ["Internal same-bank or interbank? Same currency or FX involved?",
         "Per-transaction / daily limits? Fees? OTP / two-factor auth?",
         "Synchronous or a ‘pending’ state? Refund/rollback on failure?",
         "Compliance: AML, country restrictions, audit logging?"],
        ["同一銀行内か銀行間か？同一通貨か為替を伴うか？",
         "取引ごと／日次の限度額は？手数料は？OTP／二要素認証は？",
         "同期処理か『処理中』状態を持つか？失敗時に返金/ロールバックするか？",
         "コンプライアンス：AML、国別制限、監査ログは？"]),
      NOTE("Nếu người phỏng vấn nói “cứ giả định”, hãy chốt giả định rõ ràng rồi tiếp tục — điều đó vẫn cho thấy bạn ý thức được các biến số.",
        "If they say “just assume”, state clear assumptions and proceed — that still shows awareness of the variables.",
        "「仮定してよい」と言われたら、前提を明確に固定して進めます。それでも変数を意識していることを示せます。"),
    ],
  },
  {
    heading: { vi: "4. Bản đồ hệ thống & luồng nghiệp vụ", en: "4. System map & business flow", ja: "4. システム地図と業務フロー" },
    blocks: [
      P("Một câu trả lời senior luôn phác nhanh kiến trúc, vì test không chỉ ở giao diện. Lệnh chuyển đi từ App tới Payment API (nơi áp khoá idempotency), tới Core Ledger (ghi sổ kép), rồi được đối soát bất đồng bộ qua webhook. Mỗi mũi tên là một ranh giới có thể hỏng và cần test riêng.",
        "A senior answer quickly sketches the architecture, because testing is not only the UI. A transfer travels from the App to the Payment API (which applies the idempotency key), to the Core Ledger (double-entry booking), then is reconciled asynchronously via webhook. Each arrow is a boundary that can fail and needs its own tests.",
        "シニアの回答は必ずアーキテクチャを素早く描きます。テストはUIだけではないからです。送金はアプリから決済API（冪等キーを適用）、コア台帳（複式記帳）へ流れ、その後webhookで非同期に照合されます。各矢印は故障し得る境界であり、個別のテストが必要です。"),
      IMG(svgTransferFlow,
        "Luồng chuyển tiền và các bất biến cốt lõi cần dùng làm oracle.",
        "The money-transfer flow and the core invariants to use as oracles.",
        "送金フローと、オラクルとして用いる中核的な不変条件。"),
      P("Việc vẽ luồng giúp bạn phát hiện các điểm khó test: trạng thái ‘đang xử lý’ (bất đồng bộ), điểm gọi dịch vụ bên thứ ba (có thể timeout), và bước ghi sổ kép (phải nguyên tử). Chỉ ra được các điểm này là bằng chứng bạn hiểu hệ thống thật chứ không chỉ bề mặt.",
        "Sketching the flow helps you spot hard-to-test points: the ‘pending’ state (asynchronous), the third-party call (can time out), and the double-entry write (must be atomic). Naming these proves you understand the real system, not just the surface.",
        "フローを描くことで、テストしにくい点を発見できます。『処理中』状態（非同期）、第三者呼び出し（タイムアウトし得る）、複式記帳（原子的でなければならない）。これらを指摘できれば、表面ではなく実システムを理解している証拠になります。"),
    ],
  },
  {
    heading: { vi: "5. Ma trận thiết kế ca kiểm thử", en: "5. Test-case design matrix", ja: "5. テストケース設計マトリクス" },
    blocks: [
      P("Trình bày theo nhóm, mỗi nhóm vài ca tiêu biểu kèm bất biến kỳ vọng — chất lượng và độ phủ tư duy quan trọng hơn số lượng. Dưới đây là ma trận rút gọn mà bạn có thể vẽ ngay trên bảng để người phỏng vấn thấy cấu trúc.",
        "Present by group, each with representative cases and the expected invariant — quality and coverage of thinking matter more than volume. Below is a condensed matrix you can draw on the whiteboard so the interviewer sees the structure.",
        "グループごとに、代表的なケースと期待する不変条件を示します。量より思考の質と網羅性が重要です。以下は、面接官に構造が伝わるようホワイトボードに即描ける簡潔なマトリクスです。"),
      IMG(svgTransferMatrix,
        "Ma trận ca theo 5 nhóm, mỗi nhóm gắn với một bất biến làm tiêu chí đúng.",
        "The case matrix across 5 groups, each tied to an invariant as the correctness criterion.",
        "5つのグループに分けたケース表。各グループは正しさの基準となる不変条件に結び付きます。"),
      UL(
        ["Chức năng: chuyển hợp lệ, kiểm số dư nguồn giảm đúng và đích tăng đúng.",
         "Biên: đúng hạn mức, trên hạn mức 1 đơn vị, số 0, số âm, số dư vừa đủ.",
         "Âm tính: thiếu số dư, tài khoản đích khoá, sai/hết hạn OTP, mất mạng giữa chừng.",
         "Đồng thời: hai lệnh cùng lúc, bấm gửi hai lần, retry do mạng chập chờn.",
         "Phi chức năng: RBAC (không chuyển từ tài khoản người khác), hiệu năng giờ cao điểm, đối soát."],
        ["Functional: valid transfer, verify source decreases and destination increases correctly.",
         "Boundary: exactly at limit, one over, zero, negative, balance exactly enough.",
         "Negative: insufficient funds, frozen destination, wrong/expired OTP, mid-flow network drop.",
         "Concurrency: two simultaneous transfers, double tap, retry on a flaky network.",
         "Non-functional: RBAC (no transfer from another's account), peak-hour performance, reconciliation."],
        ["機能：正常送金、送金元残高の正しい減少と送金先の正しい増加を検証。",
         "境界：限度額ちょうど、1単位超過、ゼロ、負数、残高がちょうど足りる。",
         "異常系：残高不足、送金先凍結、OTP誤り/期限切れ、処理途中のネットワーク断。",
         "並行：二件同時送金、二度押し、不安定な回線での再試行。",
         "非機能：RBAC（他人の口座から送金しない）、ピーク時性能、照合。"]),
      P("Với nhóm biên, kỹ thuật phân tích giá trị biên (boundary value analysis) giúp bạn chọn đúng điểm dễ lỗi: ngay tại ngưỡng, dưới ngưỡng một đơn vị, và trên ngưỡng một đơn vị. Trình bày một ca biên bằng code API ngắn cho thấy bạn không chỉ nói lý thuyết mà biết hiện thực hoá. Điểm mấu chốt là assert đúng mã lỗi và số dư không đổi khi hệ thống từ chối, chứ không chỉ nhìn thông báo.",
        "For the boundary group, boundary value analysis helps you pick the failure-prone points: at the threshold, one unit below, and one unit above. Showing one boundary case as short API code proves you don't just speak theory but can implement it. The key is to assert the correct error code and an unchanged balance when the system rejects, not just read a message.",
        "境界グループでは、境界値分析により故障しやすい点—閾値ちょうど、1単位下、1単位上—を選べます。境界ケースを短いAPIコードで示すと、理論だけでなく実装できることを証明できます。要点は、システムが拒否した際に正しいエラーコードと残高不変をアサートすることであり、メッセージを見るだけではありません。"),
      CODE("typescript", `test('từ chối đúng khi vượt hạn mức ngày', async ({ request }) => {
  await seedDailyUsage(request, 'A', 9_000_000);          // đã dùng 9tr/ngày, hạn 10tr
  const before = await getBalance(request, 'A');

  const res = await request.post('/payments', {
    headers: { 'Idempotency-Key': crypto.randomUUID() },
    data: { from: 'A', to: 'B', amount: 1_500_000, currency: 'VND' }, // 9tr + 1.5tr > 10tr
  });

  expect(res.status()).toBe(422);                         // Unprocessable: vượt hạn mức
  expect((await res.json()).code).toBe('DAILY_LIMIT_EXCEEDED');
  expect(await getBalance(request, 'A')).toBe(before);    // ORACLE: KHÔNG trừ tiền khi từ chối
});`),
    ],
  },
  {
    heading: { vi: "6. Ba rủi ro tiền chuyên sâu", en: "6. Three deep money risks", ja: "6. 三つの高度な金銭リスク" },
    blocks: [
      P("Đây là phần phân biệt senior với junior. Ba loại lỗi dưới đây hiếm khi lộ trên giao diện nhưng là nơi mất tiền thật, và người phỏng vấn giỏi luôn muốn nghe bạn nhắc tới. Nêu được cả ba, kèm cách kiểm chứng, gần như chắc chắn ghi điểm mạnh.",
        "This separates senior from junior. The three defects below rarely surface on the UI yet are where real money is lost, and good interviewers always want to hear you mention them. Naming all three, with how to verify each, almost guarantees strong points.",
        "ここがシニアとジュニアを分けます。以下の三つの不具合はUIにほとんど現れませんが、実際に資金を失う箇所であり、優れた面接官は必ず言及を期待します。三つすべてを検証方法とともに挙げれば、ほぼ確実に高得点です。"),
      UL(
        ["Idempotency (chống trùng): người dùng bấm gửi hai lần hoặc app retry — hệ thống KHÔNG được trừ tiền hai lần.",
         "Atomicity (nguyên tử): nếu trừ nguồn xong nhưng cộng đích thất bại, phải rollback hoàn toàn.",
         "Race condition (đua): hai lệnh cùng lúc từ tài khoản chỉ đủ cho một — chỉ một được thành công."],
        ["Idempotency: the user double-taps or the app retries — the system must NOT debit twice.",
         "Atomicity: if the debit succeeds but the credit fails, it must fully roll back.",
         "Race condition: two concurrent transfers from an account funding only one — only one may succeed."],
        ["冪等性：二度押しやアプリの再試行が起きても、システムは二重に引き落としてはならない。",
         "原子性：引き落としが成功しても入金が失敗したら、完全にロールバックしなければならない。",
         "競合状態：一件分しか残高がない口座からの同時二件送金では、成功は一件のみ。"]),
      WARN("Nếu bạn chỉ nói về nút bấm và thông báo mà bỏ qua ba rủi ro này, người phỏng vấn sẽ xếp bạn vào nhóm ‘chỉ test UI’.",
        "If you only talk about buttons and toasts while skipping these three risks, the interviewer buckets you as ‘UI-only’.",
        "ボタンやトースト表示だけを語り、この三つのリスクを飛ばすと、面接官はあなたを『UIのみ』と分類します。"),
      P("Race condition là ca khó tái hiện nhất nhưng cũng gây hậu quả nặng nhất: chi âm số dư. Cách kiểm chứng là bắn nhiều lệnh chuyển song song từ một tài khoản chỉ đủ tiền cho một lệnh, rồi assert đúng một lệnh thành công và số dư cuối không âm. Nếu hệ thống dùng khoá lạc quan (optimistic locking) hoặc ràng buộc ở cơ sở dữ liệu, chỉ một giao dịch được ghi; các lệnh còn lại phải bị từ chối một cách sạch sẽ.",
        "A race condition is the hardest case to reproduce yet has the worst consequence: a negative balance. To verify, fire many parallel transfers from an account funding only one, then assert exactly one succeeds and the final balance is non-negative. If the system uses optimistic locking or a database constraint, only one transaction is written; the rest must be cleanly rejected.",
        "競合状態は最も再現しにくい一方、最悪の結果—残高のマイナス—を招きます。検証では、一件分しか残高がない口座から複数の送金を並行発射し、成功はちょうど一件で最終残高が非負であることをアサートします。楽観ロックやデータベース制約を用いていれば、書き込まれる取引は一件のみで、残りは綺麗に拒否されねばなりません。"),
      CODE("typescript", `test('race: 5 lệnh song song, chỉ 1 thành công', async ({ request }) => {
  await setBalance(request, 'A', 100_000);                 // chỉ đủ cho MỘT lệnh 100k
  const send = () => request.post('/payments', {
    headers: { 'Idempotency-Key': crypto.randomUUID() },   // key KHÁC nhau -> không phải idempotency
    data: { from: 'A', to: 'B', amount: 100_000, currency: 'VND' },
  });

  const results = await Promise.all([send(), send(), send(), send(), send()]);
  const ok = results.filter((r) => r.ok()).length;

  expect(ok).toBe(1);                                       // đúng MỘT lệnh thắng
  expect(await getBalance(request, 'A')).toBeGreaterThanOrEqual(0); // ORACLE: không chi âm
});`),
    ],
  },
  {
    heading: { vi: "7. Viết code kiểm chứng idempotency", en: "7. Coding an idempotency check", ja: "7. 冪等性を検証するコード" },
    blocks: [
      P("Người phỏng vấn thường hỏi tiếp: “Kiểm chứng idempotency tự động thế nào?” Ý tưởng là gửi cùng một request hai lần với cùng Idempotency-Key rồi assert chỉ một giao dịch được tạo và số dư chỉ đổi một lần. Đây là test tầng API, nhanh và ổn định hơn UI.",
        "Interviewers often follow up: “How do you test idempotency automatically?” The idea is to send the same request twice with the same Idempotency-Key, then assert only one transaction is created and the balance changes once. This is an API-layer test, faster and more stable than the UI.",
        "面接官はよくこう続けます。「冪等性をどう自動テストしますか？」考え方は、同一のIdempotency-Keyで同じリクエストを二度送り、取引が一件だけ作成され残高が一度だけ変化することをアサートすることです。これはAPI層のテストで、UIより高速かつ安定します。"),
      CODE("typescript", `import { test, expect } from '@playwright/test';

test('chuyển tiền là idempotent với cùng Idempotency-Key', async ({ request }) => {
  const key = crypto.randomUUID();
  const body = { orderId: 'OD-1001', from: 'A', to: 'B', amount: 250000, currency: 'VND' };
  const before = await getBalance(request, 'A');

  // Gửi hai lần cùng key (mô phỏng double-tap / retry)
  const r1 = await request.post('/payments', { headers: { 'Idempotency-Key': key }, data: body });
  const r2 = await request.post('/payments', { headers: { 'Idempotency-Key': key }, data: body });

  expect(r1.status()).toBe(201);
  expect(r2.status()).toBe(200);                    // trả lại kết quả cũ, KHÔNG tạo mới
  const t1 = await r1.json(), t2 = await r2.json();
  expect(t2.txnId).toBe(t1.txnId);                  // cùng một giao dịch

  const after = await getBalance(request, 'A');
  expect(before - after).toBe(250000);              // ORACLE: chỉ trừ MỘT lần
});`),
      TIP("Mô phỏng retry thật bằng cách ngắt kết nối sau khi server đã nhận request nhưng trước khi client nhận phản hồi — đây là kịch bản mạng chập chờn ngoài đời.",
        "Simulate a real retry by dropping the connection after the server received the request but before the client got the response — the real-world flaky-network scenario.",
        "サーバがリクエストを受信した後、クライアントが応答を受け取る前に接続を切断することで、実際の再試行を再現します。現実の不安定な回線のシナリオです。"),
    ],
  },
  {
    heading: { vi: "8. Oracle-first: bất biến làm tiêu chí đúng", en: "8. Oracle-first: invariants as correctness", ja: "8. オラクル優先：不変条件を正しさの基準に" },
    blocks: [
      P("Bài test chất lượng cao không assert “màn hình hiện Thành công”. Với chuyển tiền, oracle mạnh nhất là bất biến bảo toàn tiền: tổng số dư toàn hệ thống không đổi trước và sau giao dịch, và mỗi giao dịch tạo một cặp bút toán sổ kép khớp nhau. Đây là điều PHẢI luôn đúng dù luồng thành công hay thất bại.",
        "A high-quality test does not assert “the screen shows Success”. For transfers, the strongest oracle is the money-conservation invariant: total balances across the system are unchanged before and after, and each transfer creates a matching double-entry pair. This must always hold whether the flow succeeds or fails.",
        "質の高いテストは「画面に成功と表示される」をアサートしません。送金では、最も強力なオラクルは金額保存の不変条件です。取引前後でシステム全体の残高合計は不変であり、各送金は一致する複式記帳のペアを生成します。これはフローの成否に関わらず常に成り立たねばなりません。"),
      CODE("typescript", `// ORACLE dùng chung: kiểm bất biến sau MỌI ca (thành công hay thất bại)
async function assertMoneyConserved(db, systemTotalBefore: number) {
  const totalAfter = await db.sum('accounts', 'balance');
  expect(totalAfter).toBe(systemTotalBefore);           // bảo toàn tiền

  // Sổ kép: mỗi giao dịch có tổng ghi nợ = tổng ghi có
  const rows = await db.query('SELECT txn_id, SUM(debit)-SUM(credit) AS diff FROM ledger GROUP BY txn_id');
  for (const r of rows) expect(r.diff).toBe(0);          // double-entry cân bằng

  // Không có giao dịch ‘treo’: trạng thái cuối phải là succeeded | failed
  const stuck = await db.query("SELECT COUNT(*) c FROM txn WHERE status='pending' AND created_at < now()-interval '10 min'");
  expect(stuck[0].c).toBe(0);
}`),
      P("Khi trình bày, hãy nói rõ: “Mỗi ca test của em map tới ít nhất một bất biến.” Câu này cho thấy bạn hiểu triết lý oracle-first, thứ phân biệt người kiểm thử trưởng thành với người chỉ ‘bấm thử xem có chạy không’.",
        "When presenting, say explicitly: “Each of my tests maps to at least one invariant.” This shows you grasp the oracle-first philosophy that separates a mature tester from someone who just ‘clicks to see if it works’.",
        "説明の際は明言しましょう。「各テストは少なくとも一つの不変条件に対応します」。これは、単に『動くか試す』人と成熟したテスターを分ける、オラクル優先の哲学の理解を示します。"),
      P("Triết lý oracle-first còn giúp bạn test được cả những luồng mà giao diện không hiển thị gì rõ ràng. Ví dụ khi giao dịch ở trạng thái đang xử lý, UI có thể chỉ hiện một vòng quay, nhưng ở tầng dữ liệu bạn vẫn kiểm được rằng tiền chưa bị trừ, chưa có bút toán, và một webhook sẽ chốt trạng thái sau đó. Nhờ tựa vào bất biến thay vì hình ảnh trên màn hình, bộ test của bạn ổn định hơn nhiều khi giao diện thay đổi.",
        "The oracle-first philosophy also lets you test flows where the UI shows nothing definitive. For example, while a transaction is pending, the UI may only show a spinner, but at the data layer you can still verify the money isn't debited yet, no ledger entry exists, and a webhook will finalise the state later. By relying on invariants rather than on-screen visuals, your suite is far more stable when the UI changes.",
        "オラクル優先の哲学は、UIが明確に何も表示しないフローのテストも可能にします。例えば取引が処理中の間、UIはスピナーしか出さないかもしれませんが、データ層ではまだ引き落とされておらず、台帳記帳もなく、後でwebhookが状態を確定することを検証できます。画面表示ではなく不変条件に依拠することで、UI変更時にもスイートははるかに安定します。"),
    ],
  },
  {
    heading: { vi: "9. Câu hỏi theo cấp độ Junior / Mid / Senior", en: "9. Questions by level: Junior / Mid / Senior", ja: "9. レベル別の質問：ジュニア/ミドル/シニア" },
    blocks: [
      P("Cùng một tình huống, người phỏng vấn sẽ đào ở độ sâu khác nhau tuỳ cấp bậc bạn ứng tuyển. Chuẩn bị câu trả lời cho cả ba mức giúp bạn linh hoạt khi họ nâng dần độ khó.",
        "For the same scenario, interviewers probe at different depths depending on the level you apply for. Preparing answers for all three lets you adapt as they ramp up difficulty.",
        "同じ状況でも、応募レベルに応じて面接官は異なる深さで掘り下げます。三段階すべての回答を準備しておくと、難易度が上がっても柔軟に対応できます。"),
      QA("(Junior) Kể vài ca test cho chức năng chuyển tiền.", "(Junior) Name a few tests for the transfer feature.",
        "Chuyển thành công, số dư không đủ, số tiền âm/0, sai OTP, tài khoản đích không tồn tại. Quan trọng là nhóm chúng lại (chức năng/biên/âm tính) để thể hiện có cấu trúc.",
        "Successful transfer, insufficient funds, negative/zero amount, wrong OTP, missing destination. The key is to group them (functional/boundary/negative) to show structure.",
        "(ジュニア) 送金機能のテストをいくつか挙げてください。",
        "正常送金、残高不足、負数/ゼロ金額、OTP誤り、送金先不存在。重要なのは、構造を示すためにこれらを（機能/境界/異常系に）グループ化することです。"),
      QA("(Mid) Làm sao đảm bảo không trừ tiền hai lần?", "(Mid) How do you ensure money isn't debited twice?",
        "Kiểm idempotency ở tầng API: gửi trùng Idempotency-Key phải trả về cùng giao dịch và số dư chỉ đổi một lần. Bổ sung ca retry khi mạng chập chờn và ca hai request song song.",
        "Test idempotency at the API layer: a duplicate Idempotency-Key returns the same transaction and the balance changes once. Add retry-on-flaky-network and two-parallel-requests cases.",
        "(ミドル) 二重引き落としをどう防ぎますか？",
        "API層で冪等性を検証します。重複したIdempotency-Keyは同一取引を返し、残高は一度だけ変化します。回線不安定時の再試行や並行二重リクエストのケースも追加します。"),
      QA("(Senior) Thiết kế chiến lược test hồi quy cho toàn module thanh toán.", "(Senior) Design a regression strategy for the whole payments module.",
        "Kim tự tháp: nhiều unit cho quy tắc số dư/phí; nhiều API cho idempotency, hạn mức, mã lỗi; ít E2E cho vài luồng quan trọng. Dùng bất biến làm oracle, chạy song song trong CI, tách smoke/nightly, và theo dõi flaky-rate cùng độ phủ theo rủi ro.",
        "A pyramid: many unit tests for balance/fee rules; many API tests for idempotency, limits, error codes; few E2E for critical journeys. Use invariants as oracles, run in parallel in CI, split smoke/nightly, and track flaky-rate with risk-based coverage.",
        "(シニア) 決済モジュール全体の回帰テスト戦略を設計してください。",
        "ピラミッド構成：残高・手数料規則には多数のユニット、冪等性・限度額・エラーコードには多数のAPI、重要な導線には少数のE2E。不変条件をオラクルとし、CIで並行実行、スモーク/夜間実行を分離し、フレーク率とリスクベースの網羅性を追跡します。"),
    ],
  },
  {
    heading: { vi: "10. Follow-up hay bị hỏi & cách kiểm chứng", en: "10. Common follow-ups & how to verify", ja: "10. よくある深掘り質問と検証方法" },
    blocks: [
      P("Sau câu trả lời chính, người phỏng vấn thường đào sâu vào các luồng thất bại — nơi khó test nhất và lộ rõ kinh nghiệm thật. Chuẩn bị cách kiểm chứng rollback bằng cách chèn lỗi ở tầng phụ thuộc mà không cần sửa code sản phẩm.",
        "After the main answer, interviewers usually drill into failure flows — the hardest to test and the clearest signal of real experience. Prepare to verify rollback by injecting a failure at a dependency without changing product code.",
        "主要な回答の後、面接官は通常、異常系フローを掘り下げます。最もテストしにくく、実務経験が最も表れる箇所です。製品コードを変えずに依存先へ障害を注入してロールバックを検証する方法を準備しましょう。"),
      CODE("typescript", `test('rollback khi cộng tiền đích thất bại', async ({ request }) => {
  const before = await getBalance(request, 'A');
  // Fault injection: ép service cộng tiền đích trả lỗi (qua test hook / mock)
  await request.post('/test-hooks/fail-credit', { data: { account: 'B', mode: 'timeout' } });

  const res = await request.post('/payments', {
    headers: { 'Idempotency-Key': crypto.randomUUID() },
    data: { from: 'A', to: 'B', amount: 100000, currency: 'VND' },
  });

  expect([409, 422, 500]).toContain(res.status());   // báo lỗi rõ ràng, không 2xx
  const after = await getBalance(request, 'A');
  expect(after).toBe(before);                        // ORACLE: nguồn KHÔNG bị trừ
  await assertNoDanglingTxn(request, 'A', 'B');      // không có bút toán treo
});`),
      QA("Oracle của bạn là gì nếu không được xem sổ cái?", "What's your oracle if you can't read the ledger?",
        "Dựa vào số dư trước/sau qua API (nguồn = ban đầu − số tiền − phí; đích = ban đầu + số tiền), và đối chiếu báo cáo đối soát cuối ngày. Nếu cả hai không có, đề xuất bổ sung endpoint kiểm tra bất biến chỉ dùng cho test.",
        "Use before/after balances via API (source = initial − amount − fee; destination = initial + amount), and cross-check the end-of-day reconciliation report. If neither exists, propose a test-only invariant-check endpoint.",
        "台帳を読めない場合のオラクルは何ですか？",
        "API経由の前後残高（送金元＝初期−金額−手数料、送金先＝初期＋金額）を用い、日次照合レポートと突き合わせます。どちらも無ければ、テスト専用の不変条件チェック用エンドポイントの追加を提案します。"),
    ],
  },
  {
    heading: { vi: "11. Kịch bản mock 1-1 (diễn thử)", en: "11. A 1-1 mock script (walkthrough)", ja: "11. 1対1の模擬面接（実演）" },
    blocks: [
      SCEN("Mở đầu ghi điểm", "A point-scoring opener",
        "Ứng viên: “Trước khi thiết kế, em xin làm rõ vài điểm: chuyển nội bộ hay liên ngân hàng, có OTP và hạn mức không, xử lý đồng bộ hay có trạng thái đang xử lý. Giả sử nội bộ cùng tiền tệ, có OTP và hạn mức ngày. Em chia test thành 5 nhóm — chức năng, biên, âm tính, đồng thời, phi chức năng — và nhấn ba rủi ro tiền: idempotency, atomicity, race condition. Oracle chính của em là bảo toàn tiền và sổ kép cân bằng.”",
        "Candidate: “Before designing, let me clarify: internal or interbank, OTP and limits, synchronous or a pending state. Assuming internal, same currency, with OTP and a daily limit. I split tests into 5 groups — functional, boundary, negative, concurrency, non-functional — and emphasise three money risks: idempotency, atomicity, race conditions. My main oracle is money conservation and a balanced double-entry ledger.”",
        "面接官の設問への応答",
        "候補者：「設計の前に確認させてください。行内か銀行間か、OTPと限度額の有無、同期処理か処理中状態か。行内・同一通貨・OTPあり・日次限度額ありと仮定します。テストを5群（機能・境界・異常系・並行・非機能）に分け、三つの金銭リスク（冪等性・原子性・競合状態）を重視します。主なオラクルは金額保存と均衡した複式台帳です。」"),
      P("Cách trình bày này thắng vì nó đi từ làm rõ, tới khung, tới rủi ro, tới oracle — đúng trình tự tư duy của một QA trưởng thành. Kết thúc bằng ưu tiên: “Nếu chỉ có hai giờ, em chạy happy path, số dư không đủ, idempotency và rollback trước, vì đó là các ca mất tiền thật.”",
        "This delivery wins because it moves from clarification to framework to risks to oracle — exactly the thought order of a mature QA. Close with prioritisation: “With only two hours, I'd run happy path, insufficient funds, idempotency and rollback first, because those are the real money-loss cases.”",
        "この説明が強いのは、明確化→フレーム→リスク→オラクルへと、成熟したQAの思考順序どおりに進むからです。最後に優先順位で締めます。「二時間しかなければ、正常系・残高不足・冪等性・ロールバックを先に実行します。実際に資金を失うケースだからです。」"),
      TIP("Luôn kết bằng ưu tiên theo rủi ro. Người phỏng vấn nhớ ứng viên biết điều gì quan trọng nhất khi thời gian hữu hạn.",
        "Always close with risk-based prioritisation. Interviewers remember candidates who know what matters most under time limits.",
        "必ずリスクベースの優先順位で締めましょう。面接官は、時間制約下で最重要事項を把握している候補者を記憶します。"),
    ],
  },
  {
    heading: { vi: "12. Sai lầm khiến trượt", en: "12. Failure pitfalls", ja: "12. 不合格になる落とし穴" },
    blocks: [
      P("Ngay cả ứng viên có kiến thức vẫn trượt vì cách trình bày. Dưới đây là những lỗi lặp đi lặp lại mà người phỏng vấn ghi nhận tiêu cực, đối chiếu để tự tránh.",
        "Even knowledgeable candidates fail because of delivery. Below are recurring mistakes interviewers note negatively; check yourself against them.",
        "知識のある候補者でも、説明の仕方で不合格になります。以下は面接官が否定的に記録する繰り返しの誤りです。自己点検に用いてください。"),
      UL(
        ["Nhảy vào liệt kê ca mà không làm rõ hay nêu giả định.",
         "Chỉ nghĩ tới UI, bỏ qua nhất quán dữ liệu, đồng thời và tuân thủ.",
         "Không có oracle rõ ràng — nói ‘kiểm tra nó chạy đúng’ mà không định nghĩa ‘đúng’.",
         "Liệt kê tràn lan không ưu tiên; không biết ca nào quan trọng nhất."],
        ["Jumping into listing cases without clarifying or stating assumptions.",
         "Thinking only UI, ignoring data consistency, concurrency and compliance.",
         "No clear oracle — saying ‘check it works’ without defining ‘works’.",
         "Dumping cases with no prioritisation; unaware which matter most."],
        ["明確化も前提提示もせずケース列挙に飛びつく。",
         "UIだけを考え、データ整合性・並行・コンプライアンスを無視する。",
         "明確なオラクルがない—『正しく動くか確認』と言い『正しい』を定義しない。",
         "優先順位なしにケースを羅列し、最重要が分からない。"]),
      WARN("Đổ lỗi hệ thống hoặc than ‘thiếu tài liệu nên không test được’ là điểm trừ nặng. Người phỏng vấn muốn thấy bạn xử lý được sự mơ hồ, vì dự án thật luôn mơ hồ.",
        "Blaming the system or complaining ‘no spec so I can't test’ is a heavy minus. Interviewers want to see you handle ambiguity, because real projects are always ambiguous.",
        "システムのせいにしたり『仕様が無いのでテストできない』と嘆くのは大きな減点です。実プロジェクトは常に曖昧であり、面接官は曖昧さに対処できることを見たいのです。"),
      P("Một sai lầm tinh vi hơn là trình bày lộn xộn: nhảy từ ca này sang ca khác không theo nhóm, khiến người nghe không thấy được độ phủ. Ngay cả khi bạn biết nhiều, việc thiếu cấu trúc làm giảm ấn tượng về năng lực. Hãy luôn tuyên bố nhóm trước khi liệt kê, đánh số, và tóm tắt lại ở cuối; kỹ năng tổ chức thông tin này cũng chính là kỹ năng bạn cần khi viết test plan và báo cáo trong công việc thật.",
        "A subtler mistake is disorganised delivery: hopping between cases with no grouping, so the listener can't see coverage. Even if you know a lot, the lack of structure lowers the impression of competence. Always announce the group before listing, number your items, and summarise at the end; this information-organising skill is exactly what you need when writing test plans and reports on the job.",
        "より巧妙な誤りは、まとまりのない説明です。グループ分けせずケース間を飛び回ると、聞き手は網羅性を把握できません。多くを知っていても、構造の欠如は能力の印象を下げます。列挙の前に必ずグループを宣言し、番号を振り、最後に要約しましょう。この情報整理力こそ、実務でテスト計画や報告書を書く際に必要な力です。"),
    ],
  },
  {
    heading: { vi: "13. Góc AI Agent trong chuẩn bị & thực thi", en: "13. AI Agent angle in prep & execution", ja: "13. 準備と実行におけるAIエージェントの観点" },
    blocks: [
      P("Bạn có thể dùng AI (như Claude) để tăng tốc: sinh nhanh bộ ca test từ mô tả, gợi ý ca biên dễ quên, và nháp code khung test. Nhưng ranh giới trách nhiệm phải rõ: AI sinh nháp, con người review đối chiếu requirement, bổ sung bất biến nghiệp vụ và ca rủi ro domain mà AI không biết.",
        "You can use AI (like Claude) to accelerate: quickly generate a case set from a description, suggest easily-missed edge cases, and draft test skeletons. But the responsibility boundary must be clear: AI drafts, a human reviews against requirements, adding business invariants and domain risk cases the AI cannot know.",
        "AI（Claudeなど）で加速できます。説明からケースセットを素早く生成し、見落としがちな境界を提案し、テストの雛形を下書きします。ただし責任の境界は明確に。AIは下書きし、人間が要件と照合してレビューし、AIが知り得ない業務不変条件やドメイン固有のリスクケースを補います。"),
      CODE("text", `Prompt gợi ý (đối chiếu, không tin tuyệt đối):
"Cho chức năng chuyển tiền nội bộ có OTP và hạn mức ngày, liệt kê ca test
theo bảng: nhóm | mô tả | dữ liệu | bất biến kỳ vọng. Nhấn idempotency,
atomicity, race condition. Đánh dấu ca nào thuộc API, ca nào E2E."`),
      QA("Phỏng vấn: bạn tin tưởng test do AI sinh tới đâu?", "Interview: how far do you trust AI-generated tests?",
        "Coi là bản nháp cần review. AI giỏi liệt kê ca âm tính hay quên, nhưng dễ bỏ bất biến nghiệp vụ và có thể ‘bịa’ API. Em luôn đối chiếu với requirement thật, chạy thử, và bổ sung oracle trước khi đưa vào bộ hồi quy.",
        "Treat it as a draft to review. AI is great at listing forgotten negative cases but tends to miss business invariants and may hallucinate APIs. I always cross-check against real requirements, run them, and add oracles before adding to the regression suite.",
        "面接：AI生成のテストをどこまで信頼しますか？",
        "レビュー前提の下書きとして扱います。AIは忘れがちな異常系の列挙は得意ですが、業務不変条件を見落としがちで、APIを幻覚することもあります。常に実要件と照合し、実行し、オラクルを補ってから回帰スイートに加えます。"),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P("Tình huống chuyển tiền là bài kiểm tra tư duy hệ thống chứ không phải trí nhớ. Nếu bạn đi đúng trình tự — làm rõ, vẽ luồng, dựng ma trận, nhấn ba rủi ro tiền, định nghĩa oracle bằng bất biến, và kết bằng ưu tiên — bạn sẽ nổi bật dù cho vị trí junior hay senior.",
        "The transfer scenario tests systems thinking, not memory. If you follow the right order — clarify, sketch the flow, build the matrix, emphasise three money risks, define the oracle via invariants, and close with prioritisation — you stand out whether the role is junior or senior.",
        "送金シナリオは記憶ではなく体系的思考を試します。正しい順序—明確化、フロー描画、マトリクス構築、三つの金銭リスクの強調、不変条件によるオラクル定義、優先順位での締め—に従えば、ジュニアでもシニアでも際立ちます。"),
      UL(
        ["Làm rõ yêu cầu / nêu giả định trước khi thiết kế.",
         "Khung 5 nhóm ca; nhấn idempotency, atomicity, race condition.",
         "Oracle = bảo toàn tiền + sổ kép cân bằng + trạng thái cuối duy nhất.",
         "Kiểm chứng bằng test API (nhanh, ổn định) + fault injection cho rollback.",
         "Kết bằng ưu tiên theo rủi ro; xử lý được sự mơ hồ, không đổ lỗi."],
        ["Clarify / state assumptions before designing.",
         "5-group case framework; emphasise idempotency, atomicity, race conditions.",
         "Oracle = money conservation + balanced double-entry + single final state.",
         "Verify with API tests (fast, stable) + fault injection for rollback.",
         "Close with risk-based prioritisation; handle ambiguity, don't blame."],
        ["設計前に明確化し前提を述べる。",
         "5群のケースフレーム、冪等性・原子性・競合状態を強調。",
         "オラクル＝金額保存＋均衡した複式記帳＋唯一の最終状態。",
         "APIテスト（高速・安定）＋ロールバック用の障害注入で検証。",
         "リスクベースの優先順位で締め、曖昧さに対処し責任転嫁しない。"]),
      NOTE("Một tình huống chỉ thực sự ‘đóng’ khi bạn biến nó thành một bộ test có oracle rõ ràng, chạy được trong CI và ngăn lỗi tái diễn.",
        "A scenario is only truly ‘closed’ when you turn it into a test set with clear oracles, runnable in CI and preventing recurrence.",
        "シナリオが真に『完了』するのは、明確なオラクルを持ちCIで実行でき、再発を防ぐテストセットに変えたときだけです。"),
    ],
  },
];

const A1 = {
  slug: "iv-scenario-money-transfer",
  cover: makeThumb({ id: "ivmt", domain: "banking", kind: "phongvan", label: "面接 · 送金テスト設計" }),
  tags: tags("phongvan", "banking", "api", "interview"),
  title: {
    vi: "Tình huống phỏng vấn: Thiết kế test cho tính năng chuyển tiền",
    en: "Interview scenario: Test design for a money-transfer feature",
    ja: "面接シナリオ：送金機能のテスト設計",
  },
  summary: {
    vi: "Đề kinh điển của phỏng vấn QA fintech. Bóc tách từ làm rõ yêu cầu, ma trận ca, ba rủi ro tiền (idempotency/atomicity/race), oracle bất biến, code kiểm chứng, câu hỏi theo cấp độ và kịch bản mock 1-1.",
    en: "A classic fintech QA prompt. From clarifying requirements, case matrix, three money risks (idempotency/atomicity/race), invariant oracles, verification code, level-based questions to a 1-1 mock script.",
    ja: "フィンテックQA面接の定番設問。要件明確化・ケース表・三つの金銭リスク（冪等性/原子性/競合）・不変条件オラクル・検証コード・レベル別質問・1対1模擬面接まで分解します。",
  },
  pages: buildDoc(A1_pages),
};

export const INTERVIEW_SCENARIO_DOCS = [A1];
