// doc_mb_jira.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Dùng Jira quản lý lỗi cho người mới — tạo issue/bug đầy đủ trường, chuyển trạng thái
// đúng workflow, comment/log work, liên kết bug với test case, lọc/JQL cơ bản, bảng board.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn dự án ShopEasy trên Jira.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { jira, grid, kanban, dashboard, stateDiagram } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: form tạo bug Jira đầy đủ trường (dự án SE · ShopEasy) ──
const m_form = jira({
  key: "SE-13400",
  title: "Trang Thanh toán: nút 'Xác nhận đặt hàng' bị mờ, không bấm được trên Safari",
  type: "Bug", status: "New", priority: "High", severity: "Major",
  fields: [
    ["Summary", "Nút 'Xác nhận đặt hàng' bị mờ, không bấm được trên Safari"],
    ["Description", "Trang Thanh toán ShopEasy, nút CTA chính bị disable nhầm sau khi chọn COD"],
    ["Steps to reproduce", "1) Thêm SP vào giỏ 2) Sang Thanh toán 3) Chọn COD 4) Xem nút Xác nhận đặt hàng"],
    ["Assignee", "Chưa gán (Unassigned)"],
    ["Sprint", "Sprint 16"],
    ["Label · Attachment", "payment, safari · screenshot-nut-mo.png"],
  ],
});

// ── Mockup 2: bảng các trường cần điền khi tạo issue Bug trên Jira ──
const m_fields = grid("Các trường cần điền khi tạo 1 issue Bug trên Jira (dự án SE · ShopEasy)",
  ["Trường", "Điền gì", "Ví dụ trên ShopEasy"], [
    ["Summary", "Tóm tắt lỗi trong 1 câu, đủ để hiểu ngay", "'Nút Xác nhận đặt hàng bị mờ trên Safari'"],
    ["Description", "Mô tả chi tiết bối cảnh, môi trường, ảnh hưởng", "'Trang Thanh toán, chọn COD, Safari 17'"],
    ["Steps to reproduce", "Các bước tái hiện lỗi theo thứ tự", "'1) Thêm SP 2) Thanh toán 3) Chọn COD 4) Xem nút'"],
    ["Severity", "Mức độ nghiêm trọng kỹ thuật", "Critical / Major / Minor / Trivial"],
    ["Priority", "Thứ tự nên sửa trước–sau", "Highest / High / Medium / Low"],
    ["Assignee", "Người sẽ xử lý issue", "'Dev A — module Thanh toán'"],
    ["Sprint", "Sprint hiện tại issue thuộc về", "'Sprint 16'"],
    ["Label", "Nhãn để nhóm/lọc issue liên quan", "'payment', 'safari'"],
    ["Attachment", "Ảnh/video minh chứng lỗi", "'screenshot-nut-mo.png'"],
  ], { accent: "#0052cc" });

// ── Mockup 3: sơ đồ workflow trạng thái chuẩn của 1 issue Bug ──
const m_workflow = stateDiagram("Workflow trạng thái chuẩn của 1 issue Bug trên Jira (SE · ShopEasy)", [
  { id: "new", label: "New", x: 90, y: 60, kind: "start" },
  { id: "open", label: "Open", x: 250, y: 60, kind: "mid" },
  { id: "inprogress", label: "In Progress", x: 410, y: 60, kind: "mid" },
  { id: "inreview", label: "In Review", x: 570, y: 60, kind: "mid" },
  { id: "resolved", label: "Resolved", x: 690, y: 170, kind: "ok" },
  { id: "closed", label: "Closed", x: 570, y: 260, kind: "ok" },
  { id: "reopened", label: "Reopened", x: 250, y: 220, kind: "bad" },
], [
  { from: "new", to: "open", label: "gán Assignee" },
  { from: "open", to: "inprogress", label: "bắt đầu sửa" },
  { from: "inprogress", to: "inreview", label: "chờ QA verify" },
  { from: "inreview", to: "resolved", label: "QA verify OK" },
  { from: "resolved", to: "closed", label: "đóng issue" },
  { from: "inreview", to: "reopened", label: "verify FAIL", bad: true },
  { from: "closed", to: "reopened", label: "lỗi tái xuất hiện", bad: true },
  { from: "reopened", to: "inprogress", label: "sửa lại" },
], { accent: "#0052cc", h: 320 });

// ── Mockup 4: ticket lỗi bị bỏ quên vì thiếu Assignee (Tình huống 1) ──
const m_noassignee = jira({
  key: "SE-13210", title: "Trang chủ: banner khuyến mãi hiển thị sai giá sau 3 ngày mở bài",
  type: "Bug", status: "Open", priority: "High", severity: "Major",
  fields: [
    ["Assignee", "❌ Chưa gán (Unassigned) — 6 ngày chưa ai nhận"],
    ["Sprint", "Sprint 15 (đã kết thúc, chưa fix)"],
    ["Comment gần nhất", "Không có comment nào sau khi tạo issue"],
    ["Ảnh hưởng", "Khách thấy giá khuyến mãi sai, có thể khiếu nại"],
  ],
});

// ── Mockup 5: dashboard số liệu lỗi bị lệch vì nhảy trạng thái sai (Tình huống 2) ──
const m_dash = dashboard("Số liệu lỗi ShopEasy trên Jira — Sprint 16", [
  { label: "Tổng bug mở", value: "34", sub: "sprint này", color: "#0052cc" },
  { label: "Bug chưa gán Assignee", value: "7", sub: "cần rà soát ngay", color: "#de350b" },
  { label: "Đóng sai workflow (bỏ qua QA verify)", value: "5", sub: "báo cáo bị lệch", color: "#ff8b00" },
  { label: "Tỉ lệ Reopened sau Closed", value: "12%", sub: "do verify vội", color: "#974f0c" },
]);

// ── Mockup 6: các câu lệnh JQL cơ bản để lọc lỗi trên board ──
const m_jql = grid("Các câu lệnh JQL cơ bản để lọc lỗi trên board ShopEasy",
  ["Mục đích", "Câu lệnh JQL", "Kết quả"], [
    ["Lỗi của tôi, chưa xong", "assignee = currentUser() AND status != Done", "Bug đang gán cho bạn, chưa hoàn tất"],
    ["Lỗi Critical trong sprint", "priority = Highest AND sprint in openSprints()", "Bug ưu tiên cao nhất của sprint đang chạy"],
    ["Lỗi chưa có người nhận", "assignee is EMPTY AND type = Bug", "Bug bị bỏ quên, chưa gán ai xử lý"],
    ["Lỗi mới báo 7 ngày qua", "created >= -7d AND type = Bug", "Bug mới phát sinh gần đây, cần review nhanh"],
    ["Lỗi module thanh toán còn mở", "labels = payment AND status = Open", "Bug liên quan thanh toán còn đang mở"],
  ], { accent: "#0052cc" });

// ── Mockup 7: bảng Kanban theo dõi lỗi ShopEasy trên Jira ──
const m_kanban = kanban("Bảng Kanban theo dõi lỗi ShopEasy trên Jira (Sprint 16)", [
  { name: "New", cards: [
    { key: "SE-13400", title: "Nút Xác nhận đặt hàng bị mờ trên Safari", sev: "Major" },
    { key: "SE-13398", title: "Banner khuyến mãi sai giá", sev: "High" },
  ] },
  { name: "In Progress", cards: [
    { key: "SE-13355", title: "Email xác nhận đơn gửi trễ 10 phút", sev: "Medium" },
  ] },
  { name: "In Review", cards: [
    { key: "SE-13290", title: "Bộ lọc giá không reset sau khi xoá tag", sev: "Low" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-13210", title: "Giỏ hàng mất SP khi refresh trang", sev: "High" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Một issue Bug trên Jira cần điền tối thiểu những trường nào?",
  "What are the minimum fields a Jira Bug issue should have?",
  "Tối thiểu cần Summary (tóm tắt lỗi rõ ràng), Description hoặc Steps to reproduce (mô tả/cách tái hiện), Severity và Priority (mức độ nghiêm trọng và độ ưu tiên), cùng Assignee (người xử lý). Thiếu một trong các trường này, lỗi rất dễ bị hiểu sai, xử lý chậm hoặc bị bỏ quên trên board.",
  "At minimum you need a clear Summary, a Description or Steps to reproduce, Severity and Priority, plus an Assignee. Missing any of these makes the bug easy to misunderstand, slow to fix, or forgotten on the board.",
  "JiraのBugチケットに最低限必要な項目は？",
  "最低限、明確なSummary（要約）、DescriptionまたはSteps to reproduce（再現手順）、SeverityとPriority（重大度と優先度）、そしてAssignee（担当者）が必要です。これらが欠けると、バグが誤解されたり、対応が遅れたり、ボード上で忘れられたりしやすくなります。");
const faq2 = FAQ(
  "Severity và Priority trên Jira khác nhau thế nào, ai là người đặt?",
  "How do Severity and Priority differ on Jira, and who sets them?",
  "Severity đo mức độ nghiêm trọng kỹ thuật của lỗi (ảnh hưởng tới hệ thống ra sao), thường do Tester/QA đánh giá khi báo lỗi. Priority đo thứ tự nên sửa trước–sau, thường do Product Owner hoặc trưởng nhóm quyết định dựa trên độ ưu tiên kinh doanh. Một lỗi Severity thấp vẫn có thể Priority cao nếu ảnh hưởng tới sự kiện quan trọng, và ngược lại.",
  "Severity measures how technically serious a bug is (its impact on the system), usually assessed by the tester/QA reporting it. Priority measures the order it should be fixed in, usually decided by the Product Owner or team lead based on business urgency. A low-severity bug can still have high priority if it affects an important event, and vice versa.",
  "JiraのSeverityとPriorityはどう違い、誰が設定する？",
  "Severityはバグの技術的な重大度（システムへの影響度）を表し、通常は報告するテスター/QAが評価します。Priorityは修正すべき順序を表し、通常はプロダクトオーナーやチームリーダーがビジネス上の緊急性に基づいて決定します。重要なイベントに影響する場合、Severityが低くてもPriorityが高いことがあり、その逆もあります。");
const faq3 = FAQ(
  "JQL là gì, người mới có cần biết viết JQL không?",
  "What is JQL, and do beginners need to know how to write it?",
  "JQL (Jira Query Language) là ngôn ngữ truy vấn để lọc issue theo điều kiện, ví dụ 'assignee = currentUser() AND status != Done'. Người mới không cần thuộc lòng cú pháp phức tạp, nhưng nên biết vài câu lệnh cơ bản để tự lọc 'lỗi của tôi', 'lỗi chưa có người nhận', hay 'lỗi Critical trong sprint hiện tại' — giúp làm việc chủ động hơn thay vì lướt tay qua từng issue trên board.",
  "JQL (Jira Query Language) is a query language for filtering issues by condition, e.g. 'assignee = currentUser() AND status != Done'. Beginners don't need to memorize complex syntax, but should know a few basic queries to filter 'my bugs', 'unassigned bugs', or 'Critical bugs in the current sprint' — helping them work proactively instead of scrolling through every issue on the board.",
  "JQLとは何？初心者はJQLを書けるようになる必要がある？",
  "JQL（Jira Query Language）は、'assignee = currentUser() AND status != Done'のように条件でissueを絞り込むクエリ言語です。初心者が複雑な構文を丸暗記する必要はありませんが、『自分のバグ』『未割当のバグ』『現在のスプリントのCriticalバグ』を絞り込む基本的なクエリをいくつか知っておくと、ボード上の全issueを一つずつ確認するのではなく、主体的に作業できるようになります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trường nào trên Jira thể hiện thứ tự 'nên sửa trước hay sau' dựa theo mức độ khẩn cấp kinh doanh?", en: "Which Jira field shows the order a bug 'should be fixed first or later' based on business urgency?", ja: "ビジネス上の緊急性に基づき『先に直すべきか後で良いか』を示すJiraの項目はどれ？" },
    options: [
      { vi: "Summary", en: "Summary", ja: "Summary" },
      { vi: "Priority", en: "Priority", ja: "Priority" },
      { vi: "Attachment", en: "Attachment", ja: "Attachment" },
      { vi: "Sprint", en: "Sprint", ja: "Sprint" },
    ], correct: 1,
    explain: { vi: "Priority thể hiện thứ tự nên sửa trước–sau, thường do Product Owner/trưởng nhóm quyết định theo độ khẩn cấp kinh doanh.", en: "Priority shows the fix order, usually decided by the Product Owner/team lead based on business urgency.", ja: "Priorityは修正の優先順を示し、通常プロダクトオーナーやリーダーがビジネスの緊急性に基づき決定します。" },
  }),
  mcq({
    q: { vi: "Theo workflow chuẩn, một bug ở trạng thái 'In Review' nên chuyển sang 'Resolved' dựa vào điều gì?", en: "In a standard workflow, a bug in 'In Review' should move to 'Resolved' based on what?", ja: "標準ワークフローで、『In Review』のバグを『Resolved』に移すべき根拠は？" },
    options: [
      { vi: "Dev tự đóng ngay sau khi sửa xong code, không cần ai xác nhận", en: "The dev closes it right after fixing the code, without confirmation", ja: "開発者がコード修正直後に自分で閉じる、確認不要" },
      { vi: "QA xác nhận lỗi đã được sửa đúng trên môi trường kiểm thử", en: "QA confirms the fix works correctly on the test environment", ja: "QAがテスト環境で修正が正しいことを確認する" },
      { vi: "Không cần kiểm tra gì, cứ để hệ thống tự chuyển", en: "No check needed, let the system move it automatically", ja: "何も確認せず、システムが自動で移すのに任せる" },
      { vi: "Chỉ cần Dev viết 1 dòng comment là đủ", en: "It's enough for the dev to just write one comment", ja: "開発者がコメントを1行書くだけで十分" },
    ], correct: 1,
    explain: { vi: "Chuyển In Review -> Resolved cần QA verify lại trên môi trường kiểm thử, tránh nhảy trạng thái sai làm lẫn báo cáo.", en: "Moving In Review -> Resolved needs QA to verify on the test environment, avoiding wrong status jumps that confuse reports.", ja: "In Review→Resolvedへの移行はQAがテスト環境で再検証する必要があり、誤った状態遷移で報告が混乱するのを防ぎます。" },
  }),
  mcq({
    q: { vi: "Vì sao một bug không có Assignee dễ bị 'bỏ quên' trên board Jira?", en: "Why does a bug with no Assignee easily get 'forgotten' on a Jira board?", ja: "Assigneeがないバグは、なぜJiraボードで『忘れられ』やすいのか？" },
    options: [
      { vi: "Vì Jira tự động xoá issue không có assignee sau vài ngày", en: "Because Jira automatically deletes issues with no assignee after a few days", ja: "Assigneeがないissueは数日後にJiraが自動削除するから" },
      { vi: "Vì không ai chịu trách nhiệm xử lý, dễ bị lướt qua khi cả team nhìn board", en: "Because no one is responsible for it, so it's easily overlooked when the team scans the board", ja: "誰も責任を持たないため、チームがボードを見る際に見落とされやすいから" },
      { vi: "Vì bug đó sẽ tự động chuyển sang Closed sau 7 ngày", en: "Because the bug automatically moves to Closed after 7 days", ja: "そのバグは7日後に自動的にClosedへ移行するから" },
      { vi: "Vì Severity của nó sẽ tự giảm xuống Low", en: "Because its Severity automatically drops to Low", ja: "Severityが自動的にLowに下がるから" },
    ], correct: 1,
    explain: { vi: "Không có người chịu trách nhiệm rõ ràng, bug dễ bị bỏ sót khi cả team quét nhanh qua board mỗi ngày.", en: "With no one clearly responsible, a bug is easily missed as the team quickly scans the board each day.", ja: "明確な担当者がいないため、チームが毎日ボードをざっと見る際にバグが見落とされやすくなります。" },
  }),
  mcq({
    q: { vi: "Câu lệnh JQL 'assignee is EMPTY AND type = Bug' dùng để làm gì?", en: "What is the JQL query 'assignee is EMPTY AND type = Bug' used for?", ja: "JQLクエリ「assignee is EMPTY AND type = Bug」は何のために使う？" },
    options: [
      { vi: "Tìm tất cả bug đã đóng (Closed)", en: "Find all Closed bugs", ja: "全てのClosedバグを検索する" },
      { vi: "Tìm bug chưa gán người xử lý (Assignee)", en: "Find bugs that have no Assignee yet", ja: "まだAssigneeが割り当てられていないバグを検索する" },
      { vi: "Tìm bug có Priority cao nhất", en: "Find bugs with the highest Priority", ja: "Priorityが最も高いバグを検索する" },
      { vi: "Tìm bug được tạo trong hôm nay", en: "Find bugs created today", ja: "本日作成されたバグを検索する" },
    ], correct: 1,
    explain: { vi: "'assignee is EMPTY' lọc các issue loại Bug chưa có ai được gán xử lý — dùng để rà soát lỗi bị bỏ quên.", en: "'assignee is EMPTY' filters Bug-type issues with no one assigned — useful for reviewing forgotten bugs.", ja: "『assignee is EMPTY』は担当者未割当のBug種issueを絞り込み、忘れられたバグの確認に使います。" },
  }),
  mcq({
    q: { vi: "Comment và Log Work trên 1 issue Jira dùng để làm gì?", en: "What are Comment and Log Work on a Jira issue used for?", ja: "JiraのissueにおけるCommentとLog Workは何のために使う？" },
    options: [
      { vi: "Chỉ để trang trí issue cho đẹp mắt hơn", en: "Just to make the issue look nicer", ja: "issueを見た目良くするだけのもの" },
      { vi: "Ghi lại tiến độ, trao đổi, và số giờ đã bỏ ra xử lý lỗi, giúp cả team theo dõi minh bạch", en: "Record progress, discussion, and hours spent fixing the bug, keeping the whole team transparently informed", ja: "進捗、やり取り、修正にかけた時間を記録し、チーム全体が透明に把握できるようにする" },
      { vi: "Tự động xoá lịch sử thay đổi cũ của issue", en: "Automatically delete the issue's old change history", ja: "issueの古い変更履歴を自動削除する" },
      { vi: "Tự động đổi Severity của issue", en: "Automatically change the issue's Severity", ja: "issueのSeverityを自動変更する" },
    ], correct: 1,
    explain: { vi: "Comment ghi lại trao đổi/tiến độ, Log Work ghi số giờ đã làm — cả hai giúp minh bạch hoá quá trình xử lý lỗi cho cả team.", en: "Comments log discussion/progress, Log Work logs hours spent — both keep the bug-fixing process transparent for the team.", ja: "Commentはやり取りや進捗を記録し、Log Workは作業時間を記録します。両方ともバグ対応プロセスをチームに対して透明化します。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & Jira quản lý lỗi là gì", en: "1. TL;DR & what Jira bug tracking is", ja: "1. 要点とJiraによるバグ管理とは" },
    blocks: [
      TLDR("Jira là công cụ quản lý lỗi/công việc phổ biến nhất trong ngành phần mềm. Bài này dạy bạn tạo issue Bug đầy đủ trường (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment) trên dự án SE (ShopEasy), chuyển trạng thái đúng workflow, comment/log work, liên kết bug với test case, và lọc lỗi bằng JQL cơ bản cùng bảng board. Nhiều hình minh hoạ Jira thật và trắc nghiệm cuối bài.",
        "Jira is the most popular bug/work tracking tool in software. This lesson teaches you to create a fully-filled Bug issue (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment) on the SE (ShopEasy) project, move it correctly through the workflow, comment/log work, link the bug to a test case, and filter bugs with basic JQL and a board. Lots of realistic Jira visuals and a quiz at the end.",
        "Jiraはソフトウェア業界で最も広く使われるバグ/作業管理ツールです。本記事ではSE（ShopEasy）プロジェクトで、必要項目を全て埋めたBugチケット（Summary、Description、Steps、Severity、Priority、Assignee、Sprint、Label、Attachment）を作成し、正しくワークフローの状態を遷移させ、コメント・作業ログを記録し、バグをテストケースにリンクし、基本的なJQLとボードでバグを絞り込む方法を学びます。リアルなJira画面と最後にクイズ付き。"),
      P("Chào bạn mới! Nếu manual testing là kỹ năng 'tìm ra lỗi', thì Jira chính là công cụ để bạn 'báo lỗi và theo dõi lỗi đó tới khi được sửa xong' một cách có tổ chức. Rất nhiều công ty phần mềm, bao gồm cả dự án ShopEasy trong series này, dùng Jira làm nơi duy nhất lưu mọi issue — từ bug, task, tới story. Biết dùng Jira đúng cách không chỉ giúp bạn làm việc gọn gàng, mà còn là kỹ năng gần như bắt buộc khi phỏng vấn vị trí Tester.",
        "Hi, newcomer! If manual testing is the skill of 'finding bugs', Jira is the tool that lets you 'report a bug and track it until it's fixed' in an organized way. Many software companies, including the ShopEasy project in this series, use Jira as the single place to store every issue — bugs, tasks, and stories alike. Knowing how to use Jira properly not only keeps your work tidy, it's also an almost mandatory skill in Tester job interviews.",
        "こんにちは、初心者さん！マニュアルテストが『バグを見つける』スキルだとすれば、Jiraは『バグを報告し、修正されるまで組織的に追跡する』ためのツールです。このシリーズのShopEasyプロジェクトを含む多くのソフトウェア企業が、バグ・タスク・ストーリーなど全てのissueを保存する唯一の場所としてJiraを使っています。Jiraを正しく使いこなせることは、作業を整理するだけでなく、テスター職の面接でほぼ必須のスキルでもあります。"),
      IMG(m_form, "Form tạo issue Bug đầy đủ trường trên Jira, dự án SE (ShopEasy)", "A fully-filled Bug issue creation form on Jira, project SE (ShopEasy)", "全項目を埋めたJiraのBugチケット作成フォーム、SE（ShopEasy）プロジェクト"),
      DEF("Jira Issue", "một 'phiếu' công việc trên Jira (Bug, Task, Story...) chứa đầy đủ thông tin để theo dõi và xử lý.",
        "a work 'ticket' on Jira (Bug, Task, Story...) holding all the information needed to track and handle it.",
        "追跡・対応に必要な全情報を持つJira上の作業『チケット』（Bug、Task、Storyなど）。"),
    ] },
  { heading: { vi: "2. Các trường trong 1 issue Bug — điền gì, vì sao quan trọng", en: "2. Fields in a Bug issue — what to fill in and why it matters", ja: "2. Bugチケットの項目 — 何を書くか、なぜ重要か" },
    blocks: [
      P("Một issue Bug trên Jira không chỉ có ô 'mô tả lỗi'. Mỗi trường đóng một vai trò riêng: giúp người khác hiểu lỗi (Summary, Description, Steps), giúp xếp thứ tự xử lý (Severity, Priority), và giúp theo dõi ai làm khi nào (Assignee, Sprint, Label, Attachment). Điền thiếu một trường quan trọng, issue của bạn dễ bị hỏi lại nhiều lần hoặc bị xếp sai độ ưu tiên.",
        "A Bug issue on Jira isn't just a 'describe the bug' box. Each field plays a distinct role: helping others understand the bug (Summary, Description, Steps), helping order the work (Severity, Priority), and helping track who does what and when (Assignee, Sprint, Label, Attachment). Skip an important field and your issue is likely to get repeated questions or the wrong priority.",
        "JiraのBugチケットは『バグの説明』欄だけではありません。各項目にはそれぞれ役割があります：他者がバグを理解する助け（Summary、Description、Steps）、対応順序を決める助け（Severity、Priority）、誰がいつ対応するかを追跡する助け（Assignee、Sprint、Label、Attachment）。重要な項目を書き忘れると、何度も質問されたり優先度を誤って付けられたりしやすくなります。"),
      IMG(m_fields, "Bảng các trường cần điền khi tạo 1 issue Bug trên Jira, dự án SE (ShopEasy)", "A table of fields to fill in when creating a Jira Bug issue, project SE (ShopEasy)", "JiraのBugチケット作成時に記入すべき項目の一覧表、SE（ShopEasy）プロジェクト"),
      P("Ba trường người mới hay coi nhẹ nhất là Steps to reproduce, Assignee và Label. Steps to reproduce thiếu chi tiết khiến Dev không tái hiện được lỗi và phải hỏi lại bạn nhiều lần. Assignee bỏ trống khiến không ai thấy mình có trách nhiệm xử lý. Label thiếu khiến sau này rất khó lọc lại các lỗi cùng chủ đề (ví dụ tất cả lỗi liên quan 'payment') để báo cáo hoặc kiểm tra hồi quy.",
        "The three fields beginners most underrate are Steps to reproduce, Assignee, and Label. Vague steps mean the Dev can't reproduce the bug and has to keep asking you. A blank Assignee means no one feels responsible for it. Missing labels make it hard later to filter bugs on the same topic (e.g. everything related to 'payment') for reporting or regression checks.",
        "初心者が最も軽視しがちな3つの項目は、Steps to reproduce、Assignee、Labelです。再現手順が詳細でないと開発者がバグを再現できず、何度も質問されることになります。Assigneeが空欄だと誰も責任を感じません。Labelがないと、後で同じテーマのバグ（例：'payment'関連の全バグ）を報告や回帰確認のために絞り込むのが難しくなります。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo Jira quản lý lỗi", en: "3. Why beginners need to master Jira bug tracking", ja: "3. 初心者がJiraでのバグ管理を習得すべき理由" },
    blocks: [
      P("Tìm ra lỗi mới chỉ là nửa công việc của một Tester. Nửa còn lại là báo cáo lỗi đó sao cho Dev sửa đúng, đúng thời điểm, và không bị thất lạc giữa hàng trăm issue khác trong dự án. Jira chính là 'sổ cái' chung của cả team — nếu bạn dùng nó lỏng lẻo, công sức tìm lỗi của bạn có thể vô nghĩa vì lỗi bị bỏ quên hoặc hiểu sai.",
        "Finding a bug is only half a Tester's job. The other half is reporting it so the Dev fixes it correctly, at the right time, without it getting lost among hundreds of other issues in the project. Jira is the team's shared 'ledger' — if you use it loosely, the effort you put into finding bugs can be wasted because the bug gets forgotten or misunderstood.",
        "バグを見つけることはテスターの仕事の半分にすぎません。もう半分は、開発者が正しく、適切なタイミングで修正でき、プロジェクト内の何百もの他のissueに紛れて失われないように報告することです。Jiraはチーム共有の『台帳』です——雑に使うと、バグが忘れられたり誤解されたりして、あなたがバグを見つけた労力が無駄になりかねません。"),
      P("Với riêng bạn — người mới — thành thạo Jira giúp bạn hoà nhập nhanh vào bất kỳ team QA nào, vì hầu hết công ty đều dùng Jira hoặc công cụ tương tự (Azure DevOps, Trello nâng cao). Câu hỏi 'Bạn dùng Jira để quản lý lỗi thế nào?' cũng là câu hỏi phỏng vấn rất phổ biến — trả lời rành mạch về các trường, workflow và JQL cơ bản cho thấy bạn đã va chạm thực tế, không chỉ học lý thuyết.",
        "For you specifically — a beginner — mastering Jira helps you integrate quickly into any QA team, since most companies use Jira or a similar tool (Azure DevOps, advanced Trello). 'How do you use Jira to manage bugs?' is also a very common interview question — answering clearly about fields, workflow, and basic JQL shows you've had real hands-on exposure, not just theory.",
        "特に初心者のあなたにとって、Jiraを習得することは、どのQAチームにも素早く馴染む助けになります。ほとんどの企業がJiraや類似ツール（Azure DevOps、高機能なTrelloなど）を使っているからです。『Jiraでどうバグを管理しますか？』は非常によくある面接質問でもあります——項目、ワークフロー、基本的なJQLについて明確に答えられれば、理論だけでなく実際に触れた経験があることを示せます。"),
      P("Và quan trọng nhất: một issue Jira được điền đúng, chuyển trạng thái đúng, có comment rõ ràng chính là bằng chứng cho thấy bạn làm việc chuyên nghiệp. Đó là thứ Product Owner, Dev, và cả khách hàng nhìn vào để đánh giá chất lượng công việc của bạn, không phải chỉ số lượng bug bạn tìm được.",
        "And most importantly: a Jira issue that's correctly filled in, moved through the right statuses, and clearly commented is proof that you work professionally. That's what the Product Owner, Dev, and even the client look at to judge the quality of your work — not just how many bugs you found.",
        "そして最も重要なのは、正しく記入され、正しい状態で遷移し、明確なコメントが付いたJiraのissueは、あなたがプロフェッショナルに働いていることの証明になるということです。プロダクトオーナーや開発者、さらには顧客もこれを見てあなたの仕事の質を判断します——見つけたバグの数だけではありません。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: tạo issue Bug từng bước (thực hành)", en: "4. Prepare: creating a Bug issue step by step (hands-on)", ja: "4. 準備：Bugチケットを一歩ずつ作成する（実習）" },
    blocks: [
      P("Giờ ta tạo thật một issue Bug cho lỗi trên trang Thanh toán ShopEasy. Làm theo thứ tự dưới đây để có một issue đầy đủ, dễ hiểu ngay từ lần đọc đầu tiên.",
        "Now let's create a real Bug issue for the bug on ShopEasy's Payment page. Follow the order below to get a complete issue that's easy to understand from the very first read.",
        "では、ShopEasyの決済ページのバグに対して実際にBugチケットを作成しましょう。以下の順に沿えば、最初に読んだだけで理解できる完全なチケットができます。"),
      STEP(1, "Bấm 'Create' trên Jira, chọn Project = SE (ShopEasy), Issue Type = Bug.", "Click 'Create' on Jira, select Project = SE (ShopEasy), Issue Type = Bug.", "Jiraで『Create』をクリックし、Project = SE（ShopEasy）、Issue Type = Bugを選ぶ。"),
      STEP(2, "Viết Summary ngắn gọn, cụ thể: nêu rõ MÀN HÌNH + HÀNH VI SAI, ví dụ 'Nút Xác nhận đặt hàng bị mờ trên Safari'.", "Write a short, specific Summary: state the SCREEN + WRONG BEHAVIOR, e.g. 'Confirm Order button is greyed out on Safari'.", "簡潔で具体的なSummaryを書く：画面＋誤った挙動を明記する、例『Safariで注文確定ボタンが無効化される』。"),
      STEP(3, "Điền Description (bối cảnh, môi trường) và Steps to reproduce theo thứ tự đánh số, kèm Expected/Actual.", "Fill in Description (context, environment) and Steps to reproduce in numbered order, with Expected/Actual.", "Description（背景、環境）とSteps to reproduceを番号順に記入し、Expected/Actualを添える。"),
      STEP(4, "Chọn Severity + Priority, gán Assignee, chọn Sprint, gắn Label, đính kèm ảnh/video làm bằng chứng.", "Choose Severity + Priority, set the Assignee, pick the Sprint, add Labels, attach an image/video as evidence.", "SeverityとPriorityを選び、Assigneeを設定し、Sprintを選択し、Labelを付け、証拠として画像/動画を添付する。"),
      TRY("Tự viết Summary cho một lỗi bạn từng gặp trong app bất kỳ, sao cho chỉ đọc Summary là hiểu ngay vấn đề.", "Write a Summary for a bug you once found in any app, so that reading only the Summary makes the problem clear.", "使ったことのあるアプリで見つけたバグのSummaryを自分で書き、Summaryだけ読んで問題が分かるようにしよう。"),
      PITFALL("Viết Summary quá chung chung như 'Lỗi trang thanh toán' — không nói rõ hành vi sai, khiến Dev/PO phải mở issue ra mới hiểu, mất thời gian sàng lọc trên board.", "Writing a too-generic Summary like 'Payment page has a bug' — not stating the wrong behavior clearly, forcing Dev/PO to open the issue just to understand it, wasting time when scanning the board.", "『決済ページにバグあり』のような曖昧すぎるSummaryを書くこと——誤った挙動を明記しないと、開発者/POがissueを開かないと理解できず、ボードを見る際に時間がかかります。"),
      CODE("text", "BUG DA DIEN DAY DU TRUONG - SE-13400\nSummary: Nut Xac nhan dat hang bi mo, khong bam duoc tren Safari\nDescription: Trang Thanh toan ShopEasy, sau khi chon COD nut CTA chinh bi disable nham\nSteps: 1) Them SP vao gio 2) Sang Thanh toan 3) Chon COD 4) Xem nut Xac nhan dat hang\nExpected: Nut Xac nhan dat hang hien ro, bam duoc\nActual: Nut bi mo xam, khong bam duoc\nSeverity: Major | Priority: High\nAssignee: Dev A - module Thanh toan\nSprint: Sprint 16 | Label: payment, safari\nAttachment: screenshot-nut-mo.png"),
    ] },
  { heading: { vi: "5. Workflow trạng thái & luật chuyển đúng", en: "5. Status workflow & the rules for correct transitions", ja: "5. ワークフローの状態と正しい遷移ルール" },
    blocks: [
      P("Mỗi issue Bug đi qua một chuỗi trạng thái (workflow) từ khi tạo tới khi đóng: New → Open → In Progress → In Review → Resolved → Closed. Mỗi lần chuyển trạng thái đều có điều kiện: New sang Open cần được gán Assignee; In Review sang Resolved cần QA xác nhận đã sửa đúng trên môi trường kiểm thử, không phải Dev tự đóng.",
        "Every Bug issue passes through a chain of statuses (workflow) from creation to closing: New → Open → In Progress → In Review → Resolved → Closed. Each transition has a condition: New to Open requires an Assignee; In Review to Resolved requires QA to confirm the fix works on the test environment, not the Dev closing it themselves.",
        "全てのBugチケットは作成から完了まで、New→Open→In Progress→In Review→Resolved→Closedという一連の状態（ワークフロー）を経ます。各遷移には条件があります：NewからOpenへはAssigneeの割り当てが必要、In ReviewからResolvedへは、開発者自身が閉じるのではなく、QAがテスト環境で修正を確認する必要があります。"),
      IMG(m_workflow, "Sơ đồ workflow trạng thái chuẩn của 1 issue Bug trên Jira (SE · ShopEasy)", "The standard status workflow diagram for a Jira Bug issue (SE · ShopEasy)", "JiraのBugチケットにおける標準的なワークフロー状態遷移図（SE・ShopEasy）"),
      P("Chú ý hai đường nét đứt màu đỏ trong sơ đồ: 'verify FAIL' (In Review quay lại Reopened nếu QA thử lại thấy lỗi vẫn còn) và 'lỗi tái xuất hiện' (một issue đã Closed có thể bị mở lại thành Reopened nếu lỗi quay lại ở bản sau). Đây là hai đường CẦN CÓ trong workflow thực tế — thiếu chúng, team sẽ phải tạo issue trùng lặp thay vì mở lại issue cũ.",
        "Notice the two red dashed lines in the diagram: 'verify FAIL' (In Review goes back to Reopened if QA retests and the bug is still there) and 'bug reappears' (a Closed issue can be reopened as Reopened if the bug comes back in a later build). These two paths are NECESSARY in a real workflow — without them, the team would have to create duplicate issues instead of reopening the old one.",
        "図の2本の赤い点線に注目してください：『verify FAIL』（QAが再テストしてまだバグが残っている場合、In ReviewからReopenedに戻る）と『バグの再発』（後のビルドでバグが再発した場合、ClosedのissueをReopenedとして再オープンできる）。この2つの経路は実際のワークフローに必要です——これがないと、チームは古いissueを再オープンする代わりに重複したissueを作成することになります。"),
      TIP("Luôn chuyển trạng thái TUẦN TỰ theo đúng workflow, đừng kéo thẻ nhảy cóc từ New thẳng sang Closed — điều đó làm báo cáo tiến độ sai lệch và bỏ qua bước QA xác nhận quan trọng.", "Always move statuses SEQUENTIALLY according to the workflow, don't drag a card straight from New to Closed — that skews progress reports and skips the important QA confirmation step.", "常にワークフローに沿って順番に状態を遷移させ、NewからいきなりClosedへカードを移動させないようにしましょう——それは進捗報告を歪め、重要なQA確認ステップを飛ばすことになります。"),
    ] },
  { heading: { vi: "6. Tình huống 1: bug thiếu Assignee bị bỏ quên", en: "6. Situation 1: a bug with no Assignee gets forgotten", ja: "6. シーン1：Assigneeのないバグが忘れられる" },
    blocks: [
      SITUATION("Bạn tạo issue báo lỗi banner khuyến mãi hiển thị sai giá, nhưng vội việc khác nên không gán Assignee, nghĩ 'trưởng nhóm sẽ tự phân công'.", "You create an issue reporting the promo banner showing the wrong price, but rush off to something else without setting an Assignee, thinking 'the team lead will assign it'.",
        "6 ngày sau, issue vẫn nằm ở trạng thái Open, không ai bình luận, không ai xử lý — vì mỗi Dev nhìn vào board đều nghĩ 'chắc có người khác đang làm rồi', trong khi khách hàng vẫn tiếp tục thấy giá sai.",
        "Six days later, the issue is still Open, no comments, no one working on it — because every Dev looking at the board assumes 'someone else is probably already on it', while customers keep seeing the wrong price.",
        "プロモーションバナーの価格表示が間違っているissueを作成したが、急いでいたためAssigneeを設定せず、『リーダーが割り当ててくれるだろう』と考えた。",
        "6日後、issueは依然Openのまま、コメントもなく誰も対応していない——ボードを見た開発者は皆『誰か他の人が対応しているだろう』と考えたため。その間も顧客は誤った価格を見続けている。"),
      SOLVE("Luôn gán Assignee ngay khi tạo issue (hoặc trong buổi triage đầu ngày); dùng JQL 'assignee is EMPTY AND type = Bug' để rà soát định kỳ các bug bị bỏ quên và phân công lại ngay.", "Always set an Assignee right when creating the issue (or during the morning triage); use the JQL 'assignee is EMPTY AND type = Bug' to periodically review forgotten bugs and reassign them right away.", "issue作成時（または朝のトリアージ時）に必ずAssigneeを設定する。JQL『assignee is EMPTY AND type = Bug』を使い、忘れられたバグを定期的に確認しすぐに再割当する。"),
      P("Bài học ở đây là: một issue được viết hay nhưng không có chủ sở hữu rõ ràng thì cũng gần như vô hình trên board. Việc gán Assignee không phải là thủ tục hình thức — nó là cách duy nhất để một người cụ thể cảm thấy CÓ TRÁCH NHIỆM với lỗi đó, thay vì mọi người đều nghĩ 'chắc ai đó lo rồi'.",
        "The lesson here: even a well-written issue with no clear owner is almost invisible on the board. Assigning it isn't a formality — it's the only way to make one specific person feel RESPONSIBLE for that bug, instead of everyone assuming 'someone else has got it'.",
        "ここでの教訓は：うまく書かれたissueでも、明確な所有者がいなければボード上でほぼ見えない存在になるということです。Assigneeの割り当ては形式的な手続きではありません——特定の一人がそのバグに『責任を持つ』と感じる唯一の方法です。全員が『誰かが対応しているだろう』と思ってしまうのを防ぎます。"),
      IMG(m_noassignee, "Ticket lỗi bị bỏ quên 6 ngày vì chưa được gán Assignee", "A bug ticket forgotten for 6 days because it has no Assignee", "Assigneeが割り当てられず6日間放置されたバグチケット"),
      RECAP(["Gán Assignee ngay khi tạo issue, đừng để mặc định", "Dùng JQL rà soát định kỳ các bug chưa có người nhận"],
        ["Assign an Assignee right when creating the issue, don't leave it default", "Use JQL to periodically review bugs with no owner"],
        ["issue作成時に必ずAssigneeを設定し、デフォルトのままにしない", "JQLで担当者未割当のバグを定期的に確認する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: trạng thái nhảy sai làm lẫn báo cáo", en: "7. Situation 2: a wrong status jump confuses the report", ja: "7. シーン2：誤った状態遷移が報告を混乱させる" },
    blocks: [
      SITUATION("Cuối sprint gấp deadline, một Dev tự kéo thẻ bug từ 'In Progress' thẳng sang 'Closed' sau khi sửa code, bỏ qua bước 'In Review' để QA xác nhận lại.", "Rushing to meet the sprint deadline, a Dev drags a bug card straight from 'In Progress' to 'Closed' after fixing the code, skipping the 'In Review' step for QA to re-verify.",
        "Báo cáo cuối sprint hiển thị '5 bug đã fix xong', nhưng thực tế 2 trong số đó chưa được QA kiểm chứng — một lỗi trong đó tái xuất hiện ngay ở bản release kế tiếp, khiến team phải mở lại issue và giải thích với khách hàng vì sao lỗi 'đã đóng' lại quay về.",
        "The end-of-sprint report shows '5 bugs fixed', but actually 2 of them were never verified by QA — one of them reappears right in the next release, forcing the team to reopen the issue and explain to the customer why an 'already closed' bug came back.",
        "スプリント末のデッドラインに追われ、ある開発者はコード修正後、バグカードを『In Progress』から直接『Closed』へ動かし、QAが再検証する『In Review』ステップを飛ばしてしまう。",
        "スプリント末の報告では『5件のバグを修正完了』と表示されるが、実際にはそのうち2件はQAによって検証されていなかった——そのうちの1件が次のリリースで再発し、チームはissueを再オープンし、『クローズ済み』のはずのバグがなぜ戻ってきたのか顧客に説明せざるを得なくなる。"),
      SOLVE("Khoá quyền chuyển trực tiếp từ 'In Progress' sang 'Closed' trong cấu hình workflow của Jira (chỉ cho phép qua 'In Review'); mọi lần Reopened phải kèm comment giải thích lý do để dữ liệu báo cáo luôn phản ánh đúng thực tế.", "Lock down the Jira workflow configuration so it's not possible to jump directly from 'In Progress' to 'Closed' (only allow going through 'In Review'); every Reopened transition must include a comment explaining why, so report data always reflects reality.", "Jiraのワークフロー設定で『In Progress』から『Closed』への直接遷移をロックする（『In Review』を経由する場合のみ許可）。Reopenedへの遷移は必ず理由を説明するコメントを付け、報告データが常に実態を反映するようにする。"),
      P("Ví dụ này cho thấy vì sao 'đi đúng workflow' quan trọng không kém việc điền đủ trường. Một bug đóng sai quy trình không chỉ là rủi ro kỹ thuật (lỗi tái xuất hiện), mà còn làm SAI LỆCH mọi số liệu báo cáo — thứ Product Owner và khách hàng dựa vào để đánh giá chất lượng release. Trạng thái Jira không phải chỉ để 'trông đẹp trên board', nó là dữ liệu thật được dùng để ra quyết định.",
        "This example shows why 'following the correct workflow' matters just as much as filling in every field. A bug closed the wrong way isn't just a technical risk (the bug reappearing) — it also SKEWS every report metric that the Product Owner and customer rely on to judge release quality. Jira statuses aren't just for 'looking nice on the board'; they're real data used to make decisions.",
        "この例は、『正しいワークフローに沿う』ことが、全項目を記入することと同じくらい重要である理由を示しています。誤った手順で閉じられたバグは技術的リスク（再発）だけでなく、プロダクトオーナーや顧客がリリース品質を判断するために依存する全ての報告指標をも歪めます。Jiraの状態は『ボード上の見た目を良くする』ためだけのものではなく、意思決定に使われる実データなのです。"),
      IMG(m_dash, "Số liệu lỗi bị lệch: 5 bug 'đóng sai workflow' làm sai báo cáo sprint", "Skewed bug metrics: 5 bugs 'closed the wrong way' distort the sprint report", "誤ったワークフローでバグ指標が歪む：『誤った手順で閉じた』5件のバグがスプリント報告を狂わせる"),
      TRY("Xem lại một board Jira/Trello bạn từng dùng, thử tìm xem có thẻ nào 'nhảy cóc' trạng thái không đúng thứ tự hay không.", "Look back at a Jira/Trello board you've used and try to spot any card that 'skipped' a status out of order.", "以前使ったJira/Trelloのボードを見返し、順序を飛ばして状態が『ジャンプ』したカードがないか探してみよう。"),
    ] },
  { heading: { vi: "8. Comment, Log Work & liên kết bug với test case", en: "8. Comment, Log Work & linking a bug to a test case", ja: "8. Comment、Log Work、バグとテストケースのリンク" },
    blocks: [
      P("Một issue Jira không kết thúc ở lúc tạo — nó sống suốt vòng đời qua các Comment (trao đổi, cập nhật tiến độ) và Log Work (số giờ đã bỏ ra). Ngoài ra, Jira cho phép liên kết (Link) một issue Bug với issue khác, ví dụ 'is tested by' trỏ tới Test Case tương ứng — giúp bất kỳ ai mở bug cũng biết chính xác ca kiểm thử nào cần chạy lại để xác nhận.",
        "A Jira issue doesn't end at creation — it lives through its whole lifecycle via Comments (discussion, progress updates) and Log Work (hours spent). Jira also lets you Link a Bug issue to another issue, e.g. 'is tested by' pointing to the matching Test Case — so anyone opening the bug knows exactly which test case to rerun to confirm it.",
        "Jiraのissueは作成時点で終わりではありません——Comment（やり取りや進捗更新）とLog Work（作業時間）を通じてライフサイクル全体を生きます。またJiraでは、Bug issueを別のissueにLink（リンク）でき、例えば『is tested by』で対応するTest Caseを指すことができます——バグを開いた人が、確認のためどのテストケースを再実行すべきか正確に分かるようになります。"),
      STEP(1, "Sau mỗi lần trao đổi hoặc cập nhật tiến độ, viết Comment ngắn gọn, nêu rõ AI làm GÌ, thay vì im lặng chuyển trạng thái.", "After each discussion or progress update, write a short Comment stating clearly WHO did WHAT, instead of silently changing status.", "やり取りや進捗更新のたびに、状態を黙って変更するのではなく、誰が何をしたかを明記した短いCommentを書く。"),
      STEP(2, "Dùng Log Work để ghi số giờ thực tế đã bỏ ra xử lý issue — giúp team ước lượng công sức chính xác hơn cho sprint sau.", "Use Log Work to record the actual hours spent on the issue — helping the team estimate effort more accurately for future sprints.", "Log Workを使い、issueに実際に費やした時間を記録する——次のスプリントの見積もり精度向上に役立つ。"),
      STEP(3, "Vào mục Link issue, chọn quan hệ 'is tested by' hoặc 'relates to', tìm và gắn Test Case tương ứng để QA biết chạy lại ca nào khi verify.", "Go to the Link issue section, choose the 'is tested by' or 'relates to' relation, find and attach the matching Test Case so QA knows which case to rerun when verifying.", "Link issueのセクションで『is tested by』や『relates to』の関係を選び、対応するTest Caseを検索してリンクし、QAが検証時にどのケースを再実行すべきか分かるようにする。"),
      CODE("text", "COMMENT & LOG WORK - SE-13400\nComment (QA): Da xac nhan loi tren Safari 17, macOS. Video dinh kem.\nComment (Dev): Da sua, sai dieu kien CSS o class 'btn-cta'. Cho QA verify lai.\nLog Work: 1h30m - Debug CSS + fix + unit test\nLinked issue: 'is tested by' -> TC-0456 Kiem thu nut Xac nhan dat hang tren Safari"),
      TIP("Trước khi chuyển issue sang 'Resolved', kiểm tra xem đã Link tới đúng Test Case chưa — thiếu liên kết này, lần hồi quy sau rất dễ quên chạy lại đúng ca đã phát hiện lỗi.", "Before moving an issue to 'Resolved', check whether it's linked to the right Test Case — without this link, the next regression pass can easily forget to rerun the exact case that caught the bug.", "issueを『Resolved』に移す前に、正しいTest Caseにリンクされているか確認しましょう——このリンクがないと、次の回帰テストでバグを見つけたケースを再実行し忘れやすくなります。"),
    ] },
  { heading: { vi: "9. Lọc lỗi bằng JQL cơ bản & bảng board theo dõi", en: "9. Filtering bugs with basic JQL & a tracking board", ja: "9. 基本的なJQLでバグを絞り込み、ボードで追跡する" },
    blocks: [
      P("Khi dự án có hàng trăm issue, kéo mắt tìm từng lỗi là không thực tế. JQL (Jira Query Language) cho phép bạn viết một câu điều kiện ngắn để lọc đúng nhóm issue mình cần — không cần thuộc lòng cú pháp phức tạp, chỉ cần nhớ vài mẫu câu dùng thường xuyên.",
        "When a project has hundreds of issues, scanning by eye for each bug isn't realistic. JQL (Jira Query Language) lets you write a short condition to filter exactly the group of issues you need — no need to memorize complex syntax, just a few commonly-used patterns.",
        "プロジェクトに何百ものissueがある場合、目で一つ一つ探すのは現実的ではありません。JQL（Jira Query Language）を使えば、短い条件文で必要なissueグループを正確に絞り込めます——複雑な構文を丸暗記する必要はなく、よく使ういくつかのパターンを覚えれば十分です。"),
      IMG(m_jql, "Các câu lệnh JQL cơ bản để lọc lỗi trên board dự án ShopEasy", "Basic JQL queries for filtering bugs on the ShopEasy project board", "ShopEasyプロジェクトボードでバグを絞り込むための基本的なJQLクエリ"),
      P("Song song với JQL, bảng Kanban/Board là cách trực quan nhất để cả team nhìn thấy tổng thể: cột nào đang tồn đọng nhiều issue, thẻ nào bị 'kẹt' lâu ở một trạng thái. Thói quen tốt là dành 5–10 phút mỗi sáng để rà bảng board và các bộ lọc JQL đã lưu, thay vì chỉ nhớ trong đầu mình đang làm gì.",
        "Alongside JQL, the Kanban/Board view is the most visual way for the whole team to see the big picture: which column has a backlog piling up, which card has been 'stuck' in one status too long. A good habit is spending 5–10 minutes each morning scanning the board and saved JQL filters, instead of just relying on memory of what you're doing.",
        "JQLと並んで、Kanban/Boardビューはチーム全体が全体像を把握する最も視覚的な方法です：どの列にissueが溜まっているか、どのカードが1つの状態に長く『詰まって』いるか。毎朝5〜10分かけてボードと保存済みJQLフィルタを確認する習慣は、自分がやっていることを頭の中だけで覚えておくより良い方法です。"),
      IMG(m_kanban, "Bảng Kanban theo dõi lỗi ShopEasy trên Jira (Sprint 16)", "A Kanban board tracking ShopEasy bugs on Jira (Sprint 16)", "JiraでShopEasyのバグを追跡するKanbanボード（スプリント16）"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp (FAQ)", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗、コツとFAQ" },
    blocks: [
      PITFALL("Viết Description dài dòng nhưng thiếu Steps to reproduce rõ ràng — Dev đọc xong vẫn không biết làm sao để tự tái hiện lỗi trên máy của họ.", "Writing a long Description but missing clear Steps to reproduce — after reading it, the Dev still can't figure out how to reproduce the bug on their own machine.", "長いDescriptionを書いても明確なSteps to reproduceがない——読んでも開発者は自分のマシンでバグを再現する方法が分からない。"),
      PITFALL("Đặt Priority theo cảm tính cá nhân (thấy khó chịu là cho Highest) thay vì dựa trên ảnh hưởng thực tế tới người dùng hoặc doanh thu.", "Setting Priority by personal feeling (annoying = Highest) instead of based on the actual impact on users or revenue.", "実際のユーザーや収益への影響ではなく、個人的な感覚（イライラする＝Highest）でPriorityを設定する。"),
      TIP("Trước khi bấm 'Create', tự đọc lại issue một lượt như thể bạn chưa biết gì về lỗi này — nếu vẫn hiểu rõ Summary, Steps và mức độ ảnh hưởng, issue của bạn đã đạt chuẩn.", "Before clicking 'Create', reread the issue as if you knew nothing about the bug — if the Summary, Steps, and impact are still clear, your issue is up to standard.", "『Create』を押す前に、このバグについて何も知らないつもりで一度読み返す——それでもSummary、Steps、影響度が明確に分かれば、そのissueは基準を満たしています。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "Defect life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi", "初心者のための不具合ライフサイクル"),
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi", "初心者のためのバグレポートの書き方"),
      INTERNAL("Severity & Priority: đo nghiêm trọng, đo ưu tiên cho người mới", "Severity & Priority for beginners", "severity-priority-do-nghiem-trong-do-uu-tien-cho-nguoi-moi", "初心者のためのSeverityとPriority"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách dùng Jira để quản lý lỗi trên dự án ShopEasy: điền đầy đủ các trường của 1 issue Bug (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment), đi đúng workflow trạng thái, comment/log work minh bạch, liên kết bug với test case, và lọc lỗi bằng JQL cơ bản cùng bảng board. Hai tình huống thật cho thấy vì sao bỏ quên Assignee hay nhảy sai trạng thái đều gây hậu quả thật.",
        "You just learned how to use Jira to manage bugs on the ShopEasy project: filling in every field of a Bug issue (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment), following the correct status workflow, commenting/logging work transparently, linking bugs to test cases, and filtering bugs with basic JQL and a board. Two real situations showed why forgetting an Assignee or jumping statuses both cause real consequences.",
        "ShopEasyプロジェクトでJiraを使いバグを管理する方法を学びました：Bugチケットの全項目（Summary、Description、Steps、Severity、Priority、Assignee、Sprint、Label、Attachment）を記入すること、正しいステータスワークフローに沿うこと、透明にコメント・作業ログを記録すること、バグをテストケースにリンクすること、基本的なJQLとボードでバグを絞り込むこと。2つの実例は、Assigneeの割り当て忘れや誤った状態遷移がどちらも実際の悪影響を招くことを示しました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu sâu hơn về vòng đời của một lỗi và cách phân biệt Severity/Priority để đặt đúng trọng số cho từng issue bạn báo. Nếu muốn học bài bản từ con số 0 tới đi làm, thực hành trực tiếp trên Jira cùng dự án thật và người hướng dẫn, một khoá học Tester sẽ giúp bạn tự tin dùng thành thạo công cụ này ngay từ ngày đầu đi làm.",
        "Next, you should dig deeper into a bug's life cycle and how to tell Severity apart from Priority so you can weight each issue you report correctly. If you want to learn properly from zero to hired, practicing directly on Jira with real projects and a mentor, a Tester course will help you use this tool confidently from day one on the job.",
        "次は、不具合のライフサイクルとSeverity/Priorityの見分け方をより深く学び、報告する各issueに正しい重みを付けられるようにしましょう。指導者と実際のプロジェクトでJiraを直接使いながらゼロから就職まで体系的に学びたいなら、テスターコースが入社初日からこのツールを自信を持って使いこなす助けになります。"),
      CTA(course),
    ] },
];

const JIRA_01 = makeDoc({
  slug: "dung-jira-quan-ly-loi-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "dùng Jira quản lý lỗi",
  keywords: ["dùng Jira quản lý lỗi", "Jira cho tester", "tạo bug trên Jira", "workflow Jira", "JQL cơ bản cho người mới"],
  coverLabel: "NGƯỜI MỚI · JIRA QUẢN LÝ LỖI · TMĐT",
  crumb: "Dùng Jira quản lý lỗi cho người mới",
  metaTitle: { vi: "Dùng Jira quản lý lỗi cho người mới", en: "Using Jira to manage bugs for beginners", ja: "初心者向けJiraでのバグ管理" },
  metaDescription: {
    vi: "Dùng Jira quản lý lỗi cho người mới: tạo issue Bug đủ trường ShopEasy, đúng workflow, comment, liên kết test case, lọc JQL cơ bản, có hình và trắc nghiệm.",
    en: "Using Jira to manage bugs for beginners: creating a fully-filled Bug issue on the ShopEasy project, the correct status workflow, comment/log work, linking test cases, basic JQL filtering, with visuals and a quiz.",
    ja: "初心者向けJiraでのバグ管理：ShopEasyプロジェクトで全項目を埋めたBugチケットの作成、正しいステータスワークフロー、コメント/作業ログ、テストケースのリンク、基本的なJQL絞り込みを図とクイズで解説。",
  },
  title: {
    vi: "Dùng Jira quản lý lỗi cho người mới: tạo issue, workflow, JQL cơ bản (có trắc nghiệm)",
    en: "Using Jira to manage bugs for beginners: creating issues, workflow, basic JQL (with quiz)",
    ja: "初心者向けJiraでのバグ管理：issue作成、ワークフロー、基本JQL（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: dùng Jira quản lý lỗi trên dự án ShopEasy. Tạo issue Bug đầy đủ trường (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment), workflow trạng thái chuẩn, comment/log work, liên kết bug với test case, lọc JQL cơ bản và bảng board, hai tình huống thật (thiếu Assignee, nhảy sai trạng thái), FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: using Jira to manage bugs on the ShopEasy project. Creating a fully-filled Bug issue (Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment), standard status workflow, comment/log work, linking bugs to test cases, basic JQL filtering and a board, two real situations (missing Assignee, wrong status jump), FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ShopEasyプロジェクトでJiraを使いバグを管理する。全項目を埋めたBugチケット（Summary、Description、Steps、Severity、Priority、Assignee、Sprint、Label、Attachment）の作成、標準的なステータスワークフロー、コメント/作業ログ、バグとテストケースのリンク、基本的なJQL絞り込みとボード、2つの実例（Assignee未割当、誤った状態遷移）、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách tạo và theo dõi issue Bug trên Jira", steps: [
    { name: "Tạo issue Bug đầy đủ trường", text: "Summary, Description, Steps, Severity, Priority, Assignee, Sprint, Label, Attachment." },
    { name: "Đi đúng workflow trạng thái", text: "New → Open → In Progress → In Review → Resolved → Closed, không nhảy cóc." },
    { name: "Comment, log work và liên kết test case", text: "Ghi rõ tiến độ, số giờ, và link tới test case tương ứng để dễ verify." },
  ] },
  pages,
});

export const MB_JIRA_01 = [JIRA_01];
