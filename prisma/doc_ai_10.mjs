// ============================================================================
// AI_DOCS_10 — 2 bài "AI trong kiểm thử tích hợp" (2026, kind=tichhop).
// A: Integrated Playwright (E2E) + API + k6 (perf) + AI observability (fintech).
// B: End-to-end AI-agent QA cho SaaS multi-tenant (RBAC + billing).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "ai10a", domain: "fintech", kind: "tichhop", label: "AI + PERF + OBS" });
const coverB = makeThumb({ id: "ai10b", domain: "saas", kind: "tichhop", label: "MULTI-TENANT AI QA" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn) — Article A
// ---------------------------------------------------------------------------
const SVG_LAYERS = `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="340" fill="#0b1220"/>
<text x="320" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Kim tự tháp tích hợp: E2E · API · Perf · Observability</text>
<rect x="200" y="46" width="240" height="46" rx="8" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="320" y="69" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">E2E (Playwright)</text>
<text x="320" y="85" text-anchor="middle" font-size="9.5" fill="#a5b4fc">luồng người dùng thật · ít · đắt</text>
<rect x="140" y="104" width="360" height="46" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="127" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">API tests (request context)</text>
<text x="320" y="143" text-anchor="middle" font-size="9.5" fill="#7dd3fc">hợp đồng · trạng thái · idempotency · nhanh</text>
<rect x="80" y="162" width="480" height="46" rx="8" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="320" y="185" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">Performance (k6) — thresholds = SLO gate</text>
<text x="320" y="201" text-anchor="middle" font-size="9.5" fill="#5eead4">p95 · error rate · throughput · so với ngân sách SLO</text>
<rect x="40" y="220" width="560" height="52" rx="8" fill="#422006" stroke="#f59e0b" stroke-width="2"/>
<text x="320" y="243" text-anchor="middle" font-size="13" font-weight="800" fill="#fde68a">Observability (trace · log · metric) — nền chung</text>
<text x="320" y="260" text-anchor="middle" font-size="9.5" fill="#fbbf24">mọi tầng gắn trace-id · AI đọc tín hiệu để triage xuyên tầng</text>
<text x="320" y="298" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e2e8f0">Chia sẻ fixture · dữ liệu · trace-id giữa các tầng — AI triage khi bất kỳ tầng nào đỏ</text>
<text x="320" y="320" text-anchor="middle" font-size="10.5" fill="#64748b">SLO là oracle của tầng perf; hợp đồng là oracle của tầng API; bất biến nghiệp vụ là oracle của E2E</text>
</svg>`;

const SVG_CORRELATE = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="320" fill="#0b1220"/>
<text x="320" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">AI tương quan regression perf với trace/log</text>
<rect x="30" y="52" width="150" height="70" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="105" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">k6 run</text>
<text x="105" y="100" text-anchor="middle" font-size="9.5" fill="#5eead4">p95 320→890ms ✗</text>
<rect x="245" y="52" width="150" height="70" rx="10" fill="#422006" stroke="#f59e0b" stroke-width="2"/>
<text x="320" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#fde68a">Trace (OTel)</text>
<text x="320" y="100" text-anchor="middle" font-size="9.5" fill="#fbbf24">span DB N+1 mới</text>
<rect x="460" y="52" width="150" height="70" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="535" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Log</text>
<text x="535" y="100" text-anchor="middle" font-size="9.5" fill="#7dd3fc">slow query warn</text>
<defs><marker id="cr1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#cr1)"><path d="M180 87 h55"/><path d="M395 87 h55"/></g>
<rect x="120" y="170" width="400" height="80" rx="12" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="320" y="198" text-anchor="middle" font-size="13" font-weight="800" fill="#c7d2fe">AI triage engine</text>
<text x="320" y="220" text-anchor="middle" font-size="10" fill="#a5b4fc">nối trace-id · so baseline · gom tín hiệu 3 tầng</text>
<text x="320" y="238" text-anchor="middle" font-size="10" fill="#a5b4fc">→ giả thuyết: "commit abc123 thêm N+1 ở OrderRepo"</text>
<g stroke="#818cf8" stroke-width="2" fill="none" stroke-dasharray="5 4" marker-end="url(#cr1)"><path d="M105 122 v40 h15"/><path d="M320 122 v40"/><path d="M535 122 v40 h-15"/></g>
<text x="320" y="290" text-anchor="middle" font-size="11" font-weight="700" fill="#fbbf24">AI đề xuất giả thuyết — người xác nhận bằng bằng chứng, không tin lời kể</text>
</svg>`;

// ---------------------------------------------------------------------------
// SVG helpers — Article B (multi-tenant SaaS)
// ---------------------------------------------------------------------------
const SVG_TENANT = `<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="340" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bất biến cô lập tenant: không rò dữ liệu chéo (テナント分離)</text>
<rect x="40" y="56" width="230" height="150" rx="12" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="155" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Tenant A (Acme)</text>
<g font-size="10" fill="#bae6fd"><text x="58" y="108">users: alice(admin), bob(viewer)</text>
<text x="58" y="130">invoices: INV-A-001 … A-042</text>
<text x="58" y="152">data scope = tenant_id = A</text>
<text x="58" y="178">RBAC: admin ⊃ editor ⊃ viewer</text></g>
<rect x="390" y="56" width="230" height="150" rx="12" fill="#3b0764" stroke="#c084fc" stroke-width="2"/>
<text x="505" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#f3e8ff">Tenant B (Globex)</text>
<g font-size="10" fill="#e9d5ff"><text x="408" y="108">users: carol(admin), dan(editor)</text>
<text x="408" y="130">invoices: INV-B-001 … B-118</text>
<text x="408" y="152">data scope = tenant_id = B</text>
<text x="408" y="178">RBAC: admin ⊃ editor ⊃ viewer</text></g>
<line x1="330" y1="56" x2="330" y2="206" stroke="#f87171" stroke-width="2.5" stroke-dasharray="7 5"/>
<text x="330" y="224" text-anchor="middle" font-size="11" font-weight="800" fill="#fca5a5">TƯỜNG CÔ LẬP — bob KHÔNG BAO GIỜ thấy INV-B-*</text>
<rect x="120" y="242" width="420" height="76" rx="10" fill="#111827" stroke="#334155"/>
<text x="330" y="266" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Oracle #1: mọi truy vấn LỌC theo tenant_id — không có ngoại lệ</text>
<text x="330" y="288" text-anchor="middle" font-size="10.5" fill="#94a3b8">Oracle #2: RBAC — quyền của user ≤ quyền role trong tenant CỦA HỌ</text>
<text x="330" y="308" text-anchor="middle" font-size="10.5" fill="#64748b">Rò 1 dòng dữ liệu chéo tenant = sự cố nghiêm trọng, không phải "bug nhỏ"</text>
</svg>`;

const SVG_AGENT_LOOP = `<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="660" height="340" fill="#0b1220"/>
<text x="330" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Agent QA thăm dò có guardrail: UI + API + kiểm dữ liệu</text>
<rect x="30" y="58" width="140" height="72" rx="10" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="100" y="86" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">PLAN</text>
<text x="100" y="106" text-anchor="middle" font-size="9" fill="#a5b4fc">chọn bất biến để</text>
<text x="100" y="119" text-anchor="middle" font-size="9" fill="#a5b4fc">tấn công (isolation)</text>
<rect x="200" y="58" width="140" height="72" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="270" y="86" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">ACT</text>
<text x="270" y="106" text-anchor="middle" font-size="9" fill="#5eead4">đăng nhập tenant A</text>
<text x="270" y="119" text-anchor="middle" font-size="9" fill="#5eead4">gọi API xin data B</text>
<rect x="370" y="58" width="140" height="72" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="440" y="86" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">OBSERVE</text>
<text x="440" y="106" text-anchor="middle" font-size="9" fill="#7dd3fc">UI + API + query DB</text>
<text x="440" y="119" text-anchor="middle" font-size="9" fill="#7dd3fc">3 nguồn đối chiếu</text>
<rect x="540" y="58" width="90" height="72" rx="10" fill="#3f0d0d" stroke="#f87171" stroke-width="2"/>
<text x="585" y="86" text-anchor="middle" font-size="11" font-weight="800" fill="#fecaca">CHECK</text>
<text x="585" y="106" text-anchor="middle" font-size="9" fill="#fca5a5">bất biến giữ?</text>
<text x="585" y="119" text-anchor="middle" font-size="9" fill="#fca5a5">→ report</text>
<defs><marker id="al1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#al1)"><path d="M170 94 h30"/><path d="M340 94 h30"/><path d="M510 94 h30"/></g>
<path d="M585 130 v24 h-485 v-24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#al1)"/>
<text x="342" y="170" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fbbf24">vòng lặp có ngân sách bước · timeout · phạm vi tenant test cố định</text>
<rect x="30" y="192" width="600" height="126" rx="9" fill="#052e16" stroke="#34d399" stroke-width="1.5"/>
<text x="330" y="216" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">GUARDRAIL — agent bị chặn cứng</text>
<g font-size="10.5" fill="#d1fae5"><text x="48" y="242">✓ chỉ chạy trên tenant test (A_test, B_test), không tenant thật</text>
<text x="48" y="264">✓ token quyền thấp, hết hạn ngắn; whitelist domain staging</text>
<text x="48" y="286">✓ mọi phát hiện → report + trace, KHÔNG tự sửa code/oracle</text>
<text x="48" y="308">✗ không seed tiền thật · không xoá tenant · không đổi RBAC config</text></g>
</svg>`;

// ===========================================================================
// ARTICLE A — Integrated Playwright + API + k6 + AI observability (fintech)
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh: vì sao fintech cần kiểm thử tích hợp nhiều tầng",
      en: "1. Context: why fintech needs layered integrated testing",
      ja: "1. 背景: なぜフィンテックは多層の統合テストを必要とするか",
    },
    blocks: [
      P(
        "Một nền tảng fintech chuyển tiền không giống một trang blog: mỗi request có thể di chuyển tiền thật, và một lỗi nhỏ ở tầng nào cũng có thể biến thành thiệt hại tài chính hoặc vi phạm tuân thủ. Chính vì thế, kiểm thử một tầng đơn lẻ là không đủ. Bạn có thể có một giao diện đẹp mà API trả sai số dư; bạn có thể có API đúng hợp đồng nhưng sập dưới tải giờ cao điểm; bạn có thể có hệ thống nhanh mà không ai biết vì sao một giao dịch treo. Bài viết này trình bày một chiến lược tích hợp bốn tầng — Playwright cho E2E, API tests cho hợp đồng và trạng thái, k6 cho hiệu năng, và observability làm nền chung — với AI đóng vai trò phân loại lỗi xuyên tầng thay vì thay thế người kiểm thử.",
        "A money-moving fintech platform is unlike a blog: every request may move real money, and a small fault in any layer can turn into financial loss or a compliance breach. That is exactly why testing a single layer is not enough. You can have a beautiful UI while the API returns the wrong balance; you can have a contract-correct API that collapses under peak load; you can have a fast system where nobody knows why one transaction hangs. This article lays out a four-layer integrated strategy — Playwright for E2E, API tests for contract and state, k6 for performance, and observability as the shared foundation — with AI playing the role of cross-layer failure triage rather than replacing the tester.",
        "送金を扱うフィンテックプラットフォームはブログとは違います。あらゆるリクエストが実際のお金を動かす可能性があり、どの層の小さな欠陥も金銭的損失やコンプライアンス違反に変わり得ます。だからこそ単一層のテストでは不十分です。UI は美しくても API が誤った残高を返すことがあり、契約上正しい API がピーク負荷で崩れることがあり、速いシステムでも一つの取引がなぜ停止するか誰も分からないことがあります。本記事は四層の統合戦略——E2E に Playwright、契約と状態に API テスト、性能に k6、共有基盤に可観測性——を示し、AI はテスターを置き換えるのではなく層をまたぐ障害トリアージの役割を担います。",
      ),
      P(
        "Kịch bản xuyên suốt bài là một luồng nạp tiền và chuyển khoản: người dùng đăng nhập, nạp tiền vào ví, chuyển cho người khác, và hệ thống phải giữ những bất biến tuyệt đối như tổng tiền được bảo toàn theo bút toán kép, không bao giờ tạo hai giao dịch từ một lần bấm, và số dư không bao giờ âm. Bốn tầng kiểm thử cùng bảo vệ những bất biến này ở các góc nhìn khác nhau. E2E chứng minh luồng người dùng thật hoạt động; API tests chứng minh trạng thái và hợp đồng đúng ở tốc độ cao; k6 chứng minh hệ thống giữ đúng các bất biến đó cả khi chịu tải; observability cho phép truy vết chính xác một giao dịch cụ thể khi có sự cố.",
        "The through-line scenario is a top-up and transfer flow: the user logs in, tops up their wallet, transfers to someone else, and the system must hold absolute invariants such as total money conserved by double-entry, never creating two transactions from one click, and balance never going negative. The four testing layers together protect these invariants from different angles. E2E proves the real user flow works; API tests prove state and contract are correct at high speed; k6 proves the system still holds those invariants under load; observability lets you trace a specific transaction precisely when an incident happens.",
        "本記事を貫くシナリオはチャージと送金のフローです。ユーザーがログインし、ウォレットにチャージし、他者へ送金します。システムは複式簿記で総額が保存される、一度のクリックから二つの取引を決して作らない、残高が決して負にならない、といった絶対的な不変条件を保たねばなりません。四つのテスト層はこれらの不変条件を異なる角度から共に守ります。E2E は実ユーザーのフローが動くことを証明し、API テストは状態と契約が高速で正しいことを証明し、k6 は負荷下でもその不変条件を保つことを証明し、可観測性はインシデント発生時に特定の取引を正確に追跡させます。",
      ),
      IMG(
        SVG_LAYERS,
        "Kim tự tháp bốn tầng: E2E, API, Perf, Observability — chia sẻ fixture, dữ liệu và trace-id.",
        "The four-layer pyramid: E2E, API, Perf, Observability — sharing fixtures, data, and trace-id.",
        "四層のピラミッド: E2E・API・性能・可観測性——フィクスチャ・データ・trace-id を共有。",
      ),
      NOTE(
        "Tích hợp không có nghĩa là gộp tất cả vào một test khổng lồ. Nó nghĩa là các tầng chia sẻ dữ liệu, fixture và một trace-id chung, để khi một tầng đỏ, bạn truy được nguyên nhân ở tầng khác.",
        "Integration does not mean cramming everything into one giant test. It means the layers share data, fixtures, and a common trace-id, so when one layer goes red you can trace the cause into another layer.",
        "統合とはすべてを一つの巨大なテストに詰め込むことではありません。層がデータ・フィクスチャ・共通の trace-id を共有し、ある層が赤になったとき原因を別の層へ追跡できることを意味します。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Chiến lược phân tầng: mỗi tầng có oracle riêng",
      en: "2. Layered strategy: each layer has its own oracle",
      ja: "2. 層別戦略: 各層に固有のオラクル",
    },
    blocks: [
      P(
        "Sức mạnh của chiến lược tích hợp nằm ở chỗ mỗi tầng có một oracle rõ ràng và khác nhau, nên chúng không trùng lặp mà bổ sung cho nhau. Oracle của tầng E2E là bất biến nghiệp vụ nhìn từ mắt người dùng: sau khi chuyển tiền, số dư hiển thị đúng và lịch sử giao dịch phản ánh đúng. Oracle của tầng API là hợp đồng và trạng thái: đúng schema, đúng mã trạng thái, và quan trọng nhất là tính idempotency — gửi lại cùng một request không tạo giao dịch thứ hai. Oracle của tầng perf là SLO: p95 độ trễ dưới ngưỡng, tỉ lệ lỗi dưới ngưỡng, throughput đạt mục tiêu. Oracle của tầng observability không phải một khẳng định pass/fail mà là khả năng truy vết: mọi giao dịch phải có trace-id đi xuyên các dịch vụ.",
        "The power of the integrated strategy lies in each layer having a clear and distinct oracle, so they don't overlap but complement each other. The E2E layer's oracle is the business invariant seen through the user's eyes: after a transfer, the displayed balance is correct and the transaction history reflects it. The API layer's oracle is contract and state: correct schema, correct status code, and most importantly idempotency — resending the same request creates no second transaction. The perf layer's oracle is the SLO: p95 latency under threshold, error rate under threshold, throughput hits target. The observability layer's oracle is not a pass/fail assertion but traceability: every transaction must carry a trace-id across services.",
        "統合戦略の強みは、各層が明確で異なるオラクルを持ち、重複せず互いを補完する点にあります。E2E 層のオラクルはユーザーの目から見た業務不変条件です。送金後、表示残高が正しく取引履歴がそれを反映します。API 層のオラクルは契約と状態です。正しいスキーマ、正しいステータスコード、そして最も重要な冪等性——同じリクエストを再送しても二つ目の取引を作らない。性能層のオラクルは SLO です。p95 レイテンシが閾値未満、エラー率が閾値未満、スループットが目標に達する。可観測性層のオラクルは合否のアサーションではなく追跡可能性です。すべての取引はサービスをまたぐ trace-id を持たねばなりません。",
      ),
      UL(
        [
          "E2E (Playwright): oracle = bất biến nghiệp vụ qua UI — số dư, lịch sử, thông báo đúng.",
          "API: oracle = hợp đồng + trạng thái + idempotency (冪等性) — schema, status, không tạo giao dịch trùng.",
          "Perf (k6): oracle = SLO — p95, error rate, throughput so với ngân sách đã thoả thuận.",
          "Observability: oracle = truy vết — mọi giao dịch có trace-id xuyên dịch vụ, log có cấu trúc.",
        ],
        [
          "E2E (Playwright): oracle = business invariant via UI — balance, history, messages correct.",
          "API: oracle = contract + state + idempotency (冪等性) — schema, status, no duplicate transaction.",
          "Perf (k6): oracle = SLO — p95, error rate, throughput against the agreed budget.",
          "Observability: oracle = traceability — every transaction has a trace-id across services, structured logs.",
        ],
        [
          "E2E (Playwright): オラクル = UI を通した業務不変条件——残高・履歴・メッセージが正しい。",
          "API: オラクル = 契約 + 状態 + 冪等性——スキーマ・ステータス・重複取引なし。",
          "性能 (k6): オラクル = SLO——p95・エラー率・スループットを合意済み予算と比較。",
          "可観測性: オラクル = 追跡可能性——全取引がサービスをまたぐ trace-id を持ち、構造化ログを備える。",
        ],
      ),
      P(
        "Điểm mấu chốt là các oracle này phải nhất quán với nhau. Nếu tầng API khẳng định idempotency nhưng tầng perf lại tạo tải bằng cách gửi cùng một idempotency-key hàng nghìn lần và mong đợi hàng nghìn giao dịch, thì hai tầng đang mâu thuẫn và một trong hai có oracle sai. Khi thiết kế bộ kiểm thử tích hợp, bạn phải ngồi lại và viết ra danh sách bất biến nghiệp vụ chung, rồi ánh xạ mỗi bất biến vào tầng phù hợp nhất để kiểm nó. Đây là công việc phán đoán của con người mà AI không tự làm thay được: AI có thể sinh test cho từng tầng, nhưng chính bạn phải quyết định bất biến nào thuộc về tầng nào.",
        "The crucial point is that these oracles must be consistent with each other. If the API layer asserts idempotency but the perf layer generates load by sending the same idempotency-key thousands of times and expects thousands of transactions, the two layers contradict each other and one of them has a wrong oracle. When designing an integrated suite, you must sit down and write out the shared list of business invariants, then map each invariant to the layer best suited to check it. This is human judgment work that AI cannot do for you: AI can generate tests for each layer, but you must decide which invariant belongs to which layer.",
        "重要な点は、これらのオラクルが互いに整合していなければならないことです。API 層が冪等性を主張するのに、性能層が同じ idempotency-key を何千回も送って何千件の取引を期待するなら、二つの層は矛盾しており、どちらかのオラクルが誤っています。統合スイートを設計するとき、共有された業務不変条件の一覧を書き出し、各不変条件を検証に最も適した層へ対応付けねばなりません。これは AI が代われない人間の判断作業です。AI は各層のテストを生成できますが、どの不変条件がどの層に属するかはあなたが決めねばなりません。",
      ),
      TIP(
        "Viết một 'invariant registry' — một file liệt kê mọi bất biến nghiệp vụ và tầng chịu trách nhiệm kiểm. Nó là nguồn sự thật để tránh oracle mâu thuẫn giữa các tầng.",
        "Write an 'invariant registry' — a file listing every business invariant and the layer responsible for checking it. It is the source of truth that prevents contradictory oracles across layers.",
        "「不変条件レジストリ」を書きましょう——あらゆる業務不変条件と、その検証を担う層を列挙したファイルです。層間の矛盾したオラクルを防ぐ真実の源となります。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Chia sẻ fixture và dữ liệu giữa các tầng",
      en: "3. Sharing fixtures and data across layers",
      ja: "3. 層をまたいだフィクスチャとデータの共有",
    },
    blocks: [
      P(
        "Một sai lầm phổ biến là mỗi tầng tự tạo dữ liệu riêng: E2E tạo một người dùng, API tests tạo người dùng khác, k6 lại tạo một tập thứ ba. Kết quả là bạn không thể tương quan kết quả giữa các tầng, và mỗi tầng mang một sự mong manh khác nhau. Cách làm đúng là tập trung việc tạo dữ liệu vào một lớp fixture dùng chung: một hàm tạo người dùng test, nạp số dư ban đầu, và trả về thông tin đăng nhập cùng các định danh mà mọi tầng đều dùng. Playwright gọi nó qua request context, k6 gọi nó qua một bước setup, và cả hai cùng thao tác trên cùng một loại tài khoản đã biết trước bất biến.",
        "A common mistake is each layer creating its own data: E2E makes one user, API tests make another, k6 creates a third set. The result is you cannot correlate results across layers, and each layer carries a different fragility. The right approach is to centralize data creation in a shared fixture layer: one function that creates a test user, seeds an initial balance, and returns login credentials plus identifiers that every layer uses. Playwright calls it via the request context, k6 calls it via a setup step, and both operate on the same kind of account whose invariants are known in advance.",
        "よくある間違いは各層が自前のデータを作ることです。E2E が一人のユーザーを作り、API テストが別のユーザーを作り、k6 が三つ目のセットを作る。結果として層をまたいで結果を相関できず、各層が異なる脆さを抱えます。正しいやり方はデータ作成を共有フィクスチャ層に集約することです。テストユーザーを作り、初期残高を投入し、ログイン資格情報とすべての層が使う識別子を返す一つの関数です。Playwright は request context 経由で、k6 は setup ステップ経由でそれを呼び、両者は不変条件が事前に分かっている同種のアカウントを操作します。",
      ),
      CODE(
        "ts",
        `// fixtures/wallet.ts — lớp tạo dữ liệu DÙNG CHUNG cho mọi tầng
import { request as pwRequest } from '@playwright/test';

export interface SeededUser {
  userId: string; email: string; pass: string;
  walletId: string; initialBalance: number;
}

// Gọi từ Playwright fixture, từ setup của k6 (qua HTTP), từ CI seed.
export async function seedWallet(baseURL: string, initialBalance = 100_000): Promise<SeededUser> {
  const ctx = await pwRequest.newContext({ baseURL });
  const res = await ctx.post('/test-support/seed-wallet', {
    data: { initialBalance },
    headers: { 'x-test-support': process.env.TEST_SUPPORT_TOKEN! },
  });
  if (!res.ok()) throw new Error('seedWallet failed: ' + res.status());
  const user = await res.json();
  await ctx.dispose();
  return user; // { userId, email, pass, walletId, initialBalance }
}`,
      ),
      P(
        "Endpoint test-support ở trên chỉ tồn tại trong môi trường test và được bảo vệ bằng một token riêng, không bao giờ bật ở production. Nó cho phép mọi tầng tạo dữ liệu sạch một cách nhanh và tất định thay vì phải bấm qua UI để đăng ký. Nhờ tập trung như vậy, khi bạn đổi mô hình dữ liệu ví, bạn chỉ sửa một chỗ và cả bốn tầng tự động dùng dữ liệu mới. Đây cũng là nơi bạn cài đặt các bất biến ban đầu: số dư khởi tạo, trạng thái tài khoản, hạn mức — để mọi tầng bắt đầu từ cùng một điểm xuất phát đã biết.",
        "The test-support endpoint above exists only in the test environment and is protected by a dedicated token, never enabled in production. It lets every layer create clean data quickly and deterministically instead of clicking through the UI to register. Thanks to this centralization, when you change the wallet data model you edit one place and all four layers automatically use the new data. It is also where you set up initial invariants: seed balance, account status, limits — so every layer starts from the same known origin.",
        "上の test-support エンドポイントはテスト環境にのみ存在し、専用トークンで保護され、本番では決して有効になりません。UI をクリックして登録する代わりに、すべての層がクリーンなデータを高速かつ決定論的に作れます。この集約のおかげで、ウォレットのデータモデルを変更するときは一箇所を編集するだけで四層すべてが自動的に新しいデータを使います。ここは初期不変条件を設定する場所でもあります。初期残高、アカウント状態、限度額——すべての層が同じ既知の起点から始まるように。",
      ),
      WARN(
        "Endpoint test-support là con dao hai lưỡi. Nếu vô tình bật ở production, ai đó có thể tạo ví và tiền tuỳ ý. Bảo vệ bằng token, cờ môi trường, và tuyệt đối không đưa vào build production.",
        "The test-support endpoint is double-edged. If accidentally enabled in production, someone could create wallets and money at will. Protect it with a token, an environment flag, and never ship it in the production build.",
        "test-support エンドポイントは諸刃の剣です。誤って本番で有効になれば、誰かが自由にウォレットとお金を作れてしまいます。トークン、環境フラグで保護し、本番ビルドには決して含めないでください。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Tầng E2E: Playwright kiểm luồng nạp tiền và chuyển khoản",
      en: "4. The E2E layer: Playwright checks the top-up and transfer flow",
      ja: "4. E2E 層: Playwright がチャージと送金のフローを検証",
    },
    blocks: [
      P(
        "Tầng E2E chứng minh rằng một người dùng thật có thể hoàn thành luồng nghiệp vụ và các bất biến hiển thị đúng. Điều cần tránh là viết test E2E chỉ kiểm 'có toast thành công' — đó là oracle hời hợt. Test E2E tốt cho fintech phải đọc số dư trước, thực hiện chuyển khoản qua giao diện, rồi khẳng định số dư sau đúng bằng số dư trước trừ đi số tiền chuyển và phí. Nó cũng phải kiểm lịch sử giao dịch xuất hiện đúng một dòng mới, không phải hai. Vì E2E chậm và đắt, ta chỉ giữ vài luồng quan trọng nhất ở tầng này và đẩy phần kiểm tổ hợp xuống tầng API.",
        "The E2E layer proves a real user can complete the business flow and that invariants display correctly. What to avoid is writing an E2E test that only checks 'a success toast appeared' — that is a shallow oracle. A good fintech E2E test reads the balance before, performs the transfer through the UI, then asserts the after-balance equals the before-balance minus the transferred amount and fee. It must also check the transaction history shows exactly one new row, not two. Because E2E is slow and expensive, we keep only the few most important flows at this layer and push combinatorial checking down to the API layer.",
        "E2E 層は実ユーザーが業務フローを完了でき、不変条件が正しく表示されることを証明します。避けるべきは「成功トーストが出た」だけを確認する E2E テストです——それは表面的なオラクルです。優れたフィンテック E2E テストは、前の残高を読み、UI を通して送金を実行し、後の残高が前の残高から送金額と手数料を引いた値に等しいことをアサートします。取引履歴が二行ではなく正確に一行の新規行を示すことも確認せねばなりません。E2E は遅く高価なので、この層には最重要フローだけを残し、組み合わせ検証は API 層へ押し下げます。",
      ),
      CODE(
        "ts",
        `// tests/e2e/transfer.spec.ts — oracle nghiệp vụ, không chỉ "toast success"
import { test, expect } from './seed.spec';

test('chuyển khoản giữ bất biến số dư và lịch sử', async ({ authedPage: page, sender, receiver }) => {
  await page.goto('/wallet');
  const before = Number((await page.getByTestId('balance').innerText()).replace(/\\D/g, ''));

  await page.getByRole('button', { name: 'Chuyển tiền' }).click();
  await page.getByLabel('Người nhận').fill(receiver.email);
  await page.getByLabel('Số tiền').fill('20000');
  await page.getByRole('button', { name: 'Xác nhận' }).click();

  await expect(page.getByRole('status')).toHaveText(/Thành công/);
  // Oracle 1: số dư giảm ĐÚNG số tiền + phí (giả sử phí 0)
  const after = Number((await page.getByTestId('balance').innerText()).replace(/\\D/g, ''));
  expect(after).toBe(before - 20000);
  // Oracle 2: lịch sử có ĐÚNG 1 dòng mới cho giao dịch này
  await expect(page.getByTestId('tx-row')).toHaveCount(1);
});`,
      ),
      P(
        "Chú ý test trên dùng hai fixture sender và receiver được tạo từ lớp fixture chung ở chương trước. Nhờ vậy, test này có thể chạy song song với các test khác mà không giẫm chân nhau, vì mỗi lần chạy có bộ tài khoản riêng nhưng cùng khuôn mẫu đã biết bất biến. Đây chính là lợi ích của việc chia sẻ fixture: các tầng và các test đều nói cùng một 'ngôn ngữ dữ liệu'. Khi một test E2E đỏ, bạn có thể lấy chính bộ dữ liệu đó và tái hiện ở tầng API để thu hẹp nguyên nhân — UI sai hay backend sai.",
        "Notice the test above uses sender and receiver fixtures created from the shared fixture layer in the previous chapter. Thanks to this, this test can run in parallel with others without stepping on each other, because each run has its own accounts but the same template with known invariants. This is the benefit of sharing fixtures: layers and tests all speak the same 'data language'. When an E2E test goes red, you can take that exact dataset and reproduce it at the API layer to narrow the cause — UI wrong or backend wrong.",
        "上のテストは前章の共有フィクスチャ層から作られた sender と receiver のフィクスチャを使う点に注目してください。これにより、このテストは他のテストと並行して互いを踏まずに実行できます。各実行が固有のアカウントを持ちつつ、不変条件が分かった同じテンプレートだからです。これがフィクスチャ共有の利点です。層もテストも同じ「データの言語」を話します。E2E テストが赤になったとき、まさにそのデータセットを取って API 層で再現し、原因が UI か backend かを絞り込めます。",
      ),
      QA(
        "Vì sao không kiểm mọi tổ hợp đầu vào ở tầng E2E?",
        "Why not check every input combination at the E2E layer?",
        "Vì E2E chậm và đắt: mỗi test phải khởi động trình duyệt, render, chờ mạng. Kiểm mọi tổ hợp ở E2E làm pipeline dài hàng chục phút và giòn. Ta giữ E2E cho vài luồng người dùng quan trọng nhất (happy path + 1-2 nhánh lỗi tiêu biểu), còn tổ hợp phong phú (nhiều mệnh giá, nhiều loại lỗi hợp đồng) đẩy xuống tầng API vốn nhanh gấp bội và tất định hơn.",
        "Because E2E is slow and expensive: each test must launch a browser, render, wait on the network. Checking every combination at E2E makes the pipeline tens of minutes long and brittle. We keep E2E for the few most important user flows (happy path plus one or two representative error branches), and push the rich combinatorics (many amounts, many contract error types) down to the API layer, which is far faster and more deterministic.",
        "E2E は遅く高価だからです。各テストはブラウザ起動、描画、ネットワーク待機が必要です。あらゆる組み合わせを E2E で検証するとパイプラインは数十分に及び脆くなります。E2E は最重要のユーザーフロー(ハッピーパスと代表的なエラー分岐一つ二つ)に留め、豊富な組み合わせ(多様な金額、多様な契約エラー種)は、はるかに高速で決定論的な API 層へ押し下げます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Tầng API: hợp đồng, trạng thái và idempotency",
      en: "5. The API layer: contract, state, and idempotency",
      ja: "5. API 層: 契約・状態・冪等性",
    },
    blocks: [
      P(
        "Tầng API là nơi kiểm phần lớn logic nghiệp vụ vì nó nhanh, tất định và không phụ thuộc giao diện. Ở đây bạn kiểm ba nhóm oracle. Thứ nhất là hợp đồng: response đúng schema, đúng kiểu dữ liệu, đúng mã trạng thái cho từng tình huống. Thứ hai là trạng thái: sau khi gọi API, dữ liệu trong hệ thống thay đổi đúng — số dư đúng, giao dịch được ghi đúng. Thứ ba, và quan trọng nhất với fintech, là idempotency: gửi lại cùng một request với cùng idempotency-key phải trả cùng kết quả và tuyệt đối không tạo giao dịch thứ hai. Đây là lá chắn chống double-charge khi mạng chập chờn khiến client tự retry.",
        "The API layer is where most business logic is checked because it is fast, deterministic, and UI-independent. Here you check three oracle groups. First, contract: the response matches schema, correct data types, correct status code for each situation. Second, state: after the API call, data in the system changes correctly — balance right, transaction recorded right. Third, and most important for fintech, idempotency: resending the same request with the same idempotency-key must return the same result and absolutely not create a second transaction. This is the shield against double-charge when a flaky network makes the client auto-retry.",
        "API 層はほとんどの業務ロジックを検証する場所です。高速で決定論的、UI 非依存だからです。ここでは三つのオラクル群を検証します。第一に契約——レスポンスがスキーマに一致し、正しいデータ型、状況ごとに正しいステータスコード。第二に状態——API 呼び出し後、システム内のデータが正しく変化する。残高が正しく、取引が正しく記録される。第三に、フィンテックで最も重要な冪等性——同じ idempotency-key で同じリクエストを再送しても同じ結果を返し、決して二つ目の取引を作らない。これはネットワークの不安定でクライアントが自動再試行するときの二重課金を防ぐ盾です。",
      ),
      CODE(
        "ts",
        `// tests/api/transfer.api.spec.ts — hợp đồng + trạng thái + idempotency
import { test, expect } from '@playwright/test';
import { z } from 'zod';

const TransferResult = z.object({
  transactionId: z.string().uuid(),
  status: z.enum(['SETTLED', 'PENDING', 'REJECTED']),
  balanceAfter: z.number().nonnegative(),
});

test('idempotency: gửi lại cùng key KHÔNG tạo giao dịch thứ hai', async ({ request }) => {
  const key = crypto.randomUUID();
  const body = { from: 'W-A', to: 'W-B', amount: 20000, idempotencyKey: key };

  const r1 = await request.post('/api/transfers', { data: body });
  const r2 = await request.post('/api/transfers', { data: body }); // retry cùng key

  expect(r1.status()).toBe(201);
  // Hợp đồng: response khớp schema
  const parsed = TransferResult.parse(await r1.json());
  // Idempotency: lần 2 trả CÙNG transactionId, KHÔNG tạo mới
  expect((await r2.json()).transactionId).toBe(parsed.transactionId);
  // Trạng thái: đúng 1 giao dịch cho key này
  const list = await request.get('/api/transfers?idempotencyKey=' + key);
  expect((await list.json()).length).toBe(1);
});`,
      ),
      P(
        "Ngoài idempotency, tầng API còn là nơi lý tưởng để kiểm các nhánh lỗi mà E2E khó dựng: chuyển vượt số dư phải bị từ chối với mã lỗi rõ ràng và số dư không đổi; chuyển số âm hoặc số quá lớn phải bị chặn ở tầng validate; chuyển tới ví bị khoá phải trả lỗi phù hợp. Mỗi nhánh này là một oracle riêng, và vì API nhanh nên bạn có thể kiểm hàng trăm tổ hợp trong vài giây. AI rất hữu ích ở đây: bạn mô tả hợp đồng và các bất biến, AI sinh ra bảng tổ hợp đầu vào cùng kỳ vọng, còn bạn review để chắc các kỳ vọng phản ánh đúng nghiệp vụ chứ không phải phỏng đoán.",
        "Beyond idempotency, the API layer is the ideal place to check error branches that E2E struggles to set up: transferring beyond the balance must be rejected with a clear error code and the balance unchanged; transferring a negative or overly large amount must be blocked at the validation layer; transferring to a frozen wallet must return the appropriate error. Each branch is its own oracle, and because the API is fast you can check hundreds of combinations in seconds. AI is very useful here: you describe the contract and the invariants, AI generates a table of input combinations with expectations, and you review to ensure the expectations reflect real business rules, not guesses.",
        "冪等性の他に、API 層は E2E では準備が難しいエラー分岐を検証する理想的な場所です。残高を超える送金は明確なエラーコードで拒否され残高は不変でなければならず、負の額や過大な額は検証層でブロックされねばならず、凍結ウォレットへの送金は適切なエラーを返さねばなりません。各分岐は固有のオラクルであり、API は高速なので数百の組み合わせを数秒で検証できます。ここで AI は非常に有用です。契約と不変条件を記述すると、AI が期待値付きの入力組み合わせ表を生成し、あなたが期待値が推測ではなく実際の業務ルールを反映しているかレビューします。",
      ),
      NOTE(
        "Dùng schema validation (Zod, JSON Schema) làm oracle hợp đồng tự động. Nó bắt được lỗi âm thầm như một trường đổi kiểu từ number sang string — thứ mà assertion thủ công dễ bỏ sót.",
        "Use schema validation (Zod, JSON Schema) as an automatic contract oracle. It catches silent breakages like a field changing type from number to string — which manual assertions easily miss.",
        "スキーマ検証(Zod、JSON Schema)を自動の契約オラクルとして使いましょう。フィールドの型が number から string に変わるような静かな破壊を捕えます——手動アサーションが見落としやすいものです。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Tầng hiệu năng: k6, thresholds và SLO làm oracle",
      en: "6. The performance layer: k6, thresholds, and SLO as oracle",
      ja: "6. 性能層: k6・閾値・オラクルとしての SLO",
    },
    blocks: [
      P(
        "Hiệu năng trong fintech không phải chuyện 'cho vui': một API chuyển tiền chậm dưới tải giờ cao điểm có thể khiến người dùng bấm lại nhiều lần, làm tăng nguy cơ double-submit, hoặc khiến giao dịch treo giữa chừng. k6 cho phép bạn biến SLO thành oracle chạy được: bạn khai báo thresholds như p95 độ trễ dưới 500ms và tỉ lệ lỗi dưới 1%, rồi k6 tự đánh trượt bài test nếu vi phạm. Điểm hay là thresholds biến một câu nói mơ hồ 'hệ thống phải nhanh' thành một con số kiểm được, và vì nó chạy trong CI nên mỗi PR đều bị soi xem có làm chậm hệ thống không.",
        "Performance in fintech is not a 'nice to have': a slow transfer API under peak load can make users click repeatedly, raising the risk of double-submit, or leave a transaction hanging midway. k6 lets you turn an SLO into a runnable oracle: you declare thresholds like p95 latency under 500ms and error rate under 1%, then k6 fails the test automatically if they are violated. The beauty is that thresholds turn a vague statement 'the system must be fast' into a checkable number, and because it runs in CI every PR is scrutinized for whether it slows the system down.",
        "フィンテックにおける性能は「あれば良い」ものではありません。ピーク負荷下で送金 API が遅いと、ユーザーが何度もクリックして二重送信のリスクが高まったり、取引が途中で停止したりします。k6 は SLO を実行可能なオラクルに変えます。p95 レイテンシ 500ms 未満、エラー率 1% 未満といった閾値を宣言すると、違反時に k6 が自動でテストを失敗させます。素晴らしいのは、閾値が「システムは速くあるべき」という曖昧な言明を検証可能な数値に変える点であり、CI で実行されるため各 PR がシステムを遅くしないか精査されます。",
      ),
      CODE(
        "js",
        `// perf/transfer.k6.js — thresholds = SLO gate, chia sẻ dữ liệu seed
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('business_errors');

export const options = {
  scenarios: {
    peak: { executor: 'ramping-vus', startVUs: 0,
      stages: [{ duration: '30s', target: 50 }, { duration: '1m', target: 200 }, { duration: '30s', target: 0 }] },
  },
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1200'], // SLO độ trễ
    http_req_failed: ['rate<0.01'],                  // <1% lỗi HTTP
    business_errors: ['rate<0.005'],                 // <0.5% lỗi nghiệp vụ
  },
};

export default function () {
  const key = \`\${__VU}-\${__ITER}-\${Date.now()}\`; // key duy nhất mỗi lần
  const res = http.post(\`\${__ENV.BASE_URL}/api/transfers\`,
    JSON.stringify({ from: 'W-A', to: 'W-B', amount: 1000, idempotencyKey: key }),
    { headers: { 'Content-Type': 'application/json', 'x-trace-id': key } });
  errorRate.add(!check(res, { 'status 201': (r) => r.status === 201 }));
}`,
      ),
      P(
        "Chú ý hai chi tiết quan trọng. Thứ nhất, mỗi request mang một idempotency-key duy nhất, vì nếu dùng chung một key thì hệ thống đúng đắn sẽ chỉ tạo một giao dịch và ta không đo được tải thật — đây chính là chỗ oracle của tầng perf phải nhất quán với oracle idempotency của tầng API. Thứ hai, mỗi request gắn một x-trace-id, để khi p95 vượt ngưỡng, ta có thể lấy trace-id của các request chậm nhất và tra ngược vào hệ thống observability xem nút thắt nằm ở đâu. Không có trace-id, một bài k6 đỏ chỉ nói 'chậm' mà không nói 'chậm ở đâu' — và đó là lúc AI observability vào cuộc.",
        "Notice two important details. First, each request carries a unique idempotency-key, because if they shared one key a correct system would create only one transaction and we couldn't measure real load — this is exactly where the perf layer's oracle must be consistent with the API layer's idempotency oracle. Second, each request attaches an x-trace-id, so when p95 exceeds the threshold we can take the trace-ids of the slowest requests and trace them back into the observability system to see where the bottleneck is. Without a trace-id, a red k6 run only says 'slow' but not 'slow where' — and that is where AI observability steps in.",
        "重要な二点に注目してください。第一に、各リクエストは一意の idempotency-key を持ちます。共通のキーを使うと正しいシステムは一つの取引しか作らず、実際の負荷を測れないからです——ここが性能層のオラクルが API 層の冪等性オラクルと整合せねばならない箇所です。第二に、各リクエストは x-trace-id を付けます。p95 が閾値を超えたとき、最も遅いリクエストの trace-id を取って可観測性システムへ遡り、ボトルネックの場所を確認できます。trace-id がなければ、赤い k6 実行は「遅い」としか言わず「どこが遅いか」を言いません——そこで AI 可観測性の出番です。",
      ),
      TIP(
        "Đặt cả p95 và p99 làm threshold. p95 bắt suy giảm chung, p99 bắt cái đuôi (tail latency) — vốn là nơi giao dịch treo và người dùng bấm lại, gây double-submit.",
        "Set both p95 and p99 as thresholds. p95 catches general degradation, p99 catches the tail (tail latency) — precisely where transactions hang and users re-click, causing double-submit.",
        "p95 と p99 の両方を閾値に設定しましょう。p95 は全体的な劣化を、p99 はテール(テールレイテンシ)を捕えます——まさに取引が停止しユーザーが再クリックして二重送信を起こす箇所です。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Observability: trace, log, metric làm nền chung",
      en: "7. Observability: trace, log, metric as the shared foundation",
      ja: "7. 可観測性: 共有基盤としてのトレース・ログ・メトリクス",
    },
    blocks: [
      P(
        "Observability là tầng nền mà ba tầng trên đều tựa vào. Ý tưởng cốt lõi là mọi request kiểm thử đều mang một trace-id, và trace-id đó xuyên suốt qua mọi dịch vụ mà request đi qua — gateway, dịch vụ ví, dịch vụ sổ cái, hàng đợi. Nhờ vậy, khi một giao dịch có vấn đề, bạn không phải đoán mò mà có thể lấy trace-id và xem toàn bộ hành trình của nó: nó dừng ở đâu, span nào chậm, dịch vụ nào ném lỗi. Ba trụ cột của observability là trace (hành trình một request), metric (số liệu tổng hợp như p95, throughput), và log (sự kiện chi tiết có cấu trúc). Kiểm thử tích hợp tốt sinh ra dữ liệu observability sạch để chính nó dùng khi cần điều tra.",
        "Observability is the foundation layer that the three layers above all lean on. The core idea is that every test request carries a trace-id, and that trace-id runs through every service the request touches — gateway, wallet service, ledger service, queue. Thanks to this, when a transaction has a problem you don't guess blindly; you take the trace-id and see its whole journey: where it stalled, which span was slow, which service threw an error. The three pillars of observability are traces (a request's journey), metrics (aggregate numbers like p95, throughput), and logs (detailed structured events). Good integrated testing produces clean observability data for itself to use when investigation is needed.",
        "可観測性は上の三層すべてが依拠する基盤層です。中核の考えは、すべてのテストリクエストが trace-id を持ち、その trace-id がリクエストの通る全サービス——ゲートウェイ、ウォレットサービス、台帳サービス、キュー——を貫くことです。これにより、取引に問題が起きたとき当てずっぽうではなく、trace-id を取ってその全行程を見られます。どこで停滞したか、どのスパンが遅かったか、どのサービスがエラーを投げたか。可観測性の三本柱はトレース(リクエストの行程)、メトリクス(p95・スループットなどの集計値)、ログ(構造化された詳細イベント)です。優れた統合テストは、調査が必要なときに自ら使うためのクリーンな可観測性データを生み出します。",
      ),
      CODE(
        "ts",
        `// instrumentation: gắn trace-id XUYÊN các tầng để tương quan
import { context, trace, propagation } from '@opentelemetry/api';

// Playwright / k6 gửi header 'x-trace-id'; middleware backend nối vào span
export function withTraceId(traceId: string) {
  return {
    'x-trace-id': traceId,
    // W3C traceparent để hệ thống OTel nối span xuyên dịch vụ
    'traceparent': \`00-\${traceId.replace(/-/g, '').padEnd(32, '0').slice(0, 32)}-0000000000000001-01\`,
  };
}

// Log có cấu trúc — AI đọc được, con người grep được
export function logTx(evt: { traceId: string; step: string; walletId: string; amount: number; status: string }) {
  console.log(JSON.stringify({ ts: Date.now(), level: 'info', ...evt }));
}`,
      ),
      P(
        "Log có cấu trúc là điểm mấu chốt để AI có thể đọc được. Một dòng log dạng văn xuôi tự do như 'chuyển tiền thất bại' hầu như vô dụng cho việc tương quan tự động; ngược lại một log JSON có trace-id, bước, ví, số tiền và trạng thái cho phép cả con người grep lẫn AI phân tích. Khi bạn thiết kế kiểm thử tích hợp, hãy coi observability là một yêu cầu chất lượng của chính sản phẩm chứ không phải phần thêm vào của test. Một hệ thống không thể quan sát được thì không thể kiểm thử sâu được, dù bạn viết bao nhiêu test đi nữa.",
        "Structured logs are the crux that lets AI read them. A free-prose log line like 'transfer failed' is nearly useless for automatic correlation; conversely a JSON log with trace-id, step, wallet, amount and status lets both humans grep and AI analyze. When you design integrated testing, treat observability as a quality requirement of the product itself, not an add-on to tests. A system that cannot be observed cannot be deeply tested, no matter how many tests you write.",
        "構造化ログは AI が読めるようにする要です。「送金失敗」のような自由散文のログ行は自動相関にほぼ無用です。逆に trace-id・ステップ・ウォレット・金額・状態を持つ JSON ログは、人間の grep と AI の分析の両方を可能にします。統合テストを設計するとき、可観測性をテストの付加物ではなく製品自体の品質要件とみなしましょう。観測できないシステムは、どれだけテストを書いても深く検証できません。",
      ),
      SCEN(
        "Giao dịch treo mà không tầng nào 'đỏ'",
        "A hanging transaction that no layer flags 'red'",
        "Một giao dịch trả về 201 (thành công) nhưng người dùng không thấy tiền tới trong 30 giây. Tầng API xanh (đã trả 201), tầng E2E xanh (đã thấy toast), k6 xanh (p95 ổn). Nhưng trace cho thấy: message vào hàng đợi ledger bị kẹt vì consumer chậm. Không có observability, sự cố này vô hình với cả ba tầng trên. Bài học: trace là oracle bổ sung cho 'tính hoàn tất bất đồng bộ', thứ mà pass/fail tức thời của các tầng khác không bắt được.",
        "A transaction returns 201 (success) but the user doesn't see the money arrive for 30 seconds. The API layer is green (returned 201), E2E green (saw the toast), k6 green (p95 fine). But the trace shows: the message into the ledger queue is stuck because the consumer is slow. Without observability, this incident is invisible to all three layers above. Lesson: the trace is a complementary oracle for 'async completeness', which the other layers' instant pass/fail cannot catch.",
        "取引が 201(成功)を返すのに、ユーザーは 30 秒間お金の到着を見ません。API 層はグリーン(201 を返した)、E2E はグリーン(トーストを見た)、k6 はグリーン(p95 は良好)。しかしトレースが示します。台帳キューへのメッセージがコンシューマの遅さで詰まっている。可観測性がなければ、このインシデントは上の三層すべてに不可視です。教訓: トレースは「非同期の完了性」の補完的オラクルであり、他層の即時の合否では捕えられません。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. AI triage xuyên tầng: gom tín hiệu, đề xuất giả thuyết",
      en: "8. Cross-layer AI triage: gather signals, propose hypotheses",
      ja: "8. 層をまたぐ AI トリアージ: 信号を集め仮説を提案",
    },
    blocks: [
      P(
        "Đây là nơi AI tạo ra giá trị lớn nhất trong bộ tích hợp. Khi một pipeline có bốn tầng cùng chạy, một lỗi thật thường để lại dấu vết ở nhiều tầng cùng lúc: k6 báo p95 tăng vọt, trace cho thấy một span database mới xuất hiện, log cảnh báo slow query. Một con người phải mở ba tab, đọc ba định dạng dữ liệu khác nhau và tự nối chúng lại — chậm và dễ sót. AI triage engine làm chính việc nối này: nó lấy trace-id chung, so kết quả với baseline lần chạy trước, gom tín hiệu ba tầng, rồi đề xuất một giả thuyết nhân quả có thể kiểm chứng, ví dụ 'commit abc123 thêm truy vấn N+1 ở OrderRepo khiến p95 tăng'. Nó không kết luận — nó thu hẹp không gian tìm kiếm cho con người.",
        "This is where AI creates the most value in an integrated suite. When a pipeline runs four layers together, a real bug usually leaves traces in multiple layers at once: k6 reports p95 spiking, the trace shows a new database span appearing, logs warn about a slow query. A human has to open three tabs, read three different data formats and connect them by hand — slow and error-prone. The AI triage engine does exactly this connecting: it takes the shared trace-id, compares results against the previous run's baseline, gathers the three-layer signals, then proposes a testable causal hypothesis, e.g. 'commit abc123 added an N+1 query in OrderRepo that raised p95'. It does not conclude — it narrows the search space for the human.",
        "ここが統合スイートで AI が最大の価値を生む場所です。パイプラインが四層を同時に走らせるとき、本物のバグは通常複数の層に同時に痕跡を残します。k6 が p95 の急上昇を報告し、トレースが新しいデータベーススパンの出現を示し、ログが遅いクエリを警告します。人間は三つのタブを開き、三つの異なるデータ形式を読み、手作業でつなげねばなりません——遅く、見落としやすい。AI トリアージエンジンはまさにこの接続を行います。共通の trace-id を取り、結果を前回実行のベースラインと比較し、三層の信号を集め、検証可能な因果仮説を提案します。例えば「コミット abc123 が OrderRepo に N+1 クエリを追加し p95 を上げた」。結論は下しません——人間のために探索空間を狭めます。",
      ),
      IMG(
        SVG_CORRELATE,
        "AI tương quan regression perf với trace và log — đề xuất giả thuyết, con người xác nhận.",
        "AI correlates a perf regression with traces and logs — proposes a hypothesis, humans confirm.",
        "AI が性能回帰をトレースとログに相関——仮説を提案し人間が確認する。",
      ),
      CODE(
        "ts",
        `// triage/correlate.ts — gom tín hiệu 3 tầng theo trace-id, KHÔNG tự kết luận
interface Signal { layer: 'perf' | 'trace' | 'log'; traceId: string; detail: string; }

export function buildTriagePrompt(failing: { traceId: string }, signals: Signal[], baseline: any) {
  const related = signals.filter((s) => s.traceId === failing.traceId);
  return {
    // Bằng chứng có cấu trúc — grounding để giảm hallucination (ハルシネーション)
    evidence: related,
    baseline,                          // số liệu lần chạy "xanh" gần nhất
    instruction:
      'Đề xuất TỐI ĐA 3 giả thuyết nhân quả, mỗi giả thuyết PHẢI trích dẫn ' +
      'span/log/metric cụ thể làm bằng chứng. KHÔNG kết luận. KHÔNG đề xuất ' +
      'nới oracle. Nếu bằng chứng không đủ, nói "insufficient evidence".',
  };
}

// Con người đọc giả thuyết + bằng chứng rồi mới quyết định — AI không mở/đóng bug.`,
      ),
      P(
        "Nguyên tắc vàng khi cho AI triage là buộc nó trích dẫn bằng chứng cụ thể cho mỗi giả thuyết. Một AI không có ràng buộc sẽ 'ảo giác' (ハルシネーション) ra một nguyên nhân nghe hợp lý nhưng không có thật, và điều đó nguy hiểm hơn không có triage vì nó dẫn người điều tra đi sai hướng. Bằng cách yêu cầu mỗi giả thuyết phải kèm span, log hoặc metric cụ thể, bạn biến AI từ 'người phán xử' thành 'người thu thập và sắp xếp bằng chứng'. Con người vẫn là người đọc bằng chứng và ra kết luận. Đây là ranh giới không thể nhượng bộ: AI thu hẹp, con người kết luận.",
        "The golden rule when letting AI triage is to force it to cite specific evidence for each hypothesis. An unconstrained AI will 'hallucinate' a plausible-sounding but nonexistent cause, and that is more dangerous than no triage because it leads the investigator the wrong way. By requiring each hypothesis to come with a specific span, log or metric, you turn AI from a 'judge' into a 'collector and organizer of evidence'. The human still reads the evidence and reaches the conclusion. This is a non-negotiable boundary: AI narrows, humans conclude.",
        "AI にトリアージさせるときの黄金律は、各仮説に具体的な証拠の引用を強制することです。制約のない AI はもっともらしいが存在しない原因を「幻覚(ハルシネーション)」し、それは調査者を誤った方向へ導くのでトリアージなしより危険です。各仮説に具体的なスパン・ログ・メトリクスを添えるよう要求することで、AI を「裁判官」から「証拠の収集・整理者」に変えます。人間が依然として証拠を読み結論に達します。これは譲れない境界です。AI が狭め、人間が結論する。",
      ),
      WARN(
        "Đừng để AI triage 'chốt' rằng một test đỏ là false positive rồi bỏ qua. Nếu AI được quyền đó, một regression thật (回帰) có thể bị dán nhãn 'nhiễu' và lọt production. AI chỉ đề xuất; đèn đỏ chỉ tắt bởi con người.",
        "Don't let AI triage 'decide' a red test is a false positive and dismiss it. If AI has that power, a real regression could be labeled 'noise' and slip to production. AI only proposes; a red light is only cleared by a human.",
        "AI トリアージに赤いテストが偽陽性だと「確定」させて無視させてはいけません。その権限があれば、本物の回帰が「ノイズ」と分類され本番に漏れ得ます。AI は提案するだけ。赤信号を消すのは人間だけです。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. SLO làm oracle: nối perf với bất biến nghiệp vụ",
      en: "9. SLO as oracle: linking perf to business invariants",
      ja: "9. オラクルとしての SLO: 性能を業務不変条件へ結ぶ",
    },
    blocks: [
      P(
        "Một sai lầm tinh vi là coi SLO chỉ là con số kỹ thuật tách rời khỏi nghiệp vụ. Trong fintech, SLO chính là một cách phát biểu bất biến nghiệp vụ dưới dạng đo được: 'chuyển tiền phải hoàn tất trong 500ms ở p95' thực ra là câu 'người dùng không phải chờ đủ lâu để nghi ngờ và bấm lại'. Khi bạn thiết kế thresholds cho k6, hãy suy ra chúng từ yêu cầu nghiệp vụ và hợp đồng SLA với khách hàng, chứ không phải bịa một con số tròn. Một SLO tốt có ba phần: chỉ tiêu (p95 độ trễ), ngưỡng (500ms), và cửa sổ đo (trong 5 phút tải đỉnh). Thiếu cửa sổ đo, một threshold dễ bị 'gaming' bằng cách chạy tải quá ngắn.",
        "A subtle mistake is treating the SLO as merely a technical number divorced from the business. In fintech, the SLO is a way of stating a business invariant in measurable form: 'a transfer must complete within 500ms at p95' really says 'a user should not wait long enough to doubt it and click again'. When you design k6 thresholds, derive them from business requirements and the customer SLA, not from a made-up round number. A good SLO has three parts: an indicator (p95 latency), a threshold (500ms), and a measurement window (over 5 minutes of peak load). Without the window, a threshold is easily 'gamed' by running load too briefly.",
        "微妙な間違いは、SLO を業務から切り離された技術的な数値に過ぎないと見なすことです。フィンテックでは SLO は業務不変条件を測定可能な形で述べる方法です。「送金は p95 で 500ms 以内に完了せねばならない」は実は「ユーザーが疑って再クリックするほど長く待たないこと」を意味します。k6 の閾値を設計するとき、丸めた数値をでっち上げるのではなく、業務要件と顧客 SLA から導きましょう。良い SLO は三部構成です。指標(p95 レイテンシ)、閾値(500ms)、測定窓(ピーク負荷 5 分間)。窓がなければ、閾値は負荷を短く走らせることで容易に「ゲーム化」されます。",
      ),
      CODE(
        "yaml",
        `# slo-registry.yml — SLO là oracle nghiệp vụ, không phải số kỹ thuật rời rạc
slos:
  - name: transfer_latency
    business_reason: "chậm quá -> người dùng bấm lại -> double-submit"
    indicator: http_req_duration
    objective: "p95 < 500ms AND p99 < 1200ms"
    window: "peak 5m, VUs ramp 0->200"
    owner: payments-team
    linked_invariant: no_double_submit    # nối với oracle idempotency tầng API
  - name: transfer_error_budget
    business_reason: "mỗi lỗi = 1 khách nghi ngờ hệ thống giữ tiền của họ"
    indicator: http_req_failed
    objective: "rate < 1% trên cửa sổ 30 ngày"
    window: "rolling 30d"
    owner: payments-team
    on_breach: freeze_release          # cạn error budget -> đóng băng release`,
      ),
      P(
        "Khi bạn nối mỗi SLO với một bất biến nghiệp vụ (như trong trường linked_invariant ở trên), bạn tạo ra một mạng lưới oracle nhất quán. SLO độ trễ chuyển tiền nối với oracle 'không double-submit' của tầng API, vì độ trễ cao chính là nguyên nhân người dùng bấm lại. Nhờ liên kết này, khi tầng perf đỏ, AI triage biết ngay nên kiểm tra oracle idempotency của tầng API có bị vi phạm dưới tải hay không — một câu hỏi mà nếu tách rời hai tầng bạn sẽ không nghĩ ra. Đây là bản chất của 'tích hợp': không phải chạy chung, mà là các oracle của các tầng biết về nhau và cùng bảo vệ một bất biến.",
        "When you link each SLO to a business invariant (as in the linked_invariant field above), you create a consistent web of oracles. The transfer-latency SLO links to the API layer's 'no double-submit' oracle, because high latency is exactly what makes users re-click. Thanks to this link, when the perf layer goes red, AI triage immediately knows to check whether the API layer's idempotency oracle is violated under load — a question you would not think of if the two layers were separate. This is the essence of 'integration': not running together, but the layers' oracles knowing about each other and jointly protecting one invariant.",
        "各 SLO を業務不変条件に結びつけると(上の linked_invariant フィールドのように)、整合したオラクルの網を作れます。送金レイテンシ SLO は API 層の「二重送信なし」オラクルに結びつきます。高レイテンシこそがユーザーの再クリックの原因だからです。この結びつきのおかげで、性能層が赤になったとき、AI トリアージは即座に、負荷下で API 層の冪等性オラクルが違反されていないか確認すべきだと分かります——二層を切り離していたら思いつかない問いです。これが「統合」の本質です。一緒に走らせるのではなく、層のオラクルが互いを知り、一つの不変条件を共同で守るのです。",
      ),
      QA(
        "SLO nên do QA đặt hay do đội sản phẩm/kinh doanh đặt?",
        "Should the SLO be set by QA or by the product/business team?",
        "Cùng nhau, nhưng ownership thuộc về đội sản phẩm. QA giỏi biến một mong muốn nghiệp vụ ('nhanh, đáng tin') thành ba phần đo được (chỉ tiêu, ngưỡng, cửa sổ) và cảnh báo về khả thi kỹ thuật. Nhưng con số cuối — chấp nhận p95 500ms hay 300ms — là quyết định đánh đổi giữa chi phí hạ tầng và trải nghiệm khách, thuộc về người chịu trách nhiệm sản phẩm. QA không nên tự bịa ngưỡng vì như vậy oracle mất tính chính danh; ngược lại đội sản phẩm không nên đặt ngưỡng bất khả thi. SLO tốt là một hợp đồng ký chung, ghi rõ lý do nghiệp vụ (business_reason).",
        "Together, but ownership belongs to the product team. QA is good at turning a business wish ('fast, reliable') into three measurable parts (indicator, threshold, window) and flagging technical feasibility. But the final number — accepting p95 500ms or 300ms — is a trade-off decision between infrastructure cost and customer experience, belonging to whoever owns the product. QA shouldn't invent thresholds alone because then the oracle loses legitimacy; conversely the product team shouldn't set impossible thresholds. A good SLO is a jointly signed contract that records the business reason.",
        "共同で、しかしオーナーシップは製品チームに属します。QA は業務上の願望(「速く、信頼できる」)を三つの測定可能な部分(指標、閾値、窓)に変え、技術的実現可能性を指摘するのが得意です。しかし最終的な数値——p95 500ms を受け入れるか 300ms か——はインフラコストと顧客体験のトレードオフ判断であり、製品責任者に属します。QA が独断で閾値をでっち上げるとオラクルが正当性を失います。逆に製品チームは不可能な閾値を設定すべきではありません。良い SLO は業務上の理由を記録した共同署名の契約です。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Điều phối CI: chạy 4 tầng theo cổng, dừng sớm khi cần",
      en: "10. CI orchestration: run 4 layers as gates, fail fast when needed",
      ja: "10. CI オーケストレーション: 四層をゲートとして実行し必要時は早期失敗",
    },
    blocks: [
      P(
        "Bốn tầng không nên chạy hỗn loạn cùng lúc mà nên xếp thành một chuỗi cổng có thứ tự, để tiết kiệm thời gian và tài nguyên. Thứ tự hợp lý là: API tests trước (nhanh nhất, bắt phần lớn lỗi logic), rồi E2E (chậm hơn, kiểm luồng người dùng), rồi k6 (đắt, chỉ chạy khi hai tầng trên xanh vì tải một hệ thống đã hỏng logic là vô nghĩa). Observability chạy nền xuyên suốt, thu thập trace cho mọi tầng. Nguyên tắc 'fail fast' nghĩa là nếu API tests đã đỏ, ta không tốn 20 phút chạy k6 — dừng sớm và báo. AI triage chỉ được kích hoạt khi có tầng đỏ, để không đốt token vô ích trên các lần chạy xanh.",
        "The four layers should not run chaotically at once but be arranged into an ordered chain of gates, to save time and resources. A sensible order is: API tests first (fastest, catches most logic bugs), then E2E (slower, checks user flows), then k6 (expensive, only run when the two above are green since load-testing a logically broken system is pointless). Observability runs in the background throughout, collecting traces for every layer. The 'fail fast' principle means that if API tests are already red, we don't spend 20 minutes running k6 — stop early and report. AI triage is only triggered when a layer is red, so as not to burn tokens uselessly on green runs.",
        "四層は同時に混沌と走らせるのではなく、時間と資源を節約するため順序付けられたゲートの連鎖に配置すべきです。合理的な順序は、まず API テスト(最速、ロジックバグの大半を捕捉)、次に E2E(より遅く、ユーザーフローを検証)、次に k6(高価、上二層がグリーンのときのみ実行——ロジックが壊れたシステムに負荷をかけるのは無意味)。可観測性は全体を通じてバックグラウンドで走り、各層のトレースを収集します。「早期失敗」の原則は、API テストが既に赤なら k6 に 20 分費やさず早期に止めて報告することを意味します。AI トリアージは層が赤のときのみ起動し、グリーンの実行で無駄にトークンを燃やさないようにします。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/integrated-qa.yml — 4 tầng theo cổng, fail fast
name: integrated-qa
on: [pull_request]
jobs:
  api:                                  # cổng 1: nhanh nhất
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test tests/api --reporter=line
  e2e:                                  # cổng 2: chỉ khi API xanh
    needs: api
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test tests/e2e --trace=on
  perf:                                 # cổng 3: đắt, chỉ khi logic xanh
    needs: [api, e2e]
    runs-on: ubuntu-latest
    steps:
      - run: k6 run perf/transfer.k6.js --out json=k6-out.json
  triage:                               # chỉ chạy khi có tầng ĐỎ
    needs: [api, e2e, perf]
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: node triage/run.js --collect-traces --propose-only  # KHÔNG tự sửa`,
      ),
      P(
        "Chú ý job triage có điều kiện if: failure() và cờ --propose-only. Điều này thể hiện hai nguyên tắc chi phí và an toàn: AI chỉ tốn token khi thực sự có lỗi cần điều tra, và nó chỉ đề xuất chứ không tự sửa code hay nới oracle. Ngoài ra, việc chạy k6 sau cùng và chỉ khi logic xanh không chỉ tiết kiệm mà còn làm kết quả perf sạch hơn: một hệ thống đang lỗi logic sẽ cho số liệu perf gây hiểu lầm. Chuỗi cổng này biến pipeline thành một câu chuyện có thứ tự — mỗi cổng trả lời một câu hỏi cụ thể trước khi cho phép câu hỏi tiếp theo được đặt ra.",
        "Notice the triage job has the condition if: failure() and the --propose-only flag. This embodies two principles, cost and safety: AI only spends tokens when there is actually a failure to investigate, and it only proposes, never fixing code or loosening oracles itself. Also, running k6 last and only when logic is green not only saves resources but makes perf results cleaner: a logically broken system produces misleading perf numbers. This gate chain turns the pipeline into an ordered story — each gate answers one specific question before allowing the next question to be asked.",
        "triage ジョブに if: failure() の条件と --propose-only フラグがある点に注目してください。これはコストと安全の二原則を体現します。AI は調査すべき失敗が実際にあるときのみトークンを費やし、提案のみで、コード修正やオラクル緩和は自ら行いません。また k6 を最後に、ロジックがグリーンのときのみ走らせることは資源節約だけでなく性能結果をよりクリーンにします。ロジックが壊れたシステムは誤解を招く性能数値を出すからです。このゲート連鎖はパイプラインを順序ある物語に変えます——各ゲートが次の問いを許す前に一つの具体的な問いに答えます。",
      ),
      TIP(
        "Giữ trace và video của lần chạy đỏ ít nhất 7-30 ngày để audit. Khi AI đề xuất một giả thuyết, người review phải mở được đúng trace đó để xác nhận, nếu không thì lời đề xuất chỉ là suy đoán không kiểm chứng được.",
        "Keep the traces and videos of a red run for at least 7-30 days for audit. When AI proposes a hypothesis, the reviewer must be able to open exactly that trace to confirm; otherwise the proposal is just an unverifiable guess.",
        "赤い実行のトレースとビデオを監査のため少なくとも 7〜30 日保持しましょう。AI が仮説を提案するとき、レビュアーがまさにそのトレースを開いて確認できねばなりません。さもなければ提案は検証不能な推測にすぎません。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. AI tóm tắt tín hiệu sự cố thành báo cáo cho người trực",
      en: "11. AI summarizing incident signals into an on-call report",
      ja: "11. AI がインシデント信号を当番向けレポートに要約",
    },
    blocks: [
      P(
        "Khi một tầng đỏ lúc 2 giờ sáng, người trực không có thời gian đọc mười nghìn dòng log. Đây là chỗ AI phát huy sức mạnh tóm tắt: gom trace, log, metric của cửa sổ thời gian quanh sự cố, rồi viết một bản tóm tắt ngắn có cấu trúc — triệu chứng, tầng nào bị ảnh hưởng, các giả thuyết kèm bằng chứng, và các bước điều tra gợi ý. Nhưng bản tóm tắt này phải tuân thủ nguyên tắc grounding: mỗi câu khẳng định phải trỏ về một dòng log hoặc span cụ thể. Một bản tóm tắt AI 'trôi chảy' nhưng bịa số liệu còn tệ hơn không có, vì nó tạo cảm giác an tâm giả và khiến người trực điều tra sai hướng.",
        "When a layer goes red at 2 a.m., the on-call person has no time to read ten thousand log lines. This is where AI's summarization power shines: gather the traces, logs, and metrics of the time window around the incident, then write a short structured summary — symptom, which layers are affected, hypotheses with evidence, and suggested investigation steps. But this summary must obey the grounding principle: every assertion must point back to a specific log line or span. A 'fluent' AI summary that fabricates numbers is worse than none, because it creates false reassurance and sends the on-call person the wrong way.",
        "層が午前 2 時に赤になるとき、当番者は一万行のログを読む時間がありません。ここで AI の要約力が輝きます。インシデント周辺の時間窓のトレース・ログ・メトリクスを集め、短い構造化された要約を書きます——症状、影響を受けた層、証拠付きの仮説、推奨される調査手順。しかしこの要約は接地の原則に従わねばなりません。あらゆる主張は具体的なログ行やスパンに遡らねばなりません。数値を捏造する「流暢な」AI 要約はないより悪いです。偽りの安心を生み、当番者を誤った方向へ送るからです。",
      ),
      CODE(
        "ts",
        `// incident/summarize.ts — tóm tắt CÓ GROUNDING, mỗi câu trỏ về bằng chứng
export interface IncidentSummary {
  symptom: string;                 // "p95 transfer 320->890ms từ 02:14"
  affectedLayers: ('e2e'|'api'|'perf')[];
  hypotheses: { claim: string; evidenceRefs: string[] }[];  // ref = spanId | logId
  suggestedSteps: string[];
  confidence: 'low' | 'medium' | 'high';
  disclaimer: string;              // luôn nhắc: đây là gợi ý, cần người xác nhận
}

// System prompt bắt buộc: "Mọi 'claim' PHẢI có ít nhất 1 evidenceRef trỏ về
// span/log thật trong dữ liệu đính kèm. Nếu không đủ bằng chứng, đặt confidence
// = low và ghi rõ điều còn thiếu. TUYỆT ĐỐI không bịa số liệu hay spanId."`,
      ),
      P(
        "Trường evidenceRefs và disclaimer trong cấu trúc trên không phải trang trí — chúng là cơ chế an toàn. Bằng cách buộc mọi claim phải có ít nhất một evidenceRef trỏ về span hoặc log thật, bạn khiến việc bịa đặt trở nên khó hơn và dễ phát hiện hơn: người review chỉ cần bấm vào ref để kiểm. Trường confidence buộc AI tự khai độ chắc chắn, và khi bằng chứng yếu nó phải hạ confidence xuống low thay vì tỏ ra quả quyết. Đây là cách bạn dùng sức mạnh ngôn ngữ của AI mà vẫn giữ được tính kiểm chứng — thứ không thể thiếu trong một hệ thống động đến tiền.",
        "The evidenceRefs and disclaimer fields in the structure above are not decoration — they are safety mechanisms. By forcing every claim to have at least one evidenceRef pointing to a real span or log, you make fabrication harder and easier to detect: the reviewer just clicks the ref to check. The confidence field forces AI to self-declare certainty, and when evidence is weak it must lower confidence to low rather than sounding assertive. This is how you harness AI's language power while keeping verifiability — indispensable in a system that touches money.",
        "上の構造の evidenceRefs と disclaimer フィールドは装飾ではありません——安全機構です。あらゆる主張に実在のスパンやログを指す evidenceRef を少なくとも一つ持たせることで、捏造を困難にし検出しやすくします。レビュアーは ref をクリックして確認するだけです。confidence フィールドは AI に確信度の自己申告を強制し、証拠が弱いときは断定的に見せず confidence を low に下げねばなりません。これがお金に触れるシステムで不可欠な検証可能性を保ちつつ AI の言語力を活用する方法です。",
      ),
      NOTE(
        "Một bản tóm tắt tốt kết thúc bằng câu hỏi, không phải kết luận: 'nếu giả thuyết N+1 đúng, ta sẽ thấy X ở span Y — hãy kiểm'. Điều này giữ người trực ở vị trí người điều tra, không biến họ thành người bấm nút chấp nhận lời AI.",
        "A good summary ends with a question, not a conclusion: 'if the N+1 hypothesis is right, we'd see X in span Y — check it'. This keeps the on-call person in the investigator's seat, not turning them into a button-presser accepting AI's word.",
        "良い要約は結論ではなく問いで終わります。「N+1 仮説が正しければスパン Y に X が見えるはず——確認せよ」。これは当番者を調査者の席に留め、AI の言葉を受け入れるボタン押し係にしません。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Chống hallucination và giữ tính kiểm chứng",
      en: "12. Fighting hallucination and preserving verifiability",
      ja: "12. ハルシネーション対策と検証可能性の維持",
    },
    blocks: [
      P(
        "Rủi ro lớn nhất khi đưa AI vào một hệ thống động đến tiền là hallucination (ハルシネーション): AI tạo ra một khẳng định nghe hợp lý nhưng không có cơ sở trong dữ liệu. Trong triage, hallucination có thể dẫn người điều tra đi vào ngõ cụt; trong sinh test, nó có thể tạo ra một oracle sai khẳng định hành vi đúng là lỗi hoặc ngược lại. Chiến lược phòng vệ có ba lớp. Lớp một là grounding: buộc AI chỉ được nói dựa trên dữ liệu đính kèm và trích dẫn nguồn. Lớp hai là verify: mọi đầu ra của AI phải chạy được và đối chiếu được với thực tế — một test AI sinh phải thực sự chạy, một locator AI 'chữa' phải thực sự tìm thấy phần tử. Lớp ba là con người ở điểm quyết định: AI không bao giờ tự merge, tự tắt test, hay tự nới oracle.",
        "The biggest risk of putting AI into a money-touching system is hallucination: AI producing a plausible-sounding claim with no basis in the data. In triage, hallucination can lead the investigator to a dead end; in test generation, it can produce a wrong oracle that asserts correct behavior is a bug or vice versa. The defense strategy has three layers. Layer one is grounding: force AI to speak only from the attached data and cite sources. Layer two is verify: every AI output must be runnable and checkable against reality — an AI-generated test must actually run, an AI-'healed' locator must actually find the element. Layer three is a human at the decision point: AI never self-merges, self-disables a test, or self-loosens an oracle.",
        "お金に触れるシステムに AI を入れる最大のリスクはハルシネーションです。AI がデータに根拠のないもっともらしい主張を生むこと。トリアージではハルシネーションは調査者を袋小路に導き得ます。テスト生成では、正しい挙動をバグと主張する、あるいはその逆の誤ったオラクルを生み得ます。防御戦略は三層です。第一層は接地——AI に添付データのみから語らせ出典を引用させる。第二層は検証——あらゆる AI 出力は実行可能で現実と照合可能でなければならない。AI 生成テストは実際に走らねばならず、AI が「修復」したロケーターは実際に要素を見つけねばなりません。第三層は判断点の人間——AI は決して自己マージ、テストの自己無効化、オラクルの自己緩和をしません。",
      ),
      CODE(
        "ts",
        `// guard/verify-ai-output.ts — mọi đầu ra AI phải VERIFY được trước khi dùng
export async function verifyHealedLocator(page, healed: { selector: string }) {
  // Verify #1: locator có tìm thấy đúng 1 phần tử không?
  const count = await page.locator(healed.selector).count();
  if (count !== 1) return { ok: false, reason: 'locator không match đúng 1 phần tử' };
  // Verify #2: phần tử có tương tác được không (không bị che)?
  const visible = await page.locator(healed.selector).isVisible();
  if (!visible) return { ok: false, reason: 'phần tử không hiển thị' };
  return { ok: true };
}

// Nguyên tắc: nếu KHÔNG verify được, KHÔNG dùng — dù AI "tự tin" đến đâu.
// Đầu ra chưa verify chỉ được mở PR nhãn 'needs-human-review', không auto-merge.`,
      ),
      P(
        "Điểm cốt lõi của lớp verify là biến độ tự tin của AI thành thứ không quan trọng. Một AI có thể 'rất tự tin' rằng locator mới đúng, nhưng nếu chạy thử mà nó không tìm thấy phần tử thì độ tự tin đó vô nghĩa. Bằng cách luôn chạy đầu ra AI qua một bước verify tất định, bạn xây một hàng rào mà hallucination không vượt qua được: dù AI có bịa ra điều gì, chỉ điều gì thực sự đúng với ứng dụng mới lọt qua. Đây là lý do kiểm thử tích hợp và observability lại quan trọng đến vậy với AI — chúng cung cấp chính cái 'thực tế' để đối chiếu, biến AI từ một cỗ máy đoán thành một trợ lý có thể kiểm chứng.",
        "The core of the verify layer is to make AI's confidence irrelevant. An AI may be 'very confident' the new locator is right, but if a trial run doesn't find the element, that confidence is meaningless. By always running AI output through a deterministic verify step, you build a fence hallucination cannot cross: whatever AI fabricates, only what is actually true of the app gets through. This is why integrated testing and observability matter so much to AI — they provide the very 'reality' to check against, turning AI from a guessing machine into a verifiable assistant.",
        "検証層の核心は AI の確信度を無意味にすることです。AI は新しいロケーターが正しいと「非常に自信がある」かもしれませんが、試行で要素が見つからなければその自信は無意味です。AI 出力を常に決定論的な検証ステップに通すことで、ハルシネーションが越えられない柵を築きます。AI が何を捏造しても、実際にアプリに当てはまるものだけが通ります。これが統合テストと可観測性が AI にとってこれほど重要な理由です——照合すべき「現実」そのものを提供し、AI を推測機械から検証可能な助手に変えます。",
      ),
      WARN(
        "Đừng bao giờ để AI vừa sinh test vừa tự quyết test đó 'đạt'. Đó là để cả bị cáo lẫn quan toà là một người. Test do AI sinh phải chạy qua verify tất định và ít nhất một cặp mắt người ở các luồng chạm tiền/quyền.",
        "Never let AI both generate a test and decide that test 'passes'. That makes the defendant and the judge the same person. AI-generated tests must go through deterministic verify and at least one human pair of eyes on money/permission flows.",
        "AI にテストを生成させると同時にそのテストの「合格」を判定させてはいけません。被告と裁判官を同一人物にすることです。AI 生成テストは決定論的検証と、金銭・権限フローでは少なくとも一組の人間の目を通さねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: thiết kế bộ kiểm thử tích hợp có AI",
      en: "13. Interview angle: designing an AI-assisted integrated suite",
      ja: "13. 面接の観点: AI 支援の統合スイートを設計する",
    },
    blocks: [
      P(
        "Câu hỏi phỏng vấn cấp senior về chủ đề này hiếm khi là 'anh biết k6 không'. Nó thường có dạng tình huống: 'chúng tôi có một luồng thanh toán, đội ba người, muốn phủ E2E, API và perf với AI hỗ trợ. Anh thiết kế thế nào?'. Câu trả lời tốt bắt đầu bằng việc liệt kê bất biến nghiệp vụ, ánh xạ mỗi bất biến vào tầng phù hợp, chỉ rõ oracle của từng tầng, rồi mới nói AI đặt ở đâu. Ứng viên yếu nhảy ngay vào công cụ; ứng viên mạnh nhảy vào bất biến và oracle trước, vì đó mới là phần khó và là phần AI không tự làm thay được. Người phỏng vấn tìm khả năng tư duy hệ thống, không tìm khả năng đọc thuộc tên công cụ.",
        "A senior interview question on this topic is rarely 'do you know k6'. It usually takes a scenario form: 'we have a payment flow, a three-person team, want E2E, API and perf coverage with AI assistance. How do you design it?'. A good answer starts by listing business invariants, mapping each to the right layer, naming each layer's oracle, and only then saying where AI goes. A weak candidate jumps straight to tools; a strong one jumps to invariants and oracles first, because that is the hard part and the part AI cannot do for you. The interviewer looks for systems thinking, not the ability to recite tool names.",
        "このテーマのシニア面接の質問はまず「k6 を知っているか」ではありません。通常はシナリオ形式です。「決済フローがあり、三人のチームで、AI 支援付きで E2E・API・性能をカバーしたい。どう設計するか」。良い解答はまず業務不変条件を列挙し、各々を適切な層に対応付け、各層のオラクルを明示し、それから AI をどこに置くかを述べます。弱い候補者は即座にツールへ飛びつきます。強い候補者はまず不変条件とオラクルへ飛びます。それが難所であり、AI が代われない部分だからです。面接官はシステム思考を探し、ツール名の暗唱能力を探しません。",
      ),
      UL(
        [
          "Bước 1: liệt kê bất biến nghiệp vụ (bảo toàn tiền, không double-submit, số dư ≥ 0).",
          "Bước 2: ánh xạ mỗi bất biến → tầng phù hợp + nêu oracle cụ thể của tầng đó.",
          "Bước 3: đặt AI vào việc cơ học (nháp, sinh biến thể, triage) — người giữ oracle & merge.",
          "Bước 4: nối các tầng bằng trace-id chung + invariant registry để tránh oracle mâu thuẫn.",
        ],
        [
          "Step 1: list business invariants (money conservation, no double-submit, balance ≥ 0).",
          "Step 2: map each invariant → the right layer + state that layer's specific oracle.",
          "Step 3: put AI on mechanical work (drafts, variants, triage) — humans keep oracle & merge.",
          "Step 4: connect layers via a shared trace-id + invariant registry to avoid contradictory oracles.",
        ],
        [
          "手順1: 業務不変条件を列挙(金額保存、二重送信なし、残高 ≥ 0)。",
          "手順2: 各不変条件を適切な層へ対応付け、その層の具体的オラクルを明示。",
          "手順3: AI を機械的作業(下書き、変種生成、トリアージ)へ——人間がオラクルとマージを保持。",
          "手順4: 共通の trace-id と不変条件レジストリで層をつなぎ、矛盾したオラクルを避ける。",
        ],
      ),
      QA(
        "Người phỏng vấn hỏi: 'AI sinh 200 test cho luồng thanh toán. Anh làm gì tiếp?'",
        "The interviewer asks: 'AI generated 200 tests for the payment flow. What next?'",
        "Tôi không merge cả 200. Đầu tiên tôi chạy chúng và loại ngay các test luôn xanh vô nghĩa (chỉ toBeVisible) bằng mutation testing: tiêm lỗi vào code thanh toán, giữ lại những test bật đỏ, bỏ những test vẫn xanh. Sau đó tôi review thủ công 100% oracle của các test còn lại vì đây là luồng chạm tiền — không có ngoại lệ. Tôi đối chiếu mỗi oracle với danh sách bất biến nghiệp vụ để chắc chúng khẳng định đúng điều cần khẳng định. Con số '200 test' không phải thành tựu; số test có oracle thật, bắt được lỗi tiêm, và đã được người duyệt mới là thành tựu.",
        "I don't merge all 200. First I run them and immediately drop the meaningless always-green tests (toBeVisible only) via mutation testing: inject a fault into the payment code, keep the tests that go red, discard those still green. Then I manually review 100% of the remaining tests' oracles because this is a money flow — no exceptions. I check each oracle against the business-invariant list to ensure they assert the right thing. The number '200 tests' is not an achievement; tests with real oracles that catch injected faults and have been human-reviewed are the achievement.",
        "私は 200 件すべてをマージしません。まず実行し、意味のない常にグリーンなテスト(toBeVisible のみ)をミューテーションテストで即座に落とします。決済コードに欠陥を注入し、赤になるテストを残し、グリーンのままのものを捨てます。次に残ったテストのオラクルを 100% 手動レビューします。これは金銭フローだからです——例外なし。各オラクルを業務不変条件リストと照合し、正しいものをアサートしているか確認します。「200 件」という数字は成果ではありません。本物のオラクルを持ち注入欠陥を捕え人間がレビュー済みのテストが成果です。",
      ),
      TIP(
        "Trong phỏng vấn, luôn nói rõ 'AI không tự merge, không tự nới oracle, không tự tắt test'. Đây là câu chốt cho thấy bạn hiểu ranh giới an toàn — điều người phỏng vấn senior đánh giá cao hơn danh sách công cụ.",
        "In interviews, always state 'AI does not self-merge, self-loosen oracles, or self-disable tests'. This is the clincher showing you understand the safety boundary — which senior interviewers value more than a tool list.",
        "面接では常に「AI は自己マージせず、オラクルを自己緩和せず、テストを自己無効化しない」と述べましょう。これは安全境界の理解を示す決め手であり、シニア面接官はツール一覧より高く評価します。",
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết: tích hợp là nhất quán, không phải gộp",
      en: "14. Wrap-up: integration is consistency, not lumping together",
      ja: "14. まとめ: 統合とは整合であり寄せ集めではない",
    },
    blocks: [
      P(
        "Bài học lớn nhất của kiểm thử tích hợp có AI trong fintech là: tích hợp không phải gộp bốn loại test vào một job CI, mà là làm cho oracle của bốn tầng nhất quán và biết về nhau. E2E, API, perf và observability mỗi tầng nhìn một khía cạnh của cùng những bất biến nghiệp vụ, và giá trị thật xuất hiện khi một tầng đỏ dẫn bạn tra ngược vào tầng khác qua một trace-id chung. AI làm cho việc tra ngược đó nhanh hơn nhiều — nó gom tín hiệu, đề xuất giả thuyết, tóm tắt sự cố — nhưng nó không thay thế phần khó nhất: quyết định bất biến nào quan trọng, đặt oracle ở đâu, và chịu trách nhiệm cho quyết định merge. Con người giữ những điểm phán đoán đó; AI khuếch đại tốc độ ở phần cơ học.",
        "The biggest lesson of AI-assisted integrated testing in fintech is: integration is not lumping four kinds of test into one CI job, but making the four layers' oracles consistent and aware of each other. E2E, API, perf and observability each view one facet of the same business invariants, and the real value appears when one red layer leads you to trace back into another via a shared trace-id. AI makes that trace-back much faster — it gathers signals, proposes hypotheses, summarizes incidents — but it does not replace the hardest part: deciding which invariants matter, where to place the oracle, and owning the merge decision. Humans keep those judgment points; AI amplifies speed on the mechanical part.",
        "フィンテックにおける AI 支援統合テストの最大の教訓は、統合とは四種類のテストを一つの CI ジョブに寄せ集めることではなく、四層のオラクルを整合させ互いを認識させることです。E2E・API・性能・可観測性はそれぞれ同じ業務不変条件の一側面を見ており、一つの層が赤になり共通の trace-id を通じて別の層へ遡らせるとき真の価値が現れます。AI はその遡りをはるかに速くします——信号を集め、仮説を提案し、インシデントを要約する——しかし最も難しい部分は代われません。どの不変条件が重要か決め、オラクルをどこに置くか決め、マージ判断に責任を持つこと。人間がそれらの判断点を保持し、AI は機械的部分で速度を増幅します。",
      ),
      UL(
        [
          "Bốn tầng, bốn oracle khác nhau nhưng nhất quán — nối bằng invariant registry.",
          "Trace-id chung là sợi chỉ đỏ để tương quan và để AI triage xuyên tầng.",
          "SLO là oracle nghiệp vụ đo được, nối perf với bất biến 'không double-submit'.",
          "AI: nháp, sinh biến thể, triage, tóm tắt — có grounding, có verify; người: oracle & merge.",
        ],
        [
          "Four layers, four distinct but consistent oracles — linked by an invariant registry.",
          "A shared trace-id is the red thread for correlation and cross-layer AI triage.",
          "The SLO is a measurable business oracle, linking perf to the 'no double-submit' invariant.",
          "AI: drafts, variants, triage, summaries — grounded and verified; humans: oracle & merge.",
        ],
        [
          "四層、四つの異なるが整合したオラクル——不変条件レジストリで結ぶ。",
          "共通の trace-id は相関と層をまたぐ AI トリアージの赤い糸。",
          "SLO は測定可能な業務オラクルで、性能を「二重送信なし」不変条件に結ぶ。",
          "AI: 下書き・変種・トリアージ・要約——接地と検証付き。人間: オラクルとマージ。",
        ],
      ),
      P(
        "Nếu bạn chỉ mang đi một ý từ bài này, hãy để nó là: trong một hệ thống động đến tiền, mọi thứ AI nói đều phải kiểm chứng được, và mọi quyết định có hậu quả tài chính đều phải có con người chịu trách nhiệm. AI là một bộ khuếch đại năng lực tuyệt vời cho người kiểm thử biết mình đang làm gì — nó giúp bạn phủ nhiều hơn, điều tra nhanh hơn, và bớt những giờ bảo trì buồn tẻ. Nhưng nó không thể, và không nên, thay bạn gánh trách nhiệm về đúng-sai. Kiểm thử tích hợp tốt là cách bạn xây chính cái 'thực tế' để AI đối chiếu, và giữ mình ở đúng vị trí người phán đoán cuối cùng.",
        "If you take away only one idea from this article, let it be: in a money-touching system, everything AI says must be verifiable, and every decision with financial consequences must have a human accountable for it. AI is a wonderful capability amplifier for a tester who knows what they are doing — it helps you cover more, investigate faster, and cut the tedious maintenance hours. But it cannot, and should not, take on the responsibility for right-and-wrong for you. Good integrated testing is how you build the very 'reality' AI checks against, and keep yourself in the seat of the final judge.",
        "本記事から一つだけ持ち帰るなら、これにしてください。お金に触れるシステムでは、AI が言うすべてが検証可能でなければならず、金銭的帰結を持つあらゆる判断には責任を負う人間がいなければなりません。AI は自分が何をしているか分かっているテスターにとって素晴らしい能力増幅器です——より多くカバーし、より速く調査し、退屈な保守時間を削るのを助けます。しかしそれはあなたの代わりに正誤の責任を負えませんし、負うべきでもありません。優れた統合テストは AI が照合する「現実」そのものを築く方法であり、あなたを最終判断者の席に留めます。",
      ),
      NOTE(
        "Điểm neo cuối: nếu ai đó khoe 'AI tự chạy toàn bộ QA của chúng tôi', hãy hỏi 'ai chịu trách nhiệm khi một giao dịch sai lọt production?'. Câu trả lời phải là một con người có tên, không phải một agent.",
        "The final anchor: if someone brags 'AI runs our entire QA', ask 'who is accountable when a wrong transaction reaches production?'. The answer must be a named human, not an agent.",
        "最後の錨: 誰かが「AI が我々の QA を全部動かす」と自慢したら、「誤った取引が本番に届いたとき誰が責任を負うのか」と問いましょう。答えはエージェントではなく名前のある人間でなければなりません。",
      ),
      QA(
        "Một câu để nhớ khi rời phòng phỏng vấn về kiểm thử tích hợp có AI?",
        "One line to remember when leaving an interview on AI-integrated testing?",
        "'Tích hợp là làm cho oracle các tầng nhất quán, không phải chạy chung; AI khuếch đại tốc độ ở phần cơ học, con người giữ oracle và merge.' Câu này gói cả bài: bốn tầng E2E/API/perf/observability mỗi tầng một oracle nhưng nối nhau bằng trace-id và invariant registry; SLO là oracle nghiệp vụ đo được; AI triage, tóm tắt và sinh nháp đều phải có grounding và verify; và ranh giới an toàn — AI không tự merge, không tự nới oracle, không tự tắt test — là thứ người phỏng vấn senior đánh giá cao nhất. Nói được câu này kèm ví dụ cụ thể là bạn đã cho thấy tư duy hệ thống, không phải học vẹt công cụ.",
        "'Integration means making the layers' oracles consistent, not running them together; AI amplifies speed on the mechanical part, humans keep the oracle and the merge.' This line packages the whole article: the four E2E/API/perf/observability layers each have an oracle but are linked by a trace-id and an invariant registry; the SLO is a measurable business oracle; AI triage, summarization and drafting must all be grounded and verified; and the safety boundary — AI doesn't self-merge, self-loosen oracles, or self-disable tests — is what senior interviewers value most. Saying this with a concrete example shows systems thinking, not tool memorization.",
        "「統合とは層のオラクルを整合させることであり、一緒に走らせることではない。AI は機械的部分で速度を増幅し、人間がオラクルとマージを保持する。」この一言が記事全体を包みます。E2E/API/性能/可観測性の四層は各々オラクルを持つが trace-id と不変条件レジストリで結ばれる。SLO は測定可能な業務オラクル。AI のトリアージ・要約・下書きはすべて接地され検証されねばならない。そして安全境界——AI は自己マージせず、オラクルを自己緩和せず、テストを自己無効化しない——がシニア面接官の最も評価する点です。これを具体例とともに言えれば、ツールの暗記ではなくシステム思考を示せます。",
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — End-to-end AI-agent QA cho SaaS multi-tenant (RBAC + billing)
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh: SaaS multi-tenant và những bất biến sống còn",
      en: "1. Context: multi-tenant SaaS and its life-or-death invariants",
      ja: "1. 背景: マルチテナント SaaS と生死を分ける不変条件",
    },
    blocks: [
      P(
        "Một SaaS multi-tenant phục vụ nhiều khách hàng (tenant) trên cùng một hệ thống: Acme và Globex dùng chung code, chung database, nhưng dữ liệu của họ phải tuyệt đối tách biệt. Đây là mô hình kinh doanh phổ biến nhất của phần mềm hiện đại, và cũng là nơi một lỗi có thể phá huỷ cả công ty chỉ trong một sự cố. Nếu một người dùng của Acme nhìn thấy dù chỉ một hoá đơn của Globex, đó không phải 'bug nhỏ' — đó là vi phạm cô lập tenant (テナント分離), một sự cố bảo mật và pháp lý có thể chấm dứt hợp đồng và làm mất niềm tin không bao giờ lấy lại được. Bài này trình bày cách một agent QA end-to-end kiểm những bất biến đó bằng cách kết hợp UI, API và kiểm dữ liệu, trong khuôn khổ guardrail chặt chẽ.",
        "A multi-tenant SaaS serves many customers (tenants) on one system: Acme and Globex share code, share a database, but their data must be absolutely separated. This is the most common business model of modern software, and also where a single fault can destroy a company in one incident. If one Acme user sees even a single Globex invoice, that is not a 'small bug' — it is a tenant-isolation breach, a security and legal incident that can end contracts and destroy trust irrecoverably. This article shows how an end-to-end QA agent checks such invariants by combining UI, API and data checks, within tight guardrails.",
        "マルチテナント SaaS は一つのシステム上で多数の顧客(テナント)にサービスを提供します。Acme と Globex はコードを共有し、データベースを共有しますが、そのデータは絶対に分離されねばなりません。これは現代ソフトウェアの最も一般的なビジネスモデルであり、一つの欠陥が一度のインシデントで会社を破壊し得る場所でもあります。Acme のユーザーが Globex の請求書を一枚でも見れば、それは「小さなバグ」ではありません——テナント分離の侵害であり、契約を終わらせ二度と取り戻せない信頼を破壊するセキュリティ・法的インシデントです。本記事は、end-to-end QA エージェントが UI・API・データ検査を組み合わせ、厳格なガードレール内でそうした不変条件をどう検証するか示します。",
      ),
      P(
        "Xuyên suốt bài, ta bám hai bất biến trụ cột. Thứ nhất là cô lập tenant: mọi truy vấn dữ liệu phải được lọc theo tenant_id, không có ngoại lệ, và không người dùng nào của tenant này thấy được dữ liệu của tenant khác. Thứ hai là đúng quyền theo RBAC: quyền thực tế của một người dùng không bao giờ vượt quá quyền mà role của họ cho phép, và cũng chỉ trong tenant của họ. Bên cạnh đó là bất biến về billing: đo lường (metering) đúng, tính tiền đúng, và mọi thao tác thanh toán phải idempotent để một lần bấm không bao giờ tính tiền hai lần. Ba nhóm bất biến này là oracle mà agent QA sẽ liên tục kiểm.",
        "Throughout the article we anchor to two pillar invariants. First is tenant isolation: every data query must be filtered by tenant_id, no exceptions, and no user of one tenant can see another tenant's data. Second is RBAC correctness: a user's effective permissions never exceed what their role allows, and only within their own tenant. Alongside is the billing invariant: correct metering, correct charging, and every payment operation must be idempotent so one click never charges twice. These three groups of invariants are the oracles the QA agent will continuously check.",
        "本記事を通じて二つの柱となる不変条件に接地します。第一はテナント分離です。あらゆるデータクエリは例外なく tenant_id でフィルタされねばならず、あるテナントのユーザーは別のテナントのデータを見られません。第二は RBAC の正しさです。ユーザーの実効権限はロールが許す範囲を決して超えず、しかも自テナント内に限られます。加えて課金の不変条件があります。正しい計量(メータリング)、正しい課金、そしてあらゆる決済操作は冪等でなければならず、一度のクリックが二度課金しません。これら三群の不変条件が、QA エージェントが継続的に検証するオラクルです。",
      ),
      IMG(
        SVG_TENANT,
        "Bất biến cô lập tenant và RBAC: tường ngăn giữa Tenant A và B — không rò dữ liệu chéo.",
        "Tenant isolation and RBAC invariants: a wall between Tenant A and B — no cross-tenant leak.",
        "テナント分離と RBAC の不変条件: テナント A と B の間の壁——テナント間の漏洩なし。",
      ),
      NOTE(
        "Trong multi-tenant, phần lớn lỗi nghiêm trọng không phải 'tính năng không chạy' mà là 'tính năng chạy quá tay': trả về nhiều hơn được phép, cho quyền cao hơn role. Oracle phải kiểm cả điều KHÔNG được xảy ra, không chỉ điều nên xảy ra.",
        "In multi-tenant, most serious bugs are not 'feature doesn't work' but 'feature works too much': returning more than allowed, granting more than the role. Oracles must check what must NOT happen, not only what should happen.",
        "マルチテナントでは、深刻なバグの大半は「機能が動かない」ではなく「機能が働きすぎる」です。許可以上を返す、ロール以上の権限を与える。オラクルは起こるべきことだけでなく起こってはならないことも検証せねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Cô lập tenant làm oracle: bất biến 'không rò dữ liệu chéo'",
      en: "2. Tenant isolation as oracle: the 'no cross-tenant leak' invariant",
      ja: "2. オラクルとしてのテナント分離: 「テナント間漏洩なし」の不変条件",
    },
    blocks: [
      P(
        "Cô lập tenant là oracle mạnh nhất và cũng khó kiểm đầy đủ nhất, vì nó là một bất biến phủ định: không được có bất kỳ đường nào để dữ liệu của tenant này lọt sang tenant khác. Không thể liệt kê hết mọi đường, nên chiến lược là kiểm theo lớp. Ở tầng dữ liệu, ta khẳng định mọi truy vấn đều mang điều kiện tenant_id. Ở tầng API, ta thử đăng nhập bằng tài khoản tenant A rồi cố tình yêu cầu định danh tài nguyên của tenant B, và oracle là hệ thống phải trả 403 hoặc 404 — tuyệt đối không phải 200 kèm dữ liệu. Ở tầng UI, ta kiểm rằng không màn hình nào, không bộ lọc nào, không đường dẫn sâu nào để lộ dữ liệu chéo. Agent QA đi qua cả ba lớp cho cùng một bất biến.",
        "Tenant isolation is the strongest oracle and also the hardest to check exhaustively, because it is a negative invariant: there must be no path whatsoever for one tenant's data to leak to another. You cannot enumerate every path, so the strategy is layered checking. At the data layer, we assert every query carries a tenant_id condition. At the API layer, we log in as a tenant A account and deliberately request a tenant B resource identifier, and the oracle is that the system must return 403 or 404 — absolutely not 200 with data. At the UI layer, we check that no screen, no filter, no deep link exposes cross-tenant data. The QA agent traverses all three layers for the same invariant.",
        "テナント分離は最も強力なオラクルであり、網羅的に検証するのが最も難しくもあります。否定的不変条件だからです。あるテナントのデータが別へ漏れる経路が一切あってはなりません。すべての経路を列挙できないので、戦略は層別の検証です。データ層では、あらゆるクエリが tenant_id 条件を持つことをアサートします。API 層では、テナント A のアカウントでログインし、意図的にテナント B のリソース識別子を要求し、オラクルはシステムが 403 または 404 を返すこと——決してデータ付きの 200 ではありません。UI 層では、どの画面・フィルタ・ディープリンクもテナント間データを露出しないことを検証します。QA エージェントは同じ不変条件のために三層すべてを横断します。",
      ),
      CODE(
        "ts",
        `// tests/isolation/cross-tenant.spec.ts — oracle PHỦ ĐỊNH: không rò chéo
import { test, expect } from '@playwright/test';
import { db } from '../support/db';

test('user tenant A KHÔNG truy cập được tài nguyên tenant B', async ({ request }) => {
  const aToken = await loginAs('alice@acme.test');       // tenant A
  const bInvoice = await db.oneInvoiceOf('tenant-B');    // 1 hoá đơn thật của B

  // Cố tình gọi bằng token A, xin resource của B
  const res = await request.get(\`/api/invoices/\${bInvoice.id}\`,
    { headers: { Authorization: \`Bearer \${aToken}\` } });

  // Oracle: PHẢI bị chặn. 200 kèm data = sự cố nghiêm trọng.
  expect([403, 404]).toContain(res.status());
  if (res.status() === 200) {
    throw new Error('TENANT LEAK: A đọc được hoá đơn của B — sự cố nghiêm trọng');
  }
});`,
      ),
      P(
        "Chú ý test trên dùng 404 hoặc 403 làm oracle, và có lý do tinh tế. Trả 403 (cấm) tiết lộ rằng tài nguyên tồn tại nhưng bạn không có quyền — đôi khi đây đã là rò rỉ thông tin. Nhiều hệ thống multi-tenant cẩn thận chọn trả 404 (không tồn tại) cho tài nguyên của tenant khác, để người dùng tenant A thậm chí không biết một hoá đơn của B có tồn tại hay không. Việc chọn 403 hay 404 là một quyết định thiết kế bảo mật mà QA cần biết để đặt oracle đúng. Điều tuyệt đối cấm là 200 kèm dữ liệu: đó là rò rỉ thật sự, và test phải hét lên rõ ràng khi gặp.",
        "Notice the test uses 404 or 403 as the oracle, and there is a subtle reason. Returning 403 (forbidden) reveals that the resource exists but you lack permission — sometimes that itself is information leakage. Many careful multi-tenant systems choose to return 404 (not found) for another tenant's resource, so a tenant A user doesn't even know whether a B invoice exists. Choosing 403 or 404 is a security design decision QA must know to set the right oracle. What is absolutely forbidden is 200 with data: that is a real leak, and the test must scream clearly when it happens.",
        "テストが 404 または 403 をオラクルとして使う点に注目してください。微妙な理由があります。403(禁止)を返すことはリソースが存在するが権限がないことを明かします——時にそれ自体が情報漏洩です。多くの慎重なマルチテナントシステムは、別テナントのリソースに 404(存在しない)を返すことを選びます。テナント A のユーザーが B の請求書の存在すら知らないように。403 か 404 かの選択は QA が正しいオラクルを設定するため知るべきセキュリティ設計判断です。絶対に禁じられるのはデータ付きの 200 です。それは本物の漏洩であり、テストは遭遇時に明確に叫ばねばなりません。",
      ),
      WARN(
        "Đừng chỉ kiểm cô lập ở tầng UI. UI có thể ẩn nút nhưng API vẫn trả dữ liệu nếu gọi trực tiếp. Kẻ tấn công không dùng UI của bạn — họ gọi thẳng API. Oracle cô lập PHẢI được kiểm ở tầng API và tầng dữ liệu, không chỉ UI.",
        "Don't check isolation at the UI layer only. The UI may hide a button while the API still returns data if called directly. An attacker doesn't use your UI — they call the API directly. The isolation oracle MUST be checked at the API and data layers, not just the UI.",
        "分離を UI 層だけで検証してはいけません。UI はボタンを隠せても、直接呼べば API はデータを返すかもしれません。攻撃者はあなたの UI を使いません——直接 API を呼びます。分離オラクルは UI だけでなく API 層とデータ層で検証されねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Ma trận RBAC: kiểm quyền theo role × hành động × tenant",
      en: "3. The RBAC matrix: checking permission by role × action × tenant",
      ja: "3. RBAC マトリクス: ロール × アクション × テナントで権限を検証",
    },
    blocks: [
      P(
        "RBAC (kiểm soát truy cập theo vai trò) trong multi-tenant là một không gian tổ hợp: mỗi role (admin, editor, viewer) có một tập hành động được phép, và điều đó phải đúng trong tenant của người dùng và sai ngoài tenant đó. Cách kiểm hiệu quả là dựng một ma trận: hàng là role, cột là hành động, ô là kết quả kỳ vọng (cho phép hay từ chối). Ma trận này chính là oracle — nó phát biểu rõ ràng ai được làm gì. Điều quan trọng là ma trận phải kiểm cả hai chiều: viewer phải bị từ chối khi cố xoá (quyền không được vượt role), và admin phải được phép khi cần (quyền không được thiếu). Nhiều bug bảo mật đến từ việc chỉ kiểm 'admin làm được' mà quên kiểm 'viewer không làm được'.",
        "RBAC (role-based access control) in multi-tenant is a combinatorial space: each role (admin, editor, viewer) has a set of allowed actions, and that must be true within the user's tenant and false outside it. The efficient way to check is to build a matrix: rows are roles, columns are actions, cells are the expected result (allow or deny). This matrix is the oracle — it clearly states who may do what. Crucially, the matrix must check both directions: a viewer must be denied when trying to delete (permission must not exceed the role), and an admin must be allowed when needed (permission must not be missing). Many security bugs come from checking only 'admin can' while forgetting to check 'viewer cannot'.",
        "マルチテナントにおける RBAC(ロールベースアクセス制御)は組み合わせ空間です。各ロール(admin、editor、viewer)は許可されたアクションの集合を持ち、それはユーザーのテナント内で真、外で偽でなければなりません。効率的な検証法はマトリクスの構築です。行がロール、列がアクション、セルが期待結果(許可か拒否)。このマトリクスがオラクルです——誰が何をできるか明確に述べます。重要なのは、マトリクスが両方向を検証せねばならないことです。viewer は削除を試みたとき拒否されねばならず(権限がロールを超えない)、admin は必要時に許可されねばなりません(権限が欠けない)。多くのセキュリティバグは「admin ができる」だけを検証し「viewer ができない」の検証を忘れることから来ます。",
      ),
      CODE(
        "ts",
        `// tests/rbac/matrix.spec.ts — ma trận role × action, kiểm CẢ HAI chiều
const MATRIX: Record<string, Record<string, boolean>> = {
  admin:  { read: true,  create: true,  update: true,  delete: true,  billing: true },
  editor: { read: true,  create: true,  update: true,  delete: false, billing: false },
  viewer: { read: true,  create: false, update: false, delete: false, billing: false },
};

for (const [role, actions] of Object.entries(MATRIX)) {
  for (const [action, allowed] of Object.entries(actions)) {
    test(\`\${role} \${action} -> \${allowed ? 'ALLOW' : 'DENY'}\`, async ({ request }) => {
      const token = await loginWithRole(role, 'tenant-A');
      const res = await callAction(request, action, token);
      if (allowed) expect(res.status()).toBeLessThan(300);       // được phép
      else expect([403, 404]).toContain(res.status());           // bị từ chối
    });
  }
}`,
      ),
      P(
        "Sinh test từ một ma trận có hai lợi ích lớn. Thứ nhất, nó đảm bảo tính đầy đủ: mọi ô role × action đều được kiểm, không sót trường hợp 'viewer xoá'. Thứ hai, bản thân ma trận trở thành tài liệu sống về chính sách phân quyền — khi ai đó muốn biết editor có được xoá không, họ đọc ma trận chứ không phải đọc code. Đây là nơi AI hữu ích: bạn mô tả chính sách RBAC bằng ngôn ngữ tự nhiên, AI dựng ma trận đầu tiên, rồi bạn — con người — review từng ô, đặc biệt các ô 'từ chối', vì đó là nơi bug bảo mật ẩn nấp. AI dựng khung nhanh; con người xác nhận đúng chính sách nghiệp vụ.",
        "Generating tests from a matrix has two big benefits. First, it ensures completeness: every role × action cell is checked, no missed 'viewer deletes' case. Second, the matrix itself becomes living documentation of the authorization policy — when someone wants to know whether an editor can delete, they read the matrix, not the code. This is where AI helps: you describe the RBAC policy in natural language, AI builds the first matrix, then you — the human — review each cell, especially the 'deny' cells, because that is where security bugs hide. AI scaffolds fast; humans confirm the correct business policy.",
        "マトリクスからテストを生成することには二つの大きな利点があります。第一に網羅性を保証します。あらゆるロール × アクションのセルが検証され、「viewer が削除」のケースを見落としません。第二にマトリクス自体が認可ポリシーの生きたドキュメントになります。editor が削除できるか知りたい人はコードではなくマトリクスを読みます。ここで AI が役立ちます。RBAC ポリシーを自然言語で記述すると AI が最初のマトリクスを構築し、それからあなた——人間——が各セル、特に「拒否」セルをレビューします。そこにセキュリティバグが潜むからです。AI が素早く骨組みを作り、人間が正しい業務ポリシーを確認します。",
      ),
      QA(
        "Vì sao kiểm 'viewer KHÔNG xoá được' lại quan trọng ngang 'admin xoá được'?",
        "Why is checking 'viewer CANNOT delete' as important as 'admin can delete'?",
        "Vì lỗ hổng leo thang quyền (privilege escalation) nằm ở chiều phủ định. Nếu chỉ kiểm 'admin xoá được', một bug cho phép viewer cũng xoá được sẽ lọt qua hoàn toàn — pipeline vẫn xanh vì admin vẫn hoạt động. Chiều 'ai KHÔNG được làm gì' mới là nơi bảo mật thật sự sống. Một hệ thống mà mọi role đều làm được mọi thứ vẫn 'chạy đúng' theo nghĩa chức năng, nhưng là thảm hoạ bảo mật. Vì thế ma trận RBAC phải cân bằng: mỗi ô 'cho phép' đi kèm các ô 'từ chối' tương ứng, và các ô từ chối thường là nơi tôi soi kỹ nhất.",
        "Because the privilege escalation vulnerability lives on the negative side. If you only check 'admin can delete', a bug that also lets a viewer delete slips through entirely — the pipeline stays green because admin still works. The 'who CANNOT do what' direction is where security actually lives. A system where every role can do everything still 'works correctly' functionally, but is a security disaster. So the RBAC matrix must be balanced: each 'allow' cell comes with corresponding 'deny' cells, and the deny cells are usually where I scrutinize most.",
        "権限昇格(privilege escalation)の脆弱性は否定側に潜むからです。「admin が削除できる」だけを検証すると、viewer も削除できてしまうバグが完全にすり抜けます——admin は依然機能するのでパイプラインはグリーンのままです。「誰が何をできないか」の方向こそセキュリティが実際に生きる場所です。あらゆるロールが何でもできるシステムは機能的には「正しく動く」ものの、セキュリティの災害です。だから RBAC マトリクスは均衡せねばなりません。各「許可」セルには対応する「拒否」セルが伴い、拒否セルは通常私が最も精査する場所です。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Billing và metering: đúng số, đúng lần, idempotent",
      en: "4. Billing and metering: right amount, right count, idempotent",
      ja: "4. 課金と計量: 正しい金額・正しい回数・冪等",
    },
    blocks: [
      P(
        "Billing trong SaaS là nơi lỗi biến trực tiếp thành tiền mất hoặc khách giận. Có ba nhóm bất biến. Thứ nhất là metering đúng: nếu tính tiền theo lượng dùng (số API call, số user, dung lượng), thì con số đo phải khớp thực tế — không tính thiếu (mất doanh thu) cũng không tính thừa (mất niềm tin). Thứ hai là tính tiền đúng: áp đúng gói, đúng đơn giá, đúng giảm giá, đúng thuế. Thứ ba, và thường bị bỏ sót nhất, là idempotency của thao tác thanh toán: một webhook thanh toán bị gửi lại, một người dùng bấm 'thanh toán' hai lần vì mạng chậm — hệ thống tuyệt đối không được tính tiền hai lần. Đây chính là bất biến idempotency (冪等性) trong ngữ cảnh billing.",
        "Billing in SaaS is where a fault turns directly into lost money or angry customers. There are three groups of invariants. First is correct metering: if you charge by usage (API calls, seats, storage), the measured number must match reality — neither undercounting (lost revenue) nor overcounting (lost trust). Second is correct charging: apply the right plan, unit price, discount, and tax. Third, and most often missed, is payment-operation idempotency: a payment webhook is re-delivered, a user clicks 'pay' twice due to a slow network — the system must absolutely never charge twice. This is exactly the idempotency invariant in the billing context.",
        "SaaS における課金は、欠陥が直接お金の損失や顧客の怒りに変わる場所です。三群の不変条件があります。第一は正しい計量です。使用量(API 呼び出し数、シート数、ストレージ)で課金するなら、測定値は現実と一致せねばなりません——過少計上(収益損失)も過大計上(信頼喪失)もいけません。第二は正しい課金です。正しいプラン、単価、割引、税を適用する。第三に、最も見落とされやすいのが決済操作の冪等性です。決済 Webhook が再配信される、ネットワークが遅くユーザーが「支払う」を二度押す——システムは絶対に二度課金してはなりません。これがまさに課金文脈における冪等性の不変条件です。",
      ),
      CODE(
        "ts",
        `// tests/billing/idempotency.spec.ts — webhook gửi lại KHÔNG tính tiền 2 lần
import { test, expect } from '@playwright/test';

test('webhook thanh toán trùng eventId -> chỉ ghi nợ MỘT lần', async ({ request }) => {
  const eventId = 'evt_' + crypto.randomUUID();
  const payload = { eventId, tenantId: 'tenant-A', amount: 4900, type: 'invoice.paid' };

  // Gửi cùng một webhook 3 lần (mô phỏng retry của cổng thanh toán)
  for (let i = 0; i < 3; i++) {
    await request.post('/webhooks/billing', { data: payload,
      headers: { 'x-signature': sign(payload) } });
  }

  // Oracle: chỉ đúng 1 bản ghi thanh toán cho eventId này
  const charges = await request.get(\`/api/charges?eventId=\${eventId}\`);
  expect((await charges.json()).length).toBe(1);
  // Oracle 2: số dư tenant chỉ bị trừ 4900 MỘT lần
  const acct = await request.get('/api/tenants/tenant-A/account');
  expect((await acct.json()).lastCharge).toBe(4900);
});`,
      ),
      P(
        "Bài test trên gửi cùng một webhook ba lần và khẳng định chỉ có đúng một bản ghi thanh toán — đây là cách kiểm idempotency ở tầng billing. Cơ chế backend thường dùng là lưu eventId đã xử lý và bỏ qua các lần lặp; nhiệm vụ của QA là chứng minh cơ chế đó thật sự hoạt động dưới điều kiện thực tế của cổng thanh toán, vốn hay gửi lại webhook nhiều lần. Ngoài idempotency, agent QA còn cần kiểm các nhánh khó: thanh toán một phần, hoàn tiền, đổi gói giữa kỳ (proration), và tenant bị khoá do quá hạn. Mỗi nhánh là một oracle riêng, và vì đụng đến tiền nên mỗi oracle phải được con người xác nhận, không phó mặc AI.",
        "The test above sends the same webhook three times and asserts exactly one payment record — this is how you check idempotency at the billing layer. The backend mechanism is usually to store processed eventIds and skip repeats; QA's job is to prove that mechanism actually works under the real conditions of payment gateways, which often re-deliver webhooks many times. Beyond idempotency, the QA agent must also check hard branches: partial payments, refunds, mid-cycle plan changes (proration), and tenants locked for overdue payment. Each branch is its own oracle, and because it touches money each oracle must be human-confirmed, not left to AI.",
        "上のテストは同じ Webhook を三度送り、正確に一つの決済記録をアサートします——これが課金層で冪等性を検証する方法です。バックエンドの仕組みは通常、処理済みの eventId を保存し繰り返しをスキップします。QA の仕事は、Webhook を何度も再配信しがちな決済ゲートウェイの実条件下でその仕組みが実際に機能することを証明することです。冪等性の他に、QA エージェントは難しい分岐も検証せねばなりません。一部支払い、返金、期中のプラン変更(日割り計算)、支払い延滞でロックされたテナント。各分岐は固有のオラクルであり、お金に触れるので各オラクルは AI に委ねず人間が確認せねばなりません。",
      ),
      TIP(
        "Kiểm billing với số tiền dùng đơn vị nhỏ nhất (xu/đồng) dạng số nguyên, không dùng số thực. Lỗi làm tròn số thực là nguồn sai lệch billing kinh điển — 0.1 + 0.2 ≠ 0.3 trong dấu phẩy động.",
        "Check billing amounts using the smallest unit (cents) as integers, not floats. Float rounding errors are a classic source of billing discrepancy — 0.1 + 0.2 ≠ 0.3 in floating point.",
        "課金額は浮動小数点ではなく最小単位(セント)の整数で検証しましょう。浮動小数点の丸め誤差は課金の食い違いの古典的な原因です——浮動小数点では 0.1 + 0.2 ≠ 0.3。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Agent QA thăm dò có guardrail: bounded exploration",
      en: "5. Guardrailed exploratory QA agent: bounded exploration",
      ja: "5. ガードレール付き探索 QA エージェント: 境界のある探索",
    },
    blocks: [
      P(
        "Sức mạnh của một agent QA là nó có thể tự thăm dò: đăng nhập bằng nhiều role, thử nhiều đường dẫn, cố tình gọi API vượt quyền để tìm lỗ hổng cô lập. Nhưng chính sức mạnh đó là nguy hiểm nếu không có guardrail. Một agent không giới hạn có thể vô tình xoá tenant thật, seed tiền thật, hay chạy vô hạn đốt token. Vì thế agent QA phải chạy trong một vòng lặp plan–act–observe–check có ngân sách bước và timeout cứng, chỉ thao tác trên các tenant test cố định (A_test, B_test), với token quyền thấp và whitelist domain staging. Mọi phát hiện của agent là report kèm bằng chứng, không bao giờ là hành động tự sửa. Guardrail không phải giới hạn năng lực — nó là điều kiện để năng lực đó được tin dùng.",
        "The power of a QA agent is that it can explore on its own: log in as many roles, try many paths, deliberately call APIs beyond its permissions to find isolation holes. But that very power is dangerous without guardrails. An unbounded agent could accidentally delete a real tenant, seed real money, or loop forever burning tokens. So the QA agent must run in a plan–act–observe–check loop with a step budget and a hard timeout, operating only on fixed test tenants (A_test, B_test), with a low-privilege token and a staging-domain whitelist. Every agent finding is a report with evidence, never a self-fixing action. Guardrails are not a limit on capability — they are the condition for that capability to be trusted.",
        "QA エージェントの強みは自ら探索できることです。多数のロールでログインし、多数の経路を試し、意図的に権限を超えて API を呼び分離の穴を探す。しかしその力こそガードレールなしでは危険です。境界のないエージェントは誤って実テナントを削除し、実際のお金を投入し、無限ループでトークンを燃やし得ます。だから QA エージェントは、ステップ予算と厳格なタイムアウトを持つ plan–act–observe–check ループで走り、固定のテストテナント(A_test、B_test)のみを操作し、低権限トークンとステージングドメインのホワイトリストを持たねばなりません。エージェントのあらゆる発見は証拠付きのレポートであり、決して自己修復アクションではありません。ガードレールは能力の制限ではなく、その能力が信頼される条件です。",
      ),
      IMG(
        SVG_AGENT_LOOP,
        "Vòng lặp agent QA có guardrail: plan–act–observe–check, đối chiếu UI + API + dữ liệu.",
        "Guardrailed QA agent loop: plan–act–observe–check, cross-checking UI + API + data.",
        "ガードレール付き QA エージェントループ: plan–act–observe–check、UI + API + データを照合。",
      ),
      CODE(
        "yaml",
        `# agent/guardrails.yml — ranh giới cứng cho agent QA thăm dò
scope:
  tenants: [tenant-A_test, tenant-B_test]   # CHỈ tenant test, không tenant thật
  base_url: https://staging.app.test        # whitelist domain
  forbidden_domains: ["*.prod.*", "*.pay.live"]
budget:
  max_steps: 40                # ngân sách bước mỗi phiên
  timeout_sec: 300             # timeout cứng
  max_tokens: 60000            # cap chi phí
permissions:
  token_ttl: 15m               # token ephemeral, hết hạn ngắn
  may_read: true
  may_write_test_data: true    # chỉ trên tenant test
  may_delete_tenant: false     # TUYỆT ĐỐI không
  may_change_rbac_config: false
output:
  mode: report_only            # phát hiện -> report + trace, KHÔNG tự sửa
  must_attach_evidence: true`,
      ),
      P(
        "Trường mode: report_only là linh hồn của thiết kế này. Agent được tự do thăm dò rộng — đó là việc cơ học mà nó làm nhanh hơn người — nhưng mọi phát hiện đều dừng ở mức report kèm bằng chứng để con người xác nhận. Điều này ngăn cái bẫy nguy hiểm nhất: agent 'tự chữa' bằng cách nới oracle hay tự đóng một phát hiện là 'không phải bug'. Trong multi-tenant, một phát hiện rò rỉ chéo tenant mà bị agent tự đóng nhầm sẽ thành thảm hoạ. Guardrail phạm vi (chỉ tenant test) và guardrail quyền (không xoá, không đổi RBAC) bảo vệ khỏi thiệt hại vật lý; guardrail report_only bảo vệ khỏi thiệt hại phán đoán.",
        "The mode: report_only field is the soul of this design. The agent is free to explore broadly — that mechanical work it does faster than people — but every finding stops at a report with evidence for human confirmation. This prevents the most dangerous trap: the agent 'self-healing' by loosening an oracle or self-closing a finding as 'not a bug'. In multi-tenant, a cross-tenant leak finding wrongly self-closed by the agent would be a disaster. The scope guardrail (test tenants only) and permission guardrail (no delete, no RBAC change) protect against physical damage; the report_only guardrail protects against judgment damage.",
        "mode: report_only フィールドがこの設計の魂です。エージェントは広く探索する自由を持ちます——人間より速く行う機械的作業です——しかしあらゆる発見は人間の確認のため証拠付きレポートで止まります。これは最も危険な罠を防ぎます。エージェントがオラクルを緩めて「自己修復」したり、発見を「バグではない」と自己クローズすること。マルチテナントでは、エージェントが誤って自己クローズしたテナント間漏洩の発見は災害になります。スコープのガードレール(テストテナントのみ)と権限のガードレール(削除なし、RBAC 変更なし)は物理的損害から守り、report_only のガードレールは判断の損害から守ります。",
      ),
      WARN(
        "Không bao giờ cho agent QA quyền trên tenant thật, dù chỉ đọc. Một agent 'chỉ đọc' vẫn có thể vô tình kích hoạt side-effect (gửi email, tính usage). Luôn cách ly agent trong một sandbox tenant test có dữ liệu giả.",
        "Never give the QA agent access to real tenants, even read-only. A 'read-only' agent can still accidentally trigger side effects (sending emails, counting usage). Always isolate the agent in a sandbox test tenant with fake data.",
        "QA エージェントに実テナントへの権限を、読み取り専用でも決して与えないでください。「読み取り専用」のエージェントでも誤って副作用(メール送信、使用量計上)を引き起こし得ます。常にエージェントを偽データを持つサンドボックステストテナントに隔離しましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Kết hợp UI + API + kiểm dữ liệu cho cùng một bất biến",
      en: "6. Combining UI + API + data checks for one invariant",
      ja: "6. 一つの不変条件のための UI + API + データ検査の組み合わせ",
    },
    blocks: [
      P(
        "Điểm mạnh nhất của agent QA end-to-end là nó có thể đối chiếu ba nguồn sự thật cho cùng một bất biến, và mâu thuẫn giữa chúng thường chính là bug. Ví dụ với bất biến cô lập tenant: UI của tenant A không hiển thị hoá đơn của B (nguồn 1), API gọi bằng token A xin hoá đơn B trả 404 (nguồn 2), và truy vấn database trực tiếp xác nhận mọi hàng invoice đều có tenant_id đúng (nguồn 3). Khi cả ba đồng thuận, bất biến được bảo vệ vững chắc. Nhưng khi UI ẩn mà API vẫn trả, hoặc API chặn mà database có hàng thiếu tenant_id, mâu thuẫn đó lộ ra một lỗ hổng mà kiểm một tầng đơn lẻ sẽ bỏ sót. Agent giỏi là agent biết đối chiếu ba nguồn, không tin một nguồn.",
        "The greatest strength of an end-to-end QA agent is that it can cross-check three sources of truth for the same invariant, and a contradiction among them is often the bug itself. Take the tenant-isolation invariant: tenant A's UI does not show B's invoices (source 1), the API called with an A token requesting a B invoice returns 404 (source 2), and a direct database query confirms every invoice row has the right tenant_id (source 3). When all three agree, the invariant is firmly protected. But when the UI hides while the API still returns, or the API blocks while the database has rows missing tenant_id, that contradiction exposes a hole single-layer checking would miss. A good agent is one that cross-checks three sources and trusts none alone.",
        "end-to-end QA エージェントの最大の強みは、同じ不変条件について三つの真実の源を照合でき、それらの間の矛盾がしばしばバグそのものであることです。テナント分離の不変条件を例にとります。テナント A の UI は B の請求書を表示しない(源 1)、A のトークンで B の請求書を要求した API は 404 を返す(源 2)、直接のデータベースクエリはあらゆる請求書の行が正しい tenant_id を持つと確認する(源 3)。三つすべてが一致するとき、不変条件は堅固に守られます。しかし UI が隠すのに API が返す、あるいは API が阻むのにデータベースに tenant_id を欠く行がある——その矛盾が単一層の検証では見落とす穴を露呈します。良いエージェントは三つの源を照合し、一つも単独では信じません。",
      ),
      CODE(
        "ts",
        `// agent/triangulate.ts — đối chiếu 3 nguồn cho bất biến cô lập tenant
export async function triangulateIsolation(agent, tenantA, bResourceId) {
  // Nguồn 1: UI — tenant A không thấy resource của B
  const uiVisible = await agent.ui.isResourceVisible(bResourceId);
  // Nguồn 2: API — gọi trực tiếp bằng token A
  const apiStatus = await agent.api.get(\`/invoices/\${bResourceId}\`, tenantA.token);
  // Nguồn 3: DB — hàng đó có đúng tenant_id không
  const dbRow = await agent.db.query('SELECT tenant_id FROM invoices WHERE id=$1', [bResourceId]);

  const findings = [];
  if (uiVisible) findings.push({ severity: 'critical', src: 'ui', msg: 'UI lộ resource của B' });
  if (apiStatus === 200) findings.push({ severity: 'critical', src: 'api', msg: 'API trả data B cho token A' });
  if (dbRow?.tenant_id === tenantA.id) findings.push({ severity: 'critical', src: 'db', msg: 'DB gán sai tenant_id' });

  return { invariant: 'tenant_isolation', consistent: findings.length === 0, findings };
}`,
      ),
      P(
        "Hàm triangulate ở trên trả về một danh sách findings kèm mức nghiêm trọng và nguồn phát hiện. Cấu trúc này rất quan trọng cho bước tiếp theo: khi agent báo cáo, mỗi finding trỏ rõ nó đến từ UI, API hay DB, để con người biết chính xác chỗ nào phá vỡ bất biến. Trong multi-tenant, mọi finding về cô lập tenant đều được đánh severity critical mặc định, vì ngay cả một hàng rò rỉ cũng là sự cố lớn. Cách tiếp cận đa nguồn này cũng làm cho việc AI hallucinate khó gây hại hơn: nếu AI 'nghĩ' có rò rỉ nhưng cả ba nguồn tất định đều nhất quán rằng không, thì kết quả tất định thắng — con người tin dữ liệu kiểm chứng được, không tin lời kể của agent.",
        "The triangulate function above returns a list of findings with severity and detection source. This structure matters for the next step: when the agent reports, each finding clearly points to whether it came from the UI, API or DB, so the human knows exactly where the invariant broke. In multi-tenant, every tenant-isolation finding is marked critical severity by default, because even one leaked row is a major incident. This multi-source approach also makes AI hallucination harder to cause harm: if the AI 'thinks' there is a leak but all three deterministic sources consistently say no, the deterministic result wins — humans trust verifiable data, not the agent's narrative.",
        "上の triangulate 関数は重大度と検出源付きの findings リストを返します。この構造は次のステップに重要です。エージェントが報告するとき、各 finding が UI・API・DB のどこから来たか明確に示すので、人間は不変条件が壊れた場所を正確に知ります。マルチテナントでは、あらゆるテナント分離の finding はデフォルトで critical 重大度に印付けされます。一行の漏洩でも重大インシデントだからです。この多源アプローチは AI ハルシネーションが害を及ぼしにくくもします。AI が漏洩があると「思って」も三つの決定論的な源が一貫して否と言うなら、決定論的結果が勝ちます——人間は検証可能なデータを信じ、エージェントの語りを信じません。",
      ),
      NOTE(
        "Quy tắc đối chiếu ba nguồn: khi UI, API và DB bất đồng, luôn coi đó là bug cho đến khi chứng minh ngược lại. Bất đồng giữa các nguồn hầu như luôn phơi bày một lỗ hổng ở đâu đó trong chuỗi phân quyền.",
        "The three-source cross-check rule: when UI, API and DB disagree, always treat it as a bug until proven otherwise. Disagreement between sources almost always exposes a hole somewhere in the authorization chain.",
        "三源照合の規則: UI・API・DB が食い違うとき、反証されるまで常にバグとして扱いましょう。源の間の食い違いは、ほぼ常に認可チェーンのどこかの穴を露呈します。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ca lỗi sâu #1: leo thang quyền qua tham số ẩn",
      en: "7. Deep failure #1: privilege escalation via a hidden parameter",
      ja: "7. 深い障害 #1: 隠しパラメータによる権限昇格",
    },
    blocks: [
      P(
        "Một trong những ca lỗi nguy hiểm và tinh vi nhất trong multi-tenant là leo thang quyền qua tham số ẩn. Kịch bản: giao diện chỉ cho admin thấy nút 'đổi role người dùng', nên đội tin rằng chỉ admin đổi được role. Nhưng API đổi role nhận một tham số role trong body, và tầng backend quên kiểm rằng người gọi thực sự là admin của đúng tenant đó. Một editor tò mò mở DevTools, thấy request, tự gửi lại với role: 'admin' — và tự nâng mình thành admin. UI hoàn hảo, nhưng oracle phân quyền ở backend bị thủng. Đây là lý do vì sao oracle RBAC phải được kiểm ở tầng API bằng cách gọi trực tiếp, không chỉ tin vào việc UI ẩn nút.",
        "One of the most dangerous and subtle failures in multi-tenant is privilege escalation via a hidden parameter. The scenario: the UI shows the 'change user role' button only to admins, so the team believes only admins can change roles. But the change-role API takes a role parameter in the body, and the backend forgets to check that the caller really is an admin of that exact tenant. A curious editor opens DevTools, sees the request, resends it with role: 'admin' — and elevates themselves to admin. The UI is perfect, but the backend authorization oracle has a hole. This is why the RBAC oracle must be checked at the API layer by direct calls, not by trusting that the UI hides the button.",
        "マルチテナントで最も危険で微妙な障害の一つが、隠しパラメータによる権限昇格です。シナリオ: UI は「ユーザーロール変更」ボタンを admin にのみ表示するので、チームは admin だけがロールを変更できると信じます。しかしロール変更 API は body に role パラメータを取り、バックエンドは呼び出し元が本当にそのテナントの admin か検証するのを忘れます。好奇心旺盛な editor が DevTools を開き、リクエストを見て、role: 'admin' で再送し——自分を admin に昇格させます。UI は完璧ですが、バックエンドの認可オラクルに穴があります。これが RBAC オラクルを、UI がボタンを隠すことを信じるのではなく、直接呼び出しで API 層で検証せねばならない理由です。",
      ),
      SCEN(
        "Editor tự nâng mình thành admin",
        "An editor elevates themselves to admin",
        "Editor 'dan@globex' gọi thẳng PATCH /api/users/dan {role:'admin'} bằng token editor của chính mình. UI chưa từng cho anh ta nút này, nhưng API không kiểm role người GỌI, chỉ kiểm role trong body. Kết quả: dan thành admin của Globex, xem được mọi hoá đơn, đổi được billing. Agent QA bắt được ca này vì nó không kiểm qua UI mà gọi thẳng API với từng role, và oracle 'editor PATCH role -> phải 403' bật đỏ. Bài học: mọi endpoint đổi quyền phải kiểm quyền NGƯỜI GỌI ở phía server, độc lập với những gì UI hiển thị.",
        "Editor 'dan@globex' directly calls PATCH /api/users/dan {role:'admin'} with his own editor token. The UI never gave him this button, but the API doesn't check the CALLER's role, only the role in the body. Result: dan becomes a Globex admin, sees all invoices, can change billing. The QA agent catches this because it doesn't check via the UI but calls the API directly with each role, and the oracle 'editor PATCH role -> must be 403' goes red. Lesson: every permission-change endpoint must check the CALLER's authority server-side, independent of what the UI shows.",
        "editor の 'dan@globex' が自分の editor トークンで PATCH /api/users/dan {role:'admin'} を直接呼びます。UI は彼にこのボタンを与えたことがありませんが、API は呼び出し元のロールを検証せず、body 内のロールだけを検証します。結果: dan は Globex の admin になり、すべての請求書を見て、課金を変更できます。QA エージェントはこれを捕えます。UI 経由ではなく各ロールで直接 API を呼び、オラクル「editor が PATCH role → 403 でなければならない」が赤になるからです。教訓: あらゆる権限変更エンドポイントは、UI が示すものと独立に、サーバー側で呼び出し元の権限を検証せねばなりません。",
      ),
      CODE(
        "ts",
        `// tests/security/priv-escalation.spec.ts — kiểm quyền NGƯỜI GỌI, không tin UI
test('editor KHÔNG tự nâng role của mình lên admin', async ({ request }) => {
  const editorToken = await loginWithRole('editor', 'tenant-B');

  // Gọi thẳng API (bỏ qua UI) — đúng cách attacker làm
  const res = await request.patch('/api/users/self', {
    data: { role: 'admin' },
    headers: { Authorization: \`Bearer \${editorToken}\` },
  });

  // Oracle: server PHẢI từ chối vì NGƯỜI GỌI là editor, bất kể body nói gì
  expect([403, 404]).toContain(res.status());
  // Xác nhận trạng thái không đổi: vẫn là editor
  const me = await request.get('/api/users/self',
    { headers: { Authorization: \`Bearer \${editorToken}\` } });
  expect((await me.json()).role).toBe('editor');
});`,
      ),
      P(
        "Ca lỗi này minh hoạ một nguyên tắc bảo mật nền tảng: không bao giờ tin dữ liệu từ client để quyết định quyền. Role của người gọi phải được lấy từ token đã xác thực ở phía server, không bao giờ từ body request. Agent QA phát hiện được lớp lỗi này chính vì nó hành xử như một kẻ tấn công thật: bỏ qua UI, gọi thẳng API với mọi tổ hợp role và tham số. Đây là chỗ AI thăm dò tạo giá trị lớn — nó kiên nhẫn thử hàng trăm tổ hợp 'người gọi role X gọi endpoint Y với tham số Z' mà một người kiểm thử thủ công sẽ mệt mỏi bỏ sót. Nhưng nhớ guardrail: agent chỉ thử trên tenant test, và mọi phát hiện leo thang quyền được report_only để con người xác nhận và vá.",
        "This failure illustrates a foundational security principle: never trust client data to decide permissions. The caller's role must be taken from the authenticated token server-side, never from the request body. The QA agent catches this class of bug precisely because it behaves like a real attacker: bypassing the UI, calling the API directly with every combination of role and parameter. This is where exploratory AI creates great value — it patiently tries hundreds of 'caller role X calls endpoint Y with parameter Z' combinations that a manual tester would wearily miss. But remember the guardrail: the agent only tries on test tenants, and every privilege-escalation finding is report_only for humans to confirm and patch.",
        "この障害は基礎的なセキュリティ原則を示します。権限の決定にクライアントのデータを決して信頼しないこと。呼び出し元のロールはサーバー側の認証済みトークンから取得せねばならず、リクエスト body から決して取ってはなりません。QA エージェントがこの種のバグを捕えるのは、まさに実際の攻撃者のように振る舞うからです。UI を迂回し、あらゆるロールとパラメータの組み合わせで直接 API を呼ぶ。ここで探索的 AI が大きな価値を生みます——手動テスターがうんざりして見落とす「呼び出し元ロール X がパラメータ Z でエンドポイント Y を呼ぶ」の数百の組み合わせを辛抱強く試します。しかしガードレールを忘れずに。エージェントはテストテナントでのみ試し、あらゆる権限昇格の発見は人間が確認しパッチするための report_only です。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Ca lỗi sâu #2: rò dữ liệu chéo tenant qua bộ lọc thiếu",
      en: "8. Deep failure #2: cross-tenant leak via a missing filter",
      ja: "8. 深い障害 #2: フィルタ欠落によるテナント間データ漏洩",
    },
    blocks: [
      P(
        "Ca lỗi kinh điển thứ hai là rò dữ liệu chéo tenant do một truy vấn quên điều kiện tenant_id. Kịch bản thường xảy ra khi thêm tính năng mới: một lập trình viên viết endpoint tìm kiếm hoá đơn, dùng lại một truy vấn cũ nhưng quên thêm WHERE tenant_id = :current. Kết quả là tìm kiếm trả về hoá đơn của mọi tenant. Điều nguy hiểm là bug này có thể vô hình trong môi trường dev nơi chỉ có một tenant, và chỉ lộ ra trong production nơi có nhiều tenant. Đây là lý do agent QA phải luôn chạy với ít nhất hai tenant test có dữ liệu chồng lấn về mặt cấu trúc (cùng loại hoá đơn, cùng khoảng thời gian) để bất kỳ sự rò rỉ nào cũng lộ ngay.",
        "The second classic failure is a cross-tenant leak caused by a query forgetting the tenant_id condition. The scenario often occurs when adding a new feature: a developer writes an invoice-search endpoint, reuses an old query but forgets to add WHERE tenant_id = :current. As a result, the search returns invoices from every tenant. What's dangerous is this bug can be invisible in a dev environment with only one tenant, and only surfaces in production with many tenants. This is why the QA agent must always run with at least two test tenants whose data structurally overlaps (same invoice types, same date ranges) so any leak surfaces immediately.",
        "第二の古典的障害は、クエリが tenant_id 条件を忘れることによるテナント間漏洩です。このシナリオは新機能追加時によく起きます。開発者が請求書検索エンドポイントを書き、古いクエリを再利用するが WHERE tenant_id = :current の追加を忘れる。結果として検索はあらゆるテナントの請求書を返します。危険なのは、このバグがテナントが一つだけの開発環境では不可視で、多数のテナントがある本番でのみ表面化することです。これが QA エージェントが、構造的に重なるデータ(同じ請求書種別、同じ期間)を持つ少なくとも二つのテストテナントで常に走らねばならない理由です。あらゆる漏洩が即座に表面化するように。",
      ),
      CODE(
        "ts",
        `// tests/isolation/search-leak.spec.ts — tìm kiếm KHÔNG được trả data tenant khác
test('tìm kiếm hoá đơn chỉ trả kết quả của tenant hiện tại', async ({ request }) => {
  const aToken = await loginAs('alice@acme.test');   // tenant A
  // Cả A và B đều có hoá đơn khớp từ khoá "INV" -> phép thử chồng lấn
  const res = await request.get('/api/invoices/search?q=INV',
    { headers: { Authorization: \`Bearer \${aToken}\` } });

  const rows = await res.json();
  // Oracle: MỌI hàng trả về phải thuộc tenant A — không một hàng nào của B
  const leaked = rows.filter((r: any) => r.tenantId !== 'tenant-A');
  expect(leaked).toEqual([]);            // rỗng = an toàn
  if (leaked.length) {
    throw new Error(\`TENANT LEAK: search lộ \${leaked.length} hàng của tenant khác\`);
  }
});`,
      ),
      P(
        "Bài test trên cố tình dùng một từ khoá ('INV') khớp với hoá đơn của cả hai tenant, để nếu bộ lọc tenant_id bị thiếu, kết quả sẽ chứa hàng của B và test bật đỏ ngay. Đây là một mẫu thiết kế oracle quan trọng cho multi-tenant: luôn tạo dữ liệu 'mồi nhử' ở tenant khác có thể lọt vào kết quả nếu cô lập bị phá. Kiểm cô lập với dữ liệu không chồng lấn là kiểm giả, vì ngay cả một truy vấn thiếu lọc cũng có thể tình cờ không trả gì. Agent QA cần chủ động dựng những tình huống chồng lấn — cùng tên, cùng số, cùng khoảng thời gian — để ép bất biến cô lập phải chứng minh chính nó dưới áp lực thực.",
        "The test above deliberately uses a keyword ('INV') matching invoices in both tenants, so if the tenant_id filter is missing, the result will contain B's rows and the test goes red immediately. This is an important oracle-design pattern for multi-tenant: always create 'bait' data in another tenant that could enter the result if isolation is broken. Checking isolation with non-overlapping data is a fake check, because even a filter-less query might coincidentally return nothing. The QA agent must actively construct overlapping situations — same name, same number, same date range — to force the isolation invariant to prove itself under real pressure.",
        "上のテストは意図的に両テナントの請求書に一致するキーワード(「INV」)を使います。tenant_id フィルタが欠けていれば結果に B の行が含まれ、テストが即座に赤になるように。これはマルチテナントの重要なオラクル設計パターンです。分離が壊れたら結果に入り得る「おとり」データを常に別テナントに作ること。重ならないデータで分離を検証するのは偽の検証です。フィルタのないクエリでも偶然何も返さないかもしれないからです。QA エージェントは能動的に重なる状況——同じ名前、同じ番号、同じ期間——を構築し、分離の不変条件を実際の圧力下で自らを証明させねばなりません。",
      ),
      WARN(
        "Kiểm cô lập với dữ liệu không chồng lấn là bẫy tự lừa mình. Nếu tenant A và B không có hoá đơn nào khớp cùng từ khoá, một truy vấn thiếu lọc vẫn có thể 'tình cờ' trả đúng. Luôn dựng dữ liệu mồi nhử chồng lấn.",
        "Checking isolation with non-overlapping data is a self-deception trap. If tenants A and B have no invoices matching the same keyword, a filter-less query may still 'coincidentally' return the right thing. Always build overlapping bait data.",
        "重ならないデータで分離を検証するのは自己欺瞞の罠です。テナント A と B が同じキーワードに一致する請求書を持たなければ、フィルタのないクエリでも「偶然」正しいものを返し得ます。常に重なるおとりデータを構築しましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ca lỗi sâu #3: double-billing do webhook không idempotent",
      en: "9. Deep failure #3: double-billing from a non-idempotent webhook",
      ja: "9. 深い障害 #3: 非冪等な Webhook による二重課金",
    },
    blocks: [
      P(
        "Ca lỗi thứ ba đánh trực tiếp vào ví khách hàng: double-billing. Cổng thanh toán như Stripe gửi webhook để báo một hoá đơn đã trả, và theo thiết kế chúng có thể gửi lại cùng một webhook nhiều lần khi không nhận được xác nhận kịp thời. Nếu backend xử lý mỗi webhook như một sự kiện mới thay vì kiểm eventId đã xử lý chưa, thì cùng một khoản thanh toán bị ghi nợ nhiều lần. Khách bị trừ tiền hai lần, và điều này phá huỷ niềm tin còn nhanh hơn một tính năng hỏng. Bất biến cần bảo vệ là idempotency (冪等性): xử lý cùng một eventId nhiều lần phải cho cùng một kết quả như xử lý một lần.",
        "The third failure hits the customer's wallet directly: double-billing. Payment gateways like Stripe send webhooks to report an invoice was paid, and by design they may re-deliver the same webhook multiple times when they don't get timely acknowledgment. If the backend treats each webhook as a new event instead of checking whether the eventId was already processed, the same payment gets charged multiple times. The customer is charged twice, and this destroys trust even faster than a broken feature. The invariant to protect is idempotency: processing the same eventId multiple times must yield the same result as processing it once.",
        "第三の障害は顧客の財布を直接襲います。二重課金です。Stripe のような決済ゲートウェイは請求書が支払われたことを報告する Webhook を送り、設計上、適時の確認応答を得られないとき同じ Webhook を複数回再配信し得ます。バックエンドが eventId が処理済みか検証せず各 Webhook を新しいイベントとして扱えば、同じ支払いが複数回課金されます。顧客は二度課金され、これは壊れた機能よりさらに速く信頼を破壊します。守るべき不変条件は冪等性です。同じ eventId を複数回処理しても、一度処理したのと同じ結果でなければなりません。",
      ),
      SCEN(
        "Cùng một hoá đơn bị trừ tiền ba lần",
        "The same invoice charged three times",
        "Cổng thanh toán gửi webhook invoice.paid cho eventId 'evt_9x'. Mạng chậm, backend xử lý nhưng không kịp trả 200, nên cổng gửi lại 2 lần nữa. Backend không lưu eventId đã xử lý, nên ghi 3 bản ghi thanh toán và trừ tiền tenant 3 lần cho cùng một hoá đơn. Agent QA bắt được bằng cách gửi lặp cùng eventId và khẳng định 'đúng 1 bản ghi charge'. Bài học: mọi handler webhook billing phải kiểm eventId trong bảng processed_events trước khi xử lý, và toàn bộ thao tác phải nằm trong một transaction để không có ghi trùng dưới điều kiện đua (race).",
        "The gateway sends an invoice.paid webhook for eventId 'evt_9x'. The network is slow, the backend processes but can't return 200 in time, so the gateway re-delivers twice more. The backend doesn't store processed eventIds, so it writes 3 payment records and charges the tenant 3 times for one invoice. The QA agent catches this by re-sending the same eventId and asserting 'exactly 1 charge record'. Lesson: every billing webhook handler must check the eventId against a processed_events table before processing, and the whole operation must be in a transaction so there's no duplicate write under a race condition.",
        "ゲートウェイが eventId 'evt_9x' の invoice.paid Webhook を送ります。ネットワークが遅く、バックエンドは処理するが 200 を適時返せないので、ゲートウェイがさらに二度再配信します。バックエンドは処理済み eventId を保存しないので、3 つの決済記録を書き、一つの請求書に対しテナントを 3 回課金します。QA エージェントは同じ eventId を再送し「正確に 1 つの課金記録」をアサートすることで捕えます。教訓: あらゆる課金 Webhook ハンドラは処理前に eventId を processed_events テーブルと照合せねばならず、競合状態で重複書き込みがないよう操作全体がトランザクション内になければなりません。",
      ),
      CODE(
        "ts",
        `// tests/billing/webhook-race.spec.ts — gửi ĐỒNG THỜI để bắt lỗi race
test('webhook đồng thời cùng eventId -> vẫn chỉ 1 charge', async ({ request }) => {
  const eventId = 'evt_' + crypto.randomUUID();
  const payload = { eventId, tenantId: 'tenant-A', amount: 4900, type: 'invoice.paid' };
  const send = () => request.post('/webhooks/billing',
    { data: payload, headers: { 'x-signature': sign(payload) } });

  // Gửi 5 webhook SONG SONG — ép điều kiện đua (race) trên bảng processed_events
  await Promise.all([send(), send(), send(), send(), send()]);

  const charges = await request.get(\`/api/charges?eventId=\${eventId}\`);
  // Oracle: idempotency giữ cả dưới race — đúng 1 charge
  expect((await charges.json()).length).toBe(1);
});`,
      ),
      P(
        "Bài test này khác bài chương 4 ở một điểm quan trọng: nó gửi các webhook đồng thời (Promise.all) thay vì tuần tự, để ép điều kiện đua. Nhiều hệ thống 'có vẻ idempotent' khi test tuần tự lại thất bại dưới race: hai webhook cùng kiểm bảng processed_events, cùng thấy trống, cùng ghi. Chỉ một ràng buộc duy nhất ở tầng database (unique constraint trên eventId) hoặc một khoá phù hợp mới thật sự bảo vệ được. Đây là loại bug mà con người dễ bỏ sót nhưng agent QA có thể chủ động dựng: nó biết mẫu 'gửi song song để bắt race' và áp dụng nó lên mọi thao tác idempotent chạm tiền. Nhưng như mọi phát hiện billing, kết quả là report_only để con người xác nhận và sửa đúng chỗ.",
        "This test differs from the chapter 4 test in one important way: it sends the webhooks concurrently (Promise.all) instead of sequentially, to force a race condition. Many systems that 'seem idempotent' under sequential testing fail under a race: two webhooks both check the processed_events table, both find it empty, both write. Only a single database-level constraint (a unique constraint on eventId) or an appropriate lock truly protects. This is the kind of bug humans easily miss but a QA agent can proactively construct: it knows the 'send concurrently to catch races' pattern and applies it to every money-touching idempotent operation. But like all billing findings, the result is report_only for humans to confirm and fix at the right place.",
        "このテストは第 4 章のテストと一点で重要に異なります。競合状態を強制するため、Webhook を逐次ではなく並行(Promise.all)で送ります。逐次テストでは「冪等に見える」多くのシステムが競合下で失敗します。二つの Webhook が共に processed_events テーブルを確認し、共に空を見つけ、共に書き込む。データベースレベルの単一制約(eventId の一意制約)または適切なロックだけが真に守ります。これは人間が見落としやすいが QA エージェントが能動的に構築できる種類のバグです。エージェントは「競合を捕えるため並行送信」パターンを知り、あらゆる金銭に触れる冪等操作に適用します。しかしすべての課金の発見と同様、結果は人間が確認し正しい場所で修正するための report_only です。",
      ),
      TIP(
        "Bảo vệ idempotency cuối cùng ở tầng database bằng unique constraint trên eventId, không chỉ ở tầng ứng dụng. Kiểm ở tầng ứng dụng có thể thua race; ràng buộc DB là lá chắn tất định cuối cùng.",
        "Enforce idempotency ultimately at the database layer with a unique constraint on eventId, not only at the application layer. Application-layer checks can lose a race; the DB constraint is the final deterministic shield.",
        "冪等性は最終的にアプリケーション層だけでなくデータベース層で eventId の一意制約により強制しましょう。アプリケーション層の検証は競合に負け得ます。DB 制約が最後の決定論的な盾です。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Đối chiếu invariant với dữ liệu: kiểm bất biến ở tầng DB",
      en: "10. Reconciling invariants with data: checking invariants at the DB layer",
      ja: "10. 不変条件をデータと照合: DB 層での不変条件検証",
    },
    blocks: [
      P(
        "Ngoài kiểm qua UI và API, một tầng oracle mạnh mà nhiều đội bỏ quên là kiểm bất biến trực tiếp trên dữ liệu. Ý tưởng là viết các truy vấn 'kiểm tra tính toàn vẹn' chạy định kỳ và khẳng định những điều luôn phải đúng ở mức dữ liệu: mọi hàng invoice phải có tenant_id không null; không hàng nào tham chiếu tới một tenant không tồn tại; tổng số tiền các charge của một hoá đơn không vượt số tiền hoá đơn; không có eventId trùng trong bảng charges. Những truy vấn này là oracle bổ sung cực mạnh vì chúng bắt được các trạng thái dữ liệu hỏng mà mọi test qua API có thể bỏ sót — ví dụ dữ liệu bị hỏng do một migration lỗi hay một job nền chạy sai.",
        "Beyond checking via UI and API, a powerful oracle layer many teams forget is checking invariants directly on the data. The idea is to write 'integrity check' queries that run periodically and assert things that must always be true at the data level: every invoice row must have a non-null tenant_id; no row references a nonexistent tenant; the sum of a invoice's charges never exceeds the invoice amount; no duplicate eventId in the charges table. These queries are an extremely strong complementary oracle because they catch corrupt data states that any API-level test might miss — for example data corrupted by a bad migration or a misbehaving background job.",
        "UI と API を通した検証の他に、多くのチームが忘れる強力なオラクル層が、データに対して直接不変条件を検証することです。考えは、定期的に走る「整合性チェック」クエリを書き、データレベルで常に真でなければならないことをアサートすることです。あらゆる請求書の行は null でない tenant_id を持たねばならない、存在しないテナントを参照する行がない、請求書の charge の合計が請求書額を超えない、charges テーブルに重複 eventId がない。これらのクエリは極めて強力な補完的オラクルです。API レベルのテストが見落とし得る破損データ状態を捕えるからです——例えば不良なマイグレーションや誤動作するバックグラウンドジョブによる破損データ。",
      ),
      CODE(
        "sql",
        `-- integrity/tenant-invariants.sql — oracle ở TẦNG DỮ LIỆU, chạy định kỳ
-- Bất biến 1: mọi invoice phải thuộc về một tenant (không mồ côi)
SELECT COUNT(*) AS orphan_invoices
FROM invoices i
LEFT JOIN tenants t ON t.id = i.tenant_id
WHERE i.tenant_id IS NULL OR t.id IS NULL;      -- kỳ vọng = 0

-- Bất biến 2: không eventId trùng trong charges (idempotency ở mức dữ liệu)
SELECT event_id, COUNT(*) AS dup
FROM charges GROUP BY event_id HAVING COUNT(*) > 1;   -- kỳ vọng = rỗng

-- Bất biến 3: tổng charge của 1 hoá đơn không vượt số tiền hoá đơn
SELECT i.id, i.amount, SUM(c.amount) AS charged
FROM invoices i JOIN charges c ON c.invoice_id = i.id
GROUP BY i.id, i.amount HAVING SUM(c.amount) > i.amount;   -- kỳ vọng = rỗng`,
      ),
      P(
        "Ba truy vấn trên là những oracle tất định mạnh mẽ, và chúng đặc biệt giá trị vì độc lập với logic ứng dụng. Ngay cả khi mọi test API xanh, nếu truy vấn 'orphan_invoices' trả về một số khác 0 thì có gì đó đã phá vỡ bất biến cô lập ở mức sâu nhất. Đây là nơi AI có thể hỗ trợ đắc lực: bạn mô tả các bất biến dữ liệu bằng ngôn ngữ tự nhiên, AI dịch thành truy vấn kiểm tra, và bạn — con người — review để chắc truy vấn thật sự kiểm đúng bất biến. Chạy chúng như một job định kỳ trong staging và cả một mẫu nhỏ trong production (chỉ đọc, ẩn danh) cho bạn một lưới an toàn cuối cùng mà không tầng test nào khác cung cấp.",
        "The three queries above are strong deterministic oracles, and they are especially valuable because they are independent of application logic. Even if every API test is green, if the 'orphan_invoices' query returns a nonzero number, something has broken the isolation invariant at the deepest level. This is where AI can help substantially: you describe the data invariants in natural language, AI translates them into check queries, and you — the human — review to ensure the query truly checks the right invariant. Running them as a periodic job in staging and a small sample in production (read-only, anonymized) gives you a final safety net no other test layer provides.",
        "上の三つのクエリは強力な決定論的オラクルであり、アプリケーションロジックから独立しているため特に価値があります。あらゆる API テストがグリーンでも、「orphan_invoices」クエリが 0 でない数を返せば、何かが最も深いレベルで分離の不変条件を壊しています。ここで AI が実質的に役立ちます。データの不変条件を自然言語で記述すると AI がチェッククエリに翻訳し、あなた——人間——がクエリが本当に正しい不変条件を検証するかレビューします。それらをステージングの定期ジョブとして、また本番の小さなサンプル(読み取り専用、匿名化)で走らせることは、他のどのテスト層も提供しない最後の安全網を与えます。",
      ),
      NOTE(
        "Oracle ở tầng dữ liệu bắt được lỗi mà test qua API không thấy: dữ liệu hỏng do migration, job nền sai, hay sửa tay trực tiếp vào DB. Coi truy vấn kiểm toàn vẹn như một lớp phòng thủ độc lập, không thừa.",
        "Data-layer oracles catch bugs API tests can't see: data corrupted by migrations, misbehaving background jobs, or direct manual DB edits. Treat integrity queries as an independent defense layer, not redundancy.",
        "データ層のオラクルは API テストが見られないバグを捕えます。マイグレーション、誤動作するバックグラウンドジョブ、DB への直接手動編集による破損データ。整合性クエリを冗長ではなく独立した防御層として扱いましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Điều phối CI: chạy agent QA an toàn trong pipeline",
      en: "11. CI orchestration: running the QA agent safely in the pipeline",
      ja: "11. CI オーケストレーション: パイプラインで QA エージェントを安全に実行",
    },
    blocks: [
      P(
        "Đưa một agent QA vào CI đòi hỏi kỷ luật hơn chạy một bộ test tĩnh, vì agent có tính không tất định và có quyền thao tác. Chiến lược an toàn có vài trụ. Thứ nhất, tách rõ hai loại kiểm: các test tất định (ma trận RBAC, idempotency, cô lập) chạy như cổng cứng chặn merge; còn agent thăm dò chạy ở một job riêng, không chặn merge mà mở issue khi tìm thấy nghi vấn. Thứ hai, agent luôn chạy trong sandbox tenant test với token ephemeral. Thứ ba, mọi phát hiện của agent đi qua con người: nó mở issue có nhãn 'ai-found, needs-triage', không tự sửa, không tự đóng. Cách phân tách này để bạn hưởng lợi từ khả năng thăm dò của agent mà không đưa tính không tất định của nó vào con đường chặn release.",
        "Bringing a QA agent into CI demands more discipline than running a static test suite, because the agent is non-deterministic and has authority to act. The safe strategy has several pillars. First, clearly separate two kinds of checks: deterministic tests (RBAC matrix, idempotency, isolation) run as hard gates that block merges; the exploratory agent runs in a separate job that doesn't block merges but opens issues when it finds something suspicious. Second, the agent always runs in a sandbox test tenant with an ephemeral token. Third, every agent finding goes through a human: it opens an issue labeled 'ai-found, needs-triage', doesn't self-fix, doesn't self-close. This separation lets you benefit from the agent's exploration without putting its non-determinism on the release-blocking path.",
        "QA エージェントを CI に入れることは静的テストスイートを走らせるより多くの規律を要します。エージェントは非決定論的で行動する権限を持つからです。安全な戦略にはいくつかの柱があります。第一に、二種類の検証を明確に分離します。決定論的テスト(RBAC マトリクス、冪等性、分離)はマージを阻む厳格なゲートとして走り、探索的エージェントはマージを阻まず疑わしいものを見つけたとき issue を開く別ジョブで走ります。第二に、エージェントは常に ephemeral トークンでサンドボックステストテナント内で走ります。第三に、あらゆるエージェントの発見は人間を通ります。「ai-found, needs-triage」ラベル付きの issue を開き、自己修正せず、自己クローズしません。この分離により、エージェントの非決定論をリリースを阻む経路に置かずに探索の恩恵を受けられます。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/multitenant-qa.yml — test tất định GATE, agent thăm dò KHÔNG gate
jobs:
  deterministic:                        # CỔNG CỨNG — chặn merge nếu đỏ
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test tests/rbac tests/isolation tests/billing
      - run: psql -f integrity/tenant-invariants.sql --set ON_ERROR_STOP=1
  agent-explore:                        # KHÔNG chặn merge — mở issue nếu nghi
    runs-on: ubuntu-latest
    continue-on-error: true             # phát hiện agent không làm fail build
    env:
      AGENT_SCOPE: tenant-A_test,tenant-B_test
      AGENT_TOKEN_TTL: 15m
    steps:
      - run: node agent/run.js --guardrails agent/guardrails.yml --report-only
      - run: node agent/open-issues.js --label "ai-found,needs-triage"  # người triage`,
      ),
      P(
        "Chú ý continue-on-error: true trên job agent-explore. Điều này thể hiện một quyết định thiết kế then chốt: phát hiện của agent thăm dò không được tự động chặn release, vì agent có thể có false positive và tính không tất định của nó không nên nắm quyền sinh sát với luồng phát hành. Thay vào đó, agent mở issue để con người triage. Ngược lại, các test tất định về RBAC, cô lập và billing là cổng cứng — nếu chúng đỏ, merge bị chặn không thương lượng, vì đó là những bất biến sống còn đã được con người xác nhận từ trước. Sự phân tách rõ ràng giữa 'cổng tất định' và 'trợ lý thăm dò' là chìa khoá để dùng AI trong CI một cách vừa mạnh vừa an toàn.",
        "Notice continue-on-error: true on the agent-explore job. This embodies a key design decision: exploratory-agent findings must not automatically block a release, because the agent can have false positives and its non-determinism should not hold life-or-death power over the release flow. Instead, the agent opens issues for humans to triage. Conversely, the deterministic RBAC, isolation and billing tests are hard gates — if they go red, the merge is blocked non-negotiably, because those are life-or-death invariants humans confirmed in advance. The clear separation between the 'deterministic gate' and the 'exploratory assistant' is the key to using AI in CI both powerfully and safely.",
        "agent-explore ジョブの continue-on-error: true に注目してください。これは重要な設計判断を体現します。探索的エージェントの発見はリリースを自動的に阻んではなりません。エージェントは偽陽性を持ち得て、その非決定論がリリースフローに生殺与奪の権を握るべきではないからです。代わりに、エージェントは人間がトリアージする issue を開きます。逆に、決定論的な RBAC・分離・課金のテストは厳格なゲートです。赤になればマージは交渉の余地なく阻まれます。それらは人間が事前に確認した生死を分ける不変条件だからです。「決定論的ゲート」と「探索的助手」の明確な分離が、CI で AI を強力かつ安全に使う鍵です。",
      ),
      QA(
        "Tại sao không để phát hiện của agent thăm dò chặn merge như test thường?",
        "Why not let exploratory-agent findings block merges like normal tests?",
        "Vì agent thăm dò có tính không tất định và có thể false positive: cùng một PR, hai lần chạy agent có thể cho kết quả khác nhau, và một số 'phát hiện' có thể là hiểu nhầm của agent chứ không phải bug thật. Nếu để nó chặn merge, đội sẽ mất niềm tin vào CI và học cách bỏ qua đèn đỏ — đúng cái thuế flaky mà ta muốn tránh. Cách đúng là: agent mở issue để con người xem, còn cổng chặn merge chỉ dành cho các test tất định đã được xác nhận. Nếu một phát hiện của agent được người triage xác nhận là bug thật, ta viết một test tất định cho nó và test đó mới trở thành cổng cứng. Agent tìm; người xác nhận; test tất định gác cổng.",
        "Because the exploratory agent is non-deterministic and can false-positive: on the same PR, two agent runs may give different results, and some 'findings' may be the agent's misunderstanding rather than a real bug. If it blocks merges, the team loses trust in CI and learns to ignore red — the very flaky tax we want to avoid. The right way: the agent opens issues for humans to review, while merge-blocking gates are reserved for confirmed deterministic tests. If a human triages an agent finding and confirms it's a real bug, we write a deterministic test for it and that test becomes the hard gate. The agent finds; humans confirm; deterministic tests guard the gate.",
        "探索的エージェントは非決定論的で偽陽性を出し得るからです。同じ PR で二度のエージェント実行が異なる結果を出し得て、一部の「発見」は本物のバグではなくエージェントの誤解かもしれません。マージを阻めば、チームは CI への信頼を失い赤を無視することを学びます——まさに避けたいフレーキー税です。正しいやり方: エージェントは人間がレビューする issue を開き、マージを阻むゲートは確認済みの決定論的テストに限る。人間がエージェントの発見をトリアージし本物のバグと確認したら、それに対する決定論的テストを書き、そのテストが厳格なゲートになります。エージェントが見つけ、人間が確認し、決定論的テストがゲートを守ります。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. AI tóm tắt phát hiện thành báo cáo bảo mật có bằng chứng",
      en: "12. AI summarizing findings into an evidence-based security report",
      ja: "12. AI が発見を証拠ベースのセキュリティレポートに要約",
    },
    blocks: [
      P(
        "Khi agent QA thăm dò xong một phiên, nó có thể đã tạo ra hàng trăm quan sát. Con người cần một bản tóm tắt gọn, sắp xếp theo mức nghiêm trọng, để biết cái gì cần xử lý trước. Đây là chỗ AI phát huy sức tổng hợp: gom mọi finding, phân loại theo bất biến bị vi phạm (cô lập tenant, RBAC, billing), sắp theo severity, và với mỗi finding trích dẫn bằng chứng cụ thể — request nào, response gì, hàng dữ liệu nào. Nhưng nguyên tắc grounding tuyệt đối không được nhượng bộ trong bối cảnh bảo mật: một báo cáo bảo mật bịa ra một lỗ hổng không tồn tại làm lãng phí thời gian đội, còn một báo cáo bỏ sót lỗ hổng thật thì nguy hiểm. Vì thế mỗi câu khẳng định phải trỏ về một bằng chứng kiểm chứng được, và AI phải hạ độ tin khi bằng chứng yếu.",
        "When the exploratory QA agent finishes a session, it may have produced hundreds of observations. Humans need a concise summary, ordered by severity, to know what to address first. This is where AI's synthesis power shines: gather every finding, classify by violated invariant (tenant isolation, RBAC, billing), order by severity, and for each finding cite specific evidence — which request, what response, which data row. But the grounding principle must absolutely not be compromised in a security context: a security report that fabricates a nonexistent vulnerability wastes the team's time, while one that misses a real vulnerability is dangerous. So every assertion must point to verifiable evidence, and AI must lower its confidence when evidence is weak.",
        "探索的 QA エージェントがセッションを終えるとき、数百の観察を生み出しているかもしれません。人間は何を先に対処すべきか知るため、重大度順に整理された簡潔な要約を必要とします。ここで AI の総合力が輝きます。あらゆる発見を集め、違反された不変条件(テナント分離、RBAC、課金)で分類し、重大度順に並べ、各発見に具体的な証拠を引用します——どのリクエスト、どの応答、どのデータ行。しかしセキュリティの文脈で接地の原則は絶対に妥協されてはなりません。存在しない脆弱性を捏造するセキュリティレポートはチームの時間を浪費し、本物の脆弱性を見落とすレポートは危険です。だからあらゆる主張は検証可能な証拠を指さねばならず、AI は証拠が弱いとき確信度を下げねばなりません。",
      ),
      CODE(
        "ts",
        `// report/security-summary.ts — báo cáo phân loại theo bất biến, có bằng chứng
export interface SecurityFinding {
  invariant: 'tenant_isolation' | 'rbac' | 'billing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  evidence: { request: string; response: string; dataRef?: string }[];  // BẮT BUỘC
  reproSteps: string[];
  confidence: 'low' | 'medium' | 'high';
}

// System prompt cho AI tóm tắt:
// "Sắp finding theo severity. MỖI finding PHẢI có >=1 evidence với request+response
//  THẬT từ log phiên. Nếu không có bằng chứng, KHÔNG tạo finding. Vi phạm cô lập
//  tenant hoặc leo thang quyền -> severity=critical mặc định. KHÔNG bịa CVE, KHÔNG
//  suy đoán lỗ hổng không quan sát được. Bằng chứng yếu -> confidence=low."`,
      ),
      P(
        "Cấu trúc báo cáo trên buộc AI phải kỷ luật: mỗi finding phải có ít nhất một mảnh bằng chứng gồm request và response thật từ log của phiên, cùng các bước tái hiện. Điều này biến AI từ một người 'kể chuyện về lỗ hổng' thành một người 'trình bày bằng chứng đã thu thập'. Người review bảo mật có thể lần theo reproSteps để tự tái hiện và xác nhận, thay vì phải tin lời AI. Việc mặc định gán severity critical cho mọi vi phạm cô lập tenant và leo thang quyền phản ánh đúng thực tế rủi ro trong multi-tenant: những lỗi này không có phiên bản 'nhẹ'. Báo cáo tốt giúp đội xử lý đúng cái nguy hiểm trước, và giữ được tính kiểm chứng để không ai phải tin AI một cách mù quáng.",
        "The report structure above forces AI into discipline: each finding must have at least one piece of evidence comprising a real request and response from the session log, plus reproduction steps. This turns AI from a 'teller of vulnerability stories' into a 'presenter of collected evidence'. The security reviewer can follow the reproSteps to reproduce and confirm themselves, instead of having to trust AI's word. Defaulting to critical severity for every tenant-isolation violation and privilege escalation correctly reflects the risk reality in multi-tenant: these bugs have no 'mild' version. A good report helps the team address the dangerous thing first, and preserves verifiability so no one has to trust AI blindly.",
        "上のレポート構造は AI に規律を強制します。各発見はセッションログからの実際のリクエストと応答からなる証拠を少なくとも一つ、加えて再現手順を持たねばなりません。これは AI を「脆弱性の物語の語り手」から「収集した証拠の提示者」に変えます。セキュリティレビュアーは AI の言葉を信じる代わりに、reproSteps をたどって自ら再現し確認できます。あらゆるテナント分離違反と権限昇格にデフォルトで critical 重大度を付けることは、マルチテナントのリスク現実を正しく反映します。これらのバグに「軽微な」版はありません。良いレポートはチームが危険なものを先に対処するのを助け、誰も盲目的に AI を信じなくてよいよう検証可能性を保ちます。",
      ),
      WARN(
        "Trong báo cáo bảo mật, tuyệt đối không để AI bịa số CVE hay suy đoán lỗ hổng không quan sát được. Một finding không có bằng chứng tái hiện được thì không phải finding — chỉ là suy đoán, và suy đoán bảo mật gây nhiễu nguy hiểm.",
        "In a security report, absolutely never let AI fabricate a CVE number or speculate about unobserved vulnerabilities. A finding with no reproducible evidence is not a finding — it's speculation, and security speculation is dangerous noise.",
        "セキュリティレポートで、AI に CVE 番号を捏造させたり観察されていない脆弱性を推測させたりすることは絶対にしてはいけません。再現可能な証拠のない発見は発見ではありません——推測であり、セキュリティの推測は危険なノイズです。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: thiết kế QA cho SaaS multi-tenant",
      en: "13. Interview angle: designing QA for a multi-tenant SaaS",
      ja: "13. 面接の観点: マルチテナント SaaS の QA を設計する",
    },
    blocks: [
      P(
        "Câu hỏi phỏng vấn về multi-tenant thường có dạng: 'chúng tôi làm một SaaS phục vụ nhiều công ty trên cùng hệ thống. Anh thiết kế chiến lược QA thế nào?'. Câu trả lời của ứng viên senior khác biệt ở chỗ họ nói về bất biến trước, công cụ sau. Họ mở đầu bằng việc nêu bất biến sống còn — cô lập tenant, đúng quyền RBAC, billing idempotent — rồi chỉ rõ mỗi bất biến được kiểm ở tầng nào (dữ liệu, API, UI) và vì sao phải kiểm ở nhiều tầng. Họ nhấn mạnh bất biến phủ định ('ai KHÔNG được thấy gì') là nơi bảo mật thật sự sống. Và họ luôn đặt ranh giới AI/người rõ ràng: AI thăm dò rộng có guardrail, nhưng mọi phát hiện chạm bảo mật hay tiền đều do con người xác nhận.",
        "Multi-tenant interview questions often take the form: 'we're building a SaaS serving many companies on one system. How do you design the QA strategy?'. A senior candidate's answer differs in that they talk about invariants first, tools second. They open by naming the life-or-death invariants — tenant isolation, correct RBAC, idempotent billing — then specify at which layer each is checked (data, API, UI) and why it must be checked at multiple layers. They emphasize that negative invariants ('who must NOT see what') are where security actually lives. And they always set a clear AI/human boundary: AI explores broadly with guardrails, but every security- or money-touching finding is human-confirmed.",
        "マルチテナントの面接質問はしばしば次の形を取ります。「一つのシステムで多数の企業にサービスを提供する SaaS を作っています。QA 戦略をどう設計しますか」。シニア候補者の答えは、ツールより先に不変条件を語る点で異なります。生死を分ける不変条件——テナント分離、正しい RBAC、冪等な課金——を挙げることから始め、各々がどの層(データ、API、UI)で検証されるか、なぜ複数層で検証されねばならないか明示します。否定的不変条件(「誰が何を見てはならないか」)こそセキュリティが実際に生きる場所だと強調します。そして常に明確な AI/人間の境界を設定します。AI はガードレール付きで広く探索するが、あらゆるセキュリティや金銭に触れる発見は人間が確認します。",
      ),
      UL(
        [
          "Nêu bất biến trước: cô lập tenant (テナント分離), RBAC đúng, billing idempotent (冪等性).",
          "Kiểm mỗi bất biến ở nhiều tầng: dữ liệu (SQL), API (gọi thẳng), UI — không tin một tầng.",
          "Nhấn bất biến phủ định: 'ai KHÔNG được thấy/làm gì' — nơi bug bảo mật ẩn.",
          "Ranh giới AI/người: agent thăm dò có guardrail (report_only), người xác nhận & gác cổng.",
        ],
        [
          "State invariants first: tenant isolation, correct RBAC, idempotent billing.",
          "Check each invariant at multiple layers: data (SQL), API (direct calls), UI — trust no single layer.",
          "Emphasize negative invariants: 'who must NOT see/do what' — where security bugs hide.",
          "AI/human boundary: guardrailed exploratory agent (report_only), humans confirm & guard the gate.",
        ],
        [
          "まず不変条件を述べる: テナント分離、正しい RBAC、冪等な課金。",
          "各不変条件を複数層で検証: データ(SQL)、API(直接呼び出し)、UI——単一層を信じない。",
          "否定的不変条件を強調: 「誰が何を見て/してはならないか」——セキュリティバグが潜む場所。",
          "AI/人間の境界: ガードレール付き探索エージェント(report_only)、人間が確認しゲートを守る。",
        ],
      ),
      QA(
        "Người phỏng vấn hỏi: 'làm sao anh chắc không có tenant nào thấy dữ liệu tenant khác?'",
        "The interviewer asks: 'how do you ensure no tenant can see another tenant's data?'",
        "Tôi không dựa vào một tầng duy nhất mà kiểm ở ba tầng cho cùng bất biến. Ở tầng dữ liệu, tôi chạy truy vấn toàn vẹn định kỳ khẳng định mọi hàng có tenant_id hợp lệ. Ở tầng API, tôi viết test đăng nhập bằng token tenant A rồi cố gọi mọi endpoint xin tài nguyên của B, oracle là phải 403/404 chứ không phải 200 kèm data — và tôi dùng dữ liệu mồi nhử chồng lấn để bẫy các truy vấn thiếu lọc. Ở tầng UI, tôi kiểm không màn hình hay deep-link nào lộ chéo. Quan trọng: tôi kiểm cả chiều phủ định và hành xử như attacker (gọi thẳng API, bỏ qua UI). Cuối cùng, tôi không bao giờ coi cô lập tenant là 'bug nhỏ' — mọi vi phạm đều là sự cố critical.",
        "I don't rely on a single layer but check three layers for the same invariant. At the data layer, I run periodic integrity queries asserting every row has a valid tenant_id. At the API layer, I write tests that log in with a tenant A token and try calling every endpoint requesting B's resources, the oracle being 403/404 not 200 with data — and I use overlapping bait data to trap filter-less queries. At the UI layer, I check no screen or deep-link leaks cross-tenant. Crucially, I check the negative direction and behave like an attacker (calling the API directly, bypassing the UI). Finally, I never treat tenant isolation as a 'small bug' — every violation is a critical incident.",
        "単一層に頼らず、同じ不変条件を三層で検証します。データ層では、あらゆる行が有効な tenant_id を持つとアサートする定期的な整合性クエリを走らせます。API 層では、テナント A のトークンでログインし B のリソースを要求するあらゆるエンドポイントを呼ぶテストを書きます。オラクルはデータ付きの 200 ではなく 403/404 です——そしてフィルタのないクエリを罠にかけるため重なるおとりデータを使います。UI 層では、どの画面もディープリンクもテナント間で漏らさないか検証します。重要なのは、否定的方向を検証し攻撃者のように振る舞うこと(UI を迂回し直接 API を呼ぶ)。最後に、テナント分離を決して「小さなバグ」と扱いません——あらゆる違反は critical インシデントです。",
      ),
      TIP(
        "Trong phỏng vấn, khi nói về multi-tenant hãy dùng đúng thuật ngữ: cô lập tenant (テナント分離), leo thang quyền, bất biến phủ định, idempotency. Dùng đúng từ cho thấy bạn đã thật sự làm, không chỉ đọc lý thuyết.",
        "In interviews, when discussing multi-tenant use the right terms: tenant isolation, privilege escalation, negative invariants, idempotency. Using the right words shows you've actually done it, not just read theory.",
        "面接でマルチテナントを論じるとき正しい用語を使いましょう: テナント分離、権限昇格、否定的不変条件、冪等性。正しい言葉を使うことは、理論を読んだだけでなく実際にやったことを示します。",
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết: bất biến là trung tâm, AI là bộ khuếch đại",
      en: "14. Wrap-up: invariants at the center, AI as the amplifier",
      ja: "14. まとめ: 不変条件を中心に、AI を増幅器として",
    },
    blocks: [
      P(
        "Bài học xuyên suốt của QA cho SaaS multi-tenant là: sức mạnh không đến từ số lượng test hay công cụ AI thời thượng, mà từ việc xác định đúng các bất biến sống còn và bảo vệ chúng ở nhiều tầng. Cô lập tenant, đúng quyền RBAC, và billing idempotent là ba trụ cột mà mọi test đều phục vụ. Một agent QA có AI làm cho việc kiểm những bất biến này nhanh và rộng hơn — nó thăm dò như một kẻ tấn công kiên nhẫn, đối chiếu UI, API và dữ liệu, và tóm tắt phát hiện thành báo cáo có bằng chứng. Nhưng agent làm được điều đó an toàn chỉ khi có guardrail chặt: chạy trong sandbox tenant test, report_only, và mọi phát hiện chạm bảo mật hay tiền đều qua con người.",
        "The overarching lesson of QA for multi-tenant SaaS is: power comes not from the number of tests or trendy AI tools, but from correctly identifying the life-or-death invariants and protecting them at multiple layers. Tenant isolation, correct RBAC, and idempotent billing are the three pillars every test serves. An AI QA agent makes checking these invariants faster and broader — it explores like a patient attacker, cross-checks UI, API and data, and summarizes findings into evidence-based reports. But the agent does this safely only with tight guardrails: running in a sandbox test tenant, report_only, and every security- or money-touching finding passing through humans.",
        "マルチテナント SaaS の QA の総括的な教訓は、力はテストの数や流行の AI ツールからではなく、生死を分ける不変条件を正しく特定し複数層で守ることから来る、ということです。テナント分離、正しい RBAC、冪等な課金があらゆるテストが奉仕する三本柱です。AI QA エージェントはこれらの不変条件の検証をより速く広くします——辛抱強い攻撃者のように探索し、UI・API・データを照合し、発見を証拠ベースのレポートに要約します。しかしエージェントがこれを安全に行うのは厳格なガードレールがある場合だけです。サンドボックステストテナント内での実行、report_only、そしてあらゆるセキュリティや金銭に触れる発見が人間を通ること。",
      ),
      UL(
        [
          "Ba bất biến trụ cột: cô lập tenant, RBAC đúng (cả chiều phủ định), billing idempotent.",
          "Kiểm mỗi bất biến ở 3 tầng và đối chiếu — mâu thuẫn giữa UI/API/DB thường là bug.",
          "Test tất định gác cổng merge; agent thăm dò mở issue, không chặn merge.",
          "AI: thăm dò rộng, đối chiếu, tóm tắt có bằng chứng; người: xác nhận, gác cổng, chịu trách nhiệm.",
        ],
        [
          "Three pillar invariants: tenant isolation, correct RBAC (including the negative direction), idempotent billing.",
          "Check each invariant at 3 layers and cross-check — a contradiction among UI/API/DB is often the bug.",
          "Deterministic tests guard the merge gate; the exploratory agent opens issues, doesn't block merges.",
          "AI: broad exploration, cross-checking, evidence-based summaries; humans: confirm, guard the gate, own accountability.",
        ],
        [
          "三本柱の不変条件: テナント分離、正しい RBAC(否定的方向を含む)、冪等な課金。",
          "各不変条件を 3 層で検証し照合——UI/API/DB の間の矛盾はしばしばバグ。",
          "決定論的テストがマージゲートを守る。探索的エージェントは issue を開きマージを阻まない。",
          "AI: 広い探索、照合、証拠ベースの要約。人間: 確認、ゲート防衛、責任を負う。",
        ],
      ),
      P(
        "Nếu bạn chỉ mang đi một điều, hãy để nó là: trong multi-tenant, một sự cố rò dữ liệu chéo tenant hay leo thang quyền không phải 'bug', mà là mối đe doạ sinh tồn của công ty. Vì thế QA ở đây không phải việc phụ mà là hàng phòng thủ tuyến đầu. AI là một đồng minh mạnh mẽ giúp bạn phủ rộng hơn và điều tra nhanh hơn, nhưng nó không thể gánh trách nhiệm về sự an toàn của dữ liệu khách hàng. Trách nhiệm đó thuộc về con người, và công việc của bạn là xây một hệ thống kiểm thử nơi mọi bất biến sống còn được bảo vệ ở nhiều tầng, mọi phát hiện của AI đều kiểm chứng được, và mọi quyết định có hậu quả đều có một con người có tên đứng sau.",
        "If you take away only one thing, let it be: in multi-tenant, a cross-tenant leak or privilege-escalation incident is not a 'bug' but an existential threat to the company. So QA here is not a side task but the first line of defense. AI is a powerful ally that helps you cover more broadly and investigate faster, but it cannot bear the responsibility for the safety of customer data. That responsibility belongs to humans, and your job is to build a testing system where every life-or-death invariant is protected at multiple layers, every AI finding is verifiable, and every consequential decision has a named human behind it.",
        "一つだけ持ち帰るなら、これにしてください。マルチテナントでは、テナント間漏洩や権限昇格のインシデントは「バグ」ではなく会社の存続を脅かすものです。だからここでの QA は付随的な作業ではなく第一の防衛線です。AI はより広くカバーしより速く調査するのを助ける強力な味方ですが、顧客データの安全の責任を負えません。その責任は人間に属し、あなたの仕事はあらゆる生死を分ける不変条件が複数層で守られ、あらゆる AI の発見が検証可能で、あらゆる帰結を持つ判断の背後に名前のある人間がいるテストシステムを築くことです。",
      ),
      NOTE(
        "Câu chốt để nhớ: trong multi-tenant, hãy hỏi không phải 'tính năng có chạy không' mà 'tính năng có chạy QUÁ tay không'. Bảo mật sống ở ranh giới của điều KHÔNG được phép xảy ra.",
        "The closing line to remember: in multi-tenant, ask not 'does the feature work' but 'does the feature work TOO much'. Security lives at the boundary of what must NOT be allowed to happen.",
        "覚えておくべき締めの言葉: マルチテナントでは「機能が動くか」ではなく「機能が働きすぎないか」を問いましょう。セキュリティは起こってはならないことの境界に生きています。",
      ),
      QA(
        "Nếu chỉ được viết một loại test cho SaaS multi-tenant, anh chọn gì?",
        "If you could write only one kind of test for a multi-tenant SaaS, what would you pick?",
        "Tôi chọn bộ test cô lập tenant ở tầng API với dữ liệu mồi nhử chồng lấn — đăng nhập bằng token tenant A, cố truy cập mọi loại tài nguyên của B, và khẳng định luôn 403/404 chứ không bao giờ 200 kèm data. Lý do: rò dữ liệu chéo tenant là sự cố sinh tồn của công ty, và nó ẩn ở tầng API (nơi attacker gọi thẳng) chứ không phải UI. RBAC và billing quan trọng nhưng một lỗi ở đó thường là thiệt hại giới hạn; một lỗ cô lập tenant có thể phơi bày dữ liệu của mọi khách hàng cùng lúc. Tôi cũng nói rõ giả định: đây là tối ưu theo rủi ro-thiệt hại, và lý tưởng thì cả ba trụ cột đều cần được phủ.",
        "I'd pick the tenant-isolation test suite at the API layer with overlapping bait data — log in with a tenant A token, try to access every kind of B's resources, and assert always 403/404, never 200 with data. Reason: a cross-tenant leak is an existential incident for the company, and it hides at the API layer (where attackers call directly), not the UI. RBAC and billing matter but a bug there is usually bounded damage; an isolation hole can expose every customer's data at once. I also state the assumption clearly: this optimizes by risk-impact, and ideally all three pillars should be covered.",
        "私は API 層でのテナント分離テストスイートを重なるおとりデータとともに選びます——テナント A のトークンでログインし、B のあらゆる種類のリソースへのアクセスを試み、常に 403/404 でデータ付きの 200 は決してないとアサートします。理由: テナント間漏洩は会社の存続に関わるインシデントで、UI ではなく API 層(攻撃者が直接呼ぶ場所)に潜みます。RBAC と課金は重要ですが、そこのバグは通常限定的な損害です。分離の穴はあらゆる顧客のデータを一度に露出し得ます。前提も明示します。これはリスクと影響で最適化したもので、理想的には三本柱すべてがカバーされるべきです。",
      ),
    ],
  },
];

const artA = {
  categorySlug: "ai-in-testing",
  slug: "ai-integrated-playwright-api-k6-observability",
  cover: coverA,
  tags: tags("tichhop", "fintech", "aitesting", "k6", "cicd", "advanced"),
  title: {
    vi: "Kiểm thử tích hợp có AI: Playwright + API + k6 + observability cho fintech",
    en: "AI-integrated testing: Playwright + API + k6 + observability for fintech",
    ja: "AI 統合テスト: フィンテック向け Playwright + API + k6 + 可観測性",
  },
  summary: {
    vi: "Chiến lược tích hợp bốn tầng cho fintech: E2E (Playwright), API, hiệu năng (k6) và observability, với AI triage lỗi xuyên tầng, SLO làm oracle, và ranh giới an toàn AI/người.",
    en: "A four-layer integrated strategy for fintech: E2E (Playwright), API, performance (k6) and observability, with AI cross-layer triage, SLO as oracle, and safe AI/human boundaries.",
    ja: "フィンテック向け四層統合戦略: E2E(Playwright)・API・性能(k6)・可観測性を、AI の層をまたぐトリアージ、オラクルとしての SLO、AI と人間の安全な境界とともに解説します。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "ai-in-testing",
  slug: "ai-integrated-saas-multitenant-qa-agent",
  cover: coverB,
  tags: tags("tichhop", "saas", "aitesting", "security", "realworld", "interview"),
  title: {
    vi: "Agent QA end-to-end cho SaaS multi-tenant: cô lập tenant, RBAC và billing",
    en: "End-to-end QA agent for multi-tenant SaaS: tenant isolation, RBAC and billing",
    ja: "マルチテナント SaaS の end-to-end QA エージェント: テナント分離・RBAC・課金",
  },
  summary: {
    vi: "Agent QA có AI kiểm end-to-end một SaaS multi-tenant: cô lập tenant làm oracle, ma trận RBAC, billing idempotent, thăm dò có guardrail, đối chiếu UI+API+dữ liệu, và các ca lỗi sâu như leo thang quyền và rò dữ liệu chéo.",
    en: "An AI QA agent tests a multi-tenant SaaS end-to-end: tenant isolation as oracle, the RBAC matrix, idempotent billing, guardrailed exploration, UI+API+data cross-checking, and deep failures like privilege escalation and cross-tenant leaks.",
    ja: "AI QA エージェントがマルチテナント SaaS を end-to-end で検証します: オラクルとしてのテナント分離、RBAC マトリクス、冪等な課金、ガードレール付き探索、UI+API+データの照合、そして権限昇格やテナント間漏洩といった深い障害を扱います。",
  },
  pages: buildDoc(pagesB),
};

export const AI_DOCS_10 = [artA, artB];
