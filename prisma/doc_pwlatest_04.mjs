// ============================================================================
// PW LATEST 04 — 2 bài chuyên công nghệ (kind=congnghe) cho CyberSoft Tester.
//   A) Codegen + Auto-assertions + CLI/skills mode cho AI coding agent.
//   B) WebAuthn passkeys & Web Storage API testing (Playwright 1.61).
// Trilingual VI/EN/JA thật. Block khớp ArticleViewer & _verify.mjs.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl04a", domain: "saas", kind: "congnghe", label: "CODEGEN · CLI SKILLS" });
const coverB = makeThumb({ id: "pwl04b", domain: "banking", kind: "congnghe", label: "WEBAUTHN · PASSKEY" });

// ---------------------------------------------------------------------------
// IMG helpers (SVG thô, viewBox rộng để render đẹp trong viewer).
// ---------------------------------------------------------------------------
const svgCodegen = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0c4a6e"/>
<rect x="24" y="24" width="180" height="252" rx="10" fill="#0b1220" stroke="#0369a1"/>
<text x="114" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#7dd3fc">1 · RECORD</text>
<rect x="44" y="70" width="140" height="20" rx="4" fill="#155e75"/><text x="54" y="84" font-size="11" fill="#e0f2fe">click "Đăng nhập"</text>
<rect x="44" y="100" width="140" height="20" rx="4" fill="#155e75"/><text x="54" y="114" font-size="11" fill="#e0f2fe">fill email</text>
<rect x="44" y="130" width="140" height="20" rx="4" fill="#155e75"/><text x="54" y="144" font-size="11" fill="#e0f2fe">assert visible</text>
<rect x="230" y="24" width="180" height="252" rx="10" fill="#0b1220" stroke="#0369a1"/>
<text x="320" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#7dd3fc">2 · GENERATE</text>
<text x="250" y="82" font-size="10" fill="#a5f3fc" font-family="monospace">getByRole('button',</text>
<text x="250" y="98" font-size="10" fill="#a5f3fc" font-family="monospace">  {name:'Login'})</text>
<text x="250" y="120" font-size="10" fill="#a5f3fc" font-family="monospace">expect(x).toBeVisible()</text>
<text x="250" y="150" font-size="10" fill="#fca5a5" font-family="monospace">// auto assertion</text>
<rect x="436" y="24" width="180" height="252" rx="10" fill="#0b1220" stroke="#0369a1"/>
<text x="526" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#7dd3fc">3 · REVIEW</text>
<circle cx="470" cy="86" r="10" fill="#052e16"/><path d="M465 86 l4 4 7 -9" stroke="#34d399" stroke-width="2.5" fill="none"/>
<text x="490" y="90" font-size="11" fill="#e0f2fe">stable locator</text>
<circle cx="470" cy="120" r="10" fill="#3f1d1d"/><path d="M465 115 l10 10 M475 115 l-10 10" stroke="#fca5a5" stroke-width="2.5"/>
<text x="490" y="124" font-size="11" fill="#fecaca">xoá nth() giòn</text>
<text x="490" y="160" font-size="11" fill="#e0f2fe">POM + tên hoá</text>
<path d="M204 150 h26" stroke="#7dd3fc" stroke-width="3" marker-end="url(#a)"/>
<path d="M410 150 h26" stroke="#7dd3fc" stroke-width="3" marker-end="url(#a)"/>
<defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7dd3fc"/></marker></defs>
</svg>`;

const svgCliMode = `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="280" fill="#0369a1"/>
<rect x="40" y="40" width="200" height="90" rx="10" fill="#0b1220" stroke="#38bdf8"/>
<text x="140" y="72" text-anchor="middle" font-size="15" font-weight="800" fill="#7dd3fc">AI Coding Agent</text>
<text x="140" y="98" text-anchor="middle" font-size="11" fill="#bae6fd">"Viết test đăng nhập"</text>
<rect x="400" y="40" width="200" height="90" rx="10" fill="#0b1220" stroke="#38bdf8"/>
<text x="500" y="72" text-anchor="middle" font-size="15" font-weight="800" fill="#7dd3fc">Playwright CLI</text>
<text x="500" y="98" text-anchor="middle" font-size="11" fill="#bae6fd">skills mode · ít token</text>
<path d="M240 85 h158" stroke="#38bdf8" stroke-width="3" marker-end="url(#b)"/>
<text x="320" y="76" text-anchor="middle" font-size="10" fill="#e0f2fe">plain-English</text>
<rect x="180" y="180" width="280" height="70" rx="10" fill="#0b1220" stroke="#34d399"/>
<text x="320" y="210" text-anchor="middle" font-size="13" font-weight="800" fill="#6ee7b7">ARIA tree · toBeVisible()</text>
<text x="320" y="232" text-anchor="middle" font-size="11" fill="#a7f3d0">context nhỏ, chính xác cao</text>
<path d="M500 130 L360 178" stroke="#34d399" stroke-width="2.5" marker-end="url(#b)"/>
<defs><marker id="b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#38bdf8"/></marker></defs>
</svg>`;

const svgWebauthn = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<rect x="30" y="60" width="170" height="180" rx="12" fill="#12315e" stroke="#60a5fa"/>
<text x="115" y="92" text-anchor="middle" font-size="14" font-weight="800" fill="#bfdbfe">Test (Playwright)</text>
<text x="115" y="120" text-anchor="middle" font-size="11" fill="#dbeafe">addVirtualAuthenticator</text>
<text x="115" y="140" text-anchor="middle" font-size="11" fill="#dbeafe">ctap2 · internal · uv</text>
<rect x="235" y="60" width="170" height="180" rx="12" fill="#052e16" stroke="#34d399"/>
<text x="320" y="92" text-anchor="middle" font-size="14" font-weight="800" fill="#6ee7b7">Virtual Authenticator</text>
<circle cx="320" cy="150" r="34" fill="#064e3b" stroke="#34d399" stroke-width="3"/>
<path d="M308 150 l8 8 16 -18" stroke="#6ee7b7" stroke-width="4" fill="none" stroke-linecap="round"/>
<text x="320" y="205" text-anchor="middle" font-size="10" fill="#a7f3d0">passkey (private key)</text>
<rect x="440" y="60" width="170" height="180" rx="12" fill="#3b0764" stroke="#c084fc"/>
<text x="525" y="92" text-anchor="middle" font-size="14" font-weight="800" fill="#e9d5ff">Banking WebApp</text>
<text x="525" y="120" text-anchor="middle" font-size="11" fill="#f3e8ff">navigator.credentials</text>
<text x="525" y="140" text-anchor="middle" font-size="11" fill="#f3e8ff">.get() → assertion</text>
<text x="525" y="185" text-anchor="middle" font-size="11" fill="#f3e8ff">verify chữ ký</text>
<path d="M200 150 h35" stroke="#60a5fa" stroke-width="3" marker-end="url(#c)"/>
<path d="M405 150 h35" stroke="#34d399" stroke-width="3" marker-end="url(#c)"/>
<defs><marker id="c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#93c5fd"/></marker></defs>
</svg>`;

const svgRetention = `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="250" fill="#12315e"/>
<text x="320" y="40" text-anchor="middle" font-size="16" font-weight="800" fill="#bfdbfe">Video retention modes</text>
<rect x="40" y="70" width="170" height="140" rx="10" fill="#0b1220" stroke="#60a5fa"/>
<text x="125" y="98" text-anchor="middle" font-size="13" font-weight="700" fill="#93c5fd">retain-on-failure</text>
<circle cx="125" cy="140" r="26" fill="#3f1d1d" stroke="#fca5a5" stroke-width="2"/>
<path d="M115 130 l20 20 M135 130 l-20 20" stroke="#fca5a5" stroke-width="3"/>
<text x="125" y="192" text-anchor="middle" font-size="10" fill="#cbd5e1">chỉ giữ khi fail</text>
<rect x="235" y="70" width="170" height="140" rx="10" fill="#0b1220" stroke="#60a5fa"/>
<text x="320" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#93c5fd">on-first-retry</text>
<circle cx="320" cy="140" r="26" fill="#3a2c05" stroke="#fbbf24" stroke-width="2"/>
<path d="M320 122 a18 18 0 1 1 -13 6" stroke="#fbbf24" stroke-width="3" fill="none"/>
<text x="320" y="192" text-anchor="middle" font-size="10" fill="#cbd5e1">giữ khi retry</text>
<rect x="430" y="70" width="170" height="140" rx="10" fill="#0b1220" stroke="#60a5fa"/>
<text x="515" y="98" text-anchor="middle" font-size="13" font-weight="700" fill="#93c5fd">on</text>
<circle cx="515" cy="140" r="26" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<path d="M505 140 l6 6 12 -14" stroke="#6ee7b7" stroke-width="3" fill="none"/>
<text x="515" y="192" text-anchor="middle" font-size="10" fill="#cbd5e1">luôn quay (nặng)</text>
</svg>`;

// ===========================================================================
// ARTICLE A — Codegen + Auto-assertions + CLI/skills mode.
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Codegen là gì và vì sao đội QA vẫn cần nó năm 2026",
      en: "1. What Codegen is and why QA teams still need it in 2026",
      ja: "1. Codegen とは何か、なぜ 2026 年でも QA チームに必要なのか",
    },
    blocks: [
      P(
        "Codegen là công cụ ghi-lại-thao-tác của Playwright: bạn mở trình duyệt bằng lệnh, thực hiện các thao tác như một người dùng thật, và Playwright tự sinh ra mã kiểm thử TypeScript hoặc JavaScript tương ứng. Nhiều người tưởng codegen chỉ dành cho người mới, nhưng thực tế ở các đội lớn nó vẫn là điểm khởi đầu nhanh nhất để dựng khung một bộ test. Thay vì gõ tay từng locator, ta để công cụ đề xuất locator ưu tiên theo vai trò truy cập, rồi con người tinh chỉnh lại. Điều quan trọng cần nhớ là codegen sinh ra bản nháp, không phải sản phẩm cuối. Bài viết này đi sâu vào cách dùng codegen một cách chuyên nghiệp, kết hợp với auto-assertion mới và chế độ CLI thân thiện với AI coding agent.",
        "Codegen is Playwright's record-and-generate tool: you launch a browser via a command, perform actions like a real user, and Playwright emits the matching TypeScript or JavaScript test code. Many assume codegen is only for beginners, but at large teams it remains the fastest way to scaffold a test suite. Instead of hand-typing every locator, you let the tool propose role-based locators, then a human refines them. The key point is that codegen produces a draft, not a finished product. This article dives into using codegen professionally, combined with the new auto-assertions and the AI-agent-friendly CLI mode.",
        "Codegen は Playwright の記録・生成ツールです。コマンドでブラウザーを起動し、実際のユーザーのように操作すると、対応する TypeScript または JavaScript のテストコードが自動生成されます。初心者向けだと思われがちですが、大規模チームではテストスイートの骨組みを最速で作る手段として今も現役です。すべてのロケーターを手打ちする代わりに、ツールにロール優先のロケーターを提案させ、人が調整します。重要なのは、codegen が生成するのは下書きであって完成品ではないという点です。本記事では codegen をプロとして使う方法を、新しい自動アサーションと AI コーディングエージェント向けの CLI モードと合わせて深掘りします。"
      ),
      UL(
        ["Sinh nhanh khung test và locator ưu tiên theo vai trò (getByRole).",
         "Học locator tốt bằng cách quan sát công cụ gợi ý gì.",
         "Ghi lại luồng phức tạp mà gõ tay dễ sai (nhiều bước, nhiều iframe).",
         "Bản nháp để review, không phải mã cuối cần dọn dẹp."],
        ["Quickly scaffold tests and role-first locators (getByRole).",
         "Learn good locators by watching what the tool suggests.",
         "Capture complex flows that are error-prone to hand-write (many steps, iframes).",
         "A draft to review, not final code — cleanup required."],
        ["テストの骨組みとロール優先ロケーター（getByRole）を素早く生成できます。",
         "ツールの提案を観察して良いロケーターを学べます。",
         "手打ちでは間違えやすい複雑なフロー（多段階・iframe）を記録できます。",
         "レビュー用の下書きであり、整理が必要な最終コードではありません。"]
      ),
      NOTE(
        "Codegen không thay thế tư duy thiết kế test. Nó tăng tốc phần cơ khí (gõ locator, mở form), còn phần oracle — khẳng định bất biến nghiệp vụ — vẫn là việc của người kiểm thử.",
        "Codegen does not replace test design thinking. It speeds up the mechanical part (typing locators, opening forms); the oracle — asserting business invariants — remains the tester's job.",
        "Codegen はテスト設計の思考を置き換えません。機械的な部分（ロケーターの入力、フォームを開く）を高速化しますが、オラクル、つまり業務上の不変条件を主張する部分はテスターの仕事のままです。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. Khởi động phiên codegen và các chế độ đầu ra",
      en: "2. Launching a codegen session and output modes",
      ja: "2. codegen セッションの起動と出力モード",
    },
    blocks: [
      P(
        "Để bắt đầu, bạn chạy lệnh codegen kèm URL trang cần kiểm thử. Playwright mở một cửa sổ trình duyệt kèm một cửa sổ Inspector hiển thị mã sinh ra theo thời gian thực. Bạn có thể chọn ngôn ngữ đích, đặt kích thước màn hình, thậm chí nạp sẵn trạng thái đăng nhập từ tệp storage state để không phải đăng nhập lại mỗi lần ghi. Trên máy CI hoặc trong container, bạn thường ghi ở chế độ headed trên máy cá nhân rồi copy mã sang. Điểm mạnh của codegen hiện đại là nó ưu tiên locator bền vững thay vì XPath giòn.",
        "To begin, run the codegen command with the URL under test. Playwright opens a browser window plus an Inspector window showing generated code in real time. You can pick the target language, set the viewport, even preload a signed-in state from a storage-state file so you don't re-login every recording. On CI or in a container, you typically record headed on your machine then copy the code over. The strength of modern codegen is that it prefers durable locators over brittle XPath.",
        "開始するには、テスト対象の URL を付けて codegen コマンドを実行します。Playwright はブラウザーウィンドウと、生成コードをリアルタイムで表示する Inspector ウィンドウを開きます。ターゲット言語の選択、ビューポートの設定、さらに storage state ファイルからログイン済み状態を事前読み込みして毎回のログインを省くこともできます。CI やコンテナ上では、通常は自分のマシンで headed で記録し、コードをコピーします。最新の codegen の強みは、壊れやすい XPath ではなく耐久性のあるロケーターを優先する点です。"
      ),
      CODE("bash", `# Ghi test cơ bản
npx playwright codegen https://app.demo.local/login

# Chọn ngôn ngữ đích + kích thước màn hình
npx playwright codegen --target=typescript --viewport-size=1280,800 https://app.demo.local

# Nạp sẵn trạng thái đăng nhập để ghi luồng cần auth
npx playwright codegen --load-storage=auth.json https://app.demo.local/dashboard

# Lưu trạng thái đăng nhập sau khi login thủ công trong cửa sổ codegen
npx playwright codegen --save-storage=auth.json https://app.demo.local/login`),
      IMG(svgCodegen,
        "Ba pha của codegen: Record → Generate (kèm auto-assertion) → Review/dọn dẹp.",
        "Codegen's three phases: Record → Generate (with auto-assertions) → Review/cleanup.",
        "codegen の3フェーズ: 記録 → 生成（自動アサーション付き）→ レビュー・整理。"
      ),
      TIP(
        "Dùng --save-storage một lần để bắt trạng thái đăng nhập, rồi --load-storage cho mọi phiên ghi sau. Bạn tránh nhập OTP/2FA lặp đi lặp lại và giữ mã ghi được sạch, chỉ chứa nghiệp vụ thật.",
        "Use --save-storage once to capture the signed-in state, then --load-storage for every later recording. You avoid repeating OTP/2FA and keep the recorded code clean, containing only the real business flow.",
        "--save-storage を一度使ってログイン状態を取得し、以降の記録では --load-storage を使います。OTP/2FA の繰り返しを避け、記録コードを業務フローだけのクリーンな状態に保てます。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Auto-assertions: toBeVisible() sinh tự động (v1.57)",
      en: "3. Auto-assertions: auto-generated toBeVisible() (v1.57)",
      ja: "3. 自動アサーション: 自動生成される toBeVisible()（v1.57）",
    },
    blocks: [
      P(
        "Trước đây codegen chỉ ghi lại hành động: click, fill, press. Từ phiên bản 1.57, codegen còn tự sinh ra các assertion cơ bản, đặc biệt là toBeVisible(). Khi bạn di chuột lên một phần tử trong chế độ assertion, Inspector cho phép chèn một khẳng định rằng phần tử đó hiển thị, có văn bản gì, hoặc ở trạng thái checked. Điều này giải quyết một than phiền kinh điển: mã ghi được không có oracle nên chỉ mô phỏng thao tác chứ không thực sự kiểm chứng điều gì. Auto-assertion đưa các điểm kiểm tra vào ngay lúc ghi, giúp test có ý nghĩa hơn ngay từ bản nháp.",
        "Previously codegen only recorded actions: click, fill, press. Since version 1.57, codegen also auto-generates basic assertions, especially toBeVisible(). When you hover an element in assertion mode, the Inspector lets you insert an assertion that the element is visible, has some text, or is checked. This fixes a classic complaint: recorded code had no oracle, so it only replayed actions without truly verifying anything. Auto-assertions inject checkpoints during recording, making tests meaningful from the draft stage.",
        "以前は codegen は click、fill、press といったアクションのみを記録していました。バージョン 1.57 からは、基本的なアサーション、特に toBeVisible() も自動生成します。アサーションモードで要素にホバーすると、Inspector はその要素が表示されている、あるテキストを持つ、checked 状態である、といったアサーションを挿入できます。これは古典的な不満を解消します。記録コードにオラクルがなく、操作を再生するだけで実際には何も検証していなかったのです。自動アサーションは記録中にチェックポイントを挿入し、下書き段階からテストを意味のあるものにします。"
      ),
      CODE("typescript", `// Mã codegen v1.57 sinh ra — kèm assertion tự động
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('https://app.demo.local/login');
  await page.getByLabel('Email').fill('qa@demo.local');
  await page.getByLabel('Mật khẩu').fill('S3cret!');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  // Assertion tự sinh khi ta hover phần tử ở chế độ assertion:
  await expect(page.getByRole('heading', { name: 'Bảng điều khiển' })).toBeVisible();
  await expect(page.getByTestId('user-menu')).toBeVisible();
});`),
      WARN(
        "toBeVisible() chỉ là điểm neo, KHÔNG phải oracle nghiệp vụ. Nó khẳng định giao diện xuất hiện, không khẳng định số dư đúng, tồn kho không âm, hay tiền được bảo toàn. Sau khi ghi, hãy thay/bổ sung bằng assertion trên bất biến thật.",
        "toBeVisible() is just an anchor, NOT a business oracle. It asserts the UI appeared, not that a balance is correct, inventory is non-negative, or money is conserved. After recording, replace/augment with assertions on real invariants.",
        "toBeVisible() は単なるアンカーであり、業務オラクルではありません。UI が表示されたことを主張しますが、残高が正しい、在庫が非負である、金額が保存されるといったことは主張しません。記録後は、本当の不変条件に対するアサーションに置き換え・追加してください。"
      ),
      QA(
        "Auto-assertion của codegen có đủ để test là 'tốt' không?",
        "Are codegen's auto-assertions enough to make a test 'good'?",
        "Chưa đủ. Auto-assertion chỉ kiểm hiển thị hoặc văn bản bề mặt. Test tốt phải khẳng định bất biến nghiệp vụ: sau khi chuyển tiền thì tổng tài khoản không đổi, sau khi đặt hàng thì tồn kho giảm đúng số lượng, retry một lần chỉ tạo một bản ghi. Hãy coi auto-assertion là điểm khởi đầu, rồi nâng lên oracle thật.",
        "Not enough. Auto-assertions only check visibility or surface text. A good test asserts business invariants: after a transfer the total across accounts is unchanged, after an order inventory drops by the exact quantity, a retry creates exactly one record. Treat auto-assertions as a starting point, then lift them to real oracles.",
        "codegen の自動アサーションはテストを『良い』ものにするのに十分ですか？",
        "十分ではありません。自動アサーションは表示や表面的なテキストのみを確認します。良いテストは業務上の不変条件を主張します。送金後の口座合計が変わらない、注文後に在庫が正確な数だけ減る、リトライ一回で作成される記録がちょうど一つ、などです。自動アサーションは出発点と捉え、本物のオラクルに引き上げてください。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Cấu hình assertion trong codegen",
      en: "4. Configuring assertions inside codegen",
      ja: "4. codegen 内でのアサーション設定",
    },
    blocks: [
      P(
        "Codegen cho phép bật/tắt chế độ chèn assertion và chọn loại assertion muốn sinh. Trong Inspector có các nút: assert visibility, assert text, assert value. Bạn cũng có thể cấu hình để codegen không tự chèn assertion nếu muốn giữ mã ghi tối giản rồi tự viết oracle sau. Ở các đội có quy chuẩn locator riêng, người ta thường cấu hình testIdAttribute để codegen ưu tiên sinh getByTestId theo thuộc tính dữ liệu của dự án, giúp locator bền vững qua các lần đổi giao diện. Cấu hình này đặt trong playwright.config để áp dụng nhất quán.",
        "Codegen lets you toggle assertion-insertion mode and choose which assertion type to emit. The Inspector has buttons: assert visibility, assert text, assert value. You can also configure codegen to not auto-insert assertions if you prefer minimal recorded code and write oracles yourself later. On teams with their own locator standards, people usually set testIdAttribute so codegen prefers getByTestId based on the project's data attribute, keeping locators durable across UI changes. This is set in playwright.config for consistent application.",
        "codegen ではアサーション挿入モードのオン・オフ切り替えと、生成するアサーション種別の選択ができます。Inspector には assert visibility、assert text、assert value のボタンがあります。記録コードを最小限にして後でオラクルを自分で書きたい場合は、自動挿入をしない設定も可能です。独自のロケーター規約を持つチームでは、通常 testIdAttribute を設定し、プロジェクトのデータ属性に基づく getByTestId を codegen が優先するようにします。これにより UI 変更をまたいでロケーターが耐久性を保ちます。この設定は一貫適用のため playwright.config に置きます。"
      ),
      CODE("typescript", `// playwright.config.ts — chuẩn hoá locator cho codegen & test
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Codegen sẽ ưu tiên getByTestId dựa trên thuộc tính này
    testIdAttribute: 'data-qa',
    baseURL: 'https://app.demo.local',
    trace: 'retain-on-failure-and-retries',
  },
  // Chuẩn: mọi phần tử tương tác gắn data-qa="..."
});`),
      NOTE(
        "Đặt testIdAttribute là data-qa (hoặc data-testid) và yêu cầu lập trình viên gắn thuộc tính này lên phần tử quan trọng. Locator theo test id ổn định hơn nhiều so với text hiển thị vốn thay đổi khi đổi ngôn ngữ hay nội dung.",
        "Set testIdAttribute to data-qa (or data-testid) and ask developers to add it to key elements. Test-id locators are far more stable than visible text, which changes with localization or content edits.",
        "testIdAttribute を data-qa（または data-testid）に設定し、開発者に重要な要素へこの属性を付けてもらいます。test-id ロケーターは、多言語化や内容変更で変わる表示テキストよりもはるかに安定します。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Dọn dẹp mã sinh ra: từ nháp đến POM",
      en: "5. Cleaning up generated code: from draft to POM",
      ja: "5. 生成コードの整理: 下書きから POM へ",
    },
    blocks: [
      P(
        "Mã codegen sinh ra là một chuỗi thao tác phẳng, đầy locator lặp và đôi khi có bước dư (click nhầm, cuộn thừa). Việc dọn dẹp gồm bốn bước: một là xoá thao tác thừa và các assertion trùng; hai là gom locator hay dùng thành hằng có tên nghĩa; ba là trích luồng vào Page Object Model để tái sử dụng; bốn là thay điểm neo hiển thị bằng oracle nghiệp vụ. Sau khi dọn, một mã 40 dòng phẳng có thể co lại thành vài lệnh gọi phương thức đọc như tiếng người. Đây là lúc kinh nghiệm con người tạo giá trị mà công cụ không thay được.",
        "Generated code is a flat sequence of actions, full of repeated locators and sometimes stray steps (a misclick, extra scroll). Cleanup has four steps: one, remove stray actions and duplicate assertions; two, extract frequently-used locators into meaningfully-named constants; three, lift the flow into a Page Object Model for reuse; four, replace visibility anchors with business oracles. After cleanup, a flat 40-line script can shrink to a few readable method calls. This is where human experience adds value the tool cannot replace.",
        "生成コードはアクションの平坦な連続であり、ロケーターの重複や、時には余計なステップ（誤クリック、余分なスクロール）を含みます。整理は4段階です。一つ、余計なアクションと重複アサーションを削除する。二つ、頻繁に使うロケーターを意味のある名前の定数に抽出する。三つ、再利用のためフローを Page Object Model へ引き上げる。四つ、表示アンカーを業務オラクルに置き換える。整理後、平坦な40行のスクリプトは読みやすい数個のメソッド呼び出しに縮みます。ここで人間の経験が、ツールには置き換えられない価値を生みます。"
      ),
      CODE("typescript", `// TRƯỚC (codegen thô) — locator lặp, không tên
await page.getByLabel('Email').fill('qa@demo.local');
await page.getByLabel('Mật khẩu').fill('S3cret!');
await page.getByRole('button', { name: 'Đăng nhập' }).click();
await expect(page.getByRole('heading', { name: 'Bảng điều khiển' })).toBeVisible();

// SAU (đã trích POM)
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: import('@playwright/test').Page) {}
  email = () => this.page.getByLabel('Email');
  password = () => this.page.getByLabel('Mật khẩu');
  submit = () => this.page.getByRole('button', { name: 'Đăng nhập' });
  async loginAs(user: string, pass: string) {
    await this.email().fill(user);
    await this.password().fill(pass);
    await this.submit().click();
  }
}`),
      CODE("typescript", `// Test sạch dùng POM — đọc như đặc tả nghiệp vụ
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('người dùng hợp lệ vào được dashboard', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/login');
  await login.loginAs('qa@demo.local', 'S3cret!');
  await expect(page.getByRole('heading', { name: 'Bảng điều khiển' })).toBeVisible();
});`),
      TIP(
        "Quy tắc ba lần: nếu một locator xuất hiện ≥ 3 lần trong mã ghi, hãy trích nó thành phương thức trong Page Object. Điều này giảm chi phí bảo trì khi giao diện đổi.",
        "Rule of three: if a locator appears ≥ 3 times in recorded code, extract it into a Page Object method. This cuts maintenance cost when the UI changes.",
        "3回ルール: ロケーターが記録コードに3回以上現れたら、Page Object のメソッドに抽出します。UI が変わったときの保守コストを削減できます。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Cạm bẫy của locator sinh tự động",
      en: "6. Pitfalls of auto-generated locators",
      ja: "6. 自動生成ロケーターの落とし穴",
    },
    blocks: [
      P(
        "Locator do codegen sinh không phải lúc nào cũng tốt. Khi phần tử không có vai trò truy cập rõ ràng, công cụ có thể rơi về locator theo vị trí như nth(2) hoặc chuỗi CSS dài, vốn cực kỳ giòn: chỉ cần thêm một phần tử phía trên là test gãy. Một cạm bẫy khác là locator theo văn bản hiển thị: khi ứng dụng đa ngôn ngữ, getByText('Đăng nhập') sẽ hỏng ở locale tiếng Anh. Ngoài ra codegen đôi khi sinh locator quá cụ thể, bám vào chi tiết bố cục thay vì ý nghĩa. Người kiểm thử phải soi và thay bằng locator dựa trên vai trò, nhãn, hoặc test id.",
        "Codegen-generated locators are not always good. When an element has no clear accessible role, the tool may fall back to positional locators like nth(2) or long CSS chains, which are extremely brittle: adding one element above breaks the test. Another pitfall is visible-text locators: in a multilingual app, getByText('Đăng nhập') breaks in the English locale. Codegen also sometimes emits over-specific locators tied to layout detail rather than meaning. The tester must inspect and swap in role-, label-, or test-id-based locators.",
        "codegen が生成するロケーターは常に良いとは限りません。要素に明確なアクセシブルロールがない場合、ツールは nth(2) のような位置ベースのロケーターや長い CSS チェーンにフォールバックすることがあり、これらは極めて壊れやすいです。上に要素を一つ追加するだけでテストが壊れます。もう一つの落とし穴は表示テキストのロケーターです。多言語アプリでは getByText('Đăng nhập') は英語ロケールで壊れます。codegen はまた、意味ではなくレイアウトの詳細に結びついた過度に具体的なロケーターを生成することがあります。テスターは点検し、ロール・ラベル・test-id ベースのロケーターに差し替える必要があります。"
      ),
      CODE("typescript", `// GIÒN — codegen rơi về vị trí/CSS
await page.locator('div:nth-child(3) > .list-item').nth(2).click();
await page.getByText('Đăng nhập').click(); // hỏng ở locale khác

// BỀN — ưu tiên vai trò / test id
await page.getByRole('listitem', { name: 'Hoá đơn tháng 6' }).click();
await page.getByTestId('login-submit').click();`),
      IMG(svgCliMode,
        "Vòng lặp AI agent ↔ Playwright CLI: hướng dẫn tiếng người → cây ARIA → hành động chính xác.",
        "AI agent ↔ Playwright CLI loop: plain-English instructions → ARIA tree → precise actions.",
        "AI エージェント ↔ Playwright CLI のループ: 自然言語の指示 → ARIA ツリー → 正確なアクション。"
      ),
      QA(
        "Vì sao locator theo nth() bị coi là mùi mã (code smell)?",
        "Why is an nth() locator considered a code smell?",
        "Vì nth() bám vào thứ tự phần tử trong DOM, không bám vào ý nghĩa. Chỉ cần lập trình viên chèn thêm một mục quảng cáo, một banner, hay đổi thứ tự sắp xếp, chỉ số sẽ lệch và test gãy dù chức năng vẫn đúng. Đó là loại flaky/gãy sai lệch — test đỏ nhưng sản phẩm không lỗi — làm mất niềm tin vào bộ test.",
        "Because nth() ties to element order in the DOM, not to meaning. If a developer inserts one ad slot, a banner, or changes the sort order, the index shifts and the test breaks even though the feature still works. That is a false-failure/flaky class — red test but no product bug — which erodes trust in the suite.",
        "なぜ nth() ロケーターはコードの臭い（code smell）と見なされるのですか？",
        "nth() は意味ではなく DOM 内の要素順序に結びつくからです。開発者が広告枠を一つ挿入したり、バナーを追加したり、並び順を変えたりするだけでインデックスがずれ、機能は正しいのにテストが壊れます。これは偽の失敗・フレーキーの一種で、テストは赤いが製品にバグはない状態であり、スイートへの信頼を損ないます。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. CLI / skills mode: Playwright thân thiện với AI coding agent",
      en: "7. CLI / skills mode: Playwright friendly to AI coding agents",
      ja: "7. CLI / skills モード: AI コーディングエージェントに優しい Playwright",
    },
    blocks: [
      P(
        "Phiên bản 1.57 giới thiệu một chế độ CLI hiệu quả về token, được thiết kế cho các AI coding agent như Claude Code hay Copilot. Ý tưởng cốt lõi là: khi một agent muốn viết hoặc sửa test, nó cần hiểu trạng thái trang. Thay vì gửi cả ảnh chụp màn hình hay HTML thô khổng lồ vào ngữ cảnh mô hình, chế độ skills cung cấp một biểu diễn cô đọng dựa trên cây trợ năng (accessibility tree) và các lệnh cấp cao. Nhờ vậy agent tiêu tốn ít token hơn, ít bị nhiễu, và sinh locator theo vai trò chuẩn xác hơn. Đây là bước Playwright tự định vị làm nền tảng cho kỷ nguyên test do AI hỗ trợ.",
        "Version 1.57 introduced a token-efficient CLI mode designed for AI coding agents like Claude Code or Copilot. The core idea: when an agent wants to write or fix tests, it needs to understand page state. Instead of feeding whole screenshots or huge raw HTML into the model context, skills mode provides a condensed representation based on the accessibility tree and high-level commands. This lets the agent spend fewer tokens, suffer less noise, and generate accurate role-based locators. It is Playwright positioning itself as the foundation for the AI-assisted testing era.",
        "バージョン 1.57 は、Claude Code や Copilot のような AI コーディングエージェント向けに設計された、トークン効率の良い CLI モードを導入しました。核心となる考えはこうです。エージェントがテストを書いたり修正したりするには、ページの状態を理解する必要があります。スクリーンショット全体や巨大な生 HTML をモデルのコンテキストに送り込む代わりに、skills モードはアクセシビリティツリーと高レベルコマンドに基づく凝縮された表現を提供します。これによりエージェントは消費トークンが少なく、ノイズが減り、より正確なロールベースのロケーターを生成できます。これは Playwright が AI 支援テスト時代の基盤として自らを位置づける一歩です。"
      ),
      CODE("bash", `# Chế độ skills/CLI cho agent — trả về cây trợ năng cô đọng thay vì HTML thô
npx playwright cli snapshot --url https://app.demo.local/login
# → xuất ra biểu diễn ARIA: button "Đăng nhập", textbox "Email", ...

# Agent yêu cầu sinh test từ mô tả tiếng người, dùng snapshot làm ngữ cảnh
npx playwright cli generate --intent "Đăng nhập rồi kiểm tra dashboard hiện ra"`),
      P(
        "Điểm khác biệt so với việc đưa ảnh cho mô hình thị giác là chế độ skills dựa trên ngữ nghĩa chứ không phải điểm ảnh. Agent thấy 'nút Đăng nhập', 'ô nhập Email' thay vì một mớ toạ độ. Nhờ đó locator sinh ra bám vào vai trò và nhãn — chính là loại locator bền mà chúng ta muốn. Ngoài ra, vì biểu diễn nhỏ gọn, agent có thể lặp nhanh: sinh test, chạy, đọc lỗi, sửa, mà không nổ ngân sách token. Đây là lý do nhiều đội bắt đầu cặp codegen thủ công với agent tự động trong cùng một quy trình.",
        "The difference from feeding images to a vision model is that skills mode is semantic, not pixel-based. The agent sees a 'Login button', an 'Email textbox' rather than a mass of coordinates. As a result the generated locators tie to role and label — exactly the durable kind we want. Also, because the representation is compact, the agent can iterate fast: generate a test, run it, read the error, fix, without blowing the token budget. This is why many teams start pairing manual codegen with an automated agent in the same workflow.",
        "ビジョンモデルに画像を与える場合との違いは、skills モードがピクセルではなく意味に基づく点です。エージェントは座標の塊ではなく『ログインボタン』『メール入力欄』を見ます。その結果、生成されるロケーターはロールとラベルに結びつき、まさに私たちが望む耐久性のある種類になります。また表現がコンパクトなため、エージェントは素早く反復できます。テストを生成し、実行し、エラーを読み、修正する、これをトークン予算を爆発させずに行えます。これが多くのチームが手動 codegen と自動エージェントを同じワークフローで組み合わせ始めた理由です。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Cặp codegen với con người: phân vai đúng",
      en: "8. Pairing codegen with humans: the right division of labor",
      ja: "8. codegen と人間のペアリング: 正しい役割分担",
    },
    blocks: [
      P(
        "Mô hình hiệu quả nhất không phải 'công cụ làm hết' cũng không phải 'con người gõ tay hết', mà là phân vai. Codegen và agent lo phần cơ khí: dựng khung, dò locator theo vai trò, chèn điểm neo hiển thị. Người kiểm thử lo phần trí tuệ: chọn ca kiểm thử theo rủi ro, thiết kế dữ liệu biên, và quan trọng nhất là viết oracle nghiệp vụ. Khi ranh giới này rõ, tốc độ tăng mà chất lượng không giảm. Nếu để công cụ tự viết cả oracle, ta được bộ test chạy xanh nhưng không bắt được lỗi thật — một cái bẫy nguy hiểm vì tạo cảm giác an toàn giả.",
        "The most effective model is neither 'the tool does everything' nor 'humans hand-type everything', but a division of labor. Codegen and the agent handle the mechanics: scaffolding, discovering role-based locators, inserting visibility anchors. The tester handles the intellect: choosing risk-based cases, designing boundary data, and above all writing the business oracle. When this boundary is clear, speed rises without quality dropping. If you let the tool write the oracle too, you get a green suite that catches no real bugs — a dangerous trap because it creates false confidence.",
        "最も効果的なモデルは『ツールがすべてやる』でも『人間がすべて手打ちする』でもなく、役割分担です。codegen とエージェントは機械的な部分、つまり骨組み作り、ロールベースのロケーター発見、表示アンカーの挿入を担います。テスターは知的な部分、つまりリスクベースのケース選択、境界データの設計、そして何より業務オラクルの記述を担います。この境界が明確なとき、品質を落とさずに速度が上がります。ツールにオラクルまで書かせると、緑になるが本物のバグを捕まえないスイートができ、これは偽の安心感を生む危険な罠です。"
      ),
      SCEN(
        "Cặp người-công cụ trong sprint",
        "Human-tool pairing in a sprint",
        "Một QA senior nhận yêu cầu test luồng thanh toán mới. Cô dùng codegen ghi luồng happy path trong 5 phút, được bản nháp có toBeVisible(). Sau đó cô yêu cầu agent (qua skills mode) sinh thêm 4 biến thể dữ liệu biên. Cuối cùng cô tự tay viết oracle: 'sau thanh toán, tổng nợ + tổng có phải bằng nhau' và 'retry một lần chỉ tạo một giao dịch'. Tổng thời gian: 40 phút cho việc trước đây mất nửa ngày, mà oracle vẫn do con người kiểm soát.",
        "A senior QA is asked to test a new payment flow. She uses codegen to record the happy path in 5 minutes, getting a draft with toBeVisible(). Then she asks an agent (via skills mode) to generate 4 boundary-data variants. Finally she hand-writes the oracle: 'after payment, total debit + total credit must be equal' and 'one retry creates exactly one transaction'. Total time: 40 minutes for what took half a day before, with the oracle still under human control.",
        "スプリントでの人間とツールのペアリング",
        "シニア QA が新しい決済フローのテストを依頼されます。彼女は codegen でハッピーパスを5分で記録し、toBeVisible() 付きの下書きを得ます。次にエージェント（skills モード経由）に境界データの4バリアントを生成させます。最後に彼女はオラクルを手書きします。『決済後、借方合計と貸方合計が等しくなければならない』『リトライ一回で作成される取引はちょうど一つ』です。合計時間は40分で、以前は半日かかった作業を、オラクルは人間の制御下に保ったまま行いました。"
      ),
      QA(
        "Ranh giới nào tuyệt đối KHÔNG giao cho AI agent tự quyết?",
        "What boundary must NEVER be delegated to an AI agent?",
        "Oracle nghiệp vụ và tiêu chí chấp nhận. Agent có thể mắc lỗi 'ảo giác' (hallucination) — sinh assertion nghe hợp lý nhưng sai bản chất, hoặc nới lỏng điều kiện cho test xanh. Con người phải định nghĩa bất biến đúng (tiền bảo toàn, tồn kho không âm, cô lập tenant) và duyệt mọi assertion cuối. Agent hỗ trợ, con người chịu trách nhiệm.",
        "The business oracle and acceptance criteria. An agent can hallucinate — emit a plausible-sounding but fundamentally wrong assertion, or loosen conditions to make the test green. Humans must define the correct invariants (money conserved, inventory non-negative, tenant isolation) and review every final assertion. The agent assists; the human is accountable.",
        "AI エージェントに絶対に委ねてはいけない境界は何ですか？",
        "業務オラクルと受け入れ基準です。エージェントはハルシネーションを起こし、もっともらしいが本質的に誤ったアサーションを生成したり、テストを緑にするため条件を緩めたりすることがあります。人間が正しい不変条件（金額の保存、在庫の非負、テナント分離）を定義し、最終アサーションをすべてレビューする必要があります。エージェントは支援し、人間が責任を負います。"
      ),
    ],
  },
  {
    heading: {
      vi: "9. Storage state và bối cảnh đăng nhập trong codegen",
      en: "9. Storage state and auth context in codegen",
      ja: "9. codegen における storage state と認証コンテキスト",
    },
    blocks: [
      P(
        "Phần lớn ứng dụng doanh nghiệp yêu cầu đăng nhập trước khi vào nghiệp vụ. Ghi lại bước đăng nhập trong mọi test là lãng phí và làm test giòn (phụ thuộc OTP, captcha). Giải pháp chuẩn là tách bước đăng nhập vào một dự án setup, lưu cookie và localStorage vào tệp storage state, rồi mọi test khác nạp trạng thái này. Codegen hỗ trợ trực tiếp qua cờ save-storage và load-storage. Trong config, bạn khai báo dependency để dự án setup chạy trước, đảm bảo mọi test có phiên hợp lệ mà không lặp lại đăng nhập.",
        "Most enterprise apps require login before reaching business flows. Recording the login step in every test is wasteful and makes tests brittle (OTP, captcha dependencies). The standard solution is to isolate login into a setup project, save cookies and localStorage into a storage-state file, then have every other test load that state. Codegen supports this directly via save-storage and load-storage flags. In config you declare a dependency so the setup project runs first, ensuring every test has a valid session without re-login.",
        "ほとんどの企業アプリは業務フローに入る前にログインを要求します。すべてのテストでログイン手順を記録するのは無駄で、テストを壊れやすくします（OTP、captcha への依存）。標準的な解決策は、ログインを setup プロジェクトに分離し、cookie と localStorage を storage state ファイルに保存し、他のすべてのテストがその状態を読み込むことです。codegen は save-storage と load-storage フラグで直接これをサポートします。config で依存関係を宣言して setup プロジェクトを先に実行させ、再ログインなしにすべてのテストが有効なセッションを持つようにします。"
      ),
      CODE("typescript", `// playwright.config.ts — dự án setup tạo storage state
import { defineConfig } from '@playwright/test';
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\\.setup\\.ts/ },
    {
      name: 'e2e',
      dependencies: ['setup'],
      use: { storageState: 'playwright/.auth/user.json' },
    },
  ],
});

// auth.setup.ts
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.QA_USER!);
  await page.getByLabel('Mật khẩu').fill(process.env.QA_PASS!);
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});`),
      NOTE(
        "Không commit tệp storage state chứa token thật vào git. Sinh nó trong CI từ tài khoản QA chuyên dụng, đưa vào .gitignore, và làm mới định kỳ vì token có hạn.",
        "Never commit a storage-state file with real tokens to git. Generate it in CI from a dedicated QA account, add it to .gitignore, and refresh periodically since tokens expire.",
        "本物のトークンを含む storage state ファイルを git にコミットしないでください。専用の QA アカウントから CI で生成し、.gitignore に追加し、トークンには期限があるため定期的に更新します。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Từ codegen tới Playwright Agents (Planner/Generator/Healer)",
      en: "10. From codegen to Playwright Agents (Planner/Generator/Healer)",
      ja: "10. codegen から Playwright Agents（Planner/Generator/Healer）へ",
    },
    blocks: [
      P(
        "Codegen là bước đơn giản nhất trên phổ tự động hoá. Ở đầu kia là bộ ba Playwright Agents: Planner khám phá ứng dụng và viết kế hoạch test dạng Markdown; Generator biến kế hoạch thành spec chạy được, kiểm chứng locator trên app thật; Healer chạy ở chế độ debug, đọc console/network/snapshot để sửa test gãy hoặc đánh dấu skip. Lệnh init-agents dựng sẵn ba agent này kèm một seed.spec chứa fixture dùng chung. Codegen và agents không loại trừ nhau: nhiều đội dùng codegen để nắm nhanh một luồng mới, rồi để agents mở rộng độ phủ và tự hồi phục khi giao diện đổi.",
        "Codegen is the simplest step on the automation spectrum. At the other end sits the Playwright Agents trio: Planner explores the app and writes a Markdown test plan; Generator turns the plan into runnable specs, verifying locators on the live app; Healer runs in debug mode, reading console/network/snapshots to fix broken tests or mark them skipped. The init-agents command scaffolds these three plus a seed.spec with shared fixtures. Codegen and agents are not mutually exclusive: many teams use codegen to grasp a new flow quickly, then let agents expand coverage and self-heal when the UI changes.",
        "codegen は自動化スペクトルで最も単純なステップです。反対の端には Playwright Agents の三人組がいます。Planner はアプリを探索して Markdown のテスト計画を書き、Generator は計画を実行可能な spec に変え、ライブアプリでロケーターを検証し、Healer は debug モードで動作し、console/network/snapshot を読んで壊れたテストを修正するかスキップとしてマークします。init-agents コマンドはこの3つに加え、共有フィクスチャを含む seed.spec を生成します。codegen とエージェントは相互排他的ではありません。多くのチームは codegen で新しいフローを素早く把握し、その後エージェントにカバレッジ拡大と UI 変更時の自己修復を任せます。"
      ),
      CODE("bash", `# Dựng bộ agent Planner/Generator/Healer + seed.spec
npx playwright init-agents

# Planner khám phá app và xuất kế hoạch Markdown
npx playwright agent plan --url https://app.demo.local --out plans/checkout.md

# Generator biến kế hoạch thành spec, xác minh locator trên app thật
npx playwright agent generate --plan plans/checkout.md --out tests/checkout.spec.ts

# Healer sửa test gãy trong chế độ debug
npx playwright agent heal --spec tests/checkout.spec.ts`),
      TIP(
        "Bắt đầu nhỏ: dùng codegen cho 2-3 luồng lõi để làm quen locator chuẩn của dự án, sau đó mới bật agents cho các module rộng. Đưa oracle vào seed.spec để mọi test agents sinh ra kế thừa bất biến đúng.",
        "Start small: use codegen for 2-3 core flows to learn the project's standard locators, then enable agents for broad modules. Put oracles in seed.spec so every agent-generated test inherits correct invariants.",
        "小さく始めましょう。codegen を2〜3のコアフローに使ってプロジェクト標準のロケーターに慣れ、その後に広いモジュールでエージェントを有効にします。オラクルを seed.spec に入れ、エージェントが生成するすべてのテストが正しい不変条件を継承するようにします。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Playwright MCP: cho mô hình lái trình duyệt",
      en: "11. Playwright MCP: letting a model drive the browser",
      ja: "11. Playwright MCP: モデルにブラウザーを運転させる",
    },
    blocks: [
      P(
        "Playwright MCP (Model Context Protocol) mở một cầu nối để các mô hình như Claude, GPT hay Gemini điều khiển trình duyệt qua các công cụ Playwright, bằng chỉ dẫn tiếng người và dựa trên cây trợ năng thay vì điểm ảnh. Điều này gần với codegen về tinh thần — cùng ưu tiên ngữ nghĩa — nhưng khác ở chỗ vòng lặp do mô hình dẫn dắt theo thời gian thực. Với QA, MCP hữu ích khi khám phá thăm dò (exploratory) hoặc dựng nhanh reproduction cho một bug. Nhưng nó không thay thế bộ test hồi quy ổn định; nó là công cụ khám phá, và mọi thứ đáng giữ phải được kết tinh thành spec xác định.",
        "Playwright MCP (Model Context Protocol) opens a bridge for models like Claude, GPT or Gemini to drive the browser via Playwright tools, using plain-English instructions and the accessibility tree rather than pixels. This is close to codegen in spirit — same semantic priority — but differs in that the loop is model-driven in real time. For QA, MCP is useful for exploratory testing or quickly building a bug reproduction. But it does not replace a stable regression suite; it is an exploration tool, and anything worth keeping must be crystallized into a deterministic spec.",
        "Playwright MCP（Model Context Protocol）は、Claude、GPT、Gemini のようなモデルが Playwright ツールを介してブラウザーを運転する橋を開きます。ピクセルではなく自然言語の指示とアクセシビリティツリーを使います。これは精神的には codegen に近く、同じく意味を優先しますが、ループがリアルタイムでモデル駆動である点が異なります。QA にとって MCP は探索的テストやバグ再現の素早い構築に有用です。しかし安定した回帰スイートを置き換えるものではありません。探索ツールであり、残す価値のあるものは決定的な spec に結晶化させる必要があります。"
      ),
      WARN(
        "Đừng chạy quy trình QA chính thức bằng MCP để mô hình 'tuỳ ứng' mỗi lần chạy. Test hồi quy phải xác định (deterministic) và có tính lặp; giao diện lái theo mô hình dễ cho kết quả khác nhau giữa các lần, phá vỡ tính lặp lại.",
        "Don't run your official QA pipeline via MCP letting the model 'improvise' each run. Regression tests must be deterministic and repeatable; model-driven interaction can yield different results between runs, breaking reproducibility.",
        "公式の QA パイプラインを MCP で実行し、毎回モデルに『即興』させないでください。回帰テストは決定的で再現可能でなければなりません。モデル駆動の操作は実行ごとに異なる結果を生み、再現性を壊す可能性があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Đưa codegen vào CI và quy trình review",
      en: "12. Bringing codegen into CI and the review process",
      ja: "12. codegen を CI とレビュープロセスに組み込む",
    },
    blocks: [
      P(
        "Codegen thường chạy trên máy cá nhân, không trong CI. Nhưng sản phẩm của nó — spec đã dọn — phải đi qua đúng quy trình review như mọi mã khác. Quy tắc vàng: mọi test do codegen hay agent sinh đều phải được một người review trước khi merge, đặc biệt soi locator giòn và oracle yếu. Trong pipeline, ta bật trace retain-on-failure-and-retries để khi test đỏ có bằng chứng đầy đủ, và per-error reporting để mỗi lỗi hiện ngữ cảnh riêng. Việc này biến bản nháp máy sinh thành tài sản kiểm thử đáng tin.",
        "Codegen usually runs on a developer machine, not in CI. But its output — the cleaned spec — must go through the same review process as any other code. The golden rule: every test generated by codegen or an agent must be reviewed by a human before merge, especially scanning for brittle locators and weak oracles. In the pipeline, enable trace retain-on-failure-and-retries so red tests carry full evidence, and per-error reporting so each failure shows its own context. This turns a machine-generated draft into a trustworthy test asset.",
        "codegen は通常 CI ではなく開発者のマシンで実行します。しかしその成果物、つまり整理された spec は、他のコードと同じレビュープロセスを通す必要があります。黄金律は、codegen やエージェントが生成したすべてのテストはマージ前に人間がレビューすること、特に壊れやすいロケーターと弱いオラクルを精査することです。パイプラインでは trace retain-on-failure-and-retries を有効にして赤いテストが十分な証拠を持つようにし、per-error レポートで各失敗が独自のコンテキストを表示するようにします。これにより機械生成の下書きが信頼できるテスト資産になります。"
      ),
      CODE("yaml", `# .github/workflows/e2e.yml
name: e2e
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
        env:
          QA_USER: \${{ secrets.QA_USER }}
          QA_PASS: \${{ secrets.QA_PASS }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/`),
      QA(
        "Có nên commit mã codegen thô trực tiếp vào repo không?",
        "Should you commit raw codegen output directly into the repo?",
        "Không nên. Mã thô đầy locator giòn, thiếu oracle nghiệp vụ và không theo POM của dự án. Hãy coi nó như bản nháp: dọn dẹp, trích POM, thay điểm neo bằng oracle thật, rồi mới mở PR để review như mã bình thường. Commit thẳng mã thô làm nợ kỹ thuật tích tụ nhanh.",
        "No. Raw output is full of brittle locators, lacks business oracles, and doesn't follow the project's POM. Treat it as a draft: clean it, extract POM, replace anchors with real oracles, then open a PR for review like normal code. Committing raw output accumulates technical debt fast.",
        "codegen の生の出力を直接リポジトリにコミットすべきですか？",
        "すべきではありません。生の出力は壊れやすいロケーターだらけで、業務オラクルを欠き、プロジェクトの POM に従っていません。下書きとして扱い、整理し、POM を抽出し、アンカーを本物のオラクルに置き換えてから、通常のコードと同様に PR を開いてレビューします。生の出力を直接コミットすると技術的負債が急速に蓄積します。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: codegen, auto-assertion & AI agent",
      en: "13. Interview angle: codegen, auto-assertions & AI agents",
      ja: "13. 面接の観点: codegen、自動アサーション、AI エージェント",
    },
    blocks: [
      P(
        "Trong phỏng vấn QA cấp cao, câu hỏi về codegen ít khi hỏi cú pháp lệnh; chúng thăm dò xem bạn có tư duy đúng về vai trò của công cụ. Nhà tuyển dụng muốn nghe bạn phân biệt được: codegen dựng khung, con người viết oracle; auto-assertion là điểm neo, không phải kiểm chứng nghiệp vụ; agent tăng tốc nhưng cần biên giới trách nhiệm rõ. Nếu bạn nói 'tôi để công cụ sinh hết test' bạn sẽ rớt; nếu bạn trình bày quy trình phân vai và cách phòng ảo giác của agent, bạn ghi điểm. Dưới đây là vài câu hỏi mẫu và hướng trả lời.",
        "In senior QA interviews, questions about codegen rarely ask command syntax; they probe whether you think correctly about the tool's role. Interviewers want to hear you distinguish: codegen scaffolds, humans write oracles; auto-assertion is an anchor, not business verification; agents accelerate but need clear responsibility boundaries. If you say 'I let the tool generate all tests' you fail; if you present a division-of-labor process and how you guard against agent hallucination, you score. Below are sample questions and answer directions.",
        "シニア QA の面接では、codegen に関する質問はコマンド構文を問うことはまれで、ツールの役割について正しく考えているかを探ります。面接官は次を区別して聞きたいのです。codegen は骨組みを作り、人間がオラクルを書く。自動アサーションはアンカーであり業務検証ではない。エージェントは加速するが明確な責任境界が必要。『ツールにすべてのテストを生成させる』と言えば落ちます。役割分担のプロセスとエージェントのハルシネーション対策を提示すれば得点します。以下にサンプル質問と回答の方向性を示します。"
      ),
      QA(
        "Khi nào bạn chọn codegen, khi nào chọn viết tay, khi nào dùng agent?",
        "When do you choose codegen, when hand-writing, when an agent?",
        "Codegen khi cần dựng nhanh khung một luồng mới hoặc học locator chuẩn của app. Viết tay khi cần oracle tinh vi, test dữ liệu biên, hay logic phức tạp mà công cụ khó suy ra. Agent khi cần mở rộng độ phủ trên nhiều module và có sẵn seed chứa oracle để kế thừa. Ba cách bổ trợ nhau; điểm chung là con người luôn review và kiểm soát oracle cuối cùng.",
        "Codegen when I need to quickly scaffold a new flow or learn the app's standard locators. Hand-writing when I need subtle oracles, boundary-data tests, or complex logic the tool can't infer. Agents when I need to expand coverage across many modules and have a seed with oracles to inherit. The three complement each other; the constant is that humans always review and control the final oracle.",
        "codegen、手書き、エージェントをそれぞれいつ選びますか？",
        "codegen は新しいフローの骨組みを素早く作るときや、アプリの標準ロケーターを学ぶときです。手書きは繊細なオラクル、境界データテスト、ツールが推論しにくい複雑なロジックが必要なときです。エージェントは多数のモジュールでカバレッジを広げ、継承すべきオラクルを含む seed があるときです。3つは互いに補完し合い、共通点は人間が常にレビューし最終オラクルを制御することです。"
      ),
      SCEN(
        "Câu hỏi tình huống điển hình",
        "A typical situational question",
        "Người phỏng vấn kể: 'Đội bạn dùng codegen sinh 200 test trong một tuần, nhưng ba tháng sau 40% test đỏ giả mỗi lần chạy. Chuyện gì đã xảy ra và bạn sửa thế nào?' Câu trả lời tốt: nguyên nhân gần chắc là locator giòn (nth, text hiển thị) do commit thẳng mã thô không review. Sửa: audit locator, thay bằng test id/vai trò, gắn data-qa cùng lập trình viên, thêm cổng review bắt buộc, và bật trace để phân biệt fail thật với fail giả.",
        "The interviewer says: 'Your team used codegen to generate 200 tests in a week, but three months later 40% flake red every run. What happened and how do you fix it?' A good answer: the near-certain cause is brittle locators (nth, visible text) from committing raw output without review. Fix: audit locators, swap to test-id/role, add data-qa with developers, add a mandatory review gate, and enable traces to distinguish real failures from false ones.",
        "典型的な状況質問",
        "面接官が言います。『あなたのチームは codegen で1週間に200のテストを生成しましたが、3か月後には実行ごとに40%が赤くフレークします。何が起きて、どう直しますか？』良い回答はこうです。ほぼ確実な原因はレビューなしに生の出力をコミットしたことによる壊れやすいロケーター（nth、表示テキスト）です。修正は、ロケーターを監査し、test-id/ロールに置き換え、開発者とともに data-qa を付け、必須のレビューゲートを追加し、trace を有効にして本物の失敗と偽の失敗を区別することです。"
      ),
      P(
        "Tóm lại, codegen năm 2026 không còn là 'đồ chơi cho người mới' mà là một mắt xích trong chuỗi công cụ AI-native: ghi nhanh, auto-assertion làm điểm neo, skills mode cho agent lặp rẻ, và con người giữ oracle. Ai nắm được sự phân vai này sẽ vừa tăng tốc vừa giữ chất lượng — đúng thứ mà công ty lớn tìm kiếm ở một kỹ sư kiểm thử giỏi.",
        "In short, codegen in 2026 is no longer a 'beginner's toy' but a link in the AI-native tool chain: fast recording, auto-assertions as anchors, skills mode for cheap agent iteration, and humans holding the oracle. Whoever masters this division of labor gains both speed and quality — exactly what large companies seek in a strong test engineer.",
        "要するに、2026 年の codegen はもはや『初心者のおもちゃ』ではなく、AI ネイティブなツールチェーンの一環です。素早い記録、アンカーとしての自動アサーション、安価なエージェント反復のための skills モード、そしてオラクルを握る人間。この役割分担を習得した者は速度と品質の両方を得ます。まさに大企業が優秀なテストエンジニアに求めるものです。"
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — WebAuthn passkeys & Web Storage API testing (Playwright 1.61).
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Vì sao passkey trở thành bài toán kiểm thử của ngân hàng",
      en: "1. Why passkeys became a testing problem for banks",
      ja: "1. なぜパスキーが銀行のテスト課題になったのか",
    },
    blocks: [
      P(
        "Passkey là chuẩn đăng nhập không mật khẩu dựa trên WebAuthn: thay vì gõ mật khẩu, người dùng xác thực bằng khoá riêng lưu trên thiết bị (vân tay, Face ID, khoá bảo mật). Với ngân hàng, passkey giảm mạnh rủi ro lừa đảo và nhồi thông tin đăng nhập, nên nhiều tổ chức đang chuyển sang bắt buộc passkey cho 2FA hoặc đăng nhập chính. Nhưng điều này đặt ra bài toán kiểm thử hóc búa: làm sao test luồng đăng nhập passkey một cách tự động, lặp lại được, mà không cần vân tay thật hay thiết bị vật lý? Playwright 1.61 trả lời bằng WebAuthn virtual authenticator.",
        "A passkey is a passwordless login standard based on WebAuthn: instead of typing a password, the user authenticates with a private key stored on the device (fingerprint, Face ID, security key). For banks, passkeys sharply reduce phishing and credential-stuffing risk, so many institutions are moving to mandate passkeys for 2FA or primary login. But this poses a hard testing problem: how do you test a passkey login flow automatically and repeatably, without a real fingerprint or a physical device? Playwright 1.61 answers with the WebAuthn virtual authenticator.",
        "パスキーは WebAuthn に基づくパスワードレスログイン標準です。パスワードを入力する代わりに、ユーザーはデバイスに保存された秘密鍵（指紋、Face ID、セキュリティキー）で認証します。銀行にとってパスキーはフィッシングと認証情報の詰め込み攻撃のリスクを大幅に減らすため、多くの機関が 2FA や主要ログインでパスキーを必須にしつつあります。しかしこれは難しいテスト課題を生みます。実際の指紋や物理デバイスなしに、どうやってパスキーログインフローを自動的かつ再現可能にテストするのか？ Playwright 1.61 は WebAuthn 仮想認証器で答えます。"
      ),
      UL(
        ["Passkey dùng cặp khoá công khai/riêng, khoá riêng không rời thiết bị.",
         "Không có mật khẩu để đánh cắp hay nhồi — chống phishing tốt hơn.",
         "Ngân hàng bắt buộc passkey cho giao dịch giá trị cao hoặc đổi thông tin.",
         "Thách thức test: tự động hoá xác thực sinh trắc mà không có thiết bị thật."],
        ["Passkeys use a public/private key pair; the private key never leaves the device.",
         "No password to steal or stuff — better phishing resistance.",
         "Banks mandate passkeys for high-value transactions or profile changes.",
         "Test challenge: automate biometric auth without a real device."],
        ["パスキーは公開鍵・秘密鍵のペアを使い、秘密鍵はデバイスから離れません。",
         "盗んだり詰め込んだりするパスワードがなく、フィッシング耐性が高いです。",
         "銀行は高額取引やプロフィール変更でパスキーを必須にします。",
         "テストの課題: 実デバイスなしで生体認証を自動化することです。"]
      ),
      NOTE(
        "WebAuthn dùng challenge-response ký số: server gửi thử thách ngẫu nhiên, thiết bị ký bằng khoá riêng, server xác minh bằng khoá công khai đã đăng ký. Không có bí mật chia sẻ nào truyền qua mạng, đó là lý do nó chống phishing.",
        "WebAuthn uses signed challenge-response: the server sends a random challenge, the device signs it with the private key, the server verifies with the registered public key. No shared secret travels the network, which is why it resists phishing.",
        "WebAuthn は署名されたチャレンジ・レスポンスを使います。サーバーがランダムなチャレンジを送り、デバイスが秘密鍵で署名し、サーバーが登録済みの公開鍵で検証します。共有秘密がネットワークを流れないため、フィッシングに耐性があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "2. WebAuthn virtual authenticator: khái niệm cốt lõi",
      en: "2. WebAuthn virtual authenticator: core concept",
      ja: "2. WebAuthn 仮想認証器: 核心概念",
    },
    blocks: [
      P(
        "Virtual authenticator là một trình xác thực WebAuthn ảo do trình duyệt cung cấp qua giao thức CDP, cho phép test tạo passkey trong bộ nhớ và ký thử thách như một thiết bị thật, nhưng hoàn toàn bằng phần mềm. Playwright 1.61 gói tính năng này thành API tiện dụng. Bạn khai báo loại authenticator (ctap2 cho khoá bảo mật, internal cho sinh trắc gắn máy), giao thức truyền (usb, nfc, internal), và các cờ như userVerified hay hasResidentKey. Từ đó, khi trang gọi navigator.credentials.create hay get, trình duyệt dùng authenticator ảo để đáp ứng, không hề bật hộp thoại sinh trắc thật.",
        "A virtual authenticator is a browser-provided fake WebAuthn authenticator exposed over CDP, letting tests create in-memory passkeys and sign challenges like a real device but entirely in software. Playwright 1.61 wraps this into a convenient API. You declare the authenticator type (ctap2 for security keys, internal for built-in biometrics), the transport (usb, nfc, internal), and flags like userVerified or hasResidentKey. Then, when the page calls navigator.credentials.create or get, the browser uses the virtual authenticator to respond, never popping a real biometric dialog.",
        "仮想認証器は、ブラウザーが CDP 経由で公開する偽の WebAuthn 認証器で、テストがメモリ内にパスキーを作成し、実デバイスのようにチャレンジに署名できますが、完全にソフトウェアで行います。Playwright 1.61 はこれを便利な API にまとめました。認証器の種類（セキュリティキー用の ctap2、内蔵生体認証用の internal）、トランスポート（usb、nfc、internal）、userVerified や hasResidentKey といったフラグを宣言します。そしてページが navigator.credentials.create や get を呼ぶと、ブラウザーは仮想認証器で応答し、実際の生体認証ダイアログを一切表示しません。"
      ),
      IMG(svgWebauthn,
        "Luồng passkey: test cấu hình authenticator ảo → ký thử thách → ngân hàng xác minh chữ ký.",
        "Passkey flow: test configures a virtual authenticator → signs the challenge → the bank verifies the signature.",
        "パスキーのフロー: テストが仮想認証器を設定 → チャレンジに署名 → 銀行が署名を検証。"
      ),
      CODE("typescript", `// Bật WebAuthn virtual authenticator (Playwright 1.61)
import { test, expect } from '@playwright/test';

test('đăng nhập bằng passkey', async ({ page }) => {
  // Tạo trình xác thực ảo qua CDP session
  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  const { authenticatorId } = await client.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,        // giả lập vân tay/Face ID đã xác minh
      automaticPresenceSimulation: true,
    },
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();
  await expect(page.getByTestId('dashboard')).toBeVisible();
});`),
      TIP(
        "Đặt isUserVerified=true và automaticPresenceSimulation=true để authenticator tự 'chạm' và 'xác minh' khi trang yêu cầu, giúp luồng chạy không cần tương tác vật lý. Muốn test đường thất bại, đặt isUserVerified=false rồi khẳng định app từ chối.",
        "Set isUserVerified=true and automaticPresenceSimulation=true so the authenticator auto-'taps' and 'verifies' when the page asks, letting the flow run without physical interaction. To test the failure path, set isUserVerified=false and assert the app rejects.",
        "isUserVerified=true と automaticPresenceSimulation=true を設定すると、ページが要求したときに認証器が自動で『タップ』し『検証』し、物理的な操作なしにフローが動きます。失敗経路をテストするには isUserVerified=false にして、アプリが拒否することを主張します。"
      ),
    ],
  },
  {
    heading: {
      vi: "3. Đăng ký passkey mới (registration) trong test",
      en: "3. Registering a new passkey in a test",
      ja: "3. テストでの新規パスキー登録",
    },
    blocks: [
      P(
        "Trước khi test đăng nhập, ứng dụng phải có ít nhất một passkey đã đăng ký cho tài khoản. Có hai cách: một là để chính test thực hiện luồng đăng ký (gọi navigator.credentials.create thông qua UI), authenticator ảo sẽ tự tạo và lưu credential; hai là chèn sẵn credential vào authenticator qua lệnh addCredential nếu bạn muốn tách bước đăng ký khỏi test đăng nhập. Cách đầu kiểm được cả luồng đăng ký end-to-end; cách sau nhanh và cô lập hơn khi bạn chỉ quan tâm tới đăng nhập. Cả hai đều không cần thiết bị thật.",
        "Before testing login, the app must have at least one passkey registered for the account. There are two ways: one, let the test itself run the registration flow (calling navigator.credentials.create through the UI), and the virtual authenticator creates and stores the credential; two, pre-inject a credential into the authenticator via addCredential if you want to separate registration from the login test. The first tests the full registration flow end-to-end; the second is faster and more isolated when you only care about login. Neither needs a real device.",
        "ログインをテストする前に、アプリはアカウントに対して少なくとも1つのパスキーが登録されている必要があります。方法は2つです。一つ、テスト自体に登録フローを実行させ（UI 経由で navigator.credentials.create を呼ぶ）、仮想認証器が認証情報を作成・保存します。二つ、ログインテストから登録を分離したい場合、addCredential で認証情報を事前注入します。前者は登録フロー全体をエンドツーエンドでテストし、後者はログインだけに関心がある場合に速く分離的です。どちらも実デバイスは不要です。"
      ),
      CODE("typescript", `// Cách 1: chạy luồng đăng ký qua UI, authenticator ảo tự lưu credential
test('đăng ký passkey rồi đăng nhập lại', async ({ page }) => {
  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true, isUserVerified: true },
  });
  await page.goto('/settings/security');
  await page.getByRole('button', { name: 'Thêm passkey' }).click();
  await expect(page.getByText('Passkey đã được tạo')).toBeVisible();

  // Đăng xuất rồi đăng nhập lại bằng passkey vừa tạo
  await page.getByRole('button', { name: 'Đăng xuất' }).click();
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();
  await expect(page.getByTestId('dashboard')).toBeVisible();
});`),
      QA(
        "Nên test đăng ký và đăng nhập passkey trong cùng một test hay tách ra?",
        "Should you test passkey registration and login in one test or separately?",
        "Tuỳ mục tiêu. Có một test end-to-end đi qua cả đăng ký lẫn đăng nhập để chứng minh luồng thật liền mạch. Nhưng cho các test đăng nhập biến thể (thất bại, đổi thiết bị, khoá bị thu hồi), hãy chèn sẵn credential để cô lập, tránh phụ thuộc vào bước đăng ký và giữ test nhanh, ổn định.",
        "It depends on the goal. Keep one end-to-end test covering both registration and login to prove the real flow is seamless. But for login variant tests (failure, device change, revoked key), pre-inject a credential to isolate, avoiding dependency on the registration step and keeping tests fast and stable.",
        "パスキーの登録とログインを1つのテストでテストすべきか、分けるべきか？",
        "目的次第です。登録とログインの両方をカバーするエンドツーエンドテストを1つ持ち、実フローが途切れないことを証明します。しかしログインのバリアントテスト（失敗、デバイス変更、鍵の失効）では、認証情報を事前注入して分離し、登録ステップへの依存を避け、テストを速く安定に保ちます。"
      ),
    ],
  },
  {
    heading: {
      vi: "4. Test đường thất bại: passkey sai, chưa xác minh, bị thu hồi",
      en: "4. Testing failure paths: wrong passkey, unverified, revoked",
      ja: "4. 失敗経路のテスト: 誤ったパスキー、未検証、失効",
    },
    blocks: [
      P(
        "Một luồng passkey chỉ được coi là kiểm thử đầy đủ khi ta phủ cả đường thất bại, không chỉ đường xanh. Với authenticator ảo, ta mô phỏng nhiều tình huống: người dùng không vượt qua xác minh sinh trắc (isUserVerified=false), thiết bị không có credential phù hợp (authenticator rỗng), hoặc credential đã bị thu hồi phía server. Mỗi tình huống phải cho ra kết quả đúng: app hiển thị lỗi rõ ràng, không cấp phiên, và ghi log kiểm toán. Đây là phần dễ bị bỏ sót nhưng lại là nơi ngân hàng quan tâm nhất, vì lỗ hổng xác thực là rủi ro nghiêm trọng.",
        "A passkey flow is only fully tested when you cover failure paths too, not just the green path. With the virtual authenticator, you simulate many situations: the user fails biometric verification (isUserVerified=false), the device has no matching credential (empty authenticator), or the credential was revoked server-side. Each situation must yield the correct result: the app shows a clear error, grants no session, and writes an audit log. This part is easy to miss but is exactly where banks care most, because auth flaws are severe risks.",
        "パスキーフローは、緑の経路だけでなく失敗経路もカバーして初めて完全にテストされたと言えます。仮想認証器では多くの状況をシミュレートできます。ユーザーが生体認証に失敗する（isUserVerified=false）、デバイスに一致する認証情報がない（空の認証器）、認証情報がサーバー側で失効した、などです。各状況は正しい結果を出す必要があります。アプリが明確なエラーを表示し、セッションを付与せず、監査ログを書き込むことです。この部分は見落としやすいですが、まさに銀行が最も気にする箇所です。認証の欠陥は深刻なリスクだからです。"
      ),
      CODE("typescript", `// Đường thất bại: xác minh sinh trắc KHÔNG thành công
test('từ chối khi không vượt xác minh sinh trắc', async ({ page }) => {
  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  const { authenticatorId } = await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true,
               isUserVerified: false },  // giả lập vân tay SAI / bị từ chối
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();

  // ORACLE: app KHÔNG cấp phiên, hiện lỗi, vẫn ở trang login
  await expect(page.getByRole('alert')).toContainText('Xác thực thất bại');
  await expect(page).toHaveURL(/\\/login/);
  await expect(page.getByTestId('dashboard')).toHaveCount(0);
});`),
      WARN(
        "Đừng chỉ khẳng định 'thấy thông báo lỗi'. Phải khẳng định thêm: KHÔNG có phiên/cookie hợp lệ được cấp, người dùng vẫn ở trang đăng nhập, và không truy cập được tài nguyên bảo vệ. Một app lỗi có thể hiện lỗi mà vẫn lén cấp phiên — oracle phải bắt được điều đó.",
        "Don't just assert 'an error message appears'. Also assert: NO valid session/cookie is granted, the user stays on the login page, and protected resources remain inaccessible. A buggy app might show an error yet sneakily grant a session — the oracle must catch that.",
        "『エラーメッセージが表示される』とだけ主張してはいけません。さらに、有効なセッション/cookie が付与されない、ユーザーがログインページに留まる、保護されたリソースにアクセスできない、ことを主張します。バグのあるアプリはエラーを表示しつつこっそりセッションを付与するかもしれません。オラクルはそれを捕まえる必要があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "5. Web Storage API: page.localStorage trực tiếp (v1.61)",
      en: "5. Web Storage API: direct page.localStorage (v1.61)",
      ja: "5. Web Storage API: 直接の page.localStorage（v1.61）",
    },
    blocks: [
      P(
        "Trước 1.61, để đọc/ghi localStorage trong test bạn phải chui vào page.evaluate và chạy JavaScript trong trang, khá dài dòng. Playwright 1.61 thêm API trực tiếp page.localStorage cho phép thao tác Web Storage như một đối tượng gọn gàng từ code test. Với ngân hàng, điều này hữu ích để kiểm tra ứng dụng lưu gì ở client: token phiên có được cất đúng chỗ không, dữ liệu nhạy cảm có bị lưu lộ liễu không, cờ tính năng có đúng không. Đọc trực tiếp giúp viết oracle về trạng thái client rõ ràng và ngắn gọn hơn nhiều.",
        "Before 1.61, reading/writing localStorage in a test required diving into page.evaluate and running JavaScript in the page, quite verbose. Playwright 1.61 adds a direct page.localStorage API letting you manipulate Web Storage as a tidy object from test code. For banks, this helps inspect what the app stores client-side: is the session token stored in the right place, is sensitive data stored in the clear, are feature flags correct. Direct reads make oracles about client state much clearer and shorter.",
        "1.61 より前は、テストで localStorage を読み書きするには page.evaluate に入り込みページ内で JavaScript を実行する必要があり、かなり冗長でした。Playwright 1.61 は直接の page.localStorage API を追加し、テストコードから Web Storage をきれいなオブジェクトとして操作できます。銀行にとってこれは、アプリがクライアント側に何を保存しているかを検査するのに役立ちます。セッショントークンが正しい場所に保存されているか、機密データが平文で保存されていないか、機能フラグが正しいか。直接読むことで、クライアント状態に関するオラクルがはるかに明確で短くなります。"
      ),
      CODE("typescript", `// TRƯỚC 1.61 — dài dòng qua page.evaluate
const token = await page.evaluate(() => localStorage.getItem('session'));

// TỪ 1.61 — API trực tiếp gọn gàng
const items = await page.localStorage();          // đọc toàn bộ
await page.localStorage.setItem('featureFlag', 'on');
const flag = await page.localStorage.getItem('featureFlag');

// ORACLE nghiệp vụ: KHÔNG lưu dữ liệu nhạy cảm ở client
test('không rò rỉ dữ liệu nhạy cảm vào localStorage', async ({ page }) => {
  await page.goto('/dashboard');
  const all = await page.localStorage();
  const raw = JSON.stringify(all);
  expect(raw).not.toContain('cardNumber');     // không lưu số thẻ
  expect(raw).not.toContain('cvv');            // không lưu CVV
  expect(raw).not.toMatch(/\\b\\d{16}\\b/);      // không có PAN 16 số
});`),
      NOTE(
        "Với ngân hàng, một test cực giá trị là quét localStorage và sessionStorage để chắc rằng không có PAN, CVV, hay PIN được lưu ở client. Đây là yêu cầu tuân thủ PCI DSS và thường bị lọt qua vì không ai nhìn vào storage.",
        "For banks, a highly valuable test scans localStorage and sessionStorage to ensure no PAN, CVV, or PIN is stored client-side. This is a PCI DSS compliance requirement and often slips through because nobody inspects storage.",
        "銀行にとって非常に価値のあるテストは、localStorage と sessionStorage をスキャンして PAN、CVV、PIN がクライアント側に保存されていないことを確認するものです。これは PCI DSS のコンプライアンス要件で、誰もストレージを検査しないためよく見逃されます。"
      ),
    ],
  },
  {
    heading: {
      vi: "6. Video retention modes cho test flaky",
      en: "6. Video retention modes for flaky tests",
      ja: "6. フレーキーテストのためのビデオ保持モード",
    },
    blocks: [
      P(
        "Test đăng nhập passkey hay có yếu tố thời gian và tương tác CDP, dễ flaky. Khi một test đỏ ngẫu nhiên, có video ghi lại phiên chạy là bằng chứng vô giá để tìm nguyên nhân. Playwright 1.61 tinh chỉnh các chế độ giữ video (video retention modes) để bạn cân bằng giữa chi phí lưu và giá trị chẩn đoán. Ba lựa chọn chính: retain-on-failure chỉ giữ video khi test fail; on-first-retry giữ khi test được thử lại; và on luôn quay (nặng, chỉ dùng khi debug). Với suite ngân hàng lớn, retain-on-failure là mặc định hợp lý, còn on-first-retry hữu ích để soi flaky.",
        "Passkey login tests often involve timing and CDP interaction, prone to flaking. When a test randomly fails, having a video of the run is invaluable evidence for root cause. Playwright 1.61 refines video retention modes so you balance storage cost against diagnostic value. Three main options: retain-on-failure keeps video only when the test fails; on-first-retry keeps it when the test is retried; and on always records (heavy, debug only). For a large bank suite, retain-on-failure is a reasonable default, while on-first-retry helps investigate flakiness.",
        "パスキーのログインテストはしばしばタイミングと CDP 操作を伴い、フレークしやすいです。テストがランダムに失敗したとき、実行のビデオがあれば根本原因を探る貴重な証拠になります。Playwright 1.61 はビデオ保持モードを洗練させ、ストレージコストと診断価値のバランスを取れるようにしました。主な3つの選択肢は、retain-on-failure がテスト失敗時のみビデオを保持、on-first-retry がリトライ時に保持、on が常に録画（重く、デバッグ専用）です。大規模な銀行スイートでは retain-on-failure が妥当なデフォルトで、on-first-retry はフレーキーの調査に役立ちます。"
      ),
      IMG(svgRetention,
        "Ba chế độ giữ video: retain-on-failure (giữ khi fail), on-first-retry (giữ khi retry), on (luôn quay).",
        "Three video retention modes: retain-on-failure, on-first-retry, and on (always).",
        "3つのビデオ保持モード: retain-on-failure（失敗時保持）、on-first-retry（リトライ時保持）、on（常時録画）。"
      ),
      CODE("typescript", `// playwright.config.ts — video retention & trace cho debug flaky
import { defineConfig } from '@playwright/test';
export default defineConfig({
  retries: 2,
  use: {
    video: 'retain-on-failure',              // giữ video khi fail
    trace: 'retain-on-failure-and-retries',  // trace đầy đủ khi fail/retry
    screenshot: 'only-on-failure',
  },
  // Điều tra flaky sâu hơn: bật on-first-retry tạm thời
  // use: { video: 'on-first-retry' },
});`),
      TIP(
        "Đừng để video ở chế độ on trên CI production — nó ngốn dung lượng và làm chậm chạy. Dùng retain-on-failure cho vận hành thường ngày, chỉ bật on-first-retry hoặc on khi đang truy vết một test flaky cụ thể.",
        "Don't leave video on 'on' in production CI — it eats disk and slows runs. Use retain-on-failure for daily operation, only enable on-first-retry or on when hunting a specific flaky test.",
        "本番 CI でビデオを 'on' のままにしないでください。ディスクを消費し実行を遅くします。日常運用では retain-on-failure を使い、特定のフレーキーテストを追跡するときだけ on-first-retry や on を有効にします。"
      ),
    ],
  },
  {
    heading: {
      vi: "7. Per-error reporting: mỗi lỗi một ngữ cảnh",
      en: "7. Per-error reporting: one context per error",
      ja: "7. エラーごとのレポート: エラーごとに1つのコンテキスト",
    },
    blocks: [
      P(
        "Một test có thể chứa nhiều assertion, và trước đây khi một test đỏ, báo cáo thường chỉ nêu lỗi đầu tiên gặp phải, che mất các vấn đề khác. Playwright 1.61 cải thiện per-error reporting: mỗi lỗi được gắn ngữ cảnh riêng — ảnh chụp, đoạn trace, thông tin mạng liên quan — giúp bạn nhìn ra nhiều vấn đề trong một lần chạy thay vì sửa từng cái rồi chạy lại. Với luồng passkey phức tạp nơi một test có thể kiểm nhiều bất biến (không cấp phiên, hiện lỗi đúng, ghi audit log), tính năng này rút ngắn đáng kể vòng lặp chẩn đoán.",
        "A test can contain many assertions, and previously when a test went red, the report usually surfaced only the first error encountered, hiding others. Playwright 1.61 improves per-error reporting: each error carries its own context — screenshot, trace snippet, related network info — helping you see multiple problems in a single run instead of fixing one then re-running. For complex passkey flows where a test may check several invariants (no session granted, correct error shown, audit log written), this feature significantly shortens the diagnostic loop.",
        "テストは多くのアサーションを含むことがあり、以前はテストが赤くなると、レポートは通常最初に遭遇したエラーのみを表面化させ、他を隠していました。Playwright 1.61 はエラーごとのレポートを改善します。各エラーが独自のコンテキスト、つまりスクリーンショット、trace の断片、関連するネットワーク情報を持ち、1回の実行で複数の問題を見られるようにします。1つ直して再実行する代わりにです。複数の不変条件（セッションを付与しない、正しいエラーを表示、監査ログを書く）を確認しうる複雑なパスキーフローでは、この機能が診断ループを大幅に短縮します。"
      ),
      CODE("typescript", `// Nhiều soft assertion — per-error report hiện TẤT CẢ lỗi kèm ngữ cảnh riêng
test('luồng passkey: kiểm nhiều bất biến cùng lúc', async ({ page }) => {
  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true, isUserVerified: false },
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();

  // expect.soft: mọi lỗi được báo cáo riêng, không dừng ở lỗi đầu
  await expect.soft(page.getByRole('alert')).toContainText('Xác thực thất bại');
  await expect.soft(page).toHaveURL(/\\/login/);
  const store = await page.localStorage();
  expect.soft(JSON.stringify(store)).not.toContain('session');
});`),
      QA(
        "expect.soft khác gì expect thường, và khi nào dùng cho luồng auth?",
        "How does expect.soft differ from plain expect, and when to use it in auth flows?",
        "expect thường dừng test ngay khi một assertion fail; expect.soft ghi nhận lỗi nhưng vẫn chạy tiếp, để cuối test báo cáo tất cả lỗi cùng ngữ cảnh riêng. Trong luồng auth, dùng soft khi muốn kiểm nhiều bất biến độc lập trong một lần (không cấp phiên, hiện lỗi, không lưu token) để một lần chạy phát hiện nhiều vấn đề. Nhưng với điều kiện tiên quyết (phải đăng nhập được mới test tiếp), vẫn dùng expect cứng để dừng sớm.",
        "Plain expect stops the test the moment an assertion fails; expect.soft records the failure but keeps running, reporting all failures with their own context at the end. In auth flows, use soft to check several independent invariants in one pass (no session, error shown, no token stored) so a single run surfaces multiple problems. But for preconditions (must be logged in to proceed), keep hard expect to fail fast.",
        "expect.soft は通常の expect とどう違い、認証フローではいつ使いますか？",
        "通常の expect はアサーション失敗の瞬間にテストを止めます。expect.soft は失敗を記録しつつ実行を続け、最後にすべての失敗を独自のコンテキスト付きで報告します。認証フローでは、複数の独立した不変条件を1回で確認する（セッションなし、エラー表示、トークン非保存）ときに soft を使い、1回の実行で複数の問題を表面化させます。ただし前提条件（ログインできて初めて次へ進める）には、早期失敗のため硬い expect を使います。"
      ),
    ],
  },
  {
    heading: {
      vi: "8. Bài toán oracle: đăng nhập passkey ngân hàng",
      en: "8. The oracle problem: a bank passkey login",
      ja: "8. オラクル問題: 銀行のパスキーログイン",
    },
    blocks: [
      P(
        "Đây là ví dụ oracle-first cho một ngân hàng số. Bối cảnh: khách hàng đăng nhập bằng passkey để vào tài khoản. Bất biến nghiệp vụ không chỉ là 'thấy dashboard' mà là chuỗi điều kiện: chỉ passkey đã đăng ký cho đúng userId mới mở được phiên; phiên phải gắn đúng khách hàng, không lẫn sang tài khoản khác; mọi lần đăng nhập đều ghi audit log với dấu thời gian và loại xác thực; và số dư hiển thị phải khớp với số dư sổ cái ở backend. Oracle mạnh khẳng định các điều kiện này, chứ không chỉ khẳng định trang tải xong.",
        "Here is an oracle-first example for a digital bank. Context: a customer logs in with a passkey to reach their account. The business invariant is not just 'see the dashboard' but a chain of conditions: only a passkey registered for the correct userId can open a session; the session must bind to the right customer, never leaking into another account; every login writes an audit log with timestamp and auth type; and the displayed balance must match the ledger balance in the backend. A strong oracle asserts these conditions, not merely that the page loaded.",
        "ここにデジタル銀行のオラクルファーストの例を示します。文脈は、顧客がパスキーでログインして口座に到達することです。業務上の不変条件は単に『ダッシュボードを見る』ではなく、条件の連鎖です。正しい userId に登録されたパスキーのみがセッションを開ける、セッションは正しい顧客に紐づき他の口座に漏れない、すべてのログインがタイムスタンプと認証種別付きの監査ログを書く、表示される残高がバックエンドの元帳残高と一致する。強いオラクルはこれらの条件を主張し、単にページが読み込まれたことだけを主張しません。"
      ),
      SCEN(
        "Đăng nhập passkey như một oracle",
        "Passkey login as an oracle",
        "Ngân hàng NeoBank bắt buộc passkey cho đăng nhập. Đội QA viết test: tạo authenticator ảo, đăng ký passkey cho userId=1001, đăng nhập, rồi khẳng định bốn bất biến. Một: dashboard hiện đúng tên khách 1001, không phải ai khác. Hai: gọi API /me trả về userId=1001, chứng minh phiên gắn đúng người. Ba: bảng audit_log có một dòng mới loại 'PASSKEY' cho 1001. Bốn: số dư trên UI khớp số dư từ API sổ cái. Nếu bất kỳ điều nào sai, đó là lỗi nghiêm trọng về xác thực hoặc cô lập phiên.",
        "NeoBank mandates passkeys for login. The QA team writes a test: create a virtual authenticator, register a passkey for userId=1001, log in, then assert four invariants. One: the dashboard shows customer 1001's name, nobody else's. Two: calling API /me returns userId=1001, proving the session binds to the right person. Three: the audit_log table has a new 'PASSKEY' row for 1001. Four: the UI balance matches the ledger API balance. If any of these is wrong, it is a severe authentication or session-isolation bug.",
        "オラクルとしてのパスキーログイン",
        "NeoBank はログインにパスキーを必須にしています。QA チームはテストを書きます。仮想認証器を作成し、userId=1001 にパスキーを登録し、ログインし、4つの不変条件を主張します。一つ、ダッシュボードが顧客 1001 の名前を表示し、他の誰でもない。二つ、API /me が userId=1001 を返し、セッションが正しい人に紐づくことを証明する。三つ、audit_log テーブルに 1001 の新しい 'PASSKEY' 行がある。四つ、UI の残高が元帳 API の残高と一致する。いずれかが誤っていれば、認証またはセッション分離の深刻なバグです。"
      ),
      CODE("typescript", `// Oracle-first: đăng nhập passkey NeoBank
test('passkey mở đúng phiên cho đúng khách + audit + số dư khớp', async ({ page, request }) => {
  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true, isUserVerified: true },
  });
  // (giả định đã đăng ký passkey cho userId=1001 qua fixture setup)
  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();

  // 1) Đúng khách hàng
  await expect(page.getByTestId('customer-name')).toHaveText('Nguyễn Văn A');
  // 2) Phiên gắn đúng userId
  const me = await request.get('/api/me');
  expect((await me.json()).userId).toBe(1001);
  // 3) Có audit log loại PASSKEY
  const audit = await request.get('/api/audit?userId=1001&latest=1');
  expect((await audit.json()).type).toBe('PASSKEY');
  // 4) Số dư UI khớp sổ cái
  const ledger = await request.get('/api/ledger/balance?userId=1001');
  const uiBalance = await page.getByTestId('balance').innerText();
  expect(uiBalance).toContain((await ledger.json()).balance);
});`),
    ],
  },
  {
    heading: {
      vi: "9. Cô lập tenant và chống lẫn phiên",
      en: "9. Tenant isolation and cross-session leakage",
      ja: "9. テナント分離とセッション漏洩防止",
    },
    blocks: [
      P(
        "Một rủi ro chết người trong ngân hàng số là lẫn phiên: khách A vô tình thấy dữ liệu khách B do lỗi cache, lỗi gán phiên, hay lỗi phân quyền. Passkey không tự động ngăn điều này; nó chỉ xác thực đúng danh tính, còn việc gắn phiên và cô lập dữ liệu là logic phía server phải test riêng. Test cô lập chạy song song hai phiên với hai passkey khác nhau, rồi khẳng định mỗi phiên chỉ thấy dữ liệu của mình, gọi API chéo bị từ chối, và không có rò rỉ qua localStorage dùng chung. Đây là loại test mà mọi ngân hàng nghiêm túc đều bắt buộc.",
        "A deadly risk in digital banking is session leakage: customer A accidentally sees customer B's data due to a cache bug, session-binding bug, or authorization bug. Passkeys don't automatically prevent this; they only authenticate the right identity, while session binding and data isolation are server-side logic that must be tested separately. An isolation test runs two sessions in parallel with two different passkeys, then asserts each session sees only its own data, cross-account API calls are rejected, and there is no leakage via shared localStorage. This is a test every serious bank mandates.",
        "デジタルバンキングにおける致命的なリスクはセッション漏洩です。キャッシュのバグ、セッション紐付けのバグ、認可のバグにより、顧客 A が誤って顧客 B のデータを見てしまうことです。パスキーはこれを自動的に防ぎません。正しい身元を認証するだけで、セッションの紐付けとデータ分離はサーバー側のロジックであり、別途テストする必要があります。分離テストは2つの異なるパスキーで2つのセッションを並行実行し、各セッションが自分のデータのみを見る、口座横断の API 呼び出しが拒否される、共有 localStorage 経由の漏洩がない、ことを主張します。これは真面目な銀行なら必ず必須にするテストです。"
      ),
      CODE("typescript", `// Cô lập: hai khách, hai context, không lẫn dữ liệu
test('hai phiên passkey không lẫn dữ liệu', async ({ browser }) => {
  const ctxA = await browser.newContext();
  const ctxB = await browser.newContext();
  // ... đăng nhập passkey userId=1001 ở ctxA, userId=2002 ở ctxB ...
  const pageA = await ctxA.newPage();
  const pageB = await ctxB.newPage();

  await expect(pageA.getByTestId('customer-name')).toHaveText('Khách 1001');
  await expect(pageB.getByTestId('customer-name')).toHaveText('Khách 2002');

  // Gọi chéo tài khoản phải bị từ chối 403
  const cross = await ctxA.request.get('/api/accounts/2002');
  expect(cross.status()).toBe(403);

  await ctxA.close();
  await ctxB.close();
});`),
      WARN(
        "Không dùng chung một browser context cho nhiều 'người dùng'. Cookie và localStorage chia sẻ trong cùng context sẽ che giấu lỗi lẫn phiên. Mỗi khách phải một browser context riêng để test cô lập có giá trị.",
        "Never share one browser context across multiple 'users'. Cookies and localStorage shared within one context will mask session-leakage bugs. Each customer needs their own browser context for isolation tests to be meaningful.",
        "複数の『ユーザー』で1つのブラウザーコンテキストを共有しないでください。1つのコンテキスト内で共有される cookie と localStorage はセッション漏洩バグを隠します。分離テストが意味を持つには、各顧客が独自のブラウザーコンテキストを持つ必要があります。"
      ),
    ],
  },
  {
    heading: {
      vi: "10. Trace Viewer và HAR để chẩn đoán luồng passkey",
      en: "10. Trace Viewer and HAR to diagnose passkey flows",
      ja: "10. パスキーフロー診断のための Trace Viewer と HAR",
    },
    blocks: [
      P(
        "Khi một test passkey đỏ, việc chẩn đoán có thể khó vì luồng đi qua nhiều lớp: JavaScript trang, WebAuthn API, CDP, và backend. Trace Viewer của Playwright ghi lại từng hành động kèm ảnh chụp DOM trước-sau, lời gọi mạng với phương thức và mã trạng thái, cùng log console. Từ v1.60, HAR trở thành công dân hạng nhất trong tracing qua startHar/stopHar, cho phép bắt toàn bộ lưu lượng mạng để soi request WebAuthn và phản hồi server. Bạn còn có thể ẩn/hiện hành động routing, tìm trong code bằng Cmd/Ctrl+F, và xem JSON được tự động định dạng — tất cả giúp truy nguyên vì sao xác thực thất bại.",
        "When a passkey test goes red, diagnosis can be hard because the flow crosses many layers: page JavaScript, the WebAuthn API, CDP, and the backend. Playwright's Trace Viewer records each action with before/after DOM snapshots, network calls with method and status code, plus console logs. Since v1.60, HAR became a first-class citizen in tracing via startHar/stopHar, letting you capture all network traffic to inspect the WebAuthn request and server response. You can also show/hide routing actions, search the code with Cmd/Ctrl+F, and view auto-formatted JSON — all helping trace why authentication failed.",
        "パスキーテストが赤くなると、フローが多くの層、つまりページの JavaScript、WebAuthn API、CDP、バックエンドを横断するため、診断が難しくなります。Playwright の Trace Viewer は各アクションを前後の DOM スナップショット、メソッドとステータスコード付きのネットワーク呼び出し、console ログとともに記録します。v1.60 以降、HAR は startHar/stopHar によって tracing の第一級市民となり、すべてのネットワークトラフィックを捕捉して WebAuthn リクエストとサーバー応答を検査できます。ルーティングアクションの表示・非表示、Cmd/Ctrl+F でのコード検索、自動整形された JSON の表示も可能で、すべて認証失敗の理由を追跡するのに役立ちます。"
      ),
      CODE("typescript", `// Bắt HAR như một phần của trace để soi lưu lượng WebAuthn
test('chẩn đoán passkey qua HAR', async ({ page, context }) => {
  await context.tracing.start({ snapshots: true, screenshots: true });
  await context.tracing.startHar({ path: 'traces/passkey.har' });

  const client = await page.context().newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: { protocol: 'ctap2', transport: 'internal',
               hasResidentKey: true, hasUserVerification: true, isUserVerified: true },
  });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Đăng nhập bằng passkey' }).click();

  await context.tracing.stopHar();
  await context.tracing.stop({ path: 'traces/passkey-trace.zip' });
});`),
      TIP(
        "Mở trace bằng lệnh show-trace để xem lại từng bước như một video có thể tua. Với luồng passkey, chú ý request POST tới endpoint /webauthn/assertion và mã trạng thái trả về — đó thường là nơi lộ nguyên nhân thất bại.",
        "Open a trace with the show-trace command to replay each step like a scrubbable video. For passkey flows, watch the POST request to the /webauthn/assertion endpoint and its status code — that's usually where the failure cause reveals itself.",
        "show-trace コマンドで trace を開き、各ステップをスクラブ可能なビデオのように再生します。パスキーフローでは、/webauthn/assertion エンドポイントへの POST リクエストとそのステータスコードに注目してください。そこがたいてい失敗原因が明らかになる場所です。"
      ),
    ],
  },
  {
    heading: {
      vi: "11. Kết hợp storage state với passkey đã đăng ký",
      en: "11. Combining storage state with a registered passkey",
      ja: "11. storage state と登録済みパスキーの組み合わせ",
    },
    blocks: [
      P(
        "Với ngân hàng có nhiều test cần trạng thái 'đã đăng ký passkey', ta không muốn lặp lại đăng ký ở mỗi test. Chiến lược là dựng một fixture setup: mở context, tạo authenticator ảo, đăng ký passkey, đăng nhập, rồi lưu storage state. Tuy nhiên lưu ý quan trọng: credential của authenticator ảo sống trong bộ nhớ của context CDP, không nằm trong storage state thông thường, nên với các test đăng nhập lại bạn thường phải tái tạo authenticator và chèn lại credential đã export. Playwright cho phép getCredentials để lấy và addCredential để chèn credential giữa các phiên, giúp tái lập trạng thái đã-có-passkey một cách xác định.",
        "For a bank with many tests needing a 'passkey-registered' state, we don't want to repeat registration in each test. The strategy is to build a setup fixture: open a context, create a virtual authenticator, register a passkey, log in, then save storage state. But an important caveat: the virtual authenticator's credential lives in the CDP context memory, not in ordinary storage state, so for re-login tests you usually must recreate the authenticator and re-inject the exported credential. Playwright provides getCredentials to fetch and addCredential to inject credentials across sessions, letting you deterministically reproduce the has-passkey state.",
        "『パスキー登録済み』状態を必要とする多くのテストを持つ銀行では、各テストで登録を繰り返したくありません。戦略は setup フィクスチャを作ることです。コンテキストを開き、仮想認証器を作成し、パスキーを登録し、ログインし、storage state を保存します。ただし重要な注意点があります。仮想認証器の認証情報は CDP コンテキストのメモリ内に存在し、通常の storage state には含まれません。そのため再ログインテストでは、通常、認証器を再作成しエクスポートした認証情報を再注入する必要があります。Playwright は getCredentials で取得し addCredential で注入する機能を提供し、パスキー保有状態を決定的に再現できます。"
      ),
      CODE("typescript", `// Xuất credential từ authenticator để tái dùng ở test khác
const before = await client.send('WebAuthn.getCredentials', { authenticatorId });
// -> lưu before.credentials (base64) vào fixture

// Ở test đăng nhập lại: tái tạo authenticator + chèn lại credential
const { authenticatorId: id2 } = await client.send('WebAuthn.addVirtualAuthenticator', {
  options: { protocol: 'ctap2', transport: 'internal',
             hasResidentKey: true, hasUserVerification: true, isUserVerified: true },
});
await client.send('WebAuthn.addCredential', {
  authenticatorId: id2,
  credential: savedCredential,   // credential đã export trước đó
});`),
      NOTE(
        "Credential của authenticator ảo KHÔNG tự lưu vào storageState.json. Nếu chỉ nạp storage state mà quên tái tạo authenticator, luồng đăng nhập passkey sẽ thất bại vì không có credential nào để ký. Hãy tách rõ hai loại trạng thái: cookie/localStorage (storage state) và credential (authenticator).",
        "The virtual authenticator's credential does NOT auto-save into storageState.json. If you only load storage state but forget to recreate the authenticator, the passkey login fails because there is no credential to sign. Clearly separate two state kinds: cookies/localStorage (storage state) and credentials (authenticator).",
        "仮想認証器の認証情報は storageState.json に自動保存されません。storage state だけを読み込んで認証器の再作成を忘れると、署名する認証情報がないためパスキーログインは失敗します。2種類の状態、つまり cookie/localStorage（storage state）と認証情報（認証器）を明確に分けてください。"
      ),
    ],
  },
  {
    heading: {
      vi: "12. Đưa test passkey vào CI ổn định",
      en: "12. Making passkey tests stable in CI",
      ja: "12. CI でパスキーテストを安定させる",
    },
    blocks: [
      P(
        "Test passkey dựa trên CDP nên chỉ chạy tin cậy trên trình duyệt hỗ trợ CDP (Chromium). Trong CI, ta chốt chạy chúng trên project Chromium, tách riêng khỏi các test cross-browser để tránh nhầm lẫn. Vì Playwright 1.57 chuyển sang dùng bản Chrome for Testing, bạn nên cố định phiên bản trình duyệt để kết quả nhất quán giữa các lần chạy. Kết hợp retries hợp lý, video retain-on-failure, và trace đầy đủ, suite passkey trở nên vừa an toàn vừa dễ chẩn đoán. Cuối cùng, đừng quên bảo mật: dữ liệu authenticator và storage state không được rò ra artifact công khai. Một thói quen tốt là chạy suite passkey như một job riêng, có nhãn rõ ràng, để khi nó đỏ đội bảo mật biết ngay đây là vấn đề xác thực chứ không phải lỗi giao diện thông thường, và có thể ưu tiên xử lý đúng mức nghiêm trọng.",
        "Passkey tests rely on CDP, so they only run reliably on a CDP-capable browser (Chromium). In CI, pin them to a Chromium project, kept separate from cross-browser tests to avoid confusion. Since Playwright 1.57 switched to Chrome for Testing builds, you should pin the browser version for consistent results across runs. Combined with sensible retries, retain-on-failure video, and full traces, the passkey suite becomes both safe and easy to diagnose. Finally, don't forget security: authenticator data and storage state must not leak into public artifacts. A good habit is to run the passkey suite as a separate, clearly labeled job, so when it goes red the security team immediately knows this is an authentication issue rather than an ordinary UI bug, and can prioritize it at the right severity.",
        "パスキーテストは CDP に依存するため、CDP 対応ブラウザー（Chromium）でのみ確実に動きます。CI では Chromium プロジェクトに固定し、混乱を避けるためクロスブラウザーテストとは分けます。Playwright 1.57 が Chrome for Testing ビルドに切り替えたため、実行間で一貫した結果を得るにはブラウザーバージョンを固定すべきです。適切なリトライ、retain-on-failure ビデオ、完全な trace と組み合わせると、パスキースイートは安全かつ診断しやすくなります。最後にセキュリティを忘れずに。認証器データと storage state を公開アーティファクトに漏らしてはいけません。良い習慣は、パスキースイートを明確にラベル付けした独立したジョブとして実行することです。そうすれば赤くなったとき、セキュリティチームはこれが通常の UI バグではなく認証の問題だとすぐに分かり、適切な深刻度で優先処理できます。"
      ),
      CODE("yaml", `# .github/workflows/passkey.yml — chỉ chạy trên Chromium, cố định phiên bản
name: passkey-e2e
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test --project=chromium tests/passkey/
        env:
          NEOBANK_QA_USER: \${{ secrets.NEOBANK_QA_USER }}
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: passkey-traces
          path: traces/          # chỉ upload khi fail, không public token`),
      QA(
        "Vì sao test passkey không chạy được ổn trên Firefox/WebKit trong Playwright?",
        "Why don't passkey tests run stably on Firefox/WebKit in Playwright?",
        "Vì virtual authenticator được điều khiển qua CDP (Chrome DevTools Protocol), vốn là giao thức của Chromium. Firefox và WebKit không phơi bày cùng API điều khiển WebAuthn ảo theo cách Playwright dùng. Do đó test passkey nên khoanh vào project Chromium; muốn kiểm cross-browser cho phần còn lại của app thì tách suite riêng, không trộn với luồng passkey.",
        "Because the virtual authenticator is controlled via CDP (Chrome DevTools Protocol), which is Chromium's protocol. Firefox and WebKit don't expose the same virtual-WebAuthn control API in the way Playwright uses. So passkey tests should be scoped to a Chromium project; for cross-browser coverage of the rest of the app, keep a separate suite and don't mix it with passkey flows.",
        "なぜ Playwright でパスキーテストは Firefox/WebKit で安定して動かないのですか？",
        "仮想認証器は Chromium のプロトコルである CDP（Chrome DevTools Protocol）経由で制御されるからです。Firefox と WebKit は、Playwright が使う方法と同じ仮想 WebAuthn 制御 API を公開していません。したがってパスキーテストは Chromium プロジェクトに限定すべきです。アプリの残りのクロスブラウザーカバレッジには別スイートを保ち、パスキーフローと混ぜないでください。"
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: WebAuthn, storage & bảo mật client",
      en: "13. Interview angle: WebAuthn, storage & client security",
      ja: "13. 面接の観点: WebAuthn、ストレージ、クライアントセキュリティ",
    },
    blocks: [
      P(
        "Ở vị trí QA cho fintech hay ngân hàng, biết test passkey và soi Web Storage là điểm cộng lớn vì ít ứng viên chạm tới. Nhà tuyển dụng đánh giá cao khi bạn hiểu bản chất challenge-response của WebAuthn, biết dùng authenticator ảo để tự động hoá, và quan trọng nhất là biết viết oracle bảo mật: không rò dữ liệu nhạy cảm ra localStorage, không lẫn phiên giữa khách, ghi đủ audit log. Dưới đây là các câu hỏi thường gặp cùng hướng trả lời để bạn thể hiện chiều sâu.",
        "In a QA role for fintech or banking, knowing how to test passkeys and inspect Web Storage is a big plus because few candidates touch it. Interviewers value that you understand WebAuthn's challenge-response nature, know how to use the virtual authenticator to automate, and above all know how to write security oracles: no sensitive data leaking into localStorage, no session leakage between customers, sufficient audit logs. Below are common questions with answer directions to show your depth.",
        "フィンテックや銀行の QA 職では、パスキーのテスト方法と Web Storage の検査を知っていることは大きなプラスです。触れる候補者が少ないからです。面接官は、あなたが WebAuthn のチャレンジ・レスポンスの本質を理解し、仮想認証器を使って自動化する方法を知り、何よりセキュリティオラクル、つまり機密データを localStorage に漏らさない、顧客間でセッションを漏らさない、十分な監査ログを書く、を書けることを高く評価します。以下に深さを示すための一般的な質問と回答の方向性を示します。"
      ),
      QA(
        "Làm sao test một luồng đăng nhập sinh trắc mà không có thiết bị vật lý?",
        "How do you test a biometric login flow without a physical device?",
        "Dùng WebAuthn virtual authenticator của Playwright 1.61. Ta bật WebAuthn qua CDP, thêm authenticator ảo với protocol ctap2, transport internal, và cờ isUserVerified để mô phỏng sinh trắc đã xác minh. Trang gọi navigator.credentials.get sẽ được authenticator ảo đáp ứng, không bật hộp thoại vân tay thật. Đổi isUserVerified=false để test đường thất bại. Cách này cho luồng lặp lại được, chạy trên CI headless.",
        "Use Playwright 1.61's WebAuthn virtual authenticator. Enable WebAuthn via CDP, add a virtual authenticator with protocol ctap2, transport internal, and the isUserVerified flag to simulate verified biometrics. The page's navigator.credentials.get is answered by the virtual authenticator, no real fingerprint dialog. Flip isUserVerified=false to test the failure path. This gives a repeatable flow that runs on headless CI.",
        "物理デバイスなしで生体認証ログインフローをどうテストしますか？",
        "Playwright 1.61 の WebAuthn 仮想認証器を使います。CDP 経由で WebAuthn を有効にし、protocol ctap2、transport internal、検証済み生体をシミュレートする isUserVerified フラグ付きの仮想認証器を追加します。ページの navigator.credentials.get は仮想認証器が応答し、実際の指紋ダイアログは出ません。isUserVerified=false にして失敗経路をテストします。これによりヘッドレス CI で動く再現可能なフローが得られます。"
      ),
      QA(
        "Một test bảo mật client mà bạn luôn đưa vào cho app ngân hàng là gì?",
        "What client-security test do you always include for a banking app?",
        "Quét localStorage và sessionStorage để chắc chắn không lưu dữ liệu nhạy cảm ở dạng đọc được: không có số thẻ đầy đủ (PAN), CVV, PIN, hay token dài hạn không mã hoá. Với page.localStorage của v1.61, việc này viết gọn: đọc toàn bộ, serialize, rồi khẳng định không khớp mẫu PAN 16 số và không chứa các khoá nhạy cảm. Đây là yêu cầu tuân thủ PCI DSS và rất hay bị bỏ sót.",
        "Scan localStorage and sessionStorage to ensure no sensitive data is stored in readable form: no full card number (PAN), CVV, PIN, or long-lived unencrypted token. With v1.61's page.localStorage this is concise: read all, serialize, then assert it doesn't match a 16-digit PAN pattern and contains no sensitive keys. This is a PCI DSS compliance requirement and very often overlooked.",
        "銀行アプリに必ず含めるクライアントセキュリティテストは何ですか？",
        "localStorage と sessionStorage をスキャンして、機密データが読める形で保存されていないことを確認します。完全なカード番号（PAN）、CVV、PIN、暗号化されていない長期トークンがないことです。v1.61 の page.localStorage を使えば簡潔です。すべて読み、シリアライズし、16 桁の PAN パターンに一致せず機密キーを含まないことを主張します。これは PCI DSS のコンプライアンス要件で、非常によく見落とされます。"
      ),
      P(
        "Tổng kết, Playwright 1.61 mở ra khả năng kiểm thử những phần trước đây rất khó tự động hoá: đăng nhập passkey không cần thiết bị, và soi trạng thái client qua Web Storage API trực tiếp. Kết hợp với video retention linh hoạt và per-error reporting, đội QA ngân hàng có thể phủ cả luồng xác thực hiện đại lẫn các bất biến bảo mật nghiêm ngặt. Kỹ năng này đang trở thành lợi thế cạnh tranh rõ rệt cho kỹ sư kiểm thử trong lĩnh vực tài chính. Điều mấu chốt cần nhớ khi phỏng vấn là: công cụ giúp bạn tự động hoá được thao tác, nhưng chính tư duy oracle mới quyết định test có bắt được lỗi thật hay không. Hãy luôn trình bày cả hai vế — dùng authenticator ảo để mô phỏng, và viết assertion trên bất biến bảo mật để chứng minh giá trị.",
        "In summary, Playwright 1.61 unlocks testing of parts previously very hard to automate: passkey login without a device, and inspecting client state via the direct Web Storage API. Combined with flexible video retention and per-error reporting, a bank QA team can cover both modern auth flows and strict security invariants. This skill is becoming a clear competitive edge for test engineers in finance. The key thing to remember in an interview is: the tool lets you automate the actions, but it is the oracle thinking that decides whether a test catches real bugs. Always present both halves — use the virtual authenticator to simulate, and write assertions on security invariants to prove value.",
        "まとめると、Playwright 1.61 は以前は自動化が非常に困難だった部分のテストを可能にします。デバイスなしのパスキーログインと、直接の Web Storage API によるクライアント状態の検査です。柔軟なビデオ保持とエラーごとのレポートと組み合わせると、銀行の QA チームは最新の認証フローと厳格なセキュリティ不変条件の両方をカバーできます。このスキルは金融分野のテストエンジニアにとって明確な競争優位になりつつあります。面接で覚えておくべき要点はこうです。ツールは操作の自動化を可能にしますが、テストが本物のバグを捕まえるかを決めるのはオラクルの思考です。常に両面を提示してください。仮想認証器でシミュレートし、セキュリティ不変条件にアサーションを書いて価値を証明するのです。"
      ),
    ],
  },
];

const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-codegen-cli-skills-mode",
  cover: coverA,
  tags: tags("congnghe", "saas", "playwright", "aitesting", "tip", "foundation"),
  title: {
    vi: "Codegen + Auto-assertions + CLI/skills mode cho AI coding agent",
    en: "Codegen + Auto-assertions + CLI/skills mode for AI coding agents",
    ja: "Codegen + 自動アサーション + AI コーディングエージェント向け CLI/skills モード",
  },
  summary: {
    vi: "Dùng codegen chuyên nghiệp: ghi luồng, auto-assertion toBeVisible() mới, dọn dẹp mã sinh ra thành POM, chế độ CLI/skills tiết kiệm token cho AI agent, cặp công cụ với con người, cạm bẫy locator giòn và góc phỏng vấn.",
    en: "Use codegen professionally: record flows, the new auto-generated toBeVisible() assertions, clean generated code into POM, the token-efficient CLI/skills mode for AI agents, pairing tools with humans, brittle-locator pitfalls and the interview angle.",
    ja: "codegen をプロとして使う。フローの記録、新しい自動生成 toBeVisible() アサーション、生成コードの POM への整理、AI エージェント向けのトークン効率の良い CLI/skills モード、ツールと人間のペアリング、壊れやすいロケーターの落とし穴、面接の観点を解説します。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-webauthn-passkeys-storage",
  cover: coverB,
  tags: tags("congnghe", "banking", "playwright", "security", "realworld", "advanced"),
  title: {
    vi: "WebAuthn passkeys & Web Storage API testing (Playwright 1.61)",
    en: "WebAuthn passkeys & Web Storage API testing (Playwright 1.61)",
    ja: "WebAuthn パスキーと Web Storage API テスト（Playwright 1.61）",
  },
  summary: {
    vi: "Kiểm thử passkey/2FA bằng WebAuthn virtual authenticator không cần thiết bị thật, soi client qua page.localStorage trực tiếp, video retention cho test flaky, per-error reporting, và một ví dụ oracle đăng nhập passkey ngân hàng kèm góc phỏng vấn.",
    en: "Test passkey/2FA flows with the WebAuthn virtual authenticator without a real device, inspect the client via direct page.localStorage, video retention for flaky tests, per-error reporting, and a bank passkey-login oracle example with the interview angle.",
    ja: "実デバイスなしで WebAuthn 仮想認証器によりパスキー/2FA フローをテストし、直接の page.localStorage でクライアントを検査し、フレーキーテストのビデオ保持、エラーごとのレポート、銀行のパスキーログインのオラクル例と面接の観点を扱います。",
  },
  pages: buildDoc(pagesB),
};

export const PWLATEST_04 = [artA, artB];
