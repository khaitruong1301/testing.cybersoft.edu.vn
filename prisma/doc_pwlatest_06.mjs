// ============================================================================
// doc_pwlatest_06.mjs — 2 bài NÂNG CAO (advanced) cho "Playwright & công cụ mới nhất".
//   A) Visual regression ổn định với Playwright     (slug: pw-visual-regression-stable)
//   B) Self-healing tests với Healer Agent + guardrails (slug: pw-self-healing-guardrails)
// Trilingual VI/EN/JA (tiếng Nhật thật), block khớp ArticleViewer CyberSoft Tester.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "pwl06a", domain: "ecommerce", kind: "nangcao", label: "VISUAL · SNAPSHOT" });
const coverB = makeThumb({ id: "pwl06b", domain: "saas", kind: "nangcao", label: "SELF-HEAL · GUARDRAIL" });

// ---------------------------------------------------------------------------
// SVG helper — khung nhỏ tái dùng cho các sơ đồ trong bài.
// ---------------------------------------------------------------------------
const frame = (inner, w = 640, h = 300) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial" font-size="13">
<rect width="${w}" height="${h}" rx="12" fill="#0b1220"/>${inner}</svg>`;

// ===========================================================================
// ARTICLE A — Visual regression ổn định
// ===========================================================================

const imgA1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">PIPELINE toHaveScreenshot / SCREENSHOT PIPELINE</text>
<g font-size="12">
  <rect x="24" y="60" width="132" height="52" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="40" y="84" fill="#f3e8ff" font-weight="700">Baseline</text><text x="40" y="101" fill="#d8b4fe">ảnh chuẩn đã commit</text>
  <rect x="190" y="60" width="132" height="52" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="206" y="84" fill="#e0f2fe" font-weight="700">Actual</text><text x="206" y="101" fill="#93c5fd">chụp lần chạy này</text>
  <rect x="356" y="60" width="132" height="52" rx="8" fill="#134e4a" stroke="#34d399"/><text x="372" y="84" fill="#d1fae5" font-weight="700">Diff engine</text><text x="372" y="101" fill="#6ee7b7">pixelmatch</text>
  <rect x="522" y="60" width="94" height="52" rx="8" fill="#422006" stroke="#f59e0b"/><text x="538" y="84" fill="#fef3c7" font-weight="700">Verdict</text><text x="538" y="101" fill="#fcd34d">pass/fail</text>
  <path d="M156 86 h34 M322 86 h34 M488 86 h34" stroke="#64748b" stroke-width="2" marker-end="url(#arA1)"/>
</g>
<rect x="24" y="150" width="592" height="118" rx="10" fill="#0f172a" stroke="#334155"/>
<text x="40" y="176" fill="#f8fafc" font-weight="700">Ngưỡng so khớp / comparison thresholds</text>
<text x="40" y="200" fill="#94a3b8" font-size="12">maxDiffPixels: số pixel khác tuyệt đối được phép (VD 100)</text>
<text x="40" y="222" fill="#94a3b8" font-size="12">maxDiffPixelRatio: tỉ lệ pixel khác trên tổng (VD 0.01 = 1%)</text>
<text x="40" y="244" fill="#94a3b8" font-size="12">threshold: độ nhạy màu YIQ mỗi pixel 0..1 (mặc định 0.2)</text>
<defs><marker id="arA1" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>`),
  "Pipeline của toHaveScreenshot: baseline vs actual qua diff engine ra phán quyết.",
  "The toHaveScreenshot pipeline: baseline vs actual through a diff engine to a verdict.",
  "toHaveScreenshotのパイプライン: ベースライン対実際の画像を差分エンジンで比較し判定します。"
);

const imgA2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">TRANG SẢN PHẨM & VÙNG ĐỘNG / PRODUCT PAGE DYNAMIC ZONES</text>
<rect x="24" y="52" width="360" height="220" rx="10" fill="#0f172a" stroke="#334155"/>
<rect x="44" y="72" width="150" height="150" rx="6" fill="#1e293b" stroke="#475569"/><text x="70" y="152" fill="#64748b" font-size="12">ảnh SP tĩnh</text>
<rect x="210" y="72" width="150" height="20" rx="4" fill="#334155"/><text x="218" y="86" fill="#cbd5e1" font-size="11">Tên sản phẩm (tĩnh)</text>
<rect x="210" y="102" width="90" height="18" rx="4" fill="#7c2d12" stroke="#fb923c"/><text x="216" y="115" fill="#ffedd5" font-size="10">Giá — VÙNG ĐỘNG</text>
<rect x="210" y="130" width="150" height="16" rx="4" fill="#4a044e" stroke="#e879f9"/><text x="216" y="142" fill="#fbcfe8" font-size="10">Đếm ngược flash-sale — MASK</text>
<rect x="210" y="156" width="150" height="16" rx="4" fill="#134e4a" stroke="#34d399"/><text x="216" y="168" fill="#d1fae5" font-size="10">Còn 3 suất (kho realtime) — MASK</text>
<rect x="210" y="182" width="150" height="34" rx="6" fill="#12315e" stroke="#38bdf8"/><text x="216" y="203" fill="#e0f2fe" font-size="11">Nút Thêm giỏ (tĩnh)</text>
<g font-size="12">
  <text x="410" y="80" fill="#f8fafc" font-weight="700">Chiến lược:</text>
  <text x="410" y="106" fill="#fca5a5">■ mask: giá, đếm ngược, tồn kho</text>
  <text x="410" y="130" fill="#6ee7b7">■ giữ nguyên: bố cục, nút, ảnh</text>
  <text x="410" y="154" fill="#93c5fd">■ animations: 'disabled'</text>
  <text x="410" y="178" fill="#fcd34d">■ chờ font 'load' trước khi chụp</text>
  <text x="410" y="202" fill="#d8b4fe">■ baseline theo project (OS)</text>
</g>`),
  "Trang sản phẩm TMĐT: nhận diện vùng động cần mask so với phần tĩnh cần khoá.",
  "An e-commerce product page: identifying dynamic zones to mask versus static parts to lock.",
  "ECの商品ページ: マスクすべき動的領域と、固定すべき静的部分を見分けます。"
);

const pagesA = [
  {
    heading: {
      vi: "1. Visual regression là gì và vì sao nó khó ổn định",
      en: "1. What visual regression is and why stability is hard",
      ja: "1. ビジュアルリグレッションとは何か、なぜ安定化が難しいのか",
    },
    blocks: [
      P(
        "Visual regression testing chụp lại giao diện dưới dạng ảnh và so sánh từng pixel với một ảnh chuẩn đã được duyệt gọi là baseline. Mục tiêu là bắt những thay đổi hình ảnh mà kiểm thử chức năng bỏ sót: một nút lệch vài pixel, một khoảng đệm biến mất, một màu nền sai, một font không tải. Trong Playwright, công cụ trung tâm là expect(page).toHaveScreenshot(), tự động chụp, so khớp và quản lý baseline. Nghe đơn giản, nhưng đây là loại test dễ trở nên flaky nhất nếu không kỷ luật, vì ảnh phụ thuộc vào vô số yếu tố ngoài code sản phẩm.",
        "Visual regression testing captures the UI as an image and compares it pixel-by-pixel against an approved reference image called the baseline. The goal is to catch visual changes that functional tests miss: a button shifted a few pixels, a vanished padding, a wrong background color, an unloaded font. In Playwright the central tool is expect(page).toHaveScreenshot(), which captures, compares and manages baselines automatically. It sounds simple, yet it is the flakiest kind of test without discipline, because an image depends on countless factors outside the product code.",
        "ビジュアルリグレッションテストは、UIを画像として撮影し、ベースラインと呼ばれる承認済みの基準画像とピクセル単位で比較します。目的は機能テストが見逃す視覚的変化を捉えることです。数ピクセルずれたボタン、消えた余白、誤った背景色、読み込まれなかったフォントなどです。Playwrightの中心的ツールはexpect(page).toHaveScreenshot()で、撮影・比較・ベースライン管理を自動化します。単純に聞こえますが、規律がなければ最もフレーキーになりやすい種類です。画像は製品コード以外の無数の要因に依存するからです。",
      ),
      P(
        "Vì sao khó ổn định? Một ảnh có thể khác nhau chỉ vì hệ điều hành render font hơi khác, vì một animation đang chạy đúng lúc chụp, vì con trỏ nhấp nháy, vì dữ liệu realtime như giá và tồn kho thay đổi mỗi lần, hoặc vì độ phân giải và tỉ lệ điểm ảnh khác nhau giữa máy dev và máy CI. Nếu không kiểm soát các biến này, mỗi lần chạy sẽ đỏ vì lý do vô nghĩa, đội ngũ mất niềm tin và cuối cùng xoá luôn visual test. Bài viết này biến visual regression thành một quy trình kỷ luật, tất định và có thể vận hành ở quy mô doanh nghiệp.",
        "Why is stability hard? An image can differ merely because the OS renders fonts slightly differently, because an animation was mid-flight at capture time, because a caret was blinking, because realtime data like price and stock changes every run, or because resolution and device pixel ratio differ between the dev machine and CI. Without controlling these variables, every run turns red for a meaningless reason, the team loses trust and eventually deletes the visual suite. This article turns visual regression into a disciplined, deterministic process operable at enterprise scale.",
        "なぜ安定化が難しいのでしょうか。画像は、OSがフォントを微妙に異なって描画する、撮影時にアニメーションが途中だった、キャレットが点滅していた、価格や在庫のようなリアルタイムデータが毎回変わる、あるいは開発機とCIで解像度やデバイスピクセル比が異なる、といった理由だけで差が出ます。これらの変数を制御しなければ、毎回無意味な理由で赤になり、チームは信頼を失い、最終的にビジュアルスイートを削除します。本記事はビジュアルリグレッションを、企業規模で運用できる規律ある決定的プロセスに変えます。",
      ),
      NOTE(
        "Định nghĩa dùng xuyên bài: baseline = ảnh chuẩn đã được duyệt và commit vào git; actual = ảnh chụp ở lần chạy hiện tại; diff = ảnh biểu diễn pixel khác biệt giữa hai ảnh trên.",
        "Definition used throughout: baseline = the approved reference image committed to git; actual = the image captured on the current run; diff = an image visualizing the differing pixels between the two.",
        "本記事を通じた定義: ベースライン = gitにコミットされた承認済み基準画像。actual = 現在の実行で撮影した画像。diff = 両者の差分ピクセルを可視化した画像。",
      ),
      imgA1,
    ],
  },
  {
    heading: {
      vi: "2. toHaveScreenshot(): cơ chế và vòng đời baseline",
      en: "2. toHaveScreenshot(): mechanics and the baseline lifecycle",
      ja: "2. toHaveScreenshot(): 仕組みとベースラインのライフサイクル",
    },
    blocks: [
      P(
        "Lần đầu chạy một assertion toHaveScreenshot chưa có baseline, Playwright không so khớp mà tạo ảnh chuẩn rồi báo test đỏ có chủ đích với thông điệp 'A snapshot doesn't exist, writing actual'. Bạn xem lại ảnh vừa sinh, nếu đúng thì commit nó làm baseline. Từ lần sau, Playwright chụp actual và so với baseline theo ngưỡng đã cấu hình. Đây là điểm mấu chốt mà người mới hay hiểu nhầm: baseline không tự sinh im lặng, mà là một artifact bạn phải chủ động duyệt và đưa vào git như một phần của code.",
        "The first time a toHaveScreenshot assertion runs without a baseline, Playwright does not compare — it writes the reference image and deliberately fails the test with 'A snapshot doesn't exist, writing actual'. You review the freshly generated image; if correct, you commit it as the baseline. From then on Playwright captures the actual and compares it against the baseline per the configured thresholds. This is the crux beginners misunderstand: the baseline is not silently auto-generated but an artifact you must actively review and commit to git as part of the code.",
        "ベースラインがない状態でtoHaveScreenshotアサーションを初めて実行すると、Playwrightは比較せず基準画像を書き込み、「A snapshot doesn't exist, writing actual」というメッセージで意図的にテストを失敗させます。生成された画像を確認し、正しければベースラインとしてコミットします。それ以降、Playwrightはactualを撮影しベースラインと設定済み閾値で比較します。ここが初心者の誤解する核心です。ベースラインは静かに自動生成されるのではなく、コードの一部としてgitにレビューしコミットすべき成果物です。",
      ),
      CODE("ts", `// tests/product.spec.ts
import { test, expect } from '@playwright/test';

test('trang sản phẩm khớp baseline', async ({ page }) => {
  await page.goto('/products/ao-thun-basic');
  // chờ trạng thái ổn định trước khi chụp (xem chương font & animation)
  await expect(page.getByRole('heading', { name: 'Áo thun basic' })).toBeVisible();

  // lần đầu: sinh baseline & fail có chủ đích; lần sau: so khớp
  await expect(page).toHaveScreenshot('product-page.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});`),
      P(
        "Cây baseline mặc định nằm cạnh file test trong thư mục có hậu tố -snapshots, và tên ảnh nhúng cả tên project cùng nền tảng, ví dụ product-page-chromium-darwin.png. Chi tiết nền tảng trong tên là cố ý: một baseline chụp trên macOS không được dùng để so trên Linux vì cách render khác nhau. Khi bạn thay đổi UI một cách hợp lệ và muốn cập nhật baseline, chạy lại với cờ --update-snapshots, xem kỹ diff trong review, rồi commit ảnh mới. Quy trình cập nhật có kiểm soát này là ranh giới giữa một bộ visual test đáng tin và một mớ ảnh hỗn loạn.",
        "The default baseline tree sits beside the test in a folder suffixed -snapshots, and the image name embeds both the project name and the platform, e.g. product-page-chromium-darwin.png. The platform detail in the name is intentional: a baseline captured on macOS must not be compared on Linux because rendering differs. When you legitimately change the UI and want to update baselines, rerun with the --update-snapshots flag, scrutinize the diff in review, then commit the new images. This controlled update process is the line between a trustworthy visual suite and a chaotic pile of images.",
        "既定のベースラインツリーはテストの隣の-snapshots接尾辞のフォルダに置かれ、画像名にはプロジェクト名とプラットフォームの両方が埋め込まれます。例: product-page-chromium-darwin.png。名前中のプラットフォーム情報は意図的です。macOSで撮影したベースラインは、描画が異なるためLinuxで比較してはいけません。UIを正当に変更しベースラインを更新したい場合は、--update-snapshotsフラグで再実行し、レビューで差分を精査し、新しい画像をコミットします。この制御された更新プロセスが、信頼できるビジュアルスイートと混沌とした画像の山との境界線です。",
      ),
      CODE("bash", `# Sinh/cập nhật baseline một cách CÓ KIỂM SOÁT
npx playwright test product.spec.ts --update-snapshots

# Chỉ cập nhật baseline của một project (nền tảng) cụ thể
npx playwright test --update-snapshots --project=chromium

# Xem test-results/ để đối chiếu actual vs diff khi đỏ
npx playwright show-report`),
      TIP(
        "Đặt tên ảnh baseline có ý nghĩa nghiệp vụ ('product-page.png') thay để tên tự sinh theo số thứ tự. Tên rõ giúp reviewer biết ảnh nào thuộc màn nào khi duyệt pull request.",
        "Name baseline images with business meaning ('product-page.png') instead of leaving auto-generated ordinal names. Clear names let reviewers know which image belongs to which screen when reviewing a pull request.",
        "ベースライン画像には自動生成の連番ではなく業務的に意味のある名前（'product-page.png'）を付けます。明確な名前により、レビュアーはプルリクエストのレビュー時にどの画像がどの画面のものか分かります。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Masking vùng động — vũ khí số một chống nhiễu",
      en: "3. Masking dynamic regions — the number-one anti-noise weapon",
      ja: "3. 動的領域のマスキング — ノイズ対策の最重要武器",
    },
    blocks: [
      P(
        "Không phải phần nào của giao diện cũng ổn định. Trên một trang sản phẩm TMĐT, giá có thể đổi vì khuyến mãi, đồng hồ đếm ngược flash-sale nhảy mỗi giây, số suất còn lại cập nhật realtime, ảnh quảng cáo xoay vòng. Nếu để nguyên, mỗi lần chạy sẽ khác và test đỏ liên tục dù bố cục hoàn toàn đúng. Giải pháp là mask: phủ một hình chữ nhật đặc màu lên vùng động trước khi so khớp, để Playwright bỏ qua pixel bên trong. Bạn vẫn kiểm được bố cục, khoảng cách, màu sắc của phần tĩnh mà không bị vùng động làm nhiễu.",
        "Not every part of the UI is stable. On an e-commerce product page, price can change due to promotions, the flash-sale countdown ticks every second, remaining stock updates in realtime, ad banners rotate. Left alone, every run differs and the test flakes red even though the layout is perfectly correct. The solution is masking: overlay a solid rectangle on the dynamic region before comparison so Playwright ignores the pixels inside. You still verify the layout, spacing and color of the static parts without the dynamic zones adding noise.",
        "UIのすべての部分が安定しているわけではありません。ECの商品ページでは、価格はプロモーションで変わり、フラッシュセールのカウントダウンは毎秒進み、残り在庫はリアルタイムで更新され、広告バナーは回転します。放置すると毎回異なり、レイアウトが完全に正しくてもテストは赤くなります。解決策はマスキングです。比較前に動的領域に単色の矩形を重ね、Playwrightが内部のピクセルを無視するようにします。動的領域のノイズなしで、静的部分のレイアウト・間隔・色を検証できます。",
      ),
      CODE("ts", `test('trang sản phẩm — mask giá & tồn kho realtime', async ({ page }) => {
  await page.goto('/products/ao-thun-basic');
  await expect(page.getByRole('heading', { name: 'Áo thun basic' })).toBeVisible();

  await expect(page).toHaveScreenshot('product-page.png', {
    fullPage: true,
    animations: 'disabled',
    mask: [
      page.getByTestId('product-price'),      // giá đổi theo khuyến mãi
      page.getByTestId('flash-sale-timer'),   // đếm ngược mỗi giây
      page.getByTestId('stock-remaining'),    // tồn kho realtime
    ],
    maskColor: '#FF00FF', // màu mask cố định, dễ nhận ra trong diff
  });
});`),
      P(
        "Có một cạm bẫy quan trọng với mask: chỉ mask hình ảnh, không mask logic. Nếu giá bị lỗi hiển thị 'NaN đ' hay tồn kho hiện số âm, mask sẽ che luôn cả bug đó khỏi visual test. Vì thế mask phải đi kèm một assertion chức năng riêng cho chính vùng động ấy. Nói cách khác, visual test lo bố cục tổng thể còn functional test lo nội dung động. Đây chính là tinh thần oracle-first: đừng để một kỹ thuật chống nhiễu vô tình che mất một bất biến nghiệp vụ thật.",
        "There is an important pitfall with masking: it only masks the picture, not the logic. If price glitches to 'NaN đ' or stock shows a negative number, the mask hides that bug from the visual test too. So masking must be paired with a separate functional assertion on that very dynamic region. In other words, the visual test guards overall layout while a functional test guards the dynamic content. This is the oracle-first spirit: never let an anti-noise technique accidentally hide a real business invariant.",
        "マスキングには重要な落とし穴があります。画像だけをマスクし、ロジックはマスクしません。価格が「NaN円」に化けたり在庫が負の数を表示したりすると、マスクはそのバグもビジュアルテストから隠します。そのためマスキングは、その動的領域自体に対する別の機能アサーションと組み合わせる必要があります。言い換えれば、ビジュアルテストは全体レイアウトを、機能テストは動的コンテンツを守ります。これがオラクルファーストの精神です。ノイズ対策手法が本物の業務不変条件を誤って隠さないようにします。",
      ),
      WARN(
        "Đừng mask quá tay. Nếu mask nửa màn hình để 'cho hết đỏ', visual test mất ý nghĩa. Mask đúng từng phần tử động nhỏ nhất; nếu phải mask nhiều, hãy tách màn thành component test nhỏ hơn.",
        "Do not over-mask. If you mask half the screen just to 'kill the red', the visual test loses meaning. Mask the smallest dynamic elements precisely; if you must mask a lot, split the screen into smaller component tests.",
        "マスクしすぎないでください。「赤を消す」ために画面の半分をマスクすると、ビジュアルテストは意味を失います。最小の動的要素を正確にマスクし、多くマスクが必要なら画面をより小さなコンポーネントテストに分割します。",
      ),
      imgA2,
    ],
  },
  {
    heading: {
      vi: "4. maxDiffPixels, maxDiffPixelRatio và threshold",
      en: "4. maxDiffPixels, maxDiffPixelRatio and threshold",
      ja: "4. maxDiffPixels、maxDiffPixelRatio、threshold",
    },
    blocks: [
      P(
        "Playwright so ảnh bằng thư viện pixelmatch và cho ba tham số điều chỉnh độ nghiêm ngặt, cần phân biệt rạch ròi. threshold là độ nhạy màu theo không gian YIQ cho MỖI pixel, giá trị 0 tới 1, mặc định 0.2; pixel chỉ bị coi là khác khi lệch màu vượt ngưỡng này, nên nó lọc nhiễu chống răng cưa và khác biệt màu li ti. maxDiffPixels là số pixel khác tuyệt đối được phép trên toàn ảnh, ví dụ 100. maxDiffPixelRatio là tỉ lệ pixel khác trên tổng số pixel, ví dụ 0.01 nghĩa là dung sai 1%. threshold quyết định 'thế nào là một pixel khác', hai tham số còn lại quyết định 'bao nhiêu pixel khác thì fail'.",
        "Playwright compares images with the pixelmatch library and offers three parameters to tune strictness that must be distinguished clearly. threshold is per-PIXEL color sensitivity in YIQ space, from 0 to 1, default 0.2; a pixel counts as different only when its color deviation exceeds this, so it filters anti-aliasing noise and tiny color differences. maxDiffPixels is the absolute number of differing pixels allowed across the whole image, e.g. 100. maxDiffPixelRatio is the ratio of differing pixels to total, e.g. 0.01 meaning a 1% tolerance. threshold decides 'what counts as a different pixel'; the other two decide 'how many differing pixels fail the test'.",
        "Playwrightはpixelmatchライブラリで画像を比較し、厳格さを調整する3つのパラメータを提供します。明確に区別する必要があります。thresholdはピクセルごとのYIQ空間での色感度で、0から1、既定0.2です。ピクセルは色の偏差がこれを超えたときだけ相違とみなされ、アンチエイリアスのノイズや微小な色差を除去します。maxDiffPixelsは画像全体で許容される相違ピクセルの絶対数で、例えば100です。maxDiffPixelRatioは相違ピクセルの総数に対する比率で、例えば0.01は1%の許容です。thresholdは「何を相違ピクセルとみなすか」を、他の2つは「相違ピクセルが何個で失敗するか」を決めます。",
      ),
      CODE("ts", `// playwright.config.ts — đặt ngưỡng mặc định toàn dự án
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,          // độ nhạy màu mỗi pixel (0..1)
      maxDiffPixelRatio: 0.01, // cho phép tối đa 1% pixel khác
      // maxDiffPixels: 100,   // hoặc dùng số tuyệt đối thay cho tỉ lệ
    },
  },
});`),
      P(
        "Chọn ngưỡng thế nào? Nguyên tắc là siết chặt nhất có thể mà vẫn không flaky. Bắt đầu với mặc định, quan sát các diff giả trong vài ngày, rồi nới nhẹ chỉ đủ để dập nhiễu nền tảng, không hơn. Ngưỡng quá lỏng nguy hiểm hơn quá chặt: một maxDiffPixelRatio 0.1 (10%) có thể nuốt trọn một banner sai hoàn toàn mà vẫn báo xanh, biến visual test thành bù nhìn. Với các trang có chữ nhiều như trang sản phẩm, threshold 0.2 và ratio 0.01 thường là điểm cân bằng tốt; hãy đặt ở config để nhất quán, chỉ override tại chỗ khi thực sự cần.",
        "How to pick thresholds? The principle is: as strict as possible while not flaky. Start with defaults, watch false diffs for a few days, then loosen just enough to quell platform noise, no more. A too-loose threshold is more dangerous than a too-tight one: a maxDiffPixelRatio of 0.1 (10%) can swallow a completely wrong banner and still report green, turning the visual test into a scarecrow. For text-heavy pages like product pages, threshold 0.2 and ratio 0.01 is usually a good balance; set it in config for consistency and override locally only when truly needed.",
        "閾値の選び方は。原則は「フレーキーにならない範囲で可能な限り厳格に」です。既定から始め、数日間の偽差分を観察し、プラットフォームのノイズを抑えるのに必要なだけ緩めます、それ以上は緩めません。緩すぎる閾値は厳しすぎるより危険です。maxDiffPixelRatioが0.1（10%）だと、完全に誤ったバナーを飲み込んでも緑と報告し、ビジュアルテストを案山子に変えます。商品ページのような文字の多いページでは、threshold 0.2とratio 0.01がよい均衡になることが多く、一貫性のため設定に置き、本当に必要なときだけローカルで上書きします。",
      ),
      NOTE(
        "Ưu tiên maxDiffPixelRatio hơn maxDiffPixels khi màn có nhiều kích thước viewport khác nhau: tỉ lệ tự co giãn theo tổng pixel, còn số tuyệt đối thì không.",
        "Prefer maxDiffPixelRatio over maxDiffPixels when the screen has many viewport sizes: a ratio scales with total pixels, an absolute count does not.",
        "画面が多様なビューポートサイズを持つ場合は、maxDiffPixelsよりmaxDiffPixelRatioを優先します。比率は総ピクセルに応じてスケールし、絶対数はしません。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Ổn định font — nguồn nhiễu bị đánh giá thấp nhất",
      en: "5. Font stabilization — the most underrated noise source",
      ja: "5. フォントの安定化 — 最も過小評価されるノイズ源",
    },
    blocks: [
      P(
        "Font là thủ phạm âm thầm của diff giả. Web font tải bất đồng bộ: nếu chụp ảnh trước khi font web về, trình duyệt vẽ bằng font dự phòng của hệ thống rồi mới thay, khiến ảnh khi có chữ đậm hơn, khi mảnh hơn, khi lệch chiều rộng. Ở CI mạng chậm, đôi khi font kịp về, đôi khi không, tạo ra flaky kinh điển. Cách chữa là chờ document.fonts.ready trước khi chụp, hoặc dùng font-display để kiểm soát, và lý tưởng là nhúng sẵn font vào bản build test để không phụ thuộc mạng.",
        "Fonts are the silent culprit of false diffs. Web fonts load asynchronously: if you capture before the web font arrives, the browser paints with a system fallback and then swaps, so the image is sometimes bolder, sometimes thinner, sometimes a different width. On slow CI networks the font sometimes arrives in time and sometimes not, producing a classic flake. The cure is to await document.fonts.ready before capture, or use font-display to control it, and ideally embed the fonts into the test build so it does not depend on the network.",
        "フォントは偽差分の静かな犯人です。Webフォントは非同期で読み込まれます。Webフォント到着前に撮影すると、ブラウザはシステムのフォールバックで描画してから差し替えるため、画像は太かったり細かったり幅が違ったりします。遅いCIネットワークでは、フォントが間に合うときと間に合わないときがあり、典型的なフレーキーを生みます。対策は撮影前にdocument.fonts.readyを待つこと、font-displayで制御すること、そして理想的にはネットワークに依存しないようフォントをテストビルドに埋め込むことです。",
      ),
      CODE("ts", `// fixture chờ font sẵn sàng trước mọi lần chụp
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);
  },
});

// trong test, ngay trước toHaveScreenshot:
await page.evaluate(() => document.fonts.ready);
await expect(page).toHaveScreenshot('product-page.png');`),
      P(
        "Một mẹo mạnh hơn nữa là chuẩn hoá môi trường render bằng cách nhúng font vào bản build và tắt hiệu ứng làm mượt font khác nhau giữa các máy. Với ứng dụng có nhiều ngôn ngữ, hãy nhớ rằng cùng một layout khi hiển thị tiếng Nhật hay tiếng Việt có dấu sẽ chiếm chiều cao dòng khác nhau, nên baseline phải chụp đúng ngôn ngữ mà màn đó phục vụ. Đừng bao giờ so một baseline tiếng Anh với một actual tiếng Việt; đó không phải regression mà là lỗi thiết kế test.",
        "An even stronger trick is to standardize the rendering environment by embedding fonts into the build and disabling font-smoothing effects that differ across machines. For multilingual apps, remember that the same layout rendering Japanese or accented Vietnamese occupies different line heights, so the baseline must be captured in the exact language that screen serves. Never compare an English baseline against a Vietnamese actual; that is not a regression but a test-design bug.",
        "さらに強力なコツは、フォントをビルドに埋め込み、マシン間で異なるフォントスムージング効果を無効化して描画環境を標準化することです。多言語アプリでは、同じレイアウトでも日本語やアクセント付きベトナム語の描画は行の高さが異なることを覚えておいてください。そのためベースラインは、その画面が提供する言語で正確に撮影する必要があります。英語のベースラインをベトナム語のactualと比較してはいけません。それはリグレッションではなくテスト設計のバグです。",
      ),
      TIP(
        "Trong CI, cài sẵn bộ font ứng dụng dùng (kể cả font tiếng Nhật/Việt) vào image Docker. Thiếu font trên runner khiến trình duyệt thay bằng font khác và mọi baseline lệch một loạt.",
        "In CI, preinstall the exact fonts your app uses (including Japanese/Vietnamese fonts) into the Docker image. A missing font on the runner makes the browser substitute another and shifts every baseline at once.",
        "CIでは、アプリが使う正確なフォント（日本語・ベトナム語フォントを含む）をDockerイメージに事前インストールします。ランナーにフォントが欠けると、ブラウザは別のフォントに置き換え、すべてのベースラインが一斉にずれます。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Ổn định animation, carousel và con trỏ",
      en: "6. Stabilizing animations, carousels and carets",
      ja: "6. アニメーション・カルーセル・キャレットの安定化",
    },
    blocks: [
      P(
        "Animation là nguồn nhiễu lớn thứ hai sau font. Một transition CSS 300ms có thể ở bất kỳ khung hình nào khi chụp, khiến ảnh khác nhau mỗi lần. Playwright cung cấp tuỳ chọn animations: 'disabled' trong toHaveScreenshot, tự động ép mọi CSS animation và transition về trạng thái kết thúc trước khi chụp, đây là công tắc đầu tiên nên bật. Ngoài ra caret con trỏ nhập nhấp nháy trong ô input cũng gây flaky; dùng caret: 'hide' để ẩn nó. Với carousel hay banner tự xoay, hãy dừng chúng bằng cách mock timer hoặc thêm class tắt animation trong môi trường test.",
        "Animations are the second-largest noise source after fonts. A 300ms CSS transition can be at any frame at capture time, making the image differ each run. Playwright offers animations: 'disabled' in toHaveScreenshot, which automatically forces every CSS animation and transition to its end state before capture — this is the first switch to flip. Additionally, the blinking text caret in an input causes flakiness; use caret: 'hide' to hide it. For carousels or auto-rotating banners, stop them by mocking timers or adding an animation-disabling class in the test environment.",
        "アニメーションはフォントに次ぐ2番目に大きなノイズ源です。300msのCSSトランジションは撮影時に任意のフレームにあり得るため、画像は毎回異なります。PlaywrightはtoHaveScreenshotでanimations: 'disabled'を提供し、撮影前にすべてのCSSアニメーションとトランジションを終了状態に自動的に強制します。これが最初に切り替えるスイッチです。さらに入力欄で点滅するテキストキャレットもフレーキーを引き起こします。caret: 'hide'で隠します。カルーセルや自動回転バナーは、タイマーをモックするかテスト環境でアニメーション無効化クラスを追加して停止します。",
      ),
      CODE("ts", `await expect(page).toHaveScreenshot('product-page.png', {
  animations: 'disabled', // ép animation/transition về trạng thái cuối
  caret: 'hide',          // ẩn con trỏ nhấp nháy trong input
});

// Dừng carousel tự xoay bằng cách chèn CSS trong môi trường test
await page.addStyleTag({
  content: '*,*::before,*::after{transition:none!important;animation:none!important}',
});`),
      P(
        "Cần phân biệt hai mức tắt animation. animations: 'disabled' của Playwright chỉ tác động lúc chụp và cho phần lớn CSS declarative. Nhưng nếu ứng dụng dùng JavaScript để chạy animation, ví dụ requestAnimationFrame vẽ biểu đồ giá theo thời gian, thì cần can thiệp ở tầng ứng dụng: mock đồng hồ bằng page.clock, hoặc thêm cờ môi trường tắt animation JS khi chạy test. Nguyên tắc chung là làm cho khung hình tại thời điểm chụp trở nên tất định, bất kể chạy bao nhiêu lần.",
        "Distinguish two levels of disabling animation. Playwright's animations: 'disabled' only acts at capture time and covers most declarative CSS. But if the app uses JavaScript to drive animation — say requestAnimationFrame drawing a price chart over time — you must intervene at the application layer: mock the clock with page.clock, or add an env flag that disables JS animation under test. The general principle is to make the frame at capture time deterministic, no matter how many times it runs.",
        "アニメーション無効化の2つのレベルを区別します。Playwrightのanimations: 'disabled'は撮影時のみに作用し、大半の宣言的CSSをカバーします。しかしアプリがJavaScriptでアニメーションを駆動する場合、例えばrequestAnimationFrameが時間経過で価格チャートを描く場合は、アプリケーション層で介入する必要があります。page.clockで時計をモックするか、テスト時にJSアニメーションを無効化する環境フラグを追加します。一般原則は、何回実行しても撮影時のフレームを決定的にすることです。",
      ),
      SCEN(
        "Tình huống: carousel khuyến mãi làm đỏ 1/3 số lần",
        "Scenario: a promo carousel reddens 1/3 of runs",
        "Trang chủ có carousel banner tự chuyển sau 4 giây. Visual test đỏ ngẫu nhiên khoảng một phần ba số lần vì đôi khi chụp trúng lúc slide đang trượt. Đội thử tăng maxDiffPixelRatio lên 0.15 và test hết đỏ — nhưng cũng vô tình bỏ qua một lỗi lệch cột thật sau đó. Cách đúng: bật animations:'disabled', đồng thời dùng page.clock để cố định carousel về slide đầu, giữ ngưỡng chặt.",
        "The homepage has a banner carousel that auto-advances every 4 seconds. The visual test reddens randomly about a third of the time because it sometimes captures mid-slide. The team raised maxDiffPixelRatio to 0.15 and the red went away — but it also silently swallowed a real column-misalignment bug later. The right way: enable animations:'disabled' and use page.clock to pin the carousel to the first slide, keeping the threshold tight.",
        "シナリオ: プロモカルーセルが1/3の実行を赤にする",
        "ホームページには4秒ごとに自動切り替わるバナーカルーセルがあります。ビジュアルテストは、スライド移動中に撮影することがあるため約3分の1の確率でランダムに赤くなります。チームはmaxDiffPixelRatioを0.15に上げて赤を消しましたが、後で本物の列ずれバグも静かに飲み込みました。正しい方法は、animations:'disabled'を有効化し、page.clockでカルーセルを最初のスライドに固定し、閾値を厳しく保つことです。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Bài toán baseline cross-OS: CI vs local",
      en: "7. The cross-OS baseline problem: CI vs local",
      ja: "7. クロスOSのベースライン問題: CI対ローカル",
    },
    blocks: [
      P(
        "Đây là nỗi đau kinh điển của visual testing. Một lập trình viên chụp baseline trên macOS, đẩy lên, rồi CI chạy trên Linux báo đỏ hàng loạt dù chẳng ai đổi UI. Nguyên nhân là mỗi hệ điều hành render font, khử răng cưa và tổng hợp màu khác nhau ở cấp pixel. Cùng một trang, cùng một trình duyệt, nhưng macOS, Windows và Linux cho ba ảnh hơi khác. Vì thế baseline phải gắn với một môi trường render cố định, và môi trường ấy nên trùng với môi trường CI chứ không phải máy cá nhân của từng người.",
        "This is visual testing's classic pain. A developer captures baselines on macOS, pushes, then CI on Linux reddens en masse though nobody changed the UI. The cause is that each OS renders fonts, anti-aliases and composites colors differently at the pixel level. Same page, same browser, yet macOS, Windows and Linux produce three slightly different images. Therefore the baseline must be tied to a fixed rendering environment, and that environment should match CI rather than each person's personal machine.",
        "これはビジュアルテストの古典的な痛みです。開発者がmacOSでベースラインを撮影しプッシュすると、Linux上のCIは誰もUIを変えていないのに一斉に赤くなります。原因は、各OSがピクセルレベルでフォントの描画・アンチエイリアス・色の合成を異なって行うことです。同じページ、同じブラウザでも、macOS・Windows・Linuxは3つの微妙に異なる画像を生成します。したがってベースラインは固定の描画環境に結び付ける必要があり、その環境は各人の個人マシンではなくCIに合わせるべきです。",
      ),
      P(
        "Giải pháp chuẩn công nghiệp là sinh và so baseline trong cùng một Docker image, thường chính là image chính thức của Playwright, cho cả máy dev lẫn CI. Lập trình viên không commit baseline chụp trực tiếp trên macOS; thay vào đó họ chạy lệnh update trong container Playwright để ảnh sinh ra khớp bit với ảnh CI sẽ tạo. Playwright còn hỗ trợ khoá phiên bản trình duyệt và cung cấp cờ chạy trong Docker, giúp môi trường render tất định. Nhờ vậy baseline trở thành một artifact di động, đúng ở mọi máy, không còn cảnh 'đỏ chỉ trên máy tôi'.",
        "The industry-standard solution is to generate and compare baselines inside the same Docker image — typically Playwright's official image — for both dev machines and CI. Developers do not commit baselines captured directly on macOS; instead they run the update command inside the Playwright container so the produced images match bit-for-bit what CI will create. Playwright also supports pinning the browser version and provides flags to run in Docker, making the rendering environment deterministic. The baseline thus becomes a portable artifact that is correct on every machine, ending the 'red only on my machine' saga.",
        "業界標準の解決策は、開発機とCIの両方で同じDockerイメージ（通常はPlaywrightの公式イメージ）内でベースラインを生成・比較することです。開発者はmacOSで直接撮影したベースラインをコミットせず、代わりにPlaywrightコンテナ内でupdateコマンドを実行し、生成される画像がCIの作るものとビット単位で一致するようにします。Playwrightはブラウザバージョンの固定もサポートし、Docker内で実行するフラグを提供して描画環境を決定的にします。これによりベースラインは、あらゆるマシンで正しいポータブルな成果物となり、「自分のマシンだけ赤」の物語を終わらせます。",
      ),
      CODE("bash", `# Sinh baseline trong CHÍNH image Playwright để khớp môi trường CI (Linux)
docker run --rm --network host -v $(pwd):/work -w /work \\
  mcr.microsoft.com/playwright:v1.61.0-noble \\
  npx playwright test --update-snapshots

# Ai cũng cập nhật baseline theo cách này -> ảnh khớp bit với CI
# Không commit baseline chụp thẳng trên macOS/Windows`),
      WARN(
        "Không bao giờ trộn baseline từ nhiều OS trong cùng một tên ảnh. Playwright nhúng nền tảng vào tên (…-darwin.png, …-linux.png) chính để tránh điều này; đừng đổi tên xoá phần nền tảng.",
        "Never mix baselines from multiple OSes under the same image name. Playwright embeds the platform in the name (…-darwin.png, …-linux.png) precisely to avoid this; do not rename it away.",
        "同じ画像名で複数OSのベースラインを混ぜてはいけません。Playwrightはまさにこれを避けるため名前にプラットフォームを埋め込みます（…-darwin.png、…-linux.png）。それを取り除くよう改名しないでください。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Quản lý baseline trong git một cách bền vững",
      en: "8. Managing baselines in git sustainably",
      ja: "8. gitでのベースラインの持続可能な管理",
    },
    blocks: [
      P(
        "Ảnh baseline là file nhị phân và sẽ phình kho git theo thời gian nếu không kỷ luật. Có vài cách quản lý. Cách đơn giản nhất và phổ biến nhất là commit thẳng ảnh vào git, chấp nhận kho lớn dần nhưng đổi lại review diff ngay trong pull request nhờ tính năng so ảnh của GitHub. Với dự án rất nhiều ảnh, có thể dùng Git LFS để tách nhị phân khỏi lịch sử chính, hoặc lưu baseline ở kho artifact riêng và tải về khi chạy. Dù chọn cách nào, nguyên tắc bất di bất dịch là baseline phải được review như code: không ai được cập nhật baseline mà không có người khác duyệt diff.",
        "Baseline images are binary files and will bloat the git repo over time without discipline. There are several management approaches. The simplest and most common is committing images straight into git, accepting a growing repo but gaining diff review right in the pull request via GitHub's image comparison. For image-heavy projects you can use Git LFS to separate binaries from main history, or store baselines in a dedicated artifact store and pull them at runtime. Whichever you choose, the immovable principle is that baselines must be reviewed like code: nobody updates a baseline without another person reviewing the diff.",
        "ベースライン画像はバイナリファイルで、規律がなければ時間とともにgitリポジトリを肥大化させます。管理方法はいくつかあります。最も単純で一般的なのは、画像を直接gitにコミットし、リポジトリの肥大化を受け入れる代わりに、GitHubの画像比較機能でプルリクエスト内で差分レビューを得ることです。画像の多いプロジェクトでは、Git LFSでバイナリをメイン履歴から分離するか、専用のアーティファクトストアにベースラインを保存し実行時に取得できます。どれを選んでも、揺るがない原則はベースラインをコードのようにレビューすることです。他者が差分をレビューせずにベースラインを更新してはいけません。",
      ),
      CODE("yaml", `# .gitattributes — dùng Git LFS cho ảnh baseline nếu kho phình
tests/**/*-snapshots/*.png filter=lfs diff=lfs merge=lfs -text

# .github: bật nhắc review baseline khi PR đổi ảnh snapshot
# (ví dụ CODEOWNERS gắn đội QA làm reviewer bắt buộc cho thư mục -snapshots)`),
      P(
        "Một quy tắc vàng khi review pull request có cập nhật baseline: reviewer phải mở diff ảnh và xác nhận đây là thay đổi UI có chủ đích, không phải nhiễu lọt lưới. Nếu một pull request đổi mười baseline mà mô tả chỉ nói 'sửa nút login', đó là cờ đỏ — rất có thể ai đó lỡ chạy update-snapshots trên máy sai OS và bake nhiễu vào baseline. Đặt CODEOWNERS để mọi thay đổi trong thư mục snapshots đều cần đội QA duyệt là một hàng rào rẻ mà hiệu quả.",
        "A golden rule when reviewing a pull request with baseline updates: the reviewer must open the image diff and confirm it is an intentional UI change, not noise that slipped through. If a pull request changes ten baselines while its description only says 'fix the login button', that is a red flag — likely someone accidentally ran update-snapshots on the wrong OS and baked noise into the baselines. Setting CODEOWNERS so any change in the snapshots folder needs QA approval is a cheap yet effective fence.",
        "ベースライン更新を含むプルリクエストをレビューする際の黄金律は、レビュアーが画像差分を開き、それがすり抜けたノイズではなく意図的なUI変更であることを確認することです。プルリクエストが10個のベースラインを変更しているのに説明が「ログインボタンの修正」だけなら、それは危険信号です。おそらく誰かが誤って間違ったOSでupdate-snapshotsを実行し、ノイズをベースラインに焼き込んだのです。snapshotsフォルダのあらゆる変更にQAの承認が必要になるようCODEOWNERSを設定するのは、安価で効果的な柵です。",
      ),
      NOTE(
        "Nếu kho git phình vì ảnh, hãy nén PNG (oxipng) và giới hạn kích thước viewport chụp. Ảnh nhỏ hơn = diff nhanh hơn và kho gọn hơn, không hy sinh khả năng bắt lỗi bố cục.",
        "If the git repo bloats from images, compress PNGs (oxipng) and cap the capture viewport size. Smaller images = faster diffs and a leaner repo, without sacrificing layout-bug detection.",
        "画像でgitリポジトリが肥大化する場合は、PNGを圧縮し（oxipng）、撮影ビューポートサイズを制限します。画像が小さいほど差分が速く、リポジトリが軽くなり、レイアウトバグの検出能力を犠牲にしません。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Ví dụ đầy đủ: trang sản phẩm TMĐT",
      en: "9. Full example: an e-commerce product page",
      ja: "9. 完全な例: ECの商品ページ",
    },
    blocks: [
      P(
        "Hãy ráp mọi kỹ thuật vào một ví dụ thật: kiểm thử visual regression cho trang sản phẩm của một sàn TMĐT. Trang này có phần tĩnh cần khoá gồm bố cục lưới, nút Thêm vào giỏ, tab mô tả và đánh giá; và phần động cần mask gồm giá theo khuyến mãi, đồng hồ flash-sale, số suất còn lại. Chúng ta chờ heading hiện ra để đảm bảo trang đã render, chờ font sẵn sàng, tắt animation, mask ba vùng động, đặt ngưỡng chặt, và quan trọng nhất là kèm một assertion chức năng riêng cho giá để mask không che mất bug hiển thị giá.",
        "Let's assemble every technique into a real example: visual regression testing for an e-commerce product page. This page has static parts to lock — the grid layout, Add-to-cart button, description and reviews tabs — and dynamic parts to mask — promo price, flash-sale timer, remaining stock. We wait for the heading to appear to ensure the page rendered, wait for fonts to be ready, disable animations, mask the three dynamic zones, set a tight threshold, and most importantly attach a separate functional assertion on price so the mask does not hide a price-display bug.",
        "すべての技術を実際の例に組み立てましょう。ECの商品ページのビジュアルリグレッションテストです。このページには固定すべき静的部分（グリッドレイアウト、カート追加ボタン、説明とレビューのタブ）と、マスクすべき動的部分（プロモ価格、フラッシュセールタイマー、残り在庫）があります。ページが描画されたことを保証するため見出しの表示を待ち、フォントの準備を待ち、アニメーションを無効化し、3つの動的領域をマスクし、厳しい閾値を設定し、最も重要なのは、マスクが価格表示バグを隠さないよう価格に対する別の機能アサーションを付けることです。",
      ),
      CODE("ts", `import { test, expect } from '@playwright/test';

test.describe('Trang sản phẩm — visual regression', () => {
  test.beforeEach(async ({ page }) => {
    // dữ liệu tất định: khoá giá & tồn kho qua mock để tách khỏi realtime
    await page.route('**/api/products/ao-thun-basic', route =>
      route.fulfill({ json: {
        name: 'Áo thun basic', price: 199000, currency: 'VND',
        stock: 12, images: ['/img/ao-1.png'],
      }}));
    await page.goto('/products/ao-thun-basic');
  });

  test('bố cục khớp baseline, giá đúng nghiệp vụ', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Áo thun basic' })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    // 1) ORACLE chức năng: giá hiển thị đúng, KHÔNG NaN/âm (mask không che được)
    await expect(page.getByTestId('product-price')).toHaveText('199.000 đ');

    // 2) ORACLE hình ảnh: bố cục tĩnh khớp baseline, mask vùng động
    await expect(page).toHaveScreenshot('product-page.png', {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      mask: [
        page.getByTestId('flash-sale-timer'),
        page.getByTestId('stock-remaining'),
      ],
      maxDiffPixelRatio: 0.01,
    });
  });
});`),
      P(
        "Chú ý cách chúng ta mock API để cố định dữ liệu: giá và tồn kho không còn phụ thuộc realtime nên phần lớn nhiễu biến mất, và ta có thể assert giá chính xác thay vì mask nó. Đây là mẫu tốt nhất khi có thể kiểm soát backend: cố định dữ liệu tận gốc thì cần ít mask hơn, test chặt hơn và bắt được nhiều lỗi hơn. Chỉ những thứ vốn động ngay cả khi dữ liệu cố định, như đồng hồ đếm ngược chạy theo thời gian thực, mới cần mask.",
        "Note how we mock the API to fix the data: price and stock no longer depend on realtime, so most noise vanishes and we can assert the exact price instead of masking it. This is the best pattern when you can control the backend: fixing data at the source means fewer masks, a tighter test and more bugs caught. Only things inherently dynamic even with fixed data — like a countdown clock running on wall time — still need masking.",
        "データを固定するためにAPIをモックする方法に注目してください。価格と在庫はもはやリアルタイムに依存しないため、大半のノイズが消え、マスクする代わりに正確な価格をアサートできます。これはバックエンドを制御できるときの最良のパターンです。データを根本で固定すればマスクが減り、テストが厳しくなり、より多くのバグを捉えます。データを固定しても本質的に動的なもの、例えば実時間で動くカウントダウン時計だけが、依然マスクを必要とします。",
      ),
      TIP(
        "Kết hợp visual test với component testing (@playwright/experimental-ct-react) cho các thành phần nhỏ tách biệt: chụp từng component với dữ liệu cố định giúp baseline nhỏ, ổn định và khoanh vùng lỗi cực nhanh.",
        "Combine visual tests with component testing (@playwright/experimental-ct-react) for isolated small components: capturing each component with fixed data yields small, stable baselines and pinpoints failures very fast.",
        "分離した小さなコンポーネントには、ビジュアルテストをコンポーネントテスト（@playwright/experimental-ct-react）と組み合わせます。各コンポーネントを固定データで撮影すると、小さく安定したベースラインが得られ、失敗を非常に速く特定できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. CI cho visual test và xử lý khi đỏ",
      en: "10. CI for visual tests and handling failures",
      ja: "10. ビジュアルテストのCIと失敗時の対処",
    },
    blocks: [
      P(
        "Trong CI, khi visual test đỏ, điều đầu tiên cần là bằng chứng để phán đoán. Cấu hình Playwright lưu ba ảnh làm attachment: expected (baseline), actual (lần này), và diff (khác biệt tô đỏ). Đưa thư mục test-results và báo cáo HTML lên làm artifact của job để reviewer tải về xem. Không có ba ảnh này, người xem không thể biết đỏ vì thay đổi thật hay nhiễu. Ngoài ra nên chạy visual test trong chính Docker image đã dùng để sinh baseline, đảm bảo môi trường khớp bit và loại bỏ toàn bộ nhiễu cross-OS ngay từ đầu.",
        "In CI, when a visual test reddens, the first need is evidence to judge. Playwright's config saves three images as attachments: expected (baseline), actual (this run), and diff (differences highlighted). Upload the test-results folder and the HTML report as job artifacts for reviewers to download and inspect. Without these three images, a viewer cannot tell whether red means a real change or noise. Also run visual tests in the very Docker image used to generate baselines, ensuring a bit-matching environment and eliminating all cross-OS noise from the start.",
        "CIでビジュアルテストが赤くなったとき、まず必要なのは判断のための証拠です。Playwrightの設定は3つの画像を添付として保存します。expected（ベースライン）、actual（今回）、diff（差分を強調）です。test-resultsフォルダとHTMLレポートをジョブのアーティファクトとしてアップロードし、レビュアーがダウンロードして確認できるようにします。この3画像がなければ、閲覧者は赤が本物の変更かノイズか判断できません。またビジュアルテストは、ベースライン生成に使った当のDockerイメージで実行し、ビット一致の環境を保証し、最初からすべてのクロスOSノイズを排除します。",
      ),
      CODE("yaml", `# .github/workflows/visual.yml
name: Visual regression
on: [pull_request]
jobs:
  visual:
    runs-on: ubuntu-latest
    container: mcr.microsoft.com/playwright:v1.61.0-noble
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright test --grep @visual
      - uses: actions/upload-artifact@v4
        if: always()   # tải lên cả khi fail để review expected/actual/diff
        with:
          name: playwright-report
          path: |
            playwright-report/
            test-results/`),
      P(
        "Về mặt vận hành, hãy tách visual test thành một job riêng bằng tag @visual để nó không làm chậm hay gây flaky cho suite chức năng chính. Khi baseline cần cập nhật do UI đổi hợp lệ, quy trình là: chạy update trong container, mở pull request chỉ chứa thay đổi ảnh, để reviewer duyệt diff, rồi merge. Tuyệt đối không cấp quyền cho pipeline tự động chạy update-snapshots và commit ngược lại, vì như thế mọi thay đổi UI vô tình đều được 'hợp thức hoá' mà không ai nhìn, đánh mất toàn bộ giá trị của visual regression.",
        "Operationally, split visual tests into a separate job via a @visual tag so they do not slow or destabilize the main functional suite. When baselines need updating due to a legitimate UI change, the process is: run update in the container, open a pull request containing only image changes, let a reviewer approve the diff, then merge. Absolutely do not grant the pipeline permission to auto-run update-snapshots and commit back, because that 'legitimizes' every accidental UI change unseen, losing all the value of visual regression.",
        "運用面では、ビジュアルテストを@visualタグで別ジョブに分け、主要な機能スイートを遅くしたり不安定にしたりしないようにします。正当なUI変更でベースライン更新が必要なときの手順は、コンテナ内でupdateを実行し、画像変更のみを含むプルリクエストを開き、レビュアーが差分を承認し、マージすることです。パイプラインにupdate-snapshotsを自動実行してコミットバックする権限を絶対に与えないでください。そうするとあらゆる偶発的なUI変更が誰にも見られず「正当化」され、ビジュアルリグレッションの価値がすべて失われます。",
      ),
      NOTE(
        "Đặt visual test chạy ở nhánh chính và pull request, không nhất thiết mỗi commit. Tần suất thấp hơn nhưng ổn định hơn còn tốt hơn chạy dày mà đầy nhiễu khiến ai cũng phớt lờ.",
        "Run visual tests on the main branch and pull requests, not necessarily every commit. Lower frequency but higher stability beats frequent runs full of noise that everyone ignores.",
        "ビジュアルテストはメインブランチとプルリクエストで実行し、必ずしも毎コミットで実行しません。頻度は低くても安定している方が、誰もが無視するノイズだらけの頻繁な実行より優れています。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Chống dương tính giả và âm tính giả",
      en: "11. Fighting false positives and false negatives",
      ja: "11. 偽陽性と偽陰性との戦い",
    },
    blocks: [
      P(
        "Visual test có hai kiểu sai nguy hiểm theo hai hướng ngược nhau. Dương tính giả là test đỏ dù UI không hề sai — do font, animation, cross-OS, dữ liệu động chưa kiểm soát. Hậu quả là mất niềm tin, đội bắt đầu bấm rerun và rồi bỏ qua cả đỏ thật. Âm tính giả nguy hiểm âm thầm hơn: test xanh dù UI đã hỏng — thường do ngưỡng quá lỏng hoặc mask quá rộng che mất chính vùng bị lỗi. Một bộ visual test giỏi là bộ tối thiểu hoá cả hai, mà chìa khoá là kiểm soát biến môi trường để siết ngưỡng thật chặt mà vẫn không flaky.",
        "Visual tests have two dangerous failure modes in opposite directions. A false positive is a test reddening though the UI is not wrong — from fonts, animations, cross-OS, or uncontrolled dynamic data. The consequence is lost trust; the team starts hitting rerun and then ignores real red too. A false negative is more insidious: the test stays green though the UI broke — usually from a too-loose threshold or a mask so wide it hides the very broken region. A good visual suite minimizes both, and the key is controlling environmental variables to tighten thresholds hard while staying non-flaky.",
        "ビジュアルテストには反対方向の2つの危険な失敗モードがあります。偽陽性はUIが誤っていないのにテストが赤くなることで、フォント・アニメーション・クロスOS・制御されない動的データが原因です。結果は信頼の喪失で、チームは再実行を押し始め、やがて本物の赤も無視します。偽陰性はより陰湿です。UIが壊れているのにテストが緑のままで、通常は緩すぎる閾値か、壊れた領域自体を隠すほど広いマスクが原因です。優れたビジュアルスイートは両方を最小化し、鍵は環境変数を制御して、フレーキーにならずに閾値を強く締めることです。",
      ),
      P(
        "Một chiến lược hay để kiểm chứng chính bộ visual test là chèn lỗi có chủ đích trong nhánh thử, ví dụ đổi màu nút hay lệch padding, và xác nhận test bắt được. Nếu bạn cố ý làm hỏng UI mà test vẫn xanh, ngưỡng hoặc mask đang che mất lỗi — cần siết lại. Đây là cách kiểm tra độ nhạy của bộ test, tương tự mutation testing cho code. Song song, hãy theo dõi tỉ lệ dương tính giả như một chỉ số sức khoẻ: nếu vượt ngưỡng, ưu tiên điều tra và ổn định trước khi thêm test mới.",
        "A good strategy to validate the visual suite itself is injecting deliberate defects on a scratch branch — say changing a button color or shifting padding — and confirming the test catches them. If you intentionally break the UI yet the test stays green, the threshold or mask is hiding the defect — tighten it. This checks the suite's sensitivity, akin to mutation testing for code. In parallel, track the false-positive rate as a health metric: if it exceeds threshold, prioritize investigation and stabilization before adding new tests.",
        "ビジュアルスイート自体を検証するよい戦略は、使い捨てブランチで意図的な欠陥を注入すること、例えばボタンの色を変えたり余白をずらしたりして、テストが捉えることを確認することです。意図的にUIを壊してもテストが緑のままなら、閾値かマスクが欠陥を隠しています。締め直しましょう。これはコードのミューテーションテストに似た、スイートの感度チェックです。並行して、偽陽性率を健全性指標として追跡します。閾値を超えたら、新しいテストを追加する前に調査と安定化を優先します。",
      ),
      QA(
        "Vì sao dương tính giả trong visual test lại nguy hiểm hơn ta tưởng?",
        "Why are false positives in visual tests more dangerous than they seem?",
        "Dương tính giả không chỉ tốn thời gian điều tra vô ích, mà còn ăn mòn niềm tin: khi test hay đỏ vì lý do vô nghĩa, đội ngũ hình thành phản xạ bấm rerun hoặc phê duyệt baseline mà không nhìn kỹ. Đến lúc có một regression thật, nó bị coi là một 'nhiễu' nữa và lọt qua. Nói cách khác, dương tính giả không chỉ hại chính nó mà còn tạo ra âm tính giả về sau. Vì thế ổn định phải được xử lý trước, thậm chí ưu tiên hơn phủ thêm màn hình mới.",
        "False positives not only waste investigation time, they corrode trust: when a test often reddens for meaningless reasons, the team forms a reflex to rerun or approve baselines without looking closely. When a real regression finally comes, it is treated as another 'noise' and slips through. In other words, false positives not only harm themselves but manufacture false negatives later. That is why stability must be addressed first, even prioritized over covering new screens.",
        "偽陽性は調査時間を無駄にするだけでなく、信頼を蝕みます。テストが無意味な理由で頻繁に赤くなると、チームはよく見ずに再実行したりベースラインを承認したりする反射を形成します。本物のリグレッションがついに来たとき、それは別の「ノイズ」として扱われすり抜けます。言い換えれば、偽陽性は自身を害するだけでなく、後の偽陰性を製造します。だからこそ安定化を最初に対処すべきで、新しい画面のカバーよりも優先すべきです。",
      ),
      WARN(
        "Không dùng --update-snapshots như nút 'làm hết đỏ'. Chạy update mù quáng sẽ bake mọi regression thật vào baseline, biến test thành luôn xanh và vô dụng.",
        "Do not use --update-snapshots as a 'make-the-red-go-away' button. Blindly updating bakes every real regression into the baseline, turning the test always-green and useless.",
        "--update-snapshotsを「赤を消す」ボタンとして使わないでください。盲目的に更新すると、あらゆる本物のリグレッションがベースラインに焼き込まれ、テストが常に緑で無用になります。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Anti-pattern thường gặp và cách tránh",
      en: "12. Common anti-patterns and how to avoid them",
      ja: "12. よくあるアンチパターンと回避法",
    },
    blocks: [
      P(
        "Có một loạt anti-pattern lặp đi lặp lại ở các dự án visual test thất bại. Thứ nhất là chụp cả trang khổng lồ với hàng chục vùng động rồi mask lung tung, khiến baseline vừa to vừa vô nghĩa; nên tách thành nhiều ảnh nhỏ theo component. Thứ hai là commit baseline từ máy cá nhân, dẫn tới cross-OS đỏ liên miên; luôn sinh trong Docker. Thứ ba là dùng ngưỡng lỏng để 'cho qua', làm test mất khả năng bắt lỗi. Thứ tư là không kèm assertion chức năng cho vùng bị mask, để bug logic lọt qua. Thứ năm là để pipeline tự update baseline, xoá sạch mọi bằng chứng regression.",
        "A recurring set of anti-patterns plagues failed visual-test projects. First, capturing one giant full page with dozens of dynamic zones then masking everywhere, making the baseline both huge and meaningless; split into small per-component images instead. Second, committing baselines from personal machines, causing endless cross-OS red; always generate in Docker. Third, using loose thresholds to 'let it pass', stripping the test of detection power. Fourth, omitting a functional assertion for masked regions, letting logic bugs slip. Fifth, letting the pipeline auto-update baselines, erasing all regression evidence.",
        "失敗したビジュアルテストのプロジェクトには繰り返し現れるアンチパターン群があります。第一に、数十の動的領域を持つ巨大なフルページを1枚撮影してあちこちマスクし、ベースラインを巨大かつ無意味にすること。代わりにコンポーネントごとの小さな画像に分割します。第二に、個人マシンからベースラインをコミットし、クロスOSの赤を延々と引き起こすこと。常にDockerで生成します。第三に、緩い閾値で「通す」こと。テストの検出力を奪います。第四に、マスクした領域の機能アサーションを省き、ロジックバグをすり抜けさせること。第五に、パイプラインにベースラインを自動更新させ、すべてのリグレッション証拠を消すことです。",
      ),
      UL(
        [
          "Ảnh baseline khổng lồ, mask khắp nơi → tách theo component, chụp nhỏ và ổn định.",
          "Baseline chụp trên macOS, so trên Linux → sinh baseline trong Docker image Playwright.",
          "Ngưỡng lỏng cho hết đỏ → siết chặt nhất có thể mà không flaky; kiểm bằng lỗi cấy.",
          "Mask vùng động nhưng quên assert logic → luôn kèm functional assertion cho vùng đó.",
          "Pipeline tự update-snapshots → chỉ update thủ công qua PR có người duyệt diff.",
        ],
        [
          "Giant baseline images masked everywhere → split per component, capture small and stable.",
          "Baseline on macOS compared on Linux → generate baselines in the Playwright Docker image.",
          "Loose threshold to kill red → as strict as possible without flakiness; verify with injected defects.",
          "Masking dynamic zones but forgetting logic → always pair a functional assertion for that zone.",
          "Pipeline auto-updating snapshots → update manually only via a PR with a human diff review.",
        ],
        [
          "あちこちマスクした巨大ベースライン画像 → コンポーネントごとに分割し、小さく安定して撮影。",
          "macOSのベースラインをLinuxで比較 → PlaywrightのDockerイメージでベースラインを生成。",
          "赤を消すための緩い閾値 → フレーキーにならない範囲で最大限厳格に、注入欠陥で検証。",
          "動的領域をマスクするがロジックを忘れる → その領域に必ず機能アサーションを組み合わせる。",
          "パイプラインがsnapshotを自動更新 → 人間が差分レビューするPR経由でのみ手動更新。",
        ]
      ),
      SCEN(
        "Tình huống: baseline 'xanh mãi mãi' sau một lần update mù",
        "Scenario: 'forever-green' baselines after one blind update",
        "Một kỹ sư gặp bảy visual test đỏ trước deadline, chạy npx playwright test --update-snapshots cho nhanh rồi commit. Ba tuần sau, một regression đổi màu nút Thanh toán từ xanh sang xám lọt lên production mà mọi visual test vẫn xanh, vì lần update mù đã bake luôn màu sai vào baseline. Bài học: update baseline phải qua review diff, và tuyệt đối không update hàng loạt dưới áp lực thời gian.",
        "An engineer hit seven red visual tests before a deadline, ran npx playwright test --update-snapshots for speed and committed. Three weeks later a regression changing the Checkout button from green to gray reached production while all visual tests stayed green, because the blind update had baked the wrong color into the baseline. Lesson: baseline updates must go through a diff review, and never mass-update under time pressure.",
        "シナリオ: 一度の盲目更新後の「永遠に緑」のベースライン",
        "あるエンジニアは締切前に7つの赤いビジュアルテストに遭遇し、手早くnpx playwright test --update-snapshotsを実行してコミットしました。3週間後、決済ボタンを緑から灰色に変えるリグレッションがすべてのビジュアルテストが緑のまま本番に到達しました。盲目的な更新が誤った色をベースラインに焼き込んだからです。教訓: ベースライン更新は差分レビューを経る必要があり、時間的プレッシャー下で一括更新してはいけません。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: câu hỏi và chốt hạ",
      en: "13. Interview angle: questions and takeaways",
      ja: "13. 面接の観点: 質問と要点",
    },
    blocks: [
      P(
        "Visual regression là chủ đề phỏng vấn ưa thích vì nó phơi bày ngay ứng viên có hiểu bản chất tất định hay chỉ biết gọi toHaveScreenshot. Người phỏng vấn thường hỏi về nguyên nhân flaky và cách khử, về sự khác nhau giữa threshold và maxDiffPixels, về bài toán cross-OS và tại sao phải dùng Docker, về khi nào mask và rủi ro của mask. Điểm mấu chốt gây ấn tượng là bạn nói được tinh thần oracle-first: mask hình nhưng vẫn assert logic, siết ngưỡng chặt để không bỏ sót, và coi baseline là code cần review chứ không phải ảnh vứt vào git.",
        "Visual regression is a favorite interview topic because it instantly exposes whether a candidate grasps determinism or merely knows how to call toHaveScreenshot. Interviewers typically ask about flakiness causes and cures, the difference between threshold and maxDiffPixels, the cross-OS problem and why Docker is needed, when to mask and the risks of masking. The impressive crux is articulating the oracle-first spirit: mask the picture yet still assert the logic, tighten thresholds so nothing is missed, and treat baselines as code needing review, not images dumped into git.",
        "ビジュアルリグレッションは人気の面接トピックです。候補者が決定性を理解しているか、単にtoHaveScreenshotの呼び方を知っているだけかを即座に露呈させるからです。面接官は通常、フレーキーの原因と対策、thresholdとmaxDiffPixelsの違い、クロスOS問題となぜDockerが必要か、いつマスクするかとマスクのリスクについて尋ねます。印象的な核心は、オラクルファーストの精神を語ることです。画像をマスクしてもロジックはアサートし、何も見逃さないよう閾値を締め、ベースラインをgitに放り込む画像ではなくレビューが必要なコードとして扱うことです。",
      ),
      QA(
        "Sự khác nhau giữa threshold và maxDiffPixels trong toHaveScreenshot?",
        "What's the difference between threshold and maxDiffPixels in toHaveScreenshot?",
        "threshold là độ nhạy màu YIQ áp cho MỖI pixel (0..1, mặc định 0.2): nó quyết định 'khác màu bao nhiêu thì một pixel bị tính là khác', dùng để lọc nhiễu khử răng cưa. maxDiffPixels (và maxDiffPixelRatio) là ngưỡng SỐ LƯỢNG pixel khác trên toàn ảnh: nó quyết định 'tổng bao nhiêu pixel khác thì test fail'. Một cái điều chỉnh định nghĩa 'pixel khác', cái kia điều chỉnh 'bao nhiêu pixel khác là chấp nhận được'. Dùng đồng thời cho kiểm soát tinh tế.",
        "threshold is per-PIXEL YIQ color sensitivity (0..1, default 0.2): it decides 'how much color difference makes a pixel count as different', used to filter anti-aliasing noise. maxDiffPixels (and maxDiffPixelRatio) is the COUNT threshold of differing pixels across the whole image: it decides 'how many differing pixels in total fail the test'. One tunes the definition of a 'different pixel', the other tunes 'how many differing pixels are acceptable'. Use both together for fine control.",
        "thresholdはピクセルごとのYIQ色感度（0..1、既定0.2）で、「どれだけの色差でピクセルが相違とみなされるか」を決め、アンチエイリアスのノイズ除去に使います。maxDiffPixels（およびmaxDiffPixelRatio）は画像全体の相違ピクセルの数の閾値で、「合計何個の相違ピクセルでテストが失敗するか」を決めます。一方は「相違ピクセル」の定義を、もう一方は「何個の相違ピクセルが許容されるか」を調整します。細かい制御には両方を併用します。",
      ),
      QA(
        "Baseline đỏ trên CI nhưng xanh trên máy bạn. Chẩn đoán thế nào?",
        "A baseline is red on CI but green on your machine. How do you diagnose?",
        "Đây gần như chắc chắn là vấn đề cross-OS render: baseline được chụp trên máy bạn (VD macOS) còn CI chạy Linux nên font, khử răng cưa, tổng hợp màu khác nhau ở cấp pixel. Mở ảnh diff trong báo cáo để xác nhận khác biệt là nhiễu render đều khắp chứ không tập trung ở một vùng bố cục. Cách sửa gốc: sinh lại baseline TRONG chính Docker image Playwright mà CI dùng, để ảnh khớp bit; và không bao giờ commit baseline chụp thẳng trên OS cá nhân.",
        "This is almost certainly a cross-OS rendering issue: the baseline was captured on your machine (e.g. macOS) while CI runs Linux, so fonts, anti-aliasing and color compositing differ at the pixel level. Open the diff image in the report to confirm the difference is uniform rendering noise, not concentrated in one layout region. Root fix: regenerate the baseline INSIDE the very Playwright Docker image CI uses so images match bit-for-bit; and never commit a baseline captured directly on a personal OS.",
        "これはほぼ確実にクロスOSの描画問題です。ベースラインはあなたのマシン（例: macOS）で撮影され、CIはLinuxで実行されるため、フォント・アンチエイリアス・色合成がピクセルレベルで異なります。レポートの差分画像を開き、差異が1つのレイアウト領域に集中せず均一な描画ノイズであることを確認します。根本対策: CIが使う当のPlaywright Dockerイメージ内でベースラインを再生成しビット一致させること、そして個人OSで直接撮影したベースラインを決してコミットしないことです。",
      ),
      QA(
        "Khi nào KHÔNG nên dùng visual regression?",
        "When should you NOT use visual regression?",
        "Không dùng visual regression cho những màn có nội dung bản chất không tất định mà không thể cố định, ví dụ dashboard biểu đồ realtime, feed quảng cáo bên thứ ba, hay trang phụ thuộc dữ liệu người dùng thật đổi liên tục — chi phí mask/ổn định vượt giá trị. Cũng không dùng nó thay cho test chức năng: visual test kiểm hình, không kiểm hành vi. Với logic nghiệp vụ (giá, tồn kho, quyền) hãy dùng assertion chức năng. Visual regression tỏa sáng ở bố cục, thương hiệu, thành phần UI ổn định và design system.",
        "Do not use visual regression for screens whose content is inherently non-deterministic and cannot be fixed — e.g. realtime chart dashboards, third-party ad feeds, or pages tied to constantly changing real user data — the mask/stabilization cost exceeds the value. Also do not use it as a substitute for functional tests: visual tests check appearance, not behavior. For business logic (price, stock, permissions) use functional assertions. Visual regression shines on layout, branding, stable UI components and design systems.",
        "本質的に非決定的で固定できない内容の画面には、ビジュアルリグレッションを使わないでください。例えばリアルタイムチャートのダッシュボード、サードパーティの広告フィード、絶えず変わる実ユーザーデータに結び付いたページなどでは、マスク・安定化のコストが価値を上回ります。また機能テストの代わりに使わないでください。ビジュアルテストは外観を確認し、振る舞いは確認しません。業務ロジック（価格・在庫・権限）には機能アサーションを使います。ビジュアルリグレッションは、レイアウト・ブランディング・安定したUIコンポーネント・デザインシステムで輝きます。",
      ),
      NOTE(
        "Thông điệp mang vào phỏng vấn: visual regression giá trị nhất khi TẤT ĐỊNH. Mọi kỹ thuật — mask, ngưỡng, Docker, chờ font/animation — đều phục vụ một mục tiêu: ảnh chỉ khác khi UI thật sự khác.",
        "Message to bring to interviews: visual regression is most valuable when DETERMINISTIC. Every technique — masking, thresholds, Docker, waiting on fonts/animations — serves one goal: images differ only when the UI truly differs.",
        "面接に持ち込むメッセージ: ビジュアルリグレッションは決定的なときに最も価値があります。マスク・閾値・Docker・フォントとアニメーションの待機、すべての技術は1つの目標に奉仕します。UIが本当に異なるときだけ画像が異なることです。",
      ),
    ],
  },
];

const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-visual-regression-stable",
  cover: coverA,
  tags: tags("nangcao", "ecommerce", "playwright", "visual", "advanced", "tip"),
  title: {
    vi: "Visual regression ổn định với Playwright",
    en: "Stable visual regression with Playwright",
    ja: "Playwrightで安定したビジュアルリグレッション",
  },
  summary: {
    vi: "Làm cho toHaveScreenshot tất định: vòng đời baseline & update có kiểm soát, mask vùng động, phân biệt maxDiffPixels/maxDiffPixelRatio/threshold, ổn định font & animation, giải bài toán baseline cross-OS bằng Docker, quản lý baseline trong git, ví dụ trang sản phẩm TMĐT. Kèm góc phỏng vấn.",
    en: "Make toHaveScreenshot deterministic: baseline lifecycle & controlled updates, masking dynamic regions, distinguishing maxDiffPixels/maxDiffPixelRatio/threshold, font & animation stabilization, solving cross-OS baselines with Docker, managing baselines in git, an e-commerce product-page example. With an interview angle.",
    ja: "toHaveScreenshotを決定的にする: ベースラインのライフサイクルと制御された更新、動的領域のマスキング、maxDiffPixels/maxDiffPixelRatio/thresholdの区別、フォントとアニメーションの安定化、DockerでのクロスOSベースライン解決、gitでのベースライン管理、ECの商品ページ例。面接の観点付き。",
  },
  pages: buildDoc(pagesA),
};

// ===========================================================================
// ARTICLE B — Self-healing tests với Healer Agent + guardrails
// ===========================================================================

const imgB1 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">VÒNG SELF-HEALING CÓ GUARDRAIL / GUARDED SELF-HEAL LOOP</text>
<g font-size="12">
  <rect x="24" y="58" width="150" height="50" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="40" y="80" fill="#ffedd5" font-weight="700">Test đỏ</text><text x="40" y="98" fill="#fdba74">locator gãy?</text>
  <rect x="210" y="58" width="150" height="50" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="226" y="80" fill="#e0f2fe" font-weight="700">Healer điều tra</text><text x="226" y="98" fill="#93c5fd">console/network/snapshot</text>
  <rect x="396" y="58" width="150" height="50" rx="8" fill="#3b0764" stroke="#c084fc"/><text x="412" y="80" fill="#f3e8ff" font-weight="700">Đề xuất fix</text><text x="412" y="98" fill="#d8b4fe">patch locator</text>
  <path d="M174 83 h34 M360 83 h34" stroke="#64748b" stroke-width="2" marker-end="url(#arB1)"/>
</g>
<rect x="24" y="132" width="180" height="60" rx="8" fill="#7f1d1d" stroke="#f87171"/><text x="40" y="156" fill="#fecaca" font-weight="700">GUARDRAIL</text><text x="40" y="176" fill="#fca5a5" font-size="11">bug thật? → KHÔNG heal</text>
<rect x="230" y="132" width="180" height="60" rx="8" fill="#422006" stroke="#f59e0b"/><text x="246" y="156" fill="#fef3c7" font-weight="700">Human review gate</text><text x="246" y="176" fill="#fcd34d" font-size="11">người duyệt patch</text>
<rect x="436" y="132" width="180" height="60" rx="8" fill="#134e4a" stroke="#34d399"/><text x="452" y="156" fill="#d1fae5" font-weight="700">Merge/Skip</text><text x="452" y="176" fill="#6ee7b7" font-size="11">hoặc mở bug ticket</text>
<path d="M471 108 v24 M300 108 C300 120 300 126 300 132 M525 108 v24" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arB1)"/>
<text x="24" y="228" fill="#f87171" font-size="12" font-weight="700">Bất biến bị vi phạm → test.abort() dừng khẩn, KHÔNG heal</text>
<defs><marker id="arB1" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>`),
  "Vòng self-healing có guardrail: Healer đề xuất, nhưng bug thật và bất biến vi phạm chặn heal.",
  "A guarded self-heal loop: the Healer proposes, but real bugs and violated invariants block healing.",
  "ガードレール付き自己修復ループ: Healerが提案しますが、本物のバグと不変条件違反が修復を阻止します。"
);

const imgB2 = IMG(
  frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">HEAL HAY KHÔNG? CÂY QUYẾT ĐỊNH / HEAL-OR-NOT DECISION TREE</text>
<rect x="230" y="52" width="180" height="42" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="246" y="72" fill="#e0f2fe" font-weight="700">Test đỏ vì sao?</text><text x="246" y="88" fill="#93c5fd" font-size="11">phân loại nguyên nhân</text>
<rect x="40" y="130" width="150" height="56" rx="8" fill="#134e4a" stroke="#34d399"/><text x="56" y="152" fill="#d1fae5" font-weight="700" font-size="12">Locator đổi</text><text x="56" y="170" fill="#6ee7b7" font-size="11">id/text UI đổi hợp lệ</text><text x="56" y="182" fill="#34d399" font-size="11">→ HEAL được</text>
<rect x="245" y="130" width="150" height="56" rx="8" fill="#7f1d1d" stroke="#f87171"/><text x="261" y="152" fill="#fecaca" font-weight="700" font-size="12">Bất biến vi phạm</text><text x="261" y="170" fill="#fca5a5" font-size="11">tiền âm, tồn kho âm</text><text x="261" y="182" fill="#f87171" font-size="11">→ abort, KHÔNG heal</text>
<rect x="450" y="130" width="150" height="56" rx="8" fill="#422006" stroke="#f59e0b"/><text x="466" y="152" fill="#fef3c7" font-weight="700" font-size="12">Nghi ngờ</text><text x="466" y="170" fill="#fcd34d" font-size="11">không chắc</text><text x="466" y="182" fill="#f59e0b" font-size="11">→ người duyệt</text>
<path d="M290 94 C200 110 130 118 115 130 M320 94 v36 M350 94 C440 110 510 118 525 130" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arB2)"/>
<text x="24" y="228" fill="#94a3b8" font-size="12">Nguyên tắc: chỉ heal khi lỗi ở TẦNG TEST (locator), không phải ở TẦNG NGHIỆP VỤ.</text>
<defs><marker id="arB2" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>`),
  "Cây quyết định heal-hay-không: chỉ heal lỗi tầng test, bất biến vi phạm phải abort.",
  "The heal-or-not decision tree: heal only test-layer issues; violated invariants must abort.",
  "修復するか否かの決定木: テスト層の問題だけ修復し、不変条件違反は中止すべきです。"
);

const pagesB = [
  {
    heading: {
      vi: "1. Self-healing test là gì và vì sao nó hấp dẫn",
      en: "1. What a self-healing test is and why it's attractive",
      ja: "1. 自己修復テストとは何か、なぜ魅力的なのか",
    },
    blocks: [
      P(
        "Self-healing test là ý tưởng để một tác nhân tự động sửa những test bị gãy do thay đổi giao diện, thay vì bắt con người sửa thủ công từng locator. Trong Playwright hiện đại, vai trò này thuộc về Healer agent, một trong ba tác nhân AI cộng tác cùng Planner và Generator. Khi một test đỏ, Healer chạy ở chế độ debug, đọc console, network, và snapshot khả năng truy cập của trang, suy luận vì sao locator không còn khớp, rồi đề xuất bản vá locator hoặc đánh dấu test bỏ qua nếu không thể. Sức hấp dẫn rất rõ: giảm chi phí bảo trì khổng lồ khi UI thay đổi liên tục.",
        "A self-healing test is the idea of letting an automated agent fix tests broken by UI changes, instead of forcing humans to hand-fix each locator. In modern Playwright this role belongs to the Healer agent, one of three cooperating AI agents alongside the Planner and Generator. When a test reddens, the Healer runs in debug mode, reads the console, network, and the page's accessibility snapshot, reasons about why the locator no longer matches, then proposes a locator patch or marks the test skipped if it cannot. The appeal is clear: slashing the huge maintenance cost when the UI changes constantly.",
        "自己修復テストとは、人間に各ロケーターを手動修正させる代わりに、UI変更で壊れたテストを自動エージェントに修正させるという発想です。現代のPlaywrightでは、この役割はHealerエージェントが担い、PlannerとGeneratorと並ぶ協調型AIエージェントの1つです。テストが赤くなると、Healerはデバッグモードで実行し、コンソール・ネットワーク・ページのアクセシビリティスナップショットを読み、なぜロケーターがもう一致しないかを推論し、ロケーターのパッチを提案するか、できなければテストをスキップとしてマークします。魅力は明白です。UIが絶えず変わるときの巨大な保守コストを削減します。",
      ),
      P(
        "Nhưng self-healing là con dao hai lưỡi. Nếu Healer sửa một cách mù quáng để 'cho test xanh', nó có thể vô tình chữa lành trên một bug thật: giả sử nút Thanh toán bị lập trình viên xoá nhầm, một Healer thiếu kỷ luật sẽ tìm nút gần giống rồi bấm vào đó, khiến test xanh trong khi tính năng đã hỏng. Đây là rủi ro trung tâm của bài viết. Mục tiêu không phải là cấm self-healing, mà là dựng guardrail để tận dụng sức mạnh giảm bảo trì của nó mà không bao giờ để nó che mất một regression thật.",
        "But self-healing is a double-edged sword. If the Healer fixes blindly just to 'make the test green', it can inadvertently heal over a real bug: suppose a developer accidentally deleted the Checkout button; an undisciplined Healer finds a near-matching button and clicks it, turning the test green while the feature is broken. This is the article's central risk. The goal is not to ban self-healing, but to build guardrails to harness its maintenance-reducing power while never letting it hide a real regression.",
        "しかし自己修復は諸刃の剣です。Healerが単に「テストを緑にする」ために盲目的に修正すると、本物のバグの上に修復してしまう可能性があります。例えば開発者が誤って決済ボタンを削除した場合、規律のないHealerは近似のボタンを見つけてクリックし、機能が壊れているのにテストを緑にします。これが本記事の中心的リスクです。目標は自己修復を禁止することではなく、保守削減の力を活用しつつ、本物のリグレッションを決して隠させないガードレールを構築することです。",
      ),
      NOTE(
        "Định nghĩa dùng xuyên bài: heal = sửa tự động ở TẦNG TEST (locator, chờ đợi) khi hành vi nghiệp vụ vẫn đúng; guardrail = ràng buộc ngăn heal khi lỗi thực ra nằm ở tầng nghiệp vụ.",
        "Definition used throughout: heal = automatic TEST-LAYER fixes (locators, waits) when the business behavior is still correct; guardrail = a constraint that blocks healing when the failure actually lies in the business layer.",
        "本記事を通じた定義: heal = 業務的振る舞いが正しいときのテスト層の自動修正（ロケーター、待機）。guardrail = 失敗が実は業務層にあるとき修復を阻止する制約。",
      ),
      imgB1,
    ],
  },
  {
    heading: {
      vi: "2. Healer agent hoạt động thế nào bên trong",
      en: "2. How the Healer agent works under the hood",
      ja: "2. Healerエージェントの内部動作",
    },
    blocks: [
      P(
        "Healer không đoán mò trên pixel. Nó làm việc trên accessibility tree — cây khả năng truy cập biểu diễn trang dưới dạng vai trò và tên có ngữ nghĩa, giống cách trình đọc màn hình nhìn thấy. Khi một test đỏ, Healer khởi động lại kịch bản ở chế độ debug, quan sát trạng thái trang tại bước thất bại, thu thập console log, network request, và ARIA snapshot, rồi đối chiếu locator cũ với cây hiện tại. Nếu nút 'Đăng nhập' đổi từ id=\"login\" sang một cấu trúc khác nhưng vẫn có role button với accessible name 'Đăng nhập', Healer suy ra locator ngữ nghĩa getByRole('button', {name:'Đăng nhập'}) và đề xuất thay thế.",
        "The Healer does not guess on pixels. It works on the accessibility tree — the semantic representation of the page as roles and names, the way a screen reader sees it. When a test reddens, the Healer re-runs the script in debug mode, observes the page state at the failing step, gathers console logs, network requests, and the ARIA snapshot, then reconciles the old locator against the current tree. If a 'Sign in' button changed from id=\"login\" to a different structure but still has role button with accessible name 'Sign in', the Healer infers the semantic locator getByRole('button', {name:'Sign in'}) and proposes the replacement.",
        "Healerはピクセルで推測しません。アクセシビリティツリー、つまりスクリーンリーダーが見るように、ページをロールと名前の意味表現としたものの上で動作します。テストが赤くなると、Healerはデバッグモードでスクリプトを再実行し、失敗ステップでのページ状態を観察し、コンソールログ・ネットワークリクエスト・ARIAスナップショットを収集し、古いロケーターを現在のツリーと突き合わせます。「サインイン」ボタンがid=\"login\"から別の構造に変わっても、role buttonでアクセシブル名「サインイン」を持つなら、Healerは意味的ロケーターgetByRole('button', {name:'サインイン'})を推論し、置換を提案します。",
      ),
      CODE("bash", `# Scaffold ba agent Planner/Generator/Healer + seed.spec.ts
npx playwright init-agents

# Sinh cấu trúc:
#   .github/agents/planner.md    -> khám phá app, viết test plan Markdown
#   .github/agents/generator.md  -> biến plan thành spec, verify locator trên app thật
#   .github/agents/healer.md      -> chạy debug, đọc console/network/snapshot, vá test đỏ
#   tests/seed.spec.ts            -> fixtures/setup dùng chung`),
      P(
        "Điểm mấu chốt về chất lượng heal là chất lượng của locator ngữ nghĩa. Healer heal tốt nhất khi ứng dụng có vai trò ARIA và nhãn rõ ràng, vì khi đó việc 'nút này giờ ở đâu' trở thành một suy luận có căn cứ trên ngữ nghĩa ổn định thay vì mò trên cấu trúc DOM dễ vỡ. Ngược lại, nếu app đầy div vô danh không role không label, Healer buộc phải bám vào selector mong manh và dễ heal sai. Vì thế đầu tư vào accessibility không chỉ tốt cho người dùng khuyết tật mà còn trực tiếp làm self-healing đáng tin hơn.",
        "The crux of heal quality is the quality of semantic locators. The Healer heals best when the app has clear ARIA roles and labels, because then 'where is this button now' becomes a grounded inference over stable semantics rather than groping through brittle DOM structure. Conversely, if the app is full of anonymous div soup with no roles or labels, the Healer is forced to cling to fragile selectors and easily heals wrong. So investing in accessibility not only helps disabled users but directly makes self-healing more trustworthy.",
        "修復品質の核心は意味的ロケーターの品質です。Healerは、アプリに明確なARIAロールとラベルがあるとき最もよく修復します。なぜなら「このボタンは今どこか」が、壊れやすいDOM構造を手探りするのではなく、安定した意味に基づいた推論になるからです。逆に、アプリがロールもラベルもない無名のdivだらけなら、Healerは脆弱なセレクタにしがみつくしかなく、簡単に誤って修復します。したがってアクセシビリティへの投資は、障害のあるユーザーを助けるだけでなく、直接的に自己修復をより信頼できるものにします。",
      ),
      TIP(
        "Trước khi bật self-healing, dọn locator sang ưu tiên ngữ nghĩa (getByRole/getByLabel/getByText) và gắn data-testid cho phần tử khó. Locator tốt = heal đúng; locator dựa CSS/xpath sâu = heal sai.",
        "Before enabling self-healing, migrate locators to semantic-first (getByRole/getByLabel/getByText) and add data-testid to tricky elements. Good locators = correct heals; deep CSS/xpath locators = wrong heals.",
        "自己修復を有効化する前に、ロケーターを意味優先（getByRole/getByLabel/getByText）に移行し、難しい要素にdata-testidを付けます。良いロケーター = 正しい修復。深いCSS/xpathロケーター = 誤った修復。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Rủi ro trung tâm: heal đè lên bug thật",
      en: "3. The central risk: healing over a real bug",
      ja: "3. 中心的リスク: 本物のバグの上に修復すること",
    },
    blocks: [
      P(
        "Đây là nguy cơ khiến self-healing có thể phản tác dụng nghiêm trọng. Test tồn tại để phát hiện khi hành vi thay đổi ngoài ý muốn. Nếu một tác nhân sửa test cho khớp bất kỳ trạng thái hiện tại nào của app, nó biến test thành tấm gương luôn phản chiếu đúng thực tại — kể cả khi thực tại đó là một bug. Hãy hình dung một deploy làm hỏng luồng thanh toán: nút Thanh toán biến mất và một nút Tiếp tục xuất hiện thay thế do lỗi điều kiện hiển thị. Một Healer ngây thơ thấy locator nút Thanh toán gãy, tìm phần tử tương tự, khoá vào nút Tiếp tục, và test xanh. Con người mất đúng tín hiệu đỏ mà lẽ ra phải chặn deploy.",
        "This is the danger that can make self-healing seriously counterproductive. Tests exist to detect when behavior changes unintentionally. If an agent fixes tests to match whatever the app's current state is, it turns the test into a mirror that always reflects reality faithfully — even when that reality is a bug. Picture a deploy that breaks the checkout flow: the Checkout button disappears and a Continue button appears instead due to a display-condition bug. A naive Healer sees the Checkout button's locator break, finds a similar element, latches onto the Continue button, and the test goes green. Humans lose the very red signal that should have blocked the deploy.",
        "これは自己修復を深刻に逆効果にしかねない危険です。テストは、振る舞いが意図せず変わったときを検出するために存在します。エージェントがアプリの現在の状態に合わせてテストを修正すると、テストは現実を常に忠実に映す鏡になります。その現実がバグであってもです。決済フローを壊すデプロイを想像してください。表示条件のバグで決済ボタンが消え、代わりに続行ボタンが現れます。素朴なHealerは決済ボタンのロケーターが壊れたのを見て、類似要素を見つけ、続行ボタンに固定し、テストが緑になります。人間は、デプロイを阻止すべきだったまさにその赤い信号を失います。",
      ),
      P(
        "Cái bẫy tinh vi ở chỗ heal thất bại trông y hệt heal thành công: cả hai đều cho test xanh. Sự khác biệt duy nhất là ý nghĩa nghiệp vụ, thứ mà một tác nhân chỉ nhìn locator không thể tự phân định. Vì vậy không được đánh giá một lần heal bằng tiêu chí 'test có xanh không', mà bằng 'bất biến nghiệp vụ có còn được kiểm chứng không'. Đây là lý do mọi hệ self-healing đáng tin đều phải neo vào các assertion nghiệp vụ mà tác nhân không được phép chỉnh, và phải có guardrail chặn heal khi những assertion đó bị vi phạm.",
        "The subtle trap is that a failed heal looks identical to a successful one: both make the test green. The only difference is business meaning, which an agent looking only at locators cannot adjudicate by itself. So a heal must not be judged by 'did the test go green' but by 'is the business invariant still verified'. This is why every trustworthy self-healing system must anchor to business assertions the agent is not allowed to touch, and must have guardrails that block healing when those assertions are violated.",
        "微妙な罠は、失敗した修復が成功した修復と見分けがつかないことです。どちらもテストを緑にします。唯一の違いは業務的意味で、ロケーターだけを見るエージェントは自力で判定できません。したがって修復は「テストが緑になったか」ではなく「業務不変条件がまだ検証されているか」で判断すべきです。だからこそ、信頼できる自己修復システムはすべて、エージェントが触れることを許されない業務アサーションに固定し、それらのアサーションが違反されたとき修復を阻止するガードレールを持たなければなりません。",
      ),
      WARN(
        "Không bao giờ để Healer sửa hay xoá các assertion nghiệp vụ (giá đúng, tổng tiền bảo toàn, quyền truy cập). Healer chỉ được đụng vào locator và cách chờ đợi, tuyệt đối không đụng vào oracle.",
        "Never let the Healer edit or delete business assertions (correct price, money conserved, access rights). The Healer may only touch locators and waiting; it must never touch the oracle.",
        "Healerに業務アサーション（正しい価格、金額の保存、アクセス権）を編集・削除させてはいけません。Healerが触れてよいのはロケーターと待機だけで、オラクルには決して触れてはいけません。",
      ),
      imgB2,
    ],
  },
  {
    heading: {
      vi: "4. Guardrail 1: tách oracle nghiệp vụ khỏi cơ chế",
      en: "4. Guardrail 1: separate business oracles from mechanics",
      ja: "4. ガードレール1: 業務オラクルを機構から分離する",
    },
    blocks: [
      P(
        "Guardrail nền tảng nhất là phân tách rạch ròi hai loại code trong test: cơ chế và oracle. Cơ chế là cách điều hướng và tìm phần tử — locator, click, chờ đợi; đây là phần Healer được phép sửa vì nó chỉ phản ánh cấu trúc UI có thể thay đổi. Oracle là các assertion khẳng định bất biến nghiệp vụ — tổng tiền phải bằng tổng dòng hàng, tồn kho không âm, người dùng không có quyền không thấy nút admin; đây là phần Healer TUYỆT ĐỐI không được đụng. Khi tách rõ hai loại này trong cấu trúc test, guardrail trở nên khả thi vì ta có thể ra lệnh cho tác nhân chỉ được chỉnh vùng cơ chế.",
        "The most fundamental guardrail is a sharp separation of two kinds of code in a test: mechanics and oracle. Mechanics is how you navigate and find elements — locators, clicks, waits; this is what the Healer may fix because it merely reflects changeable UI structure. The oracle is the assertions stating business invariants — the total must equal the sum of line items, stock is non-negative, an unauthorized user must not see the admin button; this is what the Healer must ABSOLUTELY not touch. Separating these two kinds cleanly in test structure makes guardrails feasible, because we can instruct the agent to modify only the mechanics region.",
        "最も基本的なガードレールは、テスト内の2種類のコードを明確に分離することです。機構とオラクルです。機構は要素の操作と検索の方法、つまりロケーター・クリック・待機です。これは変更可能なUI構造を反映するだけなので、Healerが修正してよい部分です。オラクルは業務不変条件を述べるアサーションで、合計は明細の和と等しくあるべき、在庫は非負、権限のないユーザーは管理ボタンを見てはいけない、などです。これはHealerが絶対に触れてはいけない部分です。テスト構造でこの2種類をきれいに分離することでガードレールが実現可能になります。エージェントに機構領域だけを変更するよう指示できるからです。",
      ),
      CODE("ts", `import { test, expect } from '@playwright/test';

test('đặt hàng: giá & tổng tiền phải đúng — oracle KHÔNG heal', async ({ page }) => {
  // --- MECHANICS (Healer được sửa locator/chờ đợi ở vùng này) ---
  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Đặt hàng' }).click();
  const total = await page.getByTestId('order-total').innerText();
  const lines = await page.getByTestId('line-amount').allInnerTexts();

  // --- ORACLE (bất biến nghiệp vụ — Healer KHÔNG được chỉnh) ---
  const sum = lines.reduce((s, x) => s + parseVnd(x), 0);
  expect(parseVnd(total), 'Tổng tiền phải bằng tổng các dòng').toBe(sum); // money conserved
  expect(sum).toBeGreaterThan(0); // không cho tổng 0 âm thầm lọt
});`),
      P(
        "Trong thực hành, hãy đánh dấu rõ vùng oracle bằng comment quy ước hoặc tách hẳn ra helper riêng để tác nhân và người review đều nhận diện được đây là phần cấm sửa. Một số đội đặt oracle vào một module assertions dùng chung mà chính sách heal loại trừ khỏi phạm vi chỉnh sửa. Ý tưởng cốt lõi: Healer làm cho test tiếp tục chạy được qua thay đổi UI, còn oracle bảo đảm nó vẫn kiểm đúng thứ cần kiểm. Hai vai trò tách bạch chính là điều biến self-healing từ nguy hiểm thành hữu ích.",
        "In practice, clearly mark the oracle region with a conventional comment or extract it into a dedicated helper so both the agent and reviewers recognize it as off-limits. Some teams place oracles in a shared assertions module that the heal policy excludes from the editable scope. The core idea: the Healer keeps the test runnable through UI changes, while the oracle guarantees it still verifies the right thing. These two separated roles are exactly what turns self-healing from dangerous into useful.",
        "実践では、オラクル領域を慣習的なコメントで明確にマークするか、専用ヘルパーに抽出し、エージェントとレビュアーの両方が編集禁止部分と認識できるようにします。一部のチームは、修復ポリシーが編集範囲から除外する共有アサーションモジュールにオラクルを置きます。核心は、HealerがテストをUI変更を通じて実行可能に保ち、オラクルが正しいものを検証し続けることを保証することです。この2つの分離された役割こそ、自己修復を危険から有用に変えるものです。",
      ),
      NOTE(
        "Quy tắc thực dụng: nếu một dòng test khẳng định về TIỀN, QUYỀN, hay SỐ LƯỢNG nghiệp vụ, đó là oracle. Nếu nó chỉ nói 'phần tử này ở đâu, bấm ra sao', đó là cơ chế Healer được sửa.",
        "Pragmatic rule: if a test line asserts about MONEY, PERMISSIONS, or business QUANTITIES, it is an oracle. If it merely says 'where is this element, how to click it', it is mechanics the Healer may fix.",
        "実用的なルール: テストの行が金額・権限・業務的な数量について断言するなら、それはオラクルです。単に「この要素はどこにあり、どうクリックするか」を言うだけなら、Healerが修正してよい機構です。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Guardrail 2: test.abort() dừng khẩn khi bất biến vỡ",
      en: "5. Guardrail 2: test.abort() emergency stop on broken invariants",
      ja: "5. ガードレール2: 不変条件が壊れたときのtest.abort()緊急停止",
    },
    blocks: [
      P(
        "Playwright v1.60 giới thiệu test.abort() như một cơ chế dừng khẩn cấp. Khác với một assertion thất bại thông thường chỉ đánh dấu test đỏ và có thể được Healer thử chữa, test.abort() nói rõ 'điều kiện tiên quyết bị vi phạm, không có gì đáng chạy tiếp và cũng không có gì đáng heal'. Đây là guardrail hoàn hảo cho các bất biến hệ thống: nếu phát hiện tồn kho âm, tiền không bảo toàn, hoặc một người dùng bị cô lập tenant lại thấy dữ liệu tenant khác, ta gọi test.abort() ngay để dừng và phát tín hiệu rằng đây là sự cố nghiêm trọng, không phải chỉ một locator gãy.",
        "Playwright v1.60 introduced test.abort() as an emergency-stop mechanism. Unlike an ordinary failed assertion that merely marks the test red and might be attempted by the Healer, test.abort() states clearly 'a precondition is violated; there is nothing worth continuing and nothing worth healing'. This is a perfect guardrail for system invariants: if we detect negative stock, unconserved money, or a tenant-isolated user seeing another tenant's data, we call test.abort() immediately to stop and signal that this is a serious incident, not just a broken locator.",
        "Playwright v1.60はtest.abort()を緊急停止機構として導入しました。テストを赤くマークするだけでHealerが修復を試みうる通常の失敗アサーションと異なり、test.abort()は「前提条件が違反されており、続行する価値も修復する価値もない」と明確に述べます。これはシステム不変条件に最適なガードレールです。負の在庫、保存されない金額、テナント分離されたユーザーが別テナントのデータを見る、などを検出したら、直ちにtest.abort()を呼んで停止し、これが単なる壊れたロケーターではなく重大なインシデントであると信号を発します。",
      ),
      CODE("ts", `import { test, expect } from '@playwright/test';

test('kiểm bất biến tồn kho — vỡ thì DỪNG KHẨN, không heal', async ({ page, request }) => {
  await page.goto('/admin/inventory');

  const stock = await (await request.get('/api/inventory/SKU-123')).json();

  // BẤT BIẾN HỆ THỐNG: tồn kho không bao giờ âm.
  if (stock.quantity < 0) {
    // Không phải locator gãy — đây là sự cố dữ liệu nghiêm trọng.
    test.info().annotations.push({ type: 'invariant-violation',
      description: 'Tồn kho âm: ' + stock.quantity });
    test.abort(); // dừng khẩn: KHÔNG cho phép heal, escalate ngay
  }

  expect(stock.quantity).toBeGreaterThanOrEqual(0);
});`),
      P(
        "Việc dùng test.abort() gửi một tín hiệu ngữ nghĩa rất quan trọng tới cả pipeline lẫn tác nhân: đây không phải loại đỏ 'thử heal xem sao' mà là loại đỏ 'dừng lại và gọi người'. Chính sách heal nên được cấu hình để không bao giờ đụng vào các test kết thúc bằng abort, và pipeline nên coi abort là tín hiệu chặn deploy mạnh hơn cả fail thường. Nói cách khác, abort là cách bạn mã hoá câu 'có những thứ mà nếu sai thì không có cách sửa tự động nào là chấp nhận được' thành một lệnh máy hiểu.",
        "Using test.abort() sends a crucial semantic signal to both the pipeline and the agent: this is not the 'try to heal it' kind of red but the 'stop and call a human' kind of red. The heal policy should be configured to never touch tests that end in abort, and the pipeline should treat abort as a deploy-blocking signal stronger than an ordinary fail. In other words, abort is how you encode the sentence 'there are things for which, if they are wrong, no automatic fix is acceptable' into a machine-understood instruction.",
        "test.abort()の使用は、パイプラインとエージェントの両方に極めて重要な意味的信号を送ります。これは「修復してみよう」型の赤ではなく「停止して人間を呼べ」型の赤です。修復ポリシーはabortで終わるテストに決して触れないよう設定すべきで、パイプラインはabortを通常のfailより強いデプロイ阻止信号として扱うべきです。言い換えれば、abortは「間違っていれば自動修正が許されないものがある」という文を、機械が理解する指示にエンコードする方法です。",
      ),
      TIP(
        "Dùng test.abort() cho các bất biến an toàn/tuân thủ (tiền, quyền, cô lập tenant, PII). Dùng fail thường cho lỗi chức năng thông thường. Sự phân biệt này chính là ranh giới cho phép/cấm heal.",
        "Use test.abort() for safety/compliance invariants (money, permissions, tenant isolation, PII). Use ordinary fail for normal functional errors. This distinction is exactly the heal-allowed/heal-forbidden boundary.",
        "test.abort()は安全性・コンプライアンスの不変条件（金額、権限、テナント分離、PII）に使います。通常のfailは通常の機能エラーに使います。この区別こそが修復可否の境界です。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. errorContext: làm giàu thất bại để chẩn đoán đúng",
      en: "6. errorContext: enriching failures for correct diagnosis",
      ja: "6. errorContext: 正しい診断のために失敗を豊かにする",
    },
    blocks: [
      P(
        "Một thất bại nghèo thông tin là mảnh đất màu mỡ cho heal sai. Nếu tất cả những gì tác nhân thấy là 'timeout chờ locator', nó chỉ có thể đoán rằng locator gãy và thử thay — dù nguyên nhân thật có thể là API trả 500 hay tồn kho hết. errorContext (v1.60) cho phép ta đính kèm ngữ cảnh có cấu trúc vào thất bại: request ID, phản hồi API liên quan, trạng thái nghiệp vụ tại thời điểm lỗi. Ngữ cảnh giàu này giúp cả con người lẫn tác nhân phân biệt 'lỗi ở tầng test' với 'lỗi ở tầng nghiệp vụ', từ đó quyết định có nên heal hay không một cách có căn cứ.",
        "An information-poor failure is fertile ground for a wrong heal. If all the agent sees is 'timeout waiting for locator', it can only guess the locator broke and try to swap it — even though the real cause might be an API returning 500 or stock being sold out. errorContext (v1.60) lets us attach structured context to a failure: request IDs, the relevant API response, the business state at failure time. This rich context helps both humans and agents distinguish a 'test-layer error' from a 'business-layer error', letting them decide whether to heal on solid grounds.",
        "情報の乏しい失敗は、誤った修復の肥沃な土壌です。エージェントが見るのが「ロケーター待機のタイムアウト」だけなら、ロケーターが壊れたと推測して交換を試みるしかありません。本当の原因がAPIの500返却や在庫切れであってもです。errorContext（v1.60）は、失敗に構造化コンテキストを添付できます。リクエストID、関連するAPIレスポンス、失敗時の業務状態などです。この豊かなコンテキストは、人間とエージェントの両方が「テスト層のエラー」と「業務層のエラー」を区別するのを助け、確かな根拠で修復すべきか判断させます。",
      ),
      CODE("ts", `import { test, expect } from '@playwright/test';

test('thêm giỏ hàng — kèm errorContext để chẩn đoán đúng', async ({ page }) => {
  const resp = page.waitForResponse('**/api/cart/add');
  await page.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  const r = await resp;

  // đính kèm ngữ cảnh giàu -> nếu đỏ, cả người & agent biết lỗi ở đâu
  await test.info().attach('cart-api', {
    body: JSON.stringify({ status: r.status(), body: await r.json() }, null, 2),
    contentType: 'application/json',
  });

  // errorContext: gắn thông tin nghiệp vụ vào assertion
  expect(r.status(), { message: 'API add-to-cart phải 200; nếu 409 là hết hàng, KHÔNG heal locator' })
    .toBe(200);
});`),
      P(
        "Điểm cốt lõi là errorContext biến chẩn đoán từ suy đoán thành suy luận. Khi thất bại mang theo phản hồi API cho thấy status 409 và message 'out of stock', rõ ràng đây không phải locator gãy mà là trạng thái nghiệp vụ, và tác nhân được lệnh không heal trong trường hợp này. Ngược lại, nếu API trả 200 mà vẫn không tìm thấy phần tử, khả năng cao là UI đổi cấu trúc và heal locator là hợp lý. Ngữ cảnh giàu chính là dữ liệu để guardrail đưa ra quyết định đúng thay vì để tác nhân đoán mù.",
        "The crux is that errorContext turns diagnosis from guessing into inference. When a failure carries an API response showing status 409 and message 'out of stock', it is clearly not a broken locator but a business state, and the agent is instructed not to heal in this case. Conversely, if the API returns 200 yet the element is not found, it is likely a UI structure change and healing the locator is reasonable. Rich context is precisely the data that lets guardrails make the right decision instead of the agent guessing blindly.",
        "核心は、errorContextが診断を推測から推論に変えることです。失敗がstatus 409とメッセージ「在庫切れ」を示すAPIレスポンスを伴うとき、それは明らかに壊れたロケーターではなく業務状態であり、エージェントはこの場合修復しないよう指示されます。逆に、APIが200を返すのに要素が見つからないなら、UI構造変更の可能性が高く、ロケーターの修復は妥当です。豊かなコンテキストこそ、エージェントが盲目的に推測する代わりに、ガードレールが正しい判断を下すためのデータです。",
      ),
      NOTE(
        "errorContext + attachment còn giúp Trace Viewer hiển thị nguyên nhân trực tiếp trong báo cáo, rút ngắn thời gian điều tra cho người review khi họ đánh giá đề xuất heal của tác nhân.",
        "errorContext + attachments also let the Trace Viewer show the cause directly in the report, cutting investigation time for the reviewer when they evaluate the agent's heal proposal.",
        "errorContextと添付は、Trace Viewerがレポートに原因を直接表示するのも助け、レビュアーがエージェントの修復提案を評価する際の調査時間を短縮します。",
      ),
      QA(
        "errorContext giúp phân biệt lỗi tầng test với lỗi tầng nghiệp vụ ra sao?",
        "How does errorContext help distinguish a test-layer error from a business-layer error?",
        "Nếu không có ngữ cảnh, một thất bại chỉ là 'timeout chờ locator', và tác nhân dễ kết luận sai rằng locator gãy rồi heal đại. errorContext đính kèm dữ liệu có cấu trúc — status và body của API, trạng thái nghiệp vụ, request ID — nên ta phân định được: nếu API trả 409 'hết hàng' thì đây là trạng thái nghiệp vụ, KHÔNG heal; nếu API trả 200 mà phần tử vẫn không thấy thì nhiều khả năng UI đổi cấu trúc, heal locator là hợp lý. Nói cách khác, errorContext biến quyết định heal từ đoán mù thành suy luận dựa bằng chứng, và chính là dữ liệu để guardrail hoạt động đúng.",
        "Without context, a failure is just 'timeout waiting for locator', and the agent easily mis-concludes the locator broke and heals blindly. errorContext attaches structured data — API status and body, business state, request IDs — so we can adjudicate: if the API returns 409 'out of stock' this is a business state, do NOT heal; if the API returns 200 yet the element is not found, a UI structure change is likely and healing the locator is reasonable. In other words, errorContext turns the heal decision from blind guessing into evidence-based inference, and is precisely the data that lets guardrails work correctly.",
        "コンテキストがなければ、失敗は単なる「ロケーター待機のタイムアウト」で、エージェントはロケーターが壊れたと誤結論して盲目的に修復しがちです。errorContextは構造化データ、つまりAPIのstatusとbody・業務状態・リクエストIDを添付するため判定できます。APIが409「在庫切れ」を返せばこれは業務状態で修復しません。APIが200を返すのに要素が見つからなければUI構造変更の可能性が高く、ロケーターの修復は妥当です。言い換えれば、errorContextは修復判断を盲目的な推測から証拠に基づく推論に変え、まさにガードレールが正しく機能するためのデータです。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. ARIA snapshot có bounding box — mắt của tác nhân",
      en: "7. ARIA snapshots with bounding boxes — the agent's eyes",
      ja: "7. バウンディングボックス付きARIAスナップショット — エージェントの目",
    },
    blocks: [
      P(
        "Từ v1.60, ARIA snapshot của Playwright bao gồm cả bounding box — toạ độ và kích thước bố cục của từng phần tử. Đây là bước tiến quan trọng cho tác nhân AI. Trước đây, snapshot khả năng truy cập cho biết 'có một nút tên Đăng nhập' nhưng không biết nó ở đâu trên màn. Với bounding box, tác nhân biết cả ngữ nghĩa lẫn vị trí không gian, nên có thể suy luận tinh tế hơn: 'nút Thanh toán trước ở góc phải dưới, giờ có một nút vai trò button cùng vị trí nhưng tên khác' — một manh mối mạnh để phân biệt đổi nhãn hợp lệ với một nút hoàn toàn khác ở chỗ khác.",
        "Since v1.60, Playwright's ARIA snapshots include bounding boxes — each element's layout coordinates and size. This is a key advance for AI agents. Previously, the accessibility snapshot told you 'there is a button named Sign in' but not where it sits on screen. With bounding boxes, the agent knows both the semantics and the spatial position, so it can reason more subtly: 'the Checkout button was previously bottom-right; now there is a button-role element at the same position but a different name' — a strong clue to distinguish a legitimate relabel from a wholly different button elsewhere.",
        "v1.60以降、PlaywrightのARIAスナップショットはバウンディングボックス、つまり各要素のレイアウト座標とサイズを含みます。これはAIエージェントにとって重要な前進です。以前はアクセシビリティスナップショットが「サインインという名前のボタンがある」と伝えても、画面のどこにあるかは分かりませんでした。バウンディングボックスがあれば、エージェントは意味と空間的位置の両方を知り、より微妙に推論できます。「決済ボタンは以前は右下だった。今、同じ位置にbuttonロールの要素があるが名前が違う」というのは、正当なラベル変更と別の場所の全く別のボタンを区別する強い手がかりです。",
      ),
      CODE("ts", `import { test, expect } from '@playwright/test';

test('ARIA snapshot làm neo ổn định cho heal', async ({ page }) => {
  await page.goto('/checkout');
  // ARIA snapshot (v1.60 kèm bounding box) — vừa là oracle cấu trúc,
  // vừa là ngữ cảnh giàu cho Healer khi cần suy luận locator.
  await expect(page.getByRole('main')).toMatchAriaSnapshot(\`
    - heading "Thanh toán" [level=1]
    - button "Đặt hàng"
    - text /Tổng: [\\d.]+ đ/
  \`);
});`),
      P(
        "Có một sự cân nhắc tinh tế ở đây. Bounding box giúp tác nhân suy luận tốt hơn, nhưng đừng để nó kéo self-healing quay về tư duy dựa toạ độ mong manh của quá khứ. Bounding box là ngữ cảnh phụ trợ cho suy luận, không phải cơ sở khoá phần tử. Locator sinh ra sau heal vẫn phải là locator ngữ nghĩa ổn định như getByRole, chứ không phải click theo toạ độ x-y. Nói cách khác, dùng bounding box để nghĩ nhưng khoá bằng ngữ nghĩa. Đây là ranh giới giữ cho heal vừa thông minh vừa bền vững qua các thay đổi bố cục sau này.",
        "There is a subtle consideration here. Bounding boxes help the agent reason better, but do not let them drag self-healing back to the brittle coordinate-based thinking of the past. The bounding box is auxiliary context for reasoning, not a basis for locking an element. The locator produced after healing must still be a stable semantic locator like getByRole, not a click by x-y coordinate. In other words, use bounding boxes to think but lock with semantics. This is the line that keeps heals both smart and durable across future layout changes.",
        "ここに微妙な考慮があります。バウンディングボックスはエージェントのより良い推論を助けますが、自己修復を過去の脆弱な座標ベースの思考に引き戻させてはいけません。バウンディングボックスは推論のための補助的コンテキストであり、要素を固定する基盤ではありません。修復後に生成されるロケーターは、x-y座標によるクリックではなく、getByRoleのような安定した意味的ロケーターであるべきです。言い換えれば、バウンディングボックスは考えるために使い、意味で固定します。これが、修復を賢く、かつ将来のレイアウト変更を通じて耐久性のあるものに保つ境界線です。",
      ),
      TIP(
        "Dùng toMatchAriaSnapshot làm oracle cấu trúc song song với test hành vi: nếu ARIA tree đổi bất ngờ, đó là tín hiệu sớm để người xem xét trước khi Healer kịp 'chữa' một thay đổi có thể là bug.",
        "Use toMatchAriaSnapshot as a structural oracle alongside behavioral tests: if the ARIA tree changes unexpectedly, that is an early signal for a human to review before the Healer 'fixes' a change that might be a bug.",
        "toMatchAriaSnapshotを振る舞いテストと並ぶ構造オラクルとして使います。ARIAツリーが予期せず変わったら、それはHealerがバグかもしれない変更を「修正」する前に人間がレビューする早期信号です。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Human review gate: người luôn là chốt cuối",
      en: "8. Human review gate: a human is always the final gate",
      ja: "8. ヒューマンレビューゲート: 人間が常に最終ゲート",
    },
    blocks: [
      P(
        "Guardrail quan trọng nhất về mặt tổ chức là cổng review của con người. Healer không bao giờ được tự động merge bản vá của mình vào nhánh chính; nó tạo ra một đề xuất — một pull request chứa thay đổi locator kèm giải thích lý do — để một kỹ sư duyệt. Người review nhìn diff, đối chiếu với trace và ARIA snapshot, và trả lời câu hỏi mấu chốt mà tác nhân không thể tự trả lời: 'thay đổi UI này có chủ đích không?'. Nếu có, duyệt heal; nếu không, đây là regression, đóng đề xuất và mở bug ticket. Cổng này biến tác nhân thành trợ lý đề xuất, không phải người ra quyết định cuối.",
        "The most important organizational guardrail is the human review gate. The Healer must never auto-merge its own patch into the main branch; it produces a proposal — a pull request containing the locator change with an explanation of its reasoning — for an engineer to review. The reviewer looks at the diff, cross-checks against the trace and ARIA snapshot, and answers the crucial question the agent cannot answer itself: 'was this UI change intentional?'. If yes, approve the heal; if no, this is a regression, close the proposal and open a bug ticket. This gate makes the agent a proposing assistant, not the final decision-maker.",
        "組織的に最も重要なガードレールはヒューマンレビューゲートです。Healerは自身のパッチをメインブランチに自動マージしてはいけません。エージェントは提案、つまり推論の説明付きのロケーター変更を含むプルリクエストを生成し、エンジニアがレビューします。レビュアーは差分を見て、トレースとARIAスナップショットと照合し、エージェントが自力で答えられない核心の問いに答えます。「このUI変更は意図的か」です。はいなら修復を承認し、いいえならこれはリグレッションで、提案を閉じてバグチケットを開きます。このゲートはエージェントを提案する助手にし、最終決定者にはしません。",
      ),
      CODE("yaml", `# .github/workflows/heal.yml — Healer mở PR đề xuất, KHÔNG tự merge
name: Self-heal proposal
on:
  workflow_run:
    workflows: ["E2E"]
    types: [completed]
jobs:
  propose-heal:
    if: \${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test --last-failed # Healer chạy debug, sinh patch
      - name: Mở PR đề xuất (cần người duyệt)
        run: |
          git checkout -b heal/\${{ github.run_id }}
          git commit -am "proposal: heal locators (NEEDS HUMAN REVIEW)"
          gh pr create --label needs-review --reviewer qa-team \\
            --title "🩹 Heal proposal - review diff vs bug"
        # KHÔNG có bước auto-merge. Người duyệt quyết định.`),
      P(
        "Để cổng review hiệu quả, đề xuất heal phải minh bạch: nó cần đính kèm trace, ảnh trước/sau, ARIA snapshot cũ và mới, và lời giải thích của tác nhân về vì sao nó tin locator đổi là hợp lệ. Người review càng có nhiều bằng chứng, quyết định càng nhanh và đúng. Một mẹo tổ chức tốt là gắn nhãn và routing để mọi PR heal đều tới đúng đội sở hữu màn hình đó, tránh cảnh heal của một luồng thanh toán quan trọng bị một người không quen domain duyệt qua loa. Con người là chốt cuối, nhưng con người cũng cần được trang bị ngữ cảnh để chốt đúng.",
        "For the review gate to be effective, the heal proposal must be transparent: it needs to attach the trace, before/after images, old and new ARIA snapshots, and the agent's explanation of why it believes the locator change is legitimate. The more evidence the reviewer has, the faster and more correct the decision. A good organizational trick is labeling and routing so every heal PR reaches the team owning that screen, avoiding a critical checkout-flow heal being rubber-stamped by someone unfamiliar with the domain. The human is the final gate, but the human also needs to be equipped with context to gate correctly.",
        "レビューゲートを効果的にするには、修復提案が透明でなければなりません。トレース、変更前後の画像、新旧のARIAスナップショット、そしてロケーター変更が正当だと信じる理由のエージェントの説明を添付する必要があります。レビュアーの証拠が多いほど、判断は速く正確になります。良い組織的コツは、すべての修復PRがその画面を所有するチームに届くようラベル付けとルーティングをすることで、重要な決済フローの修復がドメインに不慣れな人にざっと承認されるのを避けます。人間が最終ゲートですが、人間も正しくゲートするためのコンテキストが必要です。",
      ),
      WARN(
        "Không bao giờ cấu hình auto-merge cho PR do Healer tạo. Bỏ cổng người là mở đường cho heal đè bug thật lọt thẳng lên nhánh chính — đúng thảm hoạ mà guardrail muốn ngăn.",
        "Never configure auto-merge for Healer-created PRs. Removing the human gate opens the door for heal-over-bug to land straight on the main branch — exactly the disaster guardrails aim to prevent.",
        "Healerが作成したPRに自動マージを決して設定しないでください。人間のゲートを外すことは、バグ上の修復がメインブランチに直接着地する道を開きます。まさにガードレールが防ごうとする災厄です。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Khi nào KHÔNG nên auto-heal",
      en: "9. When you should NOT auto-heal",
      ja: "9. 自動修復すべきでないとき",
    },
    blocks: [
      P(
        "Không phải test nào cũng nên nằm trong phạm vi self-healing. Có những loại test mà một thay đổi khiến chúng đỏ gần như luôn là tín hiệu cần con người xem, không phải cần máy chữa. Test về luồng thanh toán và tiền bạc: một thay đổi ở đây thường ngụ ý thay đổi nghiệp vụ nghiêm trọng cần thiết kế lại test, không phải vá locator. Test về phân quyền và bảo mật: nếu locator nút admin gãy vì nút biến mất, có thể chính là RBAC hoạt động đúng hoặc một lỗ hổng, cả hai đều cần người. Test về tuân thủ và audit: những test này là bằng chứng pháp lý, không được để tác nhân tự chỉnh.",
        "Not every test should be in scope for self-healing. Some kinds of tests, when a change reddens them, almost always signal a need for human review, not machine repair. Tests about checkout and money flows: a change here usually implies a serious business change needing test redesign, not a locator patch. Tests about authorization and security: if the admin-button locator breaks because the button vanished, that might be RBAC working correctly or a vulnerability — both need a human. Tests about compliance and audit: these tests are legal evidence and must not be self-edited by an agent.",
        "すべてのテストが自己修復の範囲にあるべきではありません。ある種のテストは、変更で赤くなったとき、機械の修理ではなく人間のレビューを必要とする信号であることがほぼ常です。決済と金銭フローに関するテスト: ここでの変更は通常、ロケーターのパッチではなくテスト再設計を要する重大な業務変更を意味します。認可とセキュリティに関するテスト: 管理ボタンのロケーターがボタン消失で壊れたなら、それはRBACが正しく機能しているか脆弱性のどちらかで、両方とも人間を要します。コンプライアンスと監査に関するテスト: これらは法的証拠であり、エージェントに自己編集させてはいけません。",
      ),
      UL(
        [
          "Luồng tiền/thanh toán → đỏ ở đây gần như luôn là thay đổi nghiệp vụ, con người xem.",
          "Phân quyền/RBAC/bảo mật → nút biến mất có thể là tính năng đúng HOẶC lỗ hổng — cấm auto-heal.",
          "Tuân thủ/audit/PII → test là bằng chứng, tác nhân không được tự chỉnh.",
          "Test có oracle bất biến (test.abort) → nếu abort, tuyệt đối không heal.",
          "Màn hình đang trong sprint đổi lớn → UI biến động, heal sẽ đuổi theo mục tiêu di động.",
        ],
        [
          "Money/checkout flows → red here is almost always a business change; a human reviews.",
          "Authorization/RBAC/security → a vanished button may be a correct feature OR a hole — forbid auto-heal.",
          "Compliance/audit/PII → tests are evidence; the agent must not self-edit them.",
          "Tests with invariant oracles (test.abort) → if it aborts, absolutely no healing.",
          "Screens mid a large-change sprint → UI is volatile; healing chases a moving target.",
        ],
        [
          "金銭・決済フロー → ここの赤はほぼ常に業務変更で、人間がレビューする。",
          "認可・RBAC・セキュリティ → ボタン消失は正しい機能か穴のどちらか、自動修復を禁止。",
          "コンプライアンス・監査・PII → テストは証拠で、エージェントに自己編集させない。",
          "不変条件オラクル付きテスト（test.abort）→ 中止したら絶対に修復しない。",
          "大きな変更スプリント中の画面 → UIが不安定で、修復は動く標的を追う。",
        ]
      ),
      SCEN(
        "Tình huống: heal 'thành công' che mất lỗ hổng phân quyền",
        "Scenario: a 'successful' heal hides an authorization hole",
        "Một test kiểm 'người dùng thường KHÔNG thấy nút Xoá người dùng'. Sau một refactor, nút admin đổi cả cấu trúc lẫn điều kiện hiển thị và giờ lộ ra cho cả user thường. Test đỏ vì locator 'không tìm thấy nút để khẳng định vắng mặt' bị Healer hiểu nhầm là locator gãy, nó cập nhật để 'khớp trạng thái hiện tại' và test xanh — trong khi thực chất một lỗ hổng RBAC vừa mở. Guardrail đúng: gắn nhãn test bảo mật là no-heal, và assert vắng mặt bằng oracle mà tác nhân không được chỉnh.",
        "A test verifies 'a normal user does NOT see the Delete-user button'. After a refactor, the admin button changed both structure and display condition and is now exposed to normal users too. The test reddens because the locator 'cannot find the button to assert absence', which the Healer misreads as a broken locator; it updates to 'match the current state' and the test goes green — while in fact an RBAC hole just opened. The right guardrail: label security tests as no-heal, and assert absence via an oracle the agent may not touch.",
        "シナリオ: 「成功した」修復が認可の穴を隠す",
        "あるテストは「一般ユーザーはユーザー削除ボタンを見ないこと」を検証します。リファクタ後、管理ボタンは構造と表示条件の両方が変わり、今は一般ユーザーにも露出しています。テストは「不在を主張するボタンが見つからない」ため赤くなり、Healerはこれを壊れたロケーターと誤読し、「現在の状態に合わせる」よう更新してテストが緑になります。実際にはRBACの穴が開いたのにです。正しいガードレール: セキュリティテストをno-healとラベル付けし、エージェントが触れないオラクルで不在をアサートします。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Đo lường: heal có thật sự giúp ích không?",
      en: "10. Measuring: is healing actually helping?",
      ja: "10. 測定: 修復は本当に役立っているか",
    },
    blocks: [
      P(
        "Self-healing chỉ đáng tin nếu ta đo được nó. Ba chỉ số cốt lõi cần theo dõi. Thứ nhất là tỉ lệ heal đúng: trên tổng số đề xuất heal, bao nhiêu phần trăm được người duyệt xác nhận là thay đổi UI hợp lệ, so với bao nhiêu phần trăm bị bác vì thực ra là bug. Tỉ lệ bác cao là cảnh báo rằng tác nhân đang heal ẩu hoặc suite thiếu oracle. Thứ hai là thời gian tiết kiệm: chi phí bảo trì giảm được nhờ heal, đo bằng số giờ kỹ sư không phải sửa locator thủ công. Thứ ba là số bug lọt do heal sai — con số phải bằng không, và mỗi lần khác không là một sự cố cần điều tra.",
        "Self-healing is only trustworthy if we measure it. Three core metrics to track. First, heal correctness rate: of all heal proposals, what percent are confirmed by reviewers as legitimate UI changes versus what percent are rejected as actually being bugs. A high rejection rate warns that the agent is healing carelessly or the suite lacks oracles. Second, time saved: the maintenance cost reduced by healing, measured in engineer-hours not spent hand-fixing locators. Third, bugs slipped due to wrong heals — this number must be zero, and every nonzero occurrence is an incident to investigate.",
        "自己修復は測定できて初めて信頼できます。追跡すべき核心指標は3つです。第一に修復正確率: すべての修復提案のうち、正当なUI変更とレビュアーに確認された割合と、実はバグとして却下された割合です。却下率が高いのは、エージェントが雑に修復しているか、スイートにオラクルが欠けている警告です。第二に節約時間: 修復により削減された保守コストで、ロケーターを手動修正しなかったエンジニア時間で測ります。第三に誤修復ですり抜けたバグ数、これはゼロでなければならず、非ゼロは調査すべきインシデントです。",
      ),
      CODE("ts", `// Ghi log mỗi lần heal để đo về sau (đưa vào reporter tuỳ biến)
type HealEvent = {
  testId: string;
  proposedLocator: string;
  verdict: 'approved' | 'rejected-as-bug' | 'pending';
  reviewer?: string;
  savedMinutes?: number;
};

// KPI hàng tuần:
//   correctness = approved / (approved + rejected-as-bug)
//   nếu correctness < 0.8  -> siết chính sách heal, bổ sung oracle
//   bugsSlippedByHeal MUST == 0  -> mỗi khác 0 là post-mortem`),
      P(
        "Cách trình bày các chỉ số này cũng quan trọng. Đừng khoe 'Healer đã tự sửa 200 test' như một thành tích thuần tuý, vì nếu trong đó có heal đè bug thì con số ấy là tai hoạ được tô hồng. Thay vào đó, báo cáo phải song hành hai vế: bao nhiêu heal được duyệt đúng và tiết kiệm bao nhiêu, cạnh bên là bao nhiêu đề xuất bị bác vì phát hiện bug thật — vế thứ hai chứng minh guardrail đang làm việc. Một hệ self-healing khoẻ mạnh là hệ mà đôi khi tác nhân đề xuất heal nhưng con người bác vì đó là bug; đó là bằng chứng hàng rào an toàn còn nguyên.",
        "How you present these metrics matters too. Do not brag 'the Healer auto-fixed 200 tests' as a pure achievement, because if some of those were heal-over-bug, that number is a rosy-painted disaster. Instead, reporting must pair two sides: how many heals were correctly approved and how much time saved, alongside how many proposals were rejected because a real bug was found — the second side proves the guardrails are working. A healthy self-healing system is one where the agent sometimes proposes a heal but humans reject it because it was a bug; that is evidence the safety fence is intact.",
        "これらの指標の提示方法も重要です。「Healerが200個のテストを自動修正した」を純粋な成果として自慢しないでください。その中にバグ上の修復があれば、その数字はバラ色に塗られた災厄だからです。代わりに、報告は2つの側面を対にすべきです。正しく承認された修復の数と節約時間、その隣に本物のバグ発見のため却下された提案の数です。後者はガードレールが機能している証明です。健全な自己修復システムは、エージェントが時々修復を提案しても、それがバグだったため人間が却下するものです。それは安全柵が無傷である証拠です。",
      ),
      NOTE(
        "Chỉ số vàng: bugsSlippedByHeal = 0. Nếu chỉ số này khác 0 dù chỉ một lần, dừng mở rộng self-healing, làm post-mortem và siết guardrail trước khi tiếp tục.",
        "Golden metric: bugsSlippedByHeal = 0. If it is nonzero even once, halt the self-healing rollout, run a post-mortem and tighten guardrails before continuing.",
        "黄金指標: bugsSlippedByHeal = 0。一度でも非ゼロなら、自己修復の展開を止め、ポストモーテムを実施し、続行前にガードレールを締めます。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Ghép self-healing vào pipeline một cách an toàn",
      en: "11. Wiring self-healing into the pipeline safely",
      ja: "11. 自己修復を安全にパイプラインに組み込む",
    },
    blocks: [
      P(
        "Đặt self-healing đúng chỗ trong pipeline là yếu tố quyết định giữa trợ thủ và tai hoạ. Nguyên tắc là: heal chạy ngoài đường tới production, không bao giờ trên đường tới production. Cụ thể, khi suite E2E đỏ ở một nhánh, một job phụ chạy Healer ở chế độ debug để sinh đề xuất; đề xuất này đi vào một pull request riêng cần người duyệt, không được tự động chảy vào nhánh chính. Bản build đang xét vẫn đỏ và vẫn chặn deploy cho tới khi con người quyết định. Như vậy self-healing tăng tốc bảo trì mà không bao giờ làm suy yếu cổng chất lượng chặn hàng lỗi.",
        "Placing self-healing correctly in the pipeline is the deciding factor between an aide and a disaster. The principle is: healing runs off the path to production, never on the path to production. Concretely, when the E2E suite reddens on a branch, a side job runs the Healer in debug mode to generate a proposal; that proposal goes into a separate pull request needing human approval and must not flow automatically into the main branch. The build under review stays red and keeps blocking deploy until a human decides. Thus self-healing speeds maintenance without ever weakening the quality gate that blocks defective releases.",
        "パイプラインに自己修復を正しく配置することが、助手と災厄を分ける決定要因です。原則は、修復は本番への経路の外で実行し、本番への経路上では決して実行しないことです。具体的には、ブランチでE2Eスイートが赤くなると、サイドジョブがHealerをデバッグモードで実行し提案を生成します。その提案は人間の承認を要する別のプルリクエストに入り、メインブランチに自動的に流れてはいけません。レビュー中のビルドは赤のままで、人間が決定するまでデプロイを阻止し続けます。こうして自己修復は、欠陥リリースを阻止する品質ゲートを弱めることなく保守を加速します。",
      ),
      IMG(
        frame(`
<text x="24" y="34" fill="#f8fafc" font-size="15" font-weight="800">VỊ TRÍ HEAL TRONG PIPELINE / HEAL POSITION IN PIPELINE</text>
<rect x="24" y="60" width="140" height="48" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="40" y="82" fill="#e0f2fe" font-weight="700">PR mở</text><text x="40" y="99" fill="#93c5fd" font-size="11">chạy E2E gate</text>
<rect x="200" y="60" width="140" height="48" rx="8" fill="#7c2d12" stroke="#fb923c"/><text x="216" y="82" fill="#ffedd5" font-weight="700">E2E đỏ</text><text x="216" y="99" fill="#fdba74" font-size="11">gate CHẶN deploy</text>
<path d="M164 84 h34" stroke="#64748b" stroke-width="2" marker-end="url(#arB3)"/>
<rect x="376" y="30" width="240" height="42" rx="8" fill="#7f1d1d" stroke="#f87171"/><text x="392" y="52" fill="#fecaca" font-weight="700">Đường tới PROD vẫn ĐỎ (không heal)</text><text x="392" y="66" fill="#fca5a5" font-size="11">gate giữ nguyên tới khi người duyệt</text>
<rect x="376" y="90" width="240" height="42" rx="8" fill="#12315e" stroke="#38bdf8"/><text x="392" y="112" fill="#e0f2fe" font-weight="700">Job phụ: Healer sinh đề xuất</text><text x="392" y="126" fill="#93c5fd" font-size="11">ngoài đường tới prod</text>
<path d="M340 84 C360 70 360 51 376 51 M340 84 C360 98 360 111 376 111" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arB3)"/>
<rect x="200" y="150" width="200" height="44" rx="8" fill="#422006" stroke="#f59e0b"/><text x="216" y="172" fill="#fef3c7" font-weight="700">PR heal → người duyệt</text><text x="216" y="188" fill="#fcd34d" font-size="11">approve → merge · reject → bug</text>
<path d="M496 132 C450 145 430 148 400 158" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arB3)"/>
<text x="24" y="230" fill="#94a3b8" font-size="12">Heal LUÔN ở nhánh phụ; đường tới production không bao giờ được heal tự động.</text>
<defs><marker id="arB3" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#64748b"/></marker></defs>`),
        "Heal nằm ở nhánh phụ; đường tới production giữ đỏ tới khi người duyệt đề xuất.",
        "Healing sits on a side branch; the path to production stays red until a human approves the proposal.",
        "修復はサイドブランチに置かれ、本番への経路は人間が提案を承認するまで赤のままです。"
      ),
      P(
        "Một cấu hình vận hành tốt còn phân tầng theo mức rủi ro của test. Với test giao diện thứ yếu, có thể cho tác nhân đề xuất heal rộng rãi và review nhẹ nhàng. Với test luồng tiền, bảo mật và tuân thủ, tắt hẳn self-healing và bắt buộc con người xử lý mọi đỏ. Sự phân tầng này thừa nhận một thực tế: giá trị của heal tỉ lệ nghịch với mức nghiêm trọng của thứ nó chạm vào. Heal rất đáng dùng cho việc nhàm chán lặp lại như cập nhật locator sau khi đổi design system; nhưng càng gần lõi nghiệp vụ, càng nên nhường quyền quyết định cho con người.",
        "A good operational configuration also tiers by the test's risk level. For secondary UI tests, you can let the agent propose heals liberally with light review. For money-flow, security and compliance tests, disable self-healing entirely and require humans to handle every red. This tiering acknowledges a reality: the value of a heal is inversely proportional to the severity of what it touches. Healing is well worth it for boring repetitive work like updating locators after a design-system change; but the closer to the business core, the more the decision should be ceded to humans.",
        "良い運用構成は、テストのリスクレベルでも階層化します。二次的なUIテストでは、エージェントに修復を広く提案させ軽いレビューにできます。金銭フロー・セキュリティ・コンプライアンスのテストでは、自己修復を完全に無効化し、すべての赤を人間が処理するよう要求します。この階層化は現実を認めます。修復の価値は、それが触れるものの重大さに反比例します。修復は、デザインシステム変更後のロケーター更新のような退屈な反復作業には十分価値があります。しかし業務の核心に近いほど、判断は人間に譲るべきです。",
      ),
      TIP(
        "Đặt cờ per-test hoặc per-tag để bật/tắt heal (VD @no-heal cho luồng tiền/bảo mật). Chính sách heal rõ ràng ở mức test tránh tranh cãi từng lần và giúp tác nhân biết đâu là vùng cấm.",
        "Set a per-test or per-tag flag to enable/disable healing (e.g. @no-heal for money/security flows). A clear heal policy at the test level avoids case-by-case debate and tells the agent where the forbidden zones are.",
        "テストごと・タグごとのフラグで修復の有効・無効を設定します（例: 金銭・セキュリティフローに@no-heal）。テストレベルの明確な修復ポリシーは、都度の議論を避け、エージェントに禁止領域を伝えます。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Anti-pattern và bài học vận hành",
      en: "12. Anti-patterns and operational lessons",
      ja: "12. アンチパターンと運用の教訓",
    },
    blocks: [
      P(
        "Từ thực chiến, một số anti-pattern lặp lại khiến self-healing phản tác dụng. Thứ nhất là để tác nhân tối ưu cho 'test xanh' thay vì 'bất biến được kiểm chứng' — đây là gốc rễ của heal đè bug. Thứ hai là bật self-healing trên một suite thiếu oracle nghiệp vụ, khiến chẳng có gì chặn heal ẩu. Thứ ba là cho auto-merge PR heal, xoá cổng người. Thứ tư là dùng locator dựa CSS/xpath mong manh khiến tác nhân heal sai liên tục. Thứ năm là không đo lường, nên không bao giờ biết heal đang giúp hay đang âm thầm giấu bug. Mỗi anti-pattern đều có một guardrail tương ứng đã bàn ở trên.",
        "From the field, several anti-patterns recur that make self-healing backfire. First, letting the agent optimize for 'green test' instead of 'invariant verified' — this is the root of heal-over-bug. Second, enabling self-healing on a suite lacking business oracles, so nothing blocks careless heals. Third, allowing auto-merge of heal PRs, deleting the human gate. Fourth, using brittle CSS/xpath locators that make the agent heal wrong constantly. Fifth, not measuring, so you never know whether healing is helping or silently hiding bugs. Each anti-pattern has a corresponding guardrail discussed above.",
        "現場から、自己修復を逆効果にするいくつかのアンチパターンが繰り返し現れます。第一に、エージェントに「不変条件の検証」ではなく「緑のテスト」を最適化させること。これがバグ上修復の根源です。第二に、業務オラクルの欠けたスイートで自己修復を有効化し、雑な修復を何も阻止しないこと。第三に、修復PRの自動マージを許し、人間のゲートを削除すること。第四に、脆弱なCSS/xpathロケーターを使い、エージェントに絶えず誤って修復させること。第五に、測定せず、修復が役立っているかバグを静かに隠しているか決して分からないことです。各アンチパターンには上で議論した対応するガードレールがあります。",
      ),
      UL(
        [
          "Tối ưu 'test xanh' thay vì 'bất biến đúng' → neo oracle nghiệp vụ Healer không được sửa.",
          "Suite thiếu oracle → thêm assertion tiền/quyền/số lượng trước khi bật heal.",
          "Auto-merge PR heal → luôn qua human review gate, không ngoại lệ.",
          "Locator CSS/xpath mong manh → chuyển sang getByRole/getByLabel + data-testid.",
          "Không đo → theo dõi correctness, giờ tiết kiệm, và bugsSlippedByHeal = 0.",
        ],
        [
          "Optimizing 'green test' over 'correct invariant' → anchor business oracles the Healer may not edit.",
          "Suite lacking oracles → add money/permission/quantity assertions before enabling healing.",
          "Auto-merging heal PRs → always through a human review gate, no exceptions.",
          "Brittle CSS/xpath locators → migrate to getByRole/getByLabel + data-testid.",
          "No measurement → track correctness, hours saved, and bugsSlippedByHeal = 0.",
        ],
        [
          "「正しい不変条件」より「緑のテスト」を最適化 → Healerが編集できない業務オラクルに固定。",
          "オラクル欠如のスイート → 修復有効化前に金額・権限・数量のアサーションを追加。",
          "修復PRの自動マージ → 例外なく常にヒューマンレビューゲートを通す。",
          "脆弱なCSS/xpathロケーター → getByRole/getByLabel + data-testidに移行。",
          "測定なし → 正確率・節約時間・bugsSlippedByHeal = 0を追跡。",
        ]
      ),
      SCEN(
        "Tình huống: đội bật heal toàn cục rồi mất niềm tin vào toàn bộ suite",
        "Scenario: a team enables global healing and loses trust in the whole suite",
        "Một đội bật self-healing cho mọi test để giảm bảo trì, không phân tầng, không tách oracle. Ba tháng sau, họ nhận ra không còn tin bất kỳ lần xanh nào: mọi thất bại đã bị Healer 'chữa' im lặng, kể cả vài lỗi thật lọt production. Họ phải dừng self-healing, dựng lại oracle, gắn nhãn @no-heal cho luồng quan trọng, thêm human gate và đo lường. Bài học: self-healing chỉ an toàn khi triển khai có kỷ luật từ đầu, không phải bật đại rồi sửa sau.",
        "A team enabled self-healing for every test to cut maintenance, with no tiering, no oracle separation. Three months later they realized they no longer trusted any green: every failure had been silently 'healed', including a few real bugs that reached production. They had to stop self-healing, rebuild oracles, tag critical flows @no-heal, add a human gate and measurement. Lesson: self-healing is only safe when rolled out with discipline from the start, not switched on broadly and fixed later.",
        "シナリオ: チームがグローバル修復を有効化しスイート全体への信頼を失う",
        "あるチームは保守削減のため全テストに自己修復を有効化し、階層化もオラクル分離もしませんでした。3か月後、彼らはどの緑も信頼できないことに気づきました。すべての失敗がHealerに静かに「修復」され、本番に達した本物のバグも含まれていました。彼らは自己修復を止め、オラクルを再構築し、重要フローに@no-healを付け、人間ゲートと測定を追加せざるを得ませんでした。教訓: 自己修復は最初から規律を持って展開したときだけ安全で、広く有効化して後で直すものではありません。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: câu hỏi và chốt hạ",
      en: "13. Interview angle: questions and takeaways",
      ja: "13. 面接の観点: 質問と要点",
    },
    blocks: [
      P(
        "Self-healing là chủ đề phỏng vấn hiện đại phân loại rất rõ ứng viên. Người trả lời hời hợt sẽ khen self-healing 'giảm bảo trì' và dừng lại. Người có chiều sâu sẽ ngay lập tức nêu rủi ro heal đè bug và trình bày cả một hệ guardrail: tách oracle khỏi cơ chế, test.abort cho bất biến, errorContext để chẩn đoán, ARIA snapshot làm neo, human review gate, phân tầng theo rủi ro, và đo lường với chỉ số bugsSlippedByHeal bằng không. Thông điệp cần chốt là: giá trị của AI trong testing không nằm ở việc tự sửa nhiều nhất, mà ở việc sửa đúng thứ được phép sửa và biết dừng lại đúng lúc.",
        "Self-healing is a modern interview topic that sharply sorts candidates. A shallow answerer praises self-healing for 'reducing maintenance' and stops there. A deep one immediately raises the heal-over-bug risk and lays out a whole guardrail system: separating oracle from mechanics, test.abort for invariants, errorContext for diagnosis, ARIA snapshots as anchors, a human review gate, risk-based tiering, and measurement with a zero bugsSlippedByHeal metric. The takeaway to land is: the value of AI in testing lies not in fixing the most, but in fixing only what is allowed to be fixed and knowing when to stop.",
        "自己修復は候補者を鋭く選別する現代的な面接トピックです。浅い回答者は自己修復を「保守削減」と褒めてそこで止まります。深い回答者は直ちにバグ上修復のリスクを挙げ、ガードレールシステム全体を示します。オラクルと機構の分離、不変条件のためのtest.abort、診断のためのerrorContext、アンカーとしてのARIAスナップショット、ヒューマンレビューゲート、リスクベースの階層化、bugsSlippedByHealゼロ指標での測定です。伝えるべき要点は、テストにおけるAIの価値は最も多く修正することではなく、修正が許されるものだけを修正し、いつ止めるべきかを知ることにある、です。",
      ),
      QA(
        "Rủi ro lớn nhất của self-healing test là gì và bạn ngăn nó thế nào?",
        "What is the biggest risk of self-healing tests and how do you prevent it?",
        "Rủi ro lớn nhất là heal đè lên bug thật: tác nhân sửa test cho khớp trạng thái hiện tại của app, khiến test xanh kể cả khi app đã hỏng, làm mất chính tín hiệu test sinh ra để bắt. Cách ngăn là một hệ guardrail nhiều lớp: tách oracle nghiệp vụ (tiền, quyền, số lượng) khỏi cơ chế và cấm Healer đụng oracle; dùng test.abort cho bất biến an toàn để những đỏ đó không bao giờ được heal; làm giàu thất bại bằng errorContext để phân biệt lỗi tầng test với tầng nghiệp vụ; và luôn có human review gate — Healer chỉ đề xuất, người mới duyệt.",
        "The biggest risk is healing over a real bug: the agent fixes the test to match the app's current state, making the test green even when the app is broken, losing the very signal the test exists to catch. Prevention is a layered guardrail system: separate business oracles (money, permissions, quantities) from mechanics and forbid the Healer from touching oracles; use test.abort for safety invariants so those reds are never healed; enrich failures with errorContext to distinguish test-layer from business-layer errors; and always have a human review gate — the Healer only proposes, a human approves.",
        "最大のリスクは本物のバグ上に修復することです。エージェントがアプリの現在の状態に合わせてテストを修正し、アプリが壊れていてもテストを緑にし、テストが捉えるべき信号自体を失います。防止は多層のガードレールシステムです。業務オラクル（金額・権限・数量）を機構から分離しHealerがオラクルに触れるのを禁止すること、安全性不変条件にtest.abortを使いそれらの赤を決して修復させないこと、errorContextで失敗を豊かにしテスト層と業務層のエラーを区別すること、そして常にヒューマンレビューゲートを持つこと、Healerは提案するだけで人間が承認します。",
      ),
      QA(
        "test.abort() khác gì một assertion fail thông thường trong bối cảnh self-healing?",
        "How does test.abort() differ from an ordinary failed assertion in the self-healing context?",
        "Một assertion fail thông thường chỉ đánh dấu test đỏ và trong hệ có self-healing, tác nhân có thể coi đó là ứng viên để thử heal. test.abort() gửi tín hiệu ngữ nghĩa mạnh hơn: 'điều kiện tiên quyết hoặc bất biến hệ thống bị vi phạm, dừng ngay, không có gì đáng heal'. Ta dùng nó cho các bất biến an toàn và tuân thủ như tiền không bảo toàn, tồn kho âm, rò rỉ tenant. Chính sách heal phải được cấu hình để không bao giờ đụng vào test kết thúc bằng abort, và pipeline coi abort là tín hiệu chặn deploy mạnh, buộc con người vào cuộc.",
        "An ordinary failed assertion merely marks the test red, and in a self-healing setup the agent may treat it as a candidate to attempt healing. test.abort() sends a stronger semantic signal: 'a precondition or system invariant is violated, stop now, nothing is worth healing'. We use it for safety and compliance invariants like unconserved money, negative stock, tenant leakage. The heal policy must be configured to never touch tests ending in abort, and the pipeline treats abort as a strong deploy-blocking signal that forces a human into the loop.",
        "通常の失敗アサーションは単にテストを赤くマークし、自己修復構成ではエージェントが修復を試みる候補として扱いうります。test.abort()はより強い意味的信号を送ります。「前提条件かシステム不変条件が違反された、直ちに停止、修復する価値はない」です。金額の非保存、負の在庫、テナント漏洩のような安全性・コンプライアンス不変条件に使います。修復ポリシーはabortで終わるテストに決して触れないよう設定し、パイプラインはabortを人間をループに強制する強いデプロイ阻止信号として扱います。",
      ),
      QA(
        "Khi nào bạn TẮT hẳn self-healing cho một nhóm test?",
        "When do you completely DISABLE self-healing for a group of tests?",
        "Tắt hẳn self-healing cho các nhóm test mà một thay đổi khiến chúng đỏ gần như luôn là tín hiệu nghiệp vụ cần con người: luồng tiền và thanh toán, phân quyền và bảo mật (RBAC), tuân thủ và audit chứa bằng chứng pháp lý, và các test có oracle bất biến kết thúc bằng test.abort. Lý do chung là ở những vùng này, 'test đỏ vì UI đổi' và 'test đỏ vì lỗ hổng vừa mở' trông giống nhau, và cái giá của heal nhầm là quá lớn. Tôi gắn nhãn @no-heal cho các test này để chính sách rõ ràng ở mức code, không phụ thuộc trí nhớ.",
        "I completely disable self-healing for groups where a change reddening them is almost always a business signal needing a human: money and checkout flows, authorization and security (RBAC), compliance and audit holding legal evidence, and tests with invariant oracles that end in test.abort. The common reason is that in these areas 'red because the UI changed' and 'red because a hole just opened' look alike, and the cost of a wrong heal is too high. I tag these tests @no-heal so the policy is explicit at the code level, not reliant on memory.",
        "変更で赤くなることがほぼ常に人間を要する業務信号であるグループには、自己修復を完全に無効化します。金銭・決済フロー、認可・セキュリティ（RBAC）、法的証拠を持つコンプライアンス・監査、そしてtest.abortで終わる不変条件オラクル付きテストです。共通の理由は、これらの領域では「UI変更で赤」と「穴が開いて赤」が似ており、誤修復の代償が大きすぎることです。これらのテストに@no-healを付け、ポリシーを記憶に頼らずコードレベルで明示します。",
      ),
      NOTE(
        "Thông điệp mang vào phỏng vấn: self-healing giỏi không phải sửa được nhiều nhất, mà là biết đâu là vùng được phép sửa và biết dừng khi bất biến nghiệp vụ bị đe doạ.",
        "Message to bring to interviews: great self-healing is not fixing the most, but knowing which zone may be fixed and knowing to stop when a business invariant is threatened.",
        "面接に持ち込むメッセージ: 優れた自己修復とは最も多く修正することではなく、どの領域を修正してよいかを知り、業務不変条件が脅かされたとき止めることを知ることです。",
      ),
    ],
  },
];

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-self-healing-guardrails",
  cover: coverB,
  tags: tags("nangcao", "saas", "playwright", "aitesting", "advanced", "experience"),
  title: {
    vi: "Self-healing tests với Healer Agent + guardrails",
    en: "Self-healing tests with the Healer Agent + guardrails",
    ja: "Healerエージェント＋ガードレールによる自己修復テスト",
  },
  summary: {
    vi: "Healer agent tự vá locator/test gãy, nhưng rủi ro lớn nhất là heal đè lên bug thật. Bài dựng hệ guardrail: tách oracle nghiệp vụ khỏi cơ chế, test.abort() dừng khẩn khi bất biến vỡ, errorContext làm giàu thất bại, ARIA snapshot có bounding box, human review gate, khi nào KHÔNG auto-heal, đo lường với bugsSlippedByHeal=0. Kèm góc phỏng vấn.",
    en: "The Healer agent auto-patches broken locators/tests, but the biggest risk is healing over a real bug. This builds a guardrail system: separating business oracles from mechanics, test.abort() emergency stop on broken invariants, errorContext for richer failures, ARIA snapshots with bounding boxes, a human review gate, when NOT to auto-heal, measurement with bugsSlippedByHeal=0. With an interview angle.",
    ja: "Healerエージェントは壊れたロケーター・テストを自動修正しますが、最大のリスクは本物のバグ上に修復することです。本記事はガードレールシステムを構築します。業務オラクルの機構からの分離、不変条件が壊れたときのtest.abort()緊急停止、errorContextによる豊かな失敗、バウンディングボックス付きARIAスナップショット、ヒューマンレビューゲート、自動修復すべきでないとき、bugsSlippedByHeal=0での測定。面接の観点付き。",
  },
  pages: buildDoc(pagesB),
};

export const PWLATEST_06 = [artA, artB];
