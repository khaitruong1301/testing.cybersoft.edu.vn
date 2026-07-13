// doc_ma_compliance.mjs — BÀI MANUAL cấp NÂNG CAO: "Kiểm thử tuân thủ (Compliance Testing:
// PCI-DSS, bảo vệ dữ liệu cá nhân) cho hệ thanh toán FINTECH" — tester kiểm các yêu cầu tuân
// thủ trên cổng thanh toán & ví fintech VinaPay: che/không lưu số thẻ đầy đủ (PAN masking),
// mã hóa dữ liệu nhạy cảm, nhật ký audit log, đồng ý người dùng (consent), quyền xóa/xuất dữ
// liệu cá nhân, phân quyền truy cập dữ liệu. Luôn kiểm AN TOÀN, dùng dữ liệu test/giả, không
// dùng thẻ/PII thật, không thay thế đánh giá tuân thủ chính thức của QSA/pháp chế. Song ngữ
// vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
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
    tags: tags("congnghe", "fintech", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình thanh toán VinaPay — số thẻ đã che (PAN masking) + annotate ──
const m_pay = browser("vinapay.vn/thanh-toan", [
  panel("VinaPay · Thanh toán đơn hàng #VP-88231", [
    field(24, 20, 330, "Số thẻ (đã che theo PCI-DSS)", "4111 11•• •••• 4242", "normal"),
    field(372, 20, 330, "Chủ thẻ", "NGUYEN VAN AN", "normal"),
    field(24, 92, 160, "Hết hạn", "09/27", "normal"),
    field(200, 92, 160, "CVV", "•••", "disabled"),
    field(372, 92, 330, "Số tiền thanh toán", "2.450.000đ", "normal"),
    btn(24, 168, 220, "Xác nhận thanh toán", "primary"),
    annotate(20, 12, 330, 62, "PAN đã che: chỉ hiện 6 số đầu + 4 số cuối theo PCI-DSS"),
    annotate(196, 84, 168, 46, "CVV không hiển thị lại & không được lưu sau giao dịch"),
  ].join(""), { h: 260, accent: "#0f766e" }),
].join(""), { h: 316, title: "VinaPay · Cổng thanh toán & Ví Fintech", accent: "#0f766e" });

// ── Mockup 2: checklist yêu cầu tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân ──
const m_checklist = grid("Checklist tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân (góc nhìn Tester)",
  ["Yêu cầu tuân thủ", "Tester cần kiểm gì", "Ví dụ trên VinaPay"], [
    ["Che/không lưu PAN đầy đủ", "Số thẻ hiển thị tối đa 6 số đầu + 4 số cuối; không lưu PAN dạng plaintext ở DB/log", "Response API giỏ hàng/đơn hàng không được chứa PAN đầy đủ"],
    ["Không lưu CVV sau giao dịch", "CVV chỉ dùng một lần để xác thực, không xuất hiện lại ở log, DB, màn hình xác nhận", "Tìm chuỗi CVV vừa nhập trong log server ngay sau khi thanh toán xong"],
    ["Mã hóa dữ liệu nhạy cảm", "Kết nối HTTPS/TLS khi truyền; dữ liệu nhạy cảm trong DB được mã hóa, không lưu dạng thô", "Dump thử bảng khách hàng (môi trường test), kiểm số điện thoại/CCCD có bị mã hóa không"],
    ["Nhật ký audit (audit log)", "Mọi hành động xem/sửa dữ liệu nhạy cảm được ghi log: ai, khi nào, thao tác gì, không thể xóa", "Nhân viên CSKH mở hồ sơ khách có được ghi lại thành 1 dòng log không"],
    ["Đồng ý người dùng (consent)", "Có bước xin đồng ý rõ ràng trước khi thu thập/dùng dữ liệu cá nhân, cho phép rút lại", "Bật/tắt đồng ý nhận dữ liệu marketing trong màn Cài đặt quyền riêng tư"],
    ["Quyền xóa & xuất dữ liệu cá nhân", "Người dùng có thể yêu cầu xóa tài khoản/xuất dữ liệu, hệ thống xử lý đúng thời hạn", "Bấm 'Xóa tài khoản' rồi kiểm dữ liệu có thực sự bị xóa/ẩn danh không"],
    ["Phân quyền truy cập dữ liệu", "Chỉ vai trò thực sự cần thiết mới xem được dữ liệu nhạy cảm, theo nguyên tắc tối thiểu", "Nhân viên vận hành kho có xem được số dư ví của khách không (không nên)"],
  ], { accent: "#0f766e", note: "Rút gọn theo góc nhìn tester thủ công — không thay thế đánh giá tuân thủ chính thức của QSA/pháp chế." });

// ── Mockup 3: bảng ca kiểm audit log & mã hóa dữ liệu nhạy cảm ──
const m_auditgrid = grid("Bảng ca kiểm audit log & mã hóa dữ liệu nhạy cảm (VinaPay)",
  ["Ca kiểm thử", "Bước thực hiện", "Kết quả mong đợi"], [
    ["Audit log khi xem hồ sơ khách", "CSKH mở hồ sơ khách hàng A trên staging", "Có bản ghi log: user_id, thời gian, hành động 'VIEW_PROFILE', đối tượng bị xem"],
    ["Audit log khi đổi hạn mức ví", "Admin sửa hạn mức ví của khách hàng B", "Có log: ai sửa, giá trị cũ/mới, thời gian; log không thể bị xóa/sửa lại"],
    ["Mã hóa PAN trong DB", "Truy vấn trực tiếp bảng giao dịch (môi trường test)", "Cột số thẻ lưu dạng mã hóa/token, không phải chuỗi số thật"],
    ["Mã hóa kênh truyền (in-transit)", "Bắt gói tin khi gọi API thanh toán (công cụ proxy trên staging)", "Toàn bộ là HTTPS/TLS, không có endpoint HTTP thuần cho dữ liệu nhạy cảm"],
    ["Không log dữ liệu nhạy cảm dạng thô", "Thực hiện một giao dịch thật (test) rồi kiểm log server/log ứng dụng", "Không tìm thấy PAN đầy đủ, CVV, mật khẩu dạng plaintext trong log"],
  ], { accent: "#0f766e" });

// ── Mockup 4: ticket Jira của lỗi log lưu nguyên số thẻ đầy đủ ──
const m_jira = jira({
  key: "VP-30442", title: "Log ứng dụng lưu nguyên số thẻ đầy đủ (PAN) dạng plaintext khi giao dịch lỗi",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · service payment-gateway · VinaPay v3.2 · tài khoản thẻ test"],
    ["Các bước", "1) Thanh toán bằng thẻ test 2) Ngắt mạng giữa chừng để giao dịch lỗi 3) Mở log service payment-gateway ngay sau đó"],
    ["Kết quả mong đợi", "Log chỉ ghi PAN đã che (6 đầu + 4 cuối) hoặc token, tuyệt đối không ghi PAN đầy đủ"],
    ["Kết quả thực tế", "Dòng log lỗi in nguyên văn 'card=4111111111114242, cvv=123' dạng plaintext"],
    ["Bằng chứng", "log-payment-gateway-30442.txt (đã xin phép trích xuất, chỉ dùng nội bộ Security/Compliance)"],
  ],
});

// ── Mockup 5: kanban theo dõi các lỗi tuân thủ tìm được ──
const m_kanban = kanban("Bảng theo dõi lỗi tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân (VinaPay · Compliance sweep)", [
  { name: "New", cards: [
    { key: "VP-30442", title: "Log lưu nguyên PAN + CVV dạng plaintext", sev: "Critical" },
    { key: "VP-30455", title: "Nhân viên kho xem được hồ sơ khách hàng", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "VP-30410", title: "Không có audit log khi xem dữ liệu nhạy cảm", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "VP-30388", title: "Nút 'Xóa tài khoản' không thực sự xóa dữ liệu", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "VP-30301", title: "Màn hình đồng ý marketing thiếu tùy chọn từ chối", sev: "Medium" },
  ] },
]);

// ── Mockup 6: dashboard số liệu đợt kiểm tuân thủ ──
const m_dash = dashboard("Kết quả kiểm tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân — VinaPay · Sprint 24", [
  { label: "Yêu cầu đã kiểm", value: "22", sub: "theo checklist PCI-DSS rút gọn", color: "#2563eb" },
  { label: "Vi phạm tìm được", value: "5", sub: "PAN/log, phân quyền, xóa dữ liệu", color: "#dc2626" },
  { label: "Mức Critical/High", value: "4", sub: "ưu tiên vá trước khi go-live", color: "#e11d48" },
  { label: "Đã báo Compliance/Security", value: "5/5", sub: "kèm bằng chứng, không tự công khai", color: "#16a34a" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "PCI-DSS là gì và tester trên hệ thanh toán fintech cần biết những gì?",
  "What is PCI-DSS and what should a tester on a fintech payment system know?",
  "PCI-DSS (Payment Card Industry Data Security Standard) là bộ tiêu chuẩn bảo mật bắt buộc cho mọi hệ thống lưu trữ, xử lý hoặc truyền dữ liệu thẻ thanh toán. Tester không cần thuộc lòng toàn bộ hàng trăm yêu cầu kỹ thuật, nhưng nên nắm chắc phần liên quan trực tiếp tới việc test hằng ngày: số thẻ (PAN) phải được che khi hiển thị, không được lưu CVV sau giao dịch, dữ liệu nhạy cảm phải mã hóa cả lúc lưu trữ lẫn lúc truyền, và mọi hành động truy cập dữ liệu nhạy cảm phải có nhật ký audit. Đây là lớp kiểm tra bổ sung bên cạnh test chức năng thông thường, không thay thế đánh giá tuân thủ chính thức do QSA (Qualified Security Assessor) thực hiện.",
  "PCI-DSS (Payment Card Industry Data Security Standard) is a mandatory security standard for any system that stores, processes, or transmits payment card data. A tester doesn't need to memorize all its hundreds of technical requirements, but should firmly grasp the parts directly relevant to daily testing: the card number (PAN) must be masked when displayed, the CVV must never be stored after a transaction, sensitive data must be encrypted both at rest and in transit, and every access to sensitive data must be logged for audit. This is an additional layer of checking alongside normal functional testing, not a replacement for a formal compliance assessment performed by a QSA (Qualified Security Assessor).",
  "PCI-DSSとは何で、フィンテック決済システムのテスターは何を知るべき？",
  "PCI-DSS（Payment Card Industry Data Security Standard）とは、決済カードデータを保存・処理・伝送するあらゆるシステムに義務付けられたセキュリティ基準です。テスターは何百もある技術要件を丸暗記する必要はありませんが、日々のテストに直結する部分——カード番号（PAN）は表示時にマスクされること、CVVは取引後に一切保存されないこと、機密データは保存時も伝送時も暗号化されること、機密データへのアクセスは必ず監査ログに記録されること——はしっかり押さえるべきです。これは通常の機能テストに加える追加のチェック層であり、QSA（認定セキュリティ評価者）による正式なコンプライアンス評価の代わりにはなりません。");
const faq2 = FAQ(
  "Tester không chuyên bảo mật/pháp lý có thể tự kiểm thử tuân thủ dữ liệu cá nhân không?",
  "Can a tester without security/legal expertise test data-protection compliance themselves?",
  "Có, ở mức độ kiểm tra hành vi hệ thống — miễn là tuân thủ nguyên tắc AN TOÀN: chỉ dùng dữ liệu test/giả (thẻ test, số điện thoại giả), chỉ thao tác trên môi trường staging với tài khoản test, không bao giờ dùng thẻ hay thông tin cá nhân thật của khách hàng để thử nghiệm. Tester có thể kiểm các hành vi quan sát được (có che PAN không, có audit log không, nút xóa tài khoản có hoạt động không), nhưng việc kết luận hệ thống có 'ĐẠT' chứng nhận PCI-DSS hay tuân thủ luật bảo vệ dữ liệu cá nhân hay không vẫn cần đội Compliance/pháp chế và QSA xác nhận chính thức. Tester là lớp phát hiện sớm, không phải người ra phán quyết cuối cùng.",
  "Yes, at the level of checking observable system behavior — as long as SAFETY principles are followed: only use test/fake data (test cards, fake phone numbers), only operate on a staging environment with test accounts, and never use a real customer's real card or personal information for testing. A tester can check observable behaviors (is the PAN masked, is there an audit log, does the delete-account button actually work), but concluding whether the system formally 'PASSES' PCI-DSS certification or complies with data-protection law still requires official confirmation from the Compliance/legal team and a QSA. The tester is an early-detection layer, not the final judge.",
  "セキュリティ・法務の専門知識がないテスターでも個人データ保護のコンプライアンステストを自分で行える？",
  "はい、システムの観察可能な挙動をチェックするレベルであれば可能です——ただし安全原則を守ることが条件です：テスト用/偽のデータ（テスト用カード、偽の電話番号）のみを使い、ステージング環境でテストアカウントのみを使って操作し、実際の顧客の本物のカードや個人情報を絶対にテストに使わないこと。テスターは観察可能な挙動（PANがマスクされているか、監査ログがあるか、アカウント削除ボタンが実際に機能するか）を確認できますが、システムがPCI-DSS認証に正式に『合格』しているか、個人データ保護法を遵守しているかの最終判断には、コンプライアンス/法務チームとQSAによる公式な確認が必要です。テスターは早期発見の役割であり、最終的な判定者ではありません。");
const faq3 = FAQ(
  "Vì sao chỉ che số thẻ trên giao diện (PAN masking) là chưa đủ để coi là tuân thủ?",
  "Why is masking the card number on screen (PAN masking) alone not enough for compliance?",
  "Vì che PAN trên giao diện chỉ giải quyết được rủi ro lộ dữ liệu qua MẮT NGƯỜI DÙNG, trong khi PCI-DSS và các quy định bảo vệ dữ liệu cá nhân yêu cầu bảo vệ dữ liệu ở NHIỀU TẦNG khác: response API trả về (dù giao diện không hiển thị, dữ liệu vẫn có thể nằm trong JSON), log ứng dụng/log server (thường bị bỏ quên vì không ai 'nhìn' log hằng ngày), database (phải mã hóa, không lưu PAN thô), và cả bản sao lưu (backup). Một hệ thống có thể che PAN đẹp trên giao diện nhưng vẫn ghi log CVV dạng plaintext như tình huống trong bài — đó vẫn là vi phạm nghiêm trọng. Vì vậy tester cần kiểm tra ở CẢ bốn tầng: giao diện, API response, log, và database/backup, không chỉ dừng ở màn hình.",
  "Because masking the PAN on screen only addresses the risk of exposure to the HUMAN EYE, while PCI-DSS and personal-data-protection regulations require protecting data across SEVERAL other layers: the API response (even if the UI doesn't display it, the data can still be sitting in the JSON), application/server logs (often overlooked since no one 'looks' at logs daily), the database (must be encrypted, not storing raw PAN), and even backups. A system can mask the PAN nicely on screen while still logging the CVV in plaintext, as in this article's situation — that is still a serious violation. So testers need to check across ALL four layers: UI, API response, logs, and database/backups, not just the screen.",
  "画面上でカード番号を隠す（PANマスキング）だけではなぜコンプライアンスとして不十分？",
  "画面上でPANをマスクすることは『人の目』による露出リスクにしか対応していない一方、PCI-DSSや個人データ保護規制はそれ以外の複数の層でのデータ保護を要求しているからです：APIレスポンス（UIに表示されなくてもJSON内にデータが残っている場合がある）、アプリケーション/サーバーログ（誰も毎日ログを『見ない』ため見落とされがち）、データベース（生のPANを保存せず暗号化されているべき）、そしてバックアップも含まれます。画面上ではきれいにPANをマスクしていても、本記事のシーンのようにCVVを平文でログに記録しているシステムもあり得ます——それでも重大な違反です。そのためテスターは画面だけでなく、UI・APIレスポンス・ログ・データベース/バックアップの4層すべてを確認する必要があります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Theo PCI-DSS, khi hiển thị số thẻ (PAN) trên màn hình thanh toán, tester cần kiểm điều gì?", en: "According to PCI-DSS, what should a tester check when the card number (PAN) is displayed on a payment screen?", ja: "PCI-DSSに基づき、決済画面でカード番号（PAN）が表示される際、テスターは何を確認すべき？" },
    options: [
      { vi: "Hiện đầy đủ 16 số để khách dễ đối chiếu", en: "Show the full 16 digits so the customer can easily verify it", ja: "顧客が確認しやすいよう16桁全てを表示する" },
      { vi: "Chỉ hiện tối đa 6 số đầu + 4 số cuối, phần giữa được che", en: "Only show up to the first 6 and last 4 digits, masking the middle", ja: "最初の6桁と最後の4桁までのみ表示し、中間はマスクする" },
      { vi: "Hiện đầy đủ 16 số nhưng đổi màu chữ cho khó đọc", en: "Show all 16 digits but in a hard-to-read font color", ja: "16桁全てを表示するが読みにくい文字色にする" },
      { vi: "Không hiện số nào cả, kể cả 4 số cuối", en: "Show no digits at all, not even the last 4", ja: "最後の4桁を含め、一切数字を表示しない" },
    ], correct: 1,
    explain: { vi: "PCI-DSS quy định PAN khi hiển thị chỉ được lộ tối đa 6 số đầu + 4 số cuối, phần còn lại phải che.", en: "PCI-DSS requires that a displayed PAN reveal at most the first 6 and last 4 digits, with the rest masked.", ja: "PCI-DSSでは、表示されるPANは最初の6桁と最後の4桁までしか公開できず、残りはマスクする必要があります。" },
  }),
  mcq({
    q: { vi: "Sau khi giao dịch hoàn tất (thành công hoặc thất bại), tester cần xác nhận điều gì về mã CVV?", en: "After a transaction completes (success or failure), what should a tester confirm about the CVV?", ja: "取引が完了（成功・失敗いずれも）した後、テスターはCVVについて何を確認すべき？" },
    options: [
      { vi: "Lưu CVV vào DB để khách không phải nhập lại lần sau", en: "Store the CVV in the DB so the customer doesn't need to re-enter it next time", ja: "顧客が次回入力し直さなくて済むようCVVをDBに保存する" },
      { vi: "Mã hóa CVV rồi lưu vĩnh viễn trong log để tra cứu khi cần", en: "Encrypt the CVV then keep it permanently in logs for later lookup", ja: "CVVを暗号化して後で参照できるようログに永久保存する" },
      { vi: "CVV không được lưu lại ở bất kỳ đâu (DB/log) sau khi xác thực giao dịch", en: "The CVV must not be stored anywhere (DB/log) after the transaction is authenticated", ja: "取引の認証後、CVVはどこにも（DB/ログ）保存されてはならない" },
      { vi: "Hiển thị lại CVV cho nhân viên CSKH khi khách gọi hỏi", en: "Show the CVV again to customer support staff when a customer calls in", ja: "顧客からの問い合わせ時にCSKHスタッフへCVVを再表示する" },
    ], correct: 2,
    explain: { vi: "CVV chỉ dùng một lần để xác thực; PCI-DSS cấm lưu lại CVV dưới mọi hình thức sau khi giao dịch hoàn tất.", en: "The CVV is used once for authentication; PCI-DSS forbids storing it in any form after the transaction completes.", ja: "CVVは認証に一度だけ使われるものであり、PCI-DSSは取引完了後にいかなる形でもCVVを保存することを禁止しています。" },
  }),
  mcq({
    q: { vi: "Mục đích chính của nhật ký audit log khi kiểm thử tuân thủ bảo vệ dữ liệu cá nhân là gì?", en: "What is the main purpose of an audit log when testing personal-data-protection compliance?", ja: "個人データ保護のコンプライアンステストにおける監査ログの主な目的は？" },
    options: [
      { vi: "Ghi lại ai đã xem/sửa dữ liệu nhạy cảm, khi nào, để truy vết khi có sự cố", en: "Record who viewed/modified sensitive data and when, so it can be traced when an incident occurs", ja: "誰が機密データをいつ閲覧/変更したかを記録し、インシデント発生時に追跡できるようにする" },
      { vi: "Tăng tốc độ tải trang thanh toán", en: "Speed up the payment page's load time", ja: "決済ページの読み込み速度を上げる" },
      { vi: "Giảm dung lượng lưu trữ của database", en: "Reduce the database's storage size", ja: "データベースのストレージ容量を減らす" },
      { vi: "Chỉ dùng để debug lỗi giao diện người dùng", en: "Only used to debug UI bugs", ja: "UIのバグをデバッグするためだけに使う" },
    ], correct: 0,
    explain: { vi: "Audit log là bằng chứng truy vết ai đã truy cập dữ liệu nhạy cảm — bắt buộc để điều tra khi có rò rỉ/sự cố.", en: "The audit log is the traceability evidence of who accessed sensitive data — mandatory for investigating leaks/incidents.", ja: "監査ログは機密データへのアクセス者を追跡する証拠であり、漏洩やインシデントの調査に不可欠です。" },
  }),
  mcq({
    q: { vi: "Khi test tính năng 'Xóa tài khoản', tester cần xác nhận điều gì để đúng yêu cầu quyền xóa dữ liệu cá nhân?", en: "When testing the 'Delete account' feature, what should a tester confirm to satisfy the right to erasure?", ja: "『アカウント削除』機能をテストする際、データ削除の権利を満たすためテスターは何を確認すべき？" },
    options: [
      { vi: "Chỉ cần ẩn nút đăng nhập của tài khoản đó", en: "Just hide that account's login button", ja: "そのアカウントのログインボタンを隠すだけでよい" },
      { vi: "Giữ nguyên toàn bộ dữ liệu để tiện khôi phục sau này", en: "Keep all the data intact for easy recovery later", ja: "後で復元しやすいようデータをすべてそのまま保持する" },
      { vi: "Chỉ xóa email, giữ nguyên số điện thoại và địa chỉ", en: "Only delete the email, keep the phone number and address", ja: "メールアドレスだけ削除し、電話番号と住所はそのまま残す" },
      { vi: "Dữ liệu cá nhân thực sự được xóa/ẩn danh trong thời hạn quy định, không còn truy xuất được", en: "Personal data is actually deleted/anonymized within the required timeframe and can no longer be retrieved", ja: "個人データが定められた期限内に実際に削除/匿名化され、もう取得できなくなる" },
    ], correct: 3,
    explain: { vi: "Quyền xóa dữ liệu cá nhân đòi hỏi dữ liệu thực sự bị xóa/ẩn danh trong hạn quy định, không chỉ ẩn giao diện.", en: "The right to erasure requires the data to be genuinely deleted/anonymized within the required timeframe, not just hidden in the UI.", ja: "データ削除の権利は、UI上で隠すだけでなく、定められた期限内にデータが実際に削除/匿名化されることを要求します。" },
  }),
  mcq({
    q: { vi: "Nguyên tắc phân quyền nào tester cần kiểm khi test quyền truy cập dữ liệu nhạy cảm?", en: "Which authorization principle should a tester check when testing access to sensitive data?", ja: "機密データへのアクセス権限をテストする際、テスターが確認すべき原則は？" },
    options: [
      { vi: "Mọi nhân viên đều nên xem được mọi dữ liệu để tiện hỗ trợ khách hàng", en: "Every employee should be able to view all data to make supporting customers easier", ja: "顧客サポートをしやすくするため全従業員が全データを閲覧できるべき" },
      { vi: "Phân quyền chỉ cần áp dụng cho riêng tài khoản admin", en: "Authorization only needs to apply to admin accounts", ja: "権限管理は管理者アカウントにのみ適用すればよい" },
      { vi: "Chỉ vai trò thực sự cần thiết mới được xem dữ liệu nhạy cảm — nguyên tắc tối thiểu (least privilege)", en: "Only roles that truly need it may view sensitive data — the principle of least privilege", ja: "本当に必要な役割のみが機密データを閲覧できる——最小権限の原則" },
      { vi: "Chỉ cần phân quyền ở giao diện, không cần kiểm tra lại ở tầng API", en: "Authorization only needs to be enforced in the UI, no need to re-check at the API layer", ja: "権限管理はUIだけで十分で、API層で改めて確認する必要はない" },
    ], correct: 2,
    explain: { vi: "Nguyên tắc tối thiểu (least privilege) đòi hỏi chỉ vai trò cần thiết mới được xem dữ liệu nhạy cảm, và phải kiểm cả ở tầng API.", en: "The principle of least privilege requires only necessary roles to view sensitive data, and this must be checked at the API layer too.", ja: "最小権限の原則は、必要な役割のみが機密データを閲覧できることを求めており、API層でも確認する必要があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử tuân thủ (compliance testing) trên hệ thống fintech là việc tester chủ động kiểm các yêu cầu bắt buộc theo PCI-DSS và quy định bảo vệ dữ liệu cá nhân: số thẻ (PAN) phải được che khi hiển thị và không lưu dạng thô, CVV không được lưu lại sau giao dịch, dữ liệu nhạy cảm phải mã hóa cả lúc lưu lẫn lúc truyền, mọi truy cập dữ liệu nhạy cảm phải có nhật ký audit, người dùng phải được xin đồng ý rõ ràng và có quyền xóa/xuất dữ liệu cá nhân, và chỉ vai trò cần thiết mới được xem dữ liệu nhạy cảm. Bài này bám cổng thanh toán & ví fintech VinaPay: bạn học cách kiểm AN TOÀN — chỉ dùng dữ liệu test, không đụng dữ liệu khách hàng thật. Nhiều mockup giao diện, 2 tình huống thật và trắc nghiệm cuối bài.",
        "Compliance testing on a fintech system means a tester actively checks the mandatory requirements under PCI-DSS and personal-data-protection regulations: the card number (PAN) must be masked when displayed and never stored raw, the CVV must never be stored after a transaction, sensitive data must be encrypted both at rest and in transit, every access to sensitive data must be logged for audit, users must give clear consent and have the right to delete/export their personal data, and only necessary roles may view sensitive data. This article follows VinaPay's payment gateway & fintech wallet: you'll learn to test SAFELY — only using test data, never touching real customer data. Lots of UI mockups, two real situations, and a quiz at the end.",
        "フィンテックシステムにおけるコンプライアンステストとは、テスターがPCI-DSSと個人データ保護規制に基づく必須要件を積極的に確認することです：カード番号（PAN）は表示時にマスクされ生の形で保存されないこと、CVVは取引後に一切保存されないこと、機密データは保存時も伝送時も暗号化されること、機密データへのすべてのアクセスが監査ログに記録されること、ユーザーから明確な同意を得ており個人データの削除/エクスポート権を持つこと、そして必要な役割のみが機密データを閲覧できることです。本記事は決済ゲートウェイ＆フィンテックウォレットVinaPayに沿って、テストデータのみを使い実際の顧客データには決して触れない安全なテスト方法を学びます。図とシーンとクイズ付き。"),
      P("Chào bạn Tester! Ở dự án fintech, một tính năng có thể chạy 'đúng chức năng' — thanh toán thành công, số dư cập nhật đúng — nhưng vẫn TRƯỢT nếu nó vi phạm yêu cầu tuân thủ. Kiểm thử tuân thủ (compliance testing) chính là lớp kiểm tra bổ sung này: bạn không chỉ hỏi 'tính năng có chạy đúng không' mà còn hỏi 'dữ liệu nhạy cảm của khách hàng có được bảo vệ đúng cách trong suốt vòng đời của nó không'. Đây là kỹ năng ngày càng quan trọng với tester làm việc trong ngân hàng, ví điện tử, cổng thanh toán — nơi một lỗi tuân thủ có thể dẫn tới phạt tiền, mất giấy phép hoạt động, hoặc mất hoàn toàn niềm tin của khách hàng.",
        "Hi, Tester! On a fintech project, a feature can run 'functionally correct' — payment succeeds, balance updates correctly — yet still FAIL if it violates a compliance requirement. Compliance testing is exactly this additional layer: you don't just ask 'does the feature work correctly' but also 'is the customer's sensitive data protected correctly throughout its lifecycle'. This is an increasingly important skill for testers working in banking, e-wallets, and payment gateways — where a single compliance failure can lead to fines, loss of an operating license, or a total loss of customer trust.",
        "テスターの皆さん、こんにちは！フィンテックのプロジェクトでは、決済が成功し残高が正しく更新されるなど、機能的には『正しく』動作していても、コンプライアンス要件に違反していれば不合格になり得ます。コンプライアンステストはまさにこの追加のチェック層です：『機能が正しく動くか』だけでなく、『顧客の機密データがそのライフサイクル全体を通じて正しく保護されているか』も問います。これは銀行、電子ウォレット、決済ゲートウェイで働くテスターにとってますます重要なスキルです——たった一つのコンプライアンス違反が、罰金、営業ライセンスの喪失、あるいは顧客の信頼の完全な喪失につながり得ます。"),
      IMG(m_pay, "Màn hình sẽ test: thanh toán VinaPay với số thẻ (PAN) đã che theo PCI-DSS", "Screen under test: VinaPay checkout with the card number (PAN) masked per PCI-DSS", "テスト対象画面：PCI-DSSに従いカード番号（PAN）がマスクされたVinaPayの決済画面"),
      DEF("Kiểm thử tuân thủ", "tester chủ động kiểm hệ thống có đáp ứng các yêu cầu bắt buộc về bảo mật dữ liệu thẻ (PCI-DSS) và bảo vệ dữ liệu cá nhân hay không, trên môi trường được phép.",
        "a tester actively checking whether a system meets the mandatory requirements for card-data security (PCI-DSS) and personal-data protection, on an authorized environment.",
        "テスターが、許可された環境で、カードデータのセキュリティ（PCI-DSS）と個人データ保護に関する必須要件をシステムが満たしているかを積極的に確認すること。"),
    ] },
  { heading: { vi: "2. Yêu cầu tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân nhìn từ góc Tester", en: "2. PCI-DSS & personal-data-protection requirements from a Tester's angle", ja: "2. テスターの視点から見たPCI-DSSと個人データ保護要件" },
    blocks: [
      P("PCI-DSS vốn viết cho toàn bộ hệ thống xử lý thẻ, nhưng phần lớn các yêu cầu trọng tâm lại là những thứ tester THỦ CÔNG hoàn toàn có thể kiểm được mà không cần công cụ chuyên dụng — chỉ cần biết đúng checklist. Bảng dưới đây gom các yêu cầu liên quan trực tiếp nhất tới công việc test hằng ngày trên cổng thanh toán VinaPay, cùng ví dụ cụ thể.",
        "PCI-DSS was originally written for entire card-processing systems, but most of its core requirements are things a MANUAL tester can fully check without specialized tools — you just need the right checklist. The table below gathers the requirements most directly relevant to everyday testing on the VinaPay payment gateway, with concrete examples.",
        "PCI-DSSはもともとカード処理システム全体向けに書かれていますが、その中核となる要件の多くは専用ツールなしでも手動テスターが完全に確認できるものです——正しいチェックリストを知っていれば十分です。下の表は、VinaPay決済ゲートウェイの日常テストに最も直結する要件を、具体的な例とともにまとめたものです。"),
      IMG(m_checklist, "Checklist yêu cầu tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân, kèm ví dụ trên VinaPay", "Checklist of PCI-DSS & personal-data-protection requirements, with VinaPay examples", "PCI-DSSと個人データ保護要件のチェックリスト、VinaPayの例付き"),
      P("Chú ý cột giữa: bảy yêu cầu này chia làm hai nhóm rõ rệt. Nhóm liên quan trực tiếp tới DỮ LIỆU THẺ (che PAN, không lưu CVV, mã hóa) thuộc PCI-DSS — bắt buộc với mọi hệ thống chạm vào thẻ thanh toán. Nhóm liên quan tới DỮ LIỆU CÁ NHÂN nói chung (audit log, đồng ý người dùng, quyền xóa/xuất dữ liệu, phân quyền) thuộc các quy định bảo vệ dữ liệu cá nhân rộng hơn — áp dụng cho mọi thông tin định danh khách hàng, không chỉ số thẻ. Một dự án fintech như VinaPay cần đáp ứng CẢ HAI nhóm song song.",
        "Notice the middle column: these seven requirements split into two clear groups. The group directly tied to CARD DATA (masking the PAN, not storing the CVV, encryption) falls under PCI-DSS — mandatory for any system touching payment cards. The group tied to PERSONAL DATA in general (audit logs, user consent, the right to delete/export data, authorization) falls under broader personal-data-protection regulations — applying to any customer identifying information, not just card numbers. A fintech project like VinaPay needs to satisfy BOTH groups in parallel.",
        "中央の列に注目してください：これら7つの要件は明確に2つのグループに分かれます。カードデータ（PANのマスキング、CVVの非保存、暗号化）に直接関わるグループはPCI-DSSに属し、決済カードに触れるすべてのシステムに必須です。一般的な個人データ（監査ログ、ユーザー同意、データ削除/エクスポート権、権限管理）に関わるグループはより広範な個人データ保護規制に属し、カード番号だけでなく顧客を識別するあらゆる情報に適用されます。VinaPayのようなフィンテックプロジェクトは、この両方のグループを同時に満たす必要があります。"),
      DEF("PCI-DSS", "bộ tiêu chuẩn bảo mật bắt buộc cho hệ thống lưu trữ, xử lý hoặc truyền dữ liệu thẻ thanh toán, do hội đồng thẻ quốc tế ban hành.",
        "the mandatory security standard for systems that store, process, or transmit payment card data, issued by the international card council.",
        "決済カードデータを保存・処理・伝送するシステムに義務付けられた、国際カード協議会が発行するセキュリティ基準。"),
    ] },
  { heading: { vi: "3. Vì sao tester cần thạo kiểm thử tuân thủ trong dự án fintech", en: "3. Why testers need to master compliance testing on fintech projects", ja: "3. フィンテックプロジェクトでテスターがコンプライアンステストを習得すべき理由" },
    blocks: [
      P("Trên một cổng thanh toán & ví fintech như VinaPay, hậu quả của một lỗi tuân thủ bị bỏ sót nghiêm trọng hơn hẳn một lỗi giao diện thông thường. Số thẻ hoặc dữ liệu cá nhân bị lộ qua log không được che có thể dẫn tới gian lận tài chính trên diện rộng, phạt hành chính từ cơ quan quản lý, thậm chí bị tổ chức thẻ quốc tế thu hồi quyền xử lý thanh toán. Đội Compliance/pháp chế chuyên trách thường không đủ người để rà soát chi tiết từng dòng log của mọi tính năng mới, trong khi tester lại là người trực tiếp chạm vào dữ liệu thật trong quá trình test.",
        "On a payment gateway & fintech wallet like VinaPay, the consequence of a missed compliance issue is far more severe than an ordinary UI bug. Card numbers or personal data exposed through unmasked logs can lead to widespread financial fraud, regulatory fines, or even having the payment-processing privilege revoked by the international card scheme. A dedicated Compliance/legal team often doesn't have enough people to review every log line of every new feature in detail, while testers are the ones directly touching real-shaped data during testing.",
        "VinaPayのような決済ゲートウェイ＆フィンテックウォレットでは、見逃されたコンプライアンス問題の結果は通常のUIバグよりもはるかに深刻です。マスクされていないログを通じて漏洩したカード番号や個人データは、広範な金融詐欺、規制当局からの罰金、さらには国際カードスキームによる決済処理権限の剥奪につながり得ます。専任のコンプライアンス/法務チームは、すべての新機能の全ログ行を詳細にレビューするだけの人数がいないことが多く、一方でテスターはテスト中に実データに近い形のデータに直接触れる存在です。"),
      P("Đây cũng là lý do 'tư duy tuân thủ' ngày càng trở thành yêu cầu bắt buộc ở cấp độ tester nâng cao/senior trong ngành tài chính — nhiều nhà tuyển dụng hỏi thẳng: 'Cho một tính năng lưu lịch sử giao dịch, bạn kiểm những gì ngoài chức năng?'. Trả lời được bằng tư duy PAN masking, audit log, phân quyền dữ liệu thay vì chỉ nói 'em test đủ trường hợp chức năng' cho thấy bạn hiểu rõ đặc thù ngành fintech, không chỉ dừng ở test app thông thường.",
        "This is also why a 'compliance mindset' is increasingly a requirement at the advanced/senior tester level in finance — many interviewers ask directly: 'Given a transaction-history feature, what do you check besides functionality?'. Answering with PAN masking, audit log, and data-authorization thinking instead of just saying 'I test enough functional cases' shows you understand fintech's specific nature, not just how to test an ordinary app.",
        "これが、金融業界における上級/シニアレベルのテスターにとって『コンプライアンス思考』がますます必須要件となっている理由でもあります——多くの採用担当者が直接こう質問します：『取引履歴を保存する機能があるとして、機能面以外に何を確認しますか？』。『十分な機能ケースをテストします』とだけ答えるのではなく、PANマスキング、監査ログ、データ権限管理の思考で答えられれば、通常のアプリテストにとどまらないフィンテック特有の理解を示せます。"),
      P("Và quan trọng nhất: chi phí phát hiện một lỗ hổng tuân thủ ở giai đoạn test luôn rẻ hơn rất nhiều so với việc bị phát hiện sau khi khách hàng thật đã bị lộ dữ liệu — cả về tiền phạt, thời gian khắc phục lẫn niềm tin của hàng nghìn người dùng đang gửi gắm tiền vào ví VinaPay. Đầu tư đúng mức vào checklist tuân thủ cơ bản chính là bạn đang bảo vệ trực tiếp cả doanh nghiệp lẫn khách hàng.",
        "And most importantly: the cost of catching a compliance gap at the testing stage is always far cheaper than having it discovered after real customer data has been exposed — in fines, remediation time, and the trust of the thousands of users entrusting their money to the VinaPay wallet. Properly investing in a basic compliance checklist directly protects both the business and its customers.",
        "そして最も重要なのは、テスト段階でコンプライアンスの不備を発見するコストは、実際の顧客データが漏洩した後に発覚するよりも、罰金・是正時間・VinaPayウォレットにお金を託す何千人ものユーザーの信頼という面すべてにおいて遥かに安いということです。基本的なコンプライアンスチェックリストに適切に投資することは、事業と顧客の両方を直接守ることになります。"),
    ] },
  { heading: { vi: "4. Nguyên tắc AN TOÀN khi kiểm thử tuân thủ (đừng dùng dữ liệu thật)", en: "4. SAFETY principles for compliance testing (don't use real data)", ja: "4. コンプライアンステストの安全原則（実データを使わない）" },
    blocks: [
      P("Trước khi thực hành bất kỳ kỹ thuật nào ở các chương sau, bạn cần thuộc lòng nguyên tắc an toàn — đây là ranh giới giữa 'tester có trách nhiệm' và 'chính bạn trở thành nguồn rò rỉ dữ liệu'.",
        "Before practicing any technique in the following chapters, you must know the safety principles by heart — this is the line between a 'responsible tester' and 'becoming the data-leak source yourself'.",
        "以降の章でいずれかの技法を実践する前に、安全原則を必ず頭に入れておく必要があります——これが『責任あるテスター』と『自分自身がデータ漏洩源になる』ことの境界線です。"),
      STEP(1, "Chỉ dùng dữ liệu test/giả: thẻ test do cổng thanh toán cấp (ví dụ dải số 4111...), số điện thoại/CCCD giả, tài khoản test riêng — tuyệt đối không dùng thẻ hay thông tin cá nhân thật của bạn hoặc người khác.", "Only use test/fake data: test cards issued by the payment gateway (e.g. the 4111... range), fake phone numbers/ID numbers, dedicated test accounts — never use your own or anyone else's real card or personal information.", "テスト用/偽のデータのみを使う：決済ゲートウェイが発行するテストカード（例：4111...の番号帯）、偽の電話番号/身分証番号、専用のテストアカウント——自分自身や他人の本物のカードや個人情報を絶対に使わない。"),
      STEP(2, "Chỉ thao tác trên môi trường staging/test, không chạm production trừ khi có văn bản cho phép và có giám sát của Compliance/Security.", "Only operate on the staging/test environment; never touch production unless you have written authorization and Compliance/Security oversight.", "ステージング/テスト環境でのみ操作し、書面での許可とコンプライアンス/セキュリティの監督がない限り本番環境には触れない。"),
      STEP(3, "Khi trích xuất bằng chứng (log, ảnh chụp response) để báo lỗi, luôn CHE các trường nhạy cảm trước khi đính kèm vào ticket — kể cả khi đó là dữ liệu test.", "When extracting evidence (logs, response screenshots) for a bug report, always MASK sensitive fields before attaching them to the ticket — even if it's test data.", "バグ報告のために証拠（ログ、レスポンスのスクリーンショット）を取得する際は、テストデータであってもチケットに添付する前に機密フィールドを必ずマスクする。"),
      PITFALL("Nghĩ rằng 'dùng thử số điện thoại thật của mình cho nhanh, không sao đâu'. Dữ liệu thật một khi đã lọt vào log/DB test rất khó thu hồi hoàn toàn — luôn dùng dữ liệu giả có định dạng hợp lệ thay vì dữ liệu thật của bất kỳ ai.", "Thinking 'I'll just quickly use my own real phone number, it's fine'. Once real data lands in a test log/DB it's very hard to fully retract — always use validly-formatted fake data instead of anyone's real information.", "『自分の本当の電話番号をちょっと使うだけだから大丈夫』と考えること。実データが一度テストログ/DBに入ると完全に取り除くのは非常に困難です——常に誰の実情報でもない、有効な形式の偽データを使いましょう。"),
      TIP("Nếu công ty có sổ tay 'dữ liệu test chuẩn' (thẻ test, tài khoản test theo từng vai trò), luôn dùng đúng bộ dữ liệu đó thay vì tự nghĩ ra số ngẫu nhiên có thể trùng với dữ liệu thật.", "If your company has a 'standard test data' handbook (test cards, role-based test accounts), always use that exact dataset instead of making up random numbers that might collide with real data.", "会社に『標準テストデータ』の手引き（テストカード、役割別テストアカウント）がある場合は、実データと衝突しかねないランダムな番号を自分で考えるのではなく、必ずそのデータセットを使いましょう。"),
    ] },
  { heading: { vi: "5. Thực hành: kiểm che/không lưu số thẻ đầy đủ (PAN masking & tokenization)", en: "5. Hands-on: testing PAN masking & tokenization", ja: "5. 実践：PANマスキングとトークン化のテスト" },
    blocks: [
      P("PAN (Primary Account Number) là số thẻ đầy đủ in trên mặt thẻ. Đây là dữ liệu nhạy cảm nhất trong toàn bộ luồng thanh toán, nên là mục kiểm đầu tiên và quan trọng nhất khi test tuân thủ trên VinaPay.",
        "The PAN (Primary Account Number) is the full card number printed on the card. It's the most sensitive piece of data in the entire payment flow, so it's the first and most important item to check for compliance on VinaPay.",
        "PAN（プライマリーアカウント番号）とはカード表面に印字された完全なカード番号です。決済フロー全体の中で最も機密性の高いデータであり、VinaPayのコンプライアンステストで最初かつ最も重要な確認項目です。"),
      STEP(1, "Trên giao diện thanh toán và các màn hình lịch sử giao dịch, kiểm PAN chỉ hiển thị tối đa 6 số đầu + 4 số cuối (ví dụ '4111 11•• •••• 4242'), phần giữa được che.", "On the checkout screen and transaction-history screens, check that the PAN shows at most the first 6 and last 4 digits (e.g. '4111 11•• •••• 4242'), with the middle masked.", "決済画面や取引履歴画面で、PANが最初の6桁と最後の4桁まで（例：『4111 11•• •••• 4242』）のみ表示され、中間がマスクされていることを確認する。"),
      STEP(2, "Mở tab Network của trình duyệt (trên staging), thực hiện một giao dịch thật (test), kiểm response JSON của API thanh toán/lịch sử — PAN trong response cũng phải được che hoặc thay bằng token, không phải chuỗi số thật.", "Open the browser's Network tab (on staging), perform a real (test) transaction, and check the payment/history API's JSON response — the PAN in the response must also be masked or replaced with a token, not the real digit string.", "（ステージング上で）ブラウザのNetworkタブを開き、実際の（テスト）取引を行い、決済/履歴APIのJSONレスポンスを確認する——レスポンス内のPANもマスクされているか、実際の数字列ではなくトークンに置き換えられている必要がある。"),
      STEP(3, "Nếu hệ thống dùng tokenization (thay PAN thật bằng một chuỗi token dùng nội bộ), kiểm token đó không thể suy ngược ra PAN gốc nếu không qua dịch vụ giải mã có kiểm soát riêng.", "If the system uses tokenization (replacing the real PAN with an internal-use token string), check that this token cannot be reverse-engineered into the original PAN without going through a separately controlled decryption service.", "システムがトークン化（実際のPANを内部利用のトークン文字列に置き換える）を使用している場合、そのトークンが別途統制された復号サービスを経ずには元のPANに逆変換できないことを確認する。"),
      STEP(4, "Lặp lại kiểm tra ở các nơi dễ bị bỏ sót: email xác nhận giao dịch, biên lai PDF, thông báo đẩy (push notification) — mọi kênh hiển thị lại số thẻ đều phải tuân theo cùng quy tắc che.", "Repeat the check in easily-overlooked places: transaction confirmation emails, PDF receipts, push notifications — every channel that echoes back the card number must follow the same masking rule.", "見落としやすい箇所でも繰り返し確認する：取引確認メール、PDFの領収書、プッシュ通知——カード番号を表示するすべてのチャネルが同じマスキングルールに従う必要がある。"),
      CODE("text", "KIEM THU PAN MASKING - man hinh thanh toan & lich su giao dich VinaPay\nBuoc 1: Thanh toan bang the test 4111 1111 1111 4242 (staging)\nBuoc 2: Xem man hinh xac nhan -> PAN hien '4111 11.. .... 4242' (DAT)\nBuoc 3: Mo tab Network, kiem response GET /api/transactions/{id}\nKet qua mong doi : truong card_number la '411111******4242' hoac token, KHONG phai so that\nKet qua thuc te (neu loi): response tra card_number day du 16 so (BUG - vi pham PCI-DSS)"),
      TRY("Kiểm thêm một kênh khác trên hệ thống bạn đang test có hiển thị lại số thẻ (email, biên lai, thông báo) và xác nhận nó có tuân theo đúng quy tắc che PAN không.", "Check one more channel in the system you're testing that echoes back the card number (email, receipt, notification) and confirm whether it follows the correct PAN-masking rule.", "テスト中のシステムでカード番号を表示する別のチャネル（メール、領収書、通知）を確認し、正しいPANマスキングルールに従っているか確かめよう。"),
    ] },
  { heading: { vi: "6. Thực hành: kiểm mã hóa dữ liệu nhạy cảm & nhật ký audit log", en: "6. Hands-on: testing sensitive-data encryption & audit logging", ja: "6. 実践：機密データの暗号化と監査ログのテスト" },
    blocks: [
      P("Che PAN trên giao diện mới chỉ là bề nổi. Dữ liệu nhạy cảm còn cần được mã hóa cả khi lưu trữ (at-rest) lẫn khi truyền (in-transit), và mọi hành động truy cập dữ liệu đó cần có nhật ký audit để truy vết khi cần.",
        "Masking the PAN on screen is only the surface. Sensitive data also needs to be encrypted both at rest and in transit, and every access to that data needs an audit log for traceability when required.",
        "画面上でPANをマスクするのは表面的な対応にすぎません。機密データは保存時（at-rest）も伝送時（in-transit）も暗号化される必要があり、そのデータへのすべてのアクセスは必要な際に追跡できるよう監査ログを持つ必要があります。"),
      STEP(1, "Kiểm kênh truyền: toàn bộ API liên quan thanh toán/dữ liệu cá nhân phải dùng HTTPS/TLS; thử gọi bằng HTTP thuần (nếu có thể trên staging) và xác nhận bị từ chối hoặc redirect sang HTTPS.", "Check the transport channel: all payment/personal-data APIs must use HTTPS/TLS; try calling over plain HTTP (if possible on staging) and confirm it's rejected or redirected to HTTPS.", "伝送チャネルを確認する：決済/個人データに関わるすべてのAPIはHTTPS/TLSを使用する必要がある。（ステージングで可能であれば）平文HTTPで呼び出しを試み、拒否されるかHTTPSにリダイレクトされることを確認する。"),
      STEP(2, "Kiểm dữ liệu lúc lưu trữ: với quyền truy vấn môi trường test, xem cột dữ liệu nhạy cảm (PAN, CCCD, số dư ví) trong DB có ở dạng mã hóa/hash hay lưu thô.", "Check data at rest: with query access to the test environment, see whether sensitive-data columns (PAN, ID number, wallet balance) in the DB are encrypted/hashed or stored raw.", "保存時のデータを確認する：テスト環境へのクエリ権限を使い、DB内の機密データ列（PAN、身分証番号、ウォレット残高）が暗号化/ハッシュ化されているか、生で保存されているか確認する。"),
      STEP(3, "Thực hiện một hành động xem/sửa dữ liệu nhạy cảm (ví dụ CSKH mở hồ sơ khách hàng), sau đó kiểm bảng/hệ thống audit log có ghi lại đúng: ai, khi nào, thao tác gì, trên đối tượng nào.", "Perform an action that views/modifies sensitive data (e.g. support staff opening a customer profile), then check the audit-log table/system correctly records: who, when, what action, on which object.", "機密データを閲覧/変更する操作（例：CSKHが顧客プロフィールを開く）を行い、その後、監査ログのテーブル/システムが誰が・いつ・何の操作を・どの対象に行ったかを正しく記録しているか確認する。"),
      STEP(4, "Thử xóa hoặc sửa trực tiếp một bản ghi audit log (nếu có quyền test) — hệ thống PHẢI từ chối hoặc chỉ cho phép thêm mới (append-only), không cho sửa/xóa log đã ghi.", "Try deleting or directly editing an audit-log record (if you have test access) — the system MUST reject it, or only allow append-only additions, never letting existing log entries be modified/deleted.", "（テスト権限があれば）監査ログのレコードを直接削除または編集してみる——システムは必ず拒否するか、追記のみ（append-only）を許可し、既存のログエントリの変更/削除を一切許してはならない。"),
      CODE("text", "KIEM THU AUDIT LOG - CSKH mo ho so khach hang tren staging\nBuoc 1: Dang nhap tai khoan CSKH test\nBuoc 2: Mo ho so khach hang A (/customers/{id})\nBuoc 3: Truy van bang audit_log ngay sau do\nKet qua mong doi : co 1 dong log moi: actor=CSKH_test, action=VIEW_PROFILE, target=customer_A, time=...\nKet qua thuc te (neu loi): khong co dong log nao duoc ghi (BUG - thieu audit log)"),
      IMG(m_auditgrid, "Bảng ca kiểm audit log & mã hóa dữ liệu nhạy cảm trên VinaPay", "A table of audit-log & sensitive-data-encryption test cases on VinaPay", "VinaPayにおける監査ログ・機密データ暗号化のテストケース表"),
      SITUATION("Bạn cố tình ngắt mạng giữa chừng khi thanh toán để tạo một giao dịch lỗi, rồi mở log service payment-gateway để xem hệ thống ghi lại điều gì.", "You deliberately disconnect the network mid-payment to trigger a failed transaction, then open the payment-gateway service log to see what the system records.",
        "Dòng log lỗi in ra nguyên văn 'card=4111111111114242, cvv=123' dạng plaintext — toàn bộ số thẻ đầy đủ và CVV đều bị ghi lại rõ ràng, chỉ vì hệ thống log 'toàn bộ request body' khi có lỗi để tiện debug.",
        "The error log line prints out verbatim 'card=4111111111114242, cvv=123' in plaintext — the full card number and CVV are both clearly recorded, simply because the system logs 'the entire request body' on error for easier debugging.",
        "決済中にわざとネットワークを切断して取引を失敗させ、payment-gatewayサービスのログを開いてシステムが何を記録するか確認する。",
        "エラーログの行に『card=4111111111114242, cvv=123』が平文でそのまま出力されている——デバッグしやすくするためエラー時に『リクエストボディ全体』をログに記録する仕様になっており、カード番号全体とCVVがはっきり記録されてしまっている。"),
      SOLVE("Báo bug Critical ngay lập tức (vi phạm PCI-DSS nghiêm trọng), yêu cầu backend lọc/che các trường nhạy cảm (PAN, CVV, mật khẩu) TRƯỚC KHI ghi log ở mọi nhánh xử lý kể cả nhánh lỗi, và bổ sung ca kiểm 'log khi giao dịch lỗi' vào bộ hồi quy bảo mật cho mọi service chạm dữ liệu thẻ.", "Report a Critical bug immediately (a serious PCI-DSS violation), require the backend to filter/mask sensitive fields (PAN, CVV, password) BEFORE writing to logs on every code path including the error path, and add a 'log on failed transaction' case to the security regression suite for every service touching card data.", "直ちにCriticalバグとして報告し（重大なPCI-DSS違反）、エラーパスを含むすべての処理経路でログに書き込む前に機密フィールド（PAN、CVV、パスワード）をフィルタリング/マスクするようバックエンドに要求し、カードデータに触れるすべてのサービスのセキュリティ回帰テストスイートに『取引失敗時のログ』ケースを追加する。"),
      IMG(m_jira, "Ticket lỗi log lưu nguyên số thẻ đầy đủ (PAN) và CVV dạng plaintext khi giao dịch lỗi", "The bug ticket for logs storing the full card number (PAN) and CVV in plaintext on a failed transaction", "取引失敗時にカード番号全体（PAN）とCVVが平文でログに記録されるバグのチケット"),
      RECAP(["Che PAN trên giao diện KHÔNG đồng nghĩa dữ liệu an toàn ở mọi tầng", "Luôn kiểm log ở CẢ nhánh thành công lẫn nhánh lỗi — lỗi hay 'trốn' ở nhánh lỗi vì ít ai để ý"],
        ["Masking the PAN on screen does NOT mean the data is safe at every layer", "Always check logs on BOTH the success and error paths — bugs often 'hide' in the error path since fewer people look there"],
        ["画面上でPANをマスクしても全ての層でデータが安全とは限らない", "成功パスとエラーパスの両方でログを必ず確認する——バグは誰も注目しないエラーパスに『隠れ』がち"]),
    ] },
  { heading: { vi: "7. Thực hành: kiểm đồng ý người dùng & quyền xóa/xuất dữ liệu cá nhân", en: "7. Hands-on: testing user consent & the right to delete/export personal data", ja: "7. 実践：ユーザー同意と個人データの削除/エクスポート権のテスト" },
    blocks: [
      P("Ngoài dữ liệu thẻ, VinaPay còn lưu rất nhiều dữ liệu cá nhân khác của khách hàng (số điện thoại, CCCD, địa chỉ, lịch sử giao dịch). Nhóm quy định bảo vệ dữ liệu cá nhân yêu cầu người dùng phải được xin đồng ý rõ ràng trước khi thu thập/dùng dữ liệu, và có quyền yêu cầu xóa hoặc xuất dữ liệu của chính mình bất cứ lúc nào.",
        "Besides card data, VinaPay also stores plenty of other personal data about customers (phone number, ID number, address, transaction history). Personal-data-protection regulations require that users give clear consent before their data is collected/used, and that they have the right to request deletion or export of their own data at any time.",
        "カードデータ以外にも、VinaPayは顧客の多くの個人データ（電話番号、身分証番号、住所、取引履歴）を保存しています。個人データ保護規制は、データが収集/使用される前にユーザーから明確な同意を得ること、そしていつでも自分自身のデータの削除やエクスポートを要求する権利を持つことを求めています。"),
      STEP(1, "Kiểm màn hình đăng ký/onboarding: có bước xin đồng ý rõ ràng (checkbox không được tick sẵn) trước khi thu thập dữ liệu cá nhân không, có liên kết tới chính sách quyền riêng tư đầy đủ không.", "Check the sign-up/onboarding screen: is there a clear consent step (a checkbox that is NOT pre-ticked) before personal data is collected, and a link to the full privacy policy?", "登録/オンボーディング画面を確認する：個人データを収集する前に明確な同意ステップ（デフォルトでチェックされていないチェックボックス）があるか、完全なプライバシーポリシーへのリンクがあるか。"),
      STEP(2, "Kiểm mục Cài đặt quyền riêng tư: người dùng có thể BẬT/TẮT từng loại đồng ý riêng biệt (ví dụ đồng ý nhận marketing, đồng ý chia sẻ dữ liệu cho đối tác) mà không ảnh hưởng tới chức năng cốt lõi (thanh toán, ví) không.", "Check the Privacy Settings section: can users independently TOGGLE each type of consent (e.g. marketing consent, data-sharing-with-partners consent) without it affecting core functionality (payment, wallet)?", "プライバシー設定を確認する：ユーザーが各種類の同意（例：マーケティング同意、パートナーへのデータ共有同意）を個別にオン/オフでき、それがコア機能（決済、ウォレット）に影響しないか。"),
      STEP(3, "Kiểm tính năng 'Xóa tài khoản': thực hiện yêu cầu xóa trên tài khoản test, sau đó xác nhận dữ liệu cá nhân thực sự bị xóa/ẩn danh trong thời hạn công bố (ví dụ 30 ngày), không còn hiện trong tra cứu nội bộ thông thường.", "Check the 'Delete account' feature: submit a deletion request on a test account, then confirm the personal data is genuinely deleted/anonymized within the published timeframe (e.g. 30 days), no longer appearing in normal internal lookups.", "『アカウント削除』機能を確認する：テストアカウントで削除リクエストを送信し、公表された期限内（例：30日）に個人データが実際に削除/匿名化され、通常の社内照会に表示されなくなることを確認する。"),
      STEP(4, "Kiểm tính năng 'Xuất dữ liệu của tôi': yêu cầu xuất dữ liệu cá nhân, xác nhận file trả về đầy đủ, đúng định dạng dễ đọc, và không kèm dữ liệu của người khác do lỗi lọc sai.", "Check the 'Export my data' feature: request a personal-data export, confirm the returned file is complete, in a readable format, and doesn't include another user's data due to a filtering bug.", "『自分のデータをエクスポート』機能を確認する：個人データのエクスポートをリクエストし、返されたファイルが完全で読みやすい形式であり、フィルタリングの不具合により他人のデータが含まれていないことを確認する。"),
      CODE("text", "KIEM THU QUYEN XOA DU LIEU CA NHAN - tai khoan test VinaPay\nBuoc 1: Bam 'Xoa tai khoan' tren tai khoan test B, xac nhan yeu cau\nBuoc 2: Cho du thoi han cong bo (vd 30 ngay, hoac gia lap tren staging)\nBuoc 3: Tra cuu tai khoan B qua man hinh quan tri noi bo\nKet qua mong doi : khong con thay ten that/SDT/CCCD cua B, hoac hien 'da xoa/an danh'\nKet qua thuc te (neu loi): van thay day du ho so goc cua B (BUG - vi pham quyen xoa du lieu)"),
      TRY("Thử tìm màn hình đồng ý (consent) trong app fintech bạn đang dùng và kiểm xem checkbox đồng ý có bị tick sẵn từ đầu không — đó là dấu hiệu vi phạm phổ biến.", "Try finding the consent screen in a fintech app you use and check whether the consent checkbox is pre-ticked by default — that's a common violation sign.", "使っているフィンテックアプリで同意画面を探し、同意のチェックボックスが最初からチェックされていないか確認してみよう——それはよくある違反の兆候です。"),
    ] },
  { heading: { vi: "8. Thực hành: kiểm phân quyền truy cập dữ liệu nhạy cảm (RBAC)", en: "8. Hands-on: testing role-based access control for sensitive data", ja: "8. 実践：機密データへのロールベースアクセス制御のテスト" },
    blocks: [
      P("Dữ liệu được che, mã hóa và có audit log vẫn chưa đủ nếu SAI người vẫn xem được nó. Phân quyền theo vai trò (RBAC) đảm bảo chỉ những ai thực sự cần dữ liệu nhạy cảm để làm việc mới được truy cập — đúng nguyên tắc tối thiểu (least privilege).",
        "Data that is masked, encrypted, and audit-logged still isn't enough if the WRONG person can still see it. Role-based access control (RBAC) ensures only those who genuinely need sensitive data for their job can access it — the principle of least privilege.",
        "データがマスクされ、暗号化され、監査ログがあっても、間違った人物がまだそれを閲覧できるなら十分ではありません。ロールベースアクセス制御（RBAC）は、業務上本当に機密データを必要とする人だけがアクセスできることを保証します——最小権限の原則です。"),
      STEP(1, "Liệt kê các vai trò trong hệ thống VinaPay (CSKH, Vận hành kho/đối tác, Kế toán, Admin kỹ thuật) và dữ liệu nhạy cảm mà mỗi vai trò THỰC SỰ cần để làm việc.", "List the roles in the VinaPay system (Customer support, Warehouse/partner operations, Accounting, Technical admin) and the sensitive data each role ACTUALLY needs to do its job.", "VinaPayシステムのロール（CSKH、倉庫/パートナー運用、会計、技術管理者）と、各ロールが業務上『本当に』必要とする機密データを列挙する。"),
      STEP(2, "Đăng nhập bằng tài khoản test của một vai trò KHÔNG liên quan tới dữ liệu cá nhân/tài chính (ví dụ Vận hành kho), thử truy cập trực tiếp API/trang hồ sơ khách hàng hoặc số dư ví.", "Log in with a test account for a role that is NOT related to personal/financial data (e.g. Warehouse operations), and try to directly access the customer-profile API/page or wallet balance.", "個人/財務データに関係のないロール（例：倉庫運用）のテストアカウントでログインし、顧客プロフィールのAPI/ページやウォレット残高への直接アクセスを試みる。"),
      STEP(3, "Kiểm cả ở tầng API lẫn tầng giao diện: nút/màn hình có thể bị ẩn trên UI, nhưng nếu gọi thẳng API bằng đúng tài khoản đó mà vẫn nhận được dữ liệu, đó vẫn là lỗi phân quyền nghiêm trọng.", "Check both at the API layer and the UI layer: a button/screen may be hidden in the UI, but if calling the API directly with that same account still returns the data, it's still a serious authorization bug.", "API層とUI層の両方を確認する：UI上はボタン/画面が隠されていても、同じアカウントで直接APIを呼び出してデータが返ってくるなら、それでも深刻な権限の不具合です。"),
      SITUATION("Đội chỉ test phân quyền bằng cách kiểm menu/nút trên giao diện của từng vai trò — mọi ca đều pass vì UI đã ẩn đúng các mục nhạy cảm, ai cũng yên tâm release.", "The team only tests authorization by checking each role's UI menus/buttons — every case passes because the UI correctly hides sensitive items, everyone feels safe releasing.",
        "Một nhân viên vận hành kho tò mò gọi thẳng API '/api/customers/{id}/profile' bằng token của mình (không qua giao diện) và vẫn nhận được đầy đủ hồ sơ, số dư ví của khách hàng. Tệ hơn, hệ thống không ghi bất kỳ audit log nào cho lượt truy cập này — không ai biết nhân viên đó đã xem dữ liệu của bao nhiêu khách hàng trong quá khứ.",
        "A warehouse operations employee, out of curiosity, directly calls the API '/api/customers/{id}/profile' with their own token (bypassing the UI) and still receives the customer's full profile and wallet balance. Worse, the system logs no audit trail for this access — no one knows how many customers' data this employee has viewed in the past.",
        "チームは各ロールのUIメニュー/ボタンを確認するだけで権限テストを実施——UIが機密項目を正しく隠しているため全ケース合格、安心してリリース。",
        "倉庫運用の従業員が好奇心から自分のトークンで直接API『/api/customers/{id}/profile』を呼び出す（UIを経由せず）と、顧客の完全なプロフィールとウォレット残高を取得できてしまう。さらに悪いことに、システムはこのアクセスに対して監査ログを一切記録しておらず、この従業員が過去に何人の顧客データを閲覧したか誰にも分からない。"),
      SOLVE("Báo bug Critical ngay (lộ dữ liệu tài chính + thiếu audit log cùng lúc), yêu cầu backend kiểm tra vai trò (role check) ở TẦNG API cho mọi endpoint dữ liệu nhạy cảm chứ không chỉ ẩn trên UI, đồng thời bổ sung audit log bắt buộc cho mọi truy cập — kể cả truy cập bị từ chối, để phát hiện các lần dò quyền.", "Report a Critical bug immediately (financial data exposure plus a missing audit log at once), require the backend to enforce role checks at the API LAYER for every sensitive-data endpoint rather than only hiding it in the UI, and add mandatory audit logging for every access attempt — including denied ones — to detect privilege-probing.", "直ちにCriticalバグとして報告し（財務データの露出と監査ログの欠如が同時に発生）、UIで隠すだけでなくすべての機密データエンドポイントでAPI層でのロールチェックを実施するようバックエンドに要求し、権限の探索行為を検知できるよう、拒否されたアクセスも含めすべてのアクセス試行に監査ログを必須化する。"),
      IMG(m_kanban, "Bảng theo dõi các lỗi tuân thủ tìm được qua đợt kiểm thử (VinaPay · Compliance sweep)", "A board tracking compliance issues found during a testing sweep (VinaPay · Compliance sweep)", "テストで発見されたコンプライアンス問題を追跡するボード（VinaPay・コンプライアンススイープ）"),
      RECAP(["Ẩn menu/nút trên UI KHÔNG thay thế được kiểm tra quyền ở tầng API", "Thiếu audit log khiến một lỗ hổng phân quyền trở nên nguy hiểm gấp đôi — không thể truy vết ai đã xem gì"],
        ["Hiding menus/buttons in the UI does NOT replace an authorization check at the API layer", "A missing audit log makes an authorization hole twice as dangerous — it becomes impossible to trace who viewed what"],
        ["UIでメニュー/ボタンを隠すことはAPI層での権限チェックの代わりにはならない", "監査ログの欠如は権限の不備を二重に危険にする——誰が何を見たか追跡できなくなる"]),
    ] },
  { heading: { vi: "9. Theo dõi kết quả & lỗi thường gặp khi kiểm thử tuân thủ", en: "9. Tracking results & common mistakes in compliance testing", ja: "9. コンプライアンステストの結果追跡とよくある失敗" },
    blocks: [
      P("Sau mỗi đợt kiểm tuân thủ, nên tổng hợp số liệu để đội Compliance/Security và quản lý dự án thấy rõ bức tranh tổng thể, thay vì chỉ báo từng ticket rời rạc.",
        "After each compliance-testing sweep, results should be aggregated into metrics so the Compliance/Security team and project management can see the overall picture, instead of only reporting scattered individual tickets.",
        "コンプライアンステストの各回の後は、コンプライアンス/セキュリティチームとプロジェクト管理者が個別のチケットではなく全体像を把握できるよう、結果を指標として集計すべきです。"),
      IMG(m_dash, "Số liệu tổng hợp một đợt kiểm tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân trên VinaPay", "Aggregated metrics from a PCI-DSS & personal-data-protection compliance sweep on VinaPay", "VinaPayにおけるPCI-DSSと個人データ保護のコンプライアンステストの集計指標"),
      PITFALL("Chỉ kiểm PAN masking trên giao diện rồi dừng lại, quên hẳn tầng log/API response/database — như đã thấy ở chương 6, đây là nơi dễ 'lọt' dữ liệu nhất vì ít ai chủ động nhìn vào.", "Only checking PAN masking on screen then stopping, forgetting the log/API-response/database layers entirely — as seen in chapter 6, this is where data most easily 'leaks through' because few people actively look there.", "画面上のPANマスキングだけ確認して止め、ログ/APIレスポンス/データベース層を完全に忘れること——第6章で見たように、ここは誰も積極的に見ないため最もデータが『漏れやすい』箇所です。"),
      PITFALL("Chỉ kiểm phân quyền qua giao diện (menu/nút bị ẩn) mà không thử gọi thẳng API — như tình huống ở chương 8, đây là lỗ hổng phân quyền phổ biến và nghiêm trọng nhất bị bỏ sót.", "Only checking authorization through the UI (hidden menus/buttons) without trying to call the API directly — as in chapter 8's situation, this is the most common and severe authorization hole that gets missed.", "APIを直接呼び出さず、UI（隠されたメニュー/ボタン）だけで権限を確認すること——第8章のシーンのように、これは最も一般的かつ深刻な、見逃されがちな権限の不備です。"),
      TIP("Ưu tiên kiểm tuân thủ ngay từ giai đoạn thiết kế/review ca kiểm thử của tính năng mới liên quan tới thẻ hoặc dữ liệu cá nhân, thay vì chỉ kiểm sau khi đã code xong — phát hiện càng sớm, chi phí sửa càng thấp.", "Prioritize compliance checks starting from the design/test-case-review stage of any new feature involving cards or personal data, instead of only checking after coding is done — the earlier it's caught, the cheaper it is to fix.", "カードや個人データに関わる新機能については、コーディング完了後だけでなく、設計/テストケースレビューの段階からコンプライアンスチェックを優先しよう——早く発見するほど修正コストは低くなります。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử bảo mật cơ bản cho Tester (OWASP Top 10)", "Basic security testing for testers (OWASP Top 10)", "kiem-thu-bao-mat-co-ban-owasp-cho-tester", "テスター向け基本セキュリティテスト（OWASP Top 10）"),
      INTERNAL("Kiểm thử phân quyền (Authorization) cho người mới", "Authorization testing for beginners", "kiem-thu-phan-quyen-authorization-cho-nguoi-moi", "初心者のための権限テスト"),
      INTERNAL("Kiểm thử dựa trên rủi ro (Risk-based) cho Tester", "Risk-based testing for testers", "kiem-thu-dua-tren-rui-ro-risk-based-cho-tester", "テスターのためのリスクベーステスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách kiểm thử tuân thủ trên cổng thanh toán & ví fintech VinaPay: checklist PCI-DSS & bảo vệ dữ liệu cá nhân nhìn từ góc tester, nguyên tắc AN TOÀN bắt buộc (chỉ dữ liệu test, chỉ staging), và thực hành từng bước với PAN masking/tokenization, mã hóa dữ liệu & audit log, đồng ý người dùng, quyền xóa/xuất dữ liệu cá nhân, và phân quyền truy cập theo vai trò. Hai tình huống thật cho thấy chỉ một dòng log quên che hoặc một API quên kiểm quyền cũng có thể làm lộ dữ liệu tài chính của hàng nghìn khách hàng. Đây là kỹ năng nâng cao giúp bạn trở thành tester đáng tin cậy trong bất kỳ dự án fintech/ngân hàng nào.",
        "You just learned how to perform compliance testing on the VinaPay payment gateway & fintech wallet: the PCI-DSS & personal-data-protection checklist from a tester's angle, the mandatory SAFETY principles (test data only, staging only), and step-by-step practice with PAN masking/tokenization, sensitive-data encryption & audit logging, user consent, the right to delete/export personal data, and role-based access control. Two real situations showed that a single unmasked log line or an API missing an authorization check can expose thousands of customers' financial data. This advanced skill helps you become a trustworthy tester on any fintech/banking project.",
        "VinaPayの決済ゲートウェイ＆フィンテックウォレットでコンプライアンステストを行う方法を学びました：テスターの視点から見たPCI-DSSと個人データ保護のチェックリスト、必須の安全原則（テストデータのみ、ステージングのみ）、そしてPANマスキング/トークン化、機密データの暗号化と監査ログ、ユーザー同意、個人データの削除/エクスポート権、ロールベースアクセス制御に対する段階的な実践。2つの実例は、マスクし忘れたログの1行や権限チェックを忘れたAPIが、何千人もの顧客の財務データを漏洩させ得ることを示しました。これはあらゆるフィンテック/銀行プロジェクトで信頼できるテスターになるための上級スキルです。"),
      P("Chặng tiếp theo, bạn nên học sâu hơn về kiểm thử bảo mật cơ bản (OWASP Top 10) và kiểm thử dựa trên rủi ro để biết ưu tiên đúng chỗ khi thời gian có hạn, trước khi tiếp cận các công cụ đánh giá tuân thủ chuyên dụng. Nếu muốn học bài bản từ con số 0 tới đi làm, có phần thực chiến kiểm thử chức năng lẫn tư duy bảo mật/tuân thủ cơ bản cùng người hướng dẫn và dự án thật, một khoá học Tester chuyên nghiệp sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vào các dự án fintech/ngân hàng.",
        "Next, you should dive deeper into basic security testing (OWASP Top 10) and risk-based testing to know how to prioritize correctly when time is limited, before moving on to dedicated compliance-assessment tools. If you want to learn properly from zero to hired, with hands-on functional testing plus basic security/compliance thinking, a mentor, and real projects, a professional Tester course will help you progress fast and apply confidently to fintech/banking projects.",
        "次は、専用のコンプライアンス評価ツールに進む前に、時間が限られる中で正しく優先順位を付ける方法を知るため、基本的なセキュリティテスト（OWASP Top 10）とリスクベーステストをより深く学ぶとよいでしょう。指導者と実際の案件とともに、機能テストの実践と基本的なセキュリティ/コンプライアンス思考を含め、ゼロから就職までしっかり学びたいなら、プロフェッショナルなテスターコースがフィンテック/銀行プロジェクトへの速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const MA_COMPLIANCE_DOC = makeDoc({
  slug: "kiem-thu-tuan-thu-compliance-pci-cho-tester",
  domain: "fintech",
  primaryKeyword: "kiểm thử tuân thủ",
  keywords: ["kiểm thử tuân thủ", "compliance testing", "PCI-DSS", "bảo vệ dữ liệu cá nhân", "PAN masking", "audit log fintech"],
  coverLabel: "NÂNG CAO · COMPLIANCE PCI · FINTECH",
  crumb: "Kiểm thử tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân cho Tester Fintech",
  metaTitle: { vi: "Kiểm thử tuân thủ PCI-DSS cho Tester Fintech", en: "PCI-DSS compliance testing for fintech testers", ja: "フィンテックテスター向けPCI-DSSコンプライアンステスト" },
  metaDescription: {
    vi: "Kiểm thử tuân thủ PCI-DSS & bảo vệ dữ liệu cho tester fintech: che số thẻ, mã hóa, audit log, quyền xóa dữ liệu, phân quyền cổng thanh toán, có trắc nghiệm.",
    en: "Compliance testing for fintech testers: PCI-DSS card masking, encryption, audit logs, data-deletion rights, and access control on the VinaPay payment gateway — with visuals and a quiz.",
    ja: "フィンテックテスター向けコンプライアンステスト：VinaPay決済ゲートウェイでのPCI-DSSカードマスキング、暗号化、監査ログ、データ削除権、アクセス制御。図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử tuân thủ (Compliance: PCI-DSS, bảo vệ dữ liệu cá nhân) cho hệ thanh toán Fintech (có trắc nghiệm)",
    en: "Compliance testing (PCI-DSS, personal-data protection) for a fintech payment system (with quiz)",
    ja: "フィンテック決済システムのコンプライアンステスト（PCI-DSS、個人データ保護）（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao cho tester: kiểm thử tuân thủ (compliance) PCI-DSS và bảo vệ dữ liệu cá nhân trên cổng thanh toán & ví fintech VinaPay. Che/không lưu số thẻ đầy đủ (PAN masking, tokenization), mã hóa dữ liệu nhạy cảm, nhật ký audit log, đồng ý người dùng, quyền xóa/xuất dữ liệu cá nhân, phân quyền truy cập theo vai trò — luôn AN TOÀN, chỉ dùng dữ liệu test. Nhiều mockup giao diện, 2 tình huống thật, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article for testers: PCI-DSS and personal-data-protection compliance testing on the VinaPay payment gateway & fintech wallet. Masking/not storing the full card number (PAN masking, tokenization), sensitive-data encryption, audit logging, user consent, the right to delete/export personal data, and role-based access control — always SAFELY, using only test data. Many UI mockups, two real situations, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "テスター向け上級記事：VinaPay決済ゲートウェイ＆フィンテックウォレットでのPCI-DSSと個人データ保護のコンプライアンステスト。カード番号全体のマスキング/非保存（PANマスキング、トークン化）、機密データの暗号化、監査ログ、ユーザー同意、個人データの削除/エクスポート権、ロールベースアクセス制御——常に安全に、テストデータのみを使用。多数のモック、2つの実例、FAQ、5問クイズ。CyberSoftテスターコースへのリンク付き。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử tuân thủ PCI-DSS & bảo vệ dữ liệu cá nhân", steps: [
    { name: "Kiểm che/không lưu số thẻ đầy đủ", text: "PAN chỉ hiện 6 số đầu + 4 số cuối, kiểm cả UI, API response, log, database." },
    { name: "Kiểm mã hóa & nhật ký audit log", text: "Dữ liệu nhạy cảm mã hóa at-rest/in-transit; mọi truy cập đều có audit log append-only." },
    { name: "Kiểm đồng ý & quyền xóa/xuất dữ liệu", text: "Xin đồng ý rõ ràng, xử lý đúng hạn yêu cầu xóa/xuất dữ liệu cá nhân." },
    { name: "Kiểm phân quyền truy cập dữ liệu", text: "Chỉ vai trò cần thiết mới xem được dữ liệu nhạy cảm, kiểm cả ở tầng API." },
  ] },
  pages,
});

export const MA_COMPLIANCE_01 = [MA_COMPLIANCE_DOC];
