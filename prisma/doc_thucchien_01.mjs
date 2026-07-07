// ============================================================================
// doc_thucchien_01.mjs — Lô 1: 4 bài "Thực chiến doanh nghiệp" (kind = thucchien)
// Domain: Banking (loan origination, card auth/settlement/chargeback) +
//         Fintech (e-wallet payout/reconciliation, QR payment idempotency).
// Mỗi bài 14 chương, trilingual VI/EN/JA thật, oracle-first, code chạy được.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ============================================================================
// BÀI 1/4 — banking-loan-origination-disbursement
// ============================================================================
function buildArt1() {
  const thumb = makeThumb({ id: "tc01art1", domain: "banking", kind: "thucchien", label: "実戦 · LOAN ORIGINATION" });

  const svgArch = `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="380" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc luồng khởi tạo & giải ngân khoản vay · Loan origination &amp; disbursement architecture</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="24" y="54" width="112" height="46" rx="9" fill="#1e293b"/><text x="80" y="74" fill="#93c5fd">Web/App KH</text><text x="80" y="90" fill="#64748b" font-size="9.5">nộp hồ sơ vay</text>
<rect x="168" y="54" width="120" height="46" rx="9" fill="#1e293b"/><text x="228" y="74" fill="#93c5fd">Loan Origination Svc</text><text x="228" y="90" fill="#64748b" font-size="9.5">workflow · state machine</text>
<rect x="320" y="30" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="379" y="54" fill="#fcd34d">Credit Scoring Engine</text>
<rect x="320" y="86" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="379" y="110" fill="#fcd34d">CIC Bureau (bên thứ ba)</text>
<rect x="470" y="54" width="120" height="46" rx="9" fill="#1e3a2f"/><text x="530" y="74" fill="#86efac">Approval Workflow</text><text x="530" y="90" fill="#64748b" font-size="9.5">phê duyệt nhiều cấp</text>
<rect x="620" y="54" width="80" height="46" rx="9" fill="#1e293b"/><text x="660" y="74" fill="#c4b5fd">Core Banking</text><text x="660" y="90" fill="#64748b" font-size="9.5">giải ngân · lịch trả</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M136 77 H168" marker-end="url(#la)"/><path d="M288 68 C300 68 300 50 320 50" marker-end="url(#la)"/><path d="M288 86 C300 86 300 106 320 106" marker-end="url(#la)"/><path d="M438 50 C455 50 455 68 470 68" marker-end="url(#la)"/><path d="M590 77 H620" marker-end="url(#la)"/></g>
<defs><marker id="la" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<rect x="24" y="150" width="672" height="70" rx="10" fill="#111c30"/>
<text x="40" y="174" font-size="12.5" fill="#93c5fd" font-weight="700">Đồng bộ: nộp hồ sơ → kiểm tra hồ sơ đủ điều kiện → gọi CIC lấy điểm tín dụng. Bất đồng bộ: phê duyệt nhiều cấp (chuyên viên → trưởng phòng → giám đốc rủi ro), có thể mất 1-3 ngày làm việc.</text>
<text x="40" y="196" font-size="12.5" fill="#64748b">Sync: submission → eligibility check → CIC credit bureau call. Async: multi-level approval (officer → manager → risk director), can take 1-3 business days.</text>
<rect x="24" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="40" y="260" font-size="12.5" font-weight="800" fill="#5eead4">Điểm khó kiểm thử · Hard-to-test</text>
<g font-size="11.5" fill="#cbd5e1"><text x="40" y="282">• CIC là bên thứ ba — cần mock ổn định</text><text x="40" y="302">• Phê duyệt nhiều cấp, có thể bị từ chối giữa chừng</text><text x="40" y="322">• Giải ngân phải khớp đúng số tiền hợp đồng</text><text x="40" y="342">• Lịch trả nợ phải cân bằng toán học</text></g>
<rect x="370" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="386" y="260" font-size="12.5" font-weight="800" fill="#fca5a5">Chiến lược · Strategy</text>
<g font-size="11.5" fill="#cbd5e1"><text x="386" y="282">• Seed hồ sơ + mock CIC qua API test-only</text><text x="386" y="302">• Test từng cấp phê duyệt độc lập + luồng nối tiếp</text><text x="386" y="322">• Assert tổng giải ngân = gốc hợp đồng</text><text x="386" y="342">• Test idempotency lệnh giải ngân trùng</text></g>
</svg>`;

  const svgAmort = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#f8fafc"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#0f172a">Lịch trả nợ (amortization) — khoản vay 240.000.000đ, 12 tháng, lãi suất 12%/năm</text>
<g font-size="12">
<rect x="24" y="46" width="672" height="28" fill="#0f172a"/>
<text x="34" y="65" fill="#fff" font-weight="800">Kỳ</text><text x="120" y="65" fill="#fff" font-weight="800">Gốc kỳ</text><text x="280" y="65" fill="#fff" font-weight="800">Lãi kỳ</text><text x="420" y="65" fill="#fff" font-weight="800">Tổng trả</text><text x="560" y="65" fill="#fff" font-weight="800">Dư nợ còn lại</text>
<g fill="#334155" font-weight="600">
<rect x="24" y="74" width="672" height="24" fill="#eef2f7"/><text x="34" y="90">1</text><text x="120" y="90">18.947.000</text><text x="280" y="90">2.400.000</text><text x="420" y="90">21.347.000</text><text x="560" y="90">221.053.000</text>
<text x="34" y="114">2</text><text x="120" y="114">19.136.000</text><text x="280" y="114">2.211.000</text><text x="420" y="114">21.347.000</text><text x="560" y="114">201.917.000</text>
<rect x="24" y="122" width="672" height="24" fill="#eef2f7"/><text x="34" y="138">…</text><text x="120" y="138">…</text><text x="280" y="138">…</text><text x="420" y="138">…</text><text x="560" y="138">…</text>
<text x="34" y="162">12</text><text x="120" y="162">20.912.000</text><text x="280" y="162">209.000</text><text x="420" y="162">21.121.000</text><text x="560" y="162">0</text>
</g></g>
<rect x="24" y="186" width="672" height="30" rx="6" fill="#dcfce7"/><text x="40" y="206" font-size="13" font-weight="800" fill="#166534">Bất biến: SUM(gốc kỳ) = gốc hợp đồng (240.000.000đ) · dư nợ kỳ cuối = 0 · mỗi kỳ: gốc + lãi = tổng trả.</text>
<text x="24" y="240" font-size="12.5" fill="#475569">Nếu khách trả trước hạn (prepayment): lịch phải tính lại lãi trên dư nợ mới, không được thu thừa lãi của các kỳ chưa phát sinh.</text>
<text x="24" y="264" font-size="12.5" fill="#7c3aed" font-weight="700">Test tài chính phải assert TOÀN BỘ lịch trả bằng công thức amortization, không chỉ kiểm tra số tiền kỳ đầu.</text>
</svg>`;

  const svgMatrix = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Ma trận ca kiểm thử · Loan origination test matrix (trích)</text>
<g font-size="11.5">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="34" y="63" fill="#fff" font-weight="800">Nhóm</text><text x="150" y="63" fill="#fff" font-weight="800">Điều kiện</text><text x="440" y="63" fill="#fff" font-weight="800">Kết quả mong đợi</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="24" fill="#ede9fe"/><text x="34" y="88" fill="#16a34a">Happy</text><text x="150" y="88">Điểm tín dụng ≥ 650 · DTI ≤ 40%</text><text x="440" y="88">APPROVED → giải ngân đúng số tiền hợp đồng</text>
<text x="34" y="112" fill="#d97706">Boundary</text><text x="150" y="112">Điểm tín dụng = 650 (ngưỡng)</text><text x="440" y="112">APPROVED (ngưỡng thuộc miền chấp nhận)</text>
<rect x="24" y="120" width="672" height="24" fill="#ede9fe"/><text x="34" y="136" fill="#dc2626">Negative</text><text x="150" y="136">Điểm tín dụng &lt; 500</text><text x="440" y="136">REJECTED tự động · không vào workflow phê duyệt</text>
<text x="34" y="160" fill="#dc2626">Negative</text><text x="150" y="160">DTI &gt; 50%</text><text x="440" y="160">REJECTED · lý do "vượt tỉ lệ nợ/thu nhập"</text>
<rect x="24" y="168" width="672" height="24" fill="#ede9fe"/><text x="34" y="184" fill="#2563eb">Failure</text><text x="150" y="184">CIC bureau timeout</text><text x="440" y="184">PENDING_RETRY → không được tự APPROVED khi thiếu dữ liệu</text>
<text x="34" y="208" fill="#2563eb">Failure</text><text x="150" y="208">Cấp phê duyệt 2 từ chối sau khi cấp 1 duyệt</text><text x="440" y="208">REJECTED cuối cùng · không giải ngân dù cấp 1 đã OK</text>
<rect x="24" y="216" width="672" height="24" fill="#ede9fe"/><text x="34" y="232" fill="#7c3aed">Idempotency</text><text x="150" y="232">Gọi lệnh giải ngân 2 lần cùng loanId</text><text x="440" y="232">Chỉ 1 lần chuyển tiền · không giải ngân trùng</text>
<text x="34" y="256" fill="#7c3aed">Idempotency</text><text x="150" y="256">Retry request giải ngân do timeout mạng</text><text x="440" y="256">Idempotency-Key chặn giao dịch thứ 2</text>
<rect x="24" y="264" width="672" height="24" fill="#ede9fe"/><text x="34" y="280" fill="#0891b2">Consistency</text><text x="150" y="280">Sau giải ngân, kiểm tra lịch trả nợ</text><text x="440" y="280">SUM(gốc từng kỳ) = gốc hợp đồng · không lệch 1 đồng</text>
<text x="34" y="304" fill="#0891b2">State</text><text x="150" y="304">Truy vấn trạng thái khoản vay bất kỳ lúc nào</text><text x="440" y="304">Đúng 1 trong: DRAFT/SCORING/PENDING_APPROVAL/APPROVED/REJECTED/DISBURSED/CLOSED</text>
</g></g>
<text x="24" y="326" font-size="12" fill="#6d28d9" font-weight="700">Mỗi HÀNG → tối thiểu một ca tự động. Nhóm Idempotency/Consistency là nơi phân biệt QA giỏi trong domain ngân hàng.</text>
</svg>`;

  const pages = [
    {
      heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. ビジネス背景と範囲" },
      blocks: [
        P(
          "Bạn là QA Lead tại VietCredit Bank, phụ trách mảng cho vay tiêu dùng và vay tín chấp cá nhân, phục vụ khoảng 800.000 khách hàng vay đang hoạt động với dư nợ trung bình 45 triệu đồng/khoản vay. Mỗi ngày hệ thống tiếp nhận khoảng 6.000 hồ sơ vay mới, trong đó khoảng 35% được phê duyệt và giải ngân trong vòng 48 giờ theo cam kết SLA với khách hàng. Sản phẩm trọng yếu quý này là tái thiết kế luồng khởi tạo khoản vay (loan origination) để rút ngắn thời gian thẩm định từ 3 ngày xuống còn 1 ngày làm việc, đồng thời bổ sung chấm điểm tín dụng tự động qua Trung tâm Thông tin Tín dụng Quốc gia (CIC).",
          "You are the QA Lead at VietCredit Bank, responsible for consumer and unsecured personal lending, serving about 800,000 active borrowers with an average outstanding balance of 45 million VND per loan. Each day the system receives roughly 6,000 new loan applications, of which about 35% are approved and disbursed within a 48-hour SLA commitment to customers. This quarter's key initiative is redesigning the loan origination flow to cut underwriting time from 3 days to 1 business day, while adding automated credit scoring via the National Credit Information Center (CIC).",
          "あなたはVietCredit銀行のQAリードとして、個人向け消費者ローンと信用貸付を担当しており、平均残高4,500万ドンの融資を抱える約80万人のアクティブな借り手にサービスを提供しています。毎日約6,000件の新規融資申込がシステムに届き、そのうち約35%が承認され、顧客とのSLA約束に従って48時間以内に融資が実行されます。今四半期の重要な取り組みは、融資審査時間を3営業日から1営業日に短縮するためにローン組成(loan origination)フローを再設計し、同時に国家信用情報センター(CIC)経由の自動信用スコアリングを追加することです。"
        ),
        P(
          "Yêu cầu từ Ban Quản lý Rủi ro (Risk Management) và Bộ phận Tuân thủ đặt ra ràng buộc nghiêm ngặt: mọi khoản vay trên 100 triệu đồng phải qua phê duyệt tối thiểu 2 cấp (chuyên viên tín dụng và trưởng phòng rủi ro), khoản vay trên 500 triệu phải có thêm cấp giám đốc rủi ro khu vực. Ngân hàng Nhà nước yêu cầu báo cáo chính xác tổng dư nợ giải ngân hàng ngày, khớp tuyệt đối với hợp đồng đã ký và lịch trả nợ đã đăng ký. Vì đây là luồng 'chạm tiền thật' ở quy mô lớn, một lỗi giải ngân trùng lặp (double disbursement) có thể gây thiệt hại hàng trăm triệu đồng chỉ trong một ngày vận hành, nên chiến lược kiểm thử phải đặt trọng tâm vào tính đúng đắn tài chính hơn là giao diện.",
          "Requirements from Risk Management and Compliance impose strict constraints: any loan above 100 million VND must pass at least 2 approval levels (credit officer and risk manager), and loans above 500 million VND require an additional regional risk director level. The central bank requires accurate daily reporting of total disbursed outstanding balance, matching exactly signed contracts and registered repayment schedules. Because this is a large-scale 'real-money' flow, a duplicate disbursement bug could cause hundreds of millions of VND in losses within a single operating day, so the test strategy must prioritize financial correctness over UI correctness.",
          "リスク管理部門とコンプライアンス部門からの要求は厳格な制約を課しています。1億ドンを超える融資は最低2段階の承認(与信担当者とリスク部門長)を経なければならず、5億ドンを超える融資には地域リスク担当役員の承認段階がさらに必要です。中央銀行は、署名済み契約と登録済み返済スケジュールに正確に一致する、日次の融資実行残高合計の正確な報告を求めています。これは大規模な「実際のお金が動く」フローであるため、二重融資実行のバグは1営業日だけで数億ドンの損失を引き起こす可能性があり、テスト戦略はUIの正しさよりも財務的な正確性を最優先にしなければなりません。"
        ),
        H("Phạm vi tự động hoá của tài liệu này", "Scope of automation in this document", "本ドキュメントの自動化範囲"),
        UL(
          [
            "Luồng khởi tạo khoản vay đầu-cuối: nộp hồ sơ → thẩm định điều kiện → chấm điểm tín dụng CIC → phê duyệt nhiều cấp → ký hợp đồng → giải ngân → sinh lịch trả nợ.",
            "Các ca lỗi tài chính: idempotency giải ngân, từ chối giữa chừng ở cấp phê duyệt cao hơn, timeout khi gọi CIC, vượt hạn mức cho vay theo hồ sơ khách hàng.",
            "Nghiệp vụ hậu kiểm: đối soát tổng giải ngân trong ngày với sổ cái Core Banking, kiểm tra tính cân bằng của mọi lịch trả nợ đã sinh.",
            "Đưa toàn bộ vào CI/CD chạy trên mỗi pull request, kèm giám sát tỉ lệ phê duyệt và thời gian xử lý trung bình.",
            "Tích hợp AI Agent để soạn ca kiểm thử biên và điều tra log lỗi phê duyệt — có ranh giới rõ giữa việc AI được làm và việc con người phải giữ.",
          ],
          [
            "The end-to-end loan origination flow: application submission → eligibility check → CIC credit scoring → multi-level approval → contract signing → disbursement → repayment schedule generation.",
            "Financial failure cases: disbursement idempotency, mid-flow rejection at a higher approval level, CIC call timeout, lending limit breaches based on customer profile.",
            "Post-processing operations: reconciling total daily disbursement against the Core Banking ledger, verifying balance correctness of every generated repayment schedule.",
            "Wiring everything into CI/CD on every pull request, with monitoring of approval rate and average processing time.",
            "AI-agent integration to draft edge-case tests and investigate approval failure logs — with a clear boundary between what AI may do and what humans must retain.",
          ],
          [
            "エンドツーエンドのローン組成フロー: 申込提出 → 適格性チェック → CIC信用スコアリング → 複数段階承認 → 契約締結 → 融資実行 → 返済スケジュール生成。",
            "財務的な失敗ケース: 融資実行の冪等性、上位承認段階での途中拒否、CIC呼び出しのタイムアウト、顧客プロファイルに基づく貸付限度超過。",
            "事後処理業務: 日次の融資実行合計をコアバンキング台帳と突合し、生成されたすべての返済スケジュールの残高の正しさを検証する。",
            "すべてをCI/CDに組み込み、プルリクエストごとに実行し、承認率と平均処理時間を監視する。",
            "境界ケースのテスト作成と承認失敗ログの調査を高速化するAIエージェントの統合 — AIが行ってよい範囲と人間が保持すべき範囲を明確に分ける。",
          ]
        ),
        NOTE(
          "Bài này thuộc LOẠI 'Thực chiến doanh nghiệp' (thucchien) — giải một bài toán THẬT end-to-end trên domain ngân hàng, đối chiếu độ sâu với bài mẫu flagship trong hệ thống.",
          "This article belongs to the 'Enterprise real-world' kind (thucchien) — solving a REAL end-to-end problem in the banking domain, matched in depth against the system's flagship sample.",
          "この記事は「実戦」種別(thucchien)に属します — 銀行ドメインにおける実際のエンドツーエンド問題を解決し、システムのフラッグシップサンプルと同等の深さで構成されています。"
        ),
      ],
    },
    {
      heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
      blocks: [
        P(
          "Trước khi thiết kế ca kiểm thử, QA phải nắm được luồng khởi tạo khoản vay đi qua những thành phần nào và đâu là ranh giới đồng bộ/bất đồng bộ, vì chính ranh giới này quyết định cách chờ kết quả và cách mock trong test.",
          "Before designing test cases, QA must understand which components the loan origination flow traverses and where the sync/async boundary lies, since that boundary determines how to wait for results and how to mock in tests.",
          "テストケースを設計する前に、QAはローン組成フローがどのコンポーネントを通過するか、そして同期/非同期の境界がどこにあるかを把握しなければなりません。この境界こそが、結果の待ち方とテストにおけるモックの方法を決定づけるからです。"
        ),
        IMG(
          svgArch,
          "Kiến trúc luồng khởi tạo & giải ngân khoản vay, phân tách phần đồng bộ và phê duyệt bất đồng bộ.",
          "Loan origination & disbursement flow architecture, separating the synchronous part from asynchronous approval.",
          "融資組成・実行フローのアーキテクチャ。同期部分と非同期承認部分を分離しています。"
        ),
        P(
          "Phần đồng bộ diễn ra ngay khi khách hàng gửi hồ sơ: Loan Origination Service kiểm tra hồ sơ đủ điều kiện (đủ tuổi, chưa có nợ xấu nhóm 3 trở lên), sau đó gọi Credit Scoring Engine nội bộ kết hợp dữ liệu từ CIC Bureau — một hệ thống bên thứ ba nằm ngoài tầm kiểm soát của ngân hàng. Việc gọi CIC có thể mất từ 2 đến 15 giây tuỳ tải hệ thống của họ, và đôi khi timeout hoàn toàn, nên đây là điểm đầu tiên cần mock ổn định trong môi trường test.",
          "The synchronous part happens the moment the customer submits the application: the Loan Origination Service checks eligibility (age, no bad debt classified group 3+), then calls the internal Credit Scoring Engine combined with data from the CIC Bureau — a third party outside the bank's control. Calling CIC can take 2 to 15 seconds depending on their system load, and sometimes times out entirely, making it the first point requiring stable mocking in the test environment.",
          "同期部分は、顧客が申込を提出した瞬間に発生します。ローン組成サービスが適格性(年齢、グループ3以上の不良債権がないこと)を確認し、その後CIC局— 銀行の管理外にある第三者システム — のデータと組み合わせた社内信用スコアリングエンジンを呼び出します。CICの呼び出しは、先方のシステム負荷によって2秒から15秒かかることがあり、時には完全にタイムアウトすることもあるため、テスト環境で安定したモックが必要な最初のポイントとなります。"
        ),
        P(
          "Phần bất đồng bộ và phức tạp nhất là workflow phê duyệt nhiều cấp: hồ sơ dưới 100 triệu chỉ cần chuyên viên tín dụng duyệt, từ 100-500 triệu cần thêm trưởng phòng rủi ro, trên 500 triệu cần thêm giám đốc rủi ro khu vực. Mỗi cấp có thể APPROVE, REJECT, hoặc REQUEST_MORE_INFO (yêu cầu bổ sung giấy tờ, đưa hồ sơ về trạng thái chờ khách hàng). Toàn bộ workflow này có thể kéo dài từ vài phút đến vài ngày làm việc, và một hồ sơ bị REJECT ở cấp cao hơn phải huỷ mọi tác vụ chờ ở các cấp thấp hơn — đây là nguồn bug phổ biến nếu không xử lý race condition đúng.",
          "The most complex and asynchronous part is the multi-level approval workflow: applications under 100 million only need credit officer approval, 100-500 million require an additional risk manager, above 500 million require an additional regional risk director. Each level can APPROVE, REJECT, or REQUEST_MORE_INFO (requesting additional documents, returning the application to a customer-pending state). This entire workflow can span from minutes to several business days, and an application REJECTED at a higher level must cancel any pending tasks at lower levels — a common source of bugs if race conditions aren't handled correctly.",
          "最も複雑で非同期的な部分は複数段階の承認ワークフローです。1億ドン未満の申込は与信担当者の承認のみが必要で、1億〜5億ドンはリスク部門長の承認が追加で必要、5億ドン超は地域リスク担当役員の承認がさらに必要になります。各段階はAPPROVE(承認)、REJECT(拒否)、REQUEST_MORE_INFO(書類追加要求、顧客待ち状態に戻す)のいずれかを行うことができます。このワークフロー全体は数分から数営業日に及ぶことがあり、上位段階でREJECTされた申込は下位段階の保留中タスクをすべてキャンセルしなければなりません — レースコンディションを正しく処理しないと、これはよくあるバグの原因になります。"
        ),
        TIP(
          "Vẽ máy trạng thái (state machine) của khoản vay TRƯỚC khi viết test: DRAFT → SCORING → PENDING_APPROVAL → APPROVED/REJECTED → DISBURSED → CLOSED. Mỗi cạnh chuyển tiếp là một ca cần phủ, và mọi trạng thái phải có đường thoát — không được có trạng thái 'kẹt' vô thời hạn.",
          "Draw the loan's state machine BEFORE writing tests: DRAFT → SCORING → PENDING_APPROVAL → APPROVED/REJECTED → DISBURSED → CLOSED. Every transition edge is a case to cover, and every state must have an exit path — no state should be 'stuck' indefinitely.",
          "テストを書く前に融資の状態遷移図(state machine)を描いてください: DRAFT → SCORING → PENDING_APPROVAL → APPROVED/REJECTED → DISBURSED → CLOSED。すべての遷移エッジはカバーすべきケースであり、すべての状態には出口経路が必要です — どの状態も無期限に「詰まった」状態であってはなりません。"
        ),
      ],
    },
    {
      heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ", en: "3. Data model & business invariants", ja: "3. データモデルと業務不変条件" },
      blocks: [
        P(
          "Mô hình dữ liệu cốt lõi gồm 3 thực thể chính: LoanApplication (hồ sơ vay, gắn với trạng thái state machine), ApprovalDecision (mỗi bản ghi ứng với 1 quyết định ở 1 cấp phê duyệt, có approverId, level, decision, timestamp), và RepaymentSchedule (danh sách các kỳ trả nợ với gốc, lãi, tổng trả, dư nợ còn lại). Hiểu đúng mô hình này là điều kiện tiên quyết để định nghĩa oracle — kết quả kỳ vọng chính xác — thay vì chỉ kiểm tra thông báo hiển thị trên màn hình.",
          "The core data model has 3 main entities: LoanApplication (the loan record, tied to the state machine), ApprovalDecision (each record corresponds to one decision at one approval level, with approverId, level, decision, timestamp), and RepaymentSchedule (the list of repayment periods with principal, interest, total payment, remaining balance). Correctly understanding this model is a prerequisite for defining the oracle — the precise expected result — rather than merely checking an on-screen message.",
          "コアデータモデルには3つの主要エンティティがあります。LoanApplication(状態遷移機に紐づく融資申込記録)、ApprovalDecision(各レコードは1つの承認段階における1つの決定に対応し、approverId、level、decision、timestampを持つ)、RepaymentSchedule(元金、利息、合計返済額、残高を持つ返済期間のリスト)です。このモデルを正しく理解することは、画面上のメッセージを確認するだけでなく、正確な期待結果である「オラクル」を定義するための前提条件です。"
        ),
        IMG(
          svgAmort,
          "Lịch trả nợ (amortization) cho khoản vay 240 triệu đồng, kỳ hạn 12 tháng, lãi suất 12%/năm.",
          "Amortization schedule for a 240-million-VND loan, 12-month term, 12%/year interest rate.",
          "融資額2億4千万ドン、12ヶ月期間、年利12%の元利均等返済スケジュール。"
        ),
        H("Bốn bất biến phải đúng ở MỌI thời điểm", "Four invariants that must hold at ALL times", "常に成り立つべき4つの不変条件"),
        UL(
          [
            "Bảo toàn gốc: tổng số tiền đã giải ngân cho một khoản vay LUÔN bằng đúng số gốc ghi trong hợp đồng đã ký — không thừa, không thiếu.",
            "Cân bằng lịch trả: SUM(gốc từng kỳ trong lịch trả nợ) = gốc hợp đồng, và dư nợ ở kỳ cuối cùng phải bằng đúng 0.",
            "Idempotency giải ngân: cùng một loanId và cùng một idempotency-key dù gọi lệnh giải ngân bao nhiêu lần cũng chỉ tạo ĐÚNG MỘT giao dịch chuyển tiền.",
            "Trạng thái khoản vay hợp lệ duy nhất: mỗi khoản vay tại mọi thời điểm chỉ ở đúng một trạng thái trong tập hợp lệ, không tồn tại trạng thái mâu thuẫn (ví dụ vừa REJECTED vừa DISBURSED).",
          ],
          [
            "Principal conservation: total disbursed amount for a loan ALWAYS equals exactly the principal recorded in the signed contract — no more, no less.",
            "Schedule balance: SUM(principal per period in the repayment schedule) = contract principal, and the remaining balance at the final period must equal exactly 0.",
            "Disbursement idempotency: the same loanId with the same idempotency-key, no matter how many times the disbursement command is called, creates EXACTLY ONE money transfer transaction.",
            "Single valid loan state: at any point in time, a loan is in exactly one state from the valid set, with no contradictory state existing (e.g. both REJECTED and DISBURSED).",
          ],
          [
            "元金の保全: 融資の総実行額は、署名済み契約に記録された元金と常に正確に一致します — 過不足はありません。",
            "スケジュールの均衡: 返済スケジュールの各期の元金合計 = 契約元金であり、最終期の残高は正確に0でなければなりません。",
            "融資実行の冪等性: 同じloanIdと同じidempotency-keyであれば、融資実行コマンドを何回呼び出しても、作成される送金取引は正確に1件のみです。",
            "単一の有効な融資状態: どの時点でも、融資は有効な状態集合の中のただ1つの状態にあり、矛盾する状態(例えばREJECTEDとDISBURSEDが同時に存在する等)は存在しません。",
          ]
        ),
        WARN(
          "Đừng bao giờ assert 'màn hình hiện Đã giải ngân thành công'. Hãy assert: tổng tiền đã chuyển trong Core Banking = gốc hợp đồng, số dòng lịch trả nợ đúng số kỳ, và trạng thái khoản vay chuyển đúng sang DISBURSED chỉ một lần duy nhất.",
          "Never assert 'screen shows Disbursement successful'. Assert instead: total money transferred in Core Banking = contract principal, repayment schedule row count matches the term, and the loan state transitions to DISBURSED exactly once.",
          "「画面に融資実行成功と表示される」ことをアサートしてはいけません。代わりに、コアバンキングでの送金合計額が契約元金と一致すること、返済スケジュールの行数が期間数と一致すること、融資状態がDISBURSEDへちょうど一度だけ遷移することをアサートしてください。"
        ),
      ],
    },
    {
      heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
      blocks: [
        P(
          "Rủi ro cao nhất trong luồng này không nằm ở giao diện nộp hồ sơ, mà nằm ở ba điểm: (1) giải ngân trùng lặp do retry mạng hoặc double-click, (2) phê duyệt không nhất quán khi nhiều cấp xử lý song song, và (3) lịch trả nợ tính sai do làm tròn số học lãi suất. Đội QA xếp hạng rủi ro theo ma trận xác suất × mức độ ảnh hưởng, trong đó nhóm giải ngân trùng lặp được xếp mức 'Nghiêm trọng' vì xác suất trung bình (do lỗi mạng khá phổ biến) nhân với ảnh hưởng cực cao (mất tiền thật, khó thu hồi).",
          "The highest risk in this flow is not the application submission UI, but three points: (1) duplicate disbursement from network retries or double-clicks, (2) inconsistent approval when multiple levels process in parallel, and (3) incorrectly computed repayment schedules due to interest rounding errors. The QA team ranks risk using a probability × impact matrix, where duplicate disbursement is ranked 'Critical' because medium probability (network glitches are fairly common) multiplied by extremely high impact (real money lost, hard to recover).",
          "このフローにおける最大のリスクは、申込提出画面ではなく、次の3つのポイントにあります。(1)ネットワーク再試行やダブルクリックによる二重融資実行、(2)複数段階が並行処理された際の承認の不整合、(3)利息の丸め誤差による返済スケジュールの計算ミスです。QAチームは確率×影響度のマトリクスでリスクを格付けし、二重融資実行は「重大」に格付けされます。これは中程度の確率(ネットワーク障害はかなり一般的)に極めて高い影響(実際のお金が失われ、回収が困難)を掛け合わせた結果です。"
        ),
        H("Kim tự tháp kiểm thử áp dụng cho luồng vay", "Test pyramid applied to the lending flow", "融資フローに適用するテストピラミッド"),
        UL(
          [
            "Unit test (~55%): công thức tính lãi/gốc từng kỳ, hàm kiểm tra điều kiện đủ hồ sơ, hàm sinh idempotency-key.",
            "Integration/API test (~35%): luồng gọi CIC (mock), workflow phê duyệt nhiều cấp, lệnh giải ngân gọi Core Banking (mock/sandbox).",
            "E2E test (~10%): kịch bản đầy đủ từ nộp hồ sơ tới nhận tiền trên môi trường staging gần giống production.",
          ],
          [
            "Unit tests (~55%): per-period interest/principal formulas, eligibility check functions, idempotency-key generation functions.",
            "Integration/API tests (~35%): CIC call flow (mocked), multi-level approval workflow, disbursement command calling Core Banking (mock/sandbox).",
            "E2E tests (~10%): full scenario from application submission to receiving funds on a staging environment close to production.",
          ],
          [
            "ユニットテスト(約55%): 各期の利息・元金計算式、適格性チェック関数、冪等性キー生成関数。",
            "統合・APIテスト(約35%): CIC呼び出しフロー(モック)、複数段階承認ワークフロー、コアバンキングを呼び出す融資実行コマンド(モック/サンドボックス)。",
            "E2Eテスト(約10%): ステージング環境での申込提出から入金までの完全なシナリオ。",
          ]
        ),
        P(
          "Chiến lược kiểm thử được chia thành 3 giai đoạn song song: giai đoạn 1 tập trung vào tính đúng đắn của công thức tài chính (unit test cho amortization, đối chiếu với bảng tính Excel chuẩn của phòng tài chính); giai đoạn 2 tập trung vào luồng nghiệp vụ phê duyệt (integration test với mock CIC và mock cấp phê duyệt); giai đoạn 3 tập trung vào tính bền vững khi có lỗi mạng, timeout, và tải cao (chaos testing nhẹ kết hợp idempotency test). Ba giai đoạn này chạy song song bởi 3 nhóm nhỏ trong đội QA gồm 6 người, mỗi nhóm 2 người, với review chéo hàng tuần.",
          "The test strategy is split into 3 parallel phases: phase 1 focuses on financial formula correctness (unit tests for amortization, cross-checked against the finance department's reference Excel sheet); phase 2 focuses on the approval business flow (integration tests with mocked CIC and mocked approval levels); phase 3 focuses on resilience under network errors, timeouts, and high load (light chaos testing combined with idempotency testing). These three phases run in parallel across 3 sub-teams within a 6-person QA team, 2 people per sub-team, with weekly cross-review.",
          "テスト戦略は3つの並行フェーズに分けられます。フェーズ1は財務計算式の正確性(元利均等返済のユニットテスト、財務部門の基準となるExcelシートとの照合)、フェーズ2は承認業務フロー(モックCICとモック承認段階を用いた統合テスト)、フェーズ3はネットワークエラー、タイムアウト、高負荷時の堅牢性(冪等性テストと組み合わせた軽度のカオステスト)に焦点を当てます。これら3つのフェーズは、6人のQAチーム内の3つのサブチーム(各2人)で並行して実行され、毎週相互レビューが行われます。"
        ),
      ],
    },
    {
      heading: { vi: "5. Test Plan (entry/exit, môi trường, dữ liệu)", en: "5. Test Plan (entry/exit, environment, data)", ja: "5. テスト計画（開始・終了基準、環境、データ）" },
      blocks: [
        P(
          "Test Plan cho luồng khởi tạo khoản vay quy định rõ Entry Criteria: API contract của Credit Scoring Engine và CIC Adapter đã được thống nhất và mock sẵn sàng, dữ liệu seed cho ít nhất 20 hồ sơ mẫu ở các mức điểm tín dụng khác nhau đã có trong môi trường staging. Exit Criteria yêu cầu: 100% ca P0 (idempotency, bảo toàn gốc, cân bằng lịch trả) PASS, độ phủ luồng nghiệp vụ chính đạt tối thiểu 90%, và không còn bug mức Critical/Blocker mở trong tracker.",
          "The Test Plan for the loan origination flow specifies clear Entry Criteria: the Credit Scoring Engine and CIC Adapter API contracts are agreed upon and mocks are ready, seed data for at least 20 sample applications across different credit score levels exists in staging. Exit Criteria requires: 100% of P0 cases (idempotency, principal conservation, schedule balance) PASS, main business flow coverage reaches at least 90%, and no open Critical/Blocker bugs remain in the tracker.",
          "融資組成フローのテスト計画は、明確な開始基準(エントリークライテリア)を規定しています。信用スコアリングエンジンとCICアダプターのAPI契約が合意され、モックの準備が整っていること、様々な信用スコアレベルにわたる最低20件のサンプル申込のシードデータがステージング環境に存在することです。終了基準は、P0ケース(冪等性、元金保全、スケジュール均衡)の100%合格、主要業務フローのカバレッジ最低90%達成、トラッカーにCritical/Blockerレベルの未解決バグがないことを要求します。"
        ),
        H("Môi trường & vai trò", "Environment & roles", "環境と役割分担"),
        UL(
          [
            "Môi trường staging riêng cho luồng vay, có Core Banking sandbox tách biệt khỏi production để tránh ảnh hưởng số dư thật.",
            "CIC Bureau được thay bằng mock server trả về điểm tín dụng có kiểm soát (deterministic) theo customerId để test lặp lại được.",
            "Vai trò: 2 QA Automation viết test API/integration, 1 QA Manual kiểm thử khám phá (exploratory) cho luồng phê duyệt, 1 DevOps hỗ trợ hạ tầng CI.",
            "Chỉ số theo dõi: tỉ lệ ca pass/fail theo build, thời gian chạy toàn bộ suite, số lượng flaky test phát hiện mỗi tuần.",
          ],
          [
            "A dedicated staging environment for the lending flow, with a Core Banking sandbox separated from production to avoid affecting real balances.",
            "CIC Bureau is replaced by a mock server returning deterministic credit scores by customerId so tests are repeatable.",
            "Roles: 2 QA Automation engineers write API/integration tests, 1 Manual QA does exploratory testing on the approval flow, 1 DevOps supports CI infrastructure.",
            "Tracked metrics: pass/fail rate per build, total suite run time, number of flaky tests found each week.",
          ],
          [
            "融資フロー専用のステージング環境で、実際の残高への影響を避けるため本番環境から分離されたコアバンキングサンドボックスを使用します。",
            "CIC局はモックサーバーに置き換えられ、テストが再現可能になるようcustomerIdごとに決定論的な信用スコアを返します。",
            "役割分担: QA自動化担当2名がAPI・統合テストを作成し、マニュアルQA1名が承認フローの探索的テストを行い、DevOps1名がCI基盤を支援します。",
            "追跡指標: ビルドごとの合格・不合格率、スイート全体の実行時間、毎週検出されるフレークテストの件数。",
          ]
        ),
        NOTE(
          "Dữ liệu test phải bao phủ đủ 3 mức phê duyệt (dưới 100tr, 100-500tr, trên 500tr) và ít nhất 5 điểm tín dụng khác nhau quanh các ngưỡng quyết định (500, 650, 750) để phủ boundary.",
          "Test data must cover all 3 approval tiers (under 100M, 100-500M, above 500M) and at least 5 different credit scores around decision thresholds (500, 650, 750) to cover boundaries.",
          "テストデータは3つの承認レベル(1億未満、1億〜5億、5億超)すべてと、判定基準値(500、650、750)周辺の少なくとも5つの異なる信用スコアをカバーし、境界値を網羅する必要があります。"
        ),
      ],
    },
    {
      heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
      blocks: [
        P(
          "Ma trận thiết kế ca áp dụng cả ba kỹ thuật kinh điển: equivalence partitioning cho các nhóm điểm tín dụng (dưới 500, 500-649, 650-749, từ 750), boundary value analysis cho các ngưỡng số tiền vay (99.999.999 / 100.000.000 / 100.000.001, tương tự với 500 triệu), và decision table cho tổ hợp điều kiện phê duyệt nhiều cấp. Cách tiếp cận này giúp giảm số lượng ca cần viết nhưng vẫn đảm bảo phủ các điểm dễ sinh lỗi nhất.",
          "The test case design matrix applies all three classic techniques: equivalence partitioning for credit score groups (below 500, 500-649, 650-749, 750+), boundary value analysis for loan amount thresholds (99,999,999 / 100,000,000 / 100,000,001, similarly for 500 million), and decision tables for multi-level approval condition combinations. This approach reduces the number of cases needed while still ensuring coverage of the most error-prone points.",
          "テストケース設計マトリクスは3つの古典的手法をすべて適用します。信用スコアグループ(500未満、500〜649、650〜749、750以上)の同値分割、融資額のしきい値(99,999,999／100,000,000／100,000,001、5億についても同様)の境界値分析、複数段階承認の条件組み合わせのデシジョンテーブルです。このアプローチにより、必要なケース数を減らしながらも、最もエラーが発生しやすいポイントのカバレッジを確保できます。"
        ),
        IMG(
          svgMatrix,
          "Ma trận thiết kế ca kiểm thử cho luồng khởi tạo khoản vay, trích các nhóm happy/boundary/negative/idempotency.",
          "Test case design matrix for the loan origination flow, showing happy/boundary/negative/idempotency groups.",
          "融資組成フローのテストケース設計マトリクス。ハッピーパス・境界値・ネガティブ・冪等性のグループを抜粋。"
        ),
        TIP(
          "Đặt tên ca theo mẫu 'given_khi_thì' để review nhanh: ví dụ 'given_creditScore649_when_submit_then_rejected', giúp cả QA và dev đọc hiểu ngay mục đích ca mà không cần mở code.",
          "Name cases using a 'given_when_then' pattern for fast review: e.g. 'given_creditScore649_when_submit_then_rejected', letting both QA and devs instantly understand the case's purpose without opening the code.",
          "レビューを迅速にするため「given_when_then」パターンでケース名を付けてください。例えば'given_creditScore649_when_submit_then_rejected'とすることで、QAも開発者もコードを開かずにケースの目的を即座に理解できます。"
        ),
      ],
    },
    {
      heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
      blocks: [
        P(
          "Để test chạy ổn định và lặp lại được, đội QA xây dựng một bộ API test-only chỉ mở trong môi trường staging: POST /test/seed/customer để tạo khách hàng với hồ sơ tín dụng định sẵn, POST /test/mock/cic để cấu hình điểm tín dụng trả về cho một customerId cụ thể, và POST /test/reset để xoá sạch dữ liệu vay của một khách hàng trước mỗi lần chạy test. Các API này được bảo vệ bằng token riêng và tự động vô hiệu hoá nếu biến môi trường ENV khác 'staging', tránh rủi ro bị lạm dụng trên production.",
          "For tests to run stably and repeatably, the QA team builds a test-only API suite exposed only in staging: POST /test/seed/customer to create a customer with a predefined credit profile, POST /test/mock/cic to configure the credit score returned for a specific customerId, and POST /test/reset to wipe a customer's loan data before each test run. These APIs are protected by a dedicated token and auto-disabled if the ENV variable differs from 'staging', preventing abuse risk on production.",
          "テストが安定して再現可能に実行されるよう、QAチームはステージング環境でのみ公開されるテスト専用APIスイートを構築します。POST /test/seed/customerで事前定義された信用プロファイルを持つ顧客を作成し、POST /test/mock/cicで特定のcustomerIdに対して返される信用スコアを設定し、POST /test/resetで各テスト実行前に顧客の融資データを消去します。これらのAPIは専用トークンで保護されており、ENV変数が'staging'と異なる場合は自動的に無効化され、本番環境での悪用リスクを防ぎます。"
        ),
        CODE(
          "bash",
          `# Seed một khách hàng có hồ sơ tín dụng tốt, dùng cho happy path
curl -X POST https://staging.vietcredit.local/test/seed/customer \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerId": "CUS-LOAN-0001",
    "monthlyIncome": 25000000,
    "existingDebtRatio": 0.15,
    "badDebtGroup": 1
  }'

# Cấu hình mock CIC trả điểm tín dụng 720 cho khách hàng này
curl -X POST https://staging.vietcredit.local/test/mock/cic \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "customerId": "CUS-LOAN-0001", "creditScore": 720, "latencyMs": 800 }'

# Reset toàn bộ hồ sơ vay của khách hàng trước mỗi lần chạy test
curl -X POST https://staging.vietcredit.local/test/reset \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "customerId": "CUS-LOAN-0001" }'`
        ),
        WARN(
          "Không bao giờ để API test-only tồn tại ở môi trường production, kể cả khi bị vô hiệu hoá bằng feature flag — hãy loại bỏ hoàn toàn khỏi build production bằng compile-time flag để tránh rủi ro bảo mật nghiêm trọng.",
          "Never let test-only APIs exist in production, even if disabled via feature flag — strip them entirely from the production build using a compile-time flag to avoid a serious security risk.",
          "テスト専用APIを、フィーチャーフラグで無効化されている場合でも、本番環境に存在させてはいけません — 深刻なセキュリティリスクを避けるため、コンパイル時フラグを使って本番ビルドから完全に除去してください。"
        ),
      ],
    },
    {
      heading: { vi: "8. Automation happy path (POM/fixtures)", en: "8. Happy-path automation (POM/fixtures)", ja: "8. ハッピーパスの自動化（POM／フィクスチャ）" },
      blocks: [
        P(
          "Với luồng nộp hồ sơ có giao diện web, đội QA áp dụng Page Object Model (POM) để tách logic thao tác UI khỏi logic assertion, giúp test dễ bảo trì khi giao diện thay đổi. Fixture chuẩn bị sẵn một khách hàng có hồ sơ tín dụng tốt (điểm 720, tỉ lệ nợ/thu nhập 15%) trước khi test chạy, và dọn dẹp dữ liệu sau khi test kết thúc để không ảnh hưởng lần chạy tiếp theo.",
          "For the application submission flow with a web UI, the QA team applies the Page Object Model (POM) to separate UI interaction logic from assertion logic, making tests easier to maintain when the UI changes. A fixture prepares a customer with a good credit profile (score 720, debt-to-income 15%) before the test runs, and cleans up data afterward so it doesn't affect the next run.",
          "Web UIを持つ申込提出フローでは、QAチームはページオブジェクトモデル(POM)を適用し、UI操作ロジックとアサーションロジックを分離することで、UIが変更された際のテスト保守性を高めます。フィクスチャは、テスト実行前に良好な信用プロファイル(スコア720、負債収入比15%)を持つ顧客を準備し、テスト終了後にデータをクリーンアップして次回の実行に影響しないようにします。"
        ),
        CODE(
          "typescript",
          `// pages/loan-application.page.ts — Page Object cho form nộp hồ sơ vay
import { Page, expect } from "@playwright/test";

export class LoanApplicationPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/loans/apply");
  }

  async fillApplication(input: { amount: number; termMonths: number; purpose: string }) {
    await this.page.getByLabel("Số tiền vay").fill(String(input.amount));
    await this.page.getByLabel("Kỳ hạn (tháng)").selectOption(String(input.termMonths));
    await this.page.getByLabel("Mục đích vay").fill(input.purpose);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Nộp hồ sơ" }).click();
  }

  async expectStatus(status: string) {
    await expect(this.page.getByTestId("loan-status")).toHaveText(status, { timeout: 15000 });
  }
}`
        ),
        CODE(
          "typescript",
          `// tests/loan-origination.happy.spec.ts — Happy path: nộp hồ sơ -> phê duyệt -> giải ngân
import { test, expect } from "@playwright/test";
import { LoanApplicationPage } from "../pages/loan-application.page";
import { seedCustomer, mockCic, approveAtLevel, getLoanBalance } from "../fixtures/loan-fixtures";

test.beforeEach(async () => {
  await seedCustomer("CUS-LOAN-0001", { monthlyIncome: 25_000_000, existingDebtRatio: 0.15 });
  await mockCic("CUS-LOAN-0001", { creditScore: 720, latencyMs: 800 });
});

test("hồ sơ 80 triệu, điểm 720 -> phê duyệt 1 cấp -> giải ngân đúng gốc hợp đồng", async ({ page, request }) => {
  const loanPage = new LoanApplicationPage(page);
  await loanPage.open();
  await loanPage.fillApplication({ amount: 80_000_000, termMonths: 12, purpose: "Mua sắm gia dụng" });
  await loanPage.submit();

  await loanPage.expectStatus("PENDING_APPROVAL");
  const loanId = await page.getByTestId("loan-id").innerText();

  // Chỉ cần 1 cấp phê duyệt vì < 100 triệu
  await approveAtLevel(loanId, "CREDIT_OFFICER");
  await loanPage.expectStatus("DISBURSED");

  // Oracle: tổng tiền giải ngân trong Core Banking phải khớp CHÍNH XÁC gốc hợp đồng
  const disbursed = await getLoanBalance(loanId);
  expect(disbursed.totalDisbursed).toBe(80_000_000);
  expect(disbursed.scheduleCount).toBe(12);
  const sumPrincipal = disbursed.schedule.reduce((s: number, r: any) => s + r.principal, 0);
  expect(sumPrincipal).toBe(80_000_000);
});`
        ),
      ],
    },
    {
      heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 深掘りした異常系ケース" },
      blocks: [
        P(
          "Đây là chương giá trị nhất của tài liệu: các ca lỗi mà nếu bỏ sót sẽ gây thiệt hại tài chính thật. Ba nhóm trọng tâm là idempotency giải ngân, từ chối giữa chừng khi đã có cấp phê duyệt trước đó đồng ý, và vượt hạn mức cho vay theo hồ sơ thu nhập khách hàng.",
          "This is the most valuable chapter in the document: the failure cases that, if missed, cause real financial damage. The three focus areas are disbursement idempotency, mid-flow rejection when a prior approval level already agreed, and lending limit breaches based on the customer's income profile.",
          "これはドキュメントの中で最も価値のある章です。見落とすと実際の財務的損害を引き起こす異常系ケースを扱います。3つの重点分野は、融資実行の冪等性、以前の承認段階が既に同意していた場合の途中拒否、そして顧客の収入プロファイルに基づく貸付限度超過です。"
        ),
        CODE(
          "typescript",
          `// tests/loan-origination.idempotency.spec.ts — chống giải ngân trùng
test("gọi lệnh giải ngân 2 lần cùng idempotency-key -> chỉ 1 giao dịch chuyển tiền", async ({ request }) => {
  const loanId = await createApprovedLoan({ amount: 150_000_000 });
  const idemKey = "disb-" + loanId;

  const [r1, r2] = await Promise.all([
    request.post(\`/api/loans/\${loanId}/disburse\`, { headers: { "Idempotency-Key": idemKey } }),
    request.post(\`/api/loans/\${loanId}/disburse\`, { headers: { "Idempotency-Key": idemKey } }),
  ]);

  expect([r1.status(), r2.status()].sort()).toEqual([200, 200]); // hoặc 200/409 tuỳ thiết kế API
  const ledger = await getCoreLedgerEntries(loanId);
  // Oracle: chỉ đúng MỘT bút toán giải ngân, không phải hai
  const disbursementEntries = ledger.filter((e: any) => e.type === "DISBURSEMENT");
  expect(disbursementEntries.length).toBe(1);
  expect(disbursementEntries[0].amount).toBe(150_000_000);
});`
        ),
        CODE(
          "typescript",
          `// tests/loan-origination.rejection.spec.ts — từ chối ở cấp cao hơn phải huỷ toàn bộ, không giải ngân
test("cấp 1 duyệt nhưng cấp 2 từ chối -> trạng thái cuối REJECTED, không có bút toán giải ngân", async () => {
  const loanId = await submitLoan({ amount: 300_000_000, creditScore: 680 }); // 100-500tr -> cần 2 cấp
  await approveAtLevel(loanId, "CREDIT_OFFICER");
  await rejectAtLevel(loanId, "RISK_MANAGER", "Thu nhập không ổn định 6 tháng gần nhất");

  const loan = await getLoanState(loanId);
  expect(loan.status).toBe("REJECTED");

  const ledger = await getCoreLedgerEntries(loanId);
  expect(ledger.filter((e: any) => e.type === "DISBURSEMENT").length).toBe(0);

  // Không còn tác vụ phê duyệt nào đang chờ (đã huỷ khi bị reject)
  const pendingTasks = await getPendingApprovalTasks(loanId);
  expect(pendingTasks.length).toBe(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/loan-origination.limit.spec.ts — vượt hạn mức theo thu nhập
test("số tiền vay > 10x thu nhập tháng -> từ chối tự động, không vào workflow phê duyệt", async () => {
  await seedCustomer("CUS-LOAN-LOW", { monthlyIncome: 8_000_000, existingDebtRatio: 0.1 });
  await mockCic("CUS-LOAN-LOW", { creditScore: 700 });

  const res = await submitLoanApi({ customerId: "CUS-LOAN-LOW", amount: 200_000_000, termMonths: 24 });

  expect(res.status).toBe("REJECTED");
  expect(res.rejectReason).toBe("EXCEEDS_INCOME_MULTIPLE_LIMIT");
  // Oracle: hồ sơ không được đẩy vào hàng đợi phê duyệt vì đã bị chặn ở bước eligibility
  const tasks = await getPendingApprovalTasks(res.loanId);
  expect(tasks.length).toBe(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/loan-origination.cic-timeout.spec.ts — CIC timeout không được tự động APPROVED
test("CIC bureau timeout -> hồ sơ chuyển PENDING_RETRY, tuyệt đối không tự APPROVED", async () => {
  await mockCic("CUS-LOAN-0002", { timeoutMs: 20_000 }); // giả lập timeout, SLA gọi CIC là 15s

  const res = await submitLoanApi({ customerId: "CUS-LOAN-0002", amount: 90_000_000, termMonths: 12 });

  expect(res.status).toBe("PENDING_RETRY");
  expect(res.status).not.toBe("APPROVED");
  expect(res.status).not.toBe("DISBURSED");
});`
        ),
        SCEN(
          "Kịch bản: nhân viên vận hành double-click nút giải ngân trên hệ thống nội bộ",
          "Scenario: an operations staff double-clicks the disbursement button on the internal system",
          "Kịch bản: nhân viên vận hành mất kết nối mạng 3 giây rồi hệ thống tự động retry request giải ngân — QA phải đảm bảo Idempotency-Key được gắn ở tầng client trước khi gửi, không sinh mới ở mỗi lần retry.",
          "Scenario: an operations staff member loses network connectivity for 3 seconds and the system auto-retries the disbursement request — QA must ensure the Idempotency-Key is attached at the client layer before sending, not regenerated on each retry.",
          "シナリオ: 内部システムで運用担当者が実行ボタンをダブルクリックした場合",
          "シナリオ: 運用担当者が3秒間ネットワーク接続を失い、システムが融資実行リクエストを自動的に再試行します — QAは、Idempotency-Keyが送信前にクライアント層で付与され、再試行のたびに新しく生成されないことを確認しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "10. Nghiệp vụ nền/hậu kiểm", en: "10. Background/post-processing operations", ja: "10. バックグラウンド業務・事後検証" },
      blocks: [
        P(
          "Sau giờ giao dịch mỗi ngày, job đối soát (reconciliation batch) chạy lúc 23h00 để so khớp tổng số tiền đã giải ngân ghi nhận trong Loan Origination Service với sổ cái Core Banking. Nếu có bất kỳ khoản chênh lệch nào, dù chỉ 1.000 đồng, hệ thống phải tự động gắn cờ 'DISCREPANCY' và gửi cảnh báo tới đội vận hành thay vì âm thầm bỏ qua. Đây là lớp phòng thủ cuối cùng bắt được những lỗi mà test tự động có thể đã bỏ sót.",
          "After each day's trading hours, a reconciliation batch job runs at 23:00 to match the total disbursed amount recorded in the Loan Origination Service against the Core Banking ledger. If there is any discrepancy, even 1,000 VND, the system must automatically flag it as 'DISCREPANCY' and alert the operations team rather than silently ignoring it. This is the last line of defense catching bugs that automated tests may have missed.",
          "毎日の取引時間後、突合(リコンサイル)バッチジョブが23時に実行され、ローン組成サービスに記録された融資実行総額をコアバンキング台帳と照合します。たとえ1,000ドンでも差異があれば、システムは自動的に「DISCREPANCY(不一致)」のフラグを立て、黙って無視するのではなく運用チームに警告を送らなければなりません。これは、自動テストが見逃したかもしれないバグを捕捉する最後の防衛線です。"
        ),
        CODE(
          "sql",
          `-- Truy vấn kiểm tra bất biến: SUM(gốc từng kỳ) phải bằng gốc hợp đồng cho MỌI khoản vay đã giải ngân
SELECT
  l.loan_id,
  l.principal_amount AS contract_principal,
  SUM(rs.principal) AS schedule_principal_sum,
  (l.principal_amount - SUM(rs.principal)) AS diff
FROM loans l
JOIN repayment_schedule rs ON rs.loan_id = l.loan_id
WHERE l.status = 'DISBURSED'
GROUP BY l.loan_id, l.principal_amount
HAVING (l.principal_amount - SUM(rs.principal)) <> 0;
-- Bất biến: kết quả trả về PHẢI RỖNG. Có dòng nào xuất hiện nghĩa là lịch trả bị lệch gốc.`
        ),
        CODE(
          "typescript",
          `// tests/reconciliation.batch.spec.ts — test job đối soát cuối ngày
test("job đối soát phát hiện lệch giữa Loan Service và Core Banking, gắn cờ DISCREPANCY", async () => {
  // Cố tình seed một khoản vay có bút toán Core Banking bị thiếu 1 giao dịch (giả lập lỗi hạ tầng)
  const loanId = await createDisbursedLoanWithLedgerGap({ amount: 120_000_000, missingAmount: 5_000_000 });

  const report = await runReconciliationBatch({ date: "2026-07-06" });

  const flagged = report.discrepancies.find((d: any) => d.loanId === loanId);
  expect(flagged).toBeDefined();
  expect(flagged.diffAmount).toBe(5_000_000);
  expect(flagged.status).toBe("DISCREPANCY");
});`
        ),
        NOTE(
          "Test đối soát nên cố tình 'tiêm' lệch dữ liệu (inject mismatch) để xác nhận cơ chế phát hiện HOẠT ĐỘNG, chứ không chỉ test trường hợp mọi thứ khớp hoàn hảo.",
          "Reconciliation tests should intentionally inject a mismatch to confirm the detection mechanism WORKS, not just test the case where everything matches perfectly.",
          "突合テストは、検出メカニズムが実際に機能することを確認するために、意図的に不一致を注入すべきです。すべてが完璧に一致するケースだけをテストするのではありません。"
        ),
      ],
    },
    {
      heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
      blocks: [
        P(
          "Toàn bộ bộ test được chạy tự động trên mỗi pull request thông qua GitHub Actions, chia thành 4 shard chạy song song để rút ngắn thời gian phản hồi từ 22 phút xuống còn khoảng 6 phút. Pipeline có gate bắt buộc: nếu bất kỳ ca P0 (idempotency, bảo toàn gốc) fail, merge bị chặn hoàn toàn bất kể ca khác pass bao nhiêu, thể hiện đúng triết lý 'tiền không đùa được'.",
          "The full test suite runs automatically on every pull request via GitHub Actions, split into 4 parallel shards to cut feedback time from 22 minutes down to about 6 minutes. The pipeline has a mandatory gate: if any P0 case (idempotency, principal conservation) fails, merging is completely blocked regardless of how many other cases pass, reflecting the philosophy that 'money is not something to joke with'.",
          "テストスイート全体は、GitHub Actions経由ですべてのプルリクエストで自動的に実行され、フィードバック時間を22分から約6分に短縮するために4つのシャードに分割して並行実行されます。パイプラインには必須のゲートがあります。P0ケース(冪等性、元金保全)が1つでも失敗すれば、他のケースがいくつ合格していてもマージは完全にブロックされます。これは「お金は冗談で済まされない」という哲学を反映しています。"
        ),
        CODE(
          "yaml",
          `# .github/workflows/loan-origination-tests.yml
name: loan-origination-tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Run shard \${{ matrix.shard }}/4
        run: npx playwright test --shard=\${{ matrix.shard }}/4
        env:
          TEST_ONLY_TOKEN: \${{ secrets.TEST_ONLY_TOKEN }}
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with: { name: playwright-report-\${{ matrix.shard }}, path: playwright-report/ }

  gate-p0:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Kiểm tra ca P0 (idempotency, bảo toàn gốc) phải PASS 100%
        run: node scripts/check-p0-gate.js --tag=P0 --require=100`
        ),
        TIP(
          "Theo dõi chỉ số 'thời gian phê duyệt trung bình' và 'tỉ lệ flaky test theo tuần' trên dashboard Grafana; nếu flaky rate vượt 3%, ưu tiên sửa ngay trước khi thêm test mới, vì flaky làm xói mòn niềm tin vào gate CI.",
          "Track 'average approval time' and 'weekly flaky test rate' metrics on a Grafana dashboard; if the flaky rate exceeds 3%, prioritize fixing it before adding new tests, since flakiness erodes trust in the CI gate.",
          "Grafanaダッシュボードで「平均承認時間」と「週次フレークテスト率」の指標を追跡してください。フレーク率が3%を超えた場合、新しいテストを追加する前に修正を優先してください。フレーキーさはCIゲートへの信頼を損なうためです。"
        ),
      ],
    },
    {
      heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
      blocks: [
        P(
          "Đội QA tích hợp một AI Agent nội bộ để tăng tốc hai việc: soạn thảo ca kiểm thử biên dựa trên decision table đã định nghĩa, và tóm tắt log lỗi khi một hồ sơ vay bị kẹt bất thường ở một cấp phê duyệt quá lâu. AI Agent được cấp quyền đọc log và mã nguồn test hiện có, nhưng KHÔNG có quyền tự động merge code hay gọi trực tiếp API giải ngân trên môi trường thật.",
          "The QA team integrates an internal AI Agent to speed up two tasks: drafting boundary test cases based on the defined decision table, and summarizing error logs when a loan application gets abnormally stuck at an approval level for too long. The AI Agent has read access to logs and existing test source code, but does NOT have permission to auto-merge code or directly call the disbursement API on a real environment.",
          "QAチームは、2つの作業を高速化するために社内AIエージェントを統合しています。定義済みのデシジョンテーブルに基づく境界値テストケースの草案作成と、融資申込が承認段階で異常に長時間滞留した際のエラーログの要約です。AIエージェントはログと既存のテストソースコードへの読み取りアクセス権を持ちますが、コードの自動マージや実環境での融資実行APIの直接呼び出しの権限は持ちません。"
        ),
        H("Ranh giới trách nhiệm AI làm / người giữ", "AI-does / human-keeps responsibility boundary", "AIが行う範囲・人間が保持する範囲の境界"),
        UL(
          [
            "AI được làm: gợi ý thêm ca biên còn thiếu dựa trên decision table, tóm tắt chuỗi log dài thành nguyên nhân nghi vấn, sinh bản nháp test data đa dạng.",
            "Người phải giữ: quyết định cuối cùng oracle/bất biến nghiệp vụ đúng hay sai, phê duyệt merge test mới vào suite chính, xác nhận kết quả điều tra trước khi báo cáo cho compliance.",
            "Mọi gợi ý của AI Agent về ca kiểm thử phải được một QA senior review và bổ sung assertion theo bất biến trước khi đưa vào CI, không chấp nhận merge thẳng.",
          ],
          [
            "AI may do: suggest missing edge cases based on the decision table, summarize long log chains into suspected root causes, draft diverse test data variations.",
            "Humans must keep: the final call on whether an oracle/business invariant is correct, approving merges of new tests into the main suite, confirming investigation results before reporting to compliance.",
            "Every AI Agent suggestion for test cases must be reviewed by a senior QA and augmented with invariant-based assertions before entering CI — direct merges are not accepted.",
          ],
          [
            "AIが行ってよいこと: デシジョンテーブルに基づく不足している境界ケースの提案、長いログチェーンを疑わしい根本原因に要約すること、多様なテストデータ案の作成。",
            "人間が保持すべきこと: オラクル・業務不変条件が正しいかどうかの最終判断、メインスイートへの新規テストのマージ承認、コンプライアンスへの報告前の調査結果の確認。",
            "AIエージェントによるテストケースの提案はすべて、CIに組み込む前にシニアQAがレビューし、不変条件に基づくアサーションを追加しなければなりません — 直接マージは認められません。",
          ]
        ),
        WARN(
          "Không bao giờ để AI Agent tự sinh và tự chạy test trực tiếp trên môi trường có kết nối tới Core Banking thật, kể cả trong pipeline CI — luôn cách ly qua sandbox/mock đã được kiểm soát.",
          "Never let an AI Agent auto-generate and auto-run tests directly against an environment connected to real Core Banking, even inside a CI pipeline — always isolate through a controlled sandbox/mock.",
          "AIエージェントが実際のコアバンキングに接続された環境で、CIパイプライン内であっても、テストを自動生成して直接実行することを絶対に許可してはいけません — 常に制御されたサンドボックス／モックを通じて隔離してください。"
        ),
      ],
    },
    {
      heading: { vi: "13. Góc phỏng vấn", en: "13. Interview corner", ja: "13. 面接コーナー" },
      blocks: [
        QA(
          "Tại sao không nên assert 'màn hình hiện Giải ngân thành công' mà phải assert theo bất biến nghiệp vụ?",
          "Why shouldn't you assert 'screen shows Disbursement successful' instead of asserting on business invariants?",
          "Vì thông báo trên màn hình có thể hiển thị đúng ngay cả khi backend đã tạo 2 giao dịch chuyển tiền do lỗi retry — asserting theo bất biến (tổng tiền chuyển = gốc hợp đồng, chỉ 1 bút toán giải ngân) mới thực sự bắt được lỗi tài chính nghiêm trọng ẩn phía sau một UI trông có vẻ ổn.",
          "Because the on-screen message can display correctly even when the backend has created 2 money-transfer transactions due to a retry bug — asserting on invariants (total transferred = contract principal, exactly one disbursement entry) is what actually catches serious financial bugs hidden behind a UI that looks fine.",
          "「画面に融資実行成功と表示される」ではなく、業務不変条件でアサートすべきなのはなぜですか？",
          "画面上のメッセージは、再試行バグによってバックエンドが2件の送金取引を作成していても正しく表示され得るからです。不変条件(送金合計=契約元金、融資実行の記帳はちょうど1件)でアサートすることこそが、一見問題なさそうなUIの裏に隠れた深刻な財務バグを実際に捕捉する方法です。"
        ),
        QA(
          "Nếu cấp phê duyệt 1 đã APPROVE nhưng cấp 2 REJECT, hệ thống cần xử lý những gì để không rò rỉ trạng thái không nhất quán?",
          "If approval level 1 already APPROVEd but level 2 REJECTs, what does the system need to handle to avoid leaking an inconsistent state?",
          "Hệ thống phải: chuyển trạng thái khoản vay cuối cùng về REJECTED (không giữ lại dấu vết APPROVED một phần dễ gây hiểu nhầm), huỷ mọi tác vụ phê duyệt đang chờ ở các cấp khác, và đảm bảo không có bút toán giải ngân nào được tạo ra trong toàn bộ quá trình — cần một transaction/saga đảm bảo tính nguyên tử giữa các bước.",
          "The system must: transition the loan's final state to REJECTED (not retain a partially-APPROVED trace that could mislead), cancel any pending approval tasks at other levels, and ensure no disbursement entry is created throughout the process — this requires a transaction/saga guaranteeing atomicity across the steps.",
          "承認段階1がAPPROVEしたが段階2がREJECTした場合、システムは不整合な状態が漏れないようにするために何を処理する必要がありますか？",
          "システムは、融資の最終状態をREJECTEDに遷移させ(誤解を招く可能性のある部分的なAPPROVEDの痕跡を残さない)、他の段階の保留中の承認タスクをすべてキャンセルし、プロセス全体を通じて融資実行の記帳が一切作成されないようにする必要があります — これにはステップ間の原子性を保証するトランザクション/サーガが必要です。"
        ),
        QA(
          "Bạn sẽ test idempotency của lệnh giải ngân như thế nào nếu API không hỗ trợ header Idempotency-Key?",
          "How would you test disbursement idempotency if the API doesn't support an Idempotency-Key header?",
          "Trước tiên tôi sẽ nêu vấn đề với đội phát triển vì đây là thiết kế rủi ro cao cho một API 'chạm tiền'. Trong lúc chờ bổ sung, tôi sẽ test bằng cách gửi đồng thời (concurrent) nhiều request giải ngân cùng loanId và assert rằng chỉ có đúng 1 giao dịch được tạo ở tầng Core Banking — đồng thời đề xuất thêm ràng buộc UNIQUE constraint ở tầng database trên cặp (loanId, type=DISBURSEMENT) như một lớp phòng thủ cuối.",
          "First I'd flag this with the dev team since it's a high-risk design for a 'money-touching' API. While waiting for a fix, I'd test by sending concurrent disbursement requests with the same loanId and assert exactly 1 transaction is created at the Core Banking layer — and I'd also propose adding a UNIQUE constraint at the database layer on the (loanId, type=DISBURSEMENT) pair as a last line of defense.",
          "APIがIdempotency-Keyヘッダーをサポートしていない場合、融資実行の冪等性をどのようにテストしますか？",
          "まず、これは「お金に触れる」APIにとってリスクの高い設計であるため、開発チームに問題を提起します。修正を待つ間、同じloanIdで複数の融資実行リクエストを同時に送信し、コアバンキング層でちょうど1件のトランザクションのみが作成されることをアサートしてテストします — また、最後の防衛線として(loanId, type=DISBURSEMENT)のペアにデータベース層でUNIQUE制約を追加することも提案します。"
        ),
        SCEN(
          "Phỏng vấn mock: Interviewer hỏi 'Bạn phát hiện một bug production là hồ sơ vay bị treo ở PENDING_APPROVAL suốt 10 ngày dù cả 2 cấp đã duyệt. Bạn điều tra thế nào?'",
          "Mock interview: the interviewer asks 'You found a production bug where a loan is stuck at PENDING_APPROVAL for 10 days even though both levels approved. How would you investigate?'",
          "Trả lời mẫu: Đầu tiên tôi kiểm tra log của event consumer xử lý sự kiện 'cả 2 cấp đã duyệt' — có thể event bị mất hoặc consumer bị lỗi không commit offset. Tiếp theo tôi kiểm tra bảng ApprovalDecision xem có đủ 2 bản ghi APPROVE chưa, so với điều kiện chuyển trạng thái trong code. Cuối cùng tôi viết một test tái hiện chính xác thứ tự sự kiện đã xảy ra trong production để xác nhận giả thuyết trước khi đề xuất fix, tránh sửa mò.",
          "Sample answer: First I check the logs of the event consumer processing the 'both levels approved' event — the event might have been lost, or the consumer failed to commit its offset. Next I check the ApprovalDecision table to see if both APPROVE records exist, comparing against the state-transition condition in code. Finally I write a test that reproduces the exact event order that occurred in production to confirm the hypothesis before proposing a fix, avoiding guesswork.",
          "モック面接: 面接官が「両方の承認段階が承認済みなのに、融資申込が10日間PENDING_APPROVALのまま止まっている本番バグを発見しました。どう調査しますか？」と質問します。",
          "回答例: まず「両段階承認済み」イベントを処理するイベントコンシューマーのログを確認します — イベントが失われたか、コンシューマーがオフセットのコミットに失敗した可能性があります。次に、ApprovalDecisionテーブルに2件のAPPROVEレコードが揃っているかを、コード内の状態遷移条件と照らし合わせて確認します。最後に、本番で発生した正確なイベント順序を再現するテストを書いて仮説を確認してから修正を提案し、当てずっぽうの修正を避けます。"
        ),
      ],
    },
    {
      heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
      blocks: [
        P(
          "Qua bài này, đội QA đã xây dựng một chiến lược kiểm thử toàn diện cho luồng khởi tạo và giải ngân khoản vay, đặt trọng tâm vào các bất biến tài chính thay vì chỉ kiểm tra giao diện. Điểm mấu chốt là: mọi ca kiểm thử giá trị cao đều xoay quanh câu hỏi 'điều gì PHẢI luôn đúng về tiền và trạng thái', không phải 'màn hình hiển thị gì'.",
          "Through this article, the QA team built a comprehensive test strategy for the loan origination and disbursement flow, prioritizing financial invariants over merely checking the UI. The key takeaway: every high-value test case revolves around the question 'what must ALWAYS be true about money and state', not 'what does the screen display'.",
          "この記事を通じて、QAチームは融資組成・実行フローに対する包括的なテスト戦略を構築し、UIの確認だけでなく財務的な不変条件を優先しました。重要なポイントは、価値の高いすべてのテストケースが「お金と状態について常に真でなければならないことは何か」という問いを中心にしており、「画面に何が表示されるか」ではないということです。"
        ),
        H("Checklist bàn giao trước khi lên production", "Handover checklist before going to production", "本番リリース前の引き継ぎチェックリスト"),
        UL(
          [
            "Toàn bộ ca P0 (idempotency, bảo toàn gốc, cân bằng lịch trả, trạng thái hợp lệ) PASS 100% trên CI.",
            "Job đối soát cuối ngày đã được test với ca cố tình tiêm lệch dữ liệu và xác nhận cảnh báo hoạt động đúng.",
            "Mock CIC và API test-only đã được xác nhận KHÔNG tồn tại trong build production.",
            "Dashboard giám sát tỉ lệ phê duyệt, thời gian xử lý, và flaky rate đã được đội vận hành xác nhận truy cập được.",
            "Tài liệu ranh giới trách nhiệm AI Agent đã được review và ký duyệt bởi trưởng nhóm QA và đại diện compliance.",
          ],
          [
            "All P0 cases (idempotency, principal conservation, schedule balance, valid state) PASS 100% in CI.",
            "The end-of-day reconciliation job has been tested with an intentionally injected mismatch case and alerting confirmed to work correctly.",
            "The mocked CIC and test-only APIs have been confirmed to NOT exist in the production build.",
            "The monitoring dashboard for approval rate, processing time, and flaky rate has been confirmed accessible by the operations team.",
            "The AI Agent responsibility-boundary document has been reviewed and signed off by the QA lead and a compliance representative.",
          ],
          [
            "すべてのP0ケース(冪等性、元金保全、スケジュール均衡、有効な状態)がCIで100%合格していること。",
            "日次突合ジョブが意図的に注入した不一致ケースでテストされ、警告が正しく機能することが確認されていること。",
            "モックCICとテスト専用APIが本番ビルドに存在しないことが確認されていること。",
            "承認率、処理時間、フレーク率の監視ダッシュボードが運用チームによってアクセス可能であることが確認されていること。",
            "AIエージェントの責任境界に関する文書が、QAリードとコンプライアンス担当者によってレビュー・承認されていること。",
          ]
        ),
        TIP(
          "Trước khi ký duyệt bàn giao, hãy tự hỏi: 'Nếu hệ thống này chạy sai trong 1 giờ mà không ai biết, thiệt hại lớn nhất có thể xảy ra là gì?' — câu trả lời chính là ca kiểm thử quan trọng nhất cần đảm bảo đã có mặt trong suite.",
          "Before signing off on handover, ask yourself: 'If this system ran incorrectly for 1 hour without anyone noticing, what's the worst possible damage?' — the answer is exactly the most important test case that must be present in the suite.",
          "引き継ぎの承認前に自問してください。「このシステムが誰にも気づかれずに1時間誤動作した場合、起こりうる最悪の損害は何か？」— その答えこそが、スイートに存在することを保証すべき最も重要なテストケースです。"
        ),
      ],
    },
  ];

  return {
    categorySlug: "enterprise-realworld",
    slug: "banking-loan-origination-disbursement",
    cover: thumb,
    tags: tags("thucchien", "banking", "api", "playwright", "cicd", "realworld"),
    title: {
      vi: "Thực chiến ngân hàng: khởi tạo khoản vay, thẩm định tín dụng & giải ngân end-to-end",
      en: "Banking real-world: loan origination, credit scoring & end-to-end disbursement",
      ja: "銀行実戦: ローン組成・信用スコアリング・エンドツーエンド融資実行",
    },
    summary: {
      vi: "Bài toán thực chiến ngân hàng: khởi tạo khoản vay, chấm điểm tín dụng CIC, phê duyệt nhiều cấp, giải ngân và lịch trả nợ — kiểm thử theo bất biến tài chính (bảo toàn gốc, idempotency, cân bằng lịch trả).",
      en: "A real-world banking problem: loan origination, CIC credit scoring, multi-level approval, disbursement and repayment schedule — tested against financial invariants (principal conservation, idempotency, schedule balance).",
      ja: "銀行の実戦課題: ローン組成、CIC信用スコアリング、複数段階承認、融資実行と返済スケジュール — 財務的不変条件(元金保全、冪等性、スケジュール均衡)に基づくテスト。",
    },
    pages: buildDoc(pages),
  };
}
const art1 = buildArt1();

// ============================================================================
// BÀI 2/4 — banking-card-auth-settlement-chargeback
// ============================================================================
function buildArt2() {
  const thumb = makeThumb({ id: "tc01art2", domain: "banking", kind: "thucchien", label: "実戦 · CARD AUTH & CHARGEBACK" });

  const svgArch2 = `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="380" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc cấp phép - quyết toán - tranh chấp thẻ · Card auth-settlement-dispute architecture</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="24" y="54" width="110" height="46" rx="9" fill="#1e293b"/><text x="79" y="74" fill="#93c5fd">POS/App</text><text x="79" y="90" fill="#64748b" font-size="9.5">quẹt thẻ/thanh toán</text>
<rect x="166" y="54" width="120" height="46" rx="9" fill="#1e293b"/><text x="226" y="74" fill="#93c5fd">Card Gateway</text><text x="226" y="90" fill="#64748b" font-size="9.5">route theo BIN</text>
<rect x="318" y="30" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="377" y="54" fill="#fcd34d">Card Scheme (Visa/MC)</text>
<rect x="318" y="86" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="377" y="110" fill="#fcd34d">Issuer Core (hold/capture)</text>
<rect x="468" y="54" width="118" height="46" rx="9" fill="#1e3a2f"/><text x="527" y="74" fill="#86efac">Settlement Batch</text><text x="527" y="90" fill="#64748b" font-size="9.5">T+1/T+2 quyết toán</text>
<rect x="618" y="54" width="82" height="46" rx="9" fill="#1e293b"/><text x="659" y="74" fill="#c4b5fd">Dispute/Chargeback</text><text x="659" y="90" fill="#64748b" font-size="9.5">tranh chấp</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M134 77 H166" marker-end="url(#ca)"/><path d="M286 68 C300 68 300 50 318 50" marker-end="url(#ca)"/><path d="M286 86 C300 86 300 106 318 106" marker-end="url(#ca)"/><path d="M436 50 C452 50 452 68 468 68" marker-end="url(#ca)"/><path d="M586 77 H618" marker-end="url(#ca)"/></g>
<defs><marker id="ca" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<rect x="24" y="150" width="672" height="70" rx="10" fill="#111c30"/>
<text x="40" y="174" font-size="12.5" fill="#93c5fd" font-weight="700">Đồng bộ: cấp phép (authorization) tức thời, tiền bị "giữ" (hold), chưa thực trừ. Bất đồng bộ: quyết toán (settlement/capture) theo batch T+1/T+2, tranh chấp có thể đến sau vài chục ngày.</text>
<text x="40" y="196" font-size="12.5" fill="#64748b">Sync: instant authorization, funds are held, not yet debited. Async: settlement/capture via T+1/T+2 batch, disputes can arrive weeks later.</text>
<rect x="24" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="40" y="260" font-size="12.5" font-weight="800" fill="#5eead4">Điểm khó kiểm thử · Hard-to-test</text>
<g font-size="11.5" fill="#cbd5e1"><text x="40" y="282">• Hold khác Capture — dễ nhầm 2 khái niệm</text><text x="40" y="302">• Capture một phần (partial capture)</text><text x="40" y="322">• Chargeback đến rất trễ sau settlement</text><text x="40" y="342">• Đối soát với tổ chức thẻ theo file batch</text></g>
<rect x="370" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="386" y="260" font-size="12.5" font-weight="800" fill="#fca5a5">Chiến lược · Strategy</text>
<g font-size="11.5" fill="#cbd5e1"><text x="386" y="282">• Mock card scheme trả về response code chuẩn</text><text x="386" y="302">• Test riêng hold, capture, void, refund</text><text x="386" y="322">• Assert bút toán ghi kép ở mọi bước</text><text x="386" y="342">• Test đối soát cố tình gây lệch dữ liệu</text></g>
</svg>`;

  const svgLedger2 = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#f8fafc"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#0f172a">Sổ cái ghi kép cho 1 giao dịch thẻ 2.000.000đ: hold -&gt; capture một phần -&gt; hoàn tiền</text>
<g font-size="12">
<rect x="24" y="46" width="672" height="28" fill="#0f172a"/>
<text x="34" y="65" fill="#fff" font-weight="800">Bước</text><text x="230" y="65" fill="#fff" font-weight="800">Nợ (Debit)</text><text x="400" y="65" fill="#fff" font-weight="800">Có (Credit)</text><text x="560" y="65" fill="#fff" font-weight="800">Trạng thái hold</text>
<g fill="#334155" font-weight="600">
<rect x="24" y="74" width="672" height="24" fill="#eef2f7"/><text x="34" y="90">1. Authorization (hold)</text><text x="230" y="90">—</text><text x="400" y="90">—</text><text x="560" y="90">HOLD 2.000.000</text>
<text x="34" y="114">2. Capture một phần (merchant giao 1 phần hàng)</text><text x="230" y="114">1.500.000</text><text x="400" y="114">—</text><text x="560" y="114">HOLD còn 500.000</text>
<rect x="24" y="122" width="672" height="24" fill="#eef2f7"/><text x="34" y="138">3. Void phần hold còn lại</text><text x="230" y="138">—</text><text x="400" y="138">—</text><text x="560" y="138">HOLD = 0 (giải phóng)</text>
<text x="34" y="162">4. Refund (khách trả hàng)</text><text x="230" y="162">—</text><text x="400" y="162">1.500.000</text><text x="560" y="162">—</text>
</g></g>
<rect x="24" y="186" width="672" height="30" rx="6" fill="#dcfce7"/><text x="40" y="206" font-size="13" font-weight="800" fill="#166534">Bất biến: capture &le; hold ban đầu · hold &le; hạn mức khả dụng của thẻ · sum(Debit) = sum(Credit) sau mọi bước.</text>
<text x="24" y="240" font-size="12.5" fill="#475569">Nếu merchant cố capture 2.500.000 (vượt hold 2.000.000) -> hệ thống PHẢI từ chối phần vượt, không được tự động "nới" hold.</text>
<text x="24" y="264" font-size="12.5" fill="#7c3aed" font-weight="700">Test thẻ phải luôn kiểm tra quan hệ 3 tầng: hold &ge; capture &ge; refund đã hoàn, không chỉ kiểm tra thông báo giao dịch.</text>
</svg>`;

  const svgMatrix2 = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Ma trận ca kiểm thử · Card auth/settlement/chargeback test matrix (trích)</text>
<g font-size="11.5">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="34" y="63" fill="#fff" font-weight="800">Nhóm</text><text x="150" y="63" fill="#fff" font-weight="800">Điều kiện</text><text x="440" y="63" fill="#fff" font-weight="800">Kết quả mong đợi</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="24" fill="#ede9fe"/><text x="34" y="88" fill="#16a34a">Happy</text><text x="150" y="88">Hold 2tr, capture đúng 2tr trong 7 ngày</text><text x="440" y="88">SETTLED · bút toán khớp hold</text>
<text x="34" y="112" fill="#d97706">Boundary</text><text x="150" y="112">Capture đúng bằng hold (không hơn không kém)</text><text x="440" y="112">SETTLED · hold giải phóng hoàn toàn</text>
<rect x="24" y="120" width="672" height="24" fill="#ede9fe"/><text x="34" y="136" fill="#dc2626">Negative</text><text x="150" y="136">Capture &gt; hold ban đầu</text><text x="440" y="136">Từ chối phần vượt · không "nới" hold</text>
<text x="34" y="160" fill="#dc2626">Negative</text><text x="150" y="160">Hold &gt; hạn mức khả dụng của thẻ</text><text x="440" y="160">DECLINED · lý do INSUFFICIENT_LIMIT</text>
<rect x="24" y="168" width="672" height="24" fill="#ede9fe"/><text x="34" y="184" fill="#2563eb">Failure</text><text x="150" y="184">Hold quá 7 ngày không capture (auth expired)</text><text x="440" y="184">Auto-void · giải phóng hold về hạn mức</text>
<text x="34" y="208" fill="#2563eb">Failure</text><text x="150" y="208">Card scheme timeout khi gửi capture</text><text x="440" y="208">Retry có kiểm soát · không double capture</text>
<rect x="24" y="216" width="672" height="24" fill="#ede9fe"/><text x="34" y="232" fill="#7c3aed">Idempotency</text><text x="150" y="232">Gửi lại capture cùng transactionId do timeout</text><text x="440" y="232">Chỉ 1 lần capture · không trừ tiền 2 lần</text>
<text x="34" y="256" fill="#7c3aed">Chargeback</text><text x="150" y="256">Khách tranh chấp giao dịch đã SETTLED 40 ngày trước</text><text x="440" y="256">Tạo bút toán tạm ứng hoàn tiền · mở case điều tra</text>
<rect x="24" y="264" width="672" height="24" fill="#ede9fe"/><text x="34" y="280" fill="#0891b2">Recon</text><text x="150" y="280">File settlement từ Visa lệch với sổ nội bộ</text><text x="440" y="280">Đối soát phát hiện lệch · cảnh báo không tự đóng</text>
<text x="34" y="304" fill="#0891b2">State</text><text x="150" y="304">Truy vấn trạng thái giao dịch bất kỳ lúc nào</text><text x="440" y="304">Đúng 1 trong: AUTHORIZED/CAPTURED/VOIDED/SETTLED/DISPUTED/REVERSED</text>
</g></g>
<text x="24" y="326" font-size="12" fill="#6d28d9" font-weight="700">Chargeback và Recon là nhóm hay bị bỏ sót nhất — nhưng lại là nơi kiểm toán/tổ chức thẻ soi kỹ nhất.</text>
</svg>`;

  const pages = [
    {
      heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. ビジネス背景と範囲" },
      blocks: [
        P(
          "Bạn là QA Lead mảng thẻ tín dụng tại SGB Card — công ty phát hành thẻ liên kết với 4 ngân hàng đối tác, quản lý khoảng 1,2 triệu thẻ đang lưu hành với tổng giá trị giao dịch (TPV) khoảng 3.200 tỷ đồng mỗi tháng. Hệ thống xử lý trung bình 400.000 giao dịch cấp phép mỗi ngày, trong đó khoảng 2% phát sinh tranh chấp (dispute) cần điều tra. Quý này, đội kỹ thuật nâng cấp luồng cấp phép để hỗ trợ capture một phần (partial capture) cho ngành hàng khách sạn và thuê xe — nơi số tiền cuối cùng thường khác số tiền giữ chỗ ban đầu.",
          "You are the QA Lead for the credit card division at SGB Card — a card issuer partnered with 4 banks, managing about 1.2 million active cards with total transaction value (TPV) of roughly 3,200 billion VND per month. The system processes an average of 400,000 authorization transactions per day, of which about 2% generate a dispute requiring investigation. This quarter, the engineering team is upgrading the authorization flow to support partial capture for the hotel and car-rental industries — where the final amount often differs from the initial hold amount.",
          "あなたはSGBカードのクレジットカード部門QAリードです。SGBカードは4つの提携銀行を持つカード発行会社で、約120万枚の有効カードを管理し、月間総取引額(TPV)は約3兆2千億ドンに達します。システムは1日平均40万件の与信取引を処理し、そのうち約2%が調査を要する紛争(ディスピュート)を発生させます。今四半期、エンジニアリングチームはホテル業界とレンタカー業界向けに部分キャプチャ(partial capture)をサポートするために与信フローをアップグレードしています。この業界では最終金額が当初の仮売上(ホールド)金額と異なることがよくあります。"
        ),
        P(
          "Ràng buộc từ tổ chức thẻ quốc tế (Visa/Mastercard) rất khắt khe: mọi giao dịch capture phải xảy ra trong vòng 7 ngày kể từ khi cấp phép, nếu không hold phải tự động hết hạn (auth expiry). Đối soát với tổ chức thẻ diễn ra mỗi ngày qua file settlement, và bất kỳ giao dịch nào không khớp phải được xử lý trong vòng 24 giờ theo quy định vận hành nội bộ. Một lỗi phổ biến và tốn kém nhất trong domain này là 'double capture' — khi hệ thống capture cùng một giao dịch hai lần do lỗi retry, khiến khách hàng bị trừ tiền hai lần và ngân hàng phải hoàn trả kèm phí phạt từ tổ chức thẻ.",
          "Constraints from international card schemes (Visa/Mastercard) are strict: every capture transaction must occur within 7 days of authorization, otherwise the hold must automatically expire (auth expiry). Reconciliation with the card scheme happens daily via settlement files, and any unmatched transaction must be resolved within 24 hours per internal operating policy. One of the most common and costly bugs in this domain is 'double capture' — when the system captures the same transaction twice due to a retry bug, causing the customer to be double-charged and the bank to owe a refund plus a penalty fee from the card scheme.",
          "国際カード組織(Visa/Mastercard)からの制約は厳格です。すべてのキャプチャ取引は与信から7日以内に発生しなければならず、そうでなければホールドは自動的に失効(与信失効)しなければなりません。カード組織との突合は毎日決済ファイルを通じて行われ、一致しない取引は社内運用ポリシーに従って24時間以内に解決しなければなりません。このドメインで最も一般的かつコストがかかるバグの1つは「二重キャプチャ」です。再試行バグによりシステムが同じ取引を2回キャプチャし、顧客が二重に請求され、銀行がカード組織からの罰金付きで返金を負担することになります。"
        ),
        H("Phạm vi tự động hoá của tài liệu này", "Scope of automation in this document", "本ドキュメントの自動化範囲"),
        UL(
          [
            "Luồng cấp phép (authorization/hold): kiểm tra hạn mức, giữ tiền tạm thời, chưa thực trừ.",
            "Luồng quyết toán (settlement/capture): capture toàn phần và một phần, void phần hold còn dư.",
            "Hoàn tiền & tranh chấp (refund/chargeback): mở case tranh chấp, hoàn tiền tạm ứng, đóng case sau điều tra.",
            "Đối soát với tổ chức thẻ: so khớp file settlement hàng ngày với sổ nội bộ, xử lý lệch dữ liệu.",
            "Tích hợp AI Agent hỗ trợ phân loại case tranh chấp và gợi ý ca kiểm thử biên cho luồng capture một phần.",
          ],
          [
            "The authorization/hold flow: limit checking, temporary fund holding, no actual debit yet.",
            "The settlement/capture flow: full and partial capture, voiding remaining hold amounts.",
            "Refund & chargeback: opening a dispute case, provisional refund, closing the case after investigation.",
            "Reconciliation with the card scheme: matching daily settlement files against the internal ledger, handling mismatches.",
            "AI Agent integration to help classify dispute cases and suggest edge-case tests for the partial capture flow.",
          ],
          [
            "与信(オーソリゼーション/ホールド)フロー: 限度額チェック、一時的な資金保留、まだ実際の引き落としはされない。",
            "決済(セトルメント/キャプチャ)フロー: 全額・部分キャプチャ、残りのホールド分の取消(ボイド)。",
            "返金と紛争(チャージバック): 紛争ケースの開設、仮払い返金、調査後のケースクローズ。",
            "カード組織との突合: 日次決済ファイルを内部台帳と照合し、不一致を処理する。",
            "紛争ケースの分類と部分キャプチャフローの境界テスト提案を支援するAIエージェントの統合。",
          ]
        ),
        NOTE(
          "Bài này thuộc LOẠI 'Thực chiến doanh nghiệp' (thucchien), tập trung vào domain thẻ tín dụng — nơi khái niệm hold/capture/chargeback dễ bị hiểu sai nếu QA không nắm rõ nghiệp vụ thẻ quốc tế.",
          "This article belongs to the 'Enterprise real-world' kind (thucchien), focused on the credit card domain — where hold/capture/chargeback concepts are easily misunderstood if QA lacks a solid grasp of international card scheme business rules.",
          "この記事は「実戦」種別(thucchien)に属し、クレジットカードドメインに焦点を当てています。ホールド・キャプチャ・チャージバックの概念は、QAが国際カード組織の業務ルールを十分に理解していないと誤解されやすいものです。"
        ),
      ],
    },
    {
      heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
      blocks: [
        P(
          "Luồng nghiệp vụ thẻ tín dụng có một đặc điểm khiến nhiều QA mới vào nghề nhầm lẫn: hành động 'quẹt thẻ' không đồng nghĩa với 'trừ tiền ngay'. Hiểu đúng ranh giới giữa cấp phép và quyết toán là nền tảng để thiết kế test đúng oracle.",
          "The credit card business flow has one characteristic that confuses many junior QAs: 'swiping the card' does not mean 'money is debited immediately'. Correctly understanding the boundary between authorization and settlement is the foundation for designing tests with the right oracle.",
          "クレジットカードの業務フローには、多くの新人QAを混乱させる特徴が1つあります。「カードをスワイプする」ことは「即座にお金が引き落とされる」ことを意味しません。与信と決済の境界を正しく理解することが、正しいオラクルでテストを設計するための基盤です。"
        ),
        IMG(
          svgArch2,
          "Kiến trúc luồng cấp phép - quyết toán - tranh chấp thẻ tín dụng, phân tách phần đồng bộ và batch bất đồng bộ.",
          "Card authorization-settlement-dispute flow architecture, separating the synchronous part from asynchronous batches.",
          "クレジットカードの与信・決済・紛争フローのアーキテクチャ。同期部分と非同期バッチを分離しています。"
        ),
        P(
          "Khi khách quẹt thẻ, Card Gateway định tuyến yêu cầu tới tổ chức thẻ (Visa/Mastercard) dựa trên BIN (Bank Identification Number) của thẻ, tổ chức thẻ chuyển tiếp tới Issuer Core để kiểm tra hạn mức khả dụng và tạo một HOLD — khoản tiền bị 'giữ chỗ' nhưng chưa thực sự rời khỏi tài khoản khách hàng. Phản hồi cấp phép (approve/decline) phải trả về trong vòng 3 giây theo yêu cầu của tổ chức thẻ, nếu không giao dịch tự động bị coi là timeout và merchant phải thử lại.",
          "When a customer swipes their card, the Card Gateway routes the request to the card scheme (Visa/Mastercard) based on the card's BIN (Bank Identification Number), the scheme forwards it to the Issuer Core to check available limit and create a HOLD — funds that are 'reserved' but haven't actually left the customer's account. The authorization response (approve/decline) must return within 3 seconds per the scheme's requirement, otherwise the transaction is automatically treated as a timeout and the merchant must retry.",
          "顧客がカードをスワイプすると、カードゲートウェイはカードのBIN(銀行識別番号)に基づいてリクエストをカード組織(Visa/Mastercard)にルーティングし、カード組織はそれを発行者コアに転送して利用可能枠を確認し、HOLD(「予約」されているがまだ顧客の口座から実際には離れていない資金)を作成します。与信応答(承認/拒否)はカード組織の要件に従って3秒以内に返される必要があり、そうでなければ取引は自動的にタイムアウトとみなされ、加盟店は再試行しなければなりません。"
        ),
        P(
          "Quyết toán (settlement/capture) diễn ra sau đó, thường khi merchant giao hàng hoặc hoàn tất dịch vụ — có thể vài phút sau (cửa hàng bán lẻ) hoặc vài ngày sau (khách sạn, thuê xe). Capture là bước THỰC SỰ trừ tiền khách hàng, và số tiền capture có thể nhỏ hơn hoặc bằng số tiền đã hold (partial capture), nhưng KHÔNG BAO GIỜ được lớn hơn. Phần hold còn dư sau capture phải được giải phóng (void) để trả lại hạn mức khả dụng cho khách hàng.",
          "Settlement/capture happens afterward, typically when the merchant ships goods or completes service — possibly minutes later (retail store) or days later (hotel, car rental). Capture is the step that ACTUALLY debits the customer, and the captured amount can be less than or equal to the held amount (partial capture), but must NEVER exceed it. Any remaining hold after capture must be released (voided) to return available limit to the customer.",
          "決済(セトルメント/キャプチャ)はその後に行われ、通常は加盟店が商品を発送するかサービスを完了した時点です — 数分後(小売店)の場合もあれば、数日後(ホテル、レンタカー)の場合もあります。キャプチャは顧客に実際に請求するステップであり、キャプチャ額はホールド額以下(部分キャプチャ)であり得ますが、決して超えてはいけません。キャプチャ後に残ったホールドは、顧客に利用可能枠を返すために解放(ボイド)されなければなりません。"
        ),
        TIP(
          "Khi phỏng vấn hoặc viết test, hãy luôn phân biệt rõ 3 động từ: HOLD (giữ chỗ), CAPTURE (trừ thật), VOID (giải phóng). Nhầm lẫn 3 khái niệm này là lỗi tư duy phổ biến nhất khiến QA mới thiết kế sai oracle cho domain thẻ.",
          "In interviews or when writing tests, always clearly distinguish the three verbs: HOLD (reserve), CAPTURE (actual debit), VOID (release). Confusing these three concepts is the most common thinking error that causes new QAs to design the wrong oracle for the card domain.",
          "面接やテスト作成の際は、常に3つの動詞を明確に区別してください。HOLD(仮売上)、CAPTURE(実際の引き落とし)、VOID(解放)です。この3つの概念を混同することは、新人QAがカードドメインで誤ったオラクルを設計してしまう最もよくある思考の誤りです。"
        ),
      ],
    },
    {
      heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ", en: "3. Data model & business invariants", ja: "3. データモデルと業務不変条件" },
      blocks: [
        P(
          "Mô hình dữ liệu trung tâm gồm CardTransaction (giao dịch, có transactionId duy nhất, holdAmount, capturedAmount, trạng thái), LedgerEntry (bút toán ghi kép cho mỗi bước hold/capture/void/refund), và DisputeCase (case tranh chấp gắn với transactionId gốc, có trạng thái điều tra riêng). Ba thực thể này liên kết chặt chẽ, và một test tốt phải kiểm tra được tính nhất quán xuyên suốt cả ba khi có bất kỳ thao tác nào xảy ra.",
          "The central data model has CardTransaction (the transaction, with a unique transactionId, holdAmount, capturedAmount, state), LedgerEntry (double-entry records for each hold/capture/void/refund step), and DisputeCase (a dispute case tied to the original transactionId, with its own investigation state). These three entities are tightly linked, and a good test must verify consistency across all three whenever any operation occurs.",
          "中心となるデータモデルには、CardTransaction(一意のtransactionId、holdAmount、capturedAmount、状態を持つ取引)、LedgerEntry(hold/capture/void/refundの各ステップの複式記帳)、DisputeCase(元のtransactionIdに紐づく紛争ケースで、独自の調査状態を持つ)があります。この3つのエンティティは密接に連携しており、優れたテストはどのような操作が発生しても、この3つ全体にわたる一貫性を検証しなければなりません。"
        ),
        IMG(
          svgLedger2,
          "Sổ cái ghi kép cho một giao dịch thẻ 2.000.000đ qua các bước hold, capture một phần, void, refund.",
          "Double-entry ledger for a 2,000,000-VND card transaction across hold, partial capture, void, refund steps.",
          "hold・部分キャプチャ・ボイド・refundの各ステップにおける200万ドンのカード取引の複式台帳。"
        ),
        H("Bốn bất biến phải đúng ở MỌI thời điểm", "Four invariants that must hold at ALL times", "常に成り立つべき4つの不変条件"),
        UL(
          [
            "hold ≤ hạn mức khả dụng của thẻ tại thời điểm cấp phép — không được tạo hold vượt quá số dư khả dụng.",
            "capture ≤ hold ban đầu — không bao giờ được capture nhiều hơn số tiền đã giữ chỗ, kể cả cộng dồn nhiều lần capture một phần.",
            "Double-entry: tổng Nợ = tổng Có ở mọi bước (hold, capture, void, refund) — tiền không tự sinh hay biến mất khỏi hệ thống.",
            "Idempotency theo transactionId: gửi lại cùng một yêu cầu capture/void/refund không được tạo bút toán thứ hai.",
          ],
          [
            "hold ≤ available card limit at the time of authorization — a hold must never be created exceeding the available balance.",
            "capture ≤ original hold — capture must never exceed the reserved amount, even when accumulating multiple partial captures.",
            "Double-entry: total Debit = total Credit at every step (hold, capture, void, refund) — money neither appears nor disappears from the system.",
            "Idempotency by transactionId: resending the same capture/void/refund request must not create a second ledger entry.",
          ],
          [
            "hold ≤ 与信時点でのカード利用可能枠 — 利用可能残高を超えるホールドを作成してはいけません。",
            "capture ≤ 元のhold — 複数回の部分キャプチャを累積しても、キャプチャがホールド済み金額を超えてはいけません。",
            "複式記帳: すべてのステップ(hold、capture、void、refund)で借方合計=貸方合計 — お金はシステム内で発生も消滅もしません。",
            "transactionIdによる冪等性: 同じcapture/void/refundリクエストを再送しても、2件目の記帳を作成してはいけません。",
          ]
        ),
        WARN(
          "Đừng assert 'màn hình hiện Thanh toán thành công'. Hãy assert: capturedAmount tích luỹ ≤ holdAmount, hold còn lại đã được void đúng số tiền, và số bút toán capture cho một transactionId luôn là số nguyên không âm hợp lý (0, 1, hoặc nhiều lần nếu partial capture được thiết kế cho phép).",
          "Don't assert 'screen shows Payment successful'. Assert instead: accumulated capturedAmount ≤ holdAmount, the remaining hold was voided for the correct amount, and the number of capture entries for a transactionId is always a sane non-negative integer (0, 1, or multiple if partial capture is designed to allow it).",
          "「画面に決済成功と表示される」とアサートしてはいけません。代わりに、累積capturedAmount ≤ holdAmountであること、残りのholdが正しい金額でボイドされていること、1つのtransactionIdに対するキャプチャ記帳数が常に妥当な非負整数(部分キャプチャが許可される設計の場合は0、1、または複数)であることをアサートしてください。"
        ),
      ],
    },
    {
      heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
      blocks: [
        P(
          "Rủi ro lớn nhất trong domain thẻ là 'double capture' và 'capture vượt hold' — cả hai đều dẫn tới khiếu nại khách hàng và phạt từ tổ chức thẻ nếu tỉ lệ tranh chấp (chargeback ratio) vượt ngưỡng 1% theo quy định của Visa/Mastercard. Đội QA xếp cả hai vào mức 'Nghiêm trọng' vì xác suất xảy ra khi hệ thống dưới tải cao (Black Friday, khuyến mãi lớn) không hề thấp, còn hậu quả bao gồm cả tổn thất tài chính lẫn rủi ro bị tổ chức thẻ phạt hoặc hạ cấp merchant category.",
          "The biggest risk in the card domain is 'double capture' and 'capture exceeding hold' — both lead to customer complaints and fines from the card scheme if the chargeback ratio exceeds the 1% threshold set by Visa/Mastercard. The QA team ranks both 'Critical' because the probability under high load (Black Friday, major promotions) is not low, and the consequences include both financial loss and the risk of scheme fines or merchant category downgrades.",
          "カードドメインにおける最大のリスクは「二重キャプチャ」と「キャプチャがホールドを超過すること」です。両方とも、チャージバック比率がVisa/Mastercardが定める1%のしきい値を超えると、顧客からの苦情とカード組織からの罰金につながります。QAチームは両方を「重大」に格付けします。高負荷時(ブラックフライデー、大型プロモーション)の発生確率は低くなく、結果には財務的損失とカード組織からの罰金や加盟店カテゴリ格下げのリスクの両方が含まれるためです。"
        ),
        H("Kim tự tháp kiểm thử áp dụng cho luồng thẻ", "Test pyramid applied to the card flow", "カードフローに適用するテストピラミッド"),
        UL(
          [
            "Unit test (~50%): hàm tính hold còn lại sau capture một phần, hàm validate BIN routing, hàm sinh idempotency key theo transactionId.",
            "Integration/API test (~40%): luồng hold-capture-void với mock card scheme, luồng mở/đóng dispute case, batch đối soát settlement.",
            "E2E test (~10%): kịch bản đầy đủ quẹt thẻ tại POS thật (sandbox) tới khi tiền được quyết toán vào tài khoản merchant.",
          ],
          [
            "Unit tests (~50%): remaining-hold-after-partial-capture calculation, BIN routing validation, idempotency key generation by transactionId.",
            "Integration/API tests (~40%): hold-capture-void flow with a mocked card scheme, dispute case open/close flow, settlement reconciliation batch.",
            "E2E tests (~10%): full scenario from a real POS swipe (sandbox) through to funds settling into the merchant account.",
          ],
          [
            "ユニットテスト(約50%): 部分キャプチャ後の残りホールド計算、BINルーティング検証、transactionIdによる冪等性キー生成。",
            "統合・APIテスト(約40%): モックカード組織を用いたhold-capture-voidフロー、紛争ケースの開設・クローズフロー、決済突合バッチ。",
            "E2Eテスト(約10%): 実際のPOS(サンドボックス)でのスワイプから加盟店口座への決済入金までの完全なシナリオ。",
          ]
        ),
        P(
          "Chiến lược kiểm thử ưu tiên 'financial correctness first': mọi ca kiểm thử về tiền phải PASS trước khi xem xét đến trải nghiệm người dùng. Đội QA áp dụng nguyên tắc 'không tin bất kỳ thông báo màn hình nào' — mọi khẳng định phải được xác nhận lại bằng truy vấn trực tiếp vào LedgerEntry và CardTransaction thông qua API nội bộ dành riêng cho kiểm thử.",
          "The test strategy prioritizes 'financial correctness first': every money-related test case must PASS before UX considerations are even reviewed. The QA team applies the principle of 'trust no on-screen message' — every claim must be re-confirmed by querying LedgerEntry and CardTransaction directly through an internal test-only API.",
          "テスト戦略は「財務的正確性を最優先」します。お金に関するすべてのテストケースは、UX面の検討に入る前にPASSしなければなりません。QAチームは「画面上のメッセージを一切信用しない」という原則を適用しており、あらゆる主張は、テスト専用の内部APIを通じてLedgerEntryとCardTransactionに直接問い合わせることで再確認されなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "5. Test Plan (entry/exit, môi trường, dữ liệu)", en: "5. Test Plan (entry/exit, environment, data)", ja: "5. テスト計画（開始・終了基準、環境、データ）" },
      blocks: [
        P(
          "Entry Criteria yêu cầu: mock card scheme đã hỗ trợ đầy đủ các response code chuẩn (00 approve, 05 decline, 51 insufficient funds, 91 issuer unavailable), và môi trường staging có sandbox riêng cho Issuer Core tách biệt khỏi hệ thống thật. Exit Criteria yêu cầu: 100% ca P0 (hold/capture invariant, idempotency, đối soát) PASS, và báo cáo đối soát mẫu đã được đội vận hành xác nhận đọc hiểu được.",
          "Entry Criteria requires: the mocked card scheme fully supports standard response codes (00 approve, 05 decline, 51 insufficient funds, 91 issuer unavailable), and the staging environment has a dedicated Issuer Core sandbox separated from the real system. Exit Criteria requires: 100% of P0 cases (hold/capture invariants, idempotency, reconciliation) PASS, and a sample reconciliation report has been confirmed readable by the operations team.",
          "開始基準(エントリークライテリア)は、モックカード組織が標準応答コード(00承認、05拒否、51残高不足、91発行者利用不可)を完全にサポートしていること、ステージング環境が実システムから分離された専用の発行者コアサンドボックスを持っていることを要求します。終了基準は、P0ケース(hold/capture不変条件、冪等性、突合)の100%合格、サンプル突合レポートが運用チームによって読解可能であることが確認されていることを要求します。"
        ),
        H("Môi trường & vai trò", "Environment & roles", "環境と役割分担"),
        UL(
          [
            "Sandbox card scheme riêng, cho phép cấu hình response code và độ trễ giả lập để test timeout.",
            "Bộ dữ liệu thẻ test chuẩn theo tài liệu Visa/Mastercard test cards, không dùng số thẻ thật kể cả đã che (mask).",
            "Vai trò: 2 QA Automation cho luồng hold/capture, 1 QA chuyên trách luồng dispute/chargeback, 1 Data Analyst hỗ trợ kiểm tra báo cáo đối soát.",
            "Chỉ số theo dõi: tỉ lệ giao dịch capture thành công, thời gian trung bình mở-đóng 1 case tranh chấp, tỉ lệ lệch đối soát mỗi ngày.",
          ],
          [
            "A dedicated card scheme sandbox, configurable with response codes and simulated latency for timeout testing.",
            "A standard test-card dataset following Visa/Mastercard test card documentation, never using real card numbers even masked.",
            "Roles: 2 QA Automation engineers for the hold/capture flow, 1 dedicated QA for the dispute/chargeback flow, 1 Data Analyst supporting reconciliation report checks.",
            "Tracked metrics: successful capture rate, average time to open-close a dispute case, daily reconciliation mismatch rate.",
          ],
          [
            "専用のカード組織サンドボックスで、タイムアウトテスト用に応答コードとシミュレートされた遅延を設定可能。",
            "Visa/Mastercardのテストカード資料に準拠した標準テストカードデータセットを使用し、マスクされていても実際のカード番号は絶対に使用しない。",
            "役割分担: hold/captureフロー担当のQA自動化2名、紛争・チャージバックフロー専任QA1名、突合レポート確認を支援するデータアナリスト1名。",
            "追跡指標: キャプチャ成功率、紛争ケースの開設・クローズにかかる平均時間、日次の突合不一致率。",
          ]
        ),
        NOTE(
          "Dữ liệu test phải phủ đủ các response code chuẩn của tổ chức thẻ (approve, decline, insufficient funds, issuer unavailable) chứ không chỉ test happy path approve.",
          "Test data must cover all standard card scheme response codes (approve, decline, insufficient funds, issuer unavailable), not just the happy-path approve case.",
          "テストデータは、承認のハッピーパスだけでなく、カード組織の標準応答コード(承認、拒否、残高不足、発行者利用不可)すべてをカバーする必要があります。"
        ),
      ],
    },
    {
      heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
      blocks: [
        P(
          "Ma trận ca kiểm thử áp dụng equivalence partitioning cho các mức hold (dưới hạn mức, đúng hạn mức, vượt hạn mức), boundary value analysis cho quan hệ capture/hold (capture < hold, capture = hold, capture > hold), và decision table cho tổ hợp trạng thái dispute (mở case, đang điều tra, thắng kiện, thua kiện).",
          "The test case matrix applies equivalence partitioning for hold levels (under limit, at limit, over limit), boundary value analysis for the capture/hold relationship (capture < hold, capture = hold, capture > hold), and decision tables for dispute state combinations (case opened, under investigation, won, lost).",
          "テストケースマトリクスは、ホールドレベル(限度額未満、限度額ちょうど、限度額超過)の同値分割、capture/hold関係(capture < hold、capture = hold、capture > hold)の境界値分析、紛争状態の組み合わせ(ケース開設、調査中、勝訴、敗訴)のデシジョンテーブルを適用します。"
        ),
        IMG(
          svgMatrix2,
          "Ma trận thiết kế ca kiểm thử cho luồng cấp phép/quyết toán/tranh chấp thẻ, trích các nhóm happy/boundary/negative/chargeback/recon.",
          "Test case design matrix for the card auth/settlement/dispute flow, showing happy/boundary/negative/chargeback/recon groups.",
          "カード与信・決済・紛争フローのテストケース設計マトリクス。ハッピーパス・境界値・ネガティブ・チャージバック・突合のグループを抜粋。"
        ),
        TIP(
          "Với domain thẻ, luôn viết thêm ca 'auth expiry' (hold quá 7 ngày không capture) — đây là ca dễ bị bỏ sót nhất vì nó phụ thuộc thời gian và thường không được test thủ công.",
          "For the card domain, always add an 'auth expiry' case (hold uncaptured beyond 7 days) — this is the most commonly missed case because it's time-dependent and rarely tested manually.",
          "カードドメインでは、常に「与信失効」ケース(7日以上キャプチャされないホールド)を追加してください — これは時間依存であり、手動テストではほとんど行われないため、最も見落とされやすいケースです。"
        ),
      ],
    },
    {
      heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
      blocks: [
        P(
          "Bộ API test-only cho domain thẻ gồm: POST /test/seed/card để tạo thẻ test với hạn mức định sẵn, POST /test/mock/scheme để cấu hình response code trả về từ card scheme mock, và POST /test/advance-time để giả lập trôi thời gian phục vụ test auth expiry mà không cần chờ thật 7 ngày. Việc giả lập thời gian là kỹ thuật quan trọng giúp test chạy trong vài giây thay vì phải chờ thật.",
          "The test-only API suite for the card domain includes: POST /test/seed/card to create a test card with a predefined limit, POST /test/mock/scheme to configure the response code returned by the mocked card scheme, and POST /test/advance-time to simulate time passing to test auth expiry without waiting a real 7 days. Time simulation is a key technique letting tests run in seconds instead of waiting in real time.",
          "カードドメイン向けのテスト専用APIスイートには、事前定義された限度額でテストカードを作成するPOST /test/seed/card、モックカード組織からの応答コードを設定するPOST /test/mock/scheme、実際に7日間待たずに与信失効をテストするために時間経過をシミュレートするPOST /test/advance-timeが含まれます。時間のシミュレーションは、実際に待つ代わりにテストを数秒で実行できるようにする重要な技法です。"
        ),
        CODE(
          "bash",
          `# Seed một thẻ test với hạn mức 5.000.000đ
curl -X POST https://staging.sgbcard.local/test/seed/card \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "cardId": "CARD-TEST-0001", "availableLimit": 5000000, "bin": "970436" }'

# Cấu hình mock card scheme trả về approve
curl -X POST https://staging.sgbcard.local/test/mock/scheme \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "cardId": "CARD-TEST-0001", "responseCode": "00", "latencyMs": 400 }'

# Giả lập trôi 8 ngày để test auth expiry (không cần chờ thật)
curl -X POST https://staging.sgbcard.local/test/advance-time \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "days": 8 }'`
        ),
        WARN(
          "Không bao giờ dùng số thẻ thật, kể cả của nhân viên nội bộ, trong bất kỳ môi trường test nào — chỉ dùng bộ số thẻ test chuẩn do Visa/Mastercard công bố để tránh vi phạm PCI-DSS.",
          "Never use real card numbers, even employee cards, in any test environment — only use the standard test card numbers published by Visa/Mastercard to avoid PCI-DSS violations.",
          "テスト環境では、社員のカードであっても実際のカード番号を絶対に使用しないでください — PCI-DSS違反を避けるため、Visa/Mastercardが公開する標準テストカード番号のみを使用してください。"
        ),
      ],
    },
    {
      heading: { vi: "8. Automation happy path (POM/fixtures)", en: "8. Happy-path automation (POM/fixtures)", ja: "8. ハッピーパスの自動化（POM／フィクスチャ）" },
      blocks: [
        P(
          "Với cổng thanh toán có giao diện checkout, đội QA dùng POM để tách thao tác nhập thẻ khỏi assertion nghiệp vụ. Fixture chuẩn bị thẻ test với hạn mức xác định và mock card scheme trả về approve trước khi test chạy, dọn dẹp trạng thái sau khi test kết thúc.",
          "For a payment gateway with a checkout UI, the QA team uses POM to separate card-entry actions from business assertions. A fixture prepares a test card with a defined limit and mocks the card scheme to return approve before the test runs, cleaning up state afterward.",
          "チェックアウトUIを持つ決済ゲートウェイでは、QAチームはPOMを使用してカード入力操作と業務アサーションを分離します。フィクスチャは、テスト実行前に定義された限度額を持つテストカードを準備し、カード組織のモックが承認を返すよう設定し、テスト終了後に状態をクリーンアップします。"
        ),
        CODE(
          "typescript",
          `// pages/checkout.page.ts — Page Object cho form thanh toán thẻ
import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  async open(orderId: string) {
    await this.page.goto(\`/checkout/\${orderId}\`);
  }

  async payWithCard(input: { cardId: string; amount: number }) {
    await this.page.getByLabel("Số thẻ").fill(input.cardId);
    await this.page.getByLabel("Số tiền").fill(String(input.amount));
    await this.page.getByRole("button", { name: "Thanh toán" }).click();
  }

  async expectAuthStatus(status: string) {
    await expect(this.page.getByTestId("auth-status")).toHaveText(status, { timeout: 10000 });
  }
}`
        ),
        CODE(
          "typescript",
          `// tests/card-auth.happy.spec.ts — Happy path: hold -> capture toàn phần -> settle
import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";
import { seedCard, mockScheme, captureTransaction, getLedgerEntries } from "../fixtures/card-fixtures";

test.beforeEach(async () => {
  await seedCard("CARD-TEST-0001", { availableLimit: 5_000_000 });
  await mockScheme("CARD-TEST-0001", { responseCode: "00", latencyMs: 400 });
});

test("hold 2 triệu -> capture toàn phần trong hạn -> SETTLED khớp hold", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.open("ORD-9001");
  await checkout.payWithCard({ cardId: "CARD-TEST-0001", amount: 2_000_000 });
  await checkout.expectAuthStatus("AUTHORIZED");

  const txnId = await page.getByTestId("transaction-id").innerText();
  await captureTransaction(txnId, { amount: 2_000_000 });

  // Oracle: capturedAmount == hold, không lệch 1 đồng, đúng 1 bút toán capture
  const entries = await getLedgerEntries(txnId);
  const captures = entries.filter((e: any) => e.type === "CAPTURE");
  expect(captures.length).toBe(1);
  expect(captures[0].amount).toBe(2_000_000);
  const totalCaptured = captures.reduce((s: number, e: any) => s + e.amount, 0);
  expect(totalCaptured).toBeLessThanOrEqual(2_000_000);
});`
        ),
      ],
    },
    {
      heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 深掘りした異常系ケース" },
      blocks: [
        P(
          "Chương này tập trung vào các ca lỗi có giá trị cao nhất trong domain thẻ: capture vượt hold, double capture do retry, auth expiry, và chargeback trên giao dịch đã settle từ lâu.",
          "This chapter focuses on the highest-value failure cases in the card domain: capture exceeding hold, double capture from retries, auth expiry, and chargeback on a long-settled transaction.",
          "この章では、カードドメインにおいて最も価値の高い異常系ケースに焦点を当てます。ホールドを超えるキャプチャ、再試行による二重キャプチャ、与信失効、そして長らく決済済みの取引に対するチャージバックです。"
        ),
        CODE(
          "typescript",
          `// tests/card-auth.capture-exceeds-hold.spec.ts — chặn capture vượt hold
test("capture 2.5 triệu khi hold chỉ 2 triệu -> từ chối phần vượt, không tự nới hold", async () => {
  const txnId = await createAuthorizedTransaction({ holdAmount: 2_000_000 });

  const res = await captureTransactionApi(txnId, { amount: 2_500_000 });

  expect(res.status).toBe("REJECTED");
  expect(res.reason).toBe("CAPTURE_EXCEEDS_HOLD");
  const entries = await getLedgerEntries(txnId);
  expect(entries.filter((e: any) => e.type === "CAPTURE").length).toBe(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/card-auth.idempotency.spec.ts — chống double capture do retry mạng
test("gửi lại capture cùng transactionId do timeout mạng -> chỉ 1 bút toán capture", async () => {
  const txnId = await createAuthorizedTransaction({ holdAmount: 3_000_000 });
  const idemKey = "cap-" + txnId;

  const [r1, r2] = await Promise.all([
    captureTransactionApi(txnId, { amount: 3_000_000, idempotencyKey: idemKey }),
    captureTransactionApi(txnId, { amount: 3_000_000, idempotencyKey: idemKey }),
  ]);

  expect([r1.status, r2.status].sort()).toEqual(["OK", "OK"]);
  const entries = await getLedgerEntries(txnId);
  const captures = entries.filter((e: any) => e.type === "CAPTURE");
  // Oracle: dù gửi 2 lần, chỉ đúng MỘT bút toán capture được ghi nhận
  expect(captures.length).toBe(1);
  expect(captures[0].amount).toBe(3_000_000);
});`
        ),
        CODE(
          "typescript",
          `// tests/card-auth.auth-expiry.spec.ts — hold quá 7 ngày phải tự động void
test("hold quá 7 ngày không capture -> auto-void, giải phóng hạn mức", async () => {
  const cardId = "CARD-TEST-EXPIRY";
  await seedCard(cardId, { availableLimit: 5_000_000 });
  const txnId = await createAuthorizedTransactionForCard(cardId, { holdAmount: 1_000_000 });

  await advanceTime({ days: 8 }); // vượt SLA 7 ngày của tổ chức thẻ
  await runAuthExpiryJob();

  const txn = await getTransactionState(txnId);
  expect(txn.status).toBe("VOIDED");

  const card = await getCardLimit(cardId);
  // Oracle: hạn mức khả dụng phải được trả lại đầy đủ sau void
  expect(card.availableLimit).toBe(5_000_000);
});`
        ),
        CODE(
          "typescript",
          `// tests/card-auth.chargeback.spec.ts — tranh chấp trên giao dịch đã settle từ lâu
test("khách mở dispute trên giao dịch SETTLED 40 ngày trước -> tạo hoàn tiền tạm ứng, mở case điều tra", async () => {
  const txnId = await createSettledTransaction({ amount: 1_200_000, daysAgo: 40 });

  const dispute = await openDisputeCase(txnId, { reason: "GOODS_NOT_RECEIVED" });

  expect(dispute.status).toBe("UNDER_INVESTIGATION");
  const entries = await getLedgerEntries(txnId);
  const provisionalRefund = entries.find((e: any) => e.type === "PROVISIONAL_REFUND");
  expect(provisionalRefund).toBeDefined();
  expect(provisionalRefund.amount).toBe(1_200_000);
  // Oracle: giao dịch gốc KHÔNG bị xoá hay sửa, chỉ có bút toán tạm ứng mới được thêm
  const originalCapture = entries.find((e: any) => e.type === "CAPTURE");
  expect(originalCapture.amount).toBe(1_200_000);
});`
        ),
        SCEN(
          "Kịch bản: merchant thuê xe giữ hold 5.000.000đ khi khách nhận xe, sau đó chỉ capture 4.200.000đ vì khách trả xe sớm 1 ngày",
          "Scenario: a car rental merchant holds 5,000,000 VND when the customer picks up the car, then only captures 4,200,000 VND because the customer returned the car 1 day early",
          "QA phải xác nhận: phần hold còn dư 800.000đ được void đúng, hạn mức khả dụng của khách được hoàn lại đúng số đó, và báo cáo đối soát cuối ngày phản ánh đúng capturedAmount = 4.200.000đ chứ không phải holdAmount ban đầu.",
          "QA must confirm: the remaining 800,000 VND hold is voided correctly, the customer's available limit is restored by exactly that amount, and the end-of-day reconciliation report correctly reflects capturedAmount = 4,200,000 VND, not the original holdAmount.",
          "シナリオ: レンタカー加盟店が顧客の車受け取り時に500万ドンのホールドを設定し、顧客が1日早く返却したため420万ドンのみキャプチャした場合",
          "QAは、残りの80万ドンのホールドが正しくボイドされること、顧客の利用可能枠がその金額分だけ正しく回復すること、そして日次突合レポートが元のholdAmountではなく正しくcapturedAmount=420万ドンを反映していることを確認しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "10. Nghiệp vụ nền/hậu kiểm", en: "10. Background/post-processing operations", ja: "10. バックグラウンド業務・事後検証" },
      blocks: [
        P(
          "Mỗi ngày lúc 01h00, job đối soát so khớp file settlement nhận từ tổ chức thẻ (Visa/Mastercard) với sổ nội bộ theo transactionId. Bất kỳ giao dịch nào xuất hiện ở file tổ chức thẻ nhưng không có trong sổ nội bộ (hoặc ngược lại) đều phải được gắn cờ MISMATCH và đưa vào hàng đợi xử lý thủ công trong vòng 24 giờ theo cam kết vận hành nội bộ.",
          "Every day at 01:00, a reconciliation job matches the settlement file received from the card scheme (Visa/Mastercard) against the internal ledger by transactionId. Any transaction appearing in the scheme's file but missing from the internal ledger (or vice versa) must be flagged MISMATCH and queued for manual handling within 24 hours per internal operating commitment.",
          "毎日1時に、突合ジョブがカード組織(Visa/Mastercard)から受け取った決済ファイルをtransactionIdで内部台帳と照合します。カード組織のファイルに現れるが内部台帳に存在しない取引(またはその逆)は、すべてMISMATCHとしてフラグを立て、社内運用の約束に従って24時間以内に手動処理のキューに入れなければなりません。"
        ),
        CODE(
          "sql",
          `-- Truy vấn kiểm tra bất biến: capturedAmount tích luỹ không được vượt holdAmount cho MỌI giao dịch
SELECT
  t.transaction_id,
  t.hold_amount,
  SUM(le.amount) FILTER (WHERE le.type = 'CAPTURE') AS total_captured
FROM card_transactions t
JOIN ledger_entries le ON le.transaction_id = t.transaction_id
GROUP BY t.transaction_id, t.hold_amount
HAVING SUM(le.amount) FILTER (WHERE le.type = 'CAPTURE') > t.hold_amount;
-- Bất biến: kết quả trả về PHẢI RỖNG. Có dòng nào xuất hiện nghĩa là đã capture vượt hold — lỗi nghiêm trọng.`
        ),
        CODE(
          "typescript",
          `// tests/reconciliation.card-batch.spec.ts — test job đối soát với tổ chức thẻ
test("job đối soát phát hiện giao dịch có trong file Visa nhưng thiếu trong sổ nội bộ", async () => {
  const txnId = await createSettledTransaction({ amount: 900_000 });
  await deleteInternalLedgerEntryForTest(txnId); // giả lập lỗi đồng bộ dữ liệu

  const report = await runCardReconciliationBatch({ date: "2026-07-06" });

  const mismatch = report.mismatches.find((m: any) => m.transactionId === txnId);
  expect(mismatch).toBeDefined();
  expect(mismatch.status).toBe("MISMATCH");
  expect(mismatch.source).toBe("SCHEME_FILE_ONLY");
});`
        ),
        TIP(
          "Luôn viết ít nhất 2 ca đối soát: một ca 'giao dịch chỉ có ở tổ chức thẻ' và một ca 'giao dịch chỉ có ở sổ nội bộ' — hai chiều lệch đều nguy hiểm như nhau nhưng thường chỉ được test một chiều.",
          "Always write at least 2 reconciliation cases: one for 'transaction only in the scheme file' and one for 'transaction only in the internal ledger' — both directions of mismatch are equally dangerous but often only one direction gets tested.",
          "常に少なくとも2つの突合ケースを書いてください。「カード組織側のみに存在する取引」と「内部台帳側のみに存在する取引」です — 不一致の両方向は同じくらい危険ですが、通常は片方向しかテストされません。"
        ),
      ],
    },
    {
      heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
      blocks: [
        P(
          "Bộ test chạy tự động qua GitHub Actions trên mỗi pull request, chia 5 shard song song để giữ thời gian phản hồi dưới 8 phút. Gate CI chặn merge tuyệt đối nếu bất kỳ ca P0 nào (capture ≤ hold, idempotency, đối soát) fail, và cảnh báo Slack tự động gửi tới kênh #card-platform-alerts nếu tỉ lệ lệch đối soát vượt 0,1% trong bất kỳ lần chạy nào.",
          "The test suite runs automatically via GitHub Actions on every pull request, split into 5 parallel shards to keep feedback under 8 minutes. The CI gate absolutely blocks merging if any P0 case (capture ≤ hold, idempotency, reconciliation) fails, and an automatic Slack alert goes to the #card-platform-alerts channel if the reconciliation mismatch rate exceeds 0.1% in any run.",
          "テストスイートは、GitHub Actions経由ですべてのプルリクエストで自動的に実行され、フィードバックを8分以内に保つために5つの並行シャードに分割されます。CIゲートは、P0ケース(capture ≤ hold、冪等性、突合)のいずれかが失敗した場合、マージを完全にブロックし、突合の不一致率が実行中に0.1%を超えた場合、自動Slackアラートが#card-platform-alertsチャンネルに送られます。"
        ),
        CODE(
          "yaml",
          `# .github/workflows/card-auth-tests.yml
name: card-auth-tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4, 5]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Run shard \${{ matrix.shard }}/5
        run: npx playwright test --shard=\${{ matrix.shard }}/5
        env:
          TEST_ONLY_TOKEN: \${{ secrets.TEST_ONLY_TOKEN }}
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: report-\${{ matrix.shard }}, path: playwright-report/ }

  gate-p0:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Ca P0 (hold/capture invariant, idempotency, recon) phải PASS 100%
        run: node scripts/check-p0-gate.js --tag=P0 --require=100`
        ),
        NOTE(
          "Ngoài gate P0, nên thêm một job riêng chạy hàng đêm mô phỏng tải cao (k6) để phát hiện sớm race condition trong luồng capture khi nhiều request đồng thời chạm vào cùng một transactionId.",
          "Besides the P0 gate, add a separate nightly job simulating high load (k6) to catch race conditions early in the capture flow when many requests concurrently touch the same transactionId.",
          "P0ゲートに加えて、同じtransactionIdに複数のリクエストが同時にアクセスする際のキャプチャフローにおけるレースコンディションを早期に発見するため、高負荷をシミュレートする(k6)夜間専用ジョブを別途追加することをお勧めします。"
        ),
      ],
    },
    {
      heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
      blocks: [
        P(
          "AI Agent nội bộ được dùng để phân loại nhanh các case tranh chấp mới dựa trên mô tả của khách hàng (ví dụ 'không nhận được hàng', 'bị trừ tiền 2 lần', 'không nhận ra giao dịch'), gợi ý reason code chuẩn theo phân loại của Visa/Mastercard, và soạn thảo thêm ca kiểm thử biên cho luồng partial capture mới triển khai. AI KHÔNG được tự động phê duyệt hoặc từ chối một case tranh chấp — quyết định tài chính cuối cùng luôn thuộc về chuyên viên điều tra con người.",
          "The internal AI Agent is used to quickly classify new dispute cases based on customer descriptions (e.g. 'did not receive goods', 'charged twice', 'don't recognize this transaction'), suggest standard reason codes per Visa/Mastercard classification, and draft additional edge-case tests for the newly rolled-out partial capture flow. AI must NOT auto-approve or auto-reject a dispute case — the final financial decision always belongs to a human investigator.",
          "社内AIエージェントは、顧客の説明(例:「商品を受け取っていない」「二重に請求された」「この取引に心当たりがない」)に基づいて新規紛争ケースを迅速に分類し、Visa/Mastercardの分類に従った標準理由コードを提案し、新しく展開された部分キャプチャフローの追加境界ケーステストを作成するために使用されます。AIは紛争ケースを自動承認または自動拒否してはいけません — 最終的な財務判断は常に人間の調査担当者に属します。"
        ),
        H("Ranh giới trách nhiệm AI làm / người giữ", "AI-does / human-keeps responsibility boundary", "AIが行う範囲・人間が保持する範囲の境界"),
        UL(
          [
            "AI được làm: phân loại sơ bộ case tranh chấp, gợi ý reason code, soạn nháp ca kiểm thử biên cho tính năng mới.",
            "Người phải giữ: quyết định thắng/thua của một case tranh chấp, phê duyệt hoàn tiền thực tế, xác nhận oracle/bất biến trước khi merge test vào suite chính.",
            "Mọi gợi ý phân loại của AI phải hiển thị kèm độ tin cậy (confidence score) và luôn có nút 'chuyên viên xem lại' bắt buộc trước khi case được đóng.",
          ],
          [
            "AI may do: preliminary dispute case classification, reason code suggestions, drafting edge-case tests for new features.",
            "Humans must keep: the win/loss decision on a dispute case, approving actual refunds, confirming the oracle/invariant before merging tests into the main suite.",
            "Every AI classification suggestion must display a confidence score and always have a mandatory 'specialist review' step before a case can be closed.",
          ],
          [
            "AIが行ってよいこと: 紛争ケースの予備的な分類、理由コードの提案、新機能の境界ケーステストの草案作成。",
            "人間が保持すべきこと: 紛争ケースの勝訴・敗訴の決定、実際の返金の承認、メインスイートへのテストマージ前のオラクル・不変条件の確認。",
            "AIによるすべての分類提案には信頼度スコアを表示し、ケースをクローズする前に必ず「専門家によるレビュー」ステップを設けなければなりません。",
          ]
        ),
        WARN(
          "Không để AI Agent truy cập trực tiếp vào API capture/refund trên môi trường production dưới bất kỳ hình thức nào, kể cả để 'thử nghiệm nhanh' — mọi tương tác của AI với hệ thống tiền thật phải đi qua lớp phê duyệt của con người.",
          "Never let an AI Agent directly access the capture/refund API on production under any circumstances, even for a 'quick test' — every AI interaction with the real-money system must pass through a human approval layer.",
          "いかなる状況であっても、「簡単なテスト」のためであっても、AIエージェントが本番環境のcapture/refund APIに直接アクセスすることを許可してはいけません — 実際のお金を扱うシステムへのAIのすべてのやり取りは、人間による承認レイヤーを経由しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "13. Góc phỏng vấn", en: "13. Interview corner", ja: "13. 面接コーナー" },
      blocks: [
        QA(
          "Phân biệt authorization (hold) và capture trong domain thẻ tín dụng, và tại sao sự khác biệt này quan trọng với QA?",
          "Distinguish authorization (hold) from capture in the credit card domain, and why does this difference matter to QA?",
          "Authorization/hold là bước giữ chỗ tạm thời một khoản tiền trong hạn mức khách hàng, CHƯA thực sự trừ tiền; capture là bước THỰC SỰ trừ tiền, xảy ra khi merchant hoàn tất giao hàng/dịch vụ. Với QA, sự khác biệt này quan trọng vì oracle của hai bước khác nhau: test hold phải kiểm tra hạn mức khả dụng bị giảm tạm thời, còn test capture phải kiểm tra bút toán ghi kép thực sự và quan hệ capture ≤ hold.",
          "Authorization/hold is the step that temporarily reserves an amount within the customer's limit, WITHOUT actually debiting funds; capture is the step that ACTUALLY debits, occurring when the merchant completes delivery/service. For QA, this difference matters because the oracle for each step differs: hold tests must check the temporarily-reduced available limit, while capture tests must check the actual double-entry ledger and the capture ≤ hold relationship.",
          "クレジットカードドメインにおける与信(ホールド)とキャプチャを区別し、なぜこの違いがQAにとって重要なのか説明してください。",
          "与信/ホールドは、顧客の限度額内で一時的に金額を予約するステップであり、まだ実際には引き落とされません。キャプチャは、加盟店が配送/サービスを完了した際に発生する、実際に引き落とすステップです。QAにとってこの違いが重要なのは、各ステップのオラクルが異なるためです。ホールドのテストは一時的に減少した利用可能枠を確認しなければならず、キャプチャのテストは実際の複式記帳とcapture ≤ hold関係を確認しなければなりません。"
        ),
        QA(
          "Nếu phát hiện tỉ lệ chargeback vượt 1% theo quy định Visa, QA có vai trò gì trong việc điều tra và ngăn chặn?",
          "If the chargeback ratio exceeds Visa's 1% threshold, what role does QA play in investigating and preventing it?",
          "QA nên rà soát log các giao dịch bị chargeback gần nhất để tìm mẫu số chung (ví dụ: một merchant cụ thể, một loại hàng hoá cụ thể, hoặc một lỗi kỹ thuật khiến khách không nhận ra giao dịch trên sao kê). Đồng thời, QA cần kiểm tra lại bộ test hiện có có phủ đủ các ca liên quan tới trải nghiệm minh bạch giao dịch (ví dụ tên merchant hiển thị trên sao kê) hay không, vì nhiều chargeback xuất phát từ việc khách không nhận ra giao dịch chứ không phải gian lận thật.",
          "QA should review logs of recent chargeback transactions to find common patterns (e.g. a specific merchant, a specific goods category, or a technical bug causing customers not to recognize the transaction on their statement). QA should also verify whether existing tests adequately cover cases related to transaction-transparency UX (e.g. merchant name shown on the statement), since many chargebacks stem from customers not recognizing a transaction rather than actual fraud.",
          "チャージバック比率がVisaの規定する1%を超えた場合、QAはその調査と防止にどのような役割を果たしますか？",
          "QAは、最近のチャージバック取引のログを見直し、共通のパターン(例: 特定の加盟店、特定の商品カテゴリ、または顧客が明細書上で取引を認識できない技術的バグ)を見つけるべきです。同時に、QAは既存のテストが取引の透明性に関するUX(例: 明細書に表示される加盟店名)を十分にカバーしているかを確認する必要があります。多くのチャージバックは実際の不正ではなく、顧客が取引を認識できないことに起因するためです。"
        ),
        QA(
          "Bạn thiết kế test cho tính năng partial capture như thế nào để đảm bảo không có lỗ hổng cộng dồn?",
          "How would you design tests for partial capture to ensure no accumulation loophole exists?",
          "Tôi sẽ viết ca kiểm thử capture nhiều lần liên tiếp trên cùng một hold (ví dụ 3 lần capture một phần cộng lại), và assert rằng SAU MỖI LẦN capture, tổng capturedAmount tích luỹ không bao giờ vượt holdAmount ban đầu — kể cả khi từng lần capture riêng lẻ đều hợp lệ nhưng tổng cộng dồn thì vượt. Đây là lỗ hổng dễ bị bỏ sót nếu chỉ test từng request capture độc lập mà không tính cộng dồn.",
          "I would write a test that performs multiple sequential captures on the same hold (e.g. 3 partial captures summed together), and assert that AFTER EACH capture, the accumulated capturedAmount never exceeds the original holdAmount — even when each individual capture is valid on its own but the cumulative total exceeds it. This is a loophole easily missed if only testing each capture request in isolation without accounting for accumulation.",
          "部分キャプチャ機能について、累積の抜け穴がないことを保証するためにどのようにテストを設計しますか？",
          "同じホールドに対して複数回連続してキャプチャを行うテスト(例: 3回の部分キャプチャの合計)を書き、各キャプチャの後に、累積capturedAmountが元のholdAmountを決して超えないことをアサートします — 個々のキャプチャはそれぞれ単独では有効でも、累積合計が超過する場合があるためです。これは、累積を考慮せずに各キャプチャリクエストを個別にテストするだけでは見落としやすい抜け穴です。"
        ),
        SCEN(
          "Phỏng vấn mock: Interviewer hỏi 'Một khách hàng khiếu nại bị trừ tiền 2 lần cho cùng 1 đơn hàng thuê xe. Bạn sẽ điều tra theo quy trình nào?'",
          "Mock interview: the interviewer asks 'A customer complains of being charged twice for the same car rental order. What process would you use to investigate?'",
          "Trả lời mẫu: Đầu tiên tôi truy vấn LedgerEntry theo orderId để xem có bao nhiêu bút toán CAPTURE được ghi nhận và với transactionId nào — nếu có 2 transactionId khác nhau nghĩa là 2 lần cấp phép riêng biệt (có thể do double-click ở tầng UI), còn nếu cùng 1 transactionId mà có 2 bút toán capture thì là lỗi idempotency ở tầng service. Sau đó tôi kiểm tra log request gốc xem có retry nào xảy ra không, và cuối cùng viết một test tái hiện chính xác chuỗi sự kiện để xác nhận nguyên nhân gốc trước khi đề xuất hoàn tiền và fix.",
          "Sample answer: First I'd query LedgerEntry by orderId to see how many CAPTURE entries were recorded and under which transactionId — if there are 2 different transactionIds, it means 2 separate authorizations (possibly a UI double-click), whereas if it's the same transactionId with 2 capture entries, it's an idempotency bug at the service layer. Then I'd check the original request logs for any retries, and finally write a test that reproduces the exact event sequence to confirm the root cause before proposing a refund and a fix.",
          "モック面接: 面接官が「顧客が同じレンタカー注文で二重に請求されたと苦情を言っています。どのような手順で調査しますか？」と質問します。",
          "回答例: まずorderIdでLedgerEntryを照会し、いくつのCAPTUREレコードがどのtransactionIdで記録されているかを確認します — 2つの異なるtransactionIdがあれば2回の別々の与信(UIでのダブルクリックの可能性)を意味し、同じtransactionIdで2件のキャプチャ記帳があればサービス層の冪等性バグです。次に元のリクエストログに再試行がなかったか確認し、最後に正確なイベントシーケンスを再現するテストを書いて根本原因を確認してから、返金と修正を提案します。"
        ),
      ],
    },
    {
      heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
      blocks: [
        P(
          "Bài này đã xây dựng chiến lược kiểm thử toàn diện cho luồng cấp phép, quyết toán, và tranh chấp thẻ tín dụng, với trọng tâm là các bất biến hold/capture và tính đúng đắn của bút toán ghi kép. Điểm mấu chốt: mọi ca kiểm thử giá trị cao phải trả lời được câu hỏi 'quan hệ giữa hold và capture có còn đúng không' sau mỗi thao tác, bất kể giao diện hiển thị gì.",
          "This article has built a comprehensive test strategy for the credit card authorization, settlement, and dispute flow, focused on hold/capture invariants and double-entry ledger correctness. The key takeaway: every high-value test case must answer 'does the hold/capture relationship still hold' after each operation, regardless of what the UI displays.",
          "この記事では、クレジットカードの与信・決済・紛争フローに対する包括的なテスト戦略を構築し、hold/capture不変条件と複式台帳の正確性に焦点を当てました。重要なポイントは、価値の高いすべてのテストケースが、UIが何を表示していようとも、各操作後に「hold/capture関係がまだ成り立っているか」という問いに答えなければならないということです。"
        ),
        H("Checklist bàn giao trước khi lên production", "Handover checklist before going to production", "本番リリース前の引き継ぎチェックリスト"),
        UL(
          [
            "Toàn bộ ca P0 (hold≤hạn mức, capture≤hold, idempotency, đối soát) PASS 100% trên CI.",
            "Job đối soát card scheme đã được test với ca cố tình gây lệch (giao dịch chỉ có ở một bên) theo cả hai chiều.",
            "Ca auth expiry đã được test bằng kỹ thuật giả lập thời gian, không phụ thuộc chờ thật 7 ngày.",
            "Luồng dispute/chargeback đã được test đủ các trạng thái: mở case, điều tra, thắng, thua.",
            "Tài liệu ranh giới trách nhiệm AI Agent trong phân loại dispute đã được review bởi trưởng nhóm QA và đại diện vận hành thẻ.",
          ],
          [
            "All P0 cases (hold≤limit, capture≤hold, idempotency, reconciliation) PASS 100% in CI.",
            "The card scheme reconciliation job has been tested with an intentionally injected mismatch (transaction present on only one side) in both directions.",
            "The auth expiry case has been tested using the time-simulation technique, not depending on waiting a real 7 days.",
            "The dispute/chargeback flow has been tested across all states: case opened, under investigation, won, lost.",
            "The AI Agent responsibility-boundary document for dispute classification has been reviewed by the QA lead and a card operations representative.",
          ],
          [
            "すべてのP0ケース(hold≤限度額、capture≤hold、冪等性、突合)がCIで100%合格していること。",
            "カード組織との突合ジョブが、意図的に注入した不一致(片側のみに存在する取引)で両方向についてテストされていること。",
            "与信失効ケースが、実際に7日間待つことに依存せず、時間シミュレーション技法を用いてテストされていること。",
            "紛争・チャージバックフローが、ケース開設・調査中・勝訴・敗訴のすべての状態にわたってテストされていること。",
            "紛争分類におけるAIエージェントの責任境界文書が、QAリードとカード運用担当者によってレビューされていること。",
          ]
        ),
        TIP(
          "Trước khi ký duyệt, tự hỏi: 'Nếu một khách hàng bị capture vượt hold 500.000đ mà không ai phát hiện trong 1 tuần, tổn thất uy tín và tài chính lớn tới đâu?' — câu trả lời chính là lý do domain thẻ luôn cần test tài chính nghiêm ngặt hơn test giao diện.",
          "Before signing off, ask yourself: 'If a customer was captured 500,000 VND over their hold and nobody noticed for a week, how large would the reputational and financial damage be?' — the answer is exactly why the card domain always needs stricter financial testing than UI testing.",
          "承認前に自問してください。「顧客が50万ドン分ホールドを超えてキャプチャされ、1週間誰も気づかなかった場合、評判と財務上の損害はどれほど大きいか？」— その答えこそが、カードドメインが常にUIテストよりも厳格な財務テストを必要とする理由です。"
        ),
      ],
    },
  ];

  return {
    categorySlug: "enterprise-realworld",
    slug: "banking-card-auth-settlement-chargeback",
    cover: thumb,
    tags: tags("thucchien", "banking", "api", "playwright", "mocking", "realworld"),
    title: {
      vi: "Thực chiến ngân hàng: cấp phép, quyết toán & tranh chấp giao dịch thẻ tín dụng",
      en: "Banking real-world: card authorization, settlement & chargeback dispute",
      ja: "銀行実戦: クレジットカードの与信・決済・チャージバック紛争",
    },
    summary: {
      vi: "Bài toán thực chiến thẻ tín dụng: cấp phép (hold), quyết toán (capture toàn phần/một phần), hoàn tiền & tranh chấp (chargeback), đối soát với tổ chức thẻ — kiểm thử theo bất biến hold≤hạn mức, capture≤hold, double-entry, idempotency.",
      en: "A real-world credit card problem: authorization (hold), settlement (full/partial capture), refund & dispute (chargeback), reconciliation with the card scheme — tested against hold≤limit, capture≤hold, double-entry and idempotency invariants.",
      ja: "クレジットカードの実戦課題: 与信(ホールド)、決済(全額・部分キャプチャ)、返金・紛争(チャージバック)、カード組織との突合 — hold≤限度額、capture≤hold、複式記帳、冪等性の不変条件に基づくテスト。",
    },
    pages: buildDoc(pages),
  };
}
const art2 = buildArt2();

// ============================================================================
// BÀI 3/4 — fintech-ewallet-payout-partner-recon
// ============================================================================
function buildArt3() {
  const thumb = makeThumb({ id: "tc01art3", domain: "fintech", kind: "thucchien", label: "実戦 · WALLET PAYOUT & RECON" });

  const svgArch3 = `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="380" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc rút tiền ví ra ngân hàng & đối soát đối tác · Wallet payout &amp; partner reconciliation</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="24" y="54" width="108" height="46" rx="9" fill="#1e293b"/><text x="78" y="74" fill="#93c5fd">App Ví</text><text x="78" y="90" fill="#64748b" font-size="9.5">lệnh rút tiền</text>
<rect x="164" y="54" width="118" height="46" rx="9" fill="#1e293b"/><text x="223" y="74" fill="#93c5fd">Payout Service</text><text x="223" y="90" fill="#64748b" font-size="9.5">kiểm tra số dư · khoá tiền</text>
<rect x="314" y="30" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="373" y="54" fill="#fcd34d">Payment Partner Gateway</text>
<rect x="314" y="86" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="373" y="110" fill="#fcd34d">Ngân hàng nhận (Bank B)</text>
<rect x="464" y="54" width="118" height="46" rx="9" fill="#1e3a2f"/><text x="523" y="74" fill="#86efac">Callback Handler</text><text x="523" y="90" fill="#64748b" font-size="9.5">webhook bất đồng bộ</text>
<rect x="614" y="54" width="86" height="46" rx="9" fill="#1e293b"/><text x="657" y="74" fill="#c4b5fd">Recon Engine</text><text x="657" y="90" fill="#64748b" font-size="9.5">đối soát cuối ngày</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M132 77 H164" marker-end="url(#wa)"/><path d="M282 68 C296 68 296 50 314 50" marker-end="url(#wa)"/><path d="M282 86 C296 86 296 106 314 106" marker-end="url(#wa)"/><path d="M432 50 C448 50 448 68 464 68" marker-end="url(#wa)"/><path d="M582 77 H614" marker-end="url(#wa)"/></g>
<defs><marker id="wa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<rect x="24" y="150" width="672" height="70" rx="10" fill="#111c30"/>
<text x="40" y="174" font-size="12.5" fill="#93c5fd" font-weight="700">Đồng bộ: kiểm tra số dư, khoá (lock) tiền trong ví ngay khi khách bấm rút. Bất đồng bộ: đối tác xử lý lệnh, gửi callback thành công/thất bại sau vài giây tới vài giờ.</text>
<text x="40" y="196" font-size="12.5" fill="#64748b">Sync: check balance, lock wallet funds immediately on withdrawal request. Async: partner processes the payout, sends success/failure callback seconds to hours later.</text>
<rect x="24" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="40" y="260" font-size="12.5" font-weight="800" fill="#5eead4">Điểm khó kiểm thử · Hard-to-test</text>
<g font-size="11.5" fill="#cbd5e1"><text x="40" y="282">• Callback đến trễ, trùng, hoặc không bao giờ đến</text><text x="40" y="302">• Lệnh treo (PENDING) kéo dài không rõ trạng thái</text><text x="40" y="322">• Đối tác báo SUCCESS nhưng ví báo FAIL (lệch)</text><text x="40" y="342">• Số dư ví không được âm trong mọi tình huống</text></g>
<rect x="370" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="386" y="260" font-size="12.5" font-weight="800" fill="#fca5a5">Chiến lược · Strategy</text>
<g font-size="11.5" fill="#cbd5e1"><text x="386" y="282">• Mock đối tác trả callback có kiểm soát độ trễ</text><text x="386" y="302">• Test lệnh treo bằng job quét timeout chủ động</text><text x="386" y="322">• Assert số dư + trạng thái lệnh, không chỉ UI</text><text x="386" y="342">• Test đối soát cố tình gây lệch 2 chiều</text></g>
</svg>`;

  const svgBalance3 = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#f8fafc"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#0f172a">Vòng đời lệnh rút tiền 3.000.000đ: khoá tiền -&gt; gửi đối tác -&gt; callback -&gt; số dư cuối</text>
<g font-size="12">
<rect x="24" y="46" width="672" height="28" fill="#0f172a"/>
<text x="34" y="65" fill="#fff" font-weight="800">Bước</text><text x="270" y="65" fill="#fff" font-weight="800">Số dư khả dụng</text><text x="450" y="65" fill="#fff" font-weight="800">Số dư bị khoá (locked)</text><text x="620" y="65" fill="#fff" font-weight="800">Trạng thái lệnh</text>
<g fill="#334155" font-weight="600">
<rect x="24" y="74" width="672" height="24" fill="#eef2f7"/><text x="34" y="90">1. Trước khi rút</text><text x="270" y="90">10.000.000</text><text x="450" y="90">0</text><text x="620" y="90">—</text>
<text x="34" y="114">2. Khoá tiền khi tạo lệnh</text><text x="270" y="114">7.000.000</text><text x="450" y="114">3.000.000</text><text x="620" y="114">PROCESSING</text>
<rect x="24" y="122" width="672" height="24" fill="#eef2f7"/><text x="34" y="138">3a. Callback SUCCESS</text><text x="270" y="138">7.000.000</text><text x="450" y="138">0</text><text x="620" y="138">SUCCESS</text>
<text x="34" y="162">3b. Callback FAILED (thay thế)</text><text x="270" y="162">10.000.000</text><text x="450" y="162">0</text><text x="620" y="162">FAILED (hoàn tiền)</text>
</g></g>
<rect x="24" y="186" width="672" height="30" rx="6" fill="#dcfce7"/><text x="40" y="206" font-size="13" font-weight="800" fill="#166534">Bất biến: số dư khả dụng + số dư bị khoá = tổng số dư ví không đổi (trừ phí) · số dư không bao giờ âm.</text>
<text x="24" y="240" font-size="12.5" fill="#475569">Nếu KHÔNG có callback nào đến trong SLA 30 phút, job quét timeout phải chủ động truy vấn đối tác hoặc tự động hoàn tiền — không được để lệnh PROCESSING vĩnh viễn.</text>
<text x="24" y="264" font-size="12.5" fill="#7c3aed" font-weight="700">Test payout phải luôn kiểm tra: mọi lệnh, dù kết quả gì, cuối cùng đều có ĐÚNG MỘT trạng thái cuối và số dư khớp trạng thái đó.</text>
</svg>`;

  const svgMatrix3 = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Ma trận ca kiểm thử · Wallet payout &amp; reconciliation test matrix (trích)</text>
<g font-size="11.5">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="34" y="63" fill="#fff" font-weight="800">Nhóm</text><text x="150" y="63" fill="#fff" font-weight="800">Điều kiện</text><text x="440" y="63" fill="#fff" font-weight="800">Kết quả mong đợi</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="24" fill="#ede9fe"/><text x="34" y="88" fill="#16a34a">Happy</text><text x="150" y="88">Đủ số dư, đối tác callback SUCCESS trong 5s</text><text x="440" y="88">SUCCESS · số dư khả dụng giảm đúng số tiền + phí</text>
<text x="34" y="112" fill="#d97706">Boundary</text><text x="150" y="112">Rút đúng bằng số dư khả dụng</text><text x="440" y="112">SUCCESS · số dư còn 0</text>
<rect x="24" y="120" width="672" height="24" fill="#ede9fe"/><text x="34" y="136" fill="#dc2626">Negative</text><text x="150" y="136">Số tiền rút &gt; số dư khả dụng</text><text x="440" y="136">Chặn ngay tại bước tạo lệnh · không khoá tiền</text>
<text x="34" y="160" fill="#dc2626">Negative</text><text x="150" y="160">Vượt hạn mức rút/ngày theo KYC</text><text x="440" y="160">Chặn · gợi ý nâng cấp KYC</text>
<rect x="24" y="168" width="672" height="24" fill="#ede9fe"/><text x="34" y="184" fill="#2563eb">Failure</text><text x="150" y="184">Đối tác timeout, không callback trong 30 phút</text><text x="440" y="184">Job quét timeout truy vấn chủ động · tự hoàn nếu vẫn không rõ</text>
<text x="34" y="208" fill="#2563eb">Failure</text><text x="150" y="208">Callback đến 2 lần cho cùng 1 lệnh (duplicate webhook)</text><text x="440" y="208">Chỉ xử lý 1 lần · lần 2 bị bỏ qua có kiểm soát</text>
<rect x="24" y="216" width="672" height="24" fill="#ede9fe"/><text x="34" y="232" fill="#7c3aed">Idempotency</text><text x="150" y="232">Gửi lại lệnh rút cùng requestId do app retry</text><text x="440" y="232">Chỉ 1 lệnh được tạo · không khoá tiền 2 lần</text>
<text x="34" y="256" fill="#7c3aed">Race</text><text x="150" y="256">2 lệnh rút đồng thời cộng dồn &gt; số dư</text><text x="440" y="256">Chỉ 1 lệnh được chấp nhận · lệnh kia bị từ chối do khoá tiền tuần tự</text>
<rect x="24" y="264" width="672" height="24" fill="#ede9fe"/><text x="34" y="280" fill="#0891b2">Recon</text><text x="150" y="280">Ví báo SUCCESS, đối tác báo FAIL trong file cuối ngày</text><text x="440" y="280">Đối soát phát hiện lệch · giữ tiền · mở case điều tra</text>
<text x="34" y="304" fill="#0891b2">State</text><text x="150" y="304">Truy vấn trạng thái lệnh bất kỳ lúc nào</text><text x="440" y="304">Đúng 1 trong: PROCESSING/SUCCESS/FAILED/REFUNDED</text>
</g></g>
<text x="24" y="326" font-size="12" fill="#6d28d9" font-weight="700">Nhóm Race/Idempotency/Recon là nơi các bug nghiêm trọng nhất của hệ ví thường ẩn nấp.</text>
</svg>`;

  const pages = [
    {
      heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. ビジネス背景と範囲" },
      blocks: [
        P(
          "Bạn là QA Lead tại MoMoPay-like Wallet — ví điện tử phục vụ khoảng 15 triệu người dùng hoạt động hàng tháng, xử lý trung bình 900.000 lệnh rút tiền (payout) từ ví ra tài khoản ngân hàng mỗi ngày, với tổng giá trị khoảng 1.100 tỷ đồng/ngày. Các lệnh rút được định tuyến qua 6 đối tác cổng thanh toán khác nhau tuỳ ngân hàng đích, và SLA cam kết với người dùng là 95% lệnh hoàn tất trong vòng 2 phút. Quý này, đội kỹ thuật mở rộng thêm 2 đối tác cổng thanh toán mới để tăng tỉ lệ thành công cho các ngân hàng nhỏ, kéo theo yêu cầu kiểm thử lại toàn bộ luồng đối soát cuối ngày.",
          "You are the QA Lead at a MoMoPay-like Wallet — an e-wallet serving about 15 million monthly active users, processing an average of 900,000 payout requests from wallet to bank account per day, with a total value of roughly 1,100 billion VND/day. Payout requests are routed through 6 different payment gateway partners depending on the destination bank, and the SLA commitment to users is 95% of requests completing within 2 minutes. This quarter, the engineering team is adding 2 new gateway partners to improve success rates for smaller banks, requiring the entire end-of-day reconciliation flow to be retested.",
          "あなたはMoMoPayのようなウォレットのQAリードです。このEウォレットは月間約1,500万人のアクティブユーザーにサービスを提供し、ウォレットから銀行口座への出金(ペイアウト)リクエストを1日平均90万件、総額約1兆1千億ドン/日処理します。出金リクエストは、宛先銀行に応じて6つの異なる決済ゲートウェイパートナーを経由してルーティングされ、ユーザーへのSLA約束は95%のリクエストが2分以内に完了することです。今四半期、エンジニアリングチームは中小銀行への成功率を向上させるために2つの新しいゲートウェイパートナーを追加しており、日次突合フロー全体の再テストが必要になっています。"
        ),
        P(
          "Ràng buộc nghiệp vụ quan trọng nhất là: số dư ví của người dùng KHÔNG BAO GIỜ được âm dưới bất kỳ tình huống nào, kể cả khi có lỗi hệ thống hay callback trùng lặp từ đối tác. Ngân hàng Nhà nước yêu cầu ví điện tử phải đối soát khớp 100% với các đối tác thanh toán vào cuối mỗi ngày làm việc, và mọi khoản tiền 'treo' (không rõ trạng thái) quá 24 giờ phải được báo cáo lên hệ thống giám sát rủi ro. Một lỗi đặc biệt nguy hiểm trong domain ví là 'lệnh treo vĩnh viễn' — khi callback từ đối tác không bao giờ đến, khiến tiền bị khoá trong ví nhưng không rút được cũng không hoàn lại.",
          "The most critical business constraint is: a user's wallet balance must NEVER go negative under any circumstances, even with system errors or duplicate callbacks from partners. The central bank requires the e-wallet to reconcile 100% with payment partners at the end of every business day, and any 'stuck' funds (unclear state) beyond 24 hours must be reported to the risk-monitoring system. A particularly dangerous bug in the wallet domain is the 'permanently stuck order' — when a callback from the partner never arrives, leaving funds locked in the wallet, neither withdrawable nor refunded.",
          "最も重要な業務上の制約は、システムエラーやパートナーからの重複コールバックがあっても、いかなる状況でもユーザーのウォレット残高が絶対にマイナスになってはならないことです。中央銀行は、Eウォレットが毎営業日の終わりに決済パートナーと100%突合することを要求しており、24時間を超える「滞留」資金(状態が不明確)はすべてリスク監視システムに報告されなければなりません。ウォレットドメインで特に危険なバグは「永久に滞留した注文」です — パートナーからのコールバックが決して届かず、資金がウォレット内でロックされたまま、引き出すことも返金することもできなくなります。"
        ),
        H("Phạm vi tự động hoá của tài liệu này", "Scope of automation in this document", "本ドキュメントの自動化範囲"),
        UL(
          [
            "Luồng rút tiền đầu-cuối: kiểm tra số dư → khoá tiền → gọi cổng đối tác → xử lý callback bất đồng bộ → cập nhật số dư cuối.",
            "Xử lý lệnh treo/timeout: job quét chủ động, truy vấn trạng thái từ đối tác, tự động hoàn tiền khi vượt SLA.",
            "Đối soát cuối ngày với đối tác: so khớp file settlement, phát hiện lệch 2 chiều, mở case điều tra.",
            "Các ca đồng thời (concurrency): nhiều lệnh rút cùng lúc, chống race condition làm âm số dư.",
            "Tích hợp AI Agent hỗ trợ phân tích log lệnh treo và đề xuất ca kiểm thử cho đối tác mới.",
          ],
          [
            "The end-to-end withdrawal flow: balance check → lock funds → call partner gateway → handle async callback → update final balance.",
            "Handling stuck orders/timeouts: proactive scanning jobs, querying partner status, auto-refunding when SLA is exceeded.",
            "End-of-day reconciliation with partners: matching settlement files, detecting two-way mismatches, opening investigation cases.",
            "Concurrency cases: multiple simultaneous withdrawal requests, preventing race conditions that make the balance negative.",
            "AI Agent integration to help analyze stuck-order logs and suggest test cases for new partners.",
          ],
          [
            "エンドツーエンドの出金フロー: 残高チェック → 資金ロック → パートナーゲートウェイ呼び出し → 非同期コールバック処理 → 最終残高更新。",
            "滞留注文・タイムアウトの処理: 能動的なスキャンジョブ、パートナーへの状態問い合わせ、SLA超過時の自動返金。",
            "パートナーとの日次突合: 決済ファイルの照合、双方向の不一致検出、調査ケースの開設。",
            "並行処理ケース: 複数の同時出金リクエスト、残高がマイナスになるレースコンディションの防止。",
            "滞留注文ログの分析と新規パートナー向けテストケースの提案を支援するAIエージェントの統合。",
          ]
        ),
        NOTE(
          "Bài này thuộc LOẠI 'Thực chiến doanh nghiệp' (thucchien), tập trung vào domain ví điện tử — nơi tính bất đồng bộ và xử lý lệnh treo là thách thức kiểm thử lớn nhất.",
          "This article belongs to the 'Enterprise real-world' kind (thucchien), focused on the e-wallet domain — where asynchronicity and stuck-order handling are the biggest testing challenges.",
          "この記事は「実戦」種別(thucchien)に属し、電子ウォレットドメインに焦点を当てています。非同期性と滞留注文処理が最大のテスト課題です。"
        ),
      ],
    },
    {
      heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
      blocks: [
        P(
          "Luồng rút tiền từ ví ra ngân hàng là một trong những luồng bất đồng bộ điển hình nhất trong fintech: hành động của người dùng kết thúc gần như ngay lập tức trên UI, nhưng kết quả thực sự có thể đến sau vài giây, vài phút, hoặc đôi khi không bao giờ đến. QA phải thiết kế test để xử lý được toàn bộ dải thời gian phản hồi này, không chỉ trường hợp callback đến ngay.",
          "The wallet-to-bank withdrawal flow is one of the most classic asynchronous flows in fintech: the user's action ends almost immediately on the UI, but the actual result may arrive seconds, minutes, or sometimes never later. QA must design tests to handle this entire range of response times, not just the case where the callback arrives immediately.",
          "ウォレットから銀行への出金フローは、フィンテックにおいて最も典型的な非同期フローの1つです。ユーザーの操作はUI上でほぼ即座に終了しますが、実際の結果は数秒後、数分後、時には決して届かないこともあります。QAは、コールバックが即座に届くケースだけでなく、この応答時間の全範囲を処理できるようにテストを設計しなければなりません。"
        ),
        IMG(
          svgArch3,
          "Kiến trúc luồng rút tiền ví ra ngân hàng và đối soát với đối tác thanh toán, phân tách phần đồng bộ và callback bất đồng bộ.",
          "Wallet-to-bank payout and partner reconciliation flow architecture, separating the synchronous part from the asynchronous callback.",
          "ウォレットから銀行への出金とパートナー突合フローのアーキテクチャ。同期部分と非同期コールバックを分離しています。"
        ),
        P(
          "Khi người dùng bấm rút tiền, Payout Service ngay lập tức kiểm tra số dư khả dụng và KHOÁ (lock) số tiền tương ứng — số tiền này vẫn thuộc về ví người dùng nhưng không thể dùng cho giao dịch khác cho tới khi lệnh hoàn tất. Đây là bước đồng bộ, phải hoàn thành trong vài trăm mili-giây. Sau đó, Payout Service gửi yêu cầu tới Payment Partner Gateway phù hợp với ngân hàng đích, và trả về màn hình 'Đang xử lý' cho người dùng ngay lập tức.",
          "When a user taps withdraw, the Payout Service immediately checks the available balance and LOCKS the corresponding amount — this money still belongs to the user's wallet but cannot be used for another transaction until the order completes. This is a synchronous step that must complete within a few hundred milliseconds. The Payout Service then sends a request to the appropriate Payment Partner Gateway for the destination bank, and immediately returns a 'Processing' screen to the user.",
          "ユーザーが出金をタップすると、ペイアウトサービスは即座に利用可能残高を確認し、対応する金額をロックします — この資金はまだユーザーのウォレットに属していますが、注文が完了するまで他の取引には使用できません。これは数百ミリ秒以内に完了しなければならない同期ステップです。その後、ペイアウトサービスは宛先銀行に適した決済パートナーゲートウェイにリクエストを送信し、即座に「処理中」画面をユーザーに返します。"
        ),
        P(
          "Phần bất đồng bộ diễn ra khi đối tác xử lý lệnh chuyển tiền thực sự tới Bank B, và gửi callback (webhook) về Callback Handler khi có kết quả. Nếu SUCCESS, số tiền bị khoá được giải phóng khỏi ví (đã thực sự chuyển đi), trạng thái chuyển sang SUCCESS. Nếu FAILED, số tiền được hoàn lại vào số dư khả dụng, trạng thái chuyển sang FAILED. Vấn đề khó nhất là khi callback KHÔNG BAO GIỜ đến — một job quét nền phải chủ động truy vấn trạng thái từ đối tác hoặc tự động hoàn tiền sau khi vượt SLA 30 phút.",
          "The asynchronous part occurs when the partner actually processes the transfer to Bank B, and sends a callback (webhook) to the Callback Handler once there's a result. If SUCCESS, the locked funds are released from the wallet (truly transferred), state moves to SUCCESS. If FAILED, funds are returned to the available balance, state moves to FAILED. The hardest problem is when the callback NEVER arrives — a background scanning job must proactively query the partner's status or auto-refund once the 30-minute SLA is exceeded.",
          "非同期部分は、パートナーが実際にBank Bへの送金を処理し、結果が出たときにコールバックハンドラーにコールバック(webhook)を送信する際に発生します。SUCCESSの場合、ロックされた資金はウォレットから解放され(実際に送金済み)、状態はSUCCESSに移行します。FAILEDの場合、資金は利用可能残高に戻され、状態はFAILEDに移行します。最も難しい問題は、コールバックが決して届かない場合です — バックグラウンドスキャンジョブが、パートナーの状態を能動的に問い合わせるか、30分のSLAを超えたら自動的に返金しなければなりません。"
        ),
        WARN(
          "Không bao giờ thiết kế test chỉ chờ callback đến ngay lập tức. Luôn thêm ca 'callback không bao giờ đến' và xác nhận job quét timeout hoạt động đúng — đây là kịch bản thực tế xảy ra hàng ngày ở quy mô hàng trăm nghìn giao dịch.",
          "Never design tests that only wait for the callback to arrive immediately. Always add a 'callback never arrives' case and confirm the timeout-scanning job works correctly — this is a real scenario that happens daily at a scale of hundreds of thousands of transactions.",
          "コールバックが即座に届くことだけを待つテストを設計してはいけません。常に「コールバックが決して届かない」ケースを追加し、タイムアウトスキャンジョブが正しく機能することを確認してください — これは数十万件規模の取引で毎日実際に発生するシナリオです。"
        ),
      ],
    },
    {
      heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ", en: "3. Data model & business invariants", ja: "3. データモデルと業務不変条件" },
      blocks: [
        P(
          "Mô hình dữ liệu gồm WalletAccount (số dư khả dụng, số dư bị khoá), PayoutOrder (lệnh rút, có requestId duy nhất, amount, partnerId, trạng thái), và PartnerCallback (log mọi callback nhận được, kể cả callback trùng lặp, để phục vụ điều tra sau này). Hiểu đúng quan hệ giữa số dư khả dụng và số dư bị khoá là chìa khoá để định nghĩa oracle chính xác cho domain ví.",
          "The data model has WalletAccount (available balance, locked balance), PayoutOrder (the withdrawal order, with a unique requestId, amount, partnerId, state), and PartnerCallback (a log of every callback received, including duplicates, to support later investigation). Correctly understanding the relationship between available and locked balance is the key to defining a precise oracle for the wallet domain.",
          "データモデルには、WalletAccount(利用可能残高、ロック済み残高)、PayoutOrder(出金注文、一意のrequestId、amount、partnerId、状態を持つ)、PartnerCallback(後の調査を支援するため、重複を含むすべての受信コールバックのログ)があります。利用可能残高とロック済み残高の関係を正しく理解することが、ウォレットドメインの正確なオラクルを定義する鍵です。"
        ),
        IMG(
          svgBalance3,
          "Vòng đời số dư ví qua các bước khoá tiền, gửi đối tác, nhận callback, và số dư cuối cho cả 2 nhánh SUCCESS/FAILED.",
          "Wallet balance lifecycle across locking funds, sending to partner, receiving callback, and final balance for both SUCCESS/FAILED branches.",
          "資金ロック、パートナーへの送信、コールバック受信、SUCCESS/FAILED両方の分岐における最終残高に至るウォレット残高のライフサイクル。"
        ),
        H("Bốn bất biến phải đúng ở MỌI thời điểm", "Four invariants that must hold at ALL times", "常に成り立つべき4つの不変条件"),
        UL(
          [
            "Số dư không âm: số dư khả dụng của ví KHÔNG BAO GIỜ được nhỏ hơn 0, dù ở bất kỳ bước trung gian nào của lệnh rút.",
            "Bảo toàn tổng số dư: số dư khả dụng + số dư bị khoá = tổng số dư ví, không đổi trừ phi có phí giao dịch được trừ đúng quy định.",
            "Idempotency: cùng một requestId dù gửi lại bao nhiêu lần cũng chỉ tạo ĐÚNG MỘT lệnh rút và khoá tiền đúng một lần.",
            "Trạng thái cuối duy nhất: mỗi lệnh rút cuối cùng phải ở đúng một trong SUCCESS/FAILED/REFUNDED — không được 'treo' ở PROCESSING vô thời hạn.",
          ],
          [
            "Non-negative balance: a wallet's available balance must NEVER be less than 0, at any intermediate step of a withdrawal order.",
            "Total balance conservation: available balance + locked balance = total wallet balance, unchanged except for correctly deducted transaction fees.",
            "Idempotency: the same requestId, no matter how many times resent, creates EXACTLY ONE withdrawal order and locks funds exactly once.",
            "Single final state: every withdrawal order must eventually be in exactly one of SUCCESS/FAILED/REFUNDED — never 'stuck' at PROCESSING indefinitely.",
          ],
          [
            "残高の非負性: ウォレットの利用可能残高は、出金注文のどの中間ステップであっても、絶対に0未満になってはいけません。",
            "総残高の保全: 利用可能残高 + ロック済み残高 = ウォレット総残高であり、正しく控除された取引手数料を除いて変化しません。",
            "冪等性: 同じrequestIdを何回再送しても、作成される出金注文は正確に1件のみで、資金のロックも正確に1回のみです。",
            "単一の最終状態: すべての出金注文は最終的にSUCCESS/FAILED/REFUNDEDのいずれか1つの状態になり、PROCESSINGのまま無期限に「滞留」してはいけません。",
          ]
        ),
        WARN(
          "Đừng assert 'màn hình hiện Rút tiền thành công'. Hãy assert: số dư khả dụng + số dư bị khoá luôn bằng tổng ban đầu trừ phí, và mọi lệnh PROCESSING quá 30 phút phải chuyển sang trạng thái cuối (không được tồn tại lệnh PROCESSING quá hạn trong dữ liệu production).",
          "Don't assert 'screen shows Withdrawal successful'. Assert instead: available + locked balance always equals the original total minus fees, and every PROCESSING order older than 30 minutes must have transitioned to a final state (no overdue PROCESSING order should exist in production data).",
          "「画面に出金成功と表示される」とアサートしてはいけません。代わりに、利用可能残高+ロック済み残高が常に手数料控除後の元の合計と一致すること、そして30分を超えるすべてのPROCESSING注文が最終状態に遷移していること(本番データに期限切れのPROCESSING注文が存在してはいけない)をアサートしてください。"
        ),
      ],
    },
    {
      heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
      blocks: [
        P(
          "Rủi ro lớn nhất trong domain ví là 'số dư âm' và 'lệnh treo vĩnh viễn' — cả hai đều có thể xảy ra khi nhiều lệnh rút đồng thời chạm vào cùng một ví (race condition) hoặc khi đối tác không phản hồi. Đội QA xếp cả hai vào mức 'Nghiêm trọng' vì tần suất xảy ra tăng mạnh vào giờ cao điểm (lương về, cuối tháng), còn hậu quả là mất niềm tin người dùng và vi phạm quy định của Ngân hàng Nhà nước về đối soát.",
          "The biggest risk in the wallet domain is 'negative balance' and 'permanently stuck orders' — both can occur when multiple withdrawal requests hit the same wallet simultaneously (race condition) or when the partner doesn't respond. The QA team ranks both 'Critical' because frequency spikes during peak hours (payday, month-end), and consequences include loss of user trust and violation of central bank reconciliation regulations.",
          "ウォレットドメインにおける最大のリスクは「残高マイナス」と「永久に滞留した注文」です。両方とも、複数の出金リクエストが同時に同じウォレットに達する場合(レースコンディション)や、パートナーが応答しない場合に発生し得ます。QAチームは両方を「重大」に格付けします。給料日や月末などのピーク時に頻度が急増し、結果にはユーザーの信頼喪失と中央銀行の突合規制違反が含まれるためです。"
        ),
        H("Kim tự tháp kiểm thử áp dụng cho luồng ví", "Test pyramid applied to the wallet flow", "ウォレットフローに適用するテストピラミッド"),
        UL(
          [
            "Unit test (~50%): hàm tính số dư khả dụng sau khoá tiền, hàm sinh requestId idempotent, hàm kiểm tra hạn mức KYC.",
            "Integration/API test (~40%): luồng khoá tiền-gọi đối tác-callback với mock gateway, job quét timeout, batch đối soát.",
            "E2E/load test (~10%): kịch bản rút tiền thật trên staging kèm mô phỏng tải cao bằng k6 vào giờ cao điểm giả lập.",
          ],
          [
            "Unit tests (~50%): available-balance-after-lock calculation, idempotent requestId generation, KYC limit checking functions.",
            "Integration/API tests (~40%): lock-call partner-callback flow with a mocked gateway, timeout scanning job, reconciliation batch.",
            "E2E/load tests (~10%): a real withdrawal scenario on staging combined with high-load simulation via k6 for a simulated peak hour.",
          ],
          [
            "ユニットテスト(約50%): ロック後の利用可能残高計算、冪等なrequestId生成、KYC限度額チェック関数。",
            "統合・APIテスト(約40%): モックゲートウェイを用いたロック・パートナー呼び出し・コールバックフロー、タイムアウトスキャンジョブ、突合バッチ。",
            "E2E・負荷テスト(約10%): ステージング環境での実際の出金シナリオと、シミュレートされたピーク時のk6による高負荷シミュレーションの組み合わせ。",
          ]
        ),
        P(
          "Chiến lược kiểm thử đặc biệt chú trọng vào k6 để mô phỏng tải đồng thời cao — vì lỗi 'race condition làm âm số dư' chỉ lộ diện khi có đủ nhiều request cạnh tranh cùng lúc vào cùng một tài khoản, điều mà test tuần tự thông thường không bao giờ phát hiện được. Đội QA chạy kịch bản 50 request rút tiền đồng thời trên cùng 1 ví mỗi đêm trong pipeline CI để phát hiện sớm hồi quy.",
          "The test strategy places special emphasis on k6 to simulate high concurrent load — because the 'race condition causing negative balance' bug only surfaces when enough competing requests hit the same account simultaneously, something ordinary sequential tests never detect. The QA team runs a scenario of 50 concurrent withdrawal requests on the same wallet every night in the CI pipeline to catch regressions early.",
          "テスト戦略は、高い並行負荷をシミュレートするk6に特に重点を置いています。「残高をマイナスにするレースコンディション」バグは、十分な数の競合するリクエストが同時に同じ口座に達したときにのみ表面化するものであり、通常の逐次テストでは決して検出できないためです。QAチームは、回帰を早期に発見するため、CIパイプラインで毎晩同じウォレットに対する50件の同時出金リクエストのシナリオを実行しています。"
        ),
      ],
    },
    {
      heading: { vi: "5. Test Plan (entry/exit, môi trường, dữ liệu)", en: "5. Test Plan (entry/exit, environment, data)", ja: "5. テスト計画（開始・終了基準、環境、データ）" },
      blocks: [
        P(
          "Entry Criteria yêu cầu: mock cho cả 6 đối tác cổng thanh toán đã sẵn sàng với khả năng cấu hình độ trễ và kết quả callback, môi trường staging có k6 script chuẩn cho kịch bản tải cao. Exit Criteria yêu cầu: 100% ca P0 (số dư không âm, idempotency, xử lý timeout, đối soát) PASS, và kịch bản 50 request đồng thời không phát hiện số dư âm trong 20 lần chạy liên tiếp.",
          "Entry Criteria requires: mocks for all 6 payment gateway partners are ready with configurable latency and callback outcomes, the staging environment has a standard k6 script for the high-load scenario. Exit Criteria requires: 100% of P0 cases (non-negative balance, idempotency, timeout handling, reconciliation) PASS, and the 50-concurrent-request scenario detects no negative balance across 20 consecutive runs.",
          "開始基準(エントリークライテリア)は、6つすべての決済ゲートウェイパートナーのモックが設定可能な遅延とコールバック結果とともに準備されていること、ステージング環境が高負荷シナリオ用の標準k6スクリプトを持っていることを要求します。終了基準は、P0ケース(残高非負性、冪等性、タイムアウト処理、突合)の100%合格、そして50件同時リクエストのシナリオが20回連続実行でマイナス残高を検出しないことを要求します。"
        ),
        H("Môi trường & vai trò", "Environment & roles", "環境と役割分担"),
        UL(
          [
            "Môi trường staging với mock cho 6 đối tác, mỗi mock cấu hình được độ trễ callback (0s-2 giờ) và tỉ lệ SUCCESS/FAILED.",
            "Bộ dữ liệu ví test với các mức số dư khác nhau (0, đúng hạn mức, vượt hạn mức) để phủ boundary.",
            "Vai trò: 2 QA Automation cho luồng payout, 1 Performance Engineer phụ trách kịch bản k6, 1 Data Analyst kiểm tra báo cáo đối soát.",
            "Chỉ số theo dõi: tỉ lệ lệnh SUCCESS trong SLA 2 phút, số lệnh PROCESSING quá hạn mỗi ngày, tỉ lệ lệch đối soát.",
          ],
          [
            "A staging environment with mocks for 6 partners, each configurable for callback latency (0s-2 hours) and SUCCESS/FAILED ratio.",
            "A test wallet dataset with various balance levels (0, at limit, over limit) to cover boundaries.",
            "Roles: 2 QA Automation engineers for the payout flow, 1 Performance Engineer for the k6 scenario, 1 Data Analyst checking reconciliation reports.",
            "Tracked metrics: SUCCESS rate within the 2-minute SLA, number of overdue PROCESSING orders per day, reconciliation mismatch rate.",
          ],
          [
            "6つのパートナーのモックを持つステージング環境で、それぞれコールバック遅延(0秒〜2時間)とSUCCESS/FAILED比率を設定可能。",
            "境界値をカバーするための様々な残高レベル(0、限度額ちょうど、限度額超過)を持つテストウォレットデータセット。",
            "役割分担: 出金フロー担当のQA自動化2名、k6シナリオ担当のパフォーマンスエンジニア1名、突合レポート確認担当のデータアナリスト1名。",
            "追跡指標: 2分SLA内のSUCCESS率、1日あたりの期限超過PROCESSING注文数、突合不一致率。",
          ]
        ),
        NOTE(
          "Dữ liệu test phải phủ đủ dải độ trễ callback (tức thời, vài phút, vượt SLA, không bao giờ đến) để đảm bảo job quét timeout được kiểm thử đầy đủ, không chỉ trường hợp callback đến ngay.",
          "Test data must cover the full range of callback latencies (instant, minutes, exceeding SLA, never arriving) to ensure the timeout scanning job is fully tested, not just the instant-callback case.",
          "テストデータは、タイムアウトスキャンジョブが十分にテストされることを保証するため、コールバック遅延の全範囲(即時、数分、SLA超過、決して届かない)をカバーする必要があります。即時コールバックのケースだけではありません。"
        ),
      ],
    },
    {
      heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
      blocks: [
        P(
          "Ma trận ca kiểm thử áp dụng equivalence partitioning cho các mức số dư (0, dưới hạn mức, đúng hạn mức, vượt hạn mức), boundary value analysis cho ranh giới thời gian callback (29 phút 59 giây / 30 phút / 30 phút 1 giây so với SLA), và decision table cho tổ hợp callback (SUCCESS/FAILED/timeout/duplicate).",
          "The test case matrix applies equivalence partitioning for balance levels (0, under limit, at limit, over limit), boundary value analysis for callback timing boundaries (29 minutes 59 seconds / 30 minutes / 30 minutes 1 second against the SLA), and decision tables for callback combinations (SUCCESS/FAILED/timeout/duplicate).",
          "テストケースマトリクスは、残高レベル(0、限度額未満、限度額ちょうど、限度額超過)の同値分割、SLAに対するコールバックタイミング境界(29分59秒／30分／30分1秒)の境界値分析、コールバックの組み合わせ(SUCCESS/FAILED/タイムアウト/重複)のデシジョンテーブルを適用します。"
        ),
        IMG(
          svgMatrix3,
          "Ma trận thiết kế ca kiểm thử cho luồng rút tiền ví và đối soát đối tác, trích các nhóm happy/boundary/negative/race/recon.",
          "Test case design matrix for the wallet payout and partner reconciliation flow, showing happy/boundary/negative/race/recon groups.",
          "ウォレット出金とパートナー突合フローのテストケース設計マトリクス。ハッピーパス・境界値・ネガティブ・レース・突合のグループを抜粋。"
        ),
        TIP(
          "Luôn thêm ca 'race condition' vào ma trận: tạo 2-3 lệnh rút đồng thời trên cùng một ví có số dư chỉ đủ cho 1 lệnh, và assert rằng chỉ đúng 1 lệnh được chấp nhận — đây là ca dễ bị bỏ sót nhất nhưng gây hậu quả nghiêm trọng nhất.",
          "Always add a 'race condition' case to the matrix: create 2-3 concurrent withdrawal requests on the same wallet with a balance sufficient for only 1 order, and assert that exactly 1 order is accepted — this is the most commonly missed case yet the most severe in consequence.",
          "マトリクスに常に「レースコンディション」ケースを追加してください。1件分の注文にしか十分でない残高を持つ同じウォレットに対して2〜3件の同時出金リクエストを作成し、正確に1件の注文のみが受理されることをアサートします — これは最も見落とされやすいケースですが、結果は最も深刻です。"
        ),
      ],
    },
    {
      heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
      blocks: [
        P(
          "Bộ API test-only gồm: POST /test/seed/wallet để tạo ví test với số dư định sẵn, POST /test/mock/partner để cấu hình độ trễ và kết quả callback cho một đối tác cụ thể, và POST /test/trigger-callback để chủ động gửi callback giả lập (kể cả callback trùng lặp) phục vụ test duplicate webhook mà không cần chờ đối tác thật.",
          "The test-only API suite includes: POST /test/seed/wallet to create a test wallet with a predefined balance, POST /test/mock/partner to configure latency and callback outcome for a specific partner, and POST /test/trigger-callback to proactively send a simulated callback (including duplicates) for testing duplicate webhooks without waiting for the real partner.",
          "テスト専用APIスイートには、事前定義された残高でテストウォレットを作成するPOST /test/seed/wallet、特定のパートナーの遅延とコールバック結果を設定するPOST /test/mock/partner、実際のパートナーを待たずに重複webhookをテストするためにシミュレートされたコールバック(重複を含む)を能動的に送信するPOST /test/trigger-callbackが含まれます。"
        ),
        CODE(
          "bash",
          `# Seed một ví test với số dư 10.000.000đ
curl -X POST https://staging.wallet.local/test/seed/wallet \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "walletId": "WAL-TEST-0001", "availableBalance": 10000000 }'

# Cấu hình mock đối tác trả callback SUCCESS sau 3 giây
curl -X POST https://staging.wallet.local/test/mock/partner \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "partnerId": "PARTNER-B", "outcome": "SUCCESS", "delaySeconds": 3 }'

# Chủ động gửi lại cùng 1 callback để test chống trùng lặp
curl -X POST https://staging.wallet.local/test/trigger-callback \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "orderId": "PO-9001", "outcome": "SUCCESS", "duplicate": true }'`
        ),
        WARN(
          "API /test/trigger-callback phải kiểm tra chữ ký (signature) giống hệt callback thật để test có giá trị đại diện cho luồng production — nếu bỏ qua bước xác thực chữ ký, test sẽ pass giả tạo và không phát hiện được lỗ hổng bảo mật webhook.",
          "The /test/trigger-callback API must verify the signature exactly like a real callback so the test validly represents the production flow — skipping signature verification makes tests pass artificially and fails to catch webhook security vulnerabilities.",
          "/test/trigger-callback APIは、テストが本番フローを有効に代表するように、実際のコールバックとまったく同じように署名を検証しなければなりません — 署名検証をスキップすると、テストが人為的に合格してしまい、webhookのセキュリティ脆弱性を検出できなくなります。"
        ),
      ],
    },
    {
      heading: { vi: "8. Automation happy path (POM/fixtures)", en: "8. Happy-path automation (POM/fixtures)", ja: "8. ハッピーパスの自動化（POM／フィクスチャ）" },
      blocks: [
        P(
          "Với luồng rút tiền có giao diện app, đội QA dùng POM để tách thao tác nhập số tiền và chọn ngân hàng khỏi assertion số dư. Fixture chuẩn bị ví với số dư xác định và mock đối tác trả về SUCCESS với độ trễ ngắn trước khi test chạy.",
          "For the withdrawal flow with an app UI, the QA team uses POM to separate amount-entry and bank-selection actions from balance assertions. A fixture prepares a wallet with a defined balance and mocks the partner to return SUCCESS with short latency before the test runs.",
          "アプリUIを持つ出金フローでは、QAチームはPOMを使用して金額入力と銀行選択の操作を残高アサーションから分離します。フィクスチャは、テスト実行前に定義された残高を持つウォレットを準備し、パートナーが短い遅延でSUCCESSを返すようモックします。"
        ),
        CODE(
          "typescript",
          `// pages/withdraw.page.ts — Page Object cho form rút tiền
import { Page, expect } from "@playwright/test";

export class WithdrawPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/wallet/withdraw");
  }

  async fillWithdraw(input: { amount: number; bankAccountId: string }) {
    await this.page.getByLabel("Số tiền rút").fill(String(input.amount));
    await this.page.getByLabel("Tài khoản nhận").selectOption(input.bankAccountId);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Xác nhận rút tiền" }).click();
  }

  async expectOrderStatus(status: string) {
    await expect(this.page.getByTestId("order-status")).toHaveText(status, { timeout: 20000 });
  }
}`
        ),
        CODE(
          "typescript",
          `// tests/wallet-payout.happy.spec.ts — Happy path: khoá tiền -> callback SUCCESS -> số dư đúng
import { test, expect } from "@playwright/test";
import { WithdrawPage } from "../pages/withdraw.page";
import { seedWallet, mockPartner, getWalletBalance } from "../fixtures/wallet-fixtures";

test.beforeEach(async () => {
  await seedWallet("WAL-TEST-0001", { availableBalance: 10_000_000 });
  await mockPartner("PARTNER-B", { outcome: "SUCCESS", delaySeconds: 3 });
});

test("rút 3 triệu, đối tác SUCCESS sau 3s -> số dư khả dụng giảm đúng số tiền + phí", async ({ page }) => {
  const withdraw = new WithdrawPage(page);
  await withdraw.open();
  await withdraw.fillWithdraw({ amount: 3_000_000, bankAccountId: "BANK-B-001" });
  await withdraw.submit();

  await withdraw.expectOrderStatus("PROCESSING");
  await withdraw.expectOrderStatus("SUCCESS"); // chờ tới khi callback xử lý xong

  // Oracle: số dư khả dụng + số dư bị khoá luôn bằng tổng ban đầu trừ phí
  const wallet = await getWalletBalance("WAL-TEST-0001");
  const fee = 11_000;
  expect(wallet.availableBalance).toBe(10_000_000 - 3_000_000 - fee);
  expect(wallet.lockedBalance).toBe(0);
});`
        ),
      ],
    },
    {
      heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 深掘りした異常系ケース" },
      blocks: [
        P(
          "Chương này tập trung vào các ca lỗi giá trị cao nhất trong domain ví: race condition làm âm số dư, lệnh treo do callback không đến, duplicate webhook, và idempotency khi app retry lệnh rút.",
          "This chapter focuses on the highest-value failure cases in the wallet domain: race conditions causing negative balance, stuck orders from missing callbacks, duplicate webhooks, and idempotency when the app retries a withdrawal request.",
          "この章では、ウォレットドメインにおいて最も価値の高い異常系ケースに焦点を当てます。残高をマイナスにするレースコンディション、コールバック欠落による滞留注文、重複webhook、そしてアプリが出金リクエストを再試行する際の冪等性です。"
        ),
        CODE(
          "typescript",
          `// tests/wallet-payout.race-condition.spec.ts — chống âm số dư khi rút đồng thời
test("2 lệnh rút đồng thời cộng dồn vượt số dư -> chỉ 1 lệnh được chấp nhận, số dư không âm", async () => {
  await seedWallet("WAL-TEST-RACE", { availableBalance: 5_000_000 });

  const [r1, r2] = await Promise.all([
    createWithdrawOrder("WAL-TEST-RACE", { amount: 4_000_000, requestId: "req-1" }),
    createWithdrawOrder("WAL-TEST-RACE", { amount: 4_000_000, requestId: "req-2" }),
  ]);

  const results = [r1.status, r2.status];
  // Oracle: đúng 1 lệnh ACCEPTED, 1 lệnh REJECTED do không đủ số dư khả dụng
  expect(results.filter((s) => s === "ACCEPTED").length).toBe(1);
  expect(results.filter((s) => s === "REJECTED_INSUFFICIENT_BALANCE").length).toBe(1);

  const wallet = await getWalletBalance("WAL-TEST-RACE");
  expect(wallet.availableBalance).toBeGreaterThanOrEqual(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/wallet-payout.stuck-order.spec.ts — lệnh treo do callback không bao giờ đến
test("callback không đến trong 30 phút -> job quét timeout tự động hoàn tiền", async () => {
  await seedWallet("WAL-TEST-STUCK", { availableBalance: 8_000_000 });
  const order = await createWithdrawOrder("WAL-TEST-STUCK", { amount: 2_000_000, requestId: "req-stuck" });
  // Cố tình KHÔNG gửi bất kỳ callback nào để giả lập đối tác im lặng

  await advanceTime({ minutes: 31 }); // vượt SLA 30 phút
  await runPayoutTimeoutScanJob();

  const finalOrder = await getOrderState(order.orderId);
  expect(finalOrder.status).toBe("REFUNDED");

  const wallet = await getWalletBalance("WAL-TEST-STUCK");
  // Oracle: số dư khả dụng phải được hoàn lại đầy đủ, không còn tiền bị khoá treo
  expect(wallet.availableBalance).toBe(8_000_000);
  expect(wallet.lockedBalance).toBe(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/wallet-payout.duplicate-webhook.spec.ts — chống xử lý trùng khi đối tác gửi callback 2 lần
test("đối tác gửi callback SUCCESS 2 lần cho cùng 1 orderId -> chỉ xử lý 1 lần", async () => {
  const order = await createWithdrawOrder("WAL-TEST-0002", { amount: 1_500_000, requestId: "req-dup" });

  await triggerPartnerCallback(order.orderId, { outcome: "SUCCESS" });
  await triggerPartnerCallback(order.orderId, { outcome: "SUCCESS" }); // gửi lại lần 2 (duplicate)

  const finalOrder = await getOrderState(order.orderId);
  expect(finalOrder.status).toBe("SUCCESS");

  const callbackLogs = await getPartnerCallbackLogs(order.orderId);
  expect(callbackLogs.length).toBe(2); // cả 2 lần đều được LOG để điều tra
  const processedCount = callbackLogs.filter((c: any) => c.wasProcessed).length;
  // Oracle: dù nhận 2 callback, chỉ 1 lần được XỬ LÝ (cập nhật số dư), lần còn lại bị bỏ qua có kiểm soát
  expect(processedCount).toBe(1);
});`
        ),
        CODE(
          "typescript",
          `// tests/wallet-payout.idempotency.spec.ts — app retry lệnh rút do mất mạng
test("app gửi lại lệnh rút cùng requestId do mất mạng -> chỉ 1 lệnh được tạo, khoá tiền 1 lần", async () => {
  await seedWallet("WAL-TEST-RETRY", { availableBalance: 6_000_000 });
  const requestId = "req-retry-001";

  const [r1, r2] = await Promise.all([
    createWithdrawOrder("WAL-TEST-RETRY", { amount: 2_000_000, requestId }),
    createWithdrawOrder("WAL-TEST-RETRY", { amount: 2_000_000, requestId }),
  ]);

  const orderIds = new Set([r1.orderId, r2.orderId]);
  // Oracle: dù gửi 2 lần, chỉ có 1 orderId duy nhất được tạo cho cùng requestId
  expect(orderIds.size).toBe(1);

  const wallet = await getWalletBalance("WAL-TEST-RETRY");
  expect(wallet.lockedBalance).toBe(2_000_000); // không phải 4.000.000
});`
        ),
        SCEN(
          "Kịch bản: vào giờ cao điểm lương về (ngày 25 hàng tháng), một đối tác cổng thanh toán bị quá tải và trả về độ trễ callback trung bình 25 phút thay vì 3 giây như bình thường",
          "Scenario: during payday peak hours (the 25th of each month), a gateway partner becomes overloaded and returns average callback latency of 25 minutes instead of the usual 3 seconds",
          "QA phải xác nhận: hệ thống KHÔNG tự động hoàn tiền quá sớm (trước 30 phút SLA) chỉ vì độ trễ cao hơn bình thường, đồng thời dashboard giám sát phải cảnh báo sớm khi độ trễ trung bình vượt ngưỡng cảnh báo (ví dụ 10 phút) để đội vận hành chủ động liên hệ đối tác trước khi khách hàng khiếu nại hàng loạt.",
          "QA must confirm: the system does NOT auto-refund too early (before the 30-minute SLA) just because latency is higher than usual, while the monitoring dashboard must alert early when average latency exceeds a warning threshold (e.g. 10 minutes) so operations can proactively contact the partner before a wave of customer complaints.",
          "シナリオ: 給料日のピーク時間帯(毎月25日)に、あるゲートウェイパートナーが過負荷になり、通常の3秒ではなく平均25分のコールバック遅延を返す場合",
          "QAは、遅延が通常より高いというだけでシステムが早すぎるタイミング(30分SLA前)で自動返金しないこと、そして監視ダッシュボードが平均遅延が警告しきい値(例: 10分)を超えたときに早期に警告を発し、運用チームが顧客からの苦情が殺到する前に能動的にパートナーに連絡できるようにすることを確認しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "10. Nghiệp vụ nền/hậu kiểm", en: "10. Background/post-processing operations", ja: "10. バックグラウンド業務・事後検証" },
      blocks: [
        P(
          "Mỗi ngày lúc 02h00, job đối soát tải file settlement từ cả 6 đối tác và so khớp với sổ nội bộ theo orderId. Vì có 6 đối tác khác nhau với 6 định dạng file khác nhau, job đối soát phải chuẩn hoá dữ liệu trước khi so khớp, và bất kỳ lệch nào cũng phải được phân loại theo đối tác để đội vận hành biết liên hệ ai.",
          "Every day at 02:00, a reconciliation job loads settlement files from all 6 partners and matches them against the internal ledger by orderId. Since there are 6 different partners with 6 different file formats, the reconciliation job must normalize the data before matching, and any mismatch must be categorized by partner so operations knows who to contact.",
          "毎日2時に、突合ジョブが6つすべてのパートナーから決済ファイルを読み込み、orderIdで内部台帳と照合します。6つの異なるパートナーには6つの異なるファイル形式があるため、突合ジョブは照合前にデータを正規化しなければならず、あらゆる不一致はパートナー別に分類され、運用チームが誰に連絡すべきかを把握できるようにしなければなりません。"
        ),
        CODE(
          "sql",
          `-- Truy vấn kiểm tra bất biến: số dư khả dụng không được âm cho MỌI ví tại bất kỳ thời điểm nào
SELECT wallet_id, available_balance
FROM wallet_accounts
WHERE available_balance < 0;
-- Bất biến: kết quả trả về PHẢI RỖNG. Có dòng nào xuất hiện nghĩa là đã xảy ra lỗi race condition nghiêm trọng.

-- Truy vấn kiểm tra lệnh treo quá hạn chưa được xử lý bởi job quét timeout
SELECT order_id, created_at, status
FROM payout_orders
WHERE status = 'PROCESSING' AND created_at < NOW() - INTERVAL '30 minutes';
-- Bất biến: kết quả trả về PHẢI RỖNG nếu job quét timeout hoạt động đúng lịch.`
        ),
        CODE(
          "typescript",
          `// tests/reconciliation.wallet-batch.spec.ts — test job đối soát với đối tác ví
test("job đối soát phát hiện lệnh ví báo SUCCESS nhưng đối tác báo FAIL trong file cuối ngày", async () => {
  const order = await createSuccessfulOrderWithPartnerMismatch({ amount: 700_000, partnerId: "PARTNER-B" });

  const report = await runWalletReconciliationBatch({ date: "2026-07-06", partnerId: "PARTNER-B" });

  const mismatch = report.mismatches.find((m: any) => m.orderId === order.orderId);
  expect(mismatch).toBeDefined();
  expect(mismatch.walletSide).toBe("SUCCESS");
  expect(mismatch.partnerSide).toBe("FAILED");
  expect(mismatch.status).toBe("UNDER_INVESTIGATION");
  // Oracle: tiền KHÔNG được tự động hoàn hay xác nhận cho tới khi điều tra xong
});`
        ),
        TIP(
          "Với hệ thống nhiều đối tác, luôn thiết kế test đối soát theo từng đối tác riêng biệt thay vì gộp chung — mỗi đối tác có định dạng file và độ trễ báo cáo khác nhau, gộp chung dễ che giấu lỗi cục bộ của một đối tác cụ thể.",
          "For a multi-partner system, always design reconciliation tests per partner separately rather than combined — each partner has a different file format and reporting latency, and combining them can hide a specific partner's localized bug.",
          "複数パートナーシステムでは、統合するのではなく、常にパートナーごとに個別に突合テストを設計してください — 各パートナーは異なるファイル形式とレポート遅延を持ち、統合すると特定のパートナーの局所的なバグが隠れてしまう可能性があります。"
        ),
      ],
    },
    {
      heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD、監視と指標" },
      blocks: [
        P(
          "Bộ test functional chạy qua GitHub Actions trên mỗi pull request, còn kịch bản k6 mô phỏng tải cao chạy riêng vào ban đêm (nightly) để không làm chậm vòng lặp phát triển hàng ngày. Gate CI chặn merge nếu bất kỳ ca P0 nào fail, và job nightly k6 gửi báo cáo tự động lên dashboard nếu phát hiện số dư âm dù chỉ 1 lần trong toàn bộ kịch bản tải.",
          "The functional test suite runs via GitHub Actions on every pull request, while the high-load k6 scenario runs separately at night (nightly) to avoid slowing down the daily development loop. The CI gate blocks merging if any P0 case fails, and the nightly k6 job automatically reports to the dashboard if a negative balance is detected even once across the entire load scenario.",
          "機能テストスイートはGitHub Actions経由ですべてのプルリクエストで実行され、高負荷k6シナリオは日々の開発ループを遅くしないよう夜間(ナイトリー)に別途実行されます。CIゲートは、P0ケースが1つでも失敗すればマージをブロックし、夜間k6ジョブは、負荷シナリオ全体で一度でもマイナス残高が検出された場合、自動的にダッシュボードに報告します。"
        ),
        CODE(
          "yaml",
          `# .github/workflows/wallet-payout-tests.yml
name: wallet-payout-tests
on: [pull_request]
jobs:
  functional-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Run shard \${{ matrix.shard }}/4
        run: npx playwright test --shard=\${{ matrix.shard }}/4
        env:
          TEST_ONLY_TOKEN: \${{ secrets.TEST_ONLY_TOKEN }}

  gate-p0:
    needs: functional-test
    runs-on: ubuntu-latest
    steps:
      - name: Ca P0 (số dư không âm, idempotency, timeout, recon) phải PASS 100%
        run: node scripts/check-p0-gate.js --tag=P0 --require=100

  nightly-load-k6:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run k6 concurrent withdrawal scenario
        run: k6 run --vus 50 --duration 2m scripts/k6-concurrent-withdraw.js`
        ),
        NOTE(
          "Theo dõi thêm chỉ số 'số lệnh PROCESSING quá 30 phút mỗi ngày' trên dashboard — nếu con số này tăng đột biến, thường báo hiệu một đối tác cụ thể đang gặp sự cố cần liên hệ ngay.",
          "Also track the 'number of PROCESSING orders exceeding 30 minutes per day' metric on the dashboard — a sudden spike in this number usually signals a specific partner having an incident that needs immediate contact.",
          "ダッシュボードで「1日あたり30分を超えるPROCESSING注文数」の指標も追跡してください — この数値の急増は通常、特定のパートナーが障害を起こしており、即座に連絡が必要であることを示します。"
        ),
      ],
    },
    {
      heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
      blocks: [
        P(
          "AI Agent nội bộ được dùng để phân tích log của các lệnh treo (PROCESSING quá hạn) và tìm mẫu số chung — ví dụ phát hiện rằng 80% lệnh treo trong tuần đều thuộc về 1 đối tác cụ thể, gợi ý đội vận hành ưu tiên điều tra đối tác đó trước. AI cũng hỗ trợ soạn thảo ca kiểm thử cho đối tác mới dựa trên tài liệu API do đối tác cung cấp. AI KHÔNG được tự động kích hoạt hoàn tiền cho lệnh treo — quyết định này luôn cần một kỹ sư vận hành xác nhận thủ công.",
          "The internal AI Agent is used to analyze logs of stuck orders (overdue PROCESSING) and find common patterns — for example, detecting that 80% of stuck orders this week belong to one specific partner, suggesting operations prioritize investigating that partner first. AI also helps draft test cases for new partners based on API documentation the partner provides. AI must NOT auto-trigger a refund for a stuck order — this decision always requires manual confirmation from an operations engineer.",
          "社内AIエージェントは、滞留注文(期限超過PROCESSING)のログを分析し、共通パターンを見つけるために使用されます — 例えば、今週の滞留注文の80%が特定の1つのパートナーに属していることを検出し、運用チームがそのパートナーの調査を優先するよう提案します。AIはまた、パートナーが提供するAPI文書に基づいて新規パートナー向けテストケースの草案作成を支援します。AIは滞留注文の返金を自動トリガーしてはいけません — この決定は常に運用エンジニアによる手動確認を必要とします。"
        ),
        H("Ranh giới trách nhiệm AI làm / người giữ", "AI-does / human-keeps responsibility boundary", "AIが行う範囲・人間が保持する範囲の境界"),
        UL(
          [
            "AI được làm: phân tích log tìm mẫu số chung của lệnh treo, soạn nháp ca kiểm thử cho đối tác mới, tóm tắt báo cáo đối soát hàng ngày.",
            "Người phải giữ: quyết định kích hoạt hoàn tiền thủ công cho lệnh treo, phê duyệt thêm đối tác mới vào production, xác nhận oracle trước khi merge test.",
            "Mọi gợi ý điều tra của AI phải kèm bằng chứng (log gốc, số liệu cụ thể) để kỹ sư vận hành có thể tự kiểm chứng trước khi hành động.",
          ],
          [
            "AI may do: analyze logs to find common patterns in stuck orders, draft test cases for new partners, summarize daily reconciliation reports.",
            "Humans must keep: the decision to manually trigger a refund for a stuck order, approving new partners for production, confirming the oracle before merging tests.",
            "Every AI investigation suggestion must include supporting evidence (raw logs, specific figures) so operations engineers can verify it themselves before acting.",
          ],
          [
            "AIが行ってよいこと: 滞留注文の共通パターンを見つけるためのログ分析、新規パートナー向けテストケースの草案作成、日次突合レポートの要約。",
            "人間が保持すべきこと: 滞留注文に対する手動返金トリガーの決定、本番環境への新規パートナー承認、テストマージ前のオラクル確認。",
            "AIによるすべての調査提案には、運用エンジニアが行動前に自ら検証できるよう、裏付けとなる証拠(元のログ、具体的な数値)を含めなければなりません。",
          ]
        ),
        WARN(
          "Không cấp cho AI Agent quyền ghi trực tiếp vào bảng WalletAccount hay PayoutOrder trên production dưới bất kỳ hình thức nào — mọi thay đổi trạng thái tài chính phải đi qua API nghiệp vụ có kiểm soát và log đầy đủ.",
          "Never grant an AI Agent direct write access to the WalletAccount or PayoutOrder tables in production under any circumstances — every financial state change must go through a controlled, fully-logged business API.",
          "いかなる状況であっても、AIエージェントに本番環境のWalletAccountやPayoutOrderテーブルへの直接書き込み権限を与えてはいけません — あらゆる財務状態の変更は、制御され完全にログされた業務APIを経由しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "13. Góc phỏng vấn", en: "13. Interview corner", ja: "13. 面接コーナー" },
      blocks: [
        QA(
          "Tại sao 'race condition làm âm số dư' lại khó phát hiện bằng test tuần tự thông thường, và bạn sẽ thiết kế test để bắt được lỗi này như thế nào?",
          "Why is 'race condition causing negative balance' hard to detect with ordinary sequential tests, and how would you design a test to catch it?",
          "Test tuần tự gửi từng request một, nên hệ thống luôn có đủ thời gian xử lý xong request trước rồi mới nhận request sau — race condition chỉ xảy ra khi nhiều request cạnh tranh truy cập cùng một tài nguyên (số dư ví) trong cùng một khoảnh khắc. Tôi sẽ dùng Promise.all để gửi đồng thời 2-3 request rút tiền vượt tổng số dư khả dụng, sau đó assert rằng chỉ đúng 1 request được chấp nhận và số dư cuối cùng không bao giờ âm.",
          "Sequential tests send one request at a time, so the system always has enough time to fully process one request before receiving the next — a race condition only occurs when multiple requests compete to access the same resource (wallet balance) at the exact same moment. I would use Promise.all to send 2-3 concurrent withdrawal requests exceeding the total available balance, then assert that exactly 1 request is accepted and the final balance is never negative.",
          "「残高をマイナスにするレースコンディション」が通常の逐次テストで検出しにくいのはなぜですか。そしてこのバグを捕捉するためにどのようにテストを設計しますか？",
          "逐次テストは一度に1つのリクエストを送信するため、システムは次のリクエストを受け取る前に常に1つのリクエストを完全に処理する十分な時間を持ちます — レースコンディションは、複数のリクエストがまったく同じ瞬間に同じリソース(ウォレット残高)へのアクセスを競合する場合にのみ発生します。私はPromise.allを使用して、総利用可能残高を超える2〜3件の同時出金リクエストを送信し、正確に1件のリクエストのみが受理され、最終残高が決してマイナスにならないことをアサートします。"
        ),
        QA(
          "Nếu một job quét timeout tự động hoàn tiền cho lệnh PROCESSING quá 30 phút, nhưng thực ra đối tác vẫn đang xử lý và sau đó báo SUCCESS, hệ thống sẽ gặp vấn đề gì và QA cần test ca nào để phòng ngừa?",
          "If a timeout-scanning job auto-refunds a PROCESSING order exceeding 30 minutes, but the partner is actually still processing and later reports SUCCESS, what problem does the system face and what case should QA test to prevent it?",
          "Vấn đề là 'double crediting' — khách hàng vừa được hoàn tiền vào ví (do timeout) vừa nhận được tiền thật ở tài khoản ngân hàng (do đối tác xử lý muộn nhưng vẫn thành công), dẫn tới khách có tiền 'từ trên trời rơi xuống'. QA cần test ca: gửi callback SUCCESS TRỄ (sau khi job timeout đã chạy và hoàn tiền) và assert rằng hệ thống PHẢI phát hiện lệnh đã REFUNDED, từ chối áp dụng lại callback SUCCESS, đồng thời gắn cờ để đội vận hành đối chiếu thủ công.",
          "The problem is 'double crediting' — the customer both gets refunded to their wallet (due to timeout) and receives real money in their bank account (because the partner processed late but still succeeded), resulting in the customer receiving 'money from nowhere'. QA needs to test the case: sending a LATE SUCCESS callback (after the timeout job has already run and refunded) and asserting the system MUST detect the order is already REFUNDED, reject reapplying the SUCCESS callback, and flag it for manual operations reconciliation.",
          "タイムアウトスキャンジョブが30分を超えるPROCESSING注文を自動的に返金したが、実際にはパートナーがまだ処理中で、後でSUCCESSを報告した場合、システムはどのような問題に直面し、QAはそれを防ぐためにどのケースをテストすべきですか？",
          "問題は「二重入金」です — 顧客はウォレットへの返金(タイムアウトによる)と銀行口座への実際の入金(パートナーの処理が遅れたが結局成功したため)の両方を受け取り、顧客が「どこからともなく現れたお金」を得ることになります。QAは、遅れたSUCCESSコールバックを送信するケース(タイムアウトジョブが既に実行され返金済みの後)をテストし、システムが注文が既にREFUNDED済みであることを検出し、SUCCESSコールバックの再適用を拒否し、手動での運用照合のためにフラグを立てることを必ずアサートしなければなりません。"
        ),
        QA(
          "Khi thiết kế test cho hệ thống có 6 đối tác cổng thanh toán khác nhau, bạn ưu tiên chiến lược nào để tránh viết 6 bộ test trùng lặp?",
          "When designing tests for a system with 6 different payment gateway partners, what strategy would you prioritize to avoid writing 6 duplicate test suites?",
          "Tôi sẽ áp dụng data-driven testing: viết MỘT bộ test case chung cho luồng nghiệp vụ (khoá tiền, callback, timeout, đối soát), sau đó tham số hoá đối tác qua một adapter interface chung. Test chạy lặp qua danh sách 6 đối tác, mỗi đối tác chỉ cần cấu hình mock riêng (định dạng callback, độ trễ) mà không cần viết lại toàn bộ logic assertion — giúp giảm 6 lần công sức bảo trì xuống còn 1 lần.",
          "I would apply data-driven testing: write ONE common set of test cases for the business flow (locking funds, callback, timeout, reconciliation), then parameterize the partner through a common adapter interface. Tests loop over the list of 6 partners, each partner only needing its own mock configuration (callback format, latency) without rewriting the entire assertion logic — reducing 6x maintenance effort down to 1x.",
          "6つの異なる決済ゲートウェイパートナーを持つシステムのテストを設計する際、6つの重複したテストスイートを書くことを避けるためにどのような戦略を優先しますか？",
          "私はデータ駆動型テストを適用します。業務フロー(資金ロック、コールバック、タイムアウト、突合)に対して1つの共通テストケースセットを書き、共通のアダプターインターフェースを通じてパートナーをパラメータ化します。テストは6つのパートナーのリストをループし、各パートナーは独自のモック設定(コールバック形式、遅延)のみが必要で、アサーションロジック全体を書き直す必要はありません — これにより6倍の保守労力を1倍に削減します。"
        ),
        SCEN(
          "Phỏng vấn mock: Interviewer hỏi 'Đội vận hành báo cáo có 200 lệnh rút tiền bị treo ở PROCESSING hơn 2 giờ, tất cả đều thuộc 1 đối tác. Bạn sẽ điều tra và đề xuất gì?'",
          "Mock interview: the interviewer asks 'Operations reports 200 withdrawal orders stuck at PROCESSING for over 2 hours, all belonging to 1 partner. What would you investigate and propose?'",
          "Trả lời mẫu: Trước tiên tôi kiểm tra xem job quét timeout có đang chạy đúng lịch không — nếu job bị lỗi hoặc dừng, đó là nguyên nhân gốc dễ khắc phục nhất. Nếu job vẫn chạy bình thường nhưng vẫn treo, tôi nghi ngờ đối tác đó đang gặp sự cố hạ tầng thực sự, nên đề xuất tạm thời chuyển hướng (failover) các lệnh mới sang đối tác dự phòng trong khi đội vận hành liên hệ đối tác gốc, đồng thời chạy job hoàn tiền thủ công có kiểm soát cho 200 lệnh treo sau khi xác nhận với đối tác rằng tiền chưa thực sự được chuyển.",
          "Sample answer: First I'd check whether the timeout scanning job is running on schedule — if the job is broken or stopped, that's the easiest root cause to fix. If the job is running normally but orders still get stuck, I'd suspect that partner is having a real infrastructure incident, so I'd propose temporarily failing over new orders to a backup partner while operations contacts the original partner, and running a controlled manual refund job for the 200 stuck orders after confirming with the partner that funds were never actually transferred.",
          "モック面接: 面接官が「運用チームが200件の出金注文が2時間以上PROCESSINGのまま滞留しており、すべて1つのパートナーに属していると報告しています。何を調査し、何を提案しますか？」と質問します。",
          "回答例: まずタイムアウトスキャンジョブが予定通り実行されているか確認します — ジョブが壊れているか停止していれば、それが最も修正しやすい根本原因です。ジョブが正常に実行されているのに滞留が続く場合、そのパートナーが実際のインフラ障害を起こしていると疑い、運用チームが元のパートナーに連絡する間、新規注文をバックアップパートナーに一時的にフェイルオーバーすることを提案し、パートナーに資金が実際には送金されていないことを確認した後、200件の滞留注文に対して制御された手動返金ジョブを実行します。"
        ),
      ],
    },
    {
      heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
      blocks: [
        P(
          "Bài này đã xây dựng chiến lược kiểm thử toàn diện cho luồng rút tiền ví ra ngân hàng và đối soát với đối tác thanh toán, đặt trọng tâm vào bất biến số dư không âm và xử lý đúng đắn các lệnh treo bất đồng bộ. Điểm mấu chốt: trong hệ thống ví điện tử, phần khó nhất không phải là happy path mà là những khoảng lặng bất định — khi callback trễ, trùng, hoặc không bao giờ đến.",
          "This article has built a comprehensive test strategy for the wallet-to-bank withdrawal flow and payment partner reconciliation, focused on the non-negative-balance invariant and correctly handling asynchronous stuck orders. The key takeaway: in an e-wallet system, the hardest part isn't the happy path but the uncertain silences — when a callback is late, duplicated, or never arrives.",
          "この記事は、ウォレットから銀行への出金フローと決済パートナーとの突合に対する包括的なテスト戦略を構築し、残高非負性の不変条件と非同期の滞留注文の正しい処理に焦点を当てました。重要なポイントは、電子ウォレットシステムにおいて最も難しい部分はハッピーパスではなく、不確実な沈黙 — コールバックが遅れる、重複する、または決して届かない場合 — であるということです。"
        ),
        H("Checklist bàn giao trước khi lên production", "Handover checklist before going to production", "本番リリース前の引き継ぎチェックリスト"),
        UL(
          [
            "Toàn bộ ca P0 (số dư không âm, idempotency, xử lý timeout, đối soát) PASS 100% trên CI.",
            "Kịch bản k6 mô phỏng race condition đã chạy 20 lần liên tiếp không phát hiện số dư âm.",
            "Job quét timeout đã được test với ca callback không bao giờ đến, và ca callback đến TRỄ sau khi đã hoàn tiền.",
            "Đối soát đã được test riêng cho từng đối tác trong số 6 đối tác, không gộp chung.",
            "Tài liệu ranh giới trách nhiệm AI Agent trong phân tích lệnh treo đã được review bởi trưởng nhóm QA và đội vận hành ví.",
          ],
          [
            "All P0 cases (non-negative balance, idempotency, timeout handling, reconciliation) PASS 100% in CI.",
            "The k6 race-condition scenario has run 20 consecutive times with no negative balance detected.",
            "The timeout scanning job has been tested with a 'callback never arrives' case and a 'callback arrives LATE' case after a refund already happened.",
            "Reconciliation has been tested separately for each of the 6 partners, not combined.",
            "The AI Agent responsibility-boundary document for stuck-order analysis has been reviewed by the QA lead and the wallet operations team.",
          ],
          [
            "すべてのP0ケース(残高非負性、冪等性、タイムアウト処理、突合)がCIで100%合格していること。",
            "レースコンディションをシミュレートするk6シナリオが20回連続で実行され、マイナス残高が検出されていないこと。",
            "タイムアウトスキャンジョブが、「コールバックが決して届かない」ケースと、返金が既に発生した後に「コールバックが遅れて届く」ケースでテストされていること。",
            "突合が、統合せず6つのパートナーそれぞれについて個別にテストされていること。",
            "滞留注文分析におけるAIエージェントの責任境界文書が、QAリードとウォレット運用チームによってレビューされていること。",
          ]
        ),
        TIP(
          "Trước khi ký duyệt, tự hỏi: 'Nếu đối tác im lặng hoàn toàn trong 1 giờ vào đúng giờ cao điểm lương về, hệ thống của chúng ta có tự phục hồi đúng đắn hay sẽ tạo ra hàng loạt lệnh treo và khiếu nại?' — câu trả lời chính là lý do domain ví luôn cần test tính bền vững (resilience) nghiêm ngặt hơn test giao diện.",
          "Before signing off, ask yourself: 'If the partner goes completely silent for 1 hour right during payday peak hours, does our system recover correctly on its own, or will it generate a wave of stuck orders and complaints?' — the answer is exactly why the wallet domain always needs stricter resilience testing than UI testing.",
          "承認前に自問してください。「給料日のピーク時間帯にパートナーが1時間完全に沈黙した場合、私たちのシステムは自ら正しく回復するのか、それとも大量の滞留注文と苦情を生み出すのか？」— その答えこそが、ウォレットドメインが常にUIテストよりも厳格な回復力(レジリエンス)テストを必要とする理由です。"
        ),
      ],
    },
  ];

  return {
    categorySlug: "enterprise-realworld",
    slug: "fintech-ewallet-payout-partner-recon",
    cover: thumb,
    tags: tags("thucchien", "fintech", "api", "k6", "cicd", "realworld"),
    title: {
      vi: "Thực chiến fintech: rút tiền ví ra ngân hàng, xử lý bất đồng bộ & đối soát đối tác",
      en: "Fintech real-world: wallet-to-bank payout, async handling & partner reconciliation",
      ja: "フィンテック実戦: ウォレットから銀行への出金・非同期処理・パートナー突合",
    },
    summary: {
      vi: "Bài toán thực chiến ví điện tử: rút tiền ra ngân hàng qua đối tác cổng thanh toán, xử lý callback bất đồng bộ, đối soát cuối ngày — kiểm thử theo bất biến số dư không âm, idempotency, trạng thái cuối duy nhất, khớp đối soát.",
      en: "A real-world e-wallet problem: withdrawing to a bank via payment gateway partners, handling asynchronous callbacks, end-of-day reconciliation — tested against non-negative balance, idempotency, single final state and reconciliation-match invariants.",
      ja: "電子ウォレットの実戦課題: 決済ゲートウェイパートナー経由の銀行出金、非同期コールバック処理、日次突合 — 残高非負性、冪等性、単一の最終状態、突合一致の不変条件に基づくテスト。",
    },
    pages: buildDoc(pages),
  };
}
const art3 = buildArt3();

// ============================================================================
// BÀI 4/4 — fintech-qr-payment-idempotency
// ============================================================================
const art4 = buildArt4();

export const THUCCHIEN_01_DOCS = [art1, art2, art3, art4];

// ---- Placeholder builder functions (filled in via Edit, one per article) ----
function buildArt4() {
  const thumb = makeThumb({ id: "tc01art4", domain: "fintech", kind: "thucchien", label: "実戦 · QR PAYMENT" });

  const svgArch = `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="380" rx="14" fill="#0f172a"/>
<text x="26" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc thanh toán QR VietQR/napas 247 &amp; chống trùng giao dịch · VietQR/napas 247 payment architecture</text>
<g font-size="11.5" font-weight="700" text-anchor="middle">
<rect x="24" y="54" width="112" height="46" rx="9" fill="#1e293b"/><text x="80" y="74" fill="#93c5fd">App khách hàng</text><text x="80" y="90" fill="#64748b" font-size="9.5">quét mã QR</text>
<rect x="168" y="54" width="120" height="46" rx="9" fill="#1e293b"/><text x="228" y="74" fill="#93c5fd">Merchant API</text><text x="228" y="90" fill="#64748b" font-size="9.5">tạo lệnh · idempotency-key</text>
<rect x="320" y="30" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="379" y="54" fill="#fcd34d">Payment Gateway</text>
<rect x="320" y="86" width="118" height="40" rx="9" fill="#3a2f1e"/><text x="379" y="110" fill="#fcd34d">Napas 247 Switch</text>
<rect x="470" y="54" width="120" height="46" rx="9" fill="#1e3a2f"/><text x="530" y="74" fill="#86efac">Ngân hàng phát hành</text><text x="530" y="90" fill="#64748b" font-size="9.5">trừ tiền · webhook</text>
<rect x="620" y="54" width="80" height="46" rx="9" fill="#1e293b"/><text x="660" y="74" fill="#c4b5fd">Ledger nội bộ</text><text x="660" y="90" fill="#64748b" font-size="9.5">ghi sổ · hoàn tiền</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M136 77 H168" marker-end="url(#la)"/><path d="M288 68 C300 68 300 50 320 50" marker-end="url(#la)"/><path d="M288 86 C300 86 300 106 320 106" marker-end="url(#la)"/><path d="M438 50 C455 50 455 68 470 68" marker-end="url(#la)"/><path d="M590 77 H620" marker-end="url(#la)"/></g>
<defs><marker id="la" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<rect x="24" y="150" width="672" height="70" rx="10" fill="#111c30"/>
<text x="40" y="174" font-size="12.5" fill="#93c5fd" font-weight="700">Đồng bộ: quét QR → Merchant API tạo lệnh gắn Idempotency-Key → gọi Payment Gateway. Bất đồng bộ: Napas 247 xử lý qua ngân hàng phát hành, kết quả về qua webhook có thể trễ, trùng, hoặc không đến (timeout).</text>
<text x="40" y="196" font-size="12.5" fill="#64748b">Sync: scan QR → Merchant API creates order with Idempotency-Key → calls Payment Gateway. Async: Napas 247 processes via issuing bank, result returns via webhook that can be late, duplicated, or never arrive (timeout).</text>
<rect x="24" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="40" y="260" font-size="12.5" font-weight="800" fill="#5eead4">Điểm khó kiểm thử · Hard-to-test</text>
<g font-size="11.5" fill="#cbd5e1"><text x="40" y="282">• Gateway/Napas là bên thứ ba — cần mock kèm độ trễ thật</text><text x="40" y="302">• Retry do timeout dễ tạo giao dịch trùng</text><text x="40" y="322">• Webhook có thể đến trễ, đến 2 lần, hoặc không đến</text><text x="40" y="342">• Hoàn tiền phải cân bằng đúng sổ ledger</text></g>
<rect x="370" y="236" width="326" height="120" rx="10" fill="#1e293b"/><text x="386" y="260" font-size="12.5" font-weight="800" fill="#fca5a5">Chiến lược · Strategy</text>
<g font-size="11.5" fill="#cbd5e1"><text x="386" y="282">• Mọi lệnh thanh toán bắt buộc Idempotency-Key</text><text x="386" y="302">• Test retry mạng + webhook trùng bằng mock có kiểm soát</text><text x="386" y="322">• Assert tổng tiền + trạng thái cuối duy nhất</text><text x="386" y="342">• Đối soát cuối ngày với sao kê cổng thanh toán</text></g>
</svg>`;

  const svgMatrix = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Ma trận ca kiểm thử · QR payment idempotency test matrix (trích)</text>
<g font-size="11.5">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="34" y="63" fill="#fff" font-weight="800">Nhóm</text><text x="150" y="63" fill="#fff" font-weight="800">Điều kiện</text><text x="440" y="63" fill="#fff" font-weight="800">Kết quả mong đợi</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="24" fill="#ede9fe"/><text x="34" y="88" fill="#16a34a">Happy</text><text x="150" y="88">Quét QR, số dư đủ, gateway trả SUCCESS lần đầu</text><text x="440" y="88">SUCCESS → ghi nợ đúng 1 lần, đúng số tiền</text>
<text x="34" y="112" fill="#d97706">Boundary</text><text x="150" y="112">Số tiền = đúng số dư khả dụng</text><text x="440" y="112">SUCCESS, số dư cuối = 0, không âm</text>
<rect x="24" y="120" width="672" height="24" fill="#ede9fe"/><text x="34" y="136" fill="#dc2626">Negative</text><text x="150" y="136">Số dư không đủ</text><text x="440" y="136">FAILED tự động · không gửi lệnh sang gateway</text>
<text x="34" y="160" fill="#dc2626">Negative</text><text x="150" y="160">Mã QR hết hạn (quá 15 phút)</text><text x="440" y="160">EXPIRED · từ chối trước khi gọi gateway</text>
<rect x="24" y="168" width="672" height="24" fill="#ede9fe"/><text x="34" y="184" fill="#2563eb">Failure</text><text x="150" y="184">Gateway timeout không phản hồi trong 10s</text><text x="440" y="184">PENDING_RECONCILE → không tự SUCCESS/FAILED</text>
<text x="34" y="208" fill="#2563eb">Failure</text><text x="150" y="208">Client retry request do timeout mạng</text><text x="440" y="208">Cùng Idempotency-Key → trả về đúng kết quả lần đầu</text>
<rect x="24" y="216" width="672" height="24" fill="#ede9fe"/><text x="34" y="232" fill="#7c3aed">Idempotency</text><text x="150" y="232">Webhook SUCCESS gửi trùng 2 lần</text><text x="440" y="232">Chỉ 1 bút toán ghi nợ · webhook thứ 2 bị bỏ qua có log</text>
<text x="34" y="256" fill="#7c3aed">Idempotency</text><text x="150" y="256">Gọi API thanh toán 2 lần cùng Idempotency-Key</text><text x="440" y="256">Chỉ 1 giao dịch được tạo · lần 2 trả cached result</text>
<rect x="24" y="264" width="672" height="24" fill="#ede9fe"/><text x="34" y="280" fill="#0891b2">Refund</text><text x="150" y="280">Hoàn tiền một phần cho giao dịch SUCCESS</text><text x="440" y="280">Sổ ledger cân bằng: nợ gốc - hoàn tiền = số tiền còn giữ</text>
<text x="34" y="304" fill="#0891b2">State</text><text x="150" y="304">Truy vấn trạng thái giao dịch bất kỳ lúc nào</text><text x="440" y="304">Đúng 1 trong: CREATED/PENDING/SUCCESS/FAILED/EXPIRED/REFUNDED</text>
</g></g>
<text x="24" y="326" font-size="12" fill="#6d28d9" font-weight="700">Mỗi HÀNG → tối thiểu một ca tự động. Nhóm Idempotency/Refund là nơi phân biệt QA giỏi trong domain fintech.</text>
</svg>`;

  const pages = [
    {
      heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. ビジネス背景と範囲" },
      blocks: [
        P(
          "Bạn là QA Lead tại QuickPay, một cổng thanh toán trung gian phục vụ hơn 12.000 điểm bán (merchant) tại Việt Nam, xử lý trung bình 450.000 giao dịch thanh toán QR mỗi ngày thông qua chuẩn VietQR và mạng chuyển mạch napas 247. Sản phẩm cốt lõi cho phép khách hàng quét mã QR tại quầy thu ngân, ứng dụng ngân hàng của khách trừ tiền, và tiền được chuyển vào tài khoản merchant gần như tức thời. Vì đây là 'chạm tiền thật' ở tần suất cực cao, mục tiêu chính quý này là siết chặt cơ chế chống trùng giao dịch (idempotency) sau khi phát hiện một sự cố production gần đây: một merchant lớn bị ghi nợ khách hàng 2 lần cho cùng một hoá đơn do client thử lại (retry) request khi mạng chập chờn.",
          "You are the QA Lead at QuickPay, an intermediary payment gateway serving over 12,000 merchants in Vietnam, processing an average of 450,000 QR payment transactions per day via the VietQR standard and the napas 247 switching network. The core product lets a customer scan a QR code at checkout, the customer's banking app debits the amount, and funds land in the merchant's account almost instantly. Because this is 'real-money-touching' at extremely high frequency, this quarter's main goal is tightening the anti-duplicate-transaction (idempotency) mechanism after a recent production incident: a large merchant double-charged a customer for the same invoice because the client retried the request during a flaky network period.",
          "あなたはQuickPayのQAリードです。QuickPayはベトナムで12,000以上の加盟店にサービスを提供する仲介決済ゲートウェイで、VietQR規格とnapas 247スイッチングネットワークを通じて1日平均45万件のQR決済取引を処理しています。中核製品は、顧客がレジでQRコードをスキャンし、顧客の銀行アプリが金額を引き落とし、資金がほぼ即座に加盟店の口座に着金する仕組みです。これは極めて高頻度で「実際のお金が動く」ものであるため、今四半期の主な目標は、最近の本番障害 — ネットワークが不安定な際にクライアントがリクエストを再試行(リトライ)したことで、大手加盟店が同一請求書に対して顧客に二重請求してしまった事故 — を受けて、重複決済防止(冪等性)機構を強化することです。"
        ),
        P(
          "Đội ngũ kỹ thuật đã thống nhất một quy tắc bắt buộc: MỌI lệnh thanh toán gửi tới Payment Gateway phải mang một Idempotency-Key duy nhất do merchant sinh ra, và cổng thanh toán chịu trách nhiệm đảm bảo cùng một key dù được gọi bao nhiêu lần cũng chỉ tạo ra đúng một giao dịch trừ tiền thực sự. Bên cạnh đó, hệ thống phải xử lý đúng các tình huống bất định vốn dĩ của thanh toán qua bên thứ ba: gateway timeout không phản hồi, webhook kết quả từ napas 247 đến trễ hoặc đến trùng lặp, và yêu cầu hoàn tiền một phần hoặc toàn phần khi khách khiếu nại. Vì Ngân hàng Nhà nước yêu cầu đối soát (reconciliation) chính xác tuyệt đối giữa sổ nội bộ và sao kê từ napas 247 mỗi cuối ngày, chiến lược kiểm thử của tài liệu này đặt trọng tâm vào tính đúng đắn tài chính và khả năng chống trùng hơn là giao diện quét mã.",
          "The engineering team has agreed on a mandatory rule: EVERY payment request sent to the Payment Gateway must carry a unique Idempotency-Key generated by the merchant, and the gateway is responsible for ensuring that the same key, no matter how many times it is called, produces exactly one real debit transaction. In addition, the system must correctly handle the inherent uncertainties of third-party payment processing: gateway timeouts with no response, result webhooks from napas 247 arriving late or duplicated, and requests for partial or full refunds when customers complain. Because the central bank requires absolutely accurate end-of-day reconciliation between the internal ledger and the napas 247 statement, this document's test strategy focuses on financial correctness and anti-duplication rather than the QR-scanning UI.",
          "エンジニアリングチームは必須ルールに合意しました。決済ゲートウェイに送信されるすべての決済リクエストは、加盟店が生成した一意の冪等性キー(Idempotency-Key)を持たなければならず、ゲートウェイは同じキーが何回呼び出されても正確に1件の実際の引き落とし取引しか生成しないことを保証する責任を負います。さらに、システムは第三者決済処理に本質的に伴う不確実性 — ゲートウェイが応答しないタイムアウト、napas 247からの結果ウェブフックが遅延または重複して到着すること、顧客からの苦情による部分的または全額の返金要求 — を正しく処理しなければなりません。中央銀行が内部台帳とnapas 247の明細書との間で毎日終業時に絶対的に正確な突合を要求するため、本ドキュメントのテスト戦略はQRスキャン画面よりも財務的正確性と重複防止に焦点を当てます。"
        ),
        H("Phạm vi tự động hoá của tài liệu này", "Scope of automation in this document", "本ドキュメントの自動化範囲"),
        UL(
          [
            "Luồng thanh toán QR đầu-cuối: sinh mã VietQR → khách quét → tạo lệnh với Idempotency-Key → gọi Payment Gateway → napas 247 xử lý → webhook kết quả → cập nhật ledger.",
            "Các ca lỗi bất định: gateway timeout, retry do mạng, webhook trùng lặp, webhook đến trễ sau khi đã hết hạn xử lý.",
            "Nghiệp vụ hậu kiểm: đối soát cuối ngày giữa ledger nội bộ và sao kê napas 247, xử lý hoàn tiền một phần/toàn phần và cân bằng sổ sách.",
            "Đưa toàn bộ vào CI/CD chạy trên mỗi pull request, kèm giám sát tỉ lệ giao dịch trùng phát hiện được và độ trễ webhook trung bình.",
            "Tích hợp AI Agent để soạn ca kiểm thử biên cho các đối tác gateway mới và điều tra log đối soát lệch — có ranh giới rõ giữa việc AI được làm và việc con người phải giữ.",
          ],
          [
            "The end-to-end QR payment flow: generate VietQR code → customer scans → create order with Idempotency-Key → call Payment Gateway → napas 247 processes → result webhook → update ledger.",
            "Uncertain failure cases: gateway timeout, network-triggered retry, duplicated webhook, webhook arriving late after the processing window has expired.",
            "Post-processing operations: end-of-day reconciliation between the internal ledger and the napas 247 statement, handling partial/full refunds and balancing the books.",
            "Wiring everything into CI/CD on every pull request, with monitoring of detected duplicate-transaction rate and average webhook latency.",
            "AI-agent integration to draft edge-case tests for new gateway partners and investigate reconciliation-mismatch logs — with a clear boundary between what AI may do and what humans must retain.",
          ],
          [
            "エンドツーエンドのQR決済フロー: VietQRコード生成 → 顧客がスキャン → Idempotency-Keyを付けた注文作成 → 決済ゲートウェイ呼び出し → napas 247処理 → 結果ウェブフック → 台帳更新。",
            "不確実な失敗ケース: ゲートウェイのタイムアウト、ネットワーク起因の再試行、重複ウェブフック、処理期限が過ぎた後に遅れて到着するウェブフック。",
            "事後処理業務: 内部台帳とnapas 247明細書との日次突合、部分・全額返金の処理と帳簿の均衡。",
            "すべてをCI/CDに組み込み、プルリクエストごとに実行し、検出された重複決済率と平均ウェブフック遅延を監視する。",
            "新規ゲートウェイパートナー向けの境界ケーステスト作成と突合不一致ログの調査を高速化するAIエージェントの統合 — AIが行ってよい範囲と人間が保持すべき範囲を明確に分ける。",
          ]
        ),
        NOTE(
          "Bài này thuộc LOẠI 'Thực chiến doanh nghiệp' (thucchien) — giải một bài toán THẬT end-to-end trên domain fintech thanh toán QR, đối chiếu độ sâu với bài mẫu flagship trong hệ thống.",
          "This article belongs to the 'Enterprise real-world' kind (thucchien) — solving a REAL end-to-end problem in the QR-payment fintech domain, matched in depth against the system's flagship sample.",
          "この記事は「実戦」種別(thucchien)に属します — QR決済フィンテックドメインにおける実際のエンドツーエンド問題を解決し、システムのフラッグシップサンプルと同等の深さで構成されています。"
        ),
      ],
    },
    {
      heading: { vi: "2. Kiến trúc & luồng nghiệp vụ", en: "2. Architecture & business flow", ja: "2. アーキテクチャと業務フロー" },
      blocks: [
        P(
          "Trước khi thiết kế ca kiểm thử, QA phải nắm được luồng thanh toán QR đi qua những thành phần nào và đâu là ranh giới đồng bộ/bất đồng bộ, vì chính ranh giới này quyết định cách chờ webhook và cách mock gateway trong test.",
          "Before designing test cases, QA must understand which components the QR payment flow traverses and where the sync/async boundary lies, since that boundary determines how to wait for the webhook and how to mock the gateway in tests.",
          "テストケースを設計する前に、QAはQR決済フローがどのコンポーネントを通過するか、そして同期/非同期の境界がどこにあるかを把握しなければなりません。この境界こそが、ウェブフックの待ち方とテストにおけるゲートウェイのモック方法を決定づけるからです。"
        ),
        IMG(
          svgArch,
          "Kiến trúc luồng thanh toán QR VietQR/napas 247, phân tách phần đồng bộ gọi gateway và phần bất đồng bộ nhận webhook.",
          "VietQR/napas 247 payment flow architecture, separating the synchronous gateway call from the asynchronous webhook result.",
          "VietQR/napas 247決済フローのアーキテクチャ。同期的なゲートウェイ呼び出しと非同期のウェブフック結果を分離しています。"
        ),
        P(
          "Phần đồng bộ diễn ra ngay khi khách quét mã: Merchant API tạo lệnh thanh toán với một Idempotency-Key duy nhất (thường sinh từ mã hoá đơn + timestamp), sau đó gọi Payment Gateway của QuickPay. Gateway kiểm tra key này đã tồn tại chưa trước khi tiếp tục — nếu đã tồn tại và đang xử lý, gateway trả về NGAY kết quả của lần gọi đầu tiên thay vì tạo giao dịch mới. Việc gọi tiếp sang Napas 247 Switch và ngân hàng phát hành có thể mất từ 1 đến 10 giây tuỳ tải hệ thống liên ngân hàng, và đôi khi timeout hoàn toàn, nên đây là điểm đầu tiên cần mock ổn định kèm độ trễ giả lập trong môi trường test.",
          "The synchronous part happens the moment the customer scans the code: the Merchant API creates a payment order with a unique Idempotency-Key (typically generated from invoice ID + timestamp), then calls QuickPay's Payment Gateway. The gateway checks whether this key already exists before proceeding — if it exists and is already processing, the gateway IMMEDIATELY returns the result of the first call instead of creating a new transaction. The subsequent call to the Napas 247 Switch and the issuing bank can take 1 to 10 seconds depending on interbank system load, and sometimes times out entirely, making it the first point requiring stable mocking with simulated latency in the test environment.",
          "同期部分は、顧客がコードをスキャンした瞬間に発生します。加盟店APIが一意の冪等性キー(通常は請求書ID+タイムスタンプから生成)を持つ決済注文を作成し、その後QuickPayの決済ゲートウェイを呼び出します。ゲートウェイは処理を続行する前にこのキーが既に存在するかどうかを確認します — 存在し既に処理中であれば、ゲートウェイは新しい取引を作成する代わりに、最初の呼び出しの結果を即座に返します。その後のNapas 247スイッチと発行銀行への呼び出しは、銀行間システムの負荷によって1秒から10秒かかることがあり、時には完全にタイムアウトすることもあるため、テスト環境で模擬遅延を伴う安定したモックが必要な最初のポイントとなります。"
        ),
        P(
          "Phần bất đồng bộ và phức tạp nhất là việc nhận kết quả qua webhook từ Napas 247: sau khi ngân hàng phát hành trừ tiền thành công, kết quả được đẩy về Merchant API dưới dạng webhook HTTP POST, có thể đến sau vài trăm mili-giây hoặc trễ tới vài phút nếu mạng liên ngân hàng nghẽn. napas 247 có cơ chế tự động gửi lại webhook nếu không nhận được HTTP 200 xác nhận trong 5 giây, nghĩa là hệ thống của QuickPay PHẢI tự chống trùng khi nhận webhook cùng transactionId hai lần — đây là nguồn bug phổ biến nếu xử lý webhook không idempotent.",
          "The most complex and asynchronous part is receiving the result via webhook from Napas 247: after the issuing bank successfully debits the funds, the result is pushed to the Merchant API as an HTTP POST webhook, which can arrive within a few hundred milliseconds or be delayed by several minutes if the interbank network is congested. napas 247 has a mechanism that automatically resends the webhook if it doesn't receive an HTTP 200 acknowledgment within 5 seconds, meaning QuickPay's system MUST self-protect against duplicates when receiving a webhook with the same transactionId twice — a common source of bugs if webhook handling isn't idempotent.",
          "最も複雑で非同期的な部分は、Napas 247からのウェブフックによる結果受信です。発行銀行が引き落としに成功した後、結果はHTTP POSTウェブフックとして加盟店APIに送信されますが、これは数百ミリ秒以内に届くこともあれば、銀行間ネットワークが混雑していれば数分遅れることもあります。napas 247には、5秒以内にHTTP 200の確認応答を受け取れない場合に自動的にウェブフックを再送する仕組みがあり、これはQuickPayのシステムが同じtransactionIdを持つウェブフックを2回受信した場合に自ら重複を防止しなければならないことを意味します — ウェブフック処理が冪等でない場合、これはよくあるバグの原因になります。"
        ),
        TIP(
          "Vẽ máy trạng thái (state machine) của giao dịch TRƯỚC khi viết test: CREATED → PENDING → SUCCESS/FAILED/EXPIRED → REFUNDED. Mỗi cạnh chuyển tiếp là một ca cần phủ, và mọi trạng thái phải có đường thoát — không được có trạng thái 'kẹt' vô thời hạn.",
          "Draw the transaction's state machine BEFORE writing tests: CREATED → PENDING → SUCCESS/FAILED/EXPIRED → REFUNDED. Every transition edge is a case to cover, and every state must have an exit path — no state should be 'stuck' indefinitely.",
          "テストを書く前に取引の状態遷移図(state machine)を描いてください: CREATED → PENDING → SUCCESS/FAILED/EXPIRED → REFUNDED。すべての遷移エッジはカバーすべきケースであり、すべての状態には出口経路が必要です — どの状態も無期限に「詰まった」状態であってはなりません。"
        ),
      ],
    },
    {
      heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ", en: "3. Data model & business invariants", ja: "3. データモデルと業務不変条件" },
      blocks: [
        P(
          "Mô hình dữ liệu cốt lõi gồm 3 thực thể chính: PaymentOrder (lệnh thanh toán, gắn với trạng thái state machine và Idempotency-Key duy nhất), GatewayTransaction (mỗi bản ghi ứng với 1 lần gọi thực sự tới napas 247, có gatewayTxnId, requestPayload, responseStatus), và LedgerEntry (bút toán ghi sổ nội bộ, gồm loại DEBIT/REFUND, số tiền, thời điểm). Hiểu đúng mô hình này là điều kiện tiên quyết để định nghĩa oracle — kết quả kỳ vọng chính xác — thay vì chỉ kiểm tra thông báo hiển thị trên màn hình.",
          "The core data model has 3 main entities: PaymentOrder (the payment order, tied to the state machine and a unique Idempotency-Key), GatewayTransaction (each record corresponds to one actual call to napas 247, with gatewayTxnId, requestPayload, responseStatus), and LedgerEntry (the internal bookkeeping entry, with type DEBIT/REFUND, amount, timestamp). Correctly understanding this model is a prerequisite for defining the oracle — the precise expected result — rather than merely checking an on-screen message.",
          "コアデータモデルには3つの主要エンティティがあります。PaymentOrder(状態遷移機と一意の冪等性キーに紐づく決済注文)、GatewayTransaction(各レコードはnapas 247への実際の1回の呼び出しに対応し、gatewayTxnId、requestPayload、responseStatusを持つ)、LedgerEntry(内部帳簿記入。DEBIT/REFUNDの種別、金額、タイムスタンプを持つ)です。このモデルを正しく理解することは、画面上のメッセージを確認するだけでなく、正確な期待結果である「オラクル」を定義するための前提条件です。"
        ),
        H("Bốn bất biến phải đúng ở MỌI thời điểm", "Four invariants that must hold at ALL times", "常に成り立つべき4つの不変条件"),
        UL(
          [
            "Idempotency-Key duy nhất: cùng một Idempotency-Key dù gọi lệnh thanh toán bao nhiêu lần cũng chỉ tạo ĐÚNG MỘT GatewayTransaction ghi nợ thật, không ghi nợ 2 lần.",
            "Bảo toàn tổng tiền: tổng số tiền đã ghi nợ trong LedgerEntry cho một PaymentOrder LUÔN khớp đúng số tiền hiển thị trên mã QR ban đầu — không thừa, không thiếu.",
            "Trạng thái cuối duy nhất: mỗi giao dịch tại mọi thời điểm chỉ ở đúng một trạng thái trong tập hợp lệ (CREATED/PENDING/SUCCESS/FAILED/EXPIRED/REFUNDED), không tồn tại trạng thái mâu thuẫn.",
            "Cân bằng sổ khi hoàn tiền: sau khi hoàn tiền một phần hoặc toàn phần, SUM(DEBIT) - SUM(REFUND) của một giao dịch phải luôn bằng đúng số tiền khách hàng thực sự còn bị giữ, không âm.",
          ],
          [
            "Unique Idempotency-Key: the same Idempotency-Key, no matter how many times the payment command is called, creates EXACTLY ONE real debiting GatewayTransaction — never double-debited.",
            "Total amount conservation: the total amount debited in LedgerEntry for a PaymentOrder ALWAYS matches exactly the amount shown on the original QR code — no more, no less.",
            "Single final state: at any point in time, a transaction is in exactly one state from the valid set (CREATED/PENDING/SUCCESS/FAILED/EXPIRED/REFUNDED), with no contradictory state existing.",
            "Ledger balance on refund: after a partial or full refund, SUM(DEBIT) - SUM(REFUND) for a transaction must always equal exactly the amount still actually held from the customer, never negative.",
          ],
          [
            "一意の冪等性キー: 同じIdempotency-Keyであれば、決済コマンドを何回呼び出しても、作成される実際の引き落としGatewayTransactionは正確に1件のみです — 二重決済は発生しません。",
            "総額の保全: PaymentOrderに対するLedgerEntryの引き落とし総額は、元のQRコードに表示された金額と常に正確に一致します — 過不足はありません。",
            "単一の最終状態: どの時点でも、取引は有効な状態集合(CREATED/PENDING/SUCCESS/FAILED/EXPIRED/REFUNDED)の中のただ1つの状態にあり、矛盾する状態は存在しません。",
            "返金時の帳簿均衡: 部分または全額返金の後、ある取引のSUM(DEBIT) - SUM(REFUND)は、顧客から実際に保持されている金額と常に正確に一致し、マイナスになってはいけません。",
          ]
        ),
        WARN(
          "Đừng bao giờ assert 'màn hình hiện Thanh toán thành công'. Hãy assert: đúng 1 GatewayTransaction với trạng thái SUCCESS trong DB, tổng LedgerEntry DEBIT = số tiền trên mã QR, và không tồn tại bản ghi GatewayTransaction thứ hai cho cùng Idempotency-Key.",
          "Never assert 'screen shows Payment successful'. Assert instead: exactly 1 GatewayTransaction with SUCCESS status in the DB, total LedgerEntry DEBIT = the amount on the QR code, and no second GatewayTransaction record exists for the same Idempotency-Key.",
          "「画面に決済成功と表示される」ことをアサートしてはいけません。代わりに、DB内にSUCCESS状態のGatewayTransactionが正確に1件存在すること、LedgerEntryのDEBIT合計がQRコード上の金額と一致すること、同じIdempotency-Keyに対して2件目のGatewayTransactionレコードが存在しないことをアサートしてください。"
        ),
      ],
    },
    {
      heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
      blocks: [
        P(
          "Rủi ro cao nhất trong luồng này không nằm ở giao diện quét mã, mà nằm ở ba điểm: (1) ghi nợ trùng lặp do client retry request khi timeout mạng, (2) webhook napas 247 gửi lại nhiều lần khiến hệ thống ghi nhận SUCCESS hai lần, và (3) hoàn tiền không cân bằng sổ khi xử lý đồng thời nhiều yêu cầu hoàn tiền cho cùng một giao dịch. Đội QA xếp hạng rủi ro theo ma trận xác suất × mức độ ảnh hưởng, trong đó nhóm ghi nợ trùng lặp được xếp mức 'Nghiêm trọng' vì xác suất trung bình-cao (mạng di động ở Việt Nam khá phổ biến chập chờn) nhân với ảnh hưởng cực cao (mất tiền thật của khách hàng, ảnh hưởng uy tín cổng thanh toán).",
          "The highest risk in this flow is not the QR-scanning UI, but three points: (1) duplicate debiting from client retries during network timeouts, (2) napas 247 resending the webhook multiple times causing the system to record SUCCESS twice, and (3) refund ledger imbalance when processing multiple concurrent refund requests for the same transaction. The QA team ranks risk using a probability × impact matrix, where duplicate debiting is ranked 'Critical' because medium-high probability (mobile networks in Vietnam are fairly prone to flakiness) multiplied by extremely high impact (real customer money lost, payment gateway reputation damage).",
          "このフローにおける最大のリスクは、QRスキャン画面ではなく、次の3つのポイントにあります。(1)ネットワークタイムアウト時のクライアント再試行による二重引き落とし、(2)napas 247がウェブフックを複数回再送し、システムがSUCCESSを2回記録してしまうこと、(3)同一取引に対する複数の同時返金リクエストを処理する際の返金帳簿の不均衡です。QAチームは確率×影響度のマトリクスでリスクを格付けし、二重引き落としは「重大」に格付けされます。これは中〜高程度の確率(ベトナムのモバイルネットワークはかなり不安定になりやすい)に極めて高い影響(顧客の実際のお金が失われ、決済ゲートウェイの信頼が損なわれる)を掛け合わせた結果です。"
        ),
        H("Kim tự tháp kiểm thử áp dụng cho luồng thanh toán QR", "Test pyramid applied to the QR payment flow", "QR決済フローに適用するテストピラミッド"),
        UL(
          [
            "Unit test (~55%): hàm sinh Idempotency-Key, hàm kiểm tra mã QR hết hạn, hàm tính số tiền hoàn còn lại.",
            "Integration/API test (~35%): luồng gọi Payment Gateway (mock), xử lý webhook napas 247 (mock kèm trễ/trùng), lệnh hoàn tiền gọi ledger nội bộ.",
            "E2E test (~10%): kịch bản đầy đủ từ quét QR tới nhận webhook SUCCESS trên môi trường staging gần giống production.",
          ],
          [
            "Unit tests (~55%): Idempotency-Key generation function, QR expiry check function, remaining refund amount calculation function.",
            "Integration/API tests (~35%): Payment Gateway call flow (mocked), napas 247 webhook handling (mocked with latency/duplication), refund command calling the internal ledger.",
            "E2E tests (~10%): full scenario from QR scan to receiving the SUCCESS webhook on a staging environment close to production.",
          ],
          [
            "ユニットテスト(約55%): 冪等性キー生成関数、QR有効期限チェック関数、残り返金額計算関数。",
            "統合・APIテスト(約35%): 決済ゲートウェイ呼び出しフロー(モック)、napas 247ウェブフック処理(遅延・重複を伴うモック)、内部台帳を呼び出す返金コマンド。",
            "E2Eテスト(約10%): ステージング環境でのQRスキャンからSUCCESSウェブフック受信までの完全なシナリオ。",
          ]
        ),
        P(
          "Chiến lược kiểm thử được chia thành 3 giai đoạn song song: giai đoạn 1 tập trung vào tính đúng đắn của Idempotency-Key (unit test cho hàm sinh key, integration test cho việc gateway phát hiện key trùng); giai đoạn 2 tập trung vào xử lý webhook bất định (mock napas 247 gửi trễ, gửi trùng, không gửi); giai đoạn 3 tập trung vào hoàn tiền và đối soát cuối ngày (test cân bằng sổ, so khớp với sao kê gateway giả lập). Ba giai đoạn này chạy song song bởi 3 nhóm nhỏ trong đội QA gồm 6 người, mỗi nhóm 2 người, với review chéo hàng tuần.",
          "The test strategy is split into 3 parallel phases: phase 1 focuses on Idempotency-Key correctness (unit tests for key generation, integration tests for the gateway detecting duplicate keys); phase 2 focuses on handling uncertain webhooks (mocking napas 247 sending late, duplicated, or never); phase 3 focuses on refunds and end-of-day reconciliation (ledger balance tests, matching against a simulated gateway statement). These three phases run in parallel across 3 sub-teams within a 6-person QA team, 2 people per sub-team, with weekly cross-review.",
          "テスト戦略は3つの並行フェーズに分けられます。フェーズ1は冪等性キーの正確性(キー生成のユニットテスト、ゲートウェイが重複キーを検出する統合テスト)、フェーズ2は不確実なウェブフックの処理(napas 247が遅延・重複・未送信を行うモック)、フェーズ3は返金と日次突合(帳簿均衡テスト、模擬ゲートウェイ明細書との照合)に焦点を当てます。これら3つのフェーズは、6人のQAチーム内の3つのサブチーム(各2人)で並行して実行され、毎週相互レビューが行われます。"
        ),
      ],
    },
    {
      heading: { vi: "5. Test Plan (entry/exit, môi trường, dữ liệu)", en: "5. Test Plan (entry/exit, environment, data)", ja: "5. テスト計画（開始・終了基準、環境、データ）" },
      blocks: [
        P(
          "Test Plan cho luồng thanh toán QR quy định rõ Entry Criteria: API contract của Payment Gateway và cơ chế webhook napas 247 đã được thống nhất và mock sẵn sàng, dữ liệu seed cho ít nhất 15 merchant mẫu ở các mức hạn mức khác nhau đã có trong môi trường staging. Exit Criteria yêu cầu: 100% ca P0 (idempotency, bảo toàn tổng tiền, trạng thái cuối duy nhất, cân bằng hoàn tiền) PASS, độ phủ luồng nghiệp vụ chính đạt tối thiểu 90%, và không còn bug mức Critical/Blocker mở trong tracker.",
          "The Test Plan for the QR payment flow specifies clear Entry Criteria: the Payment Gateway API contract and the napas 247 webhook mechanism are agreed upon and mocks are ready, seed data for at least 15 sample merchants across different limit tiers exists in staging. Exit Criteria requires: 100% of P0 cases (idempotency, total amount conservation, single final state, refund balance) PASS, main business flow coverage reaches at least 90%, and no open Critical/Blocker bugs remain in the tracker.",
          "QR決済フローのテスト計画は、明確な開始基準(エントリークライテリア)を規定しています。決済ゲートウェイのAPI契約とnapas 247ウェブフック機構が合意され、モックの準備が整っていること、様々な限度額レベルにわたる最低15件のサンプル加盟店のシードデータがステージング環境に存在することです。終了基準は、P0ケース(冪等性、総額保全、単一の最終状態、返金の帳簿均衡)の100%合格、主要業務フローのカバレッジ最低90%達成、トラッカーにCritical/Blockerレベルの未解決バグがないことを要求します。"
        ),
        H("Môi trường & vai trò", "Environment & roles", "環境と役割分担"),
        UL(
          [
            "Môi trường staging riêng cho luồng thanh toán, có ledger sandbox tách biệt khỏi production để tránh ảnh hưởng số dư thật.",
            "Napas 247 và ngân hàng phát hành được thay bằng mock server trả về kết quả có kiểm soát (deterministic) theo transactionId, có thể cấu hình độ trễ và tỉ lệ lỗi.",
            "Vai trò: 2 QA Automation viết test API/integration, 1 QA Manual kiểm thử khám phá (exploratory) cho luồng hoàn tiền, 1 DevOps hỗ trợ hạ tầng CI.",
            "Chỉ số theo dõi: tỉ lệ ca pass/fail theo build, thời gian chạy toàn bộ suite, số lượng giao dịch trùng bị phát hiện và chặn mỗi tuần.",
          ],
          [
            "A dedicated staging environment for the payment flow, with a ledger sandbox separated from production to avoid affecting real balances.",
            "Napas 247 and the issuing bank are replaced by a mock server returning deterministic results by transactionId, configurable for latency and error rate.",
            "Roles: 2 QA Automation engineers write API/integration tests, 1 Manual QA does exploratory testing on the refund flow, 1 DevOps supports CI infrastructure.",
            "Tracked metrics: pass/fail rate per build, total suite run time, number of duplicate transactions detected and blocked each week.",
          ],
          [
            "決済フロー専用のステージング環境で、実際の残高への影響を避けるため本番環境から分離された台帳サンドボックスを使用します。",
            "napas 247と発行銀行はモックサーバーに置き換えられ、transactionIdごとに決定論的な結果を返し、遅延とエラー率を設定可能です。",
            "役割分担: QA自動化担当2名がAPI・統合テストを作成し、マニュアルQA1名が返金フローの探索的テストを行い、DevOps1名がCI基盤を支援します。",
            "追跡指標: ビルドごとの合格・不合格率、スイート全体の実行時間、毎週検出・阻止される重複取引の件数。",
          ]
        ),
        NOTE(
          "Dữ liệu test phải bao phủ đủ các mức hạn mức giao dịch (dưới 500k, 500k-5tr, trên 5tr theo quy định napas 247) và ít nhất 3 tình huống độ trễ webhook khác nhau (tức thời, trễ 30s, trễ 5 phút) để phủ boundary thời gian.",
          "Test data must cover all transaction limit tiers (under 500k, 500k-5M, above 5M per napas 247 regulations) and at least 3 different webhook latency scenarios (instant, 30s delay, 5-minute delay) to cover time boundaries.",
          "テストデータは、napas 247の規定によるすべての取引限度額レベル(50万未満、50万〜500万、500万超)と、少なくとも3つの異なるウェブフック遅延シナリオ(即時、30秒遅延、5分遅延)をカバーし、時間的境界値を網羅する必要があります。"
        ),
      ],
    },
    {
      heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
      blocks: [
        P(
          "Ma trận thiết kế ca áp dụng cả ba kỹ thuật kinh điển: equivalence partitioning cho các nhóm số tiền giao dịch (dưới 500k, 500k-5tr, trên 5tr), boundary value analysis cho ngưỡng thời gian hết hạn mã QR (14 phút 59 giây / 15 phút 00 giây / 15 phút 01 giây), và decision table cho tổ hợp điều kiện idempotency (key mới, key trùng đang xử lý, key trùng đã hoàn tất). Cách tiếp cận này giúp giảm số lượng ca cần viết nhưng vẫn đảm bảo phủ các điểm dễ sinh lỗi nhất.",
          "The test case design matrix applies all three classic techniques: equivalence partitioning for transaction amount groups (under 500k, 500k-5M, above 5M), boundary value analysis for the QR expiry time threshold (14 min 59 sec / 15 min 00 sec / 15 min 01 sec), and decision tables for idempotency condition combinations (new key, duplicate key still processing, duplicate key already completed). This approach reduces the number of cases needed while still ensuring coverage of the most error-prone points.",
          "テストケース設計マトリクスは3つの古典的手法をすべて適用します。取引金額グループ(50万未満、50万〜500万、500万超)の同値分割、QR有効期限のしきい値(14分59秒／15分00秒／15分01秒)の境界値分析、冪等性条件の組み合わせ(新規キー、処理中の重複キー、完了済みの重複キー)のデシジョンテーブルです。このアプローチにより、必要なケース数を減らしながらも、最もエラーが発生しやすいポイントのカバレッジを確保できます。"
        ),
        IMG(
          svgMatrix,
          "Ma trận thiết kế ca kiểm thử cho luồng thanh toán QR, trích các nhóm happy/boundary/negative/idempotency/refund.",
          "Test case design matrix for the QR payment flow, showing happy/boundary/negative/idempotency/refund groups.",
          "QR決済フローのテストケース設計マトリクス。ハッピーパス・境界値・ネガティブ・冪等性・返金のグループを抜粋。"
        ),
        TIP(
          "Đặt tên ca theo mẫu 'given_khi_thì' để review nhanh: ví dụ 'given_duplicateIdempotencyKey_when_retryPayment_then_singleDebit', giúp cả QA và dev đọc hiểu ngay mục đích ca mà không cần mở code.",
          "Name cases using a 'given_when_then' pattern for fast review: e.g. 'given_duplicateIdempotencyKey_when_retryPayment_then_singleDebit', letting both QA and devs instantly understand the case's purpose without opening the code.",
          "レビューを迅速にするため「given_when_then」パターンでケース名を付けてください。例えば'given_duplicateIdempotencyKey_when_retryPayment_then_singleDebit'とすることで、QAも開発者もコードを開かずにケースの目的を即座に理解できます。"
        ),
      ],
    },
    {
      heading: { vi: "7. Chuẩn bị dữ liệu & mock cổng thanh toán", en: "7. Data & gateway mock preparation", ja: "7. データと決済ゲートウェイモックの準備" },
      blocks: [
        P(
          "Để test chạy ổn định và lặp lại được, đội QA xây dựng một bộ API test-only chỉ mở trong môi trường staging: POST /test/seed/merchant để tạo merchant với hạn mức định sẵn, POST /test/mock/gateway để cấu hình kết quả trả về (SUCCESS/FAILED/TIMEOUT) và độ trễ cho một transactionId cụ thể, và POST /test/mock/webhook/replay để giả lập napas 247 gửi lại webhook trùng lặp có kiểm soát. Các API này được bảo vệ bằng token riêng và tự động vô hiệu hoá nếu biến môi trường ENV khác 'staging', tránh rủi ro bị lạm dụng trên production.",
          "For tests to run stably and repeatably, the QA team builds a test-only API suite exposed only in staging: POST /test/seed/merchant to create a merchant with a predefined limit, POST /test/mock/gateway to configure the returned result (SUCCESS/FAILED/TIMEOUT) and latency for a specific transactionId, and POST /test/mock/webhook/replay to simulate napas 247 sending a controlled duplicate webhook. These APIs are protected by a dedicated token and auto-disabled if the ENV variable differs from 'staging', preventing abuse risk on production.",
          "テストが安定して再現可能に実行されるよう、QAチームはステージング環境でのみ公開されるテスト専用APIスイートを構築します。POST /test/seed/merchantで事前定義された限度額を持つ加盟店を作成し、POST /test/mock/gatewayで特定のtransactionIdに対して返される結果(SUCCESS/FAILED/TIMEOUT)と遅延を設定し、POST /test/mock/webhook/replayでnapas 247が制御された重複ウェブフックを送信する状況をシミュレートします。これらのAPIは専用トークンで保護されており、ENV変数が'staging'と異なる場合は自動的に無効化され、本番環境での悪用リスクを防ぎます。"
        ),
        CODE(
          "bash",
          `# Seed một merchant có hạn mức giao dịch tốt, dùng cho happy path
curl -X POST https://staging.quickpay.local/test/seed/merchant \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchantId": "MER-QR-0001",
    "dailyLimit": 500000000,
    "vietqrBin": "970436"
  }'

# Cấu hình mock gateway trả SUCCESS sau 800ms cho 1 transactionId cụ thể
curl -X POST https://staging.quickpay.local/test/mock/gateway \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "transactionId": "TXN-0001", "result": "SUCCESS", "latencyMs": 800 }'

# Giả lập napas 247 gửi lại webhook SUCCESS trùng lặp sau 3 giây
curl -X POST https://staging.quickpay.local/test/mock/webhook/replay \\
  -H "X-Test-Token: $TEST_ONLY_TOKEN" \\
  -d '{ "transactionId": "TXN-0001", "delayMs": 3000, "times": 2 }'`
        ),
        WARN(
          "Không bao giờ để API test-only tồn tại ở môi trường production, kể cả khi bị vô hiệu hoá bằng feature flag — hãy loại bỏ hoàn toàn khỏi build production bằng compile-time flag để tránh rủi ro bảo mật nghiêm trọng.",
          "Never let test-only APIs exist in production, even if disabled via feature flag — strip them entirely from the production build using a compile-time flag to avoid a serious security risk.",
          "テスト専用APIを、フィーチャーフラグで無効化されている場合でも、本番環境に存在させてはいけません — 深刻なセキュリティリスクを避けるため、コンパイル時フラグを使って本番ビルドから完全に除去してください。"
        ),
      ],
    },
    {
      heading: { vi: "8. Automation happy path (POM/fixtures)", en: "8. Happy-path automation (POM/fixtures)", ja: "8. ハッピーパスの自動化（POM／フィクスチャ）" },
      blocks: [
        P(
          "Với luồng quét mã có giao diện web/app thu ngân, đội QA áp dụng Page Object Model (POM) để tách logic thao tác UI khỏi logic assertion, giúp test dễ bảo trì khi giao diện thay đổi. Fixture chuẩn bị sẵn một merchant có hạn mức tốt trước khi test chạy, và dọn dẹp dữ liệu sau khi test kết thúc để không ảnh hưởng lần chạy tiếp theo.",
          "For the QR-scanning flow with a web/cashier-app UI, the QA team applies the Page Object Model (POM) to separate UI interaction logic from assertion logic, making tests easier to maintain when the UI changes. A fixture prepares a merchant with a good limit before the test runs, and cleans up data afterward so it doesn't affect the next run.",
          "レジ用Web/アプリUIを持つQRスキャンフローでは、QAチームはページオブジェクトモデル(POM)を適用し、UI操作ロジックとアサーションロジックを分離することで、UIが変更された際のテスト保守性を高めます。フィクスチャは、テスト実行前に良好な限度額を持つ加盟店を準備し、テスト終了後にデータをクリーンアップして次回の実行に影響しないようにします。"
        ),
        CODE(
          "typescript",
          `// pages/qr-checkout.page.ts — Page Object cho màn hình thu ngân quét QR
import { Page, expect } from "@playwright/test";

export class QrCheckoutPage {
  constructor(private page: Page) {}

  async open(invoiceId: string) {
    await this.page.goto(\`/checkout/\${invoiceId}\`);
  }

  async generateQr(amount: number) {
    await this.page.getByLabel("Số tiền").fill(String(amount));
    await this.page.getByRole("button", { name: "Tạo mã QR" }).click();
  }

  async simulateScanAndPay(idempotencyKey: string) {
    // Trong test, gọi thẳng API thanh toán mô phỏng hành vi app ngân hàng khách quét mã
    await this.page.evaluate((key) => window.__testHooks.payViaQr(key), idempotencyKey);
  }

  async expectStatus(status: string) {
    await expect(this.page.getByTestId("payment-status")).toHaveText(status, { timeout: 15000 });
  }
}`
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.happy.spec.ts — Happy path: tạo QR -> quét -> gateway SUCCESS -> ghi sổ đúng 1 lần
import { test, expect } from "@playwright/test";
import { QrCheckoutPage } from "../pages/qr-checkout.page";
import { seedMerchant, mockGateway, getLedgerEntries, getPaymentOrder } from "../fixtures/qr-fixtures";

test.beforeEach(async () => {
  await seedMerchant("MER-QR-0001", { dailyLimit: 500_000_000 });
});

test("hoá đơn 250.000đ, gateway SUCCESS lần đầu -> ghi nợ đúng 1 lần, đúng số tiền", async ({ page }) => {
  const idemKey = "invoice-INV-1001-" + Date.now();
  await mockGateway("TXN-AUTO-0001", { result: "SUCCESS", latencyMs: 600 });

  const checkoutPage = new QrCheckoutPage(page);
  await checkoutPage.open("INV-1001");
  await checkoutPage.generateQr(250_000);
  await checkoutPage.simulateScanAndPay(idemKey);

  await checkoutPage.expectStatus("SUCCESS");

  // Oracle: đúng 1 GatewayTransaction, tổng LedgerEntry DEBIT khớp số tiền QR
  const order = await getPaymentOrder(idemKey);
  expect(order.status).toBe("SUCCESS");
  const ledger = await getLedgerEntries(order.orderId);
  const totalDebit = ledger.filter((e: any) => e.type === "DEBIT").reduce((s: number, e: any) => s + e.amount, 0);
  expect(totalDebit).toBe(250_000);
  expect(ledger.filter((e: any) => e.type === "DEBIT").length).toBe(1);
});`
        ),
      ],
    },
    {
      heading: { vi: "9. Ca lỗi: timeout, retry & trùng giao dịch", en: "9. Failure cases: timeout, retry & duplicate transactions", ja: "9. 異常系ケース: タイムアウト・リトライ・重複決済" },
      blocks: [
        P(
          "Đây là chương giá trị nhất của tài liệu: các ca lỗi mà nếu bỏ sót sẽ gây thiệt hại tài chính thật cho khách hàng. Ba nhóm trọng tâm là retry do timeout mạng với cùng Idempotency-Key, webhook napas 247 gửi trùng lặp, và giao dịch hết hạn xử lý (PENDING_RECONCILE) không được tự động chuyển thành SUCCESS/FAILED.",
          "This is the most valuable chapter in the document: the failure cases that, if missed, cause real financial damage to customers. The three focus areas are retries from network timeouts with the same Idempotency-Key, duplicated napas 247 webhooks, and transactions exceeding the processing window (PENDING_RECONCILE) that must not be auto-converted to SUCCESS/FAILED.",
          "これはドキュメントの中で最も価値のある章です。見落とすと顧客に実際の財務的損害を引き起こす異常系ケースを扱います。3つの重点分野は、同じIdempotency-Keyでのネットワークタイムアウトによる再試行、napas 247の重複ウェブフック、そして処理期限を超過した取引(PENDING_RECONCILE)がSUCCESS/FAILEDへ自動変換されてはならないことです。"
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.idempotency.spec.ts — chống ghi nợ trùng khi client retry
test("gửi 2 request thanh toán đồng thời cùng idempotency-key -> chỉ 1 giao dịch ghi nợ thật", async ({ request }) => {
  const idemKey = "retry-" + Date.now();
  await mockGateway("TXN-AUTO-0002", { result: "SUCCESS", latencyMs: 1200 });

  const [r1, r2] = await Promise.all([
    request.post("/api/payments", { headers: { "Idempotency-Key": idemKey }, data: { invoiceId: "INV-1002", amount: 500_000 } }),
    request.post("/api/payments", { headers: { "Idempotency-Key": idemKey }, data: { invoiceId: "INV-1002", amount: 500_000 } }),
  ]);

  expect([r1.status(), r2.status()].sort()).toEqual([200, 200]); // lần 2 trả cached result, không tạo mới
  const order = await getPaymentOrderByKey(idemKey);
  const gwTxns = await getGatewayTransactions(order.orderId);
  // Oracle: chỉ đúng MỘT GatewayTransaction ghi nợ thật, không phải hai
  expect(gwTxns.length).toBe(1);
  expect(gwTxns[0].amount).toBe(500_000);
});`
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.webhook-duplicate.spec.ts — webhook napas 247 gửi trùng lặp
test("napas 247 gửi lại webhook SUCCESS 2 lần cho cùng transactionId -> chỉ ghi sổ 1 lần", async ({ request }) => {
  const order = await createPendingOrder({ amount: 1_200_000 });

  // Webhook lần 1: cập nhật ledger
  const w1 = await request.post("/webhooks/napas247", { data: { transactionId: order.gatewayTxnId, status: "SUCCESS", amount: 1_200_000 } });
  expect(w1.status()).toBe(200);

  // Webhook lần 2 (napas 247 tự động gửi lại do không nhận HTTP 200 kịp 5s trong môi trường thật)
  const w2 = await request.post("/webhooks/napas247", { data: { transactionId: order.gatewayTxnId, status: "SUCCESS", amount: 1_200_000 } });
  expect(w2.status()).toBe(200); // vẫn trả 200 để napas 247 ngừng gửi lại, nhưng KHÔNG ghi sổ lần 2

  const ledger = await getLedgerEntries(order.orderId);
  expect(ledger.filter((e: any) => e.type === "DEBIT").length).toBe(1);
  const totalDebit = ledger.reduce((s: number, e: any) => s + (e.type === "DEBIT" ? e.amount : 0), 0);
  expect(totalDebit).toBe(1_200_000);
});`
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.gateway-timeout.spec.ts — gateway timeout không được tự SUCCESS/FAILED
test("gateway không phản hồi trong 10s -> giao dịch PENDING_RECONCILE, tuyệt đối không tự SUCCESS", async ({ request }) => {
  await mockGateway("TXN-AUTO-0003", { result: "TIMEOUT", timeoutMs: 15_000 }); // SLA gọi gateway là 10s

  const res = await request.post("/api/payments", {
    headers: { "Idempotency-Key": "timeout-" + Date.now() },
    data: { invoiceId: "INV-1003", amount: 800_000 },
  });
  const body = await res.json();

  expect(body.status).toBe("PENDING_RECONCILE");
  // Oracle: không có bút toán ghi nợ nào cho tới khi có xác nhận rõ ràng từ webhook hoặc đối soát thủ công
  const ledger = await getLedgerEntries(body.orderId);
  expect(ledger.length).toBe(0);
});`
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.expired-qr.spec.ts — mã QR hết hạn không được gọi gateway
test("khách quét mã QR đã hết hạn 15 phút -> EXPIRED, không gửi lệnh sang gateway", async ({ request }) => {
  const order = await createOrderWithExpiry({ amount: 300_000, expiresInMs: -1000 }); // đã hết hạn 1 giây trước

  const res = await request.post(\`/api/payments/\${order.orderId}/confirm\`, {
    headers: { "Idempotency-Key": "expired-" + Date.now() },
  });
  const body = await res.json();

  expect(body.status).toBe("EXPIRED");
  const gwTxns = await getGatewayTransactions(order.orderId);
  // Oracle: hồ sơ không được đẩy sang gateway vì đã bị chặn ở bước kiểm tra hạn mã QR
  expect(gwTxns.length).toBe(0);
});`
        ),
      ],
    },
    {
      heading: { vi: "10. Đối soát cổng thanh toán & hoàn tiền", en: "10. Gateway reconciliation & refunds", ja: "10. 決済ゲートウェイ突合と返金" },
      blocks: [
        P(
          "Cuối mỗi ngày, hệ thống chạy job đối soát tự động so khớp sổ ledger nội bộ với sao kê giao dịch từ napas 247. QA phải test cả ba tình huống: khớp hoàn toàn (matched), lệch do giao dịch chỉ có ở phía QuickPay nhưng không có ở sao kê napas 247 (orphan), và lệch do giao dịch có ở sao kê napas 247 nhưng không tồn tại trong ledger nội bộ (missing) — trường hợp thứ hai thường xảy ra khi webhook bị mất do sự cố hạ tầng, và bắt buộc phải có cơ chế bù trừ thủ công có kiểm soát.",
          "At the end of each day, the system runs an automated reconciliation job matching the internal ledger against the transaction statement from napas 247. QA must test all three scenarios: fully matched, mismatched because a transaction exists only on QuickPay's side but not in the napas 247 statement (orphan), and mismatched because a transaction exists in the napas 247 statement but not in the internal ledger (missing) — the second case typically happens when a webhook is lost due to an infrastructure incident, and requires a controlled manual compensation mechanism.",
          "毎日の終業時に、システムは内部台帳とnapas 247からの取引明細書を照合する自動突合ジョブを実行します。QAは3つのシナリオすべてをテストしなければなりません。完全一致(matched)、QuickPay側にのみ取引が存在しnapas 247明細書には存在しない不一致(orphan)、napas 247明細書には取引が存在するが内部台帳には存在しない不一致(missing)です — 2番目のケースは通常、インフラ障害によりウェブフックが失われた場合に発生し、制御された手動補正メカニズムが必須です。"
        ),
        CODE(
          "typescript",
          `// tests/qr-payment.reconciliation.spec.ts — đối soát cuối ngày phát hiện giao dịch 'missing'
test("napas 247 có giao dịch SUCCESS nhưng ledger nội bộ chưa ghi (webhook bị mất) -> job đối soát gắn cờ MISSING", async () => {
  const order = await createPendingOrder({ amount: 2_000_000 });
  await seedNapasStatementLine({ gatewayTxnId: order.gatewayTxnId, status: "SUCCESS", amount: 2_000_000 });
  // Cố tình KHÔNG gửi webhook để mô phỏng webhook bị mất trên hạ tầng thật

  const report = await runDailyReconciliationJob();

  const missingEntry = report.mismatches.find((m: any) => m.orderId === order.orderId);
  expect(missingEntry).toBeDefined();
  expect(missingEntry.type).toBe("MISSING_IN_LEDGER");
  // Oracle: job KHÔNG tự động ghi sổ, chỉ gắn cờ để vận hành xử lý thủ công có kiểm soát
  const ledger = await getLedgerEntries(order.orderId);
  expect(ledger.length).toBe(0);
});

// tests/qr-payment.refund.spec.ts — hoàn tiền một phần phải cân bằng sổ
test("hoàn tiền một phần 300.000đ cho giao dịch SUCCESS 1.000.000đ -> sổ cân bằng đúng 700.000đ còn giữ", async () => {
  const order = await createSuccessOrder({ amount: 1_000_000 });
  await requestRefund(order.orderId, { amount: 300_000, reason: "Khách trả lại 1 phần hàng" });

  const ledger = await getLedgerEntries(order.orderId);
  const totalDebit = ledger.filter((e: any) => e.type === "DEBIT").reduce((s: number, e: any) => s + e.amount, 0);
  const totalRefund = ledger.filter((e: any) => e.type === "REFUND").reduce((s: number, e: any) => s + e.amount, 0);
  // Oracle: DEBIT - REFUND = số tiền khách còn thực sự bị giữ
  expect(totalDebit - totalRefund).toBe(700_000);
  const finalOrder = await getPaymentOrder(order.orderId);
  expect(finalOrder.status).toBe("SUCCESS"); // hoàn 1 phần không đổi trạng thái tổng, chỉ REFUNDED khi hoàn toàn phần
});`
        ),
        NOTE(
          "Với hoàn tiền toàn phần (refund = debit gốc), trạng thái PaymentOrder phải chuyển hẳn sang REFUNDED và không được chấp nhận thêm bất kỳ yêu cầu hoàn tiền nào nữa cho cùng orderId.",
          "For a full refund (refund = original debit), the PaymentOrder status must transition fully to REFUNDED and must not accept any further refund requests for the same orderId.",
          "全額返金(返金額=元の引き落とし額)の場合、PaymentOrderの状態は完全にREFUNDEDへ遷移しなければならず、同じorderIdに対するそれ以上の返金リクエストを受け付けてはいけません。"
        ),
      ],
    },
    {
      heading: { vi: "11. CI/CD & giám sát", en: "11. CI/CD & monitoring", ja: "11. CI/CDと監視" },
      blocks: [
        P(
          "Toàn bộ bộ test được đưa vào pipeline chạy trên mỗi pull request, chia shard để giảm thời gian chờ, và có một job riêng biệt (gate-p0) chặn merge nếu bất kỳ ca P0 nào (idempotency, bảo toàn tổng tiền, trạng thái cuối duy nhất, cân bằng hoàn tiền) không đạt 100%. Ngoài ra, một job k6 chạy định kỳ mô phỏng 50 request thanh toán đồng thời cùng Idempotency-Key để phát hiện sớm mọi hồi quy (regression) về race condition trong cơ chế chống trùng.",
          "The entire test suite is wired into a pipeline running on every pull request, sharded to reduce wait time, with a separate job (gate-p0) blocking merges if any P0 case (idempotency, total amount conservation, single final state, refund balance) doesn't reach 100%. Additionally, a scheduled k6 job simulates 50 concurrent payment requests with the same Idempotency-Key to catch any regression in the anti-duplicate race-condition handling early.",
          "テストスイート全体は、プルリクエストごとに実行されるパイプラインに組み込まれ、待ち時間を減らすためにシャード分割され、P0ケース(冪等性、総額保全、単一の最終状態、返金の帳簿均衡)のいずれかが100%に達しない場合にマージをブロックする専用ジョブ(gate-p0)を持ちます。さらに、定期的に実行されるk6ジョブが同じIdempotency-Keyで50件の同時決済リクエストをシミュレートし、重複防止機構のレースコンディションに関する回帰を早期に検出します。"
        ),
        CODE(
          "yaml",
          `# .github/workflows/qr-payment-tests.yml
name: qr-payment-tests
on: [pull_request]
jobs:
  functional-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - name: Run shard \${{ matrix.shard }}/4
        run: npx playwright test --shard=\${{ matrix.shard }}/4
        env:
          TEST_ONLY_TOKEN: \${{ secrets.TEST_ONLY_TOKEN }}

  gate-p0:
    needs: functional-test
    runs-on: ubuntu-latest
    steps:
      - name: Ca P0 (idempotency, bảo toàn tổng tiền, trạng thái cuối, cân bằng hoàn tiền) phải PASS 100%
        run: node scripts/check-p0-gate.js --tag=P0 --require=100

  nightly-load-k6:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run k6 concurrent same-idempotency-key scenario
        run: k6 run --vus 50 --duration 2m scripts/k6-idempotency-race.js`
        ),
        NOTE(
          "Theo dõi thêm chỉ số 'số webhook trùng bị chặn mỗi ngày' và 'số giao dịch PENDING_RECONCILE quá 1 giờ' trên dashboard — nếu con số này tăng đột biến, thường báo hiệu napas 247 hoặc một ngân hàng phát hành cụ thể đang gặp sự cố cần liên hệ ngay.",
          "Also track the 'number of duplicate webhooks blocked per day' and 'number of PENDING_RECONCILE transactions exceeding 1 hour' metrics on the dashboard — a sudden spike in these numbers usually signals napas 247 or a specific issuing bank having an incident that needs immediate contact.",
          "ダッシュボードで「1日あたりブロックされた重複ウェブフック数」と「1時間を超えるPENDING_RECONCILE取引数」の指標も追跡してください — これらの数値の急増は通常、napas 247または特定の発行銀行が障害を起こしており、即座に連絡が必要であることを示します。"
        ),
      ],
    },
    {
      heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェントの統合" },
      blocks: [
        P(
          "AI Agent nội bộ được dùng để phân tích log của các giao dịch PENDING_RECONCILE quá hạn và tìm mẫu số chung — ví dụ phát hiện rằng 70% giao dịch treo trong tuần đều gọi tới cùng một ngân hàng phát hành, gợi ý đội vận hành ưu tiên điều tra kết nối tới ngân hàng đó trước. AI cũng hỗ trợ soạn thảo ca kiểm thử cho một chuẩn QR mới (ví dụ mở rộng sang QR quốc tế) dựa trên tài liệu đặc tả do napas cung cấp. AI KHÔNG được tự động kích hoạt hoàn tiền hay ghi sổ bù trừ cho giao dịch lệch đối soát — quyết định này luôn cần một kỹ sư vận hành xác nhận thủ công.",
          "The internal AI Agent is used to analyze logs of overdue PENDING_RECONCILE transactions and find common patterns — for example, detecting that 70% of stuck transactions this week call the same issuing bank, suggesting operations prioritize investigating that bank's connection first. AI also helps draft test cases for a new QR standard (e.g. expanding to international QR) based on specification documents napas provides. AI must NOT auto-trigger a refund or a compensating ledger entry for a reconciliation-mismatched transaction — this decision always requires manual confirmation from an operations engineer.",
          "社内AIエージェントは、期限超過のPENDING_RECONCILE取引のログを分析し、共通パターンを見つけるために使用されます — 例えば、今週の滞留取引の70%が同じ発行銀行を呼び出していることを検出し、運用チームがその銀行との接続の調査を優先するよう提案します。AIはまた、napasが提供する仕様書に基づいて新しいQR規格(例えば国際QRへの拡張)向けテストケースの草案作成を支援します。AIは突合不一致の取引に対する返金や補正仕訳を自動トリガーしてはいけません — この決定は常に運用エンジニアによる手動確認を必要とします。"
        ),
        H("Ranh giới trách nhiệm AI làm / người giữ", "AI-does / human-keeps responsibility boundary", "AIが行う範囲・人間が保持する範囲の境界"),
        UL(
          [
            "AI được làm: phân tích log tìm mẫu số chung của giao dịch treo, soạn nháp ca kiểm thử cho chuẩn QR mới, tóm tắt báo cáo đối soát hàng ngày.",
            "Người phải giữ: quyết định kích hoạt hoàn tiền hoặc bù trừ thủ công cho giao dịch lệch đối soát, phê duyệt thêm đối tác gateway mới vào production, xác nhận oracle trước khi merge test.",
            "Mọi gợi ý điều tra của AI phải kèm bằng chứng (log gốc, số liệu cụ thể) để kỹ sư vận hành có thể tự kiểm chứng trước khi hành động.",
          ],
          [
            "AI may do: analyze logs to find common patterns in stuck transactions, draft test cases for new QR standards, summarize daily reconciliation reports.",
            "Humans must keep: the decision to trigger a manual refund or compensating entry for a reconciliation-mismatched transaction, approving new gateway partners for production, confirming the oracle before merging tests.",
            "Every AI investigation suggestion must include supporting evidence (raw logs, specific figures) so operations engineers can verify it themselves before acting.",
          ],
          [
            "AIが行ってよいこと: 滞留取引の共通パターンを見つけるためのログ分析、新しいQR規格向けテストケースの草案作成、日次突合レポートの要約。",
            "人間が保持すべきこと: 突合不一致取引に対する手動返金または補正仕訳のトリガー決定、本番環境への新規ゲートウェイパートナー承認、テストマージ前のオラクル確認。",
            "AIによるすべての調査提案には、運用エンジニアが行動前に自ら検証できるよう、裏付けとなる証拠(元のログ、具体的な数値)を含めなければなりません。",
          ]
        ),
        WARN(
          "Không cấp cho AI Agent quyền ghi trực tiếp vào bảng PaymentOrder hay LedgerEntry trên production dưới bất kỳ hình thức nào — mọi thay đổi trạng thái tài chính phải đi qua API nghiệp vụ có kiểm soát và log đầy đủ.",
          "Never grant an AI Agent direct write access to the PaymentOrder or LedgerEntry tables in production under any circumstances — every financial state change must go through a controlled, fully-logged business API.",
          "いかなる状況であっても、AIエージェントに本番環境のPaymentOrderやLedgerEntryテーブルへの直接書き込み権限を与えてはいけません — あらゆる財務状態の変更は、制御され完全にログされた業務APIを経由しなければなりません。"
        ),
      ],
    },
    {
      heading: { vi: "13. Góc phỏng vấn", en: "13. Interview corner", ja: "13. 面接コーナー" },
      blocks: [
        QA(
          "Tại sao chỉ dùng transactionId làm khoá chống trùng là chưa đủ, và Idempotency-Key khác gì so với transactionId?",
          "Why is using only transactionId as the anti-duplicate key insufficient, and how does an Idempotency-Key differ from transactionId?",
          "transactionId thường do PHÍA GATEWAY sinh ra SAU KHI đã xử lý, nên nếu client bị timeout trước khi nhận được transactionId, client không có gì để so sánh cho lần retry — hệ thống vẫn có thể tạo giao dịch mới. Idempotency-Key phải do CLIENT sinh ra TRƯỚC khi gửi request lần đầu và gửi kèm ở mọi lần gọi (kể cả retry), để gateway có thể nhận diện 'đây là cùng một ý định thanh toán' ngay từ đầu, trước khi biết kết quả xử lý.",
          "transactionId is typically generated by the GATEWAY SIDE AFTER processing has occurred, so if the client times out before receiving the transactionId, the client has nothing to compare on retry — the system could still create a new transaction. An Idempotency-Key must be generated by the CLIENT BEFORE sending the first request and included on every call (including retries), so the gateway can recognize 'this is the same payment intent' from the very start, before knowing the processing result.",
          "唯一の重複防止キーとしてtransactionIdだけを使うのが不十分なのはなぜですか。また、Idempotency-Keyはtransactionidとどう違いますか？",
          "transactionIdは通常、処理が行われた後にゲートウェイ側で生成されるため、クライアントがtransactionIdを受け取る前にタイムアウトした場合、クライアントは再試行時に比較する対象がありません — システムは新しい取引を作成してしまう可能性があります。Idempotency-Keyは、最初のリクエストを送信する前にクライアント側で生成され、すべての呼び出し(再試行を含む)に含められなければなりません。これにより、ゲートウェイは処理結果を知る前の最初の段階から「これは同じ決済意図である」ことを認識できます。"
        ),
        QA(
          "Nếu webhook napas 247 báo SUCCESS nhưng đến SAU khi hệ thống đã tự động chuyển giao dịch sang EXPIRED do quá thời gian chờ, bạn sẽ xử lý ca này như thế nào và QA cần test gì?",
          "If the napas 247 webhook reports SUCCESS but arrives AFTER the system has already auto-transitioned the transaction to EXPIRED due to exceeding the wait time, how would you handle this case and what should QA test?",
          "Đây là ca 'webhook trễ sau khi hết hạn xử lý' — tuyệt đối không được im lặng bỏ qua webhook này, vì tiền THẬT đã bị trừ ở phía ngân hàng phát hành dù hệ thống nội bộ đã coi là EXPIRED. Xử lý đúng là: hệ thống phải phát hiện mâu thuẫn trạng thái (EXPIRED nhưng webhook báo SUCCESS), tự động gắn cờ 'cần đối soát thủ công' và tạm thời KHÔNG tự chuyển sang SUCCESS lẫn tự động hoàn tiền, chờ vận hành xác nhận rồi mới xử lý đúng. QA cần test ca: webhook SUCCESS đến sau khi transaction đã EXPIRED, assert hệ thống tạo một 'ReconciliationFlag' thay vì tự thay đổi trạng thái.",
          "napas 247のウェブフックがSUCCESSを報告しますが、システムが待機時間超過により既に取引をEXPIREDに自動遷移させた後に到着した場合、このケースをどのように処理し、QAは何をテストすべきですか？",
          "これは「処理期限後に遅れて届くウェブフック」のケースです — 内部システムがEXPIREDと見なしていても、発行銀行側では実際のお金が既に引き落とされているため、このウェブフックを黙って無視することは絶対にあってはいけません。正しい処理は、システムが状態の矛盾(EXPIREDなのにウェブフックはSUCCESSを報告)を検出し、自動的に「手動突合が必要」のフラグを立て、一時的にSUCCESSへの自動遷移も自動返金も行わず、運用が確認してから正しく処理することです。QAは、取引がEXPIREDになった後にSUCCESSウェブフックが到着するケースをテストし、システムが状態を自ら変更するのではなく「ReconciliationFlag」を作成することをアサートする必要があります。"
        ),
        QA(
          "Khi thiết kế test cho hệ thống hỗ trợ nhiều ngân hàng phát hành khác nhau kết nối qua napas 247, bạn ưu tiên chiến lược nào để tránh viết N bộ test trùng lặp?",
          "When designing tests for a system supporting many different issuing banks connected via napas 247, what strategy would you prioritize to avoid writing N duplicate test suites?",
          "Tôi sẽ áp dụng data-driven testing: viết MỘT bộ test case chung cho luồng nghiệp vụ (tạo lệnh, gọi gateway, nhận webhook, đối soát), sau đó tham số hoá ngân hàng phát hành qua một adapter interface chung. Test chạy lặp qua danh sách các ngân hàng, mỗi ngân hàng chỉ cần cấu hình mock riêng (định dạng webhook, độ trễ đặc trưng, mã lỗi riêng) mà không cần viết lại toàn bộ logic assertion — giúp giảm N lần công sức bảo trì xuống còn 1 lần.",
          "napas 247経由で接続する多数の異なる発行銀行をサポートするシステムのテストを設計する際、N個の重複したテストスイートを書くことを避けるためにどのような戦略を優先しますか？",
          "私はデータ駆動型テストを適用します。業務フロー(注文作成、ゲートウェイ呼び出し、ウェブフック受信、突合)に対して1つの共通テストケースセットを書き、共通のアダプターインターフェースを通じて発行銀行をパラメータ化します。テストは銀行のリストをループし、各銀行は独自のモック設定(ウェブフック形式、特有の遅延、独自のエラーコード)のみが必要で、アサーションロジック全体を書き直す必要はありません — これによりN倍の保守労力を1倍に削減します。"
        ),
        SCEN(
          "Phỏng vấn mock: Interviewer hỏi 'Đội vận hành báo cáo có 150 giao dịch bị treo ở PENDING_RECONCILE hơn 1 giờ, tất cả đều liên quan tới cùng một ngân hàng phát hành. Bạn sẽ điều tra và đề xuất gì?'",
          "Mock interview: the interviewer asks 'Operations reports 150 transactions stuck at PENDING_RECONCILE for over 1 hour, all related to the same issuing bank. What would you investigate and propose?'",
          "Trả lời mẫu: Trước tiên tôi kiểm tra xem cấu hình timeout gọi gateway/napas 247 có đang đúng SLA đã thoả thuận không, và xem log gần nhất từ ngân hàng phát hành đó có báo lỗi kết nối hàng loạt hay không. Nếu xác nhận ngân hàng đó đang gặp sự cố hạ tầng thực sự, tôi đề xuất tạm dừng nhận giao dịch mới hướng tới ngân hàng đó (circuit breaker), thông báo cho merchant hiển thị 'tạm thời không khả dụng' thay vì để khách chờ vô thời hạn, đồng thời chạy đối soát thủ công có kiểm soát cho 150 giao dịch treo sau khi ngân hàng xác nhận trạng thái thực tế của từng giao dịch.",
          "モック面接: 面接官が「運用チームが150件の取引が1時間以上PENDING_RECONCILEのまま滞留しており、すべて同じ発行銀行に関連していると報告しています。何を調査し、何を提案しますか？」と質問します。",
          "回答例: まずゲートウェイ/napas 247呼び出しのタイムアウト設定が合意されたSLAに従っているかを確認し、その発行銀行からの直近のログに大量の接続エラーが報告されていないかを確認します。その銀行が実際にインフラ障害を起こしていると確認できた場合、その銀行宛ての新規取引の受付を一時停止すること(サーキットブレーカー)を提案し、顧客を無期限に待たせる代わりに加盟店に「一時的に利用不可」と表示するよう通知し、銀行が各取引の実際の状態を確認した後、150件の滞留取引に対して制御された手動突合を実行します。"
        ),
      ],
    },
    {
      heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
      blocks: [
        P(
          "Bài này đã xây dựng chiến lược kiểm thử toàn diện cho luồng thanh toán QR VietQR/napas 247, đặt trọng tâm vào bất biến Idempotency-Key chống ghi nợ trùng và xử lý đúng đắn các tình huống bất định của webhook bất đồng bộ. Điểm mấu chốt: trong hệ thống thanh toán QR, phần khó nhất không phải là happy path quét mã mà là những khoảng lặng bất định — khi webhook trễ, trùng, hoặc không bao giờ đến, và khi retry của client có thể vô tình tạo ra giao dịch thứ hai nếu không có Idempotency-Key nghiêm ngặt.",
          "This article has built a comprehensive test strategy for the VietQR/napas 247 QR payment flow, focused on the Idempotency-Key invariant preventing duplicate debits and correctly handling the uncertain scenarios of asynchronous webhooks. The key takeaway: in a QR payment system, the hardest part isn't the QR-scanning happy path but the uncertain silences — when a webhook is late, duplicated, or never arrives, and when a client retry could accidentally create a second transaction without a strict Idempotency-Key.",
          "この記事は、VietQR/napas 247のQR決済フローに対する包括的なテスト戦略を構築し、二重引き落としを防ぐIdempotency-Keyの不変条件と、非同期ウェブフックの不確実なシナリオの正しい処理に焦点を当てました。重要なポイントは、QR決済システムにおいて最も難しい部分はQRスキャンのハッピーパスではなく、不確実な沈黙 — ウェブフックが遅れる、重複する、または決して届かない場合、そして厳格なIdempotency-Keyがなければクライアントの再試行が誤って2件目の取引を作成してしまう可能性がある場合 — であるということです。"
        ),
        H("Checklist bàn giao trước khi lên production", "Handover checklist before going to production", "本番リリース前の引き継ぎチェックリスト"),
        UL(
          [
            "Toàn bộ ca P0 (idempotency, bảo toàn tổng tiền, trạng thái cuối duy nhất, cân bằng hoàn tiền) PASS 100% trên CI.",
            "Kịch bản k6 mô phỏng 50 request đồng thời cùng Idempotency-Key đã chạy 20 lần liên tiếp không phát hiện giao dịch trùng.",
            "Cơ chế webhook đã được test với ca gửi trùng lặp và ca đến TRỄ sau khi giao dịch đã chuyển EXPIRED.",
            "Đối soát đã được test riêng cho ca 'orphan' và ca 'missing', không gộp chung một kịch bản.",
            "Tài liệu ranh giới trách nhiệm AI Agent trong phân tích giao dịch treo đã được review bởi trưởng nhóm QA và đội vận hành thanh toán.",
          ],
          [
            "All P0 cases (idempotency, total amount conservation, single final state, refund balance) PASS 100% in CI.",
            "The k6 scenario simulating 50 concurrent requests with the same Idempotency-Key has run 20 consecutive times with no duplicate transaction detected.",
            "The webhook mechanism has been tested with a duplicate-send case and a case arriving LATE after the transaction already transitioned to EXPIRED.",
            "Reconciliation has been tested separately for the 'orphan' case and the 'missing' case, not combined into one scenario.",
            "The AI Agent responsibility-boundary document for stuck-transaction analysis has been reviewed by the QA lead and the payments operations team.",
          ],
          [
            "すべてのP0ケース(冪等性、総額保全、単一の最終状態、返金の帳簿均衡)がCIで100%合格していること。",
            "同じIdempotency-Keyで50件の同時リクエストをシミュレートするk6シナリオが20回連続で実行され、重複取引が検出されていないこと。",
            "ウェブフック機構が、重複送信ケースと、取引が既にEXPIREDに遷移した後に「遅れて届く」ケースでテストされていること。",
            "突合が「orphan」ケースと「missing」ケースについて個別にテストされており、1つのシナリオに統合されていないこと。",
            "滞留取引分析におけるAIエージェントの責任境界文書が、QAリードと決済運用チームによってレビューされていること。",
          ]
        ),
        TIP(
          "Trước khi ký duyệt, tự hỏi: 'Nếu napas 247 gửi webhook trùng đúng vào giờ cao điểm thanh toán buổi trưa, hệ thống của chúng ta có tự bảo vệ đúng đắn hay sẽ ghi nợ khách hàng 2 lần?' — câu trả lời chính là lý do domain thanh toán QR luôn cần test idempotency nghiêm ngặt hơn test giao diện.",
          "Before signing off, ask yourself: 'If napas 247 sends a duplicate webhook right during the lunchtime payment peak, does our system correctly protect itself, or will it double-charge the customer?' — the answer is exactly why the QR payment domain always needs stricter idempotency testing than UI testing.",
          "承認前に自問してください。「昼食時の決済ピーク時間帯にnapas 247が重複ウェブフックを送信した場合、私たちのシステムは正しく自己防御するのか、それとも顧客に二重請求してしまうのか？」— その答えこそが、QR決済ドメインが常にUIテストよりも厳格な冪等性テストを必要とする理由です。"
        ),
      ],
    },
  ];

  return {
    categorySlug: "enterprise-realworld",
    slug: "fintech-qr-payment-idempotency",
    cover: thumb,
    tags: tags("thucchien", "fintech", "api", "playwright", "mocking", "realworld"),
    title: {
      vi: "Thực chiến fintech: thanh toán QR VietQR/napas 247, retry & chống trùng bằng Idempotency-Key",
      en: "Fintech real-world: VietQR/napas 247 QR payment, retry handling & Idempotency-Key deduplication",
      ja: "フィンテック実戦: VietQR/napas 247 QR決済・リトライ処理・冪等性キーによる重複防止",
    },
    summary: {
      vi: "Bài toán thực chiến thanh toán QR: quét mã VietQR qua napas 247, cổng thanh toán, retry & timeout, chống trùng giao dịch bằng Idempotency-Key, hoàn tiền — kiểm thử theo bất biến không ghi nợ 2 lần, tổng tiền khớp, trạng thái cuối duy nhất, hoàn tiền cân bằng sổ.",
      en: "A real-world QR payment problem: scanning VietQR codes via napas 247, payment gateway, retry & timeout, anti-duplicate transactions via Idempotency-Key, refunds — tested against never-double-debit, matching total amount, single final state, and refund ledger-balance invariants.",
      ja: "QR決済の実戦課題: napas 247経由のVietQRスキャン、決済ゲートウェイ、リトライ・タイムアウト、冪等性キーによる重複決済防止、返金 — 二重決済なし、金額一致、単一の最終状態、返金の帳簿均衡という不変条件に基づくテスト。",
    },
    pages: buildDoc(pages),
  };
}
