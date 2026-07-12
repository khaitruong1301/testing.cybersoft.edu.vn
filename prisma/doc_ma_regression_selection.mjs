// doc_ma_regression_selection.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử hồi quy chọn lọc & ưu tiên ca (Regression Test Selection & Prioritization)
// trên nền tảng SaaS quản lý dự án đa tenant ProjectFlow: chọn tập hồi quy tối ưu khi
// không đủ thời gian — theo vùng ảnh hưởng thay đổi, theo rủi ro, theo lịch sử lỗi;
// kỹ thuật giảm & ưu tiên test suite; xây bộ smoke/regression phân tầng.
// Song ngữ vi/en/ja (ja≠en), 12 chương, nhiều mockup, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, chiến lược kiểm thử nâng cao, công cụ & dự án thực chiến.",
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
    tags: tags("congnghe", "saas", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình kế hoạch hồi quy trước release của ProjectFlow ──
const m_screen = browser("projectflow.io/qa/release/REL-4.18/ke-hoach-hoi-quy", [
  panel("ProjectFlow QA · Kế hoạch kiểm thử hồi quy REL-4.18", [
    field(24, 20, 330, "Tổng ca hồi quy hiện có", "1.240 ca", "normal"),
    field(372, 20, 330, "Thời gian chạy TOÀN BỘ (ước tính)", "≈ 38 giờ", "error"),
    field(24, 92, 330, "Thời gian còn lại tới release", "6 giờ", "error"),
    field(372, 92, 330, "Tập đã chọn lọc theo vùng ảnh hưởng", "96 ca (≈ 5,5 giờ)", "normal"),
    btn(24, 168, 220, "Chạy tập đã chọn lọc", "primary"),
    btn(260, 168, 180, "Lên lịch full đêm nay", "ghost"),
    annotate(368, 12, 330, 62, "KHÔNG ĐỦ THỜI GIAN nếu chạy toàn bộ"),
  ].join(""), { h: 260, accent: "#0d9488" }),
].join(""), { h: 316, title: "ProjectFlow · SaaS PM", accent: "#0d9488" });

// ── Mockup 2: bảng chọn tập hồi quy theo VÙNG ẢNH HƯỞNG thay đổi ──
const m_impact = grid("Chọn tập hồi quy theo VÙNG ẢNH HƯỞNG thay đổi (change impact analysis)", ["Thay đổi (git diff)", "Module chạm trực tiếp", "Module phụ thuộc chung", "Ca hồi quy phải chạy"], [
  ["PATCH /tasks/:id/status", "Công việc (Tasks)", "Thông báo (Notifications), Báo cáo (Reports)", "42 ca: Tasks CRUD + trigger thông báo + tổng hợp báo cáo"],
  ["Nâng cấp thư viện chung billing-core@3.2", "Thanh toán (Billing)", "Gói dịch vụ, Giới hạn dung lượng, Cổng thanh toán", "68 ca — MỌI tenant đều dùng chung billing-core"],
  ["Thêm cột is_archived vào bảng projects", "Dự án (Projects)", "Tìm kiếm, Bộ lọc, Xuất báo cáo", "24 ca: search/filter/export theo trạng thái lưu trữ"],
  ["Sửa luồng đăng nhập SSO", "Xác thực (Auth)", "Định tuyến đa tenant, Phiên đăng nhập, Phân quyền", "31 ca: đăng nhập, chuyển tenant, làm mới token"],
], { accent: "#0d9488", note: "Vùng ảnh hưởng dựng từ dependency graph + git diff, không phải đoán theo cảm tính." });

// ── Mockup 3: bảng ưu tiên ca theo RỦI RO nghiệp vụ & LỊCH SỬ LỖI ──
const m_priority = grid("Ưu tiên ca hồi quy theo RỦI RO nghiệp vụ & LỊCH SỬ LỖI (12 tháng)", ["Ca kiểm thử", "Rủi ro nghiệp vụ", "Lịch sử lỗi", "Tần suất dùng", "Điểm ưu tiên", "Thứ tự chạy"], [
  ["Tự động trừ phí định kỳ (auto-billing)", "Rất cao — mất tiền khách", "5 lỗi Critical", "Chạy mỗi ngày", "98/100", "P0 — chạy đầu tiên"],
  ["Đồng bộ trạng thái Task real-time (WebSocket)", "Cao", "3 lỗi High", "Liên tục", "82/100", "P1"],
  ["Xuất báo cáo PDF đa tenant", "Trung bình", "1 lỗi Medium", "Vài lần/tuần", "51/100", "P2"],
  ["Đổi giao diện dark mode", "Thấp", "0 lỗi 12 tháng qua", "Hiếm dùng", "12/100", "P3 — bỏ nếu hết giờ"],
], { accent: "#0d9488", highlight: 3, note: "Điểm ưu tiên = trọng số(rủi ro) × trọng số(mật độ lỗi) × trọng số(tần suất dùng)." });

// ── Mockup 4: hậu quả cắt tập hồi quy NGẪU NHIÊN so với CHỌN LỌC có căn cứ ──
const m_random_vs_selective = grid("Cắt NGẪU NHIÊN (bỏ bừa) vs CHỌN LỌC có căn cứ — cùng ngân sách 6 giờ", ["Cách chọn", "Số ca chạy được", "Cơ sở lựa chọn", "Lỗi Critical lọt production"], [
  ["Bỏ bừa cho kịp giờ", "≈ 60 ca (chọn cảm tính)", "Không có — ai rảnh test module gì thì test", "3 lỗi Critical (billing, auth)"],
  ["Chọn lọc theo impact + rủi ro + lịch sử lỗi", "96 ca (đúng ngân sách)", "Dependency graph + điểm ưu tiên rủi ro", "0 lỗi Critical lọt"],
], { accent: "#ef4444", highlight: 0, note: "Cùng thời gian, cùng gần số ca — nhưng CƠ SỞ chọn quyết định lỗi có bị lọt hay không." });

// ── Mockup 5: ticket lỗi tìm được nhờ chọn lọc theo dependency, không phải theo cảm tính ──
const m_jira = jira({
  key: "PF-5521", title: "Hotfix giới hạn ký tự Ghi chú công việc làm vỡ tính phí gói Storage Add-on",
  type: "Bug", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Thay đổi gốc", "Hotfix 1 dòng: giới hạn trường 'Ghi chú' (Task Notes) còn 2.000 ký tự, tưởng chỉ ảnh hưởng UI"],
    ["Vùng ảnh hưởng phát hiện", "Dependency graph cho thấy module Notes dùng chung hàm tính dung lượng lưu trữ (storage usage) với Billing"],
    ["Kết quả mong đợi", "Giới hạn ký tự không ảnh hưởng cách tính phí Storage Add-on"],
    ["Kết quả thực tế", "Hàm tính dung lượng đọc sai độ dài chuỗi sau khi cắt, khiến tenant bị tính phí vượt gói dù chưa vượt dung lượng thật"],
    ["Bằng chứng", "log-storage-calc.json, invoice-tenant-8842.pdf"],
  ],
});

// ── Mockup 6: sơ đồ bộ hồi quy PHÂN TẦNG smoke → core regression → full regression ──
const m_tier = moduleFlow("Kiến trúc bộ Smoke → Regression phân tầng (ProjectFlow CI)", [
  { id: "smoke", label: "Tier 0 · Smoke (8')", sub: "12 ca sống còn", x: 100, y: 70 },
  { id: "core", label: "Tier 1 · Core Regression (45')", sub: "96 ca điểm ưu tiên cao", x: 380, y: 70 },
  { id: "full", label: "Tier 2 · Full Regression (6h)", sub: "1.240 ca — chạy đêm/CI", x: 650, y: 70 },
  { id: "release", label: "Quyết định RELEASE", sub: "", x: 380, y: 220 },
], [
  { from: "smoke", to: "core", label: "pass → chạy tiếp" },
  { from: "smoke", to: "release", label: "fail → CHẶN release", bad: true },
  { from: "core", to: "release", label: "pass → đủ điều kiện release" },
  { from: "core", to: "full", label: "song song, không chặn (nightly CI)" },
], { accent: "#0d9488", h: 300 });

// ── Mockup 7: dashboard thời gian tiết kiệm & hiệu quả chọn lọc ──
const m_dash = dashboard("Hiệu quả kiểm thử hồi quy chọn lọc — Release REL-4.18 (ProjectFlow)", [
  { label: "Tổng ca toàn bộ", value: "1.240", sub: "nếu chạy retest-all", color: "#0d9488" },
  { label: "Ca đã chọn lọc chạy", value: "96", sub: "≈ 7,7% tổng số ca", color: "#0369a1" },
  { label: "Thời gian tiết kiệm", value: "32,5h", sub: "38h → 5,5h", color: "#16a34a" },
  { label: "Tỉ lệ bắt lỗi Critical", value: "94%", sub: "so với chạy full toàn bộ", color: "#e11d48" },
]);

// ── Mockup 8: kanban theo dõi tiến độ chạy các tầng hồi quy trước release ──
const m_kanban = kanban("Bảng theo dõi tiến độ chạy bộ hồi quy phân tầng (ProjectFlow · REL-4.18)", [
  { name: "Chưa chạy", cards: [
    { key: "PF-TIER2", title: "Full Regression 1.240 ca (nightly CI)", sev: "Medium" },
  ] },
  { name: "Đang chạy", cards: [
    { key: "PF-TIER1", title: "Core Regression 96 ca điểm ưu tiên cao", sev: "High" },
  ] },
  { name: "Pass", cards: [
    { key: "PF-TIER0", title: "Smoke 12 ca sống còn — PASS", sev: "Low" },
  ] },
  { name: "Fail cần fix", cards: [
    { key: "PF-5521", title: "Storage Add-on tính phí sai sau hotfix Notes", sev: "Critical" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử hồi quy chọn lọc (regression test selection) là gì?",
  "What is regression test selection?",
  "Kiểm thử hồi quy chọn lọc là việc chọn ra một TẬP CON ca kiểm thử hồi quy để chạy — thay vì chạy lại toàn bộ (retest-all) — dựa trên vùng ảnh hưởng thực tế của thay đổi (thông qua git diff, dependency graph), mức rủi ro nghiệp vụ nếu tính năng đó hỏng, và lịch sử lỗi của từng module. Mục tiêu là giữ khả năng bắt lỗi gần bằng chạy full trong khi tốn ít thời gian hơn nhiều lần.",
  "Regression test selection is choosing a SUBSET of regression cases to run — instead of rerunning the entire suite (retest-all) — based on the change's actual impact area (via git diff, a dependency graph), the business risk if that feature breaks, and each module's defect history. The goal is to keep bug-catching power close to a full run while taking far less time.",
  "選択的リグレッションテスト（regression test selection）とは？",
  "選択的リグレッションテストとは、全件再実行（retest-all）の代わりに、変更の実際の影響範囲（gitの差分や依存関係グラフから特定）、その機能が壊れた場合のビジネスリスク、各モジュールの障害履歴に基づいて、実行するリグレッションケースの部分集合を選ぶことです。目的は、全件実行に近いバグ検出力を保ちながら所要時間を大幅に短縮することです。");
const faq2 = FAQ(
  "Làm sao ưu tiên ca hồi quy khi thời gian không đủ chạy hết?",
  "How do you prioritize regression cases when there's not enough time to run everything?",
  "Chấm điểm ưu tiên cho mỗi ca theo ba trục: (1) rủi ro nghiệp vụ nếu tính năng đó hỏng (mất tiền, mất dữ liệu, ảnh hưởng nhiều tenant), (2) lịch sử lỗi của module đó trong 6–12 tháng gần nhất (module lỗi nhiều lần thường tiếp tục sinh lỗi — nguyên lý cụm lỗi/Pareto), (3) tần suất người dùng thật chạm tới tính năng đó. Tổng hợp ba trục thành một điểm số, sắp ca theo điểm giảm dần, và chạy từ trên xuống cho tới hết ngân sách thời gian.",
  "Score each case on three axes: (1) business risk if the feature breaks (lost money, lost data, affects many tenants), (2) that module's defect history over the last 6–12 months (a module that has failed repeatedly tends to keep failing — the defect-clustering/Pareto principle), (3) how often real users actually touch that feature. Combine the three axes into one score, sort cases from highest to lowest, and run down the list until the time budget runs out.",
  "時間が足りない時、リグレッションケースの優先順位はどう付ける？",
  "各ケースを3つの軸で採点します：(1) その機能が壊れた場合のビジネスリスク（金銭損失、データ損失、多数のテナントへの影響）、(2) 直近6〜12ヶ月のそのモジュールの障害履歴（繰り返し障害が起きたモジュールは今後も障害を生みやすい——バグの偏在／パレートの原則）、(3) 実際のユーザーがその機能にどれだけ頻繁に触れるか。この3軸を1つのスコアに統合し、スコアの高い順にケースを並べ、時間予算が尽きるまで上から実行します。");
const faq3 = FAQ(
  "Bộ smoke test và bộ regression phân tầng khác nhau thế nào?",
  "How does a tiered smoke/regression suite differ from a single flat suite?",
  "Bộ phân tầng chia ca kiểm thử thành nhiều lớp theo mức độ ưu tiên và thời gian chạy: Tier 0 (smoke) chỉ vài chục ca sống còn, chạy vài phút, chặn release nếu fail; Tier 1 (core regression) là tập chọn lọc theo điểm ưu tiên rủi ro/lịch sử lỗi, chạy trong ngân sách thời gian cho phép trước release; Tier 2 (full regression) chạy toàn bộ, thường về đêm hoặc cuối tuần trên CI, không chặn release nhưng bắt các lỗi còn sót. Cách chia tầng này giúp đội vừa release nhanh, vừa không bỏ hoàn toàn việc kiểm thử đầy đủ.",
  "A tiered suite splits regression cases into layers by priority and run time: Tier 0 (smoke) is a few dozen life-critical cases, runs in minutes, and blocks release on failure; Tier 1 (core regression) is the subset selected by risk/defect-history priority score, run within the time budget before release; Tier 2 (full regression) runs everything, usually overnight or on weekends via CI, doesn't block release but catches leftover bugs. This layering lets a team release fast without fully abandoning exhaustive testing.",
  "スモークテストと階層化されたリグレッションスイートはどう違う？",
  "階層化スイートは、優先度と実行時間でケースを複数層に分けます：Tier 0（スモーク）は数十件の致命的ケースのみで数分で完了しfail時はリリースをブロック、Tier 1（コアリグレッション）はリスク／障害履歴の優先度スコアで選ばれた部分集合をリリース前の時間予算内で実行、Tier 2（フルリグレッション）は全件を通常夜間や週末にCIで実行しリリースはブロックしないが残存バグを検出します。この階層化により、チームは網羅的テストを完全に諦めることなく高速リリースを実現できます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử hồi quy chọn lọc (regression test selection) khác 'retest-all' ở điểm nào?", en: "How does regression test selection differ from 'retest-all'?", ja: "選択的リグレッションテストと『retest-all』の違いは？" },
    options: [
      { vi: "Chọn chạy TẬP CON ca dựa trên vùng ảnh hưởng, rủi ro, lịch sử lỗi thay vì chạy lại toàn bộ", en: "It runs a SUBSET of cases based on impact, risk, and defect history instead of rerunning everything", ja: "全件再実行の代わりに、影響範囲・リスク・障害履歴に基づき部分集合を実行する" },
      { vi: "Chạy nhanh hơn vì bỏ qua bước viết test case", en: "It's faster because it skips writing test cases", ja: "テストケース作成を省くため速い" },
      { vi: "Không cần biết mã nguồn thay đổi ở đâu", en: "It doesn't need to know where the source code changed", ja: "ソースコードの変更箇所を知る必要がない" },
      { vi: "Chỉ áp dụng được cho kiểm thử tự động, không dùng cho manual", en: "It only applies to automated testing, not manual", ja: "自動テストにのみ適用可能で手動テストには使えない" },
    ], correct: 0,
    explain: { vi: "Chọn lọc dựa trên vùng ảnh hưởng thay đổi (git diff/dependency graph), rủi ro nghiệp vụ và lịch sử lỗi — không phải chạy lại tất cả.", en: "Selection relies on change impact (git diff/dependency graph), business risk, and defect history — not rerunning everything.", ja: "選択は変更の影響範囲（差分／依存関係グラフ）、ビジネスリスク、障害履歴に基づき、全件再実行ではありません。" },
  }),
  mcq({
    q: { vi: "Trong ProjectFlow, vì sao thay đổi thư viện chung 'billing-core' cần một vùng hồi quy rất rộng?", en: "In ProjectFlow, why does a change to the shared 'billing-core' library need a very wide regression scope?", ja: "ProjectFlowで共有ライブラリ『billing-core』の変更が非常に広いリグレッション範囲を必要とする理由は？" },
    options: [
      { vi: "Vì nó chỉ ảnh hưởng giao diện đăng nhập", en: "Because it only affects the login UI", ja: "ログイン画面のみに影響するため" },
      { vi: "Vì MỌI tenant trong hệ thống đa tenant đều dùng chung thư viện đó", en: "Because EVERY tenant in the multi-tenant system shares that library", ja: "マルチテナントシステムの全テナントがそのライブラリを共有しているため" },
      { vi: "Vì thư viện này không được test bao giờ", en: "Because this library is never tested", ja: "このライブラリはテストされたことがないため" },
      { vi: "Vì nó chạy trên máy khách, không ảnh hưởng server", en: "Because it runs client-side and doesn't affect the server", ja: "クライアント側で動作しサーバーに影響しないため" },
    ], correct: 1,
    explain: { vi: "Thư viện dùng chung ảnh hưởng mọi tenant/module phụ thuộc — dependency graph cho thấy vùng ảnh hưởng lan rộng hơn một thay đổi cục bộ.", en: "A shared library affects every dependent tenant/module — the dependency graph shows a wider impact than a local change.", ja: "共有ライブラリは依存する全テナント/モジュールに影響し、依存関係グラフはローカルな変更より広い影響範囲を示します。" },
  }),
  mcq({
    q: { vi: "Ca 'tự động trừ phí định kỳ' có lịch sử 5 lỗi Critical và chạy hàng ngày. Nên xếp ưu tiên thế nào?", en: "The 'periodic auto-billing' case has a history of 5 Critical bugs and runs daily. How should it be prioritized?", ja: "『定期自動課金』ケースは過去にCriticalバグ5件、毎日実行される。優先度はどうすべき？" },
    options: [
      { vi: "Ưu tiên thấp nhất vì đã quen thuộc, chắc không còn lỗi", en: "Lowest priority since it's familiar and probably bug-free by now", ja: "慣れているのでもうバグはないだろうと最低優先度にする" },
      { vi: "Ưu tiên cao nhất (P0) — rủi ro nghiệp vụ cao, lịch sử lỗi nhiều, tần suất dùng dày", en: "Highest priority (P0) — high business risk, heavy defect history, frequent usage", ja: "最優先（P0）——高いビジネスリスク、多い障害履歴、高頻度利用" },
      { vi: "Bỏ hẳn khỏi bộ hồi quy vì đã chạy hàng ngày rồi", en: "Drop it from regression entirely since it already runs daily", ja: "毎日実行済みなのでリグレッションから完全に外す" },
      { vi: "Chỉ chạy nếu còn thời gian dư sau khi test hết các ca khác", en: "Only run it if there's spare time after testing everything else", ja: "他の全ケースをテストした後、時間が余れば実行する" },
    ], correct: 1,
    explain: { vi: "Rủi ro cao + lịch sử lỗi nhiều + tần suất dùng dày cộng dồn thành điểm ưu tiên cao nhất — đúng nguyên lý chấm điểm ưu tiên đã học.", en: "High risk + heavy defect history + frequent usage combine into the highest priority score — matching the prioritization principle covered.", ja: "高リスク＋多い障害履歴＋高頻度利用が合わさり最高優先度スコアになる——学んだ優先度採点の原則どおりです。" },
  }),
  mcq({
    q: { vi: "Trong bộ hồi quy phân tầng, Tier 0 (smoke) đóng vai trò gì?", en: "In a tiered regression suite, what is Tier 0 (smoke)'s role?", ja: "階層化リグレッションスイートでTier 0（スモーク）の役割は？" },
    options: [
      { vi: "Chạy toàn bộ 1.240 ca trước khi release", en: "Run all 1,240 cases before release", ja: "リリース前に全1,240ケースを実行する" },
      { vi: "Vài chục ca sống còn, chạy nhanh, CHẶN release nếu fail", en: "A few dozen life-critical cases, runs fast, BLOCKS release on failure", ja: "数十件の致命的ケースを高速実行し、fail時はリリースをブロックする" },
      { vi: "Chỉ chạy sau khi đã release xong", en: "Only runs after the release is already out", ja: "リリース完了後にのみ実行する" },
      { vi: "Không liên quan gì tới quyết định release", en: "Has nothing to do with the release decision", ja: "リリース判断とは無関係である" },
    ], correct: 1,
    explain: { vi: "Tier 0/smoke là lớp nhanh nhất, ít ca nhất, nhưng có quyền chặn release nếu fail — bảo vệ những chức năng sống còn.", en: "Tier 0/smoke is the fastest, smallest layer, but has the power to block release on failure — protecting life-critical functions.", ja: "Tier 0/スモークは最速・最少件数の層ですが、fail時にリリースをブロックする権限を持ち、致命的機能を守ります。" },
  }),
  mcq({
    q: { vi: "Vì sao 'cắt tập hồi quy ngẫu nhiên cho kịp giờ' nguy hiểm hơn 'chọn lọc có căn cứ' dù cùng số ca?", en: "Why is 'randomly cutting the regression set to save time' riskier than 'grounded selection' even with a similar case count?", ja: "同程度のケース数でも『時間短縮のためのランダムな削減』が『根拠あるチョイス』より危険な理由は？" },
    options: [
      { vi: "Vì ngẫu nhiên luôn chạy nhanh hơn", en: "Because random selection always runs faster", ja: "ランダム選択は常に速いから" },
      { vi: "Vì không dựa trên vùng ảnh hưởng/rủi ro nên dễ bỏ sót đúng module có nguy cơ vỡ cao nhất", en: "Because it isn't based on impact/risk, so it easily misses exactly the modules most likely to break", ja: "影響範囲/リスクに基づかないため、最も壊れやすいモジュールをまさに見逃しやすいから" },
      { vi: "Vì ngẫu nhiên tốn nhiều tài nguyên máy chủ hơn", en: "Because random selection uses more server resources", ja: "ランダム選択はサーバーリソースをより多く消費するから" },
      { vi: "Vì ngẫu nhiên không thể chạy trên CI", en: "Because random selection can't run on CI", ja: "ランダム選択はCIで実行できないから" },
    ], correct: 1,
    explain: { vi: "Số ca có thể tương đương, nhưng cắt ngẫu nhiên không ưu tiên đúng vùng rủi ro cao — như ví dụ billing/auth bị lọt lỗi Critical trong bài.", en: "The case count may be similar, but random cutting doesn't prioritize the truly high-risk area — as in the article's billing/auth example where Critical bugs escaped.", ja: "ケース数は同程度でも、ランダム削減は本当に高リスクな箇所を優先しません——本文のbilling/auth例でCriticalバグが漏れたとおりです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử hồi quy chọn lọc (regression test selection) là cách chọn ra một tập con ca kiểm thử hồi quy — thay vì chạy lại TOÀN BỘ — dựa trên vùng ảnh hưởng của thay đổi (change impact), mức rủi ro nghiệp vụ và lịch sử lỗi của từng module. Bài này bám dự án SaaS quản lý dự án đa tenant ProjectFlow: bạn học cách phân tích vùng ảnh hưởng, chấm điểm ưu tiên ca, và xây bộ smoke/regression phân tầng để không lỡ deadline mà vẫn giữ chất lượng. Nhiều mockup thật và trắc nghiệm cuối bài.",
        "Regression test selection is choosing a SUBSET of regression cases to run — instead of the ENTIRE suite — based on the change's impact area, business risk, and each module's defect history. This article follows ProjectFlow, a multi-tenant SaaS project-management product: you'll learn to analyze change impact, score case priority, and build a tiered smoke/regression suite so you never miss a deadline while keeping quality. Real mockups and a quiz at the end.",
        "選択的リグレッションテスト（regression test selection）とは、全ケースを再実行する代わりに、変更の影響範囲・ビジネスリスク・各モジュールの障害履歴に基づいてリグレッションケースの部分集合を選ぶ手法です。本記事はマルチテナントSaaSのプロジェクト管理製品ProjectFlowに沿って、影響範囲分析・ケースの優先度採点・スモーク/リグレッションの階層構成の作り方を学びます。豊富なモックとクイズ付き。"),
      P("Khi đội test đã có hàng nghìn ca hồi quy tích luỹ qua nhiều sprint, chạy lại TOÀN BỘ trước mỗi lần release gần như không khả thi — nhất là với SaaS release liên tục (continuous delivery). Bài toán thực tế không phải 'test hết' mà là 'test ĐÚNG những gì có nguy cơ vỡ nhất, trong thời gian có hạn'. Đây chính là kỹ năng kiểm thử hồi quy chọn lọc & ưu tiên ca — một trong những kỹ năng phân biệt tester cấp senior với tester chỉ biết chạy theo checklist có sẵn.",
        "Once a test team has accumulated thousands of regression cases across many sprints, rerunning the ENTIRE suite before every release is nearly impossible — especially for SaaS with continuous delivery. The real problem isn't 'test everything' but 'test exactly what's most likely to break, within limited time'. That's the skill of regression test selection & prioritization — one of the skills that separates a senior tester from one who just runs a fixed checklist.",
        "テストチームが何スプリントもかけて数千件のリグレッションケースを蓄積すると、リリースのたびに全件を再実行するのはほぼ不可能です——特に継続的デリバリーのSaaSでは。実際の課題は『全部テストする』ことではなく『限られた時間で最も壊れやすい箇所を正しくテストする』ことです。これこそが選択的リグレッションテストとケース優先度付けのスキルであり、シニアテスターと決まったチェックリストをこなすだけのテスターを分ける能力の一つです。"),
      IMG(m_screen, "Màn hình test: kế hoạch kiểm thử hồi quy release REL-4.18 của ProjectFlow — 38 giờ cần nhưng chỉ còn 6 giờ", "Screen under test: ProjectFlow's REL-4.18 regression plan — 38 hours needed but only 6 hours left", "テスト対象画面：ProjectFlowのREL-4.18リグレッション計画 — 必要38時間に対し残り6時間"),
      DEF("Kiểm thử hồi quy chọn lọc", "chọn một tập con ca kiểm thử hồi quy để chạy dựa trên vùng ảnh hưởng thay đổi, rủi ro và lịch sử lỗi, thay vì chạy lại toàn bộ (retest-all).",
        "choosing a subset of regression cases to run based on change impact, risk, and defect history, instead of rerunning everything (retest-all).",
        "変更の影響範囲・リスク・障害履歴に基づき、全件再実行（retest-all）の代わりに実行するリグレッションケースの部分集合を選ぶこと。"),
    ] },
  { heading: { vi: "2. Retest-all, chọn lọc và ưu tiên ca — ba chiến lược khác nhau", en: "2. Retest-all, selection, and prioritization — three different strategies", ja: "2. Retest-all・選択・優先度付け — 3つの異なる戦略" },
    blocks: [
      P("Có ba chiến lược hồi quy thường gặp, và tester nâng cao cần phân biệt rạch ròi. Retest-all chạy lại toàn bộ ca — an toàn nhất nhưng tốn thời gian nhất, chỉ hợp khi hệ thống nhỏ hoặc có đủ tài nguyên CI để chạy song song không giới hạn. Kiểm thử hồi quy chọn lọc (selective) loại bỏ hẳn những ca được xác định là KHÔNG bị ảnh hưởng bởi thay đổi, dựa trên bằng chứng kỹ thuật (dependency graph, code coverage diff) chứ không phải cảm tính. Ưu tiên ca (prioritization) thì khác: vẫn giữ toàn bộ ca trong danh sách, nhưng sắp xếp lại thứ tự chạy để những ca giá trị cao nhất được thực hiện sớm nhất trong ngân sách thời gian có hạn.",
        "There are three common regression strategies, and an advanced tester needs to tell them apart clearly. Retest-all reruns every case — safest but slowest, only suitable for small systems or when there's enough CI capacity to run everything in unlimited parallel. Selective regression testing drops cases proven to be UNAFFECTED by the change, based on technical evidence (dependency graph, code coverage diff), not gut feeling. Prioritization is different: it keeps every case in the list but reorders execution so the highest-value cases run first within a limited time budget.",
        "一般的なリグレッション戦略は3つあり、上級テスターはこれらを明確に区別する必要があります。Retest-allは全ケースを再実行——最も安全ですが最も時間がかかり、小規模システムか無制限に並列実行できるCIリソースがある場合のみ適します。選択的リグレッションテストは、勘ではなく技術的根拠（依存関係グラフ、コードカバレッジ差分）に基づき、変更の影響を受けないと証明されたケースを除外します。優先度付けは異なります：全ケースをリストに残したまま、限られた時間予算内で最も価値の高いケースを先に実行するよう順序を並べ替えます。"),
      DEF("Ưu tiên ca kiểm thử", "sắp xếp lại thứ tự chạy ca kiểm thử theo giá trị/rủi ro để những ca quan trọng nhất được thực hiện sớm nhất, thay vì loại bỏ ca nào.",
        "reordering test case execution by value/risk so the most important cases run first, without dropping any case.",
        "どのケースも除外せず、価値/リスクに基づいてテストケースの実行順序を並べ替え、最も重要なケースを最初に実行すること。"),
      P("Ba chiến lược này không loại trừ nhau — thực tế đội ngũ trưởng thành thường kết hợp cả ba: chọn lọc trước để loại các module chắc chắn không liên quan, sau đó ưu tiên phần còn lại theo điểm rủi ro, và cuối cùng vẫn giữ một lớp retest-all chạy định kỳ (đêm/cuối tuần) làm lưới an toàn cuối cùng. Bạn sẽ thấy mô hình kết hợp này ở chương 8 khi ta xây bộ hồi quy phân tầng cho ProjectFlow.",
        "These three strategies aren't mutually exclusive — mature teams typically combine all three: select first to drop modules definitely unrelated, then prioritize the remainder by risk score, and finally still keep a periodic retest-all layer (nightly/weekend) as a final safety net. You'll see this combined model in chapter 8 when we build the tiered regression suite for ProjectFlow.",
        "この3つの戦略は互いに排他的ではありません——成熟したチームは通常3つを組み合わせます：まず選択で確実に無関係なモジュールを除外し、次に残りをリスクスコアで優先度付けし、最後に定期的（夜間/週末）なretest-all層を最終的な安全網として残します。第8章でProjectFlow向けの階層化リグレッションスイートを構築する際、この組合せモデルを見ていきます。"),
    ] },
  { heading: { vi: "3. Vì sao chọn lọc & ưu tiên đặc biệt quan trọng ở SaaS đa tenant", en: "3. Why selection & prioritization matter especially for multi-tenant SaaS", ja: "3. マルチテナントSaaSで選択と優先度付けが特に重要な理由" },
    blocks: [
      P("ProjectFlow là một SaaS quản lý dự án phục vụ hàng trăm tổ chức (tenant) trên CÙNG một hạ tầng dùng chung. Đặc điểm này tạo ra hai áp lực trái chiều: một mặt, release phải diễn ra liên tục (nhiều lần/tuần) để đưa tính năng tới khách hàng nhanh; mặt khác, một lỗi ở module dùng chung (như billing-core hay hệ thống xác thực SSO) có thể ảnh hưởng ĐỒNG THỜI hàng trăm tenant thay vì một khách hàng đơn lẻ như phần mềm cài đặt riêng lẻ (on-premise).",
        "ProjectFlow is a project-management SaaS serving hundreds of organizations (tenants) on the SAME shared infrastructure. This creates two opposing pressures: on one hand, releases must happen continuously (multiple times a week) to ship features to customers fast; on the other, a bug in a shared module (like billing-core or the SSO authentication system) can affect hundreds of tenants SIMULTANEOUSLY instead of one isolated customer as with on-premise software.",
        "ProjectFlowは、同一の共有インフラ上で数百の組織（テナント）にサービスを提供するプロジェクト管理SaaSです。これにより2つの相反する圧力が生まれます：一方で、機能を素早く顧客に届けるため継続的（週に複数回）にリリースする必要があり、他方で共有モジュール（billing-coreやSSO認証システムなど）のバグは、オンプレミスソフトウェアのように単一の顧客ではなく数百のテナントに同時に影響します。"),
      P("Chính vì vậy, chạy retest-all mỗi lần release vừa không kịp tốc độ continuous delivery, vừa lãng phí — vì phần lớn thay đổi mỗi sprint chỉ chạm tới một module hẹp. Nhưng bỏ qua kiểm thử hồi quy hoàn toàn lại quá rủi ro, vì một thay đổi tưởng nhỏ ở module dùng chung có thể gây thiệt hại trên diện rộng chỉ trong vài giờ, trước khi ai kịp phát hiện. Kiểm thử hồi quy chọn lọc & ưu tiên ca chính là câu trả lời cân bằng giữa hai áp lực đó — vừa nhanh, vừa đủ an toàn cho một hệ thống đa tenant.",
        "That's why running retest-all every release can't keep up with continuous delivery speed and is wasteful — since most changes per sprint only touch a narrow module. But skipping regression testing entirely is too risky, since a seemingly small change to a shared module can cause damage at wide scale within hours, before anyone notices. Regression test selection & prioritization is the balanced answer to these two pressures — fast enough, yet safe enough for a multi-tenant system.",
        "そのため、リリースのたびにretest-allを実行することは継続的デリバリーの速度に追いつけず、無駄でもあります——各スプリントのほとんどの変更は狭いモジュールにしか触れないためです。しかしリグレッションテストを完全に省くのはリスクが高すぎます——共有モジュールへの些細に見える変更が、誰も気づく前に数時間で広範囲に被害を及ぼすことがあるためです。選択的リグレッションテストと優先度付けは、この2つの圧力のバランスを取る答えです——マルチテナントシステムにとって十分に速く、十分に安全です。"),
      P("Một điểm riêng của SaaS đa tenant là 'blast radius' (bán kính ảnh hưởng) khác hẳn phần mềm đơn lẻ: cùng một dòng code lỗi, on-premise chỉ ảnh hưởng một khách, còn SaaS đa tenant có thể ảnh hưởng toàn bộ khách hàng cùng lúc. Vì vậy khi chấm điểm rủi ro ở chương 5, ta luôn cộng thêm trọng số cho các module dùng chung (shared/core) — chúng luôn xứng đáng nằm trong tập chọn lọc dù thay đổi trông có vẻ nhỏ.",
        "A distinctive trait of multi-tenant SaaS is a very different 'blast radius' than single-tenant software: the same buggy line of code affects one customer on-premise, but can affect ALL customers at once in multi-tenant SaaS. So when scoring risk in chapter 5, we always add extra weight for shared/core modules — they always deserve a spot in the selected set even when the change looks small.",
        "マルチテナントSaaSの特徴的な点は、シングルテナントソフトウェアとは全く異なる『被害範囲（blast radius）』です：同じバグのあるコード行が、オンプレミスでは1顧客にのみ影響しますが、マルチテナントSaaSでは全顧客に同時に影響することがあります。そのため第5章でリスクを採点する際、共有/コアモジュールには常に追加の重みを加えます——変更が小さく見えても、それらは常に選択セットに含まれるべきです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: ba chiến lược chọn tập hồi quy", en: "4. Prepare: three strategies for selecting the regression set", ja: "4. 準備：リグレッション集合を選ぶ3つの戦略" },
    blocks: [
      P("Trước khi chọn ca, bạn cần một QUY TRÌNH lặp lại được, không phải cảm tính mỗi lần một kiểu. Có ba nguồn dữ liệu chính để dựng tập chọn lọc, và một tester nâng cao nên phối hợp cả ba thay vì chỉ dùng một.",
        "Before selecting cases, you need a REPEATABLE process, not a different gut call each time. There are three main data sources for building the selected set, and an advanced tester should combine all three instead of relying on just one.",
        "ケースを選ぶ前に、毎回異なる勘に頼るのではなく、再現可能なプロセスが必要です。選択集合を構築するための主な情報源は3つあり、上級テスターは1つだけに頼らず3つを組み合わせるべきです。"),
      STEP(1, "Vùng ảnh hưởng thay đổi (change impact analysis): đọc git diff của release, dựng dependency graph (module nào import/gọi module nào) để biết thay đổi lan tới đâu ngoài file bị sửa trực tiếp.", "Change impact analysis: read the release's git diff, build a dependency graph (which module imports/calls which) to know how far the change spreads beyond the directly edited files.", "変更の影響範囲分析：リリースのgit diffを読み、依存関係グラフ（どのモジュールがどのモジュールをimport/呼び出すか）を構築し、直接編集されたファイル以外にどこまで変更が波及するか把握する。"),
      STEP(2, "Rủi ro nghiệp vụ (risk-based): với mỗi module bị ảnh hưởng, hỏi 'nếu tính năng này hỏng, thiệt hại là gì — mất tiền, mất dữ liệu, vi phạm hợp đồng SLA?' rồi chấm điểm rủi ro tương ứng.", "Business risk (risk-based): for each affected module, ask 'if this feature breaks, what's the damage — lost money, lost data, an SLA breach?' then score the risk accordingly.", "ビジネスリスク（リスクベース）：影響を受ける各モジュールについて『この機能が壊れたら被害は何か——金銭損失、データ損失、SLA違反か？』と問い、それに応じてリスクを採点する。"),
      STEP(3, "Lịch sử lỗi (defect history): tra cứu số lỗi Critical/High của mỗi module trong 6–12 tháng gần nhất trong hệ thống theo dõi lỗi (Jira) — module hay lỗi có xu hướng TIẾP TỤC sinh lỗi theo nguyên lý cụm lỗi (defect clustering, dạng Pareto 80/20).", "Defect history: look up each module's Critical/High bug count over the last 6–12 months in the bug tracker (Jira) — a module that has failed often tends to KEEP failing, per the defect-clustering principle (a Pareto-like 80/20 pattern).", "障害履歴：バグトラッカー（Jira）で直近6〜12ヶ月の各モジュールのCritical/Highバグ件数を調べる——頻繁に障害が起きたモジュールは今後も障害を生み続ける傾向がある（バグの偏在原則、パレート的な80/20パターン）。"),
      TRY("Chọn một release gần nhất bạn từng test (hoặc dự án học tập), thử vẽ nhanh 3 module bị ảnh hưởng trực tiếp và ít nhất 1 module phụ thuộc gián tiếp.", "Pick a recent release you tested (or a study project), quickly sketch 3 directly affected modules and at least 1 indirectly dependent module.", "最近テストしたリリース（または学習プロジェクト）を選び、直接影響を受けるモジュール3つと間接的に依存するモジュールを少なくとも1つ、簡単に図示してみよう。"),
      PITFALL("Chỉ nhìn file bị sửa trực tiếp mà bỏ qua module PHỤ THUỘC GIÁN TIẾP (như billing-core ở ProjectFlow) — đây là nguyên nhân phổ biến nhất khiến lỗi lọt qua kiểm thử hồi quy chọn lọc.", "Only looking at the directly edited files while ignoring INDIRECTLY dependent modules (like ProjectFlow's billing-core) — this is the most common reason bugs slip through selective regression testing.", "直接編集されたファイルのみを見て、間接的に依存するモジュール（ProjectFlowのbilling-coreなど）を無視すること——これが選択的リグレッションテストでバグが漏れる最も一般的な原因です。"),
      IMG(m_impact, "Bảng chọn tập hồi quy theo vùng ảnh hưởng thay đổi trên ProjectFlow", "A table selecting the regression set by change impact area on ProjectFlow", "ProjectFlowにおける変更影響範囲によるリグレッション集合の選択表"),
    ] },
  { heading: { vi: "5. Các bước chấm điểm ưu tiên & chọn tập hồi quy (thực hành)", en: "5. Steps to score priority & select the regression set (hands-on)", ja: "5. 優先度採点とリグレッション集合選択の手順（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào release REL-4.18 của ProjectFlow — nơi chỉ còn 6 giờ trước khi release nhưng bộ hồi quy đầy đủ cần 38 giờ. Làm theo thứ tự dưới đây để có một tập ca hồi quy vừa đủ ngân sách vừa an toàn.",
        "Now let's apply this for real to ProjectFlow's REL-4.18 — where only 6 hours remain before release but the full regression suite needs 38 hours. Follow the order below to get a regression set that fits the budget while staying safe.",
        "では、ProjectFlowのREL-4.18に実際に適用しましょう——リリースまで残り6時間しかないのに、フルリグレッションスイートには38時間必要な状況です。以下の順序で、予算に収まりつつ安全なリグレッション集合を作りましょう。"),
      STEP(1, "Liệt kê mọi module bị ảnh hưởng trực tiếp + gián tiếp từ dependency graph của release (xem chương 4).", "List every directly and indirectly affected module from the release's dependency graph (see chapter 4).", "リリースの依存関係グラフから直接・間接に影響を受ける全モジュールを列挙する（第4章参照）。"),
      STEP(2, "Với mỗi ca hồi quy thuộc các module đó, chấm 3 điểm con: rủi ro nghiệp vụ (0–40), lịch sử lỗi (0–35), tần suất dùng thật (0–25) — tổng tối đa 100.", "For each regression case in those modules, score 3 sub-scores: business risk (0–40), defect history (0–35), real usage frequency (0–25) — max total 100.", "それらのモジュールに属する各リグレッションケースについて、3つのサブスコアを付ける：ビジネスリスク（0〜40）、障害履歴（0〜35）、実利用頻度（0〜25）——合計最大100。"),
      STEP(3, "Sắp toàn bộ ca theo điểm tổng giảm dần, cộng dồn thời gian chạy ước tính cho tới khi chạm ngân sách 6 giờ.", "Sort all cases by total score descending, accumulate estimated run time until you hit the 6-hour budget.", "全ケースを合計スコアの降順に並べ、6時間の予算に達するまで推定実行時間を積算する。"),
      STEP(4, "Ghi lại danh sách ca BỊ CẮT (dưới ngưỡng) vào backlog 'chưa kiểm — rủi ro thấp' để chạy ở Tier full regression đêm nay, không phải bỏ hẳn.", "Record the cut cases (below threshold) in an 'untested — low risk' backlog to run in tonight's full-regression tier, not dropped entirely.", "カットされたケース（閾値未満）を『未検証・低リスク』のバックログに記録し、完全に削除するのではなく今夜のフルリグレッション層で実行する。"),
      CODE("text", "CHAM DIEM UU TIEN - vi du 3 ca (thang diem 100)\nCa: 'Tu dong tru phi dinh ky'\n  Rui ro nghiep vu = 38/40 (mat tien neu sai)\n  Lich su loi      = 32/35 (5 loi Critical/12 thang)\n  Tan suat dung     = 24/25 (chay hang ngay)\n  TONG = 94 -> P0, chay dau tien\n\nCa: 'Xuat bao cao PDF da tenant'\n  Rui ro nghiep vu = 18/40 (khong mat tien, chi phien)\n  Lich su loi      = 8/35  (1 loi Medium/12 thang)\n  Tan suat dung     = 15/25 (vai lan/tuan)\n  TONG = 41 -> P2\n\nCa: 'Doi giao dien dark mode'\n  Rui ro nghiep vu = 2/40\n  Lich su loi      = 0/35\n  Tan suat dung     = 5/25\n  TONG = 7 -> P3, cat neu het gio"),
      TRY("Tự chấm điểm ưu tiên cho ca 'Đồng bộ trạng thái Task real-time' của ProjectFlow theo 3 trục ở STEP 2 — điểm tổng của bạn gần với 82/100 trong bảng chương 5 không?", "Score the 'real-time Task status sync' case for ProjectFlow yourself using the 3 axes in STEP 2 — is your total close to the 82/100 shown in this chapter's table?", "ProjectFlowの『リアルタイムTaskステータス同期』ケースを、STEP2の3軸で自分で採点してみよう——合計はこの章の表にある82/100に近いですか？"),
      IMG(m_priority, "Bảng ưu tiên ca theo rủi ro nghiệp vụ và lịch sử lỗi trên ProjectFlow", "A table prioritizing cases by business risk and defect history on ProjectFlow", "ProjectFlowにおけるビジネスリスクと障害履歴によるケース優先度表"),
    ] },
  { heading: { vi: "6. Tình huống 1: chạy full regression không kịp release nên bỏ bừa", en: "6. Situation 1: no time for full regression, so the team cuts randomly", ja: "6. シーン1：フルリグレッションが間に合わずランダムに削減する" },
    blocks: [
      SITUATION("Chỉ còn 6 giờ tới release REL-4.18 nhưng bộ hồi quy đầy đủ cần 38 giờ. Đội quyết định 'ai rảnh thì test module mình quen', chọn khoảng 60 ca theo cảm tính cho kịp giờ.", "Only 6 hours remain before REL-4.18 but the full regression suite needs 38 hours. The team decides 'whoever's free tests the module they know', picking about 60 cases by gut feeling to make the deadline.",
        "Bản release đi ra đúng giờ, nhưng 2 ngày sau khách hàng báo lỗi: tính năng tự động trừ phí tính sai số tiền cho một số tenant, và luồng đăng nhập SSO bị treo với tài khoản thuộc tổ chức lớn. Cả hai module này đều KHÔNG nằm trong 60 ca được chọn ngẫu nhiên.",
        "The release ships on time, but 2 days later customers report bugs: the auto-billing feature charges the wrong amount for some tenants, and the SSO login flow hangs for accounts in large organizations. Neither module was among the 60 randomly picked cases.",
        "残り6時間でREL-4.18のリリースを迎えるが、フルリグレッションスイートには38時間必要。チームは『手が空いた人が知っているモジュールをテストする』と決め、間に合わせるため約60ケースを勘で選ぶ。",
        "リリースは予定どおり出るが、2日後に顧客からバグ報告が入る：自動課金機能が一部テナントで誤った金額を請求し、大規模組織のアカウントでSSOログインフローがハングする。どちらのモジュールもランダムに選ばれた60ケースには含まれていなかった。"),
      SOLVE("Thay 'ai rảnh test module mình quen' bằng quy trình chấm điểm ưu tiên ở chương 5: dựng dependency graph trước, chấm điểm rủi ro + lịch sử lỗi + tần suất dùng, rồi chọn tập theo điểm số — không theo người rảnh hay quen tay.", "Replace 'whoever's free tests the module they know' with the priority-scoring process from chapter 5: build the dependency graph first, score risk + defect history + usage frequency, then select the set by score — not by who's free or familiar.", "『手が空いた人が知っているモジュールをテストする』を第5章の優先度採点プロセスに置き換える：まず依存関係グラフを構築し、リスク＋障害履歴＋利用頻度を採点し、誰が空いているか・慣れているかではなくスコアで集合を選ぶ。"),
      P("Đây là bài học lớn nhất của chương này: cắt tập hồi quy theo cảm tính (kể cả khi số ca không hề ít) không đồng nghĩa với an toàn — vì cảm tính có xu hướng ưu ái những module quen thuộc, dễ test, thay vì những module RỦI RO CAO NHẤT. Cả tính năng tự động trừ phí và luồng SSO đều nằm trong nhóm rủi ro rất cao (mất tiền, chặn đăng nhập hàng loạt) mà một quy trình chấm điểm có căn cứ chắc chắn sẽ xếp hạng P0/P1, không thể bị bỏ sót.",
        "This is the chapter's biggest lesson: cutting the regression set by gut feeling (even with a decent case count) doesn't mean it's safe — because gut feeling tends to favor familiar, easy-to-test modules over the HIGHEST-RISK ones. Both the auto-billing feature and the SSO flow fall into the very-high-risk group (lost money, mass login blockage) that a grounded scoring process would definitely rank P0/P1, impossible to miss.",
        "これがこの章の最大の教訓です：（ケース数が少なくなくても）勘でリグレッション集合を削減することは安全を意味しません——勘は最もリスクの高いモジュールではなく、慣れた・テストしやすいモジュールを優遇しがちだからです。自動課金機能とSSOフローはどちらも非常に高リスクなグループ（金銭損失、大規模ログインブロック）に属し、根拠ある採点プロセスなら確実にP0/P1と評価され、見逃されることはありません。"),
      IMG(m_random_vs_selective, "So sánh hậu quả: cắt hồi quy ngẫu nhiên vs chọn lọc có căn cứ, cùng ngân sách 6 giờ", "Comparing outcomes: randomly cut regression vs grounded selection, same 6-hour budget", "結果の比較：ランダムなリグレッション削減 vs 根拠あるチョイス、同じ6時間予算"),
      RECAP(["Số ca tương đương KHÔNG đồng nghĩa an toàn tương đương", "Luôn chọn theo điểm số (impact/rủi ro/lịch sử lỗi), không theo người rảnh hay quen tay"],
        ["A similar case count does NOT mean similar safety", "Always select by score (impact/risk/defect history), never by who's free or familiar"],
        ["同程度のケース数は同程度の安全性を意味しない", "常にスコア（影響/リスク/障害履歴）で選び、空き時間や慣れで選ばない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: hotfix nhỏ nhưng ảnh hưởng module thanh toán chung", en: "7. Situation 2: a tiny hotfix ripples into the shared billing module", ja: "7. シーン2：小さなホットフィックスが共有課金モジュールに波及" },
    blocks: [
      SITUATION("Một lập trình viên đẩy hotfix 1 dòng: giới hạn trường 'Ghi chú công việc' (Task Notes) còn tối đa 2.000 ký tự, để sửa lỗi UI tràn chữ. Vì thay đổi 'quá nhỏ', team chỉ chạy smoke test rồi release ngay trong ngày, không đưa vào tập hồi quy chọn lọc.", "A developer pushes a 1-line hotfix: limit the 'Task Notes' field to a max of 2,000 characters, to fix a UI text-overflow bug. Since the change is 'too small', the team only runs the smoke test and releases the same day, without adding it to the selective regression set.",
        "Ba ngày sau, một số tenant khiếu nại bị tính phí vượt gói Storage Add-on dù dung lượng thực tế chưa vượt. Điều tra cho thấy module Notes dùng CHUNG hàm tính dung lượng lưu trữ với Billing — sau khi cắt chuỗi, hàm này đọc sai độ dài, khiến số liệu tính phí lệch.",
        "Three days later, several tenants complain about being overcharged for the Storage Add-on even though their real usage hasn't exceeded the plan. Investigation shows the Notes module SHARES the storage-usage calculation function with Billing — after truncating the string, that function misreads the length, skewing the billing figures.",
        "開発者がUIの文字あふれバグを修正するため、『タスクのメモ』欄を最大2,000文字に制限する1行のホットフィックスをプッシュする。変更が『小さすぎる』として、チームはスモークテストのみ実行しその日のうちにリリースし、選択的リグレッション集合には加えない。",
        "3日後、一部のテナントが実際の利用量が上限を超えていないのにStorage Add-onの料金を過剰請求されたと苦情を申し立てる。調査の結果、NotesモジュールがBillingとストレージ使用量計算関数を共有していることが判明——文字列切り詰め後、その関数が長さを誤って読み取り、課金数値がずれていた。"),
      SOLVE("Báo bug Critical ngay (ảnh hưởng doanh thu & niềm tin khách hàng), hoàn tiền chênh lệch cho các tenant bị ảnh hưởng, và quan trọng nhất: bổ sung quy tắc 'MỌI thay đổi chạm module dùng chung — dù chỉ 1 dòng — bắt buộc chạy tối thiểu Tier 1 core regression của module phụ thuộc, không được chỉ chạy smoke.", "Report it as a Critical bug immediately (revenue & customer-trust impact), refund the overcharged tenants, and most importantly: add a rule that 'ANY change touching a shared module — even 1 line — must run at least the Tier 1 core regression of dependent modules, not just smoke.", "即座にCriticalバグとして報告し（収益と顧客の信頼に影響）、過剰請求されたテナントに差額を返金し、最も重要なこととして『共有モジュールに触れる変更は——たとえ1行でも——依存モジュールの最低Tier 1コアリグレッションを実行しなければならず、スモークのみでは不可』というルールを追加する。"),
      P("Ví dụ này là minh chứng rõ nhất cho khái niệm 'vùng ảnh hưởng thay đổi' ở chương 4: kích thước của DIFF (1 dòng) không hề tỉ lệ thuận với kích thước của VÙNG ẢNH HƯỞNG. Chỉ dependency graph — không phải trực giác 'thay đổi nhỏ chắc an toàn' — mới cho thấy Notes và Billing dùng chung một hàm. Đây chính là lý do quy trình ở chương 4–5 luôn bắt đầu từ dependency graph trước khi chấm điểm rủi ro, thay vì suy đoán theo kích thước code thay đổi.",
        "This example is the clearest proof of the 'change impact area' concept from chapter 4: the size of the DIFF (1 line) is in no way proportional to the size of the IMPACT AREA. Only the dependency graph — not the intuition that 'a small change is probably safe' — reveals that Notes and Billing share a function. That's exactly why the chapter 4–5 process always starts from the dependency graph before scoring risk, instead of guessing from the size of the code change.",
        "この例は第4章の『変更影響範囲』の概念を最も明確に証明しています：差分（diff）のサイズ（1行）は影響範囲のサイズと決して比例しません。『小さな変更はおそらく安全だろう』という直感ではなく、依存関係グラフだけがNotesとBillingが関数を共有していることを明らかにします。だからこそ第4〜5章のプロセスは、コード変更のサイズから推測するのではなく、常に依存関係グラフから始めてリスクを採点するのです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ vùng ảnh hưởng từ dependency graph, không phải từ kích thước diff", "A bug ticket found via the dependency-graph impact area, not the diff's size", "diffのサイズではなく依存関係グラフの影響範囲から見つかったバグチケット"),
      TRY("Nghĩ thêm một thay đổi 'trông nhỏ' khác trong ProjectFlow (ví dụ đổi định dạng ngày tháng) và thử suy luận nó có thể ảnh hưởng module dùng chung nào.", "Think of another 'small-looking' change in ProjectFlow (e.g. changing a date format) and reason about which shared module it could affect.", "ProjectFlowで『小さく見える』別の変更（例：日付フォーマットの変更）を考え、それがどの共有モジュールに影響しうるか推論してみよう。"),
    ] },
  { heading: { vi: "8. Xây bộ smoke/regression phân tầng & đo lường hiệu quả", en: "8. Building a tiered smoke/regression suite & measuring impact", ja: "8. 階層化スモーク/リグレッションスイートの構築と効果測定" },
    blocks: [
      P("Kết hợp mọi kỹ thuật đã học, một đội trưởng thành không dùng MỘT bộ hồi quy phẳng, mà chia thành nhiều TẦNG theo mức ưu tiên và ngân sách thời gian. ProjectFlow tổ chức ba tầng: Tier 0 (smoke) chỉ khoảng 12 ca sống còn (đăng nhập, tạo task, thanh toán cơ bản), chạy trong 8 phút và có quyền CHẶN release nếu fail. Tier 1 (core regression) là 96 ca được chọn theo điểm ưu tiên ở chương 5, chạy trong 45 phút, cũng là điều kiện bắt buộc để release. Tier 2 (full regression) chạy toàn bộ 1.240 ca, không chặn release nhưng chạy song song trên CI vào ban đêm để bắt các lỗi còn sót lại sớm nhất có thể.",
        "Combining everything learned, a mature team doesn't use ONE flat regression suite, but splits it into TIERS by priority and time budget. ProjectFlow organizes three tiers: Tier 0 (smoke) is just about 12 life-critical cases (login, create task, basic billing), runs in 8 minutes, and can BLOCK release on failure. Tier 1 (core regression) is the 96 cases selected by the chapter 5 priority score, runs in 45 minutes, and is also mandatory for release. Tier 2 (full regression) runs all 1,240 cases, doesn't block release but runs in parallel on CI overnight to catch remaining bugs as early as possible.",
        "これまで学んだことを組み合わせると、成熟したチームは1つのフラットなリグレッションスイートではなく、優先度と時間予算によって複数の層に分けます。ProjectFlowは3層で構成します：Tier 0（スモーク）は約12件の致命的ケース（ログイン、タスク作成、基本課金）のみで8分で実行され、fail時はリリースをブロックする権限を持ちます。Tier 1（コアリグレッション）は第5章の優先度スコアで選ばれた96ケースで45分で実行され、これもリリースの必須条件です。Tier 2（フルリグレッション）は全1,240ケースを実行し、リリースはブロックしませんが、残存バグをできるだけ早く検出するため夜間にCIで並列実行されます。"),
      IMG(m_tier, "Kiến trúc bộ hồi quy phân tầng smoke → core regression → full regression của ProjectFlow", "ProjectFlow's tiered regression architecture: smoke → core regression → full regression", "ProjectFlowの階層化リグレッションアーキテクチャ：スモーク→コアリグレッション→フルリグレッション"),
      P("Kiến trúc phân tầng này giải quyết đúng mâu thuẫn ở chương 3: Tier 0 và Tier 1 đủ nhanh (dưới 1 giờ) để không cản trở continuous delivery, trong khi Tier 2 vẫn đảm bảo không có ca nào bị bỏ HOÀN TOÀN — chỉ bị lùi lại chạy sau khi release, đóng vai trò lưới an toàn cuối cùng. Nếu Tier 2 phát hiện lỗi, đội xử lý bằng hotfix nhanh thay vì để lỗi tồn tại vô thời hạn.",
        "This tiered architecture solves exactly the tension from chapter 3: Tier 0 and Tier 1 are fast enough (under an hour) not to block continuous delivery, while Tier 2 still ensures no case is COMPLETELY dropped — it's just deferred to run after release, acting as a final safety net. If Tier 2 finds a bug, the team handles it with a fast hotfix instead of letting it linger indefinitely.",
        "この階層化アーキテクチャは、まさに第3章の緊張関係を解決します：Tier 0とTier 1は十分に高速（1時間未満）で継続的デリバリーを妨げず、Tier 2はどのケースも完全に削除されないことを保証します——リリース後に実行が延期されるだけで、最終的な安全網として機能します。Tier 2がバグを見つけた場合、チームは無期限に放置するのではなく迅速なホットフィックスで対応します。"),
      TIP("Đặt ngưỡng ngân sách Tier 1 CỐ ĐỊNH (ví dụ luôn ≤ 60 phút) thay vì để nó phình to dần theo thời gian — buộc đội phải liên tục tái chấm điểm ưu tiên và loại ca đã hết giá trị thay vì chỉ cộng dồn thêm ca mới.", "Set a FIXED Tier 1 time budget (e.g. always ≤ 60 minutes) instead of letting it grow over time — this forces the team to keep re-scoring priority and retiring cases that lost value, instead of just piling on new ones.", "Tier 1の時間予算を固定（例：常に60分以下）し、時間とともに膨張させない——これによりチームは新しいケースを積み上げるだけでなく、常に優先度を再採点し価値を失ったケースを引退させることを強制されます。"),
      IMG(m_dash, "Số liệu: kiểm thử hồi quy chọn lọc tiết kiệm 32,5 giờ nhưng vẫn giữ 94% khả năng bắt lỗi Critical", "Metrics: selective regression testing saves 32.5 hours while keeping 94% Critical bug-catching power", "指標：選択的リグレッションテストは32.5時間を節約しつつ、Criticalバグ検出力の94%を維持"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Khi mới áp dụng kiểm thử hồi quy chọn lọc & ưu tiên ca, đội ngũ thường vấp vài lỗi giống nhau. Biết trước giúp bạn triển khai hiệu quả hơn mà không đánh đổi chất lượng.",
        "When newly adopting regression test selection & prioritization, teams often stumble on a few common mistakes. Knowing them helps you implement it more effectively without trading away quality.",
        "選択的リグレッションテストと優先度付けを新たに導入する際、チームはよく同じような失敗をします。事前に知ることで、品質を犠牲にせずより効果的に導入できます。"),
      PITFALL("Chấm điểm rủi ro/lịch sử lỗi MỘT LẦN rồi dùng mãi mãi — trong khi module nào rủi ro cao có thể thay đổi theo từng sprint khi code được refactor hoặc feature mới ra đời.", "Scoring risk/defect history ONCE and reusing it forever — while which modules are high-risk can shift sprint by sprint as code gets refactored or new features ship.", "リスク/障害履歴を一度だけ採点しそれを永久に使い回すこと——コードがリファクタリングされたり新機能がリリースされたりするたびに、どのモジュールが高リスクかは変化し得ます。"),
      PITFALL("Chỉ dùng dependency graph TĨNH (khai báo import) mà bỏ qua phụ thuộc RUNTIME (ví dụ gọi qua queue/event, cấu hình động) — như ca hotfix Notes/Billing ở chương 7, quan hệ phụ thuộc đó không hiện rõ trong import tĩnh.", "Only using a STATIC dependency graph (declared imports) while ignoring RUNTIME dependencies (e.g. calls via queue/event, dynamic config) — like the Notes/Billing hotfix case in chapter 7, where that relationship wasn't visible in static imports.", "静的な依存関係グラフ（宣言されたimport）のみを使用し、実行時の依存関係（キュー/イベント経由の呼び出し、動的設定など）を無視すること——第7章のNotes/Billingホットフィックスのケースのように、その関係は静的importには現れません。"),
      TIP("Trước khi báo một ca ở nhóm 'P3 — cắt nếu hết giờ', tự hỏi: 'Nếu module này hỏng, có tenant nào KHÔNG nhận ra ngay không?' — những lỗi âm thầm (silent failure, như tính sai số liệu) thường nguy hiểm hơn lỗi ồn ào (crash rõ ràng), nên cần nâng hạng ưu tiên dù tần suất dùng thấp.", "Before dropping a case into the 'P3 — cut if time runs out' group, ask: 'If this module breaks, would any tenant NOT notice right away?' — silent failures (like miscalculated figures) are often more dangerous than loud ones (an obvious crash), so they may deserve a priority bump even with low usage frequency.", "『P3——時間切れなら削減』グループにケースを入れる前に自問しよう：『このモジュールが壊れたら、気づかないテナントがいるか？』——サイレント障害（数値の誤計算など）は明らかなクラッシュより危険なことが多く、利用頻度が低くても優先度を引き上げるべき場合があります。"),
      IMG(m_kanban, "Bảng theo dõi tiến độ chạy các tầng hồi quy trước release — dùng làm checklist khi thời gian có hạn", "A board tracking regression-tier progress before release — use as a checklist when time is limited", "リリース前のリグレッション層の進捗を追跡するボード — 時間が限られる時のチェックリストとして使用"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử hồi quy & smoke test cho người mới", "Regression & smoke testing for beginners", "kiem-thu-hoi-quy-smoke-test-cho-nguoi-moi", "初心者のためのリグレッション・スモークテスト"),
      INTERNAL("Kiểm thử dựa trên rủi ro (Risk-based Testing) cho tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
      INTERNAL("Phân biệt Smoke Test và Sanity Test cho người mới", "Smoke test vs sanity test for beginners", "phan-biet-smoke-test-sanity-test-cho-nguoi-moi", "初心者のためのスモークテストとサニティテストの違い"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chọn tập hồi quy tối ưu khi không đủ thời gian trên dự án SaaS đa tenant ProjectFlow: phân biệt retest-all/chọn lọc/ưu tiên ca, ba nguồn dữ liệu để chọn tập (vùng ảnh hưởng, rủi ro, lịch sử lỗi), cách chấm điểm ưu tiên theo công thức 3 trục, hai tình huống thật cho thấy cắt tập theo cảm tính hoặc bỏ qua module dùng chung đều nguy hiểm, và cách xây bộ smoke/regression phân tầng để vừa release nhanh vừa giữ chất lượng. Đây là kỹ năng chiến lược giúp bạn kiểm soát rủi ro thay vì chỉ chạy theo checklist có sẵn.",
        "You just learned how to select an optimal regression set when time is limited on ProjectFlow, a multi-tenant SaaS project: telling retest-all/selective/prioritization apart, three data sources for selection (impact, risk, defect history), a 3-axis priority scoring formula, two real situations showing that cutting the set by gut feeling or ignoring shared modules are both dangerous, and how to build a tiered smoke/regression suite that releases fast while keeping quality. This is a strategic skill that lets you control risk instead of just following a fixed checklist.",
        "マルチテナントSaaSプロジェクトProjectFlowで、時間が限られる時に最適なリグレッション集合を選ぶ方法を学びました：retest-all/選択/優先度付けの区別、集合選択のための3つの情報源（影響範囲、リスク、障害履歴）、3軸の優先度採点公式、勘での削減や共有モジュールの無視がどちらも危険であることを示す2つの実例、そして品質を維持しながら高速リリースする階層化スモーク/リグレッションスイートの構築方法。これは決まったチェックリストに従うだけでなく、リスクをコントロールするための戦略的スキルです。"),
      P("Chặng tiếp theo, bạn nên đào sâu kiểm thử dựa trên rủi ro (risk-based testing) để áp dụng cách chấm điểm tương tự cho cả việc thiết kế ca mới, không chỉ chọn ca hồi quy. Nếu muốn luyện các kỹ thuật chiến lược này trên dự án mô phỏng doanh nghiệp cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận vai trò dẫn dắt chất lượng release.",
        "Next, you should dig deeper into risk-based testing to apply a similar scoring approach to designing new cases too, not just selecting regression ones. If you want to practice these strategic techniques on enterprise-like projects with a mentor, a structured Tester course helps you progress fast and confidently take on a release-quality leadership role.",
        "次は、リグレッションケースの選択だけでなく新規ケース設計にも同様の採点アプローチを適用できるよう、リスクベーステストをさらに深く学ぶべきです。指導者と共に企業を模した案件でこれらの戦略的技法を練習したいなら、体系的なテスターコースが速い成長とリリース品質のリーダーシップ役割への自信を助けます。"),
      CTA(course),
    ] },
];

export const MA_REGSEL_01 = [makeDoc({
  slug: "kiem-thu-hoi-quy-chon-loc-uu-tien-cho-tester",
  domain: "saas",
  primaryKeyword: "kiểm thử hồi quy chọn lọc",
  keywords: ["kiểm thử hồi quy chọn lọc", "regression test selection", "ưu tiên test case", "test case prioritization", "risk-based regression testing", "bộ hồi quy phân tầng"],
  coverLabel: "NÂNG CAO · HỒI QUY CHỌN LỌC · SAAS",
  crumb: "Kiểm thử hồi quy chọn lọc & ưu tiên ca (Regression Test Selection & Prioritization)",
  metaTitle: { vi: "Kiểm thử hồi quy chọn lọc & ưu tiên ca cho Tester", en: "Regression test selection & prioritization for testers", ja: "テスターのための選択的リグレッションテストと優先度付け" },
  metaDescription: {
    vi: "Kiểm thử hồi quy chọn lọc cho SaaS đa tenant: chọn ca theo vùng ảnh hưởng, rủi ro, lịch sử lỗi; ưu tiên ca & xây bộ smoke/regression phân tầng, có trắc nghiệm.",
    en: "Regression test selection for multi-tenant SaaS: choosing cases by change impact, risk, and defect history; prioritization and a tiered smoke/regression suite, with real examples and a quiz.",
    ja: "マルチテナントSaaS向け選択的リグレッションテスト：変更影響範囲・リスク・障害履歴によるケース選択、優先度付け、階層化スモーク/リグレッションスイートの構築、実例とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử hồi quy chọn lọc & ưu tiên ca cho Tester: chọn tập tối ưu khi hết thời gian (có trắc nghiệm)",
    en: "Regression test selection & prioritization for testers: choosing the optimal set when time runs out (with quiz)",
    ja: "テスターのための選択的リグレッションテストと優先度付け：時間切れ時に最適な集合を選ぶ（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: chọn tập kiểm thử hồi quy tối ưu trên SaaS quản lý dự án đa tenant ProjectFlow khi không đủ thời gian chạy hết. Ba chiến lược retest-all/chọn lọc/ưu tiên ca, chọn theo vùng ảnh hưởng thay đổi (dependency graph), rủi ro nghiệp vụ và lịch sử lỗi, công thức chấm điểm ưu tiên 3 trục, hai tình huống thật (cắt bừa vs hotfix ảnh hưởng module dùng chung), xây bộ smoke/regression phân tầng, nhiều mockup, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: selecting the optimal regression test set on ProjectFlow, a multi-tenant SaaS PM product, when there's not enough time to run everything. Three strategies (retest-all/selective/prioritization), selection by change impact (dependency graph), business risk and defect history, a 3-axis priority scoring formula, two real situations (a random cut vs a hotfix rippling into a shared module), building a tiered smoke/regression suite, many mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級記事：マルチテナントSaaSのプロジェクト管理製品ProjectFlowで、全件実行する時間が足りない時に最適なリグレッションテスト集合を選択する方法。3つの戦略（retest-all/選択/優先度付け）、変更影響範囲（依存関係グラフ）・ビジネスリスク・障害履歴による選択、3軸の優先度採点公式、2つの実例（ランダム削減 vs 共有モジュールに波及するホットフィックス）、階層化スモーク/リグレッションスイートの構築、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chọn tập hồi quy chọn lọc & ưu tiên ca", steps: [
    { name: "Dựng vùng ảnh hưởng thay đổi", text: "Đọc git diff và dependency graph để biết thay đổi lan tới module nào." },
    { name: "Chấm điểm ưu tiên theo 3 trục", text: "Rủi ro nghiệp vụ, lịch sử lỗi, tần suất dùng thật." },
    { name: "Chọn tập theo ngân sách thời gian & xây bộ phân tầng", text: "Sắp ca theo điểm giảm dần; tách Tier 0 smoke, Tier 1 core, Tier 2 full." },
  ] },
  pages,
})];
