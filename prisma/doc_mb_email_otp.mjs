// doc_mb_email_otp.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử email & OTP — email xác nhận/đặt lại mật khẩu, mã OTP: gửi đúng địa chỉ,
// nội dung/liên kết đúng, OTP hết hạn, nhập sai OTP, gửi lại OTP, giới hạn số lần,
// định dạng/spam email. Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ.
// Gắn app TMĐT ShopEasy (xác thực đăng ký + đặt lại mật khẩu).
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

// ── Mockup 1: màn hình nhập OTP ShopEasy, có đếm ngược hết hạn + annotate ──
const m_otp = browser("shopeasy.vn/xac-thuc-otp", [
  panel("ShopEasy · Nhập mã OTP xác thực", [
    field(24, 20, 330, "Email nhận mã", "tr***an@gmail.com", "disabled"),
    field(24, 92, 330, "Mã OTP (6 số)", "4 8 2 9 1 5", "focus"),
    btn(24, 168, 160, "Xác nhận", "primary"),
    btn(200, 168, 154, "Gửi lại mã", "ghost"),
    annotate(20, 88, 330, 62, "Đếm ngược hết hạn: còn 04:58"),
  ].join(""), { h: 260, accent: "#0ea5a4" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#0ea5a4" });

// ── Mockup 2: mẫu email xác nhận đăng ký gửi tới hộp thư ──
const m_email = browser("mail.google.com/tranmai@gmail.com", [
  panel("✉️ ShopEasy — Xác nhận đăng ký tài khoản", [
    `<text x="24" y="20" font-size="12" fill="#475569">Người gửi: no-reply@shopeasy.vn</text>`,
    `<text x="24" y="40" font-size="12" fill="#475569">Người nhận: tranmai@gmail.com</text>`,
    `<text x="24" y="68" font-size="13" fill="#0f172a">Xin chào Mai,</text>`,
    `<text x="24" y="90" font-size="13" font-weight="700" fill="#0f172a">Mã OTP xác thực của bạn là: 482915</text>`,
    `<text x="24" y="112" font-size="12" fill="#64748b">Mã có hiệu lực trong 5 phút. Không chia sẻ mã này cho bất kỳ ai.</text>`,
    btn(24, 128, 220, "Xác nhận tài khoản", "success"),
    annotate(20, 80, 330, 44, "Nội dung: mã OTP rõ ràng + thời hạn hiệu lực"),
  ].join(""), { h: 216, accent: "#7c3aed" }),
].join(""), { h: 272, title: "Email xác nhận", accent: "#7c3aed" });

// ── Mockup 3: checklist các góc cần kiểm thử cho OTP & email ──
const m_technique = grid("Các góc cần kiểm thử cho OTP & email (checklist)", ["Góc kiểm thử", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Đúng người nhận", "OTP/email chỉ gửi tới đúng địa chỉ đã đăng ký", "Đăng ký bằng mai@gmail.com → OTP chỉ tới hộp thư đó"],
  ["Nội dung & liên kết đúng", "Email chứa đúng mã, đúng link, không lỗi chính tả", "Link 'Xác nhận tài khoản' trỏ đúng domain shopeasy.vn"],
  ["Hết hạn đúng lúc", "OTP vô hiệu sau khoảng thời gian quy định", "OTP hết hạn đúng sau 5 phút, không sớm không muộn"],
  ["Nhập sai OTP", "Hệ thống từ chối và báo lỗi rõ ràng", "Nhập '000000' bị từ chối, hiện 'Mã không đúng'"],
  ["Gửi lại OTP có giới hạn", "Giới hạn số lần / thời gian giữa các lần gửi lại", "Chỉ cho gửi lại sau 60 giây, tối đa 5 lần/giờ"],
  ["Định dạng, không rơi vào spam", "Email đúng chuẩn kỹ thuật, không bị lọc rác", "Email từ no-reply@shopeasy.vn không vào mục Spam của Gmail"],
], { accent: "#0ea5a4" });

// ── Mockup 4: bảng ca kiểm thử OTP đăng ký & đặt lại mật khẩu ──
const m_cases = grid("Bảng ca kiểm thử OTP đăng ký & đặt lại mật khẩu (ShopEasy)", ["Ca kiểm thử", "Dữ liệu / thao tác", "Kết quả mong đợi"], [
  ["Nhập đúng OTP, còn hạn", "OTP=482915, còn 04:10", "Xác thực thành công, chuyển bước kế tiếp"],
  ["Nhập đúng OTP, đã hết hạn", "Nhập đúng mã sau khi đồng hồ chạy hết 05:00", "Từ chối, báo 'Mã đã hết hạn', yêu cầu gửi lại"],
  ["Nhập sai OTP", "OTP=000000 (sai)", "Từ chối, báo 'Mã không đúng'"],
  ["Nhập sai OTP quá số lần", "Nhập sai 6 lần liên tiếp", "Khóa tạm thời / yêu cầu xác thực lại từ đầu"],
  ["Bấm 'Gửi lại mã' liên tục", "Bấm 10 lần trong 1 phút", "Chặn theo thời gian chờ, không gửi tràn email"],
  ["OTP dùng chéo tài khoản", "Dùng OTP của tài khoản A để xác thực tài khoản B", "Từ chối, mỗi OTP chỉ hợp lệ cho đúng phiên đã sinh ra nó"],
], { accent: "#0ea5a4", note: "Ưu tiên test kỹ ca 'hết hạn' và 'giới hạn số lần' — đây là nơi hay bị bỏ sót và gây rủi ro bảo mật." });

// ── Mockup 5: ticket Jira lỗi OTP không hết hạn ──
const m_jira = jira({
  key: "SE-11330", title: "OTP xác thực đăng ký không hết hạn sau 5 phút, vẫn dùng được sau 2 giờ",
  type: "Bug", status: "New", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Đăng ký tài khoản mới 2) Nhận OTP qua email 3) Đợi hơn 2 giờ không nhập 4) Nhập đúng OTP đã nhận ban đầu"],
    ["Kết quả mong đợi", "Hệ thống báo 'Mã đã hết hạn', yêu cầu gửi lại OTP mới"],
    ["Kết quả thực tế", "Hệ thống vẫn xác thực thành công sau hơn 2 giờ, không có kiểm tra hết hạn phía server"],
    ["Bằng chứng", "video-se11330.mp4, screenshot-otp-het-han.png"],
  ],
});

// ── Mockup 6: dashboard số liệu khi test giới hạn gửi lại OTP ──
const m_dash = dashboard("Số liệu khi test giới hạn 'Gửi lại mã OTP' (ShopEasy · Sprint 9)", [
  { label: "Số lần bấm 'Gửi lại'", value: "20", sub: "trong 2 phút test", color: "#e11d48" },
  { label: "Email OTP thực nhận", value: "20", sub: "không bị chặn", color: "#e11d48" },
  { label: "Giới hạn kỳ vọng", value: "5", sub: "lần/giờ theo yêu cầu", color: "#2563eb" },
  { label: "Mức độ rủi ro", value: "High", sub: "spam hộp thư & tốn chi phí gửi mail", color: "#7c3aed" },
]);

// ── Mockup 7: kanban theo dõi lỗi Email & OTP ──
const m_kanban = kanban("Bảng theo dõi lỗi Email & OTP (ShopEasy · Sprint 9)", [
  { name: "New", cards: [
    { key: "SE-11330", title: "OTP đăng ký không hết hạn sau 5 phút", sev: "Critical" },
    { key: "SE-11334", title: "Gửi lại OTP không giới hạn số lần", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11320", title: "Email OTP rơi vào mục Spam của Gmail", sev: "Medium" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11301", title: "Link xác nhận email trỏ sai domain", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11288", title: "OTP đặt lại mật khẩu dùng chung cho 2 tài khoản", sev: "Critical" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "OTP là gì và vì sao cần kiểm thử OTP hết hạn?",
  "What is OTP, and why does testing OTP expiry matter?",
  "OTP (One-Time Password) là mã dùng một lần, thường gửi qua email hoặc SMS, dùng để xác thực đăng ký, đăng nhập hoặc đặt lại mật khẩu. Kiểm thử OTP hết hạn rất quan trọng vì nếu mã sống quá lâu (hoặc không bao giờ hết hạn), kẻ tấn công có nhiều thời gian hơn để dò hoặc đánh cắp mã và chiếm quyền truy cập tài khoản người dùng.",
  "OTP (One-Time Password) is a single-use code, usually sent via email or SMS, used to verify signup, login, or password reset. Testing OTP expiry matters because if a code lives too long (or never expires), an attacker has more time to guess or steal it and take over a user's account.",
  "OTPとは何？なぜOTPの有効期限テストが重要？",
  "OTP（ワンタイムパスワード）とは、通常メールやSMSで送られる使い捨てのコードで、登録・ログイン・パスワードリセットの本人確認に使われます。有効期限のテストが重要なのは、コードが長生きしすぎる（または永久に有効な）場合、攻撃者が総当たりやコード窃取に使える時間が長くなり、アカウントを乗っ取られるリスクが高まるからです。");
const faq2 = FAQ(
  "Kiểm thử nội dung và liên kết trong email xác nhận cần chú ý gì?",
  "What should I check about the content and links in a confirmation email?",
  "Cần kiểm tra email gửi đúng tới địa chỉ người dùng đã nhập, nội dung không lỗi chính tả và hiển thị đúng mã OTP hoặc liên kết, liên kết trỏ đúng domain chính thức (không bị làm giả để lừa đảo phishing), thời hạn hiệu lực của mã được nêu rõ ràng, và email không bị các bộ lọc đánh dấu là thư rác (spam) khiến người dùng không nhận được.",
  "You should check that the email is sent to exactly the address the user entered, the content has no typos and correctly shows the OTP code or link, the link points to the official domain (not a spoofed one used for phishing), the code's validity period is clearly stated, and the email isn't flagged as spam by filters so the user actually receives it.",
  "確認メールの内容とリンクで何を確認すべき？",
  "メールがユーザーが入力した正しいアドレスに送られているか、内容に誤字がなくOTPコードやリンクが正しく表示されているか、リンクが正規のドメインを指しているか（フィッシング用の偽装リンクでないか）、コードの有効期限が明確に記載されているか、そしてメールがスパムフィルターに引っかかりユーザーが受け取れなくなっていないかを確認する必要があります。");
const faq3 = FAQ(
  "Vì sao cần giới hạn số lần nhập sai OTP và số lần gửi lại mã?",
  "Why should the number of wrong OTP attempts and resends be limited?",
  "Giới hạn số lần nhập sai giúp chống dò mã kiểu brute-force (thử hết mọi khả năng cho tới khi đúng); giới hạn số lần gửi lại giúp tránh làm ngập hộp thư người dùng, giảm chi phí gửi email/SMS, và ngăn kẻ xấu lợi dụng chức năng gửi OTP để spam hoặc làm phiền email/số điện thoại của người khác (không phải chính họ).",
  "Limiting wrong attempts prevents brute-force guessing (trying every possibility until one works); limiting resends prevents flooding a user's inbox, reduces email/SMS sending costs, and stops bad actors from abusing the OTP-send feature to spam or harass someone else's email or phone number.",
  "OTPの誤入力回数と再送信回数を制限すべき理由は？",
  "誤入力回数の制限は、正解が出るまで試し続けるブルートフォース攻撃を防ぎます。再送信回数の制限は、ユーザーの受信箱があふれるのを防ぎ、メール/SMS送信コストを抑え、悪意ある第三者がOTP送信機能を悪用して他人のメールや電話番号にスパム・迷惑行為をするのを防ぎます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao cần có ca kiểm thử 'nhập đúng OTP nhưng đã hết hạn'?", en: "Why do we need a test case for 'entering a correct OTP that has already expired'?", ja: "『正しいOTPだが既に期限切れ』のテストケースがなぜ必要？" },
    options: [
      { vi: "Để xác nhận hệ thống có thực sự vô hiệu hóa mã sau thời gian quy định, tránh lỗ hổng bảo mật", en: "To confirm the system truly invalidates the code after the set time, avoiding a security hole", ja: "システムが規定時間後に本当にコードを無効化しているか確認し、セキュリティの穴を防ぐため" },
      { vi: "Để kiểm tra tốc độ gửi email", en: "To check the email sending speed", ja: "メール送信速度を確認するため" },
      { vi: "Vì ca này không cần thiết, chỉ cần test OTP đúng và còn hạn", en: "Because this case is unnecessary, testing only a correct and unexpired OTP is enough", ja: "このケースは不要で、有効期限内の正しいOTPだけテストすれば十分だから" },
      { vi: "Để đo dung lượng hộp thư của người dùng", en: "To measure the user's mailbox storage capacity", ja: "ユーザーの受信箱の容量を測定するため" },
    ], correct: 0,
    explain: { vi: "Nếu OTP không hết hạn đúng lúc, kẻ tấn công có thêm thời gian để đánh cắp/dò mã và chiếm tài khoản — đây là rủi ro bảo mật nghiêm trọng.", en: "If OTP doesn't expire on time, an attacker gets more time to steal/guess it and take over the account — a serious security risk.", ja: "OTPが規定時間で失効しないと、攻撃者がコードを盗む/推測する時間が増え、アカウント乗っ取りにつながる深刻なセキュリティリスクとなります。" },
  }),
  mcq({
    q: { vi: "Ca kiểm thử nào thường phát hiện lỗ hổng bảo mật nghiêm trọng nhất trong luồng OTP?", en: "Which test case usually catches the most serious security hole in an OTP flow?", ja: "OTPフローで最も深刻なセキュリティホールを見つけやすいテストケースは？" },
    options: [
      { vi: "OTP hết hạn nhưng hệ thống vẫn chấp nhận", en: "OTP has expired but the system still accepts it", ja: "OTPが期限切れなのにシステムが受け入れてしまう" },
      { vi: "Giao diện hiển thị đúng font chữ", en: "The UI displays the correct font", ja: "UIのフォントが正しく表示される" },
      { vi: "Nút 'Xác nhận' có màu xanh dương", en: "The 'Confirm' button is blue", ja: "『確認』ボタンが青色である" },
      { vi: "Trang tải trong 1 giây", en: "The page loads in 1 second", ja: "ページが1秒で読み込まれる" },
    ], correct: 0,
    explain: { vi: "OTP không hết hạn đúng lúc là lỗ hổng cho phép kẻ tấn công dùng mã cũ đã lộ hoặc bị đánh cắp để chiếm tài khoản.", en: "OTP not expiring on time is a hole that lets an attacker use an old, leaked or stolen code to take over an account.", ja: "OTPが期限どおりに失効しないと、漏洩・盗難された古いコードを使ってアカウントを乗っ取られる穴になります。" },
  }),
  mcq({
    q: { vi: "Vì sao cần giới hạn số lần bấm 'Gửi lại mã OTP'?", en: "Why should the 'Resend OTP' button be rate-limited?", ja: "『OTP再送信』ボタンを回数制限すべき理由は？" },
    options: [
      { vi: "Để giao diện trông đẹp hơn", en: "To make the UI look nicer", ja: "UIをより美しく見せるため" },
      { vi: "Để tránh gửi tràn email/SMS gây spam hộp thư người dùng và tốn chi phí gửi", en: "To avoid flooding email/SMS, spamming the user's inbox and wasting sending costs", ja: "メール/SMSの乱発を防ぎ、ユーザーの受信箱をスパムだらけにせず、送信コストを抑えるため" },
      { vi: "Để mã OTP dài hơn", en: "To make the OTP code longer", ja: "OTPコードを長くするため" },
      { vi: "Vì hệ thống chỉ gửi được tối đa 1 email trong đời", en: "Because the system can only ever send one email in total", ja: "システムは生涯で1通しかメールを送れないから" },
    ], correct: 1,
    explain: { vi: "Không giới hạn gửi lại có thể gây spam hộp thư, tốn chi phí gửi email/SMS, và bị lợi dụng để làm phiền người khác.", en: "Unlimited resends can spam the inbox, waste email/SMS sending costs, and be abused to harass others.", ja: "再送信を無制限にすると受信箱がスパムだらけになり、送信コストが無駄になり、他人への迷惑行為に悪用され得ます。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử email xác nhận, điều nào KHÔNG phải trọng tâm cần kiểm tra?", en: "When testing a confirmation email, which is NOT a key thing to check?", ja: "確認メールをテストする際、確認すべき重点でないのはどれ？" },
    options: [
      { vi: "Email có gửi đúng tới địa chỉ người dùng đã đăng ký không", en: "Whether the email is sent to the exact address the user registered", ja: "ユーザーが登録した正しいアドレスにメールが送られているか" },
      { vi: "Liên kết trong email có trỏ đúng domain chính thức không", en: "Whether the link in the email points to the official domain", ja: "メール内のリンクが正規のドメインを指しているか" },
      { vi: "Mã OTP hoặc liên kết trong email có hiển thị đúng, không lỗi chính tả không", en: "Whether the OTP code or link in the email displays correctly without typos", ja: "メール内のOTPコードやリンクが誤字なく正しく表示されているか" },
      { vi: "Màu nền của trang web công ty gửi email có trùng với logo công ty đối thủ không", en: "Whether the sending company's website background color matches a competitor's logo", ja: "送信元会社のウェブサイトの背景色が競合他社のロゴと一致するか" },
    ], correct: 3,
    explain: { vi: "Ba điều đầu ảnh hưởng trực tiếp tới bảo mật và trải nghiệm; màu nền so với logo đối thủ không liên quan tới kiểm thử email/OTP.", en: "The first three directly affect security and UX; comparing background color to a competitor's logo is unrelated to email/OTP testing.", ja: "最初の3つはセキュリティとUXに直接影響しますが、背景色と競合ロゴの比較はメール/OTPテストと無関係です。" },
  }),
  mcq({
    q: { vi: "Đâu là ca kiểm thử ÂM hợp lý khi nhập OTP?", en: "Which is a reasonable negative test case for entering OTP?", ja: "OTP入力に対する適切なネガティブテストケースはどれ？" },
    options: [
      { vi: "Nhập đúng OTP ngay khi vừa nhận được", en: "Enter the correct OTP right after receiving it", ja: "受信直後に正しいOTPを入力する" },
      { vi: "Nhập sai OTP nhiều lần liên tiếp để kiểm tra hệ thống có khóa/chặn đúng cách không", en: "Enter a wrong OTP repeatedly to check whether the system correctly locks/blocks it", ja: "システムが正しくロック/ブロックするか確認するため誤ったOTPを繰り返し入力する" },
      { vi: "Đợi email tải xong rồi mới mở hộp thư", en: "Wait for the email to finish loading before opening the inbox", ja: "メールの読み込みが終わってから受信箱を開く" },
      { vi: "Kiểm tra logo công ty trên trang chủ", en: "Check the company logo on the homepage", ja: "ホームページの会社ロゴを確認する" },
    ], correct: 1,
    explain: { vi: "Nhập sai OTP nhiều lần là dữ liệu bất thường dùng để xác nhận hệ thống chặn đúng cách (chống dò mã), đúng bản chất kiểm thử âm.", en: "Repeatedly entering a wrong OTP is abnormal input used to confirm the system blocks it correctly (anti-brute-force) — the essence of negative testing.", ja: "誤ったOTPを繰り返し入力するのは異常な入力であり、システムが正しくブロックするか（総当たり対策）を確認するネガティブテストの本質です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử email & OTP là việc xác nhận hệ thống gửi đúng địa chỉ, nội dung/liên kết đúng, mã OTP hết hạn đúng lúc, từ chối OTP sai, giới hạn số lần nhập sai và số lần gửi lại, đồng thời email không bị đánh dấu là spam. Bài này bám màn hình xác thực OTP và email đăng ký/đặt lại mật khẩu của app TMĐT ShopEasy: bạn học cách nghĩ ca kiểm thử, phát hiện lỗ hổng thật (OTP không hết hạn, gửi lại vô hạn), có hình minh hoạ và trắc nghiệm cuối bài.",
        "Testing email & OTP means confirming the system sends to the right address, has correct content/links, expires the OTP on time, rejects a wrong OTP, rate-limits wrong attempts and resends, and doesn't get the email flagged as spam. This article follows ShopEasy's OTP verification screen and signup/password-reset emails: you learn to design test cases, find real holes (OTP never expiring, unlimited resends), with visuals and a quiz at the end.",
        "メール＆OTPテストとは、システムが正しいアドレスに送信し、内容とリンクが正しく、OTPが規定どおり失効し、誤ったOTPを拒否し、誤入力回数と再送信回数が制限され、メールがスパム扱いされないことを確認することです。本記事はECアプリShopEasyのOTP認証画面と登録/パスワードリセットメールに沿い、テストケースの考え方、実際の穴（OTPが失効しない、再送信が無制限）の発見方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Có lẽ bạn đã quen với việc kiểm thử form đăng ký hay giỏ hàng, nhưng email và OTP lại là một 'cửa ải' khác hẳn: nó không chỉ nằm trên màn hình bạn đang xem, mà còn 'đi ra ngoài' tới hộp thư thật của người dùng rồi 'đi vào lại' màn hình xác thực. ShopEasy dùng OTP gửi qua email cho hai luồng quan trọng: đăng ký tài khoản mới và đặt lại mật khẩu khi quên. Nếu luồng này có lỗi, người dùng có thể không đăng ký được, hoặc tệ hơn — tài khoản của họ có thể bị người khác chiếm đoạt.",
        "Hi, newcomer! You've probably tested signup forms or shopping carts before, but email and OTP are a different kind of challenge: they don't just live on the screen in front of you — they travel out to a real inbox and then come back into the verification screen. ShopEasy uses email OTP for two important flows: new account signup and password reset. If this flow breaks, users may fail to sign up, or worse — their account could be taken over by someone else.",
        "こんにちは、初心者さん！登録フォームやカートのテストには慣れているかもしれませんが、メールとOTPは全く違う関門です——目の前の画面だけでなく、実際のユーザーの受信箱に『出て行き』、また認証画面に『戻ってくる』からです。ShopEasyは新規登録とパスワードリセットという2つの重要なフローでメールOTPを使います。このフローにバグがあると、ユーザーが登録できなかったり、最悪の場合アカウントを他人に乗っ取られたりします。"),
      IMG(m_otp, "Màn hình test: nhập mã OTP xác thực ShopEasy, có đếm ngược hết hạn", "Screen under test: ShopEasy OTP verification with an expiry countdown", "テスト対象画面：有効期限カウントダウン付きのShopEasy OTP認証画面"),
      DEF("OTP (One-Time Password)", "mã dùng một lần, thường gửi qua email/SMS, dùng để xác thực người dùng trong một khoảng thời gian giới hạn.",
        "a single-use code, usually sent via email/SMS, used to verify a user within a limited time window.",
        "メール/SMSで送られる使い捨てのコードで、限られた時間内にユーザーを認証するために使われる。"),
    ] },
  { heading: { vi: "2. Vì sao kiểm thử email & OTP quan trọng với người mới", en: "2. Why email & OTP testing matters for beginners", ja: "2. 初心者にとってメール＆OTPテストが重要な理由" },
    blocks: [
      P("Email và OTP thường là 'cánh cửa' đầu tiên giữa người dùng thật và hệ thống: đăng ký tài khoản, xác thực số điện thoại/email, đặt lại mật khẩu khi quên. Nếu cánh cửa này bị lỗi, hậu quả không chỉ là 'khó chịu' mà có thể là mất khách hàng ngay từ bước đầu tiên — họ không đăng ký được thì không bao giờ trở thành khách hàng thật sự.",
        "Email and OTP are often the very first 'door' between a real user and the system: account signup, email/phone verification, resetting a forgotten password. If this door breaks, the consequence isn't just annoyance — it can mean losing the customer at the very first step, since someone who can't sign up never becomes a real customer.",
        "メールとOTPは、実際のユーザーとシステムの間にある最初の『扉』であることが多いです：アカウント登録、メール/電話番号認証、忘れたパスワードのリセット。この扉が壊れると、単なる不便では済まず、最初のステップで顧客を失うことになりかねません——登録できない人は本当の顧客には決してなれないからです。"),
      P("Quan trọng hơn, luồng OTP còn liên quan trực tiếp tới BẢO MẬT tài khoản — khác với những lỗi giao diện thông thường. Một lỗi nhỏ như 'OTP không hết hạn' hay 'không giới hạn số lần nhập sai' có thể trở thành lỗ hổng nghiêm trọng cho phép kẻ xấu chiếm đoạt tài khoản người dùng khác. Vì vậy, kiểm thử kỹ luồng email & OTP là một trong những kỹ năng giúp bạn ghi điểm nhất với nhà tuyển dụng, vì nó cho thấy bạn hiểu cả về chức năng lẫn bảo mật cơ bản.",
        "More importantly, the OTP flow is directly tied to account SECURITY — unlike ordinary UI bugs. A small issue like 'OTP never expires' or 'no limit on wrong attempts' can become a serious hole that lets a bad actor take over another user's account. That's why thoroughly testing the email & OTP flow is one of the skills that impresses employers most, since it shows you understand both functionality and basic security.",
        "さらに重要なのは、OTPフローが通常のUIバグとは異なり、アカウントのセキュリティに直結している点です。『OTPが失効しない』『誤入力回数が制限されていない』といった小さな問題が、他人のアカウントを乗っ取れる深刻な穴になり得ます。そのため、メール＆OTPフローを丁寧にテストするスキルは、機能面だけでなく基本的なセキュリティも理解していることを示せるため、採用担当者に最も好印象を与えるスキルの一つです。"),
      P("Với riêng bạn — người mới — đây cũng là cơ hội để tập tư duy 'ngoài giao diện': OTP không chỉ nằm ở màn hình nhập mã, mà còn ở nội dung email, thời gian sống của mã trên server, và số lần được phép thử. Học cách kiểm thử toàn diện luồng này giúp bạn quen dần với việc kiểm thử các hệ thống có nhiều thành phần liên kết với nhau, không chỉ một màn hình đơn lẻ.",
        "For you specifically — a beginner — this is also a chance to practice thinking 'beyond the screen': OTP isn't just the code-entry screen, it's also the email content, the code's lifetime on the server, and the number of allowed attempts. Learning to thoroughly test this flow gets you used to testing systems with multiple connected parts, not just a single screen.",
        "特に初心者のあなたにとって、これは『画面の外』を考える練習の機会でもあります。OTPはコード入力画面だけでなく、メールの内容、サーバー上でのコードの生存時間、許容される試行回数にも関わります。このフローを網羅的にテストする方法を学ぶことで、単一画面だけでなく、複数の要素が連携するシステムのテストに慣れていけます。"),
    ] },
  { heading: { vi: "3. Các loại kiểm thử cần làm cho email & OTP", en: "3. Types of testing needed for email & OTP", ja: "3. メール＆OTPに必要なテストの種類" },
    blocks: [
      P("Kiểm thử email & OTP không chỉ dừng ở 'nhập mã đúng thì qua'. Có ít nhất bảy góc bạn cần bao phủ: (1) email/OTP gửi đúng địa chỉ người dùng đã đăng ký, (2) nội dung email đúng, không lỗi chính tả, (3) liên kết trong email trỏ đúng domain chính thức, (4) OTP hết hạn đúng thời gian quy định, (5) hệ thống từ chối khi nhập sai OTP, (6) gửi lại OTP có giới hạn số lần/thời gian, (7) email đúng định dạng kỹ thuật để không bị rơi vào mục thư rác (spam).",
        "Testing email & OTP goes far beyond 'entering the right code passes'. There are at least seven angles to cover: (1) the email/OTP is sent to the exact address the user registered, (2) the email content is correct with no typos, (3) the link in the email points to the official domain, (4) OTP expires exactly on the defined time, (5) the system rejects a wrong OTP, (6) resending OTP is rate-limited, (7) the email is technically well-formed so it doesn't land in spam.",
        "メール＆OTPのテストは『正しいコードを入力すれば通る』だけでは終わりません。少なくとも7つの観点をカバーする必要があります：(1)メール/OTPが登録した正しいアドレスに送られる、(2)メール内容が正しく誤字がない、(3)メール内のリンクが正規のドメインを指す、(4)OTPが規定どおりの時間で失効する、(5)誤ったOTPをシステムが拒否する、(6)OTP再送信に回数/時間の制限がある、(7)メールが技術的に適切な形式でスパム扱いされない。"),
      IMG(m_email, "Mẫu email xác nhận đăng ký ShopEasy, có mã OTP và thời hạn hiệu lực", "ShopEasy signup confirmation email sample, showing the OTP code and validity period", "OTPコードと有効期限を示すShopEasy登録確認メールのサンプル"),
      P("Trong bảy góc trên, ba góc đầu (đúng người nhận, nội dung, liên kết) thường được test dễ dàng bằng cách quan sát trực tiếp hộp thư. Bốn góc còn lại (hết hạn, sai mã, giới hạn gửi lại, định dạng chống spam) đòi hỏi bạn phải chủ động 'chờ đợi' hoặc 'lặp lại thao tác nhiều lần' — đây chính là những góc người mới hay bỏ sót vì tốn thời gian hơn.",
        "Of the seven angles, the first three (correct recipient, content, links) are usually easy to test by simply observing the inbox. The remaining four (expiry, wrong code, resend limits, anti-spam formatting) require you to actively 'wait' or 'repeat an action many times' — these are exactly the angles beginners tend to skip because they take more time.",
        "上記7つの観点のうち、最初の3つ（正しい受信者、内容、リンク）は受信箱を直接観察するだけで比較的簡単にテストできます。残りの4つ（失効、誤ったコード、再送信制限、スパム対策の形式）は、あなたが積極的に『待つ』または『操作を何度も繰り返す』必要があります——これらこそ時間がかかるため初心者が見落としがちな観点です。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: kỹ thuật nghĩ ca kiểm thử OTP", en: "4. Prepare: techniques for designing OTP test cases", ja: "4. 準備：OTPテストケースを考える技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt để bắt đầu — chỉ cần một danh sách các 'góc kiểm thử' để không bỏ sót phần nào khi test một luồng OTP bất kỳ trong ShopEasy hay bất kỳ app nào khác.",
        "You don't need special tools to start — just a checklist of 'testing angles' so you don't miss anything when testing any OTP flow in ShopEasy or any other app.",
        "始めるのに特別なツールは不要です——ShopEasyや他のどんなアプリのOTPフローをテストしても漏れが出ないよう、『テスト観点』のチェックリストがあれば十分です。"),
      STEP(1, "Liệt kê toàn bộ nơi hệ thống dùng OTP/email (đăng ký, đặt lại mật khẩu, đổi email...).", "List every place the system uses OTP/email (signup, password reset, changing email, etc.).", "システムがOTP/メールを使う箇所（登録、パスワードリセット、メール変更など）をすべて列挙する。"),
      STEP(2, "Với mỗi luồng, áp lần lượt các góc: đúng người nhận, nội dung/liên kết, hết hạn, sai mã, gửi lại, giới hạn số lần.", "For each flow, apply the angles in turn: correct recipient, content/link, expiry, wrong code, resend, rate limit.", "各フローに、正しい受信者・内容/リンク・失効・誤ったコード・再送信・回数制限の観点を順に適用する。"),
      STEP(3, "Ghi lại thời hạn hiệu lực thực tế được quy định (ví dụ 5 phút) để đối chiếu khi test biên thời gian.", "Note the actually configured validity period (e.g. 5 minutes) to compare against when testing time boundaries.", "実際に設定された有効期限（例：5分）を記録し、時間境界値テストの比較に使う。"),
      TRY("Mở một app bạn đang dùng, yêu cầu gửi OTP, đợi đến khi màn hình báo hết hạn rồi thử nhập lại đúng mã cũ xem hệ thống phản ứng thế nào.", "Open an app you use, request an OTP, wait until the screen shows it's expired, then try entering the old correct code and see how the system reacts.", "使っているアプリでOTPをリクエストし、画面が期限切れを表示するまで待ってから、古い正しいコードを入力してシステムの反応を確認してみよう。"),
      PITFALL("Nghĩ rằng OTP chỉ cần 'gửi được' là đủ, quên kiểm tra hết hạn đúng lúc và giới hạn số lần nhập sai/gửi lại — đây là những nơi lỗi bảo mật hay ẩn náu nhất.", "Thinking OTP just needs to 'be sendable' and forgetting to check on-time expiry and limits on wrong attempts/resends — these are exactly where security bugs tend to hide.", "OTPは『送信できれば十分』と考え、期限どおりの失効や誤入力/再送信の回数制限の確認を忘れること——これこそセキュリティバグが最も潜みやすい場所です。"),
      IMG(m_technique, "Checklist các góc cần kiểm thử cho OTP & email, minh hoạ trên ShopEasy", "Checklist of angles to test for OTP & email, illustrated on ShopEasy", "OTP＆メールでテストすべき観点のチェックリスト、ShopEasyで例示"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử OTP từng bước (thực hành)", en: "5. Writing OTP test cases step by step (hands-on)", ja: "5. OTPテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào luồng 'Đặt lại mật khẩu' của ShopEasy — nơi OTP đóng vai trò then chốt vì liên quan trực tiếp tới quyền truy cập tài khoản. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ.",
        "Now let's apply it for real to ShopEasy's 'Reset password' flow — where OTP plays a key role because it's directly tied to account access. Follow the order below to build a full set of test cases.",
        "では、ShopEasyの『パスワードリセット』フローに実際に適用しましょう——アカウントへのアクセス権に直結するため、OTPが重要な役割を果たす箇所です。以下の順序に沿って完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca dương chuẩn trước: nhập đúng OTP trong hạn để có mốc so sánh.", "First define the standard positive case: enter the correct OTP within the validity period as a baseline.", "まず標準的なポジティブケースを定義：有効期限内に正しいOTPを入力し、比較基準とする。"),
      STEP(2, "Test biên thời gian hết hạn: nhập đúng OTP ngay trước khi hết hạn, và ngay sau khi vừa hết hạn.", "Test the expiry time boundary: enter the correct OTP right before it expires, and right after it just expired.", "有効期限の境界値をテスト：期限切れ直前と直後に正しいOTPを入力する。"),
      STEP(3, "Test giới hạn số lần: nhập sai OTP liên tiếp cho tới giới hạn quy định, và bấm 'Gửi lại mã' liên tục.", "Test rate limits: enter a wrong OTP repeatedly up to the defined limit, and keep clicking 'Resend code'.", "回数制限をテスト：規定の回数まで誤ったOTPを繰り返し入力し、『再送信』を連続でクリックする。"),
      STEP(4, "Ghi Expected (kết quả mong đợi) và Actual (kết quả thực tế) riêng biệt cho mỗi ca; nếu khác nhau, chuyển ngay thành bug report.", "Write Expected and Actual results separately for each case; if they differ, immediately turn it into a bug report.", "各ケースでExpected（期待結果）とActual（実際の結果）を別々に記録し、異なればすぐバグレポートにする。"),
      CODE("text", "BO CA KIEM THU OTP - dat lai mat khau ShopEasy\nCa 1: OTP dung, con han            | Expected: xac thuc thanh cong          | Actual: thanh cong dung\nCa 2: OTP dung, da het han (>5 phut) | Expected: tu choi, bao 'het han'      | Actual: van chap nhan (BUG)\nCa 3: OTP sai 6 lan lien tiep        | Expected: khoa tam thoi               | Actual: khong khoa, cho nhap vo han (BUG)\nCa 4: Bam 'Gui lai ma' 10 lan/phut   | Expected: gioi han so lan/thoi gian    | Actual: gui khong gioi han (BUG)"),
      TRY("Viết thêm 1 ca kiểm thử OTP nữa mà bảng trên chưa có (gợi ý: nhập OTP trên thiết bị khác, hoặc dùng lại OTP đã xác thực thành công một lần).", "Write one more OTP test case not in the table above (hint: enter OTP on a different device, or reuse an OTP that already succeeded once).", "上の表にないOTPテストケースをもう1つ書こう（ヒント：別のデバイスでOTPを入力する、または一度使用済みのOTPを再利用してみる）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: OTP không hết hạn → rủi ro bảo mật", en: "6. Situation 1: OTP never expires → a security risk", ja: "6. シーン1：OTPが失効しない → セキュリティリスク" },
    blocks: [
      SITUATION("Đội test chỉ thử nhập đúng OTP ngay sau khi nhận được — mọi ca đều pass, không ai thử đợi lâu rồi mới nhập.", "The team only tries entering the correct OTP right after receiving it — every case passes, no one tries waiting a long time before entering it.",
        "Một tester tò mò giữ lại email OTP cũ, đợi hơn 2 giờ rồi nhập lại — hệ thống vẫn xác thực thành công. Mã OTP hoá ra không có kiểm tra hết hạn ở phía server, chỉ có đồng hồ đếm ngược 'cho vui' trên giao diện.",
        "A curious tester keeps an old OTP email, waits over 2 hours, then re-enters it — the system still verifies successfully. It turns out the OTP has no server-side expiry check; the countdown on the screen was 'just for show'.",
        "チームは受信直後に正しいOTPを入力することしか試しておらず、全ケース合格、誰も長時間待ってから入力する検証をしていない。",
        "好奇心旺盛なテスターが古いOTPメールを保管し、2時間以上待ってから再入力——システムはそれでも認証に成功してしまう。実はOTPにはサーバー側の期限チェックがなく、画面上のカウントダウンは『見せかけ』にすぎなかった。"),
      SOLVE("Bổ sung ca kiểm thử 'đợi hết thời gian quy định rồi mới nhập OTP' cho MỌI luồng dùng OTP (đăng ký, đặt lại mật khẩu, đổi email), và yêu cầu kiểm tra hết hạn được thực hiện ở phía SERVER, không chỉ dựa vào đồng hồ đếm ngược trên giao diện.", "Add a 'wait past the validity period, then enter the OTP' case for EVERY OTP-using flow (signup, password reset, changing email), and require the expiry check to happen SERVER-side, not just rely on the on-screen countdown.", "登録・パスワードリセット・メール変更などOTPを使う全フローに『有効期限が過ぎてから入力する』ケースを追加し、期限チェックを画面上のカウントダウンだけに頼らずサーバー側で行うよう要求する。"),
      P("Đây là bài học lớn nhất của chương này: một đồng hồ đếm ngược đẹp mắt trên giao diện KHÔNG chứng minh được là mã đã thực sự hết hạn phía hệ thống. Chỉ có cách gửi request thật (hoặc đợi thật) sau thời gian quy định rồi quan sát kết quả mới xác nhận được điều đó. Đây cũng là lý do vì sao kiểm thử bảo mật cơ bản luôn cần 'nghi ngờ' giao diện và kiểm tra hành vi thật của hệ thống.",
        "This is the biggest lesson in this chapter: a nice-looking countdown on the UI does NOT prove the code has actually expired on the system side. Only sending a real request (or really waiting) past the defined time and observing the result confirms that. This is also why basic security testing always needs to 'distrust' the UI and check the system's real behavior.",
        "この章での最大の教訓です：見た目の美しいカウントダウンは、システム側でコードが本当に失効したことを証明しません。規定時間を過ぎてから実際にリクエストを送る（または本当に待つ）ことで結果を確認して初めて証明できます。これは、基本的なセキュリティテストが常にUIを『疑い』、システムの実際の挙動を確認する必要がある理由でもあります。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử 'OTP hết hạn' bị bỏ sót", "A bug ticket found via the 'OTP expiry' test case that was previously skipped", "見落とされていた『OTP失効』テストケースで見つかったバグチケット"),
      RECAP(["Đồng hồ đếm ngược trên giao diện KHÔNG chứng minh mã đã hết hạn phía server", "Luôn thêm ca 'đợi hết hạn rồi nhập lại' cho mọi luồng dùng OTP"],
        ["An on-screen countdown does NOT prove the code expired server-side", "Always add a 'wait past expiry then re-enter' case for every OTP flow"],
        ["画面上のカウントダウンはサーバー側での失効を証明しない", "OTPを使う全フローに『期限切れを待ってから再入力』ケースを必ず追加する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: gửi lại OTP không giới hạn → spam", en: "7. Situation 2: unlimited OTP resends → spam", ja: "7. シーン2：OTP再送信が無制限 → スパム" },
    blocks: [
      SITUATION("Bạn thử bấm nút 'Gửi lại mã' nhiều lần liên tiếp trong vài phút chỉ để xem điều gì xảy ra.", "You try clicking the 'Resend code' button repeatedly for a few minutes just to see what happens.",
        "Hệ thống gửi một OTP mới mỗi lần bạn bấm, không hề có thời gian chờ hay giới hạn số lần — sau 2 phút thử, hộp thư nhận được 20 email OTP liên tiếp. Nếu bị lợi dụng, tính năng này có thể dùng để spam hộp thư của bất kỳ ai, kể cả người không hề đăng ký ShopEasy.",
        "The system sends a fresh OTP every time you click, with no cooldown or limit at all — after 2 minutes of testing, the inbox received 20 OTP emails in a row. If abused, this feature could be used to spam anyone's inbox, even someone who never signed up for ShopEasy.",
        "『再送信』ボタンを数分間に何度も連続してクリックしてみて何が起きるか確認。",
        "クリックするたびにシステムは新しいOTPを送信し、待機時間や回数制限が全くない——2分間のテストで受信箱に20通のOTPメールが連続で届いた。悪用されれば、この機能はShopEasyに登録していない人も含め、誰の受信箱でもスパムに使われかねない。"),
      SOLVE("Báo bug mức High/Critical (ảnh hưởng chi phí gửi mail & trải nghiệm người dùng), đề xuất thêm thời gian chờ tối thiểu giữa các lần gửi (ví dụ 60 giây) cộng giới hạn số lần/giờ ở cả giao diện lẫn server, và bổ sung ca kiểm thử này vào bộ hồi quy.", "Report it as a High/Critical bug (affects email sending cost & user experience), propose a minimum cooldown between sends (e.g. 60 seconds) plus a per-hour limit on both UI and server, and add this case to the regression suite.", "High/Criticalバグとして報告（メール送信コストとユーザー体験に影響）、送信間隔の最小待機時間（例：60秒）と1時間あたりの回数制限をUIとサーバー両方で追加するよう提案し、このケースを回帰テストスイートに追加する。"),
      P("Ví dụ này cho thấy vì sao kiểm thử OTP không chỉ là chuyện 'đúng/sai mã', mà còn phải nghĩ tới việc TÍNH NĂNG BỊ LỢI DỤNG như thế nào. Một chức năng tưởng vô hại như 'gửi lại mã' có thể trở thành công cụ spam hoặc tấn công từ chối dịch vụ nếu không được giới hạn đúng cách. Khi ưu tiên thời gian có hạn, hãy luôn dành thời gian test riêng cho các nút có khả năng 'gửi thứ gì đó ra ngoài' như gửi email, gửi SMS, gửi thông báo.",
        "This example shows why testing OTP isn't just about right/wrong codes, but also about thinking through how a FEATURE COULD BE ABUSED. A seemingly harmless feature like 'resend code' can become a spam or denial-of-service tool if not properly rate-limited. When time is limited, always set aside dedicated time to test buttons that can 'send something out', like sending email, SMS, or notifications.",
        "この例は、OTPテストが単なる正解/不正解の問題ではなく、機能がどのように悪用され得るかを考える必要があることを示しています。『再送信』のような一見無害な機能も、適切に制限されなければスパムやサービス拒否攻撃の道具になり得ます。時間が限られる場合でも、メール・SMS・通知の送信など『何かを外部に送信する』ボタンには必ず専用のテスト時間を確保しましょう。"),
      IMG(m_dash, "Số liệu khi test giới hạn 'Gửi lại mã OTP' — không hề bị chặn sau 20 lần bấm", "Metrics from testing the 'Resend OTP' limit — not blocked at all after 20 clicks", "『OTP再送信』制限テストの指標——20回クリックしても全くブロックされない"),
      TRY("Nghĩ thêm một tính năng 'gửi thứ gì đó ra ngoài' khác trong app bạn dùng (mời bạn bè, gửi hóa đơn qua email...) và đề xuất 1 ca kiểm thử giới hạn số lần cho nó.", "Think of another 'send something out' feature in an app you use (invite a friend, email an invoice...) and propose one rate-limit test case for it.", "使っているアプリの別の『何かを外部送信する』機能（友達招待、メールで請求書送信など）を考え、回数制限のテストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Kiểm thử nội dung & định dạng email", en: "8. Testing email content & format", ja: "8. メールの内容と形式のテスト" },
    blocks: [
      P("Ngoài mã OTP, bản thân email cũng cần được kiểm thử như một 'màn hình' riêng biệt. Ba việc quan trọng nhất: (1) nội dung không lỗi chính tả, hiển thị đúng trên nhiều trình đọc email (Gmail, Outlook...); (2) liên kết trong email trỏ đúng domain chính thức, không bị làm giả để phục vụ lừa đảo (phishing); (3) email được cấu hình đúng chuẩn kỹ thuật gửi thư (như SPF/DKIM ở phía hệ thống) để không bị các bộ lọc đánh dấu là thư rác.",
        "Besides the OTP code, the email itself needs testing as its own separate 'screen'. Three most important things: (1) content has no typos and displays correctly across email clients (Gmail, Outlook...); (2) links in the email point to the official domain, not spoofed for phishing; (3) the email is configured with correct technical sending standards (like SPF/DKIM on the system side) so filters don't flag it as spam.",
        "OTPコードのほか、メール自体も独立した『画面』としてテストする必要があります。最も重要な3点：(1)内容に誤字がなく、複数のメールクライアント（Gmail、Outlookなど）で正しく表示される、(2)メール内のリンクが正規のドメインを指し、フィッシング用に偽装されていない、(3)メールがシステム側で正しい送信技術標準（SPF/DKIMなど）で設定されており、フィルターにスパム扱いされない。"),
      P("Người mới thường bỏ qua góc 'định dạng chống spam' vì nó khó quan sát trực tiếp — bạn không thể chỉ nhìn giao diện là biết email có bị chặn hay không. Cách thực dụng là: gửi thử OTP tới vài dịch vụ email phổ biến (Gmail, Outlook, Yahoo) và kiểm tra xem email có nằm ở hộp thư đến chính hay bị đẩy vào mục Spam/Quảng cáo — nếu bị đẩy vào Spam, người dùng thật rất dễ bỏ lỡ mã và nghĩ rằng hệ thống bị lỗi.",
        "Beginners often skip the 'anti-spam formatting' angle because it's hard to observe directly — you can't just look at a screen to know whether an email got blocked. A practical approach: send test OTPs to a few popular email services (Gmail, Outlook, Yahoo) and check whether the email lands in the main inbox or gets pushed into Spam/Promotions — if it lands in Spam, real users easily miss the code and think the system is broken.",
        "初心者は『スパム対策の形式』という観点を見落としがちです。直接観察しにくいからです——画面を見ただけではメールがブロックされたかどうか分かりません。実用的な方法は、いくつかの主要メールサービス（Gmail、Outlook、Yahoo）にテストOTPを送信し、メインの受信トレイに届くかスパム/プロモーションフォルダに振り分けられるかを確認することです——スパムに振り分けられると、実際のユーザーはコードを見逃しやすく、システムが壊れていると誤解します。"),
      IMG(m_kanban, "Bảng theo dõi lỗi Email & OTP tìm được trong sprint, gồm cả lỗi email rơi vào Spam", "A board tracking Email & OTP bugs found in a sprint, including an email-landing-in-Spam bug", "スプリントで見つかったメール＆OTPバグの追跡ボード（メールがスパムに振り分けられるバグを含む）"),
      TIP("Khi báo bug 'email rơi vào Spam', đính kèm ảnh chụp thư mục Spam thật và ghi rõ nhà cung cấp email (Gmail/Outlook...) — vì hành vi lọc thư khác nhau giữa các nhà cung cấp.", "When reporting an 'email in Spam' bug, attach a real screenshot of the Spam folder and note the email provider (Gmail/Outlook...) — filtering behavior differs between providers.", "『メールがスパムに入る』バグを報告する際は、実際のスパムフォルダのスクリーンショットを添付し、メールプロバイダー（Gmail/Outlookなど）を明記しよう——プロバイダーごとにフィルタリングの挙動が異なるため。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi kiểm thử email & OTP. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing email & OTP. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はメール＆OTPのテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ tin vào đồng hồ đếm ngược trên giao diện mà không thật sự đợi (hoặc mô phỏng) thời gian hết hạn để kiểm tra phía server.", "Only trusting the on-screen countdown without actually waiting (or simulating) the expiry time to verify the server side.", "画面上のカウントダウンだけを信用し、実際に（または模擬的に）期限切れの時間を待ってサーバー側を検証しないこと。"),
      PITFALL("Chỉ test 'gửi lại mã' một hoặc hai lần rồi dừng, không thử bấm liên tục nhiều lần để kiểm tra giới hạn số lần thực sự tồn tại hay không.", "Testing 'resend code' only once or twice then stopping, without clicking it repeatedly to check whether a real rate limit exists.", "『再送信』を1〜2回試すだけで止め、本当に回数制限が存在するか確認するため連続してクリックしないこと。"),
      TIP("Trước khi báo một ca là bug bảo mật, thử mô tả rõ 'kẻ tấn công có thể lợi dụng điều này để làm gì' — giúp báo cáo thuyết phục hơn và đúng mức độ ưu tiên (severity/priority).", "Before reporting a case as a security bug, try to clearly describe 'what an attacker could exploit this to do' — this makes the report more convincing and correctly prioritized (severity/priority).", "セキュリティバグとして報告する前に、『攻撃者がこれを悪用して何ができるか』を明確に説明してみよう——報告がより説得力を持ち、正しい重要度（severity/priority）で評価されやすくなります。"),
      IMG(m_cases, "Nhắc lại bảng ca kiểm thử OTP — dùng làm checklist khi thời gian có hạn", "Reminder of the OTP test case table — use as a checklist when time is limited", "OTPテストケース表の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Kiểm thử đăng nhập & đăng ký cho người mới", "Login & signup testing for beginners", "kiem-thu-dang-nhap-dang-ky-cho-nguoi-moi", "初心者のためのログイン・登録テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者向けネガティブテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử email & OTP qua luồng đăng ký và đặt lại mật khẩu của ShopEasy: bảy góc cần bao phủ (đúng người nhận, nội dung/liên kết, hết hạn, sai mã, gửi lại, giới hạn số lần, định dạng chống spam), và hai tình huống thật cho thấy đồng hồ đếm ngược giao diện không đủ để chứng minh hệ thống an toàn, còn tính năng 'gửi lại mã' nếu không giới hạn có thể bị lợi dụng để spam. Đây là kỹ năng giúp bạn kiểm thử không chỉ đúng/sai mà còn nghĩ tới góc độ bảo mật cơ bản — điều nhà tuyển dụng rất đánh giá cao ở một tester.",
        "You just learned how to test email & OTP through ShopEasy's signup and password-reset flows: seven angles to cover (correct recipient, content/link, expiry, wrong code, resend, rate limit, anti-spam formatting), and two real situations showing that an on-screen countdown alone isn't enough proof of system safety, and that an unrestricted 'resend code' feature can be abused for spam. This skill helps you test not just right/wrong, but also basic security thinking — something employers value highly in a tester.",
        "ShopEasyの登録とパスワードリセットフローを通じて、メール＆OTPのテスト方法を学びました：カバーすべき7つの観点（正しい受信者、内容/リンク、失効、誤ったコード、再送信、回数制限、スパム対策の形式）、そして画面上のカウントダウンだけではシステムの安全性を証明できないこと、制限のない『再送信』機能がスパムに悪用され得ることを示す2つの実例。このスキルは、正解/不正解だけでなく基本的なセキュリティ思考でテストする力を養います——これは採用担当者がテスターに高く評価するポイントです。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật kiểm thử đăng nhập/đăng ký và kiểm thử âm (negative testing) để mở rộng tư duy 'phá hệ thống một cách có phương pháp', cùng cách viết bug report chuẩn để báo cáo những lỗ hổng bảo mật bạn tìm được một cách thuyết phục. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn login/signup testing and negative testing to broaden your 'systematically breaking the system' mindset, along with how to write a proper bug report to convincingly present the security holes you find. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、ログイン/登録テストとネガティブテストの技法を学び、『体系的にシステムを壊す』思考を広げるとともに、見つけたセキュリティホールを説得力を持って報告するための適切なバグレポートの書き方を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const EMAILOTP_01 = makeDoc({
  slug: "kiem-thu-email-otp-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử OTP",
  keywords: ["kiểm thử OTP", "kiểm thử email", "OTP hết hạn", "test OTP", "gửi lại OTP cho người mới"],
  coverLabel: "NGƯỜI MỚI · EMAIL & OTP · TMĐT",
  crumb: "Kiểm thử email & OTP cho người mới",
  metaTitle: { vi: "Kiểm thử OTP & email cho người mới", en: "Testing email & OTP for beginners", ja: "初心者向けメール＆OTPテスト" },
  metaDescription: {
    vi: "Kiểm thử OTP và email cho người mới: cách test email xác nhận, OTP hết hạn, nhập sai, gửi lại nhiều lần qua app ShopEasy, có hình minh họa và trắc nghiệm.",
    en: "Testing email and OTP for beginners: how to test confirmation emails, OTP expiry, wrong entries, repeated resends through the ShopEasy app, with visuals and a quiz.",
    ja: "初心者向けメールとOTPのテスト：ShopEasyアプリで確認メール、OTP失効、誤入力、繰り返しの再送信をテストする方法を、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử email & OTP cho người mới: đăng ký, đặt lại mật khẩu, hết hạn, gửi lại (có trắc nghiệm)",
    en: "Email & OTP testing for beginners: signup, password reset, expiry, resend (with quiz)",
    ja: "初心者のためのメール＆OTPテスト：登録、パスワードリセット、失効、再送信（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cách kiểm thử OTP và email xác nhận qua app TMĐT ShopEasy — đăng ký, đặt lại mật khẩu, OTP hết hạn, nhập sai, gửi lại nhiều lần, giới hạn số lần, định dạng chống spam. Hai tình huống thật (OTP không hết hạn, gửi lại vô hạn), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to test confirmation emails and OTP codes through the ShopEasy e-commerce app — signup, password reset, OTP expiry, wrong entries, repeated resends, rate limits, anti-spam formatting. Two real situations (OTP never expiring, unlimited resends), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyで確認メールとOTPコードのテストを学ぶ——登録、パスワードリセット、OTP失効、誤入力、繰り返しの再送信、回数制限、スパム対策の形式。2つの実例（OTPが失効しない、再送信が無制限）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử email & OTP", steps: [
    { name: "Liệt kê mọi luồng dùng OTP/email", text: "Đăng ký, đặt lại mật khẩu, đổi email." },
    { name: "Áp bảy góc kiểm thử cho từng luồng", text: "Đúng người nhận, nội dung/liên kết, hết hạn, sai mã, gửi lại, giới hạn số lần, chống spam." },
    { name: "Ưu tiên test hết hạn & giới hạn số lần ở phía server", text: "Đây là nơi dễ ẩn náu lỗ hổng bảo mật nghiêm trọng nhất." },
  ] },
  pages,
});

export const MB_EMAILOTP_01 = [EMAILOTP_01];
