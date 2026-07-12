// doc_ma_volume.mjs — BÀI MANUAL "NÂNG CAO": Kiểm thử dung lượng & khả năng mở rộng
// (Volume & Scalability Testing — góc nhìn tester) trên hệ QUẢN LÝ THUÊ BAO VIỄN THÔNG
// nhiều triệu thuê bao: danh sách hàng triệu bản ghi, phân trang/tìm kiếm chậm, timeout,
// tràn bộ nhớ, giới hạn xuất báo cáo, hàng đợi; phân biệt với load/performance test; cách
// chuẩn bị dữ liệu khối lượng lớn. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến.",
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
    tags: tags("congnghe", "telecom", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn danh sách thuê bao bị TREO/TIMEOUT khi dữ liệu lớn ──
const m_slow = browser("subms.viettelco.vn/thue-bao/danh-sach?trang=48213&size=50", [
  panel("SubMS · Quản lý thuê bao (5.200.000 bản ghi)", [
    field(24, 20, 330, "Tìm theo SĐT / Họ tên", "Nguyễn Văn", "focus"),
    field(372, 20, 330, "Lọc theo gói cước", "Tất cả gói", "normal"),
    btn(24, 92, 150, "Tìm kiếm", "primary"),
    `<text x="200" y="118" font-size="12" fill="#64748b">⏳ Đang tải danh sách... (28.4 giây)</text>`,
    annotate(20, 132, 682, 42, "TIMEOUT: server trả lỗi 504 sau 30 giây"),
  ].join(""), { h: 226, accent: "#a21caf" }),
].join(""), { h: 282, title: "Hệ thống thuê bao viễn thông", accent: "#a21caf" });

// ── Mockup 2: bảng so sánh Volume Testing vs Load/Performance Testing ──
const m_compare = grid("Volume Testing vs Load/Performance Testing — khác nhau ở đâu", ["Tiêu chí", "Volume Testing", "Load/Performance Testing"], [
  ["Biến số thay đổi", "Khối lượng DỮ LIỆU (số bản ghi trong DB)", "Số NGƯỜI DÙNG/request đồng thời"],
  ["Câu hỏi chính", "Hệ thống có còn đúng & còn chạy được khi dữ liệu rất lớn?", "Hệ thống chịu được bao nhiêu tải trước khi chậm/sập?"],
  ["Lỗi điển hình tìm được", "Tràn bộ nhớ, timeout truy vấn, phân trang sai, mất dữ liệu khi export", "Thời gian phản hồi tăng, nghẽn CPU/DB pool, rớt kết nối"],
  ["Người dùng thật", "Có thể chỉ 1 người dùng, nhưng DB đã đầy hàng triệu bản ghi", "Nhiều người dùng thao tác cùng lúc"],
  ["Công cụ hỗ trợ", "Script sinh dữ liệu (seed), truy vấn EXPLAIN, theo dõi bộ nhớ", "k6, JMeter, Locust mô phỏng đồng thời"],
], { accent: "#a21caf", note: "Hai loại bổ sung cho nhau: hệ viễn thông thực tế cần kiểm cả HAI — dữ liệu lớn VÀ nhiều người dùng cùng lúc." });

// ── Mockup 3: bảng ca kiểm thử dung lượng theo TỪNG MỨC dữ liệu ──
const m_tiers = grid("Ca kiểm thử dung lượng theo bậc thang số lượng thuê bao", ["Mức dữ liệu", "Ca kiểm thử tiêu biểu", "Ngưỡng chấp nhận"], [
  ["1.000 thuê bao (dev nhỏ)", "Tìm theo SĐT, phân trang danh sách cơ bản", "Phản hồi < 500 ms"],
  ["100.000 thuê bao", "Tìm kiếm + lọc theo gói cước, sắp xếp theo ngày kích hoạt", "Phản hồi < 1.5 s, không lỗi"],
  ["1.000.000 thuê bao", "Phân trang trang cuối (offset lớn), xuất báo cáo 1.000 dòng", "Phản hồi < 3 s, không timeout"],
  ["5.000.000 thuê bao", "Tìm full-text theo tên, xuất báo cáo 10.000 dòng", "< 8 s hoặc chuyển sang hàng đợi bất đồng bộ"],
  ["20.000.000 thuê bao (quy mô production)", "Đối soát cước cuối ngày, đồng bộ dữ liệu lô (batch)", "Job hoàn tất trong cửa sổ bảo trì, RAM không vượt ngưỡng cấu hình"],
], { accent: "#a21caf", note: "Không chỉ test ở 1 mức — phải test theo TỪNG BẬC để thấy hành vi suy giảm dần, không phải đột ngột sập." });

// ── Mockup 4: bảng thời gian phản hồi tăng theo số bản ghi (có/không tối ưu) ──
const m_qtime = grid("Thời gian phản hồi tìm kiếm theo số lượng bản ghi", ["Số bản ghi", "Không đánh index / OFFSET thô", "Có index + phân trang cursor"], [
  ["1.000", "80 ms", "40 ms"],
  ["100.000", "620 ms", "90 ms"],
  ["1.000.000", "4.100 ms", "140 ms"],
  ["5.000.000", "TIMEOUT (> 30 s)", "260 ms"],
], { accent: "#a21caf", highlight: 3, note: "OFFSET thô buộc DB phải quét/bỏ qua toàn bộ bản ghi phía trước — càng về cuối càng chậm; cursor pagination không có vấn đề này." });

// ── Mockup 5: ticket Jira lỗi tràn bộ nhớ khi xuất báo cáo toàn bộ thuê bao ──
const m_jira = jira({
  key: "SUBMS-5521", title: "Xuất báo cáo TOÀN BỘ 5,2 triệu thuê bao ra Excel làm service OutOfMemory và crash",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · SubMS API v3 · Postgres 14 · container giới hạn RAM 4 GB"],
    ["Các bước", "1) Vào màn Báo cáo thuê bao 2) Không chọn bộ lọc (mặc định = toàn bộ) 3) Bấm 'Xuất Excel' 4) Theo dõi log service"],
    ["Kết quả mong đợi", "Hệ thống giới hạn số dòng/lần xuất, hoặc chuyển sang job nền + gửi email khi xong"],
    ["Kết quả thực tế", "Service load hết 5,2 triệu dòng vào RAM cùng lúc, đạt 4 GB rồi bị kill (OOMKilled), toàn bộ pod restart"],
    ["Ảnh hưởng", "Gián đoạn dịch vụ cho MỌI thuê bao khác đang dùng cùng service trong lúc pod restart"],
    ["Bằng chứng", "grafana-oom-5521.png, service.log (dòng 'OOMKilled' lúc 14:32)"],
  ],
});

// ── Mockup 6: kanban theo dõi lỗi tìm được qua Volume Testing ──
const m_kanban = kanban("Bảng theo dõi lỗi Volume Testing (SubMS · Sprint 22)", [
  { name: "New", cards: [
    { key: "SUBMS-5521", title: "Xuất Excel 5,2tr dòng → OOM crash", sev: "Critical" },
    { key: "SUBMS-5518", title: "Tìm kiếm full-text > 30s ở 5tr bản ghi", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SUBMS-5502", title: "Phân trang trang cuối chậm 4s+ ở 1tr bản ghi", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SUBMS-5470", title: "Đối soát cước cuối ngày quá cửa sổ bảo trì", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SUBMS-5410", title: "Sắp xếp theo ngày kích hoạt sai thứ tự ở 100k+ dòng", sev: "Low" },
  ] },
]);

// ── Mockup 7: dashboard số liệu Volume Testing ──
const m_dash = dashboard("Kết quả Volume Testing · SubMS · đợt kiểm 5 triệu thuê bao", [
  { label: "Ca kiểm dung lượng", value: "42", sub: "5 bậc thang dữ liệu", color: "#a21caf" },
  { label: "Lỗi Critical/High", value: "5", sub: "OOM, timeout tìm kiếm", color: "#e11d48" },
  { label: "Thời gian tìm kiếm ở 5tr", value: "260 ms", sub: "sau khi tối ưu index", color: "#16a34a" },
  { label: "RAM đỉnh khi export", value: "3.9 GB", sub: "gần chạm giới hạn 4 GB", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử dung lượng (volume testing) là gì?",
  "What is volume testing?",
  "Kiểm thử dung lượng là việc chủ động đưa hệ thống vào các mức KHỐI LƯỢNG DỮ LIỆU rất lớn — như hàng triệu bản ghi thuê bao trong cơ sở dữ liệu — để xác nhận các chức năng (tìm kiếm, phân trang, sắp xếp, xuất báo cáo, đồng bộ) vẫn ĐÚNG và vẫn CHẠY ĐƯỢC, chứ không chỉ đúng khi dữ liệu ít. Nó khác kiểm thử tải (load testing) ở chỗ biến số thay đổi là dữ liệu, không phải số người dùng đồng thời.",
  "Volume testing deliberately pushes a system to very large DATA VOLUMES — such as millions of subscriber records in the database — to confirm that functions (search, pagination, sorting, report export, synchronization) still work CORRECTLY and still RUN, not just when data is small. It differs from load testing in that the variable being changed is data, not concurrent users.",
  "ボリュームテスト（volume testing）とは何？",
  "ボリュームテストとは、データベース内の数百万件の加入者レコードのような非常に大きなデータ量にシステムを意図的に投入し、検索・ページング・並び替え・レポート出力・同期などの機能がデータが少ない時だけでなく正しく動作し実行できるかを確認する手法です。変化させる変数がデータ量であり同時ユーザー数ではない点で負荷テスト（load testing）と異なります。");
const faq2 = FAQ(
  "Volume testing khác gì load testing và performance testing?",
  "How does volume testing differ from load testing and performance testing?",
  "Volume testing thay đổi lượng DỮ LIỆU trong hệ thống (ví dụ từ 1.000 lên 5 triệu thuê bao) rồi kiểm tra hành vi, có thể chỉ với 1 người dùng thao tác. Load testing và performance testing thay đổi số NGƯỜI DÙNG/REQUEST đồng thời trên một lượng dữ liệu thường cố định, để đo thời gian phản hồi và điểm nghẽn. Một hệ viễn thông thực tế cần cả hai: dữ liệu khổng lồ (hàng chục triệu thuê bao) VÀ nhiều nhân viên/API cùng truy cập — nên hai loại kiểm thử này bổ sung, không thay thế nhau.",
  "Volume testing changes the amount of DATA in the system (e.g. from 1,000 to 5 million subscribers) and checks behavior, possibly with just one user. Load and performance testing change the number of concurrent USERS/REQUESTS on a usually fixed amount of data, to measure response time and bottlenecks. A real telecom system needs both: huge data (tens of millions of subscribers) AND many staff/APIs accessing it at once — so these test types complement, not replace, each other.",
  "ボリュームテストは負荷テストやパフォーマンステストとどう違う？",
  "ボリュームテストはシステム内のデータ量（例：1,000件から500万件の加入者へ）を変化させ挙動を確認します。ユーザーは1人だけでも構いません。負荷テストとパフォーマンステストは、通常固定量のデータに対する同時ユーザー/リクエスト数を変化させ、応答時間やボトルネックを測定します。実際の通信システムでは膨大なデータ（数千万件の加入者）と多くのスタッフ/APIの同時アクセスの両方が必要なため、これらのテスト種別は互いを置き換えず補完し合います。");
const faq3 = FAQ(
  "Chuẩn bị dữ liệu khối lượng lớn để kiểm thử dung lượng bằng cách nào?",
  "How do you prepare large-volume data for volume testing?",
  "Không nhập tay từng bản ghi — hãy dùng script sinh dữ liệu (seed/generator) chạy theo lô để tạo hàng triệu bản ghi giả lập nhưng có PHÂN BỐ giống dữ liệu thật (số điện thoại đa dạng, tên trùng lặp có chủ đích, nhiều gói cước, nhiều trạng thái thuê bao). Sinh dữ liệu theo TỪNG BẬC (1 nghìn → 100 nghìn → 1 triệu → 5 triệu) để đo hành vi suy giảm dần. Nếu dùng lại dữ liệu production, PHẢI ẩn danh/che dữ liệu nhạy cảm (số điện thoại, CMND/CCCD) trước khi đưa vào môi trường test.",
  "Don't enter records by hand — use a batch seed/generator script to create millions of simulated records with a DISTRIBUTION similar to real data (varied phone numbers, deliberately duplicated names, many plan types, many subscriber statuses). Generate data in TIERS (1 thousand → 100 thousand → 1 million → 5 million) to measure gradual degradation. If reusing production data, you MUST anonymize/mask sensitive fields (phone numbers, national ID) before loading it into the test environment.",
  "ボリュームテスト用の大量データはどう準備する？",
  "レコードを手入力せず、バッチのシード/ジェネレータースクリプトを使い、実データに似た分布（多様な電話番号、意図的に重複させた氏名、多数のプラン種別、多様な加入者ステータス）を持つ数百万件のシミュレーションレコードを作成します。段階的（1千→10万→100万→500万）にデータを生成し、徐々に劣化する挙動を測定します。本番データを再利用する場合は、機密項目（電話番号、身分証番号）を匿名化・マスキングしてからテスト環境に投入する必要があります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử dung lượng (Volume Testing) tập trung kiểm tra điều gì?", en: "What does Volume Testing focus on checking?", ja: "ボリュームテストは何を確認することに重点を置く？" },
    options: [
      { vi: "Hành vi hệ thống khi khối lượng dữ liệu rất lớn (hàng triệu bản ghi)", en: "System behavior when the data volume is very large (millions of records)", ja: "データ量が非常に大きい（数百万件）時のシステムの挙動" },
      { vi: "Tốc độ phản hồi khi có nhiều người dùng truy cập đồng thời", en: "Response speed when many users access concurrently", ja: "多くのユーザーが同時にアクセスした時の応答速度" },
      { vi: "Giao diện có đúng thiết kế UI/UX không", en: "Whether the UI matches the UI/UX design", ja: "UIがデザインどおりかどうか" },
      { vi: "Mật khẩu đăng nhập có đủ mạnh không", en: "Whether the login password is strong enough", ja: "ログインパスワードが十分強力かどうか" },
    ], correct: 0,
    explain: { vi: "Volume testing thay đổi biến số DỮ LIỆU (số bản ghi) để xem hệ thống còn đúng và còn chạy được không.", en: "Volume testing changes the DATA variable (record count) to see if the system stays correct and still runs.", ja: "ボリュームテストはデータ量（レコード数）という変数を変え、システムが正しく動き続けるか確認します。" },
  }),
  mcq({
    q: { vi: "Điểm khác biệt chính giữa Volume Testing và Load Testing là gì?", en: "What is the main difference between Volume Testing and Load Testing?", ja: "ボリュームテストと負荷テストの主な違いは何？" },
    options: [
      { vi: "Volume Testing thay đổi SỐ LƯỢNG DỮ LIỆU, Load Testing thay đổi SỐ NGƯỜI DÙNG đồng thời", en: "Volume Testing changes DATA VOLUME, Load Testing changes concurrent USERS", ja: "ボリュームテストはデータ量を変え、負荷テストは同時ユーザー数を変える" },
      { vi: "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi", en: "They are exactly the same, just different names", ja: "両者は全く同じで名前が違うだけ" },
      { vi: "Volume Testing chỉ kiểm tra giao diện đẹp hay xấu", en: "Volume Testing only checks whether the UI looks good", ja: "ボリュームテストはUIの見た目だけを確認する" },
      { vi: "Load Testing chỉ chạy đúng một lần duy nhất", en: "Load Testing only ever runs exactly once", ja: "負荷テストは1回しか実行しない" },
    ], correct: 0,
    explain: { vi: "Đây là điểm phân biệt cốt lõi: một bên biến thiên dữ liệu, một bên biến thiên số người dùng/request đồng thời.", en: "This is the core distinction: one varies data, the other varies concurrent users/requests.", ja: "これが核心的な違いです：一方はデータ量を、もう一方は同時ユーザー/リクエスト数を変化させます。" },
  }),
  mcq({
    q: { vi: "Vì sao truy vấn với OFFSET lớn (ví dụ trang thứ 90.000) trên 5 triệu bản ghi thường chậm hơn hẳn OFFSET nhỏ?", en: "Why is a query with a large OFFSET (e.g. page 90,000) on 5 million records usually much slower than a small OFFSET?", ja: "500万件のレコードでOFFSETが大きい（例：9万ページ目）クエリがOFFSETが小さい場合よりずっと遅いのはなぜ？" },
    options: [
      { vi: "Vì trình duyệt bị lỗi font chữ", en: "Because the browser has a font rendering bug", ja: "ブラウザのフォント表示バグのため" },
      { vi: "Vì cơ sở dữ liệu thường phải quét/bỏ qua toàn bộ bản ghi phía trước offset đó trước khi lấy dữ liệu", en: "Because the database typically has to scan/skip all the records before that offset before fetching data", ja: "データベースは通常、そのオフセット以前の全レコードをスキャン/スキップしてからデータを取得する必要があるため" },
      { vi: "Vì server luôn giới hạn 10 request/giây", en: "Because the server always limits 10 requests per second", ja: "サーバーが常に毎秒10リクエストに制限しているため" },
      { vi: "Vì màn hình có quá nhiều màu sắc", en: "Because the screen has too many colors", ja: "画面の色数が多すぎるため" },
    ], correct: 1,
    explain: { vi: "OFFSET thô yêu cầu DB duyệt qua N bản ghi đầu rồi bỏ đi — càng về cuối càng chậm; cursor/keyset pagination tránh được vấn đề này.", en: "A raw OFFSET makes the DB walk through the first N rows and discard them — the further in, the slower; cursor/keyset pagination avoids this.", ja: "生のOFFSETはDBに最初のN行を走査して破棄させます — 後ろのページほど遅くなります。カーソル/キーセットページングはこの問題を回避します。" },
  }),
  mcq({
    q: { vi: "Xuất báo cáo TOÀN BỘ 5 triệu thuê bao ra Excel trong MỘT LẦN dễ gây ra lỗi nghiêm trọng nào nhất?", en: "Exporting ALL 5 million subscribers to Excel in ONE go is most likely to cause which serious bug?", ja: "500万人の加入者全員を一度にExcelへ出力すると最も起きやすい重大な不具合は？" },
    options: [
      { vi: "Font chữ trong file Excel bị sai", en: "The font in the Excel file is wrong", ja: "Excelファイルのフォントが間違っている" },
      { vi: "Tràn bộ nhớ (OutOfMemory) khiến service bị crash/khởi động lại", en: "Out-of-memory (OOM), causing the service to crash/restart", ja: "メモリ不足（OOM）によりサービスがクラッシュ/再起動する" },
      { vi: "Màu nền của bảng tính bị lệch", en: "The spreadsheet's background color is off", ja: "スプレッドシートの背景色がずれる" },
      { vi: "Tên cột bị viết hoa toàn bộ", en: "Column names get fully capitalized", ja: "列名がすべて大文字になる" },
    ], correct: 1,
    explain: { vi: "Nạp toàn bộ hàng triệu dòng vào RAM cùng lúc thường vượt giới hạn bộ nhớ container/service, dẫn tới OOM và crash — cần giới hạn số dòng hoặc chạy job nền.", en: "Loading millions of rows into RAM at once usually exceeds the container/service's memory limit, causing OOM and a crash — needs row limits or a background job.", ja: "数百万行を一度にRAMへ読み込むとコンテナ/サービスのメモリ上限を超えがちでOOMとクラッシュを招きます — 行数制限かバックグラウンドジョブが必要です。" },
  }),
  mcq({
    q: { vi: "Khi chuẩn bị dữ liệu khối lượng lớn để kiểm thử dung lượng, cách nào hợp lý nhất?", en: "When preparing large-volume data for volume testing, which approach is most sensible?", ja: "ボリュームテスト用の大量データを準備する際、最も妥当な方法はどれ？" },
    options: [
      { vi: "Nhập tay từng bản ghi cho đến khi đủ 5 triệu dòng", en: "Manually enter each record until reaching 5 million rows", ja: "500万行になるまで1件ずつ手入力する" },
      { vi: "Chỉ test với 10 bản ghi mẫu vì đại diện đủ cho mọi trường hợp", en: "Only test with 10 sample records because they represent every case", ja: "サンプル10件だけでテストする、それで全ケースを代表できるから" },
      { vi: "Copy nguyên dữ liệu production (kèm SĐT, CMND thật) sang môi trường test mà không che giấu", en: "Copy raw production data (including real phone numbers, IDs) into the test environment without masking", ja: "本番データ（実際の電話番号・身分証番号含む）をマスキングせずそのままテスト環境へコピーする" },
      { vi: "Sinh dữ liệu tự động theo từng bậc thang (1 nghìn → 100 nghìn → 1 triệu → 5 triệu), phân bố giống dữ liệu thật, ẩn danh nếu lấy từ production", en: "Auto-generate data in tiers (1k → 100k → 1M → 5M) with a realistic distribution, anonymized if sourced from production", ja: "段階的（1千→10万→100万→500万）に自動生成し、実データに近い分布とし、本番由来なら匿名化する" },
    ], correct: 3,
    explain: { vi: "Sinh dữ liệu tự động theo bậc thang vừa đủ lớn vừa kiểm soát được, và ẩn danh dữ liệu nhạy cảm để tuân thủ bảo mật — đây là cách chuẩn để kiểm thử dung lượng.", en: "Auto-generating tiered data is large enough yet controllable, and anonymizing sensitive fields keeps it compliant — this is the standard way to prepare for volume testing.", ja: "段階的な自動生成は十分な規模かつ制御可能で、機密項目の匿名化でコンプライアンスも保てます — これがボリュームテスト準備の標準的な方法です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử dung lượng (volume testing) là việc chủ động đưa hệ thống vào các mức dữ liệu rất lớn — hàng triệu bản ghi thuê bao — để xác nhận tìm kiếm, phân trang, sắp xếp, xuất báo cáo và đồng bộ vẫn đúng và vẫn chạy được, khác với kiểm thử tải (load testing) vốn thay đổi số người dùng đồng thời. Bài này bám hệ quản lý thuê bao viễn thông SubMS với 5,2 triệu bản ghi: bạn học cách thiết kế ca theo bậc thang dữ liệu, hai tình huống thật (tìm kiếm treo ở 5 triệu bản ghi, xuất Excel gây tràn bộ nhớ), và cách chuẩn bị dữ liệu khối lượng lớn. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Volume testing deliberately pushes a system to very large data volumes — millions of subscriber records — to confirm search, pagination, sorting, report export and synchronization still work correctly and still run, unlike load testing, which varies concurrent users. This follows SubMS, a telecom subscriber management system with 5.2 million records: you learn to design cases by data tier, two real situations (search hanging at 5 million records, an Excel export causing an out-of-memory crash), and how to prepare large-volume data. Lots of visuals and a quiz at the end.",
        "ボリュームテストとは、数百万件の加入者レコードという非常に大きなデータ量にシステムをあえて投入し、検索・ページング・並び替え・レポート出力・同期が正しく動作し実行できるかを確認する手法で、同時ユーザー数を変化させる負荷テストとは異なります。本記事は520万件のレコードを持つ通信事業者向け加入者管理システムSubMSに沿い、データ段階別のケース設計、2つの実例（500万件での検索停止、Excel出力によるメモリ不足クラッシュ）、大量データの準備方法を学びます。図が豊富で最後にクイズ付き。"),
      P("Bạn đã quen với việc test chức năng đúng/sai trên vài chục bản ghi mẫu. Nhưng một hệ quản lý thuê bao viễn thông thật sự — như của một nhà mạng phục vụ hàng chục triệu khách hàng — không bao giờ chỉ có vài chục bản ghi. Câu hỏi mà kiểm thử dung lượng trả lời rất khác: 'Chức năng này ĐÚNG khi ít dữ liệu, nhưng nó có còn ĐÚNG và còn CHẠY ĐƯỢC khi cơ sở dữ liệu có 5 triệu, 20 triệu bản ghi thuê bao hay không?'. Đây là kỹ năng nâng cao, đòi hỏi bạn tư duy như một tester ở dự án doanh nghiệp thật, không chỉ dừng ở test case đơn lẻ.",
        "You're used to testing pass/fail behavior on a few dozen sample records. But a real telecom subscriber management system — like one serving tens of millions of customers — never has just a few dozen records. Volume testing answers a very different question: 'This feature is CORRECT with little data, but is it still CORRECT and still RUNS when the database has 5 million, 20 million subscriber records?' This is an advanced skill requiring you to think like a tester on a real enterprise project, not just at the level of a single test case.",
        "少数のサンプルレコードで機能の正誤をテストすることには慣れているでしょう。しかし数千万人の顧客を抱える通信事業者のような実際の加入者管理システムには、数十件のレコードしかないということは決してありません。ボリュームテストが答える問いは全く異なります：『この機能はデータが少ない時は正しいが、データベースに500万件、2000万件の加入者レコードがある時も正しく動き続けるか？』。これは実際のエンタープライズ案件のテスターのように考える上級スキルであり、単一のテストケースにとどまりません。"),
      IMG(m_slow, "Màn hình test: danh sách thuê bao SubMS bị treo/timeout khi dữ liệu đạt 5,2 triệu bản ghi", "Screen under test: SubMS's subscriber list hangs/times out at 5.2 million records", "テスト対象画面：520万件のデータでSubMSの加入者リストが停止/タイムアウトする"),
      DEF("Volume Testing", "kiểm thử hành vi hệ thống khi khối lượng DỮ LIỆU trong cơ sở dữ liệu rất lớn (hàng triệu/chục triệu bản ghi), không phải khi có nhiều người dùng đồng thời.",
        "testing system behavior when the DATA volume in the database is very large (millions/tens of millions of records), not when there are many concurrent users.",
        "データベース内のデータ量が非常に大きい（数百万/数千万件）時のシステムの挙動をテストする手法。同時ユーザー数が多い場合ではない。"),
    ] },
  { heading: { vi: "2. Kiểm thử dung lượng là gì & khác Load/Performance Testing thế nào", en: "2. What volume testing is & how it differs from Load/Performance Testing", ja: "2. ボリュームテストとは、負荷/パフォーマンステストとの違い" },
    blocks: [
      P("Nhiều bạn nhầm lẫn volume testing với load testing hay performance testing vì cả ba đều 'liên quan đến hiệu năng'. Cách phân biệt rõ nhất: hãy tự hỏi 'BIẾN SỐ nào đang thay đổi trong bài test'. Nếu bạn giữ nguyên 1 người dùng nhưng tăng dần số bản ghi trong DB từ 1.000 lên 5 triệu để xem tìm kiếm/phân trang có còn đúng và còn nhanh không — đó là volume testing. Nếu bạn giữ nguyên dữ liệu nhưng tăng dần số người dùng/request bắn đồng thời để đo độ trễ và điểm nghẽn — đó là load testing/performance testing.",
        "Many people confuse volume testing with load testing or performance testing because all three 'relate to performance'. The clearest way to tell them apart: ask 'what VARIABLE is changing in this test'. If you keep 1 user but gradually increase the DB's record count from 1,000 to 5 million to see if search/pagination stays correct and fast — that's volume testing. If you keep the data fixed but gradually increase concurrent users/requests fired at once to measure latency and bottlenecks — that's load/performance testing.",
        "多くの人はボリュームテストを負荷テストやパフォーマンステストと混同します。三つとも『パフォーマンスに関連する』からです。最も明確な区別方法は『このテストで何の変数が変化しているか』を自問することです。ユーザーは1人のままDBのレコード数を1,000件から500万件へ徐々に増やし、検索/ページングが正しく速いままかを見るなら — それはボリュームテストです。データは固定のまま同時ユーザー/リクエスト数を徐々に増やし、遅延やボトルネックを測るなら — それは負荷/パフォーマンステストです。"),
      IMG(m_compare, "Bảng so sánh Volume Testing với Load/Performance Testing", "Comparison table: Volume Testing vs Load/Performance Testing", "ボリュームテストと負荷/パフォーマンステストの比較表"),
      P("Ở hệ quản lý thuê bao viễn thông, cả hai loại kiểm thử đều bắt buộc vì thực tế sản xuất có cả hai áp lực cùng lúc: cơ sở dữ liệu chứa hàng chục triệu thuê bao (áp lực dung lượng), trong khi hàng trăm nhân viên tổng đài và hàng chục hệ thống đối tác gọi API cùng lúc (áp lực tải). Một hệ thống vượt qua load testing với 1.000 bản ghi mẫu KHÔNG có nghĩa là nó sẽ chạy đúng khi dữ liệu thật đạt 20 triệu bản ghi — đó chính là lỗ hổng mà rất nhiều đội kiểm thử bỏ sót.",
        "In a telecom subscriber management system, both test types are required because production faces both pressures at once: the database holds tens of millions of subscribers (volume pressure), while hundreds of call-center staff and dozens of partner systems call the API concurrently (load pressure). A system that passes load testing with 1,000 sample records does NOT mean it will run correctly once real data reaches 20 million records — that's exactly the gap many test teams miss.",
        "通信事業者の加入者管理システムでは、本番環境が同時に両方の圧力に直面するため両方のテストが必須です：データベースには数千万人の加入者（ボリューム圧力）が格納され、数百人のコールセンター担当者と数十の連携先システムが同時にAPIを呼び出します（負荷圧力）。サンプル1,000件で負荷テストに合格したシステムが、実データが2,000万件に達しても正しく動くとは限りません — これこそ多くのテストチームが見落とすギャップです。"),
      DEF("Load Testing / Performance Testing", "kiểm thử thời gian phản hồi và điểm nghẽn khi tăng dần SỐ NGƯỜI DÙNG/REQUEST đồng thời, thường trên một lượng dữ liệu cố định.",
        "testing response time and bottlenecks as concurrent USERS/REQUESTS increase, usually on a fixed amount of data.",
        "同時ユーザー/リクエスト数を増やしていく際の応答時間とボトルネックをテストする手法。通常は固定量のデータに対して行う。"),
    ] },
  { heading: { vi: "3. Vì sao hệ viễn thông nhiều triệu thuê bao đặc biệt cần Volume Testing", en: "3. Why a multi-million-subscriber telecom system especially needs Volume Testing", ja: "3. 数百万人規模の通信システムがボリュームテストを特に必要とする理由" },
    blocks: [
      P("Một nhà mạng viễn thông cỡ vừa đã có thể phục vụ 5–20 triệu thuê bao đang hoạt động, cộng thêm hàng chục triệu bản ghi lịch sử cước, tin nhắn, cuộc gọi mỗi tháng. Dữ liệu không đứng yên — nó tăng liên tục mỗi ngày. Một tính năng chạy mượt lúc mới go-live với 500.000 thuê bao hoàn toàn có thể bắt đầu ì ạch sau 2 năm khi dữ liệu tăng gấp 10 lần, mà không có bất kỳ thay đổi nào về code. Đây là lý do volume testing không phải việc làm một lần, mà cần lặp lại định kỳ theo tốc độ tăng trưởng dữ liệu thật.",
        "A mid-sized telecom carrier may already serve 5–20 million active subscribers, plus tens of millions of billing, SMS and call-log records added each month. Data never stands still — it keeps growing every day. A feature that ran smoothly at go-live with 500,000 subscribers can start to lag two years later once data has grown tenfold, with zero code changes. This is why volume testing isn't a one-time task — it needs to repeat periodically, tracking real data growth.",
        "中規模の通信事業者でもすでに500万〜2000万人のアクティブ加入者を抱え、毎月数千万件の課金・SMS・通話ログレコードが追加されます。データは止まらず日々増え続けます。稼働開始時に50万加入者でスムーズに動いていた機能が、コード変更が一切なくても2年後にデータが10倍に増えると遅くなり始めることがあります。だからこそボリュームテストは一度きりでなく、実際のデータ成長に合わせて定期的に繰り返す必要があります。"),
      P("Ngoài ra, hệ thống thuê bao còn có những đặc thù làm rủi ro dung lượng nghiêm trọng hơn nhiều ngành khác: (1) tra cứu/tìm kiếm thuê bao là thao tác diễn ra hàng nghìn lần mỗi phút tại tổng đài — chỉ cần chậm thêm vài giây cũng nhân lên thành thiệt hại lớn về năng suất; (2) đối soát cước cuối ngày/cuối tháng phải xử lý TOÀN BỘ thuê bao trong một cửa sổ thời gian giới hạn, nếu chậm sẽ trễ chu kỳ tính cước gây khiếu nại hàng loạt; (3) báo cáo quản trị thường bị yêu cầu xuất 'toàn bộ' dữ liệu, dễ dẫn tới tràn bộ nhớ nếu không có giới hạn.",
        "Beyond that, a subscriber system has traits that make volume risk far more severe than many other industries: (1) subscriber lookup happens thousands of times per minute at the call center — even a few extra seconds of delay multiplies into major productivity loss; (2) end-of-day/end-of-month billing reconciliation must process ALL subscribers within a limited time window, and any slowdown delays the billing cycle and triggers mass complaints; (3) management reports are often requested to export 'all' data, easily causing out-of-memory crashes without limits.",
        "さらに、加入者システムには他の多くの業界よりボリュームリスクを深刻にする特性があります：（1）加入者検索はコールセンターで毎分数千回行われる操作であり、数秒の遅延増加でも生産性の大きな損失に増幅されます。（2）月末/日次の課金対照は限られた時間枠内で全加入者を処理する必要があり、遅延は課金サイクルを遅らせ大量のクレームを招きます。（3）管理レポートはしばしば『全件』出力を求められ、制限がなければメモリ不足クラッシュを招きやすいです。"),
      P("Vì thế, một tester ở dự án viễn thông cần chủ động đưa volume testing vào kế hoạch kiểm thử từ sớm — không đợi tới khi khách hàng than phiền 'sao dạo này chậm thế' mới bắt đầu điều tra. Việc phát hiện điểm suy giảm hiệu năng theo khối lượng dữ liệu TRƯỚC khi go-live, hoặc trước mỗi đợt tăng trưởng lớn về thuê bao, giúp đội ngũ chủ động tối ưu thay vì chữa cháy trong sản xuất.",
        "So a tester on a telecom project needs to proactively build volume testing into the test plan early — not wait until customers complain 'why is it so slow lately' to start investigating. Finding the point where performance degrades with data volume BEFORE go-live, or before every major subscriber growth wave, lets the team optimize proactively instead of firefighting in production.",
        "したがって通信事業者案件のテスターは、テスト計画に早期からボリュームテストを積極的に組み込む必要があります。『最近なぜ遅いのか』という顧客の苦情を待ってから調査を始めるのではありません。リリース前、あるいは加入者数の大きな成長の波の前に、データ量に応じた性能劣化ポイントを発見することで、チームは本番での火消しではなく積極的な最適化ができます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: sinh dữ liệu khối lượng lớn (test data)", en: "4. Prepare: generating large-volume test data", ja: "4. 準備：大量テストデータの生成" },
    blocks: [
      P("Nguyên liệu quan trọng nhất của volume testing là chính bộ DỮ LIỆU khối lượng lớn — và đây cũng là phần dễ bị làm sai nhất nếu bạn chưa có kinh nghiệm. Bạn không thể nhập tay hàng triệu bản ghi, cũng không nên copy nguyên si dữ liệu production chứa thông tin nhạy cảm.",
        "The most important raw material for volume testing is the large-volume DATA set itself — and it's also the part most easily done wrong if you're inexperienced. You can't manually enter millions of records, and you shouldn't copy raw production data containing sensitive information either.",
        "ボリュームテストで最も重要な材料は大量のデータそのものです — また経験が浅いと最も間違えやすい部分でもあります。数百万件のレコードを手入力することはできず、機密情報を含む本番データをそのままコピーすべきでもありません。"),
      STEP(1, "Xác định các bậc thang dữ liệu cần kiểm (ví dụ 1.000 / 100.000 / 1 triệu / 5 triệu / 20 triệu thuê bao) dựa theo dữ liệu thật hiện tại và tốc độ tăng trưởng dự kiến.", "Decide the data tiers to test (e.g. 1,000 / 100,000 / 1 million / 5 million / 20 million subscribers) based on current real data and expected growth rate.", "テストするデータ段階（例：1,000／10万／100万／500万／2000万加入者）を、現在の実データと予想成長率に基づいて決定する。"),
      STEP(2, "Viết script sinh dữ liệu (seed/generator) chạy theo lô (batch insert), mô phỏng phân bố giống thật: số điện thoại đa dạng đầu số, tên trùng lặp có chủ đích (để test tìm kiếm trùng tên), nhiều gói cước và trạng thái thuê bao khác nhau.", "Write a batch-insert seed/generator script simulating a realistic distribution: varied phone-number prefixes, deliberately duplicated names (to test duplicate-name search), many different plans and subscriber statuses.", "現実的な分布をシミュレートするバッチ挿入のシード/ジェネレータースクリプトを書く：多様な電話番号プレフィックス、意図的に重複させた氏名（重複名検索のテスト用）、多数の異なるプランと加入者ステータス。"),
      STEP(3, "Nếu bắt buộc dùng dữ liệu gần với production, ẩn danh/che các trường nhạy cảm (số điện thoại, CMND/CCCD, địa chỉ) trước khi nạp vào môi trường test.", "If production-like data is required, anonymize/mask sensitive fields (phone number, national ID, address) before loading into the test environment.", "本番に近いデータが必要な場合は、テスト環境に投入する前に機密項目（電話番号、身分証番号、住所）を匿名化/マスキングする。"),
      TRY("Ước tính: nếu nhà mạng bạn đang test có 8 triệu thuê bao hiện tại và tăng 15%/năm, hãy tự tính mức dữ liệu cần chuẩn bị để mô phỏng đúng 3 năm tới.", "Estimate: if the carrier you're testing has 8 million subscribers today and grows 15%/year, calculate the data volume you'd need to simulate 3 years from now.", "見積もってみよう：テスト対象の事業者が現在800万加入者で年15%成長するなら、3年後をシミュレートするために必要なデータ量を計算しよう。"),
      PITFALL("Chỉ sinh dữ liệu 'đủ số dòng' mà không quan tâm PHÂN BỐ — ví dụ toàn bộ 5 triệu thuê bao có cùng 1 gói cước, cùng 1 trạng thái. Khi đó ca tìm kiếm/lọc theo điều kiện thật sẽ không phản ánh đúng tải thực tế (index/DB có thể 'ăn gian' vì dữ liệu quá đồng nhất).", "Only generating 'enough rows' without caring about DISTRIBUTION — e.g. all 5 million subscribers on the same plan and status. Then real filter/search cases won't reflect actual load (the index/DB can 'cheat' because the data is too uniform).", "分布を気にせず『十分な行数』だけを生成する — 例えば500万加入者全員が同じプラン・同じステータス。すると実際のフィルタ/検索ケースが実際の負荷を反映しません（データが均一すぎるとインデックス/DBが『ズル』できてしまいます）。"),
      IMG(m_tiers, "Ca kiểm thử dung lượng theo từng bậc thang số lượng thuê bao (1 nghìn → 20 triệu)", "Volume test cases by subscriber-count tier (1 thousand → 20 million)", "加入者数の段階別（1千→2000万）のボリュームテストケース"),
    ] },
  { heading: { vi: "5. Thiết kế ca kiểm thử theo bậc thang dữ liệu (thực hành)", en: "5. Designing test cases by data tier (hands-on)", ja: "5. データ段階別のテストケース設計（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào chức năng 'tìm kiếm thuê bao theo tên' của SubMS — một trong những thao tác được dùng nhiều nhất tại tổng đài. Làm theo thứ tự dưới đây để có bộ ca kiểm thử dung lượng có hệ thống, không chỉ đoán mò một mức dữ liệu duy nhất.",
        "Now let's apply this for real to SubMS's 'search subscriber by name' feature — one of the most-used operations at the call center. Follow the order below to get a systematic set of volume test cases, not just a guess at a single data level.",
        "では、コールセンターで最も使われる操作の1つであるSubMSの『氏名で加入者を検索』機能に実際に適用しましょう。以下の順に沿って、単一のデータ水準を勘で選ぶのではなく、体系的なボリュームテストケース一式を作りましょう。"),
      STEP(1, "Ghi lại baseline ở mức dữ liệu nhỏ nhất (1.000 bản ghi): đo thời gian phản hồi, ghi lại kết quả trả về đúng số lượng mong đợi.", "Record a baseline at the smallest data tier (1,000 records): measure response time, confirm the returned result count is as expected.", "最小のデータ段階（1,000件）でベースラインを記録：応答時間を測定し、返却された結果件数が期待どおりか確認する。"),
      STEP(2, "Tăng dần dữ liệu theo bậc thang (100 nghìn → 1 triệu → 5 triệu), lặp lại CÙNG một ca tìm kiếm, so sánh thời gian phản hồi với baseline.", "Gradually increase data by tier (100k → 1M → 5M), repeat the SAME search case, compare response time against the baseline.", "段階的にデータを増やし（10万→100万→500万）、同じ検索ケースを繰り返し、応答時間をベースラインと比較する。"),
      STEP(3, "Ở mỗi mức, kiểm cả TÍNH ĐÚNG (kết quả trả về có thiếu/thừa/trùng không) lẫn TÍNH KỊP THỜI (có timeout không), vì dữ liệu lớn có thể gây sai kết quả chứ không chỉ chậm.", "At each tier, check both CORRECTNESS (results missing/extra/duplicated) and TIMELINESS (any timeout), since large data can cause wrong results, not just slowness.", "各段階で正確性（結果の欠落/過剰/重複）と即時性（タイムアウトの有無）の両方を確認する。大量データは遅さだけでなく誤った結果も引き起こし得るため。"),
      STEP(4, "Ghi lại điểm 'gãy' — mức dữ liệu mà tại đó thời gian phản hồi tăng đột biến hoặc bắt đầu timeout — đây là con số quan trọng nhất để báo cho đội kỹ thuật tối ưu trước khi dữ liệu thật chạm ngưỡng đó.", "Record the 'breaking point' — the data tier where response time spikes or timeouts begin — this is the most important number to report to engineering so they optimize before real data reaches that threshold.", "『破綻点』——応答時間が急増またはタイムアウトが始まるデータ段階——を記録する。これは実データがその閾値に達する前にエンジニアリングチームが最適化できるよう報告すべき最重要の数値です。"),
      CODE("text", "CA KIEM THU DUNG LUONG - Tim kiem thue bao theo ten 'Nguyen Van A'\nMuc 1.000     : 80ms   | Ket qua: 3 ban ghi   | Dung\nMuc 100.000   : 620ms  | Ket qua: 41 ban ghi  | Dung\nMuc 1.000.000 : 4.100ms| Ket qua: 380 ban ghi | Dung nhung CHAM\nMuc 5.000.000 : TIMEOUT (>30s) | Khong tra ket qua | LOI - diem gay tai day"),
      TRY("Thiết kế thêm 1 ca kiểm thử dung lượng cho chức năng 'sắp xếp danh sách thuê bao theo ngày kích hoạt' theo đúng 4 bậc thang ở trên.", "Design one more volume test case for 'sort subscriber list by activation date' following the same 4 tiers above.", "上記と同じ4段階に沿って『加入者リストを有効化日で並び替え』機能のボリュームテストケースをもう1つ設計しよう。"),
      IMG(m_qtime, "Thời gian phản hồi tìm kiếm tăng theo số bản ghi — so sánh có/không tối ưu index và phân trang", "Search response time growing with record count — with/without index and pagination optimization", "レコード数に応じて増加する検索応答時間 — インデックスとページング最適化の有無を比較"),
    ] },
  { heading: { vi: "6. Tình huống 1: tìm kiếm nhanh ở 1.000 bản ghi nhưng treo ở 5 triệu", en: "6. Situation 1: search is fast at 1,000 records but hangs at 5 million", ja: "6. シーン1：1,000件では速いが500万件で停止する検索" },
    blocks: [
      SITUATION("Đội phát triển test tính năng tìm kiếm thuê bao chỉ trên môi trường dev với khoảng 1.000 bản ghi mẫu — mọi lần tìm đều trả kết quả dưới 100ms, ai cũng yên tâm nghiệm thu.", "The dev team tests the subscriber search feature only in the dev environment with about 1,000 sample records — every search returns under 100 ms, everyone signs off confidently.",
        "Khi triển khai lên staging với dữ liệu sao chép gần giống production (5,2 triệu bản ghi), nhân viên tổng đài bấm tìm kiếm theo tên khách hàng và màn hình TREO hơn 28 giây rồi báo lỗi timeout — trong khi đang có khách hàng chờ trên điện thoại.",
        "When deployed to staging with data resembling production (5.2 million records), a call-center agent searches by customer name and the screen HANGS for over 28 seconds before a timeout error — while a customer waits on the phone.",
        "開発チームは加入者検索機能を約1,000件のサンプルデータを持つdev環境でのみテスト——毎回の検索が100ms未満で返り、皆安心して検収する。",
        "本番に近いデータ（520万件）を持つステージング環境にデプロイすると、コールセンター担当者が顧客名で検索した際に画面が28秒以上停止し、その後タイムアウトエラーが表示される——その間、顧客は電話口で待たされている。"),
      SOLVE("Bổ sung ngay volume testing vào quy trình nghiệm thu — không chấp nhận 'pass' chỉ với dữ liệu dev nhỏ; yêu cầu chạy lại ca tìm kiếm này trên tập dữ liệu mô phỏng gần với production TRƯỚC khi cho phép release.", "Immediately add volume testing to the acceptance process — don't accept a 'pass' based only on small dev data; require this search case to be re-run on a production-like simulated dataset BEFORE allowing release.", "受け入れプロセスに直ちにボリュームテストを追加する——小規模なdevデータだけでの『合格』を認めない。リリース許可前に、本番に近いシミュレーションデータセットでこの検索ケースを再実行することを求める。"),
      P("Đây là bài học lớn nhất trong chương này: 'test pass trên dữ liệu ít' không có nghĩa là tính năng sẵn sàng cho production. Ở dự án viễn thông, khoảng cách giữa dữ liệu dev (vài nghìn bản ghi) và dữ liệu thật (hàng triệu bản ghi) là rất lớn — và chính khoảng cách đó là nơi ẩn giấu những lỗi nghiêm trọng nhất mà kiểm thử chức năng thông thường không bao giờ thấy được. Danh sách bậc thang dữ liệu ở chương 4–5 chính là công cụ giúp bạn thu hẹp khoảng cách đó trước khi khách hàng thật gặp phải.",
        "This is the biggest lesson in this chapter: 'test passed on little data' doesn't mean a feature is production-ready. On a telecom project, the gap between dev data (a few thousand records) and real data (millions of records) is huge — and that exact gap is where the most serious bugs hide, bugs ordinary functional testing never reveals. The data-tier checklist from chapters 4–5 is the tool that closes that gap before real customers hit it.",
        "この章での最大の教訓です：『少量データでテスト合格』は機能が本番対応済みであることを意味しません。通信事業者案件では、devデータ（数千件）と実データ（数百万件）の差は非常に大きく——まさにそのギャップに、通常の機能テストでは決して見つからない最も重大なバグが潜んでいます。第4〜5章のデータ段階チェックリストは、実際の顧客が遭遇する前にそのギャップを埋めるツールです。"),
      RECAP(["Test pass ở dữ liệu nhỏ KHÔNG đồng nghĩa an toàn ở dữ liệu triệu bản ghi", "Bắt buộc chạy lại ca quan trọng trên dữ liệu mô phỏng gần production trước release"],
        ["Passing on small data does NOT mean safe at millions of records", "Mandatory rerun of important cases on production-like data before release"],
        ["少量データでの合格は数百万件データでの安全を意味しない", "リリース前に重要ケースを本番に近いデータで再実行することを必須にする"]),
    ] },
  { heading: { vi: "7. Tình huống 2: xuất Excel toàn bộ thuê bao gây tràn bộ nhớ", en: "7. Situation 2: exporting all subscribers to Excel causes an out-of-memory crash", ja: "7. シーン2：全加入者のExcel出力によるメモリ不足クラッシュ" },
    blocks: [
      SITUATION("Một quản lý vận hành cần báo cáo tổng số thuê bao theo gói cước để họp cuối tháng, nên vào màn Báo cáo, không chọn bộ lọc nào (mặc định = toàn bộ 5,2 triệu thuê bao) rồi bấm 'Xuất Excel'.", "An operations manager needs a subscriber-by-plan report for the month-end meeting, so they open the Report screen, apply no filter (default = all 5.2 million subscribers), and click 'Export Excel'.",
        "Service backend cố tải toàn bộ 5,2 triệu dòng vào bộ nhớ cùng lúc để dựng file Excel, chạm giới hạn 4 GB RAM của container rồi bị hệ điều hành kill (OOMKilled) — toàn bộ pod restart, làm gián đoạn dịch vụ cho MỌI thuê bao khác đang dùng chung service trong lúc đó.",
        "The backend service tries to load all 5.2 million rows into memory at once to build the Excel file, hits the container's 4 GB RAM limit, and gets killed by the OS (OOMKilled) — the whole pod restarts, disrupting service for EVERY other subscriber using the shared service at that moment.",
        "運用マネージャーは月末会議用にプラン別加入者数レポートが必要になり、レポート画面を開きフィルタを何も選ばず（デフォルト＝全520万加入者）『Excel出力』を押す。",
        "バックエンドサービスはExcelファイル作成のため520万行を一度にメモリへ読み込もうとし、コンテナの4GB RAM上限に達しOSにキルされる（OOMKilled）——ポッド全体が再起動し、その瞬間に同じサービスを共有する他の全加入者のサービスが中断される。"),
      SOLVE("Báo bug Critical/Highest ngay vì ảnh hưởng toàn hệ thống chứ không chỉ một màn hình; đề xuất giới hạn số dòng xuất trực tiếp (ví dụ tối đa 50.000 dòng), và với báo cáo lớn hơn thì chuyển sang job nền (background job) xử lý theo luồng (streaming) + gửi link tải qua email khi hoàn tất, thay vì tải hết vào RAM.", "Report it as Critical/Highest immediately since it affects the whole system, not just one screen; propose limiting direct export rows (e.g. max 50,000 rows), and for larger reports, switch to a background job that streams the data and emails a download link when done, instead of loading everything into RAM.", "1画面だけでなくシステム全体に影響するため直ちにCritical/Highestとして報告し、直接出力の行数制限（例：最大5万行）を提案する。それを超えるレポートはバックグラウンドジョブでストリーミング処理し、完了時にメールでダウンロードリンクを送る方式に切り替え、RAMに全件読み込むことを避ける。"),
      P("Ví dụ này cho thấy vì sao volume testing với các thao tác XUẤT DỮ LIỆU/BÁO CÁO đặc biệt quan trọng: khác với lỗi chỉ ảnh hưởng một người dùng, lỗi tràn bộ nhớ có thể làm crash chung service — kéo theo hậu quả dây chuyền cho tất cả người dùng khác. Khi ưu tiên thời gian kiểm thử có hạn, hãy đặt các chức năng 'xuất toàn bộ', 'tải xuống không giới hạn', 'đồng bộ toàn bộ' lên hàng đầu danh sách cần volume test, vì đây là nơi một request đơn lẻ có thể kéo sập cả hệ thống dùng chung.",
        "This example shows why volume testing matters especially for DATA EXPORT/REPORT operations: unlike a bug affecting only one user, an out-of-memory bug can crash the whole shared service — causing a chain reaction for every other user. With limited test time, put 'export all', 'unlimited download', 'sync everything' features at the top of your volume-test list, because that's where a single request can bring down the entire shared system.",
        "この例は、データ出力/レポート操作でボリュームテストが特に重要な理由を示しています：1ユーザーだけに影響するバグとは異なり、メモリ不足バグは共有サービス全体をクラッシュさせ、他の全ユーザーに連鎖的な影響を及ぼします。限られたテスト時間で優先順位を付ける際は、『全件出力』『無制限ダウンロード』『全件同期』機能をボリュームテストリストの最上位に置きましょう。1つのリクエストが共有システム全体を落とし得る場所だからです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ volume testing: xuất Excel toàn bộ thuê bao gây OutOfMemory", "A bug ticket found via volume testing: exporting all subscribers to Excel causes OutOfMemory", "ボリュームテストで見つかったバグチケット：全加入者のExcel出力によるOutOfMemory"),
      TRY("Nghĩ thêm một chức năng 'xuất/đồng bộ toàn bộ' khác trong hệ thống bạn từng dùng (xuất danh sách đơn hàng, đồng bộ toàn bộ hồ sơ khách hàng...) và đề xuất cách giới hạn nó để tránh tràn bộ nhớ.", "Think of another 'export/sync all' feature in a system you've used (export order list, sync all customer profiles...) and propose a way to limit it to avoid out-of-memory.", "使ったことのあるシステムの別の『全件出力/同期』機能（注文リスト出力、全顧客プロフィール同期など）を考え、メモリ不足を避けるための制限方法を提案しよう。"),
    ] },
  { heading: { vi: "8. Phân trang, hàng đợi & theo dõi kết quả kiểm thử dung lượng", en: "8. Pagination, queues & tracking volume test results", ja: "8. ページング、キュー、ボリュームテスト結果の追跡" },
    blocks: [
      P("Sau hai tình huống trên, ta rút ra được nguyên tắc thiết kế chung cho hệ dữ liệu lớn: (1) KHÔNG bao giờ trả về 'toàn bộ' dữ liệu trong một response — luôn phân trang, và ưu tiên phân trang kiểu cursor/keyset thay vì OFFSET thô để tránh chậm dần ở trang cuối; (2) các thao tác nặng (xuất báo cáo lớn, đồng bộ toàn bộ, đối soát cuối ngày) nên chạy qua HÀNG ĐỢI (queue) và job nền, có giới hạn tốc độ và có thể theo dõi tiến độ, thay vì xử lý đồng bộ ngay trong request của người dùng.",
        "From the two situations above, we can draw general design principles for large-data systems: (1) NEVER return 'all' data in one response — always paginate, preferring cursor/keyset pagination over raw OFFSET to avoid slowing down toward the last pages; (2) heavy operations (large report export, full sync, end-of-day reconciliation) should run through a QUEUE and background jobs, rate-limited and trackable, instead of being processed synchronously inside the user's request.",
        "上記2つのシーンから、大量データシステムの一般的な設計原則を導けます：（1）1つのレスポンスで『全件』データを決して返さない——常にページングし、末尾ページに向かって遅くなるのを避けるため生のOFFSETよりカーソル/キーセットページングを優先する。（2）重い操作（大量レポート出力、全件同期、日次対照）はキューとバックグラウンドジョブで実行し、レート制限と進捗追跡を可能にし、ユーザーリクエスト内で同期的に処理しない。"),
      P("Với vai trò tester, bạn không cần tự viết code phân trang hay hàng đợi, nhưng bạn cần biết CÁCH KIỂM chúng: kiểm tra trang cuối cùng có nhanh như trang đầu không; kiểm tra khi bấm 'xuất báo cáo lớn' hệ thống có chuyển sang trạng thái 'đang xử lý nền' và thông báo rõ ràng thay vì treo màn hình không; kiểm tra hàng đợi có giới hạn số job chạy song song để tránh quá tải không; và quan trọng nhất — theo dõi được tiến độ/log để biết job có bị kẹt hay không.",
        "As a tester, you don't need to write the pagination or queue code yourself, but you need to know HOW TO TEST them: check whether the last page is as fast as the first; check that clicking 'export large report' switches the system to a 'processing in background' state with a clear message instead of hanging the screen; check that the queue limits concurrent jobs to avoid overload; and most importantly — that progress/logs are trackable so you know if a job is stuck.",
        "テスターの役割として、ページングやキューのコードを自分で書く必要はありませんが、それらのテスト方法は知っておく必要があります：最終ページが最初のページと同じくらい速いか確認する。『大きなレポートを出力』を押した時、画面が固まる代わりにシステムが『バックグラウンド処理中』状態に切り替わり明確なメッセージを出すか確認する。キューが過負荷を避けるため同時実行ジョブ数を制限しているか確認する。そして最も重要なのは——進捗/ログを追跡できジョブが詰まっていないか分かることです。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua Volume Testing (SubMS · Sprint 22)", "A board tracking bugs found via volume testing (SubMS · Sprint 22)", "ボリュームテストで見つかったバグの追跡ボード（SubMS・スプリント22）"),
      IMG(m_dash, "Số liệu tổng kết đợt Volume Testing trên 5 triệu thuê bao: lỗi tìm được, thời gian phản hồi, RAM đỉnh", "Summary metrics of a volume test round on 5 million subscribers: bugs found, response time, peak RAM", "500万加入者でのボリュームテストラウンドの集計指標：発見バグ、応答時間、ピークRAM"),
      TIP("Ưu tiên volume test cho các thao tác TÌM KIẾM/PHÂN TRANG dùng nhiều nhất và các thao tác XUẤT/ĐỒNG BỘ 'toàn bộ' — đây là hai nhóm nơi lỗi khối lượng dữ liệu gây thiệt hại lớn nhất và khó phát hiện nhất khi chỉ test bằng mắt trên dữ liệu ít.", "Prioritize volume testing for the most-used SEARCH/PAGINATION operations and 'export/sync all' operations — these two groups are where volume bugs cause the most damage and are hardest to spot when eyeballing a test with little data.", "最も使われる検索/ページング操作と『全件出力/同期』操作を優先してボリュームテストしましょう——これら2グループは、少量データで目視テストしただけでは最も見つけにくく、最も被害の大きいボリュームバグが起きる場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Kể cả tester có kinh nghiệm cũng hay vấp vài lỗi giống nhau khi làm volume testing lần đầu trên hệ viễn thông. Biết trước giúp bạn thiết kế ca hiệu quả hơn mà không tốn quá nhiều thời gian sinh dữ liệu vô ích.",
        "Even experienced testers often stumble on a few common mistakes the first time they do volume testing on a telecom system. Knowing them helps you design cases more efficiently without wasting time generating useless data.",
        "経験豊富なテスターでも、通信システムで初めてボリュームテストを行う際に共通の失敗をしがちです。事前に知れば、無駄なデータ生成に時間をかけずより効率的にケースを設計できます。"),
      PITFALL("Chỉ test ở MỘT mức dữ liệu duy nhất (ví dụ chỉ 5 triệu) mà bỏ qua các bậc thang trung gian — bạn sẽ biết hệ thống 'sập ở đâu đó' nhưng không biết CHÍNH XÁC ngưỡng nào bắt đầu suy giảm để báo cho đội kỹ thuật ưu tiên tối ưu.", "Testing at only ONE data tier (e.g. only 5 million) and skipping intermediate tiers — you'll know the system 'breaks somewhere' but not the EXACT threshold where degradation begins, so engineering can't prioritize the fix.", "1つのデータ段階（例：500万のみ）だけをテストし中間段階を飛ばす——システムが『どこかで壊れる』ことは分かってもエンジニアリングが優先的に修正すべき正確な劣化開始閾値が分かりません。"),
      PITFALL("Nhầm lẫn 'chạy được' với 'chạy đúng' — hệ thống không timeout không có nghĩa là kết quả trả về đầy đủ, không thiếu, không trùng lặp. Với dữ liệu lớn, lỗi sai kết quả (thiếu bản ghi do phân trang lệch, trùng dòng do JOIN sai) thường nguy hiểm hơn lỗi chậm vì rất khó bị phát hiện bằng mắt thường.", "Confusing 'it runs' with 'it runs correctly' — no timeout doesn't mean the returned result is complete, without gaps or duplicates. With large data, incorrect-result bugs (missing records from off-by-one pagination, duplicate rows from a bad JOIN) are often more dangerous than slowness because they're much harder to spot by eye.", "『動く』と『正しく動く』を混同する——タイムアウトしないことは、返却結果が完全で欠落や重複がないことを意味しません。大量データでは、結果が誤っているバグ（ページングのずれによるレコード欠落、JOINミスによる行重複）は、目視では非常に見つけにくいため、遅さよりも危険なことが多いです。"),
      TIP("Luôn kết hợp một ca kiểm ĐÚNG số lượng kết quả (ví dụ dùng COUNT(*) đối chiếu) với ca đo THỜI GIAN phản hồi — hai chiều này bổ sung nhau và phát hiện được cả lỗi logic lẫn lỗi hiệu năng do khối lượng dữ liệu.", "Always pair a case checking the CORRECT result count (e.g. cross-checking with COUNT(*)) with a case measuring RESPONSE TIME — the two directions complement each other and catch both logic bugs and performance bugs caused by data volume.", "常に正しい結果件数を確認するケース（例：COUNT(*)との照合）と応答時間を測定するケースを組み合わせましょう——この2方向は互いを補完し、データ量に起因するロジックバグとパフォーマンスバグの両方を検出します。"),
      IMG(m_tiers, "Nhắc lại bậc thang dữ liệu cần kiểm — dùng làm checklist khi thời gian có hạn", "Reminder of the data tiers to test — use as a checklist when time is limited", "テストすべきデータ段階の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử phân trang & sắp xếp cho người mới", "Pagination & sorting testing for beginners", "kiem-thu-phan-trang-sap-xep-cho-nguoi-moi", "初心者のためのページング＆並び替えテスト"),
      INTERNAL("Kiểm thử dựa trên rủi ro (risk-based) cho tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
      INTERNAL("Chuẩn bị dữ liệu kiểm thử (test data) cho người mới", "Preparing test data for beginners", "chuan-bi-du-lieu-kiem-thu-test-data-cho-nguoi-moi", "初心者のためのテストデータ準備"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử dung lượng & khả năng mở rộng qua hệ quản lý thuê bao viễn thông SubMS với 5,2 triệu bản ghi: phân biệt volume testing với load/performance testing, cách chuẩn bị dữ liệu khối lượng lớn theo bậc thang, thiết kế ca kiểm thử theo từng mức dữ liệu, và hai tình huống thật cho thấy dữ liệu ít không phản ánh đúng rủi ro sản xuất — từ tìm kiếm treo ở 5 triệu bản ghi tới xuất Excel gây tràn bộ nhớ cả hệ thống. Bạn cũng biết cách kiểm phân trang, hàng đợi và ưu tiên các thao tác 'xuất/đồng bộ toàn bộ' khi thời gian kiểm thử có hạn.",
        "You just learned volume & scalability testing through SubMS, a telecom subscriber management system with 5.2 million records: telling volume testing apart from load/performance testing, preparing large-volume data by tier, designing test cases per data level, and two real situations showing that small data doesn't reflect production risk — from search hanging at 5 million records to an Excel export crashing the whole system with an out-of-memory error. You also learned to check pagination, queues, and prioritize 'export/sync all' operations when test time is limited.",
        "520万件のレコードを持つ通信事業者向け加入者管理システムSubMSを通じて、ボリューム＆スケーラビリティテストを学びました：ボリュームテストと負荷/パフォーマンステストの区別、段階別の大量データ準備、データ水準別のテストケース設計、そして少量データが本番リスクを正しく反映しないことを示す2つの実例——500万件での検索停止からシステム全体をクラッシュさせるExcel出力のメモリ不足まで。テスト時間が限られる際のページング、キューの確認方法、『全件出力/同期』操作の優先順位付けも学びました。"),
      P("Chặng tiếp theo, bạn nên học kiểm thử phân trang & sắp xếp một cách hệ thống hơn, cùng cách chuẩn bị bộ dữ liệu kiểm thử (test data) bài bản và kiểm thử dựa trên rủi ro để chọn đúng thao tác nào cần volume test khi thời gian có hạn. Nếu muốn luyện các kỹ thuật kiểm thử nâng cao này trên dự án mô phỏng doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vào các dự án lớn như viễn thông, ngân hàng.",
        "Next, you should learn pagination & sorting testing more systematically, along with proper test data preparation and risk-based testing to pick the right operations to volume-test when time is limited. If you want to practice these advanced testing techniques on real enterprise-like projects with a mentor, a structured Tester course helps you progress fast and confidently apply to large projects like telecom and banking.",
        "次は、ページング＆並び替えのテストをより体系的に学び、適切なテストデータ準備とリスクベーステストで、時間が限られる中でどの操作をボリュームテストすべきか選べるようにしましょう。指導者とともに実際の企業を模した案件でこれらの高度なテスト技法を練習したいなら、体系的なテスターコースが、通信や銀行のような大規模案件への自信ある応募と速い成長を助けます。"),
      CTA(course),
    ] },
];

const DOC = makeDoc({
    slug: "kiem-thu-dung-luong-kha-nang-mo-rong-volume-cho-tester",
    domain: "telecom",
    primaryKeyword: "kiểm thử dung lượng",
    keywords: ["kiểm thử dung lượng", "volume testing", "khả năng mở rộng", "scalability testing", "kiểm thử dữ liệu lớn viễn thông"],
    coverLabel: "NÂNG CAO · VOLUME · VIỄN THÔNG",
    crumb: "Kiểm thử dung lượng & khả năng mở rộng (Volume & Scalability Testing)",
    metaTitle: { vi: "Kiểm thử dung lượng (Volume Testing) cho Tester", en: "Volume testing for testers — telecom subscribers", ja: "テスターのためのボリュームテスト（通信加入者）" },
    metaDescription: {
      vi: "Kiểm thử dung lượng (volume testing) hệ thuê bao viễn thông: phân biệt load/performance test, chuẩn bị dữ liệu lớn, tìm kiếm treo, xuất Excel tràn bộ nhớ.",
      en: "Volume testing for a multi-million-subscriber telecom system: how it differs from load/performance testing, preparing large-volume data, hanging search, an Excel export causing out-of-memory, with visuals and a quiz.",
      ja: "数百万加入者の通信システム向けボリュームテスト：負荷/パフォーマンステストとの違い、大量データ準備、検索停止、メモリ不足のExcel出力、図とクイズ付きで解説。",
    },
    title: {
      vi: "Kiểm thử dung lượng & khả năng mở rộng cho tester: hệ thuê bao viễn thông nhiều triệu người (có trắc nghiệm)",
      en: "Volume & scalability testing for testers: a multi-million-subscriber telecom system (with quiz)",
      ja: "テスターのためのボリューム＆スケーラビリティテスト：数百万加入者の通信システム（クイズ付き）",
    },
    summary: {
      vi: "Bài nâng cao: kiểm thử dung lượng & khả năng mở rộng qua hệ quản lý thuê bao viễn thông SubMS (5,2 triệu bản ghi). Phân biệt volume testing với load/performance testing, cách chuẩn bị dữ liệu khối lượng lớn theo bậc thang, ca kiểm thử theo mức dữ liệu, hai tình huống thật (tìm kiếm treo ở 5 triệu bản ghi, xuất Excel gây tràn bộ nhớ), phân trang & hàng đợi, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
      en: "Advanced article: volume & scalability testing through SubMS, a telecom subscriber management system (5.2 million records). Telling volume testing apart from load/performance testing, preparing large-volume data by tier, test cases per data level, two real situations (search hanging at 5 million records, an Excel export causing out-of-memory), pagination & queues, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
      ja: "上級記事：520万件のレコードを持つ通信事業者向け加入者管理システムSubMSを通じたボリューム＆スケーラビリティテスト。負荷/パフォーマンステストとの区別、段階別の大量データ準備、データ水準別テストケース、2つの実例（500万件での検索停止、メモリ不足のExcel出力）、ページングとキュー、多数のモック、FAQ、5問クイズ。",
    },
    faqs: [faq1, faq2, faq3],
    howTo: { name: "Cách thiết kế và thực hiện kiểm thử dung lượng", steps: [
      { name: "Xác định các bậc thang dữ liệu cần kiểm", text: "Ví dụ 1.000 / 100.000 / 1 triệu / 5 triệu / 20 triệu bản ghi." },
      { name: "Sinh dữ liệu khối lượng lớn có phân bố giống thật", text: "Dùng script batch, ẩn danh nếu lấy từ production." },
      { name: "Chạy lại cùng ca kiểm thử ở từng mức và ghi điểm gãy", text: "So sánh thời gian phản hồi và tính đúng của kết quả." },
    ] },
    pages,
});

export const MA_VOLUME_01 = [DOC];
