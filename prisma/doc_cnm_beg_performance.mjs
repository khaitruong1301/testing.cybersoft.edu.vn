// doc_cnm_beg_performance.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Performance & API testing cho người mới — là gì, vì sao quan trọng, thử ra sao.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard, postman } from "./ui_mock.mjs";

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
    categorySlug: "performance-api", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: trang danh mục ShopEasy tải chậm lúc Flash Sale ──
const m_slow_page = browser("shopeasy.vn/danh-muc/dien-thoai", [
  panel("ShopEasy · Danh mục Điện thoại", [
    field(24, 20, 330, "Tìm kiếm sản phẩm", "iphone 15", "normal"),
    btn(24, 92, 200, "Đang tải…", "disabled"),
    annotate(20, 84, 340, 58, "CHẬM: hơn 3,2 giây vẫn chưa ra kết quả"),
  ].join(""), { h: 210, accent: "#f59e0b" }),
].join(""), { h: 266, title: "ShopEasy · TMĐT", accent: "#f59e0b" });

// ── Mockup 2: Postman GET danh sách sản phẩm — phản hồi nhanh, bình thường ──
const m_postman_ok = postman({
  method: "GET", url: "api.shopeasy.vn/v1/products?category=dien-thoai&page=1",
  status: 200, time: "180 ms", size: "2.1 KB", ok: true,
  body: [
    "{",
    '  "data": [',
    '    { "id": "SP-3391", "name": "iPhone 15 128GB", "price": 21990000 },',
    '    { "id": "SP-3402", "name": "iPhone 15 Pro 256GB", "price": 28990000 }',
    "  ],",
    '  "page": 1, "limit": 20, "total": 86',
    "}",
  ],
});

// ── Mockup 3: Postman GET cùng API nhưng lúc cao điểm — phản hồi rất chậm ──
const m_postman_slow = postman({
  method: "GET", url: "api.shopeasy.vn/v1/products?category=dien-thoai&page=1",
  status: 200, time: "3.240 ms", size: "2.1 KB", ok: false,
  body: [
    "{",
    '  "data": [ ... 20 san pham ... ],',
    '  "page": 1, "limit": 20, "total": 86',
    "}",
    "// CANH BAO: 3.240 ms > nguong SLA 2.000 ms",
    "// Mot so request khac cung lat cung bi timeout 504",
  ],
});

// ── Mockup 4: bảng khái niệm hiệu năng cơ bản ──
const m_metrics = grid("Các khái niệm hiệu năng cơ bản (giải thích dễ hiểu)", ["Khái niệm", "Ý nghĩa dễ hiểu", "Ví dụ trên ShopEasy"], [
  ["Thời gian phản hồi (Response time)", "Từ lúc bạn bấm tới lúc thấy kết quả", "Bấm 'Tìm kiếm' → có kết quả sau 1,2 giây"],
  ["Tải (Load)", "Số người dùng cùng thao tác một lúc", "10.000 người cùng săn sale lúc 0 giờ"],
  ["Thông lượng (Throughput)", "Số yêu cầu hệ thống xử lý được mỗi giây", "450 request/giây lúc cao điểm"],
  ["Tỉ lệ lỗi (Error rate)", "Phần trăm yêu cầu bị lỗi (500, timeout)", "2% đơn hàng bị lỗi lúc tải cao"],
  ["Ngưỡng chấp nhận (SLA)", "Thời gian tối đa được coi là 'còn ổn'", "Trang sản phẩm phải phản hồi ≤ 2 giây"],
], { accent: "#2563eb" });

// ── Mockup 5: dashboard số liệu hiệu năng nhanh ──
const m_dash = dashboard("Hiệu năng ShopEasy — Flash Sale 20h", [
  { label: "Phản hồi trung bình", value: "1.4s", sub: "cả ngày hôm nay", color: "#2563eb" },
  { label: "P95 phản hồi", value: "3.8s", sub: "10% chậm nhất", color: "#f59e0b" },
  { label: "Tỉ lệ lỗi", value: "2.1%", sub: "lúc cao điểm", color: "#e11d48" },
  { label: "Người dùng đồng thời", value: "8.600", sub: "đỉnh Flash Sale", color: "#16a34a" },
]);

// ── Mockup 6: ticket Jira báo cáo API chậm ──
const m_jira_perf = jira({
  key: "SE-20031", title: "API GET /v1/products chậm bất thường (>3s) lúc Flash Sale 20h",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "production · api.shopeasy.vn · Flash Sale 20h–21h"],
    ["Các bước", "1) Gọi GET /v1/products?category=dien-thoai bằng Postman 2) Đo thời gian phản hồi 3) So với ngưỡng SLA 2.000 ms"],
    ["Kết quả thực tế", "Thời gian phản hồi trung bình 3.240 ms, một số request bị timeout 504"],
    ["Kết quả mong đợi", "Phản hồi ≤ 2.000 ms theo SLA đã thống nhất với đội phát triển"],
    ["Bằng chứng", "postman-se20031.json, chart-response-time.png"],
  ],
});

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Performance testing (kiểm thử hiệu năng) là gì và khác gì với functional testing?",
  "What is performance testing and how is it different from functional testing?",
  "Functional testing trả lời câu hỏi 'chức năng có ĐÚNG không' (bấm Mua hàng có tạo đơn không). Performance testing trả lời câu hỏi 'chức năng có ĐỦ NHANH và ỔN ĐỊNH khi nhiều người dùng cùng lúc không' — ví dụ trang sản phẩm có còn phản hồi trong 2 giây khi 10.000 người cùng vào lúc Flash Sale hay không. Một tính năng có thể đúng 100% nhưng vẫn 'trượt' vì quá chậm khi tải cao.",
  "Functional testing answers 'does the feature work CORRECTLY' (does clicking Buy create an order). Performance testing answers 'is the feature FAST and STABLE enough under real load' — e.g. does the product page still respond within 2 seconds when 10,000 people hit it during a Flash Sale. A feature can be 100% correct yet still 'fail' because it's too slow under heavy load.",
  "パフォーマンステスト（性能テスト）とは？機能テストとどう違う？",
  "機能テストは『機能が正しく動くか』（購入ボタンで注文が作られるか）に答えます。パフォーマンステストは『多くの人が同時に使っても十分速く安定しているか』に答えます — 例えばフラッシュセール中に1万人が同時アクセスしても商品ページが2秒以内に応答するか。機能が100%正しくても、高負荷時に遅すぎれば『不合格』になり得ます。");
const faq2 = FAQ(
  "API là gì, vì sao tester người mới cần biết test API?",
  "What is an API, and why do beginner testers need to know API testing?",
  "API (Application Programming Interface) là 'cánh cửa' để app và server nói chuyện với nhau — ví dụ app ShopEasy gọi API để lấy danh sách sản phẩm, server trả về dữ liệu JSON. Test API nghĩa là gửi yêu cầu (request) tới cánh cửa đó và kiểm tra câu trả lời (response) có đúng, đủ nhanh không — mà KHÔNG cần mở giao diện. Biết test API giúp bạn tìm lỗi sớm hơn (trước khi có giao diện) và đo được tốc độ thực của hệ thống.",
  "An API (Application Programming Interface) is the 'door' through which an app and a server talk — e.g. the ShopEasy app calls an API to get the product list, and the server replies with JSON data. API testing means sending a request to that door and checking whether the response is correct and fast enough — WITHOUT needing a UI. Knowing API testing helps you find bugs earlier (before the UI exists) and measure the system's real speed.",
  "APIとは？初心者テスターがなぜAPIテストを知るべき？",
  "API（アプリケーションプログラミングインターフェース）は、アプリとサーバーが会話するための『扉』です — 例えばShopEasyアプリがAPIを呼び商品一覧を取得し、サーバーがJSONデータを返します。APIテストとは、その扉にリクエストを送り、レスポンス（応答）が正しく十分速いかを、画面なしで確認することです。APIテストを知ると、画面ができる前にバグを早期発見でき、システムの本当の速度を測れます。");
const faq3 = FAQ(
  "Người mới có cần biết lập trình để bắt đầu test hiệu năng và API không?",
  "Do beginners need to know programming to start performance & API testing?",
  "Không cần biết lập trình để BẮT ĐẦU. Với Postman, bạn chỉ cần điền URL, chọn phương thức (GET/POST...) và bấm Gửi để xem kết quả cùng thời gian phản hồi — hoàn toàn thao tác bằng giao diện. Kiến thức lập trình (viết script kiểm tra tự động, công cụ đo tải như JMeter/k6) sẽ giúp bạn tiến xa hơn, nhưng không phải điều kiện để làm quen với performance & API testing.",
  "You don't need programming to GET STARTED. With Postman, you just fill in the URL, pick a method (GET/POST...), and hit Send to see the result and the response time — all through the UI. Programming knowledge (writing automated check scripts, load tools like JMeter/k6) will help you go further, but it isn't a prerequisite to get familiar with performance & API testing.",
  "初心者はパフォーマンス・APIテストを始めるのにプログラミングが必要？",
  "始めるのにプログラミングは不要です。PostmanならURLを入力し、メソッド（GET/POSTなど）を選び、送信ボタンを押すだけで結果と応答時間が画面上で見られます。プログラミング知識（自動チェックスクリプトやJMeter/k6のような負荷ツール）はさらに先へ進むのに役立ちますが、パフォーマンス・APIテストに慣れるための前提条件ではありません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Performance testing chủ yếu kiểm tra điều gì?", en: "What does performance testing mainly check?", ja: "パフォーマンステストは主に何を確認する？" },
    options: [
      { vi: "Chức năng có đúng logic nghiệp vụ không", en: "Whether the feature follows correct business logic", ja: "機能がビジネスロジック通り正しいか" },
      { vi: "Giao diện có đúng màu sắc thiết kế không", en: "Whether the UI matches the design colors", ja: "UIがデザインの色通りか" },
      { vi: "Tốc độ phản hồi & sự ổn định khi có tải (nhiều người dùng)", en: "Response speed & stability under load (many users)", ja: "負荷（多数のユーザー）下での応答速度と安定性" },
      { vi: "Chính tả trong nội dung hiển thị", en: "Spelling in the displayed content", ja: "表示内容の誤字" },
    ], correct: 2,
    explain: { vi: "Performance testing tập trung vào tốc độ phản hồi và độ ổn định của hệ thống khi có tải thực tế, không phải đúng/sai logic hay hình thức.", en: "Performance testing focuses on response speed and stability under real load, not on business logic correctness or visuals.", ja: "パフォーマンステストは実際の負荷下での応答速度と安定性に焦点を当て、ロジックの正誤や見た目ではありません。" },
  }),
  mcq({
    q: { vi: "Trong Postman, con số '3.240 ms' bên cạnh mã trạng thái (status) thể hiện điều gì?", en: "In Postman, the number '3,240 ms' next to the status code shows what?", ja: "Postmanでステータスコード横の『3,240 ms』は何を示す？" },
    options: [
      { vi: "Dung lượng dữ liệu trả về", en: "The size of the returned data", ja: "返却データのサイズ" },
      { vi: "Thời gian phản hồi của request đó (response time)", en: "The response time of that request", ja: "そのリクエストの応答時間" },
      { vi: "Số lần request đã gửi", en: "The number of times the request was sent", ja: "リクエストの送信回数" },
      { vi: "Số dòng trong body JSON", en: "The number of lines in the JSON body", ja: "JSONボディの行数" },
    ], correct: 1,
    explain: { vi: "Postman hiển thị thời gian phản hồi (thời gian từ lúc gửi request tới lúc nhận đủ response) ngay cạnh mã trạng thái — đây là chỉ số hiệu năng cơ bản nhất.", en: "Postman shows the response time (time from sending the request to receiving the full response) right next to the status code — the most basic performance metric.", ja: "Postmanはリクエスト送信から応答受信までの時間をステータスコードの横に表示 — 最も基本的な性能指標です。" },
  }),
  mcq({
    q: { vi: "API trả về status 200 nhưng mất 3.240 ms, trong khi SLA yêu cầu ≤ 2.000 ms. Bạn nên kết luận gì?", en: "The API returns status 200 but takes 3,240 ms, while the SLA requires ≤ 2,000 ms. What should you conclude?", ja: "APIはステータス200だが3,240msかかり、SLAは2,000ms以下を要求。どう結論すべき？" },
    options: [
      { vi: "Không có gì đáng lo vì status 200 nghĩa là thành công", en: "Nothing to worry about since status 200 means success", ja: "ステータス200＝成功なので問題なし" },
      { vi: "Đây là vấn đề hiệu năng cần báo cáo dù dữ liệu trả về đúng", en: "This is a performance issue worth reporting even though the data is correct", ja: "データは正しくても報告すべき性能問題" },
      { vi: "Phải là lỗi 500 mới đáng ghi nhận", en: "Only a 500 error would be worth logging", ja: "500エラーでなければ記録に値しない" },
      { vi: "Cứ đóng ticket vì request đã chạy xong", en: "Just close the ticket since the request finished", ja: "リクエストが完了したのでチケットは閉じてよい" },
      { vi: "Chờ người dùng phàn nàn rồi mới báo", en: "Wait until users complain before reporting", ja: "ユーザーが苦情を言ってから報告する" },
    ], correct: 1,
    explain: { vi: "Status đúng chỉ nói lên tính đúng đắn dữ liệu, không nói lên tốc độ. Vượt ngưỡng SLA vẫn là một lỗi hiệu năng cần ghi ticket, kèm số liệu đo được.", en: "A correct status only shows data correctness, not speed. Exceeding the SLA is still a performance defect worth logging, with the measured numbers.", ja: "正しいステータスはデータの正しさのみを示し、速度は示しません。SLA超過は測定値付きで報告すべき性能不具合です。" },
  }),
  mcq({
    q: { vi: "'Tải' (load) trong performance testing nghĩa là gì?", en: "What does 'load' mean in performance testing?", ja: "パフォーマンステストにおける『負荷（load）』とは？" },
    options: [
      { vi: "Dung lượng file cài đặt ứng dụng", en: "The install file size of the app", ja: "アプリのインストールファイルサイズ" },
      { vi: "Số lượng người dùng/yêu cầu tác động lên hệ thống cùng lúc", en: "The number of users/requests hitting the system at the same time", ja: "同時にシステムへ負荷をかけるユーザー/リクエスト数" },
      { vi: "Tốc độ mạng của một người dùng cụ thể", en: "One specific user's network speed", ja: "特定ユーザーのネットワーク速度" },
      { vi: "Số trang trong tài liệu API", en: "The number of pages in the API docs", ja: "APIドキュメントのページ数" },
    ], correct: 1,
    explain: { vi: "Tải là số người dùng/yêu cầu đồng thời — ví dụ 10.000 người cùng vào ShopEasy lúc 0 giờ Flash Sale. Hệ thống cần được kiểm tra ở nhiều mức tải khác nhau.", en: "Load is the number of concurrent users/requests — e.g. 10,000 people hitting ShopEasy at midnight during a Flash Sale. Systems need testing at several load levels.", ja: "負荷とは同時のユーザー/リクエスト数 — 例：深夜0時のフラッシュセールに1万人が同時アクセス。システムは複数の負荷レベルで検証すべきです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Performance & API testing cho người mới nghĩa là: kiểm tra xem app có phản hồi đủ NHANH khi nhiều người dùng cùng lúc (hiệu năng), và kiểm tra 'cánh cửa' dữ liệu giữa app với server — API — có trả đúng và đủ nhanh không. Bài này bám app TMĐT ShopEasy: bạn sẽ hiểu response time, tải là gì, và thử gọi một API đơn giản bằng Postman để tự đo. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Performance & API testing for beginners means: checking whether an app responds FAST enough when many users act at once (performance), and checking the 'data door' between app and server — the API — returns correct data fast enough. This article follows the ShopEasy e-commerce app: you'll learn what response time and load are, and try calling a simple API with Postman to measure it yourself. Lots of visuals and a quiz at the end.",
        "初心者向けパフォーマンス＆APIテストとは：多くのユーザーが同時に操作しても十分速く応答するか（パフォーマンス）、アプリとサーバー間のデータの『扉』であるAPIが正しく十分速く応答するかを確認することです。本記事はECアプリShopEasyに沿い、応答時間や負荷とは何かを学び、Postmanで簡単なAPIを呼んで自分で測定します。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Nghe tới 'performance testing' hay 'API testing' có thể khiến bạn hơi ngợp — nghe như việc của lập trình viên. Nhưng thực ra, ở mức cơ bản, đây là những kỹ năng bạn hoàn toàn có thể bắt đầu ngay bằng cách CLICK CHUỘT: mở một trang trong giờ cao điểm để cảm nhận độ trễ, hoặc mở Postman để gửi một yêu cầu và đọc con số thời gian phản hồi. Bài này sẽ dẫn bạn đi từng bước, dùng đúng app mua sắm quen thuộc.",
        "Hi, newcomer! Hearing 'performance testing' or 'API testing' can feel overwhelming — like something only developers do. But at a basic level, these are skills you can start with just clicks: open a page during peak hours to feel the lag, or open Postman to send a request and read the response-time number. This article walks you through it step by step, using a familiar shopping app.",
        "こんにちは、初心者さん！『パフォーマンステスト』や『APIテスト』と聞くと、開発者だけの仕事のように感じ圧倒されるかもしれません。しかし基本レベルでは、クリックだけで始められるスキルです：ピーク時間帯にページを開いて遅延を感じたり、Postmanでリクエストを送って応答時間の数字を読んだり。本記事は馴染みのある買い物アプリを使い、一歩ずつ案内します。"),
      IMG(m_slow_page, "Màn hình test: trang danh mục ShopEasy tải chậm lúc Flash Sale (hơn 3,2 giây)", "Screen under test: ShopEasy category page loading slowly during a Flash Sale (over 3.2s)", "テスト対象画面：フラッシュセール中に読み込みが遅いShopEasyの一覧画面（3.2秒超）"),
      DEF("Kiểm thử hiệu năng (Performance testing)", "kiểm tra tốc độ phản hồi và sự ổn định của hệ thống khi có một mức tải (số người dùng/yêu cầu) nhất định.",
        "performance testing — checking a system's response speed and stability under a given level of load (number of users/requests).",
        "パフォーマンステスト — 一定の負荷（ユーザー/リクエスト数）の下でのシステムの応答速度と安定性を確認すること。"),
    ] },
  { heading: { vi: "2. Hiệu năng là gì: thời gian phản hồi & tải", en: "2. What performance means: response time & load", ja: "2. パフォーマンスとは：応答時間と負荷" },
    blocks: [
      P("Hai khái niệm quan trọng nhất bạn cần nắm trước tiên là 'thời gian phản hồi' (response time) và 'tải' (load). Thời gian phản hồi là khoảng thời gian từ lúc bạn thao tác (bấm Tìm kiếm, bấm Đặt hàng) tới lúc bạn thấy kết quả. Tải là số người dùng hoặc số yêu cầu đang tác động lên hệ thống trong cùng một thời điểm.",
        "The two most important concepts to grasp first are 'response time' and 'load'. Response time is the duration from when you act (click Search, click Order) to when you see the result. Load is the number of users or requests hitting the system at the same moment.",
        "最初に押さえるべき最も重要な2つの概念は『応答時間』と『負荷』です。応答時間とは、あなたが操作（検索・注文ボタンを押す）してから結果が表示されるまでの時間。負荷とは、同じ瞬間にシステムへ働きかけているユーザーやリクエストの数です。"),
      IMG(m_metrics, "Bảng các khái niệm hiệu năng cơ bản, giải thích dễ hiểu kèm ví dụ ShopEasy", "A table of basic performance concepts, explained simply with ShopEasy examples", "基本的なパフォーマンス概念の表、ShopEasyの例でわかりやすく説明"),
      DEF("Ngưỡng chấp nhận (SLA/threshold)", "thời gian phản hồi tối đa mà đội phát triển và kinh doanh đã thống nhất là 'còn chấp nhận được' — vượt qua đó bị coi là vấn đề hiệu năng.",
        "the acceptable threshold (SLA) — the maximum response time the dev team and business have agreed is 'still acceptable'; going over it counts as a performance issue.",
        "許容閾値（SLA）— 開発チームとビジネス側が『まだ許容できる』と合意した最大応答時間。それを超えると性能問題とみなされる。"),
      P("Bạn không cần nhớ hết mọi chỉ số ngay. Điều quan trọng là hiểu bức tranh chung: hệ thống có thể chạy 'mượt' khi chỉ vài người dùng, nhưng lại 'ì ạch' hoặc lỗi khi hàng nghìn người cùng vào — đó chính là lý do vì sao chúng ta cần kiểm thử hiệu năng riêng, không chỉ kiểm thử chức năng thông thường.",
        "You don't need to memorize every metric right away. What matters is understanding the big picture: a system may run smoothly with just a few users, but become sluggish or error out when thousands hit it at once — that's exactly why we need dedicated performance testing, not just regular functional testing.",
        "すぐに全ての指標を覚える必要はありません。大切なのは全体像を理解すること：システムは少数のユーザーでは滑らかに動いても、数千人が同時にアクセスすると重くなったりエラーになったりします — だからこそ通常の機能テストとは別に、専用のパフォーマンステストが必要なのです。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần hiểu điều này", en: "3. Why beginners need to understand this", ja: "3. 初心者がこれを理解すべき理由" },
    blocks: [
      P("Ở một dự án thật, một tính năng 'chạy đúng' khi bạn test một mình trên máy cá nhân không có nghĩa là nó sẽ ổn khi hàng nghìn khách hàng cùng thao tác — ví dụ lúc ShopEasy mở Flash Sale 0 giờ. Nếu trang chậm hoặc lỗi đúng lúc khách muốn mua, doanh nghiệp mất doanh thu ngay lập tức và mất luôn niềm tin của khách.",
        "On a real project, a feature that 'works fine' when you test it alone on your own machine doesn't mean it will hold up when thousands of customers act at once — e.g. when ShopEasy launches its midnight Flash Sale. If the page is slow or errors right when customers want to buy, the business loses revenue instantly and loses customer trust too.",
        "実際の案件では、あなた一人が自分のPCで『正しく動く』と確認できた機能でも、深夜0時のフラッシュセールのように数千人の顧客が同時に操作しても大丈夫とは限りません。顧客が買いたい瞬間にページが遅い・エラーになると、ビジネスは即座に売上を失い、顧客の信頼も失います。"),
      P("Với riêng bạn — người mới — hiểu về hiệu năng và API giúp bạn mở rộng phạm vi test ngoài giao diện: bạn có thể phát hiện lỗi/chậm ở tầng API trước cả khi giao diện hoàn thiện, và biết cách đo tốc độ thay vì chỉ nói cảm tính 'thấy hơi chậm'. Đây cũng là kỹ năng được nhà tuyển dụng đánh giá cao vì thể hiện tư duy vượt ra ngoài UI.",
        "For you specifically — a beginner — understanding performance and APIs lets you extend testing beyond the UI: you can catch bugs or slowness at the API layer even before the UI is finished, and learn to measure speed instead of just saying 'it feels a bit slow'. It's also a skill employers value highly since it shows thinking beyond the UI.",
        "特に初心者のあなたにとって、パフォーマンスとAPIの理解はテスト範囲をUIの外へ広げます：UIが完成する前でもAPI層でバグや遅さを発見でき、感覚的に『少し遅い気がする』と言う代わりに速度を測定できるようになります。これはUIの外まで考える力を示すため、採用者に高く評価されるスキルでもあります。"),
      P("Và một điều thực tế: performance testing và API testing thường là câu hỏi phỏng vấn 'điểm cộng' cho vị trí Tester — chỉ cần bạn trả lời được 'thời gian phản hồi là gì', 'API là gì', 'bạn sẽ test API như thế nào bằng Postman' là đã vượt qua nhiều ứng viên chỉ biết test giao diện.",
        "And a practical note: performance and API testing are often 'bonus point' interview questions for Tester roles — just being able to answer 'what is response time', 'what is an API', 'how would you test an API using Postman' already puts you ahead of candidates who only know UI testing.",
        "実務的な話として、パフォーマンス・APIテストはテスター職の面接で『加点』になりやすい質問です — 『応答時間とは』『APIとは』『Postmanでどうテストするか』に答えられるだけで、UIテストしか知らない候補者より一歩リードできます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: API là gì & công cụ Postman", en: "4. Prepare: what an API is & the Postman tool", ja: "4. 準備：APIとは・Postmanツール" },
    blocks: [
      P("Trước khi test API, hãy chắc bạn hiểu API là gì bằng một hình ảnh đơn giản: app ShopEasy trên điện thoại của bạn không tự 'biết' danh sách sản phẩm — nó GỌI tới server qua API để xin dữ liệu, server trả lời bằng một khối dữ liệu JSON. Postman là công cụ giúp bạn tự làm việc đó — gửi yêu cầu và xem câu trả lời — mà không cần mở app thật.",
        "Before testing an API, make sure you understand what an API is with a simple picture: the ShopEasy app on your phone doesn't 'know' the product list by itself — it CALLS the server via an API to ask for data, and the server replies with a JSON data block. Postman is the tool that lets you do that yourself — send a request and see the reply — without opening the real app.",
        "APIをテストする前に、シンプルなイメージでAPIを理解しましょう：あなたのスマホのShopEasyアプリは商品一覧を自分で『知っている』わけではなく、APIを通じてサーバーにデータを要求し、サーバーがJSONデータの塊で応答します。Postmanは、実際のアプリを開かずに、自分でリクエストを送り応答を見られるツールです。"),
      STEP(1, "Tải và mở Postman (miễn phí); tạo một 'Request' mới.", "Download and open Postman (free); create a new 'Request'.", "Postman（無料）をダウンロードして開き、新しい『Request』を作成する。"),
      STEP(2, "Chọn phương thức GET (lấy dữ liệu) và dán URL của API cần test, ví dụ api.shopeasy.vn/v1/products.", "Choose the GET method (fetch data) and paste the API URL to test, e.g. api.shopeasy.vn/v1/products.", "GETメソッド（データ取得）を選び、テストするAPIのURL（例：api.shopeasy.vn/v1/products）を貼り付ける。"),
      STEP(3, "Bấm 'Send' và đọc 3 thứ: mã trạng thái (status), thời gian phản hồi (time), và dữ liệu trả về (body).", "Click 'Send' and read three things: the status code, the response time, and the returned data (body).", "『Send』を押し、ステータスコード・応答時間・返却データ（ボディ）の3つを読む。"),
      TRY("Mở Postman (hoặc trang web postman.com), tạo 1 request GET tới bất kỳ API công khai (vd https://jsonplaceholder.typicode.com/posts) và đọc thời gian phản hồi hiện ra.", "Open Postman (or postman.com), create a GET request to any public API (e.g. https://jsonplaceholder.typicode.com/posts) and read the response time shown.", "Postman（またはpostman.com）を開き、公開API（例：https://jsonplaceholder.typicode.com/posts）へGETリクエストを作り、表示される応答時間を読んでみよう。"),
      PITFALL("Nghĩ rằng cứ thấy mã 200 (thành công) là API đã 'ổn'. Status đúng chỉ nói dữ liệu đúng — bạn vẫn phải nhìn thêm cột thời gian phản hồi để biết API có ĐỦ NHANH hay không.", "Assuming that seeing status 200 (success) means the API is 'fine'. A correct status only shows the data is correct — you still need to check the response-time column to know if the API is FAST ENOUGH.", "ステータス200（成功）を見ただけでAPIが『大丈夫』と思い込むこと。正しいステータスはデータが正しいことだけを示す — APIが十分速いかは応答時間の列も確認する必要があります。"),
      IMG(m_postman_ok, "Postman: GET danh sách sản phẩm — status 200, phản hồi nhanh 180 ms", "Postman: GET the product list — status 200, fast response 180 ms", "Postman：商品一覧のGET — ステータス200、応答180msと高速"),
    ] },
  { heading: { vi: "5. Các bước thực hành: test API đơn giản với Postman", en: "5. Hands-on steps: simple API testing with Postman", ja: "5. 実習手順：Postmanでの簡単なAPIテスト" },
    blocks: [
      P("Giờ ta thử một ca kiểm thử API cụ thể trên ShopEasy: gọi API lấy danh sách điện thoại và kiểm tra cả tính đúng lẫn tốc độ, đúng như tester thật vẫn làm mỗi ngày.",
        "Now let's try a concrete API test case on ShopEasy: call the API to get the phone list and check both correctness and speed, exactly like real testers do every day.",
        "では、ShopEasyで具体的なAPIテストケースを試しましょう：電話機一覧を取得するAPIを呼び、正しさと速度の両方を確認します。実務のテスターが毎日行う作業そのものです。"),
      STEP(1, "Ghi rõ ca test: 'GET /v1/products?category=dien-thoai phải trả về status 200, đúng danh sách sản phẩm điện thoại, trong ≤ 2.000 ms'.", "Write the test case clearly: 'GET /v1/products?category=dien-thoai must return status 200, the correct phone list, within ≤ 2,000 ms'.", "テストケースを明記：『GET /v1/products?category=dien-thoai は status 200、正しい電話機一覧を、2,000ms以内に返すべき』。"),
      STEP(2, "Gửi request bằng Postman lúc bình thường → đọc status, body, thời gian phản hồi.", "Send the request via Postman under normal conditions → read the status, body, and response time.", "通常時にPostmanでリクエスト送信→status・body・応答時間を読む。"),
      STEP(3, "So sánh dữ liệu trả về với kỳ vọng (đúng danh mục điện thoại, đủ trường id/tên/giá) và so thời gian với ngưỡng SLA đã thống nhất.", "Compare the returned data with expectations (correct phone category, has id/name/price fields) and compare the time against the agreed SLA.", "返却データを期待値（正しい電話機カテゴリ、id/名前/価格のフィールドが揃う）と比較し、時間を合意済みSLAと比較する。"),
      STEP(4, "Gửi lại request lúc cao điểm (hoặc giả lập nhiều request liên tiếp) → nếu thời gian phản hồi vượt xa lúc bình thường, ghi lại làm bằng chứng.", "Resend the request during peak time (or simulate several requests in a row) → if the response time is far above normal, record it as evidence.", "ピーク時（または連続リクエストのシミュレーション）で再送信→応答時間が通常より大きく上回れば証拠として記録する。"),
      CODE("text", "CA TEST: GET /v1/products?category=dien-thoai\nLuc binh thuong  : status 200, 180 ms  -> DAT (dung, du nhanh)\nLuc Flash Sale 20h: status 200, 3.240 ms -> KHONG DAT (dung du lieu nhung vuot SLA 2.000 ms)\nGhi chu: mot so request cung thoi diem tra ve 504 Gateway Timeout"),
      IMG(m_postman_slow, "Postman: cùng API lúc Flash Sale — vẫn status 200 nhưng mất 3.240 ms, vượt SLA", "Postman: the same API during Flash Sale — still status 200 but takes 3,240 ms, over the SLA", "Postman：フラッシュセール中の同じAPI — status 200だが3,240msかかりSLA超過"),
      TRY("Với API bạn vừa gọi ở mục 4, hãy tự đặt một ngưỡng SLA (ví dụ ≤ 1.000 ms) và ghi lại xem lần gọi của bạn có đạt không.", "For the API you just called in section 4, set your own SLA (e.g. ≤ 1,000 ms) and note down whether your call passed it.", "4章で呼んだAPIについて、自分でSLA（例：1,000ms以下）を設定し、自分の呼び出しが合格したか記録してみよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: trang chậm hẳn lúc Flash Sale", en: "6. Situation 1: the page is much slower during Flash Sale", ja: "6. シーン1：フラッシュセール中に大幅に遅い" },
    blocks: [
      SITUATION("Trang danh mục ShopEasy bình thường tải trong 1 giây, nhưng đúng 0 giờ Flash Sale lại mất hơn 3 giây, có lúc trắng trang.", "The ShopEasy category page normally loads in 1 second, but right at midnight Flash Sale it takes over 3 seconds, sometimes blank.",
        "Bạn test lúc 15h thấy mọi thứ bình thường (1.1 giây), nhưng khi kiểm tra lại lúc 0h Flash Sale, thời gian phản hồi API tăng gấp 3 lần và một vài lần trang không tải được sản phẩm nào.",
        "You tested at 3pm and everything looked normal (1.1s), but rechecking at the midnight Flash Sale, the API response time triples and a few times the page loads no products at all.",
        "ShopEasyの一覧画面が通常1秒で読み込まれるが、フラッシュセール0時ちょうどに3秒以上かかり、時に真っ白になる。",
        "午後3時にテストした時は正常（1.1秒）だったが、フラッシュセール0時に再確認するとAPI応答時間が3倍になり、何度か商品が全く表示されなかった。"),
      SOLVE("Ghi ticket kèm số liệu đo được ở CẢ hai thời điểm (bình thường vs cao điểm), gắn nhãn 'performance', đề xuất kiểm tra khả năng chịu tải của API.", "Log a ticket with the measured numbers at BOTH times (normal vs peak), tag it 'performance', and suggest checking the API's load capacity.", "通常時とピーク時『両方』の測定値を添えてチケットを起票し『performance』タグを付け、APIの負荷耐性の確認を提案する。"),
      P("Đây là bài học quan trọng cho người mới: một lỗi hiệu năng thường KHÔNG xuất hiện khi bạn test một mình, mà chỉ lộ ra khi có tải thật (nhiều người dùng cùng lúc). Vì vậy, đừng chỉ test một lần lúc rảnh rỗi — hãy chủ động thử lại đúng lúc cao điểm hoặc phối hợp với đội để giả lập tải, rồi so sánh số liệu.",
        "This is an important lesson for beginners: a performance bug often does NOT show up when you test alone, only when there's real load (many concurrent users). So don't just test once when things are quiet — actively retest during peak hours or work with the team to simulate load, then compare the numbers.",
        "初心者への重要な教訓：パフォーマンスの不具合は一人でテストしている時には現れず、実際の負荷（多数の同時ユーザー）がある時にだけ現れることが多いです。だから暇な時に一度だけテストするのではなく、ピーク時に積極的に再テストするか、チームと協力して負荷をシミュレーションし、数値を比較しましょう。"),
      IMG(m_dash, "Bảng số liệu hiệu năng lúc Flash Sale: phản hồi trung bình, P95, tỉ lệ lỗi, người dùng đồng thời", "Performance metrics panel during Flash Sale: average response, P95, error rate, concurrent users", "フラッシュセール中のパフォーマンス指標：平均応答・P95・エラー率・同時ユーザー数"),
      RECAP(["Lỗi hiệu năng thường chỉ lộ ra khi có tải thật, không phải lúc test một mình", "Ghi ticket kèm số liệu đo ở cả lúc bình thường và lúc cao điểm để so sánh"],
        ["Performance bugs often only appear under real load, not when testing alone", "Log tickets with numbers from both normal and peak times for comparison"],
        ["性能バグは実負荷時のみ現れることが多く、一人でのテスト時には現れない", "通常時とピーク時両方の数値を添えてチケットを起票し比較する"]),
    ] },
  { heading: { vi: "7. Tình huống 2: dữ liệu đúng nhưng quá chậm", en: "7. Situation 2: correct data but far too slow", ja: "7. シーン2：データは正しいが遅すぎる" },
    blocks: [
      SITUATION("Bạn gọi API bằng Postman, dữ liệu trả về hoàn toàn đúng (status 200, đúng sản phẩm), nhưng mất 3.240 ms trong khi SLA yêu cầu ≤ 2.000 ms.", "You call the API with Postman, the returned data is fully correct (status 200, correct products), but it takes 3,240 ms while the SLA requires ≤ 2,000 ms.",
        "Vì dữ liệu đúng nên bạn phân vân: đây có phải là 'bug' để báo cáo hay không, khi mọi con số nghiệp vụ đều khớp.",
        "Since the data is correct, you hesitate: is this really a 'bug' worth reporting, when every business number matches?",
        "PostmanでAPIを呼び、返却データは完全に正しい（status 200、正しい商品）が、SLAが2,000ms以下を求める中3,240msかかった。",
        "データが正しいため迷う：ビジネス上の数値がすべて一致しているのに、これは報告すべき『バグ』なのか。"),
      SOLVE("Vẫn tạo ticket loại 'Performance issue' kèm số đo (3.240 ms > SLA 2.000 ms), không cần chờ dữ liệu sai mới báo — chậm quá ngưỡng đã là một lỗi cần sửa.", "Still create a 'Performance issue' ticket with the measured number (3,240 ms > SLA 2,000 ms) — no need to wait for wrong data to report; exceeding the threshold is already a bug to fix.", "測定値（3,240ms > SLA 2,000ms）を添えて『Performance issue』チケットを作成 — データ誤りを待つ必要はなく、閾値超過はすでに修正すべき不具合。"),
      P("Nhiều người mới chỉ coi 'lỗi' là khi dữ liệu sai hoặc màn hình vỡ. Nhưng với performance testing, VƯỢT NGƯỠNG THỜI GIAN cũng là một lỗi thực sự — vì khách hàng chờ lâu sẽ bỏ giỏ hàng dù dữ liệu đúng 100%. Hãy luôn đối chiếu con số đo được với ngưỡng SLA đã thống nhất, thay vì chỉ nhìn status code.",
        "Many beginners only consider it a 'bug' when data is wrong or the screen breaks. But in performance testing, EXCEEDING THE TIME THRESHOLD is a real bug too — because customers who wait too long will abandon their cart even if the data is 100% correct. Always compare the measured number against the agreed SLA, not just the status code.",
        "多くの初心者はデータが間違っているか画面が壊れた時だけを『バグ』とみなします。しかしパフォーマンステストでは、時間の閾値超過も本当の不具合です — データが100%正しくても、待ちすぎた顧客はカートを放棄するからです。常にステータスコードだけでなく、測定値を合意済みSLAと照合しましょう。"),
      IMG(m_jira_perf, "Ticket hiệu năng: API đúng dữ liệu nhưng vượt SLA 2.000 ms, kèm bằng chứng đo được", "A performance ticket: API returns correct data but exceeds the 2,000 ms SLA, with measured evidence", "性能チケット：APIのデータは正しいがSLA 2,000msを超過、測定証拠付き"),
      TRY("Viết một câu mô tả ngắn cho ticket hiệu năng ở trên, nêu rõ: API nào, thời gian đo được, ngưỡng SLA, thời điểm đo.", "Write a short description for the performance ticket above, stating: which API, the measured time, the SLA threshold, and when it was measured.", "上記の性能チケットの短い説明を書こう：どのAPIか、測定時間、SLA閾値、測定時刻を明記。"),
    ] },
  { heading: { vi: "8. Theo dõi số liệu hiệu năng cơ bản", en: "8. Tracking basic performance metrics", ja: "8. 基本的なパフォーマンス指標の追跡" },
    blocks: [
      P("Bạn không cần công cụ phức tạp để bắt đầu theo dõi hiệu năng. Chỉ cần ghi lại vài con số cơ bản mỗi lần test, theo thời gian, là bạn đã có một bức tranh hữu ích để báo cáo cho đội.",
        "You don't need complex tools to start tracking performance. Just record a few basic numbers each time you test, over time, and you already have a useful picture to report to the team.",
        "パフォーマンス追跡を始めるのに複雑なツールは不要です。テストのたびにいくつかの基本数値を記録していくだけで、チームへ報告する有用な全体像が得られます。"),
      STEP(1, "Ghi lại 4 con số mỗi lần test: thời gian phản hồi trung bình, P95 (10% chậm nhất), tỉ lệ lỗi, số người dùng đồng thời (nếu biết).", "Record 4 numbers each test: average response time, P95 (the slowest 10%), error rate, and concurrent users (if known).", "テストごとに4つの数値を記録：平均応答時間、P95（最も遅い10%）、エラー率、既知なら同時ユーザー数。"),
      STEP(2, "So sánh với lần test trước và với ngưỡng SLA để biết xu hướng đang tốt lên hay xấu đi.", "Compare with the previous test and with the SLA to see whether the trend is improving or worsening.", "前回のテストとSLAと比較し、傾向が良くなっているか悪くなっているかを把握する。"),
      IMG(m_dash, "Dashboard số liệu hiệu năng nhanh: phản hồi trung bình, P95, tỉ lệ lỗi, người dùng đồng thời", "A quick performance dashboard: average response, P95, error rate, concurrent users", "簡易パフォーマンスダッシュボード：平均応答・P95・エラー率・同時ユーザー数"),
      TIP("Luôn ghi thời điểm đo (giờ bình thường hay giờ cao điểm) cùng con số — một con số không có ngữ cảnh thời điểm gần như vô nghĩa với hiệu năng.", "Always record the time of measurement (normal hours or peak hours) along with the number — a number without a time context is nearly meaningless for performance.", "測定時刻（通常時かピーク時か）を数値と一緒に必ず記録 — 時刻の文脈がない数値はパフォーマンスにおいてほぼ無意味です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi mới làm quen với performance & API testing. Biết trước giúp bạn tự tin hơn và tránh báo cáo sai lệch.",
        "Beginners often stumble on a few common mistakes when first getting into performance & API testing. Knowing them in advance helps you feel more confident and avoid misleading reports.",
        "初心者はパフォーマンス・APIテストに初めて触れる際、共通の失敗をしがちです。事前に知れば自信が持て、誤解を招く報告を避けられます。"),
      PITFALL("Chỉ test một lần lúc rảnh (không tải) rồi kết luận 'hiệu năng ổn' — bỏ qua việc kiểm tra lúc tải cao, nơi lỗi hiệu năng thường xuất hiện.", "Testing only once when it's quiet (no load) and concluding 'performance is fine' — skipping tests under heavy load, where performance bugs usually appear.", "空いている時（負荷なし）に一度だけテストし『性能は問題ない』と結論づける — 性能バグが現れやすい高負荷時の確認を省略。"),
      PITFALL("Chỉ nhìn status code mà quên đọc cột thời gian phản hồi — một API 'đúng' vẫn có thể 'chậm' và cần được ghi nhận.", "Only looking at the status code and forgetting to read the response-time column — a 'correct' API can still be 'slow' and needs to be logged.", "ステータスコードだけを見て応答時間の列を読み忘れる — 『正しい』APIでも『遅い』ことがあり、記録が必要。"),
      TIP("Luôn so con số đo được với một ngưỡng cụ thể (SLA) đã thống nhất trước, thay vì tự đánh giá cảm tính 'nhanh' hay 'chậm'.", "Always compare the measured number against a specific, pre-agreed threshold (SLA) instead of judging 'fast' or 'slow' by feeling.", "測定値は必ず事前合意した具体的な閾値（SLA）と比較し、感覚で『速い』『遅い』と判断しない。"),
      IMG(m_metrics, "Nhắc lại: các khái niệm hiệu năng cơ bản và cách hiểu chúng qua ví dụ ShopEasy", "Reminder: basic performance concepts and how to understand them via ShopEasy examples", "再確認：基本的なパフォーマンス概念とShopEasyの例での理解の仕方"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
      INTERNAL("Vòng đời của một lỗi (Defect Life Cycle) cho người mới", "The bug (defect) life cycle for beginners", "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa làm quen với performance & API testing qua app ShopEasy: hiểu thời gian phản hồi và tải là gì, biết API là 'cánh cửa' dữ liệu giữa app và server, và đã thử gọi một API bằng Postman để tự đo tốc độ và so với ngưỡng SLA. Bạn cũng học cách nhận diện một lỗi hiệu năng thật sự (không chỉ dựa vào status code) và cách ghi ticket kèm số liệu. Đây là bước đầu vững chắc để mở rộng kỹ năng test ra ngoài giao diện.",
        "You just got familiar with performance & API testing through the ShopEasy app: you understood what response time and load are, learned that an API is the 'data door' between an app and a server, and tried calling an API with Postman to measure speed yourself and compare it to the SLA. You also learned to spot a real performance issue (not just relying on the status code) and how to log a ticket with numbers. This is a solid first step to extend your testing skills beyond the UI.",
        "ShopEasyアプリを通じてパフォーマンス＆APIテストに親しみました：応答時間と負荷とは何かを理解し、APIがアプリとサーバー間の『データの扉』であることを学び、Postmanで実際にAPIを呼んで速度を測定しSLAと比較しました。ステータスコードだけに頼らず本当の性能問題を見分ける方法や、数値付きでチケットを起票する方法も学びました。UIの外までテストスキルを広げるための確かな第一歩です。"),
      P("Chặng tiếp theo, bạn nên luyện thêm các thao tác Postman nâng cao (Collections, biến môi trường, viết test script đơn giản) và làm quen với công cụ đo tải chuyên dụng như JMeter/k6 để mô phỏng hàng nghìn người dùng cùng lúc. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thực tế, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, practice more advanced Postman features (Collections, environment variables, writing simple test scripts) and get familiar with dedicated load tools like JMeter/k6 to simulate thousands of concurrent users. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より高度なPostman機能（コレクション、環境変数、簡単なテストスクリプトの記述）を練習し、数千人の同時ユーザーをシミュレートする専用の負荷ツール（JMeter/k6）に慣れましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const PERF_API_BEG_01 = makeDoc({
  slug: "performance-api-testing-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "performance testing cho người mới",
  keywords: ["performance testing cho người mới", "kiểm thử hiệu năng", "API testing là gì", "test API với Postman", "response time"],
  coverLabel: "NGƯỜI MỚI · PERFORMANCE & API · TMĐT",
  crumb: "Performance & API testing cho người mới",
  metaTitle: { vi: "Performance & API testing cho người mới là gì", en: "Performance & API testing for beginners: what & why", ja: "初心者のためのパフォーマンス＆APIテスト入門" },
  metaDescription: {
    vi: "Performance testing cho người mới: hiểu thời gian phản hồi, tải và API là gì, thử test API đơn giản bằng Postman qua app TMĐT, có hình minh hoạ và trắc nghiệm.",
    en: "Performance testing for beginners: understand response time, load and what an API is, try simple API testing with Postman via a TMDT app, with visuals and a quiz.",
    ja: "初心者向けパフォーマンステスト：応答時間、負荷、APIとは何かを理解し、ECアプリでPostmanを使った簡単なAPIテストを試す。図とクイズ付きの入門記事。",
  },
  title: {
    vi: "Performance & API testing cho người mới: là gì, vì sao quan trọng, thử ra sao (có trắc nghiệm)",
    en: "Performance & API testing for beginners: what, why it matters, and how to try it (with quiz)",
    ja: "初心者のためのパフォーマンス＆APIテスト：とは・重要性・試し方（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: hiểu performance & API testing qua app TMĐT ShopEasy. Khái niệm thời gian phản hồi, tải, thông lượng, ngưỡng SLA; API là gì; cách gọi và đo một API đơn giản bằng Postman; nhận diện lỗi hiệu năng thật sự và ghi ticket kèm số liệu; nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: understand performance & API testing through the ShopEasy e-commerce app. Concepts of response time, load, throughput, SLA threshold; what an API is; how to call and measure a simple API with Postman; spotting real performance issues and logging tickets with numbers; many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでパフォーマンス＆APIテストを理解。応答時間・負荷・スループット・SLA閾値の概念、APIとは何か、Postmanでの簡単なAPI呼び出しと測定、本当の性能問題の見分け方と数値付きチケット起票、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách tự test hiệu năng & API cơ bản bằng Postman", steps: [
    { name: "Hiểu khái niệm hiệu năng", text: "Nắm thời gian phản hồi, tải, thông lượng, ngưỡng SLA trước khi bắt đầu đo." },
    { name: "Gọi API bằng Postman", text: "Gửi request GET, đọc status, thời gian phản hồi và dữ liệu trả về." },
    { name: "So sánh & ghi nhận", text: "So thời gian đo được với ngưỡng SLA; ghi ticket kèm số liệu nếu vượt ngưỡng." },
  ] },
  pages,
});

export const CNM_BEG_PERF_01 = [PERF_API_BEG_01];
