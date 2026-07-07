// ============================================================================
// doc_pwlatest_05.mjs — 2 bài NÂNG CAO (advanced) cho "Playwright & công cụ mới nhất".
//   A) Chống flaky ở quy mô lớn với Playwright   (slug: pw-flaky-at-scale)
//   B) Parallel & Sharding: tối ưu runtime CI     (slug: pw-parallel-sharding-ci)
// Trilingual VI/EN/JA (tiếng Nhật thật), block khớp ArticleViewer CyberSoft Tester.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl05a", domain: "saas", kind: "nangcao", label: "ANTI-FLAKY · SCALE" });
const coverB = makeThumb({ id: "pwl05b", domain: "saas", kind: "nangcao", label: "PARALLEL · SHARD" });

// ---------------------------------------------------------------------------
// SVG helper — khung nhỏ tái dùng cho các sơ đồ trong bài.
// ---------------------------------------------------------------------------
const frame = (inner, w = 640, h = 300) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial" font-size="13">
<rect width="${w}" height="${h}" rx="12" fill="#0b1220"/>${inner}</svg>`;

// ===========================================================================
// ARTICLE A — Chống flaky ở quy mô lớn
// ===========================================================================

const imgA1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">5 NHÓM NGUYÊN NHÂN FLAKY / ROOT CAUSES</text>
<g>
  <rect x="24" y="56" width="180" height="46" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="36" y="76" fill="#e0f2fe" font-weight="700">Race / thời điểm</text><text x="36" y="93" fill="#93c5fd" font-size="11">DOM chưa sẵn sàng</text>
  <rect x="230" y="56" width="180" height="46" rx="8" fill="#134e4a" stroke="#34d399"/><text x="242" y="76" fill="#d1fae5" font-weight="700">Animation</text><text x="242" y="93" fill="#6ee7b7" font-size="11">transition đang chạy</text>
  <rect x="436" y="56" width="180" height="46" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="448" y="76" fill="#f3e8ff" font-weight="700">Network</text><text x="448" y="93" fill="#d8b4fe" font-size="11">độ trễ, retry API</text>
  <rect x="120" y="124" width="180" height="46" rx="8" fill="#422006" stroke="#f59e0b"/><text x="132" y="144" fill="#fef3c7" font-weight="700">Thời gian / TZ</text><text x="132" y="161" fill="#fcd34d" font-size="11">clock, timezone</text>
  <rect x="336" y="124" width="180" height="46" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="348" y="144" fill="#ffedd5" font-weight="700">Dữ liệu test</text><text x="348" y="161" fill="#fdba74" font-size="11">chung, không cô lập</text>
</g>
<rect x="24" y="196" width="592" height="80" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="40" y="222" fill="#f8fafc" font-weight="700">Oracle ổn định = web-first auto-waiting + cô lập dữ liệu</text>
<text x="40" y="246" fill="#94a3b8" font-size="12">expect(locator).toBeVisible() → chờ đúng điều kiện, KHÔNG sleep cứng</text>
<text x="40" y="266" fill="#94a3b8" font-size="12">mỗi test tự tạo/tự dọn state → chạy song song vẫn tất định</text>`),
  "Bản đồ 5 nhóm nguyên nhân flaky và hai trụ chống flaky.",
  "Map of the five flakiness root-cause groups and two anti-flaky pillars.",
  "フレーキーの5大原因グループと、2本柱の対策を示す図です。"
);

const imgA2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">VÒNG ĐỜI QUARANTINE / QUARANTINE LIFECYCLE</text>
<g font-size="12">
  <rect x="24" y="60" width="150" height="52" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="40" y="84" fill="#e0f2fe" font-weight="700">Phát hiện flake</text><text x="40" y="101" fill="#93c5fd">flake rate &gt; 1%</text>
  <rect x="210" y="60" width="150" height="52" rx="8" fill="#422006" stroke="#f59e0b"/><text x="226" y="84" fill="#fef3c7" font-weight="700">Cách ly</text><text x="226" y="101" fill="#fcd34d">tag @quarantine</text>
  <rect x="396" y="60" width="150" height="52" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="412" y="84" fill="#f3e8ff" font-weight="700">Điều tra</text><text x="412" y="101" fill="#d8b4fe">trace + owner</text>
  <path d="M174 86 h34 M360 86 h34" stroke="#64748b" stroke-width="2" marker-end="url(#arrA)"/>
  <rect x="120" y="150" width="150" height="52" rx="8" fill="#134e4a" stroke="#34d399"/><text x="136" y="174" fill="#d1fae5" font-weight="700">Sửa gốc</text><text x="136" y="191" fill="#6ee7b7">bỏ tag, gate xanh</text>
  <rect x="330" y="150" width="150" height="52" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="346" y="174" fill="#ffedd5" font-weight="700">SLA 7 ngày</text><text x="346" y="191" fill="#fdba74">quá hạn → escalate</text>
  <path d="M470 112 C470 140 300 150 270 150" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrA)"/>
</g>
<defs><marker id="arrA" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>
<text x="24" y="248" fill="#94a3b8" font-size="12">Quarantine KHÔNG phải nơi giấu rác — có SLA, owner và hạn sửa gốc rõ ràng.</text>`),
  "Vòng đời quarantine có SLA và người chịu trách nhiệm rõ ràng.",
  "Quarantine lifecycle with an explicit SLA and a named owner.",
  "SLAと担当者を明確にした隔離ライフサイクルです。"
);

const pagesA = [
  {
    heading: {
      vi: "1. Flaky là gì và vì sao nó giết niềm tin ở quy mô lớn",
      en: "1. What flakiness is and why it destroys trust at scale",
      ja: "1. フレーキーとは何か、なぜ大規模で信頼を壊すのか",
    },
    blocks: [
      P(
        "Một test flaky là test cho kết quả khác nhau trên cùng một commit mà không có thay đổi nào ở code sản phẩm: lúc xanh, lúc đỏ. Ở một dự án nhỏ mười test, một ca flaky chỉ gây khó chịu. Nhưng ở quy mô SaaS với năm nghìn test chạy trên hàng trăm pull request mỗi ngày, dù chỉ 1% flake rate cũng có nghĩa là gần như mọi lần chạy đều đỏ vì một lý do vô nghĩa. Đội ngũ mất niềm tin vào bộ test, bắt đầu bấm rerun theo phản xạ và cuối cùng bỏ qua cả những lần đỏ thật.",
        "A flaky test is one that yields different results on the same commit with no product code change: green now, red later. In a tiny ten-test project, one flaky case is merely annoying. But at SaaS scale — five thousand tests running across hundreds of pull requests a day — even a 1% flake rate means almost every run is red for a meaningless reason. The team loses faith in the suite, starts reflexively hitting rerun, and eventually ignores genuine failures too.",
        "フレーキーテストとは、製品コードを変更していない同一コミットで結果が変わるテストです。今は緑、後で赤になります。テスト10件の小さなプロジェクトなら1件のフレーキーは煩わしいだけです。しかし5,000件のテストが1日数百のプルリクエストで走るSaaS規模では、わずか1%のフレーキー率でも、ほぼ毎回無意味な理由で赤になります。チームはテストへの信頼を失い、反射的に再実行を押し、やがて本物の失敗まで無視します。"
      ),
      P(
        "Bài viết này tiếp cận flaky như một bài toán vận hành ở quy mô tổ chức chứ không phải mẹo vặt lẻ tẻ. Chúng ta sẽ đi qua năm nhóm nguyên nhân gốc, cơ chế web-first auto-waiting của Playwright giúp diệt phần lớn chúng, chiến lược retry và trace đúng cách, cô lập test, quy trình quarantine có SLA, cách đo flake rate như một chỉ số sức khoẻ, và cuối cùng là chính sách cấp tổ chức để giữ tỉ lệ flaky luôn dưới ngưỡng. Mọi ví dụ đều xoay quanh nguyên tắc oracle: khẳng định bất biến nghiệp vụ, không khẳng định 'màn hình hiện ra'.",
        "This article treats flakiness as an organizational operations problem, not a bag of one-off tricks. We walk through the five root-cause groups, Playwright's web-first auto-waiting that kills most of them, the correct retry-and-trace strategy, test isolation, a quarantine process with an SLA, how to measure flake rate as a health metric, and finally an org-level policy to keep flakiness below threshold. Every example follows the oracle principle: assert business invariants, not 'the screen appeared'.",
        "本記事はフレーキーを、その場しのぎの小技ではなく組織レベルの運用課題として扱います。5大原因グループ、その大半を潰すPlaywrightのウェブファースト自動待機、正しいリトライとトレース戦略、テスト分離、SLA付き隔離プロセス、健全性指標としてのフレーキー率の測定、そして閾値以下に保つ組織方針までを順に見ます。すべての例はオラクル原則に従い、「画面が出た」ではなく業務不変条件を検証します。"
      ),
      NOTE(
        "Định nghĩa dùng trong toàn bài: flake rate = số lần chạy đổi kết quả (pass↔fail) giữa các lần rerun / tổng số lần chạy, đo trên cùng commit.",
        "Definition used throughout: flake rate = number of runs that flip result (pass↔fail) across reruns / total runs, measured on the same commit.",
        "本記事で用いる定義: フレーキー率 = 再実行間で結果が反転（pass↔fail）した回数 ÷ 総実行回数（同一コミットで測定）。"
      ),
      imgA1,
    ],
  },
  {
    heading: {
      vi: "2. Năm nhóm nguyên nhân gốc của flaky",
      en: "2. The five root-cause groups of flakiness",
      ja: "2. フレーキーの5大原因グループ",
    },
    blocks: [
      P(
        "Trước khi chữa, phải phân loại. Gần như mọi ca flaky rơi vào năm nhóm. Nhóm race: test kiểm tra một phần tử trước khi ứng dụng render xong, hoặc bấm nút trước khi handler được gắn. Nhóm animation: một transition CSS làm phần tử dịch chuyển đúng lúc click, khiến toạ độ trượt. Nhóm network: API chậm bất thường, retry ngầm, hoặc thứ tự response không xác định. Nhóm thời gian: test phụ thuộc đồng hồ thật, timezone, hoặc mốc nửa đêm. Nhóm dữ liệu: nhiều test dùng chung một tài khoản, một bản ghi, và giẫm chân nhau khi chạy song song.",
        "Before curing, classify. Almost every flaky case falls into five groups. Races: the test checks an element before the app finishes rendering, or clicks a button before its handler is attached. Animation: a CSS transition moves the element exactly at click time, so coordinates slip. Network: an API is unusually slow, retries silently, or returns responses in non-deterministic order. Time: the test depends on the wall clock, timezone, or a midnight boundary. Data: many tests share one account or record and step on each other when run in parallel.",
        "治す前に分類します。ほぼすべてのフレーキーは5グループに入ります。レース: アプリの描画完了前に要素を確認する、またはハンドラ登録前にボタンを押す。アニメーション: クリックの瞬間にCSSトランジションで要素が動き座標がずれる。ネットワーク: APIが異常に遅い、暗黙に再試行、応答順が非決定的。時間: 実時計・タイムゾーン・深夜境界に依存。データ: 複数テストが同一アカウントやレコードを共有し、並列時に衝突する。"
      ),
      H(
        "Bảng quyết định: triệu chứng → nhóm → cách chữa",
        "Decision table: symptom → group → cure",
        "デシジョンテーブル: 症状 → グループ → 対策"
      ),
      UL(
        [
          "Đỏ ngẫu nhiên ở 'element not found' → race → dùng locator + auto-wait, bỏ sleep.",
          "Click trượt hoặc 'element is not stable' → animation → chờ animation xong hoặc tắt animation.",
          "Timeout rải rác ở bước gọi API → network → mock hoặc route, tăng timeout đúng chỗ.",
          "Đỏ chỉ vào buổi sáng hoặc cuối tháng → thời gian → freeze clock, cố định timezone.",
          "Đỏ khi tăng workers, xanh khi chạy một mình → dữ liệu → cô lập state từng test.",
        ],
        [
          "Random red on 'element not found' → race → use locators + auto-wait, drop sleeps.",
          "Missed click or 'element is not stable' → animation → wait for animation end or disable it.",
          "Scattered timeouts at API steps → network → mock or route, raise timeout only where needed.",
          "Red only in the morning or month-end → time → freeze the clock, pin the timezone.",
          "Red when workers increase, green solo → data → isolate per-test state.",
        ],
        [
          "「element not found」でランダムに赤 → レース → ロケーター＋自動待機、sleepを削除。",
          "クリック外し・「element is not stable」 → アニメーション → 完了を待つか無効化。",
          "API手順で散発的タイムアウト → ネットワーク → モックやルーティング、必要箇所だけタイムアウト増。",
          "朝や月末だけ赤 → 時間 → 時計を固定、タイムゾーンを固定。",
          "ワーカー増で赤・単独で緑 → データ → テストごとに状態を分離。",
        ]
      ),
      TIP(
        "Khi phân loại, hãy hỏi 'điều gì thay đổi giữa hai lần chạy?'. Câu trả lời gần như luôn là một trong năm nhóm này, và nó chỉ thẳng cách chữa.",
        "When classifying, ask 'what changed between the two runs?'. The answer is almost always one of these five groups, and it points straight at the cure.",
        "分類時は「2回の実行で何が変わったか？」と問います。答えはほぼこの5グループのいずれかで、対策を直接示します。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Web-first auto-waiting: vũ khí gốc chống race",
      en: "3. Web-first auto-waiting: the root weapon against races",
      ja: "3. ウェブファースト自動待機: レース対策の根本兵器",
    },
    blocks: [
      P(
        "Điểm khác biệt lớn nhất giữa Playwright và các công cụ đời cũ là cơ chế auto-waiting của web-first assertions. Khi bạn viết expect(locator).toBeVisible(), Playwright không chụp trạng thái một lần rồi so sánh; nó thăm dò lặp lại cho tới khi điều kiện đúng hoặc hết timeout. Tương tự, mỗi action như click sẽ tự chờ phần tử actionable: hiển thị, ổn định vị trí, bật, nhận được sự kiện và không bị phần tử khác che. Nhờ đó phần lớn race biến mất mà bạn không phải viết một dòng chờ nào.",
        "The biggest difference between Playwright and older tools is the auto-waiting of web-first assertions. When you write expect(locator).toBeVisible(), Playwright does not snapshot state once and compare; it retries the check until the condition holds or the timeout expires. Likewise each action such as click auto-waits for the element to be actionable: visible, position-stable, enabled, receiving events, and not obscured by another element. As a result most races vanish without you writing a single wait.",
        "Playwrightと旧世代ツールの最大の違いは、ウェブファーストアサーションの自動待機です。expect(locator).toBeVisible()と書くと、状態を一度撮って比較するのではなく、条件が満たされるかタイムアウトするまで再試行します。同様にclickなどの各アクションは、要素がアクショナブル（表示・位置安定・有効・イベント受信可・他要素に隠れない）になるまで自動で待ちます。その結果、待機を1行も書かずに大半のレースが消えます。"
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';

test('giỏ hàng cập nhật tổng tiền — auto-wait làm việc thay ta', async ({ page }) => {
  await page.goto('/cart');
  // KHÔNG cần waitForSelector: click tự chờ nút actionable
  await page.getByRole('button', { name: 'Thêm gói Pro' }).click();

  // web-first assertion: thăm dò lặp tới khi tổng = 490.000đ hoặc hết timeout
  await expect(page.getByTestId('cart-total')).toHaveText('490.000₫');

  // oracle nghiệp vụ: số dòng hàng khớp, không âm
  await expect(page.getByRole('listitem')).toHaveCount(2);
});`
      ),
      P(
        "Chìa khoá là phân biệt hai loại chờ. Chờ ngầm qua assertion và action là loại đúng: nó gắn với một điều kiện xác định và tự dừng ngay khi điều kiện thoả. Chờ tường minh bằng thời gian cố định là loại sai: nó luôn hoặc quá ngắn ở máy chậm, hoặc quá dài làm CI ì ạch. Nguyên tắc vàng: mọi lúc bạn định gõ sleep, hãy hỏi 'tôi đang chờ điều kiện gì?' rồi viết đúng assertion cho điều kiện đó.",
        "The key is to distinguish two kinds of waiting. Implicit waiting via assertions and actions is the correct kind: it is bound to a defined condition and stops the instant the condition holds. Explicit waiting by a fixed duration is the wrong kind: it is always either too short on slow machines or too long, dragging CI. Golden rule: whenever you are about to type a sleep, ask 'what condition am I waiting for?' and write the assertion for that condition.",
        "鍵は2種類の待機を区別することです。アサーションやアクションによる暗黙の待機が正しい方法で、定義された条件に紐づき、条件成立の瞬間に止まります。固定時間による明示的待機は誤りで、遅いマシンでは短すぎ、そうでなければ長すぎてCIを遅らせます。黄金律: sleepを打とうとしたら「どの条件を待っているのか」を問い、その条件のアサーションを書くことです。"
      ),
      NOTE(
        "Auto-waiting mặc định dùng ngưỡng timeout của expect (5 giây) và của action (30 giây). Chỉnh trong config, đừng rải magic number khắp test.",
        "Auto-waiting uses the default expect timeout (5s) and action timeout (30s). Tune these in config, don't scatter magic numbers across tests.",
        "自動待機は既定のexpectタイムアウト（5秒）とアクションタイムアウト（30秒）を使います。設定で調整し、マジックナンバーをテストに散らさないでください。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Vì sao 'sleep cứng' là kẻ thù số một",
      en: "4. Why hard sleeps are enemy number one",
      ja: "4. なぜハードsleepが最大の敵なのか",
    },
    blocks: [
      P(
        "Sleep cứng — waitForTimeout(2000) — là nguồn flaky phổ biến nhất mà đội nào cũng từng dính. Nó giả định môi trường chạy nhanh y hệt mọi lúc, điều không bao giờ đúng trên CI dùng chung. Runner buổi trưa tải nặng sẽ chậm hơn, khiến 2 giây không đủ và test đỏ; runner rảnh lại lãng phí đúng 2 giây mỗi lần, nhân với hàng nghìn test thành hàng giờ lãng phí. Tệ hơn, sleep cứng che giấu nguyên nhân thật: bạn không bao giờ biết mình đang chờ cái gì.",
        "Hard sleep — waitForTimeout(2000) — is the most common flaky source every team has hit. It assumes the environment runs identically fast every time, which is never true on shared CI. A busy midday runner is slower, so 2s is not enough and the test goes red; an idle runner wastes exactly 2s each time, which across thousands of tests becomes hours of waste. Worse, a hard sleep hides the real cause: you never learn what you were waiting for.",
        "ハードsleep（waitForTimeout(2000)）は、どのチームも経験する最も一般的なフレーキー源です。環境が毎回同じ速さで走ると仮定しますが、共有CIでは決して成り立ちません。昼の混雑したランナーは遅く2秒では足りず赤になり、空いたランナーでは毎回ちょうど2秒を浪費し、数千テストで数時間の無駄になります。さらに悪いことに、ハードsleepは真因を隠し、何を待っていたのか分からなくなります。"
      ),
      CODE(
        "ts",
        `// ❌ SAI: chờ mù, vừa flaky vừa chậm
await page.click('#pay');
await page.waitForTimeout(3000);           // hi vọng API xong trong 3s
expect(await page.textContent('#status')).toBe('Đã thanh toán');

// ✅ ĐÚNG: chờ đúng điều kiện — nhanh khi được, kiên nhẫn khi cần
await page.getByRole('button', { name: 'Thanh toán' }).click();
await expect(page.getByTestId('status')).toHaveText('Đã thanh toán');

// ✅ Nếu phải chờ một response cụ thể, chờ CHÍNH nó (không chờ thời gian)
const resP = page.waitForResponse(r => r.url().includes('/api/pay') && r.ok());
await page.getByRole('button', { name: 'Thanh toán' }).click();
await resP;`
      ),
      WARN(
        "Nếu một chỗ trong code thật sự cần sleep (ví dụ debounce 300ms không quan sát được qua DOM), hãy chờ hệ quả quan sát được của debounce (một request bay đi), đừng chờ đúng 300ms.",
        "If somewhere genuinely needs a sleep (e.g. a 300ms debounce not observable via DOM), wait for an observable consequence of the debounce (a request firing), not exactly 300ms.",
        "本当にsleepが必要な箇所（DOMで観測できない300msのデバウンス等）では、300msちょうどではなく、デバウンスの観測可能な結果（リクエスト発火）を待ってください。"
      ),
      QA(
        "Đồng nghiệp thêm waitForTimeout(5000) để 'cho chắc'. Bạn phản biện thế nào?",
        "A teammate adds waitForTimeout(5000) 'to be safe'. How do you push back?",
        "同僚が「念のため」waitForTimeout(5000)を追加。どう反論しますか？",
        "Tôi hỏi: 'chúng ta đang chờ điều kiện nào?'. Nếu là phần tử hiện ra thì thay bằng toBeVisible; nếu là API xong thì chờ waitForResponse; nếu là số liệu đổi thì assert giá trị mới. Sleep 5 giây vừa không đảm bảo đủ ở runner chậm, vừa cộng dồn thành hàng giờ lãng phí. 'Cho chắc' bằng thời gian là ảo giác an toàn.",
        "I ask 'which condition are we waiting for?'. If it's an element appearing, replace with toBeVisible; if an API completing, use waitForResponse; if a value changing, assert the new value. A 5s sleep neither guarantees enough on slow runners nor scales — it compounds into hours of waste. 'Being safe' by time is a false sense of security.",
        "私は「どの条件を待っているのか」と問います。要素の出現ならtoBeVisibleに置換、API完了ならwaitForResponse、値の変化なら新しい値をアサートします。5秒のsleepは遅いランナーで十分とは限らず、積み重なって数時間の無駄になります。時間で「念のため」は安全の錯覚です。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Animation, thời gian và timezone: những kẻ giấu mặt",
      en: "5. Animation, time and timezone: the hidden culprits",
      ja: "5. アニメーション・時間・タイムゾーン: 隠れた犯人",
    },
    blocks: [
      P(
        "Sau race, hai nhóm khó chịu nhất là animation và thời gian, vì chúng đỏ rải rác và khó tái hiện. Animation làm phần tử dịch chuyển đúng lúc Playwright tính toạ độ click; may là action tự chờ vị trí ổn định, nhưng với animation lặp vô hạn bạn nên tắt hẳn khi test. Thời gian thì tinh vi hơn: một test tạo hoá đơn 'hôm nay' sẽ đỏ vào phút giao ngày, hoặc một test đếm 'trong 30 ngày qua' đổi kết quả theo timezone runner. Cách chữa là cố định đồng hồ và múi giờ, biến thời gian thành hằng số tất định.",
        "After races, the two most annoying groups are animation and time, because they go red intermittently and are hard to reproduce. Animation moves the element right as Playwright computes click coordinates; luckily actions auto-wait for position stability, but for infinitely looping animation you should disable it during tests. Time is subtler: a test creating a 'today' invoice goes red at the day boundary, or a 'last 30 days' count changes with the runner's timezone. The cure is to freeze the clock and timezone, turning time into a deterministic constant.",
        "レースの次に厄介なのがアニメーションと時間です。断続的に赤くなり再現が難しいためです。アニメーションはPlaywrightがクリック座標を計算する瞬間に要素を動かします。幸いアクションは位置安定を自動で待ちますが、無限ループのアニメーションはテスト中に無効化すべきです。時間はより微妙で、「今日」の請求書を作るテストは日付境界で赤になり、「過去30日」の集計はランナーのタイムゾーンで結果が変わります。対策は時計とタイムゾーンを固定し、時間を決定的な定数にすることです。"
      ),
      CODE(
        "ts",
        `// playwright.config.ts — tắt animation & cố định timezone toàn cục
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    timezoneId: 'Asia/Ho_Chi_Minh',   // cố định TZ → 'hôm nay' tất định
    locale: 'vi-VN',
  },
});

// Trong test: đóng băng đồng hồ tại một mốc cố định (Playwright clock API)
test('báo cáo doanh thu hôm nay', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-07-06T09:00:00+07:00'));
  await page.goto('/reports/today');
  await expect(page.getByTestId('report-date')).toHaveText('06/07/2026');
});

// Tắt animation khi chụp/so sánh để tránh trượt toạ độ
await expect(page).toHaveScreenshot({ animations: 'disabled' });`
      ),
      SCEN(
        "Test đỏ chỉ vào 23:55–00:05",
        "A test that only fails between 23:55–00:05",
        "Trong một ngân hàng số, test 'liệt kê giao dịch hôm nay' đỏ ngẫu nhiên khi CI chạy quanh nửa đêm: bản ghi được tạo lúc 23:59 nhưng assertion đọc 'hôm nay' đã sang ngày mới. Đội sửa bằng cách đóng băng clock tại một mốc giữa ngày cho toàn bộ suite giao dịch, và test hết flaky. Bài học: mọi assertion phụ thuộc 'hôm nay' phải chạy trên một đồng hồ do test kiểm soát.",
        "In a digital bank, a 'list today's transactions' test failed randomly when CI ran near midnight: a record created at 23:59 but the assertion read 'today' after the day flipped. The team fixed it by freezing the clock at mid-day for the whole transaction suite, and flakiness disappeared. Lesson: any assertion depending on 'today' must run on a clock the test controls.",
        "あるデジタル銀行で、「本日の取引一覧」テストが深夜前後のCI実行でランダムに失敗しました。23:59に作成されたレコードを、日付が変わった後に「本日」として読んだためです。チームは取引スイート全体で時計を昼に固定し、フレーキーは消えました。教訓: 「本日」に依存するアサーションは、テストが制御する時計で走らせること。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Cô lập test: nền tảng cho song song tất định",
      en: "6. Test isolation: the foundation of deterministic parallelism",
      ja: "6. テスト分離: 決定的並列の基盤",
    },
    blocks: [
      P(
        "Nguồn flaky nguy hiểm nhất ở quy mô lớn là dùng chung dữ liệu. Khi hai test cùng sửa một tài khoản, một sản phẩm hay một hàng tồn kho, chạy song song sẽ giẫm chân nhau: test A xoá bản ghi mà test B đang đọc, hoặc cả hai cùng cộng tồn kho rồi kết quả sai. Nguyên tắc là mỗi test phải tự tạo state của riêng mình, tự dọn dẹp, và không giả định thứ tự chạy. Với Playwright, browser context được tách biệt sẵn cho mỗi test; phần còn lại là cô lập dữ liệu ở tầng backend qua fixtures.",
        "The most dangerous flaky source at scale is shared data. When two tests both mutate one account, product or inventory row, running in parallel they collide: test A deletes a record test B is reading, or both increment stock and the result is wrong. The principle is that each test must create its own state, clean up after itself, and assume no run order. With Playwright the browser context is already isolated per test; the rest is isolating data at the backend layer through fixtures.",
        "大規模で最も危険なフレーキー源はデータ共有です。2つのテストが同一アカウント・商品・在庫行を変更すると、並列実行で衝突します。テストAがテストBの読むレコードを削除したり、両方が在庫を加算して結果が狂ったりします。原則は、各テストが自分の状態を作り、後片付けし、実行順を仮定しないことです。Playwrightではブラウザコンテキストがテストごとに分離済みで、残るはフィクスチャによるバックエンド層のデータ分離です。"
      ),
      CODE(
        "ts",
        `// fixtures.ts — mỗi test có một tenant/user riêng, tự dọn sau khi xong
import { test as base } from '@playwright/test';

type Fixtures = { account: { id: string; email: string } };

export const test = base.extend<Fixtures>({
  account: async ({ request }, use, testInfo) => {
    // tạo dữ liệu duy nhất theo test → không đụng test khác
    const email = \`qa+\${testInfo.testId}@example.com\`;
    const res = await request.post('/api/test/accounts', { data: { email } });
    const account = await res.json();

    await use(account);              // trao cho test dùng

    // teardown: dọn state → suite chạy lại vẫn sạch (idempotent)
    await request.delete(\`/api/test/accounts/\${account.id}\`);
  },
});

export { expect } from '@playwright/test';`
      ),
      UL(
        [
          "Không dùng tài khoản 'admin@company.com' chung — sinh email duy nhất theo testId.",
          "Mọi bản ghi tạo trong test phải được dọn ở teardown, kể cả khi test đỏ.",
          "Không assert 'có đúng 10 đơn' trên bảng chung — assert đơn CỦA test này.",
          "Bật fullyParallel để phơi bày phụ thuộc ẩn ngay từ máy dev, không để CI mới lộ.",
        ],
        [
          "No shared 'admin@company.com' account — generate a unique email by testId.",
          "Every record a test creates must be cleaned in teardown, even if the test failed.",
          "Don't assert 'exactly 10 orders' on a shared table — assert THIS test's orders.",
          "Enable fullyParallel to surface hidden dependencies on the dev box, not only in CI.",
        ],
        [
          "共有の「admin@company.com」を使わない — testIdで一意のメールを生成。",
          "テストが作った全レコードは、失敗時でもteardownで削除する。",
          "共有テーブルで「ちょうど10件の注文」をアサートしない — このテストの注文をアサート。",
          "fullyParallelを有効化し、隠れた依存をCIではなく開発機で早期に露出させる。",
        ]
      ),
      NOTE(
        "Cô lập dữ liệu chính là điều kiện tiên quyết cho bài kế tiếp về parallel & sharding — không cô lập thì tăng workers = tăng flaky.",
        "Data isolation is the prerequisite for the next article on parallel & sharding — without it, more workers means more flakiness.",
        "データ分離は次の並列＆シャーディングの記事の前提条件です。分離しないままワーカーを増やすとフレーキーが増えます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Retry đúng cách và trace 'retain-on-failure-and-retries'",
      en: "7. Retrying correctly with trace 'retain-on-failure-and-retries'",
      ja: "7. 正しいリトライと trace 'retain-on-failure-and-retries'",
    },
    blocks: [
      P(
        "Retry là con dao hai lưỡi. Bật retry giúp CI xanh dù có flaky lẻ tẻ, nhưng nếu để nó che giấu flaky thì bạn đang tích luỹ nợ. Chiến lược đúng: bật retry ở CI với số lần nhỏ (thường 2), nhưng đồng thời ghi lại mọi lần retry và coi test cần retry mới xanh là 'flaky', không phải 'pass'. Playwright hỗ trợ chính xác điều này qua trace 'retain-on-failure-and-retries': chỉ giữ trace khi test thất bại hoặc phải retry, nên bạn luôn có bằng chứng để điều tra mà không phình dung lượng.",
        "Retry is double-edged. Enabling retries keeps CI green despite occasional flakiness, but if it hides flakiness you are accruing debt. The correct strategy: enable retries in CI with a small count (usually 2), but simultaneously record every retry and treat a test that only passes on retry as 'flaky', not 'pass'. Playwright supports exactly this via trace 'retain-on-failure-and-retries': keep traces only when a test fails or has to retry, so you always have evidence to investigate without blowing up storage.",
        "リトライは諸刃の剣です。有効にすると時折のフレーキーがあってもCIは緑ですが、フレーキーを隠すなら負債を蓄積しています。正しい戦略は、CIで少ない回数（通常2回）のリトライを有効にしつつ、すべてのリトライを記録し、リトライでのみ緑になるテストは「pass」ではなく「フレーキー」と扱うことです。Playwrightはtrace 'retain-on-failure-and-retries'でこれを正確に支援します。失敗時やリトライ時のみトレースを保持するので、容量を膨らませずに常に調査の証拠が残ります。"
      ),
      CODE(
        "ts",
        `// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0,      // dev: 0 để lộ flaky ngay; CI: 2
  use: {
    // giữ trace khi FAIL hoặc khi phải RETRY → luôn có bằng chứng điều tra
    trace: 'retain-on-failure-and-retries',
    video: 'retain-on-failure',         // v1.61: chế độ retention cho flaky
    screenshot: 'only-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'report.json' }]],
});`
      ),
      P(
        "Khi mở Trace Viewer của một test phải retry, bạn thấy dòng thời gian đầy đủ: từng action, snapshot DOM trước và sau, network với method và status, console log và cả text attachment. Với flaky do network, phần network cho thấy request nào chậm hay lỗi. Với flaky do race, snapshot cho thấy phần tử chưa render tại thời điểm assert. Trace biến việc điều tra flaky từ đoán mò thành đọc bằng chứng — đây là lý do 'retain-on-retries' quan trọng: flaky theo định nghĩa không tái hiện được, nên phải bắt tại trận.",
        "Opening the Trace Viewer for a retried test, you see the full timeline: each action, DOM snapshots before and after, network with method and status, console logs and even text attachments. For network flakiness the network pane shows which request was slow or failed. For race flakiness the snapshot shows the element not yet rendered at assert time. Traces turn flaky investigation from guessing into reading evidence — this is why 'retain-on-retries' matters: flakiness by definition doesn't reproduce, so you must catch it in the act.",
        "リトライされたテストのTrace Viewerを開くと、全タイムラインが見えます。各アクション、前後のDOMスナップショット、メソッドとステータス付きのネットワーク、コンソールログ、テキスト添付までです。ネットワーク起因のフレーキーではどのリクエストが遅いか失敗したかが分かり、レース起因ではアサート時に要素が未描画だったことがスナップショットで見えます。トレースはフレーキー調査を当て推量から証拠読解に変えます。これが'retain-on-retries'が重要な理由です。フレーキーは定義上再現しないため、その場で捕らえる必要があります。"
      ),
      TIP(
        "Trong Trace Viewer mới, dùng Cmd/Ctrl+F để tìm trong code, bật/tắt hành động routing, và xem JSON được tự động format — rất hợp để soi flaky network.",
        "In the new Trace Viewer, use Cmd/Ctrl+F to search in code, toggle routing actions, and view auto-formatted JSON — ideal for inspecting network flakiness.",
        "新しいTrace Viewerでは、Cmd/Ctrl+Fでコード検索、ルーティングアクションの表示切替、自動整形されたJSON表示が可能で、ネットワークのフレーキー調査に最適です。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Ổn định hoá network: route, mock và WebSocket",
      en: "8. Stabilizing the network: route, mock and WebSocket",
      ja: "8. ネットワークの安定化: ルーティング・モック・WebSocket",
    },
    blocks: [
      P(
        "Với test end-to-end thật, network là biến động lớn nhất. Bạn không thể kiểm soát độ trễ của một dịch vụ bên thứ ba hay một microservice đang tải nặng. Chiến lược là chia rõ hai loại test: test tích hợp thật cần backend thật thì chấp nhận độ trễ và chờ đúng response; còn test giao diện chỉ quan tâm hành vi UI thì mock network để loại hẳn biến động. Playwright cho phép route để chặn và trả response giả tất định, kể cả cho lỗi và trạng thái biên như 429 hay 503.",
        "In real end-to-end tests, the network is the biggest variable. You cannot control a third party's latency or a microservice under heavy load. The strategy is to clearly split two test types: real integration tests that need the real backend accept latency and wait for the actual response; UI tests that only care about UI behavior mock the network to remove the variance entirely. Playwright lets you route to intercept and return deterministic fake responses, including for errors and edge states like 429 or 503.",
        "実際のエンドツーエンドテストでは、ネットワークが最大の変動要因です。サードパーティの遅延や高負荷のマイクロサービスは制御できません。戦略は2種類のテストを明確に分けることです。実バックエンドが必要な実結合テストは遅延を受け入れ実際の応答を待ち、UI挙動のみを見るUIテストはネットワークをモックして変動を完全に除去します。Playwrightはrouteでリクエストを傍受し、429や503などの境界状態やエラーを含む決定的な偽応答を返せます。"
      ),
      CODE(
        "ts",
        `// Mock để test tất định — bỏ hẳn biến động network
test('hiển thị lỗi khi API trả 503', async ({ page }) => {
  await page.route('**/api/orders', route =>
    route.fulfill({ status: 503, body: JSON.stringify({ error: 'unavailable' }) })
  );
  await page.goto('/orders');
  await expect(page.getByRole('alert')).toHaveText('Hệ thống bận, vui lòng thử lại');
});

// v1.57: chặn/mock WebSocket để test realtime tất định
test('badge cập nhật khi có message realtime', async ({ page }) => {
  await page.routeWebSocket('wss://api.example.com/live', ws => {
    ws.onMessage(() => ws.send(JSON.stringify({ type: 'notify', count: 3 })));
  });
  await page.goto('/inbox');
  await expect(page.getByTestId('unread-badge')).toHaveText('3');
});`
      ),
      P(
        "Một cạm bẫy tinh vi là mock quá tay: nếu mock hết mọi request, test không còn kiểm tra tích hợp thật và có thể xanh dối. Nguyên tắc là mock để loại nhiễu, không mock để né bug. Hãy giữ một lớp mỏng test end-to-end thật chạy trên môi trường staging với dữ liệu cô lập, còn phần lớn test hành vi UI thì mock. Cân bằng này vừa ổn định vừa vẫn bắt được lỗi hợp đồng giữa frontend và backend.",
        "A subtle trap is over-mocking: if you mock every request, the test no longer verifies real integration and may go falsely green. The principle is to mock to remove noise, not to dodge bugs. Keep a thin layer of real end-to-end tests running against staging with isolated data, and mock in the majority of UI behavior tests. This balance is both stable and still catches contract errors between frontend and backend.",
        "微妙な罠は過剰なモックです。すべてのリクエストをモックすると、実結合を検証しなくなり偽の緑になり得ます。原則はノイズ除去のためにモックし、バグ回避のためにモックしないことです。分離データを持つステージングで走る実エンドツーエンドテストを薄く残し、大多数のUI挙動テストはモックします。この均衡は安定しつつ、フロントとバックエンド間の契約エラーも捕らえます。"
      ),
      WARN(
        "Mock che được flaky nhưng cũng che được bug thật. Luôn giữ một 'smoke suite' end-to-end không mock chạy trên staging để phát hiện lệch hợp đồng.",
        "Mocking hides flakiness but also hides real bugs. Always keep an un-mocked end-to-end 'smoke suite' on staging to catch contract drift.",
        "モックはフレーキーだけでなく本物のバグも隠します。契約のずれを検知するため、モックしないエンドツーエンドの「スモークスイート」をステージングで常に維持してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Quy trình quarantine: cách ly nhưng không giấu rác",
      en: "9. Quarantine process: isolate without hiding rubbish",
      ja: "9. 隔離プロセス: 隠さずに切り離す",
    },
    blocks: [
      P(
        "Khi một test bị xác định là flaky mà chưa sửa được ngay, để nó chặn merge của cả đội là sai, nhưng xoá nó cũng sai vì mất luôn phần bảo vệ. Giải pháp là quarantine: tách test flaky ra khỏi gate merge nhưng vẫn chạy nó ở một luồng riêng, gắn owner và hạn sửa. Quan trọng nhất, quarantine không được trở thành nghĩa địa nơi test bị vứt vào rồi quên. Mỗi test quarantine phải có SLA rõ ràng — ví dụ bảy ngày — quá hạn thì tự động leo thang lên trưởng nhóm.",
        "When a test is identified as flaky but not immediately fixable, letting it block the whole team's merges is wrong, but deleting it is also wrong because you lose its protection. The solution is quarantine: split the flaky test out of the merge gate but still run it in a separate lane, with an owner and a fix deadline. Most importantly, quarantine must not become a graveyard where tests are dumped and forgotten. Each quarantined test needs a clear SLA — say seven days — past which it auto-escalates to the team lead.",
        "テストがフレーキーと判定されても即修正できない場合、チーム全体のマージを止めるのは誤りですが、削除も保護を失うため誤りです。解決策は隔離です。フレーキーテストをマージゲートから外しつつ別レーンで実行し、担当者と修正期限を付けます。最も重要なのは、隔離が投げ込んで忘れる墓場にならないことです。各隔離テストには明確なSLA（例えば7日）が必要で、超過すればチームリードへ自動エスカレーションします。"
      ),
      CODE(
        "ts",
        `// Đánh dấu quarantine bằng tag + annotation, KHÔNG xoá test
test('checkout với coupon @quarantine', async ({ page }) => {
  test.info().annotations.push({
    type: 'quarantine',
    description: 'owner: @an; flake do race modal; hạn sửa: 2026-07-13',
  });
  // ... nội dung test ...
});

// Ở CI: gate merge chỉ chạy test KHÔNG có tag @quarantine
// npx playwright test --grep-invert @quarantine   (chặn merge)
// npx playwright test --grep @quarantine           (luồng riêng, báo cáo)`
      ),
      imgA2,
      SCEN(
        "Quarantine biến thành bãi rác 40 test",
        "Quarantine turned into a 40-test dump",
        "Một đội SaaS bật quarantine nhưng không đặt SLA. Sau sáu tháng, 40 test nằm trong quarantine, không ai nhớ vì sao, và độ phủ thật đã giảm âm thầm. Họ khắc phục bằng cách gắn owner và hạn bảy ngày cho mỗi test, dựng một job hằng đêm liệt kê test quá hạn và ping owner. Trong một tháng con số về còn ba. Bài học: quarantine không có SLA là nợ kỹ thuật ẩn.",
        "A SaaS team enabled quarantine but set no SLA. After six months, 40 tests sat in quarantine, nobody remembered why, and real coverage had silently dropped. They fixed it by attaching an owner and a seven-day deadline to each test, and a nightly job listing overdue tests and pinging owners. Within a month the number fell to three. Lesson: quarantine without an SLA is hidden technical debt.",
        "あるSaaSチームは隔離を有効化したがSLAを設けませんでした。半年後、40件が隔離に溜まり、理由を誰も覚えておらず、実カバレッジが静かに低下していました。各テストに担当者と7日期限を付け、期限超過を毎晩列挙して担当者に通知するジョブを作って修正しました。1か月で3件まで減りました。教訓: SLAなき隔離は隠れた技術的負債です。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Đo flake rate: biến cảm tính thành chỉ số",
      en: "10. Measuring flake rate: turning gut feeling into a metric",
      ja: "10. フレーキー率の測定: 勘を指標に変える",
    },
    blocks: [
      P(
        "Không đo được thì không quản được. Nhiều đội 'cảm thấy' bộ test hay đỏ nhưng không có con số, nên không biết đang tốt lên hay tệ đi. Cách đo chuẩn là chạy lại cùng một commit nhiều lần và đếm test đổi kết quả, hoặc trích từ báo cáo CI số test cần retry mới xanh. Từ dữ liệu này bạn tính flake rate tổng và flake rate theo từng test, rồi vẽ xu hướng theo tuần. Test flaky nhất luôn nổi lên đầu bảng để ưu tiên xử lý.",
        "You can't manage what you don't measure. Many teams 'feel' the suite is red-prone but have no number, so they can't tell whether things are improving or degrading. The standard way to measure is to rerun the same commit many times and count result-flipping tests, or extract from CI reports which tests only pass on retry. From this data you compute overall flake rate and per-test flake rate, then chart the trend weekly. The flakiest tests always float to the top of the list for prioritization.",
        "測定できないものは管理できません。多くのチームはスイートが赤くなりやすいと「感じ」ますが数値がなく、改善か悪化か判断できません。標準的な測定法は、同一コミットを何度も再実行して結果が反転するテストを数えるか、CIレポートからリトライでのみ緑になるテストを抽出することです。このデータから全体と個別のフレーキー率を計算し、週次で傾向を描きます。最もフレーキーなテストが常に上位に浮上し、優先処理できます。"
      ),
      CODE(
        "bash",
        `# Đo flake rate: chạy lại cùng commit N lần, gom báo cáo JSON
for i in $(seq 1 20); do
  npx playwright test --reporter=json > "runs/run-$i.json" || true
done

# Đếm test nào có lúc pass lúc fail across 20 runs → đó là flaky
node scripts/flake-rate.mjs runs/*.json
# → In: flake rate tổng, top 10 test flaky nhất, xu hướng so với tuần trước`
      ),
      CODE(
        "js",
        `// scripts/flake-rate.mjs — tính flake rate từ nhiều báo cáo JSON
import fs from 'node:fs';
const files = process.argv.slice(2);
const outcomes = {}; // testId -> Set('passed'|'failed')

for (const f of files) {
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const suite of r.suites ?? [])
    for (const spec of suite.specs ?? [])
      for (const t of spec.tests ?? []) {
        (outcomes[spec.title] ??= new Set()).add(t.results.at(-1)?.status);
      }
}
const flaky = Object.entries(outcomes)
  .filter(([, s]) => s.has('passed') && s.has('failed'))   // đổi kết quả = flaky
  .map(([title]) => title);

const rate = (flaky.length / Object.keys(outcomes).length) * 100;
console.log(\`Flake rate: \${rate.toFixed(2)}% — \${flaky.length} test flaky\`);
flaky.forEach(t => console.log('  •', t));`
      ),
      QA(
        "Bạn báo cáo sức khoẻ bộ test cho quản lý bằng chỉ số nào?",
        "Which metrics do you report suite health to management with?",
        "テストスイートの健全性を経営層にどの指標で報告しますか？",
        "Ba chỉ số: flake rate tổng (mục tiêu < 0,5%), số test đang quarantine kèm tuổi trung bình, và thời gian chạy p95 của bộ test. Flake rate cho thấy độ tin cậy, quarantine cho thấy nợ đang tích, thời gian chạy cho thấy chi phí và tốc độ phản hồi. Tôi vẽ cả ba theo tuần để thấy xu hướng, không chỉ con số tại một thời điểm.",
        "Three metrics: overall flake rate (target < 0.5%), number of quarantined tests with their average age, and the suite's p95 runtime. Flake rate shows reliability, quarantine shows accruing debt, runtime shows cost and feedback speed. I chart all three weekly to see trends, not just a point-in-time number.",
        "3つの指標です。全体フレーキー率（目標0.5%未満）、平均経過日数付きの隔離テスト数、スイートのp95実行時間。フレーキー率は信頼性、隔離は蓄積する負債、実行時間はコストとフィードバック速度を示します。3つとも週次で描き、一時点の数値ではなく傾向を見ます。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Chính sách cấp tổ chức: giữ flaky dưới ngưỡng",
      en: "11. Org-level policy: keeping flakiness below threshold",
      ja: "11. 組織方針: フレーキーを閾値以下に保つ",
    },
    blocks: [
      P(
        "Ở quy mô nhiều đội, chống flaky không thể trông vào thiện chí cá nhân mà phải là chính sách. Chính sách tốt gồm bốn phần: ngưỡng flake rate mà nếu vượt sẽ chặn release; quy tắc rằng test cần retry mới xanh bị đánh dấu flaky chứ không tính pass; quy trình quarantine có owner và SLA; và một nghi thức 'flaky hunt' định kỳ nơi đội dành thời gian cố định để sửa các test đứng đầu bảng. Quan trọng là chính sách phải được nhúng vào CI, không phải nằm trong một trang wiki bị lãng quên.",
        "At multi-team scale, fighting flakiness can't rely on individual goodwill; it must be policy. A good policy has four parts: a flake-rate threshold that blocks release if exceeded; a rule that retry-only-passing tests are marked flaky, not counted as pass; a quarantine process with owners and SLAs; and a periodic 'flaky hunt' ritual where the team dedicates fixed time to fix top-ranked tests. Crucially, the policy must be embedded in CI, not sitting in a forgotten wiki page.",
        "複数チーム規模では、フレーキー対策を個人の善意に頼れず、方針にする必要があります。良い方針は4部構成です。超過すればリリースを止めるフレーキー率の閾値、リトライでのみ緑になるテストはpassではなくフレーキーと記す規則、担当者とSLA付きの隔離プロセス、そしてチームが一定時間を割いて上位テストを直す定期的な「フレーキーハント」です。重要なのは、方針を忘れられたwikiページではなくCIに組み込むことです。"
      ),
      UL(
        [
          "Ngưỡng: flake rate tuần > 1% → tự động tạo issue ưu tiên cao cho đội sở hữu.",
          "Định nghĩa 'xanh': test cần retry vẫn coi là chưa ổn định, ghi vào dashboard.",
          "Owner: mỗi test map tới một đội qua CODEOWNERS, không có test 'vô chủ'.",
          "Nghi thức: mỗi sprint dành nửa ngày 'flaky hunt' sửa top 5 test flaky nhất.",
          "Chặn: PR không được thêm waitForTimeout mới — lint rule từ chối ở review.",
        ],
        [
          "Threshold: weekly flake rate > 1% → auto-create a high-priority issue for the owning team.",
          "Definition of 'green': a retried test still counts as unstable, logged to the dashboard.",
          "Owner: every test maps to a team via CODEOWNERS, no 'ownerless' tests.",
          "Ritual: each sprint dedicates half a day of 'flaky hunt' to fix the top 5 flakiest.",
          "Block: PRs may not add new waitForTimeout — a lint rule rejects it at review.",
        ],
        [
          "閾値: 週次フレーキー率が1%超 → 所有チームへ高優先度issueを自動生成。",
          "「緑」の定義: リトライされたテストも不安定とみなし、ダッシュボードに記録。",
          "担当者: CODEOWNERSで各テストをチームに対応付け、「無主」テストを作らない。",
          "儀式: 各スプリントで半日の「フレーキーハント」を設け上位5件を修正。",
          "遮断: PRで新規waitForTimeoutを追加不可 — lintルールがレビューで却下。",
        ]
      ),
      TIP(
        "Nhúng một ESLint/lint rule cấm waitForTimeout và cấm locator theo XPath dễ vỡ. Chính sách sống trong CI mới có hiệu lực thật.",
        "Embed an ESLint/lint rule banning waitForTimeout and brittle XPath locators. A policy that lives in CI is the only one with real force.",
        "waitForTimeoutと壊れやすいXPathロケーターを禁じるESLint/lintルールを組み込みます。CIに生きる方針だけが実効力を持ちます。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Vai trò Playwright Agents và Healer trong chống flaky",
      en: "12. The role of Playwright Agents and Healer in anti-flaky",
      ja: "12. 反フレーキーにおけるPlaywright AgentsとHealerの役割",
    },
    blocks: [
      P(
        "Từ phiên bản 1.56, Playwright có ba AI agent hợp tác: Planner khám phá ứng dụng và viết kế hoạch test dạng Markdown, Generator biến kế hoạch thành spec chạy được và kiểm chứng locator trên app thật, còn Healer chạy trong chế độ debug, soi console, network và snapshot để sửa test đỏ hoặc đánh dấu skip. Trong bối cảnh chống flaky, Healer đặc biệt hữu ích: khi một test đỏ do locator đổi hoặc do chờ sai điều kiện, Healer có thể đề xuất locator bền hơn hoặc assertion đúng thay vì để con người đoán.",
        "Since version 1.56, Playwright has three cooperating AI agents: Planner explores the app and writes a Markdown test plan, Generator turns the plan into runnable specs and verifies locators on the live app, and Healer runs in debug mode, inspecting console, network and snapshots to fix failing tests or mark them skipped. In an anti-flaky context, Healer is especially useful: when a test fails due to a changed locator or a wrong wait condition, Healer can suggest a more robust locator or the right assertion instead of leaving humans to guess.",
        "バージョン1.56以降、Playwrightには協調する3つのAIエージェントがあります。Plannerはアプリを探索しMarkdownのテスト計画を書き、Generatorは計画を実行可能なspecに変え実アプリでロケーターを検証し、Healerはデバッグモードで動きコンソール・ネットワーク・スナップショットを調べて失敗テストを修正するかスキップにします。反フレーキーの文脈でHealerは特に有用で、ロケーター変更や待機条件の誤りで失敗した際、人間の推測に任せず、より堅牢なロケーターや正しいアサーションを提案できます。"
      ),
      CODE(
        "bash",
        `# Scaffold ba agent + seed.spec.ts (fixtures/setup dùng chung)
npx playwright init-agents

# Healer chạy trong debug: soi console/network/snapshot của test đỏ,
# đề xuất sửa locator hoặc assertion, hoặc đánh dấu skip nếu là bug sản phẩm.
# Người review vẫn quyết định cuối cùng — agent là trợ lý, không phải oracle.`
      ),
      WARN(
        "Đừng để Healer tự động 'sửa' flaky bằng cách nới timeout hay thêm chờ mù. Con người phải xác nhận nguyên nhân gốc; agent có thể ảo giác (hallucination) một bản vá che triệu chứng.",
        "Don't let Healer auto-'fix' flakiness by loosening timeouts or adding blind waits. A human must confirm the root cause; the agent can hallucinate a patch that masks the symptom.",
        "Healerがタイムアウトを緩めたり盲目的な待機を追加してフレーキーを自動「修正」するのを許さないでください。人間が根本原因を確認すべきで、エージェントは症状を覆う修正をハルシネーションし得ます。"
      ),
      QA(
        "AI agent có thể thay con người trong việc sửa flaky không?",
        "Can an AI agent replace humans in fixing flakiness?",
        "AIエージェントはフレーキー修正で人間を置き換えられますか？",
        "Không hoàn toàn. Agent rất mạnh ở việc thu thập bằng chứng — đọc trace, so snapshot, chỉ ra locator gãy — và đề xuất sửa nhanh. Nhưng ranh giới là quyết định nguyên nhân gốc và tránh bản vá che triệu chứng. Tôi để agent điều tra và đề xuất, còn con người xác nhận đúng nhóm nguyên nhân rồi mới merge. Đây là mô hình trợ lý có kiểm soát, không phải tự trị hoàn toàn.",
        "Not entirely. Agents are strong at gathering evidence — reading traces, diffing snapshots, pointing at a broken locator — and proposing quick fixes. But the boundary is deciding the root cause and avoiding symptom-masking patches. I let the agent investigate and propose, while a human confirms the correct root-cause group before merging. This is a supervised-assistant model, not full autonomy.",
        "完全にはできません。エージェントは証拠収集（トレース読解、スナップショット差分、壊れたロケーターの指摘）と迅速な修正提案に強いです。しかし境界は根本原因の判断と、症状を覆う修正の回避です。エージェントに調査と提案をさせ、人間が正しい原因グループを確認してからマージします。これは完全自律ではなく監督付きアシスタントのモデルです。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Checklist khép kín và góc phỏng vấn",
      en: "13. Closing checklist and the interview angle",
      ja: "13. 総括チェックリストと面接の観点",
    },
    blocks: [
      P(
        "Chống flaky ở quy mô lớn là hành trình từ mẹo vặt tới hệ thống. Bạn bắt đầu bằng việc phân loại năm nhóm nguyên nhân, dựa vào web-first auto-waiting để diệt race, xoá mọi sleep cứng, cố định thời gian và tắt animation, cô lập dữ liệu qua fixtures, rồi bọc lại bằng retry có kiểm soát và trace 'retain-on-failure-and-retries'. Trên nền đó, quy trình quarantine có SLA và phép đo flake rate biến sự ổn định thành thứ quản lý được. Cuối cùng chính sách cấp tổ chức giữ cho toàn bộ không trượt trở lại.",
        "Anti-flaky at scale is a journey from tricks to system. You start by classifying the five root-cause groups, lean on web-first auto-waiting to kill races, delete every hard sleep, freeze time and disable animation, isolate data via fixtures, then wrap it with controlled retries and trace 'retain-on-failure-and-retries'. On that foundation, a quarantine process with an SLA and flake-rate measurement make stability manageable. Finally an org-level policy keeps the whole thing from sliding back.",
        "大規模の反フレーキーは、小技からシステムへの旅です。まず5つの原因グループを分類し、ウェブファースト自動待機でレースを潰し、すべてのハードsleepを削除し、時間を固定しアニメーションを無効化し、フィクスチャでデータを分離し、制御されたリトライとtrace 'retain-on-failure-and-retries'で包みます。その基盤の上で、SLA付き隔離プロセスとフレーキー率測定が安定を管理可能にします。最後に組織方針が全体の後戻りを防ぎます。"
      ),
      H("Câu hỏi phỏng vấn thường gặp", "Common interview questions", "よくある面接質問"),
      QA(
        "Bạn định nghĩa và đo 'flaky test' thế nào trong một câu?",
        "How do you define and measure a 'flaky test' in one sentence?",
        "「フレーキーテスト」を一文でどう定義し測定しますか？",
        "Flaky là test đổi kết quả trên cùng một commit không đổi code, và tôi đo nó bằng flake rate — tỉ lệ lần chạy đổi kết quả trên tổng số lần chạy — theo dõi theo tuần và theo từng test để ưu tiên sửa.",
        "Flaky is a test that flips result on the same commit with unchanged code, and I measure it via flake rate — the fraction of runs that flip result over total runs — tracked weekly and per test to prioritize fixes.",
        "フレーキーとは、コード不変の同一コミットで結果が反転するテストで、フレーキー率（結果反転回数÷総実行回数）で測定し、修正優先のため週次かつテスト単位で追跡します。"
      ),
      QA(
        "Một test đỏ ngẫu nhiên trên CI nhưng luôn xanh ở máy bạn. Bạn làm gì đầu tiên?",
        "A test fails randomly on CI but always passes on your machine. What's your first move?",
        "CIでランダムに失敗するが自機では常に緑。最初に何をしますか？",
        "Mở trace của lần đỏ — nhờ 'retain-on-failure-and-retries' luôn có sẵn. Tôi xem network, snapshot và console tại thời điểm assert để xác định nhóm nguyên nhân. Khác biệt CI–local gần như luôn là tài nguyên (chậm hơn → lộ race) hoặc song song (dữ liệu chung), nên tôi kiểm cô lập dữ liệu và thay mọi chờ mù bằng assertion đúng điều kiện.",
        "Open the trace of the failing run — always available thanks to 'retain-on-failure-and-retries'. I inspect network, snapshot and console at assert time to identify the root-cause group. CI–local differences are almost always resources (slower → exposes races) or parallelism (shared data), so I check data isolation and replace every blind wait with a condition-based assertion.",
        "失敗実行のトレースを開きます。'retain-on-failure-and-retries'のおかげで常に入手できます。アサート時のネットワーク・スナップショット・コンソールを調べ原因グループを特定します。CIと自機の差はほぼ常にリソース（遅い→レース露出）か並列（データ共有）なので、データ分離を確認し、盲目的待機を条件ベースのアサーションに置き換えます。"
      ),
      NOTE(
        "Thông điệp cốt lõi mang vào phỏng vấn: flaky là bài toán vận hành có thể đo và quản lý, không phải xui rủi. Ai nói được điều đó kèm quy trình quarantine + SLA sẽ nổi bật.",
        "Core message to bring to interviews: flakiness is a measurable, manageable operations problem, not bad luck. Whoever articulates that with a quarantine + SLA process stands out.",
        "面接に持ち込む核心: フレーキーは不運ではなく、測定・管理可能な運用課題です。隔離＋SLAプロセスと共にそれを語れる人が際立ちます。"
      ),
    ],
  },
];

const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-flaky-at-scale",
  cover: coverA,
  tags: tags("nangcao", "saas", "playwright", "trace", "advanced", "experience"),
  title: {
    vi: "Chống flaky ở quy mô lớn với Playwright",
    en: "Fighting flakiness at scale with Playwright",
    ja: "Playwrightで大規模にフレーキーと戦う",
  },
  summary: {
    vi: "Coi flaky như bài toán vận hành: năm nhóm nguyên nhân gốc, web-first auto-waiting, bỏ sleep cứng, cô lập dữ liệu, retry + trace 'retain-on-failure-and-retries', quarantine có SLA, đo flake rate và chính sách cấp tổ chức. Kèm góc phỏng vấn.",
    en: "Treat flakiness as an operations problem: five root-cause groups, web-first auto-waiting, no hard sleeps, data isolation, retry + trace 'retain-on-failure-and-retries', quarantine with SLA, measuring flake rate and org-level policy. With an interview angle.",
    ja: "フレーキーを運用課題として扱う: 5大原因グループ、ウェブファースト自動待機、ハードsleep廃止、データ分離、リトライ＋trace 'retain-on-failure-and-retries'、SLA付き隔離、フレーキー率測定、組織方針。面接の観点付き。",
  },
  pages: buildDoc(pagesA),
};

// ===========================================================================
// ARTICLE B — Parallel & Sharding
// ===========================================================================

const imgB1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">HAI TRỤC SONG SONG / TWO AXES OF PARALLELISM</text>
<g font-size="12">
  <rect x="24" y="58" width="270" height="200" rx="10" fill="#0f172a" stroke="#334155"/>
  <text x="40" y="82" fill="#7dd3fc" font-weight="800">TRONG 1 MÁY: workers</text>
  <rect x="40" y="96" width="110" height="30" rx="6" fill="#12315e" stroke="#38bdf8"/><text x="52" y="116" fill="#e0f2fe">worker 1</text>
  <rect x="166" y="96" width="110" height="30" rx="6" fill="#12315e" stroke="#38bdf8"/><text x="178" y="116" fill="#e0f2fe">worker 2</text>
  <rect x="40" y="134" width="110" height="30" rx="6" fill="#12315e" stroke="#38bdf8"/><text x="52" y="154" fill="#e0f2fe">worker 3</text>
  <rect x="166" y="134" width="110" height="30" rx="6" fill="#12315e" stroke="#38bdf8"/><text x="178" y="154" fill="#e0f2fe">worker 4</text>
  <text x="40" y="192" fill="#94a3b8">fullyParallel: chia file THÀNH test</text>
  <text x="40" y="212" fill="#94a3b8">= số nhân CPU của runner</text>
  <text x="40" y="238" fill="#94a3b8">giới hạn bởi RAM/CPU 1 máy</text>

  <rect x="326" y="58" width="290" height="200" rx="10" fill="#0f172a" stroke="#334155"/>
  <text x="342" y="82" fill="#c084fc" font-weight="800">NHIỀU MÁY: --shard</text>
  <rect x="342" y="96" width="130" height="30" rx="6" fill="#3b0764" stroke="#c084fc"/><text x="354" y="116" fill="#f3e8ff">máy 1: shard 1/4</text>
  <rect x="486" y="96" width="120" height="30" rx="6" fill="#3b0764" stroke="#c084fc"/><text x="498" y="116" fill="#f3e8ff">máy 2: 2/4</text>
  <rect x="342" y="134" width="130" height="30" rx="6" fill="#3b0764" stroke="#c084fc"/><text x="354" y="154" fill="#f3e8ff">máy 3: shard 3/4</text>
  <rect x="486" y="134" width="120" height="30" rx="6" fill="#3b0764" stroke="#c084fc"/><text x="498" y="154" fill="#f3e8ff">máy 4: 4/4</text>
  <text x="342" y="192" fill="#94a3b8">mỗi máy chạy 1 phần, song song</text>
  <text x="342" y="212" fill="#94a3b8">gộp lại bằng blob report merge</text>
  <text x="342" y="238" fill="#94a3b8">mở rộng gần như tuyến tính theo tiền</text>
</g>`),
  "Hai trục song song: workers trong một máy, shard trải trên nhiều máy CI.",
  "Two axes of parallelism: workers within one machine, shards across many CI machines.",
  "並列の2軸: 1台内のworkerと、複数CIマシンにまたがるshard。"
);

const imgB2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">GỘP BÁO CÁO BLOB / BLOB REPORT MERGE</text>
<g font-size="12">
  <rect x="24" y="60" width="150" height="44" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="40" y="80" fill="#f3e8ff" font-weight="700">shard 1</text><text x="40" y="97" fill="#d8b4fe">blob-1.zip</text>
  <rect x="24" y="118" width="150" height="44" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="40" y="138" fill="#f3e8ff" font-weight="700">shard 2</text><text x="40" y="155" fill="#d8b4fe">blob-2.zip</text>
  <rect x="24" y="176" width="150" height="44" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="40" y="196" fill="#f3e8ff" font-weight="700">shard 3</text><text x="40" y="213" fill="#d8b4fe">blob-3.zip</text>
  <path d="M174 82 C240 82 240 140 300 140" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrB)"/>
  <path d="M174 140 h126" stroke="#64748b" stroke-width="2" marker-end="url(#arrB)"/>
  <path d="M174 198 C240 198 240 140 300 140" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrB)"/>
  <rect x="304" y="112" width="170" height="56" rx="10" fill="#134e4a" stroke="#34d399"/><text x="320" y="136" fill="#d1fae5" font-weight="800">merge-reports</text><text x="320" y="156" fill="#6ee7b7">1 HTML thống nhất</text>
  <path d="M474 140 h40" stroke="#64748b" stroke-width="2" marker-end="url(#arrB)"/>
  <rect x="518" y="112" width="98" height="56" rx="10" fill="#12315e" stroke="#38bdf8"/><text x="534" y="136" fill="#e0f2fe" font-weight="700">report</text><text x="534" y="156" fill="#93c5fd">1 nơi xem</text>
</g>
<defs><marker id="arrB" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>
<text x="24" y="252" fill="#94a3b8" font-size="12">Mỗi shard xuất blob; job merge gộp thành MỘT báo cáo HTML duy nhất.</text>`),
  "Mỗi shard xuất blob report; một job merge gộp thành một HTML thống nhất.",
  "Each shard emits a blob report; a merge job combines them into one unified HTML.",
  "各shardがblobレポートを出力し、mergeジョブが1つの統合HTMLにまとめます。"
);

const pagesB = [
  {
    heading: {
      vi: "1. Vì sao runtime CI là nút thắt của tốc độ phát hành",
      en: "1. Why CI runtime is the bottleneck of release velocity",
      ja: "1. なぜCI実行時間がリリース速度のボトルネックなのか",
    },
    blocks: [
      P(
        "Khi bộ test end-to-end lớn dần, thời gian chạy trở thành nút thắt trực tiếp của tốc độ phát hành. Một bộ ba nghìn test chạy tuần tự có thể mất bốn mươi phút; nhân với hàng trăm pull request mỗi ngày, đội ngũ phải chờ đợi liên tục và vòng phản hồi chậm lại rõ rệt. Chờ CI lâu còn kéo theo hệ quả tâm lý: lập trình viên chuyển việc khác, mất ngữ cảnh, và khi CI đỏ họ phải quay lại nhớ mình đã làm gì. Rút ngắn runtime vì thế không chỉ là tối ưu kỹ thuật mà là đầu tư vào năng suất cả tổ chức.",
        "As an end-to-end suite grows, its runtime becomes a direct bottleneck on release velocity. A three-thousand-test suite run sequentially can take forty minutes; across hundreds of pull requests a day, the team waits constantly and the feedback loop slows markedly. Long CI waits also carry a psychological cost: developers switch tasks, lose context, and when CI turns red they must return and remember what they were doing. Shortening runtime is therefore not just a technical optimization but an investment in the whole organization's productivity.",
        "エンドツーエンドスイートが大きくなると、その実行時間はリリース速度の直接的なボトルネックになります。3,000件を逐次実行すると40分かかることもあり、1日数百のプルリクエストでチームは常に待たされ、フィードバックループが著しく遅くなります。長いCI待機は心理的コストも伴い、開発者は別作業に切り替えて文脈を失い、CIが赤になると戻って何をしていたか思い出す必要があります。実行時間の短縮は単なる技術最適化ではなく、組織全体の生産性への投資です。"
      ),
      P(
        "Playwright cung cấp hai trục song song hoá bổ sung nhau. Trục thứ nhất là chạy song song bên trong một máy qua nhiều worker process, tận dụng nhiều nhân CPU. Trục thứ hai là chia bộ test thành nhiều mảnh (shard) và trải chúng lên nhiều máy CI chạy đồng thời. Kết hợp hai trục, một bộ test bốn mươi phút có thể rút xuống dưới năm phút. Bài viết này đi từ fullyParallel và workers, qua sharding trên nhiều máy, gộp báo cáo blob, cân bằng shard, tới đánh đổi chi phí và tốc độ, cuối cùng là cấu hình GitHub Actions hoàn chỉnh.",
        "Playwright provides two complementary axes of parallelism. The first is running in parallel within one machine across multiple worker processes, exploiting many CPU cores. The second is splitting the suite into shards and spreading them across multiple CI machines running simultaneously. Combining both, a forty-minute suite can drop below five minutes. This article moves from fullyParallel and workers, through sharding across machines, blob report merge, shard balancing, to the cost-versus-speed tradeoff, ending with a complete GitHub Actions configuration.",
        "Playwrightは相互補完する2軸の並列性を提供します。第1軸は複数のワーカープロセスで1台内を並列実行し、多数のCPUコアを活用することです。第2軸はスイートをシャードに分割し、同時稼働する複数のCIマシンに分散させることです。両者を組み合わせると、40分のスイートを5分未満に落とせます。本記事はfullyParallelとworkersから、複数マシンのシャーディング、blobレポートのマージ、シャードの均衡、コスト対速度のトレードオフを経て、完全なGitHub Actions構成で締めくくります。"
      ),
      imgB1,
    ],
  },
  {
    heading: {
      vi: "2. fullyParallel: song song hoá đến từng test",
      en: "2. fullyParallel: parallelizing down to each test",
      ja: "2. fullyParallel: テスト単位までの並列化",
    },
    blocks: [
      P(
        "Mặc định Playwright chạy song song ở mức file: các file khác nhau chạy trên các worker khác nhau, nhưng test trong cùng một file chạy tuần tự. Bật fullyParallel nâng độ hạt lên mức test: mọi test đều có thể chạy song song bất kể nằm trong file nào. Điều này khai thác tối đa số worker và thường là cải thiện lớn nhất. Nhưng nó cũng phơi bày ngay lập tức mọi phụ thuộc ẩn giữa các test — đó chính là lý do bài trước nhấn mạnh cô lập dữ liệu là điều kiện tiên quyết.",
        "By default Playwright parallelizes at file level: different files run on different workers, but tests within one file run sequentially. Enabling fullyParallel raises the granularity to test level: every test can run in parallel regardless of file. This maximally exploits the worker count and is usually the biggest single improvement. But it also immediately exposes any hidden dependencies between tests — precisely why the previous article stressed that data isolation is the prerequisite.",
        "既定でPlaywrightはファイル単位で並列化します。異なるファイルは異なるワーカーで走りますが、同一ファイル内のテストは逐次実行されます。fullyParallelを有効化すると粒度がテスト単位に上がり、ファイルに関係なくすべてのテストが並列実行可能になります。これはワーカー数を最大限活用し、通常最大の単一改善です。しかしテスト間の隠れた依存を即座に露出させます。これがまさに、前の記事でデータ分離が前提条件だと強調した理由です。"
      ),
      CODE(
        "ts",
        `// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,                 // song song đến từng test
  // dev để undefined (auto = số nhân/2); CI cố định để tất định
  workers: process.env.CI ? 4 : undefined,
  // chặn merge nếu ai đó vô tình để .only trong code
  forbidOnly: !!process.env.CI,
});`
      ),
      P(
        "Một lưu ý tinh tế: fullyParallel không có nghĩa là mọi thứ phải song song. Nếu vài test bắt buộc chạy tuần tự — ví dụ thao tác trên một tài nguyên độc quyền — bạn có thể khai báo test.describe.serial cho nhóm đó. Nhưng hãy dùng thật tiết kiệm: mỗi nhóm serial là một điểm nghẽn cản việc mở rộng. Mục tiêu là tối đa hoá phần song song và co nhỏ phần tuần tự tới mức tối thiểu tuyệt đối.",
        "A subtle note: fullyParallel does not mean everything must be parallel. If a few tests must run sequentially — say operating on an exclusive resource — you can declare test.describe.serial for that group. But use it very sparingly: each serial group is a bottleneck that resists scaling. The goal is to maximize the parallel portion and shrink the sequential portion to the absolute minimum.",
        "微妙な注意: fullyParallelはすべてを並列にせよという意味ではありません。数件のテストが逐次実行必須（排他的リソースを操作する等）なら、そのグループにtest.describe.serialを宣言できます。ただし極めて控えめに使ってください。各serialグループはスケールを妨げるボトルネックです。目標は並列部分を最大化し、逐次部分を絶対最小に縮めることです。"
      ),
      TIP(
        "Chạy fullyParallel ngay từ máy dev, đừng để nó chỉ bật ở CI. Máy dev nhiều nhân sẽ phơi bày phụ thuộc ẩn sớm, rẻ hơn nhiều so với debug trên CI.",
        "Run fullyParallel on the dev box, don't leave it CI-only. A multi-core dev machine exposes hidden dependencies early, far cheaper than debugging on CI.",
        "fullyParallelを開発機で走らせ、CI限定にしないでください。多コアの開発機は隠れた依存を早期に露出させ、CIでのデバッグよりはるかに安価です。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Điều chỉnh số workers cho đúng",
      en: "3. Tuning the worker count correctly",
      ja: "3. ワーカー数の適切な調整",
    },
    blocks: [
      P(
        "Số worker là số process chạy test song song trên một máy. Đặt quá thấp thì lãng phí CPU; đặt quá cao thì các process tranh CPU và bộ nhớ, gây chậm ngược và thậm chí flaky do đói tài nguyên. Quy tắc khởi điểm: đặt bằng số nhân CPU cho test nhẹ, hoặc số nhân chia hai cho test nặng nhiều trình duyệt. Trên CI, luôn cố định con số thay vì để auto, vì runner có thể báo số nhân khác nhau và bạn muốn kết quả tất định giữa các lần chạy.",
        "Workers is the number of processes running tests in parallel on one machine. Set it too low and you waste CPU; too high and processes contend for CPU and memory, causing slowdowns and even flakiness from resource starvation. Starting rule: set it to the CPU core count for light tests, or cores divided by two for heavy multi-browser tests. On CI, always fix the number rather than leaving it auto, because runners may report different core counts and you want deterministic results across runs.",
        "workersは1台でテストを並列実行するプロセス数です。低すぎるとCPUを無駄にし、高すぎるとプロセスがCPUとメモリを奪い合い、逆に遅くなりリソース枯渇でフレーキーにもなります。開始の目安: 軽いテストはCPUコア数、重い複数ブラウザテストはコア数の半分に設定します。CIでは常に数値を固定し、autoに任せないでください。ランナーが報告するコア数が異なり得るため、実行間で決定的な結果が欲しいからです。"
      ),
      CODE(
        "bash",
        `# Đo để chọn workers: chạy thử vài mức, so tổng thời gian
npx playwright test --workers=2   # ~ baseline
npx playwright test --workers=4   # thường nhanh hơn rõ
npx playwright test --workers=8   # cẩn thận: có thể chậm ngược nếu đói RAM

# Xem thời gian từng test để phát hiện test 'nặng' kéo cả suite
npx playwright test --reporter=list --reporter=json`
      ),
      WARN(
        "Đặt workers quá cao là nguyên nhân flaky bị bỏ sót: process đói CPU khiến auto-wait chạm timeout dù app vẫn đúng. Nếu tăng workers mà flake rate tăng, hãy giảm lại.",
        "Setting workers too high is an overlooked flaky cause: CPU-starved processes hit auto-wait timeouts even when the app is correct. If raising workers raises flake rate, dial it back.",
        "workersを高くしすぎるのは見落とされがちなフレーキー原因です。CPU不足のプロセスは、アプリが正しくても自動待機のタイムアウトに達します。workersを増やしてフレーキー率が上がるなら、戻してください。"
      ),
      QA(
        "Tăng workers từ 4 lên 8 nhưng tổng thời gian không giảm, thậm chí tăng. Vì sao?",
        "Raising workers from 4 to 8 didn't cut total time, even increased it. Why?",
        "workersを4から8にしたが総時間が減らず、むしろ増加。なぜ？",
        "Rất có thể runner chỉ có 4 nhân thật, nên 8 process phải tranh CPU và context-switch liên tục, làm mỗi test chậm hơn. Ngoài ra RAM có thể cạn khiến trình duyệt bị swap. Giải pháp là khớp workers với số nhân thật, và nếu cần nhanh hơn nữa thì mở rộng ngang bằng sharding trên nhiều máy chứ không nhồi thêm worker vào một máy.",
        "Most likely the runner has only 4 real cores, so 8 processes contend for CPU and context-switch constantly, making each test slower. RAM may also exhaust, causing browser swapping. The fix is to match workers to real cores, and if you need more speed, scale out horizontally with sharding across machines rather than cramming more workers onto one machine.",
        "おそらくランナーの実コアが4つしかなく、8プロセスがCPUを奪い合い頻繁にコンテキストスイッチし、各テストが遅くなります。RAMも枯渇しブラウザがスワップし得ます。対策はworkersを実コアに合わせ、さらに速度が必要なら1台にワーカーを詰め込むのではなく、マシン間シャーディングで水平スケールすることです。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Sharding: trải bộ test lên nhiều máy CI",
      en: "4. Sharding: spreading the suite across many CI machines",
      ja: "4. シャーディング: 複数CIマシンへのスイート分散",
    },
    blocks: [
      P(
        "Song song trong một máy có giới hạn cứng bởi số nhân và bộ nhớ của máy đó. Để vượt qua, ta chia bộ test thành nhiều mảnh và chạy mỗi mảnh trên một máy CI riêng, cùng lúc. Tham số --shard=k/n bảo Playwright chỉ chạy mảnh thứ k trong tổng n mảnh. Nếu bạn có bốn máy và chia thành bốn shard, mỗi máy chạy một phần tư số test song song với ba máy kia, và tổng thời gian gần như chia bốn. Đây là mở rộng ngang, mở khoá tốc độ mà một máy đơn không bao giờ đạt được.",
        "Parallelism within one machine is hard-capped by that machine's cores and memory. To go beyond, we split the suite into shards and run each on a separate CI machine simultaneously. The --shard=k/n flag tells Playwright to run only the k-th of n shards. With four machines and four shards, each machine runs a quarter of the tests in parallel with the other three, and total time roughly divides by four. This is horizontal scaling, unlocking speed a single machine can never reach.",
        "1台内の並列性は、そのマシンのコアとメモリで固く制限されます。それを超えるには、スイートをシャードに分割し、各シャードを別々のCIマシンで同時に走らせます。--shard=k/nフラグはn個中k番目のシャードのみを実行するよう指示します。4台と4シャードなら、各マシンが他3台と並列に4分の1のテストを走らせ、総時間はほぼ4分の1になります。これは水平スケールで、単一マシンでは決して届かない速度を解放します。"
      ),
      CODE(
        "bash",
        `# Mỗi máy CI chạy một shard, song song với các máy khác
# máy 1:
npx playwright test --shard=1/4
# máy 2:
npx playwright test --shard=2/4
# máy 3:
npx playwright test --shard=3/4
# máy 4:
npx playwright test --shard=4/4

# Kết hợp cả hai trục: mỗi máy dùng 4 workers, 4 máy chia 4 shard
# → tổng ~16 luồng song song, runtime chia gần 16 lần.`
      ),
      P(
        "Điểm mấu chốt của sharding là hai trục song song nhân với nhau chứ không cộng. Bốn máy, mỗi máy bốn worker, cho khoảng mười sáu luồng chạy đồng thời. Đây là lý do sharding mở khoá được tốc độ mà tăng worker đơn thuần không làm nổi. Nhưng vì mỗi shard chạy trên một máy tách biệt, chúng tạo ra các báo cáo rời rạc — và ta cần một cơ chế gộp lại thành một cái nhìn thống nhất, chính là blob report merge ở chương sau.",
        "The crux of sharding is that the two parallelism axes multiply rather than add. Four machines, four workers each, gives roughly sixteen concurrent threads. This is why sharding unlocks speed that raising workers alone cannot. But because each shard runs on a separate machine, they produce fragmented reports — and we need a mechanism to merge them into a unified view, which is precisely blob report merge in the next chapter.",
        "シャーディングの要点は、2つの並列軸が加算ではなく乗算されることです。4台×各4ワーカーで約16の同時スレッドになります。これがワーカー増だけでは届かない速度をシャーディングが解放する理由です。しかし各シャードは別マシンで走るため、断片化したレポートを生成します。それらを統合ビューにまとめる仕組みが必要で、それが次章のblobレポートマージです。"
      ),
      NOTE(
        "Sharding của Playwright chia theo test một cách tất định dựa trên thứ tự, nên cùng một n luôn cho cùng cách chia — thuận tiện để tái hiện.",
        "Playwright's sharding splits by test deterministically based on order, so the same n always yields the same split — convenient for reproduction.",
        "Playwrightのシャーディングは順序に基づき決定的にテストを分割するため、同じnは常に同じ分割になり、再現に便利です。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Gộp báo cáo bằng blob report merge",
      en: "5. Merging results with the blob report",
      ja: "5. blobレポートによる結果のマージ",
    },
    blocks: [
      P(
        "Khi mỗi shard chạy trên một máy riêng, mỗi máy chỉ thấy một phần kết quả. Nếu để nguyên, bạn có bốn báo cáo HTML rời rạc, không ai thấy được bức tranh toàn cảnh. Playwright giải quyết bằng blob reporter: mỗi shard xuất một file blob nén chứa toàn bộ kết quả thô của phần mình. Sau khi tất cả shard xong, một job gộp riêng dùng lệnh merge-reports để hợp nhất các blob thành một báo cáo HTML duy nhất, đầy đủ trace và attachment như thể chạy trên một máy.",
        "When each shard runs on a separate machine, each machine sees only part of the results. Left as is, you have four fragmented HTML reports and nobody sees the whole picture. Playwright solves this with the blob reporter: each shard emits a compressed blob file containing its full raw results. After all shards finish, a separate merge job uses the merge-reports command to combine the blobs into a single HTML report, complete with traces and attachments as if run on one machine.",
        "各シャードが別マシンで走ると、各マシンは結果の一部しか見えません。そのままでは断片化した4つのHTMLレポートになり、誰も全体像を見られません。Playwrightはblobレポーターで解決します。各シャードは自分の完全な生結果を含む圧縮blobファイルを出力します。全シャード完了後、別のマージジョブがmerge-reportsコマンドでblobを統合し、1台で実行したかのようにトレースと添付を備えた単一のHTMLレポートにまとめます。"
      ),
      CODE(
        "bash",
        `# Bước 1: mỗi shard xuất blob thay vì HTML rời
npx playwright test --shard=1/4 --reporter=blob
# → tạo blob-report/report-1.zip (tương tự cho 2/4, 3/4, 4/4)

# Bước 2 (job gộp, chạy SAU khi mọi shard xong): tải tất cả blob rồi merge
npx playwright merge-reports --reporter=html ./all-blob-reports
# → sinh MỘT playwright-report/ thống nhất, đủ trace + attachment`
      ),
      imgB2,
      P(
        "Cơ chế blob merge quan trọng vì nó tách rời việc chạy và việc báo cáo. Các shard chỉ cần sinh dữ liệu thô nhanh nhất có thể; việc dựng báo cáo đẹp để về sau. Nhờ đó bạn có tốc độ của mở rộng ngang mà vẫn giữ trải nghiệm xem báo cáo như một khối liền mạch: một trang HTML, một chỗ tìm test đỏ, một nơi mở trace. Không có blob merge, sharding sẽ đánh đổi tốc độ lấy sự hỗn loạn trong báo cáo, một cái giá không đáng.",
        "The blob merge mechanism matters because it decouples running from reporting. Shards need only produce raw data as fast as possible; building the pretty report is deferred. This gives you horizontal-scaling speed while preserving a seamless report experience: one HTML page, one place to find failing tests, one place to open traces. Without blob merge, sharding would trade speed for reporting chaos — a price not worth paying.",
        "blobマージの仕組みが重要なのは、実行とレポート作成を分離するからです。シャードは生データを可能な限り速く生成するだけでよく、見やすいレポート作成は後回しです。これにより水平スケールの速度を得つつ、1つのHTMLページ、赤いテストを探す1か所、トレースを開く1か所というシームレスなレポート体験を保てます。blobマージなしでは、シャーディングは速度とレポートの混乱を引き換えにし、割に合いません。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Cân bằng shard: đừng để một máy thành nút thắt",
      en: "6. Balancing shards: don't let one machine bottleneck",
      ja: "6. シャードの均衡: 1台をボトルネックにしない",
    },
    blocks: [
      P(
        "Tổng thời gian của một lần chạy sharded bằng thời gian của shard chậm nhất, không phải trung bình. Nếu ba shard xong trong hai phút mà shard thứ tư mất bảy phút vì trúng toàn test nặng, cả pipeline vẫn phải chờ bảy phút. Vì thế cân bằng shard là bài toán trọng yếu. Playwright chia theo số lượng test, nhưng test không đều về thời lượng: một test upload file lớn có thể lâu gấp mười lần một test kiểm tra label. Cân bằng theo thời lượng thực tế mới thật sự tối ưu.",
        "The total time of a sharded run equals the slowest shard's time, not the average. If three shards finish in two minutes but the fourth takes seven because it drew all the heavy tests, the whole pipeline still waits seven minutes. So shard balancing is a critical problem. Playwright splits by test count, but tests are uneven in duration: a large-file-upload test can be ten times longer than a label-check test. Balancing by actual duration is what truly optimizes.",
        "シャード実行の総時間は、平均ではなく最も遅いシャードの時間に等しくなります。3つのシャードが2分で終わっても、4つ目が重いテストを引いて7分かかれば、パイプライン全体は7分待ちます。ゆえにシャードの均衡は重要な課題です。Playwrightはテスト数で分割しますが、テストの所要時間は不均一で、大きなファイルのアップロードテストはラベル確認テストの10倍かかり得ます。実際の所要時間で均衡させることが真の最適化です。"
      ),
      UL(
        [
          "Đo thời lượng từng test qua vài lần chạy để biết test nào nặng.",
          "Tăng số shard nếu một shard luôn chậm — chia nhỏ hơn giúp phân tán test nặng.",
          "Tách test rất nặng (video, upload lớn) thành job riêng để không kéo shard chung.",
          "Dùng công cụ chia theo thời lượng (test sharding có trọng số) nếu nền CI hỗ trợ.",
          "Theo dõi 'độ lệch shard' = (shard chậm nhất − nhanh nhất) / trung bình; giữ nhỏ.",
        ],
        [
          "Measure each test's duration over a few runs to know which are heavy.",
          "Increase shard count if one shard is always slow — finer splits disperse heavy tests.",
          "Split very heavy tests (video, large upload) into a separate job so they don't drag a shared shard.",
          "Use duration-weighted splitting tools if your CI platform supports it.",
          "Track 'shard skew' = (slowest − fastest) / average; keep it small.",
        ],
        [
          "各テストの所要時間を数回の実行で測り、重いテストを把握する。",
          "1つのシャードが常に遅いならシャード数を増やす — 細かい分割で重いテストが分散する。",
          "非常に重いテスト（動画・大容量アップロード）は別ジョブに分け、共有シャードを引きずらせない。",
          "CIプラットフォームが対応するなら所要時間で重み付けした分割ツールを使う。",
          "「シャード偏差」=(最遅−最速)÷平均 を追跡し、小さく保つ。",
        ]
      ),
      SCEN(
        "Một shard luôn chậm gấp ba",
        "One shard consistently three times slower",
        "Một đội thương mại điện tử chia bốn shard nhưng shard số 3 luôn chậm gấp ba vì chứa toàn bộ test checkout với thanh toán thật. Họ phát hiện qua chỉ số độ lệch shard vọt lên. Giải pháp: tách nhóm checkout nặng thành một job riêng chạy song song, và tăng số shard còn lại từ ba lên năm để phân tán đều hơn. Runtime tổng giảm từ bảy phút xuống ba phút. Bài học: cân bằng theo thời lượng, không theo số lượng test.",
        "An e-commerce team split into four shards but shard 3 was always three times slower because it held all checkout tests with real payment. They caught it via a spiking shard-skew metric. The fix: split the heavy checkout group into its own parallel job, and raise the remaining shards from three to five for more even dispersion. Total runtime fell from seven minutes to three. Lesson: balance by duration, not by test count.",
        "あるEC企業は4シャードに分割したが、実決済を伴う全チェックアウトテストを含むシャード3が常に3倍遅くなりました。急上昇したシャード偏差指標で気づきました。対策: 重いチェックアウト群を独立した並列ジョブに分け、残りのシャードを3から5に増やして均等に分散させました。総実行時間は7分から3分に減りました。教訓: テスト数ではなく所要時間で均衡させること。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Fixtures và setup phạm vi worker",
      en: "7. Fixtures and worker-scoped setup",
      ja: "7. フィクスチャとworkerスコープのセットアップ",
    },
    blocks: [
      P(
        "Khi chạy song song, phần thiết lập tốn kém — như đăng nhập, tạo dữ liệu nền — không nên lặp lại cho từng test vì sẽ nhân chi phí lên hàng nghìn lần. Playwright cho phép fixture phạm vi worker: nó chạy một lần cho mỗi worker process rồi chia sẻ cho mọi test mà worker đó xử lý. Ví dụ, đăng nhập một lần cho mỗi worker và tái dùng phiên là mẫu rất phổ biến. Nhưng phải cẩn thận: state chia sẻ ở mức worker vẫn phải bất biến hoặc chỉ đọc, nếu không sẽ tái tạo đúng vấn đề dùng chung dữ liệu.",
        "When running in parallel, expensive setup — like logging in or seeding baseline data — should not repeat per test, as that multiplies cost thousands of times. Playwright supports worker-scoped fixtures: they run once per worker process and are shared across all tests that worker handles. For example, logging in once per worker and reusing the session is a very common pattern. But be careful: worker-shared state must still be immutable or read-only, otherwise you recreate the very shared-data problem.",
        "並列実行時、ログインや基盤データ投入などの高コストなセットアップは、テストごとに繰り返すべきではありません。コストが数千倍になるからです。Playwrightはworkerスコープのフィクスチャに対応します。ワーカープロセスごとに一度実行され、そのワーカーが扱う全テストで共有されます。例えばワーカーごとに一度ログインしセッションを再利用するのは非常に一般的なパターンです。ただし注意が必要で、ワーカー共有の状態は不変か読み取り専用でなければ、まさにデータ共有問題を再現します。"
      ),
      CODE(
        "ts",
        `import { test as base } from '@playwright/test';

type Worker = { authToken: string };

export const test = base.extend<{}, Worker>({
  // scope 'worker': chạy MỘT lần cho mỗi worker, chia sẻ cho các test của nó
  authToken: [async ({ request }, use) => {
    const res = await request.post('/api/login', {
      data: { user: 'qa-bot', pass: process.env.QA_PASS },
    });
    const { token } = await res.json();
    await use(token);                 // token CHỈ ĐỌC → an toàn khi chia sẻ
  }, { scope: 'worker' }],
});`
      ),
      P(
        "Ngoài fixture phạm vi worker, Playwright còn có storageState để lưu và tái dùng trạng thái đăng nhập giữa các test. Kết hợp một setup project chạy trước lưu storageState, rồi các test đọc lại, giúp bỏ hoàn toàn bước đăng nhập lặp. Với bộ test lớn, riêng việc này có thể tiết kiệm vài phút. Điểm cần nhớ là mọi tối ưu chia sẻ đều đánh đổi bằng nguy cơ ghép nối; hãy chỉ chia sẻ thứ bất biến và cô lập mọi thứ có thể thay đổi.",
        "Beyond worker-scoped fixtures, Playwright has storageState to save and reuse login state between tests. Combining a setup project that runs first and saves storageState, then tests that read it back, eliminates the repeated login step entirely. For a large suite this alone can save several minutes. The key is that every sharing optimization trades off coupling risk; share only what's immutable and isolate everything that can change.",
        "workerスコープのフィクスチャに加え、Playwrightにはテスト間でログイン状態を保存・再利用するstorageStateがあります。最初に走ってstorageStateを保存するsetupプロジェクトと、それを読み戻すテストを組み合わせると、繰り返しのログイン手順を完全に排除できます。大規模スイートではこれだけで数分節約できます。要点は、あらゆる共有最適化は結合リスクとの引き換えであり、不変なものだけを共有し、変わり得るものはすべて分離することです。"
      ),
      TIP(
        "storageState + setup project là combo kinh điển để bỏ đăng nhập lặp. Nhưng nhớ làm mới token nếu suite chạy lâu hơn thời hạn token.",
        "storageState + a setup project is the classic combo to drop repeated logins. But refresh the token if the suite runs longer than the token's lifetime.",
        "storageState＋setupプロジェクトは繰り返しログインを排除する定番の組み合わせです。ただしスイートがトークン有効期限より長く走るならトークンを更新してください。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Dependencies và projects: sắp xếp thứ tự thông minh",
      en: "8. Dependencies and projects: ordering intelligently",
      ja: "8. 依存とプロジェクト: 賢い順序付け",
    },
    blocks: [
      P(
        "Playwright tổ chức test theo project — mỗi project là một cấu hình chạy, thường ứng với một trình duyệt như Chromium, Firefox, WebKit. Nhưng project còn dùng để dựng quan hệ phụ thuộc: bạn có thể khai báo một project 'setup' chạy trước, rồi các project test phụ thuộc vào nó. Điều này cho phép chạy bước thiết lập tốn kém (tạo tài khoản, seed dữ liệu, lưu storageState) đúng một lần trước khi toàn bộ test song song bắt đầu, thay vì lặp trong từng test.",
        "Playwright organizes tests into projects — each project is a run configuration, often tied to a browser like Chromium, Firefox, WebKit. But projects also express dependency relationships: you can declare a 'setup' project that runs first, then test projects that depend on it. This lets an expensive setup step (creating accounts, seeding data, saving storageState) run exactly once before all parallel tests begin, instead of repeating in each test.",
        "Playwrightはテストをプロジェクト単位で整理します。各プロジェクトは実行構成で、多くはChromium・Firefox・WebKitなどのブラウザに対応します。しかしプロジェクトは依存関係も表現でき、最初に走る「setup」プロジェクトを宣言し、それに依存するテストプロジェクトを置けます。これにより高コストなセットアップ手順（アカウント作成、データ投入、storageState保存）を、各テストで繰り返す代わりに、全並列テスト開始前に正確に一度だけ実行できます。"
      ),
      CODE(
        "ts",
        `// playwright.config.ts — project setup chạy trước, các test phụ thuộc
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  projects: [
    { name: 'setup', testMatch: /global\\.setup\\.ts/ },
    {
      name: 'chromium',
      dependencies: ['setup'],          // chờ setup xong mới chạy
      use: { storageState: '.auth/user.json' },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      use: { browserName: 'firefox', storageState: '.auth/user.json' },
    },
  ],
});`
      ),
      P(
        "Quan hệ phụ thuộc giữa các project vừa giúp đúng thứ tự, vừa mở ra cấu trúc pipeline gọn gàng: một project smoke nhanh chạy trước làm cổng, nếu đỏ thì dừng sớm, khỏi tốn máy cho phần còn lại. Ngược lại, một project teardown chạy sau cùng để dọn dữ liệu chung. Kết hợp projects, dependencies và sharding cho bạn một pipeline vừa nhanh vừa có kỷ luật: setup một lần, test song song trải shard, teardown dọn sạch, tất cả gộp về một báo cáo.",
        "Project dependencies both enforce ordering and enable a clean pipeline structure: a fast smoke project runs first as a gate, and if it's red you stop early, saving machines for the rest. Conversely, a teardown project runs last to clean shared data. Combining projects, dependencies and sharding gives a pipeline that's both fast and disciplined: set up once, run tests in parallel across shards, tear down cleanly, all merged into one report.",
        "プロジェクト依存は順序を強制すると同時に、整然としたパイプライン構造を可能にします。高速なスモークプロジェクトを最初にゲートとして走らせ、赤なら早期停止して残りのマシンを節約します。逆にteardownプロジェクトを最後に走らせ共有データを掃除します。プロジェクト・依存・シャーディングを組み合わせると、速くて規律あるパイプラインになります。一度セットアップし、シャードにまたがり並列にテストし、きれいにteardownし、すべてを1つのレポートにまとめます。"
      ),
      NOTE(
        "Dùng project 'setup' + storageState là cách chính thức của Playwright để đăng nhập một lần. Nó chạy trước nhờ dependencies, không phải nhờ tên file may rủi.",
        "A 'setup' project + storageState is Playwright's official way to log in once. It runs first via dependencies, not by lucky file naming.",
        "「setup」プロジェクト＋storageStateはPlaywright公式の一度だけログインする方法です。ファイル名の偶然ではなく、依存によって最初に走ります。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Đánh đổi chi phí và tốc độ",
      en: "9. The cost-versus-speed tradeoff",
      ja: "9. コスト対速度のトレードオフ",
    },
    blocks: [
      P(
        "Sharding không miễn phí: mỗi máy CI thêm vào là chi phí thực. Nếu chia bốn shard, bạn dùng gấp bốn phút-máy so với chạy tuần tự — nhưng đổi lại thời gian chờ chia bốn. Cân nhắc cốt lõi là giá trị của thời gian kỹ sư so với chi phí máy. Với đội đông và phát hành liên tục, mỗi phút CI tiết kiệm nhân với hàng trăm lần chạy mỗi ngày thường lớn hơn nhiều chi phí máy thêm. Nhưng phải có điểm dừng: chia mười sáu shard cho bộ test hai phút thì chi phí khởi động máy nuốt hết lợi ích.",
        "Sharding isn't free: each added CI machine is real cost. Split into four shards and you use four times the machine-minutes versus sequential — but wait time divides by four. The core consideration is the value of engineer time against machine cost. For a large team shipping continuously, each CI minute saved times hundreds of runs a day usually far exceeds the extra machine cost. But there's a stopping point: sixteen shards for a two-minute suite means machine startup overhead eats the benefit.",
        "シャーディングは無料ではありません。追加する各CIマシンは実コストです。4シャードに分ければ逐次実行の4倍のマシン分を使いますが、待ち時間は4分の1になります。核心の検討は、エンジニアの時間の価値対マシンコストです。継続的に出荷する大規模チームでは、節約した各CI分×1日数百回の実行が、通常は追加マシンコストをはるかに上回ります。しかし止め時があります。2分のスイートに16シャードでは、マシン起動オーバーヘッドが利益を食い潰します。"
      ),
      UL(
        [
          "Phút-máy tổng ≈ không đổi khi shard (bỏ qua overhead); thời gian chờ mới giảm.",
          "Mỗi máy CI có overhead khởi động (cài phụ thuộc, tải trình duyệt) — cache để giảm.",
          "Điểm ngọt thường là 2–8 shard; quá nhiều thì overhead lấn lợi ích.",
          "Tính điểm hoà vốn: (thời gian tiết kiệm × số lần chạy × chi phí kỹ sư) so với chi phí máy.",
          "Cache node_modules và trình duyệt Playwright để mỗi shard khởi động nhanh.",
        ],
        [
          "Total machine-minutes ≈ constant under sharding (ignoring overhead); only wait time drops.",
          "Each CI machine has startup overhead (installing deps, downloading browsers) — cache to reduce it.",
          "The sweet spot is usually 2–8 shards; too many and overhead overtakes the benefit.",
          "Compute break-even: (time saved × runs × engineer cost) versus machine cost.",
          "Cache node_modules and Playwright browsers so each shard starts fast.",
        ],
        [
          "総マシン分はシャーディングでもほぼ一定（オーバーヘッド除く）で、待ち時間だけ減る。",
          "各CIマシンには起動オーバーヘッド（依存インストール、ブラウザDL）があり、キャッシュで軽減する。",
          "スイートスポットは通常2〜8シャードで、多すぎるとオーバーヘッドが利益を上回る。",
          "損益分岐を計算する: (節約時間×実行回数×エンジニアコスト)対マシンコスト。",
          "node_modulesとPlaywrightブラウザをキャッシュし、各シャードを高速起動させる。",
        ]
      ),
      QA(
        "Sếp hỏi vì sao nên trả tiền cho bốn máy CI thay vì một. Bạn giải thích thế nào?",
        "Your boss asks why pay for four CI machines instead of one. How do you explain?",
        "上司が1台でなく4台のCIに払う理由を尋ねます。どう説明しますか？",
        "Tôi quy ra tiền: bộ test chạy tuần tự tốn 40 phút, sharded còn 10 phút, tiết kiệm 30 phút mỗi lần. Với 100 lần chạy mỗi ngày và 20 kỹ sư chờ, đó là hàng chục giờ công mỗi ngày. Chi phí bốn máy CI nhỏ hơn nhiều giá trị đó, chưa kể vòng phản hồi nhanh giảm lỗi lọt và tăng nhịp phát hành. Tôi kèm điểm hoà vốn cụ thể để quyết định dựa trên số liệu.",
        "I translate it to money: the suite takes 40 minutes sequentially, 10 minutes sharded, saving 30 minutes per run. At 100 runs a day and 20 engineers waiting, that's dozens of person-hours daily. The cost of four CI machines is far below that value, plus the faster feedback loop reduces escaped bugs and raises release cadence. I include a concrete break-even so the decision rests on numbers.",
        "私は金額に換算します。スイートは逐次で40分、シャードで10分になり、実行ごとに30分節約します。1日100回の実行と20人のエンジニアが待つなら、毎日数十人時間です。4台のCIコストはその価値をはるかに下回り、さらに速いフィードバックループが漏れバグを減らしリリース頻度を上げます。数値で判断できるよう具体的な損益分岐を添えます。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Cấu hình GitHub Actions với ma trận shard",
      en: "10. GitHub Actions config with a shard matrix",
      ja: "10. シャードマトリックス付きGitHub Actions構成",
    },
    blocks: [
      P(
        "Bây giờ ta ghép mọi thứ thành một pipeline thật trên GitHub Actions. Ý tưởng: dùng ma trận (matrix) để nhân bản một job thành bốn, mỗi bản chạy một shard với biến shardIndex và shardTotal. Mỗi job xuất blob report và tải lên artifact. Một job merge chạy sau, tải toàn bộ blob về, gộp thành báo cáo HTML thống nhất và đăng lên. Cấu hình dưới đây là mẫu sản xuất tối giản nhưng đầy đủ, có cache trình duyệt để mỗi shard khởi động nhanh.",
        "Now we assemble everything into a real GitHub Actions pipeline. The idea: use a matrix to fan a single job into four, each running one shard via shardIndex and shardTotal variables. Each job emits a blob report and uploads it as an artifact. A merge job runs afterward, downloads all blobs, combines them into a unified HTML report and publishes it. The config below is a minimal but complete production template, with browser caching so each shard starts fast.",
        "ここですべてを実際のGitHub Actionsパイプラインに組み立てます。発想は、マトリックスで単一ジョブを4つに展開し、各々がshardIndexとshardTotal変数で1シャードを走らせることです。各ジョブはblobレポートを出力しアーティファクトとしてアップロードします。後続のmergeジョブが全blobをダウンロードし、統合HTMLレポートにまとめて公開します。以下の構成は最小だが完全な本番テンプレートで、各シャードが高速起動するようブラウザキャッシュ付きです。"
      ),
      CODE(
        "yaml",
        `# .github/workflows/e2e.yml
name: Playwright E2E
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false                 # 1 shard đỏ không huỷ các shard khác
      matrix:
        shard: [1, 2, 3, 4]            # 4 máy chạy song song
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - name: Cache Playwright browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: pw-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
      - run: npx playwright install --with-deps chromium
      - name: Run shard \${{ matrix.shard }}/4
        run: npx playwright test --shard=\${{ matrix.shard }}/4 --reporter=blob
      - name: Upload blob report
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-\${{ matrix.shard }}
          path: blob-report/
          retention-days: 3

  merge:
    if: always()                       # gộp cả khi có shard đỏ, để thấy toàn cảnh
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - name: Download all blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - name: Merge into one HTML report
        run: npx playwright merge-reports --reporter=html ./all-blob-reports
      - name: Upload merged HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14`
      ),
      WARN(
        "Đặt fail-fast: false — nếu để mặc định true, một shard đỏ sẽ huỷ các shard đang chạy và bạn mất báo cáo đầy đủ của lần đó.",
        "Set fail-fast: false — if left at the default true, one red shard cancels the running shards and you lose a full report for that run.",
        "fail-fast: false を設定してください。既定のtrueのままだと、1シャードの赤が実行中のシャードを取り消し、その回の完全なレポートを失います。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Ma trận trình duyệt và phân tầng test",
      en: "11. Browser matrix and test tiering",
      ja: "11. ブラウザマトリックスとテストの階層化",
    },
    blocks: [
      P(
        "Ma trận trong GitHub Actions không chỉ dùng cho shard mà còn cho tổ hợp trình duyệt. Bạn có thể nhân shard với browser để chạy toàn bộ suite trên Chromium, Firefox và WebKit song song. Nhưng chạy đủ mọi tổ hợp cho mọi pull request thường quá tốn. Chiến lược phân tầng phổ biến: pull request chỉ chạy Chromium sharded cho phản hồi nhanh; nhánh chính và lịch đêm mới chạy đủ ma trận đa trình duyệt. Cách này cân bằng giữa tốc độ hằng ngày và độ phủ toàn diện.",
        "The matrix in GitHub Actions serves not only sharding but also browser combinations. You can multiply shard by browser to run the whole suite on Chromium, Firefox and WebKit in parallel. But running every combination for every pull request is usually too costly. A common tiering strategy: pull requests run only Chromium sharded for fast feedback; the main branch and nightly schedules run the full multi-browser matrix. This balances daily speed against comprehensive coverage.",
        "GitHub Actionsのマトリックスはシャーディングだけでなくブラウザの組み合わせにも使えます。シャード×ブラウザで、スイート全体をChromium・Firefox・WebKitで並列実行できます。しかし全組み合わせを全プルリクエストで走らせるのは通常高コストすぎます。一般的な階層化戦略: プルリクエストは高速フィードバックのためChromiumのシャードのみ、メインブランチと夜間スケジュールで完全な複数ブラウザマトリックスを走らせます。これで日々の速度と包括的カバレッジを均衡させます。"
      ),
      CODE(
        "yaml",
        `# Phân tầng: PR nhanh (Chromium), lịch đêm đủ ma trận
on:
  pull_request:
  schedule:
    - cron: '0 18 * * *'               # 01:00 giờ VN mỗi đêm

jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]
        # PR: chỉ chromium; đêm (schedule): thêm firefox, webkit
        browser: \${{ github.event_name == 'schedule' && fromJSON('["chromium","firefox","webkit"]') || fromJSON('["chromium"]') }}
    steps:
      - run: npx playwright test --project=\${{ matrix.browser }} --shard=\${{ matrix.shard }}/4 --reporter=blob`
      ),
      P(
        "Phân tầng còn áp dụng cho chính nội dung test, không chỉ trình duyệt. Một smoke suite mỏng gồm vài chục test đường-hạnh-phúc quan trọng nhất chạy trước làm cổng nhanh; nếu smoke đỏ thì dừng, khỏi tốn máy cho phần còn lại. Bộ đầy đủ chạy sau khi smoke xanh. Kết hợp phân tầng test với sharding và ma trận trình duyệt cho bạn một chiến lược CI đa lớp: nhanh khi cần nhanh, đầy đủ khi cần chắc chắn.",
        "Tiering also applies to the test content itself, not just browsers. A thin smoke suite of the few dozen most important happy-path tests runs first as a fast gate; if smoke is red you stop, saving machines for the rest. The full suite runs after smoke is green. Combining test tiering with sharding and the browser matrix gives a layered CI strategy: fast when you need fast, thorough when you need certainty.",
        "階層化はブラウザだけでなくテスト内容自体にも適用されます。最重要のハッピーパステスト数十件からなる薄いスモークスイートを最初に高速ゲートとして走らせ、スモークが赤なら停止して残りのマシンを節約します。スモークが緑になってから完全スイートを走らせます。テスト階層化をシャーディングとブラウザマトリックスと組み合わせると、層状のCI戦略になります。速さが必要なときは速く、確実さが必要なときは徹底的に。"
      ),
      TIP(
        "Dùng fromJSON kết hợp biểu thức để đổi ma trận theo sự kiện (PR vs schedule) — một workflow phục vụ cả phản hồi nhanh lẫn độ phủ đêm.",
        "Use fromJSON with an expression to vary the matrix by event (PR vs schedule) — one workflow serving both fast feedback and nightly coverage.",
        "fromJSONと式を組み合わせてイベント（PR対schedule）でマトリックスを変えます。1つのワークフローが高速フィードバックと夜間カバレッジの両方を担います。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Chẩn đoán và tinh chỉnh runtime",
      en: "12. Diagnosing and tuning runtime",
      ja: "12. 実行時間の診断とチューニング",
    },
    blocks: [
      P(
        "Sau khi dựng pipeline sharded, việc còn lại là chẩn đoán và tinh chỉnh liên tục. Bạn cần biết mỗi shard mất bao lâu, test nào nặng nhất, và overhead khởi động chiếm bao nhiêu. Báo cáo HTML đã gộp cho thấy thời lượng từng test; từ đó bạn xác định các test đứng đầu về thời gian và cân nhắc tối ưu chúng riêng — có thể một test đang chờ mù, một test khác có thể mock network để nhanh hơn. Tinh chỉnh runtime là vòng lặp: đo, tìm điểm nghẽn, sửa, đo lại.",
        "After building a sharded pipeline, the remaining work is continuous diagnosis and tuning. You need to know how long each shard takes, which tests are heaviest, and how much startup overhead costs. The merged HTML report shows per-test durations; from there you identify the top time-consuming tests and consider optimizing them individually — maybe one is blindly waiting, another could mock the network to run faster. Tuning runtime is a loop: measure, find the bottleneck, fix, measure again.",
        "シャードパイプラインを構築した後の残作業は、継続的な診断とチューニングです。各シャードの所要時間、最も重いテスト、起動オーバーヘッドのコストを知る必要があります。統合HTMLレポートはテストごとの所要時間を示します。そこから時間を食う上位テストを特定し、個別に最適化を検討します。あるテストは盲目的に待機し、別のはネットワークをモックして高速化できるかもしれません。実行時間のチューニングはループです。測定し、ボトルネックを見つけ、修正し、再測定します。"
      ),
      IMG(
        frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">GIẢI PHẪU MỘT LẦN CHẠY SHARDED / ANATOMY OF A SHARDED RUN</text>
<g font-size="12">
  <text x="24" y="66" fill="#94a3b8">shard 1</text>
  <rect x="90" y="54" width="60" height="18" rx="4" fill="#334155"/><text x="98" y="67" fill="#cbd5e1">setup</text>
  <rect x="152" y="54" width="150" height="18" rx="4" fill="#12315e"/><text x="160" y="67" fill="#93c5fd">tests</text>
  <text x="24" y="98" fill="#94a3b8">shard 2</text>
  <rect x="90" y="86" width="60" height="18" rx="4" fill="#334155"/><text x="98" y="99" fill="#cbd5e1">setup</text>
  <rect x="152" y="86" width="120" height="18" rx="4" fill="#12315e"/><text x="160" y="99" fill="#93c5fd">tests</text>
  <text x="24" y="130" fill="#94a3b8">shard 3</text>
  <rect x="90" y="118" width="60" height="18" rx="4" fill="#334155"/><text x="98" y="131" fill="#cbd5e1">setup</text>
  <rect x="152" y="118" width="210" height="18" rx="4" fill="#7c2d12"/><text x="160" y="131" fill="#fdba74">tests (nặng — nút thắt)</text>
  <text x="24" y="162" fill="#94a3b8">shard 4</text>
  <rect x="90" y="150" width="60" height="18" rx="4" fill="#334155"/><text x="98" y="163" fill="#cbd5e1">setup</text>
  <rect x="152" y="150" width="140" height="18" rx="4" fill="#12315e"/><text x="160" y="163" fill="#93c5fd">tests</text>
  <line x1="363" y1="44" x2="363" y2="176" stroke="#f87171" stroke-dasharray="4 4"/><text x="370" y="120" fill="#fca5a5">tổng = shard chậm nhất</text>
  <rect x="90" y="196" width="272" height="20" rx="4" fill="#134e4a"/><text x="100" y="211" fill="#6ee7b7">merge-reports → 1 HTML</text>
</g>
<text x="24" y="252" fill="#94a3b8" font-size="12">Tổng thời gian = shard chậm nhất + merge. Rút gọn shard nặng để giảm nút thắt.</text>`),
        "Giải phẫu một lần chạy sharded: tổng thời gian bằng shard chậm nhất cộng bước merge.",
        "Anatomy of a sharded run: total time equals the slowest shard plus the merge step.",
        "シャード実行の解剖: 総時間は最も遅いシャード＋mergeステップに等しい。"
      ),
      QA(
        "Runtime CI đã tốt nhưng thỉnh thoảng có lần chạy chậm bất thường. Bạn điều tra thế nào?",
        "CI runtime is good but occasionally a run is abnormally slow. How do you investigate?",
        "CI実行時間は良好だが時々異常に遅い実行がある。どう調査しますか？",
        "Tôi so báo cáo của lần chậm với lần bình thường theo từng shard để tìm shard lệch. Nếu một shard bất ngờ chậm, thường là do một test retry (kéo theo trace) hoặc runner nào đó bị đói tài nguyên. Tôi kiểm log khởi động xem overhead cache có miss không, và xem có test nào vừa thêm rơi vào shard đó làm mất cân bằng. Dữ liệu thời lượng từng test trong báo cáo gộp là điểm bắt đầu.",
        "I compare the slow run's report against a normal run per shard to find the skewed shard. If one shard is unexpectedly slow, it's usually a retried test (dragging traces) or a resource-starved runner. I check startup logs for a cache miss, and whether a newly added test landed in that shard and unbalanced it. The per-test durations in the merged report are the starting point.",
        "遅い実行のレポートを通常実行とシャードごとに比較し、偏ったシャードを探します。あるシャードが予想外に遅ければ、通常はリトライされたテスト（トレースを引きずる）かリソース枯渇のランナーです。起動ログでキャッシュミスを確認し、新規追加テストがそのシャードに入り不均衡にしたかを見ます。統合レポートのテストごとの所要時間が出発点です。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Tổng kết và góc phỏng vấn",
      en: "13. Summary and the interview angle",
      ja: "13. まとめと面接の観点",
    },
    blocks: [
      P(
        "Tối ưu runtime CI của Playwright dựa trên hai trục nhân nhau: workers trong một máy và shard trải nhiều máy. Bật fullyParallel để song song đến từng test, chọn số workers khớp số nhân thật, chia shard để mở rộng ngang, gộp lại bằng blob report merge để giữ một báo cáo thống nhất. Cân bằng shard theo thời lượng, dùng fixtures phạm vi worker và project setup để bỏ thiết lập lặp, và cân nhắc chi phí so tốc độ một cách có số liệu. Cuối cùng, một workflow GitHub Actions với ma trận shard biến tất cả thành pipeline chạy được, phân tầng theo PR và lịch đêm.",
        "Optimizing Playwright's CI runtime rests on two multiplying axes: workers within a machine and shards across machines. Enable fullyParallel to parallelize down to each test, pick a worker count matching real cores, shard to scale horizontally, merge with blob report merge to keep one unified report. Balance shards by duration, use worker-scoped fixtures and a setup project to drop repeated setup, and weigh cost versus speed with numbers. Finally, a GitHub Actions workflow with a shard matrix turns it all into a runnable pipeline, tiered by PR and nightly schedule.",
        "PlaywrightのCI実行時間の最適化は、乗算される2軸に基づきます。1台内のワーカーとマシン間のシャードです。fullyParallelを有効化しテスト単位まで並列化し、実コアに合うワーカー数を選び、シャードで水平スケールし、blobレポートマージで1つの統合レポートを保ちます。シャードを所要時間で均衡させ、workerスコープのフィクスチャとsetupプロジェクトで繰り返しセットアップを排除し、コスト対速度を数値で比較します。最後に、シャードマトリックス付きのGitHub Actionsワークフローが、PRと夜間スケジュールで階層化された実行可能パイプラインにまとめます。"
      ),
      H("Câu hỏi phỏng vấn thường gặp", "Common interview questions", "よくある面接質問"),
      QA(
        "Phân biệt workers và shard trong Playwright.",
        "Distinguish workers from shards in Playwright.",
        "Playwrightのworkersとshardを区別してください。",
        "Workers là số process chạy test song song trong MỘT máy, giới hạn bởi nhân CPU và RAM máy đó. Shard là chia bộ test thành nhiều phần trải lên NHIỀU máy CI chạy đồng thời, mở rộng ngang không giới hạn bởi một máy. Hai trục nhân nhau: bốn máy mỗi máy bốn worker cho mười sáu luồng. Workers khai thác một máy, shard khai thác nhiều máy.",
        "Workers is the number of processes running tests in parallel within ONE machine, capped by that machine's CPU cores and RAM. Shards split the suite into parts spread across MANY CI machines running simultaneously, scaling horizontally beyond one machine. The two axes multiply: four machines with four workers each gives sixteen threads. Workers exploit one machine; shards exploit many.",
        "workersは1台内でテストを並列実行するプロセス数で、そのマシンのCPUコアとRAMで制限されます。shardはスイートを複数部分に分け、同時稼働する複数のCIマシンに分散させ、1台を超えて水平スケールします。2軸は乗算され、4台×各4ワーカーで16スレッドになります。workersは1台を、shardは複数台を活用します。"
      ),
      QA(
        "Bật fullyParallel xong nhiều test đỏ mà trước đó xanh. Chuyện gì xảy ra?",
        "After enabling fullyParallel many tests went red that were green before. What happened?",
        "fullyParallel有効化後、以前は緑だった多くのテストが赤に。何が起きた？",
        "fullyParallel phơi bày phụ thuộc ẩn: trước đây các test chạy tuần tự nên vô tình dựa vào state của nhau hoặc dùng chung dữ liệu, giờ chạy song song thì giẫm chân nhau. Đây không phải lỗi của fullyParallel mà là nó bộc lộ nợ có sẵn. Cách sửa là cô lập dữ liệu từng test qua fixtures, sinh dữ liệu duy nhất theo testId, và dọn ở teardown. Cô lập là điều kiện tiên quyết của song song tất định.",
        "fullyParallel exposes hidden dependencies: previously the tests ran sequentially and inadvertently relied on each other's state or shared data; now running in parallel they collide. This isn't fullyParallel's fault — it reveals pre-existing debt. The fix is per-test data isolation via fixtures, generating unique data by testId, and cleaning up in teardown. Isolation is the prerequisite of deterministic parallelism.",
        "fullyParallelは隠れた依存を露出させます。以前は逐次実行で、テストが互いの状態に依存したりデータを共有したりしていたのが、並列実行で衝突します。これはfullyParallelの欠陥ではなく、既存の負債を明らかにします。対策はフィクスチャによるテストごとのデータ分離、testIdで一意のデータ生成、teardownでの後片付けです。分離は決定的並列の前提条件です。"
      ),
      NOTE(
        "Thông điệp mang vào phỏng vấn: tốc độ CI đến từ nhân hai trục song song, còn độ tin cậy đến từ cô lập dữ liệu. Nói được cả tốc độ lẫn tính tất định sẽ ghi điểm.",
        "Message to bring to interviews: CI speed comes from multiplying two parallelism axes, reliability comes from data isolation. Articulating both speed and determinism scores points.",
        "面接に持ち込むメッセージ: CIの速度は2つの並列軸の乗算から、信頼性はデータ分離から来ます。速度と決定性の両方を語れると評価されます。",
      ),
    ],
  },
];

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-parallel-sharding-ci",
  cover: coverB,
  tags: tags("nangcao", "saas", "playwright", "cicd", "advanced", "experience"),
  title: {
    vi: "Parallel & Sharding: tối ưu runtime CI của Playwright",
    en: "Parallel & Sharding: optimizing Playwright's CI runtime",
    ja: "並列とシャーディング: PlaywrightのCI実行時間の最適化",
  },
  summary: {
    vi: "Hai trục song song nhân nhau: fullyParallel + workers trong một máy, --shard trải nhiều máy CI. Gộp blob report merge, cân bằng shard theo thời lượng, fixtures phạm vi worker, dependencies/projects, đánh đổi chi phí–tốc độ và workflow GitHub Actions với ma trận shard. Kèm góc phỏng vấn.",
    en: "Two multiplying parallelism axes: fullyParallel + workers within a machine, --shard across CI machines. Blob report merge, duration-balanced shards, worker-scoped fixtures, dependencies/projects, the cost-speed tradeoff and a GitHub Actions shard-matrix workflow. With an interview angle.",
    ja: "乗算される2つの並列軸: 1台内のfullyParallel＋workers、複数CIマシンにまたがる--shard。blobレポートマージ、所要時間で均衡させたシャード、workerスコープのフィクスチャ、依存/プロジェクト、コスト対速度、シャードマトリックス付きGitHub Actionsワークフロー。面接の観点付き。",
  },
  pages: buildDoc(pagesB),
};

export const PWLATEST_05 = [artA, artB];
