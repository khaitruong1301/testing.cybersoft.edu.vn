// doc_mb_dat_lai_mat_khau.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử tính năng quên & đặt lại mật khẩu (Password Reset) — luồng qua email/link,
// link hết hạn/dùng lại, ràng buộc mật khẩu mới, không trùng mật khẩu cũ, vô hiệu phiên cũ,
// và thông báo trung lập khi email không tồn tại (chống dò tài khoản).
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

// ── Mockup 1: màn "Quên mật khẩu" của ShopEasy + annotate thông báo trung lập ──
const m_forgot = browser("shopeasy.vn/quen-mat-khau", [
  panel("ShopEasy · Quên mật khẩu", [
    field(24, 20, 692, "Email đã đăng ký", "mai.tran@gmail.com", "focus"),
    btn(24, 96, 260, "Gửi liên kết đặt lại", "primary"),
    `<text x="24" y="152" font-size="12" fill="#16a34a">✓ Nếu email tồn tại trong hệ thống, một liên kết đặt lại đã được gửi.</text>`,
    annotate(20, 12, 700, 62, "Thông báo TRUNG LẬP dù email có tồn tại hay không"),
  ].join(""), { h: 190, accent: "#1a72f5" }),
].join(""), { h: 246, title: "ShopEasy · TMĐT", accent: "#1a72f5" });

// ── Mockup 2: hộp thư nhận email chứa link đặt lại + annotate hết hạn/dùng 1 lần ──
const m_email = browser("mail.google.com/inbox", [
  panel("📧 ShopEasy <no-reply@shopeasy.vn>", [
    `<text x="24" y="30" font-size="13" font-weight="700" fill="#0f172a">Đặt lại mật khẩu ShopEasy của bạn</text>`,
    `<text x="24" y="56" font-size="12" fill="#334155">Xin chào Mai, bấm nút bên dưới để đặt lại mật khẩu.</text>`,
    btn(24, 76, 260, "Đặt lại mật khẩu", "primary"),
    `<text x="24" y="146" font-size="11" fill="#94a3b8">Liên kết: https://shopeasy.vn/reset?token=8f3a9c...</text>`,
    annotate(20, 66, 300, 46, "Token dùng 1 LẦN · hết hạn sau 15 phút"),
  ].join(""), { h: 200, accent: "#7c3aed" }),
].join(""), { h: 256, title: "Hộp thư · Gmail", accent: "#7c3aed" });

// ── Mockup 3: bảng ca kiểm thử đặt lại mật khẩu (grid) ──
const m_cases = grid("Bảng ca kiểm thử đặt lại mật khẩu (ShopEasy)", ["Ca kiểm thử", "Dữ liệu / thao tác", "Kết quả mong đợi"], [
  ["Email hợp lệ đã đăng ký", "mai.tran@gmail.com", "Gửi email chứa liên kết, thông báo trung lập"],
  ["Email không tồn tại", "khong-ton-tai@gmail.com", "Thông báo trung lập giống hệt ca trên"],
  ["Mở lại link đã dùng", "Bấm lại link vừa đổi mật khẩu thành công", "Từ chối, yêu cầu gửi link mới"],
  ["Link quá hạn (>15 phút)", "Mở link sau 20 phút", "Từ chối, báo link đã hết hạn"],
  ["Mật khẩu mới trùng mật khẩu cũ", "Nhập lại đúng mật khẩu hiện tại", "Từ chối, báo không được trùng mật khẩu cũ"],
  ["Mật khẩu mới quá yếu", "'123456'", "Từ chối, báo chưa đủ mạnh"],
], { accent: "#1a72f5" });

// ── Mockup 4: form đặt mật khẩu mới với các ràng buộc ──
const m_newpw = browser("shopeasy.vn/dat-lai-mat-khau?token=8f3a9c...", [
  panel("ShopEasy · Đặt mật khẩu mới", [
    field(24, 20, 330, "Mật khẩu mới", "••••••••", "focus"),
    field(372, 20, 330, "Xác nhận mật khẩu", "••••••••", "normal"),
    `<text x="24" y="88" font-size="11" fill="#64748b">✓ Tối thiểu 8 ký tự, có chữ hoa, chữ thường và số</text>`,
    `<text x="24" y="104" font-size="11" fill="#64748b">✓ Không được trùng với 3 mật khẩu gần nhất</text>`,
    btn(24, 122, 220, "Xác nhận đổi mật khẩu", "primary"),
    annotate(368, 12, 334, 62, "Kiểm tra: 2 ô phải khớp nhau"),
  ].join(""), { h: 200, accent: "#16a34a" }),
].join(""), { h: 256, title: "ShopEasy · TMĐT", accent: "#16a34a" });

// ── Mockup 5: ticket Jira của lỗi link reset dùng lại được nhiều lần ──
const m_jira = jira({
  key: "SE-12480", title: "Đặt lại mật khẩu: liên kết reset dùng lại được nhiều lần, không hết hạn sau khi đổi thành công",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Quên mật khẩu, nhận link 2) Dùng link đổi mật khẩu thành công 3) Mở lại đúng link đó lần 2"],
    ["Kết quả mong đợi", "Link đã dùng phải bị vô hiệu, hệ thống từ chối và yêu cầu gửi lại link mới"],
    ["Kết quả thực tế", "Link vẫn mở được form đặt mật khẩu mới và cho đổi lại mật khẩu lần nữa"],
    ["Bằng chứng", "video-se12480.mp4, screenshot-link-reuse.png"],
  ],
});

// ── Mockup 6: bảng kanban theo dõi lỗi tìm được qua kiểm thử đặt lại mật khẩu ──
const m_kanban = kanban("Bảng theo dõi lỗi tìm qua kiểm thử đặt lại mật khẩu (ShopEasy · Sprint 20)", [
  { name: "New", cards: [
    { key: "SE-12480", title: "Link reset dùng lại được nhiều lần", sev: "Critical" },
    { key: "SE-12484", title: "Email không tồn tại báo lỗi rõ ràng", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-12470", title: "Đổi mật khẩu xong, phiên cũ vẫn còn hiệu lực", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-12455", title: "Mật khẩu mới trùng mật khẩu cũ vẫn được chấp nhận", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-12440", title: "Link reset không hết hạn sau 24 giờ", sev: "Low" },
  ] },
]);

// ── Mockup 7: dashboard số liệu lỗi tìm được qua kiểm thử đặt lại mật khẩu ──
const m_dash = dashboard("Lỗi tìm được: kiểm thử đặt lại mật khẩu — Sprint 20", [
  { label: "Tổng lỗi", value: "16", sub: "sprint này", color: "#2563eb" },
  { label: "Liên quan bảo mật", value: "9", sub: "~56%", color: "#e11d48" },
  { label: "Lỗi link/token", value: "6", sub: "hết hạn, dùng lại", color: "#7c3aed" },
  { label: "Mức Critical/High", value: "7", sub: "đa số từ link/phiên", color: "#e11d48" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vì sao liên kết đặt lại mật khẩu cần hết hạn và chỉ dùng được đúng một lần?",
  "Why should a password reset link expire and be usable only once?",
  "Vì liên kết đặt lại mật khẩu có quyền thay đổi trực tiếp mật khẩu tài khoản, nên nếu nó tồn tại mãi mãi hoặc dùng lại được nhiều lần, bất kỳ ai vô tình nhìn thấy link (trong hộp thư dùng chung, lịch sử trình duyệt, log hệ thống) đều có thể chiếm quyền tài khoản bất cứ lúc nào. Giới hạn thời gian sống (ví dụ 15 phút) và chỉ cho dùng một lần giúp thu hẹp tối đa cửa sổ rủi ro này.",
  "Because a password reset link has direct power to change an account's password, if it lived forever or could be reused, anyone who accidentally saw the link (a shared inbox, browser history, system logs) could hijack the account at any time. A short lifetime (e.g. 15 minutes) plus single-use dramatically narrows this risk window.",
  "パスワード再設定のリンクはなぜ期限切れになり、1回しか使えないようにすべき？",
  "パスワード再設定リンクはアカウントのパスワードを直接変更できる権限を持つため、永久に有効だったり何度も使い回せたりすると、共有受信箱・ブラウザ履歴・システムログなどでたまたまリンクを見た人が、いつでもアカウントを乗っ取れてしまいます。短い有効期限（例：15分）と1回限りの使用にすることで、このリスクの窓を最小限に抑えられます。");
const faq2 = FAQ(
  "Vì sao khi email không tồn tại trong hệ thống, ShopEasy vẫn nên hiện thông báo giống hệt như khi email tồn tại?",
  "Why should ShopEasy show the same message even when the email doesn't exist in the system?",
  "Nếu hệ thống báo rõ 'Email không tồn tại' cho email sai và 'Đã gửi link' cho email đúng, kẻ xấu có thể thử hàng loạt email để dò xem địa chỉ nào đã đăng ký tài khoản — gọi là account enumeration (dò tài khoản). Đây là bước đầu của tấn công có chủ đích (phishing, brute-force) nhắm vào đúng những người dùng thật. Thông báo trung lập ('nếu email tồn tại, chúng tôi đã gửi link') áp dụng cho cả hai trường hợp giúp che giấu thông tin này.",
  "If the system clearly says 'Email not found' for a wrong email and 'Link sent' for a correct one, an attacker can brute-force a list of emails to discover which addresses have accounts — known as account enumeration. This is often the first step of a targeted attack (phishing, brute-force) against real users. A neutral message ('if this email exists, we've sent a link') used for both cases hides that information.",
  "システムに存在しないメールアドレスの場合でも、ShopEasyはなぜ同じ通知を表示すべき？",
  "誤ったメールに『メールが存在しません』、正しいメールに『リンクを送信しました』と明確に表示すると、攻撃者は大量のメールアドレスを試して、どのアドレスがアカウントを持っているか調べられます——これはアカウント列挙（account enumeration）と呼ばれます。これは実在ユーザーを狙った標的型攻撃（フィッシング、総当たり攻撃）の第一歩になり得ます。両方のケースで同じ中立的な通知（『このメールが存在すればリンクを送信しました』）を使うことで、この情報を隠せます。");
const faq3 = FAQ(
  "Sau khi đổi mật khẩu thành công, các phiên đăng nhập cũ (session cũ) có nên tiếp tục hoạt động không?",
  "After a password change succeeds, should the old login sessions still keep working?",
  "Không nên. Nếu tài khoản đã bị chiếm đoạt và chủ tài khoản thật phải đặt lại mật khẩu để lấy lại quyền kiểm soát, nhưng phiên đăng nhập của kẻ chiếm đoạt vẫn còn hiệu lực trên thiết bị khác, thì đổi mật khẩu gần như vô nghĩa — kẻ xấu vẫn dùng được tài khoản. Vì vậy hệ thống nên vô hiệu hoá TOÀN BỘ phiên đăng nhập cũ (trừ phiên vừa dùng để đổi mật khẩu, tuỳ thiết kế) ngay khi đổi mật khẩu thành công, buộc mọi thiết bị phải đăng nhập lại.",
  "No. If an account was hijacked and the real owner resets the password to regain control, but the hijacker's session on another device is still valid, the password change is nearly pointless — the attacker can still use the account. So the system should invalidate ALL old login sessions (except possibly the one used to reset the password, depending on design) right when the password change succeeds, forcing every device to log in again.",
  "パスワード変更が成功した後、古いログインセッションは引き続き有効であるべき？",
  "いいえ、そうすべきではありません。アカウントが乗っ取られ、本来の持ち主が制御を取り戻すためにパスワードを再設定しても、乗っ取った人物の別デバイスでのセッションがまだ有効なら、パスワード変更はほぼ無意味です——攻撃者は引き続きアカウントを使えてしまいます。そのためシステムは、パスワード変更が成功した時点で（設計によっては再設定に使ったセッションを除き）すべての古いログインセッションを無効化し、全デバイスに再ログインを強制すべきです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục tiêu chính khi kiểm thử tính năng đặt lại mật khẩu là gì?", en: "What's the main goal when testing the password reset feature?", ja: "パスワード再設定機能のテストの主な目的は？" },
    options: [
      { vi: "Chỉ kiểm tra giao diện đẹp hay xấu", en: "Only checking whether the UI looks nice", ja: "UIの見た目が良いかどうかだけを確認すること" },
      { vi: "Xác nhận luồng đổi mật khẩu chạy đúng VÀ không bị lợi dụng để chiếm tài khoản/dò thông tin", en: "Confirming the reset flow works correctly AND can't be abused to hijack accounts or leak info", ja: "再設定フローが正しく動くこと、かつアカウント乗っ取りや情報漏えいに悪用されないことを確認すること" },
      { vi: "Chỉ kiểm tra tốc độ gửi email", en: "Only checking how fast the email is sent", ja: "メール送信の速さだけを確認すること" },
      { vi: "Không cần kiểm thử vì tính năng đơn giản", en: "No testing needed because the feature is simple", ja: "機能がシンプルなのでテストは不要" },
    ], correct: 1,
    explain: { vi: "Đặt lại mật khẩu ảnh hưởng trực tiếp tới quyền kiểm soát tài khoản, nên phải kiểm thử cả tính đúng đắn lẫn tính an toàn.", en: "Password reset directly affects account control, so both correctness and security must be tested.", ja: "パスワード再設定はアカウントの制御権に直結するため、正確性と安全性の両方をテストする必要があります。" },
  }),
  mcq({
    q: { vi: "Vì sao hệ thống KHÔNG nên báo rõ 'Email này không tồn tại' khi người dùng nhập sai email ở màn quên mật khẩu?", en: "Why should the system NOT clearly say 'This email doesn't exist' on the forgot-password screen?", ja: "パスワードを忘れた画面で、なぜシステムは『このメールは存在しません』と明確に表示すべきでない？" },
    options: [
      { vi: "Vì tốn dung lượng lưu trữ", en: "Because it wastes storage space", ja: "ストレージ容量を無駄にするから" },
      { vi: "Vì thông báo rõ ràng giúp kẻ xấu dò được email nào đã có tài khoản (account enumeration)", en: "Because a clear message helps attackers discover which emails have accounts (account enumeration)", ja: "明確な通知は攻撃者がどのメールがアカウントを持つか調べるのを助けてしまう（アカウント列挙）から" },
      { vi: "Vì thông báo rõ ràng làm chậm server", en: "Because a clear message slows down the server", ja: "明確な通知はサーバーを遅くするから" },
      { vi: "Vì người dùng không thích đọc thông báo dài", en: "Because users dislike reading long messages", ja: "ユーザーは長い通知を読みたがらないから" },
    ], correct: 1,
    explain: { vi: "Thông báo khác nhau giữa email tồn tại/không tồn tại là lỗ hổng dò tài khoản (account enumeration); nên dùng thông báo trung lập cho cả hai trường hợp.", en: "A different message for existing vs non-existing emails is an account enumeration flaw; a neutral message should be used for both cases.", ja: "存在する/存在しないメールで通知が異なるのはアカウント列挙の脆弱性であり、両方のケースで中立的な通知を使うべきです。" },
  }),
  mcq({
    q: { vi: "Đâu là ca kiểm thử hợp lý cho liên kết đặt lại mật khẩu đã được dùng thành công một lần?", en: "Which is a reasonable test case for a reset link that was already used successfully once?", ja: "既に1回正常に使用されたパスワード再設定リンクへの妥当なテストケースはどれ？" },
    options: [
      { vi: "Mở lại đúng link đó lần thứ hai và kỳ vọng hệ thống TỪ CHỐI", en: "Open that same link a second time, expecting the system to REJECT it", ja: "同じリンクをもう一度開き、システムが拒否することを期待する" },
      { vi: "Mở lại đúng link đó lần thứ hai và kỳ vọng hệ thống cho đổi mật khẩu tiếp", en: "Open that same link a second time, expecting the system to allow another password change", ja: "同じリンクをもう一度開き、システムがさらにパスワード変更を許可することを期待する" },
      { vi: "Không cần test lại link đã dùng", en: "No need to re-test an already-used link", ja: "既に使用済みのリンクを再テストする必要はない" },
      { vi: "Chỉ test link khi còn mới tinh, chưa từng bấm", en: "Only test the link while it's brand new and never clicked", ja: "一度もクリックしていない、真新しいリンクだけをテストする" },
      { vi: "Xoá link ngay sau khi gửi email", en: "Delete the link right after sending the email", ja: "メール送信直後にリンクを削除する" },
    ], correct: 0,
    explain: { vi: "Link reset phải bị vô hiệu ngay sau khi dùng một lần; mở lại lần 2 phải bị hệ thống từ chối để tránh bị lợi dụng.", en: "A reset link must be invalidated right after one use; opening it again should be rejected to prevent abuse.", ja: "再設定リンクは1回使用後すぐ無効化されるべきで、再度開いた場合は悪用防止のため拒否されるべきです。" },
  }),
  mcq({
    q: { vi: "Ngay sau khi người dùng đổi mật khẩu thành công qua luồng quên mật khẩu, hệ thống nên làm gì với các phiên đăng nhập cũ trên thiết bị khác?", en: "Right after a user successfully changes their password via the forgot-password flow, what should happen to old login sessions on other devices?", ja: "パスワードを忘れたフローでユーザーがパスワード変更に成功した直後、他のデバイスの古いログインセッションはどうすべき？" },
    options: [
      { vi: "Giữ nguyên, không cần làm gì", en: "Leave them unchanged, no action needed", ja: "そのまま何もしなくてよい" },
      { vi: "Vô hiệu hoá các phiên cũ, buộc đăng nhập lại bằng mật khẩu mới", en: "Invalidate old sessions, forcing re-login with the new password", ja: "古いセッションを無効化し、新しいパスワードでの再ログインを強制する" },
      { vi: "Xoá luôn tài khoản người dùng", en: "Delete the user's account entirely", ja: "ユーザーアカウントを完全に削除する" },
      { vi: "Gửi mật khẩu mới qua tin nhắn cho tất cả thiết bị", en: "Send the new password via SMS to all devices", ja: "全デバイスに新しいパスワードをSMSで送信する" },
    ], correct: 1,
    explain: { vi: "Vô hiệu phiên cũ ngăn kẻ đã chiếm tài khoản (nếu có) tiếp tục dùng phiên cũ sau khi chủ tài khoản đã đổi mật khẩu.", en: "Invalidating old sessions stops a potential hijacker from continuing to use an old session after the real owner changes the password.", ja: "古いセッションを無効化することで、本来の持ち主がパスワードを変更した後も、乗っ取った人物が古いセッションを使い続けることを防げます。" },
  }),
  mcq({
    q: { vi: "Ca kiểm thử nào hợp lý để kiểm tra ràng buộc 'mật khẩu mới không được trùng mật khẩu cũ'?", en: "Which test case is reasonable for checking the 'new password must not match the old one' rule?", ja: "『新しいパスワードは古いパスワードと同じであってはならない』という制約を確認する妥当なテストケースは？" },
    options: [
      { vi: "Nhập mật khẩu mới hoàn toàn khác mật khẩu hiện tại", en: "Enter a new password completely different from the current one", ja: "現在のパスワードと全く異なる新しいパスワードを入力する" },
      { vi: "Nhập lại đúng mật khẩu hiện tại làm mật khẩu mới, kỳ vọng hệ thống TỪ CHỐI", en: "Re-enter the exact current password as the new one, expecting the system to REJECT it", ja: "現在のパスワードとまったく同じものを新しいパスワードとして入力し、システムが拒否することを期待する" },
      { vi: "Để trống cả hai ô mật khẩu", en: "Leave both password fields blank", ja: "両方のパスワード欄を空欄にする" },
      { vi: "Chỉ kiểm tra độ dài mật khẩu, bỏ qua nội dung", en: "Only check the password length, ignore the content", ja: "パスワードの長さだけを確認し、内容は無視する" },
    ], correct: 1,
    explain: { vi: "Đây chính là ca kiểm thử trực tiếp cho ràng buộc không trùng mật khẩu cũ: nhập đúng mật khẩu hiện tại và xác nhận hệ thống từ chối.", en: "This is the direct test for the 'no reuse' rule: enter the exact current password and confirm the system rejects it.", ja: "これは『再利用禁止』ルールを直接テストするケースです：現在のパスワードと全く同じものを入力し、システムが拒否することを確認します。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử đặt lại mật khẩu (password reset) là kiểm tra toàn bộ luồng 'quên mật khẩu' của ShopEasy: nhập email, nhận link qua email, mở link để đặt mật khẩu mới, và các ràng buộc bảo mật đi kèm — link hết hạn/dùng lại, mật khẩu mới không được yếu hoặc trùng mật khẩu cũ, vô hiệu phiên cũ sau khi đổi, và thông báo trung lập khi email không tồn tại để chống dò tài khoản. Bài này bám sát app TMĐT ShopEasy, có nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Password reset testing means testing ShopEasy's entire 'forgot password' flow: entering an email, receiving a link by email, opening the link to set a new password, and the security rules around it — link expiry/reuse, weak or reused new passwords being blocked, old sessions being invalidated after the change, and a neutral message when the email doesn't exist to prevent account enumeration. This article follows the ShopEasy e-commerce app, with lots of visuals and a quiz at the end.",
        "パスワード再設定（password reset）のテストとは、ShopEasyの『パスワードを忘れた』フロー全体をテストすることです：メール入力、メールでのリンク受信、リンクを開いての新パスワード設定、そしてそれに伴うセキュリティルール——リンクの期限切れ・再利用、弱い/再利用されたパスワードの拒否、変更後の古いセッションの無効化、アカウント列挙を防ぐためメールが存在しない場合の中立的な通知。本記事はECアプリShopEasyに沿い、豊富な図と最後にクイズがあります。"),
      P("Chào bạn mới! Trong số các tính năng của một app TMĐT, đặt lại mật khẩu tưởng đơn giản nhưng lại là một trong những nơi nhạy cảm nhất về bảo mật — vì nó có quyền thay đổi trực tiếp 'chìa khoá' vào tài khoản người dùng. Kiểm thử đặt lại mật khẩu không chỉ là bấm thử vài nút xem có chạy không, mà còn phải nghĩ như một người muốn 'phá' hệ thống: link có bị dùng lại được không, mật khẩu yếu có bị chặn không, thông báo có vô tình tiết lộ thông tin không. Chúng ta sẽ học qua màn 'Quên mật khẩu' và luồng email thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! Among an e-commerce app's features, password reset looks simple but is one of the most security-sensitive spots — because it has the power to directly change the 'key' to a user's account. Testing password reset isn't just clicking a few buttons to see if they work; you also have to think like someone trying to 'break' the system: can the link be reused, is a weak password blocked, does a message accidentally leak information. We'll learn through ShopEasy's real 'Forgot password' screen and email flow, with visuals and hands-on practice.",
        "こんにちは、初心者さん！ECアプリの機能の中で、パスワード再設定は単純に見えても、ユーザーアカウントへの『鍵』を直接変更する権限を持つため、最もセキュリティ上センシティブな箇所の一つです。パスワード再設定のテストは、いくつかボタンを押して動くか見るだけではなく、システムを『壊そう』とする人のように考える必要があります：リンクは再利用できないか、弱いパスワードはブロックされるか、通知が誤って情報を漏らしていないか。実際のShopEasyの『パスワードを忘れた』画面とメールフローを通じて、図と実習付きで学びます。"),
      IMG(m_forgot, "Màn hình test: form 'Quên mật khẩu' của ShopEasy với thông báo trung lập", "Screen under test: ShopEasy's 'Forgot password' form with a neutral message", "テスト対象画面：中立的な通知を表示するShopEasyの『パスワードを忘れた』フォーム"),
      DEF("Password Reset Token", "chuỗi mã bí mật, dùng để chứng minh yêu cầu đặt lại mật khẩu là hợp lệ; nên chỉ sống trong thời gian ngắn và chỉ dùng được một lần.",
        "a secret code string used to prove a password-reset request is legitimate; it should live for a short time and be usable only once.",
        "パスワード再設定の要求が正当であることを証明するための秘密のコード文字列。短い有効期限で、1回しか使用できないようにすべき。"),
    ] },
  { heading: { vi: "2. Luồng đặt lại mật khẩu chuẩn là gì", en: "2. What does a standard password reset flow look like", ja: "2. 標準的なパスワード再設定フローとは" },
    blocks: [
      P("Một luồng đặt lại mật khẩu điển hình gồm 5 bước: (1) người dùng bấm 'Quên mật khẩu' và nhập email; (2) hệ thống tạo một token bí mật, gửi email chứa link kèm token; (3) người dùng mở email, bấm link để mở form đặt mật khẩu mới; (4) người dùng nhập và xác nhận mật khẩu mới, hệ thống kiểm tra các ràng buộc rồi cập nhật; (5) hệ thống vô hiệu hoá token và các phiên đăng nhập cũ, yêu cầu đăng nhập lại bằng mật khẩu mới. Mỗi bước đều có thể bị lỗi hoặc bị lợi dụng nếu không kiểm thử kỹ.",
        "A typical password reset flow has 5 steps: (1) the user clicks 'Forgot password' and enters an email; (2) the system generates a secret token and emails a link containing it; (3) the user opens the email and clicks the link to open the new-password form; (4) the user enters and confirms a new password, the system checks the rules and updates it; (5) the system invalidates the token and old login sessions, requiring re-login with the new password. Every step can break or be abused if not tested carefully.",
        "典型的なパスワード再設定フローは5つのステップからなります：(1) ユーザーが『パスワードを忘れた』をクリックしメールを入力する、(2) システムが秘密のトークンを生成しそれを含むリンクをメールで送信する、(3) ユーザーがメールを開きリンクをクリックして新パスワードフォームを開く、(4) ユーザーが新しいパスワードを入力・確認し、システムがルールを確認して更新する、(5) システムがトークンと古いログインセッションを無効化し、新しいパスワードでの再ログインを要求する。各ステップは、丁寧にテストしなければ壊れたり悪用されたりする可能性があります。"),
      IMG(m_email, "Email nhận được từ ShopEasy, chứa link đặt lại mật khẩu có token dùng 1 lần", "Email received from ShopEasy, containing a reset link with a single-use token", "ShopEasyから届く、1回限りのトークン付き再設定リンクを含むメール"),
      P("Điểm quan trọng bạn cần nhớ khi test luồng này: bước (2) và (5) là nơi dễ bị bỏ sót nhất vì chúng không hiện rõ trên giao diện — token sống bao lâu, có bị dùng lại được không, phiên cũ có thực sự bị vô hiệu hay chỉ 'trông như' đã đăng xuất. Những lỗi ở đây thường không lộ ra ngay khi test thủ công theo happy path, mà chỉ lộ khi bạn chủ động thử lại link cũ hoặc kiểm tra phiên trên một thiết bị/trình duyệt khác.",
        "The key thing to remember when testing this flow: steps (2) and (5) are the easiest to miss because they aren't clearly visible in the UI — how long the token lives, whether it can be reused, whether old sessions are truly invalidated or just 'look' logged out. Bugs here usually don't show up when manually testing the happy path; they only surface when you deliberately retry an old link or check the session on another device/browser.",
        "このフローをテストする際に覚えておくべき重要な点：ステップ(2)と(5)はUI上に明確に表示されないため最も見落としやすい部分です——トークンの寿命はどれくらいか、再利用できないか、古いセッションが本当に無効化されているのか、それとも『見た目だけ』ログアウトしているのか。ここでのバグは通常、ハッピーパスを手動でテストするだけでは表面化せず、古いリンクをあえて再試行したり、別のデバイス/ブラウザでセッションを確認したりして初めて見つかります。"),
      DEF("Session Invalidation", "hành động vô hiệu hoá (thu hồi) một phiên đăng nhập đang hoạt động, khiến token/cookie của phiên đó không còn dùng được nữa.",
        "the act of invalidating (revoking) an active login session, so that session's token/cookie can no longer be used.",
        "有効なログインセッションを無効化（失効）させる動作。これによりそのセッションのトークン/クッキーは使用できなくなる。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử đặt lại mật khẩu", en: "3. Why beginners need to master password reset testing", ja: "3. 初心者がパスワード再設定テストを習得すべき理由" },
    blocks: [
      P("Đặt lại mật khẩu là một trong số ít tính năng có thể trực tiếp quyết định ai được sở hữu một tài khoản. Một lỗi nhỏ ở đây — link không hết hạn, thông báo lộ email tồn tại, phiên cũ không bị vô hiệu — có thể mở đường cho kẻ xấu chiếm đoạt tài khoản khách hàng, đọc lịch sử đơn hàng, hoặc dùng thẻ đã lưu để đặt hàng gian lận. Vì vậy đây là tính năng bạn nên đặc biệt cẩn thận, không chỉ test 'có chạy hay không'.",
        "Password reset is one of the few features that can directly decide who owns an account. A small bug here — a link that doesn't expire, a message that leaks whether an email exists, an old session that isn't invalidated — can open the door for an attacker to hijack a customer's account, read their order history, or use a saved card to place fraudulent orders. That's why this feature deserves extra care, not just 'does it run' testing.",
        "パスワード再設定は、誰がアカウントを所有するかを直接決定できる数少ない機能の一つです。ここでの小さなバグ——期限切れにならないリンク、メールの存在を漏らす通知、無効化されない古いセッション——は、攻撃者が顧客のアカウントを乗っ取り、注文履歴を読み、保存されたカードで不正注文をする道を開く可能性があります。そのためこの機能は、『動くかどうか』だけでなく特に注意深くテストする価値があります。"),
      P("Đây cũng là chủ đề phỏng vấn rất hay gặp: nhà tuyển dụng thường hỏi 'Bạn sẽ test tính năng quên mật khẩu như thế nào?' để xem bạn có tư duy bảo mật cơ bản hay không. Trả lời được các góc như link hết hạn, dùng lại link, ràng buộc mật khẩu mới, vô hiệu phiên, và thông báo trung lập cho thấy bạn hiểu tính năng này khác các form thông thường ở chỗ nào.",
        "It's also a very common interview topic: interviewers often ask 'How would you test the forgot-password feature?' to see if you have basic security thinking. Being able to name angles like link expiry, link reuse, new-password rules, session invalidation, and a neutral message shows you understand what makes this feature different from ordinary forms.",
        "これは非常によくある面接トピックでもあります。面接官はよく『パスワードを忘れた機能をどうテストしますか？』と尋ね、基本的なセキュリティ思考があるか確認します。リンクの期限切れ、リンクの再利用、新パスワードのルール、セッションの無効化、中立的な通知といった観点を挙げられれば、この機能が通常のフォームとどう違うか理解していることを示せます。"),
      P("Cuối cùng, kiểm thử tốt tính năng này bảo vệ trực tiếp uy tín của doanh nghiệp. Một vụ chiếm đoạt tài khoản hàng loạt do lỗ hổng đặt lại mật khẩu có thể trở thành khủng hoảng truyền thông, mất niềm tin khách hàng nghiêm trọng hơn nhiều so với một lỗi giao diện thông thường. Đầu tư thời gian kiểm thử ở đây luôn xứng đáng.",
        "Finally, testing this feature well directly protects a business's reputation. A mass account-takeover incident caused by a password-reset vulnerability can become a PR crisis and cause far more serious loss of customer trust than an ordinary UI bug. Time invested in testing here always pays off.",
        "最後に、この機能を良くテストすることは、企業の評判を直接守ることにつながります。パスワード再設定の脆弱性による大規模なアカウント乗っ取り事件は、広報上の危機になり得て、通常のUIバグよりはるかに深刻な顧客信頼の喪失を引き起こします。ここでのテストに時間を投資することは常に価値があります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các kỹ thuật nghĩ ca kiểm thử", en: "4. Prepare: tools & techniques for test cases", ja: "4. 準備：ツールとテストケースの技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần biết luồng chuẩn (chương 2) và một danh sách các 'góc rủi ro' để không bỏ sót khi nghĩ ca kiểm thử cho tính năng đặt lại mật khẩu.",
        "You don't need special tools — just know the standard flow (chapter 2) and have a checklist of 'risk angles' so you don't miss anything when thinking up test cases for password reset.",
        "特別なツールは不要です——標準フロー（第2章）を理解し、パスワード再設定のテストケースを考える際に見落とさないための『リスクの観点』チェックリストがあれば十分です。"),
      STEP(1, "Liệt kê từng bước trong luồng (nhập email → nhận link → đặt mật khẩu mới → vô hiệu phiên cũ) để không bỏ sót bước nào.", "List each step of the flow (enter email → receive link → set new password → invalidate old sessions) so you don't skip any.", "フロー（メール入力→リンク受信→新パスワード設定→古いセッション無効化）の各ステップを列挙し、漏れがないようにする。"),
      STEP(2, "Với mỗi bước, áp các kỹ thuật rủi ro: link hết hạn/dùng lại, ràng buộc mật khẩu mới (độ mạnh, không trùng cũ), thông báo trung lập, vô hiệu phiên.", "For each step, apply risk techniques: link expiry/reuse, new-password rules (strength, no reuse), a neutral message, session invalidation.", "各ステップにリスク技法を適用する：リンクの期限切れ/再利用、新パスワードのルール（強度、再利用禁止）、中立的な通知、セッション無効化。"),
      STEP(3, "Ghi lại kết quả mong đợi (hệ thống nên TỪ CHỐI/BẢO VỆ ra sao) trước khi thực hiện, để dễ so sánh với kết quả thực tế.", "Write down the expected result (how the system should REJECT/PROTECT) before executing, for easy comparison with the actual result.", "実行前に期待結果（システムがどのように拒否・保護すべきか）を書いておき、実際の結果と比較しやすくする。"),
      TRY("Mở màn 'Quên mật khẩu' của một app bạn dùng và thử nghĩ ra ít nhất 3 ca kiểm thử liên quan tới link hoặc mật khẩu mới.", "Open the 'Forgot password' screen of an app you use and try to think of at least 3 test cases related to the link or the new password.", "使っているアプリの『パスワードを忘れた』画面を開き、リンクまたは新パスワードに関連する少なくとも3つのテストケースを考えてみよう。"),
      PITFALL("Chỉ test 'happy path': nhập email đúng, nhận link, đổi mật khẩu, xong. Đây là ca dương cơ bản, chưa hề chạm tới các rủi ro bảo mật đặc trưng của tính năng này.", "Only testing the 'happy path': enter the correct email, receive the link, change the password, done. This is a basic positive case that never touches this feature's characteristic security risks.", "『ハッピーパス』だけをテストする：正しいメールを入力し、リンクを受け取り、パスワードを変更して終わり。これは基本的なポジティブケースであり、この機能特有のセキュリティリスクには全く触れていません。"),
      IMG(m_cases, "Bảng ca kiểm thử đặt lại mật khẩu — dùng làm checklist khi nghĩ ca", "Password reset test case table — use as a checklist when thinking up cases", "パスワード再設定のテストケース表 — ケースを考える際のチェックリストとして使用"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử từng bước (thực hành)", en: "5. Writing test cases step by step (hands-on)", ja: "5. テストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào form 'Đặt mật khẩu mới' của ShopEasy — nơi có nhiều ràng buộc dễ bị bỏ sót vì trông có vẻ chỉ là hai ô nhập đơn giản. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ.",
        "Now let's apply it for real to ShopEasy's 'New password' form — a place with several rules that are easy to overlook because it looks like just two simple input fields. Follow the order below to get a complete set of test cases.",
        "では、ShopEasyの『新しいパスワード』フォームに実際に適用しましょう——単純な2つの入力欄に見えるため見落としやすい、複数のルールがある場所です。以下の順に沿って、完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca dương chuẩn trước: mật khẩu mới 'Mai@2024xyz' (đủ mạnh, khác mật khẩu cũ), xác nhận khớp — để có mốc so sánh.", "First define the standard positive case: new password 'Mai@2024xyz' (strong enough, different from the old one), confirmation matching — as a comparison baseline.", "まず標準的なポジティブケースを定義：新パスワード『Mai@2024xyz』（十分強く、古いパスワードと異なる）、確認が一致——比較基準とする。"),
      STEP(2, "Áp ràng buộc độ mạnh: thử mật khẩu quá ngắn ('123'), chỉ số ('12345678'), thiếu chữ hoa — kỳ vọng hệ thống từ chối kèm thông báo rõ.", "Apply strength rules: try a too-short password ('123'), digits-only ('12345678'), missing uppercase — expecting the system to reject with a clear message.", "強度ルールを適用：短すぎるパスワード（『123』）、数字のみ（『12345678』）、大文字なしを試す——システムが明確なメッセージ付きで拒否することを期待する。"),
      STEP(3, "Áp ràng buộc 'không trùng mật khẩu cũ': nhập lại chính xác mật khẩu hiện tại làm mật khẩu mới — kỳ vọng bị từ chối.", "Apply the 'no reuse' rule: re-enter the exact current password as the new one — expecting it to be rejected.", "『再利用禁止』ルールを適用：現在のパスワードとまったく同じものを新パスワードとして入力する——拒否されることを期待する。"),
      STEP(4, "Với mỗi ca, ghi Expected (hệ thống nên làm gì) và Actual (điều thực sự xảy ra) riêng biệt, rồi chuyển thành bug report nếu lệch nhau.", "For each case, write Expected (what the system should do) and Actual (what actually happens) separately, then turn it into a bug report if they differ.", "各ケースでExpected（システムがすべきこと）とActual（実際に起きたこと）を別々に記録し、食い違えばバグレポートにする。"),
      CODE("text", "BO CA KIEM THU - form 'Dat mat khau moi' (ShopEasy)\nCa 1: MK moi = 'Mai@2024xyz', xac nhan khop | Expected: doi thanh cong, dang xuat cac phien cu | Actual: dung nhu ky vong\nCa 2: MK moi = '123'          | Expected: tu choi, bao 'chua du manh' | Actual: tu choi dung\nCa 3: MK moi = MK hien tai    | Expected: tu choi, bao 'trung mat khau cu' | Actual: he thong VAN CHO DOI (BUG)\nCa 4: 2 o mat khau khong khop | Expected: tu choi, bao 'khong khop' | Actual: tu choi dung"),
      TRY("Viết thêm 1 ca kiểm thử nữa cho form đặt mật khẩu mới mà bảng trên chưa có (gợi ý: dán khoảng trắng đầu/cuối, hoặc mật khẩu dài quá giới hạn).", "Write one more test case for the new-password form not in the table above (hint: paste leading/trailing spaces, or a password longer than the limit).", "上の表にない『新パスワード』フォームのテストケースをもう1つ書こう（ヒント：先頭/末尾に空白を貼り付け、または上限を超える長さのパスワード）。"),
      IMG(m_newpw, "Form đặt mật khẩu mới của ShopEasy với các ràng buộc độ mạnh và không trùng mật khẩu cũ", "ShopEasy's new-password form with strength rules and a no-reuse constraint", "強度ルールと再利用禁止制約のあるShopEasyの新パスワードフォーム"),
    ] },
  { heading: { vi: "6. Tình huống 1: link reset dùng lại được nhiều lần", en: "6. Situation 1: the reset link can be reused multiple times", ja: "6. シーン1：再設定リンクが何度も再利用できる" },
    blocks: [
      SITUATION("Bạn quên mật khẩu, dùng link trong email để đặt mật khẩu mới thành công. Tò mò, bạn bấm lại đúng link đó lần thứ hai.", "You forgot your password, used the link in the email to successfully set a new password. Out of curiosity, you click that exact same link a second time.",
        "Form 'Đặt mật khẩu mới' vẫn mở bình thường và cho phép đổi mật khẩu lần nữa — link lẽ ra phải bị vô hiệu ngay sau lần dùng đầu tiên lại không hề bị chặn.",
        "The 'New password' form opens normally again and lets you change the password once more — a link that should have been invalidated right after its first use isn't blocked at all.",
        "パスワードを忘れ、メール内のリンクを使って新しいパスワードの設定に成功。好奇心から、同じリンクをもう一度クリック。",
        "『新しいパスワード』フォームが普通に再び開き、もう一度パスワードを変更できてしまう——最初の使用直後に無効化されるべきリンクが全くブロックされていない。"),
      SOLVE("Báo bug Critical ngay (ảnh hưởng bảo mật tài khoản), đề xuất vô hiệu hoá token phía server ngay khi đổi mật khẩu thành công, và bổ sung ca 'mở lại link đã dùng' vào bộ hồi quy để không tái phát.", "Report it as a Critical bug immediately (affects account security), propose invalidating the token server-side right when the password change succeeds, and add the 'reopen a used link' case to the regression suite to prevent recurrence.", "即座にCriticalバグとして報告（アカウントのセキュリティに影響）し、パスワード変更成功時にサーバー側で即座にトークンを無効化するよう提案、再発防止のため『使用済みリンクの再オープン』ケースを回帰テストスイートに追加する。"),
      P("Đây là ví dụ điển hình cho thấy vì sao chỉ test 'link có hoạt động không' là chưa đủ — bạn còn phải test 'link có NGỪNG hoạt động đúng lúc không'. Nếu kẻ xấu vô tình có được link cũ (qua lịch sử trình duyệt, hộp thư dùng chung máy tính công cộng), họ có thể lợi dụng lỗ hổng này để đặt lại mật khẩu bất cứ lúc nào, kể cả khi chủ tài khoản đã đổi mật khẩu từ lâu.",
        "This is a textbook example of why testing only 'does the link work' isn't enough — you also have to test 'does the link stop working at the right time'. If an attacker accidentally gets an old link (through browser history, a shared inbox on a public computer), they could exploit this flaw to reset the password anytime, even long after the real owner already changed it.",
        "これは、『リンクが動くかどうか』だけをテストするのでは不十分であることを示す典型的な例です——『リンクが正しいタイミングで動かなくなるか』もテストする必要があります。攻撃者がたまたま古いリンクを入手した場合（ブラウザ履歴、公共のパソコンでの共有受信箱など）、本来の持ち主がとうにパスワードを変更していても、この欠陥を悪用していつでもパスワードを再設定できてしまいます。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử 'mở lại link reset đã dùng'", "A bug ticket found via the 'reopen a used reset link' test case", "『使用済みの再設定リンクを再オープン』というテストケースで見つかったバグチケット"),
      RECAP(["Link reset phải bị vô hiệu ngay sau lần dùng đầu tiên", "Luôn test cả 'mở lại link cũ' chứ không chỉ 'link mới có chạy không'"],
        ["A reset link must be invalidated right after its first use", "Always test 'reopening an old link', not just 'does a new link work'"],
        ["再設定リンクは初回使用直後に無効化されるべき", "『古いリンクの再オープン』も常にテストし、『新しいリンクが動くか』だけで終わらせない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: thông báo 'email không tồn tại' giúp kẻ xấu dò tài khoản", en: "7. Situation 2: an 'email doesn't exist' message helps attackers enumerate accounts", ja: "7. シーン2：『メールが存在しません』通知が攻撃者のアカウント列挙を助ける" },
    blocks: [
      SITUATION("Bạn thử nhập một email chưa từng đăng ký vào màn 'Quên mật khẩu' của ShopEasy, chỉ để xem hệ thống phản hồi thế nào.", "You try entering an email that has never been registered into ShopEasy's 'Forgot password' screen, just to see how the system responds.",
        "Hệ thống báo rõ ràng 'Email này chưa đăng ký tài khoản', trong khi với email đã đăng ký thì báo 'Đã gửi link đặt lại' — hai thông báo khác nhau vô tình để lộ email nào có tài khoản trên hệ thống.",
        "The system clearly says 'This email hasn't registered an account', while for a registered email it says 'Reset link sent' — two different messages that inadvertently reveal which emails have accounts in the system.",
        "ShopEasyの『パスワードを忘れた』画面に、一度も登録されたことのないメールアドレスを入力してみて、システムがどう応答するか確認。",
        "システムは『このメールはアカウント登録されていません』と明確に表示し、一方登録済みのメールには『再設定リンクを送信しました』と表示——2つの異なる通知が、意図せずどのメールがシステムにアカウントを持つかを漏らしてしまう。"),
      SOLVE("Báo bug Medium/High tuỳ chính sách bảo mật của công ty, đề xuất gộp cả hai trường hợp thành MỘT thông báo trung lập duy nhất ('nếu email tồn tại, chúng tôi đã gửi link'), áp dụng cho cả email đúng lẫn sai.", "Report it as Medium/High depending on the company's security policy, propose merging both cases into ONE neutral message ('if this email exists, we've sent a link'), used for both correct and wrong emails.", "会社のセキュリティポリシーに応じてMedium/Highとして報告し、両方のケースを『このメールが存在すればリンクを送信しました』という単一の中立的な通知にまとめ、正しいメールと誤ったメールの両方に使うよう提案する。"),
      P("Kỹ thuật tấn công này gọi là account enumeration (dò tài khoản): kẻ xấu không cần đoán mật khẩu, chỉ cần thử hàng loạt email và quan sát thông báo khác nhau để biết chính xác email nào có tài khoản thật. Từ danh sách đó, họ có thể tiến hành các bước tấn công tiếp theo như phishing nhắm đúng người hoặc brute-force mật khẩu. Với người mới, bài học ở đây là: đôi khi một tính năng 'chạy đúng như thiết kế' vẫn có thể là lỗ hổng bảo mật nếu thiết kế đó không tính tới rủi ro dò thông tin.",
        "This attack technique is called account enumeration: an attacker doesn't need to guess a password, just try many emails and observe the different messages to know exactly which emails have real accounts. From that list, they can proceed with follow-up attacks like targeted phishing or password brute-forcing. For beginners, the lesson here is: sometimes a feature 'working exactly as designed' can still be a security hole if the design didn't account for information-leak risk.",
        "この攻撃手法はアカウント列挙（account enumeration）と呼ばれます。攻撃者はパスワードを推測する必要はなく、多数のメールアドレスを試し、異なる通知を観察するだけで、どのメールが実在のアカウントを持つか正確に把握できます。そのリストから、標的型フィッシングやパスワードの総当たり攻撃といった次の攻撃段階へ進めます。初心者への教訓は：ある機能が『設計どおりに正しく動作している』としても、その設計が情報漏えいのリスクを考慮していなければ、それでもセキュリティ上の穴になり得るということです。"),
      DEF("Account Enumeration", "kỹ thuật tấn công dò ra danh sách email/tài khoản có thật trên hệ thống, thường lợi dụng các thông báo lỗi khác nhau giữa dữ liệu tồn tại và không tồn tại.",
        "an attack technique to discover the list of real emails/accounts on a system, usually by exploiting different error messages between existing and non-existing data.",
        "システム上に実在するメール/アカウントの一覧を割り出す攻撃手法。通常、存在するデータと存在しないデータで異なるエラーメッセージを悪用する。"),
      TRY("Kiểm tra màn 'Quên mật khẩu' của một app bạn dùng: thử một email có thật và một email chưa từng đăng ký, so sánh xem hai thông báo có giống hệt nhau không.", "Check the 'Forgot password' screen of an app you use: try a real email and an unregistered one, and compare whether the two messages are identical.", "使っているアプリの『パスワードを忘れた』画面を確認しよう：実在するメールと未登録のメールを試し、2つの通知が全く同じかどうか比較しよう。"),
    ] },
  { heading: { vi: "8. Cân bằng & theo dõi kết quả", en: "8. Balancing & tracking results", ja: "8. バランスと結果の追跡" },
    blocks: [
      P("Không phải mọi ca kiểm thử đặt lại mật khẩu đều quan trọng như nhau. Cách thực dụng là: đảm bảo luồng chính chạy đúng trước (nhập email đúng → nhận link → đổi mật khẩu thành công), rồi dồn phần lớn thời gian còn lại cho các ca liên quan trực tiếp tới BẢO MẬT tài khoản — link hết hạn/dùng lại, thông báo trung lập, vô hiệu phiên cũ — vì đây là nơi một lỗi nhỏ gây hậu quả lớn nhất.",
        "Not every password-reset test case is equally important. A practical approach: first make sure the main flow works correctly (enter the right email → receive the link → change the password successfully), then spend most of the remaining time on cases directly tied to account SECURITY — link expiry/reuse, a neutral message, invalidating old sessions — because that's where a small bug causes the biggest consequences.",
        "パスワード再設定のテストケースがすべて同じ重要度を持つわけではありません。実用的な方法は：まずメインフロー（正しいメールを入力→リンク受信→パスワード変更成功）が正しく動くことを確認し、残りの時間の大半をアカウントのセキュリティに直結するケース——リンクの期限切れ/再利用、中立的な通知、古いセッションの無効化——に使うことです。ここでの小さなバグが最も大きな結果を招くからです。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua kiểm thử đặt lại mật khẩu (ShopEasy · Sprint 20)", "A board tracking bugs found via password reset testing (ShopEasy · Sprint 20)", "パスワード再設定テストで見つかったバグの追跡ボード（ShopEasy・スプリント20）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi nghiêm trọng của sprint đến từ nhóm link/phiên/bảo mật", "Metrics: most of the sprint's serious bugs come from the link/session/security group", "指標：スプリントの重大バグの大半はリンク/セッション/セキュリティ群から見つかった"),
      TIP("Khi thời gian có hạn, ưu tiên test theo thứ tự: (1) link hết hạn/dùng lại, (2) vô hiệu phiên cũ, (3) thông báo trung lập, (4) ràng buộc mật khẩu mới — vì hai nhóm đầu ảnh hưởng trực tiếp tới việc 'ai đang nắm quyền tài khoản'.", "When time is limited, test in this priority order: (1) link expiry/reuse, (2) invalidating old sessions, (3) neutral messages, (4) new-password rules — because the first two groups directly affect 'who controls the account'.", "時間が限られる場合、次の優先順位でテストしよう：(1) リンクの期限切れ/再利用、(2) 古いセッションの無効化、(3) 中立的な通知、(4) 新パスワードのルール——最初の2つが『誰がアカウントを制御しているか』に直結するため。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi kiểm thử tính năng đặt lại mật khẩu. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing password reset. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はパスワード再設定のテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ test trên một trình duyệt/thiết bị nên không phát hiện được lỗi 'phiên cũ không bị vô hiệu' — vì trên chính thiết bị vừa đổi mật khẩu, bạn tất nhiên vẫn đang đăng nhập.", "Testing on only one browser/device, so you never catch the 'old session not invalidated' bug — because on the very device you just changed the password on, you're obviously still logged in.", "1つのブラウザ/デバイスだけでテストするため、『古いセッションが無効化されない』バグを見逃してしまう——パスワードを変更したまさにそのデバイスでは、当然まだログイン状態だから。"),
      PITFALL("Quên test lại link SAU KHI đã dùng thành công — nhiều bạn coi ca 'đổi mật khẩu thành công' là kết thúc bài test, trong khi đó chỉ là điểm bắt đầu của ca 'link có bị vô hiệu đúng cách không'.", "Forgetting to re-test the link AFTER it was used successfully — many beginners treat the 'password changed successfully' case as the end of testing, when it's actually just the starting point of the 'was the link properly invalidated' case.", "リンクが正常に使用された後にリンクを再テストするのを忘れる——多くの初心者は『パスワード変更成功』ケースをテストの終わりだと考えるが、実際にはそれは『リンクが正しく無効化されたか』というケースの出発点にすぎない。"),
      TIP("Dùng hai trình duyệt (hoặc một trình duyệt thường + một cửa sổ ẩn danh) để mô phỏng 'thiết bị của kẻ chiếm đoạt' và 'thiết bị của chủ tài khoản thật' — đây là cách nhanh nhất để test vô hiệu phiên cũ.", "Use two browsers (or a normal browser + an incognito window) to simulate 'the hijacker's device' and 'the real owner's device' — this is the fastest way to test old-session invalidation.", "『乗っ取った人のデバイス』と『本来の持ち主のデバイス』をシミュレートするため、2つのブラウザ（または通常のブラウザ＋シークレットウィンドウ）を使おう——これが古いセッションの無効化をテストする最も速い方法です。"),
      IMG(m_cases, "Nhắc lại bảng ca kiểm thử đặt lại mật khẩu — dùng làm checklist khi thời gian có hạn", "Reminder of the password reset test case table — use as a checklist when time is limited", "パスワード再設定テストケース表の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử đăng nhập/đăng ký cho người mới", "Login/signup testing for beginners", "kiem-thu-dang-nhap-dang-ky-cho-nguoi-moi", "初心者のためのログイン/登録テスト"),
      INTERNAL("Kiểm thử email/OTP cho người mới", "Email/OTP testing for beginners", "kiem-thu-email-otp-cho-nguoi-moi", "初心者のためのメール/OTPテスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử tính năng đặt lại mật khẩu qua màn 'Quên mật khẩu' và luồng email của ShopEasy: luồng chuẩn 5 bước, các kỹ thuật nghĩ ca kiểm thử, hai tình huống thật (link dùng lại được và thông báo lộ email tồn tại), cùng cách ưu tiên thời gian cho các rủi ro bảo mật quan trọng nhất. Đây là kỹ năng đưa bạn từ 'test theo giao diện' lên 'test có tư duy bảo mật' — điều mà rất nhiều nhà tuyển dụng đánh giá cao ở một tester.",
        "You just learned how to test password reset through ShopEasy's 'Forgot password' screen and email flow: the standard 5-step flow, techniques for thinking up test cases, two real situations (a reusable link and a message leaking whether an email exists), and how to prioritize time for the most important security risks. This skill takes you from 'testing by the UI' to 'testing with security thinking' — something many employers highly value in a tester.",
        "ShopEasyの『パスワードを忘れた』画面とメールフローを通じて、パスワード再設定のテスト方法を学びました：標準的な5ステップフロー、テストケースを考える技法、2つの実例（再利用可能なリンクとメールの存在を漏らす通知）、そして最も重要なセキュリティリスクへの時間の優先順位付け方法。このスキルは、『UIに沿ったテスト』から『セキュリティ思考を持ったテスト』へとあなたを引き上げます——多くの採用担当者がテスターに高く評価する点です。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về kiểm thử đăng nhập/đăng ký và kiểm thử email/OTP để hiểu trọn vẹn nhóm tính năng liên quan tới xác thực tài khoản, cùng cách viết bug report chuẩn cho các lỗi bảo mật. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should explore login/signup testing and email/OTP testing to fully understand the account-authentication feature group, along with how to write a proper bug report for security bugs. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、アカウント認証に関連する機能群を完全に理解するため、ログイン/登録テストとメール/OTPテストについてさらに学び、セキュリティバグに対する適切なバグレポートの書き方も学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const RESETPW_01 = makeDoc({
  slug: "kiem-thu-dat-lai-mat-khau-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử đặt lại mật khẩu",
  keywords: ["kiểm thử đặt lại mật khẩu", "password reset testing", "quên mật khẩu", "link reset", "vô hiệu phiên cũ", "account enumeration"],
  coverLabel: "NGƯỜI MỚI · ĐẶT LẠI MẬT KHẨU · TMĐT",
  crumb: "Kiểm thử đặt lại mật khẩu (Password Reset)",
  metaTitle: { vi: "Kiểm thử đặt lại mật khẩu (Password Reset) cho người mới", en: "Password reset testing for beginners", ja: "初心者向けパスワード再設定テスト" },
  metaDescription: {
    vi: "Kiểm thử đặt lại mật khẩu: luồng quên mật khẩu ShopEasy, link hết hạn/dùng lại, ràng buộc mật khẩu mới, vô hiệu phiên cũ, chống dò tài khoản, có hình minh hoạ.",
    en: "Password reset testing for beginners: ShopEasy's forgot-password flow, link expiry/reuse, new-password rules, invalidating old sessions, preventing account enumeration, with visuals and a quiz.",
    ja: "初心者向けパスワード再設定テスト：ShopEasyのパスワードを忘れたフロー、リンクの期限切れ/再利用、新パスワードのルール、古いセッションの無効化、アカウント列挙の防止、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử đặt lại mật khẩu cho người mới: link hết hạn, dùng lại và chống dò tài khoản (có trắc nghiệm)",
    en: "Password reset testing for beginners: link expiry, reuse and preventing account enumeration (with quiz)",
    ja: "初心者のためのパスワード再設定テスト：リンクの期限切れ、再利用、アカウント列挙防止（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử đặt lại mật khẩu qua app TMĐT ShopEasy. Luồng chuẩn 5 bước, các kỹ thuật nghĩ ca kiểm thử (link hết hạn/dùng lại, ràng buộc mật khẩu mới, vô hiệu phiên cũ, thông báo trung lập chống dò tài khoản), hai tình huống lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn password reset testing through the ShopEasy e-commerce app. The standard 5-step flow, techniques for test cases (link expiry/reuse, new-password rules, invalidating old sessions, a neutral message against account enumeration), two real bug situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでパスワード再設定テストを学ぶ。標準的な5ステップフロー、テストケースの技法（リンクの期限切れ/再利用、新パスワードのルール、古いセッションの無効化、アカウント列挙を防ぐ中立的な通知）、2つの実際のバグ事例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử tính năng đặt lại mật khẩu", steps: [
    { name: "Xác nhận luồng chính chạy đúng", text: "Nhập email đúng, nhận link, đổi mật khẩu thành công." },
    { name: "Kiểm tra link hết hạn và dùng lại", text: "Mở link sau khi hết hạn hoặc mở lại link đã dùng, kỳ vọng bị từ chối." },
    { name: "Kiểm tra ràng buộc mật khẩu mới và vô hiệu phiên cũ", text: "Không cho trùng mật khẩu cũ, mật khẩu yếu; vô hiệu các phiên đăng nhập cũ sau khi đổi." },
  ] },
  pages,
});

export const MB_RESETPW_01 = [RESETPW_01];
