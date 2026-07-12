// doc_mb_phan_tich_yeu_cau.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Đọc & phân tích yêu cầu (requirement) để viết test case — cách đọc user story/acceptance
// criteria, tách yêu cầu thành điểm kiểm, hỏi làm rõ khi yêu cầu mơ hồ, truy vết yêu cầu ↔
// test case (traceability). Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ.
// Gắn app TMĐT ShopEasy (tính năng mã giảm giá). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
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

// ── Mockup 1: bảng User Story + Acceptance Criteria — tính năng Mã giảm giá ShopEasy ──
const m_ac = grid("User Story & Acceptance Criteria — Mã giảm giá khi thanh toán (ShopEasy)", ["Mục", "Nội dung"], [
  ["User Story", "Là khách hàng, tôi muốn nhập mã giảm giá khi thanh toán để được giảm tiền đơn hàng"],
  ["AC1", "Mã hợp lệ, còn hạn -> áp dụng giảm giá, hiển thị đúng số tiền được giảm"],
  ["AC2", "Mã không tồn tại hoặc đã hết hạn -> hiển thị thông báo lỗi rõ ràng, không trừ tiền"],
  ["AC3", "Giảm tối đa 100.000đ mỗi đơn"],
  ["AC4", "Mỗi đơn hàng chỉ áp dụng được đúng 1 mã giảm giá"],
], { accent: "#0ea5e9" });

// ── Mockup 2: màn hình thanh toán ShopEasy với ô mã giảm giá — khoanh điểm mơ hồ ──
const m_screen = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán", [
    field(24, 20, 330, "Sản phẩm", "Áo thun + Quần jean", "normal"),
    field(372, 20, 330, "Tạm tính", "560.000 ₫", "normal"),
    field(24, 92, 330, "Mã giảm giá", "FREESHIP50", "normal"),
    btn(372, 100, 160, "Áp dụng", "primary"),
    `<text x="24" y="150" font-size="12" fill="#334155">Giảm giá: -50.000 ₫ · Giảm tối đa 100.000đ/đơn</text>`,
    annotate(20, 138, 330, 26, "MƠ HỒ: tính trên cả đơn hay từng sản phẩm?"),
  ].join(""), { h: 208, accent: "#0ea5e9" }),
].join(""), { h: 264, title: "ShopEasy · TMĐT", accent: "#0ea5e9" });

// ── Mockup 3: bảng tách yêu cầu thành các điểm kiểm (test point) ──
const m_checklist = grid("Tách Acceptance Criteria thành điểm kiểm (test point)", ["Điểm kiểm (test point)", "Tách từ yêu cầu nào"], [
  ["Nhập mã hợp lệ, còn hạn -> tổng tiền giảm đúng số đã công bố", "AC1"],
  ["Nhập mã đã hết hạn -> hiển thị lỗi, không giảm tiền", "AC2"],
  ["Nhập mã không tồn tại -> hiển thị lỗi, không giảm tiền", "AC2"],
  ["Đơn hàng giảm đúng bằng mức giảm nhưng KHÔNG vượt quá 100.000đ", "AC3"],
  ["Nhập mã giảm giá thứ 2 sau khi đã áp mã thứ nhất -> bị từ chối", "AC4"],
  ["Bỏ mã đã áp dụng (xóa mã) -> tổng tiền trở lại giá gốc", "Suy luận thêm, KHÔNG có trong AC"],
], { accent: "#0ea5e9", note: "Mỗi điểm kiểm nên ghi rõ ràng buộc bởi yêu cầu nào để dễ truy vết ngược lại." });

// ── Mockup 4: ticket câu hỏi làm rõ gửi Business Analyst / Product Owner ──
const m_jira = jira({
  key: "SE-22031", title: "Làm rõ AC3: 'Giảm tối đa 100.000đ' tính trên đơn hàng hay từng sản phẩm?",
  type: "Question", status: "Waiting for BA", priority: "High", severity: "Blocks test design",
  fields: [
    ["Ngữ cảnh", "Tính năng: Mã giảm giá khi thanh toán · User story SE-220 · AC3"],
    ["Câu hỏi 1", "Mức giảm 100.000đ áp dụng cho TOÀN đơn hàng, hay cho TỪNG sản phẩm trong đơn?"],
    ["Câu hỏi 2", "Nếu đơn có nhiều sản phẩm từ nhiều shop khác nhau, mức giảm có bị chia nhỏ không?"],
    ["Vì sao cần hỏi", "Không rõ -> không viết được test case đúng cho đơn nhiều sản phẩm/nhiều shop"],
    ["Người cần trả lời", "Sản phẩm (Product Owner) hoặc BA phụ trách tính năng"],
  ],
});

// ── Mockup 5: ma trận truy vết yêu cầu -> test case (traceability matrix) ──
const m_trace = grid("Ma trận truy vết yêu cầu -> test case (traceability matrix)", ["Yêu cầu (AC)", "Test case liên kết", "Trạng thái"], [
  ["AC1: mã hợp lệ được áp dụng", "TC-01, TC-02", "Pass"],
  ["AC2: mã không hợp lệ/hết hạn bị từ chối", "TC-03, TC-04", "Pass"],
  ["AC3: giảm tối đa 100.000đ/đơn", "TC-05, TC-06", "Fail — chờ làm rõ AC3"],
  ["AC4: chỉ 1 mã mỗi đơn", "TC-07", "Pass"],
], { accent: "#0ea5e9", highlight: 2, note: "AC nào KHÔNG có test case liên kết là dấu hiệu bạn đang bỏ sót yêu cầu." });

// ── Mockup 6: dashboard độ phủ yêu cầu (requirement coverage) ──
const m_dash = dashboard("Độ phủ yêu cầu (Requirement coverage) — Mã giảm giá ShopEasy", [
  { label: "Tổng số AC", value: "4", sub: "trong user story", color: "#0ea5e9" },
  { label: "AC có test case", value: "4/4", sub: "100% được truy vết", color: "#16a34a" },
  { label: "Tổng test case", value: "7", sub: "bám theo 4 AC", color: "#2563eb" },
  { label: "Ca chờ làm rõ yêu cầu", value: "2", sub: "AC3 còn mơ hồ", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Acceptance Criteria khác gì với User Story?",
  "How is an acceptance criterion different from a user story?",
  "User story mô tả NHU CẦU ở mức tổng quát theo mẫu 'Là [ai], tôi muốn [làm gì], để [đạt được gì]'. Acceptance Criteria (AC) là các ĐIỀU KIỆN CỤ THỂ, có thể kiểm tra được, xác định khi nào user story đó được xem là 'hoàn thành đúng'. Tester dùng AC làm nguồn chính để tách ra các điểm kiểm và viết test case, vì AC rõ ràng và đo lường được hơn nhiều so với user story.",
  "A user story describes a NEED at a general level using the template 'As a [who], I want [what], so that [why]'. Acceptance Criteria (AC) are SPECIFIC, testable conditions that define when that user story is considered 'correctly done'. Testers use AC as the main source to derive test points and write test cases, since AC is far clearer and more measurable than the user story itself.",
  "アクセプタンス・クライテリアはユーザーストーリーと何が違う？",
  "ユーザーストーリーは『[誰]として、[何をしたい]、それは[なぜ]のため』というテンプレートで、ニーズを大まかなレベルで記述したものです。アクセプタンス・クライテリア（AC）は、そのユーザーストーリーが『正しく完了した』とみなされる条件を定めた、具体的でテスト可能な条件です。テスターはACを主な情報源としてテストポイントを導き出しテストケースを書きます。ACはユーザーストーリー自体よりもはるかに明確で測定可能だからです。");
const faq2 = FAQ(
  "Làm sao biết một yêu cầu đang mơ hồ và cần hỏi lại?",
  "How do I know a requirement is ambiguous and needs clarification?",
  "Dấu hiệu dễ nhận ra nhất: khi bạn đọc xong một câu trong yêu cầu mà vẫn có thể hiểu theo 2 cách khác nhau trở lên (ví dụ 'giảm tối đa 100.000đ' — trên đơn hay trên từng sản phẩm?), hoặc khi bạn không thể viết ra kết quả mong đợi (Expected Result) rõ ràng cho một điểm kiểm — đó là dấu hiệu yêu cầu đang mơ hồ. Quy tắc thực dụng: nếu hai người đọc cùng một câu mà ra hai cách hiểu khác nhau, hãy hỏi lại thay vì tự đoán.",
  "The clearest sign: after reading a sentence in the requirement, you can still interpret it in two or more different ways (e.g. 'discount up to 100,000đ' — per order or per item?), or you can't write a clear Expected Result for a test point — that's a sign the requirement is ambiguous. A practical rule: if two people read the same sentence and get two different interpretations, ask instead of guessing.",
  "要件が曖昧でヒアリングが必要だとどうやって分かる？",
  "最も分かりやすい兆候は、要件の1文を読んでも2通り以上の解釈ができてしまう場合（例：『最大10万ドン割引』——注文全体か、商品ごとか？）、またはテストポイントの期待結果（Expected Result）を明確に書けない場合です。実用的なルール：同じ文章を読んだ2人が異なる解釈をするなら、推測せずに聞き返しましょう。");
const faq3 = FAQ(
  "Ma trận truy vết yêu cầu (traceability matrix) dùng để làm gì?",
  "What is a requirement traceability matrix used for?",
  "Ma trận truy vết ghi lại mối liên kết giữa từng yêu cầu (user story/AC) và các test case tương ứng. Nó giúp trả lời hai câu hỏi quan trọng: (1) mọi yêu cầu đã có test case chưa — tránh bỏ sót; (2) khi một yêu cầu thay đổi, những test case nào cần cập nhật theo. Với người mới, đây cũng là cách đơn giản để tự kiểm tra bộ test case của mình có phủ đủ yêu cầu hay chưa trước khi báo cáo hoàn thành.",
  "A traceability matrix records the link between each requirement (user story/AC) and its corresponding test cases. It answers two important questions: (1) does every requirement have a test case yet — avoiding gaps; (2) when a requirement changes, which test cases need updating. For beginners, it's also a simple way to self-check whether your test case set fully covers the requirements before reporting completion.",
  "要件トレーサビリティ・マトリックスは何のために使う？",
  "トレーサビリティ・マトリックスは、各要件（ユーザーストーリー/AC）と対応するテストケースとの紐付けを記録します。これは2つの重要な問いに答えます：(1) 全ての要件にテストケースがあるか——漏れを防ぐ、(2) 要件が変更された時、どのテストケースを更新すべきか。初心者にとっても、完了報告の前に自分のテストケース群が要件を十分カバーしているか自己チェックする簡単な方法です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "User story theo mẫu chuẩn trả lời những câu hỏi nào?", en: "What questions does a standard user story template answer?", ja: "標準的なユーザーストーリーのテンプレートはどんな問いに答える？" },
    options: [
      { vi: "Ai muốn gì, để đạt được điều gì", en: "Who wants what, in order to achieve what", ja: "誰が何を望み、何を達成するためか" },
      { vi: "Chi phí phát triển tính năng là bao nhiêu", en: "How much the feature costs to develop", ja: "機能開発にいくらかかるか" },
      { vi: "Tính năng chạy trên trình duyệt nào", en: "Which browser the feature runs on", ja: "どのブラウザで機能が動くか" },
      { vi: "Ai là người viết code cho tính năng", en: "Who writes the code for the feature", ja: "誰が機能のコードを書くか" },
    ], correct: 0,
    explain: { vi: "User story theo mẫu 'Là [ai], tôi muốn [gì], để [vì sao]' — mô tả nhu cầu người dùng ở mức tổng quát.", en: "A user story follows 'As [who], I want [what], so that [why]' — describing user need at a general level.", ja: "ユーザーストーリーは『[誰]として、[何]をしたい、それは[なぜ]のため』というテンプレートで、ユーザーニーズを大まかに記述します。" },
  }),
  mcq({
    q: { vi: "Acceptance Criteria (điều kiện chấp nhận) dùng để làm gì khi viết test case?", en: "What are acceptance criteria used for when writing test cases?", ja: "テストケースを書く際、アクセプタンス・クライテリアは何のために使う？" },
    options: [
      { vi: "Là nguồn chính để tách ra các điểm kiểm cụ thể, đo lường được", en: "The main source to derive specific, measurable test points", ja: "具体的で測定可能なテストポイントを導き出す主な情報源" },
      { vi: "Chỉ để trang trí tài liệu, không liên quan tới test case", en: "Only to decorate documents, unrelated to test cases", ja: "文書の装飾のみで、テストケースとは無関係" },
      { vi: "Thay thế hoàn toàn cho việc thực hiện test", en: "Fully replace the need to execute tests", ja: "テスト実行を完全に代替するもの" },
      { vi: "Chỉ dành cho lập trình viên đọc, tester không cần quan tâm", en: "Only for developers to read, testers don't need it", ja: "開発者だけが読むもので、テスターは気にしなくてよい" },
    ], correct: 0,
    explain: { vi: "AC cụ thể và đo lường được nên tester dùng nó làm căn cứ chính để tách điểm kiểm và viết Expected Result.", en: "Because AC is specific and measurable, testers use it as the main basis to derive test points and write Expected Results.", ja: "ACは具体的で測定可能なので、テスターはこれを主な根拠としてテストポイントを導き出し期待結果を書きます。" },
  }),
  mcq({
    q: { vi: "Gặp yêu cầu mơ hồ như 'giảm tối đa 100.000đ' (không rõ tính trên đơn hay từng sản phẩm), việc ĐẦU TIÊN tester nên làm là gì?", en: "Facing an ambiguous requirement like 'discount up to 100,000đ' (unclear whether per order or per item), what should a tester do FIRST?", ja: "『最大10万ドン割引』のような曖昧な要件（注文全体か商品ごとか不明）に直面した時、テスターがまず行うべきことは？" },
    options: [
      { vi: "Tự đoán theo ý mình rồi viết test case ngay để kịp tiến độ", en: "Guess based on own opinion and write test cases right away to save time", ja: "自分の判断で推測し、進捗のためすぐテストケースを書く" },
      { vi: "Bỏ qua yêu cầu đó, chỉ test những phần rõ ràng", en: "Skip that requirement and only test the clear parts", ja: "その要件を無視し、明確な部分だけテストする" },
      { vi: "Ghi lại câu hỏi cụ thể và hỏi làm rõ với BA/Product Owner trước khi viết test case cho phần đó", en: "Write down a specific question and ask BA/Product Owner to clarify before writing test cases for that part", ja: "具体的な質問を書き留め、その部分のテストケースを書く前にBA/POに確認する" },
      { vi: "Xóa yêu cầu đó khỏi tài liệu vì nó không quan trọng", en: "Delete that requirement from the document because it's unimportant", ja: "重要でないのでその要件を文書から削除する" },
    ], correct: 2,
    explain: { vi: "Tự đoán dễ dẫn tới test case sai hướng; cách đúng là hỏi làm rõ trước, có câu trả lời mới viết ca kiểm thử.", en: "Guessing easily leads to wrong-direction test cases; the right way is to clarify first, then write test cases once you have an answer.", ja: "推測すると誤った方向のテストケースになりがち。正しい方法はまず明確化を求め、回答を得てからテストケースを書くことです。" },
  }),
  mcq({
    q: { vi: "Ma trận truy vết yêu cầu (traceability matrix) giúp bạn phát hiện điều gì?", en: "What does a requirement traceability matrix help you spot?", ja: "要件トレーサビリティ・マトリックスは何を発見するのに役立つ？" },
    options: [
      { vi: "Tốc độ tải trang của tính năng", en: "The feature's page load speed", ja: "機能のページ読み込み速度" },
      { vi: "Những yêu cầu (AC) chưa có test case nào liên kết — dấu hiệu bỏ sót", en: "Requirements (ACs) with no linked test case yet — a sign of a gap", ja: "まだテストケースが紐付いていない要件（AC）——見落としの兆候" },
      { vi: "Mức lương của tester trong dự án", en: "The tester's salary on the project", ja: "プロジェクトにおけるテスターの給与" },
      { vi: "Ai là người viết yêu cầu ban đầu", en: "Who originally wrote the requirement", ja: "誰が最初に要件を書いたか" },
    ], correct: 1,
    explain: { vi: "Nhìn vào ma trận, cột 'test case liên kết' bị trống hoặc thiếu chính là yêu cầu bạn đang bỏ sót.", en: "Looking at the matrix, an empty or missing 'linked test case' column is exactly the requirement you're missing.", ja: "マトリックスを見て『紐付くテストケース』の欄が空または不足していれば、それが見落としている要件です。" },
  }),
  mcq({
    q: { vi: "Với AC 'Mã không tồn tại hoặc đã hết hạn -> hiển thị lỗi, không trừ tiền', điểm kiểm nào dưới đây tách ĐÚNG từ yêu cầu này?", en: "For the AC 'Non-existent or expired code -> show an error, no charge', which test point below is correctly derived from it?", ja: "AC『存在しない、または期限切れのコード→エラー表示、課金しない』から正しく導き出されたテストポイントはどれ？" },
    options: [
      { vi: "Nhập mã đã hết hạn -> hệ thống hiển thị lỗi và không trừ tiền", en: "Enter an expired code -> the system shows an error and doesn't charge", ja: "期限切れのコードを入力→システムがエラーを表示し課金しない" },
      { vi: "Kiểm tra tốc độ phản hồi của server khi tải trang chủ", en: "Check server response speed when loading the homepage", ja: "ホームページ読み込み時のサーバー応答速度を確認する" },
      { vi: "Kiểm tra giao diện trang chủ trên điện thoại", en: "Check the homepage UI on mobile", ja: "モバイルでのホームページUIを確認する" },
      { vi: "Kiểm tra số lượng sản phẩm hiển thị trên trang danh mục", en: "Check the number of products shown on the category page", ja: "カテゴリページに表示される商品数を確認する" },
    ], correct: 0,
    explain: { vi: "Điểm kiểm phải bám sát đúng nội dung AC đang phân tích — ở đây là hành vi khi mã không hợp lệ/hết hạn.", en: "The test point must closely follow the exact content of the AC being analyzed — here, behavior when the code is invalid/expired.", ja: "テストポイントは分析中のACの内容に忠実である必要があります——ここではコードが無効/期限切れの場合の挙動です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & yêu cầu bạn sẽ đọc", en: "1. TL;DR & the requirement you'll read", ja: "1. 要点とこれから読む要件" },
    blocks: [
      TLDR("Phân tích yêu cầu là bước đọc kỹ user story và acceptance criteria (AC), tách chúng thành các điểm kiểm cụ thể trước khi viết test case, thay vì viết ca kiểm thử ngay khi vừa đọc lướt. Bài này bám tính năng mã giảm giá khi thanh toán của app TMĐT ShopEasy: bạn học cách đọc AC, tách điểm kiểm, nhận ra yêu cầu mơ hồ để hỏi lại đúng người, và dựng ma trận truy vết yêu cầu ↔ test case. Nhiều hình minh họa và trắc nghiệm cuối bài.",
        "Requirement analysis means carefully reading the user story and acceptance criteria (AC), breaking them into concrete test points before writing test cases, instead of writing cases right after a quick skim. This article follows ShopEasy's discount-code-at-checkout feature: you'll learn to read AC, derive test points, spot ambiguous requirements to ask the right person, and build a requirement-to-test-case traceability matrix. Lots of visuals and a quiz at the end.",
        "要件分析とは、ユーザーストーリーとアクセプタンス・クライテリア（AC）をよく読み、ざっと目を通してすぐケースを書くのではなく、具体的なテストポイントに分解してからテストケースを書くステップです。本記事はECアプリShopEasyの決済時割引コード機能に沿い、ACの読み方、テストポイントの導出、確認すべき相手への曖昧な要件の質問方法、要件↔テストケースのトレーサビリティ・マトリックスの作り方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Nhiều bạn khi mới học test có phản xạ: đọc lướt yêu cầu một lượt rồi bắt tay viết test case ngay cho nhanh. Cách làm này rất dễ khiến bạn bỏ sót ca quan trọng hoặc hiểu sai ý người viết yêu cầu. Kỹ năng phân tích yêu cầu chính là bước dừng lại, đọc kỹ, tách từng câu trong yêu cầu thành các điểm cần kiểm tra — trước khi đặt bút viết bất kỳ test case nào. Chúng ta sẽ học kỹ năng này qua yêu cầu thật của tính năng mã giảm giá trên ShopEasy, có hình minh họa và phần tự làm thử.",
        "Hi, newcomer! Many beginners have a natural habit: skim the requirement once and jump straight into writing test cases to save time. This habit easily makes you miss important cases or misread what the requirement author actually meant. Requirement analysis is the skill of pausing, reading carefully, and breaking each sentence of a requirement into checkpoints — before writing a single test case. We'll learn this through a real requirement for ShopEasy's discount-code feature, with visuals and hands-on practice.",
        "こんにちは、初心者さん！多くの初心者は、要件をざっと一読してすぐにテストケースを書き始めるという習慣を持ちがちです。この方法は重要なケースを見逃したり、要件作成者の意図を誤解したりしやすくなります。要件分析とは、一旦立ち止まり、丁寧に読み、テストケースを1つ書く前に要件の各文をチェックポイントに分解するスキルです。ShopEasyの割引コード機能の実際の要件を通じて、図と実習付きでこのスキルを学びます。"),
      IMG(m_ac, "Bảng User Story và Acceptance Criteria của tính năng mã giảm giá ShopEasy", "ShopEasy discount-code feature's user story and acceptance criteria", "ShopEasy割引コード機能のユーザーストーリーとアクセプタンス・クライテリア"),
      DEF("Phân tích yêu cầu (Requirement Analysis)", "quá trình đọc kỹ user story/acceptance criteria, làm rõ những điểm chưa chắc chắn, và tách chúng thành các điểm kiểm cụ thể để làm căn cứ viết test case.",
        "the process of carefully reading a user story/acceptance criteria, clarifying uncertain points, and breaking them into concrete test points that become the basis for writing test cases.",
        "ユーザーストーリー/アクセプタンス・クライテリアを丁寧に読み、不明確な点を明らかにし、テストケース作成の根拠となる具体的なテストポイントに分解するプロセス。"),
    ] },
  { heading: { vi: "2. User Story và Acceptance Criteria là gì", en: "2. What are user stories and acceptance criteria", ja: "2. ユーザーストーリーとアクセプタンス・クライテリアとは" },
    blocks: [
      P("User story mô tả nhu cầu ở mức tổng quát theo mẫu 'Là [ai], tôi muốn [làm gì], để [đạt được gì]'. Với tính năng mã giảm giá ShopEasy: 'Là khách hàng, tôi muốn nhập mã giảm giá khi thanh toán, để được giảm tiền đơn hàng'. Câu này cho bạn biết TẠI SAO tính năng tồn tại, nhưng chưa đủ chi tiết để viết test case — đó là lý do cần Acceptance Criteria (AC) đi kèm.",
        "A user story describes a need at a general level using the template 'As [who], I want [what], so that [why]'. For ShopEasy's discount-code feature: 'As a customer, I want to enter a discount code at checkout, so that I get money off my order'. This sentence tells you WHY the feature exists, but isn't detailed enough to write test cases — that's why Acceptance Criteria (AC) must come with it.",
        "ユーザーストーリーは『[誰]として、[何をしたい]、それは[なぜ]のため』というテンプレートで、ニーズを大まかなレベルで記述します。ShopEasyの割引コード機能では：『顧客として、決済時に割引コードを入力したい、それは注文金額を割引してもらうため』。この文は機能が存在する理由を教えてくれますが、テストケースを書くには十分な詳細がありません——だからこそアクセプタンス・クライテリア（AC）が必要です。"),
      IMG(m_screen, "Màn hình thanh toán thật của ShopEasy ứng với yêu cầu — có điểm mơ hồ cần chú ý", "ShopEasy's real checkout screen matching the requirement — with an ambiguous point to watch", "要件に対応するShopEasyの実際の決済画面——注意すべき曖昧な点あり"),
      P("Acceptance Criteria (AC) là các điều kiện CỤ THỂ, kiểm tra được, xác định khi nào user story được xem là hoàn thành đúng. Ví dụ AC1 của tính năng này: 'Mã hợp lệ, còn hạn -> áp dụng giảm giá, hiển thị đúng số tiền được giảm'. Câu này rõ ràng hơn nhiều so với user story: nó nêu rõ ĐIỀU KIỆN (mã hợp lệ, còn hạn) và KẾT QUẢ MONG ĐỢI (áp dụng giảm giá, hiển thị đúng số tiền) — chính là nguyên liệu để bạn viết test case.",
        "Acceptance Criteria (AC) are SPECIFIC, testable conditions that define when a user story is considered correctly done. For example, AC1 of this feature: 'Valid, non-expired code -> discount applied, correct discount amount shown'. This sentence is far clearer than the user story: it states the CONDITION (valid, non-expired code) and the EXPECTED RESULT (discount applied, correct amount shown) — exactly the raw material for writing a test case.",
        "アクセプタンス・クライテリア（AC）は、ユーザーストーリーが正しく完了したとみなされる条件を定めた、具体的でテスト可能な条件です。例えばこの機能のAC1：『有効で期限内のコード→割引が適用され、正しい割引額が表示される』。この文はユーザーストーリーよりはるかに明確です：条件（有効で期限内のコード）と期待結果（割引適用、正しい金額表示）を明示しており、まさにテストケースを書くための材料です。"),
      DEF("Acceptance Criteria (Điều kiện chấp nhận)", "các điều kiện cụ thể, đo lường được, mô tả khi nào một tính năng/user story được xem là hoạt động đúng như mong đợi.",
        "specific, measurable conditions describing when a feature/user story is considered to work as expected.",
        "機能/ユーザーストーリーが期待どおりに動作するとみなされる条件を記述した、具体的で測定可能な条件。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần đọc kỹ yêu cầu trước khi viết test case", en: "3. Why beginners need to read requirements carefully before writing test cases", ja: "3. 初心者がテストケースを書く前に要件を丁寧に読むべき理由" },
    blocks: [
      P("Viết test case trước khi hiểu rõ yêu cầu giống như xây nhà mà không xem bản vẽ: bạn có thể xây rất nhanh, nhưng dễ xây sai chỗ. Nếu bạn chỉ đọc lướt yêu cầu rồi viết ca kiểm thử ngay, bạn thường bỏ sót các điều kiện phụ (như AC3 'giảm tối đa 100.000đ') hoặc hiểu sai ý người viết — dẫn tới test case không phản ánh đúng điều cần kiểm tra.",
        "Writing test cases before truly understanding a requirement is like building a house without looking at the blueprint: you can build fast, but easily build in the wrong place. If you only skim the requirement and write test cases right away, you often miss secondary conditions (like AC3 'discount up to 100,000đ') or misread the author's intent — leading to test cases that don't reflect what actually needs checking.",
        "要件を本当に理解する前にテストケースを書くのは、設計図を見ずに家を建てるようなものです：速く建てられますが、間違った場所に建てやすくなります。要件をざっと読んですぐテストケースを書くと、副次的な条件（AC3『最大10万ドン割引』など）を見逃したり、作成者の意図を誤解したりして、実際に確認すべきことを反映しないテストケースになりがちです。"),
      P("Với riêng bạn — người mới — kỹ năng phân tích yêu cầu là nền tảng của MỌI kỹ thuật thiết kế test case khác (phân vùng tương đương, giá trị biên, kiểm thử âm...). Dù bạn dùng kỹ thuật nào, bạn vẫn phải bắt đầu từ việc hiểu đúng yêu cầu. Đây cũng là câu hỏi phỏng vấn phổ biến: 'Cho một đoạn yêu cầu, hãy chỉ ra những điểm chưa rõ ràng và các điểm kiểm bạn sẽ viết test case'.",
        "For you specifically — a beginner — requirement analysis is the foundation of EVERY other test case design technique (equivalence partitioning, boundary values, negative testing...). Whichever technique you use, you must still start by understanding the requirement correctly. It's also a common interview question: 'Given a requirement excerpt, point out the unclear parts and the test points you'd write test cases for'.",
        "特に初心者のあなたにとって、要件分析は他の全てのテストケース設計技法（同値分割、境界値分析、ネガティブテストなど）の土台です。どの技法を使うにせよ、要件を正しく理解することから始めなければなりません。これもよくある面接質問です：『ある要件の抜粋を見て、不明確な点とテストケースを書くべきテストポイントを指摘してください』。"),
      P("Và quan trọng nhất: đọc kỹ yêu cầu giúp bạn tìm ra vấn đề SỚM NHẤT có thể — ngay ở giai đoạn thiết kế test case, trước khi tính năng được lập trình. Phát hiện một yêu cầu mơ hồ ở bước này rẻ hơn rất nhiều so với phát hiện lỗi sau khi tính năng đã lên production.",
        "And most importantly: reading requirements carefully lets you find problems as EARLY as possible — at the test case design stage, before the feature is even coded. Catching an ambiguous requirement at this step is far cheaper than catching a bug after the feature is already in production.",
        "そして最も重要なのは、要件を丁寧に読むことで、機能がコーディングされる前のテストケース設計段階という、できるだけ早い時期に問題を発見できることです。この段階で曖昧な要件を見つける方が、本番環境にリリースされた後にバグを見つけるよりもはるかにコストが低く済みます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: kỹ thuật tách yêu cầu thành điểm kiểm", en: "4. Prepare: techniques for deriving test points from requirements", ja: "4. 準備：要件からテストポイントを導き出す技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần một quy trình đọc có kỷ luật để không bỏ sót góc nào khi đọc một yêu cầu bất kỳ.",
        "You don't need special tools — just a disciplined reading process so you don't miss any angle when reading any requirement.",
        "特別なツールは不要です——どんな要件を読んでも見落としがないよう、規律あるリーディングプロセスがあれば十分です。"),
      STEP(1, "Đọc user story trước để nắm bối cảnh chung: ai dùng, dùng để làm gì.", "Read the user story first to grasp the overall context: who uses it, and for what.", "まずユーザーストーリーを読み、全体の文脈（誰が、何のために使うか）を把握する。"),
      STEP(2, "Đọc từng Acceptance Criteria (AC) một, tách riêng ĐIỀU KIỆN và KẾT QUẢ MONG ĐỢI trong từng câu.", "Read each Acceptance Criterion (AC) one at a time, separating the CONDITION and the EXPECTED RESULT within each sentence.", "各アクセプタンス・クライテリア（AC）を1つずつ読み、各文の中の条件と期待結果を分けて把握する。"),
      STEP(3, "Với mỗi AC, viết ra một hoặc nhiều điểm kiểm (test point) cụ thể, đủ chi tiết để sau này chuyển thành test case.", "For each AC, write out one or more specific test points, detailed enough to later become test cases.", "各ACについて、後でテストケースになるだけ十分詳細な、具体的なテストポイントを1つ以上書き出す。"),
      TRY("Đọc lại AC4 ('Mỗi đơn hàng chỉ áp dụng được đúng 1 mã giảm giá') và tự viết ra 1 điểm kiểm cho nó.", "Re-read AC4 ('Each order can only apply exactly 1 discount code') and write out 1 test point for it yourself.", "AC4（『各注文には割引コードを1つだけ適用できる』）を読み直し、自分でそのテストポイントを1つ書いてみよう。"),
      PITFALL("Đọc yêu cầu một lượt rồi bắt đầu viết test case ngay, không tách riêng điều kiện và kết quả mong đợi trong từng câu — dễ bỏ sót AC phụ ít nổi bật (như AC3, AC4).", "Reading the requirement once and writing test cases right away, without separating condition and expected result in each sentence — easily missing less prominent secondary ACs (like AC3, AC4).", "要件を一読してすぐテストケースを書き始め、各文の条件と期待結果を分けないこと——目立たない副次的なAC（AC3、AC4など）を見逃しやすい。"),
      IMG(m_checklist, "Tách Acceptance Criteria của tính năng mã giảm giá thành các điểm kiểm cụ thể", "Breaking the discount-code feature's acceptance criteria into concrete test points", "割引コード機能のアクセプタンス・クライテリアを具体的なテストポイントに分解"),
    ] },
  { heading: { vi: "5. Thực hành: tách điểm kiểm từ yêu cầu mã giảm giá ShopEasy", en: "5. Hands-on: deriving test points from ShopEasy's discount-code requirement", ja: "5. 実習：ShopEasyの割引コード要件からテストポイントを導き出す" },
    blocks: [
      P("Giờ ta áp dụng thật quy trình ở chương 4 vào 4 AC của tính năng mã giảm giá ShopEasy. Làm theo thứ tự dưới đây để có một bộ điểm kiểm đầy đủ, bám sát yêu cầu.",
        "Now let's really apply the process from chapter 4 to the 4 ACs of ShopEasy's discount-code feature. Follow the order below to get a full set of test points closely tied to the requirement.",
        "では第4章のプロセスをShopEasyの割引コード機能の4つのACに実際に適用してみましょう。以下の順に沿って、要件に忠実な完全なテストポイント一式を作りましょう。"),
      STEP(1, "AC1 ('mã hợp lệ, còn hạn') -> điểm kiểm: nhập mã hợp lệ, còn hạn -> tổng tiền giảm đúng số đã công bố.", "AC1 ('valid, non-expired code') -> test point: enter a valid, non-expired code -> the total is reduced by exactly the stated amount.", "AC1（『有効で期限内のコード』）→テストポイント：有効で期限内のコードを入力→合計金額が明記された額だけ正しく減額される。"),
      STEP(2, "AC2 ('mã không tồn tại/hết hạn') -> tách thành 2 điểm kiểm riêng: mã không tồn tại, và mã đã hết hạn — vì đây là 2 tình huống khác nhau.", "AC2 ('non-existent/expired code') -> split into 2 separate test points: a non-existent code, and an expired code — since these are two different situations.", "AC2（『存在しない/期限切れのコード』）→2つの別々のテストポイントに分ける：存在しないコードと、期限切れのコード——これらは異なる状況だから。"),
      STEP(3, "AC3 ('giảm tối đa 100.000đ') -> tạm ghi điểm kiểm kèm cờ '⚠ cần làm rõ' vì câu này còn mơ hồ (xem chương 6).", "AC3 ('discount up to 100,000đ') -> temporarily note the test point with a '⚠ needs clarification' flag since this sentence is still ambiguous (see chapter 6).", "AC3（『最大10万ドン割引』）→この文はまだ曖昧なため（第6章参照）『⚠要確認』フラグを付けて仮のテストポイントとして記録する。"),
      STEP(4, "AC4 ('chỉ 1 mã mỗi đơn') -> điểm kiểm: sau khi áp mã thứ nhất thành công, thử áp mã thứ hai -> hệ thống phải từ chối.", "AC4 ('only 1 code per order') -> test point: after successfully applying the first code, try applying a second code -> the system must reject it.", "AC4（『1注文につき1コードのみ』）→テストポイント：最初のコードを適用成功後、2つ目のコードを適用しようとする→システムは拒否しなければならない。"),
      CODE("text", "DIEM KIEM TU YEU CAU - Ma giam gia khi thanh toan (ShopEasy)\nTP1 (tu AC1): Ma hop le, con han -> giam dung so tien da cong bo\nTP2 (tu AC2): Ma khong ton tai -> bao loi, khong tru tien\nTP3 (tu AC2): Ma da het han -> bao loi, khong tru tien\nTP4 (tu AC3, CAN LAM RO): Don duoc giam toi da 100.000d -> tinh tren DON hay tung SAN PHAM?\nTP5 (tu AC4): Ap ma thu 2 sau khi da co ma thu nhat -> he thong tu choi\nTP6 (suy luan them, KHONG co trong AC): Xoa ma da ap -> tong tien tro lai gia goc"),
      TRY("Viết thêm 1 điểm kiểm nữa mà bảng TP1-TP6 trên chưa có (gợi ý: mã giảm giá chỉ dùng được cho khách hàng mới, hoặc mã đã dùng hết lượt).", "Write one more test point not covered by TP1-TP6 above (hint: a code only valid for new customers, or a code that has run out of uses).", "上のTP1〜TP6にないテストポイントをもう1つ書こう（ヒント：新規顧客限定コード、または使用回数を使い切ったコード）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: yêu cầu mơ hồ 'giảm giá tối đa' khiến hiểu sai", en: "6. Situation 1: an ambiguous 'max discount' requirement causes a misunderstanding", ja: "6. シーン1：曖昧な『最大割引』要件による誤解" },
    blocks: [
      SITUATION("Bạn đọc AC3 'Giảm tối đa 100.000đ mỗi đơn' và tự hiểu là mức giảm áp dụng cho TOÀN đơn hàng, nên chỉ viết 1 test case ở mức đơn hàng.", "You read AC3 'Discount up to 100,000đ per order' and assume the cap applies to the WHOLE order, so you only write 1 test case at the order level.",
        "Sau khi tính năng lên production, một khách hàng đặt đơn gồm 3 sản phẩm từ 3 shop khác nhau và được giảm tới 300.000đ (100.000đ cho mỗi sản phẩm) — vì lập trình viên lại hiểu mức giảm áp dụng theo TỪNG sản phẩm. ShopEasy chịu lỗ ngoài kế hoạch vì hai bên hiểu yêu cầu khác nhau.",
        "After the feature goes to production, a customer places an order with 3 products from 3 different shops and gets discounted up to 300,000đ (100,000đ per product) — because the developer understood the cap as applying PER PRODUCT. ShopEasy takes an unplanned loss because the two sides interpreted the requirement differently.",
        "AC3『各注文につき最大10万ドン割引』を読み、上限は注文全体に適用されると思い込み、注文レベルのテストケースを1つだけ書いた。",
        "機能が本番環境にリリースされた後、ある顧客が3つの異なるショップの3商品を含む注文をし、最大30万ドン（商品ごとに10万ドン）の割引を受けた——開発者は上限を商品ごとに適用すると理解していたためだ。両者が要件を異なって解釈したため、ShopEasyは計画外の損失を被った。"),
      SOLVE("Ngay khi thấy AC3 có thể hiểu theo 2 cách, viết câu hỏi cụ thể và gửi cho Product Owner/BA để làm rõ TRƯỚC khi viết test case cho phần này — không tự đoán, không giả định theo cách 'nghe hợp lý nhất với mình'.", "As soon as you see AC3 can be read two ways, write a specific question and send it to the Product Owner/BA to clarify BEFORE writing test cases for this part — don't guess, don't assume the interpretation that 'sounds most reasonable to you'.", "AC3が2通りに解釈できると気づいたら、すぐに具体的な質問を書き、この部分のテストケースを書く前にPO/BAに確認する——推測せず、『自分にとって最も妥当に聞こえる』解釈を勝手に採用しない。"),
      P("Đây là bài học lớn nhất trong chương này: một câu yêu cầu ngắn gọn như 'giảm tối đa 100.000đ' có thể ẩn chứa nhiều cách hiểu khác nhau, và nếu tester với lập trình viên hiểu khác nhau, hệ thống sẽ có lỗ hổng thật dù cả hai bên đều 'làm đúng theo hiểu biết của mình'. Việc của tester không phải là đoán đúng, mà là PHÁT HIỆN sự mơ hồ đó sớm nhất có thể.",
        "This is the biggest lesson in this chapter: a short requirement sentence like 'discount up to 100,000đ' can hide multiple different interpretations, and if the tester and developer understand it differently, the system will have a real gap even though both sides 'did it correctly according to their own understanding'. A tester's job isn't to guess correctly, but to DETECT that ambiguity as early as possible.",
        "この章での最大の教訓です：『最大10万ドン割引』のような短い要件文には複数の異なる解釈が潜んでいる可能性があり、テスターと開発者の理解が異なれば、両者が『それぞれの理解に従って正しく』作業していても、システムには実際の穴が生じます。テスターの仕事は正しく推測することではなく、その曖昧さをできるだけ早く発見することです。"),
      RECAP(["Câu yêu cầu ngắn không đồng nghĩa là câu yêu cầu rõ ràng", "Phát hiện được 2 cách hiểu khác nhau -> hỏi lại ngay, đừng tự đoán"],
        ["A short requirement sentence does not mean a clear requirement sentence", "Spotting two possible interpretations -> ask right away, don't guess"],
        ["短い要件文が明確な要件文とは限らない", "2通りの解釈に気づいたら→すぐ確認する、推測しない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: thiếu Acceptance Criteria khiến thiếu ca kiểm thử", en: "7. Situation 2: a missing acceptance criterion leads to missing test cases", ja: "7. シーン2：アクセプタンス・クライテリアの欠落によるテストケースの見落とし" },
    blocks: [
      SITUATION("Tài liệu yêu cầu chỉ có 4 AC (mã hợp lệ, mã không hợp lệ/hết hạn, giảm tối đa, chỉ 1 mã/đơn) — không có câu nào nói về việc XÓA mã đã áp dụng.", "The requirement document only has 4 ACs (valid code, invalid/expired code, max discount, only 1 code/order) — no sentence about REMOVING an already-applied code.",
        "Khách hàng áp mã giảm giá, đổi ý muốn bỏ mã đó ra, bấm nút 'Xóa' cạnh ô mã — nhưng tổng tiền vẫn giữ nguyên mức đã giảm, trong khi khách mong đợi tổng tiền trở lại giá gốc. Đây là lỗi thật nhưng KHÔNG nằm trong bất kỳ AC nào đã viết.",
        "A customer applies a discount code, changes their mind, and clicks the 'Remove' button next to the code field — but the total still keeps the discounted amount, while the customer expects the total to return to the original price. This is a real bug but is NOT covered by any of the written ACs.",
        "要件文書には4つのACしかない（有効なコード、無効/期限切れのコード、最大割引、1注文につき1コードのみ）——適用済みコードの削除については一切記載がない。",
        "顧客が割引コードを適用した後、気が変わってコード欄の隣にある『削除』ボタンをクリックした——しかし合計金額は割引額を保持したままで、顧客は元の価格に戻ることを期待していた。これは実際のバグだが、書かれたどのACにも含まれていない。"),
      SOLVE("Không dừng lại ở việc chỉ test những gì AC nêu ra — chủ động đặt câu hỏi 'còn hành động nào người dùng có thể làm mà yêu cầu chưa nhắc tới không?' (ở đây là xóa mã), rồi báo lại cho BA để bổ sung AC5 chính thức, đồng thời thêm điểm kiểm này vào bộ test case.", "Don't stop at testing only what the AC states — proactively ask 'is there any user action the requirement hasn't mentioned yet?' (here, removing the code), then report it to the BA to formally add AC5, and add this test point to your test case set.", "ACに書かれていることだけをテストして止まらない——『要件がまだ触れていないユーザー操作があるか？』（ここではコード削除）と積極的に問い、BAに報告して正式にAC5を追加してもらい、このテストポイントをテストケース群に加える。"),
      P("Ví dụ này cho thấy phân tích yêu cầu không chỉ là đọc những gì ĐÃ được viết ra, mà còn là chủ động hình dung những hành động hợp lý người dùng có thể làm nhưng tài liệu CHƯA nhắc tới. Danh sách AC không bao giờ hoàn hảo — kỹ năng của tester là bổ khuyết những khoảng trống đó trước khi tính năng lên production, thay vì để người dùng thật phát hiện giúp bạn.",
        "This example shows that requirement analysis isn't just reading what's ALREADY written, but also proactively imagining reasonable user actions the document HASN'T mentioned yet. The AC list is never perfect — a tester's skill is filling those gaps before the feature goes to production, instead of letting real users find them for you.",
        "この例は、要件分析が既に書かれていることを読むだけでなく、文書がまだ触れていない、ユーザーが取りうる合理的な行動を積極的に想像することでもあることを示しています。ACのリストは決して完璧ではありません——テスターのスキルとは、実際のユーザーに見つけてもらう前に、機能が本番環境にリリースされる前にそのギャップを埋めることです。"),
      TRY("Nghĩ thêm 1 hành động hợp lý khác mà người dùng có thể làm với mã giảm giá nhưng 4 AC ở chương 1 chưa nhắc tới (gợi ý: đổi mã khác sau khi đã áp 1 mã, hoặc giỏ hàng thay đổi sau khi áp mã).", "Think of one more reasonable user action with the discount code not mentioned by the 4 ACs in chapter 1 (hint: switching to a different code after applying one, or the cart changing after a code is applied).", "第1章の4つのACに触れられていない、割引コードに関するもう1つの合理的なユーザー行動を考えよう（ヒント：コード適用後に別のコードに変更する、コード適用後にカート内容が変わる）。"),
    ] },
  { heading: { vi: "8. Hỏi làm rõ khi yêu cầu mơ hồ", en: "8. Asking for clarification when a requirement is ambiguous", ja: "8. 要件が曖昧な時の確認方法" },
    blocks: [
      P("Khi bạn phát hiện một câu yêu cầu có thể hiểu theo nhiều cách, đừng chỉ nói chung chung 'yêu cầu này chưa rõ' — hãy viết câu hỏi cụ thể, nêu rõ VÌ SAO bạn cần câu trả lời (thường là vì bạn không viết được test case đúng nếu chưa biết), và gửi đúng người có thẩm quyền trả lời (thường là Product Owner hoặc Business Analyst).",
        "When you spot a requirement sentence that can be read multiple ways, don't just vaguely say 'this requirement is unclear' — write a specific question, state clearly WHY you need the answer (usually because you can't write a correct test case without it), and send it to the person with the authority to answer (usually the Product Owner or Business Analyst).",
        "複数の解釈ができる要件文に気づいたら、漠然と『この要件は不明確です』と言うだけでなく、具体的な質問を書き、なぜ回答が必要か（通常は分からないと正しいテストケースが書けないため）を明確にし、回答する権限を持つ人（通常はプロダクトオーナーまたはビジネスアナリスト）に送りましょう。"),
      IMG(m_jira, "Ticket câu hỏi làm rõ gửi Product Owner/BA về mức giảm giá tối đa", "A clarification-question ticket sent to the Product Owner/BA about the max discount", "最大割引額についてプロダクトオーナー/BAに送られた確認質問チケット"),
      P("Một câu hỏi làm rõ tốt thường có 3 phần: (1) trích lại đúng câu yêu cầu đang mơ hồ, (2) nêu ít nhất 2 cách hiểu khác nhau mà bạn nghĩ ra được, (3) giải thích vì sao câu trả lời ảnh hưởng tới test case bạn sắp viết. Cách hỏi này giúp người trả lời hiểu ngay vấn đề, thay vì phải hỏi lại bạn 'ý bạn là gì'.",
        "A good clarification question usually has 3 parts: (1) quote the exact ambiguous requirement sentence, (2) state at least 2 different interpretations you can think of, (3) explain why the answer affects the test cases you're about to write. This way of asking helps the answerer immediately understand the issue, instead of having to ask you back 'what do you mean'.",
        "良い確認質問には通常3つの要素があります：(1) 曖昧な要件文をそのまま引用する、(2) 考えられる少なくとも2通りの解釈を提示する、(3) その回答がこれから書くテストケースにどう影響するかを説明する。この聞き方により、回答者はすぐに問題を理解でき、あなたに『どういう意味ですか』と聞き返す必要がなくなります。"),
      TIP("Đừng chờ tới khi viết xong toàn bộ test case mới hỏi. Hỏi ngay khi bạn PHÁT HIỆN yêu cầu mơ hồ, và có thể tiếp tục viết các điểm kiểm rõ ràng khác trong lúc chờ câu trả lời.", "Don't wait until all test cases are written to ask. Ask as soon as you SPOT the ambiguous requirement, and you can keep writing other clear test points while waiting for the answer.", "全てのテストケースを書き終えてから質問するのを待たないこと。曖昧な要件に気づいたらすぐ質問し、回答を待つ間は他の明確なテストポイントを書き続けられます。"),
    ] },
  { heading: { vi: "9. Truy vết yêu cầu ↔ test case (traceability)", en: "9. Requirement-to-test-case traceability", ja: "9. 要件↔テストケースのトレーサビリティ" },
    blocks: [
      P("Sau khi đã viết xong các test case, làm sao biết bạn đã phủ đủ mọi yêu cầu, không bỏ sót AC nào? Cách làm đơn giản: dựng một bảng liệt kê từng AC ở một cột, và các test case tương ứng ở cột bên cạnh — đây gọi là ma trận truy vết yêu cầu (requirement traceability matrix).",
        "After you've finished writing test cases, how do you know you've covered every requirement without missing any AC? A simple way: build a table listing each AC in one column, and its corresponding test cases in the next column — this is called a requirement traceability matrix.",
        "テストケースを書き終えた後、全ての要件をカバーし、どのACも見落としていないとどうやって分かるでしょうか？シンプルな方法：各ACを1つの列に、対応するテストケースを隣の列にリストアップした表を作ります——これを要件トレーサビリティ・マトリックスと呼びます。"),
      IMG(m_trace, "Ma trận truy vết yêu cầu -> test case của tính năng mã giảm giá", "Requirement-to-test-case traceability matrix for the discount-code feature", "割引コード機能の要件→テストケース トレーサビリティ・マトリックス"),
      P("Nhìn vào ma trận này, bạn lập tức thấy AC3 ('giảm tối đa 100.000đ') đang có 2 test case ở trạng thái 'Fail — chờ làm rõ AC3' — đúng là điểm mơ hồ ta phát hiện ở chương 6. Ma trận truy vết không chỉ giúp bạn kiểm tra độ phủ, mà còn giúp bạn ưu tiên: yêu cầu nào chưa được làm rõ, yêu cầu nào cần thêm test case, đều lộ ra rất rõ ràng trên một bảng duy nhất.",
        "Looking at this matrix, you immediately see AC3 ('discount up to 100,000đ') has 2 test cases in a 'Fail — waiting for AC3 clarification' state — exactly the ambiguous point we spotted in chapter 6. A traceability matrix doesn't just help you check coverage; it also helps you prioritize: which requirements aren't yet clarified, which need more test cases — all clearly visible in a single table.",
        "このマトリックスを見ると、AC3（『最大10万ドン割引』）が『Fail——AC3の確認待ち』状態のテストケースを2つ持っていることがすぐに分かります——第6章で見つけた曖昧な点そのものです。トレーサビリティ・マトリックスはカバレッジを確認するだけでなく、優先順位付けにも役立ちます：どの要件がまだ確認されていないか、どの要件にさらにテストケースが必要か、1つの表で明確に分かります。"),
      IMG(m_dash, "Số liệu độ phủ yêu cầu của tính năng mã giảm giá ShopEasy", "Requirement coverage metrics for ShopEasy's discount-code feature", "ShopEasy割引コード機能の要件カバレッジ指標"),
      TIP("Cập nhật ma trận truy vết ngay khi yêu cầu thay đổi hoặc có câu trả lời làm rõ mới — đừng để nó trở thành tài liệu 'viết một lần rồi bỏ quên'.", "Update the traceability matrix as soon as a requirement changes or a new clarification answer arrives — don't let it become a 'write once and forget' document.", "要件が変更されたり新しい確認回答が得られたりしたら、すぐにトレーサビリティ・マトリックスを更新しましょう——『一度書いたら忘れる』文書にしないこと。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi", "初心者のためのテストケースの書き方"),
      INTERNAL("Checklist kịch bản kiểm thử (test scenario) cho người mới", "Test scenario checklist for beginners", "test-scenario-checklist-cho-nguoi-moi", "初心者のためのテストシナリオ・チェックリスト"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách đọc và phân tích yêu cầu qua tính năng mã giảm giá của ShopEasy: phân biệt user story và acceptance criteria, kỹ thuật tách AC thành các điểm kiểm cụ thể, hai tình huống thật cho thấy yêu cầu mơ hồ hoặc thiếu sót dễ dẫn tới lỗi nghiêm trọng, cách đặt câu hỏi làm rõ đúng chỗ, và cách dựng ma trận truy vết yêu cầu ↔ test case để tự kiểm tra độ phủ. Đây là kỹ năng nền tảng đứng trước mọi kỹ thuật thiết kế test case khác.",
        "You just learned how to read and analyze requirements through ShopEasy's discount-code feature: telling user stories and acceptance criteria apart, techniques for breaking AC into concrete test points, two real situations showing that ambiguous or missing requirements easily lead to serious bugs, how to ask the right clarification question, and how to build a requirement-to-test-case traceability matrix to self-check coverage. This is a foundational skill that comes before every other test case design technique.",
        "ShopEasyの割引コード機能を通じて、要件の読み方と分析方法を学びました：ユーザーストーリーとアクセプタンス・クライテリアの区別、ACを具体的なテストポイントに分解する技法、曖昧または欠落した要件が重大なバグにつながりやすいことを示す2つの実例、適切な確認質問の仕方、そしてカバレッジを自己チェックするための要件↔テストケース・トレーサビリティ・マトリックスの作り方。これは他の全てのテストケース設計技法に先立つ土台となるスキルです。"),
      P("Chặng tiếp theo, bạn nên học cách viết test case rõ ràng từ các điểm kiểm đã tách được, cùng kỹ thuật phân vùng tương đương và giá trị biên để thiết kế ca kiểm thử có hệ thống hơn cho những điểm kiểm liên quan tới số liệu (như mức giảm giá 100.000đ). Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khóa học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn how to write clear test cases from the test points you've derived, along with equivalence partitioning and boundary value techniques to more systematically design test cases for number-related test points (like the 100,000đ discount cap). If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、導き出したテストポイントから明確なテストケースを書く方法と、数値に関わるテストポイント（10万ドンの割引上限など）をより体系的に設計するための同値分割・境界値分析の技法を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const YEUCAU_01 = makeDoc({
  slug: "doc-phan-tich-yeu-cau-de-viet-test-case-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "phân tích yêu cầu",
  keywords: ["phân tích yêu cầu", "requirement analysis", "acceptance criteria", "user story", "truy vết yêu cầu", "test case cho người mới"],
  coverLabel: "NGƯỜI MỚI · PHÂN TÍCH YÊU CẦU · TMĐT",
  crumb: "Phân tích yêu cầu để viết test case cho người mới",
  metaTitle: { vi: "Phân tích yêu cầu để viết test case cho người mới", en: "Requirement analysis for writing test cases for beginners", ja: "初心者向け要件分析とテストケース作成" },
  metaDescription: {
    vi: "Phân tích yêu cầu để viết test case cho người mới: đọc user story, acceptance criteria, tách điểm kiểm và truy vết yêu cầu qua ví dụ ShopEasy, có trắc nghiệm.",
    en: "Requirement analysis for writing test cases: reading user stories and acceptance criteria, deriving test points, asking clarifying questions, and traceability, through ShopEasy's discount-code example, with visuals and a quiz.",
    ja: "初心者向け要件分析：ユーザーストーリーとACの読み方、テストポイントの導出、確認質問、トレーサビリティをShopEasyの割引コード例で解説。図とクイズ付き。",
  },
  title: {
    vi: "Phân tích yêu cầu để viết test case cho người mới: đọc user story, tách điểm kiểm, hỏi làm rõ (có trắc nghiệm)",
    en: "Requirement analysis for beginners: reading user stories, deriving test points, asking clarifying questions (with quiz)",
    ja: "初心者のための要件分析：ユーザーストーリーの読み方、テストポイントの導出、確認質問（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cách đọc và phân tích yêu cầu (user story, acceptance criteria) qua tính năng mã giảm giá của app TMĐT ShopEasy. Tách yêu cầu thành điểm kiểm, nhận ra yêu cầu mơ hồ/thiếu sót để hỏi làm rõ đúng chỗ, dựng ma trận truy vết yêu cầu ↔ test case, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to read and analyze requirements (user stories, acceptance criteria) through ShopEasy's discount-code feature. Break requirements into test points, spot ambiguous/missing requirements to ask the right clarifying question, build a requirement-to-test-case traceability matrix, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyの割引コード機能を通じて要件（ユーザーストーリー、アクセプタンス・クライテリア）の読み方と分析方法を学ぶ。要件をテストポイントに分解し、曖昧/欠落した要件に気づいて適切に確認質問し、要件↔テストケースのトレーサビリティ・マトリックスを作成。多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách phân tích yêu cầu để viết test case", steps: [
    { name: "Đọc user story để nắm bối cảnh, rồi đọc từng Acceptance Criteria", text: "Tách riêng điều kiện và kết quả mong đợi trong từng câu." },
    { name: "Tách mỗi AC thành một hoặc nhiều điểm kiểm cụ thể", text: "Điểm kiểm đủ chi tiết để chuyển thành test case." },
    { name: "Hỏi làm rõ khi phát hiện yêu cầu mơ hồ, rồi truy vết yêu cầu với test case", text: "Dựng ma trận truy vết để kiểm tra độ phủ trước khi báo cáo hoàn thành." },
  ] },
  pages,
});

export const MB_YEUCAU_01 = [YEUCAU_01];
