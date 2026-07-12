// doc_ma_security_basic.mjs — BÀI MANUAL cấp NÂNG CAO: "Kiểm thử bảo mật cơ bản cho Tester
// (OWASP Top 10 nhìn từ QA)" — tester thủ công phát hiện lỗ hổng thường gặp trên sàn TMĐT
// ShopEasy: injection cơ bản, XSS, IDOR/phân quyền hỏng, lộ dữ liệu nhạy cảm, cấu hình sai,
// thiếu rate-limit; luôn kiểm an toàn, có trách nhiệm, không phá dữ liệu thật, không hướng
// dẫn tấn công thật. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "ecommerce", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: bảng OWASP Top 10 rút gọn nhìn từ góc Tester ──
const m_owasp = grid("OWASP Top 10 nhìn từ góc Tester (rút gọn)", ["Hạng mục OWASP", "Tester cần kiểm gì", "Ví dụ trên ShopEasy"], [
  ["A01 · Broken Access Control", "Đổi ID trên URL/API để xem/sửa dữ liệu người khác (IDOR)", "Đổi orderId 8842 → 8843 xem được đơn của khách khác"],
  ["A02 · Cryptographic Failures", "Kiểm HTTPS, dữ liệu nhạy cảm có hiện dạng plain-text không", "Số điện thoại, OTP hiện rõ trong response API"],
  ["A03 · Injection (SQL/XSS)", "Nhập ký tự đặc biệt an toàn, xem hệ thống có lộ lỗi hoặc phản chiếu nguyên văn", "Ô tìm kiếm trả lỗi SQL khi gõ dấu nháy đơn"],
  ["A05 · Security Misconfiguration", "Xem thông báo lỗi có lộ version, stack trace, đường dẫn server không", "Trang lỗi 500 hiện rõ 'PostgreSQL 14.2' và đường dẫn nội bộ"],
  ["A07 · Identification & Auth Failures", "Thử đăng nhập sai liên tục, xem có khoá tài khoản/giới hạn tốc độ không", "Đăng nhập sai 50 lần vẫn không bị khoá hay chặn"],
  ["A03 · XSS (Cross-Site Scripting)", "Nhập script vào ô nhập, xem có hiển thị lại nguyên văn (không mã hoá) không", "Ô tìm kiếm hiển thị lại thẻ script gõ vào mà không escape"],
  ["A09 · Security Logging Failures", "Kiểm hành động nhạy cảm (đổi mật khẩu, đơn hàng) có được ghi log không", "Đổi mật khẩu tài khoản mà không có log nào ghi lại"],
], { accent: "#dc2626", note: "Rút gọn theo góc nhìn tester thủ công — không thay thế báo cáo pentest chuyên sâu." });

// ── Mockup 2: màn hình chi tiết đơn hàng ShopEasy bị đổi orderId (IDOR) + annotate ──
const m_idor = browser("shopeasy.vn/orders/8843", [
  panel("ShopEasy · Chi tiết đơn hàng", [
    field(24, 20, 330, "Mã đơn hàng", "8843", "focus"),
    field(372, 20, 330, "Người nhận", "Trần Thị Mai", "normal"),
    field(24, 92, 330, "Số điện thoại", "0937 2xx xxx", "normal"),
    field(372, 92, 330, "Địa chỉ giao hàng", "12 Nguyễn Trãi, Q.5, TP.HCM", "normal"),
    field(24, 164, 330, "Tổng tiền", "1.250.000đ", "normal"),
    annotate(20, 12, 330, 62, "IDOR: sửa 8842→8843 trên URL, thấy đơn của KHÁCH KHÁC"),
    annotate(368, 12, 330, 62, "Đúng ra tài khoản đang đăng nhập không được xem đơn này"),
  ].join(""), { h: 232, accent: "#dc2626" }),
].join(""), { h: 288, title: "ShopEasy · Đang đăng nhập: Khách A", accent: "#dc2626" });

// ── Mockup 3: ô tìm kiếm ShopEasy phản chiếu script nguyên văn (XSS) + annotate ──
const m_xss = browser("shopeasy.vn/tim-kiem?q=...", [
  panel("ShopEasy · Kết quả tìm kiếm", [
    field(24, 20, 678, "Từ khoá tìm kiếm", "<script>alert('xss-test')</script>", "error"),
    field(24, 92, 678, "Nội dung hiển thị trên trang kết quả", "Không tìm thấy: <script>alert('xss-test')</script>", "error"),
    annotate(20, 12, 678, 62, "XSS phản chiếu: script hiện nguyên văn, không được mã hoá/escape"),
    annotate(20, 84, 678, 62, "Trình duyệt có thể THỰC THI đoạn script này khi tải trang"),
  ].join(""), { h: 168, accent: "#dc2626" }),
].join(""), { h: 224, title: "ShopEasy · TMĐT", accent: "#dc2626" });

// ── Mockup 4: ticket Jira của lỗi IDOR tìm được ──
const m_jira = jira({
  key: "SE-22071", title: "Đơn hàng: sửa orderId trên URL xem/tải được đơn của khách khác (IDOR)",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · tài khoản test Khách A"],
    ["Các bước", "1) Đăng nhập Khách A 2) Vào /orders/8842 (đơn của A) 3) Sửa URL thành /orders/8843 4) Xem nội dung trả về"],
    ["Kết quả mong đợi", "Hệ thống trả 403/404, không lộ dữ liệu đơn của Khách B"],
    ["Kết quả thực tế", "Trả về đầy đủ tên, SĐT, địa chỉ, tổng tiền của Khách B"],
    ["Bằng chứng", "video-se22071.mp4, response-8843.json (đã che số điện thoại khi báo cáo)"],
  ],
});

// ── Mockup 5: kanban các lỗ hổng bảo mật tìm được, theo mức độ ──
const m_kanban = kanban("Bảng theo dõi lỗ hổng bảo mật (ShopEasy · Security sweep Sprint 20)", [
  { name: "New", cards: [
    { key: "SE-22071", title: "IDOR: đổi orderId xem đơn khách khác", sev: "Critical" },
    { key: "SE-22079", title: "XSS phản chiếu ở ô tìm kiếm sản phẩm", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-22065", title: "Trang lỗi 500 lộ version DB & đường dẫn server", sev: "Medium" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-22050", title: "Đăng nhập sai không giới hạn số lần (thiếu rate-limit)", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-22011", title: "API giỏ hàng trả thừa trường nội bộ nhạy cảm", sev: "Medium" },
  ] },
]);

// ── Mockup 6: dashboard số liệu đợt kiểm bảo mật cơ bản ──
const m_dash = dashboard("Kết quả kiểm bảo mật cơ bản — ShopEasy · Sprint 20", [
  { label: "Chức năng đã kiểm", value: "34", sub: "theo checklist OWASP rút gọn", color: "#2563eb" },
  { label: "Lỗ hổng tìm được", value: "6", sub: "IDOR, XSS, misconfig, rate-limit", color: "#dc2626" },
  { label: "Mức Critical/High", value: "4", sub: "ưu tiên vá trước release", color: "#e11d48" },
  { label: "Đã báo Security team", value: "6/6", sub: "kèm bằng chứng, không tự khai thác sâu", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử bảo mật thủ công (manual security testing) khác gì với pentest chuyên nghiệp?",
  "How does manual security testing differ from a professional pentest?",
  "Kiểm thử bảo mật thủ công là việc tester (không chuyên sâu bảo mật) dùng kiến thức OWASP Top 10 cơ bản để dò các lỗi phổ biến trong lúc test chức năng bình thường: đổi ID trên URL, thử ký tự đặc biệt an toàn, xem thông báo lỗi có lộ thông tin không. Pentest chuyên nghiệp do chuyên gia bảo mật thực hiện, có phạm vi (scope) được ký kết rõ ràng, dùng công cụ chuyên dụng và có thể khai thác sâu hơn nhiều để đánh giá toàn diện. Tester nên coi kiểm thử bảo mật cơ bản là lớp phòng thủ đầu tiên, không thay thế pentest.",
  "Manual security testing is when a tester (not a security specialist) uses basic OWASP Top 10 knowledge to probe for common issues during normal functional testing: changing an ID in the URL, trying safe special characters, checking whether error messages leak information. A professional pentest is performed by security specialists under a clearly agreed scope, using dedicated tools, and can exploit issues far more deeply for a comprehensive assessment. Testers should treat basic security testing as a first line of defense, not a replacement for a pentest.",
  "手動セキュリティテストとプロのペネトレーションテストはどう違う？",
  "手動セキュリティテストとは、セキュリティ専門家でないテスターが、基本的なOWASP Top 10の知識を使い、通常の機能テストの最中によくある問題を探すことです：URL上のIDを変更する、安全な特殊文字を試す、エラーメッセージが情報を漏らしていないか確認するなど。一方プロのペネトレーションテストはセキュリティ専門家が明確に合意されたスコープのもとで、専用ツールを使い、はるかに深く脆弱性を悪用して総合的に評価します。テスターは基本的なセキュリティテストを最初の防衛ラインと捉え、ペネトレーションテストの代わりにはならないと理解すべきです。");
const faq2 = FAQ(
  "Tester không chuyên bảo mật có nên tự thử injection/XSS trên production không?",
  "Should a tester without security expertise try injection/XSS on production?",
  "Không. Mọi thử nghiệm liên quan injection, XSS hay đổi quyền truy cập chỉ nên thực hiện trên môi trường staging/test, với tài khoản test, phạm vi được quản lý/Security team cho phép rõ ràng. Chỉ dùng các ký tự/chuỗi thăm dò an toàn (ví dụ dấu nháy đơn, đoạn script cảnh báo vô hại) để QUAN SÁT phản ứng của hệ thống, tuyệt đối không chạy các câu lệnh xoá/sửa dữ liệu thật hay công cụ quét tự động trên production nếu chưa được phép bằng văn bản. Phát hiện dấu hiệu bất thường thì báo ngay cho Security team thay vì tự khai thác sâu thêm.",
  "No. Any testing involving injection, XSS, or access-control changes should only be done on a staging/test environment, with test accounts, within a scope clearly authorized by management or the Security team. Only use safe probe strings (like a single quote or a harmless alert script) to OBSERVE the system's reaction; never run real data-deleting/modifying statements or automated scanners against production without written permission. If you spot an anomaly, report it immediately to the Security team instead of digging deeper yourself.",
  "セキュリティ専門でないテスターは本番環境でインジェクション/XSSを試すべき？",
  "いいえ。インジェクション、XSS、アクセス権限の変更に関するテストは、必ずステージング/テスト環境で、テストアカウントを使い、管理者やセキュリティチームが明確に許可した範囲内でのみ行うべきです。安全な探索用文字列（シングルクォートや無害なアラートスクリプトなど）だけを使ってシステムの反応を『観察』し、書面での許可なしに実データを削除・変更する文や自動スキャナーを本番環境で実行してはいけません。異常を見つけたら自分でさらに深掘りせず、すぐにセキュリティチームへ報告しましょう。");
const faq3 = FAQ(
  "IDOR (Insecure Direct Object Reference) là gì và vì sao dễ bị bỏ sót?",
  "What is IDOR (Insecure Direct Object Reference) and why is it easily missed?",
  "IDOR là lỗ hổng xảy ra khi hệ thống dùng ID (đơn hàng, hồ sơ, hóa đơn...) trực tiếp trên URL/API để lấy dữ liệu, nhưng KHÔNG kiểm tra người đang đăng nhập có quyền xem ID đó hay không. Nó dễ bị bỏ sót vì với TÀI KHOẢN CỦA CHÍNH MÌNH mọi thứ vẫn chạy đúng, chỉ lộ ra khi tester chủ động đổi ID sang giá trị của người khác — điều mà kiểm thử chức năng thông thường (chỉ đi theo luồng đúng, đúng tài khoản) không bao giờ chạm tới. Đây là lý do IDOR luôn nằm trong nhóm Broken Access Control — hạng mục phổ biến và nghiêm trọng hàng đầu của OWASP Top 10.",
  "IDOR is a flaw that occurs when a system uses an ID (order, profile, invoice...) directly in a URL/API to fetch data but does NOT verify whether the logged-in user is authorized to view that ID. It's easily missed because everything works correctly when using YOUR OWN account — it only surfaces when a tester deliberately swaps the ID for someone else's value, something ordinary functional testing (following the correct flow with the correct account) never touches. This is why IDOR always falls under Broken Access Control — one of OWASP Top 10's most common and severe categories.",
  "IDOR（安全でない直接オブジェクト参照）とは何で、なぜ見逃されやすい？",
  "IDORとは、システムがURL/API上のID（注文、プロフィール、請求書など）を直接使ってデータを取得する際、ログイン中のユーザーがそのIDを閲覧する権限を持っているか確認しない、という脆弱性です。自分自身のアカウントでは全て正しく動作するため見逃されやすく、テスターが意図的にIDを他人の値に置き換えたときにのみ表面化します——これは通常の機能テスト（正しい流れ、正しいアカウントで進める）では決して触れない領域です。これがIDORが常にBroken Access Control（アクセス制御の不備）に分類される理由であり、OWASP Top 10の中でも特に多く深刻なカテゴリの一つです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "OWASP Top 10 dùng để làm gì trong công việc của tester?", en: "What is OWASP Top 10 used for in a tester's work?", ja: "テスターの仕事においてOWASP Top 10は何のために使われる？" },
    options: [
      { vi: "Danh sách 10 hạng mục rủi ro bảo mật phổ biến nhất, giúp tester biết ưu tiên kiểm gì", en: "A list of the 10 most common security risk categories, helping testers know what to check first", ja: "最も一般的なセキュリティリスクの上位10カテゴリのリストで、テスターが何を優先して確認すべきか分かる" },
      { vi: "Danh sách 10 trình duyệt cần test tương thích", en: "A list of the 10 browsers to test for compatibility", ja: "互換性テストが必要な10個のブラウザのリスト" },
      { vi: "Bộ 10 công cụ đo hiệu năng ứng dụng", en: "A set of 10 performance measurement tools", ja: "アプリケーションの性能を測る10個のツールセット" },
      { vi: "Quy trình 10 bước viết ca kiểm thử chức năng", en: "A 10-step process for writing functional test cases", ja: "機能テストケースを書くための10ステップの手順" },
    ], correct: 0,
    explain: { vi: "OWASP Top 10 là danh sách rủi ro bảo mật ứng dụng web phổ biến/nghiêm trọng nhất, giúp tester ưu tiên kiểm những góc dễ bị bỏ sót nhất.", en: "OWASP Top 10 is the list of the most common/severe web application security risks, helping testers prioritize the angles most easily missed.", ja: "OWASP Top 10はWebアプリケーションで最も一般的かつ深刻なセキュリティリスクのリストで、テスターが最も見落としやすい部分を優先できるようにします。" },
  }),
  mcq({
    q: { vi: "IDOR trên ShopEasy thể hiện qua hành động nào?", en: "Which action demonstrates IDOR on ShopEasy?", ja: "ShopEasyでIDORが現れるのはどの操作？" },
    options: [
      { vi: "Đăng nhập rồi xem đúng đơn hàng của chính mình", en: "Logging in and viewing your own order correctly", ja: "ログインして自分自身の注文を正しく閲覧する" },
      { vi: "Sửa orderId trên URL sang mã đơn của khách khác và vẫn xem được dữ liệu", en: "Editing the orderId in the URL to another customer's order and still being able to view the data", ja: "URLのorderIdを他の顧客の注文IDに変更しても、そのデータが見られてしまう" },
      { vi: "Nhập sai mật khẩu 3 lần rồi bị khoá tài khoản", en: "Entering the wrong password 3 times and getting locked out", ja: "パスワードを3回間違えてアカウントがロックされる" },
      { vi: "Tải trang chậm hơn bình thường vào giờ cao điểm", en: "The page loading slower than usual during peak hours", ja: "ピーク時にページの読み込みがいつもより遅くなる" },
    ], correct: 1,
    explain: { vi: "IDOR là khi đổi ID trực tiếp (orderId) sang giá trị của người khác mà hệ thống không kiểm tra quyền, vẫn trả về dữ liệu.", en: "IDOR occurs when directly swapping an ID (orderId) to another user's value and the system, lacking an authorization check, still returns the data.", ja: "IDORとは、IDを他人の値（orderId）に直接置き換えても、システムが権限を確認せずデータを返してしまう状態です。" },
  }),
  mcq({
    q: { vi: "Nguyên tắc AN TOÀN quan trọng nhất khi tester tự thử injection/XSS là gì?", en: "What is the most important SAFETY principle when a tester tries injection/XSS?", ja: "テスターがインジェクション/XSSを試す際、最も重要な『安全』原則は？" },
    options: [
      { vi: "Chỉ thử trên staging/test, tài khoản test, phạm vi được cho phép, không chạy lệnh phá dữ liệu thật", en: "Only try on staging/test, with test accounts, within an authorized scope, never running real data-destroying commands", ja: "ステージング/テスト環境、テストアカウント、許可された範囲内のみで試し、実データを破壊するコマンドは実行しない" },
      { vi: "Cứ thử trực tiếp trên production cho nhanh, sửa lại sau nếu lỡ hỏng", en: "Just try directly on production for speed, fix it later if something breaks", ja: "早く済ませるため本番環境で直接試し、壊れたら後で直せばよい" },
      { vi: "Dùng công cụ quét tự động toàn bộ hệ thống mà không cần xin phép", en: "Use an automated scanner across the whole system without asking permission", ja: "許可を得ずに自動スキャナーでシステム全体をスキャンする" },
      { vi: "Chia sẻ payload khai thác thật lên nhóm chat công khai để mọi người cùng thử", en: "Share real exploit payloads in a public chat group for everyone to try", ja: "実際の悪用ペイロードを公開のチャットグループで共有し皆で試す" },
    ], correct: 0,
    explain: { vi: "Kiểm thử bảo mật có trách nhiệm luôn giới hạn phạm vi staging/test, tài khoản test, được phép rõ ràng, và không phá dữ liệu thật.", en: "Responsible security testing always stays within staging/test, test accounts, clearly authorized scope, and never destroys real data.", ja: "責任あるセキュリティテストは常にステージング/テスト環境、テストアカウント、明確に許可された範囲内に限定し、実データを破壊しません。" },
  }),
  mcq({
    q: { vi: "Vì sao lỗi XSS phản chiếu ở ô tìm kiếm lại nguy hiểm?", en: "Why is a reflected XSS bug in a search box dangerous?", ja: "検索ボックスの反射型XSSはなぜ危険？" },
    options: [
      { vi: "Vì nó chỉ ảnh hưởng tốc độ tải trang", en: "Because it only affects page load speed", ja: "ページの読み込み速度にしか影響しないから" },
      { vi: "Vì trình duyệt có thể THỰC THI đoạn script được nhập vào thay vì chỉ hiển thị chữ, kẻ xấu có thể lợi dụng để đánh cắp phiên đăng nhập", en: "Because the browser can EXECUTE the entered script instead of just displaying text, which attackers could exploit to steal a login session", ja: "ブラウザが入力されたスクリプトを単なる文字として表示するのではなく『実行』してしまう可能性があり、攻撃者がログインセッションを盗むのに悪用できるから" },
      { vi: "Vì nó làm sai chính tả kết quả tìm kiếm", en: "Because it causes spelling errors in search results", ja: "検索結果の綴りが間違うから" },
      { vi: "Vì nó chỉ xảy ra khi mất kết nối mạng", en: "Because it only happens when the network connection is lost", ja: "ネットワーク接続が切れたときにしか起きないから" },
    ], correct: 1,
    explain: { vi: "Khi dữ liệu nhập vào bị hiển thị lại nguyên văn mà không mã hoá, trình duyệt có thể thực thi nó như mã thật, mở đường cho đánh cắp session/cookie.", en: "When input is reflected back unescaped, the browser can execute it as real code, opening the door to session/cookie theft.", ja: "入力がエスケープされずそのまま反射されると、ブラウザはそれを実際のコードとして実行し得るため、セッション/クッキーの窃取につながります。" },
  }),
  mcq({
    q: { vi: "Kiểm thử 'thiếu rate-limit' (giới hạn tốc độ) trên form đăng nhập nghĩa là làm gì?", en: "What does testing for 'missing rate-limit' on a login form mean?", ja: "ログインフォームの『レート制限不足』テストとは何をすることか？" },
    options: [
      { vi: "Đo tốc độ tải trang đăng nhập bằng công cụ đo hiệu năng", en: "Measuring the login page's load speed with a performance tool", ja: "性能測定ツールでログインページの読み込み速度を測ること" },
      { vi: "Kiểm tra bố cục giao diện ô đăng nhập trên nhiều màn hình", en: "Checking the login UI layout across different screen sizes", ja: "様々な画面サイズでログインUIのレイアウトを確認すること" },
      { vi: "Thử đăng nhập sai liên tiếp nhiều lần và xem hệ thống có khoá tài khoản/chặn IP hay CAPTCHA sau một ngưỡng không", en: "Repeatedly trying wrong logins and checking whether the system locks the account/blocks the IP or shows a CAPTCHA after a threshold", ja: "ログイン失敗を連続で何度も試し、一定回数を超えるとアカウントロック・IPブロック・CAPTCHA表示が行われるか確認すること" },
      { vi: "Kiểm tra màu sắc thông báo lỗi đăng nhập có đúng thiết kế không", en: "Checking whether the login error message color matches the design", ja: "ログインエラーメッセージの色がデザイン通りか確認すること" },
    ], correct: 2,
    explain: { vi: "Thiếu rate-limit khiến hệ thống không chặn số lần thử sai không giới hạn — mở đường cho tấn công dò mật khẩu (brute-force).", en: "Missing rate-limit means the system doesn't cap failed attempts — opening the door to password brute-force attacks.", ja: "レート制限がないと失敗回数に上限がなくなり、パスワードのブルートフォース攻撃を許してしまいます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử bảo mật cơ bản là việc tester thủ công (không cần chuyên gia bảo mật) chủ động dò các lỗ hổng phổ biến nhất theo OWASP Top 10 ngay trong lúc test chức năng: đổi ID để xem dữ liệu người khác (IDOR), nhập ký tự đặc biệt xem hệ thống có lộ lỗi hay phản chiếu script (injection/XSS), xem thông báo lỗi có lộ thông tin nhạy cảm không, và thử đăng nhập sai liên tục để kiểm rate-limit. Bài này bám sàn TMĐT ShopEasy: bạn học cách kiểm AN TOÀN, có trách nhiệm — chỉ trên môi trường được phép, không phá dữ liệu thật, không hướng dẫn tấn công thật. Nhiều mockup giao diện, 2 tình huống thật và trắc nghiệm cuối bài.",
        "Basic security testing means a manual tester (no security specialist required) actively probes for the most common OWASP Top 10 issues right during functional testing: swapping an ID to view someone else's data (IDOR), entering special characters to see if the system leaks errors or reflects a script (injection/XSS), checking whether error messages leak sensitive info, and repeatedly trying wrong logins to check rate-limiting. This article follows the ShopEasy e-commerce platform: you'll learn to test SAFELY and responsibly — only on authorized environments, never destroying real data, with no real attack instructions. Lots of UI mockups, two real situations, and a quiz at the end.",
        "基本的なセキュリティテストとは、セキュリティ専門家でない手動テスターが、機能テストの最中にOWASP Top 10の最も一般的な問題を積極的に探すことです：IDを変更して他人のデータを閲覧する（IDOR）、特殊文字を入力してシステムがエラーを漏らすかスクリプトを反射するか確認する（インジェクション/XSS）、エラーメッセージが機密情報を漏らしていないか確認する、ログイン失敗を繰り返してレート制限を確認するなど。本記事はECプラットフォームShopEasyに沿って、許可された環境のみで、実データを破壊せず、実際の攻撃手順は教えない、安全かつ責任あるテスト方法を学びます。図とシーンとクイズ付き。"),
      P("Chào bạn Tester! Ở cấp độ nâng cao, ngoài kiểm thử chức năng đúng/sai, bạn cần thêm một lớp tư duy: 'Nếu tôi là người dùng cố tình phá luật thì sao?'. Đó chính xác là góc nhìn của OWASP Top 10 — danh sách các rủi ro bảo mật ứng dụng web phổ biến và nghiêm trọng nhất, được cộng đồng bảo mật toàn cầu cập nhật định kỳ. Bạn không cần trở thành chuyên gia bảo mật để bắt được phần lớn các lỗ hổng cơ bản; chỉ cần biết đúng checklist và luôn kiểm tra AN TOÀN, có xin phép.",
        "Hi, Tester! At the advanced level, beyond checking correct/incorrect functionality, you need an extra layer of thinking: 'What if I were a user deliberately trying to break the rules?'. That's exactly the OWASP Top 10 perspective — the list of the most common and severe web application security risks, updated periodically by the global security community. You don't need to become a security expert to catch most basic vulnerabilities; you just need the right checklist and to always test SAFELY, with permission.",
        "テスターの皆さん、こんにちは！上級レベルでは、正しい/誤った機能をチェックするだけでなく、もう一段階の思考が必要です：『もし自分がルールをわざと破ろうとするユーザーだったら？』。これはまさにOWASP Top 10の視点です——世界のセキュリティコミュニティが定期的に更新する、Webアプリケーションで最も一般的かつ深刻なセキュリティリスクのリストです。基本的な脆弱性の多くを見つけるためにセキュリティ専門家になる必要はありません。正しいチェックリストを知り、常に許可を得た上で安全にテストすればよいのです。"),
      IMG(m_idor, "Màn hình sẽ test: chi tiết đơn hàng ShopEasy khi orderId bị đổi sang mã của khách khác (IDOR)", "Screen under test: ShopEasy order detail when the orderId is swapped to another customer's order (IDOR)", "テスト対象画面：orderIdを他の顧客の注文IDに変更したときのShopEasy注文詳細（IDOR）"),
      DEF("Kiểm thử bảo mật thủ công", "tester dùng kiến thức OWASP Top 10 cơ bản để chủ động dò lỗ hổng phổ biến ngay trong lúc test chức năng, trên môi trường được phép.",
        "a tester using basic OWASP Top 10 knowledge to actively probe for common vulnerabilities right during functional testing, on an authorized environment.",
        "テスターが基本的なOWASP Top 10の知識を使い、許可された環境で機能テストの最中に一般的な脆弱性を積極的に探すこと。"),
    ] },
  { heading: { vi: "2. OWASP Top 10 nhìn từ góc Tester (rút gọn)", en: "2. OWASP Top 10 from a Tester's angle (condensed)", ja: "2. テスターの視点から見たOWASP Top 10（要約）" },
    blocks: [
      P("OWASP Top 10 vốn viết cho lập trình viên và kỹ sư bảo mật, nhưng phần lớn hạng mục đầu bảng lại là những thứ tester THỦ CÔNG hoàn toàn có thể phát hiện mà không cần công cụ chuyên dụng — chỉ cần biết mình đang tìm gì. Bảng dưới đây rút gọn các hạng mục liên quan trực tiếp nhất tới công việc test hằng ngày, cùng ví dụ cụ thể trên ShopEasy.",
        "OWASP Top 10 was originally written for developers and security engineers, but most of its top categories are things a MANUAL tester can fully detect without specialized tools — you just need to know what to look for. The table below condenses the categories most directly relevant to everyday testing work, with concrete ShopEasy examples.",
        "OWASP Top 10はもともと開発者やセキュリティエンジニア向けに書かれていますが、上位カテゴリの多くは専用ツールなしでも手動テスターが完全に発見できるものです——何を探すべきか知ってさえいれば十分です。下の表は日常のテスト業務に最も直結するカテゴリを、ShopEasyの具体例とともに要約したものです。"),
      IMG(m_owasp, "Bảng OWASP Top 10 rút gọn cho tester, cùng ví dụ cụ thể trên ShopEasy", "Condensed OWASP Top 10 table for testers, with concrete ShopEasy examples", "テスター向けに要約したOWASP Top 10表とShopEasyの具体例"),
      P("Chú ý cột giữa: hầu hết đều là những thao tác bạn ĐÃ QUEN thuộc khi test chức năng — đổi giá trị trên URL, nhập ký tự lạ vào ô nhập, đọc kỹ thông báo lỗi. Điểm khác biệt duy nhất là bạn cần đặt câu hỏi bảo mật bên cạnh câu hỏi chức năng: không chỉ 'app có chạy đúng không' mà còn 'app có TỪ CHỐI đúng những gì nó không nên cho phép không'.",
        "Notice the middle column: most are actions you're ALREADY familiar with from functional testing — changing a value in the URL, entering unusual characters into a field, reading error messages carefully. The only difference is you need to ask a security question alongside the functional question: not just 'does the app work correctly' but also 'does the app correctly REJECT what it shouldn't allow'.",
        "中央の列に注目してください：ほとんどが機能テストで既に慣れている操作です——URLの値を変更する、項目に特殊な文字を入力する、エラーメッセージをよく読む。唯一の違いは、機能面の質問に加えてセキュリティの質問も投げかける必要があることです：『アプリが正しく動くか』だけでなく、『アプリが許可すべきでないものを正しく拒否するか』も。"),
    ] },
  { heading: { vi: "3. Vì sao tester thủ công cần biết bảo mật cơ bản", en: "3. Why manual testers need basic security knowledge", ja: "3. 手動テスターが基本的なセキュリティ知識を必要とする理由" },
    blocks: [
      P("Trên một sàn TMĐT như ShopEasy, hậu quả của một lỗ hổng bảo mật bị bỏ sót không chỉ là 'giao diện xấu' — nó có thể là hàng nghìn đơn hàng bị lộ, tài khoản khách hàng bị chiếm đoạt, hoặc uy tín thương hiệu sụp đổ chỉ sau một bài đăng trên mạng xã hội. Đội bảo mật chuyên trách thường không đủ người để kiểm hết mọi tính năng mới trước mỗi lần release, trong khi tester lại là người ở gần tính năng nhất, hiểu rõ luồng dữ liệu nhất.",
        "On an e-commerce platform like ShopEasy, the consequence of a missed security hole isn't just 'ugly UI' — it can be thousands of exposed orders, hijacked customer accounts, or a brand's reputation collapsing after a single social media post. Dedicated security teams often don't have enough people to check every new feature before each release, while testers are the ones closest to the feature, with the deepest understanding of its data flow.",
        "ShopEasyのようなECプラットフォームでは、見逃されたセキュリティホールの結果は『見た目が悪い』だけでは済みません——数千件の注文が漏洩したり、顧客アカウントが乗っ取られたり、SNSへの一つの投稿でブランドの信頼が崩壊することもあります。専任のセキュリティチームは各リリース前に全ての新機能をチェックするだけの人数がいないことが多く、一方でテスターは機能に最も近く、データの流れを最も深く理解している存在です。"),
      P("Đây cũng là lý do 'kiến thức bảo mật cơ bản' ngày càng trở thành yêu cầu bắt buộc ở cấp độ tester nâng cao/senior — nhiều nhà tuyển dụng hỏi thẳng: 'Cho một API lấy chi tiết đơn hàng theo ID, bạn kiểm bảo mật thế nào?'. Trả lời được bằng tư duy IDOR, injection, XSS thay vì chỉ nói 'em test đủ trường hợp' cho thấy bạn đang tư duy như một tester trưởng thành, không chỉ dừng ở happy path.",
        "This is also why 'basic security knowledge' is increasingly a requirement at the advanced/senior tester level — many interviewers ask directly: 'Given an API that fetches order details by ID, how would you test its security?'. Answering with IDOR, injection, and XSS thinking instead of just saying 'I test enough cases' shows you reason like a mature tester, not one who stops at the happy path.",
        "これが、上級/シニアレベルのテスターにとって『基本的なセキュリティ知識』がますます必須要件となっている理由でもあります——多くの採用担当者が直接こう質問します：『IDで注文詳細を取得するAPIがあるとして、セキュリティをどうテストしますか？』。『十分なケースをテストします』とだけ答えるのではなく、IDOR、インジェクション、XSSの思考で答えられれば、ハッピーパスで止まらない成熟したテスターとしての思考を示せます。"),
      P("Và quan trọng nhất: chi phí vá một lỗ hổng bảo mật ở giai đoạn test luôn rẻ hơn rất nhiều so với vá sau khi đã bị khai thác trên production — cả về tiền bạc, thời gian lẫn niềm tin của khách hàng. Đầu tư đúng mức vào checklist bảo mật cơ bản chính là bạn đang bảo vệ trực tiếp cả doanh nghiệp lẫn hàng nghìn khách hàng đang tin tưởng ShopEasy.",
        "And most importantly: the cost of fixing a security hole at the testing stage is always far cheaper than fixing it after it's been exploited in production — in money, time, and customer trust alike. Properly investing in a basic security checklist directly protects both the business and the thousands of customers who trust ShopEasy.",
        "そして最も重要なのは、テスト段階でセキュリティホールを修正するコストは、本番環境で悪用された後に修正するコストよりも、金銭的にも時間的にも顧客の信頼という面でも遥かに安いということです。基本的なセキュリティチェックリストに適切に投資することは、事業そのものとShopEasyを信頼する何千人もの顧客の両方を直接守ることになります。"),
    ] },
  { heading: { vi: "4. Nguyên tắc AN TOÀN khi kiểm thử bảo mật (đừng phá dữ liệu thật)", en: "4. SAFETY principles for security testing (don't destroy real data)", ja: "4. セキュリティテストの安全原則（実データを破壊しない）" },
    blocks: [
      P("Trước khi thực hành bất kỳ kỹ thuật nào ở các chương sau, bạn cần thuộc lòng nguyên tắc an toàn — đây là ranh giới giữa 'tester có trách nhiệm' và 'gây sự cố nghiêm trọng'.",
        "Before practicing any technique in the following chapters, you must know the safety principles by heart — this is the line between a 'responsible tester' and 'causing a serious incident'.",
        "以降の章でいずれかの技法を実践する前に、安全原則を必ず頭に入れておく必要があります——これが『責任あるテスター』と『重大なインシデントを引き起こす』の境界線です。"),
      STEP(1, "Xác định phạm vi (scope) và xin phép rõ ràng: chỉ test trên môi trường staging/test riêng, dùng tài khoản test, không đụng tới hệ thống production trừ khi có văn bản cho phép.", "Define the scope and get clear permission: only test on a dedicated staging/test environment, using test accounts; never touch production unless you have written authorization.", "スコープを明確にし、許可を得る：専用のステージング/テスト環境で、テストアカウントを使ってのみテストし、書面での許可がない限り本番環境には触れない。"),
      STEP(2, "Dùng dữ liệu/chuỗi thăm dò AN TOÀN, không phá huỷ: ví dụ dấu nháy đơn (') để xem lỗi, đoạn script cảnh báo vô hại (alert) để xem có bị thực thi không — tuyệt đối không chạy lệnh xoá/sửa dữ liệu thật.", "Use SAFE, non-destructive probe data/strings: e.g. a single quote (') to check for errors, a harmless alert script to check for execution — never run commands that delete or modify real data.", "安全で破壊的でないデータ/文字列を使う：例えばエラーを見るためのシングルクォート（'）、実行されるか見るための無害なalertスクリプトなど——実データを削除・変更するコマンドは絶対に実行しない。"),
      STEP(3, "Ghi lại bằng chứng có kiểm soát (ảnh chụp, log request/response) và báo ngay cho Security team/lead nếu phát hiện dấu hiệu bất thường — không tự ý khai thác sâu thêm.", "Record controlled evidence (screenshots, request/response logs) and report immediately to the Security team/lead if you spot anything unusual — never dig deeper on your own.", "統制された証拠（スクリーンショット、リクエスト/レスポンスのログ）を記録し、異常の兆候を見つけたら直ちにセキュリティチーム/リードに報告する——自分でさらに深掘りしない。"),
      PITFALL("Nghĩ rằng 'chỉ thử nhanh trên production cho tiện, không sao đâu'. Một câu lệnh thăm dò sai chỗ có thể xoá/sửa dữ liệu thật của hàng nghìn khách hàng — luôn xác nhận môi trường TRƯỚC KHI gõ bất kỳ ký tự thăm dò nào.", "Thinking 'I'll just quickly try it on production, it's fine'. A misplaced probe statement can delete/modify real data for thousands of customers — always confirm the environment BEFORE typing any probe character.", "『本番環境でちょっと試すだけだから大丈夫』と考えること。場所を誤った探索用の文が何千人もの顧客の実データを削除・変更する可能性があります——探索用の文字を入力する前に必ず環境を確認しましょう。"),
      TIP("Nếu công ty có kênh 'responsible disclosure' hoặc quy trình báo lỗ hổng riêng, luôn đi theo quy trình đó thay vì tự loan tin hay đăng công khai.", "If your company has a 'responsible disclosure' channel or a dedicated vulnerability-reporting process, always follow it instead of announcing or posting publicly on your own.", "会社に『責任ある開示』のチャンネルや専用の脆弱性報告プロセスがある場合は、独自に公開したり発表したりせず、必ずそのプロセスに従いましょう。"),
    ] },
  { heading: { vi: "5. Thực hành: kiểm thử IDOR / phân quyền hỏng trên đơn hàng", en: "5. Hands-on: testing IDOR / broken access control on orders", ja: "5. 実践：注文に対するIDOR/アクセス制御不備のテスト" },
    blocks: [
      P("IDOR (Insecure Direct Object Reference) là một trong những lỗ hổng dễ tìm nhất bằng tay và cũng dễ gây thiệt hại lớn nhất, vì nó lộ trực tiếp dữ liệu cá nhân của khách hàng khác. Ta thực hành trên trang chi tiết đơn hàng của ShopEasy.",
        "IDOR (Insecure Direct Object Reference) is one of the easiest vulnerabilities to find by hand and also one of the most damaging, since it directly exposes another customer's personal data. Let's practice on ShopEasy's order detail page.",
        "IDOR（安全でない直接オブジェクト参照）は、手作業で最も見つけやすい脆弱性の一つであると同時に、他の顧客の個人データを直接露出させるため最も大きな被害をもたらす脆弱性の一つでもあります。ShopEasyの注文詳細ページで実践してみましょう。"),
      STEP(1, "Đăng nhập bằng Tài khoản test A, đặt một đơn hàng thật (trên staging) để có orderId của riêng A, ví dụ /orders/8842.", "Log in with test Account A, place a real order (on staging) to get A's own orderId, e.g. /orders/8842.", "テストアカウントAでログインし、（ステージング上で）実際の注文をして自分自身のorderId、例えば/orders/8842を取得する。"),
      STEP(2, "Vẫn đang đăng nhập bằng A, sửa trực tiếp orderId trên URL/API sang một mã KHÔNG thuộc về A, ví dụ /orders/8843 (thuộc Khách B).", "While still logged in as A, directly edit the orderId in the URL/API to a code that does NOT belong to A, e.g. /orders/8843 (belonging to Customer B).", "Aでログインしたまま、URL/API上のorderIdをAのものではない番号、例えば/orders/8843（顧客Bのもの）に直接変更する。"),
      STEP(3, "Quan sát phản hồi: hệ thống có trả 403 Forbidden/404 Not Found (ĐÚNG) hay vẫn trả về đầy đủ dữ liệu của Khách B (LỖ HỔNG)?", "Observe the response: does the system return 403 Forbidden/404 Not Found (CORRECT) or does it still return Customer B's full data (VULNERABILITY)?", "レスポンスを観察する：システムが403 Forbidden/404 Not Foundを返す（正しい）か、それとも顧客Bのデータをそのまま返してしまう（脆弱性）か？"),
      STEP(4, "Lặp lại với vài đối tượng khác cùng mẫu (hồ sơ khách hàng /profile/{id}, hoá đơn /invoices/{id}) vì cùng một lỗi thiết kế backend thường lặp lại ở nhiều API.", "Repeat with a few other objects following the same pattern (customer profile /profile/{id}, invoice /invoices/{id}), since the same backend design flaw often repeats across multiple APIs.", "同じパターンの他のオブジェクト（顧客プロフィール/profile/{id}、請求書/invoices/{id}）でも繰り返す。同じバックエンド設計の欠陥は複数のAPIで繰り返されることが多いため。"),
      CODE("text", "KIEM THU IDOR - trang chi tiet don hang ShopEasy\nBuoc 1: Dang nhap Khach A -> tao don hang -> lay orderId = 8842\nBuoc 2: Van dang nhap Khach A -> goi GET /orders/8843 (khong phai cua A)\nKet qua mong doi : HTTP 403/404, khong tra du lieu\nKet qua thuc te   : HTTP 200, tra day du ten, SDT, dia chi, tong tien cua Khach B (BUG - IDOR)"),
      IMG(m_idor, "Đổi orderId 8842 → 8843 trên URL và vẫn xem được đơn hàng của khách khác — dấu hiệu IDOR", "Changing orderId 8842 → 8843 in the URL and still being able to view another customer's order — a sign of IDOR", "URLのorderIdを8842→8843に変更しても他の顧客の注文が閲覧できてしまう——IDORの兆候"),
      TRY("Thử tìm một API khác trên ứng dụng bạn đang test có dùng ID trực tiếp trên URL (giỏ hàng, hồ sơ, mã giảm giá) và đề xuất 1 ca kiểm IDOR cho nó.", "Try to find another API in the app you're testing that uses a direct ID in the URL (cart, profile, discount code) and propose one IDOR test case for it.", "テスト中のアプリで、URLに直接IDを使う別のAPI（カート、プロフィール、クーポンコード）を探し、IDORのテストケースを1つ提案してみよう。"),
    ] },
  { heading: { vi: "6. Thực hành: injection cơ bản — kiểm an toàn, không phá dữ liệu", en: "6. Hands-on: basic injection — testing safely, without destroying data", ja: "6. 実践：基本的なインジェクション — データを壊さず安全にテストする" },
    blocks: [
      P("Injection xảy ra khi ứng dụng đưa thẳng dữ liệu người dùng nhập vào một câu lệnh (SQL, câu lệnh hệ thống...) mà không kiểm tra/escape đúng cách. Tester thủ công không cần viết câu lệnh SQL tấn công thật — chỉ cần dùng vài ký tự THĂM DÒ an toàn để quan sát phản ứng bất thường.",
        "Injection occurs when an application feeds user-entered data directly into a command (SQL, a system command...) without properly validating/escaping it. A manual tester doesn't need to write real attacking SQL statements — just a few SAFE probe characters to observe an abnormal reaction.",
        "インジェクションとは、アプリケーションがユーザーが入力したデータを、適切な検証/エスケープなしにコマンド（SQL、システムコマンドなど）へそのまま渡してしまうことです。手動テスターは実際に攻撃用のSQL文を書く必要はなく、いくつかの安全な探索用文字を使って異常な反応を観察するだけで十分です。"),
      STEP(1, "Chọn một ô nhập liên quan tới truy vấn dữ liệu, ví dụ ô tìm kiếm sản phẩm hoặc ô lọc theo mã giảm giá trên ShopEasy.", "Pick an input field related to a data query, e.g. ShopEasy's product search box or discount-code filter field.", "データ照会に関わる入力項目、例えばShopEasyの商品検索ボックスやクーポンコードのフィルター欄を選ぶ。"),
      STEP(2, "Nhập một dấu nháy đơn (') hoặc chuỗi thăm dò an toàn tương tự vào ô đó — đây chỉ là ký tự thăm dò, KHÔNG phải câu lệnh phá dữ liệu.", "Enter a single quote (') or a similarly safe probe string into that field — this is only a probe character, NOT a data-destroying statement.", "その項目にシングルクォート（'）または同様の安全な探索用文字列を入力する——これは単なる探索用文字であり、データを破壊する文ではない。"),
      STEP(3, "Quan sát kết quả: trang có hiện lỗi kỹ thuật (SQL syntax error, tên bảng, tên cột) thay vì thông báo thân thiện, hay xử lý êm ả (ĐÚNG)?", "Observe the result: does the page show a technical error (SQL syntax error, table/column names) instead of a friendly message, or does it handle it gracefully (CORRECT)?", "結果を観察する：ページがフレンドリーなメッセージの代わりに技術的なエラー（SQL構文エラー、テーブル名/カラム名）を表示するか、それとも正常に処理される（正しい）か？"),
      STEP(4, "Nếu thấy lỗi kỹ thuật lộ ra, DỪNG LẠI ngay, chụp bằng chứng và báo Security team — không tự thử thêm các chuỗi khai thác sâu hơn.", "If a technical error appears, STOP immediately, capture the evidence, and report to the Security team — do not try deeper exploit strings yourself.", "技術的なエラーが表示されたら直ちに停止し、証拠を記録してセキュリティチームに報告する——自分でさらに深いエクスプロイト文字列を試さない。"),
      CODE("text", "KIEM THU INJECTION CO BAN - o tim kiem san pham ShopEasy (moi truong staging)\nChuoi tham do an toan: '   (mot dau nhay don)\nKet qua mong doi : he thong bao 'khong tim thay san pham' nhu binh thuong\nKet qua thuc te (neu co loi): trang hien 'SQL syntax error near ... products WHERE name LIKE' (BUG - loi lo qua chi tiet ky thuat)\n=> Neu thay dau hieu nay: DUNG LAI, chup bang chung, bao Security team, KHONG tu thu them chuoi khai thac."),
      PITFALL("Tự ý thử các câu lệnh SQL phức tạp (UNION SELECT, DROP TABLE...) để 'xem thử' — đây không còn là kiểm thử an toàn mà là hành vi khai thác thật, có thể phá huỷ dữ liệu và vi phạm quy định công ty/pháp luật.", "Trying complex SQL statements (UNION SELECT, DROP TABLE...) yourself just to 'see what happens' — this is no longer safe testing but real exploitation, which can destroy data and violate company policy or the law.", "『どうなるか見てみたい』という理由で複雑なSQL文（UNION SELECT、DROP TABLEなど）を自分で試すこと——これはもはや安全なテストではなく実際の悪用行為であり、データを破壊し会社の規定や法律に違反する可能性があります。"),
    ] },
  { heading: { vi: "7. Thực hành: XSS phản chiếu trên ô tìm kiếm", en: "7. Hands-on: reflected XSS in the search box", ja: "7. 実践：検索ボックスでの反射型XSSテスト" },
    blocks: [
      P("XSS (Cross-Site Scripting) phản chiếu xảy ra khi dữ liệu bạn nhập được hiển thị lại nguyên văn trên trang mà không được mã hoá (escape) — nghĩa là trình duyệt có thể hiểu nó là MÃ chứ không phải chữ thường. Ta thực hành trên ô tìm kiếm của ShopEasy.",
        "Reflected XSS (Cross-Site Scripting) occurs when data you enter is echoed back on the page unescaped — meaning the browser can interpret it as CODE rather than plain text. Let's practice on ShopEasy's search box.",
        "反射型XSS（クロスサイトスクリプティング）とは、入力したデータがエスケープされずにそのままページに表示されることです——つまりブラウザがそれを単なる文字ではなく『コード』として解釈してしまう可能性があるということです。ShopEasyの検索ボックスで実践してみましょう。"),
      STEP(1, "Vào trang tìm kiếm sản phẩm ShopEasy (môi trường staging), nhập một chuỗi script vô hại vào ô tìm kiếm, ví dụ <script>alert('xss-test')</script>.", "Go to ShopEasy's product search page (staging environment) and enter a harmless script string into the search box, e.g. <script>alert('xss-test')</script>.", "ShopEasyの商品検索ページ（ステージング環境）にアクセスし、検索ボックスに無害なスクリプト文字列、例えば<script>alert('xss-test')</script>を入力する。"),
      STEP(2, "Bấm tìm kiếm, quan sát trang kết quả: đoạn script có được HIỂN THỊ NHƯ CHỮ THƯỜNG (an toàn) hay TRÌNH DUYỆT THỰC THI nó, ví dụ hiện hộp thoại alert (LỖ HỔNG)?", "Click search and observe the result page: is the script shown AS PLAIN TEXT (safe), or does THE BROWSER EXECUTE it, e.g. showing an alert popup (VULNERABILITY)?", "検索をクリックし、結果ページを観察する：スクリプトが単なるテキストとして表示される（安全）か、それともブラウザがそれを実行してしまう、例えばalertのポップアップが表示される（脆弱性）か？"),
      STEP(3, "Nếu chỉ hiển thị chữ (ví dụ dạng &lt;script&gt;) thì hệ thống đã mã hoá đúng — ĐẠT. Nếu hộp thoại bật lên hoặc mã HTML bị chèn thật vào trang, đó là XSS thật.", "If it only shows as text (e.g. &lt;script&gt;), the system has escaped it correctly — PASS. If a dialog pops up or real HTML gets injected into the page, that's a real XSS.", "テキストとしてのみ表示される（例：&lt;script&gt;）場合、システムは正しくエスケープしている——合格。ダイアログが表示されたり実際のHTMLがページに挿入されたりする場合は、本物のXSSです。"),
      STEP(4, "Ghi bằng chứng (ảnh chụp hộp thoại/mã nguồn trang) và báo Security team ngay, đề xuất mã hoá đầu ra (output encoding) ở mọi nơi hiển thị lại dữ liệu người dùng.", "Record evidence (screenshot of the dialog/page source) and report to the Security team immediately, proposing output encoding everywhere user data is echoed back.", "証拠（ダイアログ/ページソースのスクリーンショット）を記録し、直ちにセキュリティチームに報告し、ユーザーデータを表示する全ての箇所での出力エスケープを提案する。"),
      CODE("text", "KIEM THU XSS PHAN CHIEU - o tim kiem ShopEasy (moi truong staging)\nChuoi tham do vo hai: <script>alert('xss-test')</script>\nKet qua mong doi : trang hien nguyen van dang CHU (da ma hoa), khong co hop thoai bat len\nKet qua thuc te (neu loi): hop thoai alert('xss-test') bat len that (BUG - XSS phan chieu, Critical/High)"),
      IMG(m_xss, "Ô tìm kiếm ShopEasy hiển thị lại script nguyên văn, không mã hoá — dấu hiệu XSS phản chiếu", "ShopEasy's search box echoes the script back unescaped — a sign of reflected XSS", "ShopEasyの検索ボックスがスクリプトをエスケープせずそのまま表示——反射型XSSの兆候"),
      TIP("Chuỗi thăm dò script chỉ nên chứa hàm alert() vô hại để QUAN SÁT, không chèn mã đọc cookie/gửi dữ liệu đi nơi khác — đó đã là ranh giới của khai thác thật.", "The probe script string should only contain a harmless alert() to OBSERVE — never code that reads cookies or sends data elsewhere, which crosses into real exploitation.", "探索用のスクリプト文字列は観察のための無害なalert()のみに留めるべきで、クッキーを読み取ったり他所へデータを送信したりするコードは実際の悪用の域に入ります。"),
    ] },
  { heading: { vi: "8. Lộ dữ liệu nhạy cảm, cấu hình sai & thiếu rate-limit", en: "8. Sensitive data exposure, misconfiguration & missing rate-limit", ja: "8. 機密データの露出、設定ミス、レート制限の不足" },
    blocks: [
      P("Ba nhóm lỗi này thường bị bỏ sót vì chúng không hiện ra ở luồng 'đúng' bình thường, mà lộ ra qua các trường hợp lỗi/biên hoặc hành vi lặp lại — đúng vùng tester nâng cao cần chủ động thử.",
        "These three groups of bugs are often missed because they don't appear in the normal 'correct' flow, but surface through error/edge cases or repeated behavior — exactly the territory an advanced tester needs to actively probe.",
        "これら3つのバグ群は通常の『正しい』フローには現れず、エラー/境界ケースや繰り返し行動を通じて表面化するため見逃されがちです——まさに上級テスターが積極的に探るべき領域です。"),
      P("Lộ dữ liệu nhạy cảm: kiểm tra response của API (dùng tab Network của trình duyệt) xem có trả về nhiều hơn những gì giao diện hiển thị không — ví dụ API lấy thông tin giỏ hàng nhưng response lại kèm cả trường nội bộ như mã giảm giá của người khác hay số dư ví đầy đủ. Cấu hình sai: đọc kỹ mọi thông báo lỗi (trang 404/500, lỗi mạng) xem có lộ số phiên bản phần mềm, tên server nội bộ, hay đường dẫn file hệ thống không — dấu hiệu hệ thống đang chạy ở chế độ debug/development ngay trên production.",
        "Sensitive data exposure: check the API response (using the browser's Network tab) to see if it returns more than what the UI displays — e.g. a cart-info API whose response also includes internal fields like another user's discount code or a full wallet balance. Misconfiguration: read every error message carefully (404/500 pages, network errors) to see if it leaks a software version number, internal server name, or system file path — a sign the system is running in debug/development mode right on production.",
        "機密データの露出：APIのレスポンス（ブラウザのNetworkタブを使用）を確認し、UIが表示する以上のものを返していないか調べます——例えばカート情報のAPIが、他人のクーポンコードや全額のウォレット残高といった内部フィールドまで含めて返している場合など。設定ミス：全てのエラーメッセージ（404/500ページ、ネットワークエラー）をよく読み、ソフトウェアのバージョン番号、内部サーバー名、システムファイルのパスが漏れていないか確認します——本番環境がデバッグ/開発モードで動いている兆候です。"),
      SITUATION("Bạn cố tình gõ sai một tham số trên URL của API lấy chi tiết đơn hàng để xem trang lỗi hiển thị gì.", "You deliberately mistype a parameter in the order-detail API's URL to see what the error page displays.",
        "Trang lỗi 500 hiện toàn bộ stack trace: 'PostgreSQL 14.2, connection to db-prod-01.internal.shopeasy.vn failed at OrderService.java:142' — lộ rõ phiên bản DB, tên server nội bộ và cấu trúc mã nguồn cho bất kỳ ai truy cập được trang lỗi.",
        "The 500 error page displays the full stack trace: 'PostgreSQL 14.2, connection to db-prod-01.internal.shopeasy.vn failed at OrderService.java:142' — clearly exposing the DB version, internal server name, and source code structure to anyone who reaches the error page.",
        "注文詳細APIのURLのパラメータをわざと誤って入力し、エラーページに何が表示されるか確認する。",
        "500エラーページに完全なスタックトレースが表示される：『PostgreSQL 14.2, connection to db-prod-01.internal.shopeasy.vn failed at OrderService.java:142』——エラーページにアクセスできる誰にでもDBのバージョン、内部サーバー名、ソースコード構造が明確に露出している。"),
      SOLVE("Báo bug mức High/Critical ngay, đề xuất cấu hình trang lỗi thân thiện (generic error page) cho môi trường production, tắt hiển thị stack trace chi tiết, và bổ sung ca kiểm 'đọc kỹ mọi thông báo lỗi' vào checklist regression cho mọi API mới.", "Report a High/Critical bug immediately, propose configuring a friendly generic error page for production, disabling detailed stack-trace display, and adding a 'read every error message carefully' case to the regression checklist for every new API.", "直ちにHigh/Criticalバグとして報告し、本番環境向けに親切な汎用エラーページを設定し詳細なスタックトレース表示を無効化することを提案し、新しいAPIすべての回帰チェックリストに『全てのエラーメッセージをよく読む』ケースを追加する。"),
      P("Thiếu rate-limit: thử đăng nhập sai mật khẩu liên tiếp nhiều lần (trên tài khoản test, môi trường staging) và đếm xem sau bao nhiêu lần hệ thống bắt đầu khoá tài khoản, chặn IP, hoặc yêu cầu CAPTCHA. Nếu bạn có thể thử hàng trăm lần mà không bị chặn, đó là dấu hiệu hệ thống dễ bị tấn công dò mật khẩu hàng loạt (brute-force) — một trong những cách kẻ xấu chiếm tài khoản khách hàng phổ biến nhất.",
        "Missing rate-limit: repeatedly try the wrong password (on a test account, staging environment) and count after how many attempts the system starts locking the account, blocking the IP, or requiring a CAPTCHA. If you can try hundreds of times without being blocked, that's a sign the system is vulnerable to mass password-guessing (brute-force) — one of the most common ways attackers hijack customer accounts.",
        "レート制限の不足：（テストアカウント、ステージング環境で）誤ったパスワードを繰り返し試し、何回でシステムがアカウントロック、IPブロック、CAPTCHA要求を開始するか数えます。何百回試してもブロックされない場合、それはシステムが大量パスワード推測（ブルートフォース）攻撃に脆弱である兆候です——攻撃者が顧客アカウントを乗っ取る最も一般的な方法の一つです。"),
      IMG(m_kanban, "Bảng theo dõi các lỗ hổng bảo mật tìm được qua kiểm thử thủ công (ShopEasy · Security sweep)", "A board tracking security vulnerabilities found via manual testing (ShopEasy · Security sweep)", "手動テストで発見されたセキュリティ脆弱性を追跡するボード（ShopEasy・セキュリティスイープ）"),
    ] },
  { heading: { vi: "9. Tình huống: đổi orderId trên URL xem đơn người khác", en: "9. Situation: changing the orderId in the URL to view someone else's order", ja: "9. シーン：URLのorderIdを変更して他人の注文を閲覧する" },
    blocks: [
      SITUATION("Đội chỉ test chức năng 'xem chi tiết đơn hàng' với đúng tài khoản đã đặt đơn — mọi ca đều pass, ai cũng yên tâm release tính năng theo dõi đơn hàng mới.", "The team only tests 'view order detail' with the exact account that placed the order — every case passes, everyone feels safe releasing the new order-tracking feature.",
        "Một khách hàng tò mò thử sửa số cuối trong URL đơn hàng của mình (đổi 8842 thành 8843) và bất ngờ xem được đầy đủ tên, số điện thoại, địa chỉ của một khách hàng hoàn toàn khác. Khách chụp màn hình và đăng lên mạng xã hội, kèm bình luận nghi ngờ về bảo mật của ShopEasy.",
        "A curious customer tries editing the last digit of their own order URL (changing 8842 to 8843) and unexpectedly sees the full name, phone number, and address of a completely different customer. The customer takes a screenshot and posts it on social media, along with comments questioning ShopEasy's security.",
        "チームは注文をした本人のアカウントでのみ『注文詳細を見る』機能をテスト——全ケース合格、安心して新しい注文追跡機能をリリース。",
        "好奇心のある顧客が自分の注文URLの最後の数字を変更してみる（8842を8843に変更）と、思いがけず全く別の顧客の氏名・電話番号・住所が丸ごと見えてしまう。顧客はスクリーンショットを撮りSNSに投稿し、ShopEasyのセキュリティを疑うコメントを添える。"),
      SOLVE("Báo bug Critical ngay lập tức (rò rỉ dữ liệu cá nhân hàng loạt), yêu cầu backend kiểm tra quyền sở hữu (ownership check) trước khi trả dữ liệu cho MỌI API dùng ID trực tiếp, và bổ sung ca kiểm IDOR vào bộ hồi quy bảo mật cho toàn bộ tính năng liên quan tới dữ liệu cá nhân.", "Report a Critical bug immediately (mass personal-data leak), require the backend to add an ownership check before returning data for EVERY API that uses a direct ID, and add IDOR test cases to the security regression suite for every feature involving personal data.", "直ちにCriticalバグとして報告し（大量の個人データ漏洩）、IDを直接使うすべてのAPIでデータを返す前に所有者チェックを行うようバックエンドに要求し、個人データに関わるすべての機能のセキュリティ回帰テストスイートにIDORのテストケースを追加する。"),
      IMG(m_jira, "Ticket lỗi IDOR tìm được nhờ chủ động đổi orderId trên URL", "The IDOR bug ticket found by proactively changing the orderId in the URL", "URLのorderIdを積極的に変更して見つけたIDORバグのチケット"),
      RECAP(["IDOR là lỗ hổng dễ bỏ sót nhất vì tài khoản của chính bạn luôn chạy đúng", "Mọi API dùng ID trực tiếp trên URL/API đều cần được kiểm IDOR, không chỉ trang chính"],
        ["IDOR is the easiest vulnerability to miss because your own account always works correctly", "Every API using a direct ID in the URL/API needs an IDOR check, not just the main page"],
        ["IDORは自分自身のアカウントでは常に正しく動くため最も見逃されやすい脆弱性", "URL/APIで直接IDを使うすべてのAPIはメインページだけでなくIDORチェックが必要"]),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử phân quyền (Authorization) cho người mới", "Authorization testing for beginners", "kiem-thu-phan-quyen-authorization-cho-nguoi-moi", "初心者のための権限テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Kiểm thử thông báo & validation cho người mới", "Testing messages & validation for beginners", "kiem-thu-thong-bao-validation-cho-nguoi-moi", "初心者のためのメッセージ・バリデーションテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử bảo mật cơ bản qua ứng dụng TMĐT ShopEasy: nhìn OWASP Top 10 từ góc tester, nguyên tắc AN TOÀN bắt buộc (chỉ staging, chỉ chuỗi thăm dò vô hại, không phá dữ liệu thật), và thực hành từng bước với IDOR, injection cơ bản, XSS phản chiếu, lộ dữ liệu nhạy cảm, cấu hình sai và thiếu rate-limit. Hai tình huống thật cho thấy chỉ một thao tác đổi ID trên URL cũng có thể lộ dữ liệu hàng nghìn khách hàng nếu không được kiểm kỹ. Đây là kỹ năng nâng cao giúp bạn trở thành tester toàn diện hơn, không chỉ dừng ở kiểm thử chức năng.",
        "You just learned how to perform basic security testing through the ShopEasy e-commerce app: viewing OWASP Top 10 from a tester's angle, the mandatory SAFETY principles (staging only, harmless probe strings only, never destroying real data), and step-by-step practice with IDOR, basic injection, reflected XSS, sensitive data exposure, misconfiguration, and missing rate-limit. Two real situations showed that a single ID-swap on a URL can leak thousands of customers' data if not carefully tested. This advanced skill helps you become a more well-rounded tester, not one who stops at functional testing.",
        "ShopEasyのECアプリを通じて基本的なセキュリティテストの方法を学びました：テスターの視点から見たOWASP Top 10、必須の安全原則（ステージング環境のみ、無害な探索用文字列のみ、実データを破壊しない）、そしてIDOR、基本的なインジェクション、反射型XSS、機密データの露出、設定ミス、レート制限の不足に対する段階的な実践。2つの実例は、URL上でIDを一つ変更するだけでも、慎重にテストしなければ何千人もの顧客のデータが漏洩し得ることを示しました。これは機能テストだけで止まらない、より総合的なテスターになるための上級スキルです。"),
      P("Chặng tiếp theo, bạn nên học sâu hơn về kiểm thử phân quyền (authorization) theo vai trò và kiểm thử thông báo/validation để có nền tảng bảo mật vững chắc trước khi tiếp cận các công cụ pentest chuyên dụng. Nếu muốn học bài bản từ con số 0 tới đi làm, có phần thực chiến kiểm thử chức năng lẫn tư duy bảo mật cơ bản cùng người hướng dẫn và dự án thật, một khoá học Tester chuyên nghiệp sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí nâng cao.",
        "Next, you should dive deeper into role-based authorization testing and message/validation testing to build a solid security foundation before moving on to dedicated pentest tools. If you want to learn properly from zero to hired, with hands-on functional testing plus basic security thinking, a mentor, and real projects, a professional Tester course will help you progress fast and apply confidently for advanced roles.",
        "次は、専用のペネトレーションテストツールに進む前に、堅固なセキュリティの土台を築くため、役割ベースの権限テストとメッセージ/バリデーションテストをより深く学ぶとよいでしょう。指導者と実際の案件とともに、機能テストの実践と基本的なセキュリティ思考を含め、ゼロから就職までしっかり学びたいなら、プロフェッショナルなテスターコースが速い成長と上級職への自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const MA_SECURITY_DOC = makeDoc({
  slug: "kiem-thu-bao-mat-co-ban-owasp-cho-tester",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử bảo mật",
  keywords: ["kiểm thử bảo mật", "OWASP Top 10", "IDOR", "XSS", "injection", "kiểm thử bảo mật cơ bản cho tester"],
  coverLabel: "NÂNG CAO · BẢO MẬT OWASP · TMĐT",
  crumb: "Kiểm thử bảo mật cơ bản cho Tester (OWASP Top 10)",
  metaTitle: { vi: "Kiểm thử bảo mật cơ bản OWASP cho Tester", en: "Basic OWASP security testing for testers", ja: "テスター向け基本OWASPセキュリティテスト" },
  metaDescription: {
    vi: "Kiểm thử bảo mật cơ bản cho tester theo OWASP Top 10: phát hiện IDOR, XSS, injection trên sàn ShopEasy — an toàn, có trách nhiệm, có hình và trắc nghiệm.",
    en: "Basic security testing for testers using OWASP Top 10: detecting IDOR, XSS, injection, data exposure, and misconfiguration on the ShopEasy platform — safe, responsible, with visuals and a quiz.",
    ja: "OWASP Top 10に基づくテスター向け基本セキュリティテスト：ShopEasyでIDOR、XSS、インジェクション、データ露出、設定ミスを安全かつ責任を持って発見する方法。図とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử bảo mật cơ bản cho Tester: OWASP Top 10 nhìn từ QA trên sàn TMĐT (có trắc nghiệm)",
    en: "Basic security testing for testers: OWASP Top 10 from a QA angle on an e-commerce platform (with quiz)",
    ja: "テスターのための基本セキュリティテスト：ECプラットフォームにおけるQA視点のOWASP Top 10（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao cho tester: kiểm thử bảo mật cơ bản theo OWASP Top 10 qua sàn TMĐT ShopEasy. Phát hiện IDOR/phân quyền hỏng, injection cơ bản, XSS phản chiếu, lộ dữ liệu nhạy cảm, cấu hình sai và thiếu rate-limit — luôn AN TOÀN, có trách nhiệm, không phá dữ liệu thật. Nhiều mockup giao diện, 2 tình huống thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article for testers: basic security testing using OWASP Top 10 through the ShopEasy e-commerce platform. Detect IDOR/broken access control, basic injection, reflected XSS, sensitive data exposure, misconfiguration, and missing rate-limit — always SAFELY and responsibly, never destroying real data. Many UI mockups, two real situations, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "テスター向け上級記事：ShopEasy ECプラットフォームでOWASP Top 10に基づく基本セキュリティテストを学ぶ。IDOR/アクセス制御の不備、基本的なインジェクション、反射型XSS、機密データの露出、設定ミス、レート制限の不足を検出——常に安全かつ責任を持って、実データを破壊しない。多数のモック、2つの実例、FAQ、5問クイズ。CyberSoftテスターコースへのリンク付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử bảo mật cơ bản không phá dữ liệu", steps: [
    { name: "Xác định phạm vi & xin phép rõ ràng", text: "Chỉ test trên staging/test, tài khoản test, có văn bản cho phép." },
    { name: "Kiểm IDOR bằng cách đổi ID trực tiếp trên URL/API", text: "Đổi ID sang giá trị của người khác, xem hệ thống có từ chối đúng không." },
    { name: "Kiểm injection/XSS bằng chuỗi thăm dò an toàn", text: "Dùng dấu nháy đơn hoặc script cảnh báo vô hại để quan sát, không khai thác sâu." },
    { name: "Báo cáo có bằng chứng cho Security team", text: "Không tự ý xử lý hay công khai lỗ hổng khi chưa được phép." },
  ] },
  pages,
});

export const MA_SECURITY_01 = [MA_SECURITY_DOC];
