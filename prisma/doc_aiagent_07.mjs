// ============================================================================
// AIAGENT_07 — 2 bài "AI test agent thực chiến doanh nghiệp" (kind=thucchien).
// A: AI test agent cho chuyển khoản liên ngân hàng + đối soát (banking/NAPAS-SBV).
// B: AI test agent khám phá & kiểm thử checkout dưới flash-sale (ecommerce).
// Trilingual VI/EN/JA (JA thật, khác EN). Oracle-first: khẳng định BẤT BIẾN nghiệp vụ.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia07a", domain: "banking", kind: "thucchien", label: "AGENT · RECON" });
const coverB = makeThumb({ id: "aia07b", domain: "ecommerce", kind: "thucchien", label: "AGENT · FLASHSALE" });

const pagesA = [];
const pagesB = [];

// ---------------------------------------------------------------------------
// SVG helpers — Article A (banking)
// ---------------------------------------------------------------------------
const SVG_A_ARCH = `<svg viewBox="0 0 660 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="360" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc AI test agent cho chuyển khoản + đối soát</text>
<rect x="30" y="60" width="150" height="90" rx="10" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="105" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">PLANNER</text>
<text x="105" y="110" text-anchor="middle" font-size="10" fill="#7dd3fc">khám phá luồng</text>
<text x="105" y="126" text-anchor="middle" font-size="10" fill="#7dd3fc">sinh test-plan .md</text>
<rect x="255" y="60" width="150" height="90" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="330" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">GENERATOR</text>
<text x="330" y="110" text-anchor="middle" font-size="10" fill="#5eead4">plan → spec chạy được</text>
<text x="330" y="126" text-anchor="middle" font-size="10" fill="#5eead4">gọi API sandbox</text>
<rect x="480" y="60" width="150" height="90" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="555" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">HEALER</text>
<text x="555" y="110" text-anchor="middle" font-size="10" fill="#a5b4fc">đọc trace/log</text>
<text x="555" y="126" text-anchor="middle" font-size="10" fill="#a5b4fc">sửa hoặc skip</text>
<defs><marker id="arA1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arA1)"><path d="M180 105 h70"/><path d="M405 105 h70"/></g>
<rect x="30" y="185" width="600" height="70" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
<text x="330" y="210" text-anchor="middle" font-size="12" font-weight="800" fill="#fbbf24">GUARDRAIL — chỉ chạm SANDBOX/mock NAPAS, không bao giờ POST tiền thật</text>
<text x="330" y="234" text-anchor="middle" font-size="10.5" fill="#fcd34d">whitelist tool · giới hạn hạn mức · yêu cầu human-gate cho ca rủi ro</text>
<rect x="30" y="278" width="185" height="62" rx="8" fill="#111827" stroke="#334155"/>
<text x="122" y="302" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">Core Banking (mock)</text>
<text x="122" y="322" text-anchor="middle" font-size="9.5" fill="#94a3b8">ledger bút toán kép</text>
<rect x="238" y="278" width="185" height="62" rx="8" fill="#111827" stroke="#334155"/>
<text x="330" y="302" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">NAPAS switch (mock)</text>
<text x="330" y="322" text-anchor="middle" font-size="9.5" fill="#94a3b8">ISO 8583 / clearing</text>
<rect x="446" y="278" width="184" height="62" rx="8" fill="#111827" stroke="#334155"/>
<text x="538" y="302" text-anchor="middle" font-size="11" font-weight="700" fill="#cbd5e1">Oracle bất biến</text>
<text x="538" y="322" text-anchor="middle" font-size="9.5" fill="#94a3b8">bảo toàn tiền · idempotent</text>
<g stroke="#475569" stroke-width="1.5" fill="none" stroke-dasharray="4 4"><path d="M105 150 v128"/><path d="M330 150 v128"/><path d="M555 150 v128"/></g>
</svg>`;

const SVG_B_FLOW = `<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="340" fill="#2a0a3f"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#f5e8ff">Agent khám phá checkout dưới flash-sale</text>
<rect x="30" y="60" width="140" height="80" rx="10" fill="#7c2d92" stroke="#e879f9" stroke-width="2"/>
<text x="100" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#fae8ff">PLANNER</text>
<text x="100" y="110" text-anchor="middle" font-size="9.5" fill="#f0abfc">bò cây thao tác</text>
<text x="100" y="125" text-anchor="middle" font-size="9.5" fill="#f0abfc">sinh plan .md</text>
<rect x="200" y="60" width="140" height="80" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="270" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">GENERATOR</text>
<text x="270" y="110" text-anchor="middle" font-size="9.5" fill="#a5b4fc">spec + concurrency</text>
<text x="270" y="125" text-anchor="middle" font-size="9.5" fill="#a5b4fc">API + UI</text>
<rect x="370" y="60" width="140" height="80" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="440" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">HUMAN GATE</text>
<text x="440" y="110" text-anchor="middle" font-size="9.5" fill="#7dd3fc">duyệt oracle</text>
<text x="440" y="125" text-anchor="middle" font-size="9.5" fill="#7dd3fc">lọc ca rủi ro</text>
<rect x="540" y="60" width="90" height="80" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="585" y="95" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">CI</text>
<text x="585" y="115" text-anchor="middle" font-size="9" fill="#5eead4">hồi quy</text>
<defs><marker id="arB1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#c4b5fd"/></marker></defs>
<g stroke="#c4b5fd" stroke-width="2.5" fill="none" marker-end="url(#arB1)"><path d="M170 100 h28"/><path d="M340 100 h28"/><path d="M510 100 h28"/></g>
<rect x="30" y="175" width="600" height="130" rx="10" fill="#1a0533" stroke="#a855f7" stroke-width="1.5"/>
<text x="330" y="200" text-anchor="middle" font-size="12" font-weight="800" fill="#e9d5ff">Bất biến làm oracle dưới đồng thời cao</text>
<g font-size="10.5" fill="#f0abfc"><text x="60" y="228">• tồn kho ≥ 0, không oversell</text><text x="60" y="252">• coupon: toán giảm giá đúng, không âm</text></g>
<g font-size="10.5" fill="#f0abfc"><text x="360" y="228">• 1 đơn ⇢ đúng 1 trạng thái cuối</text><text x="360" y="252">• thanh toán idempotent theo orderKey</text></g>
<text x="330" y="288" text-anchor="middle" font-size="10.5" fill="#fcd34d">Áp lực: 10.000 người mua 100 món trong 3 giây</text>
</svg>`;

const SVG_A_STATE = `<svg viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="320" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Máy trạng thái lệnh chuyển & ma trận ca lỗi</text>
<defs><marker id="arA2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<ellipse cx="90" cy="90" rx="52" ry="26" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/><text x="90" y="95" text-anchor="middle" font-size="11" font-weight="700" fill="#e0f2fe">INIT</text>
<ellipse cx="250" cy="90" rx="52" ry="26" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/><text x="250" y="95" text-anchor="middle" font-size="11" font-weight="700" fill="#ccfbf1">PENDING</text>
<ellipse cx="410" cy="90" rx="52" ry="26" fill="#14532d" stroke="#4ade80" stroke-width="2"/><text x="410" y="95" text-anchor="middle" font-size="11" font-weight="700" fill="#dcfce7">SETTLED</text>
<ellipse cx="410" cy="200" rx="52" ry="26" fill="#7f1d1d" stroke="#f87171" stroke-width="2"/><text x="410" y="205" text-anchor="middle" font-size="11" font-weight="700" fill="#fecaca">REVERSED</text>
<ellipse cx="570" cy="145" rx="60" ry="26" fill="#4a044e" stroke="#e879f9" stroke-width="2"/><text x="570" y="150" text-anchor="middle" font-size="11" font-weight="700" fill="#f5d0fe">RECONCILED</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#arA2)">
<path d="M142 90 h56"/><path d="M302 90 h56"/><path d="M410 116 v58"/><path d="M462 90 q80 20 100 42"/><path d="M462 200 q60 -10 92 -40"/></g>
<text x="330" y="80" font-size="9.5" fill="#7dd3fc">reserve</text>
<text x="330" y="130" font-size="9.5" fill="#f87171">timeout→bù trừ</text>
<rect x="30" y="250" width="600" height="56" rx="8" fill="#111827" stroke="#334155"/>
<text x="45" y="272" font-size="10.5" fill="#cbd5e1" font-weight="700">Ca lỗi agent phải bao phủ:</text>
<g font-size="10" fill="#fca5a5"><text x="45" y="292">timeout switch</text><text x="175" y="292">gửi trùng (idempotent)</text><text x="340" y="292">vượt hạn mức</text><text x="470" y="292">lệch khi đối soát</text></g>
</svg>`;

const SVG_B_MATRIX = `<svg viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="320" fill="#2a0a3f"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#f5e8ff">Ma trận ca do agent sinh — checkout flash-sale</text>
<g stroke="#a855f7" stroke-width="1" opacity="0.5">
<line x1="30" y1="55" x2="630" y2="55"/><line x1="30" y1="95" x2="630" y2="95"/><line x1="30" y1="135" x2="630" y2="135"/>
<line x1="30" y1="175" x2="630" y2="175"/><line x1="30" y1="215" x2="630" y2="215"/><line x1="30" y1="255" x2="630" y2="255"/>
<line x1="30" y1="55" x2="30" y2="255"/><line x1="230" y1="55" x2="230" y2="255"/><line x1="430" y1="55" x2="430" y2="255"/><line x1="630" y1="55" x2="630" y2="255"/></g>
<g font-size="11" font-weight="800" fill="#e9d5ff"><text x="45" y="80">Ca / Case</text><text x="245" y="80">Oracle bất biến</text><text x="445" y="80">Chủ sở hữu</text></g>
<g font-size="10" fill="#f0abfc">
<text x="45" y="120">Mua món cuối cùng</text><text x="245" y="120">tồn kho = 0, không âm</text><text x="445" y="120">agent</text>
<text x="45" y="160">N người tranh 1 món</text><text x="245" y="160">đúng 1 người thắng</text><text x="445" y="160">agent</text>
<text x="45" y="200">Coupon chồng nhau</text><text x="245" y="200">giảm ≤ trần, tổng ≥ 0</text><text x="445" y="200">human</text>
<text x="45" y="240">Timeout thanh toán</text><text x="245" y="240">idempotent, 1 đơn cuối</text><text x="445" y="240">human</text></g>
</svg>`;


pagesA.push({
  heading: {
    vi: "1. Bối cảnh doanh nghiệp: quy mô, SLA và tuân thủ SBV",
    en: "1. Enterprise context: scale, SLA and SBV compliance",
    ja: "1. エンタープライズの背景：規模・SLA・SBV遵守",
  },
  blocks: [
    P(
      "Một ngân hàng bán lẻ tại Việt Nam xử lý hàng triệu lệnh chuyển khoản liên ngân hàng mỗi ngày qua NAPAS, cao điểm lên tới vài nghìn giao dịch mỗi giây vào dịp lương và lễ Tết. Mỗi lệnh chạm ít nhất bốn hệ thống: kênh (app/internet banking), core banking, cổng chuyển mạch NAPAS và hệ đối soát cuối ngày. Sai một đồng không chỉ là bug kỹ thuật mà là rủi ro pháp lý, vì Ngân hàng Nhà nước (SBV) và chuẩn NAPAS bắt buộc đối soát khớp tuyệt đối. Đây là lý do ta không kiểm thử bằng cách nhìn màn hình báo 'thành công', mà kiểm thử bằng bất biến nghiệp vụ.",
      "A retail bank in Vietnam processes millions of interbank transfers per day through NAPAS, peaking at several thousand transactions per second around payroll and Tet holidays. Each transfer touches at least four systems: the channel (mobile/internet banking), core banking, the NAPAS switch, and the end-of-day reconciliation engine. Being off by one đồng is not merely a technical bug but a legal risk, because the State Bank of Vietnam (SBV) and the NAPAS standard mandate exact reconciliation. This is why we do not test by watching a screen say 'success' — we test against business invariants.",
      "ベトナムのあるリテール銀行は、NAPASを通じて1日に数百万件の銀行間送金を処理し、給与日やテト（旧正月）の繁忙期には毎秒数千件に達します。各送金は少なくとも4つのシステムに触れます。チャネル（モバイル／インターネットバンキング）、コアバンキング、NAPASスイッチ、そして日次の突合エンジンです。1ドンでも狂うと単なる技術的バグではなく法的リスクになります。ベトナム国家銀行（SBV）とNAPAS標準が完全一致の照合を義務付けているからです。だからこそ画面が「成功」と表示するのを見て検証するのではなく、業務の不変条件で検証します。",
    ),
    P(
      "SLA của luồng này rất khắt khe: chuyển nhanh 24/7 phải phản hồi dưới năm giây, tỷ lệ thành công trên 99,9%, và mọi lệnh chưa rõ kết quả phải được xử lý dứt điểm trước khi chốt sổ. Đội QA truyền thống không thể tự tay dựng đủ tổ hợp ca — nghẽn mạng, timeout, gửi trùng, đảo chiều bù trừ, lệch tỷ giá làm tròn. Vì vậy chúng tôi bổ sung một AI test agent: nó khám phá không gian ca kiểm thử, tự sinh và chạy ca trong sandbox, còn con người giữ vai trò định nghĩa oracle và phê duyệt ca rủi ro.",
      "The SLA here is strict: instant 24/7 transfers must respond under five seconds, success rate above 99.9%, and any transfer with an unknown outcome must be resolved before books are closed. A traditional QA team cannot hand-craft enough case combinations — network congestion, timeouts, duplicate submissions, compensating reversals, rounding on FX. So we add an AI test agent: it explores the case space, generates and runs cases in a sandbox, while humans define the oracle and approve risky cases.",
      "ここでのSLAは厳格です。24時間365日の即時送金は5秒以内に応答し、成功率は99.9%超、結果が不明な送金はすべて締め処理の前に確定させねばなりません。従来のQAチームでは、ネットワーク輻輳・タイムアウト・重複送信・補償反対仕訳・為替の丸めといったケースの組み合わせを手作業で網羅できません。そこでAIテストエージェントを追加します。ケース空間を探索しサンドボックスで生成・実行し、人間はオラクルの定義と危険なケースの承認を担います。",
    ),
    NOTE(
      "Trong toàn bài, 'oracle' nghĩa là tiêu chí đúng/sai của một ca — ở đây là bất biến nghiệp vụ, không phải thông báo UI.",
      "Throughout this article, 'oracle' means the pass/fail criterion of a case — here, business invariants, not a UI message.",
      "本記事を通じて「オラクル」とはケースの合否基準を指します。ここではUIメッセージではなく業務の不変条件です。",
    ),
    UL(
      ["Quy mô: hàng triệu giao dịch/ngày, đỉnh vài nghìn TPS.", "SLA: phản hồi < 5s, thành công > 99,9%, xử lý dứt điểm trước chốt sổ.", "Tuân thủ: đối soát NAPAS khớp tuyệt đối theo yêu cầu SBV."],
      ["Scale: millions of transactions/day, peak of several thousand TPS.", "SLA: response < 5s, success > 99.9%, resolve every case before close.", "Compliance: exact NAPAS reconciliation per SBV requirement."],
      ["規模：1日数百万件、ピークは毎秒数千件。", "SLA：応答5秒未満、成功率99.9%超、締め前に全件確定。", "遵守：SBV要件に基づくNAPAS完全一致の突合。"],
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Kiến trúc & luồng dữ liệu của agent",
    en: "2. Agent architecture & data flow",
    ja: "2. エージェントのアーキテクチャとデータフロー",
  },
  blocks: [
    P(
      "Agent tuân theo mô hình ba tác nhân cộng tác giống Playwright Agents: Planner khám phá ứng dụng và viết kế hoạch kiểm thử dạng Markdown; Generator biến kế hoạch thành spec chạy được, xác thực locator/endpoint trên hệ thống sandbox thật; Healer chạy khi có lỗi, đọc console/network/trace và tự sửa hoặc đánh dấu skip. Điểm mấu chốt của phiên bản ngân hàng là mọi tác nhân đều bị chặn sau một lớp guardrail: chúng chỉ được gọi API sandbox và mock NAPAS, không bao giờ chạm cổng thanh toán thật.",
      "The agent follows a three-cooperating-agent model like Playwright Agents: the Planner explores the app and writes a Markdown test plan; the Generator turns the plan into runnable specs, verifying locators/endpoints on the live sandbox; the Healer runs on failure, reading console/network/trace and fixing or marking skipped. The key point in the banking edition is that every agent sits behind a guardrail layer: they may only call the sandbox API and mocked NAPAS, never the real payment rail.",
      "エージェントはPlaywright Agentsに似た三者協調モデルに従います。Plannerがアプリを探索してMarkdownのテスト計画を書き、Generatorが計画を実行可能なスペックに変換して稼働中のサンドボックスでロケーター／エンドポイントを検証し、Healerが失敗時に実行してコンソール・ネットワーク・トレースを読み、修正またはスキップ指定します。銀行版の要点は、すべてのエージェントがガードレール層の背後に置かれることです。サンドボックスAPIとモックNAPASのみを呼び出せ、本番の決済網には決して触れません。",
    ),
    IMG(
      SVG_A_ARCH,
      "Ba tác nhân Planner/Generator/Healer nằm sau guardrail, chỉ chạm sandbox và mock NAPAS.",
      "Planner/Generator/Healer sit behind a guardrail, touching only the sandbox and mocked NAPAS.",
      "Planner／Generator／Healerはガードレールの背後にあり、サンドボックスとモックNAPASのみに触れます。",
    ),
    P(
      "Luồng dữ liệu bắt đầu từ một 'ý định chuyển tiền' (tài khoản nguồn, tài khoản đích, số tiền, mã tham chiếu). Planner sinh các biến thể ý định; Generator dịch mỗi ý định thành lời gọi API và bút toán kỳ vọng; sau khi chạy, kết quả được đưa qua tầng oracle để so với bất biến. Mọi bước đều ghi trace để có thể phát lại tất định (deterministic replay) — điều bắt buộc trong môi trường tài chính vì một ca lỗi phải tái hiện được y hệt khi điều tra.",
      "The data flow starts from a 'transfer intent' (source account, destination account, amount, reference id). The Planner generates intent variants; the Generator translates each intent into API calls and expected ledger entries; after running, the result passes through the oracle layer to compare against invariants. Every step is traced for deterministic replay — mandatory in finance because a failing case must reproduce identically during investigation.",
      "データフローは「送金意図」（出金口座、入金口座、金額、参照ID）から始まります。Plannerが意図のバリエーションを生成し、Generatorが各意図をAPI呼び出しと期待仕訳に変換し、実行後に結果をオラクル層に通して不変条件と比較します。各ステップはトレースされ、決定的な再現（deterministic replay）が可能です。障害ケースは調査時に同一に再現できねばならないため、金融では必須です。",
    ),
    CODE("typescript", `// transfer intent — đơn vị dữ liệu agent thao tác
export interface TransferIntent {
  fromAccount: string;      // IBAN/số TK nguồn
  toBank: string;           // mã BIN ngân hàng đích (NAPAS)
  toAccount: string;
  amountMinor: bigint;      // đơn vị nhỏ nhất (VND không có phần lẻ)
  currency: "VND";
  refId: string;            // idempotency key duy nhất từ kênh
  channel: "MOBILE" | "IB" | "BATCH";
}

// bút toán kép kỳ vọng cho một lệnh SETTLED
export interface ExpectedLedger {
  debit:  { account: string; amountMinor: bigint };
  credit: { account: string; amountMinor: bigint };
  fee?:   { account: string; amountMinor: bigint };
}`),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Mô hình dữ liệu: ledger, lệnh và đối soát",
    en: "3. Data model: ledger, orders and reconciliation",
    ja: "3. データモデル：元帳・指示・突合",
  },
  blocks: [
    P(
      "Trái tim của bài toán là sổ cái bút toán kép. Mỗi lệnh chuyển tạo ít nhất hai dòng ledger: ghi nợ tài khoản nguồn và ghi có tài khoản đích (cộng phí nếu có, ghi có tài khoản thu phí). Tổng ghi nợ luôn bằng tổng ghi có trong một giao dịch — đó là bất biến bảo toàn tiền. Bên cạnh ledger, ta có bảng lệnh (transfer_order) lưu trạng thái máy, và bảng đối soát (recon_line) khớp từng lệnh với bản ghi trả về từ NAPAS.",
      "The heart of the problem is the double-entry ledger. Each transfer creates at least two ledger lines: a debit on the source account and a credit on the destination (plus a fee credit if applicable). Total debits always equal total credits within a transaction — that is the money-conservation invariant. Alongside the ledger there is a transfer_order table holding the state machine, and a recon_line table matching each order against the record returned by NAPAS.",
      "問題の核心は複式簿記の元帳です。各送金は少なくとも2つの元帳行を作ります。出金口座への借方と入金口座への貸方（該当する場合は手数料の貸方）です。1トランザクション内で借方合計は常に貸方合計に等しく、これが資金保存の不変条件です。元帳のほかに、状態機械を保持するtransfer_orderテーブルと、各指示をNAPASが返す記録と照合するrecon_lineテーブルがあります。",
    ),
    CODE("sql", `-- Sổ cái bút toán kép (append-only, không UPDATE)
CREATE TABLE ledger_entry (
  id           BIGSERIAL PRIMARY KEY,
  txn_id       UUID NOT NULL,          -- gom các dòng của 1 giao dịch
  account      TEXT NOT NULL,
  direction    CHAR(1) NOT NULL CHECK (direction IN ('D','C')), -- Debit/Credit
  amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lệnh chuyển + khoá idempotency
CREATE TABLE transfer_order (
  ref_id      TEXT PRIMARY KEY,        -- idempotency key từ kênh
  state       TEXT NOT NULL,          -- INIT|PENDING|SETTLED|REVERSED|RECONCILED
  amount_minor BIGINT NOT NULL,
  napas_trace TEXT,                   -- trace số từ switch
  UNIQUE (ref_id)                     -- không cho tạo trùng
);

-- Dòng đối soát NAPAS
CREATE TABLE recon_line (
  napas_trace TEXT PRIMARY KEY,
  ref_id      TEXT REFERENCES transfer_order(ref_id),
  amount_minor BIGINT NOT NULL,
  matched     BOOLEAN NOT NULL DEFAULT false
);`),
    NOTE(
      "Ledger là append-only: không bao giờ UPDATE/DELETE. Muốn 'hoàn tiền' phải ghi bút toán đảo chiều mới — dấu vết kiểm toán còn nguyên.",
      "The ledger is append-only: never UPDATE/DELETE. To 'refund' you post a new reversing entry — the audit trail stays intact.",
      "元帳は追記専用でUPDATE／DELETEしません。「返金」は新たな反対仕訳を計上します。監査証跡がそのまま残ります。",
    ),
    P(
      "Agent thao tác trên mô hình này qua một facade API sandbox: tạo lệnh, truy vấn trạng thái, kích hoạt đối soát cuối ngày. Nó không được viết SQL trực tiếp vào production — mọi tác động đều qua endpoint có kiểm soát để guardrail còn chặn được. Nhờ tách rõ ledger (sự thật về tiền), order (trạng thái) và recon (khớp với NAPAS), ta có ba nguồn oracle độc lập để đối chiếu chéo.",
      "The agent operates on this model through a sandbox API facade: create order, query state, trigger end-of-day reconciliation. It may not write SQL directly against production — every effect goes through a controlled endpoint so the guardrail can intercept it. By cleanly separating ledger (the truth about money), order (state) and recon (match with NAPAS), we get three independent oracle sources to cross-check.",
      "エージェントはサンドボックスAPIのファサードを通じてこのモデルを操作します。指示の作成、状態の照会、日次突合の起動です。本番に直接SQLを書くことは許されず、すべての作用は制御されたエンドポイントを経由するのでガードレールが遮断できます。元帳（資金の真実）、指示（状態）、突合（NAPASとの一致）を明確に分離することで、相互照合できる3つの独立したオラクル源が得られます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Bất biến làm oracle: bảo toàn tiền, idempotent, trạng thái cuối",
    en: "4. Invariants as oracle: conservation, idempotency, final state",
    ja: "4. オラクルとしての不変条件：資金保存・冪等性・最終状態",
  },
  blocks: [
    P(
      "Đây là chương xương sống. Thay vì kiểm 'màn hình báo thành công', ta khẳng định bốn bất biến. Một, bảo toàn tiền: trong mỗi giao dịch, tổng ghi nợ bằng tổng ghi có; tổng số dư toàn hệ thống không đổi trước và sau khi chuyển (trừ phí đi vào tài khoản thu phí, vẫn nằm trong hệ). Hai, tính idempotent: gửi cùng một refId nhiều lần chỉ tạo đúng một lệnh và một bộ bút toán. Ba, trạng thái cuối duy nhất: một lệnh không thể vừa SETTLED vừa REVERSED. Bốn, khớp đối soát: mọi lệnh SETTLED phải có đúng một dòng recon khớp số tiền với NAPAS.",
      "This is the backbone chapter. Instead of checking 'the screen says success', we assert four invariants. One, money conservation: within each transaction, total debits equal total credits; the system-wide balance is unchanged before and after (minus the fee, which lands in the fee account, still inside the system). Two, idempotency: submitting the same refId multiple times creates exactly one order and one set of entries. Three, final-state uniqueness: an order cannot be both SETTLED and REVERSED. Four, reconciliation match: every SETTLED order must have exactly one recon line matching the NAPAS amount.",
      "これは背骨となる章です。「画面が成功と表示する」を確認する代わりに、4つの不変条件を主張します。1つ目、資金保存：各トランザクション内で借方合計は貸方合計に等しく、システム全体の残高は送金前後で不変です（手数料は手数料口座に入り、システム内に残ります）。2つ目、冪等性：同じrefIdを複数回送信しても正確に1つの指示と1組の仕訳のみ生成されます。3つ目、最終状態の一意性：指示がSETTLEDとREVERSEDを同時に取ることはできません。4つ目、突合の一致：すべてのSETTLED指示は、NAPAS金額に一致するrecon行を正確に1つ持たねばなりません。",
    ),
    CODE("typescript", `// Oracle: các bất biến nghiệp vụ, dùng chung cho mọi ca agent sinh ra
import { expect } from "@playwright/test";

export function assertMoneyConserved(entries: LedgerEntry[]) {
  const byTxn = groupBy(entries, e => e.txnId);
  for (const [txn, rows] of byTxn) {
    const debit  = sum(rows.filter(r => r.direction === "D").map(r => r.amountMinor));
    const credit = sum(rows.filter(r => r.direction === "C").map(r => r.amountMinor));
    expect(debit, \`txn \${txn}: nợ=có\`).toBe(credit);   // bút toán kép
  }
}

export function assertIdempotent(orders: TransferOrder[], refId: string) {
  const hits = orders.filter(o => o.refId === refId);
  expect(hits.length, "refId chỉ tạo 1 lệnh").toBe(1);
}

export function assertFinalStateUnique(order: TransferOrder) {
  const terminal = ["SETTLED", "REVERSED"];
  expect(terminal.includes(order.state) ? 1 : 0).toBeLessThanOrEqual(1);
  expect(order.state).not.toBe("PENDING_FOREVER");
}

export function assertReconMatched(order: TransferOrder, lines: ReconLine[]) {
  if (order.state !== "SETTLED") return;
  const m = lines.filter(l => l.refId === order.refId && l.matched);
  expect(m.length, "đúng 1 dòng recon khớp").toBe(1);
  expect(m[0].amountMinor).toBe(order.amountMinor);
}`),
    IMG(
      SVG_A_STATE,
      "Máy trạng thái lệnh chuyển và các nhóm ca lỗi agent phải bao phủ.",
      "Transfer order state machine and the failure-case groups the agent must cover.",
      "送金指示の状態機械と、エージェントが網羅すべき障害ケース群。",
    ),
    TIP(
      "Viết oracle một lần, tái dùng cho MỌI ca. Agent chỉ sinh dữ liệu đầu vào và kịch bản; phần 'đúng/sai' luôn do bất biến do con người sở hữu quyết định.",
      "Write the oracle once, reuse for EVERY case. The agent only generates inputs and scenarios; the pass/fail decision always belongs to human-owned invariants.",
      "オラクルは一度書いてすべてのケースで再利用します。エージェントは入力とシナリオのみを生成し、合否判定は常に人間が所有する不変条件が決めます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "5. Agent khám phá & sinh ca trong guardrail",
    en: "5. The agent explores & generates cases under guardrails",
    ja: "5. ガードレール内でのエージェントの探索とケース生成",
  },
  blocks: [
    P(
      "Planner nhận một mô tả nghiệp vụ ngắn và không gian tham số (số tiền biên, ngân hàng đích, kênh, tình huống mạng) rồi sinh kế hoạch kiểm thử dạng Markdown. Nó ưu tiên phủ các lớp tương đương và giá trị biên: số tiền 0, âm, đúng hạn mức, vượt hạn mức một đồng, số cực lớn. Generator biến mỗi mục kế hoạch thành spec Playwright gọi API sandbox. Guardrail bọc quanh mọi lời gọi: một danh sách trắng endpoint, chặn mọi thao tác ghi lên môi trường thật, và ép mọi ca chuyển tiền chỉ chạy trên mock NAPAS.",
      "The Planner takes a short business description and the parameter space (boundary amounts, destination banks, channels, network conditions) and produces a Markdown test plan. It prioritizes covering equivalence classes and boundary values: amount 0, negative, exactly at limit, one đồng over limit, extremely large. The Generator turns each plan item into a Playwright spec calling the sandbox API. A guardrail wraps every call: a whitelist of endpoints, blocking any write to the real environment, and forcing all money-moving cases onto mocked NAPAS only.",
      "Plannerは短い業務記述とパラメータ空間（境界金額、送金先銀行、チャネル、ネットワーク条件）を受け取り、Markdownのテスト計画を生成します。同値クラスと境界値の網羅を優先します。金額0、マイナス、上限ちょうど、上限を1ドン超過、極端に大きい値です。Generatorは各計画項目をサンドボックスAPIを呼ぶPlaywrightスペックに変換します。ガードレールがすべての呼び出しを包みます。エンドポイントのホワイトリスト、本番環境への書き込み遮断、送金ケースをモックNAPASのみに強制します。",
    ),
    CODE("typescript", `// Guardrail: agent chỉ gọi được endpoint sandbox trong whitelist
const ALLOWED = [
  "POST /sandbox/transfers",
  "GET  /sandbox/transfers/:refId",
  "POST /sandbox/recon/run",
];
const FORBIDDEN_HOSTS = ["core-prod", "napas-prod", "pay-live"];

export function guardedFetch(method: string, url: string, body?: unknown) {
  const key = \`\${method} \${url.replace(/\\/[a-f0-9-]{8,}/gi, "/:refId")}\`;
  if (!ALLOWED.includes(key)) throw new Error("Guardrail: endpoint không cho phép " + key);
  if (FORBIDDEN_HOSTS.some(h => url.includes(h))) throw new Error("Guardrail: chặn host production");
  return fetch(url, { method, body: body ? JSON.stringify(body) : undefined });
}`),
    P(
      "Agent tự sinh, nhưng ranh giới rất rõ: nó chỉ chạm sandbox, chỉ tạo dữ liệu tổng hợp, và mọi ca liên quan tới hạn mức lớn hoặc đảo chiều bù trừ đều bị đánh dấu 'cần human review' trước khi vào bộ hồi quy. Con người sở hữu ca rủi ro; agent lo phần rộng và lặp. Cách chia này cho ta độ phủ lớn mà không đánh đổi an toàn.",
      "The agent generates autonomously, but the boundary is sharp: it only touches the sandbox, only creates synthetic data, and any case involving large limits or compensating reversals is flagged 'needs human review' before entering the regression suite. Humans own the risky cases; the agent handles breadth and repetition. This split gives us large coverage without trading away safety.",
      "エージェントは自律的に生成しますが、境界は明確です。サンドボックスのみに触れ、合成データのみを作成し、大きな限度額や補償反対仕訳に関わるケースは回帰スイートに入る前に「人間レビュー要」と印付けされます。人間が危険なケースを所有し、エージェントは幅と反復を担います。この分担で安全性を犠牲にせず大きな網羅を得ます。",
    ),
    WARN(
      "Không bao giờ cấp cho agent khoá gọi cổng thanh toán thật hay quyền ghi core production. Một lời nhắc bị chèn độc (prompt injection) không được phép biến thành lệnh chuyển tiền thật.",
      "Never give the agent keys to the real payment rail or write access to production core. A prompt-injected instruction must not be able to become a real money transfer.",
      "本番決済網の鍵や本番コアへの書き込み権限をエージェントに決して与えないでください。プロンプトインジェクションされた指示が本物の送金になってはなりません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Con người giữ ca rủi ro — cổng review",
    en: "6. Humans own the risky cases — the review gate",
    ja: "6. 人間が危険なケースを所有する — レビューゲート",
  },
  blocks: [
    P(
      "Không phải ca nào cũng nên tự động hoá mù quáng. Với ngân hàng, các ca đảo chiều bù trừ, tranh chấp giao dịch, và giao dịch cận hạn mức chống rửa tiền cần con người đọc và phê duyệt. Chúng tôi dựng một cổng review: agent đề xuất ca kèm lý do và dữ liệu, một QA cấp cao xác nhận oracle và mức độ rủi ro, chỉ ca được duyệt mới vào bộ hồi quy chính. Cổng này biến agent thành một trợ lý khuếch đại năng suất, không phải một robot chạy tự do.",
      "Not every case should be blindly automated. For a bank, compensating reversals, transaction disputes, and near-AML-limit transactions need a human to read and approve them. We build a review gate: the agent proposes a case with rationale and data, a senior QA confirms the oracle and risk level, and only approved cases enter the main regression suite. This gate turns the agent into a productivity amplifier, not a free-running robot.",
      "すべてのケースを盲目的に自動化すべきではありません。銀行では、補償反対仕訳、取引紛争、アンチマネーロンダリング限度額付近の取引は、人間が読んで承認する必要があります。レビューゲートを構築します。エージェントが根拠とデータを添えてケースを提案し、シニアQAがオラクルとリスクレベルを確認し、承認されたケースのみが主要な回帰スイートに入ります。このゲートがエージェントを暴走ロボットではなく生産性の増幅器にします。",
    ),
    SCEN(
      "Ca đảo chiều bù trừ bị đề xuất tự động",
      "An auto-proposed compensating reversal case",
      "Agent phát hiện một nhánh: NAPAS trả timeout nhưng sau đó xác nhận đã ghi có bên nhận. Agent đề xuất ca 'gửi lại + đảo chiều', kèm bút toán kỳ vọng. QA cấp cao đọc: đúng nghiệp vụ nhưng oracle phải khẳng định KHÔNG được ghi có hai lần. QA sửa oracle, duyệt, rồi ca vào hồi quy.",
      "The agent finds a branch: NAPAS returns a timeout but later confirms the beneficiary was credited. The agent proposes a 'resend + reverse' case with expected entries. A senior QA reads it: business-correct, but the oracle must assert the beneficiary is NOT credited twice. The QA fixes the oracle, approves, and the case enters regression.",
      "自動提案された補償反対仕訳ケース",
      "エージェントがある分岐を発見します。NAPASがタイムアウトを返すが後で受取人への貸方を確認します。エージェントは期待仕訳付きの「再送＋反対仕訳」ケースを提案します。シニアQAが読みます。業務的には正しいが、オラクルは受取人が二重に貸方計上されないことを主張せねばなりません。QAはオラクルを修正し承認し、ケースは回帰に入ります。",
    ),
    UL(
      ["Agent đề xuất → QA duyệt oracle → mới vào hồi quy.", "Ca cận hạn mức AML luôn cần người xác nhận.", "Ca đảo chiều/hoàn tiền không tự merge nếu chưa có oracle chống ghi kép."],
      ["Agent proposes → QA approves oracle → only then enters regression.", "Near-AML-limit cases always require human confirmation.", "Reversal/refund cases never auto-merge without a double-credit-prevention oracle."],
      ["エージェント提案→QAがオラクル承認→回帰へ。", "AML限度額付近のケースは常に人間の確認が必要。", "反対仕訳／返金ケースは二重貸方防止オラクルなしに自動マージしない。"],
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Ca happy-path: chuyển thành công và đối soát khớp",
    en: "7. Happy-path: successful transfer and matched reconciliation",
    ja: "7. ハッピーパス：送金成功と突合一致",
  },
  blocks: [
    P(
      "Ca cơ bản nhất vẫn phải viết theo hướng oracle. Ta tạo một lệnh chuyển hợp lệ, chờ trạng thái SETTLED, chạy đối soát cuối ngày, rồi khẳng định cả bốn bất biến. Chú ý: ta không assert 'response.ok === true' rồi dừng lại; ta đọc thẳng ledger, order và recon để chắc rằng tiền được bảo toàn và khớp NAPAS. Đó là khác biệt giữa một ca xanh giả và một ca xanh thật.",
      "Even the most basic case must be written oracle-first. We create a valid transfer, wait for SETTLED, run end-of-day reconciliation, then assert all four invariants. Note: we do not assert 'response.ok === true' and stop; we read the ledger, order and recon directly to be sure money is conserved and matches NAPAS. That is the difference between a fake green and a real green.",
      "最も基本的なケースでもオラクルファーストで書かねばなりません。有効な送金を作成し、SETTLEDを待ち、日次突合を実行し、4つの不変条件すべてを主張します。注意：「response.ok === true」を主張して止めるのではなく、元帳・指示・突合を直接読み、資金が保存されNAPASと一致することを確かめます。それが偽の緑と本物の緑の違いです。",
    ),
    CODE("typescript", `import { test } from "@playwright/test";
import { assertMoneyConserved, assertReconMatched, assertFinalStateUnique } from "./oracle";

test("chuyển hợp lệ → SETTLED → recon khớp", async ({ request }) => {
  const intent = {
    fromAccount: "A-001", toBank: "970436", toAccount: "B-777",
    amountMinor: 5_000_000n, currency: "VND", refId: crypto.randomUUID(), channel: "MOBILE",
  };
  await request.post("/sandbox/transfers", { data: intent });

  const order = await pollUntil(() => getOrder(intent.refId), o => o.state === "SETTLED", 5000);
  await request.post("/sandbox/recon/run");           // chốt sổ cuối ngày

  const [entries, lines] = await Promise.all([getLedger(intent.refId), getRecon(intent.refId)]);
  assertMoneyConserved(entries);       // nợ = có
  assertFinalStateUnique(order);       // 1 trạng thái cuối
  assertReconMatched(order, lines);    // 突合: khớp NAPAS đúng số tiền
});`),
    NOTE(
      "pollUntil dùng thời gian ảo/seed cố định trong sandbox để tất định. Không dùng sleep cứng — nguồn gốc của test flaky.",
      "pollUntil uses virtual time / fixed seed in the sandbox for determinism. No hard sleeps — the root of flaky tests.",
      "pollUntilはサンドボックスで仮想時間／固定シードを使い決定性を保ちます。ハードスリープは使いません。フレーキーの元凶です。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Ca lỗi sâu #1: timeout switch và bù trừ",
    en: "8. Deep failure #1: switch timeout and compensation",
    ja: "8. 深い障害#1：スイッチのタイムアウトと補償",
  },
  blocks: [
    P(
      "Đây là ca ám ảnh nhất của mọi ngân hàng: kênh gửi lệnh, NAPAS không trả kết quả trong SLA (timeout), nhưng thực tế bên nhận có thể đã hoặc chưa được ghi có. Nếu xử lý sai, hoặc khách bị trừ tiền mà người nhận không nhận, hoặc người nhận được ghi có hai lần. Agent mô phỏng timeout bằng cách cấu hình mock NAPAS trễ quá ngưỡng, rồi kiểm hệ thống có kích hoạt truy vấn kết quả (inquiry) và bù trừ đúng không.",
      "This is every bank's most haunting case: the channel sends the order, NAPAS does not return a result within SLA (timeout), yet the beneficiary may or may not have actually been credited. Handled wrong, either the customer is debited while the beneficiary gets nothing, or the beneficiary is credited twice. The agent simulates the timeout by configuring mocked NAPAS to delay past the threshold, then checks whether the system triggers a result inquiry and compensates correctly.",
      "これはあらゆる銀行にとって最も悩ましいケースです。チャネルが指示を送るが、NAPASがSLA内に結果を返さず（タイムアウト）、実際には受取人が貸方計上されているかもしれないし、されていないかもしれません。誤処理すると、顧客が引き落とされたのに受取人が何も受け取らないか、受取人が二重に貸方計上されます。エージェントはモックNAPASを閾値超過まで遅延させてタイムアウトを模擬し、システムが結果照会（inquiry）を起動し正しく補償するかを確認します。",
    ),
    CODE("typescript", `test("timeout switch → inquiry → không ghi kép, tiền bảo toàn", async ({ request }) => {
  await request.post("/sandbox/napas/config", { data: { mode: "TIMEOUT", delayMs: 9000 } });

  const refId = crypto.randomUUID();
  await request.post("/sandbox/transfers", { data: makeIntent(refId, 2_000_000n) });

  // hệ thống phải chuyển sang PENDING rồi tự inquiry, KHÔNG treo mãi
  const order = await pollUntil(() => getOrder(refId),
    o => ["SETTLED", "REVERSED"].includes(o.state), 15000);

  const entries = await getLedger(refId);
  assertMoneyConserved(entries);                 // nợ = có bất kể nhánh nào
  const credits = entries.filter(e => e.account === "B-777" && e.direction === "C");
  expect(credits.length, "không ghi có 2 lần").toBeLessThanOrEqual(1);
  assertFinalStateUnique(order);                 // không kẹt PENDING vĩnh viễn
});`),
    WARN(
      "Bất biến then chốt ở đây KHÔNG phải 'giao dịch thành công' mà là 'tiền được bảo toàn và không ghi kép dù nhánh nào xảy ra'. Một timeout có thể kết thúc ở SETTLED hoặc REVERSED — cả hai đều hợp lệ miễn là bất biến giữ.",
      "The key invariant here is NOT 'the transaction succeeds' but 'money is conserved and no double credit, whichever branch occurs'. A timeout may end in SETTLED or REVERSED — both are valid as long as invariants hold.",
      "ここでの重要な不変条件は「取引が成功する」ではなく「どの分岐でも資金が保存され二重貸方がない」です。タイムアウトはSETTLEDまたはREVERSEDで終わり得ます。不変条件が保たれる限りどちらも有効です。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. Ca lỗi sâu #2: gửi trùng và tính idempotent",
    en: "9. Deep failure #2: duplicate submission and idempotency",
    ja: "9. 深い障害#2：重複送信と冪等性",
  },
  blocks: [
    P(
      "Người dùng bấm nút hai lần, app retry khi mạng chập chờn, hoặc job batch chạy lại — tất cả tạo ra lệnh trùng cùng refId. Bất biến idempotent yêu cầu: dù gửi bao nhiêu lần, chỉ đúng một lệnh và một bộ bút toán được tạo. Agent tấn công điểm này bằng cách gửi song song nhiều bản sao cùng refId, rồi khẳng định số lệnh và số bút toán không nhân lên. Đây là ca mà nhiều hệ thống 'trông thành công' nhưng âm thầm trừ tiền hai lần.",
      "Users double-click, the app retries on flaky networks, or a batch job re-runs — all producing duplicate orders with the same refId. The idempotency invariant requires: no matter how many times it is submitted, exactly one order and one set of entries are created. The agent attacks this by sending many copies of the same refId in parallel, then asserting the order and entry counts do not multiply. This is the case where many systems 'look successful' while silently debiting twice.",
      "ユーザーがダブルクリックし、不安定なネットワークでアプリが再試行し、バッチジョブが再実行される。すべて同じrefIdの重複指示を生みます。冪等性の不変条件は要求します。何度送信しても、正確に1つの指示と1組の仕訳のみが作られると。エージェントは同じrefIdの多数のコピーを並行送信してこれを攻撃し、指示数と仕訳数が増えないことを主張します。多くのシステムが「成功に見える」のに密かに二重に引き落とすケースです。",
    ),
    CODE("typescript", `test("gửi trùng refId song song → idempotent, 1 lệnh 1 bút toán", async ({ request }) => {
  const refId = crypto.randomUUID();
  const intent = makeIntent(refId, 1_500_000n);

  // 20 request song song CÙNG refId (mô phỏng retry + double-click)
  await Promise.all(Array.from({ length: 20 },
    () => request.post("/sandbox/transfers", { data: intent })));

  const orders  = await getOrdersByRef(refId);
  const entries = await getLedger(refId);

  assertIdempotent(orders, refId);           // đúng 1 lệnh
  const debits = entries.filter(e => e.direction === "D" && e.account === "A-001");
  expect(debits.length, "chỉ trừ tiền 1 lần").toBe(1);
  assertMoneyConserved(entries);
});`),
    TIP(
      "Khoá idempotency nên là UNIQUE ở tầng DB (như PRIMARY KEY trên ref_id), không chỉ kiểm ở tầng ứng dụng — chống được cả điều kiện tranh chấp.",
      "The idempotency key should be UNIQUE at the DB layer (e.g. PRIMARY KEY on ref_id), not just checked in the app — this also defeats race conditions.",
      "冪等性キーはアプリ層だけでなくDB層でUNIQUE（例：ref_idの主キー）にすべきです。競合状態も防げます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Ca lỗi sâu #3: vượt hạn mức và làm tròn",
    en: "10. Deep failure #3: over-limit and rounding",
    ja: "10. 深い障害#3：限度額超過と丸め",
  },
  blocks: [
    P(
      "Hạn mức là ranh giới nghiệp vụ nhạy cảm: hạn mức giao dịch, hạn mức ngày, hạn mức chống rửa tiền. Agent sinh các ca biên quanh từng ngưỡng — đúng hạn mức, vượt một đồng, vượt nhiều. Bất biến ở đây: lệnh vượt hạn mức phải bị từ chối SẠCH, tức không tạo bút toán nào, số dư không đổi. Một lỗi kinh điển là 'trừ tiền rồi mới báo vượt hạn mức', để lại bút toán mồ côi. Ngoài ra với các luồng có phí phần trăm hay quy đổi, agent kiểm quy tắc làm tròn để tổng vẫn khớp từng đồng.",
      "Limits are a sensitive business boundary: per-transaction, daily, and anti-money-laundering limits. The agent generates boundary cases around each threshold — exactly at limit, one đồng over, far over. The invariant: an over-limit order must be rejected CLEANLY, i.e. no ledger entries created, balance unchanged. A classic bug is 'debit first, then report over-limit', leaving an orphan entry. Also, for flows with percentage fees or conversion, the agent checks rounding rules so totals still match to the đồng.",
      "限度額は敏感な業務境界です。取引ごと、日次、アンチマネーロンダリングの限度額があります。エージェントは各閾値の周りの境界ケースを生成します。上限ちょうど、1ドン超過、大幅超過です。不変条件：限度額超過の指示はクリーンに拒否されねばならず、つまり仕訳を1つも作らず残高は不変です。典型的なバグは「先に引き落として後で限度額超過を報告」し、孤立仕訳を残すことです。また割合手数料や換算のあるフローでは、エージェントが丸め規則を確認し、合計が1ドン単位で一致するようにします。",
    ),
    CODE("typescript", `test.describe("hạn mức + làm tròn", () => {
  test("vượt hạn mức 1 đồng → từ chối SẠCH, không bút toán mồ côi", async ({ request }) => {
    const limit = await getDailyLimit("A-001");     // ví dụ 100_000_000n
    const refId = crypto.randomUUID();
    const r = await request.post("/sandbox/transfers",
      { data: makeIntent(refId, limit + 1n) });

    expect(r.status()).toBe(422);                    // từ chối rõ ràng
    const entries = await getLedger(refId);
    expect(entries.length, "KHÔNG tạo bút toán khi bị từ chối").toBe(0);
    expect(await getBalance("A-001"), "số dư không đổi").toBe(await getBalance("A-001"));
  });

  test("phí 0,05% làm tròn → nợ = có + phí đến từng đồng", async ({ request }) => {
    const refId = crypto.randomUUID();
    await request.post("/sandbox/transfers", { data: makeIntent(refId, 3_333_333n) });
    const e = await getLedger(refId);
    assertMoneyConserved(e);   // tổng nợ phải bằng tổng có kể cả dòng phí đã làm tròn
  });
});`),
    NOTE(
      "Tiền tệ luôn dùng số nguyên đơn vị nhỏ nhất (minor unit), không dùng float. Với VND không có phần lẻ nhưng nguyên tắc vẫn giữ để tránh sai số quy đổi.",
      "Money always uses integer minor units, never floats. VND has no subunit, but the principle holds to avoid conversion errors.",
      "通貨は常に整数の最小単位を使い、浮動小数点は使いません。VNDに補助単位はありませんが、換算誤差を避けるため原則を守ります。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Đối soát NAPAS: bất biến khớp cuối ngày",
    en: "11. NAPAS reconciliation: end-of-day match invariant",
    ja: "11. NAPAS突合：日次一致の不変条件",
  },
  blocks: [
    P(
      "Đối soát (突合/照合) là bước chốt: cuối ngày, ngân hàng nhận tệp thanh toán bù trừ từ NAPAS và phải khớp từng dòng với sổ nội bộ. Ba loại lệch cần bắt: lệch tồn tại (có bên này không bên kia), lệch số tiền, và lệch trạng thái. Agent sinh các ca cấy lỗi có chủ đích vào mock NAPAS — thiếu một dòng, sai một đồng, trạng thái ngược — rồi khẳng định hệ đối soát phát hiện đúng và đưa vào hàng chờ xử lý ngoại lệ, không âm thầm bỏ qua.",
      "Reconciliation (突合/照合) is the closing step: at end of day the bank receives the clearing file from NAPAS and must match each line against its internal ledger. Three kinds of mismatch to catch: existence mismatch (present one side, absent the other), amount mismatch, and status mismatch. The agent generates cases that deliberately inject faults into mocked NAPAS — a missing line, a one-đồng discrepancy, a reversed status — then asserts the reconciliation engine detects them correctly and routes them to an exception queue, never silently skipping.",
      "突合（照合）は締めのステップです。日次で銀行はNAPASからクリアリングファイルを受け取り、各行を内部元帳と照合せねばなりません。捕捉すべき3種類の不一致：存在の不一致（片方にあり他方にない）、金額の不一致、状態の不一致です。エージェントはモックNAPASに意図的に障害を注入するケースを生成します。行の欠落、1ドンの差異、逆の状態などです。そして突合エンジンがそれらを正しく検出し例外キューに回すこと、決して黙って飛ばさないことを主張します。",
    ),
    CODE("typescript", `test("recon phát hiện lệch số tiền, không tự bỏ qua", async ({ request }) => {
  const refId = crypto.randomUUID();
  await request.post("/sandbox/transfers", { data: makeIntent(refId, 4_000_000n) });
  await pollUntil(() => getOrder(refId), o => o.state === "SETTLED", 5000);

  // NAPAS trả về lệch 1 đồng ở dòng đối soát tương ứng
  await request.post("/sandbox/napas/tamper",
    { data: { refId, amountMinor: 3_999_999n } });
  await request.post("/sandbox/recon/run");

  const line = await getReconLine(refId);
  expect(line.matched, "phải KHÔNG khớp vì lệch tiền").toBe(false);
  const exceptions = await getReconExceptions();
  expect(exceptions.some(x => x.refId === refId), "lệch phải vào hàng chờ ngoại lệ").toBe(true);
});`),
    SCEN(
      "Vì sao 'khớp tổng' là chưa đủ",
      "Why 'matching the total' is not enough",
      "Một hệ chỉ so tổng cuối ngày có thể khớp tổng nhưng sai từng dòng (một lệnh dư, một lệnh thiếu, bù nhau). Oracle phải khớp theo napas_trace ở mức từng dòng, không chỉ tổng. Agent chủ động dựng ca 'tổng khớp nhưng dòng lệch' để chứng minh hệ bắt được.",
      "A system comparing only the daily total may match the total yet be wrong line by line (one order extra, one missing, cancelling out). The oracle must match per napas_trace at the line level, not just the total. The agent deliberately builds a 'total matches but lines differ' case to prove the system catches it.",
      "「合計の一致」では不十分な理由",
      "日次合計のみを比較するシステムは、合計が一致しても行単位で誤りがあり得ます（1件過剰、1件欠落で相殺）。オラクルは合計だけでなくnapas_trace単位で行レベルで照合せねばなりません。エージェントは「合計は一致するが行が食い違う」ケースをあえて構築し、システムが捕捉することを証明します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Tích hợp CI: cổng hồi quy cho luồng tiền",
    en: "12. CI integration: a regression gate for the money flow",
    ja: "12. CI統合：資金フローの回帰ゲート",
  },
  blocks: [
    P(
      "Bộ ca do agent sinh, sau khi qua cổng review, được chạy trong CI như một cổng hồi quy (回帰) bắt buộc trước khi lên môi trường. Pipeline dựng sandbox có mock NAPAS xác định, seed dữ liệu cố định, chạy song song các ca bất biến, và giữ trace/HAR khi thất bại để Healer và người cùng điều tra. Không có ca nào chạm hệ thống thật; toàn bộ chạy trên bản dựng trình duyệt Chrome for Testing và API sandbox.",
      "The agent-generated suite, after passing the review gate, runs in CI as a mandatory regression gate (回帰) before any environment promotion. The pipeline spins up a sandbox with a deterministic mocked NAPAS, seeds fixed data, runs invariant cases in parallel, and retains trace/HAR on failure so the Healer and a human can investigate together. No case touches the real system; everything runs on Chrome for Testing builds and the sandbox API.",
      "エージェント生成のスイートは、レビューゲートを通過後、環境昇格前の必須の回帰ゲートとしてCIで実行されます。パイプラインは決定的なモックNAPASを持つサンドボックスを立ち上げ、固定データをシードし、不変条件ケースを並行実行し、失敗時にトレース／HARを保持してHealerと人間が共同で調査できるようにします。どのケースも本番システムに触れず、すべてChrome for TestingビルドとサンドボックスAPIで実行されます。",
    ),
    CODE("yaml", `# .github/workflows/banking-agent-regression.yml
name: banking-agent-regression
on: [pull_request]
jobs:
  invariants:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps chromium  # Chrome for Testing
      - run: docker compose up -d sandbox mock-napas        # NAPAS mock tất định
      - run: node scripts/seed-ledger.mjs --seed 42          # dữ liệu cố định
      - run: npx playwright test tests/invariants --workers=8
        env:
          PW_TRACE: retain-on-failure-and-retries
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: traces, path: test-results/**/trace.zip }`),
    TIP(
      "Gắn nhãn ca theo bất biến (conservation, idempotency, recon) để báo cáo CI cho biết NHÓM oracle nào vỡ, không chỉ 'test đỏ'.",
      "Tag cases by invariant (conservation, idempotency, recon) so the CI report tells you which oracle GROUP broke, not just 'test red'.",
      "ケースを不変条件（保存・冪等性・突合）でタグ付けし、CIレポートが単に「テスト赤」ではなくどのオラクル群が壊れたかを示すようにします。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Ranh giới AI-agent & góc phỏng vấn",
    en: "13. AI-agent boundary & interview angle",
    ja: "13. AIエージェントの境界と面接での論点",
  },
  blocks: [
    P(
      "Điều một QA giỏi cần nói rõ trong phỏng vấn: AI test agent khuếch đại độ phủ nhưng không thay thế phán đoán. Nó có thể ảo giác (ハルシネーション) một luồng không tồn tại, nên mọi locator/endpoint phải được xác thực trên hệ thật (grounding) và mọi oracle do con người sở hữu. Ranh giới an toàn — chỉ sandbox, whitelist tool, human-gate cho ca rủi ro — là phần quan trọng nhất, không phải mô hình. Ứng viên nên trình bày được vì sao 'assert bất biến' mạnh hơn 'assert thành công'.",
      "What a strong QA must articulate in interviews: an AI test agent amplifies coverage but does not replace judgment. It can hallucinate (ハルシネーション) a non-existent flow, so every locator/endpoint must be grounded on the real system and every oracle owned by humans. The safety boundary — sandbox only, tool whitelist, human-gate for risky cases — is the most important part, not the model. A candidate should be able to explain why 'assert invariants' is stronger than 'assert success'.",
      "優れたQAが面接で明確に述べるべきこと：AIテストエージェントは網羅を増幅しますが判断を置き換えません。存在しないフローをハルシネーションし得るので、すべてのロケーター／エンドポイントは実システムでグラウンディングされ、すべてのオラクルは人間が所有せねばなりません。安全境界（サンドボックスのみ、ツールのホワイトリスト、危険なケースの人間ゲート）がモデルより最も重要です。候補者は「不変条件を主張する」が「成功を主張する」より強い理由を説明できるべきです。",
    ),
    QA(
      "Vì sao không để agent tự chạy trên môi trường thật cho nhanh?",
      "Why not let the agent run directly on the real environment for speed?",
      "Vì một agent tự do có thể tạo lệnh chuyển tiền thật hoặc bị prompt injection biến thành hành động phá hoại. Trong tài chính, tốc độ không đáng để đánh đổi rủi ro mất tiền và vi phạm tuân thủ. Ta luôn chạy trên sandbox có mock NAPAS tất định.",
      "Because a free-running agent could create real money transfers or be turned into a destructive action by prompt injection. In finance, speed is not worth trading against loss of funds and compliance breaches. We always run on a sandbox with deterministic mocked NAPAS.",
      "なぜ速度のためにエージェントを本番環境で直接実行しないのか？",
      "自由に動くエージェントは本物の送金を作ったり、プロンプトインジェクションで破壊的な行動に変えられたりし得るからです。金融では、資金喪失とコンプライアンス違反のリスクと引き換えにするほど速度に価値はありません。常に決定的なモックNAPASを持つサンドボックスで実行します。",
    ),
    QA(
      "Oracle then chốt cho ca timeout chuyển tiền là gì?",
      "What is the key oracle for a transfer-timeout case?",
      "Không phải 'giao dịch thành công' mà là bất biến bảo toàn tiền và không ghi có hai lần, dù kết cục là SETTLED hay REVERSED. Cộng thêm: lệnh không được kẹt PENDING vĩnh viễn — phải có trạng thái cuối duy nhất.",
      "Not 'the transaction succeeds' but the money-conservation invariant and no double credit, whether the outcome is SETTLED or REVERSED. Plus: the order must not be stuck PENDING forever — there must be a unique final state.",
      "送金タイムアウトケースの重要なオラクルは何か？",
      "「取引が成功する」ではなく、結果がSETTLEDでもREVERSEDでも、資金保存の不変条件と二重貸方がないことです。加えて、指示が永遠にPENDINGで止まってはならず、一意の最終状態が必要です。",
    ),
    QA(
      "Đối soát khớp tổng là đủ chưa? Vì sao?",
      "Is matching the total sufficient for reconciliation? Why?",
      "Chưa đủ. Khớp tổng có thể che giấu lỗi bù trừ giữa các dòng. Oracle phải khớp từng dòng theo napas_trace, kiểm cả lệch tồn tại, lệch số tiền và lệch trạng thái, rồi đẩy ngoại lệ vào hàng chờ.",
      "Not sufficient. A matching total can hide cancelling errors between lines. The oracle must match per line by napas_trace, checking existence, amount and status mismatches, then route exceptions to a queue.",
      "突合で合計の一致は十分か？なぜか？",
      "不十分です。合計の一致は行間で相殺し合う誤りを隠し得ます。オラクルはnapas_trace単位で行ごとに照合し、存在・金額・状態の不一致を確認し、例外をキューに回さねばなりません。",
    ),
    QA(
      "Làm sao đảm bảo ca do agent sinh không bị flaky?",
      "How do you keep agent-generated cases from being flaky?",
      "Dùng seed cố định, thời gian ảo, mock NAPAS tất định, tránh sleep cứng và dùng chờ theo điều kiện. Mọi ca phải phát lại tất định qua trace. Ca nào không tái hiện được thì không được vào bộ hồi quy.",
      "Use fixed seeds, virtual time, deterministic mocked NAPAS, avoid hard sleeps and use condition-based waiting. Every case must deterministically replay via trace. A case that cannot reproduce does not enter the regression suite.",
      "エージェント生成ケースをフレーキーにしないには？",
      "固定シード、仮想時間、決定的なモックNAPASを使い、ハードスリープを避け条件ベースの待機を使います。すべてのケースはトレースで決定的に再現せねばなりません。再現できないケースは回帰スイートに入れません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "1. Bối cảnh: flash-sale và vì sao checkout dễ vỡ",
    en: "1. Context: flash-sale and why checkout breaks",
    ja: "1. 背景：フラッシュセールとチェックアウトが壊れる理由",
  },
  blocks: [
    P(
      "Một sàn thương mại điện tử lớn mở flash-sale lúc 12 giờ trưa: mười nghìn người cùng tranh một trăm suất iPhone giảm giá sâu trong ba giây đầu. Đây là điều kiện tồi tệ nhất cho checkout — đồng thời cực cao, tồn kho khan hiếm, coupon chồng lớp, và người dùng bấm nút liên tục. Nếu hệ thống oversell (bán quá số tồn) hay tính sai coupon, hậu quả là huỷ đơn hàng loạt, khách phẫn nộ và thiệt hại thương hiệu. Vì thế ta kiểm thử bằng bất biến, không bằng 'đặt hàng thành công'.",
      "A large e-commerce platform opens a flash-sale at noon: ten thousand shoppers race for a hundred deeply-discounted iPhones in the first three seconds. This is the worst condition for checkout — extreme concurrency, scarce inventory, stacked coupons, and users hammering the button. If the system oversells or miscalculates coupons, the fallout is mass cancellations, furious customers and brand damage. So we test with invariants, not with 'order placed successfully'.",
      "大手ECプラットフォームが正午にフラッシュセールを開始します。1万人の買い物客が最初の3秒で100台の大幅割引iPhoneを奪い合います。これはチェックアウトにとって最悪の条件です。極端な並行性、希少な在庫、重ねられたクーポン、ボタンを連打するユーザー。システムが超過販売したりクーポンを誤計算したりすると、大量キャンセル、激怒する顧客、ブランド毀損という結果になります。だから「注文成功」ではなく不変条件で検証します。",
    ),
    P(
      "Đội QA không thể tự tay dựng đủ tổ hợp đua tranh giữa hàng nghìn phiên. Một AI test agent giúp phần này: nó khám phá cây thao tác checkout, tự sinh kịch bản đồng thời và ca biên, chạy ở cả tầng API (nhanh, ổn định làm oracle) lẫn tầng UI (kiểm trải nghiệm). Con người vẫn giữ cổng review cho ca rủi ro như hoàn tiền và coupon phức tạp. Bài này đi từ bất biến, tới cách agent sinh ca, tới các ca lỗi sâu, CI và góc phỏng vấn.",
      "A QA team cannot hand-craft enough racing combinations across thousands of sessions. An AI test agent helps here: it explores the checkout action tree, generates concurrency scenarios and edge cases, running at both the API layer (fast, stable as the oracle) and the UI layer (checking experience). Humans keep a review gate for risky cases like refunds and complex coupons. This article goes from invariants, to how the agent generates cases, to deep failure cases, CI and the interview angle.",
      "QAチームは数千のセッションにまたがる競合の組み合わせを手作業で網羅できません。AIテストエージェントがここで役立ちます。チェックアウトの操作ツリーを探索し、並行シナリオと境界ケースを生成し、API層（高速で安定したオラクル）とUI層（体験の確認）の両方で実行します。人間は返金や複雑なクーポンなどの危険なケースにレビューゲートを保ちます。本記事は不変条件から、エージェントのケース生成、深い障害ケース、CI、面接での論点へ進みます。",
    ),
    IMG(
      SVG_B_FLOW,
      "Agent khám phá checkout, sinh ca đồng thời, qua cổng human review rồi vào CI.",
      "The agent explores checkout, generates concurrency cases, passes a human review gate, then enters CI.",
      "エージェントがチェックアウトを探索し、並行ケースを生成し、人間のレビューゲートを通してCIに入れます。",
    ),
    NOTE(
      "Oracle chính của bài này là tầng API/dữ liệu: tồn kho, đơn, coupon. UI dùng để kiểm trải nghiệm, không phải nguồn sự thật về tồn kho.",
      "The primary oracle here is the API/data layer: inventory, orders, coupons. The UI checks experience, not the source of truth about inventory.",
      "ここでの主要なオラクルはAPI／データ層です。在庫、注文、クーポン。UIは体験を確認し、在庫の真実の源ではありません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Kiến trúc agent & mô hình dữ liệu checkout",
    en: "2. Agent architecture & checkout data model",
    ja: "2. エージェントのアーキテクチャとチェックアウトのデータモデル",
  },
  blocks: [
    P(
      "Agent gồm ba vai giống Playwright Agents: Planner khám phá luồng chọn hàng → giỏ → áp coupon → thanh toán và viết kế hoạch; Generator biến kế hoạch thành spec chạy trên API và UI; Healer đọc trace khi lỗi để sửa hoặc skip. Mô hình dữ liệu tối giản gồm ba bảng: sản phẩm với tồn kho, đơn hàng với trạng thái, và coupon với luật giảm giá. Tồn kho là tài nguyên khan hiếm được bảo vệ bằng ràng buộc không âm ở tầng cơ sở dữ liệu.",
      "The agent has three roles like Playwright Agents: the Planner explores the browse → cart → apply-coupon → pay flow and writes a plan; the Generator turns the plan into specs running on API and UI; the Healer reads traces on failure to fix or skip. The minimal data model has three tables: product with inventory, order with state, and coupon with discount rules. Inventory is the scarce resource guarded by a non-negative constraint at the database layer.",
      "エージェントはPlaywright Agentsと同様の三役を持ちます。Plannerが閲覧→カート→クーポン適用→決済のフローを探索して計画を書き、GeneratorがそれをAPIとUIで実行するスペックに変換し、Healerが失敗時にトレースを読んで修正またはスキップします。最小限のデータモデルは3テーブルです。在庫を持つ商品、状態を持つ注文、割引規則を持つクーポン。在庫は希少なリソースで、データベース層の非負制約で保護されます。",
    ),
    CODE("sql", `-- Tồn kho: KHÔNG BAO GIỜ được âm (bất biến chống oversell)
CREATE TABLE product (
  sku        TEXT PRIMARY KEY,
  price_minor BIGINT NOT NULL,
  stock      INT NOT NULL CHECK (stock >= 0)   -- ràng buộc ở tầng DB
);

CREATE TABLE order_row (
  order_key  TEXT PRIMARY KEY,       -- idempotency key từ client
  sku        TEXT REFERENCES product(sku),
  qty        INT NOT NULL CHECK (qty > 0),
  state      TEXT NOT NULL,          -- CART|RESERVED|PAID|CANCELLED
  total_minor BIGINT NOT NULL CHECK (total_minor >= 0)
);

CREATE TABLE coupon (
  code       TEXT PRIMARY KEY,
  kind       TEXT NOT NULL,          -- PERCENT | FIXED
  value      INT NOT NULL,
  max_off_minor BIGINT,              -- trần giảm giá
  stackable  BOOLEAN NOT NULL DEFAULT false
);`),
    P(
      "Giữ tồn kho không âm bằng ràng buộc CHECK ở tầng cơ sở dữ liệu là tuyến phòng thủ cuối cùng, quan trọng hơn mọi kiểm tra ở tầng ứng dụng. Khi hàng nghìn phiên cùng trừ tồn, chỉ hàng đợi giao dịch của cơ sở dữ liệu mới đảm bảo tính đúng. Agent sẽ tấn công đúng vào ranh giới này: đặt số lượng phiên tranh chấp lớn hơn số tồn còn lại và khẳng định không bao giờ có oversell.",
      "Keeping inventory non-negative with a CHECK constraint at the database layer is the last line of defense, more important than any application-layer check. When thousands of sessions decrement stock at once, only the database's transaction queue guarantees correctness. The agent attacks exactly this boundary: it sets the number of racing sessions higher than the remaining stock and asserts oversell never happens.",
      "データベース層のCHECK制約で在庫を非負に保つことは最後の防衛線であり、アプリ層のどのチェックよりも重要です。数千のセッションが同時に在庫を減らすとき、データベースのトランザクションキューだけが正しさを保証します。エージェントはまさにこの境界を攻撃します。競合セッション数を残在庫より多く設定し、超過販売が決して起きないことを主張します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Bất biến làm oracle: tồn kho, coupon, trạng thái đơn",
    en: "3. Invariants as oracle: inventory, coupon, order state",
    ja: "3. オラクルとしての不変条件：在庫・クーポン・注文状態",
  },
  blocks: [
    P(
      "Ba nhóm bất biến neo toàn bộ bộ kiểm thử. Một, tồn kho: stock luôn ≥ 0, và tổng số lượng đã bán không bao giờ vượt tồn ban đầu — đây là bất biến chống oversell. Hai, toán coupon: số tiền giảm không vượt trần, tổng thanh toán không âm, và coupon không chồng nếu không được phép. Ba, trạng thái đơn: một đơn có đúng một trạng thái cuối (PAID hoặc CANCELLED), và thanh toán idempotent theo order_key nên retry không tạo đơn kép hay tính tiền hai lần.",
      "Three invariant groups anchor the entire suite. One, inventory: stock is always ≥ 0, and total sold never exceeds initial stock — the anti-oversell invariant. Two, coupon math: the discount never exceeds its cap, the payable total is never negative, and coupons do not stack when not allowed. Three, order state: an order has exactly one final state (PAID or CANCELLED), and payment is idempotent by order_key so retries create no duplicate order or double charge.",
      "3つの不変条件群がスイート全体を支えます。1つ目、在庫：stockは常に0以上で、総販売数は初期在庫を決して超えません。これが超過販売防止の不変条件です。2つ目、クーポン計算：割引は上限を超えず、支払総額は負にならず、許可されない場合クーポンは重ならない。3つ目、注文状態：注文は正確に1つの最終状態（PAIDまたはCANCELLED）を持ち、決済はorder_key単位で冪等なので再試行が重複注文や二重請求を作りません。",
    ),
    CODE("typescript", `// Oracle checkout — bất biến dùng chung cho mọi ca agent sinh
import { expect } from "@playwright/test";

export function assertNoOversell(sku: string, initialStock: number,
                                 orders: OrderRow[]) {
  const sold = orders.filter(o => o.sku === sku && o.state === "PAID")
                     .reduce((s, o) => s + o.qty, 0);
  expect(sold, "tổng bán ≤ tồn ban đầu").toBeLessThanOrEqual(initialStock);
}

export function assertStockNonNegative(product: Product) {
  expect(product.stock, "tồn kho không âm").toBeGreaterThanOrEqual(0);
}

export function assertCouponMath(order: OrderRow, base: bigint,
                                 discount: bigint, cap: bigint) {
  expect(discount).toBeLessThanOrEqual(cap);           // không quá trần
  expect(order.totalMinor).toBe(base - discount);      // toán đúng
  expect(order.totalMinor).toBeGreaterThanOrEqual(0n); // không âm
}

export function assertOrderFinalUnique(states: string[]) {
  const finals = states.filter(s => ["PAID", "CANCELLED"].includes(s));
  expect(finals.length, "đúng 1 trạng thái cuối").toBe(1);
}`),
    IMG(
      SVG_B_MATRIX,
      "Ma trận ca do agent sinh, gắn mỗi ca với oracle bất biến và chủ sở hữu (agent/human).",
      "Agent-generated case matrix, tying each case to an invariant oracle and an owner (agent/human).",
      "エージェント生成のケースマトリクス。各ケースを不変条件オラクルと所有者（エージェント／人間）に紐付けます。",
    ),
    TIP(
      "Đừng kiểm 'nút Đặt hàng đổi màu' — hãy kiểm tổng bán ≤ tồn và tổng tiền = giá − giảm. Bất biến sống sót qua mọi thay đổi giao diện.",
      "Don't check 'the Order button changes color' — check total sold ≤ stock and total = price − discount. Invariants survive every UI change.",
      "「注文ボタンの色が変わる」を確認しないでください。総販売数≤在庫、総額＝価格−割引を確認します。不変条件はあらゆるUI変更を生き延びます。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. Agent sinh ca đồng thời & ca biên",
    en: "4. Agent-generated concurrency & edge cases",
    ja: "4. エージェントによる並行・境界ケースの生成",
  },
  blocks: [
    P(
      "Điểm mạnh của agent là bùng nổ tổ hợp mà con người ngại làm. Planner nhận không gian tham số — số phiên đồng thời, số tồn còn lại, tổ hợp coupon, thời điểm bấm — rồi sinh kế hoạch phủ các lớp: đủ tồn, sát tồn, thiếu tồn. Generator biến mỗi kế hoạch thành spec chạy song song bằng Promise.all trên tầng API để đo bất biến ở áp lực cao. Vì API nhanh và ổn định, nó là nơi lý tưởng để đặt oracle; UI được kiểm riêng với số phiên nhỏ hơn để soi trải nghiệm.",
      "The agent's strength is combinatorial explosion that humans avoid. The Planner takes the parameter space — concurrent sessions, remaining stock, coupon combinations, click timing — and generates a plan covering layers: ample stock, at-stock, under-stock. The Generator turns each plan into specs running in parallel via Promise.all at the API layer to measure invariants under high pressure. Because the API is fast and stable, it is the ideal place to put the oracle; the UI is checked separately with fewer sessions to inspect experience.",
      "エージェントの強みは人間が避ける組み合わせ爆発です。Plannerはパラメータ空間（並行セッション数、残在庫、クーポンの組み合わせ、クリックのタイミング）を受け取り、層を網羅する計画を生成します。在庫十分、在庫ちょうど、在庫不足です。GeneratorはAPI層でPromise.allにより並行実行するスペックに各計画を変換し、高負荷下で不変条件を測ります。APIは高速で安定しているのでオラクルを置く理想の場所です。UIは体験を精査するため少ないセッションで別途確認します。",
    ),
    CODE("typescript", `// Agent sinh ca đua tranh: N phiên mua M món, N*qty > tồn còn lại
import { test, request as pwRequest } from "@playwright/test";
import { assertNoOversell, assertStockNonNegative } from "./oracle";

test("150 phiên tranh 100 suất → không oversell", async () => {
  const sku = "IPHONE-FLASH";
  const initial = await setStock(sku, 100);

  const ctx = await pwRequest.newContext();
  const results = await Promise.all(
    Array.from({ length: 150 }, (_, i) =>
      ctx.post("/api/checkout", { data: {
        orderKey: \`race-\${i}\`, sku, qty: 1, coupon: null,
      }}).then(r => r.status())));

  const paid = results.filter(s => s === 200).length;
  expect(paid, "tối đa 100 đơn thành công").toBeLessThanOrEqual(100);

  const [product, orders] = await Promise.all([getProduct(sku), getOrders(sku)]);
  assertStockNonNegative(product);              // stock >= 0
  assertNoOversell(sku, initial, orders);       // tổng bán <= 100
});`),
    WARN(
      "Ca đồng thời chỉ đáng tin nếu tất định: cùng seed, cùng số phiên, cùng thứ tự khởi tạo. Nếu kết quả đổi mỗi lần chạy, đó là test flaky — sửa hoặc loại, đừng để trong hồi quy.",
      "Concurrency cases are only trustworthy if deterministic: same seed, same session count, same init order. If the result changes each run, it's a flaky test — fix or remove, don't keep it in regression.",
      "並行ケースは決定的な場合のみ信頼できます。同じシード、同じセッション数、同じ初期化順序です。実行ごとに結果が変わればフレーキーテストです。修正か除去し、回帰に残さないでください。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "5. Cổng review của con người",
    en: "5. The human review gate",
    ja: "5. 人間のレビューゲート",
  },
  blocks: [
    P(
      "Agent sinh rộng, nhưng không phải ca nào cũng nên tự động merge. Các ca chạm tiền thật của khách — hoàn tiền, huỷ đơn đã thanh toán, coupon chồng lớp phức tạp — cần một QA cấp cao đọc oracle và xác nhận. Cổng review làm việc đơn giản: agent đề xuất ca kèm lý do và dữ liệu tổng hợp; người duyệt kiểm oracle có đúng bất biến nghiệp vụ không, rồi mới cho vào bộ hồi quy. Cách này giữ tốc độ của agent mà không mất kiểm soát ở vùng nhạy cảm.",
      "The agent generates broadly, but not every case should auto-merge. Cases touching real customer money — refunds, cancelling a paid order, complex stacked coupons — need a senior QA to read the oracle and confirm. The review gate works simply: the agent proposes a case with rationale and synthetic data; the reviewer checks the oracle truly captures the business invariant, and only then admits it into the regression suite. This keeps the agent's speed without losing control in sensitive areas.",
      "エージェントは広く生成しますが、すべてのケースを自動マージすべきではありません。実際の顧客の資金に触れるケース（返金、支払済み注文のキャンセル、複雑な重ねクーポン）は、シニアQAがオラクルを読んで確認する必要があります。レビューゲートはシンプルに機能します。エージェントが根拠と合成データを添えてケースを提案し、レビュアーがオラクルが業務の不変条件を本当に捉えているか確認し、それから回帰スイートに入れます。これで敏感な領域の制御を失わずエージェントの速度を保ちます。",
    ),
    SCEN(
      "Coupon chồng lớp bị đề xuất tự động",
      "An auto-proposed stacked-coupon case",
      "Agent phát hiện đường dẫn: áp một coupon phần trăm rồi thêm một coupon cố định, tổng giảm có thể vượt trần hoặc làm tổng âm. Agent đề xuất ca với hai coupon. QA đọc: đúng là ca nguy hiểm, oracle phải khẳng định tổng ≥ 0 và giảm ≤ trần từng coupon. QA duyệt, ca vào hồi quy — bắt đúng lỗi làm tổng âm khi hai coupon cộng dồn.",
      "The agent finds a path: apply a percent coupon then add a fixed coupon; the combined discount may exceed the cap or make the total negative. The agent proposes a two-coupon case. The QA reads it: indeed dangerous, the oracle must assert total ≥ 0 and discount ≤ each coupon's cap. The QA approves, the case enters regression — catching the bug where two stacked coupons make the total negative.",
      "自動提案された重ねクーポンケース",
      "エージェントがある経路を発見します。パーセントクーポンを適用してから固定クーポンを追加すると、合計割引が上限を超えたり合計を負にしたりし得ます。エージェントは2つのクーポンのケースを提案します。QAが読みます。確かに危険で、オラクルは合計0以上と割引が各クーポンの上限以下を主張せねばなりません。QAが承認しケースは回帰に入り、2つの重ねクーポンが合計を負にするバグを捕捉します。",
    ),
    UL(
      ["Ca hoàn tiền/huỷ đơn đã thanh toán: luôn cần người duyệt.", "Ca coupon chồng lớp: oracle phải chống tổng âm và vượt trần.", "Agent chỉ tạo dữ liệu tổng hợp trên môi trường test, không chạm dữ liệu khách thật."],
      ["Refund / cancelling paid orders: always need human approval.", "Stacked-coupon cases: the oracle must prevent negative total and over-cap.", "The agent only creates synthetic data on the test environment, never real customer data."],
      ["返金／支払済み注文のキャンセル：常に人間の承認が必要。", "重ねクーポンケース：オラクルは負の合計と上限超過を防がねばならない。", "エージェントはテスト環境で合成データのみ作成し、実顧客データに触れない。"],
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Oracle qua API so với UI",
    en: "6. API oracle vs UI",
    ja: "6. APIオラクル対UI",
  },
  blocks: [
    P(
      "Một sai lầm phổ biến là dùng UI làm nguồn sự thật: nhìn thấy 'Đặt hàng thành công' rồi coi là đạt. Nhưng UI có độ trễ, có cache, và có thể hiển thị lạc quan trong khi phía sau đơn bị huỷ. Nguồn sự thật về tồn kho và tiền phải là API/cơ sở dữ liệu. Vì vậy ta đặt oracle ở tầng API — nhanh, tất định, đo được bất biến — còn UI chỉ dùng để kiểm trải nghiệm: nút khoá đúng lúc, thông báo hết hàng hiện ra, giá hiển thị khớp với tổng thực. Playwright cho phép trộn cả hai trong một spec.",
      "A common mistake is using the UI as the source of truth: seeing 'Order placed' and calling it a pass. But the UI has latency, cache, and may render optimistically while behind the scenes the order is cancelled. The source of truth about inventory and money must be the API/database. So we put the oracle at the API layer — fast, deterministic, measuring invariants — while the UI only checks experience: the button locks at the right moment, the out-of-stock message appears, the displayed price matches the real total. Playwright lets us mix both in one spec.",
      "よくある間違いはUIを真実の源とすることです。「注文完了」を見て合格とみなすことです。しかしUIには遅延やキャッシュがあり、裏で注文がキャンセルされているのに楽観的に表示し得ます。在庫と資金の真実の源はAPI／データベースでなければなりません。だからオラクルはAPI層に置きます。高速で決定的、不変条件を測れます。UIは体験のみ確認します。ボタンが適切なタイミングでロックされ、在庫切れメッセージが現れ、表示価格が実際の合計と一致することです。Playwrightは両方を1つのスペックで混ぜられます。",
    ),
    CODE("typescript", `test("UI hiển thị đúng, nhưng API mới là oracle tồn kho", async ({ page, request }) => {
  await page.goto("/flash/IPHONE-FLASH");
  await page.getByRole("button", { name: "Mua ngay" }).click();

  // UI: kiểm trải nghiệm (auto-wait của Playwright)
  await expect(page.getByText("Đơn của bạn đã được ghi nhận")).toBeVisible();

  // ORACLE: đọc thẳng API/DB — nguồn sự thật về tồn & tiền
  const product = await (await request.get("/api/product/IPHONE-FLASH")).json();
  expect(product.stock, "tồn kho không âm").toBeGreaterThanOrEqual(0);

  const orders = await (await request.get("/api/orders?sku=IPHONE-FLASH")).json();
  assertNoOversell("IPHONE-FLASH", 100, orders);   // bất biến quyết định đạt/không
});`),
    NOTE(
      "UI đạt mà API vỡ bất biến ⇒ vẫn FAIL. Nguồn sự thật là dữ liệu, không phải pixel. Đây là cốt lõi tư duy oracle-first.",
      "UI green but API breaks an invariant ⇒ still FAIL. The source of truth is data, not pixels. This is the core of oracle-first thinking.",
      "UIが緑でもAPIが不変条件を破れば、やはりFAILです。真実の源はピクセルではなくデータです。これがオラクルファースト思考の核心です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Ca happy-path: mua thành công dưới tải",
    en: "7. Happy-path: successful purchase under load",
    ja: "7. ハッピーパス：負荷下での購入成功",
  },
  blocks: [
    P(
      "Ngay cả ca thuận lợi cũng viết theo hướng oracle. Ta đặt một đơn hợp lệ khi còn tồn, xác nhận trạng thái đơn về PAID, rồi khẳng định: tồn giảm đúng bằng số lượng mua, tổng tiền bằng giá trừ giảm giá coupon, và đơn chỉ có một trạng thái cuối. Điểm khác biệt với kiểm thử ngây thơ là ta không dừng ở 'thấy trang cảm ơn' mà đọc dữ liệu để chắc các con số khớp bất biến.",
      "Even the happy case is written oracle-first. We place a valid order while stock remains, confirm the order reaches PAID, then assert: stock decreased by exactly the purchased quantity, the total equals price minus coupon discount, and the order has exactly one final state. The difference from naive testing is we don't stop at 'seeing the thank-you page' but read the data to ensure the numbers match the invariants.",
      "ハッピーケースでもオラクルファーストで書きます。在庫が残っているうちに有効な注文を出し、注文がPAIDに達することを確認し、次を主張します。在庫が購入数量ちょうど減り、合計が価格からクーポン割引を引いた額に等しく、注文が正確に1つの最終状態を持つこと。素朴なテストとの違いは「サンクスページを見る」で止まらず、データを読んで数値が不変条件に一致することを確かめる点です。",
    ),
    CODE("typescript", `test("mua hợp lệ có coupon → PAID, tồn & tiền khớp bất biến", async ({ request }) => {
  const sku = "IPHONE-FLASH";
  const before = (await getProduct(sku)).stock;

  const r = await request.post("/api/checkout", { data: {
    orderKey: crypto.randomUUID(), sku, qty: 1, coupon: "SALE10",  // giảm 10%
  }});
  expect(r.status()).toBe(200);

  const order = await pollUntil(() => getOrder(sku), o => o.state === "PAID", 5000);
  const after = (await getProduct(sku)).stock;

  expect(before - after, "tồn giảm đúng qty").toBe(1);
  assertCouponMath(order, 20_000_000n, 2_000_000n, 5_000_000n); // 10% ≤ trần
  assertOrderFinalUnique([order.state]);
});`),
    TIP(
      "Dùng auto-wait và pollUntil theo điều kiện thay vì sleep. Dưới flash-sale, thời gian phản hồi biến động mạnh — chờ cứng là nguồn flaky số một.",
      "Use auto-wait and condition-based pollUntil instead of sleep. Under flash-sale, response times swing wildly — hard waits are the number-one flaky source.",
      "sleepの代わりに自動待機と条件ベースのpollUntilを使います。フラッシュセール下では応答時間が大きく変動します。ハードウェイトはフレーキーの第一の原因です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Ca lỗi sâu #1: oversell dưới đồng thời cực cao",
    en: "8. Deep failure #1: oversell under extreme concurrency",
    ja: "8. 深い障害#1：極端な並行下の超過販売",
  },
  blocks: [
    P(
      "Đây là ác mộng kinh điển của flash-sale: khi cực nhiều phiên cùng trừ tồn, một hiện thực yếu sẽ đọc tồn cũ, cùng thấy 'còn 1' rồi cùng bán, dẫn tới bán vượt (oversell). Agent tấn công bằng cách đặt số phiên tranh chấp cao hơn tồn còn lại và chạy hoàn toàn song song. Bất biến then chốt: tổng số bán không bao giờ vượt tồn ban đầu, và tồn không bao giờ âm. Nếu cả hai giữ, hệ thống đã xử lý đúng điều kiện tranh chấp — thường bằng khoá bi quan, câu lệnh trừ có điều kiện, hoặc hàng đợi.",
      "This is the classic flash-sale nightmare: when very many sessions decrement stock at once, a weak implementation reads stale stock, all see 'one left' and all sell, causing oversell. The agent attacks by setting racing sessions higher than remaining stock and running fully in parallel. The key invariant: total sold never exceeds initial stock, and stock never goes negative. If both hold, the system handled the race correctly — usually via pessimistic locking, a conditional decrement, or a queue.",
      "これはフラッシュセールの典型的な悪夢です。非常に多くのセッションが同時に在庫を減らすとき、弱い実装は古い在庫を読み、全員が「残り1」と見て全員が販売し、超過販売を起こします。エージェントは競合セッションを残在庫より多く設定し完全並行で実行して攻撃します。重要な不変条件：総販売数が初期在庫を決して超えず、在庫が決して負にならない。両方が保たれれば、システムは競合を正しく処理しました。通常は悲観的ロック、条件付き減算、またはキューによってです。",
    ),
    CODE("typescript", `test("300 phiên tranh 5 suất cuối → tuyệt đối không oversell", async () => {
  const sku = "IPHONE-FLASH";
  await setStock(sku, 5);
  const ctx = await pwRequest.newContext();

  const statuses = await Promise.all(
    Array.from({ length: 300 }, (_, i) =>
      ctx.post("/api/checkout", { data: { orderKey: \`hot-\${i}\`, sku, qty: 1 }})
         .then(r => r.status())));

  const ok = statuses.filter(s => s === 200).length;
  expect(ok, "chỉ 5 đơn được chấp nhận").toBe(5);

  const product = await getProduct(sku);
  expect(product.stock, "tồn về 0, KHÔNG âm").toBe(0);
  const orders = await getOrders(sku);
  assertNoOversell(sku, 5, orders);      // tổng bán = 5, không hơn
});`),
    WARN(
      "Trừ tồn ở tầng ứng dụng bằng đọc-rồi-ghi là sai kinh điển. Phải trừ có điều kiện ('UPDATE ... SET stock=stock-1 WHERE stock>0') hoặc khoá — agent tồn tại để phơi bày đúng lỗi này.",
      "Decrementing stock in the app with read-then-write is a classic bug. Use a conditional decrement ('UPDATE ... SET stock=stock-1 WHERE stock>0') or a lock — the agent exists to expose exactly this.",
      "アプリで読み取り後書き込みにより在庫を減らすのは典型的なバグです。条件付き減算（'UPDATE ... SET stock=stock-1 WHERE stock>0'）またはロックを使います。エージェントはまさにこれを暴くために存在します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "9. Ca lỗi sâu #2: toán coupon và trần giảm giá",
    en: "9. Deep failure #2: coupon math and discount cap",
    ja: "9. 深い障害#2：クーポン計算と割引上限",
  },
  blocks: [
    P(
      "Coupon là nơi lỗi toán học ẩn nấp. Các ca biên agent phải phủ: coupon phần trăm làm tròn, coupon cố định lớn hơn giá trị đơn (không được làm tổng âm), hai coupon chồng khi không được phép, và coupon vượt trần giảm giá. Bất biến: tổng phải trả luôn ≥ 0, số giảm ≤ trần từng coupon, và nếu không cho chồng thì chỉ một coupon áp dụng. Agent sinh tổ hợp coupon và giá đơn, rồi khẳng định toán học đúng đến từng đồng — kể cả khi làm tròn phần trăm.",
      "Coupons are where math bugs hide. The boundary cases the agent must cover: percentage coupon rounding, a fixed coupon larger than the order value (must not make the total negative), two coupons stacking when not allowed, and a coupon exceeding its discount cap. Invariants: the payable total is always ≥ 0, the discount ≤ each coupon's cap, and if stacking is disallowed only one coupon applies. The agent generates coupon-and-price combinations, then asserts the math is correct to the đồng — including percentage rounding.",
      "クーポンは計算バグが潜む場所です。エージェントが網羅すべき境界ケース：パーセントクーポンの丸め、注文額より大きい固定クーポン（合計を負にしてはならない）、許可されないのに重なる2つのクーポン、割引上限を超えるクーポン。不変条件：支払総額は常に0以上、割引は各クーポンの上限以下、重ね不可なら1つのクーポンのみ適用。エージェントはクーポンと価格の組み合わせを生成し、パーセントの丸めを含め1ドン単位で計算が正しいことを主張します。",
    ),
    CODE("typescript", `test.describe("coupon biên", () => {
  test("coupon cố định > giá đơn → tổng = 0, KHÔNG âm", async ({ request }) => {
    const r = await request.post("/api/checkout", { data: {
      orderKey: crypto.randomUUID(), sku: "PHONE-CASE", qty: 1,
      coupon: "MINUS500K",   // giảm 500k nhưng đơn chỉ 200k
    }});
    const order = await r.json();
    expect(order.totalMinor, "tổng không âm").toBe(0n);   // clamp về 0
  });

  test("coupon vượt trần → giảm bị giới hạn ở trần", async ({ request }) => {
    // đơn 20tr, coupon 50% nhưng trần 1tr
    const r = await request.post("/api/checkout", { data: {
      orderKey: crypto.randomUUID(), sku: "IPHONE-FLASH", qty: 1, coupon: "HALF_CAP1M",
    }});
    const order = await r.json();
    assertCouponMath(order, 20_000_000n, 1_000_000n, 1_000_000n); // giảm = trần
  });

  test("hai coupon không stackable → chỉ 1 áp dụng", async ({ request }) => {
    const r = await request.post("/api/checkout", { data: {
      orderKey: crypto.randomUUID(), sku: "IPHONE-FLASH", qty: 1,
      coupons: ["SALE10", "MINUS500K"],
    }});
    expect(r.status(), "từ chối chồng coupon cấm").toBe(422);
  });
});`),
    NOTE(
      "Mọi phép tính tiền dùng số nguyên đơn vị nhỏ nhất, làm tròn theo quy tắc cố định. Float gây sai một đồng — đủ để đối soát tài chính báo lệch.",
      "All money math uses integer minor units with a fixed rounding rule. Floats cause one-đồng errors — enough for financial reconciliation to flag a mismatch.",
      "すべての金銭計算は整数の最小単位を使い固定の丸め規則に従います。浮動小数点は1ドンの誤差を生み、金融の突合が不一致を報告するのに十分です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Ca lỗi sâu #3: timeout thanh toán & idempotent",
    en: "10. Deep failure #3: payment timeout & idempotency",
    ja: "10. 深い障害#3：決済タイムアウトと冪等性",
  },
  blocks: [
    P(
      "Dưới flash-sale, cổng thanh toán quá tải và timeout. Khách bấm lại, app tự retry — nếu hệ thống không idempotent, sẽ tạo hai đơn hoặc tính tiền hai lần. Bất biến: gửi cùng order_key nhiều lần chỉ tạo đúng một đơn và tính tiền một lần, và đơn có đúng một trạng thái cuối. Agent gửi song song nhiều bản sao cùng order_key qua nhánh mô phỏng timeout cổng thanh toán, rồi khẳng định không nhân đơn, không nhân tiền, không kẹt trạng thái trung gian vĩnh viễn.",
      "Under flash-sale, the payment gateway is overloaded and times out. The customer retries, the app auto-retries — if the system is not idempotent, it creates two orders or charges twice. Invariant: submitting the same order_key multiple times creates exactly one order and charges once, and the order has exactly one final state. The agent sends many copies of the same order_key in parallel through a simulated payment-gateway timeout branch, then asserts no duplicate order, no duplicate charge, and no permanently stuck intermediate state.",
      "フラッシュセール下では決済ゲートウェイが過負荷でタイムアウトします。顧客が再試行しアプリが自動再試行します。システムが冪等でなければ、2つの注文を作るか二重請求します。不変条件：同じorder_keyを複数回送信しても正確に1つの注文を作り1回請求し、注文は正確に1つの最終状態を持ちます。エージェントは決済ゲートウェイのタイムアウトを模擬した分岐を通じて同じorder_keyの多数のコピーを並行送信し、注文の重複なし、請求の重複なし、中間状態での永久停止なしを主張します。",
    ),
    CODE("typescript", `test("timeout cổng thanh toán + retry cùng order_key → idempotent", async ({ request }) => {
  await request.post("/api/test/gateway", { data: { mode: "TIMEOUT", ms: 8000 } });

  const orderKey = crypto.randomUUID();
  const payload = { orderKey, sku: "IPHONE-FLASH", qty: 1, coupon: null };

  // 10 lần retry SONG SONG cùng order_key (double-click + auto-retry)
  await Promise.all(Array.from({ length: 10 },
    () => request.post("/api/checkout", { data: payload }).catch(() => {})));

  const orders = await getOrdersByKey(orderKey);
  expect(orders.length, "đúng 1 đơn dù retry nhiều").toBe(1);
  assertOrderFinalUnique(orders.map(o => o.state));   // 1 trạng thái cuối
  const charges = await getCharges(orderKey);
  expect(charges.length, "chỉ tính tiền 1 lần").toBeLessThanOrEqual(1);
});`),
    TIP(
      "order_key nên là UNIQUE ở tầng DB. Chống trùng ở tầng ứng dụng vẫn hở dưới đua tranh; ràng buộc DB là tuyến chắc chắn.",
      "order_key should be UNIQUE at the DB layer. App-layer dedup still leaks under races; the DB constraint is the reliable line.",
      "order_keyはDB層でUNIQUEにすべきです。アプリ層の重複排除は競合下で漏れます。DB制約が確実な防衛線です。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Reset trạng thái & dữ liệu test tất định",
    en: "11. State reset & deterministic test data",
    ja: "11. 状態リセットと決定的なテストデータ",
  },
  blocks: [
    P(
      "Ca đồng thời chỉ đáng tin khi bắt đầu từ trạng thái sạch, xác định. Trước mỗi ca, agent gọi endpoint reset để đặt tồn kho, xoá đơn cũ, và nạp coupon theo seed cố định. Không có bước này, một ca 300 phiên có thể 'may mắn' xanh vì tồn còn sót từ lần trước. Ta cũng cô lập dữ liệu theo tenant/phiên để các ca song song không giẫm lên nhau. Tính tất định là điều kiện tiên quyết để phát lại và điều tra lỗi qua trace.",
      "Concurrency cases are only trustworthy starting from a clean, defined state. Before each case, the agent calls a reset endpoint to set inventory, clear old orders, and load coupons by a fixed seed. Without this, a 300-session case might 'luckily' pass because stock lingered from before. We also isolate data per tenant/session so parallel cases do not step on each other. Determinism is the prerequisite for replaying and investigating failures via trace.",
      "並行ケースはクリーンで定義された状態から始めてこそ信頼できます。各ケースの前に、エージェントはリセットエンドポイントを呼び、在庫を設定し、古い注文を消し、固定シードでクーポンを読み込みます。これなしでは、300セッションのケースが前回の在庫が残っていたため「運良く」合格し得ます。またテナント／セッションごとにデータを分離し、並行ケースが互いに踏まないようにします。決定性はトレースで障害を再現・調査する前提条件です。",
    ),
    CODE("typescript", `import { test as base } from "@playwright/test";

// Fixture reset trạng thái trước mỗi ca — dữ liệu tất định
export const test = base.extend<{ freshWorld: void }>({
  freshWorld: [async ({ request }, use, testInfo) => {
    await request.post("/api/test/reset", { data: {
      seed: 42,
      products: [{ sku: "IPHONE-FLASH", stock: 100, priceMinor: 20_000_000 }],
      coupons: [{ code: "SALE10", kind: "PERCENT", value: 10, maxOffMinor: 5_000_000 }],
      isolationKey: testInfo.testId,      // cô lập theo ca
    }});
    await use();
  }, { auto: true }],
});`),
    NOTE(
      "Reset qua endpoint test riêng, không dùng trong production. Seed cố định giúp một ca thất bại tái hiện y hệt khi điều tra.",
      "Reset via a dedicated test endpoint, never used in production. A fixed seed lets a failing case reproduce identically during investigation.",
      "専用のテストエンドポイントでリセットし、本番では使いません。固定シードにより障害ケースが調査時に同一に再現します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Tích hợp CI: cổng hồi quy cho checkout",
    en: "12. CI integration: a regression gate for checkout",
    ja: "12. CI統合：チェックアウトの回帰ゲート",
  },
  blocks: [
    P(
      "Bộ ca do agent sinh, sau khi qua cổng review, chạy trong CI như cổng hồi quy (回帰) bắt buộc. Pipeline dựng môi trường test với dữ liệu seed cố định, chạy nhóm ca đồng thời với nhiều worker, dùng Chrome for Testing cho phần UI, và giữ trace khi thất bại để Healer và người cùng phân tích. Ta gắn nhãn ca theo bất biến để báo cáo cho biết nhóm oracle nào vỡ. Cổng này chặn oversell hay lỗi coupon lọt ra trước mỗi lần phát hành, đặc biệt trước các đợt flash-sale lớn.",
      "The agent-generated suite, after the review gate, runs in CI as a mandatory regression gate (回帰). The pipeline builds a test environment with fixed seed data, runs concurrency case groups across many workers, uses Chrome for Testing for the UI part, and retains traces on failure so the Healer and a human can analyze together. We tag cases by invariant so the report tells which oracle group broke. This gate blocks oversell or coupon bugs from escaping before each release, especially ahead of big flash-sale events.",
      "エージェント生成のスイートは、レビューゲートの後、必須の回帰ゲートとしてCIで実行されます。パイプラインは固定シードデータでテスト環境を構築し、多数のワーカーで並行ケース群を実行し、UI部分にChrome for Testingを使い、失敗時にトレースを保持してHealerと人間が共同分析できるようにします。ケースを不変条件でタグ付けし、どのオラクル群が壊れたかレポートが示すようにします。このゲートは各リリース前、特に大きなフラッシュセールの前に超過販売やクーポンバグの流出を防ぎます。",
    ),
    CODE("yaml", `# .github/workflows/checkout-agent-regression.yml
name: checkout-agent-regression
on: [pull_request]
jobs:
  invariants:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps chromium   # Chrome for Testing
      - run: docker compose up -d shop-api                   # môi trường test
      - run: node scripts/reset-world.mjs --seed 42
      - run: npx playwright test tests/invariants --workers=10 --grep @oversell|@coupon|@idempotency
        env: { PW_TRACE: retain-on-failure-and-retries }
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: traces, path: test-results/**/trace.zip }`),
    TIP(
      "Chạy nhóm ca oversell với số worker cao để thật sự ép đồng thời trong CI. Đồng thời giả (tuần tự hoá ngầm) sẽ bỏ lọt lỗi tranh chấp.",
      "Run the oversell case group with high worker count to genuinely force concurrency in CI. Fake concurrency (implicit serialization) misses race bugs.",
      "超過販売ケース群を高いワーカー数で実行し、CIで本当に並行を強制します。偽の並行（暗黙の直列化）は競合バグを見逃します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Ranh giới AI-agent & góc phỏng vấn",
    en: "13. AI-agent boundary & interview angle",
    ja: "13. AIエージェントの境界と面接での論点",
  },
  blocks: [
    P(
      "Kết lại: AI test agent giúp phủ nhanh không gian ca đồng thời và biên mà con người khó dựng tay, nhưng nó không tự quyết đúng/sai. Nó có thể ảo giác (ハルシネーション) một luồng không tồn tại, nên mọi locator/endpoint phải xác thực trên hệ thật (grounding), oracle luôn do con người sở hữu, và ca rủi ro phải qua cổng review. Trong phỏng vấn, hãy nhấn: đặt oracle ở tầng API để đo bất biến, chống flaky bằng tất định, và giải thích vì sao 'assert bất biến' vượt trội 'assert thành công'.",
      "In sum: the AI test agent quickly covers concurrency and edge case space that humans struggle to hand-build, but it does not decide pass/fail on its own. It can hallucinate (ハルシネーション) a non-existent flow, so every locator/endpoint must be grounded on the real system, the oracle is always human-owned, and risky cases pass a review gate. In interviews, stress: put the oracle at the API layer to measure invariants, prevent flakiness through determinism, and explain why 'assert invariants' beats 'assert success'.",
      "まとめ：AIテストエージェントは人間が手作業で構築しにくい並行・境界ケース空間を素早く網羅しますが、合否を自ら決めません。存在しないフローをハルシネーションし得るので、すべてのロケーター／エンドポイントは実システムでグラウンディングされ、オラクルは常に人間が所有し、危険なケースはレビューゲートを通ります。面接では強調しましょう。不変条件を測るためオラクルをAPI層に置く、決定性でフレーキーを防ぐ、「不変条件を主張する」が「成功を主張する」に勝る理由を説明する。",
    ),
    QA(
      "Vì sao đặt oracle ở tầng API mà không phải UI cho flash-sale?",
      "Why place the oracle at the API layer rather than UI for flash-sale?",
      "Vì UI có độ trễ, cache và hiển thị lạc quan; nó không phải nguồn sự thật về tồn kho hay tiền. API/DB nhanh, tất định và đo được bất biến (không oversell, tổng tiền đúng). UI vẫn kiểm nhưng chỉ cho trải nghiệm, không quyết đạt/không.",
      "Because the UI has latency, cache and optimistic rendering; it is not the source of truth about inventory or money. The API/DB is fast, deterministic and measures invariants (no oversell, correct total). The UI is still checked but only for experience, not to decide pass/fail.",
      "フラッシュセールでオラクルをUIでなくAPI層に置く理由は？",
      "UIには遅延、キャッシュ、楽観的表示があり、在庫や資金の真実の源ではないからです。API／DBは高速で決定的、不変条件（超過販売なし、正しい合計）を測れます。UIは確認しますが体験のためだけで、合否を決めません。",
    ),
    QA(
      "Oracle then chốt cho ca oversell là gì?",
      "What is the key oracle for the oversell case?",
      "Không phải 'đặt hàng thành công' mà là tổng số bán ≤ tồn ban đầu và tồn kho không bao giờ âm, dù bao nhiêu phiên tranh chấp song song. Đây là bất biến chống oversell, thực thi tốt nhất bằng ràng buộc DB và trừ có điều kiện.",
      "Not 'order placed' but total sold ≤ initial stock and stock never negative, no matter how many sessions race in parallel. This is the anti-oversell invariant, best enforced by a DB constraint and conditional decrement.",
      "超過販売ケースの重要なオラクルは何か？",
      "「注文成功」ではなく、いくつのセッションが並行で競合しても、総販売数が初期在庫以下で在庫が決して負にならないことです。これが超過販売防止の不変条件で、DB制約と条件付き減算で最もよく強制されます。",
    ),
    QA(
      "Làm sao để ca đồng thời do agent sinh không bị flaky?",
      "How do you keep agent-generated concurrency cases from being flaky?",
      "Reset trạng thái sạch trước mỗi ca, seed cố định, cô lập dữ liệu theo ca, và dùng chờ theo điều kiện thay vì sleep. Mọi ca phải phát lại tất định qua trace; ca nào không tái hiện được thì không vào hồi quy.",
      "Reset to a clean state before each case, fixed seed, per-case data isolation, and condition-based waiting instead of sleep. Every case must deterministically replay via trace; a case that cannot reproduce does not enter regression.",
      "エージェント生成の並行ケースをフレーキーにしないには？",
      "各ケース前にクリーンな状態へリセットし、固定シード、ケースごとのデータ分離、sleepの代わりに条件ベースの待機を使います。すべてのケースはトレースで決定的に再現せねばならず、再現できないケースは回帰に入れません。",
    ),
    QA(
      "Ranh giới nào phải giữ khi cho agent tự sinh ca coupon/hoàn tiền?",
      "What boundary must you keep when letting the agent generate coupon/refund cases?",
      "Agent chỉ tạo dữ liệu tổng hợp trên môi trường test, không chạm dữ liệu khách thật. Ca hoàn tiền, coupon chồng lớp phải qua cổng human review để người xác nhận oracle (tổng ≥ 0, giảm ≤ trần) trước khi vào hồi quy.",
      "The agent only creates synthetic data on the test environment, never real customer data. Refund and stacked-coupon cases must pass a human review gate for a person to confirm the oracle (total ≥ 0, discount ≤ cap) before entering regression.",
      "エージェントにクーポン／返金ケースを生成させる際に守るべき境界は？",
      "エージェントはテスト環境で合成データのみ作成し、実顧客データに触れません。返金や重ねクーポンのケースは、回帰に入る前に人間がオラクル（合計0以上、割引が上限以下）を確認する人間レビューゲートを通さねばなりません。",
    ),
  ],
});

export const AIAGENT_07 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-banking-agent-transfer-reconciliation",
    cover: coverA,
    tags: tags("thucchien", "banking", "aitesting", "api", "realworld", "advanced"),
    title: {
      vi: "AI test agent cho chuyển khoản liên ngân hàng & đối soát",
      en: "An AI test agent for interbank transfer & reconciliation",
      ja: "銀行間送金と突合のためのAIテストエージェント",
    },
    summary: {
      vi: "Xây dựng một AI test agent kiểm thử luồng chuyển khoản liên ngân hàng và đối soát NAPAS ở quy mô doanh nghiệp: kiến trúc, mô hình dữ liệu, bất biến làm oracle (bảo toàn tiền theo bút toán kép, tính idempotent, trạng thái cuối duy nhất, khớp đối soát), cách agent tự sinh ca kiểm thử trong guardrail còn con người giữ ca rủi ro, các ca lỗi sâu, CI và góc phỏng vấn.",
      en: "Build an AI test agent that tests interbank transfer and NAPAS reconciliation at enterprise scale: architecture, data model, invariants as the oracle (double-entry money conservation, idempotency, final-state uniqueness, reconciliation match), how the agent generates cases under guardrails while humans own the risky ones, deep failure cases, CI and interview angle.",
      ja: "エンタープライズ規模で銀行間送金とNAPAS突合を検証するAIテストエージェントを構築します。アーキテクチャ、データモデル、オラクルとしての不変条件（複式簿記による資金保存、冪等性、最終状態の一意性、突合の一致）、ガードレール内でエージェントがケースを生成し人間が危険なケースを担当する方法、深い障害ケース、CI、面接での論点を扱います。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-ecommerce-agent-checkout-flashsale",
    cover: coverB,
    tags: tags("thucchien", "ecommerce", "aitesting", "playwright", "realworld", "experience"),
    title: {
      vi: "AI test agent khám phá & kiểm thử checkout dưới flash-sale",
      en: "An AI test agent exploring & testing checkout under flash-sale",
      ja: "フラッシュセール下のチェックアウトを探索・検証するAIテストエージェント",
    },
    summary: {
      vi: "Một AI test agent khám phá và kiểm thử luồng checkout dưới áp lực flash-sale: bất biến (tồn kho không âm/không oversell, toán coupon đúng, trạng thái đơn cuối), ca đồng thời và biên do agent tự sinh, cổng review của con người, oracle qua API so với UI, CI và góc phỏng vấn.",
      en: "An AI test agent that explores and tests the checkout flow under flash-sale pressure: invariants (inventory never negative / no oversell, correct coupon math, order final-state), agent-generated concurrency and edge cases, a human review gate, API oracle vs UI, CI and interview angle.",
      ja: "フラッシュセールの負荷下でチェックアウトフローを探索・検証するAIテストエージェントです。不変条件（在庫が負にならない・超過販売しない、正しいクーポン計算、注文の最終状態）、エージェントが生成する並行・境界ケース、人間のレビューゲート、UIに対するAPIオラクル、CI、面接での論点を扱います。",
    },
    pages: buildDoc(pagesB),
  },
];
