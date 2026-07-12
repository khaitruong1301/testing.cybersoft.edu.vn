// doc_mb_thong_bao.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử thông báo lỗi & validation message — thông báo hiển thị đúng lúc/đúng chỗ, rõ nghĩa,
// đúng ngôn ngữ, không lộ thông tin kỹ thuật, phân biệt thành công/cảnh báo/lỗi, vị trí inline vs toast,
// xóa thông báo khi sửa. Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
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

const ACCENT = "#f59e0b";

// ── Mockup 1: form thanh toán ShopEasy hiện lỗi INLINE ngay dưới ô nhập ──
const m_inline = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán đơn hàng", [
    field(24, 20, 330, "Email nhận hoá đơn", "mai.tran@", "error"),
    field(372, 20, 330, "Số điện thoại", "", "error"),
    field(24, 92, 330, "Mã giảm giá", "SALE2026XXXXXXX", "error"),
    field(372, 92, 330, "Địa chỉ giao hàng", "12 Nguyễn Huệ, Q1", "normal"),
    btn(24, 168, 200, "Đặt hàng", "primary"),
    annotate(20, 12, 330, 62, "INLINE: nằm ngay dưới ô lỗi, dễ thấy"),
    annotate(368, 12, 330, 62, "Bỏ trống nhưng không rõ là bắt buộc"),
  ].join(""), { h: 260, accent: ACCENT }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: ACCENT });

// ── Mockup 2: toast nổi góc trên khi đặt hàng thành công ──
const m_toast = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Xác nhận thanh toán", [
    field(24, 20, 330, "Số thẻ", "4111 **** **** 1111", "normal"),
    field(24, 92, 330, "Tên chủ thẻ", "TRAN THI MAI", "normal"),
    btn(24, 168, 200, "Xác nhận thanh toán", "success"),
    `<rect x="470" y="6" width="270" height="60" rx="10" fill="#16a34a"/>
     <text x="490" y="30" font-size="12.5" font-weight="800" fill="#ffffff">✓ Đặt hàng thành công!</text>
     <text x="490" y="50" font-size="10.5" fill="#dcfce7">Mã đơn SE-88213 · đang xử lý</text>`,
    annotate(466, 2, 278, 68, "TOAST: nổi góc trên, tự ẩn sau vài giây"),
  ].join(""), { h: 260, accent: ACCENT }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: ACCENT });

// ── Mockup 3: bảng đối chiếu thông báo TỐT vs THÔNG BÁO TỆ ──
const m_compare = grid("Đối chiếu: Thông báo TỐT vs Thông báo TỆ", ["Tiêu chí", "Thông báo TỐT", "Thông báo TỆ"], [
  ["Ngôn ngữ", "'Số điện thoại phải có 10 chữ số'", "'Error: invalid input field #4'"],
  ["Vị trí", "Ngay dưới ô nhập bị lỗi (inline)", "Toast chung ở góc màn hình, xa ô lỗi"],
  ["Nội dung kỹ thuật", "Không lộ mã lỗi hệ thống", "Lộ 'NullPointerException at line 42'"],
  ["Phân biệt mức độ", "Đỏ = lỗi, xanh lá = thành công, vàng = cảnh báo", "Mọi thông báo cùng một màu xám"],
  ["Vòng đời", "Tự ẩn khi người dùng sửa đúng", "Thông báo lỗi cũ vẫn hiện dù đã sửa đúng"],
], { accent: ACCENT, note: "Cùng một lỗi, cách hiển thị thông báo quyết định người dùng có sửa được hay bỏ cuộc." });

// ── Mockup 4: ticket Jira về thông báo lỗi khó hiểu, lộ chi tiết kỹ thuật ──
const m_jira = jira({
  key: "SE-11340", title: "Thanh toán thất bại: thông báo hiện 'Error 500 - NullPointerException' thay vì lời hướng dẫn cho khách",
  type: "Bug", status: "New", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "production · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Vào Thanh toán 3) Nhập mã giảm giá đã hết hạn 4) Bấm 'Đặt hàng'"],
    ["Kết quả mong đợi", "Thông báo rõ nghĩa: 'Mã giảm giá đã hết hạn, vui lòng chọn mã khác'"],
    ["Kết quả thực tế", "Toast hiện 'Error 500 - NullPointerException at CheckoutService.java:88'"],
    ["Bằng chứng", "screenshot-error500.png, video-thanh-toan-loi.mp4"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi liên quan thông báo ──
const m_kanban = kanban("Bảng theo dõi lỗi thông báo/validation message (ShopEasy · Sprint 16)", [
  { name: "New", cards: [
    { key: "SE-11340", title: "Lộ NullPointerException khi thanh toán lỗi", sev: "Medium" },
    { key: "SE-11344", title: "Toast lỗi biến mất quá nhanh, khách không kịp đọc", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-11322", title: "Sửa đúng SĐT nhưng thông báo lỗi cũ vẫn còn", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-11298", title: "Thông báo thành công và lỗi dùng chung 1 màu", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-11270", title: "Thông báo lỗi Email hiển thị xa ô nhập", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu lỗi thông báo/validation message ──
const m_dash = dashboard("Lỗi liên quan thông báo — Sprint 16", [
  { label: "Tổng lỗi", value: "24", sub: "sprint này", color: "#2563eb" },
  { label: "Liên quan thông báo", value: "9", sub: "~38%", color: "#f59e0b" },
  { label: "Lộ kỹ thuật (stack trace)", value: "3", sub: "cần chặn ngay", color: "#e11d48" },
  { label: "Không tự xoá khi sửa", value: "4", sub: "gây bối rối cho khách", color: "#7c3aed" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Thông báo lỗi/validation message là gì và vì sao cần kiểm thử riêng?",
  "What is a validation/error message, and why does it need separate testing?",
  "Thông báo lỗi (validation message) là dòng chữ hệ thống hiển thị để giải thích cho người dùng biết dữ liệu họ nhập chưa hợp lệ, thao tác chưa thành công, hoặc mọi việc đã ổn. Nó cần kiểm thử riêng vì đây là kênh giao tiếp DUY NHẤT giữa hệ thống và người dùng lúc gặp sự cố — thông báo tệ khiến người dùng bối rối, bỏ giỏ hàng, hoặc gọi lên tổng đài dù lỗi rất nhỏ và dễ tự sửa nếu được hướng dẫn rõ.",
  "A validation/error message is the text a system shows to tell users their input is invalid, an action failed, or everything is fine. It needs separate testing because it is the ONLY communication channel between system and user at the moment something goes wrong — a bad message confuses users, makes them abandon their cart, or call support for something they could have fixed themselves with clear guidance.",
  "エラー・バリデーションメッセージとは何で、なぜ別途テストが必要？",
  "バリデーションメッセージとは、入力したデータが無効であること、操作が失敗したこと、あるいは正常であることをユーザーに伝えるためにシステムが表示する文言です。何か問題が起きた瞬間にシステムとユーザーをつなぐ唯一のコミュニケーション手段であるため、別途テストが必要です。分かりにくいメッセージはユーザーを混乱させ、カートを放棄させたり、明確な案内があれば自分で直せる些細なミスなのにサポートへ電話させたりします。");
const faq2 = FAQ(
  "Khi nào nên dùng thông báo inline, khi nào dùng toast?",
  "When should you use an inline message versus a toast?",
  "Dùng INLINE (đặt ngay dưới/cạnh ô nhập) cho lỗi gắn với một trường cụ thể — ví dụ email sai định dạng — vì người dùng cần biết chính xác ô nào sai để sửa ngay tại chỗ. Dùng TOAST (nổi tạm thời, thường ở góc màn hình) cho thông báo mang tính hệ thống, không gắn với một ô cụ thể — ví dụ 'Đặt hàng thành công' hoặc 'Mất kết nối mạng'. Nhầm lẫn hai loại này là lỗi UX rất phổ biến: đặt lỗi trường vào toast khiến người dùng không biết ô nào cần sửa.",
  "Use INLINE (placed right below/next to the input) for errors tied to a specific field — e.g. a malformed email — because users need to know exactly which field to fix on the spot. Use a TOAST (a temporary floating notice, usually in a screen corner) for system-level messages not tied to one field — e.g. 'Order placed successfully' or 'Connection lost'. Mixing up the two is a very common UX mistake: putting a field error in a toast leaves users unsure which field to fix.",
  "インラインとトースト、どちらをいつ使うべき？",
  "特定の入力欄に紐づくエラー（例：メール形式の誤り）にはインライン（入力欄のすぐ下/横に配置）を使います。ユーザーがどの欄を直せばよいかその場で分かる必要があるためです。特定の欄に紐づかないシステムレベルの通知（例：『注文が完了しました』『通信が切断されました』）にはトースト（画面の隅に一時的に浮かぶ通知）を使います。この2つを混同するのはよくあるUXミスで、欄のエラーをトーストに入れるとユーザーがどの欄を直せばよいか分からなくなります。");
const faq3 = FAQ(
  "Vì sao thông báo lỗi không nên hiển thị chi tiết kỹ thuật (stack trace, mã lỗi hệ thống)?",
  "Why shouldn't an error message expose technical details (stack traces, internal error codes)?",
  "Vì hai lý do: (1) trải nghiệm — người dùng thường không phải dân kỹ thuật, đọc 'NullPointerException' chỉ khiến họ hoảng thay vì biết cách sửa; (2) bảo mật — chi tiết như tên class, đường dẫn file, phiên bản framework có thể bị kẻ xấu lợi dụng để dò lỗ hổng hệ thống. Thông báo tốt luôn dịch lỗi kỹ thuật thành ngôn ngữ người dùng hiểu được, còn chi tiết kỹ thuật chỉ nên nằm trong log phía server để đội kỹ thuật tra cứu.",
  "For two reasons: (1) UX — users usually aren't technical, and reading 'NullPointerException' only alarms them instead of telling them what to do; (2) security — details like class names, file paths, or framework versions can be exploited by attackers probing for weaknesses. A good message always translates a technical error into user-friendly language, while technical details should stay in server-side logs for the engineering team.",
  "エラーメッセージに技術的詳細（スタックトレース、内部エラーコード）を出してはいけない理由は？",
  "理由は2つあります。（1）UX——ユーザーは通常技術者ではなく、『NullPointerException』を見ても不安になるだけで対処法が分かりません。（2）セキュリティ——クラス名やファイルパス、フレームワークのバージョンなどの詳細は攻撃者がシステムの弱点を探るのに悪用され得ます。良いメッセージは常に技術的エラーをユーザーが理解できる言葉に翻訳し、技術的詳細はエンジニアが参照できるようサーバー側のログにのみ残すべきです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Thông báo lỗi/validation message dùng để làm gì?", en: "What is a validation/error message for?", ja: "バリデーション/エラーメッセージは何のためにある？" },
    options: [
      { vi: "Giải thích cho người dùng biết dữ liệu chưa hợp lệ hoặc thao tác chưa thành công, và cách sửa", en: "Explain to the user that data is invalid or an action failed, and how to fix it", ja: "データが無効または操作が失敗したことと、その直し方をユーザーに伝えること" },
      { vi: "Ghi log lỗi cho lập trình viên xem sau", en: "Log the error for developers to review later", ja: "後で開発者が見るためにエラーをログに記録すること" },
      { vi: "Trang trí giao diện cho đẹp hơn", en: "Decorate the UI to make it prettier", ja: "見た目を良くするための装飾" },
      { vi: "Tăng tốc độ tải trang", en: "Speed up page loading", ja: "ページの読み込みを速くすること" },
    ], correct: 0,
    explain: { vi: "Thông báo là kênh giao tiếp giúp người dùng hiểu chuyện gì xảy ra và cách khắc phục.", en: "The message is the communication channel that helps users understand what happened and how to fix it.", ja: "メッセージは、何が起きたか、どう直せばよいかをユーザーに伝える通信手段です。" },
  }),
  mcq({
    q: { vi: "Màu sắc nào thường biểu thị thông báo LỖI trong hầu hết app?", en: "Which color typically represents an ERROR message in most apps?", ja: "ほとんどのアプリでエラーメッセージを表す色は？" },
    options: [
      { vi: "Xanh lá", en: "Green", ja: "緑" },
      { vi: "Đỏ", en: "Red", ja: "赤" },
      { vi: "Xám nhạt", en: "Light gray", ja: "薄いグレー" },
      { vi: "Tím", en: "Purple", ja: "紫" },
    ], correct: 1,
    explain: { vi: "Đỏ là quy ước phổ biến cho lỗi; xanh lá cho thành công, vàng/cam cho cảnh báo — cần nhất quán trong toàn app.", en: "Red is the common convention for errors; green for success, yellow/orange for warnings — must stay consistent across the app.", ja: "赤はエラーの一般的な慣習色です。緑は成功、黄/オレンジは警告——アプリ全体で一貫させる必要があります。" },
  }),
  mcq({
    q: { vi: "Lỗi gắn với ô 'Email' nên hiển thị thông báo ở đâu là hợp lý nhất?", en: "Where is the most sensible place to show an error tied to the 'Email' field?", ja: "『メール』欄に紐づくエラーはどこに表示するのが最も適切？" },
    options: [
      { vi: "Toast nổi ở góc màn hình, không nói rõ ô nào", en: "A floating toast in a screen corner, without saying which field", ja: "どの項目か明示しない、画面隅に浮かぶトースト" },
      { vi: "Inline ngay dưới ô 'Email'", en: "Inline, right below the 'Email' field", ja: "『メール』欄のすぐ下にインライン表示" },
      { vi: "Chỉ ghi vào log server, không hiện cho người dùng", en: "Only write it to the server log, don't show the user", ja: "サーバーログにのみ記録し、ユーザーには表示しない" },
      { vi: "Gửi email riêng thông báo lỗi", en: "Send a separate email about the error", ja: "別途エラー通知メールを送る" },
    ], correct: 1,
    explain: { vi: "Lỗi gắn với 1 trường cụ thể nên đặt inline ngay tại trường đó để người dùng sửa nhanh, đúng chỗ.", en: "An error tied to a specific field should be inline right at that field so the user can fix it quickly, in the right place.", ja: "特定の項目に紐づくエラーは、ユーザーがすぐ正しい場所で直せるよう、その項目のすぐそばにインライン表示すべきです。" },
  }),
  mcq({
    q: { vi: "Vì sao KHÔNG nên hiển thị 'NullPointerException at line 88' cho người dùng cuối?", en: "Why should 'NullPointerException at line 88' NOT be shown to end users?", ja: "エンドユーザーに『NullPointerException at line 88』を表示すべきでない理由は？" },
    options: [
      { vi: "Vì nó quá ngắn, cần viết dài hơn", en: "Because it's too short and needs to be longer", ja: "短すぎるので長くする必要があるから" },
      { vi: "Vì nó gây hoang mang, không hướng dẫn cách sửa, và có thể lộ thông tin kỹ thuật cho kẻ xấu khai thác", en: "Because it confuses users, gives no fix guidance, and may leak technical info attackers can exploit", ja: "ユーザーを混乱させ、直し方も示さず、攻撃者に悪用され得る技術情報を漏らす可能性があるから" },
      { vi: "Vì tiếng Anh khó đọc với người Việt", en: "Because English is hard for Vietnamese users to read", ja: "ベトナム人にとって英語が読みにくいから" },
      { vi: "Vì nó làm chậm trang", en: "Because it slows down the page", ja: "ページが遅くなるから" },
    ], correct: 1,
    explain: { vi: "Thông báo kỹ thuật nên được dịch thành ngôn ngữ người dùng hiểu, còn chi tiết thật nằm trong log server.", en: "Technical errors should be translated into user-friendly language; real details belong in server logs.", ja: "技術的エラーはユーザーに分かる言葉に翻訳すべきで、本当の詳細はサーバーログに置くべきです。" },
  }),
  mcq({
    q: { vi: "Khi người dùng đã sửa đúng một ô từng báo lỗi, hệ thống nên làm gì với thông báo lỗi cũ?", en: "When a user correctly fixes a field that previously showed an error, what should the system do with the old error message?", ja: "以前エラーだった項目をユーザーが正しく直した時、システムは古いエラーメッセージをどう扱うべき？" },
    options: [
      { vi: "Giữ nguyên thông báo lỗi cũ để nhắc nhở", en: "Keep the old error message as a reminder", ja: "念のため古いエラーメッセージをそのまま残す" },
      { vi: "Tự động xoá/ẩn thông báo lỗi ngay khi dữ liệu hợp lệ", en: "Automatically clear/hide the error message as soon as the data becomes valid", ja: "データが有効になった時点で自動的にエラーメッセージを消す/隠す" },
      { vi: "Chuyển thông báo lỗi thành toast ở góc màn hình", en: "Turn the error message into a toast in the screen corner", ja: "エラーメッセージを画面隅のトーストに変える" },
      { vi: "Không cần làm gì, để người dùng tự refresh trang", en: "Do nothing, let the user refresh the page themselves", ja: "何もせず、ユーザー自身にページを更新させる" },
    ], correct: 1,
    explain: { vi: "Thông báo lỗi không tự xoá khi đã sửa đúng khiến người dùng nghĩ mình vẫn còn sai — đây là lỗi validation rất hay gặp.", en: "An error message that doesn't clear after a correct fix makes users think they're still wrong — a very common validation bug.", ja: "正しく直しても消えないエラーメッセージは、ユーザーにまだ間違っていると思わせます——非常によくあるバリデーションのバグです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử thông báo lỗi/validation message là việc xác nhận thông báo hiện đúng lúc, đúng chỗ (inline hay toast), rõ nghĩa, đúng ngôn ngữ, không lộ chi tiết kỹ thuật, và phân biệt rõ thành công/cảnh báo/lỗi bằng màu sắc. Bài này bám form thanh toán của app TMĐT ShopEasy: bạn học cách kiểm tra nội dung thông báo, vị trí hiển thị, và việc thông báo cũ có tự biến mất khi người dùng sửa đúng hay không. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Testing validation/error messages means confirming a message appears at the right time, in the right place (inline or toast), is clear, in the right language, doesn't leak technical details, and clearly distinguishes success/warning/error by color. This follows ShopEasy's checkout form: you learn to check message content, display position, and whether an old message clears itself once the user fixes the input correctly. Lots of visuals and a quiz at the end.",
        "バリデーション/エラーメッセージのテストとは、メッセージが正しいタイミング・正しい場所（インラインかトーストか）に表示され、意味が明確で、言語が正しく、技術的詳細を漏らさず、色で成功/警告/エラーを明確に区別することを確認する作業です。本記事はECアプリShopEasyの決済フォームに沿い、メッセージの内容、表示位置、そしてユーザーが正しく直した際に古いメッセージが自動的に消えるかを確認する方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Rất nhiều bạn khi mới test chỉ quan tâm 'nút có bấm được không, dữ liệu có lưu không' mà quên hẳn một phần cực kỳ quan trọng: THÔNG BÁO. Với người dùng, thông báo chính là 'người hướng dẫn' duy nhất khi có chuyện gì đó không như mong đợi. Một thông báo tốt giúp khách hàng tự sửa lỗi trong vài giây; một thông báo tệ khiến họ bối rối, bỏ giỏ hàng, hoặc gọi lên tổng đài than phiền. Chúng ta sẽ học qua form thanh toán thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! Many beginners only care whether 'the button is clickable, the data gets saved' and completely forget an extremely important part: NOTIFICATIONS. For users, the message is the only 'guide' they get when something doesn't go as expected. A good message lets a customer fix an error themselves within seconds; a bad one confuses them, makes them abandon their cart, or call support to complain. We'll learn through ShopEasy's real checkout form, with visuals and hands-on practice.",
        "こんにちは、初心者さん！多くの初心者は『ボタンが押せるか、データが保存されるか』だけを気にし、非常に重要な部分——通知（メッセージ）——を完全に忘れてしまいます。ユーザーにとって、メッセージは何かが想定通りにいかなかった時の唯一の『案内役』です。良いメッセージは顧客が数秒で自分でエラーを直せるようにし、悪いメッセージは混乱させ、カートを放棄させたり、苦情の電話をかけさせたりします。実際のShopEasyの決済フォームを通じて、図と実習付きで学びましょう。"),
      IMG(m_inline, "Màn hình test: form thanh toán ShopEasy với thông báo lỗi hiển thị INLINE dưới từng ô", "Screen under test: ShopEasy checkout form with INLINE error messages under each field", "テスト対象画面：各入力欄の下にインラインでエラーメッセージが表示されるShopEasy決済フォーム"),
      DEF("Validation Message", "thông báo hệ thống hiển thị khi dữ liệu người dùng nhập không hợp lệ, thao tác thất bại, hoặc thành công — nhằm hướng dẫn bước tiếp theo.",
        "a system message shown when user input is invalid, an action fails, or succeeds — meant to guide the user's next step.",
        "ユーザー入力が無効な場合、操作が失敗または成功した場合にシステムが表示するメッセージで、ユーザーの次の行動を導くもの。"),
    ] },
  { heading: { vi: "2. Ba loại thông báo: thành công, cảnh báo, lỗi", en: "2. Three message types: success, warning, error", ja: "2. 3種類のメッセージ：成功・警告・エラー" },
    blocks: [
      P("Hầu hết app đều dùng ba loại thông báo với ba màu sắc/biểu tượng khác nhau để người dùng chỉ cần liếc mắt là hiểu ngay mức độ nghiêm trọng. THÀNH CÔNG (thường màu xanh lá, dấu ✓) báo hành động đã hoàn tất. CẢNH BÁO (thường màu vàng/cam, dấu ⚠) báo điều gì đó cần chú ý nhưng chưa chặn thao tác — ví dụ 'mã giảm giá sắp hết hạn'. LỖI (thường màu đỏ, dấu ✗) báo hành động thất bại, cần sửa mới tiếp tục được.",
        "Most apps use three message types with three distinct colors/icons so users can grasp severity at a glance. SUCCESS (usually green, a ✓ mark) confirms an action completed. WARNING (usually yellow/orange, a ⚠ mark) flags something to pay attention to but that doesn't block the action — e.g. 'this discount code expires soon'. ERROR (usually red, a ✗ mark) reports a failed action that must be fixed before continuing.",
        "ほとんどのアプリは3種類のメッセージを異なる色/アイコンで表示し、ユーザーが一目で深刻度を把握できるようにしています。成功（通常は緑、✓マーク）は操作完了を伝えます。警告（通常は黄/オレンジ、⚠マーク）は注意すべき点があるが操作をブロックしない場合に使います——例えば『このクーポンはまもなく期限切れです』。エラー（通常は赤、✗マーク）は操作が失敗し、続行するには修正が必要なことを伝えます。"),
      P("Việc trộn lẫn ba loại này là lỗi thường gặp: dùng cùng một màu cho cả thành công và lỗi, hoặc dùng màu đỏ cho một cảnh báo nhẹ khiến người dùng hoảng sợ không cần thiết. Khi test, bạn nên kiểm tra CẢ MÀU SẮC lẫn NỘI DUNG có khớp với đúng mức độ nghiêm trọng của tình huống hay không, chứ không chỉ đọc chữ.",
        "Mixing these three up is a common bug: using the same color for both success and error, or using red for a mild warning that needlessly alarms users. When testing, you should check BOTH the color AND the content to see whether they match the actual severity of the situation, not just read the text.",
        "この3種類を混同するのはよくあるバグです：成功とエラーに同じ色を使う、あるいは軽い警告に赤を使って不必要にユーザーを驚かせる、などです。テストの際は、文章を読むだけでなく、色と内容の両方が実際の深刻度と一致しているかを確認すべきです。"),
      DEF("Toast", "thông báo nổi tạm thời, thường xuất hiện ở góc màn hình rồi tự biến mất sau vài giây, dùng cho thông báo mang tính hệ thống.",
        "a temporary floating notice, usually appearing in a screen corner and disappearing after a few seconds, used for system-level messages.",
        "画面の隅に一時的に浮かび、数秒後に自動的に消える通知で、システムレベルのメッセージに使われる。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử thông báo", en: "3. Why beginners need to master testing messages", ja: "3. 初心者がメッセージテストを習得すべき理由" },
    blocks: [
      P("Người dùng thật gần như không bao giờ đọc code, không biết vì sao lỗi xảy ra — họ chỉ có DUY NHẤT dòng thông báo trước mắt. Nếu dòng đó mơ hồ ('Có lỗi xảy ra'), lộ kỹ thuật ('SQL error'), hoặc nằm sai chỗ, người dùng sẽ không biết phải làm gì tiếp theo — và phần lớn sẽ bỏ cuộc thay vì cố tìm hiểu.",
        "Real users almost never read code and don't know why an error happened — they only have that ONE line of message in front of them. If it's vague ('An error occurred'), leaks technical jargon ('SQL error'), or sits in the wrong place, users won't know what to do next — and most will give up rather than investigate further.",
        "実際のユーザーはほぼコードを読まず、なぜエラーが起きたのかも分かりません——目の前にある1行のメッセージだけが頼りです。それが曖昧（『エラーが発生しました』）であったり、技術用語を漏らしたり（『SQLエラー』）、間違った場所にあったりすると、ユーザーは次に何をすべきか分からなくなります——そして大半は調べようとせず諦めてしまいます。"),
      P("Với riêng bạn — người mới — kỹ năng đánh giá thông báo cho thấy bạn nhìn app bằng con mắt của người dùng thật, không chỉ 'test cho pass'. Câu hỏi phỏng vấn 'thông báo lỗi này có vấn đề gì' rất phổ biến, và trả lời tốt (thiếu rõ nghĩa, sai vị trí, lộ kỹ thuật, sai màu) cho thấy tư duy UX vững, không chỉ chăm chăm vào chức năng.",
        "For you specifically — a beginner — the skill of evaluating messages shows you look at the app through a real user's eyes, not just 'testing to pass'. The interview question 'what's wrong with this error message' is very common, and answering well (unclear, wrong position, leaks technical detail, wrong color) shows solid UX thinking, not just a narrow focus on functionality.",
        "特に初心者のあなたにとって、メッセージを評価するスキルは、『合格させるためのテスト』だけでなく、実際のユーザーの目でアプリを見ていることを示します。『このエラーメッセージの何が問題か』という面接質問は非常によくあり、うまく答えられれば（意味不明、位置が違う、技術詳細が漏れている、色が違う）、機能だけに集中しない確かなUX思考力を示せます。"),
      P("Và quan trọng nhất: thông báo rõ ràng trực tiếp làm giảm số cuộc gọi lên tổng đài chăm sóc khách hàng, giảm tỉ lệ bỏ giỏ hàng, và bảo vệ hệ thống khỏi lộ thông tin kỹ thuật nhạy cảm. Kiểm thử thông báo tốt là bạn đang bảo vệ cả trải nghiệm khách hàng lẫn sự an toàn của hệ thống.",
        "And most importantly: clear messages directly reduce customer support calls, lower cart abandonment, and protect the system from leaking sensitive technical information. Testing messages well means you're protecting both the customer experience and the system's safety.",
        "そして最も重要なのは、明確なメッセージがカスタマーサポートへの問い合わせを直接減らし、カート放棄率を下げ、機密性の高い技術情報の漏洩からシステムを守るということです。メッセージを丁寧にテストすることは、顧客体験とシステムの安全性の両方を守ることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: các tiêu chí kiểm thử thông báo", en: "4. Prepare: criteria for testing messages", ja: "4. 準備：メッセージテストの基準" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần một bộ tiêu chí để không bỏ sót góc nào khi đánh giá một thông báo bất kỳ trên app.",
        "You don't need special tools — just a set of criteria so you don't miss any angle when evaluating any message in the app.",
        "特別なツールは不要です——アプリ内のどんなメッセージを評価する際にも見落としがないよう、基準セットがあれば十分です。"),
      STEP(1, "ĐÚNG LÚC: thông báo có hiện ngay khi cần (khi nhập sai, khi submit thất bại) hay bị trễ/không hiện?", "RIGHT TIME: does the message appear exactly when needed (on wrong input, on failed submit), or is it delayed/missing?", "適切なタイミング：必要な時（誤入力時、送信失敗時）にすぐ表示されるか、遅延/未表示ではないか？"),
      STEP(2, "ĐÚNG CHỖ: lỗi gắn với 1 ô thì hiện inline tại ô đó; thông báo hệ thống thì hiện toast, không lẫn lộn.", "RIGHT PLACE: a field-specific error shows inline at that field; a system-level message shows as a toast — don't mix them up.", "適切な場所：特定の項目に紐づくエラーはその項目にインライン表示、システムレベルの通知はトースト表示——混同しない。"),
      STEP(3, "RÕ NGHĨA & ĐÚNG NGÔN NGỮ: câu chữ dễ hiểu, đủ dấu tiếng Việt, không dịch máy cứng nhắc, không viết tắt khó hiểu.", "CLEAR & CORRECT LANGUAGE: easy to understand wording, no awkward machine translation, no confusing abbreviations.", "分かりやすさと言語の正確さ：理解しやすい文言で、機械翻訳のようなぎこちなさや分かりにくい略語がない。"),
      STEP(4, "KHÔNG LỘ KỸ THUẬT: không hiện mã lỗi hệ thống, tên class, đường dẫn file, phiên bản thư viện.", "NO TECHNICAL LEAKS: no system error codes, class names, file paths, or library versions shown.", "技術情報の非露出：システムエラーコード、クラス名、ファイルパス、ライブラリのバージョンを表示しない。"),
      STEP(5, "TỰ XOÁ ĐÚNG LÚC: thông báo lỗi biến mất ngay khi người dùng sửa đúng, không tồn tại 'ma' gây hiểu lầm.", "CLEARS AT THE RIGHT TIME: the error message disappears as soon as the user fixes it correctly, no 'ghost' message left behind.", "適切なタイミングでの消去：ユーザーが正しく直した瞬間にエラーメッセージが消え、誤解を招く『幽霊』メッセージが残らない。"),
      TRY("Mở một app bạn hay dùng, cố tình nhập sai một ô bất kỳ và chấm điểm thông báo hiện ra theo 5 tiêu chí trên.", "Open an app you use, deliberately enter wrong data in any field, and score the resulting message against the 5 criteria above.", "普段使っているアプリを開き、任意の項目にわざと誤ったデータを入力し、上記5つの基準で表示されるメッセージを採点してみよう。"),
      PITFALL("Chỉ kiểm tra 'có thông báo hay không' mà không đọc kỹ NỘI DUNG, VỊ TRÍ, và MÀU SẮC của nó có hợp lý không.", "Only checking 'is there a message or not' without carefully reading its CONTENT, POSITION, and COLOR to see if they make sense.", "『メッセージがあるかないか』だけを確認し、内容・位置・色が適切かをよく確認しないこと。"),
      IMG(m_compare, "Bảng đối chiếu thông báo TỐT vs THÔNG BÁO TỆ trên cùng tình huống", "Comparison of a GOOD versus a BAD message for the same situation", "同じ状況における良いメッセージと悪いメッセージの対照表"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử thông báo từng bước (thực hành)", en: "5. Writing message test cases step by step (hands-on)", ja: "5. メッセージのテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào form thanh toán ShopEasy — nơi thông báo sai lệch có thể khiến khách bỏ cả đơn hàng đang chờ chốt. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử thông báo đầy đủ.",
        "Now let's apply it for real to ShopEasy's checkout form — where a bad message can make a customer abandon an order that was about to close. Follow the order below to get a full set of message test cases.",
        "では、ShopEasyの決済フォームに実際に適用しましょう——誤ったメッセージは、あと少しで確定するはずの注文を顧客に放棄させかねません。以下の順に沿って、完全なメッセージテストケース一式を作りましょう。"),
      STEP(1, "Xác định các trạng thái cần thông báo: lỗi trường (email sai), cảnh báo (mã giảm giá sắp hết hạn), thành công (đặt hàng xong).", "Identify the states that need a message: field error (wrong email), warning (discount code expiring soon), success (order placed).", "メッセージが必要な状態を特定する：項目エラー（メール誤り）、警告（クーポン期限間近）、成功（注文完了）。"),
      STEP(2, "Với mỗi trạng thái, kiểm 5 tiêu chí ở chương 4: đúng lúc, đúng chỗ, rõ nghĩa, không lộ kỹ thuật, tự xoá đúng lúc.", "For each state, check the 5 criteria from chapter 4: right time, right place, clear wording, no technical leaks, clears at the right time.", "各状態に対し、第4章の5基準を確認する：適切なタイミング、適切な場所、分かりやすさ、技術情報の非露出、適切なタイミングでの消去。"),
      STEP(3, "Cố tình gây lỗi server (ví dụ mã giảm giá không tồn tại trong hệ thống) để xem thông báo có dịch lỗi kỹ thuật thành câu người dùng hiểu không.", "Deliberately trigger a server error (e.g. a discount code that doesn't exist) to see if the message translates the technical error into user-friendly text.", "サーバーエラー（例：存在しないクーポンコード）を意図的に発生させ、メッセージが技術的エラーをユーザーに分かる文章に翻訳しているか確認する。"),
      STEP(4, "Sau khi sửa đúng ô từng báo lỗi, kiểm tra thông báo lỗi cũ có tự biến mất ngay, không cần refresh trang.", "After correctly fixing a field that previously errored, check that the old error message clears immediately, without needing a page refresh.", "以前エラーだった項目を正しく直した後、古いエラーメッセージがページ更新なしにすぐ消えるか確認する。"),
      CODE("text", "BO CA KIEM THU THONG BAO - form thanh toan ShopEasy\nCa 1: Email sai dinh dang | Expected: inline duoi o Email, cau ro nghia | Actual: dung vi tri, dung noi dung\nCa 2: Ma giam gia da het han | Expected: canh bao mau vang, khong chan thao tac | Actual: hien mau do nhu loi (BUG)\nCa 3: Loi server khi dat hang | Expected: 'Khong the xu ly don hang, vui long thu lai' | Actual: hien 'NullPointerException' (BUG)\nCa 4: Sua dung SDT sau khi bao loi | Expected: thong bao loi tu xoa | Actual: thong bao loi cu van con (BUG)"),
      TRY("Nghĩ thêm 1 trạng thái thông báo nữa cho form thanh toán (gợi ý: mất kết nối mạng giữa lúc bấm 'Đặt hàng').", "Think of one more message state for the checkout form (hint: losing network connection right as you click 'Order').", "決済フォームにもう1つメッセージ状態を考えよう（ヒント：『注文する』をクリックした瞬間に通信が切断される）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: thông báo lộ chi tiết kỹ thuật", en: "6. Situation 1: a message leaks technical details", ja: "6. シーン1：メッセージが技術的詳細を漏らす" },
    blocks: [
      SITUATION("Đội chỉ test rằng 'khi lỗi server xảy ra, có thông báo hiện ra là được', chưa xem kỹ nội dung bên trong.", "The team only tests that 'when a server error happens, some message shows up', without carefully reading its content.",
        "Khi mã giảm giá không hợp lệ khiến server lỗi, toast hiện nguyên văn 'Error 500 - NullPointerException at CheckoutService.java:88' cho khách hàng — vừa gây hoang mang vừa lộ tên file, dòng code nội bộ.",
        "When an invalid discount code causes a server error, the toast shows the raw text 'Error 500 - NullPointerException at CheckoutService.java:88' to the customer — both alarming and leaking internal file names and code lines.",
        "チームは『サーバーエラー時に何らかのメッセージが表示されればよい』とだけテストし、内容をよく確認していない。",
        "無効なクーポンコードがサーバーエラーを引き起こすと、トーストに『Error 500 - NullPointerException at CheckoutService.java:88』がそのまま顧客に表示される——不安にさせるだけでなく、内部のファイル名やコード行を漏らしている。"),
      SOLVE("Yêu cầu backend luôn trả về một mã lỗi chung (không kèm stack trace) cho client; frontend dịch mã đó thành câu người dùng hiểu, còn chi tiết kỹ thuật chỉ ghi vào log server để đội kỹ thuật tra cứu.", "Require the backend to always return a generic error code (no stack trace) to the client; the frontend translates that code into user-friendly text, while technical details stay only in server logs for the engineering team.", "バックエンドはクライアントに常に汎用的なエラーコード（スタックトレースなし）のみを返すよう要求し、フロントエンドはそのコードをユーザーに分かる文章に翻訳する。技術的詳細はエンジニアが参照するためサーバーログにのみ記録する。"),
      P("Đây là bài học lớn của chương này: 'có thông báo hiện ra' hoàn toàn khác với 'thông báo phù hợp'. Khi kiểm thử, đừng chỉ hài lòng vì thấy chữ xuất hiện trên màn hình — hãy đọc kỹ nội dung đó, tự hỏi 'nếu mình là khách hàng không biết gì về kỹ thuật, mình có hiểu và biết cách sửa không?'.",
        "This is the big lesson of this chapter: 'a message appears' is completely different from 'an appropriate message appears'. When testing, don't just be satisfied that text shows up on screen — read its content carefully and ask yourself, 'if I were a non-technical customer, would I understand it and know how to fix it?'",
        "この章での大きな教訓です：『メッセージが表示される』ことと『適切なメッセージが表示される』ことは全く違います。テストする際は、画面に文字が出ることに満足せず、内容をよく読み、『もし自分が技術に詳しくない顧客だったら、理解でき、直し方が分かるか？』と自問しましょう。"),
      IMG(m_jira, "Ticket lỗi tìm được: thông báo lộ chi tiết kỹ thuật khi thanh toán thất bại", "Bug ticket found: the message leaks technical details on a failed payment", "発見されたバグチケット：決済失敗時にメッセージが技術的詳細を漏らす"),
      RECAP(["'Có thông báo' khác 'thông báo phù hợp'", "Luôn đọc kỹ NỘI DUNG, không chỉ kiểm tra thông báo có xuất hiện"],
        ["'A message appears' differs from 'an appropriate message appears'", "Always read the CONTENT carefully, not just check that a message shows up"],
        ["『メッセージがある』と『適切なメッセージがある』は違う", "表示の有無だけでなく、内容を必ずよく確認する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: thông báo lỗi cũ không tự biến mất", en: "7. Situation 2: an old error message doesn't clear itself", ja: "7. シーン2：古いエラーメッセージが自動で消えない" },
    blocks: [
      SITUATION("Bạn cố tình bỏ trống ô 'Số điện thoại', thấy thông báo lỗi hiện ra đúng như mong đợi, rồi bạn nhập lại số điện thoại hợp lệ.", "You deliberately leave the 'Phone number' field blank, see the expected error message appear, then type a valid phone number back in.",
        "Thông báo lỗi 'Vui lòng nhập số điện thoại' vẫn còn nguyên trên màn hình dù ô đã có dữ liệu hợp lệ — khách hàng tưởng mình vẫn nhập sai, thử đi thử lại nhiều lần rồi bỏ cuộc.",
        "The error message 'Please enter your phone number' stays on screen even though the field now has valid data — the customer thinks they're still doing something wrong, retries several times, then gives up.",
        "『電話番号』欄をわざと空欄にすると、期待通りエラーメッセージが表示され、その後有効な電話番号を再入力する。",
        "欄に有効なデータが入っているにもかかわらず、『電話番号を入力してください』というエラーメッセージが画面に残ったまま——顧客はまだ間違っていると思い、何度も試した末に諦めてしまう。"),
      SOLVE("Báo bug và yêu cầu gắn sự kiện 'validate lại' vào mỗi lần dữ liệu ô thay đổi (không chỉ khi submit), để thông báo lỗi tự ẩn ngay khi điều kiện hợp lệ được đáp ứng.", "Report the bug and require a 're-validate' event on every change to the field's data (not only on submit), so the error message hides itself as soon as the valid condition is met.", "バグを報告し、送信時だけでなく項目のデータが変更されるたびに『再バリデーション』イベントを発生させるよう要求する。これにより、有効な条件が満たされた瞬間にエラーメッセージが自動的に隠れる。"),
      P("Ví dụ này cho thấy vòng đời của thông báo quan trọng không kém nội dung của nó. Một thông báo đúng nhưng không biến mất đúng lúc gây hại tương đương một thông báo sai ngay từ đầu — cả hai đều khiến người dùng mất niềm tin vào những gì hệ thống đang nói với họ.",
        "This example shows that a message's lifecycle matters just as much as its content. A correct message that doesn't disappear at the right time is just as harmful as a wrong message from the start — both make users lose trust in what the system is telling them.",
        "この例は、メッセージの内容と同じくらいそのライフサイクルが重要であることを示しています。正しいメッセージでも適切なタイミングで消えなければ、最初から間違ったメッセージと同じくらい有害です——どちらもユーザーがシステムの発言を信頼しなくなる原因になります。"),
      TRY("Thử tìm 1 form khác trong app bạn dùng, cố tình gây lỗi rồi sửa đúng — xem thông báo lỗi có tự biến mất ngay không.", "Try finding another form in an app you use, deliberately trigger an error then fix it — see whether the error message clears itself right away.", "使っているアプリの別のフォームを探し、わざとエラーを起こしてから直してみよう——エラーメッセージがすぐに自動で消えるか確認しよう。"),
    ] },
  { heading: { vi: "8. Vị trí thông báo: inline vs toast", en: "8. Message position: inline vs toast", ja: "8. メッセージの位置：インライン vs トースト" },
    blocks: [
      P("Chọn sai vị trí thông báo là lỗi UX rất phổ biến. Quy tắc thực dụng: nếu thông báo trả lời câu hỏi 'ô nào sai' — dùng INLINE, đặt sát ô đó. Nếu thông báo trả lời câu hỏi 'toàn bộ thao tác vừa rồi thế nào' (thành công, mất mạng, hết phiên đăng nhập) — dùng TOAST, không gắn vào một ô cụ thể nào.",
        "Choosing the wrong message position is a very common UX bug. A practical rule: if the message answers 'which field is wrong' — use INLINE, placed right next to that field. If the message answers 'how did the whole action just go' (success, lost connection, session expired) — use a TOAST, not tied to any one specific field.",
        "メッセージの位置を誤って選ぶのは非常によくあるUXバグです。実用的なルール：メッセージが『どの項目が間違っているか』に答えるものなら、その項目のすぐそばにインライン表示を使う。メッセージが『今の操作全体がどうだったか』（成功、通信切断、セッション切れ）に答えるものなら、特定の項目に紐づかないトーストを使う。"),
      IMG(m_toast, "Toast thành công nổi góc trên khi thanh toán ShopEasy hoàn tất", "A success toast floating in the top corner when ShopEasy checkout completes", "ShopEasyの決済完了時に画面上部隅に浮かぶ成功トースト"),
      P("Một lỗi hay gặp là đặt thông báo lỗi trường vào toast: khách hàng thấy 'Có lỗi xảy ra' nổi lên góc màn hình nhưng không biết ô nào cần sửa trong một form dài nhiều trường. Ngược lại, dùng inline cho thông báo 'Mất kết nối mạng' (không gắn với ô nào) cũng vô nghĩa vì không có ô cụ thể để đặt nó cạnh.",
        "A common mistake is putting a field error in a toast: the customer sees 'An error occurred' pop up in a corner but doesn't know which field to fix in a long, multi-field form. Conversely, using inline for a 'Connection lost' message (not tied to any field) also makes no sense since there's no specific field to place it next to.",
        "よくある間違いは、項目のエラーをトーストに入れることです。顧客は画面の隅に『エラーが発生しました』とポップアップするのを見ても、多項目のフォームのどこを直せばよいか分かりません。逆に、『通信が切断されました』（どの項目にも紐づかない）というメッセージにインラインを使うのも意味がありません——隣に置くべき特定の項目がないからです。"),
      TIP("Khi review một thông báo, tự hỏi: 'Nó trả lời cho MỘT Ô hay cho CẢ THAO TÁC?' — câu trả lời quyết định inline hay toast.", "When reviewing a message, ask: 'Does it answer for ONE FIELD or for the WHOLE ACTION?' — the answer decides inline versus toast.", "メッセージをレビューする際は『これは1つの項目に答えるものか、操作全体に答えるものか？』と自問しよう——その答えがインラインかトーストかを決めます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi kiểm thử thông báo. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing messages. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はメッセージのテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ kiểm tra 'thông báo có xuất hiện không' mà bỏ qua việc thông báo có TỰ XOÁ đúng lúc hay không.", "Only checking 'does a message appear' while skipping whether it CLEARS at the right time.", "『メッセージが表示されるか』だけを確認し、適切なタイミングで消えるかを見過ごす。"),
      PITFALL("Copy-paste nguyên văn lỗi kỹ thuật từ log server vào thông báo cho người dùng vì 'tiện, khỏi viết lại'.", "Copy-pasting the raw technical error from server logs straight into the user-facing message because it's 'convenient, no rewriting needed'.", "『手っ取り早い』からとサーバーログの生の技術エラーをそのままユーザー向けメッセージにコピペする。"),
      TIP("Đọc to thông báo lỗi cho một người không rành kỹ thuật nghe — nếu họ không hiểu ngay cần làm gì, thông báo đó cần viết lại.", "Read the error message out loud to someone non-technical — if they don't immediately understand what to do, the message needs rewriting.", "エラーメッセージを技術に詳しくない人に読み聞かせてみよう——すぐに何をすべきか理解できなければ、そのメッセージは書き直す必要があります。"),
      IMG(m_kanban, "Bảng theo dõi lỗi liên quan thông báo/validation message (ShopEasy · Sprint 16)", "A board tracking bugs related to validation/error messages (ShopEasy · Sprint 16)", "バリデーション/エラーメッセージ関連バグの追跡ボード（ShopEasy・スプリント16）"),
      IMG(m_dash, "Số liệu: gần 4/10 lỗi của sprint liên quan tới thông báo, một phần lộ chi tiết kỹ thuật", "Metrics: nearly 4 in 10 sprint bugs relate to messages, some leaking technical details", "指標：スプリントのバグの約4割がメッセージ関連で、一部は技術的詳細を漏らしている"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者向けネガティブテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử thông báo lỗi/validation message qua form thanh toán ShopEasy: phân biệt thành công/cảnh báo/lỗi bằng màu sắc, vị trí inline vs toast, không để lộ chi tiết kỹ thuật, và đảm bảo thông báo tự xoá khi người dùng sửa đúng. Bạn cũng thấy hai tình huống thật cho thấy chỉ kiểm 'có thông báo hay không' là chưa đủ. Đây là kỹ năng nền tảng giúp bài test của bạn bám sát trải nghiệm người dùng thật, không chỉ chăm chăm vào chức năng.",
        "You just learned how to test validation/error messages through ShopEasy's checkout form: distinguishing success/warning/error by color, inline versus toast positioning, avoiding leaked technical details, and ensuring messages clear themselves once the user fixes the input. You also saw two real situations showing that checking only 'does a message appear' isn't enough. This foundational skill keeps your testing grounded in the real user experience, not just narrow functionality.",
        "ShopEasyの決済フォームを通じて、バリデーション/エラーメッセージのテスト方法を学びました：色による成功/警告/エラーの区別、インラインとトーストの使い分け、技術的詳細の非露出、そしてユーザーが正しく直した際にメッセージが自動的に消えることの確認。また、『メッセージがあるかないか』だけの確認では不十分であることを示す2つの実例も見ました。この土台スキルは、機能面だけでなく実際のユーザー体験に沿ったテストを行うのに役立ちます。"),
      P("Chặng tiếp theo, bạn nên học kỹ hơn về kiểm thử form dữ liệu và kiểm thử giao diện để đánh giá toàn diện trải nghiệm nhập liệu, cùng cách viết bug report chuẩn cho các lỗi UX như thế này. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should dig deeper into testing data forms and UI testing to evaluate the input experience thoroughly, along with how to write a proper bug report for UX bugs like these. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、入力体験を総合的に評価するためにフォームテストとUIテストをより深く学び、こうしたUXバグに対する適切なバグレポートの書き方も学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const NOTIFICATION_TESTING_01 = makeDoc({
  slug: "kiem-thu-thong-bao-validation-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử thông báo lỗi",
  keywords: ["kiểm thử thông báo lỗi", "validation message", "thông báo lỗi", "inline vs toast", "kiểm thử thông báo cho người mới"],
  coverLabel: "NGƯỜI MỚI · VALIDATION MESSAGE · TMĐT",
  crumb: "Kiểm thử thông báo lỗi & validation message",
  metaTitle: { vi: "Kiểm thử thông báo lỗi (validation) cho người mới", en: "Testing error/validation messages for beginners", ja: "初心者向けエラー・バリデーションメッセージテスト" },
  metaDescription: {
    vi: "Kiểm thử thông báo lỗi & validation message cho người mới: đúng lúc, đúng chỗ, rõ nghĩa, không lộ kỹ thuật qua app ShopEasy, có hình và trắc nghiệm.",
    en: "Testing error/validation messages for beginners: right time, right place, clear wording, no technical leaks, inline versus toast through the ShopEasy app, with visuals and a quiz.",
    ja: "初心者向けエラー・バリデーションメッセージのテスト：適切なタイミング・場所、分かりやすさ、技術情報の非露出、ShopEasyアプリでのインラインとトーストの区別、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử thông báo lỗi & validation message cho người mới: rõ nghĩa, đúng chỗ, không lộ kỹ thuật (có trắc nghiệm)",
    en: "Testing error & validation messages for beginners: clear, well-placed, no technical leaks (with quiz)",
    ja: "初心者のためのエラー・バリデーションメッセージテスト：明確・適切な位置・技術情報を漏らさない（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: kiểm thử thông báo lỗi/validation message qua app TMĐT ShopEasy. Ba loại thông báo (thành công/cảnh báo/lỗi), 5 tiêu chí kiểm thử (đúng lúc, đúng chỗ, rõ nghĩa, không lộ kỹ thuật, tự xoá), vị trí inline vs toast, hai tình huống thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: test error/validation messages through the ShopEasy e-commerce app. Three message types (success/warning/error), 5 testing criteria (right time, right place, clear wording, no technical leaks, auto-clear), inline vs toast positioning, two real situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでバリデーション/エラーメッセージをテストする。3種類のメッセージ（成功/警告/エラー）、5つのテスト基準（適切なタイミング、場所、分かりやすさ、技術情報の非露出、自動消去）、インラインとトーストの使い分け、2つの実例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử thông báo lỗi/validation message", steps: [
    { name: "Liệt kê các trạng thái cần thông báo của tính năng", text: "Lỗi trường, cảnh báo, thành công, lỗi hệ thống." },
    { name: "Áp 5 tiêu chí cho từng thông báo", text: "Đúng lúc, đúng chỗ, rõ nghĩa, không lộ kỹ thuật, tự xoá đúng lúc." },
    { name: "Sửa đúng dữ liệu và xác nhận thông báo lỗi tự biến mất", text: "Không cần refresh trang, không còn thông báo 'ma'." },
  ] },
  pages,
});

export const MB_THONGBAO_01 = [NOTIFICATION_TESTING_01];
