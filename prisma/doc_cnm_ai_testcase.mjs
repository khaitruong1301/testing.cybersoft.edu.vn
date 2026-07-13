// doc_cnm_ai_testcase.mjs — BÀI "CÔNG NGHỆ MỚI": Dùng AI sinh testcase tự động từ user story.
// Bám app SaaS quản lý dự án TaskPilot (tính năng "Gán task cho thành viên"). Giọng thực chiến,
// prompt/code thật, nhiều mockup giao diện (ui_mock). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, quy trình lỗi, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "congnghe", label: cfg.coverLabel });
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
    categorySlug: "ai-in-testing", slug: cfg.slug, cover, level: "intermediate",
    tags: tags("congnghe", cfg.domain, "aitesting", "intermediate", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình User Story trên TaskPilot với nút sinh testcase bằng AI ──
const m_userstory = browser("taskpilot.io/backlog/user-story/TP-2201", [
  panel("TaskPilot · Backlog · User Story #TP-2201", [
    field(24, 20, 330, "Vai trò (As a)", "Project Manager", "normal"),
    field(372, 20, 330, "Mục tiêu (I want)", "Gán task cho thành viên trong nhóm", "normal"),
    field(24, 92, 678, "Lợi ích (So that)", "Công việc có người chịu trách nhiệm rõ ràng", "normal"),
    field(24, 164, 678, "Acceptance Criteria", "Chỉ gán cho thành viên đang active; tối đa 20 task/người", "normal"),
    btn(24, 244, 260, "✨ Generate testcases (AI)", "primary"),
    annotate(20, 236, 280, 50, "AI sinh testcase từ US này"),
  ].join(""), { h: 320, accent: "#7c3aed" }),
].join(""), { h: 376, title: "TaskPilot · SaaS PM", accent: "#7c3aed" });

// ── Mockup 2: luồng AI sinh testcase từ user story ──
const m_flow = moduleFlow("Luồng AI sinh testcase từ User Story", [
  { id: "us", label: "User Story", x: 70, y: 70, sub: "TP-2201" },
  { id: "prompt", label: "Prompt Template", x: 250, y: 70, sub: "AC + ràng buộc" },
  { id: "ai", label: "AI / LLM", x: 430, y: 70, sub: "GPT-4 / Claude" },
  { id: "draft", label: "Draft Testcase", x: 610, y: 70, sub: "8 ca đề xuất" },
  { id: "review", label: "Tester Review", x: 430, y: 220, sub: "đối chiếu AC" },
  { id: "testmgmt", label: "Jira / TestRail", x: 610, y: 220, sub: "bộ test chính thức" },
], [
  { from: "us", to: "prompt", label: "viết prompt" },
  { from: "prompt", to: "ai", label: "gọi AI" },
  { from: "ai", to: "draft", label: "sinh nháp" },
  { from: "draft", to: "review", label: "tester duyệt" },
  { from: "review", to: "testmgmt", label: "đưa vào bộ test" },
  { from: "review", to: "ai", label: "sinh lại nếu thiếu ca", bad: true },
], { accent: "#7c3aed", h: 300 });

// ── Mockup 3: panel prompt template có ràng buộc rõ ràng ──
const m_promptPanel = panel("TaskPilot AI · Testcase Assistant", [
  field(24, 20, 678, "User story đầu vào", "US-2201: Là PM, tôi muốn gán task cho thành viên...", "normal"),
  field(24, 92, 330, "Số ca tối đa", "8", "normal"),
  field(372, 92, 330, "Nhóm bắt buộc", "Positive + Negative + Boundary", "normal"),
  btn(24, 164, 220, "⚡ Sinh testcase", "primary"),
  annotate(20, 150, 320, 54, "Ràng buộc rõ: business rule + ca biên"),
].join(""), { h: 260, accent: "#7c3aed" });

// ── Mockup 4: bảng testcase AI sinh cho US-2201 ──
const m_grid = grid("Testcase AI sinh cho TP-2201 (Gán task cho thành viên)",
  ["ID", "Bước kiểm thử", "Kết quả mong đợi", "Ưu tiên"], [
    ["TC-01", "Gán task cho thành viên đang active", "Task chuyển Assigned, có thông báo", "Cao"],
    ["TC-02", "Gán task cho thành viên inactive", "Báo lỗi, không cho gán", "Cao"],
    ["TC-03", "Gán lại task đã có người phụ trách", "Đổi người phụ trách, ghi log lịch sử", "Trung bình"],
    ["TC-04", "Bỏ trống người được gán rồi submit", "Yêu cầu chọn người, chặn submit", "Trung bình"],
    ["TC-05", "Gán task cho chính người tạo task", "Task được gán bình thường", "Thấp"],
  ], { accent: "#7c3aed", note: "8 ca AI đề xuất — 5 ca đầu hiển thị, chưa có ca kiểm WIP limit 20/21" });

// ── Mockup 5: ticket Jira của một testcase do AI sinh, đã tester duyệt ──
const m_jira = jira({
  key: "TP-2201-TC02", title: "[AI] Gán task cho thành viên inactive phải bị chặn",
  type: "Test", status: "To Do", priority: "High", severity: "High",
  fields: [
    ["Nguồn", "AI sinh từ User Story TP-2201, đã tester duyệt"],
    ["Các bước", "1) Mở task 2) Chọn người được gán = thành viên inactive 3) Bấm Lưu"],
    ["Kết quả mong đợi", "Hệ thống báo 'Thành viên không còn hoạt động', không lưu"],
    ["Người duyệt", "Tester: Lan Phạm — đã sửa 1 bước cho khớp UI thật"],
  ],
});

// ── Mockup 6: dashboard hiệu quả AI sinh testcase theo sprint ──
const m_dash = dashboard("Hiệu quả AI sinh testcase — Sprint 14 TaskPilot", [
  { label: "User story đưa vào AI", value: "18", sub: "sprint này", color: "#7c3aed" },
  { label: "Testcase AI sinh", value: "96", sub: "tổng cộng", color: "#2563eb" },
  { label: "Tester duyệt thẳng", value: "61", sub: "≈ 64%", color: "#16a34a" },
  { label: "Phải sửa/bổ sung", value: "35", sub: "≈ 36%", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "AI có thể thay thế hoàn toàn việc viết testcase của tester không?",
  "Can AI completely replace a tester's job of writing test cases?",
  "Không. AI giỏi việc sinh nhanh một bộ testcase nháp bao phủ nhiều tình huống từ user story, nhưng nó không biết context nghiệp vụ ngầm, không nhìn thấy UI thật, và có thể bịa thêm quy tắc không tồn tại (hallucination). Vai trò của tester chuyển từ 'gõ từng ca' sang 'thiết kế prompt, review, đối chiếu acceptance criteria và quyết định ca nào đủ tin cậy để đưa vào bộ test chính thức'.",
  "No. AI is great at quickly drafting a set of test cases covering many angles of a user story, but it doesn't know unwritten business context, can't see the real UI, and may invent rules that don't exist (hallucination). The tester's role shifts from 'typing every case' to 'designing the prompt, reviewing, cross-checking acceptance criteria, and deciding which cases are trustworthy enough for the official test suite'.",
  "AIはテスターのテストケース作成を完全に置き換えられる？",
  "いいえ。AIはユーザーストーリーから多角的なテストケース草案を素早く作るのは得意ですが、暗黙のビジネス文脈を知らず、実際のUIも見えず、存在しないルールを作り話（ハルシネーション）することもあります。テスターの役割は『一つひとつ入力する』から『プロンプトを設計し、レビューし、受け入れ基準と照合し、どのケースを正式なテストスイートに入れるか判断する』へと変わります。");
const faq2 = FAQ(
  "Nên dùng AI nào để sinh testcase — ChatGPT, Claude hay công cụ chuyên dụng?",
  "Which AI should I use to generate test cases — ChatGPT, Claude, or a dedicated tool?",
  "Cả mô hình ngôn ngữ đa năng (ChatGPT, Claude, Gemini) lẫn công cụ chuyên dụng gắn với Jira/TestRail đều dùng được — điều quyết định chất lượng không phải là tên công cụ mà là PROMPT bạn đưa vào: có acceptance criteria rõ, có ràng buộc nghiệp vụ cụ thể, có yêu cầu chia nhóm Positive/Negative/Boundary hay không. Với nhóm nhỏ, một prompt template chuẩn dùng lại nhiều lần thường hiệu quả hơn việc đổi công cụ liên tục.",
  "Both general-purpose LLMs (ChatGPT, Claude, Gemini) and dedicated tools wired into Jira/TestRail work fine — what really determines quality isn't the tool's name but the PROMPT you feed it: clear acceptance criteria, specific business constraints, and an explicit ask to split Positive/Negative/Boundary groups. For a small team, a reusable, standardized prompt template usually beats constantly switching tools.",
  "テストケース生成にはどのAIを使うべき？ChatGPT、Claude、それとも専用ツール？",
  "汎用LLM（ChatGPT、Claude、Gemini）でも、Jira/TestRailに連携した専用ツールでも構いません。品質を決めるのはツール名ではなく、与える『プロンプト』です：明確な受け入れ基準、具体的な業務制約、Positive/Negative/Boundaryへの分類指示があるかどうかです。小規模チームでは、ツールを頻繁に変えるより、再利用できる標準プロンプトテンプレートの方が効果的です。");
const faq3 = FAQ(
  "Làm sao đảm bảo AI không bỏ sót ca kiểm biên (boundary)?",
  "How do I make sure AI doesn't skip boundary test cases?",
  "Đừng chỉ nói chung chung 'hãy sinh testcase'. Hãy nêu đích danh con số biên trong acceptance criteria (ví dụ 'tối đa 20 task/người') và yêu cầu tường minh trong prompt: 'PHẢI có ít nhất một ca kiểm đúng ranh giới (20 và 21)'. Sau khi AI trả kết quả, tester luôn tự hỏi 'ràng buộc số nào trong AC chưa có ca kiểm tương ứng?' trước khi duyệt — đây là bước review không thể bỏ qua dù dùng AI hay không.",
  "Don't just say 'generate test cases' vaguely. Name the exact boundary number in the acceptance criteria (e.g. 'max 20 tasks per person') and explicitly require in the prompt: 'MUST include at least one case testing exactly at the boundary (20 and 21)'. After AI returns results, the tester should always ask 'which numeric constraint in the AC still has no matching case?' before approving — this review step is unavoidable whether or not you use AI.",
  "AIが境界値のテストケースを見落とさないようにするには？",
  "『テストケースを作って』と漠然と言わないこと。受け入れ基準の中の境界の数値を明示し（例：『1人あたり最大20タスク』）、プロンプトで明確に要求します：『境界値ちょうど（20と21）を検証するケースを必ず1つ以上含めること』。AIの結果を受け取ったら、承認前に必ず『ACのどの数値制約にまだ対応ケースがないか』を自問してください——これはAIを使う使わないに関わらず欠かせないレビュー手順です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Điều gì KHÔNG nên đưa vào prompt khi yêu cầu AI sinh testcase từ user story?",
      en: "What should NOT be put into the prompt when asking AI to generate test cases from a user story?",
      ja: "ユーザーストーリーからAIにテストケースを生成させるプロンプトに、入れるべきでないものは？" },
    options: [
      { vi: "Acceptance Criteria đầy đủ", en: "Complete Acceptance Criteria", ja: "完全な受け入れ基準" },
      { vi: "Ràng buộc nghiệp vụ cụ thể (vd WIP limit 20 task)", en: "Specific business constraints (e.g. a 20-task WIP limit)", ja: "具体的な業務制約（例：WIP上限20タスク）" },
      { vi: "Ý kiến chủ quan về UI đẹp hay xấu", en: "Subjective opinions about whether the UI looks nice", ja: "UIの見た目が良い悪いという主観的意見" },
      { vi: "Yêu cầu chia nhóm Positive/Negative/Boundary", en: "A request to split into Positive/Negative/Boundary groups", ja: "Positive/Negative/Boundaryへの分類指示" },
    ], correct: 2,
    explain: { vi: "Prompt nên bám sát AC và ràng buộc nghiệp vụ khách quan; ý kiến chủ quan về giao diện không giúp AI sinh testcase chính xác hơn.", en: "The prompt should stick to objective AC and business constraints; subjective UI opinions don't help AI generate more accurate test cases.", ja: "プロンプトは客観的なACと業務制約に沿うべきで、UIについての主観的意見はAIがより正確なテストケースを生成する助けにはなりません。" },
  }),
  mcq({
    q: { vi: "Vì sao nên yêu cầu AI 'trích dẫn đúng AC nào' khi sinh mỗi testcase?",
      en: "Why should you ask AI to 'cite exactly which AC' when generating each test case?",
      ja: "各テストケース生成時にAIへ『どの受け入れ基準に基づくか引用させる』理由は？" },
    options: [
      { vi: "Để bài viết dài hơn, trông chuyên nghiệp", en: "To make the output longer and look more professional", ja: "出力を長くしてプロっぽく見せるため" },
      { vi: "Để phát hiện ca AI bịa thêm nghiệp vụ không có trong AC (hallucination)", en: "To catch cases where AI invents business rules not present in the AC (hallucination)", ja: "ACに存在しない業務ルールをAIが作り話（ハルシネーション）した場合を発見するため" },
      { vi: "Để AI chạy nhanh hơn", en: "To make AI run faster", ja: "AIの実行を速くするため" },
      { vi: "Không có tác dụng gì", en: "It has no real effect", ja: "特に効果はない" },
    ], correct: 1,
    explain: { vi: "Khi AI phải chỉ rõ AC nguồn, tester dễ dàng lọc ra ca không có căn cứ thật — dấu hiệu điển hình của hallucination.", en: "When AI must point to the source AC, testers can easily filter out cases with no real basis — a classic sign of hallucination.", ja: "AIが根拠となるACを明示しなければならないと、実際の根拠がないケース——ハルシネーションの典型的な兆候——をテスターが容易に見分けられます。" },
  }),
  mcq({
    q: { vi: "AI bỏ sót ca kiểm biên WIP limit (20/21 task) dù đã ghi trong AC. Cách khắc phục đúng nhất?",
      en: "AI skipped the WIP-limit boundary case (20/21 tasks) even though it was in the AC. What's the best fix?",
      ja: "ACに記載があるのに、AIがWIP上限の境界値ケース（20/21タスク）を見落とした。最も適切な対処は？" },
    options: [
      { vi: "Bỏ qua vì AI luôn đúng", en: "Ignore it, AI is always right", ja: "AIは常に正しいので無視する" },
      { vi: "Ngừng dùng AI hoàn toàn, tự viết lại từ đầu", en: "Stop using AI entirely and rewrite everything by hand", ja: "AIの使用を完全にやめ、最初から手動で書き直す" },
      { vi: "Sửa prompt để ràng buộc rõ, yêu cầu bắt buộc có ca biên rồi review lại kết quả mới", en: "Refine the prompt to state the constraint explicitly, require a mandatory boundary case, then review the new output", ja: "プロンプトを制約が明確になるよう修正し、境界値ケースを必須にして、新しい結果を再レビューする" },
      { vi: "Giảm số lượng testcase yêu cầu xuống còn 1", en: "Reduce the requested number of test cases down to 1", ja: "要求するテストケース数を1件に減らす" },
    ], correct: 2,
    explain: { vi: "Vấn đề nằm ở prompt chưa đủ tường minh; sửa prompt kèm ràng buộc rõ và review lại là cách khắc phục bền vững, không phải bỏ AI hay bỏ qua rủi ro.", en: "The problem is an insufficiently explicit prompt; refining it with clear constraints and re-reviewing is the sustainable fix, not abandoning AI or ignoring the risk.", ja: "問題はプロンプトの明確さ不足にあります。制約を明確にして修正し再レビューするのが持続的な対処法であり、AIを捨てたりリスクを無視したりすることではありません。" },
  }),
  mcq({
    q: { vi: "Ai là người chịu trách nhiệm CUỐI CÙNG xác nhận testcase do AI sinh trước khi đưa vào bộ test chính thức?",
      en: "Who is ultimately responsible for confirming AI-generated test cases before they enter the official test suite?",
      ja: "AIが生成したテストケースを正式なテストスイートに入れる前に、最終的に確認する責任者は誰？" },
    options: [
      { vi: "AI tự động duyệt", en: "AI approves itself automatically", ja: "AIが自動的に承認する" },
      { vi: "Tester/QA", en: "The tester/QA", ja: "テスター/QA" },
      { vi: "Khách hàng cuối", en: "The end customer", ja: "エンドユーザー" },
      { vi: "Không cần ai duyệt, cứ đưa thẳng vào", en: "No one needs to approve, just push it straight in", ja: "誰も承認する必要はなく、そのまま投入する" },
    ], correct: 1,
    explain: { vi: "AI chỉ hỗ trợ tạo nháp nhanh; tester/QA luôn là người review, đối chiếu AC và quyết định testcase nào đủ tin cậy.", en: "AI only helps draft quickly; the tester/QA is always the one who reviews, cross-checks the AC, and decides which cases are trustworthy.", ja: "AIは素早い下書き作成を助けるだけで、レビューし、ACと照合し、どのケースが信頼できるか判断するのは常にテスター/QAです。" },
  }),
  mcq({
    q: { vi: "Công cụ quản lý test (Jira/TestRail) nên nhận testcase do AI sinh vào thời điểm nào?",
      en: "When should a test management tool (Jira/TestRail) receive AI-generated test cases?",
      ja: "テスト管理ツール（Jira/TestRail）はAI生成のテストケースをいつ受け取るべき？" },
    options: [
      { vi: "Ngay khi AI vừa sinh ra, chưa qua kiểm tra", en: "Right when AI generates them, before any review", ja: "AIが生成した直後、レビュー前にすぐ" },
      { vi: "Sau khi tester review, đối chiếu AC và sửa nếu cần", en: "After the tester reviews, cross-checks the AC, and fixes them if needed", ja: "テスターがレビューし、ACと照合し、必要なら修正した後" },
      { vi: "Không bao giờ đưa testcase do AI sinh vào công cụ quản lý test", en: "Never put AI-generated test cases into the test management tool", ja: "AI生成のテストケースはテスト管理ツールに絶対入れない" },
      { vi: "Chỉ khi Project Manager yêu cầu, bất kể đã review hay chưa", en: "Only when the Project Manager asks, regardless of whether it was reviewed", ja: "レビュー済みかどうかに関わらず、プロジェクトマネージャーが求めた時だけ" },
    ], correct: 1,
    explain: { vi: "Testcase AI sinh chỉ nên vào bộ test chính thức sau khi qua vòng review của tester — đây là cổng chất lượng bắt buộc.", en: "AI-generated test cases should only enter the official suite after passing a tester review — this is a mandatory quality gate.", ja: "AI生成のテストケースは、テスターのレビューを通過した後にのみ正式なテストスイートへ入れるべきです。これは必須の品質ゲートです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll work with", ja: "1. 要点とテスト対象画面" },
    blocks: [
      TLDR("Dùng AI sinh testcase tự động từ user story nghĩa là bạn đưa một user story kèm acceptance criteria cho một mô hình AI (ChatGPT, Claude...), AI trả về một bộ testcase nháp (Positive/Negative/Boundary), rồi bạn — tester — review, đối chiếu acceptance criteria, sửa nếu cần, và mới đưa vào bộ test chính thức. Bài này bám tính năng 'Gán task cho thành viên' của app SaaS quản lý dự án TaskPilot, có prompt thật, mockup giao diện thật và trắc nghiệm cuối bài.",
        "Using AI to auto-generate test cases from a user story means feeding a user story plus acceptance criteria to an AI model (ChatGPT, Claude...), the AI returns a draft set of test cases (Positive/Negative/Boundary), and you — the tester — review them, cross-check the acceptance criteria, fix what's needed, and only then push them into the official test suite. This article follows the 'Assign task to a member' feature of the SaaS project-management app TaskPilot, with real prompts, real UI mockups, and a quiz at the end.",
        "ユーザーストーリーからAIでテストケースを自動生成するとは、ユーザーストーリーと受け入れ基準をAIモデル（ChatGPT、Claudeなど）に渡し、AIがテストケースの草案（Positive/Negative/Boundary）を返し、テスター自身がレビューして受け入れ基準と照合し、必要なら修正してから正式なテストスイートに入れることを指します。本記事はSaaSプロジェクト管理アプリTaskPilotの『メンバーへのタスク割当』機能に沿い、実際のプロンプト、実際のUIモック、最後にクイズを用意しています。"),
      P("Nếu bạn đang test cho một sản phẩm SaaS thay đổi mỗi sprint, bạn sẽ hiểu cảm giác: user story mới đổ về liên tục, mỗi story cần ít nhất 6-10 testcase, và bạn không có đủ thời gian để viết tay từng ca một cách kỹ lưỡng. Đây chính là chỗ AI giúp được — không phải để thay bạn suy nghĩ, mà để tạo nhanh một bản nháp bao phủ nhiều góc độ, để bạn tập trung thời gian vào việc quan trọng hơn: review, tìm lỗ hổng nghiệp vụ, và quyết định ca nào thật sự cần thiết.",
        "If you test a SaaS product that changes every sprint, you know the feeling: new user stories pour in constantly, each needing at least 6-10 test cases, and you don't have time to hand-write every single one carefully. This is exactly where AI helps — not to think for you, but to quickly produce a draft covering many angles, so you can spend your time on what matters more: reviewing, spotting business gaps, and deciding which cases truly matter.",
        "毎スプリント変化するSaaS製品をテストしているなら、この感覚が分かるはずです：新しいユーザーストーリーが絶えず流れ込み、各ストーリーには最低6〜10件のテストケースが必要で、一つひとつ丁寧に手書きする時間はありません。まさにここでAIが役立ちます——あなたの代わりに考えるためではなく、多角的な草案を素早く作り、あなたがより重要な作業——レビュー、業務上の抜け漏れ発見、本当に必要なケースの判断——に時間を使えるようにするためです。"),
      IMG(m_userstory, "Màn hình User Story trên TaskPilot với nút 'Generate testcases (AI)'", "The TaskPilot user story screen with a 'Generate testcases (AI)' button", "TaskPilotのユーザーストーリー画面。『Generate testcases (AI)』ボタン付き"),
      DEF("AI sinh testcase từ user story", "việc dùng một mô hình AI để đọc user story + acceptance criteria và tự động đề xuất một bộ testcase nháp, chờ tester review trước khi dùng chính thức.",
        "using an AI model to read a user story plus acceptance criteria and automatically propose a draft set of test cases, pending tester review before official use.",
        "AIモデルがユーザーストーリーと受け入れ基準を読み取り、テストケースの草案を自動提案すること。正式利用前にテスターのレビューを待つ。"),
    ] },
  { heading: { vi: "2. AI sinh testcase từ user story hoạt động thế nào", en: "2. How AI test-case generation from a user story works", ja: "2. AIによるユーザーストーリーからのテストケース生成の仕組み" },
    blocks: [
      P("Hãy hình dung luồng làm việc như một dây chuyền có 5 trạm. Trạm 1: bạn có một user story chuẩn (vai trò, mục tiêu, lợi ích) kèm acceptance criteria rõ ràng. Trạm 2: bạn đưa nó vào một prompt template — một 'khuôn' câu lệnh đã chuẩn hoá, có ràng buộc nghiệp vụ cụ thể. Trạm 3: AI xử lý và trả về bản nháp testcase. Trạm 4: bạn — tester — review, đối chiếu từng ca với acceptance criteria gốc. Trạm 5: những ca đạt chuẩn được đưa vào Jira/TestRail làm bộ test chính thức; ca chưa đạt thì quay lại trạm 2 để tinh chỉnh prompt.",
        "Picture the workflow as an assembly line with 5 stations. Station 1: you have a well-formed user story (role, goal, benefit) with clear acceptance criteria. Station 2: you feed it into a prompt template — a standardized instruction 'mold' with specific business constraints. Station 3: AI processes it and returns a draft set of test cases. Station 4: you — the tester — review, cross-checking each case against the original acceptance criteria. Station 5: cases that pass go into Jira/TestRail as the official suite; cases that don't go back to station 2 to refine the prompt.",
        "この流れを5つの工程を持つ生産ラインだとイメージしてください。工程1：役割・目的・利益が整い、明確な受け入れ基準を持つユーザーストーリーを用意する。工程2：それをプロンプトテンプレート——具体的な業務制約を含む標準化された指示の『型』——に入れる。工程3：AIが処理しテストケースの草案を返す。工程4：テスター自身がレビューし、各ケースを元の受け入れ基準と照合する。工程5：合格したケースはJira/TestRailへ正式なテストスイートとして入り、不合格のケースは工程2に戻ってプロンプトを調整する。"),
      IMG(m_flow, "Luồng AI sinh testcase: User Story → Prompt Template → AI → Draft Testcase → Tester Review → Jira/TestRail", "The AI test-case flow: User Story → Prompt Template → AI → Draft Testcase → Tester Review → Jira/TestRail", "AIテストケース生成の流れ：ユーザーストーリー→プロンプトテンプレート→AI→ドラフトテストケース→テスターレビュー→Jira/TestRail"),
      DEF("Prompt template", "một mẫu câu lệnh chuẩn hoá, dùng lại nhiều lần, nêu rõ vai trò AI phải đóng, thông tin đầu vào (user story, AC) và định dạng đầu ra mong muốn.",
        "a standardized, reusable instruction template that states the role the AI must play, the input data (user story, AC), and the desired output format.",
        "プロンプトテンプレート — AIが果たすべき役割、入力情報（ユーザーストーリー、AC）、望む出力形式を明示した、標準化され再利用可能な指示テンプレート。"),
      P("Điểm mấu chốt nằm ở trạm 4: review. Nhiều người mới nghĩ AI sinh ra là dùng luôn, nhưng thực tế AI không đọc được ngữ cảnh ngầm của sản phẩm (ví dụ: 'active' trong TaskPilot có nghĩa riêng, khác với định nghĩa chung), và có thể tự suy diễn thêm quy tắc không hề có trong acceptance criteria. Vì vậy vòng lặp Review → tinh chỉnh prompt chính là nơi tay nghề tester thể hiện rõ nhất.",
        "The key point is station 4: review. Many beginners think whatever AI outputs can be used as-is, but in reality AI can't read a product's unwritten context (e.g. 'active' in TaskPilot has a specific meaning different from the generic definition), and it may infer extra rules that don't exist in the acceptance criteria at all. So the Review → refine-prompt loop is exactly where a tester's skill shows the most.",
        "重要なのは工程4のレビューです。多くの初心者はAIが出したものをそのまま使えると思いがちですが、実際にはAIは製品固有の暗黙の文脈を読み取れず（例：TaskPilotにおける『active』は一般的な定義とは異なる独自の意味を持つ）、受け入れ基準に存在しないルールを勝手に推測することもあります。だからこそ『レビュー→プロンプト調整』のループこそが、テスターの腕前が最もはっきり表れる場所なのです。"),
    ] },
  { heading: { vi: "3. Vì sao Tester cần biết kỹ năng này", en: "3. Why testers need this skill", ja: "3. なぜテスターがこのスキルを必要とするのか" },
    blocks: [
      P("Ở một sản phẩm SaaS thật như TaskPilot, mỗi sprint có thể có 15-20 user story mới. Nếu mỗi story cần trung bình 6-8 testcase viết tay, đội test dễ trở thành nút thắt cổ chai, kéo chậm cả release. Biết cách dùng AI sinh testcase đúng cách giúp đội rút ngắn thời gian tạo bản nháp từ hàng giờ xuống vài phút, trong khi vẫn giữ chất lượng nhờ vòng review có kỷ luật.",
        "On a real SaaS product like TaskPilot, a sprint can have 15-20 new user stories. If each story needs 6-8 hand-written test cases on average, the test team easily becomes a bottleneck, slowing down the whole release. Knowing how to properly use AI to generate test cases cuts drafting time from hours to minutes, while keeping quality thanks to a disciplined review loop.",
        "TaskPilotのような実際のSaaS製品では、1スプリントに15〜20件の新規ユーザーストーリーが発生することもあります。各ストーリーに平均6〜8件の手書きテストケースが必要だとすると、テストチームは容易にボトルネックとなり、リリース全体を遅らせます。AIを正しく使ってテストケースを生成する方法を知っていれば、下書き作成時間を数時間から数分に短縮しつつ、規律あるレビューループによって品質を維持できます。"),
      P("Đây cũng là kỹ năng mà nhà tuyển dụng ngày càng hỏi trong phỏng vấn: không phải 'bạn có biết AI không' mà là 'bạn kiểm soát AI thế nào để không rước rủi ro vào sản phẩm'. Trả lời tốt câu này cho thấy bạn hiểu AI là công cụ tăng tốc, không phải người quyết định thay bạn — một tư duy mà mọi công ty làm sản phẩm nghiêm túc đều muốn thấy ở một tester.",
        "This is also a skill employers increasingly ask about in interviews: not 'do you know AI' but 'how do you control AI so it doesn't introduce risk into the product'. Answering this well shows you understand AI as an accelerating tool, not a decision-maker in your place — a mindset every serious product company wants to see in a tester.",
        "これは面接で企業がますます尋ねるスキルでもあります。『AIを知っているか』ではなく『製品にリスクを持ち込まないようどうAIを制御するか』が問われます。この質問にうまく答えられることは、AIを加速のための道具として理解し、あなたに代わって決定を下す存在とは見なしていないことを示します——これは真剣に製品を作るあらゆる企業がテスターに求める考え方です。"),
      P("Và cuối cùng: kỹ năng viết prompt tốt cho testing chính là kỹ năng tư duy testcase được viết ra thành lời — bạn càng giỏi phân tích acceptance criteria, càng viết prompt tốt, và AI càng trả về kết quả sát thực tế hơn. Nói cách khác, AI không làm giảm giá trị của tư duy kiểm thử; nó khuếch đại giá trị đó nếu bạn dùng đúng.",
        "And finally: writing good testing prompts is really the skill of test-case thinking put into words — the better you analyze acceptance criteria, the better prompts you write, and the closer AI's output gets to reality. In other words, AI doesn't devalue test-design thinking; it amplifies it when used correctly.",
        "そして最後に：テスト用の良いプロンプトを書くスキルとは、まさにテストケース設計の思考を言葉にするスキルです。受け入れ基準を分析する力が高いほど、より良いプロンプトが書け、AIの結果もより実態に即したものになります。つまりAIはテスト設計の思考の価値を下げるのではなく、正しく使えばその価値を増幅させるのです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: user story chuẩn & prompt template", en: "4. Prepare: a well-formed user story & prompt template", ja: "4. 準備：整ったユーザーストーリーとプロンプトテンプレート" },
    blocks: [
      P("Trước khi hỏi AI bất cứ điều gì, bạn cần một user story đủ chất lượng. Một user story tốt theo mẫu 'Là [vai trò], tôi muốn [mục tiêu], để [lợi ích]' luôn đi kèm acceptance criteria — những điều kiện cụ thể, đo được, để xác nhận story đã hoàn thành đúng.",
        "Before asking AI anything, you need a good-enough user story. A good user story following the 'As a [role], I want [goal], so that [benefit]' pattern should always come with acceptance criteria — specific, measurable conditions confirming the story was done correctly.",
        "AIに何かを尋ねる前に、十分な品質のユーザーストーリーが必要です。『[役割]として、[目的]をしたい、それによって[利益]を得る』という形の良いユーザーストーリーには、常に受け入れ基準——ストーリーが正しく完了したことを確認するための、具体的で測定可能な条件——が伴うべきです。"),
      STEP(1, "Viết user story theo mẫu As a / I want / So that. Ví dụ US-2201: 'Là Project Manager, tôi muốn gán task cho thành viên đang active, để công việc có người chịu trách nhiệm rõ ràng'.", "Write the user story using As a / I want / So that. Example US-2201: 'As a Project Manager, I want to assign a task to an active member, so that the work has a clear owner'.", "As a / I want / So that の形式でユーザーストーリーを書く。例 US-2201：『プロジェクトマネージャーとして、アクティブなメンバーにタスクを割り当てたい。それによって作業に明確な担当者がつく』。"),
      STEP(2, "Ghi acceptance criteria dạng con số cụ thể, không mơ hồ: chỉ gán cho thành viên 'active'; tối đa 20 task đang mở/người (WIP limit); không được bỏ trống người gán; gán lại phải ghi log.", "Write acceptance criteria as specific, unambiguous numbers: only assign to 'active' members; max 20 open tasks per person (WIP limit); the assignee field can't be blank; reassigning must be logged.", "受け入れ基準は曖昧さのない具体的な数値で書く：『active』なメンバーのみに割当可能；1人あたり最大20件の未完了タスク（WIP上限）；担当者欄は空欄不可；再割当は履歴を記録する必要がある。"),
      STEP(3, "Soạn prompt template chuẩn: nêu vai trò AI phải đóng (QA Engineer), yêu cầu định dạng bảng đầu ra, và ràng buộc BẮT BUỘC phải có ca kiểm biên.", "Draft a standard prompt template: state the role AI must play (QA Engineer), require a table output format, and mandate that a boundary test case MUST be included.", "標準プロンプトテンプレートを作成する：AIが果たすべき役割（QAエンジニア）を明示し、表形式の出力を要求し、境界値ケースを必ず含めるという制約を課す。"),
      TRY("Lấy một user story đang có trong backlog của đội bạn, viết lại theo mẫu As a/I want/So that kèm acceptance criteria có con số cụ thể — đây là nguyên liệu bắt buộc trước khi hỏi AI.", "Take a user story currently in your team's backlog and rewrite it in the As a/I want/So that pattern with acceptance criteria containing specific numbers — this is the required raw material before asking AI anything.", "チームのバックログにある任意のユーザーストーリーを取り、As a/I want/So that の形式に書き直し、具体的な数値を含む受け入れ基準を付けよう——これはAIに尋ねる前に必須の材料です。"),
      PITFALL("Đưa cho AI một user story mơ hồ kiểu 'làm chức năng gán task cho ổn' rồi kỳ vọng AI tự đoán đúng nghiệp vụ — AI sẽ bịa ra giả định của riêng nó, và bạn sẽ nhận về testcase sai lệch với thực tế.", "Giving AI a vague user story like 'make the assign-task feature work well' and expecting it to guess the business correctly — AI will invent its own assumptions, and you'll get test cases that don't match reality.", "『タスク割当機能をうまく動くようにして』のような曖昧なユーザーストーリーをAIに渡し、業務を正しく推測してくれると期待すること——AIは独自の仮定を作り出し、実態とずれたテストケースが返ってきます。"),
      IMG(m_promptPanel, "Prompt template trong TaskPilot AI Assistant: có ràng buộc rõ về số ca và nhóm bắt buộc", "The prompt template in TaskPilot AI Assistant: with explicit constraints on case count and required groups", "TaskPilot AI Assistantのプロンプトテンプレート：ケース数と必須グループの明確な制約付き"),
      CODE("text", "BẠN LÀ QA ENGINEER. Từ User Story dưới đây, hãy sinh tối đa 8 testcase,\nđủ 3 nhóm: Positive, Negative, Boundary. Đầu ra dạng bảng: ID | Bước kiểm thử |\nDữ liệu đầu vào | Kết quả mong đợi | Ưu tiên (Cao/Trung bình/Thấp) | AC liên quan.\n\nUser Story (US-2201):\n\"Là Project Manager, tôi muốn gán một task cho một thành viên đang hoạt\nđộng trong nhóm, để công việc có người chịu trách nhiệm rõ ràng.\"\n\nAcceptance Criteria:\n- AC1: Chỉ được gán cho thành viên có trạng thái \"active\".\n- AC2: Mỗi thành viên tối đa 20 task đang mở (WIP limit) cùng lúc.\n- AC3: Không được để trống người được gán khi submit.\n- AC4: Gán lại task phải ghi log lịch sử người phụ trách cũ/mới.\n\nRÀNG BUỘC: PHẢI có ít nhất 1 ca kiểm ĐÚNG ranh giới AC2 (20 và 21 task).\nMỗi testcase phải ghi rõ đang kiểm AC nào. KHÔNG bịa thêm nghiệp vụ\nngoài Acceptance Criteria ở trên."),
    ] },
  { heading: { vi: "5. Thực hành: sinh testcase từ user story TaskPilot", en: "5. Hands-on: generating test cases from the TaskPilot user story", ja: "5. 実習：TaskPilotのユーザーストーリーからテストケースを生成する" },
    blocks: [
      P("Giờ ta chạy đúng prompt ở chương trước cho US-2201. AI trả về một bảng nháp — đây là lúc bạn chuyển từ vai trò 'người viết' sang vai trò 'người kiểm định'. Đọc từng dòng, hỏi: dòng này khớp AC nào, dữ liệu đầu vào có thực tế không, kết quả mong đợi có đúng với cách TaskPilot vận hành không.",
        "Now let's run the exact prompt from the previous chapter for US-2201. AI returns a draft table — this is when you shift from being the 'writer' to being the 'verifier'. Read each row and ask: which AC does this row match, is the input data realistic, is the expected result actually how TaskPilot behaves.",
        "では前章のプロンプトをUS-2201に対して実行してみましょう。AIは草案の表を返します——ここであなたは『書き手』から『検証者』へと役割を切り替えます。各行を読み、問いかけましょう：この行はどのACに対応するか、入力データは現実的か、期待結果は実際のTaskPilotの動作と一致しているか。"),
      CODE("text", "TRÍCH KẾT QUẢ AI TRẢ VỀ CHO US-2201 (rút gọn 5/8 ca):\n\nID    | Bước kiểm thử                          | Kết quả mong đợi            | AC\nTC-01 | Gán task cho thành viên đang active     | Task -> Assigned, có noti   | AC1\nTC-02 | Gán task cho thành viên inactive        | Báo lỗi, không cho gán      | AC1\nTC-03 | Gán lại task đã có người phụ trách      | Đổi người, ghi log lịch sử  | AC4\nTC-04 | Bỏ trống người được gán rồi submit      | Chặn submit, yêu cầu chọn   | AC3\nTC-05 | Gán task cho chính người tạo task       | Gán bình thường             | AC1\n(... còn 3 ca khác, xem bảng đầy đủ bên dưới)"),
      IMG(m_grid, "Bảng testcase AI sinh cho US-2201 — 5/8 ca hiển thị, chưa thấy ca kiểm biên WIP limit", "The AI-generated test-case table for US-2201 — 5 of 8 cases shown, no WIP-limit boundary case visible yet", "US-2201向けにAIが生成したテストケース表——8件中5件を表示。まだWIP上限の境界値ケースが見当たらない"),
      P("Nhìn vào bảng, 5 ca đầu đều hợp lý và bám đúng AC1/AC3/AC4. Nhưng nếu bạn còn nhớ chương trước, prompt đã yêu cầu 'PHẢI có ít nhất 1 ca kiểm đúng ranh giới AC2 (20 và 21 task)' — vậy ca đó nằm ở đâu trong 3 ca còn lại? Đây chính xác là việc bạn phải kiểm tra trước khi duyệt bất kỳ bộ testcase nào do AI sinh, dù trông có vẻ đầy đủ đến đâu.",
        "Looking at the table, the first 5 cases are all reasonable and match AC1/AC3/AC4. But if you remember the previous chapter, the prompt required 'MUST include at least one case testing exactly at the AC2 boundary (20 and 21 tasks)' — so where is that case among the remaining 3? This is exactly what you must check before approving any AI-generated test-case set, no matter how complete it looks.",
        "表を見ると、最初の5件はすべて妥当で、AC1/AC3/AC4に正しく沿っています。しかし前章を思い出せば、プロンプトは『AC2の境界値ちょうど（20と21タスク）を検証するケースを必ず1つ以上含めること』と要求していました——では残り3件の中にそのケースはあるでしょうか？これこそが、どれほど完璧に見えてもAI生成のテストケース集を承認する前に必ず確認すべきことです。"),
      TRY("Đếm lại 8 ca AI sinh cho US-2201 và đối chiếu với 4 AC (AC1-AC4): AC nào có nhiều hơn 1 ca, AC nào chưa có ca kiểm đúng con số biên?", "Count the 8 cases AI generated for US-2201 and cross-check against the 4 ACs (AC1-AC4): which AC has more than one case, which AC still lacks a case testing the exact boundary number?", "US-2201向けにAIが生成した8件を数え直し、4つのAC（AC1〜AC4）と照合しよう：どのACが複数のケースを持ち、どのACがまだ境界の数値ちょうどを検証するケースを持たないか？"),
    ] },
  { heading: { vi: "6. Tình huống 1: AI bỏ sót ca kiểm biên WIP limit", en: "6. Situation 1: AI skipped the WIP-limit boundary case", ja: "6. シーン1：AIがWIP上限の境界値ケースを見落とす" },
    blocks: [
      SITUATION("Bạn kiểm lại 8 testcase AI sinh cho US-2201, không thấy ca nào kiểm đúng ranh giới 'tối đa 20 task/người' dù prompt đã yêu cầu rõ.", "You review the 8 test cases AI generated for US-2201 and find none testing exactly the 'max 20 tasks per person' boundary, even though the prompt explicitly required it.",
        "3 ca còn lại chỉ kiểm những trường hợp chung chung (task rỗng tiêu đề, task quá hạn), không liên quan gì tới con số 20. AI đã 'quên' ràng buộc dù prompt có ghi, có thể vì AC2 nằm ở cuối danh sách và mô hình ưu tiên các AC đầu.",
        "The remaining 3 cases only cover generic scenarios (empty task title, overdue task), unrelated to the number 20 at all. AI 'forgot' the constraint even though the prompt stated it, possibly because AC2 was near the end of the list and the model prioritized the earlier ACs.",
        "US-2201向けにAIが生成した8件を再確認したが、プロンプトで明確に要求していたにも関わらず『1人あたり最大20タスク』の境界値ちょうどを検証するケースが見当たらない。",
        "残り3件は一般的なシナリオ（タスクタイトルが空、期限切れタスク）のみをカバーしており、数値20とは全く関係がない。プロンプトに記載していたにもAIはこの制約を『忘れた』ようで、AC2がリストの後方にあり、モデルが前方のACを優先した可能性がある。"),
      SOLVE("Tách riêng ràng buộc biên thành một dòng độc lập, đặt ngay sau phần AC, và yêu cầu AI liệt kê rõ ID testcase tương ứng với từng AC trước khi trả bảng.", "Separate the boundary constraint into its own standalone line placed right after the AC section, and require AI to list which test-case ID corresponds to each AC before returning the table.", "境界制約をAC欄の直後に独立した1行として切り出し、表を返す前に各ACに対応するテストケースIDを明示するようAIに要求する。"),
      P("Bài học ở đây không phải 'AI kém', mà là AI xử lý theo trọng số ngôn ngữ — những ràng buộc nằm giữa một đoạn dài dễ bị 'chìm' hơn những ràng buộc được tách thành dòng riêng, viết hoa, đặt gần cuối prompt. Sau khi tách riêng và chạy lại, prompt mới cho ra đúng 2 ca bổ sung: 'gán task thứ 20 cho thành viên đã có 19 task mở' (phải cho phép) và 'gán task thứ 21 cho thành viên đã có 20 task mở' (phải chặn).",
        "The lesson here isn't 'AI is bad', it's that AI processes text with varying attention weight — constraints buried in a long paragraph are more likely to get 'lost' than constraints separated into their own line, capitalized, placed near the end of the prompt. After separating it and re-running, the new prompt produced exactly 2 additional cases: 'assign the 20th task to a member who already has 19 open tasks' (must be allowed) and 'assign the 21st task to a member who already has 20 open tasks' (must be blocked).",
        "ここでの教訓は『AIが劣っている』ということではなく、AIがテキストを注意の重み付けで処理するということです——長い段落に埋もれた制約は、独立した行に分け、大文字で強調し、プロンプトの終わり近くに置いた制約より『見落とされ』やすいのです。制約を切り出して再実行した結果、新しいプロンプトはちょうど2件の追加ケースを生成しました：『すでに19件の未完了タスクを持つメンバーに20件目のタスクを割り当てる』（許可すべき）と『すでに20件の未完了タスクを持つメンバーに21件目のタスクを割り当てる』（拒否すべき）です。"),
      CODE("text", "PROMPT SAU KHI SỬA (thêm dòng ràng buộc riêng, viết hoa, đặt cuối):\n\n... (giữ nguyên phần User Story + AC1-AC4 như cũ) ...\n\nRÀNG BUỘC BẮT BUỘC — KHÔNG ĐƯỢC BỎ QUA:\nPHẢI có đúng 2 testcase kiểm biên AC2: (1) gán task thứ 20 khi đã có 19 task\nmở -> phải cho phép; (2) gán task thứ 21 khi đã có 20 task mở -> phải chặn.\nMỗi testcase ghi rõ AC liên quan."),
      RECAP(["Ràng buộc nằm giữa đoạn dài dễ bị AI bỏ sót — tách riêng thành dòng độc lập, viết hoa", "Luôn đối chiếu số ca với số AC trước khi duyệt bộ testcase do AI sinh"],
        ["Constraints buried mid-paragraph are easy for AI to miss — isolate them into a standalone, capitalized line", "Always cross-check the case count against the AC count before approving an AI-generated test set"],
        ["段落の途中にある制約はAIに見落とされやすい——独立した大文字の行に切り出す", "AI生成のテストセットを承認する前に、必ずケース数とAC数を照合する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: AI bịa thêm nghiệp vụ không có trong AC", en: "7. Situation 2: AI invents business rules not in the AC", ja: "7. シーン2：AIがACにない業務ルールを作り話する" },
    blocks: [
      SITUATION("Trong bảng testcase, bạn thấy TC-07: 'Gán lại task phải được Admin phê duyệt trước khi áp dụng' — nhưng không AC nào của US-2201 nói tới việc cần Admin phê duyệt.", "In the test-case table, you spot TC-07: 'Reassigning a task must be approved by an Admin before it applies' — but none of US-2201's ACs mention needing Admin approval.",
        "AI có thể đã 'học' từ các sản phẩm quản lý dự án khác (nơi việc gán lại task thường cần duyệt) và áp mặc định lên TaskPilot, dù AC4 của TaskPilot chỉ yêu cầu ghi log, không yêu cầu duyệt.",
        "AI may have 'learned' from other project-management products (where reassigning often needs approval) and defaulted that onto TaskPilot, even though TaskPilot's AC4 only requires logging, not approval.",
        "テストケース表の中にTC-07：『タスクの再割当は適用前に管理者の承認が必要』を見つけたが、US-2201のどのACにも管理者承認について言及がない。",
        "AIは他のプロジェクト管理製品（そこでは再割当に承認が必要なことが多い）から『学習』し、それをTaskPilotにデフォルトで適用した可能性がある。しかしTaskPilotのAC4は履歴の記録のみを要求しており、承認は要求していない。"),
      SOLVE("Loại bỏ TC-07 khỏi bộ test chính thức, ghi chú lý do (không có căn cứ trong AC), và báo lại cho Product Owner để xác nhận đây thật sự KHÔNG phải yêu cầu — tránh vừa test sai vừa vô tình gợi ý thêm scope ngoài kế hoạch.", "Remove TC-07 from the official test suite, note the reason (no basis in the AC), and flag it to the Product Owner to confirm this truly ISN'T a requirement — avoiding both testing the wrong thing and accidentally suggesting scope creep.", "TC-07を正式なテストスイートから除外し、理由（ACに根拠がない）を記録し、これが本当に要件でないことをプロダクトオーナーに確認してもらう——誤ったテストを避けると同時に、意図しないスコープの追加提案も防ぐ。"),
      P("Đây là dạng rủi ro nguy hiểm nhất của AI sinh testcase: không phải ca sai rõ ràng dễ phát hiện, mà là ca nghe rất 'hợp lý về nghiệp vụ' nên dễ bị duyệt nhầm. Thói quen an toàn là: mỗi testcase phải trỏ về đúng 1 (hoặc nhiều) AC cụ thể; ca nào không trỏ về AC nào thì mặc định là nghi ngờ, phải hỏi lại trước khi đưa vào bộ test — không tự ý loại bỏ, cũng không tự ý chấp nhận.",
        "This is the most dangerous type of risk with AI-generated test cases: not an obviously wrong case that's easy to catch, but one that sounds very 'business-plausible' and so is easily approved by mistake. The safe habit is: every test case must point to a specific AC (or ACs); any case pointing to none is treated as suspicious by default and must be double-checked before entering the suite — neither silently dropped nor silently accepted.",
        "これはAI生成テストケースの中で最も危険な種類のリスクです：明らかに間違っていて発見しやすいケースではなく、『業務的にもっともらしく』聞こえるため誤って承認されやすいケースです。安全な習慣は、すべてのテストケースが具体的な（1つまたは複数の）ACを指し示すべきであり、どのACも指さないケースはデフォルトで疑わしいとみなし、テストスイートに入れる前に必ず確認すること——勝手に除外することも、勝手に受け入れることもしない、ということです。"),
      TRY("Với bộ 8 testcase ở chương 5-6, tự hỏi từng ca: 'nếu tôi xoá dòng AC liên quan đi, tôi còn tự tin ca này đúng với TaskPilot không?' — ca nào khiến bạn do dự chính là ứng viên cần hỏi lại Product Owner.", "For the 8 test cases from chapters 5-6, ask each one: 'if I removed the related-AC column, would I still be confident this case is correct for TaskPilot?' — any case that makes you hesitate is a candidate to double-check with the Product Owner.", "5〜6章の8件のテストケースについて、それぞれ自問しよう：『関連AC欄を消しても、このケースがTaskPilotにとって正しいと自信を持てるか？』——迷いが生じたケースこそ、プロダクトオーナーに確認すべき候補です。"),
    ] },
  { heading: { vi: "8. Review & đưa vào Jira/TestRail", en: "8. Review & pushing into Jira/TestRail", ja: "8. レビューとJira/TestRailへの登録" },
    blocks: [
      P("Sau khi lọc bỏ ca thiếu căn cứ (chương 7) và bổ sung ca kiểm biên (chương 6), bạn có một bộ testcase đã 'sạch'. Bước cuối là đưa chúng vào công cụ quản lý test thật để cả đội theo dõi và thực thi — mỗi testcase trở thành một ticket có thể gán người thực thi, đánh dấu Pass/Fail theo từng lần chạy.",
        "After filtering out unsupported cases (chapter 7) and adding boundary cases (chapter 6), you have a 'clean' test-case set. The final step is pushing them into a real test management tool so the whole team can track and execute them — each test case becomes a ticket that can be assigned an executor and marked Pass/Fail per run.",
        "根拠のないケースを除外し（第7章）、境界値ケースを追加した（第6章）後、『クリーンな』テストケース集ができあがります。最後のステップは、チーム全体が追跡・実行できるよう実際のテスト管理ツールに登録することです——各テストケースは実行者を割り当てられ、実行ごとにPass/Failを記録できるチケットになります。"),
      STEP(1, "Với mỗi testcase đạt chuẩn, tạo một issue loại 'Test' trong Jira, ghi rõ nguồn 'AI sinh từ US-xxxx, đã tester duyệt' để cả đội biết nguồn gốc.", "For each qualifying test case, create a 'Test' issue in Jira, noting the source as 'AI-generated from US-xxxx, tester-approved' so the team knows its origin.", "基準を満たした各テストケースについて、Jiraで『Test』タイプのissueを作成し、出所を『US-xxxxからAI生成、テスター承認済み』と明記してチーム全員が由来を分かるようにする。"),
      STEP(2, "Gắn testcase với đúng user story gốc (link 'Tests') để khi US thay đổi, cả đội biết ngay những testcase nào cần rà soát lại.", "Link the test case to its original user story (a 'Tests' link) so when the US changes, the team immediately knows which test cases need re-checking.", "テストケースを元のユーザーストーリーにリンクし（『Tests』リンク）、USが変更された際にどのテストケースを再確認すべきかチームがすぐ分かるようにする。"),
      IMG(m_jira, "Ticket testcase TP-2201-TC02 trên Jira: nguồn AI, đã tester duyệt và sửa 1 bước", "The TP-2201-TC02 test-case ticket in Jira: AI-sourced, tester-approved with one step fixed", "JiraのテストケースチケットTP-2201-TC02：AI起源、テスター承認済みで1ステップ修正"),
      IMG(m_dash, "Dashboard hiệu quả: 96 testcase AI sinh trong Sprint 14, 64% được duyệt thẳng", "An efficiency dashboard: 96 AI-generated test cases in Sprint 14, 64% approved as-is", "効果ダッシュボード：Sprint 14で96件のAI生成テストケース、64%がそのまま承認"),
      TIP("Theo dõi tỉ lệ 'duyệt thẳng' theo thời gian (như dashboard trên) — nếu tỉ lệ này tăng dần qua các sprint, nghĩa là prompt template của đội đang được tinh chỉnh đúng hướng.", "Track the 'approved as-is' rate over time (like the dashboard above) — if this rate rises across sprints, it means your team's prompt template is being refined in the right direction.", "上のダッシュボードのように『そのまま承認』の割合を時系列で追跡しよう——スプリントを重ねてこの割合が上昇していれば、チームのプロンプトテンプレートが正しい方向に洗練されていることを意味します。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Sau khi thực hành với TaskPilot, đây là những cái bẫy phổ biến nhất khi đội mới bắt đầu dùng AI sinh testcase — biết trước giúp bạn tránh mất thời gian debug quy trình thay vì debug sản phẩm.",
        "After practicing with TaskPilot, here are the most common traps teams fall into when they first start using AI to generate test cases — knowing them ahead of time saves you from debugging your process instead of debugging the product.",
        "TaskPilotでの実習を経て、チームがAIによるテストケース生成を使い始めたばかりの頃に陥りがちな最も一般的な落とし穴を紹介します。事前に知っておけば、製品ではなくプロセスをデバッグする羽目になる時間を省けます。"),
      PITFALL("Dùng cùng một prompt chung chung cho mọi user story, không kèm AC cụ thể của story đó — kết quả là testcase na ná nhau, không bám sát nghiệp vụ thật.", "Using the same generic prompt for every user story without that story's specific AC — the result is nearly identical test cases that don't reflect the real business.", "すべてのユーザーストーリーに対して、そのストーリー固有のACを付けずに同じ汎用プロンプトを使うこと——結果として似たり寄ったりのテストケースになり、実際の業務を反映しない。"),
      PITFALL("Duyệt cả bộ testcase một lượt vì 'AI làm nhanh nên chắc đúng' — bỏ qua bước đối chiếu từng ca với AC, dẫn tới lọt ca bịa (như chương 7) vào bộ test chính thức.", "Approving the whole test-case set in one pass because 'AI is fast so it's probably right' — skipping the per-case cross-check against the AC, letting invented cases (like in chapter 7) slip into the official suite.", "『AIは速いからきっと正しい』と一括で全テストケースを承認すること——各ケースとACの照合を省略し、（第7章のような）作り話のケースが正式なテストスイートに紛れ込む。"),
      TIP("Giữ một 'prompt template' dùng chung cho cả đội, cập nhật dần sau mỗi lần rút kinh nghiệm (như thêm dòng ràng buộc biên ở chương 6) — đừng để mỗi người tự viết prompt riêng lẻ, khó đồng bộ chất lượng.", "Keep one shared 'prompt template' for the whole team, updating it gradually with lessons learned (like adding the boundary-constraint line from chapter 6) — don't let everyone write their own separate prompts, which makes quality hard to standardize.", "チーム全体で共有する『プロンプトテンプレート』を1つ持ち、教訓（第6章の境界制約行の追加など）に基づいて少しずつ更新しよう——各自が個別にプロンプトを書くと品質の統一が難しくなる。"),
      TIP("Với testcase liên quan tiền bạc, quyền hạn, hoặc dữ liệu nhạy cảm, luôn coi kết quả AI là bản nháp cần review kỹ hơn mức bình thường — rủi ro sai ở những vùng này cao hơn nhiều so với UI thông thường.", "For test cases involving money, permissions, or sensitive data, always treat AI's output as a draft needing extra-careful review — the risk of getting it wrong in these areas is far higher than for ordinary UI.", "金銭、権限、機密データに関わるテストケースについては、AIの結果を通常以上に念入りなレビューが必要な草案として常に扱おう——これらの領域での誤りのリスクは通常のUIよりはるかに高い。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Playwright Agents: viết test AI-native (Planner · Generator · Healer)", "Playwright Agents: AI-native test authoring (Planner · Generator · Healer)", "ai-playwright-agents-planner-generator-healer", "Playwright Agents：AIネイティブなテスト作成"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug (defect) life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi", "初心者向けバグライフサイクル"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi hết một vòng dùng AI sinh testcase từ user story qua app TaskPilot: chuẩn hoá user story và acceptance criteria, viết prompt template có ràng buộc rõ, chạy AI để lấy bản nháp, review đối chiếu AC để phát hiện ca thiếu (WIP limit) và ca bịa (yêu cầu Admin phê duyệt không có thật), rồi mới đưa vào Jira làm bộ test chính thức. Đây là kỹ năng ngày càng quan trọng khi các đội sản phẩm SaaS chạy nhiều sprint liên tục và cần bản nháp testcase nhanh nhưng vẫn đáng tin cậy.",
        "You just went through a full round of using AI to generate test cases from a user story via the TaskPilot app: standardizing the user story and acceptance criteria, writing a prompt template with clear constraints, running AI to get a draft, reviewing against the AC to catch missing cases (WIP limit) and invented ones (a fake Admin-approval requirement), then pushing them into Jira as the official suite. This is an increasingly important skill as SaaS product teams run back-to-back sprints and need fast yet trustworthy test-case drafts.",
        "TaskPilotアプリを通じて、ユーザーストーリーからAIでテストケースを生成する一連の流れを体験しました：ユーザーストーリーと受け入れ基準の標準化、明確な制約を持つプロンプトテンプレートの作成、AIを実行して草案を得ること、ACと照合して不足ケース（WIP上限）と作り話のケース（存在しない管理者承認要件）を発見すること、そして正式なテストスイートとしてJiraに登録すること。SaaS製品チームが連続してスプリントを回し、速くても信頼できるテストケース草案を必要とする中、ますます重要になるスキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thêm kỹ năng viết acceptance criteria thật rõ ràng ngay từ đầu (vì AC càng rõ, AI càng sinh đúng), và học cách tự động hoá một phần các testcase đã duyệt bằng Playwright hoặc công cụ tương tự. Nếu muốn học bài bản từ nền tảng manual, quy trình xử lý lỗi, tới kỹ năng tận dụng AI trong kiểm thử cùng dự án thực chiến, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should practice writing clearer acceptance criteria from the start (the clearer the AC, the more accurate AI's output), and learn to automate part of the approved test cases with Playwright or a similar tool. If you want to learn properly from manual fundamentals and defect workflows through to leveraging AI in testing with real projects, a structured Tester course will help you progress fast and apply with confidence.",
        "次は、最初からより明確な受け入れ基準を書くスキルを鍛えるべきです（ACが明確なほどAIの出力も正確になります）。また、承認済みテストケースの一部をPlaywrightなどのツールで自動化する方法も学びましょう。マニュアルの基礎、バグ処理の流れから、実際の案件でテストにAIを活用するスキルまで体系的に学びたいなら、体系立てられたテスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const AI_TESTCASE_01 = makeDoc({
  slug: "ai-sinh-testcase-tu-user-story",
  domain: "saas",
  primaryKeyword: "AI sinh testcase",
  keywords: ["AI sinh testcase", "AI tạo testcase từ user story", "prompt testcase AI", "AI trong kiểm thử phần mềm", "tester dùng AI"],
  coverLabel: "AI · SINH TESTCASE · USER STORY",
  crumb: "AI sinh testcase tự động từ user story",
  metaTitle: { vi: "AI sinh testcase tự động từ user story cho Tester", en: "Auto-generating test cases from a user story with AI", ja: "AIでユーザーストーリーからテストケースを自動生成" },
  metaDescription: {
    vi: "AI sinh testcase tự động từ user story: viết prompt chuẩn, tránh bỏ sót ca biên, review trước khi đưa vào Jira, ví dụ thật trên TaskPilot, kèm trắc nghiệm.",
    en: "Auto-generating test cases from a user story with AI: writing solid prompts, avoiding missed boundary cases or invented rules, reviewing before Jira, real examples on the TaskPilot app plus a quiz.",
    ja: "AIでユーザーストーリーからテストケースを自動生成：確かなプロンプトの書き方、境界値の見落としや作り話の回避、Jira登録前のレビュー、TaskPilotアプリでの実例とクイズ付き。",
  },
  title: {
    vi: "AI sinh testcase tự động từ user story: prompt thật, review đúng cách (có trắc nghiệm)",
    en: "Auto-generating test cases from a user story with AI: real prompts, proper review (with quiz)",
    ja: "AIによるユーザーストーリーからのテストケース自動生成：実際のプロンプトと正しいレビュー（クイズ付き）",
  },
  summary: {
    vi: "Bài công nghệ: dùng AI sinh testcase tự động từ user story qua app SaaS quản lý dự án TaskPilot. Cách chuẩn hoá user story + acceptance criteria, viết prompt template có ràng buộc, review đối chiếu AC để bắt ca thiếu/ca bịa, đưa vào Jira/TestRail đúng quy trình, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "A technology article: using AI to auto-generate test cases from a user story via the SaaS project-management app TaskPilot. Standardizing the user story and acceptance criteria, writing a constrained prompt template, reviewing against the AC to catch missing/invented cases, pushing into Jira/TestRail properly, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "技術記事：SaaSプロジェクト管理アプリTaskPilotを通じ、AIでユーザーストーリーからテストケースを自動生成。ユーザーストーリーと受け入れ基準の標準化、制約付きプロンプトテンプレートの作成、ACと照合して不足/作り話のケースを発見するレビュー、Jira/TestRailへの正しい登録、多数のUIモック、FAQと5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách dùng AI sinh testcase từ user story", steps: [
    { name: "Chuẩn hoá user story + acceptance criteria", text: "Viết theo mẫu As a/I want/So that, kèm AC có con số cụ thể." },
    { name: "Viết prompt có ràng buộc rõ", text: "Nêu vai trò AI, định dạng đầu ra, và ràng buộc bắt buộc (ví dụ ca kiểm biên)." },
    { name: "Review, đối chiếu AC rồi mới đưa vào Jira/TestRail", text: "Loại ca bịa nghiệp vụ, bổ sung ca thiếu, gắn testcase với đúng user story gốc." },
  ] },
  pages,
});

export const CNM_AI_TESTCASE_01 = [AI_TESTCASE_01];
