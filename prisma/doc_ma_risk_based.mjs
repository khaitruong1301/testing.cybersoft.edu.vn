// doc_ma_risk_based.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử dựa trên rủi ro (Risk-Based Testing) — nhận diện rủi ro (khả năng × ảnh hưởng),
// dựng ma trận rủi ro, phân bổ công sức test theo mức rủi ro, chọn ca ưu tiên khi thiếu thời gian,
// gắn RBT với từng release. Dự án: hệ thống tính phí & bồi thường bảo hiểm AnBinhCore.
// Song ngữ vi/en/ja (ja≠en), 12 chương, nhiều MOCKUP giao diện (ui_mock), trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, dashboard } from "./ui_mock.mjs";

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
    tags: tags("congnghe", "insurance", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình xử lý bồi thường AnBinhCore, khoanh vùng trường rủi ro CAO ──
const m_claims = browser("anbinhcore.vn/boi-thuong/HS-BT-55210", [
  field(24, 20, 330, "Mã hồ sơ bồi thường", "HS-BT-55210", "normal"),
  field(372, 20, 330, "Loại tổn thất", "Va chạm — Xe cơ giới", "normal"),
  field(24, 92, 330, "Số tiền yêu cầu bồi thường", "185.000.000 ₫", "focus"),
  field(372, 92, 330, "Tỷ lệ trách nhiệm (%)", "70%", "focus"),
  field(24, 164, 330, "Hạn mức hợp đồng", "200.000.000 ₫", "normal"),
  `<text x="372" y="176" font-size="11" font-weight="700" fill="#475569">Số tiền chi trả (tính toán)</text>
<rect x="372" y="186" width="330" height="30" rx="8" fill="#eef2ff" stroke="#4338ca" stroke-width="2"/>
<text x="384" y="206" font-size="13" font-weight="800" fill="#4338ca">129.500.000 ₫</text>`,
  btn(24, 236, 180, "Duyệt chi trả", "primary"), btn(212, 236, 140, "Từ chối", "ghost"),
  annotate(368, 12, 330, 62, "VÙNG RỦI RO CAO: sai tỷ lệ → chi sai tiền"),
  annotate(20, 12, 330, 62, "RỦI RO CAO: vượt hạn mức hợp đồng"),
].join(""), { h: 300, title: "AnBinhCore · Bồi thường", accent: "#4338ca" });

// ── Mockup 2: ma trận rủi ro Khả năng × Ảnh hưởng ──
const m_matrix = grid("Ma trận rủi ro — Khả năng × Ảnh hưởng (AnBinhCore)",
  ["Ảnh hưởng ↓ / Khả năng →", "1-Hiếm", "2-Thấp", "3-T.bình", "4-Cao", "5-Rất cao"], [
    ["5-Nghiêm trọng", "5", "10", "15 (ĐỎ)", "20 (ĐỎ)", "25 (ĐỎ)"],
    ["4-Lớn", "4", "8", "12 (VÀNG)", "16 (ĐỎ)", "20 (ĐỎ)"],
    ["3-Trung bình", "3", "6", "9 (VÀNG)", "12 (VÀNG)", "15 (ĐỎ)"],
    ["2-Nhỏ", "2", "4", "6 (VÀNG)", "8 (VÀNG)", "10 (VÀNG)"],
    ["1-Không đáng kể", "1", "2", "3", "4", "5"],
  ], { accent: "#4338ca", note: "Điểm rủi ro = Khả năng × Ảnh hưởng. ≥15: ĐỎ (ưu tiên tối đa) · 6–14: VÀNG (cân đối) · ≤5: XANH (kiểm tối thiểu)." });

// ── Mockup 3: màn hình báo giá phí bảo hiểm — nơi công thức tính phí là vùng rủi ro ĐỎ ──
const m_quote = browser("anbinhcore.vn/bao-gia/xe-co-gioi", [
  field(24, 20, 330, "Tuổi tài xế chính", "34", "normal"),
  field(372, 20, 330, "Loại xe", "Sedan 5 chỗ — 2021", "normal"),
  field(24, 92, 330, "Số năm không tai nạn", "3", "normal"),
  field(372, 92, 330, "Mức khấu trừ (deductible)", "2.000.000 ₫", "normal"),
  `<text x="24" y="176" font-size="11" font-weight="700" fill="#475569">Phí bảo hiểm/năm (công thức tính)</text>
<rect x="24" y="186" width="330" height="30" rx="8" fill="#eef2ff" stroke="#4338ca" stroke-width="2"/>
<text x="36" y="206" font-size="13" font-weight="800" fill="#4338ca">8.420.000 ₫</text>`,
  btn(24, 236, 200, "Xác nhận mua", "primary"),
  annotate(20, 168, 334, 62, "VÙNG RỦI RO CAO: công thức tính phí sai → thất thoát/lỗ hợp đồng"),
].join(""), { h: 320, title: "AnBinhCore · Báo giá", accent: "#4338ca" });

// ── Mockup 4: bảng phân bổ công sức test theo mức rủi ro ──
const m_effort = grid("Phân bổ công sức test theo mức rủi ro — Sprint bồi thường xe cơ giới", ["Mức rủi ro", "Điểm số", "Ví dụ tính năng AnBinhCore", "% công sức đề xuất", "Kỹ thuật ưu tiên"], [
  ["Đỏ (Cao)", "15–25", "Duyệt chi trả vượt hạn mức; công thức tính phí bảo hiểm", "~55%", "Toàn luồng + giá trị biên + hồi quy tự động"],
  ["Vàng (T.bình)", "6–14", "Tính khấu trừ; đồng bộ dữ liệu tái bảo hiểm", "~30%", "Ca chính + vài ca biên quan trọng"],
  ["Xanh (Thấp)", "1–5", "Định dạng hiển thị tiền tệ; sắp xếp danh sách hồ sơ", "~15%", "Smoke test / kiểm tra nhanh"],
], { accent: "#4338ca", highlight: 0, note: "Không chia đều 33/33/33 — vùng ĐỎ luôn nhận phần lớn công sức và chạy sớm nhất trong sprint." });

// ── Mockup 5: ticket Jira lỗi tìm được ở vùng rủi ro CAO ──
const m_jira = jira({
  key: "ANB-9042", title: "Hồ sơ HS-BT-55210: hệ thống chi trả 129.500.000đ nhưng công thức đúng phải là 700.000đ (lệch tỷ lệ trách nhiệm)",
  type: "Bug", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "staging · AnBinhCore · module Bồi thường xe cơ giới"],
    ["Vùng rủi ro", "ĐỎ (khả năng=4, ảnh hưởng=5, điểm=20)"],
    ["Các bước", "1) Mở hồ sơ HS-BT-55210 2) Nhập Tỷ lệ trách nhiệm=70% 3) Xem Số tiền chi trả tính toán"],
    ["Kết quả mong đợi", "Số tiền chi trả = Số tiền yêu cầu × Tỷ lệ trách nhiệm, có so hạn mức hợp đồng"],
    ["Kết quả thực tế", "Hệ thống áp nhầm công thức cộng dồn phụ phí, chi trả sai lệch gần 128,8 triệu đồng"],
    ["Ảnh hưởng", "Thất thoát tài chính lớn nếu duyệt hàng loạt; rủi ro vi phạm tuân thủ nghiệp vụ bảo hiểm"],
  ],
});

// ── Mockup 6: dashboard mức phủ kiểm thử theo mức rủi ro qua các release ──
const m_dash = dashboard("Mức phủ kiểm thử theo rủi ro — AnBinhCore (Release 4.2)", [
  { label: "Ca vùng ĐỎ đã chạy", value: "100%", sub: "42/42 ca — bắt buộc trước release", color: "#dc2626" },
  { label: "Ca vùng VÀNG đã chạy", value: "78%", sub: "39/50 ca", color: "#d97706" },
  { label: "Ca vùng XANH đã chạy", value: "40%", sub: "12/30 ca — smoke only", color: "#16a34a" },
  { label: "Lỗi Critical/High tìm được", value: "6", sub: "5/6 nằm ở vùng ĐỎ", color: "#4338ca" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử dựa trên rủi ro (Risk-Based Testing) là gì?",
  "What is risk-based testing?",
  "Kiểm thử dựa trên rủi ro là chiến lược ưu tiên công sức kiểm thử theo mức độ rủi ro của từng tính năng, thay vì kiểm thử dàn trải như nhau cho mọi phần. Mức rủi ro được tính bằng KHẢ NĂNG xảy ra sự cố nhân với ẢNH HƯỞNG nếu sự cố đó xảy ra. Vùng rủi ro cao nhận nhiều ca kiểm thử, kỹ thuật kỹ hơn và chạy sớm nhất; vùng rủi ro thấp chỉ cần kiểm tra nhanh.",
  "Risk-based testing is a strategy that prioritizes testing effort by each feature's risk level instead of testing everything equally. Risk level is calculated as the LIKELIHOOD of a failure occurring multiplied by its IMPACT if it does. High-risk areas get more test cases, deeper techniques and run earliest; low-risk areas only need a quick check.",
  "リスクベーステスト（Risk-Based Testing）とは？",
  "リスクベーステストとは、全機能を均等にテストするのではなく、各機能のリスクレベルに応じてテスト工数の優先順位を付ける戦略です。リスクレベルは、障害が発生する可能性（尤度）とその影響度を掛け合わせて算出します。リスクの高い領域には多くのテストケース、より深い技法を割り当てて最初に実行し、リスクの低い領域は簡易確認のみで済ませます。");
const faq2 = FAQ(
  "Vì sao RBT đặc biệt quan trọng ở hệ thống bảo hiểm?",
  "Why does RBT matter especially for insurance systems?",
  "Vì hệ thống bảo hiểm xử lý trực tiếp tiền của khách hàng và công ty: tính sai phí bảo hiểm hoặc chi trả bồi thường sai có thể gây thất thoát tài chính lớn, vi phạm quy định giám sát của cơ quan quản lý bảo hiểm, và làm mất uy tín thương hiệu. Với thời gian kiểm thử luôn hữu hạn, RBT giúp đội đảm bảo những công thức tính tiền và quy tắc duyệt hạn mức — nơi một lỗi nhỏ gây thiệt hại lớn — luôn được kiểm kỹ nhất trước khi release.",
  "Because insurance systems handle customers' and the company's money directly: a wrong premium calculation or wrong claim payout can cause major financial loss, violate insurance regulator compliance rules, and damage brand trust. Since testing time is always limited, RBT ensures the money-calculation formulas and payout-limit rules — where a small bug causes large damage — are always tested most thoroughly before release.",
  "RBTが保険システムで特に重要な理由は？",
  "保険システムは顧客と会社の資金を直接扱うため、保険料計算や保険金支払いの誤りは、大きな財務損失、保険監督当局のコンプライアンス違反、ブランド信用の失墜につながりかねません。テスト時間が常に有限である以上、RBTは小さなバグが大きな損害を招く金額計算式や支払限度ルールを、リリース前に最も丁寧に検証することを保証します。");
const faq3 = FAQ(
  "Khi thiếu thời gian, làm sao chọn đúng ca kiểm thử ưu tiên theo RBT?",
  "When time is short, how do you correctly pick priority test cases with RBT?",
  "Dựa vào ma trận rủi ro đã dựng sẵn: chạy hết ca ở vùng ĐỎ (rủi ro cao) trước tiên — đây là điều kiện bắt buộc trước khi release, không thương lượng. Sau đó nếu còn thời gian mới chạy vùng VÀNG theo thứ tự điểm rủi ro giảm dần. Vùng XANH có thể chỉ chạy smoke test hoặc dời sang release sau. Tuyệt đối không chọn ca theo cảm tính hay theo thứ tự viết sẵn trong tài liệu — luôn theo điểm rủi ro.",
  "Based on the pre-built risk matrix: run every case in the RED zone (high risk) first — this is a non-negotiable release gate. Then, if time remains, run YELLOW zone cases in descending risk-score order. GREEN zone can be limited to a smoke test or deferred to the next release. Never pick cases by gut feeling or by the order they were written in a document — always follow the risk score.",
  "時間が足りない時、RBTで正しく優先ケースを選ぶには？",
  "事前に作成したリスクマトリクスに基づきます：まず赤ゾーン（高リスク）の全ケースを実行——これはリリース前の必須条件で交渉の余地はありません。時間が残れば、黄ゾーンをリスクスコアの高い順に実行します。緑ゾーンはスモークテストのみ、または次リリースに延期して構いません。感覚や資料に書かれた順番でケースを選ぶことは絶対に避け、常にリスクスコアに従います。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trong Risk-Based Testing, mức độ rủi ro của một tính năng được tính như thế nào?", en: "In risk-based testing, how is a feature's risk level calculated?", ja: "リスクベーステストで、機能のリスクレベルはどう算出する？" },
    options: [
      { vi: "Chỉ dựa vào số dòng code của tính năng", en: "Only based on the feature's lines of code", ja: "機能のコード行数だけに基づく" },
      { vi: "Khả năng xảy ra sự cố nhân với mức độ ảnh hưởng nếu sự cố xảy ra", en: "Likelihood of failure multiplied by impact if it occurs", ja: "障害発生の可能性と発生時の影響度の積" },
      { vi: "Số lượng lập trình viên phụ trách tính năng đó", en: "The number of developers assigned to the feature", ja: "その機能を担当する開発者の人数" },
      { vi: "Thời gian phát triển tính năng đó", en: "The development time of the feature", ja: "その機能の開発時間" },
    ], correct: 1,
    explain: { vi: "Điểm rủi ro = Khả năng × Ảnh hưởng — hai trục cốt lõi của ma trận rủi ro.", en: "Risk score = Likelihood × Impact — the two core axes of the risk matrix.", ja: "リスクスコア＝可能性×影響度——リスクマトリクスの2つの中核軸です。" },
  }),
  mcq({
    q: { vi: "Một tính năng có Khả năng=4 (Cao) và Ảnh hưởng=5 (Nghiêm trọng) nên được xếp vào mức nào trên ma trận rủi ro?", en: "A feature with Likelihood=4 (High) and Impact=5 (Critical) should be classified as which zone?", ja: "可能性＝4（高）、影響度＝5（重大）の機能はどの区分になる？" },
    options: [
      { vi: "Xanh — ưu tiên thấp", en: "Green — low priority", ja: "緑 — 低優先" },
      { vi: "Vàng — ưu tiên trung bình", en: "Yellow — medium priority", ja: "黄 — 中優先" },
      { vi: "Đỏ — ưu tiên cao nhất (điểm 20)", en: "Red — highest priority (score 20)", ja: "赤 — 最優先（スコア20）" },
      { vi: "Không cần kiểm thử", en: "No testing needed", ja: "テスト不要" },
    ], correct: 2,
    explain: { vi: "4×5=20 ≥15 → vùng ĐỎ, cần kiểm thử kỹ nhất và chạy sớm nhất.", en: "4×5=20 ≥15 → RED zone, needs the most thorough and earliest testing.", ja: "4×5＝20≥15→赤ゾーン、最も丁寧かつ最優先でテストが必要。" },
  }),
  mcq({
    q: { vi: "Khi chỉ còn rất ít thời gian trước release, chiến lược RBT hợp lý nhất là gì?", en: "When very little time remains before release, what is the most sensible RBT strategy?", ja: "リリース前に時間がほとんど残っていない場合、最も妥当なRBT戦略は？" },
    options: [
      { vi: "Test ngẫu nhiên cho đến khi hết giờ", en: "Test randomly until time runs out", ja: "時間切れまでランダムにテストする" },
      { vi: "Bỏ test hoàn toàn, tin tưởng lập trình viên", en: "Skip testing entirely, trust the developers", ja: "テストを完全に省略し、開発者を信頼する" },
      { vi: "Ưu tiên chạy hết ca ở vùng rủi ro Đỏ trước; vùng Xanh có thể lược bớt", en: "Prioritize running all Red-zone cases first; Green-zone cases can be trimmed", ja: "赤ゾーンのケースを最優先で全て実行し、緑ゾーンは省略してよい" },
      { vi: "Chỉ test giao diện vì dễ thấy lỗi nhất", en: "Only test the UI because bugs are easiest to spot there", ja: "バグが見つけやすいUIだけをテストする" },
    ], correct: 2,
    explain: { vi: "RBT dùng chính lúc thời gian eo hẹp để phát huy giá trị: đảm bảo vùng ảnh hưởng tiền/tuân thủ được kiểm trước.", en: "RBT proves its value exactly when time is tight: it ensures money/compliance-critical areas are checked first.", ja: "RBTは時間が限られる時こそ真価を発揮：金銭・コンプライアンスに関わる領域を最優先で確認します。" },
  }),
  mcq({
    q: { vi: "Vì sao bỏ qua kiểm thử ở vùng rủi ro cao (ví dụ số tiền chi trả bồi thường) đặc biệt nguy hiểm với hệ thống bảo hiểm?", en: "Why is skipping testing in a high-risk area (e.g. claim payout amount) especially dangerous for an insurance system?", ja: "保険金支払額のような高リスク領域のテストを省略するのが保険システムで特に危険な理由は？" },
    options: [
      { vi: "Vì giao diện sẽ trông xấu hơn", en: "Because the UI will look worse", ja: "UIの見た目が悪くなるから" },
      { vi: "Vì có thể gây chi trả sai, thất thoát tài chính lớn và vi phạm tuân thủ nghiệp vụ", en: "Because it can cause wrong payouts, major financial loss and compliance violations", ja: "誤支払い、大きな財務損失、業務コンプライアンス違反を招き得るから" },
      { vi: "Vì trang sẽ tải chậm hơn", en: "Because the page will load slower", ja: "ページの読み込みが遅くなるから" },
      { vi: "Vì không có ảnh hưởng gì đáng kể", en: "Because it has no significant effect", ja: "重大な影響はないから" },
    ], correct: 1,
    explain: { vi: "Một lỗi công thức chi trả nhân lên hàng loạt hồ sơ có thể gây thiệt hại tài chính rất lớn và rủi ro pháp lý.", en: "A payout-formula bug multiplied across many claims can cause huge financial damage and legal risk.", ja: "支払計算式のバグが多数の案件に波及すると、莫大な財務損害と法的リスクを招きます。" },
  }),
  mcq({
    q: { vi: "RBT nên được gắn với từng release như thế nào?", en: "How should RBT be tied to each release?", ja: "RBTは各リリースにどう結び付けるべき？" },
    options: [
      { vi: "Chỉ đánh giá rủi ro một lần khi dự án bắt đầu, không cập nhật lại", en: "Assess risk only once at project start, never update it", ja: "プロジェクト開始時に1回だけリスク評価し、二度と更新しない" },
      { vi: "Đánh giá lại rủi ro mỗi release dựa trên thay đổi thực tế (code diff, lịch sử lỗi) để phân bổ lại công sức test", en: "Re-assess risk every release based on actual changes (code diff, defect history) to reallocate test effort", ja: "実際の変更（コード差分・不具合履歴）に基づき毎リリースでリスクを再評価し、テスト工数を再配分する" },
      { vi: "Luôn test 100% mọi tính năng ở mọi release bất kể thay đổi", en: "Always test 100% of every feature every release regardless of changes", ja: "変更に関係なく毎リリース全機能を100%テストする" },
      { vi: "Rủi ro không đổi giữa các release nên không cần đánh giá lại", en: "Risk never changes between releases so no reassessment is needed", ja: "リリース間でリスクは変わらないので再評価は不要" },
    ], correct: 1,
    explain: { vi: "RBT là hoạt động sống: mỗi release có thay đổi khác nhau nên ma trận rủi ro và phân bổ công sức cần cập nhật lại.", en: "RBT is a living activity: each release changes different things, so the risk matrix and effort allocation must be updated.", ja: "RBTは継続的な活動：各リリースで変更点が異なるため、リスクマトリクスと工数配分は都度更新が必要です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử dựa trên rủi ro (Risk-Based Testing — RBT) là cách phân bổ công sức kiểm thử theo mức rủi ro = khả năng xảy ra × ảnh hưởng nếu xảy ra, thay vì test dàn trải như nhau. Bài này bám hệ thống tính phí & bồi thường bảo hiểm xe cơ giới AnBinhCore: bạn học cách dựng ma trận rủi ro, phân bổ % công sức test theo mức Đỏ/Vàng/Xanh, chọn ca ưu tiên khi thiếu thời gian, và gắn RBT với từng release. Nhiều mockup thật và trắc nghiệm cuối bài.",
        "Risk-Based Testing (RBT) allocates testing effort by risk level = likelihood × impact, instead of testing everything equally. This article follows AnBinhCore, a motor-insurance premium and claims system: you learn to build a risk matrix, allocate test effort by Red/Yellow/Green level, pick priority cases when time is short, and tie RBT to each release. Real mockups and a quiz at the end.",
        "リスクベーステスト（RBT）は、全てを均等にテストするのではなく、リスクレベル＝可能性×影響度に応じてテスト工数を配分する手法です。本記事は自動車保険の保険料計算・保険金支払システム「AnBinhCore」に沿い、リスクマトリクスの作成、赤/黄/緑レベル別のテスト工数配分、時間が足りない時の優先ケース選定、各リリースへのRBTの結び付け方を学びます。実物のモックとクイズ付き。"),
      P("Ở dự án bảo hiểm, danh sách tính năng luôn dài hơn thời gian bạn có. Câu hỏi không phải là 'test được bao nhiêu' mà là 'test cái gì trước để nếu hết giờ, thiệt hại vẫn ở mức chấp nhận được'. Kiểm thử dựa trên rủi ro trả lời chính câu hỏi đó bằng một công thức rất đơn giản nhưng cực kỳ hiệu quả: Rủi ro = Khả năng xảy ra sự cố × Ảnh hưởng nếu sự cố đó xảy ra. Bài này đưa bạn vào hệ thống tính phí & bồi thường bảo hiểm xe cơ giới AnBinhCore của công ty AnBinh, nơi một lỗi công thức tính tiền có thể gây thiệt hại tài chính thật.",
        "In insurance projects, the feature list is always longer than the time you have. The question isn't 'how much can I test' but 'what should I test first so that if time runs out, the damage stays acceptable'. Risk-based testing answers exactly that with a simple but very effective formula: Risk = Likelihood of failure × Impact if it happens. This article puts you inside AnBinhCore, AnBinh company's motor-insurance premium and claims system, where a wrong money-calculation formula causes real financial damage.",
        "保険プロジェクトでは、機能リストは常に持ち時間より長くなります。問題は『どれだけテストできるか』ではなく『時間切れになっても被害が許容範囲に収まるよう何を先にテストするか』です。リスクベーステストはまさにこの問いに、シンプルかつ極めて有効な公式で答えます：リスク＝障害発生の可能性×発生時の影響度。本記事ではAnBinh社の自動車保険の保険料計算・保険金支払システム「AnBinhCore」に入ります。ここでは金額計算式の誤りが実際の財務損害を引き起こします。"),
      IMG(m_claims, "Màn hình test: xử lý bồi thường AnBinhCore, khoanh vùng các trường rủi ro cao (tỷ lệ trách nhiệm, hạn mức)", "Screen under test: AnBinhCore's claims processing, high-risk fields highlighted (liability ratio, policy limit)", "テスト対象画面：AnBinhCoreの保険金支払処理、高リスク項目（責任割合・契約限度額）を強調表示"),
      DEF("Risk-Based Testing", "chiến lược ưu tiên công sức kiểm thử theo mức rủi ro (khả năng × ảnh hưởng) của từng tính năng thay vì dàn trải đều.",
        "a testing strategy that prioritizes effort by each feature's risk level (likelihood × impact) instead of spreading it evenly.",
        "各機能のリスクレベル（可能性×影響度）に応じてテスト工数の優先順位を付ける戦略。均等配分ではない。"),
    ] },
  { heading: { vi: "2. Rủi ro = Khả năng × Ảnh hưởng: định nghĩa & ma trận rủi ro", en: "2. Risk = Likelihood × Impact: definitions & the risk matrix", ja: "2. リスク＝可能性×影響度：定義とリスクマトリクス" },
    blocks: [
      P("Hai trục làm nên mọi quyết định trong RBT là KHẢ NĂNG (likelihood) — xác suất một sự cố xảy ra, thường ước lượng theo độ phức tạp code, tần suất thay đổi, lịch sử lỗi; và ẢNH HƯỞNG (impact) — mức độ thiệt hại nếu sự cố đó thật sự xảy ra, thường ước lượng theo tiền, số khách hàng bị ảnh hưởng, và rủi ro tuân thủ. Nhân hai trục này (thang 1–5) ta có điểm rủi ro từ 1 đến 25.",
        "The two axes behind every RBT decision are LIKELIHOOD — the probability a failure occurs, usually estimated from code complexity, change frequency and defect history; and IMPACT — the damage if that failure really happens, usually estimated from money, number of affected customers, and compliance risk. Multiplying these two axes (on a 1–5 scale) gives a risk score from 1 to 25.",
        "RBTのあらゆる判断を支える2軸は、可能性（Likelihood）——コードの複雑さ、変更頻度、不具合履歴などから見積もる障害発生の確率——と、影響度（Impact）——金額、影響を受ける顧客数、コンプライアンスリスクなどから見積もる、実際に発生した場合の被害の大きさです。この2軸（1〜5段階）を掛け合わせると、1〜25のリスクスコアが得られます。"),
      IMG(m_matrix, "Ma trận rủi ro 5×5 cho hệ thống AnBinhCore: điểm số và phân vùng Đỏ/Vàng/Xanh", "A 5×5 risk matrix for AnBinhCore: scores and Red/Yellow/Green zones", "AnBinhCoreの5×5リスクマトリクス：スコアと赤/黄/緑ゾーン"),
      DEF("Ma trận rủi ro", "bảng 5×5 (hoặc n×n) đối chiếu Khả năng và Ảnh hưởng, mỗi ô là một điểm rủi ro phân theo vùng Đỏ/Vàng/Xanh.",
        "a 5×5 (or n×n) table cross-referencing Likelihood and Impact, where each cell is a risk score classified into Red/Yellow/Green zones.",
        "可能性と影響度を対応させた5×5（またはn×n）の表。各セルはリスクスコアで、赤/黄/緑ゾーンに分類される。"),
      P("Điểm số không phải để trang trí báo cáo — nó là căn cứ để RA QUYẾT ĐỊNH: vùng ĐỎ (thường ≥15) là điều kiện bắt buộc phải kiểm kỹ trước khi release, không thương lượng; vùng VÀNG (6–14) cần cân đối giữa chi phí và lợi ích; vùng XANH (≤5) chỉ cần kiểm tra nhanh hoặc chấp nhận rủi ro còn lại (residual risk) mà không kiểm thêm. Cách phân vùng này biến một cuộc tranh luận cảm tính 'test cái này trước hay cái kia trước' thành một con số có thể so sánh khách quan.",
        "The score isn't for decorating a report — it's the basis for DECISION-MAKING: the RED zone (usually ≥15) is a non-negotiable release gate requiring thorough testing; the YELLOW zone (6–14) needs a cost-benefit balance; the GREEN zone (≤5) only needs a quick check or accepting the residual risk without further testing. This zoning turns a subjective argument like 'test this first or that first' into an objectively comparable number.",
        "スコアは報告書の飾りではなく意思決定の根拠です：赤ゾーン（通常≥15）はリリース前に丁寧なテストが必須で交渉の余地なし。黄ゾーン（6〜14）はコストと便益のバランスが必要。緑ゾーン（≤5）は簡易確認のみ、または追加テストなしで残留リスクを受容します。この区分により『どちらを先にテストするか』という主観的な議論が客観的に比較可能な数値になります。"),
    ] },
  { heading: { vi: "3. Vì sao RBT là bắt buộc ở dự án bảo hiểm", en: "3. Why RBT is mandatory on an insurance project", ja: "3. 保険案件でRBTが必須である理由" },
    blocks: [
      P("Hệ thống bảo hiểm chạm vào ba thứ nhạy cảm cùng lúc: TIỀN (phí bảo hiểm thu vào, tiền bồi thường chi ra), TUÂN THỦ (quy định của cơ quan giám sát bảo hiểm về khả năng thanh toán, minh bạch tính phí, chống gian lận), và UY TÍN (khách hàng mất niềm tin ngay khi biết công ty tính sai tiền của họ). Với ba yếu tố này, kiểm thử dàn trải đều cho mọi màn hình — kể cả những màn hình rủi ro thấp như trang danh sách — là lãng phí thời gian quý giá lẽ ra nên dồn cho công thức tính phí và quy tắc duyệt bồi thường.",
        "An insurance system touches three sensitive things at once: MONEY (premiums collected, claims paid out), COMPLIANCE (insurance regulator rules on solvency, pricing transparency, anti-fraud), and TRUST (customers lose confidence the moment they learn the company miscalculated their money). With these three factors, testing every screen equally — even low-risk ones like a list page — wastes precious time that should go to the premium formula and the claim-approval rules.",
        "保険システムは同時に3つのデリケートな要素に触れます：資金（徴収する保険料、支払う保険金）、コンプライアンス（保険監督当局の支払能力・料金透明性・不正防止に関する規制）、信用（自分の資金を誤計算されたと知った瞬間、顧客の信頼は失われます）。この3要素がある以上、一覧ページのような低リスク画面まで含めて全画面を均等にテストするのは、保険料計算式や保険金承認ルールに注ぐべき貴重な時間の浪費です。"),
      P("Thêm vào đó, tài chính bảo hiểm vận hành theo hiệu ứng nhân bản: một lỗi công thức không chỉ ảnh hưởng một khách hàng mà lặp lại trên hàng nghìn hồ sơ được tính bằng cùng công thức đó, trước khi ai đó phát hiện ra. RBT buộc đội kiểm thử phải trả lời rõ ràng câu hỏi 'nếu chỉ có 20% thời gian, ta bảo vệ 80% giá trị bằng cách nào' — và câu trả lời gần như luôn là: bảo vệ những nơi tiền chảy qua trước tiên.",
        "On top of that, insurance finance works with a multiplying effect: a formula bug doesn't affect just one customer, it repeats across thousands of policies computed with that same formula before anyone notices. RBT forces the testing team to clearly answer 'if we only have 20% of the time, how do we protect 80% of the value' — and the answer is almost always: protect where money flows first.",
        "さらに、保険の財務は倍増効果で動きます：計算式のバグは1人の顧客だけでなく、誰かが気づく前に同じ式で計算された何千もの契約に繰り返し影響します。RBTはテストチームに『時間が20%しかないなら、どうやって80%の価値を守るか』という問いに明確に答えることを求めます——その答えはほぼ常に『まず資金が流れる場所を守る』です。"),
      P("Vì thế, một tester biết dựng và vận dụng ma trận rủi ro thành thạo sẽ được giao những phần quan trọng nhất của hệ thống, và có tiếng nói đáng tin cậy khi tranh luận về việc có nên release đúng hạn hay lùi lại để kiểm thêm.",
        "So a tester who can build and skillfully apply a risk matrix gets entrusted with the system's most important parts, and has a credible voice when debating whether to release on time or delay for more testing.",
        "そのため、リスクマトリクスを構築し巧みに活用できるテスターは、システムの最重要部分を任され、予定通りリリースするか追加テストのため延期するかの議論で信頼される発言力を持ちます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: nhận diện rủi ro trên hệ thống AnBinhCore", en: "4. Prepare: identify risks on AnBinhCore", ja: "4. 準備：AnBinhCoreでのリスク特定" },
    blocks: [
      P("Trước khi có ma trận, bạn cần một danh sách rủi ro thô — liệt kê mọi thứ có thể sai, chưa cần chấm điểm vội. Nguồn tốt nhất là tài liệu nghiệp vụ, lịch sử lỗi sprint trước, và phỏng vấn nhanh BA/PO về những vùng họ lo nhất.",
        "Before there's a matrix, you need a raw risk list — everything that could go wrong, without scoring it yet. The best sources are business docs, the previous sprint's defect history, and a quick chat with BA/PO about the areas they worry about most.",
        "マトリクスを作る前に、まずスコアリングせずに『何が起こり得るか』の生のリスク一覧が必要です。最良の情報源は業務資料、前スプリントの不具合履歴、そしてBA/POへの『最も懸念している領域』についての簡単なヒアリングです。"),
      STEP(1, "Liệt kê mọi tính năng/luồng của module cần test (báo giá phí, xử lý bồi thường, đồng bộ tái bảo hiểm...), không lọc trước.", "List every feature/flow of the module under test (premium quote, claims processing, reinsurance sync...), without pre-filtering.", "テスト対象モジュールの全機能/フロー（保険料見積、保険金支払処理、再保険同期など）を事前に絞らず列挙する。"),
      STEP(2, "Với mỗi tính năng, ước lượng KHẢ NĂNG lỗi (1–5) dựa trên độ phức tạp công thức, tần suất thay đổi gần đây, và lịch sử lỗi.", "For each feature, estimate LIKELIHOOD (1–5) based on formula complexity, recent change frequency and defect history.", "各機能について、計算式の複雑さ・最近の変更頻度・不具合履歴に基づき可能性（1〜5）を見積もる。"),
      STEP(3, "Với mỗi tính năng, ước lượng ẢNH HƯỞNG (1–5) dựa trên số tiền liên quan, số khách hàng bị ảnh hưởng, và rủi ro tuân thủ.", "For each feature, estimate IMPACT (1–5) based on money involved, number of affected customers, and compliance risk.", "各機能について、関連金額・影響を受ける顧客数・コンプライアンスリスクに基づき影響度（1〜5）を見積もる。"),
      TRY("Chọn 1 tính năng bất kỳ trong AnBinhCore (ví dụ 'sắp xếp danh sách hồ sơ bồi thường') và tự ước lượng Khả năng, Ảnh hưởng của nó theo thang 1–5.", "Pick any AnBinhCore feature (e.g. 'sorting the claims list') and estimate its Likelihood and Impact on a 1–5 scale.", "AnBinhCoreの任意の機能（例：『保険金請求一覧の並べ替え』）を選び、可能性と影響度を1〜5で見積もろう。"),
      PITFALL("Chấm điểm rủi ro một mình dựa trên cảm tính của tester, không hỏi lại BA/PO hay đối chiếu lịch sử lỗi thật — dễ đánh giá sai và làm sai lệch cả ma trận.", "Scoring risk alone based on the tester's gut feeling, without checking with BA/PO or real defect history — easily miscalibrated, skewing the whole matrix.", "BA/POへの確認や実際の不具合履歴の照合なしに、テスター一人の感覚だけでリスクを採点する——評価がずれやすく、マトリクス全体を歪めます。"),
      IMG(m_quote, "Màn hình báo giá phí bảo hiểm AnBinhCore — công thức tính phí là ứng viên rủi ro cao", "AnBinhCore's premium quote screen — the pricing formula is a high-risk candidate", "AnBinhCoreの保険料見積画面 — 料金計算式は高リスク候補"),
    ] },
  { heading: { vi: "5. Các bước xây ma trận rủi ro & phân bổ công sức test", en: "5. Steps to build the risk matrix & allocate test effort", ja: "5. リスクマトリクス作成とテスト工数配分の手順" },
    blocks: [
      P("Từ danh sách rủi ro thô ở chương 4, bốn bước sau đưa bạn tới một bản phân bổ công sức test có căn cứ rõ ràng, có thể trình bày với quản lý dự án.",
        "From the raw risk list in chapter 4, these four steps take you to a well-justified test-effort allocation you can present to project management.",
        "第4章の生のリスク一覧から、以下の4ステップでプロジェクト管理者に説明できる根拠あるテスト工数配分に到達します。"),
      STEP(1, "Chấm điểm Khả năng × Ảnh hưởng cho từng tính năng, đối chiếu ma trận 5×5 để xác định vùng Đỏ/Vàng/Xanh.", "Score Likelihood × Impact for each feature, cross-reference the 5×5 matrix to determine Red/Yellow/Green zone.", "各機能で可能性×影響度を採点し、5×5マトリクスに照らして赤/黄/緑ゾーンを判定する。"),
      STEP(2, "Gom tính năng theo vùng, đối chiếu với bảng phân bổ % công sức (ĐỎ ~55%, VÀNG ~30%, XANH ~15%).", "Group features by zone, cross-reference the effort-allocation table (RED ~55%, YELLOW ~30%, GREEN ~15%).", "機能をゾーン別にまとめ、工数配分表（赤~55%、黄~30%、緑~15%）と照らし合わせる。"),
      STEP(3, "Với vùng ĐỎ, chọn kỹ thuật kỹ nhất (giá trị biên, bảng quyết định, hồi quy tự động); vùng XANH chỉ cần smoke test.", "For RED zones, pick the deepest techniques (boundary values, decision tables, automated regression); GREEN zones only need a smoke test.", "赤ゾーンには最も深い技法（境界値、デシジョンテーブル、自動回帰）を選び、緑ゾーンはスモークテストのみでよい。"),
      STEP(4, "Trình bày bảng phân bổ cho lead/PM trước khi bắt đầu sprint, để cả đội đồng thuận thứ tự ưu tiên.", "Present the allocation table to the lead/PM before the sprint starts, so the whole team agrees on the priority order.", "スプリント開始前にリード/PMへ配分表を提示し、チーム全体で優先順位に合意する。"),
      CODE("text", "PHAN BO CONG SUC TEST - Sprint boi thuong xe co gioi (AnBinhCore)\nTinh nang: Duyet chi tra vuot han muc     | Kha nang=4 Anh huong=5 -> Diem=20 -> DO\nTinh nang: Cong thuc tinh phi bao hiem    | Kha nang=4 Anh huong=4 -> Diem=16 -> DO\nTinh nang: Tinh khau tru (deductible)     | Kha nang=3 Anh huong=3 -> Diem=9  -> VANG\nTinh nang: Dong bo du lieu tai bao hiem   | Kha nang=2 Anh huong=5 -> Diem=10 -> VANG\nTinh nang: Dinh dang hien thi tien te     | Kha nang=2 Anh huong=1 -> Diem=2  -> XANH\n=> 55% thoi gian sprint danh cho 2 tinh nang DO truoc tien."),
      IMG(m_effort, "Bảng phân bổ công sức test theo mức rủi ro cho sprint bồi thường xe cơ giới", "Test-effort allocation by risk level for the motor-insurance claims sprint", "自動車保険保険金支払スプリントのリスクレベル別テスト工数配分表"),
      TRY("Tính điểm rủi ro cho tính năng 'gửi email xác nhận đã nộp hồ sơ bồi thường' (gợi ý: khả năng lỗi thấp, ảnh hưởng thấp vì có thể gửi lại) và xếp nó vào vùng nào.", "Score the feature 'send a claim-submission confirmation email' (hint: low failure likelihood, low impact since it can be resent) and decide its zone.", "『保険金請求受付確認メールの送信』機能のリスクスコアを計算し（ヒント：再送可能なため可能性・影響度とも低い）、どのゾーンか判定しよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ còn 2 ngày trước release, chọn ca ưu tiên", en: "6. Situation 1: only 2 days before release, choosing priority cases", ja: "6. シーン1：リリースまで残り2日、優先ケースの選定" },
    blocks: [
      SITUATION("Backlog còn 120 test case chưa chạy cho release 4.2 của AnBinhCore, nhưng chỉ còn đúng 2 ngày trước khi release.", "120 untested test cases remain in the backlog for AnBinhCore's release 4.2, but only 2 days remain before release.",
        "Lead hỏi bạn: 'Chạy hết được không?' — thực tế với tốc độ hiện tại chỉ đủ thời gian chạy khoảng 45 ca. Nếu chọn sai 75 ca còn lại, một lỗi nghiêm trọng có thể lọt ra production ngay sau release.",
        "The lead asks: 'Can we run them all?' — realistically, at the current pace there's only enough time for about 45 cases. Picking the wrong 75 cases to skip risks a serious bug escaping to production right after release.",
        "AnBinhCoreのリリース4.2向けに未実行のテストケースが120件残っているが、リリースまであと2日しかない。",
        "リードから『全部実行できるか？』と聞かれる——実際のペースでは約45ケース分の時間しかない。残り75件の選び方を誤ると、リリース直後に重大バグが本番環境に漏れる恐れがある。"),
      SOLVE("Mở ma trận rủi ro đã dựng sẵn (chương 5): chạy hết toàn bộ ca ở vùng ĐỎ trước (bắt buộc, không thương lượng), rồi mới chọn tiếp ca VÀNG có điểm cao nhất cho tới khi hết giờ; ca vùng XANH dời sang release vá lỗi (hotfix/patch) kế tiếp.", "Open the pre-built risk matrix (chapter 5): run all RED-zone cases first (mandatory, non-negotiable), then pick the highest-scoring YELLOW cases until time runs out; GREEN-zone cases are deferred to the next patch release.", "事前に作成したリスクマトリクス（第5章）を開く：まず赤ゾーンの全ケースを実行（必須・交渉不可）、その後時間切れまでスコアの高い黄ゾーンケースを選ぶ；緑ゾーンは次のパッチリリースに延期する。"),
      P("Đây là khoảnh khắc RBT chứng minh giá trị rõ nhất: không phải lúc thời gian rảnh rãi, mà chính lúc thời gian khan hiếm. Nếu không có ma trận từ trước, quyết định 'chạy ca nào' sẽ dựa trên cảm tính hoặc thứ tự viết sẵn trong tài liệu — rất dễ bỏ sót đúng ca bảo vệ hạn mức chi trả. Có ma trận, cuộc trò chuyện với lead trở thành một con số rõ ràng: '42 ca ĐỎ là bắt buộc, còn lại là đánh đổi có thể giải trình'.",
        "This is the moment RBT proves its value most clearly: not when time is abundant, but exactly when it's scarce. Without a matrix built beforehand, the decision of 'which cases to run' would rely on gut feeling or the order written in a document — easily missing the very case protecting the payout limit. With a matrix, the conversation with the lead becomes a clear number: '42 RED cases are mandatory, the rest is a defensible trade-off'.",
        "これはRBTの価値が最も明確に証明される瞬間です——時間に余裕がある時ではなく、まさに時間が乏しい時です。事前にマトリクスがなければ、『どのケースを実行するか』の判断は感覚や資料の記載順に頼ることになり、支払限度額を守る肝心のケースを見逃しやすくなります。マトリクスがあれば、リードとの会話は明確な数字になります：『赤の42ケースは必須、残りは説明可能なトレードオフです』。"),
      IMG(m_dash, "Dashboard mức phủ kiểm thử theo rủi ro trước release 4.2 — 100% vùng ĐỎ là điều kiện bắt buộc", "Risk-coverage dashboard before release 4.2 — 100% RED coverage is a mandatory gate", "リリース4.2前のリスク別テストカバレッジダッシュボード — 赤ゾーン100%は必須ゲート"),
      RECAP(["Vùng ĐỎ luôn chạy trước, không thương lượng khi thiếu thời gian", "Ma trận rủi ro biến quyết định cảm tính thành con số có thể giải trình"],
        ["RED zone always runs first, non-negotiable when time is short", "The risk matrix turns a gut-feel decision into a defensible number"],
        ["時間が足りない時も赤ゾーンは必ず最優先で交渉不可", "リスクマトリクスは感覚的判断を説明可能な数値に変える"]),
    ] },
  { heading: { vi: "7. Tình huống 2: bỏ qua vùng rủi ro cao gây bồi thường sai", en: "7. Situation 2: skipping a high-risk area causes a wrong payout", ja: "7. シーン2：高リスク領域の省略が誤支払いを招く" },
    blocks: [
      SITUATION("Ở sprint trước, tính năng 'Số tiền chi trả (tính toán)' bị đội đánh giá nhầm là đơn giản — chỉ là một phép nhân — nên bị xếp xuống vùng VÀNG và chỉ chạy 2 ca kiểm thử cơ bản.", "In the previous sprint, the 'calculated payout amount' feature was mistakenly assessed as simple — just one multiplication — so it was placed in the YELLOW zone and only had 2 basic test cases run.",
        "Sau khi release, hồ sơ HS-BT-55210 với tỷ lệ trách nhiệm 70% bị hệ thống tính chi trả sai gần 129 triệu đồng do một điều kiện đặc biệt (cộng dồn phụ phí) không được test tới, dẫn tới ticket ANB-9042 mức Critical.",
        "After release, claim HS-BT-55210 with a 70% liability ratio was miscalculated by nearly 129 million VND due to a special condition (surcharge stacking) that was never tested, leading to Critical ticket ANB-9042.",
        "前スプリントで『支払金額（計算値）』機能は単純な掛け算だけとチームに誤って評価され、黄ゾーンに分類され基本ケース2件のみ実行された。",
        "リリース後、責任割合70%の案件HS-BT-55210で、テストされていなかった特殊条件（追加料金の累積）によりシステムが約1億2900万ドンの誤支払いを計算し、Critical案件ANB-9042につながった。"),
      SOLVE("Nâng ngay tính năng này lên vùng ĐỎ, viết lại bộ ca kiểm thử đầy đủ (giá trị biên tỷ lệ trách nhiệm, các điều kiện phụ phí, so hạn mức hợp đồng), báo bug Critical kèm công thức đúng, và thêm vào bộ hồi quy bắt buộc của mọi release sau.", "Immediately promote this feature to RED zone, rewrite a full test-case set (liability-ratio boundary values, surcharge conditions, policy-limit comparison), report a Critical bug with the correct formula, and add it to the mandatory regression suite for every future release.", "この機能を即座に赤ゾーンに引き上げ、完全なテストケース一式（責任割合の境界値、追加料金の条件、契約限度額との比較）を書き直し、正しい計算式とともにCriticalバグを報告し、以降の全リリースの必須回帰テストに追加する。"),
      P("Bài học ở đây không phải 'công thức nhân đơn giản nên rủi ro thấp' — mà là 'khả năng và ảnh hưởng phải được đánh giá dựa trên dữ liệu thực (tần suất chạy, số tiền trung bình mỗi hồ sơ, độ phức tạp thật của công thức bao gồm mọi điều kiện phụ), không dựa trên vẻ ngoài đơn giản của đoạn code hay màn hình'. Một phép nhân đơn giản có thể ẩn chứa nhiều nhánh điều kiện nghiệp vụ mà chỉ đọc UI không thấy được. Vì tính năng này chạm tiền trực tiếp trên MỌI hồ sơ bồi thường, ảnh hưởng thực tế của nó lẽ ra phải được chấm điểm 5/5 ngay từ đầu.",
        "The lesson here isn't 'a simple multiplication means low risk' — it's that likelihood and impact must be assessed from real data (how often it runs, average money per claim, the formula's true complexity including every side condition), not from how simple the code or screen looks. A simple multiplication can hide many business condition branches invisible from the UI alone. Because this feature touches money directly on EVERY claim, its real impact should have been scored 5/5 from the start.",
        "ここでの教訓は『単純な掛け算だからリスクは低い』ではなく、『可能性と影響度は、コードや画面の見た目の単純さではなく、実行頻度・案件あたりの平均金額・全付帯条件を含む式の真の複雑さといった実データに基づいて評価すべき』ということです。単純な掛け算でも、UIを見るだけでは分からない多くの業務条件分岐が隠れていることがあります。この機能は全ての保険金請求案件で直接資金に関わるため、影響度は当初から5/5と評価されるべきでした。"),
      IMG(m_jira, "Ticket ANB-9042: hệ thống chi trả sai gần 129 triệu đồng do bỏ qua kiểm thử vùng rủi ro cao", "Ticket ANB-9042: the system miscalculated a payout by nearly 129 million VND from skipping high-risk testing", "チケットANB-9042：高リスクテストの省略により約1億2900万ドンの誤支払いが発生"),
      TRY("Nghĩ một tính năng khác trong hệ thống bảo hiểm 'trông đơn giản' nhưng thực tế ảnh hưởng tiền trực tiếp (ví dụ: làm tròn số tiền, tính thuế GTGT trên phí) — nó nên được xếp vùng rủi ro nào?", "Think of another insurance-system feature that 'looks simple' but actually touches money directly (e.g. rounding amounts, calculating VAT on premiums) — which risk zone should it be in?", "保険システムで『単純に見える』が実際は直接資金に関わる別の機能（例：金額の端数処理、保険料へのVAT計算）を考え、どのリスクゾーンに入れるべきか検討しよう。"),
    ] },
  { heading: { vi: "8. RBT gắn với release — lập kế hoạch test theo từng sprint", en: "8. RBT tied to release — planning tests per sprint", ja: "8. リリースに結び付けるRBT — スプリント単位のテスト計画" },
    blocks: [
      P("Rủi ro không cố định — nó thay đổi theo mỗi release vì code thay đổi, quy tắc nghiệp vụ thay đổi, và lịch sử lỗi tích lũy thêm. Vì vậy RBT không phải hoạt động làm một lần rồi cất tủ, mà là một bước bắt buộc mở đầu MỖI sprint, ngay sau khi biết phạm vi thay đổi (scope) của release đó.",
        "Risk isn't fixed — it changes every release because code changes, business rules change, and defect history accumulates. So RBT isn't a one-time activity done once and filed away, but a mandatory step that opens EVERY sprint, right after the release's change scope is known.",
        "リスクは固定ではありません——コードが変わり、業務ルールが変わり、不具合履歴が蓄積されるため、リリースごとに変化します。したがってRBTは一度きりで棚上げする活動ではなく、そのリリースの変更範囲（スコープ）が分かった直後に、毎スプリント冒頭で必須となるステップです。"),
      STEP(1, "Đầu sprint: lấy danh sách thay đổi (code diff, ticket) của release, đánh dấu tính năng nào bị chạm tới.", "Start of sprint: get the release's change list (code diff, tickets), mark which features are touched.", "スプリント開始時：リリースの変更一覧（コード差分、チケット）を取得し、影響を受ける機能に印を付ける。"),
      STEP(2, "Chấm lại điểm Khả năng cho các tính năng bị chạm — code thay đổi nhiều/phức tạp thì Khả năng tăng, dù Ảnh hưởng có thể không đổi.", "Rescore Likelihood for touched features — heavily/complexly changed code raises Likelihood, even if Impact stays the same.", "影響を受ける機能の可能性を再採点する——変更が多い/複雑なコードは可能性が上がる（影響度は変わらなくても）。"),
      STEP(3, "Cập nhật ma trận, phân bổ lại % công sức test cho sprint đó, công bố cho cả đội trước khi bắt đầu chạy ca.", "Update the matrix, reallocate that sprint's test-effort %, and share it with the team before running cases.", "マトリクスを更新し、そのスプリントのテスト工数配分を見直し、ケース実行前にチーム全体へ共有する。"),
      CODE("text", "KE HOACH RBT - Release 4.3 (AnBinhCore)\nPham vi thay doi: sua cong thuc khau tru + them dieu kien phu phi cho xe tren 10 nam\n\nTinh nang           | Diem cu | Diem moi | Ly do thay doi\nCong thuc khau tru   | 9 (VANG)| 16 (DO)  | Code thay doi nhieu, them dieu kien moi\nDuyet han muc        | 20 (DO) | 20 (DO)  | Khong doi, van la DO\nDinh dang hien thi   | 2 (XANH)| 2 (XANH) | Khong bi cham vao\n=> Uu tien sprint: Duyet han muc + Cong thuc khau tru (ca hai deu DO)."),
      TIP("Đừng chỉ nhìn điểm rủi ro cũ từ release trước — một tính năng vốn ở vùng VÀNG có thể nhảy sang ĐỎ chỉ vì sprint này code của nó bị sửa nhiều.", "Don't just look at last release's old risk score — a feature that was YELLOW can jump to RED simply because its code was heavily changed this sprint.", "前リリースの古いリスクスコアだけを見てはいけません——今スプリントでコードが大きく変更されただけで、黄だった機能が赤に跳ね上がることがあります。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi áp dụng RBT", en: "9. Common mistakes & tips when applying RBT", ja: "9. RBT適用時のよくある失敗とコツ" },
    blocks: [
      P("Ngay cả tester có kinh nghiệm cũng dễ mắc vài lỗi khi mới đưa RBT vào quy trình thật. Biết trước giúp ma trận của bạn đáng tin cậy hơn.",
        "Even experienced testers easily make a few mistakes when first bringing RBT into a real process. Knowing them in advance makes your matrix more trustworthy.",
        "経験豊富なテスターでも、RBTを実プロセスに初めて導入する際にいくつかの失敗をしがちです。事前に知っておくことでマトリクスの信頼性が高まります。"),
      PITFALL("Chấm điểm rủi ro một lần rồi không bao giờ cập nhật lại — trong khi code, quy tắc nghiệp vụ và lịch sử lỗi liên tục thay đổi qua từng release.", "Scoring risk once and never updating it — while code, business rules and defect history keep changing every release.", "一度リスクを採点したまま二度と更新しない——一方でコード・業務ルール・不具合履歴はリリースごとに変わり続けます。"),
      PITFALL("Chỉ dựa vào ý kiến cá nhân của một tester để chấm Ảnh hưởng, không tham khảo BA/PO hay dữ liệu tài chính thật (số tiền trung bình mỗi hồ sơ, tần suất giao dịch).", "Scoring Impact based only on one tester's personal opinion, without consulting BA/PO or real financial data (average money per claim, transaction frequency).", "BA/POや実際の財務データ（案件あたり平均金額、取引頻度）を参照せず、テスター一人の個人的な意見だけで影響度を採点する。"),
      TIP("Khi tranh cãi giữa hai tính năng cùng điểm rủi ro, ưu tiên tính năng nào ảnh hưởng TRỰC TIẾP tới số tiền (phí thu vào, tiền chi ra) trước các tính năng chỉ ảnh hưởng gián tiếp (báo cáo, thống kê).", "When two features tie on risk score, prioritize the one that DIRECTLY affects money (premium in, payout out) over ones with only indirect effect (reports, statistics).", "リスクスコアが同点の2機能で迷う場合、資金に間接的にしか影響しない機能（レポート、統計）より、直接影響する機能（保険料収入、保険金支出）を優先する。"),
      IMG(m_matrix, "Nhắc lại ma trận rủi ro — dùng làm căn cứ mỗi khi tranh luận thứ tự ưu tiên test", "Reminder of the risk matrix — use it as the basis whenever debating test priority order", "リスクマトリクスの再確認 — テスト優先順位を議論する際は常にこれを根拠にする"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Độ nghiêm trọng & độ ưu tiên cho người mới", "Severity & priority for beginners", "severity-priority-do-nghiem-trong-do-uu-tien-cho-nguoi-moi", "初心者のための重大度と優先度"),
      INTERNAL("Kiểm thử tích hợp (Integration) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách áp dụng Kiểm thử dựa trên rủi ro cho hệ thống tính phí & bồi thường bảo hiểm AnBinhCore: định nghĩa rủi ro = khả năng × ảnh hưởng, dựng ma trận 5×5, phân bổ % công sức test theo vùng Đỏ/Vàng/Xanh, chọn ca ưu tiên khi chỉ còn 2 ngày trước release, xử lý hậu quả khi bỏ sót vùng rủi ro cao, và gắn RBT với từng sprint bằng cách chấm điểm lại theo thay đổi thực tế. Đây là kỹ năng ra quyết định ở mức chuyên nghiệp, không chỉ là kỹ thuật viết ca.",
        "You just learned to apply Risk-Based Testing to AnBinhCore's premium and claims system: defining risk = likelihood × impact, building a 5×5 matrix, allocating test effort % by Red/Yellow/Green zone, picking priority cases with only 2 days before release, handling the fallout of missing a high-risk area, and tying RBT to each sprint by rescoring against real changes. This is professional-level decision-making, not just a case-writing technique.",
        "AnBinhCoreの保険料・保険金支払システムにリスクベーステストを適用する方法を学びました：リスク＝可能性×影響度の定義、5×5マトリクスの構築、赤/黄/緑ゾーン別のテスト工数配分、リリース2日前での優先ケース選定、高リスク領域の見落としがもたらす結果への対処、そして実際の変更に応じた再採点による各スプリントへのRBTの結び付け。これはケース作成技法にとどまらない、プロレベルの意思決定スキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thêm kỹ thuật kiểm thử tích hợp cho các module thanh toán/tái bảo hiểm kết nối nhiều hệ thống, cùng cách viết báo cáo kết quả kiểm thử nêu rõ mức phủ theo rủi ro cho quản lý dự án. Nếu muốn luyện RBT trên dự án mô phỏng doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận vai trò kiểm thử cao cấp.",
        "Next, you should practice integration testing techniques for payment/reinsurance modules connecting multiple systems, along with writing a test result report that clearly states risk-based coverage for project management. If you want to practice RBT on enterprise-like projects with a mentor, a structured Tester course helps you progress fast and confidently take on a senior testing role.",
        "次は、複数システムを接続する決済/再保険モジュール向けの統合テスト技法や、プロジェクト管理者にリスクベースのカバレッジを明確に示すテスト結果報告書の書き方を練習しましょう。指導者付きで企業を模した実案件でRBTを練習したいなら、体系的なテスターコースが速い成長とシニアなテスト役割への自信を助けます。"),
      CTA(course),
    ] },
];

const DOC = makeDoc({
  slug: "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester",
  domain: "insurance",
  primaryKeyword: "kiểm thử dựa trên rủi ro",
  keywords: ["kiểm thử dựa trên rủi ro", "risk-based testing", "ma trận rủi ro", "risk based testing bảo hiểm", "phân bổ công sức test theo rủi ro"],
  coverLabel: "NÂNG CAO · RISK-BASED · BẢO HIỂM",
  crumb: "Kiểm thử dựa trên rủi ro (Risk-Based Testing)",
  metaTitle: { vi: "Kiểm thử dựa trên rủi ro (RBT) cho hệ thống bảo hiểm", en: "Risk-based testing for insurance systems", ja: "保険システム向けリスクベーステスト" },
  metaDescription: {
    vi: "Kiểm thử dựa trên rủi ro cho tester: ma trận khả năng × ảnh hưởng, phân bổ công sức test, chọn ca ưu tiên khi thiếu thời gian, gắn RBT theo hệ thống bảo hiểm.",
    en: "Risk-based testing for testers: likelihood × impact matrix, test-effort allocation, priority case selection under time pressure, and tying RBT to releases on a real insurance system.",
    ja: "テスター向けリスクベーステスト：可能性×影響度マトリクス、テスト工数配分、時間不足時の優先ケース選定、実際の保険システムでのリリース単位のRBT運用を解説。",
  },
  title: {
    vi: "Kiểm thử dựa trên rủi ro (Risk-Based Testing) cho hệ thống bảo hiểm: ma trận, phân bổ công sức, chọn ca ưu tiên (có trắc nghiệm)",
    en: "Risk-based testing for insurance systems: matrix, effort allocation, priority cases (with quiz)",
    ja: "保険システム向けリスクベーステスト：マトリクス、工数配分、優先ケース選定（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: áp dụng Kiểm thử dựa trên rủi ro (RBT) cho hệ thống tính phí & bồi thường bảo hiểm xe cơ giới AnBinhCore. Định nghĩa rủi ro = khả năng × ảnh hưởng, dựng ma trận 5×5, phân bổ % công sức test theo vùng Đỏ/Vàng/Xanh, hai tình huống thật (chỉ còn 2 ngày trước release; bỏ sót vùng rủi ro cao gây bồi thường sai), gắn RBT với từng sprint, mockup giao diện thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: applying Risk-Based Testing (RBT) to AnBinhCore, a motor-insurance premium and claims system. Defining risk = likelihood × impact, building a 5×5 matrix, allocating test effort % by Red/Yellow/Green zone, two real situations (only 2 days before release; missing a high-risk area causes a wrong payout), tying RBT to each sprint, real UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：自動車保険の保険料・保険金支払システム「AnBinhCore」にリスクベーステスト（RBT）を適用。リスク＝可能性×影響度の定義、5×5マトリクスの構築、赤/黄/緑ゾーン別のテスト工数配分、2つの実例（リリース2日前の状況、高リスク領域の見落としによる誤支払い）、各スプリントへのRBTの結び付け、実物モック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách áp dụng kiểm thử dựa trên rủi ro", steps: [
    { name: "Liệt kê rủi ro & chấm điểm Khả năng × Ảnh hưởng", text: "Dựa trên độ phức tạp code, tần suất thay đổi, số tiền và số khách hàng liên quan." },
    { name: "Dựng ma trận rủi ro và phân vùng Đỏ/Vàng/Xanh", text: "Điểm ≥15 là Đỏ, 6-14 là Vàng, ≤5 là Xanh." },
    { name: "Phân bổ công sức test & cập nhật lại mỗi release", text: "Vùng Đỏ luôn chạy trước; chấm lại điểm theo thay đổi thực tế mỗi sprint." },
  ] },
  pages,
});

export const MA_RISKBASED_01 = [DOC];
