// ============================================================================
// AIAGENT_09 — 2 bài AI-agent QA cho CyberSoft Tester (trilingual VI/EN/JA).
// A (thucchien · insurance): AI agent kiểm thử ADJUDICATION bồi thường bằng
//    bảng quyết định — bất biến (kết quả bảng QĐ, loại trừ, thời gian chờ, hệ số
//    phí/định phí), agent tự sinh ca biên từ bảng QĐ, review người, oracle = QĐ kỳ vọng, CI.
// B (tichhop · ecommerce): E2E tích hợp — Playwright + API request-context oracle +
//    GitHub Actions sharding/blob + Playwright Agents (Planner/Generator/Healer)
//    dưới review người. Một pipeline khẳng định bất biến order-flow mỗi lần merge.
// Oracle-first: khẳng định BẤT BIẾN nghiệp vụ, không "thấy thành công". JA thật, khác EN.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia09a", domain: "insurance", kind: "thucchien", label: "CLAIMS · DECISION" });
const coverB = makeThumb({ id: "aia09b", domain: "ecommerce", kind: "tichhop", label: "PW·API·CI·AI" });

const pagesA = [];
const pagesB = [];

// ── ARTICLE A ── chương 1–4 ────────────────────────────────────────────────
pagesA.push({
  heading: {
    vi: "1. Bối cảnh: adjudication bồi thường ở quy mô doanh nghiệp",
    en: "1. Context: claims adjudication at enterprise scale",
    ja: "1. 背景：エンタープライズ規模の請求査定",
  },
  blocks: [
    P(
      "Adjudication là bước một hãng bảo hiểm quyết định một yêu cầu bồi thường (claim) sẽ được DUYỆT, TỪ CHỐI hay CHỜ bổ sung, và nếu duyệt thì trả bao nhiêu. Ở một hãng bảo hiểm sức khoẻ tầm trung, engine này xử lý hàng trăm nghìn claim mỗi ngày, gắn với SLA nội bộ (ví dụ 95% claim tự động trong 24 giờ) và ràng buộc tuân thủ pháp lý. Một quyết định sai không chỉ là bug: nó là tiền trả nhầm, là khiếu nại của khách, là rủi ro pháp lý và có thể là phạt từ cơ quan quản lý. Vì thế kiểm thử engine này phải khẳng định ĐÚNG QUYẾT ĐỊNH NGHIỆP VỤ, không phải chỉ 'trang không lỗi'.",
      "Adjudication is where an insurer decides whether a claim is APPROVED, DENIED or PENDED, and if approved, how much to pay. At a mid-size health insurer this engine processes hundreds of thousands of claims per day, bound by internal SLAs (e.g. 95% auto-adjudicated within 24 hours) and legal compliance constraints. A wrong decision is not merely a bug: it is money paid in error, a customer complaint, legal exposure, and potentially a regulatory fine. Testing this engine must therefore assert the CORRECT BUSINESS DECISION, not just that 'the page has no error'.",
      "査定とは、保険会社が請求を承認・却下・保留のいずれにするか、承認する場合はいくら支払うかを決める工程です。中規模の医療保険会社では、このエンジンは1日に数十万件の請求を処理し、社内SLA（例：24時間以内に95%を自動査定）と法令順守の制約に縛られます。誤った決定は単なるバグではなく、誤払い、顧客からの苦情、法的リスク、さらには当局からの制裁につながります。したがってこのエンジンのテストは、「画面にエラーがない」ではなく正しい業務上の決定を検証しなければなりません。"
    ),
    P(
      "Bài này xây dựng một AI test agent quanh engine đó. Agent KHÔNG phải là oracle: nó không được tự quyết đúng/sai. Oracle là BẢNG QUYẾT ĐỊNH (decision table) do nghiệp vụ và định phí duyệt — một artifact có thể kiểm tra bằng mắt người. Agent chỉ làm việc nó giỏi: đọc bảng quyết định, tự sinh ra tổ hợp ca kiểm thử (đặc biệt là các ca BIÊN mà con người hay bỏ sót), rồi để harness so kết quả thực tế với quyết định kỳ vọng suy ra từ bảng. Con người review các ca rủi ro và guardrail chặn agent tự 'sáng tác' quy tắc nghiệp vụ.",
      "This article builds an AI test agent around that engine. The agent is NOT the oracle: it does not get to decide right or wrong. The oracle is the DECISION TABLE owned and approved by underwriting and actuarial — an artifact a human can eyeball. The agent only does what it is good at: read the decision table, generate combinations of test cases (especially the BOUNDARY ones humans miss), then let the harness compare the actual outcome against the expected decision derived from the table. Humans review the risky cases and guardrails stop the agent from inventing business rules.",
      "本記事ではそのエンジンの周りにAIテストエージェントを構築します。エージェントはオラクルではありません。正誤を自分で決めることはできません。オラクルは、引受と数理部門が所有・承認する決定表であり、人間が目視で確認できる成果物です。エージェントは得意なことだけを行います。決定表を読み、テストケースの組み合わせ（特に人間が見落とす境界ケース）を生成し、ハーネスに実際の結果と決定表から導いた期待決定を比較させます。人間は危険なケースをレビューし、ガードレールがエージェントによる業務ルールの捏造を防ぎます。"
    ),
    UL(
      ["Quy mô: ~300k claim/ngày, 40+ sản phẩm, ~1.2k quy tắc nghiệp vụ hoạt động.",
       "SLA: 95% claim đơn giản tự động ≤ 24h; claim phức tạp chuyển thẩm định viên.",
       "Tuân thủ: lưu vết quyết định (audit trail), giải thích được lý do từ chối.",
       "Rủi ro: trả nhầm tiền, từ chối sai (bad faith), rò rỉ dữ liệu y tế (PHI)."],
      ["Scale: ~300k claims/day, 40+ products, ~1.2k active business rules.",
       "SLA: 95% simple claims auto-adjudicated ≤ 24h; complex claims to an adjuster.",
       "Compliance: decision audit trail, denial reason must be explainable.",
       "Risk: paying in error, wrongful denial (bad faith), leaking health data (PHI)."],
      ["規模：約30万件/日、40以上の商品、稼働中の業務ルール約1,200件。",
       "SLA：単純な請求の95%を24時間以内に自動査定、複雑な請求は査定担当者へ。",
       "コンプライアンス：決定の監査証跡、却下理由の説明可能性。",
       "リスク：誤払い、不当な却下（悪意）、医療データ（PHI）の漏洩。"]
    ),
    NOTE(
      "Nguyên tắc xuyên suốt bài: Oracle-first. Trước khi viết bất kỳ ca kiểm thử nào, ta phải trả lời được 'quyết định ĐÚNG là gì và vì sao', dựa trên bảng quyết định — không phải dựa trên output hiện tại của hệ thống.",
      "The through-line of this article: Oracle-first. Before writing any test, we must be able to answer 'what is the CORRECT decision and why', from the decision table — not from the system's current output.",
      "本記事の一貫した原則：オラクル・ファースト。テストを書く前に、システムの現在の出力ではなく決定表に基づいて「正しい決定は何か、なぜか」を答えられなければなりません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Bảng quyết định là oracle, không phải screenshot",
    en: "2. The decision table is the oracle, not a screenshot",
    ja: "2. 決定表がオラクルであり、スクリーンショットではない",
  },
  blocks: [
    P(
      "Một bảng quyết định gồm các ĐIỀU KIỆN (condition) ở cột trái và các HÀNH ĐỘNG/kết quả (action) ở cột phải; mỗi hàng là một luật (rule) map một tổ hợp điều kiện thành một quyết định. Với bảo hiểm sức khoẻ, điều kiện điển hình gồm: loại dịch vụ, hợp đồng còn hiệu lực, đã qua thời gian chờ chưa, chẩn đoán có nằm trong danh sách loại trừ không, số tiền so với hạn mức, quyền lợi còn lại trong năm. Bảng này là tài sản của nghiệp vụ; nó viết bằng ngôn ngữ con người đọc được và là điểm quy chiếu duy nhất cho 'đúng'.",
      "A decision table has CONDITIONS on the left and ACTIONS/outcomes on the right; each row is a rule mapping a combination of conditions to a decision. For health insurance, typical conditions include: service type, policy in force, waiting period elapsed, diagnosis on the exclusion list, amount vs. limit, remaining annual benefit. The table is a business asset; it is written in human-readable language and is the single reference point for 'correct'.",
      "決定表は左側に条件、右側にアクション（結果）を持ち、各行が条件の組み合わせを決定に対応づけるルールです。医療保険では代表的な条件として、サービス種別、契約の有効性、待機期間の経過、診断が免責リストにあるか、金額と上限の比較、年間給付の残額などがあります。この表は業務資産であり、人間が読める言語で書かれ、「正しい」の唯一の基準点となります。"
    ),
    P(
      "Sai lầm kinh điển là assert bằng UI: 'thấy chữ Approved màu xanh'. Nó giòn (đổi màu là hỏng), nó không kiểm được số tiền, và nó không phân biệt được 'duyệt đúng' với 'duyệt nhầm claim lẽ ra phải từ chối'. Oracle đúng phải suy ra quyết định kỳ vọng từ bảng, so cả TRẠNG THÁI (approve/deny/pend), LÝ DO (reason code) và SỐ TIỀN (payable). Ta mã hoá bảng quyết định thành dữ liệu để cả agent lẫn harness cùng đọc.",
      "The classic mistake is asserting via the UI: 'I see a green Approved label'. It is brittle (a colour change breaks it), it cannot check the amount, and it cannot tell 'correctly approved' from 'wrongly approved a claim that should have been denied'. A correct oracle derives the expected decision from the table and compares STATUS (approve/deny/pend), REASON (reason code) and AMOUNT (payable). We encode the decision table as data so both the agent and the harness read it.",
      "典型的な間違いはUIで検証することです。「緑色のApprovedラベルが見える」。これは脆く（色の変更で壊れる）、金額を確認できず、「正しく承認」と「却下すべき請求を誤って承認」を区別できません。正しいオラクルは決定表から期待決定を導き、ステータス（承認・却下・保留）、理由（理由コード）、金額（支払額）を比較します。エージェントとハーネスの両方が読めるよう、決定表をデータとして符号化します。"
    ),
    CODE("typescript", `// oracle/decision-table.ts — bảng quyết định là DỮ LIỆU, con người review được
export type Decision = "APPROVE" | "DENY" | "PEND";
export interface ClaimInput {
  serviceType: "OUTPATIENT" | "INPATIENT" | "DENTAL" | "MATERNITY";
  policyInForce: boolean;
  daysSinceEffective: number;      // để so với thời gian chờ
  diagnosisCode: string;           // ICD-10
  billedAmount: number;            // số tiền yêu cầu
  annualLimit: number;
  usedThisYear: number;            // đã dùng trong năm
  coinsuranceRate: number;         // vd 0.2 => khách trả 20%
}
export interface ExpectedDecision {
  decision: Decision;
  reasonCode: string;              // vd DENY_EXCLUSION, PEND_DOC
  payable: number;                 // số tiền hãng phải trả
}

// Thời gian chờ theo loại dịch vụ (ngày). Nghiệp vụ sở hữu con số này.
export const WAITING_PERIOD: Record<ClaimInput["serviceType"], number> = {
  OUTPATIENT: 30, INPATIENT: 30, DENTAL: 180, MATERNITY: 270,
};
// Danh sách loại trừ (rút gọn) — chẩn đoán không được chi trả.
export const EXCLUSIONS = new Set(["Z41.1" /*thẩm mỹ*/, "F17.2" /*cai thuốc*/]);`),
    IMG(
      `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="640" height="250" rx="10" fill="#1e1b4b"/><text x="20" y="30" fill="#c7d2fe" font-size="15" font-weight="700">Decision table → oracle → so sánh</text><g><rect x="20" y="50" width="180" height="170" rx="8" fill="#312e81" stroke="#6366f1"/><text x="30" y="72" fill="#e0e7ff" font-size="12" font-weight="700">DECISION TABLE</text><text x="30" y="94" fill="#a5b4fc" font-size="11">R1 loại trừ → DENY</text><text x="30" y="114" fill="#a5b4fc" font-size="11">R2 trong chờ → DENY</text><text x="30" y="134" fill="#a5b4fc" font-size="11">R3 vượt hạn → PEND</text><text x="30" y="154" fill="#a5b4fc" font-size="11">R4 thiếu ctừ → PEND</text><text x="30" y="174" fill="#a5b4fc" font-size="11">R5 hợp lệ → APPROVE</text><text x="30" y="200" fill="#818cf8" font-size="10">nghiệp vụ sở hữu</text></g><g><rect x="240" y="80" width="150" height="110" rx="8" fill="#0e7490" stroke="#22d3ee"/><text x="250" y="104" fill="#cffafe" font-size="12" font-weight="700">ORACLE()</text><text x="250" y="126" fill="#a5f3fc" font-size="11">input → expected</text><text x="250" y="146" fill="#a5f3fc" font-size="11">{decision,</text><text x="250" y="164" fill="#a5f3fc" font-size="11"> reason, payable}</text></g><g><rect x="430" y="80" width="180" height="110" rx="8" fill="#3730a3" stroke="#818cf8"/><text x="440" y="104" fill="#e0e7ff" font-size="12" font-weight="700">ASSERT</text><text x="440" y="126" fill="#c7d2fe" font-size="11">actual === expected?</text><text x="440" y="146" fill="#c7d2fe" font-size="11">status · reason · $</text><text x="440" y="170" fill="#fca5a5" font-size="11">lệch = FAIL</text></g><path d="M200 135 H240" stroke="#22d3ee" stroke-width="2" marker-end="url(#a)"/><path d="M390 135 H430" stroke="#818cf8" stroke-width="2" marker-end="url(#a)"/><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#94a3b8"/></marker></defs></svg>`,
      "Bảng quyết định (nghiệp vụ sở hữu) sinh ra quyết định kỳ vọng; harness so khớp trạng thái, lý do và số tiền.",
      "The decision table (owned by the business) produces the expected decision; the harness matches status, reason and amount.",
      "決定表（業務が所有）が期待決定を生成し、ハーネスがステータス・理由・金額を照合します。"
    ),
    TIP(
      "Đặt bảng quyết định vào version control cùng test. Mỗi thay đổi luật phải qua pull request để nghiệp vụ review — như vậy oracle luôn có người chịu trách nhiệm.",
      "Put the decision table in version control alongside the tests. Every rule change goes through a pull request reviewed by the business — so the oracle always has an accountable owner.",
      "決定表をテストと共にバージョン管理に置きます。ルール変更はすべて業務がレビューするプルリクエストを通すため、オラクルには常に責任者がいます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Bất biến nghiệp vụ dùng làm oracle",
    en: "3. Business invariants used as the oracle",
    ja: "3. オラクルとして使う業務不変条件",
  },
  blocks: [
    P(
      "Ngoài từng luật riêng lẻ, có những BẤT BIẾN đúng với MỌI claim bất kể tổ hợp điều kiện. Chúng là mạng lưới an toàn: nếu một luật mới vô tình phá vỡ bất biến, test sẽ bắt được ngay cả khi ta chưa nghĩ ra ca cụ thể. Đây chính là chỗ oracle-first phát huy: ta không liệt kê hết mọi input, ta khẳng định tính chất bất biến.",
      "Beyond individual rules, there are INVARIANTS that hold for EVERY claim regardless of the condition combination. They are a safety net: if a new rule accidentally breaks an invariant, a test catches it even when we did not think of the specific case. This is where oracle-first shines: we do not enumerate every input, we assert an invariant property.",
      "個々のルールを超えて、条件の組み合わせに関わらずすべての請求で成り立つ不変条件があります。これは安全網です。新しいルールが誤って不変条件を壊した場合、具体的なケースを思いつかなくてもテストが検出します。ここでオラクル・ファーストが真価を発揮します。すべての入力を列挙せず、不変な性質を検証するのです。"
    ),
    UL(
      ["Xác định (deterministic): cùng input → cùng quyết định (không phụ thuộc giờ chạy).",
       "payable không bao giờ âm và không vượt (billedAmount, hạn mức còn lại).",
       "Loại trừ áp đảo: chẩn đoán trong danh sách loại trừ ⇒ luôn DENY, không APPROVE.",
       "Thời gian chờ: trong thời gian chờ ⇒ không APPROVE cho quyền lợi tương ứng.",
       "Mọi DENY/PEND đều có reasonCode giải thích được (không có từ chối 'trơn').",
       "Đồng nhất tiền: payable = min(billed, còn lại) × (1 − coinsurance) khi APPROVE."],
      ["Deterministic: same input → same decision (independent of run time).",
       "payable is never negative and never exceeds (billedAmount, remaining limit).",
       "Exclusion dominates: diagnosis on the exclusion list ⇒ always DENY, never APPROVE.",
       "Waiting period: within the waiting period ⇒ no APPROVE for that benefit.",
       "Every DENY/PEND carries an explainable reasonCode (no 'bare' denial).",
       "Money consistency: payable = min(billed, remaining) × (1 − coinsurance) on APPROVE."],
      ["決定的：同じ入力→同じ決定（実行時刻に依存しない）。",
       "payableは負にならず、（billedAmount、残りの上限）を超えない。",
       "免責が優先：診断が免責リストにある⇒常に却下、決して承認しない。",
       "待機期間：待機期間内⇒その給付は承認しない。",
       "すべての却下・保留に説明可能な理由コードが付く（理由なしの却下はない）。",
       "金額の整合性：承認時 payable = min(billed, 残額) × (1 − 自己負担率)。"]
    ),
    CODE("typescript", `// oracle/oracle.ts — suy ra quyết định kỳ vọng THUẦN TỪ bảng, thứ tự luật rõ ràng
import { ClaimInput, ExpectedDecision, WAITING_PERIOD, EXCLUSIONS } from "./decision-table";

export function expectedDecision(c: ClaimInput): ExpectedDecision {
  // Thứ tự luật là một phần của oracle — loại trừ áp đảo, rồi hiệu lực, rồi chờ...
  if (!c.policyInForce)                 return { decision: "DENY", reasonCode: "DENY_POLICY_INACTIVE", payable: 0 };
  if (EXCLUSIONS.has(c.diagnosisCode))  return { decision: "DENY", reasonCode: "DENY_EXCLUSION", payable: 0 };
  if (c.daysSinceEffective < WAITING_PERIOD[c.serviceType])
                                        return { decision: "DENY", reasonCode: "DENY_WAITING", payable: 0 };
  const remaining = Math.max(0, c.annualLimit - c.usedThisYear);
  if (remaining === 0)                  return { decision: "DENY", reasonCode: "DENY_LIMIT_EXHAUSTED", payable: 0 };
  if (c.billedAmount > remaining)       return { decision: "PEND", reasonCode: "PEND_OVER_LIMIT", payable: 0 };
  const covered = Math.min(c.billedAmount, remaining);
  const payable = Math.round(covered * (1 - c.coinsuranceRate) * 100) / 100;
  return { decision: "APPROVE", reasonCode: "APPROVE_OK", payable };
}`),
    WARN(
      "Đừng để agent tự viết hàm oracle bằng LLM rồi tin ngay. LLM có thể hallucinate quy tắc (ví dụ 'tự thêm' một loại trừ không có trong hợp đồng). Oracle phải là code thuần, review được, phủ test riêng — agent chỉ được sinh INPUT, không được sinh EXPECTED.",
      "Do not let the agent write the oracle function with an LLM and trust it blindly. An LLM can hallucinate rules (e.g. 'inventing' an exclusion not in the contract). The oracle must be plain, reviewable code with its own tests — the agent may only generate the INPUT, never the EXPECTED.",
      "エージェントにLLMでオラクル関数を書かせて盲信してはいけません。LLMはルールを幻覚することがあります（契約にない免責を「捏造」するなど）。オラクルは独自のテストを持つ、レビュー可能な素のコードでなければなりません。エージェントは入力のみを生成でき、期待値を生成してはいけません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Kiến trúc: agent sinh ca — người review — harness kiểm",
    en: "4. Architecture: agent generates — human reviews — harness checks",
    ja: "4. アーキテクチャ：エージェント生成→人間レビュー→ハーネス検証",
  },
  blocks: [
    P(
      "Kiến trúc chia ba vai rõ ràng. AGENT đọc bảng quyết định và sinh tổ hợp input, tập trung vào biên (ranh giới thời gian chờ, đúng hạn mức, đúng danh sách loại trừ). NGƯỜI review phân loại: ca nào cho chạy tự động, ca nào là 'rủi ro cao' cần thẩm định viên xác nhận quyết định kỳ vọng bằng tay. HARNESS chạy input qua engine thật, lấy quyết định thực tế, so với expectedDecision() và với các bất biến. Ranh giới này giữ cho AI không bao giờ là quan toà.",
      "The architecture has three clear roles. The AGENT reads the decision table and generates input combinations, focusing on the boundaries (waiting-period edge, exact limit, exact exclusion list). The HUMAN triages: which cases run automatically, which are 'high-risk' and need an adjuster to hand-confirm the expected decision. The HARNESS runs the input through the real engine, takes the actual decision, and compares it to expectedDecision() and to the invariants. This boundary keeps the AI from ever being the judge.",
      "アーキテクチャには3つの明確な役割があります。エージェントは決定表を読み、境界（待機期間の端、上限ちょうど、免責リストちょうど）に焦点を当てて入力の組み合わせを生成します。人間はトリアージします。どのケースを自動実行し、どれが「高リスク」で査定担当者が期待決定を手動確認すべきか。ハーネスは入力を実エンジンに通し、実際の決定を取得し、expectedDecision()と不変条件に照合します。この境界により、AIが決して裁判官にならないようにします。"
    ),
    IMG(
      `<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="260" rx="10" fill="#1e1b4b"/><text x="20" y="28" fill="#c7d2fe" font-size="14" font-weight="700">Pipeline: sinh → review → kiểm</text><g><rect x="20" y="55" width="150" height="90" rx="8" fill="#3730a3" stroke="#818cf8"/><text x="34" y="80" fill="#e0e7ff" font-size="12" font-weight="700">AGENT</text><text x="34" y="102" fill="#c7d2fe" font-size="10">đọc bảng QĐ</text><text x="34" y="120" fill="#c7d2fe" font-size="10">sinh ca biên</text><text x="34" y="138" fill="#c7d2fe" font-size="10">(input only)</text></g><g><rect x="200" y="55" width="150" height="90" rx="8" fill="#4338ca" stroke="#a5b4fc"/><text x="214" y="80" fill="#e0e7ff" font-size="12" font-weight="700">HUMAN REVIEW</text><text x="214" y="102" fill="#c7d2fe" font-size="10">phân loại rủi ro</text><text x="214" y="120" fill="#c7d2fe" font-size="10">xác nhận ca cao</text><text x="214" y="138" fill="#c7d2fe" font-size="10">guardrail</text></g><g><rect x="380" y="55" width="150" height="90" rx="8" fill="#0e7490" stroke="#22d3ee"/><text x="394" y="80" fill="#cffafe" font-size="12" font-weight="700">ENGINE</text><text x="394" y="102" fill="#a5f3fc" font-size="10">adjudicate()</text><text x="394" y="120" fill="#a5f3fc" font-size="10">actual decision</text></g><g><rect x="380" y="165" width="260" height="75" rx="8" fill="#312e81" stroke="#6366f1"/><text x="394" y="190" fill="#e0e7ff" font-size="12" font-weight="700">HARNESS + ORACLE</text><text x="394" y="212" fill="#a5b4fc" font-size="10">actual vs expectedDecision()</text><text x="394" y="230" fill="#a5b4fc" font-size="10">+ kiểm bất biến (payable, reason)</text></g><path d="M170 100 H200" stroke="#a5b4fc" stroke-width="2" marker-end="url(#b)"/><path d="M350 100 H380" stroke="#22d3ee" stroke-width="2" marker-end="url(#b)"/><path d="M455 145 V165" stroke="#6366f1" stroke-width="2" marker-end="url(#b)"/><defs><marker id="b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#94a3b8"/></marker></defs></svg>`,
      "Agent chỉ sinh input; con người giữ cổng rủi ro; harness + oracle là nơi phán quyết đúng/sai.",
      "The agent only generates input; humans hold the risk gate; the harness + oracle is where correctness is judged.",
      "エージェントは入力のみ生成し、人間がリスクゲートを保持し、ハーネス＋オラクルが正誤を判定します。"
    ),
    CODE("typescript", `// adapter/engine.ts — gọi engine adjudication thật (ẩn sau cổng API nội bộ)
export interface ActualDecision { decision: string; reasonCode: string; payable: number; auditId: string; }

export async function adjudicate(claim: ClaimInput): Promise<ActualDecision> {
  const res = await fetch(process.env.ADJ_URL + "/v1/adjudicate", {
    method: "POST",
    headers: { "content-type": "application/json", "x-idempotency-key": hash(claim) },
    body: JSON.stringify(claim),
  });
  if (!res.ok) throw new Error("adjudicate HTTP " + res.status);
  return res.json();               // { decision, reasonCode, payable, auditId }
}`),
    SCEN(
      "Vì sao không để AI tự chấm điểm",
      "Why not let the AI grade itself",
      "Một team từng để LLM vừa sinh ca vừa tự phán 'đúng'. Sau một tháng, engine từ chối nhầm một nhóm claim thai sản nhưng test vẫn xanh — vì LLM đã 'đồng ý' với chính output sai của engine. Bài học: tách oracle khỏi agent, oracle là code review được.",
      "A team once let an LLM both generate cases and judge them 'correct'. After a month the engine wrongly denied a class of maternity claims but tests stayed green — because the LLM 'agreed' with the engine's own wrong output. Lesson: separate the oracle from the agent; the oracle is reviewable code.",
      "AIに自己採点させない理由",
      "あるチームはLLMにケース生成と「正しい」の判定の両方をさせました。1か月後、エンジンはある種の出産請求を誤って却下しましたが、テストは緑のままでした。LLMがエンジン自身の誤った出力に「同意」したからです。教訓：オラクルをエージェントから分離し、オラクルはレビュー可能なコードにすること。"
    ),
  ],
});

// ── ARTICLE A ── chương 5–8 ────────────────────────────────────────────────
pagesA.push({
  heading: {
    vi: "5. Agent sinh ca biên từ bảng quyết định",
    en: "5. The agent generates boundary cases from the decision table",
    ja: "5. エージェントが決定表から境界ケースを生成する",
  },
  blocks: [
    P(
      "Đây là chỗ AI agent thật sự có giá trị. Con người viết ca 'ở giữa' rất tốt nhưng lười và hay bỏ ca BIÊN: đúng ngày cuối thời gian chờ, số tiền bằng đúng hạn mức còn lại, chẩn đoán khác đúng một ký tự so với danh sách loại trừ. Agent đọc bảng quyết định, trích các ngưỡng số (30, 180, 270 ngày; hạn mức) rồi tự sinh bộ ca quanh mỗi ngưỡng theo phân tích giá trị biên (boundary value analysis): ngưỡng−1, ngưỡng, ngưỡng+1. Với biến hạng mục (loại trừ, loại dịch vụ) nó sinh mỗi lớp tương đương ít nhất một đại diện.",
      "This is where the AI agent truly earns its keep. Humans write the 'middle' cases well but get lazy and skip the BOUNDARY cases: exactly the last day of the waiting period, an amount equal to the exact remaining limit, a diagnosis one character off the exclusion list. The agent reads the decision table, extracts the numeric thresholds (30, 180, 270 days; limits) and generates cases around each threshold using boundary value analysis: threshold−1, threshold, threshold+1. For categorical variables (exclusions, service types) it produces at least one representative per equivalence class.",
      "ここでAIエージェントが真価を発揮します。人間は「中間」ケースはうまく書きますが、怠けて境界ケースを飛ばします。待機期間のちょうど最終日、残りの上限とちょうど同じ金額、免責リストと1文字違いの診断など。エージェントは決定表を読み、数値のしきい値（30、180、270日、上限）を抽出し、境界値分析を用いて各しきい値の周辺（しきい値−1、しきい値、しきい値+1）でケースを生成します。カテゴリ変数（免責、サービス種別）には各同値クラスから少なくとも1つの代表を生成します。"
    ),
    CODE("typescript", `// agent/generate.ts — sinh ca BIÊN quanh ngưỡng, KÈM quyết định kỳ vọng từ oracle
import { WAITING_PERIOD, EXCLUSIONS, ClaimInput } from "../oracle/decision-table";
import { expectedDecision } from "../oracle/oracle";

const base: ClaimInput = {
  serviceType: "OUTPATIENT", policyInForce: true, daysSinceEffective: 400,
  diagnosisCode: "J06.9", billedAmount: 1_000_000, annualLimit: 20_000_000,
  usedThisYear: 0, coinsuranceRate: 0.2,
};

export function* boundaryCases(): Generator<{ input: ClaimInput; note: string }> {
  // 1) Biên thời gian chờ cho từng loại dịch vụ
  for (const st of Object.keys(WAITING_PERIOD) as ClaimInput["serviceType"][]) {
    const w = WAITING_PERIOD[st];
    for (const d of [w - 1, w, w + 1])
      yield { input: { ...base, serviceType: st, daysSinceEffective: d }, note: \`waiting \${st}=\${w}, d=\${d}\` };
  }
  // 2) Biên hạn mức: billed = remaining-1, =remaining, =remaining+1
  const remaining = base.annualLimit - base.usedThisYear;
  for (const amt of [remaining - 1, remaining, remaining + 1])
    yield { input: { ...base, billedAmount: amt }, note: \`limit boundary amt=\${amt}\` };
  // 3) Lớp tương đương loại trừ: 1 mã bị loại trừ + 1 mã sát bên
  for (const dx of [...EXCLUSIONS, "Z41.2"])
    yield { input: { ...base, diagnosisCode: dx }, note: \`exclusion class dx=\${dx}\` };
}

// Mỗi ca đi kèm expected suy ra TỪ ORACLE, không phải từ agent tự nghĩ.
export const casesWithOracle = [...boundaryCases()].map(c => ({ ...c, expected: expectedDecision(c.input) }));`),
    NOTE(
      "Chú ý: expected LUÔN đến từ expectedDecision() (code review được), agent chỉ chọn INPUT. Nhờ vậy nếu engine sai ở biên thời gian chờ, harness sẽ báo đỏ vì actual ≠ expected — chứ không phải vì agent 'đoán'.",
      "Note: expected ALWAYS comes from expectedDecision() (reviewable code); the agent only picks the INPUT. So if the engine is wrong at the waiting-period edge, the harness goes red because actual ≠ expected — not because the agent 'guessed'.",
      "注意：expectedは常にexpectedDecision()（レビュー可能なコード）から来ます。エージェントは入力を選ぶだけです。そのため、エンジンが待機期間の端で誤ると、エージェントが「推測」したからではなく、actual ≠ expectedのためハーネスが赤くなります。"
    ),
    TIP(
      "Cho agent sinh cả ca 'pairwise' (bắt cặp) để giảm nổ tổ hợp: với 6 điều kiện, thay vì thử mọi tích Descartes, phủ mọi cặp giá trị đủ bắt phần lớn lỗi tương tác mà số ca vẫn nhỏ.",
      "Have the agent also generate 'pairwise' cases to tame combinatorial explosion: with 6 conditions, instead of the full Cartesian product, covering every pair of values catches most interaction bugs while keeping the case count small.",
      "組み合わせ爆発を抑えるため、エージェントに「ペアワイズ」ケースも生成させます。6つの条件で全直積の代わりに、すべての値のペアを網羅すれば、ケース数を小さく保ちつつ相互作用バグの大半を捕捉できます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Ma trận ca kiểm thử & lớp tương đương",
    en: "6. Test case matrix & equivalence classes",
    ja: "6. テストケースマトリクスと同値クラス",
  },
  blocks: [
    P(
      "Trước khi để agent chạy, ta phác một ma trận để con người kiểm chất lượng phủ. Mỗi hàng là một tổ hợp điều kiện chính; cột là quyết định kỳ vọng và lý do. Ma trận này vừa là tài liệu review, vừa là 'bộ ca vàng' (golden set) mà agent phải phủ được — nếu agent bỏ sót một hàng, ta biết ngay bộ sinh còn lỗ hổng.",
      "Before letting the agent loose, we sketch a matrix so humans can verify coverage. Each row is a combination of key conditions; the columns are the expected decision and reason. This matrix is both review documentation and a 'golden set' the agent must cover — if the agent misses a row, we immediately know the generator has a gap.",
      "エージェントを走らせる前に、人間がカバレッジを検証できるようマトリクスを描きます。各行が主要条件の組み合わせで、列が期待決定と理由です。このマトリクスはレビュー文書であると同時に、エージェントが網羅すべき「ゴールデンセット」でもあります。エージェントが行を見落とせば、ジェネレータに漏れがあるとすぐわかります。"
    ),
    IMG(
      `<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="240" rx="10" fill="#1e1b4b"/><text x="20" y="28" fill="#c7d2fe" font-size="14" font-weight="700">Ma trận ca (rút gọn)</text><g font-size="11" fill="#e0e7ff"><rect x="20" y="42" width="620" height="26" fill="#312e81"/><text x="30" y="60">Hợp đồng</text><text x="150" y="60">Chờ?</text><text x="230" y="60">Loại trừ?</text><text x="350" y="60">Số tiền vs hạn</text><text x="510" y="60">→ Kỳ vọng</text></g><g font-size="11" fill="#a5b4fc"><rect x="20" y="68" width="620" height="24" fill="#241f5e"/><text x="30" y="85">Hết hiệu lực</text><text x="150" y="85">-</text><text x="230" y="85">-</text><text x="350" y="85">-</text><text x="510" y="85" fill="#fca5a5">DENY_POLICY_INACTIVE</text><rect x="20" y="92" width="620" height="24"/><text x="30" y="109">Hiệu lực</text><text x="150" y="109">-</text><text x="230" y="109">Có</text><text x="350" y="109">-</text><text x="510" y="109" fill="#fca5a5">DENY_EXCLUSION</text><rect x="20" y="116" width="620" height="24" fill="#241f5e"/><text x="30" y="133">Hiệu lực</text><text x="150" y="133">Trong chờ</text><text x="230" y="133">Không</text><text x="350" y="133">-</text><text x="510" y="133" fill="#fca5a5">DENY_WAITING</text><rect x="20" y="140" width="620" height="24"/><text x="30" y="157">Hiệu lực</text><text x="150" y="157">Qua chờ</text><text x="230" y="157">Không</text><text x="350" y="157">Vượt hạn còn</text><text x="510" y="157" fill="#fcd34d">PEND_OVER_LIMIT</text><rect x="20" y="164" width="620" height="24" fill="#241f5e"/><text x="30" y="181">Hiệu lực</text><text x="150" y="181">Qua chờ</text><text x="230" y="181">Không</text><text x="350" y="181">Trong hạn</text><text x="510" y="181" fill="#86efac">APPROVE_OK</text></g><text x="20" y="215" fill="#818cf8" font-size="10">Golden set: agent PHẢI phủ mọi hàng; thiếu hàng = bộ sinh có lỗ hổng.</text></svg>`,
      "Ma trận ca vàng: mỗi hàng map tổ hợp điều kiện tới quyết định và lý do kỳ vọng.",
      "The golden case matrix: each row maps a condition combination to the expected decision and reason.",
      "ゴールデンケースマトリクス：各行が条件の組み合わせを期待決定と理由に対応づけます。"
    ),
    CODE("typescript", `// tests/coverage.spec.ts — kiểm agent PHỦ mọi lớp tương đương của golden set
import { expect, test } from "@playwright/test";
import { casesWithOracle } from "../agent/generate";

const REQUIRED_REASONS = [
  "DENY_POLICY_INACTIVE", "DENY_EXCLUSION", "DENY_WAITING",
  "DENY_LIMIT_EXHAUSTED", "PEND_OVER_LIMIT", "APPROVE_OK",
];

test("agent phủ mọi lớp quyết định trong golden set", () => {
  const produced = new Set(casesWithOracle.map(c => c.expected.reasonCode));
  for (const r of REQUIRED_REASONS) expect(produced, \`thiếu lớp \${r}\`).toContain(r);
});`),
    QA(
      "Phân tích giá trị biên (boundary value analysis) là gì và vì sao giao cho AI agent lại hợp lý?",
      "What is boundary value analysis and why is it a good fit for an AI agent?",
      "BVA là kỹ thuật chọn ca ngay tại và quanh các ngưỡng (ngưỡng−1, ngưỡng, ngưỡng+1) vì lỗi hay nằm ở ranh giới (dùng < thay ≤...). Hợp với AI agent vì các ngưỡng đã nằm sẵn trong bảng quyết định dạng số; agent trích ngưỡng và sinh ca cơ học, đầy đủ, không mệt mỏi — còn con người review tính hợp lý.",
      "BVA is picking cases at and around thresholds (threshold−1, threshold, threshold+1) because bugs cluster at boundaries (using < instead of ≤, etc.). It fits an AI agent because the thresholds already live in the decision table as numbers; the agent extracts them and generates cases mechanically, exhaustively, tirelessly — while humans review the reasonableness.",
      "境界値分析とは何か、なぜAIエージェントに適するか",
      "BVAはしきい値とその周辺（しきい値−1、しきい値、しきい値+1）でケースを選ぶ手法です。バグは境界に集中するからです（≤の代わりに<を使うなど）。しきい値は決定表に数値として既に存在するため、エージェントがそれを抽出し、機械的・網羅的・疲れ知らずにケースを生成できます。一方、人間は妥当性をレビューします。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Harness so khớp: trạng thái, lý do, số tiền",
    en: "7. The harness match: status, reason, amount",
    ja: "7. ハーネスの照合：ステータス・理由・金額",
  },
  blocks: [
    P(
      "Harness là nơi phán quyết. Với mỗi ca (input + expected từ oracle), nó gọi engine thật, rồi assert đủ ba mặt: trạng thái (APPROVE/DENY/PEND), reasonCode và payable. Assert cả ba là quan trọng — một engine có thể ra đúng trạng thái nhưng sai số tiền, hoặc từ chối đúng nhưng gán sai lý do (làm hỏng audit trail). Ta cũng kiểm bất biến trực tiếp trên actual: payable không âm, không vượt billed.",
      "The harness is where the verdict happens. For each case (input + expected from the oracle) it calls the real engine, then asserts all three facets: status (APPROVE/DENY/PEND), reasonCode and payable. Asserting all three matters — an engine can produce the right status but the wrong amount, or deny correctly but attach the wrong reason (breaking the audit trail). We also check invariants directly on the actual: payable non-negative, not exceeding billed.",
      "ハーネスは判定が行われる場所です。各ケース（入力＋オラクルからの期待値）で実エンジンを呼び、3つの側面すべてを検証します。ステータス（承認・却下・保留）、理由コード、支払額です。3つすべての検証が重要です。エンジンは正しいステータスでも誤った金額を出すことがあり、正しく却下しても誤った理由を付ける（監査証跡を壊す）ことがあります。実際の値に対して不変条件も直接確認します。支払額が負でなく、請求額を超えないこと。"
    ),
    CODE("typescript", `// tests/adjudicate.spec.ts — data-driven từ casesWithOracle; oracle-first
import { expect, test } from "@playwright/test";
import { casesWithOracle } from "../agent/generate";
import { adjudicate } from "../adapter/engine";

for (const { input, expected, note } of casesWithOracle) {
  test(\`adjudicate: \${note}\`, async () => {
    const actual = await adjudicate(input);

    // (1) khớp quyết định kỳ vọng — oracle từ bảng
    expect(actual.decision, "decision").toBe(expected.decision);
    expect(actual.reasonCode, "reason").toBe(expected.reasonCode);
    expect(actual.payable, "payable").toBeCloseTo(expected.payable, 2);

    // (2) bất biến trực tiếp trên actual — mạng an toàn không phụ thuộc ca
    expect(actual.payable).toBeGreaterThanOrEqual(0);
    expect(actual.payable).toBeLessThanOrEqual(input.billedAmount);
    if (actual.decision !== "APPROVE") expect(actual.payable).toBe(0);
    expect(actual.reasonCode, "mọi quyết định phải có lý do").not.toBe("");
    expect(actual.auditId, "phải ghi audit trail").toBeTruthy();
  });
}`),
    WARN(
      "toBeCloseTo cho tiền vì số thực có sai số; nhưng với tiền tệ nên tính bằng số nguyên (cent/xu) trong engine để tránh 0.1+0.2. Test dùng độ chính xác 2 chữ số chỉ là lớp phòng thủ, không thay được thiết kế tiền đúng.",
      "toBeCloseTo for money because floats have rounding error; but currency should be computed in integers (cents) inside the engine to avoid 0.1+0.2. The test's 2-digit precision is only a defensive layer, not a substitute for correct money design.",
      "浮動小数点には丸め誤差があるため金額にはtoBeCloseToを使いますが、通貨は0.1+0.2を避けるためエンジン内で整数（セント）で計算すべきです。テストの2桁精度は防御層にすぎず、正しい金額設計の代わりにはなりません。"
    ),
    QA(
      "Vì sao phải assert cả reasonCode chứ không chỉ trạng thái duyệt/từ chối?",
      "Why assert reasonCode and not just the approve/deny status?",
      "Vì reasonCode là căn cứ giải thích cho khách và cho kiểm toán. Một claim bị từ chối 'đúng trạng thái' nhưng gán lý do sai (ví dụ DENY_WAITING thay vì DENY_EXCLUSION) sẽ làm thư từ chối gửi khách sai, gây khiếu nại và rủi ro tuân thủ. Trạng thái đúng nhưng lý do sai vẫn là lỗi nghiệp vụ nghiêm trọng.",
      "Because the reasonCode is the basis for the explanation to the customer and to audit. A claim denied with the 'right status' but the wrong reason (e.g. DENY_WAITING instead of DENY_EXCLUSION) produces a wrong denial letter, causing complaints and compliance risk. A correct status with a wrong reason is still a serious business defect.",
      "ステータスだけでなく理由コードも検証する理由",
      "理由コードは顧客と監査への説明の根拠だからです。「正しいステータス」で却下されても誤った理由（DENY_EXCLUSIONの代わりにDENY_WAITINGなど）が付くと、誤った却下通知が送られ、苦情とコンプライアンスリスクを招きます。ステータスが正しくても理由が誤っていれば、依然として重大な業務上の欠陥です。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Ca lỗi sâu: idempotency, reprocess, thay đổi luật",
    en: "8. Deep failure cases: idempotency, reprocessing, rule change",
    ja: "8. 深い障害ケース：冪等性・再処理・ルール変更",
  },
  blocks: [
    P(
      "Ngoài quyết định 'lần đầu đúng', engine thật phải chịu được các tình huống vận hành. Idempotency: gửi lại cùng claim (retry mạng) phải cho cùng auditId và không trả tiền hai lần. Reprocess: khi bổ sung chứng từ, một claim PEND chuyển sang APPROVE phải cập nhật đúng, không tạo bút toán trùng. Thay đổi luật: khi nghiệp vụ sửa thời gian chờ, các claim đã quyết định trước đó không được bị 'hồi tố' ngoài ý muốn. Đây là những ca AI agent giúp sinh có hệ thống, còn oracle vẫn là bảng + bất biến.",
      "Beyond the 'first-time correct' decision, a real engine must survive operational situations. Idempotency: resending the same claim (a network retry) must return the same auditId and not pay twice. Reprocessing: when documents are added, a PENDed claim moving to APPROVE must update correctly, without a duplicate ledger entry. Rule change: when the business edits a waiting period, previously decided claims must not be unintentionally 'retroactively' changed. These are cases the AI agent helps generate systematically, while the oracle remains the table + invariants.",
      "「初回正しい」決定を超えて、実エンジンは運用上の状況に耐えねばなりません。冪等性：同じ請求を再送（ネットワーク再試行）しても同じauditIdを返し、二重払いしないこと。再処理：書類が追加され保留の請求が承認へ移るとき、重複した仕訳なしに正しく更新されること。ルール変更：業務が待機期間を編集したとき、既に決定済みの請求が意図せず「遡及的に」変更されないこと。これらはAIエージェントが体系的に生成を助けるケースで、オラクルは依然として表＋不変条件です。"
    ),
    CODE("typescript", `// tests/idempotency.spec.ts — gửi lại KHÔNG được trả tiền hai lần
import { expect, test } from "@playwright/test";
import { adjudicate } from "../adapter/engine";

test("gửi lại cùng claim là idempotent (một trạng thái cuối)", async () => {
  const claim = validApproveClaim();
  const first = await adjudicate(claim);
  const retry = await adjudicate(claim);          // cùng x-idempotency-key
  expect(retry.auditId).toBe(first.auditId);      // KHÔNG tạo bút toán mới
  expect(retry.payable).toBe(first.payable);
});

test("reprocess PEND→APPROVE không tạo bút toán trùng", async () => {
  const c = overLimitClaim();
  const pend = await adjudicate(c);
  expect(pend.decision).toBe("PEND");
  const fixed = await adjudicate({ ...c, annualLimit: c.annualLimit * 2 }); // bổ sung quyền lợi
  expect(fixed.decision).toBe("APPROVE");
  const ledger = await getLedgerEntries(c.claimId);
  expect(ledger.filter(e => e.type === "PAYOUT")).toHaveLength(1); // đúng MỘT lần trả
});`),
    SCEN(
      "Retry lúc nửa đêm gây trả tiền đôi",
      "A midnight retry that double-paid",
      "Một batch adjudication timeout ở tầng mạng nên job scheduler retry cả lô. Vì key idempotency chỉ tính trên claimId mà không tính nội dung, một số claim đã sửa trong lúc retry bị adjudicate lần hai và tạo hai payout. Ca kiểm thử idempotency với retry sau thay đổi là thứ đáng để agent sinh hàng loạt.",
      "An adjudication batch timed out at the network layer, so the scheduler retried the whole lot. Because the idempotency key was on claimId only, not the content, some claims edited during the retry got adjudicated twice and created two payouts. Idempotency tests with retry-after-change are exactly what the agent should generate in bulk.",
      "深夜の再試行が二重払いを起こした",
      "査定バッチがネットワーク層でタイムアウトし、スケジューラがロット全体を再試行しました。冪等キーが内容ではなくclaimIdのみだったため、再試行中に編集された一部の請求が二度査定され、2つの支払いが発生しました。変更後の再試行を伴う冪等性テストこそ、エージェントが大量に生成すべきものです。"
    ),
    NOTE(
      "Bất biến 'idempotent → một trạng thái cuối duy nhất' là oracle mạnh: ta không cần biết trước auditId, chỉ cần khẳng định hai lần gọi cho CÙNG kết quả và CHỈ một payout. Đây là kiểu property test hợp với ca do agent sinh.",
      "The invariant 'idempotent → a single final state' is a strong oracle: we need not know the auditId in advance, only assert that two calls give the SAME result and exactly ONE payout. This is a property-test style well suited to agent-generated cases.",
      "「冪等→唯一の最終状態」という不変条件は強力なオラクルです。auditIdを事前に知る必要はなく、2回の呼び出しが同じ結果と正確に1つの支払いを返すと検証するだけです。これはエージェント生成ケースに適したプロパティテストのスタイルです。"
    ),
  ],
});

// ── ARTICLE A ── chương 9–13 ───────────────────────────────────────────────
pagesA.push({
  heading: {
    vi: "9. Guardrail: giữ AI trong hàng rào",
    en: "9. Guardrails: keeping the AI inside the fence",
    ja: "9. ガードレール：AIを柵の内側に保つ",
  },
  blocks: [
    P(
      "Trao quyền sinh ca cho AI mà không có hàng rào là mời rủi ro. Guardrail gồm vài lớp. Lớp một: agent chỉ được sinh INPUT trong lược đồ (schema) đã khai báo — không được bịa trường mới, không tự đặt reasonCode. Lớp hai: mọi expected phải đến từ oracle code, không từ LLM. Lớp ba: ca 'rủi ro cao' (số tiền lớn, thai sản, tử vong) bị gắn cờ để thẩm định viên xác nhận thủ công trước khi vào bộ chạy tự động. Lớp bốn: agent không được chạm dữ liệu thật của bệnh nhân (PHI) — chỉ dùng dữ liệu tổng hợp.",
      "Handing case generation to an AI without a fence invites risk. Guardrails come in layers. Layer one: the agent may only generate INPUT within the declared schema — no inventing new fields, no setting reasonCodes itself. Layer two: every expected must come from the oracle code, not the LLM. Layer three: 'high-risk' cases (large amounts, maternity, death) are flagged for an adjuster to confirm manually before entering the auto-run set. Layer four: the agent must never touch real patient data (PHI) — only synthetic data.",
      "柵なしでケース生成をAIに委ねるのはリスクを招きます。ガードレールは層構造です。第1層：エージェントは宣言済みスキーマ内の入力のみ生成でき、新フィールドの捏造や理由コードの自己設定は不可。第2層：すべての期待値はLLMではなくオラクルコードから来ること。第3層：「高リスク」ケース（高額、出産、死亡）は自動実行セットに入る前に査定担当者が手動確認するようフラグ付けされること。第4層：エージェントは実際の患者データ（PHI）に決して触れず、合成データのみ使うこと。"
    ),
    CODE("typescript", `// agent/guardrail.ts — validate schema + gắn cờ ca rủi ro cao cho người review
import { z } from "zod";
export const ClaimSchema = z.object({
  serviceType: z.enum(["OUTPATIENT", "INPATIENT", "DENTAL", "MATERNITY"]),
  policyInForce: z.boolean(),
  daysSinceEffective: z.number().int().min(0),
  diagnosisCode: z.string().regex(/^[A-Z]\\d{2}(\\.\\d)?$/),
  billedAmount: z.number().min(0),
  annualLimit: z.number().min(0),
  usedThisYear: z.number().min(0),
  coinsuranceRate: z.number().min(0).max(1),
});

export function classify(input: unknown) {
  const c = ClaimSchema.parse(input);                 // agent KHÔNG được ra ngoài schema
  const highRisk = c.serviceType === "MATERNITY" || c.billedAmount >= 100_000_000;
  return { input: c, lane: highRisk ? "HUMAN_REVIEW" : "AUTO" as const };
}`),
    WARN(
      "Hallucination (ảo giác) là rủi ro số một khi dùng LLM sinh test. Nếu để LLM tự viết expected, nó có thể 'bịa' một quy tắc nghe hợp lý nhưng sai hợp đồng. Grounding (neo vào nguồn thật) = luôn suy expected từ bảng quyết định code, và chặn LLM bằng schema.",
      "Hallucination is the number-one risk when using an LLM to generate tests. If the LLM writes expected values, it can 'invent' a plausible-sounding rule that contradicts the contract. Grounding = always derive expected from the coded decision table, and constrain the LLM with a schema.",
      "ハルシネーション（幻覚）は、LLMでテストを生成する際の最大のリスクです。LLMに期待値を書かせると、契約に反するもっともらしいルールを「捏造」しかねません。グラウンディング（実データへの接地）とは、期待値を常にコード化された決定表から導き、スキーマでLLMを制約することです。"
    ),
    QA(
      "Làm sao ngăn AI test agent 'ảo giác' ra một quy tắc bảo hiểm không tồn tại?",
      "How do you stop an AI test agent from 'hallucinating' a nonexistent insurance rule?",
      "Ba lớp: (1) grounding — expected luôn suy từ bảng quyết định code review được, LLM không được viết expected; (2) schema/guardrail chặn agent chỉ sinh input hợp lệ; (3) golden set + coverage test để phát hiện agent bịa hoặc bỏ sót lớp. Nói ngắn: AI được sinh câu hỏi (input), con người và code giữ đáp án (oracle).",
      "Three layers: (1) grounding — expected always derived from the reviewable coded decision table, the LLM never writes expected; (2) a schema/guardrail restricts the agent to valid input only; (3) a golden set + coverage test detects invented or missing classes. In short: the AI may generate the questions (input), while humans and code hold the answers (oracle).",
      "AIテストエージェントが存在しない保険ルールを幻覚するのを防ぐ方法",
      "3つの層です。(1) グラウンディング：期待値は常にレビュー可能なコード化決定表から導き、LLMは期待値を書かない。(2) スキーマ・ガードレールがエージェントを有効な入力のみに制限する。(3) ゴールデンセット＋カバレッジテストが捏造や欠落クラスを検出する。要するに、AIは質問（入力）を生成でき、人間とコードが答え（オラクル）を保持します。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Hệ số phí & định phí trong bảng quyết định",
    en: "10. Premium & actuarial factors in the decision table",
    ja: "10. 決定表における保険料と数理係数",
  },
  blocks: [
    P(
      "Ở sản phẩm có đồng chi trả bậc thang và hệ số định phí (theo tuổi, gói, số năm không claim), số tiền chi trả không còn là phép nhân đơn giản. Bảng quyết định mở rộng thêm cột hệ số; oracle phải phản ánh chính xác cách nghiệp vụ định phí. Đây là mảnh dễ sai vì công thức thay đổi theo năm hợp đồng. Ta tách phần tính tiền thành một hàm thuần, phủ test riêng, và cho agent sinh ca quanh các mốc bậc thang.",
      "For products with tiered coinsurance and actuarial factors (by age, plan, no-claim years), the payout is no longer a simple multiplication. The decision table gains factor columns; the oracle must exactly reflect how the business rates. This piece is error-prone because formulas change by policy year. We isolate the money calculation into a pure function, cover it with its own tests, and let the agent generate cases around the tier breakpoints.",
      "段階的自己負担と数理係数（年齢、プラン、無事故年数による）を持つ商品では、支払額はもはや単純な掛け算ではありません。決定表に係数列が加わり、オラクルは業務の料率設定を正確に反映せねばなりません。この部分は契約年度で数式が変わるため誤りやすいです。金額計算を純粋関数に切り出し、独自のテストで網羅し、エージェントに段階の区切り点周辺のケースを生成させます。"
    ),
    CODE("typescript", `// oracle/rating.ts — tính tiền chi trả có bậc thang đồng chi trả + hệ số định phí
export function payout(billed: number, remaining: number, plan: "BASIC"|"GOLD", ageBand: 0|1|2) {
  const covered = Math.min(billed, remaining);
  // Bậc thang đồng chi trả theo mức tiền (nghiệp vụ sở hữu ngưỡng)
  const coins = covered <= 5_000_000 ? 0.10 : covered <= 20_000_000 ? 0.20 : 0.30;
  const planFactor = plan === "GOLD" ? 1.0 : 0.8;      // gói BASIC trả tỉ lệ thấp hơn
  const ageFactor  = [1.0, 0.95, 0.9][ageBand];         // hệ số định phí theo nhóm tuổi
  const raw = covered * (1 - coins) * planFactor * ageFactor;
  return Math.round(raw);                               // tiền là số nguyên (đồng)
}`),
    IMG(
      `<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="640" height="210" rx="10" fill="#1e1b4b"/><text x="20" y="28" fill="#c7d2fe" font-size="14" font-weight="700">Bậc thang đồng chi trả (coinsurance)</text><g stroke="#6366f1" stroke-width="1"><line x1="60" y1="170" x2="600" y2="170"/><line x1="60" y1="40" x2="60" y2="170"/></g><g fill="#a5b4fc" font-size="10"><text x="30" y="174">0%</text><text x="20" y="120">20%</text><text x="20" y="70">30%</text></g><path d="M60 155 H240 V125 H420 V85 H600" stroke="#22d3ee" stroke-width="3" fill="none"/><g font-size="10" fill="#e0e7ff"><text x="120" y="150">≤5tr: 10%</text><text x="290" y="120">≤20tr: 20%</text><text x="470" y="80">&gt;20tr: 30%</text></g><g stroke="#fca5a5" stroke-dasharray="4 3"><line x1="240" y1="40" x2="240" y2="170"/><line x1="420" y1="40" x2="420" y2="170"/></g><text x="20" y="200" fill="#818cf8" font-size="10">Agent sinh ca ngay tại 5tr, 20tr (±1) — nơi công thức đổi bậc.</text></svg>`,
      "Bậc thang đồng chi trả: agent sinh ca ngay tại các mốc đổi bậc (5tr, 20tr) để bắt lỗi so sánh biên.",
      "Tiered coinsurance: the agent generates cases right at the tier breakpoints (5M, 20M) to catch boundary comparison bugs.",
      "段階的自己負担：エージェントは段階の区切り点（500万、2,000万）ちょうどでケースを生成し、境界比較のバグを捕捉します。"
    ),
    TIP(
      "Với công thức định phí, thêm một 'property test': tăng số tiền yêu cầu thì số tiền chi trả không được giảm (đơn điệu). Bất biến đơn điệu bắt được nhiều lỗi bậc thang mà không cần biết con số chính xác.",
      "For rating formulas, add a 'property test': increasing the billed amount must never decrease the payout (monotonicity). The monotonic invariant catches many tiering bugs without knowing the exact numbers.",
      "料率数式には「プロパティテスト」を追加します。請求額を増やしたとき支払額が減ってはならない（単調性）。単調性の不変条件は、正確な数値を知らなくても多くの段階バグを捕捉します。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. CI: chạy mỗi PR, chặn merge khi quyết định sai",
    en: "11. CI: run on every PR, block merge on wrong decisions",
    ja: "11. CI：各PRで実行し、誤決定でマージを阻止",
  },
  blocks: [
    P(
      "Bộ ca chỉ có giá trị khi chạy tự động và chặn được merge xấu. Ta chạy trên GitHub Actions mỗi pull request: seed dữ liệu tổng hợp, khởi động engine ở môi trường ephemeral, chạy toàn bộ ca do agent sinh cộng golden set, và fail build nếu bất kỳ quyết định nào lệch. Vì bảng quyết định nằm trong repo, thay đổi luật sẽ hiện ngay trong diff và test tương ứng đổi màu — người review thấy tác động trước khi merge.",
      "A case suite is only valuable when it runs automatically and blocks bad merges. We run on GitHub Actions per pull request: seed synthetic data, boot the engine in an ephemeral environment, run all agent-generated cases plus the golden set, and fail the build if any decision deviates. Because the decision table lives in the repo, a rule change appears directly in the diff and the corresponding tests change colour — reviewers see the impact before merge.",
      "ケーススイートは自動実行され、悪いマージを阻止して初めて価値があります。GitHub Actionsでプルリクエストごとに実行します。合成データを投入し、エンジンをエフェメラル環境で起動し、エージェント生成の全ケースとゴールデンセットを実行し、いずれかの決定がずれればビルドを失敗させます。決定表がリポジトリにあるため、ルール変更は差分に直接現れ、対応するテストが色を変えます。レビュアーはマージ前に影響を確認できます。"
    ),
    CODE("yaml", `# .github/workflows/adjudication.yml — chặn merge khi có quyết định sai
name: claims-adjudication
on: { pull_request: { branches: [main] } }
jobs:
  decision-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run seed:synthetic          # dữ liệu tổng hợp, KHÔNG PHI thật
      - run: npm run engine:up &             # engine adjudication ephemeral
      - run: npx playwright test tests/       # golden set + ca agent sinh
        env: { ADJ_URL: http://localhost:8080 }
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: decision-report, path: playwright-report }`),
    NOTE(
      "Đặt job này là 'required check' để không ai merge được khi test đỏ. Với engine quyết định tiền, một merge sai có thể tốn thật; cổng CI cứng là rẻ so với một lô claim trả nhầm.",
      "Make this job a 'required check' so nobody can merge while tests are red. For a money-deciding engine a wrong merge can cost real money; a hard CI gate is cheap next to a batch of mispaid claims.",
      "このジョブを「必須チェック」にして、テストが赤い間は誰もマージできないようにします。金額を決めるエンジンでは誤ったマージが実際にコストになります。硬いCIゲートは、誤払いされた請求のロットに比べれば安価です。"
    ),
    QA(
      "Trong CI, test adjudication nên chạy trên dữ liệu gì để vừa an toàn tuân thủ vừa có ý nghĩa?",
      "In CI, what data should adjudication tests run on to be both compliant and meaningful?",
      "Dữ liệu tổng hợp (synthetic) sinh theo cùng lược đồ và cùng phân phối các lớp tương đương, tuyệt đối không dùng PHI thật của bệnh nhân trong CI. Dữ liệu tổng hợp phải phủ được mọi nhánh của bảng quyết định (mọi reasonCode) — đó là điều kiện để test có ý nghĩa. Nếu cần dữ liệu 'giống thật', dùng bản đã ẩn danh hoá và ký thoả thuận, chạy ở môi trường cách ly.",
      "Synthetic data generated to the same schema and the same distribution of equivalence classes; never real patient PHI in CI. The synthetic data must cover every branch of the decision table (every reasonCode) — that is the condition for meaningful tests. If 'realistic' data is needed, use an anonymised, agreement-signed set in an isolated environment.",
      "CIで査定テストを安全かつ有意義にするにはどんなデータで実行すべきか",
      "同じスキーマと同じ同値クラス分布で生成した合成データを使い、CIで実際の患者PHIは決して使いません。合成データは決定表のすべての分岐（すべての理由コード）を網羅せねばならず、それが有意義なテストの条件です。「本物らしい」データが必要なら、匿名化・合意署名済みのものを隔離環境で使います。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Góc phỏng vấn: bảo vệ thiết kế test này",
    en: "12. Interview angle: defending this test design",
    ja: "12. 面接の観点：このテスト設計を擁護する",
  },
  blocks: [
    P(
      "Câu hỏi phỏng vấn hay xoáy vào chỗ AI + oracle. Người phỏng vấn muốn nghe bạn phân biệt rõ vai AI (sinh input) với vai oracle (quyết định đúng), và cách bạn ngăn hallucination. Họ cũng hỏi về độ phủ: làm sao chứng minh bộ ca đủ tốt. Câu trả lời mạnh nối oracle-first với các kỹ thuật cổ điển (lớp tương đương, giá trị biên, pairwise) và với bất biến — cho thấy AI chỉ là công cụ tăng năng suất chứ không thay tư duy kiểm thử.",
      "Interview questions tend to probe the AI + oracle seam. The interviewer wants to hear you clearly separate the AI role (generating input) from the oracle role (deciding correctness), and how you prevent hallucination. They also ask about coverage: how you prove the suite is good enough. A strong answer connects oracle-first to classic techniques (equivalence classes, boundary values, pairwise) and to invariants — showing the AI is a productivity tool, not a replacement for testing thinking.",
      "面接の質問はAIとオラクルの接合部を突きがちです。面接官は、AIの役割（入力生成）とオラクルの役割（正誤判定）を明確に分けられるか、幻覚をどう防ぐかを聞きたがります。カバレッジについても尋ねます。スイートが十分良いとどう証明するか。強い答えは、オラクル・ファーストを古典的技法（同値クラス、境界値、ペアワイズ）と不変条件に結びつけ、AIが思考の代替ではなく生産性ツールであると示します。"
    ),
    SCEN(
      "Câu hỏi: 'AI sinh test rồi ai bảo đảm đúng?'",
      "Question: 'The AI generates tests — who guarantees they are right?'",
      "Trả lời gọn: AI chỉ sinh INPUT; đáp án đến từ oracle là bảng quyết định code review được. Test 'đúng' vì actual được so với expected suy từ bảng, cộng các bất biến (payable≥0, loại trừ áp đảo, idempotent một trạng thái). Golden set + coverage test đảm bảo agent không bỏ sót lớp. Ca rủi ro cao có người xác nhận thủ công. Vậy trách nhiệm 'đúng' vẫn thuộc con người và code, không thuộc AI.",
      "The crisp answer: the AI only generates INPUT; the answer comes from the oracle — a reviewable coded decision table. Tests are 'right' because actual is compared to expected derived from the table, plus invariants (payable≥0, exclusion dominates, idempotent single state). A golden set + coverage test ensures the agent misses no class. High-risk cases are human-confirmed. So accountability for 'correct' stays with humans and code, not the AI.",
      "質問：「AIがテストを生成する、誰が正しさを保証するのか」",
      "簡潔な答え：AIは入力のみ生成し、答えはオラクル（レビュー可能なコード化決定表）から来ます。テストが「正しい」のは、実際の値が表から導いた期待値と、不変条件（支払額≥0、免責優先、冪等な単一状態）に照合されるからです。ゴールデンセット＋カバレッジテストがエージェントのクラス漏れを防ぎます。高リスクケースは人間が確認します。したがって「正しさ」の責任はAIではなく人間とコードにあります。"
    ),
    QA(
      "Bạn đo độ phủ (coverage) cho engine quyết định thế nào — chỉ line coverage đủ chưa?",
      "How do you measure coverage for a decision engine — is line coverage enough?",
      "Line coverage không đủ. Với engine quyết định, ta đo độ phủ LUẬT (mỗi hàng bảng quyết định được kích hoạt ít nhất một lần), độ phủ nhánh của điều kiện, và độ phủ lớp reasonCode (mọi kết quả có ít nhất một ca). Thêm phủ biên tại mọi ngưỡng số. Coverage code chỉ là điều kiện cần; oracle-first + phủ luật/lớp mới là điều kiện đủ để tin.",
      "Line coverage is not enough. For a decision engine we measure RULE coverage (each decision-table row fired at least once), condition/branch coverage, and reasonCode-class coverage (every outcome has at least one case). Add boundary coverage at every numeric threshold. Code coverage is only necessary; oracle-first plus rule/class coverage is what makes it sufficient to trust.",
      "決定エンジンのカバレッジ測定、行カバレッジで十分か",
      "行カバレッジでは不十分です。決定エンジンではルールカバレッジ（各決定表の行が少なくとも一度発火）、条件・分岐カバレッジ、理由コードクラスのカバレッジ（すべての結果に少なくとも1ケース）を測定します。さらに各数値しきい値で境界カバレッジを加えます。コードカバレッジは必要条件にすぎず、オラクル・ファーストとルール・クラスのカバレッジが信頼に足る十分条件です。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Tổng kết & checklist triển khai",
    en: "13. Summary & rollout checklist",
    ja: "13. まとめと導入チェックリスト",
  },
  blocks: [
    P(
      "Kiểm thử engine adjudication bằng AI agent chỉ thành công khi ta giữ đúng thứ tự: oracle trước, AI sau. Bảng quyết định là oracle con người sở hữu; các bất biến là mạng an toàn; agent tăng tốc phần sinh ca biên vốn tẻ nhạt nhưng dễ sót. Guardrail (schema, grounding, cổng người) giữ AI khỏi 'sáng tác' luật. CI biến tất cả thành cổng chặn merge. Kết quả là một hệ kiểm thử vừa nhanh vừa đáng tin cho một hệ quyết định tiền thật.",
      "Testing an adjudication engine with an AI agent only succeeds when we keep the order: oracle first, AI second. The decision table is the human-owned oracle; the invariants are the safety net; the agent accelerates the tedious-but-easily-missed boundary generation. Guardrails (schema, grounding, human gate) keep the AI from 'inventing' rules. CI turns it all into a merge-blocking gate. The result is a test system both fast and trustworthy for a real money-deciding engine.",
      "AIエージェントで査定エンジンをテストするのは、オラクルが先、AIが後という順序を守って初めて成功します。決定表は人間が所有するオラクル、不変条件は安全網、エージェントは退屈だが見落としやすい境界生成を加速します。ガードレール（スキーマ、グラウンディング、人間のゲート）がAIによるルール捏造を防ぎます。CIがすべてをマージ阻止ゲートに変えます。結果は、実際に金額を決めるエンジンにとって速く信頼できるテストシステムです。"
    ),
    UL(
      ["Bảng quyết định trong repo, nghiệp vụ review qua PR — oracle có chủ.",
       "expected LUÔN từ oracle code; agent chỉ sinh input trong schema.",
       "Assert đủ ba mặt: trạng thái, reasonCode, payable + bất biến.",
       "Golden set + coverage test để agent không bỏ sót lớp quyết định.",
       "Ca lỗi sâu: idempotency, reprocess, thay đổi luật không hồi tố.",
       "Guardrail chống hallucination; ca rủi ro cao có người xác nhận.",
       "CI required check trên PR, chỉ dùng dữ liệu tổng hợp (không PHI)."],
      ["Decision table in the repo, business reviews via PR — the oracle has an owner.",
       "expected ALWAYS from oracle code; the agent only generates input within the schema.",
       "Assert all three facets: status, reasonCode, payable + invariants.",
       "Golden set + coverage test so the agent misses no decision class.",
       "Deep failure cases: idempotency, reprocessing, non-retroactive rule change.",
       "Guardrails against hallucination; high-risk cases are human-confirmed.",
       "CI required check on the PR, using only synthetic data (no PHI)."],
      ["決定表をリポジトリに置き、業務がPRでレビュー——オラクルに責任者がいる。",
       "期待値は常にオラクルコードから、エージェントはスキーマ内の入力のみ生成。",
       "3つの側面すべてを検証：ステータス、理由コード、支払額＋不変条件。",
       "ゴールデンセット＋カバレッジテストで決定クラスの漏れを防ぐ。",
       "深い障害ケース：冪等性、再処理、遡及しないルール変更。",
       "幻覚対策のガードレール、高リスクケースは人間が確認。",
       "PRでCI必須チェック、合成データのみ使用（PHIなし）。"]
    ),
    TIP(
      "Khi mở rộng sang sản phẩm mới, thêm hàng vào bảng quyết định trước, viết ca golden cho hàng đó, rồi mới để agent sinh biên. Giữ thứ tự oracle-first ngay cả khi thêm tính năng.",
      "When expanding to a new product, add rows to the decision table first, write golden cases for those rows, and only then let the agent generate boundaries. Keep the oracle-first order even when adding features.",
      "新商品へ拡張する際は、まず決定表に行を追加し、その行のゴールデンケースを書き、それからエージェントに境界を生成させます。機能追加時もオラクル・ファーストの順序を守ります。"
    ),
  ],
});

// ── ARTICLE B ── chương 1–4 ────────────────────────────────────────────────
pagesB.push({
  heading: {
    vi: "1. Bối cảnh: một pipeline E2E cho luồng đặt hàng",
    en: "1. Context: one E2E pipeline for the order flow",
    ja: "1. 背景：注文フローのための一つのE2Eパイプライン",
  },
  blocks: [
    P(
      "Ở một sàn TMĐT thật, luồng đặt hàng (order flow) đi qua nhiều dịch vụ: giỏ hàng, tồn kho, coupon/thuế, thanh toán, tạo đơn. Kiểm thử E2E qua UI dễ giòn và chậm; kiểm thử API nhanh nhưng bỏ lỡ tích hợp UI thật. Bài này dựng MỘT pipeline tích hợp: Playwright điều khiển UI như người dùng, đồng thời dùng request-context của Playwright gọi thẳng API để làm oracle. Mục tiêu là mỗi lần merge vào main, pipeline khẳng định lại các bất biến order-flow — không phải chỉ 'thấy nút Đặt hàng bấm được'.",
      "In a real e-commerce marketplace the order flow crosses many services: cart, inventory, coupon/tax, payment, order creation. UI-only E2E is brittle and slow; API-only is fast but misses the real UI integration. This article builds ONE integrated pipeline: Playwright drives the UI like a user while also using Playwright's request-context to call the API directly as the oracle. The goal is that on every merge to main, the pipeline re-confirms the order-flow invariants — not merely 'the Place Order button clicks'.",
      "実際のECマーケットプレイスでは、注文フローは複数のサービスをまたぎます。カート、在庫、クーポン・税、決済、注文作成です。UIのみのE2Eは脆く遅く、APIのみは速いが実UIの統合を見逃します。本記事は一つの統合パイプラインを構築します。PlaywrightがユーザーのようにUIを操作しつつ、Playwrightのrequest-contextでAPIを直接呼びオラクルとします。目標は、mainへのマージのたびにパイプラインが注文フローの不変条件を再確認することです。単に「注文ボタンが押せる」ではありません。"
    ),
    P(
      "Pipeline tích hợp thêm hai mảnh hiện đại. Thứ nhất: GitHub Actions chạy test theo shard (chia nhỏ) song song rồi gộp báo cáo blob thành một report duy nhất — để bộ E2E lớn vẫn nhanh. Thứ hai: bộ Playwright Agents (Planner / Generator / Healer, từ v1.56+) hỗ trợ CON NGƯỜI: Planner khám phá app viết kế hoạch Markdown, Generator biến kế hoạch thành spec chạy được và tự kiểm locator trên app sống, Healer chạy trong debug soi console/network/snapshot để vá test đỏ. Mọi thứ agent tạo đều qua cổng review người trước khi vào main.",
      "The integrated pipeline adds two modern pieces. First: GitHub Actions runs tests in parallel shards then merges blob reports into a single report — so a large E2E suite stays fast. Second: the Playwright Agents (Planner / Generator / Healer, from v1.56+) assist HUMANS: the Planner explores the app and writes a Markdown plan, the Generator turns the plan into runnable specs and verifies locators on the live app, the Healer runs in debug inspecting console/network/snapshots to fix red tests. Everything the agents produce passes a human review gate before merge.",
      "統合パイプラインは2つの現代的な要素を加えます。第一に、GitHub Actionsがテストを並列シャードで実行し、blobレポートを単一のレポートに統合します。大規模E2Eスイートを速く保つためです。第二に、Playwrightエージェント（Planner / Generator / Healer、v1.56以降）が人間を支援します。Plannerはアプリを探索しMarkdown計画を書き、Generatorは計画を実行可能なspecに変え実アプリでロケーターを検証し、Healerはデバッグで実行しコンソール・ネットワーク・スナップショットを調べて赤いテストを修復します。エージェントが生成したものはすべて、マージ前に人間のレビューゲートを通ります。"
    ),
    UL(
      ["Playwright điều khiển UI thật; request-context API là oracle nghiệp vụ.",
       "GitHub Actions: sharding song song + gộp blob report thành một.",
       "Playwright Agents (Planner/Generator/Healer) hỗ trợ, người review.",
       "Mỗi merge = một lần khẳng định lại bất biến order-flow."],
      ["Playwright drives the real UI; the API request-context is the business oracle.",
       "GitHub Actions: parallel sharding + merged blob reports into one.",
       "Playwright Agents (Planner/Generator/Healer) assist, humans review.",
       "Every merge = one re-confirmation of the order-flow invariants."],
      ["Playwrightが実UIを操作し、APIのrequest-contextが業務オラクル。",
       "GitHub Actions：並列シャーディング＋blobレポートを一つに統合。",
       "Playwrightエージェント（Planner/Generator/Healer）が支援、人間がレビュー。",
       "マージのたびに注文フローの不変条件を再確認。"]
    ),
    NOTE(
      "'Tích hợp' ở đây có hai nghĩa: tích hợp KỸ THUẬT (UI + API + CI + agent trong một pipeline) và tích hợp NGHIỆP VỤ (order-flow đi qua nhiều dịch vụ). Cả hai đều lấy bất biến làm điểm tựa oracle.",
      "'Integrated' here has two senses: technical integration (UI + API + CI + agents in one pipeline) and business integration (the order flow crossing many services). Both lean on invariants as the oracle anchor.",
      "ここでの「統合」には2つの意味があります。技術的統合（UI＋API＋CI＋エージェントを一つのパイプラインに）と業務的統合（複数サービスをまたぐ注文フロー）です。どちらも不変条件をオラクルの支点とします。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Bất biến order-flow làm oracle",
    en: "2. Order-flow invariants as the oracle",
    ja: "2. オラクルとしての注文フロー不変条件",
  },
  blocks: [
    P(
      "Trước khi viết test, ta chốt các bất biến — thứ luôn đúng dù người dùng bấm gì. Chúng là oracle: test 'pass' nghĩa là bất biến giữ nguyên, không phải 'màn hình hiện chữ thành công'. Với order-flow: tồn kho không âm và không oversell; tổng tiền = Σ(giá×số lượng) − giảm giá + thuế + phí ship, khớp giữa UI và API; coupon áp đúng quy tắc (không âm, không quá trần); thanh toán idempotent (retry không tạo hai đơn/hai lần trừ tiền); trạng thái đơn cuối là một giá trị hợp lệ duy nhất.",
      "Before writing tests we fix the invariants — what is always true regardless of what the user clicks. They are the oracle: a test 'passes' means the invariant holds, not 'the screen shows a success message'. For the order flow: inventory never negative and no oversell; total = Σ(price×qty) − discount + tax + shipping, matching between UI and API; coupons apply the rules correctly (never negative, never over the cap); payment is idempotent (a retry creates neither two orders nor two charges); the order's final state is a single valid value.",
      "テストを書く前に不変条件を確定します。ユーザーが何を押しても常に真であるものです。これらがオラクルです。テストが「通る」とは、不変条件が保たれることであり、「画面に成功メッセージが出る」ことではありません。注文フローでは、在庫が負にならず超過販売しない、合計＝Σ(価格×数量)−割引＋税＋送料でUIとAPIが一致、クーポンがルール通り適用（負にならず上限を超えない）、決済が冪等（再試行で2つの注文も二重請求も作らない）、注文の最終状態が唯一の有効な値であること。"
    ),
    IMG(
      `<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="250" rx="10" fill="#3b0764"/><text x="20" y="28" fill="#f0abfc" font-size="15" font-weight="700">Bất biến order-flow (oracle)</text><g font-size="11" fill="#f5d0fe"><rect x="20" y="45" width="300" height="42" rx="6" fill="#581c87"/><text x="34" y="70">① Tồn kho ≥ 0, không oversell</text><rect x="20" y="95" width="300" height="42" rx="6" fill="#6b21a8"/><text x="34" y="120">② total = Σ(giá×sl) − giảm + thuế + ship</text><rect x="20" y="145" width="300" height="42" rx="6" fill="#581c87"/><text x="34" y="170">③ coupon: 0 ≤ giảm ≤ trần</text><rect x="340" y="45" width="300" height="42" rx="6" fill="#6b21a8"/><text x="354" y="70">④ thanh toán idempotent</text><rect x="340" y="95" width="300" height="42" rx="6" fill="#581c87"/><text x="354" y="120">⑤ trạng thái đơn cuối duy nhất</text><rect x="340" y="145" width="300" height="42" rx="6" fill="#6b21a8"/><text x="354" y="170">⑥ UI total === API total</text></g><text x="20" y="220" fill="#e879f9" font-size="11">Test PASS ⇔ mọi bất biến giữ nguyên — KHÔNG phải 'thấy chữ Success'.</text></svg>`,
      "Sáu bất biến order-flow đóng vai oracle: test đạt khi chúng giữ nguyên, không phải khi UI hiện thành công.",
      "Six order-flow invariants act as the oracle: a test passes when they hold, not when the UI shows success.",
      "6つの注文フロー不変条件がオラクルとして機能します。テストは、UIが成功を表示したときではなく、それらが保たれたときに通ります。"
    ),
    CODE("typescript", `// oracle/order-invariants.ts — bất biến dùng chung cho UI test và API test
export interface OrderView { subtotal: number; discount: number; tax: number; shipping: number; total: number; }

export function assertMoneyInvariant(o: OrderView) {
  const expected = o.subtotal - o.discount + o.tax + o.shipping;
  if (Math.round(o.total) !== Math.round(expected))
    throw new Error(\`total sai: \${o.total} ≠ \${expected}\`);
  if (o.discount < 0) throw new Error("discount âm");
}
export function assertCouponCap(discount: number, cap: number) {
  if (discount < 0 || discount > cap) throw new Error(\`discount \${discount} vượt trần \${cap}\`);
}`),
    WARN(
      "Đừng assert 'toàn giao dịch thành công'. Một pipeline chỉ kiểm 'đơn tạo được' sẽ bỏ lọt oversell dưới đồng thời và sai lệch tiền UI-vs-API. Oracle phải là bất biến, không phải sự hiện diện của thông báo.",
      "Do not assert 'the whole transaction succeeded'. A pipeline that only checks 'an order was created' misses oversell under concurrency and UI-vs-API money drift. The oracle must be invariants, not the presence of a message.",
      "「取引全体が成功した」を検証してはいけません。「注文が作成された」だけを確認するパイプラインは、並行下の超過販売やUI対APIの金額のずれを見逃します。オラクルはメッセージの存在ではなく不変条件でなければなりません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Kiến trúc pipeline: UI + API + CI + agent",
    en: "3. Pipeline architecture: UI + API + CI + agents",
    ja: "3. パイプラインアーキテクチャ：UI＋API＋CI＋エージェント",
  },
  blocks: [
    P(
      "Toàn cảnh pipeline gồm bốn lớp. Lớp UI: các spec Playwright thao tác trình duyệt như người dùng. Lớp Oracle-API: request-context gọi API để dựng dữ liệu (arrange), đọc trạng thái thật (assert) và dọn dẹp — nhanh và ổn định hơn đọc DOM. Lớp CI: GitHub Actions chia shard, chạy song song, gộp blob report. Lớp Agent: Planner/Generator/Healer hỗ trợ soạn và bảo trì test, luôn dưới review người. Bốn lớp cùng một mục tiêu: mỗi merge khẳng định lại bất biến.",
      "The full pipeline has four layers. UI layer: Playwright specs operate the browser like a user. Oracle-API layer: the request-context calls the API to set up data (arrange), read true state (assert) and tear down — faster and steadier than reading the DOM. CI layer: GitHub Actions splits shards, runs in parallel, merges blob reports. Agent layer: Planner/Generator/Healer assist authoring and maintaining tests, always under human review. All four serve one goal: every merge re-confirms the invariants.",
      "パイプライン全体は4つの層から成ります。UI層：Playwrightのspecがユーザーのようにブラウザを操作します。オラクルAPI層：request-contextがAPIを呼びデータを準備（arrange）し、真の状態を読み（assert）、後片付けします。DOM読み取りより速く安定します。CI層：GitHub Actionsがシャードを分割し並列実行しblobレポートを統合します。エージェント層：Planner/Generator/Healerがテストの作成と保守を支援し、常に人間のレビュー下にあります。4層すべてが一つの目標に奉仕します。マージのたびに不変条件を再確認することです。"
    ),
    IMG(
      `<svg viewBox="0 0 660 270" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="270" rx="10" fill="#3b0764"/><text x="20" y="28" fill="#f0abfc" font-size="14" font-weight="700">Bốn lớp một pipeline</text><g><rect x="20" y="45" width="180" height="70" rx="8" fill="#6b21a8" stroke="#e879f9"/><text x="34" y="70" fill="#fae8ff" font-size="12" font-weight="700">UI (Playwright)</text><text x="34" y="90" fill="#f5d0fe" font-size="10">click, fill, expect</text><text x="34" y="106" fill="#f5d0fe" font-size="10">như người dùng</text></g><g><rect x="230" y="45" width="180" height="70" rx="8" fill="#581c87" stroke="#c084fc"/><text x="244" y="70" fill="#fae8ff" font-size="12" font-weight="700">Oracle API</text><text x="244" y="90" fill="#f5d0fe" font-size="10">request-context</text><text x="244" y="106" fill="#f5d0fe" font-size="10">arrange · assert</text></g><g><rect x="440" y="45" width="200" height="70" rx="8" fill="#6b21a8" stroke="#e879f9"/><text x="454" y="70" fill="#fae8ff" font-size="12" font-weight="700">CI (Actions)</text><text x="454" y="90" fill="#f5d0fe" font-size="10">shard × N // blob merge</text><text x="454" y="106" fill="#f5d0fe" font-size="10">required check</text></g><g><rect x="130" y="140" width="400" height="60" rx="8" fill="#4a044e" stroke="#f0abfc"/><text x="150" y="165" fill="#fae8ff" font-size="12" font-weight="700">Playwright Agents</text><text x="150" y="185" fill="#f5d0fe" font-size="11">Planner → Generator → Healer  (review người)</text></g><path d="M110 200 V225 H560 V115" stroke="#e879f9" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/><text x="220" y="245" fill="#e879f9" font-size="10">agent hỗ trợ soạn/bảo trì test, người duyệt trước merge</text></svg>`,
      "Bốn lớp — UI, Oracle-API, CI, Agents — hợp thành một pipeline; agent hỗ trợ, con người duyệt.",
      "Four layers — UI, Oracle-API, CI, Agents — form one pipeline; agents assist, humans approve.",
      "4つの層——UI、オラクルAPI、CI、エージェント——が一つのパイプラインを形成します。エージェントが支援し、人間が承認します。"
    ),
    CODE("typescript", `// playwright.config.ts — cấu hình cho pipeline tích hợp (Chrome for Testing, trace)
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["blob"]] : [["html"]],   // CI xuất blob để gộp
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure-and-retries",              // trace khi fail/retry
    video: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});`),
    TIP(
      "Dùng 'trace: retain-on-failure-and-retries' để mỗi lần đỏ có sẵn trace xem lại từng bước, kèm network + snapshot — chính là dữ liệu Healer agent cần để tự vá.",
      "Use 'trace: retain-on-failure-and-retries' so every red run ships a trace to replay each step, with network + snapshots — exactly the data the Healer agent needs to self-fix.",
      "「trace: retain-on-failure-and-retries」を使えば、赤い実行のたびに各ステップを再生できるトレースがネットワーク＋スナップショット付きで得られます。これはHealerエージェントが自己修復に必要とするデータそのものです。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. Oracle bằng API request-context",
    en: "4. The oracle via API request-context",
    ja: "4. APIのrequest-contextによるオラクル",
  },
  blocks: [
    P(
      "Điểm cốt lõi của bài: dùng request-context của Playwright làm oracle. Thay vì đọc lại con số tổng tiền từ DOM (giòn, phụ thuộc định dạng hiển thị), ta gọi thẳng API đơn hàng để lấy sự thật nghiệp vụ: subtotal, discount, tax, total, trạng thái tồn kho. Sau khi UI hoàn tất đặt hàng, ta assert số ở API khớp bất biến và khớp cả với số hiển thị trên UI. request-context chia sẻ cookie/đăng nhập với trình duyệt nên gọi API đúng phiên người dùng.",
      "The core of this article: use Playwright's request-context as the oracle. Instead of re-reading the total from the DOM (brittle, tied to display formatting), we call the order API directly for the business truth: subtotal, discount, tax, total, inventory state. After the UI finishes ordering, we assert the API numbers satisfy the invariants and match what the UI shows. The request-context shares cookies/login with the browser, so it calls the API in the user's real session.",
      "本記事の核心：Playwrightのrequest-contextをオラクルとして使うことです。DOMから合計を読み直す（脆く、表示書式に依存）代わりに、注文APIを直接呼んで業務上の真実を取得します。小計、割引、税、合計、在庫状態です。UIが注文を完了した後、API上の数値が不変条件を満たし、UIの表示とも一致することを検証します。request-contextはブラウザとクッキー・ログインを共有するため、ユーザーの実セッションでAPIを呼びます。"
    ),
    CODE("typescript", `// tests/checkout.spec.ts — UI đặt hàng, API request-context làm ORACLE
import { test, expect } from "@playwright/test";
import { assertMoneyInvariant } from "../oracle/order-invariants";

test("đặt hàng: bất biến tiền khớp giữa UI và API", async ({ page, request }) => {
  // 1) UI: người dùng đặt hàng
  await page.goto("/cart");
  await page.getByRole("button", { name: "Thanh toán" }).click();
  await page.getByRole("button", { name: "Đặt hàng" }).click();
  const orderId = await page.getByTestId("order-id").innerText();

  // 2) ORACLE: đọc sự thật nghiệp vụ từ API (cùng phiên đăng nhập)
  const res = await request.get(\`/api/orders/\${orderId}\`);
  expect(res.ok()).toBeTruthy();
  const order = await res.json();

  // 3) ASSERT bất biến tiền, KHÔNG chỉ 'thấy thành công'
  assertMoneyInvariant(order);

  // 4) UI total phải bằng API total (số, không phải chuỗi hiển thị)
  const uiTotal = Number((await page.getByTestId("grand-total").innerText()).replace(/[^\\d]/g, ""));
  expect(uiTotal).toBe(Math.round(order.total));
});`),
    QA(
      "Vì sao lấy oracle từ API request-context tốt hơn đọc lại con số từ DOM?",
      "Why is an oracle from the API request-context better than re-reading numbers from the DOM?",
      "Vì DOM là lớp hiển thị: đổi định dạng tiền, đổi locale, hay lazy-render là hỏng assert dù nghiệp vụ vẫn đúng — và ngược lại DOM có thể 'đẹp' trong khi backend sai. API cho sự thật nghiệp vụ dạng số, ổn định và nhanh. Đọc cả hai rồi so (UI total === API total) vừa bắt lỗi backend vừa bắt lỗi hiển thị.",
      "Because the DOM is the display layer: changing money format, locale, or lazy-render breaks the assertion even when the business is correct — and conversely the DOM can look 'nice' while the backend is wrong. The API gives the numeric business truth, stable and fast. Reading both and comparing (UI total === API total) catches both backend and display bugs.",
      "DOMから数値を読み直すより、APIのrequest-contextからオラクルを取る方が良い理由",
      "DOMは表示層だからです。金額書式・ロケール・遅延レンダリングの変更は、業務が正しくても検証を壊します。逆にバックエンドが誤っていてもDOMは「きれい」に見えることがあります。APIは数値の業務上の真実を安定して速く提供します。両方を読み比較（UI合計===API合計）すれば、バックエンドと表示の両方のバグを捕捉できます。"
    ),
    NOTE(
      "request-context có thể tạo riêng (request.newContext) với storageState đăng nhập sẵn để arrange dữ liệu trước test rất nhanh, không cần đi qua UI cho phần chuẩn bị.",
      "The request-context can be created separately (request.newContext) with a pre-authenticated storageState to arrange data before a test very fast, without going through the UI for setup.",
      "request-contextは、事前認証済みのstorageStateを持つ別コンテキスト（request.newContext）として作成でき、セットアップでUIを経由せずにテスト前のデータ準備を非常に高速に行えます。"
    ),
  ],
});

// ── ARTICLE B ── chương 5–8 ────────────────────────────────────────────────
pagesB.push({
  heading: {
    vi: "5. Playwright Agents: Planner, Generator, Healer",
    en: "5. Playwright Agents: Planner, Generator, Healer",
    ja: "5. Playwrightエージェント：Planner・Generator・Healer",
  },
  blocks: [
    P(
      "Từ v1.56+, Playwright cung cấp ba agent AI hợp tác. Planner khám phá app và viết một kế hoạch kiểm thử dạng Markdown (các luồng, tình huống, dữ liệu). Generator biến kế hoạch đó thành spec chạy được, và quan trọng: nó tự KIỂM locator trên app SỐNG để không sinh selector 'chết'. Healer chạy trong chế độ debug, soi console/network/snapshot của lần fail rồi vá test hoặc đánh dấu skip. Lệnh 'npx playwright init-agents' dựng sẵn ba agent kèm 'seed.spec.ts' chứa fixture/thiết lập dùng chung.",
      "Since v1.56+, Playwright ships three cooperating AI agents. The Planner explores the app and writes a Markdown test plan (flows, scenarios, data). The Generator turns that plan into runnable specs, and crucially: it verifies locators on the LIVE app so it does not emit dead selectors. The Healer runs in debug mode, inspects the failing run's console/network/snapshots, then fixes the test or marks it skipped. The command 'npx playwright init-agents' scaffolds the three agents plus a 'seed.spec.ts' holding shared fixtures/setup.",
      "v1.56以降、Playwrightは協調する3つのAIエージェントを提供します。Plannerはアプリを探索しMarkdownのテスト計画（フロー、シナリオ、データ）を書きます。Generatorはその計画を実行可能なspecに変え、重要な点として実アプリでロケーターを検証し、死んだセレクターを出しません。Healerはデバッグモードで実行し、失敗した実行のコンソール・ネットワーク・スナップショットを調べ、テストを修復するかスキップとしてマークします。コマンド「npx playwright init-agents」が3つのエージェントと共有フィクスチャ・設定を持つ「seed.spec.ts」をscaffoldします。"
    ),
    IMG(
      `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="220" rx="10" fill="#3b0764"/><text x="20" y="28" fill="#f0abfc" font-size="14" font-weight="700">Planner → Generator → Healer (dưới review người)</text><g><rect x="20" y="55" width="180" height="90" rx="8" fill="#6b21a8" stroke="#e879f9"/><text x="34" y="80" fill="#fae8ff" font-size="12" font-weight="700">PLANNER</text><text x="34" y="102" fill="#f5d0fe" font-size="10">khám phá app</text><text x="34" y="120" fill="#f5d0fe" font-size="10">→ kế hoạch .md</text></g><g><rect x="240" y="55" width="180" height="90" rx="8" fill="#581c87" stroke="#c084fc"/><text x="254" y="80" fill="#fae8ff" font-size="12" font-weight="700">GENERATOR</text><text x="254" y="102" fill="#f5d0fe" font-size="10">.md → spec.ts</text><text x="254" y="120" fill="#f5d0fe" font-size="10">kiểm locator sống</text></g><g><rect x="460" y="55" width="180" height="90" rx="8" fill="#6b21a8" stroke="#e879f9"/><text x="474" y="80" fill="#fae8ff" font-size="12" font-weight="700">HEALER</text><text x="474" y="102" fill="#f5d0fe" font-size="10">soi console/network</text><text x="474" y="120" fill="#f5d0fe" font-size="10">vá test đỏ</text></g><path d="M200 100 H240" stroke="#e879f9" stroke-width="2" marker-end="url(#c)"/><path d="M420 100 H460" stroke="#c084fc" stroke-width="2" marker-end="url(#c)"/><rect x="180" y="165" width="300" height="34" rx="6" fill="#4a044e" stroke="#f0abfc"/><text x="200" y="187" fill="#fae8ff" font-size="11">Human review gate — duyệt trước khi vào main</text><defs><marker id="c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#f0abfc"/></marker></defs></svg>`,
      "Ba agent nối tiếp: Planner viết kế hoạch, Generator sinh spec và kiểm locator, Healer vá test — tất cả qua review người.",
      "Three chained agents: the Planner writes the plan, the Generator emits specs and verifies locators, the Healer fixes tests — all under human review.",
      "連鎖する3エージェント：Plannerが計画を書き、Generatorがspecを生成しロケーターを検証し、Healerがテストを修復します——すべて人間のレビュー下で。"
    ),
    CODE("bash", `# Dựng bộ agent + seed.spec.ts (fixture/thiết lập dùng chung)
npx playwright init-agents

# Planner khám phá app, xuất kế hoạch Markdown
npx playwright agent plan --url http://localhost:3000 --out plans/checkout.plan.md

# Generator biến kế hoạch thành spec, kiểm locator trên app SỐNG
npx playwright agent generate --plan plans/checkout.plan.md --out tests/checkout.gen.spec.ts

# Healer chạy trong debug, soi console/network/snapshot rồi đề xuất vá
npx playwright agent heal --grep "checkout" --update`),
    WARN(
      "Output của Generator/Healer là ĐỀ XUẤT, không phải chân lý. LLM có thể sinh assert yếu (chỉ toBeVisible) hoặc 'chữa' test bằng cách nới lỏng oracle. Luôn đưa qua pull request để người review giữ đúng bất biến — agent không được tự merge.",
      "The Generator/Healer output is a PROPOSAL, not truth. An LLM can emit weak assertions (only toBeVisible) or 'fix' a test by loosening the oracle. Always route through a pull request so a human reviewer preserves the invariants — the agent must not self-merge.",
      "Generator・Healerの出力は提案であり、真実ではありません。LLMは弱いアサーション（toBeVisibleのみ）を生成したり、オラクルを緩めてテストを「修正」したりします。常にプルリクエストを通し、人間のレビュアーが不変条件を守るようにします。エージェントは自己マージしてはいけません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Planner viết kế hoạch, người phê duyệt",
    en: "6. The Planner writes a plan, humans approve",
    ja: "6. Plannerが計画を書き、人間が承認する",
  },
  blocks: [
    P(
      "Kế hoạch Markdown do Planner sinh là một artifact review được — giống bảng quyết định ở bài A. Nó liệt kê luồng (thêm giỏ, áp coupon, thanh toán), dữ liệu và tình huống lỗi. Người review đọc, thêm bất biến còn thiếu (ví dụ 'kiểm oversell khi hai người mua món cuối cùng'), xoá luồng vô nghĩa, rồi mới cho Generator sinh spec. Nhờ đó kế hoạch là nơi con người bơm tri thức nghiệp vụ vào, còn agent lo phần cơ học.",
      "The Planner's Markdown plan is a reviewable artifact — like the decision table in article A. It lists flows (add to cart, apply coupon, pay), data and error scenarios. A reviewer reads it, adds missing invariants (e.g. 'check oversell when two users buy the last unit'), removes pointless flows, and only then lets the Generator emit specs. Thus the plan is where humans inject business knowledge, while the agent handles the mechanics.",
      "Plannerが生成するMarkdown計画はレビュー可能な成果物です——記事Aの決定表のように。フロー（カート追加、クーポン適用、決済）、データ、エラーシナリオを列挙します。レビュアーはそれを読み、欠けている不変条件（例：「2人が最後の1個を買うときの超過販売を確認」）を追加し、無意味なフローを削除し、それからGeneratorにspecを生成させます。こうして計画は人間が業務知識を注入する場所となり、エージェントは機構を担います。"
    ),
    CODE("markdown", `<!-- plans/checkout.plan.md — người review chỉnh trực tiếp trước khi generate -->
# Kế hoạch kiểm thử: Checkout

## Luồng chính
1. Thêm sản phẩm vào giỏ → /cart hiển thị đúng subtotal
2. Áp coupon SALE10 → discount = min(10% subtotal, trần 200k)
3. Đặt hàng → tạo đơn, tồn kho giảm đúng số lượng

## Bất biến cần assert (ORACLE — người bổ sung)
- [x] total = subtotal - discount + tax + shipping (so UI vs API)
- [x] discount không âm, không vượt trần
- [x] tồn kho >= 0, KHÔNG oversell dưới đồng thời      <!-- reviewer thêm -->
- [x] thanh toán idempotent: retry không tạo 2 đơn      <!-- reviewer thêm -->

## Ca lỗi
- Coupon hết hạn → không áp, total giữ nguyên
- Hết hàng giữa chừng → chặn đặt, thông báo rõ`),
    QA(
      "Kế hoạch Markdown của Planner khác gì một test spec, và vì sao con người nên review ở tầng kế hoạch?",
      "How does the Planner's Markdown plan differ from a test spec, and why should humans review at the plan level?",
      "Kế hoạch là mô tả ý ĐỊNH (luồng, bất biến, ca lỗi) bằng ngôn ngữ đọc được, còn spec là mã thực thi. Review ở tầng kế hoạch rẻ và hiệu quả: người dễ phát hiện thiếu bất biến hay luồng sai lệch trước khi tốn công sinh mã. Sửa một dòng kế hoạch rẻ hơn nhiều so với sửa hàng chục spec sinh ra từ kế hoạch sai.",
      "The plan describes INTENT (flows, invariants, error cases) in readable language, while the spec is executable code. Reviewing at the plan level is cheap and effective: humans easily spot a missing invariant or a wrong flow before spending effort generating code. Editing one plan line is far cheaper than fixing dozens of specs generated from a wrong plan.",
      "PlannerのMarkdown計画はテストspecとどう違い、なぜ人間は計画レベルでレビューすべきか",
      "計画は意図（フロー、不変条件、エラーケース）を読める言語で記述し、specは実行可能なコードです。計画レベルのレビューは安価で効果的です。人間はコード生成に労力を費やす前に、欠けた不変条件や誤ったフローを容易に見つけられます。計画の1行を直す方が、誤った計画から生成された数十のspecを直すよりはるかに安価です。"
    ),
    TIP(
      "Lưu kế hoạch .md vào repo cùng spec. Khi tính năng đổi, sửa kế hoạch trước rồi cho Generator sinh lại — kế hoạch trở thành 'nguồn sự thật' về ý định test.",
      "Store the .md plan in the repo with the specs. When a feature changes, edit the plan first then let the Generator regenerate — the plan becomes the 'source of truth' for test intent.",
      "計画.mdをspecと共にリポジトリに保存します。機能が変わったら、まず計画を編集しGeneratorに再生成させます。計画がテスト意図の「信頼できる情報源」になります。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Kiểm oversell dưới đồng thời (concurrency)",
    en: "7. Testing oversell under concurrency",
    ja: "7. 並行下の超過販売テスト",
  },
  blocks: [
    P(
      "Bất biến khó nhất là 'không oversell': khi hai (hoặc N) người cùng mua món cuối cùng, chỉ một người được, tồn kho không âm. Đây là lỗi race-condition điển hình mà UI test tuần tự không bắt được. Dùng request-context, ta bắn nhiều request đặt hàng đồng thời rồi assert: đúng một đơn thành công, số còn lại bị chặn với lý do hết hàng, và tồn kho cuối = 0 (không âm). Đây là ca Planner nên đưa vào kế hoạch và agent hỗ trợ sinh biến thể.",
      "The hardest invariant is 'no oversell': when two (or N) users buy the last unit simultaneously, exactly one wins and inventory never goes negative. This is a classic race condition sequential UI tests cannot catch. Using the request-context, we fire many order requests concurrently then assert: exactly one order succeeds, the rest are blocked with an out-of-stock reason, and final inventory = 0 (not negative). This is a case the Planner should add and the agent helps generate variants of.",
      "最も難しい不変条件は「超過販売しない」です。2人（またはN人）が最後の1個を同時に買うとき、ちょうど1人が勝ち、在庫は負になりません。これは逐次的なUIテストでは捕捉できない典型的な競合状態です。request-contextを使い、複数の注文リクエストを同時に発射し、検証します。ちょうど1つの注文が成功し、残りは在庫切れの理由で拒否され、最終在庫＝0（負でない）。これはPlannerが追加すべきケースで、エージェントがバリアントの生成を助けます。"
    ),
    CODE("typescript", `// tests/oversell.spec.ts — N request đồng thời mua món cuối; oracle = tồn kho không âm
import { test, expect, request as pwRequest } from "@playwright/test";

test("không oversell khi nhiều người mua đơn vị cuối cùng", async ({ baseURL }) => {
  const sku = await seedOneUnitInStock();                // tồn kho = 1
  const N = 20;
  const clients = await Promise.all(
    Array.from({ length: N }, () => pwRequest.newContext({ baseURL }))
  );
  // Bắn N request đặt hàng ĐỒNG THỜI cho cùng SKU
  const results = await Promise.all(
    clients.map(c => c.post("/api/orders", { data: { sku, qty: 1 } }))
  );
  const ok = results.filter(r => r.status() === 201);
  const rejected = results.filter(r => r.status() === 409);  // 409 = hết hàng

  expect(ok, "chỉ đúng MỘT đơn thành công").toHaveLength(1);
  expect(rejected).toHaveLength(N - 1);

  const stock = await (await clients[0].get(\`/api/inventory/\${sku}\`)).json();
  expect(stock.available, "tồn kho không được âm").toBe(0);   // KHÔNG oversell
});`),
    SCEN(
      "Flash-sale làm oversell 37 đơn",
      "A flash-sale oversold by 37 orders",
      "Trong một đợt flash-sale, hệ kiểm tồn kho ở tầng ứng dụng (đọc rồi ghi) chứ không dùng ràng buộc nguyên tử ở DB. Hàng trăm request đồng thời cùng đọc 'còn 5' và đều ghi giảm, kết quả bán 42 nhưng chỉ có 5. Test đồng thời với oracle 'tồn kho không âm' phát hiện đúng lớp lỗi này trước khi lên production.",
      "During a flash-sale, inventory was checked at the application layer (read then write) instead of an atomic DB constraint. Hundreds of concurrent requests all read '5 left' and all decremented, selling 42 with only 5 in stock. A concurrency test with the 'inventory never negative' oracle catches exactly this class before production.",
      "フラッシュセールで37件超過販売した",
      "フラッシュセール中、在庫チェックがDBの原子的制約ではなくアプリ層（読んでから書く）で行われていました。数百の同時リクエストがすべて「残り5」を読み、すべて減算し、在庫5個で42個を販売しました。「在庫が負にならない」オラクルを持つ並行テストは、本番前にまさにこのクラスの不具合を捕捉します。"
    ),
    NOTE(
      "Ca đồng thời hợp với request-context vì bỏ qua overhead render UI, cho phép bắn hàng chục request thật sự song song — điều gần như bất khả thi nếu điều khiển bằng nhiều tab trình duyệt.",
      "Concurrency cases suit the request-context because they skip UI render overhead, letting us fire dozens of truly parallel requests — nearly impossible to orchestrate via many browser tabs.",
      "並行ケースはrequest-contextに適します。UIレンダリングのオーバーヘッドを省き、数十の真に並列なリクエストを発射できるからです。複数のブラウザタブで調整するのはほぼ不可能です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Idempotency thanh toán & trạng thái đơn cuối",
    en: "8. Payment idempotency & order final-state",
    ja: "8. 決済の冪等性と注文の最終状態",
  },
  blocks: [
    P(
      "Thanh toán qua mạng có thể timeout rồi được retry — nếu không idempotent, khách bị trừ tiền hai lần hoặc tạo hai đơn. Bất biến: cùng một idempotency-key ⇒ đúng một đơn, đúng một lần trừ tiền, trạng thái cuối duy nhất. Ta test bằng cách gửi lại request thanh toán với cùng key và assert số đơn/số giao dịch không tăng. Đây là oracle mạnh: ta không cần biết trước orderId, chỉ cần khẳng định tính duy nhất.",
      "Payment over the network can time out then be retried — if not idempotent, the customer is charged twice or two orders are created. Invariant: the same idempotency-key ⇒ exactly one order, exactly one charge, a single final state. We test by resending the payment request with the same key and asserting the order/transaction counts do not increase. This is a strong oracle: we need not know the orderId in advance, only assert uniqueness.",
      "ネットワーク越しの決済はタイムアウト後に再試行されることがあります。冪等でなければ、顧客は二重請求されるか2つの注文が作られます。不変条件：同じ冪等キー⇒ちょうど1つの注文、ちょうど1回の請求、唯一の最終状態。同じキーで決済リクエストを再送し、注文・取引の件数が増えないと検証してテストします。これは強力なオラクルです。事前にorderIdを知る必要はなく、一意性を検証するだけです。"
    ),
    CODE("typescript", `// tests/payment-idempotency.spec.ts — retry cùng key KHÔNG tạo đơn/charge thứ hai
import { test, expect } from "@playwright/test";

test("thanh toán idempotent: retry cùng key → một đơn, một charge", async ({ request }) => {
  const key = crypto.randomUUID();
  const payload = { cartId: await seedCart(), amount: 250_000 };

  const first = await request.post("/api/pay", { headers: { "Idempotency-Key": key }, data: payload });
  const retry = await request.post("/api/pay", { headers: { "Idempotency-Key": key }, data: payload });

  const o1 = await first.json(), o2 = await retry.json();
  expect(o2.orderId, "cùng key → cùng đơn").toBe(o1.orderId);

  const charges = await (await request.get(\`/api/orders/\${o1.orderId}/charges\`)).json();
  expect(charges.filter((c: any) => c.status === "CAPTURED"), "đúng một lần trừ tiền").toHaveLength(1);

  const order = await (await request.get(\`/api/orders/\${o1.orderId}\`)).json();
  expect(["PAID", "CONFIRMED"], "trạng thái cuối hợp lệ, duy nhất").toContain(order.state);
});`),
    QA(
      "Vì sao 'trạng thái đơn cuối duy nhất' và 'idempotency' lại là oracle tốt hơn 'thấy trang cảm ơn'?",
      "Why are 'single order final-state' and 'idempotency' better oracles than 'seeing a thank-you page'?",
      "Vì trang cảm ơn chỉ nói UI đã điều hướng, không nói backend nhất quán. Idempotency và trạng thái cuối duy nhất là tính chất nghiệp vụ: chúng bắt được trừ tiền hai lần, đơn trùng, hay đơn kẹt ở trạng thái trung gian — những lỗi tiền thật mà trang cảm ơn hoàn toàn che giấu. Oracle nên nói về sự thật dữ liệu, không về điều hướng UI.",
      "Because a thank-you page only says the UI navigated, not that the backend is consistent. Idempotency and a single final state are business properties: they catch double charges, duplicate orders, or orders stuck in an intermediate state — real-money bugs a thank-you page completely hides. The oracle should speak to data truth, not UI navigation.",
      "「注文の最終状態が唯一」「冪等性」が「サンクスページが見える」より良いオラクルである理由",
      "サンクスページはUIが遷移したことを示すだけで、バックエンドの整合性は示しません。冪等性と唯一の最終状態は業務上の性質です。二重請求、重複注文、中間状態で止まった注文——サンクスページが完全に隠す実際の金額バグを捕捉します。オラクルはUI遷移ではなくデータの真実を語るべきです。"
    ),
    TIP(
      "v1.61 có video retention modes mới cho test flaky và WebAuthn virtual authenticator (passkeys) — hữu ích khi luồng thanh toán yêu cầu xác thực bằng passkey.",
      "v1.61 adds new video retention modes for flaky tests and a WebAuthn virtual authenticator (passkeys) — handy when the payment flow requires passkey authentication.",
      "v1.61はフレーキーなテスト向けの新しい動画保持モードとWebAuthn仮想オーセンティケーター（パスキー）を追加します。決済フローがパスキー認証を要求する場合に便利です。"
    ),
  ],
});

// ── ARTICLE B ── chương 9–13 ───────────────────────────────────────────────
pagesB.push({
  heading: {
    vi: "9. CI: sharding song song + gộp blob report",
    en: "9. CI: parallel sharding + merged blob reports",
    ja: "9. CI：並列シャーディング＋blobレポート統合",
  },
  blocks: [
    P(
      "Bộ E2E lớn sẽ chậm nếu chạy tuần tự. GitHub Actions dùng ma trận shard: chia test thành N phần chạy song song trên N runner. Mỗi runner xuất một blob report; một job cuối gộp các blob thành một HTML report duy nhất để đọc. Cờ '--shard=i/N' của Playwright chia đều test theo file. Kết quả: bộ hàng nghìn test vẫn xong trong vài phút, và mỗi merge vào main đều chạy qua cổng này.",
      "A large E2E suite is slow if run sequentially. GitHub Actions uses a shard matrix: split tests into N parts running in parallel on N runners. Each runner emits a blob report; a final job merges the blobs into a single readable HTML report. Playwright's '--shard=i/N' flag splits tests evenly by file. Result: a suite of thousands of tests still finishes in minutes, and every merge to main runs through this gate.",
      "大規模E2Eスイートは逐次実行では遅くなります。GitHub Actionsはシャードマトリクスを使い、テストをN個の部分に分割しN個のランナーで並列実行します。各ランナーがblobレポートを出力し、最終ジョブがblobを統合して読める単一のHTMLレポートにします。Playwrightの「--shard=i/N」フラグがテストをファイル単位で均等に分割します。結果、数千のテストのスイートも数分で完了し、mainへの各マージがこのゲートを通ります。"
    ),
    CODE("yaml", `# .github/workflows/e2e.yml — shard song song, gộp blob thành một report
name: order-flow-e2e
on: { pull_request: { branches: [main] } }
jobs:
  test:
    strategy:
      fail-fast: false
      matrix: { shard: [1, 2, 3, 4] }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci && npx playwright install --with-deps chromium
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: blob-\${{ matrix.shard }}, path: blob-report, retention-days: 7 }
  merge-report:
    needs: [test]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { path: all-blobs, pattern: blob-* }
      - run: npx playwright merge-reports --reporter html ./all-blobs
      - uses: actions/upload-artifact@v4
        with: { name: html-report, path: playwright-report }`),
    IMG(
      `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="660" height="220" rx="10" fill="#3b0764"/><text x="20" y="28" fill="#f0abfc" font-size="14" font-weight="700">Shard song song → gộp blob → 1 report</text><g fill="#6b21a8" stroke="#e879f9"><rect x="30" y="50" width="120" height="40" rx="6"/><rect x="30" y="100" width="120" height="40" rx="6"/><rect x="30" y="150" width="120" height="40" rx="6"/></g><g fill="#fae8ff" font-size="11"><text x="50" y="75">shard 1/4</text><text x="50" y="125">shard 2/4</text><text x="50" y="175">shard 3/4</text></g><g fill="#581c87" stroke="#c084fc"><rect x="230" y="50" width="110" height="140" rx="6"/></g><text x="245" y="115" fill="#fae8ff" font-size="11">blob-report</text><text x="245" y="133" fill="#f5d0fe" font-size="10">×4 artifact</text><g fill="#4a044e" stroke="#f0abfc"><rect x="410" y="80" width="220" height="80" rx="8"/></g><text x="430" y="110" fill="#fae8ff" font-size="12" font-weight="700">merge-reports</text><text x="430" y="132" fill="#f5d0fe" font-size="10">→ HTML report duy nhất</text><path d="M150 70 H230 M150 120 H230 M150 170 H230" stroke="#e879f9" stroke-width="1.5"/><path d="M340 120 H410" stroke="#c084fc" stroke-width="2" marker-end="url(#d)"/><defs><marker id="d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#c084fc"/></marker></defs></svg>`,
      "Các shard chạy song song, mỗi shard xuất blob; job cuối gộp thành một HTML report để đọc.",
      "Shards run in parallel, each emitting a blob; a final job merges them into one readable HTML report.",
      "シャードが並列実行され、それぞれblobを出力します。最終ジョブがそれらを一つの読めるHTMLレポートに統合します。"
    ),
    NOTE(
      "Đặt 'fail-fast: false' để một shard đỏ không huỷ các shard khác — ta muốn thấy TOÀN BỘ lỗi trong một lần chạy, không phải sửa từng cái một qua nhiều vòng CI.",
      "Set 'fail-fast: false' so one red shard does not cancel the others — we want to see ALL failures in one run, not fix them one at a time across many CI rounds.",
      "「fail-fast: false」を設定し、1つの赤いシャードが他をキャンセルしないようにします。多くのCIラウンドで一つずつ直すのではなく、一度の実行ですべての失敗を見たいからです。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Healer vá test đỏ dưới review người",
    en: "10. The Healer fixes red tests under human review",
    ja: "10. Healerが人間のレビュー下で赤いテストを修復する",
  },
  blocks: [
    P(
      "Khi UI đổi (đổi nhãn nút, di chuyển phần tử), test cũ đỏ. Healer chạy trong debug, đọc trace của lần fail — console, network, ARIA snapshot (từ v1.60 kèm bounding box) — rồi đề xuất bản vá: cập nhật locator theo accessibility tree, hoặc đánh dấu skip nếu tính năng thật sự đổi. Nhưng bản vá là một PR: người review phải xác nhận Healer không 'chữa' bằng cách nới oracle (ví dụ đổi assert tiền thành toBeVisible). Ranh giới: Healer sửa locator/chờ, KHÔNG được đụng bất biến.",
      "When the UI changes (a button label, a moved element), old tests go red. The Healer runs in debug, reads the failing trace — console, network, ARIA snapshot (with bounding boxes since v1.60) — then proposes a fix: update the locator by the accessibility tree, or mark skip if the feature genuinely changed. But the fix is a PR: the reviewer must confirm the Healer did not 'heal' by loosening the oracle (e.g. turning a money assert into toBeVisible). The boundary: the Healer fixes locators/waits, but must NOT touch invariants.",
      "UIが変わると（ボタンのラベル、要素の移動）、古いテストが赤くなります。Healerはデバッグで実行し、失敗のトレース——コンソール、ネットワーク、ARIAスナップショット（v1.60以降はバウンディングボックス付き）——を読み、修正を提案します。アクセシビリティツリーでロケーターを更新するか、機能が本当に変わったならスキップとマークします。しかし修正はPRです。レビュアーはHealerがオラクルを緩めて（金額の検証をtoBeVisibleに変えるなど）「修復」していないか確認せねばなりません。境界：Healerはロケーター・待機を直すが、不変条件に触れてはいけません。"
    ),
    CODE("diff", `// PR do Healer đề xuất — reviewer DUYỆT phần locator, TỪ CHỐI phần nới oracle
  test("đặt hàng: bất biến tiền khớp UI/API", async ({ page, request }) => {
-   await page.getByRole("button", { name: "Thanh toán" }).click();
+   await page.getByRole("button", { name: "Tiến hành thanh toán" }).click(); // ✅ locator đúng UI mới
    const orderId = await page.getByTestId("order-id").innerText();
    const order = await (await request.get(\`/api/orders/\${orderId}\`)).json();
-   assertMoneyInvariant(order);                        // ❌ Healer định xoá — reviewer TỪ CHỐI
+   assertMoneyInvariant(order);                        // ✅ giữ oracle: bất biến KHÔNG được nới
  });`),
    WARN(
      "Cảnh giác 'auto-heal xanh giả': agent làm test xanh bằng cách bỏ assert. Chốt chính sách trong review: mọi PR do Healer tạo mà GIẢM số assert nghiệp vụ (tiền, tồn kho, idempotency) đều bị chặn mặc định.",
      "Beware 'fake-green auto-heal': the agent makes a test green by dropping asserts. Enforce a review policy: any Healer PR that REDUCES business asserts (money, inventory, idempotency) is blocked by default.",
      "「偽の緑の自動修復」に注意：エージェントは検証を削除してテストを緑にします。レビュー方針を強制します。業務検証（金額、在庫、冪等性）を減らすHealerのPRはデフォルトで拒否します。"
    ),
    QA(
      "Healer agent giúp giảm chi phí bảo trì test thế nào mà vẫn an toàn?",
      "How does the Healer agent cut test maintenance cost while staying safe?",
      "Nó tự động hoá phần tốn thời gian nhưng ít rủi ro: cập nhật locator khi UI đổi, thêm auto-wait, sửa selector giòn — dựa trên trace/snapshot thật. An toàn nhờ hai chốt: (1) mọi thay đổi là PR có người duyệt; (2) chính sách chặn PR nào giảm assert nghiệp vụ. Vậy Healer lo phần cơ học của bảo trì, con người giữ oracle.",
      "It automates the time-consuming but low-risk part: updating locators when the UI changes, adding auto-waits, fixing brittle selectors — based on real traces/snapshots. Safety comes from two gates: (1) every change is a human-reviewed PR; (2) a policy blocks any PR that reduces business asserts. So the Healer handles the mechanical maintenance while humans keep the oracle.",
      "Healerエージェントは安全性を保ちつつどうテスト保守コストを削減するか",
      "時間はかかるがリスクの低い部分を自動化します。UI変更時のロケーター更新、自動待機の追加、脆いセレクターの修正——実際のトレース・スナップショットに基づいて。安全性は2つのゲートから来ます。(1) すべての変更は人間がレビューするPR。(2) 業務検証を減らすPRを拒否する方針。こうしてHealerが機械的な保守を担い、人間がオラクルを守ります。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Chống flaky: auto-wait, mock mạng, cô lập dữ liệu",
    en: "11. Fighting flakiness: auto-wait, network mocking, data isolation",
    ja: "11. フレーキー対策：自動待機・ネットワークモック・データ分離",
  },
  blocks: [
    P(
      "Một pipeline chỉ đáng tin nếu ít flaky (chập chờn). Ba trụ cột: (1) dựa vào auto-wait và web-first assertion của Playwright thay vì sleep cứng; (2) mock các phụ thuộc ngoài không xác định (cổng thanh toán bên thứ ba, tỉ giá) bằng route/routeWebSocket để test tất định; (3) cô lập dữ liệu — mỗi test tự seed và dọn qua API, không dùng chung state. Test tất định (deterministic) và idempotent (chạy lại cho cùng kết quả) là điều kiện để CI đáng tin.",
      "A pipeline is only trustworthy if it is low-flake. Three pillars: (1) rely on Playwright's auto-wait and web-first assertions instead of hard sleeps; (2) mock nondeterministic external dependencies (a third-party payment gateway, exchange rates) via route/routeWebSocket for deterministic tests; (3) isolate data — each test seeds and cleans up via the API, sharing no state. Deterministic and idempotent tests (rerun gives the same result) are the condition for a trustworthy CI.",
      "パイプラインはフレーキーが少なくて初めて信頼できます。3つの柱：(1) 固定のsleepではなくPlaywrightの自動待機とweb-firstアサーションに頼る。(2) 非決定的な外部依存（サードパーティ決済ゲートウェイ、為替レート）をroute/routeWebSocketでモックし決定的にする。(3) データを分離する——各テストがAPIでseedとクリーンアップを行い、状態を共有しない。決定的かつ冪等（再実行で同じ結果）なテストが、信頼できるCIの条件です。"
    ),
    CODE("typescript", `// tests/mock-payment.spec.ts — mock cổng thanh toán để test TẤT ĐỊNH
import { test, expect } from "@playwright/test";

test("checkout tất định khi mock gateway trả CAPTURED", async ({ page }) => {
  // Chặn phụ thuộc ngoài không xác định → phản hồi cố định
  await page.route("**/gateway.example.com/charge", route =>
    route.fulfill({ status: 200, json: { status: "CAPTURED", txnId: "mock-001" } })
  );
  // routeWebSocket (v1.57+) cho cập nhật trạng thái đơn theo thời gian thực
  await page.routeWebSocket("**/ws/orders", ws => {
    ws.onMessage(() => ws.send(JSON.stringify({ state: "PAID" })));
  });

  await page.goto("/checkout");
  await page.getByRole("button", { name: "Đặt hàng" }).click();
  await expect(page.getByTestId("order-state")).toHaveText("PAID"); // web-first, auto-wait
});`),
    TIP(
      "Bật 'trace: retain-on-failure-and-retries' và video retention của v1.61: khi một test hiếm hoi vẫn flaky, bạn có trace + video để phân tích nguyên nhân thay vì đoán mò.",
      "Enable 'trace: retain-on-failure-and-retries' and v1.61 video retention: when a rare test is still flaky, you have a trace + video to analyse the cause instead of guessing.",
      "「trace: retain-on-failure-and-retries」とv1.61の動画保持を有効にします。まれにテストがフレーキーなとき、推測ではなくトレース＋動画で原因を分析できます。"
    ),
    QA(
      "Test flaky (chập chờn) khác test fail thật thế nào, và vì sao flaky nguy hiểm cho pipeline tích hợp?",
      "How does a flaky test differ from a real failure, and why is flakiness dangerous for an integrated pipeline?",
      "Flaky là test lúc xanh lúc đỏ với cùng mã và cùng input — thường do timing, mạng, hay state chung. Nó nguy hiểm vì bào mòn niềm tin: đội quen 'chạy lại là xanh' rồi bỏ qua cả lỗi thật. Trong pipeline tích hợp chặn merge, flaky còn làm nghẽn dòng công việc. Cách chữa: auto-wait, mock phụ thuộc ngoài, cô lập dữ liệu, và cách ly/khoanh vùng test flaky để sửa gốc.",
      "Flaky is a test that is sometimes green, sometimes red with the same code and input — usually from timing, network, or shared state. It is dangerous because it erodes trust: the team gets used to 'rerun and it's green' and then ignores real failures too. In a merge-blocking integrated pipeline, flakiness also clogs the workflow. The cure: auto-wait, mock external dependencies, isolate data, and quarantine flaky tests to fix the root cause.",
      "フレーキーなテストは本当の失敗とどう違い、なぜ統合パイプラインで危険か",
      "フレーキーとは、同じコードと入力で緑になったり赤になったりするテストで、通常はタイミング、ネットワーク、共有状態が原因です。信頼を蝕むため危険です。チームは「再実行すれば緑」に慣れ、本当の失敗も無視するようになります。マージを阻止する統合パイプラインでは、フレーキーはワークフローも詰まらせます。対策：自動待機、外部依存のモック、データ分離、フレーキーテストの隔離による根本修正です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Góc phỏng vấn: thiết kế pipeline tích hợp",
    en: "12. Interview angle: designing the integrated pipeline",
    ja: "12. 面接の観点：統合パイプラインの設計",
  },
  blocks: [
    P(
      "Người phỏng vấn cho vai QA tự động thường hỏi cách bạn cân bằng UI và API, cách giữ CI nhanh, và cách dùng AI agent mà không mất kiểm soát. Câu trả lời tốt liên kết bốn ý: oracle nằm ở API request-context (không ở DOM); CI nhanh nhờ sharding + blob merge; agent (Planner/Generator/Healer) tăng năng suất nhưng luôn qua review người; bất biến order-flow là thứ mỗi merge phải khẳng định lại. Nhấn rằng AI không được nới oracle.",
      "Interviewers for automation QA roles often ask how you balance UI and API, keep CI fast, and use AI agents without losing control. A good answer ties four ideas: the oracle lives in the API request-context (not the DOM); CI is fast via sharding + blob merge; the agents (Planner/Generator/Healer) boost productivity but always pass human review; the order-flow invariants are what every merge must re-confirm. Stress that the AI must not loosen the oracle.",
      "自動化QA職の面接官はしばしば、UIとAPIのバランス、CIを速く保つ方法、制御を失わずにAIエージェントを使う方法を尋ねます。良い答えは4つの考えを結びます。オラクルはDOMではなくAPIのrequest-contextにある。CIはシャーディング＋blob統合で速い。エージェント（Planner/Generator/Healer）は生産性を高めるが常に人間のレビューを通る。注文フローの不変条件こそ各マージが再確認すべきもの。AIがオラクルを緩めてはならないと強調します。"
    ),
    SCEN(
      "Câu hỏi: 'Nếu để agent tự sinh và tự merge test thì sao?'",
      "Question: 'What if the agents both generate and self-merge tests?'",
      "Trả lời: sẽ nguy hiểm. Agent có thể sinh assert yếu hoặc 'chữa' đỏ bằng cách xoá oracle, và không ai chịu trách nhiệm khi test bỏ lọt lỗi tiền. Thiết kế đúng: agent tạo PR, người review giữ bất biến, có chính sách chặn PR làm giảm assert nghiệp vụ. Agent tăng tốc phần cơ học (locator, kế hoạch, vá), con người và bất biến giữ đúng/sai.",
      "Answer: it would be dangerous. The agent can emit weak asserts or 'heal' red by deleting the oracle, and no one is accountable when a test misses a money bug. The right design: agents open PRs, humans preserve invariants, and a policy blocks PRs that reduce business asserts. Agents accelerate the mechanics (locators, plans, fixes); humans and invariants hold correctness.",
      "質問：「エージェントがテストを生成し自己マージしたらどうなるか」",
      "答え：危険です。エージェントは弱い検証を出したり、オラクルを削除して赤を「修復」したりでき、テストが金額バグを見逃したとき誰も責任を負いません。正しい設計：エージェントがPRを開き、人間が不変条件を守り、業務検証を減らすPRを拒否する方針を持つこと。エージェントは機構（ロケーター、計画、修正）を加速し、人間と不変条件が正誤を保持します。"
    ),
    QA(
      "Trong pipeline tích hợp, khi nào nên dùng UI test và khi nào nên đẩy xuống API test?",
      "In an integrated pipeline, when should you use UI tests and when push down to API tests?",
      "UI test cho luồng người dùng quan trọng và tương tác thật (điều hướng, form, hiển thị) — nhưng ít và đắt. Đẩy xuống API cho: dựng dữ liệu (arrange), đọc sự thật nghiệp vụ (oracle), ca đồng thời/idempotency, và các tổ hợp nhiều. Nguyên tắc: mỗi luồng nghiệp vụ có ít nhất một 'nhân chứng' UI, phần còn lại kiểm ở API nơi nhanh và ổn định hơn — đúng tinh thần kim tự tháp/cúp test.",
      "UI tests for critical user journeys and real interaction (navigation, forms, rendering) — but few and expensive. Push down to API for: data setup (arrange), reading business truth (oracle), concurrency/idempotency cases, and many combinations. Principle: each business flow has at least one UI 'witness', the rest verified at the API where it is faster and steadier — the testing pyramid/trophy spirit.",
      "統合パイプラインでUIテストとAPIテストをどう使い分けるか",
      "UIテストは重要なユーザージャーニーと実際の操作（ナビゲーション、フォーム、表示）に使いますが、少数で高価です。APIに下ろすのは、データ準備（arrange）、業務上の真実の読み取り（オラクル）、並行・冪等性ケース、多くの組み合わせです。原則：各業務フローに少なくとも1つのUIの「証人」を置き、残りは速く安定したAPIで検証します——テストピラミッド・トロフィーの精神です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Tổng kết & checklist pipeline",
    en: "13. Summary & pipeline checklist",
    ja: "13. まとめとパイプラインチェックリスト",
  },
  blocks: [
    P(
      "Một pipeline E2E tích hợp tốt không phải là 'nhiều test hơn' mà là 'đúng oracle, đúng tầng, đủ nhanh, có kiểm soát AI'. Playwright điều khiển UI; request-context làm oracle nghiệp vụ; sharding + blob merge giữ CI nhanh; Playwright Agents tăng năng suất soạn và bảo trì test nhưng luôn qua cổng review người. Kết dính tất cả là các bất biến order-flow: mỗi merge vào main là một lần khẳng định lại rằng tồn kho không âm, tiền khớp UI-vs-API, coupon đúng trần, thanh toán idempotent và trạng thái đơn cuối duy nhất.",
      "A good integrated E2E pipeline is not 'more tests' but 'the right oracle, the right layer, fast enough, with AI under control'. Playwright drives the UI; the request-context is the business oracle; sharding + blob merge keeps CI fast; the Playwright Agents boost authoring and maintenance productivity but always pass a human review gate. What binds it all are the order-flow invariants: every merge to main re-confirms that inventory is never negative, money matches UI-vs-API, coupons respect the cap, payment is idempotent and the order's final state is unique.",
      "良い統合E2Eパイプラインは「より多くのテスト」ではなく「正しいオラクル、正しい層、十分に速い、AIを制御下に置く」ことです。PlaywrightがUIを操作し、request-contextが業務オラクルとなり、シャーディング＋blob統合がCIを速く保ち、Playwrightエージェントが作成・保守の生産性を高めつつ常に人間のレビューゲートを通ります。すべてを結ぶのは注文フローの不変条件です。mainへの各マージが、在庫が負にならず、金額がUI対APIで一致し、クーポンが上限を守り、決済が冪等で、注文の最終状態が一意であることを再確認します。"
    ),
    UL(
      ["Oracle ở API request-context, không đọc con số từ DOM.",
       "Assert bất biến order-flow, không assert 'thấy trang cảm ơn'.",
       "Ca đồng thời (oversell) + idempotency thanh toán làm oracle mạnh.",
       "CI: sharding song song + gộp blob report, fail-fast:false, required check.",
       "Chống flaky: auto-wait, mock phụ thuộc ngoài, cô lập dữ liệu.",
       "Playwright Agents (Planner/Generator/Healer) hỗ trợ, người review giữ oracle.",
       "Chính sách: chặn mọi PR (kể cả do agent) làm giảm assert nghiệp vụ."],
      ["Oracle in the API request-context, not reading numbers from the DOM.",
       "Assert order-flow invariants, not 'seeing a thank-you page'.",
       "Concurrency (oversell) + payment idempotency as strong oracles.",
       "CI: parallel sharding + merged blob reports, fail-fast:false, required check.",
       "Fight flakiness: auto-wait, mock external dependencies, isolate data.",
       "Playwright Agents (Planner/Generator/Healer) assist, humans review keep the oracle.",
       "Policy: block any PR (agent-made included) that reduces business asserts."],
      ["オラクルはAPIのrequest-context、DOMから数値を読まない。",
       "注文フローの不変条件を検証し、「サンクスページが見える」ではない。",
       "並行（超過販売）＋決済の冪等性を強力なオラクルとする。",
       "CI：並列シャーディング＋blobレポート統合、fail-fast:false、必須チェック。",
       "フレーキー対策：自動待機、外部依存のモック、データ分離。",
       "Playwrightエージェント（Planner/Generator/Healer）が支援、人間のレビューがオラクルを守る。",
       "方針：業務検証を減らすPR（エージェント作成含む）をすべて拒否。"]
    ),
    TIP(
      "Khi thêm luồng nghiệp vụ mới: cập nhật bất biến trước, cho Planner sinh kế hoạch, review kế hoạch, rồi Generator sinh spec. Giữ oracle-first ngay cả khi dùng agent tăng tốc.",
      "When adding a new business flow: update the invariants first, let the Planner draft a plan, review the plan, then the Generator emits specs. Keep oracle-first even when accelerating with agents.",
      "新しい業務フローを追加するとき：まず不変条件を更新し、Plannerに計画を起草させ、計画をレビューし、それからGeneratorがspecを生成します。エージェントで加速するときもオラクル・ファーストを守ります。"
    ),
  ],
});

export const AIAGENT_09 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-insurance-agent-claims-decision",
    cover: coverA,
    tags: tags("thucchien", "insurance", "aitesting", "realworld", "advanced", "experience"),
    title: {
      vi: "AI agent kiểm thử adjudication bồi thường bảo hiểm bằng bảng quyết định",
      en: "An AI agent testing insurance claims adjudication via a decision table",
      ja: "決定表による保険金請求査定を検証するAIテストエージェント",
    },
    summary: {
      vi: "Xây dựng AI test agent kiểm thử engine adjudication (xét duyệt) bồi thường bảo hiểm ở quy mô doanh nghiệp: bảng quyết định làm oracle (kết quả duyệt/từ chối/chờ, quy tắc loại trừ, thời gian chờ, hệ số phí và định phí), cách agent tự sinh ca biên từ chính bảng quyết định trong guardrail còn con người giữ ca rủi ro, oracle = quyết định kỳ vọng chứ không phải 'thấy thành công', các ca lỗi sâu, CI và góc phỏng vấn.",
      en: "Build an AI test agent for an insurance claims adjudication engine at enterprise scale: the decision table as the oracle (approve/deny/pend outcomes, exclusion rules, waiting periods, premium and actuarial factors), how the agent generates boundary cases from the decision table under guardrails while humans own the risky ones, oracle = expected decision rather than 'sees success', deep failure cases, CI and interview angle.",
      ja: "エンタープライズ規模の保険金請求査定エンジンを検証するAIテストエージェントを構築します。オラクルとしての決定表（承認・却下・保留の結果、免責規定、待機期間、保険料と数理係数）、ガードレール内でエージェントが決定表から境界ケースを生成し人間が危険なケースを担当する方法、「成功が見える」ではなく期待される決定をオラクルとすること、深い障害ケース、CI、面接での論点を扱います。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-integrated-ecommerce-pw-api-ci-ai",
    cover: coverB,
    tags: tags("tichhop", "ecommerce", "aitesting", "playwright", "cicd", "realworld"),
    title: {
      vi: "E2E tích hợp TMĐT: Playwright + API oracle + CI sharding + Playwright Agents",
      en: "Integrated e-commerce E2E: Playwright + API oracle + CI sharding + Playwright Agents",
      ja: "統合EC E2E：Playwright＋APIオラクル＋CIシャーディング＋Playwrightエージェント",
    },
    summary: {
      vi: "Một pipeline E2E tích hợp cho luồng đặt hàng TMĐT: Playwright điều khiển UI, request-context của API làm oracle (bảo toàn tồn kho, toán coupon/thuế, idempotency thanh toán, trạng thái đơn cuối), GitHub Actions sharding + blob report gộp, và bộ Playwright Agents (Planner/Generator/Healer) tạo & vá test dưới cổng review con người — mỗi lần merge đều khẳng định bất biến order-flow.",
      en: "An integrated E2E pipeline for the e-commerce order flow: Playwright drives the UI, the API request-context is the oracle (inventory conservation, coupon/tax math, payment idempotency, order final-state), GitHub Actions sharding + merged blob reports, and the Playwright Agents (Planner/Generator/Healer) create & heal tests under a human review gate — every merge reconfirms the order-flow invariants.",
      ja: "ECの注文フロー向けの統合E2Eパイプラインです。PlaywrightがUIを操作し、APIのrequest-contextがオラクル（在庫保存、クーポン・税計算、決済の冪等性、注文の最終状態）となり、GitHub Actionsのシャーディングとblobレポート統合、そしてPlaywrightエージェント（Planner/Generator/Healer）が人間のレビューゲートの下でテストを生成・修復します。マージのたびに注文フローの不変条件を再確認します。",
    },
    pages: buildDoc(pagesB),
  },
];
