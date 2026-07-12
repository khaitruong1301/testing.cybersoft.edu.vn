// doc_ma_installation.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử cài đặt & nâng cấp (Installation & Upgrade Testing) cho hệ ERP triển khai
// NHIỀU MÔI TRƯỜNG (chuỗi nhà máy): cài mới, nâng cấp từ bản cũ, di trú dữ liệu (migration),
// rollback khi lỗi, tương thích cấu hình/OS, cài đặt gián đoạn (thiếu dung lượng/quyền),
// gỡ cài đặt sạch. Dự án: nâng cấp NovaERP từ v3.8 lên v4.0 cho chuỗi nhà máy Nova Manufacturing.
// 2 tình huống thật (jira/kanban/dashboard), sơ đồ quy trình nâng cấp + rollback (moduleFlow).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến ERP đa nhà máy.",
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

// ── Mockup 1: màn hình cài đặt NovaERP v4.0 gián đoạn — thiếu dung lượng/quyền/kết nối ──
const m_install_error = browser("novaerp-setup.internal/cai-dat/nha-may-binh-duong", [
  panel("NovaERP v4.0 Setup Wizard — Nhà máy Bình Dương (cài mới)", [
    field(24, 20, 330, "Ổ đĩa cài đặt", "D:\\NovaERP — còn trống 1.2 GB", "error"),
    field(372, 20, 330, "Tài khoản chạy cài đặt", "nova\\svc_install — thiếu quyền Administrator", "error"),
    field(24, 92, 330, "Phiên bản .NET Runtime", "6.0.1 — yêu cầu tối thiểu 8.0", "error"),
    field(372, 92, 330, "Kết nối SQL Server đích", "novadb-bd.internal:1433 — timeout", "error"),
    btn(24, 168, 240, "Cài đặt (đang khoá)", "disabled"),
    annotate(20, 12, 330, 62, "THIẾU DUNG LƯỢNG: cần ≥8GB, còn 1.2GB"),
    annotate(368, 12, 330, 62, "THIẾU QUYỀN: tài khoản không phải Admin"),
    annotate(20, 84, 330, 62, "SAI PHIÊN BẢN RUNTIME bắt buộc"),
    annotate(368, 84, 330, 62, "MẤT KẾT NỐI DB đích khi cài đặt"),
  ].join(""), { h: 300, accent: "#b45309" }),
].join(""), { h: 356, title: "NovaERP · Cài đặt gián đoạn", accent: "#b45309" });

// ── Mockup 2: ma trận kịch bản Cài mới · Nâng cấp · Di trú dữ liệu · Rollback · Gỡ cài đặt ──
const m_matrix = grid("Ma trận kịch bản kiểm thử: Cài mới · Nâng cấp · Di trú dữ liệu · Rollback · Gỡ cài đặt (NovaERP v3→v4)",
  ["Kịch bản", "Điều kiện đầu vào", "Kết quả mong đợi", "Rủi ro chính"], [
  ["Cài mới (Fresh Install)", "Máy chủ trống, đủ tài nguyên, OS/DB đúng phiên bản hỗ trợ", "Cài đặt thành công, dịch vụ khởi động, dữ liệu khởi tạo đúng", "Bỏ sót kiểm tra tương thích OS/DB, cấu hình mạng"],
  ["Nâng cấp (Upgrade)", "Hệ đang chạy v3.8 tại nhà máy Hà Nội, có dữ liệu sản xuất thật", "Lên v4.0 không mất dữ liệu, downtime nằm trong cửa sổ cho phép", "Nâng cấp giữa chừng bị lỗi, hệ thống kẹt ở trạng thái nửa vời"],
  ["Di trú dữ liệu (Migration)", "Schema tồn kho v3 khác cấu trúc với schema v4", "Toàn bộ dữ liệu tồn kho được ánh xạ đúng, không lệch số lượng", "Mất/lệch dữ liệu do ánh xạ sai kiểu, đơn vị tính hoặc trạng thái"],
  ["Rollback", "Nâng cấp thất bại hoặc phát hiện lỗi nghiêm trọng sau go-live", "Khôi phục về v3.8 trong thời gian cam kết, dữ liệu nhất quán", "Không có kịch bản rollback, hoặc rollback làm mất dữ liệu mới"],
  ["Cài đặt gián đoạn", "Mất điện/mạng, hết dung lượng đĩa, thiếu quyền admin giữa chừng", "Installer phát hiện lỗi, dừng an toàn hoặc cho resume, không để lại rác", "Cài đặt 'treo nửa chừng', để lại service/registry hỏng"],
  ["Gỡ cài đặt sạch", "Yêu cầu gỡ NovaERP khỏi máy chủ cũ sau khi chuyển sang máy mới", "Gỡ sạch file, service, DB tạm, registry, không ảnh hưởng ứng dụng khác", "Sót file cấu hình/license gây xung đột khi cài lại"],
], { accent: "#155ce1", note: "Mỗi nhà máy trong chuỗi Nova Manufacturing có thể ở một trong các trạng thái này cùng lúc trong đợt rollout." });

// ── Mockup 3: sơ đồ quy trình nâng cấp v3.8→v4.0 và đường rollback ──
const m_flow = moduleFlow("Quy trình nâng cấp NovaERP v3.8 → v4.0 và đường rollback", [
  { id: "b1", label: "Backup DB v3.8", x: 100, y: 70 },
  { id: "b2", label: "Dừng dịch vụ ERP", x: 280, y: 70 },
  { id: "b3", label: "Chạy migration script", x: 460, y: 70, sub: "schema v3 → v4" },
  { id: "b4", label: "Cài đặt v4.0", x: 640, y: 70 },
  { id: "b5", label: "Smoke test v4.0", x: 640, y: 210 },
  { id: "b6", label: "Go-live v4.0", x: 460, y: 210 },
  { id: "b7", label: "Restore backup v3.8", x: 280, y: 210, sub: "nếu phát hiện lỗi" },
  { id: "b8", label: "Rollback hoàn tất v3.8", x: 100, y: 210 },
], [
  { from: "b1", to: "b2", label: "OK" },
  { from: "b2", to: "b3", label: "OK" },
  { from: "b3", to: "b4", label: "OK" },
  { from: "b4", to: "b5", label: "OK" },
  { from: "b5", to: "b6", label: "Pass" },
  { from: "b5", to: "b7", label: "Fail", bad: true },
  { from: "b3", to: "b7", label: "Migration lỗi", bad: true },
  { from: "b7", to: "b8", label: "Restore xong" },
], { accent: "#155ce1", h: 300 });

// ── Mockup 4: bảng ca kiểm thử di trú dữ liệu — Tồn kho NovaERP v3 → v4 ──
const m_migration_case = grid("Ca kiểm thử di trú dữ liệu — Tồn kho NovaERP v3 → v4", ["Ca di trú dữ liệu", "Dữ liệu nguồn (v3)", "Kết quả mong đợi (v4)"], [
  ["Ánh xạ đơn vị tính tồn kho", "Đơn vị 'Thùng' (1 thùng = 24 lon) theo schema v3", "Quy đổi đúng sang đơn vị chuẩn v4 là 'Lon', không lệch tổng số lượng"],
  ["Số âm tồn kho do lỗi nghiệp vụ cũ", "12 dòng tồn kho âm (-5, -20…) tồn đọng từ lỗi v3 chưa xử lý", "Cảnh báo rõ cho quản trị viên trước khi migrate, không tự làm tròn về 0"],
  ["Phiếu nhập kho đang dở dang", "Phiếu nhập kho ở trạng thái 'Chờ duyệt' đúng lúc chạy migration", "Trạng thái phiếu được giữ nguyên hoặc có cơ chế xử lý rõ ràng sau migrate"],
  ["Đối chiếu tổng số lượng trước/sau di trú", "Tổng tồn kho toàn hệ thống trước migrate: 482.310 đơn vị", "Tổng tồn kho sau migrate khớp tuyệt đối 482.310 đơn vị"],
  ["Trường dữ liệu mới chưa tồn tại ở v3", "v3 không có trường 'Mã lô sản xuất' (batch code)", "Trường mới nhận giá trị mặc định hợp lệ, không NULL gây vỡ ràng buộc"],
], { accent: "#7c3aed", note: "Đối chiếu checksum/tổng số lượng là bước bắt buộc sau MỌI lần chạy migration, không chỉ tin log 'thành công'." });

// ── Mockup 5: ticket Jira — nâng cấp treo giữa chừng, không rollback tự động ──
const m_jira = jira({
  key: "ERP-40217",
  title: "Nâng cấp NovaERP v3.8→v4.0 tại nhà máy Hà Nội bị TREO giữa chừng: migration script lỗi, không có đường rollback tự động",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "Production · Nhà máy Hà Nội · NovaERP v3.8 → v4.0 · SQL Server 2016"],
    ["Các bước", "1) Bắt đầu nâng cấp theo runbook 2) Migration script lỗi ở bảng Tồn kho do gặp dòng dữ liệu âm 3) Script dừng giữa chừng, không tự rollback 4) Dịch vụ ERP không khởi động lại được ở cả v3 lẫn v4"],
    ["Kết quả mong đợi", "Migration lỗi phải tự động rollback về v3.8 hoạt động bình thường, hoặc dừng an toàn kèm hướng dẫn khôi phục thủ công rõ ràng"],
    ["Kết quả thực tế", "Dịch vụ ERP ngừng hoạt động hoàn toàn hơn 3 giờ tại nhà máy Hà Nội, xưởng sản xuất phải ghi tay"],
    ["Bằng chứng", "log-migration-40217.txt, video-treo-erp.mp4, bien-ban-su-co-nhamay-hn.pdf"],
  ],
});

// ── Mockup 6: kanban theo dõi lỗi tìm qua Installation & Upgrade Testing (rollout đa nhà máy) ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua Installation & Upgrade Testing (NovaERP · Rollout 6 nhà máy)", [
  { name: "New", cards: [
    { key: "ERP-40217", title: "Nâng cấp treo giữa chừng, không rollback", sev: "Critical" },
    { key: "ERP-40225", title: "Migration làm lệch tồn kho -1.204 đơn vị", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "ERP-40190", title: "Cài mới thất bại khi thiếu quyền Admin, thông báo mập mờ", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "ERP-40088", title: "Gỡ cài đặt sót service chạy nền, chiếm cổng 8080", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "ERP-39950", title: "Cảnh báo sai dung lượng đĩa còn trống trước khi cài", sev: "Low" },
  ] },
]);

// ── Mockup 7: dashboard số liệu đợt rollout NovaERP v4.0 tại 6 nhà máy ──
const m_dash = dashboard("Số liệu đợt Rollout NovaERP v4.0 — 6 nhà máy Nova Manufacturing", [
  { label: "Nhà máy nâng cấp thành công", value: "4/6", sub: "2 nhà máy phải rollback", color: "#16a34a" },
  { label: "Thời gian rollback thực đo", value: "52 phút", sub: "cam kết ≤30 phút — CHƯA đạt", color: "#e11d48" },
  { label: "Lỗi tìm qua kiểm thử cài đặt", value: "14", sub: "phát hiện trước khi rollout thật", color: "#7c3aed" },
  { label: "Mức Critical/Highest", value: "6", sub: "đa số ở migration & rollback", color: "#b45309" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử cài đặt (Installation Testing) khác gì với kiểm thử nâng cấp (Upgrade Testing)?",
  "How does installation testing differ from upgrade testing?",
  "Kiểm thử cài đặt xác nhận phần mềm có thể được cài đặt THÀNH CÔNG lần đầu trên một môi trường 'sạch' — đúng OS, đủ tài nguyên, đúng quyền, dịch vụ khởi động và hoạt động đúng ngay sau khi cài. Kiểm thử nâng cấp đi xa hơn: nó xác nhận một hệ thống ĐANG CHẠY với dữ liệu thật có thể chuyển từ phiên bản cũ sang phiên bản mới mà không mất dữ liệu, không gián đoạn ngoài cửa sổ cho phép, và các tuỳ biến/cấu hình cũ vẫn tương thích. Với ERP đa nhà máy, nâng cấp rủi ro cao hơn cài mới rất nhiều vì luôn có dữ liệu sản xuất thật đang ở đó.",
  "Installation testing confirms software can be installed SUCCESSFULLY for the first time on a 'clean' environment — correct OS, enough resources, correct permissions, services start and work right after install. Upgrade testing goes further: it confirms a RUNNING system with real data can move from an old version to a new one without losing data, without downtime beyond the allowed window, and old customizations/configs remain compatible. For multi-site ERP, upgrading is far riskier than a fresh install because real production data is always already there.",
  "インストールテスト（Installation Testing）とアップグレードテスト（Upgrade Testing）はどう違う？",
  "インストールテストは、『まっさらな』環境（正しいOS、十分なリソース、正しい権限）にソフトウェアを初めて正常にインストールでき、直後にサービスが起動・正常動作するかを確認します。アップグレードテストはさらに踏み込み、実データを持つ『稼働中』のシステムが旧バージョンから新バージョンへデータ損失なく、許容ダウンタイム内で移行でき、既存のカスタマイズ・設定も互換性を保つかを確認します。複数拠点のERPでは、常に実際の生産データが存在するため、アップグレードは新規インストールよりはるかにリスクが高いのです。");
const faq2 = FAQ(
  "Vì sao cần thiết kế ca kiểm thử rollback riêng, không chỉ test nâng cấp thành công?",
  "Why design separate rollback test cases, not just test that the upgrade succeeds?",
  "Vì rollback KHÔNG tự nhiên hoạt động chỉ vì nâng cấp có thể thất bại — nó là một tính năng riêng cần được thiết kế, viết script và kiểm thử độc lập, y như bất kỳ chức năng nào khác. Nhiều đội chỉ tập trung mọi công sức vào 'làm sao nâng cấp chạy trơn tru' và ngầm giả định 'nếu lỗi thì rollback lại thôi', nhưng không ai thật sự thử kịch bản đó. Hậu quả — như tình huống ở chương 6 — là khi nâng cấp thật sự thất bại, đội mới phát hiện script rollback chưa từng được viết hoàn chỉnh, hoặc rollback xong lại làm mất luôn dữ liệu phát sinh trong lúc nâng cấp.",
  "Because rollback does NOT automatically work just because an upgrade might fail — it's a separate feature that needs its own design, script, and independent testing, just like any other feature. Many teams pour all their effort into 'making the upgrade run smoothly' and silently assume 'if it fails, we'll just roll back', but nobody actually rehearses that scenario. The consequence — as in the chapter 6 situation — is that when the upgrade genuinely fails, the team only then discovers the rollback script was never fully written, or that rolling back also wipes out data generated during the upgrade attempt.",
  "アップグレードが成功することだけでなく、なぜロールバックのテストケースを別に設計する必要があるの？",
  "ロールバックは、アップグレードが失敗し得るという理由だけで自然に機能するものではないからです——それは他のあらゆる機能と同様、独自に設計・スクリプト化・独立してテストされるべき別個の機能です。多くのチームは『アップグレードをスムーズに動かす』ことだけに全力を注ぎ、『失敗したらロールバックすればいい』と暗黙に仮定しますが、実際にそのシナリオをリハーサルする人はいません。第6章のシーンのように、その結果はアップグレードが本当に失敗したときに初めて、ロールバックスクリプトが一度も完成していなかった、あるいはロールバックによってアップグレード中に発生したデータまで失われることが発覚する、というものです。");
const faq3 = FAQ(
  "Kiểm thử di trú dữ liệu (data migration) trong nâng cấp ERP cần chú trọng những gì nhất?",
  "What matters most when testing data migration during an ERP upgrade?",
  "Ba việc quan trọng nhất: (1) đối chiếu tổng số liệu trước/sau (checksum, tổng tồn kho, tổng công nợ…) phải khớp tuyệt đối chứ không chỉ 'gần đúng'; (2) kiểm thử với dữ liệu THẬT, kể cả dữ liệu 'bẩn' như số âm, giá trị NULL bất thường hay bản ghi dở dang — vì đó chính là nơi script migration hay gãy trên production dù chạy ổn trên dữ liệu mẫu sạch; (3) xác nhận các trường dữ liệu MỚI ở phiên bản đích nhận được giá trị mặc định hợp lệ thay vì NULL hoặc rỗng gây lỗi ràng buộc sau này.",
  "Three things matter most: (1) reconciling total figures before/after (checksums, total inventory, total receivables…) must match exactly, not just 'roughly'; (2) testing with REAL data, including 'dirty' data like negative numbers, unusual NULLs, or in-progress records — because that's exactly where migration scripts tend to break in production even though they ran fine on clean sample data; (3) confirming NEW fields in the target version get valid default values instead of NULL or blank ones that cause constraint errors later.",
  "ERPアップグレードにおけるデータ移行（data migration）テストで最も重視すべき点は？",
  "最も重要な3点：（1）移行前後の合計値（チェックサム、在庫合計、売掛金合計など）は『おおよそ』ではなく完全に一致すること。（2）負の数値、異常なNULL、処理途中のレコードなど『汚い』実データでテストすること——クリーンなサンプルデータでは正常でも、本番ではまさにそこで移行スクリプトが壊れやすいからです。（3）新バージョンで追加された新しいフィールドが、後で制約エラーを起こすNULLや空値ではなく、有効なデフォルト値を受け取ることを確認すること。");
const faq4 = FAQ(
  "Với ERP triển khai nhiều nhà máy/OS/cấu hình khác nhau, làm sao ưu tiên kiểm thử tương thích cho đủ mà không dàn trải quá mức?",
  "For an ERP rolled out across many factories with different OS/configs, how do you prioritize compatibility testing without spreading too thin?",
  "Không cần test mọi tổ hợp OS/DB/cấu hình — hãy dựng ma trận tương thích (như mockup ở chương 4), rồi ưu tiên theo hai tiêu chí: (1) tổ hợp nào đang được NHIỀU nhà máy nhất sử dụng thật, và (2) tổ hợp nào KHÁC BIỆT nhiều nhất so với môi trường đã được test kỹ (ví dụ nhà máy dùng OS/DB đời cũ nhất). Nên chọn một nhà máy làm 'thí điểm' (canary/pilot site) để chạy nâng cấp thật trước, rút kinh nghiệm rồi mới nhân rộng ra các nhà máy còn lại, thay vì nâng cấp đồng loạt tất cả cùng lúc.",
  "You don't need to test every OS/DB/config combination — build a compatibility matrix (like the mockup in chapter 4), then prioritize by two criteria: (1) which combination is actually used by the MOST factories, and (2) which combination DIFFERS the most from an environment that's already been thoroughly tested (e.g. the factory running the oldest OS/DB). Pick one factory as a 'canary/pilot site' to run the real upgrade first, learn from it, then roll out to the remaining factories — instead of upgrading all of them at once.",
  "複数の工場・OS・設定が異なる形でERPを展開する場合、手を広げすぎずに互換性テストの優先順位をどうつければいい？",
  "OS/DB/設定のすべての組み合わせをテストする必要はありません——第4章のモックアップのような互換性マトリクスを作り、次の2基準で優先順位をつけます：（1）実際に最も多くの工場で使われている組み合わせ、（2）すでに十分テスト済みの環境（例えば最も古いOS/DBを使う工場）と最も『異なる』組み合わせ。すべての工場を一斉にアップグレードするのではなく、1つの工場を『カナリア／パイロットサイト』として選び、先に実際のアップグレードを行って教訓を得てから、残りの工場へ展開するのがよいでしょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử nâng cấp (Upgrade Testing) khác kiểm thử cài mới (Fresh Install Testing) chủ yếu ở điểm nào?", en: "How does upgrade testing mainly differ from fresh install testing?", ja: "アップグレードテストは新規インストールテストと主にどこが違う？" },
    options: [
      { vi: "Nâng cấp phải xác nhận dữ liệu và cấu hình CŨ vẫn đúng và không mất sau khi lên phiên bản mới, còn cài mới thì môi trường trống", en: "Upgrade must confirm OLD data and configs remain correct and aren't lost after moving to the new version, while a fresh install starts from an empty environment", ja: "アップグレードは新バージョン移行後も既存のデータと設定が正しく保たれ失われないことを確認する必要があるが、新規インストールは空の環境から始まる" },
      { vi: "Nâng cấp không cần kiểm thử vì phần mềm đã chạy ổn định trước đó", en: "Upgrade doesn't need testing because the software already ran stably before", ja: "アップグレードは以前安定して動いていたのでテスト不要" },
      { vi: "Cài mới luôn khó hơn nâng cấp vì phải cài từ đầu", en: "Fresh install is always harder than upgrade because it's installed from scratch", ja: "新規インストールは最初からインストールするので常にアップグレードより難しい" },
      { vi: "Không có khác biệt, hai loại kiểm thử là một", en: "There's no difference, the two are the same type of testing", ja: "違いはなく、両者は同じ種類のテストである" },
    ], correct: 0,
    explain: { vi: "Nâng cấp mang theo rủi ro riêng vì luôn có dữ liệu/cấu hình thật đang tồn tại cần được bảo toàn, khác hẳn môi trường trống của cài mới.", en: "Upgrading carries its own risk because real data/configs already exist and must be preserved, unlike the empty environment of a fresh install.", ja: "アップグレードには独自のリスクがある。既存の実データ・設定を保持する必要があり、新規インストールの空の環境とは異なるからだ。" },
  }),
  mcq({
    q: { vi: "Trong tình huống nâng cấp NovaERP bị TREO giữa chừng ở chương 6, nguyên nhân gốc là gì?", en: "In the NovaERP upgrade HANGING situation from chapter 6, what was the root cause?", ja: "第6章のNovaERPアップグレードが『途中で止まった』シーンの根本原因は？" },
    options: [
      { vi: "Migration script lỗi khi gặp dữ liệu tồn kho âm, và không có cơ chế rollback tự động khi script dừng giữa chừng", en: "The migration script failed on negative inventory data, and there was no automatic rollback mechanism when the script stopped mid-way", ja: "マイグレーションスクリプトが負の在庫データでエラーになり、スクリプトが途中で止まったときの自動ロールバック機構がなかった" },
      { vi: "Nhân viên nhà máy nhập sai mật khẩu quản trị", en: "A factory employee entered the wrong admin password", ja: "工場の従業員が管理者パスワードを間違えて入力した" },
      { vi: "Máy chủ bị virus tấn công đúng lúc nâng cấp", en: "The server was hit by a virus attack exactly during the upgrade", ja: "アップグレードのちょうどそのときにサーバーがウイルス攻撃を受けた" },
      { vi: "Phiên bản v4.0 chưa từng được cài đặt thử ở môi trường test", en: "Version 4.0 had never been trial-installed in a test environment", ja: "v4.0はテスト環境で一度も試験インストールされたことがなかった" },
    ], correct: 0,
    explain: { vi: "Dữ liệu 'bẩn' (số âm) làm script gãy giữa chừng, và vì thiếu đường rollback tự động nên hệ thống kẹt ở trạng thái nửa v3 nửa v4.", en: "'Dirty' data (negative numbers) broke the script mid-way, and without an automatic rollback path the system got stuck half-v3, half-v4.", ja: "『汚い』データ（負の数）がスクリプトを途中で壊し、自動ロールバック経路がなかったためシステムはv3とv4の中間状態で止まってしまった。" },
  }),
  mcq({
    q: { vi: "Vì sao chỉ đối chiếu số liệu 'gần đúng' sau di trú dữ liệu (data migration) là chưa đủ với ERP tài chính/tồn kho?", en: "Why is reconciling migrated figures only 'roughly' not enough for financial/inventory ERP data?", ja: "財務・在庫を扱うERPのデータ移行後、数値を『おおよそ』照合するだけでは不十分な理由は？" },
    options: [
      { vi: "Vì mỗi đơn vị lệch có thể tương ứng với tiền thật hoặc hàng hoá thật bị mất/thừa, ảnh hưởng trực tiếp tới vận hành và báo cáo", en: "Because every unit of mismatch can correspond to real money or real goods lost/gained, directly affecting operations and reporting", ja: "1単位のズレでも実際のお金や実際の商品が失われたり過剰になったりすることに対応し、運用と報告に直接影響するから" },
      { vi: "Vì 'gần đúng' luôn nhanh hơn và không ai kiểm tra lại", en: "Because 'roughly' is always faster and nobody double-checks", ja: "『おおよそ』の方が常に速く、誰も再確認しないから" },
      { vi: "Vì hệ thống ERP tự động sửa mọi sai lệch sau 24 giờ", en: "Because the ERP system automatically fixes all discrepancies after 24 hours", ja: "ERPシステムが24時間後にすべての不一致を自動的に修正するから" },
      { vi: "Vì kiểm thử tự động không thể đo được số liệu chính xác", en: "Because automated testing cannot measure exact figures", ja: "自動テストでは正確な数値を測定できないから" },
    ], correct: 0,
    explain: { vi: "Với dữ liệu tài chính/tồn kho, một khoảng lệch nhỏ vẫn đại diện cho tiền hoặc hàng hoá thật — cần đối chiếu khớp tuyệt đối, không chấp nhận sai số.", en: "For financial/inventory data, even a small gap represents real money or goods — an exact match is required, no tolerance for error.", ja: "財務・在庫データでは、わずかなズレでも実際のお金や商品を表す——完全一致が必要で、誤差は許容されない。" },
  }),
  mcq({
    q: { vi: "'Split' rollout kiểu chọn 1 nhà máy làm thí điểm (canary/pilot site) trước khi nhân rộng mang lại lợi ích chính nào?", en: "What's the main benefit of a canary/pilot-site rollout — upgrading one factory first before scaling out?", ja: "1つの工場を先にアップグレードする『カナリア／パイロットサイト』方式の主な利点は？" },
    options: [
      { vi: "Giới hạn phạm vi ảnh hưởng nếu nâng cấp có lỗi, và rút kinh nghiệm thực tế trước khi áp dụng cho các nhà máy còn lại", en: "It limits the blast radius if the upgrade has bugs, and lets the team learn real lessons before applying it to the remaining factories", ja: "アップグレードに不具合があった場合の影響範囲を限定し、残りの工場に適用する前に実際の教訓を得られる" },
      { vi: "Giúp nâng cấp chạy nhanh hơn ở tất cả nhà máy cùng lúc", en: "It makes the upgrade run faster across all factories at once", ja: "全工場で同時にアップグレードをより速く実行できる" },
      { vi: "Không còn cần viết ca kiểm thử cho các nhà máy còn lại", en: "It removes the need to write test cases for the remaining factories", ja: "残りの工場のテストケースを書く必要がなくなる" },
      { vi: "Tự động đảm bảo rollback luôn thành công 100%", en: "It automatically guarantees rollback always succeeds 100%", ja: "ロールバックが常に100%成功することを自動的に保証する" },
    ], correct: 0,
    explain: { vi: "Nâng cấp thí điểm 1 nhà máy giúp giới hạn thiệt hại nếu có lỗi và cung cấp dữ liệu thực tế để cải thiện quy trình trước khi rollout diện rộng.", en: "Piloting the upgrade at one factory limits damage if something breaks and provides real data to improve the process before a wide rollout.", ja: "1工場でパイロット導入することで、問題が起きた場合の被害を限定し、大規模展開前にプロセス改善のための実データを得られる。" },
  }),
  mcq({
    q: { vi: "Khi test 'gỡ cài đặt sạch' (clean uninstall) cho NovaERP, đâu là điều cần xác nhận đúng nhất?", en: "When testing a 'clean uninstall' for NovaERP, what is most important to confirm?", ja: "NovaERPの『クリーンアンインストール』をテストする際、最も確認すべきことは？" },
    options: [
      { vi: "Toàn bộ file, service, tiến trình nền, mục registry/cấu hình liên quan đều được gỡ bỏ, không để lại rác gây xung đột khi cài lại", en: "All related files, services, background processes, and registry/config entries are removed, leaving no leftovers that conflict with a future reinstall", ja: "関連するすべてのファイル、サービス、バックグラウンドプロセス、レジストリ／設定項目が削除され、再インストール時に競合するゴミが残らないこと" },
      { vi: "Chỉ cần xoá icon ứng dụng khỏi màn hình desktop", en: "Only need to remove the app icon from the desktop", ja: "デスクトップのアプリアイコンを削除するだけでよい" },
      { vi: "Gỡ cài đặt không cần kiểm thử vì luôn hoạt động đúng", en: "Uninstall doesn't need testing because it always works correctly", ja: "アンインストールは常に正しく動作するのでテスト不要" },
      { vi: "Chỉ cần kiểm tra dung lượng ổ đĩa được giải phóng", en: "Only need to check that disk space was freed", ja: "ディスク容量が解放されたかだけを確認すればよい" },
    ], correct: 0,
    explain: { vi: "Gỡ cài đặt 'sạch' nghĩa là không còn service/tiến trình ngầm/registry sót lại — như ticket ERP-40088 cho thấy, sót service có thể chiếm cổng và gây lỗi khi cài lại.", en: "A 'clean' uninstall means no leftover services/background processes/registry entries — as ticket ERP-40088 showed, a leftover service can hold a port and break a future reinstall.", ja: "『クリーン』なアンインストールとは、サービス・バックグラウンドプロセス・レジストリの残留物がないことを意味する——チケットERP-40088が示すように、残留サービスはポートを占有し再インストール時の不具合を引き起こしうる。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử cài đặt & nâng cấp (Installation & Upgrade Testing) xác nhận phần mềm có thể được cài mới, nâng cấp từ bản cũ, di trú dữ liệu, rollback khi lỗi và gỡ cài đặt sạch — đúng trên nhiều môi trường OS/cấu hình khác nhau. Bài này bám dự án nâng cấp NovaERP từ v3.8 lên v4.0 cho chuỗi nhà máy Nova Manufacturing: bạn học cách thiết kế ma trận kịch bản, viết ca kiểm thử di trú dữ liệu, và xử lý 2 tình huống thật — nâng cấp treo giữa chừng không rollback được, và di trú làm mất dữ liệu tồn kho. Có sơ đồ quy trình, nhiều bảng ca kiểm thử và trắc nghiệm cuối bài.",
        "Installation & Upgrade Testing confirms software can be freshly installed, upgraded from an old version, have its data migrated, rolled back on failure, and cleanly uninstalled — correctly across different OS/config environments. This article follows a real project upgrading NovaERP from v3.8 to v4.0 across the Nova Manufacturing factory chain: you'll learn to design a scenario matrix, write data migration test cases, and handle 2 real situations — an upgrade hanging mid-way with no working rollback, and a migration that loses inventory data. It includes a process diagram, several test-case tables, and a quiz.",
        "インストール＆アップグレードテスト（Installation & Upgrade Testing）は、ソフトウェアが新規インストール、旧バージョンからのアップグレード、データ移行、失敗時のロールバック、クリーンアンインストールを、異なるOS／設定環境で正しく行えるかを確認します。本記事はNova Manufacturing工場チェーン向けのNovaERPをv3.8からv4.0へアップグレードする実プロジェクトに沿い、シナリオマトリクスの設計、データ移行テストケースの書き方、そして実例2件——ロールバックできずに途中で止まったアップグレードと、在庫データを失う移行——の対処法を学びます。プロセス図、複数のテストケース表、クイズ付き。"),
      P("Nếu bạn đã quen kiểm thử chức năng cho một bản build ổn định, chương này đưa bạn sang một lớp rủi ro hoàn toàn khác: kiểm thử cài đặt và nâng cấp — nơi 'ca kiểm thử' không chỉ là thao tác trên giao diện mà là cả một QUY TRÌNH vận hành (backup, dừng dịch vụ, chạy migration, cài đặt, kiểm tra, hoặc rollback) diễn ra trên hạ tầng thật. Với một ERP triển khai ở nhiều nhà máy, mỗi nơi có thể khác nhau về hệ điều hành, phiên bản cơ sở dữ liệu, cấu hình mạng và cả lượng dữ liệu tồn kho tích luỹ nhiều năm — nên một kịch bản nâng cấp 'chạy ngon' ở nhà máy này hoàn toàn có thể gãy ở nhà máy khác. Chúng ta sẽ học qua dự án nâng cấp NovaERP thật, có hình minh hoạ chi tiết và phần thực hành.",
        "If you're used to testing features on a stable build, this chapter shifts you to a completely different risk layer: installation and upgrade testing — where a 'test case' isn't just a UI action but an entire operational PROCESS (backup, stop the service, run migration, install, verify, or roll back) happening on real infrastructure. For an ERP deployed across many factories, each site may differ in OS, database version, network config, and even years of accumulated inventory data — so an upgrade scenario that 'runs smoothly' at one factory can completely break at another. We'll learn through a real NovaERP upgrade project, with detailed visuals and hands-on practice.",
        "安定したビルドに対する機能テストに慣れているなら、この章ではまったく別のリスク層に踏み込みます：インストール＆アップグレードテストです。ここでの『テストケース』はUI操作だけでなく、実際のインフラ上で行われるバックアップ、サービス停止、マイグレーション実行、インストール、検証、あるいはロールバックという一連の運用『プロセス』全体です。複数の工場に展開されるERPでは、拠点ごとにOS、データベースバージョン、ネットワーク設定、さらには何年も蓄積された在庫データ量が異なることがあり、ある工場で『問題なく動いた』アップグレードシナリオが別の工場では完全に壊れることもあります。実際のNovaERPアップグレードプロジェクトを通じ、詳細な図と実習付きで学びます。"),
      IMG(m_install_error, "Màn hình cài đặt NovaERP v4.0 bị gián đoạn tại nhà máy Bình Dương: thiếu dung lượng, thiếu quyền, sai runtime, mất kết nối DB", "NovaERP v4.0 install interrupted at the Binh Duong factory: low disk space, missing permissions, wrong runtime, lost DB connection", "ビンズオン工場でのNovaERP v4.0インストールが中断：ディスク容量不足、権限不足、ランタイム不一致、DB接続断"),
      DEF("Installation & Upgrade Testing", "kiểm thử khả năng cài đặt mới, nâng cấp từ phiên bản cũ, di trú dữ liệu, rollback khi lỗi và gỡ cài đặt sạch của một hệ thống, trên nhiều môi trường/cấu hình khác nhau.",
        "testing a system's ability to be freshly installed, upgraded from an old version, have its data migrated, rolled back on failure, and cleanly uninstalled, across different environments/configurations.",
        "システムを新規インストール、旧バージョンからアップグレード、データ移行、失敗時のロールバック、クリーンアンインストールできるかを、異なる環境・設定でテストする手法。"),
    ] },
  { heading: { vi: "2. Ba khái niệm dễ nhầm: cài mới, nâng cấp, di trú dữ liệu", en: "2. Three easily confused concepts: fresh install, upgrade, data migration", ja: "2. 混同しやすい3つの概念：新規インストール、アップグレード、データ移行" },
    blocks: [
      P("Người mới học kiểm thử cài đặt thường gộp chung 'cài mới' và 'nâng cấp' vì cả hai đều dùng chung một bộ cài (installer). Nhưng về bản chất rủi ro, chúng khác nhau hoàn toàn: cài mới thao tác trên một môi trường TRỐNG, còn nâng cấp thao tác trên một môi trường ĐANG SỐNG với dữ liệu và cấu hình thật. Di trú dữ liệu (migration) lại là một khái niệm hẹp hơn, nằm BÊN TRONG quy trình nâng cấp — cụ thể là bước chuyển đổi cấu trúc/nội dung dữ liệu từ schema cũ sang schema mới.",
        "Newcomers to installation testing often lump 'fresh install' and 'upgrade' together because both use the same installer. But in terms of risk, they're completely different: a fresh install operates on an EMPTY environment, while an upgrade operates on a LIVE environment with real data and configs. Data migration is a narrower concept that sits INSIDE the upgrade process — specifically the step of converting the data's structure/content from the old schema to the new one.",
        "インストールテスト初心者は、両方とも同じインストーラーを使うため『新規インストール』と『アップグレード』を一緒くたにしがちです。しかしリスクの本質はまったく異なります：新規インストールは『空の』環境に対して行われ、アップグレードは実データと設定を持つ『稼働中』の環境に対して行われます。データ移行はさらに狭い概念で、アップグレードプロセスの『内側』に位置します——具体的には、旧スキーマから新スキーマへデータの構造・内容を変換するステップです。"),
      IMG(m_matrix, "Ma trận 5 kịch bản kiểm thử cài đặt & nâng cấp cho NovaERP: cài mới, nâng cấp, di trú dữ liệu, rollback, gỡ cài đặt sạch", "Matrix of 5 install & upgrade testing scenarios for NovaERP: fresh install, upgrade, data migration, rollback, clean uninstall", "NovaERPのインストール・アップグレードテスト5シナリオのマトリクス：新規インストール、アップグレード、データ移行、ロールバック、クリーンアンインストール"),
      P("Rollback lại là một khái niệm khác nữa: nó KHÔNG phải 'cài lại bản cũ từ đầu' mà là khôi phục hệ thống về đúng trạng thái hoạt động trước khi nâng cấp bắt đầu — bao gồm cả dữ liệu. Nếu chỉ cài lại phần mềm v3.8 mà không khôi phục đúng bản backup DB tương ứng, hệ thống có thể 'chạy được' nhưng dữ liệu đã sai lệch so với trước khi nâng cấp. Vì vậy rollback testing luôn phải kiểm tra CẢ phần mềm lẫn dữ liệu, không chỉ một trong hai.",
        "Rollback is yet another concept: it does NOT mean 'reinstalling the old version from scratch' but restoring the system to exactly the working state it was in before the upgrade began — including data. If you only reinstall v3.8 software without restoring the matching DB backup, the system might 'run' but its data will already differ from before the upgrade. So rollback testing must always check BOTH the software and the data, not just one of the two.",
        "ロールバックはまた別の概念です：それは『旧バージョンを最初から再インストールする』ことではなく、アップグレード開始前の正常な稼働状態——データも含めて——にシステムを復元することです。対応するDBバックアップを復元せずにv3.8のソフトウェアだけを再インストールした場合、システムは『動く』かもしれませんが、データはすでにアップグレード前とは異なってしまいます。そのため、ロールバックテストは常にソフトウェアとデータの両方を確認しなければならず、どちらか一方だけではいけません。"),
      DEF("Rollback Testing", "kiểm thử khả năng khôi phục hệ thống — cả phần mềm lẫn dữ liệu — về đúng trạng thái hoạt động trước khi thực hiện nâng cấp, khi phát hiện lỗi.",
        "testing a system's ability to restore — both software and data — to exactly the working state it was in before an upgrade, when a failure is detected.",
        "障害を検出した際に、アップグレード前の正常な稼働状態へ、ソフトウェアとデータの両方をシステムが復元できるかをテストする手法。"),
    ] },
  { heading: { vi: "3. Vì sao ERP đa nhà máy cần kiểm thử cài đặt & nâng cấp ở mức nâng cao", en: "3. Why a multi-factory ERP needs advanced install & upgrade testing", ja: "3. なぜ複数工場のERPには高度なインストール・アップグレードテストが必要か" },
    blocks: [
      P("Với một ứng dụng web thông thường, nâng cấp thường chỉ là deploy một bản build mới lên server, có thể rollback bằng cách deploy lại bản cũ trong vài phút. Nhưng NovaERP chạy TẠI CHỖ (on-premise) ở từng nhà máy, với cơ sở dữ liệu riêng, phần cứng riêng, và đội IT tại chỗ có năng lực khác nhau. Một lỗi nâng cấp không chỉ là 'website bị lỗi 500' mà có thể khiến TOÀN BỘ dây chuyền sản xuất phải dừng, công nhân phải ghi chép thủ công, và đơn hàng giao trễ — thiệt hại tính bằng tiền thật, không phải chỉ uy tín.",
        "For a typical web app, upgrading is usually just deploying a new build to a server, rollback-able by redeploying the old build in minutes. But NovaERP runs ON-PREMISE at each factory, with its own database, its own hardware, and a local IT team with varying capability. An upgrade failure isn't just 'the website returns a 500 error' — it can stop the ENTIRE production line, force workers to record things by hand, and delay shipments — real monetary loss, not just reputation.",
        "一般的なWebアプリでは、アップグレードは通常サーバーへ新しいビルドをデプロイするだけで、数分で旧ビルドを再デプロイすればロールバックできます。しかしNovaERPは各工場で『オンプレミス』稼働し、それぞれ独自のデータベース、独自のハードウェア、能力の異なる現地IT担当者を持ちます。アップグレードの失敗は『Webサイトが500エラーを返す』だけでは済まず、生産ライン全体が停止し、作業員が手作業で記録せざるを得なくなり、出荷が遅延する——評判だけでなく実際の金銭的損害につながります。"),
      P("Ngoài ra, mỗi nhà máy trong chuỗi Nova Manufacturing đã tích luỹ dữ liệu vận hành nhiều năm — từ dữ liệu 'sạch' của nhà máy mới mở tới dữ liệu 'lẫn lỗi' của nhà máy đã hoạt động cả thập kỷ với hàng chục lần vá lỗi thủ công trực tiếp trên database. Một script migration được viết và test kỹ trên dữ liệu mẫu 'đẹp' hoàn toàn có thể gãy khi gặp dữ liệu thật đầy những ngoại lệ như vậy. Đây chính là lý do kiểm thử cài đặt & nâng cấp ở cấp độ nâng cao không thể chỉ dừng ở 'nâng cấp thành công trên môi trường test', mà phải chủ động mô phỏng cả những điều kiện bất lợi nhất.",
        "In addition, each factory in the Nova Manufacturing chain has accumulated years of operational data — from the 'clean' data of a newly opened factory to the 'messy' data of a decade-old factory with dozens of manual database patches applied directly over time. A migration script written and tested carefully on 'pretty' sample data can easily break when it meets real data full of such exceptions. This is exactly why advanced install & upgrade testing can't stop at 'the upgrade succeeded in the test environment' — it must proactively simulate the worst-case conditions too.",
        "さらに、Nova Manufacturingチェーンの各工場は何年もの運用データを蓄積しており、新規開業した工場の『きれいな』データから、10年稼働しデータベースに直接何十回も手作業でパッチが当てられた工場の『ごちゃごちゃした』データまで様々です。『きれいな』サンプルデータで慎重に書かれテストされたマイグレーションスクリプトも、そうした例外だらけの実データに出会うと簡単に壊れます。これこそ、高度なインストール・アップグレードテストが『テスト環境でアップグレードが成功した』だけで止まってはならず、最悪の条件も積極的にシミュレートしなければならない理由です。"),
      P("Cuối cùng, quyết định nâng cấp một nhà máy ERP không thể 'thử rồi sửa' như một tính năng web — cửa sổ bảo trì thường chỉ có vài giờ ban đêm hoặc cuối tuần, và một lần rollback thất bại có thể khiến nhà máy ngừng hoạt động cả ngày. Vì vậy, tư duy kiểm thử ở đây phải chuyển từ 'tìm lỗi trên tính năng' sang 'giảm thiểu rủi ro cho một quy trình vận hành một lần, khó đảo ngược' — đòi hỏi kỹ năng thiết kế ca kiểm thử nâng cao hơn hẳn kiểm thử chức năng thông thường.",
        "Finally, deciding to upgrade a factory's ERP can't be 'try it and fix it later' like a web feature — the maintenance window is usually just a few hours overnight or on a weekend, and one failed rollback can shut a factory down for a full day. So the testing mindset here must shift from 'finding bugs in a feature' to 'minimizing risk for a one-time, hard-to-reverse operational process' — requiring more advanced test-case design skills than ordinary functional testing.",
        "最後に、ある工場のERPをアップグレードするという決定は、Web機能のように『試してから直す』わけにはいきません——メンテナンスウィンドウは通常夜間や週末の数時間だけで、ロールバックが1回失敗すると工場が丸一日停止することもあります。そのため、ここでのテストの考え方は『機能のバグを見つける』ことから『一度きりで元に戻しにくい運用プロセスのリスクを最小化する』ことへとシフトする必要があり、通常の機能テストよりも高度なテストケース設計スキルが求められます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: ma trận tương thích môi trường & quy trình nâng cấp", en: "4. Prepare: environment compatibility matrix & upgrade process", ja: "4. 準備：環境互換性マトリクスとアップグレードプロセス" },
    blocks: [
      P("Trước khi viết bất kỳ ca kiểm thử nào, hãy dựng hai thứ: (1) ma trận tương thích môi trường — liệt kê tổ hợp OS, phiên bản DB, .NET runtime, dung lượng đĩa tối thiểu mà v4.0 hỗ trợ, đối chiếu với thực tế từng nhà máy; (2) sơ đồ quy trình nâng cấp CHÍNH THỨC kèm đường rollback, để biết chính xác bước nào cần một ca kiểm thử riêng.",
        "Before writing any test case, build two things first: (1) an environment compatibility matrix — listing OS, DB version, .NET runtime, and minimum disk space combinations v4.0 supports, cross-checked against each factory's reality; (2) the OFFICIAL upgrade process diagram with its rollback path, so you know exactly which step needs its own test case.",
        "テストケースを書く前に、まず2つのものを用意しましょう：（1）環境互換性マトリクス——v4.0がサポートするOS、DBバージョン、.NETランタイム、最小ディスク容量の組み合わせを列挙し、各工場の実情と照合する。（2）ロールバック経路を含む『正式な』アップグレードプロセス図——どのステップに独自のテストケースが必要かを正確に把握するため。"),
      IMG(m_flow, "Quy trình nâng cấp NovaERP v3.8→v4.0: backup → dừng dịch vụ → migration → cài đặt → smoke test → go-live, kèm đường rollback khi lỗi", "NovaERP v3.8→v4.0 upgrade process: backup → stop service → migration → install → smoke test → go-live, with a rollback path on failure", "NovaERP v3.8→v4.0アップグレードプロセス：バックアップ→サービス停止→マイグレーション→インストール→スモークテスト→本稼働、失敗時のロールバック経路付き"),
      STEP(1, "Liệt kê từng bước trong sơ đồ quy trình chính thức (backup, dừng dịch vụ, migration, cài đặt, smoke test, go-live) và đường rẽ rollback tương ứng.", "List every step in the official process diagram (backup, stop service, migration, install, smoke test, go-live) and its matching rollback branch.", "公式プロセス図の各ステップ（バックアップ、サービス停止、マイグレーション、インストール、スモークテスト、本稼働）とそれに対応するロールバック分岐を列挙する。"),
      STEP(2, "Với mỗi bước, tự hỏi 'nếu bước này thất bại giữa chừng thì sao?' — đó chính là nguồn ca kiểm thử cài đặt gián đoạn quan trọng nhất.", "For each step, ask 'what if this step fails mid-way?' — that's the most important source of interrupted-install test cases.", "各ステップについて『このステップが途中で失敗したらどうなるか』と自問する——それが中断インストールのテストケースの最も重要な源泉となる。"),
      STEP(3, "Đối chiếu ma trận tương thích với DANH SÁCH THẬT các nhà máy (OS/DB/dung lượng đĩa hiện có) để biết tổ hợp nào rủi ro nhất cần ưu tiên test trước.", "Cross-check the compatibility matrix against the REAL LIST of factories (their actual OS/DB/disk space) to know which combination is riskiest and should be tested first.", "互換性マトリクスを工場の『実際のリスト』（現状のOS／DB／ディスク容量）と照合し、最もリスクの高い組み合わせを優先的にテストする。"),
      TRY("Chọn 1 nhà máy trong danh sách của bạn (hoặc giả định 1 nhà máy 'khó nhất'), liệt kê xem tổ hợp OS/DB/dung lượng đĩa của nó có nằm trong ma trận tương thích được hỗ trợ không.", "Pick one factory from your list (or imagine the 'hardest' one), and check whether its OS/DB/disk-space combination falls inside the supported compatibility matrix.", "リストから1つの工場を選ぶ（または『最も厳しい』工場を想定する）。そのOS/DB/ディスク容量の組み合わせがサポート対象の互換性マトリクスに含まれるか確認しよう。"),
      PITFALL("Chỉ test nâng cấp trên MỘT môi trường 'chuẩn' (thường là máy của đội dev), rồi coi như mọi nhà máy khác cũng sẽ chạy y hệt — bỏ qua sự khác biệt OS/DB/dung lượng đĩa thực tế giữa các nhà máy.", "Testing the upgrade only on ONE 'standard' environment (usually the dev team's machine), then assuming every other factory will behave identically — ignoring the real OS/DB/disk-space differences between factories.", "アップグレードを1つの『標準』環境（通常は開発チームのマシン）だけでテストし、他のすべての工場も同じように動くと想定してしまう——工場間の実際のOS/DB/ディスク容量の違いを無視すること。"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử di trú dữ liệu từng bước (thực hành)", en: "5. Writing data migration test cases step by step (hands-on)", ja: "5. データ移行テストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào bảng Tồn kho (Inventory) của NovaERP — bảng dữ liệu rủi ro cao nhất khi nâng cấp vì trực tiếp ảnh hưởng tới số lượng hàng thật trong kho. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử di trú dữ liệu đầy đủ.",
        "Now let's apply this for real to NovaERP's Inventory table — the highest-risk data table during an upgrade because it directly affects real stock quantities in the warehouse. Follow the order below to build a complete set of data migration test cases.",
        "では、NovaERPの在庫（Inventory）テーブルに実際に適用しましょう——倉庫内の実際の在庫数量に直接影響するため、アップグレード時に最もリスクの高いデータテーブルです。以下の順に沿って、完全なデータ移行テストケース一式を作りましょう。"),
      STEP(1, "Ghi lại tổng số liệu tồn kho toàn hệ thống TRƯỚC khi chạy migration (checksum/tổng số lượng theo từng kho, từng mã hàng) làm mốc so sánh.", "Record the total inventory figures across the whole system BEFORE running migration (checksum/total quantity per warehouse, per item code) as a comparison baseline.", "マイグレーション実行『前』のシステム全体の在庫合計（倉庫ごと、商品コードごとのチェックサム／合計数量）を比較基準として記録する。"),
      STEP(2, "Chạy migration trên một bản sao dữ liệu THẬT của nhà máy (không phải dữ liệu mẫu), bao gồm cả các dòng dữ liệu 'bẩn' như tồn kho âm hoặc phiếu đang dở dang.", "Run migration on a REAL copy of a factory's data (not sample data), including 'dirty' rows like negative inventory or in-progress receipts.", "工場の『実際の』データのコピー（サンプルデータではなく）でマイグレーションを実行する。負の在庫や処理途中の伝票のような『汚い』行も含める。"),
      STEP(3, "Sau khi migration chạy xong, đối chiếu lại tổng số liệu ở bước 1 — bất kỳ lệch nào, dù chỉ 1 đơn vị, cũng phải được điều tra tới cùng, không bỏ qua vì 'chênh lệch nhỏ'.", "After migration finishes, reconcile against the totals from step 1 — any mismatch, even a single unit, must be investigated fully, not dismissed as a 'small difference'.", "マイグレーション完了後、ステップ1の合計値と照合する——1単位でもズレがあれば、『わずかな差』として見過ごさず徹底的に調査する。"),
      STEP(4, "Với các trường dữ liệu MỚI chưa tồn tại ở v3 (ví dụ 'Mã lô sản xuất'), kiểm tra chúng nhận giá trị mặc định hợp lệ, không NULL gây lỗi ràng buộc khi hệ thống v4.0 khởi động.", "For NEW fields that didn't exist in v3 (e.g. 'Batch code'), check they receive a valid default value, not NULL causing a constraint error when v4.0 starts up.", "v3に存在しなかった新しいフィールド（例：『製造ロットコード』）について、v4.0起動時に制約エラーを起こすNULLではなく、有効なデフォルト値を受け取ることを確認する。"),
      CODE("text", "BAO CAO DOI CHIEU MIGRATION - bang Ton kho (Nha may Ha Noi)\nTruoc migrate  : tong 482.310 don vi | 12 dong am | 3 phieu dang cho duyet\nSau migrate    : tong 481.106 don vi (LECH -1.204) | 0 dong am (BUG: bi lam tron ve 0) | 3 phieu -> mat trang thai (BUG)\nKet luan       : KHONG DAT - can dieu tra script anh xa don vi tinh 'Thung' -> 'Lon' va xu ly rieng cho phieu dang cho duyet"),
      TRY("Viết thêm 1 ca kiểm thử di trú dữ liệu cho bảng 'Công nợ khách hàng' (Accounts Receivable) mà bảng ở chương này chưa có (gợi ý: công nợ có dòng ngoại tệ, hoặc khách hàng đã ngừng hoạt động).", "Write one more data migration test case for the 'Accounts Receivable' table not covered in this chapter (hint: receivables in foreign currency, or an inactive customer).", "本章にない『売掛金』（Accounts Receivable）テーブルの移行テストケースをもう1つ書こう（ヒント：外貨建ての売掛金、または活動を停止した顧客）。"),
      IMG(m_migration_case, "Bảng ca kiểm thử di trú dữ liệu tồn kho NovaERP v3 → v4: đơn vị tính, số âm tồn kho, phiếu dở dang, đối chiếu tổng, trường mới", "NovaERP v3→v4 inventory data migration test cases: units, negative stock, in-progress receipts, total reconciliation, new fields", "NovaERP v3→v4の在庫データ移行テストケース表：単位、負の在庫、処理途中の伝票、合計照合、新フィールド"),
    ] },
  { heading: { vi: "6. Tình huống 1: nâng cấp thất bại giữa chừng, không rollback được → hệ treo", en: "6. Situation 1: upgrade fails mid-way, rollback doesn't work → the system hangs", ja: "6. シーン1：アップグレードが途中で失敗しロールバックできない→システムが止まる" },
    blocks: [
      SITUATION("Đội vận hành bắt đầu nâng cấp NovaERP v3.8→v4.0 tại nhà máy Hà Nội theo đúng runbook, ngoài giờ sản xuất, đã backup DB đầy đủ trước khi bắt đầu.", "The ops team starts upgrading NovaERP v3.8→v4.0 at the Hanoi factory exactly per the runbook, outside production hours, with a full DB backup taken beforehand.",
        "Migration script gặp các dòng tồn kho âm chưa từng được xử lý và dừng đột ngột giữa chừng. Đội thử chạy script rollback theo tài liệu thì phát hiện script đó CHƯA TỪNG được viết hoàn chỉnh — chỉ có phần 'khôi phục phần mềm', thiếu hẳn phần 'khôi phục DB'. Dịch vụ ERP không lên được ở cả v3 lẫn v4, nhà máy phải ghi chép sản xuất bằng giấy hơn 3 giờ.",
        "The migration script hits negative inventory rows that were never handled and stops abruptly mid-way. The team tries to run the documented rollback script and discovers it was NEVER fully written — only a 'restore the software' part exists, with the 'restore the DB' part entirely missing. The ERP service can't come back up on either v3 or v4, and the factory has to record production on paper for over 3 hours.",
        "運用チームはランブックどおりに、生産時間外に、事前に完全なDBバックアップを取った上で、ハノイ工場でNovaERP v3.8→v4.0のアップグレードを開始する。",
        "マイグレーションスクリプトが一度も処理されたことのない負の在庫行に遭遇し、途中で突然停止する。チームがドキュメントどおりロールバックスクリプトを実行しようとすると、そのスクリプトが『一度も完成していなかった』ことが判明する——『ソフトウェアの復元』部分しかなく、『DBの復元』部分がまるごと欠けていた。ERPサービスはv3でもv4でも起動できず、工場は3時間以上紙で生産記録をつけざるを得なくなる。"),
      SOLVE("Trước khi nâng cấp bất kỳ nhà máy nào khác, viết lại script rollback ĐẦY ĐỦ (phần mềm + DB), và bắt buộc DIỄN TẬP rollback thành công trên môi trường staging trước khi được phép chạy nâng cấp thật ở bất kỳ nhà máy nào — coi rollback là một tính năng phải PASS test độc lập, không phải 'kế hoạch dự phòng viết cho có'.", "Before upgrading any other factory, rewrite a COMPLETE rollback script (software + DB), and mandate a successful rollback REHEARSAL in staging before real upgrades are allowed at any factory — treat rollback as a feature that must PASS its own independent test, not a 'contingency plan written just to have one'.", "他の工場をアップグレードする前に、完全なロールバックスクリプト（ソフトウェア＋DB）を書き直し、どの工場でも実際のアップグレードを許可する前にステージング環境でのロールバック『リハーサル』の成功を必須とする——ロールバックを『形だけの予備計画』ではなく、独立してPASSしなければならない機能として扱う。"),
      P("Bài học lớn nhất ở đây: một quy trình nâng cấp 'trông đầy đủ trên giấy' (có bước backup, có sơ đồ rollback) vẫn có thể ẩn chứa một mắt xích chưa từng được kiểm thử thật. Tester nâng cao không chỉ hỏi 'nâng cấp có chạy được không' mà phải hỏi 'nếu nâng cấp thất bại đúng ở bước X, đường rollback có THẬT SỰ đưa hệ thống về trạng thái hoạt động không' — và câu hỏi đó chỉ trả lời được bằng cách CHỦ ĐỘNG làm cho nâng cấp thất bại trong môi trường test, rồi thử rollback thật.",
        "The biggest lesson here: an upgrade process that 'looks complete on paper' (has a backup step, has a rollback diagram) can still hide a link that was never actually tested. An advanced tester doesn't just ask 'does the upgrade run' but 'if the upgrade fails exactly at step X, does the rollback path REALLY bring the system back to a working state' — and that question can only be answered by DELIBERATELY making the upgrade fail in a test environment, then actually trying the rollback.",
        "ここでの最大の教訓：紙の上では『完全に見える』アップグレードプロセス（バックアップステップあり、ロールバック図あり）でも、実際には一度もテストされていない環（リンク）が隠れていることがある。上級テスターは『アップグレードが動くか』だけでなく、『ステップXでちょうどアップグレードが失敗した場合、ロールバック経路は本当にシステムを稼働状態に戻すか』を問わなければならない——そしてその問いには、テスト環境で意図的にアップグレードを失敗させ、実際にロールバックを試すことでしか答えられない。"),
      IMG(m_jira, "Ticket lỗi: nâng cấp NovaERP treo giữa chừng tại nhà máy Hà Nội vì thiếu script rollback đầy đủ", "Bug ticket: NovaERP upgrade hangs mid-way at the Hanoi factory due to a missing complete rollback script", "バグチケット：ハノイ工場でNovaERPアップグレードが完全なロールバックスクリプトの欠如により途中で止まる"),
      RECAP(["Rollback là một TÍNH NĂNG cần test độc lập, không phải kế hoạch viết cho có", "Phải chủ động làm nâng cấp thất bại trong test để xác nhận rollback thật sự hoạt động"],
        ["Rollback is a FEATURE that needs independent testing, not a plan written just to have one", "You must deliberately make the upgrade fail in testing to confirm rollback truly works"],
        ["ロールバックは独立してテストすべき『機能』であり、形だけの計画ではない", "ロールバックが本当に機能するか確認するには、テストでアップグレードを意図的に失敗させる必要がある"]),
    ] },
  { heading: { vi: "7. Tình huống 2: di trú dữ liệu làm mất dữ liệu tồn kho", en: "7. Situation 2: data migration loses inventory data", ja: "7. シーン2：データ移行で在庫データが失われる" },
    blocks: [
      SITUATION("Ở nhà máy Đà Nẵng, đội chạy migration trên một bản sao dữ liệu 'sạch' đã được dọn trước để test cho nhanh, và kết quả pass 100%.", "At the Da Nang factory, the team runs migration on a 'clean' pre-tidied data copy to test faster, and it passes 100%.",
        "Khi chạy migration thật trên dữ liệu production (chưa từng được 'dọn'), script gặp 12 dòng tồn kho âm tồn đọng nhiều năm và tự động làm tròn chúng về 0 thay vì cảnh báo — khiến tổng tồn kho sau migrate lệch 1.204 đơn vị so với trước. Sai lệch này chỉ được phát hiện 2 tuần sau, khi bộ phận kho đối chiếu kiểm kê thực tế và không khớp với số liệu trên hệ thống mới.",
        "When migration runs for real on production data (never 'tidied'), the script encounters 12 negative inventory rows that had accumulated over years and silently rounds them to zero instead of warning — leaving the post-migration total off by 1,204 units. This discrepancy is only discovered 2 weeks later, when the warehouse team reconciles a physical stock count against the new system's figures.",
        "ダナン工場では、チームは素早くテストするために事前に『整理された』クリーンなデータコピーでマイグレーションを実行し、100%合格する。",
        "（一度も『整理』されていない）本番データで実際にマイグレーションを実行すると、スクリプトは何年も蓄積された12件の負の在庫行に遭遇し、警告する代わりに黙って0に丸めてしまい、移行後の合計が以前より1,204単位ずれてしまう。この不一致は2週間後、倉庫チームが実地棚卸を新システムの数値と照合して初めて発覚する。"),
      SOLVE("Bổ sung ca kiểm thử di trú dữ liệu bắt buộc phải chạy trên MỘT BẢN SAO DỮ LIỆU PRODUCTION THẬT (đã ẩn danh nếu cần) trước khi cho phép migration ở nhà máy tiếp theo, và thêm bước đối chiếu tổng số liệu tự động NGAY SAU migration thay vì chờ kiểm kê thủ công 2 tuần sau mới phát hiện.", "Add a mandatory data migration test case that must run on a REAL PRODUCTION DATA COPY (anonymized if needed) before migration is allowed at the next factory, and add an automatic total-reconciliation step RIGHT AFTER migration instead of waiting for a manual stock count 2 weeks later to catch it.", "次の工場でのマイグレーションを許可する前に、（必要であれば匿名化した）『本番データの実際のコピー』での実行を必須とするデータ移行テストケースを追加し、2週間後の手作業の棚卸で発覚するのを待つのではなく、マイグレーション『直後』に自動で合計照合を行うステップを追加する。"),
      P("Ví dụ này cho thấy vì sao 'dữ liệu mẫu sạch' — dù giúp kiểm thử chạy nhanh và ổn định — lại là một cái bẫy nguy hiểm cho kiểm thử di trú dữ liệu nâng cao. Dữ liệu thật của một hệ thống đã vận hành nhiều năm luôn chứa những ngoại lệ mà không ai còn nhớ tại sao chúng tồn tại, và chính những ngoại lệ đó — chứ không phải luồng chính — là nơi migration script dễ âm thầm làm sai mà không báo lỗi rõ ràng.",
        "This example shows why 'clean sample data' — even though it makes testing fast and stable — is a dangerous trap for advanced data migration testing. Real data from a system that's run for years always contains exceptions nobody quite remembers the reason for, and it's exactly those exceptions — not the main flow — where a migration script quietly does the wrong thing without a clear error.",
        "この例は、テストを速く安定させてくれる『きれいなサンプルデータ』が、なぜ高度なデータ移行テストにおいて危険な罠となるかを示しています。何年も運用されてきたシステムの実データには、誰もその理由を覚えていない例外が必ず含まれており、まさにそうした例外——メインフローではなく——でこそ、マイグレーションスクリプトは明確なエラーを出さずに静かに誤った処理をしがちなのです。"),
      TRY("Nghĩ thêm 1 loại 'dữ liệu ngoại lệ tích luỹ nhiều năm' khác có thể tồn tại trong một hệ ERP thật (mã hàng đã ngừng bán, khách hàng trùng mã, đơn giá bằng 0...) và đề xuất 1 ca kiểm thử di trú cho nó.", "Think of one more type of 'exception data accumulated over years' that could exist in a real ERP (discontinued item codes, duplicate customer codes, zero unit prices...) and propose one migration test case for it.", "実際のERPに存在しうる『何年も蓄積された例外データ』の別の種類を考え（廃番の商品コード、重複した顧客コード、単価ゼロなど）、そのための移行テストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Theo dõi kết quả rollout đa nhà máy & cân bằng rủi ro", en: "8. Tracking multi-factory rollout results & balancing risk", ja: "8. 複数工場ロールアウトの結果追跡とリスクバランス" },
    blocks: [
      P("Khi rollout diễn ra qua nhiều nhà máy, kiểm thử cài đặt & nâng cấp không dừng lại sau lần nâng cấp đầu tiên — cần một bảng theo dõi sống để biết nhà máy nào đã nâng cấp thành công, nhà máy nào phải rollback, và các con số RTO-như-rollback (thời gian rollback thực đo) có đang cải thiện qua từng lần hay không.",
        "As a rollout spans many factories, install & upgrade testing doesn't stop after the first upgrade — you need a living tracking board to know which factories succeeded, which had to roll back, and whether rollback-like RTO numbers (actual measured rollback time) are improving over successive attempts.",
        "ロールアウトが複数の工場にまたがる場合、インストール・アップグレードテストは最初のアップグレードで終わりません——どの工場が成功し、どの工場がロールバックせざるを得なかったか、そしてロールバックのようなRTO指標（実測ロールバック時間）が試行を重ねるごとに改善しているかを把握する『生きた』追跡ボードが必要です。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua Installation & Upgrade Testing xuyên suốt đợt rollout 6 nhà máy NovaERP", "A board tracking bugs found via Installation & Upgrade Testing across the 6-factory NovaERP rollout", "NovaERP6工場ロールアウト全体でインストール・アップグレードテストにより見つかったバグの追跡ボード"),
      IMG(m_dash, "Số liệu: chỉ 4/6 nhà máy nâng cấp thành công, thời gian rollback thực đo còn vượt cam kết", "Metrics: only 4/6 factories upgraded successfully, actual rollback time still exceeds the commitment", "指標：4/6工場のみアップグレード成功、実測ロールバック時間はまだコミットメントを超過"),
      TIP("Sau MỖI nhà máy nâng cấp — thành công hay phải rollback — hãy cập nhật lại ma trận tương thích và script migration/rollback trước khi chuyển sang nhà máy tiếp theo, thay vì lặp lại y hệt quy trình cũ và hy vọng lần này may mắn hơn.", "After EVERY factory upgrade — whether it succeeded or had to roll back — update the compatibility matrix and the migration/rollback scripts before moving to the next factory, instead of repeating the exact same process and hoping this time is luckier.", "工場のアップグレードごとに——成功であれロールバックであれ——次の工場に進む前に互換性マトリクスとマイグレーション／ロールバックスクリプトを更新すること。まったく同じプロセスを繰り返して今回は運が良いことを期待するのではなく。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi kiểm thử cài đặt/nâng cấp", en: "9. Common mistakes & tips for install/upgrade testing", ja: "9. インストール・アップグレードテストでよくある失敗とコツ" },
    blocks: [
      P("Ngay cả tester có kinh nghiệm cũng dễ vấp vài lỗi giống nhau khi làm kiểm thử cài đặt & nâng cấp cho hệ thống nhiều môi trường. Biết trước giúp bạn thiết kế ca kiểm thử hiệu quả hơn mà không bỏ sót rủi ro lớn.",
        "Even experienced testers easily fall into a few common mistakes when doing install & upgrade testing for a multi-environment system. Knowing them ahead of time helps you design more effective test cases without missing major risks.",
        "経験豊富なテスターでも、複数環境システムのインストール・アップグレードテストではいくつかの共通の失敗をしがちです。事前に知っておくことで、大きなリスクを見逃さずより効果的なテストケースを設計できます。"),
      PITFALL("Chỉ test 'happy path' nâng cấp (mọi thứ đủ điều kiện, mạng ổn định, đủ quyền) mà không chủ động mô phỏng cài đặt/nâng cấp GIÁN ĐOẠN — mất điện, hết dung lượng đĩa, thiếu quyền admin giữa chừng.", "Only testing the upgrade 'happy path' (everything meets requirements, stable network, enough permissions) without proactively simulating an INTERRUPTED install/upgrade — power loss, disk space running out, missing admin rights mid-way.", "アップグレードの『ハッピーパス』（すべての条件を満たし、ネットワークが安定し、権限も十分）だけをテストし、停電、ディスク容量不足、途中での管理者権限不足といった『中断』インストール・アップグレードを積極的にシミュレートしないこと。"),
      PITFALL("Test rollback CHỈ trên môi trường 'chưa từng nâng cấp' — trong khi thực tế rollback thường phải chạy sau khi nâng cấp đã đi được một nửa, dữ liệu đã bị thay đổi một phần bởi migration script.", "Testing rollback ONLY on an environment that has 'never been upgraded' — while in reality rollback usually has to run after an upgrade is already half-done, with data partially altered by the migration script.", "ロールバックを『一度もアップグレードされたことのない』環境だけでテストすること——実際にはロールバックは通常アップグレードが半分終わり、マイグレーションスクリプトによってデータが部分的に変更された後に実行しなければならない。"),
      TIP("Trước khi báo một sai lệch dữ liệu di trú là bug, luôn đối chiếu với TỔNG SỐ LIỆU gốc thay vì chỉ nhìn một vài bản ghi mẫu — sai lệch nhỏ ở vài dòng có thể là dấu hiệu của một lỗi ánh xạ ảnh hưởng tới hàng nghìn dòng khác chưa được kiểm tra.", "Before reporting a migration data discrepancy as a bug, always reconcile against the ORIGINAL TOTAL figures instead of just eyeballing a few sample records — a small mismatch in a few rows can be a sign of a mapping bug affecting thousands of other unchecked rows.", "移行データの不一致をバグとして報告する前に、いくつかのサンプルレコードを見るだけでなく、常に『元の合計値』と照合すること——数行の小さなズレは、まだ確認されていない何千もの他の行に影響するマッピングバグの兆候であることがある。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block, faq4.block,
      INTERNAL("Kiểm thử phục hồi & failover cho Tester", "Recovery & failover testing for testers", "kiem-thu-phuc-hoi-va-failover-cho-tester", "テスターのためのリカバリー＆フェイルオーバーテスト"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための結合テスト"),
      INTERNAL("Chiến lược và kế hoạch kiểm thử (Test Plan) cho Tester", "Test strategy and test plan for testers", "chien-luoc-va-ke-hoach-kiem-thu-test-plan-cho-tester", "テスターのためのテスト戦略・テスト計画"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử cài đặt & nâng cấp ở mức nâng cao qua dự án nâng cấp NovaERP từ v3.8 lên v4.0 cho chuỗi nhà máy Nova Manufacturing: phân biệt cài mới/nâng cấp/di trú dữ liệu/rollback/gỡ cài đặt sạch, cách dựng ma trận tương thích môi trường và sơ đồ quy trình nâng cấp, cách viết ca kiểm thử di trú dữ liệu đối chiếu tổng số liệu, và hai tình huống thật cho thấy rollback chưa được test kỹ và dữ liệu 'sạch' khi test dễ che giấu lỗi migration nghiêm trọng. Bạn cũng biết cách theo dõi kết quả rollout qua nhiều nhà máy và những lỗi hay gặp cần tránh.",
        "You just learned advanced install & upgrade testing through the project upgrading NovaERP from v3.8 to v4.0 across the Nova Manufacturing factory chain: distinguishing fresh install/upgrade/data migration/rollback/clean uninstall, building an environment compatibility matrix and upgrade process diagram, writing data migration test cases that reconcile totals, and two real situations showing an under-tested rollback and how 'clean' test data can hide serious migration bugs. You also learned to track rollout results across multiple factories and common mistakes to avoid.",
        "Nova Manufacturing工場チェーン向けNovaERPをv3.8からv4.0へアップグレードするプロジェクトを通じて、高度なインストール・アップグレードテストを学びました：新規インストール／アップグレード／データ移行／ロールバック／クリーンアンインストールの区別、環境互換性マトリクスとアップグレードプロセス図の構築、合計値を照合するデータ移行テストケースの書き方、そして十分にテストされていないロールバックと、テストの『きれいな』データが深刻な移行バグを隠しうることを示す2つの実例。複数工場にわたるロールアウト結果の追跡方法と、避けるべきよくある失敗も学びました。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật kiểm thử phục hồi & failover để mở rộng tư duy sang các sự cố hạ tầng khác, cùng cách viết một test plan bài bản cho một đợt rollout đa môi trường. Nếu muốn học bài bản từ nền tảng tới cấp nâng cao cùng người hướng dẫn và dự án thực chiến ERP/ngân hàng, một khoá học Tester chuyên nghiệp sẽ giúp bạn tiến nhanh và tự tin đảm nhận các dự án triển khai phức tạp.",
        "Next, you should learn recovery & failover testing to extend your thinking to other infrastructure incidents, along with how to write a proper test plan for a multi-environment rollout. If you want to learn properly from foundations to advanced level with a mentor and real ERP/banking projects, a professional Tester course will help you progress fast and confidently take on complex deployment projects.",
        "次は、他のインフラ障害にも考え方を広げるためのリカバリー＆フェイルオーバーテストと、複数環境ロールアウトのための適切なテスト計画の書き方を学びましょう。指導者と実際のERP／銀行プロジェクトとともに基礎から上級まで体系的に学びたいなら、プロフェッショナルテスターコースが、複雑な展開プロジェクトを自信を持って担当できるよう速い成長を助けます。"),
      CTA(course),
    ] },
];

const DOC = makeDoc({
  slug: "kiem-thu-cai-dat-va-nang-cap-installation-cho-tester",
  domain: "erp",
  primaryKeyword: "kiểm thử cài đặt",
  keywords: ["kiểm thử cài đặt", "installation testing", "kiểm thử nâng cấp", "upgrade testing", "di trú dữ liệu", "rollback testing", "ERP đa nhà máy"],
  coverLabel: "NÂNG CAO · CÀI ĐẶT & NÂNG CẤP · ERP",
  crumb: "Kiểm thử cài đặt & nâng cấp (Installation & Upgrade Testing)",
  metaTitle: { vi: "Kiểm thử cài đặt & nâng cấp ERP cho Tester nâng cao", en: "Installation & upgrade testing for advanced testers", ja: "上級テスターのためのインストール・アップグレードテスト" },
  metaDescription: {
    vi: "Kiểm thử cài đặt và nâng cấp ERP nâng cao: cài mới, di trú dữ liệu, rollback, tương thích cấu hình, cài gián đoạn, ví dụ nhà máy thật, có hình minh hoạ.",
    en: "Advanced ERP installation & upgrade testing: fresh install, upgrade, data migration, rollback, OS/config compatibility, interrupted installs, clean uninstall, real factory examples, visuals and a quiz.",
    ja: "上級ERPインストール・アップグレードテスト：新規インストール、アップグレード、データ移行、ロールバック、OS/設定互換性、中断インストール、クリーンアンインストールを実例と図・クイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử cài đặt & nâng cấp (Installation & Upgrade Testing) cho ERP đa nhà máy: cài mới, di trú dữ liệu, rollback",
    en: "Installation & upgrade testing for a multi-factory ERP: fresh install, data migration, rollback",
    ja: "複数工場ERPのためのインストール＆アップグレードテスト：新規インストール、データ移行、ロールバック",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử cài đặt & nâng cấp qua dự án nâng cấp ERP NovaERP từ v3.8 lên v4.0 cho chuỗi nhà máy Nova Manufacturing. Ma trận tương thích cài mới/nâng cấp/rollback, sơ đồ quy trình nâng cấp, ca kiểm thử di trú dữ liệu tồn kho, 2 tình huống thật (nâng cấp treo không rollback được, migration làm mất dữ liệu tồn kho), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: installation & upgrade testing through a real ERP project upgrading NovaERP from v3.8 to v4.0 across the Nova Manufacturing factory chain. A fresh-install/upgrade/rollback compatibility matrix, upgrade process diagram, inventory data migration test cases, 2 real situations (an upgrade hanging with no working rollback, a migration losing inventory data), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "上級記事：Nova Manufacturing工場チェーン向けにNovaERPをv3.8からv4.0へアップグレードする実プロジェクトを通じたインストール・アップグレードテスト。新規インストール／アップグレード／ロールバックの互換性マトリクス、アップグレードプロセス図、在庫データ移行テストケース、実例2件（ロールバックできず止まったアップグレード、在庫データを失う移行）、多数のUIモックアップ、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3, faq4],
  howTo: { name: "Cách kiểm thử cài đặt và nâng cấp ERP đa môi trường", steps: [
    { name: "Dựng ma trận tương thích & sơ đồ quy trình nâng cấp", text: "Liệt kê tổ hợp OS/DB/dung lượng đĩa và các bước nâng cấp kèm đường rollback." },
    { name: "Viết ca kiểm thử di trú dữ liệu đối chiếu tổng số liệu", text: "Chạy trên dữ liệu production thật, đối chiếu tổng trước/sau migrate." },
    { name: "Chủ động làm nâng cấp thất bại để kiểm thử rollback", text: "Xác nhận rollback khôi phục đúng cả phần mềm lẫn dữ liệu, không chỉ tin vào tài liệu." },
  ] },
  pages,
});

export const MA_INSTALL_01 = [DOC];
