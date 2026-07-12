// doc_mb_dang_nhap.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử đăng nhập & đăng ký (Authentication Testing) — các ca cần test cho form
// đăng nhập/đăng ký: sai mật khẩu, khoá tài khoản, ghi nhớ đăng nhập, ràng buộc mật khẩu
// mạnh, email đã tồn tại, đăng xuất, phiên hết hạn. Practice-first, nhiều MOCKUP giao diện
// (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
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

// ── Mockup 1: màn đăng nhập ShopEasy sai mật khẩu + annotate ──
const m_login = browser("shopeasy.vn/dang-nhap", [
  panel("ShopEasy · Đăng nhập", [
    field(24, 20, 712, "Email", "mai.tran@gmail.com", "normal"),
    field(24, 92, 712, "Mật khẩu", "MaiSai123", "error"),
    btn(24, 168, 200, "Đăng nhập", "primary"),
    annotate(20, 84, 720, 62, "ÂM: sai mật khẩu — cần từ chối + thông báo chung chung, KHÔNG khoá ngay lần đầu"),
  ].join(""), { h: 260, accent: "#1a72f5" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#1a72f5" });

// ── Mockup 2: form đăng ký với ràng buộc mật khẩu mạnh ──
const m_register = browser("shopeasy.vn/dang-ky", [
  panel("ShopEasy · Đăng ký tài khoản", [
    field(24, 20, 330, "Họ tên", "Mai Trần", "normal"),
    field(372, 20, 330, "Email", "mai.tran@gmail.com", "error"),
    field(24, 92, 330, "Mật khẩu", "12345678", "error"),
    field(372, 92, 330, "Xác nhận mật khẩu", "12345678", "error"),
    btn(24, 168, 200, "Đăng ký", "primary"),
    annotate(20, 84, 330, 62, "ÂM: mật khẩu chỉ toàn số, thiếu chữ hoa/ký tự đặc biệt"),
    annotate(368, 12, 330, 62, "ÂM: email 'mai.tran@gmail.com' đã tồn tại trong hệ thống"),
  ].join(""), { h: 260, accent: "#16a34a" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#16a34a" });

// ── Mockup 3: bảng ca kiểm thử đăng nhập ──
const m_cases = grid("Bảng ca kiểm thử đăng nhập ShopEasy", ["Ca kiểm thử", "Dữ liệu nhập", "Kết quả mong đợi"], [
  ["Đăng nhập đúng", "Email đúng + mật khẩu đúng", "Vào trang chủ, hiện tên người dùng"],
  ["Sai mật khẩu 1 lần", "Email đúng + mật khẩu sai", "Từ chối, báo lỗi chung, KHÔNG lộ email có tồn tại hay không"],
  ["Sai mật khẩu 5 lần liên tiếp", "Cùng email, 5 lần mật khẩu sai", "Tạm khoá tài khoản / yêu cầu CAPTCHA hoặc OTP"],
  ["Bỏ trống mật khẩu", "Email đúng, mật khẩu để trống", "Từ chối, báo 'vui lòng nhập mật khẩu'"],
  ["Ghi nhớ đăng nhập", "Tick 'Ghi nhớ đăng nhập', đóng rồi mở lại trình duyệt", "Vẫn đăng nhập, không cần nhập lại"],
  ["Đăng xuất", "Bấm 'Đăng xuất' rồi bấm nút Back", "Về màn đăng nhập, phiên cũ bị huỷ, Back không vào lại được"],
], { accent: "#1a72f5", note: "Mỗi ô nhập cần cả ca DƯƠNG (đăng nhập đúng) lẫn ca ÂM (sai mật khẩu, để trống, khoá tài khoản)." });

// ── Mockup 4: ticket Jira lỗi không khoá tài khoản sau nhiều lần sai ──
const m_jira = jira({
  key: "SE-11320", title: "Đăng nhập: nhập sai mật khẩu không giới hạn số lần, tài khoản không bị khoá",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Vào /dang-nhap 2) Nhập email hợp lệ 3) Nhập sai mật khẩu liên tục 20 lần 4) Quan sát phản hồi hệ thống"],
    ["Kết quả mong đợi", "Sau 5 lần sai, hệ thống tạm khoá tài khoản hoặc yêu cầu CAPTCHA/OTP"],
    ["Kết quả thực tế", "Hệ thống vẫn cho thử không giới hạn, không CAPTCHA, không khoá tài khoản"],
    ["Bằng chứng", "video-se11320.mp4, screenshot-thu-20-lan.png"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi liên quan đăng nhập/đăng ký ──
const m_kanban = kanban("Bảng theo dõi lỗi Authentication (ShopEasy · Sprint 16)", [
  { name: "New", cards: [
    { key: "SE-11320", title: "Không khoá tài khoản sau nhiều lần sai", sev: "Critical" },
    { key: "SE-11324", title: "Email đã tồn tại vẫn đăng ký được", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11301", title: "Phiên không hết hạn sau 24h không hoạt động", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11290", title: "Thông báo lỗi đăng nhập lộ email không tồn tại", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11275", title: "Ghi nhớ đăng nhập không hoạt động trên Safari", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard tỉ lệ pass/fail của bộ ca kiểm thử đăng nhập ──
const m_dash = dashboard("Kết quả bộ ca kiểm thử Authentication — Sprint 16", [
  { label: "Tổng ca kiểm thử", value: "32", sub: "đăng nhập + đăng ký", color: "#1a72f5" },
  { label: "Pass", value: "24", sub: "~75%", color: "#16a34a" },
  { label: "Fail (bug thật)", value: "8", sub: "~25%", color: "#e11d48" },
  { label: "Mức Critical/High", value: "3", sub: "khoá tài khoản, email trùng, phiên", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vì sao thông báo lỗi khi đăng nhập sai không nên nói rõ 'email không tồn tại' hay 'mật khẩu sai'?",
  "Why shouldn't a login error message reveal whether it's 'email not found' or 'wrong password'?",
  "Nếu hệ thống trả về hai thông báo khác nhau tuỳ vào lỗi nằm ở email hay mật khẩu, kẻ tấn công có thể dò ra danh sách email nào đã đăng ký trên hệ thống (user enumeration) chỉ bằng cách thử nhiều email khác nhau. Vì vậy một thông báo CHUNG như 'Email hoặc mật khẩu không đúng' vừa đủ thông tin cho người dùng thật, vừa không lộ dữ liệu nhạy cảm cho kẻ xấu. Đây là một ca kiểm thử bảo mật cơ bản mà tester nên luôn kiểm tra.",
  "If the system returns two different messages depending on whether the error is the email or the password, an attacker can figure out which emails are registered (user enumeration) just by trying many different emails. So a GENERIC message like 'Email or password is incorrect' gives real users enough information while not leaking sensitive data to attackers. This is a basic security test case every tester should always check.",
  "ログインエラーがなぜ『メールが存在しません』と『パスワードが違います』を区別して表示すべきでない？",
  "エラーがメール由来かパスワード由来かによって異なるメッセージを返すと、攻撃者は様々なメールアドレスを試すだけでどのメールが登録済みか（ユーザー列挙）を割り出せてしまいます。そのため『メールまたはパスワードが正しくありません』という共通メッセージにすれば、正規ユーザーには十分な情報を与えつつ、攻撃者に機密データを漏らしません。これはテスターが必ず確認すべき基本的なセキュリティテストケースです。");
const faq2 = FAQ(
  "Khoá tài khoản sau bao nhiêu lần đăng nhập sai là hợp lý?",
  "How many failed login attempts before locking an account is reasonable?",
  "Không có con số bắt buộc cho mọi hệ thống, nhưng phổ biến nhất là khoá tạm thời (vài phút tới vài chục phút) sau 5 lần sai liên tiếp, kèm CAPTCHA hoặc xác minh OTP thay vì khoá vĩnh viễn ngay lập tức — để tránh kẻ xấu lợi dụng việc khoá tài khoản của người khác (denial of service) chỉ bằng cách cố tình nhập sai nhiều lần. Với vai trò tester, việc cần kiểm chứng là: có giới hạn số lần thử hay không, và cách hệ thống phản hồi khi chạm ngưỡng.",
  "There's no mandatory number for every system, but the most common approach is a temporary lockout (a few minutes to tens of minutes) after 5 consecutive failed attempts, combined with a CAPTCHA or OTP verification instead of an immediate permanent lock — to prevent attackers from locking out other users (denial of service) just by deliberately entering wrong passwords repeatedly. As a tester, what you need to verify is whether there's a limit on attempts at all, and how the system responds once that threshold is hit.",
  "何回パスワードを間違えたらアカウントをロックするのが妥当？",
  "全システムに当てはまる必須の回数はありませんが、最も一般的なのは5回連続失敗後の一時的なロック（数分〜数十分）とCAPTCHAやOTP検証の組み合わせで、即座の永久ロックは避けます——攻撃者が意図的に何度も間違ったパスワードを入力するだけで他人のアカウントをロックさせる（サービス拒否攻撃）のを防ぐためです。テスターとして確認すべきは、試行回数の制限があるかどうかと、閾値に達した時のシステムの応答です。");
const faq3 = FAQ(
  "Phiên đăng nhập hết hạn (session expiry) cần kiểm thử những gì?",
  "What should be tested about session expiry?",
  "Cần kiểm tra ít nhất ba điều: (1) phiên tự hết hạn sau một khoảng thời gian không hoạt động hợp lý, và người dùng bị đưa về màn đăng nhập khi thao tác tiếp; (2) sau khi đăng xuất, phiên cũ thực sự bị huỷ ở server — bấm nút Back trên trình duyệt không được vào lại trang cần đăng nhập; (3) 'Ghi nhớ đăng nhập' phải khác với phiên thường về thời gian sống, nhưng vẫn cần hết hạn hoặc có cách thu hồi khi đổi mật khẩu.",
  "You should test at least three things: (1) the session automatically expires after a reasonable period of inactivity, and the user is redirected to the login screen on the next action; (2) after logging out, the old session is truly invalidated on the server — clicking the browser's Back button should not re-enter a page that requires login; (3) 'Remember me' must have a different lifetime than a normal session, but it should still expire or be revocable when the password changes.",
  "セッション期限切れ（session expiry）は何をテストすべき？",
  "少なくとも3点を確認する必要があります：（1）妥当な非活動時間の後にセッションが自動的に期限切れになり、次の操作時にログイン画面へ戻されるか、（2）ログアウト後に古いセッションがサーバー側で確実に無効化されているか——ブラウザの戻るボタンでログイン必須ページに再度入れてはいけない、（3）『ログイン状態を保持する』は通常セッションと有効期限が異なるべきだが、パスワード変更時には期限切れまたは失効できる必要がある。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Khi người dùng nhập sai mật khẩu, thông báo lỗi hợp lý nhất nên như thế nào?", en: "When a user enters the wrong password, what is the most reasonable error message?", ja: "ユーザーがパスワードを間違えた時、最も妥当なエラーメッセージはどれ？" },
    options: [
      { vi: "Nói rõ 'Mật khẩu sai' để người dùng biết chính xác lỗi ở đâu", en: "Clearly say 'Wrong password' so the user knows exactly where the error is", ja: "『パスワードが違います』と明確に伝え、ユーザーに正確な原因を知らせる" },
      { vi: "Thông báo chung 'Email hoặc mật khẩu không đúng', không phân biệt lỗi ở email hay mật khẩu", en: "A generic 'Email or password is incorrect' message, not distinguishing whether the error is in the email or password", ja: "『メールまたはパスワードが正しくありません』という共通メッセージで、原因を区別しない" },
      { vi: "Không hiện thông báo gì cả", en: "Show no message at all", ja: "何も表示しない" },
      { vi: "Nói rõ 'Email này chưa đăng ký'", en: "Clearly say 'This email is not registered'", ja: "『このメールは未登録です』と明確に伝える" },
    ], correct: 1,
    explain: { vi: "Thông báo chung tránh lộ thông tin email nào đã đăng ký (user enumeration) cho kẻ tấn công.", en: "A generic message avoids revealing which emails are registered (user enumeration) to attackers.", ja: "共通メッセージは、どのメールが登録済みかを攻撃者に漏らす（ユーザー列挙）ことを防ぎます。" },
  }),
  mcq({
    q: { vi: "Vì sao cần có ca kiểm thử 'khoá tài khoản sau nhiều lần đăng nhập sai'?", en: "Why do we need a test case for 'locking the account after many failed login attempts'?", ja: "『何度もログイン失敗後にアカウントをロックする』テストケースがなぜ必要？" },
    options: [
      { vi: "Để làm khó người dùng thật", en: "To make it hard for real users", ja: "正規ユーザーを困らせるため" },
      { vi: "Để chống dò mật khẩu tự động (brute force) bằng cách thử liên tục", en: "To prevent automated password guessing (brute force) via repeated attempts", ja: "連続試行による自動パスワード推測（ブルートフォース）を防ぐため" },
      { vi: "Để giảm tải cho server", en: "To reduce server load", ja: "サーバー負荷を減らすため" },
      { vi: "Vì luật pháp bắt buộc mọi trường hợp", en: "Because the law mandates it in every case", ja: "法律で全ケースにおいて義務付けられているため" },
    ], correct: 1,
    explain: { vi: "Không giới hạn số lần thử sai để lộ lỗ hổng brute force — kẻ tấn công có thể dò ra mật khẩu bằng script tự động.", en: "Not limiting failed attempts exposes a brute-force hole — attackers can guess passwords using automated scripts.", ja: "失敗試行数を制限しないとブルートフォースの穴が生まれ、攻撃者は自動スクリプトでパスワードを推測できます。" },
  }),
  mcq({
    q: { vi: "Đâu là một ca kiểm thử ÂM hợp lý cho ô 'Mật khẩu' khi đăng ký tài khoản?", en: "Which is a reasonable negative test case for the 'Password' field when registering?", ja: "アカウント登録時の『パスワード』項目に適切なネガティブケースはどれ？" },
    options: [
      { vi: "Nhập mật khẩu 'Mai@2024!' (đủ mạnh)", en: "Enter password 'Mai@2024!' (strong enough)", ja: "パスワード『Mai@2024!』を入力（十分に強い）" },
      { vi: "Nhập mật khẩu '12345678' (chỉ toàn số, không đủ ràng buộc mạnh)", en: "Enter password '12345678' (only digits, doesn't meet strength rules)", ja: "パスワード『12345678』を入力（数字のみで強度ルールを満たさない）" },
      { vi: "Nhập mật khẩu và xác nhận mật khẩu khớp nhau, đủ mạnh", en: "Enter a password and confirmation that match and are strong enough", ja: "パスワードと確認用パスワードが一致し、十分に強い場合" },
      { vi: "Không nhập gì vào ô Họ tên", en: "Enter nothing in the Name field", ja: "氏名欄に何も入力しない" },
    ], correct: 1,
    explain: { vi: "Mật khẩu chỉ toàn số là dữ liệu không đạt ràng buộc mạnh, dùng để kiểm tra hệ thống có từ chối đúng cách không.", en: "A digits-only password fails the strength rules; use it to check whether the system correctly rejects it.", ja: "数字のみのパスワードは強度ルールを満たさないため、システムが正しく拒否するか確認するのに使います。" },
  }),
  mcq({
    q: { vi: "Khi đăng ký bằng một email ĐÃ TỒN TẠI trong hệ thống, kết quả mong đợi là gì?", en: "When registering with an email that ALREADY EXISTS in the system, what is the expected result?", ja: "既に存在するメールで登録した時、期待される結果は？" },
    options: [
      { vi: "Hệ thống vẫn tạo thêm một tài khoản mới với cùng email đó", en: "The system still creates another new account with that same email", ja: "システムは同じメールで新しいアカウントを作成してしまう" },
      { vi: "Hệ thống từ chối đăng ký và báo email đã được sử dụng", en: "The system rejects the registration and reports the email is already in use", ja: "システムは登録を拒否し、メールは既に使用中だと表示する" },
      { vi: "Hệ thống tự động đăng nhập vào tài khoản cũ mà không hỏi mật khẩu", en: "The system automatically logs into the old account without asking for a password", ja: "システムはパスワードを尋ねずに古いアカウントへ自動ログインする" },
      { vi: "Hệ thống xoá tài khoản cũ và tạo tài khoản mới", en: "The system deletes the old account and creates a new one", ja: "システムは古いアカウントを削除し新しいものを作成する" },
    ], correct: 1,
    explain: { vi: "Email là khoá định danh duy nhất; hệ thống cần từ chối đăng ký trùng email và báo rõ để tránh tạo tài khoản trùng lặp.", en: "Email is a unique identifier; the system must reject a duplicate-email registration and clearly report it to avoid duplicate accounts.", ja: "メールは一意の識別子です。システムは重複メールの登録を拒否し明確に伝え、重複アカウントを防ぐ必要があります。" },
  }),
  mcq({
    q: { vi: "Sau khi bấm 'Đăng xuất' rồi bấm nút Back trên trình duyệt, kết quả mong đợi là gì?", en: "After clicking 'Log out' then clicking the browser's Back button, what is the expected result?", ja: "『ログアウト』をクリックした後、ブラウザの戻るボタンを押した時の期待結果は？" },
    options: [
      { vi: "Vẫn vào lại được trang cần đăng nhập như chưa hề đăng xuất", en: "The user can still re-enter the page requiring login as if never logged out", ja: "ログアウトしていないかのように、ログイン必須ページに再び入れてしまう" },
      { vi: "Bị đưa về màn đăng nhập vì phiên cũ đã bị huỷ ở server", en: "The user is redirected to the login screen because the old session was invalidated on the server", ja: "サーバー側で古いセッションが無効化されているため、ログイン画面に戻される" },
      { vi: "Trình duyệt bị treo", en: "The browser freezes", ja: "ブラウザがフリーズする" },
      { vi: "Tự động đăng nhập lại bằng tài khoản khác", en: "It automatically logs in with a different account", ja: "自動的に別のアカウントでログインし直す" },
    ], correct: 1,
    explain: { vi: "Đăng xuất đúng cách phải huỷ phiên ở server, không chỉ xoá dữ liệu ở trình duyệt — Back không được phép vào lại trang cần đăng nhập.", en: "A correct logout must invalidate the session on the server, not just clear browser data — Back must not re-enter a page requiring login.", ja: "正しいログアウトはブラウザのデータを消すだけでなくサーバー側でセッションを無効化する必要があり、戻るボタンでログイン必須ページに再入場できてはいけません。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử đăng nhập (authentication testing) là kiểm tra toàn bộ hành vi của form đăng nhập/đăng ký: mật khẩu đúng/sai, khoá tài khoản sau nhiều lần sai, ghi nhớ đăng nhập, ràng buộc mật khẩu mạnh, email đã tồn tại, đăng xuất và phiên hết hạn. Bài này bám form đăng nhập/đăng ký thật của app TMĐT ShopEasy: bạn học cách nghĩ ra ca kiểm thử, phát hiện lỗ hổng bảo mật cơ bản (không khoá tài khoản, lộ email tồn tại), và kiểm tra phiên đăng nhập đúng cách. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Authentication testing is checking the entire behavior of a login/signup form: correct/wrong password, account lockout after many failed attempts, remember-me, strong password rules, duplicate email, logout, and session expiry. This follows ShopEasy's real login/signup form: you'll learn to think up test cases, spot basic security holes (no account lockout, leaked email existence), and verify sessions correctly. Lots of visuals and a quiz at the end.",
        "認証テスト（authentication testing）とは、ログイン/登録フォームの挙動全体——正しい/誤ったパスワード、何度も失敗した後のアカウントロック、ログイン状態の保持、強力なパスワードのルール、重複メール、ログアウト、セッション期限切れ——を確認することです。本記事はECアプリShopEasyの実際のログイン/登録フォームに沿い、テストケースの考え方、基本的なセキュリティの穴（アカウントロックがない、メールの存在が漏れる）の発見、セッションの正しい検証方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Form đăng nhập trông có vẻ đơn giản chỉ với hai ô 'Email' và 'Mật khẩu', nhưng đây lại là một trong những nơi TẬP TRUNG NHIỀU RỦI RO nhất của một ứng dụng: nếu kiểm thử sơ sài, kẻ xấu có thể dò mật khẩu người khác, tạo tài khoản trùng, hoặc chiếm phiên đăng nhập của người dùng thật. Kiểm thử đăng nhập không chỉ là gõ đúng email/mật khẩu rồi xem có vào được không — nó còn bao gồm việc test đăng nhập sai nhiều lần, ghi nhớ đăng nhập, ràng buộc mật khẩu khi đăng ký, email trùng, đăng xuất và phiên hết hạn. Chúng ta sẽ học qua form thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! A login form looks simple with just an 'Email' and a 'Password' field, but it's actually one of the places where the MOST RISK concentrates in an application: if tested carelessly, attackers can guess other users' passwords, create duplicate accounts, or hijack a real user's session. Testing login isn't just typing the correct email/password and seeing if you get in — it also covers testing repeated wrong logins, remember-me, password strength rules at signup, duplicate emails, logout, and session expiry. We'll learn through ShopEasy's real form, with visuals and hands-on practice.",
        "こんにちは、初心者さん！ログインフォームは『メール』と『パスワード』の2項目だけで一見シンプルですが、実はアプリの中で最もリスクが集中する場所の一つです：テストが甘いと、攻撃者は他人のパスワードを推測したり、重複アカウントを作成したり、正規ユーザーのセッションを乗っ取ったりできます。ログインテストとは正しいメール/パスワードを入力して入れるか見るだけではなく、繰り返しの誤ログイン、ログイン状態の保持、登録時のパスワード強度ルール、重複メール、ログアウト、セッション期限切れのテストも含みます。実際のShopEasyフォームを通じて、図と実習付きで学びます。"),
      IMG(m_login, "Màn hình test: form đăng nhập ShopEasy với mật khẩu sai", "Screen under test: ShopEasy login form with a wrong password", "テスト対象画面：パスワードが間違っているShopEasyログインフォーム"),
      DEF("Authentication Testing", "kiểm thử toàn bộ luồng xác thực người dùng: đăng nhập, đăng ký, đăng xuất, khoá tài khoản, và quản lý phiên (session).",
        "testing the entire user authentication flow: login, signup, logout, account lockout, and session management.",
        "ログイン、登録、ログアウト、アカウントロック、セッション管理を含むユーザー認証フロー全体をテストする手法。"),
    ] },
  { heading: { vi: "2. Ca kiểm thử đăng nhập: mật khẩu đúng vs sai", en: "2. Login test cases: correct vs wrong password", ja: "2. ログインテストケース：正しい/誤ったパスワード" },
    blocks: [
      P("Với ô 'Mật khẩu', cách dễ nhớ nhất là luôn nghĩ theo cặp: một ca DƯƠNG (mật khẩu đúng, phải vào được) và ít nhất một ca ÂM (mật khẩu sai, phải bị từ chối kèm thông báo rõ ràng nhưng không lộ thông tin nhạy cảm). Đây là nền tảng để mở rộng ra các ca phức tạp hơn như sai nhiều lần liên tiếp hay để trống ô nhập.",
        "For the 'Password' field, the easiest way to remember is to always think in pairs: one POSITIVE case (correct password, must succeed) and at least one NEGATIVE case (wrong password, must be rejected with a clear message that doesn't leak sensitive information). This is the foundation for expanding into more complex cases like repeated failures or a blank field.",
        "『パスワード』項目については、常にペアで考えるのが一番覚えやすい方法です：ポジティブケース（正しいパスワード、成功すべき）と、少なくとも1つのネガティブケース（誤ったパスワード、機密情報を漏らさない明確なメッセージで拒否されるべき）。これはより複雑なケース（連続失敗や空欄）に発展させる基盤です。"),
      IMG(m_cases, "Bảng ca kiểm thử đăng nhập trên form ShopEasy", "Table of login test cases on the ShopEasy form", "ShopEasyフォームにおけるログインテストケース表"),
      P("Nhiều bạn mới chỉ test một ca 'sai mật khẩu' rồi dừng lại. Thực tế bạn cần thử thêm: sai mật khẩu nhưng đúng email, đúng mật khẩu nhưng sai email, cả hai đều sai, để trống một trong hai ô, và mật khẩu đúng nhưng viết hoa/thường khác nhau (case-sensitive). Mỗi biến thể có thể lộ ra một cách xử lý khác nhau ở server mà bạn không ngờ tới.",
        "Many beginners test only one 'wrong password' case and stop there. In reality you should also try: wrong password with correct email, correct password with wrong email, both wrong, leaving one field blank, and a correct password typed with different letter casing (case-sensitive). Each variant can reveal a different, unexpected server-side handling.",
        "多くの初心者は『誤ったパスワード』のケースを1つだけテストして止まります。実際には、正しいメールで誤ったパスワード、誤ったメールで正しいパスワード、両方とも誤り、どちらかを空欄にする、正しいパスワードだが大文字小文字が異なる（大文字小文字を区別する）場合も試すべきです。各バリエーションが予想外のサーバー側処理を明らかにすることがあります。"),
      DEF("Case-sensitive Password", "mật khẩu phân biệt chữ hoa/chữ thường — 'Mai@2024' và 'mai@2024' phải được xem là hai mật khẩu khác nhau.",
        "a password that distinguishes uppercase/lowercase — 'Mai@2024' and 'mai@2024' must be treated as two different passwords.",
        "大文字と小文字を区別するパスワード——『Mai@2024』と『mai@2024』は異なる2つのパスワードとして扱われるべき。"),
    ] },
  { heading: { vi: "3. Khoá tài khoản & chống dò mật khẩu (brute force)", en: "3. Account lockout & preventing brute force", ja: "3. アカウントロックとブルートフォース対策" },
    blocks: [
      P("Khoá tài khoản (account lockout) là cơ chế bảo vệ: sau một số lần đăng nhập sai liên tiếp, hệ thống tạm thời chặn thử tiếp — hoặc yêu cầu CAPTCHA/OTP — để ngăn kẻ tấn công dùng script tự động thử hàng nghìn mật khẩu trong vài giây (tấn công brute force). Với vai trò tester, bạn cần xác nhận cơ chế này TỒN TẠI và HOẠT ĐỘNG ĐÚNG, chứ không chỉ tin vào tài liệu thiết kế.",
        "Account lockout is a protection mechanism: after a number of consecutive failed login attempts, the system temporarily blocks further attempts — or requires a CAPTCHA/OTP — to prevent an attacker from using an automated script to try thousands of passwords in seconds (a brute-force attack). As a tester, you need to confirm this mechanism EXISTS and WORKS CORRECTLY, not just trust the design document.",
        "アカウントロックは保護メカニズムです：一定回数連続してログインに失敗した後、システムは一時的にそれ以上の試行をブロックするか、CAPTCHA/OTPを要求し、攻撃者が自動スクリプトで数秒間に何千ものパスワードを試す（ブルートフォース攻撃）のを防ぎます。テスターとして、この仕組みが存在し正しく動作することを確認する必要があり、設計書を信じるだけでは不十分です。"),
      P("Một điểm dễ bị bỏ sót: khoá tài khoản cần có THỜI GIAN MỞ KHOÁ hợp lý hoặc cách xác minh lại (OTP, email reset), tránh khoá vĩnh viễn khiến người dùng thật mất quyền truy cập oan. Đồng thời, kẻ tấn công không nên có cách khoá tài khoản của người khác chỉ bằng cách cố tình nhập sai liên tục — đây được gọi là rủi ro từ chối dịch vụ (denial of service) qua cơ chế khoá tài khoản, cũng là một góc cần cân nhắc khi test.",
        "An easily missed point: account lockout needs a reasonable UNLOCK TIME or a re-verification method (OTP, password reset email), avoiding a permanent lock that unfairly denies a real user access. At the same time, an attacker shouldn't be able to lock someone else's account just by deliberately entering wrong passwords repeatedly — this is a denial-of-service risk via the lockout mechanism, another angle worth considering when testing.",
        "見落としがちなポイント：アカウントロックには妥当なロック解除時間や再認証方法（OTP、パスワードリセットメール）が必要で、正規ユーザーが不当にアクセスを失う永久ロックは避けるべきです。同時に、攻撃者が意図的に何度も誤入力するだけで他人のアカウントをロックできてはいけません——これはロック機構によるサービス拒否（denial of service）のリスクであり、テスト時に考慮すべき別の観点です。"),
      TIP("Khi test khoá tài khoản, luôn thử cả hai chiều: (1) đủ số lần sai để bị khoá, và (2) sau khi khoá, đăng nhập ĐÚNG mật khẩu vẫn phải bị từ chối cho tới khi hết thời gian khoá.", "When testing account lockout, always try both directions: (1) enough failed attempts to get locked, and (2) after being locked, logging in with the CORRECT password must still be rejected until the lockout period ends.", "アカウントロックをテストする時は必ず両方向を試そう：（1）ロックされるのに十分な失敗回数、（2）ロック後は正しいパスワードでログインしてもロック期間が終わるまで拒否されること。"),
      DEF("Brute Force Attack", "kiểu tấn công thử hàng loạt mật khẩu (thường bằng script tự động) cho tới khi trúng mật khẩu đúng.",
        "an attack that tries a large number of passwords (usually via an automated script) until the correct one is found.",
        "正しいパスワードが見つかるまで（通常は自動スクリプトで）大量のパスワードを試す攻撃手法。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: kỹ thuật nghĩ ca kiểm thử đăng nhập/đăng ký", en: "4. Prepare: techniques for login/signup test cases", ja: "4. 準備：ログイン/登録のテストケースを考える技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần một danh sách 'góc cần kiểm tra' để không bỏ sót khi nghĩ ca kiểm thử cho form đăng nhập/đăng ký bất kỳ.",
        "You don't need special tools — just a checklist of 'angles to check' so you don't miss anything when thinking up test cases for any login/signup form.",
        "特別なツールは不要です——どんなログイン/登録フォームに対してもケースを漏れなく考えるための『確認すべき観点』チェックリストがあれば十分です。"),
      STEP(1, "Mở form đăng nhập/đăng ký cần test (ví dụ form ShopEasy); liệt kê từng ô nhập và nút bấm.", "Open the login/signup form to test (e.g. ShopEasy's form); list each input field and button.", "テストするログイン/登録フォーム（例：ShopEasyフォーム）を開き、各入力項目とボタンを列挙する。"),
      STEP(2, "Với đăng nhập: thử đúng/sai mật khẩu, sai nhiều lần liên tiếp, để trống, ghi nhớ đăng nhập.", "For login: try correct/wrong password, repeated failures, blank fields, remember-me.", "ログインについて：正しい/誤ったパスワード、連続失敗、空欄、ログイン状態の保持を試す。"),
      STEP(3, "Với đăng ký: thử email đã tồn tại, mật khẩu không đủ ràng buộc mạnh, xác nhận mật khẩu không khớp.", "For signup: try an existing email, a password that fails strength rules, mismatched confirmation.", "登録について：既存メール、強度ルールを満たさないパスワード、確認用パスワード不一致を試す。"),
      TRY("Mở một app bạn hay dùng, thử đăng nhập sai mật khẩu 2-3 lần và quan sát: hệ thống có cảnh báo gì không, thông báo lỗi có lộ thông tin thừa không?", "Open an app you use often, try logging in with the wrong password 2-3 times and observe: does the system give any warning, does the error message leak extra information?", "普段使っているアプリを開き、間違ったパスワードで2〜3回ログインを試し観察しよう：システムは何か警告するか、エラーメッセージは余計な情報を漏らしていないか？"),
      PITFALL("Nghĩ rằng kiểm thử đăng nhập chỉ cần 1 ca 'đăng nhập đúng' và 1 ca 'đăng nhập sai' là đủ. Thực tế cần bao phủ cả khoá tài khoản, ghi nhớ đăng nhập, đăng xuất và phiên hết hạn — đây là những góc hay bị bỏ sót nhất.", "Thinking login testing only needs 1 'correct login' case and 1 'wrong login' case. In reality it must cover account lockout, remember-me, logout, and session expiry too — these are the most commonly missed angles.", "ログインテストには『正しいログイン』と『誤ったログイン』のケースが1つずつあれば十分だと考えること。実際にはアカウントロック、ログイン状態の保持、ログアウト、セッション期限切れもカバーする必要があります——これらは最も見落とされがちな観点です。"),
      IMG(m_register, "Màn hình test: form đăng ký ShopEasy với mật khẩu yếu và email đã tồn tại", "Screen under test: ShopEasy signup form with a weak password and an existing email", "テスト対象画面：弱いパスワードと既存メールがあるShopEasy登録フォーム"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử mật khẩu mạnh khi đăng ký (thực hành)", en: "5. Writing strong-password test cases for signup (hands-on)", ja: "5. 登録時の強力なパスワードのテストケースを書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào ô 'Mật khẩu' trong form đăng ký ShopEasy — nơi có quy tắc: tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ cho ràng buộc này.",
        "Now let's apply it for real to the 'Password' field in ShopEasy's signup form — which has the rule: at least 8 characters, at least 1 uppercase letter, 1 digit, and 1 special character. Follow the order below to get a full set of test cases for this constraint.",
        "では、ShopEasyの登録フォームにある『パスワード』項目に実際に適用しましょう——ルールは最低8文字、大文字1つ以上、数字1つ以上、特殊文字1つ以上です。以下の順に沿って、この制約に対する完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca dương chuẩn trước: 'Mai@2024' (8 ký tự, có chữ hoa, số, ký tự đặc biệt) để có mốc so sánh.", "First define the standard positive case: 'Mai@2024' (8 characters, has uppercase, digit, special character) as a comparison baseline.", "まず標準的なポジティブケースを定義：『Mai@2024』（8文字、大文字・数字・特殊文字を含む）を比較基準とする。"),
      STEP(2, "Áp từng ràng buộc riêng lẻ: thiếu chữ hoa ('mai@2024'), thiếu số ('Mai@abcd'), thiếu ký tự đặc biệt ('Mai20240'), ngắn hơn 8 ký tự ('Mai@20').", "Apply each rule individually: missing uppercase ('mai@2024'), missing digit ('Mai@abcd'), missing special character ('Mai20240'), shorter than 8 characters ('Mai@20').", "各ルールを個別に適用：大文字なし（『mai@2024』）、数字なし（『Mai@abcd』）、特殊文字なし（『Mai20240』）、8文字未満（『Mai@20』）。"),
      STEP(3, "Với mỗi ca, ghi Expected (hệ thống từ chối + chỉ rõ ràng buộc còn thiếu) và Actual (điều thực sự xảy ra) riêng biệt.", "For each case, write Expected (system rejects + points out the missing rule) and Actual (what actually happens) separately.", "各ケースでExpected（システムが拒否し不足しているルールを明示）とActual（実際に起きたこと）を別々に記録する。"),
      STEP(4, "Thử thêm ca 'Xác nhận mật khẩu' không khớp với 'Mật khẩu' dù cả hai đều đủ mạnh riêng lẻ.", "Also try a 'Confirm password' case that doesn't match 'Password', even though both are individually strong enough.", "『確認用パスワード』が『パスワード』と一致しないケースも試そう。両方とも個別には十分強くても。"),
      CODE("text", "BO CA KIEM THU AM - o 'Mat khau' (dang ky ShopEasy, quy tac 8 ky tu + hoa + so + dac biet)\nCa 1: 'mai@2024' (thieu chu hoa)     | Expected: tu choi, bao 'can it nhat 1 chu hoa' | Actual: tu choi dung\nCa 2: 'Mai@abcd' (thieu chu so)      | Expected: tu choi, bao 'can it nhat 1 chu so'  | Actual: tu choi dung\nCa 3: 'Mai20240' (thieu ky tu dac biet) | Expected: tu choi | Actual: CHAP NHAN (BUG)\nCa 4: 'Mai@20' (chi 6 ky tu)          | Expected: tu choi, bao 'toi thieu 8 ky tu'     | Actual: tu choi dung"),
      TRY("Viết thêm 1 ca kiểm thử nữa cho ô 'Mật khẩu' mà bảng trên chưa có (gợi ý: mật khẩu chứa khoảng trắng, hoặc mật khẩu trùng với email).", "Write one more test case for 'Password' not in the table above (hint: a password containing spaces, or a password identical to the email).", "上の表にない『パスワード』のテストケースをもう1つ書こう（ヒント：スペースを含むパスワード、またはメールと同じパスワード）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: không khoá tài khoản sau nhiều lần sai", en: "6. Situation 1: no lockout after many failed attempts", ja: "6. シーン1：何度も失敗してもアカウントがロックされない" },
    blocks: [
      SITUATION("Đội chỉ test 1 ca 'đăng nhập sai mật khẩu' — pass, thông báo lỗi hiện đúng, mọi người yên tâm release.", "The team only tests 1 'wrong password login' case — it passes, the error message shows correctly, everyone feels safe to release.",
        "Một nhà nghiên cứu bảo mật độc lập báo rằng có thể thử sai mật khẩu KHÔNG GIỚI HẠN số lần trên form đăng nhập ShopEasy — dùng script tự động dò được mật khẩu yếu của một tài khoản thật chỉ trong vài phút.",
        "An independent security researcher reports that they can try wrong passwords an UNLIMITED number of times on ShopEasy's login form — using an automated script, they guessed a real account's weak password in just a few minutes.",
        "チームは『パスワード誤入力』ケースを1つだけテスト——合格、エラーメッセージも正しく表示、安心してリリース。",
        "独立系セキュリティ研究者が、ShopEasyのログインフォームでパスワードの誤入力回数に制限がないと報告——自動スクリプトを使い、実際のアカウントの弱いパスワードをわずか数分で推測できた。"),
      SOLVE("Bổ sung ngay ca kiểm thử 'nhiều lần sai liên tiếp' vào bộ hồi quy, yêu cầu backend thêm giới hạn số lần thử (ví dụ khoá 15 phút sau 5 lần sai) kèm CAPTCHA, và kiểm tra lại rằng đăng nhập ĐÚNG mật khẩu trong lúc bị khoá vẫn phải bị từ chối.", "Immediately add a 'repeated consecutive failures' test case to the regression suite, require the backend to add an attempt limit (e.g. lock for 15 minutes after 5 failures) with CAPTCHA, and re-verify that logging in with the CORRECT password while locked is still rejected.", "『連続失敗』テストケースを即座に回帰テストスイートに追加し、バックエンドに試行回数制限（例：5回失敗後15分ロック）とCAPTCHAを要求し、ロック中は正しいパスワードでログインしても拒否されることを再確認する。"),
      P("Đây là bài học lớn nhất trong chương này: 'ca đăng nhập sai pass' KHÔNG có nghĩa là hệ thống an toàn. Nó chỉ nói lên rằng thông báo lỗi hiển thị đúng, chứ chưa kiểm tra liệu hệ thống có giới hạn số lần thử hay không. Với các form đăng nhập, luôn hỏi thêm: 'Điều gì xảy ra nếu tôi thử LIÊN TỤC?' — đó là câu hỏi phân biệt một tester cẩn thận với một tester chỉ test bề mặt.",
        "This is the biggest lesson in this chapter: a 'wrong login case passing' does NOT mean the system is safe. It only means the error message displays correctly — it hasn't verified whether the system limits the number of attempts. For login forms, always ask further: 'What happens if I try REPEATEDLY?' — that question separates a careful tester from one who only tests the surface.",
        "この章での最大の教訓です：『誤ログインケースが合格』はシステムが安全であることを意味しません。エラーメッセージが正しく表示されるというだけで、試行回数を制限しているかは未検証です。ログインフォームでは常にさらに問いましょう：『繰り返し試したらどうなるか？』——この問いが、表面だけをテストするテスターと注意深いテスターを分けます。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử 'không khoá tài khoản sau nhiều lần sai'", "A bug ticket found via the 'no lockout after many failed attempts' test case", "『何度も失敗してもロックされない』テストケースで見つかったバグチケット"),
      RECAP(["'Ca sai mật khẩu pass' KHÔNG đồng nghĩa hệ thống an toàn khỏi brute force", "Luôn test thêm: nhiều lần sai liên tiếp, và đăng nhập đúng lúc đang bị khoá"],
        ["A passing 'wrong password' case does NOT mean the system is safe from brute force", "Always also test: repeated consecutive failures, and a correct login attempt while locked"],
        ["『誤ったパスワードケースが合格』はブルートフォースに対して安全であることを意味しない", "常に追加テストする：連続失敗、そしてロック中の正しいログイン試行"]),
    ] },
  { heading: { vi: "7. Tình huống 2: email đã tồn tại vẫn cho đăng ký", en: "7. Situation 2: an existing email is still allowed to register", ja: "7. シーン2：既存のメールでも登録できてしまう" },
    blocks: [
      SITUATION("Bạn thử đăng ký tài khoản mới bằng chính email 'mai.tran@gmail.com' đã có sẵn trong hệ thống, chỉ để xem điều gì xảy ra.", "You try registering a new account using the email 'mai.tran@gmail.com', which already exists in the system, just to see what happens.",
        "Hệ thống không chặn, vẫn tạo thêm một tài khoản mới với cùng email đó — giờ có 2 tài khoản khác nhau dùng chung 1 email, gây lỗi khi đăng nhập (không rõ đăng nhập vào tài khoản nào) và lỗi gửi email xác nhận đơn hàng.",
        "The system doesn't block it and still creates another new account with that same email — now there are 2 different accounts sharing 1 email, causing login errors (unclear which account you're logging into) and order-confirmation email errors.",
        "既に存在する『mai.tran@gmail.com』というメールで新しいアカウントを登録してみて何が起きるか確認。",
        "システムはブロックせず同じメールで新しいアカウントを作成してしまう——今や1つのメールを共有する2つの異なるアカウントが存在し、ログイン時のエラー（どちらのアカウントにログインするか不明）や注文確認メールのエラーを引き起こす。"),
      SOLVE("Báo bug High/Critical ngay (ảnh hưởng toàn bộ luồng xác thực), đề xuất ràng buộc email UNIQUE ở tầng database lẫn kiểm tra trước khi tạo tài khoản ở server, và bổ sung ca kiểm thử này vào bộ hồi quy để không tái phát.", "Report it as a High/Critical bug immediately (affects the entire authentication flow), propose a UNIQUE email constraint at the database layer plus a server-side check before creating the account, and add this test case to the regression suite to prevent recurrence.", "即座にHigh/Criticalバグとして報告（認証フロー全体に影響）し、データベース層でのメールUNIQUE制約とアカウント作成前のサーバー側チェックを提案し、再発防止のためこのテストケースを回帰テストスイートに追加する。"),
      P("Ví dụ này cho thấy vì sao 'email đã tồn tại' là một trong những ca kiểm thử KHÔNG THỂ BỎ QUA khi test đăng ký. Email thường đóng vai trò khoá định danh duy nhất (unique key) của tài khoản — nếu ràng buộc này bị hở, hậu quả không chỉ dừng ở giao diện mà lan sang cả luồng đăng nhập, gửi thông báo, và khôi phục mật khẩu.",
        "This example shows why 'existing email' is one of the test cases you CANNOT skip when testing signup. Email usually serves as an account's unique key — if this constraint has a hole, the consequences don't stop at the UI but spread into login, notifications, and password recovery.",
        "この例は、登録テストにおいて『既存メール』が省略できないテストケースの1つである理由を示しています。メールは通常アカウントの一意キーとして機能します——この制約に穴があると、影響はUIだけに留まらず、ログイン、通知、パスワード復旧にまで広がります。"),
      TRY("Nghĩ thêm một tình huống khác liên quan tới 'định danh duy nhất' trong app bạn dùng (số điện thoại, username...) và đề xuất 1 ca kiểm thử cho nó.", "Think of another 'unique identifier' situation in an app you use (phone number, username...) and propose one test case for it.", "使っているアプリの別の『一意識別子』に関する状況（電話番号、ユーザー名など）を考え、テストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Ghi nhớ đăng nhập, đăng xuất & phiên hết hạn", en: "8. Remember me, logout & session expiry", ja: "8. ログイン状態の保持、ログアウトとセッション期限切れ" },
    blocks: [
      P("'Ghi nhớ đăng nhập' (Remember me) giúp người dùng không phải nhập lại mật khẩu mỗi lần mở app, nhưng cần test kỹ vì nó liên quan trực tiếp tới bảo mật: phiên ghi nhớ nên có thời gian sống dài hơn phiên thường (ví dụ 30 ngày thay vì vài giờ) nhưng vẫn phải hết hạn hoặc bị thu hồi khi người dùng đổi mật khẩu — nếu không, kẻ chiếm được thiết bị cũ vẫn có thể truy cập vô thời hạn dù chủ tài khoản đã đổi mật khẩu.",
        "'Remember me' helps users avoid re-entering their password every time they open the app, but it needs careful testing because it directly relates to security: a remembered session should have a longer lifetime than a normal one (e.g. 30 days instead of a few hours) but still expire or be revoked when the user changes their password — otherwise, whoever gets hold of an old device can still access it indefinitely even after the account owner changes their password.",
        "『ログイン状態を保持する』はアプリを開くたびにパスワードを再入力しなくて済むようにするものですが、セキュリティに直結するため慎重にテストする必要があります：保持されたセッションは通常のセッションより長い有効期限（数時間ではなく例えば30日）を持つべきですが、ユーザーがパスワードを変更した時には期限切れまたは失効する必要があります——そうでなければ、古い端末を手に入れた人が、アカウント所有者がパスワードを変更した後も無期限にアクセスできてしまいます。"),
      P("Đăng xuất (logout) tưởng đơn giản nhưng lỗi phổ biến nhất là chỉ xoá dữ liệu ở phía trình duyệt (cookie/local storage) mà quên huỷ phiên ở server. Ca kiểm thử bắt buộc: sau khi đăng xuất, bấm nút Back trên trình duyệt KHÔNG được vào lại trang cần đăng nhập; mở lại app bằng đường link cũ đã lưu cũng phải bị đưa về màn đăng nhập. Phiên hết hạn (session expiry) cũng cần test: để app không thao tác trong một khoảng thời gian dài, sau đó thao tác tiếp phải bị yêu cầu đăng nhập lại.",
        "Logout looks simple, but the most common bug is only clearing browser-side data (cookies/local storage) while forgetting to invalidate the session on the server. Required test case: after logging out, clicking the browser's Back button must NOT re-enter a page requiring login; reopening the app via an old saved link must also redirect to the login screen. Session expiry also needs testing: leave the app idle for a long period, then the next action must require logging in again.",
        "ログアウトは単純に見えますが、最も一般的なバグはブラウザ側のデータ（クッキー/ローカルストレージ）を消すだけでサーバー側のセッション無効化を忘れることです。必須のテストケース：ログアウト後にブラウザの戻るボタンを押してもログイン必須ページに再入場できてはいけない、保存済みの古いリンクでアプリを再度開いてもログイン画面に戻されるべき。セッション期限切れもテストが必要です：長時間アプリを操作せず放置し、その後の操作で再ログインを要求されるべきです。"),
      IMG(m_kanban, "Bảng theo dõi lỗi Authentication (ShopEasy · Sprint 16)", "A board tracking authentication bugs (ShopEasy · Sprint 16)", "認証関連バグの追跡ボード（ShopEasy・スプリント16）"),
      IMG(m_dash, "Kết quả bộ ca kiểm thử Authentication — phần lớn lỗi Critical/High nằm ở khoá tài khoản, email trùng và phiên", "Results of the authentication test suite — most Critical/High bugs are in account lockout, duplicate email, and sessions", "認証テストスイートの結果——重大/高優先度バグの大半はアカウントロック、重複メール、セッションに関するもの"),
      TIP("Ưu tiên viết ca kiểm thử cho các góc BẢO MẬT (khoá tài khoản, email trùng, phiên) trước — đó là nơi một lỗ hổng gây thiệt hại lớn nhất cho người dùng thật.", "Prioritize writing test cases for SECURITY angles (account lockout, duplicate email, sessions) first — that's where a hole causes the most damage to real users.", "セキュリティの観点（アカウントロック、重複メール、セッション）のテストケースを最優先で書こう——穴があると実際のユーザーに最も大きな被害を与える場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi kiểm thử đăng nhập/đăng ký. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing login/signup. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はログイン/登録テストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ test 'đăng nhập đúng' và 'đăng nhập sai 1 lần', bỏ quên khoá tài khoản, phiên hết hạn, và đăng xuất — những góc mà lỗi thường ẩn sâu nhất.", "Only testing 'correct login' and 'one wrong login', forgetting account lockout, session expiry, and logout — the angles where bugs most often hide deep.", "『正しいログイン』と『1回の誤ログイン』だけをテストし、アカウントロック、セッション期限切れ、ログアウトを忘れる——バグが最も深く隠れがちな観点です。"),
      PITFALL("Coi thông báo lỗi 'Email không tồn tại' là bình thường, không nhận ra đây là lỗ hổng bảo mật (lộ thông tin email đã đăng ký cho kẻ tấn công dò).", "Treating the 'Email does not exist' error message as normal, not realizing it's a security hole (revealing registered emails for attackers to enumerate).", "『メールが存在しません』というエラーメッセージを普通だと思い込み、それがセキュリティの穴（攻撃者が列挙できるよう登録済みメールを漏らす）だと気づかない。"),
      TIP("Trước khi báo một ca đăng nhập/đăng ký là bug, tự hỏi: 'Nếu tôi là kẻ tấn công, tôi có thể lợi dụng hành vi này để làm gì?' — cách nghĩ này giúp phát hiện lỗ hổng mà ca kiểm thử chức năng thông thường bỏ sót.", "Before reporting a login/signup case as a bug, ask yourself: 'If I were an attacker, what could I exploit this behavior for?' — this mindset helps uncover holes that ordinary functional test cases miss.", "ログイン/登録ケースをバグとして報告する前に自問しよう：『自分が攻撃者だったら、この挙動を何に悪用できるか？』——この考え方は通常の機能テストケースが見逃す穴を発見するのに役立ちます。"),
      IMG(m_register, "Nhắc lại: form đăng ký cần kiểm tra cả ràng buộc mật khẩu mạnh lẫn email trùng", "Reminder: a signup form needs checking for both strong-password rules and duplicate email", "再確認：登録フォームは強力なパスワードのルールと重複メールの両方を確認する必要がある"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử đăng nhập & đăng ký qua form thật của ShopEasy: ca dương/âm cho mật khẩu, khoá tài khoản chống brute force, ràng buộc mật khẩu mạnh khi đăng ký, và hai tình huống thật cho thấy chỉ test bề mặt dễ bỏ sót lỗ hổng nghiêm trọng (không khoá tài khoản, email trùng vẫn được đăng ký). Bạn cũng biết cách kiểm tra ghi nhớ đăng nhập, đăng xuất và phiên hết hạn đúng cách. Đây là kỹ năng nền tảng giúp bạn phát hiện được cả lỗi chức năng lẫn lỗ hổng bảo mật cơ bản ngay từ khi mới bắt đầu.",
        "You just learned how to test login & signup through ShopEasy's real form: positive/negative cases for passwords, account lockout against brute force, strong password rules at signup, and two real situations showing that only surface-level testing easily misses serious holes (no account lockout, duplicate email still allowed to register). You also learned to properly verify remember-me, logout, and session expiry. This foundational skill helps you catch both functional bugs and basic security holes right from the start.",
        "ShopEasyの実際のフォームを通じて、ログイン＆登録のテスト方法を学びました：パスワードのポジティブ/ネガティブケース、ブルートフォース対策のアカウントロック、登録時の強力なパスワードのルール、そして表面的なテストだけでは重大な穴（アカウントロックなし、重複メールでも登録できる）を見逃しやすいことを示す2つの実例。ログイン状態の保持、ログアウト、セッション期限切れを正しく検証する方法も学びました。最初から機能的なバグと基本的なセキュリティの穴の両方を発見できる土台スキルです。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật kiểm thử âm (negative testing) một cách hệ thống hơn và cách viết bug report chuẩn để báo cáo những lỗ hổng bạn tìm được, đặc biệt là các lỗi liên quan tới bảo mật cần mức độ ưu tiên cao. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn negative testing techniques more systematically and how to write a proper bug report for the holes you find, especially security-related bugs that need high priority. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より体系的にネガティブテストの技法を学び、見つけた穴——特に高い優先度が必要なセキュリティ関連のバグ——を報告するための適切なバグレポートの書き方を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const DANGNHAP_01 = makeDoc({
  slug: "kiem-thu-dang-nhap-dang-ky-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử đăng nhập",
  keywords: ["kiểm thử đăng nhập", "authentication testing", "khoá tài khoản", "mật khẩu mạnh", "kiểm thử đăng ký cho người mới"],
  coverLabel: "NGƯỜI MỚI · ĐĂNG NHẬP · TMĐT",
  crumb: "Kiểm thử đăng nhập & đăng ký (Authentication Testing)",
  metaTitle: { vi: "Kiểm thử đăng nhập & đăng ký cho người mới", en: "Login & signup testing for beginners", ja: "初心者向けログイン・登録テスト" },
  metaDescription: {
    vi: "Kiểm thử đăng nhập & đăng ký cho người mới qua app ShopEasy: sai mật khẩu, khoá tài khoản, mật khẩu mạnh, email trùng, đăng xuất, có hình và trắc nghiệm.",
    en: "Login and signup testing for beginners through the ShopEasy app: wrong password, account lockout, strong passwords, duplicate email, logout, with visuals and a quiz.",
    ja: "初心者向けログイン・登録テスト：ShopEasyアプリで誤ったパスワード、アカウントロック、強力なパスワード、重複メール、ログアウトを図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử đăng nhập & đăng ký cho người mới: sai mật khẩu, khoá tài khoản, mật khẩu mạnh (có trắc nghiệm)",
    en: "Login & signup testing for beginners: wrong password, account lockout, strong passwords (with quiz)",
    ja: "初心者のためのログイン・登録テスト：誤ったパスワード、アカウントロック、強力なパスワード（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử đăng nhập và đăng ký qua app TMĐT ShopEasy. Ca dương/âm cho mật khẩu, khoá tài khoản chống brute force, ràng buộc mật khẩu mạnh, email đã tồn tại, ghi nhớ đăng nhập, đăng xuất và phiên hết hạn. Hai tình huống lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn login and signup testing through the ShopEasy e-commerce app. Positive/negative password cases, account lockout against brute force, strong password rules, existing email, remember-me, logout and session expiry. Two real bug situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでログインと登録のテストを学ぶ。パスワードのポジティブ/ネガティブケース、ブルートフォース対策のアカウントロック、強力なパスワードのルール、既存メール、ログイン状態の保持、ログアウトとセッション期限切れ。2つの実際のバグ事例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết ca kiểm thử đăng nhập/đăng ký", steps: [
    { name: "Liệt kê các ô nhập và nút bấm của form", text: "Email, mật khẩu, xác nhận mật khẩu, ghi nhớ đăng nhập." },
    { name: "Áp ca dương/âm và các góc bảo mật", text: "Sai mật khẩu, nhiều lần sai, email trùng, mật khẩu yếu." },
    { name: "Kiểm tra phiên: đăng xuất và hết hạn", text: "Đăng xuất phải huỷ phiên server; phiên phải tự hết hạn hợp lý." },
  ] },
  pages,
});

export const MB_DANGNHAP_01 = [DANGNHAP_01];
