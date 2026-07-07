// doc_aiagent_03.mjs — AI Agent Testing 03 (Self-healing locators + AI visual regression)
// Trilingual (vi/en/ja) DEEP QA docs cho CyberSoft Tester. categorySlug = "ai-agent-testing".
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia03a", domain: "ecommerce", kind: "congnghe", label: "SELF-HEALING" });
const coverB = makeThumb({ id: "aia03b", domain: "ecommerce", kind: "nangcao", label: "AI VISUAL DIFF" });

/* =========================================================================
 * ARTICLE A — Self-healing locators with AI (controlled)
 * ========================================================================= */
const pagesA = [];

/* =========================================================================
 * ARTICLE B — AI-powered visual regression & semantic diffing
 * ========================================================================= */
const pagesB = [];

pagesA.push({
  heading: {
    vi: "1. Bối cảnh: vì sao locator gãy khi giao diện thay đổi",
    en: "1. Context: why locators break when the UI changes",
    ja: "1. 背景：UI変更でロケーターが壊れる理由",
  },
  blocks: [
    P(
      "Trên một sàn thương mại điện tử, đội QA duy trì hàng trăm kịch bản end-to-end phủ luồng tìm kiếm, thêm giỏ hàng, áp mã giảm giá và thanh toán. Mỗi lần đội frontend đổi cấu trúc DOM — thêm một thẻ bọc, đổi lớp CSS sinh tự động, hay chuyển nút sang component mới — hàng loạt locator dựa trên XPath hoặc lớp CSS gãy đồng loạt. Kết quả là pipeline đỏ rực dù nghiệp vụ không hề thay đổi. Đây chính là bài toán mà locator tự chữa lành (self-healing) hướng tới: giữ cho bộ kiểm thử bám vào ý nghĩa của phần tử thay vì bám vào chi tiết cấu trúc dễ vỡ.",
      "On an e-commerce marketplace, a QA team maintains hundreds of end-to-end scenarios covering search, add-to-cart, coupon application and checkout. Every time the frontend team reshapes the DOM — adds a wrapper, changes an auto-generated CSS class, or moves a button into a new component — a wave of XPath- or class-based locators break at once. The pipeline turns red even though the business behavior did not change. This is exactly the problem self-healing locators target: keep the suite anchored to the meaning of an element rather than to fragile structural details.",
      "ECマーケットプレイスでは、QAチームは検索、カート追加、クーポン適用、決済をカバーする数百のエンドツーエンドシナリオを維持します。フロントエンドチームがDOMを変えるたびに（ラッパーの追加、自動生成CSSクラスの変更、ボタンの新コンポーネントへの移動など）、XPathやクラスに依存するロケーターが一斉に壊れます。業務の振る舞いが変わっていなくてもパイプラインが赤くなります。これこそ自己修復ロケーターが狙う問題です。壊れやすい構造の詳細ではなく、要素の意味にスイートを固定します。"
    ),
    P(
      "Locator gãy có hai loại hoàn toàn khác nhau, và phân biệt chúng là cốt lõi của toàn bài. Loại thứ nhất là gãy do tái cấu trúc: phần tử vẫn tồn tại, vẫn cùng vai trò và nhãn, chỉ khác đường đi tới nó — đây là lúc self-healing thực sự có ích. Loại thứ hai là gãy do lỗi thật: nút 'Đặt hàng' biến mất vì một bug logic, hoặc bị disable sai. Nếu AI 'chữa lành' bằng cách nhảy sang một nút khác gần giống, nó sẽ che mất chính lỗi mà bài kiểm thử sinh ra để bắt. Vì vậy oracle phải đặt lên trên: bài test khẳng định bất biến nghiệp vụ, còn cơ chế heal chỉ được phép thay đổi cách tìm phần tử, tuyệt đối không thay đổi điều được khẳng định.",
      "A broken locator comes in two fundamentally different flavors, and telling them apart is the heart of this article. The first is a refactor break: the element still exists with the same role and label, only the path to it changed — this is where self-healing genuinely helps. The second is a real-bug break: the 'Place order' button vanished because of a logic bug, or is wrongly disabled. If the AI 'heals' by jumping to a similar-looking button, it hides the very defect the test was written to catch. Hence the oracle comes first: the test asserts a business invariant, and the healing mechanism may only change how an element is found — never what is asserted.",
      "壊れたロケーターには根本的に異なる2種類があり、その区別が本稿の核心です。第一はリファクタリングによる破損：要素は同じ役割とラベルで存在し、そこへの経路だけが変わりました。ここで自己修復が真に役立ちます。第二は本物のバグによる破損：ロジックバグで「注文する」ボタンが消えたり、誤って無効化されたりします。AIが似たボタンへ飛んで「修復」すると、テストが捉えるべき欠陥そのものを隠します。だからオラクルが最優先です。テストは業務の不変条件をアサーションし、修復機構は要素の見つけ方だけを変えてよく、アサーション対象を決して変えてはなりません。"
    ),
    IMG(
      `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="240" rx="12" fill="#3b0764"/>
<text x="320" y="34" text-anchor="middle" fill="#f5d0fe" font-size="16" font-weight="800">Locator gãy: hai nhánh khác nhau</text>
<rect x="40" y="70" width="250" height="120" rx="10" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="165" y="98" text-anchor="middle" fill="#dcfce7" font-size="14" font-weight="800">Refactor break</text>
<text x="165" y="122" text-anchor="middle" fill="#bbf7d0" font-size="11">phần tử còn đó, đổi đường đi</text>
<text x="165" y="142" text-anchor="middle" fill="#bbf7d0" font-size="11">role/label giữ nguyên</text>
<text x="165" y="168" text-anchor="middle" fill="#86efac" font-size="12" font-weight="700">→ self-heal an toàn</text>
<rect x="350" y="70" width="250" height="120" rx="10" fill="#7f1d1d" stroke="#fca5a5" stroke-width="2"/>
<text x="475" y="98" text-anchor="middle" fill="#fee2e2" font-size="14" font-weight="800">Real-bug break</text>
<text x="475" y="122" text-anchor="middle" fill="#fecaca" font-size="11">phần tử mất / disable sai</text>
<text x="475" y="142" text-anchor="middle" fill="#fecaca" font-size="11">nghiệp vụ đã hỏng</text>
<text x="475" y="168" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="700">→ PHẢI fail, đừng heal</text>
<text x="320" y="222" text-anchor="middle" fill="#e9d5ff" font-size="12">Oracle nghiệp vụ quyết định nhánh nào là hợp lệ để chữa</text>
</svg>`,
      "Hai nhánh locator gãy: chỉ nhánh tái cấu trúc mới được phép chữa.",
      "Two branches of a broken locator: only the refactor branch may be healed.",
      "壊れたロケーターの2分岐：リファクタリング側だけ修復してよい。"
    ),
    NOTE(
      "Playwright khuyến nghị dùng locator theo vai trò (getByRole), theo nhãn (getByLabel), theo text hoặc data-testid — vốn ổn định hơn XPath. Self-healing là lớp bổ sung, không thay thế thói quen chọn locator tốt.",
      "Playwright recommends role-based (getByRole), label-based (getByLabel), text or data-testid locators — inherently more stable than XPath. Self-healing is an extra layer, not a substitute for choosing good locators.",
      "Playwrightは役割ベース（getByRole）、ラベルベース（getByLabel）、テキスト、data-testidのロケーターを推奨します。XPathより本質的に安定しています。自己修復は追加層であり、良いロケーター選択の代替ではありません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Neo locator vào ý nghĩa, không vào cấu trúc",
    en: "2. Anchor locators to meaning, not structure",
    ja: "2. ロケーターを構造ではなく意味に固定する",
  },
  blocks: [
    P(
      "Trước khi bàn tới AI, phải thừa nhận rằng phần lớn locator gãy đến từ lựa chọn tồi ngay từ đầu. Một XPath tuyệt đối kiểu /html/body/div[3]/div/button[2] gãy chỉ vì thêm một div bọc. Ngược lại, getByRole('button', { name: 'Đặt hàng' }) bám vào accessibility tree — thứ phản ánh ý nghĩa mà người dùng và trình đọc màn hình cảm nhận. Khi bạn neo vào vai trò và tên có thể truy cập (accessible name), locator sống sót qua hầu hết đợt tái cấu trúc thuần túy trình bày. Self-healing bằng AI nên được xem là lưới an toàn cho phần còn lại, chứ không phải cái cớ để tiếp tục viết selector giòn.",
      "Before invoking AI, we must admit most broken locators come from poor choices in the first place. An absolute XPath like /html/body/div[3]/div/button[2] breaks just from adding a wrapper div. In contrast, getByRole('button', { name: 'Place order' }) anchors to the accessibility tree — which reflects the meaning users and screen readers perceive. When you anchor to role and accessible name, the locator survives most purely presentational refactors. AI self-healing should be seen as a safety net for the remainder, not an excuse to keep writing brittle selectors.",
      "AIを持ち出す前に、壊れたロケーターの大半はそもそも選択が悪いことに起因すると認めるべきです。/html/body/div[3]/div/button[2]のような絶対XPathは、ラッパーdivを追加しただけで壊れます。対照的にgetByRole('button', { name: '注文する' })はアクセシビリティツリーに固定します。これはユーザーとスクリーンリーダーが知覚する意味を反映します。役割とアクセシブル名に固定すれば、ロケーターは純粋な見た目のリファクタリングの大半を生き延びます。AI自己修復は残りの部分の安全網と見なすべきで、脆いセレクターを書き続ける言い訳ではありません。"
    ),
    P(
      "Trên sàn thương mại điện tử của chúng ta, một quy ước tốt là gắn data-testid cho các phần tử nghiệp vụ then chốt: nút thanh toán, ô nhập mã giảm giá, tổng tiền giỏ hàng. data-testid tách rời khỏi lớp trình bày, không đổi khi thiết kế thay đổi, và cho AI một mỏ neo rõ ràng để suy luận. Kết hợp getByRole cho phần tử tương tác chuẩn và data-testid cho phần tử nghiệp vụ đặc thù, bạn giảm mạnh số lần cần tới heal ngay từ đầu — và mỗi lần heal thật sự xảy ra sẽ đáng chú ý hơn, dễ điều tra hơn.",
      "On our marketplace, a good convention is to attach data-testid to key business elements: the checkout button, the coupon input, the cart total. data-testid is decoupled from the presentation layer, unchanged when the design shifts, and gives the AI a clear anchor to reason from. Combining getByRole for standard interactive elements and data-testid for domain-specific ones sharply cuts how often you need healing in the first place — and each heal that does happen becomes more notable and easier to investigate.",
      "私たちのマーケットプレイスでは、主要な業務要素にdata-testidを付けるのが良い慣習です。決済ボタン、クーポン入力欄、カート合計などです。data-testidは表示層から切り離され、デザインが変わっても変わらず、AIに推論の明確な足場を与えます。標準的な操作要素にはgetByRole、ドメイン固有の要素にはdata-testidを組み合わせると、そもそも修復が必要になる頻度が大幅に下がり、実際に起こる各修復がより目立ち調査しやすくなります。"
    ),
    CODE(
      "ts",
      `// locators.ts — neo vào ý nghĩa: role / label / testid, KHÔNG dùng XPath tuyệt đối
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Ổn định: bám accessibility tree (role + accessible name)
  placeOrder(): Locator {
    return this.page.getByRole('button', { name: /đặt hàng|place order/i });
  }
  // Ổn định: business testid tách khỏi lớp trình bày
  couponInput(): Locator {
    return this.page.getByTestId('checkout-coupon-input');
  }
  cartTotal(): Locator {
    return this.page.getByTestId('cart-total');
  }
}

// ❌ Đừng làm: XPath tuyệt đối gãy khi thêm 1 div bọc
// page.locator('xpath=/html/body/div[3]/div/button[2]')`
    ),
    TIP(
      "Đặt data-testid cho phần tử có ý nghĩa nghiệp vụ, không phải cho mọi thẻ. Quá nhiều testid làm markup nhiễu và khó thấy điều gì thực sự quan trọng với QA.",
      "Add data-testid to business-meaningful elements, not to every tag. Too many testids clutter markup and obscure what actually matters to QA.",
      "data-testidは業務的に意味のある要素に付け、すべてのタグには付けないでください。testidが多すぎるとマークアップが雑然とし、QAにとって本当に重要なものが見えなくなります。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. AI đề xuất locator thay thế từ accessibility tree và DOM snapshot",
    en: "3. AI proposing alternative locators from the a11y tree and DOM snapshot",
    ja: "3. AIがアクセシビリティツリーとDOMスナップショットから代替を提案する",
  },
  blocks: [
    P(
      "Khi một locator không tìm thấy phần tử, cơ chế self-healing bắt đầu bằng việc chụp một snapshot của trạng thái trang: accessibility tree (role, tên, trạng thái) kèm DOM rút gọn. Từ v1.60, ARIA snapshot của Playwright còn kèm bounding box — toạ độ layout — nên AI có cả ngữ nghĩa lẫn vị trí không gian để suy luận. AI sẽ so khớp mô tả gốc của phần tử (ví dụ 'nút submit tên Đặt hàng, gần ô tổng tiền') với các ứng viên trong snapshot, rồi đề xuất một hoặc vài locator thay thế xếp theo độ phù hợp. Điểm quan trọng: đầu vào là cây ngữ nghĩa, không phải ảnh pixel — nên đề xuất bám vào ý nghĩa phần tử.",
      "When a locator fails to find its element, the self-healing mechanism starts by capturing a snapshot of the page state: the accessibility tree (role, name, state) plus a reduced DOM. Since v1.60, Playwright's ARIA snapshot also includes bounding boxes — layout coordinates — so the AI has both semantics and spatial position to reason with. The AI matches the element's original description (e.g. 'submit button named Place order, near the total field') against candidates in the snapshot, then proposes one or several alternative locators ranked by fit. Crucially, the input is a semantic tree, not a pixel image — so proposals stay tied to element meaning.",
      "ロケーターが要素を見つけられないとき、自己修復機構はまずページ状態のスナップショットを取得します。アクセシビリティツリー（役割・名前・状態）と縮約DOMです。v1.60以降、PlaywrightのARIAスナップショットはバウンディングボックス（レイアウト座標）も含むため、AIは意味と空間位置の両方で推論できます。AIは要素の元の記述（例：「合計欄の近くにある、注文するという名前の送信ボタン」）をスナップショット内の候補と照合し、適合度順に並べた1つまたは複数の代替ロケーターを提案します。重要なのは、入力がピクセル画像ではなく意味ツリーである点で、提案は要素の意味に結びついたままです。"
    ),
    P(
      "Có nhiều tín hiệu để chấm điểm ứng viên: khớp vai trò (một button không thể chữa thành một link), khớp tên có thể truy cập, khoảng cách chuỗi giữa nhãn cũ và mới, độ gần về vị trí layout, và ngữ cảnh cha (cùng nằm trong form thanh toán). Một hệ thống nghiêm túc kết hợp các tín hiệu này thành một điểm tin cậy duy nhất, thay vì mù quáng lấy phần tử đầu tiên trông giống. Nếu vai trò không khớp, điểm phải bằng không — vì chữa một button thành link gần như luôn là dấu hiệu của lỗi thật, không phải tái cấu trúc.",
      "Several signals score candidates: role match (a button must not heal into a link), accessible-name match, string distance between old and new labels, layout proximity, and parent context (both inside the checkout form). A serious system combines these into a single confidence score instead of blindly grabbing the first similar-looking element. If the role does not match, the score must be zero — because healing a button into a link is almost always a sign of a real bug, not a refactor.",
      "候補を採点する信号はいくつかあります。役割の一致（ボタンをリンクに修復してはならない）、アクセシブル名の一致、旧新ラベル間の文字列距離、レイアウトの近さ、親コンテキスト（両方とも決済フォーム内）です。まじめなシステムはこれらを単一の信頼度スコアに統合し、似た最初の要素を盲目的につかむことはしません。役割が一致しないならスコアはゼロであるべきです。ボタンをリンクに修復するのは、リファクタリングではなくほぼ常に本物のバグの兆候だからです。"
    ),
    IMG(
      `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="260" rx="12" fill="#4a044e"/>
<text x="320" y="32" text-anchor="middle" fill="#f5d0fe" font-size="16" font-weight="800">Luồng đề xuất locator thay thế</text>
<rect x="30" y="60" width="140" height="60" rx="10" fill="#701a75" stroke="#f0abfc" stroke-width="2"/>
<text x="100" y="88" text-anchor="middle" fill="#fae8ff" font-size="12" font-weight="800">Locator gãy</text>
<text x="100" y="106" text-anchor="middle" fill="#f5d0fe" font-size="10">not found</text>
<rect x="200" y="60" width="150" height="60" rx="10" fill="#701a75" stroke="#f0abfc" stroke-width="2"/>
<text x="275" y="84" text-anchor="middle" fill="#fae8ff" font-size="12" font-weight="800">Snapshot</text>
<text x="275" y="102" text-anchor="middle" fill="#f5d0fe" font-size="10">a11y tree + DOM + bbox</text>
<rect x="380" y="60" width="150" height="60" rx="10" fill="#701a75" stroke="#f0abfc" stroke-width="2"/>
<text x="455" y="84" text-anchor="middle" fill="#fae8ff" font-size="12" font-weight="800">AI matcher</text>
<text x="455" y="102" text-anchor="middle" fill="#f5d0fe" font-size="10">role/name/pos</text>
<rect x="200" y="160" width="330" height="70" rx="10" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="365" y="186" text-anchor="middle" fill="#dcfce7" font-size="12" font-weight="800">Ứng viên xếp hạng theo confidence</text>
<text x="365" y="208" text-anchor="middle" fill="#bbf7d0" font-size="11">getByTestId 0.94 · getByRole 0.71 · text 0.40</text>
<path d="M170 90 L200 90" stroke="#f0abfc" stroke-width="3"/>
<path d="M350 90 L380 90" stroke="#f0abfc" stroke-width="3"/>
<path d="M455 120 L400 160" stroke="#86efac" stroke-width="3"/>
</svg>`,
      "Từ locator gãy tới danh sách ứng viên xếp theo điểm tin cậy.",
      "From a broken locator to a confidence-ranked candidate list.",
      "壊れたロケーターから信頼度順の候補リストまで。"
    ),
    WARN(
      "Nếu vai trò (role) của ứng viên khác vai trò gốc, đừng bao giờ tự động chữa. Button → link, input → div thường là triệu chứng của lỗi render hoặc lỗi logic, không phải tái cấu trúc lành tính.",
      "If a candidate's role differs from the original, never auto-heal. Button → link, input → div is usually a symptom of a render or logic bug, not a benign refactor.",
      "候補の役割が元と異なる場合、決して自動修復しないでください。ボタン→リンク、入力→divは、良性のリファクタリングではなくレンダーやロジックのバグの兆候であることが多いです。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Chấm điểm tin cậy và ngưỡng quyết định",
    en: "4. Confidence scoring and the decision threshold",
    ja: "4. 信頼度スコアリングと判定しきい値",
  },
  blocks: [
    P(
      "Điểm tin cậy chỉ hữu ích nếu gắn với một chính sách quyết định rõ ràng. Một mô hình ba mức thực dụng: trên ngưỡng cao (ví dụ 0.9) và trùng vai trò thì cho phép heal nhưng vẫn ghi log; trong vùng xám (0.6–0.9) thì đánh dấu để con người xem lại, không tự chữa trong nhánh chính; dưới ngưỡng thấp thì để test fail như bình thường vì nhiều khả năng là lỗi thật. Ngưỡng không phải hằng số vũ trụ — bạn hiệu chỉnh nó dựa trên dữ liệu lịch sử: bao nhiêu lần heal về sau bị xác nhận là đúng, bao nhiêu lần là che lỗi.",
      "A confidence score is only useful when tied to a clear decision policy. A pragmatic three-tier model: above a high threshold (say 0.9) with a matching role, allow the heal but still log it; in the gray zone (0.6–0.9), flag for human review and do not auto-heal on the main branch; below a low threshold, let the test fail as usual because it is most likely a real bug. The threshold is no cosmic constant — you calibrate it from historical data: how many heals were later confirmed correct, how many masked a defect.",
      "信頼度スコアは、明確な判定ポリシーに結び付いて初めて有用です。実用的な3段階モデル：高いしきい値（例0.9）以上で役割が一致すれば修復を許可するが記録は残す。グレーゾーン（0.6〜0.9）では人間のレビューに回し、メインブランチでは自動修復しない。低いしきい値未満では通常どおりテストを失敗させる。本物のバグである可能性が高いからです。しきい値は宇宙的な定数ではありません。履歴データから較正します。後で正しいと確認された修復が何件、欠陥を隠した修復が何件か、です。"
    ),
    P(
      "Một cạm bẫy phổ biến là để ngưỡng quá thấp vì áp lực giữ pipeline xanh. Khi đó self-healing biến thành máy che lỗi: mọi thứ vẫn 'pass' còn khách hàng gặp bug trong production. Nguyên tắc vàng là ưu tiên báo động giả thà hơn bỏ sót lỗi thật. Trong kiểm thử, một test fail sai còn sửa được trong vài phút; một lỗi lọt lưới ra production có thể mất doanh thu và niềm tin. Vì vậy ngưỡng nên nghiêng về phía thận trọng, và mọi heal đều phải để lại dấu vết cho con người kiểm chứng.",
      "A common trap is setting the threshold too low under pressure to keep the pipeline green. Then self-healing becomes a bug-masking machine: everything still 'passes' while customers hit bugs in production. The golden rule is to prefer a false alarm over missing a real defect. In testing, a wrongly failing test is fixable in minutes; a defect that leaks to production can cost revenue and trust. So the threshold should lean conservative, and every heal must leave a trail for a human to verify.",
      "よくある罠は、パイプラインを緑に保つ圧力の下でしきい値を低くしすぎることです。そうなると自己修復はバグ隠し装置になります。すべてが「合格」のまま、顧客は本番でバグに遭遇します。黄金律は、本物の欠陥を見逃すより偽警報を選ぶことです。テストでは、誤って失敗するテストは数分で直せますが、本番に漏れた欠陥は収益と信頼を損ないます。だからしきい値は保守的に寄せ、すべての修復は人間が検証するための痕跡を残すべきです。"
    ),
    CODE(
      "ts",
      `// heal-policy.ts — biến điểm tin cậy thành quyết định, oracle-first
export type HealDecision = 'auto' | 'review' | 'fail';

export function decideHeal(c: {
  confidence: number;         // 0..1
  roleMatches: boolean;       // vai trò gốc == ứng viên?
  nameSimilarity: number;     // 0..1 accessible name
}): HealDecision {
  // Vai trò khác => gần như luôn là lỗi thật, đừng chữa
  if (!c.roleMatches) return 'fail';
  if (c.confidence >= 0.9 && c.nameSimilarity >= 0.8) return 'auto';
  if (c.confidence >= 0.6) return 'review';        // vùng xám -> người xem
  return 'fail';                                    // thà báo động giả còn hơn che lỗi
}`
    ),
    QA(
      "Vì sao không đặt ngưỡng heal thật thấp cho pipeline luôn xanh?",
      "Why not set the heal threshold very low so the pipeline stays green?",
      "Ngưỡng thấp biến self-healing thành máy che lỗi: test 'pass' nhưng bug lọt ra production. Trong kiểm thử, một fail sai sửa trong vài phút; một lỗi lọt lưới có thể mất doanh thu. Nguyên tắc là thà báo động giả hơn bỏ sót lỗi thật, nên ngưỡng phải nghiêng về thận trọng và mọi heal đều được log để review.",
      "A low threshold turns self-healing into a bug-masking machine: tests 'pass' but bugs leak to production. In testing, a wrong fail is fixable in minutes; a leaked defect can cost revenue. The rule is to prefer a false alarm over missing a real bug, so the threshold must lean conservative and every heal is logged for review.",
      "ヒールしきい値をとても低く設定してパイプラインを緑に保たないのはなぜですか？",
      "低いしきい値は自己修復をバグ隠し装置に変えます。テストは「合格」しますがバグは本番に漏れます。テストでは誤った失敗は数分で直せますが、漏れた欠陥は収益を損ないます。原則は本物のバグを見逃すより偽警報を選ぶことなので、しきい値は保守的に寄せ、すべての修復はレビュー用に記録します。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "5. Nguy cơ lớn nhất: âm thầm che lỗi thật",
    en: "5. The biggest risk: silently masking real bugs",
    ja: "5. 最大のリスク：本物のバグを黙って隠す",
  },
  blocks: [
    P(
      "Hãy hình dung một tình huống điển hình trên sàn: đợt deploy mới vô tình khiến nút 'Áp dụng mã giảm giá' không còn kích hoạt hàm submit — một lỗi thật, khách không thể dùng coupon. Locator gốc getByTestId('apply-coupon') vẫn tìm thấy nút, nhưng nếu bug là nút bị đổi testid thành apply-coupon-v2, một hệ self-heal ngây thơ sẽ nhảy sang nút mới và test vẫn xanh. Vấn đề: bạn vừa che mất một lỗi hồi quy. Test được sinh ra để bảo vệ luồng coupon giờ lại bảo vệ chính cái bug. Đây là kịch bản tệ nhất và là lý do self-healing phải được kiểm soát chặt.",
      "Picture a classic marketplace situation: a new deploy accidentally makes the 'Apply coupon' button stop triggering the submit handler — a real bug, customers cannot use coupons. The original getByTestId('apply-coupon') still finds the button, but if the bug renamed the testid to apply-coupon-v2, a naive self-heal will jump to the new button and the test stays green. The problem: you just masked a regression. The test written to protect the coupon flow now protects the very bug. This is the worst case and the reason self-healing must be tightly controlled.",
      "マーケットプレイスの典型的な状況を想像してください。新しいデプロイで「クーポン適用」ボタンが送信ハンドラーを呼ばなくなりました。本物のバグで、顧客はクーポンを使えません。元のgetByTestId('apply-coupon')はまだボタンを見つけますが、バグでtestidがapply-coupon-v2に変わっていたら、素朴な自己修復は新ボタンへ飛び、テストは緑のままです。問題は、回帰を隠したことです。クーポンフローを守るために書かれたテストが、今やそのバグ自体を守っています。これが最悪のケースで、自己修復を厳しく管理すべき理由です。"
    ),
    P(
      "Cách phòng thủ mạnh nhất không nằm ở locator mà ở oracle. Nếu bài test không dừng ở 'bấm được nút' mà đi tiếp tới 'tổng tiền giảm đúng số tiền coupon', thì dù có heal locator, bất biến nghiệp vụ vẫn bắt được lỗi: coupon không áp dụng thì tổng tiền không đổi, và assertion sẽ fail. Nói cách khác, self-healing an toàn khi và chỉ khi bài test có oracle mạnh phía sau. Locator chỉ là cách chạm tới phần tử; điều bạn khẳng định về hệ quả nghiệp vụ mới là lá chắn thật. Một suite phụ thuộc vào việc 'phần tử tồn tại' để bắt lỗi thì self-healing sẽ vô hiệu hoá nó.",
      "The strongest defense is not in the locator but in the oracle. If the test does not stop at 'the button was clickable' but continues to 'the total dropped by exactly the coupon amount', then even after a heal the business invariant still catches the bug: if the coupon does not apply, the total is unchanged and the assertion fails. In other words, self-healing is safe if and only if a strong oracle sits behind the test. The locator is merely how you reach the element; what you assert about the business consequence is the real shield. A suite that relies on 'the element exists' to catch bugs will be neutered by self-healing.",
      "最も強い防御はロケーターではなくオラクルにあります。テストが「ボタンをクリックできた」で止まらず「合計がクーポン額ちょうど下がった」まで進めば、修復後でも業務の不変条件がバグを捉えます。クーポンが適用されなければ合計は変わらず、アサーションが失敗します。言い換えれば、自己修復が安全なのは、テストの背後に強いオラクルがある場合に限ります。ロケーターは要素に到達する手段にすぎず、業務結果について何をアサーションするかが本当の盾です。バグ検出を「要素が存在する」に頼るスイートは、自己修復によって無力化されます。"
    ),
    SCEN(
      "Sự cố coupon bị che ba tuần",
      "Coupon defect masked for three weeks",
      "Một đội bật auto-heal ngưỡng thấp. Bug đổi handler nút coupon lọt qua vì test chỉ khẳng định 'nút tồn tại'. Ba tuần sau, phòng kinh doanh phát hiện tỉ lệ dùng mã giảm giá tụt 40%. Điều tra cho thấy heal đã âm thầm nhảy sang nút thay thế mỗi lần chạy. Bài học: thêm assertion tổng tiền giảm đúng, hạ cửa auto-heal, và bật cảnh báo khi tần suất heal của một test tăng đột biến.",
      "A team enabled low-threshold auto-heal. A bug that broke the coupon button's handler slipped through because the test only asserted 'the button exists'. Three weeks later, business found coupon usage down 40%. The investigation showed the heal had silently jumped to a fallback button on every run. Lesson: add an assertion that the total drops correctly, raise the auto-heal bar, and alert when a test's heal frequency spikes.",
      "クーポン欠陥が3週間隠れた事例",
      "あるチームが低しきい値の自動修復を有効にしました。クーポンボタンのハンドラーを壊すバグが、テストが「ボタンが存在する」しかアサーションしなかったため通過しました。3週間後、事業側がクーポン利用が40%減少しているのを発見しました。調査で、修復が毎回黙って代替ボタンへ飛んでいたと判明しました。教訓：合計が正しく下がるアサーションを追加し、自動修復の基準を上げ、あるテストの修復頻度が急増したら警告することです。"
    ),
    QA(
      "Self-healing tốt hay xấu cho chất lượng bộ kiểm thử?",
      "Is self-healing good or bad for test-suite quality?",
      "Trung tính — tuỳ cách dùng. Với oracle mạnh (khẳng định bất biến nghiệp vụ) và ngưỡng thận trọng, nó giảm flaky do tái cấu trúc UI và tiết kiệm bảo trì. Với oracle yếu (chỉ khẳng định phần tử tồn tại) và ngưỡng thấp, nó âm thầm che lỗi hồi quy. Yếu tố quyết định không phải AI mà là chất lượng oracle phía sau test.",
      "Neutral — it depends on usage. With a strong oracle (asserting business invariants) and a conservative threshold, it cuts flakiness from UI refactors and saves maintenance. With a weak oracle (asserting only that an element exists) and a low threshold, it silently masks regressions. The deciding factor is not the AI but the quality of the oracle behind the test.",
      "自己修復はテストスイートの品質に良いですか悪いですか？",
      "中立です。使い方次第です。強いオラクル（業務の不変条件をアサーション）と保守的なしきい値なら、UIリファクタリングによるフレーキーを減らし保守を節約します。弱いオラクル（要素の存在だけをアサーション）と低いしきい値なら、回帰を黙って隠します。決め手はAIではなく、テストの背後にあるオラクルの品質です。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Giữ con người trong vòng lặp: cổng duyệt heal",
    en: "6. Keeping a human in the loop: the heal review gate",
    ja: "6. 人間を介在させる：修復レビューゲート",
  },
  blocks: [
    P(
      "Con người trong vòng lặp không có nghĩa là ai đó phải ngồi bấm duyệt từng lần chạy — điều đó không mở rộng được. Nó có nghĩa là mọi heal đều biến thành một hiện vật review được: một pull request đề xuất đổi locator, một mục trong hàng đợi review, hay một chú thích trong báo cáo Trace Viewer. Mô hình hiệu quả trên sàn của chúng ta: trong CI, heal ở vùng xám không được áp dụng vào nhánh chính; thay vào đó công cụ mở PR 'Đề xuất cập nhật locator cho checkout.spec.ts' kèm snapshot trước/sau và điểm tin cậy. QA xem trong hai phút, chấp nhận nếu là tái cấu trúc, từ chối và mở bug nếu là lỗi thật.",
      "A human in the loop does not mean someone must approve every run by hand — that does not scale. It means every heal turns into a reviewable artifact: a pull request proposing the locator change, an entry in a review queue, or an annotation in the Trace Viewer report. An effective model on our marketplace: in CI, gray-zone heals are not applied to the main branch; instead the tool opens a PR 'Proposed locator update for checkout.spec.ts' with before/after snapshots and the confidence score. QA reviews it in two minutes, accepts if it is a refactor, rejects and files a bug if it is a real defect.",
      "人間を介在させるとは、誰かが毎回手で承認しなければならないという意味ではありません。それはスケールしません。すべての修復がレビュー可能な成果物になるという意味です。ロケーター変更を提案するプルリクエスト、レビューキューの項目、Trace Viewerレポートの注釈などです。私たちのマーケットプレイスで有効なモデル：CIでは、グレーゾーンの修復はメインブランチに適用されません。代わりにツールが「checkout.spec.tsのロケーター更新案」というPRを、前後スナップショットと信頼度スコア付きで開きます。QAは2分でレビューし、リファクタリングなら承認、本物の欠陥なら却下してバグを起票します。"
    ),
    P(
      "Có một sự phân tách quyền quan trọng: trong môi trường phát triển cục bộ, developer có thể để healer tự sửa để lặp nhanh — như cách Healer của Playwright chạy ở chế độ debug, xem console/network/snapshot rồi vá hoặc đánh dấu skip. Nhưng trong CI của nhánh chính, tuyệt đối không tự vá. CI phải trung thực: nếu locator gãy, hoặc PR sửa nó đã được người duyệt, hoặc test fail. Ranh giới local-tự-do / CI-nghiêm-ngặt giữ được cả tốc độ lẫn độ tin cậy.",
      "There is an important separation of powers: in local development, a developer may let the healer auto-fix for fast iteration — the way Playwright's Healer runs in debug mode, inspects console/network/snapshots, then patches or marks skipped. But in main-branch CI, never auto-patch. CI must stay honest: if a locator breaks, either a human-reviewed PR already fixed it, or the test fails. The local-freedom / CI-strictness boundary preserves both speed and reliability.",
      "重要な権限分離があります。ローカル開発では、開発者は素早い反復のためにヒーラーに自動修正させてよいです。PlaywrightのHealerがデバッグモードで動き、console/network/snapshotを調べ、パッチするかスキップ印を付けるのと同じです。しかしメインブランチのCIでは、決して自動パッチしません。CIは正直であるべきです。ロケーターが壊れたら、人間がレビューしたPRが既に直したか、テストが失敗するかのどちらかです。ローカルの自由／CIの厳格さの境界が、速度と信頼性の両方を保ちます。"
    ),
    CODE(
      "ts",
      `// heal.reporter.ts — không tự vá trên CI; sinh PR/hiện vật để người duyệt
import { test } from '@playwright/test';

test.afterEach(async ({}, testInfo) => {
  const heal = testInfo.annotations.find(a => a.type === 'heal-proposed');
  if (!heal) return;
  const payload = JSON.parse(heal.description!);
  if (process.env.CI) {
    // Trên CI: KHÔNG áp dụng. Ghi hiện vật để mở PR review.
    await emitHealPR({
      spec: testInfo.file,
      old: payload.oldLocator,
      next: payload.newLocator,
      confidence: payload.confidence,
      snapshotDiff: payload.snapshotDiffPath,
    });
    // Test vẫn giữ trạng thái fail để không che lỗi thật.
  } else {
    // Local: cho phép áp dụng tạm để dev lặp nhanh.
    console.log('[heal:local] applied', payload.newLocator);
  }
});`
    ),
    NOTE(
      "Playwright Healer chạy ở chế độ debug: nó xem console, network và snapshot để vá test lỗi hoặc đánh dấu skip. Hãy coi nó là trợ lý gợi ý trong lúc phát triển, không phải cơ chế tự vá trên nhánh chính.",
      "Playwright's Healer runs in debug mode: it inspects console, network and snapshots to fix failing tests or mark them skipped. Treat it as a suggestion assistant during development, not an auto-patcher on the main branch.",
      "PlaywrightのHealerはデバッグモードで動きます。console、network、snapshotを調べて失敗テストを修正するかスキップ印を付けます。開発中の提案アシスタントと見なし、メインブランチの自動パッチ機構とは見なさないでください。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Ghi log heal để review và truy vết",
    en: "7. Logging heals for review and traceability",
    ja: "7. レビューと追跡のための修復記録",
  },
  blocks: [
    P(
      "Một heal không được ghi log là một heal vô hình — và cái vô hình chính là nơi lỗi ẩn nấp. Mỗi lần cơ chế đề xuất hay áp dụng một locator thay thế, hệ thống phải ghi lại đầy đủ: locator cũ, locator mới, điểm tin cậy, các tín hiệu thành phần (role match, name similarity, layout distance), thời điểm, commit đang chạy, và đường dẫn tới snapshot trước/sau. Bản ghi này phục vụ ba mục đích: cho phép người review phán đoán nhanh, cho phép audit sau sự cố, và cung cấp dữ liệu để hiệu chỉnh ngưỡng theo thời gian.",
      "An unlogged heal is an invisible heal — and the invisible is exactly where bugs hide. Every time the mechanism proposes or applies an alternative locator, the system must record it fully: old locator, new locator, confidence score, the component signals (role match, name similarity, layout distance), the timestamp, the running commit, and paths to before/after snapshots. This record serves three purposes: it lets a reviewer judge quickly, it enables post-incident audit, and it provides data to calibrate the threshold over time.",
      "記録されない修復は見えない修復であり、見えないものこそバグが隠れる場所です。機構が代替ロケーターを提案または適用するたびに、システムは完全に記録すべきです。旧ロケーター、新ロケーター、信頼度スコア、構成信号（役割一致、名前類似度、レイアウト距離）、タイムスタンプ、実行中のコミット、前後スナップショットへのパスです。この記録は3つの目的に役立ちます。レビュー担当者が素早く判断でき、インシデント後の監査が可能になり、時間をかけてしきい値を較正するデータを提供します。"
    ),
    P(
      "Điều đặc biệt giá trị là theo dõi tần suất heal theo từng test. Nếu một test cần heal mỗi lần chạy, đó không phải tái cấu trúc ngẫu nhiên nữa — hoặc locator gốc quá giòn cần viết lại, hoặc phần tử đang thay đổi liên tục vì lý do đáng ngờ. Một cảnh báo dạng 'test X đã heal 5 lần trong 7 ngày' thường lộ ra vấn đề trước cả khi nó thành sự cố. Ngược lại, một heal đơn lẻ sau một đợt refactor lớn rồi im lặng là mẫu hình lành tính. Chính chuỗi thời gian của heal, chứ không phải một heal đơn lẻ, kể câu chuyện thật.",
      "Especially valuable is tracking heal frequency per test. If a test needs a heal on every run, that is no longer a random refactor — either the original locator is too brittle and needs rewriting, or the element keeps changing for a suspicious reason. An alert like 'test X healed 5 times in 7 days' often reveals a problem before it becomes an incident. Conversely, a single heal after a big refactor followed by silence is a benign pattern. It is the time series of heals, not a single heal, that tells the real story.",
      "特に価値があるのはテストごとの修復頻度の追跡です。あるテストが毎回修復を必要とするなら、それはもうランダムなリファクタリングではありません。元のロケーターが脆すぎて書き直しが必要か、要素が怪しい理由で変わり続けているかです。「テストXが7日間で5回修復された」といった警告は、インシデントになる前に問題を明らかにすることが多いです。逆に、大きなリファクタリング後の単発の修復とそれに続く沈黙は良性のパターンです。単発の修復ではなく修復の時系列が本当の物語を語ります。"
    ),
    CODE(
      "json",
      `// heal-log.json — bản ghi một heal, đủ để review và audit
{
  "test": "checkout.spec.ts › applies coupon reduces total",
  "commit": "b7f3c2a",
  "at": "2026-07-06T09:41:22Z",
  "oldLocator": "getByTestId('apply-coupon')",
  "newLocator": "getByRole('button', { name: /áp dụng/i })",
  "confidence": 0.72,
  "signals": { "roleMatch": true, "nameSimilarity": 0.81, "layoutDistancePx": 14 },
  "decision": "review",
  "snapshotBefore": "traces/coupon-before.aria.txt",
  "snapshotAfter": "traces/coupon-after.aria.txt",
  "healCount7d": 4
}`
    ),
    TIP(
      "Đưa heal-log vào Trace Viewer dưới dạng text attachment (Playwright hỗ trợ inline text attachment). Khi mở trace của lần chạy, người review thấy ngay heal đề xuất kèm snapshot, không phải lục log rời rạc.",
      "Attach the heal-log to the Trace Viewer as a text attachment (Playwright supports inline text attachments). When opening a run's trace, a reviewer immediately sees the proposed heal with snapshots, not scattered logs.",
      "修復ログをテキスト添付としてTrace Viewerに付けてください（Playwrightはインラインテキスト添付をサポートします）。実行のトレースを開くと、レビュー担当者は散在するログではなく、スナップショット付きの修復案をすぐ確認できます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Đo mức giảm flaky và giá trị thực của self-healing",
    en: "8. Measuring flakiness reduction and the real value of self-healing",
    ja: "8. フレーキー削減と自己修復の真の価値の測定",
  },
  blocks: [
    P(
      "Nếu bạn không đo, bạn không biết self-healing đang giúp hay đang hại. Chỉ số cốt lõi là tỉ lệ flaky: phần trăm lần chạy fail rồi pass lại mà không đổi mã sản phẩm. Trước khi bật self-healing, hãy chốt một đường cơ sở (baseline) trong vài tuần. Sau khi bật, so sánh: flaky do locator có giảm không, thời gian bảo trì test có giảm không. Nhưng quan trọng ngang bằng là chỉ số ngược: số lỗi thật bị heal che đi. Cái này khó đo trực tiếp, nên ta ước lượng qua tỉ lệ heal về sau bị người review từ chối và mở thành bug.",
      "If you do not measure, you do not know whether self-healing helps or harms. The core metric is the flaky rate: the percentage of runs that fail then pass again with no product-code change. Before enabling self-healing, lock a baseline over several weeks. After enabling, compare: did locator-driven flakiness drop, did test maintenance time fall. But equally important is the inverse metric: the number of real bugs the healing masked. This is hard to measure directly, so we estimate it via the fraction of heals later rejected by reviewers and filed as bugs.",
      "測定しなければ、自己修復が役立っているか害しているか分かりません。中心的な指標はフレーキー率です。製品コードを変えずに失敗して再び合格する実行の割合です。自己修復を有効にする前に、数週間かけてベースラインを固定してください。有効化後に比較します。ロケーター由来のフレーキーは減ったか、テスト保守時間は減ったか。しかし同じくらい重要なのは逆の指標です。修復が隠した本物のバグの数です。これは直接測りにくいので、後でレビュー担当者が却下しバグとして起票した修復の割合で推定します。"
    ),
    P(
      "Một bảng điều khiển lành mạnh theo dõi bốn con số cùng lúc: tỉ lệ flaky (nên giảm), số heal mỗi tuần (nên ổn định, không tăng vô hạn), tỉ lệ heal bị từ chối khi review (nếu cao, ngưỡng đang quá lỏng), và số bug thật được phát hiện nhờ heal bị chặn (bằng chứng cổng đang làm việc). Khi bốn con số này cân bằng, self-healing đang đúng vai trò lưới an toàn. Khi tỉ lệ heal-bị-từ-chối tăng, đó là tín hiệu siết ngưỡng hoặc viết lại locator gốc cho ổn định hơn.",
      "A healthy dashboard tracks four numbers at once: the flaky rate (should fall), heals per week (should stay stable, not grow unbounded), the review-rejection rate of heals (if high, the threshold is too loose), and real bugs caught because a heal was blocked (evidence the gate works). When these four are balanced, self-healing plays its proper safety-net role. When the heal-rejection rate rises, it signals tightening the threshold or rewriting original locators to be more stable.",
      "健全なダッシュボードは4つの数字を同時に追跡します。フレーキー率（下がるべき）、週あたりの修復数（無限に増えず安定すべき）、修復のレビュー却下率（高ければしきい値が緩すぎる）、そして修復がブロックされたおかげで捕まえた本物のバグ数（ゲートが機能している証拠）です。この4つが均衡すれば、自己修復は本来の安全網の役割を果たします。修復却下率が上がれば、しきい値を締めるか元のロケーターをより安定に書き直す合図です。"
    ),
    IMG(
      `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="240" rx="12" fill="#3b0764"/>
<text x="320" y="30" text-anchor="middle" fill="#f5d0fe" font-size="15" font-weight="800">Flaky rate: trước vs sau self-healing (có oracle mạnh)</text>
<line x1="60" y1="200" x2="600" y2="200" stroke="#c084fc" stroke-width="1.5"/>
<line x1="60" y1="60" x2="60" y2="200" stroke="#c084fc" stroke-width="1.5"/>
<rect x="90" y="90" width="50" height="110" fill="#f0abfc"/><text x="115" y="220" text-anchor="middle" fill="#f5d0fe" font-size="10">Tuần 1</text>
<rect x="170" y="100" width="50" height="100" fill="#f0abfc"/><text x="195" y="220" text-anchor="middle" fill="#f5d0fe" font-size="10">Tuần 2</text>
<rect x="250" y="98" width="50" height="102" fill="#f0abfc"/><text x="275" y="220" text-anchor="middle" fill="#f5d0fe" font-size="10">bật heal</text>
<rect x="330" y="140" width="50" height="60" fill="#86efac"/><text x="355" y="220" text-anchor="middle" fill="#bbf7d0" font-size="10">Tuần 4</text>
<rect x="410" y="160" width="50" height="40" fill="#86efac"/><text x="435" y="220" text-anchor="middle" fill="#bbf7d0" font-size="10">Tuần 5</text>
<rect x="490" y="168" width="50" height="32" fill="#86efac"/><text x="515" y="220" text-anchor="middle" fill="#bbf7d0" font-size="10">Tuần 6</text>
<text x="40" y="95" fill="#f5d0fe" font-size="10">14%</text>
<text x="46" y="165" fill="#bbf7d0" font-size="10">5%</text>
</svg>`,
      "Flaky do locator giảm sau khi bật self-healing, với oracle mạnh đứng sau.",
      "Locator-driven flakiness drops after enabling self-healing, backed by a strong oracle.",
      "強いオラクルに支えられ、自己修復を有効にするとロケーター由来のフレーキーが下がる。"
    ),
    QA(
      "Đo self-healing thế nào để biết nó không đang che lỗi?",
      "How do you measure self-healing to ensure it is not masking bugs?",
      "Theo dõi song song bốn số: tỉ lệ flaky (nên giảm), số heal/tuần (nên ổn định), tỉ lệ heal bị người review từ chối (cao = ngưỡng lỏng), và số bug thật bắt được nhờ heal bị chặn. Cân bằng bốn số này cho thấy self-healing đang là lưới an toàn chứ không phải máy che lỗi. Đường cơ sở flaky trước khi bật là bắt buộc để so sánh.",
      "Track four numbers together: flaky rate (should fall), heals per week (should stay stable), the review-rejection rate of heals (high = loose threshold), and real bugs caught because a heal was blocked. Balancing these four shows self-healing is a safety net, not a masking machine. A pre-enable flaky baseline is mandatory for comparison.",
      "自己修復がバグを隠していないと確かめるにはどう測定しますか？",
      "4つの数字を並行して追跡します。フレーキー率（下がるべき）、週あたりの修復数（安定すべき）、修復のレビュー却下率（高い＝しきい値が緩い）、修復がブロックされて捕まえた本物のバグ数です。この4つの均衡が、自己修復が安全網でありバグ隠し装置でないことを示します。比較には有効化前のフレーキーのベースラインが必須です。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. Playwright Healer và ranh giới dev-time",
    en: "9. Playwright Healer and the dev-time boundary",
    ja: "9. Playwright Healerと開発時の境界",
  },
  blocks: [
    P(
      "Playwright đưa cơ chế healing vào chính công cụ phát triển thay vì để nó chạy vô hình trên CI. Khi một test fail trong chế độ debug, Healer thu thập ngữ cảnh phong phú: thông báo lỗi, ảnh chụp trạng thái, ARIA snapshot, console log và các request mạng ngay tại thời điểm gãy. Với ngữ cảnh đó, nó đề xuất một locator thay thế, hoặc gợi ý đánh dấu test là skip nếu phần tử thực sự biến mất. Điểm mấu chốt là mọi thứ diễn ra trước mắt developer, trong vòng lặp sửa nhanh, nơi con người có toàn quyền chấp nhận hay bác bỏ đề xuất trước khi commit.",
      "Playwright puts the healing mechanism inside the development tool itself instead of letting it run invisibly in CI. When a test fails in debug mode, the Healer gathers rich context: the error message, a state screenshot, the ARIA snapshot, console logs and network requests at the moment of the break. With that context it proposes an alternative locator, or suggests marking the test as skipped if the element truly vanished. The key point is that it all happens in front of the developer, inside the fast fix loop, where a human has full authority to accept or reject the proposal before committing.",
      "PlaywrightはCIで見えないまま動かすのではなく、修復機構を開発ツール自体の中に置きます。デバッグモードでテストが失敗すると、Healerは豊富なコンテキストを集めます。エラーメッセージ、状態のスクリーンショット、ARIAスナップショット、コンソールログ、破損時点のネットワークリクエストです。そのコンテキストで代替ロケーターを提案するか、要素が本当に消えたならテストをスキップ印にするよう提案します。要点は、すべてが開発者の目の前、素早い修正ループの中で起こり、人間がコミット前に提案を受け入れるか却下するかの完全な権限を持つことです。"
    ),
    P(
      "Ranh giới quan trọng nhất cần khắc ghi: Healer là công cụ dev-time, không phải cơ chế sản xuất. Việc để nó tự vá và commit trên nhánh chính đồng nghĩa xóa bỏ tính trung thực của CI. Cách dùng đúng là developer chạy suite cục bộ, thấy đề xuất, tự tay xác nhận rằng đây là tái cấu trúc lành tính rồi mới đưa thay đổi vào một pull request có review. Bằng cách này, quyết định cuối cùng luôn nằm ở con người, còn AI chỉ rút ngắn thời gian tìm locator thay thế — một sự phân công vai trò rõ ràng và an toàn.",
      "The most important boundary to engrave: the Healer is a dev-time tool, not a production mechanism. Letting it auto-patch and commit on the main branch erases CI's honesty. The correct use is that a developer runs the suite locally, sees the proposal, manually confirms it is a benign refactor, and only then routes the change into a reviewed pull request. This way the final decision always rests with a human, and the AI merely shortens the time to find an alternative locator — a clear, safe division of roles.",
      "刻むべき最も重要な境界：Healerは開発時のツールであり、本番機構ではありません。メインブランチで自動パッチしコミットさせることは、CIの正直さを消します。正しい使い方は、開発者がローカルでスイートを実行し、提案を見て、良性のリファクタリングだと手動で確認し、その後初めてレビュー付きプルリクエストへ変更を回すことです。こうすれば最終判断は常に人間にあり、AIは代替ロケーターを見つける時間を短縮するだけです。役割の明確で安全な分担です。"
    ),
    CODE(
      "ts",
      `// playwright.config.ts — Healer chỉ bật khi debug local, TẮT trên CI
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on-first-retry',
    // ARIA snapshot + bbox giúp healer suy luận vị trí + ngữ nghĩa
    testIdAttribute: 'data-testid',
  },
  // Healer là dev-time: chỉ chạy khi KHÔNG phải CI
  ...(process.env.CI ? {} : { /* enable healer plugin ở đây */ }),
  // Trên CI: fail cứng, không tự vá -> giữ CI trung thực
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
});`
    ),
    QA(
      "Vì sao Playwright đặt Healer ở chế độ debug chứ không phải trên CI?",
      "Why does Playwright place the Healer in debug mode rather than in CI?",
      "Vì CI phải trung thực: nếu locator gãy thì hoặc PR do người duyệt đã sửa, hoặc test fail. Healer ở debug cho developer thấy đề xuất kèm console/network/snapshot ngay lúc sửa, con người xác nhận là tái cấu trúc lành tính rồi mới đưa vào PR review. Tự vá trên nhánh chính sẽ xóa tính trung thực của CI và có thể che lỗi thật.",
      "Because CI must stay honest: if a locator breaks, either a human-reviewed PR already fixed it or the test fails. The Healer in debug shows the developer the proposal with console/network/snapshot right at fix time; a human confirms it is a benign refactor before routing it into a reviewed PR. Auto-patching on the main branch would erase CI's honesty and could mask a real bug.",
      "PlaywrightがHealerをCIではなくデバッグモードに置くのはなぜですか？",
      "CIは正直であるべきだからです。ロケーターが壊れたら、人間がレビューしたPRが既に直したか、テストが失敗するかです。デバッグのHealerは修正時に console/network/snapshot 付きの提案を開発者に見せ、人間が良性のリファクタリングだと確認してからレビュー付きPRへ回します。メインブランチで自動パッチするとCIの正直さが消え、本物のバグを隠しかねません。"
    ),
    NOTE(
      "Từ Playwright v1.60, ARIA snapshot kèm bounding box (toạ độ layout), giúp cơ chế healing suy luận cả ngữ nghĩa lẫn vị trí không gian của phần tử — không cần dựa vào ảnh pixel.",
      "As of Playwright v1.60, the ARIA snapshot includes bounding boxes (layout coordinates), letting the healing mechanism reason about both an element's semantics and its spatial position — without relying on a pixel image.",
      "Playwright v1.60以降、ARIAスナップショットはバウンディングボックス（レイアウト座標）を含み、修復機構が要素の意味と空間位置の両方を、ピクセル画像に頼らず推論できます。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Locator ổn định là tuyến phòng thủ đầu tiên",
    en: "10. Stable locators are the first line of defense",
    ja: "10. 安定したロケーターが第一の防御線",
  },
  blocks: [
    P(
      "Self-healing giỏi nhất khi ít được gọi tới nhất. Mỗi lần heal là một lần hệ thống phải đoán, và mọi phép đoán đều mang rủi ro đoán sai. Vì thế đầu tư lớn nhất không nằm ở thuật toán heal mà ở việc viết locator ổn định ngay từ gốc. Thứ tự ưu tiên trên sàn của chúng ta là: dùng vai trò và tên có thể truy cập trước, rồi tới data-testid nghiệp vụ, rồi tới text hiển thị, và chỉ khi bất khả kháng mới dùng CSS cấu trúc. XPath tuyệt đối theo chỉ số con nằm ở đáy danh sách, gần như bị cấm vì nó gãy với thay đổi trình bày nhỏ nhất.",
      "Self-healing is at its best when it is called least. Every heal is a moment where the system must guess, and every guess carries the risk of guessing wrong. So the biggest investment is not in the heal algorithm but in writing stable locators from the start. Our marketplace priority order is: prefer role and accessible name first, then business data-testid, then visible text, and only as a last resort structural CSS. Absolute index-based XPath sits at the bottom of the list, all but banned because it breaks on the smallest presentational change.",
      "自己修復は、最も呼ばれないときが最良です。修復のたびにシステムは推測せねばならず、推測には誤る危険が伴います。だから最大の投資は修復アルゴリズムではなく、最初から安定したロケーターを書くことにあります。私たちのマーケットプレイスの優先順位は、まず役割とアクセシブル名、次に業務のdata-testid、次に表示テキスト、最後の手段としてのみ構造的CSSです。絶対的なインデックスベースのXPathは最下位で、最小の見た目の変更で壊れるためほぼ禁止です。"
    ),
    P(
      "Một quy tắc thực dụng: nếu bạn phải viết một locator mà không thể diễn đạt bằng lời cho một người không kỹ thuật ('nút Đặt hàng ở cuối form thanh toán'), thì locator đó có lẽ đang bám vào cấu trúc chứ không vào ý nghĩa. Locator tốt đọc lên nghe giống cách người dùng mô tả phần tử. Đây cũng là lý do accessibility và testability đi cùng nhau: một trang dễ dùng với trình đọc màn hình thường cũng dễ viết locator ổn định, vì cả hai đều phụ thuộc vào role và accessible name rõ ràng.",
      "A pragmatic rule: if you must write a locator you cannot express in words to a non-technical person ('the Place order button at the bottom of the checkout form'), that locator is probably anchored to structure, not meaning. A good locator reads like the way a user describes the element. This is also why accessibility and testability go together: a page that is easy to use with a screen reader is usually easy to write stable locators for, because both depend on clear roles and accessible names.",
      "実用的なルール：非技術者に言葉で表現できないロケーター（「決済フォーム下部の注文するボタン」）を書かねばならないなら、そのロケーターはおそらく意味ではなく構造に固定されています。良いロケーターは、ユーザーが要素を説明する言い方のように読めます。これがアクセシビリティとテスト容易性が両立する理由でもあります。スクリーンリーダーで使いやすいページは、明確な役割とアクセシブル名に依存するため、たいてい安定したロケーターも書きやすいのです。"
    ),
    CODE(
      "ts",
      `// locator-priority.ts — thứ tự ưu tiên, ổn định giảm dần
// 1) role + accessible name (ổn định nhất)
page.getByRole('button', { name: /đặt hàng|place order/i });
// 2) business data-testid
page.getByTestId('checkout-submit');
// 3) visible text (đủ đặc trưng)
page.getByText('Áp dụng mã giảm giá', { exact: true });
// 4) CSS bám thuộc tính nghiệp vụ (không phải class sinh tự động)
page.locator('[data-role="cart-total"]');
// 5) ❌ tránh: XPath tuyệt đối theo chỉ số con
// page.locator('xpath=//div[3]/div/button[2]');`
    ),
    TIP(
      "Kiểm định locator bằng cách hỏi: 'phần tử này sống sót nếu đội design đổi màu, đổi khoảng cách, thêm div bọc không?'. Nếu câu trả lời là không, hãy đổi sang neo theo role hoặc testid trước khi trông cậy vào self-healing.",
      "Vet a locator by asking: 'would this element survive if the design team changed colors, spacing, or added a wrapper div?'. If the answer is no, switch to anchoring by role or testid before relying on self-healing.",
      "ロケーターを検証するには、こう問います。「デザインチームが色や間隔を変えたり、ラッパーdivを追加したりしても、この要素は生き残るか？」。答えがノーなら、自己修復に頼る前に役割やtestidへの固定に切り替えてください。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Kiểm thử bản thân cơ chế heal: nuôi lỗi có kiểm soát",
    en: "11. Testing the healing mechanism itself: controlled fault injection",
    ja: "11. 修復機構自体をテストする：制御された故障注入",
  },
  blocks: [
    P(
      "Một cơ chế self-healing cũng là phần mềm, và mọi phần mềm đều cần được kiểm thử. Cách hiệu quả nhất để tin tưởng nó là nuôi lỗi có kiểm soát: cố tình tạo ra hai loại thay đổi và quan sát hệ thống phản ứng. Với thay đổi lành tính — đổi class CSS, thêm div bọc, đổi thứ tự thuộc tính — cơ chế phải heal thành công và ghi log. Với thay đổi ác tính — xóa handler của nút, đổi vai trò từ button thành div, disable phần tử — cơ chế phải từ chối heal và để test fail. Chỉ khi vượt qua cả hai kiểu tình huống, bạn mới có bằng chứng rằng nó phân biệt được tái cấu trúc với lỗi thật.",
      "A self-healing mechanism is also software, and all software needs testing. The most effective way to trust it is controlled fault injection: deliberately create two kinds of change and observe how the system reacts. For benign changes — renaming a CSS class, adding a wrapper div, reordering attributes — the mechanism must heal successfully and log it. For malicious changes — removing a button's handler, switching a role from button to div, disabling an element — the mechanism must refuse to heal and let the test fail. Only when it passes both kinds of situations do you have evidence that it distinguishes refactors from real bugs.",
      "自己修復機構もソフトウェアであり、すべてのソフトウェアはテストを必要とします。それを信頼する最も効果的な方法は制御された故障注入です。意図的に2種類の変更を作り、システムの反応を観察します。良性の変更（CSSクラスの改名、ラッパーdivの追加、属性の並べ替え）では、機構は修復に成功し記録すべきです。悪性の変更（ボタンのハンドラー削除、役割をbuttonからdivへ変更、要素の無効化）では、機構は修復を拒否しテストを失敗させるべきです。両方の状況を通過して初めて、リファクタリングと本物のバグを区別できる証拠が得られます。"
    ),
    P(
      "Bộ kiểm thử meta này nên chạy định kỳ, không chỉ một lần khi triển khai. Lý do là mô hình AI và thư viện phía dưới thay đổi theo thời gian — một bản cập nhật có thể làm cơ chế trở nên hào phóng hơn hoặc keo kiệt hơn khi chấm điểm. Nếu bạn không có bộ hồi quy cho chính cái healer, một thay đổi lặng lẽ về hành vi của nó có thể trượt vào và làm suy giảm chất lượng toàn bộ suite mà không ai nhận ra. Nói ngắn gọn: healer bảo vệ bộ test của bạn, nhưng ai bảo vệ healer? Câu trả lời là một bộ kiểm thử fault-injection chạy tự động.",
      "This meta test-suite should run periodically, not just once at rollout. The reason is that the AI model and underlying libraries change over time — an update can make the mechanism more generous or more stingy when scoring. If you have no regression set for the healer itself, a silent change in its behavior can slip in and degrade the quality of the whole suite without anyone noticing. In short: the healer protects your tests, but who protects the healer? The answer is an automated fault-injection suite.",
      "このメタテストスイートは、展開時に一度だけでなく定期的に実行すべきです。理由は、AIモデルと基盤ライブラリが時間とともに変わるからです。更新により、機構が採点時により寛大にも吝嗇にもなり得ます。ヒーラー自体の回帰セットがなければ、その振る舞いの静かな変化が忍び込み、誰も気づかないままスイート全体の品質を低下させ得ます。要するに、ヒーラーはテストを守りますが、誰がヒーラーを守るのか？答えは自動化された故障注入スイートです。"
    ),
    CODE(
      "ts",
      `// heal-faultinject.spec.ts — kiểm thử chính cơ chế heal
import { test, expect } from '@playwright/test';
import { decideHeal } from './heal-policy';

test('lành tính: đổi class + thêm wrapper -> HEAL', () => {
  const d = decideHeal({ confidence: 0.93, roleMatches: true, nameSimilarity: 0.9 });
  expect(d).toBe('auto');           // tái cấu trúc trình bày, được chữa
});

test('ác tính: button -> div (role đổi) -> FAIL, KHÔNG heal', () => {
  const d = decideHeal({ confidence: 0.95, roleMatches: false, nameSimilarity: 0.9 });
  expect(d).toBe('fail');           // đổi vai trò = nghi lỗi thật
});

test('vùng xám: name gần giống -> REVIEW, không tự chữa', () => {
  const d = decideHeal({ confidence: 0.7, roleMatches: true, nameSimilarity: 0.6 });
  expect(d).toBe('review');
});`
    ),
    QA(
      "Làm sao biết cơ chế self-healing của mình đáng tin?",
      "How do you know your self-healing mechanism is trustworthy?",
      "Nuôi lỗi có kiểm soát: tạo thay đổi lành tính (đổi class, thêm div bọc) và kiểm rằng nó heal + log; tạo thay đổi ác tính (xóa handler, đổi role button→div, disable) và kiểm rằng nó từ chối heal để test fail. Chạy bộ fault-injection này định kỳ vì mô hình và thư viện thay đổi — healer bảo vệ test, còn bộ này bảo vệ healer.",
      "Controlled fault injection: create benign changes (rename a class, add a wrapper div) and assert it heals + logs; create malicious changes (remove a handler, switch role button→div, disable) and assert it refuses to heal so the test fails. Run this fault-injection suite periodically because models and libraries change — the healer protects the tests, and this suite protects the healer.",
      "自分の自己修復機構が信頼できるとどう分かりますか？",
      "制御された故障注入です。良性の変更（クラス改名、ラッパーdiv追加）を作り、修復＋記録することをアサーションし、悪性の変更（ハンドラー削除、役割button→div、無効化）を作り、修復を拒否してテストを失敗させることをアサーションします。モデルとライブラリが変わるため、この故障注入スイートを定期実行します。ヒーラーはテストを守り、このスイートはヒーラーを守ります。"
    ),
    WARN(
      "Đừng giả định rằng healer giữ nguyên hành vi qua các bản nâng cấp thư viện hay mô hình. Không có bộ hồi quy fault-injection, một thay đổi lặng lẽ có thể khiến healer trở nên quá hào phóng và bắt đầu che lỗi.",
      "Do not assume the healer keeps the same behavior across library or model upgrades. Without a fault-injection regression set, a silent change can make the healer too generous and start masking bugs.",
      "ヒーラーがライブラリやモデルのアップグレードを通じて同じ振る舞いを保つと仮定しないでください。故障注入の回帰セットがなければ、静かな変化がヒーラーを寛大にしすぎ、バグを隠し始めかねません。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Heal trên phần tử động và danh sách lặp",
    en: "12. Healing on dynamic and repeated-list elements",
    ja: "12. 動的要素と繰り返しリストでの修復",
  },
  blocks: [
    P(
      "Phần tử động là nơi self-healing dễ đi sai nhất. Trên trang danh sách sản phẩm, mỗi thẻ trông gần như y hệt nhau: cùng vai trò, cùng cấu trúc, chỉ khác tên và giá. Nếu locator gốc trỏ tới 'nút Thêm giỏ hàng của sản phẩm thứ ba' bị gãy, một healer ngây thơ có thể vui vẻ heal sang nút Thêm giỏ hàng của một sản phẩm khác — bởi chúng khớp vai trò và tên gần như hoàn hảo. Nhưng đây là loại heal nguy hiểm: nó không khôi phục ý định ban đầu mà thay thế bằng một phần tử tình cờ tương tự, khiến test âm thầm kiểm sai đối tượng.",
      "Dynamic elements are where self-healing most easily goes wrong. On a product-list page, every card looks nearly identical: same role, same structure, differing only in name and price. If the original locator pointing to 'the Add to cart button of the third product' breaks, a naive healer may happily heal to another product's Add to cart button — because they match role and name almost perfectly. But this is a dangerous kind of heal: it does not restore the original intent but substitutes an incidentally similar element, making the test silently check the wrong target.",
      "動的要素は自己修復が最も誤りやすい場所です。商品リストページでは、どのカードもほぼ同一に見えます。同じ役割、同じ構造で、名前と価格だけが異なります。「3番目の商品のカート追加ボタン」を指す元のロケーターが壊れると、素朴なヒーラーは別の商品のカート追加ボタンへ喜んで修復し得ます。役割と名前がほぼ完璧に一致するからです。しかしこれは危険な修復です。元の意図を回復せず、たまたま似た要素で置き換え、テストが黙って誤った対象を検証することになります。"
    ),
    P(
      "Cách phòng thủ là neo phần tử động vào một khóa nghiệp vụ duy nhất, không vào vị trí. Thay vì 'sản phẩm thứ ba', hãy dùng 'sản phẩm có mã SKU cụ thể' hoặc 'thẻ chứa tên sản phẩm cụ thể'. Khi locator neo vào một định danh bất biến về nghiệp vụ, healer không còn cơ hội nhảy nhầm sang phần tử anh em, vì không phần tử nào khác mang cùng khóa đó. Đây là ví dụ điển hình cho nguyên tắc chung: locator càng gắn với ý nghĩa nghiệp vụ duy nhất thì càng ít cần heal, và mỗi lần heal càng ít khả năng sai.",
      "The defense is to anchor dynamic elements to a unique business key, not to position. Instead of 'the third product', use 'the product with a specific SKU' or 'the card containing a specific product name'. When the locator anchors to a business-invariant identifier, the healer has no chance to jump to a sibling, because no other element carries that key. This is a textbook example of the general principle: the more a locator is tied to a unique business meaning, the less it needs healing, and each heal is less likely to be wrong.",
      "防御は、動的要素を位置ではなく一意の業務キーに固定することです。「3番目の商品」ではなく「特定のSKUを持つ商品」や「特定の商品名を含むカード」を使います。ロケーターが業務不変の識別子に固定されると、ヒーラーが兄弟要素へ飛ぶ機会はなくなります。他のどの要素も同じキーを持たないからです。これは一般原則の教科書的な例です。ロケーターが一意の業務的意味に結び付くほど修復は不要になり、各修復が誤る可能性も下がります。"
    ),
    CODE(
      "ts",
      `// dynamic-list.ts — neo vào khóa nghiệp vụ, KHÔNG vào chỉ số vị trí
import { Page, Locator } from '@playwright/test';

// ❌ giòn: phụ thuộc vị trí, healer dễ nhảy nhầm sang sản phẩm khác
// page.getByRole('button', { name: 'Thêm giỏ hàng' }).nth(2);

// ✅ ổn định: định danh duy nhất theo SKU
export function addToCartBySku(page: Page, sku: string): Locator {
  return page
    .locator('[data-product-card]', { has: page.getByTestId(\`sku-\${sku}\`) })
    .getByRole('button', { name: /thêm giỏ hàng|add to cart/i });
}

// Test khẳng định đúng SKU vào giỏ, không chỉ 'một nút được bấm'
// await expect(cartLine(page, sku)).toBeVisible();`
    ),
    SCEN(
      "Heal nhảy nhầm sang sản phẩm khác",
      "Heal jumps to the wrong product",
      "Một test dùng nth(2) để chọn nút Thêm giỏ hàng của sản phẩm thứ ba. Sau khi backend đổi thứ tự sắp xếp mặc định, phần tử ở vị trí ba là sản phẩm khác. Locator vẫn 'khớp' nên không gãy, và cả khi gãy, healer neo theo vai trò/tên vẫn chọn một nút Thêm giỏ hàng bất kỳ. Test xanh nhưng kiểm nhầm sản phẩm. Sửa: neo theo SKU duy nhất và khẳng định đúng dòng SKU xuất hiện trong giỏ.",
      "A test used nth(2) to pick the third product's Add to cart button. After the backend changed the default sort order, the element at position three is a different product. The locator still 'matches' so it does not break, and even when it does, a role/name-anchored healer still picks any Add to cart button. The test is green but checks the wrong product. Fix: anchor by unique SKU and assert the correct SKU line appears in the cart.",
      "修復が誤った商品へ飛ぶ事例",
      "あるテストがnth(2)で3番目の商品のカート追加ボタンを選びました。バックエンドが既定の並び順を変えた後、位置3の要素は別の商品です。ロケーターはまだ「一致」するので壊れず、壊れても役割/名前で固定したヒーラーは任意のカート追加ボタンを選びます。テストは緑ですが誤った商品を検証します。修正：一意のSKUで固定し、正しいSKU行がカートに現れることをアサーションします。"
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Quản trị: chính sách, quyền và văn hóa dùng self-healing",
    en: "13. Governance: policy, ownership and the culture of self-healing",
    ja: "13. ガバナンス：ポリシー、責任、自己修復の文化",
  },
  blocks: [
    P(
      "Self-healing không phải một nút bật/tắt kỹ thuật đơn thuần mà là một quyết định quản trị. Một tổ chức trưởng thành viết ra chính sách rõ ràng: ai được phép bật heal, ở môi trường nào, với ngưỡng nào; heal nào được tự áp dụng và heal nào bắt buộc qua review; ai sở hữu heal-log và ai chịu trách nhiệm điều tra khi tần suất heal tăng vọt. Không có chính sách này, mỗi đội sẽ tự cấu hình theo áp lực riêng, và tổ chức mất khả năng lập luận nhất quán về việc bộ kiểm thử của mình đang thật sự bảo vệ điều gì.",
      "Self-healing is not merely a technical on/off switch but a governance decision. A mature organization writes explicit policy: who may enable healing, in which environments, at what threshold; which heals auto-apply and which must go through review; who owns the heal-log and who is accountable for investigating when heal frequency spikes. Without this policy, each team configures to its own pressure, and the organization loses the ability to reason consistently about what its test suite is actually protecting.",
      "自己修復は単なる技術的なオン/オフスイッチではなく、ガバナンスの決定です。成熟した組織は明確なポリシーを書きます。誰がどの環境でどのしきい値で修復を有効にできるか、どの修復が自動適用されどれがレビューを要するか、誰が修復ログを所有し修復頻度が急増したとき誰が調査に責任を負うか、です。このポリシーがなければ、各チームが自分の圧力に合わせて設定し、組織は自社のテストスイートが実際に何を守っているかを一貫して論じる能力を失います。"
    ),
    P(
      "Về mặt văn hóa, điều nguy hiểm nhất là để self-healing tạo ra ảo giác an toàn. Khi pipeline luôn xanh, con người dễ ngừng đặt câu hỏi. Đội trưởng thành làm ngược lại: coi mỗi heal như một câu hỏi cần trả lời, không phải một vấn đề đã được giải. Họ dành thời gian review heal-log định kỳ, xử lý các test heal thường xuyên như nợ kỹ thuật cần trả, và xem một cổng heal đôi khi bắt được lỗi thật là bằng chứng cơ chế đang làm đúng việc. Tóm lại, self-healing hữu ích khi nó là công cụ khuếch đại sự tỉnh táo của con người, và có hại khi nó thay thế sự tỉnh táo đó.",
      "Culturally, the most dangerous thing is letting self-healing create an illusion of safety. When the pipeline is always green, people easily stop asking questions. Mature teams do the opposite: they treat each heal as a question to answer, not a problem already solved. They spend time reviewing the heal-log periodically, handle frequently-healing tests as technical debt to repay, and view a heal gate occasionally catching a real bug as proof the mechanism is doing its job. In short, self-healing helps when it amplifies human vigilance, and harms when it replaces that vigilance.",
      "文化的に最も危険なのは、自己修復に安全の幻想を作らせることです。パイプラインが常に緑だと、人は簡単に問いをやめます。成熟したチームは逆をします。各修復を、既に解決した問題ではなく答えるべき問いとして扱います。定期的に修復ログをレビューし、頻繁に修復されるテストを返済すべき技術的負債として扱い、修復ゲートが時折本物のバグを捕まえることを機構が仕事をしている証拠と見ます。要するに、自己修復は人間の警戒を増幅するときに役立ち、その警戒を置き換えるときに害します。"
    ),
    IMG(
      `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="250" rx="12" fill="#3b0764"/>
<text x="320" y="32" text-anchor="middle" fill="#f5d0fe" font-size="15" font-weight="800">Chính sách heal theo môi trường</text>
<rect x="30" y="60" width="180" height="150" rx="10" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="120" y="86" text-anchor="middle" fill="#dcfce7" font-size="13" font-weight="800">Local dev</text>
<text x="120" y="112" text-anchor="middle" fill="#bbf7d0" font-size="11">Healer bật</text>
<text x="120" y="132" text-anchor="middle" fill="#bbf7d0" font-size="11">auto-fix tạm</text>
<text x="120" y="152" text-anchor="middle" fill="#bbf7d0" font-size="11">dev xác nhận</text>
<text x="120" y="180" text-anchor="middle" fill="#86efac" font-size="11" font-weight="700">tốc độ lặp</text>
<rect x="230" y="60" width="180" height="150" rx="10" fill="#78350f" stroke="#fcd34d" stroke-width="2"/>
<text x="320" y="86" text-anchor="middle" fill="#fef3c7" font-size="13" font-weight="800">PR / staging</text>
<text x="320" y="112" text-anchor="middle" fill="#fde68a" font-size="11">heal -> mở PR</text>
<text x="320" y="132" text-anchor="middle" fill="#fde68a" font-size="11">người review</text>
<text x="320" y="152" text-anchor="middle" fill="#fde68a" font-size="11">chấp nhận/bác</text>
<text x="320" y="180" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="700">con người quyết</text>
<rect x="430" y="60" width="180" height="150" rx="10" fill="#7f1d1d" stroke="#fca5a5" stroke-width="2"/>
<text x="520" y="86" text-anchor="middle" fill="#fee2e2" font-size="13" font-weight="800">CI nhánh chính</text>
<text x="520" y="112" text-anchor="middle" fill="#fecaca" font-size="11">KHÔNG tự vá</text>
<text x="520" y="132" text-anchor="middle" fill="#fecaca" font-size="11">gãy = fail cứng</text>
<text x="520" y="152" text-anchor="middle" fill="#fecaca" font-size="11">log để audit</text>
<text x="520" y="180" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="700">CI trung thực</text>
</svg>`,
      "Chính sách heal khác nhau theo môi trường: local tự do, PR có review, CI nghiêm ngặt.",
      "Heal policy differs by environment: free locally, reviewed on PRs, strict in CI.",
      "環境ごとに異なる修復ポリシー：ローカルは自由、PRはレビュー、CIは厳格。"
    ),
    QA(
      "Ai nên chịu trách nhiệm về self-healing trong một tổ chức?",
      "Who should be accountable for self-healing in an organization?",
      "Cần chính sách quản trị rõ: ai được bật heal, ở môi trường nào, ngưỡng bao nhiêu; heal nào tự áp dụng, heal nào bắt buộc review; ai sở hữu heal-log và điều tra khi tần suất heal tăng vọt. Về văn hóa, coi mỗi heal là câu hỏi cần trả lời chứ không phải vấn đề đã giải; review log định kỳ; xử lý test heal thường xuyên như nợ kỹ thuật. Self-healing chỉ tốt khi khuếch đại sự tỉnh táo của con người, không thay thế nó.",
      "You need clear governance policy: who may enable healing, in which environments, at what threshold; which heals auto-apply, which require review; who owns the heal-log and investigates when heal frequency spikes. Culturally, treat each heal as a question to answer, not a solved problem; review the log periodically; handle frequently-healing tests as technical debt. Self-healing is only good when it amplifies human vigilance, not when it replaces it.",
      "組織内で自己修復に責任を負うべきなのは誰ですか？",
      "明確なガバナンスポリシーが必要です。誰がどの環境でどのしきい値で修復を有効にできるか、どの修復が自動適用されどれがレビューを要するか、誰が修復ログを所有し修復頻度が急増したとき調査するか、です。文化的には、各修復を解決済みの問題ではなく答えるべき問いとして扱い、ログを定期レビューし、頻繁に修復されるテストを技術的負債として扱います。自己修復は人間の警戒を増幅するときのみ良く、置き換えるときは良くありません。"
    ),
    TIP(
      "Đặt một 'ngân sách heal' cho mỗi test: nếu một test vượt N lần heal trong một cửa sổ thời gian, tự động tạo ticket viết lại locator gốc thay vì để nó heal mãi. Điều này biến heal-log thành hành động cụ thể, không chỉ là dữ liệu.",
      "Set a 'heal budget' per test: if a test exceeds N heals in a time window, automatically open a ticket to rewrite the original locator instead of letting it heal forever. This turns the heal-log into concrete action, not just data.",
      "テストごとに「修復予算」を設定します。あるテストが時間枠内でN回の修復を超えたら、永遠に修復させるのではなく元のロケーターを書き直すチケットを自動で開きます。これは修復ログを単なるデータではなく具体的な行動に変えます。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "1. Bối cảnh: vì sao pixel-diff sinh quá nhiều báo động giả",
    en: "1. Context: why pixel diff produces too many false positives",
    ja: "1. 背景：ピクセル差分が偽陽性を出しすぎる理由",
  },
  blocks: [
    P(
      "Trên sàn thương mại điện tử của chúng ta, đội QA chụp ảnh màn hình trang chủ, trang sản phẩm và trang thanh toán ở mỗi lần build, rồi so với ảnh baseline để bắt hồi quy giao diện. Công cụ truyền thống so từng pixel: nếu số pixel khác vượt ngưỡng, test fail. Vấn đề là phần lớn pixel khác nhau lại vô nghĩa với con người — anti-aliasing khác nhau giữa hai lần render, một biểu ngữ khuyến mãi xoay vòng, ngày giờ hiển thị động, hay avatar người dùng khác nhau. Kết quả là báo động giả tràn ngập, đội QA mất niềm tin và bắt đầu bỏ qua kết quả visual, đúng lúc đó một hồi quy thật lọt lưới.",
      "On our e-commerce marketplace, the QA team screenshots the homepage, product page and checkout on every build, then compares against a baseline to catch UI regressions. Traditional tools diff pixel by pixel: if the count of differing pixels exceeds a threshold, the test fails. The problem is that most differing pixels are meaningless to a human — anti-aliasing differs between two renders, a promo banner rotates, a dynamic date-time shows, or the user avatar differs. The result is a flood of false positives, the QA team loses trust and starts ignoring visual results, and precisely then a real regression slips through.",
      "私たちのECマーケットプレイスでは、QAチームがビルドごとにホームページ、商品ページ、決済画面のスクリーンショットを撮り、ベースラインと比較してUI回帰を捕まえます。従来のツールはピクセル単位で差分を取ります。異なるピクセル数がしきい値を超えるとテストが失敗します。問題は、異なるピクセルの大半が人間にとって無意味なことです。2回のレンダー間でアンチエイリアスが異なり、プロモバナーが回転し、動的な日時が表示され、ユーザーアバターが異なります。結果として偽陽性が氾濫し、QAチームは信頼を失いビジュアル結果を無視し始め、まさにそのとき本物の回帰がすり抜けます。"
    ),
    P(
      "Điều bài này hướng tới là chuyển từ câu hỏi 'có pixel nào khác không' sang câu hỏi 'thay đổi này có ý nghĩa với người dùng không'. Đó là một câu hỏi ngữ nghĩa, và đây là chỗ AI cùng embedding phát huy tác dụng: phân loại thay đổi thành có nghĩa (một nút biến mất, giá sai vị trí, chữ chồng lên nhau) và mỹ thuật thuần túy (mờ viền, dịch một pixel, đổi màu vi tế do nén ảnh). Nhưng ngay từ đầu phải nói rõ: oracle vẫn đứng trên hết. AI không thay bạn quyết định cái gì đúng; nó chỉ giúp lọc bớt nhiễu để con người tập trung vào khác biệt thật sự đáng xem.",
      "What this article aims at is shifting from the question 'are any pixels different' to the question 'does this change matter to a user'. That is a semantic question, and this is where AI and embeddings shine: classifying changes into meaningful (a button vanished, price in the wrong place, text overlapping) and purely cosmetic (blurred edges, a one-pixel shift, subtle color change from image compression). But from the outset it must be clear: the oracle still comes first. AI does not decide for you what is correct; it merely helps filter noise so humans focus on differences truly worth reviewing.",
      "本稿が目指すのは、「異なるピクセルはあるか」という問いから「この変更はユーザーにとって重要か」という問いへの転換です。それは意味的な問いであり、ここでAIと埋め込みが力を発揮します。変更を、意味のあるもの（ボタンが消えた、価格が誤った位置、テキストの重なり）と純粋に装飾的なもの（ぼやけた縁、1ピクセルのずれ、画像圧縮による微妙な色変化）に分類します。しかし最初から明確にすべきは、オラクルが依然として最優先ということです。AIは何が正しいかをあなたの代わりに決めません。ノイズを濾過し、人間が本当にレビューする価値のある差異に集中できるよう助けるだけです。"
    ),
    IMG(
      `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="250" rx="12" fill="#0c4a6e"/>
<text x="320" y="32" text-anchor="middle" fill="#bae6fd" font-size="16" font-weight="800">Pixel-diff vs semantic-diff</text>
<rect x="40" y="60" width="250" height="140" rx="10" fill="#7f1d1d" stroke="#fca5a5" stroke-width="2"/>
<text x="165" y="88" text-anchor="middle" fill="#fee2e2" font-size="14" font-weight="800">Pixel-diff</text>
<text x="165" y="114" text-anchor="middle" fill="#fecaca" font-size="11">đếm pixel khác</text>
<text x="165" y="134" text-anchor="middle" fill="#fecaca" font-size="11">anti-aliasing = fail</text>
<text x="165" y="154" text-anchor="middle" fill="#fecaca" font-size="11">banner động = fail</text>
<text x="165" y="180" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="700">nhiều báo động giả</text>
<rect x="350" y="60" width="250" height="140" rx="10" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="475" y="88" text-anchor="middle" fill="#dcfce7" font-size="14" font-weight="800">Semantic-diff</text>
<text x="475" y="114" text-anchor="middle" fill="#bbf7d0" font-size="11">hỏi: có nghĩa không?</text>
<text x="475" y="134" text-anchor="middle" fill="#bbf7d0" font-size="11">bỏ qua mỹ thuật</text>
<text x="475" y="154" text-anchor="middle" fill="#bbf7d0" font-size="11">bắt thay đổi thật</text>
<text x="475" y="180" text-anchor="middle" fill="#86efac" font-size="12" font-weight="700">ít nhiễu hơn</text>
<text x="320" y="230" text-anchor="middle" fill="#e0f2fe" font-size="12">Oracle nghiệp vụ vẫn quyết định đâu là hồi quy thật</text>
</svg>`,
      "Chuyển từ đếm pixel sang hỏi thay đổi có ý nghĩa với người dùng không.",
      "Shift from counting pixels to asking whether a change matters to a user.",
      "ピクセルを数えることから、変更がユーザーにとって重要かを問うことへの転換。"
    ),
    NOTE(
      "Visual regression không thay thế kiểm thử chức năng. Nó bắt lỗi trình bày (layout vỡ, chữ chồng, phần tử mất) mà assertion DOM có thể bỏ sót, nhưng không khẳng định nghiệp vụ tính đúng. Hai lớp bổ sung cho nhau, không loại trừ.",
      "Visual regression does not replace functional testing. It catches presentation bugs (broken layout, overlapping text, missing elements) that DOM assertions may miss, but it does not assert that business logic is correct. The two layers complement each other, they do not replace one another.",
      "ビジュアルリグレッションは機能テストを置き換えません。DOMアサーションが見逃し得る表示バグ（レイアウト崩れ、テキストの重なり、要素の欠落）を捕まえますが、業務ロジックの正しさはアサーションしません。2つの層は互いを補完し、置き換えません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Ổn định hóa ảnh chụp trước khi so sánh",
    en: "2. Stabilizing screenshots before comparison",
    ja: "2. 比較前にスクリーンショットを安定化する",
  },
  blocks: [
    P(
      "Trước khi nghĩ tới AI, phần lớn báo động giả có thể loại bỏ bằng kỹ thuật đơn giản: làm cho ảnh chụp trở nên tất định. Nguồn gây nhiễu phổ biến gồm animation đang chạy, phông chữ chưa tải xong, nội dung động như ngày giờ và banner xoay vòng, và con trỏ nhấp nháy. Playwright cho phép tắt animation khi chụp, chờ web-font ổn định, và che (mask) các vùng động để chúng không tham gia so sánh. Chỉ riêng những bước này thường cắt phần lớn dương tính giả, khiến bất kỳ lớp AI nào phía sau cũng nhẹ gánh hơn nhiều.",
      "Before thinking about AI, most false positives can be eliminated by simple technique: making the screenshot deterministic. Common noise sources include running animations, fonts not yet loaded, dynamic content like date-time and rotating banners, and a blinking cursor. Playwright can disable animations during capture, wait for web-fonts to settle, and mask dynamic regions so they do not take part in the comparison. These steps alone usually cut most false positives, making any AI layer behind them far lighter.",
      "AIを考える前に、偽陽性の大半は単純な技術で除去できます。スクリーンショットを決定論的にすることです。よくあるノイズ源には、実行中のアニメーション、まだ読み込まれていないフォント、日時や回転バナーのような動的コンテンツ、点滅するカーソルがあります。Playwrightはキャプチャ中にアニメーションを無効化し、Webフォントが落ち着くのを待ち、動的領域をマスクして比較に参加させないようにできます。これらのステップだけで通常、偽陽性の大半を削減し、その背後のAI層をはるかに軽くします。"
    ),
    P(
      "Che vùng động là một công cụ mạnh nhưng cần dùng có kỷ luật. Nếu bạn mask cả một vùng lớn 'cho chắc', bạn có thể vô tình che luôn chỗ hồi quy thật sẽ xuất hiện. Nguyên tắc là mask hẹp nhất có thể: chỉ đúng chuỗi ngày giờ, chỉ đúng ô avatar, chỉ đúng banner khuyến mãi. Với mỗi vùng mask, hãy tự hỏi: nếu phần này vỡ layout, liệu một lớp kiểm thử khác có bắt được không? Nếu câu trả lời là không, có lẽ bạn không nên mask nó mà nên tìm cách cố định nội dung — ví dụ tiêm một ngày giờ giả tất định qua clock của Playwright.",
      "Masking dynamic regions is a powerful tool but must be used with discipline. If you mask a large region 'to be safe', you may accidentally hide the very place a real regression would appear. The principle is to mask as narrowly as possible: exactly the date-time string, exactly the avatar box, exactly the promo banner. For each masked region, ask yourself: if this part breaks layout, will another test layer catch it? If the answer is no, perhaps you should not mask it but instead find a way to fix the content — for example, injecting a deterministic fake date-time via Playwright's clock.",
      "動的領域のマスクは強力なツールですが、規律を持って使わねばなりません。「念のため」に大きな領域をマスクすると、本物の回帰が現れるまさにその場所を誤って隠しかねません。原則はできるだけ狭くマスクすることです。日時文字列だけ、アバターの枠だけ、プロモバナーだけ。マスクする領域ごとに自問します。この部分がレイアウトを崩したら、別のテスト層が捕まえるか？答えがノーなら、マスクするのではなく内容を固定する方法を探すべきかもしれません。例えばPlaywrightのclockで決定論的な偽の日時を注入します。"
    ),
    CODE(
      "ts",
      `// visual-stabilize.spec.ts — tất định hóa trước khi so ảnh
import { test, expect } from '@playwright/test';

test('trang sản phẩm ổn định', async ({ page }) => {
  // cố định thời gian -> ngày giờ hiển thị tất định
  await page.clock.setFixedTime(new Date('2026-07-06T09:00:00Z'));
  await page.goto('/product/sku-12345');
  await page.evaluate(() => document.fonts.ready); // chờ web-font

  await expect(page).toHaveScreenshot('product.png', {
    animations: 'disabled',           // tắt animation khi chụp
    mask: [                            // che HẸP các vùng động
      page.getByTestId('promo-banner'),
      page.getByTestId('user-avatar'),
    ],
    maxDiffPixelRatio: 0.01,           // dung sai nhỏ cho anti-aliasing
  });
});`
    ),
    TIP(
      "Ưu tiên cố định nội dung động (clock giả, seed dữ liệu tất định) hơn là mask. Mask giấu vùng khỏi so sánh nên cũng giấu luôn hồi quy có thể xảy ra ở đó; cố định nội dung giữ vùng đó vẫn được kiểm.",
      "Prefer fixing dynamic content (fake clock, deterministic data seed) over masking. A mask hides a region from comparison and therefore also hides any regression that could occur there; fixing the content keeps that region under test.",
      "動的コンテンツの固定（偽のclock、決定論的なデータシード）をマスクより優先してください。マスクは領域を比較から隠すため、そこで起こり得る回帰も隠します。内容の固定はその領域をテスト対象に保ちます。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Dùng embedding để đo khác biệt ngữ nghĩa giữa hai ảnh",
    en: "3. Using embeddings to measure semantic difference between two images",
    ja: "3. 埋め込みで2画像間の意味的差異を測る",
  },
  blocks: [
    P(
      "Ý tưởng cốt lõi của semantic diffing là biểu diễn mỗi ảnh (hoặc mỗi vùng ảnh) thành một vector embedding — một dãy số nắm bắt nội dung ở mức khái niệm chứ không phải mức pixel. Khi baseline và ảnh mới được nhúng vào cùng không gian vector, khoảng cách giữa hai vector phản ánh mức thay đổi về ý nghĩa. Anti-aliasing hay dịch một pixel gần như không làm vector di chuyển, nên khoảng cách nhỏ. Ngược lại, một nút biến mất hay bố cục vỡ làm nội dung khái niệm thay đổi rõ, nên vector cách xa. Đây là lý do embedding lọc được nhiễu mỹ thuật mà pixel-diff không phân biệt nổi.",
      "The core idea of semantic diffing is representing each image (or each image region) as an embedding vector — a sequence of numbers capturing content at a conceptual level rather than a pixel level. When the baseline and the new image are embedded into the same vector space, the distance between the two vectors reflects the degree of change in meaning. Anti-aliasing or a one-pixel shift barely moves the vector, so the distance is small. Conversely, a button vanishing or a layout breaking changes the conceptual content clearly, so the vectors sit far apart. This is why embeddings filter cosmetic noise that pixel diff cannot distinguish.",
      "セマンティック差分の核心は、各画像（または各画像領域）を埋め込みベクトル、つまりピクセルレベルではなく概念レベルで内容を捉える数列として表現することです。ベースラインと新しい画像が同じベクトル空間に埋め込まれると、2ベクトル間の距離が意味の変化度合いを反映します。アンチエイリアスや1ピクセルのずれはベクトルをほとんど動かさないので距離は小さいです。逆に、ボタンの消失やレイアウトの崩れは概念的内容を明確に変えるので、ベクトルは遠く離れます。これが、ピクセル差分が区別できない装飾的ノイズを埋め込みが濾過できる理由です。"
    ),
    P(
      "Tuy nhiên phải cẩn trọng với việc so sánh embedding ở mức toàn ảnh. Một thay đổi nhỏ nhưng quan trọng — ví dụ nút 'Đặt hàng' bị ẩn ở góc dưới — có thể chỉ làm dịch chuyển nhẹ vector toàn trang và bị bỏ qua. Vì vậy cách làm mạnh hơn là chia trang thành các vùng nghiệp vụ (header, khối giá, khối nút hành động, footer) rồi so embedding theo từng vùng. Thay đổi khu trú sẽ nổi bật ở vùng của nó thay vì bị pha loãng trong toàn ảnh. Việc phân vùng theo ý nghĩa cũng giúp báo cáo dễ đọc: 'khối nút hành động thay đổi đáng kể' rõ ràng hơn 'ảnh khác 2%'.",
      "However, be careful with whole-image embedding comparison. A small but important change — for example the 'Place order' button hidden in the bottom corner — may only slightly shift the whole-page vector and get overlooked. So a stronger approach is to split the page into business regions (header, price block, action-button block, footer) and compare embeddings per region. A localized change stands out in its own region instead of being diluted across the whole image. Splitting by meaning also makes reports readable: 'the action-button block changed significantly' is clearer than 'the image differs by 2%'.",
      "ただし、画像全体の埋め込み比較には注意が必要です。小さいが重要な変更（例えば下隅に隠れた「注文する」ボタン）は、ページ全体のベクトルをわずかにずらすだけで見過ごされ得ます。だからより強力なアプローチは、ページを業務領域（ヘッダー、価格ブロック、アクションボタンブロック、フッター）に分割し、領域ごとに埋め込みを比較することです。局所的な変更は画像全体で薄まらず、自分の領域で目立ちます。意味による分割はレポートも読みやすくします。「アクションボタンブロックが大きく変わった」は「画像が2%異なる」より明確です。"
    ),
    CODE(
      "ts",
      `// semantic-diff.ts — so embedding theo VÙNG nghiệp vụ, không chỉ toàn ảnh
type Vec = number[];
function cosineDistance(a: Vec, b: Vec): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  return 1 - dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
}

// mỗi vùng có embedding riêng -> thay đổi khu trú không bị pha loãng
export function diffRegions(base: Record<string, Vec>, next: Record<string, Vec>) {
  return Object.keys(base).map((region) => ({
    region,
    distance: cosineDistance(base[region], next[region]),
  })).sort((x, y) => y.distance - x.distance); // vùng đổi nhiều nhất lên đầu
}`
    ),
    QA(
      "Vì sao nên so embedding theo vùng thay vì toàn ảnh?",
      "Why compare embeddings per region instead of for the whole image?",
      "Vì so toàn ảnh làm loãng thay đổi khu trú: một nút quan trọng bị ẩn chỉ dịch nhẹ vector toàn trang và có thể bị bỏ qua. Chia trang thành vùng nghiệp vụ (header, khối giá, khối nút, footer) và so từng vùng khiến thay đổi khu trú nổi bật đúng chỗ, đồng thời báo cáo dễ đọc hơn: 'khối nút thay đổi đáng kể' rõ hơn 'ảnh khác 2%'.",
      "Because whole-image comparison dilutes localized change: an important button being hidden only slightly shifts the whole-page vector and may be overlooked. Splitting the page into business regions (header, price block, button block, footer) and comparing each makes a localized change stand out in the right place, and reports are more readable: 'the button block changed significantly' beats 'the image differs by 2%'.",
      "画像全体ではなく領域ごとに埋め込みを比較するのはなぜですか？",
      "画像全体の比較は局所的な変更を薄めるからです。重要なボタンが隠れてもページ全体のベクトルをわずかにずらすだけで見過ごされ得ます。ページを業務領域（ヘッダー、価格ブロック、ボタンブロック、フッター）に分割して各々を比較すると、局所的な変更が正しい場所で目立ち、レポートも読みやすくなります。「ボタンブロックが大きく変わった」は「画像が2%異なる」より明確です。"
    ),
    NOTE(
      "Embedding phản ánh nội dung khái niệm, nên khoảng cách nhỏ với thay đổi mỹ thuật (mờ viền, dịch pixel) và lớn với thay đổi cấu trúc (phần tử mất, bố cục vỡ). Nhưng khoảng cách chỉ là tín hiệu — nó cần ngưỡng và oracle để trở thành quyết định.",
      "An embedding reflects conceptual content, so the distance is small for cosmetic changes (blurred edges, pixel shift) and large for structural ones (missing elements, broken layout). But the distance is only a signal — it needs a threshold and an oracle to become a decision.",
      "埋め込みは概念的内容を反映するので、装飾的変更（ぼやけた縁、ピクセルずれ）では距離が小さく、構造的変更（要素の欠落、レイアウト崩れ）では大きくなります。しかし距離は信号にすぎず、判定になるにはしきい値とオラクルが必要です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. Phát hiện layout-shift: khi phần tử dịch chuyển sai chỗ",
    en: "4. Detecting layout shift: when elements move to the wrong place",
    ja: "4. レイアウトシフトの検出：要素が誤った場所へ動くとき",
  },
  blocks: [
    P(
      "Một lớp hồi quy giao diện đặc biệt quan trọng với thương mại điện tử là layout-shift: phần tử vẫn còn đó, vẫn đúng nội dung, nhưng dịch sang vị trí sai — nút thanh toán bị đẩy xuống dưới màn hình, giá sản phẩm nhảy sang cột khác, hay khối khuyến mãi chồng lên nút Thêm giỏ hàng. Pixel-diff bắt loại lỗi này rất kém vì tổng số pixel khác có thể vẫn nhỏ nếu phần tử chỉ dịch chút ít. Ngược lại, so sánh dựa trên hộp giới hạn (bounding box) của các phần tử nghiệp vụ bắt layout-shift trực tiếp: bạn đối chiếu toạ độ và kích thước của từng phần tử giữa baseline và bản mới.",
      "A class of UI regression especially important for e-commerce is layout shift: an element is still present, still with the right content, but moved to the wrong position — the checkout button pushed below the fold, the product price jumping to another column, or the promo block overlapping the Add to cart button. Pixel diff catches this class poorly because the total count of differing pixels can stay small if an element only moves slightly. In contrast, comparison based on the bounding boxes of business elements catches layout shift directly: you compare each element's coordinates and size between the baseline and the new version.",
      "ECにとって特に重要なUI回帰の一種がレイアウトシフトです。要素は存在し、内容も正しいのに、誤った位置へ動きます。決済ボタンが画面下に押し出され、商品価格が別の列へ飛び、プロモブロックがカート追加ボタンに重なる、などです。ピクセル差分はこの種を捕まえるのが下手です。要素がわずかに動くだけなら異なるピクセルの総数は小さいままだからです。対照的に、業務要素のバウンディングボックスに基づく比較はレイアウトシフトを直接捕まえます。ベースラインと新版で各要素の座標とサイズを対照します。"
    ),
    P(
      "Cách tiếp cận này ghép rất tự nhiên với ARIA snapshot kèm bounding box của Playwright. Với mỗi phần tử nghiệp vụ then chốt — nút Đặt hàng, khối tổng tiền, ô mã giảm giá — bạn ghi lại vai trò, tên và hộp giới hạn của nó ở baseline, rồi kiểm rằng ở bản mới nó vẫn nằm trong vùng cho phép. Điều quan trọng là đặt dung sai hợp lý: một vài pixel dịch chuyển do khác font-render là bình thường, nhưng nút Đặt hàng rơi xuống dưới nếp gấp màn hình là hồi quy nghiêm trọng ảnh hưởng trực tiếp tới tỉ lệ chuyển đổi. Oracle ở đây là bất biến về vị trí tương đối, không phải sự trùng khớp pixel tuyệt đối.",
      "This approach pairs naturally with Playwright's ARIA snapshot that includes bounding boxes. For each key business element — the Place order button, the total block, the coupon input — you record its role, name and bounding box at the baseline, then check that in the new version it still lies within an allowed region. The important thing is to set a reasonable tolerance: a few pixels of shift from different font rendering is normal, but the Place order button dropping below the fold is a serious regression that directly hits the conversion rate. The oracle here is an invariant about relative position, not absolute pixel coincidence.",
      "このアプローチは、バウンディングボックスを含むPlaywrightのARIAスナップショットと自然に組み合わさります。各主要業務要素（注文するボタン、合計ブロック、クーポン入力欄）について、ベースラインでその役割、名前、バウンディングボックスを記録し、新版でも許容領域内にあることを確認します。重要なのは妥当な許容差の設定です。フォントレンダリングの違いによる数ピクセルのずれは正常ですが、注文するボタンが画面の折り目より下に落ちるのは、コンバージョン率に直接響く深刻な回帰です。ここでのオラクルは絶対的なピクセル一致ではなく、相対位置に関する不変条件です。"
    ),
    CODE(
      "ts",
      `// layout-shift.spec.ts — bắt dịch chuyển bố cục qua bounding box
import { test, expect } from '@playwright/test';

test('nút Đặt hàng không bị đẩy khỏi vùng nhìn thấy', async ({ page }) => {
  await page.goto('/checkout');
  const btn = page.getByRole('button', { name: /đặt hàng|place order/i });
  const box = await btn.boundingBox();
  const viewport = page.viewportSize()!;

  // bất biến vị trí: nút phải nằm trong nếp gấp màn hình đầu tiên
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
  // dung sai ngang nhỏ so với baseline đã lưu
  const baselineX = 480; // ví dụ toạ độ baseline
  expect(Math.abs(box!.x - baselineX)).toBeLessThanOrEqual(8);
});`
    ),
    WARN(
      "Đừng chỉ dựa vào tổng số pixel khác để bắt layout-shift. Một phần tử quan trọng dịch xuống dưới nếp gấp có thể tạo rất ít pixel khác nhưng phá vỡ luồng chuyển đổi. Hãy khẳng định bất biến vị trí của phần tử nghiệp vụ một cách tường minh.",
      "Do not rely on the total count of differing pixels to catch layout shift. An important element moving below the fold can produce very few differing pixels yet break the conversion flow. Assert the position invariant of business elements explicitly.",
      "レイアウトシフトの検出を異なるピクセルの総数だけに頼らないでください。重要な要素が折り目より下へ動くと、異なるピクセルはごくわずかでもコンバージョンフローを壊し得ます。業務要素の位置不変条件を明示的にアサーションしてください。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "5. Phân loại có nghĩa và mỹ thuật: đặt AI đúng chỗ",
    en: "5. Classifying meaningful vs cosmetic: putting AI in the right place",
    ja: "5. 意味的と装飾的の分類：AIを正しい位置に置く",
  },
  blocks: [
    P(
      "AI phát huy giá trị lớn nhất ở bước phân loại: sau khi phát hiện có khác biệt, quyết định khác biệt đó có nghĩa hay chỉ mỹ thuật. Thay đổi mỹ thuật gồm khác biệt anti-aliasing, thay đổi màu vi tế do nén ảnh, dịch một vài pixel do sub-pixel rendering. Thay đổi có nghĩa gồm phần tử biến mất hay xuất hiện, chữ chồng lên nhau, ảnh vỡ, màu sai lệch rõ (nút xanh thành xám), hay bố cục sụp. Một mô hình được huấn luyện hoặc nhắc đúng cách có thể gán nhãn từng vùng khác biệt, và chỉ những vùng 'có nghĩa' mới cần con người xem.",
      "AI delivers the greatest value at the classification step: after a difference is detected, deciding whether that difference is meaningful or merely cosmetic. Cosmetic changes include anti-aliasing differences, subtle color shifts from image compression, a few pixels of shift from sub-pixel rendering. Meaningful changes include an element vanishing or appearing, text overlapping, a broken image, a clear color mismatch (a green button turning gray), or a collapsed layout. A model that is trained or prompted correctly can label each differing region, and only the 'meaningful' regions need human review.",
      "AIは分類ステップで最大の価値を発揮します。差異が検出された後、その差異が意味的か単に装飾的かを判定します。装飾的変更にはアンチエイリアスの違い、画像圧縮による微妙な色ずれ、サブピクセルレンダリングによる数ピクセルのずれが含まれます。意味的変更には要素の消失や出現、テキストの重なり、壊れた画像、明確な色の不一致（緑のボタンが灰色になる）、崩れたレイアウトが含まれます。正しく訓練またはプロンプトされたモデルは各差異領域にラベルを付け、「意味的」な領域だけが人間のレビューを必要とします。"
    ),
    P(
      "Điều then chốt là AI không đưa ra phán quyết cuối cùng 'pass/fail' mà chỉ phân loại và ưu tiên. Kết quả của nó là một danh sách xếp hạng: đây là các vùng có khả năng cao là hồi quy thật, hãy xem trước; kia là các vùng gần chắc là nhiễu mỹ thuật, có thể bỏ qua. Quyết định pass/fail vẫn thuộc về oracle và con người review. Cách đặt AI như một bộ lọc và bộ xếp hạng — chứ không phải quan tòa — giữ cho hệ thống an toàn: nếu AI phân loại sai một vùng thành mỹ thuật trong khi nó là hồi quy, các cơ chế khác (kiểm tra bounding box, assertion chức năng) vẫn còn cơ hội bắt được.",
      "The key point is that AI does not make the final pass/fail verdict but only classifies and prioritizes. Its output is a ranked list: these are the regions most likely to be real regressions, review them first; those are the regions almost certainly cosmetic noise, you may skip them. The pass/fail decision still belongs to the oracle and human review. Placing AI as a filter and ranker — not a judge — keeps the system safe: if the AI misclassifies a region as cosmetic when it is a regression, other mechanisms (bounding-box checks, functional assertions) still get a chance to catch it.",
      "重要なのは、AIが最終的な合否判定を下すのではなく、分類と優先順位付けだけをすることです。その出力はランク付けされたリストです。これらは本物の回帰である可能性が最も高い領域なので先にレビューし、あれらはほぼ確実に装飾的ノイズなので飛ばしてよい、と。合否の判定は依然としてオラクルと人間のレビューに属します。AIを審判ではなくフィルターとランカーとして置くことがシステムを安全に保ちます。AIがある領域を回帰なのに装飾的と誤分類しても、他の機構（バウンディングボックス検査、機能アサーション）がまだ捕まえる機会を持ちます。"
    ),
    IMG(
      `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="260" rx="12" fill="#0c4a6e"/>
<text x="320" y="30" text-anchor="middle" fill="#bae6fd" font-size="15" font-weight="800">AI là bộ lọc + xếp hạng, không phải quan tòa</text>
<rect x="30" y="56" width="130" height="54" rx="9" fill="#075985" stroke="#7dd3fc" stroke-width="2"/>
<text x="95" y="80" text-anchor="middle" fill="#e0f2fe" font-size="12" font-weight="800">Khác biệt</text>
<text x="95" y="98" text-anchor="middle" fill="#bae6fd" font-size="10">phát hiện được</text>
<rect x="190" y="56" width="150" height="54" rx="9" fill="#075985" stroke="#7dd3fc" stroke-width="2"/>
<text x="265" y="80" text-anchor="middle" fill="#e0f2fe" font-size="12" font-weight="800">AI phân loại</text>
<text x="265" y="98" text-anchor="middle" fill="#bae6fd" font-size="10">có nghĩa / mỹ thuật</text>
<rect x="370" y="46" width="240" height="34" rx="8" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="490" y="68" text-anchor="middle" fill="#dcfce7" font-size="11" font-weight="700">Có nghĩa -> người review</text>
<rect x="370" y="90" width="240" height="34" rx="8" fill="#3f3f46" stroke="#a1a1aa" stroke-width="2"/>
<text x="490" y="112" text-anchor="middle" fill="#e4e4e7" font-size="11">Mỹ thuật -> bỏ qua</text>
<rect x="120" y="150" width="400" height="70" rx="10" fill="#78350f" stroke="#fcd34d" stroke-width="2"/>
<text x="320" y="178" text-anchor="middle" fill="#fef3c7" font-size="12" font-weight="800">Oracle + con người giữ quyết định pass/fail</text>
<text x="320" y="202" text-anchor="middle" fill="#fde68a" font-size="11">nếu AI phân sai, bounding box + assertion chức năng vẫn bắt</text>
<path d="M160 83 L190 83" stroke="#7dd3fc" stroke-width="3"/>
<path d="M340 78 L370 63" stroke="#86efac" stroke-width="3"/>
<path d="M340 88 L370 107" stroke="#a1a1aa" stroke-width="3"/>
</svg>`,
      "AI phân loại và xếp hạng vùng khác biệt; oracle và con người giữ quyết định cuối.",
      "AI classifies and ranks differing regions; the oracle and humans keep the final decision.",
      "AIは差異領域を分類しランク付けする。合否の最終判定はオラクルと人間が保持する。"
    ),
    QA(
      "AI nên đóng vai trò gì trong visual regression?",
      "What role should AI play in visual regression?",
      "AI nên là bộ lọc và bộ xếp hạng, không phải quan tòa. Nó phân loại vùng khác biệt thành có nghĩa (phần tử mất, chữ chồng, bố cục vỡ) và mỹ thuật (anti-aliasing, dịch pixel), rồi xếp hạng để con người xem vùng khả nghi trước. Quyết định pass/fail vẫn thuộc oracle và người review. Nhờ vậy nếu AI phân sai, các cơ chế khác như kiểm bounding box và assertion chức năng vẫn còn cơ hội bắt lỗi.",
      "AI should be a filter and ranker, not a judge. It classifies differing regions into meaningful (missing element, overlapping text, broken layout) and cosmetic (anti-aliasing, pixel shift), then ranks so humans review the suspicious regions first. The pass/fail decision still belongs to the oracle and reviewer. This way, if the AI misclassifies, other mechanisms like bounding-box checks and functional assertions still have a chance to catch the bug.",
      "ビジュアルリグレッションでAIはどんな役割を果たすべきですか？",
      "AIは審判ではなくフィルターとランカーであるべきです。差異領域を意味的（要素の欠落、テキストの重なり、レイアウト崩れ）と装飾的（アンチエイリアス、ピクセルずれ）に分類し、人間が疑わしい領域を先にレビューできるようランク付けします。合否の判定は依然オラクルとレビュー担当者に属します。こうすればAIが誤分類しても、バウンディングボックス検査や機能アサーションなど他の機構がバグを捕まえる機会を持ちます。"
    ),
    TIP(
      "Khi nhắc mô hình phân loại, hãy yêu cầu nó xuất kèm lý do và độ tin cậy cho mỗi nhãn. Lý do giúp người review kiểm nhanh phán đoán của AI, còn độ tin cậy cho phép đặt ngưỡng gate thay vì tin mù quáng.",
      "When prompting the model to classify, ask it to output a reason and a confidence for each label. The reason lets a reviewer quickly check the AI's judgment, and the confidence lets you set a gate threshold instead of trusting blindly.",
      "モデルに分類をプロンプトするとき、各ラベルに理由と信頼度を出力させてください。理由はレビュー担当者がAIの判断を素早く確認するのに役立ち、信頼度は盲目的に信じる代わりにゲートしきい値を設定できるようにします。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Quản lý baseline: cập nhật có kỷ luật, không 'accept all'",
    en: "6. Baseline management: disciplined updates, no 'accept all'",
    ja: "6. ベースライン管理：規律ある更新、「全承認」なし",
  },
  blocks: [
    P(
      "Baseline là bộ ảnh chuẩn mà mọi bản mới được so vào — và nó là điểm yếu bị lạm dụng nhiều nhất trong visual regression. Khi một thay đổi hợp lệ về thiết kế xảy ra, ảnh mới khác baseline, test fail đúng như mong đợi, và ai đó phải cập nhật baseline. Cạm bẫy là nút 'accept all' hay lệnh cập nhật hàng loạt: dưới áp lực thời gian, đội dễ chấp nhận toàn bộ ảnh mới làm baseline mà không thực sự nhìn từng cái. Khi đó nếu trong đám thay đổi hợp lệ lẫn một hồi quy thật, hồi quy đó vừa được 'phong' thành chuẩn mới và sẽ không bao giờ bị bắt nữa.",
      "The baseline is the set of reference images every new build is compared against — and it is the most abused weak point in visual regression. When a legitimate design change happens, the new image differs from the baseline, the test fails as expected, and someone must update the baseline. The trap is the 'accept all' button or the bulk update command: under time pressure, a team easily accepts all new images as the baseline without actually looking at each one. Then if a real regression is mixed in among the legitimate changes, that regression has just been crowned the new standard and will never be caught again.",
      "ベースラインは、すべての新ビルドが比較される参照画像のセットであり、ビジュアルリグレッションで最も悪用される弱点です。正当なデザイン変更が起こると、新しい画像はベースラインと異なり、テストは期待通り失敗し、誰かがベースラインを更新せねばなりません。罠は「全承認」ボタンや一括更新コマンドです。時間の圧力の下で、チームは各々を実際に見ずに全新画像をベースラインとして承認しがちです。すると正当な変更の中に本物の回帰が混じっていれば、その回帰は新しい標準として戴冠され、二度と捕まりません。"
    ),
    P(
      "Kỷ luật baseline lành mạnh trông như thế này: cập nhật baseline luôn đi qua một pull request có review, giống như thay đổi mã nguồn. Mỗi ảnh baseline mới phải kèm khác biệt trực quan trước/sau và một lý do ngắn ('đội design đổi màu nút CTA sang cam theo brand mới'). Người review nhìn từng khác biệt, xác nhận đó là thay đổi có chủ đích, rồi mới merge. Baseline được version-control cùng mã, nên bạn luôn biết ai đổi, khi nào và vì sao. Cách này biến baseline từ một hố đen thành một hiện vật có thể kiểm toán — và chính khả năng kiểm toán đó ngăn hồi quy lẻn vào làm chuẩn.",
      "Healthy baseline discipline looks like this: baseline updates always go through a reviewed pull request, just like source-code changes. Each new baseline image must come with a before/after visual diff and a short reason ('the design team changed the CTA button color to orange per the new brand'). A reviewer looks at each diff, confirms it is an intentional change, and only then merges. The baseline is version-controlled alongside the code, so you always know who changed it, when, and why. This turns the baseline from a black hole into an auditable artifact — and it is exactly that auditability that prevents a regression from sneaking in as the standard.",
      "健全なベースライン規律はこう見えます。ベースライン更新は、ソースコード変更と同様に、常にレビュー付きプルリクエストを通します。各新ベースライン画像には前後のビジュアル差分と短い理由（「デザインチームが新ブランドに沿ってCTAボタンの色をオレンジに変えた」）が伴わねばなりません。レビュー担当者が各差分を見て意図的な変更だと確認し、その後初めてマージします。ベースラインはコードと共にバージョン管理されるので、誰がいつなぜ変えたか常に分かります。これはベースラインをブラックホールから監査可能な成果物に変え、まさにその監査可能性が回帰が標準として忍び込むのを防ぎます。"
    ),
    CODE(
      "yaml",
      `# .github/workflows/visual.yml — baseline đổi PHẢI qua PR review
name: visual-regression
on: [pull_request]
jobs:
  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      # KHÔNG dùng --update-snapshots tự động trên CI nhánh chính
      - run: npx playwright test --project=visual
      # Khi fail: tải diff lên artifact để người review xem trong PR
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: test-results/**/*-diff.png
      # Baseline mới chỉ được commit trong PR riêng, có người duyệt từng ảnh`
    ),
    SCEN(
      "Accept all nuốt mất một hồi quy",
      "Accept all swallows a regression",
      "Sát ngày phát hành, thiết kế đổi nhiều màu nên 30 ảnh visual fail. Một kỹ sư chạy update-snapshots hàng loạt để 'cho xanh'. Trong 30 ảnh đó có một trang mà nút Đặt hàng bị lỗi CSS đẩy ra ngoài khung nhìn — nhưng nó được chấp nhận cùng cả đám. Baseline mới ghi nhận nút sai chỗ là 'đúng'. Hai tuần sau tỉ lệ hoàn tất thanh toán tụt. Sửa: cấm update hàng loạt; mỗi baseline mới phải qua PR, người review nhìn từng diff kèm lý do.",
      "Near release, the design changed many colors so 30 visual images failed. An engineer ran bulk update-snapshots to 'go green'. Among those 30 was a page where the Place order button was pushed off-viewport by a CSS bug — but it was accepted along with the rest. The new baseline recorded the misplaced button as 'correct'. Two weeks later, checkout completion dropped. Fix: forbid bulk updates; every new baseline must go through a PR where a reviewer looks at each diff with a reason.",
      "全承認が回帰を飲み込んだ事例",
      "リリース間際、デザインが多くの色を変えたため30枚のビジュアル画像が失敗しました。あるエンジニアが「緑にする」ために一括update-snapshotsを実行しました。その30枚の中に、CSSバグで注文するボタンがビューポート外へ押し出されたページがありましたが、他と一緒に承認されました。新ベースラインは位置ずれしたボタンを「正しい」と記録しました。2週間後、決済完了率が下がりました。修正：一括更新を禁止し、各新ベースラインは理由付きで各差分をレビュー担当者が見るPRを通さねばなりません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Khi phán đoán của AI không đáng tin và cách đặt cổng",
    en: "7. When AI judgment is unreliable and how to gate it",
    ja: "7. AIの判断が信頼できないときとゲート方法",
  },
  blocks: [
    P(
      "AI phân loại không phải lúc nào cũng đúng, và biết khi nào nó dễ sai quan trọng ngang việc dùng nó. Có vài vùng nguy hiểm điển hình: thay đổi màu tinh tế mang ý nghĩa nghiệp vụ (nút bị disable chuyển xám nhạt — AI dễ coi là mỹ thuật trong khi nó báo trạng thái quan trọng); văn bản đọc sai do độ phân giải thấp; nội dung phụ thuộc ngữ cảnh mà mô hình không biết (một biểu tượng cảnh báo mới xuất hiện có thể là tính năng cố ý hoặc lỗi, AI không có cách nào tự biết). Ở những vùng này, tin AI mù quáng là công thức cho cả dương tính giả lẫn âm tính giả.",
      "AI classification is not always right, and knowing when it tends to err matters as much as using it. There are a few classic danger zones: subtle color changes that carry business meaning (a disabled button turning light gray — the AI easily calls it cosmetic while it signals an important state); text misread at low resolution; context-dependent content the model does not know about (a new warning icon appearing could be an intentional feature or a bug, and the AI has no way to know by itself). In these zones, trusting the AI blindly is a recipe for both false positives and false negatives.",
      "AI分類は常に正しいわけではなく、いつ誤りやすいかを知ることは、それを使うことと同じくらい重要です。典型的な危険地帯がいくつかあります。業務的意味を持つ微妙な色変化（無効化されたボタンが薄い灰色になる。AIはそれを装飾的と呼びがちですが、重要な状態を示します）、低解像度で誤読されるテキスト、モデルが知らない文脈依存の内容（新しい警告アイコンの出現は意図的な機能かバグか、AIには自力で知る術がありません）です。これらの地帯でAIを盲目的に信じるのは、偽陽性と偽陰性の両方を招くレシピです。"
    ),
    P(
      "Cách đặt cổng đúng dựa trên độ tin cậy và mức rủi ro của vùng. Với các vùng rủi ro cao — khối nút hành động, khối giá, khối trạng thái đơn hàng — hãy hạ ngưỡng để bất kỳ khác biệt nào cũng leo lên cho con người xem, bất kể AI nói gì. Với vùng rủi ro thấp — footer, khối trang trí — bạn có thể tin AI nhiều hơn. Đồng thời, khi độ tin cậy của AI thấp (nó lưỡng lự giữa hai nhãn), mặc định phải là leo thang lên con người, không phải im lặng bỏ qua. Nguyên tắc bao trùm vẫn là fail-safe: khi nghi ngờ, ưu tiên đưa cho người xem, vì bỏ sót hồi quy ở khối thanh toán đắt hơn nhiều một lần review thừa.",
      "The right gating is based on the confidence and the risk level of the region. For high-risk regions — the action-button block, the price block, the order-status block — lower the threshold so any difference escalates to a human, regardless of what the AI says. For low-risk regions — the footer, decorative blocks — you can trust the AI more. At the same time, when the AI's confidence is low (it hesitates between two labels), the default must be escalation to a human, not silent skipping. The overarching principle is still fail-safe: when in doubt, prefer to show a human, because missing a regression in the checkout block is far more expensive than one extra review.",
      "正しいゲートは、領域の信頼度とリスクレベルに基づきます。高リスク領域（アクションボタンブロック、価格ブロック、注文状態ブロック）では、AIが何と言おうと、あらゆる差異が人間へエスカレーションするようしきい値を下げます。低リスク領域（フッター、装飾ブロック）ではAIをより信頼できます。同時に、AIの信頼度が低いとき（2つのラベルの間で迷うとき）、既定は黙って飛ばすのではなく人間へのエスカレーションであるべきです。包括的な原則は依然フェイルセーフです。疑わしいときは人間に見せることを優先します。決済ブロックで回帰を見逃すことは、1回の余分なレビューよりはるかに高くつくからです。"
    ),
    CODE(
      "ts",
      `// visual-gate.ts — cổng theo rủi ro vùng + độ tin cậy AI, fail-safe
type Verdict = { region: string; aiLabel: 'meaningful'|'cosmetic'; confidence: number };
const HIGH_RISK = new Set(['action-buttons', 'price', 'order-status', 'checkout']);

export function gate(v: Verdict): 'escalate' | 'pass' {
  // Vùng rủi ro cao: mọi khác biệt leo lên người, bất kể AI nói gì
  if (HIGH_RISK.has(v.region)) return 'escalate';
  // AI lưỡng lự -> leo thang, không im lặng bỏ qua
  if (v.confidence < 0.85) return 'escalate';
  // Chỉ bỏ qua khi AI tự tin đây là mỹ thuật ở vùng rủi ro thấp
  if (v.aiLabel === 'cosmetic') return 'pass';
  return 'escalate';   // mặc định an toàn: khi nghi ngờ, đưa cho người
}`
    ),
    QA(
      "Khi nào không nên tin phán đoán 'mỹ thuật' của AI?",
      "When should you not trust the AI's 'cosmetic' verdict?",
      "Khi vùng có rủi ro nghiệp vụ cao (khối nút hành động, giá, trạng thái đơn, thanh toán) hoặc khi độ tin cậy AI thấp. Màu tinh tế có thể mang nghĩa (nút disable chuyển xám), text độ phân giải thấp dễ đọc sai, và nội dung phụ thuộc ngữ cảnh mô hình không biết. Cổng nên fail-safe: vùng rủi ro cao và trường hợp AI lưỡng lự đều leo thang lên người xem, vì bỏ sót hồi quy ở khối thanh toán đắt hơn nhiều một lần review thừa.",
      "When the region carries high business risk (action-button, price, order-status, checkout blocks) or when the AI confidence is low. Subtle colors can carry meaning (a disabled button turning gray), low-resolution text is easily misread, and context-dependent content is unknown to the model. The gate should be fail-safe: high-risk regions and cases where the AI hesitates both escalate to a human, because missing a regression in the checkout block is far more expensive than one extra review.",
      "AIの「装飾的」という判断を信頼すべきでないのはいつですか？",
      "領域が高い業務リスクを持つとき（アクションボタン、価格、注文状態、決済ブロック）、またはAIの信頼度が低いときです。微妙な色は意味を持ち得（無効化ボタンが灰色になる）、低解像度のテキストは誤読されやすく、文脈依存の内容はモデルに知られていません。ゲートはフェイルセーフであるべきです。高リスク領域とAIが迷う場合はどちらも人間へエスカレーションします。決済ブロックで回帰を見逃すことは1回の余分なレビューよりはるかに高くつくからです。"
    ),
    WARN(
      "Đừng để AI tự động 'pass' một khác biệt ở khối thanh toán hay khối giá chỉ vì nó gán nhãn mỹ thuật. Những vùng này ảnh hưởng trực tiếp doanh thu; luôn leo thang cho con người bất kể độ tin cậy của AI.",
      "Do not let the AI auto-'pass' a difference in the checkout or price block just because it labeled it cosmetic. These regions directly affect revenue; always escalate to a human regardless of the AI's confidence.",
      "AIが装飾的とラベル付けしたからといって、決済ブロックや価格ブロックの差異をAIに自動「合格」させないでください。これらの領域は収益に直接影響します。AIの信頼度に関わらず常に人間へエスカレーションしてください。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Chọn scope chụp: full-page, component hay vùng nghiệp vụ",
    en: "8. Choosing capture scope: full-page, component or business region",
    ja: "8. キャプチャ範囲の選択：全ページ、コンポーネント、業務領域",
  },
  blocks: [
    P(
      "Phạm vi bạn chụp quyết định chất lượng của toàn bộ visual regression. Chụp full-page cho ảnh phủ rộng nhưng cực kỳ giòn: bất kỳ thay đổi nhỏ nào ở đầu trang cũng đẩy toàn bộ nội dung bên dưới xuống, khiến mọi thứ 'khác' và tạo nhiễu khổng lồ. Chụp ở mức component — một thẻ sản phẩm, một form thanh toán — ổn định hơn nhiều vì thay đổi ở nơi khác không ảnh hưởng. Nguyên tắc thực dụng là chụp ở mức nhỏ nhất mà vẫn giữ được ngữ cảnh nghiệp vụ cần kiểm: đủ rộng để thấy quan hệ giữa các phần tử, đủ hẹp để không hứng nhiễu từ phần không liên quan.",
      "The scope you capture determines the quality of the whole visual regression. Full-page capture gives broad coverage but is extremely brittle: any small change at the top of the page pushes all content below down, making everything 'different' and creating enormous noise. Component-level capture — a single product card, a checkout form — is far more stable because changes elsewhere do not affect it. The pragmatic principle is to capture at the smallest scope that still preserves the business context you need to check: wide enough to see relationships between elements, narrow enough not to absorb noise from unrelated parts.",
      "キャプチャする範囲がビジュアルリグレッション全体の品質を決めます。全ページキャプチャは広い網羅を与えますが極めて脆いです。ページ上部の小さな変更が下のすべての内容を押し下げ、すべてを「異なる」ものにし膨大なノイズを生みます。コンポーネントレベルのキャプチャ（1つの商品カード、決済フォーム）は、他の場所の変更が影響しないためはるかに安定します。実用的な原則は、確認すべき業務文脈を保つ最小の範囲でキャプチャすることです。要素間の関係を見るのに十分広く、無関係な部分からノイズを吸わないのに十分狭く。"
    ),
    P(
      "Trên sàn của chúng ta, một chiến lược phân tầng hiệu quả: chụp component cho các khối tái sử dụng (thẻ sản phẩm, nút CTA, khối giá) để bắt hồi quy khu trú với độ ổn định cao; chụp vùng nghiệp vụ cho các luồng then chốt (toàn bộ form thanh toán) để bắt vấn đề tương tác giữa các phần tử như chồng lấp; và chỉ dùng full-page một cách chọn lọc cho vài trang tổng thể quan trọng, kèm mask kỷ luật. Cách phân tầng này cho bạn độ phủ mà không phải trả giá bằng biển nhiễu — mỗi cấp scope phục vụ một mục tiêu kiểm thử rõ ràng thay vì chụp bừa rồi vật lộn với dương tính giả.",
      "On our marketplace, an effective tiered strategy: component captures for reusable blocks (product card, CTA button, price block) to catch localized regressions with high stability; business-region captures for key flows (the entire checkout form) to catch interaction problems between elements such as overlap; and full-page only selectively for a few important overview pages, with disciplined masking. This tiering gives you coverage without paying in a sea of noise — each scope tier serves a clear testing goal instead of capturing indiscriminately and then wrestling with false positives.",
      "私たちのマーケットプレイスでは、効果的な階層戦略があります。再利用ブロック（商品カード、CTAボタン、価格ブロック）にはコンポーネントキャプチャで、高い安定性で局所的な回帰を捕まえます。主要フロー（決済フォーム全体）には業務領域キャプチャで、重なりのような要素間の相互作用問題を捕まえます。そして全ページは、規律あるマスクとともに、いくつかの重要な概観ページに選択的にのみ使います。この階層化は、ノイズの海で代償を払わずに網羅を与えます。各範囲層は、無差別にキャプチャして偽陽性と格闘する代わりに、明確なテスト目標に奉仕します。"
    ),
    CODE(
      "ts",
      `// scope.spec.ts — chụp theo component/vùng, hạn chế full-page giòn
import { test, expect } from '@playwright/test';

test('component: thẻ sản phẩm ổn định', async ({ page }) => {
  await page.goto('/product/sku-12345');
  const card = page.getByTestId('product-card');
  // chụp riêng component -> thay đổi nơi khác không gây nhiễu
  await expect(card).toHaveScreenshot('product-card.png', { animations: 'disabled' });
});

test('vùng nghiệp vụ: form thanh toán bắt chồng lấp', async ({ page }) => {
  await page.goto('/checkout');
  const form = page.getByTestId('checkout-form');
  await expect(form).toHaveScreenshot('checkout-form.png', { animations: 'disabled' });
});`
    ),
    TIP(
      "Chụp ở mức component cho các khối tái sử dụng nhiều nhất (nút CTA, thẻ sản phẩm). Chúng xuất hiện khắp nơi, nên bắt hồi quy ở component một lần bảo vệ mọi trang dùng nó, với độ ổn định cao hơn full-page.",
      "Capture at component level for the most heavily reused blocks (CTA button, product card). They appear everywhere, so catching a regression at the component once protects every page that uses it, with far higher stability than full-page.",
      "最も多く再利用されるブロック（CTAボタン、商品カード）はコンポーネントレベルでキャプチャしてください。あちこちに現れるので、コンポーネントで回帰を一度捕まえれば、それを使うすべてのページを守れます。全ページよりはるかに高い安定性で。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "9. Kiểm thử đa trình duyệt, đa thiết bị và độ phân giải",
    en: "9. Cross-browser, cross-device and resolution testing",
    ja: "9. クロスブラウザ・クロスデバイス・解像度テスト",
  },
  blocks: [
    P(
      "Một hiểu lầm phổ biến là một ảnh baseline duy nhất đủ cho mọi môi trường. Thực tế, cùng một trang render khác nhau giữa Chromium, Firefox và WebKit do khác biệt về công cụ render font và sub-pixel; khác nhau giữa desktop và mobile do responsive breakpoint; và khác nhau giữa các độ phân giải. Nếu bạn dùng chung một baseline, bạn sẽ hoặc ngập trong dương tính giả do khác biệt render, hoặc buộc phải nới dung sai rộng tới mức bỏ sót hồi quy thật. Giải pháp đúng là baseline riêng cho từng tổ hợp trình duyệt-thiết bị quan trọng, được đặt tên rõ ràng.",
      "A common misconception is that a single baseline image suffices for every environment. In reality, the same page renders differently across Chromium, Firefox and WebKit due to differences in font-rendering engines and sub-pixel; differently between desktop and mobile due to responsive breakpoints; and differently across resolutions. If you share one baseline, you will either drown in false positives from rendering differences, or be forced to widen tolerance so much that you miss real regressions. The right solution is a separate baseline per important browser-device combination, clearly named.",
      "よくある誤解は、単一のベースライン画像がすべての環境に十分だというものです。実際には、同じページがChromium、Firefox、WebKitでフォントレンダリングエンジンとサブピクセルの違いにより異なってレンダーされ、レスポンシブブレークポイントによりデスクトップとモバイルで異なり、解像度によっても異なります。1つのベースラインを共有すると、レンダリングの違いによる偽陽性に溺れるか、本物の回帰を見逃すほど許容差を広げざるを得なくなります。正しい解決策は、重要なブラウザ・デバイスの組み合わせごとに、明確に名付けられた別々のベースラインです。"
    ),
    P(
      "Không phải mọi tổ hợp đều đáng chụp — số lượng bùng nổ tổ hợp có thể làm suite chậm và tốn kém. Hãy chọn theo dữ liệu analytics thật: nếu 70% khách dùng Chrome mobile và Safari iOS, đó là hai môi trường phải phủ trước tiên; các trình duyệt hiếm gặp có thể chỉ kiểm chức năng, không cần visual baseline riêng. Playwright hỗ trợ project theo trình duyệt và emulate thiết bị, nên bạn khai báo ma trận này một cách tường minh trong cấu hình. Việc gắn quyết định phủ với dữ liệu người dùng thật giữ cho chi phí kiểm thử tương xứng với rủi ro kinh doanh.",
      "Not every combination is worth capturing — the combinatorial explosion can make the suite slow and expensive. Choose by real analytics data: if 70% of customers use Chrome mobile and Safari iOS, those are the two environments to cover first; rare browsers can get functional-only testing without their own visual baseline. Playwright supports per-browser projects and device emulation, so you declare this matrix explicitly in the config. Tying the coverage decision to real user data keeps testing cost proportional to business risk.",
      "すべての組み合わせがキャプチャに値するわけではありません。組み合わせ爆発はスイートを遅く高価にし得ます。実際のアナリティクスデータで選びます。顧客の70%がChromeモバイルとSafari iOSを使うなら、それが最初にカバーすべき2環境です。まれなブラウザは独自のビジュアルベースラインなしで機能のみのテストでよいです。Playwrightはブラウザごとのプロジェクトとデバイスエミュレーションをサポートするので、この行列を設定で明示的に宣言します。網羅の決定を実際のユーザーデータに結び付けることが、テストコストを事業リスクに比例させます。"
    ),
    CODE(
      "ts",
      `// playwright.config.ts — baseline riêng theo trình duyệt & thiết bị
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // snapshot đặt tên kèm project -> baseline không lẫn giữa môi trường
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit-iphone',    use: { ...devices['iPhone 14'] } },     // Safari iOS
    { name: 'chromium-pixel',   use: { ...devices['Pixel 7'] } },       // Chrome mobile
  ],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
});`
    ),
    QA(
      "Một baseline chung cho mọi trình duyệt và thiết bị có ổn không?",
      "Is a single shared baseline fine for all browsers and devices?",
      "Không. Cùng một trang render khác nhau giữa Chromium/Firefox/WebKit (font, sub-pixel), giữa desktop/mobile (responsive breakpoint) và giữa các độ phân giải. Dùng chung một baseline dẫn tới ngập dương tính giả hoặc phải nới dung sai rộng đến mức bỏ sót lỗi thật. Nên tạo baseline riêng cho từng tổ hợp trình duyệt-thiết bị quan trọng, chọn theo dữ liệu analytics thật để không bùng nổ tổ hợp.",
      "No. The same page renders differently across Chromium/Firefox/WebKit (font, sub-pixel), between desktop/mobile (responsive breakpoints) and across resolutions. Sharing one baseline leads to a flood of false positives or forces tolerance so wide that real bugs are missed. Create a separate baseline per important browser-device combination, chosen by real analytics data to avoid combinatorial explosion.",
      "すべてのブラウザとデバイスに単一の共有ベースラインで問題ありませんか？",
      "いいえ。同じページがChromium/Firefox/WebKit（フォント、サブピクセル）、デスクトップ/モバイル（レスポンシブブレークポイント）、解像度によって異なってレンダーされます。1つのベースラインを共有すると偽陽性が氾濫するか、本物のバグを見逃すほど許容差を広げざるを得ません。重要なブラウザ・デバイスの組み合わせごとに別々のベースラインを作り、組み合わせ爆発を避けるため実際のアナリティクスデータで選びます。"
    ),
    NOTE(
      "Playwright cho phép định nghĩa project theo trình duyệt và emulate thiết bị, đồng thời đặt tên snapshot kèm tên project. Nhờ đó mỗi môi trường có baseline riêng, không lẫn lộn khi so sánh.",
      "Playwright lets you define projects per browser and emulate devices, and names snapshots with the project name. This gives each environment its own baseline, with no mixing during comparison.",
      "Playwrightはブラウザごとにプロジェクトを定義しデバイスをエミュレートでき、スナップショットにプロジェクト名を付けます。これにより各環境が独自のベースラインを持ち、比較時に混ざりません。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Tích hợp CI và quản lý chi phí review trực quan",
    en: "10. CI integration and managing visual review cost",
    ja: "10. CI統合とビジュアルレビューコストの管理",
  },
  blocks: [
    P(
      "Visual regression chỉ hữu ích nếu kết quả của nó dễ tiếp cận trong quy trình hằng ngày. Khi một test visual fail trên CI, người review cần thấy ngay ba ảnh: baseline, ảnh mới, và ảnh diff làm nổi vùng khác biệt — không phải lục log hay tải file thủ công. Playwright tự sinh ảnh diff và đính vào báo cáo HTML cùng Trace Viewer, nên hãy tải chúng lên artifact của CI và gắn link vào pull request. Mục tiêu là biến mỗi lần fail thành một quyết định hai phút: nhìn diff, phán 'hồi quy thật' hay 'thay đổi có chủ đích', rồi hành động tương ứng.",
      "Visual regression is only useful if its results are easy to access in the daily workflow. When a visual test fails in CI, a reviewer needs to see three images immediately: the baseline, the new image, and a diff image highlighting the changed region — not dig through logs or download files manually. Playwright auto-generates the diff image and attaches it to the HTML report and the Trace Viewer, so upload them to the CI artifacts and link them into the pull request. The goal is to turn each failure into a two-minute decision: look at the diff, judge 'real regression' or 'intentional change', then act accordingly.",
      "ビジュアルリグレッションは、その結果が日々のワークフローで簡単にアクセスできて初めて有用です。CIでビジュアルテストが失敗したとき、レビュー担当者は3つの画像をすぐ見る必要があります。ベースライン、新しい画像、変更領域を強調した差分画像です。ログを漁ったりファイルを手動でダウンロードしたりではなく。Playwrightは差分画像を自動生成しHTMLレポートとTrace Viewerに添付するので、それらをCIのアーティファクトにアップロードしプルリクエストにリンクします。目標は、各失敗を2分の判断に変えることです。差分を見て「本物の回帰」か「意図的な変更」かを判定し、それに応じて行動します。"
    ),
    P(
      "Chi phí ẩn lớn nhất của visual regression là thời gian con người review. Nếu mỗi build tạo hàng trăm khác biệt cần xem, đội sẽ nhanh chóng kiệt sức và bắt đầu bấm 'accept all' — đúng cái bẫy ta đã cảnh báo. Vì thế mọi kỹ thuật trong bài này đều nhằm một mục tiêu chung: giảm số quyết định con người phải đưa ra mà không giảm độ phủ. Ổn định hóa ảnh, mask kỷ luật, semantic diff, phân loại AI, gate theo rủi ro — tất cả đều là bộ lọc dồn về phía trước để tới tay người review chỉ còn những khác biệt thật sự đáng xem. Chỉ số sức khỏe cần theo dõi là số khác biệt cần review mỗi build và tỉ lệ trong đó là hồi quy thật.",
      "The biggest hidden cost of visual regression is human review time. If every build produces hundreds of differences to look at, the team quickly burns out and starts hitting 'accept all' — exactly the trap we warned about. So every technique in this article serves one common goal: reduce the number of decisions humans must make without reducing coverage. Screenshot stabilization, disciplined masking, semantic diff, AI classification, risk-based gating — all are filters pushed to the front so that only genuinely review-worthy differences reach the reviewer. The health metric to track is the number of differences to review per build and the fraction of them that are real regressions.",
      "ビジュアルリグレッションの最大の隠れコストは人間のレビュー時間です。ビルドごとに見るべき差異が数百も生じると、チームはすぐに燃え尽き「全承認」を押し始めます。まさに警告した罠です。だから本稿のすべての技術は共通の目標に奉仕します。網羅を減らさずに人間が下すべき判断の数を減らすことです。スクリーンショットの安定化、規律あるマスク、セマンティック差分、AI分類、リスクベースのゲートは、すべて前方に押し出されたフィルターで、本当にレビューする価値のある差異だけがレビュー担当者に届くようにします。追跡すべき健全性指標は、ビルドごとにレビューすべき差異の数と、そのうち本物の回帰の割合です。"
    ),
    IMG(
      `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="250" rx="12" fill="#0c4a6e"/>
<text x="320" y="30" text-anchor="middle" fill="#bae6fd" font-size="15" font-weight="800">Phễu lọc: giảm số khác biệt cần người review</text>
<polygon points="60,60 580,60 500,100 140,100" fill="#7dd3fc"/>
<text x="320" y="86" text-anchor="middle" fill="#0c4a6e" font-size="12" font-weight="800">Tất cả khác biệt pixel (rất nhiều)</text>
<polygon points="140,104 500,104 440,144 200,144" fill="#38bdf8"/>
<text x="320" y="130" text-anchor="middle" fill="#0c4a6e" font-size="12" font-weight="800">Sau ổn định + mask</text>
<polygon points="200,148 440,148 400,188 240,188" fill="#0ea5e9"/>
<text x="320" y="173" text-anchor="middle" fill="#e0f2fe" font-size="12" font-weight="800">Sau semantic + AI phân loại</text>
<polygon points="240,192 400,192 370,224 270,224" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="320" y="213" text-anchor="middle" fill="#dcfce7" font-size="11" font-weight="800">Người review (ít, đáng xem)</text>
</svg>`,
      "Chuỗi bộ lọc dồn để chỉ còn khác biệt đáng xem tới tay người review.",
      "A chain of filters so only review-worthy differences reach the reviewer.",
      "レビュー担当者に届くのが価値ある差異だけになるよう連なるフィルター。"
    ),
    QA(
      "Làm sao giữ chi phí review visual regression trong tầm kiểm soát?",
      "How do you keep visual-regression review cost under control?",
      "Coi mọi kỹ thuật như bộ lọc dồn về trước để giảm số quyết định con người mà không giảm độ phủ: ổn định hóa ảnh, mask kỷ luật, semantic diff, phân loại AI, gate theo rủi ro. Đưa baseline/ảnh mới/ảnh diff vào artifact CI và PR để mỗi fail thành quyết định hai phút. Theo dõi số khác biệt cần review mỗi build và tỉ lệ là hồi quy thật; nếu số review phình to, đội sẽ bấm 'accept all' và bỏ sót lỗi.",
      "Treat every technique as a filter pushed to the front to cut the number of human decisions without cutting coverage: screenshot stabilization, disciplined masking, semantic diff, AI classification, risk-based gating. Put baseline/new/diff images into CI artifacts and the PR so each failure is a two-minute decision. Track the number of differences to review per build and the fraction that are real regressions; if review count balloons, the team hits 'accept all' and misses bugs.",
      "ビジュアルリグレッションのレビューコストをどう制御下に保ちますか？",
      "すべての技術を、網羅を減らさず人間の判断数を減らすため前方に押し出したフィルターとして扱います。スクリーンショットの安定化、規律あるマスク、セマンティック差分、AI分類、リスクベースのゲートです。ベースライン/新規/差分画像をCIアーティファクトとPRに入れ、各失敗を2分の判断にします。ビルドごとにレビューすべき差異の数と本物の回帰の割合を追跡します。レビュー数が膨らむと、チームは「全承認」を押しバグを見逃します。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Visual regression cho nội dung động và cá nhân hóa",
    en: "11. Visual regression for dynamic and personalized content",
    ja: "11. 動的・パーソナライズ内容のビジュアルリグレッション",
  },
  blocks: [
    P(
      "Sàn thương mại điện tử hiện đại đầy nội dung cá nhân hóa: gợi ý sản phẩm theo lịch sử mua, banner theo phân khúc khách, giá và khuyến mãi theo vùng. Đây là ác mộng cho visual regression ngây thơ, vì chính bản chất của nội dung là thay đổi mỗi lần chạy. Nếu bạn chụp trang chủ với các gợi ý ngẫu nhiên, không có hai lần chạy nào giống nhau và baseline trở nên vô nghĩa. Chìa khóa là tách cấu trúc khỏi nội dung: kiểm rằng khung chứa gợi ý luôn hiển thị đúng vị trí và số lượng, nhưng không kiểm nội dung cụ thể của từng gợi ý.",
      "A modern e-commerce marketplace is full of personalized content: product recommendations by purchase history, banners by customer segment, prices and promotions by region. This is a nightmare for naive visual regression, because the very nature of the content is to change on every run. If you screenshot the homepage with random recommendations, no two runs are alike and the baseline becomes meaningless. The key is to separate structure from content: check that the recommendation container always shows in the right place and count, but do not check the specific content of each recommendation.",
      "現代のECマーケットプレイスはパーソナライズ内容で満ちています。購入履歴による商品レコメンド、顧客セグメントによるバナー、地域による価格とプロモーションです。これは素朴なビジュアルリグレッションにとって悪夢です。内容の本質が実行ごとに変わることだからです。ランダムなレコメンドでホームページをスクリーンショットすると、2つの実行が同じにならずベースラインが無意味になります。鍵は構造を内容から分離することです。レコメンドのコンテナが常に正しい位置と数で表示されることを確認しますが、各レコメンドの具体的な内容は確認しません。"
    ),
    P(
      "Có hai chiến lược bổ sung nhau. Thứ nhất, tiêm dữ liệu tất định trong môi trường test: cố định seed gợi ý, khóa phân khúc khách về một giá trị cố định, đặt vùng địa lý cố định — để nội dung trở nên lặp lại được. Thứ hai, với phần thực sự không thể cố định, chuyển sang kiểm cấu trúc thay vì kiểm hình ảnh: khẳng định 'có đúng bốn thẻ gợi ý, mỗi thẻ có ảnh, tên và giá đúng định dạng' bằng assertion DOM, và chỉ chụp visual phần khung ổn định. Sự kết hợp này giữ được sức mạnh bắt hồi quy trình bày ở phần tĩnh mà không tạo nhiễu từ phần động.",
      "There are two complementary strategies. First, inject deterministic data in the test environment: fix the recommendation seed, lock the customer segment to a fixed value, set a fixed geographic region — to make the content reproducible. Second, for the part that truly cannot be fixed, switch to checking structure instead of checking imagery: assert 'there are exactly four recommendation cards, each with an image, a name and a correctly formatted price' via DOM assertions, and only screenshot the stable frame. This combination keeps the power to catch presentation regressions in the static part without creating noise from the dynamic part.",
      "補完的な2つの戦略があります。第一に、テスト環境で決定論的なデータを注入します。レコメンドのシードを固定し、顧客セグメントを固定値にロックし、地理的地域を固定して、内容を再現可能にします。第二に、本当に固定できない部分については、画像の確認ではなく構造の確認に切り替えます。DOMアサーションで「レコメンドカードがちょうど4枚あり、各々に画像、名前、正しい形式の価格がある」とアサーションし、安定した枠だけをスクリーンショットします。この組み合わせは、動的な部分からノイズを生まずに、静的な部分で表示回帰を捕まえる力を保ちます。"
    ),
    CODE(
      "ts",
      `// personalized.spec.ts — tách CẤU TRÚC khỏi NỘI DUNG động
import { test, expect } from '@playwright/test';

test('khối gợi ý: kiểm cấu trúc, không kiểm nội dung ngẫu nhiên', async ({ page }) => {
  // tiêm seed tất định để nội dung lặp lại được (nếu môi trường cho phép)
  await page.route('**/api/recommendations*', r =>
    r.fulfill({ json: fixedRecommendations }));
  await page.goto('/');

  const cards = page.getByTestId('reco-card');
  await expect(cards).toHaveCount(4);                 // cấu trúc: đúng 4 thẻ
  for (const c of await cards.all()) {
    await expect(c.getByRole('img')).toBeVisible();   // mỗi thẻ có ảnh
    await expect(c.getByTestId('price')).toHaveText(/^₫[\\d.]+$/); // giá đúng định dạng
  }
  // chỉ chụp visual phần khung ổn định, mask vùng nội dung động
  await expect(page.getByTestId('reco-frame'))
    .toHaveScreenshot('reco-frame.png', { mask: [page.getByTestId('reco-content')] });
});`
    ),
    QA(
      "Xử lý nội dung cá nhân hóa trong visual regression thế nào?",
      "How do you handle personalized content in visual regression?",
      "Tách cấu trúc khỏi nội dung. Thứ nhất, tiêm dữ liệu tất định (cố định seed gợi ý, khóa phân khúc, vùng địa lý) để nội dung lặp lại được. Thứ hai, với phần không thể cố định, kiểm cấu trúc bằng assertion DOM ('đúng 4 thẻ, mỗi thẻ có ảnh, giá đúng định dạng') và chỉ chụp visual phần khung ổn định, mask vùng nội dung động. Nhờ đó vẫn bắt hồi quy trình bày phần tĩnh mà không tạo nhiễu từ phần động.",
      "Separate structure from content. First, inject deterministic data (fix the recommendation seed, lock the segment and geo region) so content is reproducible. Second, for the part that cannot be fixed, check structure via DOM assertions ('exactly four cards, each with an image, a correctly formatted price') and only screenshot the stable frame, masking the dynamic content region. This still catches presentation regressions in the static part without noise from the dynamic part.",
      "ビジュアルリグレッションでパーソナライズ内容をどう扱いますか？",
      "構造を内容から分離します。第一に、決定論的なデータを注入し（レコメンドのシード固定、セグメントと地域のロック）内容を再現可能にします。第二に、固定できない部分はDOMアサーションで構造を確認し（「カードがちょうど4枚、各々に画像、正しい形式の価格」）、安定した枠だけをスクリーンショットし動的内容領域をマスクします。これで動的部分からノイズを生まずに静的部分の表示回帰を捕まえます。"
    ),
    TIP(
      "Với dữ liệu không thể cố định (thời gian thực, số liệu trực tiếp), đừng cố ép nó vào ảnh baseline. Chuyển sang assertion cấu trúc và định dạng — đó thường là điều bạn thật sự muốn kiểm, còn hình ảnh cụ thể là thứ yếu.",
      "For data that cannot be fixed (real time, live figures), do not force it into a baseline image. Switch to structure and format assertions — that is usually what you actually want to check, while the specific imagery is secondary.",
      "固定できないデータ（実時間、ライブの数値）は、ベースライン画像に無理に押し込まないでください。構造と形式のアサーションに切り替えます。それが通常あなたが本当に確認したいことであり、具体的な画像は二次的です。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Kết hợp visual, chức năng và accessibility thành lưới nhiều lớp",
    en: "12. Combining visual, functional and accessibility into a layered net",
    ja: "12. ビジュアル・機能・アクセシビリティを多層の網に統合する",
  },
  blocks: [
    P(
      "Không lớp kiểm thử đơn lẻ nào bắt được mọi loại lỗi, và visual regression cũng vậy. Nó mạnh ở bắt lỗi trình bày mà DOM không thấy: chữ chồng lên nhau khi nội dung dài, phần tử bị che bởi overlay, màu tương phản kém. Nhưng nó mù với lỗi nghiệp vụ: một trang trông hoàn hảo vẫn có thể tính sai tổng tiền. Ngược lại, assertion chức năng khẳng định giá trị đúng nhưng không thấy nút bị đẩy khỏi màn hình. Sức mạnh thật đến từ việc xếp chồng các lớp: visual bắt trình bày, chức năng bắt nghiệp vụ, và kiểm accessibility bắt vấn đề role/label mà cả hai kia bỏ sót.",
      "No single test layer catches every kind of bug, and visual regression is no exception. It is strong at catching presentation bugs the DOM does not see: text overlapping when content is long, an element covered by an overlay, poor color contrast. But it is blind to business bugs: a page that looks perfect can still compute the wrong total. Conversely, functional assertions confirm the right value but do not see a button pushed off-screen. The real power comes from stacking layers: visual catches presentation, functional catches business, and accessibility checks catch role/label problems both of the others miss.",
      "単一のテスト層があらゆる種類のバグを捕まえることはなく、ビジュアルリグレッションも例外ではありません。DOMが見ない表示バグを捕まえるのが得意です。内容が長いときのテキストの重なり、オーバーレイに覆われた要素、乏しい色コントラストです。しかし業務バグには盲目です。完璧に見えるページでも合計を誤計算し得ます。逆に、機能アサーションは正しい値を確認しますが、画面外へ押し出されたボタンを見ません。真の力は層を積み重ねることから来ます。ビジュアルが表示を、機能が業務を、アクセシビリティ検査が他の2つが見逃す役割/ラベルの問題を捕まえます。"
    ),
    P(
      "Cách phối lớp hiệu quả là để mỗi lớp làm đúng việc nó giỏi nhất và tránh chồng chéo lãng phí. Với luồng thanh toán trên sàn của chúng ta: assertion chức năng khẳng định tổng tiền, thuế và giảm giá tính đúng — đây là oracle nghiệp vụ mạnh; visual regression bắt việc form vỡ bố cục hay nút bị che; và kiểm accessibility (ví dụ qua axe) khẳng định nút Đặt hàng có accessible name đúng và tương phản đủ. Ba lớp này cùng chạy trong một suite, chia sẻ cùng thiết lập trang, cho độ phủ mà không lớp nào phải gánh vai trò của lớp khác. Đây chính là tư duy oracle-first áp dụng ở cấp kiến trúc: mỗi lớp có một oracle rõ ràng cho loại lỗi nó chịu trách nhiệm.",
      "The effective way to compose layers is to let each do what it is best at and avoid wasteful overlap. For our marketplace's checkout flow: functional assertions confirm the total, tax and discount compute correctly — this is the strong business oracle; visual regression catches the form breaking layout or a button being covered; and accessibility checks (e.g. via axe) confirm the Place order button has the correct accessible name and sufficient contrast. These three layers run together in one suite, share the same page setup, and give coverage without any layer having to carry another's role. This is exactly oracle-first thinking applied at the architecture level: each layer has a clear oracle for the class of bug it is responsible for.",
      "層を構成する効果的な方法は、各層が最も得意なことをさせ、無駄な重複を避けることです。私たちのマーケットプレイスの決済フローでは、機能アサーションが合計、税、割引が正しく計算されることを確認します。これが強い業務オラクルです。ビジュアルリグレッションはフォームのレイアウト崩れやボタンが覆われることを捕まえます。アクセシビリティ検査（例えばaxe経由）は注文するボタンが正しいアクセシブル名と十分なコントラストを持つことを確認します。この3層は1つのスイートで一緒に実行され、同じページ設定を共有し、どの層も他の役割を担うことなく網羅を与えます。これはまさにアーキテクチャレベルで適用されたオラクルファーストの思考です。各層は担当するバグの種類に対して明確なオラクルを持ちます。"
    ),
    CODE(
      "ts",
      `// layered.spec.ts — visual + chức năng + a11y trong một luồng thanh toán
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('checkout: ba lớp bổ sung nhau', async ({ page }) => {
  await page.goto('/checkout');
  await page.getByTestId('checkout-coupon-input').fill('SALE10');
  await page.getByRole('button', { name: /áp dụng|apply/i }).click();

  // 1) Oracle nghiệp vụ (mạnh nhất): tổng tiền giảm đúng
  await expect(page.getByTestId('cart-total')).toHaveText('₫450.000');
  // 2) Visual: form không vỡ bố cục, nút không bị che
  await expect(page.getByTestId('checkout-form'))
    .toHaveScreenshot('checkout.png', { animations: 'disabled' });
  // 3) Accessibility: không vi phạm role/label/tương phản nghiêm trọng
  const a11y = await new AxeBuilder({ page }).analyze();
  expect(a11y.violations.filter(v => v.impact === 'critical')).toEqual([]);
});`
    ),
    QA(
      "Visual regression có thể thay thế kiểm thử chức năng không?",
      "Can visual regression replace functional testing?",
      "Không. Visual bắt lỗi trình bày (chữ chồng, phần tử bị che, bố cục vỡ) mà DOM không thấy, nhưng mù với lỗi nghiệp vụ: trang trông hoàn hảo vẫn có thể tính sai tổng tiền. Assertion chức năng khẳng định giá trị đúng nhưng không thấy nút bị đẩy khỏi màn hình. Nên xếp chồng: chức năng (oracle nghiệp vụ), visual (trình bày), accessibility (role/label/tương phản) — mỗi lớp có oracle riêng cho loại lỗi nó chịu trách nhiệm.",
      "No. Visual catches presentation bugs (overlapping text, covered elements, broken layout) the DOM does not see, but it is blind to business bugs: a perfect-looking page can still compute the wrong total. Functional assertions confirm the right value but do not see a button pushed off-screen. Stack them: functional (business oracle), visual (presentation), accessibility (role/label/contrast) — each layer has its own oracle for the class of bug it is responsible for.",
      "ビジュアルリグレッションは機能テストを置き換えられますか？",
      "いいえ。ビジュアルはDOMが見ない表示バグ（テキストの重なり、覆われた要素、レイアウト崩れ）を捕まえますが、業務バグには盲目です。完璧に見えるページでも合計を誤計算し得ます。機能アサーションは正しい値を確認しますが画面外へ押し出されたボタンを見ません。積み重ねます。機能（業務オラクル）、ビジュアル（表示）、アクセシビリティ（役割/ラベル/コントラスト）で、各層は担当するバグの種類に対して独自のオラクルを持ちます。"
    ),
    NOTE(
      "Visual regression và accessibility check bổ trợ nhau tự nhiên: một trang có role và accessible name rõ ràng vừa dễ kiểm accessibility, vừa cho semantic diff mỏ neo tốt hơn để phân vùng và so sánh.",
      "Visual regression and accessibility checks naturally reinforce each other: a page with clear roles and accessible names is both easier to check for accessibility and gives semantic diff a better anchor to segment and compare.",
      "ビジュアルリグレッションとアクセシビリティ検査は自然に補強し合います。明確な役割とアクセシブル名を持つページは、アクセシビリティの確認が容易であり、セマンティック差分に分割と比較のためのより良い足場を与えます。"
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Lộ trình áp dụng và các sai lầm thường gặp",
    en: "13. An adoption roadmap and common pitfalls",
    ja: "13. 導入ロードマップとよくある落とし穴",
  },
  blocks: [
    P(
      "Áp dụng visual regression thành công là một hành trình từng bước, không phải bật tất cả cùng lúc. Bắt đầu hẹp: chọn vài trang có giá trị kinh doanh cao nhất (thanh toán, trang sản phẩm) và một môi trường chính (Chrome desktop), ổn định hóa ảnh chụp thật kỹ trước khi bận tâm tới AI. Khi bộ nhỏ này chạy ổn định với tỉ lệ dương tính giả thấp, mở rộng độ phủ và thêm môi trường. Chỉ khi khối lượng review bắt đầu lớn mới đưa semantic diff và phân loại AI vào để dồn lọc. Trình tự này tránh cạm bẫy phổ biến nhất: bật quá rộng ngay từ đầu, ngập trong nhiễu, rồi mất niềm tin vào cả công cụ.",
      "Adopting visual regression successfully is a step-by-step journey, not turning everything on at once. Start narrow: pick a few pages with the highest business value (checkout, product page) and one primary environment (Chrome desktop), and stabilize screenshots thoroughly before worrying about AI. When this small set runs stably with a low false-positive rate, expand coverage and add environments. Only when the review volume starts to grow do you bring in semantic diff and AI classification to push the filtering. This sequence avoids the most common pitfall: enabling too broadly from the start, drowning in noise, then losing trust in the tool entirely.",
      "ビジュアルリグレッションの成功した導入は、すべてを一度にオンにするのではなく段階的な旅です。狭く始めます。最も事業価値の高いページ（決済、商品ページ）と1つの主要環境（Chromeデスクトップ）を選び、AIを気にする前にスクリーンショットを徹底的に安定化します。この小さなセットが低い偽陽性率で安定して動いたら、網羅を広げ環境を追加します。レビュー量が増え始めて初めて、セマンティック差分とAI分類を持ち込んでフィルタリングを進めます。この順序が最もよくある落とし穴を避けます。最初から広くしすぎ、ノイズに溺れ、ツール全体への信頼を失うことです。"
    ),
    P(
      "Điểm lại các sai lầm hay gặp để dùng như danh sách kiểm: không ổn định hóa ảnh trước khi so (nguồn nhiễu số một); mask quá rộng đến mức giấu luôn hồi quy; dùng chung một baseline cho nhiều môi trường render khác nhau; bấm 'accept all' khi cập nhật baseline; tin AI phân loại mù quáng ở vùng rủi ro cao; và nguy hiểm nhất, coi visual regression là oracle nghiệp vụ. Nhớ rằng một trang có thể trông hoàn hảo mà vẫn sai logic — visual chỉ khẳng định 'trông đúng như baseline', không khẳng định 'nghiệp vụ đúng'. Giữ oracle nghiệp vụ ở lớp chức năng, để visual làm đúng phần của nó, và mọi thứ còn lại trong bài này sẽ vào đúng chỗ.",
      "Recap the common mistakes to use as a checklist: not stabilizing screenshots before comparing (the number-one noise source); masking so broadly that it also hides regressions; sharing one baseline across differently-rendering environments; hitting 'accept all' when updating baselines; trusting AI classification blindly in high-risk regions; and most dangerous, treating visual regression as the business oracle. Remember that a page can look perfect yet be logically wrong — visual only asserts 'looks like the baseline', not 'the business is correct'. Keep the business oracle at the functional layer, let visual do its own part, and everything else in this article falls into place.",
      "チェックリストとして使うため、よくある間違いをおさらいします。比較前にスクリーンショットを安定化しない（ノイズ源第一位）、回帰も隠すほど広くマスクする、異なってレンダーされる環境で1つのベースラインを共有する、ベースライン更新時に「全承認」を押す、高リスク領域でAI分類を盲目的に信じる、そして最も危険な、ビジュアルリグレッションを業務オラクルとして扱うことです。ページが完璧に見えても論理的に誤り得ることを覚えておいてください。ビジュアルは「ベースラインのように見える」だけをアサーションし、「業務が正しい」はアサーションしません。業務オラクルを機能層に保ち、ビジュアルに自分の役割をさせれば、本稿の他のすべてが収まるべき場所に収まります。"
    ),
    IMG(
      `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="250" rx="12" fill="#0c4a6e"/>
<text x="320" y="30" text-anchor="middle" fill="#bae6fd" font-size="15" font-weight="800">Lộ trình áp dụng từng bước</text>
<circle cx="90" cy="120" r="34" fill="#075985" stroke="#7dd3fc" stroke-width="2"/>
<text x="90" y="116" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="800">B1</text>
<text x="90" y="132" text-anchor="middle" fill="#bae6fd" font-size="9">trang giá trị cao</text>
<circle cx="230" cy="120" r="34" fill="#075985" stroke="#7dd3fc" stroke-width="2"/>
<text x="230" y="116" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="800">B2</text>
<text x="230" y="132" text-anchor="middle" fill="#bae6fd" font-size="9">ổn định ảnh</text>
<circle cx="370" cy="120" r="34" fill="#075985" stroke="#7dd3fc" stroke-width="2"/>
<text x="370" y="116" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="800">B3</text>
<text x="370" y="132" text-anchor="middle" fill="#bae6fd" font-size="9">mở rộng phủ</text>
<circle cx="510" cy="120" r="34" fill="#166534" stroke="#86efac" stroke-width="2"/>
<text x="510" y="116" text-anchor="middle" fill="#dcfce7" font-size="11" font-weight="800">B4</text>
<text x="510" y="132" text-anchor="middle" fill="#bbf7d0" font-size="9">semantic+AI</text>
<path d="M124 120 L196 120" stroke="#7dd3fc" stroke-width="3"/>
<path d="M264 120 L336 120" stroke="#7dd3fc" stroke-width="3"/>
<path d="M404 120 L476 120" stroke="#86efac" stroke-width="3"/>
<text x="320" y="200" text-anchor="middle" fill="#e0f2fe" font-size="12">Oracle nghiệp vụ luôn ở lớp chức năng — visual không thay thế nó</text>
</svg>`,
      "Áp dụng từng bước: trang giá trị cao, ổn định ảnh, mở rộng, rồi mới thêm AI.",
      "Adopt step by step: high-value pages, stabilize, expand, then add AI.",
      "段階的に導入：高価値ページ、安定化、拡大、その後にAI追加。"
    ),
    QA(
      "Sai lầm nguy hiểm nhất khi làm visual regression là gì?",
      "What is the most dangerous mistake in visual regression?",
      "Coi visual regression là oracle nghiệp vụ. Một trang có thể trông hoàn hảo mà vẫn sai logic — visual chỉ khẳng định 'trông đúng như baseline', không khẳng định 'nghiệp vụ đúng'. Phải giữ oracle nghiệp vụ ở lớp chức năng. Các sai lầm khác gồm không ổn định ảnh trước khi so, mask quá rộng che luôn hồi quy, dùng chung baseline nhiều môi trường, bấm 'accept all', và tin AI mù quáng ở vùng rủi ro cao.",
      "Treating visual regression as the business oracle. A page can look perfect yet be logically wrong — visual only asserts 'looks like the baseline', not 'the business is correct'. Keep the business oracle at the functional layer. Other mistakes include not stabilizing screenshots before comparing, masking so broadly it hides regressions, sharing one baseline across environments, hitting 'accept all', and trusting AI blindly in high-risk regions.",
      "ビジュアルリグレッションで最も危険な間違いは何ですか？",
      "ビジュアルリグレッションを業務オラクルとして扱うことです。ページは完璧に見えても論理的に誤り得ます。ビジュアルは「ベースラインのように見える」だけをアサーションし、「業務が正しい」はアサーションしません。業務オラクルを機能層に保たねばなりません。他の間違いには、比較前にスクリーンショットを安定化しない、回帰も隠すほど広くマスクする、環境間で1つのベースラインを共有する、「全承認」を押す、高リスク領域でAIを盲目的に信じる、があります。"
    ),
    TIP(
      "Bắt đầu với một trang duy nhất có giá trị kinh doanh cao và một môi trường, đạt tỉ lệ dương tính giả gần bằng không, rồi mới mở rộng. Một suite nhỏ đáng tin cậy giá trị hơn nhiều một suite lớn mà không ai còn tin.",
      "Start with a single high-business-value page and one environment, reach a near-zero false-positive rate, and only then expand. A small trustworthy suite is far more valuable than a large one nobody trusts anymore.",
      "事業価値の高い1ページと1環境から始め、ほぼゼロの偽陽性率に達し、その後初めて拡大します。小さく信頼できるスイートは、もう誰も信じない大きなスイートよりはるかに価値があります。"
    ),
  ],
});

export const AIAGENT_03 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-self-healing-locators-ai",
    cover: coverA,
    tags: tags("congnghe", "ecommerce", "aitesting", "playwright", "tip", "realworld"),
    title: {
      vi: "Locator tự chữa lành bằng AI: tăng tốc mà không che lỗi thật",
      en: "AI self-healing locators: faster tests without masking real bugs",
      ja: "AIによる自己修復ロケーター：本物のバグを隠さず高速化する",
    },
    summary: {
      vi: "Vì sao locator gãy khi UI đổi, cách AI đề xuất locator thay thế từ accessibility tree và DOM snapshot, chấm điểm tin cậy, nguy cơ che lỗi thật, giữ con người trong vòng lặp, ghi log heal để review và đo mức giảm flaky.",
      en: "Why locators break on UI change, how AI proposes alternatives from the accessibility tree and DOM snapshot, confidence scoring, the danger of masking real bugs, keeping a human in the loop, logging heals for review, and measuring flakiness reduction.",
      ja: "UI変更でロケーターが壊れる理由、AIがアクセシビリティツリーとDOMスナップショットから代替を提案する仕組み、信頼度スコアリング、本物のバグを隠す危険、人間を介在させる方法、レビュー用のヒール記録、そしてフレーキー削減の測定を扱います。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-ai-visual-regression-semantic",
    cover: coverB,
    tags: tags("nangcao", "ecommerce", "aitesting", "visual", "advanced", "experience"),
    title: {
      vi: "Visual regression bằng AI: so sánh ngữ nghĩa thay vì đếm pixel",
      en: "AI visual regression: semantic diffing beyond pixel counting",
      ja: "AIによるビジュアルリグレッション：ピクセル数ではなく意味の差分",
    },
    summary: {
      vi: "Vượt qua pixel-diff: dùng AI/embedding phân loại thay đổi có nghĩa với thay đổi mỹ thuật, giảm dương tính giả do anti-aliasing và nội dung động, phát hiện layout-shift, quản lý baseline, và khi nào phán đoán của AI không đáng tin cùng cách đặt cổng kiểm soát.",
      en: "Beyond pixel diff: use AI/embeddings to classify meaningful vs cosmetic changes, cut false positives from anti-aliasing and dynamic content, detect layout shift, manage baselines, and know when AI judgment is unreliable and how to gate it.",
      ja: "ピクセル差分を超えて：AI/埋め込みで意味のある変更と装飾的な変更を分類し、アンチエイリアスや動的コンテンツによる偽陽性を減らし、レイアウトシフトを検出し、ベースラインを管理し、AIの判断が信頼できない場面とゲート方法を学びます。",
    },
    pages: buildDoc(pagesB),
  },
];
