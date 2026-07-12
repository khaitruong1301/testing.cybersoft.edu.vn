// doc_ma_error_guessing.mjs — BÀI MANUAL "NÂNG CAO":
// Kỹ thuật đoán lỗi (Error Guessing) & checklist lỗi kinh nghiệm — áp dụng cho hệ thống
// NGÂN HÀNG (core banking): chuyển khoản, hạn mức, làm tròn tiền, đồng thời, timeout giao dịch.
// Xây dựng defect taxonomy/checklist, ca đoán lỗi theo nghiệp vụ, 2 tình huống thật (jira/kanban).
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
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến ngân hàng.",
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "banking", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình chuyển khoản CoreBank, khoanh vùng các điểm nghi lỗi ──
const m_txn = browser("corebank.internal/giao-dich/chuyen-khoan/GD-77021", [
  panel("CoreBank · Chuyển khoản trong hệ thống", [
    field(24, 20, 330, "Tài khoản nguồn", "1900xxxx2210 · Số dư: 15.482.317đ", "normal"),
    field(372, 20, 330, "Tài khoản đích", "1900xxxx8890 · Ngân hàng ABC", "normal"),
    field(24, 92, 330, "Số tiền chuyển", "4.999.999,50đ", "focus"),
    field(372, 92, 330, "Phí giao dịch (0,05%)", "2.499,9995đ ≈ 2.500đ", "focus"),
    field(24, 164, 330, "Hạn mức còn lại/ngày", "5.000.000đ", "error"),
    field(372, 164, 330, "Trạng thái xử lý", "Đang chờ core xác nhận (12s)", "error"),
    btn(24, 236, 200, "Xác nhận chuyển", "primary"),
    annotate(20, 82, 330, 44, "Nghi lỗi: làm tròn phí — nửa xu về đâu?"),
    annotate(20, 154, 330, 44, "Nghi lỗi: hạn mức chưa trừ GD đang treo"),
    annotate(368, 154, 330, 44, "Nghi lỗi: timeout 12s — bấm lại có trừ đôi?"),
  ].join(""), { h: 300, accent: "#155ce1" }),
].join(""), { h: 356, title: "CoreBank · Ngân hàng lõi", accent: "#155ce1" });

// ── Mockup 2: Defect Taxonomy — checklist lỗi kinh nghiệm ──
const m_taxonomy = grid("Defect Taxonomy — checklist lỗi kinh nghiệm cho core banking", ["Nhóm lỗi (kinh nghiệm)", "Biểu hiện thường gặp", "Vì sao khó bắt bằng kỹ thuật hình thức"], [
  ["Làm tròn & sai số thập phân", "Chênh 1–2 xu khi tính lãi/phí, dồn tích qua nhiều kỳ", "EP/BVA test từng giao dịch đơn lẻ, không lộ sai số DỒN TÍCH qua thời gian"],
  ["Hạn mức & giá trị biên động", "Hạn mức không trừ đúng GD đang xử lý/treo", "Boundary test giả định hạn mức tĩnh, thực tế hạn mức đổi theo thời gian thực"],
  ["Đồng thời & tranh chấp tài nguyên", "2 GD cùng lúc đều được duyệt dù tổng vượt hạn mức/số dư", "Kỹ thuật hình thức test tuần tự, không mô phỏng race condition"],
  ["Timeout & idempotency", "Bấm lại/timeout gây ghi nhận giao dịch 2 lần", "Ca kiểm thử chuẩn giả định mạng ổn định, không có độ trễ/retry"],
  ["Chuyển đổi tiền tệ & tỉ giá", "Sai số khi quy đổi VND–USD qua nhiều bước trung gian", "Ca dương/âm không phủ chuỗi quy đổi nhiều bước với tỉ giá thực"],
  ["Trạng thái treo & rollback nửa vời", "GD báo lỗi nhưng tiền đã trừ, chưa hoàn", "State machine hình thức không mô hình hoá lỗi hạ tầng giữa chừng"],
], { accent: "#155ce1", note: "Cập nhật sau mỗi postmortem/sự cố production — checklist là tài sản chung của đội." });

// ── Mockup 3: ca đoán lỗi nghiệp vụ CHUYỂN KHOẢN ──
const m_case_transfer = grid("Ca đoán lỗi — nghiệp vụ CHUYỂN KHOẢN", ["Ca đoán lỗi (kinh nghiệm)", "Nguồn kinh nghiệm", "Kết quả mong đợi"], [
  ["Chuyển đúng bằng số dư khả dụng, trừ đi phí", "Nhiều hệ thống quên trừ phí trước khi so hạn mức/số dư", "Từ chối nếu (số tiền + phí) > số dư khả dụng"],
  ["Chuyển số tiền có phần thập phân lẻ (4.999.999,50đ)", "Làm tròn phí dễ lệch ở phần thập phân lẻ", "Phí làm tròn nhất quán theo quy tắc ngân hàng đã công bố"],
  ["Huỷ giao dịch đúng lúc core đang xác nhận (12s)", "Timeout core là nguồn lỗi double-debit kinh điển", "Không trừ tiền 2 lần; GD chỉ ở 1 trong 2 trạng thái cuối"],
  ["Chuyển liên ngân hàng ngoài giờ xử lý bù trừ", "Hệ thống bù trừ liên ngân hàng có khung giờ riêng", "Hiển thị đúng thời gian dự kiến ghi có, không báo 'thành công' sai"],
  ["Chuyển đến chính tài khoản nguồn", "Lỗi kinh điển ghi nhận ở nhiều đợt sự cố production", "Từ chối với thông báo rõ ràng, không tạo GD nội bộ vô nghĩa"],
], { accent: "#155ce1" });

// ── Mockup 4: ca đoán lỗi HẠN MỨC & ĐỒNG THỜI ──
const m_case_limit = grid("Ca đoán lỗi — HẠN MỨC & GIAO DỊCH ĐỒNG THỜI", ["Ca đoán lỗi (kinh nghiệm)", "Nguồn kinh nghiệm", "Kết quả mong đợi"], [
  ["Bắn 2 giao dịch đồng thời, tổng = hạn mức + 1đ", "Race condition kinh điển ở core dùng optimistic lock", "Chỉ 1 GD được duyệt, GD còn lại bị từ chối rõ ràng"],
  ["GD đang 'treo xử lý' có tính vào hạn mức đã dùng?", "Nhiều core chỉ trừ hạn mức khi GD 'thành công'", "Hạn mức phải trừ ngay khi GD được ghi nhận pending"],
  ["Đổi hạn mức ngày giữa lúc đang có GD treo", "Thay đổi cấu hình runtime dễ vênh với GD đang xử lý", "Hạn mức áp dụng nhất quán theo thời điểm GD khởi tạo"],
  ["2 kênh (app + quầy) cùng trừ 1 tài khoản cùng lúc", "Lỗi 'lost update' khi 2 kênh không dùng chung khoá", "Số dư cuối đúng bằng tổng trừ của cả 2 kênh, không mất GD"],
], { accent: "#b45309" });

// ── Mockup 5: ca đoán lỗi LÀM TRÒN TIỀN & TIMEOUT ──
const m_case_round = grid("Ca đoán lỗi — LÀM TRÒN TIỀN & TIMEOUT GIAO DỊCH", ["Ca đoán lỗi (kinh nghiệm)", "Nguồn kinh nghiệm", "Kết quả mong đợi"], [
  ["Tính lãi trên số dư lẻ, cộng dồn nhiều kỳ", "Sai số làm tròn từng kỳ dồn tích thành lệch cuối kỳ", "Làm tròn CHỈ ở bước cuối cùng, không làm tròn từng bước"],
  ["Timeout ở bước gọi core nhưng UI vẫn hiện 'đang xử lý'", "Người dùng bấm lại nhiều lần khi thấy treo màn hình", "Idempotency key chặn giao dịch trùng dù bấm lại bao nhiêu lần"],
  ["Mất kết nối ngay sau khi ghi Nợ, trước khi ghi Có", "Lỗi rollback nửa vời phổ biến trong hệ thống phân tán", "Có cơ chế bù trừ/đối soát tự động, không để treo vĩnh viễn"],
  ["Làm tròn số tiền qua 2 lần quy đổi ngoại tệ", "Quy đổi VND→USD→VND qua trung gian dễ lệch do làm tròn 2 lần", "Có quy tắc làm tròn thống nhất, tài liệu hoá rõ đơn vị nhỏ nhất"],
], { accent: "#7c3aed" });

// ── Mockup 6: ticket Jira lỗi làm tròn lãi tiết kiệm ──
const m_jira = jira({
  key: "CB-53312", title: "Lãi tiết kiệm kỳ hạn 30 ngày bị lệch do làm tròn từng ngày thay vì làm tròn cuối kỳ",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "UAT · CoreBank Savings Engine v4.2 · batch tính lãi đêm"],
    ["Các bước", "1) Tạo sổ tiết kiệm 30 ngày, số dư lẻ 2) Chạy batch tính lãi từng ngày trong 30 ngày 3) So sánh tổng lãi với công thức tính 1 lần cuối kỳ"],
    ["Kết quả mong đợi", "Tổng lãi 30 ngày = số dư × lãi suất × 30, làm tròn đúng 1 lần ở bước cuối"],
    ["Kết quả thực tế", "Tổng lãi lệch dương so với công thức chuẩn do mỗi ngày làm tròn lên rồi cộng dồn 30 lần"],
    ["Bằng chứng", "batch-log-30days.csv, cong-thuc-doi-chieu.xlsx"],
  ],
});

// ── Mockup 7: kanban theo dõi lỗi tìm qua Error Guessing ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua Error Guessing (CoreBank · Sprint Ngân hàng lõi)", [
  { name: "New", cards: [
    { key: "CB-53312", title: "Lãi tiết kiệm lệch do làm tròn từng ngày", sev: "Critical" },
    { key: "CB-53298", title: "2 GD đồng thời vượt hạn mức ngày", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "CB-53270", title: "Timeout core gây ghi nhận GD 2 lần", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "CB-53201", title: "Hạn mức chưa trừ GD đang treo", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "CB-53140", title: "Quy đổi ngoại tệ lệch do làm tròn 2 lần", sev: "Medium" },
  ] },
]);

// ── Mockup 8: dashboard tỉ lệ lỗi tìm qua Error Guessing ──
const m_dash = dashboard("Lỗi tìm được qua Error Guessing — Sprint Ngân hàng lõi CoreBank", [
  { label: "Tổng lỗi liên quan tiền", value: "16", sub: "sprint này", color: "#2563eb" },
  { label: "Tìm bởi Error Guessing", value: "11", sub: "~69%", color: "#7c3aed" },
  { label: "Không phát hiện bằng EP/BVA", value: "9", sub: "chỉ lộ khi đồng thời/lặp kỳ", color: "#b45309" },
  { label: "Mức Critical (ảnh hưởng tiền)", value: "7", sub: "làm tròn + hạn mức + timeout", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kỹ thuật đoán lỗi (error guessing) là gì và khi nào nên dùng trong dự án ngân hàng?",
  "What is error guessing, and when should it be used in a banking project?",
  "Kỹ thuật đoán lỗi là kỹ thuật kiểm thử dựa trên kinh nghiệm: tester dùng lịch sử lỗi, trực giác nghiệp vụ và hiểu biết về hệ thống để đoán trước những vị trí dễ hỏng, rồi thiết kế ca kiểm thử nhắm thẳng vào đó. Trong dự án ngân hàng, nên dùng SAU KHI đã phủ đủ ca kiểm thử hình thức (phân vùng tương đương, giá trị biên, bảng quyết định) cho luồng chính — error guessing đóng vai trò 'vá' những góc mà kỹ thuật hình thức khó chạm tới, đặc biệt là hành vi hệ thống khi nhiều giao dịch tương tác đồng thời.",
  "Error guessing is an experience-based testing technique: testers use defect history, business intuition, and system knowledge to predict likely failure points, then design test cases that target them directly. In a banking project, it should be applied AFTER formal test cases (equivalence partitioning, boundary values, decision tables) already cover the main flow — error guessing then 'patches' the corners formal techniques struggle to reach, especially system behavior when multiple transactions interact concurrently.",
  "エラー推測（error guessing）とは何か、銀行プロジェクトではいつ使うべき？",
  "エラー推測とは経験ベースのテスト技法で、テスターは不具合の履歴・業務的直感・システムへの理解を使って壊れやすい箇所を予測し、そこを狙ったテストケースを設計します。銀行プロジェクトでは、まず同値分割・境界値分析・デシジョンテーブルなどの形式的テストケースでメインフローを十分カバーした『後』に適用すべきです。エラー推測は、複数の取引が同時に相互作用する際のシステムの振る舞いなど、形式的技法が届きにくい隙間を『補修』する役割を果たします。");
const faq2 = FAQ(
  "Làm sao xây một checklist lỗi kinh nghiệm (defect taxonomy) hiệu quả, không chỉ đoán bừa?",
  "How do you build an effective experience-based checklist (defect taxonomy) instead of just guessing randomly?",
  "Thu thập nguồn kinh nghiệm có thật (báo cáo postmortem, backlog lỗi cũ, báo cáo kiểm toán nội bộ, phỏng vấn đội vận hành/hỗ trợ), phân loại theo NHÓM NGUYÊN NHÂN GỐC thay vì theo từng màn hình, viết ca kiểm thử nhắm trúng điều kiện gây lỗi của từng nhóm, và review định kỳ để loại ca đã 'miễn dịch' lâu ngày, tránh checklist phình to vô ích.",
  "Collect real sources of experience (postmortem reports, old bug backlogs, internal audit reports, interviews with ops/support teams), classify defects by ROOT-CAUSE GROUP rather than by screen, write test cases that target the exact condition causing each group's bugs, and review the checklist periodically to retire cases that have long been 'immune', so it doesn't bloat uselessly.",
  "当てずっぽうではなく、効果的な経験ベースのチェックリスト（デフェクト・タクソノミー）をどう作る？",
  "実際の経験の情報源（ポストモーテム報告書、過去の不具合バックログ、内部監査報告書、運用/サポートチームへのヒアリング）を集め、画面単位ではなく『根本原因グループ』で分類し、各グループの不具合を引き起こす条件を直接狙ったテストケースを書き、長期間再発しない『免疫済み』のケースを外すために定期的にレビューし、チェックリストが無駄に肥大化しないようにします。");
const faq3 = FAQ(
  "Vì sao ngân hàng cần error guessing dù đã có đầy đủ kỹ thuật kiểm thử hình thức?",
  "Why does banking need error guessing even with full coverage of formal testing techniques?",
  "Vì phần lớn lỗi nghiêm trọng nhất trong core banking — sai số làm tròn dồn tích, giao dịch đồng thời vượt hạn mức, double-debit do timeout — không nằm trong một giao dịch đơn lẻ mà nằm ở hành vi hệ thống khi nhiều yếu tố (thời gian, đồng thời, lặp lại nhiều kỳ) cộng hưởng với nhau. Không công thức hình thức nào tự sinh ra những ca này; chúng chỉ lộ ra qua kinh nghiệm quan sát sự cố thật đã xảy ra.",
  "Because most of core banking's most serious bugs — cumulative rounding errors, concurrent transactions exceeding a limit, double-debit from a timeout — don't live in a single transaction but in system behavior when multiple factors (time, concurrency, repeated cycles) combine. No formal formula automatically generates these cases; they only surface through experience observing real incidents that have actually occurred.",
  "形式的テスト技法が十分に揃っているのに、なぜ銀行にはエラー推測が必要？",
  "コアバンキングにおける最も深刻な不具合の多く——累積する端数処理の誤差、限度額を超える同時取引、タイムアウトによる二重引き落とし——は単一の取引にあるのではなく、時間・同時実行・繰り返しのサイクルといった複数の要因が重なり合うシステムの振る舞いにあるからです。これらのケースを自動的に生み出す形式的な公式は存在せず、実際に起きたインシデントを観察した経験からのみ見えてきます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kỹ thuật đoán lỗi (error guessing) khác gì so với kỹ thuật hình thức như phân vùng tương đương hay bảng quyết định?", en: "How does error guessing differ from formal techniques like equivalence partitioning or decision tables?", ja: "エラー推測は同値分割やデシジョンテーブルなどの形式的技法とどう違う？" },
    options: [
      { vi: "Đoán lỗi dựa vào kinh nghiệm/trực giác về lỗi thường gặp; kỹ thuật hình thức suy ra ca kiểm thử có công thức, lặp lại được từ đặc tả", en: "Error guessing relies on experience/intuition about common bugs; formal techniques derive reproducible, formulaic test cases from the specification", ja: "エラー推測はよくある不具合についての経験・直感に基づく。形式的技法は仕様から公式的で再現可能なテストケースを導き出す" },
      { vi: "Đoán lỗi chỉ dùng cho kiểm thử hiệu năng, không dùng cho kiểm thử chức năng", en: "Error guessing is only used for performance testing, never for functional testing", ja: "エラー推測は性能テストにのみ使い、機能テストには使わない" },
      { vi: "Đoán lỗi và kỹ thuật hình thức là một, chỉ khác tên gọi", en: "Error guessing and formal techniques are the same thing, just different names", ja: "エラー推測と形式的技法は名前が違うだけで同じものである" },
      { vi: "Đoán lỗi không cần tester có kinh nghiệm, ai làm cũng ra kết quả như nhau", en: "Error guessing doesn't require an experienced tester; anyone gets the same result", ja: "エラー推測は経験のあるテスターでなくても誰がやっても同じ結果になる" },
    ], correct: 0,
    explain: { vi: "Đoán lỗi thuộc nhóm kỹ thuật dựa trên kinh nghiệm (ISTQB), phụ thuộc hiểu biết và lịch sử lỗi của tester; kỹ thuật hình thức suy luận có công thức, lặp lại được từ đặc tả.", en: "Error guessing belongs to the experience-based technique group (ISTQB), depending on the tester's knowledge and defect history; formal techniques derive test cases in a reproducible, formulaic way from the specification.", ja: "エラー推測はISTQBの経験ベース技法に属し、テスターの知識と不具合履歴に依存する。形式的技法は仕様から公式的かつ再現可能にテストケースを導く。" },
  }),
  mcq({
    q: { vi: "Vì sao nên xây Defect Taxonomy (bảng phân loại lỗi kinh nghiệm) thay vì chỉ đoán lỗi tự do theo cảm tính?", en: "Why build a defect taxonomy instead of just guessing bugs freely on a hunch?", ja: "感覚だけで自由にエラー推測するのではなく、なぜデフェクト・タクソノミーを構築すべき？" },
    options: [
      { vi: "Vì nó hệ thống hoá kinh nghiệm thành checklist tái sử dụng được, tránh phụ thuộc hoàn toàn vào trí nhớ của một cá nhân", en: "Because it systematizes experience into a reusable checklist, avoiding total dependence on one person's memory", ja: "経験を再利用可能なチェックリストとして体系化し、一個人の記憶だけに依存するのを避けるため" },
      { vi: "Vì Defect Taxonomy thay thế hoàn toàn kỹ thuật hình thức, không cần EP/BVA nữa", en: "Because a defect taxonomy completely replaces formal techniques, so EP/BVA are no longer needed", ja: "デフェクト・タクソノミーは形式的技法を完全に置き換え、もはやEP/BVAは不要になるから" },
      { vi: "Vì Defect Taxonomy chỉ cần làm 1 lần rồi không bao giờ cập nhật", en: "Because a defect taxonomy only needs to be created once and never updated", ja: "デフェクト・タクソノミーは一度作れば二度と更新する必要がないから" },
      { vi: "Vì Defect Taxonomy chỉ áp dụng được cho kiểm thử hiệu năng", en: "Because a defect taxonomy can only be applied to performance testing", ja: "デフェクト・タクソノミーは性能テストにしか適用できないから" },
    ], correct: 0,
    explain: { vi: "Defect Taxonomy biến kinh nghiệm cá nhân thành tài sản chung của đội, cập nhật liên tục từ postmortem/sự cố production để không phụ thuộc vào trí nhớ của một người.", en: "A defect taxonomy turns individual experience into a shared team asset, continuously updated from postmortems/production incidents so it doesn't depend on one person's memory.", ja: "デフェクト・タクソノミーは個人の経験をチーム共有の資産に変え、ポストモーテムや本番インシデントから継続的に更新することで一個人の記憶に依存しないようにする。" },
  }),
  mcq({
    q: { vi: "Trong ví dụ lãi tiết kiệm bị lệch do làm tròn (chương 8), nguyên nhân gốc là gì?", en: "In the savings-interest rounding example (chapter 8), what was the root cause?", ja: "第8章の普通預金利息のずれの例では、根本原因は何？" },
    options: [
      { vi: "Hệ thống làm tròn ở MỖI kỳ tính lãi rồi cộng dồn, thay vì chỉ làm tròn 1 lần ở bước cuối cùng", en: "The system rounds at EVERY interest cycle and accumulates, instead of rounding only once at the final step", ja: "最終ステップで一度だけ端数処理するのではなく、利息計算の『各』サイクルで端数処理して累積させていた" },
      { vi: "Hệ thống không tính lãi suất đúng công thức toán học cơ bản", en: "The system doesn't apply the basic interest formula correctly at all", ja: "システムが基本的な利息計算式自体を正しく適用していなかった" },
      { vi: "Khách hàng nhập sai số dư ban đầu khi mở sổ tiết kiệm", en: "The customer entered the wrong initial balance when opening the savings account", ja: "顧客が口座開設時に初期残高を誤って入力した" },
      { vi: "Ngân hàng cố tình tính sai để thu lợi từ khách hàng", en: "The bank intentionally miscalculates to profit from customers", ja: "銀行が顧客から利益を得るために意図的に誤計算していた" },
    ], correct: 0,
    explain: { vi: "Làm tròn từng bước trung gian rồi cộng dồn qua nhiều kỳ là nguyên nhân kinh điển gây sai số tích luỹ; cách đúng là chỉ làm tròn ở bước cuối.", en: "Rounding at every intermediate step and accumulating over many cycles is the classic cause of cumulative errors; the correct approach rounds only at the final step.", ja: "各中間ステップで端数処理して多くのサイクルにわたって累積させるのは、累積誤差の典型的な原因である。正しい方法は最終ステップでのみ端数処理すること。" },
  }),
  mcq({
    q: { vi: "Ca đoán lỗi nào phù hợp nhất để phát hiện lỗi 'hai giao dịch đồng thời cùng vượt hạn mức'?", en: "Which error-guessing case best detects 'two concurrent transactions jointly exceeding the limit'?", ja: "『2つの同時取引が合わせて限度額を超える』バグを見つけるのに最も適したエラー推測ケースはどれ？" },
    options: [
      { vi: "Bắn 2 giao dịch gần như đồng thời, mỗi giao dịch nhỏ hơn hạn mức còn lại tại thời điểm đọc nhưng tổng vượt hạn mức", en: "Fire 2 transactions almost simultaneously, each smaller than the remaining limit at read time but jointly exceeding it", ja: "読み取り時点での残り限度額より小さいが、合計すると限度額を超える2つの取引をほぼ同時に送信する" },
      { vi: "Chạy tuần tự từng giao dịch một, đợi giao dịch trước hoàn tất mới gửi giao dịch sau", en: "Run transactions sequentially, waiting for one to finish before sending the next", ja: "前の取引が完了するのを待ってから次を送る、というように順番に取引を実行する" },
      { vi: "Chỉ kiểm tra giao diện có hiển thị đúng số hạn mức còn lại hay không", en: "Only check whether the UI displays the correct remaining limit", ja: "画面が残り限度額を正しく表示しているかだけを確認する" },
      { vi: "Kiểm tra chính tả của thông báo lỗi khi vượt hạn mức", en: "Check the spelling of the error message shown when the limit is exceeded", ja: "限度額超過時のエラーメッセージのスペルを確認する" },
    ], correct: 0,
    explain: { vi: "Lỗi race condition trên hạn mức chỉ lộ ra khi có 2+ giao dịch chạm ngưỡng được gửi gần như đồng thời, kiểm tra core có khoá tài khoản đúng khi đọc-ghi hạn mức hay không.", en: "The limit race-condition bug only surfaces when 2+ threshold-hitting transactions are sent almost simultaneously, checking whether the core correctly locks the account during the read-write of the limit.", ja: "限度額のレースコンディションは、閾値に触れる2つ以上の取引がほぼ同時に送られたときにのみ現れ、コアが限度額の読み書き時に口座を正しくロックするかを確認する。" },
  }),
  mcq({
    q: { vi: "Cơ chế idempotency key trong xử lý giao dịch ngân hàng dùng để làm gì?", en: "What is the idempotency key mechanism used for in banking transaction processing?", ja: "銀行の取引処理における冪等性キー（idempotency key）は何のために使う？" },
    options: [
      { vi: "Ngăn một giao dịch bị ghi nhận (trừ tiền) nhiều lần khi client gửi lại yêu cầu do timeout/bấm lại", en: "Prevent a transaction from being recorded (money debited) multiple times when the client resends a request due to timeout/retry", ja: "タイムアウトや再送によりクライアントがリクエストを再送しても、取引（引き落とし）が複数回記録されるのを防ぐ" },
      { vi: "Tăng tốc độ xử lý giao dịch bằng cách bỏ qua bước xác thực", en: "Speed up transaction processing by skipping the authentication step", ja: "認証ステップを省略して取引処理を高速化する" },
      { vi: "Làm tròn số tiền giao dịch chính xác hơn", en: "Make transaction amount rounding more precise", ja: "取引金額の端数処理をより正確にする" },
      { vi: "Mã hoá dữ liệu thẻ của khách hàng", en: "Encrypt the customer's card data", ja: "顧客のカードデータを暗号化する" },
    ], correct: 0,
    explain: { vi: "Idempotency key nhận diện các yêu cầu trùng lặp (do retry/timeout) để trả về kết quả đã xử lý trước đó thay vì thực hiện giao dịch lần thứ hai, tránh double-debit.", en: "The idempotency key identifies duplicate requests (from retry/timeout) so the system returns the previously processed result instead of executing the transaction a second time, avoiding double-debit.", ja: "冪等性キーは（リトライ/タイムアウトによる）重複リクエストを識別し、取引を2回目実行する代わりに以前処理済みの結果を返すことで、二重引き落としを防ぐ。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình giao dịch bạn sẽ test", en: "1. TL;DR & the transaction screen you'll test", ja: "1. 要点とテストする取引画面" },
    blocks: [
      TLDR("Kỹ thuật đoán lỗi (Error Guessing) là kỹ thuật kiểm thử dựa trên kinh nghiệm: tester dùng trực giác, lịch sử lỗi và kiến thức nghiệp vụ để đoán trước NƠI hệ thống dễ hỏng rồi thiết kế ca kiểm thử nhắm thẳng vào đó — bổ sung cho các kỹ thuật hình thức như phân vùng tương đương hay bảng quyết định. Bài này áp dụng cho hệ thống core banking CoreBank: xây dựng defect taxonomy, checklist lỗi kinh nghiệm, và ca đoán lỗi cho chuyển khoản, hạn mức, làm tròn tiền, giao dịch đồng thời, timeout. Có 8 mockup giao diện/bảng lỗi, 2 tình huống thật và trắc nghiệm cuối bài.",
        "Error guessing is an experience-based testing technique: testers use intuition, defect history, and domain knowledge to predict WHERE a system is likely to break, then design test cases that target those spots directly — complementing formal techniques like equivalence partitioning or decision tables. This article applies it to the CoreBank core-banking system: building a defect taxonomy, an experience-based checklist, and error-guessing cases for transfers, limits, money rounding, concurrent transactions, and timeouts. It includes 8 UI/defect mockups, 2 real situations, and a quiz.",
        "エラー推測（Error Guessing）とは、経験ベースのテスト技法です。テスターは直感、過去の不具合履歴、業務知識を使ってシステムが壊れやすい箇所を予測し、そこを狙ったテストケースを設計します——同値分割やデシジョンテーブルなどの形式的技法を補完するものです。本記事はコアバンキングシステムCoreBankに適用し、デフェクト・タクソノミー、経験ベースのチェックリスト、そして振込・限度額・端数処理・同時実行取引・タイムアウトのエラー推測ケースを構築します。8点のUI/不具合モックアップ、2つの実例、クイズ付き。"),
      P("Nếu bạn đã quen với phân vùng tương đương, giá trị biên hay bảng quyết định, bạn đang dùng các kỹ thuật HÌNH THỨC — suy ra ca kiểm thử từ đặc tả một cách có công thức. Kỹ thuật đoán lỗi (error guessing) đi theo hướng khác: nó khai thác chính những gì đặc tả KHÔNG NÓI TỚI — thói quen của lập trình viên, các lỗi đã từng xảy ra trong quá khứ, và trực giác nghiệp vụ của một tester dày dạn. Trong core banking, đây không phải kỹ thuật 'phụ' mà là tuyến phòng thủ cuối cùng, vì rất nhiều lỗi nghiêm trọng nhất — sai số làm tròn dồn tích, giao dịch đồng thời vượt hạn mức, double-debit do timeout — gần như không lộ ra qua các kỹ thuật hình thức thông thường, chỉ lộ ra khi tester biết CHÍNH XÁC loại lỗi nào hay xảy ra ở đâu.",
        "If you're already comfortable with equivalence partitioning, boundary values, or decision tables, you're using FORMAL techniques — deriving test cases from the specification in a systematic, formulaic way. Error guessing takes a different path: it exploits exactly what the specification DOESN'T say — developer habits, defects that have happened before, and the business intuition of a seasoned tester. In core banking, this isn't a 'nice to have' technique but the last line of defense, because many of the most serious bugs — cumulative rounding errors, concurrent transactions exceeding a limit, double-debit from a timeout — barely surface through ordinary formal techniques; they only surface when a tester knows EXACTLY which kind of bug tends to occur where.",
        "同値分割・境界値分析・デシジョンテーブルに慣れているなら、それは仕様から公式的にテストケースを導き出す『形式的』技法を使っているということです。エラー推測はこれとは異なるアプローチを取ります——仕様に書かれていないこと、つまり開発者の癖、過去に実際に起きた不具合、そしてベテランテスターの業務的な直感を活用します。コアバンキングにおいてこれは『あれば良い』技法ではなく最後の防波堤です。累積する端数処理の誤差、限度額を超える同時取引、タイムアウトによる二重引き落としなど、最も深刻なバグの多くは通常の形式的技法ではほとんど表面化せず、テスターがどこにどんな種類のバグが起きやすいかを正確に知っているときにだけ見つかるからです。"),
      IMG(m_txn, "Màn hình chuyển khoản CoreBank với các điểm nghi lỗi được khoanh vùng: làm tròn phí, hạn mức chưa trừ giao dịch treo, timeout core", "CoreBank transfer screen with suspect points annotated: fee rounding, limit not deducting pending transactions, core timeout", "手数料の端数処理、保留中取引が反映されない限度額、コアのタイムアウトなど、疑わしい箇所を注記したCoreBank振込画面"),
      DEF("Error Guessing", "kỹ thuật kiểm thử dựa trên kinh nghiệm, dùng trực giác và lịch sử lỗi để đoán trước vị trí dễ hỏng và thiết kế ca kiểm thử nhắm thẳng vào đó, bổ sung cho kỹ thuật hình thức.",
        "an experience-based testing technique that uses intuition and defect history to predict likely failure points and design test cases that target them directly, complementing formal techniques.",
        "直感と過去の不具合履歴を用いて壊れやすい箇所を予測し、そこを狙ったテストケースを設計する経験ベースのテスト技法。形式的技法を補完する。"),
    ] },
  { heading: { vi: "2. Error Guessing là gì & vì sao core banking cần", en: "2. What error guessing is & why core banking needs it", ja: "2. エラー推測とは何か、なぜコアバンキングに必要か" },
    blocks: [
      P("Theo phân loại ISTQB, kỹ thuật đoán lỗi thuộc nhóm 'kỹ thuật kiểm thử dựa trên kinh nghiệm' (experience-based test techniques), cùng nhóm với kiểm thử khám phá (exploratory testing) và kiểm thử theo checklist (checklist-based testing). Điểm khác biệt cốt lõi so với kỹ thuật hình thức (phân vùng tương đương, giá trị biên, bảng quyết định, chuyển trạng thái): kỹ thuật hình thức suy luận ca kiểm thử một cách CÓ THỂ LẶP LẠI từ đặc tả — hai tester khác nhau, theo đúng quy trình, sẽ ra một bộ ca gần giống nhau. Kỹ thuật đoán lỗi thì PHỤ THUỘC VÀO NGƯỜI: chất lượng ca kiểm thử tỉ lệ thuận với kinh nghiệm, hiểu biết miền nghiệp vụ, và mức độ 'nhớ lỗi cũ' của tester. Vì vậy, một Error Guessing chuyên nghiệp không phải nhắm mắt đoán bừa mà PHẢI được hệ thống hoá bằng checklist và defect taxonomy — nội dung ta xây ở chương 3.",
        "Under the ISTQB classification, error guessing belongs to the group of experience-based test techniques, alongside exploratory testing and checklist-based testing. The core difference from formal techniques (equivalence partitioning, boundary value analysis, decision tables, state transition testing): formal techniques derive test cases REPRODUCIBLY from a specification — two different testers, following the same procedure, will arrive at roughly the same set of cases. Error guessing is PERSON-DEPENDENT: the quality of the test cases is proportional to the tester's experience, domain knowledge, and how well they 'remember past bugs.' That's why professional error guessing isn't blind guesswork — it MUST be systematized through a checklist and a defect taxonomy, which we build in chapter 3.",
        "ISTQBの分類では、エラー推測は探索的テストやチェックリストベーステストと並ぶ『経験ベースのテスト技法』に属します。形式的技法（同値分割、境界値分析、デシジョンテーブル、状態遷移テスト）との核心的な違いは、形式的技法が仕様から再現可能な方法でテストケースを導き出す点にあります——異なる2人のテスターが同じ手順に従えば、ほぼ同じテストケース群になります。一方エラー推測は『人依存』です。テストケースの質はテスターの経験、業務知識、そして『過去の不具合をどれだけ覚えているか』に比例します。だからこそプロフェッショナルなエラー推測は当てずっぽうではなく、チェックリストとデフェクト・タクソノミーによって体系化されなければなりません——これを第3章で構築します。"),
      P("Vì sao core banking đặc biệt cần kỹ thuật đoán lỗi dù đã có đầy đủ kỹ thuật hình thức? Vì rất nhiều lỗi nghiêm trọng nhất trong ngân hàng không nằm ở MỘT giao dịch đơn lẻ (nơi phân vùng tương đương/giá trị biên/bảng quyết định phủ tốt), mà nằm ở HÀNH VI HỆ THỐNG khi nhiều giao dịch tương tác: sai số làm tròn dồn tích qua hàng nghìn kỳ tính lãi, hai giao dịch chạm cùng một hạn mức cùng lúc, một giao dịch timeout rồi được retry. Không có công thức hình thức nào tự động sinh ra những ca này — chúng đến từ kinh nghiệm quan sát các postmortem, báo cáo audit, và sự cố production đã từng xảy ra ở chính hệ thống hoặc hệ thống tương tự.",
        "Why does core banking specifically need error guessing even with full coverage of formal techniques? Because many of banking's most serious bugs don't live in a SINGLE transaction (where equivalence partitioning/boundary values/decision tables cover well), but in SYSTEM BEHAVIOR when multiple transactions interact: rounding errors accumulating over thousands of interest calculation cycles, two transactions hitting the same limit simultaneously, a transaction that times out and then gets retried. No formal formula automatically generates these cases — they come from experience observing postmortems, audit reports, and production incidents that have happened on this system or a similar one.",
        "形式的技法が十分に揃っているのに、なぜコアバンキングは特にエラー推測を必要とするのでしょうか。銀行における最も深刻な不具合の多くは、単一の取引（同値分割・境界値分析・デシジョンテーブルがよくカバーする範囲）にあるのではなく、複数の取引が相互作用する『システムの振る舞い』にあるからです：数千回の利息計算サイクルにわたって蓄積する端数処理の誤差、同じ限度額に同時に触れる2つの取引、タイムアウトしてリトライされる取引などです。これらのケースを自動的に生成する形式的な公式は存在しません——ポストモーテム、監査報告書、そして自社または類似システムで実際に起きた本番インシデントを観察した経験から生まれます。"),
      TIP("Kết hợp, không thay thế: dùng kỹ thuật hình thức phủ đầy đủ luồng chính, rồi dùng error guessing để 'vá' đúng những khe hở mà lịch sử lỗi cho thấy hay bị bỏ sót.", "Combine, don't replace: use formal techniques to fully cover the main flow, then use error guessing to 'patch' exactly the gaps that defect history shows are often missed.", "置き換えではなく組み合わせる：形式的技法でメインフローを十分にカバーし、その上でエラー推測を使い、不具合履歴が示す見落とされがちな隙間を『補修』する。"),
    ] },
  { heading: { vi: "3. Xây dựng Defect Taxonomy — checklist lỗi kinh nghiệm", en: "3. Building a defect taxonomy — an experience-based checklist", ja: "3. デフェクト・タクソノミーの構築 — 経験ベースのチェックリスト" },
    blocks: [
      P("Defect Taxonomy (bảng phân loại lỗi kinh nghiệm) là danh sách các NHÓM NGUYÊN NHÂN GỐC gây lỗi mà một hệ thống/miền nghiệp vụ hay gặp phải, được tổng hợp từ lịch sử sự cố thật thay vì suy diễn lý thuyết. Với core banking, taxonomy này nên xoay quanh những nhóm nguyên nhân xuất hiện lặp lại qua nhiều dự án ngân hàng: làm tròn số thập phân, hạn mức và giá trị biên động theo thời gian thực, tranh chấp tài nguyên khi nhiều giao dịch chạy đồng thời, timeout kèm khả năng retry gây trùng lặp, quy đổi tiền tệ nhiều bước, và trạng thái giao dịch bị treo giữa chừng.",
        "A defect taxonomy is a list of ROOT-CAUSE GROUPS that a system/domain commonly suffers from, compiled from real incident history rather than theoretical guesswork. For core banking, this taxonomy should revolve around root-cause groups that recur across many banking projects: decimal rounding, limits and boundary values that move in real time, resource contention when multiple transactions run concurrently, timeouts combined with retry causing duplication, multi-step currency conversion, and transactions stuck mid-way.",
        "デフェクト・タクソノミー（経験ベースのチェックリスト）は、理論的な推測ではなく実際のインシデント履歴から集約された、システム/業務ドメインでよく発生する『根本原因グループ』の一覧です。コアバンキングでは、このタクソノミーは多くの銀行プロジェクトで繰り返し現れる根本原因グループを中心に構成すべきです：小数の端数処理、リアルタイムに変動する限度額と境界値、複数の取引が同時実行される際のリソース競合、重複を引き起こすリトライ付きタイムアウト、多段階の通貨換算、そして途中で止まった取引状態などです。"),
      IMG(m_taxonomy, "Defect Taxonomy — checklist lỗi kinh nghiệm cho hệ thống core banking, theo nhóm nguyên nhân gốc", "Defect taxonomy — an experience-based checklist for core banking systems, grouped by root cause", "コアバンキングシステム向けデフェクト・タクソノミー — 根本原因別の経験ベースのチェックリスト"),
      P("Điều khiến bảng này khác một checklist thông thường: mỗi dòng đều trả lời câu hỏi 'vì sao kỹ thuật hình thức KHÓ bắt được lỗi này' — đây chính là lý do error guessing tồn tại như một kỹ thuật riêng, không phải bản sao yếu hơn của EP/BVA. Một defect taxonomy tốt không tĩnh: nó là TÀI SẢN SỐNG, được thêm dòng mới sau mỗi postmortem, và được gắn nhãn theo nghiệp vụ (chuyển khoản, hạn mức, lãi suất, thanh toán quốc tế...) để tester mới trong đội cũng áp dụng được ngay mà không cần nhiều năm kinh nghiệm.",
        "What sets this table apart from an ordinary checklist: every row answers 'why formal techniques struggle to catch this bug' — this is precisely why error guessing exists as its own technique, not a weaker copy of EP/BVA. A good defect taxonomy is not static: it's a LIVING ASSET, gaining new rows after every postmortem, and tagged by business area (transfers, limits, interest, international payments...) so even a new tester on the team can apply it immediately without years of experience.",
        "この表が通常のチェックリストと違う点は、各行が『なぜ形式的技法ではこのバグを捉えにくいのか』に答えていることです——これこそがエラー推測が同値分割/境界値分析の劣化版ではなく、独立した技法として存在する理由です。良いデフェクト・タクソノミーは静的ではありません。ポストモーテムのたびに新しい行が追加される『生きた資産』であり、業務分野（振込、限度額、利息、国際送金など）でタグ付けされているため、チームの新人テスターでも何年もの経験なしにすぐ適用できます。"),
    ] },
  { heading: { vi: "4. Quy trình áp dụng Error Guessing có hệ thống", en: "4. A systematic process for applying error guessing", ja: "4. エラー推測を体系的に適用するプロセス" },
    blocks: [
      P("Error guessing 'chuyên nghiệp' khác error guessing 'nghiệp dư' ở đúng một điểm: nó có QUY TRÌNH, không phải cảm hứng nhất thời. Bốn bước dưới đây giúp bạn biến trực giác thành một hoạt động có thể lặp lại, đo lường và bàn giao lại cho đồng đội.",
        "'Professional' error guessing differs from 'amateur' error guessing in exactly one respect: it has a PROCESS, not a spur-of-the-moment hunch. The four steps below turn intuition into an activity that's repeatable, measurable, and can be handed off to teammates.",
        "『プロフェッショナルな』エラー推測と『素人の』エラー推測の違いはただ一点です：それは思いつきではなく『プロセス』を持っていることです。以下の4つのステップは、直感を再現可能で測定可能な、チームメンバーに引き継げる活動に変えます。"),
      STEP(1, "Thu thập nguồn kinh nghiệm thật: báo cáo postmortem, backlog lỗi cũ, báo cáo kiểm toán nội bộ, và phỏng vấn đội vận hành/hỗ trợ khách hàng.", "Collect real sources of experience: postmortem reports, old bug backlogs, internal audit reports, and interviews with the ops/customer-support team.", "実際の経験源を集める：ポストモーテム報告書、過去の不具合バックログ、内部監査報告書、運用/顧客サポートチームへのヒアリング。"),
      STEP(2, "Phân loại lỗi thu thập được theo NHÓM NGUYÊN NHÂN GỐC (làm tròn, hạn mức, đồng thời, timeout...) thay vì theo từng màn hình hay tính năng riêng lẻ.", "Classify the collected defects by ROOT-CAUSE GROUP (rounding, limits, concurrency, timeout...) rather than by individual screen or feature.", "収集した不具合を個々の画面や機能ではなく『根本原因グループ』（端数処理、限度額、同時実行、タイムアウトなど）で分類する。"),
      STEP(3, "Với mỗi nhóm lỗi, viết ca kiểm thử nhắm thẳng vào ĐIỀU KIỆN gây ra lỗi đó, ghi rõ kết quả mong đợi, rồi đưa vào bộ hồi quy tự động hoặc thủ công.", "For each defect group, write test cases that target the exact CONDITION causing it, document the expected result, then add them to the automated or manual regression suite.", "各不具合グループについて、それを引き起こす『条件』を直接狙ったテストケースを書き、期待結果を明記し、自動または手動の回帰テストスイートに追加する。"),
      STEP(4, "Review checklist định kỳ mỗi sprint/release: loại bỏ ca đã 'miễn dịch' lâu ngày không tái phát, bổ sung ca mới từ sự cố production gần nhất.", "Review the checklist periodically each sprint/release: retire cases that have long been 'immune' with no recurrence, and add new cases from the latest production incidents.", "スプリント/リリースごとに定期的にチェックリストをレビューする：長期間再発していない『免疫済み』のケースを外し、直近の本番インシデントから新しいケースを追加する。"),
      CODE("text", "CACH SAI - lam tron TUNG KY (accumulate rounding):\nfor day in 1..N:\n  interest_day = round(balance * daily_rate)   // lam tron MOI NGAY\n  total += interest_day\n// sai so cong don qua N lan lam tron\n\nCACH DUNG - lam tron 1 LAN cuoi ky:\ntotal_raw = balance * daily_rate * N\ntotal = round(total_raw)   // CHI lam tron 1 LAN duy nhat"),
      TIP("Đừng để checklist phình to vô hạn: mỗi ca thêm vào cần gắn nguồn gốc (postmortem nào, ngày nào) để dễ loại bỏ khi nó không còn giá trị thực tế.", "Don't let the checklist grow without bound: every added case should be tagged with its origin (which postmortem, which date) so it's easy to retire once it no longer adds real value.", "チェックリストを際限なく肥大化させない：追加する各ケースには出典（どのポストモーテム、いつ）をタグ付けし、実際の価値がなくなったときに簡単に外せるようにする。"),
    ] },
  { heading: { vi: "5. Ca đoán lỗi nghiệp vụ CHUYỂN KHOẢN", en: "5. Error-guessing cases for the TRANSFER business flow", ja: "5. 振込業務のエラー推測ケース" },
    blocks: [
      P("Nghiệp vụ chuyển khoản là nơi Error Guessing phát huy rõ nhất, vì đây là luồng có TIỀN THẬT di chuyển và bị hàng triệu người dùng thao tác mỗi ngày theo những cách lập trình viên không lường hết. Bảng dưới đây không liệt kê lại các ca kiểm thử hình thức đã có ở phân vùng tương đương/giá trị biên, mà tập trung vào những ca xuất phát từ KINH NGHIỆM: lỗi đã từng xảy ra ở CoreBank hoặc các hệ thống ngân hàng tương tự, được ghi lại trong postmortem và báo cáo sự cố.",
        "The transfer business flow is where error guessing shines most clearly, since it's a flow moving REAL MONEY, operated by millions of users daily in ways developers never fully anticipate. The table below doesn't repeat formal test cases already covered by equivalence partitioning/boundary values — it focuses on cases born from EXPERIENCE: bugs that have actually happened on CoreBank or similar banking systems, recorded in postmortems and incident reports.",
        "振込業務は、エラー推測が最も明確に効果を発揮する領域です。なぜならこれは実際のお金が動くフローであり、開発者が想定しきれない方法で毎日何百万人ものユーザーに操作されるからです。下の表は同値分割/境界値分析ですでにカバーされている形式的テストケースを繰り返すものではなく、『経験』から生まれたケース——CoreBankや類似の銀行システムで実際に起きた、ポストモーテムやインシデント報告書に記録された不具合——に焦点を当てています。"),
      IMG(m_case_transfer, "Bảng ca đoán lỗi cho nghiệp vụ chuyển khoản, dựa trên kinh nghiệm sự cố thật", "Error-guessing case table for the transfer flow, based on real incident experience", "実際のインシデント経験に基づく振込業務のエラー推測ケース表"),
      P("Điểm chung của cả 5 ca trong bảng: chúng đều nhắm vào ĐIỂM GIAO giữa hai quy tắc nghiệp vụ — số dư và phí, thời gian xử lý và trạng thái hiển thị, khung giờ bù trừ và thông báo cho người dùng. Đây chính là đặc trưng của lỗi tìm được bằng kinh nghiệm: chúng gần như không bao giờ nằm trong một quy tắc đơn lẻ mà nằm ở khe hở giữa hai quy tắc tưởng chừng độc lập. Một tester mới có thể test đúng từng quy tắc riêng nhưng bỏ lỡ khe hở này; một tester dày dạn kinh nghiệm sẽ chủ động đi tìm nó.",
        "What all 5 cases in the table share: they all target the INTERSECTION between two business rules — balance and fee, processing time and displayed status, clearing time windows and user notification. This is the hallmark of experience-found bugs: they almost never live inside a single rule but in the gap between two seemingly independent rules. A newcomer tester may correctly test each rule individually yet miss this gap; a seasoned tester actively hunts for it.",
        "表の5つのケース全てに共通するのは、いずれも2つの業務ルールの『交差点』——残高と手数料、処理時間と表示ステータス、決済の時間帯とユーザー通知——を狙っている点です。これはまさに経験によって見つかるバグの特徴です。それらはほとんど単一のルールの中にはなく、独立しているように見える2つのルールの間の隙間に存在します。新人テスターは各ルールを個別には正しくテストできても、この隙間を見逃すことがあります。経験豊富なテスターはそれを積極的に探しに行きます。"),
    ] },
  { heading: { vi: "6. Ca đoán lỗi HẠN MỨC & GIAO DỊCH ĐỒNG THỜI", en: "6. Error-guessing cases for LIMITS & CONCURRENT transactions", ja: "6. 限度額と同時実行取引のエラー推測ケース" },
    blocks: [
      P("Hạn mức giao dịch và tính đồng thời là cặp đôi rủi ro kinh điển trong core banking: hạn mức được thiết kế để BẢO VỆ khách hàng và ngân hàng khỏi gian lận, nhưng chính cơ chế kiểm tra hạn mức lại dễ bị 'lách' khi nhiều giao dịch chạm ngưỡng gần như cùng lúc. Bảng dưới liệt kê các ca đoán lỗi kinh điển mà mọi core banking đều nên test, dựa trên kinh nghiệm về lỗi race condition và lost update đã từng gây sự cố thật trong ngành.",
        "Transaction limits and concurrency are a classic risk pair in core banking: limits are designed to PROTECT customers and the bank from fraud, but the very mechanism that checks limits can be 'circumvented' when multiple transactions hit the threshold nearly simultaneously. The table below lists classic error-guessing cases every core banking system should test, based on experience with race-condition and lost-update bugs that have caused real incidents in the industry.",
        "取引限度額と同時実行性は、コアバンキングにおける古典的なリスクのペアです。限度額は顧客と銀行を不正から守るために設計されていますが、その限度額チェックの仕組み自体が、複数の取引がほぼ同時に閾値に達したときに『回避』されやすいのです。下の表は、業界で実際にインシデントを引き起こしたレースコンディションやロストアップデートの経験に基づく、あらゆるコアバンキングシステムがテストすべき古典的なエラー推測ケースを挙げています。"),
      IMG(m_case_limit, "Bảng ca đoán lỗi cho hạn mức và giao dịch đồng thời, dựa trên kinh nghiệm race condition thực tế", "Error-guessing case table for limits and concurrent transactions, based on real race-condition experience", "実際のレースコンディション経験に基づく限度額と同時取引のエラー推測ケース表"),
      P("Lưu ý quan trọng: những ca này KHÔNG THỂ phát hiện bằng cách test tuần tự từng giao dịch một — bạn cần công cụ hoặc kịch bản bắn nhiều request gần như đồng thời để mô phỏng đúng điều kiện gây lỗi. Đây cũng là lý do vì sao error guessing cho core banking đòi hỏi tester hiểu cả về kiến trúc hệ thống (khoá tài khoản, giao dịch nguyên tử, cơ chế lock) chứ không chỉ hiểu nghiệp vụ — kinh nghiệm kỹ thuật và nghiệp vụ phải kết hợp mới đoán trúng loại lỗi này.",
        "Important note: these cases CANNOT be detected by testing transactions one at a time sequentially — you need a tool or script that fires multiple requests nearly simultaneously to properly simulate the condition causing the bug. This is also why error guessing for core banking requires testers to understand system architecture (account locking, atomic transactions, locking mechanisms), not just the business rules — technical and business experience must combine to correctly guess this class of bug.",
        "重要な注意点：これらのケースは取引を1つずつ順番にテストする方法では検出できません。バグを引き起こす条件を正しく再現するには、複数のリクエストをほぼ同時に発行するツールやスクリプトが必要です。これはまた、コアバンキングのエラー推測がテスターに業務ルールの理解だけでなく、システムアーキテクチャ（口座ロック、原子性のある取引、ロック機構）の理解も要求する理由です——技術的経験と業務経験を組み合わせて初めて、このクラスのバグを正しく推測できます。"),
    ] },
  { heading: { vi: "7. Ca đoán lỗi LÀM TRÒN TIỀN & TIMEOUT GIAO DỊCH", en: "7. Error-guessing cases for ROUNDING & TRANSACTION TIMEOUT", ja: "7. 端数処理と取引タイムアウトのエラー推測ケース" },
    blocks: [
      P("Làm tròn tiền và timeout giao dịch có một điểm chung dễ bị đánh giá thấp: từng lỗi đơn lẻ trông rất nhỏ — lệch nửa xu, chậm vài giây — nhưng khi nhân với TẦN SUẤT giao dịch của một ngân hàng (hàng triệu giao dịch/ngày, hàng trăm nghìn kỳ tính lãi), hậu quả tài chính và uy tín có thể rất lớn. Bảng dưới tổng hợp các ca đoán lỗi cho hai nhóm này, dựa trên các sự cố làm tròn và double-debit từng được ghi nhận trong ngành ngân hàng.",
        "Money rounding and transaction timeout share a commonly underestimated trait: each individual defect looks tiny — a fraction of a cent off, a delay of a few seconds — but when multiplied by a bank's transaction FREQUENCY (millions of transactions/day, hundreds of thousands of interest cycles), the financial and reputational consequences can be huge. The table below summarizes error-guessing cases for both groups, based on rounding and double-debit incidents recorded across the banking industry.",
        "端数処理と取引タイムアウトには、過小評価されがちな共通点があります：個々の不具合は非常に小さく見えます——半銭のずれ、数秒の遅延——しかし銀行の取引『頻度』（1日数百万件の取引、数十万件の利息計算サイクル）を掛け合わせると、財務上・信用上の影響は非常に大きくなり得ます。下の表は、銀行業界で記録された端数処理と二重引き落としのインシデントに基づき、この2つのグループのエラー推測ケースをまとめたものです。"),
      IMG(m_case_round, "Bảng ca đoán lỗi cho làm tròn tiền và timeout giao dịch, dựa trên sự cố kinh nghiệm ngành ngân hàng", "Error-guessing case table for money rounding and transaction timeout, based on banking-industry incident experience", "銀行業界のインシデント経験に基づく端数処理と取引タイムアウトのエラー推測ケース表"),
      CODE("text", "// Kiem tra idempotency TRUOC KHI ghi No tai khoan nguon\nkey = hash(customer_id, dest_account, amount, request_timestamp_window)\nif exists(processed_keys, key):\n  return cached_result   // KHONG ghi No lan 2\nelse:\n  result = process_transfer(...)\n  save(processed_keys, key, result)\n  return result"),
      P("Cơ chế idempotency key ở đoạn mã trên là câu trả lời chuẩn cho nhóm lỗi timeout: mọi giao dịch ghi Nợ tài khoản PHẢI được gắn một khoá duy nhất trước khi gửi tới core, để nếu client gửi lại yêu cầu (do timeout hoặc người dùng bấm lại), hệ thống trả về đúng kết quả đã xử lý thay vì thực hiện giao dịch lần thứ hai.",
        "The idempotency-key mechanism in the pseudocode above is the standard answer to the timeout defect group: every debit transaction MUST be tagged with a unique key before being sent to the core, so that if the client resends the request (due to timeout or the user retrying), the system returns the already-processed result instead of executing the transaction a second time.",
        "上の疑似コードにある冪等性キーの仕組みは、タイムアウト系不具合グループへの標準的な回答です。すべての引き落とし取引は、コアに送られる前に一意のキーを付与されなければなりません。それにより、クライアントがリクエストを再送しても（タイムアウトやユーザーの再操作による）、システムは取引を2回目実行するのではなく、すでに処理済みの結果を返します。"),
    ] },
  { heading: { vi: "8. Tình huống 1: làm tròn lãi tích lũy sai 1 xu", en: "8. Situation 1: cumulative interest rounding off by a fraction", ja: "8. シーン1：累積利息の端数処理がずれる" },
    blocks: [
      SITUATION("Đội chỉ test 1 ngày tính lãi với số liệu tròn (10.000.000đ, lãi 0,01%/ngày) — mọi ca đều pass, sai số làm tròn 1 xu tưởng như không đáng kể nên không ai để ý sâu.", "The team only tests one day of interest calculation with round numbers (10,000,000đ, 0.01%/day interest) — every case passes, and a one-cent rounding error seems too trivial for anyone to look into deeply.",
        "Khi lên production, sổ tiết kiệm kỳ hạn dài với số dư lẻ bị làm tròn ở TỪNG NGÀY rồi cộng dồn, khiến lãi cuối kỳ lệch đáng kể so với công thức chuẩn — nhân với hàng trăm nghìn sổ tiết kiệm, ngân hàng phải rà soát bồi hoàn và bị kiểm toán nội bộ đặt câu hỏi.", "In production, long-term savings accounts with odd balances get rounded at EACH DAY and accumulated, causing the final interest to deviate noticeably from the standard formula — multiplied across hundreds of thousands of savings accounts, the bank must review and refund amounts, and internal audit raises questions.",
        "チームは端数のない数値（1,000万ドン、日利0.01%）で1日分の利息計算だけをテスト——全ケース合格、1銭の端数処理誤差は取るに足らないと誰も深く気に留めない。",
        "本番環境では、端数のある残高を持つ長期定期預金が『毎日』端数処理されて累積し、最終的な利息が標準的な計算式と大きくずれてしまう——数十万口座に及ぶと、銀行は調査・返金対応を迫られ、内部監査から疑問視される。"),
      SOLVE("Áp kỹ thuật đoán lỗi 'làm tròn dồn tích qua nhiều kỳ' cho MỌI phép tính lặp có làm tròn (lãi, phí, chiết khấu); quy định rõ làm tròn chỉ ở bước cuối cùng, và bổ sung ca kiểm thử đối chiếu công thức tính 1 lần với công thức tính lặp cho mọi kỳ hạn.", "Apply the 'cumulative rounding across cycles' error-guessing case to EVERY repeated calculation involving rounding (interest, fees, discounts); mandate that rounding only happens at the final step, and add test cases that cross-check the single-calculation formula against the iterative formula for every tenor.", "端数処理を伴うすべての反復計算（利息、手数料、割引）に『複数サイクルにわたる累積端数処理』のエラー推測ケースを適用する。端数処理は最終ステップでのみ行うことを明確に規定し、あらゆる期間について一括計算式と反復計算式を突き合わせるテストケースを追加する。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca đoán lỗi 'làm tròn dồn tích qua nhiều kỳ' trên sổ tiết kiệm", "A bug ticket found via the 'cumulative rounding across cycles' error-guessing case on a savings account", "普通預金口座での『複数サイクルにわたる累積端数処理』エラー推測ケースで見つかったバグチケット"),
      P("Ví dụ này cho thấy vì sao 'làm tròn' không nên bị xem là chi tiết vặt trong core banking. Một tester áp dụng error guessing đúng cách sẽ luôn đặt câu hỏi: phép tính này có lặp lại nhiều lần không, và nếu có, làm tròn ở đâu? Bất kỳ phép tính lặp nào có làm tròn trung gian — lãi suất, phí giao dịch định kỳ, chiết khấu tích luỹ — đều nên nằm trong checklist lỗi kinh nghiệm, không chờ đến khi có báo cáo audit mới phát hiện.",
        "This example shows why 'rounding' shouldn't be dismissed as a trivial detail in core banking. A tester applying error guessing properly always asks: does this calculation repeat many times, and if so, where does rounding happen? Any repeated calculation with intermediate rounding — interest, recurring fees, cumulative discounts — belongs in the experience-based checklist, rather than waiting for an audit report to discover it.",
        "この例は、コアバンキングにおいて『端数処理』が些細な詳細として片付けられるべきではない理由を示しています。エラー推測を正しく適用するテスターは常に自問します：この計算は何度も繰り返されるか、もしそうなら、どこで端数処理されるか？ 利息、定期的な手数料、累積割引など、中間で端数処理を行う反復計算はすべて、監査報告書で発見されるのを待つのではなく、経験ベースのチェックリストに含めるべきです。"),
      RECAP(["Làm tròn từng bước rồi cộng dồn là nguyên nhân kinh điển gây sai số tích luỹ", "Mọi phép tính lặp có làm tròn cần vào checklist lỗi kinh nghiệm, không chờ audit"],
        ["Rounding at every step then accumulating is a classic cause of cumulative error", "Every repeated calculation with rounding belongs in the experience-based checklist, don't wait for an audit"],
        ["各ステップで端数処理して累積させるのは累積誤差の典型的な原因", "端数処理を伴う反復計算はすべて経験ベースのチェックリストに入れ、監査を待たない"]),
    ] },
  { heading: { vi: "9. Tình huống 2: hai giao dịch đồng thời vượt hạn mức", en: "9. Situation 2: two concurrent transactions exceed the limit", ja: "9. シーン2：2つの同時取引が限度額を超える" },
    blocks: [
      SITUATION("Đội test hạn mức TUẦN TỰ: mỗi lần chỉ bắn 1 giao dịch, kiểm tra hệ thống có từ chối đúng khi vượt hạn mức hay không — mọi ca đều pass với kết quả rất đẹp.", "The team tests limits SEQUENTIALLY: firing only one transaction at a time, checking whether the system correctly rejects it when the limit is exceeded — every case passes with clean results.",
        "Một khách hàng dùng 2 thiết bị bấm chuyển khoản gần như đồng thời; mỗi giao dịch đều nhỏ hơn hạn mức còn lại TẠI THỜI ĐIỂM ĐỌC, nhưng core xử lý song song nên cả 2 đều được duyệt — tổng vượt hạn mức ngày, lộ ra lỗ hổng có thể bị khai thác để rút vượt hạn mức chống gian lận.", "A customer uses 2 devices to send transfers almost simultaneously; each transaction is smaller than the remaining limit AT READ TIME, but the core processes them in parallel, so both get approved — the total exceeds the daily limit, exposing a hole that could be exploited to withdraw beyond the anti-fraud limit.",
        "チームは限度額を『順番に』テストする：一度に1つの取引だけを発行し、限度額を超えたときにシステムが正しく拒否するか確認——全ケースがきれいに合格する。",
        "ある顧客が2台の端末からほぼ同時に振込を送信する。各取引は『読み取り時点』の残り限度額より小さいが、コアが並行処理するため両方とも承認されてしまう——合計が日次限度額を超え、不正防止用の限度額を超えて引き出すために悪用され得る穴が露呈する。"),
      SOLVE("Bổ sung ca đoán lỗi 'race condition trên hạn mức': dùng công cụ bắn đồng thời 2+ giao dịch chạm ngưỡng hạn mức, xác nhận core khoá đúng tài khoản khi kiểm tra và trừ hạn mức trong cùng 1 giao dịch nguyên tử, không tách rời bước đọc và bước ghi.", "Add the 'limit race-condition' error-guessing case: use a tool to fire 2+ threshold-hitting transactions concurrently, confirming the core correctly locks the account when checking and deducting the limit within a single atomic transaction, without separating the read and write steps.", "『限度額のレースコンディション』エラー推測ケースを追加する：ツールを使い閾値に触れる2つ以上の取引を同時に発行し、コアが限度額のチェックと減算を読み取りと書き込みのステップを分離せず単一の原子的トランザクション内で正しく口座をロックするか確認する。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua Error Guessing (CoreBank · Sprint Ngân hàng lõi)", "A board tracking bugs found via error guessing (CoreBank · core-banking sprint)", "エラー推測で見つかったバグの追跡ボード（CoreBank・コアバンキングスプリント）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi liên quan tiền của sprint được tìm bằng Error Guessing, không phải kỹ thuật hình thức", "Metrics: most of the sprint's money-related bugs were found via error guessing, not formal techniques", "指標：スプリントの金銭関連バグの大半は形式的技法ではなくエラー推測で見つかった"),
      P("Lỗi race condition trên hạn mức nguy hiểm hơn lỗi làm tròn ở chỗ nó có thể bị khai thác có chủ đích: kẻ gian hiểu cơ chế kiểm tra-rồi-ghi không nguyên tử có thể cố tình bắn nhiều giao dịch đồng thời để rút vượt hạn mức chống gian lận. Vì vậy ca đoán lỗi dạng này nên được đưa vào cả bộ kiểm thử bảo mật lẫn bộ hồi quy chức năng, và nên test lại mỗi khi core banking đổi cơ chế khoá hoặc chuyển sang kiến trúc phân tán mới.",
        "The limit race-condition bug is more dangerous than a rounding bug in that it can be deliberately exploited: an attacker who understands the non-atomic check-then-write mechanism can intentionally fire multiple concurrent transactions to withdraw beyond the anti-fraud limit. That's why this type of error-guessing case should be included in both the security test suite and the functional regression suite, and retested whenever the core banking system changes its locking mechanism or moves to a new distributed architecture.",
        "限度額のレースコンディションは、端数処理のバグより危険です。なぜなら意図的に悪用され得るからです：原子的でないチェック・アンド・ライトの仕組みを理解した攻撃者は、意図的に複数の同時取引を発行し、不正防止用の限度額を超えて引き出すことができます。そのためこの種のエラー推測ケースは、セキュリティテストスイートと機能回帰テストスイートの両方に含めるべきであり、コアバンキングがロック機構を変更したり新しい分散アーキテクチャに移行したりするたびに再テストすべきです。"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      P("Error guessing mang lại giá trị lớn nhưng cũng dễ bị lạm dụng sai cách. Phần này tổng hợp những lỗi tư duy phổ biến khi áp dụng kỹ thuật này trong dự án ngân hàng, cùng vài mẹo giúp checklist của bạn thực sự hữu ích qua nhiều release chứ không chỉ dùng một lần rồi bỏ.",
        "Error guessing delivers great value but is also easy to misapply. This section gathers common thinking mistakes when applying this technique in a banking project, plus a few tips to keep your checklist genuinely useful across many releases rather than used once and discarded.",
        "エラー推測は大きな価値をもたらしますが、誤って使われやすくもあります。このセクションでは、銀行プロジェクトでこの技法を適用する際によくある思考の誤りと、チェックリストを一度使って終わりにせず、多くのリリースにわたって本当に役立つものにするためのコツをまとめます。"),
      PITFALL("Nhầm error guessing là 'test tự do không cần ghi lại gì' — mất khả năng tái hiện lỗi khi báo cáo, và không xây được checklist tái sử dụng cho những release sau.", "Mistaking error guessing for 'free-form testing that needs no documentation' — losing the ability to reproduce bugs when reporting, and failing to build a reusable checklist for future releases.", "エラー推測を『何も記録しなくていい自由なテスト』だと誤解する——報告時にバグを再現できなくなり、今後のリリースで再利用できるチェックリストも構築できない。"),
      PITFALL("Chỉ dựa vào kinh nghiệm cá nhân của một tester duy nhất, không tổng hợp từ postmortem và sự cố production của cả đội — checklist nhanh lỗi thời, bỏ sót các loại lỗi mới phát sinh.", "Relying only on one tester's personal experience, without aggregating postmortems and production incidents from the whole team — the checklist quickly becomes stale and misses newly emerging bug types.", "1人のテスターの個人的な経験だけに頼り、チーム全体のポストモーテムや本番インシデントを集約しない——チェックリストはすぐに陳腐化し、新たに発生する不具合の種類を見逃す。"),
      TIP("Biến Defect Taxonomy thành tài sản chung: cập nhật ngay sau mỗi postmortem, gắn nhãn theo nghiệp vụ (chuyển khoản, hạn mức, lãi suất, thanh toán quốc tế...) để cả tester mới cũng áp dụng được ngay mà không cần nhiều năm kinh nghiệm mới đoán trúng lỗi.", "Turn the defect taxonomy into a shared asset: update it right after every postmortem, tag it by business area (transfers, limits, interest, international payments...) so even a new tester can apply it immediately without needing years of experience to guess correctly.", "デフェクト・タクソノミーを共有資産にする：ポストモーテムのたびにすぐ更新し、業務分野（振込、限度額、利息、国際送金など）でタグ付けし、正しくバグを推測するために何年もの経験を必要とせず、新人テスターでもすぐに適用できるようにする。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者向けネガティブテスト"),
      INTERNAL("Bảng quyết định (Decision Table) cho tester", "Decision table technique for testers", "bang-quyet-dinh-decision-table-cho-tester", "テスターのためのデシジョンテーブル"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための結合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua toàn bộ vòng đời áp dụng kỹ thuật đoán lỗi (error guessing) cho hệ thống core banking CoreBank: từ việc phân biệt nó với các kỹ thuật hình thức, xây dựng Defect Taxonomy làm tài sản chung cho đội, thiết kế ca đoán lỗi cho bốn nghiệp vụ trọng yếu — chuyển khoản, hạn mức, làm tròn tiền, giao dịch đồng thời và timeout — cho tới hai tình huống thật cho thấy hậu quả tài chính khi bỏ sót loại lỗi này. Điểm mấu chốt cần nhớ: error guessing không thay thế kỹ thuật hình thức, mà bổ sung đúng vào những khe hở mà phân vùng tương đương, giá trị biên hay bảng quyết định khó chạm tới — nơi nhiều quy tắc nghiệp vụ, thời gian và tính đồng thời cộng hưởng với nhau.",
        "You just walked through the full lifecycle of applying error guessing to the CoreBank core-banking system: distinguishing it from formal techniques, building a defect taxonomy as a shared team asset, designing error-guessing cases for four critical business areas — transfers, limits, money rounding, concurrent transactions, and timeouts — through to two real situations showing the financial consequences of missing this class of bug. The key takeaway: error guessing doesn't replace formal techniques, it complements exactly the gaps that equivalence partitioning, boundary values, or decision tables struggle to reach — where multiple business rules, time, and concurrency compound together.",
        "CoreBankのコアバンキングシステムにエラー推測を適用する一連のライフサイクルを見てきました：形式的技法との違いを整理し、チームの共有資産としてデフェクト・タクソノミーを構築し、4つの重要業務——振込、限度額、端数処理、同時取引、タイムアウト——のエラー推測ケースを設計し、このクラスのバグを見逃した際の財務的影響を示す2つの実例まで学びました。重要なポイントは、エラー推測は形式的技法を置き換えるものではなく、同値分割・境界値分析・デシジョンテーブルが届きにくい隙間——複数の業務ルール、時間、同時実行が重なり合う場所——をまさに補完するものだということです。"),
      P("Bước tiếp theo, bạn nên ôn lại bảng quyết định và kiểm thử tích hợp để biết khi nào dùng kỹ thuật hình thức, khi nào chuyển sang đoán lỗi — hai nhóm kỹ thuật này luôn nên đi cùng nhau trong một dự án ngân hàng thực chiến. Nếu bạn muốn rèn kỹ năng này bài bản qua các dự án thật, có mentor đồng hành và lộ trình từ nền tảng tới nâng cao, một khoá học Tester chuyên sâu sẽ giúp bạn rút ngắn nhiều năm tự mày mò kinh nghiệm.",
        "Next, you should review decision tables and integration testing to know when to use formal techniques and when to switch to error guessing — these two technique groups should always go hand in hand in a real-world banking project. If you want to build this skill properly through real projects, with a mentor guiding you and a roadmap from foundation to advanced, an in-depth Tester course will help you shortcut years of learning experience on your own.",
        "次は、デシジョンテーブルと結合テストを復習し、いつ形式的技法を使い、いつエラー推測に切り替えるべきかを理解しましょう——実戦的な銀行プロジェクトでは、この2つの技法群は常に並走すべきです。実際のプロジェクトを通じてこのスキルを体系的に鍛え、メンターの伴走と基礎から上級までのロードマップを求めるなら、専門的なテスターコースが、独学で何年もかかる経験習得を大幅に短縮する助けになります。"),
      CTA(course),
    ] },
];

const ERRORGUESS_DOC = makeDoc({
  slug: "ky-thuat-doan-loi-error-guessing-cho-tester",
  domain: "banking",
  primaryKeyword: "kỹ thuật đoán lỗi",
  keywords: ["kỹ thuật đoán lỗi", "error guessing", "defect taxonomy", "checklist lỗi kinh nghiệm", "core banking testing"],
  coverLabel: "NÂNG CAO · ĐOÁN LỖI · NGÂN HÀNG",
  crumb: "Kỹ thuật đoán lỗi (Error Guessing) trong core banking",
  metaTitle: {
    vi: "Kỹ thuật đoán lỗi (Error Guessing) trong core banking",
    en: "Error guessing technique in core banking systems",
    ja: "コアバンキングにおけるエラー推測技法",
  },
  metaDescription: {
    vi: "Kỹ thuật đoán lỗi (error guessing) cho core banking: checklist lỗi kinh nghiệm, ca đoán lỗi chuyển khoản, hạn mức, làm tròn tiền, đồng thời, timeout giao dịch.",
    en: "Error guessing for core banking: build a defect taxonomy, an experience-based checklist, and error-guessing cases for transfers, limits, money rounding, concurrency, and timeouts — with mockups and a quiz.",
    ja: "コアバンキング向けエラー推測：デフェクト・タクソノミー、経験ベースのチェックリスト、振込・限度額・端数処理・同時実行・タイムアウトのエラー推測ケースを構築。モックアップとクイズ付き。",
  },
  title: {
    vi: "Kỹ thuật đoán lỗi (Error Guessing) & checklist lỗi kinh nghiệm cho hệ thống ngân hàng",
    en: "Error guessing & an experience-based defect checklist for banking systems",
    ja: "銀行システムのためのエラー推測技法と経験ベースの不具合チェックリスト",
  },
  summary: {
    vi: "Bài nâng cao: kỹ thuật đoán lỗi (error guessing) áp dụng cho hệ thống core banking. Xây dựng defect taxonomy/checklist lỗi kinh nghiệm, thiết kế ca đoán lỗi cho chuyển khoản, hạn mức, làm tròn tiền, giao dịch đồng thời và timeout. 2 tình huống thật (lãi làm tròn sai, race condition hạn mức), 8 mockup giao diện/bảng lỗi, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: error guessing applied to core banking systems. Build a defect taxonomy/experience-based checklist, design error-guessing cases for transfers, limits, money rounding, concurrent transactions, and timeouts. 2 real situations (interest rounding error, limit race condition), 8 UI/defect mockups, FAQ, and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級記事：コアバンキングシステムに適用するエラー推測技法。デフェクト・タクソノミー/経験ベースのチェックリストを構築し、振込・限度額・端数処理・同時取引・タイムアウトのエラー推測ケースを設計。実例2件（利息の端数処理誤差、限度額のレースコンディション）、UI/不具合モックアップ8点、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách áp dụng Error Guessing có hệ thống cho core banking", steps: [
    { name: "Thu thập nguồn kinh nghiệm thật", text: "Postmortem, backlog lỗi cũ, báo cáo kiểm toán, phỏng vấn đội vận hành." },
    { name: "Phân loại theo nhóm nguyên nhân gốc", text: "Xây Defect Taxonomy: làm tròn, hạn mức, đồng thời, timeout." },
    { name: "Viết ca kiểm thử nhắm trúng điều kiện gây lỗi", text: "Đưa vào bộ hồi quy, review định kỳ mỗi sprint/release." },
  ] },
  pages,
});

export const MA_ERRORGUESS_01 = [ERRORGUESS_DOC];
