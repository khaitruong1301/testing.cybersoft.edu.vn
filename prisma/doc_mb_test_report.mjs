// doc_mb_test_report.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Cách viết báo cáo kết quả kiểm thử (Test Summary Report) — tổng kết CẢ MỘT ĐỢT test:
// phạm vi, số ca pass/fail/blocked, lỗi theo mức độ nghiêm trọng, độ phủ, rủi ro còn lại,
// kết luận nên/không nên release. Khác với bug report (1 lỗi) — test summary report tổng kết
// cả đợt. Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình báo cáo tổng kết đợt test — phần header của tài liệu ──
const m_screen = browser("shopeasy-qa.internal/reports/sprint-15", [
  panel("ShopEasy QA · Test Summary Report", [
    field(24, 20, 330, "Dự án / Module", "ShopEasy - Website TMĐT", "normal"),
    field(372, 20, 330, "Đợt kiểm thử (Sprint)", "Sprint 15 (17/06 - 30/06)", "normal"),
    field(24, 92, 330, "Người viết báo cáo", "Mai Tran - QA Lead", "normal"),
    field(372, 92, 330, "Kết luận đề xuất", "KHONG NEN RELEASE", "focus"),
    btn(24, 168, 240, "Xem chi tiết báo cáo", "primary"),
    annotate(368, 12, 330, 62, "Trọng tâm: câu trả lời rõ cho sếp"),
  ].join(""), { h: 260, accent: "#0d9488" }),
].join(""), { h: 316, title: "ShopEasy · QA", accent: "#0d9488" });

// ── Mockup 2: mẫu Test Summary Report đầy đủ (grid nhiều dòng chỉ số) ──
const m_template = grid("Mẫu Test Summary Report đầy đủ — Sprint 15 ShopEasy", ["Mục", "Nội dung mẫu"], [
  ["Phạm vi kiểm thử", "Module Đăng ký, Giỏ hàng, Thanh toán, Vận chuyển (chưa gồm module Đánh giá SP)"],
  ["Tổng số ca kiểm thử", "182 ca đã lên kế hoạch cho sprint này"],
  ["Kết quả", "Pass 150 · Fail 21 · Blocked 11"],
  ["Lỗi theo mức độ nghiêm trọng", "Critical 2 · High 6 · Medium 9 · Low 4"],
  ["Độ phủ (coverage)", "92% ca đã chạy / kế hoạch; module Thanh toán mới đạt 78%"],
  ["Rủi ro còn tồn đọng", "2 lỗi Critical chưa fix ở luồng thanh toán VNPay"],
  ["Kết luận đề xuất", "KHÔNG NÊN RELEASE cho tới khi fix xong 2 lỗi Critical"],
], { accent: "#0d9488" });

// ── Mockup 3: dashboard kết quả pass/fail/blocked + lỗi theo mức độ nghiêm trọng ──
const m_dash_result = dashboard("Kết quả đợt test & lỗi theo mức độ — Sprint 15", [
  { label: "Pass", value: "150", sub: "82% tổng ca", color: "#16a34a" },
  { label: "Fail", value: "21", sub: "12% tổng ca", color: "#dc2626" },
  { label: "Blocked", value: "11", sub: "6% tổng ca", color: "#f59e0b" },
  { label: "Lỗi Critical/High", value: "8", sub: "2 Critical còn mở", color: "#7c3aed" },
]);

// ── Mockup 4: biểu đồ độ phủ kiểm thử theo module ──
const m_coverage = grid("Độ phủ kiểm thử theo module — Sprint 15", ["Module", "Ca kế hoạch", "Ca đã chạy", "% độ phủ"], [
  ["Đăng ký / Đăng nhập", "34", "34", "100%"],
  ["Giỏ hàng", "46", "46", "100%"],
  ["Thanh toán", "58", "45", "78%"],
  ["Vận chuyển", "44", "42", "95%"],
], { accent: "#0d9488", note: "Module Thanh toán có độ phủ thấp nhất — cần ưu tiên chạy nốt trước khi release." });

// ── Mockup 5: bảng kanban theo dõi trạng thái đợt test (giống Jira board) ──
const m_kanban = kanban("Trạng thái đợt test — ShopEasy Sprint 15", [
  { name: "Chưa test", cards: [{ key: "SE-T041", title: "Thanh toán qua ví MoMo", sev: "High" }] },
  { name: "Đang test", cards: [{ key: "SE-T038", title: "Thanh toán qua VNPay", sev: "Critical" }] },
  { name: "Blocked", cards: [{ key: "SE-T029", title: "Tính phí vận chuyển ngoại tỉnh", sev: "Medium" }] },
  { name: "Đã xong", cards: [
    { key: "SE-T012", title: "Đăng ký / Đăng nhập", sev: "Low" },
    { key: "SE-T020", title: "Giỏ hàng", sev: "Low" },
  ] },
]);

// ── Mockup 6: bảng so sánh Test Summary Report SƠ SÀI vs ĐẦY ĐỦ ──
const m_compare = grid("Test Summary Report SƠ SÀI vs ĐẦY ĐỦ", ["Tiêu chí", "Report SƠ SÀI (kém)", "Report ĐẦY ĐỦ (tốt)"], [
  ["Kết quả", "'Đã test xong module thanh toán'", "'Pass 45/58 ca (78%), Fail 8, Blocked 5'"],
  ["Lỗi nghiêm trọng", "Không nhắc tới lỗi nào", "Liệt kê rõ 2 lỗi Critical còn mở, kèm link ticket"],
  ["Độ phủ", "Không đề cập", "92% tổng thể, module Thanh toán chỉ 78%"],
  ["Kết luận", "Không có / mơ hồ 'tạm ổn'", "Đề xuất rõ NÊN hay KHÔNG NÊN release"],
], { accent: "#0d9488" });

// ── Mockup 7: ticket Jira của lỗi Critical bị bỏ sót khỏi báo cáo tuần trước ──
const m_jira = jira({
  key: "SE-11305", title: "Thanh toán VNPay: đơn hàng bị trừ tiền 2 lần khi mạng chập chờn",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Chọn thanh toán VNPay 3) Ngắt mạng ngay khi bấm 'Xác nhận' 4) Bật lại mạng"],
    ["Kết quả mong đợi", "Chỉ trừ tiền 1 lần, hoặc tự động hoàn tiền nếu giao dịch lỗi"],
    ["Kết quả thực tế", "Tài khoản bị trừ tiền 2 lần cho cùng 1 đơn hàng"],
    ["Trạng thái trong báo cáo", "KHÔNG được nhắc tới trong Test Summary Report tuần trước"],
  ],
});

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Test Summary Report (báo cáo kết quả kiểm thử) là gì?",
  "What is a Test Summary Report?",
  "Test Summary Report là bản tổng kết TOÀN BỘ một đợt kiểm thử (ví dụ 1 sprint hay 1 release): phạm vi đã test, tổng số ca và tỉ lệ pass/fail/blocked, lỗi tìm được phân theo mức độ nghiêm trọng, độ phủ kiểm thử, rủi ro còn tồn đọng, và kết luận đề xuất nên hay không nên release. Nó giúp người không trực tiếp test (PM, sếp, khách hàng) ra quyết định nhanh mà không cần đọc từng ca kiểm thử.",
  "A Test Summary Report summarizes an ENTIRE test cycle (e.g. one sprint or release): the scope tested, total cases with pass/fail/blocked rates, bugs found broken down by severity, test coverage, remaining risks, and a clear release recommendation. It lets people who didn't test directly (PM, manager, client) make a fast decision without reading every single test case.",
  "テストサマリーレポート（テスト結果報告書）とは？",
  "テストサマリーレポートは、1つのテストサイクル全体（例：1スプリントや1リリース）をまとめたものです。テスト範囲、合計ケース数とPass/Fail/Blockedの割合、深刻度別に分類したバグ、テストカバレッジ、残存リスク、そしてリリースすべきかどうかの明確な提案を含みます。直接テストしていない人（PM、上司、顧客）が各テストケースを読まずに素早く判断できるようにするためのものです。");
const faq2 = FAQ(
  "Test Summary Report khác Bug Report ở điểm nào?",
  "How does a Test Summary Report differ from a bug report?",
  "Bug Report ghi lại MỘT lỗi cụ thể (các bước tái hiện, kết quả mong đợi/thực tế của một tình huống). Test Summary Report tổng kết CẢ MỘT ĐỢT kiểm thử gồm nhiều ca, nhiều lỗi — nó không đi sâu vào chi tiết từng lỗi mà cho bức tranh tổng thể: bao nhiêu ca pass/fail, còn bao nhiêu lỗi nghiêm trọng, độ phủ tới đâu, và có nên release không. Một bug report là một viên gạch; test summary report là bức tường xây từ hàng trăm viên gạch đó.",
  "A bug report records ONE specific defect (repro steps, expected vs actual result for one situation). A Test Summary Report summarizes an ENTIRE test cycle covering many cases and many bugs — it doesn't dive into each defect's detail but gives the big picture: how many cases passed/failed, how many serious bugs remain, how much coverage was achieved, and whether to release. A bug report is one brick; a test summary report is the wall built from hundreds of those bricks.",
  "テストサマリーレポートはバグレポートとどう違う？",
  "バグレポートは1件の具体的な不具合（再現手順、期待結果と実際の結果）を記録します。テストサマリーレポートは多数のケースと多数のバグを含むテストサイクル全体をまとめたものです——個々の不具合の詳細には踏み込まず、Pass/Fail件数、残存する重大バグの数、達成したカバレッジ、リリースすべきかどうかという全体像を示します。バグレポートが1つのレンガなら、テストサマリーレポートはそのレンガ数百個で作られた壁です。");
const faq3 = FAQ(
  "Test Summary Report nên có bao nhiêu phần / cần dài bao nhiêu?",
  "How many sections should a Test Summary Report have, and how long?",
  "Không cần dài, nhưng cần ĐỦ các phần cốt lõi: phạm vi kiểm thử, số liệu pass/fail/blocked, lỗi theo mức độ nghiêm trọng, độ phủ, rủi ro còn tồn đọng, và kết luận đề xuất release. Một báo cáo tốt cho sếp đọc trong 2-3 phút mà vẫn đủ hiểu để ra quyết định, thay vì viết dài dòng cảm tính mà thiếu số liệu cụ thể.",
  "It doesn't need to be long, but it must cover the core sections: test scope, pass/fail/blocked figures, bugs by severity, coverage, remaining risks, and a release recommendation. A good report lets a manager read it in 2-3 minutes and still understand enough to decide, instead of a long, vague write-up lacking concrete numbers.",
  "テストサマリーレポートはどれくらいの項目数・長さが必要？",
  "長さは必要ありませんが、核となる項目——テスト範囲、Pass/Fail/Blockedの数値、深刻度別バグ、カバレッジ、残存リスク、リリース提案——は必ず含める必要があります。良いレポートは上司が2〜3分で読んで判断できるものであり、具体的な数値のない長々とした曖昧な文章ではありません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Test Summary Report tổng kết điều gì?", en: "What does a Test Summary Report summarize?", ja: "テストサマリーレポートは何をまとめる？" },
    options: [
      { vi: "Toàn bộ một đợt kiểm thử: phạm vi, kết quả pass/fail/blocked, lỗi theo mức độ, độ phủ và kết luận", en: "An entire test cycle: scope, pass/fail/blocked results, bugs by severity, coverage and a conclusion", ja: "テストサイクル全体：範囲、Pass/Fail/Blocked結果、深刻度別バグ、カバレッジ、結論" },
      { vi: "Chỉ một lỗi cụ thể kèm các bước tái hiện", en: "Only one specific defect with repro steps", ja: "1件の具体的な不具合とその再現手順のみ" },
      { vi: "Danh sách công việc cần làm trong ngày của tester", en: "A tester's daily to-do list", ja: "テスターの1日のToDoリスト" },
      { vi: "Lịch họp của nhóm QA", en: "The QA team's meeting schedule", ja: "QAチームの会議スケジュール" },
    ], correct: 0,
    explain: { vi: "Test Summary Report cho bức tranh tổng thể của cả đợt test, không phải một lỗi hay một cuộc họp.", en: "A Test Summary Report gives the big picture of the whole test cycle, not one bug or one meeting.", ja: "テストサマリーレポートはテストサイクル全体の全体像を示すもので、1件のバグや会議のことではありません。" },
  }),
  mcq({
    q: { vi: "Khác biệt chính giữa Test Summary Report và Bug Report là gì?", en: "What is the main difference between a Test Summary Report and a bug report?", ja: "テストサマリーレポートとバグレポートの主な違いは？" },
    options: [
      { vi: "Không có khác biệt, hai loại giống hệt nhau", en: "There is no difference, they are identical", ja: "違いはなく、まったく同じもの" },
      { vi: "Bug report ghi 1 lỗi cụ thể; test summary report tổng kết cả đợt test gồm nhiều ca/lỗi", en: "A bug report records one specific defect; a test summary report summarizes a whole cycle with many cases/bugs", ja: "バグレポートは1件の不具合を記録し、テストサマリーレポートは多数のケース/バグを含むサイクル全体をまとめる" },
      { vi: "Test summary report chỉ dành cho lập trình viên đọc", en: "A test summary report is meant only for developers to read", ja: "テストサマリーレポートは開発者だけが読むもの" },
      { vi: "Bug report luôn dài hơn test summary report", en: "A bug report is always longer than a test summary report", ja: "バグレポートは常にテストサマリーレポートより長い" },
    ], correct: 1,
    explain: { vi: "Bug report = 1 lỗi; test summary report = tổng kết toàn bộ đợt test.", en: "A bug report covers one defect; a test summary report summarizes the entire test cycle.", ja: "バグレポート＝1件の不具合、テストサマリーレポート＝テストサイクル全体のまとめ。" },
  }),
  mcq({
    q: { vi: "Trong Test Summary Report, 'Blocked' nghĩa là gì?", en: "In a Test Summary Report, what does 'Blocked' mean?", ja: "テストサマリーレポートで『Blocked』とは何を意味する？" },
    options: [
      { vi: "Ca kiểm thử đã chạy và cho kết quả đúng như mong đợi", en: "The test case ran and gave the expected result", ja: "テストケースが実行され期待どおりの結果になった" },
      { vi: "Ca kiểm thử đã chạy và phát hiện lỗi", en: "The test case ran and found a defect", ja: "テストケースが実行されバグが見つかった" },
      { vi: "Ca kiểm thử KHÔNG THỂ chạy được do một điều kiện/lỗi khác đang cản trở", en: "The test case CANNOT be executed because another condition/defect is blocking it", ja: "他の条件やバグが妨げているためテストケースを実行できない" },
      { vi: "Ca kiểm thử bị xoá khỏi kế hoạch", en: "The test case was removed from the plan", ja: "テストケースが計画から削除された" },
    ], correct: 2,
    explain: { vi: "Blocked là ca không chạy được vì bị chặn bởi điều kiện tiên quyết hoặc lỗi khác, khác với Pass/Fail.", en: "Blocked means the case couldn't run because a precondition or another defect blocks it — different from Pass/Fail.", ja: "Blockedは前提条件や他のバグに阻まれて実行できなかったケースを指し、Pass/Failとは異なります。" },
  }),
  mcq({
    q: { vi: "Vì sao báo cáo chỉ ghi 'đã test xong' là không đủ?", en: "Why is a report that only says 'testing is done' not enough?", ja: "『テスト完了』とだけ書かれたレポートが不十分な理由は？" },
    options: [
      { vi: "Vì câu đó quá dài", en: "Because the sentence is too long", ja: "その文が長すぎるから" },
      { vi: "Vì không cho biết số liệu pass/fail/blocked, lỗi còn tồn đọng hay độ phủ để người đọc ra quyết định release", en: "Because it doesn't give pass/fail/blocked figures, remaining bugs, or coverage for the reader to decide on release", ja: "Pass/Fail/Blockedの数値、残存バグ、カバレッジが分からず、読者がリリース判断できないから" },
      { vi: "Vì sếp không thích đọc tiếng Việt", en: "Because managers dislike reading Vietnamese", ja: "上司がベトナム語を読むのを嫌うから" },
      { vi: "Vì phải viết bằng tiếng Anh mới đúng chuẩn", en: "Because it must be written in English to be correct", ja: "英語で書かなければ正しくないから" },
    ], correct: 1,
    explain: { vi: "Một câu chung chung không giúp người đọc tự kiểm chứng hay ra quyết định — cần số liệu và kết luận rõ ràng.", en: "A vague sentence doesn't let the reader verify or decide anything — clear figures and a conclusion are needed.", ja: "曖昧な一文では読者が確認したり判断したりできません——明確な数値と結論が必要です。" },
  }),
  mcq({
    q: { vi: "Một Test Summary Report tốt cần thể hiện rõ điều gì ở phần kết luận?", en: "What should a good Test Summary Report clearly state in its conclusion?", ja: "良いテストサマリーレポートの結論部分に明記すべきことは？" },
    options: [
      { vi: "Chỉ cần ghi 'tạm ổn' là đủ", en: "Just writing 'seems fine' is enough", ja: "『まあまあ』とだけ書けば十分" },
      { vi: "Không cần kết luận, để sếp tự quyết", en: "No conclusion needed, let the manager decide alone", ja: "結論は不要で、上司に判断を委ねればよい" },
      { vi: "Đề xuất rõ ràng NÊN hay KHÔNG NÊN release, dựa trên số liệu và rủi ro còn lại", en: "A clear recommendation on whether to release or not, based on figures and remaining risk", ja: "数値と残存リスクに基づき、リリースすべきかどうかを明確に提案すること" },
      { vi: "Danh sách tất cả email của nhóm QA", en: "A list of every QA team member's email", ja: "QAチーム全員のメールアドレス一覧" },
    ], correct: 2,
    explain: { vi: "Kết luận là phần quan trọng nhất giúp sếp ra quyết định nhanh — phải rõ ràng, có căn cứ số liệu.", en: "The conclusion is the most important part for a fast decision — it must be clear and backed by figures.", ja: "結論は迅速な判断のために最も重要な部分であり、数値に基づき明確でなければなりません。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & báo cáo bạn sẽ viết", en: "1. TL;DR & the report you'll write", ja: "1. 要点と書くレポート" },
    blocks: [
      TLDR("Test Summary Report (báo cáo kết quả kiểm thử) là bản tổng kết CẢ MỘT ĐỢT kiểm thử — khác hẳn bug report vốn chỉ ghi lại MỘT lỗi. Bài này dùng ví dụ Sprint 15 của app TMĐT ShopEasy để chỉ bạn cách viết đủ 6 phần cốt lõi: phạm vi, số ca pass/fail/blocked, lỗi theo mức độ nghiêm trọng, độ phủ kiểm thử, rủi ro còn tồn đọng, và kết luận nên hay không nên release. Có nhiều mockup báo cáo/dashboard thật và trắc nghiệm cuối bài.",
        "A Test Summary Report summarizes an ENTIRE test cycle — unlike a bug report, which records only ONE defect. This article uses ShopEasy e-commerce app's Sprint 15 to show you how to write all 6 core sections: scope, pass/fail/blocked counts, bugs by severity, test coverage, remaining risks, and a release recommendation. Includes real report/dashboard mockups and a quiz at the end.",
        "テストサマリーレポート（テスト結果報告書）は、テストサイクル全体をまとめたものです——1件の不具合だけを記録するバグレポートとは異なります。本記事はECアプリShopEasyのSprint 15を例に、6つの核となる項目——範囲、Pass/Fail/Blocked件数、深刻度別バグ、テストカバレッジ、残存リスク、リリース提案——の書き方を紹介します。実際のレポート/ダッシュボードのモックが豊富で、最後にクイズ付きです。"),
      P("Chào bạn mới! Bạn đã học cách viết ca kiểm thử, cách viết bug report cho từng lỗi — nhưng cuối mỗi đợt kiểm thử (sprint, đợt regression, hay trước khi release), bạn còn cần một tài liệu khác: Test Summary Report. Đây là nơi bạn tổng kết LẠI TOÀN BỘ những gì đã test, kết quả ra sao, còn lỗi gì nguy hiểm, và quan trọng nhất — liệu sản phẩm có sẵn sàng để release hay chưa. Nhiều bạn mới thường bỏ qua bước này hoặc viết vài dòng chung chung, khiến sếp và PM không có đủ thông tin để ra quyết định.",
        "Hi, newcomer! You've learned to write test cases and bug reports for individual defects — but at the end of every test cycle (a sprint, a regression pass, or right before a release), you need another document: the Test Summary Report. This is where you sum up EVERYTHING tested, how it went, what dangerous bugs remain, and most importantly — whether the product is ready to release. Many beginners skip this step or write a few vague lines, leaving managers and PMs without enough information to decide.",
        "こんにちは、初心者さん！あなたはすでにテストケースの書き方や、個々の不具合に対するバグレポートの書き方を学びました——しかし各テストサイクル（スプリント、リグレッション、リリース直前など）の終わりには、もう1つの文書が必要です：テストサマリーレポートです。ここでテストした内容すべて、結果、残っている危険なバグ、そして最も重要な——製品がリリースできる状態かどうかをまとめます。多くの初心者はこの工程を省略したり、曖昧な数行だけ書いたりして、上司やPMが判断に必要な情報を得られなくなります。"),
      IMG(m_screen, "Màn hình báo cáo: header của Test Summary Report — Sprint 15 ShopEasy", "Report screen: a Test Summary Report header — ShopEasy Sprint 15", "レポート画面：テストサマリーレポートのヘッダー — ShopEasy Sprint 15"),
      DEF("Test Summary Report", "bản tổng kết cả một đợt kiểm thử: phạm vi, kết quả pass/fail/blocked, lỗi theo mức độ nghiêm trọng, độ phủ, rủi ro còn lại và kết luận đề xuất release.",
        "a summary of an entire test cycle: scope, pass/fail/blocked results, bugs by severity, coverage, remaining risks, and a release recommendation.",
        "テストサイクル全体をまとめた文書：範囲、Pass/Fail/Blocked結果、深刻度別バグ、カバレッジ、残存リスク、リリース提案。"),
    ] },
  { heading: { vi: "2. Test Summary Report khác Bug Report thế nào", en: "2. Test Summary Report vs bug report — how they differ", ja: "2. テストサマリーレポートとバグレポートの違い" },
    blocks: [
      P("Cách dễ nhớ nhất: bug report trả lời 'MỘT thứ gì đó sai ở đâu, tái hiện ra sao', còn test summary report trả lời 'CẢ ĐỢT kiểm thử này diễn ra thế nào, có nên release hay không'. Một bug report tập trung vào chi tiết kỹ thuật của một tình huống lỗi cụ thể (các bước, môi trường, kết quả mong đợi/thực tế). Test summary report thì lùi ra xa hơn, nhìn tổng thể: bao nhiêu phần trăm ca pass, còn bao nhiêu lỗi nghiêm trọng, độ phủ đạt bao nhiêu.",
        "The easiest way to remember: a bug report answers 'what specifically is wrong, and how do I reproduce it', while a test summary report answers 'how did this whole test cycle go, and should we release'. A bug report focuses on the technical detail of one specific failure (steps, environment, expected vs actual). A test summary report steps back and looks at the whole picture: what percentage of cases passed, how many serious bugs remain, what coverage was achieved.",
        "覚え方：バグレポートは『具体的に何がどう間違っていて、どう再現するか』に答え、テストサマリーレポートは『このテストサイクル全体はどうだったか、リリースすべきか』に答えます。バグレポートは1つの具体的な不具合の技術的詳細（手順、環境、期待結果と実際の結果）に焦点を当てます。テストサマリーレポートは一歩引いて全体像を見ます：Pass率は何％か、重大バグはいくつ残っているか、カバレッジはどこまで達成したか。"),
      P("Vì mục đích khác nhau nên người đọc cũng khác nhau. Bug report chủ yếu dành cho lập trình viên (để họ fix đúng lỗi) và tester khác (để họ verify lại). Test summary report dành cho những người KHÔNG trực tiếp code hay test: Project Manager, khách hàng, sếp — những người cần một bức tranh tổng thể để quyết định có release hay không, mà không có thời gian đọc từng bug report. Đây là lý do vì sao test summary report cần ngắn gọn, có số liệu rõ ràng, và một kết luận dứt khoát.",
        "Because their purposes differ, their readers differ too. A bug report is mainly for developers (to fix the exact defect) and other testers (to verify the fix). A test summary report is for people who don't code or test directly: the Project Manager, the client, a manager — people who need the big picture to decide on release, without time to read every bug report. That's why a test summary report must be concise, data-driven, and end with a firm conclusion.",
        "目的が異なれば読者も異なります。バグレポートは主に開発者（正しく修正するため）と他のテスター（修正を検証するため）向けです。テストサマリーレポートはコードもテストも直接行わない人——プロジェクトマネージャー、顧客、上司——向けであり、彼らは各バグレポートを読む時間がなく、リリース判断に必要な全体像を求めています。だからこそテストサマリーレポートは簡潔で、数値に基づき、明確な結論で締めくくる必要があります。"),
      DEF("Bug Report", "tài liệu ghi lại một lỗi cụ thể: các bước tái hiện, kết quả mong đợi và kết quả thực tế, môi trường, mức độ nghiêm trọng — dành cho lập trình viên fix và tester verify.",
        "a document recording one specific defect: repro steps, expected vs actual result, environment, severity — for developers to fix and testers to verify.",
        "1件の具体的な不具合を記録する文書：再現手順、期待結果と実際の結果、環境、深刻度——開発者が修正しテスターが検証するためのもの。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần biết viết báo cáo kiểm thử tốt", en: "3. Why beginners need to write good test reports", ja: "3. 初心者が良いテスト報告書を書くべき理由" },
    blocks: [
      P("Ở nhiều công ty, tester được đánh giá không chỉ qua việc 'tìm được bao nhiêu lỗi' mà còn qua khả năng TRUYỀN ĐẠT kết quả kiểm thử một cách rõ ràng. Một tester giỏi tìm lỗi nhưng viết báo cáo mơ hồ sẽ khiến cả team mất thời gian hỏi lại, hoặc tệ hơn — khiến sản phẩm lỗi vẫn được release vì báo cáo không nêu rõ rủi ro. Kỹ năng viết Test Summary Report chính là cầu nối giữa 'công việc kiểm thử' và 'quyết định kinh doanh' của công ty.",
        "At many companies, testers are evaluated not just on 'how many bugs found' but on their ability to COMMUNICATE test results clearly. A skilled tester who finds bugs but writes a vague report wastes the whole team's time with follow-up questions, or worse — lets a broken product ship because the report didn't clearly state the risk. The skill of writing a Test Summary Report is the bridge between 'testing work' and the company's 'business decisions'.",
        "多くの企業では、テスターは『何件バグを見つけたか』だけでなく、テスト結果を明確に伝える能力でも評価されます。バグを見つけるのが得意でも曖昧な報告書を書くテスターは、チーム全体に追加の質問で時間を無駄にさせるか、さらに悪いことに——報告書がリスクを明記していないために欠陥のある製品がリリースされてしまいます。テストサマリーレポートを書くスキルは、『テスト作業』と会社の『ビジネス判断』を結ぶ橋なのです。"),
      P("Với người mới, đây cũng là kỹ năng phân biệt bạn với một 'người chỉ chạy test case theo checklist'. Khi bạn có thể tổng hợp số liệu, phân loại rủi ro theo mức độ, và đưa ra một kết luận có căn cứ, bạn đang thể hiện tư duy của một QA thực thụ — người hiểu VÌ SAO mình test, không chỉ LÀM THẾ NÀO để test. Đây cũng là câu hỏi phỏng vấn phổ biến: 'Cuối sprint, bạn báo cáo kết quả kiểm thử cho PM như thế nào?'",
        "For a beginner, this is also the skill that sets you apart from someone who 'just runs test cases off a checklist'. When you can aggregate data, classify risk by severity, and draw an evidence-based conclusion, you're showing the mindset of a real QA — someone who understands WHY they test, not just HOW to test. It's also a common interview question: 'At the end of a sprint, how do you report test results to the PM?'",
        "初心者にとって、これは『チェックリストどおりにテストケースを実行するだけの人』と自分を差別化するスキルでもあります。データを集計し、リスクを深刻度別に分類し、根拠のある結論を出せるようになると、なぜテストするのかを理解している本物のQAの思考を示すことになります——どうテストするかだけでなく。これは面接でもよくある質問です：『スプリントの終わりに、テスト結果をPMにどう報告しますか？』"),
      P("Và cuối cùng: một báo cáo tốt bảo vệ CHÍNH BẠN. Nếu sau này có lỗi nghiêm trọng lọt ra production, một báo cáo có ghi rõ rủi ro (kèm bằng chứng, link ticket) cho thấy bạn đã cảnh báo đầy đủ — trách nhiệm không nằm ở việc bạn không tìm ra lỗi, mà là ở quyết định release bất chấp cảnh báo. Ngược lại, một báo cáo mơ hồ 'mọi thứ ổn' sẽ khiến chính bạn khó giải trình khi sự cố xảy ra.",
        "And finally: a good report protects YOU. If a serious bug later leaks into production, a report that clearly stated the risk (with evidence and ticket links) shows you gave full warning — responsibility doesn't fall on you for missing the bug, but on the decision to release despite the warning. Conversely, a vague 'everything's fine' report makes it hard for you to explain yourself when an incident happens.",
        "そして最後に：良い報告書はあなた自身を守ります。後で重大なバグが本番環境に漏れた場合、リスクを明記した報告書（証拠やチケットへのリンク付き）は、あなたが十分に警告したことを示します——責任はバグを見逃したことではなく、警告を無視してリリースを決定したことにあります。逆に『すべて順調』という曖昧な報告書は、問題が起きたときにあなた自身が説明しづらくなります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: cấu trúc chuẩn của một Test Summary Report", en: "4. Prepare: the standard structure of a Test Summary Report", ja: "4. 準備：テストサマリーレポートの標準構成" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần nhớ đủ 6 phần cốt lõi để không bỏ sót thông tin quan trọng khi tổng kết một đợt kiểm thử.",
        "You don't need special tools — just remember the 6 core sections so you don't miss critical information when summarizing a test cycle.",
        "特別なツールは不要です——テストサイクルをまとめる際に重要な情報を漏らさないよう、6つの核となる項目を覚えておくだけで十分です。"),
      STEP(1, "Liệt kê phạm vi đã kiểm thử: module/tính năng nào đã test, module nào KHÔNG test và vì sao (thiếu thời gian, ngoài phạm vi sprint...).", "List the tested scope: which modules/features were tested, which were NOT and why (time constraints, out of sprint scope...).", "テスト範囲を挙げる：どのモジュール/機能をテストしたか、しなかったか、その理由（時間不足、スプリント範囲外など）。"),
      STEP(2, "Tổng hợp số liệu kết quả: tổng số ca, số ca Pass/Fail/Blocked và tỉ lệ phần trăm tương ứng.", "Aggregate result figures: total cases, Pass/Fail/Blocked counts and their percentages.", "結果の数値を集計する：合計ケース数、Pass/Fail/Blockedの件数とそれぞれの割合。"),
      STEP(3, "Phân loại lỗi tìm được theo mức độ nghiêm trọng (Critical/High/Medium/Low) và ghi rõ lỗi nào còn đang MỞ (chưa fix).", "Classify defects found by severity (Critical/High/Medium/Low) and clearly note which ones are still OPEN (unfixed).", "見つかったバグを深刻度（Critical/High/Medium/Low）で分類し、まだOPEN（未修正）のものを明記する。"),
      PITFALL("Chỉ liệt kê SỐ LƯỢNG lỗi mà quên phân loại theo mức độ nghiêm trọng — 20 lỗi Low khác hoàn toàn 2 lỗi Critical về mức độ rủi ro, nhưng nếu gộp chung một con số, người đọc dễ hiểu sai tình hình.", "Listing only the COUNT of bugs while forgetting to classify them by severity — 20 Low bugs are nothing like 2 Critical bugs in terms of risk, but lumping them into one number misleads the reader.", "件数だけを挙げ、深刻度別の分類を忘れること——Low20件とCritical2件はリスクの点でまったく異なるのに、1つの数字にまとめると読者に誤解を与えます。"),
      IMG(m_template, "Mẫu Test Summary Report đầy đủ 6 phần cốt lõi — Sprint 15 ShopEasy", "A full Test Summary Report template with all 6 core sections — ShopEasy Sprint 15", "6つの核項目を含む完全なテストサマリーレポートのテンプレート — ShopEasy Sprint 15"),
    ] },
  { heading: { vi: "5. Viết báo cáo từng phần (thực hành)", en: "5. Writing the report section by section (hands-on)", ja: "5. レポートを項目ごとに書く（実習）" },
    blocks: [
      P("Ba phần ở chương trước (phạm vi, số liệu kết quả, lỗi theo mức độ) là nền tảng. Giờ ta viết tiếp ba phần còn lại — độ phủ, rủi ro còn tồn đọng, và kết luận — để có một Test Summary Report hoàn chỉnh cho Sprint 15 của ShopEasy.",
        "The three sections from the previous chapter (scope, result figures, bugs by severity) are the foundation. Now let's write the remaining three — coverage, remaining risks, and conclusion — to complete a Test Summary Report for ShopEasy's Sprint 15.",
        "前の章の3項目（範囲、結果数値、深刻度別バグ）は基礎です。ここでは残り3項目——カバレッジ、残存リスク、結論——を書き、ShopEasyのSprint 15の完全なテストサマリーレポートを完成させましょう。"),
      STEP(1, "Tính độ phủ kiểm thử (coverage): số ca đã chạy chia cho số ca đã lên kế hoạch, cho từng module — không chỉ một con số tổng chung chung.", "Calculate test coverage: cases executed divided by cases planned, per module — not just one vague overall number.", "テストカバレッジを計算する：モジュールごとに実行済みケース数÷計画ケース数で算出する——曖昧な全体の1つの数字だけではなく。"),
      STEP(2, "Liệt kê rủi ro còn tồn đọng: lỗi Critical/High chưa fix, module chưa test kịp, kèm link ticket để người đọc tự tra cứu thêm.", "List remaining risks: unfixed Critical/High bugs, modules not tested in time, with ticket links so readers can dig deeper.", "残存リスクを挙げる：未修正のCritical/High、テストが間に合わなかったモジュールを、読者が確認できるようチケットへのリンク付きで記載する。"),
      STEP(3, "Viết kết luận đề xuất rõ ràng: NÊN hay KHÔNG NÊN release, dựa trực tiếp trên số liệu và rủi ro vừa liệt kê ở trên — không dùng từ mơ hồ như 'tạm ổn'.", "Write a clear release recommendation: SHOULD or SHOULD NOT release, based directly on the figures and risks listed above — avoid vague words like 'seems fine'.", "明確なリリース提案を書く：上記の数値とリスクに基づき、リリースすべきかどうかを『まあまあ』のような曖昧な言葉を避けて明記する。"),
      STEP(4, "Đọc lại toàn bộ báo cáo trong vai một người KHÔNG biết gì về đợt test — nếu họ không thể quyết định sau khi đọc, bổ sung thêm số liệu hoặc làm rõ hơn.", "Re-read the whole report as someone who knows NOTHING about the test cycle — if they still can't decide after reading, add more figures or clarify further.", "テストサイクルについて何も知らない人になったつもりでレポート全体を読み返す——それでも判断できないなら、数値を追加するか、より明確にする。"),
      CODE("text", "TEST SUMMARY REPORT - Sprint 15 (ShopEasy)\nPham vi: Dang ky, Gio hang, Thanh toan, Van chuyen\nTong so ca: 182 | Pass: 150 (82%) | Fail: 21 (12%) | Blocked: 11 (6%)\nLoi theo muc do: Critical 2 | High 6 | Medium 9 | Low 4\nDo phu: 92% tong the (module Thanh toan chi dat 78%)\nRui ro con ton dong: 2 loi Critical o luong thanh toan VNPay chua fix (SE-11305, SE-11310)\nKet luan de xuat: KHONG NEN RELEASE cho toi khi fix xong 2 loi Critical"),
      IMG(m_dash_result, "Dashboard kết quả Pass/Fail/Blocked và lỗi theo mức độ nghiêm trọng — Sprint 15", "Dashboard of Pass/Fail/Blocked results and bugs by severity — Sprint 15", "Pass/Fail/Blocked結果と深刻度別バグのダッシュボード — Sprint 15"),
      TRY("Chọn một đợt kiểm thử bạn từng làm (hoặc một tính năng bất kỳ) và thử viết đủ 6 phần cốt lõi của Test Summary Report cho nó.", "Pick a test cycle you've worked on (or any feature) and try writing all 6 core sections of a Test Summary Report for it.", "自分が担当したテストサイクル（または任意の機能）を選び、テストサマリーレポートの6項目すべてを書いてみよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ ghi 'đã test xong' — sếp không quyết được", en: "6. Situation 1: only writing 'testing done' — the manager can't decide", ja: "6. シーン1：『テスト完了』とだけ書き、上司が判断できない" },
    blocks: [
      SITUATION("Cuối sprint, tester gửi báo cáo cho PM chỉ vỏn vẹn một dòng: 'Đã test xong module thanh toán, mọi thứ ổn.'", "At the end of the sprint, a tester sends the PM a report with just one line: 'Testing of the payment module is done, everything's fine.'",
        "PM không biết đã chạy bao nhiêu ca, còn lỗi gì không, độ phủ ra sao — nên không dám quyết định release, phải hỏi lại nhiều lần qua chat, mất thêm gần 1 ngày chỉ để làm rõ thông tin đáng lẽ đã có sẵn trong báo cáo.",
        "The PM has no idea how many cases ran, whether any bugs remain, or what coverage was achieved — so they don't dare decide on release, and have to ask follow-up questions repeatedly over chat, wasting almost a full day just clarifying information that should already have been in the report.",
        "スプリントの終わりに、テスターがPMに送った報告はたった一行：『決済モジュールのテスト完了、問題なし』。",
        "PMは実行したケース数、残っているバグ、達成したカバレッジが分からず、リリースを決断できない。チャットで何度も質問を繰り返さねばならず、本来レポートに書かれているべき情報を明確にするだけでほぼ1日を無駄にしてしまう。"),
      SOLVE("Thay dòng đó bằng số liệu cụ thể: tổng ca đã chạy, tỉ lệ pass/fail/blocked, lỗi theo mức độ nghiêm trọng còn mở, độ phủ, và một câu kết luận rõ ràng NÊN hay KHÔNG NÊN release.", "Replace that line with concrete figures: total cases run, pass/fail/blocked rates, open bugs by severity, coverage, and a clear conclusion on whether to release.", "その一行を具体的な数値に置き換える：実行済みケース数、Pass/Fail/Blockedの割合、深刻度別の未解決バグ、カバレッジ、そしてリリースすべきかどうかの明確な結論。"),
      P("Đây là bài học lớn nhất trong chương này: một câu chung chung như 'ổn' hay 'xong' không giúp ai ra quyết định — nó chỉ đẩy trách nhiệm hỏi lại sang người đọc, làm chậm cả quy trình. Số liệu cụ thể (150 pass, 21 fail, 11 blocked...) mới thực sự là thứ giúp PM cân nhắc mức độ rủi ro và ra quyết định đúng lúc.",
        "This is the biggest lesson in this chapter: a vague sentence like 'fine' or 'done' doesn't help anyone decide — it just pushes the burden of asking follow-up questions onto the reader, slowing down the whole process. Concrete figures (150 passed, 21 failed, 11 blocked...) are what actually let the PM weigh the risk and decide in time.",
        "この章での最大の教訓です：『問題なし』や『完了』のような曖昧な一文は誰の判断も助けません——それは追加質問の負担を読者に押し付け、プロセス全体を遅らせるだけです。具体的な数値（Pass150件、Fail21件、Blocked11件…）こそが、PMがリスクを検討しタイムリーに判断するための材料になります。"),
      RECAP(["Một dòng 'đã test xong' không đủ để ra quyết định release", "Test Summary Report cần số liệu pass/fail/blocked cụ thể, không phải cảm tính"],
        ["A line saying 'testing is done' is not enough to decide on release", "A Test Summary Report needs concrete pass/fail/blocked figures, not vague impressions"],
        ["『テスト完了』の一行だけではリリース判断に不十分", "テストサマリーレポートには具体的なPass/Fail/Blockedの数値が必要で、印象論ではいけない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: báo cáo bỏ sót lỗi nghiêm trọng còn mở", en: "7. Situation 2: the report omits an open, serious bug", ja: "7. シーン2：レポートが未解決の重大バグを見落とす" },
    blocks: [
      SITUATION("Test Summary Report tuần trước ghi 'Pass 92%, sẵn sàng release' nhưng không nhắc gì tới lỗi SE-11305 (thanh toán VNPay bị trừ tiền 2 lần khi mạng chập chờn) — dù lỗi này đã được báo cáo trước đó và vẫn ở trạng thái Open.", "Last week's Test Summary Report said 'Pass 92%, ready to release' but didn't mention bug SE-11305 (VNPay payment double-charging when the connection is flaky) — even though it had been reported earlier and was still Open.",
        "Team release đúng như đề xuất. Nhiều khách hàng bị trừ tiền 2 lần khi thanh toán VNPay lúc mạng yếu, gây khiếu nại hàng loạt và ảnh hưởng nghiêm trọng tới uy tín của ShopEasy.",
        "The team released as recommended. Many customers got double-charged paying via VNPay under weak connections, causing a wave of complaints and seriously damaging ShopEasy's reputation.",
        "先週のテストサマリーレポートには『Pass率92％、リリース準備完了』と書かれていたが、バグSE-11305（通信が不安定な時にVNPay決済が二重に引き落とされる）については一切触れられていなかった——このバグは以前から報告済みで、まだOpen状態だったにもかかわらず。",
        "チームは提案どおりリリースした。多くの顧客が通信が弱い状態でVNPay決済を行い二重に引き落とされ、苦情が殺到しShopEasyの信頼が大きく損なわれた。"),
      SOLVE("Luôn liệt kê RÕ các lỗi Critical/High còn mở kèm link ticket trong phần 'Rủi ro còn tồn đọng', dù tỉ lệ pass tổng thể cao — % pass cao không có nghĩa là an toàn nếu vẫn còn lỗi nghiêm trọng chưa fix.", "Always clearly list open Critical/High bugs with ticket links in the 'Remaining risks' section, even when the overall pass rate is high — a high pass % doesn't mean safe if a serious bug is still unfixed.", "全体のPass率が高くても、『残存リスク』欄には未解決のCritical/Highバグをチケットへのリンク付きで必ず明記する——高いPass率が安全を意味するわけではなく、重大なバグが未修正のままなら危険です。"),
      P("Ví dụ này cho thấy vì sao phần 'rủi ro còn tồn đọng' quan trọng không kém phần số liệu pass/fail. Một tỉ lệ pass 92% nghe có vẻ tốt, nhưng nếu 2 lỗi trong 8% còn lại là Critical liên quan tới tiền, thì con số phần trăm đó hoàn toàn đánh lừa người đọc nếu không được đặt cạnh cảnh báo rủi ro rõ ràng. Đây cũng là lý do nhiều đội yêu cầu quy tắc cứng: có lỗi Critical mở thì mặc định đề xuất KHÔNG RELEASE, trừ khi có lý do đặc biệt.",
        "This example shows why the 'remaining risks' section matters just as much as the pass/fail figures. A 92% pass rate sounds good, but if 2 bugs in the remaining 8% are Critical and money-related, that percentage is completely misleading without a clear risk warning next to it. This is also why many teams enforce a hard rule: an open Critical bug means the default recommendation is DO NOT RELEASE, unless there's a special reason.",
        "この例は、『残存リスク』の項目がPass/Fail数値と同じくらい重要である理由を示しています。Pass率92％は良さそうに聞こえますが、残り8％の中の2件が金銭に関わるCriticalバグなら、明確なリスク警告なしにその割合を示すのは読者を完全に誤解させます。だからこそ多くのチームは厳格なルールを設けています：未解決のCriticalバグがあれば、特別な理由がない限りデフォルトで『リリースしない』と提案する、というルールです。"),
      IMG(m_jira, "Ticket lỗi Critical bị bỏ sót khỏi Test Summary Report tuần trước", "The Critical bug ticket that was omitted from last week's Test Summary Report", "先週のテストサマリーレポートで見落とされたCriticalバグチケット"),
    ] },
  { heading: { vi: "8. Theo dõi trạng thái đợt test & độ phủ", en: "8. Tracking test cycle status & coverage", ja: "8. テストサイクルの状況とカバレッジの追跡" },
    blocks: [
      P("Một Test Summary Report tốt không phải viết vội vào phút cuối — nó là kết quả của việc theo dõi trạng thái đợt test HẰNG NGÀY. Nếu bạn cập nhật liên tục một bảng kanban (module nào chưa test, đang test, bị blocked, đã xong) và số liệu độ phủ theo module, thì cuối sprint bạn chỉ cần tổng hợp lại thay vì phải dựng báo cáo từ con số 0 trong vài giờ.",
        "A good Test Summary Report isn't rushed together at the last minute — it's the result of tracking the test cycle's status DAILY. If you keep updating a kanban board (which modules aren't tested, are being tested, are blocked, are done) and coverage figures per module, then at the end of the sprint you just need to aggregate, instead of building the report from scratch in a few hours.",
        "良いテストサマリーレポートは直前に急いで作るものではなく、テストサイクルの状況を毎日追跡した結果です。かんばんボード（未テスト、テスト中、ブロック中、完了のモジュール）とモジュールごとのカバレッジ数値を継続的に更新していれば、スプリントの終わりには数時間でゼロから作る代わりに、集計するだけで済みます。"),
      IMG(m_kanban, "Bảng kanban theo dõi trạng thái đợt test hằng ngày — ShopEasy Sprint 15", "A kanban board tracking daily test cycle status — ShopEasy Sprint 15", "テストサイクルの日次状況を追跡するかんばんボード — ShopEasy Sprint 15"),
      IMG(m_coverage, "Độ phủ kiểm thử theo từng module — cơ sở cho phần 'Độ phủ' trong báo cáo", "Test coverage per module — the basis for the report's 'Coverage' section", "モジュールごとのテストカバレッジ — レポートの『カバレッジ』項目の根拠"),
      TIP("Cập nhật bảng kanban/trạng thái đợt test hằng ngày, không chỉ dồn vào cuối sprint — báo cáo cuối cùng sẽ chính xác và nhanh hơn nhiều.", "Update the kanban/status board daily, not just at the end of the sprint — the final report will be far more accurate and faster to produce.", "かんばん/状況ボードはスプリントの最後にまとめてではなく毎日更新しよう——最終レポートがずっと正確かつ素早く作れます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi viết Test Summary Report. Biết trước giúp báo cáo của bạn đáng tin cậy hơn ngay từ lần đầu.",
        "Beginners often stumble on a few common mistakes when writing a Test Summary Report. Knowing them helps your report be trustworthy from the very first time.",
        "初心者はテストサマリーレポートを書く際、共通の失敗をしがちです。事前に知れば、最初からより信頼できるレポートを作れます。"),
      PITFALL("Chỉ ghi kết quả chung chung như 'đã test xong', 'mọi thứ ổn' mà không kèm số liệu cụ thể — người đọc không thể tự kiểm chứng hay ra quyết định.", "Writing only vague results like 'testing done', 'everything's fine' without concrete figures — the reader can't verify anything or make a decision.", "『テスト完了』『問題なし』のような曖昧な結果だけを書き、具体的な数値を伴わないこと——読者は何も確認できず判断もできません。"),
      PITFALL("Ẩn hoặc quên nhắc tới lỗi Critical/High còn mở vì sợ bị đánh giá tiến độ chậm — điều này cực kỳ nguy hiểm vì có thể khiến sản phẩm lỗi vẫn được release.", "Hiding or forgetting to mention open Critical/High bugs for fear of looking slow — this is extremely dangerous because it can let a broken product ship.", "進捗が遅いと評価されるのを恐れて未解決のCritical/Highバグを隠したり書き忘れたりすること——欠陥のある製品がリリースされかねず、非常に危険です。"),
      TIP("Viết báo cáo theo nguyên tắc 'người đọc chỉ có 2 phút': số liệu quan trọng trước, chi tiết sau, kết luận đề xuất luôn đặt ở vị trí dễ thấy nhất.", "Write the report following the '2-minute reader' rule: key figures first, details after, the recommendation always in the most visible spot.", "『読者は2分しかない』という原則でレポートを書く：重要な数値を先に、詳細は後に、リリース提案は常に最も目立つ場所に置く。"),
      IMG(m_compare, "So sánh Test Summary Report SƠ SÀI vs ĐẦY ĐỦ trên cùng 1 đợt test", "Comparing a SLOPPY vs THOROUGH Test Summary Report for the same test cycle", "同じテストサイクルにおける『粗い』vs『充実した』テストサマリーレポートの比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "Writing a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi", "初心者のためのバグレポートの書き方"),
      INTERNAL("Severity & Priority — độ nghiêm trọng & độ ưu tiên cho người mới", "Severity & priority for beginners", "severity-priority-do-nghiem-trong-do-uu-tien-cho-nguoi-moi", "初心者のための深刻度と優先度"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenario & checklist for beginners", "test-scenario-checklist-cho-nguoi-moi", "初心者のためのテストシナリオとチェックリスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách viết Test Summary Report qua ví dụ Sprint 15 của app TMĐT ShopEasy: phân biệt rõ với bug report (1 lỗi vs cả đợt test), đủ 6 phần cốt lõi (phạm vi, số liệu pass/fail/blocked, lỗi theo mức độ nghiêm trọng, độ phủ, rủi ro còn tồn đọng, kết luận đề xuất release), và hai tình huống thật cho thấy vì sao báo cáo mơ hồ hoặc bỏ sót lỗi nghiêm trọng có thể gây hậu quả lớn. Bạn cũng biết cách theo dõi trạng thái đợt test hằng ngày để báo cáo cuối cùng chính xác và nhanh hơn.",
        "You just learned how to write a Test Summary Report through ShopEasy e-commerce app's Sprint 15 example: clearly distinguishing it from a bug report (one defect vs a whole test cycle), covering all 6 core sections (scope, pass/fail/blocked figures, bugs by severity, coverage, remaining risks, release recommendation), and two real situations showing why a vague report or an omitted serious bug can cause major consequences. You also learned to track test cycle status daily so the final report is accurate and fast.",
        "ECアプリShopEasyのSprint 15の例を通じて、テストサマリーレポートの書き方を学びました：バグレポート（1件の不具合 vs テストサイクル全体）との明確な違い、6つの核となる項目（範囲、Pass/Fail/Blocked数値、深刻度別バグ、カバレッジ、残存リスク、リリース提案）、そして曖昧なレポートや重大バグの見落としが大きな結果を招く理由を示す2つの実例。テストサイクルの状況を毎日追跡し、最終レポートを正確かつ迅速にする方法も学びました。"),
      P("Chặng tiếp theo, bạn nên ôn lại cách viết bug report cho từng lỗi cụ thể và cách phân loại severity/priority để phần 'lỗi theo mức độ nghiêm trọng' trong báo cáo của bạn luôn chính xác. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin viết những báo cáo mà sếp thực sự tin tưởng.",
        "Next, you should review how to write a bug report for each specific defect and how to classify severity/priority, so the 'bugs by severity' section of your report is always accurate. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and confidently write reports your manager can truly trust.",
        "次は、個々の不具合に対するバグレポートの書き方や、severity/priorityの分類方法を復習しましょう。そうすればレポートの『深刻度別バグ』項目が常に正確になります。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と、上司が本当に信頼できるレポートを自信を持って書く力を助けます。"),
      CTA(course),
    ] },
];

const TESTREPORT_01 = makeDoc({
  slug: "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "báo cáo kết quả kiểm thử",
  keywords: ["báo cáo kết quả kiểm thử", "test summary report", "báo cáo kiểm thử", "bug report vs test summary report", "độ phủ kiểm thử cho người mới"],
  coverLabel: "NGƯỜI MỚI · TEST REPORT · TMĐT",
  crumb: "Cách viết báo cáo kết quả kiểm thử (Test Summary Report)",
  metaTitle: { vi: "Cách viết báo cáo kết quả kiểm thử cho người mới", en: "How to write a test summary report for beginners", ja: "初心者のためのテスト結果報告書の書き方" },
  metaDescription: {
    vi: "Viết báo cáo kết quả kiểm thử (Test Summary Report) cho người mới qua app ShopEasy: phạm vi, pass/fail/blocked, lỗi theo mức độ và kết luận release.",
    en: "A beginner's guide to writing a Test Summary Report through the ShopEasy e-commerce app: scope, pass/fail/blocked counts, bugs by severity, coverage, and a release recommendation.",
    ja: "ShopEasy ECアプリを例に、初心者向けにテストサマリーレポートの書き方を解説。範囲、Pass/Fail/Blocked件数、深刻度別バグ、カバレッジ、リリース提案の書き方を紹介します。",
  },
  title: {
    vi: "Cách viết báo cáo kết quả kiểm thử (Test Summary Report) cho người mới: đủ 6 phần để sếp quyết định release",
    en: "How to write a test summary report for beginners: the 6 sections your manager needs to decide on release",
    ja: "初心者のためのテストサマリーレポートの書き方：リリース判断に必要な6つの項目",
  },
  summary: {
    vi: "Bài cho người mới: cách viết Test Summary Report (báo cáo kết quả kiểm thử) qua Sprint 15 của app TMĐT ShopEasy. Phân biệt với bug report, đủ 6 phần cốt lõi (phạm vi, pass/fail/blocked, lỗi theo mức độ, độ phủ, rủi ro, kết luận), 2 tình huống thật, nhiều mockup dashboard/kanban, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: how to write a Test Summary Report through ShopEasy e-commerce app's Sprint 15. Distinguishes it from a bug report, covers 6 core sections (scope, pass/fail/blocked, bugs by severity, coverage, risks, conclusion), 2 real situations, many dashboard/kanban mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyのSprint 15を例に、テストサマリーレポートの書き方を解説。バグレポートとの違い、6つの核となる項目（範囲、Pass/Fail/Blocked、深刻度別バグ、カバレッジ、リスク、結論）、2つの実例、多数のダッシュボード/かんばんモック、FAQ、5問クイズを収録。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết Test Summary Report", steps: [
    { name: "Liệt kê phạm vi & tổng hợp số liệu pass/fail/blocked", text: "Xác định module đã test và chưa test, tổng ca và tỉ lệ kết quả." },
    { name: "Phân loại lỗi theo mức độ & tính độ phủ", text: "Critical/High/Medium/Low và % ca đã chạy so với kế hoạch." },
    { name: "Ghi rủi ro còn tồn đọng & kết luận đề xuất release", text: "Liệt kê lỗi nghiêm trọng chưa fix, đề xuất rõ nên hay không nên release." },
  ] },
  pages,
});

export const MB_TESTREPORT_01 = [TESTREPORT_01];
