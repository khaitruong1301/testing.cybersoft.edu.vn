// doc_ma_testcase_patterns.mjs — BÀI MANUAL NÂNG CAO (advanced):
// Kỹ thuật viết test case tối ưu & tái sử dụng (Test Case Design Patterns) —
// dự án ERPCore, hệ quản trị doanh nghiệp nhiều module (Mua hàng, Kho, Bán hàng, Kế toán).
// Nguyên tắc atomic/độc lập, tham số hoá (data-driven), tái sử dụng bước chung,
// đặt tên & tổ chức bộ ca, giảm trùng lặp, mức chi tiết phù hợp, cân bằng dương/âm/biên,
// quy trình review test case. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, kanban, dashboard, moduleFlow } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "erp", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: bản ghi test case trong công cụ quản lý test của ERPCore ──
const m_screen = browser("qa.erpcore.vn/testcases/TC-INV-014", [
  field(24, 20, 712, "ID & Tiêu đề ca kiểm thử", "TC-INV-014 · Tạo phiếu nhập kho — số lượng vượt định mức kho HN-01", "normal"),
  field(24, 92, 340, "Điều kiện tiền đề (Precondition)", "Gọi bước dùng chung 'Setup: đăng nhập + chọn kỳ KT'", "normal"),
  field(376, 92, 360, "Ưu tiên / Loại ca", "P1 · Ca BIÊN (boundary) · độc lập", "normal"),
  annotate(20, 12, 716, 62, "ATOMIC: đúng 1 mục tiêu — chỉ kiểm 'vượt định mức kho', không gộp thêm việc khác"),
  annotate(20, 84, 340, 62, "TÁI SỬ DỤNG: gọi lại bước Setup chung, không chép tay đăng nhập"),
  btn(24, 168, 200, "Chạy ca độc lập", "primary"),
].join(""), { h: 236, title: "ERPCore · Test Case Management", accent: "#0f766e" });

// ── Mockup 2: bảng test case TỆ vs TỐI ƯU trên cùng các tiêu chí ──
const m_bad_vs_good = grid("Test case TỆ vs TỐI ƯU — cùng bộ tiêu chí (ERPCore)", ["Tiêu chí", "Ca kiểm thử TỆ", "Ca kiểm thử TỐI ƯU"], [
  ["Phạm vi", "1 ca kiểm luôn 5 việc: đăng nhập, tạo phiếu, duyệt, in báo cáo, huỷ phiếu", "1 ca chỉ kiểm đúng 1 mục tiêu: 'tạo phiếu nhập kho hợp lệ'"],
  ["Phụ thuộc", "TC05 chỉ chạy được nếu TC01–TC04 đã pass đúng thứ tự trước đó", "TC05 tự seed dữ liệu riêng (qua API), chạy độc lập ở bất kỳ thời điểm nào"],
  ["Dữ liệu", "200 ca gần giống hệt nhau, chỉ khác 1 con số nhập liệu", "1 ca tham số hoá + bảng dữ liệu 200 dòng (data-driven)"],
  ["Đặt tên", "'Test 1', 'Test 2', 'Test kho'", "'TC-INV-014: Tạo phiếu nhập kho — SL vượt định mức (boundary)'"],
  ["Bước chung", "Chép lại y hệt bước đăng nhập + chọn kỳ KT trong 600 ca", "Gọi 1 bước dùng chung 'Setup' được tái sử dụng ở mọi bộ case"],
  ["Mức chi tiết", "Bước ghi 'nhập dữ liệu rồi lưu' — không rõ nhập gì", "Bước ghi rõ input/expected từng dòng, đủ để người khác chạy đúng"],
], { accent: "#0f766e", note: "Cùng mục tiêu kiểm thử nhưng cách viết khác nhau quyết định chi phí bảo trì gấp nhiều lần khi dự án ERP có hàng nghìn ca." });

// ── Mockup 3: bảng ca tham số hoá (data-driven) cho 'Tạo phiếu nhập kho' ──
const m_datadriven = grid("Tham số hoá (data-driven) — TC-INV-014: Tạo phiếu nhập kho", ["Data set", "Loại hàng", "Số lượng nhập", "Đơn giá", "Kho nhập", "Kỳ vọng"], [
  ["DS-01", "Nguyên liệu A", "50 (trong định mức)", "120.000đ", "HN-01", "Tạo phiếu thành công"],
  ["DS-02", "Nguyên liệu A", "0 (biên dưới)", "120.000đ", "HN-01", "Từ chối — số lượng phải > 0"],
  ["DS-03", "Nguyên liệu A", "5.000 (đúng định mức tối đa kho)", "120.000đ", "HN-01", "Tạo phiếu thành công — cảnh báo gần đầy kho"],
  ["DS-04", "Nguyên liệu A", "5.001 (vượt định mức 1 đơn vị)", "120.000đ", "HN-01", "Từ chối — vượt sức chứa kho"],
  ["DS-05", "Nguyên liệu B (đã ngừng kinh doanh)", "50", "120.000đ", "HN-01", "Từ chối — mã hàng đã ngừng kinh doanh"],
], { accent: "#0f766e", highlight: 3, note: "5 dòng dữ liệu này thay thế cho 5 ca kiểm thử riêng biệt gần như y hệt nhau — chỉ 1 ca TC-INV-014 với 1 kịch bản bước, chạy lặp qua từng dòng." });

// ── Mockup 4: sơ đồ tái sử dụng bước chung giữa các bộ case theo module ──
const m_reuse = moduleFlow("Tái sử dụng bước chung trong bộ test case ERPCore", [
  { id: "setup", x: 110, y: 170, label: "Bước dùng chung", sub: "Setup: đăng nhập + chọn kỳ KT" },
  { id: "purchase", x: 380, y: 70, label: "Bộ case Mua hàng", sub: "32 ca kế thừa Setup" },
  { id: "inventory", x: 380, y: 170, label: "Bộ case Kho", sub: "45 ca kế thừa Setup" },
  { id: "sales", x: 380, y: 270, label: "Bộ case Bán hàng", sub: "38 ca kế thừa Setup" },
  { id: "finance", x: 650, y: 170, label: "Bộ case Kế toán", sub: "29 ca kế thừa Setup + Kho" },
], [
  { from: "setup", to: "purchase", label: "reuse Setup" },
  { from: "setup", to: "inventory", label: "reuse Setup" },
  { from: "setup", to: "sales", label: "reuse Setup" },
  { from: "setup", to: "finance", label: "reuse Setup" },
  { from: "inventory", to: "finance", label: "dữ liệu phiếu nhập" },
], { h: 340, accent: "#0f766e" });

// ── Mockup 5: ticket lỗi thiết kế test — chuỗi ca phụ thuộc che lấp lỗi thật ──
const m_jira = jira({
  key: "ERP-8821", title: "Bộ case 'Mua hàng-Nhập kho-Thanh toán' (32 ca liên kết) FAIL dây chuyền, che lấp lỗi thật ở TC18",
  type: "Test Debt", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Bộ case", "QT-MUA-KHO-TT · 32 ca thiết kế chạy TUẦN TỰ, ca sau dùng lại state UI của ca trước"],
    ["Sự cố", "TC03 (Duyệt đơn mua) lỗi do dữ liệu môi trường staging, kéo theo TC04–TC32 tự động SKIP"],
    ["Hệ quả", "Lỗi thật ở TC18 (Đối chiếu tồn kho sau nhập) không được chạy tới, lọt sang UAT"],
    ["Nguyên nhân gốc", "Test case KHÔNG atomic/độc lập — mỗi ca phụ thuộc kết quả UI của ca trước thay vì tự seed dữ liệu"],
    ["Đề xuất", "Refactor 32 ca thành các ca độc lập, seed dữ liệu qua API cho từng ca"],
  ],
});

// ── Mockup 6: kanban theo dõi quá trình refactor bộ test case theo mẫu tối ưu ──
const m_kanban = kanban("Refactor bộ test case ERPCore theo mẫu tối ưu (Sprint 9)", [
  { name: "Cần refactor", cards: [
    { key: "ERP-8821", title: "Tách 32 ca phụ thuộc chuỗi thành ca độc lập", sev: "Critical" },
    { key: "ERP-8830", title: "200 ca 'tạo phiếu nhập kho' gần giống nhau", sev: "High" },
  ] },
  { name: "Đang tách/tham số hoá", cards: [
    { key: "ERP-8825", title: "Gộp 45 ca kho thành 1 ca data-driven", sev: "High" },
  ] },
  { name: "Đã tham số hoá", cards: [
    { key: "ERP-8814", title: "TC-INV-014 gộp 5 data set biên/dương/âm", sev: "Medium" },
  ] },
  { name: "Đã review & merge", cards: [
    { key: "ERP-8790", title: "Bước Setup dùng chung áp dụng cho 4 module", sev: "Low" },
  ] },
]);

// ── Mockup 7: dashboard hiệu quả tối ưu bộ test case sau refactor ──
const m_dash = dashboard("Hiệu quả tối ưu bộ test case — ERPCore Sprint 9", [
  { label: "Tổng ca trước refactor", value: "612", sub: "nhiều ca trùng lặp/phụ thuộc", color: "#64748b" },
  { label: "Tổng ca sau gộp data-driven", value: "248", sub: "~59% giảm trùng lặp", color: "#0f766e" },
  { label: "Ca phụ thuộc chuỗi còn lại", value: "0", sub: "toàn bộ đã atomic/độc lập", color: "#16a34a" },
  { label: "Thời gian chạy hồi quy", value: "-46%", sub: "nhờ bước chung dùng lại, ít setup thừa", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Test case atomic/độc lập là gì, vì sao quan trọng trong dự án ERP nhiều module?",
  "What is an atomic/independent test case, and why does it matter in a multi-module ERP project?",
  "Test case atomic là ca kiểm thử chỉ nhắm đúng 1 mục tiêu kiểm tra rõ ràng, không gộp nhiều việc khác nhau vào cùng một ca. Test case độc lập là ca có thể chạy được ở bất kỳ thời điểm nào, tự chuẩn bị dữ liệu riêng (thường qua API/seed) thay vì phụ thuộc kết quả hoặc state của ca chạy trước đó. Trong dự án ERP nhiều module như ERPCore, các bộ case dễ bị viết thành chuỗi tuần tự (mua hàng → nhập kho → thanh toán) để tiết kiệm công sức viết bước — nhưng khi một ca giữa chuỗi fail vì lý do môi trường, toàn bộ các ca phía sau bị bỏ qua, khiến lỗi thật ở những ca đó không được phát hiện và dễ lọt lên production.",
  "An atomic test case targets exactly one clear objective, without bundling several different checks into a single case. An independent test case can run at any time, preparing its own data (usually via API/seed) instead of depending on the result or state of a prior case. In a multi-module ERP project like ERPCore, test suites are easily written as sequential chains (purchasing → inventory → payment) to save effort writing steps — but when one case in the middle of the chain fails due to environment reasons, every case after it gets skipped, so the real bugs in those cases are never found and easily slip into production.",
  "アトミック・独立したテストケースとは何？複数モジュールのERPプロジェクトでなぜ重要？",
  "アトミックなテストケースとは、1つの明確な検証目的だけを狙い、複数の異なるチェックを1つのケースに詰め込まないケースです。独立したテストケースとは、前のケースの結果や状態に依存せず、自身でデータを準備（通常API/シードで）し、いつでも実行できるケースです。ERPCoreのような複数モジュールのERPプロジェクトでは、手順を書く手間を省くためにテストスイートが連続チェーン（購買→入庫→支払）として書かれがちですが、チェーン途中の1ケースが環境要因で失敗すると、それ以降の全ケースがスキップされ、それらの本当のバグが発見されずに本番環境へ漏れやすくなります。");
const faq2 = FAQ(
  "Tham số hoá (data-driven) khác gì so với việc viết nhiều test case riêng lẻ cho từng bộ dữ liệu?",
  "How is parameterization (data-driven) different from writing many separate test cases for each data set?",
  "Về hình thức, một ca kiểm thử data-driven và nhiều ca riêng lẻ có thể kiểm tra cùng những giá trị đầu vào giống nhau. Khác biệt nằm ở cấu trúc: data-driven viết MỘT kịch bản bước duy nhất (mở màn hình, nhập giá trị X, bấm lưu, so sánh kết quả Y) rồi gắn một BẢNG dữ liệu nhiều dòng chạy qua đúng kịch bản đó — mỗi dòng là một bộ input/expected. Khi quy trình nghiệp vụ thay đổi (ví dụ thêm 1 bước xác nhận), bạn chỉ sửa MỘT kịch bản thay vì phải sửa lặp lại ở hàng trăm ca riêng lẻ gần giống nhau, giảm hẳn chi phí bảo trì và rủi ro sửa sót.",
  "In appearance, one data-driven test case and many separate cases can check the same set of input values. The difference is structural: a data-driven case writes ONE single step script (open the screen, enter value X, click save, compare result Y) and attaches a data TABLE with many rows run through that exact script — each row is one input/expected pair. When the business process changes (e.g. adding a confirmation step), you edit only ONE script instead of repeating the edit across hundreds of near-identical separate cases, sharply cutting maintenance cost and the risk of missed edits.",
  "パラメータ化（データ駆動）は各データセットごとに別々のテストケースを書くのと何が違う？",
  "見た目上は、データ駆動の1ケースと多数の個別ケースが同じ入力値群を検証することがあります。違いは構造にあります：データ駆動は1つの手順スクリプト（画面を開く、値Xを入力、保存をクリック、結果Yを比較）だけを書き、そのスクリプトを流れる複数行のデータ表を1つ添付します——各行が1組の入力/期待値です。業務プロセスが変わった時（確認ステップの追加など）、何百もの類似した個別ケースを繰り返し修正する代わりに、1つのスクリプトだけを修正すればよく、保守コストと修正漏れのリスクを大きく減らせます。");
const faq3 = FAQ(
  "Làm sao tổ chức & đặt tên bộ test case cho dự án ERP nhiều module để dễ bảo trì, tránh trùng lặp?",
  "How should a test suite for a multi-module ERP project be organized and named to stay maintainable and avoid duplication?",
  "Nên tổ chức bộ case theo cấu trúc phân cấp module → chức năng → loại ca (VD: Kho / Nhập kho / TC-INV-014), song song với một thư viện 'bước dùng chung' (Setup đăng nhập, chọn kỳ kế toán, tạo dữ liệu gốc) mà mọi module đều gọi lại thay vì chép tay. Tên ca nên theo mẫu cố định gồm mã module + số thứ tự + mô tả ngắn + loại ca (dương/âm/biên), ví dụ 'TC-INV-014: Tạo phiếu nhập kho — SL vượt định mức (boundary)' — nhìn tên là biết ngay phạm vi, tránh viết trùng ca đã có. Trước khi thêm ca mới, nên tra cứu theo mã module + từ khoá để phát hiện sớm các ca gần giống có thể gộp bằng data-driven thay vì tạo thêm bản sao.",
  "Organize the test suite in a hierarchy of module → function → case type (e.g. Inventory / Goods Receipt / TC-INV-014), alongside a library of 'common steps' (login Setup, select accounting period, create base data) that every module calls instead of copy-pasting. Case names should follow a fixed pattern of module code + sequence number + short description + case type (positive/negative/boundary), e.g. 'TC-INV-014: Create goods receipt — quantity exceeds capacity (boundary)' — the name alone tells you the scope, avoiding duplicate cases. Before adding a new case, search by module code + keyword to catch near-duplicate cases early that could be merged via data-driven instead of copied.",
  "複数モジュールのERPプロジェクトのテストケースをどう整理・命名すれば保守しやすく重複を避けられる？",
  "テストスイートはモジュール→機能→ケース種別（例：在庫／入庫／TC-INV-014）の階層で整理し、あわせて全モジュールが手書きせず呼び出す『共通ステップ』ライブラリ（ログインSetup、会計期間選択、基礎データ作成）を用意します。ケース名はモジュールコード＋連番＋短い説明＋ケース種別（陽性/陰性/境界）の固定パターンに従うべきです。例：『TC-INV-014：入庫伝票作成 — 数量が上限超過（境界）』——名前だけで範囲が分かり、既存ケースとの重複を避けられます。新規ケース追加前に、モジュールコード＋キーワードで検索し、コピーの代わりにデータ駆動で統合できる類似ケースを早期に発見しましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Điều gì làm cho một test case được coi là 'atomic'?", en: "What makes a test case 'atomic'?", ja: "テストケースが『アトミック』とみなされる条件は？" },
    options: [
      { vi: "Nó chạy rất nhanh, dưới 1 giây", en: "It runs very fast, under 1 second", ja: "1秒未満で非常に速く実行される" },
      { vi: "Nó chỉ nhắm đúng 1 mục tiêu kiểm tra rõ ràng, không gộp nhiều việc khác nhau", en: "It targets exactly one clear test objective, without bundling several different checks", ja: "1つの明確な検証目的だけを狙い、複数の異なるチェックを詰め込まない" },
      { vi: "Nó được viết bằng ngôn ngữ lập trình", en: "It's written in a programming language", ja: "プログラミング言語で書かれている" },
      { vi: "Nó luôn có ít nhất 10 bước thực hiện", en: "It always has at least 10 execution steps", ja: "常に少なくとも10の実行ステップを持つ" },
    ], correct: 1,
    explain: { vi: "Atomic nghĩa là 1 ca — 1 mục tiêu rõ ràng, giúp dễ đọc, dễ debug khi fail và dễ tái sử dụng.", en: "Atomic means one case — one clear objective, making it easy to read, easy to debug on failure, and easy to reuse.", ja: "アトミックとは1ケース＝1つの明確な目的を意味し、読みやすく、失敗時のデバッグや再利用がしやすくなります。" },
  }),
  mcq({
    q: { vi: "Vì sao test case KHÔNG nên phụ thuộc vào kết quả/state của ca chạy trước đó?", en: "Why shouldn't a test case depend on the result/state of a previously run case?", ja: "テストケースは前に実行されたケースの結果/状態に依存すべきでない理由は？" },
    options: [
      { vi: "Vì tốn thêm dung lượng lưu trữ", en: "Because it takes extra storage space", ja: "余分なストレージ容量を使うから" },
      { vi: "Vì khi 1 ca đầu chuỗi fail, các ca sau bị bỏ qua/skip, che lấp lỗi thật ở các ca đó", en: "Because when an early case in the chain fails, later cases get skipped, hiding real bugs in those cases", ja: "チェーンの前半のケースが失敗すると後続のケースがスキップされ、それらの本当のバグが隠れてしまうから" },
      { vi: "Vì công cụ quản lý test không cho phép", en: "Because test management tools don't allow it", ja: "テスト管理ツールが許可しないから" },
      { vi: "Vì ca độc lập luôn chạy chậm hơn", en: "Because independent cases always run slower", ja: "独立したケースは常に実行が遅いから" },
    ], correct: 1,
    explain: { vi: "Chuỗi ca phụ thuộc khiến 1 lỗi đầu chuỗi làm hỏng cả bộ, các ca sau không được chạy tới nên lỗi thật ở đó không lộ ra.", en: "A dependent chain lets one early failure break the whole set; later cases never run, so real bugs in them never surface.", ja: "依存チェーンでは前半の1つの失敗がセット全体を壊し、後続のケースが実行されないためそこにある本当のバグが表に出ません。" },
  }),
  mcq({
    q: { vi: "Lợi ích chính của việc tham số hoá (data-driven) một ca kiểm thử là gì?", en: "What's the main benefit of parameterizing (data-driven) a test case?", ja: "テストケースをパラメータ化（データ駆動）する主な利点は？" },
    options: [
      { vi: "Chỉ cần sửa 1 kịch bản bước khi nghiệp vụ đổi, thay vì sửa lặp ở hàng trăm ca gần giống", en: "Only need to edit one step script when the business process changes, instead of repeating edits across hundreds of near-identical cases", ja: "業務が変わった時、何百もの類似ケースで繰り返し修正する代わりに1つの手順スクリプトだけ修正すればよい" },
      { vi: "Giúp ca kiểm thử không bao giờ fail", en: "Makes the test case never fail", ja: "テストケースが決して失敗しなくなる" },
      { vi: "Loại bỏ hoàn toàn nhu cầu kiểm thử biên", en: "Completely removes the need for boundary testing", ja: "境界テストの必要性を完全になくす" },
      { vi: "Giúp không cần đặt tên ca nữa", en: "Means you no longer need to name cases", ja: "ケースに名前を付ける必要がなくなる" },
    ], correct: 0,
    explain: { vi: "Data-driven gộp nhiều bộ input/expected vào 1 kịch bản bước duy nhất, giảm mạnh chi phí bảo trì khi có thay đổi.", en: "Data-driven merges many input/expected sets into a single step script, sharply cutting maintenance cost on change.", ja: "データ駆動は多くの入力/期待値の組を1つの手順スクリプトに統合し、変更時の保守コストを大きく削減します。" },
  }),
  mcq({
    q: { vi: "Cách cân bằng hợp lý giữa ca dương, ca âm và ca biên khi thiết kế bộ test case?", en: "What's a sensible way to balance positive, negative and boundary cases when designing a test suite?", ja: "テストスイート設計における陽性・陰性・境界ケースの妥当なバランスの取り方は？" },
    options: [
      { vi: "Chỉ viết ca dương vì dễ pass, báo cáo đẹp", en: "Only write positive cases since they're easy to pass and report nicely", ja: "合格しやすく報告が綺麗なので陽性ケースだけ書く" },
      { vi: "Viết đủ ca dương cho luồng chính, rồi ưu tiên ca âm/biên cho các trường/quy tắc rủi ro cao, mức chi tiết phù hợp với rủi ro", en: "Write enough positive cases for the main flow, then prioritize negative/boundary cases for high-risk fields/rules, with detail level matching risk", ja: "メインフローに十分な陽性ケースを用意し、リスクの高い項目/ルールに陰性/境界ケースを優先し、詳細度をリスクに合わせる" },
      { vi: "Viết số ca âm và dương bằng nhau tuyệt đối cho mọi trường", en: "Write an exactly equal number of negative and positive cases for every field", ja: "全項目で陰性と陽性のケース数を完全に同数にする" },
      { vi: "Bỏ hẳn ca biên vì tốn thời gian thiết kế", en: "Skip boundary cases entirely since they take time to design", ja: "設計に時間がかかるため境界ケースを完全に省く" },
    ], correct: 1,
    explain: { vi: "Ưu tiên theo rủi ro và mức chi tiết phù hợp giúp dùng thời gian hiệu quả hơn là rải đều hoặc chỉ làm ca dương.", en: "Prioritizing by risk with a matching detail level uses time more effectively than spreading evenly or only doing positive cases.", ja: "リスクに応じた優先順位付けと適切な詳細度は、均等に分散させたり陽性ケースだけ行うより時間を効果的に使えます。" },
  }),
  mcq({
    q: { vi: "Quy trình review test case nên tập trung kiểm tra điều gì trước khi merge vào bộ hồi quy?", en: "What should a test case review process focus on checking before merging into the regression suite?", ja: "回帰スイートにマージする前のテストケースレビューは何を重点的に確認すべき？" },
    options: [
      { vi: "Chỉ kiểm tra chính tả trong tiêu đề ca", en: "Only checking spelling in the case title", ja: "ケースのタイトルのスペルだけを確認する" },
      { vi: "Ca có atomic/độc lập, đặt tên đúng chuẩn, tận dụng bước chung, mức chi tiết và cân bằng dương/âm/biên phù hợp rủi ro không", en: "Whether the case is atomic/independent, correctly named, reuses common steps, and has a detail level and positive/negative/boundary balance matching risk", ja: "ケースがアトミック/独立か、命名が正しいか、共通ステップを活用しているか、詳細度と陽性/陰性/境界のバランスがリスクに見合っているか" },
      { vi: "Chỉ kiểm tra ai là người viết ca", en: "Only checking who wrote the case", ja: "誰がケースを書いたかだけを確認する" },
      { vi: "Không cần review, cứ viết xong là merge ngay", en: "No review needed, merge immediately after writing", ja: "レビューは不要で、書き終えたらすぐマージする" },
    ], correct: 1,
    explain: { vi: "Review đúng trọng tâm giúp bắt sớm các ca vi phạm nguyên tắc atomic, trùng lặp, đặt tên sai hoặc thiếu cân bằng rủi ro trước khi chúng làm phình bộ hồi quy.", en: "A properly focused review catches cases violating the atomic principle, duplication, wrong naming, or missing risk balance early, before they bloat the regression suite.", ja: "焦点を絞ったレビューは、アトミック原則違反、重複、誤った命名、リスクバランスの欠如を、回帰スイートを肥大化させる前に早期に発見します。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Viết test case tối ưu & tái sử dụng nghĩa là thiết kế mỗi ca theo nguyên tắc atomic (1 mục tiêu), độc lập (không phụ thuộc ca khác), tham số hoá dữ liệu khi cần lặp lại nhiều bộ input, và tận dụng bước chung để giảm trùng lặp. Bài này bám dự án ERPCore — hệ quản trị doanh nghiệp nhiều module (Mua hàng, Kho, Bán hàng, Kế toán). Bạn sẽ học cách phân biệt ca tệ vs ca tối ưu, kỹ thuật data-driven, sơ đồ tái sử dụng bước chung, 2 tình huống lỗi thật từ thiết kế ca sai cách, cách cân bằng dương/âm/biên và quy trình review test case. Nhiều mockup và trắc nghiệm cuối bài.",
        "Writing optimized, reusable test cases means designing each case following the atomic principle (one objective), independence (not depending on another case), parameterizing data when many input sets repeat, and reusing common steps to cut duplication. This article follows the ERPCore project — a multi-module enterprise system (Purchasing, Inventory, Sales, Finance). You'll learn to tell bad cases from optimized ones, the data-driven technique, a diagram of reusable common steps, two real bug situations from badly designed cases, how to balance positive/negative/boundary, and a test case review process. Lots of mockups and a quiz at the end.",
        "最適化・再利用可能なテストケースを書くとは、各ケースをアトミック原則（1つの目的）、独立性（他のケースに依存しない）、多くの入力セットが繰り返される場合のデータのパラメータ化、そして重複を減らす共通ステップの再利用に沿って設計することです。本記事はERPCoreプロジェクト——複数モジュール（購買、在庫、販売、会計）を持つ企業システムに沿います。悪いケースと最適化されたケースの見分け方、データ駆動技法、共通ステップ再利用の図、設計不良による2つの実例バグ、陽性/陰性/境界のバランスの取り方、テストケースレビュープロセスを学びます。多数のモックと最後にクイズ付き。"),
      P("Nếu bạn đã quen viết test case cơ bản cho từng màn hình đơn lẻ, chương này đưa bạn lên một tầm mới: kỹ thuật viết test case tối ưu cho một hệ thống ERP có hàng trăm màn hình, hàng nghìn ca kiểm thử và nhiều đội cùng đóng góp. Ở quy mô đó, một ca viết cẩu thả không chỉ gây rủi ro bỏ sót lỗi mà còn kéo theo chi phí bảo trì khổng lồ mỗi khi nghiệp vụ thay đổi. Chúng ta sẽ đi qua từng nguyên tắc bằng ví dụ thật từ ERPCore, có hình minh hoạ và phần tự làm thử.",
        "If you're already comfortable writing basic test cases for individual screens, this chapter takes you a level higher: the technique of writing optimized test cases for an ERP system with hundreds of screens, thousands of test cases, and many teams contributing. At that scale, one carelessly written case doesn't just risk missing bugs — it drags along a massive maintenance cost every time the business changes. We'll walk through each principle with real ERPCore examples, with visuals and hands-on practice.",
        "個々の画面向けに基本的なテストケースを書くことに慣れているなら、本章はさらに上のレベルへ導きます：数百の画面、数千のテストケース、多数のチームが貢献するERPシステム向けに最適化されたテストケースを書く技法です。その規模では、雑に書かれた1つのケースはバグの見逃しリスクだけでなく、業務が変わるたびに莫大な保守コストを伴います。ERPCoreの実例を通じて各原則を見ていきます。図と実習付きです。"),
      IMG(m_screen, "Màn hình test: bản ghi test case TC-INV-014 trong công cụ quản lý test của ERPCore — atomic & tái sử dụng bước chung", "Screen under test: a TC-INV-014 test case record in ERPCore's test management tool — atomic & reusing common steps", "テスト対象画面：ERPCoreのテスト管理ツールにあるTC-INV-014のケース記録 — アトミック＆共通ステップの再利用"),
      DEF("Test Case Design Pattern", "tập hợp các nguyên tắc và kỹ thuật viết ca kiểm thử tối ưu — atomic, độc lập, tham số hoá, tái sử dụng bước chung, đặt tên & tổ chức bộ ca chuẩn — giúp bộ test case dễ bảo trì và mở rộng ở quy mô doanh nghiệp lớn.",
        "a set of principles and techniques for writing optimized test cases — atomic, independent, parameterized, reusing common steps, and standard naming & organization — that keep a test suite maintainable and scalable at large enterprise scale.",
        "最適化されたテストケースを書くための原則と技法の集合——アトミック、独立、パラメータ化、共通ステップの再利用、標準的な命名・整理——大規模企業スケールでテストスイートを保守可能かつ拡張可能に保つ。"),
    ] },
  { heading: { vi: "2. Nguyên tắc lõi: Atomic & Độc lập", en: "2. Core principle: Atomic & Independent", ja: "2. 核となる原則：アトミック＆独立" },
    blocks: [
      P("Atomic nghĩa là mỗi ca kiểm thử chỉ nhắm đúng MỘT mục tiêu kiểm tra — không gộp nhiều việc khác nhau vào cùng một ca 'cho tiện'. Ví dụ ca 'tạo phiếu nhập kho với số lượng vượt định mức' chỉ nên kiểm đúng hành vi đó, không kèm luôn việc kiểm tra in báo cáo hay huỷ phiếu. Khi ca atomic fail, bạn biết ngay chính xác cái gì hỏng, không phải dò lại từ đầu kịch bản dài.",
        "Atomic means each test case targets exactly ONE test objective — not bundling several different checks into one case 'for convenience'. For example, the case 'create a goods receipt with quantity exceeding capacity' should only verify that behavior, not also check report printing or voiding the receipt. When an atomic case fails, you immediately know exactly what broke, instead of tracing back through a long script.",
        "アトミックとは、各テストケースが厳密に1つの検証目的だけを狙うことを意味します——『便利だから』と複数の異なるチェックを1つのケースに詰め込みません。例えば『定量を超える数量で入庫伝票を作成する』ケースはその挙動だけを検証すべきで、レポート印刷や伝票取消のチェックを併せて含めるべきではありません。アトミックなケースが失敗すると、長いスクリプトを最初から追跡する代わりに、何が壊れたかすぐに分かります。"),
      P("Độc lập nghĩa là ca kiểm thử có thể chạy được ở bất kỳ thời điểm nào, theo bất kỳ thứ tự nào, mà không cần một ca khác chạy trước để chuẩn bị dữ liệu hay trạng thái. Thay vì đi vòng qua giao diện để dựng lại state (đăng nhập, tạo đơn mua, duyệt đơn... rồi mới tới bước cần test), ca độc lập tự seed dữ liệu cần thiết — thường qua API hoặc script chuẩn bị dữ liệu — rồi vào thẳng bước trọng tâm.",
        "Independent means a test case can run at any time, in any order, without needing another case to run first to prepare data or state. Instead of going around the UI to rebuild state (log in, create a purchase order, approve it... before reaching the step to test), an independent case seeds the needed data itself — usually via API or a data-prep script — then jumps straight to the focal step.",
        "独立とは、データや状態を準備するために別のケースを先に実行する必要なく、テストケースがいつでもどんな順序でも実行できることを意味します。UIを回って状態を再構築する（ログイン、購買注文の作成、承認…をしてからテスト対象のステップに到達する）代わりに、独立したケースは必要なデータを自身でシード（通常APIやデータ準備スクリプトで）し、対象のステップに直接進みます。"),
      IMG(m_bad_vs_good, "Bảng so sánh test case TỆ vs TỐI ƯU trên cùng bộ tiêu chí (ERPCore)", "Table comparing bad vs optimized test cases on the same criteria (ERPCore)", "同じ基準でのテスト case TỆ vs TỐI ƯU比較表（ERPCore）"),
      DEF("Atomic / Independent", "atomic là ca chỉ kiểm 1 mục tiêu rõ ràng; độc lập là ca tự chuẩn bị dữ liệu riêng và chạy được ở bất kỳ thời điểm nào, không phụ thuộc kết quả ca khác.",
        "atomic is a case that checks only one clear objective; independent is a case that prepares its own data and can run at any time, without depending on another case's result.",
        "アトミックとは1つの明確な目的だけを検証するケース。独立とは自身でデータを準備し、他のケースの結果に依存せずいつでも実行できるケース。"),
    ] },
  { heading: { vi: "3. Vì sao đặc biệt quan trọng ở dự án ERP nhiều module", en: "3. Why it especially matters for a multi-module ERP project", ja: "3. 複数モジュールのERPプロジェクトで特に重要な理由" },
    blocks: [
      P("Ở ERPCore, một quy trình nghiệp vụ thực tế luôn kéo dài qua nhiều module: một đơn mua hàng (Mua hàng) khi về kho sẽ tạo phiếu nhập (Kho), rồi tự động hạch toán (Kế toán). Rất dễ bị cám dỗ viết một chuỗi test case tuần tự bám sát đúng quy trình này để 'kiểm tra luôn cả luồng end-to-end' — nhưng nếu mỗi ca trong chuỗi lại phụ thuộc UI-state của ca trước, bạn đang biến hàng chục ca kiểm thử thành MỘT điểm lỗi duy nhất.",
        "At ERPCore, a real business process always spans several modules: a purchase order (Purchasing) arriving at the warehouse creates a goods receipt (Inventory), which auto-posts to accounting (Finance). It's very tempting to write one sequential chain of test cases that mirrors this exact process to 'test the whole end-to-end flow at once' — but if each case in the chain depends on the previous case's UI state, you're turning dozens of test cases into ONE single point of failure.",
        "ERPCoreでは、実際の業務プロセスは常に複数モジュールにまたがります：購買注文（購買）が倉庫に到着すると入庫伝票（在庫）が作成され、自動的に会計へ転記されます（会計）。このプロセスをそのままなぞる1本の連続チェーンテストケースを書いて『エンドツーエンドの流れを一気に検証する』誘惑に駆られがちですが、チェーン内の各ケースが前のケースのUI状態に依存すると、数十のテストケースを1つの単一障害点に変えてしまいます。"),
      P("Chi phí thực sự lộ ra khi dự án chạy nhiều sprint: mỗi lần môi trường staging không ổn định hoặc dữ liệu gốc thay đổi, cả chuỗi bị fail hàng loạt dù logic nghiệp vụ hoàn toàn đúng — team mất thời gian điều tra 'lỗi giả' thay vì tìm lỗi thật. Ngược lại, nếu áp dụng atomic/độc lập ngay từ đầu, mỗi module có thể có bộ test case riêng chạy song song, không kéo lùi nhau, và một ca fail chỉ ảnh hưởng đúng phạm vi của nó.",
        "The real cost shows up as the project runs through many sprints: whenever the staging environment is unstable or base data changes, the whole chain fails en masse even though the business logic is entirely correct — the team wastes time investigating 'fake failures' instead of finding real bugs. Conversely, applying atomic/independent from the start lets each module have its own test suite running in parallel, not dragging each other down, and one failing case affects only its own scope.",
        "本当のコストはプロジェクトが多くのスプリントを経る中で現れます：ステージング環境が不安定になったり基礎データが変わったりするたびに、業務ロジックが完全に正しくてもチェーン全体が一斉に失敗し——チームは本当のバグを見つける代わりに『偽の失敗』の調査に時間を浪費します。逆に最初からアトミック/独立を適用すれば、各モジュールが並行して実行される独自のテストスイートを持て、互いに足を引っ張らず、失敗したケースはその範囲だけに影響します。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: đặt tên & tổ chức bộ test case", en: "4. Prepare: naming & organizing the test suite", ja: "4. 準備：命名とテストスイートの整理" },
    blocks: [
      P("Trước khi viết ca, cần thống nhất một chuẩn đặt tên và cấu trúc thư mục để 600 ca của 4 module không trở thành mớ hỗn độn không ai tra cứu được.",
        "Before writing cases, agree on a naming standard and folder structure so 600 cases across 4 modules don't turn into a mess nobody can search.",
        "ケースを書く前に、4モジュール600ケースが誰も検索できない混乱にならないよう、命名規則とフォルダ構造を合意しておく必要があります。"),
      STEP(1, "Tổ chức bộ case theo cây: Module → Chức năng → Loại ca (ví dụ Kho / Nhập kho / Boundary).", "Organize the suite in a tree: Module → Function → Case type (e.g. Inventory / Goods Receipt / Boundary).", "Module → 機能 → ケース種別（例：在庫／入庫／境界）のツリー構造でスイートを整理する。"),
      STEP(2, "Đặt tên ca theo mẫu cố định: mã module-số thứ tự: mô tả ngắn — loại ca. Ví dụ 'TC-INV-014: Tạo phiếu nhập kho — SL vượt định mức (boundary)'.", "Name cases with a fixed pattern: module code-sequence: short description — case type. E.g. 'TC-INV-014: Create goods receipt — quantity exceeds capacity (boundary)'.", "ケース名を固定パターンで付ける：モジュールコード-連番：短い説明 — ケース種別。例『TC-INV-014：入庫伝票作成 — 数量が上限超過（境界）』。"),
      STEP(3, "Trước khi thêm ca mới, tra cứu theo mã module + từ khoá để phát hiện sớm ca gần giống có thể gộp bằng data-driven.", "Before adding a new case, search by module code + keyword to catch near-duplicate cases early that could be merged via data-driven.", "新規ケース追加前に、モジュールコード＋キーワードで検索し、データ駆動で統合できる類似ケースを早期に発見する。"),
      TRY("Đặt lại tên cho 3 ca 'Test 1', 'Test 2', 'Test kho' theo mẫu mã module-số thứ tự: mô tả — loại ca.", "Rename the three cases 'Test 1', 'Test 2', 'Test kho' using the module code-sequence: description — case type pattern.", "『Test 1』『Test 2』『Test kho』の3ケースを、モジュールコード-連番：説明 — 種別のパターンで命名し直そう。"),
      PITFALL("Đặt tên ca theo cảm tính ('Test kho', 'Test 1') khiến không ai tìm lại được ca cũ, dẫn tới viết trùng hàng chục ca đã có sẵn.", "Naming cases arbitrarily ('Test kho', 'Test 1') means nobody can find old cases again, leading to dozens of duplicate cases being written.", "感覚的な命名（『Test kho』『Test 1』）では誰も過去のケースを見つけられず、既存の数十のケースが重複して書かれることになる。"),
    ] },
  { heading: { vi: "5. Tham số hoá dữ liệu (Data-Driven) — thực hành từng bước", en: "5. Parameterizing data (Data-Driven) — hands-on step by step", ja: "5. データのパラメータ化（データ駆動）— 一歩ずつ実習" },
    blocks: [
      P("Khi bạn thấy mình chuẩn bị viết ca thứ 6, thứ 7... gần như y hệt ca đầu chỉ khác 1-2 giá trị nhập, đó là dấu hiệu rõ ràng cần tham số hoá thay vì tiếp tục nhân bản.",
        "When you find yourself about to write case number 6, 7... nearly identical to the first, differing only by 1-2 input values, that's a clear sign to parameterize instead of keep duplicating.",
        "6番目、7番目のケースを書こうとしていて、最初のケースとほぼ同一で1〜2個の入力値だけが違う場合、それは複製を続けるのではなくパラメータ化すべき明確なサインです。"),
      STEP(1, "Xác định kịch bản bước DUY NHẤT dùng chung cho mọi bộ dữ liệu: mở màn hình → nhập input → bấm lưu → so sánh kết quả.", "Define the SINGLE step script shared by every data set: open the screen → enter input → click save → compare result.", "全データセットで共有する単一の手順スクリプトを定義：画面を開く→入力→保存をクリック→結果を比較。"),
      STEP(2, "Liệt kê các bộ dữ liệu cần phủ: 1 ca dương chuẩn, 1-2 ca biên (min/max định mức), 1 ca âm (mã hàng ngừng kinh doanh).", "List the data sets to cover: 1 standard positive case, 1-2 boundary cases (min/max capacity), 1 negative case (discontinued item code).", "カバーすべきデータセットを列挙：1つの標準的な陽性ケース、1〜2つの境界ケース（最小/最大定量）、1つの陰性ケース（廃番品コード）。"),
      STEP(3, "Gắn bảng dữ liệu (data set) vào đúng 1 kịch bản bước, mỗi dòng là 1 bộ input/expected — không viết lại kịch bản cho từng dòng.", "Attach the data table to that one step script, each row being an input/expected pair — don't rewrite the script for each row.", "1つの手順スクリプトにデータ表を添付し、各行を1組の入力/期待値とする——行ごとにスクリプトを書き直さない。"),
      CODE("text", "TC-INV-014: Tao phieu nhap kho (data-driven)\nKich ban buoc (dung chung cho moi data set):\n  1) Mo man hinh 'Tao phieu nhap kho'\n  2) Nhap Loai hang = {LoaiHang}, So luong = {SoLuong}, Don gia = {DonGia}, Kho = {Kho}\n  3) Bam 'Luu'\n  4) So sanh ket qua voi {KyVong}\n\nBang du lieu (5 dong = 5 truong hop, KHONG viet lai kich ban):\nDS-01 | Nguyen lieu A | 50    | 120.000d | HN-01 | Tao phieu thanh cong\nDS-02 | Nguyen lieu A | 0     | 120.000d | HN-01 | Tu choi - so luong phai > 0\nDS-03 | Nguyen lieu A | 5000  | 120.000d | HN-01 | Thanh cong - canh bao gan day kho\nDS-04 | Nguyen lieu A | 5001  | 120.000d | HN-01 | Tu choi - vuot suc chua kho\nDS-05 | Nguyen lieu B (ngung KD) | 50 | 120.000d | HN-01 | Tu choi - ma hang ngung KD"),
      IMG(m_datadriven, "Bảng ca tham số hoá TC-INV-014 — 5 dòng dữ liệu thay cho 5 ca riêng biệt gần giống nhau", "TC-INV-014 parameterized table — 5 data rows replacing 5 nearly identical separate cases", "TC-INV-014のパラメータ化表 — 5行のデータが5つの類似個別ケースを置き換える"),
      DEF("Data-Driven Test Case", "một kịch bản bước duy nhất được chạy lặp lại qua một bảng nhiều bộ dữ liệu input/expected, thay vì viết một ca riêng cho từng bộ dữ liệu.",
        "a single step script run repeatedly against a table of many input/expected data sets, instead of writing a separate case for each data set.",
        "各データセットごとに別々のケースを書く代わりに、多くの入力/期待値データセットの表に対して繰り返し実行される単一の手順スクリプト。"),
      TIP("Chọn bộ dữ liệu theo nguyên tắc cân bằng dương/âm/biên: ít nhất 1 dương chuẩn, 1-2 biên, 1 âm cho mỗi ca tham số hoá — đừng chỉ nhồi toàn dữ liệu hợp lệ.", "Choose data sets by the positive/negative/boundary balance principle: at least 1 standard positive, 1-2 boundary, 1 negative per parameterized case — don't fill it only with valid data.", "陽性/陰性/境界のバランス原則でデータセットを選ぶ：パラメータ化ケースごとに最低1つの標準陽性、1〜2つの境界、1つの陰性——有効なデータだけで埋めない。"),
    ] },
  { heading: { vi: "6. Tái sử dụng bước chung, giảm trùng lặp", en: "6. Reusing common steps, reducing duplication", ja: "6. 共通ステップの再利用、重複の削減" },
    blocks: [
      P("Ở ERPCore, gần như MỌI ca kiểm thử — dù ở module Mua hàng, Kho, Bán hàng hay Kế toán — đều cần cùng một bước mở đầu: đăng nhập, chọn công ty, chọn kỳ kế toán đang mở. Nếu 600 ca đều chép tay lại 3 bước này, chỉ một thay đổi nhỏ ở màn hình đăng nhập (thêm bước xác thực 2 lớp) cũng buộc bạn sửa tay ở 600 nơi.",
        "At ERPCore, almost EVERY test case — whether in Purchasing, Inventory, Sales, or Finance — needs the same opening steps: log in, select the company, select the open accounting period. If all 600 cases copy-paste these 3 steps by hand, even a small change to the login screen (adding two-factor authentication) forces you to manually edit 600 places.",
        "ERPCoreでは、購買、在庫、販売、会計のどのモジュールでも、ほぼ全てのテストケースが同じ開始ステップを必要とします：ログイン、会社選択、開いている会計期間の選択。もし600ケース全てがこの3ステップを手動でコピーしていたら、ログイン画面へのわずかな変更（二要素認証の追加）でも600箇所を手動修正する羽目になります。"),
      P("Giải pháp là xây một thư viện 'bước dùng chung' (reusable steps) — mỗi bước chung như Setup đăng nhập, seed dữ liệu công ty mẫu, chọn kỳ kế toán — được định nghĩa MỘT LẦN duy nhất, rồi mọi bộ case ở mọi module chỉ cần GỌI LẠI thay vì viết lại. Khi cần sửa, bạn sửa đúng 1 nơi, hiệu lực lan ra toàn bộ 4 module.",
        "The solution is to build a library of 'reusable steps' — each common step like login Setup, seeding a sample company's data, selecting the accounting period — defined ONCE, then every suite in every module just CALLS it instead of rewriting it. When it needs a fix, you fix exactly 1 place, and the effect propagates to all 4 modules.",
        "解決策は『再利用可能なステップ』ライブラリを構築することです——ログインSetup、サンプル会社データのシード、会計期間の選択のような各共通ステップを一度だけ定義し、あらゆるモジュールの全スイートが書き直す代わりにそれを呼び出します。修正が必要な時は1箇所だけ修正すれば、効果が4モジュール全体に伝わります。"),
      IMG(m_reuse, "Sơ đồ tái sử dụng bước dùng chung 'Setup' giữa 4 bộ case của ERPCore", "Diagram of reusing the common 'Setup' step across ERPCore's 4 test suites", "ERPCoreの4つのテストスイート間で共通『Setup』ステップを再利用する図"),
      P("Không chỉ bước mở đầu, các bước GIỮA quy trình cũng có thể tái sử dụng: bước 'seed 1 phiếu nhập kho hợp lệ' ở module Kho có thể được bộ case Kế toán gọi lại làm điều kiện tiền đề, thay vì tự dựng lại bằng UI. Điều này vừa giảm trùng lặp, vừa giúp các module phản ánh đúng sự phụ thuộc dữ liệu thật giữa chúng mà không tạo ra chuỗi ca phụ thuộc mong manh như đã thấy ở chương 3.",
        "Not just opening steps, mid-process steps can be reused too: the 'seed one valid goods receipt' step from the Inventory module can be called by the Finance suite as a precondition, instead of rebuilding it via UI. This both reduces duplication and lets modules correctly reflect the real data dependency between them without creating the fragile dependent case chains seen in chapter 3.",
        "開始ステップだけでなく、プロセス途中のステップも再利用できます：在庫モジュールの『有効な入庫伝票を1つシードする』ステップを、UIで再構築する代わりに、会計スイートが前提条件として呼び出せます。これは重複を減らすと同時に、第3章で見た脆弱な依存ケースチェーンを作らずに、モジュール間の実際のデータ依存を正しく反映させます。"),
    ] },
  { heading: { vi: "7. Tình huống 1: ca phụ thuộc nhau khiến 1 lỗi làm hỏng cả chuỗi", en: "7. Situation 1: dependent cases let one failure break the whole chain", ja: "7. シーン1：依存するケースが1つの失敗でチェーン全体を壊す" },
    blocks: [
      SITUATION("Đội viết bộ case 'Mua hàng-Nhập kho-Thanh toán' gồm 32 ca chạy TUẦN TỰ, mỗi ca dùng lại state UI của ca trước (không seed dữ liệu riêng) để tiết kiệm công viết.", "The team writes the 'Purchasing-Inventory-Payment' suite with 32 cases running SEQUENTIALLY, each reusing the UI state of the previous case (no separate data seeding) to save writing effort.",
        "TC03 (Duyệt đơn mua) fail vì dữ liệu môi trường staging không ổn định, kéo theo TC04 đến TC32 tự động bị SKIP. Lỗi thật ở TC18 (Đối chiếu tồn kho sau nhập) — một sai số tính tồn kho — không hề được chạy tới, và lọt thẳng sang giai đoạn UAT với khách hàng.",
        "TC03 (Approve purchase order) fails due to unstable staging environment data, causing TC04 through TC32 to auto-SKIP. A real bug in TC18 (Reconcile stock after receipt) — an inventory calculation error — is never reached, and slips straight through to the UAT stage with the customer.",
        "チームは32ケースを順次実行する『購買-入庫-支払』スイートを書き、書く手間を省くため各ケースは前のケースのUI状態を再利用する（個別のデータシードなし）。",
        "TC03（購買注文承認）がステージング環境データの不安定さで失敗し、TC04からTC32が自動SKIPとなる。TC18（入庫後の在庫照合）にある本当のバグ——在庫計算の誤差——には一度も到達せず、そのまま顧客とのUAT段階へ漏れる。"),
      SOLVE("Refactor 32 ca thành các ca độc lập: mỗi ca tự seed dữ liệu tiền đề qua API (đơn mua đã duyệt sẵn, phiếu nhập đã tồn tại) thay vì đi qua UI của ca trước. Giữ lại đúng 1-2 ca 'end-to-end' thật sự cần chạy tuần tự (đánh dấu rõ ràng là loại khác), tách biệt hoàn toàn khỏi các ca kiểm tra từng chức năng riêng lẻ.", "Refactor the 32 cases into independent ones: each case seeds its own precondition data via API (a pre-approved purchase order, an existing goods receipt) instead of going through the previous case's UI. Keep only 1-2 true 'end-to-end' cases that genuinely need to run sequentially (clearly marked as a different category), fully separated from the cases testing individual functions.", "32ケースを独立したものにリファクタリング：各ケースは前のケースのUIを通る代わりに、API経由で自身の前提条件データ（承認済みの購買注文、既存の入庫伝票）をシードする。本当に順次実行が必要な『エンドツーエンド』ケースは1〜2個だけ残し（別カテゴリと明記）、個々の機能をテストするケースとは完全に分離する。"),
      P("Bài học ở đây: viết chuỗi ca phụ thuộc để 'tiết kiệm công viết bước' thực chất chỉ chuyển chi phí sang giai đoạn sau — mỗi lần môi trường không ổn định, cả một mảng lớn của bộ hồi quy trở nên vô dụng, và những lỗi thật nằm sâu trong chuỗi có nguy cơ không bao giờ được phát hiện cho tới khi khách hàng gặp phải.",
        "The lesson here: writing dependent case chains to 'save effort writing steps' actually just shifts the cost to a later stage — every time the environment is unstable, a large chunk of the regression suite becomes useless, and real bugs deep in the chain risk never being found until a customer hits them.",
        "ここでの教訓：『手順を書く手間を省く』ために依存ケースチェーンを書くことは、実際にはコストを後の段階に移すだけです——環境が不安定になるたびに回帰スイートの大部分が無駄になり、チェーンの奥深くにある本当のバグは顧客が遭遇するまで発見されないリスクがあります。"),
      IMG(m_jira, "Ticket lỗi thiết kế test: chuỗi 32 ca phụ thuộc che lấp lỗi thật ở TC18", "A test-design bug ticket: a chain of 32 dependent cases hides a real bug in TC18", "テスト設計バグチケット：32個の依存ケースのチェーンがTC18の本当のバグを隠す"),
      RECAP(["Ca phụ thuộc nhau khiến 1 lỗi đầu chuỗi làm hỏng toàn bộ, che lấp lỗi thật ở các ca sau", "Seed dữ liệu qua API thay vì đi qua UI của ca trước để giữ ca độc lập"],
        ["Dependent cases let one early failure break the whole set, hiding real bugs in later cases", "Seed data via API instead of going through the previous case's UI to keep cases independent"],
        ["依存するケースは前半の1つの失敗でセット全体を壊し、後続の本当のバグを隠す", "ケースを独立に保つため、前のケースのUIを通る代わりにAPIでデータをシードする"]),
    ] },
  { heading: { vi: "8. Tình huống 2: 200 ca gần giống chỉ khác dữ liệu", en: "8. Situation 2: 200 near-identical cases differing only by data", ja: "8. シーン2：データだけが異なる200個の類似ケース" },
    blocks: [
      SITUATION("Module Kho có 200 ca kiểm thử 'Tạo phiếu nhập kho' được viết riêng lẻ theo thời gian bởi nhiều thành viên, mỗi ca chỉ khác nhau 1-2 giá trị nhập (loại hàng, số lượng, kho).", "The Inventory module has 200 separately written 'Create goods receipt' test cases, written over time by many members, each differing by only 1-2 input values (item type, quantity, warehouse).",
        "Khi nghiệp vụ thêm 1 bước xác nhận trước khi lưu phiếu, team phải sửa TAY từng bước kịch bản trên cả 200 ca — mất gần 3 ngày công, và vẫn sót lại 12 ca sửa sai do thao tác lặp thủ công.",
        "When the business adds a confirmation step before saving the receipt, the team has to MANUALLY edit each case's step script across all 200 cases — taking nearly 3 person-days, and still leaving 12 cases wrongly edited due to repetitive manual work.",
        "在庫モジュールには、複数のメンバーが時間をかけて個別に書いた200個の『入庫伝票作成』テストケースがあり、各ケースは1〜2個の入力値（品目種別、数量、倉庫）だけが異なる。",
        "業務が伝票保存前の確認ステップを追加した時、チームは200ケース全ての手順スクリプトを手動で修正しなければならず——ほぼ3人日を要し、それでも反復的な手作業により12ケースが誤って修正されたまま残る。"),
      SOLVE("Gộp 200 ca thành 1 ca data-driven duy nhất theo đúng mẫu ở chương 5: một kịch bản bước, gắn bảng dữ liệu (rút gọn từ 200 xuống còn khoảng 15-20 dòng đại diện đủ dương/âm/biên, loại bỏ các dòng trùng lặp giá trị tương đương). Khi nghiệp vụ đổi lần sau, chỉ sửa đúng 1 kịch bản.", "Merge the 200 cases into a single data-driven case per the chapter-5 pattern: one step script, attached to a data table (trimmed from 200 down to about 15-20 representative rows covering positive/negative/boundary, removing rows with equivalent duplicate values). Next time the business changes, only 1 script needs editing.", "第5章のパターンに従い200ケースを1つのデータ駆動ケースに統合する：1つの手順スクリプトに、データ表（200行から陽性/陰性/境界を網羅する約15〜20行の代表行に絞り込み、同値の重複行を除去）を添付する。次に業務が変わっても、修正するスクリプトは1つだけ。"),
      P("Đây là ví dụ điển hình cho thấy tham số hoá không chỉ là 'gọn hơn' mà còn giảm hẳn rủi ro sửa sót khi có hàng trăm ca gần giống phải đồng bộ tay. Bước 'rút gọn dữ liệu đại diện' cũng quan trọng không kém: không phải cứ giữ nguyên 200 dòng là tốt — cần áp dụng lại nguyên tắc phân vùng tương đương để loại bỏ các dòng dữ liệu không mang thêm giá trị kiểm thử.",
        "This is a textbook example showing parameterization isn't just 'more compact' but sharply cuts the risk of missed edits when hundreds of near-identical cases must be manually synchronized. The 'trim to representative data' step matters just as much: keeping all 200 rows as-is isn't automatically good — you need to reapply equivalence-partitioning to drop data rows that add no extra test value.",
        "これは、パラメータ化が単に『よりコンパクト』というだけでなく、何百もの類似ケースを手動で同期させなければならない際の修正漏れリスクを大きく減らすことを示す典型例です。『代表データへの絞り込み』ステップも同様に重要です：200行をそのまま保持することが自動的に良いわけではなく、追加のテスト価値をもたらさないデータ行を除くために同値分割の原則を再適用する必要があります。"),
      TRY("Với bảng dữ liệu m_datadriven ở chương 5, đề xuất thêm 1 dòng dữ liệu ĐẠI DIỆN cho trường hợp 'nhập nhiều loại hàng trong 1 phiếu' mà chưa được phủ.", "Given the m_datadriven table in chapter 5, propose one more REPRESENTATIVE data row for the 'receiving multiple item types in one receipt' case not yet covered.", "第5章のm_datadrivenの表を見て、まだカバーされていない『1つの伝票で複数品目種別を受け取る』ケースの代表データ行をもう1つ提案しよう。"),
    ] },
  { heading: { vi: "9. Mức chi tiết phù hợp, cân bằng dương/âm/biên & review test case", en: "9. Right level of detail, balancing positive/negative/boundary & reviewing test cases", ja: "9. 適切な詳細度、陽性/陰性/境界のバランス、テストケースレビュー" },
    blocks: [
      P("Mức chi tiết của một bước kiểm thử nên đủ để MỘT NGƯỜI KHÁC (chưa từng làm tính năng này) chạy đúng mà không cần hỏi lại, nhưng không thừa tới mức liệt kê từng cú click chuột không cần thiết. Bước 'nhập dữ liệu rồi lưu' là quá mơ hồ; bước liệt kê toạ độ pixel của từng nút bấm lại quá thừa và dễ vỡ khi UI đổi nhỏ. Điểm cân bằng là ghi rõ trường nào, giá trị gì, kỳ vọng gì — như đã thấy ở bảng data-driven.",
        "The detail level of a test step should be enough for SOMEONE ELSE (who has never worked on this feature) to execute it correctly without having to ask, but not so excessive as to list every unnecessary mouse click. The step 'enter data then save' is too vague; a step listing the pixel coordinates of every button is too excessive and fragile against small UI changes. The balance point is stating clearly which field, what value, what's expected — as seen in the data-driven table.",
        "テスト手順の詳細度は、この機能を扱ったことのない別の人が質問せずに正しく実行できる程度で十分ですが、不要なマウスクリックを全て列挙するほど過剰であってはいけません。『データを入力して保存する』というステップは曖昧すぎます。各ボタンのピクセル座標を列挙するステップは過剰で、小さなUI変更に脆弱です。バランス点は、データ駆動の表で見たように、どの項目に、どの値を、何を期待するかを明確に記すことです。"),
      P("Về cân bằng dương/âm/biên: đừng rải đều số ca cho mọi trường như nhau. Ưu tiên nhiều ca âm/biên hơn cho các trường ảnh hưởng TIỀN, TỒN KHO hoặc SỐ LIỆU KẾ TOÁN (như định mức kho, tỉ giá, số lượng) — nơi một lỗi lọt qua gây thiệt hại thực tế lớn nhất; các trường ít rủi ro (ví dụ ghi chú tự do) chỉ cần 1 ca dương + 1 ca biên độ dài cơ bản là đủ.",
        "On balancing positive/negative/boundary: don't spread the case count evenly across every field. Prioritize more negative/boundary cases for fields affecting MONEY, STOCK, or ACCOUNTING FIGURES (like warehouse capacity, exchange rate, quantity) — where a bug slipping through causes the most real damage; low-risk fields (like a free-text note) only need 1 positive case plus 1 basic length-boundary case.",
        "陽性/陰性/境界のバランスについて：ケース数を全項目に均等に分散させないこと。金額、在庫、会計数値（倉庫定量、為替レート、数量など）に影響する項目に陰性/境界ケースを優先的に多く割く——バグが漏れた時に最も実害が大きい場所です。低リスクな項目（自由記述の備考欄など）は1つの陽性ケースと1つの基本的な長さ境界ケースだけで十分です。"),
      IMG(m_kanban, "Bảng theo dõi quá trình refactor bộ test case ERPCore theo mẫu tối ưu (Sprint 9)", "A board tracking the ERPCore test suite refactor toward the optimized pattern (Sprint 9)", "最適化パターンに向けたERPCoreテストスイートリファクタリングを追跡するボード（スプリント9）"),
      P("Cuối cùng, quy trình review test case nên diễn ra TRƯỚC khi ca được merge vào bộ hồi quy chính thức — không phải review chính tả, mà review đúng các nguyên tắc đã học: ca có atomic/độc lập không, tên có đúng chuẩn không, có tận dụng bước chung sẵn có thay vì chép tay không, mức chi tiết có phù hợp không, và bộ dữ liệu có cân bằng dương/âm/biên theo đúng mức rủi ro không. Một checklist review ngắn giúp người review không bỏ sót tiêu chí nào.",
        "Finally, the test case review process should happen BEFORE a case is merged into the official regression suite — not a spelling review, but a review against the exact principles learned here: is the case atomic/independent, is the name correctly formatted, does it reuse existing common steps instead of copy-pasting, is the detail level appropriate, and does the data set balance positive/negative/boundary according to actual risk. A short review checklist keeps the reviewer from missing any criterion.",
        "最後に、テストケースのレビュープロセスは、正式な回帰スイートにマージされる前に行われるべきです——スペルチェックではなく、ここで学んだ原則に沿ったレビューです：ケースはアトミック/独立か、名前は正しいフォーマットか、手書きの代わりに既存の共通ステップを再利用しているか、詳細度は適切か、データセットは実際のリスクに応じて陽性/陰性/境界のバランスが取れているか。短いレビューチェックリストは、レビュアーがどの基準も見逃さないようにします。"),
      IMG(m_dash, "Hiệu quả tối ưu bộ test case sau refactor — giảm trùng lặp, loại bỏ ca phụ thuộc chuỗi (ERPCore Sprint 9)", "Effect of optimizing the test suite after refactor — reduced duplication, eliminated dependent case chains (ERPCore Sprint 9)", "リファクタリング後のテストスイート最適化の効果 — 重複削減、依存ケースチェーンの排除（ERPCore スプリント9）"),
      PITFALL("Review chỉ soi chính tả và định dạng, bỏ qua việc kiểm tra ca có thật sự atomic/độc lập hay có đang chép trùng bước chung đã có sẵn hay không.", "Reviewing only spelling and formatting, skipping whether the case is truly atomic/independent or whether it duplicates an already-existing common step.", "スペルとフォーマットだけをレビューし、ケースが本当にアトミック/独立か、既存の共通ステップを重複して書いていないかの確認を省くこと。"),
      TIP("Đưa checklist review (atomic? độc lập? đặt tên đúng chuẩn? dùng bước chung? cân bằng dương/âm/biên đúng rủi ro?) vào ngay quy trình pull request của bộ test case, giống như review code.", "Put the review checklist (atomic? independent? correctly named? uses common steps? balances positive/negative/boundary by risk?) right into the test suite's pull request process, just like code review.", "レビューチェックリスト（アトミックか？独立か？正しく命名されているか？共通ステップを使っているか？リスクに応じたバランスが取れているか？）を、コードレビューと同様にテストスイートのプルリクエストプロセスに組み込もう。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi", "初心者のためのテストケースの書き方"),
      INTERNAL("Ma trận truy vết yêu cầu (RTM) nâng cao cho tester", "Advanced requirements traceability matrix for testers", "ma-tran-truy-vet-yeu-cau-rtm-nang-cao-cho-tester", "テスター向け上級要求トレーサビリティマトリクス"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kỹ thuật viết test case tối ưu qua dự án ERPCore nhiều module: nguyên tắc atomic & độc lập, tham số hoá dữ liệu (data-driven), tái sử dụng bước chung để giảm trùng lặp, chuẩn đặt tên & tổ chức bộ ca, mức chi tiết phù hợp, cân bằng dương/âm/biên theo rủi ro, và quy trình review test case trước khi merge vào bộ hồi quy. Hai tình huống thật cho thấy ca phụ thuộc nhau có thể che lấp lỗi thật trong cả chuỗi, và 200 ca gần giống chỉ khác dữ liệu nên được gộp bằng data-driven để giảm chi phí bảo trì.",
        "You just learned the technique of writing optimized test cases through the multi-module ERPCore project: the atomic & independent principle, data-driven parameterization, reusing common steps to cut duplication, naming & organization standards, the right level of detail, balancing positive/negative/boundary by risk, and the test case review process before merging into the regression suite. Two real situations showed that dependent cases can hide real bugs across a whole chain, and 200 near-identical cases differing only by data should be merged via data-driven to cut maintenance cost.",
        "複数モジュールのERPCoreプロジェクトを通じて、最適化されたテストケースを書く技法を学びました：アトミック＆独立の原則、データ駆動のパラメータ化、重複を減らす共通ステップの再利用、命名・整理の基準、適切な詳細度、リスクに応じた陽性/陰性/境界のバランス、そして回帰スイートへのマージ前のテストケースレビュープロセス。2つの実例は、依存するケースがチェーン全体で本当のバグを隠しうること、データだけが異なる200個の類似ケースはデータ駆動で統合し保守コストを削減すべきことを示しました。"),
      P("Chặng tiếp theo, bạn có thể kết hợp các nguyên tắc này với ma trận truy vết yêu cầu (RTM) để đảm bảo bộ case tối ưu vẫn phủ đủ mọi yêu cầu nghiệp vụ, hoặc học kỹ thuật pairwise để giảm ca hơn nữa cho các màn hình cấu hình nhiều tham số. Nếu muốn luyện thiết kế bộ test case cho dự án doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận các hệ thống ERP quy mô lớn.",
        "Next, you can combine these principles with a requirements traceability matrix (RTM) to ensure the optimized suite still covers every business requirement, or learn pairwise testing to reduce cases further for multi-parameter configuration screens. If you want to practice designing test suites for real enterprise projects with a mentor, a structured Tester course helps you progress fast and confidently take on large-scale ERP systems.",
        "次は、これらの原則を要求トレーサビリティマトリクス（RTM）と組み合わせ、最適化されたスイートが全ての業務要件を網羅していることを確認したり、多パラメータの設定画面向けにさらにケースを削減するペアワイズテストを学んだりできます。指導者付きで実際の企業プロジェクト向けにテストスイートを設計する練習をしたいなら、体系的なテスターコースが大規模ERPシステムを自信を持って担当できるよう速い成長を助けます。"),
      CTA(course),
    ] },
];

const doc = makeDoc({
  slug: "ky-thuat-viet-test-case-toi-uu-tai-su-dung-cho-tester",
  domain: "erp",
  primaryKeyword: "viết test case tối ưu",
  keywords: ["viết test case tối ưu", "test case design pattern", "data-driven test case", "tái sử dụng test case", "atomic test case", "ERP nhiều module"],
  coverLabel: "NÂNG CAO · TEST CASE DESIGN · DOANH NGHIỆP",
  crumb: "Kỹ thuật viết test case tối ưu & tái sử dụng (Test Case Design Patterns)",
  metaTitle: { vi: "Viết test case tối ưu & tái sử dụng cho tester", en: "Writing optimized, reusable test cases for testers", ja: "テスター向け最適化・再利用可能なテストケースの書き方" },
  metaDescription: {
    vi: "Viết test case tối ưu & tái sử dụng cho dự án ERP nhiều module: atomic, độc lập, tham số hoá data-driven, tái sử dụng bước chung, đặt tên bộ ca, review test case.",
    en: "Writing optimized, reusable test cases for a multi-module ERP project: atomic, independent, data-driven parameterization, reusing common steps, suite naming, and a test case review process, with a final quiz.",
    ja: "複数モジュールのERPプロジェクト向け最適化・再利用可能なテストケースの書き方：アトミック、独立、データ駆動パラメータ化、共通ステップ再利用、命名、レビュープロセス、クイズ付き。",
  },
  title: {
    vi: "Kỹ thuật viết test case tối ưu & tái sử dụng (Test Case Design Patterns): dự án ERP nhiều module (có trắc nghiệm)",
    en: "Test case design patterns: writing optimized, reusable test cases for a multi-module ERP project (with quiz)",
    ja: "テストケース設計パターン：複数モジュールのERPプロジェクト向け最適化・再利用可能なテストケースの書き方（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: viết test case tối ưu & tái sử dụng cho dự án ERPCore — hệ quản trị doanh nghiệp nhiều module (Mua hàng, Kho, Bán hàng, Kế toán). Nguyên tắc atomic/độc lập, tham số hoá data-driven, tái sử dụng bước chung, chuẩn đặt tên & tổ chức bộ ca, mức chi tiết phù hợp, cân bằng dương/âm/biên, quy trình review test case, 2 tình huống lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: writing optimized, reusable test cases for the ERPCore project — a multi-module enterprise system (Purchasing, Inventory, Sales, Finance). The atomic/independent principle, data-driven parameterization, reusing common steps, naming & organization standards, the right level of detail, balancing positive/negative/boundary, a test case review process, 2 real bug situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：複数モジュール企業システム（購買、在庫、販売、会計）のERPCoreプロジェクト向けに最適化・再利用可能なテストケースを書く。アトミック/独立の原則、データ駆動パラメータ化、共通ステップの再利用、命名・整理の基準、適切な詳細度、陽性/陰性/境界のバランス、テストケースレビュープロセス、2つの実例バグ、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết test case tối ưu & tái sử dụng cho dự án ERP nhiều module", steps: [
    { name: "Áp dụng nguyên tắc atomic & độc lập", text: "Mỗi ca 1 mục tiêu rõ, tự seed dữ liệu riêng thay vì phụ thuộc ca khác." },
    { name: "Tham số hoá dữ liệu khi có nhiều bộ input gần giống", text: "Gộp thành 1 kịch bản bước + bảng dữ liệu cân bằng dương/âm/biên." },
    { name: "Tái sử dụng bước chung & review trước khi merge", text: "Dùng thư viện bước chung, review theo checklist atomic/tên/độ chi tiết/rủi ro." },
  ] },
  pages,
});

export const MA_TCPATTERN_01 = [doc];
