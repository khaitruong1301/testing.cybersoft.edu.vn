// doc_ma_recovery.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing) cho hệ thống
// NGÂN HÀNG LÕI (core banking + cổng thanh toán): mất mạng giữa giao dịch, ngắt DB,
// failover sang Standby, khôi phục sau sự cố, toàn vẹn dữ liệu, RTO/RPO, idempotency.
// 2 tình huống thật (jira/kanban/dashboard), sơ đồ trạng thái failover (stateDiagram).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, stateDiagram } from "./ui_mock.mjs";

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

// ── Mockup 1: màn hình chuyển khoản CoreBank bị ngắt giữa 2 lệnh ghi Nợ/Có ──
const m_txn = browser("corebank.internal/giao-dich/chuyen-khoan/GD-88451", [
  panel("CoreBank · Chuyển khoản — sự cố giữa giao dịch", [
    field(24, 20, 330, "Tài khoản nguồn", "1900xxxx4471 · Số dư trước GD: 22.150.000đ", "normal"),
    field(372, 20, 330, "Tài khoản đích", "1900xxxx9034 · Ngân hàng XYZ", "normal"),
    field(24, 92, 330, "Số tiền chuyển", "8.000.000đ", "normal"),
    field(372, 92, 330, "Trạng thái mạng tới Core", "Mất kết nối lúc 14:32:07", "error"),
    field(24, 164, 330, "Ghi Nợ tài khoản nguồn", "ĐÃ GHI lúc 14:32:06", "error"),
    field(372, 164, 330, "Ghi Có tài khoản đích", "CHƯA GHI — không rõ trạng thái", "error"),
    btn(24, 236, 260, "Đang chờ Standby tiếp nhận…", "disabled"),
    annotate(20, 82, 330, 44, "RỦI RO: mất mạng đúng khe hở giữa 2 lệnh ghi"),
    annotate(20, 154, 330, 44, "Tiền đã bị trừ nhưng chưa xác nhận đã ghi Có"),
    annotate(368, 154, 330, 44, "Cần đối soát tự động khi Standby lên thay"),
  ].join(""), { h: 300, accent: "#155ce1" }),
].join(""), { h: 356, title: "CoreBank · Sự cố giữa giao dịch", accent: "#155ce1" });

// ── Mockup 2: sơ đồ trạng thái failover Primary → Standby → Failback ──
const m_flow = stateDiagram("Vòng đời failover: Primary ACTIVE → Standby PROMOTED → Failback", [
  { id: "p1", label: "Primary ACTIVE", x: 110, y: 80, kind: "start" },
  { id: "p2", label: "Primary DOWN", x: 380, y: 80, kind: "bad" },
  { id: "p3", label: "Standby PROMOTED", x: 650, y: 80, kind: "ok" },
  { id: "p4", label: "Đối soát dữ liệu", x: 650, y: 220, kind: "mid" },
  { id: "p5", label: "Primary phục hồi & resync", x: 380, y: 220, kind: "mid" },
  { id: "p6", label: "Primary ACTIVE (failback)", x: 110, y: 220, kind: "start" },
], [
  { from: "p1", to: "p2", label: "Mất kết nối/crash" },
  { from: "p2", to: "p3", label: "Failover (đo RTO)" },
  { from: "p3", to: "p4", label: "Xử lý GD dở dang" },
  { from: "p2", to: "p4", label: "Dữ liệu ngoài RPO", bad: true },
  { from: "p4", to: "p5", label: "Sửa Primary, đồng bộ ngược" },
  { from: "p5", to: "p6", label: "Failback hoàn tất" },
], { accent: "#155ce1", h: 300 });

// ── Mockup 3: Defect Taxonomy — checklist lỗi kinh nghiệm phục hồi/failover ──
const m_taxonomy = grid("Defect Taxonomy — checklist lỗi kinh nghiệm phục hồi/failover cho core banking", ["Nhóm lỗi phục hồi (kinh nghiệm)", "Biểu hiện thường gặp", "Vì sao khó bắt bằng kiểm thử thông thường"], [
  ["Giao dịch treo giữa 2 bước ghi (Nợ/Có)", "Tiền bị trừ nhưng chưa ghi Có, trạng thái cuối không rõ ràng", "Ca kiểm thử luồng đúng không mô phỏng lỗi hạ tầng xảy ra giữa 2 lệnh ghi"],
  ["Mất dữ liệu trong cửa sổ RPO", "Giao dịch ngay trước sự cố biến mất, không có ở Standby sau khi lên thay", "Test chức năng không đo khoảng cách đồng bộ dữ liệu thực tế giữa 2 node"],
  ["Failover chậm vượt RTO cam kết", "Hệ thống 'đứng hình' lâu hơn SLA cho phép khi Primary gặp sự cố", "Đo RTO cần môi trường mô phỏng sự cố thật, khó tái hiện ở test thường"],
  ["Giao dịch nhân đôi do thiếu idempotency", "Client retry sau failover khiến giao dịch được ghi nhận 2 lần", "Ca kiểm thử tiêu chuẩn không retry request sau khi đổi node xử lý"],
  ["Failback không đồng bộ ngược", "Dữ liệu ghi ở Standby trong lúc failover bị mất khi quay lại Primary", "Kiểm thử thường dừng ở bước failover, không phủ hết chu trình failback"],
  ["Đối soát tự động báo sai/bỏ sót", "Công cụ đối soát không phát hiện đúng giao dịch treo hoặc nhân đôi", "Logic đối soát ít được kiểm thử độc lập như một tính năng nghiệp vụ chính"],
], { accent: "#155ce1", note: "Cập nhật sau mỗi diễn tập DR (Disaster Recovery drill) hoặc sự cố production thật." });

// ── Mockup 4: ca kiểm thử phục hồi — MẤT MẠNG GIỮA GIAO DỊCH & RTO/RPO ──
const m_case_network = grid("Ca kiểm thử phục hồi — MẤT MẠNG GIỮA GIAO DỊCH & RTO/RPO", ["Ca kiểm thử phục hồi", "Cách mô phỏng sự cố", "RTO/RPO mong đợi"], [
  ["Ngắt mạng ngay sau khi ghi Nợ, trước khi ghi Có", "Chặn gói tin ở tầng network đúng giữa 2 lệnh ghi (chaos tool)", "RPO = 0 cho giao dịch tài chính: không được mất giao dịch đã ghi Nợ"],
  ["Ngắt mạng khi client đang chờ phản hồi core (in-flight)", "Cắt kết nối TCP gateway–core khi request chưa có phản hồi", "Client nhận trạng thái rõ ràng (thành công/thất bại/đang xử lý), không treo vô thời hạn"],
  ["Mất mạng giữa 2 lần đồng bộ replication Primary→Standby", "Ngắt kênh replication N giây rồi khôi phục", "Khoảng dữ liệu mất ≤ RPO cam kết (ví dụ 5 giây)"],
  ["Mất mạng khi hệ thống đang failover (2 sự cố chồng nhau)", "Ngắt mạng lần 2 đúng lúc Standby đang được promote", "Hệ thống báo lỗi rõ ràng, không âm thầm mất giao dịch"],
], { accent: "#155ce1", note: "RTO/RPO phải được ĐO THỰC TẾ qua kiểm thử, không chỉ tin vào con số trong tài liệu kiến trúc." });

// ── Mockup 5: ca kiểm thử phục hồi — NGẮT DB & FAILOVER SANG STANDBY ──
const m_case_db = grid("Ca kiểm thử phục hồi — NGẮT DB & FAILOVER SANG STANDBY", ["Ca kiểm thử phục hồi", "Cách mô phỏng sự cố", "Kết quả mong đợi"], [
  ["Kill process Primary DB đột ngột (không graceful shutdown)", "kill -9 tiến trình DB chính khi đang có giao dịch mở", "Standby được promote trong X giây (RTO); giao dịch dở dang được rollback hoặc hoàn tất nhất quán"],
  ["Ngắt ổ đĩa/volume dữ liệu của Primary DB", "Unmount volume dữ liệu Primary ngay khi đang ghi", "Hệ thống phát hiện lỗi I/O, chuyển sang Standby, không ghi tiếp dữ liệu hỏng"],
  ["Diễn tập failover thủ công theo runbook vận hành", "Ops/Tester thực hiện đúng quy trình chuyển ghi trong tài liệu DR", "Thời gian & các bước khớp RTO đã cam kết, không cần thao tác ngoài quy trình"],
  ["Split-brain: cả Primary lẫn Standby cùng nhận ghi", "Mô phỏng lỗi cấu hình/mạng khiến cả 2 node cùng ở trạng thái active", "Cơ chế fencing/quorum ngăn 2 node cùng ghi, không phát sinh dữ liệu xung đột"],
], { accent: "#b45309" });

// ── Mockup 6: ca kiểm thử phục hồi — TOÀN VẸN DỮ LIỆU & IDEMPOTENCY SAU PHỤC HỒI ──
const m_case_integrity = grid("Ca kiểm thử phục hồi — TOÀN VẸN DỮ LIỆU & IDEMPOTENCY SAU PHỤC HỒI", ["Ca kiểm thử phục hồi", "Cách mô phỏng sự cố", "Kết quả mong đợi"], [
  ["Client retry đúng request cũ sau khi failover hoàn tất", "Gửi lại request với CÙNG idempotency key sau khi Standby đã lên thay", "Trả về kết quả giao dịch đã xử lý trước đó, KHÔNG tạo giao dịch mới"],
  ["Đối chiếu tổng số dư toàn hệ thống trước/sau sự cố", "So sánh checksum/tổng số dư ở Primary trước sự cố với Standby sau failover", "Tổng số dư khớp tuyệt đối, không lệch dù chỉ 1 đồng"],
  ["Giao dịch đang ở trạng thái 'pending' đúng lúc sự cố xảy ra", "Gây sự cố đúng khi giao dịch ở trạng thái trung gian (pending/processing)", "Giao dịch được đưa về đúng 1 trong 2 trạng thái cuối, không kẹt pending vĩnh viễn"],
  ["Log & idempotency key có được đồng bộ sang Standby không", "Tạo giao dịch, ngắt Primary ngay sau khi ghi log nhưng trước khi replicate", "Standby sau khi promote phải có đủ log/khoá idempotency để không xử lý trùng"],
], { accent: "#7c3aed" });

// ── Mockup 7: ticket Jira mất toàn vẹn dữ liệu — giao dịch treo sau mất mạng ──
const m_jira = jira({
  key: "CB-61208", title: "Giao dịch chuyển khoản bị TREO: tài khoản nguồn đã ghi Nợ nhưng tài khoản đích KHÔNG được ghi Có sau sự cố mất mạng",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "Production · CoreBank Payment Gateway v6.1 · sự cố mạng lúc 14:32"],
    ["Các bước", "1) Khách chuyển 8.000.000đ 2) Core mất kết nối ngay sau khi ghi Nợ tài khoản nguồn 3) Standby được promote sau 9 giây (trong RTO) 4) Kiểm tra tài khoản đích và log đối soát"],
    ["Kết quả mong đợi", "Có cơ chế phát hiện & tự động hoàn tất hoặc hoàn tiền giao dịch treo ngay sau failover"],
    ["Kết quả thực tế", "Tài khoản nguồn bị trừ 8.000.000đ, tài khoản đích không nhận được tiền, giao dịch vẫn ở trạng thái pending sau 2 giờ"],
    ["Bằng chứng", "log-failover-1432.csv, doi-soat-CB61208.xlsx, ticket-khachhang-11744.pdf"],
  ],
});

// ── Mockup 8: kanban theo dõi lỗi tìm qua Recovery & Failover Testing ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua Recovery & Failover Testing (CoreBank · Sprint DR)", [
  { name: "New", cards: [
    { key: "CB-61208", title: "GD treo: ghi Nợ xong nhưng chưa ghi Có", sev: "Critical" },
    { key: "CB-61120", title: "GD nhân đôi sau khi failover + retry", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "CB-61090", title: "RTO thực đo 46s, vượt SLA cam kết 30s", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "CB-60988", title: "Split-brain: 2 node cùng ghi khi lỗi mạng nội bộ", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "CB-60820", title: "Failback mất dữ liệu ghi tạm ở Standby", sev: "Medium" },
  ] },
]);

// ── Mockup 9: dashboard số liệu RTO/RPO thực đo & lỗi tìm qua diễn tập DR ──
const m_dash = dashboard("Số liệu diễn tập DR — Recovery & Failover Testing (CoreBank)", [
  { label: "RTO thực đo", value: "46s", sub: "SLA cam kết ≤ 30s — CHƯA đạt", color: "#e11d48" },
  { label: "RPO thực đo", value: "0s", sub: "đạt mục tiêu cho GD tài chính", color: "#16a34a" },
  { label: "GD treo tìm được", value: "5", sub: "qua ca mất mạng giữa 2 lệnh ghi", color: "#7c3aed" },
  { label: "GD nhân đôi tìm được", value: "3", sub: "do thiếu/lỗi idempotency key", color: "#b45309" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử phục hồi (Recovery Testing) và kiểm thử failover khác nhau thế nào?",
  "How does recovery testing differ from failover testing?",
  "Kiểm thử phục hồi (recovery testing) kiểm tra khả năng TOÀN HỆ THỐNG quay lại trạng thái hoạt động bình thường và dữ liệu nhất quán sau một sự cố (crash, mất điện, lỗi ổ đĩa, mất mạng). Kiểm thử failover là một NHÁNH cụ thể của recovery testing, tập trung riêng vào việc chuyển đổi — tự động hoặc thủ công — sang thành phần dự phòng (Standby) khi thành phần chính (Primary) gặp sự cố, đo thời gian chuyển đổi (RTO) và tính liên tục dịch vụ trong lúc chuyển. Với hệ ngân hàng lõi, hai loại kiểm thử này luôn đi cùng nhau vì failover chỉ là MỘT CÁCH để đạt được recovery, không phải mục tiêu cuối cùng.",
  "Recovery testing checks whether the ENTIRE SYSTEM can return to a normal, data-consistent state after an incident (crash, power loss, disk failure, network loss). Failover testing is a SPECIFIC BRANCH of recovery testing, focused on switching — automatically or manually — to a standby component when the primary component fails, measuring the switch time (RTO) and service continuity during the switch. In core banking, the two always go together because failover is just ONE WAY to achieve recovery, not the end goal itself.",
  "リカバリーテスト（Recovery Testing）とフェイルオーバーテストはどう違う？",
  "リカバリーテストは、障害（クラッシュ、停電、ディスク障害、通信断）の後、システム全体が正常でデータ整合性のある状態に戻れるかを確認します。フェイルオーバーテストはリカバリーテストの特定の一分野で、プライマリが障害を起こしたときにスタンバイへ（自動または手動で）切り替える動作に焦点を当て、切り替え時間（RTO）と切り替え中のサービス継続性を測定します。コアバンキングでは、フェイルオーバーはリカバリーを達成する『一つの手段』に過ぎず最終目標ではないため、両者は常に一緒に扱われます。");
const faq2 = FAQ(
  "RTO và RPO là gì, khác nhau ra sao, và ai trong dự án ngân hàng cần quan tâm?",
  "What are RTO and RPO, how do they differ, and who on a banking project needs to care about them?",
  "RTO (Recovery Time Objective) là THỜI GIAN tối đa hệ thống được phép ngừng hoạt động trước khi phục hồi xong. RPO (Recovery Point Objective) là lượng DỮ LIỆU tối đa được phép mất, tính theo khoảng thời gian trước thời điểm sự cố. Cả hai con số này thường do business/compliance định nghĩa trong SLA (với giao dịch tài chính, RPO thường phải gần bằng 0), còn tester có nhiệm vụ ĐO THỰC TẾ hai chỉ số này qua các kịch bản kiểm thử phục hồi, rồi so sánh với cam kết — không chỉ tin vào con số ghi trong tài liệu kiến trúc.",
  "RTO (Recovery Time Objective) is the maximum TIME a system may be down before recovery completes. RPO (Recovery Point Objective) is the maximum amount of DATA that may be lost, measured as a time window before the incident. Both numbers are usually defined by business/compliance in an SLA (for financial transactions, RPO is typically close to zero), while the tester's job is to ACTUALLY MEASURE these two metrics through recovery test scenarios and compare them against the commitment — not just trust the numbers written in an architecture document.",
  "RTOとRPOとは何か、どう違い、銀行プロジェクトの誰が気にすべき？",
  "RTO（目標復旧時間）は、復旧が完了するまでにシステムが停止していてよい最大『時間』です。RPO（目標復旧時点）は、障害発生前のある時間幅で失ってよい最大『データ量』です。この2つの数値は通常ビジネス/コンプライアンス側がSLAで定義します（金融取引ではRPOはほぼゼロが求められることが多い）。テスターの役割は、復旧テストシナリオを通じてこの2つの指標を実際に『測定』し、アーキテクチャ文書の数値をただ信じるのではなく、コミットメントと比較することです。");
const faq3 = FAQ(
  "Vì sao chỉ kiểm thử failover lúc hệ thống 'rảnh' là chưa đủ với hệ ngân hàng lõi?",
  "Why is testing failover only when the system is 'idle' not enough for a core banking system?",
  "Vì các lỗi nghiêm trọng nhất về toàn vẹn dữ liệu — giao dịch treo giữa 2 bước ghi, giao dịch nhân đôi do retry — chỉ xuất hiện khi sự cố xảy ra ĐÚNG LÚC có giao dịch tài chính đang mở, ở trạng thái trung gian. Nếu chỉ diễn tập failover khi hệ thống không có giao dịch nào đang chạy, đội sẽ đo được RTO 'đẹp' nhưng bỏ sót hoàn toàn nhóm lỗi nguy hiểm nhất — thứ chỉ lộ ra khi sự cố và giao dịch dở dang chồng lên nhau đúng thời điểm.",
  "Because the most serious data-integrity bugs — a transaction stuck between two write steps, a duplicated transaction from a retry — only appear when the incident happens EXACTLY WHILE a financial transaction is open, in an intermediate state. If failover is only drilled when no transaction is running, the team measures a 'clean' RTO but completely misses the most dangerous bug class — one that only surfaces when the incident and an in-flight transaction overlap at the same moment.",
  "コアバンキングにおいて、システムが『アイドル』のときだけフェイルオーバーをテストするのが不十分な理由は？",
  "データ整合性に関わる最も深刻な不具合——2つの書き込みステップの間で止まる取引、リトライによる取引の重複——は、財務取引が中間状態で進行中の『まさにそのとき』に障害が起きた場合にのみ現れるからです。取引が実行されていないときだけフェイルオーバー訓練を行うと、『きれいな』RTOは測定できても、障害と進行中の取引がちょうど重なったときにしか現れない最も危険な不具合クラスを完全に見逃してしまいます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "RTO (Recovery Time Objective) đo lường điều gì?", en: "What does RTO (Recovery Time Objective) measure?", ja: "RTO（目標復旧時間）は何を測定する？" },
    options: [
      { vi: "Lượng dữ liệu tối đa được phép mất sau sự cố", en: "The maximum amount of data allowed to be lost after an incident", ja: "障害後に失ってよい最大のデータ量" },
      { vi: "Thời gian tối đa hệ thống được phép ngừng hoạt động trước khi phục hồi xong", en: "The maximum time a system may be down before recovery completes", ja: "復旧が完了するまでシステムが停止していてよい最大時間" },
      { vi: "Tốc độ xử lý giao dịch trung bình mỗi giây", en: "The average number of transactions processed per second", ja: "1秒あたりの平均取引処理速度" },
      { vi: "Số lượng người dùng đồng thời hệ thống chịu được", en: "The number of concurrent users the system can handle", ja: "システムが耐えられる同時ユーザー数" },
    ], correct: 1,
    explain: { vi: "RTO là thời gian tối đa được phép ngừng hoạt động; RPO mới là chỉ số về lượng dữ liệu tối đa được phép mất.", en: "RTO is the maximum allowed downtime; RPO is the metric for the maximum allowed data loss.", ja: "RTOは許容される最大の停止時間であり、RPOは許容される最大のデータ損失量の指標である。" },
  }),
  mcq({
    q: { vi: "Trong ví dụ giao dịch bị TREO (chương 8), nguyên nhân gốc là gì?", en: "In the HANGING transaction example (chapter 8), what was the root cause?", ja: "第8章の取引が『宙に浮く』例では、根本原因は何？" },
    options: [
      { vi: "Mất mạng xảy ra đúng giữa lúc ghi Nợ tài khoản nguồn và ghi Có tài khoản đích, không có cơ chế phát hiện/hoàn tất tự động", en: "The network was lost exactly between debiting the source account and crediting the destination, with no automatic detection/completion mechanism", ja: "送金元口座への引き落としと送金先口座への入金の間でちょうど通信が切れ、自動検出・完了の仕組みがなかった" },
      { vi: "Khách hàng nhập sai số tài khoản đích", en: "The customer entered the wrong destination account number", ja: "顧客が送金先口座番号を間違えて入力した" },
      { vi: "Hệ thống tính sai tỉ giá quy đổi ngoại tệ", en: "The system miscalculated the currency exchange rate", ja: "システムが外貨換算レートを誤って計算した" },
      { vi: "Standby chưa từng được cấu hình trong hệ thống", en: "A standby had never been configured in the system", ja: "スタンバイがシステムに一度も構成されていなかった" },
    ], correct: 0,
    explain: { vi: "Đây là lỗ hổng kinh điển của giao dịch nhiều bước ghi: sự cố xảy ra đúng khe hở giữa 2 lệnh ghi khiến giao dịch kẹt ở trạng thái trung gian không rõ ràng.", en: "This is the classic gap in multi-step write transactions: the incident hits exactly the window between two writes, leaving the transaction stuck in an unclear intermediate state.", ja: "これは複数ステップの書き込み取引における典型的な隙間です：障害が2つの書き込みの間の窓にちょうど当たり、取引が不明瞭な中間状態のまま止まってしまう。" },
  }),
  mcq({
    q: { vi: "Cơ chế idempotency key trong xử lý giao dịch sau failover dùng để làm gì?", en: "What is the idempotency key mechanism used for when processing transactions after a failover?", ja: "フェイルオーバー後の取引処理における冪等性キー（idempotency key）は何のために使う？" },
    options: [
      { vi: "Ngăn một giao dịch bị ghi nhận (trừ tiền) nhiều lần khi client retry request sau khi Standby đã tiếp nhận xử lý", en: "Prevent a transaction from being recorded (money debited) multiple times when the client retries the request after Standby has taken over processing", ja: "スタンバイが処理を引き継いだ後、クライアントがリクエストを再送しても取引（引き落とし）が複数回記録されるのを防ぐ" },
      { vi: "Tăng tốc độ đồng bộ replication giữa Primary và Standby", en: "Speed up replication synchronization between Primary and Standby", ja: "プライマリとスタンバイ間のレプリケーション同期を高速化する" },
      { vi: "Tự động điều chỉnh RTO/RPO theo tải hệ thống", en: "Automatically adjust RTO/RPO based on system load", ja: "システム負荷に応じてRTO/RPOを自動調整する" },
      { vi: "Mã hoá dữ liệu trong kênh replication", en: "Encrypt the data in the replication channel", ja: "レプリケーションチャネル内のデータを暗号化する" },
    ], correct: 0,
    explain: { vi: "Idempotency key nhận diện request trùng lặp (do retry sau failover) để trả về đúng kết quả đã xử lý trước đó, tránh double-debit.", en: "The idempotency key identifies duplicate requests (from a post-failover retry) so the system returns the previously processed result, avoiding a double debit.", ja: "冪等性キーは（フェイルオーバー後のリトライによる）重複リクエストを識別し、以前処理済みの結果を正しく返すことで、二重引き落としを防ぐ。" },
  }),
  mcq({
    q: { vi: "'Split-brain' trong ngữ cảnh failover core banking nghĩa là gì?", en: "What does 'split-brain' mean in the context of core banking failover?", ja: "コアバンキングのフェイルオーバーにおける『スプリットブレイン』とは何を意味する？" },
    options: [
      { vi: "Cả Primary và Standby cùng ở trạng thái active và cùng nhận ghi dữ liệu, dễ gây xung đột/mất dữ liệu", en: "Both Primary and Standby end up active and accepting writes at the same time, easily causing conflicts or data loss", ja: "プライマリとスタンバイの両方が同時にアクティブになり書き込みを受け付けてしまい、競合やデータ損失を招きやすい状態" },
      { vi: "Hệ thống tự động sao lưu dữ liệu 2 lần mỗi ngày", en: "The system automatically backs up data twice a day", ja: "システムが1日2回自動的にデータをバックアップすること" },
      { vi: "Người dùng đăng nhập cùng lúc trên 2 thiết bị khác nhau", en: "A user logs in simultaneously on two different devices", ja: "ユーザーが2台の異なる端末で同時にログインすること" },
      { vi: "Hai module trong ứng dụng dùng chung 1 cơ sở dữ liệu", en: "Two modules in the application share the same database", ja: "アプリケーション内の2つのモジュールが同じデータベースを共有すること" },
    ], correct: 0,
    explain: { vi: "Split-brain là lỗi hạ tầng phân tán kinh điển: lỗi cấu hình/mạng khiến cả 2 node cùng tưởng mình là Primary, cần cơ chế fencing/quorum để ngăn.", en: "Split-brain is a classic distributed-systems failure: a config/network glitch makes both nodes believe they're Primary; a fencing/quorum mechanism is needed to prevent it.", ja: "スプリットブレインは分散システムの典型的な障害で、設定/ネットワークの不具合により両ノードが自分をプライマリだと思い込む。防ぐにはフェンシング/クォーラムの仕組みが必要。" },
  }),
  mcq({
    q: { vi: "Bước đối soát dữ liệu (reconciliation) ngay sau failover dùng để phát hiện điều gì?", en: "What does the data reconciliation step right after a failover detect?", ja: "フェイルオーバー直後の対帳（データ照合）ステップは何を検出するためのもの？" },
    options: [
      { vi: "Các giao dịch bị treo giữa chừng hoặc bị ghi nhận trùng lặp do sự cố/retry", en: "Transactions left hanging mid-way or duplicated due to the incident/retry", ja: "障害やリトライによって途中で止まったり重複記録されたりした取引" },
      { vi: "Tốc độ mạng giữa client và server", en: "The network speed between client and server", ja: "クライアントとサーバー間のネットワーク速度" },
      { vi: "Giao diện người dùng có hiển thị đúng màu sắc hay không", en: "Whether the UI displays the correct colors", ja: "UIが正しい色を表示しているかどうか" },
      { vi: "Số lượng dòng code thay đổi trong bản vá gần nhất", en: "The number of lines of code changed in the latest patch", ja: "最新パッチで変更されたコード行数" },
      { vi: "Mật khẩu người dùng có đủ độ mạnh hay không", en: "Whether the user's password is strong enough", ja: "ユーザーのパスワードが十分強いかどうか" },
    ], correct: 0,
    explain: { vi: "Đối soát so sánh dữ liệu ở Primary trước sự cố với dữ liệu ở Standby sau khi promote để phát hiện giao dịch treo, mất hoặc nhân đôi.", en: "Reconciliation compares Primary's data before the incident with Standby's data after promotion to detect hanging, lost, or duplicated transactions.", ja: "対帳は障害前のプライマリのデータと昇格後のスタンバイのデータを比較し、宙に浮いた取引・失われた取引・重複した取引を検出する。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình giao dịch bạn sẽ test", en: "1. TL;DR & the transaction screen you'll test", ja: "1. 要点とテストする取引画面" },
    blocks: [
      TLDR("Kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing) kiểm tra khả năng hệ ngân hàng lõi khôi phục đúng và giữ toàn vẹn dữ liệu sau sự cố: mất mạng giữa giao dịch, ngắt DB, chuyển sang máy dự phòng (Standby), rồi khôi phục lại Primary. Bài này áp dụng cho core banking CoreBank + cổng thanh toán: đo RTO/RPO thực tế, thiết kế ca kiểm thử mất mạng/ngắt DB/toàn vẹn dữ liệu, đảm bảo idempotency giao dịch. Có sơ đồ trạng thái failover, nhiều bảng ca kiểm thử, 2 tình huống thật và trắc nghiệm cuối bài.",
        "Recovery & Failover Testing checks whether a core banking system recovers correctly and keeps data integrity after an incident: network loss mid-transaction, a DB outage, switching to a standby machine, then recovering back to Primary. This article applies it to CoreBank + a payment gateway: measuring real RTO/RPO, designing test cases for network loss/DB outage/data integrity, and ensuring transaction idempotency. It includes a failover state diagram, several test-case tables, 2 real situations, and a quiz.",
        "リカバリー＆フェイルオーバーテスト（Recovery & Failover Testing）は、コアバンキングシステムが障害——取引途中の通信断、DB停止、スタンバイ機への切り替え、そしてプライマリへの復帰——の後に正しく回復し、データ整合性を保てるかを確認します。本記事はコアバンキングCoreBank＋決済ゲートウェイに適用し、実際のRTO/RPO測定、通信断・DB停止・データ整合性のテストケース設計、取引の冪等性の確保を扱います。フェイルオーバーの状態遷移図、複数のテストケース表、実例2件、クイズ付き。"),
      P("Nếu bạn đã quen thiết kế ca kiểm thử cho luồng nghiệp vụ đúng, chương này đưa bạn sang một lớp rủi ro khác: điều gì xảy ra khi HẠ TẦNG — không phải nghiệp vụ — gặp sự cố đúng giữa lúc tiền đang di chuyển. Với một sàn thương mại điện tử, một lần failover lỗi có thể chỉ gây gián đoạn vài phút; với hệ ngân hàng lõi, cùng một lỗi có thể khiến tiền của khách 'biến mất' tạm thời hoặc bị trừ hai lần — hai kịch bản có thể kéo theo khiếu nại, kiểm toán và mất niềm tin khách hàng. Chúng ta sẽ học qua hệ thống chuyển khoản của CoreBank: từ khái niệm RTO/RPO, sơ đồ trạng thái failover, tới các bộ ca kiểm thử cụ thể cho mất mạng, ngắt DB và toàn vẹn dữ liệu.",
        "If you're already comfortable designing test cases for the correct business flow, this chapter moves you to a different risk layer: what happens when the INFRASTRUCTURE — not the business logic — fails exactly while money is moving. On an e-commerce site, a bad failover might only cause a few minutes of disruption; on a core banking system, the same failure can make a customer's money 'disappear' temporarily or get debited twice — two scenarios that can trigger complaints, audits, and lost customer trust. We'll learn through CoreBank's transfer system: from RTO/RPO concepts, a failover state diagram, to concrete test-case sets for network loss, DB outages, and data integrity.",
        "正しい業務フローのテストケース設計に慣れているなら、この章では別のリスク層に踏み込みます：お金が移動している『まさにそのとき』にインフラ——業務ロジックではなく——が障害を起こすとどうなるか、という問題です。ECサイトでは、フェイルオーバーの失敗は数分の中断で済むかもしれませんが、コアバンキングシステムでは同じ障害が顧客のお金を一時的に『消失』させたり二重に引き落としたりし得ます——どちらも苦情、監査、顧客信頼の喪失につながりかねません。CoreBankの振込システムを通じて、RTO/RPOの概念、フェイルオーバーの状態遷移図から、通信断・DB停止・データ整合性の具体的なテストケース群まで学びます。"),
      IMG(m_txn, "Màn hình chuyển khoản CoreBank bị mất mạng đúng giữa lúc ghi Nợ tài khoản nguồn và ghi Có tài khoản đích", "CoreBank transfer screen losing connection exactly between debiting the source and crediting the destination account", "送金元口座への引き落としと送金先口座への入金のちょうど間で通信が切れたCoreBank振込画面"),
      DEF("Recovery & Failover Testing", "kiểm thử khả năng hệ thống khôi phục đúng và giữ toàn vẹn dữ liệu sau sự cố hạ tầng, bao gồm việc chuyển đổi sang thành phần dự phòng khi thành phần chính gặp lỗi.",
        "testing a system's ability to recover correctly and keep data integrity after an infrastructure incident, including switching to a standby component when the primary one fails.",
        "インフラ障害の後、システムが正しく回復しデータ整合性を保てるかをテストする手法。主系に障害が起きたときに副系へ切り替える動作も含む。"),
    ] },
  { heading: { vi: "2. RTO, RPO & vì sao ngân hàng lõi cần kiểm thử phục hồi", en: "2. RTO, RPO & why core banking needs recovery testing", ja: "2. RTO・RPOと、なぜコアバンキングに復旧テストが必要か" },
    blocks: [
      P("Hai chỉ số nền tảng của mọi kế hoạch phục hồi thảm hoạ (Disaster Recovery) là RTO và RPO. RTO (Recovery Time Objective) là THỜI GIAN tối đa hệ thống được phép ngừng hoạt động, tính từ lúc sự cố xảy ra tới lúc phục hồi xong và sẵn sàng phục vụ trở lại. RPO (Recovery Point Objective) là lượng DỮ LIỆU tối đa được phép mất, tính theo khoảng thời gian trước sự cố — RPO = 5 giây nghĩa là dữ liệu ghi trong 5 giây cuối trước sự cố có thể bị mất, còn dữ liệu cũ hơn phải được bảo toàn. Với giao dịch tài chính, RPO thường phải gần bằng 0: mất dù một giao dịch cũng có thể là tiền thật của khách hàng biến mất.",
        "Two foundational metrics of any Disaster Recovery plan are RTO and RPO. RTO (Recovery Time Objective) is the maximum TIME a system may be down, measured from the moment an incident happens to when the system has recovered and is ready to serve again. RPO (Recovery Point Objective) is the maximum amount of DATA that may be lost, measured as a time window before the incident — an RPO of 5 seconds means data written in the last 5 seconds before the incident may be lost, while older data must be preserved. For financial transactions, RPO usually needs to be close to zero: losing even one transaction can mean a customer's real money disappears.",
        "あらゆる災害復旧（Disaster Recovery）計画の基礎となる2つの指標がRTOとRPOです。RTO（目標復旧時間）は、障害発生の瞬間から復旧が完了し再びサービス提供可能になるまでの最大『時間』です。RPO（目標復旧時点）は、障害発生前のある時間幅で失ってよい最大『データ量』です——RPO=5秒とは、障害直前5秒間に書き込まれたデータは失われてもよいが、それより古いデータは保全されなければならないという意味です。金融取引ではRPOはほぼゼロが求められることが多く、たった1件の取引を失うだけでも顧客の実際のお金が消えることを意味します。"),
      P("Vì sao core banking đặc biệt cần kiểm thử phục hồi có hệ thống, không chỉ dựa vào tài liệu kiến trúc? Vì RTO/RPO trong tài liệu là con số MỤC TIÊU do đội kiến trúc/kiến trúc hạ tầng thiết kế, còn RTO/RPO THỰC TẾ chỉ lộ ra khi bạn thật sự gây sự cố và đo lại. Nhiều hệ thống có replication đồng bộ trên giấy nhưng khi đo thật lại có độ trễ vài giây; nhiều runbook failover chạy mượt trên môi trường test nhưng vượt SLA nhiều lần khi chạy ở production do dữ liệu lớn hơn, kết nối phức tạp hơn. Vai trò của tester ở đây không phải thiết kế hạ tầng, mà là ĐO và XÁC MINH những con số mà business đã cam kết với khách hàng và cơ quan quản lý.",
        "Why does core banking specifically need systematic recovery testing, not just reliance on architecture documents? Because the RTO/RPO in a document are TARGET numbers designed by the architecture/infrastructure team, while the ACTUAL RTO/RPO only surfaces when you genuinely trigger an incident and measure it. Many systems have synchronous replication on paper but show several seconds of lag when actually measured; many failover runbooks run smoothly in a test environment but blow past the SLA multiple times in production due to larger data volumes and more complex connections. The tester's role here isn't to design infrastructure, but to MEASURE and VERIFY the numbers the business has committed to customers and regulators.",
        "アーキテクチャ文書に頼るだけでなく、なぜコアバンキングには体系的な復旧テストが特に必要なのでしょうか。文書上のRTO/RPOはアーキテクチャ/インフラチームが設計した『目標』値であり、『実際の』RTO/RPOは実際に障害を発生させて測定して初めて明らかになるからです。多くのシステムは書類上は同期レプリケーションでも、実測すると数秒の遅延があります。多くのフェイルオーバー・ランブックはテスト環境では滑らかに動作しても、本番環境ではデータ量の増大や接続の複雑化により何度もSLAを超過します。ここでのテスターの役割はインフラを設計することではなく、ビジネスが顧客や規制当局に約束した数値を『測定』し『検証』することです。"),
      DEF("RTO (Recovery Time Objective)", "thời gian tối đa hệ thống được phép ngừng hoạt động trước khi phục hồi xong và sẵn sàng phục vụ trở lại.",
        "the maximum time a system may be down before recovery completes and service resumes.",
        "復旧が完了しサービスが再開されるまでシステムが停止していてよい最大時間。"),
      DEF("RPO (Recovery Point Objective)", "lượng dữ liệu tối đa được phép mất, tính theo khoảng thời gian trước thời điểm sự cố xảy ra.",
        "the maximum amount of data that may be lost, measured as a time window before the incident occurs.",
        "障害発生前のある時間幅で失ってもよい最大のデータ量。"),
    ] },
  { heading: { vi: "3. Kiến trúc failover Primary→Standby & checklist lỗi kinh nghiệm", en: "3. Primary→Standby failover architecture & experience checklist", ja: "3. プライマリ→スタンバイのフェイルオーバー構成と経験ベースのチェックリスト" },
    blocks: [
      P("Trước khi thiết kế ca kiểm thử, tester cần hiểu rõ vòng đời một lần failover đi qua những trạng thái nào — không chỉ 'Primary hỏng, Standby lên thay' đơn giản. Sơ đồ dưới mô tả 6 trạng thái: Primary ACTIVE (bình thường) → Primary DOWN (sự cố xảy ra) → Standby PROMOTED (chuyển đổi, đo RTO tại đây) → Đối soát dữ liệu (kiểm tra giao dịch dở dang, đo khoảng dữ liệu mất so với RPO) → Primary phục hồi & resync (đồng bộ ngược dữ liệu ghi trong lúc Standby hoạt động) → Primary ACTIVE trở lại (failback hoàn tất). Mỗi mũi tên trong sơ đồ là một điểm cần có ca kiểm thử riêng, đặc biệt là cạnh nét đứt 'Dữ liệu ngoài RPO' — nơi dữ liệu có thể bị mất nếu sự cố xảy ra đúng lúc.",
        "Before designing test cases, testers need to understand exactly which states a failover cycle passes through — not just a simple 'Primary fails, Standby takes over'. The diagram below describes 6 states: Primary ACTIVE (normal) → Primary DOWN (incident occurs) → Standby PROMOTED (switchover, RTO is measured here) → Data reconciliation (checking in-flight transactions, measuring data loss against RPO) → Primary recovers & resyncs (syncing back data written while Standby was active) → Primary ACTIVE again (failback complete). Every arrow in the diagram is a point that needs its own test case, especially the dashed 'Data outside RPO' edge — where data can be lost if the incident hits at exactly the wrong moment.",
        "テストケースを設計する前に、テスターはフェイルオーバーの1サイクルがどの状態を経るかを正確に理解しておく必要があります——単純な『プライマリが故障し、スタンバイが引き継ぐ』だけではありません。下の図は6つの状態を示します：Primary ACTIVE（正常）→ Primary DOWN（障害発生）→ Standby PROMOTED（切り替え、ここでRTOを測定）→ データ対帳（進行中の取引を確認し、RPOに対するデータ損失を測定）→ プライマリ復旧・再同期（スタンバイ稼働中に書かれたデータを逆同期）→ Primary ACTIVE復帰（フェイルバック完了）。図中の各矢印はそれぞれ独自のテストケースが必要な地点であり、特に破線の『RPO範囲外のデータ』の辺は、障害がまさに悪いタイミングで起きた場合にデータが失われ得る箇所です。"),
      IMG(m_flow, "Sơ đồ trạng thái vòng đời failover: Primary ACTIVE → Primary DOWN → Standby PROMOTED → đối soát → resync → failback", "Failover lifecycle state diagram: Primary ACTIVE → Primary DOWN → Standby PROMOTED → reconciliation → resync → failback", "フェイルオーバーのライフサイクル状態遷移図：Primary ACTIVE → Primary DOWN → Standby PROMOTED → 対帳 → 再同期 → フェイルバック"),
      P("Từ sơ đồ này, ta xây một Defect Taxonomy — checklist lỗi kinh nghiệm dành riêng cho phục hồi/failover, tổng hợp từ các diễn tập DR (Disaster Recovery drill) và sự cố production đã ghi nhận. Khác với checklist chức năng thông thường, mỗi dòng trong bảng dưới trả lời câu hỏi 'lỗi này lộ ra ở TRẠNG THÁI nào trong vòng đời failover' — giúp tester biết chính xác nên gây sự cố vào lúc nào để tái hiện đúng loại lỗi cần tìm.",
        "From this diagram, we build a defect taxonomy — an experience-based checklist specific to recovery/failover, compiled from Disaster Recovery drills and recorded production incidents. Unlike an ordinary functional checklist, every row below answers 'at which STATE in the failover lifecycle does this bug surface' — helping testers know exactly when to trigger an incident to reproduce the right class of bug.",
        "この図から、災害復旧（DR）訓練と記録された本番インシデントから集約された、復旧/フェイルオーバー専用のデフェクト・タクソノミー（経験ベースのチェックリスト）を構築します。通常の機能チェックリストと違い、以下の表の各行は『この不具合はフェイルオーバーのライフサイクルのどの状態で現れるか』に答えます——テスターが目的のバグ種別を再現するために、いつ障害を発生させるべきかを正確に把握できるようにします。"),
      IMG(m_taxonomy, "Defect Taxonomy — checklist lỗi kinh nghiệm phục hồi/failover cho core banking, theo trạng thái vòng đời", "Defect taxonomy — an experience-based recovery/failover checklist for core banking, mapped to lifecycle states", "コアバンキング向けリカバリー/フェイルオーバーのデフェクト・タクソノミー — ライフサイクルの状態別"),
    ] },
  { heading: { vi: "4. Quy trình thiết kế ca kiểm thử phục hồi có hệ thống", en: "4. A systematic process for designing recovery test cases", ja: "4. 復旧テストケースを体系的に設計するプロセス" },
    blocks: [
      P("Kiểm thử phục hồi chuyên nghiệp không phải 'rút dây mạng rồi xem điều gì xảy ra' một cách ngẫu hứng. Nó cần một quy trình lặp lại được, có thể đo lường, và bàn giao lại cho đồng đội — đặc biệt quan trọng vì kiểm thử phục hồi thường đụng tới môi trường gần giống production, cần phối hợp chặt với đội vận hành (Ops/SRE).",
        "Professional recovery testing isn't 'unplug the network cable and see what happens' on a whim. It needs a repeatable, measurable process that can be handed off to teammates — especially important since recovery testing often touches a near-production environment and requires close coordination with the Ops/SRE team.",
        "プロフェッショナルな復旧テストは、思いつきで『ネットワークケーブルを抜いて何が起きるか見る』ものではありません。再現可能で測定可能な、チームメンバーに引き継げるプロセスが必要です——復旧テストは本番に近い環境に触れることが多く、運用/SREチームとの緊密な連携が特に重要になるためです。"),
      STEP(1, "Xác định phạm vi & môi trường diễn tập: dùng môi trường staging/DR riêng có cấu hình Primary-Standby giống production, KHÔNG diễn tập trực tiếp trên production khi chưa có quy trình an toàn.", "Define the scope & drill environment: use a dedicated staging/DR environment with a Primary-Standby setup similar to production, and do NOT drill directly on production without a safety procedure.", "対象範囲と訓練環境を定める：本番に近いPrimary-Standby構成を持つ専用のステージング/DR環境を使い、安全な手順が確立されていない状態で本番環境で直接訓練しない。"),
      STEP(2, "Chuẩn bị dữ liệu 'sống': tạo một loạt giao dịch đang chạy (pending, đã ghi Nợ chưa ghi Có, đang chờ đối soát) để sự cố xảy ra đúng lúc có dữ liệu thật cần bảo toàn.", "Prepare 'live' data: create a batch of in-flight transactions (pending, debited-but-not-credited, awaiting reconciliation) so the incident hits exactly while there is real data that needs preserving.", "『生きた』データを用意する：一連の進行中の取引（保留中、引き落とし済みだが未入金、対帳待ち）を作成し、実際に保全すべきデータがある状態で障害が起きるようにする。"),
      STEP(3, "Gây sự cố có kiểm soát (ngắt mạng/kill process/unmount volume) đúng vào thời điểm đã chuẩn bị, ghi lại mốc thời gian chính xác để tính RTO sau này.", "Trigger a controlled incident (network cut/process kill/volume unmount) exactly at the prepared moment, recording the precise timestamp to calculate RTO afterward.", "準備した瞬間に制御された障害（通信遮断/プロセスキル/ボリュームのアンマウント）を発生させ、後でRTOを計算するために正確なタイムスタンプを記録する。"),
      STEP(4, "Đo RTO thực tế (thời gian tới khi hệ thống sẵn sàng phục vụ), đo RPO thực tế (đối chiếu dữ liệu mất so với mốc sự cố), và kiểm tra toàn vẹn từng giao dịch dở dang trước khi kết luận diễn tập thành công.", "Measure the actual RTO (time until the system is ready to serve again), measure the actual RPO (compare lost data against the incident timestamp), and verify the integrity of every in-flight transaction before concluding the drill succeeded.", "実際のRTO（サービス再開可能になるまでの時間）を測定し、実際のRPO（障害時点と比較した損失データ）を測定し、訓練成功と結論づける前に進行中だった各取引の整合性を検証する。"),
      CODE("text", "KE HOACH DIEN TAP DR - Failover Primary -> Standby (CoreBank)\nT+0s   : tao 20 GD dang chay (5 GD pending, 5 GD da ghi No chua ghi Co, 10 GD binh thuong)\nT+2s   : kill -9 tien trinh Primary DB (khong graceful shutdown)\nT+?s   : Standby duoc promote  -> ghi lai moc thoi gian nay\nRTO    = (moc Standby san sang) - (T+2s)\nRPO    = (du lieu ghi cuoi cung tren Standby) so voi (T+2s)\nSau do : chay script doi soat 20 GD -> xac nhan khong GD nao mat/treo/nhan doi"),
      TIP("Luôn diễn tập với dữ liệu 'đang sống' (giao dịch dở dang), không chỉ diễn tập khi hệ thống rảnh — đó là điểm khác biệt giữa một bài kiểm thử phục hồi thật sự và một bài demo 'trông có vẻ ổn'.", "Always drill with 'live' data (in-flight transactions), not only when the system is idle — that's the difference between a genuine recovery test and a demo that merely 'looks fine'.", "常に『生きた』データ（進行中の取引）で訓練し、システムがアイドルのときだけ訓練しない——それが本物の復旧テストと『見た目が大丈夫そうな』デモとの違いです。"),
    ] },
  { heading: { vi: "5. Ca kiểm thử phục hồi — mất mạng giữa giao dịch & RTO/RPO", en: "5. Recovery test cases — network loss mid-transaction & RTO/RPO", ja: "5. 復旧テストケース — 取引途中の通信断とRTO/RPO" },
    blocks: [
      P("Mất mạng giữa giao dịch là nhóm ca kiểm thử quan trọng nhất vì nó trực tiếp kiểm chứng cam kết RPO cho dữ liệu tài chính. Khác với ca chức năng thông thường chỉ kiểm tra 'thành công hay thất bại', ca kiểm thử phục hồi phải kiểm tra thêm KHOẢNG THỜI GIAN sự cố xảy ra so với các bước ghi dữ liệu — vì cùng một sự cố mạng nhưng xảy ra sớm hơn hoặc muộn hơn vài trăm mili-giây có thể dẫn tới hậu quả hoàn toàn khác nhau.",
        "Network loss mid-transaction is the most important test-case group because it directly verifies the RPO commitment for financial data. Unlike an ordinary functional case that only checks 'success or failure', a recovery test case must also check the TIMING of the incident relative to the data-write steps — because the same network incident happening a few hundred milliseconds earlier or later can lead to completely different consequences.",
        "取引途中の通信断は、金融データに対するRPOの約束を直接検証するため、最も重要なテストケース群です。『成功か失敗か』だけを確認する通常の機能ケースとは異なり、復旧テストケースはデータ書き込みステップに対する障害発生の『タイミング』も確認する必要があります——同じネットワーク障害でも数百ミリ秒早いか遅いかで結果が全く異なり得るからです。"),
      IMG(m_case_network, "Bảng ca kiểm thử phục hồi cho mất mạng giữa giao dịch, kèm RTO/RPO mong đợi cho từng ca", "Recovery test-case table for network loss mid-transaction, with expected RTO/RPO per case", "取引途中の通信断に対する復旧テストケース表、各ケースの期待RTO/RPO付き"),
      P("Điểm dễ bị bỏ sót nhất trong bảng trên là ca cuối — hai sự cố chồng lên nhau (mất mạng đúng lúc đang failover). Nhiều đội chỉ diễn tập 'một sự cố tại một thời điểm' và coi đó là đủ, nhưng thực tế production không hiếm trường hợp sự cố hạ tầng kéo theo sự cố khác (ví dụ mất điện gây cả mất mạng lẫn crash tiến trình cùng lúc). Một hệ thống phục hồi tốt cần phản ứng AN TOÀN dù gặp sự cố chồng chéo — nghĩa là dừng lại và báo lỗi rõ ràng thay vì âm thầm để mất dữ liệu.",
        "The most easily overlooked point in the table above is the last case — two incidents overlapping (network loss exactly during failover). Many teams only drill 'one incident at a time' and consider that sufficient, but in real production, an infrastructure incident isn't rare to trigger another (e.g. a power outage causing both network loss and process crashes at once). A well-recovering system must respond SAFELY even under overlapping incidents — meaning it should halt and report a clear error rather than silently losing data.",
        "上の表で最も見落とされやすいのは最後のケース——2つの障害が重なる場合（フェイルオーバー中にちょうど通信が切れる）です。多くのチームは『一度に1つの障害』だけを訓練し、それで十分だと考えがちですが、実際の本番環境ではインフラ障害が別の障害を引き起こすことは珍しくありません（例えば停電が通信断とプロセスクラッシュを同時に引き起こす）。復旧性の高いシステムは、障害が重なった場合でも『安全に』反応する必要があります——つまり、静かにデータを失うのではなく、停止して明確なエラーを報告すべきです。"),
    ] },
  { heading: { vi: "6. Ca kiểm thử phục hồi — ngắt DB & failover sang Standby", en: "6. Recovery test cases — DB outage & failover to Standby", ja: "6. 復旧テストケース — DB停止とスタンバイへのフェイルオーバー" },
    blocks: [
      P("Nhóm ca này kiểm chứng chính cơ chế failover: khi Primary DB không còn khả năng phục vụ, hệ thống có chuyển đúng, chuyển đủ nhanh và chuyển an toàn sang Standby không. Có hai cách gây sự cố cần phân biệt rõ: sự cố 'sạch' (graceful shutdown — Primary tự báo trước khi dừng) và sự cố 'bẩn' (kill đột ngột, mất điện, hỏng ổ đĩa — không có cảnh báo trước). Rất nhiều hệ thống chỉ được test kỹ với sự cố sạch vì dễ tái hiện, trong khi sự cố thật trong production gần như luôn là sự cố bẩn.",
        "This case group directly verifies the failover mechanism itself: when Primary DB can no longer serve, does the system switch correctly, fast enough, and safely to Standby? There are two ways to trigger an incident that must be clearly distinguished: a 'clean' incident (graceful shutdown — Primary announces before stopping) and a 'dirty' incident (sudden kill, power loss, disk failure — no advance warning). Many systems are only tested thoroughly with clean incidents because they're easy to reproduce, while real production incidents are almost always dirty.",
        "このケース群は、フェイルオーバーの仕組みそのものを直接検証します：プライマリDBがサービス提供できなくなったとき、システムは正しく、十分速く、安全にスタンバイへ切り替わるか？障害の起こし方には明確に区別すべき2種類があります：『きれいな』障害（グレースフルシャットダウン——プライマリが停止前に事前通知する）と『汚い』障害（突然のkill、停電、ディスク故障——事前警告なし）です。多くのシステムは再現しやすいという理由できれいな障害でしか十分にテストされませんが、実際の本番障害はほぼ常に汚い障害です。"),
      IMG(m_case_db, "Bảng ca kiểm thử phục hồi cho ngắt DB đột ngột và failover sang Standby, kèm kết quả mong đợi", "Recovery test-case table for a sudden DB outage and failover to Standby, with expected results", "突然のDB停止とスタンバイへのフェイルオーバーに対する復旧テストケース表、期待結果付き"),
      P("Ca 'split-brain' ở cuối bảng đáng chú ý riêng vì nó không phải lỗi do sự cố tự nhiên, mà là lỗi do CHÍNH cơ chế failover thiết kế sai gây ra: nếu Primary chỉ tạm 'mất liên lạc' (network partition) chứ chưa thật sự chết, mà hệ thống vẫn promote Standby, ta có thể có 2 node cùng nhận ghi — hai bản ghi khác nhau cho cùng một tài khoản. Đây là lý do mọi kiến trúc failover ngân hàng cần cơ chế fencing (chặn node cũ ghi tiếp) hoặc quorum (cần đa số node đồng thuận mới được promote), và test case cho split-brain nên nằm trong bộ kiểm thử bảo mật lẫn bộ kiểm thử phục hồi.",
        "The 'split-brain' case at the bottom of the table deserves special attention because it's not a bug from a natural incident, but a bug caused by the failover mechanism ITSELF being designed wrongly: if Primary only temporarily 'loses contact' (a network partition) rather than truly dying, yet the system still promotes Standby, we can end up with 2 nodes both accepting writes — two different records for the same account. This is why every banking failover architecture needs a fencing mechanism (blocking the old node from writing further) or quorum (requiring majority-node consensus before promoting), and the split-brain test case should live in both the security test suite and the recovery test suite.",
        "表の最後にある『スプリットブレイン』ケースは特に注目に値します。これは自然な障害によるバグではなく、フェイルオーバーの仕組み自体の設計ミスによるバグだからです：プライマリが本当に停止したのではなく一時的に『連絡が取れない』（ネットワーク分断）だけなのに、システムがそれでもスタンバイを昇格させてしまうと、2つのノードが同時に書き込みを受け付ける状態になり得ます——同じ口座に対して異なる2つの記録ができてしまいます。これが、あらゆる銀行のフェイルオーバーアーキテクチャがフェンシング機構（旧ノードのそれ以上の書き込みをブロックする）やクォーラム（昇格前に過半数ノードの合意を必要とする）を必要とする理由であり、スプリットブレインのテストケースはセキュリティテストスイートと復旧テストスイートの両方に置くべきです。"),
    ] },
  { heading: { vi: "7. Ca kiểm thử phục hồi — toàn vẹn dữ liệu & idempotency giao dịch", en: "7. Recovery test cases — data integrity & transaction idempotency", ja: "7. 復旧テストケース — データ整合性と取引の冪等性" },
    blocks: [
      P("Failover đúng cách chỉ là điều kiện CẦN; toàn vẹn dữ liệu sau failover mới là điều kiện ĐỦ để một hệ ngân hàng lõi được coi là phục hồi thành công. Nhóm ca kiểm thử này trả lời câu hỏi: sau khi Standby lên thay, dữ liệu có ĐÚNG, ĐỦ và KHÔNG TRÙNG LẶP không? Trọng tâm là cơ chế idempotency — cách hệ thống nhận diện một request đã được xử lý trước đó để không xử lý lại, dù client (do timeout hoặc thói quen bấm lại) gửi cùng một yêu cầu nhiều lần sau khi hệ thống vừa đổi node xử lý.",
        "A correct failover is only a NECESSARY condition; data integrity after failover is the SUFFICIENT condition for a core banking system to be considered successfully recovered. This test-case group answers the question: after Standby takes over, is the data CORRECT, COMPLETE, and NOT DUPLICATED? The focus is the idempotency mechanism — how the system recognizes a request it has already processed so it doesn't reprocess it, even if the client (due to a timeout or a habit of clicking again) sends the same request multiple times right after the system has just switched processing nodes.",
        "正しいフェイルオーバーは『必要』条件に過ぎません。フェイルオーバー後のデータ整合性こそが、コアバンキングシステムが復旧に成功したと見なされるための『十分』条件です。このテストケース群は次の問いに答えます：スタンバイが引き継いだ後、データは『正しく』『完全』で『重複していない』か？焦点は冪等性の仕組みです——システムが処理ノードを切り替えた直後にクライアントが（タイムアウトや再クリックの癖により）同じリクエストを何度も送信しても、すでに処理済みのリクエストを認識し、再処理しない仕組みです。"),
      IMG(m_case_integrity, "Bảng ca kiểm thử phục hồi cho toàn vẹn dữ liệu và idempotency giao dịch sau failover, kèm kết quả mong đợi", "Recovery test-case table for data integrity and transaction idempotency after a failover, with expected results", "フェイルオーバー後のデータ整合性と取引の冪等性に対する復旧テストケース表、期待結果付き"),
      CODE("text", "// Kiem tra idempotency key SAU KHI failover (Standby moi active)\nkey = extract_idempotency_key(request)\nif exists_in_replicated_log(key):\n  return cached_result   // KHONG xu ly giao dich lan 2\nelse:\n  result = process_transfer(...)\n  replicate_before_ack(key, result)  // dam bao log duoc dong bo TRUOC khi ACK\n  return result"),
      P("Đoạn giả mã trên chỉ ra một chi tiết dễ bị bỏ sót: idempotency key phải được ĐỒNG BỘ SANG Standby TRƯỚC KHI hệ thống xác nhận (ACK) đã xử lý xong request. Nếu chỉ lưu key ở Primary rồi Primary chết ngay sau đó, Standby sau khi promote sẽ không biết request này đã xử lý, dẫn đúng tới lỗi giao dịch nhân đôi ở tình huống thực tế tại chương 9. Đây là lý do ca kiểm thử idempotency không nên chỉ chạy khi hệ thống ổn định, mà PHẢI chạy đúng lúc có failover xen giữa.",
        "The pseudocode above highlights an easily missed detail: the idempotency key must be SYNCED TO Standby BEFORE the system acknowledges (ACKs) that the request was processed. If the key is only saved on Primary and Primary then dies right after, Standby — once promoted — won't know the request was already processed, leading exactly to the duplicated-transaction bug in the real situation in chapter 9. This is why the idempotency test case shouldn't only run when the system is stable — it MUST run exactly while a failover is interleaved.",
        "上の疑似コードは見落としやすい詳細を示しています：冪等性キーは、システムがリクエスト処理完了を確認（ACK）する『前』にスタンバイへ同期されなければなりません。キーがプライマリにのみ保存され、その直後にプライマリが停止すると、昇格後のスタンバイはこのリクエストがすでに処理済みであることを知らず、第9章の実例にある取引重複バグにまさにつながります。だからこそ冪等性のテストケースは、システムが安定しているときだけでなく、フェイルオーバーがちょうど絡むタイミングで『必ず』実行すべきです。"),
    ] },
  { heading: { vi: "8. Tình huống 1: mất mạng sau khi trừ tiền, chưa ghi có → tiền treo", en: "8. Situation 1: network loss after debiting, before crediting → money stuck", ja: "8. シーン1：引き落とし後・入金前に通信断 → お金が宙に浮く" },
    blocks: [
      SITUATION("Đội chỉ test kịch bản failover khi hệ thống 'rảnh' (không có giao dịch đang chạy) — mọi ca đều pass, RTO đo được rất đẹp (dưới 15 giây), ai cũng an tâm ký duyệt đưa lên production.", "The team only tests failover when the system is 'idle' (no in-flight transactions) — every case passes, the measured RTO looks great (under 15 seconds), and everyone confidently signs off to go to production.",
        "Lên production, một giao dịch chuyển khoản 8.000.000đ ĐÚNG LÚC bị mất mạng ngay sau khi ghi Nợ tài khoản nguồn nhưng trước khi ghi Có tài khoản đích. Standby được promote đúng trong RTO cam kết, nhưng giao dịch bị 'treo' ở trạng thái không rõ ràng — tiền đã mất khỏi tài khoản khách nhưng chưa tới nơi nhận, và không ai phát hiện cho tới khi khách gọi lên tổng đài khiếu nại 2 giờ sau.",
        "チームはシステムが『アイドル』（進行中の取引なし）のときのフェイルオーバーシナリオしかテストしない——全ケースが合格し、測定RTOも非常に良好（15秒未満）で、誰もが安心して本番リリースにサインする。",
        "本番環境で、800万ドンの振込がまさに送金元口座への引き落とし直後、送金先口座への入金前に通信を失う。Standbyはコミットされた RTO内で昇格するが、取引は不明瞭な状態で『宙に浮いた』ままになる——顧客の口座からお金は消えたが届いておらず、2時間後に顧客がコールセンターに苦情を言うまで誰も気づかない。"),
      SOLVE("Bổ sung ca kiểm thử phục hồi 'gây sự cố ĐÚNG LÚC có giao dịch tài chính đang mở' (chương 5) thay vì chỉ test lúc hệ thống rảnh, và bắt buộc mọi giao dịch ghi Nợ/ghi Có phải có bước đối soát tự động chạy ngay sau failover để phát hiện giao dịch treo trước khi khách phát hiện.", "Add recovery test cases that trigger the incident EXACTLY WHILE a financial transaction is open (chapter 5) instead of only testing when the system is idle, and require every debit/credit transaction to have an automatic reconciliation step running right after failover to catch hanging transactions before the customer does.", "『財務取引が進行中のまさにそのとき』に障害を発生させる復旧テストケース（第5章）を、システムがアイドルのときだけのテストに加えて追加し、フェイルオーバー直後に自動対帳ステップを必須で実行し、顧客が気づく前に宙に浮いた取引を検出できるようにする。"),
      IMG(m_jira, "Ticket lỗi mất toàn vẹn dữ liệu: giao dịch treo do mất mạng đúng giữa lúc ghi Nợ và ghi Có", "Data-integrity bug ticket: a transaction hanging due to network loss exactly between debit and credit", "データ整合性喪失のバグチケット：引き落としと入金のちょうど間で通信が切れて宙に浮いた取引"),
      P("Ví dụ này cho thấy vì sao 'diễn tập failover khi hệ thống rảnh' là một cái bẫy nguy hiểm: nó tạo cảm giác an toàn giả — RTO đo được đẹp nhưng hoàn toàn không chạm tới loại lỗi nguy hiểm nhất. Một tester dày dạn kinh nghiệm phục hồi luôn tự hỏi: nếu sự cố xảy ra đúng ở BƯỚC GIỮA của một giao dịch nhiều bước ghi, hệ thống có phát hiện và xử lý được không, hay chỉ âm thầm để nó trôi vào trạng thái mập mờ?",
        "This example shows why 'drilling failover while the system is idle' is a dangerous trap: it creates a false sense of safety — the measured RTO looks great, but it never touches the most dangerous bug class at all. A tester experienced in recovery testing always asks: if the incident happens exactly at the MIDDLE STEP of a multi-write transaction, does the system detect and handle it, or does it silently let it drift into an ambiguous state?",
        "この例は『システムがアイドルのときにフェイルオーバーを訓練する』ことがなぜ危険な罠なのかを示しています：それは偽りの安心感を生み出します——測定RTOは良好に見えても、最も危険な不具合クラスには全く触れていないのです。復旧テストの経験豊富なテスターは常に自問します：複数書き込みステップの取引の『中間ステップ』でまさに障害が起きたら、システムはそれを検出・処理できるのか、それとも静かに曖昧な状態へ漂わせてしまうのか。"),
      RECAP(["Diễn tập failover CHỈ khi hệ thống rảnh cho cảm giác an toàn giả", "Bắt buộc đối soát tự động ngay sau failover để bắt giao dịch treo trước khi khách phát hiện"],
        ["Drilling failover ONLY when the system is idle creates a false sense of safety", "Require automatic reconciliation right after failover to catch hanging transactions before the customer does"],
        ["システムがアイドルのときだけフェイルオーバーを訓練すると偽りの安心感を生む", "フェイルオーバー直後に自動対帳を必須化し、顧客が気づく前に宙に浮いた取引を検出する"]),
    ] },
  { heading: { vi: "9. Tình huống 2: failover xong nhưng giao dịch nhân đôi do thiếu idempotency", en: "9. Situation 2: after failover, a transaction is duplicated due to missing idempotency", ja: "9. シーン2：フェイルオーバー後、冪等性の欠如で取引が重複する" },
    blocks: [
      SITUATION("Đội tự tin failover 'nhanh và mượt' vì RTO đo được chỉ 9 giây, rất tốt so với SLA 30 giây — không ai kiểm tra thêm việc client tự động retry sẽ ảnh hưởng gì tới hệ thống vừa đổi node xử lý.", "The team feels confident failover is 'fast and smooth' since the measured RTO is only 9 seconds, well within the 30-second SLA — nobody checks further what impact an automatic client retry has on a system that just switched processing nodes.",
        "Một khách chuyển 8.000.000đ đúng lúc Primary gặp sự cố; app client tự động retry request sau 5 giây theo thiết kế UX 'tự phục hồi'. Standby đã tiếp nhận xử lý cả request gốc lẫn request retry vì chưa nhận được idempotency key đã lưu ở Primary — kết quả là tài khoản nguồn bị trừ 16.000.000đ cho một lệnh chuyển 8.000.000đ, với 2 mã giao dịch khác nhau.",
        "測定RTOがわずか9秒で30秒SLAに対して非常に良好なため、チームはフェイルオーバーが『速くて滑らか』だと自信を持つ——処理ノードを切り替えたばかりのシステムに、クライアントの自動リトライがどんな影響を与えるかを誰もさらに確認しない。",
        "ある顧客がまさにプライマリに障害が起きたタイミングで800万ドンを送金する。クライアントアプリは『自己回復』UX設計により5秒後にリクエストを自動リトライする。スタンバイはプライマリに保存されていた冪等性キーをまだ受け取っていなかったため、元のリクエストとリトライリクエストの両方を処理してしまう——結果として、800万ドンの振込に対し送金元口座から1,600万ドンが引き落とされ、2つの異なる取引番号が発行される。"),
      SOLVE("Bổ sung ca kiểm thử phục hồi 'client retry đúng lúc vừa failover' (chương 7) vào bộ hồi quy bắt buộc, và sửa cơ chế đồng bộ để idempotency key được replicate sang Standby TRƯỚC KHI hệ thống ACK request gốc — không lưu key rồi ACK ngay, tránh đúng khe hở gây nhân đôi.", "Add the 'client retry exactly after a failover' recovery test case (chapter 7) to the mandatory regression suite, and fix the sync mechanism so the idempotency key is replicated to Standby BEFORE the system ACKs the original request — not saving the key and ACKing immediately, avoiding exactly the gap that causes duplication.", "『フェイルオーバー直後のクライアントリトライ』復旧テストケース（第7章）を必須の回帰テストスイートに追加し、システムが元のリクエストをACKする『前』に冪等性キーがスタンバイへレプリケートされるよう同期の仕組みを修正する——キーを保存してすぐACKするのではなく、重複を引き起こすまさにその隙間を回避する。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua Recovery & Failover Testing (CoreBank · Sprint DR)", "A board tracking bugs found via Recovery & Failover Testing (CoreBank · DR sprint)", "Recovery & Failover Testingで見つかったバグの追跡ボード（CoreBank・DRスプリント）"),
      IMG(m_dash, "Số liệu diễn tập DR: RTO thực đo vượt SLA, RPO đạt mục tiêu, số giao dịch treo/nhân đôi tìm được", "DR drill metrics: measured RTO exceeds SLA, RPO meets target, number of hanging/duplicated transactions found", "DR訓練の指標：実測RTOはSLA超過、RPOは目標達成、検出された宙に浮いた/重複取引の件数"),
      P("Lỗi nhân đôi này nguy hiểm hơn lỗi treo tiền ở chỗ nó xuất phát từ chính thiết kế 'tự phục hồi' vốn được coi là ưu điểm — client retry để trải nghiệm mượt hơn cho người dùng lại trở thành nguồn gây double-debit khi kết hợp với một failover chưa hoàn thiện đồng bộ. Bài học ở đây không phải là 'đừng retry', mà là: MỌI cơ chế retry ở tầng client PHẢI đi kèm cơ chế idempotency đáng tin cậy ở tầng server, và cơ chế đó phải được kiểm chứng đúng trong điều kiện failover, không chỉ trong điều kiện hệ thống ổn định.",
        "This duplication bug is more dangerous than the money-stuck bug in that it stems from the very 'self-recovering' design considered a strength — a client retry meant for a smoother user experience becomes a source of double-debit when combined with a failover whose sync isn't yet complete. The lesson here isn't 'don't retry' — it's that EVERY client-side retry mechanism MUST be paired with a reliable server-side idempotency mechanism, and that mechanism must be verified correctly under failover conditions, not just under stable-system conditions.",
        "この重複バグは、お金が宙に浮くバグより危険です。なぜなら、長所と見なされていた『自己回復』設計そのものから生じるからです——ユーザー体験を滑らかにするためのクライアントリトライが、同期がまだ完了していないフェイルオーバーと組み合わさることで二重引き落としの原因になります。ここでの教訓は『リトライするな』ではなく、クライアント側のあらゆるリトライ機構は、サーバー側の信頼できる冪等性機構と必ずセットでなければならず、その機構は安定した状態だけでなくフェイルオーバー条件下でも正しく検証されなければならない、ということです。"),
      RECAP(["Client retry là nguồn gây nhân đôi khi kết hợp với failover chưa đồng bộ xong idempotency key", "Idempotency key phải được replicate sang Standby TRƯỚC KHI ACK request gốc"],
        ["A client retry becomes a duplication source when combined with a failover whose idempotency key isn't synced yet", "The idempotency key must be replicated to Standby BEFORE the original request is ACKed"],
        ["クライアントリトライは、冪等性キーの同期が完了していないフェイルオーバーと組み合わさると重複の原因になる", "冪等性キーは元のリクエストがACKされる『前』にスタンバイへレプリケートされなければならない"]),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      P("Kiểm thử phục hồi mang lại giá trị lớn nhưng cũng dễ bị làm hời hợt vì tốn thời gian chuẩn bị môi trường. Phần này tổng hợp những lỗi tư duy phổ biến khi áp dụng kỹ thuật này cho dự án ngân hàng, cùng vài mẹo giúp bộ ca kiểm thử phục hồi thực sự hữu ích qua nhiều release chứ không chỉ chạy một lần rồi bỏ.",
        "Recovery testing delivers great value but is also easy to do superficially because preparing the environment takes time. This section gathers common thinking mistakes when applying this technique to a banking project, plus a few tips to keep your recovery test suite genuinely useful across many releases rather than run once and abandoned.",
        "復旧テストは大きな価値をもたらしますが、環境準備に時間がかかるため表面的になりがちでもあります。このセクションでは、銀行プロジェクトでこの技法を適用する際によくある思考の誤りと、復旧テストスイートを一度実行して終わりにせず、多くのリリースにわたって本当に役立つものにするためのコツをまとめます。"),
      PITFALL("Chỉ diễn tập failover khi hệ thống rảnh (không có giao dịch đang chạy) — bỏ sót nhóm lỗi toàn vẹn dữ liệu nguy hiểm nhất, chỉ lộ ra khi sự cố trùng với giao dịch dở dang.", "Only drilling failover when the system is idle (no in-flight transactions) — missing the most dangerous data-integrity bug class, which only surfaces when the incident coincides with an in-flight transaction.", "システムがアイドル（進行中の取引なし）のときだけフェイルオーバー訓練を行う——障害が進行中の取引と重なったときにしか現れない、最も危険なデータ整合性の不具合クラスを見逃す。"),
      PITFALL("Coi RTO/RPO trong tài liệu kiến trúc là sự thật hiển nhiên, không bao giờ đo lại bằng diễn tập thật — con số 'trên giấy' và con số 'thực đo' có thể lệch nhau rất xa.", "Treating the RTO/RPO written in architecture documents as self-evident truth, never actually re-measuring them via real drills — the 'on-paper' number and the 'actually measured' number can differ enormously.", "アーキテクチャ文書に書かれたRTO/RPOを自明の事実として扱い、実際の訓練で再測定しない——『書類上の』数値と『実測の』数値は大きくかけ離れることがある。"),
      TIP("Luôn ghi lại timestamp chính xác của MỖI bước (sự cố xảy ra, Standby được promote, đối soát hoàn tất) trong mỗi diễn tập — đây là bằng chứng duy nhất để tính RTO/RPO thực và để tranh luận với đội kiến trúc khi có chênh lệch.", "Always record the precise timestamp of EVERY step (incident occurs, Standby promoted, reconciliation complete) in every drill — this is the only evidence to calculate real RTO/RPO and to argue with the architecture team when there's a discrepancy.", "すべての訓練で、各ステップ（障害発生、スタンバイ昇格、対帳完了）の正確なタイムスタンプを必ず記録する——これが実際のRTO/RPOを計算し、乖離があった際にアーキテクチャチームと議論するための唯一の証拠になる。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kỹ thuật đoán lỗi (Error Guessing) trong core banking", "Error guessing in core banking", "ky-thuat-doan-loi-error-guessing-cho-tester", "コアバンキングにおけるエラー推測技法"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための結合テスト"),
      INTERNAL("Kiểm thử dựa trên rủi ro (Risk-based Testing) cho tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua toàn bộ vòng đời kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing) cho hệ thống core banking CoreBank + cổng thanh toán: từ khái niệm RTO/RPO, sơ đồ trạng thái failover Primary→Standby, xây dựng Defect Taxonomy riêng cho phục hồi, tới bộ ca kiểm thử cụ thể cho mất mạng giữa giao dịch, ngắt DB, và toàn vẹn dữ liệu/idempotency — cho tới hai tình huống thật cho thấy hậu quả khi chỉ diễn tập failover lúc hệ thống rảnh. Điểm mấu chốt cần nhớ: failover đúng chỉ là điều kiện cần, toàn vẹn dữ liệu và idempotency giao dịch mới là điều kiện đủ để một hệ ngân hàng lõi được coi là phục hồi thành công.",
        "You just walked through the full lifecycle of Recovery & Failover Testing for the CoreBank core-banking system plus a payment gateway: from RTO/RPO concepts, a Primary→Standby failover state diagram, building a defect taxonomy specific to recovery, through to concrete test-case sets for network loss mid-transaction, DB outages, and data integrity/idempotency — down to two real situations showing the consequences of only drilling failover while the system is idle. The key takeaway: a correct failover is only a necessary condition; data integrity and transaction idempotency are the sufficient condition for a core banking system to be considered successfully recovered.",
        "CoreBankのコアバンキングシステムと決済ゲートウェイに対するリカバリー＆フェイルオーバーテストの一連のライフサイクルを見てきました：RTO/RPOの概念、Primary→Standbyのフェイルオーバー状態遷移図から、復旧専用のデフェクト・タクソノミーの構築、取引途中の通信断・DB停止・データ整合性/冪等性の具体的なテストケース群、そしてシステムがアイドルのときだけフェイルオーバーを訓練した場合の結果を示す2つの実例まで学びました。重要なポイントは、正しいフェイルオーバーは必要条件に過ぎず、データ整合性と取引の冪等性こそがコアバンキングシステムが復旧に成功したと見なされるための十分条件だということです。"),
      P("Bước tiếp theo, bạn nên ôn lại kỹ thuật đoán lỗi và kiểm thử tích hợp để biết cách kết hợp kiểm thử phục hồi với các kỹ thuật khác trong một dự án ngân hàng thực chiến, đồng thời áp dụng kiểm thử dựa trên rủi ro để ưu tiên đúng những luồng tài chính quan trọng nhất khi thời gian diễn tập có hạn. Nếu bạn muốn rèn kỹ năng này bài bản qua các dự án thật, có mentor đồng hành và lộ trình từ nền tảng tới nâng cao, một khoá học Tester chuyên sâu sẽ giúp bạn rút ngắn nhiều năm tự mày mò kinh nghiệm.",
        "Next, you should review error guessing and integration testing to know how to combine recovery testing with other techniques in a real-world banking project, while applying risk-based testing to correctly prioritize the most critical financial flows when drill time is limited. If you want to build this skill properly through real projects, with a mentor guiding you and a roadmap from foundation to advanced, an in-depth Tester course will help you shortcut years of learning experience on your own.",
        "次は、エラー推測と結合テストを復習し、実戦的な銀行プロジェクトで復旧テストを他の技法とどう組み合わせるかを理解し、訓練時間が限られる中で最も重要な金融フローを正しく優先するためにリスクベーステストを適用しましょう。実際のプロジェクトを通じてこのスキルを体系的に鍛え、メンターの伴走と基礎から上級までのロードマップを求めるなら、専門的なテスターコースが、独学で何年もかかる経験習得を大幅に短縮する助けになります。"),
      CTA(course),
    ] },
];

const RECOVERY_DOC = makeDoc({
  slug: "kiem-thu-phuc-hoi-va-failover-cho-tester",
  domain: "banking",
  primaryKeyword: "kiểm thử phục hồi",
  keywords: ["kiểm thử phục hồi", "failover testing", "RTO", "RPO", "idempotency giao dịch", "core banking recovery"],
  coverLabel: "NÂNG CAO · PHỤC HỒI/FAILOVER · NGÂN HÀNG",
  crumb: "Kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing)",
  metaTitle: {
    vi: "Kiểm thử phục hồi & failover cho hệ ngân hàng lõi",
    en: "Recovery & failover testing for core banking systems",
    ja: "コアバンキングにおけるリカバリー＆フェイルオーバーテスト",
  },
  metaDescription: {
    vi: "Kiểm thử phục hồi & failover core banking: mất mạng giữa giao dịch, ngắt DB, chuyển sang Standby, đo RTO/RPO, đảm bảo toàn vẹn dữ liệu, idempotency.",
    en: "Recovery & failover testing for core banking: network loss mid-transaction, DB outages, switching to Standby, measuring real RTO/RPO, and ensuring data integrity and idempotency — with mockups and a quiz.",
    ja: "コアバンキング向けリカバリー＆フェイルオーバーテスト：取引途中の通信断、DB停止、スタンバイへの切替、実際のRTO/RPO測定、データ整合性と冪等性の確保。モックアップとクイズ付き。",
  },
  title: {
    vi: "Kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing) cho hệ ngân hàng lõi",
    en: "Recovery & Failover Testing for core banking systems",
    ja: "コアバンキングシステムのためのリカバリー＆フェイルオーバーテスト",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử phục hồi & chuyển đổi dự phòng (Recovery & Failover Testing) áp dụng cho hệ thống core banking + cổng thanh toán. Sơ đồ trạng thái failover Primary→Standby, defect taxonomy riêng cho phục hồi, ca kiểm thử mất mạng giữa giao dịch, ngắt DB, toàn vẹn dữ liệu & idempotency, đo RTO/RPO thực tế. 2 tình huống thật (tiền treo, giao dịch nhân đôi), 9 mockup giao diện/sơ đồ/bảng lỗi, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: Recovery & Failover Testing applied to a core banking system plus a payment gateway. A Primary→Standby failover state diagram, a recovery-specific defect taxonomy, test cases for network loss mid-transaction, DB outages, data integrity & idempotency, and measuring real RTO/RPO. 2 real situations (money stuck, duplicated transaction), 9 UI/diagram/defect mockups, FAQ, and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級記事：コアバンキングシステムと決済ゲートウェイに適用するリカバリー＆フェイルオーバーテスト。Primary→Standbyのフェイルオーバー状態遷移図、復旧専用のデフェクト・タクソノミー、取引途中の通信断・DB停止・データ整合性/冪等性のテストケース、実際のRTO/RPO測定。実例2件（お金が宙に浮く、取引の重複）、UI/図/不具合モックアップ9点、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thiết kế ca kiểm thử phục hồi có hệ thống cho core banking", steps: [
    { name: "Chuẩn bị môi trường DR & dữ liệu 'sống'", text: "Dùng môi trường staging/DR riêng, tạo giao dịch đang dở dang trước khi gây sự cố." },
    { name: "Gây sự cố có kiểm soát & ghi mốc thời gian", text: "Ngắt mạng/kill process/unmount volume đúng thời điểm đã chuẩn bị." },
    { name: "Đo RTO/RPO thực tế & đối soát toàn vẹn dữ liệu", text: "So sánh với SLA cam kết, xác nhận không giao dịch nào treo/nhân đôi." },
  ] },
  pages,
});

export const MA_RECOVERY_01 = [RECOVERY_DOC];
