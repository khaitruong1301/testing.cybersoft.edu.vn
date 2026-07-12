// doc_ma_use_case.mjs — BÀI MANUAL "NÂNG CAO":
// Thiết kế ca kiểm thử từ Use Case (Use Case Testing) — sinh ca kiểm thử từ luồng chính (basic flow)
// và các luồng thay thế/ngoại lệ (alternate/exception flows), bao phủ tác nhân, tiền/hậu điều kiện,
// kết hợp với dữ liệu biên. Dự án: hệ đặt vé & thanh toán của hãng hàng không SkyViet (SkyBooking).
// Song ngữ vi/en/ja (ja≠en), 12 chương, nhiều MOCKUP giao diện (ui_mock), trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, kanban, dashboard, stateDiagram } from "./ui_mock.mjs";

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
    tags: tags("congnghe", "ecommerce", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình đặt vé SkyBooking, khoanh vùng luồng thay thế & luồng ngoại lệ ──
const m_booking = browser("skybooking.vn/dat-ve/SGN-HAN-VN1546", [
  field(24, 20, 330, "Chuyến bay", "VN1546 · SGN → HAN · 07:15", "normal"),
  field(372, 20, 330, "Ghế đã chọn", "12A · Extra Legroom (+150.000đ)", "focus"),
  field(24, 92, 330, "Họ tên hành khách", "NGUYEN VAN A", "normal"),
  field(372, 92, 330, "Số hộ chiếu/CMND", "079203011234", "normal"),
  `<text x="24" y="176" font-size="11" font-weight="700" fill="#475569">Tổng tiền (giá vé + phụ phí + thuế)</text>
<rect x="24" y="186" width="330" height="30" rx="8" fill="#eef2ff" stroke="#0369a1" stroke-width="2"/>
<text x="36" y="206" font-size="13" font-weight="800" fill="#0369a1">1.850.000 ₫</text>`,
  btn(24, 236, 220, "Xác nhận & Thanh toán", "primary"),
  annotate(368, 12, 330, 62, "LUỒNG THAY THẾ A1: phụ phí ghế Extra Legroom"),
  annotate(20, 164, 680, 96, "NGOẠI LỆ E1: ghế có thể bị đặt trước ngay lúc xác nhận thanh toán"),
].join(""), { h: 300, title: "SkyBooking · Đặt vé", accent: "#0369a1" });

// ── Mockup 2: bảng đặc tả Use Case đầy đủ — basic + alternate + exception flow ──
const m_usecase = grid("Đặc tả Use Case: Đặt vé máy bay (SkyBooking)", ["Loại luồng", "Mã", "Diễn giải ngắn gọn", "Kết quả mong đợi"], [
  ["Basic Flow", "BF", "Chọn ghế trống → nhập thông tin hành khách → thanh toán thành công", "Tạo vé + mã đặt chỗ (PNR), khóa ghế, gửi email xác nhận"],
  ["Alternate", "A1", "Chọn ghế có phụ phí (Extra Legroom)", "Cộng đúng phụ phí vào tổng tiền trước khi thanh toán"],
  ["Alternate", "A2", "Áp mã giảm giá hợp lệ", "Trừ đúng số tiền giảm giá, tổng tiền không âm"],
  ["Alternate", "A3", "Thanh toán bằng ví điện tử thay vì thẻ", "Vé vẫn được tạo, định dạng mã PNR không đổi"],
  ["Exception", "E1", "Ghế vừa chọn bị hành khách khác đặt trước lúc xác nhận", "Chặn giao dịch, hoàn tiền nếu đã trừ, yêu cầu chọn ghế khác"],
  ["Exception", "E2", "Cổng thanh toán từ chối hoặc hết thời gian chờ", "Không tạo vé, không khóa ghế, thông báo lỗi rõ ràng"],
  ["Exception", "E3", "Hành khách thoát trang giữa chừng trước khi thanh toán", "Ghế giữ tạm (hold) rồi tự nhả sau 15 phút"],
  ["Exception", "E4", "Nhập số hộ chiếu/CMND sai định dạng", "Chặn tại bước nhập, yêu cầu sửa lại, không cho sang bước kế"],
], { accent: "#0369a1", note: "Basic flow là ĐƯỜNG ĐI CHÍNH; alternate flow vẫn tới đích nhưng khác đường; exception flow là nhánh thất bại có kiểm soát." });

// ── Mockup 3: sơ đồ luồng use case Đặt vé — basic flow và các nhánh rẽ ngoại lệ ──
const m_flow = stateDiagram("Sơ đồ luồng Use Case: Đặt vé máy bay (SkyBooking)", [
  { id: "search", label: "Tìm chuyến bay", x: 90, y: 80, kind: "start" },
  { id: "seat", label: "Chọn ghế", x: 270, y: 80, kind: "mid" },
  { id: "info", label: "Nhập T.tin HK", x: 450, y: 80, kind: "mid" },
  { id: "pay", label: "Thanh toán", x: 630, y: 80, kind: "mid" },
  { id: "ticket", label: "Vé đã tạo (PNR)", x: 630, y: 220, kind: "ok" },
  { id: "soldout", label: "Hết ghế (E1)", x: 270, y: 220, kind: "bad" },
  { id: "reject", label: "TT bị từ chối (E2)", x: 450, y: 220, kind: "bad" },
  { id: "timeout", label: "Hết hạn giữ ghế (E3)", x: 90, y: 220, kind: "bad" },
], [
  { from: "search", to: "seat", label: "chọn ghế trống" },
  { from: "seat", to: "info", label: "OK, giữ ghế" },
  { from: "info", to: "pay", label: "hợp lệ (E4 chặn nếu sai)" },
  { from: "pay", to: "ticket", label: "cổng OK" },
  { from: "seat", to: "soldout", label: "ghế bị đặt trước", bad: true },
  { from: "pay", to: "reject", label: "cổng lỗi/timeout", bad: true },
  { from: "info", to: "timeout", label: "bỏ ngang >15 phút", bad: true },
], { accent: "#0369a1", h: 340 });

// ── Mockup 4: bảng ca kiểm thử SINH TỪ từng luồng của use case (trích) ──
const m_testcases = grid("Ca kiểm thử sinh từ Use Case 'Đặt vé máy bay' (trích)", ["ID", "Luồng nguồn", "Bước kiểm thử trọng tâm", "Kết quả mong đợi"], [
  ["TC-01", "Basic Flow", "Đặt 1 ghế thường, thanh toán thẻ nội địa thành công", "Tạo vé + PNR, ghế 14C bị khóa, email gửi trong <2 phút"],
  ["TC-02", "A1", "Chọn ghế Extra Legroom 12A, kiểm tổng tiền cộng đúng phụ phí", "Tổng tiền = giá vé + 150.000đ phụ phí + thuế/phí"],
  ["TC-03", "A2", "Áp mã giảm giá SKY50 hợp lệ (giảm 50.000đ)", "Tổng tiền giảm đúng 50.000đ, không âm"],
  ["TC-04", "E1", "2 tab cùng chọn ghế 14C, tab 2 xác nhận thanh toán trước", "Tab 1 báo 'Ghế đã được đặt', không bị trừ tiền"],
  ["TC-05", "E2", "Thẻ hết hạn mức ngay tại bước xác nhận thanh toán", "Không tạo vé, ghế 14C được nhả lại ngay lập tức"],
  ["TC-06", "E3", "Đóng tab trình duyệt ở bước nhập thông tin hành khách", "Ghế tự nhả sau 15 phút giữ chỗ, hiển thị lại 'còn trống'"],
], { accent: "#0369a1", note: "Mỗi hàng trong bảng đặc tả use case (mockup 2) nên sinh ra ÍT NHẤT 1 ca kiểm thử tương ứng." });

// ── Mockup 5: ticket Jira — lỗi bán trùng ghế do bỏ sót luồng ngoại lệ E1 ──
const m_jira1 = jira({
  key: "SKY-8821", title: "Ghế 14C bị bán trùng cho 2 hành khách khi cùng xác nhận thanh toán gần như đồng thời",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "production · SkyBooking · web + app iOS"],
    ["Luồng liên quan", "Exception E1 — ghế bị đặt trước ngay lúc xác nhận thanh toán"],
    ["Các bước", "1) Hai hành khách cùng mở ghế 14C 2) Cả hai bấm 'Xác nhận & Thanh toán' trong vòng 2 giây 3) Xem kết quả cả hai giao dịch"],
    ["Kết quả mong đợi", "Chỉ 1 giao dịch thành công; giao dịch còn lại bị chặn và không bị trừ tiền"],
    ["Kết quả thực tế", "Cả hai giao dịch đều thành công, cùng tạo vé cho ghế 14C; một hành khách bị trừ tiền nhưng không có chỗ ngồi khi lên máy bay"],
  ],
});

// ── Mockup 6: ticket Jira — luồng hủy vé hoàn tiền tính sai mốc phí hủy ──
const m_jira2 = jira({
  key: "SKY-9014", title: "Hủy vé PNR7X2K1: hệ thống hoàn tiền dư 300.000đ so với công thức phí hủy đúng",
  type: "Bug", status: "Open", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · SkyBooking · module Hủy vé & hoàn tiền"],
    ["Luồng liên quan", "Use case phụ 'Hủy vé' — luồng ngoại lệ hủy sát giờ bay"],
    ["Các bước", "1) Mở vé PNR7X2K1 (hủy trước giờ bay 20 giờ) 2) Bấm 'Hủy vé & hoàn tiền' 3) Xem số tiền hoàn thực tế"],
    ["Kết quả mong đợi", "Hoàn tiền = giá vé − phí hủy 30% (áp dụng vì hủy trong 24 giờ trước giờ bay)"],
    ["Kết quả thực tế", "Hệ thống áp nhầm mốc phí hủy 10% (dành cho hủy trước 72 giờ), hoàn dư 300.000đ mỗi vé"],
  ],
});

// ── Mockup 7: bảng kết hợp Use Case Testing với dữ liệu biên (boundary values) ──
const m_boundary = grid("Kết hợp Use Case Testing với dữ liệu biên", ["Trường/Điều kiện", "Giá trị biên cần test", "Luồng liên quan", "Kết quả mong đợi"], [
  ["Số lượng hành khách/lượt đặt", "0, 1, 9, 10 (tối đa), 11", "Basic Flow", "0 và 11 bị chặn; 1 và 10 được chấp nhận"],
  ["Thời gian giữ ghế (hold)", "14p59s, 15p00s, 15p01s", "Exception E3", "Ghế chỉ tự nhả đúng tại/sau mốc 15p00s"],
  ["Mã giảm giá", "0đ, giảm đúng bằng giá vé, giảm vượt giá vé", "Alternate A2", "Không cho tổng tiền âm hoặc bằng 0 sai quy tắc"],
  ["Số hộ chiếu", "8 ký tự (thiếu), 9 ký tự (đúng), 10 ký tự (thừa)", "Exception E4", "Chỉ đúng 9 ký tự hợp lệ được chấp nhận"],
], { accent: "#0369a1", note: "Use case cho biết TEST Ở BƯỚC NÀO; dữ liệu biên cho biết TEST VỚI GIÁ TRỊ NÀO tại bước đó." });

// ── Mockup 8: bảng kanban theo dõi lỗi tìm qua Use Case Testing ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua Use Case Testing (SkyBooking · Sprint đặt vé)", [
  { name: "New", cards: [
    { key: "SKY-8821", title: "Bán trùng ghế 14C khi xác nhận đồng thời", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "SKY-9014", title: "Hoàn tiền dư do sai mốc phí hủy", sev: "Critical" },
    { key: "SKY-8877", title: "Ghế Extra Legroom không cộng phụ phí ở luồng A1", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SKY-8790", title: "Timeout cổng thanh toán vẫn tạo vé rỗng", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "SKY-8650", title: "Hộ chiếu 8 ký tự vẫn được chấp nhận", sev: "Medium" },
  ] },
]);

// ── Mockup 9: dashboard số liệu ca sinh từ Use Case Testing ──
const m_dash = dashboard("Số liệu: ca kiểm thử sinh từ Use Case — SkyBooking (Sprint đặt vé)", [
  { label: "Tổng ca kiểm thử sinh ra", value: "46", sub: "từ 1 use case đặt vé", color: "#0369a1" },
  { label: "Ca từ Alternate/Exception", value: "31", sub: "~67% tổng số ca", color: "#7c3aed" },
  { label: "Lỗi Critical ở luồng ngoại lệ", value: "5/6", sub: "đa số nằm ngoài luồng chính", color: "#e11d48" },
  { label: "Ca kết hợp dữ liệu biên", value: "14", sub: "trên các luồng rủi ro cao", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Use Case Testing là gì và khác gì với việc chỉ viết test case theo yêu cầu (requirement)?",
  "What is use case testing and how does it differ from writing test cases straight from requirements?",
  "Use Case Testing là kỹ thuật thiết kế ca kiểm thử dựa trực tiếp trên đặc tả use case — gồm tác nhân (actor), tiền điều kiện, hậu điều kiện, luồng chính (basic flow) và các luồng thay thế/ngoại lệ (alternate/exception flow) — thay vì chỉ dựa trên các câu yêu cầu rời rạc. Vì use case mô tả cả tương tác GIỮA nhiều bước và nhiều tác nhân theo trình tự thời gian, nó giúp tester nhìn ra những ca kiểm thử liên quan tới THỨ TỰ và TRẠNG THÁI (ví dụ: điều gì xảy ra nếu ghế hết đúng lúc đang thanh toán) mà một danh sách yêu cầu rời rạc khó thể hiện được.",
  "Use case testing is a test-design technique based directly on a use case specification — actors, preconditions, postconditions, the basic flow, and alternate/exception flows — instead of scattered requirement statements. Because a use case describes interaction BETWEEN multiple steps and multiple actors over time, it helps testers spot cases tied to ORDER and STATE (e.g. what happens if the seat runs out exactly while paying) that a flat requirement list rarely reveals.",
  "Use Case Testingとは何？要件（requirement）だけからテストケースを書く方法と何が違う？",
  "Use Case Testingとは、断片的な要件文だけでなく、アクター・事前条件・事後条件・基本フロー（basic flow）・代替/例外フロー（alternate/exception flow）を含むユースケース仕様に直接基づいてテストケースを設計する技法です。ユースケースは複数のステップと複数のアクター間の時系列的な相互作用を描写するため、『支払い中にちょうど座席がなくなったらどうなるか』のような、順序と状態に関わるテストケースをテスターが見つけやすくなります。これは平坦な要件リストでは表現しにくいものです。");
const faq2 = FAQ(
  "Luồng thay thế (alternate flow) và luồng ngoại lệ (exception flow) khác nhau ở điểm nào?",
  "What's the difference between an alternate flow and an exception flow?",
  "Luồng thay thế (alternate flow) vẫn dẫn tới MỤC TIÊU thành công của use case nhưng theo một con đường khác luồng chính (ví dụ chọn ghế phụ phí, dùng ví điện tử thay vì thẻ). Luồng ngoại lệ (exception flow) là khi điều kiện bất thường xảy ra khiến use case KHÔNG đạt được mục tiêu ban đầu và phải xử lý có kiểm soát: từ chối, hoàn tác, thông báo lỗi rõ ràng — ví dụ ghế bị đặt trước, cổng thanh toán từ chối. Cả hai loại đều cần đặc tả rõ hậu điều kiện riêng và đều sinh ra ca kiểm thử, không chỉ luồng chính mới cần test.",
  "An alternate flow still leads to the use case's successful GOAL but via a different path than the basic flow (e.g. picking a paid seat, using an e-wallet instead of a card). An exception flow is when an abnormal condition prevents the use case from reaching its original goal, requiring controlled handling: reject, roll back, show a clear error — e.g. a seat just got taken, or the payment gateway declines. Both need their own clearly specified postcondition and both generate test cases, not just the basic flow.",
  "代替フロー（alternate flow）と例外フロー（exception flow）はどう違う？",
  "代替フローは基本フローとは異なる経路をたどりますが、ユースケースの成功目標には到達します（例：有料座席の選択、カードの代わりに電子ウォレットを使うなど）。例外フローは異常な条件が発生し、ユースケースが本来の目標に到達できず、拒否・ロールバック・明確なエラー表示といった制御された処理が必要になる場合です（例：座席が先に取られる、決済ゲートウェイが拒否するなど）。どちらも独自の事後条件を明確に定義する必要があり、基本フローだけでなく両方からテストケースを導出すべきです。");
const faq3 = FAQ(
  "Vì sao nên kết hợp Use Case Testing với kỹ thuật dữ liệu biên (boundary value analysis)?",
  "Why combine use case testing with boundary value analysis?",
  "Use case testing đảm bảo bạn bao phủ đủ CÁC LUỒNG (đường đi có thể xảy ra), nhưng chưa nói gì về giá trị cụ thể sẽ nhập ở mỗi bước. Kết hợp dữ liệu biên vào từng bước của luồng — ví dụ mốc thời gian giữ ghế 15 phút, số lượng hành khách tối đa một lượt đặt, giới hạn ký tự số hộ chiếu — giúp mỗi luồng được kiểm ở đúng những giá trị dễ gây lỗi nhất, thay vì chỉ một giá trị 'điển hình' an toàn cho mỗi bước.",
  "Use case testing ensures you cover enough FLOWS (possible paths), but says nothing about the specific values entered at each step. Combining boundary values into each step of a flow — e.g. the 15-minute seat-hold cutoff, the max passengers per booking, the passport character limit — makes sure each flow gets tested at exactly the values most likely to break it, instead of only a 'typical', safe value at each step.",
  "Use Case TestingとBoundary Value Analysis（境界値分析）を組み合わせるべき理由は？",
  "Use case testingは十分な数のフロー（起こり得る経路）を網羅することを保証しますが、各ステップで具体的にどんな値を入力するかについては何も語りません。フローの各ステップに境界値——例えば15分の座席保持期限、1回の予約における最大乗客数、パスポート番号の文字数制限——を組み合わせることで、各ステップで安全な『典型的』な値だけでなく、最もバグを引き起こしやすい値でテストできます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Trong Use Case Testing, 'luồng chính' (basic flow) mô tả điều gì?", en: "In use case testing, what does the 'basic flow' describe?", ja: "Use Case Testingにおいて『基本フロー（basic flow）』は何を表す？" },
    options: [
      { vi: "Kịch bản thành công điển hình khi mọi bước diễn ra đúng như mong đợi", en: "The typical successful scenario where every step happens as expected", ja: "全てのステップが期待どおりに進む典型的な成功シナリオ" },
      { vi: "Mọi trường hợp lỗi có thể xảy ra", en: "Every possible error case", ja: "起こり得るすべてのエラーケース" },
      { vi: "Chỉ giao diện người dùng, không liên quan tới nghiệp vụ", en: "Only the user interface, unrelated to business logic", ja: "業務ロジックとは無関係のユーザーインターフェースのみ" },
      { vi: "Danh sách các trường dữ liệu cần validate", en: "A list of data fields that need validation", ja: "バリデーションが必要なデータ項目の一覧" },
    ], correct: 0,
    explain: { vi: "Basic flow là con đường thành công điển hình khi mọi tương tác diễn ra như thiết kế, làm mốc so sánh cho alternate/exception flow.", en: "The basic flow is the typical successful path when everything happens as designed, serving as the baseline for alternate/exception flows.", ja: "基本フローは全てが設計どおりに進む典型的な成功経路で、代替/例外フローの比較基準になります。" },
  }),
  mcq({
    q: { vi: "Hậu điều kiện (postcondition) của một use case dùng để làm gì?", en: "What is a use case's postcondition for?", ja: "ユースケースの事後条件（postcondition）は何のためにある？" },
    options: [
      { vi: "Mô tả trạng thái hệ thống PHẢI đạt được sau khi use case kết thúc, dù thành công hay thất bại", en: "Describe the system state that MUST be reached after the use case ends, whether it succeeds or fails", ja: "成功・失敗に関わらずユースケース終了後にシステムが到達すべき状態を記述する" },
      { vi: "Chỉ liệt kê các actor tham gia", en: "Only list the actors involved", ja: "関与するアクターだけを列挙する" },
      { vi: "Chỉ áp dụng cho luồng chính, không cần cho luồng ngoại lệ", en: "Only applies to the basic flow, not needed for exception flows", ja: "基本フローにのみ適用され、例外フローには不要である" },
      { vi: "Là bước đầu tiên trước khi use case bắt đầu", en: "Is the first step before the use case begins", ja: "ユースケース開始前の最初のステップである" },
      { vi: "Chỉ dùng để đặt tên cho use case", en: "Only used to name the use case", ja: "ユースケースに名前を付けるためだけに使う" },
    ], correct: 0,
    explain: { vi: "Hậu điều kiện cần đặc tả riêng cho CẢ kết quả thành công lẫn thất bại — ví dụ ghế không bị khóa nếu thanh toán thất bại.", en: "Postconditions must be specified for BOTH success and failure outcomes — e.g. the seat stays unlocked if payment fails.", ja: "事後条件は成功・失敗の両方の結果について定義する必要があります——例えば決済失敗時は座席がロックされないこと。" },
  }),
  mcq({
    q: { vi: "Đâu là một ví dụ hợp lý về luồng NGOẠI LỆ (exception flow) trong use case 'Đặt vé máy bay'?", en: "Which is a reasonable EXCEPTION flow example in the 'Book a flight' use case?", ja: "『航空券予約』ユースケースにおける例外フロー（exception flow）の妥当な例はどれ？" },
    options: [
      { vi: "Hành khách chọn ghế Extra Legroom và trả thêm phụ phí", en: "The passenger picks an Extra Legroom seat and pays a surcharge", ja: "乗客がExtra Legroom座席を選び追加料金を支払う" },
      { vi: "Ghế vừa chọn bị hành khách khác đặt trước ngay lúc xác nhận thanh toán", en: "The just-selected seat gets taken by another passenger right at payment confirmation", ja: "選択直後の座席が決済確認の瞬間に他の乗客に取られる" },
      { vi: "Hành khách thanh toán bằng thẻ và nhận vé thành công", en: "The passenger pays by card and successfully receives the ticket", ja: "乗客がカードで支払い、正常にチケットを受け取る" },
      { vi: "Hành khách xem lại thông tin chuyến bay trước khi đặt", en: "The passenger reviews flight details before booking", ja: "乗客が予約前にフライト情報を確認する" },
    ], correct: 1,
    explain: { vi: "Ghế bị đặt trước ngoài ý muốn là điều kiện bất thường khiến use case không đạt mục tiêu ban đầu, cần xử lý có kiểm soát — đúng bản chất exception flow.", en: "An unintentionally taken seat is an abnormal condition preventing the original goal, requiring controlled handling — the essence of an exception flow.", ja: "意図せず座席が取られるのは目標達成を妨げる異常な状況で、制御された処理が必要——これが例外フローの本質です。" },
  }),
  mcq({
    q: { vi: "Vì sao chỉ kiểm thử luồng chính (basic flow) của use case đặt vé là chưa đủ?", en: "Why is testing only the basic flow of the booking use case not enough?", ja: "予約ユースケースの基本フローだけをテストするのが不十分な理由は？" },
    options: [
      { vi: "Vì luồng chính không bao giờ có lỗi", en: "Because the basic flow never has bugs", ja: "基本フローには決してバグがないから" },
      { vi: "Vì các lỗi nghiêm trọng như bán trùng ghế hay hoàn tiền sai thường nằm ở luồng thay thế/ngoại lệ, nơi dễ bị bỏ sót", en: "Because serious bugs like double-booked seats or wrong refunds usually live in alternate/exception flows, which are easy to overlook", ja: "座席の二重予約や誤った返金といった重大バグは代替/例外フローに潜みやすく、見落とされやすいから" },
      { vi: "Vì luồng chính chạy chậm hơn luồng ngoại lệ", en: "Because the basic flow runs slower than exception flows", ja: "基本フローは例外フローより実行が遅いから" },
      { vi: "Vì khách hàng không bao giờ gặp luồng ngoại lệ", en: "Because customers never encounter exception flows", ja: "顧客が例外フローに遭遇することは決してないから" },
    ], correct: 1,
    explain: { vi: "Đội phát triển thường tập trung làm đúng luồng chính, dễ quên xử lý các nhánh thay thế/ngoại lệ — đúng nơi các lỗi nghiêm trọng nhất thường ẩn.", en: "Dev teams usually focus on getting the basic flow right and easily forget alternate/exception branches — exactly where the most serious bugs tend to hide.", ja: "開発チームは基本フローを正しく作ることに集中しがちで、代替/例外分岐の処理を忘れやすい——まさに最も重大なバグが潜む場所です。" },
  }),
  mcq({
    q: { vi: "Kết hợp Use Case Testing với dữ liệu biên (boundary value analysis) mang lại lợi ích gì?", en: "What benefit comes from combining use case testing with boundary value analysis?", ja: "Use Case Testingと境界値分析を組み合わせる利点は？" },
    options: [
      { vi: "Giúp bỏ qua luồng ngoại lệ để tiết kiệm thời gian", en: "Helps skip exception flows to save time", ja: "時間節約のため例外フローを省略できる" },
      { vi: "Kiểm tra từng LUỒNG tại đúng những giá trị dễ gây lỗi nhất, thay vì chỉ giá trị điển hình", en: "Tests each FLOW at exactly the values most likely to break it, instead of only typical values", ja: "各フローを典型的な値だけでなく、最もバグを起こしやすい値で検証できる" },
      { vi: "Thay thế hoàn toàn việc xác định actor và điều kiện", en: "Completely replaces identifying actors and conditions", ja: "アクターや条件の特定を完全に不要にする" },
      { vi: "Chỉ áp dụng được cho kiểm thử hiệu năng", en: "Only applicable to performance testing", ja: "性能テストにしか適用できない" },
    ], correct: 1,
    explain: { vi: "Use case cho biết TEST Ở BƯỚC NÀO; dữ liệu biên cho biết TEST VỚI GIÁ TRỊ NÀO — hai kỹ thuật bổ trợ, không thay thế nhau.", en: "Use cases tell you WHERE to test; boundary values tell you WHAT VALUES to test with — the two techniques complement, not replace, each other.", ja: "ユースケースは『どこでテストするか』を、境界値は『どの値でテストするか』を示す——両技法は互いを置き換えるのではなく補完し合います。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử theo Use Case (Use Case Testing) là kỹ thuật sinh ca kiểm thử trực tiếp từ đặc tả use case: tác nhân (actor), tiền điều kiện, hậu điều kiện, luồng chính (basic flow) và các luồng thay thế/ngoại lệ (alternate/exception flow). Bài này bám use case 'Đặt vé máy bay' của hệ thống SkyBooking (hãng hàng không SkyViet): bạn học cách đọc đặc tả use case, sinh ca từ từng luồng, kết hợp với dữ liệu biên, và tránh bẫy chỉ test luồng chính rồi bỏ sót lỗi bán trùng ghế hay hoàn tiền sai. Nhiều mockup thật, 2 tình huống thực tế và trắc nghiệm cuối bài.",
        "Use Case Testing is a technique that derives test cases directly from a use case specification: actors, preconditions, postconditions, the basic flow, and alternate/exception flows. This article follows the 'Book a flight' use case of SkyBooking, SkyViet Airlines' system: you learn to read a use case spec, derive cases from each flow, combine them with boundary-value data, and avoid the trap of only testing the basic flow and missing bugs like double-booked seats or wrong refunds. Real mockups, two real situations, and a quiz at the end.",
        "ユースケーステスト（Use Case Testing）とは、ユースケース仕様——アクター、事前条件、事後条件、基本フロー（basic flow）、代替/例外フロー（alternate/exception flow）——から直接テストケースを導き出す技法です。本記事はSkyViet航空のシステムSkyBookingにおける『航空券を予約する』ユースケースに沿い、ユースケース仕様の読み方、各フローからのケース導出、境界値データとの組み合わせ、そして基本フローだけをテストして座席の二重予約や誤った返金といったバグを見逃す罠を避ける方法を学びます。実物のモック、2つの実例、そして最後にクイズが付いています。"),
      P("Khi bạn mới học viết test case, phản xạ tự nhiên là chỉ test 'chuyện gì xảy ra khi mọi thứ suôn sẻ'. Nhưng một use case đầy đủ không chỉ có MỘT con đường — nó có một luồng chính (basic flow) mô tả kịch bản thành công điển hình, và nhiều luồng thay thế (alternate flow, vẫn dẫn tới thành công nhưng theo cách khác) cùng luồng ngoại lệ (exception flow, dẫn tới thất bại có kiểm soát). Use case testing chính là kỹ thuật đọc đặc tả này và sinh ra một bộ ca kiểm thử bao phủ đủ mọi nhánh, thay vì chỉ một đường thẳng. Chúng ta sẽ thực hành trên use case 'Đặt vé máy bay' của hệ thống SkyBooking — nơi bỏ sót một luồng ngoại lệ có thể khiến khách hàng mất tiền hoặc hãng bay bán trùng một chỗ ngồi.",
        "When you first learn to write test cases, the natural instinct is to test only 'what happens when everything goes smoothly'. But a complete use case doesn't have just ONE path — it has a basic flow describing the typical successful scenario, plus several alternate flows (still reaching success but by a different route) and exception flows (leading to controlled failure). Use case testing is exactly the technique of reading this spec and generating a test suite covering every branch, not just a single straight line. We'll practice on SkyBooking's 'Book a flight' use case — where missing one exception flow can make a customer lose money or the airline double-sell a seat.",
        "テストケースの書き方を学び始めたとき、自然な反応は『すべてが順調に進んだ場合』だけをテストすることです。しかし完全なユースケースには1本の経路しかないわけではありません——典型的な成功シナリオを表す基本フロー（basic flow）に加え、別の経路をたどりつつ成功に至る代替フロー（alternate flow）や、制御された失敗に至る例外フロー（exception flow）が複数存在します。ユースケーステストとは、まさにこの仕様を読み解き、1本の直線ではなく全ての分岐を網羅するテストスイートを生成する技法です。本記事ではSkyBookingの『航空券を予約する』ユースケースで実践します——1つの例外フローの見落としが、顧客の金銭損失や座席の二重販売を招く場所です。"),
      IMG(m_booking, "Màn hình test: đặt vé SkyBooking, khoanh vùng luồng thay thế (phụ phí ghế) và luồng ngoại lệ (hết ghế khi thanh toán)", "Screen under test: SkyBooking's booking flow, highlighting an alternate flow (seat surcharge) and an exception flow (seat taken during payment)", "テスト対象画面：SkyBookingの予約フロー、代替フロー（座席追加料金）と例外フロー（決済中の座席消失）を強調表示"),
      DEF("Use Case", "một mô tả có cấu trúc về cách một tác nhân (actor) tương tác với hệ thống để đạt một mục tiêu cụ thể, gồm tiền điều kiện, hậu điều kiện, luồng chính và các luồng thay thế/ngoại lệ.",
        "a structured description of how an actor interacts with a system to achieve a specific goal, including preconditions, postconditions, the basic flow, and alternate/exception flows.",
        "アクターが特定の目標を達成するためにシステムとどう対話するかを構造的に記述したもので、事前条件・事後条件・基本フロー・代替/例外フローを含む。"),
    ] },
  { heading: { vi: "2. Thành phần của một Use Case: tác nhân, tiền/hậu điều kiện, luồng chính", en: "2. Anatomy of a use case: actors, pre/postconditions, basic flow", ja: "2. ユースケースの構成要素：アクター、事前/事後条件、基本フロー" },
    blocks: [
      P("Use case 'Đặt vé máy bay' của SkyBooking có ba tác nhân: Hành khách (chủ động thực hiện use case), Cổng thanh toán (hệ thống ngoài, xác thực và trừ tiền), và Dịch vụ quản lý ghế (hệ thống nội bộ khóa/nhả ghế theo thời gian thực). Tiền điều kiện (precondition) là điều kiện PHẢI đúng trước khi use case bắt đầu: hành khách đã đăng nhập, đã tìm kiếm và chọn một chuyến bay còn ghế trống. Hậu điều kiện (postcondition) là trạng thái hệ thống PHẢI đạt được sau khi use case kết thúc — và quan trọng, hậu điều kiện cần được đặc tả cho CẢ kết quả thành công lẫn thất bại, không chỉ trường hợp suôn sẻ.",
        "SkyBooking's 'Book a flight' use case has three actors: the Passenger (who actively performs the use case), the Payment Gateway (an external system that authenticates and charges), and the Seat Inventory Service (an internal system locking/releasing seats in real time). The precondition is what MUST be true before the use case starts: the passenger is logged in and has searched and selected a flight with available seats. The postcondition is the system state that MUST be reached after the use case ends — and importantly, postconditions must be specified for BOTH success and failure, not just the smooth case.",
        "SkyBookingの『航空券を予約する』ユースケースには3つのアクターがあります：乗客（ユースケースを主体的に実行する）、決済ゲートウェイ（認証と課金を行う外部システム）、座席在庫サービス（座席をリアルタイムでロック/解放する内部システム）。事前条件は、ユースケース開始前に成立していなければならない条件です：乗客がログイン済みで、空席のあるフライトを検索・選択済みであること。事後条件は、ユースケース終了後にシステムが到達すべき状態です——重要なのは、順調なケースだけでなく成功・失敗の両方について事後条件を定義する必要があることです。"),
      IMG(m_usecase, "Bảng đặc tả đầy đủ use case 'Đặt vé máy bay': basic flow, alternate flow (A1–A3), exception flow (E1–E4)", "Full specification of the 'Book a flight' use case: basic flow, alternate flows (A1–A3), exception flows (E1–E4)", "『航空券予約』ユースケースの完全な仕様：基本フロー、代替フロー（A1〜A3）、例外フロー（E1〜E4）"),
      P("Luồng chính (basic flow) của use case này là: chọn chuyến bay và ghế → nhập thông tin hành khách → hệ thống tính tổng tiền → hành khách xác nhận thanh toán → cổng thanh toán trả về thành công → hệ thống tạo vé, khóa ghế, gửi email xác nhận kèm mã đặt chỗ (PNR). Đây là 'đường đi mặc định' mà mọi luồng thay thế và luồng ngoại lệ đều RẼ RA từ một bước cụ thể trong đó — nắm chắc luồng chính giúp bạn xác định chính xác điểm rẽ nhánh khi phân tích các luồng còn lại.",
        "This use case's basic flow is: select flight and seat → enter passenger information → the system calculates the total → the passenger confirms payment → the payment gateway returns success → the system creates the ticket, locks the seat, and sends a confirmation email with the booking reference (PNR). This is the 'default path' that every alternate and exception flow BRANCHES OFF from at a specific step — mastering the basic flow helps you pinpoint exactly where each remaining flow diverges.",
        "このユースケースの基本フローは：フライトと座席を選択→乗客情報を入力→システムが合計金額を計算→乗客が決済を確認→決済ゲートウェイが成功を返す→システムがチケットを作成し座席をロックし、予約番号（PNR）付きの確認メールを送信、です。これは『デフォルトの経路』であり、全ての代替フローと例外フローはこの中の特定のステップから分岐します——基本フローを押さえることで、残りの各フローがどこで分岐するかを正確に特定できます。"),
      DEF("Tiền điều kiện / Hậu điều kiện", "tiền điều kiện là điều kiện bắt buộc đúng TRƯỚC khi use case chạy; hậu điều kiện là trạng thái hệ thống bắt buộc đúng SAU khi use case kết thúc, dù thành công hay thất bại.",
        "a precondition is a condition that must hold TRUE BEFORE the use case runs; a postcondition is the system state that must hold true AFTER it ends, whether it succeeds or fails.",
        "事前条件はユースケース実行前に成立しているべき条件、事後条件は成功・失敗を問わずユースケース終了後にシステムが満たすべき状態。"),
    ] },
  { heading: { vi: "3. Vì sao Use Case Testing đặc biệt quan trọng ở hệ thống đặt vé máy bay", en: "3. Why use case testing matters especially for a flight-booking system", ja: "3. 航空券予約システムでユースケーステストが特に重要な理由" },
    blocks: [
      P("Hệ thống đặt vé máy bay là nơi hội tụ ba đặc điểm khiến các lỗi ngoài luồng chính trở nên nguy hiểm bất thường. Thứ nhất, có TÀI NGUYÊN GIỚI HẠN dùng chung (ghế trên chuyến bay) mà nhiều hành khách có thể tranh chấp cùng lúc — đây chính là nguồn gốc của các lỗi điều kiện đua (race condition) như bán trùng ghế. Thứ hai, có NHIỀU TÁC NHÂN phối hợp trong cùng một use case (hành khách, cổng thanh toán, dịch vụ quản lý ghế), và một lỗi đồng bộ giữa các tác nhân này (ví dụ: đã trừ tiền nhưng chưa khóa ghế kịp) có thể để lại trạng thái dữ liệu không nhất quán rất khó phát hiện qua kiểm thử hời hợt.",
        "A flight-booking system combines three traits that make out-of-basic-flow bugs unusually dangerous. First, there's a SHARED LIMITED RESOURCE (seats on a flight) multiple passengers can contend for at once — the root cause of race-condition bugs like double-selling a seat. Second, MULTIPLE ACTORS coordinate within a single use case (passenger, payment gateway, seat inventory service), and a sync bug between them (e.g. money charged but the seat not locked in time) can leave an inconsistent data state that's very hard to catch with shallow testing.",
        "航空券予約システムには、基本フロー外のバグを異常に危険にする3つの特徴が集約されています。第一に、複数の乗客が同時に争奪し得る共有の限られたリソース（フライトの座席）があり、これが座席の二重販売のような競合状態（race condition）バグの根本原因です。第二に、1つのユースケース内で複数のアクター（乗客、決済ゲートウェイ、座席在庫サービス）が連携し、それらの間の同期バグ（例：課金は完了したが座席のロックが間に合わない）は、表面的なテストでは非常に発見しづらいデータ不整合状態を残します。"),
      P("Thứ ba, mỗi bước trong luồng đều CHẠM TIỀN THẬT — giá vé, phụ phí ghế, mã giảm giá, phí hủy vé — nên một lỗi ở nhánh ít được để ý (như luồng hủy vé hoàn tiền) có thể gây thất thoát tài chính lặp lại trên hàng nghìn giao dịch trước khi bị phát hiện. Vì ba lý do này, một use case tưởng đơn giản như 'Đặt vé máy bay' thực chất chứa nhiều nhánh rủi ro cao hơn hẳn so với một form nhập liệu thông thường, và xứng đáng được phân tích kỹ bằng use case testing thay vì chỉ lướt qua luồng chính rồi coi là 'đã test đủ'.",
        "Third, every step in the flow TOUCHES REAL MONEY — ticket price, seat surcharge, discount code, cancellation fee — so a bug in a less-watched branch (like the cancel-and-refund flow) can repeat financial loss across thousands of transactions before it's caught. For these three reasons, a use case that looks as simple as 'Book a flight' actually contains far more high-risk branches than an ordinary input form, and deserves careful use case testing rather than a quick pass over the basic flow deemed 'good enough'.",
        "第三に、フロー内の全ステップが実際の金銭——運賃、座席追加料金、割引コード、キャンセル料——に触れるため、あまり注目されない分岐（キャンセル・返金フローなど）のバグは、発見されるまでに何千もの取引で財務損失を繰り返す可能性があります。この3つの理由から、『航空券を予約する』のような一見単純なユースケースには、通常の入力フォームよりはるかに多くの高リスク分岐が含まれており、基本フローをざっと流して『十分テストした』と見なすのではなく、ユースケーステストで丁寧に分析する価値があります。"),
      P("Đây cũng là lý do use case testing thường được xem là kỹ thuật 'trưởng thành' hơn hẳn so với việc chỉ viết test case theo từng trường dữ liệu: nó buộc tester tư duy theo TRÌNH TỰ TƯƠNG TÁC thay vì từng ô nhập rời rạc, và chính trình tự đó — chứ không phải giá trị nhập vào — mới là nơi các lỗi nghiêm trọng nhất của hệ thống đặt vé thường ẩn náu.",
        "This is also why use case testing is often seen as a more 'mature' technique than writing test cases field by field: it forces the tester to think in terms of an INTERACTION SEQUENCE rather than isolated input boxes, and it's exactly that sequence — not the values entered — where a booking system's most serious bugs usually hide.",
        "これが、use case testingが1項目ずつテストケースを書くよりも『成熟した』技法とみなされる理由でもあります：テスターに個々の入力欄ではなく相互作用の順序で考えることを強い、まさにその順序こそが——入力値ではなく——予約システムの最も重大なバグが潜みがちな場所なのです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: xác định actor, tiền/hậu điều kiện & luồng chính", en: "4. Prepare: identify actors, pre/postconditions & the basic flow", ja: "4. 準備：アクター、事前/事後条件、基本フローの特定" },
    blocks: [
      P("Trước khi sinh bất kỳ ca kiểm thử nào, bạn cần một đặc tả use case đủ rõ ràng. Nếu tài liệu nghiệp vụ chưa viết sẵn dưới dạng use case, việc đầu tiên của tester là TỰ DỰNG lại nó từ yêu cầu rời rạc và phỏng vấn nhanh BA/PO.",
        "Before generating any test case, you need a sufficiently clear use case specification. If the business documentation isn't already written as a use case, the tester's first job is to RECONSTRUCT it from scattered requirements and a quick chat with BA/PO.",
        "テストケースを生成する前に、十分明確なユースケース仕様が必要です。業務資料がまだユースケース形式で書かれていない場合、テスターの最初の仕事は断片的な要件やBA/POへの簡単なヒアリングから仕様を再構築することです。"),
      STEP(1, "Liệt kê mọi tác nhân tham gia use case (Hành khách, Cổng thanh toán, Dịch vụ quản lý ghế...) và vai trò cụ thể của từng tác nhân.", "List every actor involved in the use case (Passenger, Payment Gateway, Seat Inventory Service...) and each one's specific role.", "ユースケースに関わる全アクター（乗客、決済ゲートウェイ、座席在庫サービスなど）とそれぞれの具体的な役割を列挙する。"),
      STEP(2, "Viết rõ tiền điều kiện (trạng thái bắt buộc trước khi bắt đầu) và hậu điều kiện thành công/thất bại (trạng thái bắt buộc sau khi kết thúc).", "Write the precondition (state required before starting) and success/failure postconditions (state required after ending) explicitly.", "事前条件（開始前に必要な状態）と成功/失敗時の事後条件（終了後に必要な状態）を明確に記述する。"),
      STEP(3, "Viết luồng chính từng bước một, đánh số rõ ràng (bước 1, 2, 3...) — đây sẽ là 'xương sống' để gắn các luồng thay thế/ngoại lệ vào đúng vị trí.", "Write the basic flow step by step, clearly numbered (step 1, 2, 3...) — this becomes the 'backbone' onto which alternate/exception flows are attached at the right point.", "基本フローを番号付き（ステップ1、2、3…）で1つずつ書く——これが代替/例外フローを正しい位置に紐付ける『背骨』になる。"),
      TRY("Với use case 'Đặt vé máy bay' của SkyBooking, tự viết lại tiền điều kiện và hậu điều kiện THẤT BẠI (khi thanh toán bị từ chối) — điều gì PHẢI đúng về trạng thái ghế và tiền của hành khách?", "For SkyBooking's 'Book a flight' use case, write the FAILURE postcondition yourself (when payment is declined) — what must be true about the seat's state and the passenger's money?", "SkyBookingの『航空券予約』ユースケースについて、失敗時（決済拒否時）の事後条件を自分で書いてみよう——座席の状態と乗客の資金についてどうあるべきか？"),
      PITFALL("Chỉ viết hậu điều kiện cho trường hợp THÀNH CÔNG rồi bỏ qua hậu điều kiện thất bại — dẫn tới không có tiêu chí rõ ràng để kiểm tra 'ghế có bị khóa nhầm không' hay 'tiền có bị trừ nhầm không' khi luồng thất bại.", "Only writing the SUCCESS postcondition and skipping the failure one — leaving no clear criteria to check whether the seat got wrongly locked or the money got wrongly charged when a flow fails.", "成功時の事後条件だけを書き、失敗時の事後条件を省略してしまう——フロー失敗時に『座席が誤ってロックされていないか』『お金が誤って引き落とされていないか』を検証する明確な基準がなくなる。"),
      IMG(m_flow, "Sơ đồ luồng use case 'Đặt vé máy bay': luồng chính (trên) và các nhánh rẽ ngoại lệ E1–E3 (dưới)", "Flow diagram of the 'Book a flight' use case: basic flow (top) and exception branches E1–E3 (bottom)", "『航空券予約』ユースケースのフロー図：基本フロー（上）と例外分岐E1〜E3（下）"),
    ] },
  { heading: { vi: "5. Sinh ca kiểm thử từ từng luồng (thực hành)", en: "5. Deriving test cases from each flow (hands-on)", ja: "5. 各フローからテストケースを導出する（実習）" },
    blocks: [
      P("Với đặc tả use case đã có ở chương 2 và 4, giờ ta chuyển từng dòng trong bảng thành ít nhất một ca kiểm thử cụ thể — có bước thực hiện và kết quả mong đợi rõ ràng, không mơ hồ.",
        "With the use case specification from chapters 2 and 4, we now turn each row of the table into at least one concrete test case — with clear steps and an unambiguous expected result.",
        "第2章と第4章のユースケース仕様をもとに、表の各行を少なくとも1つの具体的なテストケース——明確な手順と曖昧さのない期待結果を持つもの——に変換します。"),
      STEP(1, "Với Basic Flow, viết 1 ca kiểm thử đi trọn vẹn từ bước đầu tới bước cuối bằng dữ liệu hợp lệ điển hình — đây là ca 'must-pass' trước mọi ca khác.", "For the Basic Flow, write one test case that goes end-to-end using typical valid data — this is the 'must-pass' case before any other.", "基本フローについて、典型的な有効データで最初から最後まで通しで実行する1つのテストケースを書く——これは他の何より優先される『合格必須』ケース。"),
      STEP(2, "Với mỗi Alternate flow (A1–A3), viết 1 ca kiểm thử bắt đầu giống basic flow rồi RẼ đúng ở bước được đặc tả, kiểm tra kết quả tại điểm rẽ đó.", "For each Alternate flow (A1–A3), write one test case that starts like the basic flow then DIVERGES exactly at the specified step, checking the outcome at that divergence.", "各代替フロー（A1〜A3）について、基本フローと同様に開始し、指定されたステップで正確に分岐するテストケースを書き、その分岐点での結果を検証する。"),
      STEP(3, "Với mỗi Exception flow (E1–E4), viết 1 ca kiểm thử tạo đúng điều kiện bất thường (ví dụ mở 2 tab cùng chọn 1 ghế) rồi xác nhận hậu điều kiện thất bại đúng như đặc tả — không có tác dụng phụ (side effect) sót lại.", "For each Exception flow (E1–E4), write one test case that creates exactly the abnormal condition (e.g. two tabs picking the same seat) then confirms the failure postcondition matches the spec — no leftover side effects.", "各例外フロー（E1〜E4）について、まさにその異常条件（例：2つのタブで同じ座席を選ぶ）を作り出し、仕様どおりの失敗時事後条件——副作用が残っていないこと——を確認するテストケースを書く。"),
      STEP(4, "Đối chiếu lại: mỗi hàng của bảng đặc tả (chương 2) đã có ít nhất 1 ca kiểm thử tương ứng chưa? Nếu thiếu hàng nào, bổ sung ngay trước khi coi là bộ ca 'đủ bao phủ luồng'.", "Cross-check: does every row of the specification table (chapter 2) have at least one corresponding test case? If any row is missing, add it before calling the suite 'flow-complete'.", "照合：仕様表（第2章）の各行に対応するテストケースが少なくとも1つあるか？欠けている行があれば、『フロー網羅完了』とみなす前に追加する。"),
      CODE("text", "CA KIEM THU SINH TU USE CASE 'DAT VE MAY BAY' (trich)\nTC-01 [Basic Flow] Dat 1 ghe thuong, thanh toan the noi dia -> tao ve + PNR, ghe khoa, email gui\nTC-02 [A1] Chon ghe Extra Legroom -> tong tien cong dung phu phi\nTC-04 [E1] 2 tab cung chon 1 ghe, tab 2 xac nhan truoc -> tab 1 bi chan, KHONG bi tru tien\nTC-05 [E2] The het han muc luc xac nhan thanh toan -> khong tao ve, ghe nha lai ngay\nTC-06 [E3] Dong tab o buoc nhap thong tin hanh khach -> ghe tu nha sau 15 phut giu cho"),
      IMG(m_testcases, "Bảng ca kiểm thử sinh từ từng luồng của use case 'Đặt vé máy bay' (trích)", "Test cases derived from each flow of the 'Book a flight' use case (excerpt)", "『航空券予約』ユースケースの各フローから導出したテストケース（抜粋）"),
      TRY("Viết thêm 1 ca kiểm thử cho luồng A2 (áp mã giảm giá) mà bảng trên chưa có, kèm dữ liệu cụ thể và kết quả mong đợi rõ ràng.", "Write one more test case for flow A2 (applying a discount code) not shown in the table above, with concrete data and a clear expected result.", "上の表にない代替フローA2（割引コード適用）のテストケースをもう1つ、具体的なデータと明確な期待結果とともに書いてみよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ test luồng chính, bỏ sót luồng hết ghế khi thanh toán", en: "6. Situation 1: testing only the basic flow misses the seat-taken-during-payment case", ja: "6. シーン1：基本フローのみのテストで決済中の座席消失を見逃す" },
    blocks: [
      SITUATION("Trước khi ra mắt SkyBooking, đội QA chỉ chạy đầy đủ ca kiểm thử cho Basic Flow — đặt vé thành công với dữ liệu hợp lệ — vì lịch release gấp và luồng ngoại lệ E1 (ghế bị đặt trước lúc xác nhận) bị coi là 'hiếm khi xảy ra thực tế'.", "Before SkyBooking's launch, the QA team only ran the full test suite for the Basic Flow — a successful booking with valid data — because the release schedule was tight and exception flow E1 (seat taken right at confirmation) was seen as 'rare in practice'.",
        "Sau khi ra mắt vào mùa cao điểm Tết, hai hành khách cùng đặt ghế 14C trên cùng chuyến bay gần như đồng thời; cả hai giao dịch đều được xác nhận thành công, một người bị trừ tiền nhưng không có chỗ ngồi khi ra sân bay — dẫn tới khiếu nại và ticket SKY-8821 mức Critical.",
        "After launching during the peak Tet season, two passengers booked seat 14C on the same flight almost simultaneously; both transactions were confirmed successful, and one passenger was charged but had no seat when arriving at the airport — leading to a complaint and Critical ticket SKY-8821.",
        "SkyBookingのリリース前、QAチームはリリーススケジュールが逼迫していたため基本フロー（有効データでの予約成功）のテストスイートのみを完全に実行し、例外フローE1（決済確認直前の座席消失）は『実際にはめったに起きない』とみなされた。",
        "テト（旧正月）の繁忙期にリリース後、2人の乗客がほぼ同時に同じ便の座席14Cを予約。両方の取引が成功として確認され、1人は課金されたにもかかわらず空港到着時に座席がなく、苦情とCriticalチケットSKY-8821につながった。"),
      SOLVE("Bổ sung ngay ca kiểm thử cho Exception E1 (nhiều hành khách cùng chọn một ghế gần như đồng thời) vào bộ hồi quy bắt buộc, đồng thời đề xuất backend khóa ghế (lock) ở đúng thời điểm hành khách chọn ghế thay vì chỉ lúc thanh toán thành công, và cho tester kiểm tra kỹ hậu điều kiện thất bại: giao dịch thua cuộc không được trừ tiền.", "Immediately add a test case for Exception E1 (multiple passengers picking the same seat almost simultaneously) to the mandatory regression suite, propose the backend lock the seat right when a passenger selects it rather than only after payment succeeds, and have testers strictly verify the failure postcondition: the losing transaction must not be charged.", "例外E1（複数の乗客がほぼ同時に同じ座席を選ぶ）のテストケースを直ちに必須回帰テストスイートに追加し、バックエンドが決済成功時ではなく座席選択時点で座席をロックするよう提案し、テスターには失敗時の事後条件——負けた取引には課金されないこと——を厳密に検証させる。"),
      P("Bài học ở đây không phải là 'đội QA lười' — mà là minh chứng rõ ràng cho việc chỉ chạy đủ ca cho Basic Flow tạo CẢM GIÁC AN TOÀN GIẢ, trong khi những lỗi gây thiệt hại thật lại nằm ở các nhánh 'hiếm khi xảy ra' đó. Với hệ thống có tài nguyên giới hạn dùng chung như ghế máy bay, việc coi nhẹ một luồng ngoại lệ vì 'xác suất thấp' là đánh giá sai bản chất: xác suất có thể thấp trên MỘT chuyến bay, nhưng nhân với hàng nghìn chuyến bay mỗi ngày thì lại là một sự kiện gần như chắc chắn xảy ra.",
        "The lesson here isn't 'the QA team was lazy' — it's clear proof that fully testing only the Basic Flow creates a FALSE SENSE OF SAFETY, while the bugs causing real damage sit in those 'rarely occurring' branches. For a system with a shared limited resource like flight seats, dismissing an exception flow because of 'low probability' misjudges its true nature: the probability may be low on ONE flight, but multiplied across thousands of flights per day, it becomes an almost certain event.",
        "ここでの教訓は『QAチームが怠けていた』ということではなく、基本フローだけを完全にテストすることが虚偽の安心感を生み出す一方、実際に被害をもたらすバグはまさにその『めったに起きない』分岐に潜んでいるという明確な証拠です。航空機の座席のような共有の限られたリソースを持つシステムでは、『確率が低い』という理由で例外フローを軽視するのは本質を見誤っています：1便あたりの確率は低くても、1日に何千便もあることを掛け合わせれば、ほぼ確実に発生する事象になるのです。"),
      IMG(m_jira1, "Ticket lỗi tìm được vì bỏ sót luồng ngoại lệ E1: ghế 14C bị bán trùng khi 2 hành khách xác nhận gần như đồng thời", "Bug ticket found from missing exception flow E1: seat 14C double-sold when 2 passengers confirm almost simultaneously", "例外フローE1の見落としで見つかったバグチケット：2人の乗客がほぼ同時に確認し座席14Cが二重販売された"),
      RECAP(["Chỉ đủ ca cho Basic Flow KHÔNG đồng nghĩa hệ thống an toàn", "Xác suất thấp trên 1 lần chạy có thể là chắc chắn xảy ra khi nhân với quy mô thật"],
        ["Fully covering only the Basic Flow does NOT mean the system is safe", "A low probability on one run can become near-certain at real-world scale"],
        ["基本フローだけを完全にカバーしてもシステムが安全とは限らない", "1回あたりは低確率でも、実際の規模で見るとほぼ確実に発生し得る"]),
    ] },
  { heading: { vi: "7. Tình huống 2: luồng hủy vé hoàn tiền tính sai mốc phí hủy", en: "7. Situation 2: the cancel-and-refund flow miscalculates the cancellation fee tier", ja: "7. シーン2：キャンセル・返金フローがキャンセル料の区分を誤算する" },
    blocks: [
      SITUATION("Use case phụ 'Hủy vé' của SkyBooking có 2 mốc phí hủy: 10% nếu hủy trước giờ bay từ 72 giờ trở lên, 30% nếu hủy trong khoảng 24–72 giờ trước giờ bay. Đội chỉ test luồng chính (hủy sớm, áp mốc 10%) rồi coi mốc 30% là 'chỉ đổi con số, không cần test kỹ'.", "SkyBooking's 'Cancel Ticket' sub-use-case has two cancellation-fee tiers: 10% if cancelled 72+ hours before departure, 30% if cancelled 24–72 hours before departure. The team only tested the basic flow (cancelling early, applying the 10% tier) and treated the 30% tier as 'just a different number, no need to test thoroughly'.",
        "Trên staging, vé PNR7X2K1 bị hủy lúc còn 20 giờ trước giờ bay — đúng lẽ phải áp phí hủy 30% — nhưng hệ thống vẫn áp nhầm mốc 10% do điều kiện so sánh giờ bị lệch múi giờ, khiến hoàn tiền dư 300.000đ mỗi vé, dẫn tới ticket SKY-9014 mức Critical.",
        "On staging, ticket PNR7X2K1 was cancelled with 20 hours left before departure — which should apply the 30% fee — but the system still wrongly applied the 10% tier due to a timezone-shifted comparison condition, over-refunding 300,000đ per ticket, leading to Critical ticket SKY-9014.",
        "SkyBookingの『チケットキャンセル』サブユースケースには2つのキャンセル料区分がある：出発72時間以上前のキャンセルは10%、出発24〜72時間前のキャンセルは30%。チームは基本フロー（早期キャンセル、10%区分の適用）のみをテストし、30%区分は『数値が違うだけでテスト不要』とみなした。",
        "ステージング環境で、チケットPNR7X2K1が出発20時間前にキャンセルされた——本来30%の手数料が適用されるべきだが、タイムゾーンのずれた比較条件により誤って10%区分が適用され、1枚あたり300,000ドンの過剰返金が発生し、CriticalチケットSKY-9014につながった。"),
      SOLVE("Coi mốc chuyển tiếp giữa hai mức phí hủy (đúng 24 giờ và 72 giờ trước giờ bay) là một EXCEPTION FLOW riêng cần test kỹ bằng giá trị biên (23h59, 24h00, 24h01, 71h59, 72h00, 72h01), báo bug Critical kèm công thức đúng, và bổ sung ca kiểm thử múi giờ vào bộ hồi quy vì đây là nguyên nhân gốc.", "Treat the transition point between the two fee tiers (exactly 24 hours and 72 hours before departure) as its own EXCEPTION FLOW requiring thorough boundary-value testing (23h59, 24h00, 24h01, 71h59, 72h00, 72h01), report a Critical bug with the correct formula, and add timezone test cases to the regression suite since that's the root cause.", "2つの手数料区分の境界点（出発の24時間前と72時間前ちょうど）を、境界値（23時59分、24時00分、24時01分、71時59分、72時00分、72時01分）で丁寧にテストすべき独立した例外フローとして扱い、正しい計算式とともにCriticalバグを報告し、根本原因であるタイムゾーンのテストケースを回帰テストスイートに追加する。"),
      P("Ví dụ này mở rộng bài học ở chương 6 sang một dạng lỗi khác: không phải mọi luồng ngoại lệ đều là 'tình huống hiếm' như tranh chấp ghế — có những luồng ngoại lệ nằm ngay trong LOGIC TÍNH TOÁN của chính use case (ở đây là điều kiện rẽ nhánh theo mốc thời gian). Khi một use case có nhiều nhánh phụ thuộc điều kiện thời gian hoặc số tiền, mỗi mốc chuyển tiếp giữa các nhánh nên được xem là một luồng riêng cần đặc tả rõ hậu điều kiện và kiểm bằng dữ liệu biên — đúng như cách kết hợp use case testing với boundary value analysis đã nói ở chương 8 sau đây.",
        "This example extends chapter 6's lesson to a different bug shape: not every exception flow is a 'rare situation' like a seat conflict — some exception flows live right inside the use case's own CALCULATION LOGIC (here, a time-based branching condition). When a use case has several branches depending on time or money thresholds, every transition point between branches should be treated as its own flow needing a clearly specified postcondition and boundary-value testing — exactly the combination of use case testing with boundary value analysis covered in chapter 8 next.",
        "この例は第6章の教訓を別のバグの形へと広げます：全ての例外フローが座席の競合のような『稀な状況』とは限らず、一部の例外フローはユースケース自体の計算ロジック（ここでは時間に基づく分岐条件）の内部に存在します。ユースケースが時間や金額のしきい値に依存する複数の分岐を持つ場合、分岐間の各遷移点は、明確な事後条件と境界値テストを必要とする独自のフローとして扱うべきです——これはまさに次の第8章で扱う、use case testingと境界値分析の組み合わせです。"),
      IMG(m_jira2, "Ticket SKY-9014: hủy vé PNR7X2K1 hoàn tiền dư 300.000đ do sai mốc chuyển tiếp phí hủy 24 giờ/72 giờ", "Ticket SKY-9014: cancelling PNR7X2K1 over-refunds 300,000đ due to the wrong 24h/72h fee-tier transition", "チケットSKY-9014：24時間/72時間の手数料区分の遷移点誤りによりPNR7X2K1のキャンセルで300,000ドンの過剰返金"),
      TRY("Nghĩ thêm một mốc chuyển tiếp thời gian/tiền khác trong use case đặt vé hoặc hủy vé (ví dụ mốc giữ ghế 15 phút, mốc hoàn tiền 0đ) và đề xuất các giá trị biên cần test cho mốc đó.", "Think of another time/money transition point in the booking or cancellation use case (e.g. the 15-minute seat-hold cutoff, a 0đ refund threshold) and propose boundary values to test at that point.", "予約またはキャンセルユースケースにおける別の時間/金額の遷移点（例：15分の座席保持期限、返金額0ドンのしきい値）を考え、そのポイントでテストすべき境界値を提案しよう。"),
    ] },
  { heading: { vi: "8. Kết hợp Use Case Testing với dữ liệu biên (boundary values)", en: "8. Combining use case testing with boundary values", ja: "8. Use Case Testingと境界値の組み合わせ" },
    blocks: [
      P("Use case testing rất giỏi trả lời câu hỏi 'cần test những LUỒNG nào', nhưng tự nó không nói cho bạn biết nên nhập GIÁ TRỊ gì ở mỗi bước. Đây chính là lúc kết hợp với phân tích giá trị biên (boundary value analysis): với mỗi bước của luồng có liên quan tới số, thời gian hoặc tiền, hãy tìm ranh giới hợp lệ/không hợp lệ của nó và test đúng tại ranh giới đó — thay vì chỉ một giá trị 'điển hình' an toàn.",
        "Use case testing is great at answering 'which FLOWS need testing', but on its own it doesn't tell you what VALUES to enter at each step. This is exactly where boundary value analysis comes in: for every flow step involving numbers, time, or money, find its valid/invalid boundary and test right at that boundary — instead of only a 'typical', safe value.",
        "Use case testingは『どのフローをテストすべきか』に答えるのは得意ですが、それ単体では各ステップでどんな値を入力すべきかまでは教えてくれません。まさにここで境界値分析（boundary value analysis）の出番です：数値・時間・金額に関わる各フローステップについて、有効/無効の境界を見つけ、安全な『典型的』な値だけでなく、まさにその境界でテストします。"),
      IMG(m_boundary, "Kết hợp Use Case Testing với dữ liệu biên: mỗi luồng có bộ giá trị biên riêng cần test", "Combining use case testing with boundary values: each flow has its own set of boundary values to test", "Use Case Testingと境界値の組み合わせ：各フローには固有のテストすべき境界値セットがある"),
      TIP("Ưu tiên tìm giá trị biên ở những bước liên quan TIỀN hoặc THỜI GIAN CÓ HẠN (mốc giữ ghế, mốc phí hủy) trước — đây là nơi một lệch giá trị nhỏ (1 giây, 1 đồng) cũng có thể đổi hoàn toàn kết quả nghiệp vụ, như tình huống 2 vừa nêu.", "Prioritize finding boundary values at steps involving MONEY or TIME-LIMITED WINDOWS (seat-hold cutoff, fee tier) first — that's where a tiny value shift (1 second, 1 currency unit) can completely change the business outcome, as in situation 2 above.", "まず金額や期限付きの時間（座席保持期限、手数料区分）に関わるステップの境界値を優先的に見つけよう——わずかな値のずれ（1秒、1単位）でも業務結果が完全に変わり得る場所であり、上記シーン2の通りです。"),
    ] },
  { heading: { vi: "9. Bao phủ đầy đủ, theo dõi kết quả & lỗi hay gặp", en: "9. Full coverage, tracking results & common mistakes", ja: "9. 完全な網羅、結果の追跡、よくある失敗" },
    blocks: [
      P("Một bộ ca kiểm thử sinh từ use case chỉ thực sự đáng tin nếu bạn theo dõi được ca nào đã chạy, ca nào tìm ra lỗi, và lỗi tập trung ở luồng nào — để lần sau biết nên đầu tư kỹ hơn ở đâu.",
        "A test suite derived from a use case is only truly trustworthy if you can track which cases ran, which found bugs, and which flow the bugs cluster around — so next time you know where to invest more scrutiny.",
        "ユースケースから導出したテストスイートは、どのケースが実行され、どれがバグを見つけ、バグがどのフローに集中しているかを追跡できて初めて本当に信頼できます——次回どこにより注力すべきかが分かります。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua Use Case Testing (SkyBooking · Sprint đặt vé)", "A board tracking bugs found via use case testing (SkyBooking · booking sprint)", "Use Case Testingで見つかったバグの追跡ボード（SkyBooking・予約スプリント）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi Critical đến từ luồng alternate/exception, không phải basic flow", "Metrics: most Critical bugs come from alternate/exception flows, not the basic flow", "指標：Criticalバグの大半は基本フローではなく代替/例外フローから見つかっている"),
      PITFALL("Coi bộ ca đã 'đủ' chỉ vì đếm đủ số lượng ca mong muốn, mà không đối chiếu lại từng ca với từng dòng trong bảng đặc tả use case — dễ để lọt một luồng ngoại lệ quan trọng như tình huống 1 và 2 đã nêu.", "Deeming a suite 'complete' just because it hits a target case count, without cross-checking each case against every row of the use case spec table — easily letting an important exception flow slip through, as in situations 1 and 2 above.", "目標ケース数に達しただけで『十分』とみなし、各ケースをユースケース仕様表の各行と照合しない——上記シーン1・2のように重要な例外フローを見逃しやすい。"),
      TIP("Khi thời gian có hạn, ưu tiên chạy đủ ca cho luồng liên quan TIỀN và TÀI NGUYÊN GIỚI HẠN (ghế) trước — đó là nơi số liệu ở dashboard trên cho thấy phần lớn lỗi Critical thực sự nằm.", "When time is short, prioritize running enough cases for flows tied to MONEY and a LIMITED RESOURCE (seats) first — that's exactly where the dashboard above shows most Critical bugs actually sit.", "時間が限られる場合は、まず金額と限られたリソース（座席）に関わるフローのケースを優先的に実行しよう——上記ダッシュボードが示す通り、実際にはCriticalバグの大半がそこにある。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Phân tích yêu cầu để viết test case cho người mới", "Requirement analysis for writing test cases for beginners", "doc-phan-tich-yeu-cau-de-viet-test-case-cho-nguoi-moi", "初心者のための要件分析からのテストケース作成"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
      INTERNAL("Bảng quyết định (Decision Table) cho Tester", "Decision tables for testers", "bang-quyet-dinh-decision-table-cho-tester", "テスターのためのデシジョンテーブル"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách sinh ca kiểm thử từ đặc tả use case 'Đặt vé máy bay' của hệ thống SkyBooking: xác định tác nhân, tiền/hậu điều kiện, luồng chính (basic flow), luồng thay thế (alternate flow) và luồng ngoại lệ (exception flow); cách chuyển từng luồng thành ca kiểm thử cụ thể; và hai tình huống thật cho thấy chỉ test luồng chính dễ bỏ sót lỗi bán trùng ghế hay hoàn tiền sai. Bạn cũng biết cách kết hợp use case testing với dữ liệu biên để mỗi luồng được test ở đúng giá trị dễ gây lỗi nhất. Đây là kỹ thuật thiết kế ca kiểm thử ở mức nâng cao, giúp bạn bao phủ hệ thống có nhiều tác nhân và nhiều trạng thái kỹ hơn hẳn so với chỉ liệt kê yêu cầu rời rạc.",
        "You just learned how to derive test cases from SkyBooking's 'Book a flight' use case specification: identifying actors, pre/postconditions, the basic flow, alternate flows, and exception flows; turning each flow into a concrete test case; and two real situations showing that testing only the basic flow easily misses bugs like double-booked seats or wrong refunds. You also learned to combine use case testing with boundary values so each flow gets tested at the values most likely to break it. This is an advanced test-design technique that lets you cover multi-actor, multi-state systems far more thoroughly than a flat requirement list.",
        "SkyBookingの『航空券予約』ユースケース仕様からテストケースを導出する方法を学びました：アクター、事前/事後条件、基本フロー、代替フロー、例外フローの特定；各フローを具体的なテストケースに変換する方法；そして基本フローだけのテストでは座席の二重予約や誤返金といったバグを見逃しやすいことを示す2つの実例。Use case testingを境界値と組み合わせ、各フローを最もバグを起こしやすい値でテストする方法も学びました。これは、断片的な要件リストよりもはるかに徹底的にマルチアクター・マルチステートのシステムを網羅できる、上級のテスト設計技法です。"),
      P("Chặng tiếp theo, bạn nên học bảng quyết định (decision table) để xử lý các use case có nhiều điều kiện kết hợp phức tạp hơn, và kiểm thử tích hợp (integration testing) để kiểm chứng sự phối hợp giữa các tác nhân hệ thống (cổng thanh toán, dịch vụ ghế) ở mức sâu hơn. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn decision tables to handle use cases with more complex combined conditions, and integration testing to verify coordination between system actors (payment gateway, seat service) at a deeper level. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より複雑な条件の組み合わせを持つユースケースを扱うためのデシジョンテーブルと、システムアクター間（決済ゲートウェイ、座席サービス）の連携をより深く検証するための統合テストを学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const USECASE_TESTING_01 = makeDoc({
  slug: "thiet-ke-ca-kiem-thu-tu-use-case-cho-tester",
  domain: "ecommerce",
  primaryKeyword: "use case testing",
  keywords: ["use case testing", "kiểm thử theo use case", "basic flow", "alternate flow", "exception flow", "đặt vé máy bay"],
  coverLabel: "NÂNG CAO · USE CASE · ĐẶT VÉ",
  crumb: "Thiết kế ca kiểm thử từ Use Case (đặt vé máy bay)",
  metaTitle: { vi: "Use Case Testing cho Tester: ca kiểm thử đặt vé máy bay", en: "Use case testing for testers: flight-booking test cases", ja: "テスターのためのUse Case Testing：航空券予約のテストケース" },
  metaDescription: {
    vi: "Use case testing cho Tester: sinh ca kiểm thử từ luồng chính, thay thế, ngoại lệ của use case đặt vé máy bay, kết hợp dữ liệu biên, có mockup và trắc nghiệm.",
    en: "Use case testing for testers: deriving test cases from the basic, alternate, and exception flows of a flight-booking use case, combined with boundary values, with real mockups and a quiz.",
    ja: "テスターのためのUse Case Testing：航空券予約ユースケースの基本・代替・例外フローからテストケースを導出し、境界値と組み合わせる。実物モックとクイズ付き。",
  },
  title: {
    vi: "Thiết kế ca kiểm thử từ Use Case cho hệ thống đặt vé máy bay: luồng chính, thay thế, ngoại lệ (có trắc nghiệm)",
    en: "Designing test cases from a use case for a flight-booking system: basic, alternate, exception flows (with quiz)",
    ja: "航空券予約システムのユースケースからテストケースを設計する：基本・代替・例外フロー（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: học Use Case Testing qua use case 'Đặt vé máy bay' của hệ thống SkyBooking. Xác định tác nhân, tiền/hậu điều kiện, sinh ca từ basic/alternate/exception flow, kết hợp dữ liệu biên, 2 tình huống lỗi thật (bán trùng ghế, hoàn tiền sai), nhiều mockup (đặc tả use case, sơ đồ luồng, Jira, kanban, dashboard), FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: learn use case testing through SkyBooking's 'Book a flight' use case. Identify actors and pre/postconditions, derive cases from basic/alternate/exception flows, combine with boundary values, two real bug situations (double-booked seat, wrong refund), many mockups (use case spec, flow diagram, Jira, kanban, dashboard), FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "上級記事：SkyBookingの『航空券予約』ユースケースを通じてUse Case Testingを学ぶ。アクターと事前/事後条件の特定、基本/代替/例外フローからのケース導出、境界値との組み合わせ、2つの実バグ事例（座席二重予約、誤返金）、多数のモック（ユースケース仕様、フロー図、Jira、かんばん、ダッシュボード）、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thiết kế ca kiểm thử từ Use Case", steps: [
    { name: "Xác định actor, tiền điều kiện, hậu điều kiện và luồng chính", text: "Viết rõ ai tham gia, điều kiện bắt buộc trước/sau use case." },
    { name: "Liệt kê các luồng thay thế và luồng ngoại lệ, gắn vào đúng bước của luồng chính", text: "Mỗi luồng cần hậu điều kiện riêng cho cả thành công lẫn thất bại." },
    { name: "Sinh ca kiểm thử từ mỗi luồng và kết hợp dữ liệu biên", text: "Ưu tiên các bước liên quan tiền hoặc tài nguyên giới hạn (ghế, thời gian giữ chỗ)." },
  ] },
  pages,
});

export const MA_USECASE_01 = [USECASE_TESTING_01];
