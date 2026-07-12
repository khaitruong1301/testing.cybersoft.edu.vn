// doc_mb_gio_hang.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử giỏ hàng & thanh toán (Cart & Checkout Testing) — thêm/xóa/sửa số lượng,
// tính lại tổng tiền, mã giảm giá, phí ship, hết hàng khi thanh toán, thanh toán thất bại,
// giữ giỏ hàng khi đăng nhập lại. Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ.
// Gắn app TMĐT ShopEasy. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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

// ── Mockup 1: màn hình giỏ hàng ShopEasy — 2 sản phẩm, số lượng, thành tiền ──
const m_cart = browser("shopeasy.vn/gio-hang", [
  panel("ShopEasy · Giỏ hàng (2 sản phẩm)", [
    field(24, 20, 330, "Áo thun nam · Số lượng", "2", "normal"),
    field(372, 20, 330, "Đơn giá / Thành tiền", "199.000đ / 398.000đ", "normal"),
    field(24, 92, 330, "Quần jean nữ · Số lượng", "1", "normal"),
    field(372, 92, 330, "Đơn giá / Thành tiền", "459.000đ / 459.000đ", "normal"),
    btn(24, 168, 140, "Xóa SP", "danger"),
    btn(184, 168, 170, "Cập nhật giỏ", "ghost"),
    annotate(368, 160, 330, 46, "Tổng tiền phải tự cập nhật ngay"),
  ].join(""), { h: 260, accent: "#0ea5e9" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#0ea5e9" });

// ── Mockup 2: bảng ca kiểm thử thêm/xóa/sửa số lượng & tính lại tổng tiền ──
const m_qty = grid("Ca kiểm thử: thêm/xóa/sửa số lượng & tính lại tổng tiền", ["Thao tác", "Dữ liệu nhập", "Tổng tiền mong đợi"], [
  ["Tăng số lượng (+1)", "SP 199.000đ: 2 → 3", "398.000đ → 597.000đ, cập nhật ngay"],
  ["Giảm số lượng (-1)", "SP 459.000đ: 1 → 0", "Tự loại khỏi giỏ, trừ khỏi tổng tiền"],
  ["Sửa số lượng thủ công", "Gõ trực tiếp ô số lượng = 5", "Tổng cập nhật theo 5, không cần bấm 'Cập nhật'"],
  ["Xóa 1 sản phẩm", "Bấm 'Xóa SP' trên Áo thun nam", "Tổng tiền trừ đúng 398.000đ, còn 459.000đ"],
  ["Xóa hết giỏ hàng", "Xóa lần lượt cả 2 sản phẩm", "Giỏ hàng trống, hiện thông báo 'chưa có sản phẩm'"],
], { accent: "#0ea5e9" });

// ── Mockup 3: bảng ca kiểm thử mã giảm giá & phí vận chuyển ──
const m_coupon = grid("Ca kiểm thử: mã giảm giá & phí vận chuyển", ["Trường / Thao tác", "Dữ liệu nhập", "Kết quả mong đợi"], [
  ["Mã giảm giá hợp lệ", "Nhập 'SALE50' (giảm 50k, đơn ≥300k)", "Trừ đúng 50.000đ, hiện 'Đã áp dụng SALE50'"],
  ["Mã giảm giá hết hạn", "Nhập 'TET2024' (đã hết hạn)", "Từ chối, hiện 'Mã đã hết hạn'"],
  ["Mã không đủ điều kiện", "Nhập 'SALE50' khi đơn chỉ 150.000đ", "Từ chối, hiện 'Đơn tối thiểu 300.000đ'"],
  ["Phí ship theo khu vực", "Địa chỉ giao nội thành vs ngoại thành", "Phí ship khác nhau đúng theo bảng giá"],
  ["Freeship theo ngưỡng", "Tổng đơn sau giảm giá ≥ 500.000đ", "Phí ship tự động về 0đ"],
], { accent: "#0ea5e9", note: "Luôn đối chiếu số hiển thị với công thức: (giá × số lượng) − giảm giá + phí ship." });

// ── Mockup 4: bug giỏ hàng bị mất sau khi đăng nhập lại ──
const m_relogin = browser("shopeasy.vn/gio-hang", [
  panel("ShopEasy · Sau khi đăng nhập lại", [
    field(24, 20, 330, "Trạng thái đăng nhập", "Đã đăng nhập lại (mai.tran)", "normal"),
    field(372, 20, 330, "Số sản phẩm trong giỏ", "0 sản phẩm", "error"),
    annotate(368, 12, 330, 62, "ÂM: giỏ hàng bị mất dù đăng nhập lại đúng tài khoản"),
    btn(24, 96, 260, "Xem lại giỏ hàng trước đó", "ghost"),
  ].join(""), { h: 200, accent: "#0ea5e9" }),
].join(""), { h: 256, title: "ShopEasy · Phiên đăng nhập", accent: "#0ea5e9" });

// ── Mockup 5: checklist kỹ thuật kiểm thử giỏ hàng & thanh toán ──
const m_technique = grid("Checklist kỹ thuật kiểm thử giỏ hàng & thanh toán", ["Khu vực", "Kỹ thuật kiểm thử", "Ví dụ trên ShopEasy"], [
  ["Số lượng", "Biên: 0, 1, số âm, số thập phân, vượt tồn kho", "Sửa số lượng thành -1 hoặc 9999"],
  ["Tổng tiền", "So khớp: (giá × số lượng) − giảm giá + ship", "Đối chiếu tổng hiển thị với công thức thủ công"],
  ["Mã giảm giá", "Hợp lệ / hết hạn / sai điều kiện / dùng nhiều lần", "Áp SALE50 hai lần trong cùng 1 đơn"],
  ["Tồn kho", "Hết hàng ngay lúc đang thanh toán", "SP hết hàng đúng khi bấm 'Đặt hàng'"],
  ["Thanh toán", "Timeout, mất mạng, thẻ bị từ chối giữa giao dịch", "Ngắt mạng ngay sau khi bấm 'Thanh toán'"],
  ["Phiên đăng nhập", "Đăng xuất/đăng nhập lại, đổi thiết bị", "Đăng nhập lại trên điện thoại khác, kiểm tra giỏ"],
], { accent: "#0ea5e9" });

// ── Mockup 6: màn hình thanh toán — sản phẩm hết hàng vẫn cho đặt ──
const m_checkout = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán đơn hàng", [
    field(24, 20, 330, "Quần jean nữ · Số lượng 1", "Hết hàng", "error"),
    field(372, 20, 330, "Phương thức thanh toán", "Thẻ tín dụng ****1234", "normal"),
    field(24, 92, 330, "Tổng thanh toán", "459.000đ", "error"),
    btn(24, 168, 200, "Đặt hàng", "primary"),
    annotate(20, 12, 330, 62, "ÂM: sản phẩm đã hết hàng vẫn cho thanh toán"),
    annotate(20, 84, 330, 46, "Tổng tiền chưa trừ SP hết hàng"),
  ].join(""), { h: 260, accent: "#e11d48" }),
].join(""), { h: 316, title: "ShopEasy · Thanh toán", accent: "#e11d48" });

// ── Mockup 7: ticket Jira của lỗi hết hàng vẫn cho đặt hàng ──
const m_jira = jira({
  key: "SE-12301", title: "Checkout: SP hết hàng vẫn cho đặt hàng thành công, trừ tiền đầy đủ",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Thêm SP vào giỏ 2) SP hết hàng ngay lúc khách đang ở trang Thanh toán 3) Bấm 'Đặt hàng'"],
    ["Kết quả mong đợi", "Hệ thống chặn lại, báo 'Sản phẩm đã hết hàng', cập nhật lại giỏ và tổng tiền"],
    ["Kết quả thực tế", "Đơn hàng vẫn được tạo, trừ đủ tiền cho cả sản phẩm đã hết hàng"],
    ["Bằng chứng", "video-se12301.mp4, screenshot-hethang-van-dat.png"],
  ],
});

// ── Mockup 8: bảng kanban theo dõi lỗi giỏ hàng/thanh toán ──
const m_kanban = kanban("Bảng theo dõi lỗi Giỏ hàng & Thanh toán (ShopEasy · Sprint 18)", [
  { name: "New", cards: [
    { key: "SE-12301", title: "Hết hàng lúc checkout vẫn cho đặt", sev: "Critical" },
    { key: "SE-12305", title: "Thanh toán thất bại nhưng vẫn trừ tiền", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "SE-12280", title: "Giỏ hàng mất sau khi đăng nhập lại", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-12266", title: "Tổng tiền không cập nhật khi sửa số lượng", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-12240", title: "Mã giảm giá áp được 2 lần trong 1 đơn", sev: "Medium" },
  ] },
]);

// ── Mockup 9: dashboard số liệu lỗi giỏ hàng/thanh toán ──
const m_dash = dashboard("Lỗi Giỏ hàng & Thanh toán tìm được — Sprint 18", [
  { label: "Tổng lỗi", value: "22", sub: "sprint này", color: "#0ea5e9" },
  { label: "Lỗi tính tiền", value: "9", sub: "~41%", color: "#7c3aed" },
  { label: "Lỗi tồn kho/checkout", value: "7", sub: "~32%", color: "#e11d48" },
  { label: "Mức Critical/High", value: "12", sub: "đa số ảnh hưởng tiền", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vì sao tổng tiền trong giỏ hàng phải tính lại ngay khi sửa số lượng?",
  "Why must the cart total recalculate immediately when quantity changes?",
  "Vì tổng tiền là con số khách hàng dùng để quyết định có đặt hàng hay không. Nếu sửa số lượng mà tổng tiền không cập nhật ngay (hoặc cập nhật sai), khách có thể trả nhầm số tiền, hoặc mất niềm tin vào app. Đây cũng là nơi rất dễ lỗi vì công thức tính thường gồm nhiều phần: đơn giá × số lượng, cộng dồn nhiều sản phẩm, trừ giảm giá, cộng phí ship — chỉ cần một phần tính sai là tổng hiển thị sai ngay.",
  "Because the total is the number customers rely on to decide whether to place the order. If the total doesn't update instantly (or updates incorrectly) when quantity changes, customers may pay the wrong amount or lose trust in the app. It's also an easy place for bugs because the formula usually has many parts: unit price × quantity, summed across products, minus discount, plus shipping fee — one wrong part and the displayed total is wrong.",
  "数量を変更したらすぐに合計金額を再計算しなければならないのはなぜ？",
  "合計金額は、顧客が注文するかどうかを判断するために使う数字だからです。数量を変更しても合計がすぐに更新されない（または誤って更新される）と、顧客が誤った金額を支払ったり、アプリへの信頼を失ったりする可能性があります。計算式には通常、単価×数量、複数商品の合算、割引の控除、送料の加算など多くの部分があり、一箇所でも計算を誤ると表示される合計が間違ってしまうため、バグが発生しやすい箇所でもあります。");
const faq2 = FAQ(
  "Kiểm thử mã giảm giá (coupon) cần chú ý điều gì nhất?",
  "What matters most when testing a discount coupon?",
  "Quan trọng nhất là kiểm tra đầy đủ các ĐIỀU KIỆN áp dụng: mã còn hạn hay đã hết hạn, đơn hàng có đạt giá trị tối thiểu không, mã có bị giới hạn số lần dùng không (một tài khoản chỉ dùng 1 lần, hay có thể lặp lại nhiều lần trong cùng đơn). Một lỗi rất phổ biến là hệ thống cho phép áp cùng một mã 2 lần trong 1 đơn hàng, khiến khách được giảm giá gấp đôi — đây là lỗ hổng có thể gây thiệt hại tài chính thật cho doanh nghiệp.",
  "The most important thing is fully checking the APPLICATION CONDITIONS: whether the code is still valid or expired, whether the order meets the minimum value, and whether the code has usage limits (once per account, or repeatable within the same order). A very common bug is the system allowing the same code to be applied twice in one order, giving the customer double the discount — a hole that can cause real financial loss to the business.",
  "クーポンコードのテストで最も注意すべき点は？",
  "最も重要なのは、適用条件を漏れなく確認することです：コードが有効期限内か、注文が最低金額を満たしているか、使用回数に制限があるか（1アカウント1回のみか、同一注文内で繰り返し使えるか）。よくあるバグは、同じコードを1つの注文で2回適用できてしまい、顧客が2倍の割引を受けられることです——これは企業に実際の金銭的損失を与えかねない穴です。");
const faq3 = FAQ(
  "Vì sao cần test trường hợp sản phẩm hết hàng ngay lúc khách đang thanh toán?",
  "Why test the case where a product goes out of stock right while a customer is checking out?",
  "Vì tồn kho là dữ liệu thay đổi liên tục theo thời gian thực khi nhiều khách hàng cùng mua sắm. Có thể khách A đã bỏ sản phẩm vào giỏ từ sáng, nhưng đến chiều khi bấm 'Đặt hàng' thì sản phẩm đó đã được khách B mua hết. Nếu hệ thống không kiểm tra lại tồn kho ngay tại thời điểm thanh toán, khách A vẫn có thể đặt hàng và bị trừ tiền cho một sản phẩm không còn để giao — gây khiếu nại và mất uy tín thương hiệu.",
  "Because inventory is data that changes continuously in real time as many customers shop at once. Customer A may have added a product to the cart in the morning, but by the time they click 'Order' in the afternoon, customer B may have already bought it all. If the system doesn't recheck stock right at the moment of checkout, customer A could still place the order and get charged for a product that can no longer be delivered — causing complaints and damaging brand trust.",
  "顧客がまさに決済している最中に商品が在庫切れになるケースをテストする必要があるのはなぜ？",
  "在庫は、多くの顧客が同時に買い物をする中でリアルタイムに変化し続けるデータだからです。顧客Aが朝カートに商品を入れても、午後に『注文する』を押す頃には顧客Bがその商品を買い尽くしているかもしれません。システムが決済の瞬間に在庫を再確認しなければ、顧客Aはもう配送できない商品に対して注文が成立し、代金まで引き落とされてしまい、クレームやブランドへの信頼低下を招きます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Khi người dùng tăng số lượng sản phẩm trong giỏ hàng, hệ thống nên làm gì?", en: "When a user increases a product's quantity in the cart, what should the system do?", ja: "カート内の商品の数量を増やしたとき、システムはどうすべき？" },
    options: [
      { vi: "Tự động tính lại tổng tiền ngay lập tức", en: "Automatically recalculate the total immediately", ja: "即座に合計金額を自動で再計算する" },
      { vi: "Giữ nguyên tổng tiền cũ cho đến khi khách bấm 'Thanh toán'", en: "Keep the old total until the customer clicks 'Checkout'", ja: "顧客が『決済』を押すまで古い合計金額を保持する" },
      { vi: "Xóa toàn bộ giỏ hàng để tính lại từ đầu", en: "Clear the whole cart to recalculate from scratch", ja: "カート全体を空にして最初から再計算する" },
      { vi: "Yêu cầu khách đăng nhập lại", en: "Ask the customer to log in again", ja: "顧客に再ログインを要求する" },
    ], correct: 0,
    explain: { vi: "Tổng tiền là căn cứ để khách quyết định đặt hàng, nên phải cập nhật ngay khi số lượng thay đổi.", en: "The total is what customers use to decide whether to order, so it must update the moment quantity changes.", ja: "合計金額は顧客が注文を決める根拠なので、数量が変わった瞬間に更新されなければなりません。" },
  }),
  mcq({
    q: { vi: "Giỏ hàng có mã 'SALE50' yêu cầu đơn tối thiểu 300.000đ nhưng đơn hiện tại chỉ 150.000đ. Kết quả ĐÚNG là gì?", en: "The cart has code 'SALE50' requiring a minimum order of 300,000đ, but the current order is only 150,000đ. What is the CORRECT result?", ja: "カートに『SALE50』コードがあり最低注文額300,000ドンが必要だが、現在の注文は150,000ドンしかない。正しい結果は？" },
    options: [
      { vi: "Hệ thống vẫn áp mã và giảm giá bình thường", en: "The system still applies the code and discounts normally", ja: "システムはそのままコードを適用し通常どおり割引する" },
      { vi: "Hệ thống từ chối áp mã, hiện rõ lý do 'chưa đạt giá trị tối thiểu'", en: "The system rejects applying the code, clearly showing the reason 'minimum order not reached'", ja: "システムはコード適用を拒否し『最低注文額に達していません』と明確に表示する" },
      { vi: "Hệ thống tự động thêm sản phẩm cho đủ 300.000đ", en: "The system automatically adds products to reach 300,000đ", ja: "システムが自動で商品を追加し300,000ドンに到達させる" },
      { vi: "Hệ thống xóa giỏ hàng", en: "The system clears the cart", ja: "システムがカートを空にする" },
    ], correct: 1,
    explain: { vi: "Ca âm đúng là hệ thống phải chặn và báo rõ lý do khi đơn chưa đủ điều kiện áp mã.", en: "The correct negative case is the system must block and clearly state the reason when the order doesn't meet the coupon condition.", ja: "正しいネガティブケースは、注文が条件を満たさない場合にシステムがブロックし理由を明確に示すことです。" },
  }),
  mcq({
    q: { vi: "Vì sao cần kiểm thử tình huống sản phẩm hết hàng ngay lúc khách đang thanh toán?", en: "Why must you test the case where a product goes out of stock right during checkout?", ja: "決済中にまさに商品が在庫切れになるケースをテストすべき理由は？" },
    options: [
      { vi: "Vì tồn kho có thể thay đổi theo thời gian thực do nhiều khách mua cùng lúc", en: "Because stock can change in real time as many customers buy simultaneously", ja: "多くの顧客が同時に購入するため在庫がリアルタイムに変化し得るから" },
      { vi: "Vì tồn kho không bao giờ thay đổi", en: "Because stock never changes", ja: "在庫は決して変化しないから" },
      { vi: "Vì đây là tính năng không quan trọng", en: "Because this feature is unimportant", ja: "この機能は重要ではないから" },
      { vi: "Vì chỉ cần test một lần duy nhất khi ra mắt app", en: "Because it only needs testing once at app launch", ja: "アプリのリリース時に一度だけテストすればよいから" },
    ], correct: 0,
    explain: { vi: "Tồn kho realtime khiến trạng thái sản phẩm có thể đổi ngay giữa lúc khách đang thao tác thanh toán.", en: "Real-time stock means a product's status can change right while a customer is checking out.", ja: "リアルタイムの在庫により、顧客が決済している最中でも商品の状態が変わり得ます。" },
  }),
  mcq({
    q: { vi: "Thanh toán thất bại giữa chừng (mất mạng ngay sau khi trừ tiền). Hành vi ĐÚNG hệ thống nên có là gì?", en: "Payment fails mid-way (connection lost right after money is deducted). What is the CORRECT system behavior?", ja: "決済の途中で失敗（金額が引き落とされた直後に通信が切れる）。システムの正しい挙動は？" },
    options: [
      { vi: "Trừ tiền nhưng không tạo đơn hàng, không hoàn tiền, không thông báo gì", en: "Deduct the money but create no order, no refund, no notification", ja: "金額は引き落とすが注文は作成せず、返金も通知もしない" },
      { vi: "Đảm bảo hoàn tiền hoặc giữ đơn ở trạng thái chờ xác nhận, có thông báo rõ cho khách", en: "Ensure a refund or keep the order pending confirmation, with a clear notification to the customer", ja: "返金するか注文を確認待ち状態にし、顧客に明確に通知することを保証する" },
      { vi: "Tự động đặt lại đơn hàng khác mà không hỏi khách", en: "Automatically place another order without asking the customer", ja: "顧客に確認せず自動で別の注文を作成する" },
      { vi: "Xóa toàn bộ lịch sử giao dịch của khách", en: "Delete the customer's entire transaction history", ja: "顧客の取引履歴をすべて削除する" },
    ], correct: 1,
    explain: { vi: "Không được để tình trạng vừa mất tiền vừa không có đơn hàng — phải hoàn tiền hoặc giữ đơn chờ xác nhận rõ ràng.", en: "You must never leave a state where money is lost with no order created — must refund or keep the order clearly pending.", ja: "お金が引き落とされたのに注文がない状態を放置してはいけません——返金するか、注文を明確に確認待ちにする必要があります。" },
  }),
  mcq({
    q: { vi: "Sau khi đăng xuất rồi đăng nhập lại trên cùng tài khoản, giỏ hàng nên ra sao?", en: "After logging out and back in on the same account, what should the cart look like?", ja: "同じアカウントでログアウトし再度ログインしたあと、カートはどうあるべき？" },
    options: [
      { vi: "Giỏ hàng được giữ nguyên như trước khi đăng xuất", en: "The cart is kept exactly as it was before logging out", ja: "ログアウト前と同じ状態でカートが保持される" },
      { vi: "Giỏ hàng luôn bị xóa trắng mỗi lần đăng nhập lại", en: "The cart is always wiped clean every time the user logs back in", ja: "再ログインのたびにカートは常に空にされる" },
      { vi: "Giỏ hàng đổi sang sản phẩm của tài khoản khác", en: "The cart switches to another account's products", ja: "カートが別アカウントの商品に切り替わる" },
      { vi: "Giỏ hàng chỉ giữ được nếu khách không tắt trình duyệt", en: "The cart is only kept if the customer doesn't close the browser", ja: "顧客がブラウザを閉じない場合のみカートが保持される" },
    ], correct: 0,
    explain: { vi: "Giỏ hàng nên gắn với tài khoản (lưu phía server), nên đăng nhập lại đúng tài khoản phải thấy lại đúng giỏ hàng.", en: "The cart should be tied to the account (stored server-side), so logging back into the same account should show the same cart.", ja: "カートはアカウントに紐づき（サーバー側に保存され）るべきなので、同じアカウントに再ログインすれば同じカートが表示されるはずです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử giỏ hàng & thanh toán (Cart & Checkout Testing) là kiểm tra toàn bộ hành trình từ lúc khách thêm sản phẩm vào giỏ, sửa số lượng, áp mã giảm giá, tính phí ship, cho tới lúc bấm 'Đặt hàng' và thanh toán thành công. Bài này bám màn hình giỏ hàng và thanh toán của app TMĐT ShopEasy: bạn học cách viết ca kiểm thử cho thêm/xóa/sửa số lượng, tính lại tổng tiền, mã giảm giá, phí ship, hết hàng khi đang thanh toán, thanh toán thất bại, và giữ giỏ hàng khi đăng nhập lại. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Cart & Checkout Testing means checking the whole journey from adding a product to the cart, editing quantity, applying a discount code, calculating shipping fee, all the way to clicking 'Order' and paying successfully. This article follows ShopEasy's cart and checkout screens: you'll learn to write test cases for adding/removing/editing quantity, recalculating totals, discount codes, shipping fees, out-of-stock during checkout, failed payments, and keeping the cart after re-login. Lots of visuals and a quiz at the end.",
        "カート＆チェックアウトのテストとは、商品をカートに追加し、数量を編集し、クーポンコードを適用し、送料を計算してから『注文する』を押して決済を完了するまでの一連の流れを確認することです。本記事はECアプリShopEasyのカート・決済画面に沿い、数量の追加/削除/編集、合計金額の再計算、クーポンコード、送料、決済中の在庫切れ、決済失敗、再ログイン後のカート保持といったテストケースの書き方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Giỏ hàng và trang thanh toán là nơi khách hàng thật sự bỏ tiền ra — nên đây cũng là nơi bug gây thiệt hại nặng nề nhất nếu lọt lưới: tính sai tiền, cho đặt hàng sản phẩm đã hết, hay trừ tiền mà không tạo đơn. Không giống một form đăng ký đơn giản, giỏ hàng có rất nhiều trạng thái thay đổi liên tục (số lượng, giá, khuyến mãi, tồn kho), nên người mới rất dễ bỏ sót góc kiểm thử. Chúng ta sẽ học qua màn hình giỏ hàng và thanh toán thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! The cart and checkout page is where customers actually spend money — so it's also where bugs cause the most damage if they slip through: wrong totals, letting customers order out-of-stock products, or deducting money without creating an order. Unlike a simple signup form, a cart has many constantly changing states (quantity, price, promotions, stock), so beginners easily miss testing angles. We'll learn through ShopEasy's real cart and checkout screens, with visuals and hands-on practice.",
        "こんにちは、初心者さん！カートと決済ページは顧客が実際にお金を使う場所です——そのためバグが見逃されると最も大きな損害をもたらす場所でもあります：金額の誤計算、在庫切れ商品の注文許可、注文が作られないのに引き落としが発生する、など。単純な登録フォームと違い、カートは数量・価格・キャンペーン・在庫といった常に変化する状態を多く持つため、初心者はテスト観点を見落としがちです。実際のShopEasyのカートと決済画面を通じて、図と実習付きで学びます。"),
      IMG(m_cart, "Màn hình test: giỏ hàng ShopEasy với 2 sản phẩm, số lượng và thành tiền", "Screen under test: ShopEasy cart with 2 products, quantity and subtotal", "テスト対象画面：2商品・数量・小計があるShopEasyのカート"),
      DEF("Cart & Checkout Testing", "kiểm thử toàn bộ hành trình từ giỏ hàng đến khi thanh toán thành công: số lượng, tổng tiền, giảm giá, ship, tồn kho và trạng thái thanh toán.",
        "testing the entire journey from cart to successful payment: quantity, totals, discounts, shipping, stock, and payment status.",
        "カートから決済完了までの一連の流れをテストすること：数量、合計金額、割引、送料、在庫、決済状態。"),
    ] },
  { heading: { vi: "2. Thêm / xóa / sửa số lượng — tính lại tổng tiền ngay", en: "2. Add / remove / edit quantity — recalculate the total instantly", ja: "2. 数量の追加・削除・変更 — 合計金額を即座に再計算" },
    blocks: [
      P("Ba thao tác cơ bản nhất trên giỏ hàng là: thêm sản phẩm, xóa sản phẩm, và sửa số lượng. Nghe đơn giản, nhưng đây lại là nơi rất dễ lọt lỗi vì mỗi thao tác đều kéo theo việc TÍNH LẠI tổng tiền ngay lập tức. Với bạn mới, hãy tập thói quen: sau MỖI thao tác trên giỏ hàng, luôn kiểm tra lại tổng tiền hiển thị có khớp với phép tính thủ công (đơn giá × số lượng, cộng dồn các sản phẩm) hay không.",
        "The three most basic cart actions are: adding a product, removing a product, and editing quantity. It sounds simple, but this is where bugs easily slip through because every action must trigger an instant recalculation of the total. As a beginner, build the habit of checking, after EVERY cart action, whether the displayed total matches the manual calculation (unit price × quantity, summed across products).",
        "カートの最も基本的な3つの操作は、商品の追加、商品の削除、数量の変更です。単純に聞こえますが、どの操作も即座に合計金額の再計算を伴うため、バグが紛れ込みやすい箇所です。初心者のうちは、カートで何か操作するたびに、表示されている合計金額が手計算（単価×数量を商品ごとに合算）と一致しているか確認する習慣をつけましょう。"),
      P("Một lỗi rất phổ biến là 'độ trễ hiển thị': khách sửa số lượng xong, tổng tiền vẫn hiện số cũ một lúc rồi mới cập nhật, hoặc tệ hơn — cần bấm thêm nút 'Cập nhật giỏ' thì tổng mới đúng. Với người dùng thật, độ trễ hoặc yêu cầu thao tác thừa như vậy dễ khiến họ nghi ngờ app tính sai và rời bỏ giỏ hàng giữa chừng. Vì vậy, ngoài kiểm tra CON SỐ đúng, bạn cũng nên kiểm tra THỜI ĐIỂM cập nhật có tức thời hay không.",
        "A very common bug is 'display lag': after editing quantity, the total still shows the old number for a while before updating, or worse — the customer must click an extra 'Update cart' button for the total to become correct. For real users, such lag or extra required steps easily make them suspect the app is miscalculating and abandon the cart midway. So besides checking that the NUMBER is correct, you should also check WHEN it updates — instantly or not.",
        "よくあるバグは『表示の遅延』です：数量を変更した後もしばらく古い合計金額が表示されたまま、あるいはさらに悪いことに『カート更新』ボタンを追加で押さないと正しい合計にならない、といったケースです。実際のユーザーにとって、こうした遅延や余分な操作要求はアプリが誤計算していると疑わせ、途中でカートを放棄する原因になります。そのため、数値が正しいかだけでなく、更新のタイミングが即時かどうかも確認すべきです。"),
      IMG(m_qty, "Bảng ca kiểm thử thêm/xóa/sửa số lượng & tổng tiền mong đợi trên giỏ hàng ShopEasy", "Test case table for add/remove/edit quantity & expected totals on ShopEasy's cart", "ShopEasyカートでの数量追加/削除/変更と期待される合計金額のテストケース表"),
      TIP("Khi số lượng giảm về 0, sản phẩm nên tự động bị loại khỏi giỏ (không để lại dòng 'Số lượng: 0' gây rối mắt).", "When quantity drops to 0, the product should be automatically removed from the cart (don't leave a confusing 'Quantity: 0' row).", "数量が0になったら、その商品は自動的にカートから削除されるべきです（『数量：0』という紛らわしい行を残さない）。"),
    ] },
  { heading: { vi: "3. Mã giảm giá & phí vận chuyển", en: "3. Discount codes & shipping fees", ja: "3. クーポンコードと送料" },
    blocks: [
      P("Sau khi tổng tiền cơ bản đã đúng, bước tiếp theo là kiểm thử hai yếu tố hay bị bỏ quên: mã giảm giá (coupon) và phí vận chuyển (ship). Với mã giảm giá, bạn cần thử đủ các nhánh: mã hợp lệ, mã hết hạn, mã chưa đủ điều kiện (đơn hàng chưa đạt giá trị tối thiểu), và đặc biệt là mã có bị áp được nhiều lần trong cùng một đơn hay không — đây là lỗ hổng có thể gây thiệt hại tiền thật cho doanh nghiệp nếu không được chặn đúng.",
        "Once the base total is correct, the next step is testing two often-forgotten factors: discount codes (coupons) and shipping fees. For discount codes, you need to try all branches: a valid code, an expired code, a code not yet eligible (order below the minimum value), and especially whether the same code can be applied multiple times in one order — a hole that can cause real financial loss to the business if not blocked correctly.",
        "基本の合計金額が正しくなったら、次は忘れられがちな2つの要素をテストします：クーポンコードと送料です。クーポンコードでは、有効なコード、期限切れのコード、条件未達（最低注文額に届いていない）のコード、そして特に同じコードが1つの注文で複数回適用できてしまわないかを確認する必要があります——これは正しくブロックされなければ企業に実際の金銭的損失をもたらしかねない穴です。"),
      P("Phí vận chuyển thường phụ thuộc vào nhiều biến số: khu vực giao hàng, trọng lượng đơn hàng, hoặc ngưỡng miễn phí ship (freeship khi đơn đạt một mức tiền nhất định). Ca kiểm thử cần bao phủ cả biên của ngưỡng: đơn hàng ngay dưới ngưỡng freeship (vẫn tính phí ship) và đơn hàng ngay tại/trên ngưỡng (phí ship phải về 0đ). Một mẹo hữu ích: luôn thử áp mã giảm giá TRƯỚC khi kiểm tra ngưỡng freeship, vì thứ tự tính (giảm giá trước hay ship trước) có thể ảnh hưởng tới việc đơn hàng có đạt ngưỡng hay không.",
        "Shipping fees usually depend on several variables: delivery region, order weight, or a free-shipping threshold (free ship once the order reaches a certain amount). Test cases need to cover the threshold's boundary too: an order just below the free-ship threshold (shipping still charged) and an order at/above the threshold (shipping fee must become 0đ). A useful tip: always try applying the discount code BEFORE checking the free-ship threshold, because the calculation order (discount first or shipping first) can affect whether the order reaches the threshold.",
        "送料は通常、配送地域、注文の重量、または送料無料の閾値（ある金額に達すると送料無料になる）など複数の変数に依存します。テストケースは閾値の境界もカバーする必要があります：送料無料の閾値を少し下回る注文（送料が課金される）と、閾値に達する/上回る注文（送料が0ドンになるべき）です。有用なコツとして、送料無料の閾値を確認する前に必ずクーポンコードを先に適用してみましょう。計算順序（先に割引か先に送料か）によって、注文が閾値に達するかどうかが変わり得るからです。"),
      IMG(m_coupon, "Bảng ca kiểm thử mã giảm giá và phí vận chuyển trên ShopEasy", "Test case table for discount codes and shipping fees on ShopEasy", "ShopEasyにおけるクーポンコードと送料のテストケース表"),
      DEF("Ngưỡng freeship", "mức giá trị đơn hàng tối thiểu mà tại đó phí vận chuyển tự động giảm về 0đ.",
        "the minimum order value at which the shipping fee automatically drops to 0.",
        "この金額に達すると送料が自動的に0になる、注文の最低金額のしきい値。"),
    ] },
  { heading: { vi: "4. Giữ giỏ hàng khi đăng xuất / đăng nhập lại", en: "4. Keeping the cart across logout / re-login", ja: "4. ログアウト・再ログイン後もカートを保持する" },
    blocks: [
      P("Một tình huống người mới hay quên test: khách đang chọn hàng, thoát app giữa chừng (hết pin, mất mạng, hoặc chủ động đăng xuất), rồi quay lại đăng nhập sau đó — có thể vài phút, có thể vài ngày. Giỏ hàng có nên được giữ nguyên không? Câu trả lời đúng gần như luôn là CÓ, vì phần lớn app TMĐT lưu giỏ hàng gắn với tài khoản ở phía server, chứ không chỉ lưu tạm trên trình duyệt/thiết bị đang dùng.",
        "A situation beginners often forget to test: a customer is picking products, exits the app mid-way (battery dies, loses connection, or deliberately logs out), then comes back and logs in later — maybe minutes, maybe days later. Should the cart stay the same? The correct answer is almost always YES, because most e-commerce apps store the cart tied to the account server-side, not just temporarily on the current browser/device.",
        "初心者がよくテストを忘れるシーンです：顧客が商品を選んでいる途中でアプリを終了し（バッテリー切れ、通信断、または意図的なログアウト）、その後（数分後かもしれないし数日後かもしれない）再度ログインする——カートはそのまま保持されるべきでしょうか？正解はほとんどの場合『はい』です。ほとんどのECアプリはカートを現在のブラウザ/デバイスに一時的に保存するのではなく、サーバー側でアカウントに紐づけて保存しているからです。"),
      P("Bạn nên thử ít nhất 3 kịch bản: (1) đăng xuất chủ động rồi đăng nhập lại trên cùng thiết bị; (2) đóng app đột ngột (không đăng xuất) rồi mở lại; (3) đăng nhập trên một thiết bị khác bằng cùng tài khoản. Ở cả 3 trường hợp, giỏ hàng đều phải hiển thị đúng những gì khách đã chọn trước đó. Nếu giỏ hàng bị mất chỉ vì khách đăng xuất, đó là một trải nghiệm rất tệ khiến khách phải chọn lại từ đầu — và nhiều khách sẽ bỏ cuộc thay vì mua lại.",
        "You should try at least 3 scenarios: (1) deliberately logging out then back in on the same device; (2) suddenly closing the app (without logging out) then reopening it; (3) logging in on a different device with the same account. In all 3 cases, the cart must show exactly what the customer previously selected. If the cart is lost just because the customer logged out, that's a very poor experience forcing them to reselect everything — and many customers will give up rather than shop again.",
        "少なくとも3つのシナリオを試すべきです：（1）意図的にログアウトし同じデバイスで再ログイン、（2）ログアウトせず突然アプリを閉じて再度開く、（3）同じアカウントで別のデバイスにログインする。どの3ケースでも、カートは以前選んだ内容を正確に表示しなければなりません。ログアウトしただけでカートが失われるのは非常に悪い体験で、顧客は最初から選び直す必要があり——多くの顧客は買い直すよりも諦めてしまいます。"),
      IMG(m_relogin, "Bug: giỏ hàng bị trống sau khi đăng nhập lại đúng tài khoản trên ShopEasy", "Bug: cart is empty after logging back into the correct account on ShopEasy", "バグ：ShopEasyで正しいアカウントに再ログインしてもカートが空になっている"),
      TIP("Nếu app cho phép mua hàng không cần đăng nhập (guest checkout), hãy test thêm: giỏ hàng của khách vãng lai có được GỘP vào tài khoản khi họ đăng nhập giữa chừng không.", "If the app allows guest checkout, also test whether a guest's cart gets MERGED into the account when they log in midway.", "アプリがゲスト購入を許可している場合、ゲストのカートが途中でログインした際にアカウントに統合されるかもテストしましょう。"),
    ] },
  { heading: { vi: "5. Chuẩn bị: checklist & kỹ thuật kiểm thử giỏ hàng/thanh toán", en: "5. Prepare: a checklist & techniques for cart/checkout testing", ja: "5. 準備：カート/決済テストのチェックリストと技法" },
    blocks: [
      P("Trước khi viết ca kiểm thử chi tiết, bạn cần một checklist để không bỏ sót các khu vực rủi ro cao của giỏ hàng và thanh toán. Dưới đây là quy trình 3 bước để xây checklist đó cho bất kỳ tính năng giỏ hàng nào bạn gặp trong công việc thật.",
        "Before writing detailed test cases, you need a checklist so you don't miss the cart and checkout's high-risk areas. Below is a 3-step process to build that checklist for any cart feature you encounter in real work.",
        "詳細なテストケースを書く前に、カートと決済の高リスク領域を見落とさないためのチェックリストが必要です。以下は、実際の仕事で出会うどんなカート機能にもこのチェックリストを作るための3ステップの手順です。"),
      STEP(1, "Liệt kê mọi con số hiển thị trên giỏ hàng/thanh toán: đơn giá, số lượng, thành tiền từng dòng, tổng tạm tính, giảm giá, phí ship, tổng cuối cùng.", "List every number shown on the cart/checkout: unit price, quantity, line subtotal, subtotal, discount, shipping, final total.", "カート/決済に表示されるすべての数値を列挙する：単価、数量、行ごとの小計、小計、割引、送料、最終合計。"),
      STEP(2, "Với mỗi con số, xác định nó phụ thuộc vào những gì (số lượng, mã giảm giá, khu vực giao hàng) và viết công thức tính bằng tay để đối chiếu.", "For each number, identify what it depends on (quantity, coupon, delivery region) and write the manual formula to cross-check.", "各数値について、それが何に依存するか（数量、クーポン、配送地域）を特定し、照合用の手計算式を書く。"),
      STEP(3, "Liệt kê các mốc thời gian nhạy cảm: sản phẩm hết hàng giữa lúc thanh toán, mất mạng đúng lúc trừ tiền, phiên đăng nhập hết hạn giữa lúc đặt hàng.", "List sensitive timing points: a product going out of stock mid-checkout, losing connection right as money is deducted, a session expiring mid-order.", "在庫切れが決済中に起きる、金額引き落とし中に通信が切れる、注文中にログインセッションが切れる、といった時間的にデリケートなポイントを列挙する。"),
      TRY("Mở giỏ hàng của một app TMĐT bạn hay dùng, liệt kê ít nhất 5 con số hiển thị và thử đối chiếu bằng tay xem chúng có khớp công thức không.", "Open a cart in an e-commerce app you use, list at least 5 displayed numbers, and manually cross-check whether they match the formula.", "よく使うECアプリのカートを開き、表示されている数値を少なくとも5つ挙げ、手計算で式と一致するか照合してみよう。"),
      PITFALL("Chỉ kiểm tra con số cuối cùng (tổng thanh toán) mà bỏ qua các bước tính trung gian — khi tổng sai, bạn sẽ mất nhiều thời gian để tìm ra công đoạn nào tính sai.", "Only checking the final number (grand total) while skipping intermediate calculation steps — when the total is wrong, you'll waste time finding which step miscalculated.", "最終的な数値（合計金額）だけを確認し、途中の計算ステップを省略すること——合計が間違っていたとき、どの段階で誤計算したのか探すのに時間がかかります。"),
      IMG(m_technique, "Checklist kỹ thuật kiểm thử giỏ hàng & thanh toán, minh hoạ trên ShopEasy", "Checklist of cart/checkout testing techniques, illustrated on ShopEasy", "カート・決済テストの技法チェックリスト、ShopEasyで例示"),
    ] },
  { heading: { vi: "6. Viết ca kiểm thử từng bước (thực hành: hết hàng khi thanh toán)", en: "6. Writing test cases step by step (hands-on: out of stock at checkout)", ja: "6. テストケースを一歩ずつ書く（実習：決済時の在庫切れ）" },
    blocks: [
      P("Giờ ta áp dụng checklist ở chương trên vào một tình huống rủi ro cao: sản phẩm hết hàng đúng lúc khách đang ở trang thanh toán. Làm theo thứ tự dưới đây để có một ca kiểm thử đầy đủ, có thể tái sử dụng cho các tính năng tương tự.",
        "Now let's apply the checklist from the previous chapter to a high-risk situation: a product going out of stock right while a customer is on the checkout page. Follow the order below to get a complete, reusable test case for similar features.",
        "では前章のチェックリストを、高リスクなシーン——顧客がまさに決済ページにいるときに商品が在庫切れになる——に適用しましょう。以下の順に沿って、類似機能にも再利用できる完全なテストケースを作りましょう。"),
      STEP(1, "Chuẩn bị dữ liệu: một sản phẩm chỉ còn đúng 1 tồn kho, thêm vào giỏ của khách A và giỏ của khách B cùng lúc.", "Prepare data: a product with exactly 1 stock left, added to both customer A's and customer B's carts at the same time.", "データを準備：在庫がちょうど1個だけ残っている商品を、顧客Aと顧客Bのカートに同時に追加する。"),
      STEP(2, "Khách A bấm 'Đặt hàng' và thanh toán thành công trước — tồn kho về 0.", "Customer A clicks 'Order' and pays successfully first — stock drops to 0.", "顧客Aが先に『注文する』を押して決済を成功させる——在庫が0になる。"),
      STEP(3, "Khách B (vẫn đang ở trang thanh toán với sản phẩm đó trong giỏ) bấm 'Đặt hàng'. Ghi lại Expected (hệ thống phải chặn, báo hết hàng) và Actual (điều thực sự xảy ra).", "Customer B (still on checkout with that product in the cart) clicks 'Order'. Record Expected (system must block, show out of stock) and Actual (what actually happens).", "顧客B（その商品をカートに入れたままま決済ページにいる）が『注文する』を押す。Expected（システムはブロックし在庫切れを表示すべき）とActual（実際に起きたこと）を記録する。"),
      STEP(4, "Nếu hệ thống KHÔNG chặn đúng, chuyển ngay thành bug report Critical (vì ảnh hưởng tới tiền và khả năng giao hàng thật).", "If the system does NOT correctly block it, immediately turn it into a Critical bug report (since it affects real money and delivery capability).", "システムが正しくブロックしない場合、直ちにCriticalバグとして報告する（実際の金額と配送可否に影響するため）。"),
      CODE("text", "CA KIEM THU - 'Het hang luc dang thanh toan' (ShopEasy)\nDu lieu: San pham X chi con 1 ton kho, ca 2 khach A va B deu co san pham X trong gio\nBuoc: A dat hang thanh cong truoc -> ton kho = 0\nBuoc: B (van o trang thanh toan) bam 'Dat hang'\nExpected: he thong chan, bao 'San pham da het hang', cap nhat lai gio va tong tien cua B\nActual: don hang cua B van duoc tao, tru du tien cho san pham X (BUG - Critical)"),
      TRY("Viết thêm 1 ca kiểm thử tương tự cho trường hợp CÒN 2 tồn kho nhưng có 3 khách cùng đặt cùng lúc.", "Write one more similar test case for the situation of 2 stock left but 3 customers ordering at the same time.", "在庫が2個残っているが3人の顧客が同時に注文する状況について、同様のテストケースをもう1つ書いてみよう。"),
    ] },
  { heading: { vi: "7. Tình huống 1: hết hàng giữa chừng khi thanh toán", en: "7. Situation 1: out of stock mid-checkout", ja: "7. シーン1：決済の途中で在庫切れになる" },
    blocks: [
      SITUATION("Đội chỉ test luồng thanh toán với dữ liệu tồn kho đứng yên — nhập một số tồn kho cố định rồi không đổi trong suốt quá trình test.", "The team only tests the checkout flow with static stock data — entering a fixed stock number that never changes during testing.",
        "Lên production, vào giờ cao điểm (sale flash), nhiều khách cùng đặt một sản phẩm sắp hết hàng. Một số khách vẫn đặt được hàng thành công dù sản phẩm đã hết, dẫn tới hàng trăm đơn không thể giao, phải hoàn tiền và xin lỗi khách hàng loạt.",
        "In production, during peak hours (a flash sale), many customers order the same nearly-sold-out product at once. Some customers still successfully place orders even though the product is already out of stock, resulting in hundreds of orders that can't be delivered, requiring mass refunds and apologies.",
        "チームは在庫データが変化しない静的な状態でのみ決済フローをテスト——固定の在庫数を入力し、テスト中ずっと変更しない。",
        "本番環境のピーク時間（フラッシュセール）に、多くの顧客がほぼ売り切れの同じ商品を同時に注文。在庫切れにもかかわらず注文が成立してしまう顧客が出て、数百件の配送不能な注文が発生し、大規模な返金と謝罪が必要になった。"),
      SOLVE("Bổ sung ca kiểm thử với NHIỀU khách hàng thao tác đồng thời trên cùng một sản phẩm sắp hết hàng (test đồng thời/concurrency), và đảm bảo hệ thống kiểm tra lại tồn kho ngay tại thời điểm bấm 'Đặt hàng', không chỉ lúc thêm vào giỏ.", "Add test cases with MULTIPLE customers acting simultaneously on the same nearly-sold-out product (concurrency testing), and ensure the system rechecks stock right at the moment 'Order' is clicked, not just when adding to cart.", "ほぼ売り切れの同じ商品に対して複数の顧客が同時に操作するテストケース（並行性テスト）を追加し、カートに追加した時点だけでなく『注文する』を押した瞬間に在庫を再確認することを保証する。"),
      P("Bài học ở đây: kiểm tra tồn kho chỉ MỘT LẦN lúc thêm vào giỏ là chưa đủ, vì giữa lúc thêm vào giỏ và lúc bấm 'Đặt hàng' có thể cách nhau vài phút đến vài giờ — đủ để nhiều khách khác mua hết hàng. Hệ thống bắt buộc phải kiểm tra lại tồn kho ở BƯỚC CUỐI CÙNG trước khi xác nhận đơn hàng, đây là nguyên tắc 'kiểm tra lại ngay trước khi cam kết' rất quan trọng với mọi tài nguyên có giới hạn (tồn kho, chỗ ngồi, voucher số lượng có hạn).",
        "The lesson here: checking stock only ONCE when adding to cart isn't enough, because the gap between adding to cart and clicking 'Order' can be minutes to hours — enough time for other customers to buy it all. The system must recheck stock at the FINAL STEP before confirming the order — the important 'recheck right before committing' principle that applies to any limited resource (stock, seats, limited-quantity vouchers).",
        "ここでの教訓：カートに追加する時に一度だけ在庫を確認するのでは不十分です。カートに追加してから『注文する』を押すまでの間隔は数分から数時間にもなり得て、その間に他の顧客が買い尽くしてしまう可能性があるからです。システムは注文を確定する直前の最終ステップで必ず在庫を再確認しなければなりません。これは在庫・座席・数量限定クーポンなど、あらゆる限られたリソースに当てはまる『コミットする直前に再確認する』という重要な原則です。"),
      IMG(m_jira, "Ticket lỗi tìm được: sản phẩm hết hàng vẫn cho đặt hàng thành công", "Bug ticket found: an out-of-stock product still allows a successful order", "見つかったバグチケット：在庫切れ商品でも注文が成立してしまう"),
      RECAP(["Kiểm tra tồn kho 1 lần lúc thêm giỏ là chưa đủ", "Phải kiểm tra lại tồn kho ngay trước khi xác nhận đơn hàng"],
        ["Checking stock once at add-to-cart isn't enough", "Must recheck stock right before confirming the order"],
        ["カート追加時の1回だけの在庫確認では不十分", "注文確定の直前に必ず在庫を再確認する必要がある"]),
    ] },
  { heading: { vi: "8. Tình huống 2: thanh toán thất bại nhưng đơn hàng/tiền bị xử lý sai", en: "8. Situation 2: payment fails but the order/money is handled wrong", ja: "8. シーン2：決済失敗なのに注文・お金の処理が誤っている" },
    blocks: [
      SITUATION("Bạn chủ động test tình huống 'phá': bấm 'Thanh toán' rồi tắt wifi ngay lập tức, đúng vào khoảnh khắc hệ thống đang xử lý trừ tiền.", "You deliberately test a 'breaking' situation: click 'Pay' then immediately turn off wifi, exactly at the moment the system is processing the deduction.",
        "Tiền đã bị trừ khỏi thẻ của bạn (có thông báo từ ngân hàng), nhưng ShopEasy không tạo đơn hàng nào và giỏ hàng trở về trạng thái ban đầu như chưa từng thanh toán — bạn mất tiền mà không nhận được gì.",
        "Money has been deducted from your card (confirmed by a bank notification), but ShopEasy created no order at all and the cart reverted to its original state as if payment never happened — you lost money and got nothing.",
        "『壊す』テストをあえて実施：『支払う』を押した直後、システムがまさに引き落としを処理している瞬間にWi-Fiを切る。",
        "カードから代金が引き落とされた（銀行から通知あり）にもかかわらず、ShopEasyは注文を一切作成せず、カートは決済したことがなかったかのように元の状態に戻ってしまった——お金を失ったのに何も得られない。"),
      SOLVE("Báo bug Critical ngay lập tức (mất tiền thật của khách), đề xuất cơ chế đối soát giao dịch: nếu ngân hàng xác nhận đã trừ tiền nhưng hệ thống không tạo được đơn, phải TỰ ĐỘNG hoàn tiền hoặc giữ đơn ở trạng thái 'chờ xác nhận thanh toán' để đội vận hành xử lý thủ công, không được để mất dấu giao dịch.", "Report it as a Critical bug immediately (real customer money lost), propose a transaction reconciliation mechanism: if the bank confirms money was deducted but the system failed to create an order, it must AUTOMATICALLY refund or keep the order in a 'pending payment confirmation' state for the operations team to handle manually — never lose track of the transaction.", "即座にCriticalバグとして報告する（顧客の実際のお金が失われたため）。取引照合の仕組みを提案する：銀行が引き落としを確認したのにシステムが注文を作成できなかった場合、自動的に返金するか、注文を『決済確認待ち』状態にして運用チームが手動対応できるようにし、取引を見失わないようにする。"),
      P("Đây là ví dụ điển hình cho thấy vì sao trang thanh toán cần được test kỹ hơn bất kỳ màn hình nào khác trong app: nó là nơi TIỀN THẬT di chuyển. Với các luồng liên quan tới tiền, luôn cần đặt câu hỏi 'nếu bước này thất bại giữa chừng thì tiền đi đâu, đơn hàng ở trạng thái nào?' cho MỌI bước, không chỉ bước cuối cùng. Ưu tiên các ca kiểm thử ngắt quãng (mất mạng, đóng app, hết session) đúng vào các thời điểm nhạy cảm nhất: ngay trước khi trừ tiền, đang trừ tiền, và ngay sau khi trừ tiền.",
        "This is a textbook example of why the checkout page needs more thorough testing than any other screen in the app: it's where REAL MONEY moves. For any money-related flow, always ask 'if this step fails mid-way, where does the money go, what state is the order in?' for EVERY step, not just the last one. Prioritize interruption test cases (lost connection, app closed, session expired) exactly at the most sensitive moments: right before deducting money, while deducting, and right after deducting.",
        "これは、決済ページがアプリ内の他のどの画面よりも入念にテストされるべき理由を示す典型例です：そこは実際のお金が動く場所だからです。お金に関わるすべての流れについて、最後のステップだけでなくすべてのステップに対して『この段階で失敗したら、お金はどこへ行き、注文はどの状態になるのか』を常に問うべきです。通信断・アプリ終了・セッション切れといった中断のテストケースは、最もデリケートな瞬間——引き落とし直前、引き落とし中、引き落とし直後——に優先的に実施しましょう。"),
      TRY("Nghĩ thêm một thời điểm 'nhạy cảm' khác trong luồng thanh toán ShopEasy (ví dụ: ngay sau khi nhập mã OTP ngân hàng) và đề xuất 1 ca kiểm thử ngắt quãng cho nó.", "Think of another 'sensitive' moment in ShopEasy's payment flow (e.g. right after entering the bank OTP code) and propose one interruption test case for it.", "ShopEasyの決済フローにおける別の『デリケートな』瞬間（例：銀行のOTPコード入力直後）を考え、そのための中断テストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi kiểm thử giỏ hàng và thanh toán. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing cart and checkout. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はカートと決済のテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ test với 1 sản phẩm trong giỏ, bỏ qua trường hợp nhiều sản phẩm với đơn giá và số lượng khác nhau — nơi công thức cộng dồn dễ tính sai nhất.", "Only testing with 1 product in the cart, skipping cases with multiple products at different prices and quantities — where the summing formula is most likely to miscalculate.", "カートに商品が1つだけの場合のみテストし、価格や数量の異なる複数商品のケース——合算式が最も誤計算しやすい場所——を見逃す。"),
      PITFALL("Test giảm giá và phí ship RIÊNG LẺ mà không test khi cả hai cùng xuất hiện trong 1 đơn — thứ tự áp dụng (giảm giá trước hay ship trước) có thể cho ra tổng tiền khác nhau.", "Testing discounts and shipping fees SEPARATELY without testing when both appear in the same order — the application order (discount first or shipping first) can produce different totals.", "割引と送料を別々にテストし、両方が同じ注文に同時に現れる場合をテストしないこと——適用順序（先に割引か先に送料か）によって異なる合計金額になり得ます。"),
      TIP("Trước khi báo một ca lỗi tính tiền là bug, luôn tính lại bằng tay (hoặc bằng máy tính) rồi ghi rõ công thức bạn dùng trong bug report — giúp dev xác định đúng công đoạn sai nhanh hơn nhiều.", "Before reporting a money-calculation error as a bug, always recompute it by hand (or calculator) and clearly write the formula you used in the bug report — this helps developers pinpoint the wrong step much faster.", "金額計算のエラーをバグとして報告する前に、必ず手（または電卓）で再計算し、使用した計算式をバグレポートに明記しましょう——開発者が誤った段階をより速く特定できます。"),
      IMG(m_kanban, "Bảng theo dõi lỗi giỏ hàng & thanh toán (ShopEasy · Sprint 18)", "Board tracking cart & checkout bugs (ShopEasy · Sprint 18)", "カート・決済のバグ追跡ボード（ShopEasy・スプリント18）"),
      IMG(m_dash, "Số liệu: gần phân nửa lỗi sprint là lỗi tính tiền, phần còn lại chủ yếu là tồn kho/checkout", "Metrics: nearly half the sprint's bugs are money-calculation errors, the rest mostly stock/checkout", "指標：スプリントのバグの約半分は金額計算エラーで、残りは主に在庫/決済関連"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者向けネガティブテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử giỏ hàng và thanh toán qua app TMĐT ShopEasy: thêm/xóa/sửa số lượng và tính lại tổng tiền, mã giảm giá và phí vận chuyển, giữ giỏ hàng khi đăng nhập lại, cùng hai tình huống thật — hết hàng giữa chừng khi thanh toán và thanh toán thất bại nhưng tiền bị xử lý sai. Bạn cũng có checklist kỹ thuật để không bỏ sót các khu vực rủi ro cao liên quan tới tiền và tồn kho. Đây là kỹ năng cực kỳ giá trị vì hầu hết app TMĐT, đặt vé, đặt phòng đều có luồng giỏ hàng/thanh toán tương tự.",
        "You just learned how to test cart and checkout through ShopEasy: adding/removing/editing quantity and recalculating totals, discount codes and shipping fees, keeping the cart across re-login, plus two real situations — out of stock mid-checkout and a failed payment mishandled. You also got a technique checklist so you don't miss high-risk areas related to money and stock. This is an extremely valuable skill since most e-commerce, ticketing, and booking apps share a similar cart/checkout flow.",
        "ShopEasyを通じて、カートと決済のテスト方法を学びました：数量の追加/削除/変更と合計金額の再計算、クーポンコードと送料、再ログイン後のカート保持、そして2つの実例——決済中の在庫切れと、決済失敗時のお金の誤処理です。また、お金と在庫に関わる高リスク領域を見落とさないための技法チェックリストも得ました。ほとんどのEC、チケット予約、宿泊予約アプリが同様のカート/決済フローを持つため、これは非常に価値あるスキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thêm kiểm thử âm (negative testing) và test chức năng (functional testing) để nghĩ ca kiểm thử có hệ thống hơn ở các tính năng khác, cùng cách viết bug report chuẩn để báo cáo những gì bạn tìm được. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật (bao gồm luyện test các luồng TMĐT thực tế), một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should practice more negative testing and functional testing to design test cases more systematically for other features, along with how to write a proper bug report for what you find. If you want to learn properly from zero to hired with a mentor and real projects (including practicing on real e-commerce flows), a Tester course helps you progress fast and apply with confidence.",
        "次は、他の機能でもより体系的にテストケースを設計するために、ネガティブテストや機能テストをさらに練習し、見つけたバグを報告するための適切なバグレポートの書き方も学びましょう。実際のEC業務フローの演習も含め、指導者と実案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const CART_CHECKOUT_01 = makeDoc({
  slug: "kiem-thu-gio-hang-thanh-toan-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử giỏ hàng",
  keywords: ["kiểm thử giỏ hàng", "kiểm thử thanh toán", "cart testing", "checkout testing", "ca kiểm thử giỏ hàng cho người mới"],
  coverLabel: "NGƯỜI MỚI · GIỎ HÀNG & THANH TOÁN · TMĐT",
  crumb: "Kiểm thử giỏ hàng & thanh toán (Cart & Checkout Testing)",
  metaTitle: { vi: "Kiểm thử giỏ hàng & thanh toán cho người mới", en: "Cart & checkout testing for beginners", ja: "初心者向けカート・決済テスト" },
  metaDescription: {
    vi: "Kiểm thử giỏ hàng & thanh toán cho người mới: thêm/xóa/sửa số lượng, tính tổng tiền, mã giảm giá, phí ship, hết hàng khi thanh toán, ví dụ ShopEasy.",
    en: "Cart & checkout testing for beginners: add/remove/edit quantity, recalculate totals, discount codes, shipping fees, out-of-stock at checkout, real ShopEasy examples, with visuals and a quiz.",
    ja: "初心者向けカート・決済テスト：数量の追加削除変更、合計金額の再計算、クーポン、送料、決済時の在庫切れ、ShopEasyの実例、図とクイズ付きで解説します。",
  },
  title: {
    vi: "Kiểm thử giỏ hàng & thanh toán cho người mới: từ số lượng đến hết hàng, thanh toán thất bại (có trắc nghiệm)",
    en: "Cart & checkout testing for beginners: from quantity to out-of-stock and failed payments (with quiz)",
    ja: "初心者向けカート・決済テスト：数量から在庫切れ、決済失敗まで（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: kiểm thử giỏ hàng và thanh toán qua app TMĐT ShopEasy. Thêm/xóa/sửa số lượng và tính lại tổng tiền, mã giảm giá, phí ship, giữ giỏ hàng khi đăng nhập lại, ví dụ lỗi thật hết hàng khi thanh toán và thanh toán thất bại, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: test the cart and checkout of the ShopEasy e-commerce app. Add/remove/edit quantity and recalculate totals, discount codes, shipping fees, keeping the cart after re-login, real bug examples of out-of-stock at checkout and failed payments, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyのカートと決済をテストする。数量の追加/削除/編集と合計金額の再計算、クーポンコード、送料、再ログイン後のカート保持、決済時の在庫切れと決済失敗の実際のバグ例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử giỏ hàng & thanh toán", steps: [
    { name: "Liệt kê mọi con số & công thức trên giỏ hàng/thanh toán", text: "Đơn giá, số lượng, giảm giá, ship, tổng cuối cùng." },
    { name: "Test đủ nhánh mã giảm giá và ngưỡng freeship", text: "Hợp lệ, hết hạn, chưa đủ điều kiện, dùng nhiều lần." },
    { name: "Test các thời điểm nhạy cảm: hết hàng, mất mạng khi thanh toán", text: "Kiểm tra lại tồn kho ngay trước khi xác nhận đơn; đảm bảo tiền và đơn hàng luôn khớp nhau." },
  ] },
  pages,
});

export const MB_GIOHANG_01 = [CART_CHECKOUT_01];
