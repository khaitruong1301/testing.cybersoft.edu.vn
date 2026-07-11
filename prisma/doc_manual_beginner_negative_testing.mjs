// doc_manual_beginner_negative_testing.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử âm & kiểm thử dương (Negative & Positive Testing) — cách nghĩ ca kiểm thử "phá",
// vì sao negative testing bắt được nhiều lỗi thật, cách cân bằng dương/âm.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: form đăng ký ShopEasy với các ô bị bỏ trống / sai định dạng ──
const m_form = browser("shopeasy.vn/dang-ky", [
  panel("ShopEasy · Đăng ký tài khoản", [
    field(24, 20, 330, "Họ tên", "", "error"),
    field(372, 20, 330, "Email", "tranmaimail.com", "error"),
    field(24, 92, 330, "Số điện thoại", "090311822688888", "error"),
    field(372, 92, 330, "Mật khẩu", "12", "error"),
    btn(24, 168, 200, "Đăng ký", "primary"),
    annotate(20, 12, 330, 62, "ÂM: bỏ trống trường bắt buộc"),
    annotate(368, 12, 330, 62, "ÂM: email thiếu ký tự @"),
  ].join(""), { h: 260, accent: "#7c3aed" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#7c3aed" });

// ── Mockup 2: các kỹ thuật nghĩ ca kiểm thử ÂM ──
const m_technique = grid("Các kỹ thuật nghĩ ca kiểm thử ÂM", ["Kỹ thuật", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Để trống (empty)", "Bỏ trống trường bắt buộc", "Để trống ô Số điện thoại khi đăng ký"],
  ["Sai định dạng", "Nhập dữ liệu không đúng kiểu/định dạng", "Email không có @: 'tranmaimail.com'"],
  ["Quá dài / quá ngắn", "Vượt hoặc thiếu số ký tự cho phép", "Mật khẩu chỉ 2 ký tự"],
  ["Ký tự lạ/đặc biệt", "Nhập ký tự đặc biệt, emoji, script lạ", "Họ tên chứa thẻ script"],
  ["Số âm / vượt giới hạn", "Nhập số âm, số 0, số vượt tồn kho", "Số lượng sản phẩm = -2"],
  ["Mất kết nối / gián đoạn", "Ngắt mạng, đóng app giữa chừng", "Tắt wifi khi đang bấm 'Đặt hàng'"],
], { accent: "#7c3aed" });

// ── Mockup 3: bảng ca DƯƠNG vs ÂM trên cùng các trường ──
const m_compare = grid("Ca kiểm thử DƯƠNG (Positive) vs ÂM (Negative) — cùng 1 trường", ["Trường", "Ca DƯƠNG (positive)", "Ca ÂM (negative)"], [
  ["Email", "'mai.tran@gmail.com' (hợp lệ)", "'mai.trangmail.com' (thiếu @)"],
  ["Số điện thoại", "'0903118226' (10 số)", "để trống hoặc quá 15 số"],
  ["Số lượng SP", "'2' (số nguyên dương)", "'-2' hoặc '0' (không hợp lệ)"],
  ["Mật khẩu", "'Mai@2024' (đủ mạnh)", "'12' (quá ngắn)"],
], { accent: "#7c3aed", note: "Cả hai loại ca đều cần thiết: dương xác nhận ĐÚNG, âm xác nhận hệ thống TỪ CHỐI đúng." });

// ── Mockup 4: ticket Jira của lỗi tìm được nhờ kiểm thử âm ──
const m_jira = jira({
  key: "SE-11210", title: "Giỏ hàng: nhập Số lượng = -2, hệ thống tính Tổng tiền âm và vẫn cho đặt hàng",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Vào trang Giỏ hàng 3) Sửa Số lượng thành -2 4) Xem Tổng tiền và bấm Đặt hàng"],
    ["Kết quả mong đợi", "Hệ thống từ chối số lượng âm, hiện thông báo lỗi, không cho đặt hàng"],
    ["Kết quả thực tế", "Tổng tiền hiển thị -398.000đ, nút Đặt hàng vẫn hoạt động"],
    ["Bằng chứng", "video-se11210.mp4, screenshot-soluong-am.png"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi tìm được qua kiểm thử âm ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua Negative Testing (ShopEasy · Sprint 15)", [
  { name: "New", cards: [
    { key: "SE-11210", title: "Số lượng âm -> Tổng tiền âm", sev: "Critical" },
    { key: "SE-11214", title: "Email thiếu @ vẫn đăng ký được", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11201", title: "Để trống SĐT vẫn đăng ký được", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11190", title: "Mật khẩu 1 ký tự vẫn được chấp nhận", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11175", title: "Vượt tồn kho vẫn đặt được hàng", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard tỉ lệ lỗi tìm được qua kiểm thử âm vs dương ──
const m_dash = dashboard("Lỗi tìm được: Negative vs Positive testing — Sprint 15", [
  { label: "Tổng lỗi", value: "28", sub: "sprint này", color: "#2563eb" },
  { label: "Tìm bởi ca ÂM", value: "18", sub: "~64%", color: "#7c3aed" },
  { label: "Tìm bởi ca DƯƠNG", value: "10", sub: "~36%", color: "#16a34a" },
  { label: "Mức Critical/High", value: "9", sub: "đa số từ ca ÂM", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử âm (negative testing) là gì?",
  "What is negative testing?",
  "Kiểm thử âm là việc chủ động nhập dữ liệu sai, để trống, quá dài, ký tự lạ hoặc thao tác bất thường (mất mạng, đóng app giữa chừng) để xác nhận hệ thống TỪ CHỐI hoặc XỬ LÝ đúng cách, thay vì âm thầm chấp nhận dữ liệu rác hoặc bị lỗi. Nó trái ngược với kiểm thử dương chỉ đi theo luồng đúng, dữ liệu hợp lệ.",
  "Negative testing is deliberately entering wrong, blank, too-long, unusual-character data or abnormal actions (losing connection, closing the app mid-way) to confirm the system correctly REJECTS or HANDLES it, instead of silently accepting garbage data or crashing. It's the opposite of positive testing, which only follows the correct flow with valid data.",
  "ネガティブテスト（negative testing）とは何？",
  "ネガティブテストとは、誤ったデータ・空欄・長すぎる値・特殊文字や異常な操作（通信断・アプリを途中で閉じる）をあえて与え、システムが正しく拒否または処理するかを確認する手法です。ゴミデータを黙って受け入れたりクラッシュしたりしないかを確かめます。有効なデータで正しい流れだけを辿るポジティブテストとは対照的です。");
const faq2 = FAQ(
  "Vì sao kiểm thử âm lại bắt được nhiều lỗi thật đến vậy?",
  "Why does negative testing catch so many real bugs?",
  "Vì lập trình viên thường tập trung xây đúng luồng chính (happy path) và dễ quên xử lý các trường hợp ngoài luồng. Người dùng thật lại thường xuyên rơi vào đúng những trường hợp 'ngoài luồng' đó: gõ nhầm, để trống, mất mạng. Vì vậy phần lớn lỗi nghiêm trọng trong sản xuất — như số liệu sai, lỗ hổng bảo mật — thường xuất phát từ nhánh xử lý dữ liệu không hợp lệ.",
  "Because developers usually focus on building the main happy path correctly and easily forget to handle out-of-flow cases. Real users frequently end up in exactly those 'out-of-flow' situations: mistyping, leaving fields blank, losing connection. So most serious production bugs — wrong figures, security holes — usually come from the invalid-data-handling branch.",
  "ネガティブテストがなぜこれほど多くの実際のバグを見つけるの？",
  "開発者は通常メインのハッピーパスを正しく作ることに集中し、想定外のケースの処理を忘れがちだからです。実際のユーザーは頻繁にその『想定外』の状況——入力ミス、空欄、通信断——に陥ります。そのため本番環境の重大なバグ（誤った数値、セキュリティの穴など）の多くは、無効データの処理分岐から生じます。");
const faq3 = FAQ(
  "Nên dành bao nhiêu thời gian cho kiểm thử âm so với kiểm thử dương?",
  "How much time should I spend on negative testing versus positive testing?",
  "Không có tỉ lệ cố định cho mọi trường hợp, nhưng cách thực dụng là: đảm bảo mỗi tính năng có đủ ca dương cho luồng chính trước, sau đó dành phần lớn thời gian còn lại cho ca âm ở những trường rủi ro cao (tiền, số lượng, mật khẩu, dữ liệu nhạy cảm) thay vì âm hoá dàn trải mọi ô như nhau. Ưu tiên theo rủi ro luôn hiệu quả hơn ưu tiên theo số lượng ca.",
  "There's no fixed ratio for every case, but a practical approach is: first ensure enough positive cases cover the main flow of each feature, then spend most of the remaining time on negative cases for high-risk fields (money, quantity, password, sensitive data) rather than spreading them evenly across every field. Prioritizing by risk always beats prioritizing by case count.",
  "ネガティブテストとポジティブテストにどれくらいの時間を割くべき？",
  "全てのケースに当てはまる固定比率はありませんが、実用的な方法は：まず各機能のメインフローを十分にカバーするポジティブケースを確保し、残りの時間の大半を高リスク項目（金額、数量、パスワード、機密データ）のネガティブケースに使い、全項目に均等に分散させないことです。ケース数ではなくリスクで優先順位を付ける方が常に効果的です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử âm (negative testing) nghĩa là gì?", en: "What does negative testing mean?", ja: "ネガティブテストとはどういう意味？" },
    options: [
      { vi: "Nhập dữ liệu sai/không hợp lệ để xem hệ thống có từ chối đúng cách không", en: "Entering invalid/wrong data to see if the system correctly rejects it", ja: "システムが正しく拒否するか確認するため無効なデータを入力すること" },
      { vi: "Nhập dữ liệu hợp lệ theo đúng luồng để xác nhận tính năng chạy đúng", en: "Entering valid data along the correct flow to confirm the feature works", ja: "機能が正しく動くことを確認するため有効なデータを正しい流れで入力すること" },
      { vi: "Chỉ kiểm tra tốc độ tải trang", en: "Only checking page load speed", ja: "ページの読み込み速度だけを確認すること" },
      { vi: "Không cần kiểm thử gì cả", en: "Not testing anything at all", ja: "何もテストしないこと" },
    ], correct: 0,
    explain: { vi: "Kiểm thử âm chủ động dùng dữ liệu sai/bất thường để xác nhận hệ thống từ chối hoặc xử lý đúng.", en: "Negative testing deliberately uses wrong/unusual data to confirm the system correctly rejects or handles it.", ja: "ネガティブテストは誤った/異常なデータをあえて使い、システムが正しく拒否・処理するか確認します。" },
  }),
  mcq({
    q: { vi: "Kiểm thử dương (positive testing) kiểm tra điều gì?", en: "What does positive testing check?", ja: "ポジティブテストは何を確認する？" },
    options: [
      { vi: "Hệ thống có từ chối dữ liệu rác không", en: "Whether the system rejects garbage data", ja: "システムがゴミデータを拒否するか" },
      { vi: "Hệ thống có hoạt động đúng khi nhận dữ liệu hợp lệ, đúng luồng không", en: "Whether the system works correctly with valid data on the correct flow", ja: "システムが有効なデータと正しい流れで正しく動作するか" },
      { vi: "Tốc độ phản hồi của server", en: "The server's response speed", ja: "サーバーの応答速度" },
      { vi: "Số lượng người dùng đồng thời", en: "The number of concurrent users", ja: "同時ユーザー数" },
    ], correct: 1,
    explain: { vi: "Positive testing xác nhận tính năng hoạt động đúng như thiết kế với dữ liệu hợp lệ.", en: "Positive testing confirms a feature works as designed with valid data.", ja: "ポジティブテストは有効なデータで機能が設計どおり動くか確認します。" },
  }),
  mcq({
    q: { vi: "Đâu là một ca kiểm thử ÂM hợp lý cho ô 'Số lượng' trong giỏ hàng?", en: "Which is a reasonable negative test case for the cart's 'Quantity' field?", ja: "カートの『数量』項目に適切なネガティブケースはどれ？" },
    options: [
      { vi: "Nhập Số lượng = 2 (hợp lệ)", en: "Enter Quantity = 2 (valid)", ja: "数量＝2を入力（有効）" },
      { vi: "Nhập Số lượng = -1 (số âm)", en: "Enter Quantity = -1 (a negative number)", ja: "数量＝-1を入力（負の数）" },
      { vi: "Nhập Số lượng bằng đúng số tồn kho", en: "Enter Quantity equal to exact stock", ja: "在庫数ちょうどの数量を入力" },
      { vi: "Không nhập gì và không bấm nút nào", en: "Enter nothing and click nothing", ja: "何も入力せず何もクリックしない" },
    ], correct: 1,
    explain: { vi: "Số âm là dữ liệu ngoài luồng đúng, dùng để kiểm tra hệ thống có chặn đúng cách không.", en: "A negative number is out-of-flow data, used to check whether the system blocks it correctly.", ja: "負の数は想定外のデータで、システムが正しくブロックするか確認するために使います。" },
  }),
  mcq({
    q: { vi: "Vì sao chỉ test luồng đúng (positive) là chưa đủ?", en: "Why is testing only the correct flow (positive) not enough?", ja: "正しい流れ（ポジティブ）だけのテストが不十分な理由は？" },
    options: [
      { vi: "Vì tốn thời gian hơn kiểm thử âm", en: "Because it takes more time than negative testing", ja: "ネガティブテストより時間がかかるから" },
      { vi: "Vì dễ bỏ sót lỗi khi người dùng thao tác sai/nhập liệu bất thường, dễ lọt lỗi ra production", en: "Because it easily misses bugs from wrong user actions/unusual input, letting bugs escape to production", ja: "ユーザーの誤操作/異常な入力によるバグを見逃しやすく、本番環境にバグが漏れやすいから" },
      { vi: "Vì kiểm thử dương không cần thiết", en: "Because positive testing is unnecessary", ja: "ポジティブテストは不要だから" },
      { vi: "Vì khách hàng không bao giờ nhập sai", en: "Because customers never enter wrong data", ja: "顧客は決して誤入力をしないから" },
    ], correct: 1,
    explain: { vi: "Người dùng thật hay để trống, gõ nhầm, mất mạng — chỉ test đúng luồng sẽ bỏ sót các lỗi này.", en: "Real users often leave blanks, mistype, lose connection — testing only the correct flow misses these bugs.", ja: "実際のユーザーは空欄、誤入力、通信断をよく起こす — 正しい流れだけのテストではこれらのバグを見逃します。" },
  }),
  mcq({
    q: { vi: "Cách cân bằng hợp lý giữa positive và negative testing là gì?", en: "What is a sensible way to balance positive and negative testing?", ja: "ポジティブテストとネガティブテストの妥当なバランスの取り方は？" },
    options: [
      { vi: "Chỉ làm positive, bỏ hẳn negative", en: "Only do positive, skip negative entirely", ja: "ポジティブだけ行い、ネガティブは完全に省く" },
      { vi: "Âm hoá dàn trải y hệt cho mọi ô, bất kể rủi ro", en: "Negativize every field equally, regardless of risk", ja: "リスクに関係なく全項目に均等にネガティブテストする" },
      { vi: "Đủ ca dương cho luồng chính, rồi ưu tiên nhiều ca âm hơn cho ô rủi ro cao (tiền, số lượng, mật khẩu)", en: "Enough positive cases for the main flow, then prioritize more negative cases for high-risk fields (money, quantity, password)", ja: "メインフローに十分なポジティブケースを用意し、リスクの高い項目（金額、数量、パスワード）にネガティブケースを優先的に多く割く" },
      { vi: "Chỉ test khi có thời gian rảnh", en: "Only test when there's free time", ja: "暇な時だけテストする" },
    ], correct: 2,
    explain: { vi: "Ưu tiên theo rủi ro giúp dùng thời gian hiệu quả: đủ dương cho luồng chính, nhiều âm hơn ở nơi rủi ro cao.", en: "Prioritizing by risk uses time efficiently: enough positive for the main flow, more negative where risk is high.", ja: "リスクによる優先順位付けは時間を効率的に使えます：メインフローには十分なポジティブ、高リスク箇所にはより多くのネガティブを。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử âm (negative testing) là việc chủ động nhập dữ liệu sai, để trống, quá dài hay bất thường để xem hệ thống có từ chối đúng cách không — khác với kiểm thử dương (positive testing) chỉ đi theo luồng đúng. Bài này bám form đăng ký và giỏ hàng của app TMĐT ShopEasy: bạn học cách nghĩ ra ca kiểm thử âm, tìm lỗi thật (số lượng âm, email sai định dạng), và cân bằng giữa âm/dương. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Negative testing is deliberately entering wrong, empty, too-long or unusual data to see whether the system correctly rejects it — unlike positive testing, which only follows the correct flow. This follows ShopEasy's signup form and cart: you learn to think up negative test cases, find real bugs (negative quantity, malformed email), and balance negative versus positive testing. Lots of visuals and a quiz at the end.",
        "ネガティブテスト（負のテスト）とは、誤ったデータや空欄、長すぎる値、異常な入力をあえて与え、システムが正しく拒否するかを確認する手法です。正しい流れだけを辿るポジティブテストとは異なります。本記事はECアプリShopEasyの登録フォームとカートに沿い、ネガティブケースの考え方、実際のバグ（負の数量、不正なメール形式）の発見、そして陰陽のバランスの取り方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi mới học test, phản xạ tự nhiên là nhập đúng, đủ, hợp lệ rồi xem app có chạy mượt không — đó gọi là kiểm thử dương (positive testing). Nhưng người dùng thật không phải lúc nào cũng 'ngoan': họ để trống ô bắt buộc, gõ nhầm định dạng, dán số cực dài, hay tắt wifi giữa chừng. Kiểm thử âm chính là cách bạn chủ động đóng vai 'người dùng phá' để tìm ra những lỗi mà luồng đúng không bao giờ lộ ra. Chúng ta sẽ học qua form đăng ký và giỏ hàng thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! When you first learn testing, the natural instinct is to enter correct, complete, valid data and see if the app runs smoothly — that's positive testing. But real users aren't always 'well-behaved': they leave required fields blank, mistype formats, paste extremely long numbers, or turn off wifi mid-action. Negative testing is you deliberately playing the 'user who breaks things' to uncover bugs the correct flow never reveals. We'll learn through ShopEasy's real signup form and cart, with visuals and hands-on practice.",
        "こんにちは、初心者さん！テストを学び始めると、正しく完全で有効なデータを入力してアプリが問題なく動くか見る、という自然な反応をします——それがポジティブテストです。しかし実際のユーザーは常に『行儀よく』振る舞うわけではありません：必須項目を空欄にしたり、形式を間違えたり、極端に長い数値を貼り付けたり、途中でWi-Fiを切ったりします。ネガティブテストは、あなたが意図的に『壊すユーザー』を演じ、正しい流れでは決して見えないバグを見つけることです。実際のShopEasyの登録フォームとカートを通じて、図と実習付きで学びます。"),
      IMG(m_form, "Màn hình test: form đăng ký ShopEasy với các ô nhập bị bỏ trống / sai định dạng", "Screen under test: ShopEasy signup form with blank / malformed inputs", "テスト対象画面：空欄・不正形式の入力があるShopEasy登録フォーム"),
      DEF("Negative Testing", "kiểm thử bằng dữ liệu không hợp lệ, bất thường hoặc ngoài luồng đúng, để xác nhận hệ thống từ chối/xử lý đúng cách.",
        "testing with invalid, unusual, or out-of-flow data to confirm the system correctly rejects or handles it.",
        "無効・異常・想定外のデータでテストし、システムが正しく拒否または処理するか確認する手法。"),
    ] },
  { heading: { vi: "2. Kiểm thử dương vs kiểm thử âm", en: "2. Positive testing vs negative testing", ja: "2. ポジティブテスト vs ネガティブテスト" },
    blocks: [
      P("Cách dễ nhớ nhất: kiểm thử dương trả lời 'hệ thống có làm ĐÚNG việc nó nên làm không', còn kiểm thử âm trả lời 'hệ thống có TỪ CHỐI đúng cách những gì nó không nên chấp nhận không'. Với cùng một ô nhập, bạn luôn cần cả hai chiều: một ca hợp lệ để xác nhận tính năng chạy, và ít nhất một ca không hợp lệ để xác nhận hệ thống không 'nuốt' dữ liệu rác.",
        "The easiest way to remember: positive testing answers 'does the system correctly do what it should', while negative testing answers 'does the system correctly reject what it shouldn't accept'. For the same input field, you always need both directions: one valid case to confirm the feature works, and at least one invalid case to confirm the system doesn't 'swallow' garbage data.",
        "覚え方：ポジティブテストは『システムがすべきことを正しく行うか』に答え、ネガティブテストは『システムが受け入れるべきでないものを正しく拒否するか』に答えます。同じ入力項目に対し、常に両方向が必要です：機能が動くことを確認する有効なケースと、システムがゴミデータを『飲み込まない』ことを確認する少なくとも1つの無効なケース。"),
      IMG(m_compare, "Bảng ca DƯƠNG vs ÂM trên cùng các trường của form ShopEasy", "Positive vs negative cases on the same ShopEasy form fields", "ShopEasyフォームの同一項目に対するポジティブ vs ネガティブケース表"),
      P("Nhiều bạn mới chỉ dừng ở ca dương vì nó 'dễ thấy đúng, dễ báo cáo đẹp'. Nhưng thực tế, phần lớn lỗi nghiêm trọng trong sản xuất lại nằm ở nhánh âm — nơi lập trình viên thường quên xử lý vì mải tập trung cho luồng chính. Nắm chắc cả hai chiều giúp bạn kiểm thử toàn diện hơn nhiều lần so với chỉ đi theo kịch bản 'happy path'.",
        "Many beginners stop at positive cases because they're 'easy to see pass, easy to report nicely'. In reality, most serious production bugs live in the negative branch — where developers often forget to handle things because they focused on the main flow. Mastering both directions makes your testing far more thorough than only following the 'happy path'.",
        "多くの初心者は『合格しやすく、報告しやすい』ポジティブケースだけで止まってしまいます。しかし実際には、本番環境の重大なバグの多くはネガティブ側にあります——開発者はメインフローに集中するあまり、そこの処理を忘れがちだからです。両方向を押さえることで、『ハッピーパス』だけを辿るより遥かに網羅的なテストができます。"),
      DEF("Positive Testing", "kiểm thử bằng dữ liệu hợp lệ, đúng luồng, để xác nhận tính năng hoạt động đúng như thiết kế.",
        "testing with valid, correctly-flowing data to confirm a feature works as designed.",
        "有効で正しい流れのデータでテストし、機能が設計どおり動作するか確認する手法。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử âm", en: "3. Why beginners need to master negative testing", ja: "3. 初心者がネガティブテストを習得すべき理由" },
    blocks: [
      P("Người dùng thật không đọc tài liệu hướng dẫn trước khi dùng app. Họ bấm nhầm, dán nhầm, gõ vội, mất mạng giữa chừng — và những tình huống 'ngoài kịch bản' đó chiếm phần lớn báo cáo lỗi từ khách hàng thực tế. Nếu bạn chỉ test luồng đúng, bạn đang bỏ sót đúng những gì người dùng thật hay gặp nhất.",
        "Real users don't read the manual before using an app. They misclick, mispaste, type in a hurry, lose connection mid-action — and these 'off-script' situations account for most of the bugs real customers report. If you only test the correct flow, you're missing exactly what real users encounter most often.",
        "実際のユーザーはアプリを使う前にマニュアルを読みません。誤タップ、誤ペースト、急いで入力、途中で通信が切れる——こうした『台本外』の状況こそ、実際の顧客からのバグ報告の大半を占めます。正しい流れだけをテストしていると、実際のユーザーが最も頻繁に遭遇する事態を見逃すことになります。"),
      P("Với riêng bạn — người mới — kỹ năng nghĩ ra ca kiểm thử âm cho thấy bạn tư duy như một tester thực thụ, không chỉ 'làm theo hướng dẫn sử dụng'. Đây cũng là câu hỏi phỏng vấn rất phổ biến: 'Cho một ô nhập, hãy liệt kê các ca kiểm thử âm'. Trả lời được nhiều kỹ thuật khác nhau (để trống, sai định dạng, quá dài, ký tự lạ, số âm) cho thấy tư duy kiểm thử vững, không chỉ học thuộc lý thuyết.",
        "For you specifically — a beginner — the skill of thinking up negative cases shows you reason like a real tester, not just 'follow the user manual'. It's also a very common interview question: 'Given an input field, list negative test cases.' Naming several techniques (blank, wrong format, too long, unusual characters, negative numbers) shows solid testing thinking, not rote theory.",
        "特に初心者のあなたにとって、ネガティブケースを考え出すスキルは、『ユーザーマニュアルどおりに動く』だけでなく、本物のテスターのように考えていることを示します。また非常によくある面接質問でもあります：『ある入力項目について、ネガティブテストケースを挙げてください』。空欄・誤形式・長すぎる・特殊文字・負の数など複数の技法を挙げられれば、丸暗記でなく確かなテスト思考力を示せます。"),
      P("Và quan trọng nhất: kiểm thử âm chính là hàng rào bảo vệ cuối cùng trước khi dữ liệu rác lọt vào hệ thống — gây sai số liệu, lộ lỗ hổng bảo mật, hoặc khiến khách hàng mất tiền oan (như số lượng âm khiến tổng tiền âm). Đầu tư đúng mức vào kiểm thử âm là bạn đang bảo vệ trực tiếp trải nghiệm và túi tiền của người dùng.",
        "And most importantly: negative testing is the last line of defense before garbage data enters the system — causing wrong figures, exposing security holes, or making a customer lose money unfairly (like a negative quantity producing a negative total). Investing properly in negative testing directly protects users' experience and their money.",
        "そして最も重要なのは、ネガティブテストがゴミデータがシステムに入り込む前の最後の防波堤だということです——不正確な数値、セキュリティの穴の露出、あるいは顧客が不当にお金を失う（負の数量が負の合計金額を生むなど）ことにつながります。ネガティブテストに適切に投資することは、ユーザーの体験とお金を直接守ることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các kỹ thuật nghĩ ca âm", en: "4. Prepare: tools & techniques for negative cases", ja: "4. 準備：ツールとネガティブケースの技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần một danh sách các 'kỹ thuật phá' để không bỏ sót góc nào khi nghĩ ca kiểm thử âm cho một ô nhập bất kỳ.",
        "You don't need special tools — just a checklist of 'breaking techniques' so you don't miss any angle when thinking up negative cases for any input field.",
        "特別なツールは不要です——どんな入力項目に対してもネガティブケースを漏れなく考えるための『壊し方』チェックリストがあれば十分です。"),
      STEP(1, "Mở form/tính năng cần test (ví dụ form đăng ký ShopEasy); liệt kê từng ô nhập.", "Open the form/feature to test (e.g. ShopEasy's signup form); list each input field.", "テストするフォーム/機能（例：ShopEasy登録フォーム）を開き、各入力項目を列挙する。"),
      STEP(2, "Với mỗi ô, áp lần lượt các kỹ thuật: để trống, sai định dạng, quá dài/ngắn, ký tự lạ, số âm/vượt giới hạn.", "For each field, apply the techniques in turn: blank, wrong format, too long/short, unusual characters, negative/out-of-range numbers.", "各項目に対し、空欄・誤形式・長すぎ/短すぎ・特殊文字・負の数/範囲外の技法を順に適用する。"),
      STEP(3, "Ghi lại kết quả mong đợi (hệ thống nên TỪ CHỐI + thông báo rõ) trước khi thực hiện, để dễ so sánh.", "Write down the expected result (the system SHOULD REJECT + show a clear message) before executing, for easy comparison.", "実行前に期待結果（システムは拒否し明確なメッセージを表示すべき）を書いておき、比較しやすくする。"),
      TRY("Chọn một ô nhập bất kỳ trong app bạn dùng và nghĩ ra ít nhất 3 ca kiểm thử âm cho nó.", "Pick any input field in an app you use and think up at least 3 negative test cases for it.", "使っているアプリの任意の入力項目を選び、少なくとも3つのネガティブケースを考えよう。"),
      PITFALL("Nghĩ rằng kiểm thử âm là 'nhập bừa cho vui'. Mỗi ca âm cần có LÝ DO (kỹ thuật cụ thể) và KẾT QUẢ MONG ĐỢI rõ ràng, không phải đoán mò.", "Thinking negative testing means 'randomly typing junk for fun'. Every negative case needs a clear REASON (a specific technique) and EXPECTED RESULT, not random guessing.", "ネガティブテストを『適当にデタラメを入力するだけ』と考えること。各ネガティブケースには明確な理由（具体的な技法）と期待結果が必要で、当てずっぽうではいけません。"),
      IMG(m_technique, "Các kỹ thuật nghĩ ca kiểm thử âm, minh hoạ trên form ShopEasy", "Techniques for thinking up negative test cases, illustrated on the ShopEasy form", "ネガティブテストケースを考える技法、ShopEasyフォームで例示"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử âm từng bước (thực hành)", en: "5. Writing negative test cases step by step (hands-on)", ja: "5. ネガティブテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào ô 'Số lượng' trong giỏ hàng ShopEasy — nơi rất dễ bị bỏ sót vì trông có vẻ đơn giản. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử âm đầy đủ.",
        "Now let's apply it for real to the 'Quantity' field in ShopEasy's cart — an easy one to overlook because it looks simple. Follow the order below to get a full set of negative test cases.",
        "では、ShopEasyのカートにある『数量』項目に実際に適用しましょう——見た目がシンプルなため見落としやすい項目です。以下の順に沿って、完全なネガティブテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca dương chuẩn trước: Số lượng = 2 (số nguyên dương hợp lệ) để có mốc so sánh.", "First define the standard positive case: Quantity = 2 (a valid positive integer) as a comparison baseline.", "まず標準的なポジティブケースを定義：数量＝2（有効な正の整数）を比較基準とする。"),
      STEP(2, "Áp kỹ thuật 'số âm/vượt giới hạn': thử Số lượng = -2, 0, số thập phân 1.5, và số lớn hơn tồn kho.", "Apply the 'negative/out-of-range' technique: try Quantity = -2, 0, decimal 1.5, and a number larger than stock.", "『負の数/範囲外』の技法を適用：数量＝-2、0、小数1.5、在庫を超える数を試す。"),
      STEP(3, "Với mỗi ca, ghi Expected (hệ thống từ chối + thông báo) và Actual (điều thực sự xảy ra) riêng biệt.", "For each case, write Expected (system rejects + shows a message) and Actual (what actually happens) separately.", "各ケースでExpected（システムが拒否しメッセージを表示）とActual（実際に起きたこと）を別々に記録する。"),
      STEP(4, "Nếu có ca nào hệ thống KHÔNG từ chối đúng, chuyển ngay thành một bug report theo công thức 6 phần.", "If any case is NOT correctly rejected, immediately turn it into a bug report using the 6-part formula.", "システムが正しく拒否しないケースがあれば、すぐに6項目公式でバグレポートにする。"),
      CODE("text", "BO CA KIEM THU AM - o 'So luong' (gio hang ShopEasy)\nCa 1: So luong = -2   | Expected: tu choi, bao loi | Actual: chap nhan, Tong tien = -398.000d (BUG)\nCa 2: So luong = 0    | Expected: tu choi, bao loi | Actual: tu choi dung\nCa 3: So luong = 1.5  | Expected: tu choi hoac lam tron | Actual: tu choi dung\nCa 4: So luong = 9999 (vuot ton kho) | Expected: bao 'khong du hang' | Actual: van cho dat hang (BUG)"),
      TRY("Viết thêm 1 ca kiểm thử âm nữa cho ô 'Số lượng' mà bảng trên chưa có (gợi ý: để trống ô, dán chữ thay vì số).", "Write one more negative case for 'Quantity' not in the table above (hint: leave it blank, paste letters instead of numbers).", "上の表にない『数量』のネガティブケースをもう1つ書こう（ヒント：空欄、数字の代わりに文字を貼り付け）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ test luồng đúng nên bỏ sót lỗi", en: "6. Situation 1: only testing the correct flow misses a bug", ja: "6. シーン1：正しい流れだけのテストでバグを見逃す" },
    blocks: [
      SITUATION("Đội chỉ test luồng đăng ký với dữ liệu đầy đủ, hợp lệ — mọi ca đều pass, ai cũng yên tâm release.", "The team only tests the signup flow with complete, valid data — every case passes, everyone feels safe to release.",
        "Lên production, nhiều khách để trống ô 'Số điện thoại' (không có dấu * bắt buộc rõ ràng) vẫn đăng ký thành công. Đơn hàng của họ sau đó không thể giao vì shipper không liên lạc được.",
        "In production, many customers leave the 'Phone number' field blank (no clear required-field marker) and still register successfully. Their orders later can't be delivered because the shipper has no way to contact them.",
        "チームは完全で有効なデータのみで登録フローをテスト——全ケース合格、安心してリリース。",
        "本番環境で、多くの顧客が『電話番号』欄を空欄のまま（必須マークが不明瞭）でも登録に成功。その後、配達員が連絡できず注文を配送できない。"),
      SOLVE("Bổ sung ca kiểm thử âm 'để trống từng trường bắt buộc' cho toàn bộ form, không chỉ Số điện thoại — và thêm validate rõ ràng phía server, không chỉ dựa vào giao diện.", "Add negative cases for 'leaving each required field blank' across the whole form, not just Phone — and add clear server-side validation, not just relying on the UI.", "電話番号だけでなくフォーム全体で『各必須項目を空欄にする』ネガティブケースを追加し、UIだけに頼らずサーバー側でも明確なバリデーションを加える。"),
      P("Đây là bài học lớn nhất trong chương này: 'mọi ca dương đều pass' không có nghĩa là tính năng an toàn. Nó chỉ nói lên rằng bạn chưa thử đủ cách người dùng thật có thể làm sai. Danh sách kỹ thuật ở chương 4 (để trống, sai định dạng, quá dài, ký tự lạ, số âm) chính là công cụ giúp bạn không bỏ sót những góc như thế này.",
        "This is the biggest lesson in this chapter: 'every positive case passes' doesn't mean a feature is safe. It only means you haven't tried enough ways real users can go wrong. The technique list from chapter 4 (blank, wrong format, too long, unusual characters, negative numbers) is exactly the tool that keeps you from missing angles like this.",
        "この章での最大の教訓です：『全てのポジティブケースが合格』は機能が安全であることを意味しません。実際のユーザーが間違える方法を十分試していないだけかもしれません。第4章の技法リスト（空欄・誤形式・長すぎ・特殊文字・負の数）は、まさにこうした見落としを防ぐツールです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử âm 'Số lượng âm' trên giỏ hàng", "A bug ticket found via the negative 'negative Quantity' case on the cart", "『負の数量』ネガティブケースで見つかったバグチケット"),
      RECAP(["Mọi ca dương pass KHÔNG đồng nghĩa tính năng an toàn", "Test bỏ trống từng trường bắt buộc, đừng chỉ test 1 trường"],
        ["All positive cases passing does NOT mean a feature is safe", "Test leaving each required field blank, not just one"],
        ["全ポジティブケース合格は機能が安全であることを意味しない", "1項目だけでなく各必須項目の空欄テストを行う"]),
    ] },
  { heading: { vi: "7. Tình huống 2: số lượng âm khiến tổng tiền âm", en: "7. Situation 2: a negative quantity makes the total negative", ja: "7. シーン2：負の数量が合計金額を負にする" },
    blocks: [
      SITUATION("Bạn thử sửa ô 'Số lượng' trong giỏ hàng thành -2 chỉ để xem điều gì xảy ra.", "You try changing the 'Quantity' field in the cart to -2 just to see what happens.",
        "Hệ thống không chặn, vẫn tính Tổng tiền = -398.000đ và cho phép bấm 'Đặt hàng' — một lỗ hổng có thể bị lợi dụng để gian lận thanh toán.",
        "The system doesn't block it, still computes a Total of -398,000đ, and lets you click 'Order' — a hole that could be exploited for payment fraud.",
        "カートの『数量』を-2に変更してみて何が起きるか確認。",
        "システムはブロックせず合計金額を-398,000ドン（マイナス）と計算し、『注文する』ボタンも押せてしまう——決済不正に悪用され得る穴。"),
      SOLVE("Báo bug Critical ngay (ảnh hưởng tiền bạc), đề xuất chặn số lượng < 1 ở cả giao diện lẫn server, và bổ sung ca kiểm thử âm này vào bộ hồi quy để không tái phát.", "Report it as a Critical bug immediately (money impact), propose blocking quantity < 1 on both UI and server, and add this negative case to the regression suite to prevent recurrence.", "即座にCriticalバグとして報告（金銭に影響）し、UIとサーバー両方で数量<1をブロックするよう提案、再発防止のためこのネガティブケースを回帰テストスイートに追加する。"),
      P("Ví dụ này cho thấy vì sao kiểm thử âm đặc biệt quan trọng ở những ô liên quan tới TIỀN hoặc SỐ LƯỢNG. Một con số âm tưởng vô hại có thể trở thành lỗ hổng nghiêm trọng nếu không được chặn đúng chỗ. Khi ưu tiên thời gian có hạn, hãy dành nhiều ca kiểm thử âm hơn cho các trường có rủi ro cao như thế này thay vì rải đều cho mọi ô như nhau.",
        "This example shows why negative testing matters especially for fields tied to MONEY or QUANTITY. A seemingly harmless negative number can become a serious hole if not blocked in the right place. When time is limited, spend more negative cases on high-risk fields like this instead of spreading effort evenly across every field.",
        "この例は、金額や数量に関わる項目でネガティブテストが特に重要な理由を示しています。一見無害に見える負の数値も、適切な場所でブロックされなければ深刻な穴になり得ます。時間が限られる場合は、全項目に均等に労力を分散させるのではなく、このようなリスクの高い項目により多くのネガティブケースを割きましょう。"),
      TRY("Nghĩ thêm một trường 'liên quan tới tiền' khác trong app bạn dùng (mã giảm giá, số dư ví...) và đề xuất 1 ca kiểm thử âm cho nó.", "Think of another 'money-related' field in an app you use (discount code, wallet balance...) and propose one negative case for it.", "使っているアプリの別の『金銭関連』項目（クーポンコード、ウォレット残高など）を考え、ネガティブケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Cân bằng dương/âm & theo dõi kết quả", en: "8. Balancing positive/negative & tracking results", ja: "8. 陽陰のバランスと結果の追跡" },
    blocks: [
      P("Không phải trường nào cũng cần âm hoá y hệt nhau. Cách thực dụng là: mọi ô đều có ít nhất 1 ca dương + 1 ca âm cơ bản (để trống); riêng các ô rủi ro cao (tiền, số lượng, mật khẩu, dữ liệu nhạy cảm) thì đầu tư thêm nhiều kỹ thuật âm khác nhau.",
        "Not every field needs the same amount of negativizing. A practical rule: every field gets at least 1 positive case + 1 basic negative case (blank); high-risk fields (money, quantity, password, sensitive data) get extra investment across several negative techniques.",
        "全ての項目に同じだけネガティブケースが必要なわけではありません。実用的なルール：全項目に最低1つのポジティブケースと1つの基本的なネガティブケース（空欄）を用意し、リスクの高い項目（金額、数量、パスワード、機密データ）には複数の技法でより多く投資します。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua kiểm thử âm (ShopEasy · Sprint 15)", "A board tracking bugs found via negative testing (ShopEasy · Sprint 15)", "ネガティブテストで見つかったバグの追跡ボード（ShopEasy・スプリント15）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi nghiêm trọng của sprint đến từ ca kiểm thử ÂM, không phải ca dương", "Metrics: most of the sprint's serious bugs come from negative cases, not positive ones", "指標：スプリントの重大バグの大半はポジティブケースではなくネガティブケースから見つかった"),
      TIP("Ưu tiên viết ca âm cho các ô ảnh hưởng TIỀN, BẢO MẬT, hoặc DỮ LIỆU KHÔNG THỂ HOÀN TÁC trước — đó là nơi một lỗi âm gây thiệt hại lớn nhất.", "Prioritize writing negative cases for fields affecting MONEY, SECURITY, or IRREVERSIBLE DATA first — that's where a negative bug causes the most damage.", "金額・セキュリティ・取り消せないデータに関わる項目のネガティブケースを最優先で書こう——負のバグが最も大きな被害を生む場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm kiểm thử âm. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when doing negative testing. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はネガティブテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ nghĩ ra 1-2 ca âm rồi dừng lại, bỏ sót các kỹ thuật khác (chỉ nhớ 'để trống' mà quên 'ký tự lạ' hay 'quá dài').", "Thinking of only 1-2 negative cases then stopping, missing other techniques (remembering only 'blank' but forgetting 'unusual characters' or 'too long').", "1〜2個のネガティブケースだけ考えて止め、他の技法（『空欄』は覚えていても『特殊文字』や『長すぎ』を忘れる）を見逃す。"),
      PITFALL("Âm hoá TẤT CẢ mọi ô như nhau, tốn hết thời gian cho những ô rủi ro thấp (ví dụ ô 'Ghi chú' không bắt buộc) mà bỏ bê ô rủi ro cao.", "Negativizing EVERY field equally, spending all the time on low-risk fields (like an optional 'Note' field) while neglecting high-risk ones.", "全項目を均等にネガティブテストし、低リスクな項目（任意の『備考』欄など）に時間を使い切り、高リスクな項目を疎かにする。"),
      TIP("Trước khi báo một ca âm là bug, tự hỏi: 'Đây có thực sự là hành vi không mong muốn không, hay chỉ là ý kiến cá nhân của mình?' — tránh báo nhầm ca dương thành lỗi.", "Before reporting a negative case as a bug, ask: 'Is this truly unwanted behavior, or just my personal opinion?' — avoid mistakenly reporting a positive case as a bug.", "ネガティブケースをバグとして報告する前に自問しよう：『これは本当に望ましくない挙動か、それとも自分の個人的な意見か？』——ポジティブケースを誤ってバグ報告しないように。"),
      IMG(m_technique, "Nhắc lại các kỹ thuật nghĩ ca âm — dùng làm checklist khi thời gian có hạn", "Reminder of negative-case techniques — use as a checklist when time is limited", "ネガティブケース技法の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách nghĩ ra và viết ca kiểm thử âm qua form đăng ký và giỏ hàng ShopEasy: phân biệt kiểm thử dương/âm, các kỹ thuật nghĩ ca âm (để trống, sai định dạng, quá dài, ký tự lạ, số âm), và hai tình huống thật cho thấy chỉ test luồng đúng dễ bỏ sót lỗi nghiêm trọng. Bạn cũng biết cách cân bằng thời gian giữa dương và âm theo mức rủi ro. Đây là kỹ năng nền tảng giúp bạn tìm được nhiều lỗi giá trị hơn hẳn so với chỉ đi theo happy path.",
        "You just learned how to think up and write negative test cases through ShopEasy's signup form and cart: telling positive and negative testing apart, techniques for negative cases (blank, wrong format, too long, unusual characters, negative numbers), and two real situations showing that testing only the correct flow easily misses serious bugs. You also learned to balance time between positive and negative by risk level. This foundational skill helps you find far more valuable bugs than only following the happy path.",
        "ShopEasyの登録フォームとカートを通じて、ネガティブテストケースの考え方と書き方を学びました：ポジティブテストとネガティブテストの区別、ネガティブケースの技法（空欄、誤形式、長すぎ、特殊文字、負の数）、そして正しい流れだけのテストが重大なバグを見逃しやすいことを示す2つの実例。リスクレベルに応じてポジティブとネガティブの時間配分をする方法も学びました。ハッピーパスだけを辿るより遥かに価値あるバグを見つけられる土台スキルです。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật phân vùng tương đương và giá trị biên để nghĩ ca kiểm thử có hệ thống hơn, cùng cách viết bug report chuẩn để báo cáo những gì bạn tìm được. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn equivalence partitioning and boundary value techniques to design test cases more systematically, along with how to write a proper bug report for what you find. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より体系的にテストケースを設計するための同値分割・境界値分析の技法と、見つけたバグを報告するための適切なバグレポートの書き方を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const NEGATIVE_TESTING_01 = makeDoc({
  slug: "kiem-thu-am-negative-testing-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử âm",
  keywords: ["kiểm thử âm", "negative testing", "kiểm thử dương", "positive testing", "ca kiểm thử âm cho người mới"],
  coverLabel: "NGƯỜI MỚI · NEGATIVE TESTING · TMĐT",
  crumb: "Kiểm thử âm & kiểm thử dương (Negative & Positive Testing)",
  metaTitle: { vi: "Kiểm thử âm (Negative Testing) cho người mới", en: "Negative testing for beginners", ja: "初心者向けネガティブテスト" },
  metaDescription: {
    vi: "Kiểm thử âm (negative testing) cho người mới: cách nghĩ ca kiểm thử phá qua form ShopEasy, để trống, sai định dạng, số âm, ví dụ thật, có hình và trắc nghiệm.",
    en: "Negative testing for beginners: how to think up breaking test cases through the ShopEasy form, blank fields, wrong formats, negative numbers, real bug examples, with visuals and a quiz.",
    ja: "初心者向けネガティブテスト：ShopEasyフォームで壊すテストケースの考え方、空欄・誤形式・負の数、実際のバグ例、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử âm & kiểm thử dương cho người mới: cách nghĩ ca 'phá' hệ thống (có trắc nghiệm)",
    en: "Negative & positive testing for beginners: how to think up cases that 'break' the system (with quiz)",
    ja: "初心者のためのネガティブ＆ポジティブテスト：システムを『壊す』ケースの考え方（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử âm và kiểm thử dương qua app TMĐT ShopEasy. Các kỹ thuật nghĩ ca âm (để trống, sai định dạng, quá dài, ký tự lạ, số âm), ví dụ lỗi thật số lượng âm và trường bắt buộc bị bỏ trống, cách cân bằng dương/âm theo rủi ro, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn negative and positive testing through the ShopEasy e-commerce app. Techniques for negative cases (blank, wrong format, too long, unusual characters, negative numbers), real bug examples (negative quantity, a blank required field), how to balance positive/negative by risk, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでネガティブテストとポジティブテストを学ぶ。ネガティブケースの技法（空欄、誤形式、長すぎ、特殊文字、負の数）、実際のバグ例（負の数量、空欄の必須項目）、リスクに応じたポジティブ/ネガティブのバランスの取り方、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách nghĩ và viết ca kiểm thử âm", steps: [
    { name: "Liệt kê từng ô nhập của tính năng", text: "Xác định các trường cần kiểm thử." },
    { name: "Áp các kỹ thuật âm cho từng ô", text: "Để trống, sai định dạng, quá dài, ký tự lạ, số âm/vượt giới hạn." },
    { name: "Ưu tiên ô rủi ro cao và ghi kết quả mong đợi", text: "Tiền, số lượng, mật khẩu, dữ liệu nhạy cảm cần nhiều ca âm hơn." },
  ] },
  pages,
});

export const MANUAL_BEGINNER_NEGATIVE_01 = [NEGATIVE_TESTING_01];
