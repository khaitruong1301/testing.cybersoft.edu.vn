// doc_beginner_manual.mjs — 5 bài NGƯỜI MỚI cho danh mục "Manual Testing".
// Chuẩn Testing_SEO_NguoiMoi: practice-first · ≥5 hình · ≥2 tình huống · 1 quiz 4–5 câu · SEO.
// Song ngữ Việt/English/日本語 (ja≠en). 12 chương/bài để vừa qua verify-newbie vừa đạt compliant seed.
import { P, IMG, TIP, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo, slugify } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { CODE } from "./engine.mjs";

// ─────────────────────────── Khóa học gắn (CTA/Course schema) ───────────────────────────
const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual testing, test design, bug report và automation.",
};

// ─────────────────────────── Helper vẽ hình minh hoạ SVG đơn giản ───────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function svg(title, rows, accent = "#38bdf8") {
  const h = 66 + rows.length * 28;
  const body = rows
    .map((r, i) => `<text x="26" y="${72 + i * 28}" font-size="13" fill="#cbd5e1">${esc(r)}</text>`)
    .join("");
  return `<svg viewBox="0 0 720 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="${h}" rx="14" fill="#0f172a"/>
<rect width="720" height="8" rx="4" fill="${accent}"/>
<text x="26" y="42" font-size="15" font-weight="800" fill="#e2e8f0">${esc(title)}</text>
${body}</svg>`;
}

// ─────────────────────────── Wrapper dựng 1 DOC hoàn chỉnh ───────────────────────────
function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: "edtech", kind: "beginner", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword,
    keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq),
    courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "manual-testing",
    slug: cfg.slug,
    cover,
    level: "beginner",
    tags: tags("congnghe", "edtech", "foundation", "beginner", "seo"),
    title: cfg.title,
    summary: cfg.summary,
    seo,
    pages: buildDoc(cfg.pages),
  };
}

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 1 — Manual Testing là gì? Nhập môn cho người mới
// ══════════════════════════════════════════════════════════════════════════════════════
const d1_faq1 = FAQ(
  "Manual testing là gì?", "What is manual testing?",
  "Manual testing (kiểm thử thủ công) là việc một người trực tiếp thao tác trên phần mềm theo các bước đã định, so sánh kết quả thực tế với kết quả mong đợi để tìm lỗi — không dùng công cụ tự động chạy thay.",
  "Manual testing is when a person operates the software step by step and compares actual results with expected results to find bugs, without automation tools running for them.",
  "手動テストとは？",
  "手動テストとは、人がソフトウェアを手順どおり操作し、実際の結果と期待結果を比較して不具合を見つける作業です。自動化ツールに任せません。");
const d1_faq2 = FAQ(
  "Người mới nên học manual hay automation trước?", "Should beginners learn manual or automation first?",
  "Nên học manual testing trước. Nó dạy bạn tư duy tìm lỗi, cách đọc yêu cầu và viết test case — nền tảng bắt buộc trước khi tự động hoá. Automation chỉ là công cụ chạy nhanh những gì bạn đã hiểu bằng tay.",
  "Learn manual testing first. It teaches bug-hunting mindset, reading requirements and writing test cases — the mandatory base before automation, which just runs faster what you already understand manually.",
  "初心者は手動と自動のどちらを先に学ぶ？",
  "まず手動テストを学びましょう。要件の読み方やテストケース作成など、自動化の前に必要な基礎が身につきます。");
const d1_faq3 = FAQ(
  "Không biết lập trình có làm manual testing được không?", "Can I do manual testing without coding?",
  "Được. Manual testing ở mức nhập môn không đòi hỏi lập trình; bạn cần tư duy cẩn thận, quan sát tốt và biết viết test case rõ ràng. Khi muốn tiến xa hơn (automation), bạn sẽ học thêm code dần dần.",
  "Yes. Entry-level manual testing does not require coding; you need care, good observation and clear test-case writing. To go further into automation you will gradually learn some code.",
  "プログラミングなしで手動テストはできる？",
  "できます。入門レベルの手動テストにコーディングは不要で、注意深さと明確なテストケース作成力が大切です。");

const d1_quiz = [
  mcq({
    q: { vi: "Manual testing khác automation testing ở điểm cốt lõi nào?", en: "What is the core difference between manual and automation testing?", ja: "手動テストと自動テストの核心的な違いは？" },
    options: [
      { vi: "Manual không cần kết quả mong đợi", en: "Manual needs no expected result", ja: "手動は期待結果が不要" },
      { vi: "Người trực tiếp thao tác thay vì công cụ chạy tự động", en: "A person operates instead of a tool running automatically", ja: "ツールではなく人が操作する" },
      { vi: "Manual luôn nhanh hơn", en: "Manual is always faster", ja: "手動は常に速い" },
      { vi: "Manual không tìm được lỗi", en: "Manual cannot find bugs", ja: "手動はバグを見つけられない" },
    ], correct: 1,
    explain: { vi: "Bản chất manual là con người thao tác và đánh giá; automation dùng script chạy thay.", en: "Manual means a human operates and judges; automation uses scripts to run instead.", ja: "手動は人が操作・判断し、自動はスクリプトが代行します。" },
  }),
  mcq({
    q: { vi: "Bước ĐẦU TIÊN khi nhận một chức năng để kiểm thử thủ công là gì?", en: "What is the FIRST step when you receive a feature to test manually?", ja: "手動テストで機能を受け取ったとき最初のステップは？" },
    options: [
      { vi: "Báo lỗi ngay", en: "Report a bug immediately", ja: "すぐにバグ報告" },
      { vi: "Đọc và hiểu yêu cầu của chức năng", en: "Read and understand the requirement", ja: "要件を読んで理解する" },
      { vi: "Viết code automation", en: "Write automation code", ja: "自動化コードを書く" },
      { vi: "Xoá dữ liệu cũ", en: "Delete old data", ja: "古いデータを削除" },
    ], correct: 1,
    explain: { vi: "Không hiểu yêu cầu thì không biết thế nào là đúng — luôn đọc yêu cầu trước.", en: "Without understanding the requirement you cannot know what 'correct' is — always read it first.", ja: "要件を理解しなければ正しさが分かりません。まず要件を読みます。" },
  }),
  mcq({
    q: { vi: "Kết quả mong đợi (expected result) nên viết thế nào?", en: "How should the expected result be written?", ja: "期待結果はどう書くべき？" },
    options: [
      { vi: "'Chạy được' cho ngắn gọn", en: "'It works' for brevity", ja: "簡潔に「動く」" },
      { vi: "Cụ thể, đo được, ví dụ 'hiện thông báo Sai mật khẩu'", en: "Specific and measurable, e.g. 'shows Wrong password'", ja: "具体的で測定可能に、例「パスワード誤りを表示」" },
      { vi: "Không cần viết", en: "No need to write it", ja: "書く必要はない" },
      { vi: "Tùy người kiểm", en: "Up to the tester's mood", ja: "テスター次第" },
    ], correct: 1,
    explain: { vi: "Kết quả mong đợi phải cụ thể để khẳng định chắc chắn pass hay fail.", en: "The expected result must be specific to confidently decide pass or fail.", ja: "合否を確実に判断するため具体的に書きます。" },
  }),
  mcq({
    q: { vi: "Vì sao người mới nên bắt đầu từ manual testing?", en: "Why should beginners start with manual testing?", ja: "なぜ初心者は手動テストから始めるべき？" },
    options: [
      { vi: "Vì nó không bao giờ dùng công cụ", en: "Because it never uses tools", ja: "ツールを一切使わないから" },
      { vi: "Vì nó rèn tư duy tìm lỗi và đọc yêu cầu — nền cho automation", en: "It builds bug-hunting mindset and requirement reading — the base for automation", ja: "バグ発見思考と要件理解が身につき、自動化の基礎になるから" },
      { vi: "Vì nó trả lương cao nhất", en: "Because it pays the most", ja: "最も給料が高いから" },
      { vi: "Vì không cần suy nghĩ", en: "Because it needs no thinking", ja: "考える必要がないから" },
    ], correct: 1,
    explain: { vi: "Manual dạy nền tảng tư duy; automation chỉ chạy nhanh những gì bạn đã hiểu.", en: "Manual teaches the thinking base; automation just runs faster what you understand.", ja: "手動は思考の基礎を教え、自動は理解済みを速く実行します。" },
  }),
];

const d1_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì", en: "1. TL;DR & what you'll be able to do", ja: "1. 要点とできるようになること" },
    blocks: [
      TLDR(
        "Manual testing là gì? Là việc bạn tự tay thao tác phần mềm theo từng bước để tìm lỗi. Sau bài này bạn hiểu quy trình kiểm thử thủ công và tự chạy được một lượt kiểm tra đơn giản.",
        "What is manual testing? It is operating the software by hand, step by step, to find bugs. After this you will understand the manual testing flow and run a simple test pass yourself.",
        "手動テストとは？手順どおりに自分で操作して不具合を見つける作業です。この後、手動テストの流れを理解し、簡単な検証を実施できます。"),
      P("Manual testing là gì và tại sao nó lại là bước khởi đầu của gần như mọi Tester? Nếu bạn mới vào nghề, đây chính là kỹ năng đầu tiên bạn dùng mỗi ngày: mở phần mềm ra, thử từng chức năng như một người dùng khó tính, và ghi lại chỗ nào chạy sai. Bài viết này đi từ con số 0, có hình minh hoạ, ví dụ thật và một bài trắc nghiệm ở cuối để bạn tự kiểm tra.",
        "What is manual testing, and why is it the starting point for almost every tester? If you are new, this is the first skill you use daily: open the app, try each feature like a picky user, and record where it goes wrong. This guide starts from zero with illustrations, real examples and a quiz at the end.",
        "手動テストとは何か、そしてなぜほぼ全てのテスターの出発点なのでしょうか。新人が毎日使う最初のスキルであり、アプリを開き、機能を厳しいユーザーのように試し、不具合を記録します。本記事はゼロから、図と実例、最後にクイズ付きで解説します。"),
      IMG(svg("Vòng đời một lần kiểm thử thủ công", ["1) Đọc yêu cầu  →  2) Viết/đọc test case", "3) Thao tác thật trên phần mềm", "4) So sánh kết quả thực tế vs mong đợi", "5) Ghi nhận lỗi (nếu có)  →  6) Kiểm lại"], "#22d3ee"),
        "Vòng đời một lần kiểm thử thủ công gồm 6 bước", "The lifecycle of one manual test pass in 6 steps", "手動テスト1回のライフサイクル（6ステップ）"),
      DEF("Manual testing", "kiểm thử thủ công — con người trực tiếp thao tác và đánh giá phần mềm, không dùng script chạy tự động.",
        "manual testing — a human directly operates and evaluates the software, without auto-running scripts.",
        "手動テスト — 人が直接ソフトを操作・評価し、自動スクリプトを使わないこと。"),
    ] },
  { heading: { vi: "2. Khái niệm nền tảng: kiểm thử là so sánh", en: "2. Foundation: testing is comparison", ja: "2. 基礎：テストとは比較" },
    blocks: [
      P("Hãy hình dung bạn mua một chiếc bánh và so với ảnh quảng cáo: nếu giống thì đạt, nếu thiếu nhân thì không đạt. Kiểm thử phần mềm cũng vậy — bạn luôn so sánh cái phần mềm THỰC SỰ làm với cái nó ĐÁNG LẼ phải làm. Chỗ nào lệch nhau chính là lỗi.",
        "Imagine buying a cake and comparing it to the ad photo: matching means pass, missing filling means fail. Software testing is the same — you always compare what the software ACTUALLY does with what it SHOULD do. Any mismatch is a bug.",
        "広告写真とケーキを比べる場面を想像してください。一致すれば合格、具が足りなければ不合格。ソフトのテストも同じで、実際の動作とあるべき動作を比較し、ずれがバグです。"),
      DEF("Lỗi (bug/defect)", "sự khác biệt giữa kết quả thực tế và kết quả mong đợi của phần mềm.",
        "the difference between the software's actual result and its expected result.",
        "ソフトの実際の結果と期待結果との差異。"),
      P("Điều nhiều bạn mới hiểu nhầm là nghĩ tester chỉ 'bấm lung tung xem có sập không'. Thực ra công việc rất có hệ thống: mỗi lần bấm đều có mục tiêu, có kết quả mong đợi rõ ràng để đối chiếu. Chính sự rõ ràng đó phân biệt một tester chuyên nghiệp với người dùng bình thường.",
        "A common beginner myth is that testers just 'click randomly to see if it crashes'. In reality the work is systematic: every action has a goal and a clear expected result to compare against. That clarity separates a professional tester from an ordinary user.",
        "初心者は「適当にクリックして落ちるか見る」と誤解しがちですが、実際は体系的です。各操作に目的と明確な期待結果があります。それがプロと一般ユーザーの違いです。"),
      IMG(svg("So sánh Thực tế vs Mong đợi", ["Nhập mật khẩu sai", "Mong đợi: hiện 'Sai thông tin đăng nhập'", "Thực tế: trang trắng, không báo gì", "=> LỖI: thiếu thông báo lỗi"], "#f472b6"),
        "Lỗi xuất hiện khi kết quả thực tế lệch kết quả mong đợi", "A bug appears when actual differs from expected", "実際が期待と異なるときバグが発生"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng & khi nào dùng manual", en: "3. Why it matters & when to use manual", ja: "3. 重要性と手動を使う場面" },
    blocks: [
      P("Manual testing quan trọng vì nó bắt được những lỗi mà máy khó thấy: giao diện xấu, chữ khó hiểu, luồng thao tác gây bối rối, cảm giác dùng không mượt. Đây là góc nhìn của con người thật — thứ mà automation không thay thế được.",
        "Manual testing matters because it catches bugs machines struggle to see: ugly UI, confusing wording, awkward flows, a rough feel. This is a real human perspective — something automation cannot replace.",
        "手動テストが重要なのは、機械が見つけにくい不具合（醜いUI・分かりにくい文言・使いにくい流れ）を捉えられるからです。これは人間の視点で、自動化では代替できません。"),
      P("Bạn dùng manual nhiều nhất ở: chức năng mới làm lần đầu (exploratory), kiểm nhanh trước khi giao hàng, và những màn hình cần cảm nhận trải nghiệm. Khi một bộ ca đã ổn định và lặp lại nhiều lần, người ta mới cân nhắc chuyển sang automation để đỡ tốn công.",
        "You use manual most for: brand-new features (exploratory), quick checks before shipping, and screens where experience matters. Once a set of cases is stable and repeated often, teams consider moving it to automation to save effort.",
        "手動が最も活きるのは、新機能の探索的テスト、出荷前の素早い確認、体験が重要な画面です。ケースが安定し繰り返しが多くなって初めて、自動化を検討します。"),
      P("Trong một dự án thật, manual và automation không loại trừ nhau mà bổ sung cho nhau. Người mới thường bắt đầu ở phần manual, tích luỹ hiểu biết về sản phẩm, rồi mở rộng dần sang tự động khi đã vững. Vì vậy đừng vội bỏ qua manual để 'nhảy' thẳng vào automation — nền không chắc thì nhà sẽ nghiêng.",
        "In a real project, manual and automation complement rather than exclude each other. Beginners usually start with manual, build product knowledge, then expand into automation once solid. So do not skip manual to 'jump' straight to automation — a weak base makes the house lean.",
        "実務では手動と自動は排他ではなく補完関係です。初心者はまず手動で製品知識を蓄え、慣れてから自動へ広げます。基礎を飛ばして自動へ跳ぶと家が傾きます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: những gì cần để bắt đầu", en: "4. Prepare: what you need to start", ja: "4. 準備：始めるのに必要なもの" },
    blocks: [
      P("Tin vui: bạn gần như không cần gì đắt tiền. Một phần mềm để kiểm (web/app quen thuộc), một bảng tính để ghi ca, và tài liệu yêu cầu là đủ cho những ngày đầu.",
        "Good news: you need almost nothing expensive. An app to test (a familiar web/app), a spreadsheet to record cases, and a requirement doc are enough for the first days.",
        "朗報です。高価な物はほぼ不要です。検証対象アプリ、ケース記録用の表計算、要件資料があれば最初は十分です。"),
      STEP(1, "Chọn một ứng dụng quen thuộc (ví dụ trang đăng nhập của một website bạn hay dùng).", "Pick a familiar app (e.g. the login page of a site you often use).", "使い慣れたアプリ（例：よく使うサイトのログイン画面）を選ぶ。"),
      STEP(2, "Mở bảng tính, tạo các cột: ID · Mục tiêu · Các bước · Dữ liệu · Kết quả mong đợi · Kết quả thực tế · Pass/Fail.", "Open a spreadsheet with columns: ID · Goal · Steps · Data · Expected · Actual · Pass/Fail.", "表計算に列を作る：ID・目的・手順・データ・期待・実際・合否。"),
      TRY("Mở một trang web bất kỳ, chọn 1 nút và viết 1 dòng: bạn kỳ vọng điều gì xảy ra khi bấm nút đó?", "Open any website, pick one button and write one line: what do you expect when you click it?", "任意のサイトでボタンを1つ選び、押したら何が起きると期待するか1行書こう。"),
      PITFALL("Người mới hay bỏ qua bước đọc yêu cầu và kiểm theo cảm tính — dẫn tới báo 'lỗi' mà thực ra là đúng thiết kế.", "Beginners often skip reading the requirement and test by feel — leading to reporting 'bugs' that are actually by design.", "初心者は要件を読まず感覚で検証しがちで、実は仕様どおりの動作を『バグ』と報告してしまいます。"),
      IMG(svg("Mẫu bảng ghi test case tối thiểu", ["ID | Mục tiêu | Các bước | Dữ liệu", "Kết quả mong đợi | Kết quả thực tế | Pass/Fail", "TC01 | Đăng nhập đúng | ... | user/pass", "=> Vào trang chủ | Vào trang chủ | Pass"], "#34d399"),
        "Bảng ghi test case tối thiểu cho người mới", "A minimal test case sheet for beginners", "初心者向け最小限のテストケース表"),
    ] },
  { heading: { vi: "5. Làm theo từng bước: chạy một lượt kiểm thử", en: "5. Step by step: run one test pass", ja: "5. ステップ実践：1回の検証を回す" },
    blocks: [
      P("Bây giờ ta cùng chạy thật một lượt kiểm thử cho ô đăng nhập. Hãy làm chậm và rõ, vì thói quen tốt hình thành ngay từ những lần đầu.",
        "Now let's actually run one test pass for a login field. Go slow and clear, because good habits form in the very first attempts.",
        "では実際にログイン欄で1回検証してみましょう。良い習慣は最初の数回で作られるので、ゆっくり丁寧に進めます。"),
      STEP(1, "Đọc yêu cầu: 'Nhập đúng email + mật khẩu thì vào trang chủ; sai thì báo lỗi rõ ràng'.", "Read the requirement: 'correct email + password logs in; wrong shows a clear error'.", "要件を読む：『正しいメール＋パスワードでログイン、誤りは明確なエラー表示』。"),
      STEP(2, "Liệt kê nhanh các ca: đúng hết, sai mật khẩu, bỏ trống ô, sai định dạng email.", "List cases quickly: all correct, wrong password, empty field, invalid email format.", "ケースを列挙：全て正しい・パスワード誤り・空欄・メール形式不正。"),
      STEP(3, "Thao tác từng ca và ghi kết quả thực tế vào cột tương ứng, đánh dấu Pass/Fail.", "Execute each case and record the actual result, mark Pass/Fail.", "各ケースを実行し実際の結果を記録、合否を付ける。"),
      CODE("text", "TC01 Đúng hết      -> mong đợi: vào trang chủ           | thực tế: vào trang chủ            | Pass\nTC02 Sai mật khẩu  -> mong đợi: 'Sai thông tin đăng nhập' | thực tế: trang trắng             | Fail (bug)\nTC03 Bỏ trống ô    -> mong đợi: nút Đăng nhập bị mờ       | thực tế: nút vẫn bấm được         | Fail (bug)\nTC04 Email sai @   -> mong đợi: 'Email không hợp lệ'       | thực tế: 'Email không hợp lệ'     | Pass"),
      TRY("Tự thêm 1 ca nữa cho ô mật khẩu (gợi ý: mật khẩu quá ngắn) và đoán kết quả mong đợi.", "Add one more case for the password field (hint: too-short password) and guess the expected result.", "パスワード欄のケースを1つ追加（ヒント：短すぎる）し、期待結果を予想しよう。"),
      IMG(svg("Bảng kết quả sau khi chạy", ["TC01 Pass ✔   TC02 Fail ✘ (thiếu thông báo)", "TC03 Fail ✘ (nút không bị khoá)   TC04 Pass ✔", "=> 2 lỗi cần báo cho lập trình viên"], "#fbbf24"),
        "Bảng kết quả sau khi chạy một lượt kiểm thử", "Results table after running one test pass", "1回検証後の結果表"),
    ] },
  { heading: { vi: "6. Tình huống 1: kiểm form đăng ký", en: "6. Situation 1: testing a sign-up form", ja: "6. シーン1：会員登録フォームの検証" },
    blocks: [
      SITUATION("Bạn được giao kiểm form đăng ký tài khoản.", "You are asked to test a sign-up form.",
        "Form có: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu, nút Đăng ký. Hãy tìm ra các ca cần kiểm.",
        "The form has: Full name, Email, Password, Confirm password, Sign up button. Find the cases to test.",
        "会員登録フォームを検証する。", "氏名・メール・パスワード・確認用・登録ボタンがあります。検証ケースを見つけましょう。"),
      SOLVE("Chia theo từng ô và theo mối quan hệ giữa các ô (mật khẩu vs xác nhận).", "Split per field and by relationships between fields (password vs confirm).", "各欄ごと、そして欄同士の関係（パスワードと確認）で分ける。"),
      P("Với mỗi ô, nghĩ tới: để trống, giá trị hợp lệ, giá trị sai định dạng. Ngoài ra có một ca 'quan hệ' rất hay bị bỏ sót: khi 'Xác nhận mật khẩu' không khớp 'Mật khẩu' thì phải báo lỗi. Đây là ví dụ cho thấy tư duy tester đi xa hơn việc kiểm từng ô riêng lẻ.",
        "For each field, think: empty, valid, invalid format. There is also a 'relationship' case often missed: when Confirm password does not match Password, it must show an error. This shows tester thinking goes beyond checking each field alone.",
        "各欄について、空・有効・形式不正を考えます。さらに見落としがちな『関係』ケース：確認用がパスワードと不一致ならエラー表示が必要です。テスターの思考は単独欄を超えます。"),
      CODE("text", "TC01: mọi ô hợp lệ, mật khẩu khớp        -> đăng ký thành công\nTC02: email thiếu '@'                     -> 'Email không hợp lệ'\nTC03: mật khẩu và xác nhận KHÁC nhau     -> 'Mật khẩu không khớp'\nTC04: bỏ trống Họ tên                    -> 'Vui lòng nhập họ tên'"),
      RECAP(["Kiểm từng ô + kiểm quan hệ giữa các ô", "Mỗi ca có kết quả mong đợi cụ thể"],
        ["Test each field + relationships between fields", "Each case has a concrete expected result"],
        ["各欄と欄同士の関係を検証", "各ケースに具体的な期待結果"]),
    ] },
  { heading: { vi: "7. Tình huống 2: kiểm chức năng tìm kiếm", en: "7. Situation 2: testing a search feature", ja: "7. シーン2：検索機能の検証" },
    blocks: [
      SITUATION("Kiểm ô tìm kiếm sản phẩm của một trang bán hàng.", "Test the product search box of a shopping site.",
        "Người dùng gõ từ khoá và bấm tìm; hệ thống trả về danh sách sản phẩm phù hợp.",
        "A user types a keyword and searches; the system returns matching products.",
        "ショッピングサイトの商品検索欄を検証する。", "利用者がキーワードを入力して検索し、一致商品が返ります。"),
      SOLVE("Nghĩ tới ca có kết quả, ca không có kết quả, và ca đầu vào lạ.", "Think of cases with results, no results, and odd inputs.", "結果あり・結果なし・変わった入力のケースを考える。"),
      P("Tìm kiếm là nơi rất nhiều lỗi ẩn nấp. Bạn nên thử: từ khoá có thật (phải ra sản phẩm), từ khoá không tồn tại (phải hiện 'Không tìm thấy' chứ không phải trang trắng), ô để trống, và đầu vào lạ như khoảng trắng thừa hay ký tự đặc biệt. Mỗi ca giúp bạn hiểu hệ thống phản ứng ra sao với thực tế muôn hình vạn trạng.",
        "Search is where many bugs hide. Try: a real keyword (must return products), a non-existent keyword (must show 'No results', not a blank page), an empty box, and odd inputs like extra spaces or special characters. Each case reveals how the system reacts to messy reality.",
        "検索は多くのバグが潜む場所です。実在キーワード（商品が出る）、存在しない語（空白でなく『該当なし』表示）、空欄、余分な空白や特殊文字などを試します。各ケースで挙動が分かります。"),
      CODE("text", "TC01: 'áo thun'        -> hiện danh sách áo thun\nTC02: 'xyzk123kh0ng'   -> hiện 'Không tìm thấy sản phẩm'\nTC03: ô để trống + Tìm -> giữ nguyên trang / gợi ý nhập từ khoá\nTC04: '   áo   '       -> vẫn tìm ra 'áo' (bỏ khoảng trắng thừa)"),
      IMG(svg("Ba nhóm ca cho ô tìm kiếm", ["Có kết quả: từ khoá thật", "Không kết quả: báo 'Không tìm thấy'", "Đầu vào lạ: trống, khoảng trắng, ký tự đặc biệt"], "#a78bfa"),
        "Ba nhóm ca kiểm thử cho chức năng tìm kiếm", "Three case groups for testing search", "検索機能の3つのケース群"),
      TRY("Thử gõ một từ khoá có dấu cách ở đầu và cuối trên một trang bạn hay dùng — kết quả có đúng không?", "Try a keyword with leading/trailing spaces on a site you use — is the result correct?", "よく使うサイトで前後に空白を付けた語を検索し、結果が正しいか確認しよう。"),
    ] },
  { heading: { vi: "8. Mini-project: tự kiểm một màn hình trọn vẹn", en: "8. Mini-project: test a whole screen yourself", ja: "8. ミニ演習：画面全体を自分で検証" },
    blocks: [
      P("Đến đây bạn đã đủ công cụ để tự làm một mini-project nhỏ. Hãy chọn màn hình 'Liên hệ' (Contact) của bất kỳ website nào và kiểm nó như một tester thực thụ.",
        "By now you have enough tools for a small mini-project. Pick the 'Contact' screen of any website and test it like a real tester.",
        "ここまでで小さな演習に十分な道具が揃いました。任意サイトの『お問い合わせ』画面を、本物のテスターのように検証しましょう。"),
      STEP(1, "Liệt kê các ô: Tên, Email, Nội dung, nút Gửi.", "List the fields: Name, Email, Message, Send button.", "欄を列挙：名前・メール・本文・送信ボタン。"),
      STEP(2, "Với mỗi ô viết ít nhất 2 ca (hợp lệ + 1 ca lỗi). Đừng quên ca gửi khi để trống tất cả.", "For each field write at least 2 cases (valid + 1 error). Don't forget submitting when all empty.", "各欄に最低2ケース（有効＋エラー1）。全空欄で送信するケースも忘れずに。"),
      STEP(3, "Chạy và ghi Pass/Fail. Với mỗi Fail, mô tả rõ 'thấy gì' và 'đáng lẽ thấy gì'.", "Run and record Pass/Fail. For each Fail, describe 'what you saw' vs 'what should show'.", "実行し合否を記録。各Failで『見えたもの』と『あるべきもの』を書く。"),
      TRY("Đặt mục tiêu tìm ít nhất 1 điểm khó dùng (UX) trên màn hình đó — không nhất thiết là lỗi chức năng.", "Aim to find at least 1 usability rough spot on that screen — not necessarily a functional bug.", "その画面で機能バグでなくても使いにくい点を1つ以上見つけよう。"),
      P("Mini-project này nhỏ nhưng chứa gần đủ những gì bạn làm ở công ty: đọc, thiết kế ca, chạy, ghi nhận và mô tả lỗi. Làm đi làm lại trên nhiều màn hình khác nhau, phản xạ của bạn sẽ nhanh và chắc lên từng ngày.",
        "This mini-project is small but contains almost everything you do at a company: read, design cases, run, record and describe bugs. Repeat it across different screens and your instincts sharpen daily.",
        "この演習は小さいですが、実務のほぼ全て（読む・設計・実行・記録・記述）を含みます。様々な画面で繰り返せば、反射的に速く正確になります。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Ai mới bắt đầu cũng vấp vài lỗi giống nhau. Biết trước sẽ giúp bạn tránh và trông chuyên nghiệp hơn trong mắt đội ngũ.",
        "Everyone stumbles on a few of the same mistakes at first. Knowing them helps you avoid them and look more professional to the team.",
        "誰でも最初は同じ失敗をします。事前に知れば避けられ、チームからの信頼も上がります。"),
      PITFALL("Không đọc yêu cầu, kiểm theo suy đoán — dễ báo nhầm và bỏ sót ca quan trọng.", "Not reading the requirement and testing by guesswork — easy to misreport and miss key cases.", "要件を読まず推測で検証すると、誤報告や重要ケースの見落としが起きます。"),
      PITFALL("Ghi kết quả thực tế mơ hồ như 'bị lỗi' mà không nói lỗi gì — lập trình viên không tái hiện được.", "Recording vague actuals like 'it's broken' without saying how — developers can't reproduce it.", "実際の結果を『壊れている』など曖昧に書くと、開発者が再現できません。"),
      P("Mẹo lớn nhất cho người mới: luôn viết đủ 'thấy gì' và 'đáng lẽ thấy gì'. Chỉ cần hai câu này rõ ràng, một người chưa từng thấy màn hình vẫn hiểu và tái hiện được vấn đề. Đó là chuẩn mực của một ghi nhận chuyên nghiệp.",
        "The biggest tip for beginners: always write both 'what you saw' and 'what should show'. With these two clear, someone who has never seen the screen can understand and reproduce the issue. That is the mark of a professional record.",
        "初心者への最大のコツ：常に『見えたもの』と『あるべきもの』を書くこと。この2つが明確なら、画面を見たことがない人でも再現できます。それがプロの記録です。"),
      IMG(svg("Trước & sau khi mô tả lỗi tốt", ["✗ 'Đăng nhập bị lỗi'", "✓ 'Nhập mật khẩu sai: trang trắng,", "  đáng lẽ hiện Sai thông tin đăng nhập'"], "#fb7185"),
        "So sánh mô tả lỗi mơ hồ và mô tả rõ ràng", "Vague vs clear bug description", "曖昧な記述と明確な記述の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      d1_faq1.block, d1_faq2.block, d1_faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi"),
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
    ] },
  QUIZ(d1_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa hiểu manual testing là gì, chạy được một lượt kiểm thử và làm quen với tư duy so sánh 'thực tế vs mong đợi'. Hãy luyện thêm trên nhiều màn hình khác nhau, mỗi ngày một ít, để phản xạ tìm lỗi trở nên tự nhiên.",
        "You now understand what manual testing is, can run a test pass, and got used to the 'actual vs expected' comparison mindset. Keep practicing across many screens, a little each day, until bug-finding becomes second nature.",
        "手動テストとは何かを理解し、1回の検証を実施し、『実際と期待』の比較思考に慣れました。様々な画面で毎日少しずつ練習し、バグ発見を反射的にしましょう。"),
      P("Chặng tiếp theo là học cách viết test case bài bản, ghi bug report chuyên nghiệp và các kỹ thuật thiết kế ca. Nếu muốn có lộ trình rõ ràng cùng người hướng dẫn để tự tin ứng tuyển vị trí Tester, một khoá học bài bản sẽ giúp bạn rút ngắn thời gian rất nhiều.",
        "Next steps are writing proper test cases, professional bug reports and case-design techniques. If you want a clear roadmap with a mentor to confidently apply for a Tester role, a structured course saves a lot of time.",
        "次はテストケース作成、プロのバグ報告、ケース設計技法です。指導付きの明確なロードマップが欲しいなら、体系的なコースが時間を大きく短縮します。"),
      CTA(course),
    ] },
];

const DOC1 = makeDoc({
  slug: "manual-testing-la-gi-cho-nguoi-moi",
  primaryKeyword: "manual testing là gì",
  keywords: ["manual testing là gì", "kiểm thử thủ công", "manual testing cho người mới", "học tester từ đầu"],
  coverLabel: "NGƯỜI MỚI · MANUAL TESTING",
  crumb: "Manual testing là gì (người mới)",
  metaTitle: {
    vi: "Manual testing là gì? Hướng dẫn cho người mới",
    en: "What is manual testing? A beginner's guide",
    ja: "手動テストとは？初心者向けガイド",
  },
  metaDescription: {
    vi: "Manual testing là gì và cách bắt đầu cho người mới: quy trình 6 bước, ví dụ đăng nhập/đăng ký/tìm kiếm, lỗi hay gặp, trắc nghiệm và lộ trình khóa Tester CyberSoft.",
    en: "What manual testing is and how beginners start: a 6-step flow, login/sign-up/search examples, common mistakes, a quiz and CyberSoft's Tester roadmap.",
    ja: "手動テストとは何か、初心者の始め方を6ステップと実例で解説します。",
  },
  title: {
    vi: "Manual testing là gì? Nhập môn kiểm thử thủ công cho người mới (có ví dụ & trắc nghiệm)",
    en: "What is manual testing? A beginner's intro to manual testing (with examples & quiz)",
    ja: "手動テストとは？初心者向け手動テスト入門（例題・クイズ付き）",
  },
  summary: {
    vi: "Bài nền tảng cho người mới: manual testing là gì, quy trình kiểm thử 6 bước, tư duy so sánh thực tế vs mong đợi, ví dụ đăng nhập/đăng ký/tìm kiếm, mini-project, lỗi hay gặp, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner foundation: what manual testing is, a 6-step flow, actual-vs-expected mindset, login/sign-up/search examples, a mini-project, common mistakes, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け基礎：手動テストとは、6ステップの流れ、実例、ミニ演習、FAQ、クイズ。",
  },
  faqs: [d1_faq1, d1_faq2, d1_faq3],
  howTo: { name: "Cách chạy một lượt kiểm thử thủ công cho người mới", steps: [
    { name: "Đọc yêu cầu", text: "Hiểu rõ chức năng đáng lẽ phải làm gì." },
    { name: "Liệt kê ca kiểm thử", text: "Ca đúng, ca sai, ca để trống, ca đầu vào lạ." },
    { name: "Chạy và so sánh", text: "Thao tác thật, so sánh kết quả thực tế với mong đợi, đánh dấu Pass/Fail." },
  ] },
  pages: d1_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 2 — Cách viết test case cho người mới
// ══════════════════════════════════════════════════════════════════════════════════════
const d2_faq1 = FAQ(
  "Test case gồm những thành phần nào?", "What parts make up a test case?",
  "Một test case cơ bản gồm: ID, mục tiêu, điều kiện tiền đề, dữ liệu đầu vào, các bước thực hiện và kết quả mong đợi. Kết quả mong đợi là phần quan trọng nhất để kết luận đạt hay không đạt.",
  "A basic test case has: ID, goal, precondition, input data, steps and expected result. The expected result is the most important part to decide pass or fail.",
  "テストケースの構成要素は？",
  "基本のテストケースはID・目的・前提条件・入力データ・手順・期待結果から成ります。期待結果が合否判断に最も重要です。");
const d2_faq2 = FAQ(
  "Nên viết bao nhiêu test case cho một chức năng?", "How many test cases per feature?",
  "Không có con số cố định. Hãy phủ đủ ca chính (happy path), ca biên và ca lỗi quan trọng, mỗi ca một mục tiêu. Ưu tiên ca có rủi ro cao thay vì viết thật nhiều ca trùng ý.",
  "There is no fixed number. Cover the happy path, boundaries and important error cases, one goal each. Prioritize high-risk cases over writing many redundant ones.",
  "1機能に何件のテストケースが必要？",
  "決まった数はありません。主要・境界・重要な異常を1目的ずつ網羅し、重複より高リスクを優先します。");
const d2_faq3 = FAQ(
  "Làm sao để test case dễ bảo trì về sau?", "How to keep test cases maintainable?",
  "Mỗi ca chỉ kiểm một mục tiêu, đặt tên gợi ý mục tiêu, viết bước rõ ràng để người khác chạy lại cho ra cùng kết quả. Càng rõ ràng thì khi phần mềm thay đổi bạn càng dễ cập nhật.",
  "Keep one goal per case, name it to hint the goal, write clear steps so others reproduce the same result. The clearer it is, the easier to update when the software changes.",
  "テストケースを保守しやすくするには？",
  "1ケース1目的、目的を示す名前、他者が同じ結果を再現できる明確な手順にします。明確なほど変更時の更新が容易です。");

const d2_quiz = [
  mcq({
    q: { vi: "Thành phần nào là quan trọng nhất, không được thiếu trong test case?", en: "Which part is the most important and must not be missing?", ja: "テストケースで最も重要で欠かせない要素は？" },
    options: [
      { vi: "Màu sắc của ca", en: "The case color", ja: "ケースの色" },
      { vi: "Kết quả mong đợi", en: "Expected result", ja: "期待結果" },
      { vi: "Tên người viết", en: "Author name", ja: "作成者名" },
      { vi: "Ngày giờ hiện tại", en: "Current date-time", ja: "現在日時" },
    ], correct: 1,
    explain: { vi: "Thiếu kết quả mong đợi thì không thể kết luận đạt/không đạt.", en: "Without expected result you cannot decide pass/fail.", ja: "期待結果がないと合否を判断できません。" },
  }),
  mcq({
    q: { vi: "Loại ca nào NÊN viết trước tiên?", en: "Which case should be written first?", ja: "最初に書くべきケースは？" },
    options: [
      { vi: "Ca lỗi hiếm gặp", en: "A rare error case", ja: "まれな異常系" },
      { vi: "Happy path — luồng chính chạy đúng", en: "Happy path — main flow works", ja: "ハッピーパス — 主要フロー" },
      { vi: "Ca hiệu năng 10.000 người", en: "10,000-user performance case", ja: "1万人の性能ケース" },
      { vi: "Ca bảo mật nâng cao", en: "Advanced security case", ja: "高度なセキュリティケース" },
    ], correct: 1,
    explain: { vi: "Xác nhận luồng chính đúng trước, rồi mới mở sang ca biên và ca lỗi.", en: "Confirm the main flow first, then expand to boundary and error cases.", ja: "まず主要フローを確認し、次に境界・異常へ広げます。" },
  }),
  mcq({
    q: { vi: "Cách đặt tên test case nào là tốt?", en: "Which test case name is good?", ja: "良いテストケース名は？" },
    options: [
      { vi: "test1", en: "test1", ja: "test1" },
      { vi: "kiemtra", en: "check", ja: "確認" },
      { vi: "TC_Login_SaiMatKhau", en: "TC_Login_WrongPassword", ja: "TC_Login_WrongPassword" },
      { vi: "abc", en: "abc", ja: "abc" },
    ], correct: 2,
    explain: { vi: "Tên nên ngắn và gợi mục tiêu để nhìn là biết ca kiểm gì.", en: "A name should be short and hint the goal so its purpose is obvious.", ja: "名前は短く目的を示し、何を検証するか一目で分かるようにします。" },
  }),
  mcq({
    q: { vi: "Đọc bước sau: 'Nhập abc@test.com vào ô Email'. Điều gì làm bước này tốt?", en: "Read: 'Enter abc@test.com into the Email field'. What makes this step good?", ja: "『abc@test.comをメール欄に入力』この手順が良い理由は？" },
    options: [
      { vi: "Nó dài", en: "It is long", ja: "長いから" },
      { vi: "Nó chứa một hành động rõ ràng và dữ liệu cụ thể", en: "It has one clear action and concrete data", ja: "明確な1動作と具体的データがあるから" },
      { vi: "Nó không cần dữ liệu", en: "It needs no data", ja: "データ不要だから" },
      { vi: "Nó dùng từ 'kiểm tra'", en: "It uses the word 'check'", ja: "『確認』を使うから" },
    ], correct: 1,
    explain: { vi: "Bước tốt = một hành động rõ ràng + dữ liệu cụ thể, ai cũng làm theo được.", en: "A good step = one clear action + concrete data anyone can follow.", ja: "良い手順は明確な1動作と具体的データで、誰でも従えます。" },
  }),
];

const d2_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & mục tiêu", en: "1. TL;DR & goal", ja: "1. 要点と目標" },
    blocks: [
      TLDR("Cách viết test case cho người mới: nắm 6 thành phần, viết đủ ca chính – biên – lỗi, mỗi ca một mục tiêu và một kết quả mong đợi cụ thể. Cuối bài có trắc nghiệm để tự kiểm.",
        "How to write test cases for beginners: learn the 6 parts, cover happy/boundary/error cases, one goal and one concrete expected result each. A quiz at the end for self-check.",
        "初心者向けテストケースの書き方：6要素を押さえ、主要・境界・異常を1目的・1期待結果で網羅します。最後にクイズ付き。"),
      P("Cách viết test case là kỹ năng bạn dùng mỗi ngày khi làm Tester. Nghe có vẻ khô khan nhưng thực ra rất thú vị: bạn đang 'phá' phần mềm một cách có kế hoạch để bảo vệ người dùng. Bài này đi từ con số 0, có hình minh hoạ, ví dụ thật và bài trắc nghiệm cuối bài.",
        "Writing test cases is a skill you use daily as a tester. It sounds dry but is actually fun: you 'break' software on purpose, with a plan, to protect users. This guide starts from zero with illustrations, real examples and a final quiz.",
        "テストケースの書き方はテスターが毎日使うスキルです。地味に聞こえますが、計画的にソフトを『壊し』利用者を守る面白い作業です。本記事はゼロから解説します。"),
      IMG(svg("6 thành phần của một test case", ["ID  ·  Mục tiêu  ·  Điều kiện tiền đề", "Dữ liệu đầu vào  ·  Các bước thực hiện", "Kết quả mong đợi (quan trọng nhất)"], "#22d3ee"),
        "Sáu thành phần cơ bản của một test case", "The six basic parts of a test case", "テストケースの6つの基本要素"),
      DEF("Test case", "một kịch bản kiểm thử gồm đầu vào, các bước và kết quả mong đợi để kiểm tra một chức năng.",
        "a scenario with inputs, steps and an expected result to verify a function.",
        "入力・手順・期待結果からなる検証シナリオ。"),
    ] },
  { heading: { vi: "2. Nền tảng: một test case gồm những gì", en: "2. Foundation: what makes up a test case", ja: "2. 基礎：テストケースの構成" },
    blocks: [
      P("Hãy hình dung test case như công thức nấu ăn: có nguyên liệu (đầu vào), các bước làm, và món ăn cuối phải trông đúng như mong đợi. Thiếu phần nào thì người khác không làm theo được và cũng không biết thế nào là đúng.",
        "Think of a test case like a recipe: ingredients (input), steps, and a final dish that must look as expected. Missing a part means others can't follow it and can't tell what 'correct' means.",
        "テストケースは料理のレシピのようなものです。材料（入力）・手順・完成品（期待結果）が必要で、欠けると他者は従えません。"),
      DEF("Kết quả mong đợi", "trạng thái/đầu ra cụ thể mà hệ thống phải tạo ra để ca được coi là đạt.",
        "the specific state/output the system must produce for the case to pass.",
        "ケースが合格するために必要な具体的な出力。"),
      P("Phần hay bị người mới bỏ quên là kết quả mong đợi phải cụ thể và đo được, ví dụ 'hiển thị Sai thông tin đăng nhập', chứ không phải 'chạy được'. Có như vậy bạn mới khẳng định chắc chắn một lần chạy là đạt hay không đạt, và người khác cũng đối chiếu được.",
        "The part beginners forget is that the expected result must be specific and measurable, e.g. 'shows Wrong login information', not 'it works'. Only then can you confidently say a run passed or failed, and others can compare too.",
        "初心者が忘れがちなのは、期待結果を具体的・測定可能に書くことです。例『ログイン情報が誤りを表示』。そうすれば合否を確実に判断できます。"),
      IMG(svg("Một chức năng → nhiều test case", ["Ô đăng nhập nhỏ nhưng sinh nhiều ca:", "đúng · sai mật khẩu · bỏ trống · sai email", "=> mỗi khả năng là 1 test case riêng"], "#f472b6"),
        "Một chức năng nhỏ có thể sinh nhiều test case", "One small feature can spawn many test cases", "小さな機能でも多数のテストケースが生じる"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng & khi nào viết", en: "3. Why it matters & when to write", ja: "3. 重要性と書く場面" },
    blocks: [
      P("Test case là ngôn ngữ chung của cả đội. Khi phát hiện lỗi, người ta nhìn vào test case để tái hiện chính xác vấn đề. Khi một chức năng thay đổi, bộ ca cũ giúp bảo đảm các phần khác vẫn chạy đúng.",
        "Test cases are the team's shared language. When a bug appears, people look at the case to reproduce the exact issue. When a feature changes, the old suite helps ensure other parts still work.",
        "テストケースはチームの共通言語です。バグ発見時は再現に使い、変更時は他部分の回帰確認に役立ちます。"),
      P("Bạn viết test case ngay khi có yêu cầu rõ ràng, thậm chí trước khi lập trình xong. Việc viết sớm giúp phát hiện chỗ yêu cầu còn mơ hồ — nếu bạn không biết kết quả mong đợi là gì, có lẽ chính yêu cầu chưa đủ rõ.",
        "You write test cases as soon as requirements are clear, even before coding finishes. Writing early exposes vague requirements — if you don't know the expected result, the requirement itself may be unclear.",
        "要件が明確になり次第、実装完了前でもテストケースを書きます。早く書くと曖昧な要件が見え、期待結果が不明なら要件自体が不明確かもしれません。"),
      P("Một bộ test case tốt không chỉ giúp bắt lỗi mà còn là tài sản lâu dài của đội: người mới vào đọc là hiểu sản phẩm, người cũ dựa vào để không bỏ sót khi kiểm lại. Vì thế đầu tư viết ca rõ ràng ngay từ đầu luôn xứng đáng.",
        "A good suite not only catches bugs but is a long-term team asset: newcomers read it to understand the product, veterans rely on it to miss nothing on re-tests. So investing in clear cases early always pays off.",
        "良いテストケース群はバグ発見だけでなく長期資産です。新人は製品理解に、ベテランは再テストの抜け防止に使います。明確に書く投資は常に報われます。"),
      P("Một lợi ích ít người mới để ý là test case giúp bạn học sản phẩm rất nhanh. Khi buộc phải nghĩ ra mọi cách một chức năng có thể chạy đúng và chạy sai, bạn hiểu chức năng đó sâu hơn cả người dùng bình thường. Càng viết nhiều ca, bức tranh về sản phẩm trong đầu bạn càng rõ, và bạn phát hiện lỗi ngày càng nhanh mà không cần ai chỉ.",
        "A benefit beginners rarely notice is that test cases help you learn the product fast. Being forced to imagine every way a feature can work and fail makes you understand it more deeply than an ordinary user. The more cases you write, the clearer your mental picture of the product, and the faster you spot bugs without being told.",
        "初心者が気づきにくい利点は、テストケースが製品理解を速めることです。機能が正しく動く・失敗する全パターンを考えることで、一般ユーザーより深く理解できます。書くほど製品像が明確になり、指示なしでも速くバグを見つけられます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & bảng mẫu", en: "4. Prepare: tools & template", ja: "4. 準備：ツールとテンプレート" },
    blocks: [
      P("Bạn không cần công cụ đắt tiền. Một bảng tính là đủ cho những ngày đầu; sau này khi vào dự án bạn sẽ dùng thêm công cụ quản lý test chuyên nghiệp như Jira/TestRail.",
        "You don't need expensive tools. A spreadsheet is enough at first; later on a project you'll use dedicated test management tools like Jira/TestRail.",
        "高価なツールは不要です。最初は表計算で十分で、後にJira/TestRailなどの管理ツールを使います。"),
      STEP(1, "Tạo bảng với các cột: ID · Mục tiêu · Tiền đề · Dữ liệu · Các bước · Kết quả mong đợi.", "Create columns: ID · Goal · Precondition · Data · Steps · Expected.", "列を作る：ID・目的・前提・データ・手順・期待。"),
      STEP(2, "Chọn một chức năng nhỏ để tập, ví dụ ô đăng nhập của một ứng dụng quen thuộc.", "Pick a small feature to practice, e.g. a familiar app's login field.", "小さな機能（例：使い慣れたログイン欄）を選ぶ。"),
      TRY("Tạo ngay bảng 6 cột trong Google Sheets và điền thử 1 dòng cho nút bất kỳ.", "Create the 6-column sheet in Google Sheets now and fill one row for any button.", "今すぐGoogle Sheetsで6列表を作り、任意のボタンに1行記入しよう。"),
      PITFALL("Viết bước quá chung như 'kiểm tra đăng nhập' — người khác không thể làm theo và không tái hiện được.", "Writing vague steps like 'check login' — others can't follow or reproduce them.", "『ログインを確認』のような曖昧な手順は、他者が従えず再現できません。"),
      IMG(svg("Bảng mẫu test case (6 cột)", ["ID | Mục tiêu | Tiền đề | Dữ liệu", "Các bước | Kết quả mong đợi", "TC01 | Đăng nhập đúng | đã có tài khoản", "user/pass đúng | 3 bước | Vào trang chủ"], "#34d399"),
        "Bảng mẫu test case sáu cột cho người mới", "A six-column test case template for beginners", "初心者向け6列テストケーステンプレート"),
    ] },
  { heading: { vi: "5. Các bước viết một test case", en: "5. Steps to write a test case", ja: "5. テストケース作成の手順" },
    blocks: [
      P("Viết test case theo trình tự sẽ giúp bạn không bỏ sót và không lạc hướng. Hãy áp dụng đúng 4 bước dưới đây cho mọi chức năng.",
        "Writing test cases in order helps you miss nothing and stay on track. Apply these 4 steps to every feature.",
        "順序立てて書けば抜けや脱線を防げます。全機能に次の4ステップを適用しましょう。"),
      STEP(1, "Xác định mục tiêu: ca này kiểm điều gì? (một mục tiêu duy nhất).", "Define the goal: what does this case verify? (a single goal).", "目的を決める：このケースは何を検証するか（1つだけ）。"),
      STEP(2, "Xác định dữ liệu đầu vào và điều kiện tiền đề cần có.", "Define input data and the required preconditions.", "入力データと必要な前提条件を決める。"),
      STEP(3, "Viết các bước rõ ràng, mỗi bước một hành động cụ thể.", "Write clear steps, one concrete action each.", "明確な手順を書く。各手順は具体的な1動作。"),
      STEP(4, "Ghi kết quả mong đợi cụ thể, đo được.", "State a specific, measurable expected result.", "具体的で測定可能な期待結果を記す。"),
      CODE("text", "ID: TC_Login_SaiMatKhau\nMục tiêu: kiểm hệ thống báo lỗi khi mật khẩu sai\nTiền đề: đã có tài khoản user@demo.com\nBước 1: Mở trang đăng nhập\nBước 2: Nhập user@demo.com vào ô Email\nBước 3: Nhập '123' (mật khẩu sai) vào ô Mật khẩu\nBước 4: Bấm Đăng nhập\nKết quả mong đợi: hiển thị 'Sai thông tin đăng nhập', không đăng nhập"),
      TRY("Viết một test case đầy đủ 6 phần cho ca 'email bỏ trống' của ô đăng nhập.", "Write a full 6-part test case for the 'empty email' case of a login field.", "ログイン欄の『メール空欄』ケースの6要素完全版を書こう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: ô đăng nhập", en: "6. Situation 1: a login field", ja: "6. シーン1：ログイン欄" },
    blocks: [
      SITUATION("Bạn được giao viết bộ test case cho ô đăng nhập.", "You are asked to write a test case set for a login field.",
        "Màn hình có ô Email, ô Mật khẩu và nút Đăng nhập. Hãy phủ đủ ca chính, biên và lỗi.",
        "The screen has Email, Password and a Login button. Cover happy, boundary and error cases.",
        "ログイン欄のテストケース一式を書く。", "メール欄・パスワード欄・ログインボタン。主要・境界・異常を網羅しましょう。"),
      SOLVE("Chia thành ca chính, ca biên và ca lỗi — mỗi ca một mục tiêu.", "Split into happy, boundary and error cases — one goal each.", "主要・境界・異常に分け、1ケース1目的にする。"),
      P("Bắt đầu với luồng chính: nhập đúng thì phải vào được. Sau đó nghĩ tới những gì có thể sai: mật khẩu sai, để trống ô, sai định dạng email. Mỗi khả năng là một test case riêng với kết quả mong đợi cụ thể.",
        "Start with the main flow: correct input should log in. Then think what can go wrong: wrong password, empty fields, invalid email. Each possibility is its own case with a specific expected result.",
        "まず主要フロー：正しい入力でログイン。次に誤り（パスワード誤り・空欄・メール形式不正）を考え、各々を個別ケースにします。"),
      CODE("text", "TC01 Happy   : email đúng + mật khẩu đúng   -> vào trang chủ\nTC02 Error   : mật khẩu sai                 -> báo 'Sai thông tin'\nTC03 Boundary: email để trống               -> nút Đăng nhập bị mờ\nTC04 Error   : email thiếu '@'              -> báo 'Email không hợp lệ'"),
      RECAP(["Một chức năng có nhiều test case", "Luôn kèm kết quả mong đợi cụ thể"],
        ["One feature has many cases", "Always include a concrete expected result"],
        ["1機能に複数ケース", "期待結果は具体的に"]),
    ] },
  { heading: { vi: "7. Tình huống 2: ô số tiền có hạn mức", en: "7. Situation 2: an amount field with a limit", ja: "7. シーン2：上限のある金額欄" },
    blocks: [
      SITUATION("Kiểm ô nhập số tiền chuyển, hạn mức 1–50 triệu.", "Test a transfer amount field with a 1–50M limit.",
        "Hệ thống phải chặn số âm, số 0 và số vượt hạn mức, đồng thời cho phép giá trị trong khoảng.",
        "The system must block negatives, zero and over-limit values while allowing values in range.",
        "送金額欄（1〜50百万）を検証する。", "負数・0・上限超過を防ぎ、範囲内は許可します。"),
      SOLVE("Dùng kỹ thuật giá trị biên (boundary value analysis).", "Use boundary value analysis.", "境界値分析を使う。"),
      P("Giá trị biên giúp bạn không phải thử vô số con số. Thay vào đó chỉ kiểm những giá trị ngay tại và cạnh ranh giới, vì lỗi thường ẩn ở đó. Với hạn mức 1–50 triệu, các mốc cần kiểm là 0, 1, 50 triệu và 50 triệu cộng 1.",
        "Boundary values save you from trying countless numbers. Test only values at and next to the limits, because bugs hide there. For a 1–50M range, test 0, 1, 50M and 50M+1.",
        "境界値により無数の値を試さずに済みます。境界とその隣だけを検証します。1〜50百万なら0・1・50百万・50百万+1を確認します。"),
      CODE("text", "TC01: 1            -> hợp lệ\nTC02: 50000000     -> hợp lệ\nTC03: 0            -> báo 'Số tiền tối thiểu là 1'\nTC04: 50000001     -> báo 'Vượt hạn mức'"),
      IMG(svg("Các giá trị biên cho hạn mức 1–50 triệu", ["0 ✗   |   1 ✓ ......... 50.000.000 ✓   |   50.000.001 ✗", "Chỉ kiểm 4 mốc thay vì hàng nghìn số"], "#a78bfa"),
        "Các giá trị biên cần kiểm cho hạn mức 1–50 triệu", "Boundary values to test for a 1–50M limit", "1〜50百万の境界値"),
      TRY("Tự thêm 2 ca cho ô này: nhập chữ cái và nhập số thập phân. Kết quả mong đợi là gì?", "Add two cases yourself: entering letters and a decimal. What's expected?", "この欄に2ケース追加：文字入力と小数入力。期待結果は？"),
    ] },
  { heading: { vi: "8. Mini-project: viết 8 ca cho màn hình giỏ hàng", en: "8. Mini-project: 8 cases for a cart screen", ja: "8. ミニ演習：カート画面に8ケース" },
    blocks: [
      P("Giờ hãy tự làm một mini-project để ghim kiến thức. Chọn màn hình 'Giỏ hàng' của một trang bán hàng và viết đủ 8 test case.",
        "Now do a mini-project to lock in the knowledge. Pick the 'Cart' screen of a shopping site and write 8 test cases.",
        "知識を定着させるミニ演習です。ショッピングサイトの『カート』画面で8件のテストケースを書きましょう。"),
      STEP(1, "Liệt kê hành động: tăng/giảm số lượng, xoá sản phẩm, áp mã giảm giá, đi tới thanh toán.", "List actions: increase/decrease quantity, remove item, apply coupon, go to checkout.", "動作を列挙：数量増減・削除・クーポン適用・購入手続きへ。"),
      STEP(2, "Với mỗi hành động, viết ít nhất 1 ca chính và 1 ca lỗi (ví dụ mã giảm giá hết hạn).", "For each action write at least 1 happy and 1 error case (e.g. an expired coupon).", "各動作に主要1・異常1（例：期限切れクーポン）。"),
      TRY("Đặt mục tiêu: có ít nhất 1 ca kiểm 'giảm số lượng xuống 0 thì điều gì xảy ra'.", "Aim to include a case for 'decreasing quantity to 0 — what happens'.", "『数量を0にしたら何が起きるか』のケースを必ず1つ入れよう。"),
      P("Mini-project này chứa gần đủ những gì bạn làm khi đi làm: đọc màn hình, chia hành động, phủ ca chính và ca lỗi, ghi kết quả mong đợi. Làm lại trên nhiều màn hình khác nhau để phản xạ chia ca trở nên tự nhiên và nhanh.",
        "This mini-project contains almost everything you do on the job: read the screen, split actions, cover happy and error cases, state expected results. Repeat across screens until case-splitting becomes fast and natural.",
        "この演習は実務のほぼ全て（画面を読む・動作分割・主要と異常の網羅・期待結果）を含みます。様々な画面で繰り返し、ケース分割を反射的にしましょう。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo đặt tên", en: "9. Common mistakes & naming tips", ja: "9. よくある失敗と命名のコツ" },
    blocks: [
      P("Khi mới viết, ai cũng mắc vài lỗi giống nhau. Biết trước giúp bạn tránh và trông chuyên nghiệp hơn.",
        "Everyone makes a few of the same mistakes at first. Knowing them helps you avoid them and look more professional.",
        "誰でも最初は同じ失敗をします。事前に知れば避けられ、プロらしく見えます。"),
      PITFALL("Viết kết quả mong đợi kiểu 'chạy được' hoặc 'OK' — không đo được, không ai kiểm chứng được.", "Writing 'it works' or 'OK' as expected — not measurable, not verifiable.", "期待結果を『動く』『OK』と書くと測定・検証できません。"),
      TIP("Đặt tên ca ngắn, gợi mục tiêu, ví dụ TC_Login_SaiMatKhau — nhìn tên là biết ca kiểm gì.", "Name cases short and goal-hinting, e.g. TC_Login_WrongPassword — the name tells the goal.", "ケース名は短く目的を示す。例 TC_Login_WrongPassword。"),
      IMG(svg("Đặt tên tốt vs chưa tốt", ["✓ TC_Login_SaiMatKhau", "✓ TC_Cart_GiamSoLuongVe0", "✗ test1 / kiemtra / abc"], "#fb7185"),
        "Ví dụ đặt tên test case tốt và chưa tốt", "Good vs poor test case naming examples", "良い命名と悪い命名の例"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      d2_faq1.block, d2_faq2.block, d2_faq3.block,
      INTERNAL("Manual testing là gì cho người mới", "What is manual testing for beginners", "manual-testing-la-gi-cho-nguoi-moi"),
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
    ] },
  QUIZ(d2_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa viết được những test case đầy đủ 6 phần và làm quen với giá trị biên. Hãy luyện thêm trên nhiều chức năng khác nhau — mỗi ngày một ít — để phản xạ chia ca trở nên tự nhiên.",
        "You just wrote full 6-part test cases and met boundary values. Keep practicing across features — a little each day — until case-splitting is second nature.",
        "6要素の完全なテストケースを書き、境界値に慣れました。様々な機能で毎日少しずつ練習しましょう。"),
      P("Chặng tiếp theo là các kỹ thuật thiết kế ca như phân vùng tương đương, bảng quyết định, rồi bước sang tự động hoá để chạy hàng trăm ca chỉ trong vài phút. Nếu muốn lộ trình rõ ràng cùng người hướng dẫn, một khoá học bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next are case-design techniques like equivalence partitioning and decision tables, then automation to run hundreds of cases in minutes. A structured course with a mentor helps you progress fast and apply confidently.",
        "次は同値分割や決定表などの設計技法、そして数百ケースを数分で回す自動化です。指導付きの体系的コースが速い成長を助けます。"),
      CTA(course),
    ] },
];

const DOC2 = makeDoc({
  slug: "cach-viet-test-case-cho-nguoi-moi",
  primaryKeyword: "cách viết test case",
  keywords: ["cách viết test case", "test case cho người mới", "viết test case", "kiểm thử cho người mới"],
  coverLabel: "NGƯỜI MỚI · TEST CASE",
  crumb: "Cách viết test case (người mới)",
  metaTitle: {
    vi: "Cách viết test case cho người mới (có ví dụ)",
    en: "How to write test cases for beginners (examples)",
    ja: "初心者向けテストケースの書き方（例題）",
  },
  metaDescription: {
    vi: "Cách viết test case cho người mới: 6 thành phần, 4 bước viết, ví dụ đăng nhập và giá trị biên, mẹo đặt tên, mini-project, trắc nghiệm và khóa Tester CyberSoft.",
    en: "How beginners write test cases: 6 parts, a 4-step method, login & boundary examples, naming tips, a mini-project, a quiz and CyberSoft's Tester course.",
    ja: "初心者向けテストケースの書き方：6要素・4ステップ・例題・命名のコツ・クイズ。",
  },
  title: {
    vi: "Cách viết test case cho người mới: 6 thành phần, 4 bước & ví dụ thực tế (có trắc nghiệm)",
    en: "How to write test cases for beginners: 6 parts, 4 steps & real examples (with quiz)",
    ja: "初心者向けテストケースの書き方：6要素・4ステップ・実例（クイズ付き）",
  },
  summary: {
    vi: "Bài nền tảng cho người mới: 6 thành phần và 4 bước viết test case, ví dụ đăng nhập và số tiền hạn mức, kỹ thuật giá trị biên, mẹo đặt tên, mini-project giỏ hàng, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner foundation: the 6 parts and 4 steps of writing test cases, login & amount examples, boundary analysis, naming tips, a cart mini-project, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け基礎：6要素と4ステップ、例題、境界値分析、ミニ演習、FAQ、クイズ。",
  },
  faqs: [d2_faq1, d2_faq2, d2_faq3],
  howTo: { name: "Cách viết test case cho người mới", steps: [
    { name: "Xác định mục tiêu", text: "Mỗi ca kiểm đúng một mục tiêu rõ ràng." },
    { name: "Xác định dữ liệu & tiền đề", text: "Đầu vào và điều kiện cần có trước khi chạy." },
    { name: "Viết bước & kết quả mong đợi", text: "Mỗi bước một hành động cụ thể, kết quả mong đợi đo được." },
  ] },
  pages: d2_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 3 — Cách viết bug report cho người mới
// ══════════════════════════════════════════════════════════════════════════════════════
const d3_faq1 = FAQ(
  "Bug report là gì?", "What is a bug report?",
  "Bug report (báo cáo lỗi) là bản mô tả một lỗi để lập trình viên hiểu và sửa được. Nó gồm tiêu đề, các bước tái hiện, kết quả thực tế, kết quả mong đợi, mức độ nghiêm trọng và bằng chứng (ảnh/clip).",
  "A bug report describes a bug so developers can understand and fix it. It includes a title, reproduction steps, actual result, expected result, severity and evidence (screenshot/clip).",
  "バグ報告とは？",
  "バグ報告は、開発者が理解し修正できるよう不具合を記述したものです。タイトル・再現手順・実際の結果・期待結果・重大度・証拠を含みます。");
const d3_faq2 = FAQ(
  "Vì sao bug report tốt lại quan trọng?", "Why does a good bug report matter?",
  "Vì lập trình viên chỉ sửa được lỗi mà họ tái hiện được. Một bug report rõ ràng, có các bước cụ thể giúp lỗi được sửa nhanh; một báo cáo mơ hồ khiến lỗi bị trả lại 'không tái hiện được' và tốn thời gian cả hai bên.",
  "Because developers can only fix bugs they can reproduce. A clear report with concrete steps gets fixed fast; a vague one gets returned as 'cannot reproduce' and wastes both sides' time.",
  "良いバグ報告はなぜ重要？",
  "開発者は再現できるバグしか直せないからです。明確な手順があれば早く修正され、曖昧だと『再現不可』で戻され双方の時間を浪費します。");
const d3_faq3 = FAQ(
  "Severity và Priority khác nhau thế nào?", "How do severity and priority differ?",
  "Severity (mức nghiêm trọng) đo tác động kỹ thuật của lỗi lên hệ thống; Priority (độ ưu tiên) đo mức độ cần sửa gấp về mặt kinh doanh. Một lỗi có thể nghiêm trọng nhưng hiếm gặp, hoặc nhẹ nhưng cần sửa gấp vì ảnh hưởng thương hiệu.",
  "Severity measures the technical impact on the system; priority measures how urgently it should be fixed for the business. A bug can be severe but rare, or minor but urgent due to brand impact.",
  "重大度と優先度の違いは？",
  "重大度はシステムへの技術的影響、優先度はビジネス上の修正緊急度です。重大でも稀な場合や、軽微でもブランド影響で緊急の場合があります。");

const d3_quiz = [
  mcq({
    q: { vi: "Thành phần nào giúp lập trình viên TÁI HIỆN được lỗi?", en: "Which part helps developers REPRODUCE the bug?", ja: "開発者がバグを再現するのに役立つ要素は？" },
    options: [
      { vi: "Màu nền của báo cáo", en: "The report background color", ja: "報告の背景色" },
      { vi: "Các bước tái hiện chi tiết", en: "Detailed reproduction steps", ja: "詳細な再現手順" },
      { vi: "Tên người báo lỗi", en: "The reporter's name", ja: "報告者名" },
      { vi: "Số thứ tự ngẫu nhiên", en: "A random number", ja: "ランダムな番号" },
    ], correct: 1,
    explain: { vi: "Không có các bước tái hiện thì lập trình viên không dựng lại được lỗi để sửa.", en: "Without reproduction steps developers can't recreate the bug to fix it.", ja: "再現手順がないと開発者はバグを再現できません。" },
  }),
  mcq({
    q: { vi: "Tiêu đề bug report nào là tốt?", en: "Which bug report title is good?", ja: "良いバグ報告のタイトルは？" },
    options: [
      { vi: "'Bị lỗi'", en: "'It's broken'", ja: "『壊れた』" },
      { vi: "'Đăng nhập sai mật khẩu: trang trắng, không hiện thông báo lỗi'", en: "'Login wrong password: blank page, no error shown'", ja: "『ログイン誤パスワード：白画面でエラー非表示』" },
      { vi: "'Help!!!'", en: "'Help!!!'", ja: "『助けて!!!』" },
      { vi: "'abc'", en: "'abc'", ja: "『abc』" },
    ], correct: 1,
    explain: { vi: "Tiêu đề tốt nêu ngắn gọn ngữ cảnh + hiện tượng, đọc là hình dung được lỗi.", en: "A good title briefly states context + symptom so the bug is clear at a glance.", ja: "良いタイトルは文脈と症状を簡潔に述べ、一目でバグが分かります。" },
  }),
  mcq({
    q: { vi: "Severity đo điều gì?", en: "What does severity measure?", ja: "重大度は何を測る？" },
    options: [
      { vi: "Tác động kỹ thuật của lỗi lên hệ thống", en: "The bug's technical impact on the system", ja: "システムへの技術的影響" },
      { vi: "Màu sắc giao diện", en: "UI color", ja: "UIの色" },
      { vi: "Tốc độ gõ phím của tester", en: "The tester's typing speed", ja: "テスターの打鍵速度" },
      { vi: "Số dòng code", en: "Lines of code", ja: "コード行数" },
    ], correct: 0,
    explain: { vi: "Severity là mức nghiêm trọng về kỹ thuật; Priority mới là độ ưu tiên sửa theo kinh doanh.", en: "Severity is technical seriousness; priority is business urgency to fix.", ja: "重大度は技術的深刻さ、優先度はビジネス上の修正緊急度です。" },
  }),
  mcq({
    q: { vi: "Điều gì nên đính kèm để bug report thuyết phục hơn?", en: "What should you attach to make a report more convincing?", ja: "説得力を高める添付は？" },
    options: [
      { vi: "Ảnh chụp màn hình hoặc video tái hiện", en: "A screenshot or reproduction video", ja: "スクリーンショットや再現動画" },
      { vi: "Bài hát yêu thích", en: "Your favorite song", ja: "好きな曲" },
      { vi: "Số điện thoại cá nhân", en: "Your phone number", ja: "個人の電話番号" },
      { vi: "Không cần gì cả", en: "Nothing at all", ja: "何も不要" },
    ], correct: 0,
    explain: { vi: "Bằng chứng hình ảnh/clip giúp lập trình viên thấy ngay vấn đề và tin báo cáo.", en: "Visual evidence lets developers see the issue instantly and trust the report.", ja: "画像や動画の証拠で問題が即座に伝わり、報告が信頼されます。" },
  }),
];

const d3_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & mục tiêu", en: "1. TL;DR & goal", ja: "1. 要点と目標" },
    blocks: [
      TLDR("Cách viết bug report cho người mới: nêu tiêu đề rõ, các bước tái hiện, kết quả thực tế vs mong đợi, mức độ nghiêm trọng và bằng chứng. Cuối bài có trắc nghiệm để tự kiểm.",
        "How to write a bug report for beginners: a clear title, reproduction steps, actual vs expected, severity and evidence. A quiz at the end for self-check.",
        "初心者向けバグ報告の書き方：明確なタイトル・再現手順・実際と期待・重大度・証拠。最後にクイズ付き。"),
      P("Cách viết bug report tốt là kỹ năng khiến bạn được đồng đội quý mến. Một báo cáo rõ ràng giúp lỗi được sửa nhanh; một báo cáo mơ hồ khiến ai cũng mệt. Bài này đi từ con số 0, có hình minh hoạ, ví dụ thật và bài trắc nghiệm cuối bài.",
        "Writing a good bug report is a skill that makes teammates love you. A clear report gets bugs fixed fast; a vague one tires everyone. This guide starts from zero with illustrations, real examples and a final quiz.",
        "良いバグ報告の書き方は仲間に好かれるスキルです。明確なら早く直り、曖昧なら皆が疲れます。本記事はゼロから解説します。"),
      IMG(svg("Các phần của một bug report", ["Tiêu đề  ·  Môi trường  ·  Các bước tái hiện", "Kết quả thực tế  ·  Kết quả mong đợi", "Mức nghiêm trọng  ·  Bằng chứng (ảnh/clip)"], "#22d3ee"),
        "Các phần cấu thành một bug report tốt", "The parts that make up a good bug report", "良いバグ報告を構成する要素"),
      DEF("Bug report", "báo cáo lỗi — bản mô tả một lỗi đủ rõ để người khác tái hiện và sửa được.",
        "a bug report — a description of a bug clear enough for others to reproduce and fix.",
        "バグ報告 — 他者が再現・修正できるほど明確な不具合の記述。"),
    ] },
  { heading: { vi: "2. Nền tảng: một bug report gồm những gì", en: "2. Foundation: what makes up a bug report", ja: "2. 基礎：バグ報告の構成" },
    blocks: [
      P("Hãy hình dung bug report như lời khai của một nhân chứng: bạn kể lại chính xác chuyện gì đã xảy ra, ở đâu, làm thế nào để nó xảy ra lại. Càng rõ, người điều tra (lập trình viên) càng dễ tìm ra thủ phạm.",
        "Think of a bug report like a witness statement: you recount exactly what happened, where, and how to make it happen again. The clearer it is, the easier for the investigator (developer) to find the culprit.",
        "バグ報告は証人の供述のようなものです。何が・どこで・どうすれば再発するかを正確に語ります。明確なほど調査者（開発者）が原因を見つけやすくなります。"),
      DEF("Các bước tái hiện", "trình tự thao tác cụ thể để lỗi xuất hiện lại một cách chắc chắn.",
        "the exact sequence of actions that makes the bug appear again reliably.",
        "バグを確実に再発させる具体的な操作手順。"),
      P("Trái tim của mọi bug report là hai câu: 'thấy gì' (kết quả thực tế) và 'đáng lẽ thấy gì' (kết quả mong đợi). Chỉ cần hai câu này rõ ràng cùng các bước tái hiện, một người chưa từng thấy màn hình vẫn hiểu và dựng lại được vấn đề.",
        "The heart of every bug report is two sentences: 'what you saw' (actual) and 'what should show' (expected). With these two clear plus reproduction steps, someone who never saw the screen can understand and recreate the issue.",
        "全バグ報告の核心は2文：『見えたもの』（実際）と『あるべきもの』（期待）です。この2つと再現手順が明確なら、画面未見の人でも再現できます。"),
      IMG(svg("Thực tế vs Mong đợi trong bug report", ["Thực tế: nhập mật khẩu sai -> trang trắng", "Mong đợi: hiện 'Sai thông tin đăng nhập'", "=> Đây chính là nội dung cốt lõi của lỗi"], "#f472b6"),
        "Hai câu cốt lõi: kết quả thực tế và kết quả mong đợi", "The two core sentences: actual and expected result", "核心の2文：実際の結果と期待結果"),
    ] },
  { heading: { vi: "3. Vì sao viết tốt lại quan trọng", en: "3. Why writing it well matters", ja: "3. 上手に書く重要性" },
    blocks: [
      P("Lập trình viên chỉ sửa được lỗi họ tái hiện được. Một bug report rõ ràng giúp lỗi được sửa trong ngày; một báo cáo thiếu bước khiến lỗi bị trả lại với ghi chú 'không tái hiện được', và vòng lặp qua lại đó tốn thời gian của cả đội.",
        "Developers only fix bugs they can reproduce. A clear report gets fixed same-day; a step-less one gets returned 'cannot reproduce', and that back-and-forth wastes the whole team's time.",
        "開発者は再現できるバグしか直せません。明確な報告は当日修正され、手順不足は『再現不可』で戻され、往復が全員の時間を浪費します。"),
      P("Ngoài ra, chất lượng bug report phản ánh sự chuyên nghiệp của bạn. Người mới viết báo cáo rõ ràng sẽ nhanh chóng được tin tưởng và giao việc quan trọng hơn. Đây là nơi bạn tạo ấn tượng tốt mà không cần biết lập trình sâu.",
        "Also, report quality reflects your professionalism. A beginner who writes clear reports quickly earns trust and gets more important work. This is where you make a good impression without deep coding knowledge.",
        "また報告の質はあなたのプロ意識を映します。明確に書く新人は早く信頼され、重要な仕事を任されます。深いコード知識なしで好印象を作れる場です。"),
      P("Trong công cụ như Jira, mỗi bug report là một 'ticket' đi theo lỗi suốt vòng đời: mở, đang sửa, chờ kiểm lại, đóng. Viết tốt ngay từ đầu giúp cả hành trình đó trơn tru và không ai phải hỏi đi hỏi lại.",
        "In tools like Jira, each bug report is a 'ticket' that follows the bug through its lifecycle: open, in progress, ready to retest, closed. Writing well upfront keeps that journey smooth with no repeated questions.",
        "Jiraなどでは各バグ報告は不具合のライフサイクル（起票・対応中・再テスト待ち・完了）を追う『チケット』です。最初に上手く書けば全行程が円滑になります。"),
      P("Hãy nhớ rằng bug report không chỉ để tố cáo lỗi mà còn để giúp lập trình viên sửa nhanh nhất có thể. Khi bạn viết rõ ràng, bạn đang tiết kiệm thời gian cho cả đội và thể hiện sự tôn trọng với công việc của người khác. Một tester giỏi luôn đặt câu hỏi: nếu tôi là người sửa lỗi này, tôi cần biết thêm gì để tái hiện và khắc phục?",
        "Remember a bug report is not just to accuse a bug but to help developers fix it as fast as possible. Writing clearly saves the whole team's time and shows respect for others' work. A good tester always asks: if I were the one fixing this, what more would I need to reproduce and resolve it?",
        "バグ報告はバグを告発するだけでなく、開発者が最速で直せるよう助けるものです。明確に書けばチーム全体の時間を節約し、相手の仕事への敬意を示します。優れたテスターは常に問います：自分が修正者なら、再現と解決に何が必要か？"),
      P("Ngoài ra, thói quen mô tả lỗi rành mạch còn rèn cho bạn khả năng quan sát và diễn đạt — hai kỹ năng theo bạn suốt sự nghiệp. Người mới chăm chút từng bug report sẽ sớm nổi bật trong mắt quản lý, vì báo cáo là thứ đầu tiên người khác nhìn thấy về chất lượng làm việc của bạn.",
        "Also, the habit of describing bugs clearly trains your observation and expression — two skills that follow you throughout your career. Beginners who polish each bug report soon stand out to managers, because reports are the first thing others see about your work quality.",
        "さらに、明確に記述する習慣は観察力と表現力を鍛えます。両者はキャリアを通じて役立ちます。各報告を丁寧に書く新人は早く上司に評価されます。報告はあなたの仕事の質を示す最初のものだからです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: mẫu bug report", en: "4. Prepare: a bug report template", ja: "4. 準備：バグ報告テンプレート" },
    blocks: [
      P("Có sẵn một mẫu giúp bạn không bỏ sót phần nào. Bạn có thể dán mẫu này vào ghi chú và điền mỗi khi phát hiện lỗi.",
        "Having a template means you miss nothing. Paste this into your notes and fill it whenever you find a bug.",
        "テンプレートがあれば抜けが出ません。メモに貼り、バグ発見のたびに埋めましょう。"),
      STEP(1, "Chuẩn bị các mục: Tiêu đề · Môi trường · Bước tái hiện · Thực tế · Mong đợi · Severity · Bằng chứng.", "Prepare fields: Title · Environment · Steps · Actual · Expected · Severity · Evidence.", "項目を用意：タイトル・環境・手順・実際・期待・重大度・証拠。"),
      STEP(2, "Ghi rõ môi trường: thiết bị, trình duyệt/phiên bản, tài khoản dùng để thử.", "Note the environment: device, browser/version, the account used.", "環境を記す：端末・ブラウザ/版・使用アカウント。"),
      TRY("Tạo một mẫu bug report trong ghi chú điện thoại của bạn ngay bây giờ để lần sau dùng liền.", "Create a bug report template in your phone notes right now for next time.", "今すぐスマホのメモにバグ報告テンプレを作り、次回に備えよう。"),
      PITFALL("Quên ghi môi trường — lỗi chỉ xuất hiện trên một trình duyệt mà báo cáo không nói, khiến lập trình viên không tái hiện được.", "Forgetting the environment — a bug only on one browser goes unmentioned, so developers can't reproduce it.", "環境の記載漏れ — 特定ブラウザだけのバグを書かないと再現できません。"),
      IMG(svg("Mẫu bug report điền sẵn", ["Tiêu đề: [Login] Mật khẩu sai -> trang trắng", "Môi trường: Chrome 126, Windows 11", "Bước: 1) Mở /login 2) user@demo 3) mk '123' 4) Đăng nhập", "Thực tế: trang trắng | Mong đợi: 'Sai thông tin' | Severity: Cao"], "#34d399"),
        "Một mẫu bug report đã điền đầy đủ", "A fully filled-in bug report template", "記入済みバグ報告テンプレートの例"),
    ] },
  { heading: { vi: "5. Các bước viết một bug report", en: "5. Steps to write a bug report", ja: "5. バグ報告作成の手順" },
    blocks: [
      P("Viết theo trình tự giúp báo cáo của bạn luôn đầy đủ và dễ đọc. Áp dụng 4 bước sau cho mọi lỗi bạn tìm thấy.",
        "Writing in order keeps your report complete and readable. Apply these 4 steps to every bug you find.",
        "順序立てて書けば報告が完全で読みやすくなります。見つけた全バグに次の4ステップを適用します。"),
      STEP(1, "Viết tiêu đề: [Khu vực] hiện tượng ngắn gọn, ví dụ '[Login] mật khẩu sai không hiện thông báo'.", "Write the title: [Area] short symptom, e.g. '[Login] wrong password shows no message'.", "タイトルを書く：[領域] 簡潔な症状。例『[Login] 誤パスワードで通知なし』。"),
      STEP(2, "Liệt kê các bước tái hiện, đánh số, đủ để người khác làm theo y hệt.", "List numbered reproduction steps, enough for anyone to follow exactly.", "再現手順を番号付きで列挙、他者が全く同じに従える程度に。"),
      STEP(3, "Ghi kết quả thực tế và kết quả mong đợi tách bạch.", "Record actual and expected results separately.", "実際の結果と期待結果を分けて記す。"),
      STEP(4, "Gán Severity, đính kèm ảnh/clip làm bằng chứng.", "Assign severity, attach a screenshot/clip as evidence.", "重大度を付け、証拠のスクショ/動画を添付。"),
      CODE("text", "Tiêu đề: [Login] Nhập sai mật khẩu -> trang trắng, không hiện thông báo lỗi\nMôi trường: Chrome 126 / Windows 11 / tài khoản user@demo.com\nBước tái hiện:\n  1. Mở trang /login\n  2. Nhập user@demo.com vào ô Email\n  3. Nhập '123' (mật khẩu sai) vào ô Mật khẩu\n  4. Bấm nút Đăng nhập\nKết quả thực tế: màn hình trắng, không có thông báo\nKết quả mong đợi: hiển thị 'Sai thông tin đăng nhập'\nSeverity: Cao (chặn người dùng đăng nhập lại)\nBằng chứng: screenshot_login_blank.png"),
      TRY("Viết một bug report đầy đủ cho lỗi bạn từng gặp trên một app bất kỳ (dù nhỏ).", "Write a full bug report for any bug you've seen on some app (even a tiny one).", "任意のアプリで見た小さなバグでも完全なバグ報告を書こう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: lỗi giao diện trên điện thoại", en: "6. Situation 1: a mobile UI bug", ja: "6. シーン1：スマホUIの不具合" },
    blocks: [
      SITUATION("Trên điện thoại, nút 'Mua ngay' bị che mất một nửa.", "On mobile, the 'Buy now' button is half hidden.",
        "Trên máy tính thì bình thường, nhưng mở bằng điện thoại thì nút bị cắt, khó bấm. Hãy viết bug report.",
        "It's fine on desktop, but on mobile the button is cut off and hard to tap. Write the bug report.",
        "スマホで『今すぐ購入』ボタンが半分隠れる。", "PCでは正常ですが、スマホでは切れて押しにくいです。バグ報告を書きましょう。"),
      SOLVE("Nhấn mạnh môi trường (thiết bị) vì lỗi chỉ xảy ra trên điện thoại.", "Emphasize the environment (device) since the bug is mobile-only.", "スマホ限定のため環境（端末）を強調する。"),
      P("Với lỗi phụ thuộc thiết bị, phần môi trường trở nên cực kỳ quan trọng: ghi rõ loại điện thoại, kích thước màn hình và trình duyệt. Nếu thiếu, lập trình viên mở trên máy tính sẽ không thấy gì bất thường và trả lại báo cáo.",
        "For device-dependent bugs, the environment section becomes crucial: note the phone model, screen size and browser. Without it, a developer on desktop sees nothing wrong and returns the report.",
        "端末依存のバグでは環境欄が極めて重要です。機種・画面サイズ・ブラウザを記します。無いと開発者はPCで異常を見つけられず差し戻します。"),
      CODE("text", "Tiêu đề: [Trang sản phẩm] Nút 'Mua ngay' bị cắt một nửa trên điện thoại\nMôi trường: iPhone 13, Safari, màn hình 390x844\nThực tế: nút hiển thị một nửa, phần dưới bị màn hình che, khó bấm\nMong đợi: nút hiển thị đầy đủ và bấm được bình thường\nSeverity: Cao (cản trở mua hàng trên di động)"),
      RECAP(["Lỗi phụ thuộc thiết bị -> ghi rõ môi trường", "Đính kèm ảnh chụp để thấy ngay"],
        ["Device-dependent bug -> note the environment", "Attach a screenshot to see it instantly"],
        ["端末依存のバグ -> 環境を明記", "スクショを添付して即確認"]),
    ] },
  { heading: { vi: "7. Tình huống 2: lỗi xuất hiện không ổn định", en: "7. Situation 2: an intermittent bug", ja: "7. シーン2：不安定に出るバグ" },
    blocks: [
      SITUATION("Thỉnh thoảng đặt hàng bị lỗi, nhưng không phải lúc nào cũng lặp lại.", "Sometimes placing an order fails, but it doesn't always repeat.",
        "Bạn thấy lỗi 'Đặt hàng thất bại' xuất hiện lúc có lúc không. Làm sao báo cáo cho hữu ích?",
        "You see 'Order failed' appear sometimes but not always. How to report it usefully?",
        "時々注文が失敗するが常に再現しない。", "『注文失敗』が出たり出なかったりします。有用に報告するには？"),
      SOLVE("Ghi lại tần suất, thời điểm và mọi manh mối; đừng bỏ qua chỉ vì khó lặp lại.", "Record frequency, timing and every clue; don't drop it just because it's hard to repeat.", "頻度・タイミング・手がかりを記録。再現困難でも捨てない。"),
      P("Lỗi không ổn định là khó nhất nhưng cũng thường nguy hiểm nhất. Đừng bỏ qua chỉ vì bạn không lặp lại được ngay. Hãy ghi: đã thử bao nhiêu lần thì lỗi một lần, có phải khi mạng chậm không, có thông báo lỗi kỹ thuật nào hiện ra không. Mọi manh mối đều giúp lập trình viên khoanh vùng.",
        "Intermittent bugs are the hardest but often the most dangerous. Don't drop one just because you can't repeat it instantly. Note: how many tries per failure, whether it's on slow network, any technical error shown. Every clue helps developers narrow it down.",
        "不安定なバグは最も難しく、しばしば最も危険です。すぐ再現できなくても捨てないでください。何回で1回失敗か、低速回線か、技術的エラー表示があったかを記録します。手がかりが原因特定を助けます。"),
      CODE("text", "Tiêu đề: [Thanh toán] 'Đặt hàng thất bại' xuất hiện ngẫu nhiên (~1/5 lần)\nMôi trường: Chrome 126 / Windows 11 / mạng Wi-Fi\nTần suất: khoảng 1 trong 5 lần đặt hàng\nManh mối: hay xảy ra khi bấm 'Đặt hàng' hai lần nhanh\nThực tế: hiện 'Đặt hàng thất bại' dù thông tin hợp lệ\nMong đợi: đặt hàng thành công với thông tin hợp lệ\nSeverity: Nghiêm trọng (mất đơn hàng)"),
      IMG(svg("Ghi chú cho lỗi không ổn định", ["Tần suất: 1/5 lần", "Điều kiện: bấm nút 2 lần nhanh", "Kèm: video quay lại lúc lỗi xảy ra"], "#a78bfa"),
        "Cách ghi chú hữu ích cho lỗi xuất hiện không ổn định", "How to note an intermittent bug usefully", "不安定なバグの有用なメモ方法"),
      TRY("Nghĩ ra 3 manh mối bạn sẽ ghi lại nếu gặp một lỗi chỉ thỉnh thoảng xuất hiện.", "Think of 3 clues you'd record if you met a bug that only appears sometimes.", "時々だけ出るバグに遭遇したら記録する手がかりを3つ考えよう。"),
    ] },
  { heading: { vi: "8. Severity vs Priority: đánh giá mức độ", en: "8. Severity vs priority: rating the impact", ja: "8. 重大度と優先度：影響の評価" },
    blocks: [
      P("Sau khi mô tả lỗi, bạn cần đánh giá nó nghiêm trọng đến đâu. Có hai thước đo dễ nhầm: severity và priority.",
        "After describing a bug, you rate how serious it is. Two easily confused measures exist: severity and priority.",
        "バグを記述したら深刻度を評価します。混同しやすい2つの尺度：重大度と優先度があります。"),
      DEF("Severity", "mức nghiêm trọng về kỹ thuật của lỗi lên hệ thống (nhẹ, trung bình, cao, nghiêm trọng).",
        "the technical seriousness of the bug on the system (low, medium, high, critical).",
        "システムへのバグの技術的深刻度（低・中・高・重大）。"),
      DEF("Priority", "mức độ cần sửa gấp xét theo góc kinh doanh (thấp, trung bình, cao).",
        "how urgently it should be fixed from a business view (low, medium, high).",
        "ビジネス視点での修正緊急度（低・中・高）。"),
      P("Một lỗi có thể nghiêm trọng nhưng hiếm (severity cao, priority thấp), hoặc nhẹ nhưng cần sửa gấp vì đập vào mắt mọi khách hàng (severity thấp, priority cao). Ví dụ lỗi sai chính tả ngay trang chủ: không sập hệ thống nhưng ảnh hưởng thương hiệu, nên priority cao.",
        "A bug can be severe but rare (high severity, low priority), or minor but urgent because every customer sees it (low severity, high priority). E.g. a typo on the homepage: no crash but brand impact, so high priority.",
        "バグは重大でも稀（重大度高・優先度低）や、軽微でも全客が見るため緊急（重大度低・優先度高）があります。例：トップページの誤字はシステム停止しないがブランド影響で優先度高です。"),
      IMG(svg("Ma trận Severity × Priority", ["Sập hệ thống, thường xuyên -> Sev cao, Pri cao", "Sập hệ thống, hiếm -> Sev cao, Pri thấp", "Sai chính tả trang chủ -> Sev thấp, Pri cao"], "#fbbf24"),
        "Ma trận kết hợp Severity và Priority với ví dụ", "A severity × priority matrix with examples", "重大度×優先度のマトリクスと例"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp khi viết bug report", en: "9. Common bug report mistakes", ja: "9. バグ報告のよくある失敗" },
    blocks: [
      P("Người mới hay mắc vài lỗi giống nhau khi viết báo cáo. Tránh được chúng, bạn sẽ được đội ngũ tin tưởng nhanh chóng.",
        "Beginners make a few common reporting mistakes. Avoid them and you'll earn the team's trust quickly.",
        "新人は報告で共通の失敗をしがちです。避ければ早くチームの信頼を得られます。"),
      PITFALL("Tiêu đề mơ hồ như 'bị lỗi', 'không dùng được' — không ai biết lỗi ở đâu.", "Vague titles like 'broken' or 'unusable' — nobody knows where the bug is.", "『壊れた』『使えない』など曖昧なタイトルでは、どこのバグか分かりません。"),
      PITFALL("Gộp nhiều lỗi vào một báo cáo — khó theo dõi và khó đóng khi chỉ sửa được một phần.", "Bundling many bugs into one report — hard to track and close when only part is fixed.", "1報告に複数バグをまとめると、追跡や部分修正時の完了が困難です。"),
      TIP("Một lỗi = một báo cáo; tiêu đề nêu rõ khu vực + hiện tượng; luôn có bước tái hiện và bằng chứng.", "One bug = one report; title states area + symptom; always include steps and evidence.", "1バグ＝1報告。タイトルに領域＋症状。常に手順と証拠を付ける。"),
      IMG(svg("Bug report: nên & không nên", ["✗ 'Bị lỗi' + không có bước", "✓ '[Login] mk sai -> trang trắng' + 4 bước + ảnh", "=> Một lỗi một báo cáo, có bằng chứng"], "#fb7185"),
        "So sánh bug report chưa tốt và bug report tốt", "Comparing a poor and a good bug report", "悪いバグ報告と良いバグ報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      d3_faq1.block, d3_faq2.block, d3_faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenario & checklist for beginners", "test-scenario-checklist-cho-nguoi-moi"),
    ] },
  QUIZ(d3_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa biết cách viết một bug report rõ ràng: tiêu đề gợi hình, bước tái hiện, thực tế vs mong đợi, severity và bằng chứng. Hãy luyện viết mỗi khi gặp lỗi, dù nhỏ, để câu chữ ngày càng gọn và chuyên nghiệp.",
        "You now know how to write a clear bug report: a vivid title, reproduction steps, actual vs expected, severity and evidence. Practice whenever you meet a bug, even small ones, to make your writing tighter and more professional.",
        "明確なバグ報告の書き方を習得しました：分かりやすいタイトル・再現手順・実際と期待・重大度・証拠。小さなバグでも練習し、文章を簡潔でプロらしくしましょう。"),
      P("Chặng tiếp theo là học quản lý lỗi trong công cụ như Jira, phối hợp với lập trình viên qua vòng đời của một ticket, và kết hợp cùng kỹ năng viết test case. Một khoá học bài bản với người hướng dẫn sẽ giúp bạn thành thạo nhanh và tự tin ứng tuyển Tester.",
        "Next is managing bugs in tools like Jira, collaborating with developers across a ticket's lifecycle, and combining it with test-case skills. A structured course with a mentor helps you master this fast and apply confidently.",
        "次はJiraなどでのバグ管理、チケットのライフサイクルでの開発者協働、テストケース技能との組み合わせです。指導付きの体系的コースが早い習得を助けます。"),
      CTA(course),
    ] },
];

const DOC3 = makeDoc({
  slug: "cach-viet-bug-report-cho-nguoi-moi",
  primaryKeyword: "cách viết bug report",
  keywords: ["cách viết bug report", "báo cáo lỗi", "bug report cho người mới", "cách báo lỗi phần mềm"],
  coverLabel: "NGƯỜI MỚI · BUG REPORT",
  crumb: "Cách viết bug report (người mới)",
  metaTitle: {
    vi: "Cách viết bug report cho người mới (mẫu chuẩn)",
    en: "How to write a bug report for beginners (template)",
    ja: "初心者向けバグ報告の書き方（テンプレ）",
  },
  metaDescription: {
    vi: "Cách viết bug report cho người mới: các phần bắt buộc, 4 bước viết, mẫu chuẩn, phân biệt severity và priority, ví dụ lỗi di động, trắc nghiệm và khóa Tester CyberSoft.",
    en: "How beginners write a bug report: required parts, a 4-step method, a template, severity vs priority, mobile-bug examples, a quiz and CyberSoft's Tester course.",
    ja: "初心者向けバグ報告の書き方：必須要素・4ステップ・テンプレ・重大度と優先度・クイズ。",
  },
  title: {
    vi: "Cách viết bug report cho người mới: mẫu chuẩn, các bước & ví dụ thực tế (có trắc nghiệm)",
    en: "How to write a bug report for beginners: template, steps & real examples (with quiz)",
    ja: "初心者向けバグ報告の書き方：テンプレ・手順・実例（クイズ付き）",
  },
  summary: {
    vi: "Bài nền tảng cho người mới: các phần của một bug report, 4 bước viết, mẫu chuẩn, phân biệt severity và priority, ví dụ lỗi di động và lỗi không ổn định, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner foundation: the parts of a bug report, a 4-step method, a template, severity vs priority, mobile and intermittent bug examples, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け基礎：バグ報告の要素・4ステップ・テンプレ・重大度と優先度・例題・FAQ・クイズ。",
  },
  faqs: [d3_faq1, d3_faq2, d3_faq3],
  howTo: { name: "Cách viết bug report cho người mới", steps: [
    { name: "Viết tiêu đề rõ", text: "[Khu vực] + hiện tượng ngắn gọn, đọc là hình dung được lỗi." },
    { name: "Ghi các bước tái hiện", text: "Đánh số, đủ để người khác làm theo y hệt." },
    { name: "Thực tế, mong đợi, severity, bằng chứng", text: "Tách bạch kết quả và đính kèm ảnh/clip." },
  ] },
  pages: d3_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 4 — Test scenario & checklist cho người mới
// ══════════════════════════════════════════════════════════════════════════════════════
const d4_faq1 = FAQ(
  "Test scenario là gì và khác test case thế nào?", "What is a test scenario and how is it different from a test case?",
  "Test scenario (kịch bản kiểm thử) là một mô tả cấp cao về 'cần kiểm điều gì', ví dụ 'Kiểm chức năng đăng nhập'. Test case là các bước chi tiết để kiểm điều đó. Một test scenario thường sinh ra nhiều test case.",
  "A test scenario is a high-level description of 'what to test', e.g. 'Verify the login feature'. A test case is the detailed steps to test it. One scenario usually spawns many test cases.",
  "テストシナリオとは？テストケースとの違いは？",
  "テストシナリオは『何を検証するか』の上位記述（例『ログイン機能を検証』）です。テストケースはその詳細手順で、1シナリオが複数ケースを生みます。");
const d4_faq2 = FAQ(
  "Checklist dùng khi nào trong kiểm thử?", "When is a checklist used in testing?",
  "Checklist là danh sách các điểm cần kiểm nhanh, rất hợp khi cần kiểm nhẹ nhàng, kiểm nhanh trước khi giao hàng, hoặc khi chưa đủ thời gian viết test case chi tiết. Nó giúp bạn không quên các mục quan trọng.",
  "A checklist is a list of points to check quickly, great for light checks, quick pre-release passes, or when there's no time for detailed test cases. It ensures you don't forget key items.",
  "チェックリストはいつ使う？",
  "チェックリストは素早く確認する項目一覧で、軽い確認やリリース前の素早い確認、詳細ケースを書く時間がない時に最適です。重要項目の忘れを防ぎます。");
const d4_faq3 = FAQ(
  "Người mới nên bắt đầu từ scenario hay checklist?", "Should beginners start from scenarios or checklists?",
  "Hãy bắt đầu bằng cách liệt kê các test scenario cấp cao để nhìn bao quát, rồi dùng checklist để kiểm nhanh những mục quan trọng. Khi cần độ chặt chẽ, bạn mới khai triển từng scenario thành test case chi tiết.",
  "Start by listing high-level scenarios for an overview, then use a checklist to quickly cover key items. When rigor is needed, expand each scenario into detailed test cases.",
  "初心者はシナリオとチェックリストのどちらから始める？",
  "まず上位のシナリオを列挙して全体を把握し、次にチェックリストで重要項目を素早く確認します。厳密さが必要なら各シナリオを詳細ケースに展開します。");

const d4_quiz = [
  mcq({
    q: { vi: "Test scenario khác test case ở điểm nào?", en: "How does a test scenario differ from a test case?", ja: "テストシナリオとテストケースの違いは？" },
    options: [
      { vi: "Scenario chi tiết hơn test case", en: "A scenario is more detailed than a case", ja: "シナリオの方が詳細" },
      { vi: "Scenario là mô tả cấp cao, test case là các bước chi tiết", en: "A scenario is high-level; a case is detailed steps", ja: "シナリオは上位記述、ケースは詳細手順" },
      { vi: "Chúng giống hệt nhau", en: "They are identical", ja: "全く同じ" },
      { vi: "Scenario không cần thiết", en: "Scenarios are unnecessary", ja: "シナリオは不要" },
    ], correct: 1,
    explain: { vi: "Scenario nói 'kiểm gì' ở mức bao quát; test case nói 'kiểm thế nào' chi tiết.", en: "A scenario says 'what to test' broadly; a case says 'how to test' in detail.", ja: "シナリオは『何を』を広く、ケースは『どう』を詳細に述べます。" },
  }),
  mcq({
    q: { vi: "Một test scenario thường sinh ra bao nhiêu test case?", en: "How many test cases does one scenario usually spawn?", ja: "1シナリオは通常いくつのケースを生む？" },
    options: [
      { vi: "Luôn đúng 1", en: "Always exactly 1", ja: "常に1つ" },
      { vi: "Thường nhiều test case", en: "Usually many cases", ja: "通常は複数" },
      { vi: "Không sinh ra test case nào", en: "None at all", ja: "0" },
      { vi: "Tối đa 1", en: "At most 1", ja: "最大1つ" },
    ], correct: 1,
    explain: { vi: "Ví dụ scenario 'Kiểm đăng nhập' sinh ra ca đúng, sai mật khẩu, bỏ trống...", en: "E.g. 'Verify login' spawns correct, wrong-password, empty cases...", ja: "例『ログイン検証』は正しい・誤り・空欄などのケースを生みます。" },
  }),
  mcq({
    q: { vi: "Checklist phù hợp nhất trong tình huống nào?", en: "When is a checklist most suitable?", ja: "チェックリストが最も適する場面は？" },
    options: [
      { vi: "Khi cần kiểm nhanh trước khi giao hàng", en: "Quick checks before release", ja: "リリース前の素早い確認" },
      { vi: "Khi muốn viết code automation phức tạp", en: "Writing complex automation code", ja: "複雑な自動化コードを書く時" },
      { vi: "Khi cần xoá cơ sở dữ liệu", en: "Deleting the database", ja: "DBを削除する時" },
      { vi: "Khi không có gì để kiểm", en: "When there is nothing to test", ja: "検証対象がない時" },
    ], correct: 0,
    explain: { vi: "Checklist gọn nhẹ, hợp kiểm nhanh để không quên mục quan trọng.", en: "A checklist is light, great for quick passes so no key item is missed.", ja: "チェックリストは軽量で、重要項目を忘れない素早い確認に最適です。" },
  }),
  mcq({
    q: { vi: "Thứ tự làm việc hợp lý cho người mới là gì?", en: "What is a sensible order of work for beginners?", ja: "初心者に合理的な作業順序は？" },
    options: [
      { vi: "Viết test case chi tiết trước, không cần scenario", en: "Write detailed cases first, no scenario", ja: "先に詳細ケース、シナリオ不要" },
      { vi: "Liệt kê scenario -> checklist nhanh -> khai triển test case khi cần", en: "List scenarios -> quick checklist -> expand cases when needed", ja: "シナリオ列挙 -> 素早いチェックリスト -> 必要時にケース展開" },
      { vi: "Báo lỗi trước khi kiểm", en: "Report bugs before testing", ja: "検証前にバグ報告" },
      { vi: "Bỏ qua scenario và checklist", en: "Skip both scenarios and checklists", ja: "両方を省く" },
    ], correct: 1,
    explain: { vi: "Bao quát bằng scenario, kiểm nhanh bằng checklist, rồi mới chi tiết hoá thành test case.", en: "Overview with scenarios, quick pass with checklist, then detail into cases.", ja: "シナリオで全体、チェックリストで素早く、その後ケースへ詳細化します。" },
  }),
];

const d4_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & mục tiêu", en: "1. TL;DR & goal", ja: "1. 要点と目標" },
    blocks: [
      TLDR("Test scenario là mô tả cấp cao 'cần kiểm gì'; checklist là danh sách kiểm nhanh. Bài này dạy người mới cách liệt kê scenario, dựng checklist và biết khi nào khai triển thành test case. Cuối bài có trắc nghiệm.",
        "A test scenario is a high-level 'what to test'; a checklist is a quick-check list. This teaches beginners to list scenarios, build checklists and know when to expand into test cases. A quiz at the end.",
        "テストシナリオは『何を検証するか』の上位記述、チェックリストは素早い確認一覧です。本記事は初心者にシナリオ列挙・チェックリスト作成・ケース展開の時機を教えます。最後にクイズ付き。"),
      P("Test scenario và checklist là hai công cụ giúp bạn nhìn bao quát trước khi lao vào chi tiết. Rất nhiều người mới sa đà viết test case ngay mà quên bức tranh lớn, dẫn tới bỏ sót cả mảng chức năng. Bài này đi từ con số 0, có hình minh hoạ, ví dụ thật và trắc nghiệm cuối bài.",
        "Test scenarios and checklists help you see the big picture before diving into detail. Many beginners rush into writing cases and forget the whole picture, missing entire feature areas. This guide starts from zero with illustrations, real examples and a final quiz.",
        "テストシナリオとチェックリストは、詳細に入る前に全体を見る道具です。多くの新人はすぐケースを書き全体像を忘れ、機能領域を丸ごと見落とします。本記事はゼロから解説します。"),
      IMG(svg("Scenario -> Checklist -> Test case", ["Scenario (cấp cao): 'Kiểm chức năng đăng nhập'", "Checklist (nhanh): đúng? sai mk? bỏ trống? email sai?", "Test case (chi tiết): từng bước + kết quả mong đợi"], "#22d3ee"),
        "Ba mức: scenario, checklist và test case", "Three levels: scenario, checklist and test case", "3階層：シナリオ・チェックリスト・テストケース"),
      DEF("Test scenario", "kịch bản kiểm thử — mô tả cấp cao về một chức năng/luồng cần kiểm.",
        "a test scenario — a high-level description of a feature/flow to test.",
        "テストシナリオ — 検証対象の機能/フローの上位記述。"),
    ] },
  { heading: { vi: "2. Nền tảng: scenario, checklist, test case", en: "2. Foundation: scenario, checklist, test case", ja: "2. 基礎：シナリオ・チェックリスト・ケース" },
    blocks: [
      P("Hãy hình dung bạn đi du lịch. Test scenario giống 'những nơi muốn tới' (bao quát); checklist giống 'danh sách đồ cần mang' (nhắc nhanh kẻo quên); test case giống 'lịch trình chi tiết từng giờ'. Ba thứ bổ trợ nhau tuỳ lúc bạn cần bao quát hay chi tiết.",
        "Imagine a trip. A test scenario is like 'places to visit' (overview); a checklist is like a 'packing list' (a quick reminder); a test case is like an 'hour-by-hour itinerary'. The three complement each other depending on whether you need overview or detail.",
        "旅行を想像してください。シナリオは『行きたい場所』（概観）、チェックリストは『持ち物リスト』（素早い備忘）、ケースは『時間刻みの行程』です。3つは概観か詳細かで補完し合います。"),
      DEF("Checklist", "danh sách các điểm cần kiểm, dạng gạch đầu dòng, để kiểm nhanh và không bỏ sót.",
        "a list of points to check, in bullet form, for quick coverage without omissions.",
        "確認すべき項目の箇条書き一覧で、素早く漏れなく確認するもの。"),
      P("Điểm mấu chốt: bạn không phải lúc nào cũng cần test case chi tiết. Khi thời gian gấp hoặc chức năng đơn giản, một checklist rõ ràng đã đủ hiệu quả. Khi chức năng quan trọng và phức tạp, bạn khai triển scenario thành test case để bảo đảm không lọt lỗi.",
        "Key point: you don't always need detailed test cases. When time is tight or a feature is simple, a clear checklist is effective enough. When a feature is important and complex, expand scenarios into cases to ensure no bug slips through.",
        "要点：常に詳細ケースが必要とは限りません。時間が厳しい・機能が単純なら明確なチェックリストで十分です。重要で複雑ならシナリオをケースへ展開します。"),
      IMG(svg("Khi nào dùng cái gì", ["Chức năng đơn giản / gấp -> Checklist", "Chức năng quan trọng / phức tạp -> Test case", "Luôn bắt đầu bằng liệt kê Scenario"], "#f472b6"),
        "Chọn công cụ theo độ quan trọng và thời gian", "Choose the tool by importance and time", "重要度と時間で道具を選ぶ"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng & khi nào dùng", en: "3. Why it matters & when to use", ja: "3. 重要性と使う場面" },
    blocks: [
      P("Bắt đầu bằng scenario giúp bạn không bỏ sót cả một mảng chức năng. Nếu lao vào viết test case ngay, bạn dễ chăm chút một ô đăng nhập mà quên mất luồng 'quên mật khẩu' hay 'đăng nhập bằng mạng xã hội'.",
        "Starting with scenarios keeps you from missing whole feature areas. If you rush into cases, you may polish one login field but forget the 'forgot password' or 'social login' flows.",
        "シナリオから始めると機能領域の丸ごと見落としを防げます。すぐケースに入ると、ログイン欄に凝って『パスワード忘れ』や『SNSログイン』を忘れがちです。"),
      P("Checklist đặc biệt hữu ích trong kiểm thử hồi quy nhẹ và smoke test — kiểm nhanh những chức năng cốt lõi còn chạy sau mỗi lần cập nhật. Nó gọn, nhanh và giúp cả người mới lẫn người bận không quên các mục sống còn.",
        "Checklists shine in light regression and smoke tests — quickly verifying core features still work after each update. They're compact, fast and keep both beginners and busy people from forgetting vital items.",
        "チェックリストは軽い回帰テストやスモークテストで活躍します。更新後に中核機能が動くか素早く確認します。簡潔で速く、忘れを防ぎます。"),
      P("Khi vào công ty, bạn sẽ thấy đội ngũ thường có sẵn cả bộ scenario cho sản phẩm và các checklist theo module. Hiểu ba mức này từ sớm giúp bạn đọc tài liệu của đội nhanh hơn và đóng góp được ngay từ những tuần đầu.",
        "At a company, teams often keep a full set of product scenarios and per-module checklists. Understanding these three levels early helps you read team docs faster and contribute from your first weeks.",
        "企業ではチームが製品のシナリオ一式とモジュール別チェックリストを持つことが多いです。3階層を早く理解すれば資料を速く読め、最初の数週から貢献できます。"),
      P("Một cách hình dung khác: scenario trả lời câu hỏi 'chúng ta cần kiểm những gì', checklist trả lời 'kiểm nhanh xem còn chạy không', còn test case trả lời 'kiểm chính xác từng bước ra sao'. Ba câu hỏi này ứng với ba mức độ chi tiết, và người tester giỏi biết chọn đúng mức cho đúng hoàn cảnh thay vì luôn dùng một cách duy nhất.",
        "Another way to see it: scenarios answer 'what do we need to test', checklists answer 'quickly, does it still work', and test cases answer 'exactly how, step by step'. These three questions map to three levels of detail, and a good tester picks the right level for the situation instead of always using one way.",
        "別の見方：シナリオは『何を検証すべきか』、チェックリストは『素早く、まだ動くか』、ケースは『正確にどの手順か』に答えます。3つの問いは3段階の詳細度に対応し、優れたテスターは状況に応じて適切な段階を選びます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: liệt kê scenario cho một sản phẩm", en: "4. Prepare: list scenarios for a product", ja: "4. 準備：製品のシナリオを列挙" },
    blocks: [
      P("Trước tiên hãy tập nhìn một sản phẩm và liệt kê các scenario chính. Bạn chỉ cần một tờ giấy hoặc ghi chú.",
        "First, practice looking at a product and listing its main scenarios. You only need a sheet of paper or a note.",
        "まず製品を見て主要シナリオを列挙する練習をします。紙かメモがあれば十分です。"),
      STEP(1, "Chọn một app quen thuộc (ví dụ ứng dụng ghi chú hoặc trang thương mại điện tử).", "Pick a familiar app (e.g. a notes app or an e-commerce site).", "使い慣れたアプリ（例：メモアプリやECサイト）を選ぶ。"),
      STEP(2, "Liệt kê các chức năng lớn thành scenario: đăng ký, đăng nhập, tìm kiếm, giỏ hàng, thanh toán...", "List big features as scenarios: sign up, log in, search, cart, checkout...", "大きな機能をシナリオ化：登録・ログイン・検索・カート・決済…"),
      TRY("Viết ngay 5 test scenario cấp cao cho một app bạn hay dùng, mỗi cái một dòng.", "Write 5 high-level scenarios for an app you use, one line each.", "よく使うアプリに上位シナリオを5つ、各1行で書こう。"),
      PITFALL("Nhầm scenario với test case: viết cả bước chi tiết vào scenario khiến danh sách rối và mất tính bao quát.", "Confusing scenario with case: putting detailed steps into a scenario clutters the list and loses the overview.", "シナリオとケースの混同：詳細手順を書くと一覧が煩雑になり概観を失います。"),
      IMG(svg("Danh sách scenario cho trang bán hàng", ["SC01 Đăng ký tài khoản", "SC02 Đăng nhập / quên mật khẩu", "SC03 Tìm kiếm sản phẩm", "SC04 Giỏ hàng & thanh toán"], "#34d399"),
        "Ví dụ danh sách test scenario cho một trang bán hàng", "Example scenario list for a shopping site", "ショッピングサイトのシナリオ一覧例"),
    ] },
  { heading: { vi: "5. Các bước dựng một checklist", en: "5. Steps to build a checklist", ja: "5. チェックリスト作成の手順" },
    blocks: [
      P("Từ một scenario, bạn có thể dựng nhanh một checklist các điểm cần kiểm. Hãy làm theo 3 bước sau.",
        "From a scenario, you can quickly build a checklist of points to verify. Follow these 3 steps.",
        "1つのシナリオから確認項目のチェックリストを素早く作れます。次の3ステップに従います。"),
      STEP(1, "Lấy một scenario, ví dụ 'Đăng nhập'.", "Take one scenario, e.g. 'Login'.", "1シナリオを取る、例『ログイン』。"),
      STEP(2, "Liệt kê các điểm cần kiểm dạng câu hỏi có/không.", "List check points as yes/no questions.", "確認項目を可否の質問形式で列挙。"),
      STEP(3, "Đánh dấu ✔/✘ khi kiểm; ✘ nào cũng cân nhắc mở bug report.", "Mark ✔/✘ while checking; each ✘ may warrant a bug report.", "確認時に✔/✘を付ける。各✘はバグ報告を検討。"),
      CODE("text", "Checklist: Đăng nhập\n[ ] Đăng nhập đúng thông tin -> vào trang chủ?\n[ ] Sai mật khẩu -> hiện thông báo lỗi rõ ràng?\n[ ] Bỏ trống ô -> nút Đăng nhập bị mờ?\n[ ] Email sai định dạng -> báo 'Email không hợp lệ'?\n[ ] 'Ghi nhớ đăng nhập' hoạt động đúng?\n[ ] Link 'Quên mật khẩu' mở đúng trang?"),
      TRY("Chuyển scenario 'Tìm kiếm sản phẩm' thành một checklist ít nhất 5 mục.", "Turn the 'Product search' scenario into a checklist of at least 5 items.", "『商品検索』シナリオを5項目以上のチェックリストにしよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: kiểm nhanh trước khi giao hàng", en: "6. Situation 1: a quick pre-release check", ja: "6. シーン1：リリース前の素早い確認" },
    blocks: [
      SITUATION("Đội chuẩn bị phát hành bản cập nhật trong 30 phút nữa.", "The team ships an update in 30 minutes.",
        "Không đủ thời gian viết test case chi tiết. Bạn cần bảo đảm các chức năng cốt lõi vẫn chạy.",
        "There's no time for detailed cases. You must ensure core features still work.",
        "30分後に更新をリリース予定。", "詳細ケースを書く時間がありません。中核機能が動くことを保証する必要があります。"),
      SOLVE("Dùng một smoke-test checklist gồm các luồng cốt lõi.", "Use a smoke-test checklist of core flows.", "中核フローのスモークテスト・チェックリストを使う。"),
      P("Đây chính là lúc checklist toả sáng. Thay vì viết ca chi tiết, bạn chạy nhanh một danh sách các luồng sống còn: đăng nhập được không, mua hàng được không, thanh toán chạy không. Nếu mọi mục đều ✔, bản phát hành an toàn ở mức cơ bản; có ✘ thì báo ngay để đội quyết định.",
        "This is where a checklist shines. Instead of detailed cases, you quickly run a list of vital flows: can users log in, can they buy, does payment work. If all ✔, the release is basically safe; any ✘ is reported immediately for the team to decide.",
        "ここでチェックリストが活きます。詳細ケースの代わりに重要フロー（ログイン・購入・決済）を素早く確認します。全て✔なら基本的に安全、✘があれば即報告しチームが判断します。"),
      CODE("text", "Smoke checklist (phát hành):\n[✔] Đăng nhập tài khoản mẫu\n[✔] Mở trang chủ, ảnh & menu hiển thị\n[✔] Thêm 1 sản phẩm vào giỏ\n[✘] Thanh toán thử -> nút 'Đặt hàng' không phản hồi  => BÁO NGAY\n[✔] Đăng xuất"),
      RECAP(["Gấp & bao quát -> dùng checklist", "Có ✘ ở luồng cốt lõi -> báo ngay"],
        ["Urgent & broad -> use a checklist", "A ✘ on a core flow -> report immediately"],
        ["緊急かつ広範 -> チェックリスト", "中核フローの✘ -> 即報告"]),
    ] },
  { heading: { vi: "7. Tình huống 2: khai triển scenario thành test case", en: "7. Situation 2: expanding a scenario into cases", ja: "7. シーン2：シナリオをケースへ展開" },
    blocks: [
      SITUATION("Chức năng thanh toán rất quan trọng, cần kiểm kỹ.", "The checkout feature is critical and needs thorough testing.",
        "Với chức năng ảnh hưởng tiền bạc, checklist là chưa đủ. Bạn cần khai triển thành test case chi tiết.",
        "For a money-related feature, a checklist isn't enough. You must expand it into detailed cases.",
        "決済機能は重要で入念な検証が必要。", "金銭に関わる機能ではチェックリストだけでは不十分です。詳細ケースへ展開しましょう。"),
      SOLVE("Lấy scenario 'Thanh toán' và tách thành các test case theo phương thức và tình huống lỗi.", "Take the 'Checkout' scenario and split into cases by method and error situation.", "『決済』シナリオを方法・エラー状況ごとにケース分割する。"),
      P("Từ một scenario cấp cao, bạn suy nghĩ có hệ thống: có bao nhiêu phương thức thanh toán, mỗi phương thức có ca thành công và ca thất bại nào, điều gì xảy ra khi thẻ hết hạn hay mạng rớt giữa chừng. Mỗi nhánh trở thành một test case với kết quả mong đợi cụ thể.",
        "From a high-level scenario you think systematically: how many payment methods, each method's success and failure cases, what happens on an expired card or a dropped network mid-payment. Each branch becomes a case with a specific expected result.",
        "上位シナリオから体系的に考えます：決済方法は何種類か、各方法の成功・失敗ケース、カード期限切れや途中の回線切断時の挙動。各分岐が具体的な期待結果を持つケースになります。"),
      CODE("text", "Scenario SC04: Thanh toán\n  TC01: Thẻ hợp lệ            -> đặt hàng thành công, trừ tiền đúng\n  TC02: Thẻ hết hạn          -> báo 'Thẻ đã hết hạn'\n  TC03: Không đủ số dư       -> báo 'Số dư không đủ'\n  TC04: Mất mạng giữa chừng  -> không trừ tiền hai lần, hiện trạng thái rõ"),
      IMG(svg("Một scenario nở ra nhiều test case", ["SC04 Thanh toán", "  -> TC01 thẻ hợp lệ", "  -> TC02 thẻ hết hạn", "  -> TC03 thiếu số dư  -> TC04 mất mạng"], "#a78bfa"),
        "Một scenario được khai triển thành nhiều test case", "One scenario expanded into several test cases", "1シナリオを複数ケースへ展開"),
      TRY("Khai triển scenario 'Đăng ký tài khoản' thành ít nhất 4 test case.", "Expand the 'Sign up' scenario into at least 4 test cases.", "『会員登録』シナリオを4ケース以上に展開しよう。"),
    ] },
  { heading: { vi: "8. Mini-project: bộ scenario + checklist cho một app", en: "8. Mini-project: scenarios + checklist for an app", ja: "8. ミニ演習：アプリのシナリオ＋チェックリスト" },
    blocks: [
      P("Giờ hãy tự làm một mini-project trọn vẹn: chọn một app quen thuộc và tạo bộ tài liệu kiểm thử nhẹ gồm scenario và checklist.",
        "Now do a complete mini-project: pick a familiar app and create a lightweight test doc set of scenarios and checklists.",
        "完全なミニ演習です。使い慣れたアプリを選び、シナリオとチェックリストからなる軽量テスト資料を作ります。"),
      STEP(1, "Liệt kê 5–7 scenario bao quát toàn bộ app.", "List 5–7 scenarios covering the whole app.", "アプリ全体を覆う5〜7シナリオを列挙。"),
      STEP(2, "Chọn 2 scenario quan trọng nhất, dựng checklist cho mỗi cái.", "Pick the 2 most important scenarios, build a checklist for each.", "最重要2シナリオを選び、各々チェックリストを作成。"),
      STEP(3, "Chọn 1 scenario ảnh hưởng lớn, khai triển thành 4 test case chi tiết.", "Pick 1 high-impact scenario, expand into 4 detailed cases.", "影響の大きい1シナリオを4詳細ケースへ展開。"),
      TRY("Tự đặt câu hỏi: nếu chỉ có 10 phút kiểm app này, bạn sẽ chạy checklist nào?", "Ask yourself: with only 10 minutes to test this app, which checklist would you run?", "自問：このアプリを10分だけ検証するなら、どのチェックリストを回す？"),
      P("Mini-project này rèn cho bạn khả năng chuyển linh hoạt giữa ba mức: bao quát bằng scenario, kiểm nhanh bằng checklist, chi tiết bằng test case. Đây đúng là cách một tester chuyên nghiệp phân bổ công sức theo mức độ quan trọng và thời gian có được. Hãy lưu lại bộ tài liệu bạn vừa làm và thử áp dụng cho một app khác vào ngày mai để so sánh, bạn sẽ thấy tư duy của mình chặt chẽ và nhanh nhạy hơn hẳn.",
        "This mini-project trains you to move fluidly between three levels: overview with scenarios, quick pass with checklists, detail with cases. This is exactly how a professional tester allocates effort by importance and available time.",
        "この演習は3階層（シナリオで概観・チェックリストで素早く・ケースで詳細）を柔軟に行き来する力を鍛えます。プロが重要度と時間で労力を配分する方法そのものです。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng scenario và checklist, người mới hay mắc vài lỗi giống nhau. Biết trước sẽ giúp bạn dùng chúng hiệu quả hơn.",
        "When new to scenarios and checklists, beginners make a few common mistakes. Knowing them helps you use these tools better.",
        "シナリオとチェックリストに不慣れな新人は共通の失敗をします。事前に知れば効果的に使えます。"),
      PITFALL("Viết scenario quá chi tiết (thành test case) hoặc quá mơ hồ (không rõ kiểm gì).", "Writing scenarios too detailed (becoming cases) or too vague (unclear what to test).", "シナリオを詳細すぎ（ケース化）または曖昧すぎ（何を検証か不明）に書く。"),
      TIP("Scenario nên là một câu 'Kiểm <chức năng/luồng>'; checklist là các câu hỏi có/không; test case mới có bước chi tiết.", "A scenario should be one sentence 'Verify <feature/flow>'; a checklist is yes/no questions; only cases have detailed steps.", "シナリオは『<機能/フロー>を検証』の一文、チェックリストは可否質問、ケースだけが詳細手順を持ちます。"),
      IMG(svg("Ba mức viết đúng cách", ["Scenario: 'Kiểm chức năng giỏ hàng'", "Checklist: [ ] thêm được? [ ] xoá được? [ ] cập nhật SL?", "Test case: TC01 các bước + kết quả mong đợi"], "#fb7185"),
        "Cách viết đúng ở ba mức scenario, checklist và test case", "Correct writing at three levels: scenario, checklist, case", "3階層の正しい書き方"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      d4_faq1.block, d4_faq2.block, d4_faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi"),
    ] },
  QUIZ(d4_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa phân biệt được test scenario, checklist và test case, và biết khi nào dùng cái nào. Kỹ năng nhìn bao quát trước khi đi vào chi tiết sẽ giúp bạn không bỏ sót và làm việc có tổ chức hơn nhiều.",
        "You just distinguished test scenarios, checklists and test cases, and know when to use each. Seeing the big picture before the detail keeps you from missing things and makes you far more organized.",
        "テストシナリオ・チェックリスト・ケースを区別し、使い分けを理解しました。詳細前に全体を見る力が見落としを防ぎ、作業を整然とさせます。"),
      P("Chặng tiếp theo là các kỹ thuật thiết kế ca như phân vùng tương đương và giá trị biên để chọn ca thông minh hơn, rồi tiến tới quản lý kiểm thử trong công cụ chuyên nghiệp. Một khoá học bài bản với người hướng dẫn sẽ giúp bạn đi nhanh và chắc.",
        "Next are case-design techniques like equivalence partitioning and boundary values for smarter case selection, then test management in professional tools. A structured course with a mentor helps you move fast and solid.",
        "次は同値分割や境界値などの賢いケース選択技法、そしてプロツールでのテスト管理です。指導付きの体系的コースが速く確実な成長を助けます。"),
      CTA(course),
    ] },
];

const DOC4 = makeDoc({
  slug: "test-scenario-checklist-cho-nguoi-moi",
  primaryKeyword: "test scenario",
  keywords: ["test scenario", "test scenario là gì", "checklist kiểm thử", "kịch bản kiểm thử cho người mới"],
  coverLabel: "NGƯỜI MỚI · TEST SCENARIO",
  crumb: "Test scenario & checklist (người mới)",
  metaTitle: {
    vi: "Test scenario & checklist cho người mới (có ví dụ)",
    en: "Test scenario & checklist for beginners (examples)",
    ja: "初心者向けテストシナリオとチェックリスト（例題）",
  },
  metaDescription: {
    vi: "Test scenario là gì, khác test case ra sao và cách dùng checklist cho người mới: 3 mức kiểm thử, khai triển ca, ví dụ smoke test, trắc nghiệm và khóa Tester CyberSoft.",
    en: "What a test scenario is, how it differs from a test case, and using checklists for beginners: 3 levels, expanding cases, smoke-test examples, a quiz and CyberSoft's Tester course.",
    ja: "テストシナリオとは、ケースとの違い、初心者向けチェックリストの使い方：3階層・展開・例題・クイズ。",
  },
  title: {
    vi: "Test scenario & checklist cho người mới: 3 mức kiểm thử & ví dụ thực tế (có trắc nghiệm)",
    en: "Test scenario & checklist for beginners: 3 testing levels & real examples (with quiz)",
    ja: "初心者向けテストシナリオとチェックリスト：3階層と実例（クイズ付き）",
  },
  summary: {
    vi: "Bài nền tảng cho người mới: test scenario là gì, khác test case ra sao, cách dựng checklist và khi nào khai triển thành test case; ví dụ smoke test trước khi giao hàng và khai triển thanh toán, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner foundation: what a test scenario is, how it differs from a test case, building checklists and when to expand into cases; pre-release smoke test and checkout expansion examples, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け基礎：テストシナリオとは、ケースとの違い、チェックリスト作成と展開時機、例題、FAQ、クイズ。",
  },
  faqs: [d4_faq1, d4_faq2, d4_faq3],
  howTo: { name: "Cách dùng test scenario và checklist cho người mới", steps: [
    { name: "Liệt kê scenario", text: "Mô tả cấp cao các chức năng/luồng cần kiểm." },
    { name: "Dựng checklist", text: "Chuyển scenario thành các câu hỏi có/không để kiểm nhanh." },
    { name: "Khai triển test case khi cần", text: "Với chức năng quan trọng, tách scenario thành ca chi tiết." },
  ] },
  pages: d4_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 5 — Phân vùng tương đương & giá trị biên cho người mới
// ══════════════════════════════════════════════════════════════════════════════════════
const d5_faq1 = FAQ(
  "Phân vùng tương đương là gì?", "What is equivalence partitioning?",
  "Phân vùng tương đương là kỹ thuật chia miền dữ liệu đầu vào thành các nhóm mà các giá trị trong cùng nhóm được xử lý giống nhau, rồi chỉ chọn một đại diện mỗi nhóm để kiểm. Nhờ đó bạn giảm số ca mà vẫn phủ tốt.",
  "Equivalence partitioning splits the input domain into groups whose values are treated the same, then tests one representative per group. This cuts the number of cases while keeping good coverage.",
  "同値分割とは？",
  "同値分割は入力域を同じ扱いになる群に分け、各群から代表値を1つ選んで検証する技法です。ケース数を減らしつつ良い網羅を保ちます。");
const d5_faq2 = FAQ(
  "Giá trị biên là gì và vì sao hay dùng cùng phân vùng?", "What are boundary values and why pair them with partitioning?",
  "Giá trị biên là các giá trị ngay tại và cạnh ranh giới giữa các vùng. Lỗi thường ẩn ở ranh giới (ví dụ dấu < viết nhầm thành <=), nên sau khi phân vùng, người ta kiểm thêm các giá trị biên để bắt đúng loại lỗi này.",
  "Boundary values are the values at and next to the edges between partitions. Bugs often hide at boundaries (e.g. < mistyped as <=), so after partitioning we also test boundary values to catch such bugs.",
  "境界値とは？なぜ同値分割と併用する？",
  "境界値は区分の境目とその隣の値です。バグは境界に潜みやすい（例：<を<=と誤記）ため、同値分割の後に境界値も検証します。");
const d5_faq3 = FAQ(
  "Hai kỹ thuật này giúp ích gì cho người mới?", "How do these two techniques help beginners?",
  "Chúng giúp bạn chọn ca thông minh: thay vì thử vô số giá trị, bạn chỉ cần vài ca đại diện mỗi vùng cộng các giá trị biên. Nhờ vậy bộ ca gọn, chạy nhanh mà vẫn bắt được phần lớn lỗi thường gặp.",
  "They help you select cases smartly: instead of countless values, you need a few representatives per partition plus the boundary values. Your suite stays compact, runs fast and still catches most common bugs.",
  "この2技法は初心者にどう役立つ？",
  "賢いケース選択に役立ちます。無数の値の代わりに各区分の代表数個＋境界値で済み、ケースは簡潔・高速で多くのバグを捉えます。");

const d5_quiz = [
  mcq({
    q: { vi: "Phân vùng tương đương giúp điều gì?", en: "What does equivalence partitioning help with?", ja: "同値分割は何に役立つ？" },
    options: [
      { vi: "Tăng số ca kiểm lên tối đa", en: "Maximize the number of cases", ja: "ケース数を最大化" },
      { vi: "Giảm số ca mà vẫn phủ tốt bằng cách chọn đại diện mỗi nhóm", en: "Fewer cases with good coverage by picking a representative per group", ja: "群ごとに代表を選び、少ないケースで良い網羅" },
      { vi: "Xoá bớt yêu cầu", en: "Remove some requirements", ja: "要件を減らす" },
      { vi: "Làm chậm quá trình kiểm", en: "Slow down testing", ja: "検証を遅くする" },
    ], correct: 1,
    explain: { vi: "Các giá trị cùng nhóm xử lý giống nhau nên chỉ cần một đại diện mỗi nhóm.", en: "Values in a group are treated the same, so one representative per group suffices.", ja: "同群の値は同扱いのため、群ごと代表1つで十分です。" },
  }),
  mcq({
    q: { vi: "Với ô tuổi hợp lệ 18–60, đâu là các giá trị biên nên kiểm?", en: "For a valid age field 18–60, which are boundary values to test?", ja: "有効年齢18〜60の欄で検証すべき境界値は？" },
    options: [
      { vi: "Chỉ 40", en: "Only 40", ja: "40のみ" },
      { vi: "17, 18, 60, 61", en: "17, 18, 60, 61", ja: "17, 18, 60, 61" },
      { vi: "0 và 100", en: "0 and 100", ja: "0と100" },
      { vi: "Không có biên", en: "There are no boundaries", ja: "境界はない" },
    ], correct: 1,
    explain: { vi: "Biên là các giá trị ngay tại và cạnh ranh giới: 18, 60 và ngay ngoài là 17, 61.", en: "Boundaries are values at and next to the edges: 18, 60 and just outside 17, 61.", ja: "境界は境目とその隣：18・60と外側の17・61です。" },
  }),
  mcq({
    q: { vi: "Với ô tuổi hợp lệ 18–60, đâu là ĐẠI DIỆN vùng hợp lệ tốt?", en: "For age 18–60, which is a good representative of the valid partition?", ja: "年齢18〜60で有効区分の良い代表は？" },
    options: [
      { vi: "40", en: "40", ja: "40" },
      { vi: "5", en: "5", ja: "5" },
      { vi: "-3", en: "-3", ja: "-3" },
      { vi: "999", en: "999", ja: "999" },
    ], correct: 0,
    explain: { vi: "40 nằm trong vùng hợp lệ 18–60 nên đại diện đúng cho nhóm hợp lệ.", en: "40 lies within 18–60 so it represents the valid group.", ja: "40は18〜60内なので有効群の代表です。" },
  }),
  mcq({
    q: { vi: "Vì sao lỗi thường ẩn ở giá trị biên?", en: "Why do bugs often hide at boundary values?", ja: "なぜバグは境界値に潜みやすい？" },
    options: [
      { vi: "Vì máy tính ghét số lớn", en: "Because computers hate big numbers", ja: "大きな数が嫌いだから" },
      { vi: "Vì lập trình viên dễ nhầm dấu so sánh, ví dụ < và <=", en: "Because devs easily mix up comparisons like < and <=", ja: "<と<=など比較を誤りやすいから" },
      { vi: "Vì biên không tồn tại", en: "Because boundaries don't exist", ja: "境界が存在しないから" },
      { vi: "Vì biên luôn hợp lệ", en: "Because boundaries are always valid", ja: "境界は常に有効だから" },
    ], correct: 1,
    explain: { vi: "Nhầm '<' thành '<=' (hoặc ngược lại) khiến đúng một giá trị biên bị xử lý sai.", en: "Mixing '<' with '<=' makes exactly one boundary value handled wrong.", ja: "『<』と『<=』の取り違えで境界値1つが誤処理されます。" },
  }),
];

const d5_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & mục tiêu", en: "1. TL;DR & goal", ja: "1. 要点と目標" },
    blocks: [
      TLDR("Phân vùng tương đương chia đầu vào thành các nhóm và chọn một đại diện mỗi nhóm; giá trị biên kiểm thêm các mốc ở ranh giới. Kết hợp hai kỹ thuật giúp bạn chọn ít ca mà vẫn bắt nhiều lỗi. Cuối bài có trắc nghiệm.",
        "Equivalence partitioning splits inputs into groups and picks one representative each; boundary values test the edges. Combining them lets you pick few cases yet catch many bugs. A quiz at the end.",
        "同値分割は入力を群に分け各代表を選び、境界値は境目を検証します。両技法の併用で少ないケースで多くのバグを捉えます。最後にクイズ付き。"),
      P("Phân vùng tương đương và giá trị biên là hai kỹ thuật thiết kế ca kinh điển, giúp bạn thoát khỏi việc thử vô số con số một cách vô định hướng. Người mới nắm được hai kỹ thuật này sẽ viết bộ ca gọn gàng mà vẫn hiệu quả. Bài này đi từ con số 0, có hình minh hoạ, ví dụ thật và trắc nghiệm cuối bài.",
        "Equivalence partitioning and boundary values are two classic case-design techniques that free you from aimlessly trying countless numbers. Beginners who grasp them write compact yet effective suites. This guide starts from zero with illustrations, real examples and a final quiz.",
        "同値分割と境界値は古典的なケース設計技法で、無数の値を当てずっぽうに試すことから解放します。習得した新人は簡潔で効果的なケースを書けます。本記事はゼロから解説します。"),
      IMG(svg("Chia vùng dữ liệu cho ô tuổi 18–60", ["Vùng < 18: không hợp lệ (đại diện: 10)", "Vùng 18–60: hợp lệ (đại diện: 40)", "Vùng > 60: không hợp lệ (đại diện: 75)"], "#22d3ee"),
        "Phân vùng dữ liệu cho ô tuổi hợp lệ 18–60", "Partitioning inputs for a valid age field 18–60", "有効年齢18〜60の入力区分"),
      DEF("Phân vùng tương đương", "kỹ thuật chia đầu vào thành các nhóm xử lý giống nhau, mỗi nhóm chỉ cần một ca đại diện.",
        "a technique splitting inputs into equally-treated groups, needing one representative case each.",
        "入力を同扱いの群に分け、各群に代表ケース1つで足りる技法。"),
    ] },
  { heading: { vi: "2. Nền tảng: vì sao không thử mọi giá trị", en: "2. Foundation: why not test every value", ja: "2. 基礎：なぜ全値を試さないか" },
    blocks: [
      P("Một ô nhập tuổi có thể nhận vô số con số. Nếu thử từng số một thì đến Tết cũng không xong. Ý tưởng cốt lõi: nhiều giá trị được phần mềm xử lý y hệt nhau, nên chỉ cần kiểm một đại diện cho cả nhóm là đủ.",
        "An age field accepts countless numbers. Testing each one would never finish. The core idea: many values are handled identically by the software, so testing one representative per group is enough.",
        "年齢欄は無数の数を受け付けます。1つずつ試すと終わりません。核心：多くの値はソフトが同一に扱うため、群ごと代表1つで十分です。"),
      DEF("Giá trị biên", "các giá trị ngay tại và cạnh ranh giới giữa các vùng dữ liệu.",
        "the values at and immediately next to the edges between data partitions.",
        "データ区分の境目とすぐ隣の値。"),
      P("Sau khi chia vùng, ta để ý rằng lỗi rất hay xảy ra đúng ở ranh giới. Lập trình viên có thể viết nhầm 'nhỏ hơn' thành 'nhỏ hơn hoặc bằng', khiến đúng một giá trị biên bị xử lý sai. Vì thế kiểm thêm giá trị biên là cách rẻ mà bắt được loại lỗi tinh vi này.",
        "After partitioning, we notice bugs love the exact edges. A developer may write 'less than' as 'less than or equal', making exactly one boundary value handled wrong. So testing boundary values is a cheap way to catch this subtle class of bugs.",
        "区分後、バグは境目に集まります。開発者が『未満』を『以下』と誤記し、境界値1つが誤処理されることがあります。境界値の検証はこの微妙なバグを安く捉えます。"),
      IMG(svg("Lỗi ẩn ở ranh giới", ["Yêu cầu: hợp lệ khi tuổi >= 18", "Code nhầm: hợp lệ khi tuổi > 18", "=> tuổi 18 bị từ chối sai! (lỗi biên)"], "#f472b6"),
        "Lỗi tinh vi ẩn ngay tại giá trị biên", "A subtle bug hiding right at a boundary value", "境界値に潜む微妙なバグ"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng & khi nào dùng", en: "3. Why it matters & when to use", ja: "3. 重要性と使う場面" },
    blocks: [
      P("Hai kỹ thuật này quan trọng vì chúng biến việc chọn ca từ cảm tính thành có cơ sở. Thay vì đoán mò, bạn có một quy tắc rõ ràng: chia vùng, chọn đại diện, thêm biên. Bộ ca vừa gọn vừa phủ tốt.",
        "These techniques matter because they turn case selection from guesswork into method. Instead of guessing, you have a clear rule: partition, pick representatives, add boundaries. The suite is both compact and well-covering.",
        "この2技法は、ケース選択を勘から方法へ変えるため重要です。区分・代表選択・境界追加という明確な規則で、簡潔かつ良網羅になります。"),
      P("Bạn dùng chúng bất cứ khi nào có ô nhập với miền giá trị: tuổi, số tiền, số lượng, độ dài mật khẩu, ngày tháng. Gần như mọi form đều có chỗ áp dụng. Đây là kỹ thuật bạn sẽ dùng suốt sự nghiệp, cả khi kiểm thủ công lẫn khi viết automation.",
        "Use them whenever there's an input with a value range: age, amount, quantity, password length, dates. Almost every form has a place to apply them. This is a technique you'll use throughout your career, in both manual and automation testing.",
        "値域のある入力（年齢・金額・数量・パスワード長・日付）があれば常に使います。ほぼ全フォームで適用でき、手動でも自動でもキャリアを通じて使います。"),
      P("Điều đẹp đẽ là hai kỹ thuật này rất trực quan: chỉ cần một tờ giấy vẽ trục số, bạn đã chia vùng và đánh dấu biên được. Không cần công cụ, không cần lập trình — chỉ cần tư duy rõ ràng. Vì thế đây là điểm khởi đầu hoàn hảo cho người mới học thiết kế ca.",
        "The beauty is these techniques are visual: with just a number line on paper you can partition and mark boundaries. No tools, no coding — just clear thinking. So this is a perfect starting point for beginners learning case design.",
        "美点は視覚的なことです。紙に数直線を書くだけで区分と境界を示せます。ツールもコードも不要、明確な思考だけ。ケース設計を学ぶ初心者に最適な出発点です。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: vẽ trục số để chia vùng", en: "4. Prepare: draw a number line to partition", ja: "4. 準備：数直線で区分する" },
    blocks: [
      P("Công cụ duy nhất bạn cần là một trục số. Vẽ nó ra, đánh dấu các ranh giới hợp lệ, và mọi thứ trở nên rõ ràng.",
        "The only tool you need is a number line. Draw it, mark the valid edges, and everything becomes clear.",
        "必要な道具は数直線だけです。描いて有効な境目を印すと、全てが明確になります。"),
      STEP(1, "Đọc yêu cầu để biết miền hợp lệ, ví dụ 'mật khẩu dài 8–20 ký tự'.", "Read the requirement for the valid range, e.g. 'password 8–20 characters'.", "要件を読み有効域を知る、例『パスワード8〜20文字』。"),
      STEP(2, "Vẽ trục và chia 3 vùng: dưới mức tối thiểu, hợp lệ, trên mức tối đa.", "Draw the line and split 3 partitions: below min, valid, above max.", "数直線を描き3区分：最小未満・有効・最大超。"),
      TRY("Vẽ trục số cho ô 'số lượng mua 1–10' và khoanh 3 vùng ngay trên giấy.", "Draw a number line for a 'quantity 1–10' field and circle 3 partitions on paper.", "『購入数量1〜10』の数直線を描き、紙に3区分を丸で囲もう。"),
      PITFALL("Chỉ kiểm giá trị ở giữa vùng hợp lệ mà quên hẳn giá trị biên — bỏ lọt đúng chỗ lỗi hay xảy ra.", "Only testing mid-range valid values and forgetting boundaries — missing exactly where bugs occur.", "有効域の中央だけ検証し境界を忘れると、バグが起きやすい場所を見逃します。"),
      IMG(svg("Trục số cho mật khẩu dài 8–20", ["< 8: quá ngắn (đại diện: 5)", "8 .......... 20: hợp lệ (đại diện: 12)", "> 20: quá dài (đại diện: 25)", "Biên: 7,8 và 20,21"], "#34d399"),
        "Trục số chia vùng cho độ dài mật khẩu 8–20", "A number line partitioning password length 8–20", "パスワード長8〜20の区分数直線"),
    ] },
  { heading: { vi: "5. Các bước áp dụng hai kỹ thuật", en: "5. Steps to apply both techniques", ja: "5. 2技法の適用手順" },
    blocks: [
      P("Hãy áp dụng theo trình tự để không bỏ sót. Bốn bước dưới đây dùng được cho mọi ô nhập có miền giá trị.",
        "Apply in order so you miss nothing. These 4 steps work for any input with a value range.",
        "順序立てて適用し抜けを防ぎます。次の4ステップは値域を持つ全入力に使えます。"),
      STEP(1, "Chia vùng: xác định các nhóm giá trị được xử lý giống nhau.", "Partition: identify groups of values treated the same.", "区分：同扱いの値群を特定。"),
      STEP(2, "Chọn một đại diện cho mỗi vùng (kể cả vùng không hợp lệ).", "Pick one representative per partition (including invalid ones).", "各区分の代表を1つ選ぶ（無効区分も）。"),
      STEP(3, "Xác định giá trị biên: mốc ranh giới và ngay bên ngoài nó.", "Identify boundary values: the edge and just outside it.", "境界値を特定：境目とその外側。"),
      STEP(4, "Gộp thành bộ test case, mỗi ca có kết quả mong đợi.", "Combine into a case set, each with an expected result.", "ケース群にまとめ、各々に期待結果。"),
      CODE("text", "Ô tuổi hợp lệ 18–60:\nĐại diện các vùng: 10 (dưới), 40 (hợp lệ), 75 (trên)\nGiá trị biên:       17, 18 (biên dưới) và 60, 61 (biên trên)\nTC01: 10  -> báo 'Tuổi phải từ 18'\nTC02: 40  -> hợp lệ\nTC03: 17  -> báo 'Tuổi phải từ 18'\nTC04: 18  -> hợp lệ\nTC05: 60  -> hợp lệ\nTC06: 61  -> báo 'Tuổi tối đa là 60'"),
      TRY("Áp dụng đủ 4 bước cho ô 'số lượng mua 1–10' và viết ra bộ test case của bạn.", "Apply all 4 steps to a 'quantity 1–10' field and write out your case set.", "『購入数量1〜10』に4ステップを適用し、ケース群を書き出そう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: ô số tiền nạp có hạn mức", en: "6. Situation 1: a top-up amount with a limit", ja: "6. シーン1：上限のあるチャージ金額" },
    blocks: [
      SITUATION("Kiểm ô nạp tiền ví điện tử, hạn mức 10.000–5.000.000 đồng.", "Test an e-wallet top-up field, limit 10,000–5,000,000 VND.",
        "Hệ thống chỉ cho nạp trong khoảng cho phép. Hãy thiết kế bộ ca gọn bằng phân vùng + giá trị biên.",
        "The system only allows top-ups within range. Design a compact case set with partitioning + boundaries.",
        "電子ウォレットのチャージ欄（1万〜500万VND）を検証する。", "範囲内のみ許可。区分＋境界値で簡潔なケースを設計しましょう。"),
      SOLVE("Chia 3 vùng, chọn đại diện mỗi vùng, thêm 4 giá trị biên.", "Split 3 partitions, pick a representative each, add 4 boundary values.", "3区分に分け各代表を選び、境界値4つを追加。"),
      P("Miền hợp lệ là 10.000 đến 5.000.000. Vậy có ba vùng: dưới 10.000, trong khoảng, và trên 5.000.000. Đại diện lần lượt có thể là 5.000, 1.000.000 và 9.000.000. Giá trị biên gồm 9.999, 10.000, 5.000.000 và 5.000.001. Chỉ với bấy nhiêu ca, bạn đã phủ được cả các nhóm lẫn ranh giới.",
        "The valid range is 10,000 to 5,000,000. So three partitions: below 10,000, in range, and above 5,000,000. Representatives could be 5,000, 1,000,000 and 9,000,000. Boundaries include 9,999, 10,000, 5,000,000 and 5,000,001. With just these cases you cover both groups and edges.",
        "有効域は1万〜500万です。3区分：1万未満・範囲内・500万超。代表は5千・100万・900万。境界は9,999・10,000・5,000,000・5,000,001。これだけで群と境界を網羅します。"),
      CODE("text", "TC01: 5000       -> báo 'Tối thiểu 10.000'\nTC02: 1000000    -> nạp thành công\nTC03: 9000000    -> báo 'Tối đa 5.000.000'\nTC04: 9999       -> báo 'Tối thiểu 10.000'   (biên dưới ngoài)\nTC05: 10000      -> nạp thành công           (biên dưới trong)\nTC06: 5000000    -> nạp thành công           (biên trên trong)\nTC07: 5000001    -> báo 'Tối đa 5.000.000'    (biên trên ngoài)"),
      RECAP(["3 vùng + 4 biên = bộ ca gọn mà phủ tốt", "Nhớ kiểm cả vùng không hợp lệ"],
        ["3 partitions + 4 boundaries = compact yet covering", "Remember to test invalid partitions too"],
        ["3区分＋4境界＝簡潔で良網羅", "無効区分の検証も忘れずに"]),
    ] },
  { heading: { vi: "7. Tình huống 2: ô nhập không phải số", en: "7. Situation 2: a non-numeric input", ja: "7. シーン2：数値でない入力" },
    blocks: [
      SITUATION("Kiểm ô 'mã giảm giá' chỉ chấp nhận 6 ký tự chữ-số.", "Test a 'coupon code' field accepting exactly 6 alphanumeric characters.",
        "Không chỉ số mà cả chữ cũng có thể phân vùng. Hãy chia nhóm hợp lệ và các nhóm không hợp lệ.",
        "Not only numbers but text can be partitioned too. Split into valid and invalid groups.",
        "『クーポンコード』欄（英数字ちょうど6文字）を検証する。", "数値だけでなく文字も区分できます。有効群と無効群に分けましょう。"),
      SOLVE("Phân vùng theo độ dài và theo loại ký tự; thêm biên độ dài 5, 6, 7.", "Partition by length and character type; add length boundaries 5, 6, 7.", "長さと文字種で区分し、長さ境界5・6・7を追加。"),
      P("Phân vùng không chỉ dành cho số. Ở đây bạn chia theo hai chiều: độ dài (dưới 6, đúng 6, trên 6) và loại ký tự (chữ-số hợp lệ, chứa ký tự đặc biệt không hợp lệ). Kết hợp lại, bạn có một bộ ca nhỏ mà kiểm được nhiều khía cạnh — đây chính là sức mạnh của tư duy phân vùng.",
        "Partitioning isn't only for numbers. Here you split along two dimensions: length (below 6, exactly 6, above 6) and character type (valid alphanumeric, invalid special characters). Combined, you get a small case set covering many aspects — the power of partition thinking.",
        "区分は数値専用ではありません。ここでは2軸：長さ（6未満・ちょうど6・6超）と文字種（有効な英数字・無効な特殊文字）で分けます。組み合わせで小さなケース群が多面を網羅します。"),
      CODE("text", "TC01: 'AB12CD' (6 ký tự chữ-số) -> hợp lệ\nTC02: 'AB12C'  (5 ký tự)         -> báo 'Mã phải đủ 6 ký tự'   (biên dưới)\nTC03: 'AB12CDE'(7 ký tự)         -> báo 'Mã phải đủ 6 ký tự'   (biên trên)\nTC04: 'AB12C#' (có ký tự đặc biệt)-> báo 'Chỉ gồm chữ và số'\nTC05: ''       (để trống)         -> báo 'Vui lòng nhập mã'"),
      IMG(svg("Phân vùng hai chiều cho mã giảm giá", ["Độ dài: <6 (xấu) | =6 (tốt) | >6 (xấu)", "Loại ký tự: chữ-số (tốt) | có ký tự lạ (xấu)", "Biên độ dài: 5, 6, 7"], "#a78bfa"),
        "Phân vùng theo hai chiều: độ dài và loại ký tự", "Two-dimensional partitioning: length and character type", "2軸の区分：長さと文字種"),
      TRY("Tự phân vùng cho ô 'tên đăng nhập 4–12 ký tự, chỉ chữ và số' và viết 5 ca.", "Partition a 'username 4–12 chars, letters/numbers only' field and write 5 cases.", "『ユーザー名4〜12文字・英数字のみ』を区分し5ケース書こう。"),
    ] },
  { heading: { vi: "8. Mini-project: thiết kế ca cho form đăng ký", en: "8. Mini-project: design cases for a sign-up form", ja: "8. ミニ演習：登録フォームのケース設計" },
    blocks: [
      P("Hãy gộp mọi thứ vừa học vào một mini-project: thiết kế bộ test case cho form đăng ký bằng phân vùng và giá trị biên.",
        "Combine everything into a mini-project: design a test case set for a sign-up form using partitioning and boundary values.",
        "学んだ全てをミニ演習に統合：区分と境界値で登録フォームのケースを設計します。"),
      STEP(1, "Với ô 'Tuổi' (13–100), chia vùng và liệt kê đại diện + biên.", "For an 'Age' field (13–100), partition and list representatives + boundaries.", "『年齢』欄（13〜100）を区分し代表＋境界を列挙。"),
      STEP(2, "Với ô 'Mật khẩu' (8–20 ký tự), chia vùng theo độ dài và loại ký tự.", "For 'Password' (8–20 chars), partition by length and character type.", "『パスワード』（8〜20文字）を長さと文字種で区分。"),
      STEP(3, "Với ô 'Email', chia vùng: đúng định dạng vs sai định dạng (thiếu @, thiếu tên miền).", "For 'Email', partition: valid vs invalid format (missing @, missing domain).", "『メール』を区分：正しい形式と不正（@なし・ドメインなし）。"),
      TRY("Đếm tổng số test case bạn tạo ra và tự hỏi: có ca nào trùng ý không? Nếu có, gộp lại.", "Count your total cases and ask: any redundant ones? If so, merge them.", "作成した総ケース数を数え、重複がないか確認。あれば統合しよう。"),
      P("Khi hoàn thành, hãy nhìn lại bộ ca: nó gọn nhưng phủ được các nhóm hợp lệ, không hợp lệ và mọi ranh giới quan trọng. Đó chính là dấu hiệu của tư duy thiết kế ca chuyên nghiệp — làm ít mà bắt được nhiều lỗi.",
        "When done, review the suite: it's compact yet covers valid, invalid groups and every key boundary. That's the mark of professional case-design thinking — do less, catch more bugs.",
        "完成したらケース群を見直します：簡潔でも有効・無効群と重要境界を網羅。これがプロのケース設計思考の証です。少ない労力で多くのバグを捉えます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới dùng hai kỹ thuật này, người mới hay mắc vài lỗi giống nhau. Tránh được, bộ ca của bạn sẽ vừa gọn vừa chắc.",
        "When new to these techniques, beginners make a few common mistakes. Avoid them and your suite stays compact yet solid.",
        "この2技法に不慣れな新人は共通の失敗をします。避ければケースは簡潔かつ堅牢になります。"),
      PITFALL("Chỉ chọn đại diện vùng hợp lệ mà quên các vùng không hợp lệ — bỏ lọt phần lỗi hay xảy ra.", "Only picking valid-partition representatives and forgetting invalid ones — missing where bugs occur.", "有効区分の代表だけ選び無効区分を忘れると、バグの起きる所を見逃します。"),
      PITFALL("Quên giá trị biên, hoặc chỉ kiểm biên trong mà không kiểm biên ngay ngoài.", "Forgetting boundaries, or testing only the inner boundary but not just outside it.", "境界値の忘れ、または内側境界だけで外側を検証しない。"),
      TIP("Với mỗi ranh giới, luôn kiểm cặp giá trị: ngay tại biên và ngay ngoài biên (ví dụ 18 và 17).", "For each edge, always test a pair: at the boundary and just outside it (e.g. 18 and 17).", "各境目で必ず対で検証：境界とその外側（例18と17）。"),
      IMG(svg("Checklist khi thiết kế ca", ["[ ] Đã liệt kê đủ các vùng (kể cả không hợp lệ)?", "[ ] Mỗi vùng có 1 đại diện?", "[ ] Mỗi ranh giới có cặp biên trong/ngoài?"], "#fb7185"),
        "Checklist tự kiểm khi thiết kế ca bằng hai kỹ thuật", "A self-check checklist when designing cases with both techniques", "2技法でケース設計時の自己点検リスト"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      d5_faq1.block, d5_faq2.block, d5_faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenario & checklist for beginners", "test-scenario-checklist-cho-nguoi-moi"),
    ] },
  QUIZ(d5_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa nắm hai kỹ thuật thiết kế ca kinh điển: phân vùng tương đương và giá trị biên. Từ nay khi gặp một ô nhập, bạn có ngay quy tắc để chọn ca thông minh thay vì thử mò. Hãy luyện trên nhiều loại ô khác nhau để thành phản xạ.",
        "You now grasp two classic case-design techniques: equivalence partitioning and boundary values. From now on, facing an input, you have a rule to pick cases smartly instead of guessing. Practice on many field types until it's reflexive.",
        "同値分割と境界値という古典的な2技法を習得しました。今後は入力を見たら勘でなく規則で賢くケースを選べます。様々な欄で練習し反射的にしましょう。"),
      P("Chặng tiếp theo là các kỹ thuật nâng cao như bảng quyết định và chuyển trạng thái, rồi áp dụng tất cả vào cả kiểm thử thủ công lẫn automation. Nếu muốn lộ trình rõ ràng cùng người hướng dẫn để tự tin ứng tuyển Tester, một khoá học bài bản sẽ giúp bạn rút ngắn thời gian rất nhiều.",
        "Next are advanced techniques like decision tables and state transition, then applying all of it to both manual and automation testing. A structured course with a mentor helps you shorten the path and apply confidently.",
        "次は決定表や状態遷移などの上級技法、そして手動と自動の両方への応用です。指導付きの体系的コースが道のりを大きく短縮します。"),
      CTA(course),
    ] },
];

const DOC5 = makeDoc({
  slug: "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi",
  primaryKeyword: "phân vùng tương đương",
  keywords: ["phân vùng tương đương", "giá trị biên", "kỹ thuật thiết kế test case", "boundary value cho người mới"],
  coverLabel: "NGƯỜI MỚI · PHÂN VÙNG & BIÊN",
  crumb: "Phân vùng tương đương & giá trị biên (người mới)",
  metaTitle: {
    vi: "Phân vùng tương đương & giá trị biên cho người mới",
    en: "Equivalence partitioning & boundary values (beginners)",
    ja: "初心者向け同値分割と境界値",
  },
  metaDescription: {
    vi: "Phân vùng tương đương và giá trị biên cho người mới: chia vùng dữ liệu, chọn đại diện, kiểm biên, ví dụ tuổi và số tiền, trắc nghiệm và khóa Tester CyberSoft.",
    en: "Equivalence partitioning and boundary values for beginners: partition inputs, pick representatives, test edges, age & amount examples, a mini-project, a quiz and CyberSoft's Tester course.",
    ja: "初心者向け同値分割と境界値：入力区分・代表選択・境界検証・例題・ミニ演習・クイズ。",
  },
  title: {
    vi: "Phân vùng tương đương & giá trị biên cho người mới: kỹ thuật thiết kế test case (có trắc nghiệm)",
    en: "Equivalence partitioning & boundary values for beginners: case-design techniques (with quiz)",
    ja: "初心者向け同値分割と境界値：ケース設計技法（クイズ付き）",
  },
  summary: {
    vi: "Bài nền tảng cho người mới: hai kỹ thuật thiết kế ca phân vùng tương đương và giá trị biên, cách chia vùng và chọn đại diện, kiểm giá trị biên, ví dụ ô tuổi/số tiền/mã giảm giá, mini-project form đăng ký, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner foundation: the two case-design techniques equivalence partitioning and boundary values, how to partition and pick representatives, test boundaries, age/amount/coupon examples, a sign-up mini-project, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け基礎：同値分割と境界値の2技法、区分と代表選択、境界検証、例題、ミニ演習、FAQ、クイズ。",
  },
  faqs: [d5_faq1, d5_faq2, d5_faq3],
  howTo: { name: "Cách áp dụng phân vùng tương đương và giá trị biên", steps: [
    { name: "Chia vùng dữ liệu", text: "Xác định các nhóm giá trị được xử lý giống nhau, kể cả nhóm không hợp lệ." },
    { name: "Chọn đại diện", text: "Mỗi vùng chọn một giá trị đại diện để kiểm." },
    { name: "Kiểm giá trị biên", text: "Kiểm mốc ranh giới và giá trị ngay ngoài ranh giới." },
  ] },
  pages: d5_pages,
});

export const BEGINNER_MANUAL_DOCS = [DOC1, DOC2, DOC3, DOC4, DOC5];

