// doc_ma_coverage_dataflow.mjs — BÀI NÂNG CAO: Độ phủ mã (Coverage) & Kiểm thử luồng dữ liệu (Data Flow)
// cho tester — statement/branch/condition coverage nghĩa là gì với tester, cách đọc báo cáo coverage
// để bổ sung ca kiểm thử, khái niệm define-use, và vì sao "100% test pass" không đồng nghĩa an toàn.
// Gắn module tính cước cuộc gọi/data của nhà mạng viễn thông. Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, jira, dashboard, moduleFlow } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", cfg.domain, "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: bảng so sánh statement / branch / condition coverage ──
const m_compare = grid(
  "So sánh 3 mức độ phủ mã trên hàm tinhCuocGoi",
  ["Loại độ phủ", "Đo cái gì", "Ví dụ trên tinhCuocGoi", "Rủi ro nếu chỉ dừng ở đây"],
  [
    ["Statement coverage", "Mỗi DÒNG lệnh được thực thi ≥ 1 lần", "1 ca gọi ngắn + 1 ca gọi dài đã chạy hết các dòng gán 'cuoc'", "100% dòng chạy nhưng chưa chắc đủ tổ hợp nhánh rẽ"],
    ["Branch/Decision coverage", "Mỗi NHÁNH true/false của mỗi if được đi qua ≥ 1 lần", "Ca cho IF#1 đúng, IF#1 sai, IF#2 đúng, IF#2 sai", "Nhánh 'đúng' của IF#2 (giảm giá) có thể chưa từng chạy"],
    ["Condition coverage", "Mỗi ĐIỀU KIỆN CON trong biểu thức logic nhận cả true/false", "laKhachVIP=true/false và ngayTrongThang≥25=true/false được thử riêng", "Phủ đủ điều kiện con chưa chắc phủ đủ tổ hợp NHÁNH kết quả"],
  ],
  { accent: "#a21caf", note: "Ba mức không thay thế nhau: 100% statement không suy ra 100% branch, và 100% branch không suy ra 100% condition." }
);

// ── Mockup 2: bảng 4 ca kiểm thử & nhánh được phủ (đi kèm CODE bên dưới) ──
const m_branch_cases = grid(
  "4 ca kiểm thử & nhánh được phủ trên tinhCuocGoi",
  ["Ca test", "soPhut / phútMiễnPhí", "laKhachVIP", "Ngày trong tháng", "Nhánh đi qua"],
  [
    ["TC1 · gọi trong gói", "20 / 30", "false", "10", "IF#1 = ĐÚNG (miễn phí)"],
    ["TC2 · vượt gói, KH thường", "45 / 30", "false", "10", "IF#1 = SAI, IF#2 = SAI"],
    ["TC3 · vượt gói, VIP, đầu tháng", "45 / 30", "true", "5", "IF#1 = SAI, IF#2 = SAI (ngày<25)"],
    ["TC4 · vượt gói, VIP, cuối tháng", "45 / 30", "true", "27", "IF#1 = SAI, IF#2 = ĐÚNG (giảm giá 20%)"],
  ],
  { accent: "#a21caf", highlight: 3, note: "TC4 là ca DỄ BỊ BỎ SÓT — nhánh giảm giá cuối tháng chỉ được phủ khi có đúng ca này." }
);

// ── Mockup 3: sơ đồ Define → Use của biến 'cuoc' (data flow) ──
const m_dataflow = moduleFlow(
  "Đường đi Define → Use của biến 'cuoc' trong tinhCuocGoi",
  [
    { id: "n1", x: 110, y: 60, label: "cuoc = 0", sub: "DEFINE #1" },
    { id: "n2", x: 380, y: 60, label: "if soPhut ≤ miễn phí?", sub: "predicate rẽ nhánh" },
    { id: "n3", x: 650, y: 60, label: "cuoc = (soPhut−mp)×giá", sub: "DEFINE #2 (nhánh SAI)" },
    { id: "n4", x: 110, y: 180, label: "if VIP && ngày≥25?", sub: "predicate — điều kiện kép" },
    { id: "n5", x: 380, y: 180, label: "cuoc = cuoc × 0.8", sub: "USE cuoc + DEFINE #3" },
    { id: "n6", x: 650, y: 180, label: "return cuoc", sub: "USE cuối — DU-path kết thúc" },
  ],
  [
    { from: "n1", to: "n2", label: "define → predicate IF#1" },
    { from: "n2", to: "n3", label: "nhánh SAI: DEFINE #2" },
    { from: "n2", to: "n4", label: "nhánh ĐÚNG: giữ DEFINE #1" },
    { from: "n3", to: "n4", label: "xuống predicate IF#2" },
    { from: "n4", to: "n5", label: "nhánh ĐÚNG: USE+DEFINE#3 — DU-path chưa từng chạy", bad: true },
    { from: "n4", to: "n6", label: "nhánh SAI: bỏ qua giảm giá" },
    { from: "n5", to: "n6", label: "use cuoc cuối (return)" },
  ],
  { accent: "#a21caf", h: 260 }
);

// ── Mockup 4: ticket Jira — nhánh chưa phủ gây sai cước ──
const m_jira = jira({
  key: "TC-8823",
  title: "Cước tháng 6 tính sai cho khách VIP: nhánh giảm giá cuối tháng (IF#2 = đúng) chưa từng được test",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "production · billing-service v3.4.1 · chu kỳ cước tháng 6"],
    ["Phát hiện qua", "Báo cáo branch coverage: nhánh IF#2 (laKhachVIP && ngayTrongThang>=25) = ĐÚNG chỉ đạt 0% trong bộ hồi quy"],
    ["Các bước tái hiện", "1) Tạo khách VIP 2) Gọi vượt gói vào ngày 27 trong tháng 3) Xem cước cuối kỳ"],
    ["Kết quả mong đợi", "Cước được giảm 20% theo chính sách ưu đãi cuối tháng cho khách VIP"],
    ["Kết quả thực tế", "Cước tính đủ 100%, không áp giảm giá — khách VIP bị tính dư tiền, số khiếu nại tăng đột biến cuối tháng 6"],
  ],
});

// ── Mockup 5: dashboard độ phủ mã module tính cước ──
const m_dashboard = dashboard("Độ phủ mã module Tính cước — trước khi vá lỗi TC-8823", [
  { label: "Statement coverage", value: "96%", sub: "gần như mọi dòng đã chạy", color: "#16a34a" },
  { label: "Branch coverage", value: "78%", sub: "nhánh giảm giá IF#2=đúng: 0%", color: "#f59e0b" },
  { label: "Condition coverage", value: "61%", sub: "vế 'ngày ≥ 25' chưa từng = true", color: "#ef4444" },
  { label: "Bug do nhánh chưa phủ", value: "1 Critical", sub: "TC-8823 · sai cước hàng loạt", color: "#e11d48" },
]);

// ── Đoạn CODE: logic tính cước cuộc gọi vượt gói + giảm giá VIP cuối tháng ──
const m_code = `function tinhCuocGoi(soPhut, goiCuoc, laKhachVIP, ngayTrongThang) {
  let cuoc = 0;                                              // DEFINE #1
  if (soPhut <= goiCuoc.phutMienPhi) {
    cuoc = 0;                                                // nhanh THEN - trong goi, khong tinh tien
  } else {
    cuoc = (soPhut - goiCuoc.phutMienPhi) * goiCuoc.donGia;   // DEFINE #2 (nhanh ELSE)
  }
  if (laKhachVIP && ngayTrongThang >= 25) {                  // dieu kien kep (compound condition)
    cuoc = cuoc * 0.8;                                       // USE cuoc + DEFINE #3 - giam gia cuoi thang
  }
  return cuoc;                                                // USE cuoi cung (DU-path ket thuc)
}`;

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Độ phủ mã (code coverage) có nghĩa là gì với tester không viết code?",
  "What does code coverage mean for testers who don't write code?",
  "Tester không nhất thiết phải tự viết công cụ đo coverage — công cụ đó (Jacoco, Istanbul, SonarQube...) thường do CI/CD sinh ra sau mỗi build. Việc của tester là ĐỌC báo cáo đó để biết dòng lệnh, nhánh rẽ hay điều kiện con nào CHƯA từng được kiểm thử, rồi thiết kế thêm ca kiểm thử theo kịch bản nghiệp vụ (không cần viết code) nhắm đúng vào lỗ hổng đó — như ca 'khách VIP gọi vượt gói vào cuối tháng' trong bài này.",
  "Testers don't necessarily need to build coverage tools themselves — tools like Jacoco, Istanbul, or SonarQube are usually generated by CI/CD after each build. A tester's job is to READ that report to see which lines, branches, or sub-conditions have NEVER been exercised, then design extra business-scenario test cases (no coding required) that target exactly that gap — like the 'VIP customer calling over their plan at month-end' case in this article.",
  "コーディングをしないテスターにとってコードカバレッジとは何を意味する？",
  "テスターが自分でカバレッジ計測ツールを作る必要は必ずしもありません——Jacoco、Istanbul、SonarQubeなどのツールは通常、ビルドごとにCI/CDが生成します。テスターの仕事はそのレポートを『読み』、どの行・分岐・サブ条件がまだ一度もテストされていないかを把握し、その穴を狙った業務シナリオのテストケース（コーディング不要）を追加設計することです——本記事の『VIP顧客が月末にプラン超過で通話する』ケースのように。"
);
const faq2 = FAQ(
  "Vì sao 100% branch coverage vẫn có thể lọt lỗi tính cước?",
  "Why can 100% branch coverage still miss a billing bug?",
  "Vì branch coverage chỉ đảm bảo mỗi nhánh true/false CHẠY ít nhất một lần — nó không đảm bảo (1) assertion trong ca test đủ mạnh để phát hiện số tiền sai, (2) đủ giá trị biên bên trong nhánh đó (vd ngày = 25 đúng biên, ngày = 31 cuối tháng), và (3) mọi điều kiện con trong một biểu thức kép đã được thử độc lập (đó là việc của condition coverage) hay đường đi define-use của biến tiền tệ quan trọng đã thực sự chạy đủ.",
  "Because branch coverage only guarantees each true/false branch RAN at least once — it doesn't guarantee (1) the test's assertions are strong enough to catch a wrong amount, (2) enough boundary values were tried inside that branch (e.g. day = 25 exactly, day = 31 at month-end), and (3) every sub-condition inside a compound expression was tested independently (that's condition coverage's job), or that the define-use path of a critical money variable actually ran.",
  "なぜ100%のブランチカバレッジでも料金計算のバグを見逃すことがある？",
  "ブランチカバレッジは各true/false分岐が少なくとも一度『実行された』ことしか保証しないからです。（1）テストのアサーションが誤った金額を検出できるほど厳密か、（2）その分岐内で境界値（例：ちょうど25日、月末の31日）が十分に試されたか、（3）複合条件内の各サブ条件が独立してテストされたか（これはコンディションカバレッジの役目）、あるいは重要な金額変数のdefine-use経路が実際に実行されたかは保証されません。"
);
const faq3 = FAQ(
  "Kiểm thử luồng dữ liệu (data flow testing) khác kiểm thử độ phủ nhánh (branch testing) ở điểm nào?",
  "How does data flow testing differ from branch testing?",
  "Branch testing quan tâm CẤU TRÚC ĐIỀU KHIỂN — mỗi nhánh rẽ có được chạy hay không. Data flow testing quan tâm VÒNG ĐỜI CỦA MỘT BIẾN cụ thể — từ lúc nó được GÁN giá trị (define) tới lúc nó được DÙNG (use) — có thực sự được thực thi theo đúng đường đi (DU-path) hay không. Kỹ thuật này đặc biệt hữu ích để bắt lỗi ở các biến tiền tệ bị gán/tính lại nhiều lần qua các nhánh khác nhau, như biến 'cuoc' bị định nghĩa lại ba lần trong ví dụ của bài.",
  "Branch testing cares about CONTROL STRUCTURE — whether each branch runs or not. Data flow testing cares about a specific VARIABLE'S LIFECYCLE — from where it's DEFINED (assigned) to where it's USED — whether that path (a DU-path) is actually executed. This technique is especially useful for catching bugs in monetary variables that get assigned/recomputed multiple times across different branches, like the 'cuoc' variable redefined three times in this article's example.",
  "データフローテストはブランチカバレッジ（分岐テスト）とどう違う？",
  "分岐テストは『制御構造』——各分岐が実行されるかどうか——に着目します。データフローテストは特定の『変数のライフサイクル』——定義（define）された場所から使用（use）される場所まで——その経路（DUパス）が実際に実行されたかに着目します。この技法は、本記事の例で3回再定義される変数『cuoc』のように、複数の分岐をまたいで何度も代入・再計算される金額系の変数のバグを見つけるのに特に有効です。"
);

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Nếu một hàm đạt 100% statement coverage nhưng chỉ 60% branch coverage, điều đó có nghĩa gì?", en: "If a function has 100% statement coverage but only 60% branch coverage, what does that mean?", ja: "ある関数がステートメントカバレッジ100%だがブランチカバレッジは60%しかない場合、それは何を意味する？" },
    options: [
      { vi: "Mọi dòng lệnh đã chạy ít nhất 1 lần, nhưng một số tổ hợp nhánh true/false của các điều kiện chưa từng được thử", en: "Every line ran at least once, but some true/false branch combinations of the conditions were never exercised", ja: "全ての行が少なくとも一度実行されたが、条件のtrue/false分岐の一部の組み合わせは一度も試されていない" },
      { vi: "Không thể xảy ra vì hai chỉ số này luôn bằng nhau", en: "This can't happen because the two metrics are always equal", ja: "この2つの指標は常に等しいため、あり得ない" },
      { vi: "Hàm chắc chắn không có bug", en: "The function definitely has no bugs", ja: "この関数には確実にバグがない" },
      { vi: "Bộ test chưa chạy được dòng lệnh nào cả", en: "The test suite hasn't run any line at all", ja: "テストスイートは1行も実行できていない" },
    ], correct: 0,
    explain: { vi: "Statement coverage chỉ đo dòng lệnh; một dòng if có thể được 'chạm' dù chỉ 1 trong 2 nhánh từng chạy, nên branch coverage vẫn có thể thấp hơn nhiều.", en: "Statement coverage only measures lines; an if-line can be 'touched' even if only one of its two branches ever ran, so branch coverage can still be much lower.", ja: "ステートメントカバレッジは行しか測りません。if文の行は2つの分岐のうち片方しか実行されなくても『触れた』ことになるため、ブランチカバレッジはずっと低いままになり得ます。" },
  }),
  mcq({
    q: { vi: "Với biểu thức laKhachVIP && ngayTrongThang >= 25, để đạt CONDITION coverage đầy đủ, tester cần gì?", en: "For the expression laKhachVIP && ngayTrongThang >= 25, what does full CONDITION coverage require?", ja: "式 laKhachVIP && ngayTrongThang >= 25 について、完全なコンディションカバレッジには何が必要？" },
    options: [
      { vi: "Chỉ cần biểu thức tổng cho ra cả true và false ít nhất 1 lần mỗi loại", en: "Only the overall expression needs to yield both true and false at least once each", ja: "式全体がtrueとfalseをそれぞれ一度出せば十分" },
      { vi: "Mỗi điều kiện con (laKhachVIP, và ngayTrongThang>=25) đều phải nhận cả giá trị true và false ở các ca test khác nhau, không chỉ kết quả chung của biểu thức", en: "Each sub-condition (laKhachVIP, and ngayTrongThang>=25) must each take both true and false across different test cases, not just the expression's overall result", ja: "各サブ条件（laKhachVIPとngayTrongThang>=25）がそれぞれ異なるテストケースでtrueとfalseの両方を取る必要があり、式全体の結果だけでは不十分" },
      { vi: "Chỉ cần test với laKhachVIP=true", en: "Only need to test with laKhachVIP=true", ja: "laKhachVIP=trueだけテストすれば良い" },
      { vi: "Không cần quan tâm tới từng điều kiện con, chỉ cần chạy hết các dòng lệnh", en: "No need to care about individual sub-conditions, just run every line", ja: "個々のサブ条件は気にせず、全ての行を実行すれば良い" },
    ], correct: 1,
    explain: { vi: "Condition coverage yêu cầu từng điều kiện con độc lập nhận đủ true/false, khác với decision/branch coverage chỉ quan tâm kết quả CHUNG của biểu thức.", en: "Condition coverage requires each sub-condition independently to get both true/false, unlike decision/branch coverage which only cares about the expression's overall result.", ja: "コンディションカバレッジは各サブ条件が独立してtrue/falseを取ることを要求します。式全体の結果だけを見るデシジョン／ブランチカバレッジとは異なります。" },
  }),
  mcq({
    q: { vi: "Trong ví dụ TC-8823, vì sao 2 ca test (VIP+ngày27 → true, không-VIP+ngày27 → false) vẫn khiến IF#2 đạt 100% decision coverage nhưng CHƯA đủ để phát hiện lỗ hổng?", en: "In the TC-8823 example, why do 2 test cases (VIP+day27 → true, non-VIP+day27 → false) already give IF#2 100% decision coverage yet still fail to catch the gap?", ja: "TC-8823の例で、2つのテストケース（VIP＋27日→true、非VIP＋27日→false）でIF#2のデシジョンカバレッジは100%になるのに、なぜ穴を見つけるには不十分？" },
    options: [
      { vi: "Vì decision coverage chỉ cần biểu thức tổng ra true/false đủ cả 2 lần, trong khi điều kiện 'ngayTrongThang>=25' chưa từng được thử với giá trị FALSE khi laKhachVIP=true — do short-circuit, nó thậm chí chưa từng được đánh giá ở ca thứ hai", en: "Because decision coverage only needs the overall expression to yield true/false at least once each, while 'ngayTrongThang>=25' was never tried as FALSE when laKhachVIP=true — due to short-circuiting, it wasn't even evaluated in the second case", ja: "デシジョンカバレッジは式全体がtrue/falseをそれぞれ一度出せば十分だが、laKhachVIP=trueのとき『ngayTrongThang>=25』がFALSEとして一度も試されていない——ショートサーキットにより2つ目のケースではそもそも評価すらされていないから" },
      { vi: "Vì hai ca test đó thực ra giống hệt nhau", en: "Because the two test cases are actually identical", ja: "その2つのテストケースは実は全く同じだから" },
      { vi: "Vì decision coverage không tồn tại trong JavaScript", en: "Because decision coverage doesn't exist in JavaScript", ja: "デシジョンカバレッジはJavaScriptには存在しないから" },
      { vi: "Vì cần chạy test 100 lần mới tính coverage chính xác", en: "Because you need to run the test 100 times for coverage to be accurate", ja: "カバレッジを正確に計算するにはテストを100回実行する必要があるから" },
    ], correct: 0,
    explain: { vi: "Đây chính là bẫy điều kiện kép + short-circuit: decision coverage 'hài lòng' quá sớm trong khi một điều kiện con quan trọng chưa từng được thử độc lập với vế còn lại.", en: "This is exactly the compound-condition + short-circuit trap: decision coverage is 'satisfied' too early while an important sub-condition was never tried independently of the other side.", ja: "これはまさに複合条件とショートサーキットの罠です。デシジョンカバレッジは早すぎるタイミングで『満足』してしまい、重要なサブ条件がもう片方から独立して試されていません。" },
  }),
  mcq({
    q: { vi: "Data flow testing (kiểm thử luồng dữ liệu) tập trung kiểm tra điều gì mà branch coverage không đảm bảo?", en: "What does data flow testing focus on checking that branch coverage doesn't guarantee?", ja: "データフローテストは、ブランチカバレッジが保証しない何を重点的に確認する？" },
    options: [
      { vi: "Tốc độ thực thi của chương trình", en: "The program's execution speed", ja: "プログラムの実行速度" },
      { vi: "Đường đi từ nơi một biến được GÁN giá trị (define) tới nơi nó được SỬ DỤNG (use) có thực sự được thực thi hay không", en: "Whether the path from where a variable is DEFINED to where it is USED is actually executed", ja: "変数が定義（define）された箇所から使用（use）される箇所までの経路が実際に実行されたかどうか" },
      { vi: "Số lượng dòng code trong file", en: "The number of lines of code in the file", ja: "ファイル内のコード行数" },
      { vi: "Giao diện người dùng có đẹp hay không", en: "Whether the user interface looks good", ja: "ユーザーインターフェースが美しいかどうか" },
    ], correct: 1,
    explain: { vi: "Data flow testing xoay quanh cặp define-use của từng biến, đặc biệt hữu ích với biến quan trọng như 'cuoc' bị gán lại nhiều lần qua các nhánh khác nhau.", en: "Data flow testing revolves around each variable's define-use pairs, especially useful for critical variables like 'cuoc' that get reassigned across different branches.", ja: "データフローテストは各変数のdefine-useペアを中心に据えており、異なる分岐をまたいで何度も再代入される『cuoc』のような重要な変数に特に有効です。" },
  }),
  mcq({
    q: { vi: "Vì sao 'module tính cước đạt 100% test pass' KHÔNG đồng nghĩa với an toàn?", en: "Why does 'the billing module has 100% tests passing' NOT mean it's safe?", ja: "『料金計算モジュールがテスト100%合格』が安全を意味しないのはなぜ？" },
    options: [
      { vi: "Vì 100% pass chỉ chứng minh các ca ĐÃ CHỌN đúng theo oracle hiện có; nó không đảm bảo đã phủ đủ nhánh/điều kiện/luồng dữ liệu rủi ro, cũng như không đảm bảo assertion đủ mạnh để bắt sai số tiền", en: "Because 100% passing only proves the CHOSEN cases are correct against the current oracle; it doesn't guarantee enough risky branches/conditions/data-flow paths were covered, nor that assertions are strong enough to catch a wrong amount", ja: "100%合格は既存のオラクルに対して『選ばれたケース』が正しいことを証明するだけで、リスクの高い分岐・条件・データフロー経路が十分カバーされたことも、金額の誤りを検出できるほどアサーションが厳密であることも保証しないから" },
      { vi: "Vì test pass nghĩa là chương trình chạy chậm", en: "Because passing tests means the program runs slowly", ja: "テスト合格はプログラムの動作が遅いことを意味するから" },
      { vi: "Vì 100% test pass là điều không thể xảy ra trong thực tế", en: "Because 100% tests passing can never happen in reality", ja: "テスト100%合格は現実には起こり得ないから" },
      { vi: "Vì pass chỉ áp dụng cho giao diện, không áp dụng cho logic tính tiền", en: "Because passing only applies to the UI, not to billing logic", ja: "合格はUIにのみ適用され、料金計算ロジックには適用されないから" },
    ], correct: 0,
    explain: { vi: "Coverage và tỉ lệ pass đo 'đã chạm tới/đã đúng với ca đã viết', không đo 'đã nghĩ đủ ca nguy hiểm chưa' — đó là lý do phải kết hợp đọc coverage report với tư duy rủi ro.", en: "Coverage and pass rate measure 'was it touched / was it correct for the written cases', not 'were enough risky cases thought of' — that's why reading coverage reports must be combined with risk-based thinking.", ja: "カバレッジと合格率は『触れたか／書かれたケースに対して正しいか』を測るだけで、『危険なケースを十分考えたか』は測りません——だからカバレッジレポートの読解にはリスクベースの思考を組み合わせる必要があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bối cảnh: module tính cước viễn thông", en: "1. Quick summary & context: a telecom billing module", ja: "1. 要点と背景：通信料金計算モジュール" },
    blocks: [
      TLDR("Độ phủ mã (code coverage) gồm ba mức tester cần phân biệt: statement (dòng lệnh), branch/decision (nhánh rẽ), và condition (điều kiện con trong biểu thức logic) — mỗi mức đo một thứ khác nhau và mức cao hơn không tự động kéo theo mức thấp hơn được phủ đủ. Bài này dùng module tính cước cuộc gọi/data của nhà mạng để minh hoạ: đọc báo cáo coverage để tìm nhánh còn thiếu, khái niệm kiểm thử luồng dữ liệu (data flow testing) qua cặp define-use, và vì sao '100% test pass' không đồng nghĩa an toàn khi coverage vẫn còn lỗ hổng. Có sơ đồ, bảng so sánh, ticket lỗi thật và trắc nghiệm cuối bài.",
        "Code coverage has three levels testers must tell apart: statement (lines), branch/decision (branches), and condition (sub-conditions inside a logical expression) — each measures something different, and a higher level doesn't automatically mean a lower level is fully covered. This article uses a telecom call/data billing module to illustrate: reading a coverage report to find missing branches, the concept of data flow testing through define-use pairs, and why '100% tests passing' doesn't mean safety when coverage still has gaps. Includes diagrams, comparison tables, a real bug ticket, and a quiz at the end.",
        "コードカバレッジには、テスターが区別すべき3つのレベルがあります：ステートメント（行）、ブランチ／デシジョン（分岐）、コンディション（論理式内のサブ条件）——それぞれ測るものが異なり、上位レベルが高いからといって下位レベルが十分にカバーされているとは限りません。本記事は通信キャリアの通話・データ課金モジュールを例に、カバレッジレポートを読んで不足している分岐を見つける方法、define-useペアによるデータフローテストの概念、そしてカバレッジに穴があるにもかかわらず『テスト100%合格』が安全を意味しない理由を解説します。図表、比較表、実際のバグチケット、そして最後にクイズ付きです。"),
      P("Bạn là tester trong đội billing của một nhà mạng. Module tinhCuocGoi() tính tiền cuộc gọi/data hàng tháng cho hàng triệu thuê bao — sai một dòng logic, hàng nghìn khách hàng có thể bị tính dư hoặc tính thiếu tiền. Mỗi lần dev build xong, CI/CD tự sinh báo cáo coverage (kiểu Jacoco, Istanbul, SonarQube) và gắn link vào pull request. Bạn không cần tự viết công cụ đo coverage, nhưng bạn CẦN đọc đúng báo cáo đó: biết phân biệt statement, branch, condition; biết chỉ số nào đáng tin, chỉ số nào dễ gây ảo tưởng an toàn; và biết khi nào phải bổ sung ca kiểm thử thủ công nhắm đúng vào lỗ hổng thay vì tin tưởng mù quáng vào con số phần trăm.",
        "You're a tester on a telecom carrier's billing team. The tinhCuocGoi() module calculates monthly call/data charges for millions of subscribers — one wrong line of logic and thousands of customers could be overcharged or undercharged. Every time a dev finishes a build, CI/CD auto-generates a coverage report (Jacoco-, Istanbul-, or SonarQube-style) and links it in the pull request. You don't need to build the coverage tool yourself, but you DO need to read that report correctly: telling statement, branch, and condition apart; knowing which metric to trust and which one can create a false sense of safety; and knowing when to add manual test cases that target the actual gap instead of blindly trusting a percentage.",
        "あなたは通信キャリアの課金チームのテスターです。tinhCuocGoi()モジュールは数百万の契約者の月次通話・データ料金を計算します——ロジックが1行でも間違えば、何千もの顧客が過大請求または過小請求される可能性があります。開発者がビルドを終えるたびに、CI/CDがカバレッジレポート（Jacoco、Istanbul、SonarQube風）を自動生成し、プルリクエストにリンクします。あなた自身がカバレッジ計測ツールを作る必要はありませんが、そのレポートを正しく読む必要はあります：ステートメント・ブランチ・コンディションを区別すること、どの指標を信頼しどの指標が誤った安心感を生むかを知ること、そしてパーセンテージを盲信せず、実際の穴を狙った手動テストケースを追加すべきタイミングを見極めることです。"),
      CODE("javascript", m_code),
      DEF("Code Coverage", "chỉ số đo mức độ mã nguồn được 'chạm tới' khi chạy bộ kiểm thử — nhưng KHÔNG đo việc kết quả có được kiểm tra đúng hay không.",
        "a metric measuring how much source code is 'touched' when running a test suite — but it does NOT measure whether the results were verified correctly.",
        "テストスイート実行時にソースコードがどれだけ『触れられた』かを測る指標——ただし、結果が正しく検証されたかどうかは測定しない。"),
    ] },
  { heading: { vi: "2. Statement coverage — dòng lệnh nào đã chạy, dòng nào chưa", en: "2. Statement coverage — which lines ran, which didn't", ja: "2. ステートメントカバレッジ — どの行が実行されたか" },
    blocks: [
      P("Statement coverage là mức đơn giản nhất: một dòng lệnh được tính là 'đã phủ' nếu nó được thực thi ít nhất một lần trong toàn bộ bộ kiểm thử, bất kể giá trị đầu vào là gì. Với hàm tinhCuocGoi(), chỉ cần một ca gọi trong gói (soPhut nhỏ hơn phutMienPhi) và một ca gọi vượt gói là đủ để mọi DÒNG lệnh — kể cả dòng gán 'cuoc' ở cả hai nhánh if — đều được chạm tới ít nhất một lần. Báo cáo coverage tool thường tô xanh các dòng đã chạy, tô đỏ các dòng chưa từng chạy, giúp tester nhìn nhanh 'code chết' hoặc phần logic hoàn toàn chưa được thử.",
        "Statement coverage is the simplest level: a line counts as 'covered' if it executes at least once across the entire test suite, regardless of the input values. For tinhCuocGoi(), just one in-plan call case (soPhut smaller than phutMienPhi) and one over-plan call case is enough for every LINE — including the 'cuoc' assignment in both if-branches — to be touched at least once. Coverage tools usually highlight executed lines in green and never-run lines in red, letting testers quickly spot 'dead code' or logic that was never tried at all.",
        "ステートメントカバレッジは最もシンプルなレベルです：ある行は、入力値が何であれ、テストスイート全体で少なくとも一度実行されれば『カバーされた』とみなされます。tinhCuocGoi()の場合、プラン内通話（soPhutがphutMienPhiより小さい）とプラン超過通話のケースが1つずつあれば、両方のif分岐にある『cuoc』への代入を含む全ての行が少なくとも一度は触れられます。カバレッジツールは通常、実行済みの行を緑、一度も実行されていない行を赤で表示し、テスターが『デッドコード』や一度も試されていないロジックを素早く見つけられるようにします。"),
      P("Điểm mạnh của statement coverage là đơn giản, dễ hiểu, dễ báo cáo cho quản lý. Nhưng điểm yếu chí mạng: nó KHÔNG phân biệt các trường hợp bên trong cùng một điều kiện. Dòng if(soPhut <= goiCuoc.phutMienPhi) chỉ cần chạy MỘT lần, dù nhánh true hay nhánh false, là được tính 'đã phủ' — dòng if đó không đòi hỏi cả hai khả năng đều được thử. Đây chính là lý do một module đạt 96% statement coverage (như trong dashboard ở chương 9) vẫn có thể ẩn giấu một nhánh nghiệp vụ quan trọng chưa từng chạy, như nhánh giảm giá cuối tháng cho khách VIP.",
        "Statement coverage's strength is that it's simple, easy to understand, and easy to report to management. But its fatal weakness: it does NOT distinguish between the cases inside a single condition. The line if(soPhut <= goiCuoc.phutMienPhi) only needs to run ONCE, whether the true or false branch fires, to count as 'covered' — the if-line itself doesn't require both possibilities to be tried. This is exactly why a module with 96% statement coverage (as in the dashboard in chapter 9) can still hide a critical business branch that never ran, like the end-of-month VIP discount branch.",
        "ステートメントカバレッジの強みは、シンプルで理解しやすく、管理層への報告もしやすいことです。しかし致命的な弱点があります：同じ条件内のケースを区別しません。if(soPhut <= goiCuoc.phutMienPhi)という行は、true側でもfalse側でも一度実行されれば『カバー済み』とみなされ、両方の可能性が試されることを要求しません。これこそ、96%のステートメントカバレッジを達成したモジュール（第9章のダッシュボード参照）が、月末のVIP割引分岐のような重要な業務分岐を一度も実行していなくても隠せてしまう理由です。"),
      DEF("Statement Coverage", "tỉ lệ phần trăm DÒNG LỆNH trong mã nguồn đã được thực thi ít nhất một lần bởi bộ test.",
        "the percentage of SOURCE-CODE LINES executed at least once by the test suite.",
        "テストスイートによって少なくとも一度実行されたソースコードの行の割合。"),
    ] },
  { heading: { vi: "3. Branch/Decision coverage — nhánh rẽ nào đã được đi qua", en: "3. Branch/decision coverage — which branches were taken", ja: "3. ブランチ（分岐）カバレッジ — どの分岐が通過したか" },
    blocks: [
      P("Branch coverage (còn gọi decision coverage) khắt khe hơn statement coverage một bậc: mỗi ĐIỂM RẼ NHÁNH (if, else, switch-case, vòng lặp có điều kiện...) phải được đi qua ở CẢ HAI khả năng — đúng và sai — chứ không chỉ một trong hai. Với if(soPhut <= goiCuoc.phutMienPhi), branch coverage đòi hỏi ít nhất một ca cho nhánh true (gọi trong gói) VÀ ít nhất một ca cho nhánh false (gọi vượt gói). Với if(laKhachVIP && ngayTrongThang >= 25), branch coverage đòi hỏi cả nhánh true (được giảm giá) và nhánh false (không được giảm giá) đều từng chạy — đây chính là nhánh dễ bị bỏ sót nhất trong thực tế vì nó chỉ đúng vào cuối tháng, một khung thời gian hẹp mà đội test hay quên chủ động mô phỏng.",
        "Branch coverage (also called decision coverage) is one notch stricter than statement coverage: every BRANCH POINT (if, else, switch-case, conditional loop...) must be taken on BOTH possibilities — true and false — not just one. For if(soPhut <= goiCuoc.phutMienPhi), branch coverage demands at least one case for the true branch (in-plan call) AND at least one case for the false branch (over-plan call). For if(laKhachVIP && ngayTrongThang >= 25), branch coverage demands both the true branch (gets the discount) and the false branch (no discount) have run — this is exactly the branch most often missed in practice, because it's only true near month-end, a narrow window teams tend to forget to actively simulate.",
        "ブランチカバレッジ（デシジョンカバレッジとも呼ばれる）はステートメントカバレッジより一段厳しく、すべての『分岐点』（if、else、switch-case、条件付きループなど）が、片方だけでなくtrueとfalseの『両方』で通過している必要があります。if(soPhut <= goiCuoc.phutMienPhi)の場合、ブランチカバレッジはtrue側（プラン内通話）とfalse側（プラン超過通話）の少なくとも各1ケースを要求します。if(laKhachVIP && ngayTrongThang >= 25)の場合、true側（割引適用）とfalse側（割引なし）の両方が実行されている必要があります——これはまさに実務で最も見落とされやすい分岐です。月末近くにしかtrueにならない狭い時間帯であり、チームが意図的にシミュレートするのを忘れがちだからです。"),
      IMG(m_compare, "Bảng so sánh statement, branch/decision và condition coverage trên hàm tính cước", "Comparison table of statement, branch/decision and condition coverage on the billing function", "課金関数におけるステートメント・ブランチ／デシジョン・コンディションカバレッジの比較表"),
      DEF("Branch Coverage", "tỉ lệ phần trăm các NHÁNH RẼ (true/false của mỗi điều kiện if/else, switch...) đã được đi qua ít nhất một lần.",
        "the percentage of BRANCHES (the true/false side of each if/else, switch...) taken at least once.",
        "各if/else・switchなどの分岐（true/false側）が少なくとも一度通過した割合。"),
    ] },
  { heading: { vi: "4. Condition coverage — điều kiện kép & bẫy short-circuit", en: "4. Condition coverage — compound conditions & the short-circuit trap", ja: "4. 条件カバレッジ — 複合条件とショートサーキットの罠" },
    blocks: [
      P("Khi một điều kiện là biểu thức KÉP như laKhachVIP && ngayTrongThang >= 25, branch coverage chỉ quan tâm KẾT QUẢ CHUNG của cả biểu thức (true hoặc false), không quan tâm từng vế riêng lẻ. Condition coverage đi sâu hơn: mỗi ĐIỀU KIỆN CON (ở đây là laKhachVIP và ngayTrongThang >= 25) phải nhận CẢ true lẫn false ở các ca test khác nhau, độc lập với kết quả chung. Điều này quan trọng vì hai ca test có thể khiến biểu thức tổng đủ true/false (branch coverage 100%) nhưng một điều kiện con cụ thể vẫn chưa bao giờ được thử theo cả hai hướng — như bạn sẽ thấy rõ trong tình huống 2 ở chương 8.",
        "When a condition is a COMPOUND expression like laKhachVIP && ngayTrongThang >= 25, branch coverage only cares about the OVERALL RESULT of the whole expression (true or false), not each side individually. Condition coverage goes deeper: each SUB-CONDITION (here, laKhachVIP and ngayTrongThang >= 25) must take BOTH true and false across different test cases, independent of the overall result. This matters because two test cases can already make the overall expression true/false enough (100% branch coverage) while one specific sub-condition still has never been tried both ways — as you'll clearly see in situation 2 in chapter 8.",
        "laKhachVIP && ngayTrongThang >= 25のような複合式の場合、ブランチカバレッジは式全体の『総合結果』（trueまたはfalse）にしか関心がなく、各サブ条件個別には関心がありません。コンディションカバレッジはさらに踏み込みます：各『サブ条件』（ここではlaKhachVIPとngayTrongThang >= 25）が、総合結果とは独立して、異なるテストケースでtrueとfalseの両方を取る必要があります。これが重要なのは、2つのテストケースだけで式全体のtrue/falseが十分になっても（ブランチカバレッジ100%）、ある特定のサブ条件はまだ両方の方向で一度も試されていないことがあるからです——第8章のシーン2で明確に示します。"),
      P("Có một bẫy riêng cần tester nhớ: hầu hết ngôn ngữ lập trình (JavaScript, Java, Python...) dùng SHORT-CIRCUIT EVALUATION cho toán tử &&. Nghĩa là nếu vế trái (laKhachVIP) đã là false, ngôn ngữ sẽ KHÔNG BAO GIỜ đánh giá vế phải (ngayTrongThang >= 25) nữa — vế phải bị 'bỏ qua' hoàn toàn về mặt thực thi. Vì vậy một ca test với laKhachVIP=false không hề cung cấp bất kỳ thông tin gì về việc điều kiện ngày tháng hoạt động đúng hay sai; muốn thực sự thử vế phải, bắt buộc phải có ca với laKhachVIP=true. Hiểu rõ short-circuit giúp tester không nhầm lẫn 'đã chạy qua dòng' với 'đã thực sự đánh giá điều kiện'.",
        "There's a specific trap testers must remember: most programming languages (JavaScript, Java, Python...) use SHORT-CIRCUIT EVALUATION for the && operator. That means if the left side (laKhachVIP) is already false, the language will NEVER evaluate the right side (ngayTrongThang >= 25) at all — the right side is completely 'skipped' at execution. So a test case with laKhachVIP=false provides zero information about whether the date condition behaves correctly; to actually exercise the right side, you must have a case with laKhachVIP=true. Understanding short-circuiting keeps testers from confusing 'the line ran' with 'the condition was actually evaluated'.",
        "テスターが覚えておくべき特有の罠があります：ほとんどのプログラミング言語（JavaScript、Java、Pythonなど）は&&演算子に『ショートサーキット評価』を使います。つまり左辺（laKhachVIP）が既にfalseであれば、言語は右辺（ngayTrongThang >= 25）を『決して』評価しません——右辺は実行上完全に『スキップ』されます。そのため、laKhachVIP=falseのテストケースは日付条件が正しく動作するかについて何の情報も与えません。右辺を実際に検証するには、laKhachVIP=trueのケースが必須です。ショートサーキットを理解することで、テスターは『その行が実行された』ことと『条件が実際に評価された』ことを混同しなくなります。"),
      DEF("Condition Coverage", "tỉ lệ phần trăm các ĐIỀU KIỆN CON bên trong một biểu thức logic (vd A && B) đã nhận cả giá trị true lẫn false, độc lập với kết quả chung của biểu thức.",
        "the percentage of individual sub-CONDITIONS inside a logical expression (e.g. A && B) that have taken both true and false, independent of the expression's overall result.",
        "論理式（例：A && B）内の各サブ条件が、式全体の結果とは独立に、trueとfalseの両方を取った割合。"),
    ] },
  { heading: { vi: "5. Thực hành: đọc báo cáo coverage để bổ sung ca kiểm thử", en: "5. Hands-on: reading a coverage report to add missing test cases", ja: "5. 実践：カバレッジレポートを読んでテストケースを補う" },
    blocks: [
      P("Bạn không cần biết viết unit test để dùng được báo cáo coverage — bạn chỉ cần biết đọc đúng thứ tự ưu tiên. Quy trình dưới đây giúp bạn biến một con số phần trăm trừu tượng thành các ca kiểm thử cụ thể, nhắm đúng lỗ hổng nghiệp vụ thay vì viết ca ngẫu nhiên cho 'đẹp báo cáo'.",
        "You don't need to know how to write unit tests to use a coverage report — you just need to read it in the right order of priority. The process below turns an abstract percentage into concrete test cases that target the real business gap, instead of writing random cases just to 'look good' on the report.",
        "カバレッジレポートを活用するのにユニットテストの書き方を知る必要はありません——正しい優先順位で読めれば十分です。以下の手順は、抽象的なパーセンテージを、レポートを『きれいに見せる』ためのランダムなケースではなく、実際の業務上の穴を狙った具体的なテストケースに変換する助けになります。"),
      STEP(1, "Mở báo cáo coverage của build mới nhất (Jacoco/Istanbul/SonarQube...), lọc theo module billing-service, tìm đúng file/hàm chứa logic tính tiền cần kiểm tra kỹ.", "Open the latest build's coverage report (Jacoco/Istanbul/SonarQube...), filter by the billing-service module, and locate the exact file/function containing the money logic that needs close scrutiny.", "最新ビルドのカバレッジレポート（Jacoco/Istanbul/SonarQubeなど）を開き、billing-serviceモジュールで絞り込み、精査すべき金額ロジックを含む正確なファイル・関数を見つける。"),
      STEP(2, "Ưu tiên nhìn cột Branch % và Condition % TRƯỚC cột Statement/Line %, vì statement cao rất dễ gây ảo tưởng an toàn trong khi branch/condition mới phản ánh đúng số tổ hợp logic đã được thử.", "Prioritize looking at the Branch % and Condition % columns BEFORE Statement/Line %, because a high statement number easily creates a false sense of safety while branch/condition reflect the actual number of logic combinations tried.", "Statement/Line %の列より先に、Branch %とCondition %の列を優先的に見る。ステートメントの数値が高いと誤った安心感を生みやすい一方、ブランチ／コンディションこそ実際に試されたロジックの組み合わせ数を反映するから。"),
      STEP(3, "Với mỗi nhánh/điều kiện tô đỏ hoặc vàng (chưa phủ đủ), xác định CHÍNH XÁC giá trị đầu vào nào khiến điều kiện đó nhận true hoặc false — như TC4 (VIP + ngày ≥ 25) trong bảng dưới — rồi thiết kế ca kiểm thử tương ứng.", "For each red or yellow (under-covered) branch/condition, determine EXACTLY which input value makes that condition true or false — like TC4 (VIP + day ≥ 25) in the table below — then design the matching test case.", "赤または黄色（カバレッジ不足）の分岐・条件ごとに、その条件をtrueまたはfalseにする『正確な』入力値——下表のTC4（VIP＋日≥25）のような——を特定し、対応するテストケースを設計する。"),
      STEP(4, "Chạy lại ca mới, tái sinh báo cáo coverage, xác nhận nhánh đã chuyển sang phủ (xanh) — nhưng đồng thời tự kiểm tra KẾT QUẢ TRẢ VỀ có đúng nghiệp vụ không, vì coverage xanh không tự động nghĩa là số tiền tính ra là đúng.", "Re-run the new case, regenerate the coverage report, confirm the branch turned green — but also personally verify the RETURNED RESULT is business-correct, because a green branch doesn't automatically mean the computed amount is right.", "新しいケースを再実行し、カバレッジレポートを再生成して分岐が緑（カバー済み）に変わったことを確認する——ただし同時に、返された『結果』が業務的に正しいかも自分で検証すること。緑になったからといって計算された金額が正しいとは限らないから。"),
      IMG(m_branch_cases, "4 ca kiểm thử cụ thể được thiết kế để phủ từng nhánh còn thiếu của tinhCuocGoi", "4 concrete test cases designed to cover each still-missing branch of tinhCuocGoi", "tinhCuocGoiの未カバーの各分岐を埋めるために設計された4つの具体的テストケース"),
      TRY("Mở báo cáo coverage của một tính năng liên quan tới tiền trong hệ thống bạn đang test, tìm nhánh có % thấp nhất và tự đề xuất 1 ca kiểm thử cụ thể để phủ nó.", "Open the coverage report of a money-related feature in a system you're testing, find the branch with the lowest %, and propose one concrete test case to cover it.", "テスト対象システムの金額関連機能のカバレッジレポートを開き、最も低い%の分岐を見つけ、それをカバーする具体的なテストケースを1つ自分で提案してみよう。"),
    ] },
  { heading: { vi: "6. Kiểm thử luồng dữ liệu (Data Flow Testing): define-use là gì", en: "6. Data flow testing: what define-use means", ja: "6. データフローテスト：定義-使用（define-use）とは" },
    blocks: [
      P("Statement và branch/condition coverage đều nhìn vào CẤU TRÚC ĐIỀU KHIỂN của chương trình — dòng nào chạy, nhánh nào rẽ. Data flow testing (kiểm thử luồng dữ liệu) đổi góc nhìn: nó theo dõi VÒNG ĐỜI của từng BIẾN cụ thể. Mỗi lần một biến được gán giá trị, đó là một điểm DEFINE. Mỗi lần biến đó được đọc để tính toán, so sánh hay trả về, đó là một điểm USE. Một cặp define-use nối liền nhau tạo thành một DU-PATH — và mục tiêu của data flow testing là đảm bảo mọi DU-path quan trọng đều thực sự được thực thi ít nhất một lần trong bộ kiểm thử.",
        "Statement and branch/condition coverage both look at the program's CONTROL STRUCTURE — which line ran, which branch was taken. Data flow testing shifts the perspective: it tracks the LIFECYCLE of each specific VARIABLE. Every time a variable is assigned a value, that's a DEFINE point. Every time that variable is read for a calculation, comparison, or return, that's a USE point. A connected define-use pair forms a DU-PATH — and data flow testing's goal is to ensure every important DU-path is actually executed at least once by the test suite.",
        "ステートメントカバレッジとブランチ／コンディションカバレッジはどちらもプログラムの『制御構造』——どの行が実行され、どの分岐が通ったか——を見ます。データフローテストは視点を変え、特定の『変数』のライフサイクルを追跡します。変数に値が代入されるたびに、それは『定義（define）』ポイントです。その変数が計算・比較・戻り値のために読み取られるたびに、それは『使用（use）』ポイントです。つながった定義-使用のペアは『DUパス』を形成し、データフローテストの目標は、重要なすべてのDUパスがテストスイートによって少なくとも一度実際に実行されることを確認することです。"),
      P("Trong hàm tinhCuocGoi(), biến 'cuoc' được định nghĩa lại tới BA lần: lần đầu khởi tạo bằng 0, lần hai (nếu vượt gói) tính lại theo đơn giá, lần ba (nếu là VIP cuối tháng) nhân với 0.8 để giảm giá — và mỗi lần định nghĩa lại cũng đồng thời là một điểm USE vì phải đọc giá trị cũ để tính giá trị mới. Sơ đồ dưới đây vẽ rõ các DU-path có thể có của biến 'cuoc': đường đi từ DEFINE #1 hoặc DEFINE #2, qua predicate điều kiện kép, tới USE+DEFINE #3, rồi tới USE cuối cùng ở câu lệnh return. Đường đi tô đỏ nét đứt chính là DU-path CHƯA từng được thực thi trước khi lỗi TC-8823 được phát hiện — một khoảng trống mà chỉ tư duy data flow mới lộ ra rõ ràng, thay vì chỉ nhìn '% branch coverage' chung chung.",
        "In tinhCuocGoi(), the variable 'cuoc' is redefined THREE times: first initialized to 0, second (if over-plan) recomputed by unit price, third (if VIP at month-end) multiplied by 0.8 for the discount — and each redefinition is simultaneously a USE point too, since the old value must be read to compute the new one. The diagram below maps out the possible DU-paths of 'cuoc': from DEFINE #1 or DEFINE #2, through the compound-condition predicate, to USE+DEFINE #3, then to the final USE at the return statement. The dashed-red path is exactly the DU-path that had NEVER been executed before the TC-8823 bug was found — a gap that only data-flow thinking exposes clearly, rather than just looking at a generic 'branch coverage %'.",
        "tinhCuocGoi()では、変数『cuoc』が『3回』再定義されます：まず0で初期化、2回目（プラン超過の場合）単価で再計算、3回目（月末のVIPの場合）0.8を掛けて割引——そして各再定義は、新しい値を計算するために古い値を読み取る必要があるため、同時に使用ポイントでもあります。以下の図は『cuoc』の可能なDUパスを示しています：DEFINE#1またはDEFINE#2から、複合条件のpredicateを通り、USE+DEFINE#3へ、そして最終的にreturn文でのUSEへ。赤い破線の経路こそ、TC-8823のバグが見つかる前に一度も実行されなかったDUパスです——一般的な『ブランチカバレッジ%』を見るだけでは見えず、データフローの視点だけが明確にあぶり出す穴です。"),
      IMG(m_dataflow, "Sơ đồ đường đi Define → Use của biến 'cuoc' qua các nhánh của tinhCuocGoi", "Diagram of the Define → Use path of variable 'cuoc' across tinhCuocGoi's branches", "tinhCuocGoiの分岐をまたぐ変数『cuoc』のDefine→Use経路図"),
      DEF("Define-Use (Data Flow Testing)", "kỹ thuật kiểm thử tập trung vào đường đi của một biến từ nơi nó được GÁN GIÁ TRỊ (define) tới nơi nó được SỬ DỤNG (use), để đảm bảo đường đi đó thực sự được thực thi ít nhất một lần.",
        "a testing technique focused on the path of a variable from where it is DEFINED (assigned) to where it is USED, ensuring that path is actually executed at least once.",
        "変数が定義（define）された箇所から使用（use）される箇所までの経路に着目し、その経路が実際に少なくとも一度実行されることを確認するテスト技法。"),
    ] },
  { heading: { vi: "7. Tình huống 1: 100% pass nhưng nhánh giảm giá cuối tháng chưa chạy", en: "7. Situation 1: 100% pass but the end-of-month discount branch never ran", ja: "7. シーン1：100%合格でも月末割引の分岐が一度も実行されていない" },
    blocks: [
      SITUATION("Đội billing chạy bộ hồi quy 40 ca kiểm thử cho tinhCuocGoi(), tất cả đều PASS, statement coverage 96%. Đội tự tin release vì 'coverage cao và mọi test xanh'.", "The billing team runs a 40-case regression suite for tinhCuocGoi(), all PASS, statement coverage at 96%. The team confidently releases because 'coverage is high and every test is green'.",
        "Sang chu kỳ cước tháng 6, hàng nghìn khách VIP gọi vượt gói vào những ngày cuối tháng bị tính cước ĐẦY ĐỦ, không được áp giảm giá 20% như chính sách — vì không một ca nào trong 40 ca từng đặt laKhachVIP=true CÙNG LÚC với ngayTrongThang >= 25. Bộ phận chăm sóc khách hàng nhận hàng loạt khiếu nại; ticket TC-8823 được mở ở mức Critical.", "In the June billing cycle, thousands of VIP customers calling over their plan near month-end were charged the FULL amount, without the promised 20% discount — because none of the 40 cases ever set laKhachVIP=true TOGETHER WITH ngayTrongThang >= 25. Customer support gets flooded with complaints; ticket TC-8823 is opened as Critical.",
        "課金チームはtinhCuocGoi()に対して40件の回帰テストを実行し、全て合格、ステートメントカバレッジは96%。『カバレッジが高く全テストが緑』ということでチームは自信を持ってリリースする。",
        "6月の課金サイクルで、月末近くにプラン超過通話をした何千人ものVIP顧客が、規定の20%割引を受けられず全額請求される——40件のどのケースもlaKhachVIP=trueとngayTrongThang >= 25を『同時に』設定していなかったからだ。カスタマーサポートには苦情が殺到し、TC-8823チケットがCriticalとして起票される。"),
      SOLVE("Bổ sung ngay ca TC4 (laKhachVIP=true, ngayTrongThang=27) vào bộ hồi quy để buộc nhánh giảm giá phải chạy; đồng thời thêm cảnh báo tự động: mọi pull request đụng tới logic tính tiền phải đạt tối thiểu 100% branch coverage (không chỉ statement coverage) trước khi được merge.", "Immediately add test case TC4 (laKhachVIP=true, ngayTrongThang=27) to the regression suite to force the discount branch to run; also add an automated gate: any pull request touching money logic must reach at least 100% branch coverage (not just statement coverage) before it can be merged.", "回帰テストスイートにすぐにTC4（laKhachVIP=true、ngayTrongThang=27）を追加し割引分岐を強制的に実行させる。同時に、金額ロジックに触れるプルリクエストはマージ前に少なくとも100%のブランチカバレッジ（ステートメントカバレッジだけでなく）を達成することを義務付ける自動ゲートを追加する。"),
      P("Bài học lớn nhất ở đây: '96% statement coverage, mọi test pass' hoàn toàn không nói lên gì về việc nhánh nghiệp vụ QUAN TRỌNG NHẤT — nhánh liên quan trực tiếp tới tiền của khách VIP — đã từng chạy hay chưa. Statement coverage chỉ cần một nhánh của mỗi if được chạm, trong khi bug thật lại nằm đúng ở nhánh CÒN LẠI. Đây là lý do tester ở các hệ thống liên quan tới tiền nên luôn đòi hỏi branch coverage (và với điều kiện kép, cả condition coverage) làm ngưỡng tối thiểu, thay vì chỉ nhìn con số statement coverage tổng quát.",
        "The biggest lesson here: '96% statement coverage, every test passing' says absolutely nothing about whether the MOST IMPORTANT business branch — the one directly touching a VIP customer's money — had ever run. Statement coverage only needs one branch of each if to be touched, while the real bug sat exactly in the OTHER branch. This is why testers on money-related systems should always demand branch coverage (and, for compound conditions, condition coverage too) as a minimum threshold, instead of only looking at the general statement coverage number.",
        "ここでの最大の教訓：『ステートメントカバレッジ96%、全テスト合格』は、最も重要な業務分岐——VIP顧客の金額に直接関わる分岐——が一度でも実行されたかについて何も語りません。ステートメントカバレッジは各if文の片方の分岐が触れられれば十分ですが、実際のバグはまさに『もう片方』の分岐にありました。これが、金額関連システムのテスターが、一般的なステートメントカバレッジの数値だけを見るのではなく、常にブランチカバレッジ（そして複合条件についてはコンディションカバレッジも）を最低基準として要求すべき理由です。"),
      IMG(m_jira, "Ticket lỗi TC-8823: nhánh giảm giá cuối tháng chưa từng được test gây sai cước hàng loạt", "Bug ticket TC-8823: the never-tested end-of-month discount branch causes mass billing errors", "TC-8823バグチケット：一度もテストされていなかった月末割引分岐が大量の課金エラーを引き起こす"),
      RECAP(["'Mọi test pass' KHÔNG đồng nghĩa mọi nhánh nghiệp vụ quan trọng đã chạy", "Với logic tính tiền, đòi hỏi branch coverage làm ngưỡng tối thiểu, không chỉ statement coverage"],
        ["'Every test passing' does NOT mean every important business branch has run", "For money logic, demand branch coverage as the minimum threshold, not just statement coverage"],
        ["『全テスト合格』は重要な業務分岐が全て実行されたことを意味しない", "金額ロジックにはステートメントカバレッジだけでなくブランチカバレッジを最低基準として要求する"]),
    ] },
  { heading: { vi: "8. Tình huống 2: điều kiện kép chỉ phủ 1 vế", en: "8. Situation 2: a compound condition covered on only one side", ja: "8. シーン2：複合条件が片方しかカバーされていない" },
    blocks: [
      SITUATION("Sau khi vá lỗi TC-8823, đội bổ sung đúng 2 ca cho if(laKhachVIP && ngayTrongThang >= 25): TC-A (VIP=true, ngày=27 → biểu thức TRUE) và TC-B (VIP=false, ngày=27 → biểu thức FALSE). Báo cáo coverage báo nhánh IF#2 đạt 100% decision/branch coverage — đội yên tâm đóng ticket.", "After fixing TC-8823, the team adds exactly 2 cases for if(laKhachVIP && ngayTrongThang >= 25): TC-A (VIP=true, day=27 → expression TRUE) and TC-B (VIP=false, day=27 → expression FALSE). The coverage report shows IF#2 at 100% decision/branch coverage — the team confidently closes the ticket.",
        "Một tuần sau, một khách VIP kiểm tra hoá đơn TẠM TÍNH vào giữa tháng (ngày 10) và gặp lỗi hiển thị sai số tiền ước tính giảm giá — vì điều kiện 'ngayTrongThang >= 25' KHÔNG BAO GIỜ được đánh giá là FALSE khi laKhachVIP=true trong toàn bộ bộ test (do short-circuit, ở TC-B nó thậm chí chưa từng được tính toán). Tổ hợp 'khách VIP + chưa tới ngày 25' — một tình huống rất phổ biến trong thực tế — hoàn toàn chưa từng được thử.", "A week later, a VIP customer checks their MID-MONTH estimated bill (on day 10) and hits a bug showing a wrong estimated discount amount — because the condition 'ngayTrongThang >= 25' was NEVER evaluated as FALSE while laKhachVIP=true across the entire test suite (due to short-circuiting, in TC-B it wasn't even computed at all). The combination 'VIP customer + before day 25' — a very common real-world situation — had never been tried at all.",
        "TC-8823の修正後、チームはif(laKhachVIP && ngayTrongThang >= 25)にちょうど2つのケースを追加した：TC-A（VIP=true、日=27→式がTRUE）とTC-B（VIP=false、日=27→式がFALSE）。カバレッジレポートはIF#2がデシジョン／ブランチカバレッジ100%であることを示す——チームは安心してチケットをクローズする。",
        "1週間後、あるVIP顧客が月中（10日）に見積もり請求書を確認したところ、割引の見積もり額が誤って表示されるバグに遭遇する——テストスイート全体を通じて、laKhachVIP=trueのとき『ngayTrongThang >= 25』が一度もFALSEとして評価されていなかったからだ（ショートサーキットにより、TC-Bではそもそも計算すらされていなかった）。『VIP顧客＋25日より前』という、実務では非常によくある組み合わせが、まったく試されていなかった。"),
      SOLVE("Thiết kế thêm ca TC-C: laKhachVIP=true, ngayTrongThang=10 (nhỏ hơn 25) — buộc điều kiện 'ngayTrongThang >= 25' phải được đánh giá là FALSE trong khi laKhachVIP vẫn là true, để đạt condition coverage đầy đủ (mỗi điều kiện con có cả true/false, độc lập với vế còn lại). Đồng thời cập nhật checklist review: với mọi biểu thức && hoặc ||, phải liệt kê rõ ma trận từng điều kiện con × true/false, không chỉ dựa vào % branch coverage tổng.", "Design an additional TC-C case: laKhachVIP=true, ngayTrongThang=10 (less than 25) — forcing the condition 'ngayTrongThang >= 25' to be evaluated as FALSE while laKhachVIP stays true, achieving full condition coverage (each sub-condition gets both true/false, independent of the other side). Also update the review checklist: for every && or || expression, explicitly list the matrix of each sub-condition × true/false, not just rely on the overall branch coverage %.", "追加でTC-Cケースを設計する：laKhachVIP=true、ngayTrongThang=10（25未満）——laKhachVIPがtrueのままで『ngayTrongThang >= 25』をFALSEとして評価させ、完全なコンディションカバレッジ（各サブ条件が、もう片方から独立してtrue/falseの両方を取る）を達成する。同時にレビューチェックリストを更新する：あらゆる&&や||の式について、全体のブランチカバレッジ%だけに頼らず、各サブ条件×true/falseの行列を明示的にリストアップすること。"),
      P("Đây là ví dụ kinh điển cho thấy branch/decision coverage 100% vẫn có thể che giấu lỗ hổng nếu điều kiện là biểu thức kép: chỉ cần biểu thức TỔNG ra đủ true và false là branch coverage đã 'hài lòng', trong khi một điều kiện con quan trọng — kết hợp với short-circuit evaluation — có thể hoàn toàn chưa từng được thử độc lập. Với các biểu thức kép liên quan tới tiền hoặc thời điểm (ngày, giờ, ngưỡng số lượng), tester nên luôn tự hỏi: 'từng vế của biểu thức này đã được thử CẢ true lẫn false chưa, hay tôi chỉ mới thử được kết quả chung?' trước khi coi một nhánh là đã kiểm thử đầy đủ.",
        "This is a textbook example showing that 100% branch/decision coverage can still hide a gap when a condition is compound: as long as the OVERALL expression yields enough true and false, branch coverage is already 'satisfied', while one critical sub-condition — combined with short-circuit evaluation — may have never been tried independently at all. For compound expressions involving money or timing (dates, hours, quantity thresholds), testers should always ask: 'has each side of this expression been tried BOTH true and false, or have I only tried the overall result?' before considering a branch fully tested.",
        "これは、条件が複合式である場合に、100%のブランチ／デシジョンカバレッジでも穴を隠せることを示す典型例です：式『全体』が十分なtrueとfalseを出せばブランチカバレッジは既に『満足』しますが、重要なサブ条件の1つは——ショートサーキット評価と相まって——独立して一度も試されていない可能性があります。金額やタイミング（日付、時刻、数量の閾値）に関わる複合式については、テスターは分岐が十分にテストされたと見なす前に、常に『この式の各辺は本当にtrueとfalseの両方が試されたか、それとも全体の結果だけを試したのか』を自問すべきです。"),
    ] },
  { heading: { vi: "9. Ngộ nhận '100% pass = an toàn' & giới hạn của coverage", en: "9. The '100% pass = safe' myth & the limits of coverage", ja: "9. 『100%合格＝安全』という誤解とカバレッジの限界" },
    blocks: [
      P("Coverage — dù là statement, branch hay condition — đo việc mã nguồn có được 'CHẠM TỚI' hay không, KHÔNG đo việc kết quả trả về có ĐÚNG NGHIỆP VỤ hay không. Một ca test có thể đi qua đúng nhánh giảm giá (branch xanh) nhưng assertion chỉ kiểm tra 'hàm không ném lỗi 500', không kiểm tra số tiền cuối cùng có đúng 80% hay không — coverage 100% nhưng oracle (tiêu chuẩn đúng/sai) lại quá yếu để phát hiện sai số. Đây là lý do tối quan trọng: coverage cao là điều kiện CẦN, nhưng hoàn toàn không phải điều kiện ĐỦ, để khẳng định một module tính tiền là an toàn.",
        "Coverage — whether statement, branch, or condition — measures whether code was 'TOUCHED', NOT whether the returned result is BUSINESS-CORRECT. A test case can go through the exact discount branch (green branch) yet its assertion only checks 'the function doesn't throw a 500 error', not whether the final amount is exactly 80% — 100% coverage, but an oracle (pass/fail standard) too weak to catch a wrong figure. This is a critically important point: high coverage is a NECESSARY condition, but absolutely not a SUFFICIENT one, to declare a billing module safe.",
        "カバレッジは——ステートメントであれブランチであれコンディションであれ——コードが『触れられた』かどうかを測るのであり、返された結果が『業務的に正しい』かどうかは測りません。あるテストケースが正確に割引分岐（緑の分岐）を通っても、そのアサーションが『関数が500エラーを投げないこと』しか確認せず、最終金額が正確に80%になっているかを確認していないことがあります——カバレッジは100%でも、オラクル（合否の基準）が誤りを検出するには弱すぎるのです。これは極めて重要な点です：高いカバレッジは料金計算モジュールが安全だと断言するための『必要』条件ですが、決して『十分』条件ではありません。"),
      P("Ngoài ra, coverage cũng không tự động đo GIÁ TRỊ BIÊN bên trong mỗi nhánh đã phủ. Nhánh giảm giá có thể được test với ngày=27 nhưng chưa từng thử ngày=25 (đúng biên dưới), ngày=31 (biên trên của tháng 31 ngày, khác tháng 2 chỉ 28 ngày), hay soPhut cực lớn có thể gây tràn số khi nhân với đơn giá. Coverage tool không biết và không quan tâm tới những giá trị biên này — nó chỉ đếm dòng/nhánh/điều kiện đã chạy. Vì vậy công thức thực dụng cho tester là: dùng coverage report để tìm NƠI CÒN THIẾU CA, sau đó dùng tư duy phân vùng tương đương/giá trị biên và tư duy rủi ro để quyết định CA CỤ THỂ nào cần thêm — coverage là bản đồ, không phải đích đến.",
        "Beyond that, coverage also doesn't automatically measure BOUNDARY VALUES inside each covered branch. The discount branch might be tested with day=27 but never tried day=25 (the exact lower boundary), day=31 (the upper boundary of a 31-day month, unlike February's 28), or an extremely large soPhut that could overflow when multiplied by the unit price. Coverage tools don't know and don't care about these boundary values — they only count lines/branches/conditions that ran. So the practical formula for a tester is: use the coverage report to find WHERE CASES ARE MISSING, then use equivalence-partitioning/boundary-value thinking and risk-based thinking to decide WHICH SPECIFIC CASE to add — coverage is the map, not the destination.",
        "さらに、カバレッジはカバーされた各分岐内の『境界値』を自動的に測定するわけでもありません。割引分岐は日=27でテストされているかもしれませんが、日=25（正確な下限境界）、日=31（28日しかない2月とは異なる31日の月の上限境界）、あるいは単価と掛け合わせるとオーバーフローする可能性のある極端に大きなsoPhutは一度も試されていないかもしれません。カバレッジツールはこれらの境界値を知らず、気にもしません——実行された行・分岐・条件を数えるだけです。したがってテスターにとって実用的な公式はこうです：カバレッジレポートを使って『ケースが不足している場所』を見つけ、次に同値分割／境界値分析の思考とリスクベースの思考を使って『追加すべき具体的なケース』を決める——カバレッジは地図であり、目的地ではありません。"),
      IMG(m_dashboard, "Dashboard độ phủ mã module tính cước: statement cao nhưng condition thấp, và bug Critical đã lọt qua", "Coverage dashboard for the billing module: high statement but low condition, with a Critical bug that slipped through", "課金モジュールのカバレッジダッシュボード：ステートメントは高いがコンディションは低く、Criticalバグが1件すり抜けている"),
      PITFALL("Xem % coverage như một KPI để 'đạt' rồi dừng lại, quên xem lại từng ca cụ thể có assertion đúng số tiền/đúng nghiệp vụ hay không — coverage xanh không đồng nghĩa oracle đủ mạnh.", "Treating coverage % as a KPI to 'hit' and then stopping, forgetting to review whether each specific case actually asserts the correct amount/business result — a green branch doesn't mean the oracle is strong enough.", "カバレッジ%を『達成すべきKPI』として扱い、そこで止まってしまい、各具体的ケースが実際に正しい金額・業務結果をアサートしているかを見直すのを忘れること——分岐が緑であることはオラクルが十分に厳密であることを意味しない。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Bảng quyết định (Decision Table) cho tester", "Decision tables for testers", "bang-quyet-dinh-decision-table-cho-tester", "テスターのためのデシジョンテーブル"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための結合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Qua module tính cước viễn thông, bạn đã học cách phân biệt statement, branch/decision và condition coverage — ba mức đo khác nhau mà mức cao hơn không tự động kéo theo mức thấp hơn được phủ đủ; cách đọc báo cáo coverage theo đúng thứ tự ưu tiên (branch/condition trước statement) để bổ sung ca kiểm thử nhắm đúng lỗ hổng; khái niệm kiểm thử luồng dữ liệu qua cặp define-use và DU-path; và hai tình huống thật cho thấy '100% test pass' hay thậm chí '100% branch coverage' vẫn có thể che giấu lỗi tính cước nghiêm trọng nếu thiếu tư duy điều kiện kép và tư duy rủi ro.",
        "Through the telecom billing module, you learned to tell statement, branch/decision, and condition coverage apart — three different metrics where a higher one doesn't automatically mean a lower one is fully covered; how to read a coverage report in the right priority order (branch/condition before statement) to add test cases targeting the real gap; the concept of data flow testing through define-use pairs and DU-paths; and two real situations showing that '100% tests passing' or even '100% branch coverage' can still hide a serious billing bug without compound-condition and risk-based thinking.",
        "通信料金計算モジュールを通じて、ステートメント・ブランチ／デシジョン・コンディションカバレッジの区別——上位の指標が高くても下位が十分にカバーされているとは限らない3つの異なる指標——を学びました。正しい優先順位（ステートメントより先にブランチ／コンディション）でカバレッジレポートを読み、実際の穴を狙ったテストケースを追加する方法、define-useペアとDUパスによるデータフローテストの概念、そして『テスト100%合格』や『ブランチカバレッジ100%』でさえ、複合条件とリスクベースの思考がなければ深刻な課金バグを隠し得ることを示す2つの実例を学びました。"),
      P("Chặng tiếp theo, bạn nên kết hợp coverage với các kỹ thuật thiết kế ca kiểm thử có cấu trúc như bảng quyết định (decision table) và phân vùng tương đương/giá trị biên để không chỉ 'phủ đủ nhánh' mà còn 'chọn đúng giá trị' trong từng nhánh. Nếu muốn học bài bản từ nền tảng manual tới automation, đọc coverage report thực chiến và làm việc trên các dự án dạng doanh nghiệp thật, một khoá học Tester chuyên nghiệp sẽ giúp bạn rút ngắn thời gian tự mò mẫm rất nhiều.",
        "Next, you should combine coverage with structured test-design techniques like decision tables and equivalence partitioning/boundary values, so you not only 'cover enough branches' but also 'pick the right values' inside each branch. If you want to learn properly from manual fundamentals to automation, read real-world coverage reports, and work on enterprise-style projects, a professional Tester course will save you a lot of time compared to figuring it all out alone.",
        "次は、カバレッジをデシジョンテーブルや同値分割／境界値分析といった構造化されたテスト設計技法と組み合わせ、『十分な分岐をカバーする』だけでなく各分岐内で『正しい値を選ぶ』ことも目指しましょう。マニュアルの基礎からオートメーションまで体系的に学び、実務のカバレッジレポートを読み、エンタープライズ規模の案件に取り組みたいなら、プロ向けのテスターコースが独学で試行錯誤する時間を大きく短縮してくれます。"),
      CTA(course),
    ] },
];

const COVERAGE_DOC = makeDoc({
  slug: "do-phu-ma-va-kiem-thu-luong-du-lieu-cho-tester",
  domain: "telecom",
  primaryKeyword: "độ phủ mã",
  keywords: ["độ phủ mã", "code coverage", "branch coverage", "condition coverage", "kiểm thử luồng dữ liệu", "data flow testing", "define-use", "statement coverage"],
  coverLabel: "NÂNG CAO · COVERAGE · VIỄN THÔNG",
  crumb: "Độ phủ mã & Kiểm thử luồng dữ liệu (Coverage & Data Flow)",
  metaTitle: {
    vi: "Độ phủ mã & luồng dữ liệu cho tester viễn thông",
    en: "Code coverage & data flow testing for telecom testers",
    ja: "テスターのためのコードカバレッジとデータフロー",
  },
  metaDescription: {
    vi: "Độ phủ mã cho tester nâng cao: statement, branch, condition coverage khác nhau ra sao; đọc báo cáo và kiểm thử luồng dữ liệu qua module tính cước viễn thông.",
    en: "Advanced code coverage for testers: telling statement, branch and condition apart, reading reports correctly, and define-use data flow testing through a telecom billing module, with diagrams and a quiz.",
    ja: "上級テスター向けコードカバレッジ：ステートメント・ブランチ・コンディションの区別、レポートの正しい読み方、通信料金計算モジュールを例にしたdefine-useデータフローテストを図解とクイズ付きで解説。",
  },
  title: {
    vi: "Độ phủ mã & kiểm thử luồng dữ liệu cho tester: đọc coverage đúng cách qua module tính cước viễn thông (có trắc nghiệm)",
    en: "Code coverage & data flow testing for testers: reading coverage right through a telecom billing module (with quiz)",
    ja: "テスターのためのコードカバレッジとデータフローテスト：通信料金計算モジュールで学ぶ正しい読み方（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao cho tester: phân biệt statement/branch/condition coverage, cách đọc báo cáo coverage để bổ sung đúng ca kiểm thử, khái niệm kiểm thử luồng dữ liệu (define-use), và vì sao '100% test pass' không đồng nghĩa an toàn — minh hoạ qua module tính cước cuộc gọi/data của nhà mạng, có sơ đồ, ticket lỗi thật, FAQ và trắc nghiệm 5 câu.",
    en: "An advanced article for testers: telling apart statement/branch/condition coverage, how to read a coverage report to add the right test cases, the data flow testing concept (define-use), and why '100% tests passing' doesn't mean safety — illustrated through a telecom call/data billing module, with diagrams, a real bug ticket, FAQ and a 5-question quiz.",
    ja: "テスター向けの上級記事：ステートメント／ブランチ／コンディションカバレッジの違い、カバレッジレポートを読んで適切なテストケースを補う方法、データフローテスト（define-use）の概念、そして『テスト100%合格』が安全を意味しない理由を、通信キャリアの通話・データ課金モジュールを例に図解。実際のバグチケット、FAQ、5問クイズ付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách đọc báo cáo coverage để bổ sung ca kiểm thử", steps: [
    { name: "Mở báo cáo và lọc theo module cần kiểm tra", text: "Tìm file/hàm liên quan tới nghiệp vụ tiền bạc cần kiểm tra kỹ." },
    { name: "Ưu tiên xem branch/condition % trước statement %", text: "Vì statement cao dễ gây ảo tưởng an toàn." },
    { name: "Thiết kế ca kiểm thử nhắm đúng nhánh/điều kiện chưa phủ", text: "Xác định input cụ thể để đưa từng điều kiện con vào cả true và false." },
  ] },
  pages,
});

export const MA_COVERAGE_01 = [COVERAGE_DOC];
