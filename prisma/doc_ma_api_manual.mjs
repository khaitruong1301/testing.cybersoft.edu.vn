// doc_ma_api_manual.mjs — BÀI MANUAL "NÂNG CAO": Kiểm thử API thủ công nâng cao bằng Postman
// (contract/schema, mã trạng thái, biên, dữ liệu âm, phân quyền theo vai trò, idempotency,
// phân trang) — gắn dự án API bệnh án điện tử MediCare EHR của bệnh viện.
// Song ngữ Việt/English/日本語 (ja≠en), 12 chương (ch.11 QUIZ, ch.12 tổng kết), chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, jira, postman, kanban, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, kiểm thử API nâng cao, công cụ & dự án thực chiến.",
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
    tags: tags("congnghe", "healthcare", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ══════════════════════════════════════════════════════════════════════════════════════
// Dự án: MediCare EHR — API bệnh án điện tử của bệnh viện (Electronic Health Record)
// ══════════════════════════════════════════════════════════════════════════════════════

// ── Mockup 1: Postman GET danh sách bệnh án (phân trang, response chuẩn) ──
const m_postman_list = postman({
  method: "GET", url: "api.medicare-ehr.vn/v1/patients/BN-88421/records?page=1&limit=20",
  status: 200, time: "142 ms", size: "3.4 KB", ok: true,
  body: [
    "{",
    '  "data": [',
    '    { "id": "HS-70231", "diagnosis": "Viem phoi", "doctorId": "BS-102", "createdAt": "2026-03-11" },',
    '    { "id": "HS-70198", "diagnosis": "Tang huyet ap", "doctorId": "BS-104", "createdAt": "2026-02-02" }',
    "  ],",
    '  "page": 1, "limit": 20, "total": 47',
    "}",
  ],
});

// ── Mockup 2: Postman GET nhưng response VI PHẠM hợp đồng (kiểu dữ liệu sai) ──
const m_postman_contract_fail = postman({
  method: "GET", url: "api.medicare-ehr.vn/v1/patients/BN-88421/records?page=1&limit=20",
  status: 200, time: "138 ms", size: "3.1 KB", ok: false,
  body: [
    "{",
    '  "data": [',
    '    { "id": "HS-70231", "diagnosis": null, "doctorId": 102, "createdAt": "11/03/2026" }',
    "  ],",
    '  "page": "1", "limit": 20, "total": 47',
    "}",
    "// FAIL: diagnosis=null (schema yeu cau string), doctorId la number",
    "// FAIL: createdAt sai dinh dang ISO 8601, page la string thay vi number",
  ],
});

// ── Mockup 3: bảng tổng quan các loại ca kiểm thử API nâng cao ──
const m_types = grid("Các loại ca kiểm thử API nâng cao — hệ thống bệnh án điện tử MediCare", ["Loại kiểm thử", "Mục tiêu", "Ví dụ trên API MediCare"], [
  ["Hợp đồng (contract/schema)", "Kiểu dữ liệu & trường bắt buộc đúng tài liệu API", "'diagnosis' phải là string, không được null"],
  ["Mã trạng thái", "Đúng status code cho từng tình huống nghiệp vụ", "Sửa đơn thuốc không tồn tại → 404, không phải 200"],
  ["Biên tham số", "Giá trị tại/ngoài ranh giới cho phép", "limit=0, limit=101, page=-1"],
  ["Dữ liệu âm", "Payload sai định dạng, thiếu trường bắt buộc", "CCCD 9 số, ngày sinh trong tương lai"],
  ["Phân quyền (RBAC)", "Chỉ đúng vai trò mới được thao tác", "Điều dưỡng không được sửa đơn thuốc"],
  ["Idempotency", "Gọi lặp cùng request không tạo tác dụng phụ kép", "Gọi lại PUT với cùng Idempotency-Key"],
], { accent: "#0e7490" });

// ── Mockup 4: bảng hợp đồng (contract) response chuẩn ──
const m_contract = grid("Hợp đồng (contract) response — GET /v1/patients/{id}/records", ["Trường", "Kiểu", "Bắt buộc", "Ràng buộc"], [
  ["id", "string", "Có", "Định dạng HS-#####"],
  ["diagnosis", "string", "Có", "Không null, 1–500 ký tự"],
  ["doctorId", "string", "Có", "Định dạng BS-###"],
  ["createdAt", "string (ISO 8601)", "Có", "yyyy-MM-dd"],
  ["page", "number", "Có", "≥ 1"],
  ["limit", "number", "Có", "1–100"],
  ["total", "number", "Có", "≥ 0"],
], { accent: "#0e7490", note: "Contract test: so khớp schema này với response thật (JSON Schema/Postman test script), không chỉ đọc mắt thường." });

// ── Mockup 5: ma trận phân quyền bác sĩ vs điều dưỡng ──
const m_rbac = grid("Ma trận phân quyền theo vai trò — API MediCare (Bác sĩ vs Điều dưỡng)", ["Hành động API", "Bác sĩ (BAC_SI)", "Điều dưỡng (DIEU_DUONG)"], [
  ["GET đơn thuốc", "Cho phép", "Cho phép"],
  ["PUT sửa đơn thuốc", "Cho phép", "KHÔNG cho phép → 403"],
  ["POST tạo hồ sơ bệnh án", "Cho phép", "KHÔNG cho phép → 403"],
  ["PUT cập nhật sinh hiệu (mạch, nhiệt độ)", "Cho phép", "Cho phép"],
  ["DELETE hủy đơn thuốc", "Cho phép (có audit log)", "KHÔNG cho phép → 403"],
], { accent: "#0e7490", highlight: 1 });

// ── Mockup 6: ticket Jira lỗi phân quyền — điều dưỡng sửa đơn thuốc vẫn 200 ──
const m_jira_rbac = jira({
  key: "MED-5510", title: "PUT /v1/prescriptions/{id}: điều dưỡng sửa đơn thuốc vẫn trả 200 thay vì 403",
  type: "Bug", status: "New", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "staging · api.medicare-ehr.vn · Postman collection MED-Regression"],
    ["Vai trò gọi API", "DIEU_DUONG (điều dưỡng) — token hợp lệ nhưng không có quyền sửa đơn thuốc"],
    ["Các bước", "1) Đăng nhập lấy access token vai trò điều dưỡng 2) PUT /v1/prescriptions/RX-77210 với liều lượng mới 3) Xem status code + body trả về"],
    ["Kết quả mong đợi", "403 Forbidden, đơn thuốc giữ nguyên, có log cảnh báo truy cập trái quyền"],
    ["Kết quả thực tế", "200 OK, liều lượng đơn thuốc bị điều dưỡng thay đổi thành công"],
    ["Bằng chứng", "postman-med5510.json, response-200-dieuduong.png"],
  ],
});

// ── Mockup 7: bằng chứng Postman thô của lỗi RBAC (PUT trả 200 sai) ──
const m_postman_rbac = postman({
  method: "PUT", url: "api.medicare-ehr.vn/v1/prescriptions/RX-77210",
  status: 200, time: "98 ms", size: "0.6 KB", ok: false,
  body: [
    "Header: Authorization: Bearer <token vai tro DIEU_DUONG>",
    "{",
    '  "id": "RX-77210",',
    '  "medication": "Amoxicillin 500mg",',
    '  "dosage": "3 lan/ngay",',
    '  "updatedBy": "DD-2031 (dieu duong)",',
    '  "updatedAt": "2026-07-10T09:12:00Z"',
    "}",
  ],
});

// ── Mockup 8: Postman POST tạo đơn thuốc kèm Idempotency-Key ──
const m_postman_idem = postman({
  method: "POST", url: "api.medicare-ehr.vn/v1/prescriptions",
  status: 201, time: "110 ms", size: "0.5 KB", ok: true,
  body: [
    "Header: Idempotency-Key: 9f2b-77210-a",
    "{",
    '  "id": "RX-88110",',
    '  "medication": "Paracetamol 500mg",',
    '  "dosage": "2 vien/ngay",',
    '  "patientId": "BN-88421"',
    "}",
    "// Goi lai lan 2 CUNG Idempotency-Key -> phai tra ve CUNG id RX-88110, status 200 (khong tao ban ghi moi)",
  ],
});

// ── Mockup 9: Postman GET trả 500 lộ stack trace + dữ liệu bệnh nhân nhạy cảm ──
const m_postman_500 = postman({
  method: "GET", url: "api.medicare-ehr.vn/v1/patients/BN-99012",
  status: 500, time: "3120 ms", size: "6.8 KB", ok: false,
  body: [
    "{",
    '  "error": "NullPointerException",',
    '  "message": "Cannot read patient.insuranceId",',
    '  "stack": "at PatientService.getById(PatientService.java:214)",',
    '  "patient": { "name": "Nguyen Van A", "cccd": "079203xxxxxx", "diagnosis": "HIV+" }',
    "}",
  ],
});

// ── Mockup 10: kanban theo dõi lỗi API tìm được ──
const m_kanban = kanban("Bảng theo dõi lỗi API tìm được — MediCare EHR (Sprint 22)", [
  { name: "New", cards: [
    { key: "MED-5510", title: "Dieu duong sua don thuoc van 200", sev: "Critical" },
    { key: "MED-5522", title: "500 lo stack trace + chan doan benh nhan", sev: "Critical" },
  ] },
  { name: "Open", cards: [
    { key: "MED-5498", title: "limit=101 van tra 100 dong, khong bao loi", sev: "Medium" },
  ] },
  { name: "Fixed", cards: [
    { key: "MED-5470", title: "CCCD 9 so van duoc chap nhan", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "MED-5401", title: "PUT lap Idempotency-Key tao 2 don thuoc", sev: "High" },
  ] },
]);

// ── Mockup 11: dashboard số liệu kiểm thử API sprint ──
const m_dash = dashboard("Số liệu kiểm thử API nâng cao — MediCare EHR Sprint 22", [
  { label: "Tổng ca kiểm thử API", value: "96", sub: "contract+boundary+negative+RBAC", color: "#0e7490" },
  { label: "Lỗi phân quyền (RBAC)", value: "5", sub: "mức Critical/High", color: "#e11d48" },
  { label: "Lỗi hợp đồng/schema", value: "9", sub: "kiểu dữ liệu sai", color: "#7c3aed" },
  { label: "Lỗi lộ dữ liệu nhạy cảm", value: "3", sub: "stack trace, log", color: "#dc2626" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử hợp đồng (contract testing) API bằng Postman thủ công khác gì với việc chỉ đọc response bằng mắt?",
  "How does manual API contract testing with Postman differ from just eyeballing the response?",
  "Kiểm thử hợp đồng nghĩa là bạn so khớp response thật với một đặc tả cố định (kiểu dữ liệu, trường bắt buộc, định dạng) bằng test script trong Postman (pm.test + Ajv/JSON Schema), thay vì chỉ nhìn qua thấy 'có dữ liệu là được'. Nó bắt được các lỗi tinh vi như diagnosis trả về null, doctorId là number thay vì string, hay ngày tháng sai định dạng ISO — những lỗi dễ lọt qua nếu chỉ đọc mắt thường nhưng làm sập ứng dụng phía client khi parse dữ liệu.",
  "Contract testing means you check the real response against a fixed spec (data types, required fields, formats) using Postman test scripts (pm.test + Ajv/JSON Schema), instead of just glancing and seeing 'there's data, good enough'. It catches subtle bugs like diagnosis returning null, doctorId being a number instead of a string, or a malformed ISO date — bugs that easily slip past a visual check but crash the client app when parsing the data.",
  "契約テスト（contract testing）は手動でPostmanのレスポンスを目視確認するのと何が違うの？",
  "契約テストとは、実際のレスポンスを固定された仕様（データ型、必須項目、フォーマット）とPostmanのテストスクリプト（pm.test + Ajv/JSON Schema）で照合することで、単に『データがあればOK』と目視するのとは異なります。診断名がnullで返る、doctorIdが文字列でなく数値である、日付がISO形式でないといった微妙なバグを検出できます。これらは目視だけでは見逃しやすいですが、クライアント側でデータをパースする際にアプリをクラッシュさせます。");
const faq2 = FAQ(
  "Vì sao kiểm thử phân quyền (RBAC) trên API lại đặc biệt quan trọng với hệ thống bệnh án điện tử?",
  "Why is RBAC (role-based access control) testing on APIs especially critical for electronic health record systems?",
  "Vì API bệnh án điện tử xử lý dữ liệu cực nhạy cảm (chẩn đoán, đơn thuốc, tiền sử bệnh) và có nhiều vai trò với quyền khác nhau (bác sĩ, điều dưỡng, thu ngân, admin). Nếu chỉ test 'API hoạt động đúng' mà bỏ qua kiểm thử theo từng vai trò, một lỗ hổng như điều dưỡng sửa được đơn thuốc (vốn chỉ bác sĩ mới được phép) có thể gây hậu quả trực tiếp tới sức khỏe bệnh nhân và vi phạm quy định bảo vệ dữ liệu y tế. Broken Access Control cũng là hạng mục đứng top OWASP API Security Top 10.",
  "Because EHR APIs handle extremely sensitive data (diagnoses, prescriptions, medical history) and involve multiple roles with different permissions (doctor, nurse, cashier, admin). If you only test 'the API works' and skip role-specific testing, a hole like a nurse being able to edit a prescription (which only doctors should be allowed to do) can directly harm patient safety and violate health data protection regulations. Broken Access Control also sits at the top of the OWASP API Security Top 10.",
  "電子カルテシステムでAPIのロールベースアクセス制御（RBAC）テストが特に重要な理由は？",
  "電子カルテAPIは非常に機密性の高いデータ（診断名、処方箋、既往歴）を扱い、権限の異なる複数の役割（医師、看護師、会計、管理者）が存在するためです。『APIが正しく動く』ことだけをテストし役割別テストを省くと、看護師が本来医師しか許可されていない処方箋を編集できてしまうような穴が生じ、患者の安全に直接影響し医療データ保護規制にも違反します。アクセス制御の不備（Broken Access Control）はOWASP API Security Top 10の最上位項目でもあります。");
const faq3 = FAQ(
  "Idempotency-Key dùng để làm gì khi kiểm thử API, và nên test thế nào cho đúng?",
  "What is an Idempotency-Key used for when testing APIs, and how should you test it properly?",
  "Idempotency-Key là một header do client tự sinh, gửi kèm các request có tác dụng phụ (POST tạo đơn thuốc, thanh toán...) để server nhận diện 'đây là cùng một yêu cầu bị gửi lại' (do mất mạng, người dùng bấm nút 2 lần) và trả về đúng kết quả lần đầu thay vì tạo bản ghi trùng. Cách test đúng: gọi request lần 1, ghi lại id trả về; gọi lại y hệt với CÙNG Idempotency-Key và kiểm tra server trả về CÙNG id đó (không tạo thêm bản ghi mới); sau đó đổi Idempotency-Key và xác nhận lần này mới thực sự tạo bản ghi mới.",
  "An Idempotency-Key is a header the client generates itself, sent with requests that have side effects (POST to create a prescription, a payment...) so the server can recognize 'this is the same request being resent' (due to a lost connection, a double-click) and return the original result instead of creating a duplicate record. The correct way to test it: call the request once, note the returned id; call it again with the SAME Idempotency-Key and verify the server returns the SAME id (no new record created); then change the Idempotency-Key and confirm a new record is genuinely created this time.",
  "Idempotency-Keyはテストの何に使い、どうテストするのが正しい？",
  "Idempotency-Keyは、副作用を伴うリクエスト（処方箋作成のPOST、決済など）に付与するクライアント生成のヘッダーで、サーバーが『これは通信断や二重クリックによる同一リクエストの再送だ』と認識し、重複レコードを作らず最初の結果をそのまま返すためのものです。正しいテスト方法：1回目のリクエストを送りidを記録する。同じIdempotency-Keyで再度送信し、サーバーが同じidを返す（新規レコードが作られない）ことを確認する。その後Idempotency-Keyを変えて、今度は本当に新しいレコードが作成されることを確認する。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử hợp đồng (contract/schema) API kiểm tra điều gì?", en: "What does API contract/schema testing check?", ja: "API契約（スキーマ）テストは何を確認する？" },
    options: [
      { vi: "Response có đúng kiểu dữ liệu, trường bắt buộc, định dạng như đặc tả không", en: "Whether the response has correct data types, required fields, and formats per spec", ja: "レスポンスの型、必須項目、形式が仕様どおりか" },
      { vi: "Tốc độ phản hồi của server có nhanh không", en: "Whether the server responds quickly", ja: "サーバーの応答が速いかどうか" },
      { vi: "Giao diện người dùng hiển thị đẹp không", en: "Whether the UI looks nice", ja: "UIの見た目が美しいかどうか" },
      { vi: "Số lượng người dùng đồng thời tối đa", en: "The maximum number of concurrent users", ja: "最大同時ユーザー数" },
    ], correct: 0,
    explain: { vi: "Contract testing so khớp response thật với đặc tả (kiểu dữ liệu, trường bắt buộc, định dạng), bắt lỗi như diagnosis=null hay ngày sai ISO 8601.", en: "Contract testing matches the real response against the spec (data types, required fields, formats), catching bugs like diagnosis=null or a wrong ISO 8601 date.", ja: "契約テストは実際のレスポンスを仕様（型、必須項目、形式）と照合し、diagnosis=nullや誤ったISO 8601日付のようなバグを検出します。" },
  }),
  mcq({
    q: { vi: "Gọi PUT /v1/prescriptions/{id} với id không tồn tại, mã trạng thái ĐÚNG nên là gì?", en: "Calling PUT /v1/prescriptions/{id} with a non-existent id, what is the CORRECT status code?", ja: "存在しないidでPUT /v1/prescriptions/{id}を呼んだ場合、正しいステータスコードは？" },
    options: [
      { vi: "200 OK", en: "200 OK", ja: "200 OK" },
      { vi: "404 Not Found", en: "404 Not Found", ja: "404 Not Found" },
      { vi: "201 Created", en: "201 Created", ja: "201 Created" },
      { vi: "500 Internal Server Error", en: "500 Internal Server Error", ja: "500 Internal Server Error" },
    ], correct: 1,
    explain: { vi: "Đơn thuốc không tồn tại thì thao tác sửa phải trả 404, trả 200 là lỗi thiết kế/kiểm thử mã trạng thái nghiêm trọng.", en: "If the prescription doesn't exist, the update should return 404; returning 200 is a serious status-code design/testing bug.", ja: "処方箋が存在しない場合、更新操作は404を返すべきで、200を返すのは深刻な設計・テスト上のバグです。" },
  }),
  mcq({
    q: { vi: "Điều dưỡng (không có quyền) gọi PUT sửa đơn thuốc nhưng hệ thống vẫn trả 200 thay vì 403 — đây là lỗi loại gì?", en: "A nurse (without permission) calls PUT to edit a prescription but the system still returns 200 instead of 403 — what kind of bug is this?", ja: "権限のない看護師が処方箋編集のPUTを呼んでも403ではなく200が返る——これは何のバグ？" },
    options: [
      { vi: "Lỗi hiệu năng (performance)", en: "A performance bug", ja: "パフォーマンスのバグ" },
      { vi: "Lỗi phân quyền / kiểm soát truy cập (broken access control)", en: "An authorization / broken access control bug", ja: "権限（アクセス制御の不備）のバグ" },
      { vi: "Lỗi giao diện (UI)", en: "A UI bug", ja: "UIのバグ" },
      { vi: "Lỗi chính tả nội dung", en: "A content typo", ja: "文言の誤字" },
    ], correct: 1,
    explain: { vi: "Hệ thống không kiểm tra đúng vai trò trước khi cho phép thao tác — đây là Broken Access Control, hạng mục top OWASP API Security.", en: "The system fails to verify the caller's role before allowing the action — this is Broken Access Control, a top OWASP API Security item.", ja: "システムが操作を許可する前に呼び出し元の役割を正しく検証していない——これはOWASP API Securityの上位項目であるアクセス制御の不備です。" },
  }),
  mcq({
    q: { vi: "Idempotency-Key trong kiểm thử API POST dùng để làm gì?", en: "What is an Idempotency-Key used for when testing a POST API?", ja: "POST APIのテストでIdempotency-Keyは何のために使う？" },
    options: [
      { vi: "Mã hoá mật khẩu người dùng", en: "Encrypting the user's password", ja: "ユーザーのパスワードを暗号化する" },
      { vi: "Đảm bảo gọi lại cùng request (do mất mạng/bấm 2 lần) không tạo ra bản ghi trùng lặp", en: "Ensuring a resent request (due to lost connection/double-click) doesn't create a duplicate record", ja: "通信断や二重クリックで再送されても重複レコードを作らないようにする" },
      { vi: "Tăng tốc độ phản hồi API", en: "Speeding up the API's response", ja: "APIの応答速度を上げる" },
      { vi: "Đổi ngôn ngữ hiển thị response", en: "Changing the response's display language", ja: "レスポンスの表示言語を変える" },
    ], correct: 1,
    explain: { vi: "Idempotency-Key giúp server nhận diện request bị gửi lại và trả về đúng kết quả lần đầu, tránh tạo bản ghi trùng (vd đơn thuốc bị tạo 2 lần).", en: "The Idempotency-Key helps the server recognize a resent request and return the original result, avoiding duplicate records (e.g. a prescription created twice).", ja: "Idempotency-Keyはサーバーが再送リクエストを認識し最初の結果を返すのを助け、重複レコード（例：処方箋が2回作成される）を防ぎます。" },
  }),
  mcq({
    q: { vi: "API giới hạn tối đa limit=100, bạn gửi limit=101 để kiểm tra — đây là kỹ thuật kiểm thử gì?", en: "An API caps limit at 100, and you send limit=101 to check it — what testing technique is this?", ja: "APIの上限がlimit=100のところ、limit=101を送って確認する——これは何のテスト技法？" },
    options: [
      { vi: "Kiểm thử biên (boundary testing)", en: "Boundary testing", ja: "境界値テスト" },
      { vi: "Kiểm thử hiệu năng (load testing)", en: "Load testing", ja: "負荷テスト" },
      { vi: "Kiểm thử giao diện (UI testing)", en: "UI testing", ja: "UIテスト" },
      { vi: "Kiểm thử cài đặt (installation testing)", en: "Installation testing", ja: "インストールテスト" },
    ], correct: 0,
    explain: { vi: "Gửi giá trị ngay tại/ngoài giới hạn cho phép (100, 101, 0, -1) là kiểm thử biên áp dụng cho tham số API.", en: "Sending values right at/beyond the allowed limit (100, 101, 0, -1) is boundary testing applied to API parameters.", ja: "許容範囲の境界付近/外の値（100、101、0、-1）を送るのはAPIパラメータに対する境界値テストです。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & hệ thống bạn sẽ kiểm thử", en: "1. TL;DR & the system you'll test", ja: "1. 要点とテスト対象システム" },
    blocks: [
      TLDR("Kiểm thử API thủ công nâng cao bằng Postman không dừng ở 'gửi request rồi xem status 200' — nó gồm kiểm thử hợp đồng/schema, đúng mã trạng thái theo nghiệp vụ, giá trị biên tham số, dữ liệu âm, phân quyền theo vai trò, idempotency và phân trang. Bài này bám sát API bệnh án điện tử MediCare EHR của một bệnh viện thật: bác sĩ, điều dưỡng thao tác trên hồ sơ bệnh nhân và đơn thuốc qua REST API. Có 9+ mockup Postman/Jira/Kanban, 2 tình huống lỗi thật, và trắc nghiệm cuối bài.",
        "Advanced manual API testing with Postman doesn't stop at 'send a request, see status 200' — it covers contract/schema testing, correct business-driven status codes, boundary parameter values, negative data, role-based authorization, idempotency, and pagination. This article follows the REST API of MediCare EHR, a real hospital's electronic health record system: doctors and nurses operate on patient records and prescriptions through it. It includes 9+ Postman/Jira/Kanban mockups, two real bug situations, and a quiz.",
        "Postmanを使った手動API上級テストは『リクエストを送ってステータス200を見る』だけでは終わりません——契約・スキーマテスト、業務に即した正しいステータスコード、パラメータの境界値、ネガティブデータ、ロールベースの認可、冪等性（idempotency）、ページネーションまで含みます。本記事は実際の病院の電子カルテシステムMediCare EHRのREST APIに沿います：医師と看護師が患者記録と処方箋をこのAPI経由で操作します。9以上のPostman/Jira/Kanbanモック、2つの実際のバグシーン、クイズ付きです。"),
      P("Kiểm thử API thủ công nâng cao là kỹ năng bắt buộc với tester ở dự án doanh nghiệp, đặc biệt trong lĩnh vực y tế — nơi một API sai không chỉ gây bug hiển thị mà có thể ảnh hưởng trực tiếp tới an toàn bệnh nhân (đơn thuốc sai liều) hoặc vi phạm bảo mật dữ liệu (lộ chẩn đoán bệnh). Trong bài này, bạn sẽ làm tester cho hệ thống MediCare EHR: bệnh viện dùng REST API để bác sĩ và điều dưỡng truy cập hồ sơ bệnh án, đơn thuốc, và dữ liệu sinh hiệu của bệnh nhân qua nhiều ứng dụng (web nội bộ, app di động cho điều dưỡng, cổng liên viện).",
        "Advanced manual API testing is a mandatory skill for testers on enterprise projects, especially in healthcare — where a broken API doesn't just cause a display bug but can directly threaten patient safety (a wrong prescription dosage) or violate data security (a leaked diagnosis). In this article you'll act as tester for MediCare EHR: the hospital uses a REST API so doctors and nurses can access patient records, prescriptions, and vital-sign data across multiple apps (internal web, a mobile app for nurses, an inter-hospital portal).",
        "手動APIの上級テストは、企業案件のテスターにとって必須のスキルであり、特に医療分野では、壊れたAPIが単なる表示バグにとどまらず、患者の安全（誤った処方量）やデータセキュリティ（診断名の漏洩）に直接影響します。本記事ではMediCare EHRシステムのテスターとして、病院がREST APIを使い医師と看護師が複数のアプリ（社内Web、看護師用モバイルアプリ、病院間ポータル）を通じて患者記録・処方箋・バイタルデータにアクセスする様子を見ていきます。"),
      IMG(m_postman_list, "Postman: GET danh sách bệnh án của bệnh nhân BN-88421, response chuẩn có phân trang", "Postman: GET a patient's (BN-88421) records, a well-formed paginated response", "Postman：患者BN-88421のカルテ一覧をGET、正しくページネーションされたレスポンス"),
      DEF("Contract Testing (kiểm thử hợp đồng API)", "so khớp response thật của API với một đặc tả cố định (kiểu dữ liệu, trường bắt buộc, định dạng) để phát hiện sai lệch mà kiểm thử chức năng thông thường dễ bỏ sót.",
        "matching an API's real response against a fixed spec (data types, required fields, formats) to catch deviations that ordinary functional testing easily misses.",
        "APIの実際のレスポンスを固定された仕様（型、必須項目、形式）と照合し、通常の機能テストでは見逃しやすいズレを検出する手法。"),
      P("Bảy khía cạnh nâng cao bạn sẽ luyện trong bài: (1) kiểm thử hợp đồng/schema response, (2) thiết kế ca theo mã trạng thái HTTP đúng ngữ nghĩa nghiệp vụ, (3) kiểm thử biên tham số phân trang/ID/ngày tháng, (4) kiểm thử dữ liệu âm cho payload, (5) kiểm thử phân quyền theo vai trò bác sĩ/điều dưỡng, (6) idempotency cho các API có tác dụng phụ, (7) kiểm thử phân trang nâng cao (offset vs cursor). Mỗi phần đều có ví dụ Postman thật, không phải lý thuyết suông.",
        "Seven advanced angles you'll practice in this article: (1) response contract/schema testing, (2) designing cases around business-correct HTTP status codes, (3) boundary testing for pagination/ID/date parameters, (4) negative testing for payloads, (5) role-based authorization testing for doctors/nurses, (6) idempotency for side-effecting APIs, (7) advanced pagination testing (offset vs cursor). Every part comes with a real Postman example, not just theory.",
        "本記事で練習する7つの上級視点：(1) レスポンスの契約・スキーマテスト、(2) 業務的に正しいHTTPステータスコードに基づくケース設計、(3) ページネーション・ID・日付パラメータの境界値テスト、(4) ペイロードのネガティブテスト、(5) 医師・看護師のロールベース認可テスト、(6) 副作用のあるAPIの冪等性、(7) 上級ページネーションテスト（オフセット vs カーソル）。各項目には理論だけでなく実際のPostman例が付きます。"),
    ] },
  { heading: { vi: "2. Kiểm thử hợp đồng (contract) & schema response", en: "2. Contract & response schema testing", ja: "2. 契約（コントラクト）とレスポンススキーマのテスト" },
    blocks: [
      P("Kiểm thử hợp đồng trả lời câu hỏi: 'Response API có ĐÚNG hình dạng mà mọi client (web, app di động, hệ thống liên viện) đang mong đợi không?'. Khác với kiểm thử chức năng chỉ hỏi 'API có trả về dữ liệu đúng nghiệp vụ không', contract testing kiểm tra ở mức thấp hơn: kiểu dữ liệu của từng trường, trường nào bắt buộc phải có, định dạng ngày giờ, và các ràng buộc giá trị. Đây là lớp kiểm thử cực kỳ quan trọng với hệ thống nhiều client tiêu thụ cùng một API như MediCare EHR.",
        "Contract testing answers: 'Does the API response have the EXACT shape every client (web, mobile app, inter-hospital system) expects?'. Unlike functional testing, which only asks 'does the API return business-correct data', contract testing checks at a lower level: each field's data type, which fields are mandatory, date/time formats, and value constraints. This layer of testing is critical for systems with many clients consuming the same API, like MediCare EHR.",
        "契約テストが答える問いは『APIのレスポンスは、あらゆるクライアント（Web、モバイルアプリ、病院間システム）が期待する形状と正確に一致しているか』です。『APIが業務的に正しいデータを返すか』だけを問う機能テストとは異なり、契約テストはより低いレベルを確認します：各フィールドのデータ型、必須フィールド、日時フォーマット、値の制約です。この層のテストは、MediCare EHRのように多くのクライアントが同一APIを利用するシステムでは極めて重要です。"),
      IMG(m_contract, "Bảng hợp đồng (contract) response chuẩn của GET /v1/patients/{id}/records", "The standard response contract table for GET /v1/patients/{id}/records", "GET /v1/patients/{id}/recordsの標準レスポンス契約表"),
      P("Trong thực tế, đội phát triển hiếm khi cung cấp bộ JSON Schema hoàn chỉnh — tester nâng cao cần TỰ dựng bảng hợp đồng từ tài liệu API (Swagger/OpenAPI) hoặc từ response mẫu, rồi viết test script trong Postman (tab Tests) dùng pm.response.to.have.jsonSchema() hoặc kiểm tra thủ công typeof từng trường. Các lỗi hợp đồng phổ biến nhất ở hệ thống y tế: trường chẩn đoán (diagnosis) trả về null dù được đánh dấu bắt buộc, id bác sĩ trả kiểu số thay vì chuỗi mã hoá (BS-102 vs 102), và ngày tháng không theo chuẩn ISO 8601 khiến client parse sai lệch múi giờ.",
        "In practice, dev teams rarely provide a complete JSON Schema — an advanced tester needs to BUILD the contract table themselves from API docs (Swagger/OpenAPI) or sample responses, then write a Postman test script (Tests tab) using pm.response.to.have.jsonSchema() or manually checking typeof for each field. The most common contract bugs in healthcare systems: the diagnosis field returning null despite being marked required, a doctor id returning as a number instead of an encoded string (BS-102 vs 102), and dates not following ISO 8601, causing clients to mis-parse the timezone.",
        "実際には開発チームが完全なJSON Schemaを提供することは稀です——上級テスターはAPIドキュメント（Swagger/OpenAPI）やサンプルレスポンスから自分で契約表を構築し、Postmanのテストスクリプト（Testsタブ）でpm.response.to.have.jsonSchema()を使うか、各フィールドのtypeofを手動で確認する必要があります。医療システムで最も多い契約バグ：必須と明記されているのにdiagnosisフィールドがnullで返る、医師のidがエンコードされた文字列でなく数値で返る（BS-102 対 102）、日付がISO 8601形式でなくクライアントがタイムゾーンを誤ってパースする、などです。"),
      IMG(m_postman_contract_fail, "Postman: response VI PHẠM hợp đồng — diagnosis=null, doctorId là số, createdAt sai định dạng", "Postman: a response that VIOLATES the contract — diagnosis=null, doctorId is a number, createdAt has the wrong format", "Postman：契約に違反したレスポンス——diagnosis=null、doctorIdが数値、createdAtの形式が誤り"),
      TIP("Lưu bảng hợp đồng (contract) vào cùng thư mục Postman collection và chạy lại nó ở MỌI lần hồi quy API — hợp đồng thay đổi âm thầm (breaking change) là nguyên nhân phổ biến khiến app di động sập mà không ai biết trước khi release.", "Keep the contract table in the same Postman collection folder and re-run it on EVERY API regression pass — a silently changing contract (a breaking change) is a common reason a mobile app crashes without anyone knowing before release.", "契約表を同じPostmanコレクションフォルダに保存し、APIの回帰テストの度に必ず再実行しましょう——契約が静かに変わること（破壊的変更）は、リリース前に誰も気づかずモバイルアプリがクラッシュする一般的な原因です。"),
    ] },
  { heading: { vi: "3. Mã trạng thái HTTP: thiết kế ca theo status code", en: "3. HTTP status codes: designing cases around them", ja: "3. HTTPステータスコード：それに基づくケース設計" },
    blocks: [
      P("Người mới thường chỉ kiểm tra 'API có trả 200 không'. Tester nâng cao phải thiết kế ca kiểm thử sao cho MỖI tình huống nghiệp vụ ánh xạ đúng một mã trạng thái ngữ nghĩa: 200 (thành công, có body), 201 (tạo mới thành công), 204 (thành công, không body — ví dụ DELETE), 400 (payload sai định dạng), 401 (chưa xác thực/token hết hạn), 403 (đã xác thực nhưng không đủ quyền), 404 (tài nguyên không tồn tại), 409 (xung đột, ví dụ đơn thuốc đã bị huỷ), 422 (dữ liệu hợp lệ cú pháp nhưng sai logic nghiệp vụ), 500 (lỗi hệ thống). Nhầm giữa các mã này là lỗi nghiêm trọng vì client dựa vào status code để quyết định hành vi tiếp theo.",
        "Beginners usually only check 'does the API return 200'. An advanced tester must design test cases so EVERY business scenario maps to the semantically correct status code: 200 (success with body), 201 (created), 204 (success, no body — e.g. DELETE), 400 (malformed payload), 401 (unauthenticated/expired token), 403 (authenticated but insufficient permission), 404 (resource not found), 409 (conflict, e.g. the prescription was already cancelled), 422 (syntactically valid but business-logic invalid data), 500 (system error). Confusing these codes is a serious bug because clients rely on the status code to decide their next action.",
        "初心者は『APIが200を返すか』だけを確認しがちです。上級テスターは、すべての業務シナリオが意味的に正しいステータスコードに対応するようケースを設計する必要があります：200（成功・ボディあり）、201（作成成功）、204（成功・ボディなし——例：DELETE）、400（形式不正なペイロード）、401（未認証／トークン期限切れ）、403（認証済みだが権限不足）、404（リソースが存在しない）、409（競合、例：処方箋がすでにキャンセル済み）、422（構文は有効だが業務ロジック上は無効なデータ）、500（システムエラー）。クライアントは次の動作をステータスコードに基づいて決めるため、これらを取り違えるのは重大なバグです。"),
      STEP(1, "Liệt kê toàn bộ endpoint cần test (vd PUT /v1/prescriptions/{id}), với từng endpoint liệt kê các tình huống nghiệp vụ có thể xảy ra.", "List every endpoint to test (e.g. PUT /v1/prescriptions/{id}), and for each one list the possible business scenarios.", "テスト対象の全エンドポイント（例：PUT /v1/prescriptions/{id}）を列挙し、各エンドポイントで起こり得る業務シナリオを列挙する。"),
      STEP(2, "Với mỗi tình huống, tra bảng ánh xạ HTTP status để xác định mã ĐÚNG (không đoán, không copy từ endpoint khác).", "For each scenario, look up the HTTP status mapping table to determine the CORRECT code (don't guess, don't copy from another endpoint).", "各シナリオについて、HTTPステータスの対応表を参照し正しいコードを特定する（推測や他エンドポイントからのコピーはしない）。"),
      STEP(3, "Viết ca kiểm thử Postman với assertion `pm.response.to.have.status(x)` CHÍNH XÁC theo bảng, không chấp nhận '2xx là được'.", "Write a Postman test case with `pm.response.to.have.status(x)` matching the table EXACTLY, not accepting 'any 2xx is fine'.", "表に厳密に一致する`pm.response.to.have.status(x)`アサーションでPostmanのテストケースを書く。『2xxならOK』を許容しない。"),
      CODE("text", "ANH XA MA TRANG THAI - PUT /v1/prescriptions/{id}\nTinh huong: sua thanh cong, du quyen bac si       -> 200\nTinh huong: id don thuoc khong ton tai            -> 404 (KHONG phai 200)\nTinh huong: khong gui token / token het han        -> 401\nTinh huong: token hop le nhung sai vai tro (dieu duong) -> 403 (KHONG phai 200)\nTinh huong: don thuoc da bi huy truoc do            -> 409\nTinh huong: lieu luong am hoac rong                  -> 400\nTinh huong: loi he thong (DB timeout)                -> 500 (khong lo stack trace)"),
      TIP("Khi thấy một API trả 200 cho MỌI tình huống kể cả lỗi, đó gần như chắc chắn là dấu hiệu đội dev chưa xử lý status code đúng — báo ngay, đừng chỉ ghi nhận từng ca đơn lẻ.", "When you see an API returning 200 for EVERY scenario including errors, that's almost certainly a sign the dev team hasn't handled status codes correctly — flag it immediately, don't just log isolated cases.", "エラーを含むすべてのシナリオでAPIが200を返しているのを見たら、それはほぼ確実に開発チームがステータスコードを正しく処理していない兆候です——個々のケースを記録するだけでなく、すぐに報告しましょう。"),
    ] },
  { heading: { vi: "4. Kiểm thử biên tham số (boundary) cho API", en: "4. Boundary testing for API parameters", ja: "4. APIパラメータの境界値テスト" },
    blocks: [
      P("Mọi tham số API đều có biên: `limit` trong phân trang có min/max, `page` phải ≥1, `id` phải đúng định dạng, khoảng ngày (`from`/`to`) phải hợp lý. Kiểm thử biên nâng cao nghĩa là bạn không chỉ thử giá trị hợp lệ điển hình mà thử CHÍNH XÁC tại và ngay ngoài ranh giới cho phép — đây là nơi lỗi off-by-one (lệch 1 đơn vị) và lỗi tràn số thường ẩn náu, đặc biệt nguy hiểm khi tham số điều khiển lượng dữ liệu y tế trả về.",
        "Every API parameter has boundaries: pagination's `limit` has a min/max, `page` must be ≥1, `id` must match a specific format, a date range (`from`/`to`) must be sensible. Advanced boundary testing means you don't just try typical valid values but test EXACTLY at and just outside the allowed boundary — this is where off-by-one bugs and overflow bugs usually hide, especially dangerous when the parameter controls how much medical data is returned.",
        "すべてのAPIパラメータには境界があります：ページネーションの`limit`には最小/最大値があり、`page`は1以上でなければならず、`id`は特定の形式に一致しなければならず、日付範囲（`from`/`to`）は妥当でなければなりません。上級の境界値テストとは、典型的な有効値を試すだけでなく、許容境界のちょうど内側・外側を正確にテストすることです——ここにオフバイワン（1ずれ）バグやオーバーフローバグが潜んでおり、パラメータが返される医療データ量を制御している場合は特に危険です。"),
      STEP(1, "Với tham số `limit` (giới hạn tối đa 100), thử: limit=1 (biên dưới hợp lệ), limit=100 (biên trên hợp lệ), limit=0 và limit=101 (ngay ngoài biên), limit=-5 (số âm).", "For the `limit` parameter (max 100), try: limit=1 (valid lower bound), limit=100 (valid upper bound), limit=0 and limit=101 (just outside the bounds), limit=-5 (negative).", "`limit`パラメータ（上限100）について：limit=1（有効な下限）、limit=100（有効な上限）、limit=0とlimit=101（境界のすぐ外）、limit=-5（負の数）を試す。"),
      STEP(2, "Với tham số `page`, thử page=1 (hợp lệ), page=0 và page=-1 (ngoài biên), và page vượt xa tổng số trang thực tế (vd page=9999 khi chỉ có 3 trang dữ liệu).", "For the `page` parameter, try page=1 (valid), page=0 and page=-1 (out of bounds), and a page far beyond the actual total pages (e.g. page=9999 when there are only 3 pages of data).", "`page`パラメータについて：page=1（有効）、page=0とpage=-1（境界外）、実際の総ページ数を大きく超えるページ（例：データが3ページしかないのにpage=9999）を試す。"),
      STEP(3, "Với `patientId`/`id` dạng chuỗi có định dạng cố định (BN-#####), thử id đúng định dạng nhưng không tồn tại, id sai định dạng (thiếu tiền tố BN-), và id có ký tự đặc biệt/SQL injection để kiểm cả an toàn.", "For a formatted string `patientId`/`id` (BN-#####), try a correctly formatted but non-existent id, a malformed id (missing the BN- prefix), and an id with special characters/SQL injection payload to also check safety.", "固定形式（BN-#####）の`patientId`/`id`について：形式は正しいが存在しないid、形式が誤ったid（BN-プレフィックスがない）、安全性も確認するため特殊文字/SQLインジェクションを含むidを試す。"),
      CODE("text", "BANG BIEN THAM SO - GET /v1/patients/{id}/records?page=&limit=\nlimit=1     | Expected: 1 dong ket qua           | bien duoi hop le\nlimit=100   | Expected: toi da 100 dong          | bien tren hop le\nlimit=0     | Expected: 400 loi tham so           | ngay ngoai bien duoi\nlimit=101   | Expected: 400 hoac tu cat con 100   | ngay ngoai bien tren\npage=0      | Expected: 400 loi tham so           | ngoai bien\npage=9999   | Expected: 200, data rong []          | vuot tong so trang"),
      TRY("Chọn 1 endpoint có tham số phân trang trong dự án bạn đang test, viết bảng biên tương tự cho `limit` và `page`, rồi thực thi bằng Postman.", "Pick a paginated endpoint in a project you're testing, write a similar boundary table for `limit` and `page`, then execute it in Postman.", "テスト中のプロジェクトでページネーションパラメータを持つエンドポイントを1つ選び、`limit`と`page`について同様の境界値表を作成し、Postmanで実行してみよう。"),
      PITFALL("Chỉ test limit=100 mà quên test limit=101 — nhiều API 'im lặng cắt về 100' thay vì báo lỗi rõ ràng, khiến client tưởng nhầm mình đã gửi đúng giá trị.", "Testing only limit=100 and forgetting limit=101 — many APIs 'silently clamp to 100' instead of returning a clear error, misleading the client into thinking it sent the correct value.", "limit=100だけをテストしlimit=101を忘れる——多くのAPIは明確なエラーを返さず『黙って100に丸める』ため、クライアントは正しい値を送ったと誤解します。"),
    ] },
  { heading: { vi: "5. Kiểm thử dữ liệu âm (negative) cho payload API", en: "5. Negative testing for API payloads", ja: "5. APIペイロードのネガティブテスト" },
    blocks: [
      P("Kiểm thử dữ liệu âm ở cấp API tập trung vào payload gửi lên (body của POST/PUT): thiếu trường bắt buộc, sai kiểu dữ liệu, giá trị ngoài miền cho phép về mặt nghiệp vụ. Với API bệnh án, các trường nhạy cảm cần âm hoá kỹ nhất là số CCCD/CMND (định dạng cố định), ngày sinh (không được ở tương lai), và liều lượng thuốc (không được rỗng hoặc chứa ký tự lạ vì ảnh hưởng trực tiếp an toàn bệnh nhân).",
        "Negative testing at the API level focuses on the outgoing payload (POST/PUT body): missing required fields, wrong data types, values outside the business-allowed domain. For an EHR API, the fields that most need thorough negativizing are the national ID number (fixed format), date of birth (must not be in the future), and drug dosage (must not be empty or contain unusual characters, since it directly affects patient safety).",
        "APIレベルのネガティブテストは送信ペイロード（POST/PUTのボディ）に焦点を当てます：必須項目の欠落、データ型の誤り、業務的に許容範囲外の値。電子カルテAPIでは、国民識別番号（固定形式）、生年月日（未来であってはならない）、薬の用量（空欄や異常な文字を含んではならず、患者の安全に直接影響する）が最も入念にネガティブテストすべき項目です。"),
      STEP(1, "Xác định payload chuẩn hợp lệ trước (ca dương) để làm mốc so sánh, vd tạo hồ sơ bệnh nhân với đầy đủ CCCD, ngày sinh, họ tên hợp lệ.", "First define a standard valid payload (positive case) as a comparison baseline, e.g. creating a patient record with a valid ID number, date of birth, and full name.", "まず標準的な有効ペイロード（ポジティブケース）を比較基準として定義する。例：有効な国民識別番号、生年月日、氏名で患者記録を作成。"),
      STEP(2, "Áp kỹ thuật âm cho từng trường: CCCD thiếu số (9 chữ số thay vì 12), ngày sinh trong tương lai (2027-01-01), giới tính ngoài enum cho phép ('X' thay vì 'M'/'F').", "Apply negative techniques to each field: a national ID missing digits (9 digits instead of 12), a future date of birth (2027-01-01), a gender value outside the allowed enum ('X' instead of 'M'/'F').", "各フィールドにネガティブ技法を適用：桁数不足の国民識別番号（12桁でなく9桁）、未来の生年月日（2027-01-01）、許可されたenum外の性別（'M'/'F'でなく'X'）。"),
      STEP(3, "Với đơn thuốc, thử payload thiếu `dosage`, `dosage` là chuỗi rỗng, và `dosage` chứa script injection để kiểm cả sanitize dữ liệu đầu vào.", "For a prescription, try a payload missing `dosage`, an empty-string `dosage`, and a `dosage` containing a script injection to also check input sanitization.", "処方箋については、`dosage`が欠落したペイロード、空文字列の`dosage`、入力サニタイズも確認するためスクリプトインジェクションを含む`dosage`を試す。"),
      STEP(4, "Ghi lại Expected (server phải trả 400 kèm message rõ trường nào sai) và Actual cho từng ca; ca nào server vẫn chấp nhận thì chuyển ngay thành bug Critical vì ảnh hưởng dữ liệu y tế.", "Record Expected (the server must return 400 with a clear message of which field is wrong) and Actual for each case; any case the server still accepts becomes an immediate Critical bug since it affects medical data.", "各ケースについてExpected（サーバーはどのフィールドが誤りか明示した400を返すべき）とActualを記録する。サーバーがまだ受け入れてしまうケースは医療データに影響するため即座にCriticalバグとする。"),
      CODE("text", "BO CA KIEM THU AM - POST /v1/patients (tao ho so benh nhan)\nCCCD = '079203123' (9 so, thieu)     | Expected: 400 'cccd khong hop le' | Actual: 201 tao thanh cong (BUG)\nngaySinh = '2027-01-01' (tuong lai)   | Expected: 400 'ngay sinh khong hop le' | Actual: 400 dung\ngioiTinh = 'X' (ngoai enum M/F)        | Expected: 400 'gioi tinh khong hop le' | Actual: 201 tao thanh cong (BUG)\ndosage = '' (rong, don thuoc)          | Expected: 400 'lieu luong bat buoc' | Actual: 400 dung"),
      TRY("Chọn thêm 1 trường nhạy cảm khác trong hệ thống bạn test (mã bảo hiểm y tế, số điện thoại khẩn cấp...) và thiết kế 2 ca kiểm thử âm cho nó theo công thức Expected/Actual ở trên.", "Pick one more sensitive field in a system you're testing (health insurance code, emergency phone number...) and design 2 negative cases for it using the Expected/Actual formula above.", "テスト対象システムの別の機密フィールド（健康保険番号、緊急連絡先電話番号など）を選び、上記のExpected/Actual形式で2つのネガティブケースを設計しよう。"),
    ] },
  { heading: { vi: "6. Kiểm thử phân quyền (RBAC) theo vai trò bác sĩ / điều dưỡng", en: "6. Role-based authorization (RBAC) testing: doctor vs nurse", ja: "6. 医師 vs 看護師のロールベース認可（RBAC）テスト" },
    blocks: [
      P("Kiểm thử phân quyền cấp API (authorization testing) khác kiểm thử xác thực (authentication): xác thực hỏi 'bạn là ai' (token hợp lệ hay không), còn phân quyền hỏi 'bạn được LÀM GÌ'. Với MediCare EHR, bác sĩ (BAC_SI) có quyền tạo hồ sơ bệnh án và kê/sửa đơn thuốc; điều dưỡng (DIEU_DUONG) chỉ được xem đơn thuốc và cập nhật sinh hiệu (mạch, nhiệt độ, huyết áp) chứ KHÔNG được sửa đơn thuốc hay tạo hồ sơ bệnh án mới. Tester nâng cao phải xây một MA TRẬN quyền đầy đủ, rồi test từng ô của ma trận, không chỉ test 'API hoạt động' với 1 vai trò duy nhất.",
        "API-level authorization testing differs from authentication testing: authentication asks 'who are you' (is the token valid), while authorization asks 'what are you ALLOWED to do'. In MediCare EHR, a doctor (BAC_SI) may create patient records and prescribe/edit prescriptions; a nurse (DIEU_DUONG) may only view prescriptions and update vitals (pulse, temperature, blood pressure) but must NOT edit prescriptions or create new patient records. An advanced tester must build a full permission MATRIX and test every cell of it, not just test 'the API works' with a single role.",
        "APIレベルの認可テストは認証テストとは異なります：認証は『あなたは誰か』（トークンが有効か）を問い、認可は『あなたに何が許可されているか』を問います。MediCare EHRでは、医師（BAC_SI）は患者記録の作成や処方箋の作成・編集ができますが、看護師（DIEU_DUONG）は処方箋の閲覧とバイタル（脈拍、体温、血圧）の更新のみが許可され、処方箋の編集や新規患者記録の作成はできません。上級テスターは完全な権限マトリクスを構築し、単一のロールで『APIが動く』ことをテストするのではなく、マトリクスのすべてのセルをテストする必要があります。"),
      IMG(m_rbac, "Ma trận phân quyền theo vai trò trên API MediCare — bác sĩ vs điều dưỡng", "Role-based permission matrix on the MediCare API — doctor vs nurse", "MediCare APIのロール別権限マトリクス——医師 vs 看護師"),
      P("Cách thiết kế ca thực tế: với MỖI endpoint có tác dụng phụ (POST/PUT/DELETE), lấy token của TỪNG vai trò trong hệ thống, gọi cùng request, và xác nhận vai trò không đủ quyền phải nhận 403 (không phải 200, không phải 401 nếu token vẫn hợp lệ, và tuyệt đối không được để lộ dữ liệu trong body response 403). Một lỗi tinh vi hay gặp: server trả đúng 403 nhưng response body vẫn chứa toàn bộ dữ liệu đơn thuốc — đây vẫn là lỗi lộ thông tin dù status code đúng.",
        "How to design cases in practice: for EVERY side-effecting endpoint (POST/PUT/DELETE), get a token for EACH role in the system, call the same request, and confirm the under-privileged role receives 403 (not 200, not 401 if the token is still valid, and absolutely no data leaked in the 403 response body). A subtle bug that often occurs: the server correctly returns 403 but the response body still contains the full prescription data — this is still an information-disclosure bug even though the status code is correct.",
        "実践的なケース設計：副作用のあるすべてのエンドポイント（POST/PUT/DELETE）について、システム内の各ロールのトークンを取得し、同じリクエストを呼び出し、権限が不足するロールが403を受け取る（トークンがまだ有効なら200でも401でもなく、403のレスポンスボディに絶対にデータが漏洩していない）ことを確認します。よくある微妙なバグ：サーバーは正しく403を返すが、レスポンスボディに処方箋の全データが依然として含まれている——ステータスコードは正しくても、これは依然として情報漏洩バグです。"),
      TIP("Với mỗi endpoint nhạy cảm, luôn có tối thiểu 3 ca phân quyền: (1) đúng vai trò → thành công, (2) sai vai trò → 403 không lộ data, (3) không token/token hết hạn → 401.", "For every sensitive endpoint, always have at least 3 authorization cases: (1) correct role → success, (2) wrong role → 403 with no leaked data, (3) no token/expired token → 401.", "機密性の高いエンドポイントごとに、最低3つの認可ケースを用意しましょう：(1) 正しいロール→成功、(2) 誤ったロール→データ漏洩なしの403、(3) トークンなし／期限切れ→401。"),
    ] },
  { heading: { vi: "7. Tình huống 1: điều dưỡng gọi API sửa đơn thuốc vẫn trả 200", en: "7. Situation 1: a nurse's call to edit a prescription still returns 200", ja: "7. シーン1：看護師が処方箋編集APIを呼んでも200が返る" },
    blocks: [
      SITUATION("Đội test đã kiểm thử chức năng PUT /v1/prescriptions/{id} kỹ lưỡng với vai trò bác sĩ — mọi ca đều đúng, đơn thuốc được sửa chính xác, mọi người yên tâm release.",
        "The team thoroughly functionally tested PUT /v1/prescriptions/{id} with the doctor role — every case passed, the prescription was edited correctly, everyone felt safe releasing.",
        "Sau khi lên production, một điều dưỡng (vốn chỉ được xem đơn thuốc) vô tình dùng đúng endpoint này qua Postman đã lưu từ trước, sửa liều lượng thuốc của bệnh nhân — hệ thống trả 200 OK và lưu thay đổi, không có cảnh báo hay chặn nào, dù đây là hành vi ngoài phạm vi quyền của điều dưỡng.",
        "After going to production, a nurse (who should only be able to view prescriptions) accidentally used this exact endpoint via a previously saved Postman request and edited a patient's drug dosage — the system returned 200 OK and saved the change, with no warning or block, even though this was outside the nurse's authorized scope.",
        "テストチームは医師ロールでPUT /v1/prescriptions/{id}を入念に機能テストした——全ケース合格、処方箋は正しく編集され、安心してリリース。",
        "本番稼働後、処方箋の閲覧しか許可されていないはずの看護師が、以前保存していたPostmanリクエストで誤ってこのエンドポイントを使用し、患者の薬の用量を編集してしまった——システムは200 OKを返し変更を保存、警告もブロックもなかった。これは看護師の権限範囲外の行為であったにもかかわらず。"),
      SOLVE("Báo bug Critical ngay lập tức (ảnh hưởng an toàn dùng thuốc của bệnh nhân), yêu cầu backend thêm middleware kiểm tra vai trò TRƯỚC KHI xử lý logic sửa đơn thuốc, và bổ sung ca kiểm thử '403 cho vai trò không đủ quyền' vào bộ hồi quy cho TẤT CẢ endpoint có tác dụng phụ, không chỉ riêng đơn thuốc.",
        "Report a Critical bug immediately (it affects patient medication safety), require the backend to add role-check middleware BEFORE processing the prescription-edit logic, and add a '403 for under-privileged roles' case to the regression suite for ALL side-effecting endpoints, not just prescriptions.",
        "即座にCriticalバグとして報告する（患者の投薬安全に影響する）。バックエンドに処方箋編集ロジックを処理する前にロールチェックのミドルウェアを追加するよう要求し、処方箋だけでなくすべての副作用を伴うエンドポイントに対して『権限不足ロールへの403』ケースを回帰テストスイートに追加する。"),
      P("Đây là ví dụ điển hình của Broken Access Control (OWASP API Security #1): kiểm thử chức năng đầy đủ với MỘT vai trò không đảm bảo an toàn nếu backend chỉ dựa vào việc client 'không hiển thị nút sửa' trên giao diện điều dưỡng thay vì chặn thật sự ở tầng API. Đây chính là lý do kiểm thử phân quyền phải được thực hiện độc lập với kiểm thử giao diện — giao diện có thể ẩn nút, nhưng API vẫn phải tự chặn nếu ai đó gọi trực tiếp bằng Postman hay công cụ khác.",
        "This is a textbook example of Broken Access Control (OWASP API Security #1): thorough functional testing with ONE role doesn't guarantee safety if the backend relies only on the client 'not showing the edit button' in the nurse UI instead of truly enforcing it at the API layer. This is exactly why authorization testing must be done independently of UI testing — the UI may hide a button, but the API must still block the call if someone hits it directly via Postman or another tool.",
        "これはBroken Access Control（OWASP API Security第1位）の典型例です：バックエンドが看護師UIで『編集ボタンを表示しない』ことだけに頼り、API層で実際に制御していない場合、1つのロールで徹底的な機能テストをしても安全性は保証されません。だからこそ認可テストはUIテストとは独立して行う必要があります——UIはボタンを隠せますが、誰かがPostmanなど他のツールで直接呼び出しても、APIは自らブロックしなければなりません。"),
      IMG(m_jira_rbac, "Ticket MED-5510: điều dưỡng sửa đơn thuốc vẫn trả 200 thay vì 403", "Ticket MED-5510: a nurse editing a prescription still returns 200 instead of 403", "チケットMED-5510：看護師が処方箋を編集しても403でなく200が返る"),
      IMG(m_postman_rbac, "Bằng chứng Postman thô: PUT /v1/prescriptions/RX-77210 bởi điều dưỡng, trả 200 và lưu thay đổi", "Raw Postman evidence: PUT /v1/prescriptions/RX-77210 by a nurse, returning 200 and saving the change", "Postmanの生の証拠：看護師によるPUT /v1/prescriptions/RX-77210、200を返し変更を保存"),
      RECAP(["Kiểm thử chức năng đủ với 1 vai trò KHÔNG đồng nghĩa an toàn phân quyền", "Backend phải chặn ở tầng API, không chỉ ẩn nút trên giao diện"],
        ["Thorough functional testing with 1 role does NOT mean authorization is safe", "The backend must block at the API layer, not just hide the button in the UI"],
        ["1つのロールでの十分な機能テストは認可の安全性を意味しない", "バックエンドはUIでボタンを隠すだけでなくAPI層でブロックしなければならない"]),
    ] },
  { heading: { vi: "8. Idempotency & phân trang API nâng cao", en: "8. Idempotency & advanced pagination testing", ja: "8. 冪等性（idempotency）と上級ページネーションテスト" },
    blocks: [
      P("Idempotency (tính bất biến khi lặp lại) nghĩa là gọi cùng một request nhiều lần chỉ tạo ra ĐÚNG một tác dụng phụ, dù mạng chập chờn khiến client gửi lại request giống hệt. Với API tạo đơn thuốc (POST /v1/prescriptions), nếu không có cơ chế idempotency, việc điều dưỡng bấm nút 'Lưu' hai lần do mạng chậm có thể tạo ra HAI đơn thuốc trùng lặp cho cùng bệnh nhân — hậu quả nghiêm trọng nếu điều dưỡng phát thuốc theo cả hai đơn.",
        "Idempotency means calling the same request multiple times produces EXACTLY one side effect, even if a flaky network makes the client resend an identical request. For the create-prescription API (POST /v1/prescriptions), without an idempotency mechanism, a nurse double-clicking 'Save' due to a slow connection could create TWO duplicate prescriptions for the same patient — a serious consequence if medication is dispensed against both.",
        "冪等性とは、ネットワークが不安定でクライアントが同一リクエストを再送しても、同じリクエストを複数回呼び出しても副作用がちょうど1回だけ生じることです。処方箋作成API（POST /v1/prescriptions）に冪等性の仕組みがない場合、接続が遅く看護師が『保存』を2回クリックすると、同じ患者に対して重複した2つの処方箋が作成されかねません——両方の処方に基づいて投薬されれば深刻な結果になります。"),
      IMG(m_postman_idem, "Postman: POST tạo đơn thuốc kèm header Idempotency-Key, gọi lại cùng key phải trả về cùng id", "Postman: POST to create a prescription with an Idempotency-Key header; resending the same key must return the same id", "Postman：Idempotency-Keyヘッダー付きで処方箋作成のPOST、同じキーで再送すると同じidが返るべき"),
      STEP(1, "Gọi POST tạo đơn thuốc lần 1 với header `Idempotency-Key: <uuid>`, ghi lại id trả về (vd RX-88110).", "Call POST to create a prescription once with header `Idempotency-Key: <uuid>`, note the returned id (e.g. RX-88110).", "`Idempotency-Key: <uuid>`ヘッダー付きで処方箋作成のPOSTを1回呼び出し、返されたid（例：RX-88110）を記録する。"),
      STEP(2, "Gọi lại NGUYÊN VẸN request đó (cùng body, cùng Idempotency-Key) và xác nhận server trả về CÙNG id, không tạo bản ghi mới, thường kèm status 200 thay vì 201 lần 2.", "Resend that exact request (same body, same Idempotency-Key) and confirm the server returns the SAME id, creates no new record, usually with status 200 instead of 201 the second time.", "そのリクエストをそのまま（同じボディ、同じIdempotency-Key）再送し、サーバーが同じidを返し、新規レコードが作成されず、通常2回目は201でなく200が返ることを確認する。"),
      STEP(3, "Đổi sang Idempotency-Key khác với body giống hệt và xác nhận lần này server TẠO bản ghi mới thật sự — phân biệt rõ 'trùng request' và 'request hợp lệ khác'.", "Switch to a different Idempotency-Key with the identical body and confirm the server genuinely CREATES a new record this time — clearly distinguishing 'a duplicate request' from 'a different valid request'.", "同じボディで異なるIdempotency-Keyに切り替え、今度はサーバーが本当に新しいレコードを作成することを確認する——『重複リクエスト』と『別の有効なリクエスト』を明確に区別する。"),
      P("Về phân trang nâng cao: phân trang kiểu offset (`page`/`limit`) đơn giản nhưng có rủi ro dữ liệu bị 'trôi' khi có bản ghi mới chèn vào giữa lúc client đang duyệt qua nhiều trang (vd bác sĩ đang xem trang 2 thì có hồ sơ mới ở trang 1, làm lệch toàn bộ trang sau). Phân trang kiểu cursor (dùng con trỏ trỏ tới bản ghi cuối cùng đã thấy) ổn định hơn với dữ liệu thay đổi liên tục. Khi kiểm thử, tester nâng cao cần thử: gọi trang kế tiếp trong lúc có bản ghi mới được thêm ở giữa, kiểm tra không trùng lặp/không bỏ sót bản ghi, và xác nhận `total` trả về nhất quán với số bản ghi thực tế đếm được.",
        "On advanced pagination: offset-style pagination (`page`/`limit`) is simple but risks 'data drift' when a new record is inserted while a client is paging through results (e.g. a doctor viewing page 2 while a new record appears on page 1, shifting every later page). Cursor-style pagination (a pointer to the last seen record) is more stable under constantly changing data. When testing, an advanced tester should try: fetching the next page while a new record is inserted mid-browse, checking for no duplicates/no missed records, and confirming the returned `total` is consistent with the actually counted records.",
        "上級ページネーションについて：オフセット型ページネーション（`page`/`limit`）はシンプルですが、クライアントが複数ページを閲覧中に新しいレコードが挿入されると『データのずれ』が生じるリスクがあります（例：医師が2ページ目を見ている間に1ページ目に新規記録が追加され、以降の全ページがずれる）。カーソル型ページネーション（最後に見たレコードへのポインタを使う）は、絶えず変化するデータに対してより安定しています。テストでは、閲覧中に新規レコードが挿入された状態で次ページを取得する、重複や欠落がないか確認する、返される`total`が実際にカウントした件数と一致するか確認する、といったことを上級テスターは試すべきです。"),
      TIP("Với các API tài chính/y tế có tác dụng phụ, LUÔN hỏi backend: 'Cơ chế idempotency ở đây là gì?' — nếu câu trả lời là 'chưa có', đó là một rủi ro cần báo cáo ngay cả khi chưa có bug cụ thể.", "For financial/medical side-effecting APIs, ALWAYS ask the backend: 'What's the idempotency mechanism here?' — if the answer is 'there isn't one yet', that's a risk worth reporting even before a concrete bug appears.", "副作用のある金融・医療系APIについては、必ずバックエンドに『ここでの冪等性の仕組みは何か』を尋ねましょう——答えが『まだない』であれば、具体的なバグがまだなくても報告すべきリスクです。"),
    ] },
  { heading: { vi: "9. Tình huống 2: API trả 500 lộ stack trace và dữ liệu bệnh nhân", en: "9. Situation 2: a 500 error leaks a stack trace and patient data", ja: "9. シーン2：500エラーがスタックトレースと患者データを漏洩する" },
    blocks: [
      SITUATION("Tester gọi GET /v1/patients/{id} với một id hợp lệ nhưng bản ghi bảo hiểm y tế (insuranceId) của bệnh nhân đó đang bị null do lỗi đồng bộ dữ liệu từ hệ thống cũ.",
        "A tester calls GET /v1/patients/{id} with a valid id, but that patient's insurance record (insuranceId) happens to be null due to a data-sync bug from a legacy system.",
        "Server không xử lý trường hợp insuranceId null, ném NullPointerException chưa được bắt (uncaught), và trả nguyên stack trace kèm TOÀN BỘ object bệnh nhân (họ tên, số CCCD, chẩn đoán 'HIV+') thẳng ra response 500 — bất kỳ ai gọi được API này (kể cả không đủ quyền) đều thấy dữ liệu cực nhạy cảm.",
        "The server doesn't handle the null insuranceId case, throws an uncaught NullPointerException, and returns the raw stack trace along with the ENTIRE patient object (name, national ID, diagnosis 'HIV+') straight into the 500 response — anyone who can call this API (even without sufficient permission) sees extremely sensitive data.",
        "テスターが有効なidでGET /v1/patients/{id}を呼び出したが、その患者の保険記録（insuranceId）は旧システムからのデータ同期バグによりnullになっていた。",
        "サーバーはinsuranceIdがnullのケースを処理せず、未捕捉のNullPointerExceptionを投げ、スタックトレース全体と患者オブジェクト全体（氏名、国民識別番号、診断名『HIV陽性』）をそのまま500レスポンスに含めて返した——このAPIを呼べる者は誰でも（権限が不十分でも）極めて機密性の高いデータを目にする。"),
      SOLVE("Báo bug Critical với mức độ Bảo mật (không chỉ 'lỗi 500 thông thường'), yêu cầu: (1) bắt exception và trả message chung chung không lộ chi tiết kỹ thuật, (2) không bao giờ đưa toàn bộ object domain vào response lỗi, (3) log chi tiết (kèm stack trace) chỉ ghi vào hệ thống log nội bộ có kiểm soát truy cập, không trả về client.",
        "Report a Critical Security-severity bug (not just 'a regular 500 error'), requiring: (1) catching the exception and returning a generic message with no leaked technical detail, (2) never putting the full domain object into an error response, (3) detailed logs (with the stack trace) go only to an internal, access-controlled logging system, never returned to the client.",
        "『通常の500エラー』ではなくセキュリティ重大度のCriticalバグとして報告し、以下を要求する：(1) 例外を捕捉し技術的詳細を漏らさない一般的なメッセージを返す、(2) エラーレスポンスにドメインオブジェクト全体を決して含めない、(3) スタックトレースを含む詳細ログはアクセス制御された社内ログシステムのみに記録し、クライアントには返さない。"),
      IMG(m_postman_500, "Postman: response 500 lộ stack trace và toàn bộ dữ liệu bệnh nhân nhạy cảm (CCCD, chẩn đoán)", "Postman: a 500 response leaking the stack trace and the patient's entire sensitive data (national ID, diagnosis)", "Postman：スタックトレースと患者の機密データ全体（国民識別番号、診断名）を漏洩する500レスポンス"),
      P("Tình huống này minh hoạ vì sao kiểm thử API nâng cao phải chủ động gây lỗi 500 (không chỉ chờ nó tự xảy ra): thử payload/tham số hiếm gặp có khả năng làm lộ dữ liệu null chưa xử lý, dữ liệu tồn tại lâu năm chưa migrate đủ, hoặc tham số gây exception phía server. Với hệ thống y tế, mọi lỗi 500 đều phải được coi là RỦI RO BẢO MẬT tiềm tàng cho tới khi được xác nhận không lộ dữ liệu, vì chỉ một response lỗi vô tình lộ chẩn đoán bệnh có thể vi phạm nghiêm trọng quy định bảo vệ dữ liệu cá nhân/y tế và gây tổn hại danh dự bệnh nhân.",
        "This situation illustrates why advanced API testing must actively trigger 500 errors (not just wait for them to happen): try rare payloads/parameters likely to expose unhandled nulls, long-lived data that hasn't fully migrated, or parameters that trigger a server-side exception. For a healthcare system, every 500 error must be treated as a potential SECURITY RISK until confirmed to leak nothing, because even one accidental error response exposing a diagnosis can seriously violate personal/health data protection regulations and harm the patient's dignity.",
        "このシーンは、上級APIテストがなぜ500エラーを（自然発生を待つのではなく）能動的に引き起こす必要があるかを示しています：未処理のnullを露呈させそうな稀なペイロード/パラメータ、十分に移行されていない古いデータ、サーバー側で例外を引き起こすパラメータを試します。医療システムでは、すべての500エラーは何も漏洩していないと確認されるまで潜在的なセキュリティリスクとして扱わねばなりません。診断名を偶然漏らすエラーレスポンスが1つでもあれば、個人・医療データ保護規制への重大な違反となり、患者の尊厳を傷つけかねないからです。"),
      RECAP(["Lỗi 500 ở hệ thống y tế = rủi ro bảo mật tiềm tàng, không chỉ là 'crash'", "Chủ động thử payload hiếm/dữ liệu cũ để gây lỗi 500, đừng chỉ chờ nó tự xảy ra"],
        ["A 500 error in a healthcare system = a potential security risk, not just 'a crash'", "Actively try rare payloads/legacy data to trigger 500s, don't just wait for them to happen"],
        ["医療システムの500エラー＝単なる『クラッシュ』ではなく潜在的セキュリティリスク", "自然発生を待つのではなく、稀なペイロードや古いデータで能動的に500を発生させる"]),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo nâng cao & câu hỏi thường gặp", en: "10. Common mistakes, advanced tips & FAQ", ja: "10. よくある失敗・上級のコツ・よくある質問" },
    blocks: [
      P("Ngay cả tester có kinh nghiệm cũng dễ vấp một số lỗi khi kiểm thử API thủ công nâng cao. Nhận diện sớm giúp bộ ca kiểm thử của bạn thực sự đáng tin cậy thay vì chỉ 'nhìn có vẻ đầy đủ'.",
        "Even experienced testers easily stumble on a few mistakes when doing advanced manual API testing. Recognizing them early makes your test suite genuinely trustworthy instead of just 'looking complete'.",
        "経験豊富なテスターでも、上級の手動APIテストではいくつかの失敗をしがちです。早めに認識することで、テストスイートが『網羅しているように見える』だけでなく本当に信頼できるものになります。"),
      PITFALL("Chỉ kiểm thử theo happy path của MỘT vai trò (thường là admin/bác sĩ có toàn quyền) rồi coi như xong — bỏ sót toàn bộ lớp lỗi phân quyền vì chưa từng thử với vai trò yếu quyền hơn.", "Only testing the happy path of a SINGLE role (usually an admin/doctor with full access) and calling it done — missing the entire class of authorization bugs because you never tried with a less-privileged role.", "単一のロール（通常は全権限を持つ管理者/医師）のハッピーパスだけをテストして終わりにする——権限の少ないロールで一度も試さないため、認可バグのクラス全体を見逃す。"),
      PITFALL("Coi status code 'đúng loại 2xx/4xx' là đủ mà không kiểm tra kỹ NỘI DUNG response — như ví dụ 403 vẫn lộ dữ liệu, hoặc 400 nhưng message chung chung không nói rõ trường nào sai khiến FE không hiển thị được lỗi hữu ích.", "Treating 'the right 2xx/4xx category' as enough without carefully checking the response BODY — like a 403 that still leaks data, or a 400 with a generic message that doesn't say which field is wrong, leaving the frontend unable to show a useful error.", "レスポンスの中身を注意深く確認せず『正しい2xx/4xxのカテゴリ』であれば十分とみなす——データを漏洩したままの403や、どのフィールドが誤りか示さない汎用メッセージの400のため、フロントエンドが有用なエラーを表示できない、といった例。"),
      TIP("Duy trì một collection Postman 'API Advanced Regression' riêng gồm: ca hợp đồng, ca biên, ca âm, ca phân quyền theo TỪNG vai trò, và ca idempotency — chạy lại toàn bộ trước mỗi lần release, không chỉ chạy ca chức năng cơ bản.", "Maintain a separate 'API Advanced Regression' Postman collection containing: contract cases, boundary cases, negative cases, per-role authorization cases, and idempotency cases — re-run the whole thing before every release, not just the basic functional cases.", "契約ケース、境界値ケース、ネガティブケース、ロールごとの認可ケース、冪等性ケースを含む専用の『APIアドバンス回帰』Postmanコレクションを維持しましょう——基本的な機能ケースだけでなく、リリースの度に全体を再実行します。"),
      IMG(m_types, "Bảng tổng quan các loại ca kiểm thử API nâng cao trên hệ thống MediCare EHR", "An overview table of advanced API test case types on the MediCare EHR system", "MediCare EHRシステムにおける上級APIテストケースの種類の概要表"),
      IMG(m_kanban, "Bảng theo dõi lỗi API tìm được qua kiểm thử nâng cao (MediCare EHR · Sprint 22)", "A board tracking API bugs found via advanced testing (MediCare EHR · Sprint 22)", "上級テストで見つかったAPIバグの追跡ボード（MediCare EHR・スプリント22）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi Critical của sprint đến từ phân quyền và lộ dữ liệu nhạy cảm, không phải lỗi chức năng cơ bản", "Metrics: most of the sprint's Critical bugs come from authorization and sensitive-data leaks, not basic functional bugs", "指標：スプリントの重大バグの大半は認可と機密データ漏洩から生じ、基本的な機能バグからではない"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử phân quyền (Authorization) cho người mới", "Authorization testing for beginners", "kiem-thu-phan-quyen-authorization-cho-nguoi-moi", "初心者のための認可テスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Kiểm thử tích hợp (Integration Testing) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための結合テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa luyện kiểm thử API thủ công nâng cao bằng Postman qua API bệnh án điện tử MediCare EHR: kiểm thử hợp đồng/schema response, thiết kế ca theo đúng ngữ nghĩa mã trạng thái HTTP, kiểm thử biên cho tham số phân trang/ID, kiểm thử dữ liệu âm cho payload nhạy cảm, kiểm thử phân quyền RBAC giữa bác sĩ và điều dưỡng, idempotency cho API có tác dụng phụ, và phân trang nâng cao. Hai tình huống thật — điều dưỡng sửa được đơn thuốc và lỗi 500 lộ dữ liệu bệnh nhân — cho thấy hậu quả nghiêm trọng nếu bỏ qua các lớp kiểm thử này ở hệ thống y tế.",
        "You just practiced advanced manual API testing with Postman through the MediCare EHR API: response contract/schema testing, designing cases by correct HTTP status semantics, boundary testing for pagination/ID parameters, negative testing for sensitive payloads, RBAC authorization testing between doctors and nurses, idempotency for side-effecting APIs, and advanced pagination. Two real situations — a nurse able to edit a prescription and a 500 error leaking patient data — showed the serious consequences of skipping these testing layers in a healthcare system.",
        "MediCare EHR APIを通じて、Postmanによる手動APIの上級テストを練習しました：レスポンスの契約・スキーマテスト、正しいHTTPステータスの意味に基づくケース設計、ページネーション・IDパラメータの境界値テスト、機密ペイロードのネガティブテスト、医師と看護師間のRBAC認可テスト、副作用のあるAPIの冪等性、上級ページネーション。看護師が処方箋を編集できてしまう例と、500エラーが患者データを漏洩する例という2つの実例は、医療システムでこれらのテスト層を省くと深刻な結果になることを示しました。"),
      P("Bước tiếp theo, bạn nên đào sâu kiểm thử tích hợp (integration testing) giữa API và các hệ thống liên viện, cũng như học thêm về kiểm thử bảo mật API (OWASP API Security Top 10) để mở rộng góc nhìn ngoài phạm vi bài này. Nếu muốn học bài bản từ nền tảng manual tới automation, kiểm thử API chuyên sâu và dự án doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester chuyên nghiệp sẽ giúp bạn tự tin làm việc trên các hệ thống có yêu cầu chất lượng cao như y tế, ngân hàng.",
        "Next, you should dig deeper into integration testing between the API and inter-hospital systems, as well as learn more about API security testing (the OWASP API Security Top 10) to broaden your view beyond this article. If you want to learn systematically from manual foundations to automation, in-depth API testing, and real enterprise projects with a mentor, a professional Tester course will help you work confidently on high-quality-demand systems like healthcare and banking.",
        "次は、APIと病院間システムとの結合テストをより深く掘り下げ、本記事の範囲を超えて視野を広げるためAPIセキュリティテスト（OWASP API Security Top 10）についても学ぶとよいでしょう。手動の基礎から自動化、詳細なAPIテスト、指導者付きの実際の企業プロジェクトまで体系的に学びたいなら、プロフェッショナルなテスターコースが医療や銀行のような高品質要求システムで自信を持って働く助けになります。"),
      CTA(course),
    ] },
];

const API_MANUAL_ADV_01 = makeDoc({
  slug: "kiem-thu-api-thu-cong-postman-nang-cao-cho-tester",
  domain: "healthcare",
  primaryKeyword: "kiểm thử API thủ công",
  keywords: ["kiểm thử API thủ công", "Postman nâng cao", "contract testing API", "kiểm thử phân quyền API", "idempotency API", "kiểm thử biên API", "API bệnh án điện tử"],
  coverLabel: "NÂNG CAO · API POSTMAN · Y TẾ",
  crumb: "Kiểm thử API thủ công nâng cao bằng Postman",
  metaTitle: {
    vi: "Kiểm thử API thủ công nâng cao bằng Postman",
    en: "Advanced manual API testing with Postman",
    ja: "Postmanによる手動API上級テスト",
  },
  metaDescription: {
    vi: "Kiểm thử API thủ công nâng cao bằng Postman cho hệ thống bệnh án điện tử: hợp đồng schema, mã trạng thái, biên, dữ liệu âm, phân quyền, idempotency, phân trang.",
    en: "Advanced manual API testing with Postman for an electronic health record system: contract/schema, status codes, parameter boundaries, negative data, doctor/nurse authorization, idempotency, pagination, with real examples.",
    ja: "電子カルテシステム向けPostmanによる手動API上級テスト：契約スキーマ、ステータスコード、パラメータ境界値、ネガティブデータ、医師/看護師の認可、冪等性、ページネーションを実例付きで解説。",
  },
  title: {
    vi: "Kiểm thử API thủ công nâng cao bằng Postman: contract, biên, âm, phân quyền — dự án bệnh án điện tử (có trắc nghiệm)",
    en: "Advanced manual API testing with Postman: contract, boundary, negative, authorization — an EHR project (with quiz)",
    ja: "Postmanによる手動API上級テスト：契約・境界値・ネガティブ・認可——電子カルテプロジェクト（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử API thủ công bằng Postman qua dự án bệnh án điện tử MediCare EHR — hợp đồng/schema response, mã trạng thái HTTP theo nghiệp vụ, biên tham số phân trang/ID, dữ liệu âm cho payload, phân quyền RBAC bác sĩ/điều dưỡng, idempotency và phân trang nâng cao. Hai tình huống lỗi thật (điều dưỡng sửa đơn thuốc trả 200, API 500 lộ dữ liệu bệnh nhân), 9+ mockup Postman/Jira/Kanban, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: manual API testing with Postman through the MediCare EHR project — response contract/schema, business-driven HTTP status codes, pagination/ID boundary parameters, negative payload data, RBAC authorization for doctors/nurses, idempotency, and advanced pagination. Two real bug situations (a nurse editing a prescription returns 200, a 500 error leaks patient data), 9+ Postman/Jira/Kanban mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：MediCare EHRプロジェクトを通じたPostmanによる手動APIテスト——レスポンス契約・スキーマ、業務に基づくHTTPステータスコード、ページネーション/ID境界値パラメータ、ペイロードのネガティブデータ、医師/看護師のRBAC認可、冪等性、上級ページネーション。2つの実際のバグシーン（看護師が処方箋を編集して200が返る、500エラーが患者データを漏洩する）、9以上のPostman/Jira/Kanbanモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử API thủ công nâng cao bằng Postman", steps: [
    { name: "Xây bảng hợp đồng (contract) & ánh xạ mã trạng thái", text: "Xác định kiểu dữ liệu, trường bắt buộc và status code đúng cho từng tình huống nghiệp vụ." },
    { name: "Thiết kế ca biên, âm và phân quyền theo vai trò", text: "Thử giá trị tại/ngoài biên, payload sai, và gọi API với từng vai trò khác nhau." },
    { name: "Kiểm tra idempotency và phân trang", text: "Gọi lặp request có tác dụng phụ và duyệt phân trang khi dữ liệu thay đổi." },
  ] },
  pages,
});

export const MA_APIMANUAL_01 = [API_MANUAL_ADV_01];
