// doc_ma_backward_compat.mjs — BÀI MANUAL NÂNG CAO: Kiểm thử tương thích ngược & versioning API
// (Backward Compatibility & Versioning) cho nền tảng SaaS mở API công khai cho đối tác tích hợp
// (PayHub — SaaS thanh toán). Phân biệt breaking change vs non-breaking change, chiến lược
// versioning (URL path/header/semantic), tương thích dữ liệu/định dạng cũ, cờ tính năng
// (feature flag), nâng cấp dần. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, moduleFlow, postman, jira, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, kiểm thử API, versioning & dự án thực chiến.",
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
    tags: tags("congnghe", cfg.domain, "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

const ACCENT = "#0369a1";

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 1 — Bảng phân loại Breaking change vs Non-breaking change
// ══════════════════════════════════════════════════════════════════════════════════════
const m_breaking = grid("Breaking change vs Non-breaking change trong API PayHub", ["Loại thay đổi", "Ví dụ thực tế", "Ảnh hưởng tới client cũ"], [
  ["Đổi tên field JSON", "'customer_id' đổi thành 'customerId'", "Client cũ đọc field cũ ra null, có thể crash khi xử lý"],
  ["Xóa field đang dùng", "Bỏ field 'currency' khỏi response thanh toán", "Client cũ thiếu dữ liệu bắt buộc, hiển thị lỗi hoặc sai số tiền"],
  ["Đổi kiểu dữ liệu", "'amount' từ số nguyên (integer) sang chuỗi (string)", "Bộ parse cũ ép kiểu sai, tính toán ra số tiền sai"],
  ["Đổi mã lỗi HTTP", "Từ 400 Bad Request sang 422 Unprocessable Entity cho cùng lỗi", "Client cũ xử lý theo status code cụ thể sẽ rẽ nhánh sai luồng"],
  ["Thêm field mới (tùy chọn)", "Thêm 'riskScore' vào response giao dịch", "AN TOÀN — client cũ bỏ qua field lạ, không ảnh hưởng"],
  ["Thêm endpoint mới", "Mở thêm '/v2/refunds' song song '/v1/refunds'", "AN TOÀN — không đụng tới luồng cũ đang chạy"],
  ["Nới lỏng ràng buộc bắt buộc", "Field 'note' từ bắt buộc thành tùy chọn", "AN TOÀN với client cũ luôn gửi đủ field"],
], { accent: ACCENT, note: "Quy tắc cốt lõi: thêm mới KHÔNG phá vỡ; đổi/xóa cái ĐANG TỒN TẠI luôn tiềm ẩn breaking change." });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 2 — Ma trận ca kiểm thử: client v1 cũ gọi hệ thống đã nâng cấp lên v2
// ══════════════════════════════════════════════════════════════════════════════════════
const m_matrix = grid("Ca kiểm thử: client v1 (đối tác cũ) sau khi PayHub triển khai v2", ["Ca kiểm thử", "Điều kiện", "Kết quả mong đợi"], [
  ["Client v1 gọi lại đúng request cũ", "Request y hệt trước khi v2 lên production", "Response '/v1/*' giữ nguyên cấu trúc & tên field, không đổi"],
  ["Client v1 nhận field mới trong response v1", "Server âm thầm thêm field 'riskScore' vào response v1", "Client v1 bỏ qua field lạ, KHÔNG lỗi khi parse JSON"],
  ["Client v1 không gửi header phiên bản", "Request thiếu header 'Api-Version'", "Server mặc định route về v1 (an toàn) thay vì trả lỗi 500"],
  ["Client v1 vô tình gọi schema mới", "Đối tác cập nhật URL sang '/v2/payments' nhưng body vẫn theo schema v1", "Trả lỗi 4xx rõ ràng kèm hướng dẫn migrate, KHÔNG âm thầm sai số liệu"],
  ["Webhook đăng ký từ thời v1", "Đối tác đăng ký webhook trước khi có v2", "Payload webhook giữ đúng định dạng phiên bản đối tác đã đăng ký"],
  ["Client v1 gọi endpoint đã bị loại bỏ ở v2", "Endpoint '/v1/legacy-status' chỉ tồn tại ở v1", "Trả 410 Gone kèm thông báo deprecation, không phải 500 khó hiểu"],
], { accent: ACCENT, note: "Bộ ca này chạy lại mỗi lần release để đảm bảo KHÔNG phiên bản cũ nào bị phá vỡ ngầm." });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 3 — Sơ đồ versioning: v1 và v2 chạy song song, cùng một nguồn dữ liệu
// ══════════════════════════════════════════════════════════════════════════════════════
const m_flow = moduleFlow("Sơ đồ versioning API PayHub — v1 & v2 chạy song song", [
  { id: "old", label: "Đối tác cũ", sub: "tích hợp từ 2023, gọi /v1/*", x: 90, y: 60 },
  { id: "new", label: "Đối tác mới", sub: "tích hợp 2026, gọi /v2/*", x: 90, y: 240 },
  { id: "gw", label: "API Gateway", sub: "route theo Api-Version", x: 320, y: 150 },
  { id: "h1", label: "Handler v1", sub: "schema cũ, field snake_case", x: 550, y: 60 },
  { id: "h2", label: "Handler v2", sub: "schema mới, field camelCase", x: 550, y: 240 },
  { id: "db", label: "Kho dữ liệu chung", sub: "1 nguồn sự thật (single source)", x: 700, y: 150 },
], [
  { from: "old", to: "gw", label: "request /v1" },
  { from: "new", to: "gw", label: "request /v2" },
  { from: "gw", to: "h1", label: "route v1" },
  { from: "gw", to: "h2", label: "route v2" },
  { from: "h1", to: "db", label: "đọc/ghi" },
  { from: "h2", to: "db", label: "đọc/ghi" },
], { accent: ACCENT, h: 300 });

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 4 — Postman: client v1 gọi endpoint đã deprecate ở v2, nhận lỗi rõ ràng
// ══════════════════════════════════════════════════════════════════════════════════════
const m_postman = postman({
  method: "GET", url: "https://api.payhub.vn/v1/legacy-status/pm_8891",
  status: 410, time: "84 ms", size: "0.6 KB", ok: false,
  body: [
    "{",
    '  "error": "GONE",',
    '  "message": "Endpoint /v1/legacy-status da ngung ho tro tu 01/09/2026",',
    '  "migrateTo": "/v2/payments/{id}/status",',
    '  "docsUrl": "https://docs.payhub.vn/migration/v1-to-v2",',
    '  "sunsetDate": "2026-09-01"',
    "}",
  ],
});

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 5 — Ticket Jira của sự cố breaking change (đổi tên field làm app đối tác crash)
// ══════════════════════════════════════════════════════════════════════════════════════
const m_jira = jira({
  key: "PH-7742", title: "Đổi tên field 'customer_id' -> 'customerId' ở /v2/payments làm app đối tác VinaPOS crash",
  type: "Bug", status: "Confirmed", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "production · PayHub Public API v2 · đối tác VinaPOS (POS bán lẻ)"],
    ["Các bước", "1) VinaPOS gọi /v2/payments sau khi PayHub release 2) App đọc field 'customer_id' 3) Xử lý thanh toán"],
    ["Kết quả mong đợi", "Field 'customer_id' vẫn tồn tại như tài liệu API cũ mô tả, hoặc có cảnh báo deprecation trước"],
    ["Kết quả thực tế", "Field bị đổi tên thành 'customerId' không báo trước, app VinaPOS đọc null và crash toàn bộ luồng thanh toán"],
    ["Phạm vi ảnh hưởng", "~640 điểm bán của VinaPOS ngừng nhận thanh toán trong 47 phút"],
  ],
});

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 6 — Kanban theo dõi công việc versioning & deprecation
// ══════════════════════════════════════════════════════════════════════════════════════
const m_kanban = kanban("Bảng theo dõi versioning & deprecation API (PayHub · Q3/2026)", [
  { name: "Đề xuất", cards: [
    { key: "PH-VER-01", title: "Thêm ca kiểm thử hồi quy: client v1 nhận field mới trong response", sev: "High" },
  ] },
  { name: "Đang làm", cards: [
    { key: "PH-VER-02", title: "Bổ sung header cảnh báo Deprecation cho /v1/legacy-status", sev: "Critical" },
  ] },
  { name: "Đã áp dụng", cards: [
    { key: "PH-VER-03", title: "Feature flag bật dần schema mới cho 5% đối tác thử nghiệm", sev: "Medium" },
  ] },
  { name: "Đã xác nhận hiệu quả", cards: [
    { key: "PH-VER-04", title: "0 sự cố breaking change sau khi thêm test hồi quy đa phiên bản", sev: "Low" },
  ] },
]);

// ══════════════════════════════════════════════════════════════════════════════════════
// MOCKUP 7 — Dashboard số liệu: tỉ lệ đối tác theo phiên bản & sự cố tương thích
// ══════════════════════════════════════════════════════════════════════════════════════
const m_dash = dashboard("Số liệu tương thích ngược & versioning — PayHub Public API", [
  { label: "Đối tác còn dùng v1", value: "38%", sub: "~1.150 đối tác", color: "#0369a1" },
  { label: "Đối tác đã lên v2", value: "62%", sub: "tăng dần theo quý", color: "#16a34a" },
  { label: "Sự cố breaking change", value: "1", sub: "quý này, giảm từ 4", color: "#e11d48" },
  { label: "Ca kiểm thử tương thích", value: "86", sub: "chạy lại mỗi release", color: "#7c3aed" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử tương thích ngược (backward compatibility) khác gì kiểm thử hồi quy thông thường?",
  "How does backward-compatibility testing differ from regular regression testing?",
  "Kiểm thử hồi quy thông thường xác nhận CHÍNH hệ thống hiện tại vẫn hoạt động đúng sau thay đổi. Kiểm thử tương thích ngược đi xa hơn: nó xác nhận các CLIENT/PHIÊN BẢN CŨ ĐANG CHẠY Ở BÊN NGOÀI (app đối tác, tích hợp cũ, webhook đã đăng ký) vẫn hoạt động đúng khi hệ thống phía server đã thay đổi — dù bản thân tester không kiểm soát được code của những client đó. Vì vậy nó tập trung vào HỢP ĐỒNG DỮ LIỆU (contract) — cấu trúc request/response — thay vì chỉ hành vi nội bộ.",
  "Regular regression testing confirms the CURRENT system still works correctly after a change. Backward-compatibility testing goes further: it confirms OLD CLIENTS/VERSIONS RUNNING EXTERNALLY (partner apps, legacy integrations, registered webhooks) still work correctly after the server side changes — even though the tester doesn't control those clients' code. So it focuses on the DATA CONTRACT — request/response structure — rather than just internal behavior.",
  "後方互換性テスト（backward compatibility testing）は通常の回帰テストと何が違うのか？",
  "通常の回帰テストは、変更後も現在のシステム自体が正しく動くかを確認します。後方互換性テストはさらに進み、外部で稼働する古いクライアント/バージョン（パートナーアプリ、レガシー連携、登録済みWebhook）が、サーバー側の変更後も正しく動くかを確認します——テスターがそれらクライアントのコードを制御できなくてもです。そのため内部の挙動だけでなく、リクエスト/レスポンス構造というデータ契約に焦点を当てます。");
const faq2 = FAQ(
  "Vì sao chỉ tăng số phiên bản (version number) mà không kiểm thử tương thích vẫn có thể gây sự cố?",
  "Why can bumping the version number without compatibility testing still cause incidents?",
  "Tăng version number (v1 → v2) chỉ là một NHÃN quy ước — nó không tự động đảm bảo v1 vẫn hoạt động song song đúng cách. Nếu đội phát triển sửa chung một đoạn code xử lý cho cả v1 và v2 (ví dụ hàm tính tiền dùng chung), một thay đổi tưởng chỉ ảnh hưởng v2 vẫn có thể vô tình làm sai kết quả trả về ở v1. Chỉ có việc CHỦ ĐỘNG chạy lại bộ ca kiểm thử tương thích cho client cũ mới phát hiện được những rò rỉ như vậy trước khi đối tác gặp phải.",
  "Bumping the version number (v1 to v2) is just a naming CONVENTION — it doesn't automatically guarantee v1 keeps working correctly in parallel. If the dev team shares code between v1 and v2 (e.g. a common amount-calculation function), a change meant only for v2 can accidentally corrupt v1's output too. Only PROACTIVELY rerunning the backward-compatibility test suite for old clients catches such leaks before a partner hits them.",
  "互換性テストをせずバージョン番号を上げるだけでも、なぜインシデントが起きるのか？",
  "バージョン番号を上げる（v1→v2）ことは単なる命名規則にすぎず、v1が引き続き正しく並行動作することを自動的には保証しません。開発チームがv1とv2で共通のコード（例えば共通の金額計算関数）を修正すると、v2だけに影響するはずの変更がv1の出力を誤って壊すことがあります。古いクライアント向けの後方互換性テストスイートを積極的に再実行して初めて、パートナーが遭遇する前にこうした漏れを発見できます。");
const faq3 = FAQ(
  "Nên chọn versioning theo URL path (/v1/, /v2/) hay theo header (Api-Version) cho API công khai?",
  "Should a public API use URL-path versioning (/v1/, /v2/) or header-based versioning (Api-Version)?",
  "Không có lựa chọn đúng tuyệt đối, nhưng với API mở cho nhiều đối tác bên ngoài, versioning theo URL path thường thực dụng hơn: nó hiển thị rõ ràng trong log, dễ debug, dễ giới hạn traffic theo từng phiên bản, và đối tác không cần cấu hình header đặc biệt — chỉ cần đổi một đoạn URL khi sẵn sàng nâng cấp. Versioning theo header linh hoạt hơn về mặt kiến trúc (cùng một URL, khác hành vi) nhưng dễ bị đối tác quên gửi header, dẫn tới hành vi mặc định không rõ ràng nếu server không xử lý cẩn thận. Nhiều nền tảng lớn kết hợp cả hai: URL path cho phiên bản chính, header cho các thử nghiệm nhỏ (feature flag).",
  "There's no absolute right answer, but for a public API with many external partners, URL-path versioning is usually more practical: it's visible in logs, easy to debug, easy to rate-limit per version, and partners don't need special header config — they just change a URL segment when ready to upgrade. Header-based versioning is architecturally more flexible (same URL, different behavior) but partners can easily forget to send the header, leading to unclear default behavior if the server isn't careful. Many large platforms combine both: URL path for major versions, headers for smaller experiments (feature flags).",
  "公開APIではURLパスのバージョニング（/v1/、/v2/）とヘッダーベース（Api-Version）のどちらを選ぶべきか？",
  "絶対的な正解はありませんが、多数の外部パートナーを持つ公開APIでは、URLパスのバージョニングの方が実用的なことが多いです：ログで明確に見え、デバッグしやすく、バージョンごとのレート制限がしやすく、パートナーは特別なヘッダー設定不要で、準備ができたらURLの一部を変えるだけで済みます。ヘッダーベースは（同一URLで挙動が変わるため）アーキテクチャ上より柔軟ですが、パートナーがヘッダー送信を忘れやすく、サーバー側が慎重でないとデフォルト挙動が不明瞭になりがちです。多くの大規模プラットフォームは両方を組み合わせます：メジャーバージョンはURLパス、小さな実験（フィーチャーフラグ）はヘッダーで。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Đâu là ví dụ về BREAKING CHANGE trong API?", en: "Which is an example of a BREAKING CHANGE in an API?", ja: "APIにおけるBREAKING CHANGEの例はどれ？" },
    options: [
      { vi: "Thêm một field tùy chọn mới vào response", en: "Adding a new optional field to the response", ja: "レスポンスに新しい任意フィールドを追加する" },
      { vi: "Đổi tên field 'customer_id' thành 'customerId' trong response đang được dùng", en: "Renaming the in-use response field 'customer_id' to 'customerId'", ja: "使用中のレスポンスフィールド 'customer_id' を 'customerId' に改名する" },
      { vi: "Mở thêm một endpoint hoàn toàn mới", en: "Adding a brand-new endpoint", ja: "全く新しいエンドポイントを追加する" },
      { vi: "Nới lỏng một field từ bắt buộc thành tùy chọn", en: "Loosening a field from required to optional", ja: "あるフィールドを必須から任意に緩和する" },
    ], correct: 1,
    explain: { vi: "Đổi tên field đang được client cũ đọc khiến parser cũ không tìm thấy dữ liệu — đây là breaking change kinh điển.", en: "Renaming a field old clients already read makes their old parser find nothing there — a classic breaking change.", ja: "既存クライアントが読んでいるフィールド名を変えると、古いパーサーはデータを見つけられなくなる——典型的なbreaking changeです。" },
  }),
  mcq({
    q: { vi: "Mục đích chính của việc versioning API (v1, v2...) là gì?", en: "What is the main purpose of API versioning (v1, v2...)?", ja: "APIバージョニング（v1、v2など）の主な目的は？" },
    options: [
      { vi: "Cho phép nhiều phiên bản hợp đồng dữ liệu cùng tồn tại, để client cũ không bị phá vỡ khi server nâng cấp", en: "Let multiple data-contract versions coexist so old clients aren't broken when the server upgrades", ja: "サーバーがアップグレードしても古いクライアントが壊れないよう、複数のデータ契約バージョンを共存させること" },
      { vi: "Làm cho API trông chuyên nghiệp hơn", en: "Make the API look more professional", ja: "APIをより専門的に見せるため" },
      { vi: "Giảm số lượng request mà server phải xử lý", en: "Reduce the number of requests the server must handle", ja: "サーバーが処理するリクエスト数を減らすため" },
      { vi: "Thay thế hoàn toàn cho việc kiểm thử hồi quy", en: "Completely replace regression testing", ja: "回帰テストを完全に代替するため" },
    ], correct: 0,
    explain: { vi: "Versioning tạo ranh giới rõ ràng để nâng cấp hợp đồng dữ liệu mà không buộc mọi client phải đổi cùng lúc.", en: "Versioning creates a clear boundary to evolve the data contract without forcing every client to change at once.", ja: "バージョニングは、全クライアントを一斉に変更させることなくデータ契約を進化させる明確な境界を作ります。" },
  }),
  mcq({
    q: { vi: "Cờ tính năng (feature flag) giúp ích gì trong nâng cấp dần API?", en: "How does a feature flag help with gradually rolling out API changes?", ja: "フィーチャーフラグはAPIの段階的な移行にどう役立つ？" },
    options: [
      { vi: "Bật/tắt hành vi mới cho một nhóm nhỏ đối tác trước, thu hẹp rủi ro nếu có sự cố", en: "Turn new behavior on/off for a small partner group first, limiting risk if something breaks", ja: "まず一部の小さなパートナーグループに新しい挙動をオン/オフし、問題があった場合の影響を限定する" },
      { vi: "Tự động dịch tài liệu API sang nhiều ngôn ngữ", en: "Automatically translate API docs into multiple languages", ja: "APIドキュメントを自動的に多言語翻訳する" },
      { vi: "Xóa toàn bộ log hệ thống để tiết kiệm dung lượng", en: "Delete all system logs to save storage", ja: "ストレージ節約のため全システムログを削除する" },
      { vi: "Tăng tốc độ phản hồi của mọi endpoint", en: "Speed up the response time of every endpoint", ja: "全エンドポイントの応答速度を上げる" },
    ], correct: 0,
    explain: { vi: "Feature flag cho phép bật schema/hành vi mới cho một tỉ lệ nhỏ đối tác, quan sát rồi mở rộng dần thay vì bật đồng loạt.", en: "Feature flags let you enable a new schema/behavior for a small partner slice, observe, then expand gradually instead of a big-bang rollout.", ja: "フィーチャーフラグにより、一部のパートナーだけに新しいスキーマ/挙動を有効化し、観察してから徐々に拡大できます——一斉展開ではなく。" },
  }),
  mcq({
    q: { vi: "Khi PayHub muốn ngừng hỗ trợ (deprecate) một endpoint cũ, hành động ĐÚNG là gì?", en: "When PayHub wants to deprecate an old endpoint, what is the CORRECT action?", ja: "PayHubが古いエンドポイントを廃止（deprecate）したい場合、正しい行動は？" },
    options: [
      { vi: "Xóa endpoint ngay lập tức không báo trước để giảm chi phí bảo trì", en: "Delete the endpoint immediately without notice to cut maintenance cost", ja: "保守コスト削減のため予告なく即座にエンドポイントを削除する" },
      { vi: "Thông báo lịch sunset rõ ràng, trả cảnh báo deprecation, và cho thời gian đối tác migrate trước khi tắt hẳn", en: "Announce a clear sunset date, return deprecation warnings, and give partners time to migrate before fully shutting it down", ja: "明確な廃止予定日を告知し、廃止警告を返し、完全停止前にパートナーへ移行期間を与える" },
      { vi: "Chỉ cần đổi version number là đủ, không cần thông báo gì thêm", en: "Just bumping the version number is enough, no further notice needed", ja: "バージョン番号を変えるだけで十分で、それ以上の通知は不要" },
      { vi: "Giữ endpoint cũ mãi mãi, không bao giờ được phép loại bỏ", en: "Keep the old endpoint forever, it must never be removed", ja: "古いエンドポイントは永久に維持し、決して削除してはならない" },
    ], correct: 1,
    explain: { vi: "Deprecation có trách nhiệm cần lộ trình rõ ràng: thông báo trước, cảnh báo trong response, và thời gian chuyển tiếp — như ca 'Endpoint đã bị loại bỏ ở v2' trong bài.", en: "Responsible deprecation needs a clear roadmap: advance notice, in-response warnings, and a transition window — as in the article's 'endpoint removed in v2' case.", ja: "責任あるdeprecationには明確なロードマップが必要です：事前告知、レスポンス内の警告、移行期間——本記事の『v2で削除されたエンドポイント』のケースの通り。" },
  }),
  mcq({
    q: { vi: "Trong sự cố PH-7742 (VinaPOS crash), nguyên nhân gốc thuộc loại thay đổi nào?", en: "In incident PH-7742 (VinaPOS crash), the root cause belongs to which type of change?", ja: "インシデントPH-7742（VinaPOSクラッシュ）の根本原因はどの変更タイプに属す？" },
    options: [
      { vi: "Non-breaking change — thêm field mới an toàn", en: "A non-breaking change — safely adding a new field", ja: "ノンブレーキングチェンジ — 安全な新フィールドの追加" },
      { vi: "Breaking change — đổi tên field đang được client cũ dùng, không báo trước", en: "A breaking change — renaming a field old clients rely on, without notice", ja: "ブレーキングチェンジ — 旧クライアントが依存するフィールドを予告なく改名" },
      { vi: "Không liên quan tới versioning, chỉ là lỗi mạng tạm thời", en: "Unrelated to versioning, just a temporary network glitch", ja: "バージョニングとは無関係で、一時的なネットワーク障害に過ぎない" },
      { vi: "Do đối tác VinaPOS tự viết sai code, PayHub không có lỗi", en: "Caused entirely by VinaPOS's own bad code, PayHub had no fault", ja: "すべてVinaPOS自身のコードの誤りで、PayHub側に問題はない" },
    ], correct: 1,
    explain: { vi: "Đổi tên field 'customer_id' → 'customerId' mà không có cảnh báo/song song hai tên là breaking change điển hình, khiến client cũ đọc null và crash.", en: "Renaming 'customer_id' to 'customerId' without warning or a dual-field transition is a textbook breaking change, causing old clients to read null and crash.", ja: "'customer_id'を'customerId'に警告や両立期間なく改名したことは典型的なbreaking changeであり、旧クライアントがnullを読みクラッシュした。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bức tranh hệ thống bạn sẽ kiểm thử", en: "1. TL;DR & the system landscape you'll test", ja: "1. 要点とテスト対象システムの全体像" },
    blocks: [
      TLDR("Kiểm thử tương thích ngược (backward compatibility) là việc xác nhận các client/đối tác đang tích hợp API PHIÊN BẢN CŨ vẫn hoạt động đúng sau khi server nâng cấp — song song với việc kiểm thử versioning (v1/v2), phân biệt breaking change (phá vỡ client cũ) và non-breaking change (an toàn), cùng cách dùng feature flag để nâng cấp dần. Bài này bám nền tảng SaaS thanh toán PayHub mở API công khai cho hàng nghìn đối tác tích hợp: bạn học cách xây ma trận ca kiểm thử đa phiên bản, xử lý sự cố thật (đổi tên field làm app đối tác crash), và quy trình deprecation có trách nhiệm. Nhiều mockup thực tế và trắc nghiệm cuối bài.",
        "Backward-compatibility testing confirms that clients/partners still integrated with an OLDER API version keep working correctly after the server upgrades — alongside testing versioning (v1/v2), telling breaking changes (which break old clients) apart from non-breaking ones (safe), and using feature flags for gradual rollout. This article follows PayHub, a payment SaaS platform with a public API used by thousands of integration partners: you'll learn to build a multi-version test matrix, handle a real incident (a field rename crashing a partner's app), and a responsible deprecation process. Many real mockups and a quiz at the end.",
        "後方互換性テスト（backward compatibility）とは、サーバーがアップグレードした後も、古いバージョンのAPIを使い続けるクライアント/パートナーが正しく動作することを確認する作業です。あわせてバージョニング（v1/v2）のテスト、旧クライアントを壊すbreaking changeと安全なnon-breaking changeの区別、段階的展開のためのフィーチャーフラグの使い方も学びます。本記事は、数千の連携パートナーを持つ公開APIを提供する決済SaaSプラットフォームPayHubに沿い、複数バージョンのテストマトリクスの作り方、実際のインシデント（フィールド名変更によるパートナーアプリのクラッシュ）への対応、責任あるdeprecationプロセスを学びます。実践的なモックとクイズ付き。"),
      P("Chào bạn! Khi một hệ thống nội bộ nâng cấp, mọi thứ đơn giản: bạn kiểm soát cả server lẫn client, deploy đồng thời là xong. Nhưng với một nền tảng SaaS mở API công khai cho đối tác bên ngoài — như PayHub cho các điểm bán POS, ví điện tử, sàn thương mại điện tử — bạn KHÔNG kiểm soát được code phía đối tác. Họ có thể chưa cập nhật app trong nhiều tháng, thậm chí nhiều năm. Kiểm thử tương thích ngược và versioning là kỹ năng nâng cao giúp bạn — với vai trò tester — đảm bảo mỗi lần server nâng cấp, hàng nghìn tích hợp đang chạy ngoài kia không bị 'sập' theo.",
        "Hi! When an internal system upgrades, everything's simple: you control both server and client, deploy together, done. But for a SaaS platform with a public API used by outside partners — like PayHub serving POS terminals, e-wallets, e-commerce marketplaces — you do NOT control the partner's code. They may not have updated their app in months, even years. Backward-compatibility and versioning testing is an advanced skill that, as a tester, lets you ensure that every time the server upgrades, the thousands of live integrations out there don't 'collapse' along with it.",
        "こんにちは！社内システムのアップグレードなら話は単純です：サーバーとクライアントの両方を制御し、同時にデプロイすれば済みます。しかし、POS端末、電子ウォレット、ECマーケットプレイスにサービスを提供するPayHubのように、外部パートナーが使う公開APIを持つSaaSプラットフォームでは、パートナー側のコードを制御できません。彼らは何か月も、時には何年もアプリを更新していないかもしれません。後方互換性とバージョニングのテストは、テスターとしてサーバーがアップグレードするたびに、外で稼働する数千の連携が一緒に『崩壊』しないことを保証する上級スキルです。"),
      IMG(m_flow, "Sơ đồ versioning API PayHub: đối tác cũ (v1) và đối tác mới (v2) cùng đi qua API Gateway, chia sẻ một nguồn dữ liệu", "PayHub API versioning diagram: old (v1) and new (v2) partners both pass through the API Gateway, sharing one data source", "PayHub APIバージョニング図：旧（v1）と新（v2）のパートナーは共にAPI Gatewayを通り、1つのデータソースを共有する"),
      DEF("Backward Compatibility (tương thích ngược)", "khả năng của một hệ thống đã nâng cấp vẫn phục vụ đúng các client/phiên bản cũ hơn mà không yêu cầu chúng phải thay đổi ngay lập tức.",
        "the ability of an upgraded system to still correctly serve older clients/versions without requiring them to change immediately.",
        "アップグレードされたシステムが、古いクライアント/バージョンに即座の変更を求めることなく引き続き正しく応答できる能力。"),
    ] },
  { heading: { vi: "2. Vì sao tương thích ngược là sống còn với SaaS có API công khai", en: "2. Why backward compatibility is life-or-death for a public-API SaaS", ja: "2. 公開APIを持つSaaSにとって後方互換性が死活問題である理由" },
    blocks: [
      P("Với một website nội bộ, một lỗi giao diện có thể được sửa và deploy lại trong vài phút. Nhưng với một API công khai, 'client' của bạn là code đã được BIÊN DỊCH VÀ TRIỂN KHAI bên trong hệ thống của hàng nghìn đối tác khác nhau — bạn không thể 'sửa và deploy lại' hộ họ. Một breaking change không báo trước có thể khiến hàng trăm điểm bán ngừng nhận thanh toán cùng lúc, như sự cố PH-7742 trong bài này khiến ~640 điểm bán của đối tác VinaPOS ngừng hoạt động 47 phút.",
        "With an internal website, a UI bug can be fixed and redeployed within minutes. But with a public API, your 'client' is code already COMPILED AND DEPLOYED inside thousands of different partners' systems — you cannot 'fix and redeploy' it for them. An unannounced breaking change can knock out hundreds of merchants' payment flow at once, as in this article's PH-7742 incident that took down ~640 VinaPOS outlets for 47 minutes.",
        "社内向けWebサイトなら、UIバグは数分で修正・再デプロイできます。しかし公開APIでは、あなたの『クライアント』は数千の異なるパートナーのシステム内にすでにコンパイル・デプロイされたコードです——あなたが代わりに『修正して再デプロイ』することはできません。予告なしのbreaking changeは、本記事のPH-7742インシデント（VinaPOSの約640店舗が47分間決済を停止）のように、一度に何百もの加盟店の決済フローを止めてしまうことがあります。"),
      P("Ngoài thiệt hại tức thời, sự cố tương thích ngược còn phá hủy NIỀM TIN của đối tác — thứ khó xây dựng lại hơn nhiều so với một dòng code. Một đối tác từng bị 'gãy' tích hợp không báo trước sẽ luôn dè chừng, yêu cầu kiểm thử thủ công kỹ hơn ở mọi lần nâng cấp sau, làm chậm cả tốc độ phát triển sản phẩm của chính PayHub. Vì vậy, đầu tư vào kiểm thử tương thích ngược không chỉ là phòng lỗi kỹ thuật — đó là bảo vệ mối quan hệ kinh doanh.",
        "Beyond the immediate damage, a compatibility incident also destroys partner TRUST — far harder to rebuild than a line of code. A partner once burned by an unannounced integration break will stay wary forever, demanding heavier manual testing on every future upgrade, slowing down PayHub's own product velocity. So investing in backward-compatibility testing isn't just bug prevention — it's protecting the business relationship.",
        "即時的な被害に加え、互換性インシデントはパートナーの信頼——1行のコードよりはるかに再構築が難しいもの——も破壊します。予告なく連携を『壊された』パートナーは常に警戒し続け、以後のすべてのアップグレードでより厳しい手動テストを求め、PayHub自身のプロダクト開発速度を遅らせます。したがって後方互換性テストへの投資は単なるバグ防止ではなく、ビジネス上の関係を守ることでもあります。"),
      P("Đây cũng là lý do vì sao kiểm thử tương thích ngược thuộc nhóm kỹ năng nâng cao: nó đòi hỏi tư duy vượt ra ngoài 'hệ thống của tôi có chạy đúng không' để trả lời 'MỌI PHIÊN BẢN đang tồn tại ngoài kia có còn chạy đúng không' — một phạm vi kiểm thử rộng hơn hẳn kiểm thử chức năng thông thường.",
        "This is also why backward-compatibility testing is an advanced-tier skill: it requires thinking beyond 'does my system work correctly' to answer 'does EVERY VERSION that exists out there still work correctly' — a far broader testing scope than ordinary functional testing.",
        "これが後方互換性テストが上級スキルに分類される理由でもあります：『自分のシステムが正しく動くか』を超えて、『外に存在するあらゆるバージョンが引き続き正しく動くか』に答える思考が求められます——通常の機能テストよりはるかに広い範囲です。"),
    ] },
  { heading: { vi: "3. Breaking change vs Non-breaking change — phân loại rõ ràng", en: "3. Breaking change vs non-breaking change — a clear taxonomy", ja: "3. Breaking changeとNon-breaking changeの明確な分類" },
    blocks: [
      P("Trước khi viết được ca kiểm thử tốt, bạn cần phân loại chính xác một thay đổi API là BREAKING (phá vỡ client cũ) hay NON-BREAKING (an toàn). Quy tắc cốt lõi: thêm mới một cách CỘNG THÊM (additive) thường an toàn; đổi hoặc xóa cái ĐANG TỒN TẠI mà client cũ phụ thuộc vào luôn tiềm ẩn rủi ro phá vỡ.",
        "Before writing good test cases, you need to accurately classify an API change as BREAKING (breaks old clients) or NON-BREAKING (safe). The core rule: ADDITIVE changes are usually safe; changing or removing something EXISTING that old clients depend on always carries breaking risk.",
        "良いテストケースを書く前に、あるAPI変更がBREAKING（旧クライアントを壊す）かNON-BREAKING（安全）かを正確に分類する必要があります。基本原則：加算的（additive）な追加は通常安全であり、旧クライアントが依存する既存のものを変更・削除することは常に破壊リスクを伴います。"),
      IMG(m_breaking, "Bảng phân loại breaking change vs non-breaking change trong API PayHub", "A table classifying breaking vs non-breaking changes in the PayHub API", "PayHub APIにおけるbreaking/non-breaking changeの分類表"),
      P("Nhìn bảng trên, bạn thấy các thay đổi rủi ro cao đều rơi vào 4 nhóm: đổi TÊN field, XÓA field, đổi KIỂU dữ liệu, và đổi MÃ LỖI/hành vi mà client cũ đang dựa vào để rẽ nhánh xử lý. Ngược lại, thêm field mới tùy chọn hoặc thêm endpoint hoàn toàn mới hầu như luôn an toàn — vì các bộ parse JSON tiêu chuẩn (và client được viết đúng chuẩn) sẽ bỏ qua field lạ mà không lỗi.",
        "Looking at the table, high-risk changes fall into 4 groups: renaming a field, removing a field, changing a data type, and changing an error code/behavior old clients branch their logic on. Conversely, adding a new optional field or a brand-new endpoint is almost always safe — because standard JSON parsers (and correctly written clients) ignore unknown fields without erroring.",
        "上の表を見ると、高リスクな変更は4つのグループに分類されます：フィールド名の変更、フィールドの削除、データ型の変更、そして旧クライアントが分岐処理に依存しているエラーコード/挙動の変更です。逆に、新しい任意フィールドの追加や全く新しいエンドポイントの追加はほぼ常に安全です——標準的なJSONパーサー（および正しく書かれたクライアント）は未知のフィールドをエラーなく無視するためです。"),
      DEF("Breaking change", "một thay đổi ở phía server khiến ít nhất một client/phiên bản đang tồn tại không còn hoạt động đúng như trước, dù client đó không tự thay đổi gì.",
        "a server-side change that makes at least one existing client/version stop working correctly as before, even though that client changed nothing itself.",
        "サーバー側の変更により、既存の少なくとも1つのクライアント/バージョンが、それ自体は何も変更していないのに以前どおり正しく動作しなくなること。"),
      TIP("Khi nghi ngờ một thay đổi có phải breaking change không, hãy tự hỏi: 'Nếu client KHÔNG đổi một dòng code nào, response/behavior mới có còn khiến nó chạy đúng không?' — nếu câu trả lời là KHÔNG, đó là breaking change.", "When unsure if a change is breaking, ask: 'If the client changes NOT ONE line of code, will the new response/behavior still let it run correctly?' — if the answer is NO, it's a breaking change.", "ある変更がbreaking changeかどうか迷ったら自問しよう：『クライアントが1行もコードを変えなければ、新しいレスポンス/挙動でも正しく動き続けるか？』——答えが『いいえ』ならbreaking changeです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: chiến lược versioning cho API công khai", en: "4. Prepare: versioning strategies for a public API", ja: "4. 準備：公開APIのバージョニング戦略" },
    blocks: [
      P("Trước khi kiểm thử, bạn cần hiểu PayHub đang dùng chiến lược versioning nào, vì mỗi chiến lược sinh ra một bộ ca kiểm thử khác nhau.",
        "Before testing, you need to understand which versioning strategy PayHub uses, because each strategy produces a different set of test cases.",
        "テストの前に、PayHubがどのバージョニング戦略を使っているかを理解する必要があります。戦略ごとに必要なテストケースが異なるためです。"),
      STEP(1, "Versioning theo URL path ('/v1/payments', '/v2/payments'): rõ ràng, dễ log, dễ giới hạn traffic riêng từng phiên bản — PayHub dùng chiến lược này cho phiên bản chính.", "URL-path versioning ('/v1/payments', '/v2/payments'): clear, easy to log, easy to rate-limit per version — PayHub uses this for major versions.", "URLパスによるバージョニング（'/v1/payments'、'/v2/payments'）：明確でログしやすく、バージョンごとのレート制限もしやすい——PayHubはメジャーバージョンにこれを使用。"),
      STEP(2, "Versioning theo header ('Api-Version: 2026-07-01'): dùng cho các thay đổi nhỏ, thử nghiệm dần mà không cần đổi URL — kết hợp với feature flag.", "Header versioning ('Api-Version: 2026-07-01'): used for small, gradually-tested changes without changing the URL — combined with feature flags.", "ヘッダーによるバージョニング（'Api-Version: 2026-07-01'）：URLを変えずに小さな変更を段階的に試すために使用——フィーチャーフラグと組み合わせる。"),
      STEP(3, "Semantic versioning cho SDK/thư viện client chính thức (major.minor.patch): major đổi khi có breaking change, minor/patch luôn an toàn để nâng cấp tự động.", "Semantic versioning for official client SDKs/libraries (major.minor.patch): major changes on a breaking change, minor/patch are always safe to auto-upgrade.", "公式クライアントSDK/ライブラリのセマンティックバージョニング（major.minor.patch）：breaking changeがある時のみmajorを上げ、minor/patchは常に自動アップグレードして安全。"),
      TRY("Mở tài liệu API của một dịch vụ bạn từng dùng (ngân hàng, ví điện tử, mạng xã hội) và tìm xem họ đang dùng versioning theo URL path hay theo header.", "Open the API docs of a service you've used (a bank, an e-wallet, a social network) and find out whether they use URL-path or header-based versioning.", "使ったことのあるサービス（銀行、電子ウォレット、SNS）のAPIドキュメントを開き、URLパスかヘッダーどちらのバージョニングを使っているか調べよう。"),
      PITFALL("Nghĩ rằng chỉ cần 'giữ đúng số version' là đủ an toàn. Version number chỉ là quy ước hiển thị — an toàn thực sự đến từ việc CHỦ ĐỘNG chạy lại bộ ca kiểm thử tương thích cho từng phiên bản mỗi lần release, không phải từ cái tên v1/v2.", "Thinking 'just keeping the version number right' is enough. The version number is only a display convention — real safety comes from PROACTIVELY rerunning the compatibility test suite for each version on every release, not from the v1/v2 label itself.", "『バージョン番号さえ正しければ十分』と考えること。バージョン番号は単なる表示上の慣習に過ぎません——本当の安全性は、v1/v2というラベル自体からではなく、リリースのたびに各バージョン向けの互換性テストスイートを積極的に再実行することから生まれます。"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử tương thích ngược từng bước (thực hành)", en: "5. Writing backward-compatibility test cases step by step (hands-on)", ja: "5. 後方互換性テストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào endpoint '/payments' của PayHub trước khi release v2 — nơi có rủi ro cao nhất vì hàng nghìn đối tác đang gọi mỗi ngày. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử tương thích đầy đủ trước khi phát hành.",
        "Now let's apply this for real to PayHub's '/payments' endpoint before releasing v2 — the highest-risk spot since thousands of partners call it daily. Follow the order below for a complete pre-release compatibility test suite.",
        "では、v2リリース前のPayHubの'/payments'エンドポイントに実際に適用しましょう——毎日数千のパートナーが呼び出す最もリスクの高い箇所です。以下の順序でリリース前の完全な互換性テストスイートを作成します。"),
      STEP(1, "Chụp lại (snapshot) toàn bộ request/response mẫu của v1 hiện tại làm baseline — đây là 'hợp đồng' cần giữ nguyên.", "Snapshot the current v1's sample request/response pairs as a baseline — this is the 'contract' that must be preserved.", "現在のv1のサンプルリクエスト/レスポンスをベースラインとしてスナップショットする——これが維持すべき『契約』となる。"),
      STEP(2, "Deploy thay đổi lên môi trường staging, sau đó GỬI LẠI đúng các request baseline đó vào '/v1/*' và so sánh response với baseline — mọi field/kiểu dữ liệu phải khớp.", "Deploy the change to staging, then RESEND those exact baseline requests to '/v1/*' and diff the response against the baseline — every field/type must match.", "変更をステージング環境にデプロイし、そのベースラインリクエストを'/v1/*'にそのまま再送信してベースラインとレスポンスを比較する——全フィールド/型が一致しなければならない。"),
      STEP(3, "Kiểm thêm ca 'field mới xuất hiện ở response v1' bằng cách assert rằng CHỈ field cũ được kiểm tra chặt, field mới chỉ cần tồn tại (không bắt buộc client phải đọc).", "Add a case for 'new field appearing in v1's response' by asserting only old fields are strictly checked, while the new field only needs to exist (clients aren't required to read it).", "'v1のレスポンスに新フィールドが出現するケース'を追加し、既存フィールドのみ厳密にチェックし、新フィールドは存在するだけでよい（クライアントが読む必要はない）とアサートする。"),
      STEP(4, "Kiểm ca lỗi: gọi endpoint đã bị loại bỏ, gọi thiếu header version, gửi payload theo schema cũ vào route mới — mỗi ca phải trả lỗi RÕ RÀNG, không phải 500 chung chung.", "Test error cases: calling a removed endpoint, missing the version header, sending an old-schema payload to the new route — each must return a CLEAR error, not a generic 500.", "エラーケースをテストする：削除済みエンドポイントの呼び出し、バージョンヘッダーの欠如、旧スキーマのペイロードを新ルートへ送信——それぞれ汎用的な500ではなく明確なエラーを返すべき。"),
      CODE("text", "BO CA KIEM THU TUONG THICH NGUOC - endpoint '/payments' truoc khi release v2\nCa 1: Resend request baseline v1 -> Expected: response khop 100% cau truc/field cu | Actual: khop\nCa 2: Response v1 co them field 'riskScore' -> Expected: client v1 bo qua, khong loi | Actual: bo qua dung\nCa 3: Thieu header 'Api-Version' -> Expected: mac dinh route v1 | Actual: mac dinh dung\nCa 4: Goi '/v1/legacy-status' da bi go bo -> Expected: 410 Gone + huong dan migrate | Actual: 410 dung\nCa 5: Body schema v1 gui vao '/v2/payments' -> Expected: 4xx ro rang | Actual: BUG - server tra 500"),
      IMG(m_matrix, "Ma trận ca kiểm thử: client v1 (đối tác cũ) sau khi PayHub triển khai v2", "Test matrix: v1 clients (old partners) after PayHub rolls out v2", "テストマトリクス：PayHubがv2を展開した後のv1クライアント（旧パートナー）"),
    ] },
  { heading: { vi: "6. Thực hành tiếp: kiểm thử dữ liệu/định dạng cũ & nâng cấp dần bằng feature flag", en: "6. Continued practice: testing legacy data/formats & gradual rollout with feature flags", ja: "6. 実習続き：旧データ/形式のテストとフィーチャーフラグによる段階的移行" },
    blocks: [
      P("Tương thích ngược không chỉ là hình dạng của request/response — nó còn là DỮ LIỆU đã lưu từ trước. Với PayHub, hàng triệu giao dịch cũ đã lưu theo schema v1 vẫn phải đọc được đúng khi hệ thống chuyển sang lưu theo schema v2.",
        "Backward compatibility isn't just about request/response shape — it's also about data STORED beforehand. For PayHub, millions of old transactions saved under the v1 schema must still be read correctly after the system switches to storing under the v2 schema.",
        "後方互換性はリクエスト/レスポンスの形だけの問題ではなく、事前に保存されたデータの問題でもあります。PayHubでは、v1スキーマで保存された数百万件の過去の取引が、システムがv2スキーマでの保存に切り替わった後も正しく読み込めなければなりません。"),
      STEP(1, "Viết ca đọc lại một giao dịch CŨ đã lưu trước khi có v2, xác nhận API v2 vẫn trả về đúng field tương ứng (có thể qua lớp chuyển đổi/adapter).", "Write a case reading back an OLD transaction saved before v2 existed, confirming the v2 API still returns the corresponding fields correctly (possibly via a conversion/adapter layer).", "v2が存在する前に保存された古い取引を読み戻すケースを書き、v2 APIが対応するフィールドを正しく返すことを確認する（変換/アダプター層を介する場合もある）。"),
      STEP(2, "Viết ca ghi một giao dịch MỚI theo schema v2, rồi thử đọc lại bằng endpoint '/v1/*' — xác nhận vẫn có đủ field mà client v1 cần, dù dữ liệu gốc đã ở định dạng mới.", "Write a case writing a NEW transaction under the v2 schema, then reading it back via '/v1/*' — confirming all fields v1 clients need are still present, even though the underlying data is now the new format.", "v2スキーマで新しい取引を書き込み、'/v1/*'エンドポイントで読み戻すケースを書く——元データが新形式でも、v1クライアントが必要とする全フィールドが揃っていることを確認する。"),
      STEP(3, "Bật feature flag cho schema mới với 5% đối tác thử nghiệm trước, theo dõi tỉ lệ lỗi trong 48 giờ, rồi mới mở rộng dần lên 25%, 50%, 100% — không bao giờ bật đồng loạt cho toàn bộ đối tác cùng lúc.", "Enable the new schema's feature flag for a 5% test-partner slice first, watch the error rate for 48 hours, then gradually widen to 25%, 50%, 100% — never flip it on for all partners at once.", "まず5%のテストパートナーに新スキーマのフィーチャーフラグを有効化し、48時間エラー率を監視してから25%、50%、100%へ段階的に拡大する——全パートナーへ一斉に有効化しては決してならない。"),
      IMG(m_postman, "Client v1 gọi endpoint đã ngừng hỗ trợ ở v2 — nhận lỗi 410 Gone RÕ RÀNG kèm hướng dẫn migrate, thay vì lỗi 500 khó hiểu", "A v1 client calling a deprecated v2 endpoint — receives a CLEAR 410 Gone with migration guidance, instead of a confusing 500", "v2で廃止されたエンドポイントを呼ぶv1クライアント——分かりにくい500ではなく、移行案内付きの明確な410 Goneを受け取る"),
      TIP("Feature flag không chỉ để BẬT tính năng mới — nó còn là 'nút tắt khẩn cấp' (kill switch). Luôn kiểm thử luôn cả kịch bản TẮT flag giữa chừng để xác nhận hệ thống quay lại hành vi cũ an toàn, không kẹt ở trạng thái nửa vời.", "A feature flag isn't just for TURNING ON new features — it's also an emergency 'kill switch'. Always also test the scenario of turning the flag OFF mid-way to confirm the system safely reverts to old behavior, not getting stuck half-migrated.", "フィーチャーフラグは新機能を『オン』にするためだけでなく、緊急時の『killスイッチ』でもあります。フラグを途中で『オフ』にするシナリオも必ずテストし、システムが中途半端な状態で止まらず安全に旧挙動へ戻ることを確認しましょう。"),
    ] },
  { heading: { vi: "7. Tình huống 1: đổi tên field JSON làm app đối tác crash", en: "7. Situation 1: renaming a JSON field crashes a partner's app", ja: "7. シーン1：JSONフィールド名の変更でパートナーアプリがクラッシュ" },
    blocks: [
      SITUATION("Đội phát triển PayHub chuẩn hóa lại quy ước đặt tên field từ snake_case sang camelCase cho response '/v2/payments', đổi 'customer_id' thành 'customerId' — và vì cùng một hàm serialize dùng chung, thay đổi này vô tình lan sang cả response '/v1/payments' đang chạy production.", "PayHub's dev team standardizes field naming from snake_case to camelCase for the '/v2/payments' response, renaming 'customer_id' to 'customerId' — and because the same serializer function is shared, this change accidentally leaks into the live '/v1/payments' response too.",
        "Đối tác VinaPOS (POS bán lẻ) đang tích hợp '/v1/payments' đọc field 'customer_id' để hiển thị tên khách hàng trên hóa đơn. Field này giờ trả về null, app VinaPOS crash toàn bộ luồng thanh toán tại ~640 điểm bán trong 47 phút.",
        "Partner VinaPOS (a retail POS system) integrated with '/v1/payments' reads the 'customer_id' field to display the customer name on receipts. That field now returns null, and VinaPOS's app crashes the entire payment flow at ~640 outlets for 47 minutes.",
        "PayHubの開発チームは'/v2/payments'レスポンスのフィールド命名規則をsnake_caseからcamelCaseに標準化し、'customer_id'を'customerId'に改名した——同じシリアライズ関数を共用していたため、この変更が誤って本番稼働中の'/v1/payments'レスポンスにも漏れ込んだ。",
        "'/v1/payments'に連携しているパートナーVinaPOS（小売POSシステム）は、領収書に顧客名を表示するため'customer_id'フィールドを読んでいた。このフィールドが今やnullを返すようになり、VinaPOSのアプリは約640店舗で47分間、決済フロー全体をクラッシュさせた。"),
      SOLVE("Rollback ngay serializer về trạng thái cũ cho '/v1/*' để khôi phục dịch vụ; sau đó TÁCH RIÊNG hàm serialize cho v1 và v2 (không dùng chung), bổ sung ca kiểm thử 'resend baseline v1' vào bộ hồi quy bắt buộc trước mọi release, và với v2 mới, trả CẢ HAI tên field ('customer_id' lẫn 'customerId') trong một giai đoạn chuyển tiếp trước khi loại bỏ hẳn tên cũ.", "Immediately roll back the serializer for '/v1/*' to restore service; then SEPARATE the v1 and v2 serializer functions (stop sharing them), add the 'resend v1 baseline' case to the mandatory pre-release regression suite, and for the new v2, return BOTH field names ('customer_id' and 'customerId') during a transition period before fully removing the old name.", "サービス復旧のため即座にシリアライザを'/v1/*'向けに旧状態へロールバックする。その後、v1とv2のシリアライザ関数を分離（共用をやめる）し、『v1ベースラインの再送信』ケースをリリース前必須の回帰スイートに追加し、新しいv2では旧名を完全に廃止する前の移行期間中、両方のフィールド名（'customer_id'と'customerId'）を返すようにする。"),
      P("Đây là bài học lớn nhất trong chương này: nguyên nhân gốc không nằm ở 'ý định đổi tên field' — điều đó hoàn toàn hợp lý cho v2 — mà nằm ở việc DÙNG CHUNG code phục vụ nhiều phiên bản mà không có ca kiểm thử hồi quy tương thích để bắt được rò rỉ. Bất kỳ khi nào một thay đổi 'chỉ nhắm tới v2' chạm vào code dùng chung, bạn bắt buộc phải kiểm thử lại toàn bộ baseline v1.",
        "This is the biggest lesson in this chapter: the root cause isn't the 'intent to rename the field' — that's perfectly reasonable for v2 — but SHARING code across multiple versions without a compatibility regression suite to catch the leak. Any time a change 'meant only for v2' touches shared code, you must retest the entire v1 baseline.",
        "この章での最大の教訓です：根本原因は『フィールド名を変更する意図』——v2にとってはまったく妥当なことです——ではなく、複数バージョンにまたがるコードを共用しながら、漏れを検出する互換性回帰テストがなかったことにあります。『v2だけを対象とした』変更が共用コードに触れるときは、必ずv1のベースライン全体を再テストする必要があります。"),
      IMG(m_jira, "Ticket lỗi PH-7742: đổi tên field không kiểm soát làm app đối tác crash", "Bug ticket PH-7742: an uncontrolled field rename crashes a partner's app", "バグチケットPH-7742：制御されていないフィールド名変更がパートナーアプリをクラッシュさせた"),
      RECAP(["Thay đổi 'chỉ nhắm v2' vẫn có thể rò rỉ sang v1 nếu dùng chung code", "Luôn resend baseline v1 trong bộ hồi quy trước mọi release có đụng code dùng chung"],
        ["A 'v2-only' change can still leak into v1 if code is shared", "Always resend the v1 baseline in the regression suite before any release touching shared code"],
        ["共用コードがあれば『v2専用』の変更もv1に漏れうる", "共用コードに触れるリリース前は必ずv1ベースラインを回帰テストで再送信する"]),
    ] },
  { heading: { vi: "8. Tình huống 2: bỏ field bắt buộc cũ gây lỗi client", en: "8. Situation 2: dropping an old required field breaks a client", ja: "8. シーン2：旧来の必須フィールドの削除がクライアントを破壊" },
    blocks: [
      SITUATION("Để đơn giản hóa API v2, đội PayHub bỏ hẳn field 'legacy_reference_code' khỏi response '/payments' — field này được xem là 'không còn ai dùng' theo khảo sát nội bộ, và bị xóa luôn ở CẢ v1 lẫn v2 trong cùng một lần release.", "To simplify v2, PayHub's team removes the 'legacy_reference_code' field entirely from the '/payments' response — considered 'nobody uses it anymore' per an internal survey, and it's dropped from BOTH v1 and v2 in the same release.",
        "Một đối tác ví điện tử nhỏ (tích hợp v1 từ 2021, không có liên hệ hỗ trợ chủ động) vẫn dùng field này để đối soát công nợ hằng ngày. Khi field biến mất, hệ thống đối soát của họ báo sai lệch số liệu suốt 3 ngày trước khi họ liên hệ PayHub.",
        "A small e-wallet partner (integrated with v1 since 2021, with no proactive support contact) still uses this field for daily reconciliation. When the field disappears, their reconciliation system reports data mismatches for 3 days before they contact PayHub.",
        "v2を簡素化するため、PayHubチームは'/payments'レスポンスから'legacy_reference_code'フィールドを完全に削除した——社内調査で『もう誰も使っていない』とみなされ、同じリリースでv1とv2の両方から削除された。",
        "小規模な電子ウォレットパートナー（2021年からv1に連携し、積極的なサポート連絡先を持たない）は、日次消込にこのフィールドを今も使用していた。フィールドが消えると、彼らの消込システムは3日間データ不一致を報告し続け、ようやくPayHubに連絡した。"),
      SOLVE("Khôi phục field 'legacy_reference_code' ở '/v1/*' (không được xóa field ở v1 dù đã bị loại bỏ ở v2); thiết lập quy trình BẮT BUỘC trước khi xóa bất kỳ field nào ở v1: kiểm tra log truy cập thực tế trong ít nhất 90 ngày (không chỉ dựa vào khảo sát/giả định), và gửi cảnh báo deprecation qua cả email lẫn header response cho các đối tác vẫn còn gọi field đó.", "Restore 'legacy_reference_code' on '/v1/*' (a field must never be removed from v1 even if dropped from v2); establish a MANDATORY process before removing any v1 field: check actual access logs for at least 90 days (not just a survey/assumption), and send deprecation warnings via both email and a response header to partners still calling that field.", "'/v1/*'で'legacy_reference_code'フィールドを復元する（v2で廃止されてもv1からフィールドを削除してはならない）。v1のいかなるフィールドも削除する前に必須のプロセスを確立する：少なくとも90日間の実際のアクセスログを確認する（調査や推測だけに頼らない）、そのフィールドを呼び続けているパートナーへメールとレスポンスヘッダーの両方でdeprecation警告を送る。"),
      P("Ví dụ này cho thấy 'không còn ai dùng' là một GIẢ ĐỊNH nguy hiểm nếu không được xác nhận bằng DỮ LIỆU THỰC TẾ (log truy cập). Đối tác nhỏ, ít liên hệ, tích hợp lâu năm chính là nhóm dễ bị bỏ sót nhất khi ra quyết định dựa trên khảo sát chủ quan thay vì đo lường khách quan. Với API công khai, quy tắc an toàn là: KHÔNG BAO GIỜ xóa field ở phiên bản cũ chỉ vì nó 'có vẻ' không còn ai dùng — luôn xác minh bằng log trước.",
        "This example shows that 'nobody uses it' is a dangerous ASSUMPTION unless confirmed by ACTUAL DATA (access logs). Small, rarely-contacted, long-tenured partners are exactly the group most easily overlooked when decisions rely on subjective surveys rather than objective measurement. For a public API, the safe rule is: NEVER remove a field from an old version just because it 'seems' unused — always verify with logs first.",
        "この例は、実際のデータ（アクセスログ）で確認されない限り『誰も使っていない』は危険な仮定であることを示しています。小規模で連絡の少ない、長年連携しているパートナーこそ、主観的な調査に基づく判断において最も見落とされやすいグループです。公開APIでは、安全なルールは：旧バージョンからフィールドを削除するのは『使われていないように見える』という理由だけでは決してせず、常に先にログで確認することです。"),
      TRY("Nghĩ về một field 'trông có vẻ cũ' trong một API bạn từng dùng và liệt kê 2 bước bạn sẽ làm để XÁC MINH (không đoán) rằng nó thực sự không còn ai dùng.", "Think of a field that 'looks old' in an API you've used and list 2 steps you'd take to VERIFY (not guess) that it's truly unused.", "使ったことのあるAPIで『古そうに見える』フィールドを1つ考え、それが本当に使われていないことを（推測ではなく）検証するために取る2つのステップを挙げよう。"),
    ] },
  { heading: { vi: "9. Từ sự cố rút quy trình phòng ngừa & theo dõi theo thời gian", en: "9. Turning incidents into a prevention process & tracking over time", ja: "9. インシデントから予防プロセスへ、そして継続的な追跡" },
    blocks: [
      P("Một sự cố tương thích ngược chỉ có giá trị học tập thật sự khi nó biến thành QUY TRÌNH phòng ngừa lâu dài, chứ không dừng ở việc vá riêng ca cụ thể vừa gặp.",
        "A backward-compatibility incident only creates real learning value once it's turned into a lasting prevention PROCESS, not just a patch for the specific case just encountered.",
        "後方互換性インシデントは、遭遇した特定ケースへのパッチで終わるのではなく、持続的な予防プロセスに変換されて初めて真の学習価値を生みます。"),
      IMG(m_kanban, "Bảng theo dõi công việc versioning & deprecation của PayHub", "PayHub's board tracking versioning & deprecation work", "PayHubのバージョニング/廃止作業追跡ボード"),
      P("Từ hai sự cố ở chương 7 và 8, PayHub rút ra hai lớp hành động: (1) NGẮN HẠN — bổ sung ngay ca kiểm thử hồi quy cho chính kịch bản gây lỗi (resend baseline v1, kiểm tra field bị xóa); (2) DÀI HẠN — sửa quy trình: tách hẳn code serialize theo từng phiên bản, bắt buộc kiểm tra log truy cập thực tế trước khi xóa bất kỳ field nào, và gắn 'cổng kiểm thử tương thích' vào pipeline CI/CD để không release nào được đi qua nếu chưa chạy đủ bộ ca đa phiên bản.",
        "From the two incidents in chapters 7 and 8, PayHub derives two layers of action: (1) SHORT-TERM — immediately add regression cases for the exact failing scenario (resend v1 baseline, check the removed field); (2) LONG-TERM — fix the process: fully separate the serialize code per version, mandate checking real access logs before removing any field, and embed a 'compatibility test gate' in the CI/CD pipeline so no release passes without running the full multi-version suite.",
        "第7章と第8章の2つのインシデントから、PayHubは2層の行動を導き出しました：(1) 短期的行動——失敗した正確なシナリオに対する回帰ケースを即座に追加する（v1ベースラインの再送信、削除フィールドの確認）；(2) 長期的行動——プロセスを修正する：バージョンごとにシリアライズコードを完全に分離し、フィールド削除前に実アクセスログの確認を必須化し、CI/CDパイプラインに『互換性テストゲート』を組み込み、複数バージョンの完全なスイートを実行しないリリースは通さないようにする。"),
      P("Để biết quy trình này có thực sự hiệu quả, PayHub theo dõi số liệu theo quý: tỉ lệ đối tác đã chuyển sang v2, số sự cố breaking change, và số ca kiểm thử tương thích được chạy tự động mỗi release. Nếu số sự cố không giảm dần dù đã thêm quy trình, đó là dấu hiệu quy trình mới đang bị bỏ qua trong thực tế, cần rà soát lại việc thực thi chứ không chỉ tài liệu quy trình trên giấy.",
        "To know if this process is truly effective, PayHub tracks quarterly metrics: the share of partners migrated to v2, the number of breaking-change incidents, and the number of compatibility test cases run automatically per release. If the incident count doesn't drop despite the new process, it's a sign the new process is being skipped in practice, warranting a review of actual enforcement rather than just the paper process.",
        "このプロセスが実際に効果的かを知るため、PayHubは四半期ごとの指標を追跡します：v2に移行したパートナーの割合、breaking changeインシデント数、リリースごとに自動実行される互換性テストケース数。新しいプロセスを導入してもインシデント数が減らない場合、それは新プロセスが実際には省略されている兆候であり、紙の上のプロセスだけでなく実際の運用を見直す必要があります。"),
      IMG(m_dash, "Dashboard theo dõi tỉ lệ đối tác theo phiên bản & sự cố tương thích theo quý", "Dashboard tracking the partner-version split & compatibility incidents by quarter", "四半期ごとのパートナーバージョン比率と互換性インシデントを追跡するダッシュボード"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử API thủ công nâng cao với Postman cho tester", "Advanced manual API testing with Postman for testers", "kiem-thu-api-thu-cong-postman-nang-cao-cho-tester", "テスターのためのPostmanによる高度な手動APIテスト"),
      INTERNAL("Kiểm thử hồi quy chọn lọc & ưu tiên cho tester", "Selective, priority-based regression testing for testers", "kiem-thu-hoi-quy-chon-loc-uu-tien-cho-tester", "テスターのための選択的・優先順位付き回帰テスト"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử tương thích ngược và versioning API qua nền tảng SaaS thanh toán PayHub: phân loại breaking change vs non-breaking change, chiến lược versioning theo URL path/header/semantic, cách viết ma trận ca kiểm thử đa phiên bản, kiểm thử dữ liệu/định dạng cũ, dùng feature flag để nâng cấp dần, và hai tình huống thật (đổi tên field làm app đối tác crash; xóa field bắt buộc cũ gây lỗi đối soát) cho thấy vì sao mọi thay đổi ở API công khai đều cần một 'cổng' kiểm thử tương thích trước khi release. Bạn cũng biết cách rút quy trình phòng ngừa và theo dõi hiệu quả theo thời gian.",
        "You just learned how to test backward compatibility and API versioning through the PayHub payment SaaS platform: classifying breaking vs non-breaking changes, versioning strategies via URL path/header/semantic versioning, building a multi-version test matrix, testing legacy data/formats, using feature flags for gradual rollout, and two real situations (a field rename crashing a partner's app; removing an old required field breaking reconciliation) showing why every public-API change needs a compatibility test gate before release. You also learned to derive a prevention process and track its effectiveness over time.",
        "決済SaaSプラットフォームPayHubを通じて、後方互換性テストとAPIバージョニングのテスト方法を学びました：breaking/non-breaking changeの分類、URLパス/ヘッダー/セマンティックバージョニングの戦略、複数バージョンのテストマトリクスの構築、旧データ/形式のテスト、段階的移行のためのフィーチャーフラグの使用、そして公開APIのあらゆる変更がリリース前に互換性テストゲートを必要とする理由を示す2つの実例（フィールド名変更によるパートナーアプリのクラッシュ、旧必須フィールドの削除による消込エラー）。予防プロセスを導き出し、時間をかけて効果を追跡する方法も学びました。"),
      P("Chặng tiếp theo, bạn nên luyện kỹ thuật kiểm thử API thủ công nâng cao với Postman để thao tác nhanh với các header/version, cùng cách xây dựng bộ kiểm thử hồi quy chọn lọc theo ưu tiên để chạy nhanh mỗi release mà vẫn đủ tin cậy. Nếu muốn luyện các kỹ thuật versioning và kiểm thử API nâng cao trên dự án mô phỏng SaaS thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận vai trò tester cấp cao cho sản phẩm có API công khai.",
        "Next, you should practice advanced manual API testing with Postman to work quickly with headers/versions, along with building a selective, priority-based regression suite that runs fast on every release while staying reliable. If you want to practice advanced versioning and API testing techniques on a real SaaS-like project with a mentor, a structured Tester course helps you progress fast and confidently take on a senior tester role for products with a public API.",
        "次は、ヘッダー/バージョンを素早く扱うためのPostmanによる高度な手動APIテストの練習と、リリースごとに高速かつ十分な信頼性で実行できる、優先順位に基づく選択的な回帰テストスイートの構築に取り組みましょう。指導者と共に実際のSaaS案件でバージョニングと高度なAPIテスト技法を練習したいなら、体系的なテスターコースが速い成長と、公開APIを持つ製品でのシニアテスターの役割への自信ある挑戦を助けます。"),
      CTA(course),
    ] },
];

const doc = makeDoc({
  slug: "kiem-thu-tuong-thich-nguoc-versioning-cho-tester",
  domain: "saas",
  primaryKeyword: "kiểm thử tương thích ngược",
  keywords: ["kiểm thử tương thích ngược", "backward compatibility", "versioning API", "breaking change", "API v1 v2", "feature flag", "SaaS API cho tester"],
  coverLabel: "NÂNG CAO · BACKWARD COMPAT · SAAS",
  crumb: "Kiểm thử tương thích ngược & Versioning API",
  metaTitle: { vi: "Kiểm thử tương thích ngược & Versioning API cho Tester", en: "Backward compatibility & API versioning testing for testers", ja: "テスターのための後方互換性・APIバージョニングテスト" },
  metaDescription: {
    vi: "Kiểm thử tương thích ngược & versioning API cho SaaS: phân biệt breaking/non-breaking change, chiến lược v1/v2, feature flag, ca kiểm thử thực tế cho tester.",
    en: "Backward-compatibility and API versioning testing for a SaaS with a public API: breaking vs non-breaking changes, v1/v2 strategies, feature flags, real test cases, with visuals and a quiz.",
    ja: "公開APIを持つSaaS向けの後方互換性・APIバージョニングテスト：breaking/non-breaking changeの区別、v1/v2戦略、フィーチャーフラグ、実際のテストケース、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử tương thích ngược & Versioning API cho Tester: breaking change, v1/v2 & feature flag qua dự án SaaS thật (có trắc nghiệm)",
    en: "Backward Compatibility & API Versioning Testing for Testers: breaking changes, v1/v2 & feature flags through a real SaaS project (with quiz)",
    ja: "テスターのための後方互換性・APIバージョニングテスト：実際のSaaSプロジェクトを通じたbreaking change、v1/v2、フィーチャーフラグ（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử tương thích ngược (backward compatibility) và versioning API qua nền tảng SaaS thanh toán PayHub mở API công khai cho hàng nghìn đối tác tích hợp. Phân biệt breaking change vs non-breaking change, chiến lược versioning URL path/header/semantic, ma trận ca kiểm thử đa phiên bản, kiểm thử dữ liệu/định dạng cũ, nâng cấp dần bằng feature flag, hai tình huống thật (đổi tên field làm app đối tác crash; xóa field bắt buộc cũ gây lỗi đối soát), quy trình phòng ngừa & theo dõi, nhiều mockup giao diện thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: backward-compatibility and API versioning testing through PayHub, a payment SaaS platform with a public API used by thousands of integration partners. Breaking vs non-breaking change classification, URL-path/header/semantic versioning strategies, a multi-version test matrix, testing legacy data/formats, gradual rollout via feature flags, two real situations (a field rename crashing a partner's app; removing an old required field breaking reconciliation), a prevention process & tracking, many real UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：数千の連携パートナーを持つ公開APIを提供する決済SaaSプラットフォームPayHubを通じた後方互換性・APIバージョニングテスト。breaking/non-breaking changeの分類、URLパス/ヘッダー/セマンティックバージョニング戦略、複数バージョンのテストマトリクス、旧データ/形式のテスト、フィーチャーフラグによる段階的移行、2つの実例（フィールド名変更によるパートナーアプリのクラッシュ、旧必須フィールドの削除による消込エラー）、予防プロセスと追跡、多数の実践的モック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử tương thích ngược trước khi release API mới", steps: [
    { name: "Phân loại thay đổi là breaking hay non-breaking", text: "Đổi/xóa cái đang tồn tại luôn tiềm ẩn rủi ro phá vỡ client cũ." },
    { name: "Chạy lại bộ ca resend baseline cho từng phiên bản cũ", text: "So sánh response mới với baseline, kiểm cả ca lỗi rõ ràng." },
    { name: "Nâng cấp dần bằng feature flag & theo dõi số liệu", text: "Bật cho nhóm nhỏ trước, theo dõi tỉ lệ lỗi, rồi mở rộng dần." },
  ] },
  pages,
});

export const MA_BACKCOMPAT_01 = [doc];
