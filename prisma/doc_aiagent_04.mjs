// ============================================================================
// AIAGENT_04 — 2 bài "AI Agent cho kiểm thử" (kind=nangcao).
// A: Kiến trúc AI test agent — planner/executor/critic loop, ReAct, memory,
//    bounded action space, termination, cost/time budget, deterministic replay.
// B: Eval harness & guardrails cho AI test agent — metrics, golden dataset,
//    regression gate cho chính agent, guardrails, chống non-determinism.
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia04a", domain: "saas", kind: "nangcao", label: "AGENT ARCH" });
const coverB = makeThumb({ id: "aia04b", domain: "saas", kind: "nangcao", label: "EVAL HARNESS" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn)
// ---------------------------------------------------------------------------
const SVG_PEC_LOOP = `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="340" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Vòng lặp Planner · Executor · Critic (reflection)</text>
<rect x="40" y="70" width="150" height="80" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="115" y="105" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">PLANNER</text>
<text x="115" y="127" text-anchor="middle" font-size="10.5" fill="#7dd3fc">goal → kế hoạch bước</text>
<rect x="245" y="70" width="150" height="80" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="320" y="105" text-anchor="middle" font-size="15" font-weight="800" fill="#ccfbf1">EXECUTOR</text>
<text x="320" y="127" text-anchor="middle" font-size="10.5" fill="#5eead4">gọi tool (ReAct)</text>
<rect x="450" y="70" width="150" height="80" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="525" y="105" text-anchor="middle" font-size="15" font-weight="800" fill="#e0e7ff">CRITIC</text>
<text x="525" y="127" text-anchor="middle" font-size="10.5" fill="#a5b4fc">phản tư · chấm điểm</text>
<defs><marker id="arA" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arA)"><path d="M190 110 h50"/><path d="M395 110 h50"/></g>
<path d="M525 155 v45 h-410 v-45" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#arA)"/>
<text x="320" y="220" text-anchor="middle" font-size="12" font-weight="700" fill="#fbbf24">reflection: chưa đạt oracle → lập kế hoạch lại (bounded)</text>
<rect x="40" y="245" width="270" height="70" rx="8" fill="#111827" stroke="#334155"/>
<text x="175" y="268" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Termination</text>
<text x="175" y="288" text-anchor="middle" font-size="10" fill="#94a3b8">đạt oracle · hết budget · max step</text>
<text x="175" y="304" text-anchor="middle" font-size="10" fill="#94a3b8">· forbidden action → dừng an toàn</text>
<rect x="330" y="245" width="270" height="70" rx="8" fill="#111827" stroke="#334155"/>
<text x="465" y="268" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Memory / State</text>
<text x="465" y="288" text-anchor="middle" font-size="10" fill="#94a3b8">scratchpad · trace · seed cố định</text>
<text x="465" y="304" text-anchor="middle" font-size="10" fill="#94a3b8">→ deterministic replay</text>
</svg>`;

const SVG_ACTION_SPACE = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="32" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bounded action space + observability quyết định</text>
<rect x="30" y="60" width="180" height="180" rx="10" fill="#111827" stroke="#334155"/>
<text x="120" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="#e2e8f0">Tool cho phép</text>
<g font-size="10.5" fill="#86efac"><text x="48" y="110">✓ navigate(url)</text><text x="48" y="132">✓ click(role,name)</text><text x="48" y="154">✓ fill(field,val)</text><text x="48" y="176">✓ readState()</text><text x="48" y="198">✓ assert(invariant)</text></g>
<rect x="230" y="60" width="180" height="180" rx="10" fill="#111827" stroke="#7f1d1d"/>
<text x="320" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="#fecaca">Bị cấm</text>
<g font-size="10.5" fill="#fca5a5"><text x="248" y="110">✗ exec shell</text><text x="248" y="132">✗ POST /pay live</text><text x="248" y="154">✗ DROP TABLE</text><text x="248" y="176">✗ email khách</text><text x="248" y="198">✗ vượt scope tenant</text></g>
<rect x="430" y="60" width="180" height="180" rx="10" fill="#0c4a6e" stroke="#38bdf8"/>
<text x="520" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="#e0f2fe">Trace/step</text>
<g font-size="10" fill="#7dd3fc"><text x="446" y="110">thought → action</text><text x="446" y="130">→ observation</text><text x="446" y="150">→ score</text><text x="446" y="176">mỗi bước log:</text><text x="446" y="196">cost · latency · tool</text></g>
<text x="320" y="272" text-anchor="middle" font-size="11" fill="#94a3b8">Mọi hành động ngoài whitelist → chặn ở lớp guardrail trước khi chạm hệ thống thật</text>
</svg>`;

const SVG_EVAL_FUNNEL = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="320" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Eval harness: golden dataset → metrics → regression gate</text>
<rect x="40" y="60" width="170" height="200" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="125" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">Golden dataset</text>
<g font-size="10" fill="#5eead4"><text x="56" y="112">task + oracle kỳ vọng</text><text x="56" y="134">seed dữ liệu cố định</text><text x="56" y="156">bug đã biết (labelled)</text><text x="56" y="178">edge: timeout/refund</text><text x="56" y="200">phiên bản hoá (v1..vN)</text></g>
<rect x="250" y="60" width="170" height="200" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="335" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Metrics</text>
<g font-size="10" fill="#7dd3fc"><text x="266" y="112">task success rate</text><text x="266" y="134">precision / recall bug</text><text x="266" y="156">false-positive rate</text><text x="266" y="178">cost / run · latency</text><text x="266" y="200">flakiness (n lần chạy)</text></g>
<rect x="460" y="60" width="150" height="200" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="535" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">Gate</text>
<g font-size="10" fill="#a5b4fc"><text x="476" y="112">so baseline</text><text x="476" y="134">Δrecall ≥ 0</text><text x="476" y="156">FP ≤ ngưỡng</text><text x="476" y="178">cost ≤ budget</text><text x="476" y="200">fail → chặn merge</text></g>
<defs><marker id="arE" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arE)"><path d="M210 160 h40"/><path d="M420 160 h40"/></g>
<rect x="40" y="278" width="570" height="30" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="325" y="298" text-anchor="middle" font-size="11" font-weight="700" fill="#6ee7b7">Chạy k lần/seed cố định → dùng trung vị, chống non-determinism che giấu hồi quy</text>
</svg>`;

const SVG_GUARDRAIL = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Guardrails: các lớp chặn trước khi chạm hệ thống thật</text>
<rect x="60" y="60" width="520" height="46" rx="8" fill="#111827" stroke="#38bdf8"/>
<text x="320" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#e0f2fe">1. Scope cap — chỉ tenant test, chỉ môi trường staging</text>
<text x="320" y="98" text-anchor="middle" font-size="10" fill="#7dd3fc">chặn cross-tenant · chặn prod</text>
<rect x="60" y="116" width="520" height="46" rx="8" fill="#111827" stroke="#fbbf24"/>
<text x="320" y="136" text-anchor="middle" font-size="12" font-weight="700" fill="#fde68a">2. Forbidden actions — allowlist tool, chặn shell/DDL/gửi tiền thật</text>
<text x="320" y="154" text-anchor="middle" font-size="10" fill="#fcd34d">mọi action ngoài danh sách → từ chối + log</text>
<rect x="60" y="172" width="520" height="46" rx="8" fill="#111827" stroke="#f87171"/>
<text x="320" y="192" text-anchor="middle" font-size="12" font-weight="700" fill="#fecaca">3. Approval gate — hành động rủi ro cao cần người duyệt</text>
<text x="320" y="210" text-anchor="middle" font-size="10" fill="#fca5a5">xoá dữ liệu · gọi API bên thứ ba · vượt budget</text>
<rect x="60" y="228" width="520" height="46" rx="8" fill="#052e16" stroke="#34d399"/>
<text x="320" y="248" text-anchor="middle" font-size="12" font-weight="700" fill="#6ee7b7">4. Budget/kill-switch — hết cost/time → dừng, báo cáo, không âm thầm bỏ qua</text>
<text x="320" y="266" text-anchor="middle" font-size="10" fill="#86efac">fail-closed: nghi ngờ thì DỪNG, không phải tiếp tục</text>
</svg>`;

const pagesA = [];
const pagesB = [];

pagesA.push({
  heading: {
    vi: "1. AI test agent là gì và khi nào nên dùng",
    en: "1. What an AI test agent is and when to use one",
    ja: "1. AIテストエージェントとは何か、いつ使うべきか",
  },
  blocks: [
    P(
      "Một AI test agent là chương trình dùng mô hình ngôn ngữ lớn để tự lập kế hoạch, gọi công cụ và tự đánh giá nhằm hoàn thành một mục tiêu kiểm thử. Khác với script tuyến tính, agent quyết định bước tiếp theo dựa trên quan sát vừa thu được. Nó phù hợp khi việc kiểm thử cần khám phá: dò luồng chưa có kịch bản, sinh test case mới, hoặc điều tra một bug mơ hồ. Nó KHÔNG thay thế test hồi quy đã ổn định, vì test cố định luôn nhanh hơn và rẻ hơn agent.",
      "An AI test agent is a program that uses a large language model to plan, call tools and evaluate itself in order to complete a testing goal. Unlike a linear script, the agent decides its next step based on what it just observed. It fits work that needs exploration: probing flows with no script, generating new test cases, or investigating a vague bug. It does NOT replace stable regression tests, because fixed tests are always faster and cheaper than an agent.",
      "AIテストエージェントとは、テスト目標を達成するために大規模言語モデルを使って計画し、ツールを呼び出し、自己評価するプログラムです。直線的なスクリプトと異なり、エージェントは直前の観察結果に基づいて次の一手を決めます。台本のないフローの探索、新しいテストケースの生成、曖昧なバグの調査など、探索が必要な作業に適しています。固定テストの方が常に高速で安価なため、安定した回帰テストを置き換えるものでは決してありません。",
    ),
    P(
      "Điểm mấu chốt của bài này là oracle-first: trước khi cho agent chạy, phải định nghĩa rõ tiêu chí đúng-sai (bất biến nghiệp vụ, decision table, trạng thái kỳ vọng). Nếu không có oracle, agent chỉ 'thấy giao diện chạy được' và dễ báo cáo thành công giả. Oracle là thứ neo agent về sự thật; nó cũng là điều kiện dừng và là thước đo cho eval sau này. Cả kiến trúc dưới đây đều xoay quanh việc kiểm chứng oracle chứ không phải hoàn thành thao tác.",
      "The core idea of this article is oracle-first: before running the agent you must define crisp pass/fail criteria (business invariants, decision tables, expected state). Without an oracle the agent merely 'sees the UI work' and easily reports false success. The oracle anchors the agent to truth; it is also the termination condition and the yardstick for later evaluation. The whole architecture below revolves around verifying the oracle, not around completing clicks.",
      "本記事の核心はオラクル優先です。エージェントを走らせる前に、明確な合否基準(ビジネス不変条件、デシジョンテーブル、期待される状態)を定義しなければなりません。オラクルがなければ、エージェントは単に「UIが動いた」と見なし、容易に偽の成功を報告します。オラクルはエージェントを真実に結びつけ、終了条件であり、後の評価の物差しでもあります。以下のアーキテクチャ全体は、操作の完了ではなくオラクルの検証を中心に回ります。",
    ),
    UL(
      ["Dùng agent: khám phá luồng mới, sinh nháp test, điều tra flaky.", "Không dùng agent: smoke test, hồi quy đã ổn định, kiểm tra nhanh CI.", "Luôn có người chốt oracle nghiệp vụ và duyệt output."],
      ["Use an agent: explore new flows, draft tests, investigate flaky failures.", "Do not use an agent: smoke tests, stable regression, fast CI checks.", "A human always sets the business oracle and reviews the output."],
      ["エージェントを使う場面: 新フローの探索、テスト草案の作成、フレーキーの調査。", "エージェントを使わない場面: スモークテスト、安定した回帰、高速なCIチェック。", "人が常にビジネスオラクルを定め、出力をレビューします。"],
    ),
    NOTE(
      "Quy tắc vàng: agent để KHÁM PHÁ và SINH, còn test cố định để BẢO VỆ. Đừng đặt agent vào đường CI chặn merge nếu chưa có eval harness (bài B).",
      "Golden rule: agents are for DISCOVERY and GENERATION, fixed tests are for PROTECTION. Do not put an agent on the merge-blocking CI path until you have an eval harness (article B).",
      "黄金律: エージェントは発見と生成のため、固定テストは保護のためのものです。評価ハーネス(記事B)が整うまで、マージをブロックするCI経路にエージェントを置いてはいけません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Vòng lặp Planner – Executor – Critic",
    en: "2. The Planner – Executor – Critic loop",
    ja: "2. プランナー・実行・批評ループ",
  },
  blocks: [
    P(
      "Kiến trúc phổ biến nhất chia agent thành ba vai. Planner nhận mục tiêu và bối cảnh, sinh ra một kế hoạch các bước. Executor thực thi từng bước bằng cách gọi công cụ (điều hướng, click, đọc trạng thái, gọi API). Critic quan sát kết quả, đối chiếu với oracle và quyết định: đã đạt, cần thử lại, hay cần lập kế hoạch mới. Ba vai này lặp cho đến khi thoả điều kiện dừng. Tách vai giúp mỗi phần có prompt và ràng buộc riêng, dễ kiểm thử và dễ thay thế.",
      "The most common architecture splits the agent into three roles. The planner takes the goal and context and produces a plan of steps. The executor runs each step by calling tools (navigate, click, read state, call an API). The critic observes the result, compares it against the oracle and decides: done, retry, or replan. These three roles loop until a termination condition is met. Separating roles gives each part its own prompt and constraints, making it easier to test and swap out.",
      "最も一般的なアーキテクチャは、エージェントを三つの役割に分けます。プランナーは目標と文脈を受け取り、ステップの計画を作ります。実行役は各ステップをツール呼び出し(ナビゲート、クリック、状態読取、API呼出)で実行します。批評役は結果を観察し、オラクルと照合して、完了・再試行・再計画のいずれかを決めます。これら三役は終了条件を満たすまでループします。役割を分けると各部に独自のプロンプトと制約を与えられ、テストや差し替えが容易になります。",
    ),
    P(
      "Critic là mảnh dễ bị bỏ quên nhưng quan trọng nhất về chất lượng. Nếu critic chỉ hỏi 'trang có hiển thị không', agent sẽ trôi theo hallucination. Critic tốt phải kiểm chứng bất biến cụ thể: số dư sau chuyển tiền, tồn kho không âm, idempotency khi retry. Critic cũng phát hiện khi agent đi lạc (lặp vô ích, rời scope) để kích hoạt replan hoặc dừng. Hãy coi critic như một reviewer nghiêm khắc, không phải một cheerleader.",
      "The critic is the piece most often neglected yet the most important for quality. If the critic only asks 'is the page visible', the agent drifts into hallucination. A good critic verifies concrete invariants: the balance after a transfer, non-negative inventory, idempotency on retry. The critic also detects when the agent goes astray (useless loops, leaving scope) to trigger a replan or a stop. Treat the critic as a strict reviewer, not a cheerleader.",
      "批評役は最も見落とされがちですが、品質にとって最も重要な部分です。批評役が「ページが表示されているか」しか問わなければ、エージェントはハルシネーションに流されます。優れた批評役は具体的な不変条件、すなわち送金後の残高、在庫が負にならないこと、再試行時の冪等性を検証します。批評役はまた、エージェントが逸脱(無益なループ、スコープ逸脱)した時を検知し、再計画や停止を起動します。批評役を応援団ではなく厳格なレビュアーと捉えてください。",
    ),
    IMG(
      SVG_PEC_LOOP,
      "Vòng lặp Planner→Executor→Critic; critic phản tư đối chiếu oracle rồi replan trong giới hạn.",
      "The planner→executor→critic loop; the critic reflects against the oracle then replans within bounds.",
      "プランナー→実行→批評のループ。批評役はオラクルと照合して反省し、制限内で再計画します。",
    ),
    TIP(
      "Cho critic một schema chấm điểm cứng (JSON: {oracle_met:bool, evidence, next:'stop|retry|replan'}) thay vì văn tự do — dễ log, dễ eval, khó hallucination.",
      "Give the critic a hard scoring schema (JSON: {oracle_met:bool, evidence, next:'stop|retry|replan'}) instead of free text — easier to log, easier to evaluate, harder to hallucinate.",
      "批評役には自由記述ではなく厳格な採点スキーマ(JSON: {oracle_met:bool, evidence, next:'stop|retry|replan'})を与えましょう。ログ化・評価が容易で、ハルシネーションしにくくなります。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Mẫu ReAct: suy nghĩ – hành động – quan sát",
    en: "3. The ReAct pattern: thought – action – observation",
    ja: "3. ReActパターン: 思考・行動・観察",
  },
  blocks: [
    P(
      "ReAct (Reasoning + Acting) là cách executor xen kẽ suy luận và hành động. Mỗi vòng gồm ba phần: thought (agent nói lý do), action (một lời gọi tool có cấu trúc), observation (kết quả trả về từ tool). Việc buộc agent viết thought trước khi hành động giúp quyết định minh bạch và dễ debug. Quan trọng hơn, action phải là dữ liệu có cấu trúc (tên tool + tham số) chứ không phải văn xuôi, để lớp guardrail có thể kiểm tra và chặn trước khi thực thi.",
      "ReAct (Reasoning + Acting) is how the executor interleaves reasoning and action. Each turn has three parts: a thought (the agent states its reasoning), an action (a structured tool call), and an observation (the tool's returned result). Forcing the agent to write a thought before acting makes decisions transparent and easy to debug. More importantly, the action must be structured data (tool name + parameters), not prose, so the guardrail layer can validate and block it before execution.",
      "ReAct(推論+行動)は、実行役が推論と行動を交互に行う方法です。各ターンは三部分から成ります。思考(エージェントが理由を述べる)、行動(構造化されたツール呼び出し)、観察(ツールが返す結果)です。行動の前に思考を書かせることで、意思決定が透明になりデバッグが容易になります。さらに重要なのは、行動が文章ではなく構造化データ(ツール名+パラメータ)でなければならない点で、これによりガードレール層が実行前に検証・遮断できます。",
    ),
    P(
      "Mỗi observation nên được tóm gọn và chuẩn hoá trước khi đưa lại vào ngữ cảnh, tránh nhồi cả trang HTML làm phình token và gây nhiễu. Với kiểm thử web, observation lý tưởng là cây accessibility (role/name) chứ không phải pixel, vì nó ổn định và ít nhiễu. Chuỗi thought-action-observation này chính là trace — nguồn dữ liệu để replay xác định và để quan sát quyết định ở các chương sau.",
      "Each observation should be summarised and normalised before feeding it back into context, avoiding dumping a whole HTML page that bloats tokens and adds noise. For web testing the ideal observation is the accessibility tree (role/name), not pixels, because it is stable and low-noise. This thought-action-observation chain is the trace — the data source for deterministic replay and for decision observability in later chapters.",
      "各観察は文脈に戻す前に要約・正規化すべきで、HTMLページ全体を投入してトークンを膨張させノイズを増やすのを避けます。ウェブテストでは、理想的な観察はピクセルではなくアクセシビリティツリー(role/name)です。安定していてノイズが少ないためです。この思考・行動・観察の連鎖こそがトレースであり、決定論的リプレイと後の章での意思決定の可観測性のためのデータ源です。",
    ),
    CODE(
      "typescript",
      `// ReAct step: agent luôn trả action CÓ CẤU TRÚC, không phải văn xuôi.
type Action =
  | { tool: "navigate"; url: string }
  | { tool: "click"; role: string; name: string }
  | { tool: "fill"; field: string; value: string }
  | { tool: "readState"; key: string }
  | { tool: "assert"; invariant: string; expected: unknown }
  | { tool: "finish"; verdict: "pass" | "fail"; evidence: string };

interface ReActStep {
  thought: string;      // vì sao chọn action này (bắt buộc)
  action: Action;       // guardrail sẽ validate trước khi chạy
}

// Vòng lặp executor
async function runStep(ctx: Ctx): Promise<Observation> {
  const step = await model.next<ReActStep>(ctx.history, ctx.tools);
  ctx.log({ type: "thought", text: step.thought });
  guardrail.assertAllowed(step.action);          // chặn action cấm/ngoài scope
  const obs = await tools.invoke(step.action);   // thực thi tool
  return normalizeObservation(obs);              // tóm gọn trước khi đưa lại ctx
}`,
    ),
    WARN(
      "Không bao giờ để model tự sinh URL/SQL/shell rồi chạy trực tiếp. Action phải khớp một union type cố định; mọi thứ ngoài đó bị từ chối tại guardrail.",
      "Never let the model emit a raw URL/SQL/shell and run it directly. Actions must match a fixed union type; anything outside it is rejected at the guardrail.",
      "モデルに生のURL・SQL・シェルを生成させて直接実行させては絶対にいけません。行動は固定のユニオン型に一致しなければならず、それ以外はガードレールで拒否されます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Memory và state: scratchpad, trace và seed",
    en: "4. Memory and state: scratchpad, trace and seed",
    ja: "4. メモリと状態: スクラッチパッド、トレース、シード",
  },
  blocks: [
    P(
      "Agent cần bộ nhớ để không lặp lại và để nhớ mục tiêu. Có ba tầng: short-term (scratchpad của lượt hiện tại: kế hoạch, các bước đã làm), episodic (trace đầy đủ của một lần chạy, dùng để replay và điều tra), và long-term (kiến thức tái dùng: selector đã kiểm chứng, bug đã biết). Tách rõ ba tầng giúp kiểm soát token và giúp việc chạy lại có thể tái tạo chính xác. State của thế giới (dữ liệu app) phải được seed cố định để mỗi lần chạy bắt đầu từ cùng một điểm.",
      "An agent needs memory so it does not repeat itself and remembers its goal. There are three tiers: short-term (the current turn's scratchpad: the plan, steps taken), episodic (the full trace of one run, used for replay and investigation), and long-term (reusable knowledge: verified selectors, known bugs). Cleanly separating the tiers controls tokens and lets a rerun reproduce exactly. The world state (the app's data) must be seeded deterministically so every run starts from the same point.",
      "エージェントは繰り返しを避け目標を覚えるためにメモリを必要とします。三層あります。短期(現ターンのスクラッチパッド: 計画、実行済みステップ)、エピソード(1回の実行の完全なトレース。リプレイと調査に使用)、長期(再利用可能な知識: 検証済みセレクタ、既知のバグ)です。層を明確に分けることでトークンを制御し、再実行で正確に再現できます。世界の状態(アプリのデータ)は決定論的にシードし、毎回同じ地点から開始させねばなりません。",
    ),
    P(
      "Điểm cần khắc cốt: mọi nguồn ngẫu nhiên phải kiểm soát được. Đó là seed sinh dữ liệu, thời gian (freeze clock), thứ tự dữ liệu, và cả nhiệt độ (temperature) của model khi cần tái tạo. Nếu bỏ sót một nguồn, cùng một input sẽ cho ra hành vi khác nhau và bạn mất khả năng replay. State và seed là nền tảng cho hai chương tiếp: điều kiện dừng và replay xác định.",
      "The point to burn in: every source of randomness must be controllable. That means the data-generation seed, time (freeze the clock), data ordering, and even the model's temperature when you need reproducibility. Miss one source and the same input yields different behaviour and you lose replay. State and seed are the foundation for the next two chapters: termination conditions and deterministic replay.",
      "肝に銘じるべき点: あらゆる乱数源が制御可能でなければなりません。データ生成のシード、時間(クロックの固定)、データの順序、再現が必要な場合はモデルの温度も含みます。一つでも見落とすと、同じ入力が異なる挙動を生み、リプレイができなくなります。状態とシードは次の二章、すなわち終了条件と決定論的リプレイの基盤です。",
    ),
    CODE(
      "typescript",
      `// State container: mọi nguồn ngẫu nhiên đều tường minh và cố định được.
interface AgentState {
  goal: string;
  oracle: OracleSpec;            // tiêu chí đúng-sai nghiệp vụ
  scratchpad: string[];         // short-term
  trace: ReActStep[];           // episodic — dùng để replay
  memory: KnownFacts;           // long-term: selector/bug đã biết
  seed: number;                 // seed dữ liệu + faker
  clock: string;                // freeze: "2026-07-01T00:00:00Z"
  temperature: 0;               // 0 để tái tạo được
  budget: { maxSteps: number; maxUsd: number; maxMs: number };
}

function newRun(goal: string, oracle: OracleSpec): AgentState {
  return {
    goal, oracle, scratchpad: [], trace: [], memory: loadMemory(),
    seed: 42, clock: "2026-07-01T00:00:00Z", temperature: 0,
    budget: { maxSteps: 25, maxUsd: 0.5, maxMs: 120_000 },
  };
}`,
    ),
    NOTE(
      "Long-term memory phải được kiểm duyệt: một selector 'đã biết' nhưng lỗi thời sẽ đầu độc mọi lần chạy sau. Đặt TTL và cho critic quyền vô hiệu hoá fact sai.",
      "Long-term memory must be curated: a 'known' but stale selector will poison every future run. Set a TTL and let the critic invalidate wrong facts.",
      "長期メモリは精査が必要です。「既知」だが古くなったセレクタは以降の全実行を汚染します。TTLを設定し、批評役に誤った事実を無効化する権限を与えましょう。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "5. Không gian hành động bị chặn (bounded action space)",
    en: "5. The bounded action space",
    ja: "5. 制限された行動空間",
  },
  blocks: [
    P(
      "Một agent an toàn không được phép làm bất cứ điều gì. Không gian hành động của nó là một danh sách trắng (allowlist) các công cụ có tham số kiểu chặt. Điều này giới hạn tác hại (không thể gọi API thanh toán thật), giảm không gian tìm kiếm (agent không lãng phí bước vào hành động vô nghĩa), và làm cho hành vi kiểm thử được. Với kiểm thử, action space điển hình gồm: điều hướng, tương tác UI theo role/name, đọc trạng thái, và assert bất biến. Mọi thứ có rủi ro cao phải nằm ngoài allowlist mặc định.",
      "A safe agent is not allowed to do anything at all. Its action space is an allowlist of tools with strictly typed parameters. This bounds the blast radius (it cannot call the real payment API), shrinks the search space (the agent does not waste steps on nonsense actions), and makes behaviour testable. For testing, a typical action space is: navigate, interact with the UI by role/name, read state, and assert invariants. Anything high-risk must sit outside the default allowlist.",
      "安全なエージェントは何でもできるわけではありません。その行動空間は、厳格に型付けされたパラメータを持つツールのallowlist(許可リスト)です。これにより被害範囲が制限され(本物の決済APIを呼べない)、探索空間が縮小し(無意味な行動にステップを浪費しない)、挙動がテスト可能になります。テストでは典型的な行動空間は、ナビゲート、role/nameによるUI操作、状態読取、不変条件のアサートです。高リスクなものはすべてデフォルトのallowlist外に置かねばなりません。",
    ),
    P(
      "Bên cạnh allowlist, cần một danh sách đen tường minh và một lớp thực thi. Danh sách đen ghi rõ những gì tuyệt đối cấm dù model có yêu cầu: chạy shell, DDL trên database, gửi email/SMS thật, thao tác cross-tenant. Lớp thực thi kiểm tra mỗi action trước khi chạy: nằm trong allowlist? tham số hợp lệ? có trong scope tenant test? Nếu không, action bị từ chối và ghi log — đây chính là điểm nối với guardrails ở bài B.",
      "Alongside the allowlist you need an explicit blacklist and an enforcement layer. The blacklist spells out what is absolutely forbidden even if the model asks for it: running a shell, DDL on the database, sending real email/SMS, cross-tenant operations. The enforcement layer checks each action before it runs: is it in the allowlist? are the parameters valid? is it within the test tenant scope? If not, the action is rejected and logged — this is the seam with the guardrails in article B.",
      "allowlistと並んで、明示的なブラックリストと実施層が必要です。ブラックリストは、モデルが要求しても絶対に禁止するものを明記します。シェル実行、データベースへのDDL、本物のメール・SMS送信、クロステナント操作などです。実施層は各行動を実行前に検査します。allowlist内か、パラメータは有効か、テストテナントのスコープ内か。そうでなければ行動は拒否されログに記録されます。これが記事Bのガードレールとの接合点です。",
    ),
    IMG(
      SVG_ACTION_SPACE,
      "Allowlist vs blacklist và trace mỗi bước; mọi action ngoài whitelist bị chặn tại guardrail.",
      "Allowlist vs blacklist plus per-step trace; any action outside the whitelist is blocked at the guardrail.",
      "allowlistとブラックリスト、そして各ステップのトレース。ホワイトリスト外の行動はガードレールで遮断されます。",
    ),
    CODE(
      "typescript",
      `// Lớp guardrail: validate action trước khi chạm hệ thống thật.
const ALLOW = new Set(["navigate","click","fill","readState","assert","finish"]);
const FORBIDDEN_URL = [/\\/api\\/pay/, /prod\\./, /admin\\/delete/];

class Guardrail {
  constructor(private tenant: string) {}
  assertAllowed(a: Action) {
    if (!ALLOW.has(a.tool)) throw new Blocked("tool ngoài allowlist: " + a.tool);
    if (a.tool === "navigate") {
      if (FORBIDDEN_URL.some(re => re.test(a.url))) throw new Blocked("URL cấm: " + a.url);
      if (!a.url.includes("tenant=" + this.tenant)) throw new Blocked("vượt scope tenant");
    }
    // fail-closed: nghi ngờ thì chặn, không phải cho qua
  }
}
class Blocked extends Error {}`,
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Điều kiện dừng và budget chi phí/thời gian",
    en: "6. Termination conditions and cost/time budgets",
    ja: "6. 終了条件とコスト・時間予算",
  },
  blocks: [
    P(
      "Không có điều kiện dừng, agent có thể chạy vô hạn, đốt tiền token và không bao giờ kết luận. Cần nhiều điều kiện dừng đồng thời: đạt oracle (thành công), hết ngân sách chi phí (USD/token), hết thời gian, chạm số bước tối đa, hoặc gặp forbidden action (dừng an toàn). Điều kiện dừng phải rõ ràng và ưu tiên fail-closed: khi không chắc, dừng và báo cáo thay vì tiếp tục mù quáng. Mỗi lần dừng phải kèm verdict và bằng chứng để người review hiểu vì sao.",
      "Without a termination condition an agent can run forever, burning token cost and never concluding. You need several stop conditions at once: the oracle is met (success), the cost budget is exhausted (USD/tokens), time runs out, the max step count is hit, or a forbidden action is encountered (a safe stop). Termination must be explicit and prefer fail-closed: when unsure, stop and report rather than blindly continue. Every stop must carry a verdict and evidence so a reviewer understands why.",
      "終了条件がなければ、エージェントは無限に実行し、トークンコストを浪費し、決して結論を出しません。複数の停止条件を同時に必要とします。オラクル達成(成功)、コスト予算の枯渇(USD/トークン)、時間切れ、最大ステップ数への到達、あるいは禁止アクションの発生(安全な停止)です。終了は明示的で、fail-closed(不確かなら盲目的に続けず停止して報告)を優先すべきです。各停止には判定と証拠を付け、レビュアーが理由を理解できるようにします。",
    ),
    P(
      "Budget nên tính theo cả ba trục: số bước, chi phí tiền, và thời gian treo. Số bước ngăn vòng lặp lãng phí; chi phí tiền bảo vệ hoá đơn; thời gian bảo vệ pipeline khỏi treo. Khi một trục cạn, agent dừng với verdict 'inconclusive' chứ không phải 'pass' — đây là chi tiết dễ sai: hết budget không có nghĩa là đạt. Ghi lại chi phí thực của mỗi bước để bài B có thể đo cost-per-run và cost-per-bug.",
      "Budget should be measured on all three axes: step count, money cost, and wall-clock time. Step count stops wasteful loops; money cost protects the bill; time protects the pipeline from hanging. When one axis is exhausted the agent stops with an 'inconclusive' verdict, not 'pass' — an easy mistake: running out of budget does not mean success. Record the real cost of each step so article B can measure cost-per-run and cost-per-bug.",
      "予算は三つの軸すべてで測るべきです。ステップ数、金銭コスト、実時間です。ステップ数は無駄なループを止め、金銭コストは請求を守り、時間はパイプラインのハングを防ぎます。ある軸が枯渇したら、エージェントは「pass」ではなく「inconclusive(判定不能)」で停止します。予算切れは成功を意味しない、というのは間違えやすい点です。各ステップの実コストを記録し、記事Bで実行あたり・バグあたりのコストを測れるようにします。",
    ),
    CODE(
      "typescript",
      `// Vòng lặp chính với nhiều điều kiện dừng và budget 3 trục.
async function runAgent(s: AgentState): Promise<Verdict> {
  let spent = { steps: 0, usd: 0, ms: 0 };
  const start = Date.now();
  while (true) {
    if (spent.steps >= s.budget.maxSteps) return stop("inconclusive", "hết max step");
    if (spent.usd   >= s.budget.maxUsd)   return stop("inconclusive", "hết budget \\$");
    if (spent.ms    >= s.budget.maxMs)    return stop("inconclusive", "hết thời gian");

    const step = await plan(s);                 // planner/executor
    try { guardrail.assertAllowed(step.action); }
    catch (e) { return stop("blocked", (e as Error).message); }  // dừng an toàn

    const obs = await execute(step.action);
    spent.steps++; spent.usd += step.cost; spent.ms = Date.now() - start;

    const c = await critic(s, step, obs);       // đối chiếu oracle
    if (c.oracle_met) return stop("pass", c.evidence);
    if (c.next === "stop") return stop("fail", c.evidence);
    s.trace.push(step);                          // ghi trace để replay
  }
}`,
    ),
    WARN(
      "Sai lầm kinh điển: coi 'hết budget' là pass. Phải phân biệt PASS (đạt oracle), FAIL (oracle vi phạm), INCONCLUSIVE (hết budget), BLOCKED (chạm guardrail).",
      "A classic mistake: treating 'out of budget' as pass. You must distinguish PASS (oracle met), FAIL (oracle violated), INCONCLUSIVE (out of budget), BLOCKED (hit a guardrail).",
      "典型的な誤り: 「予算切れ」をpassとみなすことです。PASS(オラクル達成)、FAIL(オラクル違反)、INCONCLUSIVE(予算切れ)、BLOCKED(ガードレール抵触)を区別しなければなりません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Replay xác định một lần chạy của agent",
    en: "7. Deterministic replay of an agent run",
    ja: "7. エージェント実行の決定論的リプレイ",
  },
  blocks: [
    P(
      "Replay xác định nghĩa là: cho cùng một trace và cùng một môi trường, chạy lại phải cho ra cùng kết quả. Đây là điều kiện sống còn để debug agent — nếu không tái tạo được lỗi, bạn không thể sửa. Để đạt điều này, mỗi bước phải ghi đủ: input đưa vào model, action sinh ra, observation nhận về, và mọi biến ngẫu nhiên (seed, clock, temperature=0). Khi replay, ta phát lại trace thay vì gọi lại model, hoặc gọi model với đúng các biến đã ghi.",
      "Deterministic replay means: given the same trace and the same environment, rerunning must produce the same result. This is vital for debugging an agent — if you cannot reproduce a failure, you cannot fix it. To achieve it, each step must record everything: the input given to the model, the action produced, the observation received, and every random variable (seed, clock, temperature=0). On replay you either play back the trace instead of re-calling the model, or call the model with exactly the recorded variables.",
      "決定論的リプレイとは、同じトレースと同じ環境が与えられれば、再実行が同じ結果を生まねばならない、という意味です。これはエージェントのデバッグに不可欠です。障害を再現できなければ修正できません。そのためには、各ステップがすべてを記録せねばなりません。モデルへの入力、生成された行動、受け取った観察、そしてあらゆる乱数変数(シード、クロック、temperature=0)です。リプレイ時にはモデルを再呼出せずトレースを再生するか、記録した変数で正確にモデルを呼び出します。",
    ),
    P(
      "Có hai chế độ replay hữu ích. Record-replay (VCR): lần đầu ghi lại phản hồi model và phản hồi mạng; lần sau phát lại — nhanh, rẻ, hoàn toàn xác định, lý tưởng cho unit test của chính agent. Live-replay: gọi lại model thật với cùng biến để kiểm tra xem hành vi có ổn định không. Hai chế độ bổ sung cho nhau: record-replay để test hồi quy nhanh, live-replay để đo độ trôi của model qua các phiên bản.",
      "There are two useful replay modes. Record-replay (VCR): the first run records the model and network responses; later runs play them back — fast, cheap, fully deterministic, ideal for unit-testing the agent itself. Live-replay: re-call the real model with the same variables to check whether behaviour is stable. The two modes complement each other: record-replay for fast regression tests, live-replay to measure the model's drift across versions.",
      "有用なリプレイモードは二つあります。レコード・リプレイ(VCR): 初回はモデルとネットワークの応答を記録し、以降は再生します。高速・安価・完全に決定論的で、エージェント自体のユニットテストに理想的です。ライブ・リプレイ: 同じ変数で本物のモデルを再呼出し、挙動が安定しているか確認します。二つは補完的で、レコード・リプレイは高速な回帰テストに、ライブ・リプレイはバージョン間のモデルのドリフト測定に使います。",
    ),
    CODE(
      "typescript",
      `// Record-replay: ghi phản hồi model + network, phát lại xác định.
class ReplayableModel {
  constructor(private mode: "record" | "replay", private tape: Tape) {}
  async next(input: Input): Promise<ReActStep> {
    const key = hash(input);                    // input phải xác định
    if (this.mode === "replay") {
      const rec = this.tape.get(key);
      if (!rec) throw new Error("thiếu bản ghi cho input — trace không xác định");
      return rec.output;                        // phát lại, không gọi model
    }
    const out = await realModel.next(input, { temperature: 0, seed: 42 });
    this.tape.set(key, { input, output: out }); // ghi để replay sau
    return out;
  }
}
// Test: chạy lại trace cũ, kỳ vọng verdict giống hệt → agent không hồi quy.
test("replay run #1204 → same verdict", async () => {
  const v = await runAgent(loadState("run-1204"), new ReplayableModel("replay", tape1204));
  expect(v.verdict).toBe("fail");
  expect(v.trace).toEqual(golden1204.trace);
});`,
    ),
    TIP(
      "Hash input trước khi lưu tape phải loại bỏ timestamp/uuid ngẫu nhiên, nếu không key không bao giờ trùng và replay luôn 'thiếu bản ghi'.",
      "The input hash used as the tape key must strip random timestamps/uuids, otherwise keys never match and replay always reports 'missing record'.",
      "テープのキーに使う入力ハッシュは、ランダムなタイムスタンプやuuidを除去せねばなりません。さもないとキーが一致せず、リプレイが常に「記録が見つからない」と報告します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Quan sát quyết định của agent (observability)",
    en: "8. Observability of agent decisions",
    ja: "8. エージェントの意思決定の可観測性",
  },
  blocks: [
    P(
      "Một agent không quan sát được là một hộp đen không thể tin cậy. Observability ở đây nghĩa là mỗi quyết định để lại dấu vết có cấu trúc: thought, action, observation, verdict của critic, chi phí, độ trễ, và tool đã dùng. Dữ liệu này nên đi ra dưới dạng span (như OpenTelemetry) để dựng thành cây một lần chạy. Khi agent báo một bug, người review phải xem lại được đúng chuỗi bước dẫn tới kết luận đó, kèm ảnh chụp trạng thái, để phân biệt bug thật với hallucination.",
      "An agent you cannot observe is a black box you cannot trust. Observability here means every decision leaves a structured trail: the thought, action, observation, the critic's verdict, cost, latency, and the tool used. This data should emit as spans (like OpenTelemetry) to build a tree of a single run. When the agent reports a bug, a reviewer must be able to replay the exact chain of steps that led to the conclusion, with state snapshots, to tell a real bug from a hallucination.",
      "観察できないエージェントは信頼できないブラックボックスです。ここでの可観測性とは、各意思決定が構造化された痕跡、すなわち思考、行動、観察、批評役の判定、コスト、レイテンシ、使用ツールを残すことを意味します。このデータはスパン(OpenTelemetryのような)として出力し、1回の実行のツリーを構築すべきです。エージェントがバグを報告したら、レビュアーは結論に至った正確なステップの連鎖を状態スナップショット付きで再現でき、本物のバグとハルシネーションを見分けられねばなりません。",
    ),
    P(
      "Ba câu hỏi mà observability phải trả lời tức thì: (1) Agent đã làm gì và vì sao (chuỗi thought/action)? (2) Nó tốn bao nhiêu (token, tiền, thời gian mỗi bước)? (3) Kết luận dựa trên bằng chứng nào (grounding)? Câu hỏi thứ ba là chống hallucination: mỗi khẳng định của agent phải trỏ tới observation cụ thể — grounding. Nếu một verdict không có bằng chứng gắn kèm, coi như không đáng tin và cần người kiểm.",
      "Three questions observability must answer instantly: (1) What did the agent do and why (the thought/action chain)? (2) How much did it cost (tokens, money, time per step)? (3) On what evidence is the conclusion based (grounding)? The third question is the anti-hallucination one: every claim by the agent must point to a concrete observation — grounding. If a verdict has no attached evidence, treat it as untrustworthy and require a human check.",
      "可観測性が即座に答えるべき三つの問い。(1) エージェントは何をなぜ行ったか(思考/行動の連鎖)。(2) いくら掛かったか(ステップごとのトークン、金銭、時間)。(3) 結論はどの証拠に基づくか(グラウンディング)。三つ目はハルシネーション対策です。エージェントの各主張は具体的な観察を指さねばなりません——グラウンディングです。判定に証拠が付いていなければ、信頼できないものとして人の確認を要します。",
    ),
    CODE(
      "typescript",
      `// Phát span cho mỗi bước — dựng cây một lần chạy, gắn bằng chứng (grounding).
import { trace } from "@opentelemetry/api";
const tracer = trace.getTracer("test-agent");

async function observedStep(s: AgentState, step: ReActStep) {
  return tracer.startActiveSpan("agent.step", async (span) => {
    span.setAttribute("thought", step.thought);
    span.setAttribute("tool", step.action.tool);
    const t0 = performance.now();
    const obs = await execute(step.action);
    span.setAttribute("latency_ms", performance.now() - t0);
    span.setAttribute("cost_usd", step.cost);
    span.setAttribute("evidence", JSON.stringify(obs.snapshotRef)); // grounding
    span.end();
    return obs;
  });
}`,
    ),
    SCEN(
      "Agent báo bug: đúng hay hallucination?",
      "Agent reports a bug: real or hallucination?",
      "Agent báo 'nút Thanh toán không phản hồi'. Bạn mở trace: thought hợp lý, nhưng observation cho thấy request POST /checkout trả 200 và trạng thái đơn chuyển 'paid'. Không có bằng chứng cho 'không phản hồi' — grounding rỗng. Kết luận: hallucination, agent tự bịa. Nhờ có trace + snapshot, bạn bác bỏ trong 2 phút thay vì mở điều tra vô ích.",
      "The agent reports 'the Pay button is unresponsive'. You open the trace: the thought is plausible, but the observation shows a POST /checkout returning 200 and the order state moving to 'paid'. There is no evidence for 'unresponsive' — grounding is empty. Verdict: hallucination, the agent made it up. Thanks to the trace + snapshot you dismiss it in two minutes instead of opening a pointless investigation.",
      "エージェントがバグを報告: 本物かハルシネーションか？",
      "エージェントが「支払いボタンが反応しない」と報告します。トレースを開くと、思考はもっともらしいが、観察はPOST /checkoutが200を返し注文状態が「paid」に移ったことを示します。「反応しない」の証拠がなく——グラウンディングが空です。判定: ハルシネーション、エージェントの作り話です。トレースとスナップショットのおかげで、無益な調査を始める代わりに2分で却下できます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. Planner: từ mục tiêu tới kế hoạch bước có kiểm chứng",
    en: "9. Planner: from goal to a verifiable step plan",
    ja: "9. プランナー: 目標から検証可能なステップ計画へ",
  },
  blocks: [
    P(
      "Planner nhận mục tiêu, oracle và bối cảnh rồi sinh ra một kế hoạch: danh sách bước, mỗi bước có tiền điều kiện và kỳ vọng quan sát. Kế hoạch tốt không phải là chuỗi click mù mà là chuỗi giả thuyết kiểm chứng được: 'nếu tôi chuyển 100k thì số dư nguồn giảm đúng 100k'. Planner nên sinh kế hoạch dạng cấu trúc để executor và critic đọc được, và để guardrail kiểm tra trước rằng không có bước nào vi phạm scope. Một planner giỏi cũng ước lượng chi phí kế hoạch để dừng sớm nếu vượt budget dự kiến.",
      "The planner takes the goal, the oracle and context and produces a plan: a list of steps, each with a precondition and an expected observation. A good plan is not a blind click sequence but a chain of falsifiable hypotheses: 'if I transfer 100k the source balance drops by exactly 100k'. The planner should emit a structured plan the executor and critic can read, and that the guardrail can pre-check so no step violates scope. A strong planner also estimates the plan's cost so it can stop early if it exceeds the expected budget.",
      "プランナーは目標、オラクル、文脈を受け取り計画を作ります。ステップの一覧で、各ステップは事前条件と期待される観察を持ちます。良い計画は盲目的なクリックの連鎖ではなく、反証可能な仮説の連鎖です。「10万を送金すれば送金元残高がちょうど10万減る」といったものです。プランナーは実行役と批評役が読め、ガードレールがどのステップもスコープに違反しないよう事前検査できる構造化計画を出力すべきです。優れたプランナーは計画のコストも見積もり、予想予算を超えれば早期に停止します。",
    ),
    P(
      "Cạm bẫy lớn nhất là để planner viết kế hoạch quá dài rồi bám cứng vào nó. Thực tế kiểm thử luôn có bất ngờ (dialog lạ, dữ liệu khác), nên kế hoạch phải là bản nháp có thể sửa: sau mỗi observation, critic quyết định giữ, sửa hay lập lại kế hoạch. Đây là vòng phản tư (reflection). Hãy giữ kế hoạch ngắn, ưu tiên bước tiến gần oracle nhất, và luôn kèm tiêu chí kiểm chứng cho từng bước để không có bước nào 'thành công' mà không có bằng chứng.",
      "The biggest trap is letting the planner write an over-long plan and then clinging to it. Real testing always brings surprises (an unexpected dialog, different data), so the plan must be an editable draft: after each observation the critic decides to keep, amend or replan. This is the reflection loop. Keep plans short, prioritise the step that gets closest to the oracle, and always attach a verification criterion to each step so no step 'succeeds' without evidence.",
      "最大の罠は、プランナーに長すぎる計画を書かせてそれに固執することです。実際のテストには常に想定外(予期せぬダイアログ、異なるデータ)があるため、計画は編集可能な下書きでなければなりません。各観察の後、批評役が維持・修正・再計画を決めます。これが反省ループです。計画は短く保ち、オラクルに最も近づくステップを優先し、各ステップに検証基準を付けて、証拠なしに「成功」するステップがないようにします。",
    ),
    CODE(
      "typescript",
      `// Kế hoạch có cấu trúc: mỗi bước kèm tiền điều kiện + kỳ vọng kiểm chứng.
interface PlanStep {
  intent: string;                 // ý định người-đọc-được
  action: Action;                 // action có cấu trúc (guardrail check)
  precondition: string;           // trạng thái cần trước khi chạy
  expect: { invariant: string; op: "eq" | "delta" | "gte"; value: unknown };
}
interface Plan { goal: string; steps: PlanStep[]; estUsd: number; }

function assertPlanSafe(plan: Plan, guard: Guardrail, budget: number) {
  if (plan.estUsd > budget) throw new Error("kế hoạch vượt budget dự kiến");
  for (const s of plan.steps) guard.assertAllowed(s.action);  // pre-check scope
  const noExpect = plan.steps.filter(s => !s.expect);
  if (noExpect.length) throw new Error("có bước không có tiêu chí kiểm chứng");
}`,
    ),
    QA(
      "Vì sao planner nên sinh kế hoạch có cấu trúc thay vì văn xuôi?",
      "Why should the planner emit a structured plan instead of prose?",
      "Vì kế hoạch có cấu trúc cho phép guardrail kiểm tra trước từng action (đúng scope, đúng allowlist), cho phép ước lượng chi phí, và buộc mỗi bước có tiêu chí kiểm chứng gắn với oracle. Văn xuôi thì không kiểm được và dễ giấu bước rủi ro hoặc bước không có bằng chứng.",
      "Because a structured plan lets the guardrail pre-check each action (correct scope, in the allowlist), lets you estimate cost, and forces each step to carry a verification criterion tied to the oracle. Prose cannot be checked and easily hides risky or evidence-free steps.",
      "構造化計画なら、ガードレールが各アクションを事前検査でき(正しいスコープ、allowlist内)、コストを見積もれ、各ステップにオラクルと結びついた検証基準を強制できるからです。文章では検査できず、危険なステップや証拠のないステップを容易に隠せます。",
    ),
    NOTE(
      "Planner nên đề xuất bước rẻ nhất chứng minh/bác bỏ oracle trước. Đừng khám phá toàn bộ UI khi một assert trạng thái đã đủ kết luận.",
      "The planner should propose the cheapest step that proves or disproves the oracle first. Do not explore the whole UI when a single state assertion already settles it.",
      "プランナーはオラクルを証明・反証する最も安価なステップをまず提案すべきです。単一の状態アサートで決着するのに、UI全体を探索してはいけません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Executor: gọi tool an toàn và chuẩn hoá quan sát",
    en: "10. Executor: safe tool calls and normalised observations",
    ja: "10. 実行役: 安全なツール呼び出しと観察の正規化",
  },
  blocks: [
    P(
      "Executor là nơi kế hoạch chạm hệ thống. Trách nhiệm của nó gồm: xác thực action qua guardrail, gọi đúng tool, xử lý lỗi và timeout, rồi chuẩn hoá observation về một dạng gọn cho model. Chuẩn hoá là chìa khoá: với web, ta trích cây accessibility (role + name + trạng thái) thay vì đổ HTML; với API, ta giữ status, các field then chốt và một hash body thay vì toàn bộ payload. Observation gọn giúp model quyết định tốt hơn, giảm token, và làm trace dễ đọc khi điều tra.",
      "The executor is where the plan touches the system. Its responsibilities are: validate the action through the guardrail, call the right tool, handle errors and timeouts, then normalise the observation into a compact shape for the model. Normalisation is the key: for web we extract the accessibility tree (role + name + state) rather than dumping HTML; for APIs we keep the status, the key fields and a body hash rather than the whole payload. A compact observation helps the model decide better, cuts tokens, and keeps the trace readable during investigation.",
      "実行役は計画がシステムに触れる場所です。その責務は、ガードレールで行動を検証し、正しいツールを呼び、エラーとタイムアウトを処理し、観察をモデル向けのコンパクトな形に正規化することです。正規化が鍵です。ウェブではHTMLを投入する代わりにアクセシビリティツリー(role+name+状態)を抽出し、APIでは全ペイロードの代わりにステータス、主要フィールド、ボディのハッシュを保持します。コンパクトな観察はモデルの判断を助け、トークンを削減し、調査時にトレースを読みやすくします。",
    ),
    P(
      "Executor cũng phải xử lý tính bất định của UI: chờ điều kiện (wait-for-state) thay vì sleep cứng, thử lại có kiểm soát khi gặp lỗi tạm thời, và phân biệt lỗi hệ thống với lỗi nghiệp vụ. Một retry mù có thể che giấu bug thật; vì thế mọi retry phải được ghi vào trace kèm lý do. Nếu tool trả về mơ hồ, executor không tự suy diễn mà trả observation trung thực cho critic phán xử — nguyên tắc là executor không được 'tô hồng' kết quả.",
      "The executor must also handle UI nondeterminism: wait for a state (wait-for-state) instead of a hard sleep, retry in a controlled way on transient errors, and distinguish system errors from business errors. A blind retry can mask a real bug; so every retry must be recorded in the trace with a reason. If a tool returns something ambiguous, the executor does not infer on its own but hands a faithful observation to the critic to judge — the principle is that the executor must not sugar-coat results.",
      "実行役はUIの非決定性も扱わねばなりません。ハードなsleepではなく状態を待ち(wait-for-state)、一時的エラーには制御された再試行を行い、システムエラーと業務エラーを区別します。盲目的な再試行は本物のバグを隠しかねないため、すべての再試行は理由とともにトレースに記録せねばなりません。ツールが曖昧なものを返した場合、実行役は独自に推論せず、忠実な観察を批評役に渡して判断させます。原則は、実行役が結果を美化してはならない、ということです。",
    ),
    CODE(
      "typescript",
      `// Executor: wait-for-state, retry có kiểm soát, chuẩn hoá observation.
async function execute(a: Action): Promise<Observation> {
  guardrail.assertAllowed(a);                 // luôn kiểm trước
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await tools.invoke(a);        // gọi tool thật (staging)
      return normalize(raw);                     // cây a11y / status+field, không đổ HTML
    } catch (e) {
      if (!isTransient(e) || attempt === 3) {
        return { ok: false, kind: "error", detail: String(e), attempt }; // trung thực
      }
      log.retry({ action: a, attempt, reason: String(e) });  // ghi trace, không giấu
      await waitForStable();                     // chờ điều kiện, không sleep cứng
    }
  }
  throw new Error("unreachable");
}`,
    ),
    QA(
      "Vì sao nên trích cây accessibility thay vì gửi cả HTML cho model?",
      "Why extract the accessibility tree instead of sending the whole HTML to the model?",
      "Cây accessibility (role/name/state) ổn định hơn, ít nhiễu hơn và nhỏ hơn nhiều so với HTML thô. Nó giảm token, giúp model chọn phần tử theo ngữ nghĩa (đúng như người dùng thật), và làm observation trong trace dễ đọc. Đổ cả HTML gây phình ngữ cảnh và dễ khiến model bám vào chi tiết trình bày vô nghĩa.",
      "The accessibility tree (role/name/state) is more stable, less noisy and far smaller than raw HTML. It cuts tokens, lets the model pick elements semantically (as a real user would), and keeps the observation in the trace readable. Dumping HTML bloats the context and tempts the model to latch onto meaningless presentation details.",
      "アクセシビリティツリー(role/name/state)は生HTMLより安定しノイズが少なくはるかに小さいです。トークンを削減し、モデルが要素を意味的に(実ユーザーのように)選べ、トレース内の観察が読みやすくなります。HTMLの投入は文脈を膨張させ、モデルが無意味な表示の詳細に固執する誘因になります。",
    ),
    WARN(
      "Retry mù là kẻ thù của kiểm thử: nếu thao tác thất bại vì bug thật rồi retry cho tới khi 'may mắn' qua, bạn vừa che giấu chính lỗi cần tìm. Mọi retry phải có lý do trong trace.",
      "Blind retry is the enemy of testing: if an action fails because of a real bug and you retry until it 'luckily' passes, you have hidden the very defect you were hunting. Every retry must have a reason in the trace.",
      "盲目的な再試行はテストの敵です。本物のバグで操作が失敗したのに「運良く」通るまで再試行すれば、探すべき欠陥そのものを隠したことになります。すべての再試行はトレースに理由を持たねばなりません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Critic và oracle: chống thành công giả",
    en: "11. Critic and oracle: defeating false success",
    ja: "11. 批評役とオラクル: 偽の成功を打ち破る",
  },
  blocks: [
    P(
      "Critic là lá chắn chống hallucination và thành công giả. Nó không hỏi 'trông có ổn không' mà kiểm chứng oracle cụ thể bằng bằng chứng lấy từ observation. Có ba loại oracle thường dùng: oracle trạng thái (số dư, tồn kho, trạng thái đơn), oracle bất biến (tổng nợ = tổng có, không âm), và oracle so sánh (kết quả bằng golden hoặc bằng hệ tham chiếu). Critic phải trả verdict kèm evidence trỏ tới đúng observation nào; nếu không có evidence, verdict tự động là 'không đủ căn cứ' chứ không phải 'đạt'.",
      "The critic is the shield against hallucination and false success. It does not ask 'does this look fine' but verifies a concrete oracle using evidence drawn from an observation. Three oracle types are common: state oracles (balance, inventory, order status), invariant oracles (debits = credits, non-negative), and comparison oracles (result equals the golden or a reference system). The critic must return a verdict with evidence pointing to the exact observation; with no evidence the verdict defaults to 'insufficient grounds', not 'pass'.",
      "批評役はハルシネーションと偽の成功に対する盾です。「よさそうか」ではなく、観察から得た証拠で具体的なオラクルを検証します。よく使うオラクルは三種類です。状態オラクル(残高、在庫、注文状態)、不変条件オラクル(借方=貸方、非負)、比較オラクル(結果がゴールデンまたは参照系と等しい)です。批評役は正確にどの観察かを指す証拠付きで判定を返さねばなりません。証拠がなければ判定は「pass」ではなく「根拠不十分」が既定です。",
    ),
    P(
      "Một critic mạnh còn phát hiện agent đi lạc: lặp cùng action nhiều lần, rời khỏi luồng mục tiêu, hoặc tự thuyết phục mình đã xong dù oracle chưa được kiểm. Khi phát hiện, critic ra lệnh replan hoặc dừng. Điểm tinh tế: critic không nên tự mình gọi tool để 'kiểm tra thêm' vì như thế nó vừa là quan toà vừa là điều tra viên, dễ thiên vị; thay vào đó nó yêu cầu executor thu thập bằng chứng còn thiếu qua một bước assert tường minh, giữ ranh giới vai trò rạch ròi.",
      "A strong critic also detects when the agent drifts: repeating the same action, leaving the goal flow, or talking itself into 'done' though the oracle was never checked. On detection the critic orders a replan or a stop. A subtle point: the critic should not itself call tools to 'double-check', because then it is both judge and investigator and easily biased; instead it asks the executor to gather the missing evidence through an explicit assert step, keeping the role boundary clean.",
      "強い批評役はエージェントの逸脱も検知します。同じ行動の繰り返し、目標フローからの離脱、オラクルを検証していないのに「完了」と思い込むことです。検知時、批評役は再計画または停止を命じます。微妙な点として、批評役は自ら「再確認」のためにツールを呼ぶべきではありません。そうすると裁判官と捜査官を兼ね、偏りやすいからです。代わりに、明示的なassertステップで欠けている証拠を集めるよう実行役に求め、役割の境界を明確に保ちます。",
    ),
    CODE(
      "typescript",
      `// Critic: chấm điểm theo schema cứng, verdict PHẢI có evidence.
interface Critique {
  oracle_met: boolean;
  evidence: string | null;         // trỏ tới observation cụ thể; null = không đủ căn cứ
  next: "stop" | "retry" | "replan";
  drift?: "loop" | "out_of_scope" | "no_progress";
}
function critique(oracle: OracleSpec, obs: Observation, hist: ReActStep[]): Critique {
  const ev = checkInvariant(oracle, obs);           // so sánh với trạng thái kỳ vọng
  if (ev.matched === undefined) return { oracle_met:false, evidence:null, next:"retry" };
  if (isLooping(hist)) return { oracle_met:false, evidence:ev.ref, next:"replan", drift:"loop" };
  return ev.matched
    ? { oracle_met:true,  evidence:ev.ref, next:"stop" }
    : { oracle_met:false, evidence:ev.ref, next:"replan" };   // vi phạm oracle = FAIL có bằng chứng
}`,
    ),
    QA(
      "Vì sao critic không nên tự gọi tool để 'kiểm tra thêm'?",
      "Why should the critic not call tools itself to 'double-check'?",
      "Vì nếu critic vừa thu thập bằng chứng vừa phán xử thì nó là quan toà kiêm điều tra viên, dễ thiên vị và khó tách lỗi khi debug. Giữ vai rạch ròi: critic yêu cầu executor chạy một bước assert tường minh để lấy bằng chứng còn thiếu, rồi mới phán. Nhờ đó mọi bằng chứng đều nằm trong trace và replay được.",
      "Because if the critic both gathers evidence and judges, it is judge and investigator at once — easily biased and hard to isolate when debugging. Keep roles clean: the critic asks the executor to run an explicit assert step to fetch the missing evidence, and only then rules. That way all evidence sits in the trace and is replayable.",
      "批評役が証拠収集と判断を兼ねると、裁判官兼捜査官となり偏りやすく、デバッグ時に問題を切り分けにくいからです。役割を明確に保ち、批評役は明示的なassertステップの実行を実行役に求めて欠けた証拠を取得し、その後で判断します。こうすればすべての証拠がトレースに残りリプレイ可能になります。",
    ),
    SCEN(
      "Thành công giả trong luồng hoàn tiền",
      "False success in a refund flow",
      "Agent thao tác hoàn tiền, thấy toast 'Hoàn tiền thành công' và định kết luận pass. Critic không tin toast: nó yêu cầu assert số dư ví khách và trạng thái giao dịch. Observation cho thấy trạng thái vẫn 'pending' và số dư chưa đổi — toast chỉ là phản hồi lạc quan phía client. Critic ra verdict FAIL kèm evidence là snapshot trạng thái, chặn một thành công giả mà nếu chỉ nhìn UI sẽ bị bỏ sót.",
      "The agent runs a refund, sees a 'Refund successful' toast and is about to conclude pass. The critic distrusts the toast: it requests an assert on the customer's wallet balance and the transaction status. The observation shows the status is still 'pending' and the balance is unchanged — the toast was just optimistic client feedback. The critic returns a FAIL verdict with the state snapshot as evidence, blocking a false success that a UI-only check would have missed.",
      "払い戻しフローでの偽の成功",
      "エージェントが払い戻しを実行し「払い戻し成功」のトーストを見てpassと結論づけようとします。批評役はトーストを信じず、顧客ウォレット残高と取引状態のassertを要求します。観察は状態がまだ「pending」で残高が変わっていないことを示します——トーストはクライアント側の楽観的なフィードバックにすぎませんでした。批評役は状態スナップショットを証拠にFAIL判定を返し、UIだけの確認では見逃す偽の成功を阻止します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Ghép các mảnh: một lần chạy agent đầu-cuối",
    en: "12. Putting it together: an end-to-end agent run",
    ja: "12. 組み合わせる: エンドツーエンドのエージェント実行",
  },
  blocks: [
    P(
      "Giờ ghép mọi mảnh: state có seed/clock/budget, planner sinh kế hoạch kiểm chứng được, executor gọi tool an toàn và chuẩn hoá observation, critic đối chiếu oracle, guardrail chặn action cấm, và toàn bộ được ghi trace để replay và quan sát. Một lần chạy đầu-cuối là vòng lặp: plan → (mỗi bước) execute → critique → cập nhật trace, cho tới khi đạt oracle, hết budget, hoặc chạm guardrail. Điều làm nó đáng tin không phải model mạnh, mà là các ràng buộc quanh model: oracle rõ, action có kiểu, budget cứng, verdict có bằng chứng.",
      "Now assemble every piece: state with seed/clock/budget, a planner that emits a verifiable plan, an executor that calls tools safely and normalises observations, a critic that checks the oracle, a guardrail that blocks forbidden actions, and everything recorded as a trace for replay and observability. An end-to-end run is the loop: plan → (per step) execute → critique → update trace, until the oracle is met, budget is gone, or a guardrail is hit. What makes it trustworthy is not a stronger model but the constraints around the model: a crisp oracle, typed actions, a hard budget, and evidence-backed verdicts.",
      "では全部品を組み合わせます。seed/clock/budgetを持つ状態、検証可能な計画を出すプランナー、安全にツールを呼び観察を正規化する実行役、オラクルを検証する批評役、禁止行動を遮断するガードレール、そしてリプレイと可観測性のためにトレースとして記録される全体です。エンドツーエンド実行はループです。plan→(各ステップ)execute→critique→トレース更新を、オラクル達成・予算枯渇・ガードレール抵触まで繰り返します。信頼できるのは強力なモデルではなく、モデルを取り巻く制約です。明確なオラクル、型付き行動、厳格な予算、証拠に裏打ちされた判定です。",
    ),
    P(
      "Khi vận hành thật, đầu ra của một lần chạy nên là một 'report' có cấu trúc: verdict, oracle đã kiểm, bằng chứng, chi phí đã tiêu, và link tới trace đầy đủ. Report này là đầu vào cho con người review và cho eval harness ở bài B. Đừng để agent tự tạo test case rồi tự đóng dấu 'đã kiểm'; con người hoặc một cổng eval phải xác nhận. Agent là công cụ mở rộng năng lực khám phá, không phải quyền phán quyết cuối cùng về chất lượng.",
      "In real operation, the output of a run should be a structured report: the verdict, the oracle checked, the evidence, the cost spent, and a link to the full trace. This report is the input for human review and for the eval harness in article B. Do not let the agent invent a test case and then stamp it 'verified' itself; a human or an eval gate must confirm. The agent is a tool that scales exploration, not the final authority on quality.",
      "実運用では、実行の出力は構造化されたレポートであるべきです。判定、検証したオラクル、証拠、消費コスト、完全なトレースへのリンクです。このレポートは人のレビューと記事Bの評価ハーネスの入力になります。エージェントにテストケースを考案させて自ら「検証済み」と押印させてはいけません。人または評価ゲートが確認せねばなりません。エージェントは探索を拡大する道具であり、品質に関する最終権限ではありません。",
    ),
    CODE(
      "typescript",
      `// Đầu ra một lần chạy: report có cấu trúc, sẵn sàng cho review + eval harness.
interface RunReport {
  runId: string;
  verdict: "pass" | "fail" | "inconclusive" | "blocked";
  oracle: string;                  // oracle đã kiểm
  evidence: string[];              // ref tới observation/snapshot
  spent: { steps: number; usd: number; ms: number };
  traceUrl: string;                // trace đầy đủ để replay
  needsHumanReview: boolean;       // true nếu verdict != pass hoặc phát hiện bug
}
async function runToReport(goal: string, oracle: OracleSpec): Promise<RunReport> {
  const s = newRun(goal, oracle);
  const v = await runAgent(s);                       // vòng lặp plan/exec/critique
  return {
    runId: s.id, verdict: v.verdict, oracle: oracle.name,
    evidence: v.evidence, spent: v.spent, traceUrl: saveTrace(s.trace),
    needsHumanReview: v.verdict !== "pass" || v.foundBug,   // luôn có người chốt
  };
}`,
    ),
    QA(
      "Điều gì làm một AI test agent 'đáng tin', nếu không phải là model mạnh?",
      "What makes an AI test agent 'trustworthy', if not a stronger model?",
      "Các ràng buộc quanh model: oracle rõ ràng để có tiêu chí đúng-sai; action có kiểu và allowlist để giới hạn tác hại; budget cứng ba trục để dừng đúng lúc; verdict phải kèm bằng chứng trỏ tới observation; và trace replay được để con người kiểm chứng. Model mạnh hơn không cứu được một hệ thống thiếu oracle và thiếu bằng chứng — nó chỉ hallucination thuyết phục hơn.",
      "The constraints around the model: a crisp oracle for pass/fail criteria; typed, allowlisted actions to bound harm; a hard three-axis budget to stop on time; verdicts that must carry evidence pointing to an observation; and a replayable trace for humans to verify. A stronger model cannot save a system that lacks an oracle and evidence — it just hallucinates more convincingly.",
      "モデルを取り巻く制約です。合否基準のための明確なオラクル、被害を制限する型付き・allowlist化された行動、適時に停止するための厳格な三軸予算、観察を指す証拠を必ず伴う判定、そして人が検証できるリプレイ可能なトレースです。より強力なモデルは、オラクルと証拠を欠くシステムを救えません——より説得力のあるハルシネーションをするだけです。",
    ),
    TIP(
      "Bắt đầu nhỏ: một agent chỉ có 5 tool và một oracle duy nhất, chạy trên staging seed cố định. Khi đã tin trace và replay, mới mở rộng action space và mục tiêu.",
      "Start small: an agent with just five tools and a single oracle, running on a fixed staging seed. Only after you trust the trace and replay should you expand the action space and the goals.",
      "小さく始めましょう。ツール5個と単一オラクルだけのエージェントを、固定シードのステージングで走らせます。トレースとリプレイを信頼できてから、行動空間と目標を拡張します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Chống mẫu và giới hạn của AI test agent",
    en: "13. Anti-patterns and limits of AI test agents",
    ja: "13. AIテストエージェントのアンチパターンと限界",
  },
  blocks: [
    P(
      "Nhiều đội vấp phải cùng những chống mẫu. Thứ nhất, agent không oracle: cho agent 'tự tìm bug' mà không định nghĩa đúng-sai, kết quả là một dòng thác báo cáo nửa đúng nửa bịa, tốn công phân loại hơn là tự kiểm tay. Thứ hai, agent trên đường CI chặn merge nhưng không xác định: một lần đỏ có thể do model đổi hành vi chứ không phải code hỏng, làm mất niềm tin vào cổng. Thứ ba, không giới hạn action: agent chạm được prod hoặc gọi API tính tiền thật — rủi ro không đáng.",
      "Many teams hit the same anti-patterns. First, the oracle-less agent: telling an agent to 'just find bugs' without defining pass/fail yields a torrent of half-right, half-invented reports that cost more to triage than manual testing. Second, an agent on the merge-blocking CI path but non-deterministic: a red run may be the model changing behaviour rather than broken code, destroying trust in the gate. Third, an unbounded action space: the agent can reach prod or call a real billing API — a risk not worth taking.",
      "多くのチームが同じアンチパターンにぶつかります。第一に、オラクルなしエージェント: 合否を定義せず「とにかくバグを見つけろ」と命じると、半分正しく半分でっち上げの報告が奔流となり、手動テストより仕分けに手間がかかります。第二に、非決定論的なのにマージをブロックするCI経路上のエージェント: 赤い実行はコードの故障ではなくモデルの挙動変化かもしれず、ゲートへの信頼を破壊します。第三に、無制限の行動空間: エージェントが本番に到達したり本物の課金APIを呼べたりします——取るに値しないリスクです。",
    ),
    P(
      "Giới hạn cần chấp nhận thẳng thắn: agent kém ở việc lặp lại chính xác (đó là việc của test cố định), tốn kém hơn nhiều lần chạy, và có thể trôi hành vi khi model nâng cấp. Vì thế vai trò đúng của agent là mở rộng khám phá và sinh nháp: nó phát hiện luồng chưa ai test, đề xuất test case, điều tra flaky — rồi con người chốt và chuyển thứ giá trị thành test cố định, xác định, rẻ. Agent là kính lúp, không phải cỗ máy phán quyết. Bài B sẽ chỉ cách đo và bảo vệ chính agent này bằng eval harness và guardrails.",
      "Limits to accept honestly: agents are poor at repeating precisely (that is fixed tests' job), far more expensive per run, and can drift in behaviour when the model is upgraded. So the agent's right role is to scale exploration and draft generation: it finds flows nobody tested, proposes test cases, investigates flakiness — then a human confirms and turns the valuable ones into fixed, deterministic, cheap tests. The agent is a magnifying glass, not a verdict machine. Article B shows how to measure and protect this very agent with an eval harness and guardrails.",
      "率直に受け入れるべき限界: エージェントは正確な繰り返しが苦手で(それは固定テストの仕事)、実行あたりのコストがはるかに高く、モデルのアップグレードで挙動がドリフトしうる点です。ですからエージェントの正しい役割は探索と草案生成の拡大です。誰もテストしていないフローを見つけ、テストケースを提案し、フレーキーを調査します——その後、人が確認し価値あるものを固定・決定論的・安価なテストに変えます。エージェントは虫眼鏡であり判決機ではありません。記事Bはこのエージェント自体を評価ハーネスとガードレールで測定し保護する方法を示します。",
    ),
    CODE(
      "typescript",
      `// Cổng vận hành: quyết định agent-generated có được lên CI chặn merge không.
function promoteToRegression(report: RunReport): "keep_exploratory" | "make_fixed_test" {
  // Chỉ 'cứng hoá' khi đã xác định + có oracle + đã review.
  if (!report.evidence.length) return "keep_exploratory";     // không bằng chứng → không lên CI
  if (report.needsHumanReview && !humanApproved(report.runId)) return "keep_exploratory";
  if (!isReplayDeterministic(report.runId)) return "keep_exploratory";  // còn non-determinism
  return "make_fixed_test";  // chuyển thành test cố định, rẻ, xác định
}`,
    ),
    QA(
      "Khi nào KHÔNG nên đặt AI test agent vào CI chặn merge?",
      "When should you NOT put an AI test agent on the merge-blocking CI path?",
      "Khi lần chạy chưa xác định (replay không cho verdict giống nhau), khi chưa có eval harness đo flakiness và regression của chính agent, và khi verdict thiếu bằng chứng. Trong các trường hợp đó một lần đỏ có thể do model trôi chứ không phải code hỏng, làm đội mất niềm tin và bắt đầu bỏ qua cổng. Chỉ cứng hoá khi đã xác định, có oracle và đã review.",
      "When the run is non-deterministic (replay does not give the same verdict), when there is no eval harness measuring the agent's own flakiness and regression, and when verdicts lack evidence. In those cases a red run may be model drift rather than broken code, so the team loses trust and starts ignoring the gate. Only harden it once it is deterministic, has an oracle, and has been reviewed.",
      "実行が非決定論的(リプレイが同じ判定を出さない)なとき、エージェント自身のフレーキーと回帰を測る評価ハーネスがないとき、判定に証拠がないときです。これらの場合、赤い実行はコード故障ではなくモデルのドリフトかもしれず、チームは信頼を失いゲートを無視し始めます。決定論的でオラクルがありレビュー済みになって初めて固定化します。",
    ),
    NOTE(
      "Tổng kết bài A: kiến trúc = planner/executor/critic + ReAct + memory/state có seed + bounded action + budget ba trục + termination fail-closed + replay + observability, tất cả xoay quanh oracle. Bài B đo và bảo vệ hệ này.",
      "Article A summary: the architecture = planner/executor/critic + ReAct + seeded memory/state + a bounded action space + a three-axis budget + fail-closed termination + replay + observability, all revolving around the oracle. Article B measures and protects this system.",
      "記事Aのまとめ: アーキテクチャ=プランナー/実行/批評+ReAct+シード付きメモリと状態+制限された行動空間+三軸予算+fail-closedな終了+リプレイ+可観測性、すべてがオラクルを中心に回ります。記事Bはこの系を測定し保護します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "1. Vì sao một AI test agent cần eval harness riêng",
    en: "1. Why an AI test agent needs its own eval harness",
    ja: "1. なぜAIテストエージェントは専用の評価ハーネスを必要とするか",
  },
  blocks: [
    P(
      "Một AI test agent là phần mềm, và giống mọi phần mềm, nó có thể hồi quy. Nhưng khác code thường, agent phi xác định: cùng đầu vào có thể cho hành vi khác vì model, temperature, hay dữ liệu đổi. Vì vậy ta không thể tin 'nó chạy được hôm qua'. Eval harness là bộ khung đo lường lặp lại được: một tập bài toán có oracle đã biết, chạy agent trên đó, và đo các chỉ số khách quan. Nếu không có harness, mọi thay đổi prompt hay nâng model đều là canh bạc — bạn không biết agent đang tốt lên hay tệ đi.",
      "An AI test agent is software, and like all software it can regress. But unlike ordinary code the agent is non-deterministic: the same input can produce different behaviour because the model, temperature, or data changed. So you cannot trust 'it worked yesterday'. An eval harness is a repeatable measurement framework: a set of tasks with known oracles, run the agent on them, and measure objective metrics. Without a harness every prompt tweak or model upgrade is a gamble — you do not know whether the agent got better or worse.",
      "AIテストエージェントはソフトウェアであり、あらゆるソフトウェア同様に回帰しえます。しかし通常のコードと異なり、エージェントは非決定論的です。モデル・温度・データの変化により、同じ入力が異なる挙動を生みえます。ですから「昨日は動いた」を信用できません。評価ハーネスは再現可能な測定の枠組みです。既知のオラクルを持つタスク群でエージェントを走らせ、客観的な指標を測ります。ハーネスがなければ、プロンプト調整やモデル更新はすべて賭けであり、エージェントが良くなったか悪くなったか分かりません。",
    ),
    P(
      "Điểm oracle-first trở lại ở đây với sức nặng gấp đôi. Để đo agent, mỗi bài trong bộ eval phải có oracle rõ: kết quả đúng là gì, bug nào đáng lẽ phải bắt được. Chỉ khi biết sự thật (ground truth) ta mới tính được đúng-sai của agent. Harness không đo 'agent nói gì' mà đo 'agent có kết luận khớp sự thật không'. Đây là khác biệt sống còn giữa một agent thực sự tìm bug và một agent chỉ tạo ra văn bản nghe hợp lý.",
      "The oracle-first point returns here with double weight. To measure the agent, every task in the eval set must have a clear oracle: what the correct result is, which bug it should have caught. Only when you know the ground truth can you compute the agent's right-vs-wrong. The harness does not measure 'what the agent said' but 'whether the agent's conclusion matches the truth'. This is the vital difference between an agent that actually finds bugs and one that merely produces plausible-sounding text.",
      "オラクル優先の論点がここで二倍の重みで戻ります。エージェントを測るには、評価セットの各タスクが明確なオラクルを持たねばなりません。正しい結果は何か、どのバグを捕まえるべきだったか、です。真実(グラウンドトゥルース)を知って初めて、エージェントの正誤を計算できます。ハーネスは「エージェントが何と言ったか」ではなく「エージェントの結論が真実に一致するか」を測ります。これは実際にバグを見つけるエージェントと、もっともらしい文章を生成するだけのエージェントとの決定的な違いです。",
    ),
    UL(
      ["Agent phi xác định → cần đo lặp lại, không tin 'chạy được lần trước'.", "Mỗi bài eval có ground truth: kết quả đúng + bug cần bắt.", "Harness đo kết luận khớp sự thật, không đo văn bản nghe hay."],
      ["A non-deterministic agent → measure repeatedly, do not trust 'it worked last time'.", "Every eval task has ground truth: the correct result + the bug to catch.", "The harness measures conclusions matching truth, not nice-sounding text."],
      ["非決定論的なエージェント→繰り返し測定し「前回動いた」を信用しない。", "各評価タスクはグラウンドトゥルースを持つ: 正しい結果+捕まえるべきバグ。", "ハーネスは真実に一致する結論を測り、耳心地よい文章は測らない。"],
    ),
    NOTE(
      "Eval harness cho agent cũng là một hệ thống cần kiểm thử: nếu ground truth trong bộ vàng sai, mọi chỉ số đều sai theo. Hãy review golden dataset kỹ như review code sản phẩm.",
      "The agent's eval harness is itself a system that needs testing: if the ground truth in the golden set is wrong, every metric is wrong with it. Review the golden dataset as carefully as you review production code.",
      "エージェントの評価ハーネス自体もテストを要するシステムです。ゴールデンセットのグラウンドトゥルースが誤っていれば、すべての指標もそれに従って誤ります。ゴールデンデータセットを本番コードと同じ厳しさでレビューしましょう。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Golden dataset: bộ bài toán có oracle đã biết",
    en: "2. Golden dataset: tasks with known oracles",
    ja: "2. ゴールデンデータセット: 既知のオラクルを持つタスク群",
  },
  blocks: [
    P(
      "Golden dataset là trái tim của harness. Mỗi mục gồm: mô tả task, seed dữ liệu cố định để tái tạo, oracle kỳ vọng (kết quả đúng), và nhãn về bug — bài này có bug gì đã cấy sẵn, hay là bài 'sạch' để đo false-positive. Bộ vàng phải phủ cả hai phía: bài CÓ bug (đo recall — agent có bắt được không) và bài KHÔNG bug (đo false-positive — agent có bịa bug không). Thiếu vế 'sạch', bạn không bao giờ biết agent có hay la làng.",
      "The golden dataset is the heart of the harness. Each item has: a task description, a fixed data seed for reproducibility, the expected oracle (the correct result), and bug labels — what bug is planted here, or whether it is a 'clean' task for measuring false positives. The golden set must cover both sides: tasks WITH bugs (to measure recall — does the agent catch them) and tasks WITHOUT bugs (to measure false positives — does the agent invent bugs). Without the 'clean' side you never know if the agent cries wolf.",
      "ゴールデンデータセットはハーネスの心臓です。各項目は、タスクの説明、再現用の固定データシード、期待されるオラクル(正しい結果)、バグのラベル——ここに何のバグを仕込んだか、または誤検知測定用の「クリーン」タスクか——を持ちます。ゴールデンセットは両面を網羅せねばなりません。バグ付きタスク(再現率の測定——エージェントが捕まえるか)とバグなしタスク(誤検知の測定——エージェントがバグをでっち上げるか)です。「クリーン」側がなければ、エージェントが狼少年か分かりません。",
    ),
    P(
      "Bug cấy vào bộ vàng nên phản ánh lỗi thật ở domain lớn: sai làm tròn tiền tệ trong ngân hàng, race condition khi hai người đặt cùng ghế, mất idempotency khiến trừ tiền hai lần, rò rỉ dữ liệu cross-tenant trong SaaS. Mỗi bug đi kèm oracle chính xác để chấm. Bộ vàng cũng phải được phiên bản hoá: khi thêm bug mới hay sửa oracle, ta bump version và giữ lịch sử, để so sánh chỉ số qua thời gian là công bằng. Một bộ vàng đông cứng, được review, chính là hợp đồng chất lượng cho agent.",
      "Bugs planted in the golden set should mirror real defects in large domains: currency rounding errors in banking, a race condition when two people book the same seat, lost idempotency that debits twice, cross-tenant data leaks in SaaS. Each bug comes with a precise oracle to score against. The golden set must also be versioned: when you add a new bug or fix an oracle you bump the version and keep history, so comparing metrics over time is fair. A frozen, reviewed golden set is the quality contract for the agent.",
      "ゴールデンセットに仕込むバグは、大規模ドメインの実際の欠陥を反映すべきです。銀行での通貨丸め誤差、二人が同じ座席を予約する競合状態、二重引き落としを招く冪等性の喪失、SaaSでのクロステナントのデータ漏洩などです。各バグには採点用の正確なオラクルが付きます。ゴールデンセットはバージョン管理も必要です。新しいバグの追加やオラクルの修正時にバージョンを上げ履歴を保持し、時系列での指標比較を公平にします。凍結されレビューされたゴールデンセットが、エージェントの品質契約です。",
    ),
    IMG(
      SVG_EVAL_FUNNEL,
      "Golden dataset (task+oracle+seed+nhãn bug) → metrics → regression gate so với baseline.",
      "Golden dataset (task+oracle+seed+bug labels) → metrics → regression gate against a baseline.",
      "ゴールデンデータセット(タスク+オラクル+シード+バグラベル)→メトリクス→ベースラインに対する回帰ゲート。",
    ),
    CODE(
      "typescript",
      `// Một mục golden dataset: có seed, oracle, và nhãn bug (kể cả bài 'sạch').
interface GoldenCase {
  id: string;
  version: number;                 // phiên bản hoá để so công bằng
  task: string;                    // mục tiêu giao cho agent
  seed: number;                    // dữ liệu cố định → tái tạo
  clock: string;                   // freeze thời gian
  oracle: OracleSpec;              // kết quả đúng-sai
  plantedBugs: string[];           // [] = bài SẠCH (đo false-positive)
}
const golden: GoldenCase[] = [
  { id:"bank-round-01", version:3, task:"Chuyển 100.005đ giữa 2 ví",
    seed:42, clock:"2026-07-01T00:00:00Z",
    oracle:{ name:"tong_bao_toan", invariant:"sum(before)==sum(after)" },
    plantedBugs:["lam_tron_sai_0.005"] },
  { id:"bank-clean-01", version:3, task:"Xem lịch sử giao dịch",
    seed:42, clock:"2026-07-01T00:00:00Z",
    oracle:{ name:"hien_thi_dung", invariant:"rows==expected" },
    plantedBugs:[] },                // bài sạch: agent KHÔNG được báo bug
];`,
    ),
    QA(
      "Vì sao golden dataset phải có cả bài 'sạch' (không cấy bug)?",
      "Why must the golden dataset include 'clean' tasks (no planted bug)?",
      "Để đo false-positive rate — tỉ lệ agent bịa ra bug không tồn tại. Nếu bộ vàng chỉ có bài có bug, một agent 'báo bug với mọi thứ' sẽ đạt recall 100% nhưng vô dụng vì làm ngập cảnh báo giả. Bài sạch buộc agent phải im lặng khi không có gì sai, và cho phép tính precision cùng false-positive một cách trung thực.",
      "To measure the false-positive rate — how often the agent invents non-existent bugs. If the golden set only has buggy tasks, an agent that 'reports a bug on everything' hits 100% recall yet is useless because it floods you with false alarms. Clean tasks force the agent to stay silent when nothing is wrong, and let you compute precision and false positives honestly.",
      "誤検知率——エージェントが存在しないバグをでっち上げる頻度——を測るためです。ゴールデンセットにバグ付きタスクしかなければ、「何にでもバグを報告する」エージェントは再現率100%になりますが、偽の警告で溢れさせるため無用です。クリーンタスクは、問題がないときにエージェントを沈黙させ、適合率と誤検知を誠実に計算させます。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Metrics cốt lõi: success, precision/recall, false-positive",
    en: "3. Core metrics: success, precision/recall, false positives",
    ja: "3. 中核メトリクス: 成功率、適合率/再現率、誤検知",
  },
  blocks: [
    P(
      "Bốn chỉ số nền tảng. Task success rate: tỉ lệ bài agent hoàn thành đúng oracle. Precision của bug tìm được: trong các bug agent báo, bao nhiêu phần trăm là thật. Recall: trong các bug thật (đã cấy), agent bắt được bao nhiêu phần trăm. False-positive rate: trên các bài sạch, bao nhiêu lần agent báo bug sai. Precision cao mà recall thấp nghĩa là agent thận trọng nhưng bỏ sót; recall cao mà precision thấp nghĩa là agent bắt nhiều nhưng ồn. Không có một con số duy nhất tốt — phải nhìn cả cụm.",
      "Four foundational metrics. Task success rate: the fraction of tasks the agent completes against the oracle. Precision of found bugs: of the bugs the agent reports, what percentage are real. Recall: of the real (planted) bugs, what percentage the agent catches. False-positive rate: on clean tasks, how often the agent reports a false bug. High precision but low recall means the agent is cautious but misses; high recall but low precision means it catches a lot but is noisy. No single number is good enough — you must read the whole cluster.",
      "四つの基礎メトリクス。タスク成功率: エージェントがオラクルに対して完了したタスクの割合。発見バグの適合率: エージェントが報告したバグのうち本物の割合。再現率: 本物の(仕込んだ)バグのうちエージェントが捕まえた割合。誤検知率: クリーンタスクでエージェントが偽のバグを報告する頻度。適合率が高く再現率が低いと、慎重だが見逃す。再現率が高く適合率が低いと、多く捕まえるが騒がしい。単一の数値では不十分で、群全体を読まねばなりません。",
    ),
    P(
      "Bên cạnh chất lượng phát hiện, đo hiệu quả kinh tế: cost per run (USD/token trung bình mỗi lần chạy) và cost per bug thật tìm được. Một agent recall cao nhưng tốn 5 USD/bug có thể đắt hơn kiểm tay ở nhiều đội. Thêm latency (thời gian mỗi lần chạy) vì nó quyết định agent có nằm được trong pipeline hay không. Cuối cùng, mọi chỉ số phải chạy trên bộ vàng phiên bản cố định, nếu không so sánh giữa hai lần đo là khập khiễng.",
      "Beyond detection quality, measure economics: cost per run (average USD/tokens per run) and cost per real bug found. An agent with high recall but 5 USD per bug may cost more than manual testing for many teams. Add latency (time per run) because it decides whether the agent can live in the pipeline at all. Finally, all metrics must run on a fixed, versioned golden set, otherwise comparing two measurements is meaningless.",
      "検出品質に加え、経済性を測ります。実行あたりコスト(実行ごとの平均USD/トークン)と発見した本物のバグあたりコストです。再現率が高くてもバグあたり5ドルのエージェントは、多くのチームで手動テストより高くつきえます。レイテンシ(実行あたり時間)も加えます。エージェントがパイプラインに入れるかを左右するからです。最後に、すべての指標は固定・バージョン管理されたゴールデンセットで走らせねばならず、さもないと二つの測定の比較は無意味です。",
    ),
    CODE(
      "typescript",
      `// Tính precision/recall/false-positive từ kết quả agent vs ground truth.
interface Score { taskSuccess:number; precision:number; recall:number;
                  falsePositiveRate:number; costPerRun:number; costPerBug:number; }

function scoreRun(cases: GoldenCase[], results: AgentResult[]): Score {
  let tp=0, fp=0, fn=0, ok=0, usd=0;
  for (let i=0;i<cases.length;i++){
    const truth = new Set(cases[i].plantedBugs);
    const found = new Set(results[i].reportedBugs);
    if (results[i].oracleMet === (truth.size===0)) ok++;   // hoàn thành đúng
    for (const b of found) truth.has(b) ? tp++ : fp++;      // đúng vs bịa
    for (const b of truth) if(!found.has(b)) fn++;          // bỏ sót
    usd += results[i].costUsd;
  }
  const cleanFp = results.filter((r,i)=>cases[i].plantedBugs.length===0 && r.reportedBugs.length>0).length;
  return {
    taskSuccess: ok/cases.length,
    precision: tp/(tp+fp || 1),
    recall: tp/(tp+fn || 1),
    falsePositiveRate: cleanFp / cases.filter(c=>c.plantedBugs.length===0).length,
    costPerRun: usd/cases.length,
    costPerBug: usd/(tp || 1),
  };
}`,
    ),
    QA(
      "Precision 95% nhưng recall 40% nói lên điều gì về agent?",
      "What does 95% precision but 40% recall tell you about the agent?",
      "Agent rất thận trọng: gần như mọi bug nó báo đều thật (ít bịa), nhưng nó bỏ sót 60% bug thật. Với vai trò 'kính lúp khám phá', bỏ sót nhiều là vấn đề vì nhiều bug lọt lưới. Cần cải thiện recall (oracle mạnh hơn, khám phá rộng hơn) mà không kéo precision xuống. Không được coi 'precision cao' là đủ tốt khi mục tiêu là tìm bug.",
      "The agent is very cautious: almost every bug it reports is real (little fabrication), but it misses 60% of real bugs. For a 'discovery magnifying glass' role, missing many is a problem because lots of bugs slip through. You need to improve recall (stronger oracles, broader exploration) without dragging precision down. Do not treat 'high precision' as good enough when the goal is to find bugs.",
      "エージェントは非常に慎重です。報告するバグはほぼすべて本物(でっち上げが少ない)ですが、本物のバグの60%を見逃します。「探索の虫眼鏡」の役割では、多くを見逃すのは問題です。多数のバグがすり抜けるからです。適合率を下げずに再現率を改善する(より強いオラクル、より広い探索)必要があります。バグ発見が目的なら「高い適合率」で十分とみなしてはいけません。",
    ),
    TIP(
      "Báo cáo chỉ số dạng bảng theo phiên bản golden: mỗi dòng một lần đo, cột là success/precision/recall/FP/cost. Xu hướng qua thời gian quan trọng hơn con số một lần.",
      "Report metrics as a table keyed by golden version: one row per measurement, columns for success/precision/recall/FP/cost. The trend over time matters more than any single number.",
      "指標はゴールデンのバージョンをキーとした表で報告しましょう。測定ごとに1行、列はsuccess/precision/recall/FP/costです。時系列の傾向は単一の数値より重要です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. Regression gate cho chính agent",
    en: "4. A regression gate for the agent itself",
    ja: "4. エージェント自体のための回帰ゲート",
  },
  blocks: [
    P(
      "Khi bạn đổi prompt, đổi tool, hay nâng model, agent có thể tốt lên ở vài chỗ và tệ đi ở chỗ khác. Regression gate là cổng tự động so kết quả eval mới với một baseline đã lưu và chặn thay đổi nếu chỉ số quan trọng tụt. Quy tắc gate điển hình: recall không được giảm, false-positive không vượt ngưỡng, và cost per run không tăng quá biên. Gate này bảo vệ chính agent — nó là 'test hồi quy' cho một hệ thống mà bạn không thể assert từng dòng như code thường.",
      "When you change the prompt, swap a tool, or upgrade the model, the agent may improve in some places and degrade in others. A regression gate is an automated gate that compares a new eval result against a stored baseline and blocks the change if a key metric drops. A typical gate rule: recall must not fall, false positives must not exceed a threshold, and cost per run must not rise beyond a margin. This gate protects the agent itself — it is the 'regression test' for a system you cannot assert line-by-line like ordinary code.",
      "プロンプトを変え、ツールを差し替え、モデルを更新すると、エージェントは一部で改善し他で劣化しえます。回帰ゲートは、新しい評価結果を保存済みベースラインと比較し、重要な指標が下がれば変更を遮断する自動ゲートです。典型的なゲート規則: 再現率が下がってはならず、誤検知が閾値を超えてはならず、実行あたりコストが余裕を超えて上がってはなりません。このゲートはエージェント自体を守ります。通常のコードのように一行ずつアサートできない系のための「回帰テスト」です。",
    ),
    P(
      "Cẩn trọng: vì agent phi xác định, một chỉ số tụt nhẹ có thể là nhiễu chứ không phải hồi quy thật. Vì thế gate phải dựa trên nhiều lần chạy và biên tin cậy, không phải một lần đo. Ta chạy mỗi bài k lần với seed cố định, lấy trung vị hoặc khoảng tin cậy, rồi mới so baseline. Gate cũng nên phân biệt 'hồi quy cứng' (recall tụt rõ) với 'dao động trong biên' để không chặn merge oan. Chương 5 sẽ đi sâu vào cách chống non-determinism che giấu chính hồi quy này.",
      "Careful: because the agent is non-deterministic, a slight metric drop may be noise rather than a real regression. So the gate must rely on multiple runs and a confidence margin, not a single measurement. Run each task k times with a fixed seed, take the median or a confidence interval, and only then compare to the baseline. The gate should also distinguish a 'hard regression' (a clear recall drop) from 'variation within the margin' so it does not block merges unfairly. Chapter 5 dives into stopping non-determinism from masking this very regression.",
      "注意: エージェントは非決定論的なため、わずかな指標低下は本物の回帰ではなくノイズかもしれません。ですからゲートは単一の測定ではなく複数回の実行と信頼マージンに基づかねばなりません。各タスクを固定シードでk回実行し、中央値または信頼区間を取り、その後でベースラインと比較します。ゲートは「ハードな回帰」(明確な再現率低下)と「マージン内の変動」を区別し、不当にマージを遮断しないようにすべきです。第5章は、非決定性がこの回帰を隠すのを防ぐ方法を掘り下げます。",
    ),
    CODE(
      "typescript",
      `// Regression gate: so metrics mới với baseline, chặn nếu tụt ngoài biên.
interface Baseline { recall:number; falsePositiveRate:number; costPerRun:number; version:number; }

function regressionGate(next: Score, base: Baseline): { pass:boolean; reasons:string[] } {
  const reasons: string[] = [];
  const NOISE = 0.02;                                  // biên chống nhiễu phi xác định
  if (next.recall < base.recall - NOISE)
    reasons.push(\`recall tụt \${(base.recall-next.recall).toFixed(3)}\`);
  if (next.falsePositiveRate > base.falsePositiveRate + NOISE)
    reasons.push("false-positive vượt ngưỡng");
  if (next.costPerRun > base.costPerRun * 1.25)
    reasons.push("cost/run tăng >25%");
  return { pass: reasons.length === 0, reasons };      // fail → chặn merge thay đổi agent
}`,
    ),
    QA(
      "Vì sao regression gate cho agent phải dựa trên nhiều lần chạy, không phải một?",
      "Why must the agent's regression gate rely on multiple runs, not one?",
      "Vì agent phi xác định: một lần đo lẻ có thể trúng dao động may/rủi, khiến gate báo hồi quy giả hoặc bỏ sót hồi quy thật. Chạy mỗi bài k lần với seed cố định rồi lấy trung vị/khoảng tin cậy giúp tách tín hiệu (hồi quy thật) khỏi nhiễu (dao động model). Có biên NOISE để không chặn merge vì một cú giảm 1% ngẫu nhiên.",
      "Because the agent is non-deterministic: a single measurement can catch a lucky or unlucky fluctuation, making the gate report a false regression or miss a real one. Running each task k times with a fixed seed and taking the median or a confidence interval separates signal (a real regression) from noise (model variation). A NOISE margin avoids blocking a merge over a random 1% dip.",
      "エージェントが非決定論的だからです。単一の測定は幸運または不運な変動を捉え、ゲートが偽の回帰を報告したり本物を見逃したりします。各タスクを固定シードでk回実行し中央値や信頼区間を取ることで、信号(本物の回帰)をノイズ(モデルの変動)から分離します。NOISEマージンにより、ランダムな1%の低下でマージを遮断するのを避けます。",
    ),
    WARN(
      "Đừng đặt baseline bằng một lần chạy 'ngày đẹp trời'. Baseline phải là trung vị của nhiều lần trên golden cố định; nếu không, mọi lần đo sau đều bị so với một đỉnh may mắn và gate luôn báo hồi quy.",
      "Do not set the baseline from one lucky 'good day' run. The baseline must be the median of many runs on the fixed golden set; otherwise every later measurement is compared to a lucky peak and the gate always reports a regression.",
      "ベースラインを幸運な「好日」の一回の実行で設定してはいけません。ベースラインは固定ゴールデンセットでの複数実行の中央値でなければなりません。さもないと以降の測定はすべて幸運なピークと比較され、ゲートは常に回帰を報告します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "5. Chống non-determinism che giấu hồi quy",
    en: "5. Stopping non-determinism from masking regressions",
    ja: "5. 非決定性が回帰を隠すのを防ぐ",
  },
  blocks: [
    P(
      "Đây là nguy cơ tinh vi nhất. Vì agent phi xác định, một hồi quy thật (ví dụ prompt mới làm agent bỏ sót một loại bug) có thể bị che vì lần chạy tình cờ vẫn qua. Ngược lại, một thay đổi tốt có thể bị chê oan vì lần đo xui. Giải pháp là kiểm soát và đo dao động một cách chủ động. Bước một: cố định mọi nguồn ngẫu nhiên có thể (seed dữ liệu, clock, temperature=0, thứ tự). Bước hai: với phần không thể cố định (bản chất model), chạy k lần và dùng thống kê thay vì một điểm.",
      "This is the subtlest danger. Because the agent is non-deterministic, a real regression (say a new prompt makes the agent miss a class of bug) can be masked when a run happens to still pass. Conversely, a good change can be unfairly condemned by an unlucky measurement. The solution is to control and measure variation deliberately. Step one: fix every controllable source of randomness (data seed, clock, temperature=0, ordering). Step two: for the part you cannot fix (the model's nature), run k times and use statistics rather than a single point.",
      "これは最も微妙な危険です。エージェントは非決定論的なため、本物の回帰(例えば新しいプロンプトがある種のバグをエージェントに見逃させる)が、たまたま実行が通ることで隠されえます。逆に、良い変更が不運な測定で不当に非難されえます。解決策は変動を意図的に制御・測定することです。第一段階: 制御可能な乱数源をすべて固定する(データシード、クロック、temperature=0、順序)。第二段階: 固定できない部分(モデルの本質)については、k回実行し単一点ではなく統計を使う。",
    ),
    P(
      "Đo flakiness của chính agent: chạy cùng một bài eval n lần với đúng một seed, xem verdict có ổn định không. Nếu một bài cho lúc pass lúc fail dù đầu vào giống hệt, đó là bài flaky và không được dùng để gác cổng cho tới khi ổn định. Với các bài ổn định, dùng trung vị của n lần làm chỉ số. Kỹ thuật mạnh hơn là seeded sampling: ghim seed của model nếu nhà cung cấp hỗ trợ, để cùng input cho cùng output. Khi không ghim được, tăng n và dùng khoảng tin cậy để phân biệt hồi quy thật với nhiễu.",
      "Measure the agent's own flakiness: run the same eval task n times with the exact same seed and see whether the verdict is stable. If a task flips between pass and fail despite identical input, it is a flaky task and must not gate anything until it stabilises. For stable tasks, use the median of n runs as the metric. A stronger technique is seeded sampling: pin the model's seed if the provider supports it, so the same input gives the same output. When you cannot pin it, raise n and use a confidence interval to tell a real regression from noise.",
      "エージェント自身のフレーキーを測ります。同じ評価タスクをまったく同じシードでn回実行し、判定が安定するか見ます。同一入力なのにpassとfailを行き来するタスクはフレーキーであり、安定するまで何もゲートさせてはなりません。安定したタスクでは、n回の中央値を指標に使います。より強力な手法はシード付きサンプリングです。プロバイダが対応すればモデルのシードを固定し、同じ入力が同じ出力を出すようにします。固定できない場合はnを増やし、信頼区間で本物の回帰をノイズから見分けます。",
    ),
    CODE(
      "typescript",
      `// Chạy k lần/seed cố định, đo flakiness, chỉ dùng bài ỔN ĐỊNH để gác cổng.
async function stableRecall(cases: GoldenCase[], k = 7): Promise<{recall:number; flaky:string[]}> {
  const flaky: string[] = [];
  const perCase: number[] = [];
  for (const c of cases) {
    const verdicts: boolean[] = [];
    for (let i=0;i<k;i++){
      const r = await runAgent(newRun(c.task, c.oracle));  // seed cố định trong newRun
      verdicts.push(r.foundBug === (c.plantedBugs.length>0));
    }
    const passes = verdicts.filter(Boolean).length;
    if (passes!==0 && passes!==k) flaky.push(c.id);        // lúc pass lúc fail = flaky
    perCase.push(passes/k);                                 // tỉ lệ đúng, không phải 0/1
  }
  const median = perCase.slice().sort((a,b)=>a-b)[Math.floor(perCase.length/2)];
  return { recall: median, flaky };                         // gate dùng trung vị + loại bài flaky
}`,
    ),
    SCEN(
      "Hồi quy bị che bởi nhiễu",
      "A regression masked by noise",
      "Bạn nâng model. Chạy eval một lần: recall 0.82, gần bằng baseline 0.83 — có vẻ ổn, merge. Ba tuần sau bug lọt lưới hàng loạt. Điều tra: chạy lại eval 20 lần cho thấy model mới thực ra recall trung vị chỉ 0.71, lần đo đầu chỉ tình cờ may. Bài học: một lần đo che giấu hồi quy 12 điểm recall. Nếu gate đã chạy k=20 và so trung vị, nó đã chặn merge ngay từ đầu.",
      "You upgrade the model. One eval run: recall 0.82, close to the 0.83 baseline — looks fine, merge. Three weeks later bugs slip through in droves. Investigation: rerunning the eval 20 times shows the new model actually has a median recall of only 0.71; the first measurement was just lucky. Lesson: a single measurement masked a 12-point recall regression. Had the gate run k=20 and compared medians, it would have blocked the merge from the start.",
      "ノイズに隠された回帰",
      "モデルを更新します。評価を一回実行: 再現率0.82、ベースライン0.83に近く——問題なさそうでマージ。3週間後、バグが大量にすり抜けます。調査: 評価を20回再実行すると新モデルの再現率中央値は実際には0.71しかなく、最初の測定は運が良かっただけでした。教訓: 単一の測定が再現率12点の回帰を隠しました。ゲートがk=20で中央値を比較していれば、最初からマージを遮断していたでしょう。",
    ),
    NOTE(
      "Bài flaky trong bộ eval là nợ kỹ thuật: nó vừa vô dụng để gác cổng vừa làm nhiễu chỉ số. Cô lập, điều tra nguyên nhân (thường là oracle yếu hoặc timing), sửa hoặc loại bỏ.",
      "A flaky eval task is technical debt: it is useless for gating and pollutes the metrics. Isolate it, investigate the cause (usually a weak oracle or timing), then fix or drop it.",
      "評価セット内のフレーキーなタスクは技術的負債です。ゲートには無用で指標を汚染します。隔離し原因(たいてい弱いオラクルまたはタイミング)を調査し、修正するか除外します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Guardrails: hành động cấm và allowlist",
    en: "6. Guardrails: forbidden actions and allowlists",
    ja: "6. ガードレール: 禁止アクションとallowlist",
  },
  blocks: [
    P(
      "Guardrails là lớp bảo vệ độc lập với model, luôn thực thi bất kể agent 'muốn' gì. Nền tảng là allowlist: chỉ các tool trong danh sách được chạy, với tham số kiểu chặt. Song song là danh sách hành động cấm tuyệt đối — chạy shell, DDL, gửi tiền/email thật, thao tác cross-tenant — bị từ chối kể cả khi model khẩn khoản. Nguyên tắc cốt lõi là fail-closed: nếu một action không rõ có an toàn không, mặc định là CHẶN, không phải cho qua. Đây là khác biệt giữa một agent an toàn để chạy tự động và một quả bom hẹn giờ.",
      "Guardrails are a protection layer independent of the model, always enforced no matter what the agent 'wants'. The foundation is an allowlist: only tools on the list may run, with strictly typed parameters. Alongside it is a list of absolutely forbidden actions — running a shell, DDL, sending real money/email, cross-tenant operations — rejected even if the model insists. The core principle is fail-closed: if an action is not clearly safe, the default is to BLOCK, not to allow. This is the difference between an agent safe to run autonomously and a time bomb.",
      "ガードレールはモデルから独立した保護層で、エージェントが何を「望も」うと常に実施されます。基盤はallowlistです。リストにあるツールのみが、厳格に型付けされたパラメータで実行できます。並んで、絶対禁止アクションのリスト——シェル実行、DDL、本物の送金・メール送信、クロステナント操作——があり、モデルが強く求めても拒否されます。中核原則はfail-closedです。あるアクションが明確に安全でなければ、既定は許可ではなく遮断です。これが自律実行して安全なエージェントと時限爆弾との違いです。",
    ),
    P(
      "Guardrails nên nằm ở lớp thực thi tool, không phải trong prompt. Ràng buộc bằng prompt ('đừng xoá dữ liệu nhé') là gợi ý mềm mà model có thể phớt lờ hoặc bị dẫn dụ vượt qua (prompt injection từ nội dung trang). Ràng buộc bằng code ở lớp tool là cứng: dù model sinh action gì, lớp guardrail kiểm và chặn trước khi chạm hệ thống. Mọi lần chặn phải được log đầy đủ để điều tra và để đo — số lần agent cố làm điều bị cấm là một tín hiệu cảnh báo về chất lượng prompt hoặc về tấn công.",
      "Guardrails should live at the tool-execution layer, not in the prompt. A prompt constraint ('please do not delete data') is a soft hint the model can ignore or be lured past (prompt injection from page content). A code constraint at the tool layer is hard: whatever action the model emits, the guardrail checks and blocks it before it touches the system. Every block must be fully logged for investigation and measurement — the number of times the agent tries a forbidden thing is a warning signal about prompt quality or an attack.",
      "ガードレールはプロンプトではなくツール実行層に置くべきです。プロンプトによる制約(「データを削除しないでください」)は、モデルが無視でき、あるいは誘導されて越えられる(ページ内容からのプロンプトインジェクション)ソフトなヒントです。ツール層のコードによる制約は堅牢です。モデルがどんなアクションを出しても、ガードレールがシステムに触れる前に検査し遮断します。すべての遮断は調査と測定のために完全にログ化せねばなりません。エージェントが禁止事項を試みた回数は、プロンプト品質または攻撃に関する警告信号です。",
    ),
    IMG(
      SVG_GUARDRAIL,
      "Bốn lớp guardrail: scope cap → forbidden actions → approval gate → budget/kill-switch, tất cả fail-closed.",
      "Four guardrail layers: scope cap → forbidden actions → approval gate → budget/kill-switch, all fail-closed.",
      "四つのガードレール層: スコープ制限→禁止アクション→承認ゲート→予算/キルスイッチ、すべてfail-closed。",
    ),
    QA(
      "Vì sao guardrail phải ở lớp code chứ không phải trong prompt?",
      "Why must guardrails live in code, not in the prompt?",
      "Vì ràng buộc trong prompt chỉ là gợi ý mềm: model có thể phớt lờ, hiểu sai, hoặc bị prompt injection từ nội dung trang dẫn dụ vượt qua. Guardrail ở lớp thực thi tool là cứng — nó kiểm mọi action so với allowlist/blacklist và chặn trước khi chạm hệ thống thật, bất kể model sinh gì. Fail-closed: nghi ngờ thì chặn. Mọi lần chặn đều log để điều tra và đo.",
      "Because a prompt constraint is only a soft hint: the model can ignore it, misread it, or be lured past it by prompt injection from page content. A guardrail at the tool-execution layer is hard — it checks every action against the allowlist/blacklist and blocks it before it touches the real system, whatever the model emits. Fail-closed: when in doubt, block. Every block is logged for investigation and measurement.",
      "プロンプトの制約はソフトなヒントにすぎないからです。モデルは無視・誤読でき、ページ内容からのプロンプトインジェクションで越えられえます。ツール実行層のガードレールは堅牢で、すべてのアクションをallowlist/ブラックリストと照合し、モデルが何を出そうと本物のシステムに触れる前に遮断します。fail-closed: 疑わしければ遮断。すべての遮断は調査と測定のためにログ化されます。",
    ),
    WARN(
      "Prompt injection là mối đe doạ thật với test agent: nội dung một trang bị lỗi có thể chứa 'lệnh' dụ agent gọi tool nguy hiểm. Guardrail lớp code là phòng tuyến duy nhất đáng tin — đừng bao giờ dựa vào việc model 'ngoan'.",
      "Prompt injection is a real threat to a test agent: the content of a buggy page can contain 'instructions' luring the agent to call a dangerous tool. The code-layer guardrail is the only trustworthy defence — never rely on the model 'behaving'.",
      "プロンプトインジェクションはテストエージェントへの現実的脅威です。バグのあるページの内容が、危険なツールを呼ぶようエージェントを誘う「命令」を含みえます。コード層のガードレールが唯一信頼できる防御線です。モデルが「行儀よく」することに決して頼ってはいけません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Scope cap và approval gate",
    en: "7. Scope caps and approval gates",
    ja: "7. スコープ制限と承認ゲート",
  },
  blocks: [
    P(
      "Scope cap giới hạn phạm vi mà agent được chạm: chỉ môi trường staging, chỉ tenant test, chỉ tập tài khoản dành riêng cho kiểm thử, chỉ khoảng dữ liệu được cấp. Cap này chặn tác hại lan rộng: dù agent lạc lối, nó không thể đọc dữ liệu khách thật hay đụng vào production. Kỹ thuật: gắn mọi request của agent một nhãn (tenant test, môi trường), và một lớp trung gian từ chối mọi thứ ngoài nhãn đó. Scope cap biến 'tin tưởng agent' thành 'agent bị nhốt trong hộp cát' — an toàn hơn nhiều.",
      "A scope cap limits what the agent may touch: only the staging environment, only a test tenant, only accounts reserved for testing, only the allotted data range. This cap contains blast radius: even if the agent goes astray it cannot read real customer data or touch production. Technique: tag every agent request with a label (test tenant, environment) and have a middleware reject anything outside that label. A scope cap turns 'trust the agent' into 'the agent is boxed in a sandbox' — far safer.",
      "スコープ制限はエージェントが触れてよい範囲を限定します。ステージング環境のみ、テストテナントのみ、テスト専用アカウントのみ、割り当てられたデータ範囲のみです。この制限は被害範囲を封じ込めます。エージェントが逸脱しても、本物の顧客データを読んだり本番に触れたりできません。手法: エージェントの各リクエストにラベル(テストテナント、環境)を付け、ミドルウェアがそのラベル外をすべて拒否します。スコープ制限は「エージェントを信頼する」を「エージェントをサンドボックスに閉じ込める」に変え、はるかに安全です。",
    ),
    P(
      "Approval gate dành cho các hành động rủi ro cao nhưng đôi khi cần thiết: xoá một tập dữ liệu test lớn, gọi một API bên thứ ba tốn tiền, hay vượt budget mặc định. Thay vì cấm tuyệt đối hoặc cho phép tự do, gate đưa hành động vào hàng chờ để một người duyệt. Agent không dừng cả pipeline mà đánh dấu 'chờ phê duyệt' và tiếp tục việc khác nếu có thể. Điều quan trọng là gate phải rõ ai duyệt, trong bao lâu, và mặc định là từ chối nếu hết hạn — lại là fail-closed. Kết hợp scope cap (nhốt) với approval gate (kiểm soát ngoại lệ) cho ta cả an toàn lẫn linh hoạt.",
      "An approval gate is for high-risk but sometimes-necessary actions: deleting a large test dataset, calling a paid third-party API, or exceeding the default budget. Rather than an absolute ban or free rein, the gate queues the action for a human to approve. The agent does not halt the whole pipeline but marks it 'awaiting approval' and moves on to other work if possible. Crucially the gate must be clear on who approves, within what time, and default to reject on timeout — fail-closed again. Combining a scope cap (containment) with an approval gate (controlled exceptions) gives both safety and flexibility.",
      "承認ゲートは、高リスクだが時に必要なアクションのためのものです。大きなテストデータセットの削除、有料の第三者API呼び出し、既定予算の超過などです。絶対禁止でも自由でもなく、ゲートはアクションを人の承認待ちキューに入れます。エージェントはパイプライン全体を止めず「承認待ち」と印を付け、可能なら他の作業に移ります。重要なのは、誰が・どの時間内に承認するかを明確にし、タイムアウトで既定拒否すること——再びfail-closedです。スコープ制限(封じ込め)と承認ゲート(制御された例外)の組み合わせが、安全性と柔軟性の両方を与えます。",
    ),
    CODE(
      "typescript",
      `// Scope cap + approval gate: nhốt agent, và đưa hành động rủi ro cho người duyệt.
const RISKY = new Set(["deleteDataset","callPaidApi","raiseBudget"]);

async function enforce(a: Action, ctx: RunCtx): Promise<"run"|"blocked"|"queued"> {
  // 1) scope cap — chỉ staging + tenant test
  if (ctx.env !== "staging") return "blocked";
  if (a.tool==="navigate" && !a.url.includes("tenant="+ctx.testTenant)) return "blocked";
  // 2) approval gate cho hành động rủi ro
  if (RISKY.has(a.tool)) {
    const ok = await approvals.request({ action:a, runId:ctx.runId, ttlMs:15*60_000 });
    return ok === "approved" ? "run" : "queued";   // hết hạn = từ chối (fail-closed)
  }
  return "run";
}`,
    ),
    QA(
      "Scope cap và approval gate khác nhau thế nào, khi nào dùng cái nào?",
      "How do a scope cap and an approval gate differ, and when do you use each?",
      "Scope cap là ranh giới tĩnh: nhốt agent trong staging/tenant test/tài khoản thử — mọi thứ ngoài đó luôn bị chặn, không cần người. Approval gate là kiểm soát động cho hành động rủi ro nhưng đôi khi cần (xoá dữ liệu lớn, gọi API tốn tiền): đưa cho người duyệt theo trường hợp. Dùng scope cap để chặn tác hại lan rộng mặc định; dùng approval gate để cho phép ngoại lệ có kiểm soát mà vẫn fail-closed khi hết hạn.",
      "A scope cap is a static boundary: it boxes the agent into staging/test tenant/test accounts — anything outside is always blocked, no human needed. An approval gate is dynamic control for risky-but-sometimes-needed actions (deleting large data, calling a paid API): it routes to a human per case. Use the scope cap to contain blast radius by default; use the approval gate to permit controlled exceptions while still failing closed on timeout.",
      "スコープ制限は静的な境界です。エージェントをステージング/テストテナント/テストアカウントに閉じ込め、その外は常に遮断され人は不要です。承認ゲートは、高リスクだが時に必要なアクション(大きなデータの削除、有料API呼び出し)への動的制御で、ケースごとに人へ回します。既定で被害範囲を封じ込めるにはスコープ制限を、タイムアウトでfail-closedしつつ制御された例外を許すには承認ゲートを使います。",
    ),
    TIP(
      "Log mỗi lần chạm approval gate kèm ai duyệt và bao lâu. Nếu một loại hành động cứ phải duyệt tay hoài, đó là tín hiệu để hoặc tự động hoá an toàn hơn, hoặc cấm hẳn.",
      "Log every approval-gate hit with who approved and how long it took. If one kind of action keeps needing manual approval, that is a signal to either automate it more safely or forbid it outright.",
      "承認ゲートへの各抵触を、誰が承認しどれだけ掛かったかとともにログ化しましょう。ある種のアクションが手動承認を要し続けるなら、より安全に自動化するか、いっそ禁止する合図です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Budget, kill-switch và fail-closed",
    en: "8. Budget, kill-switch and fail-closed",
    ja: "8. 予算、キルスイッチ、fail-closed",
  },
  blocks: [
    P(
      "Guardrail cuối là kiểm soát tài nguyên. Mỗi lần chạy agent phải có budget ba trục — số bước, chi phí tiền, thời gian — và một kill-switch dừng ngay khi vượt bất kỳ trục nào. Quan trọng: khi kill-switch kích hoạt, kết quả là 'inconclusive', không phải 'pass'. Nhiều sự cố tốn kém đến từ một agent lặp vô hạn hoặc gọi API tính tiền hàng nghìn lần trước khi ai đó nhận ra. Kill-switch phải ở lớp hạ tầng, độc lập với logic agent, để dù agent 'kẹt' thì tài nguyên vẫn được cắt.",
      "The last guardrail is resource control. Every agent run must have a three-axis budget — step count, money cost, time — and a kill-switch that stops the moment any axis is exceeded. Crucially, when the kill-switch fires the result is 'inconclusive', not 'pass'. Many costly incidents come from an agent looping forever or calling a paid API thousands of times before anyone notices. The kill-switch must sit at the infrastructure layer, independent of agent logic, so that even if the agent is 'stuck' the resources are still cut.",
      "最後のガードレールはリソース制御です。エージェントの各実行は三軸予算——ステップ数、金銭コスト、時間——と、いずれかの軸を超えた瞬間に停止するキルスイッチを持たねばなりません。重要なのは、キルスイッチが作動したとき結果は「pass」ではなく「inconclusive」であることです。多くの高コストな事故は、誰かが気づく前にエージェントが無限ループしたり有料APIを何千回も呼んだりすることから生じます。キルスイッチはエージェントのロジックから独立してインフラ層に置き、エージェントが「詰まって」もリソースが確実に断たれるようにせねばなりません。",
    ),
    P(
      "Triết lý xuyên suốt guardrails là fail-closed: khi có nghi ngờ, mặc định là DỪNG, không phải TIẾP TỤC. Điều này ngược với nhiều hệ thống UX ưu tiên 'cứ chạy để mượt'. Với một tác nhân có quyền hành động trên hệ thống, an toàn phải thắng tiện lợi. Fail-closed nghĩa là: guardrail không chắc → chặn; budget hết → dừng và báo; model trả action lạ → từ chối; approval hết hạn → coi như bị từ chối. Mọi lần dừng đều để lại report và trace để con người hiểu và can thiệp. Đây là điều biến một AI test agent từ thí nghiệm rủi ro thành công cụ vận hành được.",
      "The philosophy running through guardrails is fail-closed: when in doubt, the default is to STOP, not to CONTINUE. This is the opposite of many UX systems that prefer 'keep going for smoothness'. For an actor with the power to act on a system, safety must beat convenience. Fail-closed means: guardrail unsure → block; budget exhausted → stop and report; model returns an odd action → reject; approval expired → treat as denied. Every stop leaves a report and a trace so humans can understand and intervene. This is what turns an AI test agent from a risky experiment into an operable tool.",
      "ガードレール全体を貫く哲学はfail-closedです。疑わしいときの既定は継続ではなく停止です。これは「スムーズさのために進み続ける」を好む多くのUXシステムの逆です。システムに作用する権限を持つ主体には、安全が利便性に勝たねばなりません。fail-closedとは、ガードレールが不確か→遮断、予算枯渇→停止して報告、モデルが奇妙なアクションを返す→拒否、承認期限切れ→拒否とみなす、を意味します。すべての停止はレポートとトレースを残し、人が理解し介入できるようにします。これがAIテストエージェントを危険な実験から運用可能な道具に変えるものです。",
    ),
    CODE(
      "typescript",
      `// Kill-switch ở lớp hạ tầng: cắt tài nguyên dù agent 'kẹt'. Fail-closed.
class KillSwitch {
  constructor(private budget: { maxSteps:number; maxUsd:number; maxMs:number }) {}
  private start = Date.now();
  private spent = { steps:0, usd:0 };
  onStep(costUsd: number) { this.spent.steps++; this.spent.usd += costUsd; }
  check(): { alive:boolean; reason?:string } {
    if (this.spent.steps >= this.budget.maxSteps) return { alive:false, reason:"max step" };
    if (this.spent.usd   >= this.budget.maxUsd)   return { alive:false, reason:"hết \\$" };
    if (Date.now()-this.start >= this.budget.maxMs) return { alive:false, reason:"hết giờ" };
    return { alive:true };
  }
  // Khi !alive → verdict = "inconclusive" (KHÔNG phải pass), báo cáo + trace.
}`,
    ),
    QA(
      "Khi kill-switch dừng agent vì hết budget, verdict nên là gì và vì sao?",
      "When the kill-switch stops the agent for running out of budget, what should the verdict be and why?",
      "Verdict phải là 'inconclusive' (không đủ căn cứ), tuyệt đối không phải 'pass'. Hết budget nghĩa là agent chưa kịp kiểm chứng oracle, nên ta không biết đúng hay sai — coi là pass sẽ giấu bug thật. 'Inconclusive' báo cho người biết cần tăng budget, tối ưu agent, hoặc kiểm tay bài này. Đây là biểu hiện của nguyên tắc fail-closed: nghi ngờ thì dừng và báo, không cho qua.",
      "The verdict must be 'inconclusive', absolutely not 'pass'. Running out of budget means the agent never got to verify the oracle, so we do not know pass or fail — calling it pass would hide real bugs. 'Inconclusive' tells a human to raise the budget, optimise the agent, or test this case by hand. This embodies fail-closed: when in doubt, stop and report, do not wave it through.",
      "判定は「inconclusive(根拠不十分)」でなければならず、絶対に「pass」ではありません。予算切れはエージェントがオラクルを検証できなかったことを意味し、正誤が分かりません——passとすれば本物のバグを隠します。「inconclusive」は、予算を増やす・エージェントを最適化する・このケースを手動でテストする、と人に伝えます。これはfail-closedの体現です。疑わしければ停止して報告し、素通りさせません。",
    ),
    NOTE(
      "Kill-switch phải độc lập với agent: đặt nó ở proxy/hạ tầng đo cost thật, không phải trong vòng lặp mà agent có thể bỏ qua. Một agent lỗi không được có khả năng vô hiệu hoá phanh của chính nó.",
      "The kill-switch must be independent of the agent: place it at a proxy/infrastructure layer that meters real cost, not inside a loop the agent could skip. A faulty agent must not be able to disable its own brakes.",
      "キルスイッチはエージェントから独立していなければなりません。エージェントが飛ばせるループ内ではなく、実コストを計測するプロキシ/インフラ層に置きます。欠陥のあるエージェントが自らのブレーキを無効化できてはなりません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "9. Phân loại kết quả agent: TP, FP, FN và bằng chứng",
    en: "9. Triaging agent output: TP, FP, FN and evidence",
    ja: "9. エージェント出力の仕分け: TP、FP、FN、証拠",
  },
  blocks: [
    P(
      "Để tính metrics đúng, mỗi bug agent báo phải được phân loại so với ground truth: true positive (bug thật, agent bắt đúng), false positive (agent bịa, không có bug), false negative (bug thật nhưng agent bỏ sót). Việc phân loại này nên tự động khi có oracle rõ, nhưng biên giới đôi khi mờ: agent báo đúng triệu chứng nhưng sai nguyên nhân thì tính sao? Quy ước rõ ràng từ đầu: khớp theo oracle-id đã cấy, không khớp theo văn mô tả. Nếu agent chỉ ra đúng bất biến bị vi phạm, đó là TP dù lời giải thích chưa hoàn hảo.",
      "To compute metrics correctly, every bug the agent reports must be classified against ground truth: true positive (a real bug caught correctly), false positive (invented, no bug), false negative (a real bug the agent missed). This classification should be automatic when the oracle is clear, but the boundary is sometimes fuzzy: what if the agent reports the right symptom but the wrong cause? Set a clear convention up front: match by the planted oracle-id, not by the prose description. If the agent identifies the correct violated invariant, that is a TP even if the explanation is imperfect.",
      "指標を正しく計算するには、エージェントが報告する各バグをグラウンドトゥルースに対して分類せねばなりません。真陽性(正しく捕まえた本物のバグ)、偽陽性(でっち上げ、バグなし)、偽陰性(見逃した本物のバグ)です。この分類はオラクルが明確なら自動化すべきですが、境界は時に曖昧です。エージェントが正しい症状だが誤った原因を報告したらどうするか。最初に明確な規約を設けます。文章の説明ではなく、仕込んだoracle-idで照合します。エージェントが正しい違反不変条件を特定すれば、説明が不完全でもTPです。",
    ),
    P(
      "Bằng chứng là điều kiện để một báo cáo được tính là TP. Một agent 'đoán trúng' bug mà không có observation chứng minh thì không đáng tin và không nên tính điểm dương — nếu không, ta thưởng cho hallucination may mắn. Vì thế harness kiểm hai điều cho mỗi báo cáo: (1) có khớp oracle-id không, và (2) có bằng chứng grounding trỏ tới observation cụ thể không. Chỉ khi cả hai đúng mới là TP thực. Cách chấm này ép agent phải grounded, đúng tinh thần oracle-first và chống hallucination.",
      "Evidence is the condition for a report to count as a TP. An agent that 'guesses right' about a bug with no observation to prove it is untrustworthy and should not score positive — otherwise you reward lucky hallucination. So the harness checks two things per report: (1) does it match the oracle-id, and (2) is there grounding evidence pointing to a concrete observation. Only when both hold is it a real TP. This scoring forces the agent to be grounded, true to the oracle-first spirit and anti-hallucination.",
      "証拠は、報告がTPとして数えられる条件です。証明する観察なしにバグを「当てずっぽうで正解」するエージェントは信頼できず、陽性の点を与えるべきではありません。さもないと幸運なハルシネーションを報奨することになります。ですからハーネスは報告ごとに二つを確認します。(1) oracle-idに一致するか、(2) 具体的な観察を指すグラウンディング証拠があるか。両方が成り立つときのみ真のTPです。この採点はエージェントにグラウンディングを強制し、オラクル優先の精神とハルシネーション対策に忠実です。",
    ),
    CODE(
      "typescript",
      `// Phân loại TP/FP/FN: khớp oracle-id VÀ có bằng chứng grounding.
type Class = "TP" | "FP" | "FN";
function classify(report: BugReport, planted: Set<string>): Class {
  const matched = planted.has(report.oracleId);         // khớp bug đã cấy
  const grounded = !!report.evidenceRef;                 // có observation chứng minh
  if (matched && grounded) return "TP";                  // thật + có bằng chứng
  if (!matched) return "FP";                             // bịa (kể cả 'đoán trúng' vô căn cứ)
  return "FP";                                           // matched nhưng không grounding = không tin
}
function missed(planted: string[], reports: BugReport[]): string[] {
  const found = new Set(reports.filter(r => r.evidenceRef).map(r => r.oracleId));
  return planted.filter(id => !found.has(id));           // FN: bug thật bị bỏ sót
}`,
    ),
    QA(
      "Agent 'đoán trúng' một bug nhưng không có bằng chứng — tính TP hay FP?",
      "The agent 'guesses' a bug correctly but has no evidence — TP or FP?",
      "Tính FP (hoặc chí ít không tính TP). Một báo cáo trúng nhưng không có observation chứng minh chỉ là hallucination may mắn; thưởng cho nó sẽ khuyến khích agent đoán bừa và làm metrics méo mó. Harness chỉ tính TP khi vừa khớp oracle-id vừa có bằng chứng grounding. Cách chấm này ép agent phải neo kết luận vào quan sát thật, đúng tinh thần oracle-first.",
      "Count it as FP (or at least not a TP). A correct-but-unproven report is just lucky hallucination; rewarding it would encourage the agent to guess and distort the metrics. The harness scores a TP only when it both matches the oracle-id and has grounding evidence. This scoring forces the agent to anchor conclusions to real observations, true to oracle-first.",
      "FP(少なくともTPではない)と数えます。正解だが証明のない報告は幸運なハルシネーションにすぎず、報奨すればエージェントに当てずっぽうを促し指標を歪めます。ハーネスは、oracle-idに一致し、かつグラウンディング証拠があるときのみTPと採点します。この採点はエージェントに結論を実際の観察へ結びつけることを強制し、オラクル優先に忠実です。",
    ),
    TIP(
      "Lưu một 'confusion log' cho mỗi lần eval: danh sách FP và FN kèm trace. Đây là mỏ vàng để cải thiện agent — FP chỉ ra chỗ agent hay bịa, FN chỉ ra loại bug agent hay bỏ sót.",
      "Keep a 'confusion log' for each eval: the list of FPs and FNs with their traces. This is a gold mine for improving the agent — FPs show where it tends to fabricate, FNs show which bug classes it tends to miss.",
      "各評価に「混同ログ」を残しましょう。FPとFNの一覧をトレース付きで。これはエージェント改善の金鉱です。FPはでっち上げやすい箇所を、FNは見逃しやすいバグの種類を示します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Tích hợp harness vào CI một cách an toàn",
    en: "10. Wiring the harness into CI safely",
    ja: "10. ハーネスを安全にCIへ組み込む",
  },
  blocks: [
    P(
      "Có hai vị trí đặt harness trong CI, và đừng nhầm chúng. Vị trí một: chạy eval khi thay đổi CHÍNH AGENT (prompt, tool, model) — đây là regression gate cho agent, chặn merge nếu agent tệ đi. Vị trí hai: agent chạy như một job khám phá trên sản phẩm — job này KHÔNG nên chặn merge cho tới khi đã xác định và có eval tin cậy. Lẫn lộn hai vị trí là chống mẫu phổ biến: đặt một agent phi xác định vào đường chặn merge của sản phẩm khiến build đỏ ngẫu nhiên và đội mất niềm tin.",
      "There are two places to put the harness in CI, and do not confuse them. Place one: run the eval when THE AGENT ITSELF changes (prompt, tool, model) — this is the regression gate for the agent, blocking a merge if the agent got worse. Place two: the agent runs as a discovery job against the product — this job should NOT block merges until it is deterministic and has a trustworthy eval. Confusing the two is a common anti-pattern: putting a non-deterministic agent on the product's merge-blocking path makes builds go red at random and the team loses trust.",
      "CIにハーネスを置く場所は二つあり、混同してはいけません。場所一: エージェント自体(プロンプト、ツール、モデル)が変わったときに評価を走らせる——これはエージェントの回帰ゲートで、エージェントが悪化すればマージを遮断します。場所二: エージェントが製品に対する探索ジョブとして走る——このジョブは、決定論的で信頼できる評価が整うまでマージを遮断すべきではありません。二つの混同はよくあるアンチパターンです。非決定論的なエージェントを製品のマージブロック経路に置くと、ビルドがランダムに赤くなりチームは信頼を失います。",
    ),
    P(
      "Với vị trí một (gate cho agent), pipeline nên: dựng bộ vàng phiên bản cố định, chạy mỗi bài k lần với seed ghim, tính metrics trung vị, so baseline qua regression gate, và xuất report có xu hướng. Chi phí eval cũng phải nằm trong budget — một bộ vàng quá lớn chạy k lần có thể tốn kém, nên chọn tập đại diện và chạy tập đầy đủ theo lịch (nightly) thay vì mỗi commit. Kết quả eval nên được lưu như artifact để so sánh lịch sử; baseline chỉ được cập nhật có chủ đích, qua review, không tự động trôi theo.",
      "For place one (the agent gate), the pipeline should: build a fixed, versioned golden set, run each task k times with a pinned seed, compute median metrics, compare to the baseline via the regression gate, and emit a trend report. Eval cost must also fit a budget — a huge golden set run k times can be expensive, so pick a representative subset and run the full set on a schedule (nightly) rather than every commit. Eval results should be stored as artifacts for historical comparison; the baseline is updated only deliberately, through review, never left to drift automatically.",
      "場所一(エージェントゲート)では、パイプラインは次を行うべきです。固定・バージョン管理されたゴールデンセットを構築し、各タスクを固定シードでk回実行し、中央値の指標を計算し、回帰ゲートでベースラインと比較し、傾向レポートを出力する。評価コストも予算に収めねばなりません。巨大なゴールデンセットをk回走らせると高くつきうるため、代表的なサブセットを選び、全セットはコミットごとではなくスケジュール(夜間)で走らせます。評価結果は履歴比較のためアーティファクトとして保存し、ベースラインはレビューを経て意図的にのみ更新し、自動的に流されるままにしません。",
    ),
    CODE(
      "yaml",
      `# CI: gate cho CHÍNH AGENT khi prompt/tool/model đổi. KHÔNG phải job sản phẩm.
name: agent-eval-gate
on:
  pull_request:
    paths: ["agent/prompt/**", "agent/tools/**", "agent/model.lock"]
jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - name: Chạy eval trên golden (subset), k=7, seed ghim
        run: node eval/run.mjs --golden golden.v3.json --k 7 --seed 42 --out score.json
      - name: Regression gate so baseline (trung vị, có biên nhiễu)
        run: node eval/gate.mjs --score score.json --baseline baseline.v3.json
      - uses: actions/upload-artifact@v4      # lưu để so xu hướng
        with: { name: agent-eval, path: score.json }`,
    ),
    QA(
      "Hai vị trí đặt AI test agent trong CI khác nhau ra sao?",
      "How do the two CI placements of an AI test agent differ?",
      "Vị trí một là gate cho CHÍNH AGENT: chạy eval trên golden khi prompt/tool/model đổi, chặn merge nếu metrics tụt — đây là nơi agent được phép chặn. Vị trí hai là job KHÁM PHÁ chạy trên sản phẩm: nó sinh nháp test và tìm bug nhưng không nên chặn merge cho tới khi đã xác định và có eval tin cậy. Lẫn hai vị trí — đặt agent khám phá phi xác định vào đường chặn merge sản phẩm — khiến build đỏ ngẫu nhiên và mất niềm tin.",
      "Place one is the gate for THE AGENT ITSELF: run the eval on the golden set when the prompt/tool/model changes, block the merge if metrics drop — this is where the agent may block. Place two is a DISCOVERY job running against the product: it drafts tests and finds bugs but should not block merges until it is deterministic with a trustworthy eval. Confusing them — putting the non-deterministic discovery agent on the product's merge-blocking path — makes builds go red at random and destroys trust.",
      "場所一はエージェント自体のゲートです。プロンプト/ツール/モデルが変わったときゴールデンで評価を走らせ、指標が下がればマージを遮断——ここではエージェントが遮断してよいです。場所二は製品に対して走る探索ジョブです。テスト草案を作りバグを見つけますが、決定論的で信頼できる評価が整うまでマージを遮断すべきではありません。両者の混同——非決定論的な探索エージェントを製品のマージブロック経路に置く——はビルドをランダムに赤くし信頼を破壊します。",
    ),
    WARN(
      "Đừng để baseline tự động cập nhật theo lần chạy mới nhất. Nếu baseline tự trôi, một chuỗi hồi quy nhỏ mỗi lần sẽ 'nấu ếch' — agent tệ dần mà gate không bao giờ báo.",
      "Do not let the baseline auto-update to the latest run. If the baseline drifts on its own, a series of small regressions each time 'boils the frog' — the agent degrades steadily while the gate never fires.",
      "ベースラインを最新の実行に自動更新させてはいけません。ベースラインが自ら流れると、毎回の小さな回帰の連なりが「茹でガエル」となり、エージェントが徐々に劣化してもゲートは決して作動しません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Đo cost và tối ưu ngân sách eval",
    en: "11. Measuring cost and optimising the eval budget",
    ja: "11. コストの測定と評価予算の最適化",
  },
  blocks: [
    P(
      "Eval một agent phi xác định với k lần chạy trên một bộ vàng lớn có thể đắt bất ngờ. Vì thế đo và tối ưu cost là một phần của harness, không phải suy nghĩ sau. Ba đòn bẩy: kích thước bộ vàng (chọn tập đại diện thay vì chạy tất cả mỗi lần), số lần lặp k (đủ để tách nhiễu, không thừa), và mô hình (model rẻ hơn cho eval sơ bộ, model mạnh cho gate cuối). Theo dõi cost per eval-run và cost per bug tìm được theo thời gian; nếu chi phí tăng nhanh hơn giá trị, đó là tín hiệu để cắt gọt.",
      "Evaluating a non-deterministic agent with k runs on a large golden set can be surprisingly expensive. So measuring and optimising cost is part of the harness, not an afterthought. Three levers: golden-set size (pick a representative subset instead of running everything each time), the repeat count k (enough to separate noise, no more), and the model (a cheaper model for preliminary evals, a strong one for the final gate). Track cost per eval-run and cost per bug found over time; if cost grows faster than value, that is a signal to trim.",
      "非決定論的なエージェントを大きなゴールデンセットでk回評価すると、驚くほど高くつきえます。ですからコストの測定と最適化はハーネスの一部であり、後回しの考えではありません。三つのレバー: ゴールデンセットのサイズ(毎回すべてを走らせず代表的なサブセットを選ぶ)、繰り返し回数k(ノイズを分離するのに十分、それ以上は不要)、モデル(予備評価には安価なモデル、最終ゲートには強力なモデル)。評価実行あたりコストと発見バグあたりコストを時系列で追い、コストが価値より速く伸びれば削減の合図です。",
    ),
    P(
      "Một chiến lược thực tế là eval nhiều tầng: tầng nhanh (subset nhỏ, k thấp, model rẻ) chạy mỗi PR để bắt hồi quy lớn; tầng đầy đủ (toàn bộ golden, k cao) chạy nightly để bắt trôi tinh vi. Kết hợp với budget cứng cho từng lần eval để một bài kẹt không đốt cả hoá đơn. Quan trọng: đừng tối ưu cost tới mức mất khả năng phát hiện hồi quy — cắt k xuống 1 sẽ rẻ nhưng đưa ta trở lại đúng bẫy non-determinism che giấu hồi quy ở chương 5. Cân bằng cost và tin cậy là quyết định kỹ thuật, phải dựa trên dữ liệu flakiness thật.",
      "A practical strategy is tiered eval: a fast tier (small subset, low k, cheap model) runs on every PR to catch large regressions; a full tier (the whole golden set, high k) runs nightly to catch subtle drift. Combine this with a hard budget per eval so one stuck task does not burn the whole bill. Importantly: do not optimise cost to the point of losing regression-detection power — cutting k to 1 is cheap but returns us to exactly the non-determinism-masks-regression trap from chapter 5. Balancing cost and confidence is an engineering decision that must rest on real flakiness data.",
      "実用的な戦略は階層化評価です。高速層(小さなサブセット、低いk、安価なモデル)は大きな回帰を捕らえるため全PRで走り、完全層(ゴールデン全体、高いk)は微妙なドリフトを捕らえるため夜間に走ります。これを評価ごとの厳格な予算と組み合わせ、一つの詰まったタスクが請求全体を燃やさないようにします。重要なのは、回帰検出力を失うほどコストを最適化しないことです。kを1に削るのは安価ですが、第5章の非決定性が回帰を隠す罠にそのまま戻ります。コストと信頼のバランスは、実際のフレーキーデータに基づくべきエンジニアリング判断です。",
    ),
    CODE(
      "typescript",
      `// Eval nhiều tầng: tầng nhanh mỗi PR, tầng đầy đủ nightly; budget cứng mỗi tầng.
interface Tier { name:string; subset:number; k:number; model:string; maxUsd:number; }
const TIERS: Tier[] = [
  { name:"pr-fast",   subset:20,  k:3,  model:"cheap", maxUsd:2 },   // bắt hồi quy lớn
  { name:"nightly",   subset:200, k:7,  model:"strong", maxUsd:40 }, // bắt trôi tinh vi
];
async function runTier(t: Tier, golden: GoldenCase[]): Promise<Score & {usd:number}> {
  const cases = sampleRepresentative(golden, t.subset);   // tập đại diện, không random
  let usd = 0;
  const results: AgentResult[] = [];
  for (const c of cases) {
    const r = await evalCase(c, { k:t.k, model:t.model });
    usd += r.usd;
    if (usd > t.maxUsd) throw new Error(t.name+": vượt budget eval — dừng");  // fail-closed
    results.push(r);
  }
  return { ...scoreRun(cases, results), usd };
}`,
    ),
    QA(
      "Tối ưu cost bằng cách hạ k về 1 có vấn đề gì?",
      "What is wrong with optimising cost by dropping k to 1?",
      "Hạ k về 1 nghĩa là mỗi bài chỉ chạy một lần, đưa ta trở lại bẫy non-determinism: một lần đo lẻ dễ trúng dao động may/rủi, khiến gate báo hồi quy giả hoặc bỏ sót hồi quy thật (như kịch bản ở chương 5, hồi quy 12 điểm recall bị che). Rẻ nhưng mất khả năng phát hiện hồi quy tin cậy. Cách đúng là eval nhiều tầng: k thấp cho tầng nhanh mỗi PR, k cao cho tầng nightly để chốt.",
      "Dropping k to 1 means each task runs once, returning us to the non-determinism trap: a single measurement easily catches a lucky or unlucky fluctuation, making the gate report a false regression or miss a real one (as in chapter 5, where a 12-point recall regression was masked). Cheap, but it loses reliable regression detection. The right way is tiered eval: low k for the fast per-PR tier, high k for the nightly tier that decides.",
      "kを1に落とすと各タスクが一度しか走らず、非決定性の罠に戻ります。単一の測定は幸運・不運な変動を容易に捉え、ゲートが偽の回帰を報告したり本物を見逃したりします(第5章の、再現率12点の回帰が隠された例のように)。安価ですが信頼できる回帰検出を失います。正しいのは階層化評価です。高速な毎PR層には低いk、決定する夜間層には高いkです。",
    ),
    NOTE(
      "Cost per bug thật là chỉ số quyết định 'agent có đáng nuôi không'. So nó với chi phí kiểm tay tương đương; nếu agent đắt hơn nhiều lần mà không mở rộng phạm vi khám phá, hãy thu hẹp vai trò của nó.",
      "Cost per real bug is the metric that decides 'is the agent worth keeping'. Compare it to the equivalent manual-testing cost; if the agent is several times more expensive without widening exploration coverage, narrow its role.",
      "本物のバグあたりコストは「エージェントを養う価値があるか」を決める指標です。同等の手動テストコストと比較し、探索範囲を広げずに数倍高いなら、その役割を狭めましょう。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Vận hành: giám sát, phiên bản và con người trong vòng lặp",
    en: "12. Operating: monitoring, versioning and human-in-the-loop",
    ja: "12. 運用: 監視、バージョン管理、人間参加",
  },
  blocks: [
    P(
      "Khi harness và guardrails đã dựng, vận hành lâu dài cần ba thứ. Giám sát: theo dõi metrics và cost theo thời gian trên dashboard, cảnh báo khi recall tụt, false-positive tăng, hay cost vọt. Phiên bản hoá: ghim rõ phiên bản model, prompt, tool và golden cho mỗi lần đo, để khi có sự cố ta biết chính xác cái gì đã đổi. Con người trong vòng lặp: mọi bug agent báo và mọi test agent sinh đều qua người xác nhận trước khi thành chân lý — agent đề xuất, người quyết định. Ba thứ này biến agent từ dự án một lần thành năng lực bền vững.",
      "Once the harness and guardrails are built, long-term operation needs three things. Monitoring: track metrics and cost over time on a dashboard, alert when recall drops, false positives rise, or cost spikes. Versioning: pin the exact model, prompt, tool and golden version for every measurement, so when an incident hits you know precisely what changed. Human-in-the-loop: every bug the agent reports and every test it drafts passes human confirmation before becoming truth — the agent proposes, the human decides. These three turn the agent from a one-off project into a durable capability.",
      "ハーネスとガードレールが構築されたら、長期運用には三つが必要です。監視: ダッシュボードで指標とコストを時系列で追い、再現率低下・誤検知増加・コスト急騰時に警告する。バージョン管理: 測定ごとにモデル・プロンプト・ツール・ゴールデンの正確なバージョンを固定し、事故時に何が変わったかを正確に知る。人間参加: エージェントが報告する各バグと草案する各テストは、真実になる前に人の確認を通す——エージェントが提案し人が決める。この三つがエージェントを一回限りのプロジェクトから持続的な能力に変えます。",
    ),
    P(
      "Một điểm vận hành dễ bỏ quên: model của nhà cung cấp có thể đổi âm thầm dưới cùng một tên. Vì thế phải chạy eval định kỳ (nightly) ngay cả khi bạn không đổi gì, để bắt 'trôi ngầm' từ phía model. Nếu recall tụt mà bạn không đổi prompt hay tool, thủ phạm thường là model. Khi đó phiên bản hoá cứu bạn: bạn có baseline cũ để so, có golden cố định để tái tạo, và có trace để điều tra. Đây là lý do harness không phải công cụ dựng một lần mà là hạ tầng sống, chạy đều, được chăm sóc như bất kỳ hệ thống sản xuất nào.",
      "An easily forgotten operational point: the provider's model can change silently under the same name. So you must run the eval periodically (nightly) even when you change nothing, to catch 'silent drift' from the model side. If recall drops while you changed no prompt or tool, the culprit is usually the model. Then versioning saves you: you have the old baseline to compare, a fixed golden set to reproduce, and traces to investigate. This is why the harness is not a build-once tool but living infrastructure, run regularly, cared for like any production system.",
      "見落としやすい運用点: プロバイダのモデルが同じ名前のまま静かに変わりえます。ですから何も変えなくても定期的に(夜間)評価を走らせ、モデル側の「静かなドリフト」を捕らえねばなりません。プロンプトもツールも変えていないのに再現率が下がれば、犯人はたいていモデルです。そのときバージョン管理が救います。比較用の古いベースライン、再現用の固定ゴールデン、調査用のトレースがあります。だからハーネスは一度作る道具ではなく、定期的に走り、あらゆる本番システムと同じように世話される生きたインフラなのです。",
    ),
    CODE(
      "typescript",
      `// Bản ghi eval: ghim mọi phiên bản để điều tra 'trôi ngầm' của model.
interface EvalRecord {
  ts: string;
  modelVersion: string;          // ghim, không chỉ tên chung chung
  promptHash: string;            // hash prompt để phát hiện đổi
  toolSetHash: string;
  goldenVersion: number;
  score: Score;
  baselineDelta: { recall:number; fp:number; cost:number };
  humanReviewed: boolean;        // con người đã chốt các bug báo cáo
}
// Nightly ngay cả khi KHÔNG đổi gì → bắt trôi ngầm từ phía nhà cung cấp model.
function alertIfRegressed(rec: EvalRecord) {
  if (rec.baselineDelta.recall < -0.02)
    notify("recall tụt dù prompt/tool không đổi → nghi model trôi ngầm, mở trace điều tra");
}`,
    ),
    QA(
      "Vì sao nên chạy eval nightly ngay cả khi không thay đổi gì trong agent?",
      "Why run the eval nightly even when nothing in the agent changed?",
      "Vì model của nhà cung cấp có thể đổi âm thầm dưới cùng một tên, làm agent trôi hành vi mà không ai chạm code. Eval định kỳ trên golden cố định phát hiện 'trôi ngầm' này: nếu recall tụt trong khi prompt/tool/golden không đổi, thủ phạm gần như chắc là model. Nhờ phiên bản hoá và trace, bạn xác nhận và phản ứng (ghim model cũ, điều chỉnh prompt) trước khi bug lọt hàng loạt xuống người dùng.",
      "Because the provider's model can change silently under the same name, drifting the agent's behaviour without anyone touching code. A periodic eval on the fixed golden set detects this 'silent drift': if recall drops while prompt/tool/golden are unchanged, the culprit is almost certainly the model. Thanks to versioning and traces you confirm and react (pin the old model, adjust the prompt) before bugs slip en masse to users.",
      "プロバイダのモデルが同じ名前のまま静かに変わり、誰もコードに触れずエージェントの挙動がドリフトしうるからです。固定ゴールデンでの定期評価がこの「静かなドリフト」を検知します。プロンプト/ツール/ゴールデンが不変なのに再現率が下がれば、犯人はほぼ確実にモデルです。バージョン管理とトレースのおかげで、バグが大量にユーザーへすり抜ける前に確認し対応(古いモデルを固定、プロンプトを調整)できます。",
    ),
    SCEN(
      "Model trôi ngầm bị bắt bởi nightly eval",
      "Silent model drift caught by the nightly eval",
      "Thứ Hai, dashboard cảnh báo: recall nightly tụt từ 0.83 xuống 0.74, false-positive tăng nhẹ. Không ai đổi prompt hay tool tuần đó. Mở bản ghi eval: promptHash và toolSetHash y hệt tuần trước, chỉ modelVersion đổi — nhà cung cấp đã cập nhật model dưới cùng một tên. Nhờ golden cố định và baseline phiên bản hoá, đội xác nhận đây là trôi ngầm, ghim lại model cũ và mở ticket điều chỉnh prompt. Không có nightly eval, sự tụt này chỉ lộ ra khi bug đã lọt xuống sản phẩm hàng loạt.",
      "On Monday the dashboard alerts: nightly recall dropped from 0.83 to 0.74, false positives ticked up. Nobody changed the prompt or tools that week. Open the eval record: promptHash and toolSetHash are identical to last week, only modelVersion changed — the provider updated the model under the same name. Thanks to the fixed golden set and versioned baseline, the team confirms silent drift, pins the old model and opens a ticket to adjust the prompt. Without the nightly eval this drop would only have surfaced once bugs had already slipped into production en masse.",
      "夜間評価に捕らえられた静かなモデルドリフト",
      "月曜、ダッシュボードが警告: 夜間の再現率が0.83から0.74に下がり、誤検知がわずかに増加。その週、誰もプロンプトもツールも変えていません。評価記録を開くと、promptHashとtoolSetHashは先週と同一で、modelVersionだけが変わっています——プロバイダが同じ名前のままモデルを更新したのです。固定ゴールデンとバージョン管理されたベースラインのおかげで、チームは静かなドリフトと確認し、古いモデルを固定してプロンプト調整のチケットを開きます。夜間評価がなければ、この低下はバグが大量に本番へすり抜けて初めて表面化したでしょう。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Danh sách kiểm và tổng kết eval + guardrails",
    en: "13. Checklist and recap of eval + guardrails",
    ja: "13. チェックリストと評価+ガードレールのまとめ",
  },
  blocks: [
    P(
      "Gói lại toàn bộ: một AI test agent chỉ đáng đưa vào vận hành khi nó vừa được ĐO (eval harness) vừa được CHẶN (guardrails). Eval harness cho ta con số khách quan để biết agent tốt hay tệ và có hồi quy không, dựa trên golden dataset oracle-first, metrics đầy đủ (success, precision, recall, false-positive, cost), regression gate dựa trên nhiều lần chạy, và kỹ thuật chống non-determinism che giấu hồi quy. Guardrails cho ta an toàn để chạy tự động: scope cap nhốt agent, allowlist và forbidden actions ở lớp code, approval gate cho ngoại lệ, và budget/kill-switch fail-closed.",
      "Wrapping it all up: an AI test agent is only worth operating when it is both MEASURED (an eval harness) and CONSTRAINED (guardrails). The eval harness gives objective numbers to know whether the agent is good or bad and whether it regressed, built on an oracle-first golden dataset, a full metric set (success, precision, recall, false positives, cost), a regression gate based on multiple runs, and techniques to stop non-determinism from masking regressions. Guardrails give the safety to run autonomously: a scope cap that boxes the agent, code-layer allowlists and forbidden actions, an approval gate for exceptions, and a fail-closed budget/kill-switch.",
      "すべてをまとめます。AIテストエージェントは、測定され(評価ハーネス)かつ制約されて(ガードレール)初めて運用する価値があります。評価ハーネスは、エージェントが良いか悪いか、回帰したかを知る客観的な数値を与えます。オラクル優先のゴールデンデータセット、完全な指標群(成功率、適合率、再現率、誤検知、コスト)、複数実行に基づく回帰ゲート、非決定性が回帰を隠すのを防ぐ技術に基づきます。ガードレールは自律実行の安全を与えます。エージェントを閉じ込めるスコープ制限、コード層のallowlistと禁止アクション、例外のための承認ゲート、fail-closedな予算/キルスイッチです。",
    ),
    P(
      "Sợi chỉ đỏ xuyên suốt cả hai bài là oracle-first và fail-closed. Oracle-first: mọi kết luận, mọi metric, mọi test đều neo vào tiêu chí đúng-sai nghiệp vụ có bằng chứng, không phải vào 'trông có vẻ chạy'. Fail-closed: khi nghi ngờ — action lạ, budget cạn, verdict thiếu bằng chứng, hồi quy trong biên mờ — mặc định là dừng và báo cho người, không phải âm thầm cho qua. Một AI test agent xây theo hai nguyên tắc này không phải phép màu, nhưng là một công cụ mở rộng năng lực kiểm thử một cách có kỷ luật, đo được và an toàn.",
      "The red thread through both articles is oracle-first and fail-closed. Oracle-first: every conclusion, every metric, every test anchors to an evidence-backed business pass/fail criterion, not to 'it looks like it works'. Fail-closed: when in doubt — an odd action, an exhausted budget, an evidence-free verdict, a regression within a fuzzy margin — the default is to stop and tell a human, not to wave it silently through. An AI test agent built on these two principles is no magic, but it is a tool that scales testing capacity in a disciplined, measurable and safe way.",
      "両記事を貫く赤い糸はオラクル優先とfail-closedです。オラクル優先: あらゆる結論、あらゆる指標、あらゆるテストは、「動いているように見える」ではなく、証拠に裏打ちされたビジネスの合否基準に結びつきます。fail-closed: 疑わしいとき——奇妙なアクション、枯渇した予算、証拠のない判定、曖昧なマージン内の回帰——の既定は、素通りさせず停止して人に伝えることです。この二原則で構築されたAIテストエージェントは魔法ではありませんが、テスト能力を規律正しく、測定可能で、安全に拡大する道具です。",
    ),
    UL(
      ["Đo: golden oracle-first · success/precision/recall/FP/cost · regression gate đa lần chạy.", "Chặn: scope cap · allowlist ở code · approval gate · budget/kill-switch fail-closed.", "Chống non-determinism: seed ghim · chạy k lần · trung vị/khoảng tin cậy · loại bài flaky.", "Vận hành: nightly bắt trôi ngầm · phiên bản hoá · con người chốt mọi kết luận."],
      ["Measure: oracle-first golden · success/precision/recall/FP/cost · multi-run regression gate.", "Constrain: scope cap · code-layer allowlist · approval gate · fail-closed budget/kill-switch.", "Beat non-determinism: pinned seed · run k times · median/confidence interval · drop flaky tasks.", "Operate: nightly to catch silent drift · versioning · a human confirms every conclusion."],
      ["測定: オラクル優先ゴールデン・success/precision/recall/FP/cost・複数実行の回帰ゲート。", "制約: スコープ制限・コード層allowlist・承認ゲート・fail-closedな予算/キルスイッチ。", "非決定性への対抗: 固定シード・k回実行・中央値/信頼区間・フレーキーなタスクの除外。", "運用: 静かなドリフトを捕らえる夜間実行・バージョン管理・人があらゆる結論を確認。"],
    ),
    CODE(
      "typescript",
      `// Cổng cuối: agent chỉ 'sẵn sàng vận hành' khi ĐO xong VÀ CHẶN đủ.
interface ReadinessCheck {
  hasOracleFirstGolden: boolean;   // golden có oracle + bài sạch
  metricsComplete: boolean;        // success/precision/recall/fp/cost
  gateMultiRun: boolean;           // gate dựa trên k lần, có biên nhiễu
  guardrailsInCode: boolean;       // allowlist/forbidden ở lớp tool, không prompt
  failClosed: boolean;             // budget/kill-switch + approval mặc định từ chối
  humanInLoop: boolean;            // người chốt bug/test agent sinh
}
function isOperable(c: ReadinessCheck): boolean {
  return Object.values(c).every(Boolean);   // thiếu BẤT KỲ điều kiện nào → chưa sẵn sàng
}`,
    ),
    QA(
      "Hai nguyên tắc xuyên suốt để một AI test agent đáng vận hành là gì?",
      "What are the two principles that make an AI test agent worth operating?",
      "Oracle-first và fail-closed. Oracle-first: mọi kết luận/metric/test neo vào tiêu chí đúng-sai nghiệp vụ CÓ BẰNG CHỨNG, không phải 'trông có vẻ chạy' — đây là gốc chống hallucination và là cơ sở đo lường. Fail-closed: khi nghi ngờ (action lạ, hết budget, verdict thiếu bằng chứng, hồi quy trong biên mờ) thì mặc định DỪNG và báo người, không âm thầm cho qua. Thiếu một trong hai, agent hoặc bịa mà không ai biết, hoặc gây hại khi lạc lối.",
      "Oracle-first and fail-closed. Oracle-first: every conclusion/metric/test anchors to an EVIDENCE-BACKED business pass/fail criterion, not to 'it looks like it works' — the root of anti-hallucination and the basis of measurement. Fail-closed: when in doubt (odd action, out of budget, evidence-free verdict, regression within a fuzzy margin) the default is to STOP and tell a human, not to wave it through silently. Miss either one and the agent either fabricates unnoticed or causes harm when it goes astray.",
      "オラクル優先とfail-closedです。オラクル優先: あらゆる結論/指標/テストが、「動いているように見える」ではなく証拠に裏打ちされたビジネスの合否基準に結びつきます——ハルシネーション対策の根であり測定の基礎です。fail-closed: 疑わしいとき(奇妙なアクション、予算切れ、証拠のない判定、曖昧なマージン内の回帰)の既定は停止して人に伝えることで、素通りさせません。どちらかを欠くと、エージェントは気づかれずにでっち上げるか、逸脱時に害を及ぼします。",
    ),
    TIP(
      "Dán ReadinessCheck lên tường đội. Trước khi cho bất kỳ agent nào chạy tự động trên hệ thống thật, mọi ô phải xanh. Một ô đỏ = agent vẫn ở chế độ thí nghiệm, có người kèm.",
      "Pin the ReadinessCheck on the team wall. Before any agent runs autonomously on a real system, every box must be green. One red box = the agent stays in experiment mode, with a human supervising.",
      "ReadinessCheckをチームの壁に貼りましょう。どのエージェントも本物のシステムで自律実行する前に、すべての枠が緑でなければなりません。一つでも赤なら、エージェントは人が付き添う実験モードのままです。",
    ),
  ],
});

export const AIAGENT_04 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-ai-test-agent-architecture",
    cover: coverA,
    tags: tags("nangcao", "saas", "aitesting", "advanced", "realworld", "experience"),
    title: {
      vi: "Kiến trúc AI test agent: vòng lặp Planner–Executor–Critic, ReAct và replay xác định",
      en: "Architecture of an AI test agent: planner–executor–critic loop, ReAct and deterministic replay",
      ja: "AIテストエージェントのアーキテクチャ: プランナー・実行・批評ループ、ReAct、決定論的リプレイ",
    },
    summary: {
      vi: "Mổ xẻ kiến trúc một AI test agent thật: vòng phản tư planner/executor/critic, mẫu ReAct, memory/state, không gian hành động bị chặn, điều kiện dừng, budget chi phí/thời gian, replay xác định và quan sát quyết định của agent.",
      en: "A deep look at a real AI test agent: the planner/executor/critic reflection loop, the ReAct pattern, memory/state, a bounded action space, termination conditions, cost/time budgets, deterministic replay and observability of agent decisions.",
      ja: "実際のAIテストエージェントを詳細に解説します。プランナー・実行・批評の反省ループ、ReActパターン、メモリと状態、制限された行動空間、終了条件、コスト・時間予算、決定論的リプレイ、エージェントの意思決定の可観測性を扱います。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-eval-harness-ai-agent",
    cover: coverB,
    tags: tags("nangcao", "saas", "aitesting", "advanced", "experience", "tip"),
    title: {
      vi: "Xây eval harness và guardrails cho AI test agent: đo lường, golden dataset và cổng hồi quy",
      en: "Building an eval harness and guardrails for an AI test agent: metrics, golden datasets and regression gates",
      ja: "AIテストエージェント向けの評価ハーネスとガードレール構築: メトリクス、ゴールデンデータセット、回帰ゲート",
    },
    summary: {
      vi: "Cách đo và bảo vệ một AI test agent: task success rate, precision/recall của bug tìm được, tỉ lệ false-positive, cost mỗi run, golden dataset, cổng hồi quy cho chính agent, guardrails (hành động cấm, giới hạn scope, cổng phê duyệt) và cách chống non-determinism che giấu hồi quy.",
      en: "How to measure and protect an AI test agent: task success rate, precision/recall of found bugs, false-positive rate, cost per run, golden datasets, a regression gate for the agent itself, guardrails (forbidden actions, scope caps, approval gates) and how to stop non-determinism from masking regressions.",
      ja: "AIテストエージェントを測定し保護する方法を解説します。タスク成功率、発見したバグの適合率・再現率、誤検知率、実行ごとのコスト、ゴールデンデータセット、エージェント自体の回帰ゲート、ガードレール(禁止アクション、スコープ制限、承認ゲート)、そして非決定性が回帰を隠すのを防ぐ方法を扱います。",
    },
    pages: buildDoc(pagesB),
  },
];
