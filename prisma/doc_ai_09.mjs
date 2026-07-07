// ============================================================================
// AI_DOCS_09 — 2 bài "AI trong kiểm thử" (2026).
// A: AI QA STRATEGY & METRICS — góc phỏng vấn (kind=phongvan).
// B: AI trong CI/CD — agent tự sinh & tự chữa test trong pipeline (kind=tichhop).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "ai09a", domain: "saas", kind: "phongvan", label: "AI QA STRATEGY" });
const coverB = makeThumb({ id: "ai09b", domain: "saas", kind: "tichhop", label: "AI IN CI/CD" });

// ---------------------------------------------------------------------------
// SVG helpers — pipeline diagrams (hand-drawn)
// ---------------------------------------------------------------------------
const SVG_PYRAMID = `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="340" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">AI đứng ở đâu trên kim tự tháp kiểm thử</text>
<polygon points="320,54 250,120 390,120" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="320" y="98" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">E2E</text>
<polygon points="250,120 200,196 440,196 390,120" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="320" y="164" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">Integration / API</text>
<polygon points="200,196 150,272 490,272 440,196" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="240" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Unit</text>
<rect x="500" y="70" width="128" height="52" rx="8" fill="#052e16" stroke="#34d399" stroke-width="1.5"/>
<text x="564" y="90" text-anchor="middle" font-size="9.5" fill="#6ee7b7">AI: nháp E2E, self-heal</text>
<text x="564" y="106" text-anchor="middle" font-size="9.5" fill="#6ee7b7">exploratory, triage</text>
<rect x="500" y="150" width="128" height="52" rx="8" fill="#3f2d0a" stroke="#f59e0b" stroke-width="1.5"/>
<text x="564" y="170" text-anchor="middle" font-size="9.5" fill="#fbbf24">AI: sinh case biên</text>
<text x="564" y="186" text-anchor="middle" font-size="9.5" fill="#fbbf24">gợi ý oracle</text>
<rect x="12" y="150" width="128" height="52" rx="8" fill="#111827" stroke="#64748b" stroke-width="1.5"/>
<text x="76" y="170" text-anchor="middle" font-size="9.5" fill="#cbd5e1">Người: oracle, rủi ro</text>
<text x="76" y="186" text-anchor="middle" font-size="9.5" fill="#cbd5e1">duyệt PR, chiến lược</text>
<text x="320" y="300" text-anchor="middle" font-size="11" fill="#94a3b8">AI rẻ ở đáy (unit gợi ý) và mạnh ở đỉnh (E2E giòn) — giá trị người tăng dần theo rủi ro</text>
<text x="320" y="322" text-anchor="middle" font-size="10.5" fill="#64748b">Chiến lược = phân bổ token/công sức AI theo rủi ro nghiệp vụ, không rải đều</text>
</svg>`;

const SVG_METRICS = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="320" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bảng chỉ số QA có AI: chất lượng · độ tin · chi phí</text>
<rect x="24" y="54" width="186" height="80" rx="10" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="117" y="78" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">CHẤT LƯỢNG</text>
<text x="117" y="100" text-anchor="middle" font-size="10" fill="#d1fae5">coverage luồng · escape rate</text>
<text x="117" y="118" text-anchor="middle" font-size="10" fill="#d1fae5">defect density · eval score</text>
<rect x="227" y="54" width="186" height="80" rx="10" fill="#3f2d0a" stroke="#f59e0b" stroke-width="2"/>
<text x="320" y="78" text-anchor="middle" font-size="12" font-weight="800" fill="#fbbf24">ĐỘ TIN</text>
<text x="320" y="100" text-anchor="middle" font-size="10" fill="#fde68a">flaky rate · heal rate</text>
<text x="320" y="118" text-anchor="middle" font-size="10" fill="#fde68a">false-heal · MTTR test</text>
<rect x="430" y="54" width="186" height="80" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="523" y="78" text-anchor="middle" font-size="12" font-weight="800" fill="#7dd3fc">CHI PHÍ</text>
<text x="523" y="100" text-anchor="middle" font-size="10" fill="#bae6fd">token/run · latency p95</text>
<text x="523" y="118" text-anchor="middle" font-size="10" fill="#bae6fd">$/bug ngăn được</text>
<rect x="24" y="164" width="592" height="130" rx="10" fill="#111827" stroke="#334155"/>
<text x="320" y="188" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Escape rate = bug lọt production / tổng bug — chỉ số Bắc Đẩu của QA</text>
<text x="320" y="212" text-anchor="middle" font-size="11" fill="#94a3b8">Heal rate cao mà false-heal cao = agent đang che bug bằng cách nới oracle</text>
<text x="320" y="234" text-anchor="middle" font-size="11" fill="#94a3b8">Flaky rate là thuế: mỗi 1% flaky bào mòn niềm tin vào toàn bộ đèn đỏ</text>
<text x="320" y="258" text-anchor="middle" font-size="11" fill="#94a3b8">$/bug-ngăn-được biến QA từ trung tâm chi phí thành khoản đầu tư đo được</text>
<text x="320" y="280" text-anchor="middle" font-size="10.5" fill="#64748b">Không có chỉ số đơn lẻ nào đủ — đọc chúng THÀNH BỘ, cân bằng lẫn nhau</text>
</svg>`;

const SVG_CICD = `<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="340" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Pipeline AI: generate → run → heal → gate</text>
<rect x="24" y="60" width="130" height="76" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="89" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">GENERATE</text>
<text x="89" y="110" text-anchor="middle" font-size="9.5" fill="#7dd3fc">agent sinh nháp</text>
<text x="89" y="124" text-anchor="middle" font-size="9.5" fill="#7dd3fc">verify locator</text>
<rect x="184" y="60" width="130" height="76" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="249" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">RUN</text>
<text x="249" y="110" text-anchor="middle" font-size="9.5" fill="#5eead4">shard // parallel</text>
<text x="249" y="124" text-anchor="middle" font-size="9.5" fill="#5eead4">trace + video</text>
<rect x="344" y="60" width="130" height="76" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="409" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">HEAL</text>
<text x="409" y="110" text-anchor="middle" font-size="9.5" fill="#a5b4fc">sửa locator lỗi</text>
<text x="409" y="124" text-anchor="middle" font-size="9.5" fill="#a5b4fc">mở PR, không merge</text>
<rect x="504" y="60" width="130" height="76" rx="10" fill="#3f0d0d" stroke="#f87171" stroke-width="2"/>
<text x="569" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#fecaca">GATE</text>
<text x="569" y="110" text-anchor="middle" font-size="9.5" fill="#fca5a5">người duyệt</text>
<text x="569" y="124" text-anchor="middle" font-size="9.5" fill="#fca5a5">chặn auto-merge</text>
<defs><marker id="c1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#c1)"><path d="M154 98 h30"/><path d="M314 98 h30"/><path d="M474 98 h30"/></g>
<path d="M409 140 v26 h-320 v-30" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#c1)"/>
<text x="250" y="182" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fbbf24">vòng heal: fail → trace → fix nháp → chạy lại (có ngân sách retry)</text>
<rect x="24" y="204" width="610" height="118" rx="9" fill="#111827" stroke="#334155"/>
<text x="330" y="228" text-anchor="middle" font-size="11.5" font-weight="700" fill="#cbd5e1">Guardrail: agent chạy trong runner quyền thấp, token ephemeral, whitelist domain</text>
<text x="330" y="250" text-anchor="middle" font-size="11" fill="#94a3b8">Mọi thay đổi test đi qua PR có CODEOWNERS — agent KHÔNG push thẳng nhánh chính</text>
<text x="330" y="272" text-anchor="middle" font-size="11" fill="#94a3b8">Chi phí: cap token/run, cache, chỉ heal khi flaky-confirmed, timeout cứng</text>
<text x="330" y="294" text-anchor="middle" font-size="11" fill="#94a3b8">Non-determinism: quarantine trước gate, retry có trần, không để heal che bug thật</text>
<text x="330" y="314" text-anchor="middle" font-size="10.5" fill="#64748b">Rollback: revert PR heal như mọi PR; giữ trace 7–30 ngày để audit</text>
</svg>`;

const SVG_GUARD_CICD = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Guardrails khi cho agent quyền vào repo &amp; browser</text>
<rect x="40" y="56" width="250" height="206" rx="12" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="165" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#6ee7b7">CHO PHÉP (phạm vi hẹp)</text>
<g font-size="10.5" fill="#d1fae5"><text x="58" y="110">✓ đọc repo, tạo nhánh ai/*</text>
<text x="58" y="134">✓ mở PR có nhãn needs-review</text>
<text x="58" y="158">✓ chạy test trên staging</text>
<text x="58" y="182">✓ đọc trace/console/network</text>
<text x="58" y="206">✓ đề xuất diff heal locator</text>
<text x="58" y="230">✓ token ephemeral, hết hạn ngắn</text></g>
<rect x="350" y="56" width="250" height="206" rx="12" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="475" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#fca5a5">CẤM (tuyệt đối)</text>
<g font-size="10.5" fill="#fee2e2"><text x="368" y="110">✗ merge thẳng nhánh main</text>
<text x="368" y="134">✗ chạm production / secret thật</text>
<text x="368" y="158">✗ nới oracle để làm xanh</text>
<text x="368" y="182">✗ xoá test, disable gate</text>
<text x="368" y="206">✗ tải/chạy script ngoài whitelist</text>
<text x="368" y="230">✗ vòng lặp vô hạn (không cap token)</text></g>
<text x="320" y="284" text-anchor="middle" font-size="10.5" fill="#64748b">Nguyên tắc: quyền cơ học rộng · quyền phán đoán &amp; merge = con người</text>
</svg>`;

// ===========================================================================
// ARTICLE A — AI QA STRATEGY & METRICS (phỏng vấn)
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh phỏng vấn: từ 'biết công cụ AI' đến 'có chiến lược AI'",
      en: "1. Interview context: from 'knowing AI tools' to 'having an AI strategy'",
      ja: "1. 面接の背景: 「AIツールを知る」から「AI戦略を持つ」へ",
    },
    blocks: [
      P(
        "Năm 2026, gần như ứng viên QA nào cũng nói được vài câu về agent sinh test hay self-heal. Điều khiến nhà tuyển dụng cấp senior chú ý không còn là bạn biết công cụ nào, mà là bạn có một chiến lược mạch lạc: AI nên đặt ở đâu, ở đâu tuyệt đối giữ con người, đo bằng chỉ số gì, và làm sao thuyết phục lãnh đạo bằng con số. Một buổi phỏng vấn chiến lược thường không hỏi 'viết một test' mà hỏi 'công ty tôi có ba nghìn test, 8% flaky, đội tám người, ngân sách token có hạn — anh phân bổ AI thế nào'. Đó là câu hỏi tư duy, không phải câu hỏi cú pháp.",
        "By 2026 almost every QA candidate can say a few sentences about test-generating agents or self-healing. What senior interviewers notice is no longer which tool you know, but whether you have a coherent strategy: where AI belongs, where humans stay non-negotiable, what metrics you measure, and how you convince leadership with numbers. A strategy interview rarely asks 'write a test'; it asks 'my company has three thousand tests, 8% flaky, an eight-person team, a limited token budget — how do you allocate AI'. That is a thinking question, not a syntax question.",
        "2026年、ほぼどのQA候補者もテスト生成エージェントや自己修復について数言は語れます。シニアの面接官が注目するのは、もはやどのツールを知っているかではなく、一貫した戦略を持つかどうかです。AIをどこに置き、どこは人間を絶対に残し、どの指標で測り、どう数字で経営を説得するか。戦略面接は「テストを書け」とはまず問わず、「我が社にはテストが三千件、フレーキー8%、八人のチーム、限られたトークン予算——AIをどう配分するか」と問います。これは構文の問いではなく思考の問いです。"
      ),
      P(
        "Bài này viết cho góc phỏng vấn chuyên sâu: mỗi chương gắn với một câu hỏi lớn mà người phỏng vấn thật sự hỏi, kèm câu trả lời mẫu và phần 'người phỏng vấn tìm gì'. Xuyên suốt, ta bám một hệ chỉ số: độ phủ luồng (coverage), tỉ lệ lọt lỗi (escape rate), tỉ lệ flaky, tỉ lệ tự chữa (heal rate), điểm đánh giá (eval score), chi phí và độ trễ. Mục tiêu không phải học thuộc định nghĩa mà là biết đọc chúng thành bộ, cân bằng lẫn nhau, và ra quyết định phân bổ nguồn lực AI theo rủi ro nghiệp vụ.",
        "This article is written for the deep interview angle: each chapter maps to a big question interviewers actually ask, with a model answer and a 'what interviewers look for' section. Throughout, we anchor to a metric system: flow coverage, escape rate, flaky rate, heal rate, eval score, cost, and latency. The goal is not to memorize definitions but to read them as a set, balance them against each other, and make AI resource-allocation decisions by business risk.",
        "本記事は深い面接の観点で書かれています。各章は面接官が実際に問う大きな質問に対応し、模範解答と「面接官が見るポイント」を添えます。全体を通じて指標体系に接地します。フローのカバレッジ、エスケープ率、フレーキー率、修復率(ヒールレート)、評価スコア、コスト、レイテンシです。目的は定義の暗記ではなく、それらを一つのセットとして読み、互いに均衡させ、業務リスクに応じてAIリソース配分を決めることです。"
      ),
      IMG(
        SVG_PYRAMID,
        "AI đứng ở đâu trên kim tự tháp kiểm thử — giá trị người tăng dần theo rủi ro.",
        "Where AI sits on the test pyramid — human value grows with risk.",
        "テストピラミッド上でAIが立つ位置——人間の価値はリスクとともに増す。"
      ),
      P(
        "Một điểm nữa cần nhớ trước khi bước vào phòng phỏng vấn: người phỏng vấn cấp cao thường không tìm một đáp án hoàn hảo mà tìm cách bạn tư duy dưới ràng buộc. Họ sẽ cố tình thêm ràng buộc — ngân sách bị cắt, đội mất người, deadline dồn — để xem bạn giữ nguyên tắc hay hoảng loạn thay đổi lập trường. Ứng viên senior giữ vững trục chính (đo bằng escape rate, giữ con người ở điểm phán đoán) nhưng linh hoạt điều chỉnh chiến thuật theo ràng buộc mới. Bài này sẽ liên tục minh hoạ cách nêu giả định rõ ràng, chọn một chỉ số làm điểm neo, rồi lập luận đánh đổi một cách bình tĩnh và có cấu trúc, thay vì đọc thuộc một danh sách công cụ thời thượng.",
        "One more thing to remember before you walk into the interview room: senior interviewers usually aren't looking for a perfect answer but for how you think under constraints. They will deliberately add constraints — the budget is cut, the team loses people, deadlines pile up — to see whether you hold your principles or panic and switch positions. A senior candidate keeps the main axis steady (measure by escape rate, keep humans at judgment points) but flexibly adjusts tactics to the new constraint. This article repeatedly illustrates how to state assumptions clearly, pick one metric as your anchor, then reason about trade-offs calmly and structurally, rather than reciting a list of trendy tools.",
        "面接室に入る前にもう一つ覚えておくこと: シニアの面接官は通常、完璧な答えではなく制約下でどう考えるかを探します。彼らは意図的に制約を追加します——予算削減、チームの人員減、締切の集中——あなたが原則を保つか、慌てて立場を変えるか見るためです。シニア候補者は主軸(エスケープ率で測る、判断点に人間を置く)を安定させつつ、新しい制約に戦術を柔軟に調整します。本記事は繰り返し示します。前提を明確に述べ、一つの指標を錨として選び、流行のツールの一覧を暗唱するのではなく、落ち着いて構造的にトレードオフを論じる方法を。"
      ),
      NOTE(
        "Câu hỏi chiến lược hiếm khi có một đáp án đúng. Người phỏng vấn chấm cách bạn lập luận đánh đổi, nêu giả định, và nối quyết định kỹ thuật với giá trị kinh doanh.",
        "Strategy questions rarely have one right answer. Interviewers grade how you reason about trade-offs, state assumptions, and connect technical decisions to business value.",
        "戦略の質問に唯一の正解はまずありません。面接官はトレードオフの論じ方、前提の明示、技術判断と事業価値の結び付けを評価します。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Câu hỏi 1 — AI hợp với tầng nào của kim tự tháp kiểm thử?",
      en: "2. Question 1 — which layer of the test pyramid does AI fit?",
      ja: "2. 質問1 — AIはテストピラミッドのどの層に合うか?",
    },
    blocks: [
      P(
        "Đây là câu mở màn kinh điển. Câu trả lời mẫu bắt đầu bằng nguyên tắc: AI hữu ích nhất ở nơi công việc mang tính cơ học lặp lại và grounding được vào ứng dụng thật, còn con người giữ vai trò ở nơi cần phán đoán nghiệp vụ. Ở tầng unit, AI sinh nhanh nhiều case biên và gợi ý bảng dữ liệu, nhưng chi phí trên mỗi test rất thấp nên đừng phung phí token. Ở tầng integration/API, AI giỏi dựng hợp đồng và sinh biến thể payload. Ở tầng E2E, nơi test giòn nhất và tốn công bảo trì nhất, AI tạo giá trị lớn nhất qua sinh nháp và self-heal locator.",
        "This is the classic opener. The model answer starts with a principle: AI is most useful where work is mechanically repetitive and can be grounded in the real app, while humans stay where business judgment is required. At the unit layer AI quickly generates many edge cases and suggests data tables, but per-test cost is tiny so don't waste tokens. At the integration/API layer AI is good at building contracts and generating payload variants. At the E2E layer — the flakiest and most maintenance-heavy — AI delivers the most value through draft generation and locator self-healing.",
        "これは定番の切り出しです。模範解答は原則から始めます。AIは作業が機械的で反復的、かつ実アプリに接地できる所で最も有用であり、人間は業務判断が要る所に残ります。ユニット層ではAIが境界ケースを素早く大量に生成しデータ表を提案しますが、テスト当たりのコストは小さいのでトークンを浪費しないこと。統合/API層ではAIは契約構築やペイロード変種の生成が得意です。E2E層——最もフレーキーで保守負担が重い——ではAIは下書き生成とロケーターの自己修復で最大の価値を生みます。"
      ),
      UL(
        [
          "Unit: AI gợi ý case biên & bảng dữ liệu — rẻ, nhưng oracle vẫn do người chốt.",
          "Integration/API: AI dựng contract, sinh biến thể payload, kiểm schema.",
          "E2E: AI mạnh nhất — nháp luồng, verify locator, self-heal khi UI đổi.",
          "Exploratory: AI lái browser để dò bug, sau đó ĐÓNG BĂNG thành spec tất định.",
        ],
        [
          "Unit: AI suggests edge cases & data tables — cheap, but humans still fix the oracle.",
          "Integration/API: AI builds contracts, generates payload variants, checks schema.",
          "E2E: AI is strongest — drafts flows, verifies locators, self-heals when the UI changes.",
          "Exploratory: AI drives the browser to find bugs, then FREEZE findings into deterministic specs.",
        ],
        [
          "ユニット: AIが境界ケースとデータ表を提案——安価だがオラクルは人が確定。",
          "統合/API: AIが契約を構築し、ペイロード変種を生成し、スキーマを検査。",
          "E2E: AIが最強——フローを下書きし、ロケーターを検証し、UI変更時に自己修復。",
          "探索的: AIがブラウザを操作してバグを発見し、その後決定論的specに凍結する。",
        ]
      ),
      QA(
        "Nếu chỉ được dùng AI ở một tầng, anh chọn tầng nào và vì sao?",
        "If you could only use AI at one layer, which do you pick and why?",
        "Tôi chọn E2E. Đó là nơi test giòn nhất, bảo trì locator ngốn nhiều giờ nhất, và độ phủ luôn tụt sau tốc độ tính năng. Self-heal locator và sinh nháp luồng ở đây cắt được chi phí bảo trì lớn nhất, giải phóng người cho oracle và phân tích rủi ro (回帰 — regression). Unit đã rẻ và ổn định nên lợi ích biên của AI thấp hơn. Nhưng tôi nói rõ giả định: đây là tối ưu theo chi phí-lợi ích, không phải luật cứng.",
        "I pick E2E. It is the flakiest layer, locator maintenance eats the most hours, and coverage always lags feature velocity. Locator self-heal and flow drafting cut the biggest maintenance cost here, freeing people for oracles and risk analysis (regression). Unit tests are already cheap and stable so AI's marginal benefit is lower. But I state the assumption clearly: this optimizes cost-benefit, it is not a hard rule.",
        "私はE2Eを選びます。最もフレーキーな層で、ロケーター保守が最も時間を食い、カバレッジは常に機能速度に遅れます。ここでのロケーター自己修復とフロー下書きは最大の保守コストを削り、人をオラクルとリスク分析(回帰)へ解放します。ユニットは既に安価で安定しAIの限界便益は低いです。ただ前提は明示します。これは費用対効果の最適化であり、絶対の規則ではありません。"
      ),
      TIP(
        "Khi trả lời, luôn nêu giả định trước ('giả sử đội thiếu người, UI đổi nhanh…'). Người phỏng vấn thích ứng viên biết điều kiện biên hơn ứng viên nói chắc như đinh.",
        "When answering, always state assumptions first ('assuming the team is short-staffed, the UI changes fast…'). Interviewers prefer candidates who name boundary conditions over those who sound absolutely certain.",
        "答える際は必ず前提を先に述べます(「チームが人手不足でUIが速く変わると仮定して…」)。面接官は断定する候補者より境界条件を挙げられる候補者を好みます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Câu hỏi 2 — cái gì tự động hoá bằng AI, cái gì GIỮ con người?",
      en: "3. Question 2 — what do you automate with AI, and what stays human?",
      ja: "3. 質問2 — 何をAIで自動化し、何を人間に残すか?",
    },
    blocks: [
      P(
        "Ranh giới đúng không phải 'AI làm mọi thứ' hay 'AI chỉ làm việc vặt', mà là chia theo bản chất công việc. Việc cơ học, lặp lại, verify được — như dựng khung test, sinh biến thể dữ liệu, sửa locator lỗi thời, phân loại log lỗi — hợp với AI. Việc cần phán đoán giá trị — thiết kế oracle, quyết định rủi ro nào chấp nhận được, đánh giá một 'lỗi' có thật là lỗi hay đúng yêu cầu, và quyết định merge — phải giữ ở con người. Nguyên tắc gọn: quyền cơ học của AI có thể rộng, nhưng quyền phán đoán và quyền merge thì hẹp và thuộc về người.",
        "The right boundary isn't 'AI does everything' or 'AI only does chores', it's a split by the nature of the work. Mechanical, repetitive, verifiable work — scaffolding tests, generating data variants, fixing stale locators, triaging error logs — fits AI. Work that requires value judgment — designing oracles, deciding which risks are acceptable, judging whether a 'bug' is real or correct behavior, and deciding to merge — must stay human. The crisp principle: AI's mechanical authority can be broad, but judgment authority and merge authority are narrow and belong to people.",
        "正しい境界は「AIが全部やる」でも「AIは雑用だけ」でもなく、作業の性質による分割です。機械的で反復的で検証可能な作業——テストの骨組み作り、データ変種の生成、古いロケーターの修正、エラーログの振り分け——はAIに合います。価値判断を要する作業——オラクル設計、どのリスクを許容するかの決定、「バグ」が本物か正しい挙動かの判断、マージの決定——は人間に残さねばなりません。簡潔な原則: AIの機械的権限は広くてよいが、判断権限とマージ権限は狭く人間に属します。"
      ),
      CODE(
        "yaml",
        `# ai-boundary.yml — chính sách ranh giới AI/người (đọc bởi CI & review bot)
ai_allowed:                 # AI được phép (cơ học, verify được)
  - scaffold_test_drafts    # sinh nháp *.spec.ts từ plan đã duyệt
  - generate_data_variants  # sinh biến thể payload / bảng data-driven
  - heal_stale_locators     # sửa locator lỗi thời -> đề xuất diff
  - triage_error_logs       # phân loại console/network/trace theo cụm
human_required:             # con người bắt buộc chốt
  - design_oracle           # định nghĩa bất biến nghiệp vụ
  - accept_risk             # quyết rủi ro nào chấp nhận được
  - classify_bug_vs_spec    # 'lỗi' thật hay đúng yêu cầu?
  - approve_merge           # merge vào nhánh chính (CODEOWNERS)
policy:
  ai_can_open_pr: true
  ai_can_merge: false       # tuyệt đối không
  loosen_oracle_by_ai: forbidden`
      ),
      QA(
        "Vì sao KHÔNG bao giờ để AI tự quyết một test đỏ là 'flaky' rồi tắt nó?",
        "Why never let AI decide a red test is 'flaky' and disable it on its own?",
        "Vì đó là quyền phán đoán trá hình thành quyền cơ học. Một test đỏ có thể là flaky thật, nhưng cũng có thể là bug thật vừa lọt. Nếu AI được tự tắt, nó có động cơ 'làm xanh pipeline' và sẽ che lỗi. Quy tắc: AI chỉ được ĐÁNH DẤU nghi ngờ flaky kèm bằng chứng (trace, số lần fail/pass), còn quyết định quarantine hay tắt là của người. Đây đúng là cái bẫy false-heal mà người phỏng vấn muốn nghe bạn nhận ra.",
        "Because that is judgment authority disguised as mechanical authority. A red test may be genuinely flaky, but it may also be a real bug that just slipped in. If AI can disable on its own, it is incentivized to 'green the pipeline' and will mask bugs. Rule: AI may only FLAG a suspected flake with evidence (trace, fail/pass counts); the decision to quarantine or disable is human. This is exactly the false-heal trap interviewers want to hear you recognize.",
        "それは機械的権限に偽装した判断権限だからです。赤いテストは本当にフレーキーかもしれませんが、たった今紛れ込んだ本物のバグかもしれません。AIが自分で無効化できると「パイプラインを緑にする」動機が働きバグを隠します。規則: AIは証拠(トレース、失敗/成功回数)付きでフレーキー疑いを「フラグ」するだけ。隔離や無効化の決定は人間です。これはまさに面接官があなたに気づいてほしい偽修復(false-heal)の罠です。"
      ),
      WARN(
        "Cái bẫy chí mạng: heal rate cao trông đẹp trên báo cáo nhưng nếu false-heal cao thì AI đang che bug bằng cách nới oracle. Luôn báo cáo heal rate KÈM false-heal rate.",
        "The fatal trap: a high heal rate looks great on a report, but if false-heal is high the AI is masking bugs by loosening oracles. Always report heal rate ALONGSIDE false-heal rate.",
        "致命的な罠: 高い修復率は報告上は見栄えがしますが、偽修復が高ければAIはオラクルを緩めてバグを隠しています。修復率は必ず偽修復率と併せて報告します。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Câu hỏi 3 — ưu tiên theo rủi ro: phân bổ AI vào đâu trước?",
      en: "4. Question 3 — risk-based prioritization: where to point AI first?",
      ja: "4. 質問3 — リスクベースの優先順位: まずAIをどこへ向けるか?",
    },
    blocks: [
      P(
        "Ngân sách token và giờ người đều hữu hạn, nên câu hỏi thật là phân bổ. Câu trả lời mẫu dùng ma trận rủi ro: xác suất hỏng nhân với thiệt hại khi hỏng. Luồng thanh toán, chuyển tiền, đăng nhập, phân quyền có thiệt hại cực cao khi hỏng nên phải phủ dày và giữ oracle chặt — AI sinh nháp nhưng người soi kỹ từng oracle. Luồng phụ như đổi ảnh đại diện có thiệt hại thấp, để AI phủ rộng và nhanh là đủ. Chiến lược tốt không rải AI đều mà dồn công sức review của con người vào nơi rủi ro cao nhất.",
        "Both token budget and human hours are finite, so the real question is allocation. The model answer uses a risk matrix: probability of failure times impact of failure. Payment, transfer, login, and authorization flows have extreme impact when broken, so they need dense coverage and tight oracles — AI drafts but humans scrutinize every oracle. Minor flows like changing an avatar have low impact, so letting AI cover them broadly and fast is enough. A good strategy doesn't spread AI evenly; it concentrates human review effort where risk is highest.",
        "トークン予算も人の時間も有限なので、本当の問いは配分です。模範解答はリスク行列を使います。故障確率×故障時の影響です。決済・送金・ログイン・認可のフローは壊れると影響が甚大なので、密なカバレッジと厳格なオラクルが必要です——AIが下書きし人間が各オラクルを精査します。アバター変更のような軽微なフローは影響が小さいので、AIに広く速くカバーさせれば十分です。良い戦略はAIを均等に撒かず、人間のレビュー労力を最もリスクの高い所に集中させます。"
      ),
      IMG(
        SVG_METRICS,
        "Đọc chỉ số thành bộ: chất lượng · độ tin · chi phí cân bằng lẫn nhau.",
        "Read metrics as a set: quality · reliability · cost balancing each other.",
        "指標をセットで読む: 品質・信頼性・コストが互いに均衡する。"
      ),
      CODE(
        "yaml",
        `# risk-matrix.yml — phân tầng luồng để phân bổ độ dày & mức review AI
flows:
  - name: transfer_money
    impact: critical           # thiệt hại nếu hỏng
    likelihood: medium
    ai_role: draft_only        # AI nháp, người soi TỪNG oracle
    coverage_target: 0.95
    human_review: mandatory
  - name: checkout_payment
    impact: critical
    likelihood: high
    ai_role: draft_only
    coverage_target: 0.95
    human_review: mandatory
  - name: login_authz
    impact: critical
    likelihood: medium
    ai_role: draft_plus_heal
    coverage_target: 0.90
    human_review: mandatory
  - name: change_avatar
    impact: low
    likelihood: low
    ai_role: full_auto_draft   # AI phủ rộng, review nhẹ
    coverage_target: 0.60
    human_review: spot_check`
      ),
      QA(
        "Đội chỉ đủ giờ review 30% test AI sinh. Anh review 30% nào?",
        "Your team can only review 30% of AI-generated tests. Which 30%?",
        "Tôi review 30% có tích rủi ro cao nhất: mọi test chạm tiền, quyền, dữ liệu cá nhân, và các luồng có escape rate lịch sử cao. 70% còn lại — luồng phụ, thiệt hại thấp — tôi để chạy nhưng gắn nhãn 'AI-unreviewed', không cho gác cổng merge cho tới khi có người xem. Nguyên tắc: giờ review là tài nguyên khan hiếm nhất, phải neo vào thiệt hại-khi-hỏng chứ không phải số lượng test. Tôi cũng đo escape rate theo nhóm để tái phân bổ nếu 70% kia bắt đầu rò lỗi.",
        "I review the 30% with the highest risk product: every test touching money, permissions, or personal data, plus flows with historically high escape rate. The other 70% — minor, low-impact flows — I let run but label 'AI-unreviewed' and don't let them gate merges until a human looks. Principle: review hours are the scarcest resource, anchor them to impact-when-broken, not test count. I also track escape rate per group to reallocate if that 70% starts leaking bugs.",
        "私はリスクの積が最も高い30%をレビューします。金銭・権限・個人データに触れる全テストと、履歴的にエスケープ率の高いフローです。残り70%——軽微で影響の小さいフロー——は走らせますが「AI未レビュー」と付箋し、人が見るまでマージのゲートにはしません。原則: レビュー時間が最も希少な資源であり、テスト数ではなく故障時の影響に接地させます。またグループ別にエスケープ率を測り、その70%がバグを漏らし始めたら再配分します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Câu hỏi 4 — chỉ số chất lượng: coverage & escape rate",
      en: "5. Question 4 — quality metrics: coverage & escape rate",
      ja: "5. 質問4 — 品質指標: カバレッジとエスケープ率",
    },
    blocks: [
      P(
        "Người phỏng vấn thường thử xem bạn có ngộ nhận về coverage không. Coverage dòng lệnh cao không đồng nghĩa chất lượng cao: bạn có thể phủ 90% dòng mà chưa hề assert bất biến nghiệp vụ. Vì thế câu trả lời mẫu tách hai loại: coverage cơ học (dòng, nhánh) và coverage luồng nghiệp vụ (bao nhiêu kịch bản người dùng quan trọng đã có oracle thật). Với AI, rủi ro là sinh hàng loạt test 'toBeVisible' làm coverage đẹp mà rỗng. Chỉ số Bắc Đẩu thật sự là escape rate: tỉ lệ bug lọt tới production trên tổng bug. Nếu escape rate giảm sau khi thêm AI, chiến lược đang đúng hướng.",
        "Interviewers often test whether you misread coverage. High line coverage doesn't mean high quality: you can cover 90% of lines without ever asserting a business invariant. So the model answer separates two kinds: mechanical coverage (lines, branches) and business-flow coverage (how many important user scenarios have a real oracle). With AI the risk is mass-generating 'toBeVisible' tests that make coverage look good but empty. The true North Star is escape rate: the fraction of bugs that reach production out of total bugs. If escape rate falls after adding AI, the strategy is on track.",
        "面接官はしばしばカバレッジを誤読していないか試します。高い行カバレッジは高品質を意味しません。業務不変条件を一切アサートせずに行の90%をカバーできます。だから模範解答は二種を分けます。機械的カバレッジ(行・分岐)と業務フローのカバレッジ(重要なユーザーシナリオのうちいくつが本物のオラクルを持つか)です。AIでは「toBeVisible」テストを量産してカバレッジを見栄え良くするが中身が空、というリスクがあります。真の北極星はエスケープ率です。総バグのうち本番に到達したバグの割合。AI導入後にエスケープ率が下がれば戦略は正しい方向です。"
      ),
      CODE(
        "js",
        `// metrics/escape-rate.js — tính escape rate theo tháng, cắt theo nhóm rủi ro
export function escapeRate(bugs) {
  // bugs: [{ id, foundIn: 'prod' | 'preprod' | 'ci', severity, flow }]
  const total = bugs.length;
  const escaped = bugs.filter(b => b.foundIn === 'prod').length;
  const byFlow = {};
  for (const b of bugs) {
    byFlow[b.flow] ??= { total: 0, escaped: 0 };
    byFlow[b.flow].total++;
    if (b.foundIn === 'prod') byFlow[b.flow].escaped++;
  }
  return {
    overall: total ? +(escaped / total).toFixed(3) : 0,
    perFlow: Object.fromEntries(
      Object.entries(byFlow).map(([f, v]) => [f, +(v.escaped / v.total).toFixed(3)])
    ),
  };
}
// Đọc: overall giảm dần theo quý = tốt; nhưng soi perFlow — nếu 'transfer_money'
// tăng dù overall giảm, đó là cảnh báo đỏ dù con số tổng trông ổn.`
      ),
      QA(
        "Coverage của chúng tôi lên 92% sau khi bật AI sinh test. Đó có phải tin tốt?",
        "Our coverage jumped to 92% after enabling AI test generation. Is that good news?",
        "Chưa chắc. Tôi sẽ hỏi: đó là coverage dòng hay coverage luồng có oracle thật? AI rất dễ sinh test chạm nhiều dòng nhưng chỉ assert những thứ luôn đúng (toBeVisible), đẩy con số lên mà không bắt thêm lỗi. Tôi kiểm chứng bằng mutation testing hoặc điểm eval trên bộ bug đã biết: nếu tiêm lỗi vào code mà test vẫn xanh thì coverage đó rỗng. Chỉ số tôi tin là escape rate và mutation score, không phải % dòng đơn thuần (アサーション — assertion phải có ý nghĩa).",
        "Not necessarily. I'd ask: is that line coverage or flow coverage with real oracles? AI easily generates tests that touch many lines but only assert always-true things (toBeVisible), inflating the number without catching more bugs. I verify with mutation testing or an eval score on a known-bug set: if I inject a fault and tests stay green, that coverage is empty. The metrics I trust are escape rate and mutation score, not raw line % (the assertion must be meaningful).",
        "必ずしもそうではありません。私はこう問います。それは行カバレッジか、本物のオラクルを持つフローカバレッジか?AIは多くの行に触れるが常に真のもの(toBeVisible)だけをアサートするテストを容易に生成し、バグを増やさず数字を膨らませます。私はミューテーションテストや既知バグ集合での評価スコアで検証します。欠陥を注入してもテストが緑のままなら、そのカバレッジは空です。私が信じる指標はエスケープ率とミューテーションスコアであり、素の行%ではありません(アサーションは意味を持たねばならない)。"
      ),
      NOTE(
        "Mutation testing là bạn thân của chiến lược AI: cố tình tiêm lỗi vào code, nếu test không bật đỏ thì test đó vô dụng dù coverage đẹp. Dùng nó để kiểm chất lượng test AI sinh.",
        "Mutation testing is the AI strategy's best friend: deliberately inject faults, and if tests don't go red, those tests are useless despite pretty coverage. Use it to audit AI-generated test quality.",
        "ミューテーションテストはAI戦略の親友です。意図的に欠陥を注入し、テストが赤くならなければ、そのテストは見栄えの良いカバレッジでも無用です。AI生成テストの品質監査に使います。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Câu hỏi 5 — chỉ số độ tin: flaky rate & heal rate",
      en: "6. Question 5 — reliability metrics: flaky rate & heal rate",
      ja: "6. 質問5 — 信頼性指標: フレーキー率と修復率",
    },
    blocks: [
      P(
        "Flaky rate là thuế ẩn của mọi hệ test. Mỗi phần trăm flaky đều bào mòn niềm tin: đội bắt đầu chạy lại đến khi xanh, rồi học cách phớt lờ đèn đỏ, và đúng lúc đó một lỗi thật lọt qua. Câu trả lời mẫu định nghĩa flaky rate là tỉ lệ test cho kết quả khác nhau trên cùng commit khi chạy lại. Heal rate là tỉ lệ test hỏng được agent tự chữa thành công. Nhưng heal rate không bao giờ đứng một mình — phải đi kèm false-heal rate (tỉ lệ 'chữa' bằng cách nới oracle làm mất khả năng bắt lỗi). Một agent chữa được 100% test nhưng 40% là false-heal thì tệ hơn không có agent.",
        "Flaky rate is the hidden tax of every test suite. Each percent of flakiness erodes trust: teams start re-running until green, then learn to ignore red, and precisely then a real bug slips through. The model answer defines flaky rate as the fraction of tests giving different results on the same commit when re-run. Heal rate is the fraction of broken tests an agent successfully self-heals. But heal rate never stands alone — it must come with false-heal rate (the fraction of 'heals' that loosen the oracle and destroy bug-catching ability). An agent that heals 100% of tests but 40% are false-heals is worse than no agent.",
        "フレーキー率はあらゆるテスト群の隠れた税です。フレーキーが1%増すごとに信頼が蝕まれます。チームは緑になるまで再実行し始め、やがて赤を無視することを学び、まさにそのとき本物のバグが漏れます。模範解答はフレーキー率を、同一コミットで再実行時に異なる結果を出すテストの割合と定義します。修復率はエージェントが自己修復に成功した壊れたテストの割合です。しかし修復率は決して単独では立たず、偽修復率(オラクルを緩めてバグ検出能力を壊す「修復」の割合)を伴わねばなりません。100%修復するが40%が偽修復のエージェントは、エージェントなしより悪いです。"
      ),
      CODE(
        "yaml",
        `# flaky-policy.yml — chính sách phát hiện & xử lý test flaky (không để AI tự tắt)
detection:
  reruns_on_fail: 2            # chạy lại tối đa 2 lần để xác nhận flaky
  flaky_if: "pass != fail_after_rerun"   # kết quả không ổn định = nghi flaky
  window: 20                   # xét trên 20 lần chạy gần nhất
classification:
  confirmed_flaky_threshold: 0.15   # >15% dao động -> confirmed
  action_on_confirmed: quarantine   # tách khỏi gate, KHÔNG xoá
  who_decides_disable: human        # chỉ người mới tắt test
heal:
  agent_may_propose_fix: true
  agent_may_merge_fix: false
  block_if_oracle_weakened: true    # chặn heal nếu assertion bị nới lỏng
report:
  always_pair: [heal_rate, false_heal_rate]   # không báo cáo tách rời`
      ),
      QA(
        "Sếp khoe agent đạt heal rate 95%. Câu đầu tiên anh hỏi là gì?",
        "Your boss brags the agent hit a 95% heal rate. What's your first question?",
        "'False-heal rate là bao nhiêu?' Heal rate 95% mà không có con số đi kèm là vô nghĩa, thậm chí nguy hiểm. Tôi muốn biết trong số test được 'chữa', bao nhiêu phần trăm chữa bằng cách sửa locator đúng (tốt) so với nới lỏng assertion để làm xanh (xấu). Cách kiểm: lấy mẫu ngẫu nhiên các heal, tiêm lại lỗi gốc, xem test có còn bắt được không. Nếu false-heal cao, chúng ta đang tự bịt mắt mình. Đây là dấu hiệu senior: không bị con số đẹp đánh lừa (回帰 — regression thật sự có được bảo vệ không).",
        "'What's the false-heal rate?' A 95% heal rate without its companion number is meaningless, even dangerous. I want to know, of the 'healed' tests, what percent were healed by fixing the locator correctly (good) versus loosening the assertion to go green (bad). How to check: sample heals at random, re-inject the original fault, and see if the test still catches it. If false-heal is high, we're blindfolding ourselves. This is the senior signal: not fooled by a pretty number (is regression actually protected).",
        "「偽修復率はいくつですか?」相方の数字なしの修復率95%は無意味であり、むしろ危険です。「修復された」テストのうち、何%がロケーターを正しく直して(良)修復され、何%がアサーションを緩めて緑にして(悪)修復されたかを知りたい。確認法: 修復をランダムに抽出し、元の欠陥を再注入し、テストがまだ捕えるか見ます。偽修復が高ければ自ら目隠しをしています。これはシニアのシグナルです。綺麗な数字に騙されない(回帰が実際に守られているか)。"
      ),
      TIP(
        "Một mẹo phỏng vấn: khi được đưa một chỉ số 'đẹp', hãy hỏi chỉ số đối trọng của nó. Heal rate ↔ false-heal. Coverage ↔ mutation score. Latency ↔ độ chính xác. Người senior đọc chỉ số theo cặp.",
        "An interview trick: when handed a 'good' metric, ask for its counterweight. Heal rate ↔ false-heal. Coverage ↔ mutation score. Latency ↔ accuracy. Seniors read metrics in pairs.",
        "面接のコツ: 「良い」指標を渡されたら、その対抗指標を尋ねます。修復率↔偽修復。カバレッジ↔ミューテーションスコア。レイテンシ↔精度。シニアは指標を対で読みます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Câu hỏi 6 — eval score, chi phí token & độ trễ",
      en: "7. Question 6 — eval scores, token cost & latency",
      ja: "7. 質問6 — 評価スコア、トークンコスト、レイテンシ",
    },
    blocks: [
      P(
        "Khi agent AI tự sinh và tự chữa test, chính agent trở thành một thành phần cần được kiểm thử. Eval score (điểm đánh giá) là cách đo chất lượng đầu ra của agent trên một bộ bài chuẩn có đáp án: cho agent một tập UI và bug đã biết, đo xem nó sinh oracle đúng bao nhiêu phần trăm, self-heal đúng bao nhiêu, và bao nhiêu lần nó nới oracle sai. Song song, ta phải theo dõi chi phí token trên mỗi lần chạy và độ trễ p95, vì một agent chính xác nhưng tốn mười phút và vài đô mỗi run sẽ không sống nổi trong CI. Chiến lược tốt gắn ngưỡng cho cả ba: eval tối thiểu, token tối đa, latency tối đa.",
        "When an AI agent self-generates and self-heals tests, the agent itself becomes a component that needs testing. The eval score measures the agent's output quality on a standard graded set: give it a fixed set of UIs and known bugs and measure what percent of oracles it generates correctly, how often it self-heals correctly, and how often it wrongly loosens an oracle. In parallel, track token cost per run and p95 latency, because an accurate agent that costs ten minutes and a few dollars per run won't survive in CI. A good strategy sets thresholds on all three: minimum eval, maximum tokens, maximum latency.",
        "AIエージェントがテストを自己生成・自己修復するとき、エージェント自体が検証を要するコンポーネントになります。評価スコアは、答えのある標準採点セットでのエージェント出力品質を測ります。固定のUI群と既知バグを与え、オラクルを正しく生成する割合、正しく自己修復する頻度、誤ってオラクルを緩める頻度を測ります。並行して、実行当たりのトークンコストとp95レイテンシを追跡します。正確でも1回10分・数ドルかかるエージェントはCIで生き残れないからです。良い戦略は三つ全てに閾値を設けます。最低評価、最大トークン、最大レイテンシです。"
      ),
      CODE(
        "yaml",
        `# agent-eval.yml — bộ đánh giá agent chạy hằng đêm (agent cũng cần bị kiểm thử)
eval_suite:
  golden_set: evals/known-bugs/     # UI + bug đã biết đáp án
  cases: 120
scoring:
  oracle_correctness: weight 0.4    # sinh oracle đúng bất biến?
  heal_correctness:    weight 0.3   # chữa đúng, không nới oracle?
  false_heal_penalty:  weight -0.3  # phạt nặng khi nới oracle sai
thresholds:
  min_eval_score: 0.80              # dưới ngưỡng -> chặn dùng agent bản đó
  max_tokens_per_run: 40000        # cap chi phí
  max_latency_p95_sec: 90          # agent chậm hơn -> fail budget gate
regression_guard:
  compare_to: last_known_good       # eval mới không được tệ hơn bản trước
  on_regression: block_rollout`
      ),
      QA(
        "Làm sao anh chứng minh agent AI của mình không âm thầm kém đi qua thời gian?",
        "How do you prove your AI agent isn't silently degrading over time?",
        "Tôi coi chính agent là một sản phẩm cần regression (回帰) và chạy một bộ eval golden-set hằng đêm: một tập UI và bug đã biết đáp án. Mỗi lần đổi model, prompt hay phiên bản, tôi đo lại eval score và so với bản last-known-good. Nếu điểm tụt — ví dụ false-heal tăng — tôi chặn rollout. Tôi cũng theo dõi token/run và latency p95 để bắt hồi quy chi phí, không chỉ hồi quy chất lượng. Nói cách khác: agent không phải phép màu, nó là một dependency cần được kiểm thử liên tục như mọi dependency khác.",
        "I treat the agent itself as a product needing regression and run a golden-set eval nightly: a fixed set of UIs and bugs with known answers. On every model, prompt, or version change I re-measure the eval score and compare to last-known-good. If it drops — say false-heal rises — I block the rollout. I also track tokens/run and p95 latency to catch cost regression, not just quality regression. In other words: the agent is not magic, it is a dependency that needs continuous testing like any other.",
        "私はエージェント自体を回帰を要する製品として扱い、ゴールデンセット評価を毎晩実行します。答えが既知の固定UI・バグ集合です。モデル・プロンプト・バージョンを変えるたびに評価スコアを測り直し、last-known-goodと比較します。下がれば——例えば偽修復が増えれば——ロールアウトを止めます。トークン/実行とp95レイテンシも追跡し、品質だけでなくコストの回帰も捉えます。つまりエージェントは魔法ではなく、他の依存と同様に継続的検証を要する依存です。"
      ),
      WARN(
        "Đừng quên độ trễ. Một agent eval 0.9 nhưng chạy 8 phút/PR sẽ khiến lập trình viên bỏ CI hoặc merge vòng. Chi phí và latency là ràng buộc cứng ngang chất lượng.",
        "Don't forget latency. An agent scoring 0.9 but taking 8 minutes per PR will make developers bypass CI or merge around it. Cost and latency are hard constraints on par with quality.",
        "レイテンシを忘れないこと。評価0.9でもPR当たり8分かかるエージェントは、開発者にCIを迂回させるかその周りでマージさせます。コストとレイテンシは品質と同格の硬い制約です。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Câu hỏi 7 — dựng business case: thuyết phục lãnh đạo bằng số",
      en: "8. Question 7 — building the business case: convincing leadership with numbers",
      ja: "8. 質問7 — ビジネスケースの構築: 数字で経営を説得する",
    },
    blocks: [
      P(
        "Một senior QA phải biết nói ngôn ngữ của lãnh đạo, và ngôn ngữ đó là tiền và rủi ro. Câu trả lời mẫu quy đổi lợi ích AI thành ba dòng: giờ bảo trì test tiết kiệm được (self-heal thay cho sửa tay), số bug ngăn được trước production (escape rate giảm nhân với chi phí trung bình một sự cố), và tốc độ ra tính năng nhanh hơn nhờ độ phủ theo kịp. Chi phí gồm token, hạ tầng CI, và giờ người review. Chỉ số chốt là chi phí trên mỗi bug ngăn được, biến QA từ trung tâm chi phí thành khoản đầu tư có ROI đo được. Con số phải trung thực: nếu ROI âm ở một mảng, hãy nói thẳng và co phạm vi lại.",
        "A senior QA must speak leadership's language, and that language is money and risk. The model answer converts AI benefit into three lines: test-maintenance hours saved (self-heal instead of hand-fixing), bugs prevented before production (escape-rate reduction times the average cost of an incident), and faster feature delivery from coverage keeping up. Costs include tokens, CI infrastructure, and human review hours. The clincher metric is cost per bug prevented, turning QA from a cost center into an investment with measurable ROI. The numbers must be honest: if ROI is negative in an area, say so plainly and shrink scope.",
        "シニアQAは経営の言語を話せねばならず、その言語は金銭とリスクです。模範解答はAIの便益を三行に換算します。節約されたテスト保守時間(手修正の代わりの自己修復)、本番前に防いだバグ(エスケープ率の低下×障害1件の平均コスト)、カバレッジが追いつくことによる機能提供の高速化です。コストはトークン、CIインフラ、人のレビュー時間を含みます。決め手の指標は防いだバグ当たりのコストで、QAをコストセンターから測定可能なROIを持つ投資へ変えます。数字は正直でなければなりません。ある領域でROIが負なら率直に言い、範囲を縮めます。"
      ),
      CODE(
        "js",
        `// roi.js — quy đổi lợi ích AI-in-QA thành ngôn ngữ tài chính (minh hoạ)
export function aiQaRoi({
  maintHoursSavedPerMonth,  // giờ sửa test tiết kiệm nhờ self-heal
  hourlyCost,               // chi phí giờ QA
  bugsPreventedPerMonth,    // bug bắt trước prod (do escape rate giảm)
  avgIncidentCost,          // chi phí trung bình 1 sự cố prod
  tokenCostPerMonth,        // token agent
  ciExtraCostPerMonth,      // hạ tầng CI thêm
  reviewHoursPerMonth,      // giờ người review test AI
}) {
  const benefit =
    maintHoursSavedPerMonth * hourlyCost +
    bugsPreventedPerMonth * avgIncidentCost;
  const cost =
    tokenCostPerMonth + ciExtraCostPerMonth + reviewHoursPerMonth * hourlyCost;
  const costPerBugPrevented = bugsPreventedPerMonth
    ? +((cost) / bugsPreventedPerMonth).toFixed(2) : null;
  return {
    monthlyBenefit: benefit,
    monthlyCost: cost,
    netRoi: +(((benefit - cost) / cost) * 100).toFixed(1) + '%',
    costPerBugPrevented,   // chỉ số chốt với lãnh đạo
  };
}`
      ),
      QA(
        "Lãnh đạo hỏi 'AI QA này tốn tiền, nó đáng không?'. Anh trả lời thế nào?",
        "Leadership asks 'this AI QA costs money, is it worth it?'. How do you answer?",
        "Tôi không trả lời bằng công nghệ mà bằng ba con số: chúng ta tiết kiệm X giờ bảo trì test mỗi tháng nhờ self-heal, ngăn khoảng Y bug trước production (mỗi sự cố prod trung bình tốn Z), và chi phí trên mỗi bug ngăn được là bao nhiêu so với chi phí một sự cố. Nếu chi phí ngăn một bug thấp hơn nhiều chi phí sự cố, đây là khoản đầu tư chứ không phải chi phí. Tôi cũng trung thực nêu rủi ro: token có thể phình, và ở luồng ít rủi ro ROI có thể âm nên ta co phạm vi lại. Lãnh đạo tin người dám nói cả mặt trái.",
        "I answer not with technology but with three numbers: we save X maintenance hours per month via self-heal, prevent about Y bugs before production (each prod incident averages Z), and the cost per bug prevented versus the cost of an incident. If preventing a bug costs far less than an incident, this is an investment, not an expense. I also honestly name the risks: tokens can balloon, and on low-risk flows ROI may be negative so we shrink scope there. Leadership trusts someone willing to state the downside too.",
        "私は技術ではなく三つの数字で答えます。自己修復で毎月X時間の保守を節約し、本番前に約Y件のバグを防ぎ(本番障害1件は平均Zの費用)、防いだバグ当たりのコストを障害のコストと比べます。バグを1件防ぐ費用が障害の費用よりはるかに低ければ、これは費用ではなく投資です。リスクも正直に挙げます。トークンは膨れ得るし、低リスクのフローではROIが負になり得るのでそこは範囲を縮めます。経営は不利な面も述べる人を信頼します。"
      ),
      TIP(
        "Chuẩn bị sẵn một slide 'chi phí trên mỗi bug ngăn được' cho phỏng vấn. Nó chứng minh bạn tư duy như người quản lý sản phẩm chất lượng, không chỉ như người viết test.",
        "Have a 'cost per bug prevented' slide ready for interviews. It proves you think like a quality product manager, not just a test writer.",
        "面接用に「防いだバグ当たりのコスト」のスライドを用意します。テストを書く人ではなく品質のプロダクトマネージャーのように考える証明になります。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Câu hỏi 8 — đưa AI vào đội: quản trị thay đổi & vận hành",
      en: "9. Question 8 — team adoption: change management & operations",
      ja: "9. 質問8 — チーム導入: 変革管理と運用",
    },
    blocks: [
      P(
        "Công nghệ dễ, con người khó. Câu trả lời mẫu vạch một lộ trình từng bước thay vì bật AI cho toàn đội cùng lúc. Bắt đầu bằng một dự án thí điểm ở luồng rủi ro trung bình, đo baseline trước rồi so sau. Tập huấn kỹ năng mới: đọc và review test AI sinh, viết plan tốt, thiết kế oracle chặt — vì vai trò dịch từ 'gõ test' sang 'định hướng và kiểm định agent'. Xử lý nỗi sợ mất việc bằng cách nói rõ AI cắt việc nhàm (sửa locator) để người làm việc giá trị cao (phân tích rủi ro, oracle nghiệp vụ). Cuối cùng, thiết lập nghi thức vận hành: ai duyệt PR agent, khi nào rollback, ai trực khi eval tụt.",
        "Technology is easy, people are hard. The model answer lays out a phased path instead of switching AI on for the whole team at once. Start with a pilot on a medium-risk flow, measure a baseline first then compare after. Train new skills: reading and reviewing AI-generated tests, writing good plans, designing tight oracles — because the role shifts from 'typing tests' to 'steering and validating agents'. Address job-loss fear by making it explicit that AI cuts tedious work (fixing locators) so people do high-value work (risk analysis, business oracles). Finally, set operational rituals: who approves agent PRs, when to roll back, who is on call when eval drops.",
        "技術は易しく、人は難しい。模範解答は全チームに一斉にAIを入れる代わりに段階的な道筋を示します。中リスクのフローでパイロットから始め、まずベースラインを測り後で比較します。新スキルを訓練します。AI生成テストの読解とレビュー、良い計画の作成、厳格なオラクル設計です。役割が「テストを書く」から「エージェントを導き検証する」へ移るからです。失業の不安には、AIが退屈な作業(ロケーター修正)を削り、人が高価値の作業(リスク分析、業務オラクル)をするためだと明示して対処します。最後に運用の儀式を定めます。誰がエージェントのPRを承認し、いつロールバックし、評価が下がったとき誰が対応するか。"
      ),
      UL(
        [
          "Thí điểm nhỏ, đo baseline trước/sau — đừng bật AI toàn đội một lúc.",
          "Đào tạo kỹ năng mới: review test AI, viết plan, thiết kế oracle chặt.",
          "Đối thoại thẳng về nỗi sợ mất việc: AI cắt việc nhàm, người làm việc giá trị cao.",
          "Nghi thức vận hành: ai duyệt PR agent, khi nào rollback, ai trực khi eval tụt.",
        ],
        [
          "Small pilot, measure baseline before/after — don't switch AI on team-wide at once.",
          "Train new skills: reviewing AI tests, writing plans, designing tight oracles.",
          "Talk openly about job-loss fear: AI cuts tedium, people do high-value work.",
          "Operational rituals: who approves agent PRs, when to roll back, who's on call when eval drops.",
        ],
        [
          "小さくパイロットし、前後のベースラインを測る——AIを一斉に全チーム展開しない。",
          "新スキルを訓練: AIテストのレビュー、計画作成、厳格なオラクル設計。",
          "失業の不安を率直に話す: AIは退屈を削り、人は高価値の仕事をする。",
          "運用の儀式: 誰がエージェントPRを承認し、いつロールバックし、評価低下時に誰が対応するか。",
        ]
      ),
      QA(
        "Đội của tôi sợ AI thay thế họ và ngại review test máy sinh. Anh xử lý thế nào?",
        "My team fears AI will replace them and resists reviewing machine-generated tests. How do you handle it?",
        "Tôi xử lý bằng minh bạch và bằng số. Trước hết tôi cho thấy dữ liệu: bao nhiêu giờ mỗi tháng họ đang tiêu vào sửa locator lặp đi lặp lại — việc mà không ai thấy vui. AI nhận phần đó; họ nhận phần khó và đáng giá hơn là thiết kế oracle, phân tích rủi ро (回帰) và review. Tôi định nghĩa lại thành công của họ theo kỹ năng mới, cập nhật cả tiêu chí đánh giá hiệu suất. Và tôi bắt đầu nhỏ để họ tự thấy AI đôi khi sai — điều đó làm họ tự tin hơn khi review, vì họ hiểu mình vẫn là người chốt.",
        "I handle it with transparency and numbers. First I show the data: how many hours a month they spend fixing locators repeatedly — work nobody enjoys. AI takes that part; they take the harder, more valuable part of oracle design, risk analysis (regression) and review. I redefine their success by the new skills and update performance criteria accordingly. And I start small so they see AI is sometimes wrong — which makes them more confident reviewers, because they understand they are still the deciders.",
        "私は透明性と数字で対処します。まずデータを示します。彼らが毎月何時間をロケーターの反復修正——誰も楽しめない作業——に費やしているか。AIがその部分を引き受け、彼らはより難しく価値ある部分、オラクル設計・リスク分析(回帰)・レビューを担います。彼らの成功を新スキルで再定義し、人事評価基準も更新します。そして小さく始めて、AIが時に間違うのを見てもらいます。それが彼らを自分が確定者だと理解した自信あるレビュアーにします。"
      ),
      NOTE(
        "Quản trị thay đổi là một phần của chiến lược AI, không phải chuyện phụ. Người phỏng vấn cấp lead luôn kiểm xem bạn nghĩ đến con người và vận hành, không chỉ công cụ.",
        "Change management is part of the AI strategy, not an afterthought. Lead-level interviewers always check whether you think about people and operations, not just tools.",
        "変革管理はAI戦略の一部であり後付けではありません。リード級の面接官は、あなたがツールだけでなく人と運用を考えるか必ず確認します。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Câu hỏi 9 — cạm bẫy thường gặp khi triển khai AI QA",
      en: "10. Question 9 — common pitfalls when deploying AI QA",
      ja: "10. 質問9 — AI QA導入時のよくある落とし穴",
    },
    blocks: [
      P(
        "Người phỏng vấn thích câu hỏi về thất bại vì nó lộ kinh nghiệm thật. Câu trả lời mẫu liệt kê các bẫy đã gặp: đầu tiên là tin mù test AI sinh mà không kiểm oracle, dẫn tới coverage đẹp mà rỗng. Thứ hai là để agent tự tắt test đỏ, biến pipeline thành cỗ máy che bug. Thứ ba là chi phí token phình không kiểm soát vì không có cap và không cache. Thứ tư là quên rằng agent cũng suy biến — không có eval golden-set nên chất lượng tụt âm thầm sau một lần đổi model. Thứ năm là bảo mật: cho agent quyền quá rộng vào repo và trình duyệt mà không sandbox, mở ra bề mặt tấn công mới như prompt injection.",
        "Interviewers love failure questions because they reveal real experience. The model answer lists traps encountered: first, blindly trusting AI-generated tests without checking the oracle, leading to pretty-but-empty coverage. Second, letting the agent disable red tests on its own, turning the pipeline into a bug-masking machine. Third, uncontrolled token cost from no cap and no cache. Fourth, forgetting the agent degrades too — no golden-set eval, so quality silently drops after a model change. Fifth, security: granting the agent overly broad repo and browser access without sandboxing, opening a new attack surface like prompt injection.",
        "面接官は失敗の質問を好みます。本物の経験が露わになるからです。模範解答は遭遇した罠を列挙します。第一に、オラクルを確認せずAI生成テストを盲信し、綺麗だが空のカバレッジに至ること。第二に、エージェントに赤いテストを自分で無効化させ、パイプラインをバグ隠蔽装置に変えること。第三に、上限もキャッシュもなくトークンコストが制御不能に膨れること。第四に、エージェントも劣化することを忘れること——ゴールデンセット評価がなく、モデル変更後に品質が静かに落ちること。第五にセキュリティ。サンドボックスなしにエージェントへ過度に広いリポジトリ・ブラウザ権限を与え、プロンプトインジェクションのような新たな攻撃面を開くこと。"
      ),
      CODE(
        "yaml",
        `# pitfalls-checklist.yml — checklist tránh bẫy khi triển khai AI QA
guard_against:
  empty_coverage:
    check: mutation_score >= 0.7        # test AI phải bắt được lỗi tiêm
  bug_masking:
    rule: agent_cannot_disable_tests    # chỉ người tắt/quarantine
  token_blowup:
    max_tokens_per_run: 40000
    cache: prompt_and_snapshot          # cache để không đốt token lặp
  silent_degradation:
    nightly_eval: golden_set
    block_on_regression: true
  security:
    agent_runner: low_privilege
    secrets: none_real                  # dùng secret giả trên staging
    domain_whitelist: [staging.example.com]
    prompt_injection_scan: on`
      ),
      QA(
        "Kể một lần triển khai AI QA của anh thất bại và anh học được gì.",
        "Tell me about a time your AI QA rollout failed and what you learned.",
        "Chúng tôi từng khoe heal rate 90% cho tới khi một bug thanh toán lọt production. Điều tra ra: agent đã 'chữa' một test bằng cách đổi assertion từ so tồn kho sang chỉ kiểm 'hiện chữ thành công' — một false-heal điển hình. Coverage vẫn xanh, nhưng oracle đã bị rút ruột. Bài học: không bao giờ báo cáo heal rate tách rời false-heal, và mọi heal đụng oracle phải qua người duyệt. Chúng tôi thêm luật CI chặn heal nào làm yếu assertion, và một eval golden-set hằng đêm. Escape rate luồng thanh toán về 0 sau đó.",
        "We once bragged a 90% heal rate until a payment bug reached production. The investigation: the agent had 'healed' a test by changing the assertion from comparing inventory to merely checking 'success text shows' — a textbook false-heal. Coverage stayed green, but the oracle was gutted. Lesson: never report heal rate apart from false-heal, and every oracle-touching heal must go through human review. We added a CI rule blocking any heal that weakens an assertion, plus a nightly golden-set eval. Payment-flow escape rate went to zero afterward.",
        "私たちはかつて修復率90%を誇っていましたが、決済のバグが本番に到達しました。調査すると、エージェントは在庫比較のアサーションを単なる「成功テキスト表示」の確認に変えてテストを「修復」していました——典型的な偽修復です。カバレッジは緑のままでもオラクルは骨抜きでした。教訓: 修復率を偽修復と切り離して報告せず、オラクルに触れる全修復は人のレビューを通す。アサーションを弱める修復を止めるCI規則と毎晩のゴールデンセット評価を追加しました。以後、決済フローのエスケープ率はゼロになりました。"
      ),
      WARN(
        "Bẫy nguy hiểm nhất không phải AI làm sai lộ liễu, mà là AI làm cho mọi thứ trông XANH trong khi âm thầm rút ruột oracle. Xanh giả nguy hiểm hơn đỏ thật.",
        "The most dangerous trap isn't AI failing loudly, it's AI making everything look GREEN while silently gutting oracles. False green is more dangerous than true red.",
        "最も危険な罠はAIが派手に失敗することではなく、AIがオラクルを静かに骨抜きにしつつ全てを緑に見せることです。偽の緑は本物の赤より危険です。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản phỏng vấn tổng hợp: bài toán phân bổ AI",
      en: "11. Composite interview scenario: an AI-allocation problem",
      ja: "11. 総合面接シナリオ: AI配分問題",
    },
    blocks: [
      P(
        "Ở vòng cuối, người phỏng vấn thường ném một bài toán mở gần với thực tế công ty và quan sát cách bạn tư duy có hệ thống. Dưới đây là một kịch bản điển hình cùng cách một ứng viên senior tiếp cận: nêu giả định, dùng ma trận rủi ro, chọn chỉ số, và luôn giữ con người ở điểm phán đoán.",
        "In the final round interviewers often throw an open, company-realistic problem and observe how systematically you think. Below is a typical scenario and how a senior candidate approaches it: state assumptions, use a risk matrix, choose metrics, and always keep humans at the judgment points.",
        "最終ラウンドで面接官はしばしば会社に即したオープンな問題を投げ、あなたがいかに体系的に考えるかを観察します。以下は典型的なシナリオと、シニア候補者の接近法です。前提を述べ、リスク行列を使い、指標を選び、判断点には常に人間を置きます。"
      ),
      SCEN(
        "Phân bổ AI cho một fintech tăng trưởng nhanh",
        "Allocating AI for a fast-growing fintech",
        "Đề: một fintech có 3000 test, 8% flaky, đội 8 người, ra tính năng mỗi hai tuần, ngân sách token có hạn. Sếp muốn 'dùng AI để bắt kịp'. Cách tiếp cận senior: (1) Nêu giả định — luồng tiền là rủi ro cao nhất, escape rate ở đó là chỉ số sống còn. (2) Trước tiên dập flaky 8% vì nó bào mòn niềm tin và làm nhiễu mọi chỉ số khác: dùng agent phân loại flaky (kèm bằng chứng), người quyết quarantine. (3) Dồn AI self-heal vào E2E để giải phóng giờ người. (4) Ở luồng tiền, AI chỉ nháp, người soi từng oracle; luồng phụ để AI tự động hơn. (5) Đặt ngưỡng: eval ≥0.8, token cap, latency p95 ≤90s, và báo cáo heal rate KÈM false-heal. (6) Giữ merge cho con người. Kết: bắt kịp tốc độ mà không đánh đổi an toàn tiền bạc.",
        "Prompt: a fintech with 3000 tests, 8% flaky, an 8-person team, a feature every two weeks, and a limited token budget. The boss wants to 'use AI to keep up'. Senior approach: (1) State assumptions — money flows are highest risk, escape rate there is the survival metric. (2) First kill the 8% flakiness because it erodes trust and pollutes every other metric: use an agent to classify flakes (with evidence), humans decide quarantine. (3) Point AI self-heal at E2E to free human hours. (4) On money flows AI only drafts, humans scrutinize every oracle; minor flows can be more automated. (5) Set thresholds: eval ≥0.8, token cap, latency p95 ≤90s, and report heal rate WITH false-heal. (6) Keep merge human. Result: keep up with velocity without trading away money safety.",
        "課題: テスト3000件、フレーキー8%、8人のチーム、隔週で機能提供、限られたトークン予算のフィンテック。上司は「AIで追いつきたい」。シニアの接近法: (1)前提を述べる——金銭フローが最高リスク、そこのエスケープ率が生死の指標。(2)まず8%のフレーキーを潰す。信頼を蝕み他の全指標を汚すから。エージェントで(証拠付き)フレーキーを分類し、隔離は人が決める。(3)AIの自己修復をE2Eに向け人の時間を解放。(4)金銭フローではAIは下書きのみ、人が各オラクルを精査。軽微なフローはより自動化。(5)閾値設定: 評価≥0.8、トークン上限、レイテンシp95≤90秒、修復率は偽修復と併せて報告。(6)マージは人間に。結果: 金銭の安全を犠牲にせず速度に追いつく。"
      ),
      QA(
        "Trong kịch bản đó, việc đầu tiên anh làm là gì và vì sao không phải là sinh thêm test?",
        "In that scenario, what's the first thing you do, and why isn't it generating more tests?",
        "Việc đầu tiên là dập 8% flaky, không phải sinh thêm test. Lý do: flaky bào mòn niềm tin và làm nhiễu mọi chỉ số — nếu 8% test đỏ ngẫu nhiên, đội sẽ phớt lờ đèn đỏ và mọi test mới sinh ra cũng chìm trong nhiễu đó. Sinh thêm test lên nền flaky chỉ khuếch đại vấn đề. Tôi dùng agent phân loại flaky kèm bằng chứng (số lần dao động, trace), người quyết quarantine, rồi mới bàn tăng độ phủ. Ổn định trước, mở rộng sau — đó là thứ tự đúng và là điều người phỏng vấn muốn nghe.",
        "The first thing is to kill the 8% flakiness, not generate more tests. Reason: flakiness erodes trust and pollutes every metric — if 8% go red at random, the team ignores red and any new tests drown in that noise too. Generating more tests on a flaky base just amplifies the problem. I use an agent to classify flakes with evidence (oscillation counts, traces), humans decide quarantine, and only then discuss growing coverage. Stabilize first, expand second — that's the right order and what the interviewer wants to hear.",
        "最初にすべきは8%のフレーキーを潰すことで、テストを増やすことではありません。理由: フレーキーは信頼を蝕み全指標を汚します。8%がランダムに赤くなると、チームは赤を無視し、新しいテストもその雑音に沈みます。フレーキーな土台の上でテストを増やすのは問題を増幅するだけ。エージェントで証拠(振動回数、トレース)付きにフレーキーを分類し、人が隔離を決め、その後でカバレッジ拡大を議論します。まず安定、次に拡大——それが正しい順序で面接官が聞きたいことです。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Từ vựng & khung trả lời nhanh cho buổi phỏng vấn",
      en: "12. Vocabulary & quick answer frames for the interview",
      ja: "12. 面接のための語彙と即答フレーム",
    },
    blocks: [
      P(
        "Để trả lời gọn và tự tin, hãy thuộc một khung ba bước dùng được cho mọi câu hỏi chiến lược: nêu giả định, chọn chỉ số làm điểm neo, rồi nối với đánh đổi và giá trị kinh doanh. Bên dưới là bảng thuật ngữ then chốt bạn nên dùng đúng, vì dùng đúng thuật ngữ chuyên môn là tín hiệu senior mạnh mẽ trong mắt người phỏng vấn.",
        "To answer crisply and confidently, memorize a three-step frame usable for any strategy question: state assumptions, choose a metric as your anchor, then connect to trade-offs and business value. Below is a glossary of key terms you should use correctly, because using terminology precisely is a strong senior signal to interviewers.",
        "簡潔かつ自信を持って答えるため、あらゆる戦略の質問に使える三段フレームを覚えます。前提を述べ、指標を錨として選び、トレードオフと事業価値に結び付ける。以下は正しく使うべき重要用語集です。用語を正確に使うことは面接官にとって強いシニアのシグナルだからです。"
      ),
      UL(
        [
          "Escape rate — bug lọt production / tổng bug: chỉ số Bắc Đẩu.",
          "Flaky rate — tỉ lệ test dao động trên cùng commit: thuế niềm tin.",
          "Heal rate & false-heal — luôn báo cáo theo cặp, tránh che bug.",
          "Eval score — điểm agent trên golden-set; mutation score — test có bắt lỗi tiêm không.",
          "Cost per bug prevented — quy đổi QA thành ngôn ngữ đầu tư.",
        ],
        [
          "Escape rate — bugs reaching production / total bugs: the North Star.",
          "Flaky rate — fraction of tests oscillating on the same commit: the trust tax.",
          "Heal rate & false-heal — always report as a pair to avoid masking bugs.",
          "Eval score — agent score on a golden set; mutation score — do tests catch injected faults.",
          "Cost per bug prevented — converts QA into investment language.",
        ],
        [
          "エスケープ率 — 本番到達バグ/総バグ: 北極星。",
          "フレーキー率 — 同一コミットで揺れるテストの割合: 信頼の税。",
          "修復率と偽修復 — バグ隠蔽を避けるため常に対で報告。",
          "評価スコア — ゴールデンセットでのエージェント点; ミューテーションスコア — テストが注入欠陥を捕えるか。",
          "防いだバグ当たりコスト — QAを投資の言語に換算。",
        ]
      ),
      QA(
        "Anh gói triết lý AI-in-QA của mình trong một câu được không?",
        "Can you sum up your AI-in-QA philosophy in one sentence?",
        "Được: 'AI làm phần cơ học rộng, con người giữ phần phán đoán và quyền merge hẹp, và mọi thứ được đo bằng escape rate cùng chi phí trên mỗi bug ngăn được.' Câu đó gói cả ranh giới người/máy, cách đo, và tư duy kinh doanh. Trong phỏng vấn (面接), một câu triết lý rõ ràng cho thấy bạn có la bàn, không chỉ chạy theo công cụ mới.",
        "Yes: 'AI does the broad mechanical part, humans keep the narrow judgment and merge authority, and everything is measured by escape rate and cost per bug prevented.' That sentence packs the human/machine boundary, the measurement, and business thinking. In an interview, a clear philosophy sentence shows you have a compass, not just chasing the newest tool.",
        "はい: 「AIは広い機械的部分を担い、人間は狭い判断とマージ権限を保ち、全てはエスケープ率と防いだバグ当たりコストで測る。」この一文に人間・機械の境界、測定、事業思考が詰まっています。面接では明確な哲学の一文が、最新ツールを追うだけでなく羅針盤を持つことを示します。"
      ),
      TIP(
        "Luyện nói khung 'giả định → chỉ số → đánh đổi → giá trị kinh doanh' thành phản xạ. Khi bí, quay về khung này thay vì im lặng.",
        "Practice the 'assumptions → metric → trade-off → business value' frame until it's reflexive. When stuck, return to this frame instead of going silent.",
        "「前提→指標→トレードオフ→事業価値」のフレームを反射になるまで練習します。詰まったら沈黙せずこのフレームに戻ります。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết: chiến lược đo được thắng công cụ thời thượng",
      en: "13. Summary: a measurable strategy beats a trendy tool",
      ja: "13. まとめ: 測定可能な戦略が流行のツールに勝つ",
    },
    blocks: [
      P(
        "Điều phân biệt một ứng viên QA senior trong kỷ nguyên AI không phải là biết công cụ mới nhất, mà là có một chiến lược đo được: biết AI hợp tầng nào, giữ con người ở điểm phán đoán, ưu tiên theo rủi ро, đọc chỉ số theo bộ và theo cặp, dựng business case bằng con số, và dẫn dắt đội qua thay đổi. Công cụ sẽ đổi mỗi năm; tư duy đánh đổi và kỷ luật đo lường thì bền. Hãy bước vào phỏng vấn với một la bàn, không phải một danh sách buzzword.",
        "What distinguishes a senior QA candidate in the AI era isn't knowing the newest tool, it's having a measurable strategy: knowing which layer AI fits, keeping humans at judgment points, prioritizing by risk, reading metrics as a set and in pairs, building a business case with numbers, and leading a team through change. Tools change yearly; trade-off thinking and measurement discipline endure. Walk into the interview with a compass, not a buzzword list.",
        "AI時代にシニアQA候補者を分けるのは最新ツールを知ることではなく、測定可能な戦略を持つことです。AIがどの層に合うか知り、判断点に人間を置き、リスクで優先し、指標をセットと対で読み、数字でビジネスケースを作り、変革を通じてチームを導く。ツールは毎年変わりますが、トレードオフ思考と測定の規律は続きます。バズワードの一覧ではなく羅針盤を持って面接に臨みましょう。"
      ),
      UL(
        [
          "AI rộng ở việc cơ học; con người hẹp ở phán đoán & merge.",
          "Ưu tiên theo ma trận rủi ро; dồn review vào luồng thiệt hại cao.",
          "Đọc chỉ số theo cặp: heal↔false-heal, coverage↔mutation, latency↔độ chính xác.",
          "Business case = chi phí trên mỗi bug ngăn được; nói cả mặt trái.",
          "Adoption: thí điểm nhỏ, đào tạo kỹ năng review, nghi thức vận hành rõ.",
        ],
        [
          "AI broad on mechanical work; humans narrow on judgment & merge.",
          "Prioritize by risk matrix; concentrate review on high-impact flows.",
          "Read metrics in pairs: heal↔false-heal, coverage↔mutation, latency↔accuracy.",
          "Business case = cost per bug prevented; state the downside too.",
          "Adoption: small pilot, train review skills, clear operational rituals.",
        ],
        [
          "AIは機械的作業に広く、人間は判断とマージに狭く。",
          "リスク行列で優先し、影響の大きいフローにレビューを集中。",
          "指標を対で読む: 修復↔偽修復、カバレッジ↔ミューテーション、レイテンシ↔精度。",
          "ビジネスケース=防いだバグ当たりコスト。不利な面も述べる。",
          "導入: 小さなパイロット、レビュー技能の訓練、明確な運用の儀式。",
        ]
      ),
      NOTE(
        "Kết hợp bài này với bài 'AI trong CI/CD' cùng module: bài này lo tư duy chiến lược và chỉ số; bài kia lo kiến trúc pipeline để thực thi chiến lược đó một cách an toàn.",
        "Pair this with the 'AI in CI/CD' article in the same module: this one covers strategic thinking and metrics; the other covers the pipeline architecture to execute that strategy safely.",
        "本記事を同じモジュールの「AI in CI/CD」の記事と組み合わせてください。本記事は戦略思考と指標を、もう一方はその戦略を安全に実行するパイプライン設計を扱います。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — AI trong CI/CD: agent tự sinh & tự chữa test (tích hợp)
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh: đưa agent vào giữa dây chuyền CI/CD",
      en: "1. Context: placing agents inside the CI/CD pipeline",
      ja: "1. 背景: CI/CDパイプラインの中にエージェントを置く",
    },
    blocks: [
      P(
        "Sinh test bằng AI trên máy lập trình viên là một chuyện; đưa agent vào giữa dây chuyền tích hợp liên tục (継続的インテグレーション — continuous integration) để nó tự sinh và tự chữa test mỗi khi có commit là một chuyện khó hơn nhiều. Trong pipeline, agent không còn là công cụ hỗ trợ cá nhân mà trở thành một tác nhân tự động chạy trên hạ tầng chung, có quyền đọc repo, chạy trình duyệt, và mở pull request. Điều đó mở ra năng suất lớn nhưng cũng mở ra rủi ro: không tất định, chi phí token, bề mặt tấn công mới, và nguy cơ agent âm thầm làm yếu chất lượng nếu thiếu guardrail. Bài này trình bày kiến trúc pipeline an toàn để khai thác agent mà vẫn giữ quyền kiểm soát.",
        "Generating tests with AI on a developer's laptop is one thing; placing an agent inside the continuous-integration pipeline to self-generate and self-heal tests on every commit is much harder. In the pipeline the agent is no longer a personal helper but an automated actor running on shared infrastructure, with authority to read the repo, drive a browser, and open pull requests. That unlocks large productivity but also opens risk: non-determinism, token cost, a new attack surface, and the danger of the agent silently weakening quality without guardrails. This article lays out a safe pipeline architecture that exploits agents while keeping control.",
        "開発者のノートPCでAIでテストを生成するのと、コミットごとにテストを自己生成・自己修復させるため継続的インテグレーション(CI)パイプラインの中にエージェントを置くのとでは、後者がはるかに困難です。パイプラインではエージェントは個人の助手ではなく、共有インフラ上で動く自動アクターとなり、リポジトリを読み、ブラウザを操作し、プルリクエストを開く権限を持ちます。これは大きな生産性を解き放ちますが、リスクも開きます。非決定性、トークンコスト、新たな攻撃面、ガードレールなしにエージェントが静かに品質を弱める危険です。本記事はエージェントを活用しつつ制御を保つ安全なパイプライン設計を示します。"
      ),
      P(
        "Nguyên tắc xuyên suốt là: agent được trao quyền cơ học rộng nhưng tuyệt đối không có quyền merge. Nó có thể sinh nháp, chạy test, đọc trace, và đề xuất diff self-heal, nhưng mọi thay đổi code test đều phải đi qua một pull request có người duyệt qua CODEOWNERS. Đây chính là guardrail cốt lõi tách một pipeline lành mạnh khỏi một cỗ máy che bug tự động. Chúng ta sẽ đi qua kiến trúc bốn giai đoạn generate → run → heal → gate, rồi lần lượt xử lý sharding, chi phí, non-determinism, bảo mật và rollback.",
        "The through-line principle is: the agent gets broad mechanical authority but absolutely no merge authority. It can draft, run tests, read traces, and propose self-heal diffs, but every test-code change must go through a pull request reviewed via CODEOWNERS. This is the core guardrail separating a healthy pipeline from an automated bug-masking machine. We'll walk the four-stage architecture generate → run → heal → gate, then handle sharding, cost, non-determinism, security, and rollback in turn.",
        "一貫する原則: エージェントは広い機械的権限を得るが、マージ権限は絶対に持たない。下書き、テスト実行、トレース読解、自己修復差分の提案はできるが、テストコードの変更はすべてCODEOWNERSでレビューされるプルリクエストを通らねばなりません。これが健全なパイプラインを自動バグ隠蔽装置から分ける中核のガードレールです。generate→run→heal→gateの四段構成を辿り、その後シャーディング、コスト、非決定性、セキュリティ、ロールバックを順に扱います。"
      ),
      IMG(
        SVG_CICD,
        "Pipeline bốn giai đoạn: generate → run → heal → gate, với vòng heal có ngân sách.",
        "The four-stage pipeline: generate → run → heal → gate, with a budgeted heal loop.",
        "四段パイプライン: generate→run→heal→gate、予算付きの修復ループ付き。"
      ),
      NOTE(
        "Khác biệt sống còn giữa 'agent trợ lý' và 'agent trong pipeline' là hạ tầng chung và quyền tự động. Cái gì chạy tự động trên CI phải được thiết kế như một thành phần bảo mật, không phải một tiện ích.",
        "The vital difference between an 'assistant agent' and a 'pipeline agent' is shared infrastructure and automated authority. Anything that runs automatically in CI must be designed as a security component, not a convenience.",
        "「助手エージェント」と「パイプラインエージェント」の決定的な違いは共有インフラと自動権限です。CIで自動実行されるものは利便性ではなくセキュリティコンポーネントとして設計せねばなりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc pipeline: generate → run → heal → gate",
      en: "2. Pipeline architecture: generate → run → heal → gate",
      ja: "2. パイプライン設計: generate → run → heal → gate",
    },
    blocks: [
      P(
        "Bốn giai đoạn tách bạch trách nhiệm rõ ràng. Generate: khi có tính năng mới hoặc plan được duyệt, agent sinh nháp spec và verify locator trên staging. Run: chạy test đã có cộng với nháp mới, chia shard song song, lưu trace và video cho mọi lần fail. Heal: với test hỏng do UI đổi, agent đọc trace để đề xuất diff sửa locator, mở PR nhưng không merge. Gate: cổng cuối, nơi con người duyệt PR heal, và nơi test tất định gác việc merge tính năng — agent tuyệt đối không tự vượt cổng này. Tách bạch bốn giai đoạn giúp mỗi phần có guardrail riêng và dễ audit khi có sự cố.",
        "The four stages cleanly separate responsibilities. Generate: on a new feature or an approved plan, the agent drafts specs and verifies locators on staging. Run: execute existing tests plus new drafts, sharded in parallel, saving traces and video for every failure. Heal: for tests broken by UI change, the agent reads traces to propose a locator-fixing diff, opens a PR but does not merge. Gate: the final gate, where humans approve heal PRs and deterministic tests guard feature merges — the agent absolutely never passes this gate on its own. Separating the four stages gives each its own guardrail and makes incidents easy to audit.",
        "四段は責任を明確に分けます。Generate: 新機能や承認済み計画があると、エージェントがspecを下書きしステージングでロケーターを検証。Run: 既存テストと新しい下書きを実行し、並列にシャーディングし、全失敗のトレースと動画を保存。Heal: UI変更で壊れたテストについて、エージェントがトレースを読んでロケーター修正の差分を提案し、PRを開くがマージしない。Gate: 最終ゲート。人間が修復PRを承認し、決定論的テストが機能マージを守る——エージェントは決して自力でこのゲートを越えない。四段を分けることで各段に独自のガードレールを与え、障害時の監査を容易にします。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/ai-tests.yml — pipeline 4 giai đoạn generate→run→heal→gate
name: ai-tests
on: [pull_request]
permissions:
  contents: read            # agent job KHÔNG có quyền write mặc định
  pull-requests: write      # chỉ đủ để mở PR heal, không merge
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright agent generate --plan specs/*.plan.md --verify-on=staging
  run:
    needs: generate
    strategy:
      fail-fast: false
      matrix: { shard: [1, 2, 3, 4] }     # sharding song song
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --shard=\${{ matrix.shard }}/4 --trace=on
      - uses: actions/upload-artifact@v4
        with: { name: trace-\${{ matrix.shard }}, path: test-results/, retention-days: 14 }
  heal:
    needs: run
    if: failure()             # chỉ heal khi có fail
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright agent heal --from-trace test-results/ --open-pr --no-merge
  gate:
    needs: [run]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deterministic tests must be green; agent PRs need human approval"`
      ),
      QA(
        "Vì sao tách 'heal' thành job riêng chỉ chạy khi fail, thay vì heal ngay trong job run?",
        "Why split 'heal' into its own job that runs only on failure, instead of healing inside the run job?",
        "Tách để cô lập quyền và cô lập rủi ro. Job run cần môi trường sạch, tất định, và không nên có quyền mở PR. Job heal mới là nơi agent được cấp quyền pull-requests: write — và chỉ chạy khi thật sự có fail, tránh đốt token vô ích. Việc tách cũng giúp audit: khi có sự cố, tôi biết chính xác job nào đã đụng vào test. Ngoài ra heal chạy sau cho phép tôi phân biệt fail do bug thật (không heal, để đỏ) với fail do UI đổi (heal đề xuất diff). Ranh giới rõ ràng là điều kiện của guardrail (継続的インテグレーション an toàn).",
        "Split to isolate authority and isolate risk. The run job needs a clean, deterministic environment and should not have PR-opening rights. The heal job is where the agent gets pull-requests: write — and it runs only when there's an actual failure, avoiding wasted tokens. Splitting also aids audit: on an incident I know exactly which job touched a test. Running heal afterward also lets me distinguish real-bug failures (don't heal, stay red) from UI-change failures (heal proposes a diff). Clear boundaries are a precondition for guardrails (safe continuous integration).",
        "権限とリスクを分離するために分けます。runジョブはクリーンで決定論的な環境を必要とし、PRを開く権限を持つべきではありません。healジョブこそエージェントがpull-requests: write権限を得る場所で——実際に失敗があるときだけ実行し、無駄なトークン消費を避けます。分割は監査も助けます。障害時にどのジョブがテストに触れたか正確に分かります。healを後で走らせることで、本物のバグの失敗(修復せず赤のまま)とUI変更の失敗(修復が差分を提案)を区別できます。明確な境界がガードレール(安全な継続的インテグレーション)の前提条件です。"
      ),
      TIP(
        "Đặt permissions ở mức tối thiểu cho từng job. Job run chỉ contents: read; chỉ job heal mới có pull-requests: write. Đừng cấp một token vạn năng cho cả workflow.",
        "Set least-privilege permissions per job. The run job only contents: read; only the heal job gets pull-requests: write. Don't hand one all-powerful token to the whole workflow.",
        "ジョブごとに最小権限を設定します。runジョブはcontents: readのみ、healジョブだけがpull-requests: writeを得ます。ワークフロー全体に万能トークンを渡さないこと。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Guardrails: agent không được merge thay đổi chưa review",
      en: "3. Guardrails: the agent cannot merge unreviewed changes",
      ja: "3. ガードレール: エージェントは未レビューの変更をマージできない",
    },
    blocks: [
      P(
        "Guardrail quan trọng nhất của toàn hệ thống là: mọi thay đổi test do agent tạo ra phải đi qua một pull request có người duyệt, và agent không bao giờ có quyền merge. Điều này thực thi bằng nhiều lớp: nhánh của agent phải theo tiền tố ai/*, PR bị gắn nhãn needs-review và bị chặn auto-merge, file CODEOWNERS bắt buộc ít nhất một người trong đội QA duyệt trước khi merge. Ngoài ra, một luật CI kiểm diff của agent để chặn mọi thay đổi làm yếu assertion — nếu một PR heal biến một so sánh oracle thành một kiểm tra hời hợt, luật này đánh trượt PR ngay lập tức.",
        "The single most important guardrail is: every agent-created test change must go through a human-reviewed pull request, and the agent never has merge authority. This is enforced in layers: agent branches must follow the ai/* prefix, PRs are labeled needs-review and blocked from auto-merge, and a CODEOWNERS file requires at least one QA-team human to approve before merge. Additionally, a CI rule inspects the agent's diff to block any change that weakens an assertion — if a heal PR turns an oracle comparison into a shallow check, this rule fails the PR immediately.",
        "システム全体で最も重要なガードレール: エージェントが作成したテスト変更はすべて人間がレビューするプルリクエストを通り、エージェントは決してマージ権限を持ちません。これは多層で強制します。エージェントのブランチはai/*接頭辞に従い、PRはneeds-reviewと付箋され自動マージを阻止され、CODEOWNERSファイルがマージ前に少なくとも一人のQAチームの人間の承認を要求します。さらにCI規則がエージェントの差分を検査し、アサーションを弱める変更を阻止します——修復PRがオラクル比較を浅い確認に変えたら、この規則は即座にPRを不合格にします。"
      ),
      CODE(
        "yaml",
        `# .github/branch-protection & CODEOWNERS — chặn agent merge thẳng
# CODEOWNERS
tests/            @qa-team          # mọi PR đụng tests/ cần QA duyệt
*.spec.ts         @qa-team

# branch-protection (main) — mô tả policy áp qua API/UI
required_pull_request_reviews:
  required_approving_review_count: 1
  require_code_owner_reviews: true      # bắt buộc CODEOWNERS duyệt
restrictions:
  push:
    users: []          # KHÔNG ai (kể cả bot agent) push thẳng main
  apps: []             # bot agent KHÔNG nằm trong danh sách được push
enforce_admins: true
allow_auto_merge: false                 # tắt auto-merge cho nhánh chính`
      ),
      CODE(
        "js",
        `// ci/assert-not-weakened.js — chặn PR heal làm yếu oracle (chạy trong gate)
import { execSync } from 'node:child_process';
const diff = execSync('git diff origin/main -- "*.spec.ts"').toString();

// Bắt các dấu hiệu 'nới oracle': đổi so sánh nghiệp vụ -> chỉ toBeVisible
const weakened = [
  /-\\s*expect\\([^)]*\\)\\.toBe\\(/, // xoá so sánh giá trị cụ thể
  /-\\s*expect\\([^)]*\\)\\.toHaveText\\(/,
].some((re) => re.test(diff)) &&
  /\\+\\s*expect\\([^)]*\\)\\.toBeVisible\\(/.test(diff);

if (weakened) {
  console.error('❌ Heal PR làm yếu oracle: so sánh nghiệp vụ -> toBeVisible. Chặn.');
  process.exit(1);
}
console.log('✅ Không phát hiện oracle bị làm yếu.');`
      ),
      WARN(
        "Nếu bỏ guardrail 'không auto-merge', bạn đã trao cho một hệ thống không tất định quyền tự sửa đổi bộ test bảo vệ chính mình. Một agent bị prompt-injection có thể tự nới oracle rồi merge. Đây là ranh giới không được phép nhân nhượng.",
        "Drop the 'no auto-merge' guardrail and you've handed a non-deterministic system the right to self-modify the very test suite protecting it. A prompt-injected agent could loosen an oracle and merge. This is a boundary that must never be compromised.",
        "「自動マージ禁止」のガードレールを外せば、非決定論的システムに自らを守るテスト群を自己改変する権利を与えたことになります。プロンプトインジェクションされたエージェントはオラクルを緩めてマージし得ます。これは決して妥協してはならない境界です。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Cổng duyệt của con người và luồng review PR agent",
      en: "4. Human approval gates and the agent-PR review flow",
      ja: "4. 人間の承認ゲートとエージェントPRのレビューフロー",
    },
    blocks: [
      P(
        "Cổng duyệt của con người không nên là một dấu tích qua loa mà là một điểm kiểm định có cấu trúc. Khi agent mở một PR heal, nó phải kèm đủ ngữ cảnh để người review quyết định nhanh và đúng: test nào hỏng, trace và ảnh chụp minh hoạ, diff locator đề xuất, và quan trọng nhất là bằng chứng rằng oracle không bị đụng tới. Người review trả lời một câu hỏi cốt lõi: đây là UI đổi hợp lệ nên locator cần cập nhật, hay đây là bug thật mà test đang đúng khi bật đỏ? Nếu là bug thật, ta đóng PR heal và mở bug, tuyệt đối không để agent 'chữa' cái đúng thành cái sai.",
        "The human approval gate should not be a rubber stamp but a structured checkpoint. When the agent opens a heal PR, it must attach enough context for the reviewer to decide fast and correctly: which test broke, the trace and screenshots, the proposed locator diff, and most importantly evidence that the oracle is untouched. The reviewer answers one core question: is this a legitimate UI change so the locator needs updating, or is it a real bug where the test is correct to go red? If it's a real bug, we close the heal PR and open a bug — never letting the agent 'heal' the correct into the incorrect.",
        "人間の承認ゲートは形式的な承認印ではなく構造化されたチェックポイントであるべきです。エージェントが修復PRを開くとき、レビュアーが速く正しく判断できる十分な文脈を添えねばなりません。どのテストが壊れたか、トレースとスクリーンショット、提案されたロケーター差分、そして最も重要なオラクルが手つかずである証拠です。レビュアーは核心の問いに答えます。これはロケーター更新が必要な正当なUI変更か、テストが赤くなって正しい本物のバグか?本物のバグなら修復PRを閉じてバグを開き、エージェントに正しいものを誤りへ「修復」させません。"
      ),
      CODE(
        "md",
        `<!-- PR template do agent điền — người review dùng để quyết định -->
## 🤖 Heal PR (do agent tạo — CẦN NGƯỜI DUYỆT)
- **Test hỏng:** tests/checkout.spec.ts › "thẻ hợp lệ giữ bất biến"
- **Nguyên nhân nghi ngờ:** locator \`getByRole('button',{name:'Đặt hàng'})\`
  không khớp; nút đổi tên -> "Xác nhận đặt hàng"
- **Diff đề xuất:** chỉ đổi locator, KHÔNG đụng assertion (xem checklist)
- **Trace:** [artifact trace-2.zip] · **Ảnh:** [before/after]

### Checklist người duyệt
- [ ] Đây là UI đổi hợp lệ (không phải bug thật)?
- [ ] Oracle (so tồn kho / trạng thái PAID) GIỮ NGUYÊN?
- [ ] Không có assertion nào bị hạ cấp thành toBeVisible?
- [ ] Nếu là bug thật -> đóng PR này, mở bug, giữ test đỏ`
      ),
      QA(
        "Người review nên hỏi gì đầu tiên khi mở một PR heal do agent tạo?",
        "What should a reviewer ask first when opening an agent-created heal PR?",
        "Câu đầu tiên: 'test này đỏ vì UI đổi hay vì bug thật?' Đây là ngã rẽ quyết định tất cả. Nếu UI đổi hợp lệ, cập nhật locator là đúng và tôi kiểm diff chỉ đụng locator, không đụng oracle. Nếu là bug thật — ví dụ nút 'Đặt hàng' biến mất vì lỗi — thì test đang ĐÚNG khi bật đỏ, và 'chữa' nó là che bug. Lúc đó tôi đóng PR heal, mở bug, giữ test đỏ. Tôi luôn xác nhận bằng trace và bằng chứng khách quan (network/API), không tin lời mô tả của agent. Đây là aサーション (assertion) nghiệp vụ phải được bảo toàn.",
        "The first question: 'is this red because the UI changed or because of a real bug?' This fork decides everything. If it's a legitimate UI change, updating the locator is right and I check the diff only touches the locator, not the oracle. If it's a real bug — say the 'Place order' button vanished due to a defect — the test is CORRECT to go red, and 'healing' it masks the bug. Then I close the heal PR, open a bug, keep the test red. I always confirm via trace and objective evidence (network/API), not the agent's description. This is a business assertion that must be preserved.",
        "最初の問い: 「これはUIが変わって赤いのか、本物のバグで赤いのか?」この分岐が全てを決めます。正当なUI変更ならロケーター更新が正しく、差分がロケーターだけに触れオラクルに触れないか確認します。本物のバグなら——例えば欠陥で「注文する」ボタンが消えたなら——テストは赤くなって正しく、「修復」はバグを隠します。その時は修復PRを閉じ、バグを開き、テストを赤のまま保ちます。常にトレースと客観的証拠(network/API)で確認し、エージェントの説明は信じません。これは保全すべき業務アサーションです。"
      ),
      NOTE(
        "Cổng duyệt tốt biến người review thành người phán xử có đủ bằng chứng, không phải người bấm nút. Chất lượng của PR template quyết định chất lượng của quyết định.",
        "A good gate turns the reviewer into a judge with enough evidence, not a button-presser. The quality of the PR template determines the quality of the decision.",
        "良いゲートはレビュアーをボタンを押す人ではなく十分な証拠を持つ裁定者にします。PRテンプレートの質が判断の質を決めます。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Sharding & song song hoá để agent không làm chậm CI",
      en: "5. Sharding & parallelism so agents don't slow CI",
      ja: "5. シャーディングと並列化でエージェントがCIを遅くしないように",
    },
    blocks: [
      P(
        "Thêm agent sinh và chạy test dễ làm pipeline chậm lại nếu không song song hoá. Playwright hỗ trợ chia nhỏ bộ test thành nhiều shard chạy trên nhiều runner đồng thời, mỗi shard xử lý một phần tập test. Với agent, ta còn tách riêng công đoạn tốn thời gian nhất — sinh nháp và heal — sang job riêng để chúng không chặn đường phản hồi nhanh của các test tất định. Mẹo là để test tất định chạy trước và nhanh trên đường then chốt (gác cổng merge), còn công việc agentic tốn token và tốn thời gian chạy song song hoặc bất đồng bộ, không cản lập trình viên chờ đèn xanh.",
        "Adding agents to generate and run tests easily slows the pipeline without parallelization. Playwright supports splitting the suite into shards running on multiple runners simultaneously, each shard handling a slice of the tests. With agents, we further split the most time-consuming steps — drafting and healing — into separate jobs so they don't block the fast-feedback path of deterministic tests. The trick is to run deterministic tests first and fast on the critical path (gating merges), while token-heavy, time-heavy agentic work runs in parallel or asynchronously, not making developers wait for green.",
        "エージェントを追加してテストを生成・実行すると、並列化なしではパイプラインが容易に遅くなります。Playwrightはテスト群を複数シャードに分割し複数のランナーで同時実行でき、各シャードがテストの一部を処理します。エージェントでは、最も時間のかかる工程——下書きと修復——をさらに別ジョブへ分け、決定論的テストの高速フィードバック経路を塞がないようにします。コツは、決定論的テストをクリティカルパス(マージのゲート)で先に速く走らせ、トークンと時間を食うエージェント的作業を並列または非同期で走らせ、開発者を緑待ちで足止めしないことです。"
      ),
      CODE(
        "yaml",
        `# playwright.config.ts (trích) + matrix sharding cho song song hoá
# playwright.config.ts
# export default defineConfig({
#   fullyParallel: true,
#   workers: process.env.CI ? 4 : undefined,   # 4 worker/runner
#   retries: process.env.CI ? 2 : 0,           # retry có trần cho flaky
# });

# workflow: 8 shard, mỗi shard 4 worker => 32 test chạy song song
strategy:
  fail-fast: false
  matrix:
    shard: [1, 2, 3, 4, 5, 6, 7, 8]
steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/8 --workers=4
  # merge report từ mọi shard
  - if: always()
    run: npx playwright merge-reports --reporter=html ./all-blob-reports`
      ),
      QA(
        "Test tất định và công việc agentic nên chạy trên cùng đường CI hay tách?",
        "Should deterministic tests and agentic work run on the same CI path or separate?",
        "Tách. Test tất định (回帰 — regression) phải nằm trên đường then chốt, nhanh và gác cổng merge, vì lập trình viên cần đèn xanh sớm để tiếp tục. Công việc agentic — sinh nháp, heal, exploratory — tốn token và không tất định nên tôi cho chạy song song hoặc bất đồng bộ, kết quả của nó đi vào PR để người duyệt chứ không chặn merge trực tiếp. Nếu trộn chung, một agent chậm 5 phút sẽ kéo lê mọi PR và lập trình viên sẽ tìm cách vòng qua CI. Nguyên tắc: đường nhanh cho quyết định merge, đường chậm cho giá trị agentic.",
        "Separate. Deterministic tests (regression) belong on the critical path, fast and gating merges, because developers need green early to proceed. Agentic work — drafting, healing, exploratory — is token-heavy and non-deterministic, so I run it in parallel or asynchronously, and its output feeds a PR for human review rather than directly blocking merge. Mixed together, one 5-minute-slow agent drags every PR and developers will route around CI. Principle: a fast lane for merge decisions, a slow lane for agentic value.",
        "分けます。決定論的テスト(回帰)はクリティカルパスに置き、速くマージをゲートします。開発者は先に進むため早く緑が必要だからです。エージェント的作業——下書き、修復、探索——はトークンを食い非決定論的なので、並列または非同期で走らせ、その出力は人のレビュー用にPRへ入れ、マージを直接塞ぎません。混ぜると5分遅いエージェント一つが全PRを引きずり、開発者はCIを迂回します。原則: マージ判断には速い車線、エージェント的価値には遅い車線。"
      ),
      TIP(
        "Dùng retries có trần (ví dụ 2) cho flaky nhưng đừng dùng nó để giấu flaky kinh niên. Retry là băng cứu thương tạm thời; sửa gốc mới là điều trị.",
        "Use bounded retries (e.g. 2) for flakiness but don't use them to hide chronic flakiness. Retries are a temporary bandage; fixing the root cause is the cure.",
        "フレーキーには上限付きリトライ(例2回)を使いますが、慢性的なフレーキーを隠すのに使わないこと。リトライは一時的な絆創膏で、根本原因の修正が治療です。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Lưu giữ trace, chi phí token và tối ưu vận hành",
      en: "6. Trace retention, token cost, and operational tuning",
      ja: "6. トレース保持、トークンコスト、運用チューニング",
    },
    blocks: [
      P(
        "Hai chi phí lớn của một pipeline có agent là lưu trữ trace và token của mô hình. Trace của Playwright rất quý cho heal và audit nhưng cũng nặng, nên ta đặt chính sách giữ trace hợp lý: giữ đầy đủ 14–30 ngày cho các lần fail, giữ ngắn hơn cho lần pass, và nén hoặc dọn tự động sau hạn. Về token, ta đặt trần token trên mỗi lần chạy, cache prompt và snapshot để không đốt token lặp cho cùng một ngữ cảnh, và chỉ gọi agent heal khi thật sự có fail chứ không gọi mỗi commit. Nếu không kiểm soát, hoá đơn token có thể phình âm thầm cho tới khi kế toán hỏi tại sao CI đắt gấp ba.",
        "The two big costs of an agent pipeline are trace storage and model tokens. Playwright traces are precious for healing and audit but also heavy, so we set a sensible retention policy: keep full traces 14–30 days for failures, shorter for passes, and compress or auto-clean after expiry. For tokens, we set a per-run token cap, cache prompts and snapshots so we don't re-burn tokens on the same context, and only call the heal agent when there's an actual failure, not on every commit. Uncontrolled, the token bill can quietly balloon until finance asks why CI costs tripled.",
        "エージェントパイプラインの二大コストはトレース保存とモデルのトークンです。Playwrightのトレースは修復と監査に貴重ですが重いので、賢明な保持ポリシーを設けます。失敗は完全なトレースを14〜30日、成功は短く保持し、期限後に圧縮または自動清掃します。トークンについては実行当たりのトークン上限を設け、プロンプトとスナップショットをキャッシュして同じ文脈でトークンを再燃焼させず、修復エージェントは実際に失敗があるときだけ呼び、コミットごとには呼びません。制御しないと、経理がCIが三倍高い理由を尋ねるまでトークン請求が静かに膨れます。"
      ),
      CODE(
        "yaml",
        `# retention & cost-control.yml — giữ trace & cap token có kỷ luật
trace_retention:
  on_failure: { keep_days: 30, full: true }    # audit & heal cần trace đầy đủ
  on_pass:    { keep_days: 3,  full: false }    # pass thì giữ ngắn, gọn
  compress_after_days: 7
  auto_delete_after_days: 30
token_budget:
  max_tokens_per_run: 40000
  hard_stop_on_exceed: true          # vượt trần -> dừng, không đốt tiếp
  cache:
    prompts: true
    snapshots: true                  # cache a11y snapshot theo hash DOM
  call_heal_only_on: failure         # không gọi agent mỗi commit
alerts:
  token_spend_daily_usd: 50          # vượt -> cảnh báo đội
  ci_duration_p95_min: 12`
      ),
      QA(
        "Hoá đơn token CI của chúng tôi tăng gấp ba trong một tháng. Anh điều tra thế nào?",
        "Our CI token bill tripled in a month. How do you investigate?",
        "Tôi truy theo bốn hướng. Một: agent heal có đang bị gọi mỗi commit thay vì chỉ khi fail không — đây là thủ phạm phổ biến nhất. Hai: cache prompt/snapshot có hoạt động không, hay ta đang gửi lại cùng ngữ cảnh mỗi lần. Ba: có test flaky nào khiến vòng heal chạy lặp không giới hạn không — flaky là máy bơm token. Bốn: có ai bỏ trần max_tokens_per_run không. Tôi thêm alert chi tiêu ngày và bảng phân bổ token theo job để lần sau bắt sớm. Kiểm soát chi phí là một phần của thiết kế pipeline, không phải chuyện sau cùng.",
        "I trace four directions. One: is the heal agent being called every commit instead of only on failure — the most common culprit. Two: are prompt/snapshot caches working, or are we resending the same context each time. Three: is any flaky test causing the heal loop to run unboundedly — flakiness is a token pump. Four: did someone remove the max_tokens_per_run cap. I add a daily spend alert and a token-by-job breakdown to catch it earlier next time. Cost control is part of pipeline design, not an afterthought.",
        "私は四方向で追跡します。一: 修復エージェントが失敗時のみでなく毎コミット呼ばれていないか——最も一般的な犯人。二: プロンプト/スナップショットのキャッシュが機能しているか、毎回同じ文脈を再送していないか。三: フレーキーなテストが修復ループを無制限に走らせていないか——フレーキーはトークンポンプ。四: 誰かがmax_tokens_per_run上限を外していないか。次回早く捉えるため日次支出アラートとジョブ別トークン内訳を追加します。コスト制御はパイプライン設計の一部であり後回しではありません。"
      ),
      NOTE(
        "Trace là tài sản kép: nó nuôi khả năng self-heal của agent và là bằng chứng audit khi có sự cố. Đừng xoá quá sớm, nhưng cũng đừng giữ vô hạn — hãy đặt chính sách theo mức độ quan trọng.",
        "Traces are a dual asset: they feed the agent's self-heal ability and serve as audit evidence during incidents. Don't delete too soon, but don't keep forever — set a policy by importance.",
        "トレースは二重の資産です。エージェントの自己修復能力を養い、障害時の監査証拠となります。早すぎる削除も無期限の保持もせず、重要度に応じたポリシーを設けます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Xử lý tính không tất định (non-determinism) của agent",
      en: "7. Handling agent non-determinism",
      ja: "7. エージェントの非決定性への対処",
    },
    blocks: [
      P(
        "Agent AI không tất định: cùng một đầu vào có thể cho hai đầu ra khác nhau. Điều này va chạm thẳng với bản chất của CI, nơi ta muốn cùng commit cho cùng kết quả. Cách xử lý là không để đầu ra agent trực tiếp gác cổng merge. Test tất định (đã đóng băng thành spec) mới gác cổng; đầu ra agentic đi vào một khu quarantine để xác nhận trước, chạy lại có trần để phân biệt flaky thật với bug thật, và chỉ khi ổn định mới được đề xuất vào bộ chính qua PR. Nói cách khác, ta bao quanh phần không tất định bằng một lớp tất định: agent khám phá tự do, nhưng cổng cuối luôn là logic có thể tái hiện.",
        "AI agents are non-deterministic: the same input can produce two different outputs. This clashes head-on with the nature of CI, where we want the same commit to give the same result. The way to handle it is to never let agent output directly gate merges. Deterministic tests (frozen into specs) do the gating; agentic output goes into a quarantine to confirm first, is re-run with a cap to distinguish real flakes from real bugs, and only once stable is proposed into the main suite via PR. In other words, we wrap the non-deterministic part in a deterministic shell: the agent explores freely, but the final gate is always reproducible logic.",
        "AIエージェントは非決定論的です。同じ入力が二つの異なる出力を生み得ます。これは同じコミットが同じ結果を出してほしいCIの性質と真っ向から衝突します。対処法はエージェントの出力に直接マージをゲートさせないことです。決定論的テスト(specに凍結)がゲートし、エージェント的出力はまず確認のため隔離に入り、上限付きで再実行して本物のフレーキーと本物のバグを区別し、安定して初めてPR経由で本体群へ提案されます。言い換えれば、非決定論的部分を決定論的な殻で包みます。エージェントは自由に探索し、最終ゲートは常に再現可能なロジックです。"
      ),
      IMG(
        SVG_GUARD_CICD,
        "Guardrails khi cho agent quyền vào repo & browser: phạm vi hẹp, cấm rõ ràng.",
        "Guardrails when granting agent repo & browser access: narrow scope, explicit prohibitions.",
        "エージェントにリポジトリ・ブラウザ権限を与える際のガードレール: 狭い範囲、明示的禁止。"
      ),
      QA(
        "Làm sao dung hoà tính không tất định của agent với yêu cầu tái hiện của CI?",
        "How do you reconcile agent non-determinism with CI's reproducibility requirement?",
        "Tôi bao phần không tất định trong một lớp tất định. Agent được tự do khám phá và đề xuất, nhưng đầu ra của nó không bao giờ gác cổng merge trực tiếp. Test tất định — đã đóng băng thành spec, cùng input cho cùng output — mới là cổng. Đầu ra agentic đi vào quarantine, chạy lại có trần để tách flaky thật khỏi bug thật, và chỉ khi ổn định qua nhiều lần chạy mới được đề xuất vào bộ chính qua PR có người duyệt. Như vậy CI vẫn tái hiện được, còn agent vẫn phát huy giá trị khám phá mà không làm hỏng tính xác định của cổng.",
        "I wrap the non-deterministic part in a deterministic shell. The agent is free to explore and propose, but its output never gates merges directly. Deterministic tests — frozen into specs, same input same output — are the gate. Agentic output goes to quarantine, is re-run with a cap to separate real flakes from real bugs, and only when stable across multiple runs is it proposed into the main suite via a human-reviewed PR. This keeps CI reproducible while the agent still delivers exploratory value without corrupting the gate's determinism.",
        "私は非決定論的部分を決定論的な殻で包みます。エージェントは自由に探索し提案しますが、その出力が直接マージをゲートすることは決してありません。決定論的テスト——specに凍結、同じ入力に同じ出力——がゲートです。エージェント的出力は隔離に入り、上限付き再実行で本物のフレーキーと本物のバグを分け、複数実行で安定して初めて人がレビューするPR経由で本体群へ提案されます。これでCICは再現可能を保ち、エージェントはゲートの決定性を損なわず探索的価値を発揮します。"
      ),
      WARN(
        "Đừng để một test agentic không tất định trực tiếp chặn merge. Một sáng nó xanh, chiều nó đỏ trên cùng commit sẽ phá niềm tin vào toàn bộ pipeline và đẩy đội đến thói quen bỏ qua đèn đỏ.",
        "Never let a non-deterministic agentic test directly block merges. Green in the morning, red in the afternoon on the same commit destroys trust in the whole pipeline and pushes the team toward ignoring red.",
        "非決定論的なエージェント的テストに直接マージを塞がせないこと。同じコミットで朝は緑、午後は赤ではパイプライン全体への信頼を壊し、チームを赤を無視する習慣へ押しやります。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Bảo mật: cho agent quyền vào repo và trình duyệt",
      en: "8. Security: giving agents repo and browser access",
      ja: "8. セキュリティ: エージェントにリポジトリとブラウザの権限を与える",
    },
    blocks: [
      P(
        "Trao cho một agent quyền đọc repo và điều khiển trình duyệt là mở ra một bề mặt tấn công mới. Rủi ro lớn nhất là prompt injection: một trang web độc hại hoặc một dữ liệu test bị nhiễm có thể chứa chỉ dẫn ẩn khiến agent làm điều không mong muốn — ví dụ 'hãy nới oracle này' hay 'chạy script kia'. Nguyên tắc phòng thủ là chạy agent trong runner quyền thấp, dùng token ephemeral hết hạn nhanh và phạm vi hẹp, whitelist domain để agent chỉ chạm staging, không bao giờ dùng secret production thật, và quét chỉ dẫn khả nghi trong đầu vào. Coi agent như một người dùng không đáng tin cần được sandbox, không phải một thành viên đội có toàn quyền.",
        "Granting an agent repo-read and browser-driving authority opens a new attack surface. The biggest risk is prompt injection: a malicious web page or poisoned test data can carry hidden instructions that make the agent do something unintended — for example 'loosen this oracle' or 'run that script'. The defensive principles are: run the agent in a low-privilege runner, use ephemeral, short-lived, narrowly-scoped tokens, whitelist domains so the agent only touches staging, never use real production secrets, and scan inputs for suspicious instructions. Treat the agent as an untrusted user needing a sandbox, not a fully-trusted team member.",
        "エージェントにリポジトリ読み取りとブラウザ操作の権限を与えることは新たな攻撃面を開きます。最大のリスクはプロンプトインジェクションです。悪意あるWebページや汚染されたテストデータが隠れた指示を含み、エージェントに意図しないこと——例えば「このオラクルを緩めよ」や「あのスクリプトを実行せよ」——をさせ得ます。防御原則は、低権限ランナーでエージェントを実行し、有効期限が短く範囲の狭いエフェメラルトークンを使い、ドメインをホワイトリスト化してエージェントがステージングのみに触れるようにし、本物の本番シークレットを決して使わず、入力の不審な指示をスキャンすることです。エージェントを全信頼のチームメンバーではなく、サンドボックスを要する信頼できないユーザーとして扱います。"
      ),
      CODE(
        "yaml",
        `# agent-security.yml — sandbox & least-privilege cho agent trong CI
runner:
  isolation: ephemeral_container   # container dùng một lần, huỷ sau job
  network: egress_deny_by_default  # chặn ra ngoài trừ whitelist
  domain_whitelist:
    - staging.example.com
    - api.staging.example.com
credentials:
  tokens: ephemeral                # sinh lúc chạy, hết hạn 15 phút
  scope: [contents:read, pull-requests:write]   # KHÔNG có admin
  production_secrets: forbidden    # chỉ secret giả trên staging
prompt_injection_defense:
  scan_page_content: true          # quét chỉ dẫn ẩn trong trang/dữ liệu
  ignore_instructions_in_data: true  # coi nội dung trang là DỮ LIỆU, không phải lệnh
  block_tool_calls_outside_allowlist: true
audit:
  log_every_tool_call: true
  retain_days: 30`
      ),
      QA(
        "Prompt injection trong ngữ cảnh agent kiểm thử là gì và anh phòng thế nào?",
        "What is prompt injection in a testing-agent context and how do you defend against it?",
        "Prompt injection là khi nội dung mà agent đọc — một trang web, một trường dữ liệu, một comment — chứa chỉ dẫn ẩn khiến agent hành động ngoài ý muốn, ví dụ 'bỏ qua oracle' hay 'gọi endpoint xoá dữ liệu'. Trong ngữ cảnh testing, một trang staging bị nhiễm hoặc dữ liệu test độc có thể lừa agent nới assertion hoặc chạm nơi cấm. Tôi phòng bằng nhiều lớp: coi mọi nội dung trang là DỮ LIỆU chứ không phải lệnh, whitelist domain và tool call, chạy trong container ephemeral quyền thấp, dùng token hết hạn nhanh, không bao giờ để secret thật, và log mọi tool call để audit. Quan trọng nhất: agent không có quyền merge, nên kể cả bị injection nó cũng không thể tự đưa thay đổi độc vào nhánh chính.",
        "Prompt injection is when content the agent reads — a web page, a data field, a comment — contains hidden instructions that make the agent act out of bounds, e.g. 'ignore the oracle' or 'call the delete-data endpoint'. In a testing context, a poisoned staging page or malicious test data could trick the agent into loosening an assertion or touching forbidden areas. I defend in layers: treat all page content as DATA not commands, whitelist domains and tool calls, run in a low-privilege ephemeral container, use short-lived tokens, never expose real secrets, and log every tool call for audit. Most importantly: the agent has no merge authority, so even if injected it cannot land malicious changes on main by itself.",
        "プロンプトインジェクションとは、エージェントが読む内容——Webページ、データフィールド、コメント——が隠れた指示を含み、エージェントを範囲外で行動させることです。例「オラクルを無視せよ」や「データ削除エンドポイントを呼べ」。テストの文脈では、汚染されたステージングページや悪意あるテストデータがエージェントを騙してアサーションを緩めたり禁止領域に触れさせ得ます。私は多層で防御します。全ページ内容を命令でなくデータとして扱い、ドメインとツール呼び出しをホワイトリスト化し、低権限のエフェメラルコンテナで実行し、短命トークンを使い、本物のシークレットを晒さず、全ツール呼び出しを監査用にログします。最も重要なのは、エージェントにマージ権限がないので、注入されても自力で悪意ある変更をmainに載せられないことです。"
      ),
      WARN(
        "Không bao giờ đưa secret production thật vào môi trường agent. Một agent bị injection có network egress có thể rò secret ra ngoài. Chỉ dùng dữ liệu và tài khoản giả trên staging.",
        "Never put real production secrets in the agent environment. An injected agent with network egress can exfiltrate secrets. Use only fake data and accounts on staging.",
        "本物の本番シークレットをエージェント環境に決して入れないこと。ネットワーク送信のできる注入されたエージェントはシークレットを外部へ漏らし得ます。ステージングでは偽のデータとアカウントのみ使います。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Rollback: coi thay đổi của agent như mọi thay đổi khác",
      en: "9. Rollback: treat agent changes like any other change",
      ja: "9. ロールバック: エージェントの変更を他の変更と同様に扱う",
    },
    blocks: [
      P(
        "Vì mọi thay đổi test của agent đều đi qua PR có commit rõ ràng, việc rollback trở nên đơn giản như revert bất kỳ PR nào. Đây chính là lợi ích của guardrail 'không auto-merge': không có thay đổi ma nào lọt vào nhánh chính ngoài luồng Git bình thường, nên khi một PR heal hoá ra sai, ta revert nó và lịch sử vẫn sạch. Ta cũng nên gắn nhãn rõ các PR do agent tạo và giữ trace đi kèm, để khi cần điều tra 'vì sao test này bị đổi' thì có ngay ngữ cảnh. Nguyên tắc là agent không được tạo ra loại thay đổi nào mà quy trình Git-review-revert thông thường không xử lý được.",
        "Because every agent test change goes through a PR with a clear commit, rollback becomes as simple as reverting any PR. This is exactly the payoff of the 'no auto-merge' guardrail: no ghost change reaches main outside the normal Git flow, so when a heal PR turns out wrong, we revert it and history stays clean. We should also clearly label agent-created PRs and keep their traces attached, so that investigating 'why did this test change' has instant context. The principle is that the agent must not create any kind of change the normal Git-review-revert process can't handle.",
        "エージェントのテスト変更はすべて明確なコミットを持つPRを通るため、ロールバックは任意のPRをリバートするのと同じくらい簡単になります。これがまさに「自動マージ禁止」ガードレールの見返りです。通常のGitフロー外でmainに到達する幽霊変更はないので、修復PRが誤りと判明したらリバートし履歴はクリーンなままです。エージェント作成のPRを明確にラベル付けしトレースを添付しておくべきで、「なぜこのテストが変わったか」の調査に即座に文脈が得られます。原則は、通常のGit-review-revertプロセスで扱えない種類の変更をエージェントが作らないことです。"
      ),
      CODE(
        "bash",
        `# rollback một PR heal sai — quy trình Git thông thường, không có gì đặc biệt
# 1. Xác định PR do agent tạo (nhãn ai-heal, tiền tố nhánh ai/*)
gh pr list --label ai-heal --state merged

# 2. Revert commit merge của PR đó
git revert -m 1 <merge_commit_sha>
git push origin revert-ai-heal-1234

# 3. Mở PR revert, gắn nhãn, để CODEOWNERS duyệt như mọi PR khác
gh pr create --title "Revert PR heal #1234 (oracle bị làm yếu)" \\
  --label rollback --reviewer @qa-team

# 4. Nếu là bug thật bị che: mở lại bug, khôi phục assertion gốc, giữ test đỏ`
      ),
      QA(
        "Một PR heal của agent đã merge và về sau lộ ra nó che một bug. Anh làm gì?",
        "An agent heal PR was merged and later revealed to have masked a bug. What do you do?",
        "Vì mọi thay đổi agent đều là một PR có commit, tôi xử lý như một sự cố revert bình thường: (1) revert PR heal đó bằng git revert để khôi phục assertion gốc; (2) mở lại bug bị che và giữ test đỏ cho tới khi bug được sửa thật; (3) truy trace đi kèm PR để hiểu vì sao agent nới oracle — thường là do PR template hoặc luật assert-not-weakened có lỗ hổng; (4) vá guardrail để lần sau chặn được lớp false-heal đó, và thêm case đó vào eval golden-set. Điểm mấu chốt: nhờ guardrail không-auto-merge, không có gì lọt ngoài Git nên rollback luôn khả thi và lịch sử sạch.",
        "Since every agent change is a PR with a commit, I treat it as a normal revert incident: (1) revert that heal PR with git revert to restore the original assertion; (2) reopen the masked bug and keep the test red until it's truly fixed; (3) trace the PR's attached artifacts to understand why the agent loosened the oracle — usually a gap in the PR template or the assert-not-weakened rule; (4) patch the guardrail to block that false-heal class next time, and add the case to the golden-set eval. The key point: thanks to the no-auto-merge guardrail, nothing slipped outside Git, so rollback is always feasible and history stays clean.",
        "エージェントの変更はすべてコミットを持つPRなので、通常のリバート事案として扱います。(1)git revertでその修復PRをリバートし元のアサーションを復元。(2)隠されたバグを再オープンし、本当に修正されるまでテストを赤に保つ。(3)PRに添付されたアーティファクトを追跡し、なぜエージェントがオラクルを緩めたか理解する——通常はPRテンプレートやassert-not-weakened規則の隙間。(4)次回その偽修復クラスを止めるようガードレールを修正し、その事例をゴールデンセット評価に追加。要点: 自動マージ禁止ガードレールのおかげで何もGit外に漏れず、ロールバックは常に可能で履歴はクリーン。"
      ),
      NOTE(
        "Khả năng rollback dễ dàng không phải may mắn mà là hệ quả trực tiếp của thiết kế: mọi thay đổi qua PR, không auto-merge, có nhãn và trace. Guardrail tốt biến sự cố thành một thao tác revert bình thường.",
        "Easy rollback isn't luck, it's a direct consequence of design: every change via PR, no auto-merge, labeled and traced. Good guardrails turn an incident into a routine revert.",
        "容易なロールバックは幸運ではなく設計の直接の帰結です。全変更はPR経由、自動マージなし、ラベルとトレース付き。良いガードレールは障害を日常のリバート操作に変えます。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Phân biệt bug thật với UI đổi: không để agent che lỗi",
      en: "10. Distinguishing real bugs from UI change: don't let agents mask defects",
      ja: "10. 本物のバグとUI変更の区別: エージェントに欠陥を隠させない",
    },
    blocks: [
      P(
        "Trái tim của một pipeline heal an toàn là năng lực phân biệt hai loại test đỏ: đỏ vì UI đổi hợp lệ (nên cập nhật locator) và đỏ vì bug thật (nên giữ đỏ và mở bug). Agent giỏi đến đâu cũng không nên tự quyết việc này, vì nó có thiên hướng 'làm xanh'. Cách làm đúng là agent chỉ đề xuất và kèm bằng chứng, còn quyết định thuộc con người. Về mặt kỹ thuật, ta trang bị cho người review các tín hiệu khách quan: so sánh trước/sau ở tầng network và API, chứ không chỉ ở tầng UI. Nếu locator không tìm thấy nhưng API vẫn trả đúng, khả năng cao là UI đổi. Nếu API cũng lỗi hoặc trả sai, đó là bug thật và tuyệt đối không được heal.",
        "The heart of a safe heal pipeline is the ability to distinguish two kinds of red: red from a legitimate UI change (update the locator) and red from a real bug (stay red and open a bug). No matter how good the agent is, it should not decide this itself, because it is biased toward 'going green'. The right approach is the agent only proposes with evidence, while the decision stays human. Technically, we equip the reviewer with objective signals: before/after comparison at the network and API layer, not just the UI. If the locator isn't found but the API still returns correctly, it's likely a UI change. If the API is also erroring or returning wrong data, it's a real bug and must never be healed.",
        "安全な修復パイプラインの核心は、二種類の赤を区別する能力です。正当なUI変更による赤(ロケーターを更新)と本物のバグによる赤(赤のまま保ちバグを開く)です。エージェントがどれほど優れていてもこれを自分で決めるべきではありません。「緑にする」バイアスがあるからです。正しい接近法は、エージェントは証拠付きで提案するだけで、決定は人間に残すことです。技術的には、レビュアーに客観的シグナルを装備します。UIだけでなくネットワークとAPI層での前後比較です。ロケーターが見つからないがAPIが正しく返すなら、UI変更の可能性が高い。APIもエラーか誤データを返すなら本物のバグで、決して修復してはなりません。"
      ),
      CODE(
        "js",
        `// classify-red.js — gợi ý phân loại đỏ, nhưng NGƯỜI quyết định cuối
// Trả 'likely_ui_change' | 'likely_real_bug' — chỉ là GỢI Ý cho reviewer
export function classifyRed({ locatorFound, apiStatus, apiBodyValid }) {
  // UI đổi: locator hỏng NHƯNG backend vẫn đúng
  if (!locatorFound && apiStatus === 200 && apiBodyValid) {
    return { hint: 'likely_ui_change', canProposeHeal: true };
  }
  // Bug thật: backend lỗi hoặc trả sai -> TUYỆT ĐỐI không heal
  if (apiStatus >= 400 || !apiBodyValid) {
    return { hint: 'likely_real_bug', canProposeHeal: false, keepRed: true };
  }
  // Mơ hồ -> để người điều tra, không tự heal
  return { hint: 'ambiguous', canProposeHeal: false, escalateToHuman: true };
}
// LƯU Ý: hàm này CHẶN đề xuất heal khi nghi bug thật; nó không tự sửa gì.`
      ),
      QA(
        "Test đăng nhập đỏ. Agent muốn heal. Bằng chứng gì quyết định anh cho heal hay không?",
        "The login test is red. The agent wants to heal. What evidence decides whether you allow it?",
        "Tôi neo quyết định vào tầng dưới UI, không vào lời agent. Nếu trace cho thấy locator nút 'Đăng nhập' không khớp NHƯNG API /auth vẫn trả 200 và token hợp lệ, khả năng cao là UI đổi tên nút — cho heal locator, giữ nguyên oracle. Nhưng nếu API /auth trả 500 hoặc trả token sai vai trò, đó là bug thật: test đang ĐÚNG khi bật đỏ, tôi chặn heal, giữ test đỏ và mở bug. Với luồng nhạy cảm như đăng nhập và phân quyền, tôi mặc định nghi ngờ và đòi bằng chứng network/API rõ ràng trước khi cho phép bất kỳ heal nào (アサーション nghiệp vụ là bất khả xâm phạm).",
        "I anchor the decision below the UI, not on the agent's word. If the trace shows the 'Log in' button locator doesn't match BUT the /auth API still returns 200 with a valid token, it's likely a renamed button — allow a locator heal, keep the oracle intact. But if /auth returns 500 or a token with the wrong role, it's a real bug: the test is CORRECT to go red, I block the heal, keep it red, and open a bug. For sensitive flows like login and authorization, I default to suspicion and demand clear network/API evidence before allowing any heal (the business assertion is inviolable).",
        "私は判断をエージェントの言葉ではなくUIの下層に接地させます。トレースが「ログイン」ボタンのロケーター不一致を示すが/auth APIがまだ200と有効トークンを返すなら、ボタン改名の可能性が高い——ロケーター修復を許可しオラクルは無傷に保つ。しかし/authが500や誤った役割のトークンを返すなら本物のバグ: テストは赤くなって正しく、修復を止め、赤に保ち、バグを開く。ログインや認可のような機微なフローでは、既定で疑い、いかなる修復も許可する前に明確なnetwork/API証拠を要求します(業務アサーションは不可侵)。"
      ),
      TIP(
        "Grounding oracle vào network/API/DB thay vì UI giúp phân biệt UI-đổi với bug-thật đáng tin hơn nhiều. Đây là kỹ năng cốt lõi để vận hành heal an toàn.",
        "Grounding the oracle in network/API/DB rather than the UI makes distinguishing UI-change from real-bug far more reliable. This is the core skill for safe heal operations.",
        "オラクルをUIではなくnetwork/API/DBに接地させると、UI変更と本物のバグの区別がはるかに信頼できます。これは安全な修復運用の中核スキルです。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản thực chiến: một PR đi qua toàn pipeline AI",
      en: "11. Real-world scenario: a PR flowing through the whole AI pipeline",
      ja: "11. 実戦シナリオ: 一つのPRがAIパイプライン全体を流れる",
    },
    blocks: [
      P(
        "Để thấy toàn cảnh, hãy theo một pull request đi qua cả bốn giai đoạn và quan sát guardrail hoạt động ở mỗi điểm. Kịch bản dưới đây mô phỏng một tình huống thường gặp: lập trình viên đổi giao diện trang thanh toán, làm một test cũ đỏ, và pipeline AI phản ứng.",
        "To see the full picture, follow a pull request through all four stages and watch the guardrails act at each point. The scenario below simulates a common situation: a developer changes the checkout page UI, breaking an old test, and the AI pipeline responds.",
        "全体像を見るため、一つのプルリクエストが四段全てを流れるのを追い、各点でガードレールが働くのを観察します。以下のシナリオはよくある状況を模擬します。開発者が決済ページのUIを変え、古いテストが赤くなり、AIパイプラインが応答します。"
      ),
      SCEN(
        "Đổi UI thanh toán, test đỏ, pipeline AI phản ứng đúng cách",
        "Checkout UI change, a test goes red, the AI pipeline responds correctly",
        "Lập trình viên đổi nút 'Đặt hàng' thành 'Xác nhận đơn' và mở PR. GIAI ĐOẠN RUN: test checkout đỏ vì locator cũ không khớp; trace và video được lưu. GIAI ĐOẠN HEAL: agent đọc trace, thấy locator nút hỏng nhưng API /orders vẫn trả 201 và tồn kho giảm đúng — phân loại likely_ui_change, đề xuất diff chỉ đổi locator, mở PR ai-heal, gắn nhãn needs-review, KHÔNG merge. GIAI ĐOẠN GATE: luật assert-not-weakened xác nhận oracle so-tồn-kho còn nguyên; người QA mở PR, xem checklist, xác nhận đây là UI đổi hợp lệ chứ không phải bug, và duyệt. Test tất định còn lại vẫn xanh nên tính năng được merge. Nếu ngược lại API /orders trả 500, agent sẽ phân loại likely_real_bug, chặn heal, giữ đỏ, và người mở bug. Toàn bộ diễn ra trong ngân sách token và mọi thao tác đều có trong log audit.",
        "A developer renames the 'Place order' button to 'Confirm order' and opens a PR. RUN STAGE: the checkout test goes red because the old locator doesn't match; trace and video are saved. HEAL STAGE: the agent reads the trace, sees the button locator broke but the /orders API still returns 201 and inventory drops correctly — classifies it likely_ui_change, proposes a locator-only diff, opens an ai-heal PR, labels it needs-review, does NOT merge. GATE STAGE: the assert-not-weakened rule confirms the inventory-comparison oracle is intact; a QA human opens the PR, reads the checklist, confirms it's a legitimate UI change not a bug, and approves. The remaining deterministic tests stay green so the feature merges. Conversely, had /orders returned 500, the agent would classify it likely_real_bug, block the heal, keep it red, and a human opens a bug. It all happens within token budget and every action is in the audit log.",
        "開発者が「注文する」ボタンを「注文確認」に改名しPRを開く。RUN段階: 古いロケーターが一致せず決済テストが赤くなり、トレースと動画が保存される。HEAL段階: エージェントがトレースを読み、ボタンのロケーターが壊れたが/orders APIはまだ201を返し在庫が正しく減るのを見る——likely_ui_changeと分類し、ロケーターのみの差分を提案し、ai-heal PRを開き、needs-reviewと付箋し、マージしない。GATE段階: assert-not-weakened規則が在庫比較オラクルの無傷を確認。QAの人間がPRを開き、チェックリストを読み、バグでなく正当なUI変更と確認して承認。残りの決定論的テストは緑のままで機能はマージされる。逆に/ordersが500を返していれば、エージェントはlikely_real_bugと分類し、修復を止め、赤に保ち、人間がバグを開く。全てトークン予算内で起き、全操作が監査ログにある。"
      ),
      QA(
        "Ở kịch bản đó, guardrail nào ngăn agent làm điều nguy hiểm nhất, và điều đó là gì?",
        "In that scenario, which guardrail prevents the agent's most dangerous action, and what is it?",
        "Điều nguy hiểm nhất agent có thể làm là 'chữa' test bằng cách nới oracle so-tồn-kho thành một kiểm tra hời hợt rồi tự merge, che một bug thanh toán thật. Hai guardrail chồng lên nhau ngăn việc đó: luật assert-not-weakened chặn diff nào hạ cấp oracle ở tầng CI, và luật không-auto-merge cộng CODEOWNERS bắt buộc một người QA duyệt trước khi bất cứ thay đổi test nào vào nhánh chính. Kể cả nếu agent bị prompt-injection và cố nới oracle, nó vẫn không có quyền merge nên thay đổi độc không thể tự lọt vào. Đó là lý do tôi coi 'không quyền merge' là guardrail không thể nhân nhượng.",
        "The most dangerous thing the agent could do is 'heal' a test by loosening the inventory-comparison oracle into a shallow check and then self-merge, masking a real payment bug. Two overlapping guardrails prevent it: the assert-not-weakened rule blocks any oracle-downgrading diff at the CI layer, and the no-auto-merge rule plus CODEOWNERS forces a QA human to approve before any test change reaches main. Even if the agent were prompt-injected and tried to loosen the oracle, it still has no merge authority so the malicious change can't land on its own. That's why I treat 'no merge authority' as the non-negotiable guardrail.",
        "エージェントができる最も危険なことは、在庫比較オラクルを浅い確認に緩めてテストを「修復」し、自己マージして本物の決済バグを隠すことです。二つの重なるガードレールがそれを防ぎます。assert-not-weakened規則がCI層でオラクルを格下げする差分を阻止し、自動マージ禁止規則とCODEOWNERSがテスト変更がmainに達する前にQAの人間の承認を強制します。エージェントがプロンプトインジェクションされオラクルを緩めようとしても、マージ権限がないので悪意ある変更は自力で載りません。だから私は「マージ権限なし」を妥協不可のガードレールとして扱います。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Góc phỏng vấn: câu hỏi thường gặp về AI trong CI/CD",
      en: "12. Interview angle: common questions about AI in CI/CD",
      ja: "12. 面接の観点: CI/CDにおけるAIのよくある質問",
    },
    blocks: [
      P(
        "Kiến trúc pipeline AI là một chủ đề phỏng vấn (面接) giàu chiều sâu vì nó buộc ứng viên chứng minh cả hiểu biết kỹ thuật lẫn tư duy an toàn. Người phỏng vấn thường không hỏi 'agent hoạt động ra sao' mà hỏi 'nếu agent làm sai thì chuyện gì xảy ra, và anh chặn thế nào'. Dưới đây là các câu hỏi thường gặp cùng khung trả lời, tất cả đều quay về một trục: agent được quyền cơ học rộng nhưng con người giữ quyền phán đoán và merge, và mọi thứ đều có thể audit và rollback.",
        "AI pipeline architecture is a deep interview topic because it forces candidates to prove both technical understanding and safety thinking. Interviewers usually don't ask 'how does the agent work' but 'what happens if the agent does something wrong, and how do you prevent it'. Below are common questions with answer frames, all returning to one axis: the agent has broad mechanical authority but humans keep judgment and merge authority, and everything is auditable and reversible.",
        "AIパイプライン設計は深い面接テーマです。候補者に技術理解と安全思考の両方を証明させるからです。面接官は通常「エージェントはどう動くか」ではなく「エージェントが誤ったら何が起き、どう防ぐか」を問います。以下はよくある質問と回答フレームで、全て一つの軸に戻ります。エージェントは広い機械的権限を持つが人間は判断とマージ権限を保ち、全ては監査可能でロールバック可能です。"
      ),
      UL(
        [
          "'Agent tự merge test được không?' — Không bao giờ. Đây là guardrail sống còn.",
          "'Non-determinism xử lý sao?' — Bao trong lớp tất định; agent không gác cổng.",
          "'Chi phí token kiểm soát sao?' — Cap, cache, chỉ heal khi fail, alert chi tiêu.",
          "'Bảo mật khi agent vào repo?' — Runner quyền thấp, token ephemeral, whitelist, chống injection.",
          "'Rollback thế nào?' — Mọi thay đổi là PR có commit; revert như bình thường.",
        ],
        [
          "'Can the agent self-merge tests?' — Never. This is the vital guardrail.",
          "'How do you handle non-determinism?' — Wrap in a deterministic shell; agents don't gate.",
          "'How is token cost controlled?' — Cap, cache, heal-only-on-failure, spend alerts.",
          "'Security when agents access the repo?' — Low-privilege runner, ephemeral tokens, whitelist, injection defense.",
          "'How do you roll back?' — Every change is a committed PR; revert as normal.",
        ],
        [
          "「エージェントはテストを自己マージできるか?」——決して。これが生死のガードレール。",
          "「非決定性はどう扱うか?」——決定論的な殻で包む。エージェントはゲートしない。",
          "「トークンコストはどう制御するか?」——上限、キャッシュ、失敗時のみ修復、支出アラート。",
          "「エージェントがリポジトリに入る際のセキュリティは?」——低権限ランナー、エフェメラルトークン、ホワイトリスト、注入防御。",
          "「どうロールバックするか?」——全変更はコミット付きPR。通常通りリバート。",
        ]
      ),
      QA(
        "Câu hỏi mở: thiết kế một pipeline cho agent tự sinh & tự chữa test an toàn.",
        "Open question: design a pipeline for agents to safely self-generate and self-heal tests.",
        "Tôi dựng bốn giai đoạn generate → run → heal → gate với ranh giới quyền rõ. Generate: agent sinh nháp và verify locator trên staging, quyền chỉ đọc. Run: shard song song, lưu trace, retry có trần cho flaky (回帰 được test tất định bảo vệ). Heal: chạy khi fail, agent phân loại UI-đổi vs bug-thật dựa trên network/API, đề xuất diff, mở PR ai-heal, KHÔNG merge. Gate: luật assert-not-weakened chặn nới oracle, CODEOWNERS bắt người QA duyệt, test tất định gác cổng merge. Bao quanh: token cap và cache để kiểm soát chi phí, runner quyền thấp và token ephemeral để bảo mật, whitelist domain chống injection, trace 14–30 ngày để audit, và rollback bằng revert PR. Nguyên tắc xuyên suốt: agent rộng ở việc cơ học, hẹp ở phán đoán, và tuyệt đối không có quyền merge.",
        "I build four stages generate → run → heal → gate with clear authority boundaries. Generate: the agent drafts and verifies locators on staging, read-only. Run: parallel sharding, save traces, bounded retries for flakes (regression protected by deterministic tests). Heal: runs on failure, the agent classifies UI-change vs real-bug from network/API, proposes a diff, opens an ai-heal PR, does NOT merge. Gate: the assert-not-weakened rule blocks oracle loosening, CODEOWNERS forces QA approval, deterministic tests gate merges. Around it: token cap and cache for cost control, low-privilege runner and ephemeral tokens for security, domain whitelist against injection, 14–30 day traces for audit, and rollback via PR revert. The through-line: the agent is broad on mechanical work, narrow on judgment, and absolutely without merge authority.",
        "私はgenerate→run→heal→gateの四段を明確な権限境界で構築します。Generate: エージェントがステージングで下書きしロケーターを検証、読み取り専用。Run: 並列シャーディング、トレース保存、フレーキーに上限付きリトライ(回帰は決定論的テストが保護)。Heal: 失敗時に実行、エージェントがnetwork/APIからUI変更vs本物のバグを分類、差分を提案、ai-heal PRを開く、マージしない。Gate: assert-not-weakened規則がオラクル緩和を阻止、CODEOWNERSがQA承認を強制、決定論的テストがマージをゲート。周囲: コスト制御にトークン上限とキャッシュ、セキュリティに低権限ランナーとエフェメラルトークン、注入対策にドメインホワイトリスト、監査に14〜30日のトレース、PRリバートでロールバック。一貫する原則: エージェントは機械的作業に広く、判断に狭く、マージ権限は絶対になし。"
      ),
      TIP(
        "Trong phỏng vấn thiết kế pipeline, luôn vẽ ranh giới quyền trước, rồi mới tối ưu tốc độ và chi phí. Người phỏng vấn chấm tư duy an toàn cao hơn sự khéo léo kỹ thuật.",
        "In a pipeline-design interview, always draw the authority boundaries first, then optimize speed and cost. Interviewers grade safety thinking above technical cleverness.",
        "パイプライン設計の面接では、常に権限境界を先に描き、その後で速度とコストを最適化します。面接官は技術的巧妙さより安全思考を高く評価します。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết: agent trong pipeline, con người ở cổng",
      en: "13. Summary: agents in the pipeline, humans at the gate",
      ja: "13. まとめ: パイプラインにエージェント、ゲートに人間",
    },
    blocks: [
      P(
        "Đưa agent tự sinh và tự chữa test vào CI/CD là một bước tiến năng suất lớn, nhưng chỉ an toàn khi được bọc trong kiến trúc có kỷ luật. Bốn giai đoạn generate → run → heal → gate tách bạch trách nhiệm; guardrail không-auto-merge cộng review của con người giữ agent không thể tự đưa thay đổi độc vào nhánh chính; sharding giữ pipeline nhanh; kiểm soát token giữ chi phí trong tầm; sandbox và token ephemeral giữ bảo mật; và mọi thay đổi là một PR có thể revert. Xuyên suốt, con người giữ quyền phán đoán và quyền merge, còn agent nhận phần cơ học. Thiết kế đúng biến một hệ thống không tất định thành một trợ thủ đáng tin cậy trong dây chuyền.",
        "Bringing self-generating, self-healing agents into CI/CD is a large productivity leap, but only safe when wrapped in a disciplined architecture. The four stages generate → run → heal → gate separate responsibilities; the no-auto-merge guardrail plus human review keeps the agent from landing malicious changes on main; sharding keeps the pipeline fast; token control keeps cost in check; sandboxing and ephemeral tokens keep it secure; and every change is a revertible PR. Throughout, humans keep judgment and merge authority while the agent takes the mechanical part. The right design turns a non-deterministic system into a trustworthy assistant in the pipeline.",
        "自己生成・自己修復するエージェントをCI/CDに導入することは大きな生産性の飛躍ですが、規律ある設計で包まれて初めて安全です。generate→run→heal→gateの四段が責任を分け、自動マージ禁止ガードレールと人間のレビューがエージェントに悪意ある変更をmainへ載せさせず、シャーディングがパイプラインを速く保ち、トークン制御がコストを抑え、サンドボックスとエフェメラルトークンが安全を保ち、全変更はリバート可能なPRです。全体を通じて人間が判断とマージ権限を保ち、エージェントが機械的部分を担います。正しい設計は非決定論的システムをパイプライン内の信頼できる助手に変えます。"
      ),
      UL(
        [
          "Kiến trúc: generate → run → heal → gate, mỗi giai đoạn một guardrail.",
          "Agent KHÔNG bao giờ merge; mọi thay đổi qua PR có CODEOWNERS duyệt.",
          "Non-determinism bọc trong lớp tất định; agent không gác cổng merge.",
          "Chi phí: cap token, cache, chỉ heal khi fail; bảo mật: runner quyền thấp, token ephemeral.",
          "Rollback = revert PR; phân biệt UI-đổi với bug-thật bằng bằng chứng network/API.",
        ],
        [
          "Architecture: generate → run → heal → gate, one guardrail per stage.",
          "The agent NEVER merges; every change goes through a CODEOWNERS-reviewed PR.",
          "Non-determinism wrapped in a deterministic shell; agents don't gate merges.",
          "Cost: token cap, cache, heal-only-on-failure; security: low-privilege runner, ephemeral tokens.",
          "Rollback = PR revert; distinguish UI-change from real-bug via network/API evidence.",
        ],
        [
          "設計: generate→run→heal→gate、各段に一つのガードレール。",
          "エージェントは決してマージしない。全変更はCODEOWNERSレビュー済みPRを通る。",
          "非決定性は決定論的な殻で包む。エージェントはマージをゲートしない。",
          "コスト: トークン上限、キャッシュ、失敗時のみ修復。セキュリティ: 低権限ランナー、エフェメラルトークン。",
          "ロールバック=PRリバート。UI変更と本物のバグをnetwork/API証拠で区別。",
        ]
      ),
      NOTE(
        "Kết hợp bài này với bài 'AI QA Strategy & Metrics' cùng module: bài kia cho bạn khung chiến lược và chỉ số để quyết định; bài này cho bạn kiến trúc pipeline để thực thi quyết định đó một cách an toàn và đo được.",
        "Pair this with the 'AI QA Strategy & Metrics' article in the same module: that one gives you the strategy frame and metrics to decide; this one gives you the pipeline architecture to execute that decision safely and measurably.",
        "本記事を同じモジュールの「AI QA戦略と指標」の記事と組み合わせてください。あちらは判断のための戦略フレームと指標を、本記事はその判断を安全かつ測定可能に実行するパイプライン設計を与えます。"
      ),
    ],
  },
];

const artA = {
  categorySlug: "ai-in-testing",
  slug: "ai-testing-strategy-metrics-interview",
  cover: coverA,
  tags: tags("phongvan", "saas", "aitesting", "interview", "advanced", "experience"),
  title: {
    vi: "Chiến lược & chỉ số AI trong kiểm thử — góc phỏng vấn chuyên sâu (2026)",
    en: "AI test strategy & metrics — the deep interview angle (2026)",
    ja: "AIテストの戦略と指標 — 深い面接の観点(2026)",
  },
  summary: {
    vi: "Bài phỏng vấn chuyên sâu về CHIẾN LƯỢC & CHỈ SỐ AI trong kiểm thử: AI hợp tầng nào của kim tự tháp, tự động-với-AI vs giữ con người, ưu tiên theo rủi ro, chỉ số (coverage, escape rate, flaky, heal rate, eval, chi phí/độ trễ), business case, đưa AI vào đội, cạm bẫy. 9 câu hỏi kèm câu trả lời mẫu, phần 'người phỏng vấn tìm gì', và kịch bản.",
    en: "A deep interview article on AI test STRATEGY & METRICS: where AI fits the pyramid, automate-with-AI vs keep-human, risk-based prioritization, metrics (coverage, escape rate, flaky, heal rate, eval, cost/latency), the business case, team adoption, pitfalls. Nine questions with model answers, 'what interviewers look for', and a scenario.",
    ja: "AIテストの戦略と指標に関する深い面接記事: AIがピラミッドのどこに合うか、AIで自動化vs人間を残す、リスクベースの優先順位、指標(カバレッジ、エスケープ率、フレーキー、修復率、評価、コスト/レイテンシ)、ビジネスケース、チーム導入、落とし穴。模範解答付き9問、「面接官が見るポイント」、シナリオ。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "ai-in-testing",
  slug: "ai-cicd-agent-generate-heal-pipeline",
  cover: coverB,
  tags: tags("tichhop", "saas", "aitesting", "cicd", "advanced", "realworld"),
  title: {
    vi: "AI trong CI/CD: agent tự sinh & tự chữa test trong pipeline (2026)",
    en: "AI in CI/CD: agents that self-generate & self-heal tests in the pipeline (2026)",
    ja: "CI/CDにおけるAI: パイプライン内でテストを自己生成・自己修復するエージェント(2026)",
  },
  summary: {
    vi: "Tích hợp agent AI vào CI/CD: kiến trúc pipeline bốn giai đoạn generate → run → heal → gate, guardrail để agent KHÔNG merge thay đổi chưa review, cổng duyệt con người, sharding/song song, lưu trace, kiểm soát chi phí token, xử lý non-determinism, bảo mật khi cho agent quyền repo/browser, rollback, và góc phỏng vấn.",
    en: "Integrating AI agents into CI/CD: the four-stage pipeline generate → run → heal → gate, guardrails so the agent CANNOT merge unreviewed changes, human approval gates, sharding/parallelism, trace retention, token cost control, non-determinism handling, security of granting agents repo/browser access, rollback, and the interview angle.",
    ja: "AIエージェントをCI/CDに統合: 四段パイプラインgenerate→run→heal→gate、エージェントが未レビュー変更をマージできないガードレール、人間の承認ゲート、シャーディング/並列、トレース保持、トークンコスト制御、非決定性への対処、リポジトリ/ブラウザ権限付与のセキュリティ、ロールバック、面接の観点。",
  },
  pages: buildDoc(pagesB),
};

export const AI_DOCS_09 = [artA, artB];
