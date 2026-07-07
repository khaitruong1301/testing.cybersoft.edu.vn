// doc_thucchien_04b.mjs — 1 bài thucchien: Gov eKYC & eform dịch vụ công.
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const cover1 = makeThumb({ id: "gov-ekyc-04", domain: "gov", kind: "thucchien", label: "実戦 · eKYC" });

const svg1 = `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="220" rx="12" fill="#0f172a"/>
  <rect x="20" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#38bdf8"/>
  <text x="80" y="60" font-size="12" fill="#e2e8f0" text-anchor="middle">Công dân</text>
  <rect x="180" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#38bdf8"/>
  <text x="250" y="55" font-size="11" fill="#e2e8f0" text-anchor="middle">Cổng eForm</text>
  <text x="250" y="70" font-size="10" fill="#94a3b8" text-anchor="middle">upload giấy tờ</text>
  <rect x="360" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#facc15"/>
  <text x="430" y="55" font-size="11" fill="#e2e8f0" text-anchor="middle">eKYC Provider</text>
  <text x="430" y="70" font-size="10" fill="#94a3b8" text-anchor="middle">OCR + Face match</text>
  <rect x="540" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#34d399"/>
  <text x="610" y="55" font-size="11" fill="#e2e8f0" text-anchor="middle">Core Gov Service</text>
  <text x="610" y="70" font-size="10" fill="#94a3b8" text-anchor="middle">xử lý hồ sơ</text>
  <path d="M140 55 H180" stroke="#38bdf8" stroke-width="2" marker-end="url(#a1)"/>
  <path d="M320 55 H360" stroke="#facc15" stroke-width="2" marker-end="url(#a1)"/>
  <path d="M500 55 H540" stroke="#34d399" stroke-width="2" marker-end="url(#a1)"/>
  <rect x="180" y="110" width="140" height="50" rx="8" fill="#1e293b" stroke="#f472b6"/>
  <text x="250" y="135" font-size="11" fill="#e2e8f0" text-anchor="middle">Chữ ký số</text>
  <text x="250" y="150" font-size="10" fill="#94a3b8" text-anchor="middle">HSM / PKI</text>
  <rect x="360" y="110" width="140" height="50" rx="8" fill="#1e293b" stroke="#f472b6"/>
  <text x="430" y="135" font-size="11" fill="#e2e8f0" text-anchor="middle">Audit Log</text>
  <text x="430" y="150" font-size="10" fill="#94a3b8" text-anchor="middle">immutable ledger</text>
  <path d="M250 80 V110" stroke="#f472b6" stroke-width="2" marker-end="url(#a1)"/>
  <path d="M320 135 H360" stroke="#f472b6" stroke-width="2" marker-end="url(#a1)"/>
  <text x="350" y="200" font-size="11" fill="#64748b" text-anchor="middle">Luồng: nộp hồ sơ → eKYC đối chiếu → ký số → ghi audit → trả kết quả</text>
  <defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg2 = `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="240" rx="12" fill="#0f172a"/>
  <text x="20" y="28" font-size="14" fill="#e2e8f0">Ma trận ca kiểm thử eKYC &amp; eForm</text>
  <line x1="20" y1="40" x2="680" y2="40" stroke="#334155"/>
  <text x="30" y="60" font-size="11" fill="#94a3b8">Nhóm</text>
  <text x="180" y="60" font-size="11" fill="#94a3b8">Ca chính</text>
  <text x="420" y="60" font-size="11" fill="#94a3b8">Oracle kỳ vọng</text>
  <text x="580" y="60" font-size="11" fill="#94a3b8">Mức ưu tiên</text>
  <line x1="20" y1="70" x2="680" y2="70" stroke="#1e293b"/>
  <text x="30" y="90" font-size="11" fill="#38bdf8">eKYC match</text>
  <text x="180" y="90" font-size="11" fill="#e2e8f0">Ảnh CCCD rõ, khuôn mặt khớp</text>
  <text x="420" y="90" font-size="11" fill="#e2e8f0">FAR/FRR trong ngưỡng, PASS</text>
  <text x="580" y="90" font-size="11" fill="#f87171">P0</text>
  <line x1="20" y1="100" x2="680" y2="100" stroke="#1e293b"/>
  <text x="30" y="120" font-size="11" fill="#38bdf8">False accept</text>
  <text x="180" y="120" font-size="11" fill="#e2e8f0">Ảnh giả mạo/deepfake</text>
  <text x="420" y="120" font-size="11" fill="#e2e8f0">Phải FAIL, không cấp quyền</text>
  <text x="580" y="120" font-size="11" fill="#f87171">P0</text>
  <line x1="20" y1="130" x2="680" y2="130" stroke="#1e293b"/>
  <text x="30" y="150" font-size="11" fill="#facc15">False reject</text>
  <text x="180" y="150" font-size="11" fill="#e2e8f0">Ảnh mờ/ánh sáng yếu người thật</text>
  <text x="420" y="150" font-size="11" fill="#e2e8f0">Fallback thủ công, không khoá tài khoản</text>
  <text x="580" y="150" font-size="11" fill="#fbbf24">P1</text>
  <line x1="20" y1="160" x2="680" y2="160" stroke="#1e293b"/>
  <text x="30" y="180" font-size="11" fill="#34d399">eForm invalid</text>
  <text x="180" y="180" font-size="11" fill="#e2e8f0">Thiếu trường bắt buộc, sai định dạng</text>
  <text x="420" y="180" font-size="11" fill="#e2e8f0">Chặn submit, thông báo lỗi rõ field</text>
  <text x="580" y="180" font-size="11" fill="#fbbf24">P1</text>
  <line x1="20" y1="190" x2="680" y2="190" stroke="#1e293b"/>
  <text x="30" y="210" font-size="11" fill="#f472b6">Audit &amp; A11y</text>
  <text x="180" y="210" font-size="11" fill="#e2e8f0">Ghi log đủ, screen reader đọc được form</text>
  <text x="420" y="210" font-size="11" fill="#e2e8f0">Log immutable, WCAG AA đạt</text>
  <text x="580" y="210" font-size="11" fill="#fbbf24">P1</text>
</svg>`;

const pages1 = [
  {
    heading: {
      vi: "1. Bối cảnh dự án",
      en: "1. Project Context",
      ja: "1. プロジェクトの背景",
    },
    blocks: [
      P(
        "Một cơ quan dịch vụ công cấp tỉnh triển khai cổng eForm trực tuyến cho phép công dân nộp hồ sơ hành chính (đăng ký cư trú, cấp lại giấy tờ, xin trợ cấp xã hội) mà không cần đến trực tiếp. Hệ thống tích hợp với nhà cung cấp eKYC bên thứ ba để xác thực danh tính người nộp trước khi chấp nhận hồ sơ, đồng thời cho phép công dân ký số vào biểu mẫu bằng chứng thư số cá nhân hoặc chữ ký số từ xa. Mục tiêu là giảm thời gian xử lý từ nhiều ngày xuống còn vài giờ, đồng thời vẫn giữ được tính pháp lý và khả năng truy vết của hồ sơ giấy truyền thống.",
        "A provincial public-service agency is rolling out an online eForm portal that lets citizens submit administrative dossiers (residence registration, document reissue, social benefit applications) without visiting in person. The system integrates with a third-party eKYC provider to verify the identity of the submitter before accepting a dossier, and also allows citizens to digitally sign the form using a personal digital certificate or remote signature. The goal is to cut processing time from days to hours while preserving the legal validity and traceability of traditional paper dossiers.",
        "ある省レベルの行政サービス機関が、市民が対面訪問せずに行政書類（住民登録、証明書再発行、社会給付申請）を提出できるオンライン電子申請ポータルを展開しています。システムは第三者のeKYCプロバイダと連携し、提出者の本人確認を行ってから申請を受理し、さらに市民が個人電子証明書やリモート電子署名で申請書に電子署名できるようにしています。目的は処理時間を数日から数時間に短縮しつつ、従来の紙媒体と同等の法的有効性と追跡可能性を維持することです。"
      ),
      P(
        "Đây là hệ thống khu vực công nên yêu cầu về bảo mật và quyền riêng tư rất khắt khe: dữ liệu sinh trắc học (ảnh khuôn mặt, dấu vân tay nếu có) và thông tin định danh cá nhân (PII) thuộc nhóm dữ liệu nhạy cảm theo quy định bảo vệ dữ liệu cá nhân. Mọi thao tác xử lý hồ sơ phải được ghi vào nhật ký kiểm toán (audit log) không thể sửa đổi, phục vụ thanh tra và giải trình trách nhiệm khi có khiếu nại. Ngoài ra hệ thống phải đáp ứng chuẩn khả năng tiếp cận (accessibility) vì đối tượng sử dụng bao gồm người cao tuổi, người khuyết tật thị giác, và người dùng thiết bị cũ có băng thông thấp.",
        "Being a public-sector system, security and privacy requirements are strict: biometric data (facial images, fingerprints where applicable) and personally identifiable information (PII) fall under sensitive data categories per personal data protection regulations. Every dossier-processing action must be written to an immutable audit log to support inspections and accountability in case of complaints. The system must also meet accessibility standards, since users include elderly citizens, visually impaired users, and people on older devices with low bandwidth.",
        "公共部門のシステムであるため、セキュリティとプライバシーの要件は非常に厳格です。生体情報（顔画像、該当する場合は指紋）と個人識別情報（PII）は、個人データ保護規制における機微情報に分類されます。申請処理のあらゆる操作は、監査や苦情対応時の説明責任を果たすために、改ざん不可能な監査ログに記録される必要があります。また、利用者には高齢者、視覚障害のある方、低帯域の旧型端末を使う方も含まれるため、システムはアクセシビリティ基準にも準拠しなければなりません。"
      ),
      P(
        "Đội QA được giao nhiệm vụ kiểm thử toàn trình từ lúc công dân mở form đến khi hồ sơ được phê duyệt, với trọng tâm đặc biệt vào độ chính xác của eKYC (tỷ lệ chấp nhận sai FAR và tỷ lệ từ chối sai FRR), tính hợp lệ của dữ liệu biểu mẫu, và khả năng chống chối bỏ của chữ ký số. Bài toán khó nhất không nằm ở giao diện đẹp hay tốc độ, mà ở việc chứng minh được rằng hệ thống không cấp quyền truy cập dịch vụ công cho người không đúng danh tính, đồng thời không gây phiền hà quá mức cho người dùng hợp lệ.",
        "The QA team is tasked with testing the full journey from when a citizen opens the form to when the dossier is approved, with special focus on eKYC accuracy (false accept rate FAR and false reject rate FRR), form data validity, and the non-repudiation of digital signatures. The hardest problem is not a polished UI or speed, but proving the system never grants access to a public service to someone with the wrong identity, while not overly inconveniencing legitimate users.",
        "QAチームは、市民がフォームを開いてから申請が承認されるまでの全行程をテストする任務を負っており、特にeKYCの精度（誤受理率FARと誤拒否率FRR）、フォームデータの妥当性、電子署名の否認防止性に重点を置いています。最も難しい課題は美しいUIや速度ではなく、誤った本人に行政サービスへのアクセスを許可しないことを証明しつつ、正当な利用者に過度な不便をかけないことです。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc & luồng xử lý",
      en: "2. Architecture & Flow",
      ja: "2. アーキテクチャと処理フロー",
    },
    blocks: [
      P(
        "Kiến trúc gồm bốn thành phần chính: cổng eForm nơi công dân nhập liệu và tải lên giấy tờ; nhà cung cấp eKYC thực hiện OCR trích xuất thông tin từ CCCD/hộ chiếu và đối chiếu khuôn mặt (face match) với ảnh chụp trực tiếp (liveness check); dịch vụ lõi xử lý nghiệp vụ (Core Gov Service) tiếp nhận hồ sơ đã xác thực; và mô-đun chữ ký số dùng HSM hoặc PKI để công dân ký vào hồ sơ trước khi gửi. Toàn bộ luồng được ghi lại vào audit log dạng append-only.",
        "The architecture has four main components: the eForm portal where citizens enter data and upload documents; the eKYC provider that performs OCR to extract information from ID cards/passports and face matching against a live capture (liveness check); the Core Gov Service that ingests verified dossiers; and a digital signature module using HSM or PKI for citizens to sign the dossier before submission. The entire flow is recorded into an append-only audit log.",
        "アーキテクチャは4つの主要コンポーネントで構成されます。市民がデータを入力し証明書類をアップロードする電子申請ポータル、身分証明書やパスポートからOCRで情報を抽出し顔画像とライブキャプチャを照合（生体検知含む）するeKYCプロバイダ、検証済みの申請を受け付けるコア行政サービス、そして市民が提出前に申請書へ署名するためHSMまたはPKIを用いる電子署名モジュールです。全体のフローは追記専用の監査ログに記録されます。"
      ),
      IMG(
        svg1,
        "Luồng tổng quan: công dân → eForm → eKYC provider → ký số → Core Gov Service, song song ghi audit log",
        "Overview flow: citizen → eForm → eKYC provider → digital signature → Core Gov Service, with parallel audit logging",
        "全体フロー: 市民 → 電子申請フォーム → eKYCプロバイダ → 電子署名 → コア行政サービス、並行して監査ログを記録"
      ),
      P(
        "Điểm mấu chốt cần kiểm thử là các ranh giới tin cậy (trust boundary) giữa các thành phần: dữ liệu từ eKYC provider trả về Core Gov Service phải được xác thực chữ ký/HMAC để tránh giả mạo kết quả xác minh; token phiên làm việc của công dân phải hết hạn hợp lý để tránh chiếm phiên; và mọi lỗi timeout từ eKYC provider phải có cơ chế fallback rõ ràng (thử lại, chuyển hướng nộp thủ công) thay vì mặc định cho qua (fail-open), vì fail-open trong bối cảnh xác thực danh tính là lỗ hổng nghiêm trọng.",
        "The key testing focus is the trust boundaries between components: data returned from the eKYC provider to the Core Gov Service must be signature/HMAC-verified to prevent forged verification results; the citizen's session token must expire reasonably to prevent session hijacking; and any timeout error from the eKYC provider must have a clear fallback (retry, redirect to manual submission) rather than defaulting to fail-open, since fail-open in an identity verification context is a severe vulnerability.",
        "テストの重点はコンポーネント間の信頼境界にあります。eKYCプロバイダからコア行政サービスに返されるデータは、検証結果の偽造を防ぐため署名またはHMACで検証されなければなりません。市民のセッショントークンはセッションハイジャックを防ぐため適切な期限で失効する必要があります。またeKYCプロバイダからのタイムアウトエラーには、既定で通過させる（フェイルオープン）のではなく、再試行や手動提出への誘導といった明確なフォールバックが必要です。本人確認の文脈でのフェイルオープンは重大な脆弱性となるためです。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)",
      en: "3. Data Model & Business Invariants (Oracle)",
      ja: "3. データモデルと業務不変条件（オラクル）",
    },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi xoay quanh thực thể Dossier (hồ sơ) có trạng thái: DRAFT, SUBMITTED, EKYC_PENDING, EKYC_PASSED, EKYC_FAILED, SIGNED, APPROVED, REJECTED. Mỗi Dossier liên kết với một bản ghi EkycResult chứa điểm số đối sánh khuôn mặt (matchScore), kết quả liveness (livenessPassed), và trạng thái OCR (ocrConfidence). Bất biến quan trọng nhất là: Dossier chỉ được chuyển sang APPROVED khi và chỉ khi EkycResult.matchScore vượt ngưỡng cấu hình VÀ chữ ký số hợp lệ VÀ tất cả trường bắt buộc trong eForm đã được validate.",
        "The core data model revolves around a Dossier entity with states: DRAFT, SUBMITTED, EKYC_PENDING, EKYC_PASSED, EKYC_FAILED, SIGNED, APPROVED, REJECTED. Each Dossier links to an EkycResult record containing the face-match score (matchScore), liveness result (livenessPassed), and OCR confidence (ocrConfidence). The most critical invariant is: a Dossier can only transition to APPROVED if and only if EkycResult.matchScore exceeds the configured threshold AND the digital signature is valid AND all required eForm fields have been validated.",
        "コアデータモデルはDossier（申請）エンティティを中心に構成され、状態はDRAFT、SUBMITTED、EKYC_PENDING、EKYC_PASSED、EKYC_FAILED、SIGNED、APPROVED、REJECTEDです。各Dossierは、顔照合スコア（matchScore）、生体検知結果（livenessPassed）、OCR信頼度（ocrConfidence）を含むEkycResultレコードに関連付けられます。最も重要な不変条件は、DossierがAPPROVEDに遷移できるのは、EkycResult.matchScoreが設定された閾値を超え、かつ電子署名が有効であり、かつeFormの必須項目がすべて検証済みである場合に限られるということです。"
      ),
      UL(
        [
          "Bất biến 1: matchScore < ngưỡng FAR-safe → không bao giờ APPROVED, kể cả khi nhân viên thao tác thủ công ghi đè.",
          "Bất biến 2: mỗi Dossier APPROVED phải có đúng 1 audit log entry loại 'ekyc_verified' và 1 entry 'signature_verified', không được thiếu.",
          "Bất biến 3: dữ liệu sinh trắc học thô (ảnh khuôn mặt) không được lưu vĩnh viễn quá thời hạn quy định; chỉ lưu hash/kết quả đối sánh.",
          "Bất biến 4: một chứng thư số đã bị thu hồi (revoked) không được chấp nhận cho hành động ký, dù còn hạn theo ngày hết hạn ghi trên chứng thư.",
        ],
        [
          "Invariant 1: matchScore below the FAR-safe threshold → never APPROVED, even with manual staff override.",
          "Invariant 2: every APPROVED Dossier must have exactly one 'ekyc_verified' and one 'signature_verified' audit log entry, never missing.",
          "Invariant 3: raw biometric data (face images) must not be retained beyond the mandated retention period; only the match hash/result is kept.",
          "Invariant 4: a revoked digital certificate must never be accepted for signing, even if its stated expiry date has not passed.",
        ],
        [
          "不変条件1: matchScoreがFAR安全閾値を下回る場合、職員による手動上書きがあってもAPPROVEDには絶対にならない。",
          "不変条件2: APPROVEDになったすべてのDossierには、'ekyc_verified'と'signature_verified'の監査ログエントリがそれぞれ正確に1件ずつ存在し、欠落してはならない。",
          "不変条件3: 生の生体情報（顔画像）は定められた保持期間を超えて保存してはならず、照合結果のハッシュのみを保持する。",
          "不変条件4: 失効した電子証明書は、証明書に記載された有効期限が過ぎていなくても署名に使用できてはならない。",
        ]
      ),
      NOTE(
        "Oracle cho bài này không phải \"giao diện hiển thị đúng\" mà là \"trạng thái Dossier chỉ tiến lên khi mọi điều kiện an ninh danh tính đồng thời thỏa mãn\" — đây là điểm khác biệt lớn nhất so với test thương mại thông thường.",
        "The oracle here is not \"the UI displays correctly\" but \"the Dossier state only advances when all identity-security conditions are simultaneously satisfied\" — this is the biggest difference from ordinary commercial testing.",
        "このテストにおけるオラクルは「画面表示が正しいこと」ではなく、「本人確認に関するすべてのセキュリティ条件が同時に満たされた場合にのみDossierの状態が進むこと」です。これは通常の商用テストとの最大の違いです。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Rủi ro & chiến lược kiểm thử",
      en: "4. Risks & Test Strategy",
      ja: "4. リスクとテスト戦略",
    },
    blocks: [
      P(
        "Rủi ro lớn nhất là false accept: hệ thống chấp nhận một người không phải chủ giấy tờ (dùng ảnh tĩnh, video giả, deepfake) khiến kẻ gian chiếm đoạt dịch vụ công dưới danh tính người khác. Rủi ro thứ hai là false reject quá mức: ngưỡng đối sánh quá chặt khiến người dùng hợp lệ (người già, ánh sáng kém, thay đổi ngoại hình) liên tục bị từ chối, gây bức xúc và giảm niềm tin vào dịch vụ số hoá. Rủi ro thứ ba liên quan đến biểu mẫu: dữ liệu không hợp lệ hoặc bị thao túng (SQL injection, XSS trong trường văn bản tự do) có thể làm sai lệch hồ sơ hành chính có giá trị pháp lý.",
        "The biggest risk is false accept: the system accepting someone who is not the document owner (using a static photo, fake video, deepfake), letting a bad actor hijack a public service under someone else's identity. The second risk is excessive false reject: an overly strict matching threshold causing legitimate users (elderly, poor lighting, appearance changes) to be repeatedly rejected, causing frustration and eroding trust in digitalization. The third risk concerns the form: invalid or manipulated data (SQL injection, XSS in free-text fields) could corrupt a legally binding administrative dossier.",
        "最大のリスクは誤受理（false accept）です。静止画像、偽造動画、ディープフェイクを用いて証明書の本人ではない人物をシステムが受け入れてしまうと、悪意ある者が他人の身分でサービスを乗っ取ることになります。第二のリスクは過度な誤拒否（false reject）で、照合閾値が厳しすぎると高齢者、照明不良、外見変化などの正当な利用者が繰り返し拒否され、不満とデジタル化への信頼低下を招きます。第三のリスクはフォームに関するもので、不正または改ざんされたデータ（自由記述欄でのSQLインジェクションやXSS）が法的効力を持つ行政文書を破損させる可能性があります。"
      ),
      P(
        "Chiến lược kiểm thử chia làm bốn tầng: (1) unit/contract test cho logic quyết định ngưỡng eKYC và validate form, chạy độc lập không phụ thuộc provider thật; (2) test tích hợp với eKYC provider giả lập (mock/stub) để kiểm soát được các kịch bản biên (matchScore=ngưỡng-1, ngưỡng, ngưỡng+1); (3) test E2E bằng Playwright mô phỏng hành trình công dân thật từ mở form đến nhận kết quả; (4) test bảo mật và khả năng tiếp cận chạy định kỳ trong CI, gồm quét OWASP cơ bản và kiểm tra WCAG. Việc tách lớp (2) khỏi provider thật là bắt buộc vì không thể và không nên gọi dịch vụ eKYC sản xuất thật trong test tự động.",
        "The test strategy has four layers: (1) unit/contract tests for the eKYC threshold decision logic and form validation, running independently of the real provider; (2) integration tests against a mocked/stubbed eKYC provider to control boundary scenarios (matchScore = threshold-1, threshold, threshold+1); (3) E2E tests with Playwright simulating a real citizen journey from opening the form to receiving the result; (4) security and accessibility tests running periodically in CI, including basic OWASP scanning and WCAG checks. Separating layer (2) from the real provider is mandatory since production eKYC services cannot and should not be called from automated tests.",
        "テスト戦略は4層に分かれます。（1）実プロバイダに依存せず単独で動くeKYC閾値判定ロジックとフォームバリデーションの単体・契約テスト。（2）境界シナリオ（matchScore=閾値-1、閾値、閾値+1）を制御するためのモック/スタブ化されたeKYCプロバイダに対する結合テスト。（3）フォームを開いてから結果を受け取るまでの実際の市民の行程を模したPlaywrightによるE2Eテスト。（4）基本的なOWASPスキャンとWCAGチェックを含む、CIで定期実行するセキュリティとアクセシビリティのテストです。本番のeKYCサービスを自動テストから呼び出すことはできず、また呼び出すべきでもないため、レイヤー（2）を実プロバイダから分離することは必須です。"
      ),
      TIP(
        "Luôn tách bộ test \"quyết định ngưỡng\" ra khỏi bộ test \"gọi provider thật\" — nhờ đó có thể chạy hàng trăm ca biên (matchScore) trong vài giây mà không tốn chi phí gọi API eKYC thương mại.",
        "Always separate the \"threshold decision\" test suite from the \"real provider call\" suite — this lets hundreds of boundary cases (matchScore) run in seconds without incurring commercial eKYC API costs.",
        "「閾値判定」のテスト群と「実プロバイダ呼び出し」のテスト群は必ず分離しましょう。これにより、商用eKYC APIの呼び出しコストをかけずに、数百件の境界ケース（matchScore）を数秒で実行できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Test Plan chi tiết",
      en: "5. Detailed Test Plan",
      ja: "5. 詳細テスト計画",
    },
    blocks: [
      P(
        "Test Plan xác định phạm vi: trong phạm vi là toàn bộ luồng nộp hồ sơ, xác thực eKYC, ký số, và audit log; ngoài phạm vi là hạ tầng nội bộ của nhà cung cấp eKYC (được coi là hộp đen, kiểm thử qua contract/mock). Đối tượng kiểm thử gồm ba vai trò: công dân (citizen), cán bộ xử lý hồ sơ (officer), và quản trị viên hệ thống (admin) có quyền xem audit log. Môi trường kiểm thử dùng eKYC sandbox do provider cung cấp, cho phép cấu hình trả về kết quả matchScore tuỳ ý để kiểm soát được ca biên mà không cần ảnh thật của người dùng.",
        "The Test Plan defines scope: in-scope is the entire submission flow, eKYC verification, digital signing, and audit logging; out-of-scope is the eKYC provider's internal infrastructure (treated as a black box, tested via contract/mock). Test subjects include three roles: citizen, processing officer, and system admin with audit-log viewing rights. The test environment uses the eKYC sandbox supplied by the provider, allowing configurable matchScore responses to control boundary cases without needing real user photos.",
        "テスト計画では範囲を定義します。対象範囲は申請提出フロー全体、eKYC本人確認、電子署名、監査ログです。対象外はeKYCプロバイダの内部基盤（ブラックボックスとして扱い、契約テストやモックで検証）です。テスト対象には、市民、処理担当職員、監査ログ閲覧権限を持つシステム管理者の3つの役割が含まれます。テスト環境はプロバイダが提供するeKYCサンドボックスを使用し、実際の利用者写真を必要とせずに境界ケースを制御できるよう、matchScoreの応答を任意に設定可能にします。"
      ),
      UL(
        [
          "Tiêu chí vào (entry): môi trường sandbox eKYC sẵn sàng, dữ liệu form mẫu đã chuẩn bị, chứng thư số test đã cấp.",
          "Tiêu chí ra (exit): 100% ca P0 pass, ≥95% ca P1 pass, không còn lỗi bảo mật nghiêm trọng mở, báo cáo a11y đạt AA.",
          "Rủi ro tồn đọng cần chấp nhận: độ trễ mạng thực tế của eKYC provider sản xuất không thể mô phỏng 100% trong sandbox.",
          "Công cụ: Playwright cho E2E, Postman/Newman cho contract API, axe-core cho a11y, k6 cho tải nhẹ luồng nộp hồ sơ.",
        ],
        [
          "Entry criteria: eKYC sandbox environment ready, sample form data prepared, test digital certificates issued.",
          "Exit criteria: 100% P0 cases pass, ≥95% P1 cases pass, no open critical security defects, a11y report meets AA.",
          "Accepted residual risk: real production eKYC provider network latency cannot be 100% simulated in sandbox.",
          "Tools: Playwright for E2E, Postman/Newman for contract API, axe-core for a11y, k6 for light-load submission flow testing.",
        ],
        [
          "エントリ基準: eKYCサンドボックス環境が準備済み、サンプルフォームデータ準備済み、テスト用電子証明書発行済み。",
          "エグジット基準: P0ケース100%合格、P1ケース95%以上合格、未解決の重大セキュリティ欠陥なし、a11yレポートがAA基準を達成。",
          "許容する残存リスク: 本番のeKYCプロバイダの実ネットワーク遅延はサンドボックスで100%再現できない。",
          "使用ツール: E2EにPlaywright、契約APIにPostman/Newman、アクセシビリティにaxe-core、申請提出フローの軽負荷試験にk6。",
        ]
      ),
      WARN(
        "Không bao giờ dùng ảnh CCCD/khuôn mặt thật của nhân viên hay người dùng thật trong bộ test tự động lưu trong repo — chỉ dùng dữ liệu tổng hợp (synthetic) hoặc bộ dữ liệu test do provider cấp phép rõ ràng, để tránh vi phạm quy định bảo vệ dữ liệu cá nhân.",
        "Never use real staff or user ID/face photos in automated test suites stored in the repo — use only synthetic data or test datasets explicitly licensed by the provider, to avoid violating personal data protection regulations.",
        "リポジトリに保存する自動テストスイートには、職員や実利用者の本人確認書類・顔写真を実データとして絶対に使用しないでください。個人データ保護規制違反を避けるため、合成データまたはプロバイダが明示的にライセンスしたテストデータセットのみを使用してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Ma trận ca kiểm thử",
      en: "6. Test Case Matrix",
      ja: "6. テストケースマトリクス",
    },
    blocks: [
      P(
        "Ma trận ca được tổ chức theo năm nhóm: eKYC match (ca chuẩn), false accept (ca an ninh nghiêm trọng), false reject (ca trải nghiệm), eForm invalid (ca dữ liệu), và audit/a11y (ca tuân thủ). Mỗi nhóm được gắn mức ưu tiên P0/P1 để đội phát triển biết thứ tự khắc phục khi phát hiện lỗi. Nhóm false accept luôn được xếp P0 vì hậu quả là chiếm đoạt danh tính trong dịch vụ công — mức độ nghiêm trọng cao nhất có thể có trong toàn bộ hệ thống.",
        "The test case matrix is organized into five groups: eKYC match (standard cases), false accept (critical security cases), false reject (experience cases), eForm invalid (data cases), and audit/a11y (compliance cases). Each group is tagged P0/P1 priority so the dev team knows the fix order when a defect is found. The false accept group is always P0 since the consequence is identity takeover in a public service — the highest severity possible in the whole system.",
        "テストケースマトリクスは、eKYC照合（標準ケース）、誤受理（重大セキュリティケース）、誤拒否（体験ケース）、eForm不正（データケース）、監査・アクセシビリティ（コンプライアンスケース）の5グループに整理されます。各グループにはP0/P1の優先度が付与され、不具合発見時の開発チームの修正順序を明確にします。誤受理グループは、行政サービスにおける本人なりすましという結果を招くため、システム全体で最も重大度が高いP0として常に位置づけられます。"
      ),
      IMG(
        svg2,
        "Ma trận 5 nhóm ca: eKYC match, false accept, false reject, eForm invalid, audit & a11y kèm oracle và mức ưu tiên",
        "Matrix of 5 case groups: eKYC match, false accept, false reject, eForm invalid, audit & a11y with oracle and priority",
        "5グループのケースマトリクス: eKYC照合、誤受理、誤拒否、eForm不正、監査・アクセシビリティ（オラクルと優先度付き）"
      ),
      UL(
        [
          "TC-01 (P0): matchScore = ngưỡng chính xác → PASS biên trên, hồ sơ chuyển EKYC_PASSED.",
          "TC-02 (P0): matchScore = ngưỡng - 1 → FAIL biên dưới, hồ sơ chuyển EKYC_FAILED, không lộ điểm số cho công dân.",
          "TC-03 (P0): ảnh liveness là video phát lại (replay attack) → hệ thống phát hiện và từ chối trước khi tính matchScore.",
          "TC-04 (P1): công dân trên 70 tuổi, ảnh CCCD cũ 10 năm → hệ thống gợi ý xác minh bổ sung thay vì từ chối cứng.",
          "TC-05 (P1): trường số CMND/CCCD nhập ký tự đặc biệt `<script>` → bị chặn, không lưu vào DB, cảnh báo ghi log.",
          "TC-06 (P1): chứng thư số đã bị thu hồi được dùng để ký → hệ thống chặn ký, log lý do 'certificate_revoked'.",
        ],
        [
          "TC-01 (P0): matchScore = exact threshold → passes at upper boundary, dossier moves to EKYC_PASSED.",
          "TC-02 (P0): matchScore = threshold - 1 → fails at lower boundary, dossier moves to EKYC_FAILED, score not exposed to citizen.",
          "TC-03 (P0): liveness image is a replayed video (replay attack) → system detects and rejects before computing matchScore.",
          "TC-04 (P1): citizen over 70, 10-year-old ID photo → system suggests supplementary verification instead of hard rejection.",
          "TC-05 (P1): ID number field entered with special characters `<script>` → blocked, not persisted to DB, logged as a warning.",
          "TC-06 (P1): a revoked digital certificate is used to sign → system blocks signing, logs reason 'certificate_revoked'.",
        ],
        [
          "TC-01（P0）: matchScoreが閾値ちょうど → 上側境界で合格し、申請はEKYC_PASSEDに遷移する。",
          "TC-02（P0）: matchScoreが閾値-1 → 下側境界で不合格となり、申請はEKYC_FAILEDに遷移し、スコアは市民に公開されない。",
          "TC-03（P0）: 生体検知の画像がリプレイ動画（リプレイ攻撃） → matchScore算出前にシステムが検知し拒否する。",
          "TC-04（P1）: 70歳以上の市民で身分証写真が10年前のもの → システムはハード拒否ではなく追加確認を提案する。",
          "TC-05（P1）: 身分証番号欄に特殊文字`<script>`を入力 → ブロックされDBに保存されず、警告としてログに記録される。",
          "TC-06（P1）: 失効した電子証明書で署名しようとする → システムは署名をブロックし、理由'certificate_revoked'をログに記録する。",
        ]
      ),
    ],
  },
  {
    heading: {
      vi: "7. Chuẩn bị dữ liệu & mock eKYC provider",
      en: "7. Test Data Prep & eKYC Provider Mock",
      ja: "7. テストデータ準備とeKYCプロバイダのモック",
    },
    blocks: [
      P(
        "Vì không thể phụ thuộc vào provider eKYC sản xuất thật trong test tự động, đội QA dựng một mock server mô phỏng API của provider, cho phép cấu hình sẵn các kịch bản trả về: PASS với matchScore cụ thể, FAIL với lý do cụ thể (liveness_failed, ocr_low_confidence, face_mismatch), hoặc timeout giả lập để kiểm tra cơ chế fallback. Mock server được viết bằng một service Node.js nhỏ, expose endpoint tương thích với hợp đồng API thật (cùng field, cùng mã lỗi) để đảm bảo tính đại diện.",
        "Since automated tests cannot depend on the real production eKYC provider, the QA team builds a mock server simulating the provider's API, pre-configurable with scenarios: PASS with a specific matchScore, FAIL with a specific reason (liveness_failed, ocr_low_confidence, face_mismatch), or a simulated timeout to test the fallback mechanism. The mock server is a small Node.js service exposing an endpoint compatible with the real API contract (same fields, same error codes) to ensure representativeness.",
        "本番のeKYCプロバイダに自動テストを依存させることはできないため、QAチームはプロバイダAPIを模したモックサーバーを構築します。これはPASS（特定のmatchScore付き）、FAIL（特定の理由: liveness_failed、ocr_low_confidence、face_mismatch）、フォールバック機構を検証するための擬似タイムアウトといったシナリオを事前設定できます。モックサーバーは小さなNode.jsサービスとして実装され、代表性を確保するため実APIの契約（同じフィールド、同じエラーコード）と互換性のあるエンドポイントを公開します。"
      ),
      CODE(
        "javascript",
        `// mock-ekyc-server.mjs — mock provider cho test tích hợp
import express from "express";
const app = express();
app.use(express.json());

// Bảng kịch bản cấu hình sẵn theo mã hồ sơ test
const SCENARIOS = {
  "DOSSIER_PASS_STD": { status: "PASS", matchScore: 0.94, livenessPassed: true },
  "DOSSIER_FAIL_LOW": { status: "FAIL", matchScore: 0.41, reason: "face_mismatch" },
  "DOSSIER_BOUNDARY_UP": { status: "PASS", matchScore: 0.80 }, // = ngưỡng
  "DOSSIER_BOUNDARY_DOWN": { status: "FAIL", matchScore: 0.79, reason: "below_threshold" },
  "DOSSIER_TIMEOUT": null, // giả lập timeout, không phản hồi
};

app.post("/v1/verify", (req, res) => {
  const { dossierRef } = req.body;
  const scenario = SCENARIOS[dossierRef];

  if (scenario === null) {
    // Không phản hồi trong 15s để kích hoạt timeout ở phía client
    return; // client phải tự có timeout + fallback
  }
  if (!scenario) {
    return res.status(404).json({ error: "unknown_test_dossier" });
  }
  return res.status(200).json({
    dossierRef,
    ...scenario,
    signedAt: new Date().toISOString(),
    providerSignature: "mock-hmac-signature",
  });
});

app.listen(4321, () => console.log("Mock eKYC provider on :4321"));`
      ),
      TIP(
        "Đặt tên mã hồ sơ test theo quy ước rõ ràng (DOSSIER_PASS_STD, DOSSIER_BOUNDARY_UP...) giúp mọi thành viên trong team đọc test case là hiểu ngay kịch bản, không cần tra thêm tài liệu.",
        "Naming test dossier codes with a clear convention (DOSSIER_PASS_STD, DOSSIER_BOUNDARY_UP...) lets any team member read a test case and immediately understand the scenario without extra documentation lookup.",
        "テスト用申請コードに明確な命名規則（DOSSIER_PASS_STD、DOSSIER_BOUNDARY_UPなど）を用いることで、チームの誰もが追加ドキュメントを参照せずにテストケースからシナリオを即座に理解できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Kịch bản Happy Path (Playwright)",
      en: "8. Happy Path Scenario (Playwright)",
      ja: "8. ハッピーパスシナリオ（Playwright）",
    },
    blocks: [
      P(
        "Kịch bản happy path mô phỏng một công dân hợp lệ: mở form, điền đầy đủ thông tin cá nhân, tải lên ảnh CCCD và ảnh chân dung trực tiếp qua webcam giả lập, hệ thống gọi eKYC (trong môi trường test là mock server ở trên) trả về PASS, công dân ký số bằng chứng thư test hợp lệ, và hồ sơ chuyển sang trạng thái APPROVED. Test không chỉ kiểm tra giao diện hiển thị \"Thành công\" mà còn xác nhận qua API rằng trạng thái Dossier trong DB đúng là APPROVED và audit log có đủ hai bản ghi bắt buộc.",
        "The happy path scenario simulates a valid citizen: opening the form, filling in full personal details, uploading an ID photo and a live portrait via a simulated webcam, the system calling eKYC (in test env, the mock server above) returning PASS, the citizen signing with a valid test certificate, and the dossier moving to APPROVED. The test not only checks the UI shows \"Success\" but also verifies via API that the Dossier state in the DB is indeed APPROVED and the audit log has both required entries.",
        "ハッピーパスシナリオは、正当な市民の操作を模擬します。フォームを開き個人情報を全項目入力し、身分証写真と模擬ウェブカメラによるライブ肖像写真をアップロードし、システムがeKYC（テスト環境では上記のモックサーバー）を呼び出してPASSを返し、市民が有効なテスト用証明書で署名し、申請がAPPROVEDに遷移します。このテストはUIに「成功」と表示されることを確認するだけでなく、APIを通じてDBのDossier状態が実際にAPPROVEDであること、監査ログに必要な2件のエントリが存在することも検証します。"
      ),
      CODE(
        "javascript",
        `// happy-path.spec.ts — Playwright, luồng công dân hợp lệ
import { test, expect } from "@playwright/test";

test("công dân hợp lệ nộp hồ sơ và được APPROVED", async ({ page, request }) => {
  await page.goto("/eform/residence-registration");

  await page.fill("#fullName", "Nguyen Van A");
  await page.fill("#nationalId", "079201012345");
  await page.setInputFiles("#idCardUpload", "fixtures/synthetic-id-card.png");
  await page.setInputFiles("#livePortrait", "fixtures/synthetic-portrait.png");

  // Gán mã kịch bản mock để mock-ekyc-server trả PASS chuẩn
  await page.fill("#testScenarioTag", "DOSSIER_PASS_STD");
  await page.click("#btnSubmitEkyc");

  await expect(page.locator("#ekycStatus")).toHaveText("Xác thực thành công", { timeout: 10_000 });

  await page.click("#btnSignDigitally");
  await page.selectOption("#certSelect", "test-cert-valid-01");
  await page.click("#btnConfirmSign");

  await expect(page.locator("#dossierStatus")).toHaveText("Đã duyệt");

  // Xác nhận oracle thật qua API, không chỉ tin giao diện
  const dossierId = await page.getAttribute("#dossierStatus", "data-dossier-id");
  const res = await request.get(\`/api/dossiers/\${dossierId}\`);
  const body = await res.json();
  expect(body.status).toBe("APPROVED");

  const auditRes = await request.get(\`/api/dossiers/\${dossierId}/audit-log\`);
  const auditBody = await auditRes.json();
  const types = auditBody.entries.map((e) => e.type);
  expect(types).toContain("ekyc_verified");
  expect(types).toContain("signature_verified");
});`
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ca lỗi chuyên sâu: false accept/reject & form invalid",
      en: "9. Deep-Dive Failure Cases: False Accept/Reject & Invalid Form",
      ja: "9. 深堀り不具合ケース：誤受理・誤拒否とフォーム不正",
    },
    blocks: [
      P(
        "Ca false accept là ca kiểm thử quan trọng nhất trong toàn bộ bài toán: đội QA phải chủ động thử các kỹ thuật giả mạo phổ biến — ảnh in trên giấy chụp lại (print attack), phát lại video quay sẵn (replay attack), và ảnh được chỉnh sửa bằng công cụ deepfake cơ bản — để xác nhận rằng cơ chế liveness detection của provider bắt được và hệ thống không bao giờ tự động APPROVED trong các trường hợp này, kể cả khi matchScore trả về cao do lỗi thuật toán.",
        "The false accept case is the most critical test in the entire problem: QA must actively attempt common spoofing techniques — printed photo re-captured on camera (print attack), replaying a pre-recorded video (replay attack), and images edited with basic deepfake tools — to confirm the provider's liveness detection catches these and the system never auto-approves in these cases, even if the returned matchScore is high due to an algorithm error.",
        "誤受理ケースは、この課題全体の中で最も重要なテストです。QAは、印刷写真を再撮影する攻撃（プリント攻撃）、事前録画動画の再生（リプレイ攻撃）、基本的なディープフェイクツールで編集された画像といった一般的ななりすまし手法を積極的に試み、プロバイダの生体検知機構がこれらを検出し、アルゴリズムの誤りでmatchScoreが高く返された場合でもシステムが自動承認しないことを確認しなければなりません。"
      ),
      CODE(
        "javascript",
        `// false-accept.spec.ts — thử nghiệm chống giả mạo, phải luôn FAIL
import { test, expect } from "@playwright/test";

const spoofFixtures = [
  { name: "print attack", file: "fixtures/spoof-printed-photo.png", expectedReason: "liveness_failed" },
  { name: "replay attack", file: "fixtures/spoof-replayed-video.mp4", expectedReason: "liveness_failed" },
  { name: "deepfake basic", file: "fixtures/spoof-deepfake.png", expectedReason: "face_mismatch" },
];

for (const spoof of spoofFixtures) {
  test(\`chống giả mạo: \${spoof.name} phải bị từ chối\`, async ({ page }) => {
    await page.goto("/eform/residence-registration");
    await page.fill("#nationalId", "079201099999");
    await page.setInputFiles("#idCardUpload", "fixtures/synthetic-id-card.png");
    await page.setInputFiles("#livePortrait", spoof.file);
    await page.fill("#testScenarioTag", "DOSSIER_FAIL_LOW");
    await page.click("#btnSubmitEkyc");

    await expect(page.locator("#ekycStatus")).toHaveText("Xác thực thất bại");
    await expect(page.locator("#dossierStatus")).not.toHaveText("Đã duyệt");

    const reasonAttr = await page.getAttribute("#ekycStatus", "data-reason");
    expect(reasonAttr).toBe(spoof.expectedReason);
  });
}`
      ),
      P(
        "Ngược lại, ca false reject cần được xử lý bằng trải nghiệm nhân văn: khi hệ thống không thể xác minh chắc chắn (ví dụ matchScore nằm trong vùng xám 0.6–0.79 thay vì rõ ràng dưới ngưỡng), thay vì từ chối cứng và buộc công dân làm lại từ đầu, luồng nên chuyển sang \"xác minh bổ sung\" — cho phép cán bộ xem xét thủ công hoặc yêu cầu chụp lại ảnh với hướng dẫn cụ thể (đủ sáng, bỏ khẩu trang). Test phải xác nhận rằng luồng bổ sung này tồn tại và không gây mất dữ liệu đã nhập trước đó.",
        "Conversely, the false reject case needs humane handling: when the system cannot verify with certainty (e.g., matchScore falls in a gray zone of 0.6–0.79 rather than clearly below threshold), instead of a hard rejection forcing the citizen to start over, the flow should move to \"supplementary verification\" — allowing manual officer review or requesting a retake with specific guidance (better lighting, remove face mask). The test must confirm this supplementary flow exists and does not lose previously entered data.",
        "一方、誤拒否ケースは人間味のある対応が必要です。システムが確実に検証できない場合（例えばmatchScoreが明確に閾値未満ではなくグレーゾーンの0.6〜0.79の場合）、市民に最初からやり直しを強いるハード拒否ではなく、フローは「追加確認」へ移行すべきです。これは職員による手動レビューを許可するか、具体的な指示（十分な明るさ、マスクの着用解除）とともに再撮影を求めるものです。テストでは、この追加確認フローが存在し、それまでに入力されたデータが失われないことを確認しなければなりません。"
      ),
      CODE(
        "javascript",
        `// form-invalid.spec.ts — kiểm tra validate eForm chống dữ liệu độc hại
import { test, expect } from "@playwright/test";

test("chặn ký tự script trong trường văn bản tự do", async ({ page }) => {
  await page.goto("/eform/residence-registration");
  await page.fill("#nationalId", "<script>alert(1)</script>");
  await page.click("#btnSubmitEkyc");

  await expect(page.locator("#nationalIdError")).toHaveText("Số định danh không hợp lệ");
  // Đảm bảo không có request nào được gửi lên server với payload độc hại
});

test("thiếu trường bắt buộc phải chặn submit và chỉ rõ field lỗi", async ({ page }) => {
  await page.goto("/eform/residence-registration");
  await page.click("#btnSubmitEkyc"); // bỏ trống toàn bộ form

  const errors = await page.locator(".field-error").allTextContents();
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.join(" ")).toContain("bắt buộc");
});`
      ),
    ],
  },
  {
    heading: {
      vi: "10. CI/CD, audit log & kiểm thử khả năng tiếp cận",
      en: "10. CI/CD, Audit Log & Accessibility Testing",
      ja: "10. CI/CD、監査ログ、アクセシビリティテスト",
    },
    blocks: [
      P(
        "Pipeline CI/CD cho hệ thống eKYC/eForm được thiết kế thành nhiều tầng chạy song song để rút ngắn thời gian phản hồi: tầng unit/contract chạy trước tiên vì nhanh nhất, tiếp theo là tầng tích hợp với mock eKYC provider, sau đó là tầng E2E Playwright chạy trên môi trường staging có mock server, và cuối cùng là tầng quét bảo mật/accessibility. Mọi lần merge vào nhánh chính đều bắt buộc pipeline xanh; riêng nhóm ca P0 (false accept, bất biến trạng thái Dossier) được đánh dấu là \"gate bắt buộc\" không thể bỏ qua dù dưới áp lực deadline.",
        "The CI/CD pipeline for the eKYC/eForm system is designed in multiple parallel stages to shorten feedback time: the unit/contract stage runs first as it's fastest, followed by the integration stage against the mock eKYC provider, then the E2E Playwright stage on a staging environment with the mock server, and finally the security/accessibility scanning stage. Every merge to the main branch requires a green pipeline; the P0 case group (false accept, Dossier state invariants) is marked a \"mandatory gate\" that cannot be skipped even under deadline pressure.",
        "eKYC・eFormシステムのCI/CDパイプラインは、フィードバック時間を短縮するため複数の並列ステージで設計されています。最も速い単体・契約テストステージが最初に実行され、次にモックeKYCプロバイダに対する結合テストステージ、続いてモックサーバーを備えたステージング環境でのE2E Playwrightステージ、最後にセキュリティ・アクセシビリティスキャンステージが実行されます。メインブランチへのすべてのマージにはパイプラインの成功が必須であり、P0ケース群（誤受理、Dossier状態の不変条件）は、締切のプレッシャー下でもスキップできない「必須ゲート」として指定されています。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/gov-ekyc-eform.yml
name: gov-ekyc-eform-ci
on: [push, pull_request]

jobs:
  unit-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:contract -- --schema=./contracts/ekyc-provider.json

  integration-mock-ekyc:
    needs: unit-contract
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node mock-ekyc-server.mjs &
      - run: npm run test:integration

  e2e-playwright:
    needs: integration-mock-ekyc
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npm run test:e2e -- --grep "@P0|@P1"
      - name: Gate P0 false-accept & invariants
        run: npm run test:e2e -- --grep "@P0" --reporter=json > p0-result.json
      - run: node scripts/assert-zero-failures.mjs p0-result.json

  security-a11y:
    needs: e2e-playwright
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run scan:owasp-basic
      - run: npm run test:a11y -- --standard=WCAG2AA
      - run: npm run audit:immutable-log-check`
      ),
      CODE(
        "javascript",
        `// scripts/assert-zero-failures.mjs — gate cứng cho ca P0 trong CI
import fs from "node:fs";

const reportPath = process.argv[2];
const raw = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

const failed = raw.suites
  .flatMap((s) => s.specs)
  .filter((spec) => spec.tags?.includes("@P0"))
  .filter((spec) => spec.ok !== true);

if (failed.length > 0) {
  console.error(\`GATE P0 THẤT BẠI: \${failed.length} ca P0 không pass, chặn merge.\`);
  failed.forEach((f) => console.error(\` - \${f.title}\`));
  process.exit(1);
}

console.log("GATE P0 PASS: toàn bộ ca false-accept & bất biến trạng thái Dossier đều xanh.");
process.exit(0);`
      ),
      P(
        "Kiểm thử audit log tập trung vào tính bất biến (immutability): test phải xác nhận rằng không có API hoặc thao tác admin nào có thể sửa hoặc xoá một bản ghi log đã ghi, chỉ có thể thêm mới (append). Kiểm thử khả năng tiếp cận dùng axe-core quét tự động các vi phạm WCAG phổ biến (thiếu label cho input, độ tương phản màu chưa đủ, thiếu thuộc tính aria cho thông báo lỗi động), đồng thời bổ sung kiểm thử thủ công bằng bàn phím và screen reader cho luồng ký số — vì đây là bước có tính pháp lý cao nhất, không được phép chỉ dựa vào con trỏ chuột.",
        "Audit log testing focuses on immutability: tests must confirm no API or admin action can modify or delete an already-written log entry, only append new ones. Accessibility testing uses axe-core to automatically scan for common WCAG violations (missing input labels, insufficient color contrast, missing aria attributes for dynamic error messages), plus manual keyboard and screen-reader testing for the digital-signing flow — since this is the highest-stakes legal step and must not rely on mouse pointer input alone.",
        "監査ログのテストは不変性（イミュータビリティ）に重点を置きます。すでに書き込まれたログエントリをどのAPIや管理者操作も変更・削除できず、追記のみ可能であることをテストで確認しなければなりません。アクセシビリティテストではaxe-coreを用いて一般的なWCAG違反（入力欄のラベル欠如、色コントラスト不足、動的エラーメッセージのaria属性欠如）を自動スキャンし、加えて電子署名フローについてはキーボードとスクリーンリーダーによる手動テストを追加します。これは法的意味が最も重い工程であり、マウスポインタ操作のみに依存してはならないためです。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Góc phỏng vấn",
      en: "11. Interview Corner",
      ja: "11. 面接コーナー",
    },
    blocks: [
      QA(
        "Nếu ngưỡng matchScore của eKYC được nới lỏng để giảm khiếu nại false reject, QA nên phản ứng thế nào?",
        "If the eKYC matchScore threshold is loosened to reduce false-reject complaints, how should QA respond?",
        "QA cần định lượng rõ đánh đổi: nới ngưỡng giảm FRR nhưng tăng FAR — yêu cầu team sản phẩm và an ninh cùng ký duyệt thay đổi ngưỡng kèm phân tích rủi ro, đồng thời bổ sung ca kiểm thử ở vùng ngưỡng mới và giám sát tỷ lệ false accept thực tế sau khi triển khai, không tự ý chấp nhận thay đổi chỉ vì giảm được số ca than phiền.",
        "QA should clearly quantify the trade-off: loosening the threshold reduces FRR but increases FAR — require the product and security teams to co-sign the threshold change with a risk analysis, add test cases around the new threshold zone, and monitor real-world false-accept rates post-rollout, rather than silently accepting the change just because complaints decrease.",
        "eKYCのmatchScore閾値を誤拒否の苦情削減のために緩和する場合、QAはどう対応すべきですか。",
        "QAはトレードオフを明確に定量化すべきです。閾値を緩めるとFRRは下がりますがFARは上がります。プロダクトチームとセキュリティチームにリスク分析付きで閾値変更を共同承認させ、新しい閾値領域周辺のテストケースを追加し、展開後の実際の誤受理率を監視する必要があります。苦情件数が減るからといって黙って変更を受け入れてはいけません。"
      ),
      QA(
        "Làm sao kiểm thử được tính chống chối bỏ (non-repudiation) của chữ ký số mà không có HSM thật trong môi trường CI?",
        "How can non-repudiation of the digital signature be tested without a real HSM in the CI environment?",
        "Dùng HSM giả lập hoặc soft-PKI trong môi trường test với chứng thư số tự ký (self-signed) được gắn nhãn rõ 'test-only', kiểm tra logic xác thực chữ ký (signature verification), luồng thu hồi chứng thư, và đảm bảo audit log ghi đủ danh tính người ký cùng dấu thời gian; phần hạ tầng HSM vật lý thật được kiểm thử riêng ở môi trường staging gần production, không nằm trong CI nhanh.",
        "Use a simulated HSM or soft-PKI in the test environment with self-signed test certificates clearly labeled 'test-only', verify the signature-verification logic, the certificate-revocation flow, and confirm the audit log records the signer's identity and timestamp sufficiently; the real physical HSM infrastructure is tested separately in a near-production staging environment, not in the fast CI loop.",
        "CI環境に実際のHSMがない場合、電子署名の否認防止性をどうテストしますか。",
        "テスト環境では、'test-only'と明示的にラベル付けされた自己署名証明書を用いた模擬HSMまたはソフトPKIを使用します。署名検証ロジック、証明書失効フロー、監査ログに署名者の身元とタイムスタンプが十分記録されることを確認します。実際の物理HSM基盤は、高速なCIループの中ではなく、本番に近いステージング環境で別途テストします。"
      ),
      QA(
        "Đâu là dấu hiệu cho thấy bộ test eKYC của bạn đang \"giả tạo an toàn\" mà không thực sự bắt được lỗi?",
        "What signals suggest your eKYC test suite is \"falsely reassuring\" without actually catching defects?",
        "Dấu hiệu cảnh báo gồm: tất cả ca test chỉ dùng ảnh mock hoàn hảo (không có ca biên/giả mạo), test luôn pass dù đổi ngưỡng cấu hình, không có ca nào từng fail trong 6 tháng qua dù hệ thống có thay đổi logic, và không có phép đo độ phủ theo bất biến nghiệp vụ (chỉ đo coverage dòng code); khi thấy các dấu hiệu này cần bổ sung ngay ca biên, ca giả mạo, và ca đối chiếu trạng thái DB thực tế thay vì chỉ tin giao diện.",
        "Warning signs include: all test cases use only perfect mock images (no boundary/spoof cases), tests always pass regardless of threshold config changes, no test has failed in six months despite logic changes, and coverage is measured only by code lines rather than by business invariants; when these appear, boundary cases, spoof cases, and real DB-state assertions (rather than trusting the UI alone) must be added immediately.",
        "eKYCテストスイートが実際には不具合を捉えられておらず「偽の安心感」を与えている兆候は何ですか。",
        "警告サインには、すべてのテストケースが完璧なモック画像のみを使用している（境界ケースやなりすましケースがない）、閾値設定を変更してもテストが常に合格する、ロジックが変更されたにもかかわらず6か月間一度も失敗していない、コードカバレッジのみで業務不変条件によるカバレッジを測定していない、といったものがあります。これらが見られた場合、UIを信じるだけでなく、境界ケース、なりすましケース、実際のDB状態を検証するアサーションを直ちに追加する必要があります。"
      ),
      SCEN(
        "Trong buổi review trước khi go-live, đại diện Sở yêu cầu giảm thời gian xác thực eKYC từ 8 giây xuống 2 giây để cải thiện trải nghiệm, nhưng đội kỹ thuật eKYC provider nói cần giữ 8 giây để chạy đủ bước chống giả mạo (liveness, phân tích micro-motion).",
        "In a pre-go-live review, the department representative asks to cut eKYC verification time from 8 seconds to 2 seconds to improve UX, but the eKYC provider's technical team says 8 seconds is needed to run full anti-spoofing steps (liveness, micro-motion analysis).",
        "QA nên trình bày dữ liệu thực nghiệm: so sánh tỷ lệ phát hiện giả mạo giữa cấu hình 8 giây và 2 giây trên cùng bộ ca thử nghiệm giả mạo đã chuẩn bị, cho thấy rút ngắn thời gian có thể làm bỏ sót bước phân tích micro-motion và tăng FAR; đề xuất phương án trung gian như tối ưu UI để người dùng cảm thấy nhanh hơn (hiển thị tiến trình rõ ràng) thay vì cắt bớt bước xác minh an ninh, và yêu cầu quyết định cuối cùng phải có chữ ký của cả đại diện Sở lẫn phụ trách an ninh thông tin.",
        "事前レビューで、担当部門の代表者がUX改善のためeKYC確認時間を8秒から2秒に短縮するよう要求しましたが、eKYCプロバイダの技術チームは、なりすまし対策の全工程（生体検知、微細動作分析）を実行するには8秒が必要だと述べています。",
        "QAは実験データを提示すべきです。準備済みのなりすましテストケース群を用いて8秒設定と2秒設定でのなりすまし検出率を比較し、時間短縮が微細動作分析工程の省略につながり誤受理率（FAR）を高める可能性を示します。セキュリティ検証工程を削るのではなく、進捗表示を明確にするなどUIを最適化して体感速度を改善する折衷案を提案し、最終判断には担当部門代表者と情報セキュリティ責任者の双方の承認署名を必須とするよう求めます。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Tóm tắt & checklist",
      en: "12. Summary & Checklist",
      ja: "12. まとめとチェックリスト",
    },
    blocks: [
      P(
        "Bài toán kiểm thử eKYC và eForm dịch vụ công đòi hỏi tư duy oracle-first triệt để: mọi ca kiểm thử phải quy về bất biến \"trạng thái Dossier chỉ tiến khi đồng thời thỏa các điều kiện an ninh danh tính, chữ ký hợp lệ, và dữ liệu hợp lệ\", chứ không dừng ở việc giao diện hiển thị đẹp. Việc tách lớp mock eKYC provider khỏi test tự động là điều kiện tiên quyết để có thể kiểm soát chính xác các ca biên matchScore mà không phụ thuộc hay tốn chi phí gọi dịch vụ sản xuất thật.",
        "Testing eKYC and public-service eForms demands rigorous oracle-first thinking: every test case must reduce to the invariant that \"the Dossier state only advances when identity-security conditions, valid signature, and valid data are simultaneously satisfied,\" not merely that the UI looks correct. Separating the mocked eKYC provider layer from automated tests is a prerequisite for precisely controlling matchScore boundary cases without depending on or paying for real production service calls.",
        "eKYCと行政サービスeFormのテストには、徹底したオラクルファーストの発想が求められます。すべてのテストケースは、UIの見た目が正しいことではなく、「本人確認のセキュリティ条件、有効な署名、有効なデータが同時に満たされた場合にのみDossier状態が進む」という不変条件に帰着させなければなりません。モック化されたeKYCプロバイダ層を自動テストから分離することは、本番サービス呼び出しに依存したりコストをかけたりせずにmatchScore境界ケースを正確に制御するための前提条件です。"
      ),
      P(
        "Song song với độ chính xác kỹ thuật, đội QA phải luôn cân bằng giữa an ninh (chặn false accept tuyệt đối) và trải nghiệm nhân văn (xử lý false reject bằng con đường bổ sung thay vì từ chối cứng), đồng thời đảm bảo mọi thao tác được truy vết qua audit log bất biến và giao diện tiếp cận được với mọi nhóm người dùng. Đây là bài toán tiêu biểu cho thấy kiểm thử trong khu vực công không chỉ là vấn đề kỹ thuật mà còn là vấn đề công bằng xã hội và trách nhiệm giải trình trước công dân.",
        "Alongside technical accuracy, the QA team must always balance security (absolutely blocking false accept) with humane experience (handling false reject via a supplementary path rather than hard rejection), while ensuring every action is traceable through an immutable audit log and the interface is accessible to every user group. This is a representative problem showing that testing in the public sector is not merely a technical matter but also one of social fairness and accountability to citizens.",
        "技術的な精度と並行して、QAチームはセキュリティ（誤受理の絶対的な阻止）と人間味のある体験（誤拒否をハード拒否ではなく追加確認の経路で処理すること）のバランスを常に取らなければなりません。同時に、あらゆる操作が改ざん不可能な監査ログを通じて追跡可能であり、インターフェースがあらゆる利用者層にとってアクセシブルであることを確保する必要があります。これは、公共部門におけるテストが単なる技術的問題ではなく、社会的公正性と市民に対する説明責任の問題でもあることを示す代表的な課題です。"
      ),
      UL(
        [
          "Đã định nghĩa oracle: trạng thái Dossier + audit log entries, không dựa vào UI đơn thuần.",
          "Đã tách mock eKYC provider, kiểm soát được toàn bộ ca biên matchScore.",
          "Đã có ca P0 chống giả mạo: print attack, replay attack, deepfake cơ bản.",
          "Đã xử lý nhân văn ca false reject bằng luồng xác minh bổ sung.",
          "Đã kiểm thử validate eForm chống injection/XSS trên mọi trường tự do.",
          "Đã xác nhận chữ ký số chặn chứng thư bị thu hồi (revoked).",
          "Đã kiểm thử audit log bất biến (append-only, không sửa/xoá được).",
          "Đã chạy quét accessibility WCAG AA và kiểm thử bàn phím/screen reader cho luồng ký số.",
          "Đã gắn gate P0 bắt buộc trong CI/CD, không thể bỏ qua dưới áp lực deadline.",
        ],
        [
          "Oracle defined: Dossier state + audit log entries, not relying on UI alone.",
          "Mock eKYC provider separated, full control over matchScore boundary cases.",
          "P0 anti-spoofing cases in place: print attack, replay attack, basic deepfake.",
          "False-reject cases handled humanely via supplementary verification flow.",
          "eForm validation tested against injection/XSS on all free-text fields.",
          "Digital signature confirmed to block revoked certificates.",
          "Audit log tested for immutability (append-only, cannot be edited/deleted).",
          "WCAG AA accessibility scan run, plus keyboard/screen-reader testing for the signing flow.",
          "Mandatory P0 gate wired into CI/CD, cannot be skipped under deadline pressure.",
        ],
        [
          "オラクルを定義済み: UIのみに依存せず、Dossier状態と監査ログエントリで判定する。",
          "モックeKYCプロバイダを分離し、matchScore境界ケースを完全に制御できる。",
          "なりすまし対策のP0ケース（プリント攻撃、リプレイ攻撃、基本的なディープフェイク）を整備済み。",
          "誤拒否ケースは追加確認フローで人間味をもって対応済み。",
          "すべての自由記述欄でインジェクション・XSSに対するeFormバリデーションをテスト済み。",
          "電子署名が失効した証明書をブロックすることを確認済み。",
          "監査ログの不変性（追記のみ、編集・削除不可）をテスト済み。",
          "WCAG AAアクセシビリティスキャンと、署名フローのキーボード・スクリーンリーダーテストを実施済み。",
          "必須のP0ゲートをCI/CDに組み込み、締切のプレッシャー下でもスキップ不可にした。",
        ]
      ),
    ],
  },
];

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "gov-ekyc-eform-public-service",
  cover: cover1,
  tags: tags("thucchien", "gov", "playwright", "security", "a11y", "realworld"),
  title: {
    vi: "Thực chiến: Kiểm thử eKYC & eForm dịch vụ công khu vực Chính phủ",
    en: "Real-World: Testing Gov eKYC & eForm Public Services",
    ja: "実戦：政府向けeKYC・電子申請サービスのテスト",
  },
  summary: {
    vi: "Bài thực chiến end-to-end kiểm thử hệ thống eKYC (đối chiếu giấy tờ + khuôn mặt) và eForm dịch vụ công trực tuyến: kiến trúc, bất biến nghiệp vụ, ma trận ca false accept/reject, mock provider, CI/CD kèm audit log và accessibility.",
    en: "An end-to-end real-world case testing a government eKYC (ID + face matching) and online public-service eForm system: architecture, business invariants, false-accept/reject case matrix, provider mocking, and CI/CD with audit logging and accessibility.",
    ja: "政府のeKYC（本人確認書類と顔照合）とオンライン電子申請フォームシステムをエンドツーエンドでテストする実戦事例です。アーキテクチャ、業務不変条件、誤受理・誤拒否のケースマトリクス、プロバイダのモック化、監査ログとアクセシビリティを含むCI/CDを扱います。",
  },
  pages: buildDoc(pages1),
};

export const THUCCHIEN_04B_DOCS = [art1];
