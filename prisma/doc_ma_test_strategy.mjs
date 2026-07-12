// doc_ma_test_strategy.mjs — BÀI MANUAL "NÂNG CAO":
// Chiến lược kiểm thử & Kế hoạch kiểm thử (Test Strategy & Test Plan) — phân biệt hai tài liệu,
// cấu trúc chuẩn của một test plan (phạm vi, cách tiếp cận, tiêu chí vào/ra, môi trường, lịch,
// rủi ro, phân công), ước lượng công sức, tiêu chí dừng test. Dự án: triển khai ERP OneERP cho
// Tập đoàn bán lẻ Đại Việt (hàng trăm cửa hàng, nhiều module Tài chính/Kho/Bán hàng/POS).
// Song ngữ vi/en/ja (ja≠en), 12 chương, nhiều MOCKUP giao diện (ui_mock), trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test plan & test strategy nâng cao, công cụ & dự án thực chiến.",
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

// ── Mockup 1: màn hình mở tài liệu Test Plan của dự án OneERP ──
const m_planscreen = browser("onederp-pm.daivietretail.vn/test-plan/OE-UAT-R1", [
  field(24, 20, 654, "Tên tài liệu", "Test Plan — OneERP Release 1 (FI/MM/SD/POS)", "normal"),
  field(24, 92, 330, "Phiên bản", "v2.3 — đã duyệt", "normal"),
  field(372, 92, 306, "Người phê duyệt", "Test Manager · PM · CFO đại diện", "normal"),
  `<text x="24" y="176" font-size="11" font-weight="700" fill="#475569">Phạm vi trong test plan</text>
<rect x="24" y="186" width="654" height="56" rx="8" fill="#eef2ff" stroke="#4338ca" stroke-width="2"/>
<text x="36" y="206" font-size="12.5" fill="#1e1b4b">Trong phạm vi: Tài chính (FI), Kho (MM), Bán hàng (SD), đồng bộ POS 240 cửa hàng</text>
<text x="36" y="226" font-size="12.5" fill="#1e1b4b">Ngoài phạm vi: module Nhân sự-Lương (HR) — chuyển sang Release 2</text>`,
  btn(24, 258, 200, "Xem chi tiết 10 mục", "primary"),
  annotate(20, 12, 660, 62, "Đầu tài liệu: định danh, phiên bản, người phê duyệt"),
].join(""), { h: 330, title: "OneERP · Test Plan", accent: "#4338ca" });

// ── Mockup 2: bảng cấu trúc chuẩn của một Test Plan ──
const m_structure = grid("Cấu trúc chuẩn của một Test Plan (tham chiếu IEEE 829 / ISO 29119) — OneERP", ["Mục", "Nội dung chính", "Ví dụ trong Test Plan OneERP"], [
  ["1. Giới thiệu & mục tiêu", "Bối cảnh dự án, mục tiêu kiểm thử", "Đảm bảo đóng sổ kế toán đúng hạn, đồng bộ POS 100% cửa hàng"],
  ["2. Phạm vi (in/out scope)", "Module/tính năng ĐƯỢC và KHÔNG được kiểm thử", "Trong: FI, MM, SD, POS · Ngoài: HR-Lương (Release 2)"],
  ["3. Đối tượng kiểm thử", "Danh sách chức năng/luồng cụ thể", "Mua hàng → nhập kho → đối chiếu công nợ NCC"],
  ["4. Cách tiếp cận (approach)", "Loại kiểm thử, kỹ thuật, tham chiếu Test Strategy", "E2E theo luồng nghiệp vụ + hồi quy tự động cho core"],
  ["5. Tiêu chí vào/ra", "Điều kiện bắt đầu/kết thúc từng giai đoạn", "Xem chương 6 (Entry/Exit/Suspension)"],
  ["6. Môi trường & công cụ", "Cấu hình môi trường, dữ liệu test, công cụ", "SIT/UAT trên cloud, dữ liệu ẩn danh từ PROD, Jira+Zephyr"],
  ["7. Lịch trình (schedule)", "Mốc thời gian từng giai đoạn", "SIT 3 tuần, UAT 2 tuần, 1 tuần trước go-live"],
  ["8. Vai trò & phân công (RACI)", "Ai làm gì, ai duyệt, ai chịu trách nhiệm", "Test Lead duyệt ca, BA ký nghiệm thu, DBA hỗ trợ dữ liệu"],
  ["9. Rủi ro & phương án dự phòng", "Rủi ro dự án + kế hoạch giảm thiểu", "Thiếu môi trường tích hợp POS → thuê sandbox nhà cung cấp"],
  ["10. Sản phẩm bàn giao", "Báo cáo, ma trận truy vết yêu cầu", "Test summary report, RTM, danh sách defect tồn"],
], { accent: "#4338ca", note: "Test Strategy trả lời 'làm kiểm thử THEO CÁCH NÀO nói chung'; Test Plan cụ thể hoá 10 mục này CHO MỘT DỰ ÁN." });

// ── Mockup 3: bảng tiêu chí vào/ra & tiêu chí dừng test cho pha UAT OneERP ──
const m_criteria = grid("Tiêu chí Vào (Entry) · Ra (Exit) · Dừng test (Suspension) — Pha UAT OneERP", ["Loại tiêu chí", "Điều kiện cụ thể, đo lường được"], [
  ["Entry (vào UAT)", "Môi trường UAT sẵn sàng + dữ liệu master (SKU, kho, khách hàng) đã nạp; 100% ca kiểm thử đã review; build đã pass smoke test; Blocker/Critical vòng SIT trước đã đóng"],
  ["Exit (ra khỏi UAT)", "≥95% ca kiểm thử đã thực thi, ≥90% pass; 0 defect Critical/Blocker còn mở; ≤3 defect High có waiver được CFO/PM ký; regression core (đóng sổ, xuất hoá đơn, đồng bộ POS) pass 100%"],
  ["Suspension (tạm dừng)", "Tạm dừng nếu >30% ca bị block do môi trường/dữ liệu lỗi liên tục trên 4 giờ, hoặc phát hiện Blocker chặn luồng chính (không đóng được kỳ kế toán)"],
  ["Resumption (tiếp tục lại)", "Chỉ tiếp tục khi nguyên nhân đã khắc phục và có xác nhận bằng văn bản của Test Manager, không tự ý chạy lại khi chưa rõ nguyên nhân"],
], { accent: "#4338ca", note: "Không có Exit criteria đo lường được = không có căn cứ khách quan để nói 'đã kiểm thử xong', dễ bị ép release theo cảm tính." });

// ── Mockup 4: lịch trình/timeline các pha kiểm thử OneERP ──
const m_timeline = grid("Lịch trình kiểm thử OneERP Release 1 (9 tuần tới go-live)", ["Giai đoạn", "Thời gian", "Môi trường", "Đầu ra chính", "Phụ trách"], [
  ["Chuẩn bị & viết ca kiểm thử", "Tuần 1–2", "DEV", "Bộ ca kiểm thử + RTM (ma trận truy vết)", "Test Lead"],
  ["SIT (kiểm thử tích hợp hệ thống)", "Tuần 3–5", "SIT", "Log lỗi tích hợp FI-MM-SD-POS", "QA Team + Dev"],
  ["UAT (kiểm thử nghiệm thu)", "Tuần 6–7", "UAT", "Biên bản nghiệm thu từng phòng ban", "BA + đại diện phòng ban"],
  ["Hồi quy & diễn tập go-live", "Tuần 8", "UAT/Staging", "Kết quả regression + rehearsal cutover", "Test Lead + Ops"],
  ["Go-live & hỗ trợ hypercare", "Tuần 9", "PROD", "Báo cáo giám sát 2 tuần đầu vận hành", "Toàn đội dự án"],
], { accent: "#4338ca", note: "Mỗi giai đoạn có Entry criteria riêng — không cho phép nhảy sang UAT khi SIT chưa đạt Exit criteria." });

// ── Mockup 5: ticket Jira về hậu quả của việc thiếu tiêu chí ra rõ ràng ──
const m_jira = jira({
  key: "OE-3301", title: "Đóng kỳ kế toán tháng 6: sai số dư tồn kho ~2,4 tỷ đồng do go-live khi còn 4 defect Critical mở",
  type: "Bug", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "production · OneERP · module FI-MM (đối chiếu kho-kế toán)"],
    ["Nguyên nhân gốc", "Test plan không có Exit criteria đo lường được cho UAT — PM tự quyết release khi còn 4 defect Critical 'coi như chấp nhận được'"],
    ["Các bước", "1) Kết thúc UAT tuần 7 2) 4 defect Critical liên quan đối chiếu kho vẫn mở 3) Ban dự án vẫn duyệt go-live theo lịch cố định 4) Chạy đóng sổ tháng 6"],
    ["Kết quả mong đợi", "Không được go-live khi còn defect Critical mở (theo Exit criteria chuẩn)"],
    ["Kết quả thực tế", "Go-live đúng hạn, số dư tồn kho lệch ~2,4 tỷ đồng giữa hệ thống kho và kế toán"],
  ],
});

// ── Mockup 6: kanban theo dõi khối lượng công việc SIT khi thiếu môi trường tích hợp POS ──
const m_kanban = kanban("Theo dõi hạng mục kiểm thử tích hợp POS — SIT OneERP (Tuần 4)", [
  { name: "Chờ xử lý", cards: [
    { key: "OE-2810", title: "Chưa có sandbox POS cho 240 cửa hàng để test đồng bộ", sev: "Critical" },
    { key: "OE-2814", title: "Thiếu dữ liệu giả lập giao dịch POS cao điểm", sev: "High" },
  ] },
  { name: "Đang xử lý", cards: [
    { key: "OE-2790", title: "Đàm phán thuê sandbox nhà cung cấp POS", sev: "High" },
  ] },
  { name: "Chờ kiểm tra lại", cards: [
    { key: "OE-2775", title: "Đồng bộ tồn kho POS-kho lệch khi mất kết nối tạm thời", sev: "Medium" },
  ] },
  { name: "Đóng", cards: [
    { key: "OE-2750", title: "Đăng nhập quầy thu ngân qua SSO OneERP", sev: "Low" },
  ] },
]);

// ── Mockup 7: dashboard tiến độ kiểm thử UAT OneERP ──
const m_dash = dashboard("Tiến độ kiểm thử UAT OneERP — Tuần 6/9", [
  { label: "Ca đã thực thi", value: "62%", sub: "mục tiêu 95% trước Exit", color: "#4338ca" },
  { label: "Tỉ lệ pass", value: "84%", sub: "mục tiêu ≥90%", color: "#d97706" },
  { label: "Defect Critical mở", value: "4", sub: "Exit yêu cầu = 0", color: "#dc2626" },
  { label: "Ngày còn lại tới go-live", value: "21", sub: "3 tuần", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Test Strategy và Test Plan khác nhau thế nào?",
  "How are test strategy and test plan different?",
  "Test Strategy là tài liệu ở mức TỔ CHỨC/CHƯƠNG TRÌNH — mô tả cách tiếp cận kiểm thử chung, dùng lại cho nhiều dự án: mức độ kiểm thử, công cụ chuẩn, tiêu chuẩn chất lượng, cách quản lý rủi ro tổng quát. Test Plan là tài liệu ở mức DỰ ÁN CỤ THỂ — cụ thể hoá strategy đó cho một dự án: phạm vi thật, tiêu chí vào/ra đo lường được, lịch trình, phân công, rủi ro thực tế của chính dự án đó. Nói ngắn gọn: strategy trả lời 'chúng ta kiểm thử theo triết lý nào', plan trả lời 'dự án này sẽ kiểm thử cái gì, khi nào, ai làm, và biết khi nào xong'.",
  "Test Strategy is an ORGANIZATION/PROGRAM-level document — it describes a general testing approach reused across many projects: test levels, standard tooling, quality standards, general risk management. Test Plan is a PROJECT-SPECIFIC document — it turns that strategy into concrete detail for one project: real scope, measurable entry/exit criteria, schedule, assignments, and that project's actual risks. In short: strategy answers 'what testing philosophy do we follow', plan answers 'what will this project test, when, by whom, and how do we know it's done'.",
  "テスト戦略とテスト計画はどう違う？",
  "テスト戦略は組織/プログラムレベルの文書で、複数のプロジェクトで再利用される全般的なテストアプローチ——テストレベル、標準ツール、品質基準、全般的なリスク管理を記述します。テスト計画はプロジェクト固有の文書で、その戦略を1つのプロジェクト向けに具体化します——実際の範囲、測定可能な開始/終了基準、スケジュール、担当割り当て、そのプロジェクト固有のリスクです。要するに、戦略は『どんな理念でテストするか』に答え、計画は『このプロジェクトで何を、いつ、誰が、どうやって完了を判断するか』に答えます。");
const faq2 = FAQ(
  "Tiêu chí vào/ra (entry/exit criteria) trong test plan là gì và vì sao quan trọng?",
  "What are entry/exit criteria in a test plan and why do they matter?",
  "Entry criteria là điều kiện phải thoả để BẮT ĐẦU một giai đoạn kiểm thử (ví dụ môi trường sẵn sàng, dữ liệu đã nạp, build đã smoke test pass). Exit criteria là điều kiện phải thoả để KẾT THÚC giai đoạn đó và cho phép chuyển tiếp/release (ví dụ tỉ lệ pass tối thiểu, 0 defect Critical mở). Nếu không có exit criteria đo lường được, quyết định 'đã test xong chưa' sẽ dựa trên cảm tính hoặc áp lực deadline — như tình huống OneERP go-live khi còn 4 defect Critical gây sai số dư kế toán hàng tỷ đồng. Có tiêu chí rõ ràng biến cuộc tranh cãi cảm tính thành một checklist khách quan mà PM, CFO và Test Manager đều đồng thuận từ trước.",
  "Entry criteria are conditions that must be met to START a test phase (e.g. environment ready, data loaded, build passed smoke test). Exit criteria are conditions that must be met to END that phase and allow moving forward/releasing (e.g. minimum pass rate, zero open Critical defects). Without measurable exit criteria, the decision of 'are we done testing' relies on gut feeling or deadline pressure — like the OneERP situation of going live with 4 open Critical defects that caused a multi-billion-VND accounting mismatch. Clear criteria turn a subjective argument into an objective checklist that PM, CFO and Test Manager already agreed on beforehand.",
  "テスト計画における開始/終了基準とは何で、なぜ重要？",
  "開始基準（Entry criteria）は、あるテストフェーズを開始するために満たすべき条件です（例：環境準備完了、データ投入済み、ビルドがスモークテスト合格）。終了基準（Exit criteria）は、そのフェーズを終えて次工程やリリースに進むために満たすべき条件です（例：最低合格率、Critical不具合ゼロ）。測定可能な終了基準がなければ、『テストが完了したか』の判断は感覚や納期プレッシャーに頼ることになります——OneERPの事例のように、Critical不具合が4件残ったままリリースし、数十億ドン規模の会計残高不一致を招いたケースです。明確な基準があれば、主観的な議論がPM・CFO・テストマネージャーが事前に合意した客観的なチェックリストに変わります。");
const faq3 = FAQ(
  "Làm sao ước lượng công sức kiểm thử cho dự án ERP nhiều module chính xác hơn?",
  "How can I estimate test effort for a multi-module ERP project more accurately?",
  "Đừng chỉ ước lượng theo số lượng test case — hãy cộng thêm ba yếu tố hay bị bỏ sót: (1) độ phức tạp tích hợp giữa các module (FI-MM-SD-POS phụ thuộc chéo nhau, không phải kiểm thử độc lập từng module), (2) thời gian chuẩn bị MÔI TRƯỜNG và dữ liệu test riêng cho tích hợp (thường bị đánh giá thấp nhất, như tình huống thiếu sandbox POS ở bài này), và (3) hệ số dự phòng cho việc chạy lại (re-test) sau khi sửa lỗi — dự án ERP thường cần 1,3–1,5 lần công sức ban đầu cho vòng hồi quy. Cách thực dụng: dùng dữ liệu lịch sử từ dự án ERP tương tự nếu có, chia nhỏ theo WBS (work breakdown structure) từng luồng nghiệp vụ thay vì ước lượng tổng thể, và luôn có một khoản dự phòng rủi ro (buffer) riêng cho môi trường tích hợp.",
  "Don't estimate by test case count alone — add three often-missed factors: (1) integration complexity between modules (FI-MM-SD-POS depend on each other, not tested independently), (2) time to prepare the INTEGRATION ENVIRONMENT and its test data (usually the most underestimated part, like this article's missing POS sandbox situation), and (3) a buffer for re-testing after bug fixes — ERP projects typically need 1.3–1.5x the initial effort for regression cycles. A practical approach: use historical data from similar ERP projects if available, break estimates down by WBS (work breakdown structure) per business flow instead of one lump estimate, and always keep a separate risk buffer for the integration environment.",
  "モジュールの多いERPプロジェクトのテスト工数をより正確に見積もるには？",
  "テストケース数だけで見積もらず、見落とされがちな3つの要素を加えましょう：（1）モジュール間の統合の複雑さ（FI-MM-SD-POSは相互依存しており、独立してテストできない）、（2）統合用の環境とテストデータの準備時間（本記事のPOSサンドボックス不足のように、最も過小評価されがちな部分）、（3）バグ修正後の再テスト分のバッファ——ERPプロジェクトは通常、回帰サイクルに初期見積もりの1.3〜1.5倍の工数が必要です。実用的な方法：類似ERPプロジェクトの過去データがあれば活用し、全体を一括で見積もるのではなく業務フローごとにWBS（作業分解構成図）で分解し、統合環境用に別枠のリスクバッファを常に確保することです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Đâu là khác biệt CHÍNH giữa Test Strategy và Test Plan?", en: "What is the KEY difference between test strategy and test plan?", ja: "テスト戦略とテスト計画の主な違いは？" },
    options: [
      { vi: "Không có gì khác nhau, hai tên gọi cho cùng một tài liệu", en: "There's no difference, they're the same document with two names", ja: "違いはなく、同じ文書の2つの呼び方に過ぎない" },
      { vi: "Test Strategy ở mức tổ chức/chương trình, dùng lại nhiều dự án; Test Plan cụ thể hoá cho MỘT dự án với phạm vi, tiêu chí, lịch trình thực tế", en: "Test Strategy is org/program-level and reused across projects; Test Plan turns it into concrete scope, criteria and schedule for ONE project", ja: "テスト戦略は組織/プログラムレベルで複数プロジェクトに再利用され、テスト計画は1つのプロジェクト向けに具体的な範囲・基準・スケジュールに落とし込む" },
      { vi: "Test Plan luôn viết trước Test Strategy", en: "Test Plan is always written before Test Strategy", ja: "テスト計画は常にテスト戦略より先に書かれる" },
      { vi: "Test Strategy chỉ dùng cho dự án web, Test Plan chỉ dùng cho ERP", en: "Test Strategy is only for web projects, Test Plan only for ERP", ja: "テスト戦略はWebプロジェクト専用、テスト計画はERP専用" },
    ], correct: 1,
    explain: { vi: "Strategy trả lời 'kiểm thử theo triết lý nào' ở mức chương trình; Plan trả lời 'dự án này test gì, khi nào, ai làm' ở mức cụ thể.", en: "Strategy answers 'what testing philosophy' at program level; Plan answers 'what/when/who' at project level.", ja: "戦略はプログラムレベルで『どんな理念でテストするか』に答え、計画はプロジェクトレベルで『何を、いつ、誰が』に答えます。" },
  }),
  mcq({
    q: { vi: "Exit criteria (tiêu chí ra) trong test plan dùng để làm gì?", en: "What are exit criteria in a test plan used for?", ja: "テスト計画における終了基準（Exit criteria）は何に使う？" },
    options: [
      { vi: "Xác định điều kiện khách quan để kết thúc một giai đoạn kiểm thử/cho phép release, thay vì quyết định theo cảm tính", en: "Defining objective conditions to end a test phase/allow release, instead of a gut-feel decision", ja: "感覚ではなく、テストフェーズを終了/リリースを許可するための客観的な条件を定義するため" },
      { vi: "Chỉ để trang trí báo cáo cho đẹp", en: "Only to make the report look nice", ja: "報告書を見栄えよくするためだけ" },
      { vi: "Thay thế hoàn toàn cho việc viết test case", en: "Completely replaces writing test cases", ja: "テストケース作成を完全に置き換えるもの" },
      { vi: "Chỉ áp dụng cho dự án nhỏ, không cần cho ERP", en: "Only applies to small projects, not needed for ERP", ja: "小規模プロジェクトにのみ適用され、ERPには不要" },
    ], correct: 0,
    explain: { vi: "Không có exit criteria đo lường được, quyết định 'test xong chưa' dễ bị ép theo deadline như tình huống OneERP go-live còn 4 defect Critical.", en: "Without measurable exit criteria, 'are we done' gets pushed by deadline pressure, like OneERP going live with 4 open Critical defects.", ja: "測定可能な終了基準がなければ、『完了か』の判断は納期に押し切られやすい——OneERPがCritical不具合4件を残したままリリースした例のように。" },
  }),
  mcq({
    q: { vi: "Tiêu chí dừng test (suspension criteria) nên được kích hoạt khi nào?", en: "When should suspension criteria be triggered?", ja: "テスト中断基準（Suspension criteria）はいつ発動すべき？" },
    options: [
      { vi: "Khi tester cảm thấy mệt và muốn nghỉ", en: "When the tester feels tired and wants a break", ja: "テスターが疲れて休みたいと感じた時" },
      { vi: "Khi >30% ca kiểm thử bị block do môi trường/dữ liệu lỗi liên tục, hoặc phát hiện defect Blocker chặn luồng chính", en: "When >30% of test cases are blocked by ongoing environment/data failures, or a Blocker defect halts the main flow", ja: "テストケースの30%超が環境/データ不良で継続的にブロックされる、またはメインフローを止めるBlocker不具合が見つかった時" },
      { vi: "Ngay khi tìm thấy bug đầu tiên, bất kể mức độ nghiêm trọng", en: "As soon as the first bug is found, regardless of severity", ja: "重大度に関係なく最初のバグが見つかった瞬間" },
      { vi: "Không bao giờ cần dừng test giữa chừng", en: "Testing should never be suspended mid-way", ja: "テストを途中で中断する必要は決してない" },
    ], correct: 1,
    explain: { vi: "Suspension criteria dùng ngưỡng cụ thể (vd >30% block, có Blocker chặn luồng chính) để tránh test 'vô ích' khi môi trường/build chưa đủ ổn định.", en: "Suspension criteria use specific thresholds (e.g. >30% blocked, a flow-halting Blocker) to avoid 'wasted' testing when the environment/build isn't stable enough.", ja: "中断基準は具体的な閾値（例：30%超のブロック、フローを止めるBlocker）を使い、環境/ビルドが安定しない状態での『無駄な』テストを避けます。" },
  }),
  mcq({
    q: { vi: "Khi ước lượng công sức kiểm thử cho dự án ERP nhiều module, yếu tố nào hay bị đánh giá thấp nhất?", en: "When estimating test effort for a multi-module ERP project, which factor is usually most underestimated?", ja: "モジュールの多いERPプロジェクトのテスト工数見積もりで、最も過小評価されがちな要素は？" },
    options: [
      { vi: "Số lượng test case cho riêng từng module", en: "The number of test cases for each single module", ja: "各モジュール単体のテストケース数" },
      { vi: "Thời gian chuẩn bị môi trường & dữ liệu cho kiểm thử TÍCH HỢP giữa các module (như sandbox POS)", en: "Time to prepare the environment & data for INTEGRATION testing between modules (like a POS sandbox)", ja: "モジュール間の統合テスト用の環境・データ準備時間（POSサンドボックスなど）" },
      { vi: "Màu sắc giao diện của các module", en: "The UI color scheme of the modules", ja: "各モジュールのUIの配色" },
      { vi: "Số lượng nhân viên IT trong công ty", en: "The number of IT staff in the company", ja: "会社のIT担当者数" },
    ], correct: 1,
    explain: { vi: "Môi trường tích hợp (dữ liệu, sandbox POS, kết nối giữa FI-MM-SD) thường bị bỏ sót khi ước lượng, gây trễ tiến độ như tình huống 2 trong bài.", en: "The integration environment (data, POS sandbox, FI-MM-SD connections) is often missed in estimates, causing delays like Situation 2 in this article.", ja: "統合環境（データ、POSサンドボックス、FI-MM-SD間の接続）は見積もりで見落とされがちで、本記事のシーン2のような遅延を招きます。" },
  }),
  mcq({
    q: { vi: "Vì sao test plan cho ERP đa module cần bảng phân công theo RACI (Responsible/Accountable/Consulted/Informed) rõ ràng?", en: "Why does a multi-module ERP test plan need a clear RACI (Responsible/Accountable/Consulted/Informed) table?", ja: "モジュールの多いERPテスト計画に明確なRACI表がなぜ必要？" },
    options: [
      { vi: "Vì quy định pháp luật bắt buộc mọi tài liệu phải có RACI", en: "Because regulations legally require every document to have a RACI", ja: "法規制で全文書にRACIが義務付けられているから" },
      { vi: "Vì ERP đụng nhiều phòng ban (kế toán, kho, bán hàng, IT) — không rõ ai duyệt/ai chịu trách nhiệm dễ dẫn tới quyết định release không ai chịu trách nhiệm rõ ràng", en: "Because ERP touches many departments (finance, warehouse, sales, IT) — unclear approval/ownership easily leads to a release decision no one is clearly accountable for", ja: "ERPは経理・倉庫・営業・ITなど多部門に関わるため、承認者/責任者が不明確だとリリース判断の責任の所在が曖昧になりやすいから" },
      { vi: "Vì RACI giúp giao diện phần mềm đẹp hơn", en: "Because RACI makes the software UI look nicer", ja: "RACIによってソフトウェアのUIが美しくなるから" },
      { vi: "Vì không liên quan gì tới chất lượng kiểm thử", en: "Because it has nothing to do with test quality", ja: "テスト品質とは無関係だから" },
    ], correct: 1,
    explain: { vi: "ERP kéo theo nhiều phòng ban nghiệp vụ; RACI xác định rõ ai duyệt UAT, ai ký exit criteria, tránh tình trạng go-live không ai chịu trách nhiệm.", en: "ERP involves many business departments; RACI clarifies who approves UAT, who signs off exit criteria, preventing a go-live no one is accountable for.", ja: "ERPは多くの業務部門を巻き込みます。RACIによりUATの承認者や終了基準の署名者が明確になり、誰も責任を負わないgo-liveを防ぎます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & tài liệu bạn sẽ viết", en: "1. TL;DR & the document you'll write", ja: "1. 要点と作成する文書" },
    blocks: [
      TLDR("Kế hoạch kiểm thử (test plan) là tài liệu cụ thể hoá Chiến lược kiểm thử (test strategy) cho một dự án cụ thể: phạm vi, cách tiếp cận, tiêu chí vào/ra, môi trường, lịch trình, rủi ro và phân công. Bài này bám theo dự án triển khai ERP OneERP cho Tập đoàn bán lẻ Đại Việt — hàng trăm cửa hàng, nhiều module Tài chính/Kho/Bán hàng/POS: bạn học cách viết một test plan đủ chặt để không release khi còn lỗi hở, cùng hai tình huống thật cho thấy hậu quả khi thiếu tiêu chí rõ ràng hoặc ước lượng công sức sai môi trường tích hợp. Nhiều mockup và trắc nghiệm cuối bài.",
        "A test plan turns a Test Strategy into concrete detail for one specific project: scope, approach, entry/exit criteria, environment, schedule, risks and assignments. This article follows OneERP, an ERP rollout for Đại Việt Retail Group — hundreds of stores, multiple Finance/Warehouse/Sales/POS modules: you'll learn to write a test plan tight enough to prevent releasing with open bugs, plus two real situations showing what happens when criteria are unclear or integration-environment effort is underestimated. Lots of mockups and a quiz at the end.",
        "テスト計画（test plan）は、テスト戦略を特定の1プロジェクト向けに具体化する文書です：範囲、アプローチ、開始/終了基準、環境、スケジュール、リスク、担当割り当て。本記事は、数百店舗と財務/在庫/販売/POSの複数モジュールを持つ小売大手ダイベト・リテール・グループのERP導入プロジェクト「OneERP」に沿って進みます。バグが残ったままリリースされないほど堅牢なテスト計画の書き方と、基準が曖昧だったり統合環境の工数を過小評価したりした場合に何が起きるかを示す2つの実例を学びます。多数のモックと最後にクイズ付き。"),
      P("Ở một dự án web thông thường, 'test xong chưa' đôi khi chỉ cần vài dòng chat. Nhưng ở một dự án triển khai ERP như OneERP — nơi số liệu kế toán, tồn kho và doanh thu của cả tập đoàn phụ thuộc vào đúng một hệ thống — câu hỏi đó cần một câu trả lời có thể chứng minh được bằng tài liệu, không phải cảm tính của một cá nhân. Đó chính là vai trò của cặp tài liệu Test Strategy và Test Plan: strategy định hình 'chúng ta kiểm thử theo triết lý nào' ở mức chương trình, còn plan biến triết lý đó thành những con số, mốc thời gian và tiêu chí cụ thể cho riêng dự án OneERP.",
        "In a typical web project, 'are we done testing' can sometimes be answered in a few chat lines. But in an ERP rollout like OneERP — where an entire retail group's accounting figures, inventory and revenue depend on a single system — that question needs an answer provable by documentation, not one person's gut feeling. That's exactly the role of the Test Strategy and Test Plan pair: strategy shapes 'what testing philosophy we follow' at program level, while the plan turns that philosophy into concrete numbers, milestones and criteria for the OneERP project specifically.",
        "一般的なWebプロジェクトでは、『テストは終わったか』はチャットの数行で答えられることもあります。しかしOneERPのようなERP導入プロジェクト——グループ全体の会計数値、在庫、売上高が単一のシステムに依存する場所——では、その問いには個人の感覚ではなく文書で証明できる答えが必要です。これこそがテスト戦略とテスト計画という文書ペアの役割です：戦略はプログラムレベルで『どんな理念でテストするか』を形作り、計画はその理念をOneERPプロジェクト固有の具体的な数値、マイルストーン、基準に変換します。"),
      IMG(m_planscreen, "Màn hình test: đầu tài liệu Test Plan OneERP Release 1 — phạm vi trong/ngoài rõ ràng", "Screen under test: the header of OneERP Release 1's Test Plan — clear in/out scope", "テスト対象画面：OneERP Release 1のテスト計画冒頭 — 明確な範囲内/範囲外"),
      DEF("Test Plan", "tài liệu cụ thể hoá cách kiểm thử cho MỘT dự án: phạm vi, cách tiếp cận, tiêu chí vào/ra, môi trường, lịch trình, rủi ro, phân công.",
        "a document that turns testing approach into concrete detail for ONE project: scope, approach, entry/exit criteria, environment, schedule, risks, assignments.",
        "1つのプロジェクト向けにテスト手法を具体化した文書：範囲、アプローチ、開始/終了基準、環境、スケジュール、リスク、担当割り当て。"),
    ] },
  { heading: { vi: "2. Test Strategy vs Test Plan: phân biệt rõ ràng", en: "2. Test strategy vs test plan: telling them apart", ja: "2. テスト戦略 vs テスト計画：明確な違い" },
    blocks: [
      P("Cách dễ nhớ nhất: Test Strategy sống ở mức TỔ CHỨC hoặc CHƯƠNG TRÌNH — nó ít khi đổi, dùng chung cho nhiều dự án (ví dụ 'mọi dự án của tập đoàn Đại Việt đều phải có UAT do đại diện phòng ban ký, mọi module tài chính đều bắt buộc kiểm thử hồi quy tự động'). Test Plan sống ở mức DỰ ÁN — nó cụ thể, có ngày tháng, có tên người, và chỉ áp dụng cho chính dự án OneERP Release 1: 'UAT diễn ra tuần 6–7, do chị Lan (BA Tài chính) và anh Huy (BA Kho) ký nghiệm thu'.",
        "The easiest way to remember: Test Strategy lives at the ORGANIZATION or PROGRAM level — it rarely changes and applies across many projects (e.g. 'every Đại Việt Group project must have UAT signed off by a department representative, every finance module requires automated regression testing'). Test Plan lives at the PROJECT level — it's concrete, has dates, has names, and applies only to the OneERP Release 1 project itself: 'UAT runs weeks 6–7, signed off by Ms. Lan (Finance BA) and Mr. Huy (Warehouse BA)'.",
        "覚え方：テスト戦略は組織またはプログラムレベルに存在し——めったに変わらず、複数プロジェクトに共通して適用されます（例：『ダイベトグループの全プロジェクトは部門代表者が署名するUATを実施しなければならない、全財務モジュールは自動回帰テストが必須』）。テスト計画はプロジェクトレベルに存在し——具体的で、日付があり、名前があり、OneERP Release 1プロジェクトのみに適用されます：『UATは第6〜7週に実施し、ラン氏（財務BA）とフイ氏（倉庫BA）が承認する』。"),
      P("Một cách hình dung khác: nếu Test Strategy là 'hiến pháp kiểm thử' của cả tổ chức, thì Test Plan là 'luật thi hành' cho từng dự án cụ thể — phải tuân theo hiến pháp, nhưng có chi tiết riêng phù hợp bối cảnh của dự án đó. Nhiều đội mới thường nhầm lẫn hai tài liệu này, viết một bản duy nhất chung chung rồi dùng cho mọi dự án — hậu quả là test plan thiếu hẳn những con số cụ thể (tiêu chí vào/ra, lịch trình, người phụ trách) cần thiết để thực sự điều hành việc kiểm thử hằng ngày.",
        "Another way to picture it: if Test Strategy is the organization's 'testing constitution', Test Plan is the 'implementing law' for each specific project — it must follow the constitution, but has its own details fitting that project's context. Many new teams confuse the two, writing one generic document and reusing it for every project — the result is a test plan missing the concrete numbers (entry/exit criteria, schedule, owners) actually needed to run day-to-day testing.",
        "別の捉え方：テスト戦略が組織の『テスト憲法』だとすれば、テスト計画は各プロジェクト固有の『施行規則』です——憲法に従いつつ、そのプロジェクトの状況に合わせた独自の詳細を持ちます。多くの新しいチームはこの2つを混同し、汎用的な1つの文書を全プロジェクトで使い回しがちです——結果として、日々のテスト運営に実際必要な具体的な数値（開始/終了基準、スケジュール、担当者）を欠いたテスト計画になってしまいます。"),
      DEF("Test Strategy", "tài liệu mức tổ chức/chương trình, mô tả cách tiếp cận kiểm thử chung, ít thay đổi, dùng lại cho nhiều dự án.",
        "an organization/program-level document describing a general testing approach, rarely changing, reused across many projects.",
        "組織/プログラムレベルの文書で、一般的なテストアプローチを記述し、めったに変わらず複数プロジェクトで再利用される。"),
    ] },
  { heading: { vi: "3. Vì sao OneERP cần chiến lược & kế hoạch kiểm thử bài bản", en: "3. Why OneERP needs a rigorous test strategy & plan", ja: "3. OneERPに厳密なテスト戦略・計画が必要な理由" },
    blocks: [
      P("OneERP không phải một ứng dụng đơn lẻ — nó là trung tâm thần kinh vận hành của Tập đoàn bán lẻ Đại Việt: module Tài chính (FI) đóng sổ kế toán toàn tập đoàn, module Kho (MM) theo dõi tồn kho thật tại 240 cửa hàng, module Bán hàng (SD) xử lý đơn hàng và giá, và lớp tích hợp POS đồng bộ từng giao dịch tại quầy thu ngân về hệ thống trung tâm theo thời gian thực. Một lỗi nhỏ ở tầng tích hợp — ví dụ đồng bộ POS chậm 30 giây — có thể nhân bản thành sai lệch tồn kho ở hàng trăm cửa hàng cùng lúc.",
        "OneERP isn't a single app — it's Đại Việt Retail Group's operational nervous system: the Finance (FI) module closes the group's accounting books, the Warehouse (MM) module tracks real inventory across 240 stores, the Sales (SD) module handles orders and pricing, and the POS integration layer syncs every checkout transaction back to the central system in real time. A small integration-layer bug — say, a 30-second POS sync delay — can multiply into inventory mismatches across hundreds of stores at once.",
        "OneERPは単一のアプリではなく、ダイベト・リテール・グループの運用神経系です：財務（FI）モジュールはグループ全体の会計帳簿を締め、在庫（MM）モジュールは240店舗の実在庫を追跡し、販売（SD）モジュールは注文と価格を処理し、POS統合層は各レジでの取引をリアルタイムで中央システムに同期します。統合層の小さなバグ——例えばPOS同期が30秒遅延する——は、数百店舗で同時に在庫の食い違いへと増幅されかねません。"),
      P("Vì OneERP chạm vào TIỀN (doanh thu, chi phí, công nợ), TỒN KHO thật (không thể 'hoàn tác' hàng đã bán), và số liệu BÁO CÁO cho ban lãnh đạo/kiểm toán, một chiến lược kiểm thử rõ ràng ở mức chương trình giúp mọi dự án ERP tương lai của tập đoàn không phải 'phát minh lại bánh xe' mỗi lần; và một kế hoạch kiểm thử chi tiết cho riêng Release 1 giúp đội dự án biết chính xác khi nào một pha kiểm thử thực sự hoàn tất, thay vì bị cuốn theo áp lực deadline như tình huống ở chương 7.",
        "Because OneERP touches MONEY (revenue, cost, payables), real INVENTORY (sold goods can't be 'undone'), and REPORTING figures for leadership/audit, a clear program-level test strategy means every future ERP project at the group doesn't have to 'reinvent the wheel' each time; and a detailed test plan for Release 1 specifically lets the project team know exactly when a test phase is truly done, instead of being swept along by deadline pressure as in chapter 7's situation.",
        "OneERPは資金（売上、費用、未払金）、実在庫（販売済み商品は『取り消せない』）、経営陣/監査向けの報告数値に関わるため、明確なプログラムレベルのテスト戦略があれば、グループの将来の全ERPプロジェクトが毎回『車輪の再発明』をせずに済みます。そしてRelease 1固有の詳細なテスト計画があれば、プロジェクトチームは第7章のシーンのように納期プレッシャーに流されることなく、テストフェーズが本当に完了したタイミングを正確に把握できます。"),
      P("Nói cách khác, chiến lược và kế hoạch kiểm thử ở một dự án ERP không phải thủ tục hành chính cho có — chúng là hàng rào kiểm soát cuối cùng trước khi một con số sai chảy vào báo cáo tài chính của cả tập đoàn.",
        "In other words, test strategy and plan on an ERP project aren't paperwork for show — they're the last control gate before a wrong number flows into the entire group's financial reports.",
        "つまり、ERPプロジェクトにおけるテスト戦略と計画は形式的な事務手続きではなく、誤った数値がグループ全体の財務報告に流れ込む前の最後の統制ゲートなのです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: cấu trúc chuẩn của một Test Plan", en: "4. Prepare: the standard structure of a test plan", ja: "4. 準備：テスト計画の標準構成" },
    blocks: [
      P("Trước khi viết, bạn cần một khung sườn chuẩn để không bỏ sót mục nào. Nhiều tổ chức tham chiếu cấu trúc kiểu IEEE 829 / ISO 29119 — dưới đây là 10 mục cốt lõi, cụ thể hoá cho OneERP.",
        "Before writing, you need a standard skeleton so no section gets missed. Many organizations reference an IEEE 829 / ISO 29119-style structure — below are the 10 core sections, made concrete for OneERP.",
        "書く前に、どの項目も漏らさないための標準的な骨組みが必要です。多くの組織はIEEE 829/ISO 29119形式の構成を参照します——以下はOneERP向けに具体化した10の中核項目です。"),
      STEP(1, "Viết mục 1–3 trước: giới thiệu/mục tiêu, phạm vi trong/ngoài, và danh sách đối tượng kiểm thử cụ thể (luồng nghiệp vụ, không phải tên màn hình).", "Write sections 1–3 first: introduction/objectives, in/out scope, and the specific list of test items (business flows, not screen names).", "まずセクション1〜3を書く：目的/概要、範囲内/範囲外、そして具体的な対象一覧（画面名ではなく業務フロー）。"),
      STEP(2, "Viết mục 4–6: cách tiếp cận (tham chiếu Test Strategy của tập đoàn), tiêu chí vào/ra, môi trường & công cụ.", "Write sections 4–6: approach (referencing the group's Test Strategy), entry/exit criteria, environment & tools.", "セクション4〜6を書く：アプローチ（グループのテスト戦略を参照）、開始/終了基準、環境とツール。"),
      STEP(3, "Viết mục 7–10: lịch trình, phân công RACI, rủi ro & phương án dự phòng, sản phẩm bàn giao — rồi trình bản nháp cho Test Manager và PM cùng review.", "Write sections 7–10: schedule, RACI assignments, risks & contingencies, deliverables — then present the draft to the Test Manager and PM for joint review.", "セクション7〜10を書く：スケジュール、RACI割り当て、リスクと対応策、成果物——その後草案をテストマネージャーとPMに共同レビューしてもらう。"),
      TRY("Chọn một dự án bạn từng tham gia (dù nhỏ) và thử điền nhanh 3 mục: phạm vi trong/ngoài, 1 tiêu chí vào, 1 tiêu chí ra.", "Pick a project you've worked on (even a small one) and quickly fill in 3 sections: in/out scope, 1 entry criterion, 1 exit criterion.", "自分が関わったプロジェクト（小規模でも可）を選び、範囲内/範囲外、開始基準1つ、終了基準1つの3項目を素早く埋めてみよう。"),
      PITFALL("Copy nguyên bản test plan của dự án cũ, chỉ đổi tên dự án mà không cập nhật lại phạm vi, môi trường và tiêu chí — dẫn tới một tài liệu 'có vẻ đầy đủ' nhưng không khớp thực tế OneERP.", "Copying an old project's test plan verbatim, only changing the project name without updating scope, environment and criteria — resulting in a document that 'looks complete' but doesn't match OneERP's reality.", "以前のプロジェクトのテスト計画をそのままコピーし、プロジェクト名だけ変えて範囲・環境・基準を更新しない——『一見完璧』だが実際のOneERPと合わない文書になる。"),
      IMG(m_structure, "Bảng cấu trúc chuẩn 10 mục của một Test Plan, cụ thể hoá cho OneERP", "The standard 10-section test plan structure, made concrete for OneERP", "OneERP向けに具体化したテスト計画の標準10項目構成表"),
    ] },
  { heading: { vi: "5. Viết từng bước: Phạm vi (Scope) & Cách tiếp cận (Approach)", en: "5. Writing step by step: Scope & Approach", ja: "5. 一歩ずつ書く：範囲とアプローチ" },
    blocks: [
      P("Phạm vi và cách tiếp cận là hai mục quyết định 90% giá trị thực dụng của một test plan — vì chúng trả lời trực tiếp 'sẽ test cái gì' và 'test bằng cách nào'. Ta viết cụ thể cho OneERP Release 1.",
        "Scope and approach are the two sections that decide 90% of a test plan's practical value — because they directly answer 'what will be tested' and 'how will it be tested'. Let's write them concretely for OneERP Release 1.",
        "範囲とアプローチは、テスト計画の実用的価値の90%を決める2項目です——『何をテストするか』『どうテストするか』に直接答えるからです。OneERP Release 1向けに具体的に書いてみましょう。"),
      STEP(1, "Liệt kê module TRONG phạm vi kèm lý do nghiệp vụ: FI (đóng sổ kế toán), MM (tồn kho thật), SD (đơn hàng/giá), tích hợp POS (240 cửa hàng).", "List IN-scope modules with the business reason: FI (accounting close), MM (real inventory), SD (orders/pricing), POS integration (240 stores).", "業務上の理由とともに範囲内モジュールを列挙する：FI（会計締め）、MM（実在庫）、SD（注文/価格）、POS統合（240店舗）。"),
      STEP(2, "Liệt kê rõ những gì NGOÀI phạm vi và lý do (vd module HR-Lương dời sang Release 2 vì chưa hoàn thiện quy trình duyệt lương mới).", "Clearly list what's OUT of scope and why (e.g. HR-Payroll module deferred to Release 2 because the new payroll approval process isn't finalized).", "範囲外の項目とその理由を明記する（例：新しい給与承認プロセスが未確定のため、人事-給与モジュールはRelease 2に延期）。"),
      STEP(3, "Chọn cách tiếp cận theo RỦI RO: luồng tiền/tồn kho dùng kiểm thử end-to-end + hồi quy tự động; luồng ít rủi ro hơn (báo cáo thống kê) dùng kiểm thử thủ công có chọn lọc.", "Choose a RISK-BASED approach: money/inventory flows get end-to-end testing + automated regression; lower-risk flows (statistical reports) get selective manual testing.", "リスクベースでアプローチを選ぶ：資金/在庫フローはE2Eテスト＋自動回帰、よりリスクの低いフロー（統計レポート）は選択的な手動テスト。"),
      CODE("text", "PHAM VI & CACH TIEP CAN - OneERP Release 1\nTRONG PHAM VI:\n  - FI: dong so ke toan, doi chieu cong no NCC/khach hang\n  - MM: nhap kho, xuat kho, kiem ke ton kho 240 cua hang\n  - SD: tao don hang, ap dung gia/khuyen mai\n  - Tich hop POS: dong bo giao dich thoi gian thuc\nNGOAI PHAM VI (Release 2):\n  - HR: quy trinh duyet luong moi (chua chot nghiep vu)\nCACH TIEP CAN:\n  - Luong tien/ton kho -> E2E + hoi quy tu dong (uu tien cao)\n  - Bao cao thong ke -> kiem thu thu cong chon loc (uu tien thap)"),
      TIP("Ghi rõ NGOÀI phạm vi cũng quan trọng như ghi TRONG phạm vi — nó ngăn tranh cãi sau này kiểu 'sao module này không được test kỹ' khi thực ra nó đã được thống nhất loại trừ từ đầu.", "Writing what's OUT of scope is as important as what's IN — it prevents later arguments like 'why wasn't this module tested thoroughly' when it was actually agreed to be excluded from the start.", "範囲外を明記することは範囲内と同じくらい重要です——『なぜこのモジュールは十分にテストされなかったのか』という後の議論を防ぎます。実際には最初から除外することで合意していたのです。"),
    ] },
  { heading: { vi: "6. Tiêu chí vào/ra & tiêu chí dừng kiểm thử", en: "6. Entry/exit criteria & suspension criteria", ja: "6. 開始/終了基準とテスト中断基準" },
    blocks: [
      P("Đây là phần hay bị viết sơ sài nhất nhưng lại quan trọng nhất: nếu phạm vi trả lời 'test cái gì', thì tiêu chí vào/ra trả lời 'khi nào bắt đầu, khi nào coi là xong, và khi nào phải dừng lại'. Ba loại tiêu chí cần phân biệt rõ: Entry (điều kiện bắt đầu một giai đoạn), Exit (điều kiện kết thúc và cho phép đi tiếp), và Suspension/Resumption (điều kiện tạm dừng/tiếp tục khi có sự cố).",
        "This is the most-often-underwritten yet most important part: if scope answers 'what to test', entry/exit criteria answer 'when to start, when it's considered done, and when to stop'. Three types of criteria must be distinguished clearly: Entry (conditions to start a phase), Exit (conditions to end it and move forward), and Suspension/Resumption (conditions to pause/resume when something goes wrong).",
        "ここは最も雑に書かれがちですが最も重要な部分です：範囲が『何をテストするか』に答えるなら、開始/終了基準は『いつ始め、いつ完了とみなし、いつ止めるべきか』に答えます。3種類の基準を明確に区別する必要があります：開始基準（フェーズを始める条件）、終了基準（終えて次に進む条件）、中断/再開基準（問題発生時に止める/再開する条件）です。"),
      IMG(m_criteria, "Bảng tiêu chí Vào/Ra/Dừng test cho pha UAT OneERP — mỗi tiêu chí đều đo lường được", "Entry/exit/suspension criteria for OneERP's UAT phase — each one is measurable", "OneERPのUATフェーズにおける開始/終了/中断基準表 — いずれも測定可能"),
      P("Điểm mấu chốt là mỗi tiêu chí phải ĐO LƯỜNG ĐƯỢC bằng con số hoặc trạng thái rõ ràng ('≥95% ca đã thực thi', '0 defect Critical mở'), không phải mô tả mơ hồ như 'chất lượng đủ tốt' hay 'hầu hết các luồng đã chạy'. Tiêu chí mơ hồ luôn có thể bị diễn giải lại dưới áp lực deadline — đây chính xác là nguyên nhân gốc của sự cố ở chương 7.",
        "The key point is every criterion must be MEASURABLE with a clear number or state ('≥95% cases executed', '0 open Critical defects'), not a vague description like 'good enough quality' or 'most flows have run'. Vague criteria can always be reinterpreted under deadline pressure — that's exactly the root cause of the incident in chapter 7.",
        "重要な点は、各基準が明確な数値や状態で測定可能でなければならないということです（『実行率95%以上』『Critical不具合0件』）。『十分な品質』『ほとんどのフローが実行済み』のような曖昧な記述ではいけません。曖昧な基準は納期プレッシャーの下で常に再解釈されてしまいます——これがまさに第7章のインシデントの根本原因です。"),
      DEF("Exit Criteria", "điều kiện đo lường được để coi một giai đoạn kiểm thử là hoàn tất và cho phép chuyển tiếp/release.",
        "measurable conditions that must be met to consider a test phase complete and allow moving forward/releasing.",
        "テストフェーズが完了したとみなし、次工程やリリースを許可するための測定可能な条件。"),
    ] },
  { heading: { vi: "7. Tình huống 1: release khi chưa có tiêu chí ra rõ ràng", en: "7. Situation 1: releasing without clear exit criteria", ja: "7. シーン1：明確な終了基準なしにリリース" },
    blocks: [
      SITUATION("Test plan bản đầu của OneERP Release 1 chỉ ghi 'UAT hoàn tất khi các phòng ban đồng ý' — không có con số cụ thể nào cho tỉ lệ pass hay số defect Critical được phép còn mở.", "The first draft of OneERP Release 1's test plan only wrote 'UAT is complete when departments agree' — no concrete number for pass rate or the allowed number of open Critical defects.",
        "Tuần 7, còn 4 defect Critical liên quan đối chiếu kho-kế toán chưa xử lý xong. Vì lịch go-live đã công bố cố định, ban dự án 'đồng ý coi như đủ' và release đúng hạn. Khi đóng sổ kế toán tháng 6, hệ thống ghi nhận sai số dư tồn kho khoảng 2,4 tỷ đồng do đúng 1 trong 4 defect đó gây ra.",
        "By week 7, 4 Critical defects related to warehouse-accounting reconciliation were still unresolved. Because the go-live date had already been publicly fixed, the project board 'agreed it was good enough' and released on schedule. When closing the June accounting books, the system recorded an inventory balance off by about 2.4 billion VND — caused by exactly one of those 4 defects.",
        "OneERP Release 1の最初のテスト計画草案には『各部門が合意すればUAT完了』とだけ書かれ、合格率やCritical不具合の許容数についての具体的な数値がなかった。",
        "第7週、倉庫-会計の照合に関わるCritical不具合4件が未解決のまま残っていた。go-live日がすでに公に固定されていたため、プロジェクト委員会は『十分とみなす』と合意し、予定通りリリースした。6月の会計帳簿を締める際、その4件のうちの1件が原因で、システムは約24億ドンの在庫残高誤差を記録した。"),
      SOLVE("Bổ sung ngay Exit criteria đo lường được vào test plan (≥95% ca pass, 0 defect Critical/Blocker mở), yêu cầu CFO và Test Manager ký xác nhận đạt tiêu chí TRƯỚC khi công bố ngày go-live cố định, và tách riêng quy trình 'waiver' có chữ ký cho những trường hợp bắt buộc phải release dù còn defect (khác với việc tự ý bỏ qua).", "Immediately add measurable exit criteria to the test plan (≥95% pass, 0 open Critical/Blocker defects), require the CFO and Test Manager to sign off that criteria are met BEFORE announcing a fixed go-live date, and set up a separate signed 'waiver' process for cases that must release despite open defects (distinct from silently skipping them).", "測定可能な終了基準（合格率95%以上、Critical/Blocker不具合0件）を即座にテスト計画に追加し、確定したgo-live日を公表する前にCFOとテストマネージャーが基準達成を承認することを義務付け、不具合が残っていてもやむを得ずリリースする場合の署名付き『例外承認（waiver）』プロセスを（黙認とは別に）設ける。"),
      P("Bài học lớn nhất ở đây: tiêu chí ra mơ hồ không làm giảm rủi ro — nó chỉ trì hoãn việc rủi ro đó bộc lộ ra, thường vào đúng thời điểm tệ nhất (khi đã go-live, khi số liệu đã chảy vào báo cáo chính thức). Có tiêu chí đo lường được không đảm bảo zero bug, nhưng nó đảm bảo QUYẾT ĐỊNH release dựa trên dữ liệu khách quan mà mọi bên liên quan đã đồng thuận từ trước, thay vì bị áp lực deadline chi phối vào phút chót.",
        "The biggest lesson here: vague exit criteria don't reduce risk — they only delay when that risk surfaces, usually at the worst possible time (after go-live, once the numbers have already flowed into official reports). Measurable criteria don't guarantee zero bugs, but they guarantee the release DECISION is based on objective data all stakeholders agreed on beforehand, instead of being driven by last-minute deadline pressure.",
        "ここでの最大の教訓：曖昧な終了基準はリスクを減らしません——リスクが表面化するタイミングを遅らせるだけで、それは通常最悪のタイミング（go-live後、数値がすでに公式レポートに流れ込んだ後）です。測定可能な基準はバグゼロを保証しませんが、リリースの意思決定が、直前の納期プレッシャーではなく、全関係者が事前に合意した客観的データに基づくことを保証します。"),
      IMG(m_jira, "Ticket OE-3301: hậu quả tài chính khi go-live thiếu tiêu chí ra rõ ràng cho UAT", "Ticket OE-3301: the financial fallout of going live without clear UAT exit criteria", "チケットOE-3301：UATの明確な終了基準なしにgo-liveした結果の財務的影響"),
      RECAP(["Exit criteria mơ hồ không giảm rủi ro, chỉ trì hoãn nó bộc lộ vào lúc tệ nhất", "Mỗi tiêu chí ra phải đo lường được và có chữ ký thống nhất từ trước"],
        ["Vague exit criteria don't reduce risk, they only delay it to the worst moment", "Every exit criterion must be measurable and pre-agreed with sign-off"],
        ["曖昧な終了基準はリスクを減らさず、最悪のタイミングまで遅らせるだけ", "終了基準は全て測定可能で、事前の署名合意が必要"]),
    ] },
  { heading: { vi: "8. Môi trường kiểm thử, lịch trình & phân công nhân sự", en: "8. Test environment, schedule & staffing", ja: "8. テスト環境、スケジュール、人員配置" },
    blocks: [
      P("Với một dự án nhiều môi trường như OneERP (DEV → SIT → UAT → PROD), test plan cần nêu rõ mỗi giai đoạn diễn ra ở môi trường nào, đầu ra chính là gì, và ai phụ trách — nếu không, đội dự án dễ 'chạy song song lộn xộn' hoặc nhảy cóc sang UAT khi SIT chưa đạt exit criteria.",
        "For a multi-environment project like OneERP (DEV → SIT → UAT → PROD), the test plan must state which environment each phase runs in, its key output, and who owns it — otherwise the project team easily ends up running things in a chaotic parallel mess or skipping ahead to UAT before SIT meets its exit criteria.",
        "OneERPのような複数環境プロジェクト（DEV→SIT→UAT→PROD）では、テスト計画で各フェーズがどの環境で実施され、主な成果物は何で、誰が担当するかを明記する必要があります——そうしないと、プロジェクトチームは混乱した並行実行に陥ったり、SITが終了基準を満たす前にUATへ飛び越えたりしやすくなります。"),
      IMG(m_timeline, "Lịch trình 9 tuần các giai đoạn kiểm thử OneERP Release 1 — môi trường, đầu ra và người phụ trách theo từng pha", "9-week schedule of OneERP Release 1's test phases — environment, output and owner per phase", "OneERP Release 1のテストフェーズ9週間スケジュール — フェーズごとの環境、成果物、担当者"),
      P("Phân công nhân sự nên đi kèm bảng RACI (Responsible/Accountable/Consulted/Informed) chứ không chỉ liệt kê tên: ví dụ Test Lead là Responsible cho việc chạy ca kiểm thử, nhưng BA phòng Tài chính mới là Accountable — người ký xác nhận UAT đạt để dự án được phép chuyển tiếp. Sự phân biệt này đặc biệt quan trọng ở ERP vì quyết định go-live không chỉ là chuyện của đội kỹ thuật — nó cần chữ ký của người đại diện nghiệp vụ hiểu rõ tác động tài chính.",
        "Staffing should come with a RACI table (Responsible/Accountable/Consulted/Informed), not just a name list: for example the Test Lead is Responsible for running test cases, but the Finance BA is Accountable — the one who signs off that UAT has passed so the project can move forward. This distinction matters especially in ERP because the go-live decision isn't purely a technical team matter — it needs the signature of a business representative who understands the financial impact.",
        "人員配置は名前の一覧だけでなくRACI表（実行責任者/説明責任者/相談先/報告先）を伴うべきです：例えばテストリードはテストケース実行の実行責任者ですが、財務BAが説明責任者——UAT合格を承認し、プロジェクトが先に進むことを許可する人です。この区別はERPで特に重要です。go-liveの判断は技術チームだけの話ではなく、財務的影響を理解する業務代表者の署名が必要だからです。"),
      STEP(1, "Với mỗi giai đoạn trong lịch trình, ghi rõ Entry criteria riêng — không cho phép SIT 'gần xong' là đã nhảy sang UAT.", "For each phase in the schedule, state its own Entry criteria — never allow 'SIT is almost done' to justify jumping to UAT.", "スケジュールの各フェーズについて、それぞれの開始基準を明記する——『SITはほぼ完了』という理由でUATへ飛び越えることを許してはならない。"),
      STEP(2, "Gán RACI cho từng mốc quan trọng (bắt đầu SIT, kết thúc UAT, go-live) — mỗi mốc có đúng một người Accountable.", "Assign RACI for each key milestone (SIT start, UAT end, go-live) — each milestone has exactly one Accountable person.", "各重要マイルストーン（SIT開始、UAT終了、go-live）にRACIを割り当てる——各マイルストーンに説明責任者は必ず1人。"),
    ] },
  { heading: { vi: "9. Tình huống 2: ước lượng công sức thiếu môi trường tích hợp", en: "9. Situation 2: effort estimate missing the integration environment", ja: "9. シーン2：統合環境を見落とした工数見積もり" },
    blocks: [
      SITUATION("Khi lập test plan, đội ước lượng công sức SIT chỉ dựa trên số lượng test case của từng module riêng lẻ (FI, MM, SD) — không tính riêng thời gian chuẩn bị môi trường tích hợp POS cho 240 cửa hàng.", "When building the test plan, the team estimated SIT effort based only on each module's individual test case count (FI, MM, SD) — without separately accounting for time to prepare the POS integration environment for 240 stores.",
        "Đến tuần 4 của SIT, đội phát hiện chưa có sandbox POS nào để giả lập giao dịch từ 240 cửa hàng — nhà cung cấp POS bên ngoài cần tối thiểu 3 tuần để cấp môi trường. Toàn bộ nhóm ca kiểm thử tích hợp POS bị block, kéo lùi lịch UAT gần 2 tuần so với kế hoạch ban đầu.",
        "By SIT week 4, the team discovered there was no POS sandbox to simulate transactions from 240 stores — the external POS vendor needed at least 3 weeks to provision the environment. The entire set of POS integration test cases got blocked, pushing UAT back nearly 2 weeks from the original plan.",
        "テスト計画作成時、チームはSITの工数を各モジュール（FI、MM、SD）個別のテストケース数だけで見積もり、240店舗向けPOS統合環境の準備時間を別枠で考慮していなかった。",
        "SITの第4週、240店舗からの取引をシミュレートするPOSサンドボックスが存在しないことが判明した——外部POSベンダーが環境提供に最低3週間必要だった。POS統合テストケース群がすべてブロックされ、UATが当初計画から約2週間遅れることになった。"),
      SOLVE("Cập nhật test plan: tách riêng hạng mục 'chuẩn bị môi trường tích hợp' thành một dòng công việc có thời lượng và người phụ trách rõ ràng trong lịch trình (không gộp chung vào 'viết test case'), đặt lịch làm việc với nhà cung cấp POS ngay từ tuần 1 của dự án thay vì tuần 3 của SIT, và thêm rủi ro này vào bảng rủi ro với phương án dự phòng (dùng dữ liệu giả lập nội bộ nếu sandbox trễ).", "Update the test plan: split 'integration environment preparation' into its own work item with a clear duration and owner in the schedule (not folded into 'writing test cases'), schedule engagement with the POS vendor starting project week 1 instead of SIT week 3, and add this risk to the risk register with a contingency (use internal simulated data if the sandbox is delayed).", "テスト計画を更新する：『統合環境の準備』を明確な期間と担当者を持つ独立した作業項目としてスケジュールに分離し（『テストケース作成』に含めない）、POSベンダーとの調整をSIT第3週ではなくプロジェクト第1週から開始し、このリスクをコンティンジェンシー（サンドボックス遅延時は社内シミュレーションデータを使用）とともにリスク登録簿に追加する。"),
      P("Sai lầm gốc không phải ở việc đếm sai số lượng test case, mà ở việc coi 'chuẩn bị môi trường' như một việc nền ngầm định luôn sẵn sàng, trong khi thực tế nó phụ thuộc vào bên thứ ba ngoài tầm kiểm soát trực tiếp của đội. Với ERP tích hợp nhiều hệ thống bên ngoài (POS, cổng thanh toán, hệ thống thuế điện tử...), môi trường tích hợp luôn cần được ước lượng và lên lịch như một HẠNG MỤC CÔNG VIỆC riêng, có rủi ro riêng, không phải một điều kiện tiên quyết 'mặc định có sẵn'.",
        "The root mistake wasn't miscounting test cases — it was treating 'environment preparation' as an implicit background task that's always ready, when in reality it depends on a third party outside the team's direct control. For an ERP integrating many external systems (POS, payment gateways, e-invoicing systems...), the integration environment must always be estimated and scheduled as its own WORK ITEM with its own risk, not a 'default available' prerequisite.",
        "根本的な誤りはテストケース数を数え間違えたことではなく、『環境準備』をチームの直接統制外にある第三者に依存する現実がありながら、常に準備済みの暗黙の背景作業として扱ったことです。POS、決済ゲートウェイ、電子インボイスシステムなど多くの外部システムと統合するERPでは、統合環境は常に独自のリスクを持つ独立した作業項目として見積もり・スケジュール化されるべきであり、『デフォルトで利用可能』な前提条件として扱ってはいけません。"),
      TRY("Nghĩ một dự án tích hợp khác (cổng thanh toán, hệ thống thuế điện tử...) và liệt kê 1 rủi ro môi trường tích hợp mà bảng lịch trình dễ bỏ sót nếu chỉ ước lượng theo số lượng test case.", "Think of another integration project (payment gateway, e-invoicing system...) and list one integration-environment risk that a schedule easily misses if effort is estimated only by test case count.", "別の統合プロジェクト（決済ゲートウェイ、電子インボイスシステムなど）を考え、テストケース数だけで工数を見積もった場合にスケジュールで見落としがちな統合環境リスクを1つ挙げよう。"),
      IMG(m_kanban, "Bảng theo dõi hạng mục kiểm thử tích hợp POS bị block do thiếu môi trường — SIT tuần 4", "Board tracking POS integration test items blocked by missing environment — SIT week 4", "環境不足でブロックされたPOS統合テスト項目の追跡ボード — SIT第4週"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      IMG(m_dash, "Dashboard tiến độ kiểm thử UAT OneERP tuần 6/9 — dùng để trả lời 'còn xa Exit criteria bao nhiêu'", "OneERP UAT progress dashboard, week 6/9 — used to answer 'how far from exit criteria'", "OneERP UAT進捗ダッシュボード（第6/9週） — 『終了基準までどれだけ遠いか』に答えるために使用"),
      INTERNAL("Kiểm thử dựa trên rủi ro (Risk-Based Testing) cho tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenarios & checklists for beginners", "test-scenario-checklist-cho-nguoi-moi", "初心者のためのテストシナリオとチェックリスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách phân biệt Test Strategy (mức tổ chức) với Test Plan (mức dự án), cấu trúc chuẩn 10 mục của một test plan, cách viết phạm vi/cách tiếp cận theo rủi ro, và ba loại tiêu chí Entry/Exit/Suspension đo lường được — tất cả áp dụng cho dự án triển khai ERP OneERP của Tập đoàn bán lẻ Đại Việt. Hai tình huống thật cho thấy hậu quả cụ thể khi thiếu Exit criteria rõ ràng (go-live gây sai số dư kế toán 2,4 tỷ đồng) và khi ước lượng công sức bỏ sót môi trường tích hợp (UAT trễ gần 2 tuần). Đây là kỹ năng lập kế hoạch ở mức chuyên nghiệp, vượt xa việc chỉ viết test case.",
        "You just learned to tell Test Strategy (org-level) apart from Test Plan (project-level), the standard 10-section test plan structure, how to write risk-based scope/approach, and three types of measurable Entry/Exit/Suspension criteria — all applied to OneERP, Đại Việt Retail Group's ERP rollout. Two real situations showed the concrete fallout of missing clear exit criteria (a go-live causing a 2.4-billion-VND accounting mismatch) and of an effort estimate missing the integration environment (UAT delayed nearly 2 weeks). This is professional-level planning skill, far beyond just writing test cases.",
        "組織レベルのテスト戦略とプロジェクトレベルのテスト計画の区別、テスト計画の標準10項目構成、リスクベースの範囲/アプローチの書き方、そして測定可能な3種類の開始/終了/中断基準を、ダイベト・リテール・グループのERP導入プロジェクトOneERPに適用して学びました。2つの実例は、明確な終了基準がないこと（24億ドンの会計残高誤差を招いたgo-live）と、統合環境を見落とした工数見積もり（UATが約2週間遅延）の具体的な結末を示しました。これはテストケース作成をはるかに超える、プロフェッショナルレベルの計画スキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thêm kiểm thử dựa trên rủi ro để phân bổ công sức test hợp lý hơn trong chính test plan của mình, cùng cách viết báo cáo kết quả kiểm thử trình bày rõ mức đạt Exit criteria cho ban lãnh đạo. Nếu muốn luyện lập test plan cho dự án doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận vai trò Test Lead.",
        "Next, you should practice risk-based testing to allocate test effort more sensibly within your own test plans, along with writing a test result report that clearly presents exit-criteria attainment for leadership. If you want to practice building test plans for real enterprise projects with a mentor, a structured Tester course helps you progress fast and confidently take on a Test Lead role.",
        "次は、自分のテスト計画内でより合理的にテスト工数を配分するためのリスクベーステストや、経営陣に終了基準の達成状況を明確に示すテスト結果報告書の書き方を練習しましょう。指導者付きで実際の企業プロジェクト向けテスト計画作成を練習したいなら、体系的なテスターコースが速い成長とテストリード役への自信を助けます。"),
      CTA(course),
    ] },
];

const DOC = makeDoc({
  slug: "chien-luoc-va-ke-hoach-kiem-thu-test-plan-cho-tester",
  domain: "erp",
  primaryKeyword: "kế hoạch kiểm thử",
  keywords: ["kế hoạch kiểm thử", "test plan", "chiến lược kiểm thử", "test strategy", "tiêu chí vào ra kiểm thử ERP"],
  coverLabel: "NÂNG CAO · TEST PLAN · ERP",
  crumb: "Chiến lược kiểm thử & Kế hoạch kiểm thử (Test Strategy & Test Plan)",
  metaTitle: { vi: "Kế hoạch kiểm thử (Test Plan) cho dự án ERP", en: "Test plan for ERP projects: strategy vs plan", ja: "ERPプロジェクト向けテスト計画" },
  metaDescription: {
    vi: "Kế hoạch kiểm thử cho tester: phân biệt test strategy và test plan, cấu trúc 10 mục, tiêu chí vào/ra/dừng test, ước lượng công sức, ví dụ thật dự án ERP bán lẻ.",
    en: "Test plan for testers: telling test strategy and test plan apart, the 10-section structure, entry/exit/suspension criteria, effort estimation, real examples from a retail ERP project.",
    ja: "テスター向けテスト計画：テスト戦略とテスト計画の違い、10項目構成、開始/終了/中断基準、工数見積もり、小売ERPプロジェクトの実例を解説。",
  },
  title: {
    vi: "Chiến lược kiểm thử & Kế hoạch kiểm thử (Test Strategy & Test Plan) cho dự án ERP doanh nghiệp: cấu trúc, tiêu chí vào/ra, ước lượng công sức (có trắc nghiệm)",
    en: "Test strategy & test plan for an enterprise ERP project: structure, entry/exit criteria, effort estimation (with quiz)",
    ja: "企業ERPプロジェクト向けテスト戦略とテスト計画：構成、開始/終了基準、工数見積もり（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: phân biệt Chiến lược kiểm thử (Test Strategy) và Kế hoạch kiểm thử (Test Plan), áp dụng cho dự án triển khai ERP OneERP của Tập đoàn bán lẻ Đại Việt. Cấu trúc chuẩn 10 mục của test plan, cách viết phạm vi/cách tiếp cận, tiêu chí vào/ra/dừng test đo lường được, ước lượng công sức có tính môi trường tích hợp, hai tình huống thật (release thiếu tiêu chí ra gây sai số dư kế toán; ước lượng thiếu môi trường tích hợp POS gây trễ tiến độ), nhiều mockup giao diện thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: distinguishing Test Strategy from Test Plan, applied to OneERP, Đại Việt Retail Group's ERP rollout. The test plan's standard 10-section structure, how to write scope/approach, measurable entry/exit/suspension criteria, effort estimation accounting for the integration environment, two real situations (releasing without exit criteria causing an accounting mismatch; underestimating POS integration environment effort causing delays), real UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：テスト戦略とテスト計画の違いを、ダイベト・リテール・グループのERP導入プロジェクト「OneERP」に適用して解説。テスト計画の標準10項目構成、範囲/アプローチの書き方、測定可能な開始/終了/中断基準、統合環境を考慮した工数見積もり、2つの実例（終了基準なしのリリースによる会計誤差、POS統合環境の過小見積もりによる遅延）、実物のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết kế hoạch kiểm thử cho dự án ERP", steps: [
    { name: "Xác định phạm vi trong/ngoài & cách tiếp cận theo rủi ro", text: "Liệt kê module trong/ngoài phạm vi, ưu tiên kỹ thuật kỹ hơn cho luồng tiền/tồn kho." },
    { name: "Viết tiêu chí Vào/Ra/Dừng đo lường được", text: "Mỗi tiêu chí phải có con số hoặc trạng thái rõ ràng, không mô tả mơ hồ." },
    { name: "Lập lịch trình, phân công RACI & ước lượng công sức có môi trường tích hợp", text: "Tách riêng hạng mục chuẩn bị môi trường tích hợp, không gộp vào viết test case." },
  ] },
  pages,
});

export const MA_STRATEGY_01 = [DOC];
