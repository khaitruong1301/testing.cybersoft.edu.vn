// ============================================================================
// AI_DOCS_02 — 2 bài "AI trong kiểm thử" (kind=congnghe).
// A: Dùng LLM sinh test case & dữ liệu test tổng hợp (an toàn, grounding, không PII).
// B: AI self-healing locator + guardrails (Playwright Healer, đo flaky vs che bug).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "ai02a", domain: "ecommerce", kind: "congnghe", label: "LLM TEST GEN" });
const coverB = makeThumb({ id: "ai02b", domain: "saas", kind: "congnghe", label: "SELF-HEALING" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn)
// ---------------------------------------------------------------------------
const SVG_AC_TO_TABLE = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#2a0845"/>
<rect x="30" y="50" width="170" height="90" rx="10" fill="#3b0764" stroke="#c084fc" stroke-width="2"/>
<text x="115" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#f3e8ff">Acceptance Criteria</text>
<text x="115" y="102" text-anchor="middle" font-size="10.5" fill="#e9d5ff">yêu cầu nghiệp vụ thật</text>
<text x="115" y="120" text-anchor="middle" font-size="10.5" fill="#e9d5ff">(grounding, không bịa)</text>
<rect x="235" y="50" width="170" height="90" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="320" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#e0e7ff">LLM + Prompt</text>
<text x="320" y="102" text-anchor="middle" font-size="10.5" fill="#c7d2fe">EP + BVA + adversarial</text>
<text x="320" y="120" text-anchor="middle" font-size="10.5" fill="#c7d2fe">template tái sử dụng</text>
<rect x="440" y="50" width="170" height="90" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="525" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#ccfbf1">Bảng test case</text>
<text x="525" y="102" text-anchor="middle" font-size="10.5" fill="#5eead4">positive · negative</text>
<text x="525" y="120" text-anchor="middle" font-size="10.5" fill="#5eead4">boundary · dữ liệu</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arT)"><path d="M200 95 h33"/><path d="M405 95 h33"/></g>
<defs><marker id="arT" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="30" y="170" width="580" height="46" rx="8" fill="#111827" stroke="#7c2d92"/>
<text x="320" y="190" text-anchor="middle" font-size="12" fill="#f5d0fe">Con người: review · thêm case domain AI bỏ sót · chốt oracle nghiệp vụ</text>
<text x="320" y="208" text-anchor="middle" font-size="11" fill="#a78bca">AI: liệt kê case cơ học nhanh — luôn cần người thẩm định</text>
<rect x="30" y="228" width="580" height="52" rx="8" fill="#3f1d38" stroke="#f472b6"/>
<text x="320" y="250" text-anchor="middle" font-size="12" font-weight="700" fill="#fbcfe8">CẤM: dán PII / secret / dữ liệu khách thật vào prompt LLM</text>
<text x="320" y="268" text-anchor="middle" font-size="10.5" fill="#f9a8d4">chỉ dùng dữ liệu tổng hợp / ẩn danh</text>
</svg>`;

const SVG_EP_BVA = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#1a0730"/>
<text x="320" y="32" text-anchor="middle" font-size="15" font-weight="800" fill="#f3e8ff">Phân hoạch tương đương + Giá trị biên (tuổi 18–65)</text>
<line x1="60" y1="150" x2="580" y2="150" stroke="#64748b" stroke-width="2"/>
<g font-size="11" fill="#cbd5e1">
<line x1="180" y1="140" x2="180" y2="160" stroke="#f87171" stroke-width="3"/><text x="180" y="180" text-anchor="middle" fill="#fca5a5">17</text>
<line x1="220" y1="140" x2="220" y2="160" stroke="#34d399" stroke-width="3"/><text x="220" y="180" text-anchor="middle" fill="#6ee7b7">18</text>
<line x1="420" y1="140" x2="420" y2="160" stroke="#34d399" stroke-width="3"/><text x="420" y="180" text-anchor="middle" fill="#6ee7b7">65</text>
<line x1="460" y1="140" x2="460" y2="160" stroke="#f87171" stroke-width="3"/><text x="460" y="180" text-anchor="middle" fill="#fca5a5">66</text>
</g>
<rect x="60" y="120" width="120" height="30" fill="#7f1d1d" opacity="0.5"/>
<text x="120" y="112" text-anchor="middle" font-size="11" fill="#fecaca">Invalid (&lt;18)</text>
<rect x="180" y="120" width="240" height="30" fill="#065f46" opacity="0.5"/>
<text x="300" y="112" text-anchor="middle" font-size="11" fill="#a7f3d0">Valid [18..65]</text>
<rect x="460" y="120" width="120" height="30" fill="#7f1d1d" opacity="0.5"/>
<text x="520" y="112" text-anchor="middle" font-size="11" fill="#fecaca">Invalid (&gt;65)</text>
<text x="320" y="230" text-anchor="middle" font-size="12" fill="#e9d5ff">Case biên bắt buộc: 17, 18, 19 · 64, 65, 66 — chỗ bug hay ẩn nấp</text>
<text x="320" y="252" text-anchor="middle" font-size="11" fill="#c084fc">1 đại diện mỗi lớp + mọi biên = phủ tối đa với số case tối thiểu</text>
</svg>`;

const SVG_HEAL_FLOW = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0c4a6e"/>
<rect x="30" y="40" width="150" height="66" rx="9" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
<text x="105" y="68" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Locator fail</text>
<text x="105" y="88" text-anchor="middle" font-size="10" fill="#7dd3fc">#submit-btn không thấy</text>
<rect x="245" y="40" width="150" height="66" rx="9" fill="#155e63" stroke="#2dd4bf" stroke-width="2"/>
<text x="320" y="62" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">AI đoán thay thế</text>
<text x="320" y="80" text-anchor="middle" font-size="10" fill="#5eead4">role/label/text lân cận</text>
<text x="320" y="96" text-anchor="middle" font-size="10" fill="#5eead4">điểm tin cậy (score)</text>
<rect x="460" y="40" width="150" height="66" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="535" y="68" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">Guardrail</text>
<text x="535" y="88" text-anchor="middle" font-size="10" fill="#a5b4fc">ngưỡng · duyệt · log</text>
<g stroke="#bae6fd" stroke-width="2.5" fill="none" marker-end="url(#arH)"><path d="M180 73 h60"/><path d="M395 73 h60"/></g>
<defs><marker id="arH" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#bae6fd"/></marker></defs>
<rect x="70" y="150" width="220" height="54" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="180" y="172" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">score cao + rõ ràng</text>
<text x="180" y="192" text-anchor="middle" font-size="10.5" fill="#a7f3d0">→ heal, log sự kiện, chờ người duyệt</text>
<rect x="350" y="150" width="220" height="54" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="460" y="172" text-anchor="middle" font-size="12" font-weight="800" fill="#fca5a5">score thấp / mơ hồ</text>
<text x="460" y="192" text-anchor="middle" font-size="10.5" fill="#fecaca">→ FAIL loudly, KHÔNG che, báo người</text>
<path d="M320 106 v22 M180 150 L280 128 M460 150 L360 128" stroke="#94a3b8" stroke-width="2" fill="none"/>
<rect x="70" y="228" width="500" height="52" rx="8" fill="#082f49" stroke="#0ea5e9"/>
<text x="320" y="250" text-anchor="middle" font-size="12" fill="#bae6fd">Đo lường: heal đúng vs heal che bug thật · tỉ lệ flaky giảm bao nhiêu</text>
<text x="320" y="268" text-anchor="middle" font-size="10.5" fill="#7dd3fc">self-heal là tấm đệm tạm — không thay locator bền + POM</text>
</svg>`;

const SVG_LOCATOR_LADDER = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#082f49"/>
<text x="320" y="32" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">Thang ưu tiên locator (bền → giòn)</text>
<g font-size="12">
<rect x="60" y="52" width="520" height="34" rx="6" fill="#065f46" stroke="#34d399"/><text x="76" y="74" fill="#a7f3d0" font-weight="700">1. getByRole('button', { name: 'Đặt hàng' }) — ngữ nghĩa, hợp a11y</text>
<rect x="90" y="94" width="490" height="34" rx="6" fill="#0f766e" stroke="#2dd4bf"/><text x="106" y="116" fill="#99f6e4" font-weight="700">2. getByLabel('Email') / getByPlaceholder — theo nhãn người đọc</text>
<rect x="120" y="136" width="460" height="34" rx="6" fill="#155e63" stroke="#5eead4"/><text x="136" y="158" fill="#a5f3fc" font-weight="700">3. getByTestId('checkout-submit') — hợp đồng test rõ ràng</text>
<rect x="150" y="178" width="430" height="34" rx="6" fill="#7c2d12" stroke="#fb923c"/><text x="166" y="200" fill="#fed7aa">4. CSS class / cấu trúc DOM — giòn, dễ vỡ khi refactor</text>
<rect x="180" y="220" width="400" height="34" rx="6" fill="#7f1d1d" stroke="#f87171"/><text x="196" y="242" fill="#fecaca">5. XPath tuyệt đối /html/body/div[3]/... — TRÁNH, cực giòn</text>
</g>
</svg>`;

// ===========================================================================
// ARTICLE A — LLM sinh test case & dữ liệu test tổng hợp
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Vì sao dùng LLM để sinh test case và dữ liệu test",
      en: "1. Why use LLMs to generate test cases and test data",
      ja: "1. なぜ LLM でテストケースとテストデータを生成するのか",
    },
    blocks: [
      P(
        "Viết test case đầy đủ từ một bộ tiêu chí chấp nhận (acceptance criteria) là công việc tỉ mỉ và dễ bỏ sót: một người mệt mỏi thường chỉ nghĩ ra vài case happy path, quên mất các nhánh âm và các giá trị biên. Mô hình ngôn ngữ lớn (LLM) rất giỏi phần liệt kê cơ học này — nó có thể trong vài giây bung ra một bảng case dương, âm và biên từ cùng một mô tả yêu cầu. Với người kiểm thử, đây là công cụ tăng tốc mạnh nếu dùng đúng cách và giữ đúng ranh giới an toàn.",
        "Writing a complete set of test cases from acceptance criteria is meticulous and easy to under-cover: a tired person usually thinks of a few happy-path cases and forgets the negative branches and boundary values. A large language model (LLM) is very good at this mechanical enumeration — in seconds it can unfold a table of positive, negative and boundary cases from the same requirement. For a tester this is a powerful accelerator, provided it is used correctly and kept within safety boundaries.",
        "受け入れ基準(アクセプタンスクライテリア)から完全なテストケースを書くのは緻密で網羅漏れが起きやすい作業です。疲れた人はハッピーパスをいくつか思いつくだけで、否定分岐や境界値を忘れがちです。大規模言語モデル(LLM)はこの機械的な列挙が非常に得意で、同じ要件から数秒で正常系・異常系・境界のテストケース表を展開できます。テスターにとって、正しく使い安全境界を守れば強力な加速装置になります。"
      ),
      P(
        "Nhưng phải nói rõ ngay từ đầu: LLM là trợ lý sinh nháp, không phải nguồn chân lý. Nó có thể bịa ra (hallucination) những case không tồn tại trong hệ thống, hoặc bỏ sót những case đặc thù domain mà chỉ người trong cuộc mới biết. Vì vậy quy trình đúng luôn là: grounding trên yêu cầu thật, LLM sinh nháp, con người thẩm định và bổ sung. AI làm phần rộng và nhanh; người giữ phần sâu và chịu trách nhiệm.",
        "But let us be clear from the start: an LLM is a draft-generating assistant, not a source of truth. It can hallucinate cases that do not exist in the system, or miss domain-specific cases only insiders know. So the correct process is always: ground on real requirements, let the LLM draft, have a human validate and augment. The AI handles breadth and speed; the human keeps depth and accountability.",
        "しかし最初にはっきりさせましょう。LLM は下書きを生成するアシスタントであり、真実の源ではありません。システムに存在しないケースをハルシネーションで捏造したり、内部者だけが知るドメイン固有のケースを見落としたりします。よって正しいプロセスは常に、実要件にグラウンディングし、LLM に下書きさせ、人間が検証・補強することです。AI が幅と速度を担い、人間が深さと説明責任を保ちます。"
      ),
      IMG(
        SVG_AC_TO_TABLE,
        "Từ acceptance criteria đến bảng test case, với ranh giới an toàn.",
        "From acceptance criteria to a test-case table, with safety boundaries.",
        "受け入れ基準からテストケース表へ、安全境界とともに。"
      ),
      NOTE(
        "LLM tăng tốc phần liệt kê, không thay tư duy kiểm thử. Bạn vẫn cần hiểu phân hoạch tương đương, giá trị biên và oracle nghiệp vụ để review nháp AI sinh.",
        "The LLM accelerates enumeration, not testing judgment. You still need equivalence partitioning, boundary values and business oracles to review AI drafts.",
        "LLM は列挙を加速しますが、テストの判断を置き換えません。AI の下書きをレビューするには、同値分割・境界値・業務オラクルの理解が今も必要です。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Grounding: bám vào yêu cầu thật để tránh hallucination",
      en: "2. Grounding: anchoring to real requirements to avoid hallucination",
      ja: "2. グラウンディング: 実要件に接地しハルシネーションを避ける",
    },
    blocks: [
      P(
        "Hallucination là hiện tượng LLM tự tin bịa ra thông tin không có thật. Trong kiểm thử, nó biểu hiện thành những case cho tính năng không tồn tại, những thông báo lỗi sai chữ, hay những luồng nghiệp vụ tưởng tượng. Cách phòng chống hiệu quả nhất là grounding: dán chính xác acceptance criteria, mô tả trường dữ liệu, bảng trạng thái và ràng buộc thật vào prompt, rồi yêu cầu LLM chỉ sinh case dựa trên đó và đánh dấu rõ khi nó phải suy đoán.",
        "Hallucination is when an LLM confidently fabricates information that isn't real. In testing it shows up as cases for non-existent features, wrong error-message text, or imaginary business flows. The most effective defense is grounding: paste the exact acceptance criteria, field descriptions, state tables and real constraints into the prompt, then require the LLM to generate cases only from those and to flag clearly when it must guess.",
        "ハルシネーションとは、LLM が実在しない情報を自信を持って捏造する現象です。テストでは、存在しない機能のケース、誤った文言のエラーメッセージ、架空の業務フローとして現れます。最も効果的な防御はグラウンディングです。正確な受け入れ基準、項目説明、状態表、実際の制約をプロンプトに貼り、それらのみに基づいてケースを生成させ、推測が必要な箇所を明示させます。"
      ),
      CODE(
        "text",
        `# PROMPT có grounding — nêu rõ nguồn sự thật, cấm bịa
Bạn là kỹ sư QA. CHỈ sinh test case dựa trên các yêu cầu dưới đây.
Nếu thiếu thông tin, hãy liệt kê "GIẢ ĐỊNH" thay vì bịa.

## Acceptance Criteria (nguồn sự thật)
- Trường "Tuổi": số nguyên, hợp lệ 18..65 (bao gồm cả 18 và 65).
- Ngoài khoảng -> báo lỗi "Tuổi phải từ 18 đến 65".
- Trường bỏ trống -> báo lỗi "Vui lòng nhập tuổi".

## Yêu cầu đầu ra
Bảng Markdown: | ID | Loại (positive/negative/boundary) | Input | Kỳ vọng |
Áp dụng phân hoạch tương đương + phân tích giá trị biên.
Đánh dấu [SUY ĐOÁN] cho bất kỳ dòng nào không suy ra trực tiếp từ AC.`
      ),
      P(
        "Chú ý cụm 'nếu thiếu thông tin, hãy liệt kê GIẢ ĐỊNH thay vì bịa'. Đây là mẹo prompt quan trọng: bạn cho LLM một lối thoát trung thực, để nó bộc lộ chỗ nó không chắc thay vì lấp liếm bằng thông tin sai. Khi review, bạn xem những dòng [SUY ĐOÁN] trước tiên — đó chính là nơi rủi ro hallucination cao nhất và nơi kiến thức domain của bạn cần can thiệp.",
        "Note the phrase 'if information is missing, list ASSUMPTIONS rather than fabricate'. This is an important prompt trick: you give the LLM an honest escape hatch to surface uncertainty instead of papering over it with wrong facts. When reviewing, you read the [ASSUMPTION] lines first — that is exactly where hallucination risk is highest and where your domain knowledge must step in.",
        "「情報が不足していれば捏造せず前提を列挙せよ」という一文に注目してください。これは重要なプロンプトのコツです。誤った事実で取り繕う代わりに、不確かさを表に出す正直な逃げ道を LLM に与えます。レビュー時はまず[前提]の行を読みます。そこがハルシネーションのリスクが最も高く、あなたのドメイン知識が介入すべき場所です。"
      ),
      WARN(
        "Đừng để LLM 'suy ra' thông báo lỗi hay quy tắc nghiệp vụ. Nếu prompt không có wording chính xác, nó sẽ đoán — và test dựa trên chuỗi bịa sẽ luôn đỏ hoặc luôn xanh sai.",
        "Don't let the LLM 'infer' error messages or business rules. If the prompt lacks exact wording, it will guess — and tests built on fabricated strings will be perpetually red or falsely green.",
        "LLM にエラーメッセージや業務ルールを「推測」させないでください。プロンプトに正確な文言がなければ推測し、捏造された文字列に基づくテストは常に赤か、誤ってグリーンになります。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Mẫu prompt sinh bảng case dương/âm/biên",
      en: "3. Prompt patterns that produce positive/negative/boundary tables",
      ja: "3. 正常系・異常系・境界の表を生む プロンプトパターン",
    },
    blocks: [
      P(
        "Một prompt tốt có cấu trúc rõ ràng: vai trò, nguồn sự thật, kỹ thuật thiết kế test cần áp dụng, và định dạng đầu ra. Khi bạn yêu cầu cụ thể 'phân hoạch tương đương và phân tích giá trị biên', LLM không chỉ liệt kê ngẫu nhiên mà bám theo phương pháp có kỷ luật. Kết quả nên là một bảng có cột phân loại (positive/negative/boundary) để bạn dễ kiểm độ phủ và phát hiện lỗ hổng.",
        "A good prompt has clear structure: role, source of truth, the test-design techniques to apply, and the output format. When you specifically ask for 'equivalence partitioning and boundary value analysis', the LLM doesn't just list randomly but follows a disciplined method. The result should be a table with a category column (positive/negative/boundary) so you can easily check coverage and spot gaps.",
        "良いプロンプトは明確な構造を持ちます。役割、真実の源、適用すべきテスト設計技法、出力フォーマットです。「同値分割と境界値分析」を具体的に求めると、LLM はランダムに列挙するのではなく規律ある手法に従います。結果は分類列(正常系/異常系/境界)を持つ表であるべきで、網羅性の確認と抜けの発見が容易になります。"
      ),
      CODE(
        "md",
        `<!-- Đầu ra LLM sinh cho trường "Tuổi" (18..65) — người review sau -->
| ID   | Loại      | Input | Kỳ vọng                                |
|------|-----------|-------|----------------------------------------|
| T01  | positive  | 18    | Chấp nhận (biên dưới)                   |
| T02  | positive  | 42    | Chấp nhận (giá trị đại diện lớp hợp lệ) |
| T03  | positive  | 65    | Chấp nhận (biên trên)                   |
| T04  | boundary  | 17    | Lỗi "Tuổi phải từ 18 đến 65"           |
| T05  | boundary  | 19    | Chấp nhận (cạnh trong biên dưới)        |
| T06  | boundary  | 64    | Chấp nhận (cạnh trong biên trên)        |
| T07  | boundary  | 66    | Lỗi "Tuổi phải từ 18 đến 65"           |
| T08  | negative  | 0     | Lỗi "Tuổi phải từ 18 đến 65"           |
| T09  | negative  | -5    | Lỗi (số âm)                            |
| T10  | negative  | (trống)| Lỗi "Vui lòng nhập tuổi"               |
| T11  | negative  | "abc" | Lỗi (không phải số)                    |
| T12  | negative  | 42.5  | Lỗi (không phải số nguyên)             |`
      ),
      P(
        "Bảng trên cho thấy giá trị của việc yêu cầu đúng phương pháp: các biên 17/18/19 và 64/65/66 xuất hiện đầy đủ — đúng chỗ bug thường ẩn nấp (lỗi off-by-one, dùng '<' thay vì '<='). Nếu chỉ bảo LLM 'cho tôi vài test case', bạn sẽ nhận một danh sách hời hợt thiếu biên. Prompt càng nêu rõ kỹ thuật, độ phủ càng cao mà không phình số case vô ích.",
        "The table above shows the value of asking for the right method: the boundaries 17/18/19 and 64/65/66 all appear — exactly where bugs hide (off-by-one, using '<' instead of '<='). If you only tell the LLM 'give me some test cases', you get a shallow list missing boundaries. The more the prompt names techniques, the higher the coverage without inflating case count uselessly.",
        "上の表は、正しい手法を求めることの価値を示します。境界 17/18/19 と 64/65/66 がすべて現れます。まさにバグが潜む場所(オフバイワン、'<=' の代わりに '<')です。LLM に「テストケースをいくつか」とだけ言うと、境界を欠いた浅いリストが返ります。プロンプトが技法を明示するほど、無駄にケース数を膨らませずに網羅性が高まります。"
      ),
      TIP(
        "Yêu cầu LLM thêm cột 'lý do chọn' cho mỗi biên. Nó buộc mô hình giải thích, giúp bạn phát hiện case bịa (lý do vô nghĩa) ngay khi đọc lướt.",
        "Ask the LLM to add a 'reason for selection' column for each boundary. It forces the model to explain, helping you spot fabricated cases (nonsense reasons) at a glance.",
        "各境界に「選定理由」の列を LLM に追加させましょう。モデルに説明を強制し、捏造ケース(意味不明な理由)を一目で見抜けます。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Phân hoạch tương đương + giá trị biên cùng AI",
      en: "4. Equivalence partitioning + boundary value analysis with AI",
      ja: "4. AI と行う 同値分割 + 境界値分析",
    },
    blocks: [
      P(
        "Phân hoạch tương đương (EP) chia miền đầu vào thành các lớp mà mọi giá trị trong cùng lớp được xử lý như nhau; ta chỉ cần một đại diện mỗi lớp. Phân tích giá trị biên (BVA) tập trung vào ranh giới giữa các lớp, nơi lỗi hay xuất hiện nhất. Hai kỹ thuật kinh điển này chính là bộ khung để chỉ đạo LLM: bạn mô tả miền đầu vào, LLM đề xuất các lớp và các biên, còn bạn kiểm rằng nó không bỏ sót lớp nào và các biên đúng inclusive/exclusive.",
        "Equivalence partitioning (EP) splits the input domain into classes where every value in a class is handled the same; you need only one representative per class. Boundary value analysis (BVA) focuses on the borders between classes, where bugs appear most. These two classic techniques are the frame for steering the LLM: you describe the input domain, the LLM proposes classes and boundaries, and you verify it missed no class and got inclusive/exclusive boundaries right.",
        "同値分割(EP)は入力領域を、同一クラス内のあらゆる値が同じに扱われるクラスへ分けます。各クラスに代表値一つで足ります。境界値分析(BVA)はクラス間の境界に注目し、そこにバグが最も多く現れます。この二つの古典技法が LLM を導く枠組みです。入力領域を記述し、LLM がクラスと境界を提案し、あなたはクラスの見落としがないか、境界の以上・未満が正しいかを検証します。"
      ),
      IMG(
        SVG_EP_BVA,
        "EP + BVA trực quan: mỗi lớp một đại diện, mọi biên đều phải kiểm.",
        "EP + BVA visualized: one representative per class, every boundary tested.",
        "EP + BVA の可視化: 各クラスに代表一つ、すべての境界を検証。"
      ),
      P(
        "Điểm dễ sai mà bạn phải soi khi review nháp AI: biên đóng hay mở. Yêu cầu ghi '18..65 bao gồm cả 18 và 65' nghĩa là 18 và 65 hợp lệ, 17 và 66 không; nhưng nếu wording là 'dưới 66' thì 65 hợp lệ mà cách diễn đạt khác đi. LLM đôi khi lẫn lộn chỗ này. Con người phải đối chiếu từng biên với văn bản yêu cầu gốc — đây là loại lỗi mà một test 'xanh' vẫn không bắt được nếu chính test cũng hiểu sai biên.",
        "The easy-to-get-wrong point you must scrutinize in AI drafts: closed vs open boundaries. A requirement stating '18..65 inclusive' means 18 and 65 are valid, 17 and 66 are not; but 'under 66' phrasing keeps 65 valid while reading differently. The LLM sometimes confuses this. Humans must check each boundary against the original requirement text — this is the kind of bug a 'green' test won't catch if the test itself misread the boundary.",
        "AI の下書きで精査すべき、間違えやすい点は境界の開閉です。「18..65 を含む」という要件は 18 と 65 が有効で 17 と 66 は無効を意味します。一方「66 未満」という表現は 65 を有効に保ちつつ読み方が異なります。LLM はここを時々混同します。人間は各境界を元の要件テキストと照合せねばなりません。テスト自体が境界を誤読していれば、「グリーン」なテストでも捕えられない種類のバグです。"
      ),
      QA(
        "Vì sao vẫn phải kiểm biên thủ công khi AI đã liệt kê biên?",
        "Why still check boundaries manually when the AI already listed them?",
        "Vì AI liệt kê biên theo mẫu hình chung, còn tính đóng/mở của biên (inclusive vs exclusive) và các quy tắc đặc thù domain (ví dụ 'tuổi tính theo ngày sinh tại thời điểm giao dịch') do văn bản yêu cầu và nghiệp vụ quyết định. AI dễ suy diễn sai wording. Người đối chiếu biên với AC gốc để chắc test kiểm đúng ranh giới thật, không phải ranh giới AI tưởng tượng.",
        "Because the AI lists boundaries by generic pattern, while the inclusive/exclusive nature of a boundary and domain-specific rules (e.g. 'age computed from birth date at transaction time') are decided by the requirement text and business. The AI easily misreads wording. Humans reconcile boundaries against the original AC to ensure tests check the real border, not the AI's imagined one.",
        "AI は一般的なパターンで境界を列挙しますが、境界の以上・未満の性質やドメイン固有ルール(例:「年齢は取引時点の生年月日で算出」)は要件テキストと業務が決めます。AI は文言を誤読しがちです。人間は境界を元の受け入れ基準と照合し、AI の想像した境界ではなく本物の境界をテストが検証することを保証します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. TUYỆT ĐỐI không dán PII/secret vào prompt LLM",
      en: "5. NEVER paste PII/secrets into LLM prompts",
      ja: "5. PII・シークレットを絶対に LLM プロンプトへ貼らない",
    },
    blocks: [
      P(
        "Đây là quy tắc bất di bất dịch. Dữ liệu khách hàng thật (tên, số CMND/CCCD, số thẻ, email, hồ sơ y tế), khoá API, mật khẩu, chuỗi kết nối database — không bao giờ được dán vào prompt gửi lên một dịch vụ LLM bên ngoài. Lý do đơn giản: bạn không kiểm soát được dữ liệu đó được lưu, log hay dùng huấn luyện ở đâu. Rò rỉ PII vi phạm các quy định như GDPR, PDPA, Nghị định 13/2023 của Việt Nam về bảo vệ dữ liệu cá nhân, và có thể gây hậu quả pháp lý nghiêm trọng cho công ty.",
        "This is an absolute rule. Real customer data (names, national IDs, card numbers, emails, medical records), API keys, passwords, database connection strings — must never be pasted into a prompt sent to an external LLM service. The reason is simple: you don't control where that data is stored, logged, or used for training. Leaking PII violates regulations like GDPR, PDPA, and Vietnam's Decree 13/2023 on personal data protection, and can bring serious legal consequences for the company.",
        "これは絶対的な規則です。実際の顧客データ(氏名、国民 ID、カード番号、メール、医療記録)、API キー、パスワード、データベース接続文字列は、外部 LLM サービスへ送るプロンプトに決して貼ってはいけません。理由は単純で、そのデータがどこに保存・記録・学習利用されるかを制御できないからです。PII の漏洩は GDPR、PDPA、ベトナムの個人データ保護に関する政令 13/2023 などに違反し、企業に深刻な法的結果をもたらしかねません。"
      ),
      WARN(
        "Một dòng dán vội chứa email và số thẻ khách thật vào chatbot để 'nhờ AI viết test' có thể trở thành sự cố rò rỉ dữ liệu phải khai báo. Rủi ro không đáng để đánh đổi lấy chút tiện lợi.",
        "One hasty paste of a real customer's email and card number into a chatbot to 'ask AI for tests' can become a reportable data breach. The risk is not worth a bit of convenience.",
        "実顧客のメールとカード番号を「AI にテストを頼む」ためにチャットボットへ慌てて貼る一行が、報告義務のあるデータ漏洩になり得ます。わずかな利便性と引き換えにする価値のないリスクです。"
      ),
      P(
        "Cách làm đúng là tách bạch cấu trúc và dữ liệu. Bạn đưa cho LLM lược đồ (schema), quy tắc và mô tả trường — hoàn toàn không có giá trị thật. Sau đó LLM sinh dữ liệu tổng hợp theo lược đồ đó. Nếu bắt buộc phải minh hoạ bằng ví dụ, hãy dùng dữ liệu giả rõ ràng (test@example.com, số thẻ test 4242 4242 4242 4242 của Stripe). Với dự án nhạy cảm cao, cân nhắc LLM chạy nội bộ (on-premise) để dữ liệu không bao giờ rời hạ tầng công ty.",
        "The right approach separates structure from data. You give the LLM the schema, rules and field descriptions — with no real values at all. Then the LLM generates synthetic data following that schema. If you must illustrate with examples, use obviously fake data (test@example.com, Stripe's test card 4242 4242 4242 4242). For highly sensitive projects, consider an on-premise LLM so data never leaves company infrastructure.",
        "正しいやり方は構造とデータを分離することです。LLM にはスキーマ、ルール、項目説明を与えます。実値は一切含めません。その後 LLM がそのスキーマに従い合成データを生成します。どうしても例で示す必要があれば、明らかに偽のデータ(test@example.com、Stripe のテストカード 4242 4242 4242 4242)を使います。機微性の高いプロジェクトではオンプレミス LLM を検討し、データが企業インフラを出ないようにします。"
      ),
      CODE(
        "text",
        `# ĐÚNG: đưa schema, KHÔNG đưa dữ liệu thật
Sinh 5 bản ghi khách hàng TỔNG HỢP theo schema (KHÔNG dùng người thật):
- full_name: tên ngẫu nhiên hợp lệ (đa dạng locale: vi-VN, ja-JP, en-US)
- email: dạng <user>@example.com (miền test, không có thật)
- phone: định dạng hợp lệ nhưng số không tồn tại
- card: chỉ dùng số thẻ test công khai (4242...), KHÔNG số thẻ thật

# SAI (TUYỆT ĐỐI KHÔNG): dán bản ghi khách hàng thật từ DB production.`
      ),
      NOTE(
        "Nguyên tắc: prompt chỉ chứa cấu trúc và quy tắc, không chứa giá trị thật. Nếu bạn phải xoá gì đó trước khi dán, nghĩa là nó không nên được dán.",
        "Principle: prompts contain structure and rules, never real values. If you have to redact something before pasting, it shouldn't be pasted.",
        "原則: プロンプトには構造とルールのみを含め、実値は決して含めません。貼る前に何かを伏せる必要があるなら、それは貼るべきではありません。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Sinh dữ liệu tổng hợp: locale, biên, adversarial",
      en: "6. Generating synthetic data: locales, boundaries, adversarial",
      ja: "6. 合成データ生成: ロケール・境界・敵対的入力",
    },
    blocks: [
      P(
        "Dữ liệu tổng hợp (synthetic data) là dữ liệu do máy tạo theo lược đồ, không tương ứng người thật, nhưng đủ đa dạng để bộc lộ lỗi. LLM đặc biệt hữu ích ở việc phủ đa dạng: tên và địa chỉ nhiều locale (vi-VN có dấu, ja-JP kanji/kana, ả-rập viết phải-sang-trái), định dạng ngày/tiền tệ khác nhau, các ký tự Unicode hiếm. Đây là những chỗ mà đội test hay quên, dẫn tới bug hiển thị hoặc tràn khung khi hệ thống gặp dữ liệu thật quốc tế.",
        "Synthetic data is machine-generated data following a schema, corresponding to no real person, yet diverse enough to expose bugs. LLMs are especially useful for diversity coverage: names and addresses across locales (Vietnamese with diacritics, Japanese kanji/kana, right-to-left Arabic), varied date/currency formats, rare Unicode characters. These are spots test teams often forget, causing display bugs or layout overflow when the system meets real international data.",
        "合成データとは、スキーマに従い機械が生成する、実在の人物に対応しないが、バグを露出させるのに十分多様なデータです。LLM は多様性の網羅に特に有用です。多言語の氏名や住所(発音区別符号付きのベトナム語、漢字・仮名の日本語、右から左へのアラビア語)、様々な日付・通貨形式、稀な Unicode 文字。これらはテストチームが忘れがちで、システムが実際の国際的データに出会ったとき表示バグやレイアウト崩れを起こします。"
      ),
      P(
        "Ngoài đa dạng locale, hãy yêu cầu LLM sinh dữ liệu ở biên và dữ liệu đối kháng (adversarial). Dữ liệu biên: chuỗi rỗng, chuỗi cực dài (vượt maxlength), số ở giới hạn kiểu dữ liệu, ngày 29/2 năm nhuận. Dữ liệu đối kháng: chuỗi chứa dấu nháy đơn để dò SQL injection, thẻ script để dò XSS, emoji và ký tự điều khiển. Đây là kho case mà nếu tự nghĩ sẽ rất mất thời gian, còn LLM bung ra tức thì.",
        "Beyond locale diversity, ask the LLM for boundary and adversarial data. Boundary data: empty strings, extremely long strings (past maxlength), numbers at type limits, Feb 29 in leap years. Adversarial data: strings with single quotes to probe SQL injection, script tags to probe XSS, emojis and control characters. This is a trove of cases that would take ages to invent manually, which the LLM produces instantly.",
        "ロケールの多様性に加え、境界データと敵対的(adversarial)データも LLM に求めましょう。境界データ: 空文字列、極端に長い文字列(maxlength 超過)、型の限界の数値、うるう年の 2 月 29 日。敵対的データ: SQL インジェクションを探るシングルクォート付き文字列、XSS を探る script タグ、絵文字や制御文字。手作業では膨大な時間がかかるケースの宝庫を、LLM は即座に生み出します。"
      ),
      CODE(
        "ts",
        `// Dữ liệu tổng hợp cho data-driven test (do LLM đề xuất, người duyệt)
export const nameCases = [
  { locale: 'vi-VN', value: 'Nguyễn Thị Ánh Nguyệt', note: 'dấu tiếng Việt' },
  { locale: 'ja-JP', value: '山田 太郎', note: 'kanji + khoảng trắng full-width' },
  { locale: 'ar-SA', value: 'محمد الأحمد', note: 'RTL' },
  { locale: 'edge', value: '', note: 'rỗng -> kỳ vọng lỗi required' },
  { locale: 'edge', value: 'A'.repeat(256), note: 'vượt maxlength -> lỗi' },
  { locale: 'adv',  value: "Robert'); DROP TABLE users;--", note: 'SQLi -> phải bị escape, KHÔNG chạy' },
  { locale: 'adv',  value: '<script>alert(1)</script>', note: 'XSS -> phải render dạng text' },
  { locale: 'emoji', value: '👩‍👩‍👧‍👦 family', note: 'ZWJ emoji -> không vỡ layout' },
];

for (const c of nameCases) {
  test(\`tên [\${c.locale}] "\${c.value.slice(0,20)}" xử lý an toàn\`, async ({ page }) => {
    await page.getByLabel('Họ tên').fill(c.value);
    await page.getByRole('button', { name: 'Lưu' }).click();
    // Oracle: không bao giờ thực thi script/SQL; hiển thị đúng dạng text đã escape
    await expect(page.locator('#name-display')).toHaveText(c.value.length ? c.value : /bắt buộc/);
  });
}`
      ),
      TIP(
        "Với dữ liệu đối kháng, oracle không phải 'app không crash' mà là 'input độc bị vô hiệu hoá đúng cách': SQLi bị tham số hoá, XSS bị escape thành text. Kiểm chính hành vi phòng thủ, không chỉ kiểm không sập.",
        "For adversarial data, the oracle isn't 'the app doesn't crash' but 'malicious input is neutralized correctly': SQLi is parameterized, XSS is escaped to text. Test the defensive behavior itself, not just non-crashing.",
        "敵対的データでは、オラクルは「アプリがクラッシュしない」ではなく「悪意ある入力が正しく無害化される」です。SQLi はパラメータ化され、XSS はテキストへエスケープされる。落ちないことだけでなく、防御的な挙動そのものを検証します。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Review nháp AI: thêm case domain mà AI bỏ sót",
      en: "7. Reviewing AI drafts: adding domain cases the AI missed",
      ja: "7. AI の下書きレビュー: AI が見落としたドメインケースの追加",
    },
    blocks: [
      P(
        "LLM giỏi các case chung nhưng mù các case đặc thù domain và quy tắc ngầm mà chỉ người trong nghề mới biết. Ví dụ trong thương mại điện tử: khuyến mãi chồng khuyến mãi (áp cả voucher lẫn flash sale — có được cộng dồn không?), làm tròn tiền khi chia hoá đơn, đơn hàng đặt lúc 23:59 nhưng thanh toán xong lúc 00:01 sang ngày khác (tính vào chương trình nào?), tồn kho oversell khi hai người mua món cuối cùng cùng lúc. Đây là những oracle nghiệp vụ mà bạn phải chủ động thêm vào sau khi AI đã lo phần liệt kê cơ học.",
        "The LLM is good at generic cases but blind to domain-specific cases and implicit rules only insiders know. For example in e-commerce: promotion stacking (applying both a voucher and a flash sale — do they combine?), money rounding when splitting a bill, an order placed at 23:59 but paid at 00:01 the next day (which campaign counts?), inventory oversell when two people buy the last item simultaneously. These are business oracles you must proactively add after the AI handled the mechanical enumeration.",
        "LLM は一般的なケースは得意ですが、内部者だけが知るドメイン固有ケースや暗黙のルールには盲目です。例えば EC では、プロモーションの重ね掛け(バウチャーとフラッシュセールを両方適用—併用可能か)、請求分割時の金額丸め、23:59 に注文し翌日 00:01 に支払い完了した注文(どのキャンペーンに算入するか)、二人が最後の在庫を同時購入したときの在庫超過販売。これらは AI が機械的な列挙を担った後、あなたが能動的に追加すべき業務オラクルです。"
      ),
      SCEN(
        "Case AI không bao giờ tự nghĩ ra",
        "The case the AI would never invent",
        "Đội TMĐT nhờ LLM sinh test case cho tính năng đổi trả. AI cho ra bảng đầy đủ: đổi trong hạn, ngoài hạn, sản phẩm lỗi... Nhưng nó bỏ sót một quy tắc ngầm: hàng mua bằng voucher, khi hoàn tiền thì hoàn bao nhiêu — giá gốc hay giá sau voucher? Và voucher đã dùng có được trả lại không? Đây là quy tắc kế toán nội bộ, không có trong AC công khai. Kỹ sư QA giàu kinh nghiệm thêm case này; nó phát hiện một bug làm công ty thất thoát tiền qua đường hoàn voucher.",
        "An e-commerce team asks an LLM for return/refund test cases. The AI gives a full table: return in-window, out-of-window, defective product... But it misses an implicit rule: for goods bought with a voucher, how much is refunded — the original price or the post-voucher price? And is the used voucher returned? This is an internal accounting rule, absent from public AC. An experienced QA engineer adds this case; it uncovers a bug leaking money through voucher refunds.",
        "ある EC チームが返品・返金のテストケースを LLM に依頼します。AI は完全な表を返します。期限内返品、期限外、不良品など。しかし暗黙のルールを見落とします。バウチャーで買った商品の返金額は、元の価格か割引後の価格か。そして使用済みバウチャーは返却されるか。これは公開受け入れ基準にない内部会計ルールです。経験あるQAエンジニアがこのケースを追加し、バウチャー返金経由で会社が金銭を漏らすバグを発見します。"
      ),
      P(
        "Bài học: AI mở rộng bề rộng, con người thêm bề sâu. Một quy trình review tốt là đọc bảng AI sinh với ba câu hỏi trong đầu: (1) case nào bịa/không có thật? (2) biên nào ghi sai đóng/mở? (3) quy tắc domain nào bị bỏ sót? Sau khi lọc và bổ sung, bảng case mới thật sự đáng tin. Đừng bao giờ copy nguyên bảng AI vào bộ test mà không qua bước này.",
        "The lesson: AI expands breadth, humans add depth. A good review process reads the AI's table with three questions in mind: (1) which cases are fabricated/unreal? (2) which boundaries got inclusive/exclusive wrong? (3) which domain rules were missed? After filtering and augmenting, the case table is truly trustworthy. Never copy the AI's table into the suite verbatim without this step.",
        "教訓: AI が幅を広げ、人間が深さを加えます。良いレビュープロセスは、三つの問いを念頭に AI の表を読みます。(1) どのケースが捏造・非現実か。(2) どの境界の以上・未満が誤りか。(3) どのドメインルールが漏れたか。絞り込み補強した後、初めてケース表は本当に信頼できます。この段階を経ずに AI の表をそのままスイートへコピーしてはいけません。"
      ),
      QA(
        "AI đã sinh test case, vậy QA còn giá trị gì?",
        "The AI generated the test cases, so what value does QA still add?",
        "QA giữ phần AI yếu nhất: hiểu domain, phát hiện oracle nghiệp vụ ẩn, đánh giá rủi ro, và chịu trách nhiệm cuối. AI liệt kê nhanh nhưng không biết 'quy tắc hoàn voucher', 'ràng buộc tuân thủ ngành', hay 'lỗi nào tốn tiền nhất'. Giá trị QA dịch chuyển từ gõ case sang thiết kế oracle và thẩm định — công việc cao cấp hơn, không bị thay thế.",
        "QA holds exactly where AI is weakest: domain understanding, uncovering hidden business oracles, risk assessment, and final accountability. The AI enumerates fast but doesn't know the 'voucher refund rule', 'industry compliance constraints', or 'which bug costs the most'. QA's value shifts from typing cases to designing oracles and validating — higher-level work that isn't replaced.",
        "QA は AI が最も弱い部分を握ります。ドメイン理解、隠れた業務オラクルの発見、リスク評価、最終的な説明責任です。AI は速く列挙しますが、「バウチャー返金ルール」「業界のコンプライアンス制約」「どのバグが最も高くつくか」を知りません。QA の価値はケースの入力からオラクル設計と検証へ移ります。置き換えられない、より高度な仕事です。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Template prompt tái sử dụng cho cả đội",
      en: "8. Reusable team prompt templates",
      ja: "8. チームで再利用するプロンプトテンプレート",
    },
    blocks: [
      P(
        "Nếu mỗi người trong đội tự gõ prompt kiểu riêng, chất lượng nháp AI sẽ dao động lớn và khó tái lập. Giải pháp là chuẩn hoá prompt thành template versioned lưu trong repo, giống như ta chuẩn hoá code review checklist. Template tốt gồm: phần vai trò, khung grounding (chỗ dán AC), danh sách kỹ thuật bắt buộc (EP, BVA, adversarial), quy tắc an toàn (cấm PII), và định dạng đầu ra cố định để dễ parse.",
        "If everyone on the team types their own style of prompt, AI draft quality swings widely and is hard to reproduce. The solution is to standardize prompts into versioned templates stored in the repo, just as we standardize code-review checklists. A good template has: a role section, a grounding frame (a slot to paste AC), a list of mandatory techniques (EP, BVA, adversarial), safety rules (no PII), and a fixed output format that's easy to parse.",
        "チームの各人が自己流でプロンプトを打つと、AI の下書き品質が大きくばらつき再現しにくくなります。解決策は、コードレビューのチェックリストを標準化するのと同様、プロンプトをバージョン管理されたテンプレートとしてリポジトリに保存し標準化することです。良いテンプレートは、役割セクション、グラウンディングの枠(受け入れ基準を貼る欄)、必須技法の一覧(EP、BVA、敵対的)、安全規則(PII 禁止)、解析しやすい固定出力形式を持ちます。"
      ),
      CODE(
        "text",
        `# tests/prompts/testcase-gen.v3.md — template dùng chung, có version
## Role
Bạn là kỹ sư QA senior. Chỉ dựa trên AC bên dưới. Không bịa; nêu [GIẢ ĐỊNH] khi thiếu.

## Safety (bắt buộc)
- KHÔNG dùng PII/secret. Mọi dữ liệu ví dụ phải là tổng hợp/ẩn danh.

## Techniques (bắt buộc áp dụng)
- Phân hoạch tương đương (EP): 1 đại diện mỗi lớp.
- Giá trị biên (BVA): kiểm cả 2 phía mỗi biên + ghi rõ đóng/mở.
- Adversarial: SQLi, XSS, Unicode/emoji, chuỗi cực dài.

## Acceptance Criteria
<<< DÁN AC Ở ĐÂY >>>

## Output
Bảng Markdown: | ID | Loại | Input | Kỳ vọng | Kỹ thuật | Ghi chú |
Kết thúc bằng mục "Câu hỏi cho BA" nếu AC chưa rõ.`
      ),
      P(
        "Đặt version (v3) vào tên template rất quan trọng: khi bạn cải tiến prompt, các bài test cũ vẫn tra được prompt nào sinh ra chúng, giúp truy vết và tái lập. Đội có thể xây một thư viện template theo loại đối tượng kiểm thử: form nhập liệu, API REST, luồng thanh toán, báo cáo. Mỗi template mã hoá kinh nghiệm tập thể, nâng sàn chất lượng cho cả người mới lẫn người cũ.",
        "Putting a version (v3) in the template name matters: when you improve a prompt, old tests can still trace which prompt produced them, aiding traceability and reproduction. The team can build a template library by object under test: input forms, REST APIs, payment flows, reports. Each template encodes collective experience, raising the quality floor for both newcomers and veterans.",
        "テンプレート名にバージョン(v3)を入れることは重要です。プロンプトを改善したとき、古いテストがどのプロンプトから生まれたかを追え、追跡と再現に役立ちます。チームはテスト対象ごとにテンプレートライブラリを構築できます。入力フォーム、REST API、決済フロー、レポートです。各テンプレートが集合的経験を符号化し、新人にもベテランにも品質の下限を引き上げます。"
      ),
      NOTE(
        "Coi prompt như code: đưa vào repo, review, đánh version, viết test cho chính output. Prompt tốt là tài sản chung, không phải bí kíp cá nhân.",
        "Treat prompts as code: put them in the repo, review them, version them, test their output. A good prompt is shared property, not a personal trick.",
        "プロンプトをコードとして扱いましょう。リポジトリに入れ、レビューし、バージョンを付け、その出力をテストします。良いプロンプトは個人の秘伝ではなく共有資産です。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Đo lường độ phủ khi dùng AI sinh case",
      en: "9. Measuring coverage when using AI to generate cases",
      ja: "9. AI でケース生成する際の網羅率の測定",
    },
    blocks: [
      P(
        "Số lượng test case không phải thước đo tốt: AI có thể bung ra hàng trăm case trùng lặp mà độ phủ thực chẳng tăng. Thước đo đáng tin là độ phủ theo phương pháp: mọi lớp tương đương có đại diện chưa, mọi biên đã kiểm cả hai phía chưa, mọi nhánh trong bảng quyết định (decision table) đã có case chưa, mọi trạng thái/chuyển tiếp trong máy trạng thái đã phủ chưa. Bạn có thể nhờ chính LLM tự kiểm: cho nó bảng case và hỏi 'lớp/biên/nhánh nào chưa được phủ?'.",
        "Case count is not a good metric: the AI can unfold hundreds of duplicate cases while real coverage barely rises. A trustworthy metric is method-based coverage: does every equivalence class have a representative, is every boundary tested on both sides, does every branch in the decision table have a case, is every state/transition in the state machine covered? You can ask the LLM itself to audit: give it the case table and ask 'which class/boundary/branch is not covered yet?'.",
        "ケース数は良い指標ではありません。AI は実際の網羅率がほとんど上がらないまま、重複ケースを数百も展開できます。信頼できる指標は手法ベースの網羅率です。すべての同値クラスに代表があるか、すべての境界が両側でテストされているか、決定表のすべての分岐にケースがあるか、状態機械のすべての状態・遷移が網羅されているか。LLM 自身に監査させることもできます。ケース表を与え「どのクラス・境界・分岐がまだ網羅されていないか」と問うのです。"
      ),
      CODE(
        "text",
        `# Prompt tự kiểm độ phủ (đưa lại bảng đã review cho LLM)
Dưới đây là bảng test case đã có. Hãy lập ma trận độ phủ:
1. Liệt kê các lớp tương đương từ AC; đánh dấu lớp nào CHƯA có case.
2. Liệt kê các biên; đánh dấu biên nào chỉ kiểm 1 phía.
3. Dựng bảng quyết định cho các điều kiện kết hợp; chỉ ra tổ hợp còn thiếu.
Trả về: bảng "đã phủ / còn thiếu" + đề xuất case bổ sung cho phần thiếu.`
      ),
      P(
        "Kết hợp thêm coverage kỹ thuật: độ phủ dòng/nhánh code (line/branch coverage) từ công cụ như Istanbul/c8, và độ phủ yêu cầu (traceability) — mỗi acceptance criteria ánh xạ tới ít nhất một test. Điểm tinh tế: coverage cao không đảm bảo oracle đúng. Một bộ test phủ 100% dòng nhưng chỉ assert 'không lỗi' vẫn vô dụng. Vì thế đo phủ phải đi kèm review chất lượng oracle — hai mặt của cùng một đồng tiền.",
        "Combine technical coverage too: line/branch code coverage from tools like Istanbul/c8, and requirement coverage (traceability) — each acceptance criterion maps to at least one test. The subtle point: high coverage doesn't guarantee correct oracles. A suite covering 100% of lines but only asserting 'no error' is still useless. So coverage measurement must go with oracle-quality review — two sides of the same coin.",
        "技術的な網羅率も組み合わせます。Istanbul/c8 のようなツールによる行・分岐カバレッジ、そして要件網羅(トレーサビリティ)——各受け入れ基準が少なくとも一つのテストに対応する。微妙な点: 高い網羅率は正しいオラクルを保証しません。行の 100% を網羅しても「エラーなし」だけをアサートするスイートは無用です。よって網羅率の測定はオラクル品質のレビューと共に行う必要があります。同じ硬貨の両面です。"
      ),
      QA(
        "Coverage 100% dòng code có nghĩa là test đủ tốt không?",
        "Does 100% line coverage mean the tests are good enough?",
        "Không. Coverage đo code được CHẠY qua khi test, không đo assertion có KIỂM đúng bất biến hay không. Test có thể chạy hết mọi dòng nhưng chỉ assert 'không throw' — phủ 100% mà bắt được 0 bug logic. Coverage là điều kiện cần, không đủ. Phải cộng với review oracle và độ phủ yêu cầu/decision-table thì mới đánh giá được chất lượng thật.",
        "No. Coverage measures which code is EXECUTED during tests, not whether assertions actually CHECK the invariants. A test can run every line but only assert 'no throw' — 100% coverage catching zero logic bugs. Coverage is necessary, not sufficient. It must be combined with oracle review and requirement/decision-table coverage to judge real quality.",
        "いいえ。カバレッジはテスト中に実行されるコードを測るもので、アサーションが実際に不変条件を検証するかは測りません。すべての行を実行しても「throw しない」だけをアサートするテストは、100% カバレッジでロジックバグをゼロしか捕えません。カバレッジは必要条件であり十分条件ではありません。オラクルレビューと要件・決定表の網羅と組み合わせて初めて本当の品質を判断できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Chống hallucination trong dữ liệu sinh ra",
      en: "10. Guarding against hallucination in generated data",
      ja: "10. 生成データにおけるハルシネーション対策",
    },
    blocks: [
      P(
        "Dữ liệu tổng hợp cũng có thể 'ảo': LLM sinh mã bưu chính không tồn tại cho một thành phố có thật, số CMND sai định dạng theo chuẩn quốc gia, hay mã sản phẩm không khớp bảng danh mục thật. Nếu bạn nạp thẳng dữ liệu này vào test data-driven, test có thể đỏ vì dữ liệu sai chứ không phải vì code lỗi — một dạng flaky do nguồn dữ liệu. Cách phòng là kiểm hợp lệ (validate) dữ liệu sinh ra bằng luật xác định trước khi dùng.",
        "Synthetic data can also be 'hallucinated': the LLM generates a postal code that doesn't exist for a real city, a national ID with a format wrong per the country standard, or a product code that doesn't match the real catalog table. If you feed this straight into data-driven tests, tests may go red because the data is wrong, not because the code is buggy — a form of data-sourced flakiness. The defense is to validate generated data with deterministic rules before use.",
        "合成データも「幻覚」を起こし得ます。LLM が実在する都市に存在しない郵便番号を生成したり、国の標準に照らして形式の誤った国民 ID を作ったり、実際のカタログ表と一致しない商品コードを生成したりします。これをそのままデータ駆動テストへ投入すると、コードのバグではなくデータの誤りでテストが赤になり得ます。データ由来のフレーキーの一種です。防御は、使用前に生成データを決定論的ルールで検証(バリデーション)することです。"
      ),
      CODE(
        "ts",
        `// Validate dữ liệu LLM sinh trước khi đưa vào test (chặn hallucination)
import { z } from 'zod';

const SyntheticUser = z.object({
  email: z.string().regex(/@example\\.(com|org)$/, 'phải là miền test'),
  age: z.number().int().min(0).max(150),
  card: z.string().refine(v => v.replace(/\\s/g, '') === '4242424242424242',
    'chỉ chấp nhận số thẻ test công khai'),
  country: z.enum(['VN', 'JP', 'US']),   // chỉ locale được hỗ trợ
});

export function loadSynthetic(raw: unknown[]) {
  return raw.map((r, i) => {
    const parsed = SyntheticUser.safeParse(r);
    if (!parsed.success) throw new Error(\`Bản ghi #\${i} do AI sinh KHÔNG hợp lệ: \${parsed.error}\`);
    return parsed.data;   // chỉ dữ liệu qua guard mới vào test
  });
}`
      ),
      P(
        "Nguyên tắc chung là 'tin nhưng kiểm chứng' (trust but verify): coi mọi thứ LLM sinh ra là nháp cần xác thực, không phải sự thật. Với dữ liệu, xác thực bằng schema và luật nghiệp vụ. Với test case, xác thực bằng đối chiếu AC. Với code test, xác thực bằng chạy thật và review oracle. Lớp guard này biến năng lực sinh nhanh của AI thành đầu vào an toàn cho hệ thống kiểm thử, thay vì một nguồn nhiễu mới.",
        "The general principle is 'trust but verify': treat everything the LLM produces as a draft needing validation, not truth. For data, validate by schema and business rules. For test cases, validate by AC reconciliation. For test code, validate by real execution and oracle review. This guard layer turns the AI's fast-generation ability into a safe input for the testing system, rather than a new source of noise.",
        "一般原則は「信頼するが検証する」です。LLM が生み出すすべてを真実ではなく検証を要する下書きとして扱います。データはスキーマと業務ルールで検証し、テストケースは受け入れ基準との照合で検証し、テストコードは実行とオラクルレビューで検証します。このガード層が、AI の高速生成能力を、新たなノイズ源ではなくテストシステムへの安全な入力に変えます。"
      ),
      WARN(
        "Dữ liệu tổng hợp sai định dạng làm test đỏ oan sẽ nhanh chóng bị đội bỏ qua ('lại lỗi data thôi'). Một khi đèn đỏ bị phớt lờ, bug thật sẽ lọt qua. Validate dữ liệu là bảo vệ niềm tin vào bộ test.",
        "Malformed synthetic data causing false red gets quickly ignored by the team ('just a data error again'). Once red is ignored, real bugs slip through. Validating data protects trust in the suite.",
        "形式の誤った合成データによる誤った赤は、チームにすぐ無視されます(「またデータエラーだ」)。赤が無視されると本物のバグが漏れます。データの検証はスイートへの信頼を守ることです。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Tích hợp AI-gen vào quy trình và CI",
      en: "11. Integrating AI-gen into the workflow and CI",
      ja: "11. AI 生成をワークフローと CI に統合する",
    },
    blocks: [
      P(
        "Vị trí đúng của AI trong quy trình là ở giai đoạn thiết kế test và làm giàu dữ liệu, không phải ở khâu gác cổng CI. Nghĩa là: khi có yêu cầu mới, QA dùng template prompt để sinh nháp bảng case và dữ liệu; review, lọc, thêm case domain; commit các test đã duyệt vào repo như code bình thường; và chính CI chạy các test tất định đó để gác release. AI tạo nháp một lần; test đã duyệt chạy lặp lại tất định mãi về sau.",
        "The right place for AI in the workflow is the test-design and data-enrichment stage, not the CI gate. That means: when a new requirement arrives, QA uses a prompt template to draft the case table and data; reviews, filters, adds domain cases; commits the approved tests into the repo as normal code; and CI runs those deterministic tests to gate the release. AI drafts once; the approved tests run deterministically forever after.",
        "ワークフローにおける AI の正しい位置は、CI の門ではなく、テスト設計とデータ拡充の段階です。つまり、新しい要件が来たら、QA はプロンプトテンプレートでケース表とデータを下書きし、レビュー・絞り込み・ドメインケースの追加を行い、承認したテストを通常のコードとしてリポジトリにコミットし、CI がそれら決定論的テストを実行してリリースの門番になります。AI は一度下書きし、承認されたテストはその後永遠に決定論的に実行されます。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/qa.yml — CI chạy TEST ĐÃ DUYỆT, không gọi LLM lúc gác cổng
name: qa
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      # Test do AI-gen NHƯNG đã review & commit -> chạy tất định trong CI
      - run: npm run test:data-driven -- --coverage
      # Cổng: coverage tối thiểu + mọi AC có ít nhất 1 test ánh xạ
      - run: npm run check:traceability   # AC <-> test, fail nếu AC thiếu test
# LLM KHÔNG được gọi trong bước gác cổng: tránh non-determinism & rò dữ liệu.`
      ),
      P(
        "Ranh giới then chốt: đừng để CI gọi LLM ở bước quyết định merge. Gọi LLM lúc gác cổng đưa vào ba rủi ro — kết quả không tất định (cùng input, khác output), phụ thuộc mạng/hạn mức API, và nguy cơ rò dữ liệu build. AI đứng ở 'thượng nguồn' để giúp con người thiết kế; test tất định đứng ở 'hạ nguồn' làm cổng. Giữ đúng thứ tự này thì bạn có tốc độ của AI mà không mất tính tất định của kiểm thử.",
        "The key boundary: don't let CI call an LLM at the merge-decision step. Calling an LLM at the gate introduces three risks — non-deterministic results (same input, different output), network/API-quota dependency, and build-data leakage risk. AI sits 'upstream' to help humans design; deterministic tests sit 'downstream' as the gate. Keep this order and you get AI's speed without losing testing determinism.",
        "鍵となる境界: マージ判断のステップで CI に LLM を呼ばせないこと。門で LLM を呼ぶと三つのリスクが入ります。非決定的な結果(同じ入力で異なる出力)、ネットワーク・API 割当への依存、ビルドデータ漏洩のリスクです。AI は人間の設計を助けるため「上流」に、決定論的テストは門として「下流」に位置します。この順序を守れば、テストの決定性を失わずに AI の速度を得られます。"
      ),
      TIP(
        "Lưu prompt + phiên bản model đã dùng vào metadata của test (comment hoặc file kèm). Khi cần tái tạo hay audit, bạn biết chính xác test này ra đời từ prompt nào, model nào.",
        "Store the prompt + model version used in the test metadata (a comment or sidecar file). When you need to reproduce or audit, you know exactly which prompt and model this test came from.",
        "使用したプロンプトとモデルのバージョンをテストのメタデータ(コメントや付随ファイル)に保存しましょう。再現や監査が必要なとき、このテストがどのプロンプト・どのモデルから生まれたか正確に分かります。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Góc phỏng vấn: LLM sinh test case & dữ liệu",
      en: "12. Interview angle: LLM-generated test cases & data",
      ja: "12. 面接の観点: LLM によるテストケース・データ生成",
    },
    blocks: [
      QA(
        "Bạn dùng LLM sinh test case thế nào để tránh hallucination?",
        "How do you use an LLM to generate test cases while avoiding hallucination?",
        "Tôi grounding: dán chính xác acceptance criteria, mô tả trường, quy tắc vào prompt, và yêu cầu LLM nêu [GIẢ ĐỊNH] thay vì bịa khi thiếu thông tin. Tôi ép áp dụng phân hoạch tương đương + giá trị biên để có độ phủ có kỷ luật. Sau đó tôi review: lọc case bịa, sửa biên đóng/mở, thêm case domain AI bỏ sót. LLM là trợ lý sinh nháp, tôi giữ oracle và trách nhiệm.",
        "I ground it: paste the exact acceptance criteria, field descriptions and rules into the prompt, and require the LLM to state [ASSUMPTION] rather than fabricate when information is missing. I force equivalence partitioning + boundary value analysis for disciplined coverage. Then I review: filter fabricated cases, fix inclusive/exclusive boundaries, add domain cases the AI missed. The LLM is a draft assistant; I keep the oracle and accountability.",
        "グラウンディングします。正確な受け入れ基準、項目説明、ルールをプロンプトに貼り、情報不足時は捏造せず[前提]を述べるよう LLM に要求します。規律ある網羅のため同値分割と境界値分析を強制します。その後レビューします。捏造ケースを除去し、境界の以上・未満を修正し、AI が見落としたドメインケースを追加します。LLM は下書きアシスタントで、私がオラクルと説明責任を握ります。"
      ),
      QA(
        "Vì sao tuyệt đối không dán dữ liệu khách hàng thật vào prompt?",
        "Why must you never paste real customer data into a prompt?",
        "Vì bạn mất kiểm soát dữ liệu: không biết nó bị lưu, log hay dùng huấn luyện ở đâu, và rò rỉ PII vi phạm GDPR/PDPA/Nghị định 13. Cách đúng là tách cấu trúc khỏi dữ liệu: đưa schema và quy tắc, để LLM sinh dữ liệu tổng hợp/ẩn danh. Nếu cần ví dụ thì dùng dữ liệu giả rõ ràng (test@example.com, thẻ test 4242). Dự án nhạy cảm thì dùng LLM on-premise.",
        "Because you lose control of the data: you don't know where it's stored, logged, or used for training, and leaking PII violates GDPR/PDPA/Decree 13. The right way separates structure from data: provide the schema and rules, let the LLM generate synthetic/anonymized data. If you need examples, use obviously fake data (test@example.com, test card 4242). For sensitive projects, use an on-premise LLM.",
        "データの制御を失うからです。どこに保存・記録・学習利用されるか分からず、PII の漏洩は GDPR/PDPA/政令 13 に違反します。正しい方法は構造をデータから分離することです。スキーマとルールを与え、LLM に合成・匿名化データを生成させます。例が必要なら明らかに偽のデータ(test@example.com、テストカード 4242)を使います。機微なプロジェクトではオンプレミス LLM を使います。"
      ),
      QA(
        "Sinh dữ liệu tổng hợp cho adversarial testing gồm những gì và oracle là gì?",
        "What does generating synthetic data for adversarial testing include, and what is the oracle?",
        "Gồm chuỗi SQL injection, thẻ script XSS, ký tự Unicode/emoji hiếm, chuỗi cực dài vượt maxlength, ngày biên (29/2). Oracle KHÔNG phải 'app không crash' mà là 'input độc bị vô hiệu hoá đúng cách': SQLi bị tham số hoá không chạy, XSS bị escape thành text hiển thị, chuỗi dài bị chặn với thông báo hợp lệ. Ta kiểm hành vi phòng thủ chủ động, không chỉ kiểm không sập.",
        "It includes SQL injection strings, XSS script tags, rare Unicode/emoji, extremely long strings past maxlength, boundary dates (Feb 29). The oracle is NOT 'the app doesn't crash' but 'malicious input is neutralized correctly': SQLi is parameterized and doesn't execute, XSS is escaped to display text, long strings are rejected with a valid message. We test active defensive behavior, not just non-crashing.",
        "SQL インジェクション文字列、XSS の script タグ、稀な Unicode・絵文字、maxlength を超える極端に長い文字列、境界日付(2 月 29 日)を含みます。オラクルは「アプリがクラッシュしない」ではなく「悪意ある入力が正しく無害化される」です。SQLi はパラメータ化され実行されず、XSS はテキストへエスケープされ表示され、長い文字列は正当なメッセージで拒否されます。落ちないことだけでなく、能動的な防御挙動を検証します。"
      ),
      QA(
        "Làm sao đo độ phủ khi AI sinh hàng trăm case?",
        "How do you measure coverage when the AI generates hundreds of cases?",
        "Không đếm số case (dễ trùng lặp). Tôi đo theo phương pháp: mọi lớp tương đương có đại diện, mọi biên kiểm cả hai phía, mọi nhánh decision-table và mọi chuyển trạng thái có case; cộng với coverage dòng/nhánh code và traceability AC↔test. Quan trọng: coverage cao không đảm bảo oracle đúng, nên luôn đi kèm review chất lượng assertion.",
        "I don't count cases (easily duplicated). I measure by method: every equivalence class has a representative, every boundary is tested on both sides, every decision-table branch and state transition has a case; plus line/branch code coverage and AC↔test traceability. Importantly, high coverage doesn't guarantee correct oracles, so it always goes with assertion-quality review.",
        "ケース数は数えません(重複しやすい)。手法で測ります。すべての同値クラスに代表があり、すべての境界が両側で検証され、すべての決定表分岐と状態遷移にケースがある。加えて行・分岐カバレッジと受け入れ基準↔テストのトレーサビリティ。重要なのは、高い網羅率が正しいオラクルを保証しないため、常にアサーション品質のレビューと共に行うことです。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist dùng LLM an toàn",
      en: "13. Summary & safe-LLM checklist",
      ja: "13. まとめと安全な LLM 利用チェックリスト",
    },
    blocks: [
      P(
        "LLM là công cụ tăng tốc mạnh cho phần liệt kê cơ học của kiểm thử: sinh nhanh bảng case dương/âm/biên và dữ liệu tổng hợp đa dạng. Nhưng giá trị chỉ thành hiện thực khi bạn giữ ba trụ cột: grounding trên yêu cầu thật để tránh hallucination, tuyệt đối không rò PII/secret, và con người thẩm định để thêm oracle cùng case domain mà AI không biết. AI mở rộng bề rộng; bạn giữ bề sâu và trách nhiệm.",
        "The LLM is a powerful accelerator for the mechanical enumeration part of testing: quickly generating positive/negative/boundary case tables and diverse synthetic data. But value only materializes when you keep three pillars: grounding on real requirements to avoid hallucination, never leaking PII/secrets, and human validation to add oracles and domain cases the AI doesn't know. The AI expands breadth; you keep depth and accountability.",
        "LLM はテストの機械的列挙の部分に対する強力な加速装置です。正常系・異常系・境界のケース表と多様な合成データを素早く生成します。しかし価値は三つの柱を守るときにのみ実現します。ハルシネーションを避けるため実要件にグラウンディングし、PII・シークレットを決して漏らさず、AI が知らないオラクルとドメインケースを追加するため人間が検証すること。AI が幅を広げ、あなたが深さと説明責任を保ちます。"
      ),
      UL(
        [
          "Grounding: dán AC/schema thật; bắt LLM nêu [GIẢ ĐỊNH] thay vì bịa.",
          "An toàn dữ liệu: không PII/secret; chỉ dùng dữ liệu tổng hợp/ẩn danh; cân nhắc LLM on-premise.",
          "Kỹ thuật: ép áp dụng EP + BVA + adversarial; kiểm biên đóng/mở với AC gốc.",
          "Review: lọc case bịa, thêm case domain (oracle nghiệp vụ ẩn), validate dữ liệu bằng schema.",
          "Template hoá prompt có version; đo phủ theo phương pháp; CI chạy test đã duyệt, KHÔNG gọi LLM lúc gác cổng.",
        ],
        [
          "Grounding: paste real AC/schema; make the LLM state [ASSUMPTION] rather than fabricate.",
          "Data safety: no PII/secrets; use only synthetic/anonymized data; consider on-premise LLM.",
          "Techniques: force EP + BVA + adversarial; check inclusive/exclusive boundaries against original AC.",
          "Review: filter fabricated cases, add domain cases (hidden business oracles), validate data by schema.",
          "Template prompts with versions; measure coverage by method; CI runs approved tests, never calls the LLM at the gate.",
        ],
        [
          "グラウンディング: 実際の受け入れ基準・スキーマを貼り、捏造せず[前提]を述べさせる。",
          "データ安全: PII・シークレットなし。合成・匿名化データのみ使用。オンプレミス LLM を検討。",
          "技法: EP + BVA + 敵対的を強制。境界の以上・未満を元の受け入れ基準と照合。",
          "レビュー: 捏造ケースを除去、ドメインケース(隠れた業務オラクル)を追加、データをスキーマで検証。",
          "プロンプトをバージョン付きテンプレート化。手法で網羅率を測定。CI は承認済みテストを実行し、門で LLM を呼ばない。",
        ]
      ),
      NOTE(
        "Bài tiếp theo về self-healing locator sẽ cho thấy AI giúp bảo trì test khi UI đổi ra sao — và vì sao tin mù vào self-heal lại nguy hiểm nếu thiếu guardrails.",
        "The next article on self-healing locators shows how AI helps maintain tests as the UI changes — and why blindly trusting self-heal is dangerous without guardrails.",
        "次の自己修復ロケーターの記事では、UI 変更時に AI がどうテスト保守を助けるか、そしてガードレールなしに自己修復を盲信することがなぜ危険かを示します。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — AI self-healing locators + guardrails
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Self-healing locator là gì và giải quyết vấn đề nào",
      en: "1. What self-healing locators are and what problem they solve",
      ja: "1. 自己修復ロケーターとは何か、どの問題を解くのか",
    },
    blocks: [
      P(
        "Trong tự động hoá kiểm thử, locator là cách test tìm một phần tử trên giao diện (ví dụ nút 'Đặt hàng'). Nút thắt kinh điển là: mỗi khi lập trình viên đổi UI — đổi id, đổi class, di chuyển phần tử — thì locator cũ không còn tìm thấy, và hàng loạt test đỏ dù chức năng vẫn chạy đúng. Self-healing locator là kỹ thuật AI/heuristic tự đoán một locator thay thế khi locator gốc thất bại, để test tiếp tục chạy thay vì đỏ hàng loạt.",
        "In test automation, a locator is how a test finds an element on the UI (e.g. the 'Place order' button). The classic bottleneck: every time a developer changes the UI — renames an id, changes a class, moves an element — the old locator no longer finds it, and swathes of tests go red even though the feature works fine. A self-healing locator is an AI/heuristic technique that guesses a replacement locator when the original fails, so tests keep running instead of mass-failing.",
        "テスト自動化において、ロケーターはテストが UI 上の要素(例:「注文する」ボタン)を見つける手段です。古典的なボトルネックは、開発者が UI を変えるたび——id の改名、class の変更、要素の移動——古いロケーターが見つからなくなり、機能は正しく動くのに大量のテストが赤になることです。自己修復ロケーターは、元のロケーターが失敗したとき代替ロケーターを推測し、大量失敗の代わりにテストを走らせ続ける AI・ヒューリスティック技術です。"
      ),
      P(
        "Cách nó hoạt động: khi locator gốc không khớp, hệ thống nhìn các đặc trưng khác của phần tử đã lưu từ lần chạy trước — vai trò (role), nhãn (label), văn bản, thuộc tính lân cận, vị trí tương đối — rồi tìm phần tử giống nhất trên trang hiện tại và gán một điểm tin cậy (confidence score). Nếu tìm được ứng viên đủ giống, nó dùng tạm để test đi tiếp và ghi lại sự kiện 'đã heal'. Nghe rất hấp dẫn, nhưng chính sự 'thông minh' này là con dao hai lưỡi mà bài viết sẽ mổ xẻ.",
        "How it works: when the original locator doesn't match, the system looks at other element features saved from a previous run — role, label, text, neighboring attributes, relative position — then finds the most similar element on the current page and assigns a confidence score. If it finds a similar-enough candidate, it uses it temporarily to let the test proceed and logs a 'healed' event. It sounds attractive, but this very 'cleverness' is the double-edged sword this article dissects.",
        "仕組み: 元のロケーターが一致しないとき、システムは前回の実行から保存した要素の他の特徴——role、label、テキスト、隣接属性、相対位置——を見て、現在のページ上で最も類似した要素を見つけ、信頼度スコアを割り当てます。十分似た候補が見つかれば、それを一時的に使ってテストを進め、「修復した」イベントを記録します。魅力的に聞こえますが、まさにこの「賢さ」が本記事が解剖する諸刃の剣です。"
      ),
      IMG(
        SVG_HEAL_FLOW,
        "Luồng self-heal: đoán thay thế → guardrail quyết định heal hay fail loudly.",
        "The self-heal flow: guess a replacement → guardrail decides to heal or fail loudly.",
        "自己修復の流れ: 代替を推測 → ガードレールが修復か明示的失敗かを決める。"
      ),
      NOTE(
        "Self-healing giảm số test đỏ do UI đổi, nhưng nó xử lý TRIỆU CHỨNG (locator giòn), không xử lý NGUYÊN NHÂN. Gốc rễ vẫn là chọn locator bền và cấu trúc test tốt.",
        "Self-healing reduces red tests from UI changes, but it treats the SYMPTOM (brittle locators), not the ROOT CAUSE. The root remains choosing resilient locators and good test structure.",
        "自己修復は UI 変更による赤いテストを減らしますが、症状(脆いロケーター)を扱うのであり、根本原因を扱いません。根本は依然として頑健なロケーターの選択と良いテスト構造です。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Vì sao tin mù vào self-healing là nguy hiểm",
      en: "2. Why blindly trusting self-healing is dangerous",
      ja: "2. なぜ自己修復を盲信するのが危険なのか",
    },
    blocks: [
      P(
        "Rủi ro cốt lõi: self-healing có thể 'chữa lành' một thứ đáng lẽ phải đỏ. Hãy tưởng tượng nút 'Xác nhận thanh toán' bị lỗi và biến mất, nhưng gần đó có nút 'Huỷ' hình dạng tương tự. Cơ chế heal thấy locator 'thanh toán' fail, tìm phần tử giống nhất, và có thể chọn nhầm nút 'Huỷ' vì nó ở đúng vị trí. Test 'xanh' — nhưng nó vừa che giấu một bug nghiêm trọng: nút thanh toán đã biến mất khỏi UI. Đây là kịch bản tồi tệ nhất: self-heal biến một lỗi thật thành đèn xanh giả.",
        "The core risk: self-healing can 'heal' something that should have been red. Imagine the 'Confirm payment' button is broken and disappears, but nearby there's a similarly shaped 'Cancel' button. The heal mechanism sees the 'payment' locator fail, finds the most similar element, and may wrongly pick the 'Cancel' button because it's in the right position. The test goes 'green' — but it just masked a serious bug: the payment button vanished from the UI. This is the worst case: self-heal turns a real bug into a false green.",
        "核心的リスク: 自己修復は、赤であるべきものを「治す」ことがあります。「支払い確認」ボタンが壊れて消えたが、近くに形の似た「キャンセル」ボタンがあるとします。修復機構は「支払い」ロケーターの失敗を見て最も類似した要素を探し、位置が合うため誤って「キャンセル」ボタンを選ぶかもしれません。テストは「グリーン」になりますが、深刻なバグ——支払いボタンが UI から消えた——を覆い隠したのです。これが最悪のケースです。自己修復が本物のバグを偽のグリーンに変えます。"
      ),
      WARN(
        "Một test thanh toán tự 'heal' sang nút khác rồi báo xanh có thể để lọt lỗi mất tiền ra production. Trong domain tiền/quyền, self-heal im lặng là điều tuyệt đối phải chặn.",
        "A payment test that self-'heals' to a different button and reports green can let a money-losing bug reach production. In money/access domains, silent self-heal is something you must absolutely block.",
        "別のボタンへ自己「修復」してグリーンを報告する支払いテストは、金銭損失のバグを本番へ流出させかねません。金銭・権限のドメインでは、沈黙の自己修復は絶対に阻止すべきものです。"
      ),
      P(
        "Rủi ro thứ hai là 'nợ ẩn': mỗi lần heal thành công mà không ai để ý, locator gốc vẫn sai trong code nhưng test vẫn xanh nhờ heal. Theo thời gian, bộ test tích luỹ hàng loạt locator hỏng được 'vá' bởi heal, và không ai biết test thật sự đang kiểm gì. Đến một ngày heal đoán sai, hoặc nhiều thay đổi chồng lên nhau, cả hệ thống test sụp đổ cùng lúc và không ai hiểu nó từng kiểm gì. Self-heal không log và không buộc sửa gốc sẽ nuôi dưỡng loại nợ này.",
        "The second risk is 'hidden debt': every successful heal that no one notices means the original locator is still wrong in code but the test stays green thanks to healing. Over time the suite accumulates masses of broken locators 'patched' by heal, and nobody knows what the tests actually check. One day a heal guesses wrong, or many changes stack up, and the whole test system collapses at once with nobody understanding what it once checked. Self-heal without logging and without forcing root fixes feeds this debt.",
        "第二のリスクは「隠れた負債」です。誰も気づかない成功した修復のたびに、元のロケーターはコード内で依然誤っているのに、修復のおかげでテストはグリーンのままです。時とともにスイートは修復で「パッチ」された壊れたロケーターを大量に蓄積し、テストが実際に何を検証しているか誰も分からなくなります。ある日修復が誤り、または多くの変更が積み重なると、テストシステム全体が一度に崩壊し、かつて何を検証していたか誰も理解できません。ログなし・根本修正の強制なしの自己修復はこの負債を養います。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Nền tảng: locator bền (role/label/test-id)",
      en: "3. Foundation: resilient locators (role/label/test-id)",
      ja: "3. 基礎: 頑健なロケーター(role/label/test-id)",
    },
    blocks: [
      P(
        "Cách phòng thủ tốt nhất trước locator giòn không phải là self-heal, mà là chọn locator bền ngay từ đầu. Playwright khuyến nghị một thang ưu tiên: ưu tiên getByRole (theo vai trò và tên có thể đọc, gắn với accessibility), rồi getByLabel/getByPlaceholder (theo nhãn người dùng thấy), rồi getByTestId (thuộc tính data-testid đặt riêng cho test). Tránh CSS class và XPath tuyệt đối vì chúng vỡ ngay khi cấu trúc DOM đổi. Locator càng gần ngữ nghĩa người dùng, càng ít giòn.",
        "The best defense against brittle locators is not self-heal but choosing resilient locators from the start. Playwright recommends a priority ladder: prefer getByRole (by role and readable name, tied to accessibility), then getByLabel/getByPlaceholder (by the label a user sees), then getByTestId (a data-testid attribute set aside for tests). Avoid CSS classes and absolute XPath because they break the moment the DOM structure changes. The closer a locator is to user semantics, the less brittle it is.",
        "脆いロケーターへの最良の防御は自己修復ではなく、最初から頑健なロケーターを選ぶことです。Playwright は優先順位の階段を推奨します。まず getByRole(role と読み取れる name で、アクセシビリティに結びつく)、次に getByLabel/getByPlaceholder(利用者が見るラベルで)、次に getByTestId(テスト用に設けた data-testid 属性)。CSS class と絶対 XPath は DOM 構造が変わった瞬間に壊れるため避けます。ロケーターが利用者の意味に近いほど脆くありません。"
      ),
      IMG(
        SVG_LOCATOR_LADDER,
        "Thang ưu tiên locator: role/label/test-id bền; CSS/XPath giòn.",
        "The locator priority ladder: role/label/test-id resilient; CSS/XPath brittle.",
        "ロケーター優先順位の階段: role/label/test-id は頑健、CSS/XPath は脆い。"
      ),
      CODE(
        "ts",
        `// Locator bền vs giòn — chọn đúng thì cần self-heal ít hơn hẳn
// ✅ BỀN: bám ngữ nghĩa, sống sót qua đổi màu/layout
await page.getByRole('button', { name: 'Đặt hàng' }).click();
await page.getByLabel('Số thẻ').fill('4242 4242 4242 4242');
await page.getByTestId('checkout-submit').click();

// ❌ GIÒN: vỡ ngay khi refactor DOM / đổi class utility
await page.locator('div.container > form > button.btn.btn-primary.mt-4').click();
await page.locator('//html/body/div[3]/div[2]/form/button[1]').click();`
      ),
      P(
        "Một điểm hay: getByRole vừa làm test bền, vừa buộc ứng dụng có accessibility tốt (vì test chỉ tìm được nút khi nút có role và tên đúng chuẩn ARIA). Nghĩa là chọn locator bền tạo hiệu ứng tốt kép: test ít giòn hơn và sản phẩm dễ tiếp cận hơn cho người dùng khuyết tật. Khi nền tảng locator đã vững, self-heal chỉ còn là lưới an toàn cho vài trường hợp lẻ, không phải cột chống cho cả bộ test giòn.",
        "A nice point: getByRole makes tests resilient and forces good app accessibility (because the test only finds a button when it has a proper ARIA role and name). So choosing resilient locators has a double benefit: less brittle tests and a more accessible product for disabled users. When the locator foundation is solid, self-heal is just a safety net for a few odd cases, not a prop holding up a whole brittle suite.",
        "良い点: getByRole はテストを頑健にし、良いアプリのアクセシビリティを強制します(適切な ARIA role と name を持つときのみテストがボタンを見つけるため)。つまり頑健なロケーターの選択は二重の利点を持ちます。脆さの少ないテストと、障害のある利用者により使いやすい製品です。ロケーターの基礎が堅牢なら、自己修復はいくつかの特殊ケースの安全網に過ぎず、脆いスイート全体を支える支柱ではありません。"
      ),
      TIP(
        "Trước khi bật self-heal, hãy sửa locator giòn trước. Self-heal đắp lên nền yếu chỉ trì hoãn ngày sụp đổ; nền locator bền mới là khoản đầu tư đúng.",
        "Before enabling self-heal, fix brittle locators first. Self-heal layered on a weak base only delays the collapse; a resilient locator foundation is the right investment.",
        "自己修復を有効にする前に、まず脆いロケーターを直しましょう。弱い土台の上の自己修復は崩壊の日を先延ばしにするだけです。頑健なロケーターの基礎こそ正しい投資です。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Page Object Model: gom locator về một chỗ",
      en: "4. Page Object Model: centralizing locators",
      ja: "4. ページオブジェクトモデル: ロケーターの一元化",
    },
    blocks: [
      P(
        "Page Object Model (POM) là mẫu thiết kế gom mọi locator và hành động của một màn hình vào một lớp (class) riêng. Test không gọi trực tiếp locator mà gọi phương thức nghiệp vụ như checkout.placeOrder(). Lợi ích với self-healing rất rõ: khi UI đổi, bạn chỉ sửa locator ở MỘT chỗ trong page object, thay vì rải rác khắp hàng trăm test. POM biến việc bảo trì locator từ cơn ác mộng thành một thay đổi tập trung — và giảm mạnh nhu cầu phải dựa vào self-heal.",
        "The Page Object Model (POM) is a design pattern that centralizes all locators and actions of a screen into a dedicated class. Tests don't call locators directly but call business methods like checkout.placeOrder(). The benefit for self-healing is clear: when the UI changes, you fix the locator in ONE place in the page object, instead of scattered across hundreds of tests. POM turns locator maintenance from a nightmare into a centralized change — and sharply reduces the need to rely on self-heal.",
        "ページオブジェクトモデル(POM)は、ある画面のすべてのロケーターとアクションを専用のクラスに一元化する設計パターンです。テストはロケーターを直接呼ばず、checkout.placeOrder() のような業務メソッドを呼びます。自己修復にとっての利点は明白です。UI が変わったとき、数百のテストに散らばった箇所ではなく、ページオブジェクトの一箇所でロケーターを直します。POM はロケーター保守を悪夢から一元的な変更へ変え、自己修復に頼る必要を大幅に減らします。"
      ),
      CODE(
        "ts",
        `// pages/CheckoutPage.ts — locator gom về 1 chỗ; đổi UI chỉ sửa ở đây
import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly cardInput: Locator;
  readonly placeOrderBtn: Locator;
  readonly orderStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locator bền, khai báo 1 lần — sửa UI chỉ đụng file này
    this.cardInput = page.getByLabel('Số thẻ');
    this.placeOrderBtn = page.getByRole('button', { name: 'Đặt hàng' });
    this.orderStatus = page.getByRole('status');
  }

  async placeOrder(card: string) {
    await this.cardInput.fill(card);
    await this.placeOrderBtn.click();
    // Oracle nghiệp vụ nằm trong page object, không rải khắp test
    await expect(this.orderStatus).toHaveText(/PAID/);
  }
}`
      ),
      P(
        "Khi kết hợp POM với locator bền và self-heal có kiểm soát, bạn có ba lớp phòng thủ chồng lên nhau: locator bền để ít vỡ, POM để sửa tập trung khi có vỡ, và self-heal như lưới cuối cho những thay đổi nhỏ bất ngờ giữa các lần chạy. Thứ tự quan trọng: hai lớp đầu là chủ động và tất định, lớp self-heal là bị động và cần guardrails. Đừng bao giờ đảo ngược — dựa vào self-heal để bù cho POM lười và locator ẩu là công thức dẫn tới bộ test không ai hiểu.",
        "Combining POM with resilient locators and controlled self-heal gives you three defensive layers stacked: resilient locators to break less, POM to fix centrally when breakage happens, and self-heal as a last net for small unexpected changes between runs. Order matters: the first two layers are proactive and deterministic, the self-heal layer is reactive and needs guardrails. Never invert this — relying on self-heal to compensate for lazy POM and sloppy locators is a recipe for a suite nobody understands.",
        "POM を頑健なロケーターと制御された自己修復と組み合わせると、三つの防御層が積み重なります。壊れにくくする頑健なロケーター、壊れたとき一元的に直す POM、実行間の小さな予期せぬ変更への最後の網としての自己修復です。順序が重要です。最初の二層は能動的・決定論的で、自己修復層は受動的でガードレールを要します。決して逆転させないこと。怠惰な POM と雑なロケーターを補うために自己修復に頼るのは、誰も理解できないスイートへの処方箋です。"
      ),
      NOTE(
        "POM là 'điểm chân lý duy nhất' cho locator. Khi có POM, phần lớn 'đổi UI' chỉ là một PR sửa vài dòng — self-heal chỉ cần lo phần dư ít ỏi còn lại.",
        "POM is the 'single source of truth' for locators. With POM, most 'UI changes' are just a few-line PR — self-heal only handles the small remainder.",
        "POM はロケーターの「唯一の真実の源」です。POM があれば、ほとんどの「UI 変更」は数行の PR で済み、自己修復は残ったわずかな部分だけを扱います。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Guardrail 1: ngưỡng tin cậy và fail khi mơ hồ",
      en: "5. Guardrail 1: confidence thresholds and failing on ambiguity",
      ja: "5. ガードレール 1: 信頼度しきい値と曖昧時の失敗",
    },
    blocks: [
      P(
        "Guardrail đầu tiên và quan trọng nhất: đặt ngưỡng tin cậy cho mỗi lần heal, và fail loudly (báo lỗi rõ ràng) khi độ tin cậy thấp hoặc có nhiều ứng viên tương đương. Nếu cơ chế heal chỉ 60% chắc chắn phần tử thay thế là đúng, hoặc thấy ba nút đều 'giống', nó không được im lặng chọn đại. Nó phải dừng, đánh dấu test là thất bại, và ghi rõ 'heal mơ hồ: 3 ứng viên, score cao nhất 0.62 < ngưỡng 0.9'. Thà đỏ ồn ào còn hơn xanh im lặng dối trá.",
        "The first and most important guardrail: set a confidence threshold for each heal, and fail loudly when confidence is low or there are multiple equivalent candidates. If the heal mechanism is only 60% sure the replacement is right, or sees three 'similar' buttons, it must not silently pick one. It must stop, mark the test failed, and clearly log 'ambiguous heal: 3 candidates, top score 0.62 < threshold 0.9'. Better a loud red than a silent lying green.",
        "最初で最も重要なガードレール: 各修復に信頼度しきい値を設定し、信頼度が低い、または同等の候補が複数あるときは明示的に失敗(fail loudly)させます。修復機構が代替が正しいと 60% しか確信していない、または「似た」ボタンを三つ見つけたなら、沈黙して一つを選んではいけません。停止し、テストを失敗とマークし、「曖昧な修復: 候補 3、最高スコア 0.62 < しきい値 0.9」と明確に記録せねばなりません。沈黙して嘘をつくグリーンより、騒がしい赤の方が良いのです。"
      ),
      CODE(
        "ts",
        `// Guardrail heal có ngưỡng: mơ hồ -> FAIL, không đoán liều
type HealResult = { locator: Locator; score: number; candidates: number };

async function healOrFail(healed: HealResult, ctx: { critical: boolean }) {
  const THRESHOLD = ctx.critical ? 0.98 : 0.9;  // luồng tiền: ngưỡng ngặt hơn
  if (healed.candidates > 1) {
    throw new Error(\`Heal MƠ HỒ: \${healed.candidates} ứng viên -> FAIL loudly, cần người xem\`);
  }
  if (healed.score < THRESHOLD) {
    throw new Error(\`Heal độ tin cậy \${healed.score} < \${THRESHOLD} -> KHÔNG heal, báo lỗi\`);
  }
  // Chỉ heal khi rõ ràng & duy nhất; vẫn phải log sự kiện (xem chương sau)
  return healed.locator;
}`
      ),
      P(
        "Điểm tinh tế của ngưỡng: nó nên khác nhau theo mức độ nghiêm trọng của luồng. Với luồng ít rủi ro (hiển thị danh sách, đọc hồ sơ), ngưỡng 0.9 có thể chấp nhận được để tránh đỏ vặt. Nhưng với luồng tiền, quyền truy cập, xoá dữ liệu — nơi chọn nhầm phần tử gây hậu quả thật — ngưỡng phải cực cao hoặc tắt hẳn self-heal, buộc con người xử lý mọi thay đổi. Không có ngưỡng 'một cỡ vừa tất cả'; nó phải phản ánh chi phí của việc heal sai.",
        "The subtlety of the threshold: it should vary by the flow's severity. For low-risk flows (showing a list, reading a profile), a 0.9 threshold may be acceptable to avoid trivial red. But for money, access, or delete flows — where picking the wrong element causes real harm — the threshold must be very high or self-heal turned off entirely, forcing humans to handle every change. There's no 'one size fits all' threshold; it must reflect the cost of a wrong heal.",
        "しきい値の微妙な点: フローの重大度に応じて変えるべきです。低リスクなフロー(一覧表示、プロフィール閲覧)では、些細な赤を避けるため 0.9 のしきい値が許容できるかもしれません。しかし金銭・権限・削除のフロー——誤った要素を選ぶと実害が出る——では、しきい値を極めて高くするか自己修復を完全にオフにし、あらゆる変更を人間に処理させねばなりません。「万能」のしきい値はなく、誤った修復のコストを反映せねばなりません。"
      ),
      QA(
        "Khi self-heal gặp nhiều ứng viên tương đương thì nên làm gì?",
        "What should self-heal do when it hits multiple equivalent candidates?",
        "Fail loudly, không đoán liều. Nhiều ứng viên nghĩa là mơ hồ — đoán đại có thể chọn nhầm phần tử (ví dụ nút Huỷ thay vì Thanh toán) và che bug. Đúng là dừng test, log rõ 'N ứng viên, score cao nhất X < ngưỡng', và để con người quyết. Trong luồng nhạy cảm, thà một test đỏ rõ ràng còn hơn một test xanh dối lừa.",
        "Fail loudly, don't guess. Multiple candidates mean ambiguity — guessing may pick the wrong element (e.g. Cancel instead of Pay) and mask a bug. The right move is to stop the test, clearly log 'N candidates, top score X < threshold', and let a human decide. In sensitive flows, a clearly red test beats a deceptively green one.",
        "明示的に失敗させ、当てずっぽうはしません。候補が複数あることは曖昧さを意味します。推測は誤った要素(例:支払いの代わりにキャンセル)を選びバグを隠しかねません。正しい対応はテストを停止し、「候補 N、最高スコア X < しきい値」と明確に記録し、人間に判断させることです。機微なフローでは、欺くグリーンより明確な赤の方が良いのです。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Guardrail 2: log sự kiện heal và buộc sửa gốc",
      en: "6. Guardrail 2: logging heal events and forcing root fixes",
      ja: "6. ガードレール 2: 修復イベントの記録と根本修正の強制",
    },
    blocks: [
      P(
        "Self-heal im lặng là nguy hiểm nhất, vì nó tạo nợ ẩn. Guardrail thứ hai: mọi lần heal phải để lại dấu vết — ghi log locator gốc, locator thay thế, điểm tin cậy, test nào, lúc nào. Log này biến heal từ 'phép màu vô hình' thành 'sự kiện có thể audit'. Tốt hơn nữa, mỗi heal thành công nên tự động mở một task nhắc sửa locator gốc trong POM, để test 'lành lại' đúng nghĩa chứ không phụ thuộc heal mãi mãi.",
        "Silent self-heal is the most dangerous because it creates hidden debt. The second guardrail: every heal must leave a trace — log the original locator, the replacement, the confidence score, which test, and when. This log turns heal from 'invisible magic' into an 'auditable event'. Better still, each successful heal should automatically open a task to fix the original locator in the POM, so the test truly 'recovers' rather than depending on heal forever.",
        "沈黙の自己修復が最も危険なのは、隠れた負債を作るからです。第二のガードレール: あらゆる修復は痕跡を残さねばなりません。元のロケーター、代替、信頼度スコア、どのテストか、いつかを記録します。このログは修復を「見えない魔法」から「監査可能なイベント」へ変えます。さらに良いのは、成功した各修復が POM の元のロケーターを直すタスクを自動的に開くことです。そうすればテストは永遠に修復に依存するのではなく、真に「回復」します。"
      ),
      CODE(
        "ts",
        `// Log mọi heal event -> có thể audit, và mở issue nhắc sửa gốc
type HealEvent = {
  test: string; original: string; replacement: string;
  score: number; ts: string;
};

function reportHeal(e: HealEvent) {
  // 1) Ghi log có cấu trúc để dashboard/audit đọc được
  console.warn('[HEAL]', JSON.stringify(e));
  // 2) Đánh dấu test là "đã heal" để reporter hiển thị nhãn cảnh báo
  //    (test KHÔNG được coi là "xanh sạch")
  // 3) Nếu vượt ngưỡng số lần heal cho 1 locator -> tạo issue sửa POM
  if (healCount(e.original) >= 3) {
    fileIssue(\`Locator "\${e.original}" đã heal 3 lần -> sửa dứt điểm trong POM\`);
  }
}`
      ),
      P(
        "Một chính sách hữu hiệu: coi test 'đã heal' không phải là 'xanh sạch'. Reporter nên hiển thị nhãn màu vàng 'HEALED' bên cạnh test đó, và định kỳ (ví dụ mỗi sprint) đội xem lại danh sách heal để dọn nợ. Nếu một locator phải heal ba lần trở lên, đó là tín hiệu rõ rằng locator gốc quá giòn và cần sửa dứt điểm — chứ không phải cứ để heal gánh mãi. Log không chỉ để audit khi có sự cố, mà còn là công cụ chủ động dọn nợ kỹ thuật.",
        "An effective policy: treat a 'healed' test as not 'cleanly green'. The reporter should show a yellow 'HEALED' label next to it, and periodically (e.g. each sprint) the team reviews the heal list to pay down debt. If a locator has to heal three or more times, that's a clear signal the original locator is too brittle and needs a definitive fix — not to keep letting heal carry it forever. The log isn't only for post-incident audit but a proactive tool to clear technical debt.",
        "有効な方針: 「修復された」テストを「きれいなグリーン」と見なさないこと。レポーターはその横に黄色の「HEALED」ラベルを表示し、定期的に(例:スプリントごと)チームが修復リストを見直して負債を返済すべきです。あるロケーターが三回以上修復されねばならないなら、元のロケーターが脆すぎて根本的な修正が必要な明確な信号です。永遠に修復に運ばせ続けるのではありません。ログは事後監査のためだけでなく、技術的負債を片付ける能動的なツールです。"
      ),
      TIP(
        "Dựng một dashboard 'heal rate' theo thời gian. Nếu tỉ lệ heal tăng đều, đó là báo động sớm rằng chất lượng locator đang xuống cấp — sửa gốc trước khi nó thành khủng hoảng.",
        "Build a 'heal rate' dashboard over time. A steadily rising heal rate is an early warning that locator quality is degrading — fix the root before it becomes a crisis.",
        "時系列の「修復率」ダッシュボードを作りましょう。修復率が着実に上がるなら、ロケーター品質が劣化している早期警告です。危機になる前に根本を直します。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Guardrail 3: duyệt của con người cho heal quan trọng",
      en: "7. Guardrail 3: human approval for critical heals",
      ja: "7. ガードレール 3: 重要な修復への人間の承認",
    },
    blocks: [
      P(
        "Guardrail thứ ba là cửa duyệt của con người. Với các luồng nhạy cảm, một heal không được tự động áp dụng mà phải sinh ra một đề xuất (diff) để người review chấp thuận trước khi bộ test coi là hợp lệ. Mô hình giống như code review: heal đề xuất 'đổi locator A thành B', người nhìn cả hai, xác nhận B đúng là phần tử ta muốn, rồi mới merge thay đổi locator vào POM. Cách này giữ tốc độ ở luồng thường mà không mất kiểm soát ở luồng quan trọng.",
        "The third guardrail is a human approval gate. For sensitive flows, a heal must not auto-apply but produce a proposal (a diff) for a reviewer to approve before the suite treats it as valid. The model is like code review: the heal proposes 'change locator A to B', the human sees both, confirms B is indeed the element we want, then merges the locator change into the POM. This keeps speed on ordinary flows without losing control on critical ones.",
        "第三のガードレールは人間の承認ゲートです。機微なフローでは、修復は自動適用せず、スイートが有効と見なす前にレビュアーが承認する提案(差分)を生成せねばなりません。モデルはコードレビューに似ています。修復が「ロケーター A を B に変更」と提案し、人間が両方を見て、B が確かに望む要素だと確認し、その後ロケーター変更を POM にマージします。これにより通常のフローで速度を保ちつつ、重要なフローで制御を失いません。"
      ),
      CODE(
        "ts",
        `// Luồng phá huỷ: heal KHÔNG tự áp dụng, sinh đề xuất chờ người duyệt
async function proposeHealForReview(e: HealEvent, flow: { destructive: boolean }) {
  if (flow.destructive) {
    // Xoá/thanh toán/đổi quyền: KHÔNG auto-heal dù score cao
    await createReviewRequest({
      title: \`[HEAL DUYỆT] \${e.test}\`,
      diff: \`- \${e.original}\\n+ \${e.replacement}  (score \${e.score})\`,
      blocking: true,          // test coi là FAIL cho tới khi người duyệt
      note: 'Luồng phá huỷ — xác nhận phần tử thay thế đúng NGỮ NGHĨA, không chỉ đúng vị trí',
    });
    throw new Error('Heal ở luồng phá huỷ đang chờ người duyệt -> test FAIL, không tự chạy');
  }
  return e.replacement;       // luồng thường: đã qua ngưỡng, vẫn được log
}`
      ),
      SCEN(
        "Cửa duyệt chặn một heal sai",
        "The approval gate blocks a wrong heal",
        "Một hệ thống SaaS đa tenant chạy self-heal ban đêm. Sáng ra, cơ chế heal đề xuất đổi locator nút 'Xoá workspace' vì id đã đổi. Nhưng reviewer nhìn diff phát hiện: heal chọn nhầm sang nút 'Lưu trữ workspace' ở gần đó (score 0.91, chỉ một ứng viên nên không tự fail). Vì đây là hành động phá huỷ, cửa duyệt bắt buộc con người xem — và người đã chặn kịp một test lẽ ra sẽ xoá dữ liệu tenant thật khi chạy. Nếu heal tự áp dụng, hậu quả đã rất nặng.",
        "A multi-tenant SaaS runs self-heal overnight. In the morning, the heal proposes changing the 'Delete workspace' button locator because the id changed. But the reviewer, seeing the diff, spots that heal wrongly picked the nearby 'Archive workspace' button (score 0.91, single candidate so it didn't auto-fail). Because this is a destructive action, the approval gate forced a human to look — and the human blocked in time a test that would have deleted a real tenant's data on run. Had heal auto-applied, the consequences would have been severe.",
        "あるマルチテナント SaaS が夜間に自己修復を実行します。朝、id が変わったため修復が「ワークスペース削除」ボタンのロケーター変更を提案します。しかしレビュアーは差分を見て、修復が近くの「ワークスペースアーカイブ」ボタンを誤って選んだこと(スコア 0.91、単一候補のため自動失敗しなかった)に気づきます。これは破壊的操作なので、承認ゲートが人間に見ることを強制し、実行時に実際のテナントのデータを削除したはずのテストを人間が間に合って阻止しました。修復が自動適用していたら、結果は深刻だったでしょう。"
      ),
      P(
        "Bài học từ kịch bản: score cao và một ứng viên duy nhất không đủ để tin ở luồng phá huỷ. Vì hai nút gần nhau và giống nhau về cấu trúc có thể cho score cao mà vẫn sai về ngữ nghĩa. Duyệt của con người là lớp bắt những sai lầm mà thuật toán score không phân biệt được — đặc biệt khi ngữ cảnh nghiệp vụ (đây là nút phá huỷ) quan trọng hơn độ giống hình thức. Guardrail này chính là hiện thân của nguyên tắc 'người giữ quyết định ở nơi hậu quả nặng'.",
        "The lesson from the scenario: a high score and a single candidate aren't enough to trust in destructive flows. Because two nearby, structurally similar buttons can score high yet be semantically wrong. Human approval is the layer that catches mistakes the scoring algorithm can't distinguish — especially when business context (this is a destructive button) matters more than formal similarity. This guardrail embodies the principle 'humans hold the decision where consequences are heavy'.",
        "シナリオの教訓: 高いスコアと単一候補は、破壊的フローで信頼するのに十分ではありません。近くにある構造的に似た二つのボタンは高スコアでも意味的に誤り得るからです。人間の承認は、スコアアルゴリズムが区別できない誤りを捕える層です。特に業務的文脈(これは破壊的ボタン)が形式的類似性より重要なときに。このガードレールは「結果が重い場所で人間が判断を握る」原則の体現です。"
      ),
      WARN(
        "Đừng cho self-heal quyền tự áp dụng ở luồng phá huỷ (xoá, thanh toán, đổi quyền). Một score cao vẫn có thể trỏ nhầm sang phần tử tương tự nhưng khác nghĩa. Luôn cần cửa duyệt.",
        "Don't give self-heal auto-apply power on destructive flows (delete, pay, change permissions). A high score can still point to a similar but semantically different element. Always require an approval gate.",
        "破壊的フロー(削除、支払い、権限変更)で自己修復に自動適用の権限を与えないでください。高いスコアでも、似ているが意味の異なる要素を指し得ます。常に承認ゲートを要します。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Quan hệ với Playwright Healer agent",
      en: "8. Relation to the Playwright Healer agent",
      ja: "8. Playwright Healer エージェントとの関係",
    },
    blocks: [
      P(
        "Từ Playwright 1.56, bộ Playwright Agents có một tác nhân tên Healer. Cần phân biệt: Healer không phải là self-heal 'im lặng đổi locator lúc chạy production test'. Healer chạy ở chế độ gỡ lỗi, thu thập tín hiệu console/network/ARIA snapshot khi test đỏ, rồi ĐỀ XUẤT một bản sửa (diff) cho con người duyệt — có thể là đổi locator, thêm điều kiện chờ, hoặc đánh dấu skip. Nói cách khác, thiết kế của Healer đã tích hợp sẵn guardrail 'đề xuất chứ không tự áp dụng'.",
        "Since Playwright 1.56, the Playwright Agents set includes an agent named Healer. A distinction is needed: the Healer is not a 'silently change the locator during production test runs' self-heal. The Healer runs in debug mode, collects console/network/ARIA-snapshot signals when a test goes red, then PROPOSES a fix (a diff) for humans to approve — possibly changing a locator, adding a wait, or marking skip. In other words, the Healer's design has the 'propose, don't auto-apply' guardrail built in.",
        "Playwright 1.56 以降、Playwright Agents には Healer というエージェントが含まれます。区別が必要です。Healer は「本番テスト実行中に沈黙してロケーターを変える」自己修復ではありません。Healer はデバッグモードで動き、テストが赤になったときコンソール・ネットワーク・ARIA スナップショットの信号を集め、人間が承認する修正(差分)を提案します。ロケーター変更、待機追加、スキップのマークかもしれません。つまり Healer の設計には「提案し、自動適用しない」ガードレールが組み込まれています。"
      ),
      P(
        "Điểm mạnh nhất của Healer là biết phân biệt lỗi test và lỗi app. Khi tín hiệu là locator lỗi thời (phần tử đổi role/name), nó đề xuất sửa test. Nhưng khi tín hiệu là POST /pay trả 500 hay một Uncaught TypeError trong console, nó KHÔNG 'chữa' test thành xanh mà báo đây là bug ứng dụng, tạo issue cho người điều tra. Sự phân biệt này chính là ranh giới mà một self-heal ngây thơ thường vượt qua — và là lý do Healer an toàn hơn heal thuần heuristic.",
        "The Healer's greatest strength is distinguishing test bugs from app bugs. When the signal is a stale locator (element changed role/name), it proposes fixing the test. But when the signal is POST /pay returning 500 or an Uncaught TypeError in the console, it does NOT 'heal' the test to green but reports this as an application bug and files an issue for humans. This distinction is exactly the boundary a naive self-heal typically crosses — and the reason the Healer is safer than pure-heuristic heal.",
        "Healer の最大の強みは、テストのバグとアプリのバグを区別することです。信号が陳腐化したロケーター(要素の role/name が変わった)なら、テストの修正を提案します。しかし信号が POST /pay の 500 やコンソールの Uncaught TypeError なら、テストをグリーンに「治さず」、これをアプリケーションのバグと報告し人間の調査のため issue を作ります。この区別こそ、素朴な自己修復が典型的に越える境界であり、Healer が純粋なヒューリスティック修復より安全な理由です。"
      ),
      CODE(
        "bash",
        `# Healer chạy ở chế độ debug, đọc tín hiệu để ĐỀ XUẤT sửa (người duyệt)
npx playwright test checkout.spec.ts --headed --debug

# Healer đề xuất diff (KHÔNG tự merge):
#   - await page.getByRole('button', { name: 'Đặt hàng' })
#   + await page.getByRole('button', { name: 'Đặt hàng ngay' })  // UI đổi label
# Nhưng nếu POST /pay = 500:
#   -> KHÔNG sửa test. Tạo issue "app bug: payment 500". Con người điều tra.`
      ),
      NOTE(
        "Healer của Playwright là 'self-heal có guardrail sẵn': đề xuất diff cho người duyệt và phân biệt lỗi test vs lỗi app. Đó là mô hình an toàn hơn heal tự áp dụng lúc chạy.",
        "Playwright's Healer is 'self-heal with built-in guardrails': it proposes diffs for human approval and distinguishes test bugs from app bugs. That's a safer model than auto-apply heal at run time.",
        "Playwright の Healer は「ガードレール内蔵の自己修復」です。人間の承認のため差分を提案し、テストのバグとアプリのバグを区別します。実行時の自動適用修復より安全なモデルです。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Đo lường: giảm flaky thật hay che bug thật",
      en: "9. Measuring: reducing flakiness vs masking real bugs",
      ja: "9. 測定: フレーキー削減か、本物のバグ隠蔽か",
    },
    blocks: [
      P(
        "Câu hỏi sống còn khi đánh giá self-heal: nó đang giảm flaky thật, hay đang che bug thật? Hai thứ này nhìn từ xa giống nhau (đều làm số test đỏ giảm) nhưng bản chất trái ngược. Để phân biệt, bạn cần đo lường có kỷ luật: theo dõi tỉ lệ flaky trước/sau khi bật heal, số lần heal mỗi locator, và quan trọng nhất — có bao nhiêu heal về sau hoá ra đã che một bug thật (phát hiện qua báo lỗi từ người dùng hoặc qua audit).",
        "The vital question when evaluating self-heal: is it reducing real flakiness, or masking real bugs? From afar these look alike (both reduce red tests) but are opposite in nature. To distinguish, you need disciplined measurement: track the flaky rate before/after enabling heal, heals per locator, and most importantly — how many heals later turned out to have masked a real bug (found via user reports or audit).",
        "自己修復を評価する際の死活的な問い: 本物のフレーキーを減らしているのか、本物のバグを隠しているのか。遠目には両者は似ています(どちらも赤いテストを減らす)が、本質は正反対です。区別するには規律ある測定が必要です。修復有効化の前後のフレーキー率、ロケーターごとの修復回数、そして最も重要なこと——後にどれだけの修復が本物のバグを隠していたと判明したか(利用者報告や監査で発見)を追跡します。"
      ),
      UL(
        [
          "Tỉ lệ flaky (test đỏ rồi xanh lại khi retry mà không đổi code) trước và sau khi bật heal.",
          "Số heal / locator / tuần — tăng đều là dấu hiệu locator xuống cấp, không phải thành công.",
          "Tỉ lệ 'heal đúng' (thay thế đúng phần tử) vs 'heal che bug' (bỏ sót lỗi thật), xác nhận qua audit.",
          "Số bug lọt production mà lẽ ra test đã bắt nếu không bị heal che.",
          "Thời gian bảo trì locator tiết kiệm được — lợi ích thật của heal, cân với rủi ro.",
        ],
        [
          "Flaky rate (tests going red then green on retry without code change) before and after enabling heal.",
          "Heals / locator / week — a steady rise signals degrading locators, not success.",
          "Ratio of 'correct heal' (right replacement element) vs 'heal masking a bug' (missed a real defect), confirmed by audit.",
          "Bugs that reached production which tests would have caught had heal not masked them.",
          "Locator-maintenance time saved — heal's real benefit, weighed against the risk.",
        ],
        [
          "修復有効化の前後のフレーキー率(コード変更なしに再試行で赤から緑になるテスト)。",
          "ロケーターごと・週ごとの修復回数——着実な増加は成功ではなくロケーターの劣化の兆候。",
          "「正しい修復」(正しい代替要素)対「バグを隠す修復」(本物の欠陥を見逃す)の比率、監査で確認。",
          "修復が隠さなければテストが捕えたはずの、本番に到達したバグの数。",
          "節約したロケーター保守時間——修復の本当の利益、リスクと天秤にかける。",
        ]
      ),
      CODE(
        "ts",
        `// Reporter tuỳ biến: gắn cờ test "đã heal" và tổng hợp heal-rate để audit
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class HealAuditReporter implements Reporter {
  private healed: { test: string; original: string; score: number }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    for (const a of result.attachments) {
      if (a.name === 'heal-event' && a.body) {
        const e = JSON.parse(a.body.toString());
        this.healed.push({ test: test.title, original: e.original, score: e.score });
      }
    }
  }
  onEnd() {
    // Test "đã heal" KHÔNG được coi là "xanh sạch": in cảnh báo + số liệu heal-rate
    console.warn(\`[AUDIT] \${this.healed.length} test đã heal — cần review, không tin xanh máy móc\`);
    for (const h of this.healed) {
      if (h.score < 0.95) console.warn(\`  ⚠ score thấp \${h.score}: \${h.test} (\${h.original})\`);
    }
  }
}
export default HealAuditReporter;`
      ),
      P(
        "Một chỉ báo cảnh giác: nếu tỉ lệ flaky giảm nhưng số bug lọt production tăng, gần như chắc chắn self-heal đang che bug chứ không phải giảm flaky. 'Bộ test xanh hơn' không phải mục tiêu; 'bộ test bắt được nhiều lỗi thật hơn với ít nhiễu hơn' mới là. Khi trình bày kết quả self-heal cho quản lý, hãy luôn kèm cả hai mặt: thời gian tiết kiệm và rủi ro bug bị che — để quyết định dựa trên bức tranh đầy đủ, không chỉ con số xanh đẹp mắt.",
        "A warning indicator: if the flaky rate drops but production bugs rise, self-heal is almost certainly masking bugs rather than reducing flakiness. 'A greener suite' is not the goal; 'a suite that catches more real bugs with less noise' is. When presenting self-heal results to management, always include both sides: time saved and masked-bug risk — so decisions rest on the full picture, not just a pretty green number.",
        "警戒の指標: フレーキー率が下がるのに本番バグが増えるなら、自己修復はフレーキーを減らすのではなくほぼ確実にバグを隠しています。「より緑のスイート」は目標ではありません。「より少ないノイズでより多くの本物のバグを捕えるスイート」が目標です。自己修復の結果を経営陣に提示するときは、常に両面を含めます。節約した時間と隠されたバグのリスク——きれいな緑の数字だけでなく、全体像に基づいて判断できるように。"
      ),
      QA(
        "Làm sao biết self-heal đang giảm flaky chứ không che bug?",
        "How do you know self-heal is reducing flakiness rather than masking bugs?",
        "Đo song song hai chiều: tỉ lệ flaky (giảm là tốt) VÀ số bug lọt production (phải không tăng). Nếu flaky giảm mà bug lọt tăng, heal đang che. Thêm nữa: audit mẫu các heal, xác nhận nó thay đúng phần tử; log mọi heal để soi; và coi 'đã heal' không phải 'xanh sạch'. Mục tiêu là bắt nhiều lỗi thật hơn với ít nhiễu hơn, không phải làm bảng test xanh hơn.",
        "Measure two dimensions in parallel: flaky rate (down is good) AND production bugs (must not rise). If flaky drops but escaped bugs rise, heal is masking. Also: audit a sample of heals to confirm the right element was swapped; log every heal for inspection; and treat 'healed' as not 'cleanly green'. The goal is catching more real bugs with less noise, not making the board greener.",
        "二つの次元を並行して測ります。フレーキー率(下がるのは良い)と本番バグ(増えてはならない)。フレーキーが下がり流出バグが増えるなら、修復は隠しています。加えて、修復のサンプルを監査し正しい要素が交換されたか確認し、あらゆる修復を記録して精査し、「修復済み」を「きれいなグリーン」と見なしません。目標はより少ないノイズでより多くの本物のバグを捕えることで、ボードを緑にすることではありません。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Kịch bản thực chiến: SaaS đa tenant dùng self-heal",
      en: "10. Real-world scenario: a multi-tenant SaaS uses self-heal",
      ja: "10. 実戦シナリオ: マルチテナント SaaS が自己修復を使う",
    },
    blocks: [
      SCEN(
        "Áp self-heal đúng cách trong SaaS đổi UI liên tục",
        "Applying self-heal correctly in a fast-changing SaaS",
        "Một nền tảng SaaS quản lý dự án ra bản cập nhật UI mỗi tuần, khiến ~15% locator vỡ mỗi lần. Đội test dựng POM cho mọi màn hình, dùng getByRole/getByTestId làm locator chính, rồi bật self-heal CÓ guardrail: ngưỡng 0.92 cho luồng thường, tắt heal ở luồng xoá/đổi quyền, log mọi heal, và mọi heal ở luồng thanh toán đều phải người duyệt. Sau một quý, thời gian bảo trì test giảm ~35%, tỉ lệ flaky giảm rõ, mà không có bug nào lọt qua vì heal che — vì các luồng nguy hiểm đã bị khoá khỏi auto-heal.",
        "A project-management SaaS ships UI updates weekly, breaking ~15% of locators each time. The test team builds a POM for every screen, uses getByRole/getByTestId as primary locators, then enables self-heal WITH guardrails: threshold 0.92 for ordinary flows, heal off for delete/permission flows, log every heal, and every heal on payment flows requires human approval. After a quarter, test-maintenance time dropped ~35%, flaky rate fell noticeably, and no bug slipped through due to masking — because dangerous flows were locked out of auto-heal.",
        "あるプロジェクト管理 SaaS は毎週 UI 更新を出荷し、毎回約 15% のロケーターが壊れます。テストチームは全画面に POM を構築し、getByRole/getByTestId を主ロケーターに使い、ガードレール付きで自己修復を有効化します。通常フローはしきい値 0.92、削除・権限フローは修復オフ、あらゆる修復を記録、支払いフローの修復はすべて人間の承認が必要。一四半期後、テスト保守時間は約 35% 減り、フレーキー率は目に見えて下がり、隠蔽によるバグの流出はゼロでした。危険なフローが自動修復から締め出されていたためです。"
      ),
      P(
        "Bài học rút ra khớp với toàn bộ bài viết: self-heal có giá trị thật (giảm bảo trì, giảm flaky) nhưng chỉ khi nó đứng SAU nền tảng locator bền + POM và bị bao bọc bởi guardrails. Đội này không dùng heal để bù cho locator ẩu; họ đã có nền tốt, và dùng heal như lưới an toàn cho phần thay đổi nhỏ không tránh khỏi. Chính vì đặt heal đúng vị trí trong hệ thống phòng thủ nhiều lớp mà họ gặt lợi ích mà không gánh rủi ro che bug.",
        "The lesson matches the whole article: self-heal has real value (less maintenance, less flakiness) but only when it sits BEHIND a resilient-locator + POM foundation and is wrapped in guardrails. This team didn't use heal to compensate for sloppy locators; they had a good foundation and used heal as a safety net for the small, unavoidable changes. Precisely by placing heal correctly within a multi-layer defense did they reap the benefit without carrying the bug-masking risk.",
        "教訓は記事全体と一致します。自己修復は本当の価値(保守削減、フレーキー削減)を持ちますが、頑健なロケーター + POM の基礎の後ろに位置し、ガードレールで包まれているときのみです。このチームは雑なロケーターを補うために修復を使いませんでした。良い基礎を持ち、避けられない小さな変更への安全網として修復を使いました。まさに多層防御の中に修復を正しく配置したからこそ、バグ隠蔽のリスクを負わずに利益を得たのです。"
      ),
      TIP(
        "Khi bật self-heal ở dự án mới, hãy bắt đầu ở luồng ít rủi ro và tắt hoàn toàn ở luồng phá huỷ/tiền/quyền. Mở rộng dần dựa trên số liệu audit thực tế, không dựa trên niềm tin.",
        "When enabling self-heal on a new project, start on low-risk flows and turn it fully off on destructive/money/permission flows. Expand gradually based on real audit data, not on faith.",
        "新しいプロジェクトで自己修復を有効にするときは、低リスクなフローから始め、破壊的・金銭・権限のフローでは完全にオフにします。信念ではなく実際の監査データに基づいて徐々に拡大します。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Sai lầm thường gặp với self-healing",
      en: "11. Common mistakes with self-healing",
      ja: "11. 自己修復のよくある失敗",
    },
    blocks: [
      UL(
        [
          "Dùng self-heal để bù cho locator giòn thay vì sửa gốc — đắp nợ, không trả nợ.",
          "Bật heal im lặng, không log — mất khả năng audit, nuôi nợ ẩn.",
          "Cho heal tự áp dụng ở luồng phá huỷ/tiền — nguy cơ chọn nhầm phần tử gây hậu quả thật.",
          "Coi test 'đã heal' như 'xanh sạch' — bỏ qua tín hiệu locator đang xuống cấp.",
          "Chỉ đo tỉ lệ flaky, không đo bug lọt production — không thấy heal đang che bug.",
        ],
        [
          "Using self-heal to compensate for brittle locators instead of fixing the root — accruing debt, not paying it.",
          "Enabling silent heal with no logging — losing auditability, feeding hidden debt.",
          "Letting heal auto-apply on destructive/money flows — risking a wrong element pick with real consequences.",
          "Treating 'healed' tests as 'cleanly green' — ignoring the signal that locators are degrading.",
          "Only measuring flaky rate, not production bugs — not seeing heal mask bugs.",
        ],
        [
          "根本を直す代わりに脆いロケーターを補うため自己修復を使う——負債を返さず積む。",
          "ログなしの沈黙修復を有効化——監査可能性を失い、隠れた負債を養う。",
          "破壊的・金銭フローで修復を自動適用させる——実害を伴う誤った要素選択のリスク。",
          "「修復済み」テストを「きれいなグリーン」と見なす——ロケーター劣化の信号を無視。",
          "フレーキー率だけを測り本番バグを測らない——修復がバグを隠すのを見逃す。",
        ]
      ),
      P(
        "Điểm chung của các sai lầm này là 'để máy giấu vấn đề thay vì phơi bày vấn đề'. Một bộ test tốt phải làm lỗi trở nên dễ thấy, còn self-heal dùng sai lại làm lỗi trở nên vô hình. Nguyên tắc kim chỉ nam: self-heal chỉ được phép giấu sự thay đổi NGẪU NHIÊN và VÔ HẠI của UI (đổi màu, đổi tên class), tuyệt đối không được giấu sự BIẾN MẤT hay SAI LỆCH của một phần tử chức năng. Ranh giới đó phân định giữa công cụ hữu ích và cái bẫy nguy hiểm.",
        "The common thread of these mistakes is 'letting the machine hide the problem instead of exposing it'. A good test suite makes bugs visible, while misused self-heal makes bugs invisible. The guiding principle: self-heal may only hide RANDOM and HARMLESS UI changes (color change, class rename); it must never hide the DISAPPEARANCE or MISBEHAVIOR of a functional element. That boundary separates a useful tool from a dangerous trap.",
        "これらの失敗の共通点は「問題を露出させる代わりに機械に隠させる」ことです。良いテストスイートはバグを見えるようにしますが、誤用された自己修復はバグを見えなくします。指針となる原則: 自己修復はランダムで無害な UI 変更(色変更、class 改名)のみを隠してよく、機能要素の消失や誤動作を決して隠してはいけません。その境界が、有用なツールと危険な罠を分けます。"
      ),
      NOTE(
        "Nhớ một câu: self-heal được phép sửa CÁCH TÌM phần tử, không được phép sửa VIỆC phần tử đó có tồn tại và đúng nghĩa hay không.",
        "Remember one line: self-heal may fix HOW to find an element, never WHETHER that element exists and is semantically correct.",
        "一言覚えましょう: 自己修復は要素の見つけ方を直してよいが、その要素が存在し意味的に正しいかどうかを直してはいけません。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Góc phỏng vấn: self-healing & guardrails",
      en: "12. Interview angle: self-healing & guardrails",
      ja: "12. 面接の観点: 自己修復とガードレール",
    },
    blocks: [
      QA(
        "Self-healing locator hoạt động thế nào và rủi ro lớn nhất là gì?",
        "How do self-healing locators work and what is the biggest risk?",
        "Khi locator gốc fail, hệ thống nhìn các đặc trưng đã lưu (role, label, text, thuộc tính, vị trí) để tìm phần tử giống nhất trên trang hiện tại và gán điểm tin cậy, rồi dùng tạm nếu đủ giống. Rủi ro lớn nhất là che bug thật: nếu một phần tử chức năng biến mất, heal có thể chọn nhầm phần tử tương tự và báo xanh, giấu đi lỗi nghiêm trọng. Vì thế heal cần guardrail chứ không được tin mù.",
        "When the original locator fails, the system looks at saved features (role, label, text, attributes, position) to find the most similar element on the current page, assigns a confidence score, and uses it temporarily if similar enough. The biggest risk is masking real bugs: if a functional element disappears, heal may wrongly pick a similar element and report green, hiding a serious defect. That's why heal needs guardrails, not blind trust.",
        "元のロケーターが失敗すると、システムは保存した特徴(role、label、テキスト、属性、位置)を見て現在のページ上で最も類似した要素を探し、信頼度スコアを割り当て、十分似ていれば一時的に使います。最大のリスクは本物のバグを隠すことです。機能要素が消えた場合、修復は似た要素を誤って選びグリーンを報告し、深刻な欠陥を隠しかねません。だから修復は盲信ではなくガードレールを要します。"
      ),
      QA(
        "Những guardrail nào cần có khi dùng self-healing?",
        "What guardrails are needed when using self-healing?",
        "Ngưỡng tin cậy (fail loudly khi score thấp hoặc nhiều ứng viên), phân biệt ngưỡng theo mức nghiêm trọng (luồng tiền/xoá ngặt hơn hoặc tắt hẳn), log mọi heal để audit, coi test 'đã heal' không phải 'xanh sạch', buộc sửa gốc trong POM khi một locator heal nhiều lần, và cửa duyệt của con người cho heal ở luồng phá huỷ. Tất cả nhằm giữ lợi ích mà không để heal che bug.",
        "Confidence thresholds (fail loudly on low score or multiple candidates), severity-based thresholds (stricter or off for money/delete flows), logging every heal for audit, treating 'healed' tests as not 'cleanly green', forcing a root fix in POM when a locator heals repeatedly, and a human approval gate for heals on destructive flows. All to keep the benefit without letting heal mask bugs.",
        "信頼度しきい値(低スコアや複数候補で明示的に失敗)、重大度別しきい値(金銭・削除フローはより厳しくかオフ)、監査のためあらゆる修復を記録、「修復済み」テストを「きれいなグリーン」と見なさない、ロケーターが繰り返し修復されるとき POM で根本修正を強制、破壊的フローの修復への人間の承認ゲート。すべて修復にバグを隠させずに利益を保つためです。"
      ),
      QA(
        "Playwright Healer khác gì self-heal 'im lặng đổi locator lúc chạy'?",
        "How does Playwright's Healer differ from a 'silently swap locator at run time' self-heal?",
        "Healer chạy ở chế độ debug, đọc console/network/ARIA snapshot khi test đỏ, rồi ĐỀ XUẤT diff cho người duyệt — không tự áp dụng lúc chạy. Quan trọng hơn, nó phân biệt lỗi test (locator lỗi thời -> đề xuất sửa) và lỗi app (POST 500 -> KHÔNG chữa, tạo issue). Thiết kế này đã có guardrail 'đề xuất chứ không tự áp' và 'không che bug app' ngay bên trong, nên an toàn hơn heal heuristic tự áp dụng.",
        "The Healer runs in debug mode, reads console/network/ARIA snapshots when a test goes red, then PROPOSES a diff for human approval — it doesn't auto-apply at run time. More importantly, it distinguishes test bugs (stale locator -> propose fix) from app bugs (POST 500 -> don't heal, file an issue). This design has the 'propose, don't auto-apply' and 'don't mask app bugs' guardrails built in, making it safer than auto-applying heuristic heal.",
        "Healer はデバッグモードで動き、テストが赤になったときコンソール・ネットワーク・ARIA スナップショットを読み、人間の承認のため差分を提案します。実行時に自動適用しません。より重要なのは、テストのバグ(陳腐化したロケーター→修正を提案)とアプリのバグ(POST 500→治さず issue 作成)を区別することです。この設計は「提案し自動適用しない」「アプリのバグを隠さない」ガードレールを内蔵し、自動適用するヒューリスティック修復より安全です。"
      ),
      QA(
        "Làm sao chứng minh self-heal có lợi mà không che bug trong báo cáo?",
        "How do you demonstrate self-heal is beneficial without masking bugs in a report?",
        "Trình bày cả hai mặt bằng số liệu: lợi ích (thời gian bảo trì tiết kiệm, tỉ lệ flaky giảm) VÀ rủi ro kiểm soát (số bug lọt production không tăng, tỉ lệ heal đúng qua audit cao, log đầy đủ, luồng nguy hiểm đã khoá auto-heal). Nếu flaky giảm mà bug lọt tăng thì heal đang che bug — phải nói thẳng. Quyết định nên dựa trên bức tranh đầy đủ, không chỉ con số xanh.",
        "Present both sides with data: benefits (maintenance time saved, flaky rate down) AND controlled risk (production bugs not rising, high correct-heal ratio from audit, complete logs, dangerous flows locked out of auto-heal). If flaky drops but escaped bugs rise, heal is masking — say it plainly. Decisions should rest on the full picture, not just a green number.",
        "両面をデータで提示します。利益(節約した保守時間、下がったフレーキー率)と制御されたリスク(本番バグが増えない、監査による高い正修復率、完全なログ、危険なフローを自動修復から締め出し済み)。フレーキーが下がり流出バグが増えるなら修復は隠しています——率直に言います。判断は緑の数字だけでなく全体像に基づくべきです。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist self-heal an toàn",
      en: "13. Summary & safe self-heal checklist",
      ja: "13. まとめと安全な自己修復チェックリスト",
    },
    blocks: [
      P(
        "Self-healing locator là công cụ hữu ích để giảm bảo trì và giảm flaky khi UI đổi liên tục, nhưng nó chỉ an toàn khi đứng đúng vị trí trong hệ thống phòng thủ nhiều lớp: locator bền (role/label/test-id) làm nền, POM để sửa tập trung, và self-heal như lưới cuối được bao bọc bởi guardrails. Tin mù vào self-heal là nguy hiểm vì nó có thể biến một bug thật thành đèn xanh giả — đặc biệt chết người ở luồng tiền, quyền và xoá dữ liệu.",
        "A self-healing locator is a useful tool to cut maintenance and flakiness when the UI changes constantly, but it's only safe when placed correctly in a multi-layer defense: resilient locators (role/label/test-id) as the base, POM for centralized fixes, and self-heal as a last net wrapped in guardrails. Blindly trusting self-heal is dangerous because it can turn a real bug into a false green — especially deadly on money, access, and data-delete flows.",
        "自己修復ロケーターは、UI が絶えず変わるとき保守とフレーキーを減らす有用なツールですが、多層防御の中に正しく配置されたときのみ安全です。頑健なロケーター(role/label/test-id)を土台に、一元的な修正のための POM、ガードレールで包まれた最後の網としての自己修復。自己修復の盲信は危険です。本物のバグを偽のグリーンに変え得るからです。特に金銭・権限・データ削除のフローで致命的です。"
      ),
      UL(
        [
          "Nền tảng trước: locator bền (getByRole/Label/TestId) + POM gom locator về 1 chỗ.",
          "Ngưỡng tin cậy; fail loudly khi mơ hồ; ngưỡng ngặt hơn (hoặc tắt) ở luồng tiền/xoá/quyền.",
          "Log mọi heal event; coi test 'đã heal' không phải 'xanh sạch'; buộc sửa gốc khi heal lặp lại.",
          "Cửa duyệt con người cho heal ở luồng phá huỷ; ưu tiên Playwright Healer (đề xuất diff, phân biệt lỗi test vs app).",
          "Đo song song flaky giảm VÀ bug lọt production; trình bày cả lợi ích lẫn rủi ro che bug.",
        ],
        [
          "Foundation first: resilient locators (getByRole/Label/TestId) + POM centralizing locators.",
          "Confidence thresholds; fail loudly on ambiguity; stricter (or off) on money/delete/permission flows.",
          "Log every heal event; treat 'healed' tests as not 'cleanly green'; force a root fix on repeated heals.",
          "Human approval gate for heals on destructive flows; prefer Playwright Healer (proposes diffs, distinguishes test vs app bugs).",
          "Measure flaky drop AND production bugs in parallel; present both benefit and bug-masking risk.",
        ],
        [
          "基礎が先: 頑健なロケーター(getByRole/Label/TestId)+ ロケーターを一元化する POM。",
          "信頼度しきい値。曖昧時は明示的に失敗。金銭・削除・権限フローはより厳しく(またはオフ)。",
          "あらゆる修復イベントを記録。「修復済み」テストを「きれいなグリーン」と見なさない。繰り返し修復時は根本修正を強制。",
          "破壊的フローの修復に人間の承認ゲート。Playwright Healer を優先(差分を提案、テスト対アプリのバグを区別)。",
          "フレーキー削減と本番バグを並行して測定。利益とバグ隠蔽のリスクの両方を提示。",
        ]
      ),
      NOTE(
        "Kết luận toàn loạt bài AI-in-testing: AI làm phần cơ học (sinh case, đoán locator) rất giỏi, nhưng oracle nghiệp vụ, ranh giới an toàn và quyết định cuối luôn thuộc về con người. Đó là cách dùng AI đúng đắn trong kiểm thử.",
        "Overall conclusion of the AI-in-testing series: AI is great at the mechanical part (generating cases, guessing locators), but business oracles, safety boundaries and final decisions always belong to humans. That is how to use AI correctly in testing.",
        "AI テストシリーズ全体の結論: AI は機械的な部分(ケース生成、ロケーター推測)が非常に得意ですが、業務オラクル、安全境界、最終判断は常に人間に属します。それがテストで AI を正しく使う方法です。"
      ),
    ],
  },
];

// ---------------------------------------------------------------------------
const artA = {
  categorySlug: "ai-in-testing",
  slug: "ai-llm-generate-testcases-data",
  cover: coverA,
  tags: tags("congnghe", "ecommerce", "aitesting", "datadriven", "realworld", "interview"),
  title: {
    vi: "Dùng LLM sinh test case & dữ liệu test: grounding, an toàn PII, oracle",
    en: "Using LLMs to generate test cases & data: grounding, PII safety, oracles",
    ja: "LLM でテストケースとデータを生成: グラウンディング・PII 安全・オラクル",
  },
  summary: {
    vi: "Cách dùng LLM sinh bảng case dương/âm/biên và dữ liệu tổng hợp từ acceptance criteria: grounding chống hallucination, tuyệt đối không rò PII/secret, EP + BVA cùng AI, review thêm case domain, template prompt tái sử dụng và đo độ phủ theo phương pháp.",
    en: "How to use LLMs to generate positive/negative/boundary case tables and synthetic data from acceptance criteria: grounding against hallucination, never leaking PII/secrets, EP + BVA with AI, reviewing to add domain cases, reusable prompt templates and method-based coverage.",
    ja: "受け入れ基準から正常系・異常系・境界のケース表と合成データを LLM で生成する方法。ハルシネーション対策のグラウンディング、PII・シークレットを漏らさない、AI と行う EP + BVA、ドメインケースを追加するレビュー、再利用可能なプロンプトテンプレート、手法ベースの網羅率測定。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "ai-in-testing",
  slug: "ai-self-healing-locators-guardrails",
  cover: coverB,
  tags: tags("congnghe", "saas", "aitesting", "pom", "tip", "experience"),
  title: {
    vi: "AI self-healing locator & guardrails: giảm flaky mà không che bug",
    en: "AI self-healing locators & guardrails: reduce flakiness without masking bugs",
    ja: "AI 自己修復ロケーターとガードレール: バグを隠さずフレーキーを減らす",
  },
  summary: {
    vi: "Self-healing locator đoán locator thay thế khi UI đổi — hữu ích nhưng nguy hiểm nếu tin mù. Bài này kết hợp locator bền (role/label/test-id) + POM với guardrails (ngưỡng, duyệt, log, fail loudly khi mơ hồ), liên hệ Playwright Healer, và cách đo giảm flaky thật vs che bug thật.",
    en: "Self-healing locators guess replacements when the UI changes — useful but dangerous if trusted blindly. This article combines resilient locators (role/label/test-id) + POM with guardrails (thresholds, approval, logging, fail loudly on ambiguity), relates it to the Playwright Healer, and shows how to measure real flakiness reduction vs real bug masking.",
    ja: "自己修復ロケーターは UI 変更時に代替を推測します。有用ですが盲信すると危険です。本記事は頑健なロケーター(role/label/test-id)+ POM をガードレール(しきい値、承認、ログ、曖昧時の明示的失敗)と組み合わせ、Playwright Healer との関係を示し、本物のフレーキー削減と本物のバグ隠蔽を測る方法を解説します。",
  },
  pages: buildDoc(pagesB),
};

export const AI_DOCS_02 = [artA, artB];
