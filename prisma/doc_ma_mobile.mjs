// doc_ma_mobile.mjs — BÀI MANUAL cấp NÂNG CAO: Kiểm thử ứng dụng di động chuyên sâu
// (Mobile Testing nâng cao) — gián đoạn hệ thống (cuộc gọi/thông báo), chuyển mạng
// wifi↔4G↔mất mạng, xoay màn hình, pin yếu/nền/kill app, đa kích thước/độ phân giải,
// cử chỉ, quyền hệ thống, deep link. Gắn dự án app TMĐT ShopEasy Mobile.
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
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, kiểm thử di động nâng cao, công cụ & dự án thực chiến.",
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

// ── Mockup 1: ma trận yếu tố mobile cần test trên ShopEasy Mobile ──
const m_matrix = grid("Ma trận yếu tố đặc thù cần kiểm thử — Mobile Testing nâng cao (ShopEasy Mobile)",
  ["Yếu tố đặc thù mobile", "Rủi ro nếu bỏ qua", "Cách test nhanh trên ShopEasy"], [
  ["Gián đoạn (cuộc gọi/thông báo)", "Mất dữ liệu đang nhập, crash khi quay lại app", "Gọi điện/nhắn tin thật giữa lúc đang thanh toán"],
  ["Chuyển mạng wifi ↔ 4G ↔ mất mạng", "Gửi trùng đơn hàng, treo màn hình chờ vô hạn", "Bật/tắt wifi, chuyển sang 4G ngay giữa thao tác"],
  ["Vòng đời app: nền / bị kill / pin yếu", "Mất giỏ hàng, mất phiên đăng nhập", "Đưa app xuống nền lâu, ép hệ điều hành kill, bật tiết kiệm pin"],
  ["Xoay màn hình & đa kích thước", "Vỡ giao diện, mất dữ liệu đang nhập trong form", "Xoay ngang/dọc và test trên nhiều kích thước, màn có notch"],
  ["Cử chỉ (vuốt/chụm/nhấn giữ)", "Thao tác không phản hồi, nhầm lẫn hành động", "Vuốt xoá sản phẩm, kéo-thả, nhấn giữ trên màn chính"],
  ["Quyền hệ thống (camera/vị trí/thông báo)", "Tính năng liên quan lỗi âm thầm khi bị từ chối quyền", "Từ chối quyền rồi thử lại đúng tính năng cần quyền đó"],
  ["Deep link", "Mở sai màn hình, crash khi chưa đăng nhập/chưa cài app", "Bấm link khuyến mãi khi app chưa cài và khi chưa đăng nhập"],
], { accent: "#155ce1" });

// ── Mockup 2: màn ShopEasy Mobile khi có cuộc gọi đến giữa lúc thanh toán ──
const m_call = browser("ShopEasy Mobile · app trên điện thoại", [
  panel("ShopEasy · Thanh toán đơn hàng", [
    field(24, 20, 330, "Sản phẩm", "Áo thun nam · SL 2", "normal"),
    field(372, 20, 330, "Tổng tiền", "598.000 ₫", "normal"),
    field(24, 92, 330, "Địa chỉ giao", "123 Lê Lợi, Q1, TP.HCM", "normal"),
    field(372, 92, 330, "Phương thức TT", "Thẻ tín dụng ****4821", "normal"),
    btn(24, 168, 320, "Xác nhận thanh toán", "primary"),
    `<rect x="20" y="212" width="682" height="68" rx="14" fill="#0f172a"/>`,
    `<text x="44" y="240" font-size="14" font-weight="800" fill="#ffffff">📞 Cuộc gọi đến — Mẹ</text>`,
    `<text x="44" y="260" font-size="12" fill="#94a3b8">090xxxxxxx · thanh toán đang bị gián đoạn</text>`,
    btn(556, 224, 60, "Từ chối", "danger"),
    btn(624, 224, 66, "Trả lời", "success"),
    annotate(20, 12, 330, 62, "App PHẢI giữ nguyên đơn khi có cuộc gọi đến"),
  ].join(""), { h: 300, accent: "#155ce1" }),
].join(""), { h: 356, title: "ShopEasy Mobile · TMĐT", accent: "#155ce1" });

// ── Mockup 3: bảng ca gián đoạn/chuyển mạng cần kiểm thử ──
const m_network = grid("Các ca gián đoạn & chuyển mạng cần kiểm thử trên ShopEasy Mobile",
  ["Ca kiểm thử", "Thời điểm chèn gián đoạn", "Kết quả mong đợi"], [
  ["Wifi → mất mạng hoàn toàn", "Ngay lúc bấm nút 'Đặt hàng'", "Báo lỗi mạng rõ ràng, KHÔNG gửi trùng đơn khi có mạng lại"],
  ["4G → Wifi", "Đang tải trang xác nhận thanh toán", "Giữ nguyên phiên hiện tại, không tạo 2 đơn hàng song song"],
  ["Mất mạng → có mạng lại", "Giữa lúc đồng bộ giỏ hàng từ server", "Giỏ hàng đồng bộ đúng, không nhân đôi sản phẩm"],
  ["Wifi yếu, mất gói tin ngắt quãng", "Khi tải ảnh sản phẩm ở trang chi tiết", "App tự retry hợp lý, không treo giao diện"],
  ["Chuyển mạng giữa 2 lần bấm nút nhanh", "Bấm 'Đặt hàng' 2 lần liên tiếp khi mạng chập chờn", "Chỉ tạo đúng 1 đơn hàng (idempotent)"],
], { accent: "#155ce1", note: "Ưu tiên test trên thiết bị thật + mạng thật, vì giả lập network throttle không mô phỏng đủ độ trễ/mất gói ngẫu nhiên." });

// ── Mockup 4: ticket Jira lỗi mất giỏ hàng khi app bị hệ điều hành kill ──
const m_jira = jira({
  key: "SE-22310", title: "Giỏ hàng: app bị hệ điều hành kill khi chạy nền lúc thanh toán, giỏ hàng trống khi mở lại",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "Android 14 · Samsung Galaxy A54 (RAM thấp) · ShopEasy Mobile v4.2.1"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Vào màn Thanh toán 3) Chuyển sang app Zalo trong ~5 phút 4) OS tự kill ShopEasy do thiếu RAM 5) Mở lại ShopEasy"],
    ["Kết quả mong đợi", "Khôi phục đúng giỏ hàng và đúng bước thanh toán đang dang dở"],
    ["Kết quả thực tế", "Giỏ hàng trống, phải chọn lại từ đầu; khách có nguy cơ bỏ đơn"],
    ["Bằng chứng", "video-se22310.mp4, log-lifecycle-kill.txt"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi mobile theo thiết bị/OS ──
const m_kanban = kanban("Bảng theo dõi lỗi mobile theo thiết bị/OS (ShopEasy Mobile · Sprint 22)", [
  { name: "New", cards: [
    { key: "SE-22310", title: "Giỏ hàng mất khi app bị kill nền", sev: "Critical" },
    { key: "SE-22315", title: "Xoay màn hình mất dữ liệu form địa chỉ", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-22288", title: "Gửi đơn 2 lần khi chuyển 4G sang Wifi", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-22200", title: "Deep link khuyến mãi mở sai màn khi chưa đăng nhập", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-22150", title: "Thông báo hệ thống che nút Đặt hàng trên màn nhỏ", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu thiết bị & lỗi theo yếu tố mobile ──
const m_dash = dashboard("Mobile Testing nâng cao — số liệu thiết bị & lỗi theo yếu tố (ShopEasy · Sprint 22)", [
  { label: "Thiết bị/OS đã test", value: "18", sub: "iOS/Android, 6 kích thước màn hình", color: "#155ce1" },
  { label: "Lỗi từ gián đoạn/mạng", value: "14", sub: "~58% tổng lỗi mobile", color: "#e11d48" },
  { label: "Lỗi từ vòng đời app", value: "6", sub: "nền / bị kill / pin yếu", color: "#7c3aed" },
  { label: "Thiết bị thật vs giả lập", value: "70/30", sub: "ưu tiên máy thật cho ca cảm biến", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử ứng dụng di động nâng cao khác gì so với kiểm thử web thông thường?",
  "How does advanced mobile app testing differ from regular web testing?",
  "Kiểm thử web chủ yếu xoay quanh trình duyệt và responsive layout. Kiểm thử ứng dụng di động nâng cao phải bao phủ thêm hàng loạt yếu tố chỉ tồn tại trên thiết bị thật: gián đoạn hệ thống (cuộc gọi, thông báo, báo thức), chuyển đổi giữa các loại mạng (wifi, 4G, mất mạng), vòng đời app (chạy nền, bị hệ điều hành kill, pin yếu), xoay màn hình, đa kích thước/độ phân giải, cử chỉ chạm, quyền hệ thống và deep link. Đây là những nguồn lỗi thật rất phổ biến trên production nhưng gần như không xuất hiện khi test web.",
  "Web testing mainly revolves around the browser and responsive layout. Advanced mobile app testing must also cover a whole set of factors that only exist on real devices: system interruptions (calls, notifications, alarms), switching between network types (wifi, 4G, no connection), the app lifecycle (background, killed by the OS, low battery), screen rotation, multiple screen sizes/resolutions, touch gestures, system permissions, and deep links. These are very common real production bug sources that almost never show up in web testing.",
  "モバイルアプリの上級テストはWebテストとどう違う？",
  "Webテストは主にブラウザとレスポンシブレイアウトが中心です。モバイルアプリの上級テストは、実機でしか存在しない要素も網羅する必要があります：システムの割り込み（着信・通知・アラーム）、ネットワーク種別の切り替え（Wi-Fi、4G、通信断）、アプリのライフサイクル（バックグラウンド、OSによるキル、バッテリー残量低下）、画面回転、複数の画面サイズ／解像度、タッチジェスチャー、システム権限、ディープリンクなどです。これらは本番環境で非常によく起きる実際のバグの原因ですが、Webテストではほぼ現れません。");
const faq2 = FAQ(
  "Vì sao cần test app bị hệ điều hành 'kill' khi chạy nền?",
  "Why do we need to test the app being killed by the OS while in the background?",
  "Điện thoại có bộ nhớ giới hạn, hệ điều hành (đặc biệt Android trên máy RAM thấp) thường xuyên chủ động 'kill' các app đang chạy nền để giải phóng tài nguyên cho app đang mở phía trước. Nếu app không xử lý đúng vòng đời (lifecycle) này, khi người dùng mở lại app họ sẽ mất giỏ hàng, mất phiên đăng nhập, hoặc quay về màn hình đầu thay vì đúng bước họ đang làm dở — đây là nguyên nhân rất phổ biến khiến khách hàng bỏ đơn hàng thật trên các app TMĐT.",
  "Phones have limited memory, and the operating system — especially Android on low-RAM devices — frequently and proactively kills background apps to free resources for the app currently in the foreground. If an app doesn't correctly handle this lifecycle, users reopening it will lose their cart, lose their login session, or land back on the home screen instead of the step they were on — a very common real cause of abandoned orders on e-commerce apps.",
  "アプリがバックグラウンドでOSに『キル』されるテストがなぜ必要？",
  "スマートフォンのメモリは限られており、特にRAMが少ないAndroid端末ではOSが前面のアプリにリソースを空けるためバックグラウンドのアプリを積極的にキルすることがよくあります。アプリがこのライフサイクルを正しく処理していないと、ユーザーが再度開いたときにカートやログインセッションを失ったり、作業中だったステップではなくホーム画面に戻ってしまったりします——これはECアプリで実際に注文が放棄される非常によくある原因です。");
const faq3 = FAQ(
  "Có bắt buộc phải test trên thiết bị thật hay dùng giả lập/máy ảo là đủ?",
  "Is testing on real devices mandatory, or are emulators/simulators enough?",
  "Giả lập rất tốt cho việc kiểm tra nhanh logic nghiệp vụ và giao diện ở nhiều kích thước màn hình. Nhưng các ca liên quan tới cuộc gọi thật, chuyển mạng thật, cảm biến (GPS, gia tốc kế), hành vi tiết kiệm pin của hệ điều hành, và cách hệ điều hành thật sự quản lý bộ nhớ để kill app nền thường KHÔNG được mô phỏng chính xác trên giả lập. Cách thực dụng là dùng giả lập cho vòng lặp phát triển nhanh, nhưng bắt buộc chạy lại các ca rủi ro cao (thanh toán, đăng nhập, giỏ hàng) trên thiết bị thật trước khi release.",
  "Emulators/simulators are great for quickly checking business logic and UI across many screen sizes. But cases involving real phone calls, real network switching, sensors (GPS, accelerometer), the OS's real battery-saving behavior, and how the real OS manages memory to kill background apps are usually NOT accurately simulated on emulators. A practical approach is to use emulators for the fast development loop, but always re-run high-risk cases (checkout, login, cart) on real devices before release.",
  "実機テストは必須？エミュレーター/シミュレーターだけで十分？",
  "エミュレーターはビジネスロジックや複数画面サイズでのUI確認には非常に便利です。しかし実際の着信、実際のネットワーク切り替え、センサー（GPS、加速度計）、OSの実際のバッテリー節約動作、そしてOSが実際にメモリを管理してバックグラウンドアプリをキルする挙動などは、エミュレーターでは正確に再現されないことが多いです。実用的なアプローチは、開発の高速なループにはエミュレーターを使い、リリース前には高リスクなケース（決済、ログイン、カート）を必ず実機で再実行することです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Yếu tố nào sau đây là đặc thù của kiểm thử ứng dụng di động, ít gặp khi test web?", en: "Which of the following is specific to mobile app testing and rarely seen in web testing?", ja: "次のうちモバイルアプリテストに特有で、Webテストではあまり見られないものはどれ？" },
    options: [
      { vi: "Gián đoạn do cuộc gọi/thông báo đến giữa lúc thao tác", en: "Interruption from an incoming call/notification mid-action", ja: "操作中の着信・通知による割り込み" },
      { vi: "Kiểm tra tiêu đề (title) trang HTML", en: "Checking the HTML page title", ja: "HTMLページのタイトルの確認" },
      { vi: "Kiểm tra breadcrumb điều hướng trên desktop", en: "Checking desktop navigation breadcrumbs", ja: "デスクトップのパンくずリストの確認" },
      { vi: "Kiểm tra footer của website", en: "Checking the website footer", ja: "Webサイトのフッターの確認" },
    ], correct: 0,
    explain: { vi: "Gián đoạn hệ thống (cuộc gọi, thông báo, báo thức) là đặc thù thiết bị di động thật, gần như không xuất hiện khi kiểm thử web.", en: "System interruptions (calls, notifications, alarms) are specific to real mobile devices and almost never appear in web testing.", ja: "システムの割り込み（着信、通知、アラーム）は実機のモバイル端末に特有で、Webテストではほぼ現れません。" },
  }),
  mcq({
    q: { vi: "Khi app ShopEasy Mobile đang xử lý thanh toán mà người dùng nhận cuộc gọi đến, hành vi ĐÚNG kỳ vọng là gì?", en: "When ShopEasy Mobile is processing checkout and the user receives an incoming call, what is the correctly expected behavior?", ja: "ShopEasy Mobileが決済処理中にユーザーが着信を受けた場合、正しく期待される挙動は？" },
    options: [
      { vi: "App phải crash ngay để bảo vệ dữ liệu", en: "The app must crash immediately to protect data", ja: "データ保護のためアプリは即座にクラッシュすべき" },
      { vi: "App tạm dừng đúng trạng thái (background), khi quay lại foreground khôi phục đúng bước, không mất đơn", en: "The app correctly pauses state (background) and, when returning to foreground, restores the correct step without losing the order", ja: "アプリは状態を正しく一時停止（バックグラウンド化）し、フォアグラウンドに戻った際に正しいステップを復元し、注文を失わない" },
      { vi: "App tự động huỷ đơn hàng đang xử lý", en: "The app automatically cancels the order being processed", ja: "アプリは処理中の注文を自動的にキャンセルする" },
      { vi: "App không cần xử lý gì vì cuộc gọi không liên quan tới app", en: "The app doesn't need to handle anything since the call is unrelated to the app", ja: "通話はアプリと無関係なので何も処理する必要はない" },
    ], correct: 1,
    explain: { vi: "Đây chính là bản chất của kiểm thử vòng đời app: gián đoạn không được làm mất dữ liệu, app phải khôi phục đúng trạng thái khi quay lại.", en: "This is the essence of app lifecycle testing: an interruption must not lose data, and the app must restore the correct state on return.", ja: "これはアプリのライフサイクルテストの本質です：割り込みによってデータを失ってはならず、復帰時に正しい状態を復元しなければなりません。" },
  }),
  mcq({
    q: { vi: "Vì sao cần test chuyển đổi wifi → 4G → mất mạng ngay giữa lúc gửi yêu cầu đặt hàng?", en: "Why test switching wifi → 4G → no connection right in the middle of sending an order request?", ja: "注文リクエスト送信中にWi-Fi→4G→通信断と切り替わるケースをなぜテストする？" },
    options: [
      { vi: "Chỉ để đo tốc độ mạng cho vui", en: "Just to measure network speed for fun", ja: "単にネットワーク速度を測るため" },
      { vi: "Để tránh gửi trùng yêu cầu (duplicate) hoặc hiển thị sai trạng thái đơn khi mất phản hồi từ server", en: "To avoid duplicate requests or showing the wrong order status when the server response is lost", ja: "サーバーからの応答が失われた際に重複リクエストや注文状態の誤表示を防ぐため" },
      { vi: "Để kiểm tra dung lượng pin còn lại", en: "To check remaining battery capacity", ja: "残りのバッテリー容量を確認するため" },
      { vi: "Không cần thiết vì server luôn xử lý đúng mọi trường hợp", en: "It's unnecessary because the server always handles every case correctly", ja: "サーバーは常にすべてのケースを正しく処理するので不要" },
    ], correct: 1,
    explain: { vi: "Chuyển mạng giữa chừng dễ gây gửi trùng request hoặc client không nhận được phản hồi thành công, dẫn tới hiển thị sai trạng thái đơn hàng.", en: "Switching networks mid-request easily causes duplicate requests, or the client not receiving a success response, leading to wrong order status.", ja: "リクエスト中のネットワーク切り替えは重複リクエストや、クライアントが成功応答を受け取れず注文状態が誤表示される原因になりやすいです。" },
  }),
  mcq({
    q: { vi: "App bị hệ điều hành 'kill' khi chạy nền do thiếu bộ nhớ. Ca kiểm thử quan trọng nhất cần xác nhận là gì?", en: "The app gets killed by the OS while backgrounded due to low memory. What's the most important test case to confirm?", ja: "アプリがメモリ不足でバックグラウンド中にOSにキルされた場合、最も重要な確認すべきテストケースは？" },
    options: [
      { vi: "Giao diện có đổi màu khi khởi động lại không", en: "Whether the UI changes color on restart", ja: "再起動時にUIの色が変わるかどうか" },
      { vi: "App khởi động lại có khôi phục đúng giỏ hàng/phiên đăng nhập, không mất dữ liệu người dùng đã nhập", en: "Whether restarting correctly restores the cart/login session without losing data the user entered", ja: "再起動時にカート・ログインセッションが正しく復元され、ユーザー入力データが失われないか" },
      { vi: "Icon app trên màn hình chính có đẹp không", en: "Whether the home screen app icon looks nice", ja: "ホーム画面のアプリアイコンが美しいかどうか" },
      { vi: "Tốc độ cài đặt app từ store", en: "The app's install speed from the app store", ja: "ストアからのアプリのインストール速度" },
    ], correct: 1,
    explain: { vi: "Mất dữ liệu người dùng (giỏ hàng, phiên đăng nhập, form đang điền) khi app bị kill nền là lỗi nghiêm trọng và rất phổ biến trên thiết bị RAM thấp.", en: "Losing user data (cart, login session, in-progress form) when the app is killed in the background is a serious and very common bug on low-RAM devices.", ja: "アプリがバックグラウンドでキルされた際にユーザーデータ（カート、ログインセッション、入力中のフォーム）を失うのは、RAMの少ない端末で非常によくある深刻なバグです。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử responsive/đa kích thước màn hình cho app di động, điều gì KHÔNG nên bỏ qua?", en: "When testing responsive/multiple screen sizes for a mobile app, what should NOT be skipped?", ja: "モバイルアプリのレスポンシブ／複数画面サイズをテストする際、省略してはいけないことは？" },
    options: [
      { vi: "Chỉ test trên đúng 1 thiết bị flagship mới nhất", en: "Only testing on exactly one latest flagship device", ja: "最新のフラッグシップ機1台だけでテストする" },
      { vi: "Test trên nhiều kích thước màn hình, tỉ lệ khung hình, cả xoay ngang/dọc và màn có notch/tai thỏ", en: "Testing across multiple screen sizes, aspect ratios, both portrait/landscape rotation, and notch/cutout screens", ja: "複数の画面サイズ、アスペクト比、縦横回転、ノッチ／切り欠きのある画面でテストする" },
      { vi: "Chỉ test giao diện chế độ tối (dark mode)", en: "Only testing dark mode UI", ja: "ダークモードのUIだけをテストする" },
      { vi: "Không cần test trên máy tính bảng (tablet)", en: "No need to test on tablets", ja: "タブレットでのテストは不要" },
    ], correct: 1,
    explain: { vi: "Người dùng thật dùng rất nhiều kích thước màn hình, tỉ lệ khung hình và hướng xoay khác nhau — bỏ sót góc nào cũng có thể gây vỡ giao diện hoặc mất dữ liệu form.", en: "Real users use a huge variety of screen sizes, aspect ratios and orientations — missing any angle can break the UI or lose form data.", ja: "実際のユーザーは非常に多様な画面サイズ、アスペクト比、向きを使用しており、どれか一つでも見落とすとUI崩れやフォームデータの喪失につながります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & ma trận yếu tố cần kiểm thử", en: "1. TL;DR & the test-factor matrix", ja: "1. 要点とテスト要素マトリクス" },
    blocks: [
      TLDR("Kiểm thử ứng dụng di động nâng cao là việc chủ động mô phỏng các yếu tố chỉ tồn tại trên thiết bị thật: gián đoạn hệ thống (cuộc gọi/thông báo), chuyển mạng wifi↔4G↔mất mạng, vòng đời app (chạy nền/bị kill/pin yếu), xoay màn hình, đa kích thước/độ phân giải, cử chỉ, quyền hệ thống và deep link. Bài này bám sát app TMĐT ShopEasy Mobile, có ma trận yếu tố, mockup giao diện thật, hai tình huống lỗi có thật và trắc nghiệm cuối bài.",
        "Advanced mobile app testing means deliberately simulating factors that only exist on real devices: system interruptions (calls/notifications), network switching wifi↔4G↔offline, the app lifecycle (background/killed/low battery), screen rotation, multiple screen sizes/resolutions, gestures, system permissions and deep links. This article follows ShopEasy Mobile's e-commerce app, with a factor matrix, realistic UI mockups, two real bug situations and a quiz at the end.",
        "モバイルアプリの上級テストとは、実機でしか存在しない要素——システムの割り込み（着信／通知）、Wi-Fi↔4G↔通信断のネットワーク切り替え、アプリのライフサイクル（バックグラウンド／キル／バッテリー低下）、画面回転、複数の画面サイズ／解像度、ジェスチャー、システム権限、ディープリンク——を意図的に再現するテストです。本記事はECアプリShopEasy Mobileに沿い、要素マトリクス、リアルなUIモック、実際の2つのバグ事例、最後にクイズを収録しています。"),
      P("Ở cấp nâng cao, bạn không còn dừng lại ở việc test chức năng đúng-sai như thông thường. Kiểm thử ứng dụng di động chuyên sâu đòi hỏi bạn nghĩ như một người dùng thật đang cầm điện thoại giữa đời sống: họ nhận cuộc gọi lúc đang thanh toán, họ đi từ vùng có wifi sang vùng chỉ có 4G, họ để app chạy nền rồi quên mất, điện thoại họ hết pin dở chừng, họ xoay ngang màn hình để đọc thông tin dễ hơn. Mỗi tình huống đó đều là một 'điểm gãy' tiềm ẩn nếu đội phát triển chỉ test trên emulator ổn định trong văn phòng.",
        "At the advanced level, you go beyond simple pass/fail functional testing. Deep mobile app testing requires you to think like a real user holding a phone in everyday life: they get a call while paying, they move from a wifi zone into a 4G-only zone, they leave the app backgrounded and forget about it, their battery runs low mid-task, they rotate the screen to read information more easily. Each of these is a potential 'breaking point' if the development team only tests on a stable office emulator.",
        "上級レベルでは、通常の単純な合否だけの機能テストにとどまりません。モバイルアプリの深いテストでは、日常生活の中でスマートフォンを持つ実際のユーザーのように考える必要があります：決済中に着信を受ける、Wi-Fiエリアから4Gのみのエリアに移動する、アプリをバックグラウンドのまま放置する、作業途中でバッテリーが切れかける、情報を読みやすくするために画面を横に回転させる。開発チームがオフィスの安定したエミュレーターだけでテストしていれば、これらはすべて潜在的な『破綻ポイント』になります。"),
      IMG(m_matrix, "Ma trận yếu tố đặc thù cần kiểm thử trong Mobile Testing nâng cao, gắn app ShopEasy Mobile", "Matrix of mobile-specific test factors, mapped to the ShopEasy Mobile app", "ShopEasy Mobileアプリに紐づけたモバイル特有のテスト要素マトリクス"),
      DEF("Mobile Testing nâng cao (Advanced Mobile Testing)", "kiểm thử ứng dụng di động ở mức chuyên sâu, chủ động mô phỏng gián đoạn hệ thống, chuyển mạng, vòng đời app, xoay màn hình, đa kích thước, cử chỉ, quyền hệ thống và deep link — những yếu tố chỉ xuất hiện đầy đủ trên thiết bị di động thật.",
        "in-depth mobile app testing that deliberately simulates system interruptions, network switching, the app lifecycle, screen rotation, multiple screen sizes, gestures, system permissions and deep links — factors that fully appear only on real mobile devices.",
        "システムの割り込み、ネットワーク切り替え、アプリのライフサイクル、画面回転、複数画面サイズ、ジェスチャー、システム権限、ディープリンクなど、実機のモバイル端末でのみ完全に現れる要素を意図的に再現する、深いレベルのモバイルアプリテスト。"),
    ] },
  { heading: { vi: "2. Gián đoạn hệ thống: cuộc gọi, thông báo, báo thức", en: "2. System interruptions: calls, notifications, alarms", ja: "2. システムの割り込み：着信・通知・アラーム" },
    blocks: [
      P("Điện thoại là thiết bị 'đa nhiệm bắt buộc': tại bất kỳ thời điểm nào, một cuộc gọi đến, một thông báo tin nhắn, một báo thức, hay một popup xin quyền của app khác đều có thể đè lên màn hình ShopEasy Mobile mà người dùng không hề chủ động. Với kiểm thử ứng dụng di động, đây là nhóm ca kiểm thử bắt buộc phải có, vì tần suất xảy ra trong đời thực rất cao — đặc biệt ở đúng lúc người dùng đang thao tác quan trọng nhất: thanh toán.",
        "A phone is an 'involuntary multitasking' device: at any moment, an incoming call, a message notification, an alarm, or another app's permission popup can appear over the ShopEasy Mobile screen without the user initiating it. In mobile app testing, this group of test cases is mandatory, because it happens very frequently in real life — especially at the exact moment the user is doing something critical: paying.",
        "スマートフォンは『強制的なマルチタスク』端末です。いつでも、着信、メッセージ通知、アラーム、あるいは他アプリの権限ポップアップが、ユーザーが望んでいなくてもShopEasy Mobileの画面上に表示され得ます。モバイルアプリテストにおいて、このグループのテストケースは必須です。実生活で非常に頻繁に起き、特にユーザーが最も重要な操作——決済——をしている最中に起きやすいからです。"),
      IMG(m_call, "Màn hình ShopEasy Mobile đang thanh toán bị chèn cuộc gọi đến — yêu cầu giữ nguyên trạng thái đơn hàng", "ShopEasy Mobile checkout screen interrupted by an incoming call — the order state must be preserved", "決済中のShopEasy Mobile画面に着信が割り込む — 注文状態を保持しなければならない"),
      P("Bộ ca kiểm thử cần bao phủ ít nhất: (1) nhận cuộc gọi khi đang điền form, (2) nhận cuộc gọi ngay lúc bấm nút gửi yêu cầu, (3) nhận thông báo đẩy (push notification) của chính app hoặc app khác khi đang xem giỏ hàng, (4) báo thức hoặc lịch nhắc kích hoạt giữa lúc thanh toán. Với mỗi ca, kỳ vọng luôn là: app chuyển sang nền đúng cách (không crash), giữ nguyên toàn bộ dữ liệu người dùng đã nhập, và khi quay lại foreground phải hiển thị đúng bước đang dang dở — không tự động tiến hoặc lùi bước.",
        "The test case set must cover at least: (1) an incoming call while filling a form, (2) a call right when the submit button is tapped, (3) a push notification (from the app itself or another app) while viewing the cart, (4) an alarm or calendar reminder firing mid-checkout. For each case, the expectation is always: the app backgrounds correctly (no crash), keeps all entered user data intact, and shows the correct in-progress step when returning to foreground — without auto-advancing or reverting steps.",
        "テストケース群は少なくとも次を網羅すべきです：(1) フォーム入力中の着信、(2) 送信ボタンを押した瞬間の着信、(3) カート閲覧中の（自アプリまたは他アプリの）プッシュ通知、(4) 決済中のアラームやカレンダー通知の発火。各ケースでの期待動作は常に：アプリが正しくバックグラウンド化する（クラッシュしない）、入力済みのユーザーデータをすべて保持する、フォアグラウンドに戻った際に進行中の正しいステップを表示する（勝手に進んだり戻ったりしない）ことです。"),
      TIP("Ưu tiên test gián đoạn ngay TẠI thời điểm gửi request (network call đang chạy), không chỉ trước hoặc sau — đây là khoảng thời gian dễ sinh lỗi race condition nhất.", "Prioritize testing the interruption right AT the moment a request is being sent (an active network call), not just before or after — this window is the most prone to race-condition bugs.", "割り込みは、リクエスト送信中（ネットワーク呼び出し実行中）のまさにその瞬間を優先的にテストしよう。前後だけでなく——この時間帯が最もレースコンディションのバグを生みやすい。"),
    ] },
  { heading: { vi: "3. Chuyển mạng: wifi ↔ 4G ↔ mất mạng", en: "3. Network switching: wifi ↔ 4G ↔ no connection", ja: "3. ネットワーク切り替え：Wi-Fi↔4G↔通信断" },
    blocks: [
      P("Người dùng ShopEasy Mobile không đứng yên một chỗ: họ mở app ở nhà (wifi), ra đường (4G), vào thang máy hoặc hầm gửi xe (mất mạng hoàn toàn), rồi lại có mạng khi ra ngoài. Mỗi lần chuyển đổi loại kết nối là một cơ hội để lộ ra lỗi mà kiểm thử chỉ trên wifi ổn định của văn phòng không bao giờ bắt được: request bị gửi trùng, phản hồi bị mất khiến giao diện treo ở trạng thái 'đang xử lý' vô thời hạn, hoặc dữ liệu giỏ hàng bị đồng bộ sai.",
        "ShopEasy Mobile users don't stay in one place: they open the app at home (wifi), go outside (4G), enter an elevator or underground parking (no connection at all), then regain connection outside. Every connection-type switch is a chance to expose bugs that testing only on a stable office wifi will never catch: duplicate requests, lost responses that leave the UI stuck 'processing' indefinitely, or incorrectly synced cart data.",
        "ShopEasy Mobileのユーザーは一箇所にとどまりません：自宅（Wi-Fi）でアプリを開き、外出（4G）し、エレベーターや地下駐車場（完全に通信断）に入り、外に出るとまた接続が回復します。接続種別が切り替わるたびに、安定したオフィスのWi-Fiだけでのテストでは決して捕まえられないバグが露呈するチャンスになります：リクエストの重複送信、応答喪失によりUIが『処理中』のまま無期限に固まる、カートデータの同期誤りなどです。"),
      IMG(m_network, "Bảng các ca gián đoạn/chuyển mạng bắt buộc kiểm thử trên ShopEasy Mobile", "Table of mandatory interruption/network-switch cases for ShopEasy Mobile", "ShopEasy Mobileで必須のネットワーク切り替え/割り込みケース一覧表"),
      P("Điểm mấu chốt khi thiết kế ca kiểm thử chuyển mạng là tính IDEMPOTENT — nghĩa là dù request bị gửi lại nhiều lần do mạng chập chờn, kết quả cuối cùng phải giống hệt như chỉ gửi đúng một lần. Với đơn hàng, điều này có nghĩa: bấm 'Đặt hàng' 2 lần vì tưởng lần đầu chưa thành công (do màn hình không phản hồi khi mất mạng) không được tạo ra 2 đơn hàng riêng biệt. Ngoài ra, cần test cả trường hợp mất mạng NGAY SAU khi server đã xử lý xong nhưng phản hồi chưa kịp về máy khách — client phải có cơ chế kiểm tra lại trạng thái thay vì mặc định coi là thất bại.",
        "The key point when designing network-switch test cases is IDEMPOTENCE — meaning even if a request gets resent multiple times due to a flaky connection, the final result must be identical to sending it exactly once. For orders, this means: tapping 'Order' twice because the first tap seemed to fail (the screen didn't respond due to lost connection) must not create two separate orders. You should also test the case where connection is lost RIGHT AFTER the server finished processing but before the response reached the client — the client must re-check the actual status instead of assuming failure by default.",
        "ネットワーク切り替えのテストケースを設計する際の要点は冪等性（IDEMPOTENT）です——つまり、通信が不安定なためリクエストが何度再送されても、最終結果はちょうど1回送信した場合と同じでなければなりません。注文の場合、これは：通信断で画面が反応しなかったため最初の試行が失敗したと思って『注文する』を2回押しても、2件の別々の注文が作成されてはいけないことを意味します。さらに、サーバーが処理を終えた直後、応答がクライアントに届く前に通信が切れるケースもテストすべきです——クライアントはデフォルトで失敗とみなすのではなく、実際の状態を再確認する仕組みを持つべきです。"),
    ] },
  { heading: { vi: "4. Vòng đời app: chạy nền, bị hệ điều hành kill, pin yếu", en: "4. App lifecycle: background, killed by the OS, low battery", ja: "4. アプリのライフサイクル：バックグラウンド、OSによるキル、バッテリー低下" },
    blocks: [
      P("Trên di động, một app không bao giờ 'tắt hẳn' theo cách người dùng nghĩ. Khi bạn chuyển sang app khác, ShopEasy Mobile chỉ chuyển xuống 'nền' (background) và hệ điều hành có toàn quyền quyết định: giữ nguyên trong bộ nhớ, tạm dừng tiến trình, hoặc thẳng tay 'kill' tiến trình để giải phóng RAM cho app đang mở phía trước — đặc biệt phổ biến trên các máy Android tầm trung/RAM thấp. Kiểm thử ứng dụng di động nâng cao bắt buộc phải mô phỏng đủ 3 trạng thái này, không chỉ dừng ở 'mở app rồi đóng app' như kiểm thử cơ bản.",
        "On mobile, an app never really 'turns off' the way users imagine. When you switch to another app, ShopEasy Mobile is only moved to the 'background', and the OS fully decides what happens next: keep it in memory, suspend the process, or bluntly kill the process to free RAM for the app now in front — especially common on mid-range/low-RAM Android devices. Advanced mobile app testing must simulate all three states, not just 'open the app then close it' as in basic testing.",
        "モバイルでは、アプリはユーザーが思うような形で完全に『終了』することはありません。別のアプリに切り替えると、ShopEasy Mobileは『バックグラウンド』に移されるだけで、その後どうなるかはOSが完全に決定します：メモリに保持する、プロセスを一時停止する、あるいは前面のアプリのためにRAMを解放するためプロセスを容赦なく『キル』する——これはミッドレンジ／低RAMのAndroid端末で特によく起こります。モバイルアプリの上級テストは、基本的なテストのように『アプリを開いて閉じる』だけでなく、この3つの状態すべてを再現する必要があります。"),
      P("Trường hợp nguy hiểm nhất là app bị kill khi người dùng đang ở giữa luồng thanh toán, vì lúc đó dữ liệu giỏ hàng và tiến trình thanh toán thường chỉ tồn tại tạm thời trong bộ nhớ (in-memory state) nếu đội phát triển chưa lưu đúng cách xuống local storage hoặc đồng bộ server. Thêm vào đó, khi điện thoại vào 'chế độ tiết kiệm pin' (low power mode/battery saver), hệ điều hành thường giới hạn mạnh tay hoạt động nền: tắt refresh tự động, hạn chế đồng bộ, làm chậm animation — những hành vi này cần được test riêng vì chúng thay đổi cách app hoạt động một cách âm thầm mà người dùng không hề chủ động bật lên trong app.",
        "The most dangerous case is the app being killed while the user is mid-checkout, because cart data and the checkout progress often only exist temporarily in memory if the development team hasn't properly persisted it to local storage or synced it to the server. In addition, when the phone enters 'low power mode/battery saver', the OS often aggressively restricts background activity: disabling auto-refresh, limiting sync, slowing animations — these behaviors need dedicated testing because they silently change how the app works without the user ever toggling anything inside the app itself.",
        "最も危険なケースは、ユーザーが決済の途中でアプリがキルされることです。開発チームがローカルストレージへの適切な永続化やサーバーへの同期を実装していない場合、カートデータや決済の進行状況は一時的にメモリ上にしか存在しないことが多いからです。さらに、スマートフォンが『低電力モード／バッテリーセーバー』に入ると、OSはバックグラウンド動作を強く制限することが多く、自動更新の無効化、同期の制限、アニメーションの低速化などが起きます——これらはアプリ内で何も操作していないのに動作が静かに変わるため、専用のテストが必要です。"),
      IMG(m_jira, "Ticket lỗi thật: giỏ hàng ShopEasy Mobile bị mất trắng khi app bị hệ điều hành kill lúc thanh toán", "Real bug ticket: ShopEasy Mobile's cart is wiped when the app is killed by the OS during checkout", "実際のバグチケット：決済中にOSがアプリをキルした結果ShopEasy Mobileのカートが完全に消える"),
      TIP("Muốn ép app bị kill để test, dùng dev options 'Don't keep activities' (Android) hoặc thu hồi bộ nhớ bằng cách mở liên tiếp nhiều app nặng, thay vì chỉ vuốt app ra khỏi recent apps — vuốt tay không tương đương với OS chủ động kill.", "To force-kill the app for testing, use the Android developer option 'Don't keep activities' or reclaim memory by opening several heavy apps in a row, instead of just swiping the app away from recent apps — manually swiping is not equivalent to the OS proactively killing it.", "テストのためにアプリを強制キルするには、Androidの開発者向けオプション『アクティビティを保持しない』を使うか、重いアプリを連続して開いてメモリを消費させよう。最近使ったアプリからスワイプで消すだけでは、OSが能動的にキルする挙動と同等ではない。"),
    ] },
  { heading: { vi: "5. Xoay màn hình & đa kích thước/độ phân giải", en: "5. Screen rotation & multiple screen sizes/resolutions", ja: "5. 画面回転と複数の画面サイズ／解像度" },
    blocks: [
      P("Xoay màn hình (orientation change) tưởng là một tính năng nhỏ nhưng lại là một trong những nguồn lỗi kinh điển nhất của kiểm thử ứng dụng di động: trên nhiều nền tảng, khi màn hình xoay, hệ thống có thể huỷ và tạo lại (re-create) màn hình hiện tại — nếu app không lưu lại đúng trạng thái (state) trước khi huỷ, toàn bộ dữ liệu người dùng vừa nhập trong form (địa chỉ giao hàng, ghi chú đơn hàng, mã giảm giá) có thể biến mất ngay lập tức chỉ vì người dùng xoay điện thoại để đọc thông tin dễ hơn.",
        "Screen rotation might seem like a minor feature, but it's one of the most classic bug sources in mobile app testing: on many platforms, when the screen rotates, the system can destroy and re-create the current screen — if the app doesn't properly save state before destruction, all the data the user just entered in a form (shipping address, order note, discount code) can vanish instantly just because they rotated the phone to read information more easily.",
        "画面回転は些細な機能に見えますが、モバイルアプリテストにおける最も典型的なバグの原因の一つです：多くのプラットフォームでは、画面が回転すると現在の画面が破棄され再生成されることがあります——アプリが破棄前に状態を正しく保存していないと、フォームに入力したばかりのデータ（配送先住所、注文メモ、割引コード）が、単に情報を読みやすくするために端末を回転させただけで即座に消えてしまう可能性があります。"),
      P("Bên cạnh xoay màn hình, đa kích thước/độ phân giải là bài toán lớn hơn nhiều so với web responsive thông thường. Thị trường di động có hàng trăm tổ hợp: màn hình nhỏ (giá rẻ), màn hình lớn (phablet), tỉ lệ khung hình khác nhau, màn có notch/tai thỏ/đục lỗ camera, và cả các thiết bị gập (foldable) hoặc chế độ chia đôi màn hình (split-screen) trên tablet. Với ShopEasy Mobile, các khu vực rủi ro cao nhất là: nút 'Đặt hàng' có bị che khuất bởi vùng notch/thanh điều hướng không, bảng giá sản phẩm có bị tràn chữ trên màn hình nhỏ không, và layout giỏ hàng có tận dụng đúng không gian trên màn hình lớn/tablet không.",
        "Beyond rotation, multiple screen sizes/resolutions are a much bigger problem than ordinary web responsiveness. The mobile market has hundreds of combinations: small budget screens, large phablets, different aspect ratios, notch/cutout/punch-hole camera screens, and even foldable devices or split-screen mode on tablets. For ShopEasy Mobile, the highest-risk areas are: whether the 'Order' button gets obscured by the notch/navigation bar area, whether the product price table overflows text on small screens, and whether the cart layout properly uses the space on large screens/tablets.",
        "回転に加え、複数の画面サイズ／解像度は通常のWebレスポンシブよりもはるかに大きな課題です。モバイル市場には何百もの組み合わせがあります：小さな低価格端末、大きなファブレット、異なるアスペクト比、ノッチ／切り欠き／パンチホールカメラのある画面、さらには折りたたみ端末やタブレットの分割画面モードなどです。ShopEasy Mobileにおいて最もリスクの高い箇所は：『注文する』ボタンがノッチ／ナビゲーションバー領域に隠れていないか、小さな画面で商品価格表のテキストがはみ出していないか、大画面／タブレットでカートのレイアウトが空間を適切に活用しているかです。"),
      TRY("Xoay điện thoại của bạn sang ngang ngay giữa lúc điền một form dài (ví dụ form đăng ký) trong một app bất kỳ, xem dữ liệu đã nhập có còn nguyên không.", "Rotate your phone to landscape right in the middle of filling a long form (e.g. a signup form) in any app, and see if the entered data survives.", "任意のアプリで長いフォーム（例：登録フォーム）に入力している最中に端末を横向きに回転させ、入力済みのデータが保持されるか確認してみよう。"),
    ] },
  { heading: { vi: "6. Cử chỉ, quyền hệ thống & deep link", en: "6. Gestures, system permissions & deep links", ja: "6. ジェスチャー、システム権限、ディープリンク" },
    blocks: [
      P("Cử chỉ chạm (gesture) là ngôn ngữ tương tác riêng của di động: vuốt để xoá sản phẩm khỏi giỏ hàng, kéo-thả để sắp xếp lại danh sách yêu thích, nhấn giữ để mở menu nhanh, chụm hai ngón để phóng to ảnh sản phẩm, vuốt cạnh màn hình để quay lại trang trước. Mỗi cử chỉ đều cần ca kiểm thử riêng cho cả trường hợp thực hiện đúng lẫn thực hiện 'nửa chừng' — ví dụ vuốt xoá sản phẩm nhưng dừng giữa chừng rồi thả tay, hệ thống phải trả sản phẩm về đúng vị trí ban đầu thay vì để giao diện ở trạng thái lửng lơ.",
        "Touch gestures are mobile's own interaction language: swipe to remove a product from the cart, drag-and-drop to reorder a wishlist, long-press to open a quick menu, pinch to zoom a product photo, swipe from the screen edge to go back. Every gesture needs its own test cases for both a complete action and a 'half-way' action — for example swiping to delete a product but releasing halfway, where the system must snap the item back to its original position instead of leaving the UI in a stuck, ambiguous state.",
        "タッチジェスチャーはモバイル独自の操作言語です：スワイプでカートから商品を削除、ドラッグ＆ドロップでお気に入りリストを並べ替え、長押しでクイックメニューを開く、ピンチで商品写真をズーム、画面端からのスワイプで前の画面に戻る。各ジェスチャーには、完全な操作と『途中でやめる』操作の両方に専用のテストケースが必要です——例えば商品削除のスワイプを途中で離した場合、UIが宙ぶらりんの状態のままにならず、システムは項目を元の位置に戻さなければなりません。"),
      P("Quyền hệ thống (camera để quét mã giảm giá, vị trí để gợi ý cửa hàng gần nhất, thông báo để nhắc đơn hàng) là một nhóm rủi ro riêng: người dùng có toàn quyền TỪ CHỐI bất kỳ quyền nào, và app phải xử lý mượt mà thay vì crash hoặc để tính năng 'chết lặng' không phản hồi. Bộ ca cần có: từ chối quyền lần đầu rồi thử lại tính năng, từ chối vĩnh viễn ('không hỏi lại') rồi kiểm tra app có hướng dẫn người dùng vào Cài đặt để bật thủ công không, và cấp quyền rồi thu hồi quyền ngay khi app đang chạy.",
        "System permissions (camera to scan a discount code, location to suggest the nearest store, notifications to remind about an order) form their own risk group: users have full authority to DENY any permission, and the app must handle it gracefully instead of crashing or leaving the feature silently unresponsive. The test set needs: denying permission the first time then retrying the feature, permanently denying it ('don't ask again') then checking whether the app guides the user to Settings to enable it manually, and granting then revoking permission while the app is running.",
        "システム権限（クーポン読み取りのためのカメラ、最寄り店舗提案のための位置情報、注文リマインドのための通知）は独自のリスクグループを形成します：ユーザーはどの権限も拒否する完全な権限を持っており、アプリはクラッシュしたり機能が静かに無反応になったりせず、うまく処理しなければなりません。テストセットには次が必要です：初回に権限を拒否してから機能を再試行する、永久に拒否（『二度と確認しない』）してからアプリが手動で有効にするよう設定画面へ案内するか確認する、アプリ実行中に権限を付与してから取り消す。"),
      P("Deep link (liên kết mở thẳng vào một màn hình cụ thể trong app, ví dụ link khuyến mãi trên Zalo/SMS mở thẳng vào trang chi tiết sản phẩm) cần được test ở cả 4 tổ hợp: app đã cài + đã đăng nhập, app đã cài + chưa đăng nhập, app CHƯA cài (phải chuyển hướng ra store rồi quay lại đúng màn hình sau khi cài), và link hết hạn/sản phẩm không còn tồn tại. Bỏ sót bất kỳ tổ hợp nào cũng có thể khiến chiến dịch marketing tốn tiền quảng cáo nhưng dẫn khách vào một màn hình lỗi hoặc màn hình trắng.",
        "Deep links (links that open directly into a specific screen in the app, e.g. a promo link on Zalo/SMS opening directly to a product detail page) need to be tested across all 4 combinations: app installed + logged in, app installed + not logged in, app NOT installed (must redirect to the store and then land on the right screen after install), and an expired link/a product that no longer exists. Missing any combination can mean a marketing campaign spends money on ads that lead customers to an error screen or a blank screen.",
        "ディープリンク（アプリ内の特定画面へ直接開くリンク。例：Zalo/SMS上のプロモリンクが商品詳細ページへ直接開く）は、4つの組み合わせすべてでテストする必要があります：アプリインストール済み＋ログイン済み、アプリインストール済み＋未ログイン、アプリ未インストール（ストアへリダイレクトし、インストール後に正しい画面へ着地する必要がある）、そして期限切れリンク／存在しなくなった商品。どの組み合わせを見落としても、マーケティングキャンペーンが広告費をかけて顧客をエラー画面や空白画面に誘導してしまう可能性があります。"),
    ] },
  { heading: { vi: "7. Thiết kế bộ ca kiểm thử di động nâng cao (thực hành)", en: "7. Designing an advanced mobile test suite (hands-on)", ja: "7. 上級モバイルテストスイートの設計（実習）" },
    blocks: [
      P("Với lượng yếu tố đặc thù lớn như vậy, bạn cần một quy trình có hệ thống thay vì nghĩ ngẫu hứng từng ca. Các bước dưới đây giúp bạn dựng bộ ca kiểm thử di động nâng cao một cách có chủ đích, ưu tiên đúng rủi ro cao nhất trước.",
        "With this many mobile-specific factors, you need a systematic process instead of thinking up cases at random. The steps below help you build an advanced mobile test suite deliberately, prioritizing the highest risks first.",
        "これほど多くのモバイル特有の要素があるため、思いつきでケースを考えるのではなく体系的なプロセスが必要です。以下の手順は、最もリスクの高いものを優先しながら意図的に上級モバイルテストスイートを構築するのに役立ちます。"),
      STEP(1, "Dựng ma trận thiết bị/OS ưu tiên theo tỉ lệ người dùng thật (top phiên bản Android/iOS, top kích thước màn hình phổ biến của khách hàng ShopEasy).", "Build a device/OS matrix prioritized by real user share (top Android/iOS versions, top screen sizes among ShopEasy customers).", "実際のユーザー比率に基づいて優先順位付けした端末/OSマトリクスを構築する（ShopEasy顧客の上位Android/iOSバージョン、上位画面サイズ）。"),
      STEP(2, "Với mỗi tính năng trọng yếu (đăng nhập, giỏ hàng, thanh toán), lập danh sách 'trục gián đoạn' cần chèn vào: cuộc gọi, chuyển mạng, nền/kill, xoay màn hình, quyền hệ thống.", "For each critical feature (login, cart, checkout), list the 'interruption axes' to inject: calls, network switch, background/kill, rotation, system permissions.", "各重要機能（ログイン、カート、決済）について、挿入すべき『割り込み軸』のリストを作成する：着信、ネットワーク切り替え、バックグラウンド／キル、回転、システム権限。"),
      STEP(3, "Viết ca kiểm thử theo công thức 3 phần: Thao tác chính đang làm + Điểm chèn gián đoạn (khi nào, trục nào) + Kết quả mong đợi khi khôi phục.", "Write test cases using a 3-part formula: the main action in progress + the interruption injection point (when, which axis) + the expected result on recovery.", "3部構成の公式でテストケースを書く：進行中の主操作＋割り込みの挿入ポイント（いつ、どの軸か）＋復帰時の期待結果。"),
      STEP(4, "Ưu tiên chạy trên THIẾT BỊ THẬT (không chỉ giả lập) cho mọi ca liên quan cảm biến, mạng thật, pin thật, và cuộc gọi thật.", "Prioritize running on REAL DEVICES (not just emulators) for every case involving sensors, real networks, real battery, and real calls.", "センサー、実際のネットワーク、実際のバッテリー、実際の着信に関わるすべてのケースは、実機（エミュレーターだけでなく）で優先的に実行する。"),
      CODE("text", "CA KIEM THU DI DONG NANG CAO - luong Thanh toan (ShopEasy Mobile)\nCa 1: Thao tac = dang dien form dia chi | Chen = xoay man hinh ngang | Ky vong = giu nguyen du lieu da nhap\nCa 2: Thao tac = bam 'Xac nhan thanh toan' | Chen = cuoc goi den ngay luc gui request | Ky vong = giu dung buoc, khong mat don, khong tao don trung\nCa 3: Thao tac = dang tai trang xac nhan | Chen = 4G chuyen sang Wifi | Ky vong = khong tao 2 don hang song song\nCa 4: Thao tac = chuyen sang app khac 5 phut | Chen = OS kill app do thieu RAM | Ky vong = mo lai khoi phuc dung gio hang + buoc dang do"),
      TRY("Thử gọi điện cho chính bạn (hoặc nhờ người khác gọi) đúng lúc bạn đang điền form thanh toán trên một app mua sắm thật mà bạn dùng, rồi quan sát app có giữ đúng dữ liệu khi bạn quay lại không.", "Try calling yourself (or ask someone to call you) right while you're filling out a checkout form on a real shopping app you use, then observe whether the app keeps the data correctly when you return.", "実際に使っている買い物アプリで決済フォームを入力している最中に自分に電話をかけて（または誰かに頼んで）みて、戻ったときにアプリがデータを正しく保持しているか観察しよう。"),
      PITFALL("Chỉ test trên giả lập kết nối wifi ổn định của văn phòng, quên hoàn toàn các ca gián đoạn/mạng thật/pin yếu — đây là lý do phổ biến nhất khiến lỗi mobile lọt production dù bộ test 'trông có vẻ đầy đủ'.", "Testing only on an emulator with the office's stable wifi, completely forgetting real interruption/network/low-battery cases — this is the most common reason mobile bugs escape to production even when the test suite 'looks thorough'.", "オフィスの安定したWi-Fiのエミュレーターだけでテストし、実際の割り込み／ネットワーク／バッテリー低下のケースを完全に忘れること——これは、テストスイートが『十分に見えて』も本番環境にモバイルのバグが漏れる最も一般的な理由です。"),
    ] },
  { heading: { vi: "8. Tình huống 1: nhận cuộc gọi giữa lúc thanh toán → app crash, mất đơn", en: "8. Situation 1: an incoming call mid-checkout → the app crashes, order lost", ja: "8. シーン1：決済中の着信 → アプリがクラッシュし注文を失う" },
    blocks: [
      SITUATION("QA chỉ test luồng thanh toán liên tục, không có gián đoạn nào chen vào — mọi ca đều pass, đội tự tin release bản cập nhật mới.", "QA only tests the checkout flow continuously with no interruption inserted — every case passes, the team confidently releases the new update.",
        "Trên production, một khách hàng đang bấm 'Xác nhận thanh toán' thì nhận cuộc gọi từ shipper của đơn hàng trước. App không lưu trạng thái đúng cách trước khi chuyển nền, khi quay lại cuộc gọi thì ShopEasy Mobile crash và toàn bộ đơn hàng vừa điền (giỏ hàng, địa chỉ, mã giảm giá) biến mất, khách phải làm lại từ đầu và bỏ cuộc giữa chừng.",
        "QA only tests the continuous checkout flow with no interruption inserted — every case passes, the team confidently releases the new update.",
        "In production, a customer taps 'Confirm payment' and then receives a call from the shipper of a previous order. The app doesn't save state properly before backgrounding; when the call ends, ShopEasy Mobile crashes and the entire order just filled in (cart, address, discount code) disappears — the customer has to start over and abandons the purchase.",
        "QAは割り込みを一切挿入せず、決済フローを連続でのみテストする——すべてのケースが合格し、チームは自信を持って新しいアップデートをリリースする。",
        "本番環境で、ある顧客が『決済を確認』をタップした直後、以前の注文の配達員から着信を受ける。アプリはバックグラウンド化する前に状態を正しく保存しておらず、通話が終わるとShopEasy Mobileがクラッシュし、たった今入力していた注文（カート、住所、割引コード）がすべて消える——顧客は最初からやり直す羽目になり、途中で購入を諦めてしまう。"),
      SOLVE("Bổ sung bộ ca kiểm thử gián đoạn bắt buộc cho MỌI luồng quan trọng (không chỉ thanh toán): cuộc gọi, thông báo, chuyển app khác. Yêu cầu đội phát triển lưu trạng thái form/giỏ hàng vào local storage NGAY khi mỗi trường được điền xong, không chờ tới khi bấm nút cuối cùng mới lưu một lần.", "Add mandatory interruption test cases for EVERY critical flow (not just checkout): calls, notifications, switching to another app. Require the dev team to persist form/cart state to local storage IMMEDIATELY as each field is completed, instead of only saving once when the final button is tapped.", "すべての重要フロー（決済だけでなく）に対して必須の割り込みテストケースを追加する：着信、通知、他アプリへの切り替え。開発チームには、最後のボタンを押した時に一度だけ保存するのではなく、各フィールドの入力が完了した瞬間にフォーム／カートの状態をローカルストレージへ即座に永続化するよう求める。"),
      P("Bài học cốt lõi ở đây: 'test luồng liên tục không gián đoạn' chỉ chứng minh được logic nghiệp vụ đúng trong điều kiện lý tưởng, hoàn toàn không phản ánh cách người dùng thật sự dùng điện thoại. Gián đoạn không phải là ngoại lệ hiếm gặp trên mobile — nó là MẶC ĐỊNH. Vì vậy mọi luồng quan trọng đều cần ít nhất một ca kiểm thử có gián đoạn chèn vào đúng thời điểm nhạy cảm nhất.",
        "The core lesson here: 'testing a continuous, uninterrupted flow' only proves the business logic is correct under ideal conditions — it doesn't reflect how real users actually use their phones at all. Interruption isn't a rare exception on mobile — it's the DEFAULT. So every critical flow needs at least one test case with an interruption inserted at its most sensitive moment.",
        "ここでの核心的な教訓：『割り込みのない連続フロー』のテストは、理想的な条件下でビジネスロジックが正しいことしか証明せず、実際のユーザーがスマートフォンをどう使うかをまったく反映していません。モバイルにおいて割り込みは稀な例外ではなく、デフォルトです。そのため、すべての重要フローには、最も敏感な瞬間に割り込みを挿入したテストケースが少なくとも1つ必要です。"),
      RECAP(["Gián đoạn (cuộc gọi/thông báo) là MẶC ĐỊNH trên mobile, không phải ngoại lệ", "Lưu trạng thái form/giỏ hàng ngay khi nhập, đừng chờ tới bước cuối"],
        ["Interruption (calls/notifications) is the DEFAULT on mobile, not the exception", "Persist form/cart state as soon as it's entered, don't wait until the final step"],
        ["モバイルにおいて割り込み（着信・通知）は例外ではなくデフォルト", "フォーム/カートの状態は入力され次第すぐ保存し、最終ステップまで待たない"]),
    ] },
  { heading: { vi: "9. Tình huống 2: chuyển 4G → wifi làm gửi đơn hàng 2 lần", en: "9. Situation 2: switching 4G → wifi causes the order to be sent twice", ja: "9. シーン2：4G→Wi-Fiへの切り替えで注文が2回送信される" },
    blocks: [
      SITUATION("Bạn chủ động thử bấm nút 'Đặt hàng' đúng lúc điện thoại đang chuyển từ sóng 4G sang wifi (đi từ ngoài đường vào nhà), chỉ để xem app phản ứng thế nào.", "You deliberately tap 'Order' right while your phone is switching from 4G to wifi (walking from outside into your house), just to see how the app reacts.",
        "Màn hình đứng yên ở trạng thái 'Đang xử lý...' quá lâu vì request đầu tiên bị rớt giữa chừng do đổi mạng. Bạn tưởng nút chưa nhận, bấm thêm lần nữa. Kết quả: server nhận được cả 2 request và tạo ra 2 đơn hàng giống hệt nhau, khách bị trừ tiền 2 lần.",
        "You deliberately tap 'Order' right while your phone is switching from 4G to wifi (walking from outside into your house), just to see how the app reacts.",
        "The screen stays stuck on 'Processing...' too long because the first request got dropped mid-flight due to the network change. Thinking the tap wasn't registered, you tap again. Result: the server receives both requests and creates two identical orders, and the customer gets charged twice.",
        "自宅に入るなど、端末が4GからWi-Fiに切り替わっているまさにその瞬間に『注文する』ボタンをあえて押し、アプリの反応を確認してみる。",
        "ネットワーク変更の途中で最初のリクエストが失われたため、画面は長い間『処理中…』のまま固まる。タップが認識されなかったと思い、もう一度タップする。結果：サーバーが両方のリクエストを受け取り、まったく同じ注文が2件作成され、顧客は2回課金されてしまう。"),
      SOLVE("Báo bug mức Critical ngay vì ảnh hưởng trực tiếp tới tiền của khách hàng; đề xuất backend cấp một 'mã idempotency key' duy nhất cho mỗi lần bấm 'Đặt hàng' để server tự động từ chối request trùng, đồng thời frontend phải khoá nút ngay sau lần bấm đầu tiên và hiển thị rõ trạng thái đang xử lý.", "Report it as a Critical bug immediately since it directly affects the customer's money; propose the backend issue a unique 'idempotency key' for each 'Order' tap so the server automatically rejects duplicate requests, while the frontend must disable the button right after the first tap and clearly show the processing state.", "顧客のお金に直接影響するため即座にCriticalバグとして報告する。バックエンドには各『注文する』タップに一意の『冪等性キー』を発行させ、サーバーが重複リクエストを自動的に拒否するようにし、フロントエンドは最初のタップ直後にボタンを無効化して処理中状態を明確に表示するよう提案する。"),
      P("Ví dụ này cho thấy vì sao kiểm thử chuyển mạng không thể chỉ dừng ở 'có mất mạng hay không', mà phải test đúng thời điểm CHUYỂN ĐỔI giữa hai loại mạng — khoảnh khắc dễ sinh lỗi race condition nhất vì thiết bị đang thay đổi địa chỉ IP, có thể mất kết nối trong vài trăm mili-giây. Với các luồng liên quan tới tiền như đặt hàng, thanh toán, nạp tiền ví, đây phải là nhóm ca kiểm thử ưu tiên cao nhất trong toàn bộ bộ test di động nâng cao.",
        "This example shows why network-switch testing can't stop at just 'connection lost or not' — you must test the exact moment of SWITCHING between two network types, the moment most prone to race conditions because the device is changing IP address and may lose connectivity for a few hundred milliseconds. For money-related flows like ordering, payment, or wallet top-up, this must be the highest-priority test case group in the entire advanced mobile test suite.",
        "この例は、ネットワーク切り替えのテストが『通信が切れたかどうか』だけで終わってはいけない理由を示しています。2種類のネットワーク間の切り替えのまさにその瞬間をテストする必要があります——端末がIPアドレスを変更し、数百ミリ秒間接続を失う可能性があるため、レースコンディションが最も発生しやすい瞬間です。注文、決済、ウォレットチャージなどお金に関わるフローでは、これがモバイル上級テストスイート全体の中で最優先のテストケースグループでなければなりません。"),
    ] },
  { heading: { vi: "10. Theo dõi lỗi theo thiết bị & lỗi hay gặp", en: "10. Tracking bugs by device & common mistakes", ja: "10. 端末別のバグ追跡とよくある失敗" },
    blocks: [
      P("Vì số tổ hợp thiết bị/OS/mạng là rất lớn, đội kiểm thử di động nâng cao cần một bảng theo dõi riêng để nhìn ra pattern: lỗi có tập trung vào một dòng máy RAM thấp cụ thể không, có tập trung vào phiên bản Android/iOS cũ không, hay tập trung vào nhóm yếu tố nào (gián đoạn, mạng, vòng đời app). Nhìn theo pattern giúp ưu tiên sửa lỗi đúng chỗ thay vì dàn trải.",
        "Because the number of device/OS/network combinations is huge, an advanced mobile testing team needs a dedicated tracking board to spot patterns: are bugs concentrated on a specific low-RAM device line, an old Android/iOS version, or a specific factor group (interruption, network, app lifecycle)? Spotting patterns helps prioritize fixes in the right place instead of spreading effort thin.",
        "端末／OS／ネットワークの組み合わせが非常に多いため、モバイル上級テストチームはパターンを見つけるための専用の追跡ボードが必要です：バグは特定の低RAM端末系列に集中しているか、古いAndroid/iOSバージョンに集中しているか、それとも特定の要素グループ（割り込み、ネットワーク、アプリライフサイクル）に集中しているか。パターンを見ることで、労力を分散させるのではなく正しい場所に修正の優先順位を置けます。"),
      IMG(m_kanban, "Bảng theo dõi lỗi mobile theo thiết bị/OS (ShopEasy Mobile · Sprint 22)", "Board tracking mobile bugs by device/OS (ShopEasy Mobile · Sprint 22)", "端末/OS別のモバイルバグ追跡ボード（ShopEasy Mobile・スプリント22）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi mobile của sprint đến từ nhóm gián đoạn/mạng, không phải lỗi giao diện thông thường", "Metrics: most of this sprint's mobile bugs come from the interruption/network group, not ordinary UI bugs", "指標：このスプリントのモバイルバグの大半は通常のUIバグではなく割り込み/ネットワークグループから発生している"),
      PITFALL("Chỉ test trên 1-2 thiết bị flagship đời mới nhất trong tay đội dev, bỏ qua các máy tầm trung/RAM thấp — trong khi đó lại chính là nhóm máy dễ bị hệ điều hành kill app nhất và chiếm tỉ lệ lớn người dùng thật.", "Testing only on 1-2 of the newest flagship devices the dev team happens to have, skipping mid-range/low-RAM phones — even though those are exactly the devices most prone to being killed by the OS and make up a large share of real users.", "開発チームが持っている1〜2台の最新フラッグシップ機だけでテストし、ミッドレンジ／低RAM端末を省略すること——これらはまさにOSにアプリをキルされやすい端末であり、実際のユーザーの大きな割合を占めているにもかかわらず。"),
      PITFALL("Test gián đoạn/chuyển mạng nhưng chỉ chèn TRƯỚC hoặc SAU khi bấm nút, bỏ sót đúng khoảnh khắc request đang bay giữa client và server — nơi phần lớn lỗi thật sự xảy ra.", "Testing interruptions/network switches but only inserting them BEFORE or AFTER tapping a button, missing the exact moment the request is in flight between client and server — where most real bugs actually happen.", "割り込み／ネットワーク切り替えをテストしても、ボタンを押す前後にしか挿入せず、リクエストがクライアントとサーバー間を飛んでいるまさにその瞬間を見逃す——実際のバグの大半がそこで起きる。"),
      P("Ngoài các bẫy trên, câu hỏi thường gặp dưới đây giúp bạn làm rõ thêm phạm vi và cách tiếp cận kiểm thử ứng dụng di động nâng cao trước khi áp dụng vào dự án thật.",
        "Besides the pitfalls above, the FAQs below help clarify the scope and approach of advanced mobile app testing before applying it to a real project.",
        "上記の落とし穴に加え、以下のFAQは実際のプロジェクトに適用する前に、モバイルアプリ上級テストの範囲とアプローチをさらに明確にするのに役立ちます。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test tương thích & responsive cho người mới", "Compatibility & responsive testing for beginners", "test-tuong-thich-responsive-cho-nguoi-moi", "初心者のための互換性・レスポンシブテスト"),
      INTERNAL("Kiểm thử giỏ hàng & thanh toán cho người mới", "Cart & checkout testing for beginners", "kiem-thu-gio-hang-thanh-toan-cho-nguoi-moi", "初心者のためのカート・決済テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者向けネガティブテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua kiểm thử ứng dụng di động nâng cao trên app TMĐT ShopEasy Mobile: gián đoạn hệ thống (cuộc gọi, thông báo), chuyển mạng wifi↔4G↔mất mạng, vòng đời app (chạy nền, bị kill, pin yếu), xoay màn hình, đa kích thước/độ phân giải, cử chỉ, quyền hệ thống và deep link. Hai tình huống thật — crash mất đơn khi nhận cuộc gọi, và gửi đơn 2 lần khi chuyển mạng — cho thấy vì sao những yếu tố tưởng 'phụ' này lại chính là nơi phát sinh lỗi nghiêm trọng nhất trên production.",
        "You just went through advanced mobile app testing on the ShopEasy Mobile e-commerce app: system interruptions (calls, notifications), network switching wifi↔4G↔offline, the app lifecycle (background, killed, low battery), screen rotation, multiple screen sizes/resolutions, gestures, system permissions and deep links. Two real situations — a crash losing an order on an incoming call, and an order sent twice on a network switch — showed why these seemingly 'secondary' factors are exactly where the most serious production bugs come from.",
        "ECアプリShopEasy Mobileにおけるモバイルアプリの上級テストを見てきました：システムの割り込み（着信、通知）、Wi-Fi↔4G↔通信断のネットワーク切り替え、アプリのライフサイクル（バックグラウンド、キル、バッテリー低下）、画面回転、複数の画面サイズ／解像度、ジェスチャー、システム権限、ディープリンク。着信によるクラッシュでの注文喪失、ネットワーク切り替えによる注文の二重送信という2つの実際のシーンは、これら一見『副次的』に見える要素こそが本番環境で最も深刻なバグの発生源であることを示しました。"),
      P("Chặng tiếp theo, bạn nên đào sâu thêm kỹ thuật thiết kế ma trận thiết bị theo dữ liệu người dùng thật, cách viết bug report gắn đúng môi trường thiết bị/OS/mạng để dev tái hiện được, và tự động hoá lại các ca gián đoạn lặp lại bằng công cụ như Appium. Nếu muốn học bài bản từ nền tảng manual tới kiểm thử di động chuyên sâu cùng người hướng dẫn và dự án thật, một khoá học Tester chuyên nghiệp sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí đòi hỏi kinh nghiệm mobile.",
        "Next, you should dig deeper into designing a device matrix based on real user data, writing bug reports that correctly capture the device/OS/network environment so developers can reproduce them, and automating these repeatable interruption cases with a tool like Appium. If you want to learn systematically from manual foundations to advanced mobile testing with a mentor and real projects, a professional Tester course will help you progress fast and confidently apply for roles requiring mobile experience.",
        "次は、実際のユーザーデータに基づいた端末マトリクスの設計、開発者が再現できるよう端末／OS／ネットワーク環境を正しく記録したバグレポートの書き方、そしてAppiumのようなツールでこれらの繰り返し可能な割り込みケースを自動化することを、さらに深く学ぶとよいでしょう。指導者と実際のプロジェクトとともに、手動テストの基礎から上級モバイルテストまで体系的に学びたいなら、プロフェッショナルなテスターコースが、モバイル経験を求められるポジションへ自信を持って応募できるよう速い成長を助けます。"),
      CTA(course),
    ] },
];

const DOC = makeDoc({
  slug: "kiem-thu-ung-dung-di-dong-nang-cao-cho-tester",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử ứng dụng di động",
  keywords: ["kiểm thử ứng dụng di động", "mobile testing nâng cao", "kiểm thử di động", "gián đoạn hệ thống mobile", "chuyển mạng wifi 4G", "vòng đời app bị kill"],
  coverLabel: "NÂNG CAO · MOBILE TESTING · TMĐT",
  crumb: "Kiểm thử ứng dụng di động chuyên sâu (Mobile Testing nâng cao)",
  metaTitle: { vi: "Kiểm thử ứng dụng di động nâng cao cho Tester", en: "Advanced mobile app testing for testers", ja: "テスター向けモバイルアプリ上級テスト" },
  metaDescription: {
    vi: "Kiểm thử ứng dụng di động nâng cao ShopEasy: gián đoạn cuộc gọi, chuyển mạng wifi/4G, pin yếu, kill app, xoay màn hình, quyền hệ thống, kèm trắc nghiệm.",
    en: "Advanced mobile app testing on ShopEasy: call interruptions, wifi/4G network switching, low battery, app kill, screen rotation, system permissions, real bug examples, visuals and a quiz.",
    ja: "ShopEasyでのモバイルアプリ上級テスト：着信割り込み、Wi-Fi/4Gネットワーク切り替え、バッテリー低下、アプリキル、画面回転、システム権限、実例と図、クイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử ứng dụng di động chuyên sâu (Mobile Testing nâng cao) cho Tester — dự án ShopEasy Mobile",
    en: "Deep mobile app testing (advanced mobile testing) for testers — the ShopEasy Mobile project",
    ja: "テスターのための本格的なモバイルアプリテスト（モバイルテスト上級）— ShopEasy Mobileプロジェクト",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử ứng dụng di động chuyên sâu qua app TMĐT ShopEasy Mobile. Gián đoạn hệ thống (cuộc gọi/thông báo), chuyển mạng wifi↔4G↔mất mạng, vòng đời app (nền/kill/pin yếu), xoay màn hình, đa kích thước, cử chỉ, quyền hệ thống, deep link. Hai tình huống lỗi thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: deep mobile app testing through the ShopEasy Mobile e-commerce app. System interruptions (calls/notifications), network switching wifi↔4G↔offline, the app lifecycle (background/kill/low battery), screen rotation, multiple screen sizes, gestures, system permissions, deep links. Two real bug situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級記事：ECアプリShopEasy Mobileを通じた本格的なモバイルアプリテスト。システムの割り込み（着信/通知）、Wi-Fi↔4G↔通信断のネットワーク切り替え、アプリのライフサイクル（バックグラウンド/キル/バッテリー低下）、画面回転、複数画面サイズ、ジェスチャー、システム権限、ディープリンク。2つの実際のバグ事例、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử ứng dụng di động nâng cao", steps: [
    { name: "Dựng ma trận thiết bị/OS theo tỉ lệ người dùng thật", text: "Ưu tiên thiết bị/OS phổ biến nhất, không chỉ máy flagship." },
    { name: "Lập trục gián đoạn cho từng luồng trọng yếu", text: "Cuộc gọi, chuyển mạng, nền/kill, xoay màn hình, quyền hệ thống." },
    { name: "Viết ca theo công thức: thao tác + điểm chèn + kết quả khôi phục", text: "Ưu tiên chạy trên thiết bị thật cho ca cảm biến/mạng/pin." },
  ] },
  pages,
});

export const MA_MOBILE_01 = [DOC];
