// doc_cnm_beg_ai.mjs — BÀI "DÀNH CHO NGƯỜI MỚI": AI trong kiểm thử là gì, AI giúp Tester
// như thế nào và bắt đầu từ đâu. Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng
// khích lệ. Gắn app SaaS hỗ trợ khách hàng HelpDeskly. Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO. Theo khuôn mẫu doc_manual_beginner_defect_lifecycle.mjs.
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
    categorySlug: "ai-in-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình ticket hỗ trợ khách hàng có trợ lý AI đề xuất câu trả lời sai ──
const m_ticket = browser("helpdeskly.io/tickets/8821", [
  panel("HelpDeskly · Ticket #8821 · Trợ lý AI đề xuất trả lời", [
    field(24, 20, 330, "Khách hàng", "Nguyễn Văn An", "normal"),
    field(372, 20, 330, "Chủ đề", "Không đăng nhập được sau khi đổi mật khẩu", "normal"),
    field(24, 92, 678, "Trợ lý AI đề xuất trả lời", "Hãy thử xoá cache trình duyệt rồi đăng nhập lại", "error"),
    btn(24, 168, 220, "Gửi phản hồi cho khách", "primary"),
    annotate(20, 84, 340, 58, "BUG: AI bỏ qua bước đặt lại mật khẩu qua email"),
  ].join(""), { h: 300, accent: "#0369a1" }),
].join(""), { h: 356, title: "HelpDeskly · SaaS", accent: "#0369a1" });

// ── Mockup 2: luồng AI hỗ trợ tester trong quy trình kiểm thử ──
const m_flow = moduleFlow("AI hỗ trợ tester ở những bước nào", [
  { id: "req", label: "Yêu cầu / User story", x: 70, y: 70, sub: "tính năng mới" },
  { id: "gen", label: "AI gợi ý test case", x: 250, y: 70, sub: "sinh nháp nhanh" },
  { id: "review", label: "Tester rà soát", x: 430, y: 70, sub: "đối chiếu yêu cầu" },
  { id: "exec", label: "Thực thi kiểm thử", x: 610, y: 70, sub: "chạy case đã duyệt" },
  { id: "log", label: "AI phân tích log", x: 430, y: 220, sub: "lọc bất thường" },
  { id: "report", label: "Báo cáo lỗi", x: 610, y: 220, sub: "tester xác nhận" },
], [
  { from: "req", to: "gen", label: "mô tả tính năng" },
  { from: "gen", to: "review", label: "gợi ý case" },
  { from: "review", to: "exec", label: "case đã duyệt" },
  { from: "exec", to: "log", label: "log/kết quả" },
  { from: "log", to: "report", label: "nghi vấn lỗi" },
  { from: "review", to: "gen", label: "yêu cầu sinh thêm", bad: true },
], { accent: "#0369a1", h: 300 });

// ── Mockup 3: ticket Jira có gợi ý triage từ AI (độ tin cậy, khả năng trùng lặp) ──
const m_jira = jira({
  key: "HD-2210", title: "Trợ lý AI đề xuất sai bước xử lý cho ticket quên mật khẩu",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "production · web HelpDeskly · Chrome 126"],
    ["Các bước", "1) Mở ticket #8821 2) Xem đề xuất trả lời của AI 3) Đối chiếu quy trình chuẩn"],
    ["Kết quả thực tế", "AI đề xuất 'xoá cache trình duyệt'"],
    ["Kết quả mong đợi", "AI phải đề xuất 'gửi link đặt lại mật khẩu qua email'"],
    ["Gợi ý triage của AI", "Có thể trùng HD-2190 · độ tin cậy 62%"],
  ],
});

// ── Mockup 4: bảng việc nào AI hỗ trợ tốt, việc nào Tester vẫn phải tự quyết định ──
const m_table = grid("AI hỗ trợ được gì trong công việc của Tester", ["Công việc", "AI hỗ trợ đến đâu", "Tester vẫn cần làm"], [
  ["Gợi ý test case từ yêu cầu", "Sinh nhanh nhiều case nháp", "Rà soát, bổ sung ca biên/thực tế"],
  ["Viết lại bug report rõ ràng hơn", "Chỉnh câu chữ, cấu trúc gọn", "Xác nhận đúng bản chất lỗi"],
  ["Lọc log/kết quả chạy test lớn", "Tìm nhanh dòng bất thường", "Xác nhận đây có phải lỗi thật"],
  ["Gợi ý mức độ ưu tiên/nghiêm trọng", "Đưa gợi ý ban đầu tham khảo", "Tester quyết định mức cuối cùng"],
  ["Quyết định đóng (Closed) một lỗi", "Không nên tự động quyết định", "Luôn cần con người xác nhận"],
], { accent: "#0369a1", highlight: 4 });

// ── Mockup 5: dashboard số liệu AI hỗ trợ kiểm thử trong tuần ──
const m_dash = dashboard("Trợ lý AI hỗ trợ kiểm thử — tuần này", [
  { label: "Case AI gợi ý", value: "86", sub: "từ yêu cầu mới", color: "#0369a1" },
  { label: "Case tester giữ lại", value: "61", sub: "sau khi rà soát", color: "#16a34a" },
  { label: "Lỗi phát hiện sớm", value: "9", sub: "nhờ AI phân tích log", color: "#f59e0b" },
  { label: "Cảnh báo sai", value: "4", sub: "AI nhận nhầm là lỗi", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "AI trong kiểm thử phần mềm là gì?",
  "What is AI in software testing?",
  "AI trong kiểm thử là việc dùng các công cụ trí tuệ nhân tạo (thường dựa trên mô hình ngôn ngữ lớn) để hỗ trợ tester làm việc nhanh và chính xác hơn: gợi ý test case từ yêu cầu, viết lại bug report rõ ràng hơn, lọc log lớn để tìm bất thường, hoặc gợi ý mức độ ưu tiên của một lỗi. AI không tự mình quyết định lỗi có tồn tại hay không — con người luôn là người xác nhận cuối cùng.",
  "AI in testing means using artificial intelligence tools (often large language models) to help testers work faster and more accurately: suggesting test cases from requirements, rewriting clearer bug reports, scanning large logs for anomalies, or suggesting a bug's priority. AI doesn't decide on its own whether a bug is real — a human always makes the final call.",
  "ソフトウェアテストにおけるAIとは？",
  "テストにおけるAIとは、AIツール（多くは大規模言語モデル）を使い、テスターがより速く正確に働けるよう支援することです：要件からテストケースを提案する、バグ報告をより明確に書き直す、大量のログから異常を絞り込む、バグの優先度を提案するなど。AIが自分でバグの存在を決めることはなく、常に人間が最終判断します。");
const faq2 = FAQ(
  "AI có thay thế được Tester không?",
  "Will AI replace testers?",
  "Chưa và không nên. AI giỏi ở việc xử lý khối lượng lớn (sinh nhiều case nháp, quét log dài, tóm tắt thông tin) nhưng lại yếu ở việc hiểu ngữ cảnh nghiệp vụ, đánh giá rủi ro thực tế, và ra quyết định 'lỗi này có chấp nhận được không'. Người mới nên xem AI là trợ lý tăng tốc công việc, còn kỹ năng phân tích, tư duy phản biện của tester vẫn là cốt lõi không thể thay thế.",
  "Not yet, and it shouldn't. AI is great at handling large volume (drafting many test cases, scanning long logs, summarizing information) but weak at understanding business context, assessing real-world risk, and deciding 'is this bug acceptable'. Beginners should see AI as a productivity assistant, while a tester's analysis and critical thinking remain the irreplaceable core skill.",
  "AIはテスターに取って代わるのか？",
  "まだですし、そうすべきでもありません。AIは大量処理（多くのテストケース草案作成、長いログの走査、情報の要約）が得意ですが、業務の文脈理解や実際のリスク評価、『このバグは許容できるか』の判断には弱いです。初心者はAIを作業を加速する助手と捉え、テスターの分析力と批判的思考こそが代替不可能な核心スキルだと考えましょう。");
const faq3 = FAQ(
  "Người mới nên bắt đầu học AI trong kiểm thử từ đâu?",
  "Where should a beginner start learning AI in testing?",
  "Bắt đầu từ việc nhỏ và quen thuộc: dùng một công cụ AI có sẵn (chatbot AI, trợ lý trong công cụ quản lý lỗi) để nhờ nó gợi ý test case cho MỘT tính năng đơn giản, rồi tự tay rà soát xem AI thiếu ca nào. Đừng vội học công cụ phức tạp — hãy hiểu rõ 'AI gợi ý, Tester quyết định' trước, sau đó mở rộng sang phân tích log và viết bug report với sự hỗ trợ của AI.",
  "Start small and familiar: use an available AI tool (an AI chatbot, or an assistant inside your bug tracker) to ask it to suggest test cases for ONE simple feature, then review yourself what cases it missed. Don't rush into complex tools — first understand 'AI suggests, the tester decides', then expand into log analysis and AI-assisted bug reports.",
  "初心者はAIテストの学習をどこから始めるべき？",
  "小さく身近なことから始めましょう：既存のAIツール（AIチャットボットやバグ管理ツール内のアシスタント）を使い、1つの簡単な機能のテストケースを提案してもらい、自分でどのケースが抜けているか確認します。複雑なツールに急がず、まず『AIが提案し、テスターが判断する』を理解してから、ログ分析やAI支援のバグ報告へ広げましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "AI trong kiểm thử phần mềm chủ yếu đóng vai trò gì?", en: "What role does AI mainly play in software testing?", ja: "ソフトウェアテストにおいてAIは主にどんな役割？" },
    options: [
      { vi: "Tự động quyết định mọi lỗi và đóng ticket thay tester", en: "Automatically decide every bug and close tickets for the tester", ja: "すべてのバグを自動判断しテスターの代わりにチケットをクローズ" },
      { vi: "Trợ lý gợi ý (test case, tóm tắt log, đề xuất ưu tiên) để tester làm nhanh hơn", en: "An assistant that suggests (test cases, log summaries, priority) so testers work faster", ja: "テストケース・ログ要約・優先度を提案しテスターを助けるアシスタント" },
      { vi: "Thay thế hoàn toàn vai trò của tester", en: "Fully replace the tester role", ja: "テスターの役割を完全に置き換える" },
      { vi: "Chỉ dùng để viết code cho lập trình viên", en: "Only used to write code for developers", ja: "開発者向けのコード作成にのみ使う" },
    ], correct: 1,
    explain: { vi: "AI là trợ lý hỗ trợ tăng tốc: gợi ý case, tóm tắt log, đề xuất ưu tiên — con người vẫn ra quyết định cuối.", en: "AI is a speed-up assistant: suggesting cases, summarizing logs, proposing priority — humans still make the final call.", ja: "AIは高速化を助ける存在：ケース提案、ログ要約、優先度提案 — 最終判断は人間が行う。" },
  }),
  mcq({
    q: { vi: "AI gợi ý 6 test case cho một tính năng đăng nhập. Bạn nên làm gì tiếp theo?", en: "AI suggests 6 test cases for a login feature. What should you do next?", ja: "AIがログイン機能に6件のテストケースを提案。次に何をすべき？" },
    options: [
      { vi: "Chạy ngay cả 6 case, không cần xem lại", en: "Run all 6 cases immediately without reviewing", ja: "見直さずに6件すべてを即実行" },
      { vi: "Rà soát lại, bổ sung ca biên/thực tế mà AI có thể bỏ sót", en: "Review them and add edge/real-world cases AI may have missed", ja: "見直し、AIが見落とした可能性のある境界/実際のケースを追加" },
      { vi: "Xoá hết vì AI không đáng tin", en: "Delete all of them because AI can't be trusted", ja: "AIは信用できないのですべて削除" },
      { vi: "Gửi thẳng cho khách hàng xác nhận", en: "Send them straight to the customer for confirmation", ja: "そのまま顧客に確認を依頼" },
    ], correct: 1,
    explain: { vi: "AI giúp bạn có bản nháp nhanh, nhưng luôn cần tester rà soát và bổ sung ca biên/thực tế mà AI dễ bỏ sót.", en: "AI gives you a fast draft, but the tester must always review and add edge/real cases AI easily misses.", ja: "AIは素早い草案をくれますが、AIが見落としがちな境界/実際のケースは必ずテスターが見直し追加する必要があります。" },
  }),
  mcq({
    q: { vi: "Vì sao không nên để AI tự quyết định đóng (Closed) một lỗi?", en: "Why shouldn't AI be allowed to decide on its own to Close a bug?", ja: "なぜAIに自らバグのクローズを決めさせるべきではない？" },
    options: [
      { vi: "Vì AI chạy chậm hơn con người", en: "Because AI runs slower than humans", ja: "AIは人間より処理が遅いから" },
      { vi: "Vì AI có thể thiếu ngữ cảnh nghiệp vụ và đánh giá rủi ro thực tế", en: "Because AI may lack business context and real-world risk judgment", ja: "AIは業務の文脈や実際のリスク判断が不足し得るから" },
      { vi: "Vì AI không biết đọc tiếng Việt", en: "Because AI can't read Vietnamese", ja: "AIはベトナム語を読めないから" },
      { vi: "Vì công ty cấm dùng AI", en: "Because the company bans using AI", ja: "会社がAI使用を禁止しているから" },
    ], correct: 1,
    explain: { vi: "AI có thể thiếu ngữ cảnh nghiệp vụ thực tế, nên quyết định đóng lỗi luôn cần con người xác nhận.", en: "AI may lack real business context, so closing a bug always needs human confirmation.", ja: "AIは実際の業務文脈を欠くことがあるため、バグのクローズには常に人間の確認が必要です。" },
  }),
  mcq({
    q: { vi: "Người mới nên bắt đầu học AI trong kiểm thử như thế nào?", en: "How should a beginner start learning AI in testing?", ja: "初心者はAIテストの学習をどう始めるべき？" },
    options: [
      { vi: "Học ngay các mô hình AI phức tạp nhất trước tiên", en: "Learn the most complex AI models first", ja: "最も複雑なAIモデルから先に学ぶ" },
      { vi: "Bỏ qua AI vì chưa cần thiết", en: "Skip AI entirely because it's not needed yet", ja: "まだ必要ないのでAIを無視する" },
      { vi: "Thử nhờ AI gợi ý test case cho một tính năng đơn giản rồi tự rà soát lại", en: "Try asking AI to suggest test cases for one simple feature, then review it yourself", ja: "簡単な機能のテストケース提案をAIに頼み、自分で見直してみる" },
      { vi: "Chỉ đọc lý thuyết, không cần thực hành", en: "Only read theory, no need to practice", ja: "理論だけ読み、実践は不要" },
    ], correct: 2,
    explain: { vi: "Cách học tốt nhất cho người mới là thực hành nhỏ: nhờ AI gợi ý rồi tự rà soát, để hiểu rõ giới hạn của AI.", en: "The best way for beginners is small hands-on practice: ask AI to suggest, then review yourself to understand AI's limits.", ja: "初心者に最適なのは小さな実践：AIに提案させ自分で見直し、AIの限界を理解すること。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("AI trong kiểm thử là dùng công cụ trí tuệ nhân tạo để hỗ trợ tester: gợi ý test case, tóm tắt log, đề xuất mức ưu tiên của lỗi — giúp bạn làm nhanh hơn, nhưng người quyết định cuối cùng luôn là tester. Bài này bám màn hình ticket hỗ trợ khách hàng của app SaaS HelpDeskly: bạn sẽ thấy AI đề xuất một câu trả lời sai, học cách phát hiện, ghi nhận và biết khi nào nên tin AI, khi nào phải tự kiểm tra lại. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "AI in testing means using artificial intelligence tools to help testers: suggesting test cases, summarizing logs, proposing a bug's priority — helping you work faster, while the tester always makes the final call. This follows the customer-support ticket screen of the SaaS app HelpDeskly: you'll see AI suggest a wrong reply, learn to spot it, log it, and know when to trust AI and when to double-check yourself. Lots of visuals and a quiz at the end.",
        "テストにおけるAIとは、AIツールを使いテスターを支援すること：テストケースの提案、ログの要約、バグの優先度提案などで作業を速めますが、最終判断は常にテスターが行います。本記事はSaaSアプリHelpDesklyの顧客サポートチケット画面に沿い、AIが誤った返信を提案する様子を見て、それを見つけ記録する方法、AIをいつ信じいつ自分で確認すべきかを学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Chắc bạn đã nghe nhiều nơi nhắc tới 'AI' và tự hỏi nó liên quan gì tới công việc tester. Tin vui là: bạn không cần là chuyên gia lập trình AI mới dùng được nó. AI trong kiểm thử giống như một trợ lý siêng năng — nó đọc yêu cầu, gợi ý vài ý tưởng test case, tóm tắt một đống log dài, hay viết lại câu bug report cho gọn hơn. Việc của bạn là biết cách nhờ nó đúng chỗ, và luôn kiểm tra lại trước khi tin. Chúng ta sẽ học qua một app SaaS hỗ trợ khách hàng thật, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! You've probably heard 'AI' mentioned everywhere and wondered what it has to do with being a tester. The good news: you don't need to be an AI engineer to use it. AI in testing is like a diligent assistant — it reads requirements, suggests a few test case ideas, summarizes a long pile of logs, or rewrites a bug report more clearly. Your job is knowing where to ask it for help, and always double-checking before trusting it. We'll learn through a real customer-support SaaS app, with visuals and hands-on practice.",
        "こんにちは、初心者さん！『AI』という言葉をあちこちで聞き、テスターの仕事と何の関係があるのか気になっていることでしょう。朗報です：AIエンジニアである必要はありません。テストにおけるAIは勤勉な助手のようなもの — 要件を読み、テストケースのアイデアをいくつか提案し、長いログの山を要約し、バグ報告をより明確に書き直してくれます。あなたの仕事は、どこで頼るべきかを知り、信じる前に必ず確認することです。実際の顧客サポートSaaSアプリで、図と実習を通じて学びます。"),
      IMG(m_ticket, "Màn hình test: ticket HelpDeskly — AI đề xuất câu trả lời còn thiếu bước quan trọng", "Screen under test: HelpDeskly ticket — AI's suggested reply is missing an important step", "テスト対象画面：HelpDesklyのチケット — AIの提案返信が重要な手順を欠く"),
      DEF("AI trong kiểm thử", "việc dùng công cụ trí tuệ nhân tạo để hỗ trợ tester làm nhanh và chính xác hơn (gợi ý test case, tóm tắt log, đề xuất ưu tiên), nhưng con người vẫn là người quyết định cuối cùng.",
        "AI in testing — using artificial intelligence tools to help testers work faster and more accurately (suggesting test cases, summarizing logs, proposing priority), while a human still makes the final decision.",
        "テストにおけるAI — AIツールを使いテスターがより速く正確に働けるよう支援すること（テストケース提案、ログ要約、優先度提案）。ただし最終判断は常に人間が行う。"),
    ] },
  { heading: { vi: "2. AI hỗ trợ tester ở những bước nào", en: "2. Where AI helps a tester", ja: "2. AIはどの段階でテスターを助けるか" },
    blocks: [
      P("Hãy hình dung công việc kiểm thử như một dây chuyền: từ đọc yêu cầu, viết case, chạy test, tới ghi nhận lỗi. AI có thể 'chen vào' hỗ trợ ở nhiều điểm trên dây chuyền đó, nhưng nó không thay bạn đi hết cả dây chuyền — nó chỉ tăng tốc từng đoạn, còn bạn vẫn là người cầm lái.",
        "Picture testing work as an assembly line: from reading requirements, writing cases, running tests, to logging bugs. AI can 'step in' to help at several points on that line, but it doesn't run the whole line for you — it speeds up individual segments while you remain the one steering.",
        "テスト作業を組み立てラインと想像しましょう：要件を読み、ケースを書き、テストを実行し、バグを記録するまで。AIはそのライン上の複数の地点で『割り込んで』助けられますが、ライン全体をあなたの代わりに動かすことはありません — 各区間を速めるだけで、操縦するのは常にあなたです。"),
      IMG(m_flow, "Luồng AI hỗ trợ tester: từ yêu cầu → AI gợi ý case → tester rà soát → thực thi → AI phân tích log → báo cáo lỗi", "The AI-assisted flow: from requirement → AI suggests cases → tester reviews → execute → AI analyzes logs → bug report", "AI支援フロー：要件→AIがケース提案→テスターが見直し→実行→AIがログ分析→バグ報告"),
      DEF("Trợ lý AI (AI assistant)", "một công cụ AI (thường là chatbot hoặc tính năng tích hợp trong công cụ quản lý lỗi) mà tester hỏi để nhận gợi ý, không phải để giao toàn quyền quyết định.",
        "an AI tool (often a chatbot or a feature built into a bug tracker) that a tester consults for suggestions, not to hand over full decision-making authority.",
        "AIアシスタント — テスターが提案を得るために相談するAIツール（多くはチャットボットやバグ管理ツール内蔵機能）であり、決定権を全面的に委ねる相手ではない。"),
      P("Ở bước 'AI gợi ý test case', bạn mô tả ngắn gọn tính năng (giống viết cho một đồng nghiệp mới), AI trả về vài ý tưởng case. Ở bước 'AI phân tích log', bạn dán một đoạn log dài, AI chỉ ra dòng có vẻ bất thường. Cả hai bước đều kết thúc bằng việc BẠN xác nhận lại — đó là điểm mấu chốt khiến AI trở thành trợ lý an toàn thay vì rủi ro.",
        "In the 'AI suggests test cases' step, you briefly describe the feature (like writing for a new colleague), and AI returns a few case ideas. In the 'AI analyzes logs' step, you paste a long log snippet, and AI points out lines that look abnormal. Both steps end with YOU confirming — that's the key point that makes AI a safe assistant rather than a risk.",
        "『AIがテストケースを提案』の段階では、機能を簡潔に説明し（新しい同僚に書くように）、AIがいくつかのケース案を返します。『AIがログを分析』の段階では、長いログの断片を貼り付けると、AIが異常に見える行を指摘します。どちらの段階も最後は「あなた」が確認します — これがAIをリスクではなく安全な助手にする要点です。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần hiểu điều này", en: "3. Why beginners need to understand this", ja: "3. 初心者がこれを理解すべき理由" },
    blocks: [
      P("Ngày càng nhiều công ty tích hợp AI vào công cụ làm việc: công cụ quản lý lỗi có nút 'gợi ý bằng AI', trình soạn báo cáo tự tóm tắt, chatbot trả lời khách hàng như ở HelpDeskly. Là tester mới, bạn sẽ chạm vào những công cụ này ngay từ ngày đầu, dù muốn hay không.",
        "More and more companies are integrating AI into work tools: bug trackers with an 'AI suggest' button, report editors that auto-summarize, chatbots answering customers like at HelpDeskly. As a new tester, you'll touch these tools from day one, whether you want to or not.",
        "AIを業務ツールに組み込む企業は増え続けています：『AI提案』ボタン付きバグ管理ツール、自動要約するレポートエディタ、HelpDesklyのような顧客対応チャットボット。新人テスターとして、望むと望まざるとに関わらず初日からこれらのツールに触れます。"),
      P("Hiểu AI trong kiểm thử giúp bạn không hoang mang khi thấy 'nút AI' lạ, và cũng không mù quáng tin mọi thứ AI đưa ra. Bạn sẽ biết cách khai thác nó để làm việc nhanh hơn — ví dụ nhờ AI gợi ý vài case ban đầu thay vì ngồi nghĩ từ số 0 — trong khi vẫn giữ tư duy phản biện của một tester thực thụ.",
        "Understanding AI in testing keeps you from panicking at an unfamiliar 'AI button', and also from blindly trusting everything AI produces. You'll know how to leverage it to work faster — for example asking AI to suggest a few initial cases instead of starting from zero — while keeping the critical thinking of a real tester.",
        "テストにおけるAIを理解すれば、見慣れない『AIボタン』に慌てることも、AIの出す全てを盲信することもなくなります。作業を速める活用法を知るでしょう — 例えばゼロから考える代わりにAIに最初のケースをいくつか提案してもらうなど — 本物のテスターとしての批判的思考を保ちながら。"),
      P("Đây cũng là chủ đề rất hay được hỏi khi phỏng vấn hiện nay: 'Bạn đã dùng AI trong công việc kiểm thử chưa, dùng như thế nào?'. Trả lời được bằng ví dụ cụ thể (dù chỉ là ví dụ nhỏ bạn tự thực hành) cho thấy bạn cập nhật xu hướng và biết dùng công cụ đúng cách, không chỉ nói suông.",
        "This is also a very common interview topic nowadays: 'Have you used AI in testing work, and how?'. Being able to answer with a concrete example (even a small one you practiced yourself) shows you're up to date and use tools properly, not just talking in theory.",
        "これは今どきの面接でもよく聞かれる話題です：『テスト業務でAIを使ったことは？どう使いましたか？』。具体例（自分で試した小さな例でも）で答えられれば、最新動向を把握し正しくツールを使えることを示せます、単なる建前ではなく。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & việc AI có thể giúp", en: "4. Prepare: tools & what AI can help with", ja: "4. 準備：ツールとAIが助けられること" },
    blocks: [
      P("Bạn không cần cài đặt gì phức tạp để bắt đầu. Hầu hết công ty đã có sẵn ít nhất một trong hai dạng: một chatbot AI thông dụng (như ChatGPT/Claude) hoặc một tính năng AI tích hợp sẵn trong công cụ quản lý lỗi (như Jira). Việc của bạn là biết loại việc nào nên nhờ AI, và loại việc nào luôn phải tự làm.",
        "You don't need any complex setup to start. Most companies already have at least one of two things: a common AI chatbot (like ChatGPT/Claude) or an AI feature built into their bug tracker (like Jira). Your job is knowing which tasks to ask AI for, and which tasks you must always do yourself.",
        "始めるのに複雑な設定は不要です。ほとんどの企業は既に次の2つの少なくとも一方を持っています：一般的なAIチャットボット（ChatGPT/Claudeなど）、またはバグ管理ツール（Jiraなど）に内蔵されたAI機能。あなたの仕事は、どの作業をAIに頼み、どの作業を常に自分で行うべきかを知ることです。"),
      STEP(1, "Mở một công cụ AI mà đội bạn cho phép dùng (chatbot chung hoặc tính năng AI trong bug tracker).", "Open an AI tool your team allows (a shared chatbot or an AI feature in the bug tracker).", "チームが許可するAIツールを開く（共有チャットボットまたはバグ管理ツール内のAI機能）。"),
      STEP(2, "Đọc kỹ bảng 'AI hỗ trợ được gì' bên dưới để biết việc nào AI làm tốt, việc nào bạn phải tự quyết.", "Read the 'What AI can help with' table below to know what AI does well and what you must decide yourself.", "下記『AIが助けられること』の表を読み、AIが得意な作業と自分で判断すべき作業を知る。"),
      STEP(3, "Với mỗi việc nhờ AI, luôn tự hỏi: 'kết quả này có khớp với ngữ cảnh thật của app không?' trước khi dùng.", "For every task you ask AI to do, always ask: 'does this result fit the real context of the app?' before using it.", "AIに頼む各作業で、使う前に必ず『この結果はアプリの実際の文脈に合っているか？』と自問する。"),
      TRY("Mở một công cụ AI bất kỳ và hỏi thử: 'Gợi ý 5 test case cho chức năng đăng nhập bằng email và mật khẩu'. Xem AI trả lời gì.", "Open any AI tool and try asking: 'Suggest 5 test cases for an email/password login feature'. See what AI responds.", "任意のAIツールを開き試してみよう：『メールとパスワードでのログイン機能のテストケースを5つ提案して』。AIの回答を見てみよう。"),
      PITFALL("Nghĩ rằng AI luôn đúng vì nó trả lời rất tự tin và trôi chảy. AI có thể tự tin nói sai — nó không biết ngữ cảnh nghiệp vụ riêng của công ty bạn.", "Assuming AI is always right because it answers confidently and fluently. AI can confidently say something wrong — it doesn't know your company's specific business context.", "AIが自信満々に流暢に答えるため常に正しいと思い込むこと。AIは自信満々に間違ったことを言うことがあります — あなたの会社特有の業務文脈を知らないからです。"),
      IMG(m_table, "Bảng: AI hỗ trợ được gì trong công việc của Tester và phần nào vẫn cần con người", "A table: what AI can help with in a tester's job and what still needs a human", "表：テスターの業務でAIが助けられることと、まだ人間が必要な部分"),
    ] },
  { heading: { vi: "5. Các bước dùng AI để hỗ trợ kiểm thử (thực hành)", en: "5. Steps to use AI to assist testing (hands-on)", ja: "5. AIをテスト支援に使う手順（実習）" },
    blocks: [
      P("Giờ ta thử một quy trình nhỏ, thực tế: nhờ AI gợi ý test case cho tính năng 'trợ lý trả lời tự động' của HelpDeskly, rồi tự rà soát trước khi dùng thật.",
        "Now let's try a small, realistic workflow: ask AI to suggest test cases for HelpDeskly's 'auto-reply assistant' feature, then review it yourself before actually using it.",
        "では、小さく現実的な流れを試しましょう：HelpDesklyの『自動返信アシスタント』機能のテストケースをAIに提案してもらい、実際に使う前に自分で見直します。"),
      STEP(1, "Mô tả tính năng ngắn gọn cho AI: mục đích, dữ liệu đầu vào, kết quả mong đợi — càng rõ, gợi ý càng sát.", "Briefly describe the feature to AI: purpose, input data, expected result — the clearer, the more relevant the suggestions.", "機能を簡潔にAIへ説明：目的・入力データ・期待結果 — 明確なほど提案が的確になる。"),
      STEP(2, "Đọc danh sách case AI trả về, đánh dấu case nào hợp lý, case nào chung chung/thiếu thực tế.", "Read the list of cases AI returns, mark which ones are reasonable and which are generic/unrealistic.", "AIが返したケース一覧を読み、妥当なケースと一般的すぎる/非現実的なケースに印を付ける。"),
      STEP(3, "Tự bổ sung ít nhất 1–2 ca biên hoặc tình huống thực tế mà AI thường bỏ sót (dữ liệu đặc biệt, quy trình nội bộ).", "Add at least 1-2 edge cases or real-world scenarios AI often misses (special data, internal workflow).", "AIがよく見落とす境界ケースや実際のシナリオ（特殊データ、社内フロー）を最低1〜2件自分で追加する。"),
      STEP(4, "Đưa bộ case đã rà soát vào công cụ quản lý test chính thức, rồi mới bắt đầu thực thi.", "Move the reviewed case set into your official test management tool, then start executing.", "見直したケース一式を正式なテスト管理ツールへ入れてから実行を開始する。"),
      CODE("text", "PROMPT gửi cho AI (ví dụ)\n\"Tôi cần test case cho tính năng 'trợ lý trả lời tự động' của HelpDeskly.\nĐầu vào: nội dung ticket khách hàng gửi.\nKết quả mong đợi: AI đề xuất đúng quy trình xử lý chuẩn (vd quên mật khẩu -> gửi link đặt lại qua email).\nHãy gợi ý 6 test case, gồm cả trường hợp ticket mơ hồ/không đủ thông tin.\"\n\nKẾT QUẢ AI TRẢ VỀ (rút gọn)\n1) Ticket rõ ràng, đúng quy trình chuẩn\n2) Ticket mơ hồ, thiếu thông tin\n3) Ticket bằng ngôn ngữ khác\n4) Ticket có từ ngữ nhạy cảm/khẩn cấp\n5) Ticket trùng với ticket cũ đã xử lý\n6) Ticket rỗng/không có nội dung\n\n→ TESTER BỔ SUNG THÊM: ticket có nhiều yêu cầu trong 1 câu (đổi mật khẩu + đổi email)."),
      TRY("Viết 1 prompt ngắn mô tả một tính năng bạn quen thuộc (app học tập, app mua sắm...) và nhờ AI gợi ý 5 test case cho nó.", "Write one short prompt describing a feature you're familiar with (a study app, a shopping app...) and ask AI to suggest 5 test cases for it.", "自分が知っている機能（学習アプリ、買い物アプリなど）を短く説明するプロンプトを書き、AIに5つのテストケースを提案してもらおう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: AI gợi ý test case nhưng thiếu ca biên", en: "6. Situation 1: AI suggests test cases but misses edge cases", ja: "6. シーン1：AIがテストケースを提案するが境界ケースが不足" },
    blocks: [
      SITUATION("Bạn nhờ AI gợi ý test case cho form đổi mật khẩu, AI trả về 5 case đều là 'nhập đúng, bấm lưu thành công'.", "You ask AI to suggest test cases for a change-password form; AI returns 5 cases that are all 'enter correctly, save succeeds'.",
        "Không có case nào về mật khẩu quá ngắn, mật khẩu trùng mật khẩu cũ, hay mất kết nối giữa lúc lưu. Nếu bạn dùng nguyên bộ case này, sản phẩm có thể lọt lỗi nghiêm trọng.",
        "None of the cases cover a too-short password, reusing the old password, or losing connection mid-save. If you use this case set as-is, the product could ship a serious bug.",
        "パスワード変更フォームのテストケースをAIに依頼、AIは5件すべて『正しく入力し保存成功』というケースを返した。",
        "パスワードが短すぎる、旧パスワードと同じ、保存中に接続が切れる、といったケースが一つもない。このケース一式をそのまま使うと、深刻なバグが本番に漏れかねません。"),
      SOLVE("Tự bổ sung các ca biên còn thiếu (mật khẩu ngắn, trùng mật khẩu cũ, mất kết nối) trước khi đưa vào bộ test chính thức.", "Add the missing edge cases yourself (short password, same as old password, lost connection) before adding to the official test set.", "不足している境界ケース（短いパスワード、旧パスワードと同じ、接続切断）を正式なテストセットに入れる前に自分で追加する。"),
      P("Đây là bài học lớn nhất khi mới dùng AI: AI thường giỏi sinh case 'điển hình, đường thẳng' (happy path) nhưng dễ bỏ sót ca biên và tình huống bất thường — vốn là nơi lỗi nghiêm trọng hay ẩn náu. Công thức an toàn: xem bộ case của AI như bản NHÁP, luôn tự hỏi 'còn trường hợp lạ/xấu nào chưa có?' rồi bổ sung trước khi thực thi.",
        "This is the biggest lesson when starting with AI: AI is often good at generating 'typical, happy path' cases but easily misses edge cases and unusual scenarios — exactly where serious bugs like to hide. The safe formula: treat AI's case set as a DRAFT, always ask 'what strange/bad case is still missing?' and add it before executing.",
        "AIを使い始めて最大の教訓：AIは『典型的な、ハッピーパス』のケース生成は得意ですが、境界ケースや異常なシナリオを見落としがちです — まさに深刻なバグが潜む場所です。安全な公式：AIのケース一式を『草案』として扱い、常に『まだない奇妙な/悪いケースは？』と自問し、実行前に追加しましょう。"),
      IMG(m_table, "Nhắc lại: AI hỗ trợ sinh case nháp nhanh, còn ca biên/thực tế luôn cần Tester bổ sung", "Reminder: AI helps draft cases quickly, edge/real cases still need the tester to add", "再確認：AIは草案ケースを速く助けるが、境界/実際のケースは常にテスターの追加が必要"),
      RECAP(["AI thường mạnh ở happy path, yếu ở ca biên/bất thường", "Luôn coi bộ case của AI là bản nháp, tự bổ sung trước khi dùng"],
        ["AI is often strong at happy paths, weak at edge/unusual cases", "Always treat AI's case set as a draft, add to it before use"],
        ["AIはハッピーパスに強いが境界/異常ケースに弱いことが多い", "AIのケース一式は常に草案として扱い、使う前に自分で追加する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: AI gợi ý sai mức ưu tiên của một lỗi", en: "7. Situation 2: AI mis-suggests a bug's priority", ja: "7. シーン2：AIがバグの優先度を誤って提案" },
    blocks: [
      SITUATION("Trợ lý AI trong bug tracker gợi ý ticket HD-2210 (AI trả lời sai bước quên mật khẩu) chỉ ở mức 'Medium'.", "The bug tracker's AI assistant suggests ticket HD-2210 (AI replies with wrong password-reset steps) is only 'Medium' priority.",
        "AI đánh giá dựa trên từ khoá trong tiêu đề, không biết rằng lỗi này khiến khách hàng KHÔNG THỂ đăng nhập lại — ảnh hưởng trực tiếp tới trải nghiệm cốt lõi của sản phẩm.",
        "AI scores it based on keywords in the title, not knowing this bug means customers CANNOT log back in — directly affecting the product's core experience.",
        "バグ管理ツールのAIアシスタントがチケットHD-2210（AIがパスワード再設定の手順を誤って返信）を『Medium』としか提案しなかった。",
        "AIはタイトルのキーワードを基に評価しており、このバグが顧客を再ログイン不可能にすることを知らない — 製品のコア体験に直接影響します。"),
      SOLVE("Tự nâng mức ưu tiên lên 'High', ghi rõ lý do (ảnh hưởng tới luồng đăng nhập cốt lõi) để lập trình viên và leader hiểu ngay.", "Manually raise the priority to 'High' and note the reason (affects the core login flow) so developers and the leader understand right away.", "自分で優先度を『High』へ引き上げ、理由（コアなログインフローへの影響）を明記し、開発者やリーダーがすぐ理解できるようにする。"),
      P("Nhiều người mới ngại 'cãi lại' gợi ý của AI vì nghĩ AI khách quan hơn con người. Nhưng AI chỉ nhìn thấy chữ trong ticket, còn bạn — tester — hiểu được tác động thật của lỗi tới người dùng và nghiệp vụ. Khi thấy gợi ý của AI không khớp thực tế, việc của bạn là điều chỉnh lại và ghi rõ lý do, không phải im lặng làm theo.",
        "Many beginners hesitate to 'disagree' with AI's suggestion, thinking AI is more objective than a human. But AI only sees the words in the ticket, while you — the tester — understand the bug's real impact on users and the business. When AI's suggestion doesn't match reality, your job is to adjust it and note why, not silently go along with it.",
        "多くの初心者はAIの提案に『逆らう』ことをためらいます、AIの方が人間より客観的だと思うからです。しかしAIはチケット内の文字しか見ておらず、あなた—テスター—はバグがユーザーと業務に与える実際の影響を理解しています。AIの提案が実態と合わない時、あなたの仕事はそれを調整し理由を明記することであり、黙って従うことではありません。"),
      IMG(m_jira, "Ticket sau khi Tester điều chỉnh: mức ưu tiên đúng thực tế, ghi rõ lý do so với gợi ý AI", "The ticket after the tester's adjustment: priority matching reality, reason noted vs. the AI suggestion", "テスターが調整後のチケット：実態に合った優先度、AI提案との違いの理由を明記"),
      TRY("Viết một câu ghi chú giải thích vì sao bạn nâng mức ưu tiên của HD-2210 lên High (gợi ý: nhắc tới việc khách hàng không đăng nhập lại được).", "Write a note explaining why you raised HD-2210's priority to High (hint: mention the customer being unable to log back in).", "HD-2210の優先度をHighに上げた理由を説明するメモを書こう（ヒント：顧客が再ログインできないことに触れる）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & theo dõi hiệu quả AI hỗ trợ", en: "8. Recording & tracking how much AI helps", ja: "8. AI支援の効果を記録・追跡する" },
    blocks: [
      P("Để biết AI có thực sự giúp ích hay không, đội của bạn nên theo dõi vài số liệu đơn giản mỗi tuần thay vì chỉ 'cảm thấy nhanh hơn'.",
        "To know whether AI is truly helping, your team should track a few simple numbers each week instead of just 'feeling faster'.",
        "AIが本当に役立っているかを知るには、チームは『速く感じる』だけでなく、毎週いくつかの簡単な数値を追跡すべきです。"),
      STEP(1, "Đếm số case AI gợi ý và số case tester thực sự giữ lại sau khi rà soát — tỉ lệ này cho biết AI 'hợp gu' đến đâu.", "Count how many cases AI suggests versus how many the tester actually keeps after review — this ratio shows how well AI fits.", "AIが提案したケース数と、見直し後にテスターが実際に残したケース数を数える — この比率がAIの適合度を示す。"),
      STEP(2, "Ghi lại số lần AI gợi ý sai (mức ưu tiên sai, case thiếu thực tế) để cả đội biết giới hạn hiện tại của AI.", "Log how often AI suggests something wrong (wrong priority, unrealistic cases) so the team knows AI's current limits.", "AIが誤って提案した回数（誤った優先度、非現実的なケース）を記録し、チームがAIの現在の限界を把握する。"),
      CODE("text", "BÁO CÁO NHANH — AI hỗ trợ kiểm thử — HelpDeskly — Tuần 12\nCase AI gợi ý: 86 | Tester giữ lại: 61 (71%) | Bổ sung thêm: 14 ca biên\nGợi ý ưu tiên đúng: 22/26 ticket | Gợi ý sai cần điều chỉnh: 4 (vd HD-2210: Medium -> High)\nGhi chú: AI vẫn yếu ở ticket có nhiều yêu cầu trong 1 câu -> cần tester đọc kỹ."),
      IMG(m_dash, "Bảng số liệu nhanh: case AI gợi ý, case giữ lại, lỗi phát hiện sớm, cảnh báo sai", "A quick metrics panel: AI-suggested cases, kept cases, early-caught bugs, false alarms", "簡易メトリクス：AI提案ケース・採用ケース・早期発見バグ・誤警告"),
      IMG(m_table, "Nhắc lại bảng phân việc AI/Tester để đối chiếu khi ghi nhận số liệu", "Reminder of the AI/tester task table to compare against when logging metrics", "数値記録時に照らし合わせるAI/テスター役割分担表の再確認"),
      TIP("Đừng chỉ nhìn số case AI gợi ý được — hãy nhìn tỉ lệ case ĐƯỢC GIỮ LẠI sau rà soát, đó mới là thước đo AI có thực sự hữu ích.", "Don't just look at how many cases AI suggested — look at the ratio of cases KEPT after review, that's the real measure of whether AI is genuinely useful.", "AIが提案したケース数だけでなく、見直し後に『採用された』ケースの比率を見る — それこそがAIが本当に役立っているかの尺度。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi bắt đầu dùng AI trong công việc kiểm thử. Biết trước giúp bạn dùng công cụ này an toàn và hiệu quả hơn.",
        "Beginners often stumble on a few common mistakes when starting to use AI in testing work. Knowing them in advance helps you use the tool more safely and effectively.",
        "初心者はテスト業務でAIを使い始める際、共通の失敗をしがちです。事前に知れば、このツールをより安全かつ効果的に使えます。"),
      PITFALL("Copy nguyên bộ case/kết luận của AI vào bộ test chính thức mà không rà soát lại — dễ bỏ lọt ca biên và lỗi nghiêm trọng.", "Copying AI's cases/conclusions straight into the official test set without reviewing — easily lets edge cases and serious bugs slip through.", "AIのケース/結論を見直さずそのまま正式なテストセットにコピーする — 境界ケースや深刻なバグを見逃しやすい。"),
      PITFALL("Dán thông tin nhạy cảm của khách hàng (mật khẩu, số thẻ, dữ liệu cá nhân) vào công cụ AI công cộng để hỏi — vi phạm bảo mật dữ liệu.", "Pasting sensitive customer information (passwords, card numbers, personal data) into a public AI tool to ask a question — a data-security violation.", "顧客の機密情報（パスワード、カード番号、個人データ）を公開AIツールに貼り付けて質問する — データセキュリティ違反。"),
      TIP("Luôn coi kết quả AI đưa ra là 'gợi ý cần xác nhận', không phải 'kết luận cuối cùng' — thói quen này bảo vệ bạn khỏi phần lớn rủi ro khi dùng AI.", "Always treat AI's output as 'a suggestion to confirm', not 'a final conclusion' — this habit protects you from most of the risks of using AI.", "AIの出力を常に『確認が必要な提案』として扱い、『最終結論』としない — この習慣がAI利用の大半のリスクから守ってくれる。"),
      IMG(m_table, "Nhắc lại: mỗi việc AI hỗ trợ đều đi kèm phần việc Tester phải tự xác nhận", "Reminder: every task AI helps with still comes with a part the tester must confirm", "再確認：AIが助けるどの作業にも、テスターが自ら確認すべき部分が伴う"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa làm quen với AI trong kiểm thử qua app SaaS HelpDeskly: hiểu AI là trợ lý gợi ý (test case, log, mức ưu tiên) chứ không phải người ra quyết định cuối, thấy AI có thể sai ở ca biên và ngữ cảnh nghiệp vụ, và học cách tự rà soát, điều chỉnh, ghi nhận trước khi tin dùng. Đây là kỹ năng nền tảng ngày càng quan trọng với mọi tester trong thời đại AI.",
        "You've just gotten familiar with AI in testing through the SaaS app HelpDeskly: understanding AI as a suggesting assistant (test cases, logs, priority) rather than the final decision-maker, seeing how AI can be wrong on edge cases and business context, and learning to review, adjust, and record before trusting it. This is a foundational skill that matters more and more for every tester in the AI era.",
        "SaaSアプリHelpDesklyを通じてテストにおけるAIに親しみました：AIは提案する助手（テストケース、ログ、優先度）であり最終決定者ではないと理解し、AIが境界ケースや業務文脈で間違い得ることを見て、信頼する前に見直し・調整・記録する方法を学びました。これはAI時代のすべてのテスターにとってますます重要になる土台スキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thêm cách viết prompt rõ ràng cho AI, học cách phân tích log thực tế, và tìm hiểu sâu hơn các kỹ thuật thiết kế test case để bổ sung đúng chỗ AI hay bỏ sót. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật (bao gồm cả cách dùng AI hỗ trợ công việc hằng ngày), một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, practice writing clearer prompts for AI, learn to analyze real logs, and dig deeper into test-case design techniques to fill in exactly where AI tends to miss. If you want to learn properly from zero to hired with a mentor and real projects (including how to use AI in daily work), a Tester course helps you progress fast and apply with confidence.",
        "次は、AIへのより明確なプロンプトの書き方を練習し、実際のログ分析を学び、AIが見落としがちな部分を正確に補うテストケース設計技法をさらに深めましょう。指導者と実際の案件（日々の業務でのAI活用法を含む）でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const CNM_BEG_AI = makeDoc({
  slug: "ai-trong-kiem-thu-cho-nguoi-moi",
  domain: "saas",
  primaryKeyword: "AI trong kiểm thử",
  keywords: ["AI trong kiểm thử", "AI cho tester", "AI hỗ trợ kiểm thử phần mềm", "AI test case", "AI trong testing cho người mới"],
  coverLabel: "NGƯỜI MỚI · AI TRONG KIỂM THỬ · SAAS",
  crumb: "AI trong kiểm thử cho người mới",
  metaTitle: { vi: "AI trong kiểm thử cho người mới bắt đầu", en: "AI in software testing for beginners", ja: "初心者向けソフトウェアテストのAI活用" },
  metaDescription: {
    vi: "AI trong kiểm thử cho người mới: AI gợi ý test case, tóm tắt log, đề xuất ưu tiên lỗi qua app SaaS thực tế, nên bắt đầu học từ đâu, có hình và trắc nghiệm.",
    en: "AI in testing for beginners: how AI suggests test cases, summarizes logs, and proposes bug priority via a real SaaS app, where to start learning, with visuals and a quiz.",
    ja: "初心者向けAIテスト入門：実際のSaaSアプリでAIがテストケース提案・ログ要約・バグ優先度提案をどう助けるか、学習の始め方を図とクイズ付きで解説。",
  },
  title: {
    vi: "AI trong kiểm thử cho người mới: AI giúp Tester như thế nào & bắt đầu từ đâu (có trắc nghiệm)",
    en: "AI in testing for beginners: how AI helps testers & where to start (with quiz)",
    ja: "初心者のためのソフトウェアテストAI入門：テスターをどう助けるか・どこから始めるか（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: hiểu AI trong kiểm thử qua app SaaS hỗ trợ khách hàng HelpDeskly. Cách AI gợi ý test case, phân tích log, đề xuất mức ưu tiên lỗi; vì sao AI vẫn cần Tester rà soát, xử lý tình huống AI thiếu ca biên hoặc gợi ý sai ưu tiên, nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: understand AI in testing through the customer-support SaaS app HelpDeskly. How AI suggests test cases, analyzes logs, proposes bug priority; why AI still needs tester review, handling situations where AI misses edge cases or mis-suggests priority, many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：顧客サポートSaaSアプリHelpDesklyでテストにおけるAIを理解。AIがテストケースを提案し、ログを分析し、バグ優先度を提案する方法。AIがなぜテスターの見直しを必要とするか、AIが境界ケースを見落とす/優先度を誤る場面の対処、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách bắt đầu dùng AI hỗ trợ công việc kiểm thử", steps: [
    { name: "Mô tả tính năng rõ ràng cho AI", text: "Nêu mục đích, dữ liệu đầu vào, kết quả mong đợi để AI gợi ý sát hơn." },
    { name: "Rà soát và bổ sung ca biên", text: "Đọc kỹ gợi ý của AI, thêm case biên/thực tế mà AI hay bỏ sót." },
    { name: "Xác nhận trước khi dùng chính thức", text: "Chỉ đưa vào bộ test/ticket chính thức sau khi tester đã xác nhận." },
  ] },
  pages,
});

export const CNM_BEG_AI_01 = [CNM_BEG_AI];
