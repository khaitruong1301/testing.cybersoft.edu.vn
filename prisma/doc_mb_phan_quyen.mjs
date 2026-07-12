// doc_mb_phan_quyen.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử phân quyền (Authorization) cơ bản — phân biệt authentication vs authorization,
// ma trận quyền theo vai trò (khách/thành viên/admin/nhân viên kho), truy cập URL không phép,
// ẩn/hiện nút theo quyền, thao tác vượt quyền qua API, leo thang đặc quyền cơ bản.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, postman } from "./ui_mock.mjs";

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

// ── Mockup 1: ma trận quyền theo vai trò trên ShopEasy ──
const m_matrix = grid("Ma trận quyền theo vai trò (ShopEasy)", ["Vai trò", "Xem sản phẩm", "Đặt hàng", "Xem đơn của mình", "Cập nhật tồn kho", "Quản lý người dùng"], [
  ["Khách (chưa đăng nhập)", "✓", "✗", "✗", "✗", "✗"],
  ["Thành viên", "✓", "✓", "✓", "✗", "✗"],
  ["Nhân viên kho", "✓", "✗", "✗", "✓", "✗"],
  ["Admin", "✓", "✓", "✓ (tất cả)", "✓", "✓"],
], { accent: "#0e7490", note: "Mỗi ô là 1 ca kiểm thử: vai trò X có được phép làm Y không?" });

// ── Mockup 2: bảng so sánh Authentication vs Authorization ──
const m_authn_authz = grid("Authentication (Xác thực) vs Authorization (Phân quyền)", ["Tiêu chí", "Authentication", "Authorization"], [
  ["Câu hỏi trả lời", "Bạn LÀ AI?", "Bạn ĐƯỢC LÀM GÌ?"],
  ["Diễn ra khi nào", "Lúc đăng nhập", "Mỗi lần thao tác, sau khi đã đăng nhập"],
  ["Ví dụ ShopEasy", "Nhập đúng email + mật khẩu để vào tài khoản", "Thành viên bị chặn khi cố vào trang Admin"],
  ["Lỗi thường gặp", "Đăng nhập sai vẫn vào được tài khoản", "Đăng nhập đúng nhưng làm được việc không thuộc vai trò"],
], { accent: "#0e7490" });

// ── Mockup 3: khách gõ thẳng URL /admin — bị chặn ĐÚNG (403) ──
const m_admin_blocked = browser("shopeasy.vn/admin", [
  panel("ShopEasy · 403 Truy cập bị từ chối", [
    field(24, 20, 678, "", "Bạn không có quyền truy cập trang này.", "disabled"),
    btn(24, 96, 220, "Về trang chủ", "primary"),
    annotate(18, 10, 690, 70, "ĐÚNG: khách bị chặn, không thấy được nội dung Admin"),
  ].join(""), { h: 200, accent: "#16a34a" }),
].join(""), { h: 256, title: "ShopEasy · TMĐT", accent: "#16a34a" });

// ── Mockup 4: khách gõ thẳng URL /admin — KHÔNG bị chặn, lộ dữ liệu (lỗi) ──
const m_admin_leak = browser("shopeasy.vn/admin", [
  panel("ShopEasy · Quản trị hệ thống (Admin Dashboard)", [
    field(24, 20, 330, "Tổng đơn hàng hôm nay", "1.284", "normal"),
    field(372, 20, 330, "Doanh thu hôm nay", "482.500.000đ", "normal"),
    btn(24, 92, 200, "Quản lý người dùng", "danger"),
    btn(240, 92, 200, "Xóa đơn hàng", "danger"),
    annotate(18, 10, 690, 118, "LỖ HỔNG: khách (chưa đăng nhập) vẫn xem được toàn bộ Admin Dashboard"),
  ].join(""), { h: 236, accent: "#ef4444" }),
].join(""), { h: 292, title: "ShopEasy · TMĐT", accent: "#ef4444" });

// ── Mockup 5: nút "Xóa đơn" bị ẩn với Nhân viên kho trên giao diện ──
const m_hidden_btn = panel("ShopEasy · Đơn hàng #SE-5821 (giao diện Nhân viên kho)", [
  field(24, 20, 680, "Trạng thái", "Đang chuẩn bị hàng", "normal"),
  btn(24, 96, 180, "Cập nhật tồn kho", "primary"),
  annotate(224, 86, 200, 44, "Nút 'Xóa đơn' KHÔNG hiển thị với vai trò này"),
].join(""), { h: 168, accent: "#0e7490" });

// ── Mockup 6: gọi thẳng API xóa đơn bằng token Nhân viên kho — vẫn thành công (bug) ──
const m_api_bug = postman({
  method: "DELETE", url: "shopeasy.vn/api/orders/5821 · Authorization: Bearer <token nhân_viên_kho>",
  status: 200, time: "84 ms", size: "0.3 KB", ok: false,
  body: [
    "// Ky vong: 403 Forbidden (nhan vien kho khong duoc xoa don)",
    "// Thuc te:",
    "{",
    "  \"success\": true,",
    "  \"message\": \"Order 5821 deleted\"",
    "}",
    "// -> Nut bi an tren giao dien nhung API van cho phep goi",
  ],
});

// ── Mockup 7: ticket Jira của lỗi vượt quyền tìm được ──
const m_jira = jira({
  key: "SE-14032", title: "API DELETE /orders/:id không kiểm tra vai trò — Nhân viên kho xóa được đơn hàng",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · API ShopEasy · Postman · token Nhân viên kho"],
    ["Các bước", "1) Đăng nhập bằng tài khoản Nhân viên kho 2) Lấy token 3) Gọi DELETE /api/orders/5821 trực tiếp bằng Postman"],
    ["Kết quả mong đợi", "Server trả 403 Forbidden vì Nhân viên kho không có quyền xóa đơn"],
    ["Kết quả thực tế", "Server trả 200, đơn hàng bị xóa thật dù nút 'Xóa đơn' đã bị ẩn trên giao diện"],
    ["Bằng chứng", "postman-se14032.json, log-server-delete-5821.txt"],
  ],
});

// ── Mockup 8: kanban theo dõi lỗi phân quyền tìm được ──
const m_kanban = kanban("Bảng theo dõi lỗi kiểm thử phân quyền (ShopEasy · Sprint 21)", [
  { name: "New", cards: [
    { key: "SE-14032", title: "Nhân viên kho xóa đơn qua API dù nút bị ẩn", sev: "Critical" },
    { key: "SE-14040", title: "Khách gõ URL /admin vẫn xem được dashboard", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "SE-14019", title: "Thành viên đổi orderId trên URL, xem đơn người khác", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-13988", title: "Sửa role trong request, tài khoản tự thành Admin", sev: "Critical" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-13950", title: "Nhân viên kho vào được trang Quản lý người dùng", sev: "High" },
  ] },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Authentication và Authorization khác nhau thế nào?",
  "How are authentication and authorization different?",
  "Authentication (xác thực) trả lời câu hỏi 'bạn là ai' — thường diễn ra một lần lúc đăng nhập bằng email/mật khẩu. Authorization (phân quyền) trả lời câu hỏi 'bạn được phép làm gì' — được kiểm tra lại ở MỌI thao tác sau khi đã đăng nhập, dựa trên vai trò (khách, thành viên, nhân viên kho, admin). Một tài khoản có thể xác thực đúng (đăng nhập thành công) nhưng vẫn bị từ chối ở bước phân quyền nếu cố làm việc không thuộc vai trò của mình.",
  "Authentication answers 'who are you' — it usually happens once at login with email/password. Authorization answers 'what are you allowed to do' — it's checked on EVERY action after login, based on role (guest, member, warehouse staff, admin). An account can authenticate correctly (login succeeds) yet still be denied at the authorization step if it tries to do something outside its role.",
  "認証（Authentication）と認可（Authorization）はどう違う？",
  "認証は『あなたは誰か』に答えます——通常はメール/パスワードでログインする時に一度だけ行われます。認可は『あなたは何をしてよいか』に答えます——ログイン後の全ての操作でロール（ゲスト、会員、倉庫スタッフ、管理者）に基づき毎回チェックされます。認証が正しく通っても（ログイン成功）、自分のロール外の操作をしようとすれば認可の段階で拒否されることがあります。");
const faq2 = FAQ(
  "Vì sao chỉ ẩn nút trên giao diện là chưa đủ để chặn quyền?",
  "Why is hiding a button on the UI not enough to enforce authorization?",
  "Vì giao diện (frontend) chỉ chạy trên máy người dùng — họ có thể mở DevTools, dùng Postman, hoặc gọi thẳng API mà không cần thấy nút bấm nào. Nếu server (backend) không tự kiểm tra lại vai trò cho từng request, kẻ tấn công hoặc người dùng tò mò vẫn có thể gọi được API bị 'giấu' sau nút ẩn. Vì vậy quy tắc vàng là: kiểm thử phân quyền phải test cả UI lẫn API, và validate quyền BẮT BUỘC phải nằm ở phía server.",
  "Because the frontend UI only runs on the user's machine — they can open DevTools, use Postman, or call the API directly without ever seeing a button. If the backend server doesn't re-check the role for every request, an attacker or curious user can still call the API 'hidden' behind that missing button. So the golden rule is: authorization testing must cover both UI and API, and permission validation must live on the server side.",
  "なぜUI上でボタンを隠すだけでは権限制御として不十分？",
  "フロントエンドUIはユーザーの端末上で動くだけだからです——DevToolsを開いたり、Postmanを使ったり、ボタンを見ることなく直接APIを呼び出せます。バックエンドサーバーが各リクエストでロールを再チェックしなければ、攻撃者や好奇心のあるユーザーは非表示ボタンの裏に隠れたAPIを呼び出せてしまいます。そのため黄金律は：認可テストはUIとAPIの両方をカバーし、権限検証は必ずサーバー側に置くことです。");
const faq3 = FAQ(
  "Kiểm thử phân quyền nên ưu tiên những trang/API nào trước?",
  "Which pages/APIs should authorization testing prioritize first?",
  "Ưu tiên theo rủi ro: trước hết là các trang/API có thể THAY ĐỔI dữ liệu quan trọng hoặc TIỀN (xóa đơn hàng, cập nhật tồn kho, quản lý người dùng), sau đó tới các trang xem dữ liệu NHẠY CẢM của người khác (đơn hàng, thông tin cá nhân), cuối cùng mới tới các trang chỉ đọc thông tin công khai. Với mỗi trang/API, luôn kiểm tra đủ 4 góc: khách chưa đăng nhập, thành viên thường, vai trò gần giống (ví dụ nhân viên kho) và vai trò cao nhất (admin).",
  "Prioritize by risk: first, pages/APIs that can CHANGE important data or MONEY (deleting orders, updating stock, managing users); then pages that VIEW other people's SENSITIVE data (orders, personal info); and last, pages that only read public information. For each page/API, always check all 4 angles: not-logged-in guest, a regular member, a similar-but-different role (e.g. warehouse staff), and the highest role (admin).",
  "認可テストはどのページ/APIを優先すべき？",
  "リスクで優先順位を付けます：まず重要なデータや金額を変更できるページ/API（注文削除、在庫更新、ユーザー管理）、次に他人のセンシティブなデータを閲覧できるページ（注文、個人情報）、最後に公開情報を読むだけのページです。各ページ/APIについて、常に4つの視点——未ログインのゲスト、一般会員、似て非なるロール（倉庫スタッフなど）、最上位ロール（管理者）——を確認しましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Authentication và Authorization khác nhau ở điểm nào?", en: "What is the key difference between authentication and authorization?", ja: "認証と認可の主な違いは何？" },
    options: [
      { vi: "Authentication xác nhận 'bạn là ai', Authorization xác định 'bạn được phép làm gì'", en: "Authentication confirms 'who you are', Authorization determines 'what you're allowed to do'", ja: "認証は『あなたは誰か』を確認し、認可は『何をしてよいか』を決める" },
      { vi: "Cả hai đều là một khái niệm, dùng thay thế cho nhau", en: "They're the same concept and can be used interchangeably", ja: "両者は同じ概念で、互いに置き換え可能" },
      { vi: "Authorization luôn diễn ra trước khi đăng nhập", en: "Authorization always happens before login", ja: "認可は常にログイン前に行われる" },
      { vi: "Authentication chỉ áp dụng cho admin, Authorization chỉ áp dụng cho khách", en: "Authentication only applies to admins, Authorization only applies to guests", ja: "認証は管理者のみ、認可はゲストのみに適用される" },
    ], correct: 0,
    explain: { vi: "Authentication trả lời 'bạn là ai' (đăng nhập), Authorization trả lời 'bạn được làm gì' (quyền theo vai trò).", en: "Authentication answers 'who you are' (login), Authorization answers 'what you can do' (role-based permissions).", ja: "認証は『あなたは誰か』（ログイン）、認可は『何ができるか』（ロールベースの権限）に答えます。" },
  }),
  mcq({
    q: { vi: "Đâu là một ca lỗi PHÂN QUYỀN (authorization bug) thực sự?", en: "Which of these is a real authorization bug?", ja: "本当の認可（authorization）バグはどれ？" },
    options: [
      { vi: "Nhập sai mật khẩu nhiều lần mà không bị khóa tài khoản", en: "Entering the wrong password many times without the account getting locked", ja: "パスワードを何度間違えてもアカウントがロックされない" },
      { vi: "Thành viên A đổi orderId trên URL và xem được đơn hàng của Thành viên B", en: "Member A changes the orderId in the URL and can view Member B's order", ja: "会員AがURLのorderIdを変えると会員Bの注文が見えてしまう" },
      { vi: "Trang tải chậm khi có nhiều người truy cập cùng lúc", en: "The page loads slowly when many people access it at once", ja: "多くの人が同時にアクセスするとページの読み込みが遅い" },
      { vi: "Email xác nhận đơn hàng bị gửi trễ vài phút", en: "The order confirmation email is delayed by a few minutes", ja: "注文確認メールが数分遅れて届く" },
    ], correct: 1,
    explain: { vi: "Thành viên A đã đăng nhập đúng (authentication OK) nhưng lại xem được dữ liệu của người khác — đó là lỗi phân quyền, không phải lỗi xác thực.", en: "Member A logged in correctly (authentication OK) but could still view another user's data — that's an authorization bug, not an authentication one.", ja: "会員Aは正しくログインしている（認証OK）のに他人のデータを見られる——これは認証ではなく認可のバグです。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử phân quyền, vì sao cần thử gõ THẲNG URL trang quản trị thay vì chỉ kiểm tra menu/nút bấm?", en: "When testing authorization, why try typing the admin URL directly instead of only checking the menu/buttons?", ja: "認可テストで、メニューやボタンだけでなく管理画面のURLを直接入力して確認すべき理由は？" },
    options: [
      { vi: "Vì URL luôn tải nhanh hơn menu", en: "Because URLs always load faster than menus", ja: "URLはメニューより常に読み込みが速いから" },
      { vi: "Vì kẻ tấn công không cần thấy nút mới truy cập được — chỉ cần biết hoặc đoán được URL", en: "Because an attacker doesn't need to see a button to access it — just knowing or guessing the URL is enough", ja: "攻撃者はボタンを見なくてもアクセスでき、URLを知る・推測するだけで十分だから" },
      { vi: "Vì menu không bao giờ có lỗi", en: "Because menus never have bugs", ja: "メニューには絶対バグがないから" },
      { vi: "Vì gõ URL là cách duy nhất để đăng nhập", en: "Because typing a URL is the only way to log in", ja: "URLを入力することがログインする唯一の方法だから" },
    ], correct: 1,
    explain: { vi: "Ẩn nút/menu chỉ chặn được người dùng thông thường trên giao diện; ai biết URL đều có thể truy cập trực tiếp nếu server không kiểm tra quyền.", en: "Hiding a button/menu only stops regular users on the UI; anyone who knows the URL can access it directly if the server doesn't enforce authorization.", ja: "ボタンやメニューを隠すのはUI上の通常ユーザーを止めるだけで、サーバーが認可を強制しなければURLを知る誰でも直接アクセスできます。" },
  }),
  mcq({
    q: { vi: "Vì sao chỉ ẩn nút trên giao diện là CHƯA ĐỦ để chặn thao tác vượt quyền?", en: "Why is hiding a button on the UI NOT enough to block unauthorized actions?", ja: "UIでボタンを隠すだけでは権限外の操作を防ぐのに不十分な理由は？" },
    options: [
      { vi: "Vì client-side (giao diện) có thể bị bỏ qua; phải kiểm tra quyền ở server/API", en: "Because the client side (UI) can be bypassed; authorization must be enforced on the server/API", ja: "クライアント側（UI）は迂回可能なため、サーバー/API側で権限を検証する必要があるから" },
      { vi: "Vì ẩn nút làm trang web chạy chậm hơn", en: "Because hiding a button makes the website run slower", ja: "ボタンを隠すとウェブサイトの動作が遅くなるから" },
      { vi: "Vì người dùng không thích giao diện có nút ẩn", en: "Because users dislike interfaces with hidden buttons", ja: "ユーザーは非表示ボタンのあるUIを嫌うから" },
      { vi: "Vì ẩn nút chỉ áp dụng được cho admin", en: "Because hiding buttons only works for admins", ja: "ボタンを隠すのは管理者にしか適用できないから" },
      { vi: "Vì các trình duyệt không hỗ trợ ẩn nút", en: "Because browsers don't support hiding buttons", ja: "ブラウザはボタンの非表示をサポートしていないから" },
    ], correct: 0,
    explain: { vi: "Người dùng có thể gọi API trực tiếp qua Postman/DevTools mà không cần thấy nút — server phải tự kiểm tra vai trò cho mọi request.", en: "Users can call the API directly via Postman/DevTools without ever seeing the button — the server must check the role on every request.", ja: "ユーザーはボタンを見なくてもPostmanやDevToolsで直接APIを呼び出せるため、サーバーは全リクエストでロールを検証する必要があります。" },
  }),
  mcq({
    q: { vi: "Leo thang đặc quyền cơ bản (privilege escalation) là gì?", en: "What is basic privilege escalation?", ja: "基本的な権限昇格（privilege escalation）とは何？" },
    options: [
      { vi: "Người dùng quyền thấp tự thao tác (vd sửa field 'role' trong request) để có được quyền cao hơn không được cấp", en: "A low-privilege user manipulates something (e.g. editing the 'role' field in a request) to gain higher privileges they weren't granted", ja: "低権限ユーザーがリクエストの『role』フィールドを改変するなどして、付与されていない高い権限を得ること" },
      { vi: "Admin tự nguyện hạ quyền của mình xuống thành viên", en: "An admin voluntarily lowers their own privileges to member level", ja: "管理者が自発的に自分の権限を会員レベルに下げること" },
      { vi: "Hệ thống tự động nâng cấp máy chủ để chạy nhanh hơn", en: "The system automatically upgrades the server to run faster", ja: "システムが自動的にサーバーをアップグレードして高速化すること" },
      { vi: "Người dùng đổi mật khẩu định kỳ theo yêu cầu bảo mật", en: "A user changes their password periodically per security policy", ja: "ユーザーがセキュリティポリシーに従って定期的にパスワードを変更すること" },
    ], correct: 0,
    explain: { vi: "Ví dụ điển hình: thành viên gửi request cập nhật hồ sơ nhưng chèn thêm field 'role': 'admin' — nếu server không chặn, tài khoản tự thành Admin.", en: "A classic example: a member sends a profile-update request but sneaks in a 'role': 'admin' field — if the server doesn't block it, the account becomes Admin.", ja: "典型例：会員がプロフィール更新リクエストに『role』：『admin』フィールドを紛れ込ませる——サーバーが阻止しなければアカウントが管理者になってしまいます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screens you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử phân quyền (authorization testing) là việc xác nhận mỗi vai trò (khách, thành viên, nhân viên kho, admin) chỉ làm được đúng những gì họ được phép, không hơn không kém — khác với kiểm thử xác thực (authentication) vốn chỉ xác nhận 'bạn là ai'. Bài này bám app TMĐT ShopEasy: bạn học ma trận quyền theo vai trò, cách thử truy cập URL không được phép, vì sao ẩn nút trên giao diện chưa đủ, và cách phát hiện leo thang đặc quyền qua API. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Authorization testing confirms that each role (guest, member, warehouse staff, admin) can do exactly what it's allowed to do, no more, no less — unlike authentication testing, which only confirms 'who you are'. This lesson follows ShopEasy's e-commerce app: you'll learn a role permission matrix, how to try accessing unauthorized URLs, why hiding a UI button isn't enough, and how to catch privilege escalation via the API. Lots of visuals and a quiz at the end.",
        "認可（authorization）テストとは、各ロール（ゲスト、会員、倉庫スタッフ、管理者）が許可された範囲のことだけを行えるか確認することです——『あなたは誰か』だけを確認する認証（authentication）テストとは異なります。本記事はECアプリShopEasyに沿い、役割別権限マトリクス、許可されていないURLへのアクセス試行、UIボタンを隠すだけでは不十分な理由、APIを通じた権限昇格の見つけ方を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Bạn đã biết đăng nhập đúng tài khoản là 'xác thực' (authentication). Nhưng đăng nhập được rồi không có nghĩa là làm gì cũng được — đó là lúc 'phân quyền' (authorization) vào cuộc. Trên ShopEasy, một Thành viên đăng nhập đúng vẫn không được phép vào trang Quản trị; một Nhân viên kho đăng nhập đúng cũng không được phép xóa đơn hàng của khách. Kiểm thử phân quyền chính là kỹ năng đóng vai từng nhóm người dùng để xác nhận ranh giới đó được giữ đúng, ở cả giao diện lẫn API phía sau.",
        "Hi, newcomer! You already know logging into the right account is 'authentication'. But being logged in doesn't mean you can do anything — that's where 'authorization' comes in. On ShopEasy, a correctly logged-in Member still isn't allowed into the Admin page; a correctly logged-in Warehouse staff still isn't allowed to delete a customer's order. Authorization testing is the skill of role-playing each user group to confirm that boundary is properly enforced, both on the UI and on the API behind it.",
        "こんにちは、初心者さん！正しいアカウントでログインすることが『認証』だとすでにご存知でしょう。しかしログインできたからといって何をしてもよいわけではありません——そこで『認可』の出番です。ShopEasyでは、正しくログインした会員でも管理画面には入れませんし、正しくログインした倉庫スタッフでも顧客の注文を削除できません。認可テストとは、各ユーザーグループになりきり、その境界がUIと背後のAPIの両方で正しく守られているか確認するスキルです。"),
      IMG(m_matrix, "Ma trận quyền theo vai trò trên ShopEasy: khách, thành viên, nhân viên kho, admin", "Role permission matrix on ShopEasy: guest, member, warehouse staff, admin", "ShopEasyの役割別権限マトリクス：ゲスト、会員、倉庫スタッフ、管理者"),
      DEF("Authorization", "quá trình xác định một người dùng đã xác thực (đã đăng nhập) được phép thực hiện hành động hoặc xem dữ liệu nào, dựa trên vai trò/quyền của họ.",
        "the process of determining what actions or data an authenticated (logged-in) user is allowed to access, based on their role/permissions.",
        "認証済み（ログイン済み）のユーザーが、そのロール/権限に基づいてどの操作やデータにアクセスできるかを決定するプロセス。"),
    ] },
  { heading: { vi: "2. Authentication vs Authorization: đừng nhầm hai khái niệm", en: "2. Authentication vs authorization: don't confuse the two", ja: "2. 認証 vs 認可：混同しないこと" },
    blocks: [
      P("Rất nhiều người mới nhầm hai khái niệm này vì chúng hay đi cùng nhau và đều liên quan tới 'quyền truy cập'. Cách phân biệt dễ nhớ nhất: Authentication trả lời 'bạn là ai' (identity), còn Authorization trả lời 'bạn được làm gì' (permission). Một hệ thống có thể xác thực rất tốt (chặn được mật khẩu sai, hỗ trợ OTP) nhưng vẫn có lỗ hổng phân quyền nghiêm trọng nếu không kiểm tra vai trò ở từng hành động.",
        "Many beginners confuse these two concepts because they often go together and both relate to 'access control'. The easiest way to tell them apart: Authentication answers 'who are you' (identity), while Authorization answers 'what are you allowed to do' (permission). A system can authenticate very well (blocking wrong passwords, supporting OTP) yet still have serious authorization holes if it doesn't check the role for each action.",
        "この2つの概念は一緒に使われることが多く、どちらも『アクセス制御』に関わるため、多くの初心者が混同します。覚え方：認証は『あなたは誰か』（identity）に答え、認可は『何をしてよいか』（permission）に答えます。システムは認証がとても優れていても（誤ったパスワードを拒否、OTPをサポート）、各操作でロールをチェックしなければ深刻な認可の穴を抱えることがあります。"),
      IMG(m_authn_authz, "Bảng so sánh Authentication (Xác thực) và Authorization (Phân quyền), minh hoạ trên ShopEasy", "Table comparing Authentication and Authorization, illustrated on ShopEasy", "認証と認可の比較表、ShopEasyで例示"),
      P("Trong một buổi kiểm thử thực tế, bạn cần tách rõ hai bộ ca kiểm thử: bộ ca xác thực (đăng nhập sai mật khẩu, quên mật khẩu, khóa tài khoản sau nhiều lần sai) và bộ ca phân quyền (vai trò X có được làm Y không). Gộp lẫn hai loại này rất dễ khiến bạn báo cáo sai loại lỗi, hoặc tệ hơn là bỏ sót hẳn một nhóm ca kiểm thử quan trọng.",
        "In a real testing session, you should clearly separate two sets of test cases: authentication cases (wrong password, forgotten password, account lockout after repeated failures) and authorization cases (can role X do Y?). Mixing the two easily leads to misclassifying bugs, or worse, missing an entire important group of test cases.",
        "実際のテストでは、認証テストケース（パスワード誤り、パスワード忘れ、繰り返し失敗後のアカウントロック）と認可テストケース（ロールXはYをしてよいか）の2つを明確に分けるべきです。両者を混ぜると、バグを誤って分類したり、さらに悪いことに重要なテストケース群をまるごと見逃したりしやすくなります。"),
      DEF("Authentication", "quá trình xác nhận danh tính người dùng (ví dụ đăng nhập bằng email + mật khẩu, hoặc OTP), trả lời câu hỏi 'bạn là ai'.",
        "the process of confirming a user's identity (e.g. logging in with email + password, or OTP), answering the question 'who are you'.",
        "ユーザーの本人確認プロセス（例：メール＋パスワード、またはOTPでのログイン）で、『あなたは誰か』という質問に答える。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử phân quyền", en: "3. Why beginners need to master authorization testing", ja: "3. 初心者が認可テストを習得すべき理由" },
    blocks: [
      P("Lỗi phân quyền là một trong những nhóm lỗi NGUY HIỂM NHẤT vì nó thường không hiện ra khi bạn chỉ test theo đúng vai trò được giao. Một tester chỉ đăng nhập bằng tài khoản Admin để test sẽ không bao giờ thấy được rằng Thành viên thường cũng vào được trang Quản trị nếu gõ đúng URL. Vì vậy, kiểm thử phân quyền đòi hỏi bạn phải chủ động đổi vai — không chỉ test 'đúng vai trò của mình' mà còn test 'vai trò khác có lọt qua được không'.",
        "Authorization bugs are among the most DANGEROUS bug categories because they often don't surface if you only test as the role you were assigned. A tester who only logs in as Admin to test will never notice that a regular Member can also reach the Admin page by typing the right URL. So authorization testing requires you to actively switch roles — not just testing 'my own role' but also testing 'can another role sneak through'.",
        "認可バグは最も危険なバグカテゴリの一つです。割り当てられたロールだけでテストしていると、その問題は表面化しないことが多いからです。管理者アカウントだけでテストするテスターは、通常の会員が正しいURLを入力すれば管理画面にも到達できることに決して気づきません。そのため認可テストでは積極的にロールを切り替える必要があります——『自分のロール』だけでなく『他のロールがすり抜けられないか』もテストするのです。"),
      P("Đây cũng là kỹ năng rất được đánh giá cao khi phỏng vấn vị trí Tester, vì nó cho thấy bạn hiểu ứng dụng ở tầng bảo mật cơ bản, không chỉ dừng ở giao diện đẹp/xấu. Câu hỏi phỏng vấn phổ biến: 'Làm sao bạn kiểm thử để chắc chắn người dùng A không xem được dữ liệu của người dùng B?' — trả lời được bằng ví dụ cụ thể (đổi ID trên URL, gọi API bằng token khác) cho thấy tư duy kiểm thử phân quyền vững chắc.",
        "This is also a highly valued skill in Tester interviews, because it shows you understand the application at a basic security layer, not just whether the UI looks nice. A common interview question: 'How would you test to make sure user A can't see user B's data?' — answering with a concrete example (changing the ID in the URL, calling the API with a different token) shows solid authorization-testing thinking.",
        "これはテスター面接でも高く評価されるスキルです。見た目の良し悪しだけでなく、基本的なセキュリティ層でアプリを理解していることを示すからです。よくある面接質問：『ユーザーAがユーザーBのデータを見られないことをどうテストしますか？』——URLのIDを変更する、別のトークンでAPIを呼び出すといった具体例で答えられれば、しっかりした認可テストの思考力を示せます。"),
      P("Và quan trọng hơn cả: lỗ hổng phân quyền chính là một trong những nguyên nhân hàng đầu gây rò rỉ dữ liệu và thất thoát tiền bạc trong thực tế — như nhân viên kho xóa được đơn hàng của khách, hoặc thành viên tự nâng quyền thành Admin. Đầu tư đúng mức vào kiểm thử phân quyền là bạn đang bảo vệ trực tiếp dữ liệu và uy tín của doanh nghiệp.",
        "And most importantly: authorization holes are one of the leading causes of real-world data leaks and financial loss — like warehouse staff being able to delete a customer's order, or a member self-promoting to Admin. Investing properly in authorization testing directly protects the business's data and reputation.",
        "そして最も重要なのは、認可の穴が実際のデータ漏洩や金銭的損失の主な原因の一つだということです——倉庫スタッフが顧客の注文を削除できたり、会員が自分を管理者に昇格させたりします。認可テストに適切に投資することは、企業のデータと信頼を直接守ることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: dựng ma trận quyền theo vai trò", en: "4. Prepare: building a role permission matrix", ja: "4. 準備：役割別権限マトリクスを作る" },
    blocks: [
      P("Trước khi viết bất kỳ ca kiểm thử phân quyền nào, bạn cần một BẢN ĐỒ rõ ràng: hệ thống có những vai trò nào, và mỗi vai trò được phép làm gì. Đây gọi là ma trận quyền (permission matrix) — công cụ nền tảng để không bỏ sót góc kiểm thử nào.",
        "Before writing any authorization test case, you need a clear MAP: what roles the system has, and what each role is allowed to do. This is called a permission matrix — the foundational tool that keeps you from missing any testing angle.",
        "認可テストケースを書く前に、明確な地図が必要です：システムにどんなロールがあり、各ロールが何をしてよいか。これは権限マトリクス（permission matrix）と呼ばれ、テストの見落としを防ぐ基盤ツールです。"),
      STEP(1, "Liệt kê tất cả vai trò trong hệ thống (ví dụ ShopEasy: Khách, Thành viên, Nhân viên kho, Admin).", "List every role in the system (e.g. ShopEasy: Guest, Member, Warehouse staff, Admin).", "システム内の全ロールを列挙する（例：ShopEasyのゲスト、会員、倉庫スタッフ、管理者）。"),
      STEP(2, "Liệt kê tất cả chức năng/trang/API quan trọng (xem sản phẩm, đặt hàng, xem đơn, cập nhật tồn kho, quản lý người dùng...).", "List every important feature/page/API (view products, place order, view orders, update stock, manage users...).", "重要な機能/ページ/APIをすべて列挙する（商品閲覧、注文、注文確認、在庫更新、ユーザー管理など）。"),
      STEP(3, "Với mỗi ô (vai trò × chức năng), đánh dấu ĐƯỢC PHÉP hay KHÔNG — đây chính là bộ ca kiểm thử phân quyền của bạn.", "For each cell (role × feature), mark ALLOWED or NOT — this is your set of authorization test cases.", "各セル（ロール×機能）に許可/不許可を記入する——これがそのまま認可テストケース一式になる。"),
      TRY("Vẽ ma trận quyền cho một tính năng bất kỳ trong app bạn hay dùng (ví dụ: ai được xóa bình luận, ai được sửa giá sản phẩm).", "Draw a permission matrix for any feature in an app you use (e.g. who can delete a comment, who can edit a product's price).", "使っているアプリの任意の機能について権限マトリクスを描いてみよう（例：誰がコメントを削除できるか、誰が商品価格を編集できるか）。"),
      PITFALL("Chỉ kiểm tra vai trò 'đúng' của tính năng (ví dụ chỉ test Admin trên trang Admin) mà quên thử các vai trò KHÔNG nên vào được — đó chính là nơi lỗ hổng ẩn náu.", "Only testing the 'correct' role for a feature (e.g. only testing Admin on the Admin page) while forgetting to try roles that should NOT get in — that's exactly where holes hide.", "機能の『正しい』ロールだけをテストし（例：管理画面で管理者だけをテスト）、入れてはいけないロールを試すのを忘れること——まさにそこに穴が潜んでいます。"),
      IMG(m_matrix, "Ma trận quyền theo vai trò — dùng làm checklist khi viết ca kiểm thử phân quyền", "Role permission matrix — use it as a checklist when writing authorization test cases", "役割別権限マトリクス — 認可テストケースを書く際のチェックリストとして使う"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử phân quyền từng bước (thực hành)", en: "5. Writing authorization test cases step by step (hands-on)", ja: "5. 認可テストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào trang Quản trị (/admin) và API xóa đơn hàng của ShopEasy — hai nơi rủi ro cao nhất vì liên quan tới toàn bộ dữ liệu hệ thống và đơn hàng khách hàng.",
        "Now let's apply this for real to ShopEasy's Admin page (/admin) and its order-deletion API — two of the highest-risk spots since they touch the entire system's data and customer orders.",
        "では、ShopEasyの管理画面（/admin）と注文削除APIに実際に適用しましょう——システム全体のデータと顧客の注文に関わる、最もリスクの高い2箇所です。"),
      STEP(1, "Xác định vai trò 'đúng' được phép: chỉ Admin được vào /admin và được gọi DELETE /api/orders/:id.", "Determine the 'correct' allowed role: only Admin may access /admin and call DELETE /api/orders/:id.", "『正しい』許可ロールを特定する：/adminへのアクセスとDELETE /api/orders/:idの呼び出しは管理者のみ許可。"),
      STEP(2, "Với TỪNG vai trò còn lại (Khách, Thành viên, Nhân viên kho), thử gõ thẳng URL /admin và gọi thẳng API DELETE bằng token của họ.", "For EACH remaining role (Guest, Member, Warehouse staff), try typing the /admin URL directly and calling the DELETE API directly with their token.", "残りの各ロール（ゲスト、会員、倉庫スタッフ）について、/adminのURLを直接入力し、そのトークンでDELETE APIを直接呼び出してみる。"),
      STEP(3, "Ghi lại Expected (403 Forbidden hoặc chuyển hướng) và Actual (điều thực sự xảy ra) cho từng vai trò, riêng biệt cho UI và cho API.", "Record Expected (403 Forbidden or redirect) and Actual (what really happens) for each role, separately for UI and API.", "各ロールについて、UIとAPIそれぞれで期待結果（403または遷移）と実際の結果を記録する。"),
      STEP(4, "Nếu vai trò nào KHÔNG bị chặn đúng, chuyển ngay thành bug report Critical/High vì đây là lỗ hổng bảo mật.", "If any role is NOT correctly blocked, turn it into a Critical/High bug report immediately since it's a security hole.", "正しくブロックされないロールがあれば、セキュリティホールとして直ちにCritical/Highのバグ報告にする。"),
      CODE("text", "BO CA KIEM THU PHAN QUYEN - trang /admin va API DELETE /api/orders/:id (ShopEasy)\nCa 1: Khach (chua dang nhap) mo /admin       | Expected: chuyen ve trang dang nhap | Actual: ...\nCa 2: Thanh vien da dang nhap mo /admin      | Expected: 403 Tu choi truy cap      | Actual: ...\nCa 3: Nhan vien kho goi DELETE /api/orders/5821 | Expected: 403 (khong thuoc quyen) | Actual: 200 (BUG)\nCa 4: Admin goi DELETE /api/orders/5821      | Expected: 200, xoa thanh cong       | Actual: 200 dung"),
      TRY("Viết thêm 1 ca kiểm thử phân quyền cho API 'Cập nhật tồn kho' (PATCH /api/stock/:id): vai trò nào được gọi, vai trò nào phải bị chặn?", "Write one more authorization case for the 'Update stock' API (PATCH /api/stock/:id): which role may call it, which role must be blocked?", "『在庫更新』API（PATCH /api/stock/:id）の認可テストケースをもう1つ書こう：どのロールが呼び出せて、どのロールがブロックされるべきか。"),
    ] },
  { heading: { vi: "6. Tình huống 1: khách gõ thẳng URL /admin vẫn vào được", en: "6. Situation 1: a guest can still get into the /admin URL directly", ja: "6. シーン1：ゲストがURLを直接入力して/adminに入れてしまう" },
    blocks: [
      SITUATION("Đội chỉ test bằng cách bấm menu: khách không thấy mục 'Quản trị' trên thanh điều hướng nên kết luận khách không vào được trang Admin.", "The team only tests by clicking the menu: guests don't see the 'Admin' item in the navigation bar, so they conclude guests can't reach the Admin page.",
        "Một tester gõ thẳng URL shopeasy.vn/admin vào trình duyệt khi CHƯA đăng nhập — trang Admin Dashboard vẫn tải đầy đủ, hiển thị doanh thu, danh sách người dùng, và nút 'Xóa đơn hàng'.",
        "A tester types shopeasy.vn/admin directly into the browser while NOT logged in — the Admin Dashboard still loads fully, showing revenue, the user list, and an 'Delete order' button.",
        "チームはメニューをクリックする方法だけでテスト：ゲストにはナビゲーションバーに『管理』項目が表示されないため、ゲストは管理画面に到達できないと結論づけた。",
        "テスターが未ログインの状態でブラウザにshopeasy.vn/adminと直接入力——管理ダッシュボードは完全に読み込まれ、売上、ユーザー一覧、『注文削除』ボタンまで表示された。"),
      SOLVE("Báo bug Critical ngay (lộ dữ liệu doanh thu và người dùng cho bất kỳ ai), yêu cầu backend kiểm tra vai trò ở SERVER cho mọi route /admin/*, không chỉ ẩn mục menu ở frontend.", "Report a Critical bug immediately (revenue and user data exposed to anyone), and require the backend to check the role on the SERVER for every /admin/* route, not just hide the menu item on the frontend.", "即座にCriticalバグとして報告（売上とユーザーデータが誰にでも公開される）し、フロントエンドでメニュー項目を隠すだけでなく、全ての/admin/*ルートでサーバー側のロールチェックを要求する。"),
      P("Đây là bài học lớn nhất trong chương này: 'không thấy nút/menu' không có nghĩa là 'không truy cập được'. Ẩn menu chỉ là một lớp trang trí giao diện — nếu server không tự kiểm tra vai trò cho mỗi request tới /admin/*, bất kỳ ai biết URL (kể cả qua Google, chia sẻ link, hay đoán) đều có thể vào thẳng. Luôn thử gõ URL trực tiếp bằng TỪNG vai trò, đừng chỉ tin vào những gì menu hiển thị.",
        "This is the biggest lesson in this chapter: 'not seeing a button/menu' doesn't mean 'can't access it'. Hiding a menu item is just a UI decoration layer — if the server doesn't check the role for every request to /admin/*, anyone who knows the URL (even via Google, a shared link, or a guess) can walk right in. Always try typing the URL directly with EACH role, don't just trust what the menu shows.",
        "この章での最大の教訓です：『ボタン/メニューが見えない』は『アクセスできない』を意味しません。メニュー項目を隠すのはUIの装飾層にすぎません——サーバーが/admin/*への全リクエストでロールをチェックしなければ、URLを知る誰でも（Google検索、共有リンク、推測経由でも）直接入れてしまいます。常に各ロールでURLを直接入力して確認し、メニューの表示だけを信用しないようにしましょう。"),
      IMG(m_admin_leak, "Lỗi thật: khách chưa đăng nhập gõ thẳng URL /admin vẫn xem được toàn bộ Dashboard", "A real bug: a not-logged-in guest typing the /admin URL can still see the entire Dashboard", "実際のバグ：未ログインのゲストが/adminのURLを直接入力すると全ダッシュボードが見えてしまう"),
      IMG(m_admin_blocked, "Kết quả ĐÚNG mong đợi: khách bị chặn với 403 Truy cập bị từ chối", "The correctly expected result: the guest is blocked with a 403 Access Denied", "期待される正しい結果：ゲストは403アクセス拒否でブロックされる"),
      RECAP(["'Không thấy menu' KHÔNG đồng nghĩa 'không truy cập được'", "Luôn thử gõ URL trực tiếp bằng từng vai trò, không chỉ tin vào menu"],
        ["'Not seeing the menu' does NOT mean 'can't access it'", "Always try typing the URL directly with each role, don't just trust the menu"],
        ["『メニューが見えない』は『アクセスできない』を意味しない", "メニューを信じず、常に各ロールでURLを直接入力して確認する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: nút 'Xóa đơn' ẩn nhưng API vẫn cho gọi", en: "7. Situation 2: the 'Delete order' button is hidden but the API still allows it", ja: "7. シーン2：『注文削除』ボタンは非表示でもAPIは呼び出せてしまう" },
    blocks: [
      SITUATION("Trên giao diện Nhân viên kho, nút 'Xóa đơn' đã bị ẩn đúng như thiết kế — đội phát triển và tester đều yên tâm vì 'không thấy nút thì không bấm được'.", "On the Warehouse staff interface, the 'Delete order' button is correctly hidden as designed — both the dev team and testers feel safe because 'if you can't see the button, you can't click it'.",
        "Một tester mở DevTools/Postman, lấy token đăng nhập của Nhân viên kho, rồi gọi thẳng DELETE /api/orders/5821 — server vẫn xóa đơn hàng thành công, trả về 200 OK thay vì 403.",
        "A tester opens DevTools/Postman, grabs the Warehouse staff's login token, then calls DELETE /api/orders/5821 directly — the server still deletes the order successfully, returning 200 OK instead of 403.",
        "倉庫スタッフのUIでは、設計どおり『注文削除』ボタンが正しく非表示になっている——開発チームもテスターも『ボタンが見えなければ押せない』と安心していた。",
        "テスターがDevTools/Postmanを開き、倉庫スタッフのログイントークンを取得してDELETE /api/orders/5821を直接呼び出す——サーバーは403ではなく200 OKを返し、注文を実際に削除してしまった。"),
      SOLVE("Báo bug Critical ngay (mất dữ liệu đơn hàng thật), yêu cầu backend thêm kiểm tra vai trò tại middleware cho MỌI API xóa/sửa dữ liệu quan trọng, và bổ sung ca kiểm thử này vào bộ hồi quy bảo mật.", "Report a Critical bug immediately (real order data lost), require the backend to add role checks at the middleware level for EVERY API that deletes/edits important data, and add this case to the security regression suite.", "即座にCriticalバグとして報告（実際の注文データが失われる）し、重要なデータを削除/編集する全APIにミドルウェアレベルでロールチェックを追加するよう要求し、このケースをセキュリティ回帰テストスイートに追加する。"),
      P("Ví dụ này là minh chứng rõ ràng nhất cho quy tắc 'không bao giờ tin tưởng riêng giao diện'. Ẩn nút trên frontend chỉ giúp trải nghiệm gọn gàng cho người dùng thông thường, KHÔNG phải là biện pháp bảo mật. Kiểm thử phân quyền chuẩn phải luôn có bước gọi thẳng API bằng công cụ như Postman với token của vai trò thấp hơn, để xác nhận server thực sự từ chối — chứ không chỉ dựa vào việc giao diện không hiển thị lựa chọn đó.",
        "This example is the clearest proof of the rule 'never trust the UI alone'. Hiding a button on the frontend only keeps the experience tidy for regular users — it is NOT a security measure. Proper authorization testing must always include a step of calling the API directly with a tool like Postman using a lower role's token, to confirm the server truly rejects it — not just relying on the UI not showing that option.",
        "この例は『UIだけを信用してはいけない』という原則の最も明確な証拠です。フロントエンドでボタンを隠すのは通常ユーザーの体験を整えるだけであり、セキュリティ対策ではありません。適切な認可テストには、より低いロールのトークンを使ってPostmanのようなツールで直接APIを呼び出し、サーバーが本当に拒否するか確認するステップが必ず必要です——UIにその選択肢が表示されないことに頼るだけでは不十分です。"),
      IMG(m_hidden_btn, "Giao diện Nhân viên kho: nút 'Xóa đơn' đã bị ẩn đúng thiết kế", "Warehouse staff UI: the 'Delete order' button is correctly hidden by design", "倉庫スタッフのUI：『注文削除』ボタンは設計どおり非表示"),
      IMG(m_api_bug, "Gọi thẳng API DELETE bằng token Nhân viên kho — server vẫn trả 200 thay vì 403 (lỗ hổng)", "Calling the DELETE API directly with the Warehouse staff's token — the server still returns 200 instead of 403 (a hole)", "倉庫スタッフのトークンで直接DELETE APIを呼び出す——サーバーは403ではなく200を返してしまう（穴）"),
      IMG(m_jira, "Ticket lỗi vượt quyền tìm được nhờ gọi thẳng API bằng token vai trò thấp hơn", "The privilege-escalation bug ticket found by calling the API directly with a lower role's token", "低いロールのトークンで直接APIを呼び出して見つけた権限昇格バグのチケット"),
    ] },
  { heading: { vi: "8. Leo thang đặc quyền cơ bản & vượt quyền qua API", en: "8. Basic privilege escalation & bypassing authorization via API", ja: "8. 基本的な権限昇格とAPI経由の認可回避" },
    blocks: [
      P("Leo thang đặc quyền (privilege escalation) là khi một người dùng quyền thấp tìm cách có được quyền cao hơn mà lẽ ra họ không được cấp. Dạng cơ bản và phổ biến nhất mà người mới nên biết là: chèn thêm trường dữ liệu (field) không được yêu cầu vào request, với hy vọng server 'vô tình' chấp nhận nó.",
        "Privilege escalation is when a low-privilege user finds a way to obtain higher privileges they weren't supposed to have. The most basic and common form beginners should know is: sneaking an unrequested field into a request, hoping the server 'accidentally' accepts it.",
        "権限昇格（privilege escalation）とは、低権限のユーザーが本来与えられていないはずの高い権限を得る方法を見つけることです。初心者が知っておくべき最も基本的で一般的な形は、リクエストに要求されていないフィールドを紛れ込ませ、サーバーが『うっかり』それを受け入れることを期待するというものです。"),
      P("Ví dụ kinh điển trên ShopEasy: form 'Cập nhật hồ sơ' của Thành viên chỉ nên cho sửa họ tên, số điện thoại. Nếu backend nhận request và cập nhật TẤT CẢ trường có trong body mà không lọc kỹ, một Thành viên tò mò có thể tự chèn thêm \"role\": \"admin\" vào request — nếu server không chặn, tài khoản của họ lập tức có toàn quyền Admin.",
        "A classic example on ShopEasy: the Member's 'Update profile' form should only allow editing full name and phone number. If the backend receives the request and updates EVERY field present in the body without filtering carefully, a curious Member could sneak in \"role\": \"admin\" — if the server doesn't block it, their account instantly gets full Admin privileges.",
        "ShopEasyでの典型例：会員の『プロフィール更新』フォームは氏名と電話番号だけを編集できるはずです。バックエンドがリクエストを受け取り、注意深くフィルタせずにボディ内の全フィールドを更新すると、好奇心のある会員が\"role\": \"admin\"を紛れ込ませることができます——サーバーがブロックしなければ、そのアカウントは即座に完全な管理者権限を得てしまいます。"),
      CODE("json", "// Yeu cau goc cua Thanh vien (dung pham vi duoc phep)\nPATCH /api/users/8821/profile\n{ \"fullName\": \"Nguyen Van A\", \"phone\": \"0903118226\" }\n\n// Thanh vien to mo CHEN THEM truong 'role' -> leo thang dac quyen\nPATCH /api/users/8821/profile\n{ \"fullName\": \"Nguyen Van A\", \"phone\": \"0903118226\", \"role\": \"admin\" }\n// Neu server cap nhat moi truong trong body ma khong loc -> tai khoan tu thanh Admin!"),
      P("Với người mới, không cần biết hết mọi kỹ thuật tấn công nâng cao — chỉ cần nhớ 2 thao tác kiểm thử cơ bản: (1) thử chèn thêm trường nhạy cảm (role, isAdmin, permissions) vào các request cập nhật hồ sơ/tài khoản; (2) thử dùng token của vai trò thấp gọi API vốn chỉ dành cho vai trò cao hơn. Hai thao tác đơn giản này đã bắt được phần lớn lỗi vượt quyền cơ bản trong thực tế.",
        "As a beginner, you don't need to know every advanced attack technique — just remember 2 basic testing actions: (1) try sneaking sensitive fields (role, isAdmin, permissions) into profile/account update requests; (2) try using a lower role's token to call APIs meant only for higher roles. These two simple actions catch most basic real-world authorization-bypass bugs.",
        "初心者は高度な攻撃技法をすべて知る必要はありません——2つの基本的なテスト操作を覚えておけば十分です：(1) プロフィール/アカウント更新リクエストに機密フィールド（role、isAdmin、permissions）を紛れ込ませてみる、(2) より高いロール専用のAPIを低いロールのトークンで呼び出してみる。この2つのシンプルな操作だけで、実際の基本的な権限回避バグの大部分を捕まえられます。"),
      TIP("Luôn thử ca 'chèn field nhạy cảm' cho mọi form có thể tự cập nhật hồ sơ/tài khoản — đây là ca kiểm thử leo thang đặc quyền rẻ tiền nhất nhưng hiệu quả cao.", "Always try the 'sneak in a sensitive field' case for every self-service profile/account update form — it's the cheapest yet highest-yield privilege-escalation test case.", "自己プロフィール/アカウント更新フォームには常に『機密フィールドを紛れ込ませる』ケースを試そう——最も低コストながら効果の高い権限昇格テストケースです。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm kiểm thử phân quyền. Biết trước giúp bạn tìm lỗ hổng hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when doing authorization testing. Knowing them helps you find holes more efficiently without wasting too much time.",
        "初心者は認可テストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的に穴を見つけられます。"),
      PITFALL("Chỉ test qua giao diện (menu, nút bấm) mà quên gọi thẳng API — đây là nơi phần lớn lỗ hổng phân quyền thật sự ẩn náu.", "Only testing through the UI (menu, buttons) and forgetting to call the API directly — this is where most real authorization holes hide.", "UI（メニュー、ボタン）だけをテストし、直接APIを呼び出すのを忘れること——実際の認可の穴の多くはここに潜んでいます。"),
      PITFALL("Chỉ test với vai trò 'gần đúng' (ví dụ chỉ test Nhân viên kho trên trang kho) mà quên thử các vai trò 'thấp hơn hẳn' như Khách chưa đăng nhập.", "Only testing with the 'closest' role (e.g. only testing Warehouse staff on the warehouse page) while forgetting to try much-lower roles like a not-logged-in Guest.", "『近い』ロールだけをテストし（例：倉庫ページで倉庫スタッフだけをテスト）、未ログインのゲストのようなずっと低いロールを試すのを忘れること。"),
      TIP("Trước khi báo một ca vượt quyền là bug, xác nhận lại: bạn có ĐÚNG đang dùng token/tài khoản của vai trò thấp hơn không, hay vô tình vẫn dùng phiên đăng nhập Admin cũ — tránh báo nhầm.", "Before reporting an authorization-bypass case as a bug, double-check: are you REALLY using the lower role's token/account, or accidentally still using an old Admin session — avoid false reports.", "権限回避ケースをバグとして報告する前に、本当に低いロールのトークン/アカウントを使っているか、誤って古い管理者セッションを使っていないか再確認しましょう——誤報を避けるために。"),
      IMG(m_kanban, "Bảng theo dõi các lỗi phân quyền tìm được trong một sprint kiểm thử ShopEasy", "A board tracking authorization bugs found during a ShopEasy testing sprint", "ShopEasyのテストスプリントで見つかった認可バグの追跡ボード"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử đăng nhập & đăng ký cho người mới", "Login & registration testing for beginners", "kiem-thu-dang-nhap-dang-ky-cho-nguoi-moi", "初心者のためのログイン・登録テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử phân quyền qua app TMĐT ShopEasy: phân biệt authentication/authorization, cách dựng ma trận quyền theo vai trò (khách, thành viên, nhân viên kho, admin), thử truy cập URL không được phép, vì sao ẩn nút trên giao diện chưa đủ để chặn quyền, và cách phát hiện leo thang đặc quyền cơ bản qua API. Đây là kỹ năng nền tảng giúp bạn tìm được những lỗi bảo mật giá trị mà một tester chỉ test đúng vai trò được giao sẽ không bao giờ thấy.",
        "You just learned authorization testing through ShopEasy's e-commerce app: telling authentication and authorization apart, building a role permission matrix (guest, member, warehouse staff, admin), trying unauthorized URL access, why hiding a UI button isn't enough to enforce authorization, and how to catch basic privilege escalation via the API. This foundational skill helps you find valuable security bugs that a tester who only tests their assigned role would never see.",
        "ShopEasyのECアプリを通じて認可テストを学びました：認証と認可の区別、役割別権限マトリクスの構築（ゲスト、会員、倉庫スタッフ、管理者）、許可されていないURLへのアクセス試行、UIボタンを隠すだけでは権限制御に不十分な理由、APIを通じた基本的な権限昇格の見つけ方。割り当てられたロールだけでテストするテスターには決して見えない、価値あるセキュリティバグを見つけるための土台スキルです。"),
      P("Chặng tiếp theo, bạn nên học kiểm thử form/dữ liệu và kiểm thử âm để nghĩ ca kiểm thử toàn diện hơn, cùng cách viết bug report chuẩn cho lỗi bảo mật. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật — bao gồm cả kỹ thuật kiểm thử bảo mật cơ bản — một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn form/data testing and negative testing to design more thorough test cases, along with how to write a proper bug report for security bugs. If you want to learn properly from zero to hired with a mentor and real projects — including basic security testing techniques — a Tester course helps you progress fast and apply with confidence.",
        "次は、より網羅的なテストケースを設計するためのフォーム/データテストとネガティブテスト、そしてセキュリティバグの適切なバグレポートの書き方を学びましょう。指導者と実際の案件——基本的なセキュリティテスト技法も含む——でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const PHANQUYEN_01 = makeDoc({
  slug: "kiem-thu-phan-quyen-authorization-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử phân quyền",
  keywords: ["kiểm thử phân quyền", "authorization testing", "authentication vs authorization", "ma trận quyền theo vai trò", "leo thang đặc quyền"],
  coverLabel: "NGƯỜI MỚI · PHÂN QUYỀN · TMĐT",
  crumb: "Kiểm thử phân quyền (Authorization) cơ bản cho người mới",
  metaTitle: { vi: "Kiểm thử phân quyền (Authorization) cho người mới", en: "Authorization testing for beginners", ja: "初心者向け認可（Authorization）テスト" },
  metaDescription: {
    vi: "Kiểm thử phân quyền cho người mới: phân biệt authentication/authorization, ma trận quyền vai trò, chặn URL admin, ẩn nút vs API, ví dụ ShopEasy có hình.",
    en: "Authorization testing for beginners: authentication vs authorization, role permission matrix, blocking direct admin URL access, hidden buttons vs API calls, real ShopEasy examples with visuals.",
    ja: "初心者向け認可（authorization）テスト：認証との違い、役割別権限マトリクス、管理画面URLへの直接アクセス防止、ボタン非表示とAPI呼び出しの違い、ShopEasyの実例と図解。",
  },
  title: {
    vi: "Kiểm thử phân quyền (Authorization) cơ bản cho người mới: từ ma trận quyền tới leo thang đặc quyền (có trắc nghiệm)",
    en: "Basic authorization testing for beginners: from a permission matrix to privilege escalation (with quiz)",
    ja: "初心者のための基本的な認可（Authorization）テスト：権限マトリクスから権限昇格まで（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử phân quyền qua app TMĐT ShopEasy. Phân biệt authentication vs authorization, ma trận quyền theo vai trò (khách/thành viên/admin/nhân viên kho), truy cập URL không phép, vì sao ẩn nút chưa đủ, thao tác vượt quyền qua API, leo thang đặc quyền cơ bản, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn authorization testing through the ShopEasy e-commerce app. Authentication vs authorization, a role permission matrix (guest/member/admin/warehouse staff), unauthorized URL access, why hiding buttons isn't enough, bypassing authorization via API, basic privilege escalation, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyで認可テストを学ぶ。認証と認可の違い、役割別権限マトリクス（ゲスト/会員/管理者/倉庫スタッフ）、許可されていないURLアクセス、ボタン非表示が不十分な理由、API経由の権限回避、基本的な権限昇格、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử phân quyền cơ bản", steps: [
    { name: "Dựng ma trận quyền theo vai trò", text: "Liệt kê vai trò và chức năng, đánh dấu được phép/không." },
    { name: "Thử truy cập trực tiếp bằng từng vai trò", text: "Gõ thẳng URL và gọi thẳng API, không chỉ dựa vào menu/nút." },
    { name: "Thử leo thang đặc quyền cơ bản", text: "Chèn field nhạy cảm (role) vào request, dùng token vai trò thấp gọi API cao hơn." },
  ] },
  pages,
});

export const MB_PHANQUYEN_01 = [PHANQUYEN_01];
