// doc_cnm_beg_enterprise.mjs — BÀI "DÀNH CHO NGƯỜI MỚI" (beginner), thực chiến doanh nghiệp:
// Quy trình test ở công ty cho người mới — một ngày làm Tester diễn ra thế nào.
// Bám hệ ngân hàng số SolarBank Digital (domain fintech), giới thiệu sprint, vai trò,
// phối hợp Dev/BA/QA, công cụ, luồng công việc thực tế. Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO. Practice-first, nhiều mockup giao diện, giọng khích lệ.
import { P, IMG, TIP, CODE, UL, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, kanban, dashboard, jira, moduleFlow } from "./ui_mock.mjs";

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
    categorySlug: "enterprise-realworld", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: tổng quan một ngày làm Tester (dashboard số liệu nhanh) ──
const m_dashDay = dashboard("Một ngày làm Tester · SolarBank Digital · Sprint 8", [
  { label: "Standup", value: "09:00", sub: "cả team", color: "#2563eb" },
  { label: "Ca test chạy", value: "18", sub: "hôm nay", color: "#16a34a" },
  { label: "Bug mới", value: "3", sub: "đã ghi ticket", color: "#e11d48" },
  { label: "Build mới", value: "16:00", sub: "lên staging", color: "#f59e0b" },
]);

// ── Mockup 2: lịch một ngày làm việc chi tiết ──
const m_schedule = grid("Lịch một ngày làm Tester (SolarBank Digital · Sprint 8)", ["Giờ", "Hoạt động", "Bạn làm gì"], [
  ["08:45", "Xem Slack & Jira", "Đọc thông báo build mới, xem ticket được giao"],
  ["09:00", "Daily standup (15')", "Báo cáo hôm qua/hôm nay/vướng mắc"],
  ["09:15–11:30", "Viết & chạy ca kiểm thử", "Test module 'Chuyển tiền nhanh 24/7' trên staging"],
  ["11:30–13:30", "Ăn trưa & nghỉ", "—"],
  ["13:30–15:30", "Test vòng 2 + ghi lỗi", "Retest bug đã Fixed, log lỗi mới nếu có"],
  ["15:30–16:00", "Họp nhanh Dev/BA", "Làm rõ yêu cầu, xác nhận mức độ lỗi"],
  ["16:00", "Build mới lên staging", "Chuẩn bị kế hoạch test cho ngày mai"],
], { accent: "#2563eb" });

// ── Mockup 3: luồng phối hợp giữa các vai trò trong đội ──
const m_roles = moduleFlow("Ai làm gì trong một tính năng (SolarBank Digital)", [
  { id: "ba", label: "BA", x: 90, y: 60, sub: "viết yêu cầu" },
  { id: "dev", label: "Dev", x: 270, y: 60, sub: "code tính năng" },
  { id: "qa", label: "Tester (bạn)", x: 470, y: 60, sub: "kiểm thử" },
  { id: "po", label: "PO", x: 660, y: 60, sub: "duyệt phát hành" },
], [
  { from: "ba", to: "dev", label: "yêu cầu" },
  { from: "dev", to: "qa", label: "bản build" },
  { from: "qa", to: "po", label: "kết quả test" },
  { from: "po", to: "dev", label: "yêu cầu sửa", bad: true },
]);

// ── Mockup 4: bảng công cụ dùng mỗi ngày ──
const m_tools = grid("Công cụ bạn dùng mỗi ngày (SolarBank Digital)", ["Công cụ", "Dùng để làm gì", "Khi nào dùng"], [
  ["Jira", "Quản lý ticket, theo dõi lỗi và công việc", "Suốt ngày"],
  ["TestRail / Xray", "Lưu ca kiểm thử, đánh dấu Pass/Fail", "Khi chạy test"],
  ["Postman", "Gọi thử API chuyển tiền, kiểm tra response", "Test tầng API"],
  ["Slack", "Trao đổi nhanh với Dev/BA/PO", "Khi cần hỏi gấp"],
  ["Confluence", "Đọc tài liệu yêu cầu, thiết kế màn hình", "Trước khi viết test case"],
], { accent: "#16a34a" });

// ── Mockup 5: bảng kanban việc test trong sprint ──
const m_kanban = kanban("Bảng việc test · Sprint 8 (SolarBank Digital)", [
  { name: "To Do", cards: [
    { key: "SB-2201", title: "Test chuyển tiền vượt hạn mức", sev: "High" },
  ] },
  { name: "In Progress", cards: [
    { key: "SB-2195", title: "Test upload ảnh CCCD khi đăng ký", sev: "Medium" },
  ] },
  { name: "Review", cards: [
    { key: "SB-2188", title: "Retest lỗi mã OTP hết hạn", sev: "High" },
  ] },
  { name: "Done", cards: [
    { key: "SB-2170", title: "Test đăng nhập bằng vân tay", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard tình hình test cuối sprint ──
const m_dashSprint = dashboard("Tình hình test — Sprint 8 (ngày 08/10)", [
  { label: "Tổng ca test", value: "120", sub: "kế hoạch sprint", color: "#2563eb" },
  { label: "Đã chạy", value: "96", sub: "80%", color: "#0ea5e9" },
  { label: "Đạt (Pass)", value: "84", sub: "87.5%", color: "#16a34a" },
  { label: "Lỗi đang mở", value: "6", sub: "2 High", color: "#e11d48" },
]);

// ── Mockup 7: ticket Jira của lỗi phát hiện cận deadline sprint ──
const m_jira = jira({
  key: "SB-2201", title: "Chuyển tiền nhanh 24/7 bị treo khi vượt hạn mức ngày 500 triệu",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · app SolarBank Digital · Android 14"],
    ["Các bước", "1) Chuyển 550 triệu (đã vượt hạn mức 500tr/ngày) 2) Bấm Xác nhận"],
    ["Kết quả thực tế", "App treo màn hình xoay vòng, không có thông báo lỗi"],
    ["Kết quả mong đợi", "Hiện thông báo 'Vượt hạn mức chuyển tiền trong ngày'"],
    ["Bằng chứng", "video-sb2201.mp4, log-app.txt"],
  ],
});

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Người mới vào công ty làm Tester cần chuẩn bị gì trước ngày đầu tiên?",
  "What should a new Tester prepare before their first day at a company?",
  "Bạn không cần biết hết mọi thứ trước. Điều nên chuẩn bị là: tinh thần hỏi khi chưa rõ, thói quen ghi chép cẩn thận, và làm quen dần với khái niệm sprint, ticket, test case. Ngày đầu công ty sẽ hướng dẫn cài công cụ (Jira, TestRail…) và giới thiệu sản phẩm — bạn chỉ cần chủ động quan sát và ghi chú lại quy trình thực tế của đội mình.",
  "You don't need to know everything beforehand. What helps is: the habit of asking when something is unclear, careful note-taking, and getting familiar with concepts like sprint, ticket, and test case. On day one the company will guide you through tool setup (Jira, TestRail...) and product intro — you just need to actively observe and note your team's real workflow.",
  "新人テスターは入社初日前に何を準備すべき？",
  "全てを事前に知る必要はありません。大切なのは、分からない時に質問する姿勢、丁寧にメモを取る習慣、そしてスプリント・チケット・テストケースといった概念に少しずつ慣れることです。初日は会社がツール（Jira、TestRailなど）の設定と製品紹介をしてくれます。あなたは積極的にチームの実際の流れを観察しメモするだけで十分です。");
const faq2 = FAQ(
  "Sprint là gì và Tester làm gì trong một sprint?",
  "What is a sprint, and what does a Tester do during one?",
  "Sprint là một khoảng thời gian ngắn, cố định (thường 1-2 tuần) mà cả đội cam kết hoàn thành một lượng công việc đã chọn. Trong sprint, Tester viết ca kiểm thử cho tính năng mới, chạy test trên bản build, ghi và theo dõi lỗi, tham gia daily standup, và kiểm lại các lỗi đã sửa trước khi sprint kết thúc.",
  "A sprint is a short, fixed period (usually 1-2 weeks) during which the whole team commits to finishing a chosen amount of work. During a sprint, a Tester writes test cases for new features, runs tests on the build, logs and tracks bugs, joins daily standups, and retests fixed bugs before the sprint ends.",
  "スプリントとは？その間テスターは何をする？",
  "スプリントとは、チーム全体が選んだ作業量の完了を約束する、短く固定された期間（通常1〜2週間）です。スプリント中、テスターは新機能のテストケースを書き、ビルドでテストを実行し、バグを記録・追跡し、デイリースタンドアップに参加し、スプリント終了前に修正済みバグを再テストします。");
const faq3 = FAQ(
  "Nếu chưa quen công cụ như Jira, TestRail thì có làm được việc không?",
  "Can I still work well if I'm not yet familiar with tools like Jira or TestRail?",
  "Hoàn toàn được. Các công cụ chỉ là nơi lưu và hiển thị công việc — bản chất công việc (đọc yêu cầu, nghĩ ca kiểm thử, ghi lỗi rõ ràng) mới là kỹ năng cốt lõi. Hầu hết công ty đều hướng dẫn công cụ trong tuần đầu, và bạn sẽ quen tay chỉ sau vài ngày dùng thật. Đừng để nỗi lo về công cụ cản bạn tập trung vào tư duy kiểm thử.",
  "Absolutely. Tools are just where work gets stored and displayed — the real skill is the substance of the work (reading requirements, designing test cases, logging clear bugs). Most companies walk you through tools in the first week, and you'll get comfortable after just a few days of real use. Don't let tool anxiety distract you from focusing on testing thinking.",
  "Jira・TestRailなどに慣れていなくても仕事はできる？",
  "全く問題ありません。ツールは作業を保存・表示する場所にすぎず、本質的なスキルは要件を読み、テストケースを考え、明確にバグを記録することです。ほとんどの会社は最初の週にツールを案内してくれ、数日実際に使えば慣れます。ツールへの不安でテスト思考への集中を妨げないようにしましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Sprint là gì trong quy trình Agile mà nhiều công ty tester áp dụng?", en: "What is a sprint in the Agile process many testing companies use?", ja: "多くのテスト会社が採用するアジャイルにおける『スプリント』とは？" },
    options: [
      { vi: "Một cuộc họp duy nhất vào đầu tháng", en: "A single meeting at the start of the month", ja: "月初の1回だけの会議" },
      { vi: "Một khoảng thời gian ngắn, cố định (thường 1-2 tuần) để đội hoàn thành lượng việc đã cam kết", en: "A short, fixed period (usually 1-2 weeks) for the team to complete committed work", ja: "チームが約束した作業量を完了する短く固定された期間（通常1〜2週間）" },
      { vi: "Tên gọi khác của việc phát hành sản phẩm", en: "Another name for releasing the product", ja: "製品リリースの別名" },
      { vi: "Một loại tài liệu yêu cầu", en: "A type of requirement document", ja: "要件ドキュメントの一種" },
    ], correct: 1,
    explain: { vi: "Sprint là khung thời gian ngắn, lặp lại, giúp đội chia nhỏ công việc lớn thành các đợt có thể kiểm soát và đánh giá.", en: "A sprint is a short, repeating timebox that helps the team break big work into manageable, reviewable chunks.", ja: "スプリントは短く繰り返される期間で、大きな作業を管理・評価しやすい単位に分割するのに役立ちます。" },
  }),
  mcq({
    q: { vi: "Trong buổi daily standup, Tester nên báo cáo điều gì?", en: "In a daily standup, what should a Tester report?", ja: "デイリースタンドアップでテスターは何を報告すべき？" },
    options: [
      { vi: "Toàn bộ dòng code của Dev viết hôm qua", en: "All the code the Dev wrote yesterday", ja: "昨日開発者が書いた全コード" },
      { vi: "Việc hôm qua đã làm, việc hôm nay sẽ làm, và vướng mắc đang gặp", en: "What was done yesterday, what will be done today, and any blockers", ja: "昨日やったこと、今日やること、直面している障害" },
      { vi: "Mức lương và thưởng cá nhân", en: "Personal salary and bonus", ja: "個人の給料とボーナス" },
      { vi: "Lịch nghỉ phép của cả năm", en: "The whole year's leave schedule", ja: "1年分の休暇スケジュール" },
    ], correct: 1,
    explain: { vi: "Standup ngắn gọn, tập trung 3 điều: hôm qua, hôm nay, vướng mắc — để cả đội đồng bộ nhanh mỗi sáng.", en: "Standups are brief and focus on 3 things: yesterday, today, blockers — so the whole team syncs quickly each morning.", ja: "スタンドアップは簡潔で、昨日・今日・障害の3点に集中し、毎朝チーム全体を素早く同期させます。" },
  }),
  mcq({
    q: { vi: "Bạn phát hiện một lỗi nghiêm trọng vào ngày cuối cùng của sprint. Việc đầu tiên nên làm là gì?", en: "You find a serious bug on the last day of the sprint. What's the first thing to do?", ja: "スプリント最終日に重大なバグを発見。まず何をすべき？" },
    options: [
      { vi: "Giữ im lặng, để sprint sau xử lý", en: "Stay silent and let the next sprint handle it", ja: "黙って次のスプリントに任せる" },
      { vi: "Ghi ticket đầy đủ ngay và báo cho Dev/PO để cùng quyết định hướng xử lý", en: "Log a complete ticket immediately and notify Dev/PO so you can decide together how to handle it", ja: "すぐに完全なチケットを起票し、Dev/POに報告して対応方針を一緒に決める" },
      { vi: "Tự ý sửa code của Dev", en: "Modify the developer's code yourself", ja: "自分で開発者のコードを勝手に修正する" },
      { vi: "Xoá ticket cho đỡ rắc rối", en: "Delete the ticket to avoid trouble", ja: "面倒なのでチケットを削除する" },
    ], correct: 1,
    explain: { vi: "Lỗi nghiêm trọng cần được ghi nhận minh bạch và báo ngay — cả đội (Dev/PO) sẽ cùng quyết định có trì hoãn phát hành hay không.", en: "Serious bugs need transparent logging and immediate reporting — the team (Dev/PO) decides together whether to delay the release.", ja: "重大なバグは透明に記録し即座に報告する必要があります — リリースを延期するかはDev/POと一緒に決めます。" },
  }),
  mcq({
    q: { vi: "Ai là người thường viết yêu cầu (requirement) để Tester dựa vào đó thiết kế ca kiểm thử?", en: "Who usually writes the requirements a Tester uses to design test cases?", ja: "テスターがテストケース設計の基にする要件を、通常誰が書く？" },
    options: [
      { vi: "Business Analyst (BA)", en: "The Business Analyst (BA)", ja: "ビジネスアナリスト（BA）" },
      { vi: "Bảo vệ công ty", en: "The company security guard", ja: "会社の警備員" },
      { vi: "Một khách hàng bất kỳ đi ngang qua", en: "A random passing customer", ja: "たまたま通りかかった顧客" },
      { vi: "Không ai cả, Tester tự nghĩ ra mọi thứ", en: "No one — the Tester makes everything up", ja: "誰も書かない、テスターが全て考える" },
    ], correct: 0,
    explain: { vi: "BA phân tích nghiệp vụ và viết tài liệu yêu cầu (user story, đặc tả). Tester đọc tài liệu đó để thiết kế ca kiểm thử phù hợp.", en: "The BA analyzes the business and writes requirement docs (user stories, specs). The Tester reads them to design matching test cases.", ja: "BAは業務を分析し要件書（ユーザーストーリー・仕様）を書きます。テスターはそれを読み適切なテストケースを設計します。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bức tranh toàn cảnh", en: "1. TL;DR & the big picture", ja: "1. 要点と全体像" },
    blocks: [
      TLDR("Quy trình test ở công ty không chỉ là 'ngồi bấm nút tìm lỗi'. Bạn làm việc theo từng đợt ngắn gọi là sprint, phối hợp với BA (viết yêu cầu), Dev (viết code) và PO (duyệt phát hành). Một ngày của bạn thường có: standup buổi sáng, viết/chạy ca kiểm thử, ghi và theo dõi lỗi, và họp nhanh khi cần làm rõ. Bài này đi theo app ngân hàng số SolarBank Digital để bạn hình dung rõ ràng, có hình minh hoạ và trắc nghiệm cuối bài.",
        "The testing process at a company isn't just 'clicking around to find bugs'. You work in short cycles called sprints, coordinating with BA (writes requirements), Dev (writes code) and PO (approves releases). A typical day includes: morning standup, writing/running test cases, logging and tracking bugs, and quick meetings when clarification is needed. This article follows the SolarBank Digital app so you can picture it clearly, with visuals and a quiz at the end.",
        "会社でのテストプロセスは単に『ボタンを押してバグを探す』だけではありません。スプリントと呼ばれる短いサイクルで作業し、BA（要件作成）、開発者（コード作成）、PO（リリース承認）と連携します。典型的な1日は：朝のスタンドアップ、テストケースの作成・実行、バグの記録と追跡、必要に応じた素早い打ち合わせです。本記事はデジタル銀行アプリSolarBank Digitalに沿って進み、図解と最後にクイズがあります。"),
      P("Chào bạn mới! Rất nhiều người khi mới đi làm hình dung Tester chỉ ngồi một mình bấm thử app. Thực tế thú vị hơn nhiều: bạn là một mắt xích trong cả một đội — nơi mọi người phối hợp theo nhịp sprint để đưa tính năng mới tới tay người dùng an toàn. Ở công ty SolarBank Digital (ứng dụng ngân hàng số), đội của bạn đang làm tính năng 'Chuyển tiền nhanh 24/7' — chúng ta sẽ đi theo đúng tính năng này xuyên suốt bài viết.",
        "Hi, newcomer! Many people starting out picture a Tester sitting alone clicking around an app. The reality is much more interesting: you're one link in a whole team — where everyone moves to the rhythm of sprints to bring new features to users safely. At SolarBank Digital (a digital banking app), your team is working on the 'Instant Transfer 24/7' feature — we'll follow this exact feature throughout the article.",
        "こんにちは、初心者さん！多くの新人はテスターを一人でアプリをクリックするだけの仕事だと想像します。実際はもっと面白いものです：あなたはチーム全体の一部であり、皆がスプリントのリズムに合わせて動き、新機能を安全にユーザーへ届けます。SolarBank Digital（デジタル銀行アプリ）では、あなたのチームは『24時間即時送金』機能に取り組んでいます — この記事全体を通してこの機能を追っていきます。"),
      IMG(m_dashDay, "Tổng quan nhanh: standup, số ca test chạy, bug mới, giờ lên staging trong một ngày", "Quick overview: standup, test cases run, new bugs, staging deploy time in one day", "1日の概要：スタンドアップ、実行テスト数、新規バグ、ステージング反映時刻"),
      DEF("Sprint", "một khoảng thời gian ngắn, cố định (thường 1-2 tuần) mà cả đội cam kết hoàn thành một lượng công việc đã chọn từ backlog.",
        "sprint — a short, fixed period (usually 1-2 weeks) during which the team commits to completing a chosen amount of backlog work.",
        "スプリント — チームがバックログから選んだ作業量の完了を約束する、短く固定された期間（通常1〜2週間）。"),
    ] },
  { heading: { vi: "2. Một ngày làm Tester diễn ra thế nào", en: "2. What a Tester's day looks like", ja: "2. テスターの1日はどう進む？" },
    blocks: [
      P("Hãy cùng đi qua một ngày thật ở SolarBank Digital, sprint 8. Ngày của bạn không cố định từng phút, nhưng luôn xoay quanh vài mốc quen thuộc: kiểm tra thông báo, họp ngắn đầu ngày, tập trung viết/chạy test, và cập nhật lại vào cuối ngày.",
        "Let's walk through a real day at SolarBank Digital, sprint 8. Your day isn't fixed to the minute, but it always revolves around a few familiar milestones: checking notifications, a short morning meeting, focused test writing/running, and an end-of-day update.",
        "SolarBank Digitalのスプリント8での実際の1日を見てみましょう。分刻みで決まっているわけではありませんが、いくつかの馴染みの節目を中心に回ります：通知の確認、朝の短い打ち合わせ、集中したテスト作成・実行、そして1日の終わりの更新です。"),
      STEP(1, "Mở Slack/Jira đầu giờ: xem có build mới, ticket mới được giao, hay ai đó nhắc cần bạn xác nhận gì không.", "Open Slack/Jira first thing: check for a new build, newly assigned tickets, or anything needing your confirmation.", "始業時にSlack/Jiraを開く：新しいビルド、割り当てられたチケット、確認が必要な連絡がないか確認。"),
      STEP(2, "Tham gia daily standup 15 phút: nói ngắn gọn hôm qua đã làm gì, hôm nay định làm gì, đang vướng gì.", "Join the 15-minute daily standup: briefly share what you did yesterday, plan for today, and any blockers.", "15分のデイリースタンドアップに参加：昨日やったこと、今日の予定、抱えている障害を簡潔に共有。"),
      STEP(3, "Buổi sáng: tập trung viết ca kiểm thử mới hoặc chạy test trên bản build mới nhất.", "Morning: focus on writing new test cases or running tests on the latest build.", "午前：新しいテストケースの作成、または最新ビルドでのテスト実行に集中。"),
      STEP(4, "Buổi chiều: retest các lỗi Dev báo đã sửa, ghi lỗi mới nếu phát hiện, và cập nhật trạng thái ticket.", "Afternoon: retest bugs the developer marked fixed, log new bugs if found, and update ticket status.", "午後：開発者が修正済みと報告したバグを再テストし、新しいバグがあれば記録し、チケットの状態を更新。"),
      IMG(m_schedule, "Lịch một ngày làm việc mẫu của Tester tại SolarBank Digital", "A sample daily schedule for a Tester at SolarBank Digital", "SolarBank Digitalでのテスターの1日のスケジュール例"),
      DEF("Daily standup", "cuộc họp ngắn (thường 15 phút) mỗi sáng, nơi mỗi thành viên trả lời 3 câu: hôm qua làm gì, hôm nay làm gì, đang vướng gì.",
        "daily standup — a short (usually 15-minute) morning meeting where each member answers 3 questions: what they did yesterday, what they'll do today, and any blockers.",
        "デイリースタンドアップ — 毎朝の短い（通常15分）会議で、各メンバーが3つの質問（昨日やったこと、今日やること、障害）に答える。"),
      TIP("Ngày mới đi làm, đừng ngại ghi chú lại quy trình thực tế của đội bạn — mỗi công ty có thể đặt tên/giờ giấc khác nhau, nhưng ý tưởng cốt lõi là giống nhau.", "On your first days, don't hesitate to note down your team's actual workflow — every company may name things or time things differently, but the core idea is the same.", "入社したての頃は、チームの実際の流れをメモすることをためらわないでください — 会社ごとに名称や時間は違っても、核となる考え方は同じです。"),
    ] },
  { heading: { vi: "3. Ai làm gì: vai trò trong đội", en: "3. Who does what: roles on the team", ja: "3. 誰が何をする：チーム内の役割" },
    blocks: [
      P("Một tính năng như 'Chuyển tiền nhanh 24/7' không phải do một mình bạn hay một mình Dev làm ra. Nó đi qua nhiều bàn tay, mỗi người một vai trò rõ ràng. Hiểu đúng vai trò giúp bạn biết nên hỏi ai khi gặp vướng mắc.",
        "A feature like 'Instant Transfer 24/7' isn't built by you or the Dev alone. It passes through many hands, each with a clear role. Understanding roles correctly helps you know who to ask when you hit a blocker.",
        "『24時間即時送金』のような機能は、あなたや開発者一人で作るものではありません。多くの人の手を経て、それぞれ明確な役割を持ちます。役割を正しく理解すれば、困った時に誰に聞けばよいか分かります。"),
      UL(
        ["BA (Business Analyst): phân tích nghiệp vụ, viết tài liệu yêu cầu (user story) — bạn dựa vào đây để thiết kế ca kiểm thử.",
         "Dev (lập trình viên): viết code hiện thực tính năng theo yêu cầu, sửa lỗi bạn báo cáo.",
         "Tester/QA (bạn): thiết kế và chạy ca kiểm thử, tìm lỗi, ghi ticket rõ ràng, kiểm lại sau khi sửa.",
         "PO (Product Owner): quyết định thứ tự ưu tiên tính năng, duyệt phát hành cuối cùng.",
         "Scrum Master: điều phối nhịp sprint, gỡ vướng cho cả đội (không phải quản lý bạn)."],
        ["BA (Business Analyst): analyzes the business and writes requirement docs (user stories) — you base your test design on these.",
         "Dev (developer): writes the code implementing the feature per requirements, fixes bugs you report.",
         "Tester/QA (you): design and run test cases, find bugs, log them clearly, retest after fixes.",
         "PO (Product Owner): decides feature priority, gives final release approval.",
         "Scrum Master: keeps the sprint rhythm and removes blockers for the team (not your manager)."],
        ["BA（ビジネスアナリスト）：業務を分析し要件書（ユーザーストーリー）を作成 — あなたはこれを基にテストを設計。",
         "Dev（開発者）：要件に沿って機能を実装するコードを書き、報告されたバグを修正。",
         "Tester/QA（あなた）：テストケースを設計・実行し、バグを見つけ、明確に記録し、修正後に再テスト。",
         "PO（プロダクトオーナー）：機能の優先順位を決め、最終的なリリースを承認。",
         "スクラムマスター：スプリントのリズムを整え、チームの障害を取り除く（あなたの上司ではない）。"]),
      IMG(m_roles, "Luồng phối hợp: BA viết yêu cầu → Dev code → Tester kiểm thử → PO duyệt (và phản hồi ngược lại Dev nếu cần sửa)", "Coordination flow: BA writes requirements → Dev codes → Tester tests → PO approves (feeding back to Dev if fixes are needed)", "連携の流れ：BAが要件作成→開発者がコード→テスターがテスト→POが承認（修正が必要な場合は開発者へフィードバック）"),
      P("Bạn sẽ nhận thấy Tester đứng ở vị trí đặc biệt: nhận bản build từ Dev, đối chiếu với yêu cầu của BA, và là người báo cho PO biết chất lượng thực sự trước khi phát hành. Vai trò này quan trọng hơn nhiều so với hình dung ban đầu của không ít người mới.",
        "You'll notice the Tester sits in a special position: receiving builds from Dev, cross-checking against BA's requirements, and being the one who tells the PO the real quality before release. This role matters much more than many beginners initially imagine.",
        "テスターは特別な立場にあることに気づくでしょう：開発者からビルドを受け取り、BAの要件と照合し、リリース前に実際の品質をPOに伝える人です。この役割は、多くの初心者が最初に想像するよりずっと重要です。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ bạn sẽ dùng mỗi ngày", en: "4. Prepare: tools you'll use every day", ja: "4. 準備：毎日使うツール" },
    blocks: [
      P("Trước khi đi sâu vào thực hành, hãy làm quen với vài công cụ phổ biến. Bạn không cần thành thạo ngay — chỉ cần biết công cụ nào dùng để làm gì.",
        "Before diving into practice, let's get familiar with a few common tools. You don't need to master them right away — just know what each one is for.",
        "実践に入る前に、いくつかの一般的なツールに慣れましょう。すぐに使いこなす必要はなく、それぞれが何のためのものか知るだけで十分です。"),
      STEP(1, "Mở Jira (hoặc công cụ quản lý ticket của đội) — đây là nơi mọi công việc, lỗi được ghi nhận và theo dõi.", "Open Jira (or your team's ticket-tracking tool) — this is where all work and bugs are logged and tracked.", "Jira（またはチームのチケット管理ツール）を開く — ここで全ての作業とバグが記録・追跡される。"),
      STEP(2, "Mở TestRail/Xray (hoặc Excel nếu đội nhỏ) — nơi lưu các ca kiểm thử và kết quả Pass/Fail.", "Open TestRail/Xray (or Excel for a small team) — where test cases and Pass/Fail results are stored.", "TestRail/Xray（小規模チームならExcel）を開く — テストケースとPass/Fail結果を保存する場所。"),
      STEP(3, "Cài Postman nếu đội có test API — bạn sẽ dùng nó để gọi thử các API như chuyển tiền, tra cứu số dư.", "Install Postman if your team tests APIs — you'll use it to try calls like transfer or balance inquiry.", "APIテストがあればPostmanをインストール — 送金や残高照会などのAPI呼び出しに使用。"),
      TRY("Mở thử một công cụ quản lý ticket bất kỳ (Jira/Trello) và tìm xem có bao nhiêu việc đang 'To Do' của riêng bạn.", "Open any ticket-tracking tool (Jira/Trello) and see how many tasks are in 'To Do' assigned to you.", "任意のチケット管理ツール（Jira/Trello）を開き、自分の『To Do』が何件あるか見てみよう。"),
      PITFALL("Nghĩ rằng phải thành thạo mọi công cụ trước khi bắt đầu làm việc. Thực ra bạn học công cụ nhanh nhất khi dùng nó cho việc thật — đừng trì hoãn công việc chỉ vì chưa quen giao diện.", "Thinking you must master every tool before starting work. You actually learn tools fastest by using them on real work — don't delay tasks just because the interface feels unfamiliar.", "全ツールを使いこなしてから仕事を始めるべきと思うこと。実際は本物の仕事で使う時が一番早く学べます — 画面に慣れていないという理由だけで作業を遅らせないで。"),
      IMG(m_tools, "Bảng công cụ phổ biến bạn sẽ dùng mỗi ngày và mục đích của từng công cụ", "A table of common tools you'll use daily and what each is for", "毎日使う一般的なツールとその目的の表"),
    ] },
  { heading: { vi: "5. Từ yêu cầu tới ca kiểm thử: thực hành từng bước", en: "5. From requirement to test case: hands-on steps", ja: "5. 要件からテストケースへ：実践ステップ" },
    blocks: [
      P("Giờ ta thực hành đúng quy trình thật với tính năng 'Chuyển tiền nhanh 24/7' của SolarBank Digital. BA vừa gửi yêu cầu, và bạn cần biến nó thành các ca kiểm thử cụ thể trước khi Dev bàn giao bản build.",
        "Now let's practice the real process with SolarBank Digital's 'Instant Transfer 24/7' feature. BA just sent the requirement, and you need to turn it into concrete test cases before Dev hands off a build.",
        "SolarBank Digitalの『24時間即時送金』機能で実際のプロセスを実践しましょう。BAが要件を送ってきたところで、開発者がビルドを渡す前に、それを具体的なテストケースに変える必要があります。"),
      STEP(1, "Đọc yêu cầu của BA: 'Khách hàng chuyển tiền tức thời tới ngân hàng khác, tối đa 500 triệu đồng/ngày, có xác thực OTP.'", "Read BA's requirement: 'Customer transfers instantly to another bank, max 500 million VND/day, with OTP verification.'", "BAの要件を読む：『顧客は他行へ即時送金、1日最大5億ドン、OTP認証あり』。"),
      STEP(2, "Liệt kê các trường hợp cần test: đúng hạn mức, đúng bằng hạn mức, vượt hạn mức, OTP sai, OTP hết hạn, mất mạng giữa chừng.", "List cases to test: within limit, exactly at limit, over limit, wrong OTP, expired OTP, network drop mid-transaction.", "テストすべきケースをリスト化：限度内、限度ちょうど、限度超過、OTP誤り、OTP期限切れ、途中でのネットワーク切断。"),
      STEP(3, "Viết ca kiểm thử rõ ràng: bước thực hiện, dữ liệu vào, kết quả mong đợi — để ai đọc cũng làm theo được.", "Write clear test cases: steps, input data, expected result — so anyone reading can follow along.", "明確なテストケースを書く：手順、入力データ、期待結果 — 誰が読んでも実行できるように。"),
      STEP(4, "Chạy test trên bản build Dev vừa bàn giao, ghi kết quả Pass/Fail vào TestRail/Xray.", "Run tests on the build Dev just handed off, record Pass/Fail results in TestRail/Xray.", "開発者から渡されたビルドでテストを実行し、TestRail/XrayにPass/Fail結果を記録。"),
      CODE("text", "CA KIỂM THỬ: TC-SB2201-03\nTiêu đề: Chuyển tiền vượt hạn mức ngày phải bị chặn kèm thông báo rõ ràng\nDữ liệu: Số dư 800.000.000đ, đã chuyển 480.000.000đ trong ngày, chuyển thêm 50.000.000đ\nBước:\n 1) Đăng nhập app SolarBank Digital\n 2) Vào 'Chuyển tiền nhanh 24/7', nhập 50.000.000đ tới TK ngân hàng khác\n 3) Bấm Xác nhận\nKết quả mong đợi: Hệ thống từ chối, hiện 'Vượt hạn mức chuyển tiền trong ngày (500.000.000đ)', không trừ tiền."),
      TRY("Thử viết thêm 1 ca kiểm thử cho trường hợp 'nhập đúng bằng hạn mức còn lại' (gợi ý: 500tr - 480tr = 20tr).", "Try writing one more test case for 'entering exactly the remaining limit' (hint: 500m - 480m = 20m).", "『残りの限度額ちょうどを入力』のケースをもう1つ書いてみよう（ヒント：5億-4.8億=2000万）。"),
    ] },
  { heading: { vi: "6. Theo dõi tiến độ trên bảng & báo cáo", en: "6. Tracking progress on the board & reporting", ja: "6. ボードでの進捗追跡と報告" },
    blocks: [
      P("Cả đội thường nhìn một bảng kanban để biết tình hình test. Mỗi cột là một trạng thái, mỗi thẻ là một việc test hoặc một lỗi. Là tester, bạn giữ cho các thẻ của mình luôn đúng cột và có đủ thông tin để người khác không phải hỏi lại.",
        "The whole team usually looks at a kanban board to see the testing situation. Each column is a status, each card is a test task or a bug. As a tester, you keep your cards in the right column with enough info that others don't need to ask again.",
        "チームは通常かんばんボードでテスト状況を把握します。各列は状態、各カードはテストタスクやバグです。テスターとして、自分のカードを正しい列に十分な情報付きで保ち、他人が聞き直す必要がないようにします。"),
      IMG(m_kanban, "Bảng kanban việc test trong sprint: mỗi cột một trạng thái, mỗi thẻ một việc/lỗi", "A kanban board of testing tasks in a sprint: one column per status, one card per task/bug", "スプリント内のテスト作業のかんばんボード：1列1状態、1カード1タスク/バグ"),
      P("Gần cuối sprint, cả đội cần biết nhanh: bao nhiêu ca đã chạy, tỉ lệ đạt bao nhiêu, còn bao nhiêu lỗi đang mở. Một dashboard đơn giản giúp mọi người — kể cả PO không rành kỹ thuật — nắm được chất lượng hiện tại chỉ trong vài giây.",
        "Near the end of a sprint, the whole team needs a quick view: how many cases ran, what the pass rate is, how many bugs remain open. A simple dashboard helps everyone — even a non-technical PO — grasp current quality in seconds.",
        "スプリント終盤には、チーム全体が素早く把握する必要があります：何件のケースを実行したか、合格率はどれくらいか、未解決のバグはいくつか。シンプルなダッシュボードがあれば、技術に詳しくないPOでも数秒で現在の品質を把握できます。"),
      IMG(m_dashSprint, "Dashboard tình hình test cuối sprint: tổng ca, đã chạy, tỉ lệ đạt, lỗi đang mở", "End-of-sprint testing dashboard: total cases, run, pass rate, open bugs", "スプリント終盤のテストダッシュボード：総ケース数、実行済み、合格率、未解決バグ"),
      TIP("Đừng chờ tới cuối ngày mới cập nhật trạng thái thẻ — cập nhật ngay sau mỗi hành động để bảng luôn phản ánh đúng thực tế cho cả đội.", "Don't wait until end of day to update card status — update right after each action so the board always reflects reality for the whole team.", "1日の終わりまでカードの状態更新を待たない — 各行動の直後に更新し、ボードが常にチーム全体の実態を反映するようにする。"),
    ] },
  { heading: { vi: "7. Tình huống 1: gấp deadline, lỗi phát hiện trễ cuối sprint", en: "7. Situation 1: tight deadline, a bug found late in the sprint", ja: "7. シーン1：締切間近、スプリント終盤でのバグ発見" },
    blocks: [
      SITUATION("Hôm nay là ngày cuối sprint 8, chuẩn bị release lúc 16:00. Bạn phát hiện lỗi treo app khi chuyển tiền vượt hạn mức ngày.", "Today is the last day of sprint 8, release is at 16:00. You find the app hangs when transferring over the daily limit.",
        "Lỗi nghiêm trọng (app treo, không thông báo) nhưng chỉ xảy ra ở một điều kiện hẹp (vượt đúng hạn mức 500 triệu). Team đang chịu áp lực deadline, một số người muốn 'bỏ qua, release trước, sửa sau'.",
        "The bug is serious (app hangs, no message) but only happens under a narrow condition (exactly over the 500-million limit). The team is under deadline pressure, and some want to 'skip it, release now, fix later'.",
        "今日はスプリント8最終日、16時にリリース予定。日次限度額を超える送金でアプリがフリーズするバグを発見。",
        "重大なバグ（アプリがフリーズ、通知なし）だが、狭い条件（ちょうど5億超え）でのみ発生。チームは締切のプレッシャーの中、一部は『無視してリリースし後で直そう』と考えている。"),
      SOLVE("Ghi ticket đầy đủ NGAY với mức độ nghiêm trọng đúng thực tế (High/Critical), kèm bằng chứng rõ ràng, rồi báo trực tiếp cho Dev và PO để cả đội cùng quyết định — không tự ý bỏ qua, cũng không tự ý chặn release một mình.", "Log a complete ticket IMMEDIATELY with an honest severity (High/Critical), clear evidence, then report directly to Dev and PO so the team decides together — don't unilaterally skip it, and don't unilaterally block the release alone.", "正確な深刻度（High/Critical）と明確な証拠付きで即座に完全なチケットを起票し、開発者とPOに直接報告してチームで一緒に決める — 独断で無視も、独断でリリースを止めることもしない。"),
      P("Đây là bài học quan trọng cho người mới: việc của bạn không phải là 'quyết định có release hay không' — đó là việc của PO. Việc của bạn là báo cáo trung thực và kịp thời, kèm đủ dữ liệu để người ra quyết định (PO, Dev lead) chọn phương án đúng: hoãn release, release kèm cảnh báo, hay tắt tạm tính năng đó.",
        "This is an important lesson for beginners: your job isn't to 'decide whether to release' — that's the PO's job. Your job is to report honestly and promptly, with enough data for decision-makers (PO, Dev lead) to choose the right option: delay the release, release with a warning, or temporarily disable that feature.",
        "初心者への重要な教訓：あなたの仕事は『リリースするかどうかを決める』ことではありません — それはPOの仕事です。あなたの仕事は、正直かつ迅速に報告し、意思決定者（PO、開発リード）が正しい選択（リリース延期、警告付きリリース、その機能の一時無効化）をできるだけの十分なデータを提供することです。"),
      IMG(m_jira, "Ticket lỗi phát hiện cuối sprint: đủ bước, môi trường, kết quả mong đợi và bằng chứng", "The end-of-sprint bug ticket: full steps, environment, expected result and evidence", "スプリント終盤のバグチケット：完全な手順・環境・期待結果・証拠"),
      RECAP(["Việc của bạn là báo cáo trung thực & kịp thời, không phải tự quyết định release", "Ghi mức độ nghiêm trọng đúng thực tế, kèm bằng chứng rõ ràng để đội quyết định nhanh"],
        ["Your job is honest, timely reporting — not deciding on release yourself", "Log the true severity with clear evidence so the team can decide quickly"],
        ["あなたの仕事は正直で迅速な報告、リリースの決定ではない", "実際の深刻度を明確な証拠付きで記録し、チームが素早く決められるように"]),
    ] },
  { heading: { vi: "8. Tình huống 2: bất đồng với Dev về mức độ nghiêm trọng", en: "8. Situation 2: disagreeing with Dev about bug severity", ja: "8. シーン2：バグの深刻度で開発者と意見が合わない" },
    blocks: [
      SITUATION("Bạn báo lỗi 'số dư hiển thị sai 1 giây sau khi chuyển tiền' là High, nhưng Dev nói đó chỉ là Low vì 'tự động đúng lại sau khi tải lại trang'.", "You report 'balance shows wrong for 1 second after transfer' as High, but Dev says it's only Low because 'it auto-corrects after reloading the page'.",
        "Với app ngân hàng, sai số dù chỉ 1 giây cũng có thể khiến khách hàng hoang mang, chụp màn hình phàn nàn, hoặc thao tác nhầm (chuyển tiền lần 2 vì tưởng lần 1 chưa thành công). Bạn và Dev nhìn nhận rủi ro khác nhau.",
        "For a banking app, even a 1-second wrong number can confuse customers, lead to screenshots and complaints, or cause a mistaken action (transferring again, thinking the first attempt failed). You and Dev see the risk differently.",
        "『送金後1秒間、残高が誤表示される』バグをHighと報告したが、開発者は『ページを再読み込みすれば自動的に直る』のでLowだと言う。",
        "銀行アプリでは、たとえ1秒でも誤った数字が顧客を混乱させ、スクリーンショットでの苦情や誤操作（1回目が失敗したと思い再送金）を招く可能性がある。あなたと開発者はリスクの見方が異なる。"),
      SOLVE("Đừng tranh luận cảm tính — đưa ra tiêu chí khách quan: mức độ ảnh hưởng tới khách hàng (ngành ngân hàng, sai số dư luôn nhạy cảm) và khả năng gây thao tác sai. Nếu vẫn chưa thống nhất, đưa vấn đề lên để BA/PO quyết định mức độ dựa trên tiêu chuẩn severity chung của đội.", "Don't argue emotionally — use objective criteria: customer impact (in banking, wrong balance is always sensitive) and the chance of causing a wrong action. If still unresolved, escalate to BA/PO to decide the severity based on the team's shared severity standard.", "感情的に議論しない — 客観的基準を使う：顧客への影響度（銀行業では残高の誤りは常に敏感）と誤操作を招く可能性。それでも一致しなければ、チーム共通の深刻度基準に基づきBA/POにエスカレーションして決めてもらう。"),
      P("Người mới thường ngại 'cãi' với Dev vì sợ mất lòng. Nhưng đây không phải là cãi nhau — đây là trao đổi chuyên nghiệp dựa trên dữ liệu và tiêu chuẩn chung. Ghi rõ vì sao bạn đánh giá High (ảnh hưởng khách hàng, ngành nhạy cảm), lắng nghe lý do Dev đánh giá Low, và nếu cần thì để người có thẩm quyền (BA/PO) quyết định cuối cùng — không ai 'thắng thua' cá nhân ở đây.",
        "Beginners often shy away from 'arguing' with Dev for fear of upsetting them. But this isn't arguing — it's a professional discussion based on data and shared standards. State clearly why you rate it High (customer impact, a sensitive domain), listen to why Dev rates it Low, and if needed let the authority (BA/PO) make the final call — nobody personally 'wins or loses' here.",
        "初心者はよく開発者と『言い争う』ことをためらいます、機嫌を損ねるのを恐れて。しかしこれは言い争いではなく、データと共通基準に基づくプロフェッショナルな議論です。なぜHighと評価するか（顧客への影響、敏感な業界）を明確に述べ、開発者がなぜLowと評価するか耳を傾け、必要なら権限者（BA/PO）に最終判断を委ねましょう — ここには個人的な『勝ち負け』はありません。"),
      TRY("Viết 2 câu lý do khách quan vì sao lỗi 'sai số dư 1 giây' trong app ngân hàng nên được xếp High thay vì Low.", "Write 2 objective reasons why a '1-second wrong balance' bug in a banking app should be rated High instead of Low.", "銀行アプリの『1秒間の残高誤表示』がLowでなくHighであるべき客観的理由を2つ書いてみよう。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo cho người mới", en: "9. Common mistakes & tips for beginners", ja: "9. よくある失敗と初心者へのコツ" },
    blocks: [
      P("Trước khi kết thúc phần thực hành, cùng điểm qua vài lỗi phổ biến người mới hay vấp khi lần đầu làm việc theo quy trình công ty.",
        "Before wrapping up the hands-on section, let's go over a few common mistakes beginners make when first working within a company process.",
        "実践パートを終える前に、初めて会社のプロセスで働く際に新人がよく陥る失敗をいくつか見ておきましょう。"),
      PITFALL("Im lặng khi chưa hiểu yêu cầu của BA, rồi tự đoán và viết sai ca kiểm thử — hậu quả là bỏ sót lỗi thật hoặc báo nhầm lỗi.", "Staying silent when a BA requirement is unclear, then guessing and writing wrong test cases — leading to missed real bugs or false alarms.", "BAの要件が理解できない時に黙って推測し、誤ったテストケースを書く — 本物のバグを見逃したり誤報したりする結果に。"),
      PITFALL("Chỉ báo 'nó bị lỗi' mà không ghi bước tái hiện/môi trường/dữ liệu cụ thể — khiến Dev không tái hiện được và lỗi bị bác.", "Only reporting 'it's broken' without concrete repro steps/environment/data — the developer can't reproduce it and the bug gets rejected.", "具体的な再現手順・環境・データなしで『壊れている』とだけ報告 — 開発者が再現できずバグが却下される。"),
      TIP("Khi mới vào, hãy hỏi ngay nếu chưa rõ — một câu hỏi đúng lúc tiết kiệm nhiều giờ sửa sai sau này, và không ai đánh giá thấp bạn vì điều đó.", "When you're new, ask right away if something's unclear — a timely question saves hours of rework later, and nobody thinks less of you for it.", "新人のうちは、分からなければすぐ質問しましょう — タイムリーな質問は後の何時間もの手戻りを防ぎ、それで評価が下がることはありません。"),
      TIP("Ghi chú lại quy trình thật của đội bạn trong tuần đầu (ai làm gì, họp lúc nào, công cụ nào) — bạn sẽ tự tin hẳn sau 1-2 sprint đầu tiên.", "Note down your team's real process in the first week (who does what, when meetings happen, which tools) — you'll feel much more confident after the first 1-2 sprints.", "最初の週にチームの実際のプロセス（誰が何をするか、いつ会議があるか、どのツールか）をメモしましょう — 最初の1〜2スプリントを終える頃には自信がつきます。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug (defect) life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua toàn bộ bức tranh quy trình test ở công ty qua app SolarBank Digital: sprint là gì, một ngày làm việc trông ra sao, ai làm gì trong đội (BA/Dev/Tester/PO), công cụ thường dùng, cách biến yêu cầu thành ca kiểm thử, cách theo dõi tiến độ, và cách xử lý hai tình huống thực tế — lỗi phát hiện trễ và bất đồng về mức độ nghiêm trọng. Đây là nền tảng để bạn tự tin bước vào ngày làm việc đầu tiên.",
        "You've just walked through the whole picture of the testing process at a company via the SolarBank Digital app: what a sprint is, what a workday looks like, who does what on the team (BA/Dev/Tester/PO), common tools, how to turn requirements into test cases, how to track progress, and how to handle two real situations — a late-found bug and a severity disagreement. This is the foundation for confidently starting your first day at work.",
        "SolarBank Digitalアプリを通して、会社でのテストプロセスの全体像を見てきました：スプリントとは何か、勤務日はどう進むか、チーム内で誰が何をするか（BA/開発者/テスター/PO）、よく使うツール、要件をテストケースに変える方法、進捗の追跡方法、そして2つの実際のシーン — 終盤で見つかったバグと深刻度の意見の相違への対処法。これは初出勤の日を自信を持って迎えるための土台です。"),
      P("Chặng tiếp theo, bạn nên luyện sâu hơn về viết ca kiểm thử, quy trình xử lý lỗi (defect life cycle), và làm quen công cụ thật (Jira, TestRail, Postman) qua các dự án mô phỏng. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thực chiến, một khoá học Tester sẽ giúp bạn rút ngắn thời gian tự mò mẫm và tự tin ứng tuyển.",
        "Next, practice more deeply on writing test cases, the defect life cycle, and getting hands-on with real tools (Jira, TestRail, Postman) through simulated projects. If you want to learn properly from zero to hired with a mentor and real-world projects, a Tester course will help you shorten the trial-and-error time and apply with confidence.",
        "次は、テストケース作成、欠陥ライフサイクル、そしてシミュレーションプロジェクトを通じた実際のツール（Jira、TestRail、Postman）への慣れをさらに深く練習しましょう。指導者と実戦プロジェクトと共にゼロから就職まで体系的に学びたいなら、テスターコースが試行錯誤の時間を短縮し、自信を持って応募する助けになります。"),
      CTA(course),
    ] },
];

const CNM_ENT_01 = makeDoc({
  slug: "quy-trinh-test-o-cong-ty-cho-nguoi-moi",
  domain: "fintech",
  primaryKeyword: "quy trình test ở công ty",
  keywords: ["quy trình test ở công ty", "một ngày làm tester", "sprint là gì", "vai trò trong đội tester", "quy trình làm việc tester cho người mới"],
  coverLabel: "NGƯỜI MỚI · QUY TRÌNH TEST · FINTECH",
  crumb: "Quy trình test ở công ty cho người mới",
  metaTitle: { vi: "Quy trình test ở công ty cho người mới: một ngày Tester", en: "The testing process at a company for beginners: a Tester's day", ja: "初心者向け：会社でのテストプロセス、テスターの1日" },
  metaDescription: {
    vi: "Quy trình test ở công ty cho người mới: sprint là gì, một ngày làm Tester ra sao, cách phối hợp Dev/BA/QA, công cụ hay dùng — có hình minh hoạ và trắc nghiệm.",
    en: "Testing process at a company for beginners: what a sprint is, what a Tester's day looks like, how to work with Dev/BA/QA, common tools — with visuals and a quiz.",
    ja: "初心者向け、会社でのテストプロセス：スプリントとは何か、テスターの一日、開発・BA・QAとの連携、よく使うツールを紹介。図解とクイズ付き。",
  },
  title: {
    vi: "Quy trình test ở công ty cho người mới: một ngày làm Tester diễn ra thế nào (có trắc nghiệm)",
    en: "The testing process at a company for beginners: what a Tester's day looks like (with quiz)",
    ja: "初心者向けの会社でのテストプロセス：テスターの1日はどう進むか（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: quy trình test ở công ty qua app ngân hàng số SolarBank Digital. Sprint là gì, một ngày làm Tester diễn ra thế nào, vai trò BA/Dev/Tester/PO, công cụ Jira/TestRail/Postman, cách biến yêu cầu thành ca kiểm thử, xử lý lỗi phát hiện trễ và bất đồng severity, nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: the testing process at a company through the SolarBank Digital app. What a sprint is, what a Tester's day looks like, BA/Dev/Tester/PO roles, Jira/TestRail/Postman tools, turning requirements into test cases, handling a late-found bug and a severity disagreement, many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：デジタル銀行アプリSolarBank Digitalを通した会社でのテストプロセス。スプリントとは、テスターの1日、BA/開発者/テスター/POの役割、Jira/TestRail/Postmanツール、要件からテストケースへの変換、終盤バグと深刻度の意見相違への対処、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách một Tester mới bắt nhịp quy trình công ty", steps: [
    { name: "Nắm nhịp sprint & vai trò", text: "Hiểu sprint là gì và ai làm gì (BA/Dev/Tester/PO) trước khi vào việc." },
    { name: "Biến yêu cầu thành ca kiểm thử", text: "Đọc yêu cầu BA, liệt kê trường hợp cần test, viết ca rõ ràng, chạy trên bản build." },
    { name: "Theo dõi & báo cáo trung thực", text: "Cập nhật bảng kanban, báo cáo lỗi kịp thời và trung thực, đặc biệt khi gần deadline." },
  ] },
  pages,
});

export const CNM_BEG_ENT_01 = [CNM_ENT_01];
