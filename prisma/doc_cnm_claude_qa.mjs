// doc_cnm_claude_qa.mjs — BÀI "TRUNG CẤP · CHUYÊN CÔNG NGHỆ": Dùng Claude Code (AI) để tự động hoá
// công việc QA — sinh testcase, viết & bảo trì test tự động, phân tích log lỗi, tóm tắt RCA.
// Bám app SaaS "QAFlow" (nền tảng quản lý dự án & kiểm thử, dogfood nội bộ). Thực chiến, có
// lệnh/prompt thật + mockup giao diện thật (browser/panel/grid/moduleFlow/dashboard).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, dashboard, moduleFlow } from "./ui_mock.mjs";

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
    categorySlug: "claude-testing", slug: cfg.slug, cover, level: "intermediate",
    tags: tags("congnghe", "saas", "aitesting", "intermediate", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình QAFlow — user story chưa có testcase ──
const m_app = browser("qaflow.io/du-an/billing-service/backlog", [
  panel("QAFlow · Backlog · Sprint 24 — Billing Service", [
    field(24, 20, 330, "User story", "US-482: Áp mã khuyến mãi khi nâng cấp gói Pro", "normal"),
    field(372, 20, 330, "Trạng thái testcase", "Chưa có testcase nào", "error"),
    field(24, 92, 330, "Người phụ trách QA", "Minh Anh", "normal"),
    field(372, 92, 330, "Độ ưu tiên", "Cao", "normal"),
    btn(24, 164, 260, "Sinh testcase bằng Claude Code", "primary"),
    annotate(368, 10, 340, 52, "THIẾU: 0 ca kiểm thử cho US-482"),
  ].join(""), { h: 320, accent: "#0369a1" }),
].join(""), { h: 376, title: "QAFlow · SaaS QA", accent: "#0369a1" });

// ── Mockup 2: terminal Claude Code CLI đang sinh & sửa test ──
const termLine = (y, text, color) =>
  `<text x="24" y="${y}" font-size="12.5" font-family="Menlo,Consolas,monospace" fill="${color}">${text}</text>`;
const m_terminal = panel("Terminal · Claude Code CLI · repo qaflow-web", [
  `<rect x="0" y="0" width="760" height="260" fill="#0b1020"/>`,
  termLine(34, "$ claude", "#38bdf8"),
  termLine(58, "&gt; Doc user story US-482 (ap ma khuyen mai khi nang cap Pro), sinh testcase", "#e2e8f0"),
  termLine(82, "OK Da doc user story + billing-service/openapi.yaml", "#4ade80"),
  termLine(106, "OK Sinh 12 testcase: 5 happy path, 4 edge case, 3 negative", "#4ade80"),
  termLine(130, "OK Ghi file tests/billing/promo-code.feature", "#4ade80"),
  termLine(162, "$ claude 'sua testcase flaky: doi selector sang data-testid'", "#38bdf8"),
  termLine(186, "OK Da sua 3 file, thay 7 selector CSS bang data-testid", "#4ade80"),
  termLine(210, "OK Chay lai bo test: 12/12 pass, 0 flaky", "#4ade80"),
].join(""), { h: 300, accent: "#0f172a" });

// ── Mockup 3: bảng so sánh testcase viết tay vs Claude Code ──
const m_grid = grid("So sánh: testcase viết tay vs Claude Code sinh (rồi Tester review)", ["Tiêu chí", "Viết tay (1 QA)", "Claude Code + review"], [
  ["Thời gian cho 1 user story", "45–60 phút", "5–8 phút sinh + 10 phút review"],
  ["Số ca trung bình", "6–8 ca", "12–15 ca (thêm biên/âm tính)"],
  ["Bao phủ ca biên", "Phụ thuộc kinh nghiệm", "Gợi ý dữ liệu biên, timeout, rỗng"],
  ["Rủi ro chính", "Bỏ sót do vội, thiếu thời gian", "Có thể sinh ca thừa/sai nghiệp vụ"],
  ["Ai chốt bộ testcase cuối", "Chính QA đó", "QA review & duyệt, không tự động"],
], { accent: "#0369a1", highlight: 2 });

// ── Mockup 4: luồng tự động hoá QA với Claude Code (moduleFlow) ──
const m_flow = moduleFlow("Luồng tự động hoá QA với Claude Code — QAFlow Billing", [
  { id: "story", label: "User Story", x: 90, y: 60, sub: "US-482 QAFlow" },
  { id: "claude1", label: "Claude Code", x: 250, y: 60, sub: "sinh testcase" },
  { id: "suite", label: "Test Suite", x: 410, y: 60, sub: "Playwright" },
  { id: "ci", label: "CI Pipeline", x: 570, y: 60, sub: "GitHub Actions" },
  { id: "log", label: "Log lỗi", x: 570, y: 200, sub: "run thất bại" },
  { id: "claude2", label: "Claude Code", x: 410, y: 200, sub: "phân tích RCA" },
  { id: "ticket", label: "Ticket QAFlow", x: 250, y: 200, sub: "kèm nguyên nhân gốc" },
], [
  { from: "story", to: "claude1", label: "đọc yêu cầu" },
  { from: "claude1", to: "suite", label: "sinh test" },
  { from: "suite", to: "ci", label: "chạy CI" },
  { from: "ci", to: "log", label: "pipeline đỏ", bad: true },
  { from: "log", to: "claude2", label: "phân tích" },
  { from: "claude2", to: "ticket", label: "tạo RCA" },
], { accent: "#0369a1", h: 260 });

// ── Mockup 5: log CI có khoanh vùng dòng lỗi ──
const logLine = (y, text, color) =>
  `<text x="30" y="${y}" font-size="11.5" font-family="Menlo,Consolas,monospace" fill="${color}">${text}</text>`;
const m_cilog = browser("github.com/qaflow/billing-service/actions/runs/48213", [
  panel("CI · billing-service · run #48213 — 3 test FAILED", [
    `<rect x="16" y="10" width="708" height="236" rx="10" fill="#0b1020"/>`,
    logLine(34, "214  POST /coupon/validate  code=PROMO20", "#94a3b8"),
    logLine(56, "215  waiting response ...", "#94a3b8"),
    logLine(78, "220  timeout after 8000ms (elapsed 9412ms)", "#f87171"),
    logLine(100, "221  test failed: promo-code.spec.ts:42 expect(discount).toBe(20)", "#f87171"),
    logLine(122, "233  POST /coupon/validate  code=PROMO20", "#94a3b8"),
    logLine(144, "241  timeout after 8000ms (elapsed 9260ms)", "#f87171"),
    annotate(28, 66, 500, 46, "Claude Code: nghi timeout API /coupon/validate (~9.4s)"),
  ].join(""), { h: 300, accent: "#dc2626" }),
].join(""), { h: 356, title: "QAFlow · CI/CD", accent: "#dc2626" });

// ── Mockup 6: dashboard hiệu quả 30 ngày ──
const m_dash = dashboard("Hiệu quả tự động hoá QA — billing-service (30 ngày)", [
  { label: "Testcase Claude Code sinh", value: "186", sub: "cho 24 user story", color: "#0369a1" },
  { label: "Thời gian viết test giảm", value: "62%", sub: "so với viết tay", color: "#16a34a" },
  { label: "Test flaky đã sửa", value: "41", sub: "nhờ prompt bảo trì", color: "#f59e0b" },
  { label: "Thời gian ra RCA", value: "6 phút", sub: "giảm từ 45 phút", color: "#dc2626" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Claude Code có thể thay thế hoàn toàn Tester trong việc kiểm thử QAFlow không?",
  "Can Claude Code fully replace a tester on QAFlow?",
  "Không. Claude Code giỏi sinh thảo bộ testcase, viết code test lặp lại và lọc log nhanh, nhưng không tự có kiến thức nghiệp vụ ẩn (như hành vi race-condition đa thiết bị), không tự chịu trách nhiệm về mức rủi ro, và không thay bạn ký duyệt phát hành. Vai trò thực tế là trợ lý tăng tốc; Tester vẫn là người quyết định cuối cùng.",
  "No. Claude Code excels at drafting testcase sets, writing repetitive test code, and quickly filtering logs, but it doesn't inherently know hidden business behavior (like multi-device race conditions), doesn't own risk-level decisions, and can't sign off a release for you. In practice it's a speed-up assistant; the tester remains the final decision-maker.",
  "Claude CodeはQAFlowのテストにおいてテスターを完全に置き換えられますか？",
  "いいえ。Claude Codeはテストケース群の下書き作成、反復的なテストコードの記述、ログの高速な絞り込みが得意ですが、隠れた業務知識（マルチデバイスのレースコンディションなど）を自ら知っているわけではなく、リスクレベルの判断責任も負わず、リリースの承認もできません。実際の役割は作業を加速させるアシスタントであり、最終決定者は依然としてテスターです。");
const faq2 = FAQ(
  "Đưa log lỗi hay mã nguồn QAFlow cho Claude Code phân tích có an toàn dữ liệu không?",
  "Is it safe to hand QAFlow's error logs or source code to Claude Code for analysis?",
  "An toàn nếu bạn làm đúng quy trình: dùng tài khoản được cấp quyền theo đúng phạm vi repo, che (redact) token/API key/thông tin khách hàng trước khi dán log, và tuân theo chính sách bảo mật nội bộ về dữ liệu được phép đưa cho công cụ AI. Không nên dán nguyên log production chứa dữ liệu khách hàng thật mà chưa lọc.",
  "It's safe if you follow the process correctly: use an account scoped to the right repo access, redact tokens/API keys/customer info before pasting logs, and follow your organization's internal policy on what data may be given to an AI tool. You should not paste raw production logs containing real, unfiltered customer data.",
  "QAFlowのエラーログやソースコードをClaude Codeに分析させるのはデータ的に安全ですか？",
  "正しい手順を踏めば安全です：適切なリポジトリ範囲にスコープされたアカウントを使い、ログを貼る前にトークン/APIキー/顧客情報をマスキングし、AIツールに渡してよいデータに関する社内のセキュリティポリシーに従ってください。フィルタされていない実際の顧客データを含む本番ログをそのまま貼り付けるべきではありません。");
const faq3 = FAQ(
  "Không biết lập trình thì có dùng Claude Code cho automation testing QAFlow được không?",
  "If I can't code, can I still use Claude Code for QAFlow's automation testing?",
  "Bạn vẫn dùng được ở mức sinh testcase và đọc tóm tắt log/RCA — vì đó là prompt bằng ngôn ngữ tự nhiên. Nhưng để viết/bảo trì test Playwright hiệu quả, bạn nên hiểu cơ bản cấu trúc test (selector, assertion, page object) để đọc hiểu và review được đoạn code Claude Code sinh ra, tránh merge nhầm test sai logic mà không biết.",
  "You can still use it for generating testcases and reading log/RCA summaries — since those are natural-language prompts. But to write/maintain Playwright tests effectively, you should understand basic test structure (selectors, assertions, page objects) so you can read and review the code Claude Code generates, avoiding merging a logically wrong test without realizing it.",
  "プログラミングができなくても、QAFlowの自動化テストでClaude Codeを使えますか？",
  "テストケース生成やログ/RCA要約の読み取りには使えます — それらは自然言語のプロンプトだからです。しかし、Playwrightテストを効果的に作成・保守するには、テスト構造（セレクタ、アサーション、Page Object）の基本を理解し、Claude Codeが生成したコードを読んでレビューできるようにすべきです。そうしないと、ロジックが誤ったテストに気づかずマージしてしまう恐れがあります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trong quy trình ở bài này, Claude Code phù hợp nhất để làm việc nào?", en: "In this article's workflow, which task is Claude Code best suited for?", ja: "本記事のワークフローで、Claude Codeが最も適している作業はどれですか？" },
    options: [
      { vi: "Tự quyết định mức độ rủi ro và ký duyệt phát hành", en: "Deciding risk levels and signing off releases on its own", ja: "リスクレベルを自ら判断しリリースを承認すること" },
      { vi: "Sinh thảo testcase, viết/bảo trì test lặp lại, lọc log CI", en: "Drafting testcases, writing/maintaining repetitive tests, filtering CI logs", ja: "テストケースの下書き作成、反復的なテストの作成・保守、CIログの絞り込み" },
      { vi: "Thay Product Owner quyết định nghiệp vụ", en: "Replacing the Product Owner's business decisions", ja: "Product Ownerに代わってビジネス上の意思決定をすること" },
      { vi: "Tự động publish bản vá lên production mà không cần review", en: "Automatically publishing a patch to production without review", ja: "レビューなしで本番環境にパッチを自動公開すること" },
    ], correct: 1,
    explain: { vi: "Claude Code tăng tốc việc sinh testcase, viết/bảo trì test và lọc log — còn quyết định rủi ro, nghiệp vụ và phát hành vẫn thuộc về con người.", en: "Claude Code speeds up drafting testcases, writing/maintaining tests, and filtering logs — risk, business, and release decisions remain human responsibilities.", ja: "Claude Codeはテストケース生成、テスト作成・保守、ログ絞り込みを高速化しますが、リスク・業務・リリースの判断は引き続き人間の責任です。" },
  }),
  mcq({
    q: { vi: "Sau khi Claude Code sinh xong bộ testcase từ user story, bước tiếp theo ĐÚNG là gì?", en: "After Claude Code generates a testcase set from a user story, what's the correct next step?", ja: "Claude Codeがユーザーストーリーからテストケース群を生成した後、正しい次のステップは？" },
    options: [
      { vi: "Merge ngay để tiết kiệm thời gian", en: "Merge it right away to save time", ja: "時間節約のためすぐマージする" },
      { vi: "Xoá hết vì không tin AI", en: "Delete everything because you don't trust AI", ja: "AIを信用しないのですべて削除する" },
      { vi: "Review, bỏ ca không phù hợp, bổ sung ca nghiệp vụ đặc thù rồi mới dùng", en: "Review it, remove unfit cases, add domain-specific cases, then use it", ja: "レビューし、不適切なケースを削除し、業務特有のケースを追加してから使う" },
      { vi: "Gửi thẳng cho khách hàng xác nhận", en: "Send it straight to the customer for confirmation", ja: "そのまま顧客に確認を依頼する" },
    ], correct: 2,
    explain: { vi: "Testcase Claude Code sinh là bản nháp; luôn cần Tester review, loại ca không hợp, thêm ca đặc thù nghiệp vụ trước khi dùng chính thức.", en: "Claude Code's testcases are a draft; a tester must always review, remove unfit cases, and add domain-specific ones before official use.", ja: "Claude Codeが生成したテストケースは下書きであり、正式利用の前に必ずテスターがレビューし、不適切なケースを除き、業務特有のケースを追加する必要があります。" },
  }),
  mcq({
    q: { vi: "9 test Playwright đỏ đồng loạt sau khi đổi thư viện UI, nhưng tính năng vẫn đúng khi test tay. Nguyên nhân nhiều khả năng nhất là gì?", en: "9 Playwright tests all fail after a UI library change, but the feature still works when tested manually. What's the most likely cause?", ja: "UIライブラリ変更後にPlaywrightテスト9件が一斉に失敗したが、手動テストでは機能は正しく動く。最も可能性が高い原因は？" },
    options: [
      { vi: "Selector cũ (CSS class) không còn khớp với UI mới", en: "The old selector (CSS class) no longer matches the new UI", ja: "古いセレクタ（CSSクラス）が新しいUIと一致しなくなった" },
      { vi: "API backend bị lỗi nghiệp vụ nghiêm trọng", en: "The backend API has a serious business logic bug", ja: "バックエンドAPIに深刻な業務ロジックのバグがある" },
      { vi: "Máy chủ CI bị hỏng phần cứng", en: "The CI server has a hardware failure", ja: "CIサーバーのハードウェア障害" },
      { vi: "Khách hàng nhập sai dữ liệu", en: "The customer entered wrong data", ja: "顧客が誤ったデータを入力した" },
    ], correct: 0,
    explain: { vi: "Test dùng selector CSS dễ vỡ khi giao diện đổi thư viện; đây là lỗi test, không phải lỗi app — nên sửa selector, không báo bug nghiệp vụ.", en: "Tests using CSS selectors easily break when the UI library changes; this is a test issue, not an app bug — fix the selector rather than filing a business bug.", ja: "CSSセレクタを使うテストはUIライブラリ変更で壊れやすい。これはアプリのバグではなくテストの問題 — 業務バグとして報告せずセレクタを修正すべき。" },
  }),
  mcq({
    q: { vi: "Khi nhờ Claude Code viết báo cáo RCA, phần nào KHÔNG nên bỏ qua để dev tin và sửa đúng chỗ?", en: "When asking Claude Code to write an RCA report, which part should NOT be skipped so developers trust it and fix the right thing?", ja: "Claude CodeにRCA報告を書かせる際、開発者が信頼し正しく修正できるよう省略すべきでない部分は？" },
    options: [
      { vi: "Bằng chứng cụ thể (dòng log, commit liên quan)", en: "Concrete evidence (log lines, related commit)", ja: "具体的な証拠（ログ行、関連コミット）" },
      { vi: "Emoji trang trí báo cáo", en: "Decorative emoji in the report", ja: "報告書を飾る絵文字" },
      { vi: "Tên đầy đủ của mọi thành viên team", en: "The full names of every team member", ja: "チーム全員のフルネーム" },
      { vi: "Màu sắc giao diện QAFlow", en: "QAFlow's UI colors", ja: "QAFlowのUIの色" },
    ], correct: 0,
    explain: { vi: "RCA thuyết phục cần bằng chứng cụ thể (dòng log, commit) để dev xác minh và sửa đúng nguyên nhân gốc, không chỉ là mô tả chung chung.", en: "A convincing RCA needs concrete evidence (log lines, commits) so developers can verify and fix the real root cause, not just a vague description.", ja: "説得力のあるRCAには、開発者が検証し本当の根本原因を修正できるよう、曖昧な説明ではなく具体的な証拠（ログ行、コミット）が必要です。" },
  }),
  mcq({
    q: { vi: "Trước khi dán log CI thật vào prompt cho Claude Code phân tích, bạn nên làm gì?", en: "Before pasting a real CI log into a prompt for Claude Code to analyze, what should you do?", ja: "実際のCIログをClaude Code分析用プロンプトに貼り付ける前に、何をすべき？" },
    options: [
      { vi: "Dán nguyên log để giữ đầy đủ thông tin", en: "Paste the raw log to keep full information", ja: "情報を完全に保つため生ログをそのまま貼る" },
      { vi: "Che (redact) token/API key/dữ liệu khách hàng nhạy cảm trước khi dán", en: "Redact tokens/API keys/sensitive customer data before pasting", ja: "貼り付ける前にトークン/APIキー/機密顧客データをマスキングする" },
      { vi: "Xoá hết log, chỉ mô tả bằng lời", en: "Delete the whole log and only describe it verbally", ja: "ログをすべて削除し、口頭説明だけにする" },
      { vi: "Gửi log qua kênh chat công khai trước để mọi người xem", en: "Post the log in a public chat channel first for everyone to see", ja: "まず公開チャットチャンネルにログを投稿してみんなに見せる" },
    ], correct: 1,
    explain: { vi: "Cần che thông tin nhạy cảm (token, API key, dữ liệu khách hàng) trước khi đưa log cho công cụ AI, tránh rò rỉ bí mật ra ngoài phạm vi cần thiết.", en: "Sensitive info (tokens, API keys, customer data) must be redacted before handing a log to an AI tool, to avoid leaking secrets beyond what's needed.", ja: "AIツールにログを渡す前に、機密情報（トークン、APIキー、顧客データ）をマスキングし、必要以上の秘密漏洩を防ぐ必要があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bức tranh QAFlow", en: "1. TL;DR & the QAFlow picture", ja: "1. 要点とQAFlowの全体像" },
    blocks: [
      TLDR("Bài này hướng dẫn dùng Claude Code — trợ lý AI chạy trong terminal — để tự động hoá 4 việc QA trên SaaS QAFlow: sinh testcase từ user story, viết và bảo trì test Playwright, phân tích log lỗi CI/CD, và tóm tắt nguyên nhân gốc (RCA). Bạn sẽ thấy lệnh/prompt thật, mockup giao diện QAFlow và pipeline CI, cùng 2 tình huống thực chiến và trắc nghiệm cuối bài.",
        "This article shows how to use Claude Code — an AI assistant running in your terminal — to automate 4 QA tasks on the QAFlow SaaS product: generating testcases from user stories, writing and maintaining Playwright tests, analyzing CI/CD failure logs, and summarizing root cause analysis (RCA). You'll see real commands/prompts, QAFlow UI and CI pipeline mockups, two real-world situations, and a quiz at the end.",
        "本記事では、ターミナルで動くAIアシスタント「Claude Code」を使い、SaaS製品QAFlowで4つのQA業務を自動化する方法を紹介します：ユーザーストーリーからのテストケース生成、Playwrightテストの作成・保守、CI/CD失敗ログの分析、そして根本原因分析（RCA）の要約です。実際のコマンド/プロンプト、QAFlowの画面とCIパイプラインのモック、2つの実戦シーン、最後にクイズを用意しています。"),
      P("QAFlow là SaaS quản lý dự án & kiểm thử mà chính đội QA của CyberSoft dùng hằng ngày — tính năng đang được nâng cấp là Billing: cho phép khách hàng áp mã khuyến mãi khi nâng cấp gói Pro. Với lượng user story tăng nhanh mỗi sprint, đội QA không thể viết tay hết mọi testcase, mọi test Playwright, và đọc hết log CI mỗi khi pipeline đỏ. Claude Code — công cụ dòng lệnh chạy ngay trong terminal, đọc được mã nguồn và log của bạn — giúp làm nhanh các việc lặp lại đó, còn Tester tập trung vào việc cần tư duy nghiệp vụ: review kết quả, quyết định ca nào thật sự cần, và xác nhận nguyên nhân gốc trước khi báo dev.",
        "QAFlow is a project & test management SaaS that CyberSoft's own QA team uses every day — the feature currently being upgraded is Billing: letting customers apply a promo code when upgrading to the Pro plan. With user stories piling up every sprint, the QA team can't hand-write every testcase, every Playwright test, and read every CI log line each time a pipeline turns red. Claude Code — a command-line tool that runs right in your terminal and can read your source code and logs — speeds up those repetitive tasks, freeing testers to focus on work that needs business judgment: reviewing results, deciding which cases truly matter, and confirming the root cause before reporting to developers.",
        "QAFlowはCyberSoftのQAチーム自身が毎日使うプロジェクト・テスト管理SaaSです。現在アップグレード中の機能はBilling（課金）：Proプランへのアップグレード時にプロモコードを適用できるようにするものです。スプリントごとにユーザーストーリーが増える中、QAチームはすべてのテストケースやPlaywrightテストを手作業で書き、パイプラインが赤くなるたびに全ログを読むことはできません。ターミナルで動き、ソースコードとログを読めるコマンドラインツール「Claude Code」は、こうした反復作業を高速化し、テスターは結果のレビュー、本当に必要なケースの判断、開発者への報告前の根本原因確認など、ビジネス判断が必要な仕事に集中できます。"),
      IMG(m_app, "Màn hình QAFlow: user story US-482 (áp mã khuyến mãi khi nâng cấp Pro) chưa có testcase nào", "QAFlow screen: user story US-482 (apply promo code on Pro upgrade) has no testcases yet", "QAFlow画面：ユーザーストーリーUS-482（Proアップグレード時のプロモコード適用）にまだテストケースがない"),
      DEF("Claude Code", "công cụ dòng lệnh AI của Anthropic, chạy trong terminal, đọc được mã nguồn/log của dự án để giúp sinh testcase, viết code, sửa lỗi và tóm tắt theo yêu cầu (prompt) của bạn.",
        "Anthropic's AI command-line tool that runs in your terminal, reads your project's source code/logs, and helps generate testcases, write code, fix bugs, and summarize based on your prompts.",
        "Anthropicのコマンドライン型AIツール。ターミナルで動作し、プロジェクトのソースコードやログを読み取り、プロンプトに応じてテストケース生成・コード作成・バグ修正・要約を支援する。"),
    ] },
  { heading: { vi: "2. Chuẩn bị: cài đặt Claude Code & kết nối repo", en: "2. Prepare: install Claude Code & connect repos", ja: "2. 準備：Claude Codeのインストールとリポジトリ接続" },
    blocks: [
      P("Trước khi giao việc cho Claude Code, bạn cần cài đặt và cho nó quyền đọc đúng phạm vi cần thiết — không hơn. Với QAFlow, phạm vi làm việc là 2 repo: qaflow-web (frontend) và billing-service (API), cùng file đặc tả openapi.yaml.",
        "Before handing tasks to Claude Code, you need to install it and grant it access to just the scope it needs — nothing more. For QAFlow, the working scope is two repos: qaflow-web (frontend) and billing-service (API), plus the openapi.yaml spec file.",
        "Claude Codeに作業を任せる前に、インストールし、必要な範囲だけにアクセス権を与えます — それ以上は与えません。QAFlowでは作業範囲はqaflow-web（フロントエンド）とbilling-service（API）の2つのリポジトリ、およびopenapi.yaml仕様ファイルです。"),
      STEP(1, "Cài Claude Code CLI theo hướng dẫn chính thức, đăng nhập tài khoản được cấp quyền truy cập repo QAFlow.", "Install the Claude Code CLI following the official guide, sign in with an account granted access to the QAFlow repos.", "公式ガイドに従いClaude Code CLIをインストールし、QAFlowリポジトリへのアクセス権を持つアカウントでログインする。"),
      STEP(2, "Mở thư mục repo qaflow-web, chạy claude để bắt đầu phiên làm việc; xác nhận phạm vi thư mục mà công cụ được phép đọc/ghi.", "Open the qaflow-web repo folder, run claude to start a session; confirm which folders the tool may read/write.", "qaflow-webリポジトリのフォルダを開き、claudeを実行してセッションを開始。ツールが読み書きできるフォルダ範囲を確認する。"),
      STEP(3, "Thêm file CLAUDE.md ngắn ghi quy ước dự án: khung test dùng Playwright, thư mục tests/, cách đặt tên test, để Claude Code sinh đúng convention.", "Add a short CLAUDE.md noting project conventions: Playwright as the test framework, the tests/ folder, naming rules — so Claude Code follows them.", "テストフレームワークはPlaywright、tests/フォルダ、命名規則などプロジェクトの規約を短いCLAUDE.mdに記載し、Claude Codeがそれに従うようにする。"),
      TRY("Chạy thử claude \"liệt kê các endpoint trong openapi.yaml của billing-service liên quan tới coupon\" và xem Claude Code tóm tắt đúng không.", "Try running claude \"list the endpoints in billing-service's openapi.yaml related to coupons\" and check if Claude Code's summary is accurate.", "claude「billing-serviceのopenapi.yamlでクーポン関連のエンドポイントを一覧して」を実行し、Claude Codeの要約が正しいか確認してみよう。"),
      PITFALL("Cho Claude Code quyền ghi trên toàn bộ máy hoặc production config thay vì chỉ thư mục làm việc — rất dễ rò rỉ secret hoặc sửa nhầm file không liên quan.", "Granting Claude Code write access to your whole machine or production config instead of just the working folder — easy to leak secrets or edit unrelated files by mistake.", "作業フォルダだけでなくマシン全体や本番設定への書き込み権限を与えてしまう — シークレット漏洩や無関係なファイルの誤編集を招きやすい。"),
      IMG(m_terminal, "Terminal Claude Code CLI đang đọc user story và sinh testcase cho repo qaflow-web", "Claude Code CLI terminal reading a user story and generating testcases for the qaflow-web repo", "ユーザーストーリーを読み取りqaflow-webリポジトリのテストケースを生成するClaude Code CLIターミナル"),
    ] },
  { heading: { vi: "3. Sinh testcase từ user story bằng Claude Code", en: "3. Generating testcases from a user story with Claude Code", ja: "3. Claude Codeでユーザーストーリーからテストケースを生成" },
    blocks: [
      P("Việc lặp đi lặp lại nhất của Tester là đọc một user story rồi nghĩ ra đủ ca kiểm thử: happy path, ca biên, ca âm tính. Claude Code có thể đọc cùng lúc user story trong QAFlow và đặc tả API để đề xuất một bộ testcase đầy đủ hơn bạn tự nghĩ trong vài phút đầu.",
        "The most repetitive task for a tester is reading a user story and thinking of enough test cases: happy path, edge cases, negative cases. Claude Code can read the QAFlow user story together with the API spec to propose a more complete testcase set than you'd think of in the first few minutes.",
        "テスターの最も反復的な作業は、ユーザーストーリーを読み、十分なテストケース（正常系・境界値・異常系）を考えることです。Claude Codeは、QAFlowのユーザーストーリーとAPI仕様を同時に読み込み、最初の数分で思いつくよりも網羅的なテストケース群を提案できます。"),
      CODE("bash", "claude \"Doc user story US-482 trong QAFlow (ap ma khuyen mai PROMO20 khi\nnang cap goi Pro) va billing-service/openapi.yaml. Sinh bo testcase dang\nGherkin cho: ma hop le, ma het han, ma sai dinh dang, ma da dung het luot,\nap 2 ma cung luc, nang cap khi dang co invoice chua thanh toan.\nGhi ra tests/billing/promo-code.feature\""),
      CODE("gherkin", "Feature: Ap ma khuyen mai khi nang cap goi Pro\n\n  Scenario: Ma khuyen mai hop le giam dung so tien\n    Given tai khoan dang o goi Free\n    When nhap ma \"PROMO20\" va chon nang cap goi Pro\n    Then hoa don giam 20% va trang thai la \"Da ap dung\"\n\n  Scenario: Ma khuyen mai da het luot su dung\n    Given ma \"PROMO20\" da dat gioi han luot dung\n    When nhap ma \"PROMO20\" va chon nang cap goi Pro\n    Then he thong bao \"Ma da het luot su dung\" va khong doi gia"),
      P("Bộ testcase Claude Code sinh ra là bản NHÁP tốt để bắt đầu, không phải bản cuối. Việc của bạn là đọc lại, bỏ ca không phù hợp nghiệp vụ, và bổ sung ca đặc thù mà chỉ người hiểu sản phẩm mới nghĩ ra — ví dụ ca 'nâng cấp khi đang có invoice chưa thanh toán' ở trên chính là ca Claude Code gợi ý nhưng bạn cần xác nhận với Product Owner có đúng nghiệp vụ hay không.",
        "The testcase set Claude Code generates is a good DRAFT to start from, not the final version. Your job is to review it, remove cases that don't fit the business, and add specific cases that only someone who understands the product would think of — for example, the 'upgrading while an invoice is unpaid' case above is one Claude Code suggested, but you still need to confirm with the Product Owner whether it's actually correct business behavior.",
        "Claude Codeが生成するテストケース群は、始めるのに良い「下書き」であり、最終版ではありません。あなたの仕事は見直し、業務に合わないケースを削除し、製品を理解している人だけが思いつく特有のケースを追加することです — 例えば上記の「未払いインボイスがある状態でのアップグレード」は、Claude Codeが提案したケースですが、それが本当に正しい業務仕様かはProduct Ownerに確認する必要があります。"),
      IMG(m_grid, "So sánh testcase: viết tay một mình vs. Claude Code sinh rồi Tester review", "Testcase comparison: hand-written solo vs. Claude Code generated then tester-reviewed", "テストケース比較：一人で手書き vs. Claude Code生成＋テスターレビュー"),
    ] },
  { heading: { vi: "4. Viết & bảo trì test tự động (Playwright) với Claude Code", en: "4. Writing & maintaining automated (Playwright) tests with Claude Code", ja: "4. Claude CodeでPlaywrightテストを作成・保守する" },
    blocks: [
      P("Từ file .feature ở bước trước, bạn có thể nhờ Claude Code hiện thực hoá thành test Playwright thật, tái dùng Page Object đã có trong repo qaflow-web thay vì viết lại từ đầu.",
        "From the .feature file in the previous step, you can ask Claude Code to turn it into real Playwright tests, reusing the Page Objects already in the qaflow-web repo instead of writing everything from scratch.",
        "前のステップの.featureファイルから、Claude Codeに実際のPlaywrightテストへ変換してもらえます。qaflow-webリポジトリに既にあるPage Objectを再利用し、ゼロから書く必要はありません。"),
      CODE("bash", "claude \"Hien thuc hoa tests/billing/promo-code.feature thanh Playwright,\ndung page object co san billing.page.ts. Uu tien chon phan tu bang\ndata-testid, cho network idle truoc khi assert so tien tren hoa don.\nGhi vao tests/billing/promo-code.spec.ts\""),
      P("Test tự động không tự nhiên sống lâu — giao diện đổi, selector đổi, test bắt đầu flaky. Claude Code cũng dùng được cho việc bảo trì: đọc báo cáo Playwright, xác định test nào fail vì thay đổi giao diện thật (cần sửa test) và test nào fail vì lỗi thật của app (cần báo dev), rồi tự sửa phần thuộc về test.",
        "Automated tests don't stay alive on their own — the UI changes, selectors change, tests start flaking. Claude Code is also useful for maintenance: reading the Playwright report, telling apart tests that fail due to a real UI change (test needs fixing) from ones failing due to a real app bug (needs reporting to dev), then fixing the test-side issues itself.",
        "自動テストは放っておいても生き続けません — UIが変わり、セレクタが変わり、テストがフレーキーになり始めます。Claude Codeは保守にも使えます：Playwrightレポートを読み、実際のUI変更で失敗したテスト（テスト側の修正が必要）と、実際のアプリのバグで失敗したテスト（開発者への報告が必要）を見分け、テスト側の問題は自ら修正します。"),
      CODE("bash", "claude \"3 test trong promo-code.spec.ts dang fail. Doc report Playwright o\nplaywright-report/. Neu do doi selector .btn-apply-code, sua sang\ndata-testid=billing-apply-code trong toan bo file lien quan. Neu la loi\nthat cua app thi KHONG tu sua test, chi ghi ro de bao dev.\""),
      IMG(m_flow, "Luồng tự động hoá: user story → Claude Code sinh test → chạy CI → log lỗi → Claude Code phân tích RCA → ticket", "Automation flow: user story → Claude Code generates tests → CI run → failure log → Claude Code RCA → ticket", "自動化フロー：ユーザーストーリー→Claude Codeがテスト生成→CI実行→失敗ログ→Claude CodeがRCA分析→チケット"),
      TIP("Luôn để Claude Code sửa test trong một nhánh git riêng và đọc lại diff trước khi merge — kể cả khi bạn tin tưởng công cụ.", "Always have Claude Code make test edits on a separate git branch and review the diff before merging — even when you trust the tool.", "たとえツールを信頼していても、Claude Codeによるテスト修正は必ず別のgitブランチで行い、マージ前にdiffを確認する。"),
    ] },
  { heading: { vi: "5. Phân tích log lỗi CI/CD bằng Claude Code", en: "5. Analyzing CI/CD failure logs with Claude Code", ja: "5. Claude CodeによるCI/CD失敗ログの分析" },
    blocks: [
      P("Khi pipeline CI của billing-service chuyển đỏ lúc 2 giờ sáng, không ai muốn đọc 800 dòng log để tìm đúng 3 dòng quan trọng. Bạn có thể dán log hoặc trỏ Claude Code tới file log của lần chạy để nó lọc ra phần liên quan và nghi vấn ban đầu.",
        "When the billing-service CI pipeline turns red at 2 a.m., nobody wants to scroll through 800 lines of log to find the 3 that matter. You can paste the log or point Claude Code at the run's log file so it filters the relevant part and forms an initial hypothesis.",
        "billing-serviceのCIパイプラインが深夜2時に赤くなったとき、誰も800行のログから重要な3行を探したくありません。ログを貼り付けるか、実行ログファイルをClaude Codeに指定すれば、関連部分を絞り込み最初の仮説を立ててくれます。"),
      CODE("bash", "claude \"Day la log CI run #48213 (dan log.txt cua billing-service). 3 test\ntrong promo-code.spec.ts fail. So khop voi commit gan nhat (diff HEAD~1).\nXac dinh: loi moi truong CI, loi code that, hay test sai. Trich dung\ndong log lam bang chung.\""),
      P("Kết quả Claude Code trả về thường có dạng: dòng log nghi vấn, commit liên quan, giả thuyết nguyên nhân, và mức độ tin cậy. Đây là điểm khởi đầu để bạn xác nhận thủ công — không phải kết luận cuối cùng để đóng ticket ngay.",
        "Claude Code's output usually looks like: the suspect log lines, the related commit, a hypothesis for the cause, and a confidence level. This is a starting point for you to verify manually — not a final conclusion to close the ticket immediately.",
        "Claude Codeの出力は通常、疑わしいログ行、関連コミット、原因の仮説、信頼度という形になります。これはあなたが手動で確認するための出発点であり、すぐにチケットをクローズできる最終結論ではありません。"),
      IMG(m_cilog, "Log CI run #48213: Claude Code khoanh vùng dòng lỗi và nghi vấn timeout gọi API coupon", "CI run #48213 log: Claude Code highlights the failing line and suspects a coupon API timeout", "CI実行#48213のログ：Claude Codeが失敗行を特定し、クーポンAPIのタイムアウトを疑う"),
    ] },
  { heading: { vi: "6. Tóm tắt RCA (nguyên nhân gốc) tự động", en: "6. Automatically summarizing RCA (root cause analysis)", ja: "6. RCA（根本原因分析）の自動要約" },
    blocks: [
      P("Sau khi xác nhận nguyên nhân, bạn vẫn cần viết báo cáo RCA rõ ràng để dev sửa đúng chỗ và để lần sau không lặp lại. Claude Code có thể tóm tắt theo đúng khuôn báo cáo đội bạn dùng, tiết kiệm phần soạn thảo.",
        "After confirming the cause, you still need to write a clear RCA report so developers fix the right thing and it doesn't happen again. Claude Code can summarize it into the exact report template your team uses, saving the drafting work.",
        "原因を確認した後も、開発者が正しい箇所を修正し、再発を防ぐために明確なRCA報告を書く必要があります。Claude Codeはチームが使う報告テンプレートに沿って要約でき、作成作業を省けます。"),
      DEF("RCA (Root Cause Analysis)", "phân tích nguyên nhân gốc — quá trình truy ngược từ hiện tượng lỗi tới nguyên nhân thật sự sâu xa nhất, thay vì chỉ sửa triệu chứng bề mặt.",
        "root cause analysis — the process of tracing back from a failure symptom to its deepest real cause, instead of only patching the surface symptom.",
        "根本原因分析 — 表面的な症状だけを修正するのではなく、失敗の現象から最も深い本当の原因まで遡って追跡するプロセス。"),
      CODE("bash", "claude \"Tom tat RCA cho run #48213 theo mau: Hien tuong / Nguyen nhan goc /\nBang chung / Muc anh huong / De xuat khac phuc / Test can bo sung.\nXuat markdown de dan truc tiep vao ticket QAFlow.\""),
      CODE("text", "## RCA - run #48213 (promo-code.spec.ts)\nHien tuong: 3 test ap ma khuyen mai fail ngau nhien tren CI, pass khi chay local.\nNguyen nhan goc: API /coupon/validate timeout ~9.4s tren moi truong CI do\nket noi toi service gia cu (pricing-service v1) chua duoc xoa khoi cau hinh.\nBang chung: log dong 214-221, thoi gian request 9412ms > timeout 8000ms.\nMuc anh huong: chi CI, chua ghi nhan o production.\nDe xuat: xoa cau hinh pricing-service v1 khoi CI env; tang timeout tam thoi len 12s.\nTest can them: 1 testcase kiem tra hanh vi khi /coupon/validate timeout (hien thi loi ro rang)."),
      IMG(m_dash, "Bảng số liệu 30 ngày: testcase Claude Code sinh, thời gian viết test giảm, test flaky đã sửa, thời gian ra RCA", "30-day metrics: Claude Code-generated testcases, reduced test-writing time, flaky tests fixed, RCA turnaround time", "30日間の指標：Claude Code生成テストケース、テスト作成時間の削減、修正したフレーキーテスト、RCA所要時間"),
      P("Bốn việc trên — sinh testcase, viết/bảo trì test, đọc log, tóm RCA — nghe rất mượt trên lý thuyết. Hai tình huống thực chiến dưới đây cho thấy nơi mọi thứ dễ trật đường ray nhất, và cách bạn xử lý.",
        "The four tasks above — generating testcases, writing/maintaining tests, reading logs, summarizing RCA — sound smooth in theory. The two real-world situations below show where things most often go off the rails, and how to handle them.",
        "上記の4つの作業 — テストケース生成、テスト作成・保守、ログ読解、RCA要約 — は理論上は順調に聞こえます。以下の2つの実戦シーンは、最もつまずきやすい場面と、その対処法を示します。"),
    ] },
  { heading: { vi: "7. Tình huống 1: testcase sinh ra thiếu ca biên quan trọng", en: "7. Situation 1: generated testcases miss a critical edge case", ja: "7. シーン1：生成されたテストケースが重要な境界ケースを欠く" },
    blocks: [
      SITUATION("Bạn merge thẳng bộ testcase Claude Code sinh mà không xem lại kỹ, hai tuần sau khách hàng báo lỗi mất tiền vì áp mã cùng lúc dùng 2 thiết bị.", "You merge the Claude Code-generated testcases straight in without a careful review; two weeks later a customer reports losing money because they applied the code on two devices at once.",
        "Bộ testcase có 12 ca nhưng không có ca 'áp cùng một mã trên 2 phiên đăng nhập đồng thời' — một hành vi race condition đặc thù của SaaS multi-device mà Claude Code không biết vì không có trong user story lẫn openapi.yaml.",
        "The testcase set had 12 cases but none for 'applying the same code from two concurrent sessions' — a multi-device race-condition behavior specific to this SaaS that Claude Code didn't know about since it wasn't in the user story or the openapi.yaml.",
        "Claude Codeが生成したテストケースをよく確認せずそのままマージ。2週間後、顧客が2台の端末で同時にコードを適用しお金を失ったと報告。",
        "テストケースは12件あったが「同じコードを2つの同時セッションから適用」というケースが無かった — これはSaaS特有のマルチデバイスのレースコンディションで、ユーザーストーリーにもopenapi.yamlにも記載がなかったためClaude Codeは把握していなかった。"),
      SOLVE("Thêm testcase race-condition thủ công dựa trên kiến thức nghiệp vụ, rồi cập nhật CLAUDE.md/prompt mẫu để lần sau luôn nhắc Claude Code xét kịch bản đa phiên/đa thiết bị cho các tính năng liên quan tới tiền.", "Manually add the race-condition testcase based on business knowledge, then update CLAUDE.md/the prompt template so Claude Code is always reminded to consider multi-session/multi-device scenarios for money-related features.", "業務知識に基づきレースコンディションのテストケースを手動で追加し、CLAUDE.md/プロンプトテンプレートを更新して、金銭に関わる機能では常にマルチセッション/マルチデバイスのシナリオを検討するようClaude Codeに指示するようにする。"),
      P("Bài học: Claude Code chỉ biết những gì bạn cho nó đọc. Nó không tự suy ra hành vi ẩn của hệ thống nếu hành vi đó không nằm trong user story, tài liệu, hay lịch sử bug. Với tính năng liên quan tới tiền/bảo mật, luôn có một vòng review của người nắm rõ nghiệp vụ trước khi testcase được xem là 'đủ'.",
        "Lesson: Claude Code only knows what you let it read. It can't infer a system's hidden behavior if that behavior isn't in the user story, docs, or bug history. For money- or security-related features, always keep a review step by someone who knows the business before considering a testcase set 'complete'.",
        "教訓：Claude Codeは読ませたものしか知りません。ユーザーストーリー、ドキュメント、バグ履歴に載っていない隠れた挙動を自ら推測することはできません。金銭やセキュリティに関わる機能では、テストケースを「十分」と見なす前に、必ず業務を理解する人によるレビューを挟みましょう。"),
    ] },
  { heading: { vi: "8. Tình huống 2: test tự động flaky vì selector đổi", en: "8. Situation 2: automated tests go flaky after a selector change", ja: "8. シーン2：セレクタ変更で自動テストがフレーキーになる" },
    blocks: [
      SITUATION("Sau khi team frontend đổi thư viện UI, 9 test Playwright trong bộ promo-code đỏ đồng loạt trên CI, dù tính năng vẫn chạy đúng khi test thủ công.", "After the frontend team switches UI libraries, 9 Playwright tests in the promo-code suite all turn red on CI, even though the feature still works correctly when tested manually.",
        "Nguyên nhân là các test cũ chọn phần tử bằng class CSS (.btn-apply-code) — thứ mà thư viện UI mới đổi tên hoàn toàn, chứ không phải app có lỗi thật.",
        "The cause: the old tests select elements by CSS class (.btn-apply-code), which the new UI library renamed entirely — it's not a real app bug.",
        "フロントエンドチームがUIライブラリを変更した後、手動テストでは機能が正しく動くにもかかわらず、promo-codeスイートのPlaywrightテスト9件がCIで一斉に赤くなった。",
        "原因は、古いテストがCSSクラス（.btn-apply-code）で要素を選択していたことで、新しいUIライブラリでそのクラス名が完全に変わったため — アプリの実際のバグではない。"),
      SOLVE("Giao Claude Code đọc report + diff frontend, xác nhận đây là lỗi selector chứ không phải lỗi nghiệp vụ, rồi tự động thay toàn bộ selector CSS sang data-testid ổn định hơn — kèm quy tắc 'không tự sửa nếu nghi ngờ là lỗi app thật'.", "Have Claude Code read the report and the frontend diff, confirm this is a selector issue rather than a business bug, then automatically replace all CSS selectors with more stable data-testid attributes — with the rule 'don't auto-fix if a real app bug is suspected'.", "Claude Codeにレポートとフロントエンドのdiffを読ませ、これがビジネスロジックのバグではなくセレクタの問題であることを確認させた上で、すべてのCSSセレクタをより安定したdata-testid属性に自動置換させる — ただし「実際のアプリバグが疑われる場合は自動修正しない」というルール付きで。"),
      P("Đây chính là lý do bạn nên chọn selector theo data-testid ngay từ đầu — không phải để tránh Claude Code, mà vì bất kỳ ai bảo trì test (người hay AI) đều cần một điểm neo ổn định. Claude Code làm việc sửa lặp lại này nhanh và không mệt mỏi, nhưng ranh giới 'sửa test' và 'báo lỗi app' vẫn phải do Tester quyết định.",
        "This is exactly why you should choose data-testid selectors from the start — not to avoid Claude Code, but because anyone maintaining tests (human or AI) needs a stable anchor. Claude Code does this repetitive fixing quickly and tirelessly, but the line between 'fix the test' and 'report an app bug' must still be decided by the tester.",
        "だからこそ最初からdata-testidセレクタを選ぶべきです — Claude Codeを避けるためではなく、テストを保守する誰か（人間でもAIでも）が安定した目印を必要とするからです。Claude Codeはこの反復的な修正作業を速く、疲れずにこなしますが、「テストを直す」か「アプリのバグとして報告する」かの境界線は、依然としてテスターが決めるべきものです。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo prompt hiệu quả", en: "9. Common mistakes & tips for effective prompts", ja: "9. よくある失敗と効果的なプロンプトのコツ" },
    blocks: [
      P("Sau vài sprint dùng Claude Code cho QAFlow, đội mình rút ra vài lỗi hay gặp và mẹo giúp prompt hiệu quả hơn.",
        "After a few sprints using Claude Code on QAFlow, our team picked up a few common mistakes and tips for more effective prompts.",
        "QAFlowでClaude Codeを数スプリント使った後、チームはよくある失敗と、より効果的なプロンプトのコツをいくつか学びました。"),
      PITFALL("Prompt mơ hồ kiểu 'sinh test cho tính năng này' — Claude Code sẽ tự đoán phạm vi, dễ ra ca thừa hoặc thiếu quan trọng. Hãy nêu rõ user story, file đặc tả, và định dạng đầu ra mong muốn.", "A vague prompt like 'generate tests for this feature' — Claude Code will guess the scope, easily producing extra or missing important cases. Spell out the user story, spec file, and the exact output format you want.", "「この機能のテストを生成して」のような曖昧なプロンプト — Claude Codeは範囲を推測し、余計なケースや重要なケースの欠落が起きやすい。ユーザーストーリー、仕様ファイル、望む出力形式を明記しよう。"),
      PITFALL("Dán nguyên log CI có chứa token/API key thật vào prompt để phân tích — rò rỉ bí mật ra ngoài phạm vi cần thiết. Luôn che (redact) thông tin nhạy cảm hoặc dùng log đã lọc trước khi đưa cho Claude Code.", "Pasting a raw CI log containing real tokens/API keys into a prompt for analysis — leaking secrets beyond what's needed. Always redact sensitive info or use a filtered log before handing it to Claude Code.", "実際のトークンやAPIキーを含む生のCIログをそのまま分析用プロンプトに貼り付ける — 必要以上に秘密情報を漏らしてしまう。機密情報は必ずマスキングするか、フィルタ済みのログを使ってからClaude Codeに渡す。"),
      TIP("Luôn yêu cầu Claude Code trích dẫn bằng chứng (dòng log, đoạn code) kèm kết luận — giúp bạn xác minh nhanh thay vì tin mù quáng.", "Always ask Claude Code to cite evidence (log lines, code snippets) alongside its conclusion — this lets you verify quickly instead of blindly trusting it.", "Claude Codeには結論とともに必ず根拠（ログ行やコード断片）を提示させよう — 盲目的に信頼するのではなく、素早く検証できるようになる。"),
      TIP("Giữ một file prompt mẫu (đã chứng minh hiệu quả) cho từng việc lặp lại: sinh testcase, sửa flaky, viết RCA — tái dùng thay vì soạn lại từ đầu mỗi lần.", "Keep a proven prompt template file for each recurring task: generating testcases, fixing flaky tests, writing RCA — reuse it instead of rewriting from scratch each time.", "テストケース生成、フレーキーテスト修正、RCA作成など反復作業ごとに、実績のあるプロンプトテンプレートファイルを保持し、毎回ゼロから書くのではなく再利用しよう。"),
      RECAP(["Prompt càng cụ thể (user story, file, định dạng), kết quả càng dùng được ngay", "Luôn review kết quả trước khi merge — Claude Code không thay Tester quyết định"],
        ["The more specific the prompt (user story, file, format), the more usable the result", "Always review the output before merging — Claude Code doesn't replace the tester's judgment"],
        ["プロンプトが具体的（ユーザーストーリー、ファイル、形式）であるほど、結果がそのまま使いやすくなる", "マージ前に必ず結果をレビューする — Claude Codeはテスターの判断を代替しない"]),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test scenario & checklist cho người mới", "Test scenarios & checklists for beginners", "test-scenario-checklist-cho-nguoi-moi", "初心者向けテストシナリオ＆チェックリスト"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug (defect) life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi", "初心者向けバグライフサイクル"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua một vòng thực chiến dùng Claude Code cho QA trên QAFlow: sinh testcase từ user story, viết và bảo trì test Playwright, phân tích log lỗi CI/CD, và tóm tắt RCA theo mẫu. Hai tình huống thực tế cho thấy giới hạn quan trọng nhất: Claude Code chỉ biết những gì bạn cho nó đọc, và quyết định cuối vẫn thuộc về Tester.",
        "You just walked through a hands-on round of using Claude Code for QA on QAFlow: generating testcases from user stories, writing and maintaining Playwright tests, analyzing CI/CD failure logs, and summarizing RCA into a template. Two real situations showed the most important limit: Claude Code only knows what you let it read, and the final call still belongs to the tester.",
        "QAFlowでClaude CodeをQAに活用する実戦的な流れを一通り体験しました：ユーザーストーリーからのテストケース生成、Playwrightテストの作成・保守、CI/CD失敗ログの分析、テンプレートに沿ったRCA要約です。2つの実際のシーンは最も重要な限界を示しました：Claude Codeは読ませたものしか知らず、最終判断は依然としてテスターに委ねられるということです。"),
      P("Bước tiếp theo, hãy luyện viết prompt cụ thể hơn (nêu rõ user story, file đặc tả, định dạng đầu ra), xây một bộ CLAUDE.md chuẩn cho dự án của bạn, và luôn giữ thói quen review trước khi merge. Nếu muốn học bài bản cách kết hợp automation testing với công cụ AI trong một lộ trình thực chiến có mentor, một khoá học Tester chuyên sâu sẽ giúp bạn rút ngắn thời gian tự mò mẫm.",
        "Next, practice writing more specific prompts (stating the user story, spec file, and output format), build a solid CLAUDE.md for your project, and always keep the habit of reviewing before merging. If you want to learn systematically how to combine automation testing with AI tools on a real-world path with a mentor, an in-depth Tester course will help you shortcut the trial-and-error phase.",
        "次は、より具体的なプロンプト（ユーザーストーリー、仕様ファイル、出力形式を明記）を練習し、プロジェクト用のしっかりしたCLAUDE.mdを整備し、マージ前に必ずレビューする習慣を保ちましょう。メンターと共に実戦的な道筋で自動化テストとAIツールの組み合わせを体系的に学びたいなら、専門的なテスターコースが試行錯誤の時間を短縮してくれます。"),
      CTA(course),
    ] },
];

const CNM_CLAUDE_QA = makeDoc({
  slug: "claude-code-tu-dong-hoa-qa",
  domain: "saas",
  primaryKeyword: "Claude Code tự động hoá QA",
  keywords: ["Claude Code tự động hoá QA", "AI cho QA", "sinh testcase bằng AI", "Claude Code testing", "automation testing AI", "phân tích log lỗi CI/CD", "RCA root cause analysis"],
  coverLabel: "AI QA · CLAUDE CODE · SAAS",
  crumb: "Claude Code tự động hoá QA",
  metaTitle: { vi: "Claude Code tự động hoá QA: testcase & RCA", en: "Claude Code for QA automation: testcases & RCA", ja: "Claude CodeでQA自動化：テスト生成とRCA" },
  metaDescription: {
    vi: "Dùng Claude Code tự động hoá QA trên SaaS QAFlow: sinh testcase, viết & bảo trì test Playwright, phân tích log CI/CD, tóm tắt RCA nhanh, có ví dụ lệnh thật.",
    en: "Use Claude Code to automate QA on the QAFlow SaaS: generating testcases from user stories, writing and maintaining Playwright tests, analyzing CI/CD failure logs, and summarizing RCA fast — with real command examples and UI mockups.",
    ja: "Claude CodeでSaaS「QAFlow」のQAを自動化：ユーザーストーリーからのテストケース生成、Playwrightテストの作成・保守、CI/CD失敗ログの分析、迅速なRCA要約 — 実際のコマンド例とUIモック付き。",
  },
  title: {
    vi: "Dùng Claude Code tự động hoá công việc QA: sinh testcase, viết & bảo trì test, phân tích log, tóm tắt RCA (có ví dụ thực chiến)",
    en: "Automating QA work with Claude Code: generating testcases, writing & maintaining tests, analyzing logs, summarizing RCA (with real examples)",
    ja: "Claude CodeでQA業務を自動化：テストケース生成、テストの作成・保守、ログ分析、RCA要約（実例付き）",
  },
  summary: {
    vi: "Bài thực chiến: dùng Claude Code tự động hoá 4 việc QA trên SaaS QAFlow — sinh testcase từ user story, viết/bảo trì test Playwright, phân tích log lỗi CI/CD, tóm tắt RCA. Có lệnh/prompt thật, mockup giao diện & pipeline, 2 tình huống, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on article: use Claude Code to automate 4 QA tasks on the QAFlow SaaS — generating testcases from user stories, writing/maintaining Playwright tests, analyzing CI/CD failure logs, summarizing RCA. Real commands/prompts, UI & pipeline mockups, 2 real situations, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "実戦記事：SaaS QAFlowで4つのQA業務をClaude Codeで自動化 — ユーザーストーリーからのテストケース生成、Playwrightテストの作成・保守、CI/CD失敗ログ分析、RCA要約。実際のコマンド/プロンプト、UI＆パイプラインのモック、2つの実戦シーン、FAQと5問クイズ付き。CyberSoftのテスターコースへ誘導。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách dùng Claude Code để tự động hoá công việc QA", steps: [
    { name: "Chuẩn bị & kết nối repo", text: "Cài Claude Code CLI, cấp quyền đúng phạm vi repo, thêm CLAUDE.md quy ước dự án." },
    { name: "Sinh testcase & test tự động", text: "Prompt Claude Code đọc user story + đặc tả API để sinh testcase, rồi hiện thực hoá thành Playwright." },
    { name: "Phân tích log & tóm tắt RCA", text: "Nhờ Claude Code lọc log CI, xác định nguyên nhân gốc và xuất báo cáo RCA theo mẫu." },
  ] },
  pages,
});

export const CNM_CLAUDE_QA_01 = [CNM_CLAUDE_QA];
