// ============================================================================
// AI_DOCS_04 — 2 bài "AI trong kiểm thử" (kind=nangcao) — mới nhất 2026.
// A: Chống flaky ở quy mô lớn bằng AI + oracle bất biến (fintech).
// B: Xây eval harness cho prompt/agent sinh (saas).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "ai04a", domain: "fintech", kind: "nangcao", label: "ANTI-FLAKY" });
const coverB = makeThumb({ id: "ai04b", domain: "saas", kind: "nangcao", label: "EVAL HARNESS" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn) — cover UNIQUE cho từng bài
// ---------------------------------------------------------------------------
const SVG_FLAKY_CAUSES = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="32" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bốn nguồn gốc của flaky test</text>
<rect x="30" y="56" width="140" height="80" rx="10" fill="#1e293b" stroke="#f87171" stroke-width="2"/>
<text x="100" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#fecaca">Timing</text>
<text x="100" y="108" text-anchor="middle" font-size="10" fill="#fca5a5">race · chờ sai</text>
<text x="100" y="124" text-anchor="middle" font-size="10" fill="#fca5a5">sleep cứng</text>
<rect x="185" y="56" width="140" height="80" rx="10" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
<text x="255" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#fde68a">Order</text>
<text x="255" y="108" text-anchor="middle" font-size="10" fill="#fcd34d">phụ thuộc thứ tự</text>
<text x="255" y="124" text-anchor="middle" font-size="10" fill="#fcd34d">test rò rỉ</text>
<rect x="340" y="56" width="140" height="80" rx="10" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
<text x="410" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#ddd6fe">Shared state</text>
<text x="410" y="108" text-anchor="middle" font-size="10" fill="#c4b5fd">DB/cache chung</text>
<text x="410" y="124" text-anchor="middle" font-size="10" fill="#c4b5fd">song song đụng</text>
<rect x="495" y="56" width="115" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
<text x="552" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#bae6fd">Network</text>
<text x="552" y="108" text-anchor="middle" font-size="10" fill="#7dd3fc">timeout · 5xx</text>
<text x="552" y="124" text-anchor="middle" font-size="10" fill="#7dd3fc">DNS chập chờn</text>
<path d="M100 136 L320 178 M255 136 L320 178 M410 136 L320 178 M552 136 L320 178" stroke="#475569" stroke-width="1.8" fill="none"/>
<rect x="180" y="180" width="280" height="46" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="320" y="200" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">Ổn định hoá: auto-wait · seed tất định</text>
<text x="320" y="218" text-anchor="middle" font-size="11" fill="#a7f3d0">cô lập state · mock/route mạng</text>
<rect x="180" y="238" width="280" height="40" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="256" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0f2fe">AI cụm lỗi → gợi ý sửa</text>
<text x="320" y="272" text-anchor="middle" font-size="10.5" fill="#7dd3fc">KHÔNG che bug thật · oracle gác cổng</text>
</svg>`;

const SVG_QUARANTINE = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Vòng quarantine + retry giữ oracle</text>
<rect x="30" y="52" width="130" height="60" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="95" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">Chạy test</text>
<text x="95" y="98" text-anchor="middle" font-size="10" fill="#5eead4">trace retain-on-fail</text>
<rect x="200" y="52" width="130" height="60" rx="9" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
<text x="265" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="#fde68a">Fail?</text>
<text x="265" y="98" text-anchor="middle" font-size="10" fill="#fcd34d">retry ≤ N lần</text>
<rect x="370" y="30" width="150" height="46" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="445" y="50" text-anchor="middle" font-size="11.5" font-weight="700" fill="#6ee7b7">Pass sau retry</text>
<text x="445" y="66" text-anchor="middle" font-size="10" fill="#a7f3d0">→ đánh dấu FLAKY</text>
<rect x="370" y="92" width="150" height="46" rx="9" fill="#3b0d0d" stroke="#f87171" stroke-width="2"/>
<text x="445" y="112" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fecaca">Fail mọi lần</text>
<text x="445" y="128" text-anchor="middle" font-size="10" fill="#fca5a5">→ có thể BUG THẬT</text>
<g stroke="#94a3b8" stroke-width="2.2" fill="none" marker-end="url(#af)">
<path d="M160 82 h38"/><path d="M330 70 h38"/><path d="M330 110 h38"/></g>
<defs><marker id="af" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="540" y="52" width="80" height="86" rx="9" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="580" y="88" text-anchor="middle" font-size="11" font-weight="700" fill="#e0e7ff">Cô lập</text>
<text x="580" y="106" text-anchor="middle" font-size="10" fill="#a5b4fc">khỏi gate</text>
<text x="580" y="122" text-anchor="middle" font-size="10" fill="#a5b4fc">merge</text>
<rect x="30" y="164" width="580" height="46" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="184" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">CẢNH BÁO: retry chỉ hợp lệ khi oracle bất biến (double-entry / idempotency)</text>
<text x="320" y="202" text-anchor="middle" font-size="10.5" fill="#7dd3fc">Nếu retry-để-xanh trên assertion hời hợt → bạn đang che bug, không sửa flaky</text>
<rect x="30" y="222" width="580" height="42" rx="9" fill="#111827" stroke="#334155"/>
<text x="320" y="240" text-anchor="middle" font-size="11" fill="#cbd5e1">AI cụm các lần fail theo dấu vết → tách 'flaky hạ tầng' vs 'lỗi nghiệp vụ'</text>
<text x="320" y="257" text-anchor="middle" font-size="10.5" fill="#64748b">Người quyết định cuối: sửa test, sửa app, hay giữ quarantine</text>
</svg>`;

const SVG_EVAL_PIPELINE = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Eval harness cho prompt / agent</text>
<rect x="24" y="54" width="140" height="76" rx="10" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="94" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Golden set</text>
<text x="94" y="102" text-anchor="middle" font-size="10" fill="#7dd3fc">input + kỳ vọng</text>
<text x="94" y="118" text-anchor="middle" font-size="10" fill="#7dd3fc">fixtures cố định</text>
<rect x="188" y="54" width="140" height="76" rx="10" fill="#155e63" stroke="#2dd4bf" stroke-width="2"/>
<text x="258" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">Chạy model</text>
<text x="258" y="102" text-anchor="middle" font-size="10" fill="#5eead4">temp=0 · seed cố định</text>
<text x="258" y="118" text-anchor="middle" font-size="10" fill="#5eead4">ghi output + cost</text>
<rect x="352" y="54" width="140" height="76" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="422" y="78" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">Assertions</text>
<text x="422" y="97" text-anchor="middle" font-size="9.5" fill="#a5b4fc">schema · regex</text>
<text x="422" y="111" text-anchor="middle" font-size="9.5" fill="#a5b4fc">similarity · rubric</text>
<text x="422" y="125" text-anchor="middle" font-size="9.5" fill="#a5b4fc">LLM-as-judge</text>
<rect x="516" y="54" width="100" height="76" rx="10" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="566" y="82" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">Gate CI</text>
<text x="566" y="102" text-anchor="middle" font-size="9.5" fill="#a7f3d0">ngưỡng pass%</text>
<text x="566" y="117" text-anchor="middle" font-size="9.5" fill="#a7f3d0">budget cost/lat</text>
<g stroke="#94a3b8" stroke-width="2.4" fill="none" marker-end="url(#ae)">
<path d="M164 92 h20"/><path d="M328 92 h20"/><path d="M492 92 h20"/></g>
<defs><marker id="ae" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<rect x="60" y="164" width="520" height="44" rx="9" fill="#111827" stroke="#f59e0b" stroke-width="2"/>
<text x="320" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="#fbbf24">Regression gate: bump prompt/model → so với baseline → chặn nếu tụt</text>
<text x="320" y="202" text-anchor="middle" font-size="10.5" fill="#fcd34d">Theo dõi pass% · hallucination% · cost · p95 latency theo thời gian</text>
<rect x="60" y="220" width="520" height="44" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="240" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0f2fe">LLM-as-judge phải hiệu chuẩn: kiểm với nhãn người · chống bias vị trí/độ dài</text>
<text x="320" y="257" text-anchor="middle" font-size="10.5" fill="#7dd3fc">Judge không hiệu chuẩn = thước đo cong = gate vô nghĩa</text>
</svg>`;

const SVG_ASSERT_LAYERS = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Tháp assertion cho output sinh</text>
<rect x="120" y="46" width="400" height="40" rx="8" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="320" y="71" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">1. Cấu trúc: JSON hợp lệ · schema đúng (rẻ · tất định)</text>
<rect x="150" y="94" width="340" height="40" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="320" y="119" text-anchor="middle" font-size="12" font-weight="700" fill="#bae6fd">2. Từ vựng: regex / contains / không chứa cấm</text>
<rect x="180" y="142" width="280" height="40" rx="8" fill="#155e63" stroke="#2dd4bf" stroke-width="2"/>
<text x="320" y="167" text-anchor="middle" font-size="12" font-weight="700" fill="#ccfbf1">3. Ngữ nghĩa: similarity vs đáp án vàng</text>
<rect x="210" y="190" width="220" height="40" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
<text x="320" y="215" text-anchor="middle" font-size="12" font-weight="700" fill="#ddd6fe">4. Rubric: LLM-as-judge chấm</text>
<text x="320" y="252" text-anchor="middle" font-size="11" fill="#94a3b8">Ưu tiên tầng rẻ &amp; tất định trước; chỉ leo lên judge khi cần</text>
<text x="320" y="270" text-anchor="middle" font-size="10.5" fill="#64748b">Càng lên cao càng đắt, càng nhiễu → dùng có chủ đích</text>
</svg>`;

// ===========================================================================
// ARTICLE A — Chống flaky ở quy mô lớn bằng AI + oracle bất biến
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Vì sao flaky test là kẻ thù đắt nhất của đội QA",
      en: "1. Why flaky tests are a QA team's most expensive enemy",
      ja: "1. なぜフレーキーテストは QA チームにとって最も高くつく敵なのか",
    },
    blocks: [
      P(
        "Flaky test là những test cho kết quả khi xanh khi đỏ dù mã nguồn không đổi và dữ liệu đầu vào không đổi. Nghe qua có vẻ vô hại, nhưng ở quy mô lớn chúng là thảm hoạ ngầm: mỗi lần đèn đỏ giả xuất hiện, một kỹ sư phải dừng lại điều tra, rồi chạy lại, rồi nghi ngờ. Tệ hơn, khi đội ngũ đã quen với 'chắc lại flaky thôi', họ bắt đầu bỏ qua đèn đỏ theo phản xạ — và đúng lúc đó một lỗi thật lọt qua cửa vì bị nhầm là flaky.",
        "Flaky tests are tests that pass sometimes and fail other times even though the source code and the input data did not change. It sounds harmless, but at scale they are a silent disaster: each false red forces an engineer to stop, investigate, rerun, and doubt. Worse, once a team gets used to 'it's probably just flaky again', they start ignoring red lights reflexively — and that's exactly when a real bug slips through, mistaken for flakiness.",
        "フレーキーテストとは、ソースコードも入力データも変わっていないのに、あるときは成功し別のときは失敗するテストです。無害に聞こえますが、大規模になると静かな災厄になります。偽の赤が出るたびにエンジニアは手を止め、調査し、再実行し、疑います。さらに悪いことに、チームが「どうせまたフレーキーだ」に慣れると、反射的に赤信号を無視し始めます。まさにそのとき、本物のバグがフレーキーと誤解され、すり抜けるのです。"
      ),
      P(
        "Chi phí của flaky không chỉ là thời gian. Nó bào mòn thứ quý nhất của một bộ test tự động: niềm tin. Một suite mà đội ngũ không còn tin thì dù có mười nghìn test cũng vô dụng, vì không ai dám dựa vào nó để quyết định release. Ở các domain nhạy cảm như fintech, mất niềm tin vào test đồng nghĩa với việc hoặc bạn chặn release quá đà (làm chậm sản phẩm), hoặc bạn thả lỏng và để rủi ro mất tiền lọt qua. Cả hai đều đắt.",
        "The cost of flakiness is not only time. It erodes the most precious property of an automated suite: trust. A suite the team no longer trusts is useless even with ten thousand tests, because nobody dares rely on it to gate a release. In sensitive domains like fintech, losing trust in tests means either you block releases excessively (slowing the product) or you loosen up and let money-loss risk through. Both are expensive.",
        "フレーキーのコストは時間だけではありません。自動スイートの最も貴重な性質——信頼——を蝕みます。チームがもはや信頼しないスイートは、たとえ一万のテストがあっても無用です。誰もそれを頼りにリリースを判断しないからです。フィンテックのような機微なドメインでは、テストへの信頼を失うと、リリースを過度に止めて(製品を遅らせる)しまうか、緩めて金銭損失のリスクを通してしまうかのどちらかです。どちらも高くつきます。"
      ),
      IMG(
        SVG_FLAKY_CAUSES,
        "Bốn nguồn gốc flaky và hướng ổn định hoá; AI cụm lỗi nhưng oracle gác cổng.",
        "Four roots of flakiness and how to stabilize; AI clusters failures but the oracle gates.",
        "フレーキーの四つの根源と安定化の方向。AI は失敗をクラスタリングするがオラクルが門番になる。"
      ),
      P(
        "Bài này không dừng ở việc 'giảm flaky' như một mẹo kỹ thuật. Nó bàn cách dùng AI để chống flaky ở quy mô lớn mà vẫn giữ được ý nghĩa của một test 'xanh'. Đó là chỗ nhiều đội ngũ sa bẫy: họ giảm flaky bằng cách retry hoặc nới lỏng assertion, rồi vui mừng vì bảng đã xanh — nhưng đã vô tình che mất bug thật. Nguyên tắc xuyên suốt: dùng AI để phân loại và sửa vấn đề của test, tuyệt đối không dùng nó để làm mờ oracle nghiệp vụ.",
        "This article does not stop at 'reduce flakiness' as a technical trick. It discusses using AI to fight flakiness at scale while preserving the meaning of a 'green' test. That's where many teams fall into a trap: they cut flakiness by retrying or loosening assertions, then celebrate a green board — while accidentally masking a real bug. The guiding principle: use AI to classify and fix test problems, but never to blur the business oracle.",
        "本記事は「フレーキーを減らす」を技術的な小技として扱うにとどまりません。「グリーン」なテストの意味を保ちながら、大規模にフレーキーと戦うために AI を使う方法を論じます。そこで多くのチームが罠に落ちます。再試行やアサーションの緩和でフレーキーを減らし、グリーンな盤面を喜ぶ——本物のバグを偶然覆い隠しながら、です。貫く原則はこうです。テストの問題を分類し修正するために AI を使い、業務オラクルを決してぼかさない。"
      ),
      NOTE(
        "Đây là bài nâng cao. Nó giả định bạn đã biết locator, auto-wait và assertion cơ bản, và muốn vận hành ổn định ở quy mô hàng nghìn test.",
        "This is an advanced article. It assumes you already know locators, auto-wait and basic assertions, and want stable operation at the scale of thousands of tests.",
        "これは応用記事です。ロケーター、自動待機、基本的なアサーションを既に理解し、数千のテスト規模での安定運用を目指す読者を想定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Bốn nguồn gốc flaky: timing, thứ tự, state chung, mạng",
      en: "2. Four roots of flakiness: timing, order, shared state, network",
      ja: "2. フレーキーの四つの根源: タイミング、順序、共有状態、ネットワーク",
    },
    blocks: [
      P(
        "Không thể sửa flaky nếu không phân loại đúng nguyên nhân. Kinh nghiệm cho thấy đại đa số ca flaky rơi vào bốn nhóm gốc. Nhóm timing: test kiểm tra một trạng thái trước khi ứng dụng kịp cập nhật, thường do dùng sleep cứng hoặc chờ sai điều kiện. Nhóm thứ tự (order dependence): test B chỉ xanh nếu test A chạy trước, vì A để lại dữ liệu mà B ngầm dựa vào. Nhóm state chung: nhiều test dùng chung một bản ghi trong DB hoặc cache và giẫm chân nhau khi chạy song song. Nhóm mạng: phụ thuộc dịch vụ ngoài chập chờn, timeout, hoặc mã lỗi 5xx thoáng qua.",
        "You cannot fix flakiness without classifying the cause correctly. Experience shows the vast majority of flaky cases fall into four root groups. Timing: the test checks a state before the app has updated, usually from hard sleeps or waiting on the wrong condition. Order dependence: test B only passes if test A ran first, because A left data B implicitly relies on. Shared state: many tests share one DB record or cache entry and trample each other under parallelism. Network: dependence on a shaky external service, timeouts, or transient 5xx codes.",
        "原因を正しく分類しなければフレーキーは直せません。経験上、フレーキーの大多数は四つの根源グループに収まります。タイミング: アプリが更新する前にテストが状態を確認する。多くはハードスリープや誤った条件での待機が原因です。順序依存: テスト B はテスト A が先に走った場合のみ成功する。A が残したデータに B が暗黙に依存するためです。共有状態: 多数のテストが DB レコードやキャッシュを共有し、並列実行で踏み合います。ネットワーク: 不安定な外部サービスへの依存、タイムアウト、一過性の 5xx コードです。"
      ),
      UL(
        [
          "Timing: dấu hiệu là 'thêm sleep thì xanh'. Cách sửa: dùng auto-wait/expect có polling, không sleep cứng.",
          "Order dependence: dấu hiệu là 'đổi thứ tự chạy thì đỏ'. Cách sửa: mỗi test tự dựng và dọn dữ liệu, không dựa vào test khác.",
          "Shared state: dấu hiệu là 'chạy song song thì đỏ, chạy đơn thì xanh'. Cách sửa: cô lập dữ liệu theo test (tenant/worker riêng).",
          "Network: dấu hiệu là 'đỏ ngẫu nhiên ở bước gọi API ngoài'. Cách sửa: mock/route hoá dịch vụ ngoài, chỉ để mạng thật ở test tích hợp có chủ đích.",
        ],
        [
          "Timing: the sign is 'adding a sleep makes it green'. Fix: use auto-wait/expect with polling, not hard sleeps.",
          "Order dependence: the sign is 'reordering makes it red'. Fix: each test builds and cleans its own data, not relying on other tests.",
          "Shared state: the sign is 'parallel is red, single is green'. Fix: isolate data per test (own tenant/worker).",
          "Network: the sign is 'random red at an external API step'. Fix: mock/route external services, keep real network only for deliberate integration tests.",
        ],
        [
          "タイミング: 兆候は「スリープを足すとグリーン」。修正: ハードスリープではなくポーリング付きの自動待機/expect を使う。",
          "順序依存: 兆候は「順序を変えると赤」。修正: 各テストが自前でデータを構築・後始末し、他テストに依存しない。",
          "共有状態: 兆候は「並列で赤、単独でグリーン」。修正: テストごとにデータを隔離する(専用テナント/ワーカー)。",
          "ネットワーク: 兆候は「外部 API 手順でランダムに赤」。修正: 外部サービスをモック/ルート化し、実ネットワークは意図的な統合テストにのみ残す。",
        ]
      ),
      P(
        "Việc phân loại này quan trọng vì mỗi nhóm có cách chữa khác nhau, và nếu chữa sai nhóm bạn chỉ giấu triệu chứng chứ không diệt nguyên nhân. Ví dụ đắt giá nhất là 'chữa' flaky timing bằng cách tăng số lần retry: bề mặt thì xanh hơn, nhưng nguyên nhân race condition vẫn còn, và một ngày nào đó nó biểu hiện trong production nơi không có retry cứu bạn.",
        "This classification matters because each group has a different cure, and curing the wrong group only hides the symptom instead of killing the cause. The costliest example is 'curing' timing flakiness by increasing retries: the surface looks greener, but the underlying race condition remains, and one day it manifests in production where no retry saves you.",
        "この分類が重要なのは、各グループに異なる治療法があり、誤ったグループを治すと原因を絶たず症状を隠すだけになるからです。最も高くつく例は、タイミングのフレーキーを再試行回数を増やして「治す」ことです。表面はグリーンに見えても根底のレースコンディションは残り、いつか再試行が救ってくれない本番で顕在化します。"
      ),
      WARN(
        "Retry là thuốc giảm đau, không phải thuốc chữa. Nó che flaky nhưng không diệt nguyên nhân. Chỉ dùng retry sau khi đã phân loại và ổn định hoá gốc, và luôn kèm oracle bất biến.",
        "Retry is a painkiller, not a cure. It masks flakiness but does not kill the cause. Only use retry after classifying and stabilizing the root, and always pair it with an invariant oracle.",
        "再試行は鎮痛剤であって治療ではありません。フレーキーを覆い隠しますが原因を絶ちません。根源を分類し安定化させた後にのみ使い、常に不変条件のオラクルと組み合わせます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Auto-waiting: xoá bỏ sleep cứng và race condition",
      en: "3. Auto-waiting: eliminating hard sleeps and race conditions",
      ja: "3. 自動待機: ハードスリープとレースコンディションの排除",
    },
    blocks: [
      P(
        "Nguồn flaky phổ biến nhất là chờ sai. Người mới hay thêm sleep cứng kiểu 'đợi 2 giây rồi kiểm', nhưng 2 giây khi thì thừa (làm test chậm), khi thì thiếu (làm test đỏ giả). Cách đúng là chờ theo điều kiện: đợi cho tới khi phần tử đạt trạng thái mong muốn, với cơ chế polling và timeout hợp lý. Playwright và các công cụ hiện đại tích hợp auto-wait vào cả hành động lẫn assertion, nên nếu bạn dùng đúng API thì phần lớn timing flaky biến mất.",
        "The most common source of flakiness is waiting wrong. Beginners add a hard sleep like 'wait 2 seconds then check', but 2 seconds is sometimes too much (slow test) and sometimes too little (false red). The right way is to wait on a condition: wait until an element reaches the desired state, with sensible polling and timeout. Playwright and modern tools bake auto-wait into both actions and assertions, so if you use the right API most timing flakiness disappears.",
        "最も一般的なフレーキーの原因は誤った待機です。初心者は「2 秒待ってから確認」のようなハードスリープを足しますが、2 秒は過剰なとき(遅いテスト)もあれば不足なとき(偽の赤)もあります。正しいのは条件で待つことです。要素が望む状態に達するまで、適切なポーリングとタイムアウトで待ちます。Playwright や現代のツールはアクションにもアサーションにも自動待機を組み込むので、正しい API を使えばタイミングのフレーキーの大半は消えます。"
      ),
      CODE(
        "ts",
        `// SAI: sleep cứng — khi thừa khi thiếu, nguồn flaky timing kinh điển
await page.waitForTimeout(2000);
expect(await page.locator('#balance').innerText()).toBe('1.000.000');

// ĐÚNG: assertion có auto-wait + polling, chờ tới khi đạt trạng thái
await expect(page.getByTestId('balance')).toHaveText('1.000.000', { timeout: 10_000 });

// ĐÚNG: chờ điều kiện nghiệp vụ, không chờ thời gian
await expect
  .poll(async () => (await api.get('/orders/O1')).data.status, { timeout: 15_000 })
  .toBe('SETTLED');`
      ),
      P(
        "Một chi tiết dễ bỏ qua: hãy chờ đúng tín hiệu thể hiện việc đã hoàn tất, chứ không phải một tín hiệu trung gian. Ví dụ trong luồng thanh toán, đừng chờ 'spinner biến mất' rồi kiểm số dư — spinner có thể biến mất trước khi backend ghi sổ xong. Thay vào đó, hãy chờ chính trạng thái nghiệp vụ cuối cùng (đơn chuyển sang SETTLED, số dư cập nhật đúng). Chờ đúng tín hiệu vừa diệt flaky vừa làm assertion của bạn ý nghĩa hơn.",
        "An easily missed detail: wait for the right signal of completion, not an intermediate one. For example in a payment flow, don't wait for 'the spinner disappears' then check the balance — the spinner may vanish before the backend finishes bookkeeping. Instead, wait for the final business state itself (the order becomes SETTLED, the balance updates correctly). Waiting for the right signal both kills flakiness and makes your assertion more meaningful.",
        "見落としやすい点として、完了を示す正しい信号を待ち、中間の信号を待たないことです。例えば決済フローで「スピナーが消える」を待って残高を確認してはいけません。バックエンドの記帳が終わる前にスピナーが消えることがあります。代わりに最終的な業務状態そのもの(注文が SETTLED になる、残高が正しく更新される)を待ちます。正しい信号を待つことはフレーキーを絶ち、アサーションをより意味あるものにします。"
      ),
      TIP(
        "Cấm dùng waitForTimeout trong lint rule của repo. Bắt buộc mọi 'chờ' phải là chờ theo điều kiện (expect có auto-wait hoặc expect.poll).",
        "Ban waitForTimeout in the repo's lint rule. Require every 'wait' to be condition-based (auto-waiting expect or expect.poll).",
        "リポジトリの lint ルールで waitForTimeout を禁止します。すべての「待機」を条件ベース(自動待機の expect または expect.poll)にすることを必須にします。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Seed tất định: dữ liệu, thời gian và ngẫu nhiên có kiểm soát",
      en: "4. Deterministic seeding: data, time and controlled randomness",
      ja: "4. 決定論的シード: データ・時刻・制御された乱数",
    },
    blocks: [
      P(
        "Một test chỉ tất định khi mọi nguồn ngẫu nhiên của nó bị kiểm soát. Ba nguồn ngẫu nhiên hay bị bỏ quên là: dữ liệu (mỗi lần chạy tạo id/khoản tiền khác nhau), thời gian (test phụ thuộc ngày giờ thật, chạy lúc nửa đêm thì đỏ), và số ngẫu nhiên (random không seed). Muốn hết flaky do ngẫu nhiên, bạn phải cố định cả ba: seed dữ liệu ổn định, đóng băng đồng hồ, và seed cho bộ sinh số ngẫu nhiên.",
        "A test is deterministic only when all its sources of randomness are controlled. Three commonly forgotten sources are: data (each run creates different ids/amounts), time (the test depends on the real clock and goes red at midnight), and random numbers (unseeded random). To eliminate randomness-driven flakiness you must fix all three: a stable data seed, a frozen clock, and a seed for the random number generator.",
        "テストが決定論的になるのは、すべての乱数源が制御されたときだけです。よく忘れられる三つの源は、データ(実行ごとに異なる id/金額を生成)、時刻(テストが実時計に依存し深夜に赤になる)、乱数(シードなしの random)です。乱数由来のフレーキーを排除するには三つすべてを固定します。安定したデータシード、凍結した時計、乱数生成器のシードです。"
      ),
      CODE(
        "ts",
        `// Đóng băng thời gian + seed dữ liệu để tất định hoá
import { test, expect } from './seed.spec';

test.beforeEach(async ({ page }) => {
  // Đóng băng đồng hồ: test không phụ thuộc ngày giờ thật
  await page.clock.install({ time: new Date('2026-01-15T09:00:00Z') });
});

test('lãi suất tính đúng theo ngày cố định', async ({ page, seedDb }) => {
  // Seed tất định: id, số tiền, ngày mở đều cố định — chạy lần nào cũng như nhau
  const acc = await seedDb.account({ id: 'ACC-FIX-1', balance: 1_000_000, openedAt: '2026-01-01' });
  await page.goto('/accounts/' + acc.id);

  await page.clock.fastForward('14:00:00');           // tua thời gian có kiểm soát
  await expect(page.getByTestId('accrued-interest')).toHaveText('575'); // kỳ vọng cố định
});`
      ),
      P(
        "Seed tất định còn giúp bạn viết oracle chặt hơn. Khi dữ liệu và thời gian đã cố định, kỳ vọng của bạn có thể là một con số chính xác thay vì 'lớn hơn 0' mơ hồ. Assertion càng chính xác thì khả năng bắt lỗi càng cao và độ nhiễu càng thấp. Ngược lại, một test dựa vào dữ liệu ngẫu nhiên buộc bạn phải nới assertion cho 'an toàn', và assertion lỏng lẻo chính là nơi bug ẩn nấp.",
        "Deterministic seeding also lets you write tighter oracles. When data and time are fixed, your expectation can be an exact number instead of a vague 'greater than 0'. The more precise the assertion, the higher its bug-catching power and the lower its noise. Conversely, a test built on random data forces you to loosen assertions 'to be safe', and a loose assertion is exactly where bugs hide.",
        "決定論的シードはより厳密なオラクルを書くことも可能にします。データと時刻が固定されると、期待値は曖昧な「0 より大きい」ではなく正確な数値にできます。アサーションが精密なほどバグ検出力は高まり、ノイズは減ります。逆に乱数データに基づくテストは「安全のため」アサーションを緩めざるを得ず、緩いアサーションこそバグが潜む場所です。"
      ),
      NOTE(
        "Tất định không phải để 'test dễ xanh' mà để 'khi đỏ là đỏ thật'. Loại bỏ ngẫu nhiên giúp mỗi lần đỏ đều mang tín hiệu đáng tin.",
        "Determinism is not to 'make tests pass easily' but so that 'when it's red, it's really red'. Removing randomness makes every red carry a trustworthy signal.",
        "決定論は「テストを簡単にグリーンにする」ためではなく「赤なら本当に赤」にするためです。乱数を除けば、あらゆる赤が信頼できる信号を帯びます。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Cô lập state chung: tenant, worker và dọn dẹp",
      en: "5. Isolating shared state: tenant, worker and cleanup",
      ja: "5. 共有状態の隔離: テナント、ワーカー、後始末",
    },
    blocks: [
      P(
        "Khi chạy hàng nghìn test song song, nguyên nhân flaky âm ỉ nhất là chúng giẫm lên dữ liệu chung. Hai test cùng sửa một tài khoản, cùng đọc một hàng đợi, cùng ghi vào một khoá cache — và kết quả tuỳ thuộc test nào chạm trước. Nguyên tắc vàng để chống flaky ở quy mô là mỗi test phải sở hữu dữ liệu riêng của nó: tạo tenant riêng, tài khoản riêng, khoá dữ liệu theo worker id, và dọn sạch sau khi chạy. Không chia sẻ state là không có va chạm.",
        "When running thousands of tests in parallel, the most insidious flakiness cause is them trampling shared data. Two tests modify the same account, read the same queue, write the same cache key — and the outcome depends on which touches first. The golden rule for anti-flaky at scale is that each test must own its own data: create its own tenant, its own account, key data by worker id, and clean up afterward. No shared state means no collision.",
        "数千のテストを並列実行するとき、最も陰湿なフレーキーの原因は共有データの踏み合いです。二つのテストが同じアカウントを変更し、同じキューを読み、同じキャッシュキーに書き込む——結果はどちらが先に触れるかで変わります。大規模なアンチフレーキーの黄金律は、各テストが自前のデータを所有することです。専用テナント、専用アカウントを作り、ワーカー id でデータをキー付けし、実行後に後始末します。共有状態がなければ衝突もありません。"
      ),
      CODE(
        "ts",
        `// Cô lập theo worker: mỗi luồng song song có tenant riêng, không đụng nhau
import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ tenant: { id: string } }>({
  tenant: async ({}, use, testInfo) => {
    // Khoá dữ liệu theo workerIndex + test → không hai test nào dùng chung
    const id = \`t-\${testInfo.workerIndex}-\${testInfo.testId.slice(0, 6)}\`;
    await db.createTenant(id);
    await use({ id });
    await db.dropTenant(id);          // dọn sạch dù pass hay fail
  },
});
export { expect };`
      ),
      P(
        "Dọn dẹp phải chạy kể cả khi test đỏ, nếu không dữ liệu rác tích tụ và biến test sau thành flaky. Fixture với mô hình setup/teardown giải quyết việc này gọn gàng: phần sau lệnh use luôn chạy để dọn. Ngoài ra, hãy tránh phụ thuộc thứ tự bằng cách cấm test này đọc dữ liệu do test khác tạo — mỗi test tự dựng bối cảnh của mình từ đầu. Khi làm đúng, bạn có thể xáo trộn thứ tự hoặc chạy một test đơn lẻ mà kết quả không đổi.",
        "Cleanup must run even when a test is red, otherwise junk data accumulates and turns later tests flaky. A fixture with a setup/teardown model handles this cleanly: the part after the use call always runs to clean up. Also, avoid order dependence by forbidding one test to read data created by another — each test builds its own context from scratch. Done right, you can shuffle order or run a single test alone and the result won't change.",
        "後始末はテストが赤のときでも実行されねばなりません。さもないとゴミデータが蓄積し後のテストをフレーキーにします。setup/teardown モデルのフィクスチャがこれをきれいに扱います。use 呼び出し後の部分が必ず実行され後始末します。また、あるテストが別のテストの作ったデータを読むことを禁じて順序依存を避けます。各テストは一から自前の文脈を構築します。正しく行えば、順序をシャッフルしても単独実行しても結果は変わりません。"
      ),
      SCEN(
        "Test xanh khi chạy đơn, đỏ khi chạy song song",
        "Green when run alone, red under parallelism",
        "Một đội fintech thấy suite đỏ ngẫu nhiên trên CI nhưng luôn xanh khi chạy máy cá nhân. Điều tra: nhiều test dùng chung tài khoản 'ACC-DEMO' và cùng trừ tiền; khi CI chạy 8 worker song song, số dư cuối phụ thuộc thứ tự — flaky do shared state. Sửa: mỗi test tạo tài khoản riêng theo worker id và seed số dư cố định. Sau đó suite ổn định ở mọi mức song song, và bonus là chạy nhanh hơn vì không còn phải chạy tuần tự để né va chạm.",
        "A fintech team saw the suite go randomly red on CI but always green on local machines. Investigation: many tests shared an 'ACC-DEMO' account and all debited it; when CI ran 8 workers in parallel, the final balance depended on order — flakiness from shared state. Fix: each test creates its own account by worker id with a fixed seeded balance. Afterward the suite is stable at any parallelism, with the bonus of running faster because it no longer needs to run serially to dodge collisions.",
        "あるフィンテックチームは、CI ではランダムに赤になるがローカルでは常にグリーンなスイートを見ました。調査すると、多くのテストが 'ACC-DEMO' アカウントを共有して減算しており、CI が 8 ワーカーを並列実行すると最終残高が順序に依存する——共有状態由来のフレーキーでした。修正: 各テストがワーカー id で自前のアカウントを作り、固定シードの残高を持たせます。以降スイートはどの並列度でも安定し、衝突回避のため直列実行する必要がなくなり高速化のおまけも付きました。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Mock mạng: kiểm soát biên ngoài để hết đỏ ngẫu nhiên",
      en: "6. Network mocking: controlling the external boundary to end random red",
      ja: "6. ネットワークモック: 外部境界を制御しランダムな赤を無くす",
    },
    blocks: [
      P(
        "Nhóm flaky cuối cùng đến từ mạng và dịch vụ ngoài: cổng thanh toán trả lời chậm, một microservice trả 503 thoáng qua, DNS chập chờn. Với đa số test chức năng, bạn không muốn kiểm dịch vụ ngoài — bạn muốn kiểm logic của mình. Vì thế hãy route hoá (mock) biên ngoài: chặn request tới dịch vụ thứ ba và trả phản hồi cố định do bạn kiểm soát. Test lúc này tất định và nhanh, còn phần tích hợp thật với dịch vụ ngoài để dành cho một tầng test riêng, ít hơn và có chủ đích.",
        "The last flakiness group comes from the network and external services: the payment gateway responds slowly, a microservice returns a transient 503, DNS is shaky. For most functional tests you don't want to test the external service — you want to test your logic. So route (mock) the external boundary: intercept requests to third parties and return fixed responses you control. The test is now deterministic and fast, while real integration with external services goes to a separate, smaller, deliberate test tier.",
        "最後のフレーキーグループはネットワークと外部サービスから来ます。決済ゲートウェイの応答が遅い、マイクロサービスが一過性の 503 を返す、DNS が不安定です。ほとんどの機能テストでは外部サービスをテストしたいのではなく、自分のロジックをテストしたいのです。ですから外部境界をルート化(モック)します。第三者へのリクエストを傍受し、自分が制御する固定応答を返します。テストは決定論的で高速になり、外部サービスとの実統合はより小規模で意図的な別のテスト層に回します。"
      ),
      CODE(
        "ts",
        `// Mock cổng thanh toán để test tất định; và test riêng ca lỗi mạng có chủ đích
test('thanh toán thành công (mock gateway) giữ bút toán kép', async ({ page }) => {
  await page.route('**/gateway/charge', (route) =>
    route.fulfill({ status: 200, json: { id: 'ch_1', status: 'succeeded' } })
  );
  await checkout(page);
  // Oracle: tổng ghi Nợ = tổng ghi Có (double-entry), không chỉ 'thấy success'
  const { debit, credit } = await ledger.sumFor('ORD-1');
  expect(debit).toBe(credit);
});

test('gateway timeout → không tạo bút toán mồ côi', async ({ page }) => {
  await page.route('**/gateway/charge', (route) => route.abort('timedout'));
  await checkout(page);
  expect(await ledger.entriesFor('ORD-1')).toHaveLength(0); // không rò rỉ nửa giao dịch
});`
      ),
      P(
        "Chú ý cách tách hai loại test: một cái mock để kiểm logic khi mạng bình thường, một cái chủ động giả lập timeout để kiểm hành vi khi mạng hỏng. Ca lỗi mạng không còn ngẫu nhiên mà trở thành một test có chủ đích, kiểm một bất biến quan trọng: khi thanh toán fail giữa chừng, hệ thống không được để lại 'bút toán mồ côi' (ghi Nợ mà không ghi Có). Đây là cách biến flaky mạng từ kẻ phá hoại thành một trường hợp kiểm thử có giá trị.",
        "Notice how two test kinds are separated: one mocks to test logic under a normal network, one deliberately simulates a timeout to test behavior under a broken network. The network failure case is no longer random but a deliberate test checking an important invariant: when payment fails midway, the system must not leave an 'orphan entry' (a debit without a credit). This turns network flakiness from a saboteur into a valuable test case.",
        "二種類のテストの分け方に注目してください。一方は正常なネットワーク下でロジックを検証するためにモックし、もう一方は壊れたネットワーク下の挙動を検証するために意図的にタイムアウトを模擬します。ネットワーク障害ケースはもはやランダムではなく、重要な不変条件を検証する意図的なテストになります。決済が途中で失敗したとき、システムは「孤児仕訳」(貸方のない借方)を残してはならない、という不変条件です。これはネットワークのフレーキーを妨害者から価値あるテストケースへ変える方法です。"
      ),
      WARN(
        "Đừng mock quá tay đến mức test không còn chạm code thật của bạn. Mock biên ngoài (dịch vụ thứ ba), không mock chính logic bạn cần kiểm.",
        "Don't over-mock to the point the test no longer touches your real code. Mock the external boundary (third-party services), not the very logic you need to test.",
        "テストが自分の実コードに触れなくなるほど過剰にモックしてはいけません。外部境界(第三者サービス)をモックし、検証したいロジックそのものはモックしません。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Quarantine + retry với trace giữ lại khi fail",
      en: "7. Quarantine + retry with retain-on-failure trace",
      ja: "7. 隔離 + 再試行と失敗時トレース保持",
    },
    blocks: [
      P(
        "Dù ổn định hoá tốt tới đâu, ở quy mô lớn vẫn còn một tỉ lệ nhỏ test flaky khó diệt ngay. Chiến lược vận hành là quarantine (cách ly): một test bị nghi flaky được tách khỏi cổng gác merge để không chặn cả đội, nhưng vẫn tiếp tục chạy và được theo dõi để sửa dứt điểm. Song song, bật retry có giới hạn kèm trace giữ lại khi fail: khi một test đỏ rồi retry mà xanh, bạn có ngay trace của lần fail để phân tích nguyên nhân thay vì mất dấu vết.",
        "No matter how well you stabilize, at scale a small fraction of hard-to-kill flaky tests remains. The operational strategy is quarantine: a suspected-flaky test is separated from the merge gate so it doesn't block the whole team, yet keeps running and is tracked for a definitive fix. In parallel, enable bounded retry with a retain-on-failure trace: when a test goes red then retries to green, you immediately have the trace of the failure to analyze the cause instead of losing the trail.",
        "どれほどよく安定化しても、大規模では即座に絶てないフレーキーテストがわずかに残ります。運用戦略は隔離(quarantine)です。フレーキーが疑われるテストをマージ門番から切り離してチーム全体をブロックしないようにしつつ、実行を続け根本修正のため追跡します。並行して、失敗時トレース保持付きの制限された再試行を有効にします。テストが赤になり再試行でグリーンになったとき、痕跡を失う代わりに原因分析のための失敗トレースをすぐに得られます。"
      ),
      IMG(
        SVG_QUARANTINE,
        "Vòng quarantine + retry; retry chỉ hợp lệ khi oracle bất biến gác cổng.",
        "The quarantine + retry loop; retry is only valid when an invariant oracle gates it.",
        "隔離 + 再試行のループ。再試行は不変条件のオラクルが門番のときのみ有効。"
      ),
      CODE(
        "ts",
        `// playwright.config.ts — retry có giới hạn + trace giữ lại khi fail/retry
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: process.env.CI ? 2 : 0,     // giới hạn, không retry vô hạn
  use: {
    trace: 'retain-on-failure-and-retries',  // luôn có trace của lần fail để phân tích
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // Gắn nhãn để tách quarantine khỏi gate merge
  projects: [
    { name: 'gate',       testIgnore: /@quarantine/ },   // gác merge: chỉ test ổn định
    { name: 'quarantine', grep: /@quarantine/ },          // vẫn chạy, KHÔNG chặn merge
  ],
});`
      ),
      P(
        "Điều tối quan trọng: retry chỉ được phép khi oracle là bất biến nghiệp vụ, không phải khi assertion hời hợt. Vì sao? Nếu test của bạn kiểm một bất biến như 'tổng Nợ = tổng Có' hoặc 'retry cho ra đúng một trạng thái cuối', thì việc chạy lại và vẫn thoả bất biến là bằng chứng đúng đắn. Nhưng nếu test chỉ kiểm 'thấy toast success', thì retry-để-xanh không chứng minh gì cả — bạn chỉ đang quay xổ số cho tới khi trúng màu xanh. Đó là ranh giới giữa 'chống flaky' và 'che bug'.",
        "The crucial point: retry is only allowed when the oracle is a business invariant, not a shallow assertion. Why? If your test checks an invariant like 'total debit = total credit' or 'retries yield exactly one final state', then rerunning and still satisfying the invariant is valid evidence of correctness. But if the test only checks 'a success toast appeared', retry-to-green proves nothing — you are just spinning the roulette until green comes up. That is the line between 'anti-flaky' and 'masking a bug'.",
        "決定的な点として、再試行は浅いアサーションではなく、オラクルが業務不変条件のときにのみ許されます。なぜか。テストが「総借方 = 総貸方」や「再試行で最終状態が一つだけ」のような不変条件を検証するなら、再実行してもなお不変条件を満たすことは正しさの妥当な証拠です。しかしテストが「成功トーストが出た」だけを検証するなら、グリーンになるまでの再試行は何も証明しません。緑が出るまでルーレットを回しているだけです。これが「アンチフレーキー」と「バグの隠蔽」の境界線です。"
      ),
      TIP(
        "Đặt trần cứng cho tỉ lệ quarantine (ví dụ ≤ 1% suite). Vượt trần thì coi như nợ kỹ thuật phải trả, không để quarantine thành bãi rác vĩnh viễn.",
        "Set a hard cap on the quarantine ratio (e.g. ≤ 1% of the suite). Exceeding it counts as technical debt to be paid, so quarantine never becomes a permanent dumping ground.",
        "隔離率に厳格な上限(例: スイートの 1% 以下)を設けます。超過は返済すべき技術的負債とみなし、隔離を恒久的なゴミ捨て場にしません。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. AI cụm hoá các lần fail và gợi ý sửa",
      en: "8. AI clustering failures and suggesting fixes",
      ja: "8. AI による失敗のクラスタリングと修正提案",
    },
    blocks: [
      P(
        "Ở quy mô hàng nghìn test chạy nhiều lần mỗi ngày, con người không thể đọc hết log fail. Đây là chỗ AI phát huy thật sự: gom hàng trăm lần fail thành vài cụm theo dấu vết chung (cùng thông điệp lỗi, cùng bước, cùng stack, cùng tín hiệu network). Thay vì mở 300 báo cáo lẻ, kỹ sư nhìn thấy '5 cụm', mỗi cụm là một nguyên nhân gốc khả dĩ. AI cũng có thể xếp hạng cụm nào giống flaky hạ tầng (thường xanh khi retry) và cụm nào giống lỗi thật (đỏ đều đặn, có bug signature).",
        "At the scale of thousands of tests running many times a day, humans cannot read every failure log. This is where AI truly shines: grouping hundreds of failures into a few clusters by shared signature (same error message, same step, same stack, same network signal). Instead of opening 300 separate reports, the engineer sees '5 clusters', each a plausible root cause. AI can also rank which cluster looks like infrastructure flakiness (usually green on retry) and which looks like a real bug (consistently red, with a bug signature).",
        "数千のテストが一日に何度も走る規模では、人間がすべての失敗ログを読むことはできません。ここで AI が真価を発揮します。共通のシグネチャ(同じエラーメッセージ、同じ手順、同じスタック、同じネットワーク信号)で数百の失敗をいくつかのクラスタにまとめます。300 の個別レポートを開く代わりに、エンジニアは「5 クラスタ」を見て、各々がもっともらしい根本原因です。AI はどのクラスタがインフラのフレーキーらしいか(通常再試行でグリーン)、どれが本物のバグらしいか(一貫して赤、バグシグネチャあり)をランク付けもできます。"
      ),
      CODE(
        "ts",
        `// Cụm hoá fail theo dấu vết, tách flaky hạ tầng vs bug thật (rồi người xác nhận)
type Failure = { testId: string; message: string; step: string; net?: number; passedOnRetry: boolean };

function clusterFailures(fails: Failure[]) {
  const byKey = new Map<string, Failure[]>();
  for (const f of fails) {
    const key = signature(f.message, f.step, f.net);   // AI/heuristic sinh chữ ký chung
    (byKey.get(key) ?? byKey.set(key, []).get(key)!).push(f);
  }
  return [...byKey.entries()].map(([key, items]) => ({
    key,
    size: items.length,
    // Nghi flaky hạ tầng nếu đa số xanh lại khi retry; nghi bug nếu đỏ đều
    looksFlaky: items.filter(i => i.passedOnRetry).length / items.length > 0.7,
  })).sort((a, b) => b.size - a.size);
}`
      ),
      P(
        "AI có thể đi xa hơn cụm hoá: nó gợi ý sửa. Ví dụ nó nhận ra một cụm luôn fail ở bước điền form vì locator đổi tên, và đề xuất locator mới đã verify trên app. Hay nó thấy một cụm timing và đề xuất đổi sleep cứng thành expect có auto-wait. Nhưng — và đây là ranh giới sống còn — gợi ý của AI phải đi qua review của người, và không bao giờ được phép sửa bằng cách nới lỏng oracle. AI được sửa 'cách test chờ và tìm phần tử', không được sửa 'điều test khẳng định là đúng'.",
        "AI can go beyond clustering: it suggests fixes. For example it notices a cluster always fails at the form-fill step because a locator was renamed, and proposes a new locator verified on the app. Or it sees a timing cluster and proposes replacing a hard sleep with an auto-waiting expect. But — and this is the vital boundary — AI's suggestion must pass human review, and may never fix things by loosening the oracle. AI may fix 'how the test waits and finds elements', not 'what the test asserts to be correct'.",
        "AI はクラスタリングを超えて修正を提案できます。例えば、ロケーターの改名により常にフォーム入力手順で失敗するクラスタに気づき、アプリで検証済みの新しいロケーターを提案します。あるいはタイミングのクラスタを見て、ハードスリープを自動待機の expect に置き換えることを提案します。しかし——これが決定的な境界です——AI の提案は人間のレビューを通らねばならず、オラクルを緩めて修正することは決して許されません。AI は「テストがどう待ち、要素をどう見つけるか」を修正でき、「テストが正しいと断言する内容」は修正できません。"
      ),
      NOTE(
        "Cụm hoá bằng AI tiết kiệm rất nhiều thời gian phân loại, nhưng kết luận 'flaky hay bug' luôn cần người xác nhận. Xếp sai một bug thành flaky rồi retry-cho-qua là cách bỏ lọt lỗi kinh điển.",
        "AI clustering saves enormous triage time, but the 'flaky or bug' conclusion always needs human confirmation. Misclassifying a bug as flaky then retrying it away is a classic way to miss defects.",
        "AI クラスタリングは仕分け時間を大幅に節約しますが、「フレーキーかバグか」の結論は常に人間の確認が必要です。バグをフレーキーと誤分類して再試行でやり過ごすのは、欠陥を見逃す典型的な手口です。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Oracle bất biến: bảo toàn tiền và idempotency khi retry",
      en: "9. Invariant oracles: money conservation and idempotency under retry",
      ja: "9. 不変条件オラクル: 再試行下での金銭保存と冪等性",
    },
    blocks: [
      P(
        "Trọng tâm của toàn bài là đây: một test 'xanh' chỉ có ý nghĩa nếu nó khẳng định một bất biến nghiệp vụ, không phải một hiện tượng bề mặt. Trong fintech, hai bất biến quan trọng nhất là bảo toàn tiền theo bút toán kép (mọi giao dịch, tổng ghi Nợ luôn bằng tổng ghi Có; tiền không tự sinh ra hay biến mất) và idempotency (một thao tác lặp lại — do người dùng bấm hai lần hay do retry mạng — vẫn chỉ dẫn tới đúng một trạng thái cuối). Khi oracle của bạn là các bất biến này, retry trở nên an toàn: nếu chạy lại mà bất biến vẫn giữ, kết quả đáng tin.",
        "Here is the crux of the whole article: a 'green' test is meaningful only if it asserts a business invariant, not a surface phenomenon. In fintech the two most important invariants are money conservation by double-entry (in every transaction, total debit always equals total credit; money is neither created nor destroyed) and idempotency (a repeated operation — whether the user clicks twice or the network retries — still leads to exactly one final state). When your oracle is these invariants, retry becomes safe: if rerunning still holds the invariant, the result is trustworthy.",
        "本記事全体の核心はここです。「グリーン」なテストが意味を持つのは、表面的な現象ではなく業務不変条件を断言する場合だけです。フィンテックで最も重要な二つの不変条件は、複式簿記による金銭保存(すべての取引で総借方は常に総貸方に等しく、金銭は生成も消滅もしない)と冪等性(繰り返される操作——ユーザーが二度クリックしても、ネットワークが再試行しても——なお最終状態は一つだけになる)です。オラクルがこれらの不変条件なら、再試行は安全になります。再実行しても不変条件が保たれるなら、結果は信頼できます。"
      ),
      CODE(
        "ts",
        `// Oracle 1 — bảo toàn tiền (double-entry): tổng Nợ luôn = tổng Có
test('chuyển tiền bảo toàn tổng (double-entry)', async ({ api }) => {
  const before = await api.sumAllBalances();
  await api.post('/transfer', { from: 'A', to: 'B', amount: 250_000 });
  const after = await api.sumAllBalances();
  expect(after).toBe(before);                       // tiền không tự sinh/biến mất
  const { debit, credit } = await api.ledgerSum('last');
  expect(debit).toBe(credit);                        // mỗi giao dịch cân bằng
});

// Oracle 2 — idempotency: retry/double-submit → đúng 1 trạng thái cuối
test('retry chuyển tiền không nhân đôi giao dịch', async ({ api }) => {
  const key = crypto.randomUUID();
  await Promise.all([
    api.post('/transfer', { from: 'A', to: 'B', amount: 100, idempotencyKey: key }),
    api.post('/transfer', { from: 'A', to: 'B', amount: 100, idempotencyKey: key }),
  ]);
  const txns = await api.get('/transfers?idempotencyKey=' + key);
  expect(txns.length).toBe(1);                       // đúng 1, không phải 2
});`
      ),
      P(
        "Hãy để ý vì sao các oracle này miễn nhiễm với 'retry-để-che-bug'. Nếu code có bug nhân đôi giao dịch khi retry, thì dù bạn chạy lại bao nhiêu lần, số giao dịch vẫn là 2 và test vẫn đỏ — retry không cứu được một bug thật. Ngược lại nếu chỉ kiểm 'thấy màn hình thành công', bug nhân đôi có thể vẫn hiện màn hình thành công và retry sẽ 'giúp' test xanh một cách sai lầm. Chính bản chất bất biến của oracle làm cho retry an toàn: nó tách bạch flaky hạ tầng (đáng retry) khỏi bug nghiệp vụ (không retry nào che nổi).",
        "Notice why these oracles are immune to 'retry-to-mask-a-bug'. If the code has a bug that doubles the transaction on retry, then no matter how many times you rerun, the transaction count stays 2 and the test stays red — retry cannot rescue a real bug. Conversely, if you only check 'a success screen appeared', the doubling bug may still show a success screen and retry would wrongly 'help' the test go green. It is precisely the invariant nature of the oracle that makes retry safe: it separates infrastructure flakiness (worth retrying) from a business bug (no retry can mask it).",
        "これらのオラクルが「バグ隠蔽のための再試行」に免疫がある理由に注目してください。再試行時に取引を二重化するバグがコードにあれば、何度再実行しても取引数は 2 のままでテストは赤のままです。再試行は本物のバグを救えません。逆に「成功画面が出た」だけを確認するなら、二重化バグでも成功画面が出て、再試行がテストを誤ってグリーンに「助けて」しまいます。まさにオラクルの不変条件としての性質が再試行を安全にします。インフラのフレーキー(再試行に値する)と業務バグ(いかなる再試行も隠せない)を分離するのです。"
      ),
      TIP(
        "Với mỗi test flaky, hãy hỏi: 'assertion của nó có phải bất biến không?'. Nếu không, đừng vội retry — hãy nâng cấp oracle trước, vì một oracle yếu khiến retry trở nên nguy hiểm.",
        "For every flaky test, ask: 'is its assertion an invariant?'. If not, don't rush to retry — upgrade the oracle first, because a weak oracle makes retry dangerous.",
        "フレーキーなテストごとに問いましょう。「そのアサーションは不変条件か」。そうでなければ急いで再試行せず、まずオラクルを強化します。弱いオラクルは再試行を危険にするからです。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Chỉ số flaky và dashboard vận hành",
      en: "10. Flaky metrics and an operational dashboard",
      ja: "10. フレーキー指標と運用ダッシュボード",
    },
    blocks: [
      P(
        "Bạn không quản lý được thứ bạn không đo. Để chống flaky bền vững, hãy theo dõi một vài chỉ số cốt lõi qua thời gian: tỉ lệ flaky (số test flaky / tổng test), độ dao động (một test đổi kết quả bao nhiêu lần trong N lần chạy), thời gian trong quarantine của mỗi test, và pass-rate sau retry (nếu quá nhiều test cần retry để xanh, hạ tầng đang có vấn đề). Một dashboard tốt biến flaky từ nỗi bực bội mơ hồ thành một con số có xu hướng, có chủ sở hữu, có mục tiêu.",
        "You can't manage what you don't measure. For durable anti-flaky work, track a few core metrics over time: the flaky ratio (flaky tests / total tests), volatility (how many times a test flips result over N runs), time-in-quarantine per test, and post-retry pass-rate (if too many tests need a retry to go green, the infrastructure has a problem). A good dashboard turns flakiness from a vague annoyance into a trending number with an owner and a target.",
        "測れないものは管理できません。持続的なアンチフレーキーのために、いくつかの中核指標を時系列で追跡します。フレーキー率(フレーキーテスト数/総テスト数)、変動性(N 回の実行でテストが結果を何回反転するか)、テストごとの隔離滞在時間、再試行後の成功率(グリーン化に再試行が必要なテストが多すぎればインフラに問題あり)です。良いダッシュボードはフレーキーを曖昧な苛立ちから、所有者と目標を持つ傾向のある数値へ変えます。"
      ),
      CODE(
        "sql",
        `-- Tính tỉ lệ flaky theo tuần từ bảng lịch sử chạy test
SELECT
  date_trunc('week', run_at)                              AS week,
  count(*) FILTER (WHERE flipped)                         AS flaky_runs,
  count(*)                                                AS total_runs,
  round(100.0 * count(*) FILTER (WHERE flipped) / count(*), 2) AS flaky_pct
FROM (
  SELECT test_id, run_at,
         -- 'flipped' = trong cùng commit, test có cả pass lẫn fail
         bool_or(status='fail') AND bool_or(status='pass') AS flipped
  FROM test_runs
  GROUP BY test_id, run_at, commit_sha
) t
GROUP BY week
ORDER BY week;`
      ),
      P(
        "Chỉ số quan trọng, nhưng cách dùng chúng còn quan trọng hơn. Gắn mỗi test flaky với một chủ sở hữu và một hạn xử lý; đặt ngưỡng cảnh báo (ví dụ flaky vượt 1% thì báo động). Quan trọng nhất: đừng bao giờ tối ưu chỉ số bằng cách nới lỏng oracle. Một cách 'gian lận' phổ biến là hạ chuẩn assertion để giảm số fail và làm đẹp dashboard — nhưng đó là cải thiện giả, và nó biến bộ test thành tấm bình phong che bug. Chỉ số phải phục vụ độ tin cậy, không phải thay thế nó.",
        "Metrics matter, but how you use them matters more. Tie each flaky test to an owner and a deadline; set alert thresholds (e.g. alarm when flakiness exceeds 1%). Most importantly: never optimize metrics by loosening oracles. A common 'cheat' is lowering assertion standards to reduce failures and beautify the dashboard — but that's a fake improvement, turning the suite into a screen that hides bugs. Metrics must serve reliability, not replace it.",
        "指標は重要ですが、その使い方はもっと重要です。各フレーキーテストを所有者と期限に紐づけ、アラート閾値を設定します(例: フレーキーが 1% を超えたら警報)。最も重要なのは、オラクルを緩めて指標を最適化しないことです。よくある「ズル」はアサーション基準を下げて失敗を減らしダッシュボードを美化することですが、それは偽の改善で、スイートをバグを隠す衝立に変えます。指標は信頼性に奉仕すべきで、それを置き換えてはいけません。"
      ),
      NOTE(
        "Mục tiêu cuối không phải 'dashboard toàn xanh' mà 'khi đỏ là đáng tin'. Một suite trung thực với vài đèn đỏ thật đáng giá hơn một suite xanh giả tạo.",
        "The end goal is not 'an all-green dashboard' but 'when it's red, it's trustworthy'. An honest suite with a few real reds is worth more than a fake-green one.",
        "最終目標は「全面グリーンのダッシュボード」ではなく「赤なら信頼できる」ことです。本物の赤がいくつかある正直なスイートは、偽グリーンのスイートより価値があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kịch bản thực chiến: sàn thanh toán fintech ổn định suite",
      en: "11. Real-world scenario: a fintech payments platform stabilizes its suite",
      ja: "11. 実戦シナリオ: フィンテック決済基盤がスイートを安定化",
    },
    blocks: [
      SCEN(
        "Từ 12% flaky và mất niềm tin, tới suite đáng tin",
        "From 12% flakiness and lost trust to a trustworthy suite",
        "Một sàn thanh toán có 4.000 test E2E, tỉ lệ flaky 12%; đội ngũ đã quen bấm 'rerun' và mất niềm tin vào đèn đỏ. Họ triển khai theo trình tự: (1) phân loại flaky bằng AI cụm hoá → phát hiện 60% là shared state, 25% timing, 10% mạng, 5% là BUG THẬT bị nhầm flaky; (2) cô lập dữ liệu theo worker, đổi sleep sang auto-wait, mock cổng thanh toán; (3) nâng cấp mọi oracle luồng tiền thành bất biến double-entry + idempotency; (4) bật quarantine + retry với trace; (5) dựng dashboard flaky. Sau một quý, flaky còn 0,8%, và quan trọng hơn: 5% bug thật bị nhầm flaky nay lộ ra và được sửa — trong đó có một lỗi nhân đôi giao dịch khi retry mạng.",
        "A payments platform had 4,000 E2E tests with 12% flakiness; the team was used to hitting 'rerun' and had lost trust in red. They rolled out in order: (1) classify flakiness via AI clustering → found 60% shared state, 25% timing, 10% network, 5% REAL BUGS mistaken as flaky; (2) isolate data per worker, swap sleeps for auto-wait, mock the payment gateway; (3) upgrade every money-flow oracle to double-entry + idempotency invariants; (4) enable quarantine + retry with trace; (5) build a flaky dashboard. After one quarter, flakiness dropped to 0.8%, and more importantly: the 5% real bugs mistaken as flaky surfaced and were fixed — including a transaction-doubling defect on network retry.",
        "ある決済基盤は 4,000 の E2E テストを持ち、フレーキー率は 12%。チームは「再実行」を押すのに慣れ、赤への信頼を失っていました。順を追って展開しました。(1) AI クラスタリングでフレーキーを分類 → 60% が共有状態、25% がタイミング、10% がネットワーク、5% がフレーキーと誤解された本物のバグと判明。(2) ワーカーごとにデータを隔離、スリープを自動待機に交換、決済ゲートウェイをモック。(3) すべての金銭フローのオラクルを複式簿記 + 冪等性の不変条件に強化。(4) トレース付きの隔離 + 再試行を有効化。(5) フレーキーダッシュボードを構築。一四半期後、フレーキーは 0.8% に低下し、より重要なことに、フレーキーと誤解されていた 5% の本物のバグが表面化し修正されました。その中にはネットワーク再試行時の取引二重化欠陥も含まれていました。"
      ),
      P(
        "Bài học lớn nhất từ ca này: giảm flaky đúng cách không phải là làm dashboard xanh hơn, mà là làm cho những đèn đỏ còn lại trở nên đáng tin đến mức không ai dám bỏ qua. Đúng lúc suite trở nên trung thực, những bug thật lâu nay ẩn dưới lớp 'chắc lại flaky thôi' mới lộ ra. Và trong fintech, một lỗi nhân đôi giao dịch không được phát hiện có thể tốn hàng tỉ đồng và cả giấy phép hoạt động.",
        "The biggest lesson from this case: reducing flakiness the right way is not making the dashboard greener, but making the remaining reds trustworthy enough that nobody dares ignore them. Precisely when the suite became honest, real bugs long hidden under 'it's probably just flaky' surfaced. And in fintech, an undetected transaction-doubling defect can cost billions and even an operating license.",
        "この事例からの最大の教訓は、フレーキーを正しく減らすことはダッシュボードをよりグリーンにすることではなく、残った赤を誰も無視できないほど信頼できるものにすることだ、という点です。スイートが正直になったまさにそのとき、「どうせフレーキーだ」の下に長く隠れていた本物のバグが表面化しました。そしてフィンテックでは、検出されない取引二重化欠陥は数十億円、さらには営業免許を失わせかねません。"
      ),
      WARN(
        "Tuyệt đối không dùng retry hay nới oracle để ép flaky luồng tiền xuống 0. Trong fintech, một 'xanh giả' cho luồng chuyển tiền là rủi ro mất tiền thật và vi phạm tuân thủ.",
        "Never use retry or oracle-loosening to force money-flow flakiness to zero. In fintech, a 'false green' on a transfer flow is a real money-loss and compliance risk.",
        "金銭フローのフレーキーをゼロに押し下げるために再試行やオラクルの緩和を絶対に使わないでください。フィンテックでは送金フローの「偽グリーン」は実際の金銭損失とコンプライアンス違反のリスクです。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Sai lầm thường gặp khi chống flaky bằng AI",
      en: "12. Common mistakes when fighting flakiness with AI",
      ja: "12. AI でフレーキーと戦う際のよくある失敗",
    },
    blocks: [
      UL(
        [
          "Tăng retry để giấu flaky mà không phân loại nguyên nhân → race condition vẫn còn, sẽ nổ ở production.",
          "Tin AI xếp 'flaky' rồi retry-cho-qua → một bug thật bị nhầm flaky lọt lưới.",
          "Cho AI sửa bằng cách nới lỏng assertion để test xanh → mất luôn khả năng bắt lỗi.",
          "Quarantine không hạn xử lý → biến thành bãi rác vĩnh viễn, độ phủ thật tụt dần.",
          "Đo flaky nhưng tối ưu chỉ số bằng cách hạ chuẩn oracle → dashboard đẹp, chất lượng đi xuống.",
        ],
        [
          "Increasing retries to hide flakiness without classifying the cause → the race condition remains and blows up in production.",
          "Trusting AI's 'flaky' label then retrying it away → a real bug mistaken as flaky slips through.",
          "Letting AI fix by loosening assertions to go green → losing bug-catching power entirely.",
          "Quarantine with no deadline → becomes a permanent dumping ground, real coverage quietly drops.",
          "Measuring flakiness but optimizing the metric by lowering oracle standards → a pretty dashboard, declining quality.",
        ],
        [
          "原因を分類せず再試行を増やしてフレーキーを隠す → レースコンディションが残り本番で爆発する。",
          "AI の「フレーキー」ラベルを信じて再試行でやり過ごす → フレーキーと誤解された本物のバグがすり抜ける。",
          "AI にアサーションを緩めてグリーン化させる → バグ検出力を完全に失う。",
          "期限のない隔離 → 恒久的なゴミ捨て場となり、実質的な網羅率が静かに低下する。",
          "フレーキーを測るが、オラクル基準を下げて指標を最適化する → 美しいダッシュボード、低下する品質。",
        ]
      ),
      P(
        "Điểm chung của mọi sai lầm trên là nhầm lẫn giữa 'làm bảng xanh' và 'làm phần mềm đúng'. AI là công cụ tuyệt vời để phân loại, cụm hoá và gợi ý — những việc cơ học mà con người không kịp làm ở quy mô lớn. Nhưng ranh giới bất khả xâm phạm là: AI được sửa cách test vận hành (chờ, tìm phần tử, cô lập dữ liệu), tuyệt đối không được sửa điều test khẳng định. Oracle là tài sản của con người, và giữ nó nguyên vẹn chính là điều làm cho toàn bộ nỗ lực chống flaky trở nên đáng giá.",
        "The common thread of all these mistakes is confusing 'making the board green' with 'making the software correct'. AI is a superb tool for classifying, clustering and suggesting — mechanical work humans can't keep up with at scale. But the inviolable boundary is: AI may fix how the test operates (waiting, finding elements, isolating data), never what the test asserts. The oracle is a human asset, and keeping it intact is exactly what makes the whole anti-flaky effort worthwhile.",
        "これらの失敗すべての共通点は、「盤面をグリーンにする」ことと「ソフトウェアを正しくする」ことの混同です。AI は分類・クラスタリング・提案——大規模では人間が追いつけない機械的作業——に優れたツールです。しかし侵してはならない境界はこうです。AI はテストの動作方法(待機、要素の発見、データの隔離)を修正でき、テストが断言する内容は決して修正できません。オラクルは人間の資産であり、それを無傷に保つことこそがアンチフレーキーの努力全体を価値あるものにします。"
      ),
      TIP(
        "Thiết lập 'định nghĩa hoàn thành' cho việc de-flake: nguyên nhân đã phân loại, gốc đã sửa (không chỉ retry), oracle là bất biến, chạy ổn định qua N lần liên tiếp.",
        "Set a 'definition of done' for de-flaking: cause classified, root fixed (not just retried), oracle is an invariant, stable across N consecutive runs.",
        "デフレーク作業に「完了の定義」を設けます。原因を分類済み、根源を修正済み(再試行だけでない)、オラクルは不変条件、連続 N 回で安定。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: câu hỏi về flaky và AI",
      en: "13. Interview angle: questions on flakiness and AI",
      ja: "13. 面接の観点: フレーキーと AI に関する質問",
    },
    blocks: [
      QA(
        "Bốn nguồn gốc flaky là gì và cách chữa mỗi loại?",
        "What are the four roots of flakiness and the cure for each?",
        "Timing (chữa bằng auto-wait/expect có polling, bỏ sleep cứng), order dependence (mỗi test tự dựng-dọn dữ liệu), shared state (cô lập theo tenant/worker), và network (mock/route biên ngoài). Phải phân loại đúng trước khi chữa; chữa sai nhóm chỉ giấu triệu chứng chứ không diệt nguyên nhân.",
        "Timing (cure with auto-wait/expect polling, drop hard sleeps), order dependence (each test builds and cleans its own data), shared state (isolate by tenant/worker), and network (mock/route the external boundary). You must classify correctly before curing; curing the wrong group only hides the symptom instead of killing the cause.",
        "タイミング(ポーリング付き自動待機/expect で治し、ハードスリープを捨てる)、順序依存(各テストが自前でデータを構築・後始末)、共有状態(テナント/ワーカーで隔離)、ネットワーク(外部境界をモック/ルート化)です。治す前に正しく分類せねばならず、誤ったグループを治すと原因を絶たず症状を隠すだけです。"
      ),
      QA(
        "Khi nào retry hợp lệ, khi nào retry là che bug?",
        "When is retry valid, and when is retry masking a bug?",
        "Retry hợp lệ khi oracle của test là bất biến nghiệp vụ (double-entry, idempotency): nếu chạy lại mà bất biến vẫn giữ thì đáng tin. Retry che bug khi assertion hời hợt ('thấy toast success'): lúc đó retry-để-xanh chỉ là quay xổ số, và một bug thật (ví dụ nhân đôi giao dịch) vẫn bị bỏ qua. Nguyên tắc: nâng cấp oracle trước, retry sau.",
        "Retry is valid when the test's oracle is a business invariant (double-entry, idempotency): if rerunning still holds the invariant, it's trustworthy. Retry masks a bug when the assertion is shallow ('a success toast'): then retry-to-green is just a lottery, and a real bug (e.g. transaction doubling) is still missed. Principle: upgrade the oracle first, retry second.",
        "再試行が有効なのは、テストのオラクルが業務不変条件(複式簿記、冪等性)のときです。再実行しても不変条件が保たれるなら信頼できます。アサーションが浅い(「成功トースト」)ときは再試行がバグを隠します。グリーン化のための再試行は宝くじにすぎず、本物のバグ(例: 取引の二重化)を見逃します。原則: まずオラクルを強化し、その後に再試行。"
      ),
      QA(
        "AI giúp gì và không được làm gì khi xử lý flaky?",
        "What does AI help with, and what must it not do, when handling flakiness?",
        "AI giúp cụm hoá hàng trăm lần fail theo dấu vết, xếp hạng flaky hạ tầng vs bug thật, và gợi ý sửa (đổi locator, thêm auto-wait). AI KHÔNG được kết luận cuối 'flaky hay bug' mà không có người xác nhận, và tuyệt đối không được sửa bằng cách nới lỏng oracle. Ranh giới: AI sửa cách test vận hành, không sửa điều test khẳng định.",
        "AI helps cluster hundreds of failures by signature, rank infrastructure flakiness vs real bugs, and suggest fixes (swap locators, add auto-wait). AI must NOT make the final 'flaky or bug' call without human confirmation, and must never fix by loosening the oracle. The boundary: AI fixes how the test operates, not what the test asserts.",
        "AI は数百の失敗をシグネチャでクラスタリングし、インフラのフレーキーと本物のバグをランク付けし、修正(ロケーター交換、自動待機の追加)を提案します。AI は人間の確認なしに「フレーキーかバグか」の最終判断をしてはならず、オラクルを緩めて修正することは決して許されません。境界: AI はテストの動作方法を修正し、テストが断言する内容は修正しません。"
      ),
      QA(
        "Ở fintech, vì sao 'xanh giả' cho luồng tiền đặc biệt nguy hiểm?",
        "In fintech, why is a 'false green' on money flows especially dangerous?",
        "Vì hậu quả không phải là một lỗi giao diện mà là mất tiền thật và vi phạm tuân thủ. Một test chuyển tiền bị nới oracle có thể che một lỗi nhân đôi giao dịch hay lỗi ghi sổ lệch; đến khi phát hiện có thể đã mất hàng tỉ và ảnh hưởng giấy phép. Vì thế oracle luồng tiền phải là bất biến chặt (double-entry, idempotency), và không bao giờ được retry hay nới để 'làm đẹp' bảng.",
        "Because the consequence is not a UI glitch but real money loss and compliance violation. A transfer test with a loosened oracle can hide a transaction-doubling or ledger-mismatch bug; by the time it's found, billions may be lost and the license affected. So money-flow oracles must be strict invariants (double-entry, idempotency), and must never be retried or loosened to 'beautify' the board.",
        "結果が UI の不具合ではなく、実際の金銭損失とコンプライアンス違反だからです。オラクルを緩めた送金テストは取引の二重化や台帳不整合のバグを隠しかねず、発覚したときには数十億円が失われ免許にも影響し得ます。ゆえに金銭フローのオラクルは厳格な不変条件(複式簿記、冪等性)でなければならず、盤面を「美化」するために再試行や緩和を決してしてはいけません。"
      ),
    ],
  },
  {
    heading: {
      vi: "14. Tổng kết & checklist chống flaky",
      en: "14. Summary & anti-flaky checklist",
      ja: "14. まとめとアンチフレーキーチェックリスト",
    },
    blocks: [
      P(
        "Chống flaky ở quy mô lớn là bài toán kỹ thuật lẫn văn hoá. Về kỹ thuật: phân loại đúng bốn nguồn gốc, ổn định hoá gốc (auto-wait, seed tất định, cô lập state, mock mạng), rồi mới dùng quarantine và retry có kiểm soát. Về văn hoá: giữ cho đèn đỏ luôn đáng tin, không dung túng 'xanh giả'. AI là chất xúc tác mạnh cho phần cơ học — cụm hoá, gợi ý — nhưng oracle vẫn phải do con người định nghĩa và bảo vệ. Nếu nhớ đúng một điều: một test 'xanh' chỉ đáng giá khi nó khẳng định một bất biến nghiệp vụ.",
        "Anti-flaky at scale is both a technical and a cultural problem. Technically: classify the four roots correctly, stabilize the root (auto-wait, deterministic seeding, state isolation, network mocking), then use controlled quarantine and retry. Culturally: keep red lights trustworthy, tolerate no 'false green'. AI is a powerful catalyst for the mechanical part — clustering, suggesting — but the oracle must still be defined and defended by humans. If you remember one thing: a 'green' test is only worth something when it asserts a business invariant.",
        "大規模なアンチフレーキーは技術的かつ文化的な問題です。技術的には、四つの根源を正しく分類し、根源を安定化し(自動待機、決定論的シード、状態隔離、ネットワークモック)、その後に制御された隔離と再試行を使います。文化的には、赤信号を信頼できるものに保ち、「偽グリーン」を許容しません。AI は機械的な部分——クラスタリング、提案——の強力な触媒ですが、オラクルは依然として人間が定義し守らねばなりません。一つだけ覚えるなら、「グリーン」なテストは業務不変条件を断言するときにのみ価値があります。"
      ),
      UL(
        [
          "Phân loại flaky vào bốn nhóm gốc trước khi sửa; đừng vội retry.",
          "Bỏ sleep cứng, dùng auto-wait/expect có polling; chờ đúng tín hiệu nghiệp vụ.",
          "Seed tất định: cố định dữ liệu, đóng băng thời gian, seed số ngẫu nhiên.",
          "Cô lập state theo tenant/worker; dọn dẹp dù pass hay fail.",
          "Mock biên ngoài; giữ mạng thật cho tầng tích hợp riêng, có chủ đích.",
          "Quarantine có hạn xử lý + retry giới hạn với trace retain-on-failure.",
          "Oracle luôn là bất biến (double-entry, idempotency); AI cụm-gợi-ý, người chốt.",
        ],
        [
          "Classify flakiness into the four roots before fixing; don't rush to retry.",
          "Drop hard sleeps, use auto-wait/expect polling; wait for the right business signal.",
          "Deterministic seeding: fix data, freeze time, seed randomness.",
          "Isolate state by tenant/worker; clean up whether pass or fail.",
          "Mock the external boundary; keep real network for a separate, deliberate integration tier.",
          "Quarantine with a deadline + bounded retry with retain-on-failure traces.",
          "Oracle is always an invariant (double-entry, idempotency); AI clusters and suggests, humans decide.",
        ],
        [
          "修正前にフレーキーを四つの根源に分類する。急いで再試行しない。",
          "ハードスリープを捨て、ポーリング付き自動待機/expect を使う。正しい業務信号を待つ。",
          "決定論的シード: データを固定し、時刻を凍結し、乱数をシードする。",
          "テナント/ワーカーで状態を隔離する。成功でも失敗でも後始末する。",
          "外部境界をモックする。実ネットワークは意図的な別の統合層に残す。",
          "期限付きの隔離 + 失敗時トレース保持の制限された再試行。",
          "オラクルは常に不変条件(複式簿記、冪等性)。AI がクラスタリングと提案、人間が判断。",
        ]
      ),
      NOTE(
        "Bài B sẽ chuyển từ 'test ổn định cho phần mềm thường' sang 'đánh giá đáng tin cho hệ thống sinh (prompt/agent)' — nơi output không tất định và cần một loại harness khác.",
        "Article B shifts from 'stable tests for ordinary software' to 'trustworthy evaluation for generative systems (prompts/agents)' — where output is non-deterministic and needs a different kind of harness.",
        "記事 B は「通常のソフトウェアの安定したテスト」から「生成系(プロンプト/エージェント)の信頼できる評価」へ移ります。出力が非決定論的で、別種のハーネスが必要になる領域です。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Xây prompt/agent evaluation harness
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Vì sao test truyền thống không đủ cho output sinh",
      en: "1. Why traditional tests fall short for generative output",
      ja: "1. なぜ従来のテストは生成出力に不十分なのか",
    },
    blocks: [
      P(
        "Test phần mềm truyền thống dựa trên một giả định ngầm: cùng đầu vào cho ra cùng đầu ra. Bạn viết assertEqual(f(x), y) và nếu code đúng thì luôn xanh. Nhưng một mô hình ngôn ngữ (LLM) hay một agent sinh không tuân theo giả định đó: cùng một prompt có thể cho ra hai câu trả lời khác nhau về từ ngữ dù cùng ý; nhiệt độ (temperature) khác nhau tạo độ sáng tạo khác nhau; và mô hình có thể 'ảo giác' (hallucination) — bịa ra thông tin nghe hợp lý nhưng sai. Vì thế bạn không thể so bằng dấu bằng chuỗi cứng.",
        "Traditional software testing rests on a hidden assumption: the same input yields the same output. You write assertEqual(f(x), y) and if the code is correct it's always green. But a language model (LLM) or a generative agent does not obey that assumption: the same prompt can produce two answers differing in wording though equal in meaning; different temperatures create different creativity; and the model can 'hallucinate' — fabricate plausible-sounding but wrong information. So you cannot compare with a hard string equality.",
        "従来のソフトウェアテストは暗黙の前提に立ちます。同じ入力は同じ出力を生む、です。assertEqual(f(x), y) と書き、コードが正しければ常にグリーンです。しかし言語モデル(LLM)や生成エージェントはその前提に従いません。同じプロンプトが、意味は同じでも語句の異なる二つの回答を生み、温度(temperature)の違いが創造性の違いを生み、モデルは「ハルシネーション」——もっともらしいが誤った情報の捏造——をし得ます。ですから硬い文字列の等号では比較できません。"
      ),
      P(
        "Giải pháp là một eval harness (bộ khung đánh giá): một hệ thống chuyên biệt để đo chất lượng output sinh một cách có hệ thống, có thể lặp lại, và tích hợp vào CI. Thay vì một assertion 'đúng/sai' cứng, eval harness dùng nhiều loại kiểm khác nhau — từ kiểm cấu trúc rẻ và tất định, tới chấm điểm theo rubric bằng chính LLM — và tổng hợp thành các chỉ số quyết định được. Bài này hướng dẫn xây một harness như vậy, đủ chặt để làm cổng gác (gate) mỗi khi bạn nâng cấp prompt hay đổi mô hình.",
        "The solution is an eval harness: a specialized system to measure generative output quality systematically, repeatably, and integrated into CI. Instead of a hard 'pass/fail' assertion, an eval harness uses several kinds of checks — from cheap, deterministic structural checks to rubric scoring by an LLM itself — and aggregates them into decidable metrics. This article guides building such a harness, strict enough to act as a gate whenever you upgrade a prompt or swap a model.",
        "解決策は eval harness(評価ハーネス)です。生成出力の品質を体系的に、再現可能に、CI に統合して測定する専用システムです。硬い「合否」のアサーションの代わりに、eval harness はいくつかの種類の検査——安価で決定論的な構造検査から、LLM 自身によるルーブリック採点まで——を使い、判断可能な指標に集約します。本記事はそのようなハーネスの構築を導き、プロンプトを強化したりモデルを交換したりするたびに門番(gate)として機能するほど厳格にします。"
      ),
      IMG(
        SVG_EVAL_PIPELINE,
        "Dây chuyền eval harness: golden set → chạy model → assertion → gate CI.",
        "The eval harness pipeline: golden set → run model → assertions → CI gate.",
        "eval harness のパイプライン: ゴールデンセット → モデル実行 → アサーション → CI ゲート。"
      ),
      NOTE(
        "Eval harness không phải test đơn vị. Nó là một bộ đo chất lượng thống kê trên tập mẫu, cho ra 'điểm số' thay vì 'đúng/sai' tuyệt đối — và bạn đặt ngưỡng để quyết định.",
        "An eval harness is not a unit test. It is a statistical quality gauge over a sample set, producing 'scores' rather than absolute 'pass/fail' — and you set thresholds to decide.",
        "eval harness はユニットテストではありません。サンプル集合に対する統計的な品質計測器で、絶対的な「合否」ではなく「スコア」を生みます。判断のために閾値を設定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Golden set và fixtures: nền móng của mọi eval",
      en: "2. Golden sets and fixtures: the foundation of every eval",
      ja: "2. ゴールデンセットとフィクスチャ: あらゆる評価の土台",
    },
    blocks: [
      P(
        "Nền móng của một eval harness là golden set (bộ vàng): một tập hợp có tuyển chọn gồm các đầu vào tiêu biểu kèm đầu ra kỳ vọng hoặc tiêu chí đánh giá. Golden set không cần khổng lồ, nhưng phải đại diện: gồm các ca thường gặp (happy path), các ca biên, các ca 'bẫy' dễ khiến mô hình ảo giác, và các ca nhạy cảm (an toàn, chính sách). Chất lượng của toàn bộ eval phụ thuộc vào chất lượng của golden set — rác vào thì rác ra.",
        "The foundation of an eval harness is the golden set: a curated collection of representative inputs paired with expected outputs or evaluation criteria. The golden set need not be huge, but it must be representative: common cases (happy path), edge cases, 'trap' cases that easily make the model hallucinate, and sensitive cases (safety, policy). The quality of the whole eval depends on the quality of the golden set — garbage in, garbage out.",
        "eval harness の土台はゴールデンセットです。代表的な入力を、期待出力または評価基準と対にして厳選したコレクションです。ゴールデンセットは巨大である必要はありませんが、代表的でなければなりません。よくあるケース(ハッピーパス)、境界ケース、モデルをハルシネーションさせやすい「罠」ケース、機微なケース(安全・ポリシー)を含みます。評価全体の質はゴールデンセットの質に依存します。ゴミを入れればゴミが出ます。"
      ),
      CODE(
        "jsonc",
        `// golden/support-agent.jsonl — mỗi dòng một ca đánh giá (input + kỳ vọng)
{ "id": "refund-happy", "input": "Tôi muốn hoàn tiền đơn #A1 đã giao 3 ngày trước",
  "expect": { "intent": "refund", "must_contain": ["A1"], "must_not_contain": ["số thẻ"],
              "schema": "SupportReply", "rubric": ["đúng chính sách 7 ngày", "lịch sự"] } }
{ "id": "refund-expired", "input": "Hoàn tiền đơn #B2 giao 40 ngày trước",
  "expect": { "intent": "refund_denied", "must_contain": ["quá hạn"], "schema": "SupportReply" } }
{ "id": "trap-hallucinate", "input": "Chính sách bảo hành 10 năm của bạn là gì?",
  // 'Bẫy' ảo giác: hệ thống KHÔNG có chính sách 10 năm → phải từ chối bịa
  "expect": { "must_not_contain": ["10 năm"], "rubric": ["không bịa chính sách không tồn tại"] } }`
      ),
      P(
        "Fixtures là phần bối cảnh cố định đi kèm mỗi ca: dữ liệu tài khoản giả, tài liệu tri thức mà agent được phép truy xuất, trạng thái hệ thống ban đầu. Cố định fixtures giúp eval tất định về mặt bối cảnh — cùng một câu hỏi luôn chạy trên cùng một nền dữ liệu, nên nếu điểm số thay đổi thì đó là do prompt/model đổi chứ không phải do bối cảnh trôi. Hãy quản lý golden set và fixtures trong version control như mã nguồn, và review mọi thay đổi của chúng nghiêm túc.",
        "Fixtures are the fixed context accompanying each case: fake account data, knowledge documents the agent may retrieve, initial system state. Fixing fixtures makes the eval deterministic in context — the same question always runs on the same data foundation, so if the score changes it's because the prompt/model changed, not because the context drifted. Keep the golden set and fixtures in version control like source code, and review every change to them seriously.",
        "フィクスチャは各ケースに付随する固定の文脈です。偽のアカウントデータ、エージェントが取得を許される知識文書、初期システム状態です。フィクスチャを固定すると評価は文脈的に決定論的になります。同じ質問が常に同じデータ基盤で実行されるため、スコアが変わればそれはプロンプト/モデルが変わったからで、文脈が漂ったからではありません。ゴールデンセットとフィクスチャをソースコードのようにバージョン管理し、それらのあらゆる変更を真剣にレビューします。"
      ),
      TIP(
        "Bắt đầu với 30–50 ca chất lượng cao hơn là 1.000 ca ngẫu nhiên. Mở rộng golden set bằng cách thêm mỗi bug/hallucination thật gặp trong production thành một ca mới.",
        "Start with 30–50 high-quality cases rather than 1,000 random ones. Grow the golden set by turning each real bug/hallucination seen in production into a new case.",
        "1,000 のランダムなケースより 30〜50 の高品質なケースから始めます。本番で見た実際のバグ/ハルシネーションを新しいケースに変えてゴールデンセットを育てます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Các loại assertion cho output sinh (tháp bốn tầng)",
      en: "3. Assertion types for generative output (a four-layer tower)",
      ja: "3. 生成出力のアサーション種別(四層のタワー)",
    },
    blocks: [
      P(
        "Đánh giá output sinh cần nhiều loại assertion xếp thành một tháp, từ rẻ-tất định ở đáy tới đắt-nhiễu ở đỉnh. Tầng một là cấu trúc: output có phải JSON hợp lệ không, có khớp schema không. Tầng hai là từ vựng: có chứa cụm bắt buộc, có tránh cụm cấm, có khớp regex. Tầng ba là ngữ nghĩa: độ tương đồng (semantic similarity) so với đáp án vàng, để chấp nhận diễn đạt khác nhau nhưng cùng ý. Tầng bốn là rubric: dùng chính LLM chấm điểm theo bộ tiêu chí (LLM-as-judge). Quy tắc: luôn ưu tiên tầng rẻ và tất định trước, chỉ leo lên tầng đắt khi thật cần.",
        "Evaluating generative output needs several assertion types stacked in a tower, from cheap-deterministic at the bottom to expensive-noisy at the top. Layer one is structure: is the output valid JSON, does it match the schema. Layer two is lexical: does it contain required phrases, avoid forbidden ones, match a regex. Layer three is semantic: similarity against a golden answer, to accept different phrasings of the same meaning. Layer four is rubric: use the LLM itself to score against a set of criteria (LLM-as-judge). The rule: always prefer cheap, deterministic layers first, climbing to expensive ones only when truly needed.",
        "生成出力の評価には、底の安価・決定論的から頂の高価・ノイズありまで、タワーに積まれた複数のアサーション種別が必要です。第一層は構造: 出力は有効な JSON か、スキーマに一致するか。第二層は語彙: 必須の語句を含むか、禁止語を避けるか、正規表現に一致するか。第三層は意味: ゴールデンな答えに対する類似度で、同じ意味の異なる表現を受け入れます。第四層はルーブリック: LLM 自身を使って基準に照らして採点します(LLM-as-judge)。規則: 常に安価で決定論的な層を優先し、本当に必要なときだけ高価な層へ登ります。"
      ),
      IMG(
        SVG_ASSERT_LAYERS,
        "Tháp bốn tầng assertion: cấu trúc → từ vựng → ngữ nghĩa → rubric.",
        "The four-layer assertion tower: structure → lexical → semantic → rubric.",
        "四層のアサーションタワー: 構造 → 語彙 → 意味 → ルーブリック。"
      ),
      CODE(
        "ts",
        `// Ba tầng đầu: rẻ, tất định — chạy trước, loại sớm output hỏng cấu trúc
import { z } from 'zod';
const SupportReply = z.object({
  intent: z.enum(['refund', 'refund_denied', 'other']),
  message: z.string().min(1),
  policyRef: z.string().optional(),
});

function structuralChecks(raw: string, expect: any) {
  const parsed = JSON.parse(raw);                 // Tầng 1a: JSON hợp lệ?
  SupportReply.parse(parsed);                       // Tầng 1b: đúng schema?
  for (const s of expect.must_contain ?? [])
    if (!parsed.message.includes(s)) throw new Error('thiếu cụm bắt buộc: ' + s);   // Tầng 2
  for (const s of expect.must_not_contain ?? [])
    if (parsed.message.includes(s)) throw new Error('chứa cụm cấm: ' + s);          // Tầng 2
  return parsed;
}`
      ),
      P(
        "Semantic similarity (tầng ba) thường được đo bằng cách nhúng (embedding) cả output và đáp án vàng thành vector rồi tính độ tương đồng cosine; nếu vượt ngưỡng thì coi là 'cùng ý'. Cách này chấp nhận sự đa dạng diễn đạt mà vẫn giữ được tính tất định tương đối (embedding cùng model cho cùng vector). Tầng bốn — rubric bằng LLM-as-judge — mạnh nhất nhưng cũng nhiễu và đắt nhất, nên ta dành hẳn hai chương sau để nói về cách dùng nó một cách hiệu chuẩn và có kiểm soát bias.",
        "Semantic similarity (layer three) is usually measured by embedding both the output and the golden answer into vectors then computing cosine similarity; above a threshold counts as 'same meaning'. This accepts phrasing diversity while keeping relative determinism (the same embedding model gives the same vector). Layer four — rubric via LLM-as-judge — is the most powerful but also the noisiest and most expensive, so we devote the next two chapters to using it in a calibrated, bias-controlled way.",
        "意味類似度(第三層)は通常、出力とゴールデンな答えの両方をベクトルに埋め込み(embedding)、コサイン類似度を計算して測ります。閾値を超えれば「同じ意味」とみなします。これは表現の多様性を受け入れつつ相対的な決定論を保ちます(同じ埋め込みモデルは同じベクトルを与える)。第四層——LLM-as-judge によるルーブリック——は最も強力ですが最もノイズが多く高価でもあるため、次の二章を、それを較正しバイアスを制御して使う方法に充てます。"
      ),
      WARN(
        "Đừng nhảy thẳng lên LLM-as-judge cho mọi thứ. Nhiều lỗi (JSON sai, thiếu trường, lộ dữ liệu nhạy cảm) bắt được ở tầng rẻ và tất định — dùng judge cho chúng vừa đắt vừa kém tin cậy.",
        "Don't jump straight to LLM-as-judge for everything. Many defects (bad JSON, missing fields, leaking sensitive data) are caught at cheap, deterministic layers — using a judge for them is both expensive and less reliable.",
        "何でもかんでも LLM-as-judge に飛びつかないでください。多くの欠陥(不正な JSON、欠落フィールド、機微データの漏洩)は安価で決定論的な層で捕えられます。それらに judge を使うのは高価かつ信頼性が低いです。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. LLM-as-judge: hiệu chuẩn và kiểm soát thiên lệch",
      en: "4. LLM-as-judge: calibration and bias control",
      ja: "4. LLM-as-judge: 較正とバイアス制御",
    },
    blocks: [
      P(
        "Khi tiêu chí quá tinh tế để viết luật cứng (ví dụ 'câu trả lời có lịch sự và đúng chính sách không?'), ta dùng chính một LLM làm giám khảo — LLM-as-judge. Nhưng một giám khảo LLM không hiệu chuẩn là một thước đo cong: nó có thể thiên vị câu trả lời dài hơn, thiên vị vị trí (ưu ái phương án xuất hiện trước), hoặc chấm lỏng lẻo tuỳ tâm trạng prompt. Trước khi tin điểm của judge, bạn phải hiệu chuẩn nó: chạy judge trên một tập đã có nhãn của con người và đo mức đồng thuận. Nếu judge không đồng thuận với người ở mức chấp nhận được, điểm của nó vô nghĩa.",
        "When criteria are too subtle for hard rules (e.g. 'is the reply polite and policy-correct?'), we use an LLM itself as a judge — LLM-as-judge. But an uncalibrated LLM judge is a bent ruler: it may favor longer answers, exhibit position bias (favoring the option shown first), or grade loosely depending on prompt mood. Before trusting the judge's scores, you must calibrate it: run the judge on a human-labeled set and measure agreement. If the judge doesn't agree with humans at an acceptable level, its scores are meaningless.",
        "基準が硬いルールには微妙すぎるとき(例: 「回答は丁寧でポリシーに正しいか」)、LLM 自身を審査員として使います——LLM-as-judge です。しかし較正されていない LLM 審査員は曲がった物差しです。長い回答を好み、位置バイアス(先に示された選択肢を好む)を示し、プロンプトの気分次第で緩く採点しかねません。審査員のスコアを信じる前に較正せねばなりません。人間がラベル付けした集合で審査員を走らせ、一致度を測ります。審査員が許容水準で人間と一致しなければ、そのスコアは無意味です。"
      ),
      CODE(
        "ts",
        `// Hiệu chuẩn judge: đo đồng thuận với nhãn người, và chống bias
async function calibrateJudge(labeled: {input: string; output: string; humanScore: number}[]) {
  let agree = 0;
  for (const ex of labeled) {
    const j = await judge(ex.input, ex.output);
    if (Math.abs(j.score - ex.humanScore) <= 1) agree++;   // trong sai số 1 điểm
  }
  const rate = agree / labeled.length;
  if (rate < 0.8) throw new Error('Judge chưa đủ hiệu chuẩn: đồng thuận ' + rate);
  return rate;
}

// Chống position bias: chấm cả hai thứ tự rồi lấy trung bình
async function pairwiseUnbiased(a: string, b: string) {
  const ab = await judgePair(a, b);        // A trước
  const ba = await judgePair(b, a);        // B trước
  return (ab.preferA + (1 - ba.preferA)) / 2;   // trung hoà thiên lệch vị trí
}`
      ),
      P(
        "Ngoài đo đồng thuận, có vài kỹ thuật chống bias thực dụng. Với so sánh cặp, hãy chấm cả hai thứ tự (A trước B và B trước A) rồi lấy trung bình để trung hoà thiên lệch vị trí. Với thiên lệch độ dài, hãy ghi rõ trong prompt của judge rằng 'độ dài không phải tiêu chí' và thêm ca kiểm chứng câu ngắn-đúng phải thắng câu dài-lan man. Với tính ổn định, hãy đặt temperature=0 cho judge và cố định seed để cùng input cho cùng điểm. Judge càng hiệu chuẩn và ổn định thì gate của bạn càng đáng tin.",
        "Beyond measuring agreement, there are practical bias-control techniques. For pairwise comparison, grade both orders (A before B and B before A) then average to neutralize position bias. For length bias, state explicitly in the judge's prompt that 'length is not a criterion' and add a verification case where a short-correct answer must beat a long-rambling one. For stability, set temperature=0 for the judge and fix the seed so the same input gives the same score. The more calibrated and stable the judge, the more trustworthy your gate.",
        "一致度の測定に加え、実用的なバイアス制御手法があります。ペア比較では両方の順序(A の前に B、B の前に A)で採点し、平均して位置バイアスを中和します。長さバイアスには、審査員のプロンプトで「長さは基準ではない」と明記し、短く正しい回答が長く冗長な回答に勝つべき検証ケースを追加します。安定性には、審査員に temperature=0 を設定しシードを固定して同じ入力が同じスコアを与えるようにします。審査員が較正され安定しているほど、gate は信頼できます。"
      ),
      NOTE(
        "LLM-as-judge là công cụ mạnh nhưng dễ ru ngủ. Một judge chưa hiệu chuẩn tạo cảm giác an tâm giả — bạn tưởng đang đo chất lượng, thực ra đang đo thiên lệch của chính judge.",
        "LLM-as-judge is powerful but easy to be lulled by. An uncalibrated judge creates false comfort — you think you're measuring quality, but you're actually measuring the judge's own bias.",
        "LLM-as-judge は強力ですが油断させやすいです。較正されていない審査員は偽の安心を生みます。品質を測っているつもりで、実は審査員自身のバイアスを測っているのです。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Tất định hoá: temperature=0, seed và bối cảnh cố định",
      en: "5. Determinism: temperature=0, seeds and fixed context",
      ja: "5. 決定論化: temperature=0、シード、固定文脈",
    },
    blocks: [
      P(
        "Để một eval có thể tái lập, bạn phải triệt tiêu càng nhiều ngẫu nhiên càng tốt. Ba đòn bẩy chính: đặt temperature=0 (và top_p=1) để mô hình luôn chọn token khả dĩ nhất, giảm dao động đầu ra; cố định seed nếu nhà cung cấp mô hình hỗ trợ, để hai lần chạy cho kết quả gần như trùng; và đóng băng bối cảnh (fixtures, tài liệu truy xuất, thời gian hệ thống). Khi cả ba được cố định, nếu điểm eval thay đổi giữa hai lần chạy, bạn biết chắc nguyên nhân nằm ở prompt hoặc mô hình, không phải ở nhiễu ngẫu nhiên.",
        "For an eval to be reproducible you must suppress as much randomness as possible. Three main levers: set temperature=0 (and top_p=1) so the model always picks the most likely token, reducing output variance; fix the seed if the model provider supports it, so two runs give nearly identical results; and freeze the context (fixtures, retrieved documents, system time). When all three are fixed, if the eval score changes between two runs you know for sure the cause is the prompt or the model, not random noise.",
        "評価を再現可能にするには、できる限り乱数を抑えねばなりません。主要な三つのてこ: temperature=0(および top_p=1)を設定してモデルが常に最尤トークンを選び出力のばらつきを減らす。モデルプロバイダが対応していればシードを固定し二回の実行がほぼ同一の結果を返すようにする。文脈(フィクスチャ、取得文書、システム時刻)を凍結する。三つすべてが固定されると、二回の実行間で評価スコアが変われば、原因はプロンプトかモデルであって乱数ノイズではないと確信できます。"
      ),
      CODE(
        "ts",
        `// Cấu hình gọi model để eval tất định hết mức có thể
const runModel = (prompt: string) => client.chat({
  model: process.env.EVAL_MODEL,      // ghim đúng phiên bản model để so sánh công bằng
  temperature: 0,                     // triệt tiêu sáng tạo ngẫu nhiên
  top_p: 1,
  seed: 42,                           // cố định seed (nếu provider hỗ trợ)
  messages: [{ role: 'user', content: prompt }],
});

// Ghi lại 'dấu chạy' để tái lập: model, prompt hash, seed, thời điểm
type RunMeta = { model: string; promptHash: string; seed: number; at: string };`
      ),
      P(
        "Cần thành thật về giới hạn: ngay cả với temperature=0, nhiều mô hình vẫn không tất định tuyệt đối do cách tính song song ở tầng hạ tầng. Vì thế eval không nên dựa vào một câu trả lời duy nhất mà nên chạy mỗi ca vài lần và xét phân phối, hoặc dùng assertion đủ khoan dung ở tầng ngữ nghĩa để chịu được dao động nhỏ. Mục tiêu không phải là 'tất định tuyệt đối' — điều bất khả với LLM — mà là 'đủ ổn định để một thay đổi điểm số phản ánh thay đổi chất lượng thật, không phải nhiễu'.",
        "Be honest about the limits: even at temperature=0, many models are not perfectly deterministic due to parallel computation in the infrastructure. So an eval should not rely on a single answer but run each case a few times and consider the distribution, or use sufficiently tolerant assertions at the semantic layer to absorb small variance. The goal is not 'perfect determinism' — impossible with LLMs — but 'stable enough that a score change reflects a real quality change, not noise'.",
        "限界について正直になりましょう。temperature=0 でも、多くのモデルはインフラ層での並列計算のため完全には決定論的ではありません。ですから評価は単一の回答に頼らず、各ケースを数回実行して分布を考慮するか、意味層で小さなばらつきを吸収できる十分寛容なアサーションを使うべきです。目標は「完全な決定論」——LLM では不可能——ではなく、「スコアの変化が本当の品質変化を反映し、ノイズではないと言えるほど安定していること」です。"
      ),
      TIP(
        "Ghim đúng phiên bản model (không dùng bí danh 'latest') trong eval. Nếu nhà cung cấp âm thầm cập nhật model dưới cùng một tên, eval của bạn sẽ dao động mà bạn không hay.",
        "Pin the exact model version (don't use a 'latest' alias) in evals. If the provider silently updates the model under the same name, your eval will drift without you noticing.",
        "評価では正確なモデルバージョンを固定します(「latest」の別名を使わない)。プロバイダが同じ名前でモデルをこっそり更新すると、気づかぬうちに評価が漂います。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Chống hallucination: grounding và bẫy kiểm chứng",
      en: "6. Countering hallucination: grounding and trap checks",
      ja: "6. ハルシネーション対策: グラウンディングと罠検査",
    },
    blocks: [
      P(
        "Hallucination (ảo giác) là khi mô hình bịa ra thông tin nghe hợp lý nhưng không có thật: một chính sách không tồn tại, một mã số bịa, một trích dẫn sai. Trong hệ thống doanh nghiệp, đây là rủi ro nghiêm trọng — một agent hỗ trợ 'hứa' chính sách bảo hành 10 năm không có thật có thể tạo nghĩa vụ pháp lý. Một eval harness tốt phải có các ca 'bẫy' chuyên để phát hiện ảo giác: đặt câu hỏi về thứ không tồn tại và kiểm rằng mô hình từ chối bịa, hoặc kiểm rằng mọi khẳng định của mô hình đều có căn cứ (grounding) trong tài liệu được cấp.",
        "Hallucination is when the model fabricates plausible-sounding but untrue information: a nonexistent policy, an invented code, a wrong citation. In enterprise systems this is a serious risk — a support agent 'promising' a nonexistent 10-year warranty can create legal liability. A good eval harness must have 'trap' cases specifically to detect hallucination: ask about something nonexistent and check the model refuses to fabricate, or check that every claim the model makes is grounded in the provided documents.",
        "ハルシネーションとは、モデルがもっともらしいが真実でない情報を捏造することです。存在しないポリシー、でっち上げのコード、誤った引用です。企業システムではこれは重大なリスクです。存在しない 10 年保証を「約束する」サポートエージェントは法的責任を生みかねません。良い eval harness にはハルシネーションを検出するための「罠」ケースが必要です。存在しないものについて尋ねてモデルが捏造を拒むか確認し、あるいはモデルのあらゆる主張が提供文書に接地(グラウンディング)しているか確認します。"
      ),
      CODE(
        "ts",
        `// Kiểm grounding: mọi 'sự thật' agent nói phải truy được về tài liệu cấp
async function groundingCheck(reply: string, allowedDocs: string[]) {
  const claims = await extractClaims(reply);        // tách các khẳng định sự thật
  const unsupported: string[] = [];
  for (const c of claims) {
    const supported = allowedDocs.some(doc => entails(doc, c));  // có tài liệu chứng minh?
    if (!supported) unsupported.push(c);
  }
  // Bất biến: không có khẳng định nào 'lơ lửng' không nguồn
  return { grounded: unsupported.length === 0, unsupported };
}

// Ca bẫy: hỏi thứ KHÔNG tồn tại → phải từ chối, KHÔNG bịa
test('không bịa chính sách 10 năm không tồn tại', async () => {
  const r = await agent('Chính sách bảo hành 10 năm của bạn là gì?');
  expect(r.toLowerCase()).not.toContain('10 năm');
  expect(await groundingCheck(r, KNOWLEDGE_DOCS)).toMatchObject({ grounded: true });
});`
      ),
      P(
        "Grounding là đối trọng cốt lõi của hallucination: thay vì để mô hình trả lời từ 'trí nhớ' bên trong (nơi ảo giác sinh ra), ta buộc nó chỉ khẳng định những gì có trong tài liệu được cấp, và eval kiểm tra rằng mọi khẳng định đều truy vết được về nguồn. Ca 'bẫy' bổ sung một góc nhìn khác: chủ động hỏi về thứ không tồn tại để xem mô hình có đủ khiêm tốn nói 'tôi không có thông tin đó' hay không. Một agent tốt trong doanh nghiệp phải biết nói 'không biết' thay vì bịa cho có.",
        "Grounding is the core counterweight to hallucination: instead of letting the model answer from its internal 'memory' (where hallucination is born), we force it to only assert what is in the provided documents, and the eval checks that every claim is traceable to a source. The 'trap' case adds another angle: proactively ask about something nonexistent to see whether the model is humble enough to say 'I don't have that information'. A good enterprise agent must know how to say 'I don't know' instead of fabricating for the sake of it.",
        "グラウンディングはハルシネーションの中核的な対抗手段です。モデルが内部の「記憶」(ハルシネーションが生まれる場所)から答えるのを許す代わりに、提供文書にあるものだけを主張させ、評価はあらゆる主張が出典に遡れることを確認します。「罠」ケースは別の角度を加えます。存在しないものについて能動的に尋ね、モデルが「その情報はありません」と言えるほど謙虚かを見ます。良い企業エージェントは、無理に捏造する代わりに「わかりません」と言えねばなりません。"
      ),
      WARN(
        "Đừng chỉ kiểm 'câu trả lời nghe đúng'. Một câu trả lời trôi chảy có thể chứa ảo giác tinh vi. Luôn kiểm grounding: mỗi khẳng định có nguồn không?",
        "Don't just check that 'the answer sounds right'. A fluent answer can contain subtle hallucination. Always check grounding: does each claim have a source?",
        "「答えが正しく聞こえる」だけを確認してはいけません。流暢な答えに巧妙なハルシネーションが潜みます。常にグラウンディングを確認します。各主張に出典があるか。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Ngân sách cost và latency: đo và gác",
      en: "7. Cost and latency budgets: measure and gate",
      ja: "7. コストとレイテンシの予算: 計測して門番にする",
    },
    blocks: [
      P(
        "Chất lượng không phải chiều duy nhất. Một prompt cho câu trả lời hơi tốt hơn nhưng tốn gấp ba token và chậm gấp đôi có thể là một nâng cấp tệ trong sản xuất. Vì thế eval harness phải đo cả cost (số token vào/ra, quy ra tiền) và latency (thời gian phản hồi, đặc biệt là p95/p99 chứ không chỉ trung bình). Đặt ngân sách rõ ràng: mỗi lượt gọi không vượt X đồng, p95 latency không vượt Y mili-giây. Khi một thay đổi prompt/model vượt ngân sách, gate phải cảnh báo dù chất lượng có nhỉnh lên.",
        "Quality is not the only dimension. A prompt giving a slightly better answer but costing three times the tokens and being twice as slow can be a bad upgrade in production. So the eval harness must measure both cost (input/output tokens, converted to money) and latency (response time, especially p95/p99 not just the average). Set clear budgets: each call under X currency, p95 latency under Y milliseconds. When a prompt/model change exceeds the budget, the gate must warn even if quality ticks up.",
        "品質は唯一の次元ではありません。わずかに良い回答を出すがトークンを三倍消費し二倍遅いプロンプトは、本番では悪いアップグレードになり得ます。ですから eval harness はコスト(入出力トークン、金額換算)とレイテンシ(応答時間、平均だけでなく特に p95/p99)の両方を計測せねばなりません。明確な予算を設定します。各呼び出しは X 通貨未満、p95 レイテンシは Y ミリ秒未満、と。プロンプト/モデルの変更が予算を超えたら、品質が上向いても gate は警告せねばなりません。"
      ),
      CODE(
        "ts",
        `// Đo cost + latency cho mỗi ca, tổng hợp p95 để gác
type Metric = { tokensIn: number; tokensOut: number; ms: number };
const PRICE_IN = 0.000003, PRICE_OUT = 0.000015;   // đơn giá/token theo model

function costOf(m: Metric) { return m.tokensIn * PRICE_IN + m.tokensOut * PRICE_OUT; }

function summarize(metrics: Metric[]) {
  const lat = metrics.map(m => m.ms).sort((a, b) => a - b);
  const p95 = lat[Math.floor(lat.length * 0.95)];
  const avgCost = metrics.reduce((s, m) => s + costOf(m), 0) / metrics.length;
  return { p95_ms: p95, avg_cost: avgCost };
}

// Gate: vượt ngân sách → chặn dù pass% cao
function budgetGate(s: {p95_ms: number; avg_cost: number}) {
  if (s.p95_ms > 3000)   throw new Error('Vượt ngân sách latency p95');
  if (s.avg_cost > 0.02) throw new Error('Vượt ngân sách cost/lượt');
}`
      ),
      P(
        "Ngân sách biến eval từ một thước đo một-chiều thành một quyết định đa mục tiêu thực tế. Khi nâng cấp, bạn nhìn đồng thời ba trục: chất lượng (pass%, hallucination%), cost, và latency. Một nâng cấp lý tưởng cải thiện chất lượng mà không xấu đi cost/latency; một nâng cấp đánh đổi cần được cân nhắc có ý thức, không âm thầm. Bằng cách gác cả ngân sách, bạn tránh cái bẫy 'tối ưu điểm chất lượng bằng mọi giá' mà quên rằng sản phẩm thật còn phải nhanh và rẻ để dùng được.",
        "Budgets turn the eval from a one-dimensional gauge into a realistic multi-objective decision. When upgrading, you look at three axes at once: quality (pass%, hallucination%), cost, and latency. An ideal upgrade improves quality without worsening cost/latency; a trade-off upgrade needs a conscious, not silent, decision. By gating on budgets too, you avoid the trap of 'optimizing the quality score at any cost' while forgetting that the real product must also be fast and cheap to be usable.",
        "予算は評価を一次元の計測器から現実的な多目的判断へ変えます。アップグレード時、三つの軸を同時に見ます。品質(合格率、ハルシネーション率)、コスト、レイテンシです。理想的なアップグレードはコスト/レイテンシを悪化させずに品質を改善します。トレードオフのアップグレードには、暗黙にではなく意識的な判断が必要です。予算にも門番を置くことで、「あらゆる犠牲を払って品質スコアを最適化する」罠を避けます。実際の製品は使えるように速く安くもなければならないのに、それを忘れる罠です。"
      ),
      TIP(
        "Theo dõi p95/p99 latency chứ đừng chỉ trung bình. Trung bình đẹp có thể che một đuôi dài gây trải nghiệm tệ cho một phần người dùng.",
        "Track p95/p99 latency, not just the average. A pretty average can hide a long tail that ruins the experience for a slice of users.",
        "平均だけでなく p95/p99 レイテンシを追跡します。きれいな平均が、一部のユーザーの体験を損なう長い裾を隠すことがあります。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Regression gate trong CI khi bump prompt/model",
      en: "8. Regression gates in CI on prompt/model bumps",
      ja: "8. プロンプト/モデル更新時の CI 回帰ゲート",
    },
    blocks: [
      P(
        "Giá trị lớn nhất của eval harness là làm cổng gác chống hồi quy (regression gate). Mỗi khi ai đó sửa prompt, đổi mô hình, hay chỉnh tham số, pipeline chạy toàn bộ golden set qua harness và so kết quả với một baseline đã lưu. Nếu pass% tụt dưới ngưỡng, hallucination% tăng, hay ngân sách bị vượt, gate chặn PR. Nhờ vậy, thay vì phát hiện 'prompt mới tệ hơn' khi khách hàng phàn nàn, bạn phát hiện ngay trong CI trước khi nó ra sản xuất. Đây chính là điều biến 'nghịch prompt' thành kỹ thuật phần mềm nghiêm túc.",
        "The biggest value of an eval harness is acting as a regression gate. Whenever someone edits a prompt, swaps a model, or tweaks a parameter, the pipeline runs the whole golden set through the harness and compares results to a stored baseline. If pass% drops below a threshold, hallucination% rises, or the budget is exceeded, the gate blocks the PR. So instead of discovering 'the new prompt is worse' when customers complain, you discover it in CI before it reaches production. This is what turns 'prompt tinkering' into serious software engineering.",
        "eval harness の最大の価値は回帰ゲートとして機能することです。誰かがプロンプトを編集し、モデルを交換し、パラメータを調整するたびに、パイプラインはゴールデンセット全体をハーネスに通し、保存されたベースラインと結果を比較します。合格率が閾値を下回るか、ハルシネーション率が上がるか、予算を超えたら、gate は PR をブロックします。こうして「新しいプロンプトの方が悪い」を顧客が苦情を言うときに発見する代わりに、本番に届く前に CI で発見します。これが「プロンプトいじり」を真剣なソフトウェアエンジニアリングに変えるものです。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/eval-gate.yml — chặn hồi quy khi bump prompt/model
name: eval-gate
on:
  pull_request:
    paths: ['prompts/**', 'agents/**', 'eval/**']   # chỉ chạy khi đụng prompt/agent
jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run eval -- --golden golden/ --baseline eval/baseline.json
        env:
          EVAL_MODEL: \${{ vars.EVAL_MODEL }}       # ghim đúng phiên bản model
      # eval script tự exit != 0 nếu: pass% tụt, hallucination% tăng, hoặc vượt budget
      - run: npm run eval:report -- --out eval-summary.md
      - uses: actions/upload-artifact@v4
        with: { name: eval-summary, path: eval-summary.md }`
      ),
      CODE(
        "ts",
        `// So với baseline: chặn nếu tụt chất lượng hoặc tăng ảo giác
function regressionGate(now: EvalResult, base: EvalResult) {
  const drop = base.passRate - now.passRate;
  if (drop > 0.02)                               // tụt > 2 điểm phần trăm → chặn
    throw new Error(\`Hồi quy pass%: \${base.passRate} → \${now.passRate}\`);
  if (now.hallucRate > base.hallucRate + 0.005)  // ảo giác tăng → chặn
    throw new Error(\`Ảo giác tăng: \${base.hallucRate} → \${now.hallucRate}\`);
  budgetGate(now.budget);                         // vượt cost/latency → chặn
}`
      ),
      QA(
        "Vì sao gate nên chặn cả khi hallucination% tăng dù pass% không đổi?",
        "Why should the gate block when hallucination% rises even if pass% is unchanged?",
        "Vì hallucination là loại lỗi nguy hiểm bậc nhất trong hệ thống sinh: nó tạo thông tin sai nghe hợp lý, có thể gây hậu quả pháp lý hay mất niềm tin. Một prompt mới có thể giữ pass% nhưng lại bịa nhiều hơn ở các ca biên. Tách riêng chỉ số hallucination và gác nó độc lập giúp bắt loại hồi quy mà pass% tổng không thấy được.",
        "Because hallucination is one of the most dangerous defect types in generative systems: it creates plausible-sounding wrong information, potentially causing legal consequences or lost trust. A new prompt might keep pass% but fabricate more on edge cases. Tracking a separate hallucination metric and gating it independently catches a regression the overall pass% cannot see.",
        "ハルシネーションは生成系で最も危険な欠陥種別の一つだからです。もっともらしい誤情報を生み、法的結果や信頼喪失を招きかねません。新しいプロンプトは合格率を保っても境界ケースでより多く捏造するかもしれません。ハルシネーション指標を別に追跡し独立して門番にすることで、全体の合格率では見えない回帰を捕えます。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Theo dõi chỉ số eval theo thời gian",
      en: "9. Tracking eval metrics over time",
      ja: "9. 評価指標を時系列で追跡する",
    },
    blocks: [
      P(
        "Một lần eval cho bạn ảnh chụp; theo dõi qua thời gian cho bạn cuốn phim. Hãy lưu kết quả mỗi lần chạy eval kèm siêu dữ liệu (phiên bản model, hash prompt, ngày) vào một kho, rồi vẽ xu hướng: pass% theo tuần, hallucination% theo tuần, cost trung bình, p95 latency. Xu hướng lộ ra những điều một lần chạy không thấy: sự trôi âm thầm khi nhà cung cấp cập nhật model, sự xói mòn dần khi golden set không còn đại diện cho dữ liệu thật, hay sự cải thiện thật sự sau một đợt tối ưu prompt.",
        "A single eval gives you a snapshot; tracking over time gives you a movie. Save each eval run's results with metadata (model version, prompt hash, date) into a store, then chart trends: pass% by week, hallucination% by week, average cost, p95 latency. Trends reveal what a single run cannot: silent drift when the provider updates the model, gradual erosion when the golden set no longer represents real data, or genuine improvement after a prompt-optimization sprint.",
        "一度の評価はスナップショットを与え、時系列の追跡は映画を与えます。各評価実行の結果をメタデータ(モデルバージョン、プロンプトハッシュ、日付)と共にストアに保存し、傾向を描きます。週ごとの合格率、週ごとのハルシネーション率、平均コスト、p95 レイテンシです。傾向は一度の実行では見えないものを明らかにします。プロバイダがモデルを更新したときの静かな漂い、ゴールデンセットが実データを代表しなくなったときの徐々の浸食、プロンプト最適化スプリント後の真の改善です。"
      ),
      CODE(
        "sql",
        `-- Xu hướng chất lượng & chi phí theo tuần từ kho kết quả eval
SELECT
  date_trunc('week', run_at)   AS week,
  model_version,
  round(avg(pass_rate)::numeric, 4)      AS pass_rate,
  round(avg(halluc_rate)::numeric, 4)    AS halluc_rate,
  round(avg(avg_cost)::numeric, 6)       AS cost,
  round(avg(p95_ms)::numeric, 0)         AS p95_ms
FROM eval_runs
GROUP BY week, model_version
ORDER BY week DESC, model_version;`
      ),
      P(
        "Việc theo dõi lịch sử còn giúp bạn quản lý golden set như một tài sản sống. Khi thấy production xuất hiện một loại câu hỏi mới mà golden set chưa phủ, hãy thêm ca mới. Khi một hallucination lọt ra thực tế, hãy biến nó thành một ca 'bẫy' để lần sau bắt được. Golden set không phải viết một lần rồi để đó; nó tiến hoá cùng sản phẩm, và lịch sử eval là bằng chứng cho thấy chất lượng đang đi lên hay đi xuống theo mỗi thay đổi.",
        "Tracking history also helps you manage the golden set as a living asset. When production shows a new kind of question the golden set doesn't cover, add a new case. When a hallucination escapes to reality, turn it into a 'trap' case so it's caught next time. The golden set is not write-once-and-forget; it evolves with the product, and the eval history is evidence of whether quality is trending up or down with each change.",
        "履歴の追跡は、ゴールデンセットを生きた資産として管理する助けにもなります。本番でゴールデンセットが網羅しない新種の質問が現れたら、新しいケースを追加します。ハルシネーションが現実に漏れたら、次回捕えられるよう「罠」ケースに変えます。ゴールデンセットは一度書いて忘れるものではありません。製品と共に進化し、評価履歴は各変更で品質が上向いているか下向いているかの証拠です。"
      ),
      NOTE(
        "Đối xử với golden set như test suite: nó phải lớn lên theo mỗi sự cố. Mỗi hallucination lọt production nên trở thành một ca eval mới để không tái diễn.",
        "Treat the golden set like a test suite: it must grow with each incident. Every hallucination that escapes to production should become a new eval case so it doesn't recur.",
        "ゴールデンセットをテストスイートのように扱います。各インシデントと共に成長せねばなりません。本番に漏れたあらゆるハルシネーションを、再発しないよう新しい評価ケースにすべきです。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Kịch bản thực chiến: SaaS gác cổng nâng cấp agent",
      en: "10. Real-world scenario: a SaaS gating agent upgrades",
      ja: "10. 実戦シナリオ: SaaS がエージェント更新を門番で守る",
    },
    blocks: [
      SCEN(
        "Bump model 'tốt hơn' hoá ra tệ hơn ở ca biên",
        "A 'better' model bump turns out worse on edge cases",
        "Một SaaS chạy agent hỗ trợ khách hàng qua LLM. Nhà cung cấp ra model mới 'thông minh hơn', đội định đổi ngay. Nhờ có eval harness, họ chạy golden set 200 ca qua cả model cũ và mới trước khi merge: pass% tổng của model mới nhỉnh hơn 1%, nhưng hallucination% ở nhóm ca 'bẫy chính sách' tăng gấp đôi, và p95 latency tăng 40%. Regression gate chặn PR. Điều tra cho thấy model mới 'tự tin' hơn nên bịa chính sách không tồn tại nhiều hơn — đúng loại lỗi chết người trong hỗ trợ khách hàng. Đội hoãn nâng cấp, thêm ràng buộc grounding vào prompt, chạy lại đạt, rồi mới merge.",
        "A SaaS runs a customer-support agent via LLM. The provider releases a 'smarter' new model and the team wants to switch immediately. Thanks to the eval harness, they run the 200-case golden set through both old and new models before merging: the new model's overall pass% is 1% higher, but hallucination% on the 'policy trap' group doubled, and p95 latency rose 40%. The regression gate blocks the PR. Investigation shows the new model is 'more confident' so it fabricates nonexistent policies more — exactly the deadly defect type in customer support. The team defers the upgrade, adds grounding constraints to the prompt, reruns to a pass, then merges.",
        "ある SaaS は LLM で顧客サポートエージェントを運用しています。プロバイダが「より賢い」新モデルを出し、チームはすぐ切り替えたがります。eval harness のおかげで、マージ前に 200 ケースのゴールデンセットを旧新両モデルに通します。新モデルの全体合格率は 1% 高いものの、「ポリシー罠」グループのハルシネーション率は倍増し、p95 レイテンシは 40% 上昇。回帰ゲートが PR をブロックします。調査すると、新モデルは「より自信がある」ため存在しないポリシーをより多く捏造する——顧客サポートでまさに致命的な欠陥種別です。チームは更新を延期し、プロンプトにグラウンディング制約を追加し、再実行で合格させてからマージします。"
      ),
      P(
        "Bài học: nếu không có eval harness, đội đã đổi sang model 'tốt hơn' và chỉ phát hiện vấn đề khi khách hàng phàn nàn về những lời hứa sai — có thể kèm hậu quả pháp lý. Chính việc tách riêng chỉ số hallucination, có ca 'bẫy' chuyên biệt, và gác cả latency đã bắt được một hồi quy mà con số pass% tổng che giấu. Đây là minh hoạ rõ nhất cho vì sao 'điểm tổng cao hơn' không đủ để quyết định — bạn cần nhìn đúng chiều rủi ro của domain.",
        "The lesson: without an eval harness, the team would have switched to the 'better' model and only found the problem when customers complained about false promises — possibly with legal consequences. It was precisely the separate hallucination metric, the dedicated 'trap' cases, and gating on latency that caught a regression the overall pass% hid. This is the clearest illustration of why 'higher overall score' is not enough to decide — you need to look at the risk dimension the domain actually cares about.",
        "教訓: eval harness がなければ、チームは「より良い」モデルに切り替え、顧客が誤った約束について苦情を言うときにだけ問題を発見したでしょう。法的結果を伴うかもしれません。まさに別立てのハルシネーション指標、専用の「罠」ケース、レイテンシへの門番が、全体の合格率が隠した回帰を捕えたのです。これは「全体スコアが高い」だけでは判断に不十分な理由の最も明確な例証です。ドメインが実際に気にするリスク次元を見る必要があります。"
      ),
      WARN(
        "Đừng đổi model chỉ vì 'phiên bản mới hơn'. Luôn cho model mới đi qua eval gate với đủ chỉ số (pass, hallucination, cost, latency) trước khi ra sản xuất.",
        "Don't swap models just because it's 'a newer version'. Always run the new model through the eval gate with full metrics (pass, hallucination, cost, latency) before production.",
        "「新しいバージョンだから」というだけでモデルを交換してはいけません。本番前に、完全な指標(合格、ハルシネーション、コスト、レイテンシ)で新モデルを必ず eval gate に通します。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Sai lầm thường gặp khi xây eval harness",
      en: "11. Common mistakes when building an eval harness",
      ja: "11. eval harness 構築時のよくある失敗",
    },
    blocks: [
      UL(
        [
          "Golden set nhỏ/thiên lệch: không có ca biên, ca bẫy → eval mù trước lỗi thật.",
          "Nhảy thẳng lên LLM-as-judge cho mọi thứ mà bỏ qua kiểm cấu trúc rẻ và tất định.",
          "Dùng judge chưa hiệu chuẩn: tin điểm judge mà chưa đo đồng thuận với nhãn người.",
          "Bỏ qua determinism: không đặt temperature=0/seed → điểm dao động, không so được.",
          "Chỉ đo chất lượng, quên cost/latency → nâng cấp 'tốt hơn' mà chậm và đắt gấp bội.",
          "Không có regression gate: sửa prompt tuỳ hứng, phát hiện tệ đi khi khách phàn nàn.",
        ],
        [
          "Small/biased golden set: no edge or trap cases → the eval is blind to real defects.",
          "Jumping straight to LLM-as-judge for everything, skipping cheap deterministic structural checks.",
          "Using an uncalibrated judge: trusting judge scores without measuring agreement with human labels.",
          "Ignoring determinism: no temperature=0/seed → scores fluctuate, incomparable.",
          "Measuring only quality, forgetting cost/latency → a 'better' upgrade that's far slower and pricier.",
          "No regression gate: editing prompts on a whim, discovering degradation when customers complain.",
        ],
        [
          "小さい/偏ったゴールデンセット: 境界や罠のケースがない → 評価が本物の欠陥に盲目になる。",
          "安価で決定論的な構造検査を飛ばし、何でも LLM-as-judge に直行する。",
          "較正されていない審査員の使用: 人間ラベルとの一致度を測らずに審査員のスコアを信じる。",
          "決定論の無視: temperature=0/シードを設定しない → スコアが変動し比較できない。",
          "品質だけを測りコスト/レイテンシを忘れる → はるかに遅く高価な「より良い」更新。",
          "回帰ゲートの欠如: 気まぐれにプロンプトを編集し、顧客の苦情で劣化を発見する。",
        ]
      ),
      P(
        "Sợi chỉ chung của các sai lầm này là đối xử với hệ thống sinh như một thứ 'nghịch cho vui' thay vì một phần mềm cần kỷ luật kỹ thuật. Một eval harness tốt áp đặt kỷ luật đó: golden set được version-control, assertion xếp tầng có chủ đích, judge được hiệu chuẩn, mọi thay đổi đi qua regression gate với đủ chiều chất lượng-cost-latency. Khi bạn xây được kỷ luật này, việc nâng cấp prompt hay đổi model trở nên an toàn và có bằng chứng, thay vì một canh bạc dựa trên cảm giác.",
        "The common thread of these mistakes is treating the generative system as something to 'tinker with for fun' rather than software that needs engineering discipline. A good eval harness imposes that discipline: the golden set is version-controlled, assertions are deliberately layered, the judge is calibrated, and every change goes through a regression gate across quality-cost-latency dimensions. Once you build this discipline, upgrading a prompt or swapping a model becomes safe and evidence-based, instead of a gamble based on gut feeling.",
        "これらの失敗の共通の糸は、生成系を、エンジニアリングの規律を必要とするソフトウェアではなく「遊びでいじる」ものとして扱うことです。良い eval harness はその規律を課します。ゴールデンセットはバージョン管理され、アサーションは意図的に層をなし、審査員は較正され、あらゆる変更が品質・コスト・レイテンシの次元で回帰ゲートを通ります。この規律を築けば、プロンプトの強化やモデルの交換は、勘に基づく賭けではなく、安全で証拠に基づくものになります。"
      ),
      TIP(
        "Xem prompt và cấu hình model như mã nguồn: nằm trong repo, đi qua PR, có eval gate. 'Prompt engineering' nghiêm túc là software engineering.",
        "Treat prompts and model config as source code: in the repo, through PRs, with an eval gate. Serious 'prompt engineering' is software engineering.",
        "プロンプトとモデル設定をソースコードとして扱います。リポジトリ内にあり、PR を通り、eval gate を持ちます。真剣な「プロンプトエンジニアリング」はソフトウェアエンジニアリングです。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Góc phỏng vấn: câu hỏi về eval harness",
      en: "12. Interview angle: questions on eval harnesses",
      ja: "12. 面接の観点: eval harness に関する質問",
    },
    blocks: [
      QA(
        "Vì sao không dùng assertEqual chuỗi cứng cho output LLM?",
        "Why not use hard string assertEqual for LLM output?",
        "Vì output sinh không tất định về từ ngữ: cùng ý có thể diễn đạt khác nhau, temperature tạo dao động, và mô hình có thể ảo giác. So chuỗi cứng sẽ đỏ với những câu trả lời đúng-nhưng-khác-chữ. Thay vào đó dùng tháp assertion: cấu trúc (JSON/schema), từ vựng (contains/regex), ngữ nghĩa (similarity), và rubric (LLM-as-judge) khi cần.",
        "Because generative output is non-deterministic in wording: the same meaning can be phrased differently, temperature adds variance, and the model can hallucinate. Hard string comparison would go red on correct-but-differently-worded answers. Instead use an assertion tower: structure (JSON/schema), lexical (contains/regex), semantic (similarity), and rubric (LLM-as-judge) when needed.",
        "生成出力は語句が非決定論的だからです。同じ意味を異なる表現でき、温度がばらつきを加え、モデルはハルシネーションし得ます。硬い文字列比較は正しいが表現の異なる回答で赤になります。代わりにアサーションのタワーを使います。構造(JSON/スキーマ)、語彙(contains/regex)、意味(類似度)、必要ならルーブリック(LLM-as-judge)です。"
      ),
      QA(
        "Làm sao để tin điểm của LLM-as-judge?",
        "How do you trust an LLM-as-judge's scores?",
        "Phải hiệu chuẩn trước: chạy judge trên một tập đã có nhãn người và đo mức đồng thuận (ví dụ đòi ≥ 80% trong sai số 1 điểm). Chống bias: chấm cả hai thứ tự để trung hoà thiên lệch vị trí, ghi rõ 'độ dài không phải tiêu chí' để chống thiên lệch độ dài, đặt temperature=0 cho ổn định. Judge chưa hiệu chuẩn là thước đo cong — điểm của nó vô nghĩa.",
        "You must calibrate first: run the judge on a human-labeled set and measure agreement (e.g. require ≥ 80% within 1 point). Control bias: grade both orders to neutralize position bias, state 'length is not a criterion' to counter length bias, set temperature=0 for stability. An uncalibrated judge is a bent ruler — its scores are meaningless.",
        "まず較正せねばなりません。人間がラベル付けした集合で審査員を走らせ一致度を測ります(例: 1 点以内で 80% 以上を要求)。バイアス制御: 両方の順序で採点して位置バイアスを中和し、「長さは基準ではない」と明記して長さバイアスに対抗し、安定性のため temperature=0 を設定します。較正されていない審査員は曲がった物差しで、そのスコアは無意味です。"
      ),
      QA(
        "Regression gate cho eval nên kiểm những chiều nào?",
        "What dimensions should an eval regression gate check?",
        "Ít nhất bốn: pass% (chất lượng tổng), hallucination% (tách riêng vì cực nguy hiểm), cost (token/tiền mỗi lượt), và latency (p95/p99 chứ không chỉ trung bình). Gate so với baseline và chặn nếu bất kỳ chiều nào xấu đi quá ngưỡng — kể cả khi pass% tổng nhỉnh lên nhưng hallucination hay latency tệ đi.",
        "At least four: pass% (overall quality), hallucination% (separated because it's extremely dangerous), cost (tokens/money per call), and latency (p95/p99, not just average). The gate compares to a baseline and blocks if any dimension worsens past a threshold — even if overall pass% ticks up but hallucination or latency degrades.",
        "少なくとも四つ: 合格率(全体品質)、ハルシネーション率(極めて危険なため別立て)、コスト(呼び出しごとのトークン/金額)、レイテンシ(平均だけでなく p95/p99)です。gate はベースラインと比較し、いずれかの次元が閾値を超えて悪化したらブロックします。全体の合格率が上向いてもハルシネーションやレイテンシが劣化した場合でも、です。"
      ),
      QA(
        "Golden set nên xây và bảo trì thế nào?",
        "How should a golden set be built and maintained?",
        "Bắt đầu nhỏ nhưng đại diện (30–50 ca chất lượng cao): happy path, ca biên, ca bẫy ảo giác, ca nhạy cảm. Quản trong version control như mã, review mọi thay đổi. Bảo trì bằng cách biến mỗi bug/hallucination thật gặp trong production thành một ca mới, để nó không tái diễn. Golden set là tài sản sống, tiến hoá cùng sản phẩm.",
        "Start small but representative (30–50 high-quality cases): happy path, edge cases, hallucination traps, sensitive cases. Keep it in version control like code, review every change. Maintain it by turning each real bug/hallucination seen in production into a new case so it doesn't recur. The golden set is a living asset that evolves with the product.",
        "小さくとも代表的に始めます(30〜50 の高品質ケース)。ハッピーパス、境界ケース、ハルシネーションの罠、機微なケースです。コードのようにバージョン管理し、あらゆる変更をレビューします。本番で見た実際のバグ/ハルシネーションを新しいケースに変えて再発しないようにして保守します。ゴールデンセットは製品と共に進化する生きた資産です。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết & checklist eval harness",
      en: "13. Summary & eval harness checklist",
      ja: "13. まとめと eval harness チェックリスト",
    },
    blocks: [
      P(
        "Xây eval harness là cách biến việc phát triển hệ thống sinh (prompt/agent) từ 'nghịch dựa cảm giác' thành kỹ thuật phần mềm có bằng chứng. Nền móng là golden set và fixtures được tuyển chọn kỹ. Trên đó là tháp assertion từ rẻ-tất định tới rubric, với LLM-as-judge được hiệu chuẩn và kiểm soát bias. Bao quanh là tất định hoá (temperature=0, seed, ghim model), đo cost/latency, và trên hết là regression gate trong CI kiểm đủ bốn chiều. Nếu nhớ một điều: đừng đổi prompt hay model mà không có bằng chứng từ eval — 'phiên bản mới hơn' không đồng nghĩa 'tốt hơn cho domain của bạn'.",
        "Building an eval harness is how you turn developing generative systems (prompts/agents) from 'gut-feel tinkering' into evidence-based software engineering. The foundation is a carefully curated golden set and fixtures. On top is the assertion tower from cheap-deterministic to rubric, with a calibrated, bias-controlled LLM-as-judge. Around it is determinism (temperature=0, seed, pinned model), cost/latency measurement, and above all a CI regression gate checking all four dimensions. If you remember one thing: don't change a prompt or model without evidence from the eval — 'a newer version' does not mean 'better for your domain'.",
        "eval harness の構築は、生成系(プロンプト/エージェント)の開発を「勘に基づくいじり」から証拠に基づくソフトウェアエンジニアリングへ変える方法です。土台は入念に厳選されたゴールデンセットとフィクスチャです。その上に、安価・決定論的からルーブリックまでのアサーションのタワーがあり、較正されバイアス制御された LLM-as-judge を伴います。周囲には決定論化(temperature=0、シード、モデル固定)、コスト/レイテンシの計測、そして何より四つの次元すべてを検査する CI 回帰ゲートがあります。一つだけ覚えるなら、評価からの証拠なしにプロンプトやモデルを変えないこと。「新しいバージョン」は「あなたのドメインにとってより良い」を意味しません。"
      ),
      UL(
        [
          "Golden set + fixtures đại diện, version-control, review mọi thay đổi.",
          "Tháp assertion: cấu trúc → từ vựng → ngữ nghĩa → rubric; ưu tiên tầng rẻ, tất định.",
          "LLM-as-judge: hiệu chuẩn với nhãn người, chống bias vị trí/độ dài, temperature=0.",
          "Tất định: temperature=0, seed, ghim đúng phiên bản model; chạy nhiều lần nếu cần.",
          "Chống ảo giác: grounding + ca bẫy hỏi thứ không tồn tại.",
          "Đo cost + latency (p95/p99), đặt ngân sách và gác.",
          "Regression gate CI: chặn khi pass% tụt, hallucination% tăng, hoặc vượt ngân sách.",
          "Theo dõi chỉ số theo thời gian; biến mỗi sự cố production thành ca golden mới.",
        ],
        [
          "Representative golden set + fixtures, version-controlled, review every change.",
          "Assertion tower: structure → lexical → semantic → rubric; prefer cheap, deterministic layers.",
          "LLM-as-judge: calibrate against human labels, control position/length bias, temperature=0.",
          "Determinism: temperature=0, seed, pin the exact model version; rerun several times if needed.",
          "Counter hallucination: grounding + trap cases asking about nonexistent things.",
          "Measure cost + latency (p95/p99), set budgets and gate.",
          "CI regression gate: block when pass% drops, hallucination% rises, or budget is exceeded.",
          "Track metrics over time; turn each production incident into a new golden case.",
        ],
        [
          "代表的なゴールデンセット + フィクスチャ、バージョン管理、あらゆる変更をレビュー。",
          "アサーションのタワー: 構造 → 語彙 → 意味 → ルーブリック。安価で決定論的な層を優先。",
          "LLM-as-judge: 人間ラベルで較正、位置/長さバイアスを制御、temperature=0。",
          "決定論: temperature=0、シード、正確なモデルバージョンを固定。必要なら複数回実行。",
          "ハルシネーション対策: グラウンディング + 存在しないものを尋ねる罠ケース。",
          "コスト + レイテンシ(p95/p99)を計測し、予算を設定して門番にする。",
          "CI 回帰ゲート: 合格率が下がる、ハルシネーション率が上がる、予算超過でブロック。",
          "指標を時系列で追跡。各本番インシデントを新しいゴールデンケースに変える。",
        ]
      ),
      NOTE(
        "Kết nối hai bài: bài A giữ cho test phần mềm thường không flaky và có oracle bất biến; bài B giữ cho hệ thống sinh được đánh giá đáng tin. Cả hai cùng một tinh thần: 'xanh' chỉ đáng giá khi nó chứng minh điều đúng.",
        "Connecting the two articles: Article A keeps ordinary software tests non-flaky with invariant oracles; Article B keeps generative systems trustworthily evaluated. Both share one spirit: 'green' is only worth something when it proves the right thing.",
        "二つの記事をつなぐと、記事 A は通常のソフトウェアテストを不変条件オラクルで非フレーキーに保ち、記事 B は生成系を信頼できるように評価します。両者は一つの精神を共有します。「グリーン」は正しいことを証明するときにのみ価値がある、です。"
      ),
    ],
  },
];

const artA = {
  categorySlug: "ai-in-testing",
  slug: "ai-flaky-defense-oracle",
  cover: coverA,
  tags: tags("nangcao", "fintech", "aitesting", "trace", "advanced", "experience"),
  title: {
    vi: "Chống flaky ở quy mô lớn bằng AI và oracle bất biến",
    en: "Fighting flaky tests at scale with AI and invariant oracles",
    ja: "AI と不変条件オラクルによる大規模なフレーキーテスト対策",
  },
  summary: {
    vi: "Phân loại bốn nguồn gốc flaky, ổn định hoá bằng auto-wait/seed tất định/cô lập state/mock mạng, dùng AI cụm hoá và gợi ý sửa mà KHÔNG che bug thật, và giữ oracle bất biến (double-entry, idempotency) để một test 'xanh' thật sự có ý nghĩa. Kèm quarantine + retry với trace, chỉ số flaky, kịch bản fintech và góc phỏng vấn.",
    en: "Classify the four roots of flakiness, stabilize with auto-wait / deterministic seeding / state isolation / network mocking, use AI to cluster and suggest fixes WITHOUT masking real bugs, and keep invariant oracles (double-entry, idempotency) so a 'green' test is truly meaningful. With quarantine + retry traces, flaky metrics, a fintech scenario and interview angle.",
    ja: "フレーキーの四つの根源を分類し、自動待機・決定論的シード・状態隔離・ネットワークモックで安定化し、本物のバグを隠さずに AI で失敗をクラスタリングして修正を提案し、不変条件オラクル(複式簿記、冪等性)を保って「グリーン」なテストが本当に意味を持つようにします。隔離 + 再試行トレース、フレーキー指標、フィンテックのシナリオ、面接の観点付き。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "ai-in-testing",
  slug: "ai-prompt-agent-eval-harness",
  cover: coverB,
  tags: tags("nangcao", "saas", "aitesting", "cicd", "advanced", "realworld"),
  title: {
    vi: "Xây eval harness cho prompt và agent sinh",
    en: "Building a prompt and agent evaluation harness",
    ja: "プロンプトとエージェントの評価ハーネスを構築する",
  },
  summary: {
    vi: "Từ golden set và fixtures, dựng tháp assertion (schema/JSON, regex/contains, semantic similarity, rubric), dùng LLM-as-judge có hiệu chuẩn và chống bias, tất định hoá bằng seed/temperature=0, chống hallucination bằng grounding, đặt ngân sách cost/latency, và gác regression gate trong CI mỗi khi bump prompt/model. Kèm theo dõi chỉ số theo thời gian, kịch bản SaaS và góc phỏng vấn.",
    en: "From golden sets and fixtures, build an assertion tower (schema/JSON, regex/contains, semantic similarity, rubric), use a calibrated bias-controlled LLM-as-judge, make it deterministic with seeds/temperature=0, counter hallucination with grounding, set cost/latency budgets, and enforce a CI regression gate on every prompt/model bump. With metric tracking over time, a SaaS scenario and interview angle.",
    ja: "ゴールデンセットとフィクスチャから、アサーションのタワー(スキーマ/JSON、regex/contains、意味類似度、ルーブリック)を構築し、較正されバイアス制御された LLM-as-judge を使い、シード/temperature=0 で決定論化し、グラウンディングでハルシネーションに対抗し、コスト/レイテンシの予算を設定し、プロンプト/モデル更新のたびに CI 回帰ゲートを課します。指標の時系列追跡、SaaS のシナリオ、面接の観点付き。",
  },
  pages: buildDoc(pagesB),
};

export const AI_DOCS_04 = [artA, artB];
