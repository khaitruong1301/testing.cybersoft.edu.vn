// doc_manual_advanced_01.mjs — 5 bài MANUAL nâng cao (TRUNG CẤP), level cao dần.
// Kỹ thuật thiết kế ca & tích hợp, gắn dự án doanh nghiệp thật, MOCKUP GIAO DIỆN độ chân thực cao (ui_mock).
// Song ngữ Việt/English/日本語 (ja≠en), 12 chương/bài, có trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, postman, kanban, stateDiagram, dashboard, moduleFlow, charter } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "nangcao", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle, description: cfg.metaDescription, slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword, keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq), courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: cfg.level || "intermediate",
    tags: tags("congnghe", cfg.domain, "intermediate", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 1 — Kỹ thuật bảng quyết định (Decision Table) · Dự án Ngân hàng (xét duyệt khoản vay)
// ══════════════════════════════════════════════════════════════════════════════════════
const a1_loanForm = browser("loanbank.vn/tham-dinh/ho-so/HS-8842", [
  field(30, 20, 330, "Điểm tín dụng (CIC)", "680", "normal"),
  field(388, 20, 330, "Thu nhập/tháng", "18.000.000 ₫", "normal"),
  field(30, 92, 330, "Tài sản đảm bảo", "Có — Nhà ở", "normal"),
  field(388, 92, 330, "Số tiền vay", "300.000.000 ₫", "normal"),
  field(30, 164, 330, "Kỳ hạn", "36 tháng", "normal"),
  field(388, 164, 330, "Nhóm nợ (CIC)", "Nhóm 1", "normal"),
  btn(30, 236, 150, "Thẩm định", "primary"), btn(196, 236, 150, "Từ chối", "ghost"),
  `<text x="360" y="258" font-size="12" font-weight="800" fill="#16a34a">Kết quả đề xuất: DUYỆT</text>`,
].join(""), { h: 340, title: "LoanBank · Thẩm định", accent: "#155ce1" });

const a1_dtable = grid("Bảng quyết định — Xét duyệt khoản vay", ["Điều kiện / Luật", "R1", "R2", "R3", "R4", "R5"], [
  ["Điểm tín dụng ≥ 650", "Y", "Y", "Y", "N", "N"],
  ["Có tài sản đảm bảo", "Y", "N", "N", "Y", "N"],
  ["Thu nhập ≥ 15tr", "Y", "Y", "N", "-", "-"],
  ["→ HÀNH ĐỘNG", "Duyệt", "Duyệt", "Từ chối", "Xét thêm", "Từ chối"],
], { accent: "#155ce1", note: "3 điều kiện Y/N → 2³ = 8 tổ hợp; rút gọn còn 5 luật hợp lệ." });

const a1_dtableFull = grid("Khai triển đủ tổ hợp rồi rút gọn", ["#", "Điểm≥650", "Tài sản", "TN≥15tr", "Hành động"], [
  ["1", "Y", "Y", "Y", "Duyệt"],
  ["2", "Y", "Y", "N", "Duyệt (có TS)"],
  ["3", "Y", "N", "Y", "Duyệt"],
  ["4", "Y", "N", "N", "Từ chối"],
  ["5", "N", "Y", "Y", "Xét thêm"],
  ["6", "N", "Y", "N", "Xét thêm"],
  ["7", "N", "N", "Y", "Từ chối"],
  ["8", "N", "N", "N", "Từ chối"],
], { accent: "#155ce1", highlight: 3, note: "Mỗi dòng = 1 test case. Dòng #4 là ca dễ bị bỏ sót nhất." });

const a1_jira = jira({
  key: "LOAN-2287", title: "Tổ hợp Điểm<650 + Có tài sản + TN cao bị TỪ CHỐI (đáng lẽ Xét thêm)",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web LoanBank · hồ sơ HS-9001"],
    ["Luật vi phạm", "R4 (Điểm=620, Tài sản=Có, TN=20tr)"],
    ["Thực tế", "Hệ thống trả 'Từ chối'"],
    ["Mong đợi", "'Xét thêm' theo bảng quyết định R4"],
    ["Ảnh hưởng", "Từ chối oan khách đủ điều kiện → mất doanh thu"],
  ],
});

const a1_exec = grid("Bảng thực thi test case theo luật (TestRail)", ["Test case", "Luật", "Kỳ vọng", "Thực tế", "KQ"], [
  ["TC-DT-01", "R1", "Duyệt", "Duyệt", "PASS"],
  ["TC-DT-02", "R2", "Duyệt", "Duyệt", "PASS"],
  ["TC-DT-03", "R3", "Từ chối", "Từ chối", "PASS"],
  ["TC-DT-04", "R4", "Xét thêm", "Từ chối", "FAIL → LOAN-2287"],
  ["TC-DT-05", "R5", "Từ chối", "Từ chối", "PASS"],
], { accent: "#155ce1", highlight: 3 });

const a1_faq1 = FAQ(
  "Bảng quyết định (decision table) là gì?", "What is a decision table?",
  "Bảng quyết định là kỹ thuật thiết kế ca kiểm thử cho các quy tắc nghiệp vụ có nhiều điều kiện: liệt kê mọi điều kiện, mọi tổ hợp giá trị của chúng (luật), và hành động tương ứng. Mỗi luật (cột) trở thành một test case, giúp phủ đủ logic mà không bỏ sót tổ hợp.",
  "A decision table is a case-design technique for business rules with several conditions: list all conditions, all combinations of their values (rules), and the resulting action. Each rule (column) becomes a test case, covering the logic without missing combinations.",
  "デシジョンテーブルとは？",
  "デシジョンテーブルは複数条件の業務ルール向けのケース設計技法です。全条件・その値の全組合せ（ルール）・対応するアクションを表にし、各ルール（列）を1テストケースにして組合せ漏れなく網羅します。");
const a1_faq2 = FAQ(
  "Khi nào nên dùng bảng quyết định?", "When should you use a decision table?",
  "Khi kết quả phụ thuộc vào tổ hợp của nhiều điều kiện (ví dụ xét duyệt vay, tính phí, phân quyền, áp khuyến mãi). Nếu logic dạng 'nếu A và B nhưng không C thì…', bảng quyết định giúp bạn không bỏ sót tổ hợp và phát hiện quy tắc mâu thuẫn hoặc còn thiếu.",
  "When the outcome depends on a combination of several conditions (e.g. loan approval, fee calculation, permissions, promotions). If the logic looks like 'if A and B but not C then…', a decision table keeps you from missing combinations and reveals conflicting or missing rules.",
  "デシジョンテーブルはいつ使う？",
  "結果が複数条件の組合せに依存する時（融資審査・手数料計算・権限・販促など）。『AかつBだがCでないなら…』のロジックでは、組合せ漏れを防ぎ矛盾や欠落したルールを発見できます。");
const a1_faq3 = FAQ(
  "Làm sao giảm số ca khi bảng quá lớn?", "How to reduce cases when the table is too big?",
  "Dùng rút gọn (collapse): khi một điều kiện không ảnh hưởng kết quả trong một nhóm luật, đánh dấu '-' (không quan tâm) và gộp các luật giống nhau. Nhờ đó 2ⁿ tổ hợp có thể co lại còn vài luật đại diện mà vẫn phủ đủ logic quan trọng.",
  "Use collapsing: when a condition doesn't affect the outcome within a rule group, mark it '-' (don't care) and merge identical rules. This shrinks 2ⁿ combinations to a few representative rules while still covering the important logic.",
  "表が大きすぎる時ケースを減らすには？",
  "圧縮を使います：あるルール群で条件が結果に影響しない場合『-』（不問）とし、同一ルールを統合します。これで2ⁿの組合せが数個の代表ルールに縮小され、重要ロジックは網羅されます。");

const a1_quiz = [
  mcq({
    q: { vi: "Trong bảng quyết định, mỗi 'luật' (cột) tương ứng với gì khi kiểm thử?", en: "In a decision table, each 'rule' (column) corresponds to what in testing?", ja: "デシジョンテーブルで各『ルール』（列）はテストで何に対応する？" },
    options: [
      { vi: "Một lập trình viên", en: "One developer", ja: "1人の開発者" },
      { vi: "Một test case", en: "One test case", ja: "1つのテストケース" },
      { vi: "Một máy chủ", en: "One server", ja: "1台のサーバー" },
      { vi: "Một trình duyệt", en: "One browser", ja: "1つのブラウザ" },
    ], correct: 1,
    explain: { vi: "Mỗi luật là một tổ hợp điều kiện → một ca kiểm thử với kết quả mong đợi.", en: "Each rule is a condition combination → one test case with an expected result.", ja: "各ルールは条件の組合せ＝期待結果を持つ1テストケースです。" },
  }),
  mcq({
    q: { vi: "3 điều kiện Y/N tạo ra tối đa bao nhiêu tổ hợp?", en: "Three Y/N conditions create at most how many combinations?", ja: "3つのY/N条件は最大いくつの組合せを作る？" },
    options: [
      { vi: "3", en: "3", ja: "3" },
      { vi: "6", en: "6", ja: "6" },
      { vi: "8", en: "8", ja: "8" },
      { vi: "9", en: "9", ja: "9" },
    ], correct: 2,
    explain: { vi: "2 mũ 3 = 8 tổ hợp; sau đó có thể rút gọn bằng ký hiệu '-' (không quan tâm).", en: "2^3 = 8 combinations; then you can collapse using '-' (don't care).", ja: "2の3乗＝8組合せ。その後『-』（不問）で圧縮できます。" },
  }),
  mcq({
    q: { vi: "Ký hiệu '-' (dấu gạch) trong ô điều kiện nghĩa là gì?", en: "What does '-' in a condition cell mean?", ja: "条件セルの『-』は何を意味する？" },
    options: [
      { vi: "Điều kiện bị lỗi", en: "The condition is broken", ja: "条件が壊れている" },
      { vi: "Không quan tâm — giá trị nào cũng cho cùng kết quả", en: "Don't care — any value gives the same result", ja: "不問 — どの値でも同じ結果" },
      { vi: "Bắt buộc phải là Y", en: "Must be Y", ja: "必ずY" },
      { vi: "Bỏ luật này", en: "Drop this rule", ja: "このルールを削除" },
    ], correct: 1,
    explain: { vi: "'-' cho biết điều kiện không ảnh hưởng kết quả trong luật đó, dùng để rút gọn bảng.", en: "'-' means the condition doesn't affect the outcome in that rule, used to collapse the table.", ja: "『-』はそのルールで条件が結果に影響しないことを示し、表の圧縮に使います。" },
  }),
  mcq({
    q: { vi: "Đọc bảng: Điểm<650, Có tài sản, TN cao → luật R4 nói 'Xét thêm' nhưng hệ thống trả 'Từ chối'. Kết luận?", en: "Read: Score<650, has collateral, high income → rule R4 says 'Review' but the system returns 'Reject'. Conclusion?", ja: "表読解：点数<650・担保あり・高収入→R4は『追加審査』だがシステムは『却下』。結論は？" },
    options: [
      { vi: "Đúng thiết kế", en: "Works as designed", ja: "仕様どおり" },
      { vi: "Lỗi: hệ thống không khớp luật R4 của bảng quyết định", en: "Bug: the system doesn't match rule R4 of the decision table", ja: "バグ：システムが表のR4に一致しない" },
      { vi: "Không cần báo", en: "No need to report", ja: "報告不要" },
      { vi: "Do trình duyệt", en: "A browser issue", ja: "ブラウザの問題" },
    ], correct: 1,
    explain: { vi: "Kết quả thực tế lệch luật đã đặc tả → mở bug (như LOAN-2287), ảnh hưởng khách đủ điều kiện.", en: "Actual differs from the specified rule → file a bug (like LOAN-2287), affecting eligible customers.", ja: "実際が仕様ルールと異なる→バグ起票（LOAN-2287）。適格顧客に影響します。" },
  }),
];

const a1_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Bảng quyết định giúp bạn thiết kế test case cho logic nhiều điều kiện mà không bỏ sót tổ hợp. Bài này gắn với màn hình thẩm định khoản vay của một ngân hàng: bạn lập bảng, sinh ca theo từng luật, chạy trên TestRail và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "A decision table lets you design test cases for multi-condition logic without missing combinations. This ties to a bank's loan approval screen: you build the table, derive cases per rule, run them in TestRail and file Jira bugs. A quiz at the end.",
        "デシジョンテーブルは多条件ロジックのテストケースを組合せ漏れなく設計します。本記事は銀行の融資審査画面に沿い、表を作りルール別にケースを導出し、TestRailで実行しJira起票します。最後にクイズ付き。"),
      P("Bảng quyết định là kỹ thuật thiết kế ca bạn sẽ dùng rất nhiều khi hệ thống có quy tắc nghiệp vụ phức tạp — điển hình là ngân hàng. Thay vì đoán mò vài trường hợp, bạn liệt kê mọi điều kiện và mọi tổ hợp một cách có hệ thống. Ở bài này ta bước vào màn hình thẩm định khoản vay thật, và làm từng bước như một tester đi làm. Bài có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "A decision table is a design technique you'll use a lot when a system has complex business rules — banks being typical. Instead of guessing a few cases, you list every condition and every combination systematically. Here we step into a real loan-approval screen and work step by step like a working tester. It has UI mockups, real examples and a final quiz.",
        "デシジョンテーブルは、複雑な業務ルールを持つシステム（銀行が典型）で頻繁に使う設計技法です。数ケースを勘で選ぶ代わりに、全条件と全組合せを体系的に列挙します。本記事は実際の融資審査画面に入り、実務のように進めます。モック・実例・クイズ付き。"),
      IMG(a1_loanForm, "Màn hình test: form thẩm định khoản vay của ngân hàng LoanBank", "Screen under test: LoanBank's loan approval form", "テスト対象画面：LoanBankの融資審査フォーム"),
      DEF("Bảng quyết định", "kỹ thuật liệt kê điều kiện × tổ hợp (luật) × hành động; mỗi luật là một test case.",
        "a decision table — listing conditions × combinations (rules) × actions; each rule is a test case.",
        "デシジョンテーブル — 条件×組合せ（ルール）×アクションを列挙し、各ルールを1テストケースにする技法。"),
    ] },
  { heading: { vi: "2. Bảng quyết định trông như thế nào", en: "2. What a decision table looks like", ja: "2. デシジョンテーブルの見た目" },
    blocks: [
      P("Một bảng quyết định có ba phần: các dòng điều kiện ở trên (mỗi điều kiện nhận Y/N), các cột luật (mỗi cột là một tổ hợp điều kiện), và dòng hành động ở dưới (kết quả cho tổ hợp đó). Đọc theo cột, bạn biết chính xác 'với tổ hợp này thì hệ thống phải làm gì'.",
        "A decision table has three parts: condition rows on top (each condition takes Y/N), rule columns (each column is a condition combination), and an action row at the bottom (the outcome for that combination). Reading by column, you know exactly 'for this combination, what must the system do'.",
        "デシジョンテーブルは3部構成：上部の条件行（各条件はY/N）、ルール列（各列が条件の組合せ）、下部のアクション行（その組合せの結果）。列で読むと『この組合せでシステムは何をすべきか』が正確に分かります。"),
      IMG(a1_dtable, "Bảng quyết định cho quy tắc xét duyệt khoản vay (đã rút gọn)", "A decision table for the loan approval rule (collapsed)", "融資審査ルールのデシジョンテーブル（圧縮済み）"),
      DEF("Luật (rule)", "một cột trong bảng — một tổ hợp cụ thể các giá trị điều kiện, ứng với một hành động.",
        "a rule — a column in the table: a specific combination of condition values mapped to an action.",
        "ルール — 表の1列。条件値の具体的な組合せで、1アクションに対応。"),
      P("Điểm mạnh của kỹ thuật này là tính đầy đủ: nếu có n điều kiện Y/N thì có 2ⁿ tổ hợp. Bạn khai triển hết rồi rút gọn những tổ hợp cho cùng kết quả. Nhờ vậy bạn không chỉ tạo ca đúng đủ, mà còn phát hiện ngay những tổ hợp mà tài liệu yêu cầu 'quên' chưa định nghĩa — một loại lỗi rất khó thấy nếu chỉ test ngẫu nhiên.",
        "The strength is completeness: with n Y/N conditions there are 2ⁿ combinations. You expand them all, then collapse those with the same outcome. This not only creates the right cases but immediately reveals combinations the requirement 'forgot' to define — a bug class very hard to spot with random testing.",
        "強みは網羅性です：n個のY/N条件で2ⁿの組合せがあります。全展開後に同結果を圧縮します。正しいケース作成だけでなく、要件が定義し忘れた組合せも即座に露見します。ランダム検証では見つけにくいバグ種です。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án ngân hàng", en: "3. Why it matters on a banking project", ja: "3. 銀行案件で重要な理由" },
    blocks: [
      P("Ở ngân hàng, quyết định 'duyệt hay từ chối' một khoản vay dựa trên tổ hợp nhiều yếu tố: điểm tín dụng, tài sản đảm bảo, thu nhập, nhóm nợ. Sai một tổ hợp có thể khiến ngân hàng duyệt nhầm khoản vay rủi ro (mất vốn) hoặc từ chối oan khách hàng tốt (mất doanh thu và uy tín).",
        "At a bank, deciding to 'approve or reject' a loan depends on a combination of factors: credit score, collateral, income, debt group. Getting one combination wrong can approve a risky loan (capital loss) or wrongly reject a good customer (lost revenue and reputation).",
        "銀行では融資の『承認/却下』は複数要因（信用スコア・担保・収入・債務区分）の組合せで決まります。1組合せの誤りは、リスク融資の誤承認（資本損失）や優良顧客の誤却下（売上と信用の損失）を招きます。"),
      P("Các quy tắc này còn phải tuân thủ quy định của ngân hàng nhà nước, nên tính đúng đắn không chỉ là chất lượng mà còn là pháp lý. Bảng quyết định cho bạn một cách chứng minh 'đã phủ hết mọi tổ hợp' — điều mà kiểm toán và quản lý rủi ro rất coi trọng.",
        "These rules must also comply with central-bank regulations, so correctness is not just quality but legality. A decision table gives you a way to prove 'all combinations are covered' — something audit and risk management value highly.",
        "これらのルールは中央銀行規制の順守も必要で、正しさは品質だけでなく法令問題です。デシジョンテーブルは『全組合せを網羅した』証明手段となり、監査やリスク管理が重視します。"),
      P("Vì thế, một tester biết dựng bảng quyết định rõ ràng sẽ được tin tưởng giao những phần logic quan trọng nhất. Đây là bước tiến rõ rệt so với chỉ kiểm 'happy path' — bạn đang bảo vệ những quyết định đụng tới tiền và tuân thủ.",
        "So a tester who can build clear decision tables is trusted with the most important logic. This is a clear step up from only checking the 'happy path' — you're protecting decisions that touch money and compliance.",
        "したがって明確なデシジョンテーブルを作れるテスターは最重要ロジックを任されます。『ハッピーパス』だけの検証から明確に前進し、金銭と法令に関わる判断を守ります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: đọc quy tắc & công cụ", en: "4. Prepare: read the rules & tools", ja: "4. 準備：ルールの読解とツール" },
    blocks: [
      P("Nguyên liệu chính của bảng quyết định là tài liệu quy tắc nghiệp vụ (business rules). Bạn cần đọc kỹ để rút ra danh sách điều kiện và hành động trước khi lập bảng.",
        "The main ingredient of a decision table is the business-rules document. Read it carefully to extract the list of conditions and actions before building the table.",
        "デシジョンテーブルの主材料は業務ルール資料です。表を作る前に条件とアクションの一覧を丁寧に抽出します。"),
      STEP(1, "Đọc quy tắc, gạch chân các ĐIỀU KIỆN (điểm tín dụng, tài sản, thu nhập) và các HÀNH ĐỘNG (duyệt/từ chối/xét thêm).", "Read the rules, underline CONDITIONS (score, collateral, income) and ACTIONS (approve/reject/review).", "ルールを読み、条件（スコア・担保・収入）とアクション（承認/却下/追加審査）に線を引く。"),
      STEP(2, "Chuẩn hoá điều kiện về dạng Y/N hoặc khoảng rời rạc (điểm ≥650 → Y/N).", "Normalize conditions into Y/N or discrete ranges (score ≥650 → Y/N).", "条件をY/Nや離散範囲に正規化（スコア≥650→Y/N）。"),
      STEP(3, "Mở TestRail/Excel để lưu ca theo luật và Jira để mở lỗi khi thực tế lệch bảng.", "Open TestRail/Excel to store cases per rule and Jira to file bugs when reality differs from the table.", "TestRail/Excelでルール別ケース保存、実際が表と異なる時のJira起票を準備。"),
      TRY("Lấy quy tắc 'miễn phí ship khi đơn ≥ 500k HOẶC là thành viên VIP' — liệt kê điều kiện và hành động của nó.", "Take 'free shipping if order ≥ 500k OR VIP member' — list its conditions and action.", "『注文≥50万 または VIP会員なら送料無料』のルールで条件とアクションを列挙しよう。"),
      PITFALL("Bỏ qua bước đọc quy tắc, tự bịa điều kiện — bảng sẽ sai gốc, mọi ca sinh ra đều lệch yêu cầu.", "Skipping the rules and inventing conditions — the table is wrong at the root and every derived case misses the requirement.", "ルールを読まず条件を捏造 — 表が根本から誤り、導出ケースが全て要件を外します。"),
      IMG(a1_dtableFull, "Khai triển đủ 2³=8 tổ hợp rồi xác định hành động từng dòng", "Expanding all 2³=8 combinations, then assigning an action per row", "2³=8組合せを全展開し各行にアクションを割当"),
    ] },
  { heading: { vi: "5. Các bước dựng bảng & sinh test case", en: "5. Steps to build the table & derive cases", ja: "5. 表作成とケース導出の手順" },
    blocks: [
      P("Có bốn bước gọn để đi từ quy tắc tới bộ test case đầy đủ. Áp dụng đúng thứ tự để không bỏ sót.",
        "Four concise steps take you from rules to a complete case set. Apply them in order so you miss nothing.",
        "ルールから完全なケース集合まで4ステップ。順序どおりで漏れを防ぎます。"),
      STEP(1, "Liệt kê điều kiện (dòng) và khai triển 2ⁿ tổ hợp giá trị.", "List conditions (rows) and expand 2ⁿ value combinations.", "条件（行）を列挙し2ⁿの値組合せを展開。"),
      STEP(2, "Điền hành động cho từng tổ hợp dựa trên quy tắc nghiệp vụ.", "Fill the action for each combination based on the business rules.", "各組合せに業務ルールでアクションを記入。"),
      STEP(3, "Rút gọn: gộp luật cùng kết quả, đánh '-' cho điều kiện không ảnh hưởng.", "Collapse: merge rules with the same outcome, mark '-' for conditions that don't affect it.", "圧縮：同結果のルールを統合、影響しない条件を『-』に。"),
      STEP(4, "Mỗi luật còn lại → một test case với dữ liệu cụ thể và kết quả mong đợi.", "Each remaining rule → one test case with concrete data and an expected result.", "残った各ルール→具体データと期待結果を持つ1テストケース。"),
      CODE("text", "TC-DT-01 (R1): Điểm=680, Tài sản=Có, TN=18tr   -> Kỳ vọng: DUYỆT\nTC-DT-02 (R2): Điểm=700, Tài sản=Không, TN=20tr -> Kỳ vọng: DUYỆT\nTC-DT-03 (R3): Điểm=660, Tài sản=Không, TN=9tr  -> Kỳ vọng: TỪ CHỐI\nTC-DT-04 (R4): Điểm=620, Tài sản=Có, TN=20tr    -> Kỳ vọng: XÉT THÊM   (ca hay bị bỏ sót)\nTC-DT-05 (R5): Điểm=600, Tài sản=Không, TN=8tr  -> Kỳ vọng: TỪ CHỐI"),
      TRY("Tự sinh test case cho luật 'Điểm≥650, Không tài sản, TN<15tr' — dữ liệu và kết quả mong đợi là gì?", "Derive the case for 'Score≥650, no collateral, income<15tr' — data and expected result?", "『スコア≥650・担保なし・収入<15tr』のケースを導出しよう — データと期待結果は？"),
    ] },
  { heading: { vi: "6. Tình huống 1: phát hiện tổ hợp bị 'quên'", en: "6. Situation 1: finding a 'forgotten' combination", ja: "6. シーン1：忘れられた組合せの発見" },
    blocks: [
      SITUATION("Bạn khai triển bảng và thấy một tổ hợp không có trong tài liệu quy tắc.", "You expand the table and find a combination missing from the rules doc.",
        "Tổ hợp 'Điểm≥650, Không tài sản, Thu nhập<15tr' không được tài liệu nói rõ duyệt hay từ chối. Đây là lỗ hổng đặc tả.",
        "The combination 'Score≥650, no collateral, income<15tr' isn't specified as approve or reject. This is a specification gap.",
        "表を展開すると資料にない組合せを発見。", "『スコア≥650・担保なし・収入<15tr』が承認か却下か明記されていません。仕様の穴です。"),
      SOLVE("Ghi nhận là lỗ hổng yêu cầu (requirement gap), hỏi lại BA/PO thay vì tự đoán.", "Record it as a requirement gap, ask the BA/PO instead of guessing.", "要件の穴として記録し、推測せずBA/POに確認。"),
      P("Đây chính là giá trị lớn nhất của bảng quyết định: nó phơi bày những tổ hợp mà con người dễ quên khi viết yêu cầu. Bạn không tự quyết định kết quả (vì đó là nghiệp vụ), mà nêu câu hỏi rõ ràng để đội làm rõ trước khi lập trình đi tiếp. Việc này ngăn một lỗi logic 'chui' vào sản phẩm ngay từ khâu đặc tả.",
        "This is the biggest value of a decision table: it exposes combinations humans easily forget when writing requirements. You don't decide the outcome yourself (that's business), but raise a clear question for the team to clarify before development proceeds. This stops a logic bug from slipping into the product at the spec stage.",
        "これがデシジョンテーブル最大の価値です：要件作成時に人が忘れがちな組合せを露出します。結果は自分で決めず（業務判断のため）、開発前に明確な質問で確認を促します。仕様段階でロジックバグの混入を防ぎます。"),
      CODE("text", "CÂU HỎI LÀM RÕ (gửi BA/PO):\nTổ hợp: Điểm tín dụng ≥ 650, KHÔNG tài sản đảm bảo, Thu nhập < 15 triệu.\n- Bảng quyết định hiện chưa định nghĩa hành động cho tổ hợp này.\n- Đề xuất: 'Xét thêm' (giống nhóm rủi ro trung bình)? Hay 'Từ chối'?\n=> Cần chốt trước khi viết test case TC-DT-06."),
      RECAP(["Bảng quyết định phát hiện lỗ hổng đặc tả", "Tester nêu câu hỏi, không tự quyết nghiệp vụ"],
        ["Decision tables expose spec gaps", "Testers raise questions, don't decide business rules"],
        ["表は仕様の穴を露出", "テスターは質問し業務判断はしない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: hệ thống trả sai theo một luật", en: "7. Situation 2: the system violates one rule", ja: "7. シーン2：システムが1ルールに違反" },
    blocks: [
      SITUATION("Chạy ca TC-DT-04 (luật R4), hệ thống trả kết quả sai.", "Running TC-DT-04 (rule R4), the system returns a wrong result.",
        "Hồ sơ Điểm=620 (<650), Có tài sản, Thu nhập cao — theo bảng phải 'Xét thêm', nhưng hệ thống lại 'Từ chối' thẳng.",
        "Application Score=620 (<650), has collateral, high income — per the table it should be 'Review', but the system flatly 'Rejects'.",
        "TC-DT-04（R4）実行でシステムが誤結果を返す。", "スコア=620（<650）・担保あり・高収入 — 表では『追加審査』のはずが、システムは即『却下』します。"),
      SOLVE("Đối chiếu luật R4 trong bảng, mở bug với đầy đủ tổ hợp đầu vào và kết quả kỳ vọng.", "Compare rule R4 in the table, file a bug with the full input combination and expected result.", "表のR4と照合し、入力組合せと期待結果を明記してバグ起票。"),
      P("Khi ghi nhận, sức mạnh của bảng quyết định thể hiện rõ: bạn không nói chung chung 'xét duyệt bị lỗi' mà chỉ đích danh luật R4, nêu đủ ba giá trị điều kiện và kết quả mong đợi theo đặc tả. Lập trình viên nhìn vào là biết chính xác nhánh logic nào sai. Đây là lỗi nghiêm trọng vì từ chối oan khách đủ điều kiện.",
        "When recording, the table's power shows: you don't say vaguely 'approval is broken' but name rule R4 exactly, give all three condition values and the spec's expected result. Developers instantly see which logic branch is wrong. It's serious because it wrongly rejects an eligible customer.",
        "記録時、表の力が発揮されます：漠然と『審査が壊れた』でなくR4を名指しし、3条件値と仕様の期待結果を示します。開発者はどのロジック分岐が誤りか即座に分かります。適格顧客を誤却下するため重大です。"),
      IMG(a1_jira, "Ticket Jira ghi rõ luật R4 bị vi phạm, đủ tổ hợp đầu vào & kết quả kỳ vọng", "A Jira ticket naming violated rule R4 with full input combination & expected result", "違反ルールR4・入力組合せ・期待結果を明記したJiraチケット"),
      TRY("Tự viết một câu tiêu đề bug cho luật R3 nếu hệ thống 'Duyệt' thay vì 'Từ chối'.", "Write a bug title for rule R3 if the system 'Approves' instead of 'Rejects'.", "システムがR3で『却下』でなく『承認』した場合のバグタイトルを書こう。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report theo luật", en: "8. Recording & the report file by rule", ja: "8. ルール別の記録とレポート" },
    blocks: [
      P("Vì mỗi luật là một test case, báo cáo của bạn trình bày kết quả theo từng luật — rất dễ đọc và dễ truy vết. Người quản lý nhìn vào biết ngay nhánh logic nào chưa đạt.",
        "Because each rule is a test case, your report presents results by rule — very readable and traceable. Managers instantly see which logic branch fails.",
        "各ルールが1ケースのため、報告はルール別に結果を提示します。読みやすく追跡しやすく、管理者はどの分岐が不合格か即座に分かります。"),
      STEP(1, "Ghi kết quả từng luật (Pass/Fail) và gắn mã ticket cho luật Fail.", "Record each rule's result (Pass/Fail) and attach ticket IDs to failed rules.", "各ルールの結果（合否）を記録、Failにチケット番号を付与。"),
      STEP(2, "Nêu rõ luật nào thiếu đặc tả (gap) để đội bổ sung yêu cầu.", "Highlight rules missing a spec (gaps) so the team completes the requirement.", "仕様欠落（穴）のルールを明示し要件補完を促す。"),
      CODE("text", "BÁO CÁO — Bảng quyết định Xét duyệt khoản vay — Sprint 30 (LoanBank)\nNgười test: (bạn)  |  Môi trường: staging  |  Ngày: 08/07\nLuật R1..R5: 5 ca | Pass 4 | Fail 1 (R4) | Gap: 1 (tổ hợp Điểm≥650/không TS/TN<15tr chưa định nghĩa)\nLỗi:  LOAN-2287  High  R4 trả 'Từ chối' thay vì 'Xét thêm'  [ảnh hưởng: từ chối oan]\nKhuyến nghị: (1) sửa R4; (2) BA bổ sung định nghĩa cho tổ hợp còn thiếu trước khi phát hành."),
      IMG(a1_exec, "Bảng thực thi test case theo từng luật, gắn mã lỗi cho ca Fail", "A test execution sheet by rule, linking the failed case to a bug ID", "ルール別のテスト実行表、Failケースにバグ番号を紐付け"),
      TIP("Trình bày báo cáo theo LUẬT (không theo số thứ tự ngẫu nhiên) — người đọc lần ngay ra nhánh logic tương ứng.", "Present the report by RULE (not random order) — readers trace straight to the matching logic branch.", "報告はルール別に提示（ランダム順でなく）— 読者が対応する分岐へ直接辿れます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng bảng quyết định, người ta hay mắc vài lỗi giống nhau. Biết trước giúp bảng của bạn gọn, đúng và dễ bảo trì.",
        "When new to decision tables, people make a few common mistakes. Knowing them keeps your table compact, correct and maintainable.",
        "デシジョンテーブルに不慣れだと共通の失敗をします。事前に知れば表が簡潔・正確・保守しやすくなります。"),
      PITFALL("Quên khai triển đủ 2ⁿ tổ hợp trước khi rút gọn — dễ bỏ sót đúng tổ hợp gây lỗi.", "Forgetting to expand all 2ⁿ combinations before collapsing — easy to miss the very combination that causes a bug.", "圧縮前に2ⁿを全展開し忘れる — バグを生む組合せを見落としがちです。"),
      PITFALL("Trộn nhiều điều kiện vào một dòng (ví dụ 'điểm cao và có tài sản') — không tách được nên rút gọn sai.", "Merging several conditions into one row (e.g. 'high score and has collateral') — you can't separate them so collapsing goes wrong.", "複数条件を1行に混ぜる（例『高スコアかつ担保あり』）— 分離できず圧縮を誤ります。"),
      TIP("Một điều kiện một dòng, giá trị Y/N/'-' rõ ràng; luôn khai triển đủ rồi mới rút gọn.", "One condition per row, clear Y/N/'-' values; always expand fully before collapsing.", "1条件1行、Y/N/『-』を明確に；必ず全展開後に圧縮。"),
      IMG(a1_dtable, "Bảng quyết định gọn gàng: mỗi điều kiện một dòng, mỗi luật một cột", "A clean decision table: one condition per row, one rule per column", "整然としたデシジョンテーブル：1条件1行・1ルール1列"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      a1_faq1.block, a1_faq2.block, a1_faq3.block,
      INTERNAL("Kiểm thử chuyển trạng thái cho tester", "State transition testing for testers", "kiem-thu-chuyen-trang-thai-cho-nguoi-moi"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi"),
    ] },
  QUIZ(a1_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa dùng bảng quyết định để thiết kế ca cho logic xét duyệt khoản vay của một ngân hàng: đọc quy tắc, khai triển tổ hợp, rút gọn, sinh test case theo luật, phát hiện lỗ hổng đặc tả và một lỗi logic, rồi ghi nhận theo luật. Đây là kỹ năng thiết kế ca ở mức chuyên nghiệp.",
        "You just used a decision table to design cases for a bank's loan-approval logic: read the rules, expanded combinations, collapsed, derived cases per rule, found a spec gap and a logic bug, then recorded by rule. This is professional-level case design.",
        "デシジョンテーブルで銀行の融資審査ロジックのケースを設計しました：ルール読解・組合せ展開・圧縮・ルール別導出・仕様の穴と論理バグの発見・ルール別記録。プロレベルのケース設計スキルです。"),
      P("Chặng tiếp theo là kiểm thử chuyển trạng thái cho các luồng có nhiều trạng thái (giao dịch, đơn hàng), rồi các kỹ thuật kết hợp và tích hợp. Nếu muốn luyện các kỹ thuật này trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is state transition testing for multi-state flows (transactions, orders), then combinatorial and integration techniques. If you want to practice these on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "次は多状態フロー（取引・注文）の状態遷移テスト、そして組合せと統合の技法です。指導付きで企業を模した案件で練習したいなら、体系的コースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const ADV1 = makeDoc({
  slug: "bang-quyet-dinh-decision-table-cho-tester",
  domain: "banking",
  level: "intermediate",
  primaryKeyword: "bảng quyết định",
  keywords: ["bảng quyết định", "decision table testing", "kỹ thuật thiết kế test case", "decision table là gì"],
  coverLabel: "TRUNG CẤP · DECISION TABLE · NGÂN HÀNG",
  crumb: "Bảng quyết định (Decision Table)",
  metaTitle: { vi: "Kỹ thuật bảng quyết định (Decision Table) test", en: "Decision table testing technique for testers", ja: "デシジョンテーブル技法（テスト設計）" },
  metaDescription: {
    vi: "Kỹ thuật bảng quyết định cho tester trên dự án ngân hàng: điều kiện–luật–hành động, khai triển & rút gọn, sinh test case, phát hiện lỗ hổng đặc tả, có trắc nghiệm.",
    en: "The decision table technique for testers on a banking project: conditions–rules–actions, expand & collapse, derive cases, find spec gaps, UI mockups and a quiz.",
    ja: "テスター向けデシジョンテーブル技法を銀行案件で：条件・ルール・アクション、展開と圧縮、ケース導出、仕様の穴発見、モック、クイズ。",
  },
  title: {
    vi: "Kỹ thuật bảng quyết định (Decision Table): thiết kế test case cho logic ngân hàng (có trắc nghiệm)",
    en: "The decision table technique: designing test cases for banking logic (with quiz)",
    ja: "デシジョンテーブル技法：銀行ロジックのテストケース設計（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: dùng bảng quyết định để thiết kế test case cho logic xét duyệt khoản vay ngân hàng. Điều kiện–luật–hành động, khai triển 2ⁿ & rút gọn, sinh ca theo luật, phát hiện lỗ hổng đặc tả và lỗi logic, ghi nhận theo luật, mockup giao diện thật, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: using a decision table to design test cases for a bank's loan-approval logic. Conditions–rules–actions, 2ⁿ expansion & collapsing, per-rule cases, finding spec gaps and logic bugs, recording by rule, real UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：デシジョンテーブルで銀行の融資審査ロジックのテストケースを設計。条件・ルール・アクション、2ⁿ展開と圧縮、ルール別ケース、仕様の穴と論理バグの発見、記録、モック、FAQ、クイズ。",
  },
  faqs: [a1_faq1, a1_faq2, a1_faq3],
  howTo: { name: "Cách dùng bảng quyết định để thiết kế test case", steps: [
    { name: "Đọc quy tắc, rút điều kiện & hành động", text: "Chuẩn hoá điều kiện về Y/N hoặc khoảng rời rạc." },
    { name: "Khai triển 2ⁿ tổ hợp rồi rút gọn", text: "Gộp luật cùng kết quả, đánh '-' cho điều kiện không ảnh hưởng." },
    { name: "Sinh test case theo từng luật", text: "Mỗi luật một ca với dữ liệu cụ thể và kết quả mong đợi." },
  ] },
  pages: a1_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 2 — Kiểm thử chuyển trạng thái (State Transition) · Ví điện tử (fintech)
// ══════════════════════════════════════════════════════════════════════════════════════
const a2_nodes = [
  { id: "created", label: "Khởi tạo", x: 110, y: 110, kind: "start" },
  { id: "pending", label: "Đang xử lý", x: 340, y: 110, kind: "mid" },
  { id: "success", label: "Thành công", x: 590, y: 88, kind: "ok" },
  { id: "failed", label: "Thất bại", x: 590, y: 196, kind: "bad" },
  { id: "refunded", label: "Đã hoàn", x: 340, y: 252, kind: "mid" },
  { id: "expired", label: "Hết hạn", x: 110, y: 252, kind: "bad" },
];
const a2_edges = [
  { from: "created", to: "pending", label: "gửi lệnh" },
  { from: "pending", to: "success", label: "xác thực OK" },
  { from: "pending", to: "failed", label: "sai OTP", bad: true },
  { from: "pending", to: "expired", label: "quá 15'", bad: true },
  { from: "success", to: "refunded", label: "hoàn tiền" },
  { from: "failed", to: "pending", label: "thử lại" },
];
const a2_diagram = stateDiagram("Sơ đồ trạng thái giao dịch ví điện tử PayVN", a2_nodes, a2_edges, { accent: "#0d9488", h: 320 });

const a2_screen = browser("payvn.vn/vi/giao-dich/GD-77120", [
  field(30, 20, 330, "Mã giao dịch", "GD-77120", "normal"),
  field(388, 20, 330, "Số tiền", "1.500.000 ₫", "normal"),
  field(30, 92, 330, "Người nhận", "0903 •••  ••• (Nguyễn V.A)", "normal"),
  field(388, 92, 330, "Thời điểm tạo", "08/07 10:42", "normal"),
  `<text x="30" y="182" font-size="11" font-weight="700" fill="#475569">TRẠNG THÁI HIỆN TẠI</text>`,
  `<rect x="30" y="192" width="150" height="30" rx="15" fill="#fef9c3"/><text x="52" y="212" font-size="13" font-weight="800" fill="#a16207">● Đang xử lý</text>`,
  btn(200, 190, 130, "Xác nhận OTP", "primary"), btn(346, 190, 110, "Huỷ", "ghost"),
], { h: 300, title: "PayVN · Giao dịch", accent: "#0d9488" });

const a2_grid = grid("Ma trận chuyển trạng thái: hợp lệ vs KHÔNG hợp lệ", ["Từ trạng thái", "Sự kiện", "Đến (đúng)", "Ca cần chặn"], [
  ["Đang xử lý", "Xác thực OK", "Thành công", "—"],
  ["Đang xử lý", "Sai OTP", "Thất bại", "—"],
  ["Thành công", "Xác thực lại", "(không đổi)", "Thành công → Đang xử lý"],
  ["Hết hạn", "Xác thực OK", "(không đổi)", "Hết hạn → Thành công"],
  ["Đã hoàn", "Xác thực OK", "(không đổi)", "Đã hoàn → Thành công"],
], { accent: "#0d9488", note: "Cột phải là các chuyển trạng thái KHÔNG hợp lệ — hệ thống phải chặn." });

const a2_jira = jira({
  key: "PAY-3390", title: "Giao dịch ĐÃ HẾT HẠN vẫn xác thực OTP thành công → chuyển sang Thành công",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical", color: "#bf2600",
  fields: [
    ["Môi trường", "staging · web PayVN · GD hết hạn > 15'"],
    ["Chuyển sai", "Hết hạn → Thành công (không hợp lệ)"],
    ["Thực tế", "Nhập OTP cũ vẫn 'Thành công', trừ tiền"],
    ["Mong đợi", "Chặn OTP, giữ trạng thái 'Hết hạn'"],
    ["Rủi ro", "Trừ tiền cho giao dịch đã huỷ → khiếu nại"],
  ],
});

const a2_exec = grid("Bảng thực thi ca chuyển trạng thái (TestRail)", ["Test case", "Chuyển trạng thái", "Kỳ vọng", "KQ"], [
  ["TC-ST-01", "Đang xử lý → Thành công", "Cho phép", "PASS"],
  ["TC-ST-02", "Đang xử lý → Thất bại (sai OTP)", "Cho phép", "PASS"],
  ["TC-ST-03", "Thành công → Đang xử lý", "CHẶN", "PASS"],
  ["TC-ST-04", "Hết hạn → Thành công", "CHẶN", "FAIL → PAY-3390"],
  ["TC-ST-05", "Đã hoàn → Thành công", "CHẶN", "PASS"],
], { accent: "#0d9488", highlight: 3 });

const a2_faq1 = FAQ(
  "Kiểm thử chuyển trạng thái (state transition) là gì?", "What is state transition testing?",
  "Là kỹ thuật kiểm thử cho các đối tượng đi qua nhiều trạng thái (giao dịch, đơn hàng, tài khoản). Bạn vẽ sơ đồ trạng thái, xác định các chuyển trạng thái HỢP LỆ và, quan trọng hơn, các chuyển KHÔNG hợp lệ mà hệ thống phải chặn.",
  "It's a technique for objects that pass through multiple states (transactions, orders, accounts). You draw the state diagram, identify VALID transitions and, more importantly, INVALID ones the system must block.",
  "状態遷移テストとは？",
  "取引・注文・アカウントなど複数状態を経る対象向けの技法です。状態図を描き、有効な遷移と、より重要な『無効な遷移』（システムが防ぐべき）を特定します。");
const a2_faq2 = FAQ(
  "Vì sao chuyển trạng thái KHÔNG hợp lệ lại quan trọng?", "Why do INVALID transitions matter?",
  "Vì đó là nơi phát sinh lỗi nghiêm trọng và gian lận: ví dụ đưa một giao dịch đã hết hạn hoặc đã hoàn về 'Thành công' để trừ tiền. Kiểm thử tốt phải cố tình thử các chuyển trạng thái không hợp lệ để chắc chắn hệ thống chặn được.",
  "Because that's where serious bugs and fraud arise: e.g. moving an expired or refunded transaction back to 'Success' to charge money. Good testing deliberately attempts invalid transitions to ensure the system blocks them.",
  "なぜ無効な遷移が重要？",
  "重大バグや不正が生じる場所だからです。例：期限切れや返金済み取引を『成功』に戻して課金。良い検証は無効な遷移を意図的に試し、システムが防ぐことを確認します。");
const a2_faq3 = FAQ(
  "Làm sao liệt kê đủ các chuyển trạng thái cần kiểm?", "How to list all transitions to test?",
  "Lập bảng ma trận: hàng là trạng thái nguồn, cột là sự kiện; mỗi ô cho biết trạng thái đích hợp lệ (hoặc 'chặn'). Duyệt hết mọi ô sẽ phủ cả chuyển hợp lệ lẫn không hợp lệ, không bỏ sót.",
  "Build a matrix: rows are source states, columns are events; each cell gives the valid target state (or 'block'). Walking every cell covers both valid and invalid transitions, missing none.",
  "検証すべき遷移をどう網羅する？",
  "行列を作ります：行が元状態、列がイベント、各セルが有効な遷移先（または『拒否』）。全セルを辿ると有効・無効の両遷移を漏れなく網羅します。");

const a2_quiz = [
  mcq({
    q: { vi: "Kiểm thử chuyển trạng thái phù hợp nhất với đối tượng nào?", en: "State transition testing best fits which kind of object?", ja: "状態遷移テストが最も適する対象は？" },
    options: [
      { vi: "Một trang tĩnh không thay đổi", en: "A static page that never changes", ja: "変化しない静的ページ" },
      { vi: "Đối tượng đi qua nhiều trạng thái (giao dịch, đơn hàng)", en: "Objects passing through multiple states (transactions, orders)", ja: "複数状態を経る対象（取引・注文）" },
      { vi: "Màu nền của nút", en: "A button's background color", ja: "ボタンの背景色" },
      { vi: "Kích thước ảnh", en: "Image size", ja: "画像サイズ" },
    ], correct: 1,
    explain: { vi: "Kỹ thuật này dành cho đối tượng có vòng đời trạng thái rõ ràng.", en: "The technique targets objects with a clear state lifecycle.", ja: "この技法は明確な状態ライフサイクルを持つ対象向けです。" },
  }),
  mcq({
    q: { vi: "Chuyển trạng thái 'Hết hạn → Thành công' nên được xử lý thế nào?", en: "How should an 'Expired → Success' transition be handled?", ja: "『期限切れ→成功』の遷移はどう扱うべき？" },
    options: [
      { vi: "Cho phép bình thường", en: "Allow it normally", ja: "通常どおり許可" },
      { vi: "Hệ thống phải CHẶN (không hợp lệ)", en: "The system must BLOCK it (invalid)", ja: "システムは拒否すべき（無効）" },
      { vi: "Tùy người dùng", en: "Up to the user", ja: "利用者次第" },
      { vi: "Không cần kiểm", en: "No need to test", ja: "検証不要" },
    ], correct: 1,
    explain: { vi: "Đây là chuyển không hợp lệ; cho phép sẽ trừ tiền sai và mở đường gian lận.", en: "It's an invalid transition; allowing it charges wrongly and enables fraud.", ja: "無効な遷移で、許可すると誤課金や不正を招きます。" },
  }),
  mcq({
    q: { vi: "Công cụ nào giúp liệt kê đủ các chuyển trạng thái?", en: "What helps list all transitions completely?", ja: "全遷移を漏れなく列挙するのに役立つのは？" },
    options: [
      { vi: "Ma trận trạng thái × sự kiện", en: "A state × event matrix", ja: "状態×イベントの行列" },
      { vi: "Một ảnh chụp màn hình", en: "A screenshot", ja: "スクリーンショット" },
      { vi: "Danh bạ điện thoại", en: "A phone book", ja: "電話帳" },
      { vi: "Máy tính bỏ túi", en: "A calculator", ja: "電卓" },
    ], correct: 0,
    explain: { vi: "Ma trận nguồn × sự kiện buộc bạn xét mọi ô, phủ cả ca hợp lệ và không hợp lệ.", en: "A source × event matrix forces you to consider every cell, covering valid and invalid cases.", ja: "元×イベントの行列は全セルを検討させ、有効・無効を網羅します。" },
  }),
  mcq({
    q: { vi: "Nhập lại OTP cũ cho giao dịch đã hết hạn mà vẫn 'Thành công' là lỗi loại gì?", en: "Reusing an old OTP on an expired transaction that still 'Succeeds' is what kind of bug?", ja: "期限切れ取引に古いOTPを再利用しても『成功』するのは何のバグ？" },
    options: [
      { vi: "Lỗi giao diện", en: "A UI bug", ja: "UIバグ" },
      { vi: "Lỗi chuyển trạng thái không hợp lệ (nghiêm trọng, dính tiền)", en: "An invalid state transition bug (critical, money-related)", ja: "無効な状態遷移バグ（重大・金銭関連）" },
      { vi: "Lỗi chính tả", en: "A typo", ja: "誤字" },
      { vi: "Không phải lỗi", en: "Not a bug", ja: "バグではない" },
    ], correct: 1,
    explain: { vi: "Hệ thống cho phép một chuyển trạng thái bị cấm và trừ tiền → lỗi nghiêm trọng.", en: "The system allowed a forbidden transition and charged money → a critical bug.", ja: "禁止された遷移を許可し課金 → 重大バグです。" },
  }),
];

const a2_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử chuyển trạng thái giúp bạn kiểm các đối tượng có nhiều trạng thái, đặc biệt là chặn các chuyển KHÔNG hợp lệ. Bài này gắn với giao dịch ví điện tử: bạn vẽ sơ đồ trạng thái, lập ma trận, thử chuyển hợp lệ & không hợp lệ, mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "State transition testing checks objects with multiple states, especially blocking INVALID transitions. This ties to e-wallet transactions: you draw the state diagram, build a matrix, attempt valid & invalid transitions, file Jira bugs. A quiz at the end.",
        "状態遷移テストは多状態の対象を検証し、特に無効な遷移の拒否を確認します。本記事は電子ウォレット取引に沿い、状態図作成・行列・有効/無効遷移の試行・Jira起票を行います。最後にクイズ付き。"),
      P("Kiểm thử chuyển trạng thái là kỹ thuật bạn sẽ cần khi hệ thống có 'vòng đời trạng thái' — giao dịch, đơn hàng, tài khoản. Điểm mấu chốt không chỉ là kiểm các bước chạy đúng, mà là cố tình thử những bước bị cấm để chắc hệ thống chặn. Ở bài này ta bước vào màn hình giao dịch ví điện tử thật và làm từng bước như một tester đi làm. Bài có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "State transition testing is what you need when a system has a 'state lifecycle' — transactions, orders, accounts. The key isn't only checking valid steps, but deliberately attempting forbidden steps to ensure the system blocks them. Here we step into a real e-wallet transaction screen and work like a working tester. It has UI mockups, real examples and a final quiz.",
        "状態遷移テストは、システムが『状態ライフサイクル』（取引・注文・アカウント）を持つ時に必要です。要点は正しい手順の確認だけでなく、禁止手順を意図的に試して拒否を確認することです。本記事は実際の電子ウォレット取引画面に入り実務のように進めます。モック・実例・クイズ付き。"),
      IMG(a2_screen, "Màn hình test: chi tiết giao dịch ví điện tử PayVN đang ở trạng thái 'Đang xử lý'", "Screen under test: a PayVN e-wallet transaction in 'Processing' state", "テスト対象画面：『処理中』状態のPayVN取引詳細"),
      DEF("Kiểm thử chuyển trạng thái", "kỹ thuật kiểm các chuyển trạng thái hợp lệ và chặn các chuyển không hợp lệ của một đối tượng.",
        "state transition testing — verifying valid transitions and blocking invalid ones for an object.",
        "状態遷移テスト — 対象の有効な遷移を検証し無効な遷移を拒否する技法。"),
    ] },
  { heading: { vi: "2. Sơ đồ trạng thái trông như thế nào", en: "2. What a state diagram looks like", ja: "2. 状態図の見た目" },
    blocks: [
      P("Một sơ đồ trạng thái gồm các trạng thái (hình bo tròn) và các mũi tên chuyển giữa chúng, mỗi mũi tên gắn một sự kiện. Nhìn sơ đồ, bạn thấy ngay giao dịch đi từ 'Khởi tạo' qua 'Đang xử lý' rồi tới 'Thành công', 'Thất bại' hay 'Hết hạn'.",
        "A state diagram has states (rounded shapes) and transition arrows between them, each labeled with an event. From the diagram you immediately see a transaction go from 'Created' through 'Processing' to 'Success', 'Failed' or 'Expired'.",
        "状態図は状態（角丸図形）とその間の遷移矢印（各々イベント付き）から成ります。図を見れば取引が『作成』→『処理中』→『成功/失敗/期限切れ』へ進むのが即分かります。"),
      IMG(a2_diagram, "Sơ đồ trạng thái giao dịch: đường liền = chuyển hợp lệ, đường đứt đỏ = nhánh lỗi/hết hạn", "Transaction state diagram: solid = valid transitions, dashed red = failure/expiry branches", "取引状態図：実線=有効な遷移、赤破線=失敗/期限切れ分岐"),
      DEF("Chuyển trạng thái không hợp lệ", "một chuyển mà quy tắc nghiệp vụ cấm; hệ thống phải chặn (ví dụ Hết hạn → Thành công).",
        "an invalid transition — one the business rules forbid; the system must block it (e.g. Expired → Success).",
        "無効な遷移 — 業務ルールが禁じる遷移。システムが拒否すべき（例：期限切れ→成功）。"),
      P("Từ sơ đồ, bạn suy ra hai loại ca: ca theo đường liền (chuyển hợp lệ — phải cho phép) và ca 'ngược đường' hoặc 'nhảy cóc' (chuyển không hợp lệ — phải chặn). Chính nhóm thứ hai là nơi ẩn những lỗi đắt giá nhất, vì nó dính tới tiền và gian lận.",
        "From the diagram you derive two case types: cases along solid arrows (valid — must allow) and 'wrong-way' or 'skip' cases (invalid — must block). The second group hides the costliest bugs because it touches money and fraud.",
        "図から2種のケースを導きます：実線沿い（有効—許可必須）と『逆走』『飛躍』（無効—拒否必須）。後者に最も高くつくバグが潜みます。金銭と不正に関わるからです。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án fintech", en: "3. Why it matters on a fintech project", ja: "3. フィンテック案件で重要な理由" },
    blocks: [
      P("Ở ví điện tử, mỗi trạng thái giao dịch gắn với tiền thật. Một chuyển trạng thái sai — như đưa giao dịch đã hết hạn hoặc đã hoàn tiền về 'Thành công' — có thể khiến khách bị trừ tiền hai lần, hoặc kẻ gian khai thác để chiếm đoạt. Đây là loại lỗi mà báo chí hay đưa tin và cơ quan quản lý xử phạt.",
        "In an e-wallet, each transaction state ties to real money. A wrong transition — like moving an expired or refunded transaction back to 'Success' — can double-charge customers or let fraudsters exploit it. This is the kind of bug that makes headlines and draws regulatory penalties.",
        "電子ウォレットでは各取引状態が実際の金銭に紐づきます。誤った遷移（期限切れや返金済みを『成功』に戻す）は二重課金や不正利用を招きます。報道され規制当局に処罰される種のバグです。"),
      P("Vì thế fintech kiểm rất kỹ các chuyển trạng thái không hợp lệ, và một tester biết tư duy theo sơ đồ trạng thái là tài sản quý. Bạn không chỉ xác nhận 'luồng chạy được' mà còn chủ động tấn công những đường đi bị cấm để bảo vệ tiền của người dùng.",
        "So fintech scrutinizes invalid transitions heavily, and a tester who thinks in state diagrams is a valuable asset. You don't just confirm 'the flow works' but actively attack forbidden paths to protect users' money.",
        "したがってフィンテックは無効な遷移を厳しく検証し、状態図で考えるテスターは貴重です。『フローが動く』の確認だけでなく、禁止経路を能動的に攻めて利用者の資金を守ります。"),
      P("Ngoài tiền, còn có yếu tố tuân thủ và đối soát: hệ thống phải giữ lịch sử trạng thái nhất quán để đối chiếu với ngân hàng. Một chuyển trạng thái sai làm lệch số liệu đối soát cuối ngày, gây hậu quả kế toán lan rộng.",
        "Beyond money, there's compliance and reconciliation: the system must keep a consistent state history to reconcile with banks. A wrong transition skews end-of-day reconciliation, causing wide accounting consequences.",
        "金銭以外に法令と照合の要素もあります：システムは銀行と照合するため一貫した状態履歴を保つ必要があります。誤った遷移は日次照合を狂わせ、広範な会計影響を生みます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: dựng sơ đồ & công cụ", en: "4. Prepare: build the diagram & tools", ja: "4. 準備：状態図とツール" },
    blocks: [
      P("Bước chuẩn bị quan trọng nhất là dựng đúng sơ đồ trạng thái từ tài liệu nghiệp vụ. Có sơ đồ, mọi ca kiểm thử sẽ tự lộ ra.",
        "The most important prep is building the correct state diagram from the business docs. With the diagram, all test cases reveal themselves.",
        "最も重要な準備は業務資料から正しい状態図を作ることです。図があれば全ケースが自ずと現れます。"),
      STEP(1, "Liệt kê mọi trạng thái (Khởi tạo, Đang xử lý, Thành công, Thất bại, Hết hạn, Đã hoàn).", "List all states (Created, Processing, Success, Failed, Expired, Refunded).", "全状態を列挙（作成・処理中・成功・失敗・期限切れ・返金済み）。"),
      STEP(2, "Vẽ mũi tên cho từng sự kiện hợp lệ; đánh dấu các chuyển KHÔNG có mũi tên là 'phải chặn'.", "Draw arrows for each valid event; mark transitions with NO arrow as 'must block'.", "各有効イベントに矢印を描き、矢印のない遷移を『拒否必須』と印す。"),
      STEP(3, "Mở TestRail/Excel cho ma trận trạng thái × sự kiện, Jira để mở lỗi.", "Open TestRail/Excel for the state × event matrix, Jira to file bugs.", "状態×イベント行列用にTestRail/Excel、起票用Jiraを開く。"),
      TRY("Vẽ nhanh sơ đồ trạng thái cho một đơn hàng TMĐT: Mới → Đã thanh toán → Đang giao → Hoàn tất / Đã huỷ.", "Sketch a state diagram for an order: New → Paid → Shipping → Completed / Cancelled.", "注文の状態図を素描：新規→支払済→配送中→完了/キャンセル。"),
      PITFALL("Chỉ vẽ đường đi 'đẹp' mà quên các nhánh lỗi (hết hạn, sai OTP) — bỏ sót đúng nơi hay có lỗi nghiêm trọng.", "Only drawing the 'happy' path and forgetting failure branches (expiry, wrong OTP) — missing exactly where serious bugs live.", "『きれいな』経路だけ描き失敗分岐（期限切れ・誤OTP）を忘れる — 重大バグの巣を見落とします。"),
      IMG(a2_grid, "Ma trận trạng thái × sự kiện: cột phải liệt kê các chuyển phải chặn", "The state × event matrix: the right column lists transitions to block", "状態×イベント行列：右列が拒否すべき遷移"),
    ] },
  { heading: { vi: "5. Các bước sinh ca chuyển trạng thái", en: "5. Steps to derive transition cases", ja: "5. 遷移ケース導出の手順" },
    blocks: [
      P("Từ sơ đồ và ma trận, bạn sinh hai nhóm ca. Làm theo bốn bước để phủ đủ.",
        "From the diagram and matrix you derive two case groups. Follow four steps for full coverage.",
        "図と行列から2群のケースを導きます。4ステップで網羅します。"),
      STEP(1, "Ca hợp lệ: mỗi mũi tên là một ca (đưa đối tượng vào trạng thái nguồn, kích sự kiện, kiểm trạng thái đích).", "Valid cases: each arrow is a case (put the object in the source state, fire the event, check the target).", "有効ケース：各矢印が1ケース（元状態にし、イベント発火、遷移先確認）。"),
      STEP(2, "Ca không hợp lệ: mỗi ô 'phải chặn' là một ca (thử kích sự kiện bị cấm, kiểm hệ thống từ chối).", "Invalid cases: each 'must block' cell is a case (fire the forbidden event, check rejection).", "無効ケース：各『拒否』セルが1ケース（禁止イベント発火、拒否確認）。"),
      STEP(3, "Với ca dính tiền, kiểm thêm hệ quả: số dư, lịch sử, đối soát có đúng không.", "For money cases, also check effects: balance, history, reconciliation.", "金銭ケースでは影響も確認：残高・履歴・照合。"),
      STEP(4, "Mỗi ca có dữ liệu cụ thể và kết quả mong đợi (cho phép/chặn + hệ quả).", "Each case has concrete data and an expected result (allow/block + effects).", "各ケースに具体データと期待結果（許可/拒否＋影響）。"),
      CODE("text", "TC-ST-01 Hợp lệ  : Đang xử lý --(OTP đúng)--> Thành công   | trừ tiền, lịch sử 'Thành công'\nTC-ST-03 Chặn    : Thành công --(xác thực lại)--> ?         | phải giữ 'Thành công', KHÔNG đổi\nTC-ST-04 Chặn    : Hết hạn --(OTP cũ)--> ?                   | phải giữ 'Hết hạn', KHÔNG trừ tiền\nTC-ST-05 Chặn    : Đã hoàn --(OTP)--> ?                      | phải giữ 'Đã hoàn', KHÔNG trừ tiền lần 2"),
      TRY("Tự viết 1 ca không hợp lệ cho chuyển 'Thất bại → Đã hoàn' (gợi ý: chưa từng trừ tiền thì hoàn gì?).", "Write one invalid case for 'Failed → Refunded' (hint: if never charged, what is refunded?).", "『失敗→返金済み』の無効ケースを1つ書こう（ヒント：未課金なら何を返金？）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chặn chuyển 'ngược đường'", en: "6. Situation 1: blocking a 'wrong-way' transition", ja: "6. シーン1：逆走遷移の拒否" },
    blocks: [
      SITUATION("Bạn thử đưa một giao dịch 'Thành công' quay lại 'Đang xử lý'.", "You try moving a 'Success' transaction back to 'Processing'.",
        "Bằng cách gọi lại API xác thực hoặc bấm lại nút cũ, bạn kiểm xem hệ thống có cho phép một giao dịch đã hoàn tất quay lại xử lý hay không.",
        "By re-calling the auth API or re-clicking an old button, you test whether the system lets a completed transaction return to processing.",
        "『成功』取引を『処理中』に戻そうと試す。", "認証API再呼び出しや古いボタン再押下で、完了取引が処理中に戻せるか検証します。"),
      SOLVE("Xác nhận hệ thống giữ nguyên trạng thái 'Thành công' và trả thông báo phù hợp; ghi nhận nếu cho phép.", "Confirm the system keeps 'Success' and returns a proper message; record it if it allows the change.", "システムが『成功』を維持し適切な通知を返すか確認；変更を許せば記録。"),
      P("Đây là ca không hợp lệ cần chặn. Hệ thống tốt sẽ bỏ qua thao tác và giữ nguyên trạng thái, không tạo bản ghi trùng. Nếu nó cho phép quay lại 'Đang xử lý', bạn có thể tạo ra giao dịch 'ma' hoặc trừ tiền lặp. Khi ghi nhận, nêu rõ chuỗi trạng thái trước–sau và hệ quả về số dư.",
        "This is an invalid case to block. A good system ignores the action and keeps the state, creating no duplicate record. If it allows returning to 'Processing', you can create a 'ghost' transaction or double-charge. When recording, state the before–after state sequence and the balance effect.",
        "これは拒否すべき無効ケースです。良いシステムは操作を無視し状態を維持、重複記録を作りません。『処理中』に戻せると『幽霊』取引や二重課金が起きます。記録時は前後の状態列と残高影響を明記します。"),
      CODE("text", "TC-ST-03 (Chặn chuyển ngược)\nTiền đề: giao dịch GD-77120 đang ở 'Thành công'\nBước: 1) Gọi lại /api/txn/verify với OTP cũ  2) Kiểm trạng thái & số dư\nKỳ vọng: giữ 'Thành công'; KHÔNG tạo bản ghi mới; số dư KHÔNG đổi; báo 'Giao dịch đã hoàn tất'\nĐạt: nếu hệ thống bỏ qua và giữ nguyên. Fail: nếu chuyển về 'Đang xử lý'."),
      RECAP(["Ca không hợp lệ phải bị CHẶN, giữ nguyên trạng thái", "Luôn kiểm hệ quả số dư/lịch sử kèm theo"],
        ["Invalid cases must be BLOCKED, state unchanged", "Always check balance/history effects too"],
        ["無効ケースは拒否し状態維持", "残高/履歴の影響も必ず確認"]),
    ] },
  { heading: { vi: "7. Tình huống 2: OTP cũ trên giao dịch hết hạn", en: "7. Situation 2: an old OTP on an expired transaction", ja: "7. シーン2：期限切れ取引の古いOTP" },
    blocks: [
      SITUATION("Giao dịch để quá 15 phút chuyển 'Hết hạn'; bạn nhập lại OTP đã nhận trước đó.", "A transaction left over 15 minutes becomes 'Expired'; you re-enter the previously received OTP.",
        "Về lý, OTP đã hết hiệu lực cùng giao dịch. Bạn kiểm xem hệ thống có chặn hay lại 'Thành công' và trừ tiền.",
        "Logically the OTP expired with the transaction. You test whether the system blocks it or 'Succeeds' and charges money.",
        "15分放置で『期限切れ』になった取引に、以前のOTPを再入力する。", "論理上OTPは取引と共に失効。システムが拒否するか、『成功』して課金するか検証します。"),
      SOLVE("Ghi nhận là chuyển trạng thái không hợp lệ dính tiền; đặt severity Critical.", "Record it as a money-related invalid transition; set severity Critical.", "金銭に関わる無効な遷移として記録；重大度をCriticalに。"),
      P("Đây là lỗi nghiêm trọng nhất trong nhóm chuyển trạng thái vì nó vừa sai logic vừa trừ tiền cho một giao dịch đáng lẽ đã huỷ. Khi ghi nhận, bạn nêu rõ mốc thời gian (quá 15 phút), chuỗi trạng thái, và hệ quả trừ tiền — đủ để lập trình viên tái hiện và hiểu mức độ. Kèm ảnh trạng thái trước và sau.",
        "This is the most serious transition bug because it's both a logic error and charges money for a transaction that should be cancelled. When recording, state the timing (over 15 minutes), the state sequence, and the charge effect — enough to reproduce and grasp severity. Attach before/after state images.",
        "これは論理誤りかつキャンセルされるべき取引に課金するため、遷移バグ中で最も重大です。記録時はタイミング（15分超）・状態列・課金影響を明記し、再現と深刻度把握を可能にします。前後の状態画像を添付します。"),
      IMG(a2_jira, "Ticket Jira Critical: giao dịch hết hạn vẫn xác thực thành công và trừ tiền", "A Critical Jira ticket: an expired transaction still authenticates and charges money", "重大Jiraチケット：期限切れ取引が認証成功し課金"),
      TRY("Nghĩ thêm một ca không hợp lệ dính tiền cho trạng thái 'Đã hoàn' (gợi ý: hoàn tiền hai lần).", "Think of another money-related invalid case for 'Refunded' (hint: refunding twice).", "『返金済み』の金銭に関わる無効ケースをもう1つ考えよう（ヒント：二重返金）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report theo trạng thái", en: "8. Recording & the report file by state", ja: "8. 状態別の記録とレポート" },
    blocks: [
      P("Báo cáo kiểm thử chuyển trạng thái nên tách rõ ca hợp lệ và ca chặn, vì nhóm 'phải chặn' là nơi rủi ro cao nhất. Người quản lý cần thấy ngay còn chuyển trạng thái cấm nào chưa được ngăn.",
        "A state transition report should clearly separate valid and block cases, because the 'must block' group is the highest risk. Managers need to see immediately which forbidden transitions aren't yet prevented.",
        "状態遷移報告は有効ケースと拒否ケースを明確に分けるべきです。『拒否必須』群が最高リスクだからです。管理者はどの禁止遷移が未防止か即座に把握する必要があります。"),
      STEP(1, "Ghi kết quả theo hai nhóm: chuyển hợp lệ (cho phép) và chuyển bị cấm (chặn).", "Record results in two groups: valid (allowed) and forbidden (blocked) transitions.", "2群で記録：有効（許可）と禁止（拒否）の遷移。"),
      STEP(2, "Đánh dấu blocker mọi ca 'phải chặn' còn Fail (đặc biệt ca dính tiền).", "Mark as blockers any 'must block' case still failing (especially money cases).", "Failのままの『拒否必須』ケース（特に金銭）をブロッカーに。"),
      CODE("text", "BÁO CÁO — Chuyển trạng thái giao dịch PayVN — Sprint 18\nNgười test: (bạn)  |  Môi trường: staging  |  Ngày: 08/07\nChuyển hợp lệ : 6 ca | Pass 6 | Fail 0\nChuyển bị cấm : 5 ca | Pass 4 | Fail 1\nLỗi:  PAY-3390  Critical  Hết hạn → Thành công (OTP cũ) trừ tiền  [BLOCKER]\nKhuyến nghị: KHÔNG go-live cho tới khi PAY-3390 được sửa & test lại toàn bộ nhóm 'phải chặn'."),
      IMG(a2_exec, "Bảng thực thi ca chuyển trạng thái, tách nhóm cho phép và nhóm chặn", "A transition execution sheet separating allow and block groups", "許可群と拒否群を分けた遷移実行表"),
      TIP("Ưu tiên báo cáo nhóm 'phải chặn' lên đầu — đây là nơi lỗi gây thiệt hại tiền và uy tín lớn nhất.", "Put the 'must block' group first in the report — that's where money and reputation damage is greatest.", "報告で『拒否必須』群を先頭に — 金銭と信用の損害が最大の場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng kỹ thuật này, người ta hay mắc vài lỗi giống nhau. Biết trước giúp bạn phủ đủ và bắt được những lỗi đắt giá.",
        "When new to this technique, people make a few common mistakes. Knowing them helps you cover fully and catch costly bugs.",
        "この技法に不慣れだと共通の失敗をします。事前に知れば網羅し高くつくバグを捉えられます。"),
      PITFALL("Chỉ kiểm chuyển hợp lệ, bỏ qua chuyển bị cấm — đúng nơi phát sinh gian lận và trừ tiền sai.", "Only checking valid transitions, skipping forbidden ones — exactly where fraud and wrong charges arise.", "有効遷移だけ検証し禁止遷移を飛ばす — 不正や誤課金が生じる場所です。"),
      PITFALL("Quên kiểm hệ quả (số dư, lịch sử) khi một chuyển bị chặn — hệ thống 'chặn' nhưng vẫn ghi sai dữ liệu.", "Forgetting to check effects (balance, history) when a transition is blocked — the system 'blocks' but still writes wrong data.", "遷移拒否時に影響（残高・履歴）の確認を忘れる — 『拒否』しても誤データを書くことがあります。"),
      TIP("Dùng ma trận trạng thái × sự kiện để không bỏ ô nào; với mỗi ô hỏi 'cho phép hay chặn?' và kiểm cả hệ quả.", "Use the state × event matrix so no cell is missed; for each ask 'allow or block?' and check effects.", "状態×イベント行列で全セルを網羅；各セルで『許可か拒否か』を問い影響も確認。"),
      IMG(a2_diagram, "Sơ đồ trạng thái đầy đủ giúp không bỏ sót nhánh lỗi và chuyển bị cấm", "A complete state diagram so no failure branch or forbidden transition is missed", "完全な状態図で失敗分岐や禁止遷移を漏らさない"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      a2_faq1.block, a2_faq2.block, a2_faq3.block,
      INTERNAL("Kiểm thử pairwise (kết hợp) cho tester", "Pairwise testing for testers", "kiem-thu-pairwise-ket-hop-cho-tester"),
      INTERNAL("Kỹ thuật bảng quyết định (Decision Table)", "Decision table technique", "bang-quyet-dinh-decision-table-cho-tester"),
    ] },
  QUIZ(a2_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa kiểm thử chuyển trạng thái cho giao dịch ví điện tử: dựng sơ đồ, lập ma trận trạng thái × sự kiện, sinh ca hợp lệ và ca chặn, phát hiện hai lỗi chuyển trạng thái dính tiền, rồi ghi nhận tách nhóm. Đây là kỹ năng bảo vệ những luồng nhạy cảm nhất của sản phẩm.",
        "You just did state transition testing for e-wallet transactions: built the diagram, the state × event matrix, derived valid and block cases, found two money-related transition bugs, then recorded by group. This is the skill of protecting a product's most sensitive flows.",
        "電子ウォレット取引の状態遷移テストをしました：状態図・状態×イベント行列・有効/拒否ケース導出・金銭に関わる2つの遷移バグ発見・群別記録。製品の最も繊細なフローを守るスキルです。"),
      P("Chặng tiếp theo là kiểm thử kết hợp (pairwise) khi có nhiều tham số cấu hình, rồi kiểm thử tích hợp giữa các module. Nếu muốn luyện các kỹ thuật này trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is pairwise testing when there are many configuration parameters, then integration testing between modules. If you want to practice these on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "次は多数の設定パラメータがある時のペアワイズテスト、そしてモジュール間の統合テストです。指導付きで企業を模した案件で練習したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ADV2 = makeDoc({
  slug: "kiem-thu-chuyen-trang-thai-cho-nguoi-moi",
  domain: "fintech",
  level: "intermediate",
  primaryKeyword: "kiểm thử chuyển trạng thái",
  keywords: ["kiểm thử chuyển trạng thái", "state transition testing", "sơ đồ trạng thái", "state transition là gì"],
  coverLabel: "TRUNG CẤP · STATE TRANSITION · FINTECH",
  crumb: "Kiểm thử chuyển trạng thái",
  metaTitle: { vi: "Kiểm thử chuyển trạng thái (State Transition)", en: "State transition testing for testers", ja: "状態遷移テスト（テスト設計）" },
  metaDescription: {
    vi: "Kiểm thử chuyển trạng thái cho tester trên dự án ví điện tử: sơ đồ trạng thái, ma trận trạng thái × sự kiện, chặn chuyển không hợp lệ, kịch bản trừ tiền sai, có quiz.",
    en: "State transition testing for testers on an e-wallet project: state diagrams, state × event matrix, blocking invalid transitions, wrong-charge scenarios and a quiz.",
    ja: "テスター向け状態遷移テストを電子ウォレット案件で：状態図・状態×イベント行列・無効遷移の拒否・誤課金シナリオ・クイズ。",
  },
  title: {
    vi: "Kiểm thử chuyển trạng thái (State Transition): giao dịch ví điện tử & chặn chuyển sai (có trắc nghiệm)",
    en: "State transition testing: e-wallet transactions & blocking invalid moves (with quiz)",
    ja: "状態遷移テスト：電子ウォレット取引と無効遷移の拒否（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: kiểm thử chuyển trạng thái cho giao dịch ví điện tử. Sơ đồ trạng thái, ma trận trạng thái × sự kiện, sinh ca hợp lệ và ca 'phải chặn', hai tình huống dính tiền (chuyển ngược, OTP cũ trên giao dịch hết hạn), ghi nhận tách nhóm, mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: state transition testing for e-wallet transactions. State diagram, state × event matrix, valid and 'must block' cases, two money-related situations (wrong-way move, old OTP on an expired transaction), recording by group, UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：電子ウォレット取引の状態遷移テスト。状態図・状態×イベント行列・有効/拒否ケース・金銭に関わる2シーン・群別記録・モック・FAQ・クイズ。",
  },
  faqs: [a2_faq1, a2_faq2, a2_faq3],
  howTo: { name: "Cách kiểm thử chuyển trạng thái", steps: [
    { name: "Dựng sơ đồ trạng thái", text: "Liệt kê trạng thái và mũi tên sự kiện; đánh dấu chuyển phải chặn." },
    { name: "Lập ma trận trạng thái × sự kiện", text: "Mỗi ô: cho phép hay chặn, kèm hệ quả số dư/lịch sử." },
    { name: "Sinh ca hợp lệ & ca chặn", text: "Thử cả chuyển đúng lẫn chuyển bị cấm, ghi nhận blocker khi cần." },
  ] },
  pages: a2_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 3 — Kiểm thử pairwise (kết hợp) · TMĐT (cấu hình sản phẩm)
// ══════════════════════════════════════════════════════════════════════════════════════
const a3_screen = browser("shopvn.vn/san-pham/ao-thun-basic", [
  `<text x="30" y="24" font-size="12" font-weight="700" fill="#475569">Kích cỡ</text>`,
  `<rect x="30" y="32" width="46" height="28" rx="6" fill="#1a72f5"/><text x="53" y="50" text-anchor="middle" font-size="12" fill="#fff">S</text>`,
  `<rect x="84" y="32" width="46" height="28" rx="6" fill="#eef2f7"/><text x="107" y="50" text-anchor="middle" font-size="12" fill="#334155">M</text>`,
  `<rect x="138" y="32" width="46" height="28" rx="6" fill="#eef2f7"/><text x="161" y="50" text-anchor="middle" font-size="12" fill="#334155">L</text>`,
  `<rect x="192" y="32" width="52" height="28" rx="6" fill="#eef2f7"/><text x="218" y="50" text-anchor="middle" font-size="12" fill="#334155">XL</text>`,
  `<text x="30" y="92" font-size="12" font-weight="700" fill="#475569">Màu</text>`,
  `<rect x="30" y="100" width="70" height="28" rx="6" fill="#eef2f7"/><text x="65" y="118" text-anchor="middle" font-size="11" fill="#334155">Trắng</text>`,
  `<rect x="108" y="100" width="70" height="28" rx="6" fill="#111827"/><text x="143" y="118" text-anchor="middle" font-size="11" fill="#fff">Đen</text>`,
  `<rect x="186" y="100" width="70" height="28" rx="6" fill="#eef2f7"/><text x="221" y="118" text-anchor="middle" font-size="11" fill="#334155">Xanh</text>`,
  field(390, 6, 330, "Mã giảm giá", "SALE10", "normal"),
  field(390, 78, 330, "Phương thức vận chuyển", "Hoả tốc 2h", "focus"),
  btn(30, 150, 200, "Thêm vào giỏ — 300.000 ₫", "primary"),
], { h: 260, title: "ShopVN · Cấu hình sản phẩm", accent: "#7c2d92" });

const a3_explode = grid("Bùng nổ tổ hợp: đủ vs pairwise", ["Tham số", "Số giá trị"], [
  ["Kích cỡ", "4 (S/M/L/XL)"],
  ["Màu", "3 (Trắng/Đen/Xanh)"],
  ["Mã giảm giá", "3 (không/SALE10/VIP)"],
  ["Vận chuyển", "3 (Thường/Nhanh/Hoả tốc)"],
  ["→ Tổ hợp ĐỦ", "4×3×3×3 = 108 ca"],
  ["→ Pairwise (phủ mọi cặp)", "≈ 12–15 ca"],
], { accent: "#7c2d92", highlight: 5, note: "Pairwise phủ MỌI cặp giá trị mà chỉ dùng ~1/8 số ca so với đủ tổ hợp." });

const a3_pw = grid("Bộ ca pairwise (phủ mọi cặp giá trị)", ["#", "Cỡ", "Màu", "Mã giảm giá", "Vận chuyển"], [
  ["1", "S", "Trắng", "không", "Thường"],
  ["2", "S", "Đen", "SALE10", "Nhanh"],
  ["3", "M", "Trắng", "VIP", "Hoả tốc"],
  ["4", "M", "Xanh", "không", "Nhanh"],
  ["5", "L", "Đen", "không", "Hoả tốc"],
  ["6", "L", "Xanh", "SALE10", "Thường"],
  ["7", "XL", "Trắng", "SALE10", "Hoả tốc"],
  ["8", "XL", "Đen", "VIP", "Thường"],
], { accent: "#7c2d92", note: "Mỗi cặp (vd Cỡ=XL × Vận chuyển=Hoả tốc) đều xuất hiện ít nhất 1 lần." });

const a3_jira = jira({
  key: "SHOP-4102", title: "Cặp 'Mã VIP × Hoả tốc' cộng phí sai (miễn phí ship nhưng vẫn trừ 30k)",
  type: "Bug", status: "Open", priority: "High", severity: "High", color: "#7c2d92",
  fields: [
    ["Môi trường", "staging · web ShopVN · SP ao-thun-basic"],
    ["Cặp gây lỗi", "Mã giảm giá=VIP × Vận chuyển=Hoả tốc"],
    ["Thực tế", "Tổng vẫn +30.000 ₫ phí hoả tốc"],
    ["Mong đợi", "VIP miễn phí mọi loại vận chuyển"],
    ["Phát hiện qua", "Ca pairwise #3 (M/Trắng/VIP/Hoả tốc)"],
  ],
});

const a3_exec = grid("Bảng thực thi bộ ca pairwise (TestRail)", ["Ca", "Tổ hợp rút gọn", "Kỳ vọng", "KQ"], [
  ["PW-01", "S/Trắng/không/Thường", "Phí thường", "PASS"],
  ["PW-02", "S/Đen/SALE10/Nhanh", "Giảm 10% + phí nhanh", "PASS"],
  ["PW-03", "M/Trắng/VIP/Hoả tốc", "Miễn phí ship", "FAIL → SHOP-4102"],
  ["PW-07", "XL/Trắng/SALE10/Hoả tốc", "Giảm 10% + phí hoả tốc", "PASS"],
], { accent: "#7c2d92", highlight: 2 });

const a3_faq1 = FAQ(
  "Kiểm thử pairwise (kết hợp) là gì?", "What is pairwise testing?",
  "Pairwise (all-pairs) là kỹ thuật chọn một tập ca nhỏ sao cho MỌI cặp giá trị của hai tham số bất kỳ đều xuất hiện ít nhất một lần. Dựa trên thực tế: phần lớn lỗi do một giá trị đơn hoặc tương tác của một CẶP tham số, nên phủ hết cặp là bắt được đa số lỗi mà không cần thử toàn bộ tổ hợp.",
  "Pairwise (all-pairs) is a technique that selects a small case set so that EVERY pair of values of any two parameters appears at least once. It relies on the fact that most bugs come from a single value or a PAIR interaction, so covering all pairs catches most bugs without testing every combination.",
  "ペアワイズ（組合せ）テストとは？",
  "ペアワイズ（all-pairs）は、任意の2パラメータの値の全ペアが少なくとも1回現れるよう小さなケース集合を選ぶ技法です。多くのバグは単一値か2パラメータの相互作用に起因するため、全ペア網羅で全組合せなしに大半のバグを捉えます。");
const a3_faq2 = FAQ(
  "Khi nào nên dùng pairwise?", "When should you use pairwise?",
  "Khi một chức năng có nhiều tham số cấu hình, mỗi tham số nhiều giá trị (cấu hình sản phẩm, bộ lọc, thiết lập tài khoản, tổ hợp trình duyệt/OS). Số tổ hợp đủ bùng nổ rất nhanh; pairwise giảm mạnh số ca mà vẫn giữ độ phủ tương tác tốt.",
  "When a feature has many configuration parameters, each with several values (product configuration, filters, account settings, browser/OS combinations). Full combinations explode fast; pairwise cuts the count sharply while keeping good interaction coverage.",
  "ペアワイズはいつ使う？",
  "機能に多数の設定パラメータがあり各々複数値の時（商品設定・フィルタ・アカウント設定・ブラウザ/OS）。全組合せは急増しますが、ペアワイズは相互作用の網羅を保ちつつケース数を大幅に削減します。");
const a3_faq3 = FAQ(
  "Pairwise có bỏ sót lỗi không?", "Does pairwise miss bugs?",
  "Có thể bỏ những lỗi cần tương tác của BA tham số trở lên cùng lúc (khá hiếm). Vì thế pairwise không thay thế hoàn toàn, mà là cách cân bằng chi phí/độ phủ rất tốt cho phần lớn tình huống; các tổ hợp rủi ro cao vẫn nên bổ sung ca riêng.",
  "It may miss bugs needing three or more parameters to interact at once (fairly rare). So pairwise isn't a full replacement but an excellent cost/coverage balance for most situations; high-risk combinations should still get extra dedicated cases.",
  "ペアワイズはバグを見逃す？",
  "3パラメータ以上の同時相互作用が必要なバグ（比較的稀）を見逃すことがあります。完全な代替ではなく、大半の状況でコストと網羅の優れた均衡です。高リスク組合せには個別ケースを追加すべきです。");

const a3_quiz = [
  mcq({
    q: { vi: "Pairwise bảo đảm điều gì?", en: "What does pairwise guarantee?", ja: "ペアワイズは何を保証する？" },
    options: [
      { vi: "Mọi tổ hợp đầy đủ đều được kiểm", en: "Every full combination is tested", ja: "全組合せを検証" },
      { vi: "Mọi CẶP giá trị của hai tham số đều xuất hiện ít nhất 1 lần", en: "Every PAIR of values of two parameters appears at least once", ja: "2パラメータの全ペアが最低1回現れる" },
      { vi: "Không có lỗi nào lọt", en: "No bug can slip", ja: "バグは一切漏れない" },
      { vi: "Chỉ kiểm 1 ca", en: "Only one case is tested", ja: "1ケースのみ検証" },
    ], correct: 1,
    explain: { vi: "All-pairs phủ mọi cặp; đó là nền tảng giúp giảm ca mà vẫn bắt phần lớn lỗi tương tác.", en: "All-pairs covers every pair; that's why it cuts cases yet catches most interaction bugs.", ja: "all-pairsは全ペアを網羅し、ケースを減らしつつ相互作用バグの大半を捉えます。" },
  }),
  mcq({
    q: { vi: "4 × 3 × 3 × 3 tham số cho bao nhiêu tổ hợp ĐẦY ĐỦ?", en: "Parameters 4 × 3 × 3 × 3 give how many FULL combinations?", ja: "4×3×3×3のパラメータは全組合せいくつ？" },
    options: [
      { vi: "13", en: "13", ja: "13" },
      { vi: "36", en: "36", ja: "36" },
      { vi: "108", en: "108", ja: "108" },
      { vi: "12", en: "12", ja: "12" },
    ], correct: 2,
    explain: { vi: "4×3×3×3 = 108 ca; pairwise co lại còn ~12–15 ca mà vẫn phủ mọi cặp.", en: "4×3×3×3 = 108; pairwise shrinks to ~12–15 while covering all pairs.", ja: "4×3×3×3=108。ペアワイズは全ペアを保ちつつ約12〜15に縮小します。" },
  }),
  mcq({
    q: { vi: "Pairwise phù hợp nhất với chức năng nào?", en: "Pairwise best fits which feature?", ja: "ペアワイズが最も適する機能は？" },
    options: [
      { vi: "Một nút chỉ có 1 hành động", en: "A button with a single action", ja: "単一動作のボタン" },
      { vi: "Chức năng nhiều tham số cấu hình, mỗi tham số nhiều giá trị", en: "A feature with many parameters, each with several values", ja: "多パラメータ・各々複数値の機能" },
      { vi: "Trang tĩnh không có input", en: "A static page with no input", ja: "入力のない静的ページ" },
      { vi: "Ảnh logo", en: "A logo image", ja: "ロゴ画像" },
    ], correct: 1,
    explain: { vi: "Càng nhiều tham số × giá trị thì tổ hợp càng bùng nổ — đúng chỗ pairwise toả sáng.", en: "More parameters × values means exploding combinations — exactly where pairwise shines.", ja: "パラメータ×値が多いほど組合せが急増 — ペアワイズが活きる場面です。" },
  }),
  mcq({
    q: { vi: "Lỗi 'Mã VIP × Hoả tốc vẫn tính phí' được phát hiện nhờ ca pairwise chứa cặp nào?", en: "The 'VIP × express still charged' bug was found by a pairwise case containing which pair?", ja: "『VIP×速達で課金』バグは、どのペアを含むペアワイズケースで発見？" },
    options: [
      { vi: "Cỡ=S × Màu=Trắng", en: "Size=S × Color=White", ja: "サイズ=S×色=白" },
      { vi: "Mã giảm giá=VIP × Vận chuyển=Hoả tốc", en: "Coupon=VIP × Shipping=Express", ja: "クーポン=VIP×配送=速達" },
      { vi: "Cỡ=XL × Màu=Đen", en: "Size=XL × Color=Black", ja: "サイズ=XL×色=黒" },
      { vi: "Không cặp nào", en: "No pair", ja: "ペアなし" },
    ], correct: 1,
    explain: { vi: "Ca #3 (M/Trắng/VIP/Hoả tốc) chứa cặp VIP×Hoả tốc — chính cặp gây lỗi tính phí.", en: "Case #3 (M/White/VIP/Express) holds the VIP×Express pair — the one causing the fee bug.", ja: "ケース#3（M/白/VIP/速達）がVIP×速達のペアを含み、料金バグの原因ペアです。" },
  }),
];

const a3_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử pairwise chọn một tập ca nhỏ nhưng phủ mọi cặp giá trị, giúp bạn kiểm chức năng nhiều tham số mà không bùng nổ số ca. Bài này gắn với trang cấu hình sản phẩm TMĐT: bạn liệt kê tham số, sinh bộ ca pairwise, chạy và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "Pairwise testing picks a small case set that still covers every value pair, letting you test multi-parameter features without exploding case counts. This ties to an e-commerce product configuration page: you list parameters, derive a pairwise set, run it and file Jira bugs. A quiz at the end.",
        "ペアワイズテストは全値ペアを網羅する小さなケース集合を選び、多パラメータ機能をケース爆発なく検証します。本記事はEC商品設定ページに沿い、パラメータ列挙・ペアワイズ集合導出・実行・Jira起票を行います。最後にクイズ付き。"),
      P("Kiểm thử pairwise là kỹ thuật cứu bạn khỏi 'biển tổ hợp'. Khi một trang có kích cỡ, màu, mã giảm giá, cách vận chuyển… số tổ hợp đủ lên tới hàng trăm, không thể thử hết. Pairwise chọn thông minh vài chục ca mà vẫn phủ mọi cặp — nơi phần lớn lỗi tương tác ẩn náu. Ở bài này ta bước vào trang cấu hình sản phẩm thật và làm như một tester đi làm. Bài có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "Pairwise testing saves you from a 'sea of combinations'. When a page has size, color, coupon, shipping… full combinations reach hundreds, impossible to try all. Pairwise smartly picks a couple dozen cases that still cover every pair — where most interaction bugs hide. Here we step into a real product-configuration page and work like a working tester. It has UI mockups, real examples and a final quiz.",
        "ペアワイズテストは『組合せの海』から救います。サイズ・色・クーポン・配送があると全組合せは数百に達し全部は試せません。ペアワイズは全ペアを網羅する数十ケースを賢く選びます。相互作用バグが潜む場所です。本記事は実際の商品設定ページに入り実務のように進めます。モック・実例・クイズ付き。"),
      IMG(a3_screen, "Màn hình test: cấu hình sản phẩm ShopVN (cỡ × màu × mã giảm giá × vận chuyển)", "Screen under test: ShopVN product config (size × color × coupon × shipping)", "テスト対象画面：ShopVN商品設定（サイズ×色×クーポン×配送）"),
      DEF("Pairwise (all-pairs)", "kỹ thuật chọn tập ca nhỏ sao cho mọi cặp giá trị của hai tham số bất kỳ đều được phủ.",
        "pairwise (all-pairs) — selecting a small case set so every value pair of any two parameters is covered.",
        "ペアワイズ（all-pairs）— 任意2パラメータの全値ペアを網羅する小さなケース集合を選ぶ技法。"),
    ] },
  { heading: { vi: "2. Vì sao tổ hợp đầy đủ là bất khả thi", en: "2. Why full combinations are infeasible", ja: "2. なぜ全組合せは非現実的か" },
    blocks: [
      P("Số tổ hợp đầy đủ bằng tích số giá trị của các tham số. Với 4 cỡ × 3 màu × 3 mã × 3 vận chuyển, ta có 108 ca chỉ cho một sản phẩm. Thêm một tham số nữa là con số nhân lên chóng mặt. Không đội nào đủ thời gian chạy tay hết.",
        "Full combinations equal the product of parameter value counts. With 4 sizes × 3 colors × 3 coupons × 3 shipping, that's 108 cases for one product. Add one parameter and the number multiplies dizzyingly. No team has time to run all by hand.",
        "全組合せはパラメータ値数の積です。4サイズ×3色×3クーポン×3配送で1商品108ケース。1パラメータ追加で目まぐるしく増えます。手動で全部回す時間はありません。"),
      IMG(a3_explode, "Tổ hợp đầy đủ 108 ca vs pairwise ~12–15 ca", "Full 108 combinations vs pairwise ~12–15 cases", "全108組合せ 対 ペアワイズ約12〜15ケース"),
      DEF("Bùng nổ tổ hợp (combinatorial explosion)", "hiện tượng số tổ hợp tăng theo cấp số nhân khi thêm tham số/giá trị.",
        "combinatorial explosion — the exponential growth of combinations as parameters/values are added.",
        "組合せ爆発 — パラメータ/値の追加で組合せが指数的に増える現象。"),
      P("Ý tưởng của pairwise dựa trên quan sát thực nghiệm: đa số lỗi phần mềm bắt nguồn từ một giá trị đơn, hoặc từ tương tác của đúng hai tham số. Rất ít lỗi cần ba tham số trở lên cùng lúc. Vì vậy, chỉ cần bảo đảm mọi cặp đều được thử, bạn đã bắt được phần lớn lỗi với chi phí nhỏ hơn nhiều.",
        "Pairwise's idea rests on an empirical observation: most software bugs stem from a single value, or from an interaction of exactly two parameters. Very few need three or more at once. So by ensuring every pair is tried, you catch most bugs at a far smaller cost.",
        "ペアワイズの発想は経験則に基づきます：多くのバグは単一値か、ちょうど2パラメータの相互作用に起因します。3つ以上同時が必要なものは稀です。全ペアを試せば、はるかに少ないコストで大半のバグを捉えます。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án TMĐT", en: "3. Why it matters on an e-commerce project", ja: "3. EC案件で重要な理由" },
    blocks: [
      P("Trang TMĐT đầy tham số: cấu hình sản phẩm, bộ lọc tìm kiếm, phương thức thanh toán, khuyến mãi, vận chuyển. Lỗi hay ẩn ở tương tác — ví dụ 'mã VIP kết hợp giao hoả tốc thì tính phí sai'. Một mình từng tham số chạy đúng, nhưng cặp lại sai. Đây là loại lỗi khó thấy nếu chỉ kiểm từng thứ riêng lẻ.",
        "E-commerce pages are full of parameters: product config, search filters, payment methods, promotions, shipping. Bugs often hide in interactions — e.g. 'VIP coupon combined with express shipping charges wrongly'. Each parameter works alone, but the pair fails. This is hard to spot when checking each thing separately.",
        "ECページはパラメータだらけです：商品設定・検索フィルタ・決済・販促・配送。バグは相互作用に潜みます — 例『VIPクーポン＋速達で料金誤り』。各パラメータ単独では正常でもペアで失敗します。個別確認では見つけにくいバグです。"),
      P("Với hàng nghìn sản phẩm và cấu hình, không thể test tay toàn bộ. Pairwise giúp đội phủ tương tác quan trọng trong ngân sách thời gian thực tế, đặc biệt trước các đợt khuyến mãi lớn khi nhiều tham số mới được bật cùng lúc.",
        "With thousands of products and configs, exhaustive manual testing is impossible. Pairwise lets the team cover important interactions within a realistic time budget, especially before big promotions when many new parameters go live at once.",
        "数千の商品と設定では網羅的な手動検証は不可能です。ペアワイズは現実的な時間内で重要な相互作用を網羅させます。特に多数の新パラメータが同時稼働する大型販促前に有効です。"),
      P("Một tester biết dùng pairwise cho thấy tư duy tối ưu: đạt độ phủ cao với ít ca nhất. Đây là kỹ năng được đánh giá cao vì nó trực tiếp tiết kiệm thời gian đội mà không hy sinh chất lượng ở những nơi quan trọng.",
        "A tester who uses pairwise shows optimization thinking: high coverage with the fewest cases. This is a highly valued skill because it directly saves team time without sacrificing quality where it matters.",
        "ペアワイズを使うテスターは最適化思考を示します：最少ケースで高網羅。重要箇所の品質を犠牲にせずチームの時間を直接節約するため高く評価されます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: liệt kê tham số & công cụ", en: "4. Prepare: list parameters & tools", ja: "4. 準備：パラメータ列挙とツール" },
    blocks: [
      P("Chuẩn bị cho pairwise là xác định đúng các tham số và tập giá trị của chúng. Sai bước này thì bộ ca sinh ra sẽ lệch.",
        "Preparing for pairwise means correctly identifying the parameters and their value sets. Get this wrong and the derived cases are off.",
        "ペアワイズの準備は、パラメータとその値集合を正しく特定することです。ここを誤るとケースがずれます。"),
      STEP(1, "Liệt kê tham số và các giá trị: Cỡ{S,M,L,XL}, Màu{Trắng,Đen,Xanh}, Mã{không,SALE10,VIP}, Vận chuyển{Thường,Nhanh,Hoả tốc}.", "List parameters and values: Size, Color, Coupon, Shipping with their value sets.", "パラメータと値を列挙：サイズ・色・クーポン・配送とその値集合。"),
      STEP(2, "Dùng công cụ sinh pairwise (PICT của Microsoft, hoặc bảng all-pairs) để tạo tập ca phủ mọi cặp.", "Use a pairwise generator (Microsoft PICT, or an all-pairs table) to create a set covering every pair.", "ペアワイズ生成ツール（Microsoft PICTやall-pairs表）で全ペア網羅の集合を作る。"),
      STEP(3, "Đưa bộ ca vào TestRail/Excel; chuẩn bị Jira để mở lỗi khi một cặp gây sai.", "Put the set into TestRail/Excel; ready Jira to file bugs when a pair fails.", "集合をTestRail/Excelへ；ペア失敗時のJira起票を準備。"),
      TRY("Liệt kê tham số và giá trị cho một bộ lọc tìm kiếm (danh mục, giá, đánh giá, tình trạng kho).", "List parameters and values for a search filter (category, price, rating, stock).", "検索フィルタのパラメータと値を列挙（カテゴリ・価格・評価・在庫）。"),
      PITFALL("Chọn thiếu giá trị của một tham số (quên cỡ XL) — bộ pairwise sẽ không phủ được cặp liên quan tới nó.", "Missing a value of a parameter (forgetting XL) — the pairwise set won't cover pairs involving it.", "パラメータの値を欠く（XLを忘れる）— それに関わるペアを網羅できません。"),
      IMG(a3_pw, "Bộ ca pairwise: 8–15 dòng phủ mọi cặp giá trị của các tham số", "The pairwise set: 8–15 rows covering every value pair of the parameters", "ペアワイズ集合：8〜15行で全値ペアを網羅"),
    ] },
  { heading: { vi: "5. Các bước sinh & chạy bộ ca pairwise", en: "5. Steps to derive & run the pairwise set", ja: "5. ペアワイズ集合の導出と実行手順" },
    blocks: [
      P("Bốn bước đưa bạn từ danh sách tham số tới bộ ca chạy được. Với người mới, dùng công cụ sinh sẽ nhanh và chính xác hơn tự ghép tay.",
        "Four steps take you from the parameter list to a runnable set. For beginners, a generator is faster and more accurate than hand-pairing.",
        "4ステップでパラメータ一覧から実行可能な集合へ。初心者は手作業より生成ツールが速く正確です。"),
      STEP(1, "Nhập tham số & giá trị vào công cụ (PICT) hoặc lập bảng all-pairs thủ công.", "Enter parameters & values into a tool (PICT) or build an all-pairs table by hand.", "パラメータと値をツール（PICT）に入力、または手動でall-pairs表を作成。"),
      STEP(2, "Sinh bộ ca; kiểm nhanh rằng mọi cặp quan trọng đều xuất hiện.", "Generate the set; quickly verify every important pair appears.", "集合を生成；重要ペアが全て現れるか素早く確認。"),
      STEP(3, "Bổ sung thủ công vài ca cho tổ hợp rủi ro cao (ví dụ VIP × mọi vận chuyển).", "Manually add a few cases for high-risk combinations (e.g. VIP × each shipping).", "高リスク組合せ（例：VIP×各配送）に手動でケースを数個追加。"),
      STEP(4, "Chạy từng ca trên giao diện, kiểm tổng tiền/khuyến mãi/phí, ghi Pass/Fail.", "Run each case on the UI, check total/discount/fee, record Pass/Fail.", "各ケースをUIで実行、合計/割引/料金を確認、合否を記録。"),
      CODE("text", "PICT input (ví dụ):\nCo:    S, M, L, XL\nMau:   Trang, Den, Xanh\nMa:    khong, SALE10, VIP\nVanChuyen: Thuong, Nhanh, HoaToc\n# Ràng buộc bổ sung cho ca rủi ro cao:\nIF [Ma] = \"VIP\" THEN kiểm phí ship = 0 với MỌI [VanChuyen];"),
      TRY("Tự thêm một ràng buộc: 'nếu Cỡ=XL thì giá +20.000₫' và nghĩ cặp nào cần kiểm.", "Add a constraint: 'if Size=XL then +20,000₫' and think which pairs to test.", "制約を追加：『サイズ=XLなら+20,000₫』、検証すべきペアを考えよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: một cặp giá trị gây lỗi tính phí", en: "6. Situation 1: a value pair breaks fee calculation", ja: "6. シーン1：ある値ペアが料金計算を壊す" },
    blocks: [
      SITUATION("Chạy ca pairwise #3 (M / Trắng / VIP / Hoả tốc), tổng tiền sai.", "Running pairwise case #3 (M / White / VIP / Express), the total is wrong.",
        "Khách VIP đáng lẽ được miễn phí vận chuyển mọi loại, nhưng khi chọn 'Hoả tốc' hệ thống vẫn cộng 30.000₫ phí. Từng tham số riêng đều đúng, chỉ cặp VIP×Hoả tốc sai.",
        "A VIP customer should get free shipping of any kind, but choosing 'Express' still adds a 30,000₫ fee. Each parameter alone is correct; only the VIP×Express pair fails.",
        "ペアワイズケース#3（M/白/VIP/速達）で合計が誤り。", "VIP顧客は全配送無料のはずが、『速達』選択時に30,000₫が加算されます。各単独は正しく、VIP×速達のペアだけ誤りです。"),
      SOLVE("Ghi rõ CẶP gây lỗi và cách phát hiện qua ca pairwise; nêu giá trị các tham số còn lại.", "Record the failing PAIR and how the pairwise case revealed it; note the other parameter values.", "失敗ペアとペアワイズで露見した経緯を記録；他パラメータ値も明記。"),
      P("Đây là lỗi tương tác điển hình mà pairwise sinh ra để bắt. Khi ghi nhận, điểm mấu chốt là chỉ đích danh cặp VIP×Hoả tốc, kèm giá trị các tham số còn lại của ca (cỡ, màu) để tái hiện chính xác. Nhờ đó lập trình viên biết ngay nhánh tính phí nào chưa xử lý miễn phí cho VIP.",
        "This is a classic interaction bug pairwise is built to catch. When recording, the key is naming the VIP×Express pair, plus the case's other parameter values (size, color) for exact reproduction. This tells developers immediately which fee branch doesn't waive for VIP.",
        "これはペアワイズが捉えるべき典型的な相互作用バグです。記録時の要点はVIP×速達のペアを名指しし、正確な再現のためケースの他パラメータ値（サイズ・色）も示すことです。どの料金分岐がVIP免除未対応か開発者に即伝わります。"),
      CODE("text", "PW-03  (M / Trắng / VIP / Hoả tốc)\nBước: 1) Chọn cỡ M, màu Trắng 2) Áp mã VIP 3) Chọn Hoả tốc 4) Xem tổng\nThực tế: tổng = 300.000 + 30.000 (phí hoả tốc) = 330.000 ₫\nMong đợi: VIP miễn phí ship -> tổng = 300.000 ₫\nCặp gây lỗi: Mã=VIP × Vận chuyển=Hoả tốc"),
      RECAP(["Pairwise bắt lỗi tương tác giữa hai tham số", "Báo lỗi phải chỉ đích danh CẶP gây lỗi"],
        ["Pairwise catches two-parameter interaction bugs", "Bug reports must name the failing PAIR"],
        ["ペアワイズは2パラメータ相互作用バグを捉える", "報告は失敗ペアを名指しする"]),
    ] },
  { heading: { vi: "7. Tình huống 2: bổ sung ca ngoài pairwise cho rủi ro cao", en: "7. Situation 2: adding cases beyond pairwise for high risk", ja: "7. シーン2：高リスク向けにペアワイズ外を追加" },
    blocks: [
      SITUATION("Đội lo ngại tổ hợp ba tham số 'VIP + Hoả tốc + đơn > 5 triệu' có ưu đãi đặc biệt.", "The team worries a three-parameter combo 'VIP + Express + order > 5M' has a special rule.",
        "Pairwise chỉ bảo đảm phủ cặp, không chắc phủ tổ hợp ba. Với quy tắc ưu đãi quan trọng, bạn cần bổ sung ca riêng.",
        "Pairwise only guarantees pair coverage, not triples. For an important promotion rule, you must add dedicated cases.",
        "チームは3パラメータ組合せ『VIP＋速達＋注文>500万』の特別ルールを懸念。", "ペアワイズはペア網羅のみで3つ組は保証しません。重要な販促ルールには個別ケースを追加します。"),
      SOLVE("Nhận diện tổ hợp ba tham số rủi ro cao và thêm ca riêng ngoài bộ pairwise.", "Identify high-risk three-parameter combos and add dedicated cases beyond the pairwise set.", "高リスクな3パラメータ組合せを特定しペアワイズ外に個別ケースを追加。"),
      P("Đây là lúc thể hiện tư duy cân bằng: pairwise xử lý phần lớn, nhưng bạn dùng đánh giá rủi ro để bổ sung ca cho những tổ hợp ba tham số quan trọng (thường liên quan tiền hoặc quy định). Không phải mọi tổ hợp ba đều cần — chỉ những cái có quy tắc riêng hoặc rủi ro cao.",
        "This is where balanced thinking shows: pairwise handles most, but you use risk judgment to add cases for important three-parameter combos (usually money- or policy-related). Not every triple needs it — only those with a dedicated rule or high risk.",
        "ここで均衡思考が示されます：ペアワイズが大半を担い、リスク判断で重要な3パラメータ組合せ（通常は金銭・方針関連）にケースを追加します。全3つ組が必要ではなく、個別ルールや高リスクのものだけです。"),
      IMG(a3_jira, "Ticket Jira nêu đích danh cặp VIP×Hoả tốc gây tính phí sai", "A Jira ticket naming the VIP×Express pair causing the fee bug", "料金バグを起こすVIP×速達ペアを名指ししたJiraチケット"),
      TRY("Chọn 1 tổ hợp ba tham số bạn cho là rủi ro cao trong giỏ hàng và giải thích vì sao nên thêm ca.", "Pick one high-risk three-parameter combo in a cart and explain why it deserves a case.", "カートで高リスクと思う3パラメータ組合せを1つ選び、ケース追加の理由を説明しよう。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report bộ ca pairwise", en: "8. Recording & the pairwise report file", ja: "8. ペアワイズの記録とレポート" },
    blocks: [
      P("Báo cáo pairwise nên cho thấy độ phủ (đã phủ bao nhiêu cặp), số ca đã chạy, và những cặp gây lỗi. Điều này chứng minh bạn đạt độ phủ cao với chi phí nhỏ.",
        "A pairwise report should show coverage (how many pairs covered), cases run, and failing pairs. This proves you reached high coverage at low cost.",
        "ペアワイズ報告は網羅（何ペア網羅か）・実行ケース数・失敗ペアを示すべきです。低コストで高網羅を達成した証明になります。"),
      STEP(1, "Ghi số ca pairwise, số cặp đã phủ, và các ca bổ sung cho rủi ro cao.", "Record pairwise case count, pairs covered, and extra high-risk cases.", "ペアワイズケース数・網羅ペア数・高リスク追加ケースを記録。"),
      STEP(2, "Liệt kê cặp gây lỗi kèm mã ticket để lập trình viên xử lý đúng nhánh.", "List failing pairs with ticket IDs so developers fix the right branch.", "失敗ペアをチケット番号付きで列挙し、正しい分岐を修正させる。"),
      CODE("text", "BÁO CÁO — Pairwise cấu hình sản phẩm ShopVN — Sprint 22\nNgười test: (bạn)  |  Môi trường: staging  |  Ngày: 08/07\nTham số: 4 (Cỡ, Màu, Mã, Vận chuyển) | Tổ hợp đủ: 108 | Pairwise: 12 ca (phủ 100% cặp)\nCa bổ sung (rủi ro cao): 3 (VIP × mỗi vận chuyển)\nKết quả: 15 ca | Pass 14 | Fail 1\nLỗi:  SHOP-4102  High  Cặp VIP × Hoả tốc tính phí sai\nKhuyến nghị: sửa nhánh miễn phí ship cho VIP; giữ 3 ca VIP×vận chuyển trong bộ hồi quy."),
      IMG(a3_exec, "Bảng thực thi bộ ca pairwise, chỉ rõ ca chứa cặp gây lỗi", "A pairwise execution sheet highlighting the case with the failing pair", "失敗ペアを含むケースを示すペアワイズ実行表"),
      TIP("Ghi rõ 'phủ 100% cặp với 12 ca thay vì 108' — con số này cho quản lý thấy hiệu quả của pairwise.", "State '100% pair coverage with 12 cases instead of 108' — this number shows managers pairwise's efficiency.", "『12ケースで全ペア網羅（108でなく）』と明記 — この数字が管理者にペアワイズの効率を示します。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng pairwise, người ta hay mắc vài lỗi giống nhau. Biết trước giúp bạn phủ đúng và không quá tự tin.",
        "When new to pairwise, people make a few common mistakes. Knowing them helps you cover correctly and not over-trust it.",
        "ペアワイズに不慣れだと共通の失敗をします。事前に知れば正しく網羅し過信を防げます。"),
      PITFALL("Coi pairwise là 'phủ hết mọi lỗi' — nó chỉ phủ cặp, có thể sót lỗi cần ba tham số cùng lúc.", "Treating pairwise as 'covers all bugs' — it only covers pairs and may miss three-parameter bugs.", "ペアワイズを『全バグ網羅』と誤解 — ペアのみで3パラメータバグを見逃すことがあります。"),
      PITFALL("Liệt kê thiếu giá trị hoặc thiếu ràng buộc — bộ ca sinh ra không phản ánh đúng nghiệp vụ.", "Missing values or constraints — the generated set doesn't reflect the real business.", "値や制約の欠落 — 生成集合が実際の業務を反映しません。"),
      TIP("Dùng công cụ sinh (PICT) cho phần lớn ca, rồi bổ sung thủ công vài tổ hợp rủi ro cao dựa trên đánh giá rủi ro.", "Use a generator (PICT) for most cases, then manually add a few high-risk combos based on risk judgment.", "生成ツール（PICT）で大半を作り、リスク判断で高リスク組合せを手動追加。"),
      IMG(a3_explode, "So sánh chi phí: tổ hợp đủ 108 ca vs pairwise ~12 ca", "Cost comparison: full 108 cases vs pairwise ~12 cases", "コスト比較：全108ケース 対 ペアワイズ約12ケース"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      a3_faq1.block, a3_faq2.block, a3_faq3.block,
      INTERNAL("Kỹ thuật bảng quyết định (Decision Table)", "Decision table technique", "bang-quyet-dinh-decision-table-cho-tester"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi"),
    ] },
  QUIZ(a3_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa dùng pairwise để kiểm cấu hình sản phẩm TMĐT: liệt kê tham số, sinh bộ ca phủ mọi cặp, bổ sung ca rủi ro cao, phát hiện lỗi tương tác của một cặp, rồi ghi nhận kèm độ phủ. Đây là kỹ năng tối ưu độ phủ trên chi phí — rất giá trị ở dự án lớn.",
        "You just used pairwise to test e-commerce product configuration: listed parameters, derived a set covering every pair, added high-risk cases, found a pair's interaction bug, then recorded with coverage. This is the skill of optimizing coverage per cost — highly valuable on big projects.",
        "ペアワイズでEC商品設定を検証しました：パラメータ列挙・全ペア網羅集合導出・高リスク追加・ペアの相互作用バグ発見・網羅付き記録。コスト当たり網羅を最適化するスキルで、大規模案件で高価値です。"),
      P("Chặng tiếp theo là kiểm thử thăm dò có cấu trúc (exploratory với charter) và kiểm thử tích hợp giữa các module. Nếu muốn luyện các kỹ thuật này trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is structured exploratory testing (with charters) and integration testing between modules. If you want to practice these on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "次は構造化された探索的テスト（チャーター付き）とモジュール間の統合テストです。指導付きで企業を模した案件で練習したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ADV3 = makeDoc({
  slug: "kiem-thu-pairwise-ket-hop-cho-tester",
  domain: "ecommerce",
  level: "intermediate",
  primaryKeyword: "kiểm thử pairwise",
  keywords: ["kiểm thử pairwise", "pairwise testing", "all-pairs testing", "kiểm thử kết hợp"],
  coverLabel: "TRUNG CẤP · PAIRWISE · TMĐT",
  crumb: "Kiểm thử pairwise (kết hợp)",
  metaTitle: { vi: "Kiểm thử pairwise (kết hợp) cho tester", en: "Pairwise (all-pairs) testing for testers", ja: "ペアワイズ（組合せ）テスト" },
  metaDescription: {
    vi: "Kiểm thử pairwise cho tester trên dự án TMĐT: bùng nổ tổ hợp, phủ mọi cặp giá trị, dùng PICT, kịch bản lỗi tương tác cặp tham số, mockup giao diện và trắc nghiệm.",
    en: "Pairwise testing for testers on an e-commerce project: combinatorial explosion, covering every value pair, using PICT, a pair interaction bug, UI mockups and a quiz.",
    ja: "テスター向けペアワイズテストをEC案件で：組合せ爆発・全値ペア網羅・PICT・ペア相互作用バグ・モック・クイズ。",
  },
  title: {
    vi: "Kiểm thử pairwise (kết hợp): giảm ca cho cấu hình sản phẩm TMĐT (có trắc nghiệm)",
    en: "Pairwise testing: cutting cases for e-commerce product configuration (with quiz)",
    ja: "ペアワイズテスト：EC商品設定のケース削減（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: dùng pairwise để kiểm cấu hình sản phẩm TMĐT nhiều tham số. Bùng nổ tổ hợp, phủ mọi cặp giá trị, dùng công cụ PICT, bổ sung ca rủi ro cao, hai tình huống (lỗi cặp VIP×Hoả tốc, thêm ca ngoài pairwise), ghi nhận kèm độ phủ, mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: using pairwise to test a multi-parameter e-commerce product configuration. Combinatorial explosion, covering every value pair, PICT, high-risk extra cases, two situations (a VIP×Express pair bug, adding cases beyond pairwise), recording with coverage, UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：多パラメータのEC商品設定をペアワイズで検証。組合せ爆発・全値ペア網羅・PICT・高リスク追加・2シーン・網羅付き記録・モック・FAQ・クイズ。",
  },
  faqs: [a3_faq1, a3_faq2, a3_faq3],
  howTo: { name: "Cách kiểm thử pairwise cho chức năng nhiều tham số", steps: [
    { name: "Liệt kê tham số & giá trị", text: "Xác định đúng các tham số và tập giá trị của chúng." },
    { name: "Sinh bộ ca phủ mọi cặp", text: "Dùng PICT hoặc bảng all-pairs; kiểm mọi cặp đều xuất hiện." },
    { name: "Bổ sung ca rủi ro cao & chạy", text: "Thêm ca cho tổ hợp ba tham số quan trọng, chạy và ghi Pass/Fail." },
  ] },
  pages: a3_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 4 — Kiểm thử thăm dò có cấu trúc (Exploratory + charter/SBTM) · SaaS CRM
// ══════════════════════════════════════════════════════════════════════════════════════
const a4_screen = browser("app.crmpro.vn/pipeline", [
  `<text x="24" y="24" font-size="12" font-weight="800" fill="#334155">Pipeline bán hàng · Quý 3</text>`,
  ...["Tiềm năng", "Báo giá", "Đàm phán", "Chốt deal"].map((s, i) => {
    const x = 24 + i * 178;
    return `<rect x="${x}" y="36" width="166" height="24" rx="6" fill="#eef2f7"/><text x="${x + 10}" y="53" font-size="11" font-weight="700" fill="#334155">${s} · ${[12, 8, 5, 3][i]}</text>` +
      `<rect x="${x}" y="66" width="166" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0"/><rect x="${x}" y="66" width="4" height="42" rx="2" fill="#1a72f5"/>` +
      `<text x="${x + 12}" y="84" font-size="10.5" font-weight="700" fill="#5e6c84">DEAL-${100 + i}</text><text x="${x + 12}" y="99" font-size="10.5" fill="#172b4d">Cty ABC — ${[50, 120, 300, 80][i]}tr</text>`;
  }),
  btn(24, 128, 150, "+ Tạo cơ hội", "primary"), btn(190, 128, 130, "Lọc & tìm", "ghost"),
].join(""), { h: 232, title: "CRM Pro · Pipeline", accent: "#0f766e" });

const a4_charter = charter({
  title: "Chuyển giai đoạn deal & phân quyền", target: "Kiểm luồng kéo-thả deal giữa các cột pipeline",
  area: "Module Bán hàng · Pipeline · Quyền chỉnh sửa", duration: "60 phút (SBTM)",
  ideas: [
    "Kéo deal ngược từ 'Chốt' về 'Tiềm năng' — có được phép?",
    "Nhân viên A sửa deal của nhân viên B — phân quyền đúng?",
    "Kéo-thả nhanh nhiều deal liên tục — dữ liệu có nhất quán?",
    "Deal giá trị lớn có yêu cầu phê duyệt trước khi 'Chốt'?",
    "Đổi giai đoạn khi mất mạng giữa chừng — trạng thái ra sao?",
  ],
});

const a4_findings = grid("Sổ ghi phiên thăm dò (session sheet)", ["Thời điểm", "Phát hiện", "Mức", "Ticket"], [
  ["10:08", "Kéo deal về giai đoạn cũ không ghi lịch sử thay đổi", "Medium", "CRM-5501"],
  ["10:21", "NV A sửa được deal của NV B (rò rỉ phân quyền)", "High", "CRM-5502"],
  ["10:35", "Kéo-thả nhanh 5 deal → 1 deal mất người phụ trách", "High", "CRM-5503"],
  ["10:50", "Tooltip giai đoạn hiển thị sai tiếng Việt", "Low", "CRM-5504"],
], { accent: "#0f766e", highlight: 1, note: "Ghi liên tục theo dòng thời gian; mỗi phát hiện gắn mức độ & ticket." });

const a4_jira = jira({
  key: "CRM-5502", title: "Rò rỉ phân quyền: nhân viên sửa được cơ hội (deal) của người khác",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical", color: "#bf2600",
  fields: [
    ["Môi trường", "staging · CRM Pro · tài khoản NV A (sales)"],
    ["Phát hiện qua", "Phiên exploratory charter #7 (10:21)"],
    ["Thực tế", "NV A mở & sửa DEAL-220 của NV B"],
    ["Mong đợi", "Chỉ chủ sở hữu hoặc quản lý mới sửa được"],
    ["Rủi ro", "Sửa/đánh cắp cơ hội, sai số liệu doanh số"],
  ],
});

const a4_dash = dashboard("Kết quả phiên thăm dò — Sprint 14", [
  { label: "Phiên (charter)", value: "3", sub: "60' mỗi phiên", color: "#0f766e" },
  { label: "Lỗi phát hiện", value: "9", sub: "2 High · 1 Critical", color: "#ef4444" },
  { label: "Khu vực phủ", value: "5/6", sub: "Pipeline, quyền, tìm kiếm…", color: "#1a72f5" },
  { label: "Cần đào sâu", value: "2", sub: "phân quyền, đồng bộ", color: "#a16207" },
]);

const a4_faq1 = FAQ(
  "Kiểm thử thăm dò (exploratory testing) là gì?", "What is exploratory testing?",
  "Là cách kiểm thử trong đó việc thiết kế ca, thực thi và học hỏi diễn ra ĐỒNG THỜI: bạn vừa dùng sản phẩm vừa suy nghĩ và điều chỉnh hướng kiểm dựa trên những gì quan sát được. Nó bổ sung cho kiểm thử theo kịch bản, đặc biệt mạnh khi tìm lỗi bất ngờ.",
  "It's testing where designing, executing and learning happen SIMULTANEOUSLY: you use the product while thinking and adjusting your testing direction based on what you observe. It complements scripted testing, especially strong at finding unexpected bugs.",
  "探索的テストとは？",
  "設計・実行・学習が同時に起こる検証です：製品を使いながら考え、観察に基づき検証方向を調整します。スクリプトテストを補完し、予期せぬバグ発見に特に強いです。");
const a4_faq2 = FAQ(
  "Charter và SBTM là gì?", "What are charters and SBTM?",
  "SBTM (Session-Based Test Management) là cách tổ chức thăm dò thành các phiên có thời lượng (thường 60–90 phút), mỗi phiên theo một 'charter' — một câu mô tả mục tiêu khám phá. Charter giúp thăm dò có định hướng và có thể báo cáo được, thay vì bấm loạn.",
  "SBTM (Session-Based Test Management) organizes exploration into timeboxed sessions (usually 60–90 minutes), each following a 'charter' — a sentence describing the exploration goal. Charters make exploration focused and reportable, rather than random clicking.",
  "チャーターとSBTMとは？",
  "SBTM（セッションベーステスト管理）は探索を時間区切りのセッション（通常60〜90分）に整理し、各セッションが探索目標を記す『チャーター』に従います。チャーターは探索を方向付け報告可能にします。");
const a4_faq3 = FAQ(
  "Làm sao ghi nhận khi thăm dò để không quên?", "How to record during exploration so nothing is lost?",
  "Ghi 'session sheet' theo dòng thời gian: mốc giờ, phát hiện, ý tưởng test mới nảy ra, và câu hỏi cần làm rõ. Mỗi lỗi gắn mức độ và mở ticket ngay. Cuối phiên tóm tắt khu vực đã phủ và phần cần đào sâu ở phiên sau.",
  "Keep a time-ordered 'session sheet': timestamps, findings, new test ideas that arise, and questions to clarify. Attach severity to each bug and file a ticket immediately. At session end, summarize covered areas and what needs deeper testing next.",
  "探索中に忘れないよう記録するには？",
  "時系列の『セッションシート』を付けます：時刻・発見・浮かんだテストアイデア・確認事項。各バグに深刻度を付け即起票。終了時に網羅領域と次に深掘りすべき点を要約します。");

const a4_quiz = [
  mcq({
    q: { vi: "Đặc trưng cốt lõi của kiểm thử thăm dò là gì?", en: "What's the core trait of exploratory testing?", ja: "探索的テストの核心的特徴は？" },
    options: [
      { vi: "Viết hết test case trước rồi mới chạy", en: "Write all cases first, then run", ja: "先に全ケースを書いてから実行" },
      { vi: "Thiết kế, thực thi và học hỏi diễn ra đồng thời", en: "Design, execution and learning happen at once", ja: "設計・実行・学習が同時進行" },
      { vi: "Không cần suy nghĩ", en: "No thinking needed", ja: "思考不要" },
      { vi: "Chỉ chạy tự động", en: "Only automated runs", ja: "自動実行のみ" },
    ], correct: 1,
    explain: { vi: "Thăm dò là học và điều chỉnh hướng kiểm ngay trong lúc thực thi.", en: "Exploration means learning and adjusting direction while executing.", ja: "探索は実行しながら学び方向を調整することです。" },
  }),
  mcq({
    q: { vi: "Charter trong SBTM là gì?", en: "What is a charter in SBTM?", ja: "SBTMのチャーターとは？" },
    options: [
      { vi: "Một câu mô tả mục tiêu khám phá của phiên", en: "A sentence describing the session's exploration goal", ja: "セッションの探索目標を記す一文" },
      { vi: "Một loại hợp đồng pháp lý", en: "A legal contract", ja: "法的契約" },
      { vi: "Tên máy chủ", en: "A server name", ja: "サーバー名" },
      { vi: "Một lỗi", en: "A bug", ja: "バグ" },
    ], correct: 0,
    explain: { vi: "Charter định hướng phiên thăm dò và giúp nó báo cáo được.", en: "A charter focuses the session and makes it reportable.", ja: "チャーターはセッションを方向付け報告可能にします。" },
  }),
  mcq({
    q: { vi: "Vì sao nên ghi 'session sheet' theo dòng thời gian?", en: "Why keep a time-ordered session sheet?", ja: "なぜ時系列のセッションシートを付ける？" },
    options: [
      { vi: "Để không quên phát hiện & ý tưởng, và báo cáo được", en: "To not forget findings & ideas, and to make it reportable", ja: "発見やアイデアを忘れず報告可能にするため" },
      { vi: "Để trang trí", en: "For decoration", ja: "装飾のため" },
      { vi: "Vì máy yêu cầu", en: "The machine requires it", ja: "機械が要求するから" },
      { vi: "Không cần thiết", en: "It's unnecessary", ja: "不要" },
    ], correct: 0,
    explain: { vi: "Thăm dò dễ 'trôi'; ghi theo thời gian giữ lại phát hiện và cho phép tổng kết.", en: "Exploration can drift; time-ordered notes retain findings and enable a summary.", ja: "探索は流れやすく、時系列記録が発見を保持し要約を可能にします。" },
  }),
  mcq({
    q: { vi: "Trong phiên thăm dò, bạn thấy NV A sửa được deal của NV B. Nên làm gì?", en: "During exploration you see employee A can edit B's deal. What to do?", ja: "探索中、社員AがBのdealを編集できると判明。どうする？" },
    options: [
      { vi: "Bỏ qua vì ngoài charter", en: "Ignore it, it's outside the charter", ja: "チャーター外なので無視" },
      { vi: "Ghi vào session sheet, đánh mức High/Critical và mở ticket ngay", en: "Record it, mark High/Critical and file a ticket at once", ja: "記録しHigh/Criticalとして即起票" },
      { vi: "Đợi hết sprint mới báo", en: "Wait until sprint end to report", ja: "スプリント末まで待つ" },
      { vi: "Tự sửa code", en: "Fix the code yourself", ja: "自分でコード修正" },
    ], correct: 1,
    explain: { vi: "Rò rỉ phân quyền là lỗi nghiêm trọng; ghi nhận & mở ticket ngay dù nằm ngoài charter ban đầu.", en: "A permission leak is serious; record and file immediately even if outside the initial charter.", ja: "権限漏れは重大で、初期チャーター外でも即記録・起票します。" },
  }),
];

const a4_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử thăm dò có cấu trúc giúp bạn tìm lỗi bất ngờ một cách có định hướng và báo cáo được, nhờ charter và session sheet. Bài này gắn với một hệ CRM SaaS: bạn viết charter, thăm dò theo phiên, ghi phát hiện và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "Structured exploratory testing helps you find unexpected bugs in a focused, reportable way, using charters and session sheets. This ties to a SaaS CRM: you write a charter, explore by session, record findings and file Jira bugs. A quiz at the end.",
        "構造化された探索的テストは、チャーターとセッションシートで予期せぬバグを方向性を持って報告可能に発見します。本記事はSaaS CRMに沿い、チャーター作成・セッション探索・発見記録・Jira起票を行います。最後にクイズ付き。"),
      P("Kiểm thử thăm dò là lúc bạn dùng đầu óc và sự tò mò của con người để tìm những lỗi mà test case viết sẵn không ngờ tới. Nhưng thăm dò không phải 'bấm loạn' — bạn dùng charter để định hướng và session sheet để ghi lại. Ở bài này ta bước vào một hệ CRM thật và thăm dò như một tester chuyên nghiệp. Bài có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "Exploratory testing is where you use human insight and curiosity to find bugs that pre-written cases never anticipated. But exploration isn't 'random clicking' — you use a charter to focus and a session sheet to record. Here we step into a real CRM and explore like a professional tester. It has UI mockups, real examples and a final quiz.",
        "探索的テストは、人間の洞察と好奇心で、既成ケースが想定しないバグを見つける場です。しかし探索は『適当なクリック』ではなく、チャーターで方向付けセッションシートで記録します。本記事は実際のCRMに入りプロのように探索します。モック・実例・クイズ付き。"),
      IMG(a4_screen, "Màn hình test: pipeline bán hàng của hệ CRM Pro (kéo-thả deal giữa các giai đoạn)", "Screen under test: the CRM Pro sales pipeline (drag deals across stages)", "テスト対象画面：CRM Proの営業パイプライン（deal を段階間でドラッグ）"),
      DEF("Kiểm thử thăm dò", "cách kiểm thử mà thiết kế, thực thi và học hỏi diễn ra đồng thời, có định hướng bằng charter.",
        "exploratory testing — where design, execution and learning happen at once, focused by a charter.",
        "探索的テスト — 設計・実行・学習が同時に起こり、チャーターで方向付けられる検証。"),
    ] },
  { heading: { vi: "2. Charter & session sheet trông như thế nào", en: "2. What a charter & session sheet look like", ja: "2. チャーターとセッションシートの見た目" },
    blocks: [
      P("Charter là 'la bàn' của phiên thăm dò: một câu nêu bạn sẽ khám phá gì và ở khu vực nào. Ví dụ 'Khám phá luồng kéo-thả deal giữa các giai đoạn và quyền chỉnh sửa'. Nó đủ rộng để bạn tự do khám phá, nhưng đủ hẹp để không lạc.",
        "A charter is the compass of an exploration session: one sentence stating what you'll explore and in which area. E.g. 'Explore drag-drop of deals across stages and edit permissions'. It's broad enough for freedom, narrow enough to stay on track.",
        "チャーターは探索セッションの羅針盤です：何をどの領域で探索するかを1文で述べます。例『段階間のdealドラッグと編集権限を探索』。自由なほど広く、逸れないほど狭いです。"),
      IMG(a4_charter, "Một charter kèm danh sách ý tưởng test cho phiên thăm dò CRM", "A charter with a list of test ideas for a CRM exploration session", "CRM探索セッション用のテストアイデア付きチャーター"),
      DEF("Session sheet", "sổ ghi theo dòng thời gian: phát hiện, ý tưởng test mới, câu hỏi và mức độ lỗi trong phiên.",
        "a session sheet — a time-ordered log of findings, new test ideas, questions and bug severities during the session.",
        "セッションシート — セッション中の発見・新アイデア・疑問・深刻度を時系列で記す記録。"),
      P("Session sheet biến thăm dò 'vô hình' thành tài liệu có thể báo cáo. Nhờ nó, quản lý biết bạn đã phủ khu vực nào, tìm ra lỗi gì, và phần nào cần đào sâu — điều mà một buổi 'bấm thử' không có kỷ luật sẽ không cung cấp được.",
        "A session sheet turns 'invisible' exploration into reportable documentation. With it, managers know which areas you covered, what bugs you found, and what needs deeper testing — something an undisciplined 'poke around' session cannot provide.",
        "セッションシートは『見えない』探索を報告可能な文書に変えます。管理者は網羅領域・発見バグ・深掘りすべき点を把握でき、無規律な『触ってみる』では得られません。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án SaaS", en: "3. Why it matters on a SaaS project", ja: "3. SaaS案件で重要な理由" },
    blocks: [
      P("Sản phẩm SaaS như CRM thay đổi liên tục và có vô số luồng người dùng thật khó bao phủ hết bằng test case viết sẵn. Thăm dò giúp bắt những lỗi 'ngóc ngách' — phân quyền rò rỉ, dữ liệu không nhất quán khi thao tác nhanh, hành vi lạ khi mất mạng — những thứ mà kịch bản cố định thường bỏ qua.",
        "A SaaS product like a CRM changes constantly and has countless real user flows hard to cover with pre-written cases. Exploration catches 'corner' bugs — permission leaks, data inconsistency under fast actions, odd behavior on network loss — things fixed scripts often miss.",
        "CRMのようなSaaSは常に変化し、既成ケースで網羅困難な無数の利用フローを持ちます。探索は『隅』のバグ（権限漏れ・高速操作時の不整合・回線切断時の異常）を捉え、固定スクリプトが見逃すものを見つけます。"),
      P("Với SaaS, phân quyền đặc biệt quan trọng vì nhiều công ty dùng chung nền tảng: một nhân viên thấy hoặc sửa được dữ liệu của người/khách hàng khác là sự cố nghiêm trọng về bảo mật và niềm tin. Thăm dò có charter tập trung vào phân quyền là cách hiệu quả để phát hiện sớm.",
        "For SaaS, permissions are especially important because many companies share the platform: one employee seeing or editing another's data is a serious security and trust incident. Charters focused on permissions are an effective way to catch this early.",
        "SaaSでは多社が基盤を共有するため権限が特に重要です。ある社員が他者/顧客のデータを閲覧・編集できるのは重大なセキュリティと信頼の事故です。権限に焦点を当てたチャーターが早期発見に有効です。"),
      P("Một tester giỏi thăm dò được đánh giá cao vì tìm ra lớp lỗi mà tự động hoá khó chạm tới. Đây là kỹ năng 'con người' bổ sung hoàn hảo cho kiểm thử có kịch bản và automation.",
        "A tester skilled at exploration is valued for finding a bug class automation struggles to reach. It's a 'human' skill that perfectly complements scripted testing and automation.",
        "探索に長けたテスターは、自動化が届きにくいバグ種を見つけるため高く評価されます。スクリプトテストと自動化を完璧に補完する『人間』のスキルです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: viết charter & công cụ", en: "4. Prepare: write charters & tools", ja: "4. 準備：チャーター作成とツール" },
    blocks: [
      P("Chuẩn bị cho thăm dò là biến vùng cần khám phá thành vài charter rõ ràng và có nơi ghi chép sẵn sàng.",
        "Preparing for exploration means turning the area to explore into a few clear charters and having a place to record ready.",
        "探索の準備は、探索領域を明確なチャーター数個にし、記録場所を用意することです。"),
      STEP(1, "Chọn khu vực & viết charter: 'Khám phá <mục tiêu> ở <khu vực> nhằm tìm <rủi ro>'.", "Pick an area & write a charter: 'Explore <goal> in <area> to find <risk>'.", "領域を選びチャーターを書く：『<領域>で<目標>を探索し<リスク>を発見』。"),
      STEP(2, "Đặt timebox (60–90') và mở session sheet (Excel/Confluence) để ghi theo giờ.", "Set a timebox (60–90') and open a session sheet (Excel/Confluence) to log by time.", "タイムボックス（60〜90分）を設定しセッションシート（Excel/Confluence）を開く。"),
      STEP(3, "Chuẩn bị Jira để mở lỗi ngay khi phát hiện, không đợi hết phiên.", "Ready Jira to file bugs the moment you find them, not at session end.", "発見時に即起票できるようJiraを準備、終了を待たない。"),
      TRY("Viết một charter cho việc khám phá chức năng tìm kiếm khách hàng trong CRM (mục tiêu & rủi ro).", "Write a charter to explore the CRM customer search (goal & risk).", "CRMの顧客検索を探索するチャーターを書こう（目標とリスク）。"),
      PITFALL("Thăm dò không charter, không ghi chép — tìm được lỗi nhưng không tái hiện được và không báo cáo được.", "Exploring without a charter or notes — you find bugs but can't reproduce or report them.", "チャーターも記録もなく探索 — バグを見つけても再現・報告できません。"),
      IMG(a4_findings, "Sổ ghi phiên thăm dò theo dòng thời gian: phát hiện, mức độ, ticket", "A time-ordered session sheet: findings, severity, tickets", "時系列のセッションシート：発見・深刻度・チケット"),
    ] },
  { heading: { vi: "5. Các bước một phiên thăm dò có kỷ luật", en: "5. Steps of a disciplined exploration session", ja: "5. 規律ある探索セッションの手順" },
    blocks: [
      P("Một phiên thăm dò tốt có nhịp riêng: bắt đầu bằng charter, khám phá theo ý tưởng, ghi liên tục, và tổng kết. Bốn bước sau giúp bạn giữ kỷ luật mà vẫn sáng tạo.",
        "A good exploration session has its own rhythm: start with a charter, explore by ideas, record continuously, and debrief. These four steps keep you disciplined yet creative.",
        "良い探索セッションには独自のリズムがあります：チャーターで始め、アイデアで探索し、継続記録し、振り返る。次の4ステップで規律と創造性を両立します。"),
      STEP(1, "Mở phiên: đọc charter, liệt kê nhanh 4–6 ý tưởng test ban đầu.", "Open the session: read the charter, quickly list 4–6 initial test ideas.", "セッション開始：チャーターを読み、初期テストアイデアを4〜6個列挙。"),
      STEP(2, "Khám phá: thử từng ý tưởng, quan sát, và bám theo bất thường thay vì bỏ qua.", "Explore: try each idea, observe, and follow anomalies instead of ignoring them.", "探索：各アイデアを試し観察、異常を無視せず追う。"),
      STEP(3, "Ghi liên tục vào session sheet: mốc giờ, phát hiện, ý tưởng mới, câu hỏi.", "Record continuously in the session sheet: timestamps, findings, new ideas, questions.", "セッションシートに継続記録：時刻・発見・新アイデア・疑問。"),
      STEP(4, "Kết phiên: mở ticket cho lỗi, tổng kết khu vực đã phủ và phần cần đào sâu.", "Debrief: file tickets for bugs, summarize covered areas and what needs deeper testing.", "振り返り：バグを起票、網羅領域と深掘り点を要約。"),
      CODE("text", "SESSION SHEET — Charter: Kéo-thả deal & phân quyền — 60'\n10:00  Bắt đầu. Ý tưởng: kéo ngược giai đoạn, sửa deal người khác, kéo nhanh nhiều deal.\n10:08  [FOUND] Kéo về giai đoạn cũ không ghi lịch sử  -> CRM-5501 (Medium)\n10:21  [FOUND] NV A sửa deal của NV B (phân quyền!)   -> CRM-5502 (Critical)\n10:35  [FOUND] Kéo nhanh 5 deal -> 1 deal mất phụ trách -> CRM-5503 (High)\n10:55  Kết phiên. Phủ: pipeline, quyền. Cần đào sâu: đồng bộ khi thao tác nhanh."),
      TRY("Trong 5 phút, tự thăm dò một app bạn hay dùng theo charter 'tìm lỗi ở luồng đăng xuất' và ghi 2 phát hiện.", "For 5 minutes, explore an app you use under the charter 'find bugs in the logout flow' and log 2 findings.", "5分間、『ログアウトのバグ探索』チャーターで使うアプリを探索し発見を2つ記録しよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: bắt lỗi phân quyền ngoài dự kiến", en: "6. Situation 1: catching an unexpected permission bug", ja: "6. シーン1：想定外の権限バグを捉える" },
    blocks: [
      SITUATION("Đang thăm dò luồng kéo-thả, bạn tò mò thử mở deal của đồng nghiệp.", "While exploring drag-drop, you curiously try opening a colleague's deal.",
        "Charter ban đầu là về kéo-thả, nhưng bạn nhận ra mình mở và sửa được deal của nhân viên khác — một lỗ hổng phân quyền nghiêm trọng.",
        "The initial charter was about drag-drop, but you realize you can open and edit another employee's deal — a serious permission leak.",
        "ドラッグ探索中、好奇心で同僚のdealを開こうとする。", "初期チャーターはドラッグでしたが、他社員のdealを開き編集できると気づきます — 重大な権限漏れです。"),
      SOLVE("Bám theo bất thường ngay cả khi ngoài charter; ghi vào session sheet và mở ticket Critical.", "Follow the anomaly even outside the charter; log it and file a Critical ticket.", "チャーター外でも異常を追い、記録しCriticalで起票。"),
      P("Đây là giá trị đặc trưng của thăm dò: sự tò mò dẫn bạn tới một lỗi mà không kịch bản nào viết sẵn. Nguyên tắc là 'bám theo mùi lỗi' — khi thấy điều bất thường, tạm gác charter để đào sâu, ghi lại rồi quay lại. Lỗi phân quyền như thế này cực kỳ nghiêm trọng ở SaaS nên bạn mở ticket Critical ngay.",
        "This is exploration's signature value: curiosity leads you to a bug no script anticipated. The principle is 'follow the bug scent' — when you see something odd, pause the charter to dig in, record it, then return. A permission leak like this is critical in SaaS, so you file a Critical ticket at once.",
        "これが探索の特徴的価値です：好奇心がスクリプト未想定のバグへ導きます。原則は『バグの匂いを追う』— 異常を見たらチャーターを一時中断し深掘り、記録して戻ります。SaaSでこの権限漏れは重大なので即Critical起票します。"),
      IMG(a4_jira, "Ticket Critical: rò rỉ phân quyền phát hiện trong phiên thăm dò", "A Critical ticket: a permission leak found during exploration", "重大チケット：探索中に発見した権限漏れ"),
      RECAP(["Bám theo bất thường dù ngoài charter", "Lỗi phân quyền ở SaaS = Critical, mở ticket ngay"],
        ["Follow anomalies even outside the charter", "SaaS permission leak = Critical, file at once"],
        ["チャーター外でも異常を追う", "SaaSの権限漏れ=Critical、即起票"]),
    ] },
  { heading: { vi: "7. Tình huống 2: dữ liệu lệch khi thao tác nhanh", en: "7. Situation 2: data drift under fast actions", ja: "7. シーン2：高速操作時のデータずれ" },
    blocks: [
      SITUATION("Bạn kéo-thả nhiều deal thật nhanh liên tiếp giữa các giai đoạn.", "You drag-drop many deals in quick succession across stages.",
        "Sau khi kéo 5 deal liền tay, một deal bị mất người phụ trách và tổng giá trị pipeline hiển thị lệch.",
        "After dragging 5 deals in a row, one deal loses its owner and the pipeline total shows incorrectly.",
        "複数のdealを段階間で素早く連続ドラッグする。", "5件連続ドラッグ後、1件のdealが担当者を失い、パイプライン合計が誤表示されます。"),
      SOLVE("Ghi rõ điều kiện tái hiện (thao tác nhanh liên tiếp) và hệ quả dữ liệu; mở ticket High.", "Record the reproduction condition (fast successive actions) and data effect; file a High ticket.", "再現条件（高速連続操作）とデータ影響を記録；Highで起票。"),
      P("Lỗi đồng bộ khi thao tác nhanh là loại điển hình mà thăm dò dễ bắt còn kịch bản chậm rãi thì bỏ lỡ. Điểm mấu chốt khi ghi nhận là mô tả 'nhịp' thao tác (nhanh, liên tiếp, không chờ tải xong) vì đó chính là điều kiện gây lỗi. Kèm ảnh trước–sau cho thấy dữ liệu lệch.",
        "Sync bugs under fast actions are typical of what exploration catches while slow scripts miss. The key when recording is describing the action 'tempo' (fast, successive, without waiting for load) because that's the trigger. Attach before–after images showing the drift.",
        "高速操作時の同期バグは、探索が捉え遅いスクリプトが見逃す典型です。記録の要点は操作の『テンポ』（高速・連続・読込待ちなし）を記すことです。それが誘因だからです。ずれを示す前後画像を添付します。"),
      CODE("text", "CRM-5503  High  Kéo-thả nhanh nhiều deal -> 1 deal mất người phụ trách\nMôi trường: staging · CRM Pro · Chrome 126\nĐiều kiện: kéo 5 deal liên tiếp trong ~3s, không chờ giao diện tải xong mỗi lần\nThực tế: DEAL-142 mất trường 'Người phụ trách'; tổng pipeline lệch 120tr\nMong đợi: mọi deal giữ nguyên dữ liệu; tổng đúng sau khi tải lại\nGhi chú: khó tái hiện nếu thao tác chậm -> nêu rõ 'nhịp nhanh' là điều kiện."),
      TRY("Nghĩ 2 điều kiện 'nhịp' khác dễ gây lỗi đồng bộ (gợi ý: bấm hai lần, mạng chập chờn).", "Think of 2 other 'tempo' conditions that cause sync bugs (hint: double-click, flaky network).", "同期バグを誘発する他の『テンポ』条件を2つ考えよう（ヒント：二度押し・不安定回線）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report phiên thăm dò", en: "8. Recording & the session report file", ja: "8. セッションの記録とレポート" },
    blocks: [
      P("Báo cáo thăm dò khác báo cáo kịch bản: bạn tổng hợp theo PHIÊN — mỗi phiên phủ khu vực nào, tìm được gì, và phần nào cần đào sâu tiếp. Nhờ đó thăm dò trở nên minh bạch và có thể lập kế hoạch.",
        "An exploration report differs from a scripted one: you summarize by SESSION — which areas each covered, what was found, and what needs deeper testing. This makes exploration transparent and plannable.",
        "探索の報告はスクリプト報告と異なり、セッション単位で要約します — 各セッションの網羅領域・発見・深掘り点。探索が透明で計画可能になります。"),
      STEP(1, "Tổng hợp mỗi phiên: charter, thời lượng, khu vực phủ, số lỗi theo mức độ.", "Summarize each session: charter, duration, areas covered, bug counts by severity.", "各セッションを要約：チャーター・時間・網羅領域・深刻度別バグ数。"),
      STEP(2, "Nêu phần 'cần đào sâu' để lập charter cho phiên/sprint sau.", "Note 'needs deeper testing' to plan charters for the next session/sprint.", "『深掘り必要』を明記し次セッション/スプリントのチャーターを計画。"),
      CODE("text", "BÁO CÁO THĂM DÒ — CRM Pro — Sprint 14\nNgười test: (bạn)  |  Ngày: 08/07\nPhiên 1 (60') Charter 'Kéo-thả deal & phân quyền': phủ pipeline+quyền | 4 lỗi (1 Critical, 2 High, 1 Low)\nPhiên 2 (60') Charter 'Tìm kiếm & bộ lọc':           phủ tìm kiếm     | 3 lỗi (1 High, 2 Medium)\nPhiên 3 (60') Charter 'Nhập/xuất dữ liệu':          phủ import/export | 2 lỗi (2 Medium)\nNổi bật: CRM-5502 (Critical) rò rỉ phân quyền — BLOCKER\nCần đào sâu sprint sau: đồng bộ khi thao tác nhanh; phân quyền ở mọi module."),
      IMG(a4_dash, "Bảng tổng kết phiên thăm dò: số phiên, lỗi, khu vực phủ, phần cần đào sâu", "An exploration summary: sessions, bugs, areas covered, what needs depth", "探索サマリー：セッション数・バグ・網羅領域・深掘り点"),
      TIP("Báo cáo theo PHIÊN + nêu 'cần đào sâu' — biến thăm dò thành đầu vào lập kế hoạch cho sprint sau.", "Report by SESSION + note 'needs depth' — turning exploration into planning input for the next sprint.", "セッション別に報告し『深掘り必要』を明記 — 探索を次スプリントの計画入力に。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới thăm dò có cấu trúc, người ta hay mắc vài lỗi giống nhau. Biết trước giúp phiên của bạn vừa sáng tạo vừa báo cáo được.",
        "When new to structured exploration, people make a few common mistakes. Knowing them keeps your sessions both creative and reportable.",
        "構造化探索に不慣れだと共通の失敗をします。事前に知ればセッションが創造的かつ報告可能になります。"),
      PITFALL("Thăm dò không charter → lan man, phủ trùng chỗ và bỏ trống chỗ khác.", "Exploring without a charter → wandering, overlapping coverage and gaps elsewhere.", "チャーターなし探索 → さまよい、網羅の重複と抜けが生じます。"),
      PITFALL("Không ghi chép → tìm được lỗi nhưng quên điều kiện, không tái hiện và không báo cáo được.", "Not recording → finding bugs but forgetting conditions, can't reproduce or report.", "記録しない → バグを見つけても条件を忘れ、再現・報告できません。"),
      TIP("Mỗi phiên một charter + timebox + session sheet; bám theo bất thường và mở ticket ngay khi thấy lỗi.", "One charter + timebox + session sheet per session; follow anomalies and file tickets immediately.", "1セッションに1チャーター＋タイムボックス＋シート；異常を追い即起票。"),
      IMG(a4_charter, "Charter rõ ràng giúp phiên thăm dò có định hướng và báo cáo được", "A clear charter keeps a session focused and reportable", "明確なチャーターがセッションを方向付け報告可能にする"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      a4_faq1.block, a4_faq2.block, a4_faq3.block,
      INTERNAL("Kiểm thử tích hợp (integration) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester"),
      INTERNAL("Kiểm thử chuyển trạng thái (State Transition)", "State transition testing", "kiem-thu-chuyen-trang-thai-cho-nguoi-moi"),
    ] },
  QUIZ(a4_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa thăm dò có cấu trúc trên một hệ CRM: viết charter, chạy phiên có timebox, ghi session sheet, bám theo bất thường để bắt lỗi phân quyền và lỗi đồng bộ, rồi tổng kết theo phiên. Đây là kỹ năng 'con người' giúp bạn tìm ra lớp lỗi mà kịch bản và automation khó chạm tới.",
        "You just did structured exploration on a CRM: wrote a charter, ran timeboxed sessions, kept a session sheet, followed anomalies to catch a permission leak and a sync bug, then summarized by session. This is the 'human' skill for finding a bug class scripts and automation struggle to reach.",
        "CRMで構造化探索をしました：チャーター作成・タイムボックスセッション・シート記録・異常追跡で権限漏れと同期バグを捉え・セッション別要約。スクリプトと自動化が届きにくいバグ種を見つける『人間』のスキルです。"),
      P("Chặng tiếp theo là kiểm thử tích hợp giữa các module — nơi lỗi ẩn ở đường ghép nối dữ liệu. Nếu muốn luyện thăm dò và tích hợp trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is integration testing between modules — where bugs hide at the data seams. If you want to practice exploration and integration on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "次はモジュール間の統合テスト — データの継ぎ目にバグが潜みます。指導付きで企業を模した案件で探索と統合を練習したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ADV4 = makeDoc({
  slug: "kiem-thu-tham-do-exploratory-co-charter",
  domain: "saas",
  level: "intermediate",
  primaryKeyword: "kiểm thử thăm dò",
  keywords: ["kiểm thử thăm dò", "exploratory testing", "charter", "session-based test management"],
  coverLabel: "TRUNG CẤP · EXPLORATORY · SAAS CRM",
  crumb: "Kiểm thử thăm dò (Exploratory)",
  metaTitle: { vi: "Kiểm thử thăm dò (exploratory) có charter", en: "Exploratory testing with charters (SBTM)", ja: "探索的テスト（チャーター/SBTM）" },
  metaDescription: {
    vi: "Kiểm thử thăm dò có cấu trúc trên CRM SaaS: charter & session sheet, phiên có timebox, bám theo bất thường, kịch bản rò rỉ phân quyền, có trắc nghiệm.",
    en: "Structured exploratory testing on a SaaS CRM: charters & session sheets, timeboxed sessions, following anomalies, a permission-leak scenario, UI mockups and a quiz.",
    ja: "SaaS CRMで構造化探索的テスト：チャーターとセッションシート・タイムボックス・異常追跡・権限漏れシナリオ・モック・クイズ。",
  },
  title: {
    vi: "Kiểm thử thăm dò (exploratory) có charter: tìm lỗi bất ngờ trên CRM SaaS (có trắc nghiệm)",
    en: "Exploratory testing with charters: finding unexpected bugs on a SaaS CRM (with quiz)",
    ja: "チャーター付き探索的テスト：SaaS CRMで予期せぬバグ発見（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: kiểm thử thăm dò có cấu trúc trên hệ CRM SaaS. Charter & session sheet, SBTM, phiên có timebox, bám theo bất thường, hai tình huống (rò rỉ phân quyền, dữ liệu lệch khi thao tác nhanh), báo cáo theo phiên, mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: structured exploratory testing on a SaaS CRM. Charters & session sheets, SBTM, timeboxed sessions, following anomalies, two situations (permission leak, data drift under fast actions), reporting by session, UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：SaaS CRMでの構造化探索的テスト。チャーターとシート・SBTM・タイムボックス・異常追跡・2シーン・セッション別報告・モック・FAQ・クイズ。",
  },
  faqs: [a4_faq1, a4_faq2, a4_faq3],
  howTo: { name: "Cách chạy một phiên kiểm thử thăm dò có cấu trúc", steps: [
    { name: "Viết charter & đặt timebox", text: "Một câu mục tiêu khám phá + thời lượng 60–90 phút." },
    { name: "Khám phá & ghi session sheet", text: "Thử ý tưởng, bám theo bất thường, ghi theo dòng thời gian." },
    { name: "Kết phiên & báo cáo", text: "Mở ticket cho lỗi, tổng kết khu vực phủ và phần cần đào sâu." },
  ] },
  pages: a4_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 5 — Kiểm thử tích hợp (Integration) giữa các module · ERP
// ══════════════════════════════════════════════════════════════════════════════════════
const a5_flow = moduleFlow("Luồng dữ liệu tích hợp ERP: Bán hàng → Kho → Kế toán", [
  { id: "sales", label: "Bán hàng", x: 130, y: 130, sub: "tạo đơn" },
  { id: "inv", label: "Kho", x: 380, y: 130, sub: "trừ tồn" },
  { id: "acc", label: "Kế toán", x: 630, y: 130, sub: "ghi sổ" },
], [
  { from: "sales", to: "inv", label: "đơn đã duyệt → xuất kho" },
  { from: "inv", to: "acc", label: "giá vốn → sổ cái" },
], { accent: "#0369a1", h: 260 });

const a5_matrix = grid("Ma trận kiểm thử tích hợp (giao diện giữa module)", ["Giao diện", "Sự kiện", "Kỳ vọng bên nhận", "KQ"], [
  ["Bán hàng → Kho", "Duyệt đơn 100 SP", "Tồn kho -100, tạo phiếu xuất", "PASS"],
  ["Kho → Kế toán", "Xuất kho", "Ghi giá vốn đúng vào sổ cái", "FAIL → ERP-6120"],
  ["Bán hàng → Kế toán", "Xuất hoá đơn", "Ghi doanh thu", "PASS"],
  ["Kho → Bán hàng", "Hết tồn", "Chặn duyệt đơn mới", "PASS"],
], { accent: "#0369a1", highlight: 1, note: "Kiểm ở ĐƯỜNG GHÉP NỐI: dữ liệu bên gửi có tới đúng & đủ bên nhận không." });

const a5_screen = browser("erp.acme.vn/ban-hang/don/SO-99120", [
  field(30, 20, 330, "Mã đơn", "SO-99120", "normal"),
  field(388, 20, 330, "Khách hàng", "Công ty ABC", "normal"),
  field(30, 92, 330, "Sản phẩm", "Áo thun basic × 100", "normal"),
  field(388, 92, 330, "Trạng thái", "Đã duyệt", "normal"),
  `<text x="30" y="182" font-size="11" font-weight="700" fill="#475569">HỆ QUẢ TÍCH HỢP (kiểm bên nhận)</text>`,
  `<rect x="30" y="192" width="220" height="26" rx="6" fill="#dcfce7"/><text x="42" y="210" font-size="11" fill="#166534">Kho: tồn 500 → 400 ✔</text>`,
  `<rect x="264" y="192" width="260" height="26" rx="6" fill="#fee2e2"/><text x="276" y="210" font-size="11" fill="#991b1b">Kế toán: giá vốn CHƯA ghi ✗</text>`,
], { h: 300, title: "Acme ERP · Đơn bán", accent: "#0369a1" });

const a5_jira = jira({
  key: "ERP-6120", title: "Giao diện Kho → Kế toán: xuất kho KHÔNG đẩy giá vốn sang sổ cái",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical", color: "#bf2600",
  fields: [
    ["Môi trường", "staging · Acme ERP v4.1 · đơn SO-99120"],
    ["Giao diện", "Inventory → Accounting (event: goods_issued)"],
    ["Thực tế", "Kho đã trừ tồn nhưng Kế toán KHÔNG nhận giá vốn"],
    ["Mong đợi", "Mỗi lần xuất kho → ghi giá vốn vào sổ cái"],
    ["Rủi ro", "Báo cáo lãi/lỗ sai; đối soát cuối kỳ lệch"],
  ],
});

const a5_exec = grid("Bảng thực thi kiểm thử tích hợp (TestRail)", ["Ca", "Giao diện", "Kỳ vọng", "KQ"], [
  ["INT-01", "Bán hàng → Kho", "Trừ tồn đúng", "PASS"],
  ["INT-02", "Kho → Kế toán", "Ghi giá vốn", "FAIL → ERP-6120"],
  ["INT-03", "Bán hàng → Kế toán", "Ghi doanh thu", "PASS"],
  ["INT-04", "Kho → Bán hàng", "Chặn khi hết tồn", "PASS"],
], { accent: "#0369a1", highlight: 1 });

const a5_faq1 = FAQ(
  "Kiểm thử tích hợp (integration testing) là gì?", "What is integration testing?",
  "Là kiểm thử tập trung vào ĐƯỜNG GHÉP NỐI giữa các module/hệ thống: dữ liệu bên gửi có tới đúng, đủ và đúng định dạng ở bên nhận không. Khác với kiểm chức năng trong một module, tích hợp bắt lỗi ở 'điểm giao' — nơi hai phần vốn chạy đúng riêng lẻ nhưng sai khi nối lại.",
  "It's testing focused on the SEAMS between modules/systems: does the sender's data arrive correctly, completely and in the right format at the receiver. Unlike functional testing within one module, integration catches bugs at 'joints' — where two parts each work alone but fail when connected.",
  "統合テストとは？",
  "モジュール/システム間の継ぎ目に焦点を当てる検証です：送信側のデータが受信側に正しく・完全に・正しい形式で届くか。単一モジュール内の機能テストと異なり、統合は『接合部』のバグ（各単独では正常でも接続時に失敗）を捉えます。");
const a5_faq2 = FAQ(
  "Vì sao lỗi tích hợp khó phát hiện?", "Why are integration bugs hard to find?",
  "Vì mỗi module thường được kiểm riêng và chạy đúng, nên lỗi chỉ lộ khi chúng trao đổi dữ liệu thật với nhau: sai định dạng, thiếu trường, sai thứ tự sự kiện, hoặc một bên không nhận được thông báo. Người mới hay bỏ sót vì chỉ kiểm trong phạm vi một màn hình.",
  "Because each module is usually tested alone and works, bugs only surface when they exchange real data: wrong format, missing fields, wrong event order, or one side not receiving a message. Beginners miss them by testing only within one screen.",
  "統合バグはなぜ発見しにくい？",
  "各モジュールは単独で検証され正常なため、実データを交換した時のみバグが現れます：形式誤り・項目欠落・イベント順序誤り・片側の未受信。1画面内だけ検証する初心者は見逃しがちです。");
const a5_faq3 = FAQ(
  "Làm sao kiểm thử tích hợp một cách có hệ thống?", "How to test integration systematically?",
  "Lập 'ma trận giao diện': liệt kê mọi cặp module trao đổi dữ liệu, sự kiện kích hoạt, và kỳ vọng ở bên nhận. Với mỗi giao diện, kiểm cả luồng đúng lẫn luồng lỗi (bên gửi lỗi thì bên nhận xử lý ra sao). Luôn kiểm hệ quả ở BÊN NHẬN, không chỉ dừng ở bên gửi.",
  "Build an 'interface matrix': list every pair of modules that exchange data, the triggering event, and the expected result at the receiver. For each interface, test both the happy and error flows (if the sender errs, how does the receiver handle it). Always verify effects at the RECEIVER, not just the sender.",
  "統合を体系的に検証するには？",
  "『インターフェース行列』を作ります：データ交換する全モジュール対・誘因イベント・受信側の期待を列挙。各インターフェースで正常と異常フローを検証。常に受信側の影響を確認し、送信側で止めません。");

const a5_quiz = [
  mcq({
    q: { vi: "Kiểm thử tích hợp tập trung vào đâu?", en: "Where does integration testing focus?", ja: "統合テストはどこに焦点を当てる？" },
    options: [
      { vi: "Màu sắc bên trong một module", en: "Colors inside one module", ja: "1モジュール内の色" },
      { vi: "Đường ghép nối/trao đổi dữ liệu giữa các module", en: "The seams/data exchange between modules", ja: "モジュール間の継ぎ目・データ交換" },
      { vi: "Tốc độ gõ phím", en: "Typing speed", ja: "打鍵速度" },
      { vi: "Chỉ giao diện đăng nhập", en: "Only the login UI", ja: "ログインUIのみ" },
    ], correct: 1,
    explain: { vi: "Tích hợp kiểm điểm giao giữa các phần, nơi dữ liệu đi từ module này sang module khác.", en: "Integration checks the joints between parts, where data flows from one module to another.", ja: "統合は部分間の接合部（データが移動する場所）を検証します。" },
  }),
  mcq({
    q: { vi: "Khi kiểm giao diện 'Kho → Kế toán', bạn phải kiểm hệ quả ở đâu?", en: "Testing the 'Inventory → Accounting' interface, where must you check the effect?", ja: "『在庫→会計』インターフェース検証で影響はどこで確認？" },
    options: [
      { vi: "Chỉ ở module Kho (bên gửi)", en: "Only in Inventory (the sender)", ja: "在庫（送信側）のみ" },
      { vi: "Ở module Kế toán (bên nhận): giá vốn có được ghi đúng không", en: "In Accounting (the receiver): is the cost posted correctly", ja: "会計（受信側）：原価が正しく記帳されたか" },
      { vi: "Ở trình duyệt", en: "In the browser", ja: "ブラウザ" },
      { vi: "Không cần kiểm", en: "No need to check", ja: "確認不要" },
    ], correct: 1,
    explain: { vi: "Tích hợp đúng nghĩa là dữ liệu tới ĐÚNG bên nhận; phải kiểm ở Kế toán.", en: "Integration means data reaches the receiver correctly; you must check in Accounting.", ja: "統合とはデータが受信側に正しく届くこと；会計で確認します。" },
  }),
  mcq({
    q: { vi: "Vì sao module Kho và Kế toán chạy đúng riêng lẻ nhưng vẫn có lỗi tích hợp?", en: "Why can Inventory and Accounting each work alone yet have an integration bug?", ja: "在庫と会計が各単独で正常でも統合バグが出るのは？" },
    options: [
      { vi: "Vì chúng không liên quan", en: "Because they're unrelated", ja: "無関係だから" },
      { vi: "Vì lỗi nằm ở đường trao đổi dữ liệu (sự kiện không được gửi/nhận)", en: "Because the bug is on the data-exchange path (an event not sent/received)", ja: "バグがデータ交換経路にあるから（イベント未送受信）" },
      { vi: "Vì trình duyệt cũ", en: "Because of an old browser", ja: "古いブラウザのため" },
      { vi: "Vì thiếu màu", en: "Because of missing colors", ja: "色不足のため" },
    ], correct: 1,
    explain: { vi: "Mỗi bên đúng, nhưng thông điệp giữa chúng bị mất/sai → lỗi ở điểm giao.", en: "Each side is correct, but the message between them is lost/wrong → a joint bug.", ja: "各側は正しいが、間のメッセージが欠落/誤り→接合部のバグです。" },
  }),
  mcq({
    q: { vi: "Đơn bán trừ tồn kho đúng nhưng Kế toán không nhận giá vốn. Hậu quả nghiêm trọng nhất?", en: "The order reduces stock but Accounting doesn't get the cost. Most serious consequence?", ja: "注文で在庫は減るが会計が原価を受けない。最も重大な結果は？" },
    options: [
      { vi: "Logo hiển thị sai", en: "Wrong logo", ja: "ロゴ誤表示" },
      { vi: "Báo cáo lãi/lỗ sai và đối soát cuối kỳ lệch", en: "Wrong profit/loss reports and skewed period reconciliation", ja: "損益報告の誤りと期末照合のずれ" },
      { vi: "Chậm 1 giây", en: "1 second slower", ja: "1秒遅い" },
      { vi: "Không có hậu quả", en: "No consequence", ja: "影響なし" },
    ], correct: 1,
    explain: { vi: "Thiếu giá vốn làm sai số liệu tài chính — hậu quả kế toán lan rộng, nên là Critical.", en: "Missing cost skews financial figures — wide accounting impact, hence Critical.", ja: "原価欠落が財務数値を狂わせ広範な会計影響を生むためCriticalです。" },
  }),
];

const a5_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử tích hợp kiểm đường ghép nối giữa các module: dữ liệu có tới đúng và đủ ở bên nhận không. Bài này gắn với hệ ERP Bán hàng–Kho–Kế toán: bạn lập ma trận giao diện, kiểm hệ quả ở bên nhận, phát hiện lỗi 'điểm giao' và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "Integration testing checks the seams between modules: does data arrive correctly and completely at the receiver. This ties to a Sales–Inventory–Accounting ERP: you build an interface matrix, check effects at the receiver, find a 'joint' bug and file Jira bugs. A quiz at the end.",
        "統合テストはモジュール間の継ぎ目を検証します：データが受信側に正しく完全に届くか。本記事は販売・在庫・会計のERPに沿い、インターフェース行列作成・受信側の影響確認・接合部バグ発見・Jira起票を行います。最後にクイズ付き。"),
      P("Kiểm thử tích hợp là bước bạn rời khỏi 'một màn hình' để nhìn cả hệ thống như các module nối với nhau. Nhiều lỗi đắt giá không nằm trong module nào cả, mà ở đường dữ liệu giữa chúng — nơi một sự kiện không được gửi hoặc nhận đúng. Ở bài này ta bước vào một hệ ERP thật và kiểm các điểm giao như một tester đi làm. Bài có mockup giao diện, ví dụ thật và trắc nghiệm cuối bài.",
        "Integration testing is where you leave 'one screen' to see the whole system as connected modules. Many costly bugs live in no module at all, but on the data path between them — where an event isn't sent or received correctly. Here we step into a real ERP and test the joints like a working tester. It has UI mockups, real examples and a final quiz.",
        "統合テストは『1画面』を離れ、システム全体を連結モジュールとして見る段階です。多くの高くつくバグはどのモジュールにもなく、間のデータ経路（イベントが正しく送受信されない場所）にあります。本記事は実際のERPに入り接合部を実務のように検証します。モック・実例・クイズ付き。"),
      IMG(a5_flow, "Luồng dữ liệu tích hợp ERP: Bán hàng tạo đơn → Kho trừ tồn → Kế toán ghi sổ", "ERP integration data flow: Sales creates order → Inventory reduces stock → Accounting posts", "ERP統合データフロー：販売が受注→在庫が減少→会計が記帳"),
      DEF("Kiểm thử tích hợp", "kiểm đường trao đổi dữ liệu giữa các module: dữ liệu tới đúng, đủ, đúng định dạng ở bên nhận.",
        "integration testing — checking the data-exchange path between modules: data arrives correct, complete and well-formed at the receiver.",
        "統合テスト — モジュール間のデータ交換経路を検証：受信側に正しく・完全に・正しい形式で届くか。"),
    ] },
  { heading: { vi: "2. Điểm giao & ma trận giao diện", en: "2. Seams & the interface matrix", ja: "2. 接合部とインターフェース行列" },
    blocks: [
      P("Hãy hình dung hệ thống như nhiều căn phòng nối bằng cửa. Kiểm chức năng là kiểm bên trong từng phòng; kiểm tích hợp là kiểm các cánh cửa — đồ có được chuyển đúng từ phòng này sang phòng kia không. Trong ERP, 'cửa' chính là các sự kiện: duyệt đơn, xuất kho, ghi sổ.",
        "Think of the system as rooms connected by doors. Functional testing checks inside each room; integration checks the doors — do goods pass correctly from one room to another. In an ERP, the 'doors' are events: order approved, goods issued, ledger posted.",
        "システムをドアで繋がった部屋群と想像してください。機能テストは各部屋の中を、統合テストはドア（部屋間で正しく物が渡るか）を検証します。ERPでは『ドア』はイベント：受注承認・出庫・記帳です。"),
      IMG(a5_matrix, "Ma trận giao diện: mỗi cặp module trao đổi dữ liệu là một dòng cần kiểm", "The interface matrix: each pair of modules exchanging data is a row to test", "インターフェース行列：データ交換する各モジュール対が検証する1行"),
      DEF("Giao diện (interface) giữa module", "điểm hai module trao đổi dữ liệu qua một sự kiện; nơi cần kiểm tích hợp.",
        "an interface between modules — the point where two modules exchange data via an event; the place to test integration.",
        "モジュール間インターフェース — 2モジュールがイベントでデータ交換する点；統合を検証する場所。"),
      P("Ma trận giao diện liệt kê mọi 'cửa': cặp module, sự kiện kích hoạt, và kỳ vọng ở bên nhận. Đây là bản đồ giúp bạn không bỏ sót đường ghép nối nào, kể cả những cửa 'ngược' (Kho báo hết hàng ngược về Bán hàng để chặn đơn mới).",
        "The interface matrix lists every 'door': the module pair, the triggering event, and the expected result at the receiver. It's a map so you miss no seam, including 'reverse' doors (Inventory tells Sales it's out of stock to block new orders).",
        "インターフェース行列は全『ドア』を列挙します：モジュール対・誘因イベント・受信側の期待。継ぎ目を漏らさない地図で、『逆』ドア（在庫が販売に在庫切れを伝え新規注文を阻止）も含みます。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án ERP", en: "3. Why it matters on an ERP project", ja: "3. ERP案件で重要な理由" },
    blocks: [
      P("ERP là hệ thống tích hợp chặt: bán hàng, kho, kế toán, mua hàng đều nối vào nhau bằng dữ liệu. Một sự kiện không được truyền đúng — như xuất kho mà không đẩy giá vốn sang kế toán — làm sai lệch báo cáo tài chính của cả doanh nghiệp, và chỉ lộ ra khi đối soát cuối kỳ, lúc đã muộn.",
        "An ERP is tightly integrated: sales, inventory, accounting, purchasing all connect via data. One event not propagated correctly — like goods issued without posting cost to accounting — skews the whole company's financial reports, surfacing only at period reconciliation, when it's late.",
        "ERPは密結合です：販売・在庫・会計・購買がデータで繋がります。1イベントの伝播誤り（出庫時に原価を会計へ送らない等）は全社の財務報告を狂わせ、期末照合時にようやく露見し手遅れです。"),
      P("Vì hậu quả lan rộng và khó truy, kiểm thử tích hợp là tuyến phòng thủ then chốt của ERP. Một tester biết tư duy theo điểm giao — luôn hỏi 'sự kiện này có tới đúng bên nhận không?' — sẽ bắt được lớp lỗi đắt giá mà kiểm từng module bỏ sót.",
        "Because consequences spread and are hard to trace, integration testing is ERP's key defense line. A tester who thinks in seams — always asking 'does this event reach the receiver correctly?' — catches a costly bug class that per-module testing misses.",
        "影響が広がり追跡困難なため、統合テストはERPの重要な防衛線です。接合部で考えるテスター（『このイベントは受信側に正しく届くか』と常に問う）は、モジュール別検証が見逃す高くつくバグ種を捉えます。"),
      P("Đây là bước trưởng thành rõ rệt trong nghề: bạn không còn chỉ kiểm 'nút này bấm có chạy không' mà kiểm 'cả dây chuyền nghiệp vụ có nhất quán không'. Tư duy hệ thống này rất được coi trọng ở các dự án lớn.",
        "This is a clear step of maturity: you no longer just check 'does this button work' but 'is the whole business chain consistent'. This systems thinking is highly valued on large projects.",
        "これは明確な成熟段階です：『このボタンは動くか』だけでなく『業務チェーン全体が整合するか』を検証します。このシステム思考は大規模案件で高く評価されます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: lập ma trận & công cụ", en: "4. Prepare: build the matrix & tools", ja: "4. 準備：行列作成とツール" },
    blocks: [
      P("Chuẩn bị cho kiểm thử tích hợp là vẽ được bản đồ các điểm giao và biết cách quan sát dữ liệu ở bên nhận.",
        "Preparing for integration testing means drawing the map of seams and knowing how to observe data at the receiver.",
        "統合テストの準備は、接合部の地図を描き、受信側のデータ観察方法を知ることです。"),
      STEP(1, "Liệt kê các giao diện: cặp module, sự kiện, kỳ vọng bên nhận (dựng ma trận giao diện).", "List interfaces: module pair, event, receiver expectation (build the interface matrix).", "インターフェースを列挙：モジュール対・イベント・受信側期待（行列を作成）。"),
      STEP(2, "Xác định nơi quan sát bên nhận: trang sổ cái, báo cáo tồn, hoặc dùng Postman kiểm API nội bộ.", "Identify where to observe the receiver: the ledger page, stock report, or Postman for internal APIs.", "受信側の観察先を特定：総勘定元帳・在庫報告、または内部API確認のPostman。"),
      STEP(3, "Mở TestRail cho ca tích hợp và Jira để mở lỗi điểm giao.", "Open TestRail for integration cases and Jira to file joint bugs.", "統合ケース用TestRailと接合部バグ起票用Jiraを開く。"),
      TRY("Vẽ ma trận giao diện cho luồng TMĐT: Đặt hàng → Thanh toán → Kho → Vận chuyển (4 điểm giao).", "Draw an interface matrix for e-commerce: Order → Payment → Inventory → Shipping (4 seams).", "ECのインターフェース行列を描く：注文→決済→在庫→配送（4接合部）。"),
      PITFALL("Chỉ kiểm bên gửi (thấy 'đơn đã duyệt') mà quên kiểm bên nhận — lỗi mất dữ liệu ở kế toán bị bỏ sót.", "Only checking the sender (seeing 'order approved') and forgetting the receiver — a data-loss bug in accounting slips through.", "送信側だけ確認（『受注承認』を見る）し受信側を忘れる — 会計のデータ欠落を見逃します。"),
      IMG(a5_screen, "Màn hình test: đơn bán ERP; hệ quả tích hợp — Kho trừ tồn OK nhưng Kế toán CHƯA ghi giá vốn", "Screen under test: an ERP sales order; integration effects — stock reduced OK but cost not posted", "テスト対象画面：ERP販売注文；統合影響 — 在庫減少OKだが原価未記帳"),
    ] },
  { heading: { vi: "5. Các bước kiểm thử một giao diện", en: "5. Steps to test one interface", ja: "5. 1インターフェースの検証手順" },
    blocks: [
      P("Với mỗi giao diện trong ma trận, làm theo bốn bước để kiểm cả luồng đúng lẫn luồng lỗi.",
        "For each interface in the matrix, follow four steps to test both the happy and error flows.",
        "行列の各インターフェースで、正常と異常フローを検証する4ステップに従います。"),
      STEP(1, "Kích hoạt sự kiện ở bên gửi (ví dụ: duyệt đơn 100 SP ở Bán hàng).", "Trigger the event at the sender (e.g. approve a 100-item order in Sales).", "送信側でイベントを発火（例：販売で100点の注文承認）。"),
      STEP(2, "Kiểm bên nhận: dữ liệu tới đúng, đủ, đúng định dạng (Kho -100; Kế toán ghi giá vốn).", "Check the receiver: data arrives correct, complete, well-formed (Inventory -100; Accounting posts cost).", "受信側確認：データが正しく完全に正しい形式で届く（在庫-100；会計が原価記帳）。"),
      STEP(3, "Kiểm luồng lỗi: bên gửi gửi dữ liệu lỗi/thiếu thì bên nhận xử lý an toàn không?", "Check the error flow: if the sender sends bad/missing data, does the receiver handle it safely?", "異常フロー確認：送信側が不正/欠落データを送ると受信側は安全に処理するか。"),
      STEP(4, "Kiểm nhất quán đầu-cuối: tổng doanh thu, tồn, sổ cái có khớp sau giao dịch.", "Check end-to-end consistency: revenue, stock, ledger reconcile after the transaction.", "エンドツーエンド整合確認：取引後に売上・在庫・元帳が一致するか。"),
      CODE("text", "INT-02  Giao diện Kho → Kế toán  (sự kiện: goods_issued)\nTiền đề: đơn SO-99120 đã duyệt, 100 SP, giá vốn 10.000₫/SP\nBước: 1) Xuất kho cho SO-99120  2) Mở sổ cái Kế toán  3) Kiểm bút toán giá vốn\nKỳ vọng: sổ cái ghi 'Giá vốn hàng bán 1.000.000₫' đúng thời điểm xuất kho\nThực tế: Kho đã -100 nhưng sổ cái KHÔNG có bút toán giá vốn -> FAIL (ERP-6120)"),
      TRY("Viết một ca luồng lỗi: bên Bán hàng gửi đơn thiếu 'giá vốn' — Kho/Kế toán nên xử lý thế nào?", "Write an error-flow case: Sales sends an order missing 'cost' — how should Inventory/Accounting handle it?", "異常フローケースを書く：販売が『原価』欠落の注文を送る — 在庫/会計はどう扱うべき？"),
    ] },
  { heading: { vi: "6. Tình huống 1: dữ liệu 'rơi' ở điểm giao", en: "6. Situation 1: data 'dropped' at a seam", ja: "6. シーン1：接合部でデータが『落ちる』" },
    blocks: [
      SITUATION("Xuất kho thành công nhưng Kế toán không nhận giá vốn.", "Goods are issued successfully but Accounting never receives the cost.",
        "Đơn SO-99120 đã duyệt, Kho trừ tồn đúng 100 sản phẩm, nhưng khi bạn mở sổ cái Kế toán thì không thấy bút toán giá vốn nào.",
        "Order SO-99120 is approved, Inventory correctly reduces 100 items, but opening the Accounting ledger shows no cost entry.",
        "出庫は成功するが会計が原価を受けない。", "注文SO-99120は承認され在庫は正しく100減りますが、会計元帳を開くと原価仕訳がありません。"),
      SOLVE("Xác nhận lỗi nằm ở giao diện Kho→Kế toán (bên gửi đúng, bên nhận thiếu); mở ticket Critical.", "Confirm the bug is at the Inventory→Accounting interface (sender correct, receiver missing); file Critical.", "バグが在庫→会計インターフェースにあると確認（送信側正・受信側欠落）；Critical起票。"),
      P("Đây là lỗi tích hợp kinh điển: mỗi module đúng khi kiểm riêng, nhưng thông điệp giữa chúng bị mất. Khi ghi nhận, bạn nêu rõ giao diện và sự kiện (Kho→Kế toán, goods_issued), trạng thái hai bên (Kho -100 đúng, Kế toán thiếu bút toán), và hệ quả tài chính. Nhờ chỉ đích danh điểm giao, lập trình viên biết ngay phải sửa ở đường truyền sự kiện, không phải trong logic từng module.",
        "This is a classic integration bug: each module is correct alone, but the message between them is lost. When recording, state the interface and event (Inventory→Accounting, goods_issued), both sides' state (Inventory -100 correct, Accounting missing the entry), and the financial impact. By naming the seam, developers know to fix the event path, not the per-module logic.",
        "これは典型的な統合バグです：各モジュールは単独で正しいが間のメッセージが失われます。記録時はインターフェースとイベント（在庫→会計、goods_issued）、両側の状態（在庫-100は正・会計は仕訳欠落）、財務影響を明記します。接合部を名指しすれば、開発者はモジュール内でなくイベント経路を修正すべきと分かります。"),
      IMG(a5_jira, "Ticket Critical: giao diện Kho→Kế toán không đẩy giá vốn sang sổ cái", "A Critical ticket: the Inventory→Accounting interface doesn't post cost to the ledger", "重大チケット：在庫→会計インターフェースが原価を元帳へ送らない"),
      RECAP(["Lỗi tích hợp = mỗi bên đúng, thông điệp giữa mất", "Chỉ đích danh giao diện & sự kiện, nêu hệ quả tài chính"],
        ["Integration bug = each side correct, message lost", "Name the interface & event, state the financial impact"],
        ["統合バグ=各側正・間のメッセージ欠落", "インターフェースとイベントを名指し・財務影響を明記"]),
    ] },
  { heading: { vi: "7. Tình huống 2: sai thứ tự sự kiện", en: "7. Situation 2: wrong event order", ja: "7. シーン2：イベント順序の誤り" },
    blocks: [
      SITUATION("Huỷ đơn sau khi đã xuất kho nhưng trước khi kế toán ghi sổ.", "Cancelling an order after goods issued but before accounting posts.",
        "Bạn kiểm chuỗi sự kiện: nếu khách huỷ đơn ngay sau khi Kho đã xuất nhưng Kế toán chưa ghi, hệ thống có hoàn nhập tồn kho và không ghi sai sổ không?",
        "You test the event chain: if a customer cancels right after Inventory issued but before Accounting posts, does the system restock and avoid a wrong ledger entry?",
        "出庫後・会計記帳前の注文キャンセルを検証。", "イベント連鎖を検証：在庫出庫後・会計記帳前に顧客がキャンセルしたら、在庫を戻し誤仕訳を避けるか。"),
      SOLVE("Kiểm nhất quán khi sự kiện xảy ra 'xen kẽ'; ghi rõ thứ tự và trạng thái cuối của cả ba module.", "Check consistency when events interleave; record the order and the final state of all three modules.", "イベントが交錯する時の整合を確認；順序と3モジュールの最終状態を記録。"),
      P("Tích hợp không chỉ là 'dữ liệu có tới không' mà còn là 'thứ tự và thời điểm có đúng không'. Huỷ đơn giữa chừng là bài kiểm hóc búa: hệ thống phải hoàn nhập tồn ở Kho và bảo đảm Kế toán không ghi giá vốn cho đơn đã huỷ. Khi ghi nhận, bạn mô tả rõ chuỗi thời gian và trạng thái cuối của từng module để lộ ra bất kỳ sự không nhất quán nào.",
        "Integration isn't only 'does data arrive' but also 'is the order and timing correct'. Cancelling mid-flow is a tricky test: the system must restock Inventory and ensure Accounting posts no cost for a cancelled order. When recording, describe the time sequence and each module's final state to expose any inconsistency.",
        "統合は『データが届くか』だけでなく『順序とタイミングが正しいか』でもあります。途中キャンセルは難しい検証です：在庫を戻し、キャンセル注文に会計が原価計上しないことを保証する必要があります。記録時は時系列と各モジュールの最終状態を記し不整合を露出します。"),
      IMG(a5_exec, "Bảng thực thi kiểm thử tích hợp theo từng giao diện, gắn mã lỗi cho ca Fail", "An integration execution sheet by interface, linking the failed case to a bug ID", "インターフェース別の統合実行表、Failケースにバグ番号を紐付け"),
      TRY("Liệt kê 3 trạng thái cuối cần kiểm sau khi huỷ đơn giữa chừng (Kho, Kế toán, Bán hàng).", "List 3 final states to check after a mid-flow cancel (Inventory, Accounting, Sales).", "途中キャンセル後に確認する3つの最終状態を列挙（在庫・会計・販売）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report theo giao diện", en: "8. Recording & the report file by interface", ja: "8. インターフェース別の記録とレポート" },
    blocks: [
      P("Báo cáo tích hợp trình bày theo từng giao diện, cho thấy đường ghép nối nào đã kiểm và đường nào còn lỗi. Vì lỗi tích hợp thường nghiêm trọng, báo cáo cần làm nổi bật các điểm giao 'rò rỉ' dữ liệu.",
        "An integration report presents results by interface, showing which seams were tested and which still fail. Because integration bugs are often serious, the report should highlight seams that 'leak' data.",
        "統合報告はインターフェース別に結果を提示し、どの継ぎ目を検証しどれがまだFailかを示します。統合バグは重大なことが多いため、データが『漏れる』接合部を強調すべきです。"),
      STEP(1, "Ghi kết quả từng giao diện (Pass/Fail) và gắn mã ticket cho giao diện lỗi.", "Record each interface's result (Pass/Fail) and attach ticket IDs to failed ones.", "各インターフェースの結果（合否）を記録、Failにチケット番号を付与。"),
      STEP(2, "Nêu rõ giao diện dính tài chính còn lỗi là blocker phát hành.", "Highlight finance-touching interfaces still failing as release blockers.", "財務に関わる未修正インターフェースをリリースブロッカーとして明示。"),
      CODE("text", "BÁO CÁO KIỂM THỬ TÍCH HỢP — Acme ERP v4.1 — Sprint 20\nNgười test: (bạn)  |  Môi trường: staging  |  Ngày: 08/07\nGiao diện đã kiểm: 4 | Pass 3 | Fail 1\n  Bán hàng → Kho          PASS (trừ tồn đúng)\n  Kho → Kế toán           FAIL  ERP-6120 (không đẩy giá vốn)  [BLOCKER — dính tài chính]\n  Bán hàng → Kế toán      PASS (ghi doanh thu)\n  Kho → Bán hàng          PASS (chặn khi hết tồn)\nKhuyến nghị: KHÔNG go-live cho tới khi ERP-6120 được sửa & kiểm lại nhất quán đầu-cuối."),
      IMG(a5_matrix, "Ma trận giao diện kèm kết quả: nhìn là biết điểm giao nào còn 'rò rỉ' dữ liệu", "The interface matrix with results: see at a glance which seam still 'leaks' data", "結果付きインターフェース行列：どの接合部がまだ『漏れる』か一目で分かる"),
      TIP("Trình bày theo GIAO DIỆN và đánh dấu điểm giao dính tài chính — đây là nơi lỗi gây thiệt hại lan rộng nhất.", "Present by INTERFACE and flag finance-touching seams — that's where bugs cause the widest damage.", "インターフェース別に提示し財務接合部を強調 — 損害が最も広がる場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới kiểm thử tích hợp, người ta hay mắc vài lỗi giống nhau. Biết trước giúp bạn phủ đủ điểm giao và bắt được lỗi hệ thống.",
        "When new to integration testing, people make a few common mistakes. Knowing them helps you cover all seams and catch systemic bugs.",
        "統合テストに不慣れだと共通の失敗をします。事前に知れば全接合部を網羅しシステムバグを捉えられます。"),
      PITFALL("Chỉ kiểm bên gửi, tin rằng 'đã gửi là xong' — dữ liệu có thể không tới hoặc tới sai ở bên nhận.", "Only checking the sender, assuming 'sent means done' — data may not arrive or arrive wrong at the receiver.", "送信側だけ確認し『送れば完了』と思い込む — 受信側で未達や誤達のことがあります。"),
      PITFALL("Bỏ qua luồng lỗi và thứ tự sự kiện — huỷ/thử lại giữa chừng là nơi ẩn lỗi nhất quán nghiêm trọng.", "Skipping error flows and event ordering — cancel/retry mid-flow hides serious consistency bugs.", "異常フローとイベント順序を飛ばす — 途中キャンセル/再試行に重大な整合バグが潜みます。"),
      TIP("Dùng ma trận giao diện; với mỗi điểm giao luôn kiểm hệ quả ở BÊN NHẬN và nhất quán đầu-cuối.", "Use the interface matrix; for each seam always check the RECEIVER effect and end-to-end consistency.", "インターフェース行列を使用；各接合部で受信側の影響とエンドツーエンド整合を必ず確認。"),
      IMG(a5_flow, "Sơ đồ luồng dữ liệu giúp không bỏ sót điểm giao nào giữa các module", "The data-flow diagram so no seam between modules is missed", "データフロー図でモジュール間の接合部を漏らさない"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      a5_faq1.block, a5_faq2.block, a5_faq3.block,
      INTERNAL("Kiểm thử thăm dò (exploratory) có charter", "Exploratory testing with charters", "kiem-thu-tham-do-exploratory-co-charter"),
      INTERNAL("Kỹ thuật bảng quyết định (Decision Table)", "Decision table technique", "bang-quyet-dinh-decision-table-cho-tester"),
    ] },
  QUIZ(a5_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa kiểm thử tích hợp trên một hệ ERP: lập ma trận giao diện, kiểm hệ quả ở bên nhận, kiểm luồng lỗi và thứ tự sự kiện, phát hiện lỗi dữ liệu 'rơi' ở điểm giao dính tài chính, rồi ghi nhận theo giao diện. Đây là tư duy hệ thống giúp bạn bảo vệ sự nhất quán của cả sản phẩm.",
        "You just did integration testing on an ERP: built the interface matrix, checked receiver effects, tested error flows and event order, found a 'dropped' data bug at a finance-touching seam, then recorded by interface. This systems thinking protects the whole product's consistency.",
        "ERPで統合テストをしました：インターフェース行列作成・受信側の影響確認・異常フローとイベント順序の検証・財務接合部でのデータ欠落バグ発見・インターフェース別記録。製品全体の整合を守るシステム思考です。"),
      P("Bạn đã hoàn thành chuỗi kỹ thuật thiết kế ca và tích hợp ở mức trung cấp. Chặng tiếp theo là các kỹ năng cấp cao: kiểm thử dựa trên rủi ro, lập kế hoạch kiểm thử, quản lý lỗi, UAT và kiểm thử phi chức năng. Nếu muốn luyện trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "You've completed the intermediate chain of case-design and integration techniques. Next are advanced skills: risk-based testing, test planning, defect management, UAT and non-functional testing. If you want to practice on enterprise-like projects with a mentor, a structured course helps you progress fast and confidently apply for a Tester role.",
        "中級のケース設計と統合の連鎖を完了しました。次は上級スキル：リスクベーステスト・テスト計画・欠陥管理・UAT・非機能テストです。指導付きで企業を模した案件で練習したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ADV5 = makeDoc({
  slug: "kiem-thu-tich-hop-integration-cho-tester",
  domain: "erp",
  level: "intermediate",
  primaryKeyword: "kiểm thử tích hợp",
  keywords: ["kiểm thử tích hợp", "integration testing", "kiểm thử giao diện module", "integration testing là gì"],
  coverLabel: "TRUNG CẤP · INTEGRATION · ERP",
  crumb: "Kiểm thử tích hợp (Integration)",
  metaTitle: { vi: "Kiểm thử tích hợp (integration) giữa module", en: "Integration testing between modules", ja: "統合テスト（モジュール間）" },
  metaDescription: {
    vi: "Kiểm thử tích hợp cho tester trên hệ ERP: điểm giao & ma trận giao diện, kiểm hệ quả bên nhận, kịch bản dữ liệu 'rơi' và sai thứ tự sự kiện, có trắc nghiệm.",
    en: "Integration testing for testers on an ERP: seams & the interface matrix, checking receiver effects, dropped-data and wrong-event-order scenarios, UI mockups and a quiz.",
    ja: "テスター向け統合テストをERPで：接合部とインターフェース行列・受信側の影響確認・データ欠落とイベント順序シナリオ・モック・クイズ。",
  },
  title: {
    vi: "Kiểm thử tích hợp (integration) giữa các module: hệ ERP Bán hàng–Kho–Kế toán (có trắc nghiệm)",
    en: "Integration testing between modules: a Sales–Inventory–Accounting ERP (with quiz)",
    ja: "モジュール間統合テスト：販売・在庫・会計のERP（クイズ付き）",
  },
  summary: {
    vi: "Bài trung cấp: kiểm thử tích hợp giữa các module trên hệ ERP. Điểm giao & ma trận giao diện, kiểm hệ quả ở bên nhận, luồng lỗi và thứ tự sự kiện, hai tình huống (dữ liệu 'rơi' ở điểm giao, huỷ đơn xen kẽ), ghi nhận theo giao diện, mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Intermediate article: integration testing between modules on an ERP. Seams & the interface matrix, checking receiver effects, error flows and event order, two situations (dropped data at a seam, interleaved cancellation), recording by interface, UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "中級記事：ERPでのモジュール間統合テスト。接合部とインターフェース行列・受信側の影響確認・異常フローとイベント順序・2シーン・インターフェース別記録・モック・FAQ・クイズ。",
  },
  faqs: [a5_faq1, a5_faq2, a5_faq3],
  howTo: { name: "Cách kiểm thử tích hợp giữa các module", steps: [
    { name: "Lập ma trận giao diện", text: "Liệt kê cặp module, sự kiện và kỳ vọng ở bên nhận." },
    { name: "Kiểm hệ quả ở bên nhận", text: "Dữ liệu tới đúng, đủ, đúng định dạng; kiểm cả luồng lỗi." },
    { name: "Kiểm nhất quán đầu-cuối & báo cáo", text: "Doanh thu, tồn, sổ cái khớp; ghi nhận theo giao diện, đánh dấu blocker." },
  ] },
  pages: a5_pages,
});

export const MANUAL_ADV_01 = [ADV1, ADV2, ADV3, ADV4, ADV5];
