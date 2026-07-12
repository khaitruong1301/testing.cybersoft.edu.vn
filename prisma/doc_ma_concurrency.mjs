// doc_ma_concurrency.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử đồng thời & tương tranh (Concurrency & Race Condition Testing) cho VÍ ĐIỆN TỬ FINTECH:
// race condition, double-spend, khoá lạc quan/bi quan, deadlock, lost update, idempotency,
// thứ tự giao dịch, kiểm thử nhiều người thao tác cùng lúc. Dự án: ví điện tử & chuyển tiền tức thời VíNhanh.
// 2 tình huống thật (jira/kanban/dashboard), sơ đồ tranh chấp số dư (moduleFlow).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến fintech.",
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
    tags: tags("congnghe", "fintech", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn ví VíNhanh — 2 thiết bị cùng rút tiền, cả 2 báo THÀNH CÔNG (double-spend) ──
const m_wallet = browser("vinhanh.vn/vi/vi-dien-tu/rut-tien", [
  panel("VíNhanh · Rút tiền — 2 thiết bị cùng thao tác trên 1 ví", [
    field(24, 20, 330, "Thiết bị A · Số dư trước lệnh", "6.000.000đ", "normal"),
    field(372, 20, 330, "Thiết bị B · Số dư trước lệnh", "6.000.000đ", "normal"),
    field(24, 92, 330, "Thiết bị A · Số tiền rút", "5.000.000đ", "normal"),
    field(372, 92, 330, "Thiết bị B · Số tiền rút", "5.000.000đ", "normal"),
    field(24, 164, 330, "Thiết bị A · Kết quả", "THÀNH CÔNG lúc 10:22:01.120", "normal"),
    field(372, 164, 330, "Thiết bị B · Kết quả", "THÀNH CÔNG lúc 10:22:01.180", "error"),
    field(24, 236, 330, "Số dư cuối (kỳ vọng)", "1.000.000đ hoặc 1 lệnh bị từ chối", "normal"),
    field(372, 236, 330, "Số dư cuối (thực tế)", "-4.000.000đ", "error"),
    annotate(368, 154, 330, 44, "BUG: cả 2 lệnh đều báo thành công"),
    annotate(368, 226, 330, 44, "DOUBLE-SPEND: số dư âm thật"),
  ].join(""), { h: 300, accent: "#0f766e" }),
].join(""), { h: 356, title: "VíNhanh · Ví điện tử", accent: "#0f766e" });

// ── Mockup 2: sơ đồ 2 giao dịch RÚT TIỀN đồng thời tranh chấp cùng 1 số dư (race condition) ──
const m_flow = moduleFlow("2 giao dịch RÚT TIỀN đồng thời tranh chấp cùng 1 số dư (race condition)", [
  { id: "a", label: "Thiết bị A", sub: "Rút 5.000.000đ", x: 100, y: 60 },
  { id: "b", label: "Thiết bị B", sub: "Rút 5.000.000đ", x: 660, y: 60 },
  { id: "bal", label: "Bản ghi Số dư", sub: "balance = 6.000.000đ", x: 380, y: 150 },
  { id: "res", label: "Số dư sau 2 lệnh", sub: "Kỳ vọng 0đ · Thực tế -4.000.000đ", x: 380, y: 260 },
], [
  { from: "a", to: "bal", label: "Đọc số dư (T1)" },
  { from: "b", to: "bal", label: "Đọc số dư (T2)" },
  { from: "a", to: "res", label: "Ghi: -5.000.000đ" },
  { from: "b", to: "res", label: "Ghi đè: -5.000.000đ", bad: true },
], { accent: "#0f766e", h: 320 });

// ── Mockup 3: so sánh khoá lạc quan (Optimistic) vs khoá bi quan (Pessimistic) ──
const m_locks = grid("So sánh khoá lạc quan (Optimistic) vs khoá bi quan (Pessimistic) trong kiểm thử đồng thời", ["Tiêu chí", "Optimistic Locking", "Pessimistic Locking"], [
  ["Cách hoạt động", "Đọc kèm số hiệu version; khi ghi so sánh version, lệch thì từ chối & yêu cầu thử lại", "Khoá bản ghi ngay khi bắt đầu giao dịch (SELECT ... FOR UPDATE), giao dịch khác phải chờ"],
  ["Hiệu năng khi ít tranh chấp", "Cao, hầu như không tốn chi phí khoá", "Thấp hơn vì luôn giữ khoá dù ít khi đụng độ"],
  ["Hiệu năng khi tranh chấp cao", "Nhiều giao dịch bị từ chối, phải retry liên tục", "Ổn định hơn nhưng dễ gây nghẽn hàng đợi"],
  ["Rủi ro tester cần kiểm chứng", "Ca kiểm thử phải xác nhận có RETRY đúng cách, không lặp vô hạn", "Ca kiểm thử phải xác nhận KHÔNG xảy ra DEADLOCK giữa 2 khoá chéo nhau"],
  ["Phù hợp với", "Giao dịch đọc nhiều, ghi ít xung đột (vd xem số dư, lịch sử)", "Giao dịch tài chính có xác suất tranh chấp cao (rút/chuyển cùng 1 ví)"],
], { accent: "#0f766e", note: "Nhiều hệ thống ví điện tử dùng pessimistic locking cho bước GHI số dư, optimistic cho các bước ĐỌC còn lại." });

// ── Mockup 4: các kỹ thuật nghĩ ca kiểm thử đồng thời ──
const m_technique = grid("Kỹ thuật nghĩ ca kiểm thử đồng thời (concurrency test design techniques)", ["Kỹ thuật", "Mô tả", "Ví dụ trên VíNhanh"], [
  ["Song song 2 request GIỐNG HỆT nhau", "Gửi đồng thời 2 request cùng nội dung để lộ race condition/double-spend", "2 lệnh rút 5.000.000đ cùng lúc trên ví 6.000.000đ"],
  ["Song song 2 request ĐỐI LẬP nhau", "Gửi đồng thời 1 lệnh cộng và 1 lệnh trừ trên cùng tài nguyên để kiểm tra lost update", "Nạp 2.000.000đ đồng thời rút 3.000.000đ trên cùng ví"],
  ["Trễ thứ tự đến (out-of-order)", "Mô phỏng request gửi sau lại TỚI SERVER trước do độ trễ mạng khác nhau", "Giao dịch B tới trước giao dịch A dù người dùng bấm A trước"],
  ["Retry sau timeout/mất kết nối", "Client không nhận được response nên tự động gửi lại đúng request cũ", "Mất mạng ngay sau khi bấm Chuyển tiền, app tự retry sau 3 giây"],
  ["Double-tap/double-click trên UI", "Người dùng bấm 2 lần liên tiếp do UI phản hồi chậm, chưa khoá nút kịp", "Bấm nút Chuyển tiền 2 lần trong dưới 1 giây"],
], { accent: "#0f766e", note: "Cần công cụ bắn request song song ĐÚNG thời điểm (k6, JMeter, script gọi API bằng Promise.all) — click tay không đủ nhanh để tái hiện race thật." });

// ── Mockup 5: ca kiểm thử đồng thời — tranh chấp SỐ DƯ & DOUBLE-SPEND ──
const m_case_balance = grid("Ca kiểm thử đồng thời — tranh chấp SỐ DƯ & DOUBLE-SPEND", ["Ca kiểm thử đồng thời", "Cách mô phỏng", "Kết quả mong đợi"], [
  ["2 lệnh RÚT TIỀN cùng lúc trên cùng 1 ví (số dư chỉ đủ cho 1 lệnh)", "Gửi đồng thời 2 request rút 5.000.000đ trên ví 6.000.000đ bằng script gọi song song (k6/JMeter)", "Chỉ 1 lệnh thành công, lệnh còn lại bị từ chối do không đủ số dư — số dư cuối không âm"],
  ["2 lệnh CHUYỂN TIỀN cùng lúc từ cùng 1 nguồn tới 2 đích khác nhau", "Gửi đồng thời 2 request chuyển từ cùng ví nguồn, tổng 2 lệnh vượt số dư hiện có", "Hệ thống khoá đúng bản ghi nguồn; chỉ giao dịch khoá trước được xử lý trọn vẹn"],
  ["Đọc số dư ngay giữa lúc một giao dịch khác đang ghi (dirty read)", "1 thiết bị xem số dư trong khi thiết bị khác đang xử lý lệnh rút chưa commit", "Số dư hiển thị phải là giá trị đã COMMIT, không hiển thị giá trị tạm/chưa chốt"],
  ["Nạp tiền & rút tiền cùng lúc trên cùng ví (2 giao dịch không đối lập)", "Gửi đồng thời 1 lệnh nạp 2.000.000đ và 1 lệnh rút 3.000.000đ trên ví 6.000.000đ", "Số dư cuối chính xác = 6tr + 2tr - 3tr = 5.000.000đ, không giao dịch nào bị mất (lost update)"],
], { accent: "#0f766e" });

// ── Mockup 6: ca kiểm thử đồng thời — IDEMPOTENCY & THỨ TỰ GIAO DỊCH ──
const m_case_idem = grid("Ca kiểm thử đồng thời — IDEMPOTENCY & THỨ TỰ GIAO DỊCH", ["Ca kiểm thử đồng thời", "Cách mô phỏng", "Kết quả mong đợi"], [
  ["Nhấn nút 'Chuyển tiền' 2 lần liên tiếp trong dưới 1 giây", "Giả lập double-tap: gửi 2 request giống hệt nhau (cùng idempotency key) cách nhau < 300ms", "Chỉ 1 giao dịch được ghi nhận; request thứ 2 trả về đúng kết quả của request đầu, KHÔNG trừ tiền lần 2"],
  ["Client mất phản hồi (timeout) và tự động retry request chuyển tiền", "Cắt kết nối ngay sau khi server nhận request nhưng trước khi trả response, sau đó client tự retry", "Server nhận diện request trùng qua idempotency key, không tạo giao dịch thứ 2"],
  ["2 giao dịch tới hệ thống theo thứ tự khác thứ tự người dùng thao tác", "Gửi giao dịch A rồi B, nhưng mô phỏng B tới server trước A (độ trễ mạng khác nhau)", "Hệ thống xử lý & ghi log đúng theo timestamp nghiệp vụ, không đảo thứ tự lịch sử hiển thị cho khách"],
  ["2 microservice (Ví & Sổ giao dịch) ghi nhận KHÔNG đồng thời cho cùng 1 giao dịch", "Làm chậm một trong hai service để 2 bản ghi (số dư & lịch sử) không cập nhật cùng lúc", "Có cơ chế đối soát phát hiện & đồng bộ lệch pha, không để 2 nguồn dữ liệu mâu thuẫn kéo dài"],
], { accent: "#7c3aed" });

// ── Mockup 7: ticket Jira lost update / double-spend do thiếu khoá đúng khi ghi ──
const m_jira = jira({
  key: "VN-72310", title: "Rút tiền đồng thời 2 thiết bị: số dư ví bị ÂM -4.000.000đ do lost update / thiếu khoá đúng khi ghi",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "Production · VíNhanh Wallet Service v3.4 · 2 thiết bị cùng tài khoản"],
    ["Các bước", "1) Đăng nhập cùng 1 ví trên 2 thiết bị 2) Cả 2 cùng bấm Rút 5.000.000đ trong vòng 60ms 3) Cả 2 đều nhận thông báo thành công 4) Kiểm tra số dư cuối"],
    ["Kết quả mong đợi", "Chỉ 1 lệnh rút thành công; lệnh còn lại bị từ chối do không đủ số dư"],
    ["Kết quả thực tế", "Cả 2 lệnh đều trừ tiền, số dư cuối = -4.000.000đ"],
    ["Bằng chứng", "log-race-102201.csv, video-2-thietbi.mp4"],
  ],
});

// ── Mockup 8: kanban theo dõi lỗi tương tranh tìm qua Concurrency Testing ──
const m_kanban = kanban("Bảng theo dõi lỗi tương tranh tìm qua Concurrency Testing (VíNhanh · Sprint Race)", [
  { name: "New", cards: [
    { key: "VN-72310", title: "Rút đồng thời 2 thiết bị: số dư âm -4tr", sev: "Critical" },
    { key: "VN-72299", title: "Double-tap nút Chuyển tiền tạo 2 GD", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "VN-72180", title: "Deadlock khi 2 GD khoá chéo 2 ví", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "VN-72055", title: "Thiếu idempotency key khi client retry", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "VN-71920", title: "Lost update khi nạp + rút cùng lúc", sev: "Medium" },
  ] },
]);

// ── Mockup 9: dashboard số liệu kiểm thử đồng thời ──
const m_dash = dashboard("Số liệu kiểm thử đồng thời — Concurrency Testing (VíNhanh · Sprint Race)", [
  { label: "Ca kiểm thử đồng thời", value: "24", sub: "thiết kế cho ví & chuyển tiền", color: "#0f766e" },
  { label: "Lỗi tương tranh tìm được", value: "9", sub: "race condition/lost update/deadlock", color: "#e11d48" },
  { label: "Double-spend nghiêm trọng", value: "3", sub: "Critical — ảnh hưởng số dư thật", color: "#b91c1c" },
  { label: "Thiếu idempotency key", value: "4", sub: "trên các API ghi tiền", color: "#b45309" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Race condition (điều kiện đua) trong kiểm thử đồng thời là gì?",
  "What is a race condition in concurrency testing?",
  "Race condition là hiện tượng kết quả cuối cùng của hệ thống phụ thuộc vào THỨ TỰ hoặc THỜI ĐIỂM chính xác mà các luồng/giao dịch chạy song song thực thi, thay vì luôn cho ra kết quả nhất quán như khi chạy tuần tự. Với ví điện tử, ví dụ kinh điển là 2 thiết bị cùng đọc số dư 6.000.000đ gần như cùng lúc, cả hai đều thấy đủ tiền để rút 5.000.000đ, và nếu hệ thống không khoá đúng bản ghi khi ghi, cả hai lệnh đều được xác nhận thành công — số dư cuối trở nên âm dù về logic mỗi giao dịch riêng lẻ đều 'đúng'.",
  "A race condition is when a system's final result depends on the exact ORDER or TIMING at which parallel threads/transactions execute, instead of always producing a consistent result as when run sequentially. In an e-wallet, the classic example is two devices reading a balance of 6,000,000đ at nearly the same moment, both seeing enough funds to withdraw 5,000,000đ, and if the system doesn't lock the record correctly on write, both requests get confirmed successful — the final balance goes negative even though each transaction looks 'correct' in isolation.",
  "並行テストにおける『レースコンディション（競合状態）』とは？",
  "レースコンディションとは、システムの最終結果が、並行して実行されるスレッド/取引の正確な『順序』や『タイミング』に依存してしまい、逐次実行した場合のように常に一貫した結果を出さない現象です。電子ウォレットの典型例は、2台の端末がほぼ同時に残高600万ドンを読み取り、どちらも500万ドンの引き出しに十分な残高があると判断してしまい、書き込み時にレコードが正しくロックされていなければ両方のリクエストが成功として確定されてしまうことです——単独で見れば各取引は『正しい』のに、最終残高がマイナスになってしまいます。");
const faq2 = FAQ(
  "Khoá lạc quan (optimistic) và khoá bi quan (pessimistic) khác nhau thế nào, tester nên kiểm chứng gì cho mỗi loại?",
  "How do optimistic and pessimistic locking differ, and what should a tester verify for each?",
  "Optimistic locking không khoá trước: hệ thống đọc kèm một số hiệu version, khi ghi mới so sánh version hiện tại với version lúc đọc — nếu lệch (đã có giao dịch khác ghi trước) thì từ chối và yêu cầu thử lại. Pessimistic locking khoá hẳn bản ghi ngay khi giao dịch bắt đầu, buộc mọi giao dịch khác phải chờ tới khi khoá được giải phóng. Với optimistic, tester cần xác nhận cơ chế RETRY hoạt động đúng và không lặp vô hạn; với pessimistic, tester cần xác nhận KHÔNG xảy ra deadlock khi nhiều giao dịch khoá chéo nhiều tài nguyên theo thứ tự khác nhau.",
  "Optimistic locking doesn't lock upfront: the system reads a version number, and on write compares the current version with the one read earlier — if they differ (another transaction already wrote first), it rejects and asks for a retry. Pessimistic locking locks the record outright as soon as a transaction starts, forcing every other transaction to wait until the lock is released. With optimistic locking, testers must verify the RETRY mechanism works correctly and doesn't loop forever; with pessimistic locking, testers must verify NO deadlock occurs when multiple transactions lock multiple resources in different orders.",
  "楽観的ロック（optimistic）と悲観的ロック（pessimistic）の違いは？テスターはそれぞれ何を検証すべき？",
  "楽観的ロックは事前にロックしません：システムはバージョン番号を添えて読み取り、書き込み時に読み取り時点のバージョンと現在のバージョンを比較します——ズレていれば（他の取引が先に書き込んだ場合）拒否してリトライを要求します。悲観的ロックは取引開始時点でレコードを完全にロックし、他のすべての取引はロックが解放されるまで待たされます。楽観的ロックではテスターはリトライ機構が正しく動作し無限ループしないことを検証する必要があり、悲観的ロックでは複数の取引が複数のリソースを異なる順序でロックしたときにデッドロックが発生『しない』ことを検証する必要があります。");
const faq3 = FAQ(
  "Idempotency key giải quyết vấn đề gì, và vì sao nó quan trọng khi kiểm thử chuyển tiền đồng thời?",
  "What problem does an idempotency key solve, and why does it matter when testing concurrent money transfers?",
  "Idempotency key là một mã định danh duy nhất gắn với mỗi yêu cầu ghi tiền (thường do client sinh ra), giúp server nhận diện một request có phải là BẢN SAO của request trước đó hay không. Nó giải quyết đúng vấn đề double-tap (người dùng bấm 2 lần) và retry sau timeout (client tự gửi lại khi mất phản hồi) — hai tình huống cực kỳ phổ biến trên di động nhưng lại dễ bị bỏ sót trong kiểm thử chức năng thông thường. Nếu thiếu idempotency key, mỗi lần bấm/retry có thể tạo một giao dịch mới, dẫn tới trừ tiền nhiều lần cho cùng một ý định thao tác của khách hàng — lỗi cực kỳ nhạy cảm vì liên quan trực tiếp tới tiền thật.",
  "An idempotency key is a unique identifier attached to each money-writing request (usually generated by the client), letting the server tell whether a request is a DUPLICATE of a previous one. It solves exactly the double-tap problem (user taps twice) and the retry-after-timeout problem (client resends when it loses a response) — two extremely common situations on mobile, yet easy to miss in ordinary functional testing. Without an idempotency key, every tap/retry can create a new transaction, leading to multiple debits for the same customer intent — an especially sensitive bug because it touches real money directly.",
  "冪等性キー（idempotency key）は何を解決し、送金の並行テストでなぜ重要なのか？",
  "冪等性キーは、各送金リクエスト（通常はクライアントが生成）に付与される一意の識別子で、サーバーがそのリクエストが以前のリクエストの『複製』かどうかを判別できるようにします。これはまさにダブルタップ問題（ユーザーが2回タップする）とタイムアウト後のリトライ問題（クライアントが応答を失って再送する）を解決します——どちらもモバイルで極めて一般的ですが、通常の機能テストでは見落とされがちです。冪等性キーがなければ、タップ/リトライのたびに新しい取引が作られ、顧客の一つの意図に対して複数回引き落としが発生し得ます——実際のお金に直結する特に注意すべきバグです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Race condition (điều kiện đua) trong kiểm thử đồng thời là gì?", en: "What is a race condition in concurrency testing?", ja: "並行テストにおけるレースコンディション（競合状態）とは？" },
    options: [
      { vi: "Hiện tượng kết quả hệ thống phụ thuộc vào thứ tự/thời điểm thực thi của các luồng/giao dịch chạy song song, thay vì luôn nhất quán", en: "A phenomenon where the system's result depends on the order/timing of parallel threads/transactions, instead of always being consistent", ja: "システムの結果が常に一貫しているのではなく、並行するスレッド/取引の実行順序やタイミングに依存してしまう現象" },
      { vi: "Lỗi giao diện hiển thị sai màu sắc trên các trình duyệt khác nhau", en: "A UI bug displaying wrong colors on different browsers", ja: "異なるブラウザで色が誤って表示されるUIバグ" },
      { vi: "Tình trạng server phản hồi chậm khi có nhiều người dùng truy cập", en: "The server responding slowly when many users access it", ja: "多くのユーザーがアクセスした際にサーバーの応答が遅くなる状態" },
      { vi: "Việc hai tester cùng kiểm thử một tính năng trong cùng một ngày", en: "Two testers testing the same feature on the same day", ja: "2人のテスターが同じ日に同じ機能をテストすること" },
    ], correct: 0,
    explain: { vi: "Race condition xảy ra khi kết quả đúng/sai phụ thuộc vào việc luồng nào 'thắng' về thời gian, không phải lỗi hiển thị hay tốc độ phản hồi.", en: "A race condition happens when correctness depends on which thread 'wins' on timing — not a display bug or response speed.", ja: "レースコンディションは、正しさがどのスレッドがタイミング的に『勝つ』かに依存する場合に起こる——表示バグや応答速度の問題ではない。" },
  }),
  mcq({
    q: { vi: "Double-spend trong ví điện tử là gì?", en: "What is double-spend in an e-wallet?", ja: "電子ウォレットにおけるダブルスペンド（二重使用）とは？" },
    options: [
      { vi: "Cùng một khoản tiền được rút/sử dụng thành công NHIỀU HƠN MỘT LẦN do lỗi xử lý đồng thời", en: "The same amount of money being successfully withdrawn/used MORE THAN ONCE due to a concurrency-handling bug", ja: "並行処理の不具合により、同じ金額が複数回にわたって成功裏に引き出し/使用されること" },
      { vi: "Khách hàng cố ý gian lận bằng thẻ ngân hàng giả", en: "A customer intentionally committing fraud with a fake bank card", ja: "顧客が偽の銀行カードで意図的に不正を働くこと" },
      { vi: "Hệ thống tính phí giao dịch 2 lần cho 1 lệnh chuyển hợp lệ", en: "The system charging a fee twice for one valid transfer", ja: "システムが1件の正当な送金に対し手数料を2回課金すること" },
      { vi: "Ứng dụng hiển thị số dư bằng 2 loại tiền tệ khác nhau cùng lúc", en: "The app displaying the balance in two different currencies at once", ja: "アプリが残高を2つの異なる通貨で同時に表示すること" },
    ], correct: 0,
    explain: { vi: "Double-spend là hậu quả trực tiếp của race condition: cùng một nguồn tiền bị 'chi' quá một lần vì hệ thống không khoá đúng khi ghi.", en: "Double-spend is a direct consequence of a race condition: the same funds get 'spent' more than once because the system fails to lock correctly on write.", ja: "ダブルスペンドはレースコンディションの直接的な結果です：システムが書き込み時に正しくロックしないため、同じ資金が複数回『使われて』しまう。" },
  }),
  mcq({
    q: { vi: "Khác biệt chính giữa khoá lạc quan (optimistic) và khoá bi quan (pessimistic) là gì?", en: "What is the main difference between optimistic and pessimistic locking?", ja: "楽観的ロックと悲観的ロックの主な違いは？" },
    options: [
      { vi: "Optimistic không khoá trước, chỉ so sánh version khi ghi rồi từ chối nếu xung đột; pessimistic khoá bản ghi ngay từ đầu khiến giao dịch khác phải chờ", en: "Optimistic doesn't lock upfront, it only compares versions on write and rejects on conflict; pessimistic locks the record from the start, forcing other transactions to wait", ja: "楽観的ロックは事前にロックせず書き込み時にバージョンを比較して競合時に拒否するが、悲観的ロックは最初からレコードをロックし他の取引を待たせる" },
      { vi: "Optimistic luôn nhanh hơn pessimistic trong mọi trường hợp, không có ngoại lệ", en: "Optimistic is always faster than pessimistic in every case, no exceptions", ja: "楽観的ロックはあらゆる場合において必ず悲観的ロックより速い" },
      { vi: "Pessimistic locking không bao giờ có thể gây deadlock", en: "Pessimistic locking can never cause a deadlock", ja: "悲観的ロックは決してデッドロックを起こさない" },
      { vi: "Optimistic locking chỉ áp dụng được cho ứng dụng di động", en: "Optimistic locking only applies to mobile applications", ja: "楽観的ロックはモバイルアプリケーションにしか適用できない" },
    ], correct: 0,
    explain: { vi: "Optimistic locking dựa vào so sánh version khi ghi; pessimistic locking giữ khoá suốt giao dịch. Mỗi loại có rủi ro riêng cần kiểm thử (retry vô hạn vs deadlock).", en: "Optimistic locking relies on comparing versions on write; pessimistic locking holds the lock for the whole transaction. Each has its own risk to test (infinite retry vs deadlock).", ja: "楽観的ロックは書き込み時のバージョン比較に依存し、悲観的ロックは取引全体でロックを保持する。それぞれ検証すべき固有のリスク（無限リトライ vs デッドロック）がある。" },
  }),
  mcq({
    q: { vi: "Deadlock (khoá chết) xảy ra khi nào?", en: "When does a deadlock occur?", ja: "デッドロックはいつ発生する？" },
    options: [
      { vi: "Khi hai (hoặc nhiều) giao dịch cùng giữ một phần khoá và chờ khoá còn lại mà bên kia đang giữ, khiến cả hai kẹt vĩnh viễn", en: "When two (or more) transactions each hold part of a lock and wait for the remaining lock held by the other, leaving both stuck forever", ja: "2つ（またはそれ以上）の取引がそれぞれロックの一部を保持し、互いが保持している残りのロックを待ち合い、両方が永久に停止してしまうとき" },
      { vi: "Khi hệ thống hết dung lượng ổ đĩa lưu trữ", en: "When the system runs out of storage disk space", ja: "システムのストレージ容量が不足したとき" },
      { vi: "Khi người dùng nhập sai mật khẩu quá 5 lần liên tiếp", en: "When a user enters the wrong password more than 5 times in a row", ja: "ユーザーが5回以上連続してパスワードを間違えたとき" },
      { vi: "Khi một giao dịch chạy quá 24 giờ mà không ai để ý", en: "When a transaction runs for over 24 hours unnoticed", ja: "ある取引が誰にも気づかれず24時間以上実行され続けたとき" },
    ], correct: 0,
    explain: { vi: "Deadlock là lỗi kinh điển của pessimistic locking: 2 giao dịch khoá tài nguyên theo thứ tự chéo nhau và chờ nhau vô thời hạn.", en: "A deadlock is the classic pessimistic-locking failure: two transactions lock resources in a crossing order and wait for each other indefinitely.", ja: "デッドロックは悲観的ロックの典型的な障害です：2つの取引が交差する順序でリソースをロックし、互いを無期限に待ち合う。" },
  }),
  mcq({
    q: { vi: "Idempotency key giúp giải quyết vấn đề gì khi kiểm thử chuyển tiền đồng thời?", en: "What problem does an idempotency key help solve when testing concurrent money transfers?", ja: "並行送金テストにおいて冪等性キーは何を解決するのに役立つ？" },
    options: [
      { vi: "Ngăn cùng một request (do double-tap hoặc client retry) bị xử lý và trừ tiền nhiều lần", en: "Prevent the same request (from a double-tap or client retry) from being processed and debited multiple times", ja: "同じリクエスト（ダブルタップやクライアントのリトライによる）が複数回処理され引き落とされるのを防ぐ" },
      { vi: "Tăng tốc độ mã hoá dữ liệu giao dịch trên đường truyền", en: "Speed up the encryption of transaction data in transit", ja: "通信中の取引データの暗号化を高速化する" },
      { vi: "Tự động chuyển đổi tỉ giá ngoại tệ theo thời gian thực", en: "Automatically convert currency exchange rates in real time", ja: "リアルタイムで外貨換算レートを自動変換する" },
      { vi: "Giảm số lượng trường bắt buộc trên form chuyển tiền", en: "Reduce the number of required fields on the transfer form", ja: "送金フォームの必須項目数を減らす" },
      { vi: "Tự động nén dữ liệu log giao dịch để tiết kiệm dung lượng", en: "Automatically compress transaction logs to save storage space", ja: "取引ログを自動的に圧縮してストレージ容量を節約する" },
    ], correct: 0,
    explain: { vi: "Idempotency key nhận diện request trùng lặp (double-tap/retry) để trả về đúng kết quả đã xử lý trước đó, tránh trừ tiền lần 2.", en: "The idempotency key identifies duplicate requests (double-tap/retry) so the system returns the previously processed result, avoiding a second debit.", ja: "冪等性キーは重複リクエスト（ダブルタップ/リトライ）を識別し、以前処理済みの結果を返すことで2回目の引き落としを防ぐ。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử đồng thời (concurrency testing) kiểm tra hệ thống hoạt động đúng khi NHIỀU thao tác/giao dịch chạy song song thay vì tuần tự — trọng tâm bài này là race condition, double-spend, khoá lạc quan/bi quan, deadlock, lost update, idempotency và thứ tự giao dịch trên ví điện tử VíNhanh (rút tiền, chuyển tiền tức thời). Bạn sẽ học cách thiết kế ca kiểm thử mô phỏng nhiều người/thiết bị thao tác cùng lúc, đọc hiểu sơ đồ tranh chấp số dư, và tránh những lỗi âm thầm nhưng cực kỳ nghiêm trọng vì liên quan trực tiếp tới tiền thật. Nhiều mockup và trắc nghiệm cuối bài.",
        "Concurrency testing checks that a system behaves correctly when MULTIPLE operations/transactions run in parallel instead of sequentially — this article focuses on race conditions, double-spend, optimistic/pessimistic locking, deadlock, lost update, idempotency, and transaction ordering on the VíNhanh e-wallet (withdrawals, instant transfers). You'll learn to design test cases that simulate multiple people/devices acting at the same time, read a balance-contention diagram, and avoid bugs that are silent yet extremely serious because they touch real money. Lots of visuals and a quiz at the end.",
        "並行テスト（concurrency testing）は、複数の操作/取引が逐次ではなく『並行して』実行されたときにシステムが正しく動作するかを確認します——本記事では電子ウォレットVíNhanh（引き出し、即時送金）を題材に、レースコンディション、ダブルスペンド、楽観的/悲観的ロック、デッドロック、ロストアップデート、冪等性、取引順序を扱います。複数の人/端末が同時に操作する状況を模したテストケースの設計方法、残高の争奪を示す図の読み方、そして実際のお金に直結するため静かでも極めて深刻なバグを避ける方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Nếu bạn đã quen kiểm thử một người dùng thao tác một lúc, bài này đưa bạn sang một lớp rủi ro hoàn toàn khác: điều gì xảy ra khi HAI HAY NHIỀU thao tác cùng chạm vào cùng một dữ liệu gần như CÙNG LÚC. Với hầu hết ứng dụng, lỗi kiểu này chỉ gây khó chịu nhẹ; nhưng với ví điện tử — nơi mỗi con số là tiền thật — một lỗi tương tranh có thể khiến số dư âm, tiền 'nhân bản' từ hư không, hoặc một giao dịch bị trừ tiền hai lần. Đây cũng là dạng lỗi khó tìm nhất: chạy tuần tự thì luôn PASS, chỉ lộ ra khi đúng hai request va vào nhau trong một cửa sổ vài chục mili-giây. Chúng ta sẽ học qua ví điện tử VíNhanh: rút tiền, chuyển tiền tức thời, và cách hai thiết bị/hai người dùng có thể 'đua' nhau trên cùng một số dư.",
        "If you're used to testing one user acting at a time, this article moves you to a completely different risk layer: what happens when TWO OR MORE operations touch the same data at nearly the SAME MOMENT. For most apps, this kind of bug is only a minor annoyance; but for an e-wallet — where every number is real money — a concurrency bug can push a balance negative, 'duplicate' money out of nowhere, or debit one transaction twice. It's also the hardest bug class to find: it always PASSES when run sequentially, only surfacing when two requests happen to collide within a window of a few dozen milliseconds. We'll learn through the VíNhanh e-wallet: withdrawals, instant transfers, and how two devices/users can 'race' each other over the same balance.",
        "一度に1人のユーザーが操作する状況のテストに慣れているなら、この記事では全く別のリスク層に踏み込みます：2つ以上の操作がほぼ『同じ瞬間』に同じデータに触れるとどうなるか、という問題です。ほとんどのアプリではこの種のバグは軽い不快感で済みますが、すべての数字が実際のお金である電子ウォレットでは、並行処理のバグが残高をマイナスにしたり、お金を『複製』したり、1つの取引を2回引き落としたりし得ます。これは見つけるのが最も難しいバグの種類でもあります：逐次実行では常に『合格』し、2つのリクエストが数十ミリ秒の窓の中でたまたま衝突したときにしか現れません。電子ウォレットVíNhanhを通じて、引き出し、即時送金、そして2台の端末/2人のユーザーが同じ残高をめぐって『競走』し得る様子を学びます。"),
      IMG(m_wallet, "Màn hình VíNhanh: 2 thiết bị cùng rút tiền, cả 2 báo THÀNH CÔNG khiến số dư âm (double-spend)", "VíNhanh screen: two devices withdrawing at once, both report SUCCESS, leaving the balance negative (double-spend)", "VíNhanh画面：2台の端末が同時に引き出し、両方とも『成功』と表示され残高がマイナスになる（ダブルスペンド）"),
      DEF("Concurrency Testing", "kiểm thử hệ thống khi nhiều thao tác/giao dịch chạy song song thay vì tuần tự, nhằm phát hiện các lỗi chỉ xuất hiện do tương tranh dữ liệu.",
        "testing a system when multiple operations/transactions run in parallel instead of sequentially, to catch bugs that only appear due to data contention.",
        "複数の操作/取引が逐次ではなく並行して実行されたときにシステムをテストし、データの競合によってのみ現れるバグを見つける手法。"),
    ] },
  { heading: { vi: "2. Race condition, double-spend & vì sao ví điện tử đặc biệt rủi ro", en: "2. Race conditions, double-spend & why e-wallets are especially risky", ja: "2. レースコンディション、ダブルスペンドと電子ウォレットが特にリスクの高い理由" },
    blocks: [
      P("Cơ chế gây ra race condition thường theo một khuôn mẫu quen thuộc gọi là 'đọc-sửa-ghi' (read-modify-write): hệ thống ĐỌC số dư hiện tại, TÍNH số dư mới sau giao dịch, rồi GHI lại số dư đó. Nếu hai giao dịch cùng đọc số dư ở gần như cùng một thời điểm — trước khi giao dịch kia kịp ghi — cả hai sẽ tính toán dựa trên CÙNG một số dư ban đầu, và giao dịch ghi sau sẽ VÔ TÌNH GHI ĐÈ lên kết quả của giao dịch ghi trước, khiến một trong hai giao dịch 'biến mất' khỏi số dư cuối cùng dù cả hai đều đã báo thành công với người dùng.",
        "The mechanism behind a race condition usually follows a familiar pattern called 'read-modify-write': the system READS the current balance, COMPUTES the new balance after the transaction, then WRITES that balance back. If two transactions both read the balance at nearly the same moment — before the other has a chance to write — both will compute based on the SAME initial balance, and whichever writes second will UNINTENTIONALLY OVERWRITE the result of the one that wrote first, causing one of the two transactions to 'vanish' from the final balance even though both reported success to the user.",
        "レースコンディションを引き起こす仕組みは、通常『読み取り・変更・書き込み（read-modify-write）』と呼ばれるおなじみのパターンに従います：システムは現在の残高を『読み取り』、取引後の新しい残高を『計算』し、その残高を『書き込み』ます。2つの取引がほぼ同じ瞬間に残高を読み取ると——もう一方が書き込む前に——両方とも『同じ』初期残高に基づいて計算してしまい、後に書き込んだ方が先に書き込んだ方の結果を意図せず『上書き』してしまいます。結果として、両方がユーザーに成功と報告したにもかかわらず、片方の取引が最終残高から『消えて』しまいます。"),
      IMG(m_flow, "Sơ đồ 2 giao dịch rút tiền đồng thời cùng đọc 1 số dư, giao dịch ghi sau ghi đè lên giao dịch ghi trước (lost update)", "Diagram of two concurrent withdrawals reading the same balance, with the later write overwriting the earlier one (lost update)", "2つの同時引き出し取引が同じ残高を読み取り、後の書き込みが先の書き込みを上書きする図（ロストアップデート）"),
      P("Double-spend — thuật ngữ vốn quen thuộc trong tiền mã hoá nhưng áp dụng y hệt cho ví điện tử truyền thống — là hậu quả trực tiếp có thể quan sát được của race condition: CÙNG một khoản tiền được 'chi' thành công NHIỀU HƠN MỘT LẦN. Với một sàn thương mại điện tử, một lỗi tương tranh hiếm gặp có thể chỉ gây một đơn hàng bị trùng, xử lý thủ công là xong; nhưng với ví điện tử, mỗi lần double-spend là tiền thật rời khỏi hệ thống mà không có gì đối ứng — công ty phải bù lỗ, hoặc tệ hơn, hệ thống đối soát không phát hiện ra và lỗ hổng bị lợi dụng lặp lại có chủ đích.",
        "Double-spend — a term familiar from cryptocurrency but applying identically to a traditional e-wallet — is the direct, observable consequence of a race condition: the SAME amount of money gets successfully 'spent' MORE THAN ONCE. On an e-commerce site, a rare concurrency bug might just cause a duplicated order, fixed with a manual patch; but in an e-wallet, every double-spend is real money leaving the system with nothing offsetting it — the company has to cover the loss, or worse, the reconciliation system fails to catch it and the hole gets exploited deliberately, repeatedly.",
        "ダブルスペンド（二重使用）——暗号資産でおなじみの用語ですが、従来の電子ウォレットにも全く同様に当てはまります——はレースコンディションの直接的で観測可能な結果です：『同じ』金額が複数回にわたって成功裏に『使用』されてしまいます。ECサイトでは、まれな並行処理バグが注文の重複を引き起こす程度で手動対応で済むかもしれませんが、電子ウォレットでは、ダブルスペンドのたびに何の見返りもなく実際のお金がシステムから流出します——会社が損失を補填するか、さらに悪いことに対帳システムがそれを検知できず、その穴が意図的に繰り返し悪用されてしまいます。"),
      DEF("Double-Spend", "hiện tượng cùng một khoản tiền được rút/chi/sử dụng thành công nhiều hơn một lần do lỗi xử lý đồng thời không khoá đúng dữ liệu.",
        "the phenomenon where the same amount of money is successfully withdrawn/spent/used more than once because a concurrency bug fails to lock data correctly.",
        "並行処理の不具合でデータが正しくロックされないため、同じ金額が複数回にわたって成功裏に引き出し/使用されてしまう現象。"),
      DEF("Lost Update", "khi hai giao dịch cùng đọc rồi ghi lại một dữ liệu, giao dịch ghi sau vô tình ghi đè kết quả của giao dịch ghi trước, khiến giao dịch đó 'mất tích' khỏi kết quả cuối.",
        "when two transactions both read then write the same data, and the later write unintentionally overwrites the earlier one's result, making that transaction 'disappear' from the final outcome.",
        "2つの取引が同じデータを読み取ってから書き込む際、後の書き込みが先の取引の結果を意図せず上書きし、その取引が最終結果から『消えて』しまうこと。"),
    ] },
  { heading: { vi: "3. Khoá lạc quan, khoá bi quan & deadlock — vũ khí chống tương tranh", en: "3. Optimistic locking, pessimistic locking & deadlock — weapons against concurrency bugs", ja: "3. 楽観的ロック・悲観的ロック・デッドロック — 並行処理バグへの対抗手段" },
    blocks: [
      P("Để ngăn lost update, hệ thống cần một cơ chế KHOÁ để đảm bảo tại một thời điểm chỉ một giao dịch được phép thay đổi cùng một dữ liệu. Có hai chiến lược phổ biến. Optimistic locking (khoá lạc quan) 'đặt cược' rằng tranh chấp hiếm khi xảy ra: không khoá trước, chỉ gắn một số hiệu version vào bản ghi, và khi ghi mới so sánh version hiện tại với version lúc đọc — nếu có giao dịch khác đã ghi trước (version đã đổi), hệ thống từ chối và yêu cầu thử lại. Pessimistic locking (khoá bi quan) 'đặt cược' ngược lại: khoá hẳn bản ghi ngay khi giao dịch bắt đầu, mọi giao dịch khác muốn đụng vào cùng dữ liệu phải xếp hàng chờ tới khi khoá được giải phóng.",
        "To prevent lost updates, a system needs a LOCKING mechanism ensuring only one transaction can modify the same data at a time. Two strategies are common. Optimistic locking 'bets' that contention is rare: it doesn't lock upfront, just attaches a version number to the record, and on write compares the current version with the one read earlier — if another transaction already wrote first (the version changed), it rejects and asks for a retry. Pessimistic locking 'bets' the opposite: it locks the record outright as soon as a transaction starts, forcing every other transaction wanting to touch the same data to queue and wait until the lock is released.",
        "ロストアップデートを防ぐには、同じデータを一度に1つの取引だけが変更できるようにする『ロック』機構が必要です。一般的な戦略は2つあります。楽観的ロック（optimistic locking）は競合がまれであると『賭ける』方式です：事前にロックせず、レコードにバージョン番号を付与するだけで、書き込み時に読み取り時点のバージョンと現在のバージョンを比較します——他の取引が先に書き込んでいれば（バージョンが変わっていれば）拒否してリトライを要求します。悲観的ロック（pessimistic locking）は逆に『賭け』ます：取引開始時点でレコードを完全にロックし、同じデータに触れたい他のすべての取引はロックが解放されるまで待ち行列に並ばされます。"),
      IMG(m_locks, "So sánh khoá lạc quan (optimistic) và khoá bi quan (pessimistic): cách hoạt động, hiệu năng, rủi ro cần tester kiểm chứng", "Comparing optimistic and pessimistic locking: how they work, performance, and risks testers must verify", "楽観的ロックと悲観的ロックの比較：仕組み、性能、テスターが検証すべきリスク"),
      P("Chọn sai chiến lược khoá — hoặc chọn đúng nhưng cài đặt sai — sinh ra hai họ lỗi khác nhau mà tester cần biết cách phân biệt để kiểm thử đúng trọng tâm. Với optimistic locking, lỗi thường gặp là RETRY không được xử lý đúng: người dùng bị từ chối giao dịch nhưng ứng dụng không thử lại tự động hoặc không báo rõ lý do, khiến trải nghiệm giống như 'app bị treo' dù về bản chất hệ thống đang bảo vệ dữ liệu đúng cách. Với pessimistic locking, rủi ro nghiêm trọng hơn là DEADLOCK: khi giao dịch A khoá tài khoản 1 rồi chờ khoá tài khoản 2, trong lúc giao dịch B đã khoá tài khoản 2 và đang chờ khoá tài khoản 1 — cả hai kẹt vĩnh viễn, chờ nhau tới khi hệ thống hết timeout hoặc phải khởi động lại. Một hệ thống ví điện tử tốt luôn khoá tài khoản theo một THỨ TỰ CỐ ĐỊNH (ví dụ theo ID tăng dần) để loại trừ khả năng deadlock kiểu này.",
        "Choosing the wrong locking strategy — or the right one implemented wrongly — produces two different bug families testers need to tell apart to test with the right focus. With optimistic locking, a common bug is RETRY not being handled correctly: the user's transaction gets rejected but the app doesn't retry automatically or doesn't clearly explain why, making the experience feel like the 'app froze' even though the system is actually protecting data correctly. With pessimistic locking, the more severe risk is DEADLOCK: transaction A locks account 1 then waits for a lock on account 2, while transaction B has already locked account 2 and is waiting for a lock on account 1 — both stay stuck forever, waiting for each other until the system times out or has to be restarted. A well-built e-wallet always locks accounts in a FIXED ORDER (e.g. by ascending ID) to rule out this kind of deadlock.",
        "ロック戦略を誤って選ぶ——あるいは正しく選んでも実装を誤る——と、テスターが的確にテストするために区別すべき2つの異なるバグ群が生まれます。楽観的ロックでは、リトライが正しく処理されないバグがよくあります：ユーザーの取引が拒否されてもアプリが自動的にリトライせず、理由も明確に説明しないため、システムが実際にはデータを正しく保護しているにもかかわらず『アプリがフリーズした』ように感じられてしまいます。悲観的ロックでは、より深刻なリスクはデッドロックです：取引Aが口座1をロックしてから口座2のロックを待ち、その間に取引Bはすでに口座2をロックして口座1のロックを待っている——両方が永久に停止し、システムがタイムアウトするか再起動されるまで互いを待ち続けます。優れた電子ウォレットは常に固定された『順序』（例えば昇順のIDなど）で口座をロックし、この種のデッドロックを排除します。"),
      DEF("Optimistic Locking", "khoá lạc quan: không khoá trước, so sánh version dữ liệu khi ghi và từ chối nếu đã bị giao dịch khác thay đổi trước.",
        "optimistic locking: doesn't lock upfront, compares a data version on write and rejects if another transaction has already changed it first.",
        "楽観的ロック：事前にロックせず、書き込み時にデータのバージョンを比較し、他の取引が先に変更していれば拒否する方式。"),
      DEF("Pessimistic Locking", "khoá bi quan: khoá hẳn dữ liệu ngay khi giao dịch bắt đầu, buộc mọi giao dịch khác phải chờ tới khi khoá được giải phóng.",
        "pessimistic locking: locks the data outright as soon as a transaction starts, forcing every other transaction to wait until the lock is released.",
        "悲観的ロック：取引開始時点でデータを完全にロックし、他のすべての取引がロック解放まで待たされる方式。"),
      DEF("Deadlock", "khoá chết: hai hoặc nhiều giao dịch cùng giữ một phần khoá và chờ khoá còn lại mà bên kia đang giữ, khiến tất cả kẹt vĩnh viễn.",
        "deadlock: two or more transactions each hold part of a lock and wait for the remaining lock held by another, leaving all of them stuck forever.",
        "デッドロック：2つ以上の取引がそれぞれロックの一部を保持し、互いが保持する残りのロックを待ち合い、すべてが永久に停止してしまう状態。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: quy trình & kỹ thuật thiết kế ca kiểm thử đồng thời", en: "4. Prepare: a process & techniques for designing concurrency test cases", ja: "4. 準備：並行テストケース設計のプロセスと技法" },
    blocks: [
      P("Kiểm thử đồng thời không thể làm bằng cách bấm tay hai lần liên tiếp và hy vọng 'trúng' đúng khe hở tranh chấp — độ trễ do ngón tay người luôn lớn hơn nhiều so với cửa sổ vài chục mili-giây nơi race condition thật sự xảy ra. Cần một quy trình có công cụ hỗ trợ, đo lường được, và lặp lại được để không phụ thuộc vào may rủi.",
        "Concurrency testing can't be done by manually tapping twice in a row and hoping to 'hit' the exact contention window — human finger latency is always far larger than the few-dozen-millisecond window where a real race condition occurs. It needs a tool-assisted, measurable, repeatable process so it doesn't depend on luck.",
        "並行テストは、手動で2回連続タップして競合の隙間に『うまく当たる』ことを期待するやり方ではできません——人間の指の遅延は、実際にレースコンディションが起きる数十ミリ秒の窓よりも常にはるかに大きいからです。運任せにならないよう、ツールに支援され、測定可能で、再現可能なプロセスが必要です。"),
      STEP(1, "Xác định TÀI NGUYÊN DÙNG CHUNG cần kiểm thử (ví dụ: 1 bản ghi số dư ví) và các thao tác có thể tranh chấp lên nó (rút, chuyển, nạp).", "Identify the SHARED RESOURCE to test (e.g. one wallet balance record) and the operations that can contend for it (withdraw, transfer, deposit).", "テストすべき『共有リソース』（例：1つの残高レコード）と、それを奪い合う可能性のある操作（引き出し、送金、入金）を特定する。"),
      STEP(2, "Chuẩn bị dữ liệu nền: 1 tài khoản với số dư đủ cho ĐÚNG 1 giao dịch trong 2 giao dịch dự kiến chạy song song, để lộ rõ ca thắng/thua.", "Prepare baseline data: one account with a balance sufficient for EXACTLY 1 of the 2 transactions planned to run in parallel, to clearly expose a win/loss case.", "基準データを用意する：並行実行を予定する2つの取引のうち『ちょうど1つ』分だけ十分な残高を持つ1つの口座を用意し、勝敗が明確に現れるようにする。"),
      STEP(3, "Dùng công cụ bắn request song song thật sự cùng lúc (k6, JMeter, hoặc script gọi API bằng Promise.all/asyncio.gather) thay vì thao tác tay trên UI.", "Use a tool that truly fires requests in parallel at the same instant (k6, JMeter, or a script calling the API with Promise.all/asyncio.gather) instead of manual UI actions.", "手動のUI操作ではなく、本当に同時にリクエストを発射するツール（k6、JMeter、またはPromise.all/asyncio.gatherでAPIを呼ぶスクリプト）を使う。"),
      STEP(4, "Chạy lại NHIỀU LẦN (race condition không phải lúc nào cũng lộ ra ở lần chạy đầu) và kiểm tra kết quả cuối cùng: số dư, số giao dịch được ghi nhận, có khớp logic nghiệp vụ không.", "Run it MULTIPLE TIMES (a race condition doesn't always surface on the first run) and check the final result: the balance, the number of recorded transactions, whether it matches business logic.", "複数回実行する（レースコンディションは初回実行で必ず現れるとは限らない）。最終結果——残高、記録された取引数、業務ロジックと一致するか——を確認する。"),
      CODE("text", "KE HOACH CA KIEM THU DONG THOI - Rut tien tranh chap so du (VíNhanh)\nDu lieu nen: Vi VN-9001, so du = 6.000.000d\nB1: Chuan bi 2 request RUT giong het nhau, moi request 5.000.000d\nB2: Ban dong thoi ca 2 request bang Promise.all (khong cho response truoc)\nB3: Ghi lai: request nao tra ve THANH CONG, request nao tra ve TU CHOI\nB4 (Expected): dung 1 request THANH CONG, 1 request bi TU CHOI vi khong du so du\nB4 (Actual - BUG): ca 2 request deu THANH CONG -> so du cuoi = -4.000.000d\nLap lai buoc 1-4 toi thieu 20 lan de xac nhan bug xay ra on dinh, khong phai ngau nhien 1 lan"),
      TRY("Thử viết lại kịch bản trên nhưng đổi 2 lệnh RÚT thành 1 lệnh NẠP và 1 lệnh RÚT chạy song song — kết quả mong đợi cuối cùng nên là gì?", "Try rewriting the scenario above but change the two WITHDRAW requests into one DEPOSIT and one WITHDRAW running in parallel — what should the expected final result be?", "上のシナリオを書き換えて、2つの『引き出し』リクエストを『入金』1つと『引き出し』1つの並行実行に変えてみよう——最終的な期待結果はどうあるべきか？"),
      PITFALL("Chỉ chạy ca kiểm thử đồng thời MỘT LẦN rồi kết luận 'PASS'. Race condition mang tính xác suất — có thể lần đầu không lộ ra nhưng lần thứ 15 mới lộ. Luôn chạy lặp lại nhiều lần trước khi kết luận an toàn.", "Running a concurrency test case only ONCE then concluding 'PASS'. Race conditions are probabilistic — the bug might not surface on the first run but only on the 15th. Always run it repeatedly before concluding it's safe.", "並行テストケースを1回だけ実行して『合格』と結論づけること。レースコンディションは確率的な現象です——1回目では現れず15回目で初めて現れることもあります。安全だと結論づける前に必ず何度も繰り返し実行しましょう。"),
      IMG(m_technique, "Các kỹ thuật nghĩ ca kiểm thử đồng thời — dùng như checklist khi thiết kế ca cho ví điện tử", "Techniques for designing concurrency test cases — use as a checklist when designing cases for an e-wallet", "並行テストケース設計の技法 — 電子ウォレット向けケース設計時のチェックリストとして使用"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử đồng thời từng bước: số dư, double-spend, idempotency", en: "5. Writing concurrency test cases step by step: balance, double-spend, idempotency", ja: "5. 並行テストケースを一歩ずつ書く：残高・ダブルスペンド・冪等性" },
    blocks: [
      P("Giờ ta áp dụng quy trình ở chương trước vào hai nhóm ca kiểm thử cốt lõi của một ví điện tử: tranh chấp SỐ DƯ (nơi double-spend và lost update thường xảy ra) và IDEMPOTENCY & THỨ TỰ GIAO DỊCH (nơi double-tap và retry thường gây trừ tiền hai lần).",
        "Now let's apply the process from the previous chapter to two core test-case groups for an e-wallet: BALANCE contention (where double-spend and lost update usually happen) and IDEMPOTENCY & TRANSACTION ORDERING (where double-taps and retries usually cause double debits).",
        "では、前章のプロセスを電子ウォレットの2つの中核的なテストケース群に適用しましょう：残高の争奪（ダブルスペンドやロストアップデートが起きやすい箇所）と、冪等性・取引順序（ダブルタップやリトライが二重引き落としを引き起こしやすい箇所）です。"),
      IMG(m_case_balance, "Bảng ca kiểm thử đồng thời cho tranh chấp SỐ DƯ & DOUBLE-SPEND trên ví VíNhanh", "Concurrency test-case table for BALANCE contention & DOUBLE-SPEND on the VíNhanh wallet", "VíNhanhウォレットにおける残高の争奪とダブルスペンドの並行テストケース表"),
      P("Điểm dễ bị bỏ sót nhất trong bảng trên là ca cuối — nạp và rút cùng lúc, hai giao dịch KHÔNG đối lập trực tiếp về kết quả mong đợi (cả hai đều 'hợp lệ' và đều nên thành công), nhưng vẫn có thể gây lost update nếu hệ thống đọc-sửa-ghi không đúng cách: một trong hai lệnh có thể bị 'quên' cộng/trừ nếu cả hai cùng đọc số dư ban đầu. Nhiều đội chỉ tập trung kiểm thử ca 'ai thắng ai thua' (2 lệnh rút tranh nhau) mà quên mất ca 'cả hai đều đúng nhưng có thể làm mất nhau' — đây chính là dạng lost update nguy hiểm nhất vì không có cảnh báo lỗi nào xuất hiện, số dư chỉ đơn giản SAI mà không ai để ý.",
        "The most easily overlooked case in the table above is the last one — deposit and withdraw at the same time, two transactions that are NOT directly opposed in their expected outcome (both are 'valid' and both should succeed), yet can still cause a lost update if the read-modify-write isn't handled correctly: one of the two might get 'forgotten' if both read the same initial balance. Many teams only focus on 'who wins, who loses' cases (two withdrawals competing) and forget the 'both are correct but can still erase each other' case — this is actually the most dangerous kind of lost update, because no error appears at all; the balance is simply WRONG and nobody notices.",
        "上の表で最も見落とされやすいのは最後のケース——入金と引き出しの同時実行で、期待結果が直接対立しない2つの取引です（どちらも『有効』でどちらも成功すべき）。しかし両方が同じ初期残高を読み取れば、読み取り・変更・書き込みが正しく処理されない場合、一方の操作が『忘れられて』しまい、ロストアップデートが起こり得ます。多くのチームは『どちらが勝ちどちらが負けるか』のケース（2つの引き出しが競合する）にばかり注目し、『両方とも正しいのに互いを消し合う可能性がある』ケースを忘れがちです——これはエラーが一切表示されないため実は最も危険なロストアップデートの形態です。残高が単に『間違っている』だけで、誰も気づきません。"),
      IMG(m_case_idem, "Bảng ca kiểm thử đồng thời cho IDEMPOTENCY & THỨ TỰ GIAO DỊCH trên ví VíNhanh", "Concurrency test-case table for IDEMPOTENCY & TRANSACTION ORDERING on the VíNhanh wallet", "VíNhanhウォレットにおける冪等性・取引順序の並行テストケース表"),
      P("Nhóm ca idempotency dễ bị đội phát triển bỏ qua vì nó không nằm trong đặc tả nghiệp vụ ban đầu — không ai viết user story 'khi khách bấm 2 lần thì...'. Nhưng thực tế mạng di động chập chờn khiến double-tap và retry xảy ra THƯỜNG XUYÊN hơn nhiều so với race condition thuần tuý giữa 2 thiết bị khác nhau. Vì vậy khi thời gian kiểm thử có hạn, nhóm ca idempotency nên được ưu tiên KHÔNG kém nhóm ca tranh chấp số dư, đặc biệt trên các API có gắn liền với hành động GHI TIỀN (rút, chuyển, nạp, thanh toán).",
        "The idempotency case group is easily skipped by dev teams because it's not in the original business spec — nobody writes a user story like 'when the customer taps twice, then...'. But in reality, flaky mobile networks make double-taps and retries happen MUCH MORE OFTEN than a pure race condition between two different devices. So when testing time is limited, the idempotency case group should be prioritized JUST AS HIGHLY as the balance-contention group, especially on APIs tied to a MONEY-WRITING action (withdraw, transfer, deposit, payment).",
        "冪等性のケース群は、元の業務仕様に含まれていないため開発チームに見落とされがちです——『顧客が2回タップしたら…』というユーザーストーリーを書く人はいません。しかし実際には、不安定なモバイルネットワークによりダブルタップやリトライは、2台の異なる端末間の純粋なレースコンディションよりも『はるかに頻繁に』発生します。そのため、テスト時間が限られている場合、冪等性のケース群は残高の争奪グループと『同等に』優先されるべきです。特に金銭を書き込むアクション（引き出し、送金、入金、支払い）に紐づくAPIでは。"),
    ] },
  { heading: { vi: "6. Tình huống 1: 2 lần rút gần như đồng thời làm âm số dư", en: "6. Situation 1: two near-simultaneous withdrawals push the balance negative", ja: "6. シーン1：ほぼ同時の2回の引き出しで残高がマイナスになる" },
    blocks: [
      SITUATION("Ví VN-9001 có số dư 6.000.000đ. Khách hàng đăng nhập cùng lúc trên điện thoại và trình duyệt web, cả hai đều bấm 'Rút 5.000.000đ' trong vòng dưới 1 giây.", "Wallet VN-9001 has a balance of 6,000,000đ. The customer is logged in on both a phone and a web browser at the same time, and taps 'Withdraw 5,000,000đ' on both within under 1 second.",
        "Cả hai màn hình đều hiển thị 'Rút tiền thành công'. Kiểm tra sổ giao dịch cho thấy 2 giao dịch rút 5.000.000đ đều được ghi nhận, số dư cuối cùng là -4.000.000đ — một con số không thể xảy ra về mặt nghiệp vụ.", "Both screens show 'Withdrawal successful'. Checking the transaction ledger shows both 5,000,000đ withdrawals were recorded, and the final balance is -4,000,000đ — a number that should be business-impossible.",
        "ウォレットVN-9001の残高は600万ドン。顧客がスマートフォンとウェブブラウザに同時にログインし、両方で1秒未満のうちに『500万ドン引き出し』をタップする。",
        "両方の画面に『引き出し成功』と表示される。取引台帳を確認すると、500万ドンの引き出しが2件とも記録されており、最終残高は-400万ドン——業務上あり得ないはずの数値になっている。"),
      SOLVE("Báo bug Critical ngay (ảnh hưởng tiền thật), yêu cầu đội phát triển chuyển bước ghi số dư sang pessimistic locking (khoá bản ghi khi bắt đầu xử lý lệnh rút) hoặc thêm điều kiện kiểm tra số dư NGAY TẠI CÂU LỆNH GHI (WHERE balance >= amount) thay vì kiểm tra rồi ghi tách rời hai bước, và bổ sung ca kiểm thử này vào bộ hồi quy tự động chạy song song mỗi khi có thay đổi liên quan tới module Ví.", "Report it as a Critical bug immediately (real money impact), request the dev team move the balance-write step to pessimistic locking (lock the record when the withdrawal starts processing) or add a balance check directly in the WRITE statement (WHERE balance >= amount) instead of checking then writing as two separate steps, and add this case to the automated regression suite that runs in parallel whenever the Wallet module changes.", "即座にCriticalバグとして報告し（実際のお金に影響）、開発チームに残高書き込みステップを悲観的ロック（引き出し処理開始時にレコードをロック）に変更するか、確認と書き込みを2つの別ステップにするのではなく書き込み文自体に残高チェックを組み込む（WHERE balance >= amount）よう要求し、このケースをウォレットモジュールに変更があるたびに並行実行される自動回帰テストスイートに追加する。"),
      P("Ví dụ này là minh chứng rõ nhất cho việc vì sao 'test tuần tự pass' không đồng nghĩa 'an toàn'. Nếu tester chỉ thử rút 5.000.000đ một lần trên ví 6.000.000đ, ca đó chắc chắn PASS — hệ thống có đủ tiền và xử lý đúng. Lỗi CHỈ lộ ra khi có ĐÚNG HAI thao tác chạm vào cùng bản ghi trong một khoảng thời gian cực ngắn, điều mà kiểm thử chức năng thông thường không bao giờ mô phỏng. Đây là lý do concurrency testing cần là một hạng mục RIÊNG trong kế hoạch kiểm thử của mọi hệ thống xử lý tiền, không thể 'lồng ghép' vào test case chức năng thông thường.",
        "This example is the clearest proof of why 'passing sequentially' doesn't mean 'safe'. If a tester only tries withdrawing 5,000,000đ once from a 6,000,000đ wallet, that case will certainly PASS — the system has enough funds and handles it correctly. The bug ONLY surfaces when EXACTLY TWO operations touch the same record within an extremely short window, something ordinary functional testing never simulates. This is why concurrency testing needs to be a SEPARATE line item in every money-handling system's test plan, not something 'folded into' ordinary functional test cases.",
        "この例は、『逐次実行で合格』が『安全』を意味しないことを最も明確に示しています。テスターが600万ドンのウォレットから500万ドンを1回だけ引き出そうとした場合、そのケースは確実に『合格』します——システムには十分な残高があり正しく処理されます。バグは『ちょうど2つ』の操作が極めて短い時間内に同じレコードに触れたときにしか現れず、これは通常の機能テストが決してシミュレートしないものです。だからこそ並行テストは、あらゆる金銭処理システムのテスト計画において、通常の機能テストケースに『組み込む』のではなく『独立した』項目である必要があるのです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử đồng thời 'rút tiền tranh chấp số dư' trên ví VíNhanh", "A bug ticket found via the concurrent 'balance contention on withdrawal' test case on VíNhanh", "VíNhanhの『引き出しにおける残高の争奪』並行テストケースで見つかったバグチケット"),
      RECAP(["Test tuần tự PASS không đồng nghĩa an toàn khi có tương tranh", "Concurrency testing phải là hạng mục riêng, không lồng vào test chức năng thường"],
        ["Passing sequentially does NOT mean safe under concurrency", "Concurrency testing must be a separate line item, not folded into ordinary functional testing"],
        ["逐次テストの合格は並行時の安全性を意味しない", "並行テストは通常の機能テストに組み込まず、独立した項目にすべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: nhấn nút chuyển 2 lần tạo 2 giao dịch", en: "7. Situation 2: tapping the transfer button twice creates two transactions", ja: "7. シーン2：送金ボタンを2回タップして2件の取引が作られる" },
    blocks: [
      SITUATION("Khách hàng chuyển 2.000.000đ cho bạn. Mạng di động hơi chậm nên màn hình không phản hồi ngay sau khi bấm 'Xác nhận chuyển tiền', khách tưởng chưa bấm trúng nên bấm thêm lần nữa.", "A customer transfers 2,000,000đ to a friend. The mobile network is a bit slow so the screen doesn't respond right after tapping 'Confirm Transfer', and the customer, thinking the tap missed, taps again.",
        "Cả hai lần bấm đều được gửi thành 2 request riêng biệt tới server (vì app không khoá nút khi đang chờ phản hồi và không gắn idempotency key). Bạn của khách nhận được 4.000.000đ, khách bị trừ tổng 4.000.000đ dù chỉ có ý định chuyển 2.000.000đ một lần.", "Both taps get sent as 2 separate requests to the server (because the app doesn't disable the button while awaiting a response and doesn't attach an idempotency key). The friend receives 4,000,000đ, and the customer is debited 4,000,000đ total, even though they only intended to transfer 2,000,000đ once.",
        "顧客が友人に200万ドンを送金する。モバイルネットワークがやや遅く、『送金確認』をタップした直後に画面が反応しないため、顧客はタップが効かなかったと思いもう一度タップする。",
        "アプリが応答待ち中にボタンを無効化せず、冪等性キーも付与していないため、両方のタップがそれぞれ別のリクエストとしてサーバーに送信される。友人は400万ドンを受け取り、顧客は一度だけ200万ドンを送金するつもりだったのに合計400万ドン引き落とされてしまう。"),
      SOLVE("Chặn từ 2 lớp: (1) client — khoá/disable nút ngay khi bấm, hiện trạng thái đang xử lý rõ ràng để người dùng không bấm thêm; (2) server — gắn idempotency key sinh ra ngay khi mở màn hình xác nhận, request thứ 2 với cùng key phải trả về đúng kết quả của request đầu thay vì tạo giao dịch mới. Không được chỉ chặn ở client vì người dùng luôn có cách lách qua (mất mạng giữa chừng, app crash rồi mở lại và bấm lại).", "Block it at 2 layers: (1) client — disable the button immediately on tap and show a clear processing state so the user doesn't tap again; (2) server — attach an idempotency key generated as soon as the confirmation screen opens; a second request with the same key must return the same result as the first instead of creating a new transaction. Never block only on the client, since users can always find a way around it (losing connection mid-way, the app crashing and being reopened, then tapping again).", "2つの層でブロックする：(1) クライアント側——タップ直後にボタンを無効化し、処理中であることを明確に表示してユーザーが再度タップしないようにする、(2) サーバー側——確認画面を開いた時点で生成される冪等性キーを付与し、同じキーを持つ2回目のリクエストは新しい取引を作らず1回目と同じ結果を返すようにする。ユーザーは常に回避策（途中で通信断、アプリがクラッシュして再度開いて再タップなど）を見つけられるため、クライアント側だけでブロックしてはいけない。"),
      P("Điểm quan trọng nhất trong tình huống này là: chặn double-tap ở GIAO DIỆN thôi là chưa đủ, vì giao diện chỉ ngăn được người dùng 'ngoan' bấm đúng cách. Idempotency key ở phía SERVER mới là lớp bảo vệ thật sự, vì nó xử lý được cả những trường hợp client không kiểm soát được: mất mạng ngay sau khi gửi khiến app tự động retry, người dùng tắt app giữa chừng rồi mở lại và vô tình gửi lại thao tác cũ, hoặc thậm chí một kẻ tấn công cố tình gửi lại request đã chặn được để khai thác lỗ hổng. Khi thiết kế ca kiểm thử, tester nên luôn kiểm tra CẢ HAI lớp thay vì chỉ tin vào cái dễ thấy nhất — nút bị mờ đi trên màn hình.",
        "The most important point in this situation is: blocking double-taps at the UI layer alone isn't enough, because the UI can only stop a 'well-behaved' user tapping correctly. The server-side idempotency key is the real protection layer, because it also handles cases the client can't control: losing connection right after sending, causing the app to auto-retry; the user closing the app mid-way then reopening it and accidentally resending the old action; or even an attacker deliberately resending a captured request to exploit the hole. When designing test cases, testers should always check BOTH layers instead of trusting only the most visible one — a greyed-out button on screen.",
        "このシーンで最も重要な点は：UI層だけでダブルタップをブロックするのでは不十分だということです。UIは正しくタップする『行儀の良い』ユーザーしか止められないからです。サーバー側の冪等性キーこそが本当の防御層です。クライアントが制御できないケース——送信直後の通信断によるアプリの自動リトライ、ユーザーがアプリを途中で閉じて再度開いて誤って古い操作を再送してしまうこと、さらには攻撃者が意図的にキャプチャしたリクエストを再送して穴を悪用すること——も処理できるからです。テストケースを設計する際、テスターは画面上のボタンが灰色になるという最も目に見えるものだけを信じるのではなく、常に『両方の』層を確認すべきです。"),
      TRY("Nghĩ thêm một API 'ghi tiền' khác trên VíNhanh (nạp tiền từ ngân hàng, thanh toán hoá đơn...) và đề xuất 1 ca kiểm thử idempotency cho nó.", "Think of another 'money-writing' API on VíNhanh (top-up from a bank, bill payment...) and propose one idempotency test case for it.", "VíNhanhの別の『金銭書き込み』API（銀行からの入金、公共料金の支払いなど）を考え、冪等性のテストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Cân bằng bộ ca kiểm thử & theo dõi lỗi tương tranh trong dự án thực tế", en: "8. Balancing the test suite & tracking concurrency bugs in a real project", ja: "8. テストスイートのバランスと実プロジェクトでの並行処理バグの追跡" },
    blocks: [
      P("Không phải API nào cũng cần bộ ca kiểm thử đồng thời đầy đủ như nhau. Cách thực dụng là ưu tiên theo hai tiêu chí: API có GHI DỮ LIỆU TÀI CHÍNH (rút, chuyển, nạp, thanh toán, hoàn tiền) và API có tần suất người dùng thao tác nhanh/lặp lại cao (nút bấm dễ double-tap, màn hình dễ mở nhiều tab/thiết bị cùng lúc). Các API chỉ ĐỌC dữ liệu (xem lịch sử, xem số dư) có rủi ro tương tranh thấp hơn nhiều và có thể để mức ưu tiên kiểm thử thấp hơn.",
        "Not every API needs an equally full concurrency test suite. A practical approach is to prioritize by two criteria: APIs that WRITE FINANCIAL DATA (withdraw, transfer, deposit, pay, refund) and APIs with high-frequency/repeated user interaction (buttons prone to double-taps, screens easily opened across multiple tabs/devices at once). APIs that only READ data (viewing history, viewing balance) carry much lower concurrency risk and can be given lower test priority.",
        "すべてのAPIが同じように完全な並行テストスイートを必要とするわけではありません。実用的なアプローチは、2つの基準で優先順位を付けることです：金融データを『書き込む』API（引き出し、送金、入金、支払い、返金）と、ユーザー操作の頻度/繰り返しが高いAPI（ダブルタップしやすいボタン、複数タブ/端末で同時に開かれやすい画面）です。データを『読み取る』だけのAPI（履歴閲覧、残高確認）は並行処理リスクがはるかに低く、テスト優先度を下げても構いません。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tương tranh tìm qua Concurrency Testing (VíNhanh · Sprint Race)", "A board tracking concurrency bugs found via concurrency testing (VíNhanh · Sprint Race)", "並行テストで見つかった競合バグの追跡ボード（VíNhanh・スプリントRace）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi Critical của sprint đến từ ca kiểm thử đồng thời trên các API ghi tiền", "Metrics: most of the sprint's Critical bugs come from concurrency test cases on money-writing APIs", "指標：スプリントのCriticalバグの大半は金銭書き込みAPIの並行テストケースから見つかった"),
      TIP("Ưu tiên viết ca kiểm thử đồng thời cho các API GHI TIỀN trước, sau đó mới tới các API GHI dữ liệu quan trọng khác (điểm thưởng, hạn mức) — đó là nơi một lỗi tương tranh gây thiệt hại tài chính trực tiếp và khó đảo ngược nhất.", "Prioritize writing concurrency test cases for MONEY-WRITING APIs first, then other important WRITE data (loyalty points, credit limits) — that's where a concurrency bug causes the most direct, hardest-to-reverse financial damage.", "まず金銭を書き込むAPIの並行テストケースを優先的に書き、その後に他の重要な書き込みデータ（ポイント、与信限度額）に取り組もう——そこが並行処理バグが最も直接的で取り消しにくい金銭的損害を引き起こす場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi kiểm thử đồng thời", en: "9. Common mistakes & tips for concurrency testing", ja: "9. 並行テストでよくある失敗とコツ" },
    blocks: [
      P("Ngay cả tester có kinh nghiệm cũng thường vấp một vài lỗi giống nhau khi bắt đầu làm concurrency testing. Biết trước giúp bạn thiết kế bộ ca hiệu quả hơn mà không tốn quá nhiều thời gian thử-sai.",
        "Even experienced testers often stumble on a few common mistakes when starting concurrency testing. Knowing them in advance helps you design a more effective test suite without too much trial and error.",
        "経験豊富なテスターでさえ、並行テストを始めるときによくある共通の失敗をしがちです。事前に知っておくことで、試行錯誤を減らしてより効果的なテストスイートを設計できます。"),
      PITFALL("Coi kiểm thử tải (performance/load testing) và kiểm thử đồng thời (concurrency testing) là một. Load testing đo hệ thống chịu được BAO NHIÊU request cùng lúc; concurrency testing đo hệ thống có ĐÚNG hay không khi vài request cụ thể va chạm lên cùng một dữ liệu — hai mục tiêu khác nhau, cần thiết kế ca khác nhau.", "Treating performance/load testing and concurrency testing as the same thing. Load testing measures HOW MANY requests a system can handle at once; concurrency testing measures whether the system stays CORRECT when a few specific requests collide on the same data — two different goals needing different test case designs.", "性能/負荷テストと並行テストを同一視すること。負荷テストはシステムが同時に処理できる『リクエスト数』を測定するが、並行テストは特定の少数のリクエストが同じデータに衝突したときにシステムが『正しい』かどうかを測定する——目的が異なり、テストケース設計も異なる。"),
      PITFALL("Chỉ kiểm thử tương tranh giữa 2 request GIỐNG HỆT nhau (2 lệnh rút) mà quên các cặp KHÁC LOẠI (nạp và rút, chuyển và hoàn tiền) — những cặp này vẫn có thể gây lost update dù kết quả mong đợi của từng lệnh riêng lẻ đều đúng.", "Only testing contention between two IDENTICAL requests (two withdrawals) while forgetting DIFFERENT-TYPE pairs (deposit and withdraw, transfer and refund) — these pairs can still cause a lost update even though each individual request's expected result is correct.", "『同一』の2つのリクエスト（引き出し2件）間の競合だけをテストし、『異なる種類』の組み合わせ（入金と引き出し、送金と返金）を忘れること——これらの組み合わせも、個々のリクエストの期待結果が正しくてもロストアップデートを引き起こし得る。"),
      TIP("Trước khi báo một lỗi tương tranh, luôn chạy lại ca đó tối thiểu 10-20 lần và ghi lại tỉ lệ tái hiện — báo cáo kèm tỉ lệ (ví dụ '7/20 lần') giúp đội phát triển đánh giá đúng mức độ nghiêm trọng thay vì nghĩ đó là lỗi hiếm gặp có thể bỏ qua.", "Before reporting a concurrency bug, always rerun the case at least 10-20 times and record the reproduction rate — reporting it with a rate (e.g. '7/20 times') helps the dev team correctly gauge severity instead of assuming it's a rare bug that can be ignored.", "並行処理バグを報告する前に、必ずそのケースを最低10〜20回再実行し再現率を記録しよう——再現率（例：『20回中7回』）を添えて報告することで、開発チームがまれで無視できるバグだと誤解せず、深刻度を正しく評価できるようになる。"),
      IMG(m_locks, "Nhắc lại: chọn đúng chiến lược khoá quyết định lớp lỗi nào sẽ xuất hiện — dùng khi review thiết kế cùng đội phát triển", "Reminder: choosing the right locking strategy determines which bug class will appear — use this when reviewing design with the dev team", "再確認：正しいロック戦略を選ぶことがどのバグ種別が現れるかを決める — 開発チームとの設計レビュー時に活用"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử phục hồi & failover cho Tester", "Recovery & failover testing for testers", "kiem-thu-phuc-hoi-va-failover-cho-tester", "テスターのためのリカバリー＆フェイルオーバーテスト"),
      INTERNAL("Kỹ thuật đoán lỗi (Error Guessing) cho Tester", "Error guessing technique for testers", "ky-thuat-doan-loi-error-guessing-cho-tester", "テスターのためのエラー推測技法"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử đồng thời (concurrency testing) qua ví điện tử VíNhanh: cách race condition và double-spend xảy ra theo mô hình đọc-sửa-ghi, sự khác biệt giữa khoá lạc quan/bi quan và rủi ro deadlock đi kèm, quy trình thiết kế ca kiểm thử có công cụ hỗ trợ thay vì bấm tay, và hai tình huống thật cho thấy vì sao chỉ test tuần tự là chưa đủ với hệ thống xử lý tiền. Bạn cũng biết cách ưu tiên bộ ca theo mức độ nhạy cảm tài chính và cách gắn idempotency key để chặn double-tap/retry. Đây là kỹ năng nâng cao giúp bạn bắt được lớp lỗi mà phần lớn quy trình kiểm thử chức năng thông thường bỏ sót hoàn toàn.",
        "You just learned concurrency testing through the VíNhanh e-wallet: how race conditions and double-spend happen through the read-modify-write pattern, the difference between optimistic/pessimistic locking and the deadlock risk that comes with it, a tool-assisted (not manual-tapping) process for designing test cases, and two real situations showing why sequential testing alone isn't enough for a money-handling system. You also learned how to prioritize the test suite by financial sensitivity and how attaching an idempotency key blocks double-taps/retries. This is an advanced skill that lets you catch a bug class most ordinary functional testing processes miss entirely.",
        "電子ウォレットVíNhanhを通じて並行テストを学びました：読み取り・変更・書き込みパターンを通じてレースコンディションとダブルスペンドがどう起きるか、楽観的/悲観的ロックの違いとそれに伴うデッドロックのリスク、手動タップではなくツールに支援されたテストケース設計プロセス、そして逐次テストだけでは金銭処理システムに不十分な理由を示す2つの実例。財務的な機微度に応じてテストスイートに優先順位を付ける方法や、冪等性キーを付与してダブルタップ/リトライをブロックする方法も学びました。これは、ほとんどの通常の機能テストプロセスが完全に見逃すバグ種別を捉えられるようになる上級スキルです。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu sâu hơn về kiểm thử hiệu năng (performance/load testing) để phân biệt rõ với concurrency testing, cùng cách viết kịch bản kiểm thử tự động hoá cho các ca tương tranh để chạy lặp lại trong CI/CD mỗi khi có thay đổi. Nếu muốn học bài bản từ nền tảng tới các kỹ thuật nâng cao như thế này cùng người hướng dẫn và dự án thực tế fintech, một khoá học Tester chuyên nghiệp sẽ giúp bạn tự tin đảm nhận các hệ thống có độ nhạy cảm cao về dữ liệu và tiền bạc.",
        "Next, you should dig deeper into performance/load testing to clearly distinguish it from concurrency testing, along with how to write automated test scripts for concurrency cases so they can rerun repeatedly in CI/CD whenever there's a change. If you want to learn properly from the fundamentals to advanced techniques like this, with a mentor and real fintech projects, a professional Tester course will help you confidently take on systems with high sensitivity around data and money.",
        "次は、性能/負荷テストをより深く理解し並行テストとの違いを明確にすること、そして変更があるたびにCI/CDで繰り返し実行できるよう並行処理ケースの自動テストスクリプトの書き方を学ぶとよいでしょう。指導者と実際のフィンテック案件とともに、基礎からこのような上級技法まで体系的に学びたいなら、プロフェッショナルテスターコースが、データとお金に対する機微度の高いシステムを自信を持って担当できるよう助けてくれます。"),
      CTA(course),
    ] },
];

const MA_CONCURRENCY_DOC_01 = makeDoc({
  slug: "kiem-thu-dong-thoi-tuong-tranh-concurrency-cho-tester",
  domain: "fintech",
  primaryKeyword: "kiểm thử đồng thời",
  keywords: ["kiểm thử đồng thời", "concurrency testing", "race condition", "double-spend", "khoá lạc quan", "khoá bi quan", "deadlock", "idempotency", "ví điện tử"],
  coverLabel: "NÂNG CAO · CONCURRENCY · FINTECH",
  crumb: "Kiểm thử đồng thời & tương tranh (Concurrency & Race Condition Testing)",
  metaTitle: {
    vi: "Kiểm thử đồng thời & Race Condition cho Tester",
    en: "Concurrency & race condition testing for testers",
    ja: "テスターのための並行・レースコンディションテスト",
  },
  metaDescription: {
    vi: "Kiểm thử đồng thời (concurrency) cho Tester fintech: race condition, double-spend, khoá lạc quan/bi quan, deadlock, idempotency, ví VíNhanh, hình & trắc nghiệm.",
    en: "Concurrency testing for fintech testers: race conditions, double-spend, optimistic/pessimistic locking, deadlock, idempotency through the VíNhanh e-wallet, with visuals and a quiz.",
    ja: "フィンテックテスター向け並行テスト：電子ウォレットVíNhanhでレースコンディション、ダブルスペンド、楽観的/悲観的ロック、デッドロック、冪等性を解説、図とクイズ付き。",
  },
  title: {
    vi: "Kiểm thử đồng thời & tương tranh (Concurrency & Race Condition Testing) cho ví điện tử fintech",
    en: "Concurrency & race condition testing for a fintech e-wallet",
    ja: "フィンテック電子ウォレットのための並行・レースコンディションテスト",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử đồng thời (concurrency testing) qua ví điện tử VíNhanh — race condition, double-spend, khoá lạc quan/bi quan, deadlock, lost update, idempotency, thứ tự giao dịch. Quy trình thiết kế ca kiểm thử nhiều thao tác cùng lúc, 2 tình huống thật (số dư âm do rút đồng thời, giao dịch nhân đôi do double-tap), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: concurrency testing through the VíNhanh e-wallet — race conditions, double-spend, optimistic/pessimistic locking, deadlock, lost update, idempotency, transaction ordering. A process for designing test cases with multiple simultaneous operations, 2 real situations (a negative balance from concurrent withdrawals, a duplicated transaction from a double-tap), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：電子ウォレットVíNhanhを通じた並行テスト——レースコンディション、ダブルスペンド、楽観的/悲観的ロック、デッドロック、ロストアップデート、冪等性、取引順序。複数の同時操作のテストケース設計プロセス、実例2件（同時引き出しによるマイナス残高、ダブルタップによる取引重複）、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thiết kế và viết ca kiểm thử đồng thời", steps: [
    { name: "Xác định tài nguyên dùng chung & thao tác có thể tranh chấp", text: "Ví dụ: 1 bản ghi số dư ví bị rút/chuyển/nạp cùng lúc." },
    { name: "Dùng công cụ bắn request song song thật sự (k6/JMeter/Promise.all)", text: "Không thao tác tay vì độ trễ ngón tay quá lớn so với cửa sổ race." },
    { name: "Chạy lặp lại nhiều lần & kiểm tra kết quả cuối, ghi tỉ lệ tái hiện", text: "Race condition mang tính xác suất, không phải lúc nào cũng lộ ra ngay lần đầu." },
  ] },
  pages,
});

export const MA_CONCURRENCY_01 = [MA_CONCURRENCY_DOC_01];
