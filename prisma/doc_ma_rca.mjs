// doc_ma_rca.mjs — BÀI MANUAL NÂNG CAO: Phân tích nguyên nhân gốc (Root Cause Analysis - RCA)
// cho Tester, gắn dự án VIỄN THÔNG tính cước (nhà mạng VinaMobile · hệ thống TeleBill).
// Kỹ thuật 5 Whys, biểu đồ xương cá (Ishikawa/fishbone) phân loại nguyên nhân theo 5 nhóm
// (yêu cầu/thiết kế/code/dữ liệu/môi trường), rút hành động phòng ngừa + bổ sung ca kiểm thử,
// gắn RCA vào quy trình defect lifecycle. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, annotate, grid, jira, kanban, stateDiagram, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, phân tích nguyên nhân gốc, công cụ & dự án thực chiến.",
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

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 1 — Màn hình giám sát cước phát hiện sự cố (browser)
// ══════════════════════════════════════════════════════════════════════════════════════
const m_screen = browser("telebill.vinamobile.vn/giam-sat/thue-bao/084xxxxxxx", [
  field(24, 20, 330, "Mã thuê bao", "084xxxxxxx", "normal"),
  field(372, 20, 330, "Kỳ cước", "01/07 – 31/07/2026", "normal"),
  field(24, 92, 330, "Gói cước áp dụng", "MobiMAX → MobiPRO (đổi 21/07)", "normal"),
  field(372, 92, 330, "Cước hệ thống tính", "1.842.000 đ", "error"),
  annotate(368, 86, 338, 72, "SAI: cộng trùng 10 ngày cuối MobiMAX"),
  `<text x="24" y="204" font-size="12" fill="#475569">Cước đúng theo hợp đồng: 1.096.000 đ (chênh lệch +746.000 đ)</text>`,
  `<text x="24" y="224" font-size="11" fill="#94a3b8">Số ca tương tự trong kỳ: ~4.200 thuê bao đổi gói giữa kỳ</text>`,
].join(""), { h: 250, title: "TeleBill · Giám sát cước", accent: "#a21caf" });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 2 — Bảng 5 Whys truy vết nguyên nhân gốc
// ══════════════════════════════════════════════════════════════════════════════════════
const m_5whys = grid("5 Whys — truy vết nguyên nhân gốc sự cố tính cước sai", ["Bước", "Câu hỏi tại sao (Why)", "Câu trả lời"], [
  ["Why 1", "Vì sao khách bị tính cước dư 746.000đ?", "Hệ thống cộng cước MobiMAX cho cả 10 ngày cuối, dù thuê bao đã chuyển sang MobiPRO từ 21/07"],
  ["Why 2", "Vì sao hệ thống cộng trùng 10 ngày cuối?", "Job tính cước cuối kỳ không cắt đúng ngày hiệu lực khi có đổi gói giữa kỳ"],
  ["Why 3", "Vì sao job không cắt đúng ngày hiệu lực?", "Hàm tính số ngày dùng công thức làm tròn lên (ceil) thay vì tính theo ngày hiệu lực thực tế"],
  ["Why 4", "Vì sao code dùng công thức làm tròn sai?", "Tài liệu đặc tả không mô tả cách tính ngày khi đổi gói giữa kỳ, lập trình viên tự suy đoán"],
  ["Why 5 (gốc)", "Vì sao đặc tả thiếu case đổi gói giữa kỳ?", "Bộ yêu cầu & ca kiểm thử ban đầu chỉ phủ đổi gói ĐẦU kỳ, thiếu ca biên CUỐI kỳ — nguyên nhân gốc"],
], { accent: "#a21caf", note: "Why thứ 5 chạm tới NGUYÊN NHÂN GỐC — thiếu ca kiểm thử biên, không phải chỉ lỗi code bề mặt." });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 3 — Biểu đồ xương cá (Ishikawa/fishbone) phân loại nguyên nhân theo 5 nhóm
// ══════════════════════════════════════════════════════════════════════════════════════
const m_fishbone = moduleFlow("Biểu đồ xương cá (Ishikawa) — 5 nhóm nguyên nhân dẫn tới cước tính sai", [
  { id: "req", label: "Yêu cầu", sub: "thiếu đặc tả đổi gói giữa kỳ", x: 100, y: 70 },
  { id: "design", label: "Thiết kế", sub: "use case thiếu nhánh biên cuối kỳ", x: 100, y: 140 },
  { id: "code", label: "Code", sub: "công thức tính ngày làm tròn sai", x: 100, y: 210 },
  { id: "data", label: "Dữ liệu", sub: "bảng giá cache chưa refresh", x: 100, y: 280 },
  { id: "env", label: "Môi trường", sub: "batch tính cước lệch múi giờ", x: 100, y: 350 },
  { id: "effect", label: "Cước tính sai giữa kỳ", sub: "~4.200 thuê bao ảnh hưởng", x: 650, y: 210 },
], [
  { from: "req", to: "effect", label: "nhóm Yêu cầu" },
  { from: "design", to: "effect", label: "nhóm Thiết kế" },
  { from: "code", to: "effect", label: "nhóm Code" },
  { from: "data", to: "effect", label: "nhóm Dữ liệu" },
  { from: "env", to: "effect", label: "nhóm Môi trường" },
], { accent: "#a21caf", h: 420 });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 4 — Quy trình defect lifecycle với "cổng" RCA
// ══════════════════════════════════════════════════════════════════════════════════════
const m_lifecycle = stateDiagram("RCA gắn vào quy trình xử lý defect (TeleBill)", [
  { id: "new", label: "New", x: 70, y: 90, kind: "start" },
  { id: "confirmed", label: "Confirmed", x: 230, y: 90, kind: "mid" },
  { id: "symptom", label: "Fix triệu chứng", x: 230, y: 230, kind: "mid" },
  { id: "rca", label: "RCA (5 Whys)", x: 410, y: 90, kind: "mid" },
  { id: "rootfix", label: "Fix gốc rễ", x: 580, y: 40, kind: "ok" },
  { id: "prevent", label: "Ca test + phòng ngừa", x: 730, y: 90, kind: "ok" },
  { id: "reopen", label: "Reopened", x: 410, y: 230, kind: "bad" },
], [
  { from: "new", to: "confirmed", label: "xác nhận lỗi" },
  { from: "confirmed", to: "rca", label: "Critical/tái diễn → RCA" },
  { from: "confirmed", to: "symptom", label: "hotfix tạm (bù tiền)" },
  { from: "symptom", to: "reopen", label: "không RCA → tái diễn", bad: true },
  { from: "rca", to: "rootfix", label: "xác định gốc rễ" },
  { from: "rootfix", to: "prevent", label: "thêm ca test + phòng ngừa" },
], { accent: "#a21caf", h: 300 });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 5 — Ticket Jira của sự cố kèm ghi nhận RCA
// ══════════════════════════════════════════════════════════════════════════════════════
const m_jira = jira({
  key: "TB-5521", title: "Thuê bao đổi gói giữa kỳ (MobiMAX → MobiPRO) bị tính trùng cước 10 ngày cuối",
  type: "Bug", status: "RCA in progress", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "production · TeleBill Billing Engine v4.2 · kỳ cước 07/2026"],
    ["Các bước", "1) Thuê bao đổi gói ngày 21/07 2) Job tính cước chạy cuối kỳ (31/07) 3) Xem hoá đơn"],
    ["Kết quả mong đợi", "Cước MobiMAX tính đến hết 20/07, MobiPRO tính từ 21/07, không trùng ngày"],
    ["Kết quả thực tế", "Cước MobiMAX vẫn tính đủ tháng, cộng thêm MobiPRO 10 ngày cuối → dư 746.000đ"],
    ["RCA (5 Whys)", "Nguyên nhân gốc: thiếu ca kiểm thử biên đổi gói CUỐI kỳ + đặc tả chưa mô tả công thức ngày hiệu lực"],
    ["Thuê bao ảnh hưởng", "~4.200 thuê bao trong kỳ 07/2026 (ước tính theo pattern đổi gói giữa kỳ)"],
  ],
});

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 6 — Bảng phân loại nguyên nhân + hành động phòng ngừa
// ══════════════════════════════════════════════════════════════════════════════════════
const m_causeAction = grid("Phân loại nguyên nhân (5 nhóm Ishikawa) & hành động phòng ngừa", ["Nhóm nguyên nhân", "Ví dụ trong sự cố cước sai", "Hành động phòng ngừa"], [
  ["Yêu cầu (Requirement)", "Đặc tả đổi gói giữa kỳ không mô tả cách tính ngày hiệu lực", "Checklist đặc tả: mọi luồng 'thay đổi giữa kỳ' phải có công thức tính ngày rõ ràng"],
  ["Thiết kế (Design)", "Use case chỉ vẽ luồng đổi gói ĐẦU kỳ, thiếu nhánh CUỐI kỳ", "Rà soát use case theo nguyên tắc biên: đầu kỳ – giữa kỳ – cuối kỳ"],
  ["Code", "Hàm tính ngày dùng ceil() thay vì tính theo ngày hiệu lực thực tế", "Code review bắt buộc rà công thức ngày/giờ trong logic tính cước"],
  ["Dữ liệu (Data)", "Bảng giá cache chưa refresh khi gói mới có hiệu lực", "Cảnh báo tự động khi cache bảng giá quá hạn N giờ chưa refresh"],
  ["Môi trường (Environment)", "Batch tính cước cuối kỳ chạy lệch múi giờ giữa các server", "Đồng bộ NTP + kiểm tra timezone trong pipeline CI trước khi release"],
], { accent: "#a21caf", note: "Mỗi nguyên nhân gốc nên có ÍT NHẤT 1 hành động phòng ngừa cụ thể, đo lường được." });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 7 — Dashboard xu hướng nguyên nhân gốc theo quý
// ══════════════════════════════════════════════════════════════════════════════════════
const m_dashTrend = dashboard("Xu hướng nguyên nhân gốc các sự cố cước — theo quý (TeleBill)", [
  { label: "Tổng RCA thực hiện", value: "34", sub: "quý này", color: "#a21caf" },
  { label: "Nguyên nhân Yêu cầu/Thiết kế", value: "41%", sub: "thiếu ca biên/đặc tả", color: "#7c3aed" },
  { label: "Nguyên nhân Code/Dữ liệu", value: "38%", sub: "lỗi làm tròn, cache cũ", color: "#e11d48" },
  { label: "Tái diễn do chỉ sửa triệu chứng", value: "3", sub: "giảm từ 9 (quý trước)", color: "#16a34a" },
]);

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 8 — Kanban hành động phòng ngừa sau RCA
// ══════════════════════════════════════════════════════════════════════════════════════
const m_kanban = kanban("Hành động phòng ngừa sau RCA (TeleBill · Q3/2026)", [
  { name: "Đề xuất", cards: [
    { key: "TB-PA-01", title: "Thêm ca kiểm thử biên đổi gói cuối kỳ", sev: "High" },
  ] },
  { name: "Đang làm", cards: [
    { key: "TB-PA-02", title: "Review công thức tính ngày hiệu lực trong code", sev: "Critical" },
  ] },
  { name: "Đã áp dụng", cards: [
    { key: "TB-PA-03", title: "Bổ sung checklist đặc tả cho luồng đổi gói giữa kỳ", sev: "Medium" },
  ] },
  { name: "Đã xác nhận hiệu quả", cards: [
    { key: "TB-PA-04", title: "0 sự cố tái diễn sau 2 kỳ cước liên tiếp", sev: "Low" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Phân tích nguyên nhân gốc (RCA) là gì và khác gì so với việc chỉ sửa lỗi thông thường?",
  "What is Root Cause Analysis (RCA), and how does it differ from a regular bug fix?",
  "Phân tích nguyên nhân gốc (RCA) là quá trình truy ngược từ triệu chứng của một sự cố (ví dụ khách bị tính cước sai) tới NGUYÊN NHÂN THỰC SỰ khiến nó xảy ra — có thể nằm ở yêu cầu, thiết kế, code, dữ liệu hoặc môi trường. Sửa lỗi thông thường chỉ dừng ở việc vá triệu chứng đang nhìn thấy (ví dụ bù tiền cho khách, sửa một dòng code); RCA đi xa hơn để tìm ra vì sao lỗi lọt qua toàn bộ quy trình, từ đó ngăn nó tái diễn ở nơi khác.",
  "Root Cause Analysis (RCA) is the process of tracing back from an incident's symptom (e.g. a customer being overcharged) to the ACTUAL cause behind it — which may sit in requirements, design, code, data, or environment. A regular fix only patches the visible symptom (e.g. refunding the customer, changing one line of code); RCA goes further to find why the defect slipped through the whole process, so it doesn't recur elsewhere.",
  "根本原因分析（RCA）とは何で、通常のバグ修正とどう違うのか？",
  "根本原因分析（RCA）とは、インシデントの症状（例：顧客への過剰請求）から、それを引き起こした本当の原因——要件・設計・コード・データ・環境のいずれかにある——まで遡って追跡するプロセスです。通常の修正は目に見える症状にパッチを当てるだけ（顧客への返金、コード1行の修正など）ですが、RCAはさらに踏み込み、なぜ欠陥がプロセス全体をすり抜けたのかを突き止め、他の箇所での再発を防ぎます。");
const faq2 = FAQ(
  "Kỹ thuật 5 Whys có phải lúc nào cũng phải hỏi đúng 5 lần 'tại sao' không?",
  "With the 5 Whys technique, do you always have to ask 'why' exactly five times?",
  "Không bắt buộc. Con số '5' chỉ là kinh nghiệm cho thấy hầu hết sự cố chạm tới nguyên nhân gốc sau khoảng 4–6 lần hỏi 'tại sao'. Bạn dừng lại khi câu trả lời chuyển từ mô tả HIỆN TƯỢNG (hệ thống cộng trùng ngày) sang một NGUYÊN NHÂN CÓ THỂ HÀNH ĐỘNG được (thiếu ca kiểm thử biên, đặc tả chưa mô tả công thức) — nếu dừng sớm hơn, bạn dễ chỉ sửa triệu chứng; nếu hỏi quá xa, câu trả lời có thể lạc sang những yếu tố ngoài tầm kiểm soát của dự án.",
  "Not necessarily. The number '5' is just an empirical rule of thumb — most incidents reach their root cause after roughly 4–6 rounds of 'why'. You stop when the answer shifts from describing the SYMPTOM (the system double-counts days) to an ACTIONABLE CAUSE (a missing boundary test case, a spec that never described the formula) — stopping too early risks only fixing the symptom, while going too far can wander into factors outside the project's control.",
  "5 Whys技法では、必ずちょうど5回『なぜ』を問わなければならないのか？",
  "そうとは限りません。『5』は経験則に過ぎず、ほとんどのインシデントは約4〜6回の『なぜ』で根本原因に到達します。回答が現象の説明（システムが日数を重複計算する）から、対応可能な原因（境界テストケースの欠如、計算式が書かれていない仕様）に変わった時点で止めます——早く止めすぎると症状だけの修正になりがちで、深追いしすぎるとプロジェクトの制御外の要因に逸れることがあります。");
const faq3 = FAQ(
  "Làm sao biết một defect có cần làm RCA đầy đủ hay chỉ cần sửa nhanh?",
  "How do you decide whether a defect needs a full RCA or just a quick fix?",
  "Nên làm RCA đầy đủ khi defect thuộc một trong các trường hợp: mức độ Critical/High ảnh hưởng tiền bạc hoặc dữ liệu khách hàng (như sự cố tính cước), đã TÁI DIỄN từ trước, ảnh hưởng số lượng lớn người dùng, hoặc liên quan tuân thủ pháp lý. Với lỗi nhỏ, cục bộ, ảnh hưởng thấp, một bản sửa nhanh kèm ghi chú ngắn gọn về nguyên nhân là đủ — không nhất thiết phải chạy đầy đủ 5 Whys và biểu đồ xương cá cho mọi ticket.",
  "A full RCA is warranted when a defect falls into one of these: Critical/High severity affecting money or customer data (like a billing incident), it has RECURRED before, it affects a large number of users, or it involves legal/compliance concerns. For small, localized, low-impact bugs, a quick fix with a brief cause note is enough — you don't need to run a full 5 Whys and fishbone diagram for every single ticket.",
  "完全なRCAが必要か、簡単な修正で済むかはどう判断する？",
  "以下のいずれかに該当する場合は完全なRCAを行うべきです：金銭や顧客データに影響するCritical/High（請求インシデントなど）、過去に再発した、多数のユーザーに影響する、または法令順守に関わる。小規模で局所的、影響の低いバグなら、原因を簡潔に記した迅速な修正で十分です——すべてのチケットに完全な5WhysとFishboneダイアグラムを行う必要はありません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích chính của RCA (Root Cause Analysis) là gì?", en: "What is the main purpose of RCA (Root Cause Analysis)?", ja: "RCA（根本原因分析）の主な目的は何？" },
    options: [
      { vi: "Tìm và xử lý nguyên nhân THỰC SỰ gây ra sự cố, không chỉ vá triệu chứng bề mặt", en: "Find and address the ACTUAL cause of an incident, not just patch the surface symptom", ja: "表面的な症状のパッチではなく、インシデントの本当の原因を見つけて対処すること" },
      { vi: "Sửa lỗi càng nhanh càng tốt bất kể nguyên nhân", en: "Fix the bug as fast as possible regardless of cause", ja: "原因に関係なくできるだけ早くバグを直すこと" },
      { vi: "Đổ lỗi cho lập trình viên viết ra bug", en: "Blame the developer who wrote the bug", ja: "バグを書いた開発者を非難すること" },
      { vi: "Viết báo cáo test dài hơn", en: "Write a longer test report", ja: "テストレポートを長く書くこと" },
    ], correct: 0,
    explain: { vi: "RCA truy ngược từ triệu chứng tới nguyên nhân gốc để ngăn lỗi tái diễn, không chỉ vá tạm thời.", en: "RCA traces back from symptom to root cause to prevent recurrence, not just a temporary patch.", ja: "RCAは症状から根本原因まで遡り、一時的なパッチではなく再発防止を目指します。" },
  }),
  mcq({
    q: { vi: "Kỹ thuật 5 Whys hoạt động như thế nào?", en: "How does the 5 Whys technique work?", ja: "5 Whys技法はどのように機能する？" },
    options: [
      { vi: "Hỏi liên tiếp 'tại sao' cho tới khi chạm tới nguyên nhân có thể hành động được", en: "Ask 'why' repeatedly until reaching an actionable cause", ja: "対応可能な原因に到達するまで『なぜ』を繰り返し問う" },
      { vi: "Chỉ hỏi 1 câu 'tại sao' duy nhất rồi kết luận ngay", en: "Ask only one 'why' and conclude immediately", ja: "『なぜ』を1回だけ聞いてすぐ結論を出す" },
      { vi: "Vẽ biểu đồ Gantt cho tiến độ sửa lỗi", en: "Draw a Gantt chart for the bug-fix schedule", ja: "バグ修正スケジュールのガントチャートを描く" },
      { vi: "Chạy lại toàn bộ test tự động 5 lần", en: "Rerun the whole automated suite 5 times", ja: "自動テストスイートを5回再実行する" },
    ], correct: 0,
    explain: { vi: "5 Whys là chuỗi câu hỏi 'tại sao' nối tiếp nhau, mỗi câu trả lời trở thành câu hỏi kế tiếp cho tới khi chạm nguyên nhân gốc.", en: "5 Whys is a chain of successive 'why' questions, each answer becoming the next question until you reach the root cause.", ja: "5 Whysは連続する『なぜ』の連鎖で、各回答が次の質問になり根本原因に到達するまで続けます。" },
  }),
  mcq({
    q: { vi: "Biểu đồ xương cá (Ishikawa/fishbone) dùng để làm gì trong RCA?", en: "What is the fishbone (Ishikawa) diagram used for in RCA?", ja: "RCAにおけるFishbone（石川）ダイアグラムの用途は？" },
    options: [
      { vi: "Ước lượng thời gian hoàn thành dự án", en: "Estimate project completion time", ja: "プロジェクト完了時期を見積もる" },
      { vi: "Phân loại nguyên nhân có thể theo các nhóm (yêu cầu, thiết kế, code, dữ liệu, môi trường) để không bỏ sót góc nhìn", en: "Categorize possible causes into groups (requirement, design, code, data, environment) so no angle is missed", ja: "考えられる原因を要件・設計・コード・データ・環境などのグループに分類し、視点の見落としを防ぐ" },
      { vi: "Tính điểm hiệu năng ứng dụng", en: "Compute the app's performance score", ja: "アプリのパフォーマンススコアを計算する" },
      { vi: "Vẽ sơ đồ mạng máy chủ", en: "Draw a server network diagram", ja: "サーバーのネットワーク図を描く" },
    ], correct: 1,
    explain: { vi: "Biểu đồ xương cá gom nguyên nhân nghi ngờ theo từng nhóm quanh một 'sự cố' (effect), giúp rà soát có hệ thống thay vì đoán mò.", en: "The fishbone diagram groups suspected causes by category around an 'effect', enabling systematic review instead of guessing.", ja: "Fishboneダイアグラムは『結果』を囲む形で疑わしい原因をカテゴリ別にまとめ、当て推量でなく体系的な検証を可能にします。" },
  }),
  mcq({
    q: { vi: "Trong sự cố tính cước sai của TeleBill, nguyên nhân GỐC (theo 5 Whys) thuộc nhóm nào?", en: "In the TeleBill billing incident, the ROOT cause (per the 5 Whys) belongs to which group?", ja: "TeleBillの請求インシデントで、5 Whysによる根本原因はどのグループに属す？" },
    options: [
      { vi: "Môi trường — do máy chủ quá tải", en: "Environment — the server was overloaded", ja: "環境 — サーバーの過負荷" },
      { vi: "Yêu cầu/Thiết kế — thiếu đặc tả và ca kiểm thử biên đổi gói cuối kỳ", en: "Requirement/Design — missing spec and boundary test case for a mid/end-cycle plan change", ja: "要件/設計 — 期末のプラン変更に関する仕様と境界テストケースの欠如" },
      { vi: "Chỉ là lỗi ngẫu nhiên, không có nguyên nhân xác định", en: "Just a random glitch with no identifiable cause", ja: "特定不能なランダムな不具合に過ぎない" },
      { vi: "Do khách hàng nhập sai thông tin", en: "The customer entered wrong information", ja: "顧客の入力ミス" },
    ], correct: 1,
    explain: { vi: "Why thứ 5 chỉ ra: bộ yêu cầu/ca kiểm thử ban đầu chỉ phủ đổi gói ĐẦU kỳ, thiếu ca biên CUỐI kỳ — đây là gốc rễ khiến code viết sai công thức.", en: "The 5th why shows: the original requirements/test cases only covered start-of-cycle plan changes, missing the end-of-cycle boundary case — the root cause behind the wrong code formula.", ja: "5番目のWhyが示す通り、当初の要件/テストケースは期初のプラン変更しかカバーせず、期末の境界ケースが欠けていた — これがコードの計算式誤りの根本原因です。" },
  }),
  mcq({
    q: { vi: "Sau khi hoàn thành RCA, hành động quan trọng nhất tester cần làm là gì?", en: "After completing an RCA, what's the most important action a tester should take?", ja: "RCA完了後、テスターが取るべき最も重要な行動は？" },
    options: [
      { vi: "Đóng ticket ngay vì đã tìm ra nguyên nhân", en: "Close the ticket immediately since the cause is found", ja: "原因が分かったのですぐチケットをクローズする" },
      { vi: "Bổ sung ca kiểm thử hồi quy cho đúng nguyên nhân gốc + đề xuất hành động phòng ngừa, theo dõi tới khi xác nhận hiệu quả", en: "Add a regression test case targeting the root cause + propose preventive actions, and track until effectiveness is confirmed", ja: "根本原因に対応する回帰テストケースを追加し、予防措置を提案して効果確認まで追跡する" },
      { vi: "Chỉ thông báo miệng cho lập trình viên rồi thôi", en: "Just verbally tell the developer and move on", ja: "口頭で開発者に伝えるだけで終わる" },
      { vi: "Xoá log liên quan để dọn dẹp hệ thống", en: "Delete the related logs to clean up the system", ja: "関連ログを削除してシステムを整理する" },
    ], correct: 1,
    explain: { vi: "RCA chỉ có giá trị khi biến thành hành động cụ thể: ca kiểm thử mới ngăn tái diễn + hành động phòng ngừa được theo dõi tới khi xác nhận hiệu quả.", en: "RCA only has value once turned into concrete action: a new test case preventing recurrence + preventive actions tracked until confirmed effective.", ja: "RCAは具体的な行動——再発防止テストケースの追加と効果確認まで追跡する予防措置——に変換されて初めて価値を持ちます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ phân tích", en: "1. TL;DR & the screen you'll analyze", ja: "1. 要点と分析する画面" },
    blocks: [
      TLDR("Phân tích nguyên nhân gốc (Root Cause Analysis - RCA) là kỹ năng truy ngược từ triệu chứng của một sự cố tới nguyên nhân THỰC SỰ khiến nó xảy ra, thay vì chỉ vá phần nổi. Bài này bám sự cố tính cước sai của nhà mạng VinaMobile trên hệ thống TeleBill: bạn học kỹ thuật 5 Whys, biểu đồ xương cá (Ishikawa) phân loại nguyên nhân theo 5 nhóm (yêu cầu/thiết kế/code/dữ liệu/môi trường), cách rút hành động phòng ngừa và bổ sung ca kiểm thử, cùng cách gắn RCA vào quy trình xử lý defect. Nhiều mockup thực tế và trắc nghiệm cuối bài.",
        "Root Cause Analysis (RCA) is the skill of tracing back from an incident's symptom to the ACTUAL cause behind it, instead of only patching the visible surface. This article follows a billing incident at telecom operator VinaMobile's TeleBill system: you learn the 5 Whys technique, the Ishikawa fishbone diagram to categorize causes into 5 groups (requirement/design/code/data/environment), how to derive preventive actions and add test cases, and how to embed RCA into the defect workflow. Many real mockups and a quiz at the end.",
        "根本原因分析（RCA）とは、インシデントの症状から見える部分だけをパッチするのではなく、それを引き起こした本当の原因まで遡って追跡するスキルです。本記事は通信事業者VinaMobileのTeleBillシステムで発生した請求インシデントに沿い、5 Whys技法、原因を5グループ（要件・設計・コード・データ・環境）に分類するIshikawa（フィッシュボーン）ダイアグラム、予防措置とテストケース追加の導き方、そしてRCAを不具合対応プロセスに組み込む方法を学びます。実践的なモックとクイズ付き。"),
      P("Chào bạn! Khi một sự cố nghiêm trọng xảy ra — như khách hàng bị tính cước sai — phản xạ đầu tiên thường là 'sửa cho nhanh': bù tiền lại cho khách, vá một dòng code, đóng ticket. Nhưng nếu chỉ dừng ở đó, rất có thể tháng sau một khách hàng khác lại gặp đúng lỗi tương tự. Phân tích nguyên nhân gốc (RCA) là kỹ năng nâng cao giúp bạn — với vai trò tester — không chỉ tìm ra 'lỗi nằm ở đâu' mà còn trả lời được 'vì sao lỗi này lọt qua được toàn bộ quy trình', từ đó ngăn nó xảy ra lần nữa ở bất kỳ đâu trong hệ thống.",
        "Hi! When a serious incident happens — like a customer being overcharged — the first instinct is usually to 'fix it fast': refund the customer, patch one line of code, close the ticket. But if you stop there, another customer will likely hit the exact same bug next month. Root Cause Analysis (RCA) is an advanced skill that lets you — as a tester — not only find 'where the bug is' but also answer 'why this defect slipped through the entire process', preventing it from happening again anywhere in the system.",
        "こんにちは！深刻なインシデント——顧客への過剰請求など——が起きると、最初の反応は通常『とにかく早く直す』ことです：顧客への返金、コード1行のパッチ、チケットのクローズ。しかしそこで止まると、翌月には別の顧客が全く同じバグに遭遇する可能性が高いのです。根本原因分析（RCA）は、テスターとして『バグがどこにあるか』だけでなく『なぜこの欠陥がプロセス全体をすり抜けたのか』にも答えられるようにする上級スキルであり、システムのどこでも再発しないようにします。"),
      IMG(m_screen, "Màn hình giám sát: TeleBill phát hiện thuê bao bị tính cước sai khi đổi gói giữa kỳ", "Monitoring screen: TeleBill detects a subscriber overcharged after a mid-cycle plan change", "監視画面：期中プラン変更で過剰請求が発生した加入者をTeleBillが検知"),
      DEF("Root Cause Analysis (RCA)", "quá trình truy ngược từ triệu chứng của một sự cố tới nguyên nhân thực sự (gốc rễ) khiến nó xảy ra, để xử lý tận gốc thay vì chỉ vá triệu chứng.",
        "the process of tracing back from an incident's symptom to the real (root) cause behind it, in order to fix it at the source instead of only patching the symptom.",
        "インシデントの症状から、それを引き起こした本当の（根本的な）原因まで遡り、症状のパッチではなく根本から対処するプロセス。"),
    ] },
  { heading: { vi: "2. Vì sao tester cần thạo RCA, không chỉ báo lỗi", en: "2. Why testers need RCA, not just bug reporting", ja: "2. なぜテスターにはバグ報告だけでなくRCAが必要か" },
    blocks: [
      P("Nhiều tester dừng lại ở việc mô tả TRIỆU CHỨNG thật chi tiết: bước tái hiện, kết quả mong đợi, kết quả thực tế, bằng chứng. Đó là nền tảng cần thiết, nhưng ở cấp độ nâng cao — đặc biệt với các hệ thống có ảnh hưởng tiền bạc như tính cước viễn thông — công việc của bạn không dừng ở việc phát hiện lỗi mà còn là giúp tổ chức hiểu VÌ SAO lỗi này có thể xảy ra và làm sao ngăn những lỗi cùng loại trong tương lai.",
        "Many testers stop at describing the SYMPTOM in great detail: repro steps, expected result, actual result, evidence. That's a necessary foundation, but at an advanced level — especially for money-impacting systems like telecom billing — your job doesn't stop at finding the bug; it extends to helping the organization understand WHY it could happen and how to prevent similar bugs in the future.",
        "多くのテスターは症状を詳細に記述するところで止まります：再現手順、期待結果、実際の結果、証拠。それは必要な土台ですが、上級レベル——特に通信の請求のような金銭に影響するシステムでは——あなたの仕事はバグを見つけるだけでなく、なぜそれが起こり得たのかを組織が理解し、将来の同種のバグを防ぐ手助けをすることまで広がります。"),
      P("Một tester biết làm RCA mang lại giá trị khác hẳn: thay vì báo cáo rời rạc từng ticket, bạn cung cấp bức tranh về LOẠI nguyên nhân đang lặp lại (ví dụ: nhiều sự cố gần đây đều xuất phát từ thiếu ca kiểm thử biên ở các luồng 'giữa kỳ'). Thông tin này giúp quản lý ưu tiên đầu tư đúng chỗ — có thể là đào tạo thêm về thiết kế ca biên, siết lại quy trình review đặc tả, thay vì chỉ tuyển thêm người vá lỗi.",
        "A tester skilled at RCA brings a very different kind of value: instead of scattered per-ticket reports, you provide a picture of the TYPE of cause recurring (e.g. several recent incidents all stemmed from missing boundary test cases in 'mid-cycle' flows). That insight helps management invest correctly — perhaps more boundary-case-design training or tighter spec-review process, rather than just hiring more people to patch bugs.",
        "RCAに長けたテスターは全く異なる価値をもたらします：ばらばらのチケット報告ではなく、繰り返される原因の『種類』の全体像を提供します（例：最近の複数インシデントがすべて『期中』フローの境界テストケース欠如に起因）。この洞察は、単にバグを直す人員を増やすのではなく、境界ケース設計の追加トレーニングや仕様レビューの厳格化など、正しい場所への投資を管理層が判断する助けになります。"),
      P("Nói ngắn gọn: viết bug report tốt cho biết 'điều gì đang sai'; làm RCA tốt cho biết 'vì sao nó sai và làm sao để nó không sai nữa'. Đây là kỹ năng phân biệt tester cấp cao với tester chỉ dừng ở việc phát hiện lỗi đơn lẻ.",
        "In short: a good bug report tells you 'what is wrong'; a good RCA tells you 'why it went wrong and how to make sure it doesn't go wrong again'. This is the skill that separates a senior tester from one who only stops at finding individual bugs.",
        "端的に言えば：良いバグ報告は『何が間違っているか』を伝え、良いRCAは『なぜ間違ったのか、そして二度と間違えないためにどうするか』を伝えます。これが、個々のバグを見つけるだけで止まるテスターとシニアテスターを分けるスキルです。"),
    ] },
  { heading: { vi: "3. Kỹ thuật 5 Whys — truy ngược từng lớp nguyên nhân", en: "3. The 5 Whys technique — peeling back layers of causation", ja: "3. 5 Whys技法 — 原因の層を一つずつ剥がす" },
    blocks: [
      P("5 Whys là kỹ thuật đơn giản nhưng mạnh: bắt đầu từ triệu chứng, hỏi 'tại sao điều này xảy ra?', rồi lấy câu trả lời làm câu hỏi kế tiếp, lặp lại cho tới khi chạm tới một nguyên nhân mà bạn có thể HÀNH ĐỘNG được (sửa quy trình, bổ sung ca kiểm thử, cập nhật đặc tả) — không phải một câu trả lời chung chung như 'do con người bất cẩn'.",
        "5 Whys is a simple but powerful technique: start from the symptom, ask 'why did this happen?', then use the answer as the next question, repeating until you reach a cause you can ACT on (fix a process, add a test case, update a spec) — not a vague answer like 'human carelessness'.",
        "5 Whysはシンプルながら強力な技法です：症状から始め『なぜこれが起きたのか？』と問い、その答えを次の質問として使い、対応可能な原因（プロセスの修正、テストケースの追加、仕様の更新）に到達するまで繰り返します——『人的不注意』のような曖昧な回答ではありません。"),
      IMG(m_5whys, "Bảng 5 Whys áp dụng cho sự cố tính cước sai của thuê bao đổi gói giữa kỳ", "A 5 Whys table applied to the billing incident of a mid-cycle plan change", "期中プラン変更の請求インシデントに適用した5 Whys表"),
      P("Nhìn vào bảng trên, bạn thấy mỗi 'Why' đào sâu thêm một lớp: từ hiện tượng bề mặt (khách bị tính dư tiền), tới hành vi hệ thống (cộng trùng ngày), tới lỗi kỹ thuật cụ thể (công thức làm tròn sai), tới nguyên nhân quy trình (đặc tả không rõ ràng), và cuối cùng tới nguyên nhân gốc thật sự (thiếu ca kiểm thử biên cho luồng đổi gói cuối kỳ ngay từ giai đoạn thiết kế yêu cầu). Nếu bạn dừng lại ở Why 2 hoặc Why 3, bạn sẽ chỉ sửa được TRIỆU CHỨNG chứ chưa chạm tới gốc rễ.",
        "Looking at the table above, each 'Why' digs one layer deeper: from the surface phenomenon (the customer overcharged), to the system's behavior (double-counting days), to the specific technical bug (a wrong rounding formula), to the process cause (an unclear spec), and finally to the true root cause (a missing boundary test case for the end-of-cycle plan-change flow, all the way back at requirements design). If you stop at Why 2 or Why 3, you'll only fix the SYMPTOM, not reach the root.",
        "上の表を見ると、各『Why』が一段深く掘り下げています：表面的な現象（顧客への過剰請求）から、システムの挙動（日数の二重計算）、具体的な技術的バグ（誤った丸め処理の計算式）、プロセス上の原因（不明瞭な仕様）、そして最終的に本当の根本原因（要件設計の段階から欠けていた期末プラン変更フローの境界テストケース）まで。Why 2やWhy 3で止まると、根本ではなく症状しか直せません。"),
      DEF("5 Whys", "kỹ thuật hỏi liên tiếp 'tại sao' (thường 4–6 lần), mỗi câu trả lời là câu hỏi kế tiếp, cho tới khi chạm nguyên nhân gốc có thể hành động được.",
        "a technique of asking 'why' repeatedly (typically 4–6 times), each answer becoming the next question, until reaching an actionable root cause.",
        "『なぜ』を繰り返し問う（通常4〜6回）技法。各回答が次の質問となり、対応可能な根本原因に到達するまで続ける。"),
      PITFALL("Dừng lại quá sớm ở Why 1 hoặc 2 và kết luận ngay 'do lập trình viên viết sai code' — bỏ lỡ nguyên nhân sâu hơn ở đặc tả/thiết kế khiến lỗi tương tự còn tái diễn ở module khác.", "Stopping too early at Why 1 or 2 and concluding 'the developer just wrote bad code' — missing the deeper cause in spec/design that lets similar bugs recur in other modules.", "Why 1や2で止まり、すぐに『開発者がコードを間違えただけ』と結論づける——仕様/設計にあるより深い原因を見逃し、他モジュールで類似バグが再発する。"),
    ] },
  { heading: { vi: "4. Biểu đồ xương cá (Ishikawa) — phân loại nguyên nhân theo 5 nhóm", en: "4. The fishbone diagram (Ishikawa) — categorizing causes into 5 groups", ja: "4. Fishboneダイアグラム（石川図）— 原因を5グループに分類" },
    blocks: [
      P("5 Whys giỏi trong việc đào SÂU một chuỗi nguyên nhân, nhưng nếu chỉ đi theo một hướng, bạn có thể bỏ sót các nguyên nhân song song ở nhóm khác. Biểu đồ xương cá (fishbone/Ishikawa) bù đắp điểm này: nó liệt kê TẤT CẢ các nhóm nguyên nhân có thể liên quan quanh một 'sự cố' (effect), giúp bạn rà soát rộng trước khi đào sâu vào từng nhánh bằng 5 Whys.",
        "5 Whys is great at digging DEEP along one chain of causation, but if you only follow one direction, you might miss parallel causes in other groups. The fishbone (Ishikawa) diagram compensates for this: it lists ALL potentially relevant cause groups around an 'effect', letting you scan broadly before digging into each branch with 5 Whys.",
        "5 Whysは1つの原因の連鎖を深く掘り下げるのに優れていますが、1方向だけを辿ると他グループの並行する原因を見逃す可能性があります。Fishbone（石川）ダイアグラムはこれを補います：『結果』の周りに関連しうる全ての原因グループを列挙し、5 Whysで各枝を深掘りする前に幅広く見渡せるようにします。"),
      IMG(m_fishbone, "Biểu đồ xương cá: 5 nhóm nguyên nhân (Yêu cầu, Thiết kế, Code, Dữ liệu, Môi trường) quanh sự cố cước tính sai", "Fishbone diagram: 5 cause groups (Requirement, Design, Code, Data, Environment) around the billing incident", "Fishboneダイアグラム：請求インシデントを囲む5つの原因グループ（要件・設計・コード・データ・環境）"),
      P("Với hệ thống tính cước viễn thông, 5 nhóm nguyên nhân kinh điển thường là: (1) Yêu cầu — đặc tả thiếu, mơ hồ hoặc mâu thuẫn; (2) Thiết kế — use case/luồng nghiệp vụ bỏ sót nhánh biên; (3) Code — logic tính toán, làm tròn, xử lý ngày giờ sai; (4) Dữ liệu — bảng giá, cấu hình gói cước lỗi thời hoặc chưa đồng bộ; (5) Môi trường — lệch múi giờ, batch job chạy sai lịch, hạ tầng không ổn định. Với mỗi sự cố, bạn nên rà cả 5 nhóm trước khi kết luận nguyên nhân chỉ nằm ở một nhóm duy nhất.",
        "For a telecom billing system, the 5 classic cause groups are usually: (1) Requirement — missing, vague, or conflicting specs; (2) Design — a use case/business flow missing a boundary branch; (3) Code — wrong calculation logic, rounding, or date-time handling; (4) Data — outdated or unsynchronized pricing/plan configuration; (5) Environment — timezone mismatch, a batch job running off schedule, unstable infrastructure. For every incident, you should scan all 5 groups before concluding the cause lies in only one.",
        "通信の請求システムでは、典型的な5つの原因グループは通常：(1) 要件——欠落・曖昧・矛盾する仕様；(2) 設計——境界分岐が欠けたユースケース/業務フロー；(3) コード——計算ロジック、丸め処理、日時処理の誤り；(4) データ——古い、または未同期の料金/プラン設定；(5) 環境——タイムゾーンのずれ、スケジュール通りに動かないバッチジョブ、不安定なインフラ。各インシデントについて、原因が1グループだけにあると結論づける前に、5グループすべてを確認すべきです。"),
      DEF("Biểu đồ xương cá (Fishbone/Ishikawa)", "công cụ trực quan gom nguyên nhân nghi ngờ quanh một sự cố theo các nhóm (yêu cầu, thiết kế, code, dữ liệu, môi trường...), giúp rà soát nguyên nhân có hệ thống, không bỏ sót góc nhìn.",
        "a visual tool grouping suspected causes around an incident by category (requirement, design, code, data, environment...), enabling a systematic cause review that misses no angle.",
        "疑わしい原因をインシデントの周りにカテゴリ（要件・設計・コード・データ・環境など）別にまとめる視覚的ツール。視点の見落としなく体系的に原因を検証できる。"),
      TIP("Dùng fishbone để RÀ SOÁT RỘNG trước, sau đó chọn nhánh nghi ngờ nhất và dùng 5 Whys để ĐÀO SÂU — hai kỹ thuật bổ trợ nhau, không thay thế nhau.", "Use the fishbone to scan BROADLY first, then pick the most suspicious branch and use 5 Whys to dig DEEP — the two techniques complement, not replace, each other.", "まずFishboneで広く見渡し、最も疑わしい枝を選んで5 Whysで深掘りする——2つの技法は互いを補完し合うもので、代替するものではない。"),
    ] },
  { heading: { vi: "5. Chuẩn bị: gắn RCA vào quy trình xử lý defect", en: "5. Prepare: embedding RCA into the defect workflow", ja: "5. 準備：RCAを不具合対応プロセスに組み込む" },
    blocks: [
      P("RCA không nên là việc làm ngẫu hứng — nó cần một 'cổng' rõ ràng trong quy trình xử lý defect để biết khi nào bắt buộc thực hiện, ai tham gia, và cần thu thập gì trước khi bắt đầu.",
        "RCA shouldn't be an ad-hoc activity — it needs a clear 'gate' in the defect workflow to define when it's mandatory, who's involved, and what to gather before starting.",
        "RCAは思いつきで行うべきものではありません——不具合対応プロセスの中に明確な『ゲート』を設け、いつ必須になるか、誰が関わるか、開始前に何を集めるべきかを定義する必要があります。"),
      STEP(1, "Xác định điều kiện KÍCH HOẠT RCA: mức độ Critical/High ảnh hưởng tiền/dữ liệu khách hàng, đã tái diễn, hoặc ảnh hưởng số lượng lớn thuê bao — như quy tắc ở mục vòng đời defect.", "Define the RCA TRIGGER conditions: Critical/High severity affecting money/customer data, prior recurrence, or a large number of affected subscribers — as shown in the defect-lifecycle gate.", "RCAの起動条件を定義する：金銭/顧客データに影響するCritical/High、過去の再発、多数の加入者への影響——不具合ライフサイクルのゲートで示す通り。"),
      STEP(2, "Thu thập dữ liệu đầu vào trước buổi RCA: log hệ thống, ticket liên quan trong lịch sử, bộ ca kiểm thử hiện có của luồng liên quan, và bản đặc tả gốc.", "Gather input data before the RCA session: system logs, related historical tickets, the existing test suite for the related flow, and the original spec.", "RCAセッション前に入力データを収集する：システムログ、関連する過去のチケット、関連フローの既存テストスイート、元の仕様書。"),
      STEP(3, "Mời đúng người tham gia: tester phụ trách, lập trình viên liên quan, BA/PO nắm yêu cầu, và (nếu cần) người vận hành hạ tầng — RCA hiệu quả nhất khi có đủ góc nhìn của cả 5 nhóm nguyên nhân.", "Invite the right people: the responsible tester, the relevant developer, the BA/PO who owns the requirements, and (if needed) infrastructure ops — RCA works best with perspectives covering all 5 cause groups.", "適切な参加者を招集する：担当テスター、関連開発者、要件を把握するBA/PO、（必要なら）インフラ運用担当——5つの原因グループ全ての視点があるほどRCAは効果的です。"),
      IMG(m_lifecycle, "RCA là một 'cổng' trong quy trình xử lý defect — Critical/tái diễn buộc phải qua RCA trước khi đóng ticket", "RCA as a 'gate' in the defect workflow — Critical/recurring defects must pass RCA before the ticket is closed", "不具合対応プロセスの『ゲート』としてのRCA — Critical/再発案件はチケットクローズ前に必ずRCAを通す"),
      PITFALL("Coi RCA là việc 'làm thêm nếu rảnh' thay vì một bước bắt buộc trong quy trình — kết quả là chỉ những ai có thời gian mới làm RCA, còn phần lớn sự cố Critical vẫn chỉ được vá triệu chứng.", "Treating RCA as 'extra work if there's time' instead of a mandatory workflow step — the result is only whoever has spare time does RCA, while most Critical incidents still only get symptom patches.", "RCAを『時間があればやる追加業務』として扱い、必須のプロセスステップとしない——結果として時間のある人だけがRCAを行い、大半のCriticalインシデントは症状のパッチのみで終わる。"),
    ] },
  { heading: { vi: "6. Thực hành RCA từng bước cho sự cố cước sai", en: "6. Running an RCA step by step for the billing incident", ja: "6. 請求インシデントに対するRCAの実施手順" },
    blocks: [
      P("Giờ ta áp dụng đầy đủ vào ticket TB-5521: thuê bao đổi gói giữa kỳ bị tính trùng cước 10 ngày cuối. Làm theo thứ tự dưới đây để có một RCA đầy đủ, có thể trình bày với đội.",
        "Now let's apply this fully to ticket TB-5521: a subscriber overcharged by 10 duplicated days after a mid-cycle plan change. Follow the order below for a complete RCA you can present to the team.",
        "では、チケットTB-5521——期中プラン変更で10日分の請求が重複計上された加入者——に完全に適用してみましょう。以下の順序で、チームに提示できる完全なRCAを作成します。"),
      STEP(1, "Xác nhận và định lượng triệu chứng: khách bị tính dư 746.000đ; kiểm tra log thấy ~4.200 thuê bao có cùng pattern trong kỳ 07/2026 — đây là sự cố hệ thống, không phải ca đơn lẻ.", "Confirm and quantify the symptom: the customer was overcharged 746,000đ; checking logs shows ~4,200 subscribers share the same pattern in the 07/2026 cycle — this is a systemic incident, not an isolated case.", "症状を確認し定量化する：顧客に746,000ドンの過剰請求；ログを確認すると2026年7月サイクルで約4,200人の加入者が同じパターンを持つ——単発ではなくシステム的なインシデントである。"),
      STEP(2, "Chạy fishbone: rà 5 nhóm nguyên nhân, khoanh vùng nghi ngờ nhất là Yêu cầu/Thiết kế và Code (vì Dữ liệu và Môi trường không có bất thường trong log).", "Run the fishbone: scan all 5 cause groups, narrowing the most suspicious to Requirement/Design and Code (Data and Environment show no anomaly in the logs).", "Fishboneを実施：5つの原因グループを確認し、最も疑わしいのは要件/設計とコード（データと環境にはログ上の異常なし）に絞り込む。"),
      STEP(3, "Chạy 5 Whys trên nhánh Code/Yêu cầu đã khoanh vùng để đào sâu tới nguyên nhân gốc (xem bảng 5 Whys ở mục 3): thiếu ca kiểm thử biên đổi gói cuối kỳ ngay từ giai đoạn đặc tả.", "Run 5 Whys on the narrowed Code/Requirement branch to dig to the root cause (see the 5 Whys table in section 3): a missing end-of-cycle boundary test case, going back to the spec stage.", "絞り込んだコード/要件の枝に5 Whysを実施し根本原因まで掘り下げる（第3節の5Whys表を参照）：仕様段階まで遡る、期末プラン変更の境界テストケースの欠如。"),
      STEP(4, "Viết kết luận RCA gồm: triệu chứng, phạm vi ảnh hưởng, chuỗi nguyên nhân (5 Whys), nguyên nhân gốc, và đề xuất hành động phòng ngừa — đính kèm vào ticket TB-5521.", "Write the RCA conclusion including: symptom, impact scope, cause chain (5 Whys), root cause, and proposed preventive actions — attach it to ticket TB-5521.", "RCAの結論を記述する：症状、影響範囲、原因の連鎖（5 Whys）、根本原因、予防措置の提案——これをチケットTB-5521に添付する。"),
      IMG(m_jira, "Ticket TB-5521 với kết luận RCA đính kèm — nguyên nhân gốc & phạm vi ảnh hưởng", "Ticket TB-5521 with the attached RCA conclusion — root cause & impact scope", "RCA結論を添付したチケットTB-5521 — 根本原因と影響範囲"),
      CODE("text", "KET LUAN RCA - Ticket TB-5521\nTrieu chung: thue bao doi goi giua ky bi tinh du cuoc 10 ngay cuoi (~4.200 TB / ky 07/2026)\nNhom nguyen nhan nghi ngo (fishbone): Yeu cau/Thiet ke + Code (Du lieu, Moi truong: khong bat thuong)\nChuoi 5 Whys: cong trung ngay -> job khong cat dung ngay hieu luc -> ham dung ceil() sai\n            -> dac ta khong mo ta cong thuc -> THIEU CA KIEM THU BIEN DOI GOI CUOI KY (goc re)\nHanh dong phong ngua: (1) sua cong thuc ngay hieu luc (2) bo sung ca test bien cuoi ky vao hoi quy\n            (3) checklist dac ta bat buoc mo ta cong thuc cho luong 'giua ky'"),
    ] },
  { heading: { vi: "7. Tình huống 1: chỉ sửa triệu chứng, tháng sau tái diễn", en: "7. Situation 1: fixing only the symptom, it recurs next month", ja: "7. シーン1：症状だけを直し、翌月に再発" },
    blocks: [
      SITUATION("Đội xử lý sự cố tính cước sai bằng cách hoàn tiền ngay cho khách và sửa nhanh một điều kiện trong code để 'chặn' trường hợp cụ thể đó, rồi đóng ticket vì khách đã hài lòng.", "The team handles the billing incident by immediately refunding the customer and quickly patching one condition in the code to 'block' that specific case, then closes the ticket since the customer is satisfied.",
        "Một tháng sau, một nhóm thuê bao khác — đổi gói ở ngày khác trong kỳ — lại bị tính cước sai theo đúng cơ chế cũ, vì bản vá chỉ chặn đúng điều kiện ngày 21/07 chứ không sửa công thức tính ngày hiệu lực nói chung.",
        "A month later, a different group of subscribers — who changed plans on a different day of the cycle — gets overcharged again via the exact same mechanism, because the patch only blocked the specific 21/07 condition instead of fixing the general effective-date formula.",
        "チームは請求インシデントに対し、顧客への即座の返金とコード内の1条件を素早くパッチして『その特定ケース』をブロックし、顧客が満足したためチケットをクローズする。",
        "1か月後、サイクル内の別の日にプラン変更を行った別の加入者グループが、全く同じメカニズムで再び過剰請求される。パッチが7月21日という特定条件だけをブロックし、有効日計算式そのものを修正していなかったためだ。"),
      SOLVE("Mở lại RCA đầy đủ (không chỉ vá điều kiện cụ thể): sửa công thức tính ngày hiệu lực cho MỌI ngày đổi gói trong kỳ, bổ sung ca kiểm thử biên cho toàn bộ dải ngày (đầu/giữa/cuối kỳ), và cập nhật đặc tả để mô tả rõ công thức chung.", "Reopen a full RCA (not just patching the specific condition): fix the effective-date formula for ANY plan-change day in the cycle, add boundary test cases covering the full date range (start/mid/end of cycle), and update the spec to clearly describe the general formula.", "特定条件のパッチだけでなく完全なRCAを再度実施：サイクル内のあらゆるプラン変更日に対する有効日計算式を修正し、日付範囲全体（期初/期中/期末）をカバーする境界テストケースを追加し、一般的な計算式を明記するよう仕様を更新する。"),
      P("Đây là bài học lớn nhất của chương này: sửa 'đúng triệu chứng đang thấy' không có nghĩa là đã xử lý xong nguyên nhân gốc. Nếu bản vá chỉ chặn một điều kiện cụ thể (ngày 21/07) thay vì sửa công thức tổng quát, lỗi vẫn còn nguyên ở mọi trường hợp khác chưa 'gặp may' bị phát hiện. RCA đòi hỏi bạn đặt câu hỏi: 'Bản sửa này có xử lý được TẤT CẢ các trường hợp cùng nguyên nhân gốc, hay chỉ trường hợp cụ thể vừa báo cáo?'",
        "This is the biggest lesson in this chapter: fixing 'exactly the symptom you saw' doesn't mean the root cause is resolved. If the patch only blocks one specific condition (21/07) instead of fixing the general formula, the bug remains in every other case that just hasn't 'gotten unlucky' yet. RCA requires you to ask: 'Does this fix address ALL cases sharing the same root cause, or just the specific case that was reported?'",
        "これが本章最大の教訓です：『見えている症状そのもの』を直しても、根本原因が解決したとは限りません。パッチが一般的な計算式ではなく特定条件（7月21日）だけをブロックするなら、まだ『たまたま』発見されていない他の全てのケースにバグは残ったままです。RCAでは『この修正は同じ根本原因を共有する全ケースに対処しているか、それとも報告された特定ケースだけか』を問う必要があります。"),
      RECAP(["Vá đúng triệu chứng KHÔNG đồng nghĩa xử lý xong nguyên nhân gốc", "Kiểm tra bản sửa có phủ hết mọi trường hợp cùng nguyên nhân, không chỉ ca đã báo cáo"],
        ["Patching the exact symptom does NOT mean the root cause is resolved", "Check whether the fix covers every case sharing the cause, not just the reported one"],
        ["症状ぴったりを直しても根本原因の解決とは限らない", "修正が報告ケースだけでなく同原因の全ケースをカバーするか確認する"]),
    ] },
  { heading: { vi: "8. Tình huống 2: RCA lần ra thiếu ca kiểm thử biên cuối kỳ", en: "8. Situation 2: the RCA traces to a missing end-of-cycle boundary test case", ja: "8. シーン2：RCAが期末境界テストケースの欠如を突き止める" },
    blocks: [
      SITUATION("Bạn chạy 5 Whys đầy đủ cho ticket TB-5521 và đi tới tận Why 5 thay vì dừng ở Why 2.", "You run the full 5 Whys for ticket TB-5521 and go all the way to Why 5 instead of stopping at Why 2.",
        "Nguyên nhân gốc không nằm ở một dòng code sai, mà ở việc bộ ca kiểm thử VÀ đặc tả ban đầu chỉ thiết kế cho luồng đổi gói ĐẦU kỳ — không ai từng viết ca cho trường hợp đổi gói ở NHỮNG NGÀY CUỐI kỳ, nên lỗi công thức ngày chưa từng bị bắt trước khi lên production.",
        "The root cause isn't one wrong line of code, but that both the original test suite AND spec were designed only for start-of-cycle plan changes — nobody had ever written a case for changing plans on the LAST FEW DAYS of the cycle, so the date-formula bug was never caught before reaching production.",
        "チケットTB-5521に対して完全な5 Whysを実施し、Why 2で止まらずWhy 5まで到達する。",
        "根本原因は1行の誤ったコードではなく、当初のテストスイートと仕様の両方が期初のプラン変更にしか設計されていなかったことにある——サイクルの最後の数日でプランを変更するケースを誰も書いたことがなく、日付計算式のバグは本番投入前に一度も検出されていなかった。"),
      SOLVE("Không chỉ sửa công thức, mà bổ sung MỘT NHÓM ca kiểm thử biên mới cho mọi luồng liên quan tới 'kỳ cước' (đổi gói, huỷ gói, gia hạn) tại ba mốc: ngày đầu kỳ, giữa kỳ, và (đặc biệt) những ngày cuối kỳ — rồi đưa nhóm ca này vào bộ hồi quy bắt buộc mỗi lần đổi logic tính cước.", "Not just fix the formula, but add a WHOLE NEW GROUP of boundary test cases for every 'billing-cycle' related flow (plan change, cancellation, renewal) at three points: start of cycle, mid-cycle, and (especially) the last days of the cycle — then add this group to the mandatory regression suite for every billing-logic change.", "計算式を直すだけでなく、『請求サイクル』に関連する全フロー（プラン変更・解約・更新）に対し、期初・期中・（特に）期末の3時点で新たな境界テストケース群を追加する——そしてこのグループを、請求ロジック変更のたびに必須の回帰テストスイートに組み込む。"),
      P("Tình huống này cho thấy RCA đôi khi không tìm ra một 'lỗi kỹ thuật' đơn lẻ mà tìm ra một LỖ HỔNG TRONG CÁCH THIẾT KẾ CA KIỂM THỬ — nguyên nhân gốc nằm ở chính quy trình test. Khi đó, hành động phòng ngừa không chỉ là sửa code mà còn là sửa cách đội thiết kế ca kiểm thử: luôn phải xét đủ ba mốc đầu/giữa/cuối cho bất kỳ luồng nào có yếu tố 'chu kỳ thời gian'.",
        "This situation shows RCA sometimes doesn't uncover a single 'technical bug' but a GAP IN HOW TEST CASES ARE DESIGNED — the root cause lies in the testing process itself. In that case, the preventive action isn't just fixing code but fixing how the team designs test cases: always covering the start/mid/end points for any flow with a 'time-cycle' element.",
        "この状況は、RCAが単一の『技術的バグ』ではなく、テストケース設計方法におけるギャップを暴くことがあることを示しています——根本原因はテストプロセスそのものにあります。その場合、予防措置はコードの修正だけでなく、チームのテストケース設計方法の修正でもあります：『時間周期』の要素を持つあらゆるフローで、常に期初/期中/期末の3点を網羅する。"),
      TRY("Nghĩ về một tính năng khác có yếu tố 'chu kỳ' (kỳ lương, kỳ bảo hành, kỳ hợp đồng...) và liệt kê 3 mốc biên (đầu/giữa/cuối) cần có ca kiểm thử.", "Think of another feature with a 'cycle' element (payroll period, warranty period, contract term...) and list the 3 boundary points (start/mid/end) that need test cases.", "『周期』の要素を持つ別の機能（給与サイクル、保証期間、契約期間など）を考え、テストケースが必要な3つの境界点（期初/期中/期末）を挙げよう。"),
    ] },
  { heading: { vi: "9. Từ RCA rút hành động phòng ngừa & bổ sung ca kiểm thử", en: "9. Turning RCA into preventive action & new test cases", ja: "9. RCAから予防措置とテストケース追加へ" },
    blocks: [
      P("Một RCA chỉ tạo giá trị thực khi chuyển thành hành động cụ thể, đo lường được, và được theo dõi tới khi xác nhận hiệu quả — chứ không dừng ở một tài liệu phân tích đẹp rồi cất tủ.",
        "An RCA only creates real value once it's turned into concrete, measurable action that's tracked until effectiveness is confirmed — not just a nicely written analysis document shelved away.",
        "RCAは、効果が確認されるまで追跡される具体的で測定可能な行動に変換されて初めて真の価値を生みます——きれいに書かれた分析文書を棚に置くだけでは終わりません。"),
      IMG(m_causeAction, "Bảng ánh xạ: mỗi nhóm nguyên nhân (Ishikawa) → hành động phòng ngừa cụ thể", "A mapping table: each cause group (Ishikawa) → a concrete preventive action", "対応表：各原因グループ（Ishikawa）→具体的な予防措置"),
      P("Với mỗi nguyên nhân gốc tìm được, nên tách hành động theo hai lớp: (1) hành động NGẮN HẠN — bổ sung ngay ca kiểm thử hồi quy cho đúng kịch bản gây lỗi, để đảm bảo không lọt lại chính lỗi này; (2) hành động DÀI HẠN — sửa quy trình (checklist đặc tả, quy tắc review use case theo biên, quy trình code review) để ngăn CẢ NHÓM lỗi tương tự chứ không riêng ca cụ thể vừa gặp.",
        "For each root cause found, split actions into two layers: (1) SHORT-TERM action — immediately add a regression test case for the exact failing scenario, ensuring this specific bug can't slip through again; (2) LONG-TERM action — fix the process (spec checklist, boundary-based use-case review rule, code-review process) to prevent the WHOLE CLASS of similar bugs, not just the specific case just encountered.",
        "見つかった各根本原因について、行動を2層に分けます：(1) 短期的行動——失敗した正確なシナリオに対する回帰テストケースを即座に追加し、この特定のバグが二度とすり抜けないようにする；(2) 長期的行動——プロセス（仕様チェックリスト、境界に基づくユースケースレビュー規則、コードレビュープロセス）を修正し、遭遇した特定ケースだけでなく類似バグの全クラスを防ぐ。"),
      IMG(m_kanban, "Theo dõi hành động phòng ngừa sau RCA tới khi xác nhận hiệu quả (TeleBill · Q3/2026)", "Tracking preventive actions after RCA until effectiveness is confirmed (TeleBill · Q3 2026)", "RCA後の予防措置を効果確認まで追跡（TeleBill・2026年第3四半期）"),
      P("Để biết RCA có thực sự hiệu quả hay không, nên theo dõi số liệu theo thời gian: tỉ lệ nguyên nhân theo từng nhóm (Yêu cầu/Thiết kế/Code/Dữ liệu/Môi trường) có thay đổi không, và quan trọng nhất — số sự cố TÁI DIỄN sau khi chỉ vá triệu chứng có giảm dần không. Nếu con số tái diễn không giảm qua các quý, đó là dấu hiệu RCA đang chỉ dừng ở phân tích mà chưa thực sự chuyển thành hành động phòng ngừa hiệu quả.",
        "To know if RCA is actually working, track metrics over time: whether the cause-group ratio (Requirement/Design/Code/Data/Environment) shifts, and most importantly — whether the number of incidents RECURRING after only a symptom patch keeps dropping. If the recurrence count doesn't fall across quarters, it's a sign RCA is stopping at analysis without truly turning into effective preventive action.",
        "RCAが実際に機能しているかを知るには、時系列で指標を追跡します：原因グループの比率（要件/設計/コード/データ/環境）が変化しているか、そして最も重要なのは——症状のパッチだけの後に再発するインシデント数が減り続けているかです。四半期を通じて再発件数が減らない場合、RCAが分析で止まり、真に効果的な予防措置に変換されていない兆候です。"),
      IMG(m_dashTrend, "Dashboard theo dõi xu hướng nguyên nhân gốc và tỉ lệ tái diễn theo quý", "Dashboard tracking root-cause trends and the recurrence rate by quarter", "四半期ごとの根本原因の傾向と再発率を追跡するダッシュボード"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The defect life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi", "初心者のためのDefect Life Cycle"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果レポートの書き方"),
      INTERNAL("Kỹ thuật đoán lỗi (Error Guessing) cho tester", "Error guessing technique for testers", "ky-thuat-doan-loi-error-guessing-cho-tester", "テスターのためのエラー推測技法"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách phân tích nguyên nhân gốc (RCA) qua sự cố tính cước sai của nhà mạng VinaMobile: kỹ thuật 5 Whys để đào sâu theo chuỗi nguyên nhân, biểu đồ xương cá (Ishikawa) để rà soát rộng theo 5 nhóm (yêu cầu/thiết kế/code/dữ liệu/môi trường), cách gắn RCA vào quy trình xử lý defect như một 'cổng' bắt buộc, và hai tình huống thật cho thấy vì sao chỉ vá triệu chứng là chưa đủ. Bạn cũng biết cách chuyển RCA thành hành động phòng ngừa cụ thể và ca kiểm thử bổ sung, rồi theo dõi hiệu quả qua thời gian.",
        "You just learned how to perform Root Cause Analysis (RCA) through a billing incident at telecom operator VinaMobile: the 5 Whys technique to dig along a chain of causes, the Ishikawa fishbone diagram to scan broadly across 5 groups (requirement/design/code/data/environment), how to embed RCA as a mandatory 'gate' in the defect workflow, and two real situations showing why patching only the symptom isn't enough. You also learned to turn RCA into concrete preventive actions and additional test cases, then track effectiveness over time.",
        "通信事業者VinaMobileの請求インシデントを通じて根本原因分析（RCA）の実施方法を学びました：原因の連鎖を掘り下げる5 Whys技法、5グループ（要件・設計・コード・データ・環境）を幅広く検証するIshikawaフィッシュボーンダイアグラム、不具合対応プロセスに必須の『ゲート』としてRCAを組み込む方法、そして症状のパッチだけでは不十分な理由を示す2つの実例。RCAを具体的な予防措置と追加テストケースに変換し、時間をかけて効果を追跡する方法も学びました。"),
      P("Chặng tiếp theo, bạn nên luyện kỹ thuật đoán lỗi (error guessing) để phát hiện thêm những góc mà đặc tả chưa mô tả, cùng cách viết báo cáo kết quả kiểm thử phản ánh đúng bức tranh chất lượng cho các bên liên quan. Nếu muốn luyện các kỹ thuật RCA nâng cao trên dự án mô phỏng doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận vai trò tester cấp cao.",
        "Next, you should practice error guessing to uncover more angles the spec hasn't described, along with writing test result reports that accurately reflect the quality picture for stakeholders. If you want to practice advanced RCA techniques on real enterprise-like projects with a mentor, a structured Tester course helps you progress fast and confidently take on a senior tester role.",
        "次は、仕様がまだ記述していない側面をさらに発見するためのエラー推測技法の練習と、関係者に正確な品質像を伝えるテスト結果レポートの書き方に取り組みましょう。指導者と共に実際の企業案件で高度なRCA技法を練習したいなら、体系的なテスターコースが速い成長と、シニアテスターの役割への自信ある挑戦を助けます。"),
      CTA(course),
    ] },
];

const doc = makeDoc({
  slug: "phan-tich-nguyen-nhan-goc-rca-cho-tester",
  domain: "telecom",
  primaryKeyword: "phân tích nguyên nhân gốc",
  keywords: ["phân tích nguyên nhân gốc", "RCA", "root cause analysis", "5 Whys", "biểu đồ xương cá", "Ishikawa", "RCA cho tester", "RCA viễn thông"],
  coverLabel: "NÂNG CAO · RCA · VIỄN THÔNG",
  crumb: "Phân tích nguyên nhân gốc (Root Cause Analysis - RCA)",
  metaTitle: { vi: "Phân tích nguyên nhân gốc (RCA) cho Tester viễn thông", en: "Root Cause Analysis (RCA) for telecom testers", ja: "通信業界テスター向け根本原因分析（RCA）" },
  metaDescription: {
    vi: "Phân tích nguyên nhân gốc (RCA) cho tester ngành viễn thông: kỹ thuật 5 Whys, biểu đồ xương cá Ishikawa, hành động phòng ngừa qua sự cố tính cước sai thực tế.",
    en: "Root Cause Analysis (RCA) for telecom testers: the 5 Whys technique, the Ishikawa fishbone diagram, cause categorization, and deriving preventive actions through a real billing-error incident, with mockups and a quiz.",
    ja: "通信業界テスター向け根本原因分析（RCA）：5 Whys技法、Ishikawaフィッシュボーンダイアグラム、原因分類、実際の請求エラーインシデントを通じた予防措置の導出。モックとクイズ付き。",
  },
  title: {
    vi: "Phân tích nguyên nhân gốc (RCA) cho Tester: 5 Whys, xương cá & phòng ngừa qua sự cố tính cước viễn thông (có trắc nghiệm)",
    en: "Root Cause Analysis (RCA) for Testers: 5 Whys, fishbone & prevention through a telecom billing incident (with quiz)",
    ja: "テスターのための根本原因分析（RCA）：5 Whys、フィッシュボーン、通信請求インシデントを通じた予防策（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: phân tích nguyên nhân gốc (RCA) qua sự cố tính cước sai của nhà mạng VinaMobile trên hệ thống TeleBill. Kỹ thuật 5 Whys đào sâu chuỗi nguyên nhân, biểu đồ xương cá Ishikawa phân loại theo 5 nhóm (yêu cầu/thiết kế/code/dữ liệu/môi trường), gắn RCA vào quy trình defect như một cổng bắt buộc, hai tình huống thật (chỉ sửa triệu chứng gây tái diễn; RCA lần ra thiếu ca kiểm thử biên cuối kỳ), cách rút hành động phòng ngừa & bổ sung ca kiểm thử, nhiều mockup giao diện thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: performing Root Cause Analysis (RCA) through a billing incident at telecom operator VinaMobile's TeleBill system. The 5 Whys technique digs along a chain of causes, the Ishikawa fishbone diagram categorizes into 5 groups (requirement/design/code/data/environment), RCA is embedded as a mandatory gate in the defect workflow, two real situations (only patching a symptom causing recurrence; an RCA tracing to a missing end-of-cycle boundary test case), how to derive preventive actions & new test cases, many real UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：通信事業者VinaMobileのTeleBillシステムにおける請求インシデントを通じた根本原因分析（RCA）の実施。原因の連鎖を掘り下げる5 Whys技法、5グループ（要件・設計・コード・データ・環境）に分類するIshikawaフィッシュボーンダイアグラム、不具合対応プロセスの必須ゲートとして組み込むRCA、2つの実例（症状のみのパッチによる再発、期末境界テストケース欠如の発見）、予防措置とテストケース追加の導き方、多数の実践的モック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thực hiện RCA cho một sự cố", steps: [
    { name: "Xác nhận & định lượng triệu chứng, kích hoạt RCA nếu đủ điều kiện", text: "Critical/High, tái diễn, hoặc ảnh hưởng số lượng lớn người dùng." },
    { name: "Rà rộng bằng biểu đồ xương cá rồi đào sâu bằng 5 Whys", text: "Phân loại theo 5 nhóm, chọn nhánh nghi ngờ nhất để đào sâu tới nguyên nhân gốc." },
    { name: "Chuyển RCA thành hành động phòng ngừa & ca kiểm thử", text: "Hành động ngắn hạn (ca hồi quy) và dài hạn (sửa quy trình), theo dõi tới khi xác nhận hiệu quả." },
  ] },
  pages,
});

export const MA_RCA_01 = [doc];
