// ============================================================================
// doc_pwlatest_08.mjs — 2 bài THỰC CHIẾN (thucchien) cho "Playwright & công cụ mới nhất".
//   A) Bảo hiểm: thẩm định & bồi thường theo bảng quyết định (claims)
//        slug: pw-insurance-claims-decision-table
//   B) SaaS: billing theo usage, multi-tenancy & RBAC
//        slug: pw-saas-multitenant-billing-rbac
// Trilingual VI/EN/JA (tiếng Nhật thật), block khớp ArticleViewer CyberSoft Tester.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl08a", domain: "insurance", kind: "thucchien", label: "CLAIMS · DECISION TABLE" });
const coverB = makeThumb({ id: "pwl08b", domain: "saas", kind: "thucchien", label: "MULTI-TENANT · RBAC" });

// SVG helper dùng chung.
const frame = (inner, w = 640, h = 300) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial" font-size="13">
<rect width="${w}" height="${h}" rx="12" fill="#0b1220"/>${inner}</svg>`;

// ===========================================================================
// ARTICLE A — Bảo hiểm: claims theo bảng quyết định
// ===========================================================================

const imgA1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">LUỒNG BỒI THƯỜNG / CLAIM PIPELINE</text>
<g font-size="12">
  <rect x="24" y="60" width="140" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8"/><text x="40" y="82" fill="#e0e7ff" font-weight="700">Tiếp nhận</text><text x="40" y="99" fill="#c7d2fe">FNOL / hồ sơ</text>
  <rect x="196" y="60" width="140" height="50" rx="8" fill="#3730a3" stroke="#a5b4fc"/><text x="212" y="82" fill="#e0e7ff" font-weight="700">Thẩm định</text><text x="212" y="99" fill="#c7d2fe">rule engine</text>
  <rect x="368" y="60" width="140" height="50" rx="8" fill="#134e4a" stroke="#34d399"/><text x="384" y="82" fill="#d1fae5" font-weight="700">Quyết định</text><text x="384" y="99" fill="#6ee7b7">approve/deny/manual</text>
  <rect x="540" y="60" width="76" height="50" rx="8" fill="#422006" stroke="#f59e0b"/><text x="556" y="82" fill="#fef3c7" font-weight="700">Chi trả</text><text x="556" y="99" fill="#fcd34d">payout</text>
  <path d="M164 85 h32 M336 85 h32 M508 85 h32" stroke="#64748b" stroke-width="2" marker-end="url(#arrA)"/>
</g>
<rect x="24" y="140" width="592" height="130" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="40" y="166" fill="#f8fafc" font-weight="700">Oracle = kết quả bảng quyết định, KHÔNG phải "thấy nút hiện ra"</text>
<text x="40" y="192" fill="#94a3b8" font-size="12">• Điều kiện: hạng hợp đồng · thời gian chờ · loại trừ · giới hạn chi trả</text>
<text x="40" y="214" fill="#94a3b8" font-size="12">• Hành động: APPROVE (payout=min(claim,limit)) · DENY (payout=0) · MANUAL</text>
<text x="40" y="236" fill="#94a3b8" font-size="12">• Bất biến: payout không vượt hạn mức · phí tính đúng hệ số actuarial</text>
<text x="40" y="258" fill="#94a3b8" font-size="12">• Data-driven: mỗi hàng CSV = 1 ca kiểm thử tham số hoá</text>
<defs><marker id="arrA" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>`),
  "Luồng bồi thường bốn bước và oracle dựa trên kết quả bảng quyết định.",
  "The four-step claim pipeline and the decision-table-outcome oracle.",
  "4段階の保険金請求パイプラインと、判定表の結果に基づくオラクルを示す図です。"
);

const imgA2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">BẢNG QUYẾT ĐỊNH / DECISION TABLE</text>
<g font-size="11">
  <rect x="24" y="52" width="592" height="26" fill="#12315e"/>
  <text x="34" y="70" fill="#e0f2fe" font-weight="700">Điều kiện</text>
  <text x="200" y="70" fill="#e0f2fe" font-weight="700">R1</text><text x="290" y="70" fill="#e0f2fe" font-weight="700">R2</text>
  <text x="380" y="70" fill="#e0f2fe" font-weight="700">R3</text><text x="470" y="70" fill="#e0f2fe" font-weight="700">R4</text><text x="560" y="70" fill="#e0f2fe" font-weight="700">R5</text>
  <g fill="#cbd5e1">
    <text x="34" y="98">Trong thời gian chờ?</text><text x="200" y="98">Có</text><text x="290" y="98">Không</text><text x="380" y="98">Không</text><text x="470" y="98">Không</text><text x="560" y="98">Không</text>
    <text x="34" y="122">Thuộc loại trừ?</text><text x="200" y="122">—</text><text x="290" y="122">Có</text><text x="380" y="122">Không</text><text x="470" y="122">Không</text><text x="560" y="122">Không</text>
    <text x="34" y="146">Số tiền &gt; hạn mức?</text><text x="200" y="146">—</text><text x="290" y="146">—</text><text x="380" y="146">Có</text><text x="470" y="146">Không</text><text x="560" y="146">Không</text>
    <text x="34" y="170">Cần điều tra gian lận?</text><text x="200" y="170">—</text><text x="290" y="170">—</text><text x="380" y="170">—</text><text x="470" y="170">Có</text><text x="560" y="170">Không</text>
  </g>
  <line x1="24" y1="182" x2="616" y2="182" stroke="#334155"/>
  <g font-weight="700">
    <text x="34" y="204" fill="#f8fafc">Kết quả</text>
    <text x="190" y="204" fill="#f87171">DENY</text><text x="278" y="204" fill="#f87171">DENY</text>
    <text x="368" y="204" fill="#fbbf24">CAP</text><text x="452" y="204" fill="#a78bfa">MANUAL</text><text x="548" y="204" fill="#34d399">APPROVE</text>
  </g>
</g>
<text x="24" y="250" fill="#94a3b8" font-size="12">Mỗi cột (rule) → một hàng dữ liệu test. Phủ hết cột = phủ hết nhánh nghiệp vụ.</text>
<text x="24" y="272" fill="#94a3b8" font-size="12">CAP nghĩa là APPROVE nhưng payout bị giới hạn = min(claim, limit).</text>`),
  "Bảng quyết định năm luật, ánh xạ trực tiếp sang các hàng dữ liệu kiểm thử.",
  "A five-rule decision table mapping directly to data-driven test rows.",
  "5つのルールを持つ判定表で、そのままデータ駆動テストの各行に対応します。"
);

const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh nghiệp vụ: quy mô, SLA và tuân thủ trong bồi thường bảo hiểm",
      en: "1. Business context: scale, SLA and compliance in insurance claims",
      ja: "1. 業務背景 — 保険金請求における規模・SLA・コンプライアンス",
    },
    blocks: [
      P(
        "Một công ty bảo hiểm phi nhân thọ xử lý trung bình mười hai nghìn hồ sơ bồi thường mỗi ngày trên các sản phẩm sức khoẻ, xe cơ giới và du lịch. Mỗi hồ sơ đi qua ba trạm: tiếp nhận (FNOL), thẩm định tự động bằng rule engine, và ra quyết định approve, deny hoặc chuyển thẩm định viên xử lý tay. Sai một quyết định không chỉ là lỗi phần mềm mà là rủi ro tài chính và pháp lý: chi trả nhầm một ca thuộc điều khoản loại trừ làm thất thoát tiền, còn từ chối nhầm một ca hợp lệ khiến khách hàng khiếu nại và cơ quan quản lý vào cuộc.",
        "A property-and-casualty insurer processes an average of twelve thousand claims a day across health, motor and travel products. Every claim moves through three stations: intake (FNOL), automated adjudication by a rule engine, and a decision of approve, deny or route to a human adjuster. A wrong decision is not merely a software bug but a financial and legal risk: wrongly paying a claim that falls under an exclusion leaks money, while wrongly denying a valid claim triggers customer complaints and regulatory scrutiny.",
        "ある損害保険会社は、医療・自動車・旅行の各商品にわたり1日平均1万2千件の保険金請求を処理します。各請求は受付（FNOL）、ルールエンジンによる自動査定、そして承認・却下・人手による査定への振り分けという3つの段階を通ります。誤った判定は単なるソフトウェアの不具合ではなく、財務上・法務上のリスクです。免責条項に該当する請求を誤って支払えば資金が流出し、正当な請求を誤って却下すれば顧客からの苦情と規制当局の監視を招きます。"
      ),
      P(
        "SLA nghiệp vụ đặt ra: chín mươi phần trăm hồ sơ đơn giản phải có quyết định trong hai giờ, và không hồ sơ nào bị chi trả vượt hạn mức hợp đồng dù chỉ một đồng. Về tuân thủ, mọi quyết định phải để lại vết kiểm toán (audit trail) đầy đủ, và cách tính phí bảo hiểm phải khớp với bảng hệ số actuarial đã được cơ quan quản lý phê duyệt. Đây là lý do vì sao đội QA không thể chỉ kiểm thử bằng cách bấm vài nút trên giao diện: phải kiểm thử chính logic bảng quyết định như một oracle độc lập.",
        "The business SLA states: ninety percent of simple claims must reach a decision within two hours, and no claim may ever be paid one cent above its contractual limit. For compliance, every decision must leave a complete audit trail, and premium computation must match the actuarial factor table approved by the regulator. This is why the QA team cannot test by merely clicking a few buttons on the UI: they must test the decision-table logic itself as an independent oracle.",
        "業務SLAは次のように定めます。単純な請求の90パーセントは2時間以内に判定を出すこと、そしていかなる請求も契約上限を1円たりとも超えて支払われないこと。コンプライアンス面では、すべての判定が完全な監査証跡を残し、保険料計算は規制当局が承認した保険数理係数表と一致しなければなりません。だからこそQAチームは、画面上でいくつかのボタンを押すだけでテストすることはできず、判定表のロジックそのものを独立したオラクルとして検証する必要があります。"
      ),
      imgA1,
      P(
        "Bài viết này đi theo hướng oracle-first: chúng ta không khẳng định 'màn hình hiện chữ Đã duyệt', mà khẳng định 'với đúng bộ điều kiện này, hệ thống phải ra đúng quyết định này và số tiền chi trả phải bằng đúng giá trị này'. Kỹ thuật chủ đạo là data-driven testing: mã hoá bảng quyết định thành một tệp CSV, mỗi hàng là một ca kiểm thử, rồi tham số hoá để Playwright sinh ra hàng loạt test từ cùng một khung. Nhờ vậy khi phòng nghiệp vụ đổi một luật, ta chỉ sửa dữ liệu chứ không viết lại code test.",
        "This article is oracle-first: we do not assert 'the screen shows Approved', we assert 'given exactly this set of conditions, the system must produce exactly this decision and the payout must equal exactly this value'. The core technique is data-driven testing: encode the decision table as a CSV file, one row per test case, then parametrize so Playwright generates a batch of tests from the same skeleton. When the business changes a rule, we edit data rather than rewrite test code.",
        "本記事はオラクルファーストの方針を採ります。「画面に『承認済み』と表示される」ではなく、「まさにこの条件の組み合わせに対し、システムはまさにこの判定を出し、支払額はまさにこの値と等しくなければならない」と検証します。中心となる手法はデータ駆動テストです。判定表をCSVファイルとして符号化し、1行を1テストケースとし、パラメータ化することでPlaywrightが同一の骨組みから多数のテストを生成します。業務部門がルールを変更しても、テストコードを書き直すのではなくデータを編集するだけで済みます。"
      ),
      NOTE(
        "Oracle-first nghĩa là bạn phải biết đáp án đúng TRƯỚC khi chạy, tính độc lập với hệ thống đang kiểm thử — thường lấy từ bảng quyết định do nghiệp vụ ký duyệt.",
        "Oracle-first means you must know the correct answer BEFORE running, independently of the system under test — usually taken from the business-signed decision table.",
        "オラクルファーストとは、実行前に正解を、被テストシステムとは独立して知っておくことを意味します。通常は業務部門が承認した判定表から得ます。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc hệ thống và ranh giới kiểm thử",
      en: "2. System architecture and testing boundaries",
      ja: "2. システムアーキテクチャとテスト境界",
    },
    blocks: [
      P(
        "Hệ thống gồm bốn thành phần chính. Cổng tiếp nhận nhận hồ sơ từ web, app và đối tác qua API. Dịch vụ hợp đồng cung cấp thông tin hạng gói, thời gian chờ và các điều khoản loại trừ. Rule engine là trái tim: nó nạp bảng quyết định phiên bản hoá và trả về quyết định cùng số tiền đề xuất. Dịch vụ chi trả thực hiện giao dịch kép (double-entry) để đảm bảo tiền không tự sinh hay biến mất. Đội QA phải xác định rõ mỗi lớp kiểm thử phủ phần nào để tránh vừa thiếu vừa trùng lặp.",
        "The system has four main components. The intake gateway receives claims from web, app and partners via API. The policy service supplies plan tier, waiting period and exclusion clauses. The rule engine is the heart: it loads a versioned decision table and returns a decision plus a proposed amount. The disbursement service performs double-entry transactions so money is neither created nor destroyed. The QA team must clearly define which layer each test tier covers to avoid both gaps and duplication.",
        "システムは4つの主要コンポーネントから成ります。受付ゲートウェイはWeb・アプリ・パートナーからAPI経由で請求を受け取ります。契約サービスはプラン等級・待機期間・免責条項を提供します。ルールエンジンが中核で、バージョン管理された判定表を読み込み、判定と提案金額を返します。支払サービスは複式簿記の取引を行い、資金が生成も消滅もしないようにします。QAチームは、各テスト階層がどの層を担うかを明確に定義し、抜けと重複の両方を避ける必要があります。"
      ),
      P(
        "Ở tầng đơn vị, ta kiểm thử rule engine như một hàm thuần: đầu vào là bối cảnh hồ sơ, đầu ra là quyết định và số tiền — không chạm giao diện, chạy cực nhanh, phủ hết mọi cột của bảng quyết định. Ở tầng API, ta kiểm thử toàn bộ chuỗi từ tiếp nhận đến quyết định, xác nhận audit trail và trạng thái lưu đúng. Ở tầng end-to-end với Playwright, ta chỉ chọn một số kịch bản đại diện quan trọng để chứng minh luồng người dùng thật hoạt động, tránh nhồi mọi tổ hợp vào E2E vì chậm và giòn.",
        "At the unit tier, we test the rule engine as a pure function: input is the claim context, output is the decision and amount — no UI, blazing fast, covering every column of the decision table. At the API tier, we test the whole chain from intake to decision, verifying the audit trail and stored state are correct. At the end-to-end tier with Playwright, we pick only a few important representative scenarios to prove the real user flow works, avoiding cramming every combination into E2E because that is slow and brittle.",
        "ユニット層ではルールエンジンを純粋関数としてテストします。入力は請求のコンテキスト、出力は判定と金額で、UIには触れず、極めて高速に、判定表のすべての列を網羅します。API層では受付から判定までの連鎖全体をテストし、監査証跡と保存状態が正しいことを検証します。Playwrightによるエンドツーエンド層では、実際のユーザーフローが動くことを証明するために重要な代表シナリオだけを選び、遅く壊れやすいためすべての組み合わせをE2Eに詰め込むことは避けます。"
      ),
      CODE("typescript", `// playwright.config.ts — cấu hình dự án bảo hiểm, tách tầng bằng project.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['junit', { outputFile: 'results/junit.xml' }]],
  use: {
    baseURL: process.env.CLAIMS_BASE_URL ?? 'https://staging.claims.internal',
    trace: 'retain-on-failure-and-retries',
    // v1.60: HAR là công dân hạng nhất trong tracing
    // tracing.startHar()/stopHar() bật ở fixture khi cần.
  },
  projects: [
    { name: 'api',  testMatch: /.*\\.api\\.spec\\.ts/ },
    { name: 'e2e',  testMatch: /.*\\.e2e\\.spec\\.ts/, use: { ...devices['Desktop Chrome'] } },
  ],
});`),
      imgA2,
      TIP(
        "Đặt bảng quyết định vào một tệp phiên bản hoá (ví dụ decision-table@v7.csv). Khi nghiệp vụ đổi luật, tăng phiên bản; test tham chiếu đúng phiên bản để không lẫn kết quả cũ mới.",
        "Put the decision table in a versioned file (e.g. decision-table@v7.csv). When the business changes a rule, bump the version; tests reference the exact version so old and new outcomes are never confused.",
        "判定表はバージョン管理されたファイル（例: decision-table@v7.csv）に置きます。業務がルールを変更したらバージョンを上げ、テストは正確なバージョンを参照することで、新旧の結果が混同されないようにします。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Mô hình dữ liệu và các bất biến làm oracle",
      en: "3. Data model and the invariants that serve as the oracle",
      ja: "3. データモデルと、オラクルとなる不変条件",
    },
    blocks: [
      P(
        "Mô hình dữ liệu tối giản gồm bốn thực thể. Hợp đồng có hạng gói, ngày hiệu lực, thời gian chờ theo từng quyền lợi và danh sách điều khoản loại trừ. Hồ sơ bồi thường có loại rủi ro, ngày xảy ra, số tiền yêu cầu và liên kết tới hợp đồng. Quyết định lưu kết quả (approve, deny, manual), số tiền chi trả và lý do. Sổ cái ghi các bút toán chi trả theo nguyên tắc kép. Chính từ mô hình này ta rút ra các bất biến — những mệnh đề luôn đúng bất kể đầu vào — và biến chúng thành oracle của kiểm thử.",
        "The minimal data model has four entities. A policy has a plan tier, effective date, per-benefit waiting periods and a list of exclusion clauses. A claim has a peril type, incident date, requested amount and a link to the policy. A decision stores the outcome (approve, deny, manual), the payout amount and the reason. The ledger records disbursement entries under double-entry rules. From this model we derive the invariants — propositions that always hold regardless of input — and turn them into the test oracle.",
        "最小限のデータモデルは4つのエンティティから成ります。契約はプラン等級・発効日・給付ごとの待機期間・免責条項の一覧を持ちます。請求は事故種別・発生日・請求金額・契約への参照を持ちます。判定は結果（承認・却下・人手）・支払額・理由を保持します。元帳は複式簿記の規則に従い支払仕訳を記録します。このモデルから不変条件、すなわち入力に関わらず常に成り立つ命題を導き、それらをテストのオラクルに変えます。"
      ),
      UL(
        [
          "Bất biến 1 — Giới hạn chi trả: payout luôn nhỏ hơn hoặc bằng hạn mức còn lại của quyền lợi; không bao giờ âm.",
          "Bất biến 2 — Thời gian chờ: hồ sơ có ngày xảy ra trước khi hết thời gian chờ luôn bị deny với lý do WAITING_PERIOD.",
          "Bất biến 3 — Loại trừ: rủi ro thuộc điều khoản loại trừ luôn deny với lý do EXCLUSION, không phụ thuộc số tiền.",
          "Bất biến 4 — Bảo toàn tiền: tổng nợ bằng tổng có trong sổ cái sau mỗi chi trả (double-entry cân bằng).",
          "Bất biến 5 — Phí bảo hiểm: phí tính ra phải bằng tích các hệ số actuarial theo bảng đã duyệt, sai số làm tròn ≤ 1 xu.",
        ],
        [
          "Invariant 1 — Payout limit: payout is always less than or equal to the benefit's remaining limit; never negative.",
          "Invariant 2 — Waiting period: a claim whose incident date is before the waiting period ends is always denied with reason WAITING_PERIOD.",
          "Invariant 3 — Exclusion: a peril under an exclusion clause is always denied with reason EXCLUSION, regardless of amount.",
          "Invariant 4 — Money conservation: total debits equal total credits in the ledger after each disbursement (double-entry balances).",
          "Invariant 5 — Premium: the computed premium equals the product of actuarial factors per the approved table, rounding error ≤ 1 cent.",
        ],
        [
          "不変条件1 — 支払上限: 支払額は常に給付の残存上限以下であり、負になることはありません。",
          "不変条件2 — 待機期間: 発生日が待機期間終了前の請求は、常に理由WAITING_PERIODで却下されます。",
          "不変条件3 — 免責: 免責条項に該当する事故種別は、金額に関わらず常に理由EXCLUSIONで却下されます。",
          "不変条件4 — 資金保存: 各支払後、元帳の借方合計は貸方合計と等しくなります（複式簿記が均衡します）。",
          "不変条件5 — 保険料: 算出保険料は承認済み表に基づく保険数理係数の積と等しく、丸め誤差は1セント以下です。",
        ]
      ),
      P(
        "Điểm mấu chốt là các bất biến này độc lập với cách cài đặt. Dù rule engine được viết bằng ngôn ngữ nào, tối ưu ra sao, thì năm mệnh đề trên phải luôn đúng. Vì thế chúng là oracle vàng: nếu một thay đổi code làm gãy bất biến, đó chắc chắn là hồi quy nghiêm trọng. Ngược lại, một test chỉ kiểm 'trang trả về HTTP 200' hay 'có chữ thành công' không nói gì về việc tiền có được tính đúng hay không, và đó là loại test tạo cảm giác an toàn giả.",
        "The key point is that these invariants are implementation-independent. Whatever language the rule engine is written in, however it is optimized, the five propositions above must always hold. That makes them the golden oracle: if a code change breaks an invariant, that is certainly a serious regression. Conversely, a test that only checks 'the page returns HTTP 200' or 'the word success appears' says nothing about whether the money was computed correctly, and that is the kind of test that creates a false sense of safety.",
        "重要なのは、これらの不変条件が実装に依存しない点です。ルールエンジンがどの言語で書かれ、どのように最適化されようと、上記の5つの命題は常に成り立たなければなりません。だからこそそれらは黄金のオラクルです。コード変更が不変条件を壊すなら、それは確実に重大な回帰です。逆に「ページがHTTP 200を返す」や「成功という語が現れる」だけを確認するテストは、金額が正しく計算されたかについて何も語らず、偽りの安心感を生む類のテストです。"
      ),
      WARN(
        "Đừng biến số tiền chi trả thành hằng số cứng trong assertion. Tính lại nó từ cùng công thức nghiệp vụ (nguồn oracle) rồi so sánh; nếu không, khi bảng hệ số đổi, test vẫn xanh trong khi sản phẩm đã sai.",
        "Do not hardcode the payout amount in the assertion. Recompute it from the same business formula (the oracle source) and compare; otherwise, when the factor table changes, the test stays green while the product is already wrong.",
        "支払額をアサーションにハードコードしないでください。同じ業務式（オラクルの源）から再計算して比較します。さもないと係数表が変わったとき、製品はすでに誤っているのにテストは緑のままになります。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Bảng quyết định: đọc, phủ luật và ánh xạ sang ca kiểm thử",
      en: "4. The decision table: reading it, covering rules and mapping to test cases",
      ja: "4. 判定表 — 読み方・ルール網羅・テストケースへの対応付け",
    },
    blocks: [
      P(
        "Bảng quyết định là công cụ phân tích cổ điển nhưng vô cùng mạnh cho nghiệp vụ nhiều điều kiện. Mỗi cột là một luật (rule) — một tổ hợp giá trị điều kiện dẫn tới một hành động. Nguyên tắc phủ là: tối thiểu phải có một ca kiểm thử cho mỗi cột khả thi. Với bốn điều kiện nhị phân, về lý thuyết có mười sáu tổ hợp, nhưng nhiều tổ hợp bị chặn bởi luật ưu tiên — ví dụ đã trong thời gian chờ thì các điều kiện sau không cần xét. Rút gọn hợp lý giúp ta chỉ giữ những cột thực sự khác nhau về hành vi.",
        "The decision table is a classic yet extremely powerful analysis tool for condition-heavy business logic. Each column is a rule — a combination of condition values leading to an action. The coverage principle is: at minimum, one test case per feasible column. With four binary conditions there are theoretically sixteen combinations, but many are blocked by precedence — for instance, once inside the waiting period the later conditions need not be evaluated. Sensible reduction keeps only the columns that genuinely differ in behavior.",
        "判定表は、条件の多い業務ロジックに対する古典的でありながら極めて強力な分析ツールです。各列はルール、すなわち1つの動作に至る条件値の組み合わせです。網羅の原則は、実現可能な各列に最低1つのテストケースを持つことです。4つの二値条件では理論上16通りの組み合わせがありますが、多くは優先順位によって除外されます。例えば待機期間内であれば後続の条件を評価する必要はありません。合理的に削減することで、動作が真に異なる列だけを残します。"
      ),
      CODE("csv", `# fixtures/claims-decision-table.csv — mỗi hàng = 1 ca; giá trị expected là ORACLE.
case_id,plan_tier,peril,incident_offset_days,waiting_days,claim_amount,limit,is_excluded,fraud_flag,expected_decision,expected_payout,expected_reason
C1,GOLD,hospital,3,30,5000,20000,false,false,DENY,0,WAITING_PERIOD
C2,GOLD,cosmetic,90,30,5000,20000,true,false,DENY,0,EXCLUSION
C3,SILVER,motor,120,0,30000,20000,false,false,APPROVE,20000,CAPPED_AT_LIMIT
C4,GOLD,hospital,200,30,8000,20000,false,true,MANUAL,0,FRAUD_REVIEW
C5,GOLD,hospital,200,30,8000,20000,false,false,APPROVE,8000,WITHIN_LIMIT
C6,SILVER,travel,45,30,1500,5000,false,false,APPROVE,1500,WITHIN_LIMIT
C7,BRONZE,dental,10,60,900,3000,false,false,DENY,0,WAITING_PERIOD`),
      P(
        "Bảy hàng trên phủ đủ năm luật của bảng quyết định cộng vài biến thể theo hạng gói. Cột expected_decision, expected_payout và expected_reason chính là oracle: chúng được phòng nghiệp vụ ký duyệt, hoàn toàn độc lập với code hiện tại. Chú ý hàng C3 minh hoạ luật CAP: số tiền yêu cầu ba mươi nghìn nhưng hạn mức chỉ hai mươi nghìn, nên payout đúng phải là hai mươi nghìn — đây là loại lỗi hay bị bỏ sót nếu chỉ test happy path với số tiền nhỏ hơn hạn mức.",
        "The seven rows above cover all five rules of the decision table plus a few tier variants. The expected_decision, expected_payout and expected_reason columns are the oracle: they are business-signed and entirely independent of current code. Note that row C3 illustrates the CAP rule: the requested amount is thirty thousand but the limit is only twenty thousand, so the correct payout is twenty thousand — this is the kind of bug easily missed if you only test the happy path with amounts below the limit.",
        "上記の7行は判定表の5つのルールすべてに加え、いくつかの等級バリエーションを網羅します。expected_decision・expected_payout・expected_reasonの各列がオラクルであり、業務部門が承認したもので、現行コードから完全に独立しています。行C3はCAPルールを示します。請求額は3万ですが上限は2万にすぎないため、正しい支払額は2万です。これは上限未満の金額でハッピーパスだけをテストしていると見逃しやすい種類の不具合です。"
      ),
      SCEN(
        "Phỏng vấn: rút gọn bảng quyết định",
        "Interview: reducing the decision table",
        "Người phỏng vấn hỏi: bốn điều kiện nhị phân cho mười sáu tổ hợp, sao bạn chỉ viết bảy ca? Bạn trả lời: nhờ luật ưu tiên. Khi 'trong thời gian chờ' đúng, quyết định là DENY bất kể ba điều kiện còn lại, nên mọi tổ hợp có điều kiện này gộp thành một luật. Tương tự với loại trừ. Việc rút gọn phải dựa trên ngữ nghĩa nghiệp vụ, không phải cắt bừa; và ta luôn giữ ít nhất một ca cho mỗi giá trị 'don't care' quan trọng để phòng khi giả định ưu tiên sai.",
        "The interviewer asks: four binary conditions give sixteen combinations, why did you write only seven cases? You answer: thanks to precedence. When 'inside waiting period' is true, the decision is DENY regardless of the other three conditions, so all combinations with this condition collapse into one rule. Same for exclusion. The reduction must rest on business semantics, not arbitrary cutting; and we keep at least one case per important 'don't care' value in case the precedence assumption is wrong.",
        "面接官の質問: 4つの二値条件で16通りなのに、なぜ7ケースしか書かないのか。回答: 優先順位のおかげです。「待機期間内」が真なら、他の3条件に関わらず判定はDENYなので、この条件を含むすべての組み合わせは1つのルールに集約されます。免責も同様です。削減は恣意的な切り捨てではなく業務上の意味に基づくべきであり、優先順位の仮定が誤っている場合に備えて重要な「ドントケア」値ごとに少なくとも1ケースは残します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Kế hoạch kiểm thử và ma trận ca theo tầng",
      en: "5. Test plan and the per-tier case matrix",
      ja: "5. テスト計画と、階層別のケースマトリクス",
    },
    blocks: [
      P(
        "Kế hoạch kiểm thử chia rõ trách nhiệm theo tầng để không lãng phí. Tầng đơn vị chịu trách nhiệm phủ toàn bộ bảng quyết định và các phép tính phí — nhanh, rẻ, chạy trên mọi commit. Tầng API kiểm chuỗi tiếp nhận đến quyết định, kiểm audit trail và tính bảo toàn tiền của sổ cái. Tầng E2E chỉ lấy ba đến năm kịch bản đại diện: một ca duyệt trơn, một ca bị từ chối do loại trừ, một ca chuyển thẩm định tay. Nguyên tắc là ma trận rủi ro: điều gì gây thiệt hại lớn nhất thì phủ dày nhất.",
        "The test plan divides responsibility clearly by tier to avoid waste. The unit tier is responsible for covering the entire decision table and the premium computations — fast, cheap, run on every commit. The API tier checks the intake-to-decision chain, the audit trail and the ledger's money conservation. The E2E tier takes only three to five representative scenarios: a smooth approval, a denial due to exclusion, a routing to manual review. The principle is a risk matrix: whatever causes the greatest harm gets the densest coverage.",
        "テスト計画は無駄を避けるため、責任を階層ごとに明確に分けます。ユニット層は判定表全体と保険料計算の網羅を担い、高速・低コストで毎コミット実行します。API層は受付から判定までの連鎖、監査証跡、元帳の資金保存を確認します。E2E層は代表シナリオを3〜5件だけ取り上げます。円滑な承認、免責による却下、人手査定への振り分けです。原則はリスクマトリクスであり、最も大きな損害を招くものに最も厚い網羅を割り当てます。"
      ),
      IMG(
        frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">KIM TỰ THÁP KIỂM THỬ / TEST PYRAMID</text>
<polygon points="320,56 470,120 170,120" fill="#134e4a" stroke="#34d399"/>
<text x="320" y="102" fill="#d1fae5" text-anchor="middle" font-weight="700">E2E (Playwright)</text>
<text x="320" y="115" fill="#6ee7b7" text-anchor="middle" font-size="11">3–5 kịch bản</text>
<polygon points="170,120 470,120 540,196 100,196" fill="#3730a3" stroke="#a5b4fc"/>
<text x="320" y="166" fill="#e0e7ff" text-anchor="middle" font-weight="700">API (chuỗi + audit + ledger)</text>
<text x="320" y="182" fill="#c7d2fe" text-anchor="middle" font-size="11">~30 ca</text>
<polygon points="100,196 540,196 600,272 40,272" fill="#12315e" stroke="#38bdf8"/>
<text x="320" y="240" fill="#e0f2fe" text-anchor="middle" font-weight="700">Unit — bảng quyết định + phí</text>
<text x="320" y="256" fill="#93c5fd" text-anchor="middle" font-size="11">toàn bộ cột + biên số học</text>`),
        "Kim tự tháp kiểm thử: dày ở đơn vị, mỏng và chọn lọc ở E2E.",
        "Test pyramid: dense at the unit tier, thin and selective at E2E.",
        "テストピラミッド: ユニット層で厚く、E2Eで薄く選択的にします。"
      ),
      CODE("markdown", `# Test plan (trích) — Claims decision engine v7

## Phạm vi
- IN:  logic bảng quyết định, tính payout, tính phí, audit trail, ledger.
- OUT: gateway thanh toán bên thứ ba (mock ở API tier).

## Ma trận ca theo tầng
| ID   | Tầng | Điều kiện chính            | Oracle                          |
|------|------|---------------------------|---------------------------------|
| C1   | unit | trong thời gian chờ       | DENY / payout=0 / WAITING       |
| C2   | unit | thuộc loại trừ            | DENY / payout=0 / EXCLUSION     |
| C3   | unit | claim > limit             | APPROVE / payout=limit          |
| C4   | unit | cờ gian lận               | MANUAL / payout=0               |
| C5   | unit | happy path trong hạn mức  | APPROVE / payout=claim          |
| A1   | api  | C5 + audit trail          | trạng thái + log đầy đủ         |
| A2   | api  | C3 + ledger cân bằng      | debit=credit                    |
| E1   | e2e  | duyệt trơn trên UI        | số tiền hiển thị = oracle       |
| E2   | e2e  | từ chối loại trừ trên UI  | lý do hiển thị = EXCLUSION      |

## Tiêu chí ra (exit)
- 100% cột bảng quyết định có test đơn vị xanh.
- 0 vi phạm bất biến tiền/hạn mức trên toàn bộ ma trận.`),
      P(
        "Ma trận này là hợp đồng giữa QA và nghiệp vụ. Mỗi khi phòng nghiệp vụ thêm một luật mới vào bảng quyết định, họ phải cung cấp hàng dữ liệu tương ứng với đáp án oracle; QA chỉ việc thêm hàng vào CSV và test tự động sinh ra. Cách làm này giữ chi phí bảo trì thấp: độ phức tạp nghiệp vụ tăng tuyến tính theo số hàng dữ liệu chứ không theo số dòng code test. Đó là sức mạnh thật sự của data-driven testing trong domain nhiều luật như bảo hiểm.",
        "This matrix is the contract between QA and the business. Whenever the business adds a new rule to the decision table, they must supply the corresponding data row with the oracle answer; QA simply adds a row to the CSV and the test is generated automatically. This keeps maintenance cost low: business complexity grows linearly with the number of data rows, not with the number of test code lines. That is the real power of data-driven testing in a rule-heavy domain like insurance.",
        "このマトリクスはQAと業務部門の間の契約です。業務部門が判定表に新しいルールを追加するたびに、オラクルの答えを含む対応するデータ行を提供しなければなりません。QAはCSVに行を追加するだけで、テストは自動的に生成されます。これにより保守コストは低く抑えられます。業務の複雑さはテストコードの行数ではなくデータ行数に比例して増えます。それが保険のようなルールの多いドメインにおけるデータ駆動テストの真の力です。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Kỹ thuật data-driven: từ CSV tới test tham số hoá",
      en: "6. Data-driven technique: from CSV to parametrized tests",
      ja: "6. データ駆動手法 — CSVからパラメータ化テストへ",
    },
    blocks: [
      P(
        "Trái tim kỹ thuật là vòng lặp sinh test. Ta đọc CSV thành mảng đối tượng, rồi với mỗi hàng gọi test với một tiêu đề nhận diện được kèm case_id. Playwright cho phép tạo test động trong vòng lặp ở thời điểm thu thập (collection time), nên mỗi hàng trở thành một test riêng biệt hiện rõ trong báo cáo, có thể chạy lại độc lập khi đỏ. Điểm tinh tế là mỗi test phải tự cô lập dữ liệu: tạo hợp đồng và hồ sơ riêng qua API seed, tránh dùng chung state để chạy song song vẫn tất định.",
        "The heart of the technique is the test-generation loop. We read the CSV into an array of objects, then for each row call test with an identifiable title including case_id. Playwright allows creating dynamic tests inside a loop at collection time, so each row becomes a distinct test that shows clearly in the report and can be rerun independently when red. The subtlety is that each test must isolate its own data: create a dedicated policy and claim via an API seed, avoiding shared state so parallel runs stay deterministic.",
        "手法の核心はテスト生成ループです。CSVをオブジェクトの配列として読み込み、各行についてcase_idを含む識別可能なタイトルでtestを呼び出します。Playwrightは収集時にループ内で動的にテストを生成できるため、各行はレポートに明確に表示され、赤になったとき独立して再実行できる別個のテストになります。微妙な点は、各テストが自身のデータを分離しなければならないことです。API seedで専用の契約と請求を作成し、共有状態を避けることで並列実行でも決定的なままにします。"
      ),
      CODE("typescript", `// tests/adjudicate.api.spec.ts — sinh test từ CSV, oracle = cột expected.
import { test, expect, request } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';

type Row = {
  case_id: string; plan_tier: string; peril: string;
  incident_offset_days: string; waiting_days: string;
  claim_amount: string; limit: string; is_excluded: string; fraud_flag: string;
  expected_decision: string; expected_payout: string; expected_reason: string;
};

const rows: Row[] = parse(readFileSync('fixtures/claims-decision-table.csv'), {
  columns: true, skip_empty_lines: true, comment: '#',
});

for (const r of rows) {
  test(\`adjudicate \${r.case_id} → \${r.expected_decision}\`, async ({ playwright }) => {
    const api = await playwright.request.newContext({ baseURL: process.env.CLAIMS_BASE_URL });

    // 1) SEED dữ liệu cô lập cho riêng ca này (idempotent theo case_id).
    const seed = await api.post('/test/seed/claim', { data: {
      idempotencyKey: \`seed-\${r.case_id}\`,
      planTier: r.plan_tier, peril: r.peril,
      waitingDays: Number(r.waiting_days),
      incidentOffsetDays: Number(r.incident_offset_days),
      claimAmount: Number(r.claim_amount),
      limit: Number(r.limit),
      excluded: r.is_excluded === 'true',
      fraudFlag: r.fraud_flag === 'true',
    }});
    expect(seed.ok()).toBeTruthy();
    const { claimId } = await seed.json();

    // 2) Gọi thẩm định.
    const res = await api.post(\`/claims/\${claimId}/adjudicate\`);
    expect(res.status(), 'adjudicate must succeed').toBe(200);
    const body = await res.json();

    // 3) ORACLE: khẳng định BẤT BIẾN, không khẳng định "hiện chữ".
    expect(body.decision, 'decision outcome').toBe(r.expected_decision);
    expect(body.payout, 'payout amount').toBe(Number(r.expected_payout));
    expect(body.reason, 'reason code').toBe(r.expected_reason);
    // Bất biến tiền: payout không bao giờ vượt hạn mức, không bao giờ âm.
    expect(body.payout).toBeLessThanOrEqual(Number(r.limit));
    expect(body.payout).toBeGreaterThanOrEqual(0);
    await api.dispose();
  });
}`),
      TIP(
        "Dùng idempotencyKey theo case_id khi seed. Nếu CI chạy lại (retry) hoặc chạy song song, seed lặp không tạo bản ghi thừa mà trả về đúng bản ghi cũ — giữ test tất định.",
        "Use an idempotencyKey derived from case_id when seeding. If CI reruns (retry) or runs in parallel, a repeated seed creates no extra record but returns the same one — keeping the test deterministic.",
        "seed時にはcase_idから導いたidempotencyKeyを使います。CIが再実行（リトライ）や並列実行をしても、重複するseedは余分なレコードを作らず同じものを返し、テストを決定的に保ちます。"
      ),
      P(
        "Một lỗi phổ biến là nhét mọi khẳng định vào một test lớn duyệt cả CSV. Khi một hàng sai, cả test đỏ và bạn khó biết hàng nào hỏng. Sinh test theo hàng giải quyết điều đó: báo cáo chỉ đúng case_id đỏ, trace và HAR gắn riêng cho ca đó, và bạn có thể chạy lại đúng một ca bằng bộ lọc tiêu đề. Đây là ví dụ cho thấy cách tổ chức test cũng là một quyết định thiết kế chất lượng, không kém phần quan trọng so với bản thân assertion.",
        "A common mistake is stuffing every assertion into one big test that loops over the whole CSV. When one row is wrong, the whole test goes red and you struggle to tell which row broke. Per-row test generation solves this: the report points to the exact red case_id, the trace and HAR attach to that case alone, and you can rerun exactly one case via a title filter. This shows that how you organize tests is itself a quality design decision, no less important than the assertions themselves.",
        "よくある誤りは、CSV全体をループする1つの大きなテストにすべてのアサーションを詰め込むことです。ある行が誤ると、テスト全体が赤になり、どの行が壊れたのか判別しづらくなります。行ごとのテスト生成はこれを解決します。レポートは赤になった正確なcase_idを指し示し、トレースとHARはそのケースだけに添付され、タイトルフィルタで正確に1ケースだけ再実行できます。テストの構成の仕方それ自体が、アサーションそのものに劣らず重要な品質設計上の決定であることを示しています。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Kiểm thử tính phí và hệ số actuarial",
      en: "7. Testing premium computation and actuarial factors",
      ja: "7. 保険料計算と保険数理係数のテスト",
    },
    blocks: [
      P(
        "Phí bảo hiểm thường là tích của một phí gốc với nhiều hệ số: tuổi, vùng, lịch sử bồi thường, hạng gói. Sai một hệ số hoặc sai thứ tự làm tròn có thể lệch hàng tỷ đồng khi nhân với hàng triệu hợp đồng. Vì vậy oracle ở đây phải tính lại phí từ chính bảng hệ số đã duyệt, độc lập với code sản phẩm, rồi so khớp đến từng xu. Đặc biệt cần kiểm các biên: tuổi ngay ở ranh giới bậc, vùng có hệ số cao nhất, khách hàng có lịch sử bồi thường xấu.",
        "An insurance premium is usually the product of a base rate and several factors: age, region, claims history, plan tier. A wrong factor or a wrong rounding order can be off by billions when multiplied across millions of policies. So the oracle here must recompute the premium from the very approved factor table, independently of product code, and match to the cent. It is especially important to test the boundaries: age right at a band edge, the region with the highest factor, a customer with a bad claims history.",
        "保険料は通常、基本料率と複数の係数の積です。年齢・地域・請求履歴・プラン等級などです。係数を1つ誤ったり丸めの順序を誤ったりすると、数百万件の契約に掛け合わせたときに数十億円ずれる可能性があります。そのためここでのオラクルは、承認済みの係数表そのものから、製品コードとは独立に保険料を再計算し、1円単位で一致させなければなりません。特に境界値のテストが重要です。等級の境目ちょうどの年齢、係数が最も高い地域、請求履歴の悪い顧客などです。"
      ),
      CODE("typescript", `// tests/premium.api.spec.ts — oracle tính lại độc lập, so đến từng xu.
import { test, expect } from '@playwright/test';

// Bảng hệ số ĐÃ DUYỆT — nguồn oracle, tách khỏi code sản phẩm.
const BASE = 1_000_000;                              // VND
const AGE_BAND = (a: number) => a < 30 ? 0.9 : a < 50 ? 1.0 : 1.4;
const REGION = { urban: 1.2, rural: 1.0 } as const;
const HISTORY = (claims: number) => 1 + Math.min(claims, 5) * 0.1;

function oraclePremium(age: number, region: keyof typeof REGION, claims: number) {
  const raw = BASE * AGE_BAND(age) * REGION[region] * HISTORY(claims);
  return Math.round(raw); // làm tròn về xu (VND: đồng) đúng quy ước nghiệp vụ.
}

const samples = [
  { age: 29, region: 'urban', claims: 0 }, // biên dưới của bậc tuổi
  { age: 30, region: 'rural', claims: 3 }, // ngay ranh giới bậc
  { age: 55, region: 'urban', claims: 9 }, // history bị chặn ở 5
] as const;

for (const s of samples) {
  test(\`premium age=\${s.age} \${s.region} claims=\${s.claims}\`, async ({ request }) => {
    const res = await request.post('/quotes/premium', { data: s });
    expect(res.ok()).toBeTruthy();
    const { premium } = await res.json();
    const expected = oraclePremium(s.age, s.region, s.claims);
    expect(premium, 'premium phải khớp bảng hệ số đã duyệt').toBe(expected);
  });
}`),
      QA(
        "Vì sao không hardcode giá trị phí kỳ vọng mà lại tính lại bằng hàm oracle?",
        "Why not hardcode the expected premium value instead of recomputing with an oracle function?",
        "Hardcode dễ khiến test và code cùng sai theo một hướng, hoặc trở nên lỗi thời khi bảng hệ số cập nhật. Hàm oracle mã hoá trực tiếp bảng đã duyệt của nghiệp vụ; khi bảng đổi, ta cập nhật oracle một chỗ và mọi ca kiểm thử tự động đúng theo. Quan trọng hơn, oracle độc lập với thuật toán sản phẩm nên nếu sản phẩm tối ưu lại phép nhân mà ra sai số làm tròn, test sẽ bắt được ngay.",
        "Hardcoding risks test and code being wrong in the same direction, or going stale when the factor table updates. The oracle function directly encodes the business's approved table; when the table changes, we update the oracle in one place and every case is automatically correct. More importantly, the oracle is independent of the product algorithm, so if the product re-optimizes the multiplication and produces a rounding error, the test catches it immediately.",
        "ハードコードは、テストとコードが同じ方向に誤るリスクや、係数表の更新時に陳腐化するリスクがあります。オラクル関数は業務の承認済み表を直接符号化します。表が変わればオラクルを一箇所更新するだけで、すべてのケースが自動的に正しくなります。さらに重要なのは、オラクルが製品アルゴリズムから独立しているため、製品が乗算を最適化して丸め誤差を生じた場合、テストが即座に検出することです。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Happy path end-to-end trên giao diện thẩm định viên",
      en: "8. End-to-end happy path on the adjuster UI",
      ja: "8. 査定担当者UI上のエンドツーエンド・ハッピーパス",
    },
    blocks: [
      P(
        "Ở tầng E2E, ta không lặp lại toàn bộ bảng quyết định — điều đó thuộc tầng đơn vị. Thay vào đó ta chứng minh rằng khi thẩm định viên đăng nhập, mở một hồ sơ và bấm duyệt, số tiền hiển thị đúng bằng giá trị oracle, và trạng thái được lưu bền vững. Dùng auto-waiting của Playwright để tránh sleep cứng: expect(locator).toHaveText chờ đúng điều kiện. Dữ liệu vẫn được seed qua API trước khi mở UI, để E2E tập trung kiểm luồng người dùng chứ không kiểm lại logic tính toán.",
        "At the E2E tier we do not repeat the whole decision table — that belongs to the unit tier. Instead we prove that when the adjuster logs in, opens a claim and clicks approve, the displayed amount equals the oracle value exactly, and the state is persisted durably. Use Playwright's auto-waiting to avoid hard sleeps: expect(locator).toHaveText waits for the right condition. Data is still seeded via API before opening the UI, so E2E focuses on the user flow rather than re-testing the computation logic.",
        "E2E層では判定表全体を繰り返しません。それはユニット層の役割です。代わりに、査定担当者がログインし、請求を開いて承認をクリックしたとき、表示金額がオラクル値と正確に等しく、状態が永続的に保存されることを証明します。ハードなsleepを避けるためPlaywrightの自動待機を使います。expect(locator).toHaveTextが正しい条件を待ちます。データはUIを開く前にAPI経由でseedされるため、E2Eは計算ロジックの再テストではなくユーザーフローに集中します。"
      ),
      CODE("typescript", `// tests/adjuster-approve.e2e.spec.ts — luồng người dùng thật, oracle = số tiền.
import { test, expect } from '@playwright/test';

test('thẩm định viên duyệt hồ sơ trong hạn mức', async ({ page, request }) => {
  // Seed một hồ sơ C5 (happy path) qua API — nhanh và cô lập.
  const seed = await request.post('/test/seed/claim', { data: {
    idempotencyKey: 'e2e-approve-1', planTier: 'GOLD', peril: 'hospital',
    waitingDays: 30, incidentOffsetDays: 200, claimAmount: 8000, limit: 20000,
    excluded: false, fraudFlag: false,
  }});
  const { claimId } = await seed.json();

  await page.goto(\`/adjuster/claims/\${claimId}\`);
  await expect(page.getByRole('heading', { name: /Hồ sơ #/ })).toBeVisible();

  await page.getByRole('button', { name: 'Duyệt' }).click();

  // ORACLE: số tiền hiển thị đúng bằng claimAmount (8000), trạng thái APPROVED.
  await expect(page.getByTestId('payout-amount')).toHaveText('8,000');
  await expect(page.getByTestId('claim-status')).toHaveText('APPROVED');

  // Bền vững: tải lại trang, trạng thái không mất.
  await page.reload();
  await expect(page.getByTestId('claim-status')).toHaveText('APPROVED');
});`),
      IMG(
        frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">MÀN HÌNH THẨM ĐỊNH / ADJUSTER SCREEN</text>
<rect x="24" y="52" width="592" height="210" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="44" y="82" fill="#e2e8f0" font-weight="700" font-size="14">Hồ sơ #CLM-8842 · GOLD · hospital</text>
<line x1="44" y1="96" x2="596" y2="96" stroke="#334155"/>
<text x="44" y="124" fill="#94a3b8">Số tiền yêu cầu</text><text x="300" y="124" fill="#e2e8f0" font-weight="700">8,000</text>
<text x="44" y="150" fill="#94a3b8">Hạn mức còn lại</text><text x="300" y="150" fill="#e2e8f0" font-weight="700">20,000</text>
<text x="44" y="176" fill="#94a3b8">Thời gian chờ</text><text x="300" y="176" fill="#34d399" font-weight="700">đã qua ✓</text>
<rect x="44" y="196" width="150" height="40" rx="8" fill="#134e4a" stroke="#34d399"/><text x="119" y="221" fill="#d1fae5" text-anchor="middle" font-weight="700">Duyệt</text>
<rect x="210" y="196" width="150" height="40" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="285" y="221" fill="#ffedd5" text-anchor="middle" font-weight="700">Từ chối</text>
<text x="400" y="222" fill="#a78bfa" font-weight="700">data-testid = payout-amount</text>`),
        "Màn hình thẩm định viên với các testid ổn định làm điểm neo cho E2E.",
        "The adjuster screen with stable testids as anchors for the E2E test.",
        "E2Eの拠り所となる安定したtestidを備えた査定担当者画面です。"
      ),
      NOTE(
        "Ưu tiên getByRole và getByTestId hơn selector CSS mong manh. Testid là hợp đồng rõ ràng giữa dev và QA, không đổi theo tinh chỉnh giao diện.",
        "Prefer getByRole and getByTestId over brittle CSS selectors. A testid is an explicit contract between dev and QA that does not change with UI tweaks.",
        "壊れやすいCSSセレクタよりgetByRoleやgetByTestIdを優先します。testidは開発者とQAの間の明示的な契約であり、UIの微調整で変わりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Các ca thất bại sâu: idempotency, timeout, hoàn tiền",
      en: "9. Deep failure cases: idempotency, timeout, refunds",
      ja: "9. 深い失敗ケース — 冪等性・タイムアウト・返金",
    },
    blocks: [
      P(
        "Happy path chỉ là bề nổi. Rủi ro tiền bạc lớn nhất nằm ở các ca thất bại. Thứ nhất là idempotency: nếu thẩm định viên bấm duyệt hai lần do mạng chậm, hệ thống phải chỉ tạo một lần chi trả, không chi đôi. Thứ hai là timeout: nếu dịch vụ chi trả treo, quyết định phải ở trạng thái chờ chứ không rơi vào trạng thái nửa vời khiến sổ cái lệch. Thứ ba là hoàn tiền: khi một chi trả bị đảo (reversal), sổ cái phải quay về cân bằng và tổng tiền được bảo toàn.",
        "The happy path is only the surface. The greatest financial risk lies in failure cases. First, idempotency: if the adjuster clicks approve twice due to a slow network, the system must create only one disbursement, not pay twice. Second, timeout: if the disbursement service hangs, the decision must stay pending rather than fall into a half-finished state that unbalances the ledger. Third, refunds: when a disbursement is reversed, the ledger must return to balance and total money is conserved.",
        "ハッピーパスは表層にすぎません。最大の財務リスクは失敗ケースにあります。第一に冪等性です。ネットワークが遅く査定担当者が承認を2回クリックした場合、システムは支払を1回だけ作成し、二重払いしてはなりません。第二にタイムアウトです。支払サービスがハングした場合、判定は元帳を不均衡にする中途半端な状態に陥るのではなく、保留のままでなければなりません。第三に返金です。支払が取り消された場合、元帳は均衡に戻り、総額が保存されなければなりません。"
      ),
      CODE("typescript", `// tests/idempotency.api.spec.ts — bấm duyệt 2 lần → đúng 1 lần chi trả.
import { test, expect } from '@playwright/test';

test('duyệt lặp với cùng idempotency-key chỉ chi trả một lần', async ({ request }) => {
  const seed = await request.post('/test/seed/claim', { data: {
    idempotencyKey: 'idem-1', planTier: 'GOLD', peril: 'hospital',
    waitingDays: 30, incidentOffsetDays: 200, claimAmount: 8000, limit: 20000,
    excluded: false, fraudFlag: false,
  }});
  const { claimId } = await seed.json();

  const key = 'approve-idem-1';
  const call = () => request.post(\`/claims/\${claimId}/approve\`, {
    headers: { 'Idempotency-Key': key },
  });

  // Gửi hai lần song song (mô phỏng double-click / retry).
  const [r1, r2] = await Promise.all([call(), call()]);
  expect(r1.ok() && r2.ok()).toBeTruthy();

  // ORACLE idempotency: đúng MỘT bút toán chi trả, tổng chi = 8000.
  const ledger = await (await request.get(\`/claims/\${claimId}/ledger\`)).json();
  const disbursements = ledger.entries.filter((e: any) => e.type === 'DISBURSEMENT');
  expect(disbursements.length, 'chỉ một lần chi trả').toBe(1);
  expect(ledger.balance, 'sổ cái cân bằng').toBe(0);
  const total = ledger.entries.reduce((s: number, e: any) => s + e.debit - e.credit, 0);
  expect(total, 'bảo toàn tiền: debit = credit').toBe(0);
});`),
      P(
        "Ca timeout thường bị bỏ quên vì khó tái hiện. Với Playwright ở tầng API ta có thể chèn độ trễ hoặc lỗi bằng cách trỏ vào một endpoint sandbox mô phỏng dịch vụ chi trả treo, rồi khẳng định rằng quyết định vẫn ở trạng thái PENDING_PAYOUT và không có bút toán rác nào được ghi. Điều quan trọng của oracle ở đây là: trạng thái nửa vời không được phép tồn tại. Hệ thống hoặc hoàn tất trọn vẹn, hoặc lùi sạch — không có vùng xám.",
        "The timeout case is often forgotten because it is hard to reproduce. With Playwright at the API tier we can inject delay or error by pointing at a sandbox endpoint simulating a hung disbursement service, then assert that the decision stays in PENDING_PAYOUT and no junk entry is written. The crucial oracle here is: a half-finished state must not be allowed to exist. The system either completes fully or rolls back cleanly — no gray zone.",
        "タイムアウトケースは再現が難しいため見落とされがちです。API層のPlaywrightでは、ハングした支払サービスを模擬するサンドボックスエンドポイントを指すことで遅延やエラーを注入し、判定がPENDING_PAYOUTのままでゴミ仕訳が書き込まれないことをアサートできます。ここで重要なオラクルは、中途半端な状態の存在を許してはならないということです。システムは完全に完了するか、きれいにロールバックするかのいずれかで、灰色の領域はありません。"
      ),
      WARN(
        "Nếu test idempotency của bạn xanh chỉ vì hệ thống chậm nên lần hai chưa kịp chạy, đó là dương tính giả. Hãy gửi song song bằng Promise.all để ép cạnh tranh thật sự.",
        "If your idempotency test is green merely because the system is slow so the second call hasn't run yet, that is a false positive. Fire concurrently with Promise.all to force a genuine race.",
        "冪等性テストが、システムが遅く2回目の呼び出しがまだ走っていないという理由だけで緑になっているなら、それは偽陽性です。Promise.allで並列に発火させ、本物の競合を強制してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Kiểm thử loại trừ và thời gian chờ như luật cứng",
      en: "10. Testing exclusions and waiting periods as hard rules",
      ja: "10. 免責と待機期間をハードルールとしてテストする",
    },
    blocks: [
      P(
        "Loại trừ và thời gian chờ là hai lớp phòng vệ tài chính quan trọng nhất của bảo hiểm, và cũng là nơi lỗi gây thiệt hại trực tiếp. Một luật loại trừ phải chặn chi trả bất kể số tiền lớn hay nhỏ, bất kể hạng gói. Một thời gian chờ phải chặn mọi hồ sơ có ngày xảy ra rơi vào khoảng chờ, tính chính xác đến từng ngày kể cả năm nhuận và múi giờ. Đây là lý do ta phải kiểm cả các ca biên ngày: đúng ngày cuối của thời gian chờ, và ngày ngay sau đó.",
        "Exclusions and waiting periods are insurance's two most important financial defenses, and also where errors cause direct loss. An exclusion rule must block payout regardless of amount, large or small, regardless of plan tier. A waiting period must block every claim whose incident date falls within the wait window, computed precisely to the day including leap years and time zones. This is why we must test the day boundaries: the exact last day of the waiting period, and the day immediately after.",
        "免責と待機期間は保険における最も重要な2つの財務的防御であり、誤りが直接的な損失を招く箇所でもあります。免責ルールは、金額の大小やプラン等級に関わらず支払を阻止しなければなりません。待機期間は、うるう年や時間帯を含め日単位で正確に計算され、発生日が待機ウィンドウ内に入るすべての請求を阻止しなければなりません。だからこそ日付境界のテストが必要です。待機期間の正確な最終日と、その翌日です。"
      ),
      CODE("typescript", `// tests/waiting-boundary.api.spec.ts — kiểm biên NGÀY của thời gian chờ.
import { test, expect } from '@playwright/test';

// waiting = 30 ngày. Ngày 30 vẫn TRONG chờ → DENY; ngày 31 đã QUA → cho xét.
const boundary = [
  { offset: 30, expect: 'DENY',    reason: 'WAITING_PERIOD' },
  { offset: 31, expect: 'APPROVE', reason: 'WITHIN_LIMIT' },
];

for (const b of boundary) {
  test(\`biên thời gian chờ offset=\${b.offset} → \${b.expect}\`, async ({ request }) => {
    const seed = await request.post('/test/seed/claim', { data: {
      idempotencyKey: \`wait-\${b.offset}\`, planTier: 'GOLD', peril: 'hospital',
      waitingDays: 30, incidentOffsetDays: b.offset, claimAmount: 5000, limit: 20000,
      excluded: false, fraudFlag: false,
    }});
    const { claimId } = await seed.json();
    const res = await request.post(\`/claims/\${claimId}/adjudicate\`);
    const body = await res.json();
    expect(body.decision).toBe(b.expect);
    expect(body.reason).toBe(b.reason);
  });
}`),
      QA(
        "Vì sao lỗi thời gian chờ hay lọt lưới ở môi trường thật dù test đơn giản?",
        "Why do waiting-period bugs often slip through in production despite the test looking simple?",
        "Vì phần lớn lỗi nằm ở tính toán ngày: lệch múi giờ giữa máy chủ và khách, dùng thời điểm nửa đêm địa phương hay UTC, xử lý năm nhuận, và định nghĩa 'ngày thứ ba mươi' là tính hay không tính ngày hiệu lực. Test chỉ với offset ở giữa khoảng sẽ luôn xanh. Chỉ khi kiểm đúng hai ca biên — ngày cuối cùng còn trong chờ và ngày đầu tiên đã qua — ta mới phát hiện lệch một ngày, loại lỗi kinh điển gây chi trả hoặc từ chối sai.",
        "Because most bugs are in date computation: time-zone drift between server and client, using local midnight versus UTC, leap-year handling, and whether 'day thirty' counts the effective date or not. A test with only a mid-range offset stays green forever. Only by testing the two boundaries — the last day still inside the wait and the first day past it — do we catch off-by-one, the classic bug that causes wrong payouts or denials.",
        "ほとんどの不具合が日付計算にあるからです。サーバーとクライアント間の時間帯のずれ、ローカル深夜とUTCの使い分け、うるう年の処理、そして「30日目」が発効日を数えるか否かなどです。中間のオフセットだけのテストは永遠に緑のままです。2つの境界、すなわち待機内に残る最終日と過ぎた最初の日を正確にテストして初めて、誤った支払や却下を招く典型的な不具合であるオフバイワンを検出できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Tích hợp CI: chạy theo tầng, báo cáo và cổng chất lượng",
      en: "11. CI integration: tiered runs, reporting and the quality gate",
      ja: "11. CI統合 — 階層別実行・レポート・品質ゲート",
    },
    blocks: [
      P(
        "Trong CI, ta chạy tầng đơn vị và API trên mọi pull request vì chúng nhanh và phủ oracle nghiệp vụ, còn E2E chạy trên nhánh chính và trước khi phát hành. Cấu hình trace giữ lại khi thất bại và khi retry giúp điều tra nhanh mà không phình dung lượng. Cổng chất lượng đặt điều kiện gộp code rõ ràng: một trăm phần trăm cột bảng quyết định phải có test xanh, và không được có vi phạm bất biến tiền. Báo cáo JUnit gắn vào giao diện CI để cả nghiệp vụ lẫn kỹ thuật cùng nhìn được ca nào đỏ.",
        "In CI, we run the unit and API tiers on every pull request because they are fast and cover the business oracle, while E2E runs on the main branch and before release. Configuring trace retention on failure and on retries enables quick investigation without bloating storage. The quality gate sets a clear merge condition: one hundred percent of decision-table columns must have green tests, and there must be no money-invariant violation. The JUnit report attaches to the CI UI so both business and engineering can see which case is red.",
        "CIでは、高速で業務オラクルを網羅するユニット層とAPI層をすべてのプルリクエストで実行し、E2Eはメインブランチとリリース前に実行します。失敗時とリトライ時にトレースを保持する設定により、ストレージを膨らませずに素早く調査できます。品質ゲートは明確なマージ条件を設定します。判定表の列の100パーセントに緑のテストがあること、そして資金不変条件の違反がないことです。JUnitレポートをCI UIに添付することで、業務側も技術側もどのケースが赤かを確認できます。"
      ),
      CODE("yaml", `# .github/workflows/claims-ci.yml — chạy theo tầng, upload trace.
name: claims-ci
on: [pull_request]
jobs:
  fast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      # Đơn vị + API: phủ toàn bộ bảng quyết định, chạy song song.
      - run: npx playwright test --project=api
        env:
          CLAIMS_BASE_URL: \${{ secrets.STAGING_URL }}
      - name: Upload trace on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-trace
          path: test-results/**/trace.zip
      - name: Quality gate — decision-table coverage
        run: node scripts/assert-decision-coverage.mjs results/junit.xml`),
      TIP(
        "Đặt trace: 'retain-on-failure-and-retries' để lần chạy xanh không sinh trace nặng, còn khi đỏ hoặc phải retry mới lưu — cân bằng giữa khả năng điều tra và chi phí lưu trữ.",
        "Set trace: 'retain-on-failure-and-retries' so green runs produce no heavy trace, and only failures or retries are stored — balancing investigability against storage cost.",
        "trace: 'retain-on-failure-and-retries' を設定すると、緑の実行では重いトレースが生成されず、失敗やリトライ時のみ保存されます。調査可能性とストレージコストの均衡を取ります。"
      ),
      P(
        "Một cổng chất lượng tốt phải nói được ngôn ngữ nghiệp vụ, không chỉ ngôn ngữ kỹ thuật. Thay vì báo 'ba test đỏ', script cổng nên báo 'luật CAP (payout theo hạn mức) chưa được phủ' hoặc 'phát hiện vi phạm bất biến tiền ở ca C3'. Khi báo cáo gắn trực tiếp với luật nghiệp vụ và bất biến, quản lý sản phẩm hiểu ngay rủi ro và ưu tiên sửa. Đây là chỗ oracle-first trả cổ tức: mỗi thất bại có ý nghĩa nghiệp vụ rõ ràng.",
        "A good quality gate must speak the business language, not just the technical one. Instead of reporting 'three tests red', the gate script should report 'the CAP rule (payout at limit) is not covered' or 'money-invariant violation detected in case C3'. When the report ties directly to business rules and invariants, the product manager immediately grasps the risk and prioritizes the fix. This is where oracle-first pays dividends: every failure has a clear business meaning.",
        "良い品質ゲートは技術用語だけでなく業務言語を話さなければなりません。「3つのテストが赤」と報告する代わりに、ゲートスクリプトは「CAPルール（上限での支払）が未網羅」や「ケースC3で資金不変条件違反を検出」と報告すべきです。レポートが業務ルールと不変条件に直接結びつくと、プロダクトマネージャーは即座にリスクを把握し修正を優先します。ここでオラクルファーストが配当をもたらします。すべての失敗が明確な業務上の意味を持つのです。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới AI-agent: dùng đến đâu, kiểm soát thế nào",
      en: "12. The AI-agent boundary: how far to use it, how to control it",
      ja: "12. AIエージェントの境界 — どこまで使い、どう制御するか",
    },
    blocks: [
      P(
        "Playwright Agents gồm bộ ba Planner, Generator và Healer rất hữu ích để khám phá ứng dụng và dựng khung test, nhưng trong domain bảo hiểm ta phải đặt ranh giới rõ. Agent có thể sinh khung test và xác minh locator trên ứng dụng thật, tăng tốc phần cơ khí. Nhưng oracle — đáp án đúng của bảng quyết định và công thức phí — phải do con người, cụ thể là phòng nghiệp vụ, cung cấp và ký duyệt. Nếu để AI tự đoán kết quả kỳ vọng, ta có nguy cơ hợp thức hoá chính lỗi của sản phẩm.",
        "Playwright Agents — the Planner, Generator and Healer trio — are very useful for exploring the app and scaffolding tests, but in the insurance domain we must set a clear boundary. Agents can generate test skeletons and verify locators on the live app, speeding up the mechanical part. But the oracle — the correct decision-table answers and premium formula — must be supplied and signed off by humans, specifically the business team. If we let AI guess the expected result, we risk legitimizing the product's own bug.",
        "PlaywrightエージェントのPlanner・Generator・Healerの三者は、アプリの探索やテストの雛形作成に非常に有用ですが、保険ドメインでは明確な境界を設けなければなりません。エージェントはテストの骨組みを生成し、実際のアプリでロケーターを検証でき、機械的な部分を高速化します。しかしオラクル、すなわち判定表の正解と保険料の式は、人間、具体的には業務チームが提供し承認しなければなりません。AIに期待結果を推測させれば、製品自身の不具合を正当化するリスクがあります。"
      ),
      UL(
        [
          "Cho phép AI: khám phá luồng, đề xuất khung test, verify locator, tự sửa test gãy do đổi giao diện (Healer).",
          "KHÔNG cho phép AI: tự sinh giá trị oracle (quyết định, payout, phí) — phải lấy từ bảng đã duyệt.",
          "Bắt buộc: mọi test do AI sinh phải qua review người trước khi vào bộ hồi quy chính thức.",
          "Grounding: cung cấp cho agent bảng quyết định và mô hình dữ liệu để tránh hallucination về luật.",
        ],
        [
          "Allow AI to: explore flows, propose test skeletons, verify locators, self-heal tests broken by UI changes (Healer).",
          "Do NOT allow AI to: invent oracle values (decision, payout, premium) — these come from the approved table.",
          "Mandatory: every AI-generated test passes human review before entering the official regression suite.",
          "Grounding: give the agent the decision table and data model to avoid hallucinating rules.",
        ],
        [
          "AIに許すこと: フローの探索、テスト雛形の提案、ロケーターの検証、UI変更で壊れたテストの自己修復（Healer）。",
          "AIに許さないこと: オラクル値（判定・支払・保険料）の捏造。これらは承認済み表から得ます。",
          "必須: AIが生成したすべてのテストは、公式の回帰スイートに入る前に人間のレビューを通すこと。",
          "グラウンディング: ルールについてのハルシネーションを避けるため、エージェントに判定表とデータモデルを与えること。",
        ]
      ),
      SCEN(
        "Thực chiến: khi Healer đề xuất bỏ qua một test đỏ",
        "Real-world: when the Healer suggests skipping a red test",
        "Trên nhánh phát hành, Healer chạy trong chế độ debug và đề xuất đánh dấu skip một test claim đỏ vì locator đổi. Nhóm QA không chấp nhận mù quáng: họ mở trace, thấy test đỏ không phải do locator mà do payout trả về 22.000 trong khi hạn mức 20.000 — một vi phạm bất biến tiền thật sự. Nếu tin Healer và skip, một lỗi chi trả vượt hạn mức đã lọt ra sản phẩm. Bài học: AI hỗ trợ điều tra, nhưng quyết định giữ hay bỏ một test bảo vệ tiền luôn là của con người.",
        "On the release branch, the Healer runs in debug mode and suggests marking a red claim test as skipped because a locator changed. The QA team does not accept blindly: they open the trace and see the test is red not from the locator but because payout returned 22,000 while the limit is 20,000 — a genuine money-invariant violation. Had they trusted the Healer and skipped, an over-limit payout bug would have shipped. Lesson: AI assists investigation, but the decision to keep or drop a money-protecting test is always human.",
        "リリースブランチでHealerがデバッグモードで実行され、ロケーターが変わったという理由で赤い請求テストをスキップにするよう提案します。QAチームは盲目的に受け入れません。トレースを開くと、テストが赤いのはロケーターではなく、上限が2万なのに支払が2万2千を返したため、すなわち本物の資金不変条件違反であることがわかります。Healerを信じてスキップしていたら、上限超過の支払不具合が出荷されていたでしょう。教訓: AIは調査を支援しますが、資金を守るテストを残すか捨てるかの決定は常に人間が行います。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn và tổng kết",
      en: "13. Interview angle and wrap-up",
      ja: "13. 面接の視点とまとめ",
    },
    blocks: [
      P(
        "Chủ đề bảo hiểm là mảnh đất màu mỡ cho câu hỏi phỏng vấn vì nó buộc ứng viên thể hiện tư duy oracle-first và kỹ thuật data-driven cùng lúc. Người phỏng vấn thường không hỏi cú pháp Playwright mà hỏi cách bạn suy nghĩ: làm sao biết đáp án đúng, làm sao phủ luật hiệu quả, làm sao bảo vệ bất biến tiền. Nếu bạn trình bày được đường đi từ bảng quyết định do nghiệp vụ ký, tới CSV, tới test tham số hoá, tới cổng chất lượng nói ngôn ngữ nghiệp vụ, bạn đã chứng minh mình hiểu kiểm thử như một hoạt động bảo vệ giá trị, không phải bấm nút.",
        "The insurance topic is fertile ground for interview questions because it forces the candidate to demonstrate oracle-first thinking and data-driven technique at once. Interviewers usually do not ask Playwright syntax but how you think: how do you know the correct answer, how do you cover rules efficiently, how do you protect the money invariant. If you can lay out the path from the business-signed decision table, to the CSV, to parametrized tests, to a quality gate that speaks the business language, you have proven you understand testing as a value-protecting activity, not button-clicking.",
        "保険というテーマは面接の質問に格好の題材です。オラクルファーストの思考とデータ駆動手法を同時に示すよう候補者に迫るからです。面接官は通常Playwrightの構文ではなく、考え方を問います。どうやって正解を知るのか、どうやってルールを効率的に網羅するのか、どうやって資金不変条件を守るのか。業務部門が承認した判定表からCSV、パラメータ化テスト、業務言語を話す品質ゲートまでの道筋を示せれば、テストをボタン押しではなく価値を守る活動として理解していることを証明できます。"
      ),
      QA(
        "Nếu chỉ được viết mười test cho hệ thống bồi thường này, bạn chọn thế nào?",
        "If you could write only ten tests for this claims system, how would you choose?",
        "Tôi ưu tiên theo rủi ro tài chính. Năm test đầu phủ năm luật của bảng quyết định vì đó là oracle nghiệp vụ cốt lõi. Hai test cho biên thời gian chờ và biên hạn mức (CAP) vì đó là nơi lỗi lệch-một hay xảy ra. Một test idempotency chống chi trả đôi. Một test bảo toàn tiền của sổ cái. Một test tính phí ở ca biên hệ số. Mười test này bảo vệ mọi bất biến gây thiệt hại tiền trực tiếp, quan trọng hơn nhiều so với mười test giao diện đẹp.",
        "I prioritize by financial risk. The first five tests cover the five rules of the decision table because that is the core business oracle. Two tests for the waiting-period boundary and the limit boundary (CAP) because that is where off-by-one bugs happen. One idempotency test against double payout. One ledger money-conservation test. One premium test at a factor boundary. These ten protect every invariant that causes direct money loss, far more valuable than ten pretty-UI tests.",
        "私は財務リスクで優先順位を付けます。最初の5テストは判定表の5ルールを網羅します。それが中核の業務オラクルだからです。2テストは待機期間境界と上限境界（CAP）に充てます。オフバイワンが起きる箇所だからです。1テストは二重払いを防ぐ冪等性、1テストは元帳の資金保存、1テストは係数境界での保険料計算です。この10テストは資金を直接失わせるすべての不変条件を守り、見栄えの良いUIテスト10個よりはるかに価値があります。"
      ),
      QA(
        "Làm sao thuyết phục quản lý đầu tư vào tầng đơn vị thay vì E2E hào nhoáng?",
        "How do you convince management to invest in the unit tier instead of flashy E2E?",
        "Tôi trình bày bằng con số và rủi ro. Một lỗi chi trả vượt hạn mức có thể mất hàng tỷ; test đơn vị bắt nó trong mili-giây và chạy trên mọi commit, còn E2E chậm gấp trăm lần và giòn. Tôi cho thấy kim tự tháp: E2E chỉ chứng minh luồng người dùng, còn oracle nghiệp vụ được bảo vệ dày ở tầng đơn vị. Khi quản lý thấy tầng đơn vị vừa rẻ vừa bắt đúng loại lỗi mất tiền, quyết định đầu tư trở nên hiển nhiên.",
        "I present with numbers and risk. An over-limit payout bug can cost billions; a unit test catches it in milliseconds and runs on every commit, whereas E2E is a hundred times slower and brittle. I show the pyramid: E2E only proves the user flow, while the business oracle is densely protected at the unit tier. When management sees the unit tier is both cheap and catches exactly the money-losing bugs, the investment decision becomes obvious.",
        "私は数字とリスクで示します。上限超過の支払不具合は数十億の損失になり得ます。ユニットテストはそれをミリ秒で捕らえ、毎コミット実行されますが、E2Eは百倍遅く壊れやすいです。ピラミッドを示します。E2Eはユーザーフローを証明するだけで、業務オラクルはユニット層で厚く守られます。ユニット層が安価でありながら資金を失う不具合を正確に捕らえると経営陣が理解すれば、投資の決定は自明になります。"
      ),
      P(
        "Tổng kết lại, kiểm thử hệ thống bồi thường bảo hiểm là bài học kinh điển về oracle-first và data-driven. Ta mã hoá bảng quyết định do nghiệp vụ ký duyệt thành dữ liệu, sinh test tham số hoá phủ mọi luật, khẳng định bất biến tiền và hạn mức thay vì bề mặt giao diện, cô lập dữ liệu để chạy song song tất định, và dựng cổng chất lượng nói ngôn ngữ nghiệp vụ. AI-agent giúp tăng tốc phần cơ khí nhưng con người giữ quyền quyết định oracle. Đó là bộ khung bạn có thể mang sang mọi domain nhiều luật khác.",
        "In summary, testing an insurance claims system is a classic lesson in oracle-first and data-driven. We encode the business-signed decision table as data, generate parametrized tests covering every rule, assert money and limit invariants rather than UI surface, isolate data for deterministic parallelism, and build a quality gate that speaks the business language. AI agents speed up the mechanical part but humans retain authority over the oracle. That is a framework you can carry to any other rule-heavy domain.",
        "まとめると、保険金請求システムのテストはオラクルファーストとデータ駆動の古典的な教訓です。業務部門が承認した判定表をデータとして符号化し、すべてのルールを網羅するパラメータ化テストを生成し、UIの表層ではなく資金と上限の不変条件を検証し、決定的な並列化のためにデータを分離し、業務言語を話す品質ゲートを構築します。AIエージェントは機械的な部分を高速化しますが、人間がオラクルに対する権限を保持します。それは他のあらゆるルールの多いドメインに持ち運べる枠組みです。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — SaaS: billing theo usage, multi-tenancy & RBAC
// ===========================================================================

const imgB1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">CÔ LẬP TENANT / TENANT ISOLATION</text>
<g font-size="12">
  <rect x="40" y="60" width="200" height="180" rx="10" fill="#0c4a6e" stroke="#38bdf8"/>
  <text x="60" y="86" fill="#e0f2fe" font-weight="700">Tenant A (Acme)</text>
  <rect x="60" y="100" width="160" height="34" rx="6" fill="#0369a1"/><text x="74" y="122" fill="#e0f2fe" font-size="11">usage · invoice · users</text>
  <rect x="60" y="146" width="160" height="34" rx="6" fill="#0369a1"/><text x="74" y="168" fill="#e0f2fe" font-size="11">RBAC: admin/member</text>
  <rect x="60" y="192" width="160" height="34" rx="6" fill="#075985"/><text x="74" y="214" fill="#bae6fd" font-size="11">tenant_id = A</text>

  <rect x="400" y="60" width="200" height="180" rx="10" fill="#3b0764" stroke="#c084fc"/>
  <text x="420" y="86" fill="#f3e8ff" font-weight="700">Tenant B (Globex)</text>
  <rect x="420" y="100" width="160" height="34" rx="6" fill="#6b21a8"/><text x="434" y="122" fill="#f3e8ff" font-size="11">usage · invoice · users</text>
  <rect x="420" y="146" width="160" height="34" rx="6" fill="#6b21a8"/><text x="434" y="168" fill="#f3e8ff" font-size="11">RBAC: admin/member</text>
  <rect x="420" y="192" width="160" height="34" rx="6" fill="#581c87"/><text x="434" y="214" fill="#e9d5ff" font-size="11">tenant_id = B</text>

  <path d="M240 150 h160" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 5"/>
  <circle cx="320" cy="150" r="16" fill="#450a0a" stroke="#ef4444"/>
  <text x="320" y="155" fill="#fca5a5" text-anchor="middle" font-weight="800">✕</text>
  <text x="320" y="255" fill="#fca5a5" text-anchor="middle" font-size="11">Không rò rỉ chéo</text>
</g>`),
  "Hai tenant chia sẻ hạ tầng nhưng dữ liệu tuyệt đối không rò rỉ chéo.",
  "Two tenants share infrastructure but data must never leak across.",
  "2つのテナントはインフラを共有しますが、データが相互に漏洩することは決してありません。"
);

const imgB2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">MA TRẬN RBAC / RBAC MATRIX</text>
<g font-size="11">
  <rect x="24" y="52" width="592" height="26" fill="#0c4a6e"/>
  <text x="40" y="70" fill="#e0f2fe" font-weight="700">Hành động</text>
  <text x="300" y="70" fill="#e0f2fe" font-weight="700">Admin</text>
  <text x="400" y="70" fill="#e0f2fe" font-weight="700">Member</text>
  <text x="510" y="70" fill="#e0f2fe" font-weight="700">Billing</text>
  <g fill="#cbd5e1">
    <text x="40" y="98">Xem hoá đơn</text>       <text x="308" y="98" fill="#34d399">✓</text><text x="410" y="98" fill="#f87171">✕</text><text x="520" y="98" fill="#34d399">✓</text>
    <text x="40" y="122">Thay đổi gói</text>     <text x="308" y="122" fill="#34d399">✓</text><text x="410" y="122" fill="#f87171">✕</text><text x="520" y="122" fill="#f87171">✕</text>
    <text x="40" y="146">Mời thành viên</text>   <text x="308" y="146" fill="#34d399">✓</text><text x="410" y="146" fill="#f87171">✕</text><text x="520" y="146" fill="#f87171">✕</text>
    <text x="40" y="170">Xuất báo cáo usage</text><text x="308" y="170" fill="#34d399">✓</text><text x="410" y="170" fill="#34d399">✓</text><text x="520" y="170" fill="#34d399">✓</text>
    <text x="40" y="194">Cập nhật thẻ</text>    <text x="308" y="194" fill="#f87171">✕</text><text x="410" y="194" fill="#f87171">✕</text><text x="520" y="194" fill="#34d399">✓</text>
  </g>
  <line x1="24" y1="80" x2="616" y2="80" stroke="#334155"/>
</g>
<text x="24" y="230" fill="#94a3b8" font-size="12">Mỗi ô ✓/✕ là một ca kiểm thử — đặc biệt các ô ✕ (kiểm thử phủ định) mới lộ lỗ hổng.</text>
<text x="24" y="252" fill="#94a3b8" font-size="12">RBAC phải chặn cả ở API, không chỉ ẩn nút trên giao diện.</text>`),
  "Ma trận RBAC: mỗi ô là một ca; các ô cấm (✕) là kiểm thử phủ định quan trọng nhất.",
  "The RBAC matrix: each cell is a test; the deny cells (✕) are the most important negative tests.",
  "RBACマトリクス: 各セルが1テストで、拒否セル（✕）が最も重要な否定テストです。"
);

const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh nghiệp vụ: SaaS đa tenant tính tiền theo mức dùng",
      en: "1. Business context: a multi-tenant, usage-billed SaaS",
      ja: "1. 業務背景 — 従量課金のマルチテナントSaaS",
    },
    blocks: [
      P(
        "Một nền tảng SaaS B2B phục vụ ba nghìn tổ chức khách hàng (tenant) trên cùng một hạ tầng dùng chung. Mỗi tenant tự quản lý người dùng, phân quyền và bị tính tiền theo mức sử dụng thực tế: số lời gọi API, dung lượng lưu trữ, số ghế người dùng hoạt động. Ba trụ cột chất lượng sống còn là cô lập dữ liệu giữa các tenant, tính hoá đơn theo usage phải đúng đến từng xu, và phân quyền RBAC phải được thực thi ở tầng API chứ không chỉ ẩn nút. Sai một trong ba đều là sự cố nghiêm trọng.",
        "A B2B SaaS platform serves three thousand customer organizations (tenants) on the same shared infrastructure. Each tenant manages its own users, permissions and is billed by actual usage: number of API calls, storage volume, active user seats. The three vital quality pillars are data isolation between tenants, usage-based invoicing correct to the cent, and RBAC enforced at the API tier rather than merely hiding buttons. Getting any of the three wrong is a serious incident.",
        "あるB2B SaaSプラットフォームは、同一の共有インフラ上で3千の顧客組織（テナント）にサービスを提供します。各テナントは自身のユーザーと権限を管理し、実際の使用量、すなわちAPI呼び出し数・ストレージ容量・アクティブなユーザー席数に応じて課金されます。3つの重要な品質の柱は、テナント間のデータ分離、1円単位まで正確な従量課金、そしてボタンを隠すだけでなくAPI層で実施されるRBACです。3つのうちどれか1つでも誤れば重大なインシデントになります。"
      ),
      P(
        "SLA nghiệp vụ đặt ra ba cam kết cứng. Thứ nhất, không bao giờ có rò rỉ dữ liệu chéo giữa tenant — đây là cam kết bảo mật tuyệt đối, một lần rò là mất khách và có thể vi phạm quy định bảo vệ dữ liệu. Thứ hai, hoá đơn phải khớp chính xác với usage đã ghi nhận, kể cả khi khách nâng hoặc hạ gói giữa kỳ (proration). Thứ ba, quy trình đòi nợ (dunning) khi thanh toán thất bại phải chạy đúng lịch và không khoá nhầm tài khoản đang trả tiền đầy đủ.",
        "The business SLA sets three hard commitments. First, never any cross-tenant data leakage — an absolute security commitment; one leak loses customers and may breach data-protection regulation. Second, invoices must match recorded usage exactly, even when a customer upgrades or downgrades mid-cycle (proration). Third, the dunning process on failed payment must run on schedule and never wrongly lock an account that is paying in full.",
        "業務SLAは3つの厳格なコミットメントを定めます。第一に、テナント間のデータ漏洩を決して起こさないこと。これは絶対的なセキュリティ上のコミットメントで、一度の漏洩が顧客を失わせ、データ保護規制に違反しかねません。第二に、顧客が期中にプランをアップグレードまたはダウングレードした場合（日割り計算）でも、請求書が記録された使用量と正確に一致すること。第三に、支払失敗時の督促プロセスが予定通りに実行され、全額支払っているアカウントを誤ってロックしないことです。"
      ),
      imgB1,
      P(
        "Chiến lược kiểm thử của bài này dựa trên ba kỹ thuật gắn với ba trụ cột. Với RBAC và đa tenant, ta dùng storageState cho từng cặp vai trò và tenant để đăng nhập sẵn, kết hợp kiểm thử phủ định uỷ quyền — cố tình truy cập tài nguyên của tenant khác và khẳng định bị chặn. Với billing, ta seed usage qua API rồi khẳng định hoá đơn tính lại bằng oracle độc lập khớp đến từng xu. Toàn bộ tuân theo nguyên tắc oracle-first: không khẳng định giao diện đẹp, mà khẳng định bất biến bảo mật và tiền.",
        "This article's test strategy rests on three techniques tied to the three pillars. For RBAC and multi-tenancy, we use storageState per role-and-tenant pair for pre-authenticated sessions, combined with negative authorization tests — deliberately accessing another tenant's resource and asserting it is blocked. For billing, we seed usage via API then assert the invoice, recomputed by an independent oracle, matches to the cent. All follow the oracle-first principle: assert not a pretty UI but the security and money invariants.",
        "本記事のテスト戦略は、3つの柱に結びついた3つの手法に基づきます。RBACとマルチテナントについては、事前認証済みセッションのために役割とテナントの組ごとにstorageStateを使い、否定的な認可テスト、すなわち意図的に別テナントのリソースにアクセスして遮断されることをアサートする手法と組み合わせます。課金については、API経由で使用量をseedし、独立したオラクルで再計算した請求書が1円単位で一致することをアサートします。すべてがオラクルファーストの原則に従い、見栄えの良いUIではなくセキュリティと資金の不変条件を検証します。"
      ),
      WARN(
        "Ẩn nút trên giao diện KHÔNG phải là phân quyền. Nếu API không tự kiểm quyền, kẻ tấn công gọi thẳng endpoint là vượt qua. Mọi ca RBAC phải kiểm ở tầng API.",
        "Hiding a button in the UI is NOT authorization. If the API does not check permission itself, an attacker calls the endpoint directly and bypasses it. Every RBAC case must be checked at the API tier.",
        "UIでボタンを隠すことは認可ではありません。API自身が権限を確認しなければ、攻撃者はエンドポイントを直接呼び出して回避します。すべてのRBACケースはAPI層で確認しなければなりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc và mô hình dữ liệu đa tenant",
      en: "2. Architecture and the multi-tenant data model",
      ja: "2. アーキテクチャとマルチテナントのデータモデル",
    },
    blocks: [
      P(
        "Hệ thống dùng mô hình shared-database, shared-schema: mọi tenant chung một cơ sở dữ liệu, mỗi bản ghi mang một cột tenant_id. Mô hình này tiết kiệm chi phí nhưng đặt gánh nặng cô lập lên tầng ứng dụng: mọi truy vấn phải lọc theo tenant_id của phiên hiện tại, thường thông qua một lớp middleware gán ngữ cảnh tenant. Đây chính là điểm rủi ro số một: chỉ cần một truy vấn quên mệnh đề lọc tenant là dữ liệu rò rỉ chéo. Vì vậy oracle cô lập phải được kiểm ở mọi endpoint đọc dữ liệu.",
        "The system uses a shared-database, shared-schema model: all tenants share one database, each record carries a tenant_id column. This model saves cost but puts the isolation burden on the application tier: every query must filter by the current session's tenant_id, usually via a middleware that sets tenant context. This is the number-one risk point: a single query missing the tenant filter clause leaks data across tenants. So the isolation oracle must be checked at every data-reading endpoint.",
        "システムは共有データベース・共有スキーマモデルを採用します。すべてのテナントが1つのデータベースを共有し、各レコードがtenant_id列を持ちます。このモデルはコストを節約しますが、分離の負担をアプリケーション層に負わせます。すべてのクエリは現在のセッションのtenant_idでフィルタしなければならず、通常はテナントコンテキストを設定するミドルウェアを介します。これが第一のリスクポイントです。テナントフィルタ句を欠いたクエリが1つあるだけで、テナント間でデータが漏洩します。そのため分離オラクルは、データを読むすべてのエンドポイントで確認しなければなりません。"
      ),
      CODE("typescript", `// prisma/schema.prisma (trích) — mọi bảng có tenantId, index kép để lọc nhanh.
model Tenant {
  id        String   @id @default(cuid())
  name      String
  plan      String   // FREE | PRO | ENTERPRISE
  users     User[]
  usages    Usage[]
  invoices  Invoice[]
}

model User {
  id        String  @id @default(cuid())
  email     String
  role      String  // ADMIN | MEMBER | BILLING
  tenantId  String
  tenant    Tenant  @relation(fields: [tenantId], references: [id])
  @@unique([tenantId, email])
}

model Usage {
  id        String   @id @default(cuid())
  tenantId  String
  metric    String   // api_calls | storage_gb | seats
  quantity  Int
  at        DateTime
  @@index([tenantId, metric, at])   // luôn lọc theo tenant TRƯỚC
}

model Invoice {
  id        String   @id @default(cuid())
  tenantId  String
  periodEnd DateTime
  amount    Int      // đơn vị: cent, tránh số thực
  status    String   // OPEN | PAID | PAST_DUE | VOID
}`),
      P(
        "Từ mô hình này ta rút ra bất biến cô lập cốt lõi: với mọi endpoint và mọi cặp tenant khác nhau, dữ liệu trả về không bao giờ chứa bản ghi thuộc tenant khác. Bất biến billing: tổng tiền hoá đơn của một tenant bằng tổng usage đã ghi nhận nhân đơn giá theo gói, cộng phần proration nếu đổi gói. Và bất biến RBAC: một hành động chỉ thành công khi vai trò của người gọi có quyền tương ứng trong ma trận, kiểm ngay ở API. Ba bất biến này là oracle xuyên suốt bài.",
        "From this model we derive the core isolation invariant: for every endpoint and every distinct tenant pair, returned data never contains a record belonging to another tenant. The billing invariant: a tenant's invoice total equals total recorded usage times the plan unit price, plus proration if the plan changed. And the RBAC invariant: an action succeeds only when the caller's role has the corresponding permission in the matrix, checked right at the API. These three invariants are the oracle throughout the article.",
        "このモデルから中核となる分離不変条件を導きます。すべてのエンドポイントと異なるすべてのテナントの組について、返されるデータが別テナントに属するレコードを含むことは決してありません。課金不変条件は、テナントの請求書合計が、記録された使用量総計にプランの単価を掛けたもの、プランが変わった場合は日割り分を加えたものに等しいことです。そしてRBAC不変条件は、呼び出し元の役割がマトリクス上で対応する権限を持つ場合にのみ、APIの直後で確認された上で、アクションが成功することです。これら3つの不変条件が本記事全体を貫くオラクルです。"
      ),
      NOTE(
        "Lưu tiền bằng đơn vị nguyên (cent) thay vì số thực để tránh sai số dấu phẩy động khi cộng dồn hàng nghìn dòng usage.",
        "Store money in integer units (cents) rather than floats to avoid floating-point error when summing thousands of usage rows.",
        "数千行の使用量を合計する際の浮動小数点誤差を避けるため、金額は浮動小数ではなく整数単位（セント）で保存します。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. storageState theo vai trò và tenant",
      en: "3. storageState per role and tenant",
      ja: "3. 役割とテナントごとのstorageState",
    },
    blocks: [
      P(
        "Đăng nhập lại trong từng test vừa chậm vừa dễ giòn. Playwright giải quyết bằng storageState: ta đăng nhập một lần trong bước setup, lưu cookie và token vào tệp JSON, rồi các test nạp sẵn trạng thái đó. Với hệ thống nhiều vai trò và nhiều tenant, ta tạo một ma trận storageState: admin của tenant A, member của tenant A, admin của tenant B, và người dùng billing. Nhờ đó mỗi test chỉ việc chọn đúng danh tính cần thiết mà không phải trả giá đăng nhập lặp lại.",
        "Logging in inside each test is both slow and brittle. Playwright solves this with storageState: log in once in a setup step, save cookies and tokens to a JSON file, then tests preload that state. For a system with many roles and many tenants, we build a matrix of storageStates: admin of tenant A, member of tenant A, admin of tenant B, and a billing user. Each test then simply picks the identity it needs without paying the cost of repeated logins.",
        "各テスト内でログインするのは遅く壊れやすいです。PlaywrightはstorageStateで解決します。セットアップ手順で一度ログインし、クッキーとトークンをJSONファイルに保存し、テストはその状態を事前読み込みします。多くの役割と多くのテナントを持つシステムでは、storageStateのマトリクスを構築します。テナントAの管理者、テナントAのメンバー、テナントBの管理者、そして請求ユーザーです。各テストは繰り返しログインするコストを払わずに、必要な身元を選ぶだけで済みます。"
      ),
      CODE("typescript", `// tests/auth.setup.ts — tạo storageState cho từng (vai trò, tenant).
import { test as setup } from '@playwright/test';

const identities = [
  { key: 'adminA',   email: 'admin@acme.test',   tenant: 'A', role: 'ADMIN' },
  { key: 'memberA',  email: 'member@acme.test',  tenant: 'A', role: 'MEMBER' },
  { key: 'adminB',   email: 'admin@globex.test', tenant: 'B', role: 'ADMIN' },
  { key: 'billingA', email: 'billing@acme.test', tenant: 'A', role: 'BILLING' },
];

for (const id of identities) {
  setup(\`đăng nhập \${id.key}\`, async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(id.email);
    await page.getByLabel('Mật khẩu').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await page.waitForURL('/dashboard');
    await page.context().storageState({ path: \`.auth/\${id.key}.json\` });
  });
}`),
      CODE("typescript", `// playwright.config.ts (trích) — gắn setup làm dependency, tạo project theo danh tính.
import { defineConfig } from '@playwright/test';
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\\.setup\\.ts/ },
    { name: 'adminA',  dependencies: ['setup'], use: { storageState: '.auth/adminA.json' },
      testMatch: /.*\\.admin\\.spec\\.ts/ },
    { name: 'memberA', dependencies: ['setup'], use: { storageState: '.auth/memberA.json' },
      testMatch: /.*\\.member\\.spec\\.ts/ },
    { name: 'isolation', dependencies: ['setup'], testMatch: /.*\\.isolation\\.spec\\.ts/ },
  ],
});`),
      TIP(
        "Đừng commit tệp .auth/*.json vào git — chúng chứa token phiên. Thêm vào .gitignore và tái tạo qua bước setup ở mỗi lần chạy CI.",
        "Do not commit .auth/*.json files to git — they contain session tokens. Add them to .gitignore and regenerate via the setup step on each CI run.",
        "-auth/*.json ファイルをgitにコミットしないでください。セッショントークンを含みます。.gitignoreに追加し、CI実行のたびにセットアップ手順で再生成します。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Kiểm thử cô lập tenant: chống rò rỉ chéo",
      en: "4. Testing tenant isolation: preventing cross-tenant leakage",
      ja: "4. テナント分離のテスト — 相互漏洩の防止",
    },
    blocks: [
      P(
        "Đây là loại kiểm thử phủ định quan trọng nhất của hệ đa tenant. Kịch bản: đăng nhập bằng danh tính của tenant A, rồi cố ý yêu cầu một tài nguyên có định danh thuộc tenant B. Oracle không phải là 'trang lỗi hiện ra' mà là 'hệ thống trả về 404 hoặc 403 và tuyệt đối không lộ bất kỳ trường dữ liệu nào của tenant B'. Ta cũng kiểm các endpoint liệt kê: danh sách hoá đơn của tenant A không được chứa một dòng nào của tenant B, dù cùng nằm chung bảng.",
        "This is the most important negative test in a multi-tenant system. The scenario: log in as tenant A's identity, then deliberately request a resource whose id belongs to tenant B. The oracle is not 'an error page appears' but 'the system returns 404 or 403 and absolutely no field of tenant B's data is exposed'. We also test listing endpoints: tenant A's invoice list must contain not a single row of tenant B, even though they share the same table.",
        "これはマルチテナントシステムで最も重要な否定テストです。シナリオは、テナントAの身元でログインし、意図的にIDがテナントBに属するリソースを要求することです。オラクルは「エラーページが表示される」ではなく「システムが404または403を返し、テナントBのデータのフィールドを一切露出しない」ことです。一覧エンドポイントもテストします。テナントAの請求書一覧は、同じテーブルを共有していても、テナントBの行を1つも含んではなりません。"
      ),
      CODE("typescript", `// tests/cross-tenant.isolation.spec.ts — oracle = KHÔNG rò rỉ chéo.
import { test, expect } from '@playwright/test';

test('tenant A không đọc được hoá đơn của tenant B', async ({ playwright }) => {
  // Đăng nhập bằng token của adminA (đã seed sẵn).
  const apiA = await playwright.request.newContext({
    storageState: '.auth/adminA.json',
    baseURL: process.env.SAAS_BASE_URL,
  });

  // Seed một hoá đơn cho tenant B qua endpoint quản trị test.
  const seedB = await apiA.post('/test/seed/invoice', {
    data: { idempotencyKey: 'inv-B-1', tenant: 'B', amount: 12345 },
  });
  const { invoiceId } = await seedB.json(); // id thuộc tenant B

  // Cố đọc hoá đơn của B bằng phiên của A → phải bị chặn.
  const res = await apiA.get(\`/invoices/\${invoiceId}\`);
  expect([403, 404], 'phải chặn truy cập chéo').toContain(res.status());

  // Và tuyệt đối không lộ trường dữ liệu của B.
  const text = await res.text();
  expect(text).not.toContain('12345');

  // Danh sách của A không chứa hoá đơn của B.
  const list = await (await apiA.get('/invoices')).json();
  expect(list.items.some((i: any) => i.id === invoiceId)).toBe(false);
  await apiA.dispose();
});`),
      QA(
        "Vì sao kiểm thử phủ định uỷ quyền lại quan trọng hơn kiểm thử khẳng định trong bảo mật đa tenant?",
        "Why are negative authorization tests more important than positive tests in multi-tenant security?",
        "Vì kiểm thử khẳng định chỉ chứng minh người đúng quyền làm được việc — điều mà dev thường vô tình làm đúng. Lỗ hổng bảo mật nằm ở chỗ người KHÔNG có quyền vẫn làm được, và đó chính xác là điều kiểm thử phủ định soi vào. Một hệ thống có thể vượt qua mọi test khẳng định mà vẫn rò rỉ chéo tenant vì thiếu một mệnh đề lọc. Chỉ kiểm thử phủ định — cố tình vượt rào và khẳng định bị chặn — mới phát hiện loại lỗ hổng gây thiệt hại thật.",
        "Because positive tests only prove that an authorized person can do the action — which developers usually get right by accident. Security holes lie in an unauthorized person still being able to do it, and that is exactly what negative tests probe. A system can pass every positive test yet still leak across tenants due to one missing filter clause. Only negative tests — deliberately jumping the fence and asserting it is blocked — catch the kind of hole that causes real damage.",
        "肯定テストは権限のある人がアクションを実行できることを証明するだけで、開発者は通常偶然にそれを正しく実装するからです。セキュリティの穴は、権限のない人がそれでも実行できる点にあり、まさにそれが否定テストの探る対象です。システムはすべての肯定テストに合格しながら、フィルタ句が1つ欠けているためにテナント間で漏洩する可能性があります。否定テスト、すなわち意図的に柵を越えて遮断されることをアサートするテストだけが、実害を招く種類の穴を検出します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. RBAC: thực thi ma trận quyền ở tầng API",
      en: "5. RBAC: enforcing the permission matrix at the API tier",
      ja: "5. RBAC — API層での権限マトリクスの実施",
    },
    blocks: [
      P(
        "Ma trận RBAC liệt kê từng hành động và từng vai trò được phép hay bị cấm. Mỗi ô của ma trận là một ca kiểm thử; đặc biệt các ô cấm mới là nơi lộ lỗ hổng. Ta mã hoá ma trận thành dữ liệu và sinh test theo kiểu data-driven: với mỗi cặp vai trò-hành động, gọi endpoint bằng storageState tương ứng và khẳng định mã trạng thái đúng — thành công cho ô cho phép, 403 cho ô cấm. Cách này đảm bảo không sót ô nào và dễ mở rộng khi thêm vai trò hay hành động mới.",
        "The RBAC matrix lists each action and whether each role is allowed or denied. Each cell is a test case; the deny cells especially are where holes surface. We encode the matrix as data and generate tests data-driven style: for each role-action pair, call the endpoint with the corresponding storageState and assert the correct status — success for an allow cell, 403 for a deny cell. This ensures no cell is missed and scales easily when new roles or actions are added.",
        "RBACマトリクスは各アクションと、各役割が許可されるか拒否されるかを列挙します。各セルがテストケースであり、特に拒否セルこそが穴の現れる箇所です。マトリクスをデータとして符号化し、データ駆動方式でテストを生成します。各役割とアクションの組について、対応するstorageStateでエンドポイントを呼び出し、正しいステータスをアサートします。許可セルには成功、拒否セルには403です。これによりセルの見落としがなくなり、新しい役割やアクションを追加しても容易に拡張できます。"
      ),
      imgB2,
      CODE("typescript", `// tests/rbac.matrix.spec.ts — data-driven từ ma trận quyền.
import { test, expect } from '@playwright/test';

type Action = { name: string; method: 'GET'|'POST'; path: string };
const actions: Action[] = [
  { name: 'view_invoice',  method: 'GET',  path: '/invoices' },
  { name: 'change_plan',   method: 'POST', path: '/billing/plan' },
  { name: 'invite_member', method: 'POST', path: '/members/invite' },
  { name: 'update_card',   method: 'POST', path: '/billing/card' },
];
// true = được phép; giá trị này là ORACLE, khớp ma trận nghiệp vụ.
const allow: Record<string, Record<string, boolean>> = {
  ADMIN:   { view_invoice: true,  change_plan: true,  invite_member: true,  update_card: false },
  MEMBER:  { view_invoice: false, change_plan: false, invite_member: false, update_card: false },
  BILLING: { view_invoice: true,  change_plan: false, invite_member: false, update_card: true  },
};
const authFile = { ADMIN: '.auth/adminA.json', MEMBER: '.auth/memberA.json', BILLING: '.auth/billingA.json' };

for (const role of ['ADMIN','MEMBER','BILLING'] as const) {
  for (const a of actions) {
    test(\`RBAC \${role} × \${a.name}\`, async ({ playwright }) => {
      const api = await playwright.request.newContext({
        storageState: authFile[role], baseURL: process.env.SAAS_BASE_URL,
      });
      const res = a.method === 'GET'
        ? await api.get(a.path)
        : await api.post(a.path, { data: { probe: true } });
      if (allow[role][a.name]) {
        expect(res.status(), 'được phép → không 403').not.toBe(403);
      } else {
        expect(res.status(), 'bị cấm → phải 403').toBe(403);
      }
      await api.dispose();
    });
  }
}`),
      WARN(
        "Đừng chỉ kiểm ô cho phép rồi kết luận RBAC đúng. Một endpoint quên kiểm quyền vẫn vượt mọi test khẳng định; chỉ ô cấm trả về 403 mới chứng minh hàng rào thật sự tồn tại.",
        "Do not check only the allow cells and conclude RBAC is correct. An endpoint that forgot to check permission still passes every positive test; only a deny cell returning 403 proves the fence truly exists.",
        "許可セルだけを確認してRBACが正しいと結論づけないでください。権限確認を忘れたエンドポイントもすべての肯定テストに合格します。拒否セルが403を返して初めて、柵が本当に存在することが証明されます。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Billing theo usage: seed dữ liệu và oracle hoá đơn",
      en: "6. Usage-based billing: seeding data and the invoice oracle",
      ja: "6. 従量課金 — データのseedと請求書オラクル",
    },
    blocks: [
      P(
        "Hoá đơn theo usage là chuỗi tính toán dễ sai vì phải cộng dồn nhiều dòng usage rồi áp bậc giá. Chiến lược là seed usage qua API để kiểm soát chính xác đầu vào, rồi khẳng định hoá đơn bằng một oracle tính lại độc lập. Oracle này mã hoá đúng bảng giá nghiệp vụ: bậc miễn phí, đơn giá vượt bậc, và trần nếu có. Vì đầu vào do ta seed nên đáp án đúng là xác định trước, không phụ thuộc code sản phẩm. Đây là điều làm test đáng tin: khi hoá đơn lệch dù một xu, test đỏ ngay.",
        "A usage-based invoice is an error-prone computation chain because it sums many usage rows then applies price tiers. The strategy is to seed usage via API for precise input control, then assert the invoice with an independently recomputed oracle. This oracle encodes the exact business price sheet: the free tier, the over-tier unit price, and a cap if any. Because we seed the input, the correct answer is predetermined, independent of product code. This is what makes the test trustworthy: if the invoice is off by even a cent, the test goes red immediately.",
        "従量課金の請求書は、多くの使用量行を合計してから料金段階を適用するため誤りやすい計算連鎖です。戦略は、入力を正確に制御するためAPI経由で使用量をseedし、独立して再計算したオラクルで請求書をアサートすることです。このオラクルは正確な業務料金表、すなわち無料枠・超過分の単価・上限があればそれを符号化します。入力をseedするため正解は事前に決まっており、製品コードに依存しません。これがテストを信頼できるものにします。請求書が1円でもずれれば、テストは即座に赤になります。"
      ),
      CODE("typescript", `// tests/usage-billing.api.spec.ts — seed usage, oracle tính lại hoá đơn.
import { test, expect } from '@playwright/test';

// Bảng giá ĐÃ DUYỆT (nguồn oracle) — đơn vị cent.
const PRICE = {
  api_calls: { free: 10_000, unit: 2 },   // 2 cent mỗi call vượt 10k
  storage_gb: { free: 5,     unit: 500 }, // 500 cent mỗi GB vượt 5
};
function oracleInvoice(usage: { api_calls: number; storage_gb: number }) {
  const over = (q: number, free: number) => Math.max(0, q - free);
  return over(usage.api_calls, PRICE.api_calls.free) * PRICE.api_calls.unit
       + over(usage.storage_gb, PRICE.storage_gb.free) * PRICE.storage_gb.unit;
}

const cases = [
  { api_calls: 5_000,  storage_gb: 3 },  // dưới bậc miễn phí cả hai → 0
  { api_calls: 12_000, storage_gb: 8 },  // vượt cả hai → tính vượt bậc
];

for (const u of cases) {
  test(\`hoá đơn usage api=\${u.api_calls} storage=\${u.storage_gb}\`, async ({ request }) => {
    await request.post('/test/seed/usage', {
      data: { idempotencyKey: \`u-\${u.api_calls}-\${u.storage_gb}\`, tenant: 'A', usage: u },
    });
    const inv = await (await request.post('/billing/close-period', {
      data: { tenant: 'A' },
    })).json();
    expect(inv.amount, 'hoá đơn phải khớp oracle đến từng cent')
      .toBe(oracleInvoice(u));
  });
}`),
      NOTE(
        "Seed usage qua API cho phép kiểm soát tuyệt đối đầu vào và chạy nhanh, tách biệt với việc kiểm thử cơ chế ghi nhận usage (đã có test riêng ở tầng thu thập).",
        "Seeding usage via API gives absolute input control and speed, separate from testing the usage-recording mechanism itself (which has its own tests at the collection tier).",
        "API経由で使用量をseedすると、入力を絶対的に制御でき高速です。使用量記録の仕組み自体のテスト（収集層に別途あります）とは分離されます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Proration: nâng/hạ gói giữa kỳ",
      en: "7. Proration: mid-cycle upgrades and downgrades",
      ja: "7. 日割り計算 — 期中のアップ／ダウングレード",
    },
    blocks: [
      P(
        "Proration là nơi khách hàng hay khiếu nại nhất và cũng là nơi tính sai âm thầm. Khi tenant nâng gói giữa kỳ, họ phải trả phần chênh cho những ngày còn lại của kỳ, không phải trọn kỳ. Khi hạ gói, họ được ghi có phần chưa dùng. Oracle proration tính theo tỉ lệ ngày: phần chênh nhân số ngày còn lại chia tổng số ngày trong kỳ. Ta phải kiểm các biên: đổi gói đúng ngày đầu kỳ (không proration), đúng ngày cuối kỳ, và ngày giữa với số ngày lẻ để lộ lỗi làm tròn.",
        "Proration is where customers complain most and also where miscomputation hides silently. When a tenant upgrades mid-cycle, they pay the difference for the remaining days of the cycle, not the whole cycle. When they downgrade, they are credited the unused portion. The proration oracle computes by day ratio: the price difference times remaining days divided by total days in the cycle. We must test the boundaries: changing on the first day (no proration), on the last day, and on a mid-day with an odd number of days to surface rounding bugs.",
        "日割り計算は顧客の苦情が最も多く、計算誤りが静かに潜む箇所でもあります。テナントが期中にアップグレードすると、期全体ではなく期の残り日数分の差額を支払います。ダウングレードすると未使用分が貸方計上されます。日割りオラクルは日数比で計算します。価格差に残り日数を掛け、期の総日数で割ります。境界をテストしなければなりません。期初日の変更（日割りなし）、期末日、そして丸め不具合を露出させるために奇数日数の期中日です。"
      ),
      CODE("typescript", `// tests/proration.api.spec.ts — oracle tính theo tỉ lệ ngày còn lại.
import { test, expect } from '@playwright/test';

// Oracle: chênh giá * ngày còn lại / tổng ngày, làm tròn về cent.
function oracleProration(fromCents: number, toCents: number,
                         dayOfChange: number, daysInPeriod: number) {
  const remaining = daysInPeriod - dayOfChange; // ngày còn lại sau khi đổi
  const diff = toCents - fromCents;
  return Math.round(diff * remaining / daysInPeriod);
}

const cases = [
  { day: 0,  desc: 'đầu kỳ → tính trọn phần chênh' },
  { day: 15, desc: 'giữa kỳ 30 ngày → nửa phần chênh' },
  { day: 30, desc: 'cuối kỳ → gần như không chênh' },
];

for (const c of cases) {
  test(\`proration \${c.desc}\`, async ({ request }) => {
    const from = 2000, to = 5000, days = 30; // PRO→ENTERPRISE
    const res = await (await request.post('/billing/change-plan', {
      data: { tenant: 'A', from: 'PRO', to: 'ENTERPRISE',
              dayOfChange: c.day, daysInPeriod: days },
    })).json();
    expect(res.prorationCents, 'proration phải khớp oracle')
      .toBe(oracleProration(from, to, c.day, days));
  });
}`),
      SCEN(
        "Thực chiến: khách phàn nàn bị tính thừa khi nâng gói",
        "Real-world: a customer complains of overcharge on upgrade",
        "Một khách nâng từ PRO lên ENTERPRISE vào ngày hai mươi tám của kỳ ba mươi ngày và bị tính trọn phần chênh thay vì chỉ hai ngày còn lại. Điều tra cho thấy code proration dùng ngày đã dùng thay vì ngày còn lại — lỗi đảo biến. Test cũ chỉ kiểm ca đổi gói giữa kỳ nên số ra gần đúng và không ai để ý. Sau sự cố, đội thêm ba ca biên: đầu kỳ, cuối kỳ và một ngày lẻ. Ca cuối kỳ ngay lập tức bắt đúng lỗi đảo biến vì kết quả lệch rõ rệt.",
        "A customer upgrades from PRO to ENTERPRISE on day twenty-eight of a thirty-day cycle and is charged the full difference instead of just the two remaining days. Investigation shows the proration code used days-elapsed instead of days-remaining — a swapped-variable bug. The old test only checked a mid-cycle change so the number came out close and nobody noticed. After the incident, the team added three boundary cases: start, end and an odd day. The end-of-cycle case immediately caught the swap because the result was clearly off.",
        "ある顧客が30日周期の28日目にPROからENTERPRISEにアップグレードし、残り2日分だけでなく差額全体を請求されました。調査の結果、日割りコードが残り日数ではなく経過日数を使っていた、変数の取り違え不具合でした。旧テストは期中の変更しか確認しなかったため数値が近く、誰も気づきませんでした。インシデント後、チームは3つの境界ケースを追加しました。期初・期末・奇数日です。期末のケースは結果が明らかにずれたため、取り違えを即座に検出しました。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Dunning: quy trình đòi nợ khi thanh toán thất bại",
      en: "8. Dunning: the retry-and-collect process on failed payment",
      ja: "8. 督促 — 支払失敗時の再試行・回収プロセス",
    },
    blocks: [
      P(
        "Dunning là chuỗi hành động khi thanh toán tự động thất bại: thử lại theo lịch, gửi email nhắc, và cuối cùng hạn chế hoặc khoá tính năng nếu vẫn không trả. Rủi ro kép ở đây: khoá nhầm khách đang trả tiền đầy đủ làm mất doanh thu và uy tín, còn không khoá khách thật sự nợ làm thất thoát. Oracle dunning là một máy trạng thái: từ OPEN sang PAST_DUE sau lần thử thất bại đầu, qua các mốc nhắc, và chỉ khoá sau đúng số lần thử đã định. Ta kiểm cả nhánh phục hồi: nếu trả được giữa chừng, trạng thái quay về PAID và không còn khoá.",
        "Dunning is the chain of actions when automatic payment fails: retry on schedule, send reminder emails, and finally restrict or lock features if still unpaid. The double risk here: wrongly locking a fully-paying customer loses revenue and trust, while not locking a genuine debtor leaks money. The dunning oracle is a state machine: from OPEN to PAST_DUE after the first failed attempt, through reminder milestones, and locking only after exactly the defined number of attempts. We also test the recovery branch: if payment succeeds midway, the state returns to PAID and no lock remains.",
        "督促は自動支払が失敗したときの一連のアクションです。予定に沿った再試行、リマインダーメールの送信、そして依然未払いなら機能の制限またはロックです。ここには二重のリスクがあります。全額支払っている顧客を誤ってロックすると収益と信頼を失い、真の債務者をロックしないと資金が流出します。督促オラクルは状態機械です。最初の失敗後にOPENからPAST_DUEへ、リマインダーの節目を経て、定められた試行回数のちょうど後にのみロックします。回復の分岐もテストします。途中で支払が成功すればPAIDに戻り、ロックは残りません。"
      ),
      CODE("typescript", `// tests/dunning.api.spec.ts — máy trạng thái đòi nợ, oracle = trạng thái đúng.
import { test, expect } from '@playwright/test';

test('dunning: khoá sau đúng 3 lần thử thất bại, phục hồi khi trả', async ({ request }) => {
  await request.post('/test/seed/invoice', {
    data: { idempotencyKey: 'dun-1', tenant: 'A', amount: 5000, status: 'OPEN' },
  });

  const fail = () => request.post('/billing/charge', {
    data: { tenant: 'A', simulate: 'card_declined' },
  });
  const status = async () =>
    (await (await request.get('/billing/status?tenant=A')).json()).status;

  await fail(); expect(await status()).toBe('PAST_DUE');   // sau lần 1
  await fail(); expect(await status()).toBe('PAST_DUE');   // vẫn nhắc, chưa khoá
  await fail();                                            // lần 3
  const locked = await (await request.get('/billing/status?tenant=A')).json();
  expect(locked.status).toBe('PAST_DUE');
  expect(locked.locked, 'khoá sau đúng 3 lần').toBe(true);

  // Phục hồi: trả thành công → PAID, mở khoá.
  await request.post('/billing/charge', { data: { tenant: 'A', simulate: 'success' } });
  const paid = await (await request.get('/billing/status?tenant=A')).json();
  expect(paid.status).toBe('PAID');
  expect(paid.locked, 'trả xong phải mở khoá').toBe(false);
});`),
      TIP(
        "Mô phỏng kết quả cổng thanh toán bằng cờ simulate ở môi trường test, thay vì gọi cổng thật. Vừa nhanh, vừa tất định, vừa không tốn phí giao dịch.",
        "Simulate payment-gateway outcomes with a simulate flag in the test environment instead of calling the real gateway. It's fast, deterministic and incurs no transaction fees.",
        "テスト環境では実際のゲートウェイを呼ぶ代わりにsimulateフラグで決済ゲートウェイの結果を模擬します。高速で決定的、取引手数料もかかりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ca thất bại sâu: idempotency của việc xuất hoá đơn",
      en: "9. Deep failure case: idempotency of invoice generation",
      ja: "9. 深い失敗ケース — 請求書生成の冪等性",
    },
    blocks: [
      P(
        "Việc chốt kỳ và xuất hoá đơn thường được kích hoạt bởi một job định kỳ, và job có thể chạy lại do retry hạ tầng. Nếu xuất hoá đơn không idempotent, một tenant có thể nhận hai hoá đơn cho cùng một kỳ và bị tính tiền đôi. Oracle ở đây rất rõ: gọi chốt kỳ nhiều lần với cùng khoá kỳ chỉ được tạo đúng một hoá đơn, và tổng tiền phải trả không đổi. Ta ép cạnh tranh bằng cách gọi song song, mô phỏng đúng tình huống hai worker cùng nhặt một job.",
        "Closing a period and generating an invoice is usually triggered by a scheduled job, and the job may rerun due to infrastructure retries. If invoice generation is not idempotent, a tenant may receive two invoices for the same period and be double-charged. The oracle here is crystal clear: calling period-close multiple times with the same period key must create exactly one invoice, and the total owed is unchanged. We force a race by calling in parallel, faithfully simulating two workers picking up the same job.",
        "期の締めと請求書生成は通常、定期ジョブによって起動され、インフラの再試行でジョブが再実行されることがあります。請求書生成が冪等でなければ、テナントが同一期に対して2つの請求書を受け取り、二重請求される可能性があります。ここでのオラクルは極めて明快です。同じ期キーで締めを複数回呼び出しても、ちょうど1つの請求書だけが作成され、請求総額は変わりません。並列に呼び出して競合を強制し、2つのワーカーが同じジョブを拾う状況を忠実に模擬します。"
      ),
      CODE("typescript", `// tests/invoice-idempotency.api.spec.ts — chốt kỳ lặp → đúng 1 hoá đơn.
import { test, expect } from '@playwright/test';

test('chốt kỳ lặp với cùng periodKey chỉ tạo một hoá đơn', async ({ request }) => {
  await request.post('/test/seed/usage', {
    data: { idempotencyKey: 'u-idem', tenant: 'A',
            usage: { api_calls: 12_000, storage_gb: 8 } },
  });

  const periodKey = '2026-06';
  const close = () => request.post('/billing/close-period', {
    data: { tenant: 'A', periodKey },
  });

  // Hai worker cùng nhặt job → gọi song song.
  const [r1, r2] = await Promise.all([close(), close()]);
  expect(r1.ok() && r2.ok()).toBeTruthy();

  // ORACLE: đúng MỘT hoá đơn cho kỳ này.
  const invoices = await (await request.get('/invoices?tenant=A&period=2026-06')).json();
  expect(invoices.items.length, 'chỉ một hoá đơn cho một kỳ').toBe(1);
});`),
      QA(
        "Làm sao phân biệt idempotency thật với việc chỉ may mắn không trùng?",
        "How do you tell true idempotency from merely getting lucky with no collision?",
        "Bằng cách ép cạnh tranh thật sự. Nếu gọi tuần tự, lần hai có thể thấy hoá đơn lần một đã tồn tại và bỏ qua — điều đó chưa chứng minh idempotent dưới tải. Gọi song song bằng Promise.all buộc hai luồng cùng chạy trước khi bản ghi kịp ghi, làm lộ điều kiện tranh chấp. Idempotency thật phải dựa trên một khoá duy nhất ở tầng lưu trữ (unique constraint theo tenant và kỳ) để cơ sở dữ liệu tự chối bản thứ hai, chứ không dựa vào kiểm tra tồn tại rồi mới ghi.",
        "By forcing a genuine race. If you call sequentially, the second call may see the first invoice already exists and skip — that does not prove idempotency under load. Calling in parallel with Promise.all forces both threads to run before the record is written, exposing the race condition. True idempotency must rest on a unique key at the storage tier (a unique constraint on tenant and period) so the database itself rejects the second row, not on a check-then-write.",
        "本物の競合を強制することによってです。逐次呼び出すと、2回目の呼び出しは1回目の請求書がすでに存在するのを見てスキップするかもしれませんが、それは負荷下での冪等性を証明しません。Promise.allで並列に呼び出すと、レコードが書き込まれる前に両スレッドが走ることを強制し、競合状態を露出させます。本物の冪等性は、ストレージ層の一意キー（テナントと期に対する一意制約）に基づき、データベース自身が2行目を拒否しなければならず、存在確認してから書き込む方式に頼ってはなりません。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Kiểm thử passkey và storage với API mới nhất của Playwright",
      en: "10. Testing passkeys and storage with Playwright's latest APIs",
      ja: "10. Playwrightの最新APIによるパスキーとストレージのテスト",
    },
    blocks: [
      P(
        "Nhiều SaaS đang chuyển sang đăng nhập không mật khẩu bằng passkey. Playwright bản mới nhất hỗ trợ WebAuthn virtual authenticator, cho phép kiểm thử luồng passkey mà không cần thiết bị vật lý. Ngoài ra API Web Storage trực tiếp giúp kiểm và thao tác localStorage gọn gàng, hữu ích khi ứng dụng lưu ngữ cảnh tenant ở phía trình duyệt. Với hệ đa tenant, ta cần chắc chắn rằng đổi tenant không để sót dữ liệu tenant cũ trong localStorage — một dạng rò rỉ tinh vi thường bị bỏ qua.",
        "Many SaaS products are moving to passwordless login via passkeys. Playwright's latest release supports a WebAuthn virtual authenticator, letting us test the passkey flow without a physical device. It also exposes a direct Web Storage API for neatly inspecting and manipulating localStorage, handy when the app stores tenant context on the browser side. In a multi-tenant system, we must ensure switching tenant leaves no old-tenant data in localStorage — a subtle leak often overlooked.",
        "多くのSaaS製品がパスキーによるパスワードレスログインへ移行しています。Playwrightの最新リリースはWebAuthn仮想認証器をサポートし、物理デバイスなしでパスキーフローをテストできます。またWeb Storage APIを直接公開し、localStorageの検査と操作を簡潔に行えます。アプリがテナントコンテキストをブラウザ側に保存する場合に便利です。マルチテナントシステムでは、テナント切り替え時にlocalStorageに旧テナントのデータが残らないことを確認しなければなりません。見落とされがちな微妙な漏洩です。"
      ),
      CODE("typescript", `// tests/passkey-tenant.e2e.spec.ts — WebAuthn ảo + kiểm localStorage sạch.
import { test, expect } from '@playwright/test';

test('đăng nhập passkey và không sót ngữ cảnh tenant cũ', async ({ page, context }) => {
  // v1.61: WebAuthn virtual authenticator cho passkey (không cần thiết bị thật).
  const client = await context.newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true, isUserVerified: true },
  });

  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();
  await page.waitForURL('/dashboard');

  // API Web Storage trực tiếp: ngữ cảnh tenant hiện tại phải là A.
  const tenantCtx = await page.evaluate(() => localStorage.getItem('tenant'));
  expect(tenantCtx).toBe('A');

  // Đăng xuất rồi vào tenant khác → không được sót dữ liệu tenant A.
  await page.getByRole('button', { name: 'Đăng xuất' }).click();
  const leftover = await page.evaluate(() => localStorage.getItem('tenant'));
  expect(leftover, 'localStorage phải sạch ngữ cảnh tenant cũ').toBeNull();
});`),
      NOTE(
        "WebAuthn virtual authenticator và API Web Storage trực tiếp là tính năng của Playwright bản mới (v1.61). Chúng giúp kiểm thử luồng passkey và dọn ngữ cảnh mà trước đây rất khó tự động hoá.",
        "The WebAuthn virtual authenticator and direct Web Storage API are features of a recent Playwright release (v1.61). They enable testing passkey flows and context cleanup that used to be very hard to automate.",
        "WebAuthn仮想認証器とWeb Storage APIの直接公開は、最近のPlaywrightリリース（v1.61）の機能です。以前は自動化が非常に困難だったパスキーフローとコンテキストの後始末のテストを可能にします。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Tích hợp CI: chạy song song theo tenant và cổng bảo mật",
      en: "11. CI integration: per-tenant parallelism and a security gate",
      ja: "11. CI統合 — テナント別の並列化とセキュリティゲート",
    },
    blocks: [
      P(
        "Vì mỗi test tự cô lập dữ liệu theo tenant và dùng storageState riêng, cả bộ có thể chạy song song mà không giẫm chân nhau. Trong CI, ta cho fullyParallel và sharding để rút ngắn thời gian, đồng thời đặt một cổng bảo mật riêng: nếu bất kỳ ca cô lập tenant hay ca RBAC phủ định nào đỏ, gộp code bị chặn ngay, không thương lượng. Rò rỉ dữ liệu và vượt quyền là loại lỗi không được phép lọt ra sản phẩm dù chỉ một lần, nên cổng này phải nghiêm ngặt hơn cổng chức năng thông thường.",
        "Because each test isolates its data by tenant and uses its own storageState, the whole suite can run in parallel without stepping on each other. In CI we enable fullyParallel and sharding to cut time, and set a separate security gate: if any tenant-isolation or negative-RBAC case is red, the merge is blocked immediately, non-negotiable. Data leakage and privilege escalation are bugs that must not ship even once, so this gate must be stricter than the ordinary functional gate.",
        "各テストはテナントごとにデータを分離し独自のstorageStateを使うため、スイート全体が互いに干渉せず並列実行できます。CIではfullyParallelとシャーディングを有効にして時間を短縮し、別個のセキュリティゲートを設定します。テナント分離または否定的RBACのケースが1つでも赤なら、マージは即座に、交渉の余地なく遮断されます。データ漏洩と権限昇格は一度たりとも出荷してはならない不具合なので、このゲートは通常の機能ゲートより厳格でなければなりません。"
      ),
      CODE("yaml", `# .github/workflows/saas-ci.yml — shard song song + cổng bảo mật.
name: saas-ci
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
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
        env:
          SAAS_BASE_URL: \${{ secrets.STAGING_URL }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}
  security-gate:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Chặn gộp nếu có ca cô lập/RBAC phủ định đỏ.
      - run: node scripts/assert-no-security-fail.mjs results/junit.xml`),
      TIP(
        "Gắn nhãn @security cho các ca cô lập tenant và RBAC phủ định. Cổng bảo mật lọc theo nhãn để chặn gộp riêng nhóm này, tách khỏi lỗi chức năng thông thường.",
        "Tag tenant-isolation and negative-RBAC cases with @security. The security gate filters by tag to block merges specifically for this group, separate from ordinary functional failures.",
        "テナント分離と否定的RBACのケースに@securityタグを付けます。セキュリティゲートはタグでフィルタし、通常の機能不具合とは別にこのグループのマージを遮断します。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới AI-agent trong kiểm thử bảo mật SaaS",
      en: "12. The AI-agent boundary in SaaS security testing",
      ja: "12. SaaSセキュリティテストにおけるAIエージェントの境界",
    },
    blocks: [
      P(
        "Playwright Agents có thể tăng tốc đáng kể phần khám phá: Planner dò các luồng của ứng dụng SaaS và đề xuất kế hoạch, Generator dựng khung test và xác minh locator, Healer sửa test gãy do đổi giao diện. Nhưng với ma trận RBAC và bất biến cô lập tenant, chính con người phải định nghĩa oracle: ai được làm gì, dữ liệu nào không được lộ. Đặc biệt các ca phủ định — cố tình vượt quyền và khẳng định bị chặn — phải do kỹ sư bảo mật thiết kế, vì AI dễ bỏ sót đúng những đường tấn công tinh vi mà nó chưa từng thấy.",
        "Playwright Agents can significantly speed up exploration: the Planner probes the SaaS app's flows and proposes a plan, the Generator scaffolds tests and verifies locators, the Healer fixes tests broken by UI changes. But for the RBAC matrix and tenant-isolation invariants, humans must define the oracle: who may do what, which data must not be exposed. The negative cases especially — deliberately escalating privilege and asserting the block — must be designed by security engineers, because AI easily misses exactly the subtle attack paths it has never seen.",
        "Playwrightエージェントは探索を大幅に高速化できます。PlannerはSaaSアプリのフローを探って計画を提案し、Generatorはテストの雛形を作りロケーターを検証し、HealerはUI変更で壊れたテストを修正します。しかしRBACマトリクスとテナント分離不変条件については、人間がオラクルを定義しなければなりません。誰が何をしてよいか、どのデータを露出してはならないかです。特に否定ケース、すなわち意図的に権限を昇格させ遮断をアサートするケースは、セキュリティエンジニアが設計しなければなりません。AIは、まさに見たことのない微妙な攻撃経路を見落としやすいからです。"
      ),
      UL(
        [
          "Cho phép AI: khám phá luồng SaaS, dựng khung test chức năng, xác minh locator, self-heal khi UI đổi.",
          "KHÔNG giao cho AI: định nghĩa ma trận RBAC và bất biến cô lập — đó là quyết định bảo mật của con người.",
          "Kiểm thử phủ định vượt quyền phải do kỹ sư bảo mật thiết kế và review kỹ.",
          "Grounding: cấp cho agent sơ đồ tenant và ma trận quyền để giảm hallucination về mô hình bảo mật.",
        ],
        [
          "Allow AI to: explore SaaS flows, scaffold functional tests, verify locators, self-heal on UI change.",
          "Do NOT delegate to AI: defining the RBAC matrix and isolation invariants — that is a human security decision.",
          "Privilege-escalation negative tests must be designed and carefully reviewed by security engineers.",
          "Grounding: give the agent the tenant diagram and permission matrix to reduce hallucination about the security model.",
        ],
        [
          "AIに許すこと: SaaSフローの探索、機能テストの雛形作成、ロケーターの検証、UI変更時の自己修復。",
          "AIに委ねないこと: RBACマトリクスと分離不変条件の定義。これは人間のセキュリティ上の決定です。",
          "権限昇格の否定テストは、セキュリティエンジニアが設計し慎重にレビューしなければなりません。",
          "グラウンディング: セキュリティモデルに関するハルシネーションを減らすため、エージェントにテナント図と権限マトリクスを与えること。",
        ]
      ),
      SCEN(
        "Thực chiến: khi agent đề xuất test bỏ qua kiểm phủ định",
        "Real-world: when the agent proposes a test that skips negative checks",
        "Generator sinh một bộ test RBAC nhưng chỉ phủ các ô cho phép vì đó là đường đi tự nhiên khi khám phá ứng dụng — người dùng thật hiếm khi tự bấm vào nút họ không có quyền. Kỹ sư bảo mật review và nhận ra thiếu toàn bộ ô cấm, tức thiếu chính phần chứng minh hàng rào tồn tại. Họ bổ sung ma trận đầy đủ với các ca 403. Bài học: AI phản ánh hành vi người dùng bình thường, còn bảo mật phải nghĩ như kẻ tấn công — khoảng trống đó luôn cần con người lấp.",
        "The Generator produces an RBAC test set but only covers the allow cells because that is the natural path when exploring the app — real users rarely click a button they lack permission for. The security engineer reviews and realizes all deny cells are missing, i.e. exactly the part that proves the fence exists. They add the full matrix with 403 cases. Lesson: AI mirrors normal user behavior, while security must think like an attacker — that gap always needs a human to fill.",
        "GeneratorはRBACテストセットを生成しますが、許可セルしか網羅しません。それがアプリを探索するときの自然な経路だからです。実際のユーザーは権限のないボタンをめったに押しません。セキュリティエンジニアがレビューし、すべての拒否セル、すなわち柵が存在することを証明するまさにその部分が欠けていることに気づきます。403ケースを含む完全なマトリクスを追加します。教訓: AIは通常のユーザー行動を映し、セキュリティは攻撃者のように考えなければなりません。その隙間は常に人間が埋める必要があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn và tổng kết",
      en: "13. Interview angle and wrap-up",
      ja: "13. 面接の視点とまとめ",
    },
    blocks: [
      P(
        "Chủ đề SaaS đa tenant là mảnh đất phỏng vấn giàu vì nó chạm cả bảo mật, tính tiền và kiến trúc. Người phỏng vấn muốn thấy bạn phân biệt được rõ ba trụ cột và chọn đúng kỹ thuật cho mỗi trụ: storageState và test phủ định cho RBAC, seed API cộng oracle độc lập cho billing, và tư duy kẻ tấn công cho cô lập tenant. Nếu bạn giải thích được vì sao ẩn nút không phải phân quyền, vì sao phải ép cạnh tranh để chứng minh idempotency, bạn cho thấy chiều sâu vượt xa mức bấm nút giao diện.",
        "The multi-tenant SaaS topic is rich interview ground because it touches security, billing and architecture at once. Interviewers want to see you clearly distinguish the three pillars and pick the right technique for each: storageState and negative tests for RBAC, API seed plus an independent oracle for billing, and attacker mindset for tenant isolation. If you can explain why hiding a button is not authorization, why you must force a race to prove idempotency, you show depth far beyond UI button-clicking.",
        "マルチテナントSaaSというテーマは、セキュリティ・課金・アーキテクチャに同時に触れるため、面接の題材として豊かです。面接官は、あなたが3つの柱を明確に区別し、それぞれに正しい手法を選ぶことを見たいのです。RBACにはstorageStateと否定テスト、課金にはAPI seedと独立オラクル、テナント分離には攻撃者の思考です。なぜボタンを隠すことが認可でないのか、なぜ冪等性を証明するために競合を強制しなければならないのかを説明できれば、UIのボタン押しをはるかに超えた深さを示せます。"
      ),
      QA(
        "Bạn kiểm thử cô lập tenant thế nào nếu chỉ có tài khoản của một tenant?",
        "How would you test tenant isolation if you only have one tenant's account?",
        "Tôi tạo thêm một tenant thứ hai qua endpoint seed dành cho môi trường test, hoặc yêu cầu quyền tạo tenant tạm. Chỉ với một tenant thì không thể kiểm rò rỉ chéo — cần ít nhất hai để một bên cố đọc dữ liệu bên kia. Nếu không thể tạo, tôi kiểm gián tiếp bằng cách gọi endpoint với định danh tài nguyên không tồn tại trong tenant hiện tại và khẳng định trả về 404 chứ không phải 200 rỗng, đồng thời soi kỹ mọi endpoint liệt kê xem có mệnh đề lọc tenant ở tầng dữ liệu.",
        "I create a second tenant via a test-environment seed endpoint, or request permission to spin up a temporary tenant. With only one tenant you cannot test cross-leakage — you need at least two so one side tries to read the other's data. If creation is impossible, I test indirectly by calling endpoints with a resource id not present in the current tenant and asserting a 404 rather than an empty 200, and I scrutinize every listing endpoint for a tenant filter clause at the data tier.",
        "テスト環境用のseedエンドポイントで2番目のテナントを作成するか、一時テナントを立てる権限を要求します。テナントが1つだけでは相互漏洩をテストできません。一方が他方のデータを読もうとするには少なくとも2つ必要です。作成が不可能なら、現在のテナントに存在しないリソースIDでエンドポイントを呼び、空の200ではなく404が返ることをアサートして間接的にテストし、すべての一覧エンドポイントにデータ層でのテナントフィルタ句があるか精査します。"
      ),
      QA(
        "Nếu hoá đơn lệch một xu so với oracle, bạn coi đó là lỗi hay dung sai?",
        "If an invoice is off by one cent from the oracle, do you treat it as a bug or tolerance?",
        "Tôi coi đó là lỗi cần điều tra, không phải dung sai. Một xu lệch thường là dấu hiệu của sai thứ tự làm tròn hoặc dùng số thực thay vì số nguyên, và khi nhân lên hàng nghìn tenant qua nhiều kỳ, sai lệch tích luỹ có thể lớn và gây tranh chấp pháp lý. Cách đúng là lưu tiền bằng cent nguyên, làm tròn đúng một lần ở bước cuối theo quy ước nghiệp vụ, và để oracle dùng cùng quy ước. Nếu vẫn lệch, đó là hồi quy thật cần sửa gốc chứ không phải nới ngưỡng so sánh.",
        "I treat it as a bug to investigate, not tolerance. A one-cent gap usually signals a wrong rounding order or using floats instead of integers, and multiplied across thousands of tenants over many periods, the accumulated drift can be large and legally contentious. The right approach is to store money as integer cents, round exactly once at the final step per business convention, and have the oracle use the same convention. If it still differs, that is a genuine regression needing a root fix, not a loosened comparison threshold.",
        "私はそれを許容誤差ではなく調査すべき不具合として扱います。1セントのずれは通常、丸めの順序の誤りや整数ではなく浮動小数を使っていることの兆候であり、数千のテナントに多くの期にわたって掛け合わされると、累積したずれは大きくなり法的に争われかねません。正しい方法は金額を整数のセントで保存し、業務慣行に従って最終段階でちょうど一度だけ丸め、オラクルも同じ慣行を使うことです。それでもずれるなら、それは比較の閾値を緩めるのではなく根本修正が必要な本物の回帰です。"
      ),
      P(
        "Tổng kết, kiểm thử SaaS đa tenant xoay quanh ba oracle: cô lập dữ liệu, đúng tiền theo usage, và RBAC được thực thi ở API. Ta dùng storageState theo vai trò và tenant để đăng nhập sẵn, seed dữ liệu qua API để kiểm soát đầu vào, và đặt kiểm thử phủ định làm trung tâm vì đó là nơi lộ lỗ hổng thật. Kết hợp với sharding song song và một cổng bảo mật nghiêm ngặt, ta có bộ khung bảo vệ đồng thời niềm tin của khách và doanh thu của công ty. AI-agent tăng tốc phần cơ khí, nhưng oracle bảo mật và tiền luôn thuộc về con người.",
        "In summary, multi-tenant SaaS testing revolves around three oracles: data isolation, correct usage-based money, and RBAC enforced at the API. We use storageState per role and tenant for pre-authenticated sessions, seed data via API to control input, and put negative tests at the center because that is where real holes surface. Combined with parallel sharding and a strict security gate, we get a framework that protects both customer trust and company revenue at once. AI agents speed up the mechanical part, but the security and money oracles always belong to humans.",
        "まとめると、マルチテナントSaaSのテストは3つのオラクルを中心に回ります。データ分離、使用量に基づく正確な金額、そしてAPIで実施されるRBACです。事前認証済みセッションのために役割とテナントごとのstorageStateを使い、入力を制御するためAPIでデータをseedし、否定テストを中心に据えます。そこにこそ本物の穴が現れるからです。並列シャーディングと厳格なセキュリティゲートと組み合わせることで、顧客の信頼と会社の収益を同時に守る枠組みが得られます。AIエージェントは機械的な部分を高速化しますが、セキュリティと資金のオラクルは常に人間のものです。"
      ),
    ],
  },
];

export const PWLATEST_08 = [
  {
    categorySlug: "playwright-tools",
    slug: "pw-insurance-claims-decision-table",
    cover: coverA,
    tags: tags("thucchien", "insurance", "playwright", "datadriven", "realworld", "interview"),
    title: {
      vi: "Thực chiến Bảo hiểm: thẩm định & bồi thường theo bảng quyết định (claims)",
      en: "Insurance in practice: claims adjudication & payout via a decision table",
      ja: "実戦・保険: 判定表による保険金の査定と支払（claims）",
    },
    summary: {
      vi: "Kiểm thử hệ thống bồi thường bảo hiểm theo hướng oracle-first: mã hoá bảng quyết định thành dữ liệu, sinh test tham số hoá phủ luật loại trừ, thời gian chờ, giới hạn chi trả và hệ số phí actuarial.",
      en: "Testing an insurance claims system oracle-first: encode the decision table as data, generate parametrized tests covering exclusions, waiting periods, payout limits and actuarial premium factors.",
      ja: "オラクルファーストで保険金請求システムをテストします。判定表をデータとして符号化し、免責・待機期間・支払上限・保険数理係数を網羅するパラメータ化テストを生成します。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "playwright-tools",
    slug: "pw-saas-multitenant-billing-rbac",
    cover: coverB,
    tags: tags("thucchien", "saas", "playwright", "security", "realworld", "interview"),
    title: {
      vi: "Thực chiến SaaS: billing theo usage, multi-tenancy & RBAC",
      en: "SaaS in practice: usage-based billing, multi-tenancy & RBAC",
      ja: "実戦・SaaS: 従量課金・マルチテナンシー・RBAC",
    },
    summary: {
      vi: "Kiểm thử nền tảng SaaS đa tenant theo hướng oracle-first: cô lập dữ liệu chống rò rỉ chéo, hoá đơn theo usage và proration đúng đến từng xu, ma trận RBAC thực thi ở API, dunning; dùng storageState theo vai trò/tenant, seed API và test phủ định uỷ quyền.",
      en: "Testing a multi-tenant SaaS platform oracle-first: data isolation against cross-tenant leakage, usage-based invoices and proration correct to the cent, an RBAC matrix enforced at the API, dunning; using per-role/tenant storageState, API seed and negative authorization tests.",
      ja: "オラクルファーストでマルチテナントSaaSプラットフォームをテストします。相互漏洩に対するデータ分離、1円単位まで正確な従量課金と日割り、APIで実施されるRBACマトリクス、督促。役割／テナントごとのstorageState、API seed、否定的な認可テストを使います。",
    },
    pages: buildDoc(pagesB),
  },
];
